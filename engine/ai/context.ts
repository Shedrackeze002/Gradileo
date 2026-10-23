/** Turns raw platform data into compact, factual analysis contexts for the AI (and the offline analyst). */
import { getCourse, lessonById, skillInfo } from '../curriculum/index.ts';
import { LEVEL_POINTS, type MasteryLevel, type SkillState } from '../mastery.ts';
import type { AssignmentSnapshot, ClassContext, ClassStudentSummary, ErrorSample, SkillSnapshot, StudentContext } from './types.ts';

export interface RawEvent {
  studentId: string;
  skillId: string;
  correct: boolean;
  assisted: boolean;
  at: string;
  prompt?: string;
  answer?: string;
  expected?: string;
}

export interface RawAssignment {
  id: string;
  title: string;
  type: string;
  dueAt: string | null;
  assignedTo: 'all' | string[];
  status: string;
}

export interface RawSubmission {
  assignmentId: string;
  studentId: string;
  status: string;
  submittedAt: string | null;
  percent: number | null;
}

export interface AnalystInput {
  courseId: string;
  className: string;
  students: Array<{ id: string; name: string }>;
  taughtLessonIds: string[];
  mastery: Array<SkillState & { studentId: string }>;
  events: RawEvent[];
  assignments: RawAssignment[];
  submissions: RawSubmission[];
  now?: Date;
}

const DAY = 86_400_000;

function trim(s: string | undefined, n: number): string {
  if (!s) return '';
  const clean = s.replace(/\s+/g, ' ').trim();
  return clean.length > n ? `${clean.slice(0, n - 1)}…` : clean;
}

function accuracy(events: RawEvent[]): number | null {
  if (!events.length) return null;
  return Math.round((events.filter((e) => e.correct && !e.assisted).length / events.length) * 100);
}

function taughtSkillIds(input: AnalystInput): string[] {
  return input.taughtLessonIds.flatMap((id) => lessonById(id)?.skills ?? []);
}

function coursePercent(courseId: string, states: SkillState[]): number {
  const course = getCourse(courseId);
  if (!course) return 0;
  const ids = course.lessons.flatMap((l) => l.skills);
  const byId = new Map(states.map((s) => [s.skillId, s]));
  const pts = ids.reduce((sum, id) => sum + LEVEL_POINTS[(byId.get(id)?.level ?? 'not_started') as MasteryLevel], 0);
  return ids.length ? Math.round((pts / (ids.length * 100)) * 100) : 0;
}

export function assignmentStatus(a: RawAssignment, sub: RawSubmission | undefined, now: Date): AssignmentSnapshot['status'] {
  const due = a.dueAt ? new Date(a.dueAt) : null;
  if (sub && (sub.status === 'submitted' || sub.status === 'graded' || sub.status === 'returned')) {
    if (due && sub.submittedAt && new Date(sub.submittedAt) > due) return 'late';
    return 'submitted';
  }
  if (due && due < now) return 'missing';
  if (sub && sub.status === 'in_progress') return 'in_progress';
  return due ? 'upcoming' : 'not_started';
}

function isAssigned(a: RawAssignment, studentId: string) {
  return a.assignedTo === 'all' || a.assignedTo.includes(studentId);
}

export function buildStudentContext(input: AnalystInput, studentId: string): StudentContext {
  const now = input.now ?? new Date();
  const student = input.students.find((s) => s.id === studentId) ?? { id: studentId, name: 'Student' };
  const states = input.mastery.filter((m) => m.studentId === studentId);
  const taught = new Set(taughtSkillIds(input));
  const relevant = new Set([...taught, ...states.filter((s) => s.attempts > 0).map((s) => s.skillId)]);
  const byId = new Map(states.map((s) => [s.skillId, s]));
  const skills: SkillSnapshot[] = [...relevant]
    .map((id): SkillSnapshot | null => {
      const def = skillInfo(id);
      const st = byId.get(id);
      if (!def) return null;
      return {
        skillId: id,
        name: def.name,
        outcomes: def.outcomes,
        lessonId: def.lessonId,
        level: st?.level ?? 'not_started',
        pKnown: Math.round((st?.pKnown ?? 0) * 100) / 100,
        attempts: st?.attempts ?? 0,
        correct: st?.correct ?? 0,
        lastPracticedAt: st?.lastPracticedAt ?? null,
      };
    })
    .filter((x): x is SkillSnapshot => !!x)
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 45);

  const events = input.events.filter((e) => e.studentId === studentId);
  const last7 = events.filter((e) => now.getTime() - new Date(e.at).getTime() <= 7 * DAY);
  const prev7 = events.filter((e) => {
    const age = now.getTime() - new Date(e.at).getTime();
    return age > 7 * DAY && age <= 14 * DAY;
  });
  const recentErrors: ErrorSample[] = events
    .filter((e) => !e.correct && e.prompt)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 10)
    .map((e) => ({ skillId: e.skillId, prompt: trim(e.prompt, 220), studentAnswer: trim(e.answer, 80), correctAnswer: trim(e.expected, 80), at: e.at }));

  const assignments: AssignmentSnapshot[] = input.assignments
    .filter((a) => a.status === 'published' && isAssigned(a, studentId))
    .map((a) => {
      const sub = input.submissions.filter((s) => s.assignmentId === a.id && s.studentId === studentId).sort((x, y) => (y.percent ?? -1) - (x.percent ?? -1))[0];
      return { id: a.id, title: a.title, type: a.type, dueAt: a.dueAt, status: assignmentStatus(a, sub, now), percent: sub?.percent ?? null };
    })
    .slice(-20);

  return {
    student,
    courseTitle: getCourse(input.courseId)?.title ?? input.courseId,
    subject: getCourse(input.courseId)?.subject,
    taughtLessons: input.taughtLessonIds.map((id) => ({ id, title: lessonById(id)?.title ?? id })),
    skills,
    recentErrors,
    assignments,
    trend: {
      last7Accuracy: accuracy(last7),
      prev7Accuracy: accuracy(prev7),
      hintRate: events.length ? Math.round((events.filter((e) => e.assisted).length / events.length) * 100) : null,
      questionsLast7: last7.length,
    },
    coursePercent: coursePercent(input.courseId, states),
  };
}

