/** Pure helpers that derive view models from API data. */
import { summarize, emptySkillState, reviewDue, type SkillState, type MasteryLevel } from '@engine/mastery.ts';
import { getCourse, skillInfo, lessonById } from '@engine/curriculum/index.ts';
import { isQuestionType } from '@engine/assemble.ts';
import type { Assignment, Submission, SkillMastery } from '@/data/types.ts';

export type WorkStatus = 'todo' | 'in_progress' | 'missing' | 'done' | 'late_done' | 'upcoming_closed';

export interface StudentWork {
  assignment: Assignment;
  status: WorkStatus;
  best: Submission | null;
  open: Submission | null;
  attemptsUsed: number;
  resultsVisible: boolean;
}

export function bestSubmission(subs: Submission[]): Submission | null {
  const done = subs.filter((s) => s.status !== 'in_progress');
  if (!done.length) return null;
  return done.reduce((a, b) => ((b.percent ?? -1) > (a.percent ?? -1) ? b : a));
}

/**
 * Results are held back until the due date. Work with no due date has nothing to wait for, so its
 * results show once it is submitted (they used to stay hidden for good).
 */
export function heldUntilDue(a: Pick<Assignment, 'settings' | 'dueAt'>): boolean {
  return a.settings.feedback === 'after_due' && !!a.dueAt;
}

export function resultsVisible(a: Assignment, now = new Date()): boolean {
  if (!heldUntilDue(a)) return true;
  return new Date(a.dueAt!) < now;
}

export function studentWork(assignments: Assignment[], submissions: Submission[], now = new Date()): StudentWork[] {
  return assignments
    .filter((a) => a.status === 'published')
    .map((a) => {
      const mine = submissions.filter((s) => s.assignmentId === a.id);
      const best = bestSubmission(mine);
      const open = mine.find((s) => s.status === 'in_progress') ?? null;
      let status: WorkStatus;
      if (best) status = best.late ? 'late_done' : 'done';
      else if (a.dueAt && new Date(a.dueAt) < now) status = a.allowLate ? 'missing' : 'upcoming_closed';
      else if (open) status = 'in_progress';
      else status = 'todo';
      return { assignment: a, status, best, open, attemptsUsed: mine.filter((s) => s.status !== 'in_progress').length, resultsVisible: resultsVisible(a, now) };
    });
}

export function sortByDue(xs: StudentWork[]): StudentWork[] {
  return [...xs].sort((a, b) => (a.assignment.dueAt ?? '9999').localeCompare(b.assignment.dueAt ?? '9999'));
}

export function masteryMap(rows: SkillMastery[], studentId?: string): Map<string, SkillState> {
  const m = new Map<string, SkillState>();
  for (const r of rows) if (!studentId || r.studentId === studentId) m.set(r.skillId, r);
  return m;
}

export function stateOf(map: Map<string, SkillState>, skillId: string): SkillState {
  return map.get(skillId) ?? emptySkillState(skillId);
}

export function lessonMastery(lessonId: string, map: Map<string, SkillState>) {
  const l = lessonById(lessonId);
  return summarize(l?.skills ?? [], map);
}

export function unitMastery(courseId: string, unitId: string, map: Map<string, SkillState>) {
  const c = getCourse(courseId);
  const u = c?.units.find((x) => x.id === unitId);
  const skills = (u?.lessons ?? []).flatMap((lid) => c?.lessons.find((l) => l.id === lid)?.skills ?? []);
  return summarize(skills, map);
}

export function courseMastery(courseId: string, map: Map<string, SkillState>) {
  const c = getCourse(courseId);
  return summarize(c?.lessons.flatMap((l) => l.skills) ?? [], map);
}

/** Skills a student should practise next: weakest attempted skills in taught lessons, then reviews due. */
export function recommendedSkills(publishedLessonIds: string[], map: Map<string, SkillState>, limit = 4): Array<{ skillId: string; reason: 'weak' | 'review' | 'new'; level: MasteryLevel }> {
  const taught = publishedLessonIds.flatMap((id) => lessonById(id)?.skills ?? []);
  const weak = taught
    .map((id) => stateOf(map, id))
    .filter((s) => s.attempts > 0 && (s.level === 'attempted' || s.level === 'familiar'))
    .sort((a, b) => a.pKnown - b.pKnown)
    .map((s) => ({ skillId: s.skillId, reason: 'weak' as const, level: s.level }));
  const review = taught
    .map((id) => stateOf(map, id))
    .filter((s) => reviewDue(s))
    .map((s) => ({ skillId: s.skillId, reason: 'review' as const, level: s.level }));
  const fresh = taught
    .map((id) => stateOf(map, id))
    .filter((s) => s.attempts === 0)
    .map((s) => ({ skillId: s.skillId, reason: 'new' as const, level: s.level }));
  return [...weak, ...review, ...fresh].slice(0, limit);
}

/**
 * Self-paced study follows the course in order: the next lesson is the first with a skill the
 * student is not yet proficient in, and the lessons up to it count as taught.
 */
export function selfPacedLessons(courseId: string, map: Map<string, SkillState>): { next: string | undefined; taught: string[] } {
  const lessons = getCourse(courseId)?.lessons ?? [];
  const done = (id: string) => {
    const level = stateOf(map, id).level;
    return level === 'proficient' || level === 'mastered';
  };
  const i = lessons.findIndex((l) => !l.skills.every(done));
  const end = i === -1 ? lessons.length - 1 : i;
  return { next: lessons[end]?.id, taught: lessons.slice(0, end + 1).map((l) => l.id) };
}

export function skillLabel(id: string): string {
  return skillInfo(id)?.name ?? id;
}

export function itemCount(a: Assignment): number {
  if (!isQuestionType(a.type)) return 0;
  return a.content.sections.reduce((s, x) => s + x.count, 0) + a.content.custom.length;
}

export function percentTone(p: number | null): 'good' | 'warn' | 'bad' | 'neutral' {
  if (p === null) return 'neutral';
  return p >= 80 ? 'good' : p >= 60 ? 'warn' : 'bad';
}

export function toCsv(rows: Array<Array<string | number | null>>): string {
  return rows.map((r) => r.map((c) => (c === null ? '' : /[",\n]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : String(c))).join(',')).join('\n');
}

export function downloadText(filename: string, text: string, type = 'text/csv') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
