/**
 * Grade 12 Chemistry, Unit 4: tools shared by the equilibrium and acid–base generators. Number
 * formats (significant figures and scientific notation), reactions written as mhchem text with
 * states, equilibrium law expressions, a table of acids with their Ka values, and a titration
 * curve calculator that solves the charge balance for the pH.
 */
import { numPart } from '../../helpers.ts';
import { ce, isBalanced } from '../../../chem/formula.ts';
import type { Part, PlaneFigure } from '../../../types.ts';

export const $ = (formula: string) => `$${ce(formula)}$`;
export const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** The concentration of a formula, as LaTeX: [\ce{NH3}]. */
export const conc = (f: string) => `[${ce(f)}]`;

export const KW = 1.0e-14;
export const KW_TEXT = '$K_w = 1.0 \\times 10^{-14}$ at $25^\\circ\\text{C}$';
export const PH_SUM = 'At $25^\\circ\\text{C}$, $\\text{pH} + \\text{pOH} = 14.00$.';
export const SCI_TIP = 'Type scientific notation like `4.7e-5` or `4.7*10^-5`.';

// ---------------------------------------------------------------------------- numbers

/** Mantissa (with `sf` digits) and exponent of a value in scientific notation, after rounding. */
export function sci(v: number, sf: number): { m: string; e: number } {
  const [m, e] = Math.abs(v).toExponential(sf - 1).split('e');
  return { m: (v < 0 ? '-' : '') + m, e: Number(e) };
}

/** A value in scientific notation, as LaTeX: 2.5 \times 10^{-3}. */
export function sciTex(v: number, sf = 2): string {
  const { m, e } = sci(v, sf);
  return `${m} \\times 10^{${e}}`;
}

/** Whether a value is shown as a plain decimal (0.001 up to 10^sf) rather than in scientific notation. */
const plain = (e: number, sf: number) => e >= -3 && e < sf;

/** A value to `sf` significant figures, as LaTeX: a plain decimal when it is neither tiny nor huge. */
export function sigTex(v: number, sf = 3): string {
  const { e } = sci(v, sf);
  return plain(e, sf) ? v.toFixed(Math.max(0, sf - 1 - e)) : sciTex(v, sf);
}

/** The same value as a student types it: 0.0350, or 3.5*10^-5. */
export function sigTyped(v: number, sf = 3): string {
  const { m, e } = sci(v, sf);
  return plain(e, sf) ? v.toFixed(Math.max(0, sf - 1 - e)) : `${m}*10^${e}`;
}

/** A value rounded to `sf` significant figures. */
export const sigRound = (v: number, sf: number) => Number(v.toPrecision(sf));

/**
 * A numeric answer to `sf` significant figures, accepted within six tenths of a unit in the last
 * place, typed as a decimal or in scientific notation.
 */
export function sigPart(v: number, sf: number, extra: { suffix?: string; label?: string } = {}): Part {
  const { e } = sci(v, sf);
  return {
    ...extra,
    answer: { kind: 'numeric', value: v, tolerance: 0.6 * 10 ** (e - sf + 1), allowExpression: true, scientific: true, exact: sigTyped(v, sf) },
  };
}

