import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarClock, Compass, Flame, KeyRound, Megaphone, PlayCircle, RotateCcw, Sparkles, Target, X } from 'lucide-react';
import { courseOfSkill, lessonById, getCourse } from '@engine/curriculum/index.ts';
import { analyzeStudent, buildStudentContext } from '@engine/ai/index.ts';
import type { SkillState } from '@engine/mastery.ts';
import { TYPE_LABEL } from '@engine/assemble.ts';
import { useAnnouncements, useAssignments, useEvents, useMastery, usePublications, useSubmissions } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Badge, Button, Card, CardBody, CardHeader, PageSpinner, ProgressRing } from '@/components/ui/index.ts';
import { MasteryChip } from '@/components/mastery/Mastery.tsx';
import { Markdown } from '@/components/math/Markdown.tsx';
import { dueLabel, greeting, relative } from '@/lib/dates.ts';
import { courseMastery, masteryMap, recommendedSkills, selfPacedLessons, skillLabel, sortByDue, studentWork, type StudentWork } from '../shared/derive.ts';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { clearReviewSkills, reviewSkills } from './review.ts';
import { MyRequests } from './JoinClassPage.tsx';
import { WaitingToJoin } from './WaitingToJoin.tsx';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { cn } from '@/lib/cn.ts';

