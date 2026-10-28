/**
 * Grade 12 Chemistry, Unit 1: what the thermochemistry questions share. Standard enthalpies of
 * formation (kJ/mol at 25 °C, stated in every question that uses them), equations whose enthalpy
 * changes are worked out from that one table so every question agrees with every other, specific
 * heat capacities, molar masses, and the enthalpy and potential energy diagrams.
 */
import { numPart, roundingPhrase } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { ce, isBalanced, parseFormula } from '../../../chem/formula.ts';
import { fmtFixed, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, TableFigure } from '../../../types.ts';

export const L = (n: number) => `c30-1-${n}`;

// ---------------------------------------------------------------------------- text

/** A formula in maths: $\ce{H2O(l)}$. */
export const $ = (f: string) => `$${ce(f)}$`;
/** A quantity with its unit, in maths: $25.0\ \text{mL}$. */
export const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
export const degC = (v: string | number) => `$${v}^\\circ\\text{C}$`;
export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** Decimal places that keep about three significant figures. */
export const dpFor = (v: number) => (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : Math.abs(v) >= 1 ? 2 : 3);
/** An answer rounded to about three significant figures, with the rounding said in the prompt. */
export const answer = (v: number, suffix: string, dp = dpFor(v), label?: string) => ({
  part: numPart(v, { decimals: dp, suffix, label }),
  phrase: roundingPhrase(dp),
  shown: fmtFixed(v, dp),
});
/** A value rounded to `n` significant figures, as a question states it. */
export const sig = (v: number, n = 3) => Number(v.toPrecision(n));
/** The same value written with its significant figures: 0.250, 12.0 (and 1290, not 1.29e+3). */
export const sf = (v: number, n = 3) => (Math.abs(v) >= 10 ** n ? v.toFixed(0) : v.toPrecision(n));
/** A working value in a solution, to four significant figures (whole numbers from 10 000 up). */
export const w = (v: number) => sf(v, 4);
/** "A" or "An" before a number or word, as it is read aloud: an 8.0 g sample, an 18.5 g sample, an ethanol burner. */
export const aAn = (next: string) => (/^(8|1[18](\D|$)|[aeiouAEIOU])/.test(next.replace(/^\$/, '')) ? 'An' : 'A');
/** One decimal place, the way the enthalpy tables give values: 179.2, -802.5. */
export const t1 = (v: number) => fmtFixed(v, 1);
/** An enthalpy change with its sign, for maths: +179.2 or -802.5. */
export const signed = (v: number, dp = 1) => (v > 0 ? `+${fmtFixed(v, dp)}` : fmtFixed(v, dp));
/** A value in brackets when it is negative, for a product in maths: 2(-393.5). */
export const br = (v: number, dp = 1) => (v < 0 ? `(${fmtFixed(v, dp)})` : fmtFixed(v, dp));

export const DH = '\\Delta_r H';
export const DHM = '\\Delta_r H_m';
export const DHF = '\\Delta_f H^\\circ';
export const DHR0 = '\\Delta_r H^\\circ';
export const JGC = '\\text{J/(g·°C)}';
export const Q_RULE = '$Q = mc\\Delta t$';
export const C_WATER = 4.19;
export const WATER_C_TEXT = `The specific heat capacity of water is $4.19\\ ${JGC}$.`;

/** Plain Unicode for a figure label: 2H₂O(g), Ca(OH)₂(s). */
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
export function uni(text: string): string {
  return text
    .split(' + ')
    .map((term) => {
      const m = /^(\d+\/\d+\s|\d+)?(.*)$/.exec(term)!;
      const body = m[2].replace(/([A-Za-z)])(\d+)/g, (_, a: string, d: string) => a + [...d].map((c) => SUBS[Number(c)]).join(''));
      return `${(m[1] ?? '').trim() ? `${m[1].trim()} ` : ''}${body}`.replace(/^(\d+) /, '$1');
    })
    .join(' + ');
}
/** A signed number in plain text, with a true minus sign: −483.6, +179.2. */
export const uniSigned = (v: number, dp = 1) => signed(v, dp).replace('-', '−');

// ---------------------------------------------------------------------------- molar masses

/** An element's molar mass as the questions state it, to two decimal places. */
const atomMass = (s: string) => Number(element(s)!.mass.toFixed(2));
/** A formula's molar mass from the stated element masses. */
export function mm(f: string): number {
  let m = 0;
  for (const [el, n] of parseFormula(f).atoms) m += atomMass(el) * n;
  return Math.round(m * 100) / 100;
}
/** "the molar mass of ethanol, C2H5OH, is 46.08 g/mol" as maths. */
export const mmText = (f: string) => `$M(${ce(f)}) = ${mm(f).toFixed(2)}\\ \\text{g/mol}$`;

