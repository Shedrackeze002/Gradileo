/**
 * ai-agent: the AI teaching assistant.
 *   status   — whether live MiniMax analysis is configured.
 *   generate — analyse a class or one student and store the insight.
 *   draft    — "Draft with AI" in the assignment builder: a draft assignment for the class's teacher
 *              to review (engine/ai/builder.ts). Only the lessons, skills and the class's average
 *              mastery reach MiniMax, never students' names. Nothing is stored but a count for the
 *              hourly limit; the teacher saves the draft like any assignment.
 *
 * Secrets: MINIMAX_API_KEY (required for live AI), MINIMAX_MODEL, MINIMAX_BASE_URL,
 * AI_DRAFTS_PER_HOUR (default 30). Without a key the shared offline analyst (and the offline draft)
 * is used, so insights and drafts always work.
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, requireTeacherOf, str } from '../_shared/db.ts';
import { aiConfig, loadAnalystInput } from '../_shared/analyst.ts';
import { classMastery, DEFAULT_MODEL, draftAssignment, draftContext, generateInsight, normalizeDraftRequest } from '../_shared/engine/ai/index.ts';
// Every course's question generators, for grading any class on the server.
import '../_shared/engine/curriculum/all.ts';

const PER_HOUR = Number(Deno.env.get('AI_INSIGHTS_PER_HOUR') ?? 60);
const DRAFTS_PER_HOUR = Number(Deno.env.get('AI_DRAFTS_PER_HOUR') ?? 30);

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  const body = await readJson(req);

  if (body.action === 'status') {
    const cfg = aiConfig();
    return cfg
      ? { live: true, model: cfg.model ?? DEFAULT_MODEL, note: 'Live analysis with MiniMax. If MiniMax is unavailable, the offline analyst answers instead.' }
      : { live: false, model: null, note: 'Using Gradileo’s offline analyst. Set the MINIMAX_API_KEY secret on the ai-agent function to enable MiniMax.' };
  }

  if (body.action === 'draft') {
    const classId = str(body.classId, 64);
    await requireTeacherOf(db, classId, me);
    const since = new Date(Date.now() - 3_600_000).toISOString();
    const { count } = await db.from('tutor_requests').select('id', { count: 'exact', head: true }).eq('user_id', me.id).eq('kind', 'draft').gte('created_at', since);
    if ((count ?? 0) >= DRAFTS_PER_HOUR) throw new HttpError(429, 'You have drafted many assignments this hour. Please try again later.');
    await db.from('tutor_requests').insert({ user_id: me.id, kind: 'draft' });
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
