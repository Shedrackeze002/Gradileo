/**
 * Shared pieces for Grade 12 Chemistry, Unit 2 (electrochemical changes): number formatting, the
 * table of reduction potentials a question shows, the names of the species, the metals used in
 * cells, redox reactions built from two couples of the table, and the drawing of a cell.
 */
import { numPart, roundingPhrase } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { ce } from '../../../chem/formula.ts';
import { cellPotential, combineHalves, equationCe, REDUCTION_TABLE, reductionHalf, reverseEquation, type Combined, type Equation, type ReductionHalf, type Term } from '../../../chem/redox.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Part, PlaneFigure, PlanePoint, PlaneSegment, TableFigure } from '../../../types.ts';

export const L = (n: number) => `c30-2-${n}`;
/** A formula in maths: $\ce{H2SO4}$. */
export const $ = (f: string) => `$${ce(f)}$`;
/** Anything inside \ce{}, in maths. */
export const ceMd = (s: string) => `$\\ce{${s}}$`;
/** A quantity with its unit, in maths: $2.50\ \text{A}$. */
export const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a, b and c". */
export const listAnd = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items[0] ?? '');
/** An integer with its sign, in maths: +6, -2, 0. */
export const signed = (v: number) => (v > 0 ? `+${v}` : `${v}`);
/** A potential in volts with its sign, for maths: +0.34, -0.76, 0.00. */
export const sv = (v: number) => (v > 0 ? `+${v.toFixed(2)}` : fmtFixed(v, 2));
export const volts = (v: number) => `$${sv(v)}\\ \\text{V}$`;
/** Decimal places that keep three significant figures. */
export const dp3 = (v: number) => Math.max(0, 2 - Math.floor(Math.log10(Math.abs(v))));
/** An answer rounded to three significant figures, with the rounding said in the prompt. */
export const answer = (v: number, suffix: string, dp = dp3(v)) => ({ part: numPart(v, { decimals: dp, suffix }), phrase: roundingPhrase(dp), shown: fmtFixed(v, dp) });
/** A value rounded to three significant figures, as a question states it. */
export const sig = (v: number, n = 3) => Number(v.toPrecision(n));
/** The same value written with its significant figures: 0.0200, 12.0. */
export const sf = (v: number, n = 3) => (Math.abs(v) >= 10 ** n ? v.toFixed(0) : v.toPrecision(n));
/** A working value in a solution, to four significant figures. */
export const w = (v: number) => String(Number(v.toPrecision(4)));
/** A potential as an answer, in volts to the nearest hundredth. */
export const voltPart = (v: number, label?: string): Part => numPart(v, { decimals: 2, suffix: 'V', label });

/** A value in scientific notation, as LaTeX: 1.84 × 10⁻³. */
export function sciTex(v: number, n = 3): string {
  const [m, e] = v.toExponential(n - 1).split('e');
  return `${m} \\times 10^{${Number(e)}}`;
}
/** An answer to `n` significant figures that may be typed in scientific notation. */
export function sciPart(v: number, n: number, suffix: string): Part {
  const [m, e] = v.toExponential(n - 1).split('e');
  const exp = Number(e);
  return { suffix, answer: { kind: 'numeric', value: v, tolerance: Math.max(0.6 * 10 ** (exp - n + 1), Math.abs(v) * 0.004), allowExpression: true, scientific: true, exact: `${m}*10^${exp}` } };
}
export const SCI_TIP = 'Type scientific notation like `1.84e-3` or `1.84*10^-3`.';

// ---------------------------------------------------------------------------- the redox table in a question

export const TABLE_NOTE = 'The table gives standard reduction potentials at $25^\\circ\\text{C}$, strongest oxidising agent first.';
/** A potential in a table cell (plain text): +0.34, −0.76. */
const cellE = (v: number) => (v > 0 ? `+${v.toFixed(2)}` : v < 0 ? `−${(-v).toFixed(2)}` : '0.00');
const rowsFor = (keys: string[]) => REDUCTION_TABLE.filter((h) => keys.includes(h.key));

/** A table of the half-reactions with these keys, in the order of the full table. */
export function potTable(keys: string[]): TableFigure {
  return { type: 'table', headers: ['Reduction half-reaction', '$E^\\circ$ (V)'], rows: rowsFor(keys).map((h) => [ceMd(h.text), cellE(h.E)]) };
}
/** The same table in Markdown, for a question that also shows a figure. */
export function potTableMd(keys: string[]): string {
  return ['| Reduction half-reaction | $E^\\circ$ (V) |', '|---|---|', ...rowsFor(keys).map((h) => `| ${ceMd(h.text)} | $${sv(h.E)}$ |`)].join('\n');
}