// ---------------------------------------------------------------------------- enthalpies of formation

export interface Compound {
  /** Formula with its state, as an equation writes it. */
  f: string;
  name: string;
  /** Standard enthalpy of formation, kJ/mol. */
  dHf: number;
}

export const COMPOUNDS: Compound[] = [
  { f: 'H2O(l)', name: 'water', dHf: -285.8 },
  { f: 'H2O(g)', name: 'water vapour', dHf: -241.8 },
  { f: 'CO2(g)', name: 'carbon dioxide', dHf: -393.5 },
  { f: 'CO(g)', name: 'carbon monoxide', dHf: -110.5 },
  { f: 'CH4(g)', name: 'methane', dHf: -74.6 },
  { f: 'C2H6(g)', name: 'ethane', dHf: -84.0 },
  { f: 'C3H8(g)', name: 'propane', dHf: -103.8 },
  { f: 'C4H10(g)', name: 'butane', dHf: -125.6 },
  { f: 'C8H18(l)', name: 'octane', dHf: -250.1 },
  { f: 'C2H4(g)', name: 'ethene', dHf: 52.4 },
  { f: 'C2H2(g)', name: 'ethyne', dHf: 227.4 },
  { f: 'C6H6(l)', name: 'benzene', dHf: 49.1 },
  { f: 'CH3OH(l)', name: 'methanol', dHf: -239.2 },
  { f: 'C2H5OH(l)', name: 'ethanol', dHf: -277.6 },
  { f: 'C6H12O6(s)', name: 'glucose', dHf: -1273.3 },
  { f: 'C12H22O11(s)', name: 'sucrose', dHf: -2226.1 },
  { f: 'CH3COOH(l)', name: 'ethanoic acid', dHf: -484.3 },
  { f: 'NH3(g)', name: 'ammonia', dHf: -45.9 },
  { f: 'NO(g)', name: 'nitrogen monoxide', dHf: 91.3 },
  { f: 'NO2(g)', name: 'nitrogen dioxide', dHf: 33.2 },
  { f: 'N2O4(g)', name: 'dinitrogen tetroxide', dHf: 11.1 },
  { f: 'HNO3(l)', name: 'nitric acid', dHf: -174.1 },
  { f: 'SO2(g)', name: 'sulfur dioxide', dHf: -296.8 },
  { f: 'SO3(g)', name: 'sulfur trioxide', dHf: -395.7 },
  { f: 'H2SO4(l)', name: 'sulfuric acid', dHf: -814.0 },
  { f: 'H2S(g)', name: 'hydrogen sulfide', dHf: -20.6 },
  { f: 'CS2(l)', name: 'carbon disulfide', dHf: 89.0 },
  { f: 'HCl(g)', name: 'hydrogen chloride', dHf: -92.3 },
  { f: 'H2O2(l)', name: 'hydrogen peroxide', dHf: -187.8 },
  { f: 'Fe2O3(s)', name: 'iron(III) oxide', dHf: -824.2 },
  { f: 'Al2O3(s)', name: 'aluminium oxide', dHf: -1675.7 },
  { f: 'CaCO3(s)', name: 'calcium carbonate', dHf: -1207.6 },
  { f: 'CaO(s)', name: 'calcium oxide', dHf: -634.9 },
  { f: 'Ca(OH)2(s)', name: 'calcium hydroxide', dHf: -985.2 },
  { f: 'MgO(s)', name: 'magnesium oxide', dHf: -601.6 },
  { f: 'NaCl(s)', name: 'sodium chloride', dHf: -411.2 },
  { f: 'NaOH(s)', name: 'sodium hydroxide', dHf: -425.8 },
  { f: 'NaHCO3(s)', name: 'sodium hydrogen carbonate', dHf: -950.8 },
  { f: 'Na2CO3(s)', name: 'sodium carbonate', dHf: -1130.7 },
  { f: 'CuO(s)', name: 'copper(II) oxide', dHf: -157.3 },
  { f: 'ZnO(s)', name: 'zinc oxide', dHf: -350.5 },
  { f: 'PbO(s)', name: 'lead(II) oxide', dHf: -219.0 },
  { f: 'HgO(s)', name: 'mercury(II) oxide', dHf: -90.8 },
  { f: 'NH4Cl(s)', name: 'ammonium chloride', dHf: -314.4 },
  { f: 'NH4NO3(s)', name: 'ammonium nitrate', dHf: -365.6 },
  { f: 'KClO3(s)', name: 'potassium chlorate', dHf: -397.7 },
  { f: 'KCl(s)', name: 'potassium chloride', dHf: -436.5 },
  { f: 'MgCl2(s)', name: 'magnesium chloride', dHf: -641.3 },
  { f: 'AlCl3(s)', name: 'aluminium chloride', dHf: -704.2 },
  { f: 'AgCl(s)', name: 'silver chloride', dHf: -127.0 },
  { f: 'KI(s)', name: 'potassium iodide', dHf: -327.9 },
  { f: 'NaBr(s)', name: 'sodium bromide', dHf: -361.1 },
];

