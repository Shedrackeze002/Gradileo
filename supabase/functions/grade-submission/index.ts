/**
 * grade-submission: everything that creates or changes a graded attempt.
 *   start  — student starts an assignment; the server chooses the questions.
 *   submit — student submits; the server re-grades with the shared engine,
 *            updates mastery and records analytics events.
 *   manual — teacher scores a written response.
 *   return — teacher returns the work with feedback.
 */
import { background, HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, notify, requireTeacherOf, str, type Caller, type Db } from '../_shared/db.ts';
import { aiConfig, loadAnalystInput } from '../_shared/analyst.ts';
import {
  buildItemRefs,
  cleanCanvas,
  cleanIntegrity,
  draftFromAction,
  freshSeed,
  gradeSubmission,
  isQuestionType,
  mergeIntegrity,
  processSubmission,
  TYPE_LABEL,
  validateRefs,
  type AssignmentContent,
  type AssignmentType,
  type ItemRef,
  type SkillState,
  type StoredResponse,
} from '../_shared/engine/index.ts';
import { generateInsight } from '../_shared/engine/ai/index.ts';
// Every course's question generators, for grading any class on the server.
import '../_shared/engine/curriculum/all.ts';

// deno-lint-ignore no-explicit-any
type Row = Record<string, any>;
const EMPTY: AssignmentContent = { sections: [], custom: [] };

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  const body = await readJson(req);
  switch (body.action) {
    case 'start':
      return { submission: await start(db, me, str(body.assignmentId, 64)) };
    case 'submit':
      return { submission: await submit(db, me, body) };
    case 'manual':
      return { submission: await manual(db, me, body) };
    case 'return':
      return { submission: await giveBack(db, me, body) };
    default:
      throw new HttpError(400, 'Unknown action.');
  }
});

async function loadAssignment(db: Db, id: string): Promise<Row> {
  const { data } = await db.from('assignments').select('*').eq('id', id).maybeSingle();
  if (!data) throw new HttpError(404, 'Assignment not found.');
  return data;
}

async function start(db: Db, me: Caller, assignmentId: string): Promise<Row> {
  if (me.role !== 'student') throw new HttpError(403, 'Only students start assignments.');
  const a = await loadAssignment(db, assignmentId);
  const { data: enrolled } = await db.from('enrollments').select('student_id').eq('class_id', a.class_id).eq('student_id', me.id).maybeSingle();
  const assigned = !a.assigned_to || (a.assigned_to as string[]).includes(me.id);
  if (!enrolled || !assigned || a.status !== 'published') throw new HttpError(404, 'Assignment not found.');
  if (a.open_at && new Date(a.open_at) > new Date()) throw new HttpError(400, 'This assignment is not open yet.');

  const { data: mine } = await db.from('submissions').select('*').eq('assignment_id', a.id).eq('student_id', me.id);
  const open = (mine ?? []).find((s: Row) => s.status === 'in_progress');
  if (open) return open;
  const used = (mine ?? []).length;
  const attempts = a.settings?.attempts as number | null;
  if (attempts && used >= attempts) throw new HttpError(400, 'You have used all of your attempts.');
  if (a.due_at && new Date(a.due_at) < new Date() && !a.allow_late) throw new HttpError(400, 'This assignment is closed.');

  const seed = freshSeed();
  const items = isQuestionType(a.type as AssignmentType) ? buildItemRefs(a.content as AssignmentContent, seed) : [];
  const { data, error } = await db
    .from('submissions')
    .insert({ assignment_id: a.id, class_id: a.class_id, student_id: me.id, attempt: used + 1, status: 'in_progress', seed, items, responses: {} })
    .select()
    .single();
  if (error) {
    // Two tabs started at once: return the attempt the other request created.
    if (error.code === '23505') {
      const { data: again } = await db.from('submissions').select('*').eq('assignment_id', a.id).eq('student_id', me.id).eq('status', 'in_progress').single();
      if (again) return again;
    }
    throw new Error(error.message);
  }
  return data;
}