/** A pH answer to two decimal places. */
export const phPart = (v: number, label = '$\\text{pH} =$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });

/** A concentration in mol/L with three significant figures, as LaTeX with its unit. */
export const molL = (v: number, sf = 3) => `${sigTex(v, sf)}\\ \\text{mol/L}`;

// ---------------------------------------------------------------------------- reactions

export type State = 's' | 'l' | 'g' | 'aq';
export interface Species {
  n: number;
  /** As mhchem and parseFormula read it: NH3, Fe^3+, [CoCl4]^2-. */
  f: string;
  s: State;
}
export interface Reaction {
  r: Species[];
  p: Species[];
}

/** A reaction from its text: 'N2(g) + 3H2(g) <=> 2NH3(g)'. */
export function rxn(text: string): Reaction {
  const [left, right] = text.split(' <=> ');
  const side = (s: string): Species[] =>
    s.split(' + ').map((t) => {
      const m = /^(\d*)(.+)\((s|l|g|aq)\)$/.exec(t.trim());
      if (!m) throw new Error(`Cannot read ${t}`);
      return { n: m[1] ? Number(m[1]) : 1, f: m[2], s: m[3] as State };
    });
  return { r: side(left), p: side(right) };
}

const spText = (x: Species, state: boolean) => `${x.n > 1 ? x.n : ''}${x.f}${state ? `(${x.s})` : ''}`;
export const sideText = (xs: Species[], state = true) => xs.map((x) => spText(x, state)).join(' + ');
/** A reaction in mhchem, without the dollars: \ce{N2(g) + 3H2(g) <=> 2NH3(g)}. */
export const eqCe = (x: Reaction, state = true, arrow = '<=>') => `\\ce{${sideText(x.r, state)} ${arrow} ${sideText(x.p, state)}}`;
export const eqMd = (x: Reaction, state = true, arrow = '<=>') => `$${eqCe(x, state, arrow)}$`;
export const reversed = (x: Reaction): Reaction => ({ r: x.p, p: x.r });
export const scaled = (x: Reaction, k: number): Reaction => ({ r: x.r.map((s) => ({ ...s, n: s.n * k })), p: x.p.map((s) => ({ ...s, n: s.n * k })) });
export const allSpecies = (x: Reaction) => [...x.r, ...x.p];

/** Whether a reaction's atoms and charges balance. */
export function rxBalanced(x: Reaction): boolean {
  return isBalanced(x.r.map((s) => s.f), x.p.map((s) => s.f), [...x.r, ...x.p].map((s) => s.n));
}

/** Gases and dissolved particles appear in the equilibrium law; pure solids and liquids do not. */
export const inK = (x: Species) => x.s === 'g' || x.s === 'aq';
/** [X]^n as LaTeX. */
export const termTex = (x: Species) => `${conc(x.f)}${x.n > 1 ? `^{${x.n}}` : ''}`;
/** A product of concentration terms, or 1 when there are none. */
export const productTex = (xs: Species[]) => xs.map(termTex).join('') || '1';

/** The equilibrium law expression, as LaTeX after "K_c =". `all` keeps solids and liquids in (a distractor). */
export function kTex(x: Reaction, all = false): string {
  const keep = (xs: Species[]) => xs.filter((s) => all || inK(s));
  const num = keep(x.p);
  const den = keep(x.r);
  if (!den.length) return productTex(num);
  return `\\dfrac{${productTex(num)}}{${productTex(den)}}`;
}

/** K_c from equilibrium concentrations, keyed by formula. */
export function kValue(x: Reaction, c: Record<string, number>): number {
  const prod = (xs: Species[]) => xs.filter(inK).reduce((a, s) => a * c[s.f] ** s.n, 1);
  return prod(x.p) / prod(x.r);
}

/** The substitution into the expression, as LaTeX: \dfrac{(0.240)^2}{(0.260)^2(0.180)}. */
export function kSubTex(x: Reaction, c: Record<string, string>): string {
  const t = (s: Species) => `(${c[s.f]})${s.n > 1 ? `^{${s.n}}` : ''}`;
  const num = x.p.filter(inK).map(t).join('') || '1';
  const den = x.r.filter(inK).map(t).join('');
  return den ? `\\dfrac{${num}}{${den}}` : num;
}

/** A formula with Unicode subscripts and charge, for labels drawn on a graph: N₂O₄, FeSCN²⁺. */
export function uni(f: string): string {
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻' };
  const [body, charge = ''] = f.split('^');
  return body.replace(/\d/g, (d) => SUB[Number(d)]) + [...charge].map((c) => SUP[c] ?? c).join('');
}

// ---------------------------------------------------------------------------- acids and their conjugate bases

export interface AcidPair {
  acid: string;
  base: string;
  /** Ka at 25 °C for these questions; null for a strong acid ("very large"). */
  ka: number | null;
  acidName: string;
  baseName: string;
}

/**
 * Acids and their conjugate bases, strongest acid first. The Ka values are typical values at 25 °C,
 * given in every question that uses them.
 */
export const ACID_TABLE: AcidPair[] = [
  { acid: 'HClO4', base: 'ClO4^-', ka: null, acidName: 'perchloric acid', baseName: 'perchlorate ion' },
  { acid: 'HI', base: 'I^-', ka: null, acidName: 'hydroiodic acid', baseName: 'iodide ion' },
  { acid: 'HBr', base: 'Br^-', ka: null, acidName: 'hydrobromic acid', baseName: 'bromide ion' },
  { acid: 'HCl', base: 'Cl^-', ka: null, acidName: 'hydrochloric acid', baseName: 'chloride ion' },
  { acid: 'H2SO4', base: 'HSO4^-', ka: null, acidName: 'sulfuric acid', baseName: 'hydrogen sulfate ion' },
  { acid: 'HNO3', base: 'NO3^-', ka: null, acidName: 'nitric acid', baseName: 'nitrate ion' },
  { acid: 'H3O^+', base: 'H2O', ka: 1, acidName: 'hydronium ion', baseName: 'water' },
  { acid: 'H2C2O4', base: 'HC2O4^-', ka: 5.6e-2, acidName: 'oxalic acid', baseName: 'hydrogen oxalate ion' },
  { acid: 'H2SO3', base: 'HSO3^-', ka: 1.4e-2, acidName: 'sulfurous acid', baseName: 'hydrogen sulfite ion' },
  { acid: 'HSO4^-', base: 'SO4^2-', ka: 1.0e-2, acidName: 'hydrogen sulfate ion', baseName: 'sulfate ion' },
  { acid: 'H3PO4', base: 'H2PO4^-', ka: 6.9e-3, acidName: 'phosphoric acid', baseName: 'dihydrogen phosphate ion' },
  { acid: 'HF', base: 'F^-', ka: 6.6e-4, acidName: 'hydrofluoric acid', baseName: 'fluoride ion' },
  { acid: 'HNO2', base: 'NO2^-', ka: 5.6e-4, acidName: 'nitrous acid', baseName: 'nitrite ion' },
  { acid: 'HCOOH', base: 'HCOO^-', ka: 1.8e-4, acidName: 'methanoic acid', baseName: 'methanoate ion' },
  { acid: 'HC2O4^-', base: 'C2O4^2-', ka: 1.5e-4, acidName: 'hydrogen oxalate ion', baseName: 'oxalate ion' },
  { acid: 'C6H5COOH', base: 'C6H5COO^-', ka: 6.3e-5, acidName: 'benzoic acid', baseName: 'benzoate ion' },
  { acid: 'CH3COOH', base: 'CH3COO^-', ka: 1.8e-5, acidName: 'acetic acid', baseName: 'acetate ion' },
  { acid: 'H2CO3', base: 'HCO3^-', ka: 4.5e-7, acidName: 'carbonic acid', baseName: 'hydrogen carbonate ion' },
  { acid: 'H2S', base: 'HS^-', ka: 8.9e-8, acidName: 'hydrosulfuric acid', baseName: 'hydrogen sulfide ion' },
  { acid: 'HSO3^-', base: 'SO3^2-', ka: 6.3e-8, acidName: 'hydrogen sulfite ion', baseName: 'sulfite ion' },
  { acid: 'H2PO4^-', base: 'HPO4^2-', ka: 6.2e-8, acidName: 'dihydrogen phosphate ion', baseName: 'hydrogen phosphate ion' },
  { acid: 'HClO', base: 'ClO^-', ka: 4.0e-8, acidName: 'hypochlorous acid', baseName: 'hypochlorite ion' },
  { acid: 'HCN', base: 'CN^-', ka: 6.2e-10, acidName: 'hydrocyanic acid', baseName: 'cyanide ion' },
  { acid: 'NH4^+', base: 'NH3', ka: 5.6e-10, acidName: 'ammonium ion', baseName: 'ammonia' },
  { acid: 'HCO3^-', base: 'CO3^2-', ka: 4.7e-11, acidName: 'hydrogen carbonate ion', baseName: 'carbonate ion' },
  { acid: 'HPO4^2-', base: 'PO4^3-', ka: 4.8e-13, acidName: 'hydrogen phosphate ion', baseName: 'phosphate ion' },
  { acid: 'H2O', base: 'OH^-', ka: 1.0e-14, acidName: 'water', baseName: 'hydroxide ion' },
];

export const pairOfAcid = (f: string) => ACID_TABLE.find((p) => p.acid === f);
export const pairOfBase = (f: string) => ACID_TABLE.find((p) => p.base === f);
/** A pair by its acid's formula (it must be in the table). */
export const acidPair = (f: string) => pairOfAcid(f)!;
/** The strength of an acid as a number: strong acids above the hydronium ion. */
export const kaNum = (p: AcidPair) => p.ka ?? 1e6;
/** The Ka column of a table, as Markdown. */
export const kaCell = (p: AcidPair) => (p.ka === null ? 'very large' : p.ka === 1 ? '1' : `$${sciTex(p.ka, 2)}$`);

/** Weak bases given by their Kb at 25 °C. */
export interface WeakBase {
  base: string;
  acid: string;
  kb: number;
  name: string;
  acidName: string;
}
export const WEAK_BASES: WeakBase[] = [
  { base: 'NH3', acid: 'NH4^+', kb: 1.8e-5, name: 'ammonia', acidName: 'ammonium ion' },
  { base: 'CH3NH2', acid: 'CH3NH3^+', kb: 4.4e-4, name: 'methylamine', acidName: 'methylammonium ion' },
  { base: 'N2H4', acid: 'N2H5^+', kb: 1.3e-6, name: 'hydrazine', acidName: 'hydrazinium ion' },
  { base: 'C5H5N', acid: 'C5H5NH^+', kb: 1.7e-9, name: 'pyridine', acidName: 'pyridinium ion' },
  { base: 'C6H5NH2', acid: 'C6H5NH3^+', kb: 4.3e-10, name: 'aniline', acidName: 'anilinium ion' },
];

// ---------------------------------------------------------------------------- titration curves

/**
 * What is in the flask: an acid system with its Ka values (strongest first; a strong acid is
 * [1e8]; none for a strong base), the charge of its most protonated form (0 for HA and H2A, +1
 * for NH4+, the acid of the weak base NH3), and the metal cations each formula unit brings (2 for
 * Na2CO3, 1 for NaOH).
 */
export interface Analyte {
  kas: number[];
  z0: number;
  cations: number;
}

/**
 * The pH of a solution from its charge balance, by bisection: an acid system of total
 * concentration `c`, metal cations `na` and chloride ions `cl` (all in mol/L).
 */
export function solvePh(a: Analyte, c: number, na: number, cl: number): number {
  const n = a.kas.length;
  const f = (ph: number) => {
    const h = 10 ** -ph;
    const terms: number[] = [];
    let k = 1;
    for (let j = 0; j <= n; j++) {
      if (j > 0) k *= a.kas[j - 1];
      terms.push(k * h ** (n - j));
    }
    const total = terms.reduce((s, t) => s + t, 0);
    const charge = terms.reduce((s, t, j) => s + (a.z0 - j) * (t / total) * c, 0);
    return h + na + charge - KW / h - cl;
  };
  let lo = -2;
  let hi = 16;
  for (let i = 0; i < 70; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * The pH after `v` mL of titrant (concentration `ct`, NaOH when `base` is true, HCl otherwise) is
 * added to `va` mL of analyte at concentration `ca`.
 */
export function titrationPh(a: Analyte, ca: number, va: number, ct: number, base: boolean, v: number): number {
  const vt = va + v;
  const c = (ca * va) / vt;
  const added = (ct * v) / vt;
  return solvePh(a, a.kas.length ? c : 0, a.cations * c + (base ? added : 0), base ? 0 : added);
}

const r2 = (x: number) => Math.round(x * 100) / 100;

/** Points of a titration curve from 0 to `vMax` mL, closely spaced around the equivalence points. */
export function titrationPoints(a: Analyte, ca: number, va: number, ct: number, base: boolean, vMax: number, eqs: number[]): Array<[number, number]> {
  const vs = new Set<number>([0, 0.25, 0.5]);
  for (let v = 1; v <= vMax; v++) vs.add(v);
  for (const e of eqs) for (const d of [-1.5, -0.5, -0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.5, 1.5]) if (e + d >= 0 && e + d <= vMax) vs.add(r2(e + d));
  return [...vs].sort((x, y) => x - y).map((v) => [v, r2(titrationPh(a, ca, va, ct, base, v))]);
}

/** A titration curve on a pH grid. */
export function curveFigure(points: Array<[number, number]>, titrant: string, vMax = 50, caption?: string): PlaneFigure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: vMax, yMin: 0, yMax: 14, xStep: 5, yStep: 1, xLabel: `Volume of ${titrant} added (mL)`, yLabel: 'pH' },
    polylines: [{ points, color: 'brand' }],
    ...(caption ? { caption } : {}),
  };
}

