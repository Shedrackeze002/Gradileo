/**
 * Redox chemistry: the oxidation numbers of the atoms in a formula or ion by the usual rules,
 * half-reactions balanced in acidic solution step by step and combined into a redox equation, and
 * a table of standard reduction potentials at 25 °C (strongest oxidising agent first), as a data
 * booklet gives them.
 */
import { parseFormula } from './formula.ts';
import { ANIONS } from './ions.ts';

// ---------------------------------------------------------------------------- oxidation numbers

const GROUP1 = new Set(['Li', 'Na', 'K', 'Rb', 'Cs']);
const GROUP2 = new Set(['Be', 'Mg', 'Ca', 'Sr', 'Ba']);
const NONMETALS = new Set(['H', 'B', 'C', 'N', 'O', 'F', 'Si', 'P', 'S', 'Cl', 'As', 'Se', 'Br', 'Te', 'I', 'He', 'Ne', 'Ar', 'Kr', 'Xe']);
/**
 * When two elements are left without a rule, the more electronegative one takes its usual negative
 * oxidation number (Cl in PCl5, S in CS2, N in HCN). Most electronegative first.
 */
const NEGATIVE: Array<[string, number]> = [
  ['Cl', -1], ['N', -3], ['Br', -1], ['I', -1], ['S', -2], ['Se', -2], ['C', -4], ['P', -3], ['As', -3], ['Te', -2], ['B', -3], ['Si', -4],
];

const POLYATOMIC = ANIONS.filter((a) => a.poly);

export class OxidationNumberError extends Error {}

/**
 * The oxidation number of each element in a formula or ion (`H2O2`, `MnO4^-`, `Fe^3+`), by the
 * usual rules: an element alone is 0, and a monatomic ion has its charge. In compounds, group 1
 * metals are +1, group 2 metals +2 and aluminium +3; F is −1; H is +1, or −1 in metal hydrides
 * such as NaH; O is −2, or −1 in peroxides such as H2O2 and Na2O2, and positive with fluorine; and
 * the oxidation numbers add up to the charge. A metal with a polyatomic ion (Fe2(SO4)3) takes the
 * charge the ion leaves it, and of two other elements left, the more electronegative takes its
 * usual negative value. The value is an average when atoms of one element differ (8/3 for Fe in
 * Fe3O4). Throws when the rules do not decide.
 */
export function oxidationNumbers(text: string): Map<string, number> {
  const { atoms, charge } = parseFormula(text);
  const els = [...atoms.keys()];
  const n = (el: string) => atoms.get(el)!;
  if (els.length === 1) return new Map([[els[0], charge / n(els[0]) + 0]]);
  const on = new Map<string, number>();
  const metal = (el: string) => !NONMETALS.has(el);
  for (const el of els) {
    if (GROUP1.has(el)) on.set(el, 1);
    else if (GROUP2.has(el)) on.set(el, 2);
    else if (el === 'Al') on.set(el, 3);
    else if (el === 'F') on.set(el, -1);
    else if (el === 'H') on.set(el, els.every((x) => x === 'H' || metal(x)) ? -1 : 1);
  }
  const rest = () => els.filter((el) => !on.has(el));
  const known = () => [...on].reduce((s, [el, v]) => s + v * n(el), 0);
  if (atoms.has('O') && !atoms.has('F')) {
    // A peroxide: only oxygen is left, and −2 would not add up to the charge (H2O2, Na2O2, BaO2).
    const peroxide = rest().length === 1 && known() - 2 * n('O') !== charge;
    if (!peroxide) on.set('O', -2);
  }
  // A metal with a polyatomic ion (FeSO4, Fe2(SO4)3, Cu(NO3)2): the ion keeps its usual charge.
  const metals = rest().filter(metal);
  if (rest().length > 1 && metals.length === 1) {
    const m = metals[0];
    for (const a of POLYATOMIC) {
      const ion = parseFormula(a.formula).atoms;
      const k = n([...ion.keys()][0]) / [...ion.values()][0];
      const fits = Number.isInteger(k) && els.every((el) => el === m || (ion.has(el) && n(el) === k * ion.get(el)!));
      if (fits && ion.size === els.length - 1) {
        on.set(m, (charge - k * a.charge) / n(m) + 0);
        break;
      }
    }
  }
  while (rest().length > 1) {
    const next = NEGATIVE.find(([el]) => rest().includes(el));
    if (!next) throw new OxidationNumberError(`The rules do not decide the oxidation numbers in ${text}.`);
    on.set(next[0], next[1]);
  }
  const [last] = rest();
  if (last) on.set(last, (charge - known()) / n(last) + 0);
  else if (known() !== charge) throw new OxidationNumberError(`The oxidation numbers in ${text} do not add up to its charge.`);
  return new Map(els.map((el) => [el, on.get(el)!]));
}

