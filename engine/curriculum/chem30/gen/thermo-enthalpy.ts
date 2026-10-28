/**
 * Grade 12 Chemistry, Unit 1 (lessons 1.5 to 1.7): Hess's law, formation equations and enthalpies of
 * formation, and activation energy and catalysts on potential energy diagrams. Every enthalpy change
 * comes from the formation table in thermo-data.ts, so the equations of a Hess's law question add
 * up exactly to its answer.
 */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { parseFormula } from '../../../chem/formula.ts';
import { roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import {
  $, answer, br, coefPlain, coefTex, DH, DHF, DHR0, dHf, dHr, dpFor, eqCe, eqMd, formationTable, isDiatomic, isElement, kJ, kJSigned, L, mm,
  mmText, nameOf, parseEq, peFigure, pickProfile, q, scaled, scaleEq, sf, sig, signed, standardElement, t1, w, type Eq, type Term,
} from './thermo-data.ts';

const A2 = ['12-A2'];
const WITH_SIGN = 'Give it with its sign';

// ---------------------------------------------------------------------------- lesson 1.5: reversing and multiplying equations

const BASE: Eq[] = [
  '2H2(g) + O2(g) -> 2H2O(g)', 'N2(g) + 3H2(g) -> 2NH3(g)', '2SO2(g) + O2(g) -> 2SO3(g)', 'CaCO3(s) -> CaO(s) + CO2(g)', 'N2(g) + O2(g) -> 2NO(g)',
  'N2(g) + 2O2(g) -> 2NO2(g)', 'C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)', '2CO(g) + O2(g) -> 2CO2(g)', '2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(s)',
  '2H2O(l) -> 2H2(g) + O2(g)', '2HgO(s) -> 2Hg(l) + O2(g)', 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)', 'H2(g) + Cl2(g) -> 2HCl(g)', '2Mg(s) + O2(g) -> 2MgO(s)',
  'C(s) + H2O(g) -> CO(g) + H2(g)', 'CaO(s) + H2O(l) -> Ca(OH)2(s)', 'C2H4(g) + H2(g) -> C2H6(g)', '4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)', 'N2O4(g) -> 2NO2(g)',
  '2NaHCO3(s) -> Na2CO3(s) + H2O(g) + CO2(g)', '2H2O2(l) -> 2H2O(l) + O2(g)',
].map(parseEq);

/** What was done to an equation, in words: "Reverse it and multiply it by 2". */
function action(k: number): string {
  const m = Math.abs(k);
  const times = m === 1 ? '' : `multiply it by $${coefTex(m)}$`;
  if (k === 1) return 'Keep it as it is';
  if (k === -1) return 'Reverse it';
  return k < 0 ? `Reverse it and ${times}` : `${times[0].toUpperCase()}${times.slice(1)}`;
}
/** The same, as a multiple-choice answer about an equation already changed. */
function done(k: number): string {
  const m = Math.abs(k);
  if (k === -1) return 'It was reversed.';
  return k < 0 ? `It was reversed and multiplied by $${coefTex(m)}$.` : `It was multiplied by $${coefTex(m)}$.`;
}
const dhLine = (e: Eq, dH: number) => `$\\ce{${eqCe(e)}}\\qquad ${DH} = ${signed(dH)}\\ \\text{kJ}$`;
/** k × ΔH as working: -(−483.6), 2 × (−483.6), \tfrac{1}{2} × (+66.4). */
const times = (k: number, dH: number) => (k === -1 ? `-(${signed(dH)})` : `${coefTex(k)} \\times (${signed(dH)})`);
/** A value with up to two decimals, as an exact working value. */
const v2 = (v: number) => {
  const r = roundTo(v, 2);
  return Math.abs(r * 10 - Math.round(r * 10)) < 1e-9 ? signed(r) : signed(r, 2);
};

