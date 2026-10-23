/**
 * How long an assignment takes, and the settings that suit it: "Suggest settings" in the assignment
 * builder. The working time adds up each question's time: a generated question by its difficulty,
 * or by how long this class has really taken on that skill when there is enough of a record; a
 * teacher's (or the AI's) own question by its kind and points. A quiz or exam gets a time limit with
 * room to spare; the other settings follow the kind of work.
 */
import { difficultyFor, type AssignmentContent, type AssignmentSettings, type AssignmentType, type CustomQuestion } from './assemble.ts';
import type { Difficulty, ItemRef } from './types.ts';

/** Minutes for a typical student on one generated question at each difficulty. */
const GENERATED_MINUTES: Record<Difficulty, number> = { 1: 1.5, 2: 2.5, 3: 4 };

/** Minutes for one of the teacher's own questions. */
export function customMinutes(q: Pick<CustomQuestion, 'kind' | 'points'>): number {
  switch (q.kind) {
    case 'mc':
    case 'text':
      return 1;
    case 'multi':
      return 1.5;
    case 'numeric':
      return 2;
    default:
      // A written response: reading and planning, then about a minute and a half for each point.
      return 2 + 1.5 * Math.max(1, q.points ?? 1);
  }
}

/** The time limits the builder offers, in minutes. */
export const TIME_LIMITS = [10, 15, 20, 30, 45, 60, 75, 90, 120] as const;

/** At least this many timed answers on a skill before the class's own pace is used. */
const MIN_PACE_SAMPLES = 5;

/**
 * The class's pace: the median minutes per question on each skill, from finished attempts.
 * Answers that took under 5 seconds or over 20 minutes (a student who walked away) are left out.
 */
export function classPace(submissions: ReadonlyArray<{ status: string; items: ItemRef[]; responses: Record<number, { timeMs?: number } | undefined> }>): Map<string, number> {
  const times = new Map<string, number[]>();
  for (const s of submissions) {
    if (s.status === 'in_progress') continue;
    s.items.forEach((ref, i) => {
      if (!('skillId' in ref)) return;
      const ms = s.responses[i]?.timeMs ?? 0;
      if (ms < 5_000 || ms > 20 * 60_000) return;
      const list = times.get(ref.skillId) ?? [];
      list.push(ms / 60_000);
      times.set(ref.skillId, list);
    });
  }
  const out = new Map<string, number>();
  for (const [skillId, list] of times) {
    if (list.length < MIN_PACE_SAMPLES) continue;
    const sorted = [...list].sort((a, b) => a - b);
    const mid = sorted.length >> 1;
    out.set(skillId, sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2);
  }
  return out;
}

/** Working time in minutes for a typical student, and whether the class's own pace was used. */
export function estimateWork(content: AssignmentContent, pace: ReadonlyMap<string, number> = new Map()): { minutes: number; fromClass: boolean } {
  let minutes = 0;
  let fromClass = false;
  for (const section of content.sections) {
    const own = pace.get(section.skillId);
    for (let i = 0; i < section.count; i++) {
      if (own !== undefined) {
        // The class's median, nudged for this question's difficulty.
        const d = difficultyFor(section, i);
        minutes += own * (d === 1 ? 0.8 : d === 3 ? 1.3 : 1);
        fromClass = true;
      } else minutes += GENERATED_MINUTES[difficultyFor(section, i)];
    }
  }
  for (const q of content.custom) minutes += customMinutes(q);
  return { minutes: Math.round(minutes), fromClass };
}

/** The shortest offered time limit that leaves half as long again as the working time. */
export function timeLimitFor(minutes: number): number {
  const want = minutes * 1.5;
  return TIME_LIMITS.find((t) => t >= want) ?? TIME_LIMITS[TIME_LIMITS.length - 1];
}

export interface SettingsAdvice {
  /** Working time for a typical student, in minutes. */
  minutes: number;
  /** The estimate used how long this class has taken on these skills before. */
  fromClass: boolean;
  /** The suggested settings (only those that differ from the current ones). */
  settings: Partial<AssignmentSettings>;
  /** The suggested shuffle, when it differs. */
  shuffle?: boolean;
  /** One line per suggestion, for the teacher. */
  reasons: string[];
}

const TIMED = new Set<AssignmentType>(['quiz', 'exam']);

/** Settings that suit the kind of work and its questions, compared with the current ones. */
export function adviseSettings(type: AssignmentType, content: AssignmentContent, current: AssignmentSettings, pace?: ReadonlyMap<string, number>): SettingsAdvice {
  const { minutes, fromClass } = estimateWork(content, pace);
  const timed = TIMED.has(type);
  const count = content.sections.reduce((t, s) => t + s.count, 0) + content.custom.length;
  const generated = content.sections.length > 0;
  const want: AssignmentSettings = {
    ...current,
    timeLimitMinutes: timed && count ? timeLimitFor(minutes) : null,
    attempts: timed ? 1 : type === 'homework' ? 3 : null,
    feedback: type === 'exam' ? 'after_due' : type === 'quiz' ? 'after_submit' : 'instant',
    hints: !timed,
    retrySimilar: !timed && generated,
    showSolutions: true,
  };
  const settings: Partial<AssignmentSettings> = {};
  const reasons: string[] = [];
  if (want.timeLimitMinutes !== current.timeLimitMinutes) {
    settings.timeLimitMinutes = want.timeLimitMinutes;
    reasons.push(want.timeLimitMinutes ? `Time limit ${want.timeLimitMinutes} min: half as long again as the working time, so slower students can finish and check.` : `No time limit: ${type === 'homework' ? 'homework' : 'this work'} goes best at each student’s own pace.`);
  }
  if (want.attempts !== current.attempts) {
    settings.attempts = want.attempts;
    reasons.push(want.attempts === 1 ? 'One attempt, so the result shows what each student can do.' : want.attempts ? `${want.attempts} attempts, so students can learn from their mistakes and try again.` : 'Unlimited attempts: it is practice.');
  }
  if (want.feedback !== current.feedback) {
    settings.feedback = want.feedback;
    reasons.push(want.feedback === 'instant' ? 'Instant feedback, so students fix mistakes while the question is fresh.' : want.feedback === 'after_submit' ? 'Feedback after they submit, so answers are not checked one by one during the quiz.' : 'Feedback after the due date, so no answers go round before everyone has sat the exam.');
  }
  if (want.hints !== current.hints) {
    settings.hints = want.hints;
    reasons.push(want.hints ? 'Hints on: they help students get unstuck, and hinted answers count as weaker evidence of mastery.' : 'Hints off: the result should show what students can do on their own.');
  }
  if (want.retrySimilar !== current.retrySimilar) {
    settings.retrySimilar = want.retrySimilar;
    reasons.push(want.retrySimilar ? '“Try a similar question” on, so a miss becomes another go with fresh numbers.' : timed ? '“Try a similar question” off: it is a test.' : '“Try a similar question” off: it needs generated questions.');
  }
  if (want.showSolutions !== current.showSolutions) {
    settings.showSolutions = true;
    reasons.push('Worked solutions on, shown when feedback is released.');
  }
  const advice: SettingsAdvice = { minutes, fromClass, settings, reasons };
  if (timed && count >= 3 && !content.shuffle) {
    advice.shuffle = true;
    reasons.push('Shuffle the questions, so students sitting side by side are not on the same question.');
  }
  return advice;
}
