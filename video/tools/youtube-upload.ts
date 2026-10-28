// Usage: npx tsx video/tools/youtube-upload.ts [--dry-run] [--private | --unlisted] [--limit N] <video id | unit id | course id> ...
//
// Uploads finished videos to the Gradileo YouTube channel, in course order: the MP4 with its title,
// description and tags (made again from the script and src/content/videos.json, so they match
// youtube.txt), then its thumbnail and our captions, and puts it in its unit's playlist in lesson
// order. Each video's files come from video/out/<id>/ when it is still in the session, or else from
// its folder in the owner's Drive. A video already on the channel (its title matches its script) is
// not uploaded again, only put in its playlist if it is missing, so a run can be repeated. A unit or
// course id stands for every video in videos.json in it.
//
// A unit's playlist is named for its course and unit, "Math 10 - Unit 3 (Factors and Products)", and
// is made when missing. A playlist named for the course's first name ("Math 10C - Unit 1
// (Measurements)", "Maths 10C Unit 2 (Trigonometry)", made before courses were named by grade and
// stream) is the unit's too, and is renamed the first time a run puts a video in it. Each playlist
// a run touches is then put in lesson order if it is out of order (the playlist must be set to sort
// manually).
//
// Videos are public unless --private or --unlisted is given. It stops at the day's API quota
// (10,000 units: a thumbnail, captions and a playlist place cost about 500 a video) or the channel's
// daily upload limit, and --limit N uploads at most N videos. Uploads count against the channel's
// limit, not the quota, so a video can go up after the quota has run out; the run stops there, and
// a video left without its thumbnail or captions is kept in youtube-unfinished.json in Drive
// (video/lib/unfinished.ts) and finished first on the next run. It prints each upload as
// "<video id> -> https://youtu.be/<youtube id>", for the Videos page of the admin console, and each
// video it finishes as "<video id>: finishing on YouTube: …".
//
// Signs in with the YOUTUBE_* variables, and the GDRIVE_* ones for videos taken from Drive.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { CourseMeta, UnitMeta } from '../../engine/types.ts';
import { FIRST_NAME, MANIFEST, scriptOf, youtubeFieldsFor } from '../lib/catalog.ts';
import { download, find, place, unitVideos, videoFolder, videoIds } from '../lib/google.ts';
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
  const folder = await videoFolder(place(id));
  if (!folder) throw new Error('not in the session and not in Drive');
  const got: Array<{ from: string; data: Buffer }> = [];
  for (const n of names) {
    const file = await find(n, folder, false);
    if (!file) throw new Error(`Drive has no ${n}`);
    got.push({ from: 'Drive', data: await download(file.id) });
  }
  return got;
}

// ---------------------------------------------------------------- playlists

let lists: Playlist[] | undefined;
/** YouTube id to video id, for the videos on the channel. */
const scriptOfYoutube = new Map<string, string>();
/** The playlists this run has looked at, by playlist id, with their units. */
const touched = new Map<string, { list: Playlist; unit: UnitMeta }>();

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
async function intoPlaylist(id: string, youtubeId: string, dryRun: boolean): Promise<string> {
  const { course, unit } = place(id);
  let list = await unitPlaylist(course, unit);
  const title = playlistTitle(course, unit);
  if (list) touched.set(list.id, { list, unit });
  const old = list && list.title !== title ? list.title : undefined;
  if (dryRun) {
    const where = list ? `"${list.title}"${old ? `, to be renamed "${title}"` : ''}` : `a new playlist, "${title}"`;
    return `${list?.videos.includes(youtubeId) ? 'in' : 'would go into'} ${where}`;
  }
  if (list && old) await renamePlaylist(list, title);
  if (list?.videos.includes(youtubeId)) return `in "${list.title}"${old ? ` (renamed from "${old}")` : ''}`;
  if (!list) {
    const about = `${unit.title}: ${unit.description}\n\nExplainer videos in lesson order, each with a "Your turn" question to try.\nPractise this topic with instant feedback on Gradileo: https://gradileo.com/`;
    list = await createPlaylist(title, about);
    lists!.push(list);
    touched.set(list.id, { list, unit });
  }
  const order = unitVideos(unit);
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
  const [png, srt] = have ? [{ data: have.png }, { data: have.srt }] : await fetchFiles(id, ['thumbnail.png', 'captions.srt']);
  for (const m of missing) {
    try {
      if (m === 'thumbnail') await setThumbnail(youtubeId, png.data);
      else await insertCaptions(youtubeId, srt.data);
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

const onChannel = new Map<string, string>();
try {
  for (const v of await uploads()) {
    const id = scriptOf(v.snippet.title, v.snippet.description);
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
const ids = videoIds(targets, (v) => v in MANIFEST);
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
    const missing = unfinished.get(id);
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
    const course = place(id).course;
    const kids = MADE_FOR_KIDS[course.id];
    if (kids === undefined) throw new Error(`decide whether ${course.shortTitle} is made for kids (MADE_FOR_KIDS in this tool)`);
    const text = await youtubeFieldsFor(id);
    if (dryRun) {
      const list = await unitPlaylist(course, place(id).unit);
      console.log(`${id}: would upload "${text.title}" (${privacy}${kids ? ', made for kids' : ''}) into "${list?.title ?? 'a new playlist'}"`);
      done++;
      continue;
    }
    const f = await files(id);
    const video = await insertVideo(f.mp4, text, { privacy, madeForKids: kids });
    scriptOfYoutube.set(video.id, id);
    // Recorded at once, so a run that fails later still never uploads it again.
    uploaded.set(id, video.id);
    await saveUploaded(uploaded);
    // The thumbnail and captions spend the day's API quota; what they miss is finished on a later run.
    const r = await finish(id, video.id, ['thumbnail', 'captions'], f);
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

for (const { list, unit } of touched.values()) {
  const order = unitVideos(unit);
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

const left = ids.filter((id) => !onChannel.has(id)).length - (dryRun ? 0 : done);
console.log(
  `${done} ${dryRun ? 'to upload' : 'uploaded'}${failed ? `, ${failed} failed` : ''}; ${left} of ${ids.length} not on YouTube yet` +
    (unfinished.size ? `; ${unfinished.size} on YouTube still need a thumbnail or captions` : ''),
);
if (failed) process.exit(1);