// ---------------------------------------------------------------------------- names

const NAMES: Record<string, string> = {
  'H^+': 'hydrogen ions', H2: 'hydrogen', H2O: 'water', 'OH^-': 'hydroxide ions', O2: 'oxygen',
  F2: 'fluorine', Cl2: 'chlorine', Br2: 'bromine', I2: 'iodine', 'F^-': 'fluoride ions', 'Cl^-': 'chloride ions', 'Br^-': 'bromide ions', 'I^-': 'iodide ions',
  'Fe^3+': 'iron(III) ions', 'Fe^2+': 'iron(II) ions', 'Sn^4+': 'tin(IV) ions', 'Sn^2+': 'tin(II) ions', 'Cu^2+': 'copper(II) ions', 'Ag^+': 'silver ions',
  'Zn^2+': 'zinc ions', 'Mg^2+': 'magnesium ions', 'Al^3+': 'aluminium ions', 'Pb^2+': 'lead(II) ions', 'Ni^2+': 'nickel(II) ions', 'Cd^2+': 'cadmium ions',
  'Co^2+': 'cobalt(II) ions', 'Cr^3+': 'chromium(III) ions', 'Au^3+': 'gold(III) ions', 'Hg^2+': 'mercury(II) ions', 'Mn^2+': 'manganese(II) ions',
  'Na^+': 'sodium ions', 'K^+': 'potassium ions', 'Li^+': 'lithium ions', 'Ca^2+': 'calcium ions', 'Ba^2+': 'barium ions',
  'MnO4^-': 'permanganate ions', 'Cr2O7^2-': 'dichromate ions', 'NO3^-': 'nitrate ions', H2O2: 'hydrogen peroxide', NO: 'nitrogen monoxide',
  SO2: 'sulfur dioxide',
};
/** What a species is called in a sentence: "copper(II) ions", "zinc", "chlorine". */
export function nameOf(f: string): string {
  return NAMES[f] ?? element(f)?.name ?? f;
}

// ---------------------------------------------------------------------------- metals

export interface Metal {
  /** The key of its couple in the reduction table, and its symbol. */
  key: string;
  ion: string;
  /** A soluble salt for its half-cell, and the salt's name. */
  salt: string;
  saltName: string;
}
export const METALS: Metal[] = [
  { key: 'Mg', ion: 'Mg^2+', salt: 'Mg(NO3)2', saltName: 'magnesium nitrate' },
  { key: 'Al', ion: 'Al^3+', salt: 'Al(NO3)3', saltName: 'aluminium nitrate' },
  { key: 'Zn', ion: 'Zn^2+', salt: 'Zn(NO3)2', saltName: 'zinc nitrate' },
  { key: 'Cr', ion: 'Cr^3+', salt: 'Cr(NO3)3', saltName: 'chromium(III) nitrate' },
  { key: 'Fe', ion: 'Fe^2+', salt: 'FeSO4', saltName: 'iron(II) sulfate' },
  { key: 'Cd', ion: 'Cd^2+', salt: 'Cd(NO3)2', saltName: 'cadmium nitrate' },
  { key: 'Co', ion: 'Co^2+', salt: 'Co(NO3)2', saltName: 'cobalt(II) nitrate' },
  { key: 'Ni', ion: 'Ni^2+', salt: 'Ni(NO3)2', saltName: 'nickel(II) nitrate' },
  { key: 'Sn', ion: 'Sn^2+', salt: 'SnSO4', saltName: 'tin(II) sulfate' },
  { key: 'Pb', ion: 'Pb^2+', salt: 'Pb(NO3)2', saltName: 'lead(II) nitrate' },
  { key: 'Cu', ion: 'Cu^2+', salt: 'Cu(NO3)2', saltName: 'copper(II) nitrate' },
  { key: 'Ag', ion: 'Ag^+', salt: 'AgNO3', saltName: 'silver nitrate' },
];
export const metalOf = (key: string) => METALS.find((m) => m.key === key)!;
export const metalName = (key: string) => element(key)!.name;
export const E = (key: string) => reductionHalf(key).E;

// ---------------------------------------------------------------------------- reactions between two couples

