// Usage: npx tsx video/tools/youtube-comments.ts [--state <file>] [--dry-run] [--json]
//
// Lists the comments viewers have left on any of the Gradileo channel's videos since the last run,
// so none is missed: new top-level comments and new replies in old threads (a viewer answering one
// of our replies, say). The channel's own comments are never listed. Each is printed with its
// video's title and Gradileo video id (from the title, as in youtube-update.ts), the comment's
// text, whether the channel has already answered it, and a link that opens it on YouTube. --json
// prints the same as JSON, for a scheduled check to draft replies from.
//
// The comments already seen are kept in --state (by default
// /mnt/project-files/viewer-requests/youtube-comments-seen.json, the project's shared folder); a
// run adds what it listed, unless --dry-run. With no record yet, every comment is new. Nothing is
// ever posted: replies are written by hand, or by Claude only after the owner says yes.
//
// Quota: it reads every thread on the channel (commentThreads.list with allThreadsRelatedToChannelId,
// 1 unit per 100 threads), the full replies of a thread with more than five whose count changed
// (comments.list, 1 unit per 100), and the titles of the videos with new comments (videos.list, 1
// unit per 50), so a run costs a few units of the day's 10,000, next to about 110 an upload.
//
// Signs in with the YOUTUBE_* variables, like the uploader (youtube.force-ssl covers reading
// comments). Their values are never printed.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { scriptOf } from '../lib/catalog.ts';
import { commentLink, emptySeen, newComments, threadsToExpand, type Comment, type Seen, type Thread } from '../../src/video/youtube-comments.ts';
import { API, youtube } from '../lib/youtube.ts';

interface RawComment {
  id: string;
  snippet: {
    videoId?: string;
    authorDisplayName: string;
    authorChannelId?: { value: string };
    textOriginal: string;
    publishedAt: string;
    parentId?: string;
  };
}
interface RawThread {
  id: string;
  snippet: { videoId: string; topLevelComment: RawComment; totalReplyCount: number };
  replies?: { comments: RawComment[] };
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const json = args.includes('--json');
const at = args.indexOf('--state');
const statePath = at >= 0 ? args[at + 1] : '/mnt/project-files/viewer-requests/youtube-comments-seen.json';
if (!statePath) throw new Error('--state needs a file');

let units = 0;
async function call<T>(url: string): Promise<T> {
  units += 1;
  return youtube<T>(url);
}

const toComment = (c: RawComment, videoId: string, threadId: string): Comment => ({
  id: c.id,
  threadId,
  videoId,
  author: c.snippet.authorDisplayName,
  authorChannelId: c.snippet.authorChannelId?.value ?? '',
  text: c.snippet.textOriginal,
  publishedAt: c.snippet.publishedAt,
  inReplyTo: c.snippet.parentId,
});

const channels = await call<{ items: Array<{ id: string }> }>(`${API}/channels?part=id&mine=true`);
const channelId = channels.items[0]?.id;
if (!channelId) throw new Error('This sign-in has no YouTube channel');

const threads: Thread[] = [];
let page = '';
do {
  const list = await call<{ items: RawThread[]; nextPageToken?: string }>(
    `${API}/commentThreads?part=snippet,replies&maxResults=100&order=time&allThreadsRelatedToChannelId=${channelId}${page ? `&pageToken=${page}` : ''}`,
  );
  for (const t of list.items) {
    const videoId = t.snippet.videoId;
    threads.push({
      id: t.id,
      videoId,
      top: toComment(t.snippet.topLevelComment, videoId, t.id),
      totalReplyCount: t.snippet.totalReplyCount,
      replies: (t.replies?.comments ?? []).map((c) => toComment(c, videoId, t.id)),
    });
  }
  page = list.nextPageToken ?? '';
} while (page);

const seen: Seen = existsSync(statePath) ? (JSON.parse(readFileSync(statePath, 'utf8')) as Seen) : emptySeen();
for (const t of threadsToExpand(threads, seen)) {
  const replies: Comment[] = [];
  let next = '';
  do {
    const list = await call<{ items: RawComment[]; nextPageToken?: string }>(
      `${API}/comments?part=snippet&maxResults=100&textFormat=plainText&parentId=${t.id}${next ? `&pageToken=${next}` : ''}`,
    );
    replies.push(...list.items.map((c) => toComment(c, t.videoId, t.id)));
    next = list.nextPageToken ?? '';
  } while (next);
  t.replies = replies;
}

const { fresh, seen: after } = newComments(threads, seen, channelId);

// The titles of the videos commented on, and their Gradileo ids.
const videos = new Map<string, { title: string; script?: string }>();
const ids = [...new Set(fresh.map((c) => c.videoId))];
for (let i = 0; i < ids.length; i += 50) {
  const list = await call<{ items: Array<{ id: string; snippet: { title: string; description: string } }> }>(
    `${API}/videos?part=snippet&id=${ids.slice(i, i + 50).join(',')}`,
  );
  for (const v of list.items) videos.set(v.id, { title: v.snippet.title, script: scriptOf(v.snippet.title, v.snippet.description) });
}

const report = fresh.map((c) => {
  const thread = threads.find((t) => t.id === c.threadId)!;
  return {
    ...c,
    videoTitle: videos.get(c.videoId)?.title ?? '',
    script: videos.get(c.videoId)?.script,
    link: commentLink(c),
    // For a reply, what it answers.
    thread: c.inReplyTo ? [thread.top, ...thread.replies].filter((o) => o.publishedAt < c.publishedAt).map((o) => `${o.author}: ${o.text}`) : undefined,
  };
});

if (json) console.log(JSON.stringify({ threads: threads.length, units, comments: report }, null, 2));
else {
  console.log(`${threads.length} threads on the channel, ${report.length} new comment${report.length === 1 ? '' : 's'} (${units} quota units)`);
  for (const c of report) {
    console.log(`\n${c.publishedAt}  ${c.author} on "${c.videoTitle}"${c.script ? ` (${c.script})` : ''}${c.inReplyTo ? ', a reply' : ''}${c.answered ? ', already answered' : ''}`);
    for (const line of c.thread ?? []) console.log(`  > ${line}`);
    console.log(`  ${c.text.replace(/\n/g, '\n  ')}`);
    console.log(`  ${c.link}`);
  }
}

if (!dryRun) {
  mkdirSync(path.dirname(statePath), { recursive: true });
  writeFileSync(statePath, `${JSON.stringify(after, null, 2)}\n`);
}