/** The oxidation number of one element in a formula or ion. */
export function oxidationNumber(text: string, el: string): number {
  const v = oxidationNumbers(text).get(el);
  if (v === undefined) throw new OxidationNumberError(`${text} has no ${el}.`);
  return v;
}

// ---------------------------------------------------------------------------- equations with electrons

/** The electron, as a half-reaction writes it. */
export const ELECTRON = 'e-';
/** A coefficient and a formula (`e-` for electrons). */
export type Term = [number, string];
/** An equation or half-reaction: the terms on each side, in order. */
export interface Equation {
  left: Term[];
  right: Term[];
}

const atomsOf = (f: string) => (f === ELECTRON ? new Map<string, number>() : parseFormula(f).atoms);
const chargeOf = (f: string) => (f === ELECTRON ? -1 : parseFormula(f).charge);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

/** Whether the atoms of every element and the charge (electrons included) are the same on both sides. */
export function isBalancedEquation(eq: Equation): boolean {
  const atoms = new Map<string, number>();
  let charge = 0;
  const add = (terms: Term[], sign: number) => {
    for (const [k, f] of terms) {
      for (const [el, c] of atomsOf(f)) atoms.set(el, (atoms.get(el) ?? 0) + sign * k * c);
      charge += sign * k * chargeOf(f);
    }
  };
  add(eq.left, 1);
  add(eq.right, -1);
  return charge === 0 && [...atoms.values()].every((v) => v === 0);
}

/** The equation inside `\ce{}`: `MnO4^- + 8H^+ + 5e- -> Mn^2+ + 4H2O`, with optional states by formula. */
export function equationCe(eq: Equation, states: Record<string, string> = {}): string {
  const side = (terms: Term[]) => terms.map(([k, f]) => `${k === 1 ? '' : k}${f}${states[f] ? `(${states[f]})` : ''}`).join(' + ');
  return `${side(eq.left)} -> ${side(eq.right)}`;
}

/** Adds up the same formula on one side and leaves out zero terms, keeping the first order. */
function tidy(terms: Term[]): Term[] {
  const out: Term[] = [];
  for (const [k, f] of terms) {
    const t = out.find((x) => x[1] === f);
    if (t) t[0] += k;
    else out.push([k, f]);
  }
  return out.filter(([k]) => k > 0);
}

/** The number of electrons in a half-reaction, and the side they are on. */
export function electronsIn(eq: Equation): { n: number; side: 'left' | 'right' } {
  const l = eq.left.find(([, f]) => f === ELECTRON);
  const r = eq.right.find(([, f]) => f === ELECTRON);
  if (l) return { n: l[0], side: 'left' };
  if (r) return { n: r[0], side: 'right' };
  return { n: 0, side: 'left' };
}

export interface HalfBalance {
  /** The half-reaction after each step: other atoms, oxygen (water), hydrogen (hydrogen ions), charge (electrons). */
  atoms: Equation;
  oxygen: Equation;
  hydrogen: Equation;
  half: Equation;
  /** The element (or elements) balanced first. */
  key: string[];
  water: { n: number; side: 'left' | 'right' };
  hydrogenIons: { n: number; side: 'left' | 'right' };
  electrons: { n: number; side: 'left' | 'right' };
  kind: 'oxidation' | 'reduction';
}