/** Elements in their standard states at 25 °C and 100 kPa, with their names. */
export const ELEMENTS: Array<{ f: string; name: string }> = [
  { f: 'H2(g)', name: 'hydrogen' },
  { f: 'O2(g)', name: 'oxygen' },
  { f: 'N2(g)', name: 'nitrogen' },
  { f: 'F2(g)', name: 'fluorine' },
  { f: 'Cl2(g)', name: 'chlorine' },
  { f: 'Br2(l)', name: 'bromine' },
  { f: 'I2(s)', name: 'iodine' },
  { f: 'C(s)', name: 'carbon (graphite)' },
  { f: 'S(s)', name: 'sulfur' },
  { f: 'Na(s)', name: 'sodium' },
  { f: 'K(s)', name: 'potassium' },
  { f: 'Mg(s)', name: 'magnesium' },
  { f: 'Ca(s)', name: 'calcium' },
  { f: 'Al(s)', name: 'aluminium' },
  { f: 'Fe(s)', name: 'iron' },
  { f: 'Cu(s)', name: 'copper' },
  { f: 'Zn(s)', name: 'zinc' },
  { f: 'Pb(s)', name: 'lead' },
  { f: 'Ag(s)', name: 'silver' },
  { f: 'Hg(l)', name: 'mercury' },
];
const DIATOMIC = new Set(['H', 'O', 'N', 'F', 'Cl', 'Br', 'I']);

export const isElement = (f: string) => ELEMENTS.some((e) => e.f === f);
export const compound = (f: string) => COMPOUNDS.find((c) => c.f === f);
export function dHf(f: string): number {
  if (isElement(f)) return 0;
  const c = compound(f);
  if (!c) throw new Error(`No enthalpy of formation for ${f}`);
  return c.dHf;
}
export function nameOf(f: string): string {
  const c = compound(f) ?? ELEMENTS.find((e) => e.f === f);
  if (!c) throw new Error(`No name for ${f}`);
  return c.name;
}
/** "methane, $\ce{CH4(g)}$" */
export const named = (f: string) => `${nameOf(f)}, ${$(f)}`;
/** The element of a symbol in its standard state: Cl → Cl2(g), C → C(s). */
export const standardElement = (symbol: string) => ELEMENTS.find((e) => parseFormula(e.f).atoms.has(symbol) && parseFormula(e.f).atoms.size === 1)!.f;
export const isDiatomic = (symbol: string) => DIATOMIC.has(symbol);

/** A table of standard enthalpies of formation for some substances. */
export function formationTable(formulas: string[]): TableFigure {
  return {
    type: 'table',
    headers: ['Substance', `$${DHF}$ (kJ/mol)`],
    rows: formulas.map((f) => [`$${ce(f)}$`, t1(dHf(f))]),
  };
}

// ---------------------------------------------------------------------------- equations

export interface Term {
  k: number;
  f: string;
}
export interface Eq {
  r: Term[];
  p: Term[];
}

/** An equation as a question writes it: '2H2(g) + O2(g) -> 2H2O(g)', fractions as '1/2 O2(g)'. */
export function parseEq(s: string): Eq {
  const [left, right] = s.split('->').map((x) => x.trim());
  const side = (t: string): Term[] =>
    t.split(' + ').map((x) => {
      const m = /^(\d+\/\d+\s|\d+)?\s*(\S+)$/.exec(x.trim());
      if (!m) throw new Error(`Cannot read the term ${x}`);
      const c = m[1]?.trim();
      const k = !c ? 1 : c.includes('/') ? Number(c.split('/')[0]) / Number(c.split('/')[1]) : Number(c);
      return { k, f: m[2] };
    });
  return { r: side(left), p: side(right) };
}