function hessManipulate(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(BASE);
  const dH = dHr(e);
  const k = d === 1 ? rng.pick([-1, -1, 2, 3]) : d === 2 ? rng.pick([-2, -3, 0.5, -0.5]) : rng.pick([1.5, -1.5, -0.5, 0.5, -2, -3]);
  const target = scaleEq(e, k);
  const dHt = roundTo(k * dH, 2);
  const a = answer(dHt, 'kJ', 1, `$${DH} =$`);
  const rules = ['Reversing an equation changes the sign of $\\Delta H$.', 'Multiplying an equation by a number multiplies $\\Delta H$ by the same number.'];
  if (d < 3) {
    return {
      prompt: `${dhLine(e, dH)}\n\nWhat is $${DH}$ for $\\ce{${eqCe(target)}}$? ${WITH_SIGN}, to the nearest tenth.`,
      parts: [a.part],
      calculator: true,
      hints: ['Compare the new equation with the given one: is it reversed, and by what factor are the coefficients multiplied?', ...rules],
      solution: [`${action(k)}.`, `$${DH} = ${times(k, dH)} = ${v2(dHt)}\\ \\text{kJ}$`],
    };
  }
  const m = Math.abs(k);
  const options = [k, -k, ...(m === 1 ? [] : [k < 0 ? -1 / m : 1 / m, k < 0 ? 1 / m : -1 / m]), k < 0 ? -1 : 2, k < 0 ? -2 * m : 2 * m];
  const seen = new Set<number>();
  const distract = options.filter((x) => x !== k && !seen.has(x) && (seen.add(x), true)).map(done);
  return {
    prompt: `${dhLine(e, dH)}\n\nThe equation is changed into $\\ce{${eqCe(target)}}$. What was done to it, and what is $${DH}$ for the new equation? Give $${DH}$ with its sign, to the nearest tenth.`,
    parts: [part(mc(rng, done(k), distract), { label: 'The equation' }), a.part],
    calculator: true,
    hints: ['Check which substances moved to the other side of the arrow, then compare a coefficient in the new equation with the same substance in the old one.', ...rules],
    solution: [
      `The substances ${k < 0 ? 'have changed sides, so the equation was reversed' : 'are on the same sides, so the equation was not reversed'}. ${$(e.r[0].f)} goes from ${coefPlain(e.r[0].k)} to ${coefPlain(e.r[0].k * m)}, a factor of $${coefTex(m)}$.`,
      `$${DH} = ${times(k, dH)} = ${v2(dHt)}\\ \\text{kJ}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.5: combining equations

interface HessCase {
  target: string;
  given: string[];
  /** What each given equation is multiplied by (negative: reversed). */
  k: number[];
  level: 1 | 2 | 3;
}
const HESS: HessCase[] = [
  { target: 'N2(g) + 2O2(g) -> 2NO2(g)', given: ['N2(g) + O2(g) -> 2NO(g)', '2NO(g) + O2(g) -> 2NO2(g)'], k: [1, 1], level: 1 },
  { target: 'H2O(l) -> H2O(g)', given: ['H2(g) + 1/2 O2(g) -> H2O(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)'], k: [1, -1], level: 1 },
  { target: '2NO2(g) -> N2O4(g)', given: ['N2(g) + 2O2(g) -> 2NO2(g)', 'N2(g) + 2O2(g) -> N2O4(g)'], k: [-1, 1], level: 1 },
  { target: '2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(s)', given: ['2Al(s) + 3/2 O2(g) -> Al2O3(s)', '2Fe(s) + 3/2 O2(g) -> Fe2O3(s)'], k: [1, -1], level: 1 },
  { target: 'C(s) + 1/2 O2(g) -> CO(g)', given: ['C(s) + O2(g) -> CO2(g)', 'CO(g) + 1/2 O2(g) -> CO2(g)'], k: [1, -1], level: 1 },
  { target: 'C2H4(g) + H2O(l) -> C2H5OH(l)', given: ['C2H4(g) + 3O2(g) -> 2CO2(g) + 2H2O(l)', 'C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)'], k: [1, -1], level: 1 },
  { target: '2NO(g) + O2(g) -> 2NO2(g)', given: ['N2(g) + O2(g) -> 2NO(g)', 'N2(g) + 2O2(g) -> 2NO2(g)'], k: [-1, 1], level: 1 },
  { target: 'PbO(s) + CO(g) -> Pb(s) + CO2(g)', given: ['Pb(s) + 1/2 O2(g) -> PbO(s)', 'CO(g) + 1/2 O2(g) -> CO2(g)'], k: [-1, 1], level: 1 },
  { target: 'CuO(s) + H2(g) -> Cu(s) + H2O(g)', given: ['Cu(s) + 1/2 O2(g) -> CuO(s)', 'H2(g) + 1/2 O2(g) -> H2O(g)'], k: [-1, 1], level: 1 },
  { target: 'MgO(s) + 2HCl(g) -> MgCl2(s) + H2O(l)', given: ['Mg(s) + 2HCl(g) -> MgCl2(s) + H2(g)', 'Mg(s) + 1/2 O2(g) -> MgO(s)', 'H2(g) + 1/2 O2(g) -> H2O(l)'], k: [1, -1, 1], level: 2 },
  { target: '2S(s) + 3O2(g) -> 2SO3(g)', given: ['S(s) + O2(g) -> SO2(g)', '2SO2(g) + O2(g) -> 2SO3(g)'], k: [2, 1], level: 2 },
  { target: 'S(s) + 3/2 O2(g) -> SO3(g)', given: ['S(s) + O2(g) -> SO2(g)', '2SO2(g) + O2(g) -> 2SO3(g)'], k: [1, 0.5], level: 2 },
  { target: 'Fe2O3(s) + 3CO(g) -> 2Fe(s) + 3CO2(g)', given: ['2Fe(s) + 3/2 O2(g) -> Fe2O3(s)', 'CO(g) + 1/2 O2(g) -> CO2(g)'], k: [-1, 3], level: 2 },
  { target: '2H2O2(l) -> 2H2O(l) + O2(g)', given: ['H2(g) + O2(g) -> H2O2(l)', 'H2(g) + 1/2 O2(g) -> H2O(l)'], k: [-2, 2], level: 2 },
  { target: '2CO(g) + O2(g) -> 2CO2(g)', given: ['C(s) + 1/2 O2(g) -> CO(g)', 'C(s) + O2(g) -> CO2(g)'], k: [-2, 2], level: 2 },
  { target: '2C(s) + O2(g) -> 2CO(g)', given: ['C(s) + O2(g) -> CO2(g)', '2CO(g) + O2(g) -> 2CO2(g)'], k: [2, -1], level: 2 },
  { target: 'N2O4(g) -> 2NO2(g)', given: ['N2(g) + 2O2(g) -> N2O4(g)', '1/2 N2(g) + O2(g) -> NO2(g)'], k: [-1, 2], level: 2 },
  { target: '2PbO(s) + C(s) -> 2Pb(s) + CO2(g)', given: ['Pb(s) + 1/2 O2(g) -> PbO(s)', 'C(s) + O2(g) -> CO2(g)'], k: [-2, 1], level: 2 },
  { target: '2Fe(s) + 3CO2(g) -> Fe2O3(s) + 3CO(g)', given: ['2Fe(s) + 3/2 O2(g) -> Fe2O3(s)', '2CO(g) + O2(g) -> 2CO2(g)'], k: [1, -1.5], level: 2 },
  { target: 'C(s) + 2H2(g) -> CH4(g)', given: ['C(s) + O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)', 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)'], k: [1, 2, -1], level: 3 },
  { target: '3C(s) + 4H2(g) -> C3H8(g)', given: ['C(s) + O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)', 'C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)'], k: [3, 4, -1], level: 3 },
  { target: '2C(s) + H2(g) -> C2H2(g)', given: ['C(s) + O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)', '2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(l)'], k: [2, 1, -0.5], level: 3 },
  { target: 'C2H4(g) + H2(g) -> C2H6(g)', given: ['C2H4(g) + 3O2(g) -> 2CO2(g) + 2H2O(l)', 'H2(g) + 1/2 O2(g) -> H2O(l)', '2C2H6(g) + 7O2(g) -> 4CO2(g) + 6H2O(l)'], k: [1, 1, -0.5], level: 3 },
  { target: 'CaO(s) + CO2(g) -> CaCO3(s)', given: ['Ca(s) + 1/2 O2(g) -> CaO(s)', 'C(s) + O2(g) -> CO2(g)', 'Ca(s) + C(s) + 3/2 O2(g) -> CaCO3(s)'], k: [-1, -1, 1], level: 3 },
  { target: 'C(s) + H2O(g) -> CO(g) + H2(g)', given: ['C(s) + O2(g) -> CO2(g)', '2CO(g) + O2(g) -> 2CO2(g)', '2H2(g) + O2(g) -> 2H2O(g)'], k: [1, -0.5, -0.5], level: 3 },
  { target: '4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)', given: ['N2(g) + 3H2(g) -> 2NH3(g)', 'N2(g) + O2(g) -> 2NO(g)', '2H2(g) + O2(g) -> 2H2O(g)'], k: [-2, 2, 3], level: 3 },
  { target: 'CS2(l) + 3O2(g) -> CO2(g) + 2SO2(g)', given: ['C(s) + O2(g) -> CO2(g)', 'S(s) + O2(g) -> SO2(g)', 'C(s) + 2S(s) -> CS2(l)'], k: [1, 2, -1], level: 3 },
  { target: 'CO(g) + 2H2(g) -> CH3OH(l)', given: ['CO(g) + 1/2 O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)', 'CH3OH(l) + 3/2 O2(g) -> CO2(g) + 2H2O(l)'], k: [1, 2, -1], level: 3 },
  { target: '2C(s) + 3H2(g) + 1/2 O2(g) -> C2H5OH(l)', given: ['C(s) + O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)', 'C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)'], k: [2, 3, -1], level: 3 },
  { target: '6C(s) + 3H2(g) -> C6H6(l)', given: ['C(s) + O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(l)', '2C6H6(l) + 15O2(g) -> 12CO2(g) + 6H2O(l)'], k: [6, 3, -0.5], level: 3 },
  { target: 'CH4(g) + H2O(g) -> CO(g) + 3H2(g)', given: ['CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)', 'CO(g) + 1/2 O2(g) -> CO2(g)', 'H2(g) + 1/2 O2(g) -> H2O(g)'], k: [1, -1, -3], level: 3 },
  { target: '2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(g)', given: ['CH3OH(l) + 3/2 O2(g) -> CO2(g) + 2H2O(l)', 'H2O(l) -> H2O(g)'], k: [2, 4], level: 2 },
];

/** Species that appear among the changed equations but not in the target: they cancel. */
function cancelled(parts: Array<[Eq, number]>, target: Eq): string[] {
  const inTarget = new Set([...target.r, ...target.p].map((t) => t.f));
  const all = new Set(parts.flatMap(([e]) => [...e.r, ...e.p].map((t) => t.f)));
  return [...all].filter((f) => !inTarget.has(f));
}

function hessCombine(rng: Rng, d: Difficulty): GenOutput {
  const h = rng.pick(HESS.filter((x) => x.level === d));
  const order = rng.shuffle(h.given.map((_, i) => i));
  const given = order.map((i) => ({ e: parseEq(h.given[i]), k: h.k[i] }));
  const target = parseEq(h.target);
  const shown = given.map((g, i) => `(${i + 1}) ${dhLine(g.e, dHr(g.e))}`);
  const terms = given.map((g) => roundTo(g.k * dHr(g.e), 2));
  const total = roundTo(terms.reduce((s, v) => s + v, 0), 2);
  const a = answer(total, 'kJ', 1, `$${DH} =$`);
  const gone = cancelled(given.map((g) => [scaleEq(g.e, g.k), 1] as [Eq, number]), target);
  const hints = [
    'Arrange each given equation so that its substances are on the same side as in the target equation: reverse an equation if needed, and change the sign of its $\\Delta H$.',
    'Multiply an equation, and its $\\Delta H$, so that the coefficients match the target.',
    ...(d === 3 ? ['Start with a substance that appears in only one given equation. Substances that are not in the target must cancel when you add.'] : ['Add the equations and their $\\Delta H$ values; anything not in the target cancels.']),
  ];
  return {
    prompt: `Use these equations:\n\n${shown.join('\n\n')}\n\nFind $${DH}$ for $\\ce{${h.target}}$. ${WITH_SIGN}, to the nearest tenth.`,
    parts: [a.part],
    calculator: true,
    hints,
    solution: [
      ...given.map((g, i) => `(${i + 1}) ${action(g.k)}: ${dhLine(scaleEq(g.e, g.k), roundTo(g.k * dHr(g.e), 2))}`),
      `Add the equations${gone.length ? `: ${gone.map((f) => $(f)).join(', ')} cancel${gone.length === 1 ? 's' : ''}` : ''}, leaving $\\ce{${h.target}}$.`,
      `$${DH} = ${terms.map((v, i) => (i === 0 ? v2(v) : v < 0 ? `- ${v2(-v).replace('+', '')}` : `+ ${v2(v).replace('+', '')}`)).join(' ')} = ${v2(total)}\\ \\text{kJ}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.6: formation equations

const FORM_COMPOUNDS = [
  'H2O(l)', 'CO2(g)', 'CO(g)', 'CH4(g)', 'C2H6(g)', 'C3H8(g)', 'C2H4(g)', 'C2H2(g)', 'C6H6(l)', 'CH3OH(l)', 'C2H5OH(l)', 'C6H12O6(s)', 'CH3COOH(l)',
  'NH3(g)', 'NO(g)', 'NO2(g)', 'HNO3(l)', 'HCl(g)', 'H2O2(l)', 'Fe2O3(s)', 'Al2O3(s)', 'CaCO3(s)', 'CaO(s)', 'Ca(OH)2(s)', 'MgO(s)', 'NaCl(s)', 'NaOH(s)',
  'NaHCO3(s)', 'Na2CO3(s)', 'CuO(s)', 'ZnO(s)', 'PbO(s)', 'HgO(s)', 'NH4Cl(s)', 'NH4NO3(s)', 'KClO3(s)', 'KCl(s)', 'MgCl2(s)', 'AlCl3(s)', 'AgCl(s)', 'KI(s)', 'NaBr(s)',
];
const bareF = (f: string) => f.replace(/\((s|l|g|aq)\)$/, '');
const stateOf = (f: string) => /\((s|l|g|aq)\)$/.exec(f)![1];

/** The formation equation of a compound: its elements in their standard states, one mole of product. */
export function formationEq(f: string): Eq {
  const r: Term[] = [...parseFormula(bareF(f)).atoms].map(([el, n]) => ({ k: isDiatomic(el) ? n / 2 : n, f: standardElement(el) }));
  return { r, p: [{ k: 1, f }] };
}
/** The same reactants written as single atoms: 4H(g) instead of 2H2(g). */
function asAtoms(e: Eq): Eq {
  return { r: e.r.map((t) => (/^[A-Z][a-z]?2\(/.test(t.f) ? { k: t.k * 2, f: `${t.f.replace(/2\(.*\)$/, '')}(g)` } : t)), p: e.p };
}
const SWAPS: Record<string, string> = { 'Br2(l)': 'Br2(g)', 'I2(s)': 'I2(g)', 'Hg(l)': 'Hg(g)', 'C(s)': 'C(g)', 'Na(s)': 'Na(l)' };
/** An element written in the wrong state, or null when the equation has none to swap. */
function wrongElementState(e: Eq): Eq | null {
  return e.r.some((t) => SWAPS[t.f]) ? { r: e.r.map((t) => (SWAPS[t.f] ? { k: t.k, f: SWAPS[t.f] } : t)), p: e.p } : null;
}
/** A slip in a state: an element, or else the product, in the wrong state. */
function wrongState(e: Eq): Eq {
  const el = wrongElementState(e);
  if (el) return el;
  const p = e.p[0].f;
  const s = stateOf(p);
  const to = s === 'l' ? 'g' : s === 'g' ? 'l' : 'aq';
  return { r: e.r, p: [{ k: 1, f: `${bareF(p)}(${to})` }] };
}
const hasFraction = (e: Eq) => e.r.some((t) => !Number.isInteger(t.k));
const reversed = (e: Eq): Eq => ({ r: e.p, p: e.r });
/** A one-line reason an equation is not a formation equation. */
const NOT_FORMATION = [
  'CO(g) + 1/2 O2(g) -> CO2(g)', 'CaO(s) + CO2(g) -> CaCO3(s)', 'NO(g) + 1/2 O2(g) -> NO2(g)', 'CaO(s) + H2O(l) -> Ca(OH)2(s)', 'C2H4(g) + H2(g) -> C2H6(g)',
  'NH3(g) + HCl(g) -> NH4Cl(s)', 'MgO(s) + CO2(g) -> MgCO3(s)',
];

function formationEquation(rng: Rng, d: Difficulty): GenOutput {
  const rules = ['A formation equation makes exactly one mole of the compound, so fractions are allowed in front of the elements.', 'Its reactants are the elements in their standard states at SATP: diatomic gases such as $\\ce{H2(g)}$, $\\ce{O2(g)}$ and $\\ce{Cl2(g)}$, $\\ce{Br2(l)}$, $\\ce{I2(s)}$, $\\ce{Hg(l)}$, carbon as $\\ce{C(s)}$, and the other metals as solids.'];
  const f = rng.pick(FORM_COMPOUNDS);
  const e = formationEq(f);
  if (d === 1) {
    const pool = [scaleEq(e, 2), asAtoms(e), reversed(e), wrongState(e)];
    return {
      prompt: `Which is the formation equation of ${nameOf(f)}, ${$(f)}?`,
      parts: [part(mc(rng, eqMd(e), rng.shuffle(pool).map(eqMd)))],
      hints: rules,
      solution: [`One mole of ${$(f)} forms from its elements in their standard states: ${listOf(e.r)}.`, eqMd(e)],
    };
  }
  if (d === 2) {
    const boxes = e.r.map((t) => `\\square\\,\\ce{${t.f}}`).join(' + ');
    const parts: Part[] = e.r.map((t) => ({ ...numPart(t.k, { label: `$\\ce{${t.f}}$` }) }));
    return {
      prompt: `Complete the formation equation of ${nameOf(f)} by giving the coefficient of each element. Write 1 for a coefficient of one, and use a fraction such as 1/2 or 3/2 where one is needed.\n\n$${boxes} \\mathrel{\\ce{->}} \\ce{${f}}$`,
      parts,
      hints: ['Count the atoms of each element in one formula unit of the compound.', 'A diatomic element brings two atoms per molecule, so it needs half as many molecules as atoms.'],
      solution: [`One ${$(f)} has ${[...parseFormula(bareF(f)).atoms].map(([el, n]) => `${n} ${el}`).join(', ')}.`, eqMd(e)],
    };
  }
  if (rng.chance(0.6)) {
    const others = rng.shuffle(FORM_COMPOUNDS.filter((x) => x !== f));
    const nRight = rng.int(1, 3);
    const right = [e, ...others.slice(0, nRight - 1).map(formationEq)];
    const g = formationEq(others[3]);
    const swap = wrongElementState(formationEq(others[5])) ?? wrongElementState(formationEq(rng.pick(['CH4(g)', 'C2H5OH(l)', 'CaCO3(s)', 'NaCl(s)', 'NaBr(s)']))) ;
    const wrongPool = [hasFraction(g) ? scaleEq(g, 2) : reversed(g), asAtoms(formationEq(others[4])), swap!, parseEq(rng.pick(NOT_FORMATION)), reversed(formationEq(others[6]))];
    const wrong = rng.shuffle(wrongPool).slice(0, 5 - nRight);
    return {
      prompt: 'Select every equation that is a standard formation equation.',
      parts: [part(multi(rng, [...right.map((x) => ({ md: eqMd(x), correct: true })), ...wrong.map((x) => ({ md: eqMd(x), correct: false }))]))],
      hints: [...rules, 'Check each equation: are all the reactants elements, in their standard states, and is exactly one mole of a single compound formed?'],
      solution: [
        ...right.map((x) => `${eqMd(x)}: a formation equation.`),
        ...wrong.map((x) => `${eqMd(x)}: not a formation equation, because ${whyNot(x)}.`),
      ],
    };
  }
  const STD = ['O2(g)', 'H2(g)', 'N2(g)', 'Cl2(g)', 'Br2(l)', 'I2(s)', 'Hg(l)', 'C(s)', 'Na(s)', 'Fe(s)', 'Al(s)', 'Cu(s)'];
  const NOT_STD = ['O(g)', 'O3(g)', 'H(g)', 'Br2(g)', 'I2(g)', 'Cl(g)', 'Hg(g)', 'Na(l)', 'H2O(l)', 'CO2(g)', 'C(g)', 'N(g)'];
  const nRight = rng.int(2, 3);
  const opts = [...rng.shuffle(STD).slice(0, nRight).map((x) => ({ md: $(x), correct: true })), ...rng.shuffle(NOT_STD).slice(0, 6 - nRight).map((x) => ({ md: $(x), correct: false }))];
  return {
    prompt: `At SATP, which of these have a standard enthalpy of formation, $${DHF}$, of zero? Select every one.`,
    parts: [part(multi(rng, opts))],
    hints: ['$\\Delta_f H^\\circ$ is zero only for an element in its standard state: the form it takes at SATP.', 'Oxygen, hydrogen, nitrogen and the halogens are diatomic; bromine is a liquid and iodine a solid; mercury is a liquid; the other metals and carbon are solids.'],
    solution: [`Zero: ${opts.filter((o) => o.correct).map((o) => o.md).join(', ')}, which are elements in their standard states.`, `Not zero: ${opts.filter((o) => !o.correct).map((o) => o.md).join(', ')}, which are not elements in their standard states.`],
  };
}
const listOf = (ts: Term[]) => ts.map((t) => `$\\ce{${t.f}}$`).join(', ');
/** Why an equation is not a formation equation. */
function whyNot(e: Eq): string {
  const single = (f: string) => parseFormula(bareF(f)).atoms.size === 1;
  if (e.p.length > 1) return 'it is a decomposition into elements, the reverse of a formation';
  if (e.r.some((t) => !single(t.f))) return 'a reactant is a compound, not an element';
  if (e.r.some((t) => !isElement(t.f))) return 'an element is not written in its standard state';
  if (e.p[0].k !== 1) return 'it forms more than one mole of the compound';
  return 'the compound is not in the state asked for';
}

// ---------------------------------------------------------------------------- lesson 1.6: enthalpy of reaction from enthalpies of formation

const FORM_D1 = [
  'CaCO3(s) -> CaO(s) + CO2(g)', 'CaO(s) + H2O(l) -> Ca(OH)2(s)', 'C2H4(g) + H2(g) -> C2H6(g)', 'NH3(g) + HCl(g) -> NH4Cl(s)', 'CuO(s) + H2(g) -> Cu(s) + H2O(g)',
  'PbO(s) + CO(g) -> Pb(s) + CO2(g)', 'H2O(l) -> H2O(g)', 'C2H2(g) + H2(g) -> C2H4(g)', 'NH4Cl(s) -> NH3(g) + HCl(g)', 'ZnO(s) + CO(g) -> Zn(s) + CO2(g)',
  'CO(g) + H2O(g) -> CO2(g) + H2(g)', 'C(s) + H2O(g) -> CO(g) + H2(g)', 'SO3(g) + H2O(l) -> H2SO4(l)', 'CH4(g) + H2O(g) -> CO(g) + 3H2(g)',
].map(parseEq);
const FORM_D2 = [
  'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)', 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)', 'C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)', '2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(g)',
  '2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(g)', 'C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)', '2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(l)', 'C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l)',
  '2C2H6(g) + 7O2(g) -> 4CO2(g) + 6H2O(g)', '2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(g)', 'C2H4(g) + 3O2(g) -> 2CO2(g) + 2H2O(g)', '2C6H6(l) + 15O2(g) -> 12CO2(g) + 6H2O(l)',
  '4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)', '2SO2(g) + O2(g) -> 2SO3(g)', 'Fe2O3(s) + 3CO(g) -> 2Fe(s) + 3CO2(g)', '2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(s)',
  '2H2S(g) + 3O2(g) -> 2SO2(g) + 2H2O(g)', 'CS2(l) + 3O2(g) -> CO2(g) + 2SO2(g)', '2NaHCO3(s) -> Na2CO3(s) + H2O(g) + CO2(g)', '2H2O2(l) -> 2H2O(l) + O2(g)',
  '2NO(g) + O2(g) -> 2NO2(g)', 'N2O4(g) -> 2NO2(g)', 'CH3COOH(l) + 2O2(g) -> 2CO2(g) + 2H2O(l)', '3NO2(g) + H2O(l) -> 2HNO3(l) + NO(g)', '2KClO3(s) -> 2KCl(s) + 3O2(g)',
  'C12H22O11(s) + 12O2(g) -> 12CO2(g) + 11H2O(l)',
].map(parseEq);

/** The compounds of an equation for the data table, with the other state of water as a trap. */
function tableFor(e: Eq, rng: Rng, extra = true): string[] {
  const fs = [...new Set([...e.r, ...e.p].map((t) => t.f).filter((f) => !isElement(f)))];
  if (extra) {
    if (fs.includes('H2O(l)') && !fs.includes('H2O(g)')) fs.push('H2O(g)');
    else if (fs.includes('H2O(g)') && !fs.includes('H2O(l)')) fs.push('H2O(l)');
  }
  return rng.shuffle(fs);
}
/** "2(-393.5) + 3(-285.8)" for one side, leaving out elements. */
function sideWork(ts: Term[]): string {
  const bits = ts.filter((t) => !isElement(t.f)).map((t) => (t.k === 1 ? br(dHf(t.f)) : `${coefPlain(t.k)}(${t1(dHf(t.f))})`));
  return bits.length ? bits.join(' + ') : '0';
}
/** "Products: 2(-393.5) + 3(-285.8) = -1644.4 kJ", or just the value when there is one term. */
function sideLine(label: string, ts: Term[]): string {
  const compounds = ts.filter((t) => !isElement(t.f));
  const total = t1(sideSum(ts));
  return compounds.length === 1 && compounds[0].k === 1 ? `${label}: $${total}\\ \\text{kJ}$` : `${label}: $${sideWork(ts)} = ${total}\\ \\text{kJ}$`;
}
const sideSum = (ts: Term[]) => roundTo(ts.reduce((s, t) => s + t.k * dHf(t.f), 0), 2);
const ZERO_RULE = `The standard enthalpy of formation of an element in its standard state is $0\\ \\text{kJ/mol}$.`;
const formulaHint = `$${DHR0} = \\sum n${DHF}(\\text{products}) - \\sum n${DHF}(\\text{reactants})$`;

function formationDh(rng: Rng, d: Difficulty): GenOutput {
  const hints = [formulaHint, 'Multiply each enthalpy of formation by its coefficient; elements in their standard states count as zero.', 'Watch the state of water: $\\ce{H2O(l)}$ and $\\ce{H2O(g)}$ have different values.'];
  const work = (e: Eq) => [
    sideLine('Products', e.p),
    sideLine('Reactants', e.r),
    `$${DHR0} = ${t1(sideSum(e.p))} - ${br(sideSum(e.r))} = ${signed(dHr(e))}\\ \\text{kJ}$`,
  ];
  if (d < 3) {
    const e = rng.pick(d === 1 ? FORM_D1 : FORM_D2);
    const dH = dHr(e);
    const a = answer(dH, 'kJ', 1, `$${DHR0} =$`);
    return {
      prompt: `Use the standard enthalpies of formation in the table to find $${DHR0}$ for ${eqMd(e)}. ${WITH_SIGN}, to the nearest tenth. ${ZERO_RULE}`,
      figure: formationTable(tableFor(e, rng, d === 2)),
      parts: [a.part],
      calculator: true,
      hints,
      solution: work(e),
    };
  }
  if (rng.chance(0.5)) {
    const e = rng.pick(FORM_D2.filter((x) => x.r.some((t) => !isElement(t.f))));
    const unknown = rng.pick(e.r.filter((t) => !isElement(t.f) && t.f !== 'H2O(l)'));
    const dH = dHr(e);
    const val = dHf(unknown.f);
    const a = answer(val, 'kJ/mol', 1, `$${DHF}(\\ce{${unknown.f}}) =$`);
    const known = tableFor(e, rng, false).filter((f) => f !== unknown.f);
    const restR = e.r.filter((t) => t !== unknown);
    return {
      prompt: `For ${eqMd(e)}, $${DHR0} = ${signed(dH)}\\ \\text{kJ}$. Use this and the enthalpies of formation in the table to find the standard enthalpy of formation of ${nameOf(unknown.f)}, ${$(unknown.f)}. ${WITH_SIGN}, to the nearest tenth. ${ZERO_RULE}`,
      figure: formationTable(known),
      parts: [a.part],
      calculator: true,
      hints: [formulaHint, `Write the equation with $${DHF}(\\ce{${unknown.f}})$ as the unknown, then solve for it.`, unknown.k === 1 ? 'The unknown appears once in the reactants, with a minus sign in front of it.' : `The unknown is multiplied by its coefficient, ${unknown.k}.`],
      solution: [
        `$${signed(dH)} = [${sideWork(e.p)}] - [${unknown.k === 1 ? '' : unknown.k}x${restR.some((t) => !isElement(t.f)) ? ` + ${sideWork(restR)}` : ''}]$, where $x = ${DHF}(\\ce{${unknown.f}})$`,
        `$${unknown.k === 1 ? '' : unknown.k}x = ${t1(sideSum(e.p))}${sideSum(restR) === 0 ? '' : ` - ${br(sideSum(restR))}`} - ${br(dH)} = ${t1(unknown.k * val)}$`,
        ...(unknown.k === 1 ? [] : [`$x = \\dfrac{${t1(unknown.k * val)}}{${unknown.k}} = ${t1(val)}$`]),
        `$${DHF}(\\ce{${unknown.f}}) = ${signed(val)}\\ \\text{kJ/mol}$`,
      ],
    };
  }
  const e = rng.pick(FORM_D2.filter((x) => x.r.some((t) => !isElement(t.f) && !x.p.some((p) => p.f === t.f))));
  const fuel = rng.pick(e.r.filter((t) => !isElement(t.f)));
  const f = bareF(fuel.f);
  const M = mm(f);
  const m = sig(M * rng.float(0.1, 2.5, 3));
  const n = m / M;
  const dH = dHr(e);
  const dHx = (n / fuel.k) * dH;
  const a = answer(dHx, 'kJ', dpFor(dHx), '$\\Delta H =$');
  return {
    prompt: `Use the standard enthalpies of formation in the table to find the enthalpy change when ${q(sf(m), 'g')} of ${nameOf(fuel.f)}, ${$(fuel.f)}, reacts: ${eqMd(e)}. ${WITH_SIGN}, ${a.phrase}. ${ZERO_RULE} ${mmText(f)}.`,
    figure: formationTable(tableFor(e, rng)),
    parts: [a.part],
    calculator: true,
    hints: [formulaHint, `That gives $\\Delta H$ for ${fuel.k === 1 ? 'one mole' : `${fuel.k} mol`} of ${$(fuel.f)}. Find the molar enthalpy per mole of ${$(fuel.f)}.`, 'Then $\\Delta H = n\\Delta_r H_m$, with $n = \\dfrac{m}{M}$.'],
    solution: [
      ...work(e),
      ...(fuel.k === 1 ? [] : [`Per mole of $\\ce{${fuel.f}}$: $\\dfrac{${signed(dH)}}{${fuel.k}} = ${signed(dH / fuel.k, 2)}\\ \\text{kJ/mol}$`]),
      `$n = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`,
      `$\\Delta H = ${w(n)} \\times (${signed(dH / fuel.k, 2)}) = ${signed(Number(a.shown), dpFor(dHx))}\\ \\text{kJ}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.7: activation energy

const EA_F = '$E_a$ (forward)';
const EA_R = '$E_a$ (reverse)';

function activationEnergy(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick([10, 20, 25, 40, 50]);
  const u = pickProfile(rng, 9, 1);
  const e = scaled(u, s);
  const eaF = e.peak - e.R;
  const eaR = e.peak - e.P;
  const dH = e.P - e.R;
  const read = `Read each level against the scale: each grid line is ${kJ(s)}.`;
  const intro = 'The potential energy diagram shows a reaction.';
  const caption = 'Potential energy diagram of a reaction';
  if (d === 1) {
    const askPeak = rng.chance(0.3);
    return {
      prompt: `${intro} ${askPeak ? 'What is the potential energy of the activated complex?' : 'What is the activation energy of the forward reaction?'}`,
      figure: peFigure(s, [e], [], caption),
      parts: [numPart(askPeak ? e.peak : eaF, { decimals: 0, tolerance: 0, suffix: 'kJ' })],
      hints: askPeak ? ['The activated complex is at the top of the hump.', read] : ['The activation energy of the forward reaction is the climb from the reactants to the top of the hump.', read],
      solution: askPeak ? [`The top of the hump is at ${kJ(e.peak)}.`] : [`Reactants ${kJ(e.R)}; top of the hump ${kJ(e.peak)}.`, `$E_a(\\text{forward}) = ${e.peak} - ${e.R} = ${eaF}\\ \\text{kJ}$`],
    };
  }
  if (d === 2) {
    return {
      prompt: `${intro} Find the activation energies of the forward and reverse reactions, and $${DH}$ for the forward reaction (with its sign).`,
      figure: peFigure(s, [e], [], caption),
      parts: [
        numPart(eaF, { decimals: 0, tolerance: 0, suffix: 'kJ', label: EA_F }),
        numPart(eaR, { decimals: 0, tolerance: 0, suffix: 'kJ', label: EA_R }),
        numPart(dH, { decimals: 0, tolerance: 0, suffix: 'kJ', label: `$${DH} =$` }),
      ],
      hints: ['Forward: the climb from the reactants to the top. Reverse: the climb from the products to the top.', '$\\Delta H$ = products − reactants.', read],
      solution: [
        `Reactants ${kJ(e.R)}, top of the hump ${kJ(e.peak)}, products ${kJ(e.P)}.`,
        `$E_a(\\text{forward}) = ${e.peak} - ${e.R} = ${eaF}\\ \\text{kJ}$ and $E_a(\\text{reverse}) = ${e.peak} - ${e.P} = ${eaR}\\ \\text{kJ}$`,
        `$${DH} = ${e.P} - ${e.R} = ${signed(dH, 0)}\\ \\text{kJ}$`,
      ],
    };
  }
  const F = rng.int(4, 60) * 5;
  let H = rng.int(-60, 40) * 5;
  if (H === 0) H = -25;
  if (F + 0 <= H) H = -H;
  const R = F - H;
  const kind = rng.pick(['rev', 'fwd', 'dh'] as const);
  if (kind === 'rev') {
    return {
      prompt: `For a reaction, $E_a(\\text{forward}) = ${F}\\ \\text{kJ}$ and $${DH} = ${signed(H, 0)}\\ \\text{kJ}$. What is the activation energy of the reverse reaction, and is the reverse reaction exothermic or endothermic?`,
      parts: [numPart(R, { decimals: 0, tolerance: 0, suffix: 'kJ', label: EA_R }), part(fixedChoice(['Exothermic', 'Endothermic'], -H < 0 ? 0 : 1), { label: 'The reverse reaction is' })],
      hints: ['Sketch the potential energy diagram: reactants, the hump, products.', 'The top of the hump is $E_a(\\text{forward})$ above the reactants, and the products are $\\Delta H$ away from the reactants.', '$E_a(\\text{reverse})$ is the climb from the products to the top.'],
      solution: [`$E_a(\\text{reverse}) = E_a(\\text{forward}) - ${DH} = ${F} - ${br(H, 0)} = ${R}\\ \\text{kJ}$`, `The reverse reaction has $${DH} = ${signed(-H, 0)}\\ \\text{kJ}$, so it is ${-H < 0 ? 'exothermic' : 'endothermic'}.`],
    };
  }
  if (kind === 'fwd') {
    return {
      prompt: `For a reaction, $${DH} = ${signed(H, 0)}\\ \\text{kJ}$ and the activation energy of the reverse reaction is ${kJ(R)}. What is the activation energy of the forward reaction?`,
      parts: [numPart(F, { decimals: 0, tolerance: 0, suffix: 'kJ', label: EA_F })],
      hints: ['Sketch the potential energy diagram: reactants, the hump, products.', '$E_a(\\text{forward}) - E_a(\\text{reverse}) = \\Delta H$.'],
      solution: [`$E_a(\\text{forward}) = E_a(\\text{reverse}) + ${DH} = ${R} + ${br(H, 0)} = ${F}\\ \\text{kJ}$`],
    };
  }
  const lowest = Math.max(2, -H / 5 + 2);
  const reactants = rng.int(lowest, lowest + 38) * 5;
  return {
    prompt: `On a potential energy diagram, the reactants are at ${kJ(reactants)} and the activated complex at ${kJ(reactants + F)}. The activation energy of the reverse reaction is ${kJ(R)}. Find the potential energy of the products and $${DH}$ for the forward reaction.`,
    parts: [numPart(reactants + H, { decimals: 0, tolerance: 0, suffix: 'kJ', label: 'Products' }), numPart(H, { decimals: 0, tolerance: 0, suffix: 'kJ', label: `$${DH} =$` })],
    hints: ['The products are $E_a(\\text{reverse})$ below the activated complex.', '$\\Delta H$ = products − reactants.'],
    solution: [`Products: $${reactants + F} - ${R} = ${reactants + H}\\ \\text{kJ}$`, `$${DH} = ${reactants + H} - ${reactants} = ${signed(H, 0)}\\ \\text{kJ}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.7: catalysts

const CATALYST_QS: Array<{ ask: string; right: string; wrong: string[]; why: string }> = [
  {
    ask: 'How does a catalyst speed up a reaction?',
    right: 'It provides a different pathway with a lower activation energy.',
    wrong: ['It raises the temperature of the reacting particles.', 'It lowers the enthalpy change of the reaction.', 'It gives the reactant particles more kinetic energy.'],
    why: 'A catalyst offers another route from reactants to products, one with a lower hump.',
  },
  {
    ask: 'What does a catalyst do to the enthalpy change, $\\Delta H$, of a reaction?',
    right: 'Nothing: the reactants and products are unchanged, so $\\Delta H$ stays the same.',
    wrong: ['It makes $\\Delta H$ more negative.', 'It makes $\\Delta H$ less negative.', 'It changes the sign of $\\Delta H$.'],
    why: 'On the diagram, a catalyst lowers only the hump; the reactant and product levels do not move.',
  },
  {
    ask: 'At the same temperature, why does a lower activation energy make a reaction faster?',
    right: 'A larger fraction of collisions have enough energy to get over the lower barrier.',
    wrong: ['The particles move faster.', 'The particles collide less often but harder.', 'Each collision releases more energy, because $\\Delta H$ is larger.'],
    why: 'The particles have the same energies as before, but more of them now have at least the activation energy.',
  },
  {
    ask: 'Which statement about a catalyst is true?',
    right: 'It is not used up: it is still there, unchanged, when the reaction is over.',
    wrong: ['It is used up as the reaction takes place.', 'It changes which products form.', 'It works only for exothermic reactions.'],
    why: 'A catalyst takes part in the reaction pathway but is regenerated, so it is not consumed.',
  },
  {
    ask: 'In living cells, what are enzymes?',
    right: 'Biological catalysts that lower the activation energies of the reactions in cells.',
    wrong: ['Reactants that supply energy to the cell.', 'Substances that raise the temperature of the cell.', 'Products of respiration that store energy.'],
    why: 'Enzymes are proteins that act as catalysts, so cell reactions go quickly at body temperature.',
  },
  {
    ask: 'In a catalytic converter, harmful exhaust gases react on the surface of hot metals such as platinum. What do the metals do?',
    right: 'They lower the activation energy, so the gases react quickly.',
    wrong: ['They are oxidised and used up.', 'They make the reactions endothermic.', 'They make the enthalpy changes of the reactions larger.'],
    why: 'The metals are catalysts: they give a lower-energy pathway and are not used up.',
  },
];

function catalyst(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.25)) {
      const x = rng.int(2, 16) * 5;
      return {
        prompt: `A catalyst lowers the activation energy of the forward reaction by ${kJ(x)}. What happens to the activation energy of the reverse reaction?`,
        parts: [part(mc(rng, `It is also lowered by ${kJ(x)}.`, [`It is raised by ${kJ(x)}.`, 'It stays the same.', `It is lowered by ${kJ(2 * x)}.`]))],
        hints: ['Forward and reverse reactions share the same hump: the same activated complex.', 'A catalyst lowers the top of the hump; the reactant and product levels stay where they are.'],
        solution: ['The catalyst lowers the top of the hump, which both reactions must climb.', `The reactants and products do not move, so both activation energies fall by the same amount: ${kJ(x)}.`],
      };
    }
    const c = rng.pick(CATALYST_QS);
    return {
      prompt: c.ask,
      parts: [part(mc(rng, c.right, c.wrong))],
      hints: ['Picture the potential energy diagram with and without a catalyst.', 'A catalyst changes the pathway, not the starting point or the end point.'],
      solution: [c.why, c.right],
    };
  }
  const s = rng.pick([10, 20, 25, 50]);
  const u = pickProfile(rng, 8, 2);
  const lo = Math.max(u.R, u.P) + 1;
  const top = u.peak;
  const low = rng.int(lo, top - 1);
  const e = scaled(u, s);
  const without = { ...e, peak: top * s, color: 'muted' as const };
  const withCat = { ...e, peak: low * s };
  const dH = e.P - e.R;
  if (d === 2) {
    const read = `Read each level against the scale: each grid line is ${kJ(s)}.`;
    return {
      prompt: 'The potential energy diagram shows the same reaction without a catalyst (grey curve) and with a catalyst (coloured curve). Find the activation energies of the forward and reverse reactions with the catalyst. What does the catalyst do to $\\Delta H$?',
      figure: peFigure(s, [without, withCat], [{ x: 5, y: without.peak, label: 'no catalyst', color: 'muted' }, { x: 5, y: withCat.peak, label: 'catalyst' }], 'Potential energy diagram with and without a catalyst'),
      parts: [
        numPart(withCat.peak - e.R, { decimals: 0, tolerance: 0, suffix: 'kJ', label: `${EA_F}, catalysed` }),
        numPart(withCat.peak - e.P, { decimals: 0, tolerance: 0, suffix: 'kJ', label: `${EA_R}, catalysed` }),
        part(mc(rng, 'It stays the same', ['It becomes more negative', 'It becomes less negative', 'It changes sign']), { label: 'Effect on $\\Delta H$' }),
      ],
      hints: ['Use the lower hump for the catalysed reaction.', 'Forward: from the reactants up to the top. Reverse: from the products up to the top.', read],
      solution: [
        `With the catalyst the hump reaches ${kJ(withCat.peak)}; the reactants are at ${kJ(e.R)} and the products at ${kJ(e.P)}.`,
        `$E_a(\\text{forward}) = ${withCat.peak} - ${e.R} = ${withCat.peak - e.R}\\ \\text{kJ}$ and $E_a(\\text{reverse}) = ${withCat.peak} - ${e.P} = ${withCat.peak - e.P}\\ \\text{kJ}$`,
        `The reactants and products are at the same levels on both curves, so $\\Delta H$ (${kJSigned(dH)}) stays the same.`,
      ],
    };
  }
  if (rng.chance(0.55)) {
    const F = rng.int(10, 50) * 5;
    let H = rng.int(-50, 30) * 5;
    if (H === 0) H = 20;
    if (H >= F - 10) H = -H;
    const Fc = rng.int(Math.max(Math.ceil((H > 0 ? H : 0) / 5) + 1, 2), F / 5 - 1) * 5;
    const Rc = Fc - H;
    return {
      prompt: `Without a catalyst, a reaction has $E_a(\\text{forward}) = ${F}\\ \\text{kJ}$ and $${DH} = ${signed(H, 0)}\\ \\text{kJ}$. A catalyst lowers $E_a(\\text{forward})$ to ${kJ(Fc)}. With the catalyst, what is the activation energy of the reverse reaction, and by how much has the catalyst lowered it?`,
      parts: [numPart(Rc, { decimals: 0, tolerance: 0, suffix: 'kJ', label: `${EA_R}, catalysed` }), numPart(F - Fc, { decimals: 0, tolerance: 0, suffix: 'kJ', label: 'Decrease' })],
      hints: ['A catalyst does not change $\\Delta H$: the reactant and product levels stay the same.', '$E_a(\\text{reverse}) = E_a(\\text{forward}) - \\Delta H$, with or without the catalyst.'],
      solution: [
        `With the catalyst: $E_a(\\text{reverse}) = ${Fc} - ${br(H, 0)} = ${Rc}\\ \\text{kJ}$`,
        `Without it: $E_a(\\text{reverse}) = ${F} - ${br(H, 0)} = ${F - H}\\ \\text{kJ}$`,
        `The catalyst lowers it by $${F - H} - ${Rc} = ${F - Fc}\\ \\text{kJ}$, the same amount as the forward activation energy.`,
      ],
    };
  }
  const STATEMENTS = [
    { md: 'It lowers the activation energies of both the forward and the reverse reactions by the same amount.', correct: true },
    { md: 'It leaves $\\Delta H$ for the reaction unchanged.', correct: true },
    { md: 'It provides an alternative pathway through a different activated complex.', correct: true },
    { md: 'It is not consumed by the reaction.', correct: true },
    { md: 'It lowers the potential energy of the products.', correct: false },
    { md: 'It raises the kinetic energy of the reactant particles.', correct: false },
    { md: 'It lowers the activation energy of the forward reaction only.', correct: false },
    { md: 'It makes an endothermic reaction exothermic.', correct: false },
  ];
  const opts = [...rng.shuffle(STATEMENTS.filter((x) => x.correct)).slice(0, rng.int(2, 3)), ...rng.shuffle(STATEMENTS.filter((x) => !x.correct)).slice(0, 2)];
  return {
    prompt: 'A catalyst is added to a reaction mixture at constant temperature. Select every true statement about the catalyst.',
    parts: [part(multi(rng, opts))],
    hints: ['Picture the potential energy diagram with and without the catalyst: which parts move, and which stay?', 'The forward and reverse reactions pass over the same hump.'],
    solution: [
      'A catalyst gives the reaction a new pathway with a lower hump. The reactant and product levels, and so $\\Delta H$, do not change, and both activation energies drop by the same amount. The catalyst is regenerated, so it is not used up.',
      `True: ${opts.filter((o) => o.correct).map((o) => `“${o.md.replace(/\.$/, '')}”`).join('; ')}.`,
    ],
  };
}

export const ENTHALPY_SKILLS: SkillDef[] = [
  skill({ id: 'c30-hess-manipulate', name: 'Reversing and multiplying equations', description: 'Reverse and multiply a thermochemical equation, changing its enthalpy change to match.', outcomes: A2, lessonId: L(5), gen: hessManipulate }),
  skill({ id: 'c30-hess-combine', name: "Hess's law", description: "Combine two or three thermochemical equations with Hess's law to find the enthalpy change of a target reaction.", outcomes: A2, lessonId: L(5), calculator: true, gen: hessCombine }),
  skill({ id: 'c30-formation-equation', name: 'Formation equations', description: 'Write the formation equation of a compound from its elements in their standard states, making one mole of product.', outcomes: A2, lessonId: L(6), gen: formationEquation }),
  skill({ id: 'c30-formation-dh', name: 'Enthalpy change from enthalpies of formation', description: 'Calculate an enthalpy of reaction from standard enthalpies of formation, and work backwards to an unknown enthalpy of formation.', outcomes: A2, lessonId: L(6), calculator: true, gen: formationDh }),
  skill({ id: 'c30-activation-energy', name: 'Activation energy', description: 'Read the activation energies of the forward and reverse reactions, and the enthalpy change, from a potential energy diagram.', outcomes: A2, lessonId: L(7), gen: activationEnergy }),
  skill({ id: 'c30-catalyst', name: 'Catalysts', description: 'Explain how a catalyst lowers the activation energy of both the forward and reverse reactions without changing the enthalpy change.', outcomes: A2, lessonId: L(7), gen: catalyst }),
];