/**
 * Balances the half-reaction `from -> to` in acidic solution, as students are taught: the atoms
 * other than O and H, then O with water, H with hydrogen ions, and the charge with electrons.
 */
export function balanceHalf(from: string, to: string): HalfBalance {
  const [fa, ta] = [atomsOf(from), atomsOf(to)];
  const all = [...new Set([...fa.keys(), ...ta.keys()])];
  const others = all.filter((el) => el !== 'O' && el !== 'H');
  const key = others.length ? others : all.includes('O') ? ['O'] : ['H'];
  const cf = (el: string) => fa.get(el) ?? 0;
  const ct = (el: string) => ta.get(el) ?? 0;
  if (key.some((el) => !cf(el) || !ct(el))) throw new Error(`${key.join(', ')} must be on both sides of ${from} -> ${to}.`);
  const g = gcd(cf(key[0]), ct(key[0]));
  const a = ct(key[0]) / g;
  const b = cf(key[0]) / g;
  if (key.some((el) => a * cf(el) !== b * ct(el))) throw new Error(`The atoms of ${from} -> ${to} cannot be balanced.`);
  const atoms: Equation = { left: [[a, from]], right: [[b, to]] };
  // Oxygen: water on the side with less oxygen.
  const dO = a * cf('O') - b * ct('O');
  const water = { n: Math.abs(dO), side: (dO > 0 ? 'right' : 'left') as 'left' | 'right' };
  const withWater = (eq: Equation): Equation => (water.n ? { ...eq, [water.side]: [...eq[water.side], [water.n, 'H2O']] } : eq);
  const oxygen = withWater(atoms);
  // Hydrogen: hydrogen ions on the side with less hydrogen.
  const hOf = (terms: Term[]) => terms.reduce((s, [k, f]) => s + k * (atomsOf(f).get('H') ?? 0), 0);
  const dH = hOf(oxygen.left) - hOf(oxygen.right);
  const hydrogenIons = { n: Math.abs(dH), side: (dH > 0 ? 'right' : 'left') as 'left' | 'right' };
  const hydrogen: Equation = hydrogenIons.n ? { ...oxygen, [hydrogenIons.side]: [...oxygen[hydrogenIons.side], [hydrogenIons.n, 'H^+']] } : oxygen;
  // Charge: electrons on the more positive side.
  const qOf = (terms: Term[]) => terms.reduce((s, [k, f]) => s + k * chargeOf(f), 0);
  const dQ = qOf(hydrogen.left) - qOf(hydrogen.right);
  if (!dQ) throw new Error(`${from} -> ${to} is not an oxidation or a reduction.`);
  const electrons = { n: Math.abs(dQ), side: (dQ > 0 ? 'left' : 'right') as 'left' | 'right' };
  const raw: Equation = { ...hydrogen, [electrons.side]: [...hydrogen[electrons.side], [electrons.n, ELECTRON]] };
  const half: Equation = { left: tidy(raw.left), right: tidy(raw.right) };
  return { atoms, oxygen: tidy2(oxygen), hydrogen: tidy2(hydrogen), half, key, water, hydrogenIons, electrons, kind: electrons.side === 'left' ? 'reduction' : 'oxidation' };
}
const tidy2 = (eq: Equation): Equation => ({ left: tidy(eq.left), right: tidy(eq.right) });

/** Multiplies every coefficient of an equation. */
export const scaleEquation = (eq: Equation, k: number): Equation => ({ left: eq.left.map(([c, f]) => [c * k, f]), right: eq.right.map(([c, f]) => [c * k, f]) });

export interface Combined {
  /** What each half-reaction is multiplied by so the electrons lost equal the electrons gained. */
  oxFactor: number;
  redFactor: number;
  /** Electrons transferred in the overall equation. */
  electrons: number;
  /** The two multiplied half-reactions added, before anything cancels. */
  sum: Equation;
  /** The balanced redox equation: species on both sides cancelled, no electrons left. */
  overall: Equation;
}

