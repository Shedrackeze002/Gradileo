/**
 * Browse by topic (roadmap item 5, step 2): every lesson filed under a plain topic, whichever course
 * teaches it, with a search box over topics and lesson titles. Each topic's level is given in the
 * learner's own years where their school system names them. A lesson in the student's current
 * course opens there; a lesson in another course opens in that course, studied self-paced.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { TOPICS, TOPIC_SUBJECTS, topicLessons, topicLevel, type Topic, type TopicLesson } from '@engine/topics.ts';
import { useStartSelfPaced } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Badge, Card, EmptyState, Input, PageHeader, Tabs, useToast } from '@/components/ui/index.ts';
import { chooseStudentClass, useStudentClass } from '../shared/useStudentClass.ts';

interface Found {
  topic: Topic;
  lessons: TopicLesson[];
}

/** A topic's lessons grouped by course, youngest course first. */
function byCourse(lessons: TopicLesson[]) {
  const groups: Array<{ courseId: string; lessons: TopicLesson[] }> = [];
  for (const l of lessons) {
    const g = groups.find((x) => x.courseId === l.courseId);
    if (g) g.lessons.push(l);
    else groups.push({ courseId: l.courseId, lessons: [l] });
  }
  return groups;
}

export default function TopicsPage() {
  const me = useMe();
  const { cls, classes } = useStudentClass();
  const navigate = useNavigate();
  const toast = useToast();
  const start = useStartSelfPaced();
  const current = getCourse(cls?.courseId ?? '')?.subject;
  const [subject, setSubject] = useState(current && TOPIC_SUBJECTS.includes(current) ? current : TOPIC_SUBJECTS[0]!);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const q = query.trim().toLowerCase();

  // Without a search, the chosen subject's topics; with one, matching topics and lessons in every subject.
  const found: Found[] = useMemo(
    () =>
      TOPICS.filter((t) => (q ? true : t.subject === subject)).flatMap((topic) => {
        const lessons = topicLessons(topic);
        const hits = !q || topic.name.toLowerCase().includes(q) ? lessons : lessons.filter((l) => l.title.toLowerCase().includes(q));
        return hits.length ? [{ topic, lessons: hits }] : [];
      }),
    [q, subject],
  );
  const strands = [...new Set(found.map((f) => f.topic.strand))];
  const mine = new Set(classes.map((c) => c.courseId));

  const openLesson = async (l: TopicLesson) => {
    if (cls?.courseId === l.courseId) return navigate(`/s/learn/${l.lessonId}`);
    const self = classes.find((c) => c.kind === 'self' && c.courseId === l.courseId);
    try {
      const c = self ?? (await start.mutateAsync(l.courseId));
      chooseStudentClass(c.id);
      if (!self) toast({ kind: 'success', title: `${getCourse(l.courseId)?.shortTitle ?? 'The course'} is in your courses`, body: 'You study it self-paced, with every lesson open.' });
      navigate(`/s/learn/${l.lessonId}`);
    } catch (e) {
      toast({ kind: 'error', title: 'Could not open the lesson', body: (e as Error).message });
    }
  };

  const card = ({ topic, lessons }: Found) => {
    const expanded = !!q || open === topic.id;
    return (
      <Card key={topic.id} className="overflow-hidden">
        <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded && !q ? null : topic.id)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-2">
          {expanded ? <ChevronDown className="h-4 w-4 shrink-0 text-ink-3" /> : <ChevronRight className="h-4 w-4 shrink-0 text-ink-3" />}
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-ink">{topic.name}</span>
            <span className="block text-sm text-ink-3">
              {q && `${topic.subject} · `}
              {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
            </span>
          </span>
          <Badge>{topicLevel(topic, me.curriculum)}</Badge>
        </button>
        {expanded && (
          <div className="space-y-3 border-t border-line px-4 py-3">
            {byCourse(lessons).map((g) => (
              <section key={g.courseId} aria-label={getCourse(g.courseId)?.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-3">
                  {getCourse(g.courseId)?.shortTitle}
                  {!mine.has(g.courseId) && <span className="ml-2 font-normal normal-case tracking-normal">· opens as a self-paced course</span>}
                </h3>
                <ul className="mt-1.5 space-y-1">
                  {g.lessons.map((l) => (
                    <li key={l.lessonId}>
                      <button
                        type="button"
                        disabled={start.isPending}
                        onClick={() => void openLesson(l)}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[15px] text-ink-2 hover:bg-brand-50 hover:text-brand-800 disabled:opacity-60"
                      >
                        <BookOpen className="h-4 w-4 shrink-0 text-brand" />
                        {l.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Browse by topic" subtitle="Find any lesson by its topic, whichever course teaches it." />
      <div className="mb-5 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <Input aria-label="Search topics and lessons" placeholder="Search, for example “fractions” or “sine law”" value={query} onChange={(e) => setQuery(e.target.value)} className="[&_input]:pl-9" />
        </div>
        {!q && TOPIC_SUBJECTS.length > 1 && <Tabs value={subject} onChange={setSubject} items={TOPIC_SUBJECTS.map((s) => ({ value: s, label: s }))} />}
      </div>
      {found.length === 0 && <EmptyState icon={<Search className="h-6 w-6" />} title="No topic or lesson matches">Try a shorter word, or browse the topics without searching.</EmptyState>}
      {q ? (
        <div className="space-y-2.5">{found.map(card)}</div>
      ) : (
        <div className="space-y-6">
          {strands.map((s) => (
            <section key={s} aria-label={s}>
              <h2 className="mb-2.5 text-sm font-semibold uppercase tracking-wide text-ink-3">{s}</h2>
              <div className="space-y-2.5">{found.filter((f) => f.topic.strand === s).map(card)}</div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