export interface Transfer {
  /** The couple whose oxidising agent is reduced, and the couple whose reducing agent is oxidised. */
  o: ReductionHalf;
  r: ReductionHalf;
  /** The oxidation half-reaction (the reduction of r reversed) and the reduction half-reaction. */
  ox: Equation;
  red: Equation;
  c: Combined;
  /** The balanced equation, reducing agent first: Zn + Cu²⁺ → Zn²⁺ + Cu. */
  eq: Equation;
  states: Record<string, string>;
  /** E°cell = E°(o) − E°(r): positive when the reaction is spontaneous. */
  E: number;
}

/** Puts the listed formulas first on each side, in that order. */
export function orderEq(eq: Equation, left: string[], right: string[]): Equation {
  const sort = (terms: Term[], first: string[]) => [...terms].sort((a, b) => rank(a[1], first) - rank(b[1], first));
  const rank = (f: string, first: string[]) => (first.includes(f) ? first.indexOf(f) : first.length);
  return { left: sort(eq.left, left), right: sort(eq.right, right) };
}

/** The reaction between the oxidising agent of couple `oKey` and the reducing agent of couple `rKey`. */
export function transfer(oKey: string, rKey: string): Transfer {
  const o = reductionHalf(oKey);
  const r = reductionHalf(rKey);
  const ox = reverseEquation(r.eq);
  const c = combineHalves(ox, o.eq);
  const eq = orderEq(c.overall, [r.ra, o.oa], [r.oa, o.ra]);
  return { o, r, ox, red: o.eq, c, eq, states: { 'H^+': 'aq', H2O: 'l', ...r.states, ...o.states }, E: cellPotential(o.E, r.E) };
}
/** The balanced equation of a transfer inside \ce{}, with states. */
export const transferCe = (t: Transfer, states = true) => equationCe(t.eq, states ? t.states : {});
/** A half-reaction with states, inside \ce{}. */
export const halfCe = (t: Transfer, eq: Equation) => equationCe(eq, t.states);

/** Whether two species would form a precipitate together (silver or lead(II) with a halide). */
export function precipitates(a: string, b: string): boolean {
  const halide = (f: string) => ['Cl^-', 'Br^-', 'I^-'].includes(f);
  const heavy = (f: string) => ['Ag^+', 'Pb^2+'].includes(f);
  return (halide(a) && heavy(b)) || (halide(b) && heavy(a));
}

// ---------------------------------------------------------------------------- a cell drawn on a plane

/** Unicode text for a formula in a figure label: Zn²⁺(aq), NO₃⁻. */
export function plain(f: string): string {
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻' };
  const m = /^(.*?)(?:\^(\d*[+-]))?(\(\w+\))?$/.exec(f)!;
  const body = m[1].replace(/([A-Za-z)])(\d+)/g, (_, a: string, d: string) => a + [...d].map((c) => SUB[Number(c)]).join(''));
  return `${body}${m[2] ? [...m[2]].map((c) => SUP[c]).join('') : ''}${m[3] ?? ''}`;
}

export interface HalfCellDrawing {
  /** Label on the electrode (a metal name or "platinum"), and on the solution. */
  electrode: string;
  solution: string;
}

/**
 * A voltaic cell: two beakers joined by a salt bridge, with an electrode in each, joined by a wire
 * through a voltmeter. An arrow over the wire shows the electron flow when `electrons` is given.
 */
