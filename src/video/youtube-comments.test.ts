import { describe, expect, it } from 'vitest';
import { commentLink, emptySeen, newComments, threadsToExpand, type Comment, type Thread } from './youtube-comments.ts';

const CHANNEL = 'UCchannel';
const comment = (id: string, author: string, at: string, inReplyTo?: string): Comment => ({
  id,
  threadId: inReplyTo ?? id,
  videoId: 'vid1',
  author,
  authorChannelId: author === 'Gradileo' ? CHANNEL : `UC${author}`,
  text: `${author} says hello`,
  publishedAt: at,
  inReplyTo,
});
const thread = (top: Comment, replies: Comment[], total = replies.length): Thread => ({ id: top.id, videoId: top.videoId, top, totalReplyCount: total, replies });

describe('newComments', () => {
  it('reports a viewer comment once, and never the channel’s own', () => {
    const t = thread(comment('a', 'viewer', '2026-11-01T00:00:00Z'), [comment('a.1', 'Gradileo', '2026-11-02T00:00:00Z', 'a')]);
    const first = newComments([t], emptySeen(), CHANNEL);
    expect(first.fresh.map((c) => c.id)).toEqual(['a']);
    expect(first.fresh[0].answered).toBe(true);
    expect(first.seen.comments.sort()).toEqual(['a', 'a.1']);
    expect(first.seen.replyCounts).toEqual({ a: 1 });
    expect(newComments([t], first.seen, CHANNEL).fresh).toEqual([]);
  });

  it('reports a viewer’s follow-up reply as unanswered, oldest first', () => {
    const top = comment('b', 'viewer', '2026-11-01T00:00:00Z');
    const seen = newComments([thread(top, [])], emptySeen(), CHANNEL).seen;
    const later = thread(top, [comment('b.2', 'other', '2026-11-03T00:00:00Z', 'b'), comment('b.1', 'viewer', '2026-11-02T00:00:00Z', 'b')]);
    const { fresh } = newComments([later], seen, CHANNEL);
    expect(fresh.map((c) => [c.id, c.answered])).toEqual([
      ['b.1', false],
      ['b.2', false],
    ]);
  });
});

describe('threadsToExpand', () => {
  it('reads a long thread in full every run, even when its count is unchanged', () => {
    const t = thread(comment('c', 'viewer', '2026-11-01T00:00:00Z'), [], 7);
    expect(threadsToExpand([t])).toEqual([t]);
    expect(threadsToExpand([thread(comment('e', 'viewer', '2026-11-01T00:00:00Z'), [])])).toEqual([]);
  });

  it('reports a new reply when a deleted one left the count unchanged', () => {
    const top = comment('f', 'viewer', '2026-11-01T00:00:00Z');
    const before = thread(top, [comment('f.1', 'other', '2026-11-02T00:00:00Z', 'f')]);
    const seen = newComments([before], emptySeen(), CHANNEL).seen;
    const after = thread(top, [comment('f.2', 'other', '2026-11-03T00:00:00Z', 'f')]);
    expect(newComments([after], seen, CHANNEL).fresh.map((c) => c.id)).toEqual(['f.2']);
  });
});

it('links to the comment on its video', () => {
  expect(commentLink(comment('d', 'viewer', '2026-11-01T00:00:00Z'))).toBe('https://www.youtube.com/watch?v=vid1&lc=d');
});
