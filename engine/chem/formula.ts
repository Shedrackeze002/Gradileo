/**
 * Chemical formulas: what a formula is made of (atoms of each element and the charge), read from
 * the way a question writes it (`Fe2(SO4)3`, `SO4^2-`, `CuSO4.5H2O`) and from what a student
 * types, which can be ambiguous (`SO42-` is SO₄²⁻, `Fe3+` is Fe³⁺, `NH4+` is NH₄⁺). Also molar
 * masses, mhchem markup for showing a formula, and the coefficients that balance an equation.
 */
import { element } from './elements.ts';

export interface Formula {
  /** Atoms of each element, by symbol. */
  atoms: Map<string, number>;
  charge: number;
}

export class FormulaError extends Error {}

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/** Typed formula text in plain characters: subscript digits, superscript charges, dots and states. */
function normalise(text: string): string {
  let s = text.trim();
  s = s.replace(/[₀-₉]/g, (c) => String(SUB.indexOf(c)));
  // A run of superscripts is a charge: ²⁻ → ^2-.
  s = s.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]*)([⁺⁻])/g, (_, d: string, sign: string) => `^${[...d].map((c) => SUP.indexOf(c)).join('')}${sign === '⁺' ? '+' : '-'}`);
  s = s.replace(/[−–]/g, '-').replace(/[·•∙⋅×]/g, '.').replace(/\*/g, '.');
  // A state written after the formula, (aq), (s), (l) or (g), is not part of it.
  s = s.replace(/\s*\((aq|s|l|g)\)\s*$/i, '');
  return s.replace(/\{|\}/g, '');
}

/** Adds the atoms of `b`, times `k`, into `a`. */
function add(a: Map<string, number>, b: Map<string, number>, k: number) {
  for (const [el, n] of b) a.set(el, (a.get(el) ?? 0) + n * k);
}

/** The atoms in a formula without a charge: groups in brackets, counts, and hydrate dots. */
function parseBody(body: string): Map<string, number> {
  const s = body.replace(/\s+/g, '');
  if (!s) throw new FormulaError('Enter a formula.');
  const total = new Map<string, number>();
  for (const piece of s.split('.')) {
    if (!piece) throw new FormulaError('Something is missing around the dot.');
    const lead = /^\d+/.exec(piece);
    const k = lead ? Number(lead[0]) : 1;
    let i = lead ? lead[0].length : 0;
    const readGroup = (close: string | null): Map<string, number> => {
      const atoms = new Map<string, number>();
      while (i < piece.length) {
        const c = piece[i];
        if (c === ')' || c === ']') {
          if (c !== close) throw new FormulaError('The brackets do not match.');
          i++;
          return atoms;
        }
        let inner: Map<string, number>;
        if (c === '(' || c === '[') {
          i++;
          inner = readGroup(c === '(' ? ')' : ']');
        } else if (/[A-Z]/.test(c)) {
          const sym = /^[A-Z][a-z]?/.exec(piece.slice(i))![0];
          if (!element(sym)) throw new FormulaError(`There is no element ${sym}.`);
          i += sym.length;
          inner = new Map([[sym, 1]]);
        } else if (/[a-z]/.test(c)) {
          throw new FormulaError('Element symbols start with a capital letter, such as Na or Cl.');
        } else {
          throw new FormulaError(`“${c}” cannot be read in a formula.`);
        }
        const count = /^\d+/.exec(piece.slice(i));
        if (count) {
          if (count[0].startsWith('0')) throw new FormulaError('A count cannot start with 0.');
          i += count[0].length;
        }
        add(atoms, inner, count ? Number(count[0]) : 1);
      }
      if (close) throw new FormulaError('A bracket is not closed.');
      return atoms;
    };
    const atoms = readGroup(null);
    if (!atoms.size) throw new FormulaError('Enter a formula.');
    add(total, atoms, k);
  }
  return total;
}

const chargeOf = (digits: string, sign: string) => (sign === '+' ? 1 : -1) * (digits ? Number(digits) : 1);

/**
 * A formula as a question writes it: the charge after a caret (`SO4^2-`, `Fe^3+`) or a sign alone
 * (`NH4+`, `Cl-`). Throws a FormulaError when it cannot be read.
 */
export function parseFormula(text: string): Formula {
  const s = normalise(text);
  const caret = /^(.*?)\^([+-]?)(\d*)([+-]?)$/.exec(s);
  if (caret) {
    const sign = caret[2] || caret[4];
    if (!sign || (caret[2] && caret[4])) throw new FormulaError('Write a charge with its sign, such as SO4^2- or Fe^3+.');
    return { atoms: parseBody(caret[1]), charge: chargeOf(caret[3], sign) };
  }
  const signs = /^(.*?)([+-]+)$/.exec(s);
  if (signs) {
    if (new Set(signs[2]).size > 1) throw new FormulaError('Write a charge with one sign.');
    return { atoms: parseBody(signs[1]), charge: (signs[2][0] === '+' ? 1 : -1) * signs[2].length };
  }
  return { atoms: parseBody(s), charge: 0 };
}

