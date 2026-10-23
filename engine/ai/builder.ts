/**
 * The AI assignment builder ("Draft with AI"): from a teacher's choices (the kind of work, the
 * lessons, how many questions, the difficulty, the question formats, whether to focus on what the
 * class finds hard, and any notes), MiniMax drafts an assignment. It uses the course's own
 * generated questions where it can (every student gets fresh numbers, graded by the engine, with
 * hints and worked solutions) and writes its own questions only in the formats the teacher allows,
 * each with its answer and a worked solution or marking guide. A written question's numeric answer
 * must match an arithmetic check the model gives, or it is dropped; then a second call solves every
 * question with one right answer again, without seeing the first answer, and a question whose two
 * answers disagree is dropped too. The teacher reviews, edits and publishes the draft; nothing
 * reaches students before that. Without MiniMax, or when its answer is
 * unusable, an offline draft spreads the questions over the chosen lessons' skills.
 *
 * Runs in the browser (demo mode) and in the `ai-agent` Edge Function. No student names are sent:
 * only the lessons, skills and the class's average mastery of each skill.
 */
import { TYPE_LABEL, type CustomQuestion, type SkillSection } from '../assemble.ts';
import { getCourse, lessonById, skillInfo } from '../curriculum/index.ts';
import { evaluate, parseExpr } from '../math/expr.ts';
import { fmt, roundTo } from '../math/numbers.ts';
import type { Difficulty } from '../types.ts';
import { minimaxChat, type MiniMaxConfig } from './minimax.ts';
import { extractJson } from './parse.ts';
import { subjectName } from './prompt.ts';

export const DRAFT_TYPES = ['homework', 'practice', 'classwork', 'quiz', 'exam'] as const;
export type DraftType = (typeof DRAFT_TYPES)[number];

/** Generated: the course's question generators. Choice, short and written: questions the AI writes. */
export const DRAFT_FORMATS = ['generated', 'choice', 'short', 'written'] as const;
export type DraftFormat = (typeof DRAFT_FORMATS)[number];
/** The formats the AI writes itself. */
export type WrittenFormat = Exclude<DraftFormat, 'generated'>;

export interface DraftRequest {
  type: DraftType;
  lessonIds: string[];
  /** Questions in all, 1 to MAX_DRAFT_QUESTIONS. */
  count: number;
  difficulty: 'easier' | 'mixed' | 'harder';
  formats: DraftFormat[];
  /** Give more questions to the skills the class finds hard. */
  focusWeak: boolean;
  /** The teacher's own wishes, in their words. */
  notes: string;
}

export interface DraftSkill {
  id: string;
  name: string;
  description: string;
  lessonId: string;
  /** The class's average chance of knowing the skill (0 to 1), or null with no data yet. */
  mastery: number | null;
}

export interface DraftContext {
  courseTitle: string;
  /** The course's subject ("Mathematics", "Chemistry"); mathematics when missing. */
  subject?: string;
  lessons: Array<{ id: string; number: string; title: string; skills: DraftSkill[] }>;
}

export interface AssignmentDraft {
  title: string;
  instructions: string;
  sections: SkillSection[];
  custom: CustomQuestion[];
  /** For the teacher: why the draft looks the way it does. */
  rationale: string;
}

export interface DraftResult {
  draft: AssignmentDraft;
  source: 'minimax' | 'offline';
  model: string | null;
  error?: string;
  /** Questions the model wrote that failed the checks and were left out, with the reason. */
  dropped?: string[];
  /** The second solution could not be made, so the answers of the AI's own questions are unchecked. */
  unchecked?: boolean;
}

export const MAX_DRAFT_QUESTIONS = 40;
const MAX_LESSONS = 30;

