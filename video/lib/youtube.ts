/**
 * The YouTube Data API calls the video tools use: listing the channel's uploads, uploading a video
 * with its thumbnail and captions, and changing a video's text or privacy. Each call costs quota
 * from the project's 10,000 units a day: an upload about 100, captions 400, a thumbnail or an
 * update 50, a listing 1.
 */
import { google } from './google.ts';

export const API = 'https://www.googleapis.com/youtube/v3';
const UPLOAD = 'https://www.googleapis.com/upload/youtube/v3';

/** A YouTube API call that answers with JSON. */
export async function youtube<T>(url: string, init: RequestInit = {}): Promise<T> {
  return (await (await google('YOUTUBE', url, init)).json()) as T;
}

export interface Snippet {
  title: string;
  description: string;
  tags?: string[];
  categoryId: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
}

/** Every video the channel has uploaded, with its snippet and privacy. */
export async function uploads(): Promise<Array<{ id: string; snippet: Snippet; status: { privacyStatus: string } }>> {
  const channels = await youtube<{ items: Array<{ contentDetails: { relatedPlaylists: { uploads: string } } }> }>(
    `${API}/channels?part=contentDetails&mine=true`,
  );
  const playlist = channels.items[0]?.contentDetails.relatedPlaylists.uploads;
  if (!playlist) throw new Error('This sign-in has no YouTube channel');
  const ids: string[] = [];
  let page = '';
  do {
    const list = await youtube<{ items: Array<{ contentDetails: { videoId: string } }>; nextPageToken?: string }>(
      `${API}/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlist}${page ? `&pageToken=${page}` : ''}`,
    );
    ids.push(...list.items.map((i) => i.contentDetails.videoId));
    page = list.nextPageToken ?? '';
  } while (page);
  const videos: Array<{ id: string; snippet: Snippet; status: { privacyStatus: string } }> = [];
  for (let i = 0; i < ids.length; i += 50) {
    const list = await youtube<{ items: typeof videos }>(`${API}/videos?part=snippet,status&id=${ids.slice(i, i + 50).join(',')}`);
    videos.push(...list.items);
  }
  return videos;
}

export type Privacy = 'public' | 'unlisted' | 'private';

/**
 * Uploads an MP4 with its title, description and tags, in Education, in English, and returns the
 * new video's id. YouTube keeps a video private, whatever privacy is asked for, until Google has
 * audited the API project.
 */
export async function insertVideo(
  mp4: Buffer,
  text: { title: string; description: string; tags: string[] },
  status: { privacy: Privacy; madeForKids: boolean },
): Promise<{ id: string; privacy: string }> {
  const meta = {
    snippet: { ...text, categoryId: '27', defaultLanguage: 'en', defaultAudioLanguage: 'en' },
    status: { privacyStatus: status.privacy, selfDeclaredMadeForKids: status.madeForKids, embeddable: true, license: 'youtube' },
  };
  const start = await google('YOUTUBE', `${UPLOAD}/videos?uploadType=resumable&part=snippet,status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': String(mp4.length) },
    body: JSON.stringify(meta),
  });
  const session = start.headers.get('location');
  if (!session) throw new Error('YouTube gave no upload address');
  const res = await google('YOUTUBE', session, { method: 'PUT', headers: { 'Content-Type': 'video/mp4' }, body: mp4 });
  const video = (await res.json()) as { id: string; status: { privacyStatus: string } };
  return { id: video.id, privacy: video.status.privacyStatus };
}

/** Sets a video's thumbnail (the channel must be verified for custom thumbnails). */
export async function setThumbnail(videoId: string, png: Buffer): Promise<void> {
  await google('YOUTUBE', `${UPLOAD}/thumbnails/set?videoId=${videoId}&uploadType=media`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/png' },
    body: png,
  });
}

/** Adds English captions from an SRT file, so YouTube shows ours rather than its own guesses. */
export async function insertCaptions(videoId: string, srt: Buffer): Promise<void> {
  const boundary = `gradileo-${Date.now().toString(36)}`;
  const meta = JSON.stringify({ snippet: { videoId, language: 'en', name: 'English', isDraft: false } });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n`),
    Buffer.from(`--${boundary}\r\nContent-Type: application/octet-stream\r\n\r\n`),
    srt,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);
  await google('YOUTUBE', `${UPLOAD}/captions?part=snippet&uploadType=multipart`, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  });
}

