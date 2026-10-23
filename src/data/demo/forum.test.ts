import { describe, expect, it } from 'vitest';
import { forumShortName, forumView, type DemoForumPost } from './forum.ts';

const people: Record<string, { fullName: string; role: 'teacher' | 'student' }> = {
  t: { fullName: 'Ms Teacher', role: 'teacher' },
  sam: { fullName: 'Sam Student', role: 'student' },
  lee: { fullName: 'Lee Kim', role: 'student' },
};
let n = 0;
const post = (p: Partial<DemoForumPost>): DemoForumPost => ({ id: `p${++n}`, classId: 'c', authorId: 'sam', topicId: null, title: 'Q', body: 'B', visibility: 'class', pinned: false, answered: false, hidden: false, createdAt: `2026-10-23T10:0${n}:00Z`, ...p });
const anon = post({ visibility: 'anonymous', title: 'Negatives?' });
const priv = post({ visibility: 'teacher', title: 'Late work' });
const open = post({ title: 'Study group' });
const leeReply = post({ topicId: anon.id, title: null, authorId: 'lee', visibility: 'anonymous', hidden: true });
const samReply = post({ topicId: anon.id, title: null, visibility: 'anonymous', body: 'Thanks!' });
const all = [anon, priv, open, leeReply, samReply];
const view = (viewerId: string, isTeacher = false) => forumView(all, { classId: 'c', viewerId, isTeacher, person: (id) => people[id] });

describe('the class forum in demo mode', () => {
  it('shows short names to classmates', () => {
    expect(forumShortName('Sam Student')).toBe('Sam S.');
    expect(forumShortName('Plato')).toBe('Plato');
  });

  it('hides a question posted without a name, and its author’s replies, from classmates', () => {
    const lee = view('lee');
    expect(lee.map((p) => p.id)).toEqual([anon.id, open.id, leeReply.id, samReply.id]);
    expect(lee.find((p) => p.id === anon.id)).toMatchObject({ authorId: null, authorName: 'A classmate', mine: false });
    expect(lee.find((p) => p.id === samReply.id)).toMatchObject({ authorId: null, authorName: 'A classmate' });
    expect(lee.find((p) => p.id === open.id)?.authorName).toBe('Sam S.');
    // Lee still sees their own hidden reply.
    expect(lee.find((p) => p.id === leeReply.id)).toMatchObject({ hidden: true, mine: true });
  });

  it('shows the author their own posts, and the teacher everything', () => {
    const sam = view('sam');
    expect(sam.find((p) => p.id === anon.id)).toMatchObject({ authorId: 'sam', mine: true });
    expect(sam.some((p) => p.id === priv.id)).toBe(true);
    expect(sam.some((p) => p.id === leeReply.id)).toBe(false);
    const teacher = view('t', true);
    expect(teacher).toHaveLength(5);
    expect(teacher.find((p) => p.id === anon.id)).toMatchObject({ authorId: 'sam', authorName: 'Sam Student' });
  });
});
