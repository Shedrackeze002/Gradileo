/**
 * Builds the list of items for an assignment attempt from its configuration and a seed,
 * and regenerates items from stored references (used by the server-side grader).
 */
import { Rng, mixSeed } from './rng.ts';
import { getSkill, skillInfo } from './curriculum/index.ts';
import type { AnswerSpec, Choice, Difficulty, Item, ItemRef } from './types.ts';
import { gradeItem, type ItemResult } from './grade.ts';
import { applyObservation, DEFAULT_BKT, emptySkillState, type SkillState } from './mastery.ts';

export type AssignmentType = 'lesson' | 'video' | 'reading' | 'practice' | 'classwork' | 'homework' | 'quiz' | 'exam';

export interface SkillSection {
  skillId: string;
  count: number;
  difficulty: Difficulty | 'mixed' | 'adaptive';
}

/** Teacher-authored question. */
export interface CustomQuestion {
  id: string;
  prompt: string;
  kind: 'mc' | 'multi' | 'numeric' | 'text' | 'manual';
  choices?: Choice[];
  correct?: string | string[];
  value?: number;
  tolerance?: number;
  accepted?: string[];
  points?: number;
  solution?: string;
  /** Optional skill tag so custom questions also update mastery. */
  skillId?: string;
  /** Written by the AI builder (engine/ai/builder.ts): the teacher should check it before publishing. */
  aiWritten?: boolean;
}

export interface AssignmentContent {
  sections: SkillSection[];
  custom: CustomQuestion[];
  /** Lesson to read (type 'lesson') or attached to the assignment. */
  lessonId?: string;
  /** External resource (video or reading). */
  resourceUrl?: string;
  /** Teacher-written reading text (Markdown). */
  readingText?: string;
  shuffle?: boolean;
  /** Practice mode: keep going until the student reaches this many correct in a row per skill. */
  masteryGoal?: number;
}

export interface AssignmentSettings {
  feedback: 'instant' | 'after_submit' | 'after_due';
  hints: boolean;
  timeLimitMinutes: number | null;
  attempts: number | null;
  showSolutions: boolean;
  /** For practice: allow "try a similar question" after a miss. */
  retrySimilar: boolean;
  calculator: boolean;
  /** Exam mode (quizzes and exams): full screen; leaving it or switching tabs is logged. */
  lockdown?: boolean;
  /** Exam mode: exits allowed before `onMaxExits` happens (null: no limit, exits are only logged). */
  maxExits?: number | null;
  /** Exam mode: lock the attempt until the teacher unlocks it, or submit it. */
  onMaxExits?: 'lock' | 'submit';
  /** Exam mode: the camera must be on. Nothing is recorded or saved. */
  camera?: boolean;
}

export const DEFAULT_SETTINGS: Record<AssignmentType, AssignmentSettings> = {
  lesson: { feedback: 'instant', hints: true, timeLimitMinutes: null, attempts: null, showSolutions: true, retrySimilar: true, calculator: true },
  video: { feedback: 'instant', hints: true, timeLimitMinutes: null, attempts: null, showSolutions: true, retrySimilar: true, calculator: true },
  reading: { feedback: 'instant', hints: true, timeLimitMinutes: null, attempts: null, showSolutions: true, retrySimilar: true, calculator: true },
  practice: { feedback: 'instant', hints: true, timeLimitMinutes: null, attempts: null, showSolutions: true, retrySimilar: true, calculator: true },
  classwork: { feedback: 'instant', hints: true, timeLimitMinutes: null, attempts: null, showSolutions: true, retrySimilar: true, calculator: true },
  homework: { feedback: 'instant', hints: true, timeLimitMinutes: null, attempts: 3, showSolutions: true, retrySimilar: true, calculator: true },
  quiz: { feedback: 'after_submit', hints: false, timeLimitMinutes: 30, attempts: 1, showSolutions: true, retrySimilar: false, calculator: true },
  exam: { feedback: 'after_due', hints: false, timeLimitMinutes: 75, attempts: 1, showSolutions: true, retrySimilar: false, calculator: true },
};

export const TYPE_LABEL: Record<AssignmentType, string> = {
  lesson: 'Lesson',
  video: 'Video',
  reading: 'Reading',
  practice: 'Practice',
  classwork: 'Classwork',
  homework: 'Homework',
  quiz: 'Quiz',
  exam: 'Exam',
};

export function isQuestionType(t: AssignmentType): boolean {
  return t !== 'lesson' && t !== 'video' && t !== 'reading';
}

/** The difficulty of a section's question at `index` (an easy-to-hard ramp for mixed sections). */
export function difficultyFor(section: SkillSection, index: number): Difficulty {
  if (section.difficulty === 'mixed' || section.difficulty === 'adaptive') {
    // Ramp: easy → medium → hard, then cycle medium/hard.
    if (section.count <= 1) return 2;
    const ramp: Difficulty[] = [1, 2, 3, 2, 3, 3];
    return ramp[Math.min(index, ramp.length - 1)];
  }
  return section.difficulty;
}

/** Item references for a fresh attempt. */
export function buildItemRefs(content: AssignmentContent, seed: number): ItemRef[] {
  const refs: ItemRef[] = [];
  const rng = new Rng(mixSeed('attempt', seed));
  for (const section of content.sections) {
    for (let i = 0; i < section.count; i++) {
      refs.push({ skillId: section.skillId, seed: rng.int(1, 2 ** 30), difficulty: difficultyFor(section, i) });
    }
  }
  content.custom.forEach((_, i) => refs.push({ custom: i }));
  return content.shuffle ? rng.shuffle(refs) : refs;
}

