// Usage: npx tsx video/tools/drive-upload.ts [--dry-run] [--text-only] <video id | unit id | course id> ...
//
// Uploads rendered videos from video/out/<id>/ to the owner's Google Drive, into
//   Gradileo videos/<course>/Unit <n> – <title>/<NN>-<id>/
// with the MP4, thumbnail, captions and YouTube text, the same layout as the upload packs.
// NN is the video's place in its unit, in course order, so it never changes with what is
// uploaded. A unit id (m104-u1) or course id (math-10-4) stands for every video in it that has
// been rendered. Files already in Drive with the same contents are skipped, so a run can be repeated.
//
// --text-only writes each video's YouTube text again from its script and the chapters in
// src/content/videos.json, and uploads only youtube.txt: a change to the YouTube wording reaches
// every finished video without rendering it again, even after its course was cleared from the
// session. A unit or course then stands for every video in videos.json.
//
// It signs in with the environment variables GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET and
// GDRIVE_REFRESH_TOKEN (an OAuth client with the drive.file scope, which can only see the files
// and folders this tool creates). Their values are never printed.
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { MANIFEST, youtubeTextFor } from '../lib/catalog.ts';
import { find, FOLDER, google, place, ROOT_FOLDER, unitFolder, videoIds, type Place } from '../lib/google.ts';

const ROOT = path.resolve(import.meta.dirname, '../..');
const OUT = path.join(ROOT, 'video/out');
const FILES: [file: (id: string) => string, mime: string][] = [
  [(id) => `${id}.mp4`, 'video/mp4'],
  [() => 'thumbnail.png', 'image/png'],
  [() => 'captions.srt', 'application/x-subrip'],
  [() => 'youtube.txt', 'text/plain'],
];

/**
 * Video ids for the arguments: video ids as given, units and courses as their rendered videos (with
 * --text-only, every video in videos.json).
 */
function expand(args: string[], textOnly: boolean): string[] {
  return videoIds(args, (id) => (textOnly ? id in MANIFEST : existsSync(path.join(OUT, id, `${id}.mp4`))));
}

const drive = (url: string, init?: RequestInit) => google('GDRIVE', url, init);

const folders = new Map<string, string>();

async function ensureFolder(name: string, parent: string): Promise<string> {
  const key = `${parent}/${name}`;
  const known = folders.get(key);
  if (known) return known;
  let id = (await find(name, parent, true))?.id;
  if (!id) {
    const res = await drive('https://www.googleapis.com/drive/v3/files?fields=id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mimeType: FOLDER, parents: [parent] }),
    });
    id = ((await res.json()) as { id: string }).id;
  }
  folders.set(key, id);
  return id;
}

/**
 * Uploads one file into a folder; skips it when Drive already has the same contents (by MD5, since
 * a re-rendered caption file can keep its size while its timings change).
 */
async function upload(file: string, name: string, mime: string, parent: string): Promise<'uploaded' | 'replaced' | 'unchanged'> {
  const bytes = readFileSync(file);
  const size = bytes.length;
  const existing = await find(name, parent, false);
  if (existing && existing.md5Checksum === createHash('md5').update(bytes).digest('hex')) return 'unchanged';
  const start = existing
    ? await drive(`https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=resumable`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Upload-Content-Type': mime, 'X-Upload-Content-Length': String(size) },
        body: '{}',
      })
    : await drive('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Upload-Content-Type': mime, 'X-Upload-Content-Length': String(size) },
        body: JSON.stringify({ name, parents: [parent] }),
      });
  const session = start.headers.get('location');
  if (!session) throw new Error(`Drive gave no upload address for ${name}`);
  await drive(session, { method: 'PUT', headers: { 'Content-Type': mime }, body: bytes });
  return existing ? 'replaced' : 'uploaded';
}

// ---------------------------------------------------------------- main

/**
 * Writes a video's YouTube text again, from its script and its chapters in videos.json, into
 * video/out/<id>/ when the video is still in the session, or else a temporary folder; returns the file.
 */
let scratch: string | undefined;
async function writeYoutubeText(id: string): Promise<string> {
  const text = await youtubeTextFor(id);
  const dir = existsSync(path.join(OUT, id)) ? path.join(OUT, id) : (scratch ??= mkdtempSync(path.join(os.tmpdir(), 'youtube-text-')));
  const out = path.join(dir, dir === path.join(OUT, id) ? 'youtube.txt' : `${id}.txt`);
  writeFileSync(out, `${text}\n`);
  return out;
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const textOnly = args.includes('--text-only');
const targets = args.filter((a) => a !== '--dry-run' && a !== '--text-only');
if (!targets.length) {
  console.error('Usage: npx tsx video/tools/drive-upload.ts [--dry-run] [--text-only] <video id | unit id | course id> ...');
  process.exit(1);
}
const ids = expand(targets, textOnly);
if (!ids.length) {
  console.error(`Nothing rendered for ${targets.join(' ')} in video/out/`);
  process.exit(1);
}

let failed = 0;
const planned: Place[] = [];
for (const id of ids) {
  try {
    planned.push(place(id));
  } catch (e) {
    console.error((e as Error).message);
    failed++;
  }
}
const unitLinks = new Map<string, string>();
for (const p of planned) {
  const where = `${ROOT_FOLDER}/${p.course.shortTitle}/${unitFolder(p.unit)}/${p.folder}`;
  const missing = textOnly ? [] : FILES.map(([f]) => f(p.id)).filter((f) => !existsSync(path.join(OUT, p.id, f)));
  if (missing.length) {
    console.error(`${p.id}: not rendered (missing ${missing.join(', ')}); skipped`);
    failed++;
    continue;
  }
  if (dryRun) {
    console.log(`${p.id} -> ${where}/`);
    continue;
  }
  try {
    const root = await ensureFolder(ROOT_FOLDER, 'root');
    const course = await ensureFolder(p.course.shortTitle, root);
    const unit = await ensureFolder(unitFolder(p.unit), course);
    const video = await ensureFolder(p.folder, unit);
    unitLinks.set(`${p.course.shortTitle}/${unitFolder(p.unit)}`, `https://drive.google.com/drive/folders/${unit}`);
    const results = [];
    if (textOnly) results.push(`youtube.txt ${await upload(await writeYoutubeText(p.id), 'youtube.txt', 'text/plain', video)}`);
    else for (const [f, mime] of FILES) results.push(`${f(p.id)} ${await upload(path.join(OUT, p.id, f(p.id)), f(p.id), mime, video)}`);
    console.log(`${p.id} -> ${where}/: ${results.join(', ')}`);
  } catch (e) {
    console.error(`${p.id}: ${(e as Error).message}`);
    failed++;
  }
}
for (const [name, link] of unitLinks) console.log(`${name}: ${link}`);
if (failed) {
  console.error(`${failed} of ${ids.length} videos not uploaded`);
  process.exit(1);
}
