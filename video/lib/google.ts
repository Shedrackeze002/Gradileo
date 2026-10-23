/**
 * Signing in to Google for the video tools, and finding a video's folder in the owner's Drive.
 *
 * Drive signs in with GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET and GDRIVE_REFRESH_TOKEN (the drive.file
 * scope, which sees only what the tools created); YouTube with YOUTUBE_CLIENT_ID,
 * YOUTUBE_CLIENT_SECRET and YOUTUBE_REFRESH_TOKEN (the youtube.force-ssl scope, signed in as the
 * channel). Their values are never printed.
 */
import { COURSES } from '../../engine/curriculum/index.ts';
import type { CourseMeta, UnitMeta } from '../../engine/types.ts';
import { FIRST_NAME, SCRIPT_FILES } from './catalog.ts';

export type Service = 'GDRIVE' | 'YOUTUBE';
const README = { GDRIVE: '"Google Drive"', YOUTUBE: '"YouTube API"' };
const tokens = new Map<Service, { value: string; until: number }>();

export async function accessToken(service: Service): Promise<string> {
  const known = tokens.get(service);
  if (known && Date.now() < known.until) return known.value;
  const env = ['CLIENT_ID', 'CLIENT_SECRET', 'REFRESH_TOKEN'].map((k) => `${service}_${k}`);
  const missing = env.filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Set ${missing.join(', ')} (see video/README.md, ${README[service]})`);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env[env[0]]!,
      client_secret: process.env[env[1]]!,
      refresh_token: process.env[env[2]]!,
      grant_type: 'refresh_token',
    }),
  });
  const body = (await res.json()) as { access_token?: string; expires_in?: number; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) {
    const name = service === 'GDRIVE' ? 'Drive' : 'YouTube';
    throw new Error(`Google refused the ${name} sign-in (${res.status} ${body.error ?? ''}: ${body.error_description ?? ''})`);
  }
  tokens.set(service, { value: body.access_token, until: Date.now() + ((body.expires_in ?? 3600) - 300) * 1000 });
  return body.access_token;
}

/** A signed-in Google API call, retried on rate limits and server errors. */
export async function google(service: Service, url: string, init: RequestInit = {}): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${await accessToken(service)}`);
    const res = await fetch(url, { ...init, headers });
    if (res.ok) return res;
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      continue;
    }
    const name = service === 'GDRIVE' ? 'Drive' : 'YouTube';
    throw new Error(`${name} ${init.method ?? 'GET'} ${url.split('?')[0]} failed: ${res.status} ${await res.text()}`);
  }
}

// ---------------------------------------------------------------- where a video lives in Drive

export const ROOT_FOLDER = 'Gradileo videos';
export const FOLDER = 'application/vnd.google-apps.folder';
const SCRIPTS = [...SCRIPT_FILES.keys()];

/** Every video id of a lesson, part 1 first (m104-1-1, m104-1-1-b, m104-1-1-c, …). */
export function lessonVideos(lessonId: string): string[] {
  return SCRIPTS.filter((id) => id === lessonId || (id.startsWith(`${lessonId}-`) && /^-[b-z]$/.test(id.slice(lessonId.length))))
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}

export function unitVideos(unit: UnitMeta): string[] {
  return unit.lessons.flatMap(lessonVideos);
}

/** A course's folder under Gradileo videos/: its first name, or its short title for a course added since. */
export const courseFolder = (course: CourseMeta) => FIRST_NAME[course.id] ?? course.shortTitle;

export const unitFolder = (unit: UnitMeta) => `Unit ${unit.number} – ${unit.title}`;

export interface Place {
  id: string;
  course: CourseMeta;
  unit: UnitMeta;
  /** NN-<id>: the video's place in its unit, in course order. */
  folder: string;
}

/** Where a video goes in Drive: its course, unit and numbered folder. */
export function place(id: string): Place {
  for (const course of COURSES) {
    for (const unit of course.units) {
      const ids = unitVideos(unit);
      const i = ids.indexOf(id);
      if (i >= 0) return { id, course, unit, folder: `${String(i + 1).padStart(2, '0')}-${id}` };
    }
  }
  throw new Error(`${id}: no script for this video in src/content/*/videos/`);
}

/** Video ids for the arguments: video ids as given, unit and course ids as every video in them. */
export function videoIds(args: string[], keep: (id: string) => boolean = () => true): string[] {
  const ids: string[] = [];
  for (const arg of args) {
    const course = COURSES.find((c) => c.id === arg);
    const unit = COURSES.flatMap((c) => c.units).find((u) => u.id === arg);
    if (course) ids.push(...course.units.flatMap(unitVideos).filter(keep));
    else if (unit) ids.push(...unitVideos(unit).filter(keep));
    else ids.push(arg);
  }
  return [...new Set(ids)];
}

const quote = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** A file or folder by name in a Drive folder ('root' for My Drive), or undefined. */
export async function find(name: string, parent: string, folder: boolean) {
  const q = [`name = ${quote(name)}`, `${quote(parent)} in parents`, 'trashed = false', `mimeType ${folder ? '=' : '!='} '${FOLDER}'`];
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q.join(' and '))}&fields=files(id,md5Checksum)&spaces=drive`;
  const { files } = (await (await google('GDRIVE', url)).json()) as { files: { id: string; md5Checksum?: string }[] };
  return files[0];
}

/** The Drive folder holding a video's files, or undefined when it was never uploaded. */
export async function videoFolder(p: Place): Promise<string | undefined> {
  let parent = 'root';
  for (const name of [ROOT_FOLDER, courseFolder(p.course), unitFolder(p.unit), p.folder]) {
    const found = await find(name, parent, true);
    if (!found) return undefined;
    parent = found.id;
  }
  return parent;
}

/** A file's contents from Drive. */
export async function download(fileId: string): Promise<Buffer> {
  const res = await google('GDRIVE', `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
  return Buffer.from(await res.arrayBuffer());
}