export function customToItem(q: CustomQuestion, index: number, assignmentId: string): Item {
  let answer: AnswerSpec;
  switch (q.kind) {
    case 'mc':
      answer = { kind: 'mc', choices: q.choices ?? [], correct: String(q.correct ?? '') };
      break;
    case 'multi':
      answer = { kind: 'multi', choices: q.choices ?? [], correct: Array.isArray(q.correct) ? q.correct : [] };
      break;
    case 'numeric':
      answer = { kind: 'numeric', value: q.value ?? 0, tolerance: q.tolerance ?? 1e-6, allowExpression: true };
      break;
    case 'text':
      answer = { kind: 'text', accepted: q.accepted ?? [] };
      break;
    default:
      answer = { kind: 'manual', maxPoints: q.points ?? 1 };
  }
  return {
    id: `custom:${assignmentId}:${index}`,
    skillId: q.skillId ?? 'custom',
    difficulty: 2,
    prompt: q.prompt,
    parts: [{ answer }],
    hints: [],
    solution: q.solution ? [q.solution] : [],
    points: q.points ?? 1,
  };
}

export function itemFromRef(ref: ItemRef, content: AssignmentContent, assignmentId: string): Item | null {
  if ('custom' in ref) {
    const q = content.custom[ref.custom];
    return q ? customToItem(q, ref.custom, assignmentId) : null;
  }
  const skill = getSkill(ref.skillId);
  if (!skill) return null;
  return skill.generate(ref.seed, ref.difficulty);
}

/** Pick the next adaptive practice item for a skill based on the student's current state. */
export function nextAdaptiveRef(skillId: string, state: SkillState | undefined, seed: number, recentCorrect: boolean[]): ItemRef {
  let difficulty: Difficulty = 1;
  const p = state?.pKnown ?? 0.1;
  if (p >= 0.7) difficulty = 3;
  else if (p >= 0.35) difficulty = 2;
  const last2 = recentCorrect.slice(-2);
  if (last2.length === 2 && last2.every(Boolean) && difficulty < 3) difficulty = (difficulty + 1) as Difficulty;
  if (last2.length >= 1 && last2[last2.length - 1] === false && difficulty > 1) difficulty = (difficulty - 1) as Difficulty;
  return { skillId, seed, difficulty };
}

export interface StoredResponse {
  answers: string[];
  hintsUsed: number;
  revealed?: boolean;
  timeMs?: number;
  at?: string;
  /** A written response's working on the answer canvas (encodeCanvas in ink.ts). */
  canvas?: string;
  /** Manual (teacher) score for 'manual' items, 0..1 */
  manualScore?: number | null;
  /** Teacher comment on this item. */
  comment?: string | null;
  /** The student checked this answer (instant-feedback mode); it is locked. */
  checked?: boolean;
  /** Earlier tries on this slot when the student asked for a similar question. */
  history?: Array<{ ref: ItemRef; answers: string[]; hintsUsed: number }>;
}

export interface GradedItem {
  ref: ItemRef;
  skillId: string;
  result: ItemResult;
  points: number;
  earned: number;
  assisted: boolean;
  manual: boolean;
}

export interface GradeSummary {
  items: GradedItem[];
  score: number;
  maxScore: number;
  percent: number;
  /** Manual items still waiting for a teacher. */
  pendingManual: number;
}

/**
 * Authoritative grading of a submission. Used by the browser in demo mode and by the
 * `grade-submission` edge function in production, so both always agree.
 */
export function gradeSubmission(
  refs: ItemRef[],
  responses: Record<number, StoredResponse>,
  content: AssignmentContent,
  assignmentId: string,
  opts: { hintPenalty?: boolean } = {},
): GradeSummary {
  const items: GradedItem[] = [];
  let score = 0;
  let maxScore = 0;
  let pendingManual = 0;
  refs.forEach((ref, i) => {
    const item = itemFromRef(ref, content, assignmentId);
    if (!item) return;
    const resp = responses[i] ?? { answers: [], hintsUsed: 0 };
    const points = item.points ?? 1;
    const manual = item.parts.some((p) => p.answer.kind === 'manual');
    let result: ItemResult;
    let earned = 0;
    if (manual) {
      const ms = resp.manualScore;
      if (ms === undefined || ms === null) pendingManual++;
      earned = (ms ?? 0) * points;
      result = { correct: (ms ?? 0) >= 0.999, score: ms ?? 0, parts: [{ correct: (ms ?? 0) >= 0.999 }] };
    } else {
      result = gradeItem(item, resp.answers ?? []);
      earned = result.score * points;
      if (opts.hintPenalty && (resp.hintsUsed > 0 || resp.revealed)) earned *= resp.revealed ? 0 : 0.75;
    }
    score += earned;
    maxScore += points;
    items.push({ ref, skillId: item.skillId, result, points, earned, assisted: resp.hintsUsed > 0 || !!resp.revealed, manual });
  });
  return { items, score, maxScore, percent: maxScore ? Math.round((score / maxScore) * 1000) / 10 : 0, pendingManual };
}

/** Apply graded items to mastery states (in answer order). */
export function applyToMastery(
  states: Map<string, SkillState>,
  graded: GradedItem[],
  sessionId: string,
  at: string,
): Map<string, SkillState> {
  const next = new Map(states);
  for (const g of graded) {
    const info = g.manual ? undefined : skillInfo(g.skillId);
    if (!info) continue;
    const params = DEFAULT_BKT[info.format];
    const prev = next.get(g.skillId) ?? emptySkillState(g.skillId, params);
    next.set(g.skillId, applyObservation(prev, { correct: g.result.correct, assisted: g.assisted, sessionId, at }, params));
  }
  return next;
}
