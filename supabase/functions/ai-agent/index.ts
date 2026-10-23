/**
 * ai-agent: the AI teaching assistant.
 *   status   — whether live MiniMax analysis is configured.
 *   generate — analyse a class or one student and store the insight.
 *   draft    — "Draft with AI" in the assignment builder: a draft assignment for the class's teacher
 *              to review (engine/ai/builder.ts). Only the lessons, skills and the class's average
 *              mastery reach MiniMax, never students' names. Nothing is stored but a count for the
 *              hourly limit; the teacher saves the draft like any assignment.
 *   regenerate — "Regenerate" on one question in the builder: a new question in the same format and
 *              skill (counted with the drafts' hourly limit).
 *   report   — a draft report card for one student (engine/ai/reportCard.ts), saved for the
 *              teacher to edit and share. MiniMax gets the student's skills, work and recent
 *              mistakes with no name ({name} stands in), or the offline writer drafts it.
 *   mark     — an AI-suggested mark for one written response, for the class's teacher
 *              (engine/ai/marking.ts). MiniMax gets the question, its marking guide, what the student
 *              typed and pictures of their canvas pages (drawn by the teacher's browser), never a
 *              name. Nothing is stored: the teacher chooses the mark.
 *
 * Secrets: MINIMAX_API_KEY (required for live AI), MINIMAX_MODEL, MINIMAX_BASE_URL,
 * AI_DRAFTS_PER_HOUR (default 30), AI_MARKS_PER_HOUR (default 150), AI_REPORTS_PER_HOUR (default 120). Without a key the shared
 * offline analyst (and the offline draft) is used, so insights and drafts always work; there is no
 * regenerated question or suggested mark, and the teacher is told why.
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, requireTeacherOf, str, type Db } from '../_shared/db.ts';
import { aiConfig, loadAnalystInput } from '../_shared/analyst.ts';
import { buildStudentContext, classMastery, DEFAULT_MODEL, draftAssignment, draftContext, generateInsight, markRequestFor, normalizeDraftRequest, normalizeRegenerateRequest, regenerateQuestion, suggestMark, writeReportCard } from '../_shared/engine/ai/index.ts';
import { itemFromRef, type AssignmentContent, type ItemRef } from '../_shared/engine/index.ts';
// Every course's question generators, for grading any class on the server.
import '../_shared/engine/curriculum/all.ts';

const PER_HOUR = Number(Deno.env.get('AI_INSIGHTS_PER_HOUR') ?? 60);
const DRAFTS_PER_HOUR = Number(Deno.env.get('AI_DRAFTS_PER_HOUR') ?? 30);
const MARKS_PER_HOUR = Number(Deno.env.get('AI_MARKS_PER_HOUR') ?? 150);
const REPORTS_PER_HOUR = Number(Deno.env.get('AI_REPORTS_PER_HOUR') ?? 120);

/** Counts one call towards the caller's hourly limit for `kinds`, or refuses it. */
async function withinLimit(db: Db, userId: string, kind: 'draft' | 'regenerate' | 'mark' | 'report', kinds: string[], perHour: number, message: string) {
  const since = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await db.from('tutor_requests').select('id', { count: 'exact', head: true }).eq('user_id', userId).in('kind', kinds).gte('created_at', since);
  if ((count ?? 0) >= perHour) throw new HttpError(429, message);
  await db.from('tutor_requests').insert({ user_id: userId, kind });
}

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  // A suggested mark carries pictures of up to four canvas pages.
  const body = await readJson(req, 4_500_000);

  if (body.action === 'status') {
    const cfg = aiConfig();
    return cfg
      ? { live: true, model: cfg.model ?? DEFAULT_MODEL, note: 'Live analysis with MiniMax. If MiniMax is unavailable, the offline analyst answers instead.' }
      : { live: false, model: null, note: 'Using Gradileo’s offline analyst. Set the MINIMAX_API_KEY secret on the ai-agent function to enable MiniMax.' };
  }

  if (body.action === 'draft') {
    const classId = str(body.classId, 64);
    await requireTeacherOf(db, classId, me);
    await withinLimit(db, me.id, 'draft', ['draft', 'regenerate'], DRAFTS_PER_HOUR, 'You have drafted many assignments this hour. Please try again later.');
    const input = await loadAnalystInput(db, classId);
    let req;
    try {
      req = normalizeDraftRequest(body.request, input.courseId);
    } catch (e) {
      throw new HttpError(400, (e as Error).message);
    }
    const res = await draftAssignment(req, draftContext(input.courseId, req.lessonIds, classMastery(input.mastery)), aiConfig());
    // The reason MiniMax failed is logged here, not sent to the browser.
    const { error, ...reply } = res;
    if (error) console.error('draft fell back to offline', error);
    return reply;
  }

  if (body.action === 'regenerate') {
    const cls = await requireTeacherOf(db, str(body.classId, 64), me);
    let req;
    try {
      req = normalizeRegenerateRequest(body.request, cls.course_id);
    } catch (e) {
      throw new HttpError(400, (e as Error).message);
    }
    await withinLimit(db, me.id, 'regenerate', ['draft', 'regenerate'], DRAFTS_PER_HOUR, 'You have asked the AI for many questions this hour. Please try again later.');
    const { error, ...reply } = await regenerateQuestion(req, draftContext(cls.course_id, req.lessonIds), aiConfig());
    if (error) console.error('regenerate failed', error);
    return reply;
  }

  if (body.action === 'report') {
    const classId = str(body.classId, 64);
    await requireTeacherOf(db, classId, me);
    const studentId = str(body.studentId, 64);
    const { data: enrolled } = await db.from('enrollments').select('student_id').eq('class_id', classId).eq('student_id', studentId).maybeSingle();
    if (!enrolled) throw new HttpError(404, 'That student is not in this class.');
    await withinLimit(db, me.id, 'report', ['report'], REPORTS_PER_HOUR, 'You have written many report cards this hour. Please try again later.');
    const input = await loadAnalystInput(db, classId);
    const res = await writeReportCard(buildStudentContext(input, studentId), { period: str(body.period, 80), notes: str(body.notes, 500) }, aiConfig());
    if (res.error) console.error('report card fell back to offline', res.error);
    const { data, error } = await db
      .from('report_cards')
      .insert({ class_id: classId, student_id: studentId, period: res.content.period, content: res.content, source: res.source, model: res.model })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { reportCard: data };
  }

  if (body.action === 'mark') {
    const { data: sub } = await db.from('submissions').select('class_id, assignment_id, items, responses').eq('id', str(body.submissionId, 64)).maybeSingle();
    if (!sub) throw new HttpError(404, 'Submission not found.');
    await requireTeacherOf(db, sub.class_id, me);
    const index = Number(body.itemIndex);
    const ref = Number.isInteger(index) ? (sub.items as ItemRef[])[index] : undefined;
    let content: AssignmentContent = { sections: [], custom: [] };
    if (sub.assignment_id) {
      const { data: a } = await db.from('assignments').select('content').eq('id', sub.assignment_id).maybeSingle();
      if (a) content = a.content as AssignmentContent;
    }
    const item = ref ? itemFromRef(ref, content, sub.assignment_id ?? 'practice') : null;
    const markReq = item ? markRequestFor(item, (sub.responses as Record<number, { answers?: string[]; canvas?: string }>)[index], body.pages) : null;
    if (!markReq) throw new HttpError(400, 'That question has no written response.');
    await withinLimit(db, me.id, 'mark', ['mark'], MARKS_PER_HOUR, 'You have asked for many suggested marks this hour. Please try again later.');
    const { error, ...reply } = await suggestMark(markReq, aiConfig());
    if (error) console.error('suggested mark fell back', error);
    return reply;
  }

  if (body.action !== 'generate') throw new HttpError(400, 'Unknown action.');
  const classId = str(body.classId, 64);
  await requireTeacherOf(db, classId, me);
  const studentId = body.studentId ? str(body.studentId, 64) : null;
  if (studentId) {
    const { data } = await db.from('enrollments').select('student_id').eq('class_id', classId).eq('student_id', studentId).maybeSingle();
    if (!data) throw new HttpError(404, 'That student is not in this class.');
  }
  const since = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await db.from('insights').select('id', { count: 'exact', head: true }).eq('class_id', classId).gte('created_at', since);
  if ((count ?? 0) >= PER_HOUR) throw new HttpError(429, 'You have run many analyses this hour. Please try again later.');

  const input = await loadAnalystInput(db, classId);
  const res = await generateInsight(input, studentId ? { scope: 'student', studentId } : { scope: 'class' }, aiConfig());
  const { data, error } = await db
    .from('insights')
    .insert({ class_id: classId, student_id: studentId, source: res.source, model: res.model, data: res.data, error: res.error ?? null })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { insight: data };
});
