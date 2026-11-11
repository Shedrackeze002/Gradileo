import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardPlus, X } from 'lucide-react';
import { getCourse, skillInfo, lessonById } from '@engine/curriculum/index.ts';
import { LEVEL_LABEL, LEVELS, summarize, type MasteryLevel, type SkillState } from '@engine/mastery.ts';
import { useClass, useMastery, usePublications, useRoster } from '@/data/hooks.ts';
import type { Profile } from '@/data/types.ts';
import { Avatar, Button, Card, CardBody, EmptyState, PageHeader, PageSpinner, Select } from '@/components/ui/index.ts';
import { LEVEL_BG, MasteryBar, MasteryChip, MasteryLegend } from '@/components/mastery/Mastery.tsx';
import { cn } from '@/lib/cn.ts';
import { masteryMap, skillLabel, stateOf } from '../shared/derive.ts';
import { useClassId } from './shared.tsx';

type SortKey = 'name' | 'low' | 'high';

export default function MasteryMapPage() {
  const classId = useClassId();
  const cls = useClass(classId);
  const roster = useRoster(classId);
  const mastery = useMastery({ classId });
  const pubs = usePublications(classId);
  const [scope, setScope] = useState<string>('published');
  const [sort, setSort] = useState<SortKey>('name');
  const [hover, setHover] = useState<{ s: Profile; skillId: string; st: SkillState } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const course = cls.data ? getCourse(cls.data.courseId) : undefined;
  const published = useMemo(() => new Set((pubs.data ?? []).map((p) => p.lessonId)), [pubs.data]);
  const lessons = useMemo(() => {
    if (!course) return [];
    if (scope === 'published') return course.lessons.filter((l) => published.has(l.id));
    return course.lessons.filter((l) => l.unitId === scope);
  }, [course, scope, published]);
  const skills = lessons.flatMap((l) => l.skills);
  const maps = useMemo(() => new Map((roster.data ?? []).map((s) => [s.id, masteryMap(mastery.data ?? [], s.id)])), [roster.data, mastery.data]);
  const students = useMemo(() => {
    const withPct = (roster.data ?? []).map((s) => ({ s, pct: summarize(skills, maps.get(s.id)!).percent }));
    return withPct.sort((a, b) => (sort === 'name' ? a.s.fullName.localeCompare(b.s.fullName) : sort === 'low' ? a.pct - b.pct : b.pct - a.pct));
  }, [roster.data, skills, maps, sort]);

  if (cls.isLoading || roster.isLoading || mastery.isLoading) return <PageSpinner />;
  if (!course) return null;

  return (
    <div>
      <PageHeader title="Mastery map" subtitle="Every student against every skill. Hover a square for details; click a skill to act on it." />
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Select value={scope} onChange={(e) => setScope(e.target.value)} aria-label="Lessons shown" className="w-64">
            <option value="published">All published lessons</option>
            {course.units.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.number}: {u.title}
              </option>
            ))}
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort students" className="w-48">
            <option value="name">Sort by name</option>
            <option value="low">Lowest mastery first</option>
            <option value="high">Highest mastery first</option>
          </Select>
        </div>
        <MasteryLegend />
      </div>

      {skills.length === 0 || students.length === 0 ? (
        <EmptyState title={students.length === 0 ? 'No students yet' : 'No published lessons yet'}>Publish lessons in Curriculum, or choose a unit above to preview the map.</EmptyState>
      ) : (
        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <Card className="min-w-0 overflow-hidden">
            <div className="flex h-11 items-center gap-3 border-b border-line px-4 text-sm" aria-live="polite">
              {hover ? (
                <>
                  <span className="font-semibold">{hover.s.fullName}</span>
                  <span className="truncate text-ink-3">{skillLabel(hover.skillId)}</span>
                  <MasteryChip level={hover.st.level} className="ml-auto" />
                  <span className="hidden text-xs text-ink-3 sm:inline">
                    {hover.st.correct}/{hover.st.attempts} correct · p(known) {Math.round(hover.st.pKnown * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-ink-3">Hover a square to see a student's result on that skill.</span>
              )}
            </div>
            <div className="overflow-x-auto p-4 scrollbar-thin">
              <table className="border-separate" style={{ borderSpacing: 2 }} onMouseLeave={() => setHover(null)}>
                <thead>
                  <tr>
                    <th />
                    {lessons.map((l) => (
                      <th key={l.id} colSpan={l.skills.length} className="px-0.5 pb-1 text-left align-bottom">
                        <Link to={`/t/c/${classId}/lessons/${l.id}`} className="block border-b-2 border-line-strong pb-0.5 text-[11px] font-semibold text-ink-2 hover:text-brand" title={l.title}>
                          {l.number}
                        </Link>
                      </th>
                    ))}
                    <th />
                  </tr>
                  <tr>
                    <th />
                    {skills.map((sid) => (
                      <th key={sid} className="p-0">
                        <button
                          type="button"
                          onClick={() => setSelected(selected === sid ? null : sid)}
                          title={skillLabel(sid)}
                          aria-label={`Skill: ${skillLabel(sid)}`}
                          className={cn('h-6 w-6 rounded text-[10px] font-semibold text-ink-3 hover:bg-surface-2', selected === sid && 'bg-brand text-brand-ink hover:bg-brand')}
                        >
                          {skillIndexInLesson(sid)}
                        </button>
                      </th>
                    ))}
                    <th className="pl-3 text-left text-[11px] font-semibold text-ink-3">Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(({ s, pct }) => {
                    const m = maps.get(s.id)!;
                    return (
                      <tr key={s.id}>
                        <th scope="row" className="sticky left-0 z-10 bg-surface pr-3 text-left font-normal">
                          <Link to={`/t/c/${classId}/students/${s.id}`} className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-brand">
                            <Avatar name={s.fullName} color={s.avatarColor} size={22} />
                            <span className="max-w-[150px] truncate">{s.fullName}</span>
                          </Link>
                        </th>
                        {skills.map((sid) => {
                          const st = stateOf(m, sid);
                          return (
                            <td key={sid} className="p-0">
                              <div
                                onMouseEnter={() => setHover({ s, skillId: sid, st })}
                                onClick={() => setSelected(sid)}
                                role="img"
                                aria-label={`${s.fullName}, ${skillLabel(sid)}: ${LEVEL_LABEL[st.level]}`}
                                className={cn('h-6 w-6 cursor-pointer rounded-[5px] transition hover:scale-110 hover:ring-2 hover:ring-ink/40', LEVEL_BG[st.level], st.level === 'not_started' && 'ring-1 ring-inset ring-line-strong', selected === sid && 'outline outline-2 outline-offset-1 outline-brand/40')}
                              />
                            </td>
                          );
                        })}
                        <td className="whitespace-nowrap pl-3 text-sm font-semibold">{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
          <div className="space-y-4">{selected ? <SkillPanel skillId={selected} students={students.map((x) => x.s)} maps={maps} classId={classId} onClose={() => setSelected(null)} /> : <ClassSummary skills={skills} students={students.map((x) => x.s)} maps={maps} />}</div>
        </div>
      )}
    </div>
  );
}

function skillIndexInLesson(sid: string): number {
  const l = lessonById(skillInfo(sid)?.lessonId ?? '');
  return (l?.skills.indexOf(sid) ?? 0) + 1;
}

function countLevels(skillId: string, students: Profile[], maps: Map<string, Map<string, SkillState>>) {
  const counts = Object.fromEntries(LEVELS.map((l) => [l, 0])) as Record<MasteryLevel, number>;
  for (const s of students) counts[stateOf(maps.get(s.id)!, skillId).level]++;
  return counts;
}

function SkillPanel({ skillId, students, maps, classId, onClose }: { skillId: string; students: Profile[]; maps: Map<string, Map<string, SkillState>>; classId: string; onClose: () => void }) {
  const skill = skillInfo(skillId);
  const counts = countLevels(skillId, students, maps);
  const below = students.filter((s) => {
    const l = stateOf(maps.get(s.id)!, skillId).level;
    return l !== 'proficient' && l !== 'mastered';
  });
  const lesson = lessonById(skill?.lessonId ?? '');
  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Lesson {lesson?.number}</div>
            <div className="mt-0.5 font-semibold leading-snug">{skill?.name}</div>
            <p className="mt-1 text-sm text-ink-3">{skill?.description}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-ink-3 hover:bg-surface-2" aria-label="Close skill details">
            <X className="h-4 w-4" />
          </button>
        </div>
        <MasteryBar counts={counts} total={students.length} showLabels />
        {below.length > 0 ? (
          <>
            <div>
              <div className="mb-1.5 text-sm font-medium">
                Below proficient ({below.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {below.map((s) => (
                  <Link key={s.id} to={`/t/c/${classId}/students/${s.id}`} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium hover:bg-surface-3">
                    {s.fullName}
                  </Link>
                ))}
              </div>
            </div>
            <Button className="w-full" icon={<ClipboardPlus className="h-4 w-4" />} to={`/t/c/${classId}/assignments/new?type=practice&skills=${skillId}&students=${below.map((s) => s.id).join(',')}`}>
              Assign practice to these students
            </Button>
          </>
        ) : (
          <p className="rounded-xl bg-good-soft p-3 text-sm text-good-ink">Everyone is proficient or better on this skill.</p>
        )}
        {lesson && (
          <Button variant="secondary" className="w-full" to={`/present/${classId}/${lesson.id}`}>
            Reteach: present lesson {lesson.number}
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

function ClassSummary({ skills, students, maps }: { skills: string[]; students: Profile[]; maps: Map<string, Map<string, SkillState>> }) {
  const need = Math.min(3, students.length);
  const tried = skills.map((sid) => {
    const c = countLevels(sid, students, maps);
    const attempted = students.length - c.not_started;
    return { sid, strong: c.proficient + c.mastered, attempted };
  });
  const rows = tried
    .filter((r) => r.attempted >= need)
    .sort((a, b) => a.strong / Math.max(1, a.attempted) - b.strong / Math.max(1, b.attempted))
    .slice(0, 6);
  return (
    <Card>
      <CardBody>
        <div className="font-semibold">Hardest skills right now</div>
        <p className="mt-0.5 text-sm text-ink-3">Share of students who have attempted the skill and reached proficient.</p>
        <div className="mt-4 space-y-3">
          {rows.length === 0 && <p className="text-sm text-ink-3">{tried.some((r) => r.attempted > 0) ? `A skill is listed once ${need} students have tried it.` : 'No attempts yet.'}</p>}
          {rows.map((r) => {
            const p = Math.round((r.strong / Math.max(1, r.attempted)) * 100);
            return (
              <div key={r.sid}>
                <div className="flex justify-between gap-2 text-sm">
                  <span className="truncate">{skillLabel(r.sid)}</span>
                  <span className="font-semibold">{p}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-m3" style={{ width: `${p}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
