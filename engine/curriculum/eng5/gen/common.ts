/**
 * Shared helpers for Grade 5 English (and the other younger English courses). The people, quotes
 * and lists come from Grade 10 English; `bank` turns a list of written questions into a generator.
 */
import { mc, part, type Gen, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty } from '../../../types.ts';
import { block, cap, fill, people, type Person } from '../../eng10/gen/common.ts';
import { verseMd } from '../../eng10/gen/poems.ts';

export { an, block, cap, dq, fill, list, lowerFirst, order, pair, people, person, q, type Person } from '../../eng10/gen/common.ts';

/** A blank in a sentence. */
export const GAP = '\\_\\_\\_\\_\\_';

/** One written question: a passage (optional), what is asked, the right answer, wrong answers and why. */
export interface Q {
  d: Difficulty;
  /** A passage shown as a quotation block above the question. NAME, NAME2 and {he}… are filled. */
  text?: string;
  /** Where the passage comes from, shown under it ("Aesop, “The Fox and the Grapes”"). */
  source?: string;
  ask: string;
  right: string;
  wrong: string[];
  /** Why the right answer is right (and, where it helps, why a tempting one is wrong). */
  why: string;
}

/** A passage as a quotation block that keeps its line breaks (for verse) and its blank lines (stanzas). */
export const quote = (text: string) => block(verseMd(text.split('\n')));

/** Fills names and pronouns in every field of a question. */
function cast(item: Q, who: Person[]): Q {
  const f = (s: string) => fill(s, who);
  return { ...item, text: item.text && f(item.text), ask: f(item.ask), right: f(item.right), wrong: item.wrong.map(f), why: f(item.why) };
}

/** The questions of a difficulty, or of the nearest difficulty that has some. */
export function atLevel<T extends { d: Difficulty }>(items: readonly T[], d: Difficulty): T[] {
  for (const k of [d, d - 1, d + 1, d - 2, d + 2]) {
    const at = items.filter((x) => x.d === k);
    if (at.length) return at;
  }
  return [...items];
}

/** A question as multiple choice, with the passage quoted above it. */
export function askQ(rng: Rng, item: Q, hints: string[]): GenOutput {
  const who = people(rng, 3);
  const x = cast(item, who);
  const passage = x.text ? `${quote(x.text)}${x.source ? `\n>\n> — ${x.source}` : ''}\n\n` : '';
  return {
    prompt: `${passage}${x.ask}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints,
    solution: [x.why, `The answer is: ${x.right.replace(/\.$/, '')}.`],
  };
}

/** A generator that asks one of the written questions of the difficulty. */
export function bank(items: readonly Q[], hints: string[] | ((item: Q) => string[])): Gen {
  return (rng, d) => {
    const item = rng.pick(atLevel(items, d));
    return askQ(rng, item, typeof hints === 'function' ? hints(item) : hints);
  };
}

/** Shorthand for a written question. */
export const Q = (d: Difficulty, ask: string, right: string, wrong: string[], why: string, text?: string, source?: string): Q => ({ d, ask, right, wrong, why, text, source });

/** A sentence's first letter capitalized, with a full stop if it has no end mark. */
export const sentence = (s: string) => cap(/[.!?”]$/.test(s) ? s : `${s}.`);
