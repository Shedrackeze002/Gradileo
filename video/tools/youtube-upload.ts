// Usage: npx tsx video/tools/youtube-upload.ts [--dry-run] [--private | --unlisted] [--captions] [--limit N] <video id | unit id | course id> ...
//
// Uploads finished videos to the Gradileo YouTube channel, in course order: the MP4 with its title,
// description and tags (made again from the script and src/content/videos.json, so they match
// youtube.txt), then its thumbnail, and puts it in its unit's playlist in lesson order. Our captions
// go up only with --captions: they cost 400 of the day's 10,000 quota units a video, and the owner
// found YouTube's automatic captions as good (28 October 2026), so without them about 90 videos go
// up a day instead of about 20. Each video's files come from video/out/<id>/ when it is still in the session, or else from
// its folder in the owner's Drive. A video already on the channel (its title matches its script) is
// not uploaded again, only put in its playlist if it is missing, so a run can be repeated. A unit or
// course id stands for every video in videos.json in it.
//
// Exam question videos (src/content/exams/videos/) go up too: "exams" stands for every one, in course
// and lesson order, and "exams:<course id>" for one course's. Each goes in its course's own playlist,
// "Physics 10 - Exam Questions", in the order of the lessons they practise; its title, description
// and tags come from the youtube.txt made when it was rendered (it has no record in videos.json), and
// one not yet rendered and put in Drive is skipped until it is.
//
// A unit's playlist is named for its course and unit, "Math 10 - Unit 3 (Factors and Products)", and
// is made when missing. A playlist named for the course's first name ("Math 10C - Unit 1
// (Measurements)", "Maths 10C Unit 2 (Trigonometry)", made before courses were named by grade and
// stream) is the unit's too, and is renamed the first time a run puts a video in it. Each playlist
// a run touches is then put in lesson order if it is out of order (the playlist must be set to sort
// manually).
//
// Videos are public unless --private or --unlisted is given. It stops at the day's API quota
// (10,000 units: a thumbnail and a playlist place cost about 100 a video, our captions 400 more) or
// the channel's daily upload limit, and --limit N uploads at most N videos. Uploads count against
// the channel's limit, not the quota, so a video can go up after the quota has run out; the run
// stops there, and a video left without its thumbnail (or, with --captions, its captions) is kept in
// youtube-unfinished.json in Drive (video/lib/unfinished.ts) and finished first on the next run. It prints each upload as
// "<video id> -> https://youtu.be/<youtube id>", for the Videos page of the admin console, and each
// video it finishes as "<video id>: finishing on YouTube: …".
//
// Signs in with the YOUTUBE_* variables, and the GDRIVE_* ones for videos taken from Drive.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { CourseMeta, UnitMeta } from '../../engine/types.ts';
import { fieldsFromText } from '../../src/video/youtube-text.ts';
import { FIRST_NAME, MANIFEST, SCRIPT_FILES, scriptOf, youtubeFieldsFor } from '../lib/catalog.ts';
import { download, examPlace, examVideos, find, folderAt, place, ROOT_FOLDER, unitVideos, videoFolder, videoIds, type ExamPlace } from '../lib/google.ts';
import { loadUnfinished, loadUploaded, saveUnfinished, saveUploaded, type Missing } from '../lib/unfinished.ts';
import {
  addToPlaylist,
  createPlaylist,
  insertCaptions,
  insertVideo,
  playlists,
  renamePlaylist,
  setThumbnail,
  sortPlaylist,
  uploads,
  type Playlist,
  type Privacy,
} from '../lib/youtube.ts';

const OUT = path.resolve(import.meta.dirname, '../out');

/**
 * Whether each course's videos are made for children (YouTube's "made for kids", which turns off
 * comments and personalised ads). Courses not listed are not uploaded until the owner decides.
 */
