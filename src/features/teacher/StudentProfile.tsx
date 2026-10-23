import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarClock, ChevronDown, ChevronRight, ClipboardPlus, FileText, Flame, Sparkles, Target, TrendingUp, XCircle } from 'lucide-react';
import { getCourse, lessonById } from '@engine/curriculum/index.ts';
import { reviewDue, summarize } from '@engine/mastery.ts';
import { TYPE_LABEL, isQuestionType } from '@engine/assemble.ts';
import { useAssignments, useClass, useEvents, useInsights, useMastery, useProfile, usePublications, useReportCards, useSubmissions } from '@/data/hooks.ts';
import { Avatar, Badge, Button, Card, CardBody, CardHeader, EmptyState, PageHeader, PageSpinner, StatTile } from '@/components/ui/index.ts';
import { MasteryBar, MasteryChip, MasteryLegend } from '@/components/mastery/Mastery.tsx';
import { WeeklyAccuracyChart } from '@/components/mastery/WeeklyAccuracyChart.tsx';
import { GenerateButton, InsightBody } from '@/features/ai/InsightReport.tsx';
import { fmtDate, relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';
import { masteryMap, skillLabel, stateOf, studentWork, type WorkStatus } from '../shared/derive.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { pct, scoreCell, useClassId } from './shared.tsx';

const WORK_BADGE: Record<WorkStatus, { label: string; tone: 'neutral' | 'good' | 'warn' | 'bad' | 'info' }> = {
  todo: { label: 'Not started', tone: 'neutral' },
  in_progress: { label: 'In progress', tone: 'info' },
  missing: { label: 'Missing', tone: 'bad' },
  done: { label: 'Done', tone: 'good' },
  late_done: { label: 'Done late', tone: 'warn' },
  upcoming_closed: { label: 'Missed (closed)', tone: 'bad' },
};

export default function StudentProfile() {
  const classId = useClassId();
  const { studentId = '' } = useParams();
  const profile = useProfile(studentId);
  const cls = useClass(classId);
  const mastery = useMastery({ classId, studentId });
  const events = useEvents(classId, studentId, 56);
  const assignments = useAssignments(classId);
  const subs = useSubmissions({ studentId });
  const insights = useInsights(classId, studentId);
  const pubs = usePublications(classId);
  const reports = useReportCards({ classId, studentId });
  const [openUnit, setOpenUnit] = useState<string | null>(null);

  const map = useMemo(() => masteryMap(mastery.data ?? [], studentId), [mastery.data, studentId]);
  const published = useMemo(() => new Set((pubs.data ?? []).map((p) => p.lessonId)), [pubs.data]);
  const classSubs = useMemo(() => (subs.data ?? []).filter((s) => s.classId === classId), [subs.data, classId]);
  const work = useMemo(() => {
    const mine = (assignments.data ?? []).filter((a) => a.assignedTo === 'all' || a.assignedTo.includes(studentId));
    return studentWork(mine, classSubs).sort((a, b) => (b.assignment.dueAt ?? '').localeCompare(a.assignment.dueAt ?? ''));
  }, [assignments.data, classSubs, studentId]);

  if (profile.isLoading || cls.isLoading) return <PageSpinner />;
  if (!profile.data || !cls.data) return <EmptyState title="Student not found" />;
  const p = profile.data;
  const course = getCourse(cls.data.courseId)!;
  const taught = course.lessons.filter((l) => published.has(l.id)).flatMap((l) => l.skills);
  const tm = summarize(taught, map);
  const scored = work.filter((w) => w.best && w.best.percent !== null && isQuestionType(w.assignment.type));
  const avg = scored.length ? Math.round(scored.reduce((s, w) => s + (w.best!.percent ?? 0), 0) / scored.length) : null;
  const pastDue = work.filter((w) => w.assignment.dueAt && new Date(w.assignment.dueAt) < new Date());
  const onTime = pastDue.length ? Math.round((pastDue.filter((w) => w.status === 'done').length / pastDue.length) * 100) : null;
  const activeDays = new Set((events.data ?? []).filter((e) => Date.now() - new Date(e.at).getTime() < 14 * 86_400_000).map((e) => e.at.slice(0, 10))).size;
  const weakest = taught
    .map((id) => stateOf(map, id))
    .filter((s) => s.attempts > 0 && s.level !== 'mastered' && s.level !== 'proficient')
    .sort((a, b) => a.pKnown - b.pKnown)
    .slice(0, 3)
    .map((s) => s.skillId);
  const reviews = taught.map((id) => stateOf(map, id)).filter((s) => reviewDue(s));
  const mistakes = (events.data ?? []).filter((e) => !e.correct && e.answer).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
  const latest = insights.data?.[0];

  return (
    <div className="space-y-6">
      <PageHeader
        back={{ to: `/t/c/${classId}/students`, label: 'Students' }}
        title={
          <span className="flex items-center gap-3">
            <Avatar name={p.fullName} color={p.avatarColor} size={44} />
            {p.fullName}
          </span>
        }
        subtitle={`${p.nameOnly ? 'Joined with the class link' : (p.username ?? p.email)} · joined ${fmtDate(p.createdAt, 'MMM d, yyyy')}`}
        actions={
          <>
            <GenerateButton classId={classId} studentId={studentId} label="Analyse with AI" size="md" />
            <Button variant="secondary" icon={<FileText className="h-4 w-4" />} to={reports.data?.[0] ? `/t/c/${classId}/reports/${reports.data[0].id}` : `/t/c/${classId}/reports`}>
              Report card
            </Button>
            <Button icon={<ClipboardPlus className="h-4 w-4" />} to={`/t/c/${classId}/assignments/new?type=practice&students=${studentId}${weakest.length ? `&skills=${weakest.join(',')}` : ''}`}>
              Assign practice
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Mastery of taught skills" value={`${tm.percent}%`} icon={<Target className="h-4 w-4" />} hint={`${tm.counts.mastered + tm.counts.proficient} of ${taught.length} skills proficient or better`} />
        <StatTile label="Average score" value={pct(avg)} icon={<TrendingUp className="h-4 w-4" />} hint={`${scored.length} graded assignment${scored.length === 1 ? '' : 's'}`} tone={avg !== null && avg < 60 ? 'bad' : 'neutral'} />
        <StatTile label="On time" value={onTime === null ? '—' : `${onTime}%`} icon={<CalendarClock className="h-4 w-4" />} hint={`${pastDue.filter((w) => w.status === 'missing' || w.status === 'upcoming_closed').length} missing`} tone={onTime !== null && onTime < 70 ? 'warn' : 'neutral'} />
        <StatTile label="Active days" value={activeDays} icon={<Flame className="h-4 w-4" />} hint="In the last 14 days" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader title="AI report" subtitle="Strengths, gaps, likely misconceptions and next steps" icon={<Sparkles className="h-5 w-5" />} action={latest && <GenerateButton classId={classId} studentId={studentId} label="Refresh" />} />
            <CardBody className="pt-4">
              {latest ? (
                <InsightBody data={latest.data} insight={latest} classId={classId} />
              ) : (
                <div className="rounded-xl border border-dashed border-line-strong p-6 text-center">
                  <p className="text-sm text-ink-3">No report yet. The assistant reads this student's answers, hints and mastery to suggest what to do next.</p>
                  <div className="mt-3">
                    <GenerateButton classId={classId} studentId={studentId} label="Generate report" />
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Work" subtitle={`${work.length} assignments`} />
            <div className="mt-3 divide-y divide-line border-t border-line">
              {work.length === 0 && <p className="px-5 py-6 text-center text-sm text-ink-3">Nothing assigned yet.</p>}
              {work.map((w) => {
                const b = WORK_BADGE[w.status];
                const target = w.best ? `/t/c/${classId}/submissions/${w.best.id}` : `/t/c/${classId}/assignments/${w.assignment.id}`;
                return (
                  <Link key={w.assignment.id} to={target} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-2/50">
                    <TypeIcon type={w.assignment.type} className="h-9 w-9" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{w.assignment.title}</div>
                      <div className="text-xs text-ink-3">
                        {TYPE_LABEL[w.assignment.type]} · {w.assignment.dueAt ? `due ${fmtDate(w.assignment.dueAt)}` : 'no due date'}
                        {w.attemptsUsed > 1 && ` · ${w.attemptsUsed} attempts`}
                      </div>
                    </div>
                    <Badge tone={b.tone}>{b.label}</Badge>
                    <span className={cn('w-14 rounded-md py-0.5 text-center text-sm font-semibold', w.best && isQuestionType(w.assignment.type) ? scoreCell(w.best.percent) : 'text-ink-3')}>{w.best && isQuestionType(w.assignment.type) ? pct(w.best.percent) : '—'}</span>
                    <ChevronRight className="h-4 w-4 text-ink-3" />
                  </Link>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardHeader title="Recent mistakes" subtitle="What they answered and what was expected" icon={<XCircle className="h-5 w-5" />} />
            <CardBody className="space-y-2 pt-4">
              {mistakes.length === 0 && <p className="text-sm text-ink-3">No recent mistakes recorded.</p>}
              {mistakes.map((e) => (
                <div key={e.id} className="rounded-xl bg-surface-2/60 p-3 text-sm">
                  <div className="flex items-center justify-between gap-2 text-xs text-ink-3">
                    <span className="font-semibold">{skillLabel(e.skillId)}</span>
                    <span>{relative(e.at)}</span>
                  </div>
                  {e.prompt && <p className="mt-1 line-clamp-2 text-ink-2">{e.prompt}</p>}
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                      Answered <code className="rounded bg-bad-soft px-1 text-bad-ink">{e.answer}</code>
                    </span>
                    {e.expected && (
                      <span>
                        Expected <code className="rounded bg-good-soft px-1 text-good-ink">{e.expected}</code>
                      </span>
                    )}
                    {e.assisted && <Badge tone="warn">used hints</Badge>}
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Weekly accuracy" subtitle="Correct without hints" />
            <CardBody className="pt-2">
              <WeeklyAccuracyChart events={events.data ?? []} />
            </CardBody>
          </Card>

          {reviews.length > 0 && (
            <Card>
              <CardHeader title="Review due" subtitle="Skills that may be fading" icon={<CalendarClock className="h-5 w-5" />} />
              <CardBody className="flex flex-wrap gap-1.5 pt-3">
                {reviews.slice(0, 8).map((s) => (
                  <Badge key={s.skillId} tone="warn">
                    {skillLabel(s.skillId)}
                  </Badge>
                ))}
                <Button size="xs" variant="soft" className="mt-2" to={`/t/c/${classId}/assignments/new?type=practice&students=${studentId}&skills=${reviews.slice(0, 4).map((s) => s.skillId).join(',')}`}>
                  Assign a review set
                </Button>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader title="Mastery by unit" subtitle="Published lessons only" />
            <CardBody className="space-y-1 pt-3">
              {course.units.map((u) => {
                const lessons = u.lessons.filter((l) => published.has(l));
                if (!lessons.length) return null;
                const skills = lessons.flatMap((l) => lessonById(l)!.skills);
                const um = summarize(skills, map);
                const open = openUnit === u.id;
                return (
                  <div key={u.id}>
                    <button type="button" onClick={() => setOpenUnit(open ? null : u.id)} className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-surface-2" aria-expanded={open}>
                      <span className="w-14 text-xs font-semibold text-ink-3">Unit {u.number}</span>
                      <MasteryBar counts={um.counts} total={skills.length} className="flex-1" />
                      <span className="w-10 text-right text-sm font-semibold">{um.percent}%</span>
                      <ChevronDown className={cn('h-4 w-4 text-ink-3 transition', open && 'rotate-180')} />
                    </button>
                    {open && (
                      <div className="mb-2 space-y-1 pl-2">
                        {skills.map((sid) => {
                          const st = stateOf(map, sid);
                          return (
                            <div key={sid} className="flex items-center gap-2 py-1 text-sm">
                              <span className="min-w-0 flex-1 truncate" title={skillLabel(sid)}>
                                {skillLabel(sid)}
                              </span>
                              <span className="text-xs text-ink-3">
                                {st.correct}/{st.attempts}
                              </span>
                              <MasteryChip level={st.level} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {published.size === 0 && <p className="text-sm text-ink-3">Publish lessons to start tracking mastery.</p>}
              <MasteryLegend className="pt-2" />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