/**
 * Adds an oxidation and a reduction half-reaction: each is multiplied so the electrons match, then
 * electrons, water and hydrogen ions that appear on both sides cancel. The reduction's reactant
 * comes first on the left, and its product first on the right.
 */
export function combineHalves(ox: Equation, red: Equation): Combined {
  const eo = electronsIn(ox);
  const er = electronsIn(red);
  if (eo.side !== 'right' || er.side !== 'left' || !eo.n || !er.n) throw new Error('Pass an oxidation, then a reduction.');
  const l = (eo.n * er.n) / gcd(eo.n, er.n);
  const oxFactor = l / eo.n;
  const redFactor = l / er.n;
  const o = scaleEquation(ox, oxFactor);
  const r = scaleEquation(red, redFactor);
  const first = (terms: Term[]) => terms.slice(0, 1);
  const rest = (terms: Term[]) => terms.slice(1);
  const sum: Equation = { left: [...first(r.left), ...first(o.left), ...rest(r.left), ...rest(o.left)], right: [...first(r.right), ...first(o.right), ...rest(r.right), ...rest(o.right)] };
  const left = tidy(sum.left);
  const right = tidy(sum.right);
  for (const t of left) {
    const u = right.find((x) => x[1] === t[1]);
    if (!u) continue;
    const m = Math.min(t[0], u[0]);
    t[0] -= m;
    u[0] -= m;
  }
  return { oxFactor, redFactor, electrons: l, sum: { left: tidy(sum.left), right: tidy(sum.right) }, overall: { left: left.filter(([k]) => k > 0), right: right.filter(([k]) => k > 0) } };
}

/** The reverse of a half-reaction: a reduction read from right to left is an oxidation. */
export const reverseEquation = (eq: Equation): Equation => ({ left: eq.right.map(([k, f]) => [k, f]), right: eq.left.map(([k, f]) => [k, f]) });

// ---------------------------------------------------------------------------- standard reduction potentials

export interface ReductionHalf {
  /** A short name for the couple: `Cu` for Cu²⁺/Cu, `Fe3` for Fe³⁺/Fe²⁺, `H2O` for water reduced to hydrogen. */
  key: string;
  /** The reduction half-reaction with states, inside `\ce{}`: `Cu^2+(aq) + 2e- -> Cu(s)`. */
  text: string;
  /** The half-reaction without states, as an equation. */
  eq: Equation;
  /** The standard reduction potential at 25 °C, in volts. */
  E: number;
  /** The oxidising agent (first on the left) and the reducing agent (first on the right), as formulas. */
  oa: string;
  ra: string;
  /** The same with their states: `Cu^2+(aq)`, `Cu(s)`. */
  oaState: string;
  raState: string;
  /** The state of each formula in the half-reaction: `{ 'Cu^2+': 'aq', Cu: 's' }`. */
  states: Record<string, string>;
  electrons: number;
}

/** One side of a half-reaction as a data table writes it: `2H2O(l) + 2e-`. */
function readSide(side: string): Array<{ k: number; f: string; state: string }> {
  return side.split(' + ').map((t) => {
    const m = /^(\d*)(.+?)(?:\((aq|s|l|g)\))?$/.exec(t.trim())!;
    return { k: m[1] ? Number(m[1]) : 1, f: m[2], state: m[3] ?? '' };
  });
}

function half(key: string, text: string, E: number): ReductionHalf {
  const [l, r] = text.split(' -> ').map(readSide);
  const eq: Equation = { left: l.map((t) => [t.k, t.f]), right: r.map((t) => [t.k, t.f]) };
  const withState = (t: { f: string; state: string }) => `${t.f}${t.state ? `(${t.state})` : ''}`;
  const states = Object.fromEntries([...l, ...r].filter((t) => t.state).map((t) => [t.f, t.state]));
  return { key, text, eq, E, oa: l[0].f, ra: r[0].f, oaState: withState(l[0]), raState: withState(r[0]), states, electrons: electronsIn(eq).n };
}