/** A coefficient as an equation writes it: '' for 1, '2', '1/2 '. */
export function coefText(k: number): string {
  if (Math.abs(k - 1) < 1e-9) return '';
  const fr = toFrac(k, 12)!;
  return fr.d === 1 ? `${fr.n}` : `${fr.n}/${fr.d} `;
}
/** A coefficient as maths: 2, \tfrac{1}{2}. */
export function coefTex(k: number): string {
  const fr = toFrac(k, 12)!;
  return fr.d === 1 ? `${fr.n}` : `${fr.n < 0 ? '-' : ''}\\tfrac{${Math.abs(fr.n)}}{${fr.d}}`;
}
/** A coefficient as a student types it: 2, 3/2. */
export function coefPlain(k: number): string {
  const fr = toFrac(k, 12)!;
  return fr.d === 1 ? `${fr.n}` : `${fr.n}/${fr.d}`;
}

const sideCe = (ts: Term[]) => ts.map((t) => `${coefText(t.k)}${t.f}`).join(' + ');
/** The inside of \ce{}: '2H2(g) + O2(g) -> 2H2O(g)'. */
export const eqCe = (e: Eq) => `${sideCe(e.r)} -> ${sideCe(e.p)}`;
/** The equation in maths. */
export const eqMd = (e: Eq) => `$\\ce{${eqCe(e)}}$`;
/** The equation as plain text for a figure label, one side at a time. */
export const sideUni = (ts: Term[]) => uni(ts.map((t) => `${coefText(t.k)}${t.f}`).join(' + '));

/** The enthalpy change of an equation as written, from the table of formation enthalpies. */
export function dHr(e: Eq): number {
  const sum = (ts: Term[]) => ts.reduce((s, t) => s + t.k * dHf(t.f), 0);
  return roundTo(sum(e.p) - sum(e.r), 2);
}

/** The equation multiplied by k; a negative k also reverses it. */
export function scaleEq(e: Eq, k: number): Eq {
  const m = Math.abs(k);
  const mul = (ts: Term[]) => ts.map((t) => ({ k: t.k * m, f: t.f }));
  return k < 0 ? { r: mul(e.p), p: mul(e.r) } : { r: mul(e.r), p: mul(e.p) };
}

/** Whether an equation (fractional coefficients allowed) balances. */
export function eqBalances(e: Eq): boolean {
  const all = [...e.r, ...e.p];
  const lcd = all.reduce((acc, t) => {
    const d = toFrac(t.k, 12)?.d ?? 1;
    const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
    return (acc * d) / g(acc, d);
  }, 1);
  return isBalanced(e.r.map((t) => t.f), e.p.map((t) => t.f), all.map((t) => Math.round(t.k * lcd)));
}

/** The net amount of each species, products positive, of equations multiplied by their factors. */
export function netSpecies(parts: Array<[Eq, number]>): Map<string, number> {
  const net = new Map<string, number>();
  const add = (f: string, v: number) => {
    const n = roundTo((net.get(f) ?? 0) + v, 9);
    if (Math.abs(n) < 1e-9) net.delete(f);
    else net.set(f, n);
  };
  for (const [e, k] of parts) {
    for (const t of e.r) add(t.f, -t.k * k);
    for (const t of e.p) add(t.f, t.k * k);
  }
  return net;
}

// ---------------------------------------------------------------------------- specific heat capacities

export interface Material {
  name: string;
  /** J/(g·°C) */
  c: number;
}
export const WATER: Material = { name: 'water', c: C_WATER };
/** Metals and other materials, for heating questions. */
export const MATERIALS: Material[] = [
  { name: 'aluminium', c: 0.897 },
  { name: 'copper', c: 0.385 },
  { name: 'iron', c: 0.449 },
  { name: 'lead', c: 0.129 },
  { name: 'silver', c: 0.235 },
  { name: 'zinc', c: 0.388 },
  { name: 'nickel', c: 0.444 },
  { name: 'tin', c: 0.227 },
  { name: 'titanium', c: 0.523 },
  { name: 'glass', c: 0.84 },
  { name: 'granite', c: 0.79 },
  { name: 'ethanol', c: 2.44 },
  { name: 'olive oil', c: 1.97 },
];
/** Metals whose specific heat capacities are far enough apart to tell them apart by experiment. */
export const IDENTIFIABLE: Material[] = [
  { name: 'lead', c: 0.129 },
  { name: 'silver', c: 0.235 },
  { name: 'copper', c: 0.385 },
  { name: 'iron', c: 0.449 },
  { name: 'titanium', c: 0.523 },
  { name: 'aluminium', c: 0.897 },
  { name: 'magnesium', c: 1.02 },
];
/** A specific heat capacity as stated: 0.897, 4.19, 0.840. */
export const cShown = (c: number) => c.toPrecision(3);
export const cText = (s: Material) => `The specific heat capacity of ${s.name} is $${cShown(s.c)}\\ ${JGC}$.`;

