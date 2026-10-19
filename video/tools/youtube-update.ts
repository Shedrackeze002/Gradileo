// Usage: npx tsx video/tools/youtube-update.ts [--dry-run] [video id ...] [youtube id=video id ...]
//
// Brings the title, description and tags of Gradileo's videos on YouTube up to date with the
// YouTube text (src/video/youtube-text.ts), without uploading anything again. It lists the
// channel's uploads and finds each one's script by its title (the part before " | "); when two
// scripts share a title, the course named in the description decides. A title edited by hand on
// YouTube matches no script: name its video with "<youtube id>=<video id>" (the Videos page in
// the admin console lists both). Only videos whose text differs are updated; with video ids, only
// those. --dry-run lists what would change.
//
// It signs in with the environment variables YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET and
// YOUTUBE_REFRESH_TOKEN (an OAuth client with the youtube.force-ssl scope, signed in as the
// channel; see video/README.md, "YouTube API"). Their values are never printed. An update costs 50
// of the 10,000 units the API allows a day, so about 200 videos can be renamed a day.
import { scriptOf, youtubeFieldsFor } from '../lib/catalog.ts';
import { API, uploads, youtube } from '../lib/youtube.ts';

// YouTube stores tags in its own order, so compare them as sets.
const same = (a: string[] = [], b: string[] = []) => a.length === b.length && b.every((t) => a.includes(t));

// ---------------------------------------------------------------- main

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const named = new Map(args.filter((a) => a.includes('=')).map((a) => a.split('=', 2) as [string, string]));
const only = new Set(args.filter((a) => a !== '--dry-run' && !a.includes('=')));
let failed = 0;
let updated = 0;
for (const { id: youtubeId, snippet } of await uploads()) {
  const id = named.get(youtubeId) ?? scriptOf(snippet.title, snippet.description);
  if (!id) {
    console.log(`${youtubeId}: no script matches "${snippet.title}"; left as it is`);
    continue;
  }
  if (only.size && !only.has(id)) continue;
  try {
    const want = await youtubeFieldsFor(id);
    const norm = (s: string) => s.replace(/\r\n/g, '\n').trim();
    if (snippet.title === want.title && norm(snippet.description) === norm(want.description) && same(snippet.tags, want.tags)) {
      console.log(`${id} (${youtubeId}): unchanged`);
      continue;
    }
    if (dryRun) {
      console.log(`${id} (${youtubeId}): would rename "${snippet.title}" to "${want.title}"`);
      continue;
    }
    const { categoryId, defaultLanguage, defaultAudioLanguage } = snippet;
    await youtube(`${API}/videos?part=snippet`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: youtubeId, snippet: { ...want, categoryId, defaultLanguage, defaultAudioLanguage } }),
    });
    updated++;
    console.log(`${id} (${youtubeId}): renamed "${want.title}"`);
  } catch (e) {
    console.error(`${id} (${youtubeId}): ${(e as Error).message}`);
    failed++;
  }
}
console.log(`${updated} updated${failed ? `, ${failed} failed` : ''}`);
if (failed) process.exit(1);