/**
 * Standard reduction potentials at 25 °C, to two decimal places, strongest oxidising agent first
 * (and so weakest reducing agent first).
 */
export const REDUCTION_TABLE: ReductionHalf[] = [
  half('F2', 'F2(g) + 2e- -> 2F^-(aq)', 2.87),
  half('H2O2', 'H2O2(aq) + 2H^+(aq) + 2e- -> 2H2O(l)', 1.78),
  half('MnO4', 'MnO4^-(aq) + 8H^+(aq) + 5e- -> Mn^2+(aq) + 4H2O(l)', 1.51),
  half('Au', 'Au^3+(aq) + 3e- -> Au(s)', 1.5),
  half('Cl2', 'Cl2(g) + 2e- -> 2Cl^-(aq)', 1.36),
  half('Cr2O7', 'Cr2O7^2-(aq) + 14H^+(aq) + 6e- -> 2Cr^3+(aq) + 7H2O(l)', 1.33),
  half('O2', 'O2(g) + 4H^+(aq) + 4e- -> 2H2O(l)', 1.23),
  half('Br2', 'Br2(l) + 2e- -> 2Br^-(aq)', 1.07),
  half('NO3', 'NO3^-(aq) + 4H^+(aq) + 3e- -> NO(g) + 2H2O(l)', 0.96),
  half('Hg', 'Hg^2+(aq) + 2e- -> Hg(l)', 0.85),
  half('Ag', 'Ag^+(aq) + e- -> Ag(s)', 0.8),
  half('Fe3', 'Fe^3+(aq) + e- -> Fe^2+(aq)', 0.77),
  half('I2', 'I2(s) + 2e- -> 2I^-(aq)', 0.54),
  half('Cu', 'Cu^2+(aq) + 2e- -> Cu(s)', 0.34),
  half('Sn4', 'Sn^4+(aq) + 2e- -> Sn^2+(aq)', 0.15),
  half('H', '2H^+(aq) + 2e- -> H2(g)', 0),
  half('Pb', 'Pb^2+(aq) + 2e- -> Pb(s)', -0.13),
  half('Sn', 'Sn^2+(aq) + 2e- -> Sn(s)', -0.14),
  half('Ni', 'Ni^2+(aq) + 2e- -> Ni(s)', -0.26),
  half('Co', 'Co^2+(aq) + 2e- -> Co(s)', -0.28),
  half('Cd', 'Cd^2+(aq) + 2e- -> Cd(s)', -0.4),
  half('Fe', 'Fe^2+(aq) + 2e- -> Fe(s)', -0.45),
  half('Cr', 'Cr^3+(aq) + 3e- -> Cr(s)', -0.74),
  half('Zn', 'Zn^2+(aq) + 2e- -> Zn(s)', -0.76),
  half('H2O', '2H2O(l) + 2e- -> H2(g) + 2OH^-(aq)', -0.83),
  half('Mn', 'Mn^2+(aq) + 2e- -> Mn(s)', -1.18),
  half('Al', 'Al^3+(aq) + 3e- -> Al(s)', -1.66),
  half('Mg', 'Mg^2+(aq) + 2e- -> Mg(s)', -2.37),
  half('Na', 'Na^+(aq) + e- -> Na(s)', -2.71),
  half('Ca', 'Ca^2+(aq) + 2e- -> Ca(s)', -2.87),
  half('Ba', 'Ba^2+(aq) + 2e- -> Ba(s)', -2.91),
  half('K', 'K^+(aq) + e- -> K(s)', -2.93),
  half('Li', 'Li^+(aq) + e- -> Li(s)', -3.04),
];

/** A couple from the table by its key. */
export function reductionHalf(key: string): ReductionHalf {
  const h = REDUCTION_TABLE.find((x) => x.key === key);
  if (!h) throw new Error(`No half-reaction ${key} in the table.`);
  return h;
}

/** A cell potential, E°cathode − E°anode, to two decimal places. */
export const cellPotential = (cathode: number, anode: number) => Math.round((cathode - anode) * 100) / 100 + 0;
