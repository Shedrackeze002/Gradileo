/**
 * The class forum in demo mode, with the same rules as the database's class_forum(): the teacher
 * sees every post and author; a student sees the class's questions that are not hidden and their
 * own posts, and never the author of a classmate's question posted without a name (nor that
 * author's replies under it).
 */
import type { ForumPost, ForumVisibility } from '../types.ts';

export interface DemoForumPost {
  id: string;
  classId: string;
  authorId: string;
  topicId: string | null;
  title: string | null;
  body: string;
  visibility: ForumVisibility;
  pinned: boolean;
  answered: boolean;
  hidden: boolean;
  createdAt: string;
}

/** "Amara O.": how a student's name shows to classmates. */
export function forumShortName(full: string): string {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? 'Student';
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export function forumView(posts: DemoForumPost[], opts: { classId: string; viewerId: string; isTeacher: boolean; person: (id: string) => { fullName: string; role: 'teacher' | 'student' } }): ForumPost[] {
  const { viewerId: me, isTeacher } = opts;
  const byId = new Map(posts.map((p) => [p.id, p]));
  return posts
    .filter((p) => p.classId === opts.classId)
    .flatMap((p): ForumPost[] => {
      const t = p.topicId ? byId.get(p.topicId) : p;
      if (!t) return [];
      const visible = isTeacher || ((t.authorId === me || (t.visibility !== 'teacher' && !t.hidden)) && (!p.hidden || p.authorId === me));
      if (!visible) return [];
      const masked = !isTeacher && t.visibility === 'anonymous' && p.authorId === t.authorId && p.authorId !== me;
      const who = opts.person(p.authorId);
      return [
        {
          id: p.id,
          classId: p.classId,
          topicId: p.topicId,
          title: p.title,
          body: p.body,
          visibility: p.visibility,
          pinned: p.pinned,
          answered: p.answered,
          hidden: p.hidden,
          createdAt: p.createdAt,
          authorId: masked ? null : p.authorId,
          authorName: masked ? 'A classmate' : who.role === 'teacher' || isTeacher ? who.fullName : forumShortName(who.fullName),
          authorRole: who.role,
          mine: p.authorId === me,
        },
      ];
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
}
