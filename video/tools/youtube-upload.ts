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
// A unit's playlist is the owner's own when its title names the course and unit ("Math 10C - Unit 1
// (Measurements)", "Maths 10C Unit 2 (Trigonometry)"); otherwise one is made, "Math 10C - Unit 3
// (Factors and Products)". Each playlist a run touches is then put in lesson order if it is out of
// order (the playlist must be set to sort manually).
//
// Videos are public unless --private or --unlisted is given. It stops at the day's quota (10,000
// units: an upload with captions, a thumbnail and its playlist place costs about 600) or the
// channel's daily upload limit, and --limit N uploads at most N videos. It prints each upload as
// "<video id> -> https://youtu.be/<youtube id>", for the Videos page of the admin console.
//
// Signs in with the YOUTUBE_* variables, and the GDRIVE_* ones for videos taken from Drive.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { CourseMeta, UnitMeta } from '../../engine/types.ts';
import { MANIFEST, scriptOf, youtubeFieldsFor } from '../lib/catalog.ts';
import { download, find, place, unitVideos, videoFolder, videoIds } from '../lib/google.ts';
import {
  addToPlaylist,
  createPlaylist,
  insertCaptions,
  insertVideo,
  playlists,
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
  const local = path.join(OUT, id);
  const names = [`${id}.mp4`, 'thumbnail.png', 'captions.srt'];
  if (names.every((n) => existsSync(path.join(local, n)))) {
    const [mp4, png, srt] = names.map((n) => readFileSync(path.join(local, n)));
    return { from: 'session', mp4, png, srt };
  }
  const folder = await videoFolder(place(id));
  if (!folder) throw new Error('not in the session and not in Drive');
  const got: Buffer[] = [];
  for (const n of names) {
    const file = await find(n, folder, false);
    if (!file) throw new Error(`Drive has no ${n}`);
    got.push(await download(file.id));
  }
  return { from: 'Drive', mp4: got[0], png: got[1], srt: got[2] };
}

// ---------------------------------------------------------------- playlists

let lists: Playlist[] | undefined;
/** YouTube id to video id, for the videos on the channel. */
const scriptOfYoutube = new Map<string, string>();
/** The playlists this run has looked at, by playlist id, with their units. */
const touched = new Map<string, { list: Playlist; unit: UnitMeta }>();

/** The owner's playlist for a unit, found by its title naming the course and unit. */
async function unitPlaylist(course: CourseMeta, unit: UnitMeta): Promise<Playlist | undefined> {
  lists ??= await playlists();
  const code = course.shortTitle.replace(/^Math\s+/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
  const title = `${course.shortTitle} - Unit ${unit.number} (${unit.title})`;
  if (list) touched.set(list.id, { list, unit });
  if (list?.videos.includes(youtubeId)) return `in "${list.title}"`;
  if (dryRun) return `would go into ${list ? `"${list.title}"` : `a new playlist, "${title}"`}`;
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

const onChannel = new Map<string, string>();
for (const v of await uploads()) {
  const id = scriptOf(v.snippet.title, v.snippet.description);
  if (id) onChannel.set(id, v.id);
  if (id) scriptOfYoutube.set(v.id, id);
}

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
    const notes: string[] = [];
    try {
      await setThumbnail(video.id, f.png);
    } catch (e) {
      notes.push(`thumbnail not set: ${(e as Error).message.slice(0, 160)}`);
    }
    try {
      await insertCaptions(video.id, f.srt);
    } catch (e) {
      notes.push(`captions not added: ${(e as Error).message.slice(0, 160)}`);
    }
    try {
      notes.push(await intoPlaylist(id, video.id, false));
    } catch (e) {
      notes.push(`playlist not set: ${(e as Error).message.slice(0, 160)}`);
    }
    done++;
    console.log(`${id} -> https://youtu.be/${video.id} (${video.privacy}, from ${f.from})${notes.length ? `; ${notes.join('; ')}` : ''}`);
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
console.log(`${done} ${dryRun ? 'to upload' : 'uploaded'}${failed ? `, ${failed} failed` : ''}; ${left} of ${ids.length} not on YouTube yet`);
if (failed) process.exit(1);
