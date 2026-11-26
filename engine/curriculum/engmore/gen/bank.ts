/**
 * Question banks for the More English Topics lessons that fill the US map's gaps: each question is
 * a prompt, the keyed answer, three wrong answers written as fully as the right one, and why.
 */
import { mc, part, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';

export interface Q {
  prompt: string;
  right: string;
  wrong: string[];
  why: string;
}

/** One multiple-choice question from a bank. */
export function ask(rng: Rng, bank: readonly Q[], hints: string[]): GenOutput {
  const x = rng.pick(bank as Q[]);
  return { prompt: x.prompt, parts: [part(mc(rng, x.right, x.wrong))], hints, solution: [`**${x.right}**`, x.why] };
}
