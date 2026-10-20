/**
 * ai-tutor: the students' AI tutor.
 *   script — what the tutor says at each step of a run of lesson slides. Narration is written once
 *            and saved, keyed by a hash of the prompt version, model and slides, so later students
 *            get it at once. Offline narration is returned (and not saved) when MiniMax is off or
 *            fails.
 *   ask    — the tutor's answer to a student's question about the slide in front of them.
 *
 * Any signed-in user may call it, within hourly limits. Students' names never reach MiniMax; their
 * questions are sent to it to be answered and are not stored.
 *
 * Secrets: MINIMAX_API_KEY (live AI), MINIMAX_MODEL, MINIMAX_BASE_URL,
 * AI_TUTOR_SCRIPTS_PER_HOUR (default 60), AI_TUTOR_QUESTIONS_PER_HOUR (default 40).
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, str, type Db } from '../_shared/db.ts';
import { aiConfig } from '../_shared/analyst.ts';
import { answerTutorQuestion, DEFAULT_MODEL, normalizeChunk, normalizeQuestion, offlineScript, TUTOR_PROMPT_VERSION, writeTutorScript } from '../_shared/engine/ai/index.ts';

const SCRIPTS_PER_HOUR = Number(Deno.env.get('AI_TUTOR_SCRIPTS_PER_HOUR') ?? 60);
const QUESTIONS_PER_HOUR = Number(Deno.env.get('AI_TUTOR_QUESTIONS_PER_HOUR') ?? 40);

async function sha256(s: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Counts this hour's calls of one kind and records this one; throws 429 past the limit. */
async function spend(db: Db, userId: string, kind: 'script' | 'ask', limit: number) {
  const since = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await db.from('tutor_requests').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('kind', kind).gte('created_at', since);
  if ((count ?? 0) >= limit) {
    throw new HttpError(429, kind === 'ask' ? 'You have asked a lot of questions this hour. Take a short break and try again soon.' : 'The tutor is busy. Please try again in a little while.');
  }
  await db.from('tutor_requests').insert({ user_id: userId, kind });
  // Old rows only matter for the hourly limits.
  if (Math.random() < 0.05) await db.from('tutor_requests').delete().lt('created_at', new Date(Date.now() - 86_400_000).toISOString());
}

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  const body = await readJson(req);
  const ai = aiConfig();

  if (body.action === 'script') {
    const lessonId = str(body.lessonId, 40);
    if (!/^[a-z0-9-]{3,40}$/.test(lessonId)) throw new HttpError(400, 'Unknown lesson.');
    let chunk;
    try {
      chunk = normalizeChunk(body.chunk);
    } catch (e) {
      throw new HttpError(400, (e as Error).message);
    }
    if (!ai) return { script: offlineScript(chunk), source: 'offline', model: null };
    const model = ai.model ?? DEFAULT_MODEL;
    const key = await sha256(JSON.stringify({ v: TUTOR_PROMPT_VERSION, model, chunk }));
    const { data: saved } = await db.from('tutor_scripts').select('script, model').eq('key', key).maybeSingle();
    if (saved) return { script: saved.script, source: 'minimax', model: saved.model };
    await spend(db, me.id, 'script', SCRIPTS_PER_HOUR);
    const res = await writeTutorScript(chunk, ai);
    if (res.source === 'minimax') {
      const { error } = await db.from('tutor_scripts').upsert({ key, lesson_id: lessonId, model: res.model ?? model, script: res.script }, { onConflict: 'key', ignoreDuplicates: true });
      if (error) console.error('tutor script not saved', error.message);
    } else if (res.error) console.error('tutor script fell back to offline', res.error);
    return { script: res.script, source: res.source, model: res.model };
  }

  if (body.action === 'ask') {
    let q;
    try {
      q = normalizeQuestion(body.question);
    } catch (e) {
      throw new HttpError(400, (e as Error).message);
    }
    await spend(db, me.id, 'ask', QUESTIONS_PER_HOUR);
    const res = await answerTutorQuestion(q, ai);
    if (res.error) console.error('tutor answer fell back to offline', res.error);
    return { answer: res.answer, source: res.source, model: res.model };
  }

  throw new HttpError(400, 'Unknown action.');
});
