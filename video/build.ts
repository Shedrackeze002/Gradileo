/**
 * Builds explainer videos from their scripts (src/content/<course>/videos/<id>.ts):
 *
 *   npx tsx video/build.ts m10c-2-1 [more ids] [--voice af_heart] [--speed 1] [--fps 30]
 *                                   [--pace old] [--stills] [--quick] [--no-qa] [--thumbnail]
 *
 * For each video it voices every line (Kokoro, cached in video/.cache), lays out the timeline from
 * the narration, renders every frame of video/stage.html in Chromium, and writes to video/out/<id>/:
 * the MP4 (1920×1080, H.264, AAC), captions (VTT and SRT), a thumbnail, the YouTube title and
 * description with chapters, and a pronunciation report. It also records the video's length and
 * question cues in src/content/videos.json for the lesson player.
 *
 * --stills  saves a picture of the end of each scene instead of the MP4 (for checking the design).
 * --quick   estimates the narration from the words instead of voicing it (with --stills).
 * --no-qa   skips the Whisper pronunciation check.
 * --thumbnail  makes only the thumbnail (after a change to the script's figures or the design).
 * --pace old   the faster pace of Math 10C, 10-3 and 10-4 (voice speed 1, shorter pauses), to make
 *              one of their videos again so it matches the rest of its course.
 */
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium, type Browser, type Page } from '@playwright/test';
import { createServer } from 'vite';
import { captions, toSrt, toVtt } from '../src/video/captions.ts';
import { checkScript, type Explainer } from '../src/video/script.ts';
import { speechText } from '../src/video/words.ts';
import { clock, compile, OLD_PACE, TIMING, youtubeChapters, type Timeline } from '../src/video/timeline.ts';
import { youtubeText } from '../src/video/youtube-text.ts';
import { narrate, useCache, type Voice } from './lib/narrate.ts';
import { normalise, transcribe, wer } from './lib/qa.ts';
import { writeWav, type Pcm } from './lib/wav.ts';
import type { StageApi } from '../src/video/stage/main.tsx';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'video/out');
const CACHE = path.join(ROOT, 'video/.cache');
const MANIFEST = path.join(ROOT, 'src/content/videos.json');

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const ids = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && ['--voice', '--speed', '--fps', '--pace'].includes(args[i - 1])));
// Speed 0.85 gives about 150 to 155 spoken words a minute on plain sentences, a calm teaching pace
// (Kokoro's speed is not proportional: 1 gave about 175, which felt rushed, and 0.9 only about 165).
const oldPace = option('pace', 'calm') === 'old';
if (oldPace) Object.assign(TIMING, OLD_PACE);
const voice: Voice = { name: option('voice', 'af_heart'), speed: Number(option('speed', oldPace ? '1' : '0.85')) };
const FPS = Number(option('fps', '30'));
/** Every video runs at least two minutes; a shorter one needs more in its script. */
const MIN_SECONDS = 120;
/**
 * There is no time limit: a video takes as long as the simplest explanation needs. Past fifteen
 * minutes the build only notes it, as a check that the length is intended.
 */
const LONG_SECONDS = 15 * 60;
/** The quick estimate runs about a tenth long (2:06 for a video voiced at 1:52), so it needs more. */
const QUICK_MARGIN = 1.12;

function findScript(id: string): string {
  for (const course of readdirSync(path.join(ROOT, 'src/content'))) {
    const file = path.join(ROOT, 'src/content', course, 'videos', `${id}.ts`);
    if (existsSync(file)) return file;
  }
  throw new Error(`No script for "${id}" in src/content/<course>/videos/.`);
}

const log = (msg: string) => console.log(`${new Date().toISOString().slice(11, 19)}  ${msg}`);

