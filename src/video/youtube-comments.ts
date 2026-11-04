/**
 * Finding the comments on the channel's videos that nobody has seen yet, for
 * video/tools/youtube-comments.ts. A thread is a viewer's top-level comment with its replies. The
 * record of what has been seen keeps every comment id already reported (or written by the channel
 * itself) and each thread's reply count, so a thread whose count has grown is read again for its new
 * replies.
 */

export interface Comment {
  id: string;
  /** The thread's top-level comment id; the same as id for a top-level comment. */
  threadId: string;
  videoId: string;
  author: string;
  authorChannelId: string;
  text: string;
  publishedAt: string;
  /** The top-level comment this replies to, for a reply. */
  inReplyTo?: string;
}

export interface Thread {
  id: string;
  videoId: string;
  top: Comment;
  totalReplyCount: number;
  /** The replies the listing carried; YouTube sends at most five, so a long thread has more. */
  replies: Comment[];
}

export interface Seen {
  /** Every comment id already reported or written by the channel. */
  comments: string[];
  /** Each thread's reply count when it was last read. */
  replyCounts: Record<string, number>;
}

export const emptySeen = (): Seen => ({ comments: [], replyCounts: {} });

/**
 * The threads whose replies must be fetched in full: those with more replies than the listing
 * carried. They are read every run, not only when their count changes, since a deleted reply and a
 * new one leave the count as it was. Each costs a unit, and few threads run past five replies.
 */
export function threadsToExpand(threads: Thread[]): Thread[] {
  return threads.filter((t) => t.totalReplyCount > t.replies.length);
}

/**
 * The viewers' comments not in the record, oldest first, and the record with every comment of these
 * threads added. The channel's own comments are recorded but never reported. A new reply also says
 * whether the channel has answered the thread after it.
 */
export function newComments(threads: Thread[], seen: Seen, channelId: string): { fresh: Array<Comment & { answered: boolean }>; seen: Seen } {
  const known = new Set(seen.comments);
  const counts = { ...seen.replyCounts };
  const fresh: Array<Comment & { answered: boolean }> = [];
  for (const t of threads) {
    const all = [t.top, ...t.replies];
    for (const c of all) {
      if (known.has(c.id)) continue;
      known.add(c.id);
      if (c.authorChannelId === channelId) continue;
      const answered = all.some((o) => o.authorChannelId === channelId && o.publishedAt > c.publishedAt);
      fresh.push({ ...c, answered });
    }
    counts[t.id] = t.totalReplyCount;
  }
  fresh.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  return { fresh, seen: { comments: [...known], replyCounts: counts } };
}

/** A link that opens the video with the comment highlighted. */
export const commentLink = (c: Comment) => `https://www.youtube.com/watch?v=${c.videoId}&lc=${c.id}`;
