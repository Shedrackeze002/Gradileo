/** Shared pieces for the More Chemistry Topics generators. */
import { ce, parseFormula } from '../../../chem/formula.ts';
import type { Rng } from '../../../rng.ts';
import { mc, part, type GenOutput } from '../../helpers.ts';

export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a, b and c" */
export const andList = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** A formula in maths: $\ce{H2SO4}$. */
export const $ = (f: string) => `$${ce(f)}$`;
/** An equation in maths, written in mhchem as it stands: $\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$. */
export const eq = (text: string) => `$\\ce{${text}}$`;
/** A quantity with its unit, in maths: $2.50\ \text{g}$. */
export const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
export const degC = (v: string | number) => `$${v}^\\circ\\text{C}$`;
export const coef = (k: number) => (k === 1 ? '' : `${k}`);

/** Letters that name an unknown substance without being an element's symbol. */
const LETTERS = ['A', 'D', 'E', 'G', 'J', 'L', 'M', 'Q', 'R', 'T', 'X', 'Z'];
/** `n` letters for unknown substances, in alphabetical order. */
export const letters = (rng: Rng, n: number) => rng.sample(LETTERS, n).sort();

/**
 * Relative atomic masses as these questions state them (whole numbers, with 35.5 for chlorine and
 * 63.5 for copper, as school data sheets print them).
 */
export const AR: Record<string, number> = {
  H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40, Ti: 48, Cr: 52, Mn: 55, Fe: 56, Cu: 63.5, Zn: 65, Br: 80, Sn: 119, W: 184, Pb: 207,
};
export const ELEMENT_NAME: Record<string, string> = {
  H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', Na: 'sodium', Mg: 'magnesium', Al: 'aluminium', Si: 'silicon', P: 'phosphorus', S: 'sulfur', Cl: 'chlorine', K: 'potassium', Ca: 'calcium', Ti: 'titanium', Cr: 'chromium', Mn: 'manganese', Fe: 'iron', Cu: 'copper', Zn: 'zinc', Br: 'bromine', Sn: 'tin', W: 'tungsten', Pb: 'lead',
};
/** The atoms of a formula, in the order it writes them: Fe2O3 → [['Fe', 2], ['O', 3]]. */
export const atomsOf = (f: string): Array<[string, number]> => [...parseFormula(f).atoms.entries()];
/** Relative formula mass from the masses these questions state. */
export function mr(f: string): number {
  let m = 0;
  for (const [el, n] of atomsOf(f)) {
    if (AR[el] === undefined) throw new Error(`No relative atomic mass for ${el}`);
    m += AR[el] * n;
  }
  return Math.round(m * 10) / 10;
}
/** "Relative atomic masses: Fe = 56, O = 16." for the elements of these formulas. */
export function arText(...formulas: string[]): string {
  const els = [...new Set(formulas.flatMap((f) => atomsOf(f).map(([el]) => el)))];
  return `Relative atomic masses: ${els.map((el) => `${el} = ${AR[el]}`).join(', ')}.`;
}
/** "(2 × 56) + (3 × 16) = 160", for use inside maths. */
export function mrWorking(f: string): string {
  const atoms = atomsOf(f);
  if (atoms.length === 1 && atoms[0][1] === 1) return `${mr(f)}`;
  return `${atoms.map(([el, n]) => (n === 1 ? `${AR[el]}` : `(${n} \\times ${AR[el]})`)).join(' + ')} = ${mr(f)}`;
}

/** A question from a bank: what is asked, the right answer, three wrong ones, and why. */
export interface BankItem {
  ask: string;
  right: string;
  wrong: string[];
  sol: string;
}
/** One question picked from a bank, as a multiple-choice item. */
export function fromBank(rng: Rng, items: BankItem[], hints: string[]): GenOutput {
  const item = rng.pick(items);
  return { prompt: item.ask, parts: [part(mc(rng, item.right, item.wrong))], hints, solution: [item.sol] };
}
