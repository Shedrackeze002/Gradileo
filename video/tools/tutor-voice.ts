// Usage: npx tsx --tsconfig tsconfig.json video/tools/tutor-voice.ts <course or lesson id>... \
//          [--out dir] [--previous dir] [--minutes N]
// Example: npx tsx --tsconfig tsconfig.json video/tools/tutor-voice.ts math-10c --out tutor-out
//
// Records the AI tutor's narration of every lesson with the explainer videos' voice, so a student
// who presses "Start with your AI tutor" hears the same voice as the videos. For each lesson it
// builds the slides the tutor shows a self-paced student, gets what the tutor says at each step,
// voices every line (and the tutor's set phrases, such as its praise) into one MP3, and writes a
// manifest of where each line is: <out>/<lessonId>.json and <out>/<lessonId>.<hash>.mp3. The
// app plays the lines from tutor/<lessonId>.json on the site (see .github/workflows/tutor-voice.yml).
//
// MiniMax writes the lines when MINIMAX_API_KEY is set (MINIMAX_MODEL and MINIMAX_BASE_URL are
// optional); without it the tutor reads each step from the slide, and those slides are written by
// MiniMax on a later run. --previous is a folder of earlier manifests: their lines are kept, and a
// lesson whose recording would not change is skipped. --minutes stops between lessons before that
// many minutes have passed, so a run with a time limit never loses a lesson half-made.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  hash53,
  offlineScript,
  parseTutorVoice,
  TUTOR_PHRASES,
  TUTOR_VOICE_VERSION,
  tutorSlideKey,
  writeTutorScript,
  type Clip,
  type TutorPhrase,
  type TutorSlide,
  type TutorVoice,
  type TutorVoiceSlide,
} from '../../engine/ai/tutor.ts';
import type { MiniMaxConfig } from '../../engine/ai/minimax.ts';
import { chunkSlides } from '../../src/features/tutor/tutorSlides.ts';
import { speechText } from '../../src/video/words.ts';
import { narrate, useCache, type Voice } from '../lib/narrate.ts';
import { lessonsOf, lessonTutorSlides } from '../lib/tutor-lessons.ts';
import { writeWav, type Pcm } from '../lib/wav.ts';

/** The videos' voice and calm pace (video/build.ts). */
export const TUTOR_VOICE: Voice = { name: 'af_heart', speed: 0.85 };
/** Silence between lines, so a line can be found and stopped without clipping its neighbours. */
const GAP = 0.5;
const BITRATE = '48k';

const root = path.resolve(import.meta.dirname, '../..');

function aiConfig(): MiniMaxConfig | null {
  const apiKey = process.env.MINIMAX_API_KEY;
  return apiKey ? { apiKey, model: process.env.MINIMAX_MODEL || undefined, baseUrl: process.env.MINIMAX_BASE_URL || undefined } : null;
}

/** What the tutor says on each slide: kept from the last recording where possible, else written now. */
async function writeBeats(lessonId: string, ai: MiniMaxConfig | null, previous: TutorVoice | null): Promise<Map<string, { beats: string[]; ai: boolean }>> {
  const { title, unit, slides } = lessonTutorSlides(lessonId);
  const out = new Map<string, { beats: string[]; ai: boolean }>();
  const missing: TutorSlide[] = [];
  for (const s of slides) {
    const key = tutorSlideKey(s);
    const was = previous?.slides[key];
    // MiniMax's lines are kept; lines read from the slide cost nothing to make again (and are
    // written by MiniMax once it is available).
    if (was?.ai && was.beats.length === s.steps.length) out.set(key, { beats: was.beats, ai: true });
    else missing.push(s);
  }
  // Two requests at a time per lesson, and a pause before trying again, to stay inside MiniMax's limits.
  const queue = chunkSlides(missing);
  const next = async (): Promise<void> => {
    const run = queue.shift();
    if (!run) return;
    const chunk = { lessonTitle: title, unit, slides: run };
    let script = offlineScript(chunk);
    let written = false;
    for (let attempt = 0; ai && attempt < 3 && !written; attempt++) {
      if (attempt) await new Promise((r) => setTimeout(r, 15_000 * attempt));
      const res = await writeTutorScript(chunk, ai);
      if (res.source === 'minimax') ((script = res.script), (written = true));
      else console.error(`  ${lessonId}: MiniMax failed (${res.error ?? 'no reason'}), attempt ${attempt + 1}`);
    }
    run.forEach((s, i) => out.set(tutorSlideKey(s), { beats: script.slides[i].beats, ai: written }));
    return next();
  };
  await Promise.all([next(), next()]);
  return out;
}