function cleanResponses(v: unknown): Record<number, StoredResponse> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {};
  const out: Record<number, StoredResponse> = {};
  for (const [k, raw] of Object.entries(v as Record<string, unknown>)) {
    const i = Number(k);
    if (!Number.isInteger(i) || i < 0 || i > 200 || !raw || typeof raw !== 'object') continue;
    const r = raw as Row;
    out[i] = {
      answers: Array.isArray(r.answers) ? r.answers.slice(0, 12).map((x: unknown) => String(x ?? '').slice(0, 2000)) : [],
      hintsUsed: Math.max(0, Math.min(20, Number(r.hintsUsed) || 0)),
      revealed: !!r.revealed,
      timeMs: Math.max(0, Math.min(86_400_000, Number(r.timeMs) || 0)),
      at: typeof r.at === 'string' ? r.at.slice(0, 40) : undefined,
      checked: !!r.checked,
      canvas: cleanCanvas(r.canvas),
      history: Array.isArray(r.history)
        ? r.history.slice(0, 5).map((h: Row) => ({
            ref: h.ref as ItemRef,
            answers: Array.isArray(h.answers) ? h.answers.slice(0, 12).map((x: unknown) => String(x ?? '').slice(0, 2000)) : [],
            hintsUsed: Math.max(0, Math.min(20, Number(h.hintsUsed) || 0)),
          }))
        : undefined,
    };
  }
  return out;
}

function toState(m: Row): SkillState {
  return {
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
  };
}

