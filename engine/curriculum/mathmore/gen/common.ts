/** Helpers shared by the More Mathematics Topics generators. */
import { fmt, fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import { numPart, retry } from '../../helpers.ts';
import type { Part } from '../../../types.ts';
import type { Rng } from '../../../rng.ts';

export const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
];

export const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
export const asc = (a: number[]) => [...a].sort((p, q) => p - q);
export const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A number inside maths, with thin-space groups from 5 digits up. */
export const N = (x: number) => fmtGroupTex(x);
/** A number after an operator: negatives in brackets. */
export const sp = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));
/** "+ 5" or "- 5". */
export const pm = (x: number) => (x < 0 ? `- ${fmt(-x)}` : `+ ${fmt(x)}`);
/** "= 12.5" when exact to 4 places, otherwise "\approx 12.457". */
export const eq = (v: number) => (Math.abs(roundTo(v, 4) - v) < 1e-9 ? `= ${fmt(v)}` : `\\approx ${fmt(v, 3)}`);

export function median(a: number[]): number {
  const s = asc(a);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2]! : (s[n / 2 - 1]! + s[n / 2]!) / 2;
}

/**
 * The five-number summary, with the quartiles as the medians of the lower and upper halves (the
 * median itself left out of both halves when the number of values is odd).
 */
export function fiveNumber(a: number[]): { min: number; q1: number; median: number; q3: number; max: number; lower: number[]; upper: number[] } {
  const s = asc(a);
  const n = s.length;
  const lower = s.slice(0, Math.floor(n / 2));
  const upper = s.slice(Math.ceil(n / 2));
  return { min: s[0]!, q1: median(lower), median: median(s), q3: median(upper), max: s[n - 1]!, lower, upper };
}

/** n whole values in [lo, hi] whose mean is a whole number. */
export function wholeMeanValues(rng: Rng, lo: number, hi: number, n: number): number[] {
  return retry(
    () => {
      const vs = Array.from({ length: n - 1 }, () => rng.int(lo, hi));
      const target = Math.round(sum(vs) / (n - 1)) + rng.int(-1, 1);
      vs.push(target * n - sum(vs));
      return rng.shuffle(vs);
    },
    (vs) => vs.every((v) => v >= lo && v <= hi),
    400,
  );
}

/** A list of values inside maths: $3,\ 5,\ 8$. */
export const listTex = (vs: number[]) => `$${vs.map((v) => fmt(v)).join(',\\ \\ ')}$`;
/** A sum inside maths, negatives in brackets. */
export const plus = (a: number[]) => a.map(sp).join(' + ');

// ---------------------------------------------------------------------------
// A level answers: exact when they can be, otherwise to 3 significant figures.
// ---------------------------------------------------------------------------

/** The decimal places that round v to `sf` significant figures (never fewer than 0). */
export const sfDecimals = (v: number, sf = 3) => (v === 0 ? 0 : Math.max(0, sf - 1 - Math.floor(Math.log10(Math.abs(v)) + 1e-12)));
/** Whether v needs no rounding at 3 significant figures (2.5, 9.8, 1250). */
export const isNice = (v: number) => Math.abs(roundTo(v, sfDecimals(v)) - v) < 1e-9;
/** v to 3 significant figures (or exactly, when it is nice). */
export const s3 = (v: number) => (isNice(v) ? fmt(v) : fmtFixed(v, sfDecimals(v)));
/** "= 2.5" when exact, otherwise "\approx 2.57". */
export const eq3 = (v: number) => (isNice(v) ? `= ${fmt(v)}` : `\\approx ${s3(v)}`);
/** A numeric answer: exact when it is nice, otherwise to 3 significant figures. */
export function sfPart(v: number, opts: { label?: string; suffix?: string } = {}): Part {
  return isNice(v) ? numPart(roundTo(v, sfDecimals(v)), { ...opts, exact: false, display: 'decimal' }) : numPart(v, { ...opts, decimals: sfDecimals(v) });
}
/** The sentence that tells students how to round. */
export const SF_TEXT = 'Give any answer that is not exact to 3 significant figures.';