async function voiceLines(x: Explainer) {
  const durations: Record<string, number> = {};
  const clips: Record<string, Pcm> = {};
  for (const [si, s] of x.scenes.entries()) {
    for (const [li, l] of s.lines.entries()) {
      const key = `${si}.${li}`;
      if (flag('quick')) {
        durations[key] = Math.max(1.2, l.say.split(/\s+/).length / (2.7 * voice.speed));
        continue;
      }
      const clip = await narrate(CACHE, speechText(l.say), voice);
      durations[key] = clip.seconds;
      clips[key] = clip.pcm;
    }
  }
  return { durations, clips };
}

/** The narration track: every line's clip at its place in the timeline. */
function track(tl: Timeline, clips: Record<string, Pcm>): Pcm {
  const rate = Object.values(clips)[0].rate;
  const samples = new Float32Array(Math.ceil(tl.duration * rate) + rate);
  for (const l of tl.lines) samples.set(clips[l.key].samples, Math.round(l.start * rate));
  return { rate, samples };
}

async function stage(page: Page, id: string, tl: Timeline) {
  await page.evaluate(([i, t]) => (window as unknown as { __stage: StageApi }).__stage.load(i, t), [id, tl] as const);
}

const seek = (page: Page, t: number) => page.evaluate((s) => (window as unknown as { __stage: StageApi }).__stage.seek(s), t);

async function renderVideo(page: Page, tl: Timeline, wav: string, file: string) {
  const frames = Math.ceil(tl.duration * FPS);
  const ff = spawn(
    'ffmpeg',
    ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-g', String(FPS * 2),
      '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', file],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  );
  const done = once(ff, 'close');
  let last: Buffer | null = null;
  let lastKey = '';
  let shots = 0;
  const started = Date.now();
  try {
    for (let i = 0; i < frames; i++) {
      const key = await seek(page, i / FPS);
      if (key !== lastKey || !last) {
        // JPEG at high quality: much faster than PNG to capture and decode, and the H.264 encode
        // that follows is lossy anyway.
        last = await page.screenshot({ type: 'jpeg', quality: 95 });
        lastKey = key;
        shots++;
      }
      if (!ff.stdin.write(last)) await once(ff.stdin, 'drain');
      if (i % (FPS * 20) === 0) log(`  frame ${i}/${frames} (${shots} drawn)`);
    }
  } catch (e) {
    // Never leave a partial video behind.
    ff.kill('SIGKILL');
    await done;
    rmSync(file, { force: true });
    throw e;
  }
  ff.stdin.end();
  const [code] = await done;
  if (code !== 0) throw new Error(`ffmpeg failed with code ${code}.`);
  log(`  ${frames} frames, ${shots} drawn, in ${Math.round((Date.now() - started) / 1000)} s`);
}

async function qa(x: Explainer, tl: Timeline, clips: Record<string, Pcm>, file: string) {
  const rows: string[] = [];
  let flagged = 0;
  for (const l of tl.lines) {
    const heard = await transcribe(clips[l.key]);
    const rate = wer(normalise(l.say), normalise(heard));
    if (rate > 0.12) flagged++;
    rows.push(`${rate > 0.12 ? 'CHECK' : 'ok   '} ${(rate * 100).toFixed(0).padStart(3)}%  ${clock(l.start)}  ${l.say}${rate > 0 ? `\n                  heard: ${heard}` : ''}`);
  }
  writeFileSync(file, `Pronunciation check for ${x.id}: Whisper's transcript of each line compared with the script.\n${flagged} of ${tl.lines.length} lines to listen to (marked CHECK).\n\n${rows.join('\n')}\n`);
  log(`  pronunciation: ${flagged} of ${tl.lines.length} lines to listen to`);
}

function updateManifest(x: Explainer, tl: Timeline) {
  const all = existsSync(MANIFEST) ? (JSON.parse(readFileSync(MANIFEST, 'utf8')) as Record<string, unknown>) : {};
  all[x.id] = { lessonId: x.lessonId, title: x.title, duration: Math.round(tl.duration), voice: voice.name, chapters: youtubeChapters(tl) ?? tl.chapters, cues: tl.cues };
  const sorted = Object.fromEntries(Object.entries(all).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })));
  writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
}