const text = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Checks a request sent by a browser against the course; throws when it is unusable. */
export function normalizeDraftRequest(v: unknown, courseId: string): DraftRequest {
  const o = (v ?? {}) as Record<string, unknown>;
  const course = getCourse(courseId);
  if (!course) throw new Error('Unknown course.');
  const inCourse = new Set(course.lessons.map((l) => l.id));
  const lessonIds = [...new Set(Array.isArray(o.lessonIds) ? o.lessonIds.filter((x): x is string => typeof x === 'string' && inCourse.has(x)) : [])].slice(0, MAX_LESSONS);
  if (!lessonIds.length) throw new Error('Choose at least one lesson.');
  const type = DRAFT_TYPES.includes(o.type as DraftType) ? (o.type as DraftType) : 'homework';
  const formats = DRAFT_FORMATS.filter((f) => Array.isArray(o.formats) && o.formats.includes(f));
  if (!formats.length) throw new Error('Choose at least one kind of question.');
  const count = Math.round(Number(o.count));
  return {
    type,
    lessonIds,
    count: Number.isFinite(count) ? Math.min(MAX_DRAFT_QUESTIONS, Math.max(1, count)) : 10,
    difficulty: o.difficulty === 'easier' || o.difficulty === 'harder' ? o.difficulty : 'mixed',
    formats,
    focusWeak: o.focusWeak === true,
    notes: text(o.notes, 600),
  };
}

/** The class's average mastery (0 to 1) of each skill its students have practised. */
export function classMastery(rows: ReadonlyArray<{ skillId: string; pKnown: number; attempts: number }>): Map<string, number> {
  const sums = new Map<string, [number, number]>();
  for (const r of rows) {
    if (r.attempts <= 0) continue;
    const [t, n] = sums.get(r.skillId) ?? [0, 0];
    sums.set(r.skillId, [t + r.pKnown, n + 1]);
  }
  return new Map([...sums].map(([id, [t, n]]) => [id, t / n]));
}

/** The lessons and skills a draft can use, with the class's mastery of each skill. */
export function draftContext(courseId: string, lessonIds: string[], mastery: ReadonlyMap<string, number> = new Map()): DraftContext {
  const course = getCourse(courseId);
  return {
    courseTitle: course?.title ?? '',
    subject: course?.subject,
    lessons: lessonIds.flatMap((id) => {
      const l = lessonById(id);
      if (!l) return [];
      const skills = l.skills.flatMap((sid) => {
        const s = skillInfo(sid);
        return s ? [{ id: sid, name: s.name, description: s.description, lessonId: id, mastery: mastery.get(sid) ?? null }] : [];
      });
      return [{ id, number: l.number, title: l.title, skills }];
    }),
  };
}

// ---------------------------------------------------------------- offline draft

const INSTRUCTIONS: Record<DraftType, string> = {
  homework: 'Show your working on paper. Use the hints only after a real try.',
  practice: 'Practise until it feels easy. Use the hints whenever you need them.',
  classwork: 'Work through these in class. Ask if you get stuck.',
  quiz: 'Work on your own. Show your working on paper.',
  exam: 'Work on your own and show your working. Check your answers before you submit.',
};

function draftTitle(type: DraftType, ctx: DraftContext): string {
  const label = TYPE_LABEL[type];
  if (ctx.lessons.length === 1) return `${label}: ${ctx.lessons[0].number} ${ctx.lessons[0].title}`;
  return `${label}: Lessons ${ctx.lessons.map((l) => l.number).join(', ')}`;
}

const difficultyOf = (d: DraftRequest['difficulty']): SkillSection['difficulty'] => (d === 'easier' ? 1 : d === 'harder' ? 3 : 'mixed');

/** Skills in the order they get questions: the weakest first when the teacher asks to focus. */
function skillOrder(req: DraftRequest, ctx: DraftContext): DraftSkill[] {
  const skills = ctx.lessons.flatMap((l) => l.skills);
  if (!req.focusWeak) return skills;
  return [...skills].sort((a, b) => (a.mastery ?? 0.6) - (b.mastery ?? 0.6));
}

/** Spreads `count` questions over the skills, at most `cap` each, the first skills first. */
function spread(skills: DraftSkill[], count: number, cap = 6): Map<string, number> {
  const out = new Map<string, number>();
  for (let k = 0, left = count; left > 0 && skills.length; k++) {
    const s = skills[k % skills.length];
    const n = out.get(s.id) ?? 0;
    if (n >= cap && [...out.values()].every((x) => x >= cap)) break;
    if (n < cap) {
      out.set(s.id, n + 1);
      left--;
    }
  }
  return out;
}