async function submit(db: Db, me: Caller, body: Record<string, unknown>): Promise<Row> {
  const id = str(body.submissionId, 64);
  const { data: s } = await db.from('submissions').select('*').eq('id', id).maybeSingle();
  if (!s || s.student_id !== me.id) throw new HttpError(404, 'Submission not found.');
  if (s.status !== 'in_progress') return s; // already submitted (double click, retry)

  const a = s.assignment_id ? await loadAssignment(db, s.assignment_id) : null;
  const now = new Date().toISOString();
  const responses = cleanResponses(body.responses);
  // Exam mode records only grow; the teacher's extra allowance comes from the stored record.
  const integrity = mergeIntegrity(s.integrity, body.integrity ?? { ...cleanIntegrity(s.integrity), blurCount: Number(body.blurCount ?? 0) });
  const late = !!a?.due_at && new Date(now) > new Date(a.due_at);

  if (a && !isQuestionType(a.type as AssignmentType)) {
    const { data, error } = await db
      .from('submissions')
      .update({ status: 'graded', submitted_at: now, score: 1, max_score: 1, percent: 100, late, responses, integrity })
      .eq('id', s.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (late) await tellTeacher(db, a, me, data);
    return data;
  }

  const content: AssignmentContent = (a?.content as AssignmentContent) ?? EMPTY;
  // When "try a similar question" is off the questions are fixed at start; otherwise the
  // client may have swapped in new versions, which must still match the assignment.
  const lockItems = !!a && !a.settings?.retrySimilar;
  const items: ItemRef[] = lockItems ? (s.items as ItemRef[]) : Array.isArray(body.items) ? (body.items as ItemRef[]) : (s.items as ItemRef[]);
  const invalid = validateRefs(items, content, s.practice_skill_ids ?? undefined);
  if (invalid) throw new HttpError(400, invalid);
  // Earlier tries on a slot must be versions of the same skill, and only when retries are allowed.
  for (const [k, r] of Object.entries(responses)) {
    if (!r.history) continue;
    const slot = items[Number(k)];
    r.history = lockItems || !slot || 'custom' in slot ? undefined : r.history.filter((h) => h?.ref && !('custom' in h.ref) && h.ref.skillId === slot.skillId && [1, 2, 3].includes(h.ref.difficulty) && Number.isInteger(h.ref.seed));
  }

  const { data: rows } = await db.from('skill_mastery').select('*').eq('student_id', me.id);
  const before = new Map<string, SkillState>((rows ?? []).map((m: Row) => [m.skill_id, toState(m)]));
  const out = processSubmission({ assignmentId: a?.id ?? null, content, dueAt: a?.due_at ?? null, submissionId: s.id, items, responses, mastery: before, now });

  const { data: saved, error } = await db
    .from('submissions')
    .update({
      items,
      responses,
      integrity,
      status: out.status,
      submitted_at: now,
      score: out.summary.score,
      max_score: out.summary.maxScore,
      percent: out.summary.percent,
      pending_manual: out.summary.pendingManual,
      late: out.late,
      mastery_changes: out.changes,
    })
    .eq('id', s.id)
    .eq('status', 'in_progress')
    .select()
    .single();
  if (error || !saved) throw new HttpError(409, 'This attempt was already submitted.');

  const changed = [...out.mastery.values()].filter((st) => JSON.stringify(st) !== JSON.stringify(before.get(st.skillId)));
  if (changed.length) {
    const { error: e1 } = await db.from('skill_mastery').upsert(
      changed.map((st) => ({
        student_id: me.id,
        skill_id: st.skillId,
        p_known: st.pKnown,
        attempts: st.attempts,
        correct: st.correct,
        streak: st.streak,
        sessions: st.sessions,
        level: st.level,
        last_practiced_at: st.lastPracticedAt,
        last_correct_at: st.lastCorrectAt,
        last_session_id: st.lastSessionId ?? null,
        updated_at: now,
      })),
    );
    if (e1) console.error('mastery upsert failed', e1.message);
  }
  if (out.events.length) {
    const { error: e2 } = await db.from('skill_events').insert(
      out.events.map((e) => ({
        student_id: me.id,
        class_id: s.class_id,
        skill_id: e.skillId,
        correct: e.correct,
        assisted: e.assisted,
        submission_id: s.id,
        assignment_id: a?.id ?? null,
        at: e.at,
        prompt: e.correct ? null : e.prompt.slice(0, 180),
        answer: e.correct ? null : e.answer,
        expected: e.correct ? null : e.expected.slice(0, 80),
      })),
    );
    if (e2) console.error('event insert failed', e2.message);
  }

  if (a) {
    if (saved.pending_manual > 0 || saved.late || integrity.autoSubmitted) await tellTeacher(db, a, me, saved);
    background(autopilot(db, a.class_id, me.id));
  } else {
    // Self-paced students have no teacher: the AI tutor may assign targeted practice after their own
    // practice too (autopilot is on for self-paced classes and limits itself to once every 3 days).
    background(autopilot(db, s.class_id, me.id));
  }
  return saved;
}

async function tellTeacher(db: Db, a: Row, me: Caller, s: Row) {
  const { data: c } = await db.from('classes').select('id, teacher_id').eq('id', a.class_id).single();
  if (!c?.teacher_id) return;
  const score = s.percent !== null && isQuestionType(a.type as AssignmentType) ? `Score: ${Math.round(Number(s.percent))}%` : 'Completed.';
  await notify(db, [
    {
      user_id: c.teacher_id,
      kind: 'submission',
      title: `${me.full_name} submitted ${a.title}${s.integrity?.autoSubmitted ? ' (automatically, after leaving exam mode)' : s.late ? ' (late)' : ''}`,
      body: s.pending_manual > 0 ? `${score} · ${s.pending_manual} to grade` : score,
      link: s.pending_manual > 0 ? `/t/c/${c.id}/submissions/${s.id}` : `/t/c/${c.id}/assignments/${a.id}`,
      assignment_id: a.id,
    },
  ]);
}

/** When autopilot is on, assign targeted practice for the student's weakest skill (at most every 3 days). */
async function autopilot(db: Db, classId: string, studentId: string) {
  const { data: c } = await db.from('classes').select('id, teacher_id, settings').eq('id', classId).single();
  if (!c?.settings?.aiAutopilot) return;
  const since = new Date(Date.now() - 3 * 86_400_000).toISOString();
  const { data: recent } = await db.from('assignments').select('id').eq('class_id', classId).eq('created_by', 'ai').contains('assigned_to', [studentId]).gte('created_at', since).limit(1);
  if (recent?.length) return;
  const input = await loadAnalystInput(db, classId);
  const res = await generateInsight(input, { scope: 'student', studentId }, aiConfig());
  const action = res.data.actions.find((x) => x.type === 'assign_practice');
  const draft = action ? draftFromAction(action) : null;
  if (!action || !draft) return;
  const { data: a, error } = await db
    .from('assignments')
    .insert({
      class_id: classId,
      title: draft.title,
      type: draft.type,
      instructions: draft.instructions,
      content: draft.content,
      settings: draft.settings,
      due_at: draft.dueAt,
      reminder_hours: draft.reminderHours,
      assigned_to: [studentId],
      status: 'published',
      created_by: 'ai',
      ai_rationale: draft.aiRationale,
    })
    .select()
    .single();
  if (error || !a) return;
  const { data: p } = await db.from('profiles').select('full_name').eq('id', studentId).single();
  if (c.teacher_id) await notify(db, [{ user_id: c.teacher_id, kind: 'insight', title: `Autopilot assigned ${TYPE_LABEL.practice.toLowerCase()} to ${p?.full_name ?? 'a student'}`, body: `${a.title}. ${action.rationale}`, link: `/t/c/${classId}/assignments/${a.id}`, assignment_id: a.id }]);
  await db.from('insights').insert({
    class_id: classId,
    student_id: studentId,
    source: res.source,
    model: res.model,
    data: { ...res.data, actions: res.data.actions.map((x) => (x.id === action.id ? { ...x, status: 'done' } : x)) },
    error: res.error ?? null,
  });
}

async function teacherSubmission(db: Db, me: Caller, id: string) {
  const { data: s } = await db.from('submissions').select('*').eq('id', id).maybeSingle();
  if (!s) throw new HttpError(404, 'Submission not found.');
  await requireTeacherOf(db, s.class_id, me);
  const a = s.assignment_id ? await loadAssignment(db, s.assignment_id) : null;
  return { s: s as Row, a };
}

async function manual(db: Db, me: Caller, body: Record<string, unknown>): Promise<Row> {
  const { s, a } = await teacherSubmission(db, me, str(body.submissionId, 64));
  if (s.status === 'in_progress') throw new HttpError(400, 'The student has not submitted yet.');
  const index = Number(body.itemIndex);
  if (!Number.isInteger(index) || index < 0 || index >= (s.items as unknown[]).length) throw new HttpError(400, 'Unknown question.');
  // null clears the teacher's mark: an auto-graded question goes back to its automatic mark.
  const score = body.score === null ? null : Math.max(0, Math.min(1, Number(body.score)));
  if (score !== null && !Number.isFinite(score)) throw new HttpError(400, 'Invalid score.');
  const responses = { ...(s.responses as Record<number, StoredResponse>) };
  responses[index] = { ...(responses[index] ?? { answers: [], hintsUsed: 0 }), manualScore: score, comment: str(body.comment, 2000) || null };
  const g = gradeSubmission(s.items as ItemRef[], responses, (a?.content as AssignmentContent) ?? EMPTY, a?.id ?? 'practice');
  const status = s.status === 'submitted' && g.pendingManual === 0 ? 'graded' : s.status;
  const { data, error } = await db
    .from('submissions')
    .update({ responses, score: g.score, max_score: g.maxScore, percent: g.percent, pending_manual: g.pendingManual, status })
    .eq('id', s.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

async function giveBack(db: Db, me: Caller, body: Record<string, unknown>): Promise<Row> {
  const { s, a } = await teacherSubmission(db, me, str(body.submissionId, 64));
  if (s.status === 'in_progress') throw new HttpError(400, 'The student has not submitted yet.');
  const feedback = str(body.feedback, 5000).trim();
  const { data, error } = await db.from('submissions').update({ feedback: feedback || null, status: 'returned' }).eq('id', s.id).select().single();
  if (error) throw new Error(error.message);
  await notify(db, [
    {
      user_id: s.student_id,
      kind: 'graded',
      title: `${a?.title ?? 'Your work'} was returned`,
      body: feedback ? `Feedback: ${feedback.slice(0, 120)}` : 'Your teacher returned your work.',
      link: a ? `/s/work/${a.id}` : '/s/work',
      assignment_id: a?.id ?? null,
    },
  ]);
  return data;
}
