/** The class forum's pages for the teacher and for the student (src/features/forum/Forum.tsx). */
import { useParams } from 'react-router-dom';
import { Button, EmptyState, PageSpinner } from '@/components/ui/index.ts';
import { useClassId } from '@/features/teacher/shared.tsx';
import { useStudentClass } from '@/features/shared/useStudentClass.ts';
import { ForumList, ForumTopic } from './Forum.tsx';

export function TeacherForumPage() {
  const classId = useClassId();
  return <ForumList classId={classId} role="teacher" base={`/t/c/${classId}/forum`} />;
}

export function TeacherForumTopicPage() {
  const classId = useClassId();
  const { topicId = '' } = useParams();
  return <ForumTopic classId={classId} topicId={topicId} role="teacher" base={`/t/c/${classId}/forum`} />;
}

/** A self-paced course has no teacher to look after a forum. */
function useStudentForumClass() {
  const { cls, isLoading } = useStudentClass();
  if (isLoading) return { node: <PageSpinner /> };
  if (!cls) return { node: <EmptyState title="Join a class to use its forum" action={<Button to="/s/join">Join a class</Button>} /> };
  if (cls.kind === 'self' || !cls.teacherId) return { node: <EmptyState title="Your course has no class forum">The forum belongs to a class with a teacher. Ask your AI tutor in any lesson instead.</EmptyState> };
  return { classId: cls.id };
}

export function StudentForumPage() {
  const c = useStudentForumClass();
  return c.classId ? <ForumList classId={c.classId} role="student" base="/s/forum" /> : c.node;
}

export function StudentForumTopicPage() {
  const c = useStudentForumClass();
  const { topicId = '' } = useParams();
  return c.classId ? <ForumTopic classId={c.classId} topicId={topicId} role="student" base="/s/forum" /> : c.node;
}
