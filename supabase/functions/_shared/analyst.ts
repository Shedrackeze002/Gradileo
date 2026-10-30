/** Loads one class's data in the shape the AI analyst expects. */
import type { AnalystInput } from './engine/ai/index.ts';
import type { Db } from './db.ts';

/**
 * Every row up to `max`, a page at a time: the API returns at most the project's Max Rows (1,000 by
 * default) per request and silently leaves the rest out (the same as src/data/supabase/pages.ts).
 */
async function allRows<T>(page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>, max: number): Promise<{ data: T[] }> {
  const rows: T[] = [];
  while (rows.length < max) {
    const want = Math.min(1000, max - rows.length);
    const { data, error } = await page(rows.length, rows.length + want - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if (!data || data.length < want) break;
  }
  return { data: rows };
}

export async function loadAnalystInput(db: Db, classId: string): Promise<AnalystInput> {
  const { data: cls, error } = await db.from('classes').select('*').eq('id', classId).single();
  if (error || !cls) throw new Error('Class not found.');
  const { data: enr } = await db.from('enrollments').select('student_id, profiles(id, full_name)').eq('class_id', classId);
  const students = (enr ?? []).map((e: { student_id: string; profiles: { full_name: string } | { full_name: string }[] | null }) => {
    const p = Array.isArray(e.profiles) ? e.profiles[0] : e.profiles;
    return { id: e.student_id, name: p?.full_name ?? 'Student' };
  });
  const ids = students.map((s) => s.id);
  const since = new Date(Date.now() - 90 * 86_400_000).toISOString();
  const [pubs, mastery, events, assignments, subs] = await Promise.all([
    db.from('publications').select('lesson_id').eq('class_id', classId),
    ids.length ? allRows((from, to) => db.from('skill_mastery').select('*').in('student_id', ids).order('student_id').order('skill_id').range(from, to), 20000) : Promise.resolve({ data: [] as Record<string, unknown>[] }),
    allRows((from, to) => db.from('skill_events').select('student_id, skill_id, correct, assisted, at, prompt, answer, expected').eq('class_id', classId).gte('at', since).order('at', { ascending: false }).order('id', { ascending: false }).range(from, to), 6000),
    db.from('assignments').select('id, title, type, due_at, assigned_to, status').eq('class_id', classId),
    allRows((from, to) => db.from('submissions').select('assignment_id, student_id, status, submitted_at, percent').eq('class_id', classId).not('assignment_id', 'is', null).order('id').range(from, to), 20000),
  ]);
  return {
    courseId: cls.course_id,
    className: `${cls.name}${cls.section ? ` — ${cls.section}` : ''}`,
    students,
    taughtLessonIds: (pubs.data ?? []).map((p: { lesson_id: string }) => p.lesson_id),
    // deno-lint-ignore no-explicit-any
    mastery: (mastery.data ?? []).map((m: any) => ({
      studentId: m.student_id,
      skillId: m.skill_id,
      pKnown: m.p_known,
      attempts: m.attempts,
      correct: m.correct,
      streak: m.streak,
      sessions: m.sessions,
      level: m.level,
      lastPracticedAt: m.last_practiced_at,
      lastCorrectAt: m.last_correct_at,
      lastSessionId: m.last_session_id,
    })),
    // deno-lint-ignore no-explicit-any
    events: (events.data ?? []).map((e: any) => ({ studentId: e.student_id, skillId: e.skill_id, correct: e.correct, assisted: e.assisted, at: e.at, prompt: e.prompt ?? undefined, answer: e.answer ?? undefined, expected: e.expected ?? undefined })),
    // deno-lint-ignore no-explicit-any
    assignments: (assignments.data ?? []).map((a: any) => ({ id: a.id, title: a.title, type: a.type, dueAt: a.due_at, assignedTo: a.assigned_to ?? 'all', status: a.status })),
    // deno-lint-ignore no-explicit-any
    submissions: (subs.data ?? []).map((s: any) => ({ assignmentId: s.assignment_id, studentId: s.student_id, status: s.status, submittedAt: s.submitted_at, percent: s.percent === null ? null : Number(s.percent) })),
  };
}

export function aiConfig() {
  const apiKey = Deno.env.get('MINIMAX_API_KEY');
  if (!apiKey) return null;
  return {
    apiKey,
    model: Deno.env.get('MINIMAX_MODEL') || undefined,
    baseUrl: Deno.env.get('MINIMAX_BASE_URL') || undefined,
  };
}