const MADE_FOR_KIDS: Record<string, boolean> = {
  'math-10c': false,
  'math-10-3': false,
  'math-10-4': false,
  'math-20-1': false,
  'math-20-2': false,
  'math-20-3': false,
  'math-20-4': false,
  'math-30-1': false,
  'math-30-2': false,
  'math-30-3': false,
  'math-31': false,
  'math-5': false,
  'math-6': false,
  'math-7': false,
  'math-8': false,
  'math-9': false,
  'chem-7': false,
  'chem-8': false,
  'chem-9': false,
  'chem-10': false,
  'chem-20': false,
  'chem-30': false,
  'phys-10': false,
  'phys-20': false,
  'phys-30': false,
  'eng-5': false,
  'eng-6': false,
  'eng-7': false,
  'eng-8': false,
  'eng-9': false,
  'eng-10': false,
  'eng-20': false,
  'eng-30': false,
  'math-more': false,
  'chem-more': false,
  'eng-more': false,
};

/** A video's MP4, thumbnail and captions, from the session or from Drive. */
async function files(id: string): Promise<{ from: string; mp4: Buffer; png: Buffer; srt: Buffer }> {
  const [mp4, png, srt] = await fetchFiles(id, [`${id}.mp4`, 'thumbnail.png', 'captions.srt']);
  return { from: mp4.from, mp4: mp4.data, png: png.data, srt: srt.data };
}

/** Some of a video's files by name, from the session or from Drive. */
async function fetchFiles(id: string, names: string[]): Promise<Array<{ from: string; data: Buffer }>> {
  const local = path.join(OUT, id);
  if (names.every((n) => existsSync(path.join(local, n)))) return names.map((n) => ({ from: 'session', data: readFileSync(path.join(local, n)) }));
  const exam = await examPlace(id);
  const folder = exam ? await folderAt([ROOT_FOLDER, ...exam.folders]) : await videoFolder(place(id));
  if (!folder) throw new Error('not in the session and not in Drive');
  const got: Array<{ from: string; data: Buffer }> = [];
  for (const n of names) {
    const file = await find(n, folder, false);
    if (!file) throw new Error(`Drive has no ${n}`);
    got.push({ from: 'Drive', data: await download(file.id) });
  }
  return got;
}

/** A video's YouTube title, description and tags: an exam question video's from its youtube.txt. */
async function fieldsOf(id: string) {
  if (!(await examPlace(id))) return youtubeFieldsFor(id);
  const [text] = await fetchFiles(id, ['youtube.txt']);
  return fieldsFromText(text.data.toString('utf8'));
}

/** Whether an exam question video has been rendered: its MP4 is in the session or in Drive. */
async function rendered(exam: ExamPlace): Promise<boolean> {
  if (existsSync(path.join(OUT, exam.id, `${exam.id}.mp4`))) return true;
  const folder = await folderAt([ROOT_FOLDER, ...exam.folders]);
  return Boolean(folder && (await find(`${exam.id}.mp4`, folder, false)));
}

// ---------------------------------------------------------------- playlists

let lists: Playlist[] | undefined;
/** YouTube id to video id, for the videos on the channel. */
const scriptOfYoutube = new Map<string, string>();
/**
 * Set once YouTube refuses to make a playlist (429: it limits how many a channel makes a day).
 * Each refusal is retried and costs quota, so the rest of the run makes no more; later runs add the
 * videos left out to their playlists.
 */
let newPlaylistsRefused = false;
/** The playlists this run has looked at, by playlist id, with their videos in order. */
const touched = new Map<string, { list: Playlist; order: string[] }>();

/** Every exam question video, in order; filled before the uploads start. */
let exams: ExamPlace[] = [];

/** A unit's playlist title: "Math 10 - Unit 3 (Factors and Products)". */
const playlistTitle = (course: CourseMeta, unit: UnitMeta) => `${course.shortTitle} - Unit ${unit.number} (${unit.title})`;