export default function StudentHome() {
  const me = useMe();
  const { cls, isLoading } = useStudentClass();
  const assignments = useAssignments(cls?.id);
  const subs = useSubmissions({ studentId: me.id });
  const mastery = useMastery({ studentId: me.id });
  const pubs = usePublications(cls?.id);
  const events = useEvents(cls?.id, me.id, 30);
  const ann = useAnnouncements(cls?.id);

  const work = useMemo(() => studentWork(assignments.data ?? [], subs.data ?? []), [assignments.data, subs.data]);
  const map = useMemo(() => masteryMap(mastery.data ?? []), [mastery.data]);
  const todo = sortByDue(work.filter((w) => w.status === 'todo' || w.status === 'in_progress' || w.status === 'missing'));
  const missing = todo.filter((w) => w.status === 'missing');
  const upcoming = todo.filter((w) => w.status !== 'missing');
  const next = upcoming[0] ?? missing[0];
  const self = cls?.kind === 'self';
  // Self-paced study opens every lesson, so the lessons up to the student's next one count as taught.
  const frontier = useMemo(() => (cls && self ? selfPacedLessons(cls.courseId, map) : null), [cls, self, map]);
  const published = frontier ? frontier.taught : (pubs.data ?? []).sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)).map((p) => p.lessonId);
  const recs = recommendedSkills(published, map, 4);
  const course = cls ? getCourse(cls.courseId) : undefined;
  const cm = cls ? courseMastery(cls.courseId, map) : null;
  const latestLesson = frontier ? lessonById(frontier.next ?? '') : published.length ? lessonById(published[published.length - 1]) : undefined;

  const coach = useMemo(() => {
    if (!cls || !mastery.data || !events.data) return null;
    const ctx = buildStudentContext(
      {
        courseId: cls.courseId,
        className: cls.name,
        students: [{ id: me.id, name: me.fullName }],
        taughtLessonIds: published,
        mastery: mastery.data,
        events: events.data.map((e) => ({ studentId: e.studentId, skillId: e.skillId, correct: e.correct, assisted: e.assisted, at: e.at, prompt: e.prompt, answer: e.answer, expected: e.expected })),
        assignments: (assignments.data ?? []).map((a) => ({ id: a.id, title: a.title, type: a.type, dueAt: a.dueAt, assignedTo: a.assignedTo, status: a.status })),
        submissions: (subs.data ?? []).filter((s) => s.assignmentId).map((s) => ({ assignmentId: s.assignmentId!, studentId: s.studentId, status: s.status, submittedAt: s.submittedAt, percent: s.percent })),
      },
      me.id,
    );
    return analyzeStudent(ctx);
  }, [cls, mastery.data, events.data, assignments.data, subs.data, published, me.id, me.fullName]);

  const activeDays = useMemo(() => {
    const days = new Set((events.data ?? []).filter((e) => Date.now() - new Date(e.at).getTime() < 7 * 86_400_000).map((e) => e.at.slice(0, 10)));
    return days.size;
  }, [events.data]);

  if (isLoading) return <PageSpinner />;
  if (!cls) return me.nameOnly ? <WaitingToJoin /> : <GetStarted name={me.fullName.split(' ')[0]} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold sm:text-[28px]">
          {greeting()}, {me.fullName.split(' ')[0]}
        </h1>
        <p className="text-ink-3">{self ? `${course?.title} · Self-paced with your AI tutor` : `${cls.name}${cls.section ? ` · ${cls.section}` : ''} · ${course?.title}`}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {next ? <UpNext w={next} /> : self && latestLesson ? <NextLesson lesson={latestLesson} /> : <AllDone />}
        <Card className="flex items-center gap-5 p-5">
          <ProgressRing value={cm?.percent ?? 0} size={96} stroke={9} sublabel="mastery" />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-ink-3">Course mastery</div>
            <div className="mt-1 text-sm text-ink-2">
              <strong className="text-ink">{cm?.counts.mastered ?? 0}</strong> mastered · <strong className="text-ink">{cm?.counts.proficient ?? 0}</strong> proficient · <strong className="text-ink">{cm?.counts.familiar ?? 0}</strong> familiar
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Flame className={cn('h-4 w-4', activeDays ? 'text-accent' : 'text-ink-3')} style={{ color: activeDays ? 'rgb(var(--accent))' : undefined }} />
              <span className="text-ink-2">
                Practised on <strong>{activeDays}</strong> of the last 7 days
              </span>
            </div>
            <Link to="/s/progress" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              See my progress <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader title="To do" subtitle={`${upcoming.length} upcoming${missing.length ? ` · ${missing.length} missing` : ''}`} icon={<CalendarClock className="h-5 w-5" />} action={<Button variant="ghost" size="sm" to="/s/work">View all</Button>} />
            <CardBody className="space-y-2 pt-4">
              {todo.length === 0 && <p className="py-6 text-center text-sm text-ink-3">Nothing due. Great time to practise a skill!</p>}
              {todo.slice(0, 6).map((w) => (
                <WorkRow key={w.assignment.id} w={w} />
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Recommended practice" subtitle="Short, focused sets build mastery fastest." icon={<Target className="h-5 w-5" />} />
            <CardBody className="grid gap-3 pt-4 sm:grid-cols-2">
              {recs.length === 0 && <p className="text-sm text-ink-3">{self ? 'Open your next lesson to start; recommended skills appear as you practise.' : 'When your teacher publishes lessons, recommended skills appear here.'}</p>}
              {recs.map((r) => (
                <Link key={r.skillId} to={`/s/practice?skills=${r.skillId}`} className="group rounded-2xl border border-line p-4 transition hover:border-brand-300 hover:bg-brand-50/40">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-ink">{skillLabel(r.skillId)}</div>
                    <PlayCircle className="h-5 w-5 shrink-0 text-brand opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <MasteryChip level={r.level} />
                    <span className="text-xs text-ink-3">{r.reason === 'weak' ? 'Needs practice' : r.reason === 'review' ? 'Review due' : 'Not started'}</span>
                  </div>
                </Link>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="min-w-0 space-y-6">
          <MyRequests pendingOnly className="" />
          <PlacementReview classId={cls.id} map={map} />
          {coach?.studentNote && (
            <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-surface">
              <CardBody>
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                  <Sparkles className="h-4 w-4" /> {self ? 'Your AI tutor' : 'Your study coach'}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{coach.studentNote}</p>
                {coach.strengths.length > 0 && (
                  <div className="mt-3 text-sm text-ink-3">
                    Strongest: <span className="font-medium text-ink-2">{coach.strengths.slice(0, 2).map((s) => skillLabel(s.skillId ?? '')).join(', ')}</span>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
          {latestLesson && !(self && !next) && (
            <Card>
              <CardHeader title={self ? 'Your next lesson' : 'Continue learning'} icon={<BookOpen className="h-5 w-5" />} />
              <CardBody className="pt-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Lesson {latestLesson.number}</div>
                <div className="mt-1 font-semibold">{latestLesson.title}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button to={`/s/learn/${latestLesson.id}/tutor`} icon={<Sparkles className="h-4 w-4" />}>
                    Start with your AI tutor
                  </Button>
                  <Button variant="soft" to={`/s/learn/${latestLesson.id}`}>
                    Open lesson <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
          {!self && (
          <Card>
            <CardHeader title="Announcements" icon={<Megaphone className="h-5 w-5" />} />
            <CardBody className="space-y-4 pt-4">
              {(ann.data ?? []).length === 0 && <p className="text-sm text-ink-3">No announcements yet.</p>}
              {(ann.data ?? []).slice(0, 3).map((a) => (
                <div key={a.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-medium">{a.title}</div>
                    <div className="shrink-0 text-xs text-ink-3">{relative(a.createdAt)}</div>
                  </div>
                  <Markdown md={a.body} className="mt-1 text-sm text-ink-2" sanitize />
                </div>
              ))}
            </CardBody>
          </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function UpNext({ w }: { w: StudentWork }) {
  const due = dueLabel(w.assignment.dueAt);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-spotlight p-6 text-white shadow-pop">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-spotlight-glow/40 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-white/75">
          <Badge tone={due.tone === 'overdue' ? 'bad' : due.tone === 'urgent' ? 'warn' : 'brand'}>{w.status === 'missing' ? 'Missing' : due.text}</Badge>
          <span>{TYPE_LABEL[w.assignment.type]}</span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">{w.assignment.title}</h2>
        {w.assignment.instructions && <p className="mt-2 line-clamp-2 max-w-xl text-white/80">{w.assignment.instructions}</p>}
        <Link to={`/s/work/${w.assignment.id}`} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-spotlight hover:bg-white/90">
          {w.status === 'in_progress' ? 'Continue' : 'Start'} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/** Self-paced students with nothing due: their next lesson is the thing to do. */
function NextLesson({ lesson }: { lesson: NonNullable<ReturnType<typeof lessonById>> }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-spotlight p-6 text-white shadow-pop">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-spotlight-glow/40 blur-2xl" />
      <div className="relative">
        <div className="text-sm text-white/75">Your next lesson · Lesson {lesson.number}</div>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">{lesson.title}</h2>
        <p className="mt-2 max-w-xl text-white/80">Your AI tutor takes you through the lesson step by step, out loud. Try its questions, then practise its skills. You move on once you are proficient.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to={`/s/learn/${lesson.id}/tutor`} className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-spotlight hover:bg-white/90">
            <Sparkles className="h-4 w-4" /> Start with your AI tutor
          </Link>
          <Link to={`/s/learn/${lesson.id}`} className="inline-flex h-11 items-center gap-2 rounded-xl px-5 font-semibold text-white ring-1 ring-white/40 hover:bg-white/10">
            Read it myself <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function AllDone() {
  return (
    <div className="rounded-2xl border border-good/30 bg-good-soft/50 p-6">
      <div className="font-display text-2xl font-semibold">You’re all caught up 🎉</div>
      <p className="mt-2 text-ink-2">No assignments due. Practise a recommended skill below to keep your mastery growing.</p>
    </div>
  );
}

export function WorkRow({ w }: { w: StudentWork }) {
  const due = dueLabel(w.assignment.dueAt);
  return (
    <Link to={`/s/work/${w.assignment.id}`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-surface-2">
      <TypeIcon type={w.assignment.type} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{w.assignment.title}</div>
        <div className={cn('text-xs', due.tone === 'overdue' ? 'text-bad-ink' : due.tone === 'urgent' ? 'text-warn-ink' : 'text-ink-3')}>
          {TYPE_LABEL[w.assignment.type]} · {due.text}
        </div>
      </div>
      {w.status === 'missing' ? <Badge tone="bad">Missing</Badge> : w.status === 'in_progress' ? <Badge tone="info">In progress</Badge> : w.status === 'done' || w.status === 'late_done' ? <Badge tone="good">Done</Badge> : null}
    </Link>
  );
}

/** A student with no class yet: find a course to study on their own, or join a teacher's class. */
function GetStarted({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold sm:text-[28px]">Welcome, {name}</h1>
        <p className="mt-1 text-ink-3">Choose how you want to learn. You can do both.</p>
      </div>
      <MyRequests pendingOnly className="" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/s/welcome" className="card group flex flex-col gap-3 p-6 transition hover:border-brand-300">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Compass className="h-6 w-6" />
          </span>
          <span className="text-lg font-semibold">Find my course</span>
          <span className="text-[15px] text-ink-2">Tell us your grade and plans, take an optional placement check, and study at your own pace with an AI tutor.</span>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Get started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
        <Link to="/s/join" className="card group flex flex-col gap-3 p-6 transition hover:border-brand-300">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-ink-2">
            <KeyRound className="h-6 w-6" />
          </span>
          <span className="text-lg font-semibold">Join my teacher’s class</span>
          <span className="text-[15px] text-ink-2">Enter the 6-character class code your teacher gave you to see their lessons, classwork and announcements.</span>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Enter a class code <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

/** Skills missed on the placement check before this course, until the student is proficient in them. */
function PlacementReview({ classId, map }: { classId: string; map: Map<string, SkillState> }) {
  const [hidden, setHidden] = useState<string | null>(null);
  const skills = useMemo(() => reviewSkills(classId).filter((id) => {
    const level = map.get(id)?.level;
    return level !== 'proficient' && level !== 'mastered';
  }), [classId, map]);
  if (!skills.length || hidden === classId) return null;
  const from = courseOfSkill(skills[0])?.shortTitle;
  return (
    <Card className="border-warn/30">
      <CardBody>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-warn-ink">
            <RotateCcw className="h-4 w-4" /> Review from {from ?? 'the course before'}
          </div>
          <button
            type="button"
            onClick={() => {
              clearReviewSkills(classId);
              setHidden(classId);
            }}
            className="-m-1 rounded-lg p-1 text-ink-3 hover:bg-surface-2"
            aria-label="Dismiss the review list"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-sm text-ink-2">Your placement check found these skills worth a refresh. A few short practice sets will help the new course make sense.</p>
        <ul className="mt-3 space-y-1.5 text-[15px]">
          {skills.map((id) => (
            <li key={id} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />
              {skillLabel(id)}
            </li>
          ))}
        </ul>
        <Button className="mt-4" variant="soft" to={`/s/practice?skills=${skills.join(',')}`} icon={<PlayCircle className="h-4 w-4" />}>
          Practise these
        </Button>
      </CardBody>
    </Card>
  );
}
