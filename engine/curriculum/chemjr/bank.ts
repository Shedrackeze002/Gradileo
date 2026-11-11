/**
 * Question banks for the junior chemistry courses (Chemistry 7, 8 and 9). Most junior questions
 * are concept questions, so a skill is written as three banks, one per difficulty, of hand-written
 * items; a bank can also be a function, for questions built from numbers. Choices are shuffled
 * (or kept in a fixed order for category questions such as "Physical / Chemical"), so the same
 * item reads differently from one attempt to the next.
 */
import { fixedChoice, mc, multi, part, type Gen, type GenOutput } from '../helpers.ts';
import type { Rng } from '../../rng.ts';
import type { Difficulty } from '../../types.ts';

/** One multiple-choice question: the answer, the wrong choices and why the answer is right. */
export interface Q {
  q: string;
  a: string;
  w: string[];
  why: string;
  /** Show these choices in this order (the answer must be one of them), instead of a, w shuffled. */
  order?: string[];
}

/** A select-all question: every option is marked true or false. */
export interface Select {
  q: string;
  opts: Array<[string, boolean]>;
  why: string;
}

export type Level = Array<Q | Select> | ((rng: Rng) => GenOutput);

/** Category choices shared by many items (kept in this order). */
export const CHOICES = {
  physChem: ['Physical change', 'Chemical change'],
  pureMix: ['Pure substance', 'Mixture'],
  yesNo: ['Yes', 'No'],
  trueFalse: ['True', 'False'],
  state: ['Solid', 'Liquid', 'Gas'],
} as const;

function isSelect(x: Q | Select): x is Select {
  return 'opts' in x;
}

function fromItem(rng: Rng, item: Q | Select, hints: string[]): GenOutput {
  if (isSelect(item)) {
    const opts = rng.shuffle(item.opts).slice(0, Math.min(6, item.opts.length));
    // Keep at least one true and one false option.
    if (!opts.some((o) => o[1])) opts[0] = item.opts.find((o) => o[1])!;
    if (!opts.some((o) => !o[1])) opts[opts.length - 1] = item.opts.find((o) => !o[1])!;
    return {
      prompt: `${item.q} Select every correct answer.`,
      parts: [part(multi(rng, opts.map(([md, correct]) => ({ md, correct }))))],
      hints,
      solution: [item.why, ...opts.map(([md, ok]) => `${ok ? 'Yes' : 'No'}: ${md}`)],
    };
  }
  const answer = item.order
    ? fixedChoice(item.order, item.order.indexOf(item.a))
    : mc(rng, item.a, rng.sample(item.w, Math.min(3, item.w.length)));
  return {
    prompt: item.q,
    parts: [part(answer)],
    hints,
    solution: [item.why, `Answer: ${item.a}`],
  };
}

/**
 * A skill's generator from three banks (easy, medium, hard) and the hints shown with every item
 * (or one hint list per difficulty).
 */
export function bank(levels: [Level, Level, Level], hints: string[] | [string[], string[], string[]]): Gen {
  for (const level of levels) {
    if (typeof level === 'function') continue;
    for (const item of level) {
      if (!isSelect(item) && item.order && !item.order.includes(item.a)) throw new Error(`"${item.a}" is not one of the choices of: ${item.q}`);
    }
  }
  return (rng: Rng, d: Difficulty): GenOutput => {
    const level = levels[d - 1];
    const h = (Array.isArray(hints[0]) ? (hints as string[][])[d - 1] : (hints as string[])) as string[];
    if (typeof level === 'function') return level(rng);
    return fromItem(rng, rng.pick(level), h);
  };
}

/** Pick one of several question makers (for a difficulty that mixes number and concept questions). */
export function either(...makers: Array<(rng: Rng) => GenOutput>): (rng: Rng) => GenOutput {
  return (rng) => rng.pick(makers)(rng);
}

/** An item from a bank, as a maker for `either`. */
export function fromBank(items: Array<Q | Select>, hints: string[]): (rng: Rng) => GenOutput {
  return (rng) => fromItem(rng, rng.pick(items), hints);
}

/** First names for the people in questions, from many countries. */
export const NAMES = ['Amara', 'Kenji', 'Priya', 'Mateo', 'Fatima', 'Liam', 'Wei', 'Chidi', 'Sofia', 'Arjun', 'Aisha', 'Tomás', 'Yuki', 'Kwame', 'Leila', 'Noah', 'Mei', 'Ines', 'Ravi', 'Zainab', 'Oliver', 'Hana', 'Diego', 'Nia'];

/** A quantity with a unit, as maths: q(25, 'g') → $25\ \text{g}$. */
export const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;

/** A number with at most `dp` decimal places and no trailing zeros. */
export function num(v: number, dp = 2): string {
  const r = Math.round(v * 10 ** dp) / 10 ** dp;
  return String(r);
}

/** "a, b and c". */
export function andList(items: string[]): string {
  return items.length < 2 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}