/** Records one lesson: every slide's lines in deck order, then the set phrases, with a gap between. */
async function record(lessonId: string, beats: Map<string, { beats: string[]; ai: boolean }>, outDir: string, cache: string, previous: TutorVoice | null): Promise<TutorVoice | null> {
  const { slides } = lessonTutorSlides(lessonId);
  const order = [...new Set(slides.map(tutorSlideKey))];
  const phraseIds = Object.keys(TUTOR_PHRASES) as TutorPhrase[];
  const hash = hash53(
    JSON.stringify({
      v: TUTOR_VOICE_VERSION,
      voice: TUTOR_VOICE,
      gap: GAP,
      bitrate: BITRATE,
      lines: order.map((k) => beats.get(k)!.beats.map(speechText)),
      phrases: phraseIds.map((id) => speechText(TUTOR_PHRASES[id])),
    }),
  );
  if (previous?.hash === hash) return null;

  const rate = 24_000;
  const pieces: Float32Array[] = [];
  let at = GAP;
  pieces.push(new Float32Array(Math.round(GAP * rate)));
  // A line said twice in a lesson is recorded once and played from the same place.
  const placed = new Map<string, Clip>();
  const place = async (line: string): Promise<Clip | null> => {
    const said = speechText(line.trim());
    if (!said) return null;
    const known = placed.get(said);
    if (known) return known;
    const pcm = await voiceLine(cache, said);
    if (pcm.rate !== rate) throw new Error(`Unexpected sample rate ${pcm.rate}`);
    const clip: Clip = [round(at), round(at + pcm.samples.length / rate)];
    pieces.push(pcm.samples, new Float32Array(Math.round(GAP * rate)));
    at = clip[1] + GAP;
    placed.set(said, clip);
    return clip;
  };
  const manifestSlides: Record<string, TutorVoiceSlide> = {};
  for (const key of order) {
    const b = beats.get(key)!;
    const clips: Array<Clip | null> = [];
    for (const line of b.beats) clips.push(await place(line));
    manifestSlides[key] = { beats: b.beats, clips, ai: b.ai };
  }
  const phrases: Partial<Record<TutorPhrase, Clip>> = {};
  for (const id of phraseIds) phrases[id] = (await place(TUTOR_PHRASES[id]))!;

  const samples = new Float32Array(pieces.reduce((n, p) => n + p.length, 0));
  pieces.reduce((k, p) => (samples.set(p, k), k + p.length), 0);
  const audio = `${lessonId}.${hash}.mp3`;
  const wav = path.join(cache, `${lessonId}.tutor.wav`);
  writeWav(wav, { rate, samples } satisfies Pcm);
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', wav, '-ac', '1', '-ar', String(rate), '-c:a', 'libmp3lame', '-b:a', BITRATE, path.join(outDir, audio)]);
  rmSync(wav);
  const voice: TutorVoice = { v: TUTOR_VOICE_VERSION, lessonId, audio, voice: { name: TUTOR_VOICE.name, speed: TUTOR_VOICE.speed }, hash, slides: manifestSlides, phrases };
  writeFileSync(path.join(outDir, `${lessonId}.json`), JSON.stringify(voice));
  return voice;
}

const round = (x: number) => Math.round(x * 1000) / 1000;

/**
 * Voices a line. A line read from a slide can be one long sentence (a list of rules, a worked
 * calculation) that the voice cannot say in one go; it is said in pieces instead, at its clauses,
 * with a short pause between them.
 */