/**
 * Every way a student's formula can be read. A charge written with a caret, after a space or as
 * superscripts is clear; digits just before a final sign can be a count or the charge (`SO42-`,
 * `Fe3+`, `NH4+`), so each split is a reading. Throws when no reading works.
 */
export function readFormula(input: string): Formula[] {
  const s = normalise(input);
  if (/\^/.test(s)) return [parseFormula(s)];
  const spaced = /^(.*\S)\s+(\d*)([+-])$/.exec(s);
  if (spaced) return [{ atoms: parseBody(spaced[1]), charge: chargeOf(spaced[2], spaced[3]) }];
  const tail = /^(.*?)(\d*)([+-])$/.exec(s);
  if (!tail) return [parseFormula(s)];
  const [, head, digits, sign] = tail;
  const out: Formula[] = [];
  let error: unknown;
  // Digits split between the last count and the charge: none, the last one, the last two...
  for (let k = 0; k <= digits.length; k++) {
    const count = digits.slice(0, digits.length - k);
    const charge = digits.slice(digits.length - k);
    if (charge.startsWith('0')) continue;
    try {
      out.push({ atoms: parseBody(head + count), charge: chargeOf(charge, sign) });
    } catch (e) {
      error ??= e;
    }
  }
  if (!out.length) throw error instanceof FormulaError ? error : new FormulaError('That formula cannot be read.');
  return out;
}

export function sameFormula(a: Formula, b: Formula): boolean {
  if (a.charge !== b.charge || a.atoms.size !== b.atoms.size) return false;
  for (const [el, n] of a.atoms) if (b.atoms.get(el) !== n) return false;
  return true;
}

/** Molar mass in g/mol from the elements' masses, to two decimal places. */
export function molarMass(text: string): number {
  let m = 0;
  for (const [el, n] of parseFormula(text).atoms) m += element(el)!.mass * n;
  return Math.round(m * 100) / 100;
}

/** mhchem markup for a formula as a question writes it: `\ce{Fe2(SO4)3}`, `\ce{CuSO4*5H2O}`. */
export function ce(text: string): string {
  return `\\ce{${text.replace(/\./g, '*')}}`;
}

// ---------------------------------------------------------------------------- balancing

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

/**
 * The smallest whole-number coefficients that balance an equation, atoms and charge, reactants
 * first; null when no single set of positive coefficients balances it.
 */
export function balance(reactants: string[], products: string[]): number[] | null {
  const species = [...reactants, ...products].map(parseFormula);
  const sides = species.map((_, j) => (j < reactants.length ? 1 : -1));
  const elements = [...new Set(species.flatMap((f) => [...f.atoms.keys()]))];
  const rows = [...elements.map((el) => species.map((f, j) => (f.atoms.get(el) ?? 0) * sides[j])), species.map((f, j) => f.charge * sides[j])];
  // Fraction-free row reduction, then the one free coefficient decides the rest.
  const m = rows.map((r) => r.slice());
  const n = species.length;
  const pivots: number[] = [];
  let r = 0;
  for (let c = 0; c < n && r < m.length; c++) {
    const p = m.findIndex((row, i) => i >= r && row[c] !== 0);
    if (p < 0) continue;
    [m[r], m[p]] = [m[p], m[r]];
    for (let i = 0; i < m.length; i++) {
      if (i === r || m[i][c] === 0) continue;
      const a = m[r][c];
      const b = m[i][c];
      m[i] = m[i].map((v, k) => v * a - m[r][k] * b);
      const g = m[i].reduce((x, v) => gcd(x, v), 0) || 1;
      m[i] = m[i].map((v) => v / g);
    }
    pivots.push(c);
    r++;
  }
  const free = [...Array(n).keys()].filter((c) => !pivots.includes(c));
  if (free.length !== 1) return null;
  const f = free[0];
  // Each pivot coefficient x_c = -m[row][f] * t / m[row][c]; pick t to make them all whole.
  let t = 1;
  pivots.forEach((c, i) => {
    t = (t * Math.abs(m[i][c])) / gcd(t, Math.abs(m[i][c]));
  });
  const x = Array<number>(n).fill(0);
  x[f] = t;
  pivots.forEach((c, i) => {
    x[c] = (-m[i][f] * t) / m[i][c];
  });
  const sign = x[f] < 0 ? -1 : 1;
  const g = x.reduce((a, v) => gcd(a, v), 0);
  const out = x.map((v) => (v * sign) / g);
  return out.every((v) => Number.isInteger(v) && v > 0) ? out : null;
}

/** Whether coefficients balance an equation's atoms and charge. */
export function isBalanced(reactants: string[], products: string[], coefficients: number[]): boolean {
  const species = [...reactants, ...products].map(parseFormula);
  const atoms = new Map<string, number>();
  let charge = 0;
  species.forEach((f, j) => {
    const k = coefficients[j] * (j < reactants.length ? 1 : -1);
    add(atoms, f.atoms, k);
    charge += f.charge * k;
  });
  return charge === 0 && [...atoms.values()].every((v) => v === 0);
}