export function buildClassContext(input: AnalystInput): ClassContext {
  const now = input.now ?? new Date();
  const taught = taughtSkillIds(input);
  const attempted = new Set(input.mastery.filter((m) => m.attempts > 0).map((m) => m.skillId));
  const skillIds = [...new Set([...taught, ...attempted])];
  const skills = skillIds
    .map((id) => {
      const def = skillInfo(id);
      if (!def) return null;
      const rows = input.mastery.filter((m) => m.skillId === id && m.attempts > 0);
      const struggling = rows.filter((r) => r.pKnown < 0.45 && r.attempts >= 2).map((r) => r.studentId);
      return {
        skillId: id,
        name: def.name,
        lessonId: def.lessonId,
        attemptedBy: rows.length,
        mastered: rows.filter((r) => r.level === 'mastered').length,
        proficientPlus: rows.filter((r) => r.level === 'mastered' || r.level === 'proficient').length,
        struggling,
        avgPKnown: rows.length ? Math.round((rows.reduce((s, r) => s + r.pKnown, 0) / rows.length) * 100) / 100 : 0,
      };
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .slice(0, 60);

  const students: ClassStudentSummary[] = input.students.map((s) => {
    const states = input.mastery.filter((m) => m.studentId === s.id);
    const ev = input.events.filter((e) => e.studentId === s.id && now.getTime() - new Date(e.at).getTime() <= 7 * DAY);
    let missing = 0;
    let late = 0;
    for (const a of input.assignments.filter((x) => x.status === 'published' && isAssigned(x, s.id))) {
      const sub = input.submissions.find((x) => x.assignmentId === a.id && x.studentId === s.id);
      const st = assignmentStatus(a, sub, now);
      if (st === 'missing') missing++;
      if (st === 'late') late++;
    }
    return {
      id: s.id,
      name: s.name,
      coursePercent: coursePercent(input.courseId, states),
      accuracy7: accuracy(ev),
      missing,
      late,
      weakSkills: states.filter((m) => m.attempts >= 2 && m.pKnown < 0.45).map((m) => m.skillId).slice(0, 6),
      strongSkills: states.filter((m) => m.level === 'mastered' || m.level === 'proficient').map((m) => m.skillId).slice(0, 6),
    };
  });

  const recentErrors = input.events
    .filter((e) => !e.correct && e.prompt)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 15)
    .map((e) => ({ studentId: e.studentId, skillId: e.skillId, prompt: trim(e.prompt, 180), studentAnswer: trim(e.answer, 60), correctAnswer: trim(e.expected, 60), at: e.at }));

  const upcoming = input.assignments
    .filter((a) => a.status === 'published' && a.dueAt && new Date(a.dueAt) > now)
    .slice(0, 8)
    .map((a) => {
      const targets = a.assignedTo === 'all' ? input.students.length : a.assignedTo.length;
      const submitted = new Set(input.submissions.filter((s) => s.assignmentId === a.id && (s.status === 'submitted' || s.status === 'graded' || s.status === 'returned')).map((s) => s.studentId)).size;
      return { title: a.title, dueAt: a.dueAt, submitted, total: targets };
    });

  return {
    className: input.className,
    courseTitle: getCourse(input.courseId)?.title ?? input.courseId,
    subject: getCourse(input.courseId)?.subject,
    studentCount: input.students.length,
    taughtLessons: input.taughtLessonIds.map((id) => ({ id, title: lessonById(id)?.title ?? id })),
    skills,
    students,
    recentErrors,
    upcoming,
  };
}
