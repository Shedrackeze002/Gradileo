/**
 * AI report cards: for one student, from their mastery and their work, how they are doing, their
 * strengths, next steps, tips for the student and for parents, and the teacher's feedback. The
 * teacher reviews and edits the card before it reaches the student or a parent.
 *
 * No name reaches MiniMax: the card is written with "{name}" where the student's name goes, and
 * Gradileo puts the first name in when it shows the card. Without MiniMax, or when its answer is
 * unusable, an offline card is written from the same data.
 */
import { minimaxChat, type MiniMaxConfig } from './minimax.ts';
import { extractJson } from './parse.ts';
import { subjectName } from './prompt.ts';
import type { StudentContext } from './types.ts';

/** The numbers on the card come from the data, never from the AI. */
export interface ReportStats {
  /** Points towards the whole course, 0 to 100. */
  coursePercent: number;
  /** Taught skills at proficient or mastered. */
  skillsSecure: number;
  /** Skills taught so far (or practised). */
  skillsTaught: number;
  /** Average best score on graded work, or null with none. */
  averageScore: number | null;
  /** Work handed in, of the work that was due. */
  workDone: number;
  workDue: number;
}

export interface ReportCardContent {
  /** What the card covers, in the teacher's words ("Term 1", "October"). */
  period: string;
  /** Two or three sentences: how the student is doing overall. */
  summary: string;
  strengths: string[];
  nextSteps: string[];
  /** To the student ("you"). */
  studentTips: string[];
  /** To a parent or carer at home. */
  parentTips: string[];
  /** The teacher's closing comment. */
  feedback: string;
  stats: ReportStats;
}

export interface ReportCardResult {
  content: ReportCardContent;
  source: 'minimax' | 'offline';
  model: string | null;
  error?: string;
}

/** The placeholder for the student's name in a card's text. */
export const NAME = '{name}';

/** A card's text with the student's first name in place of {name}. */
export function fillName(text: string, fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0] || 'The student';
  return text.replace(/\{name\}/g, first);
}

const SECURE = new Set(['proficient', 'mastered']);

export function reportStats(ctx: StudentContext): ReportStats {
  const practised = ctx.skills.filter((s) => s.attempts > 0 || ctx.taughtLessons.some((l) => l.id === s.lessonId));
  const scored = ctx.assignments.filter((a) => a.percent !== null && (a.status === 'submitted' || a.status === 'late'));
  const due = ctx.assignments.filter((a) => a.status !== 'upcoming' && a.status !== 'not_started');
  return {
    coursePercent: ctx.coursePercent,
    skillsSecure: practised.filter((s) => SECURE.has(s.level)).length,
    skillsTaught: practised.length,
    averageScore: scored.length ? Math.round(scored.reduce((t, a) => t + (a.percent ?? 0), 0) / scored.length) : null,
    workDone: due.filter((a) => a.status === 'submitted' || a.status === 'late').length,
    workDue: due.length,
  };
}

/** A skill's name inside a sentence: only its first letter lowered, so "SI" and names stay as they are. */
const inSentence = (name: string) => (/^[A-Z][a-z]/.test(name) ? name[0].toLowerCase() + name.slice(1) : name);

const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

/** A card from the data alone, for when the AI is not available. */
export function offlineReportCard(ctx: StudentContext, period: string): ReportCardContent {
  const stats = reportStats(ctx);
  const tried = ctx.skills.filter((s) => s.attempts > 0);
  const strong = [...tried].filter((s) => SECURE.has(s.level)).sort((a, b) => b.pKnown - a.pKnown).slice(0, 3);
  const weak = [...tried].filter((s) => !SECURE.has(s.level)).sort((a, b) => a.pKnown - b.pKnown).slice(0, 3);
  const missing = ctx.assignments.filter((a) => a.status === 'missing').length;
  const late = ctx.assignments.filter((a) => a.status === 'late').length;
  const trend = ctx.trend.last7Accuracy !== null && ctx.trend.prev7Accuracy !== null ? ctx.trend.last7Accuracy - ctx.trend.prev7Accuracy : null;

  const summary = [
    tried.length
      ? `${NAME} has worked on ${tried.length} skill${tried.length === 1 ? '' : 's'} in ${ctx.courseTitle} and is secure in ${stats.skillsSecure} of the ${stats.skillsTaught} taught so far.`
      : `${NAME} has not practised the skills in ${ctx.courseTitle} yet, so there is little to report so far.`,
    stats.averageScore !== null ? `The average score on graded work is ${stats.averageScore}%.` : '',
    stats.workDue ? `${stats.workDone} of ${stats.workDue} pieces of work due were handed in${late ? `, ${late} of them late` : ''}.` : '',
    trend !== null && Math.abs(trend) >= 10 ? (trend > 0 ? 'Accuracy has risen over the last two weeks.' : 'Accuracy has dipped over the last two weeks.') : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    period,
    summary,
    strengths: strong.length ? strong.map((s) => `Secure in ${inSentence(s.name)} (${s.correct} of ${s.attempts} correct).`) : tried.length ? ['Keeps practising, even when a skill is still new.'] : [],
    nextSteps: [
      ...weak.map((s) => `Practise ${inSentence(s.name)} until it feels easy.`),
      missing ? `Hand in the ${missing} missing piece${missing === 1 ? '' : 's'} of work.` : '',
      (ctx.trend.hintRate ?? 0) >= 40 ? 'Try each question before opening a hint.' : '',
    ].filter(Boolean),
    studentTips: [
      weak.length ? `Spend ten minutes a day on ${list(weak.slice(0, 2).map((s) => inSentence(s.name)))}.` : 'Keep up regular practice, a little every day.',
      'When you get a question wrong, read the worked solution and try a similar one.',
    ],
    parentTips: [
      'Ask {name} to explain one thing they learned this week, in their own words.',
      missing ? 'Check together that work is handed in by its due date.' : 'Celebrate the steady effort, and keep a regular time for homework.',
    ],
    feedback: tried.length ? `${NAME}, keep going: steady practice is what makes a skill stick.` : `${NAME}, I look forward to seeing your work.`,
    stats,
  };
}