async function voiceLine(cache: string, said: string): Promise<Pcm> {
  try {
    return (await narrate(cache, said, TUTOR_VOICE)).pcm;
  } catch (e) {
    if (!(e instanceof Error) || !e.message.startsWith('Too long')) throw e;
  }
  const clips: Pcm[] = [];
  for (const piece of splitLong(said)) clips.push((await narrate(cache, piece, TUTOR_VOICE)).pcm);
  const rate = clips[0].rate;
  const pause = new Float32Array(Math.round(rate * 0.35));
  const parts = clips.flatMap((c, i) => (i ? [pause, c.samples] : [c.samples]));
  const samples = new Float32Array(parts.reduce((n, x) => n + x.length, 0));
  parts.reduce((k, x) => (samples.set(x, k), k + x.length), 0);
  return { rate, samples };
}

/** Pieces of a long line: whole clauses where they fit, else runs of at most `max` words. */
export function splitLong(text: string, max = 40): string[] {
  const out: string[] = [];
  let run: string[] = [];
  for (const clause of text.split(/(?<=[.;:!?,])\s+/)) {
    const words = clause.split(/\s+/).filter(Boolean);
    if (run.length && run.length + words.length > max) {
      out.push(run.join(' '));
      run = [];
    }
    if (words.length > max) for (let i = 0; i < words.length; i += max) out.push(words.slice(i, i + max).join(' '));
    else run.push(...words);
  }
  if (run.length) out.push(run.join(' '));
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const option = (name: string) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 ? args.splice(i, 2)[1] : undefined;
  };
  const outDir = path.resolve(option('out') ?? path.join(root, 'video/out/tutor'));
  const previousDir = option('previous');
  const deadline = Date.now() + Number(option('minutes') ?? 1e6) * 60_000;
  const lessons = lessonsOf(args);
  if (!lessons.length) throw new Error('usage: tutor-voice.ts <course or lesson id>... [--out dir] [--previous dir] [--minutes N]');
  mkdirSync(outDir, { recursive: true });
  const cache = path.join(root, 'video/.cache');
  useCache(cache);
  const ai = aiConfig();
  console.log(`${lessons.length} lessons; lines ${ai ? 'written by MiniMax' : 'read from the slides (MINIMAX_API_KEY is not set)'}`);

  const previousOf = (id: string): TutorVoice | null => {
    const f = previousDir && path.join(previousDir, `${id}.json`);
    return f && existsSync(f) ? parseTutorVoice(JSON.parse(readFileSync(f, 'utf8')), id) : null;
  };
  // MiniMax writes the next lessons' lines while this one is recorded.
  const writing = new Map<string, ReturnType<typeof writeBeats>>();
  const write = (k: number) => {
    const id = lessons[k];
    if (id && !writing.has(id)) writing.set(id, writeBeats(id, ai, previousOf(id)));
  };
  for (let k = 0; k < Math.min(2, lessons.length); k++) write(k);
  let made = 0;
  const failed: string[] = [];
  for (let k = 0; k < lessons.length; k++) {
    if (Date.now() > deadline) {
      console.log(`paused for the time limit after ${made} lessons; run again to go on`);
      break;
    }
    write(k + 2);
    const id = lessons[k];
    const started = Date.now();
    let voice: TutorVoice | null;
    // One lesson that fails does not stop the rest of the course.
    try {
      const beats = await writing.get(id)!;
      voice = await record(id, beats, outDir, cache, previousOf(id));
    } catch (e) {
      console.error(`${id}: FAILED: ${e instanceof Error ? e.message : String(e)}`);
      failed.push(id);
      continue;
    } finally {
      writing.delete(id);
    }
    if (!voice) {
      console.log(`${id}: unchanged`);
      continue;
    }
    made++;
    const lines = Object.values(voice.slides).reduce((n, s) => n + s.clips.filter(Boolean).length, 0);
    const ais = Object.values(voice.slides).filter((s) => s.ai).length;
    const end = Math.max(...Object.values(voice.slides).flatMap((s) => s.clips.map((c) => c?.[1] ?? 0)), ...Object.values(voice.phrases).map((c) => c![1]));
    console.log(`${id}: ${lines} lines, ${(end / 60).toFixed(1)} min, ${ais}/${Object.keys(voice.slides).length} slides by MiniMax, in ${((Date.now() - started) / 1000).toFixed(0)} s`);
  }
  if (failed.length) {
    console.error(`Not recorded: ${failed.join(' ')}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) await main();