export function cellFigure(left: HalfCellDrawing, right: HalfCellDrawing, opts: { bridge?: string; electrons?: 'right' | 'left'; caption?: string } = {}): PlaneFigure {
  const beaker = (x0: number, x1: number): PlaneSegment[] => [
    { from: [x0, 4.6], to: [x0, 0.8], color: 'muted' },
    { from: [x0, 0.8], to: [x1, 0.8], color: 'muted' },
    { from: [x1, 0.8], to: [x1, 4.6], color: 'muted' },
  ];
  const liquid = (x0: number, x1: number) => ({ points: [[x0, 0.8], [x1, 0.8], [x1, 3.8], [x0, 3.8], [x0, 0.8]] as Array<[number, number]>, color: 'brand' as const, fill: true });
  const electrode = (x: number) => ({ points: [[x - 0.3, 1.5], [x + 0.3, 1.5], [x + 0.3, 6.2], [x - 0.3, 6.2], [x - 0.3, 1.5]] as Array<[number, number]>, color: 'accent' as const, fill: true });
  const bridge: PlaneSegment[] = [
    { from: [3.5, 2.6], to: [3.5, 5.6], color: 'muted' },
    { from: [3.5, 5.6], to: [8.5, 5.6], color: 'muted' },
    { from: [8.5, 5.6], to: [8.5, 2.6], color: 'muted' },
    { from: [4.1, 2.6], to: [4.1, 5.0], color: 'muted' },
    { from: [4.1, 5.0], to: [7.9, 5.0], color: 'muted' },
    { from: [7.9, 5.0], to: [7.9, 2.6], color: 'muted' },
    { from: [3.5, 2.6], to: [4.1, 2.6], color: 'muted' },
    { from: [7.9, 2.6], to: [8.5, 2.6], color: 'muted' },
  ];
  const wire: PlaneSegment[] = [
    { from: [2, 6.2], to: [2, 7.6], color: 'muted' },
    { from: [2, 7.6], to: [10, 7.6], color: 'muted' },
    { from: [10, 7.6], to: [10, 6.2], color: 'muted' },
  ];
  const arrow: PlaneSegment[] = opts.electrons ? [{ from: opts.electrons === 'right' ? [3.4, 8.3] : [8.6, 8.3], to: opts.electrons === 'right' ? [5.4, 8.3] : [6.6, 8.3], color: 'accent', arrowEnd: true }] : [];
  const points: PlanePoint[] = [
    { x: 2.3, y: 6.2, label: left.electrode, color: 'muted' },
    { x: 10.3, y: 6.2, label: right.electrode, color: 'muted' },
    { x: 0.95, y: 1.1, label: left.solution, color: 'muted' },
    { x: 8.6, y: 1.1, label: right.solution, color: 'muted' },
    { x: 6, y: 7.6, label: 'V', color: 'muted' },
    { x: 4.1, y: 5.8, label: opts.bridge ?? 'salt bridge', color: 'muted' },
    ...(opts.electrons ? [{ x: opts.electrons === 'right' ? 4.4 : 7.6, y: 8.3, label: 'e⁻', color: 'muted' as const }] : []),
  ];
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 12, yMin: 0, yMax: 9, xStep: 12, yStep: 9 },
    hideTickLabels: true,
    polylines: [liquid(0.8, 4.6), liquid(7.4, 11.2), electrode(2), electrode(10)],
    segments: [...beaker(0.8, 4.6), ...beaker(7.4, 11.2), ...bridge, ...wire, ...arrow],
    points,
    caption: opts.caption,
  };
}

/**
 * An electrolytic cell: one beaker with two electrodes, joined through a power supply. The
 * negative terminal (cathode) is on the left.
 */
export function electrolyticFigure(solution: string, opts: { left?: string; right?: string; caption?: string } = {}): PlaneFigure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 12, yMin: 0, yMax: 9, xStep: 12, yStep: 9 },
    hideTickLabels: true,
    polylines: [
      { points: [[2.5, 0.8], [9.5, 0.8], [9.5, 3.8], [2.5, 3.8], [2.5, 0.8]], color: 'brand', fill: true },
      { points: [[3.9, 1.5], [4.5, 1.5], [4.5, 6.2], [3.9, 6.2], [3.9, 1.5]], color: 'accent', fill: true },
      { points: [[7.5, 1.5], [8.1, 1.5], [8.1, 6.2], [7.5, 6.2], [7.5, 1.5]], color: 'accent', fill: true },
    ],
    segments: [
      { from: [2.5, 4.8], to: [2.5, 0.8], color: 'muted' },
      { from: [2.5, 0.8], to: [9.5, 0.8], color: 'muted' },
      { from: [9.5, 0.8], to: [9.5, 4.8], color: 'muted' },
      { from: [4.2, 6.2], to: [4.2, 7.6], color: 'muted' },
      { from: [4.2, 7.6], to: [5.5, 7.6], color: 'muted' },
      { from: [5.5, 7.1], to: [5.5, 8.1], color: 'muted' },
      { from: [6.5, 6.9], to: [6.5, 8.3], color: 'muted' },
      { from: [6.5, 7.6], to: [7.8, 7.6], color: 'muted' },
      { from: [7.8, 7.6], to: [7.8, 6.2], color: 'muted' },
    ],
    points: [
      { x: 4.5, y: 6.2, label: opts.left ?? 'cathode (−)', color: 'muted' },
      { x: 8.1, y: 6.2, label: opts.right ?? 'anode (+)', color: 'muted' },
      { x: 2.8, y: 1.1, label: solution, color: 'muted' },
      { x: 5.6, y: 8.6, label: 'power supply', color: 'muted' },
    ],
    caption: opts.caption,
  };
}