/** The prompt, with no name: the AI writes {name} where the student's name goes. */
export function reportCardPrompt(ctx: StudentContext, period: string, notes: string): { system: string; user: string } {
  const stats = reportStats(ctx);
  return {
    system: `You help a teacher write a student's report card from their data in Gradileo. The teacher reviews and edits it before the student or a parent sees it.
Rules:
- Never use or invent a name. Write {name} wherever the student's name goes (for example "{name} has made steady progress"). Address the student as "you" only in "studentTips".
- Be honest, specific and kind. Every claim must come from the data: name real skills, scores and habits. Do not invent events, behaviour or effort the data does not show.
- "summary": two or three sentences on how {name} is doing overall.
- "strengths": two to four short points. "nextSteps": two to four short, concrete points (name the skills).
- "studentTips": two or three tips to the student, starting with a verb. "parentTips": two or three practical ways a parent or carer can help at home, without needing to know the ${subjectName(ctx.subject)}.
- "feedback": two or three warm sentences in the teacher's voice, ending with encouragement.
- Plain language a parent understands; no jargon such as "pKnown" or "BKT". Write maths in plain words or $...$.
- Follow the teacher's notes where they fit these rules.
Output ONLY one JSON object, no prose and no code fences: {"summary": string, "strengths": [string], "nextSteps": [string], "studentTips": [string], "parentTips": [string], "feedback": string}`,
    user: JSON.stringify({
      course: ctx.courseTitle,
      period: period || undefined,
      teacherNotes: notes || undefined,
      numbers: stats,
      skills: ctx.skills.filter((s) => s.attempts > 0).map((s) => ({ skill: s.name, level: s.level.replace('_', ' '), correct: s.correct, attempts: s.attempts })),
      notYetPractised: ctx.skills.filter((s) => s.attempts === 0).map((s) => s.name).slice(0, 15),
      work: ctx.assignments.map((a) => ({ title: a.title, kind: a.type, status: a.status, score: a.percent === null ? undefined : Math.round(a.percent) })),
      recentMistakes: ctx.recentErrors.slice(0, 6).map((e) => ({ question: e.prompt, answered: e.studentAnswer, expected: e.correctAnswer })),
      lastTwoWeeks: { accuracyThisWeek: ctx.trend.last7Accuracy, accuracyWeekBefore: ctx.trend.prev7Accuracy, hintUse: ctx.trend.hintRate, questionsThisWeek: ctx.trend.questionsLast7 },
    }),
  };
}

const text = (v: unknown, max: number): string => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const items = (v: unknown, max: number): string[] => (Array.isArray(v) ? v.map((x) => text(x, 300)).filter(Boolean).slice(0, max) : []);

/** The model's card, checked; the numbers stay those from the data. Throws when it is unusable. */
export function parseReportCard(raw: unknown, base: ReportCardContent): ReportCardContent {
  const o = (raw ?? {}) as Record<string, unknown>;
  const summary = text(o.summary, 900);
  const strengths = items(o.strengths, 5);
  const nextSteps = items(o.nextSteps, 5);
  if (!summary || !strengths.length || !nextSteps.length) throw new Error('The report card was incomplete');
  return {
    period: base.period,
    summary,
    strengths,
    nextSteps,
    studentTips: items(o.studentTips, 4).length ? items(o.studentTips, 4) : base.studentTips,
    parentTips: items(o.parentTips, 4).length ? items(o.parentTips, 4) : base.parentTips,
    feedback: text(o.feedback, 900) || base.feedback,
    stats: base.stats,
  };
}

/** A teacher's edited card from a browser, kept to the card's shape and limits; the numbers are kept. */
export function cleanReportCard(v: unknown, stats: ReportStats): ReportCardContent {
  const o = (v ?? {}) as Record<string, unknown>;
  return {
    period: text(o.period, 80),
    summary: text(o.summary, 1500),
    strengths: items(o.strengths, 8),
    nextSteps: items(o.nextSteps, 8),
    studentTips: items(o.studentTips, 8),
    parentTips: items(o.parentTips, 8),
    feedback: text(o.feedback, 1500),
    stats,
  };
}

/** A report card for the teacher to review: MiniMax when it is set up, else the offline card. */
export async function writeReportCard(ctx: StudentContext, opts: { period: string; notes?: string }, ai?: MiniMaxConfig | null): Promise<ReportCardResult> {
  const period = text(opts.period, 80);
  const base = offlineReportCard(ctx, period);
  if (!ai?.apiKey) return { content: base, source: 'offline', model: null };
  try {
    // Data minimisation: the model never sees the student's name.
    const p = reportCardPrompt({ ...ctx, student: { id: '', name: '' } }, period, text(opts.notes, 500));
    const res = await minimaxChat({ ...ai, maxTokens: 4000, timeoutMs: 90_000, temperature: 0.4 }, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    return { content: parseReportCard(extractJson(res.content), base), source: 'minimax', model: res.model };
  } catch (e) {
    return { content: base, source: 'offline', model: null, error: e instanceof Error ? e.message : String(e) };
  }
}
