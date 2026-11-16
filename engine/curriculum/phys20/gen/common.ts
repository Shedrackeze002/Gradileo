/**
 * Helpers shared by the Grade 11 Physics generators: rounded answers, answers in scientific
 * notation, and the constants every question states for itself.
 */
import { fixedChoice, numPart, part } from '../../helpers.ts';
import { num } from '../../chemjr/bank.ts';
import type { Part } from '../../../types.ts';

/** Drops the rounding noise of a product or quotient of decimals. */
export const clean = (x: number) => Math.round(x * 1e6) / 1e6;
export const round = (x: number, dp: number) => Math.round(x * 10 ** dp) / 10 ** dp;
export const RAD = Math.PI / 180;
/** The acceleration due to gravity, and the gravitational field strength, at the Earth's surface. */
export const G = 9.81;
/** The universal gravitational constant, in N·m²/kg². */
export const BIG_G = 6.67e-11;
export const BIG_G_NOTE = 'Use $G = 6.67 \\times 10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$.';
export const SCI_TIP = 'Type scientific notation like `3.56e22` or `3.56*10^22`.';
/** "a" or "an" before a number: an 8 kg box, an 11 kg box, an 80 kg load. */
export const an = (n: number) => (String(n).startsWith('8') || n === 11 || n === 18 ? 'an' : 'a');
export const An = (n: number) => (an(n) === 'an' ? 'An' : 'A');
export const dpWords = (dp: number) => (dp === 1 ? '1 decimal place' : `${dp} decimal places`);

/**
 * A rounded answer. An answer within one in its last place is accepted, and so is one within half
 * of one percent, so a value carried from an earlier rounded step is not marked wrong.
 */
export const rounded = (value: number, dp: number, suffix: string, label?: string): Part => {
  const v = round(value, dp);
  return numPart(v, { decimals: dp, suffix, label, tolerance: Math.max(1.5 * 10 ** -dp, Math.abs(v) * 0.005) });
};

/** A number with its sign in brackets when it is negative, for a line of working. */
export const br = (x: number) => (x < 0 ? `(${num(x, 4)})` : num(x, 4));

/** A choice between two directions, the first of which is the positive one. */
export const direction = (options: [string, string], positive: boolean, label = 'Direction'): Part => part(fixedChoice(options, positive ? 0 : 1), { label });

/** The power of ten and the mantissa of a value written to `sf` significant figures. */
function parts(v: number, sf: number): { m: string; e: number } {
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = (v / 10 ** e).toFixed(sf - 1);
  // 9.996 rounds up to 10.00: move to the next power.
  if (Math.abs(Number(m)) >= 10) {
    e += 1;
    m = (v / 10 ** e).toFixed(sf - 1);
  }
  return { m, e };
}

/** A value in scientific notation, as LaTeX: 3.56 × 10²². */
export function sciTex(v: number, sf = 3): string {
  const { m, e } = parts(v, sf);
  return `${m} \\times 10^{${e}}`;
}

/**
 * An answer in scientific notation, to `sf` significant figures. One in the last figure either
 * way is accepted, and so is half of one percent.
 */
export function sciPart(v: number, sf: number, suffix: string, label?: string): Part {
  const { m, e } = parts(v, sf);
  const value = Number(`${m}e${e}`);
  return {
    suffix,
    label,
    answer: { kind: 'numeric', value, tolerance: Math.max(1.5 * 10 ** (e - sf + 1), Math.abs(value) * 0.005), allowExpression: true, scientific: true, exact: `${m}*10^${e}` },
  };
}