/** A draft made without the AI: the course's generated questions, spread over the lessons' skills. */
export function offlineDraft(req: DraftRequest, ctx: DraftContext): AssignmentDraft {
  const order = skillOrder(req, ctx);
  // With few questions and many skills, the focus decides which skills are in.
  const chosen = req.focusWeak ? order.slice(0, Math.max(1, Math.min(order.length, req.count))) : order;
  const counts = spread(chosen, req.count);
  const sections = chosen.filter((s) => counts.has(s.id)).map((s) => ({ skillId: s.id, count: counts.get(s.id)!, difficulty: difficultyOf(req.difficulty) }));
  const onlyWritten = !req.formats.includes('generated');
  return {
    title: draftTitle(req.type, ctx),
    instructions: INSTRUCTIONS[req.type],
    sections,
    custom: [],
    rationale: `${sections.length} skill${sections.length === 1 ? '' : 's'} from ${ctx.lessons.length === 1 ? 'the lesson' : `${ctx.lessons.length} lessons`}, each with fresh numbers for every student${req.focusWeak ? ', with more questions on what the class finds hard' : ''}.${onlyWritten ? ' The AI is not available right now, so this draft uses the course’s generated questions; add your own questions below or try again later.' : ''}`,
  };
}

// ---------------------------------------------------------------- the prompt

/** How to write each format the AI writes itself (the draft and a regenerated question share them). */
const FORMAT_RULES: Record<WrittenFormat, string> = {
  choice: `  - choice: 4 choices, exactly one correct ("correct" is its index from 0), and wrong choices that come from real mistakes. The solution explains the reasoning and never names a choice by its number or letter.`,
  short: `  - short: either a single number ("value", and "check": an arithmetic expression with only numbers, + - * / ^ and brackets that computes it, such as "(18 - 6) / 4"), or a word or short phrase ("accepted": every acceptable answer).`,
  written: `  - written: the student explains or shows working; give "points" (2 to 6) and, in "solution", a model answer and how to award the points.`,
};

const ACCURACY_RULES = `- Every number in your questions and answers must be right: work each answer out step by step before you write it.
- Questions use Markdown with maths in $...$; write money as \\$4.50 outside the maths. State every rate, price or rule inside the question, never claim a current official figure, and use neutral settings with no real place names. In JSON strings, write every backslash twice (\\\\frac).`;

const QUESTION_JSON = `{"format": "choice" | "short" | "written", "skillId": string, "prompt": string, "choices"?: [string, ...], "correct"?: number, "value"?: number, "check"?: string, "accepted"?: [string, ...], "points"?: number, "solution": string}`;

export function draftPrompt(req: DraftRequest, ctx: DraftContext): { system: string; user: string } {
  const own = req.formats.filter((f): f is WrittenFormat => f !== 'generated');
  return {
    system: `You help a ${subjectName(ctx.subject)} teacher draft a ${TYPE_LABEL[req.type].toLowerCase()} for their class from the lessons and skills given. The teacher reviews and edits your draft before any student sees it.
Rules:
- Exactly ${req.count} questions in all: each generated question counts as one, and each question you write counts as one.
${req.formats.includes('generated') ? `- Generated questions: choose skills by their id from the list. Each gives every student fresh numbers and is graded automatically, with hints and a worked solution. Give each chosen skill a count (1 to 6) and a difficulty: 1 easy, 2 medium, 3 hard, or "mixed" (easy to hard). Use generated questions for most routine practice.` : '- Do not use generated questions: write every question yourself.'}
${own.length ? `- Your own questions, only in these formats: ${own.join(', ')} (never any other format). Use them for what generated questions cannot do: word problems in a real context, reasoning, explaining, spotting a mistake. Each practises one skill from the list (give its id) and has a worked "solution" in Markdown with maths in $...$.
${own.map((f) => FORMAT_RULES[f]).join('\n')}` : '- Do not write questions of your own.'}
${ACCURACY_RULES}
- Difficulty: ${req.difficulty === 'easier' ? 'mostly easy, some medium' : req.difficulty === 'harder' ? 'mostly medium and hard' : 'a range from easy to hard'}.${req.focusWeak ? '\n- Give more of the questions to the skills with low class mastery (the class\'s average chance of knowing the skill, 0 to 1; null means no data yet).' : ''}
- Follow the teacher's notes where they fit these rules.
- "title": short, like "Homework: The Pythagorean Theorem". "instructions": one or two sentences to the students. "rationale": one or two sentences to the teacher about your choices.
Output ONLY one JSON object, no prose and no code fences: {"title": string, "instructions": string, "rationale": string, "sections": [{"skillId": string, "count": number, "difficulty": 1 | 2 | 3 | "mixed"}], "questions": [${QUESTION_JSON}]}`,
    user: JSON.stringify({
      course: ctx.courseTitle,
      kind: TYPE_LABEL[req.type],
      questions: req.count,
      notes: req.notes || undefined,
      lessons: ctx.lessons.map((l) => ({ lesson: `${l.number} ${l.title}`, skills: l.skills.map((s) => ({ id: s.id, name: s.name, description: s.description, mastery: s.mastery === null ? null : Math.round(s.mastery * 100) / 100 })) })),
    }),
  };
}