/** The playlist for a unit: by its title, or by a title naming the course's first name and the unit. */
async function unitPlaylist(course: CourseMeta, unit: UnitMeta): Promise<Playlist | undefined> {
  lists ??= await playlists();
  const mine = lists.find((p) => p.title.startsWith(`${course.shortTitle} - Unit ${unit.number} (`));
  const first = FIRST_NAME[course.id];
  if (mine || !first) return mine;
  const code = first.replace(/^Math\s+/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const named = new RegExp(`\\bMaths?\\s*${code}\\b.*\\bUnit\\s*${unit.number}\\b`, 'i');
  return lists.find((p) => named.test(p.title));
}

/**
 * Puts a video on the channel into its unit's playlist (made if missing), after the unit's earlier
 * videos already there. Returns what it did, for the log.
 */
/** A video's playlist: its title, the playlist when there is one, what the playlist says about itself, and its videos in order. */
async function playlistFor(id: string): Promise<{ title: string; list?: Playlist; about: string; order: string[] }> {
  const exam = await examPlace(id);
  if (exam) {
    const { course } = exam;
    const title = `${course.shortTitle} - Exam Questions`;
    lists ??= await playlists();
    return {
      title,
      list: lists.find((p) => p.title === title),
      about: `Real exam and quiz questions for ${course.title}, each solved one small step at a time, in lesson order. Every video names the question's source.\nPractise each topic with instant feedback on Gradileo: https://gradileo.com/`,
      order: exams.filter((e) => e.course.id === course.id).map((e) => e.id),
    };
  }
  const { course, unit } = place(id);
  return {
    title: playlistTitle(course, unit),
    list: await unitPlaylist(course, unit),
    about: `${unit.title}: ${unit.description}\n\nExplainer videos in lesson order, each with a "Your turn" question to try.\nPractise this topic with instant feedback on Gradileo: https://gradileo.com/`,
    order: unitVideos(unit),
  };
}

async function intoPlaylist(id: string, youtubeId: string, dryRun: boolean): Promise<string> {
  const { title, about, order, list: found } = await playlistFor(id);
  let list = found;
  if (list) touched.set(list.id, { list, order });
  const old = list && list.title !== title ? list.title : undefined;
  if (dryRun) {
    const where = list ? `"${list.title}"${old ? `, to be renamed "${title}"` : ''}` : `a new playlist, "${title}"`;
    return `${list?.videos.includes(youtubeId) ? 'in' : 'would go into'} ${where}`;
  }
  if (list && old) await renamePlaylist(list, title);
  if (list?.videos.includes(youtubeId)) return `in "${list.title}"${old ? ` (renamed from "${old}")` : ''}`;
  if (!list) {
    if (newPlaylistsRefused) throw new Error(`no new playlist: YouTube refused one earlier this run, so "${title}" is made on a later run`);
    try {
      list = await createPlaylist(title, about);
    } catch (e) {
      if (/ 429 /.test((e as Error).message)) newPlaylistsRefused = true;
      throw e;
    }
    lists!.push(list);
    touched.set(list.id, { list, order });
  }
  const mine = order.indexOf(id);
  const position = list.videos.filter((v) => {
    const at = order.indexOf(scriptOfYoutube.get(v) ?? '');
    return at >= 0 && at < mine;
  }).length;
  await addToPlaylist(list, youtubeId, position);
  return `added to "${list.title}"`;
}

/** True for the errors that end the day's uploading: quota or the channel's upload limit. */
const dayIsOver = (e: Error) => /quotaExceeded|uploadLimitExceeded|rateLimitExceeded/.test(e.message);

/**
 * Adds what an unfinished video on the channel still lacks (its thumbnail, its captions) and
 * returns what is still missing. Stops at the first error that ends the day.
 */
async function finish(id: string, youtubeId: string, missing: Missing[], have?: { png: Buffer; srt: Buffer }): Promise<{ left: Missing[]; notes: string[]; over?: Error }> {
  const notes: string[] = [];
  const left: Missing[] = [];
  const file = { thumbnail: 'thumbnail.png', captions: 'captions.srt' } as const;
  const got = have
    ? { thumbnail: have.png, captions: have.srt }
    : Object.fromEntries((await fetchFiles(id, missing.map((m) => file[m]))).map((f, i) => [missing[i], f.data]));
  for (const m of missing) {
    try {
      if (m === 'thumbnail') await setThumbnail(youtubeId, got.thumbnail);
      else await insertCaptions(youtubeId, got.captions);
      notes.push(m === 'thumbnail' ? 'thumbnail set' : 'captions added');
    } catch (e) {
      const err = e as Error;
      left.push(m);
      notes.push(`${m} not ${m === 'thumbnail' ? 'set' : 'added'}: ${err.message.slice(0, 160)}`);
      if (dayIsOver(err)) return { left: [...left, ...missing.slice(missing.indexOf(m) + 1)], notes, over: err };
    }
  }
  return { left, notes };
}

// ---------------------------------------------------------------- main

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const withCaptions = args.includes('--captions');
const extras: Missing[] = withCaptions ? ['thumbnail', 'captions'] : ['thumbnail'];
const privacy: Privacy = args.includes('--private') ? 'private' : args.includes('--unlisted') ? 'unlisted' : 'public';
const at = args.indexOf('--limit');
const limit = at >= 0 ? Number(args[at + 1]) : Infinity;
const targets = args.filter((a, i) => !a.startsWith('--') && !(at >= 0 && i === at + 1));
if (!targets.length) {
  console.error('Usage: npx tsx video/tools/youtube-upload.ts [--dry-run] [--private | --unlisted] [--limit N] <video | unit | course id> ...');
  process.exit(1);
}

const unfinished = await loadUnfinished();
let unfinishedChanged = false;
const setUnfinished = (id: string, missing: Missing[]) => {
  if (missing.length) unfinished.set(id, missing);
  else unfinished.delete(id);
  unfinishedChanged = true;
};
// Without --captions a video waiting only for our captions is finished: YouTube's automatic ones serve.
if (!withCaptions && !dryRun) {
  for (const [id, missing] of unfinished) if (missing.includes('captions')) setUnfinished(id, missing.filter((m) => m !== 'captions'));
}

exams = await examVideos();
/** Exam question videos by their title, to know them on the channel (they have no record in videos.json). */
const examByTitle = new Map<string, string>();
for (const e of exams) examByTitle.set((await import(SCRIPT_FILES.get(e.id)!)).default.title as string, e.id);

const onChannel = new Map<string, string>();
try {
  for (const v of await uploads()) {
    const id = scriptOf(v.snippet.title, v.snippet.description) ?? examByTitle.get(v.snippet.title.split(' | ')[0].trim());
    if (id) onChannel.set(id, v.id);
    if (id) scriptOfYoutube.set(v.id, id);
  }
} catch (e) {
  const err = e as Error;
  if (!dayIsOver(err)) throw err;
  // An earlier run today used up the API quota; it comes back at midnight Pacific time.
  console.log(`stopped for today: the API quota is used up (${err.message.slice(0, 120)})`);
  process.exit(0);
}

// YouTube's list of the channel's uploads can leave a video out, so the videos uploaded earlier are
// also kept in a list of their own: one in it counts as on YouTube, and is never uploaded again.
const uploaded = await loadUploaded();
let uploadedChanged = false;
let unlisted = 0;
for (const [id, youtubeId] of uploaded) {
  if (onChannel.has(id)) continue;
  onChannel.set(id, youtubeId);
  scriptOfYoutube.set(youtubeId, id);
  unlisted++;
}
for (const [id, youtubeId] of onChannel) {
  if (uploaded.has(id)) continue;
  uploaded.set(id, youtubeId);
  uploadedChanged = true;
}
if (unlisted) console.log(`${unlisted} uploaded earlier but missing from YouTube's list of the channel's videos; counted as on YouTube`);

let done = 0;
let failed = 0;
// "exams" is every exam question video, and "exams:<course id>" a course's.
const examTargets = targets.flatMap((t) =>
  t === 'exams' ? exams.map((e) => e.id) : t.startsWith('exams:') ? exams.filter((e) => e.course.id === t.slice(6)).map((e) => e.id) : [t],
);
const ids = videoIds(examTargets, (v) => v in MANIFEST);
let notRendered = 0;
for (const id of ids) {
  const known = onChannel.get(id);
  if (known) {
    try {
      console.log(`${id}: already on YouTube (https://youtu.be/${known}), ${await intoPlaylist(id, known, dryRun)}`);
    } catch (e) {
      const err = e as Error;
      console.error(`${id}: playlist: ${err.message.slice(0, 200)}`);
      if (dayIsOver(err)) break;
      failed++;
    }
    const missing = unfinished.get(id)?.filter((m) => withCaptions || m !== 'captions');
    if (missing?.length) {
      if (dryRun) {
        console.log(`${id}: would add its ${missing.join(' and ')}`);
        continue;
      }
      try {
        const r = await finish(id, known, missing);
        setUnfinished(id, r.left);
        console.log(`${id}: finishing on YouTube: ${r.notes.join('; ')}`);
        if (r.over) {
          console.error(`${id}: stopped for today: ${r.over.message.slice(0, 200)}`);
          break;
        }
      } catch (e) {
        console.error(`${id}: not finished: ${(e as Error).message.slice(0, 200)}`);
        failed++;
      }
    }
    continue;
  }
  if (done >= limit) continue;
  try {
    const exam = await examPlace(id);
    if (exam && !(await rendered(exam))) {
      notRendered++;
      continue;
    }
    const course = exam?.course ?? place(id).course;
    const kids = MADE_FOR_KIDS[course.id];
    if (kids === undefined) throw new Error(`decide whether ${course.shortTitle} is made for kids (MADE_FOR_KIDS in this tool)`);
    const text = await fieldsOf(id);
    if (dryRun) {
      const { title, list } = await playlistFor(id);
      console.log(`${id}: would upload "${text.title}" (${privacy}${kids ? ', made for kids' : ''}) into "${list?.title ?? `a new playlist, "${title}"`}"`);
      done++;
      continue;
    }
    const f = await files(id);
    const video = await insertVideo(f.mp4, text, { privacy, madeForKids: kids });
    scriptOfYoutube.set(video.id, id);
    // Recorded at once, so a run that fails later still never uploads it again.
    uploaded.set(id, video.id);
    await saveUploaded(uploaded);
    // The thumbnail (and captions) spend the day's API quota; what they miss is finished on a later run.
    const r = await finish(id, video.id, extras, f);
    setUnfinished(id, r.left);
    const notes = r.notes.filter((n) => / not /.test(n));
    let over = r.over;
    if (!over) {
      try {
        notes.push(await intoPlaylist(id, video.id, false));
      } catch (e) {
        const err = e as Error;
        notes.push(`playlist not set: ${err.message.slice(0, 160)}`);
        if (dayIsOver(err)) over = err;
      }
    }
    done++;
    console.log(`${id} -> https://youtu.be/${video.id} (${video.privacy}, from ${f.from})${notes.length ? `; ${notes.join('; ')}` : ''}`);
    if (over) {
      console.error(`${id}: stopped for today: the API quota ran out (${over.message.slice(0, 120)})`);
      break;
    }
  } catch (e) {
    const err = e as Error;
    if (dayIsOver(err)) {
      console.error(`${id}: stopped for today: ${err.message.slice(0, 200)}`);
      break;
    }
    console.error(`${id}: ${err.message}`);
    failed++;
  }
}
if (unfinishedChanged) await saveUnfinished(unfinished);
if (uploadedChanged && !dryRun) await saveUploaded(uploaded);

for (const { list, order } of touched.values()) {
  const rank = (v: string) => {
    const at = order.indexOf(scriptOfYoutube.get(v) ?? '');
    return at < 0 ? Infinity : at;
  };
  try {
    const moved = await sortPlaylist(list, rank, dryRun);
    if (moved) console.log(`"${list.title}": ${dryRun ? 'would move' : 'moved'} ${moved} into lesson order`);
  } catch (e) {
    const err = e as Error;
    console.error(`"${list.title}": not put in order: ${err.message.slice(0, 200)}`);
    if (dayIsOver(err)) break;
  }
}

const left = ids.filter((id) => !onChannel.has(id)).length - (dryRun ? 0 : done) - notRendered;
console.log(
  `${done} ${dryRun ? 'to upload' : 'uploaded'}${failed ? `, ${failed} failed` : ''}; ${left} of ${ids.length} not on YouTube yet` +
    (notRendered ? `; ${notRendered} exam question videos not rendered yet` : '') +
    (unfinished.size ? `; ${unfinished.size} on YouTube still need ${withCaptions ? 'a thumbnail or captions' : 'a thumbnail'}` : ''),
);
if (failed) process.exit(1);