// ---------------------------------------------------------------------------- figures

/**
 * An enthalpy diagram: the enthalpy axis, the higher and the lower level with their substances,
 * and an arrow from the reactants to the products labelled with the energy.
 */
export function enthalpyFigure(reactants: string, products: string, exo: boolean, label: string): PlaneFigure {
  const [hi, lo] = [5.2, 1.6];
  const [rY, pY] = exo ? [hi, lo] : [lo, hi];
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 7, xStep: 10, yStep: 7, yLabel: 'Enthalpy, H' },
    hideTickLabels: true,
    segments: [
      { from: [0.3, 0.2], to: [0.3, 6.8], color: 'muted', arrowEnd: true },
      { from: [1, hi], to: [9.6, hi], color: 'brand' },
      { from: [1, lo], to: [9.6, lo], color: 'brand' },
      { from: [9, rY], to: [9, pY], color: 'accent', arrowEnd: true },
    ],
    points: [
      { x: 1, y: rY, label: reactants, color: 'muted', open: true },
      { x: 1, y: pY, label: products, color: 'muted', open: true },
      { x: 4.2, y: (hi + lo) / 2, label, color: 'muted', open: true },
    ],
    caption: `Enthalpy diagram: ${reactants} ${exo ? 'above' : 'below'} ${products}, with an arrow from ${reactants} to ${products} labelled ${label}`,
  };
}

export interface Profile {
  R: number;
  P: number;
  peak: number;
}
const r2 = (v: number) => Math.round(v * 100) / 100;
/** Reactants level, a smooth hump to the peak, and the products level, across progress 1 to 9. */
export function profilePoints({ R, P, peak }: Profile): Array<[number, number]> {
  const pts: Array<[number, number]> = [[1.1, R], [3, R]];
  for (let k = 1; k <= 8; k++) {
    const x = 3 + k * 0.25;
    pts.push([x, r2(R + ((peak - R) * (1 - Math.cos((Math.PI * (x - 3)) / 2))) / 2)]);
  }
  for (let k = 1; k <= 8; k++) {
    const x = 5 + k * 0.25;
    pts.push([x, r2(P + ((peak - P) * (1 + Math.cos((Math.PI * (x - 5)) / 2))) / 2)]);
  }
  pts.push([8.9, P]);
  return pts;
}
/**
 * A potential energy diagram: potential energy up the side in kJ, reaction progress along the
 * bottom with no numbers (no tick falls between 1 and 9 when the step is 1000).
 */
export function peFigure(s: number, curves: Array<Profile & { color?: 'brand' | 'muted' }>, extra: PlanePoint[] = [], caption?: string): PlaneFigure {
  const main = curves[0];
  return {
    type: 'plane',
    grid: { xMin: 1, xMax: 9, yMin: 0, yMax: 10 * s, xStep: 1000, yStep: s, xLabel: 'Reaction progress', yLabel: 'Potential energy (kJ)' },
    polylines: curves.map((c) => ({ points: profilePoints(c), color: c.color ?? 'brand' })),
    points: [{ x: 1.3, y: main.R, label: 'reactants', color: 'muted' }, { x: 7.2, y: main.P, label: 'products', color: 'muted' }, ...extra],
    ...(caption ? { caption } : {}),
  };
}
/** Levels in grid units: reactants and products 1 to 8, the peak at least two units above both, at most `maxPeak`. */
export function pickProfile(rng: Rng, maxPeak = 9, minGap = 1): Profile {
  for (;;) {
    const R = rng.int(1, 8);
    const P = rng.intExcept(1, 8, [R]);
    const lo = Math.max(R, P) + minGap;
    if (lo > maxPeak) continue;
    return { R, P, peak: rng.int(lo, maxPeak) };
  }
}
export const scaled = (p: Profile, s: number): Profile => ({ R: p.R * s, P: p.P * s, peak: p.peak * s });
export const kJ = (v: number) => q(v, 'kJ');
/** An energy change with its sign: $-40\ \text{kJ}$ or $+40\ \text{kJ}$. */
export const kJSigned = (v: number) => q(v > 0 ? `+${v}` : v, 'kJ');