// ---------------------------------------------------------------- parsing and checks

/**
 * LaTeX whose backslash the model forgot to double arrives as a control character ("\frac" as a
 * form feed and "rac"); inside $...$ such a character before a letter was a backslash.
 */
const ESCAPED: Record<string, string> = { '\f': 'f', '\b': 'b', '\t': 't', '\r': 'r', '\n': 'n' };

export function repairLatex(s: string): string {
  return s.replace(/(?<!\\)\$[^$]*?(?<!\\)\$/g, (m) => m.replace(/[\f\b\t\r\n](?=[a-zA-Z])/g, (c) => `\\${ESCAPED[c]}`));
}

/** The value of an arithmetic check such as "(18 - 6) / 4", or null when it is not plain arithmetic. */
export function checkValue(expr: string): number | null {
  if (!/^[\d\s.+\-*/^()×÷−]+$/.test(expr)) return null;
  try {
    const v = evaluate(parseExpr(expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')));
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

const same = (a: number, b: number) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));

/** Half of the last decimal place the answer is given to: 2.40 accepts 2.395 to 2.405. */
function toleranceFor(value: number): number {
  const s = String(value);
  const places = s.includes('.') ? s.split('.')[1].length : 0;
  return places ? Math.round(0.5 * 10 ** -places * 1e9) / 1e9 : 1e-6;
}

/** The model's draft, checked: unknown skills, extra questions and questions that fail their checks are left out. */
export function parseDraft(raw: unknown, req: DraftRequest, ctx: DraftContext, newId: (prefix: string) => string = defaultId): { draft: AssignmentDraft; dropped: string[] } {
  const { sections, custom, dropped } = parseDraftParts(raw, req, ctx, newId);
  // Exactly the number asked for: trim the largest sections or the last questions, or top up the
  // generated sections when they are allowed.
  return finishDraft((raw ?? {}) as Record<string, unknown>, sections, custom, dropped, req, ctx);
}

/** The draft's generated sections and checked questions, before it is trimmed or topped up to size. */
function parseDraftParts(raw: unknown, req: DraftRequest, ctx: DraftContext, newId: (prefix: string) => string): { sections: SkillSection[]; custom: CustomQuestion[]; dropped: string[] } {
  const o = (raw ?? {}) as Record<string, unknown>;
  const allowed = new Map(ctx.lessons.flatMap((l) => l.skills.map((s) => [s.id, s] as const)));
  const dropped: string[] = [];

  const sections: SkillSection[] = [];
  if (req.formats.includes('generated') && Array.isArray(o.sections)) {
    for (const s of o.sections as Array<Record<string, unknown>>) {
      const skillId = String(s?.skillId ?? '');
      if (!allowed.has(skillId) || sections.some((x) => x.skillId === skillId)) continue;
      const count = Math.min(6, Math.max(1, Math.round(Number(s.count) || 1)));
      const d = s.difficulty;
      const difficulty: SkillSection['difficulty'] = d === 1 || d === 2 || d === 3 ? (d as Difficulty) : 'mixed';
      sections.push({ skillId, count, difficulty });
    }
  }

  const { custom, dropped: left } = parseQuestions(o.questions, req.formats, allowed, newId);
  dropped.push(...left);
  return { sections, custom, dropped };
}

/** The questions the model wrote, checked: those that fail are left out, with the reason. */
function parseQuestions(raw: unknown, allowedFormats: readonly DraftFormat[], allowed: ReadonlyMap<string, DraftSkill>, newId: (prefix: string) => string): { custom: CustomQuestion[]; dropped: string[] } {
  const custom: CustomQuestion[] = [];
  const dropped: string[] = [];
  const formats = new Set(allowedFormats);
  (Array.isArray(raw) ? (raw as Array<Record<string, unknown>>) : []).forEach((q, i) => {
    const n = `Question ${i + 1}`;
    const format = q?.format as DraftFormat;
    if (format === 'generated' || !formats.has(format)) return void dropped.push(`${n}: a format you did not ask for`);
    const prompt = repairLatex(text(q.prompt, 2000));
    // A choice named by its index ("Therefore, choice $2$ is correct.") means nothing to a student.
    const solution = repairLatex(text(q.solution, 3000))
      .replace(/\s*[^.!?]*\b(?:choice|option)\s*\$?\(?[0-9A-D]\)?\$?\s*(?:is|was)\s*(?:the\s*)?correct[^.!?]*[.!?]?/gi, '')
      .trim();
    if (!prompt) return void dropped.push(`${n}: no question`);
    const skillId = allowed.has(String(q.skillId)) ? String(q.skillId) : undefined;
    const base = { id: newId('q'), prompt, solution: solution || undefined, skillId, aiWritten: true as const };
    if (format === 'choice') {
      const choices = Array.isArray(q.choices) ? q.choices.map((c) => repairLatex(text(c, 400))) : [];
      const correct = Number(q.correct);
      if (choices.length < 2 || choices.length > 6 || choices.some((c) => !c) || new Set(choices).size !== choices.length) return void dropped.push(`${n}: its choices are incomplete or repeated`);
      if (!Number.isInteger(correct) || correct < 0 || correct >= choices.length) return void dropped.push(`${n}: no correct choice`);
      const withIds = choices.map((md) => ({ id: newId('c'), md }));
      custom.push({ ...base, kind: 'mc', choices: withIds, correct: withIds[correct].id, points: 1 });
    } else if (format === 'short') {
      const accepted = Array.isArray(q.accepted) ? q.accepted.map((a) => text(a, 80)).filter(Boolean).slice(0, 10) : [];
      const value = Number(q.value);
      if (q.value !== undefined && q.value !== null && q.value !== '') {
        if (!Number.isFinite(value)) return void dropped.push(`${n}: its answer is not a number`);
        const checked = checkValue(text(q.check, 200));
        if (checked === null) return void dropped.push(`${n}: no arithmetic check of its answer`);
        if (!same(checked, value)) return void dropped.push(`${n}: its answer (${value}) does not match its working (${checked})`);
        custom.push({ ...base, kind: 'numeric', value, tolerance: toleranceFor(value), points: 1 });
      } else if (accepted.length) custom.push({ ...base, kind: 'text', accepted, points: 1 });
      else dropped.push(`${n}: no answer`);
    } else {
      if (!solution) return void dropped.push(`${n}: no marking guide`);
      const points = Math.min(10, Math.max(1, Math.round(Number(q.points) || 4)));
      custom.push({ ...base, kind: 'manual', points });
    }
  });
  return { custom, dropped };
}

function finishDraft(o: Record<string, unknown>, sections: SkillSection[], custom: CustomQuestion[], dropped: string[], req: DraftRequest, ctx: DraftContext): { draft: AssignmentDraft; dropped: string[] } {
  let total = sections.reduce((t, s) => t + s.count, 0) + custom.length;
  const biggest = () => sections.filter((s) => s.count > 1).sort((a, b) => b.count - a.count)[0];
  for (let s = biggest(); total > req.count && s; s = biggest()) {
    s.count--;
    total--;
  }
  for (; total > req.count && custom.length; total--) custom.pop();
  for (; total > req.count && sections.length; total--) sections.pop();
  if (total < req.count && req.formats.includes('generated')) {
    const order = skillOrder(req, ctx);
    for (let k = 0; total < req.count && k < order.length * 6; k++) {
      const s = order[k % order.length];
      const sec = sections.find((x) => x.skillId === s.id);
      if (sec && sec.count >= 6) continue;
      if (sec) sec.count++;
      else sections.push({ skillId: s.id, count: 1, difficulty: difficultyOf(req.difficulty) });
      total++;
    }
  }
  if (!sections.length && !custom.length) throw new Error('The draft had no usable questions');

  return {
    draft: {
      title: text(o.title, 120) || draftTitle(req.type, ctx),
      instructions: repairLatex(text(o.instructions, 600)) || INSTRUCTIONS[req.type],
      sections,
      custom,
      rationale: text(o.rationale, 600),
    },
    dropped,
  };
}

function defaultId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// ---------------------------------------------------------------- a second, independent solution

/** The AI's own questions with one right answer, which a second solution can check: a number or a choice. */
const checkable = (q: CustomQuestion) => (q.kind === 'numeric' && q.value !== undefined) || (q.kind === 'mc' && !!q.choices?.length);

/**
 * The model solves its questions again from the beginning, without the answers it gave, so a slip
 * that its own working repeats (a tangent worked as a sine, say) shows up as a disagreement.
 */
export function answerCheckPrompt(questions: CustomQuestion[], ctx: Pick<DraftContext, 'subject' | 'courseTitle'>): { system: string; user: string } {
  return {
    system: `You check the answers to questions a ${subjectName(ctx.subject)} teacher will give their class. Solve each question yourself, from the beginning, as a careful student would: work it out step by step before you write the answer, and assume nothing about what the answer should be.
- A question with "choices": give "choice", the index (from 0) of the one correct choice.
- Any other question: give "value", the number that answers it, rounded only as the question asks, and "check", an arithmetic expression with only numbers, + - * / ^ and brackets that computes the unrounded answer, writing a square root as ^0.5, such as "24 / (30^2 - 24^2)^0.5".
Output ONLY one JSON object, no prose and no code fences: {"answers": [{"id": string, "choice"?: number, "value"?: number, "check"?: string}]}`,
    user: JSON.stringify({
      course: ctx.courseTitle,
      questions: questions.filter(checkable).map((q) => ({ id: q.id, question: q.prompt, ...(q.kind === 'mc' ? { choices: q.choices!.map((c) => c.md) } : {}) })),
    }),
  };
}

/** Whether a second solution agrees with the key: within the key's rounding, or 0.5% of it. */
function agrees(key: number, tolerance: number, v: number): boolean {
  if (Math.abs(v - key) <= Math.max(tolerance, 0.005 * Math.max(Math.abs(key), Math.abs(v)))) return true;
  const places = String(key).includes('.') ? String(key).split('.')[1].length : 0;
  return Math.abs(roundTo(v, places) - key) < 1e-9;
}

/**
 * The questions whose second solution agrees with their answer. A question the second solution
 * skipped stays (it cannot be judged); one it answered differently is left out, with the reason.
 */
export function applyAnswerChecks(questions: CustomQuestion[], raw: unknown): { questions: CustomQuestion[]; dropped: string[] } {
  const list = (raw as { answers?: unknown })?.answers;
  const answers = new Map((Array.isArray(list) ? (list as Array<Record<string, unknown>>) : []).filter((a) => a && typeof a.id === 'string').map((a) => [a.id as string, a] as const));
  const kept: CustomQuestion[] = [];
  const dropped: string[] = [];
  questions.forEach((q, i) => {
    const a = answers.get(q.id);
    if (!a || !checkable(q)) return void kept.push(q);
    const n = `Question ${i + 1}`;
    if (q.kind === 'mc') {
      const choice = Number(a.choice);
      if (!Number.isInteger(choice) || choice < 0 || choice >= q.choices!.length || q.choices![choice].id === q.correct) return void kept.push(q);
      return void dropped.push(`${n}: a second, independent solution chose a different answer`);
    }
    const seen = [checkValue(text(a.check, 200)), a.value === undefined || a.value === null || a.value === '' ? NaN : Number(a.value)].filter((v): v is number => v !== null && Number.isFinite(v));
    if (!seen.length || seen.some((v) => agrees(q.value!, q.tolerance ?? 0, v))) return void kept.push(q);
    dropped.push(`${n}: a second, independent solution got ${fmt(seen[0])}, not ${fmt(q.value!)}`);
  });
  return { questions: kept, dropped };
}

/** The second solution, from MiniMax; when it cannot be made, every question stays and is marked unchecked. */
async function checkAnswers(questions: CustomQuestion[], ctx: DraftContext, ai: MiniMaxConfig): Promise<{ questions: CustomQuestion[]; dropped: string[]; unchecked?: boolean }> {
  if (!questions.some(checkable)) return { questions, dropped: [] };
  try {
    const p = answerCheckPrompt(questions, ctx);
    const res = await minimaxChat({ ...ai, maxTokens: 8000, timeoutMs: 90_000, temperature: 0.1 }, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    return applyAnswerChecks(questions, extractJson(res.content));
  } catch {
    return { questions, dropped: [], unchecked: true };
  }
}

/** A draft for the teacher: MiniMax when configured, else (or on any failure) the offline draft. */
export async function draftAssignment(req: DraftRequest, ctx: DraftContext, ai?: MiniMaxConfig | null, newId?: (prefix: string) => string): Promise<DraftResult> {
  if (!ai?.apiKey) return { draft: offlineDraft(req, ctx), source: 'offline', model: null };
  try {
    const p = draftPrompt(req, ctx);
    const res = await minimaxChat({ ...ai, maxTokens: 12_000, timeoutMs: 120_000, temperature: 0.4 }, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    const raw = extractJson(res.content);
    const parts = parseDraftParts(raw, req, ctx, newId ?? defaultId);
    const checked = await checkAnswers(parts.custom, ctx, ai);
    // Questions left out by the second solution are replaced like any other: the draft is topped up.
    const dropped = [...parts.dropped, ...checked.dropped];
    const { draft } = finishDraft((raw ?? {}) as Record<string, unknown>, parts.sections, checked.questions, dropped, req, ctx);
    return { draft, source: 'minimax', model: res.model, ...(dropped.length ? { dropped } : {}), ...(checked.unchecked ? { unchecked: true } : {}) };
  } catch (e) {
    return { draft: offlineDraft(req, ctx), source: 'offline', model: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// ---------------------------------------------------------------- one question again

/** "Regenerate" on one question the AI writes: a new question in the same format, for the same skill. */
export interface RegenerateRequest {
  type: DraftType;
  format: WrittenFormat;
  /** The skill the question practises, if it has one. */
  skillId?: string;
  /** The lessons the new question may draw on: the skill's lesson, else the assignment's. */
  lessonIds: string[];
  /** The question being replaced, so the new one is different. */
  current: string;
  /** What the teacher wants changed, in their words. */
  notes: string;
  /** A written response keeps its points. */
  points?: number;
}

export interface RegenerateResult {
  question: CustomQuestion | null;
  source: 'minimax' | 'offline';
  model: string | null;
  /** Why there is no question, for the teacher. */
  problem?: string;
  /** What went wrong with MiniMax, for the server log. */
  error?: string;
}

/** The format the AI would write a teacher's question in, or null for one it does not write (select all). */
export function writtenFormatOf(q: Pick<CustomQuestion, 'kind'>): WrittenFormat | null {
  return q.kind === 'mc' ? 'choice' : q.kind === 'numeric' || q.kind === 'text' ? 'short' : q.kind === 'manual' ? 'written' : null;
}

/** Checks a regenerate request sent by a browser against the course; throws when it is unusable. */
export function normalizeRegenerateRequest(v: unknown, courseId: string): RegenerateRequest {
  const o = (v ?? {}) as Record<string, unknown>;
  const course = getCourse(courseId);
  if (!course) throw new Error('Unknown course.');
  const inCourse = new Set(course.lessons.map((l) => l.id));
  const format = (['choice', 'short', 'written'] as const).find((f) => f === o.format);
  if (!format) throw new Error('This kind of question cannot be regenerated.');
  const skill = typeof o.skillId === 'string' ? skillInfo(o.skillId) : undefined;
  const skillId = skill && inCourse.has(skill.lessonId) ? (o.skillId as string) : undefined;
  // A question that practises a skill draws on that skill's lesson only.
  const lessonIds = skillId
    ? [skill!.lessonId]
    : [...new Set(Array.isArray(o.lessonIds) ? o.lessonIds.filter((x): x is string => typeof x === 'string' && inCourse.has(x)) : [])].slice(0, MAX_LESSONS);
  if (!lessonIds.length) throw new Error('Link the question to a skill, or add a lesson’s skills to the assignment, so the AI knows what it covers.');
  const points = Math.round(Number(o.points));
  return {
    type: DRAFT_TYPES.includes(o.type as DraftType) ? (o.type as DraftType) : 'homework',
    format,
    skillId,
    lessonIds,
    current: text(o.current, 2000),
    notes: text(o.notes, 400),
    points: format === 'written' && Number.isFinite(points) ? Math.min(10, Math.max(1, points)) : undefined,
  };
}

export function regeneratePrompt(req: RegenerateRequest, ctx: DraftContext): { system: string; user: string } {
  return {
    system: `You help a ${subjectName(ctx.subject)} teacher replace one question in a ${TYPE_LABEL[req.type].toLowerCase()} they are writing. The teacher reviews your question before any student sees it.
Rules:
- Write exactly one new question in the format "${req.format}", for ${req.skillId ? `the skill with id "${req.skillId}"` : 'one skill from the list (give its id)'}. It must be clearly different from the question it replaces (a new context or new numbers, not the same question reworded), at about the same difficulty unless the teacher asks otherwise.
${FORMAT_RULES[req.format]}${req.format === 'written' && req.points ? ` It is worth ${req.points} points: award them in the solution.` : ''}
- Give a worked "solution" in Markdown with maths in $...$.
${ACCURACY_RULES}
- Follow the teacher's request where it fits these rules.
Output ONLY one JSON object, no prose and no code fences: {"question": ${QUESTION_JSON}}`,
    user: JSON.stringify({
      course: ctx.courseTitle,
      kind: TYPE_LABEL[req.type],
      replace: req.current || undefined,
      teacher: req.notes || undefined,
      lessons: ctx.lessons.map((l) => ({ lesson: `${l.number} ${l.title}`, skills: l.skills.filter((s) => !req.skillId || s.id === req.skillId).map((s) => ({ id: s.id, name: s.name, description: s.description })) })),
    }),
  };
}

/** The model's question, checked like a drafted one; throws with the reason when it fails the checks. */
export function parseRegenerated(raw: unknown, req: RegenerateRequest, ctx: DraftContext, newId: (prefix: string) => string = defaultId): CustomQuestion {
  const o = (raw ?? {}) as Record<string, unknown>;
  const q = (o.question ?? (Array.isArray(o.questions) ? o.questions[0] : o)) as Record<string, unknown>;
  const allowed = new Map(ctx.lessons.flatMap((l) => l.skills.map((s) => [s.id, s] as const)));
  const { custom, dropped } = parseQuestions([{ ...q, format: req.format }], [req.format], allowed, newId);
  const question = custom[0];
  if (!question) throw new Error(dropped[0]?.replace(/^Question 1: /, '') ?? 'no usable question');
  return { ...question, skillId: req.skillId ?? question.skillId, ...(req.format === 'written' && req.points ? { points: req.points } : {}) };
}

/** A new question for the teacher from MiniMax; without it there is no new question, and the teacher is told why. */
export async function regenerateQuestion(req: RegenerateRequest, ctx: DraftContext, ai?: MiniMaxConfig | null, newId?: (prefix: string) => string): Promise<RegenerateResult> {
  if (!ai?.apiKey) return { question: null, source: 'offline', model: null, problem: 'The AI is not available right now, so the question cannot be regenerated. Edit it yourself, or try again later.' };
  try {
    const p = regeneratePrompt(req, ctx);
    const res = await minimaxChat({ ...ai, maxTokens: 4000, timeoutMs: 90_000, temperature: 0.7 }, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    let question: CustomQuestion;
    try {
      question = parseRegenerated(extractJson(res.content), req, ctx, newId);
    } catch (e) {
      return { question: null, source: 'minimax', model: res.model, problem: `The AI’s new question did not pass the checks (${(e as Error).message}). Please try again.` };
    }
    const checked = await checkAnswers([question], ctx, ai);
    if (checked.dropped.length) return { question: null, source: 'minimax', model: res.model, problem: `The AI’s new question did not pass the checks (${checked.dropped[0].replace(/^Question 1: /, '')}). Please try again.` };
    return { question, source: 'minimax', model: res.model };
  } catch (e) {
    return { question: null, source: 'offline', model: null, problem: 'The AI could not write a new question just now. Please try again.', error: e instanceof Error ? e.message : String(e) };
  }
}