// ---------------------------------------------------------------- playlists

export interface Playlist {
  id: string;
  title: string;
  /** The YouTube ids of its videos, in playlist order. */
  videos: string[];
}

/** The channel's playlists, with their videos. */
export async function playlists(): Promise<Playlist[]> {
  const out: Playlist[] = [];
  let page = '';
  do {
    const list = await youtube<{ items: Array<{ id: string; snippet: { title: string } }>; nextPageToken?: string }>(
      `${API}/playlists?part=snippet&mine=true&maxResults=50${page ? `&pageToken=${page}` : ''}`,
    );
    for (const p of list.items) {
      out.push({ id: p.id, title: p.snippet.title, videos: (await playlistItems(p.id)).map((i) => i.videoId) });
    }
    page = list.nextPageToken ?? '';
  } while (page);
  return out;
}

/** A playlist's entries in order: each entry's own id and its video's id. */
async function playlistItems(playlistId: string): Promise<Array<{ id: string; videoId: string }>> {
  const items: Array<{ id: string; videoId: string }> = [];
  let page = '';
  do {
    const list = await youtube<{ items: Array<{ id: string; snippet: { resourceId: { videoId: string } } }>; nextPageToken?: string }>(
      `${API}/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}${page ? `&pageToken=${page}` : ''}`,
    );
    items.push(...list.items.map((i) => ({ id: i.id, videoId: i.snippet.resourceId.videoId })));
    page = list.nextPageToken ?? '';
  } while (page);
  return items;
}

/** Makes a public playlist and returns it, empty. */
export async function createPlaylist(title: string, description: string): Promise<Playlist> {
  const p = await youtube<{ id: string }>(`${API}/playlists?part=snippet,status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ snippet: { title, description, defaultLanguage: 'en' }, status: { privacyStatus: 'public' } }),
  });
  return { id: p.id, title, videos: [] };
}

/**
 * Puts a video into a playlist at a position (0 is first). A playlist that sorts itself (by date,
 * say) takes no position, so the video goes at the end and the playlist's own order applies. A
 * playlist made moments ago can refuse with 409 for a little while, so that is tried again.
 */
export async function addToPlaylist(playlist: Playlist, videoId: string, position: number): Promise<void> {
  const insert = (at?: number) =>
    youtube(`${API}/playlistItems?part=snippet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ snippet: { playlistId: playlist.id, position: at, resourceId: { kind: 'youtube#video', videoId } } }),
    });
  for (let attempt = 1; ; attempt++) {
    try {
      await insert(position);
      playlist.videos.splice(position, 0, videoId);
      return;
    } catch (e) {
      const message = (e as Error).message;
      if (message.includes('manual sorting')) {
        await insert(undefined);
        playlist.videos.push(videoId);
        return;
      }
      if (attempt < 4 && message.includes(' 409 ')) {
        await new Promise((r) => setTimeout(r, 3000 * attempt));
        continue;
      }
      throw e;
    }
  }
}

/**
 * Puts a playlist's videos in order, lowest rank first, moving only the ones out of place (50 units
 * a move); videos ranked Infinity keep their order after the rest. Only a playlist set to sort
 * manually can be reordered. Returns how many videos moved, or would move on a dry run.
 */
export async function sortPlaylist(playlist: Playlist, rank: (videoId: string) => number, dryRun = false): Promise<number> {
  const items = await playlistItems(playlist.id);
  const want = [...items].sort((a, b) => {
    const [ra, rb] = [rank(a.videoId), rank(b.videoId)];
    return ra === rb ? 0 : ra < rb ? -1 : 1;
  });
  let moved = 0;
  for (let i = 0; i < want.length; i++) {
    if (items[i] === want[i]) continue;
    if (!dryRun) {
      await youtube(`${API}/playlistItems?part=snippet`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: want[i].id,
          snippet: { playlistId: playlist.id, position: i, resourceId: { kind: 'youtube#video', videoId: want[i].videoId } },
        }),
      });
    }
    items.splice(items.indexOf(want[i]), 1);
    items.splice(i, 0, want[i]);
    moved++;
  }
  if (!dryRun) playlist.videos = items.map((i) => i.videoId);
  return moved;
}
