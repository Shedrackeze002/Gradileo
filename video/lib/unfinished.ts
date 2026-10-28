/**
 * Two lists the YouTube uploader keeps in the "Gradileo videos" folder in Drive, so that every run,
 * in any session, knows what earlier runs did.
 *
 * youtube-unfinished.json: videos on the channel that still lack their thumbnail or captions. An
 * upload counts against the channel's own daily upload limit, while thumbnails and captions spend
 * the API's daily quota, so on a big day the quota can run out with videos still going up (24
 * October 2026: 83 of 101). The next run finishes those videos before it uploads new ones.
 *
 * youtube-uploaded.json: every video the uploader has put on the channel, by video id, with its
 * YouTube id. YouTube's list of a channel's uploads can leave a video out (28 October 2026: one of
 * 167), and a video missing from it would be uploaded again; one in this list never is.
 */
import { download, find, google, ROOT_FOLDER } from './google.ts';

export type Missing = 'thumbnail' | 'captions';

async function root(): Promise<string> {
  const folder = await find(ROOT_FOLDER, 'root', true);
  if (!folder) throw new Error(`Drive has no "${ROOT_FOLDER}" folder`);
  return folder.id;
}

/** A JSON object kept as a file in the "Gradileo videos" folder, as a map; empty if there is none yet. */
async function loadMap<T>(name: string): Promise<Map<string, T>> {
  const file = await find(name, await root(), false);
  if (!file) return new Map();
  return new Map(Object.entries(JSON.parse((await download(file.id)).toString('utf8')) as Record<string, T>));
}

/** Writes the map back to its file, made if missing. */
async function saveMap<T>(name: string, map: Map<string, T>): Promise<void> {
  const parent = await root();
  const json = `${JSON.stringify(Object.fromEntries(map), null, 2)}\n`;
  const file = await find(name, parent, false);
  if (file) {
    await google('GDRIVE', `https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=media`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: json,
    });
    return;
  }
  const boundary = `gradileo-${Date.now().toString(36)}`;
  const meta = JSON.stringify({ name, parents: [parent], mimeType: 'application/json' });
  await google('GDRIVE', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body: `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${json}\r\n--${boundary}--\r\n`,
  });
}

/** The unfinished videos, by video id, with what each still needs. */
export const loadUnfinished = () => loadMap<Missing[]>('youtube-unfinished.json');
export const saveUnfinished = (list: Map<string, Missing[]>) => saveMap('youtube-unfinished.json', list);

/** The videos on the channel, by video id, with their YouTube ids. */
export const loadUploaded = () => loadMap<string>('youtube-uploaded.json');
export const saveUploaded = (list: Map<string, string>) => saveMap('youtube-uploaded.json', list);
