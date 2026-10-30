import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, ChevronRight, FileText, PlayCircle } from 'lucide-react';
import { courseLesson, getCourse } from '@engine/curriculum/index.ts';
import { reviewDue } from '@engine/mastery.ts';
import { useEvents, useMastery, usePublications, useReportCards } from '@/data/hooks.ts';
import { fmtDate } from '@/lib/dates.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Button, Card, CardBody, CardHeader, EmptyState, PageHeader, PageSpinner, ProgressRing, Tabs } from '@/components/ui/index.ts';
import { MasteryBar, MasteryChip, MasteryLegend } from '@/components/mastery/Mastery.tsx';
import { WeeklyAccuracyChart } from '@/components/mastery/WeeklyAccuracyChart.tsx';
import { courseMastery, masteryMap, skillLabel, stateOf, unitMastery } from '../shared/derive.ts';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { summarize } from '@engine/mastery.ts';

export default function ProgressPage() {
  const me = useMe();
  const { cls } = useStudentClass();
  const mastery = useMastery({ studentId: me.id });
  const pubs = usePublications(cls?.id);
  const events = useEvents(cls?.id, me.id, 56);
  const reports = useReportCards({ studentId: me.id });
  const [view, setView] = useState<'units' | 'outcomes'>('units');
  const map = useMemo(() => masteryMap(mastery.data ?? []), [mastery.data]);
  if (mastery.isLoading) return <PageSpinner />;
  if (!cls) return <EmptyState title="Choose a course to track your progress" action={<Button to="/s/welcome">Find my course</Button>} />;
  const course = getCourse(cls.courseId)!;
  const cm = courseMastery(course.id, map);
  const published = new Set((pubs.data ?? []).map((p) => p.lessonId));
  const due = [...map.values()].filter((s) => reviewDue(s));

  return (
    <div className="space-y-6">
      <PageHeader title="My progress" subtitle="Mastery grows when you answer correctly without help, across more than one session." />
      {(reports.data?.length ?? 0) > 0 && (
        <Card>
          <CardHeader title="Report cards" subtitle="From your teacher" icon={<FileText className="h-5 w-5" />} />
          <div className="mt-3 divide-y divide-line border-t border-line">
            {reports.data!.map((r) => (
              <Link key={r.id} to={`/s/reports/${r.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-2/50">
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{r.period || 'Report card'}</span>
                  {r.sharedAt && <span className="block text-xs text-ink-3">Shared {fmtDate(r.sharedAt)}</span>}
                </span>
                <ChevronRight className="h-4 w-4 text-ink-3" />
              </Link>
            ))}
          </div>
        </Card>
      )}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card className="flex items-center gap-5 p-5">
          <ProgressRing value={cm.percent} size={110} stroke={10} sublabel="course" />
          <div className="flex-1 space-y-2">
            <MasteryBar counts={cm.counts} total={cm.maxPoints / 100} showLabels />
            <MasteryLegend />
          </div>
        </Card>
        <Card>
          <CardHeader title="Weekly accuracy" subtitle="Share of questions answered correctly without hints." />
          <CardBody className="pt-2">
            <WeeklyAccuracyChart events={events.data ?? []} />
          </CardBody>
        </Card>
      </div>

      {due.length > 0 && (
        <Card className="border-warn/30">
          <CardHeader title="Time to review" subtitle="Quick retrieval practice keeps mastered skills from fading." icon={<CalendarClock className="h-5 w-5" />} />
          <CardBody className="flex flex-wrap gap-2 pt-4">
            {due.slice(0, 8).map((s) => (
              <Button key={s.skillId} size="sm" variant="soft" to={`/s/practice?skills=${s.skillId}`}>
                {skillLabel(s.skillId)}
              </Button>
            ))}
          </CardBody>
        </Card>
      )}

      <Tabs
        value={view}
        onChange={setView}
        items={[
          { value: 'units', label: 'By unit' },
          { value: 'outcomes', label: 'By outcome' },
        ]}
      />

      {view === 'units' ? (
        <div className="space-y-4">
          {course.units.map((u) => {
            const um = unitMastery(course.id, u.id, map);
            const lessons = u.lessons.filter((l) => published.has(l));
            return (
              <Card key={u.id}>
                <div className="flex flex-wrap items-center gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Unit {u.number}</div>
                    <div className="text-lg font-semibold">{u.title}</div>
                  </div>
                  <div className="w-full max-w-xs">
                    <MasteryBar counts={um.counts} total={um.maxPoints / 100} />
                  </div>
                  <div className="w-12 text-right font-display text-lg font-semibold">{um.percent}%</div>
                </div>
                {lessons.length > 0 && (
                  <div className="border-t border-line">
                    {lessons.flatMap((lid) =>
                      courseLesson(course.id, lid)!.skills.map((s) => {
                        const st = stateOf(map, s);
                        return (
                          <div key={s} className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-2.5 last:border-0">
                            <span className="w-10 text-xs font-semibold text-ink-3">{courseLesson(course.id, lid)!.number}</span>
                            <span className="min-w-0 flex-1 text-[15px]">{skillLabel(s)}</span>
                            <span className="hidden text-xs text-ink-3 sm:inline">
                              {st.correct}/{st.attempts} correct
                            </span>
                            <MasteryChip level={st.level} />
                            <Link to={`/s/practice?skills=${s}`} className="rounded-lg p-1.5 text-brand hover:bg-brand-50" aria-label={`Practise ${skillLabel(s)}`}>
                              <PlayCircle className="h-5 w-5" />
                            </Link>
                          </div>
                        );
                      }),
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {course.outcomes.map((o) => {
            const skills = course.lessons.filter((l) => l.outcomes.includes(o.code)).flatMap((l) => l.skills);
            const sm = summarize([...new Set(skills)], map);
            return (
              <Card key={o.code} className="p-4">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-brand-50 px-2 py-1 text-sm font-bold text-brand-700">{o.code}</span>
                  <p className="flex-1 text-sm text-ink-2">{o.text}</p>
                  <span className="font-display text-lg font-semibold">{sm.percent}%</span>
                </div>
                <MasteryBar className="mt-3" counts={sm.counts} total={sm.maxPoints / 100} />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
