/**
 * Videos on the channel that still lack their thumbnail or captions. An upload counts against the
 * channel's own daily upload limit, while thumbnails and captions spend the API's daily quota, so on
 * a big day the quota can run out with videos still going up (24 October 2026: 83 of 101). The list
 * is kept as youtube-unfinished.json in the "Gradileo videos" folder in Drive, so the next run, in
 * any session, finishes those videos before it uploads new ones.
 */
import { download, find, google, ROOT_FOLDER } from './google.ts';

export type Missing = 'thumbnail' | 'captions';

const NAME = 'youtube-unfinished.json';

async function root(): Promise<string> {
  const folder = await find(ROOT_FOLDER, 'root', true);
  if (!folder) throw new Error(`Drive has no "${ROOT_FOLDER}" folder`);
  return folder.id;
}

/** The unfinished videos, by video id, with what each still needs. */
export async function loadUnfinished(): Promise<Map<string, Missing[]>> {
  const file = await find(NAME, await root(), false);
  if (!file) return new Map();
  return new Map(Object.entries(JSON.parse((await download(file.id)).toString('utf8')) as Record<string, Missing[]>));
}

/** Writes the list back, made if missing. */
export async function saveUnfinished(list: Map<string, Missing[]>): Promise<void> {
  const parent = await root();
  const json = `${JSON.stringify(Object.fromEntries(list), null, 2)}\n`;
  const file = await find(NAME, parent, false);
  if (file) {
    await google('GDRIVE', `https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=media`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: json,
    });
    return;
  }
  const boundary = `gradileo-${Date.now().toString(36)}`;
  const meta = JSON.stringify({ name: NAME, parents: [parent], mimeType: 'application/json' });
  await google('GDRIVE', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body: `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${json}\r\n--${boundary}--\r\n`,
  });
}