/** The video's thumbnail, 1280×720, as thumbnail.png in its folder. */
async function thumbnail(browser: Browser, base: string, id: string, dir: string) {
  const thumb = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await thumb.goto(`${base}video/stage.html`);
  await thumb.evaluate((i) => (window as unknown as { __stage: StageApi }).__stage.thumbnail(i), id);
  await thumb.screenshot({ path: path.join(dir, 'thumbnail.png') });
  await thumb.close();
}

async function main() {
  if (!ids.length) throw new Error('Name at least one video, for example: npx tsx video/build.ts m10c-2-1');
  useCache(CACHE);
  // No file watching or hot reload: editing a script while a video renders must not reload the stage.
  const server = await createServer({ root: ROOT, configFile: path.join(ROOT, 'vite.config.ts'), logLevel: 'error', server: { port: 5199, strictPort: false, hmr: false, watch: null } });
  await server.listen();
  const base = server.resolvedUrls?.local[0] ?? 'http://localhost:5199/';
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  try {
    for (const id of ids) {
      const x = ((await import(findScript(id))) as { default: Explainer }).default;
      const problems = checkScript(x);
      if (problems.length) throw new Error(`${id}:\n${problems.join('\n')}`);
      const dir = path.join(OUT, id);
      mkdirSync(dir, { recursive: true });
      if (flag('thumbnail')) {
        await thumbnail(browser, base, id, dir);
        log(`${id}: thumbnail in ${path.relative(ROOT, dir)}`);
        continue;
      }
      log(`${id}: voicing ${x.scenes.reduce((n, s) => n + s.lines.length, 0)} lines with ${voice.name}`);
      const { durations, clips } = await voiceLines(x);
      const tl = compile(x, durations);
      log(`${id}: ${clock(tl.duration)} long${flag('quick') ? ' (estimated)' : ''}, ${tl.chapters.length} chapters, ${tl.cues.length} questions`);
      if (tl.duration < MIN_SECONDS * (flag('quick') ? QUICK_MARGIN : 1)) log(`${id}: WARNING: likely shorter than ${clock(MIN_SECONDS)}; add to the script.`);
      if (tl.duration > LONG_SECONDS) log(`${id}: note: longer than ${clock(LONG_SECONDS)}; fine if the explanation needs it.`);

      const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`${base}video/stage.html`);
      await stage(page, id, tl);
      // A frame that failed to draw (a TeX mistake, say) must not end up in a video.
      if (errors.length) throw new Error(`${id}: the stage reported errors:\n${[...new Set(errors)].join('\n')}`);
      if (flag('stills')) {
        rmSync(path.join(dir, 'stills'), { recursive: true, force: true });
        mkdirSync(path.join(dir, 'stills'), { recursive: true });
        for (const [si, s] of tl.scenes.entries()) {
          await seek(page, s.end - 0.4);
          await page.screenshot({ path: path.join(dir, 'stills', `scene-${String(si + 1).padStart(2, '0')}.png`) });
        }
        log(`${id}: stills in ${path.relative(ROOT, path.join(dir, 'stills'))}`);
      } else {
        const wav = path.join(CACHE, `${id}.wav`);
        writeWav(wav, track(tl, clips));
        log(`${id}: rendering at ${FPS} fps`);
        await renderVideo(page, tl, wav, path.join(dir, `${id}.mp4`));
        const cs = captions(tl.lines);
        writeFileSync(path.join(dir, 'captions.vtt'), toVtt(cs));
        writeFileSync(path.join(dir, 'captions.srt'), toSrt(cs));
        writeFileSync(path.join(dir, 'youtube.txt'), `${youtubeText(x, youtubeChapters(tl))}\n`);
        // The lesson player lists lessons' videos; a video about Gradileo itself is not one.
        if (x.lessonId) updateManifest(x, tl);
        if (!flag('no-qa')) await qa(x, tl, clips, path.join(dir, 'pronunciation.txt'));
      }
      await page.close();
      await thumbnail(browser, base, id, dir);
      log(`${id}: done, in ${path.relative(ROOT, dir)}`);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