/** Indicators with their colour changes and pH ranges, for these questions. */
export interface Indicator {
  name: string;
  lo: number;
  hi: number;
  colours: string;
}
export const INDICATORS: Indicator[] = [
  { name: 'orange IV', lo: 1.4, hi: 2.8, colours: 'red to yellow' },
  { name: 'methyl orange', lo: 3.2, hi: 4.4, colours: 'red to yellow' },
  { name: 'bromocresol green', lo: 3.8, hi: 5.4, colours: 'yellow to blue' },
  { name: 'methyl red', lo: 4.8, hi: 6.0, colours: 'red to yellow' },
  { name: 'bromothymol blue', lo: 6.0, hi: 7.6, colours: 'yellow to blue' },
  { name: 'phenol red', lo: 6.6, hi: 8.0, colours: 'yellow to red' },
  { name: 'phenolphthalein', lo: 8.2, hi: 10.0, colours: 'colourless to pink' },
  { name: 'thymolphthalein', lo: 9.4, hi: 10.6, colours: 'colourless to blue' },
  { name: 'alizarin yellow R', lo: 10.1, hi: 12.0, colours: 'yellow to red' },
  { name: 'indigo carmine', lo: 11.4, hi: 13.0, colours: 'blue to yellow' },
];

/** An indicator table as Markdown. */
export function indicatorTable(list: Indicator[]): string {
  return ['| Indicator | Colour change | pH range |', '|---|---|---|', ...list.map((i) => `| ${i.name} | ${i.colours} | ${i.lo.toFixed(1)} to ${i.hi.toFixed(1)} |`)].join('\n');
}
