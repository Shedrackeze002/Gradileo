/**
 * Grade 10 Chemistry, Unit 4: chemical reactions. Word equations and the conservation of mass,
 * counting atoms and balancing symbol equations, five types of reactions and their products,
 * exothermic and endothermic changes with energy level diagrams, and rates of reaction with
 * collision theory. Every rule a question relies on (a reactivity order, solubility rules) is
 * stated in the question, and every equation shown as balanced takes its coefficients from
 * `balance()`.
 */
import { fixedChoice, mc, mcFigures, multi, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { balance, ce, parseFormula } from '../../../chem/formula.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, PlaneFigure, PlanePoint, SkillDef, TableFigure } from '../../../types.ts';

const L = (n: number) => `c10-4-${n}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const coef = (k: number) => (k === 1 ? '' : `${k}`);
const $ = (f: string) => `$${ce(f)}$`;
/** A quantity with its unit, in maths: $2.50\ \text{g}$. */
const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
const degC = (v: string | number) => `$${v}^\\circ\\text{C}$`;
const cm3 = (v: string | number) => `$${v}\\ \\text{cm}^3$`;
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** A mass held in hundredths of a gram, written with two decimal places. */
const g2 = (cg: number) => (cg / 100).toFixed(2);

// ---------------------------------------------------------------------------- equations

interface Eq {
  r: string[];
  p: string[];
  /** Smallest whole-number coefficients, reactants first. */
  c: number[];
}
function eqn(r: string[], p: string[]): Eq {
  const c = balance(r, p);
  if (!c) throw new Error(`No single set of coefficients balances ${r.join(' + ')} -> ${p.join(' + ')}`);
  return { r, p, c };
}
const species = (x: Eq) => [...x.r, ...x.p];
/** The equation inside \ce{}: with its coefficients or without, and state symbols where given (null leaves one out). */
function eqCe(x: Eq, withCoefficients = true, states?: Array<string | null>): string {
  const sp = species(x).map((f, i) => `${withCoefficients ? coef(x.c[i]) : ''}${f}${states?.[i] ? `(${states[i]})` : ''}`);
  return `${sp.slice(0, x.r.length).join(' + ')} -> ${sp.slice(x.r.length).join(' + ')}`;
}
const eqMd = (x: Eq, withCoefficients = true, states?: Array<string | null>) => `$\\ce{${eqCe(x, withCoefficients, states)}}$`;

/** "Check: Al 4 = 4, O 6 = 6." */
function atomCheck(x: Eq): string {
  const fs = species(x).map(parseFormula);
  const els = [...new Set(fs.flatMap((f) => [...f.atoms.keys()]))];
  const count = (from: number, to: number, el: string) => fs.slice(from, to).reduce((s, f, i) => s + (f.atoms.get(el) ?? 0) * x.c[from + i], 0);
  return `Check: ${els.map((el) => `${el} ${count(0, x.r.length, el)} = ${count(x.r.length, fs.length, el)}`).join(', ')}.`;
}

/** Molar mass in g/mol from the data booklet masses (used only to keep masses in real proportions). */
function mm(f: string): number {
  let m = 0;
  for (const [el, n] of parseFormula(f).atoms) m += element(el)!.mass * n;
  return m;
}

// ---------------------------------------------------------------------------- lesson 4.1: word equations

interface WordRx {
  /** What happens, naming every reactant and product. */
  told: string;
  r: string[];
  p: string[];
  /** Products a careless reading might give, for a wrong word equation. */
  wrongP: string[];
  /** A substance in the description that is neither a reactant nor a product (a catalyst). */
  extra?: string;
  /** The same reaction with one product left unnamed, identified by a test instead. */
  test?: { found: string; text: string };
}

const WORD_RXS: WordRx[] = [
  { told: 'Magnesium ribbon burns in oxygen with a dazzling white flame, leaving a white powder of magnesium oxide.', r: ['magnesium', 'oxygen'], p: ['magnesium oxide'], wrongP: ['magnesium hydroxide'] },
  {
    told: 'Methane burns in oxygen in a laboratory gas burner, making carbon dioxide and water.', r: ['methane', 'oxygen'], p: ['carbon dioxide', 'water'], wrongP: ['carbon', 'hydrogen'],
    test: { found: 'carbon dioxide', text: 'Methane burns in oxygen in a laboratory gas burner. Water forms, and a gas from the flame turns limewater milky.' },
  },
  {
    told: 'Zinc granules are dropped into dilute hydrochloric acid. The zinc fizzes as hydrogen bubbles off, and zinc chloride forms in the solution.', r: ['zinc', 'hydrochloric acid'], p: ['zinc chloride', 'hydrogen'], wrongP: ['zinc chloride', 'water'],
    test: { found: 'hydrogen', text: 'Zinc granules are dropped into dilute hydrochloric acid, and zinc chloride forms in the solution. The gas that bubbles off burns with a squeaky pop when a lighted splint is held to it.' },
  },
  {
    told: 'Calcium carbonate is heated strongly. It breaks down into calcium oxide and carbon dioxide.', r: ['calcium carbonate'], p: ['calcium oxide', 'carbon dioxide'], wrongP: ['calcium', 'carbon', 'oxygen'],
    test: { found: 'carbon dioxide', text: 'Calcium carbonate is heated strongly and breaks down, leaving calcium oxide. The gas given off turns limewater milky.' },
  },
  { told: 'A mixture of iron filings and sulfur powder is heated. It glows red as iron(II) sulfide forms.', r: ['iron', 'sulfur'], p: ['iron(II) sulfide'], wrongP: ['iron(II) sulfate'] },
  {
    told: 'A small piece of sodium is placed on water. It fizzes across the surface, making hydrogen and sodium hydroxide, which dissolves in the water.', r: ['sodium', 'water'], p: ['sodium hydroxide', 'hydrogen'], wrongP: ['sodium oxide', 'hydrogen'],
    test: { found: 'hydrogen', text: 'A small piece of sodium is placed on water. Sodium hydroxide forms and dissolves, and the gas given off burns with a squeaky pop.' },
  },
  {
    told: 'Green copper(II) carbonate powder is heated. It turns black as it breaks down into copper(II) oxide and carbon dioxide.', r: ['copper(II) carbonate'], p: ['copper(II) oxide', 'carbon dioxide'], wrongP: ['copper', 'carbon dioxide'],
    test: { found: 'carbon dioxide', text: 'Green copper(II) carbonate is heated and turns into black copper(II) oxide. The gas given off turns limewater milky.' },
  },
  {
    told: 'A mixture of hydrogen and oxygen is lit and explodes with a loud pop, forming water.', r: ['hydrogen', 'oxygen'], p: ['water'], wrongP: ['hydrogen peroxide'],
    test: { found: 'water', text: 'Hydrogen burns in oxygen. The only product is a colourless liquid, which turns white anhydrous copper(II) sulfate blue.' },
  },
  { told: 'Sodium hydroxide solution is added to dilute hydrochloric acid. The acid is neutralized, and sodium chloride and water form.', r: ['sodium hydroxide', 'hydrochloric acid'], p: ['sodium chloride', 'water'], wrongP: ['sodium chloride', 'hydrogen'] },
  { told: 'Silver nitrate solution is mixed with sodium chloride solution. A white solid of silver chloride appears, and sodium nitrate stays dissolved.', r: ['silver nitrate', 'sodium chloride'], p: ['silver chloride', 'sodium nitrate'], wrongP: ['silver', 'chlorine', 'sodium nitrate'] },
  { told: 'An iron nail is placed in blue copper(II) sulfate solution. A pink-brown coating of copper forms on the nail, and iron(II) sulfate forms in the solution.', r: ['iron', 'copper(II) sulfate'], p: ['iron(II) sulfate', 'copper'], wrongP: ['iron(II) sulfide', 'copper'] },
  { told: 'In the cells of living things, respiration releases energy as glucose reacts with oxygen, making carbon dioxide and water.', r: ['glucose', 'oxygen'], p: ['carbon dioxide', 'water'], wrongP: ['carbon monoxide', 'water'] },
  {
    told: 'In the leaves of green plants, photosynthesis uses energy from light to turn carbon dioxide and water into glucose and oxygen.', r: ['carbon dioxide', 'water'], p: ['glucose', 'oxygen'], wrongP: ['glucose', 'hydrogen'],
    test: { found: 'oxygen', text: 'In light, a water plant turns carbon dioxide and water into glucose by photosynthesis. Bubbles of a gas rise from its leaves, and the gas relights a glowing splint.' },
  },
  {
    told: 'A little manganese(IV) oxide is added to hydrogen peroxide solution, which quickly breaks down into water and oxygen. The manganese(IV) oxide speeds up the reaction but is not used up.', r: ['hydrogen peroxide'], p: ['water', 'oxygen'], wrongP: ['water', 'hydrogen'], extra: 'manganese(IV) oxide',
    test: { found: 'oxygen', text: 'A little manganese(IV) oxide is added to hydrogen peroxide solution, which breaks down into water and a gas. The manganese(IV) oxide is not used up, and the gas relights a glowing splint.' },
  },
  {
    told: 'Marble chips, which are calcium carbonate, are added to dilute hydrochloric acid. They fizz, making calcium chloride, water and carbon dioxide.', r: ['calcium carbonate', 'hydrochloric acid'], p: ['calcium chloride', 'water', 'carbon dioxide'], wrongP: ['calcium chloride', 'hydrogen'],
    test: { found: 'carbon dioxide', text: 'Marble chips (calcium carbonate) fizz in dilute hydrochloric acid, making calcium chloride and water. The gas given off turns limewater milky.' },
  },
  { told: 'Hot sodium burns in chlorine gas with a bright yellow flame, forming white sodium chloride.', r: ['sodium', 'chlorine'], p: ['sodium chloride'], wrongP: ['sodium chlorate'] },
  { told: 'Aluminium powder reacts with iron(III) oxide so violently that the iron it produces is molten. The other product is aluminium oxide.', r: ['aluminium', 'iron(III) oxide'], p: ['aluminium oxide', 'iron'], wrongP: ['iron', 'oxygen'] },
  { told: 'Copper foil is heated in air. Its surface turns black as the copper reacts with oxygen to form copper(II) oxide.', r: ['copper', 'oxygen'], p: ['copper(II) oxide'], wrongP: ['copper(II) carbonate'] },
  {
    told: 'A piece of lithium is dropped into water. It fizzes gently, making lithium hydroxide solution and hydrogen.', r: ['lithium', 'water'], p: ['lithium hydroxide', 'hydrogen'], wrongP: ['lithium oxide', 'hydrogen'],
    test: { found: 'hydrogen', text: 'A piece of lithium is dropped into water, and lithium hydroxide forms in the solution. The gas given off burns with a squeaky pop.' },
  },
  {
    told: 'Magnesium ribbon is added to dilute sulfuric acid. It fizzes and disappears, making magnesium sulfate solution and hydrogen.', r: ['magnesium', 'sulfuric acid'], p: ['magnesium sulfate', 'hydrogen'], wrongP: ['magnesium sulfate', 'water'],
    test: { found: 'hydrogen', text: 'Magnesium ribbon is added to dilute sulfuric acid and disappears, leaving magnesium sulfate solution. The gas given off burns with a squeaky pop.' },
  },
  { told: 'Propane burns in plenty of oxygen in a camping stove, making carbon dioxide and water.', r: ['propane', 'oxygen'], p: ['carbon dioxide', 'water'], wrongP: ['carbon', 'hydrogen'] },
  {
    told: 'Ethanol burns in a spirit burner with a clean blue flame, making carbon dioxide and water.', r: ['ethanol', 'oxygen'], p: ['carbon dioxide', 'water'], wrongP: ['carbon dioxide', 'hydrogen'],
    test: { found: 'water', text: 'Ethanol burns in oxygen in a spirit burner, making carbon dioxide and a colourless liquid that turns white anhydrous copper(II) sulfate blue.' },
  },
];

const TESTED = ['hydrogen', 'oxygen', 'carbon dioxide', 'water'];
const GAS_TEST: Record<string, string> = {
  hydrogen: 'A gas that burns with a squeaky pop is hydrogen.',
  oxygen: 'A gas that relights a glowing splint is oxygen.',
  'carbon dioxide': 'A gas that turns limewater milky is carbon dioxide.',
  water: 'A liquid that turns white anhydrous copper(II) sulfate blue is water.',
};
const TESTS_HINT = 'The tests: hydrogen burns with a squeaky pop, oxygen relights a glowing splint, carbon dioxide turns limewater milky, and water turns white anhydrous copper(II) sulfate blue.';

const wordEq = (r: string[], p: string[]) => `${r.join(' + ')} → ${p.join(' + ')}`;
/** A product moved to the left, or a reactant moved to the right. */
function moved(r: string[], p: string[]): [string[], string[]] {
  if (p.length > 1) return [[...r, p[p.length - 1]], p.slice(0, -1)];
  return [r.slice(0, -1), [r[r.length - 1], ...p]];
}

function wordEquation(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const x = rng.pick(WORD_RXS);
    const products = rng.chance(0.5);
    const names = [...x.r, ...x.p, ...(x.extra ? [x.extra] : [])];
    return {
      prompt: `${x.told} Select every ${products ? 'product' : 'reactant'} of this reaction.`,
      parts: [part(multi(rng, names.map((n) => ({ md: cap(n), correct: (products ? x.p : x.r).includes(n) }))))],
      hints: [
        'The reactants are the substances you start with, which are used up. The products are the new substances that form.',
        ...(x.extra ? ['A substance that speeds up a reaction but is not used up is a catalyst: it is neither a reactant nor a product.'] : []),
      ],
      solution: [`${x.r.length === 1 ? 'Reactant' : 'Reactants'}: ${andList(x.r)}. ${x.p.length === 1 ? 'Product' : 'Products'}: ${andList(x.p)}.`, `Word equation: ${wordEq(x.r, x.p)}`],
    };
  }
  if (d === 2) {
    const x = rng.pick(WORD_RXS);
    const [mr, mp] = moved(x.r, x.p);
    const wrong = [wordEq(x.r, x.wrongP), wordEq(x.p, x.r), wordEq(mr, mp)];
    if (x.extra) wrong.unshift(wordEq([...x.r, x.extra], x.p));
    return {
      prompt: `${x.told} Which word equation describes the reaction?`,
      parts: [part(mc(rng, wordEq(x.r, x.p), wrong))],
      hints: ['The reactants go on the left of the arrow and the products on the right, with a + between substances on the same side.', 'Read the description again: use the exact names of the substances it says react and form.'],
      solution: [`${x.r.length === 1 ? `The reactant, ${x.r[0]}, goes` : `The reactants, ${andList(x.r)}, go`} on the left of the arrow, and ${x.p.length === 1 ? `the product, ${x.p[0]},` : `the products, ${andList(x.p)},`} on the right.${x.extra ? ` The ${x.extra} is not used up, so it is not a reactant.` : ''}`, `Word equation: ${wordEq(x.r, x.p)}`],
    };
  }
  const x = rng.pick(WORD_RXS.filter((w) => w.test));
  const t = x.test!;
  const swaps = rng.shuffle(TESTED.filter((g) => g !== t.found && !x.r.includes(g) && !x.p.includes(g)));
  const swap = (g: string) => wordEq(x.r, x.p.map((n) => (n === t.found ? g : n)));
  const [mr, mp] = moved(x.r, x.p);
  const wrong = [...swaps.slice(0, 1).map(swap), wordEq(x.p, x.r), wordEq(x.r, x.wrongP), ...swaps.slice(1).map(swap), wordEq(mr, mp)];
  return {
    prompt: `${t.text} Which word equation describes the reaction?`,
    parts: [part(mc(rng, wordEq(x.r, x.p), wrong))],
    hints: [TESTS_HINT, 'Name the substance the test shows, then put the reactants on the left of the arrow and the products on the right.'],
    solution: [`${GAS_TEST[t.found]} So the products are ${andList(x.p)}.`, `Word equation: ${wordEq(x.r, x.p)}`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.1: conservation of mass

interface MassRx extends Eq {
  names: string[];
  /** The experiment, given each substance as "5.58 g of iron" or just "iron" when its mass is unknown. */
  say: (a: string[]) => string;
}
const heatedTogether = (place: string) => ([a, b, c]: string[]) => `${cap(a)} and ${b} are heated together in ${place}. They react completely, forming ${c}.`;
const brokenDown = (how: string) => ([a, b, c]: string[]) => `${cap(a)} is ${how} in a closed container until it has all broken down into ${b} and ${c}.`;
const mixedSolutions = ([a, b, c, dd]: string[]) => `Solutions containing ${a} and ${b} are mixed in a stoppered flask. They react completely, forming ${c} and ${dd}.`;

const MASS_CLOSED: MassRx[] = [
  { ...eqn(['Fe', 'S'], ['FeS']), names: ['iron', 'sulfur', 'iron(II) sulfide'], say: heatedTogether('a sealed tube') },
  { ...eqn(['Zn', 'S'], ['ZnS']), names: ['zinc', 'sulfur', 'zinc sulfide'], say: heatedTogether('a sealed tube') },
  { ...eqn(['Mg', 'O2'], ['MgO']), names: ['magnesium', 'oxygen', 'magnesium oxide'], say: ([a, b, c]) => `${cap(a)} burns in a sealed flask. It reacts completely with ${b}, forming ${c}.` },
  { ...eqn(['Na', 'Cl2'], ['NaCl']), names: ['sodium', 'chlorine', 'sodium chloride'], say: ([a, b, c]) => `${cap(a)} reacts completely with ${b} in a sealed container, forming ${c}.` },
  { ...eqn(['Cu', 'O2'], ['CuO']), names: ['copper', 'oxygen', 'copper(II) oxide'], say: ([a, b, c]) => `${cap(a)} is heated in a sealed tube, where it reacts completely with ${b}, forming ${c}.` },
  { ...eqn(['Ca', 'O2'], ['CaO']), names: ['calcium', 'oxygen', 'calcium oxide'], say: ([a, b, c]) => `${cap(a)} burns in a sealed flask. It reacts completely with ${b}, forming ${c}.` },
  { ...eqn(['CaCO3'], ['CaO', 'CO2']), names: ['calcium carbonate', 'calcium oxide', 'carbon dioxide'], say: brokenDown('heated strongly') },
  { ...eqn(['CuCO3'], ['CuO', 'CO2']), names: ['copper(II) carbonate', 'copper(II) oxide', 'carbon dioxide'], say: brokenDown('heated') },
  { ...eqn(['MgCO3'], ['MgO', 'CO2']), names: ['magnesium carbonate', 'magnesium oxide', 'carbon dioxide'], say: brokenDown('heated strongly') },
  { ...eqn(['H2O2'], ['H2O', 'O2']), names: ['hydrogen peroxide', 'water', 'oxygen'], say: ([a, b, c]) => `${cap(a)} breaks down completely in a sealed flask, forming ${b} and ${c}.` },
];
const MASS_FOUR: MassRx[] = [
  { ...eqn(['AgNO3', 'NaCl'], ['AgCl', 'NaNO3']), names: ['silver nitrate', 'sodium chloride', 'silver chloride', 'sodium nitrate'], say: mixedSolutions },
  { ...eqn(['BaCl2', 'Na2SO4'], ['BaSO4', 'NaCl']), names: ['barium chloride', 'sodium sulfate', 'barium sulfate', 'sodium chloride'], say: mixedSolutions },
  { ...eqn(['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']), names: ['lead(II) nitrate', 'potassium iodide', 'lead(II) iodide', 'potassium nitrate'], say: mixedSolutions },
  { ...eqn(['CuSO4', 'NaOH'], ['Cu(OH)2', 'Na2SO4']), names: ['copper(II) sulfate', 'sodium hydroxide', 'copper(II) hydroxide', 'sodium sulfate'], say: mixedSolutions },
  { ...eqn(['Zn', 'CuSO4'], ['ZnSO4', 'Cu']), names: ['zinc', 'copper(II) sulfate', 'zinc sulfate', 'copper'], say: ([a, b, c, dd]) => `${cap(a)} is added to a solution containing ${b} in a stoppered flask. They react completely, forming ${c} and ${dd}.` },
  { ...eqn(['Mg', 'CuO'], ['MgO', 'Cu']), names: ['magnesium', 'copper(II) oxide', 'magnesium oxide', 'copper'], say: ([a, b, c, dd]) => `${cap(a)} and ${b} are heated together in a sealed tube. They react completely, forming ${c} and ${dd}.` },
];

/** Masses in hundredths of a gram, in real proportions, adjusted so the two sides add up exactly. */
function massesCg(rng: Rng, x: Eq): number[] {
  const sp = species(x);
  const weights = sp.map((f, i) => x.c[i] * mm(f));
  const n = rng.float(3, 18, 2) / Math.max(...weights);
  const cg = weights.map((w) => Math.max(1, Math.round(w * n * 100)));
  const nr = x.r.length;
  const sumR = cg.slice(0, nr).reduce((a, b) => a + b, 0);
  const sumPOthers = cg.slice(nr, -1).reduce((a, b) => a + b, 0);
  cg[cg.length - 1] = sumR - sumPOthers;
  return cg;
}

function missingMass(rng: Rng, x: MassRx): GenOutput {
  const cg = massesCg(rng, x);
  const nr = x.r.length;
  const k = rng.int(0, cg.length - 1);
  const amounts = x.names.map((n, i) => (i === k ? n : `${q(g2(cg[i]), 'g')} of ${n}`));
  const sideOf = (i: number) => (i < nr ? 0 : 1);
  const term = (i: number) => (i === k ? 'm' : g2(cg[i]));
  const lhs = x.names.slice(0, nr).map((_, i) => term(i));
  const rhs = x.names.slice(nr).map((_, i) => term(nr + i));
  const other = x.names.map((_, i) => i).filter((i) => sideOf(i) !== sideOf(k)).map((i) => g2(cg[i]));
  const same = x.names.map((_, i) => i).filter((i) => i !== k && sideOf(i) === sideOf(k)).map((i) => g2(cg[i]));
  const expr = `${other.join(' + ')}${same.map((t) => ` - ${t}`).join('')}`;
  return {
    prompt: `${x.say(amounts)} What mass of ${x.names[k]} ${k < nr ? 'reacted' : 'formed'}?`,
    parts: [numPart(cg[k] / 100, { decimals: 2, suffix: 'g' })],
    calculator: true,
    hints: ['Mass is conserved: the total mass of the reactants equals the total mass of the products.', 'Write mass of reactants = mass of products, with $m$ for the mass you do not know.'],
    solution: [
      `Mass of reactants = mass of products: $${lhs.join(' + ')} = ${rhs.join(' + ')}$`,
      `$m = ${expr} = ${g2(cg[k])}\\ \\text{g}$`,
    ],
  };
}

function excessMass(rng: Rng): GenOutput {
  const x = rng.pick(MASS_CLOSED.filter((m) => m.r.length === 2));
  const l = rng.int(0, 1);
  const e = 1 - l;
  const cgL = rng.int(150, 1200);
  const ratio = (x.c[e] * mm(x.r[e])) / (x.c[l] * mm(x.r[l]));
  const needed = Math.round(cgL * ratio);
  const left = rng.int(20, 300);
  const given = needed + left;
  const product = cgL + needed;
  const mass = (cg: number, i: number) => `${q(g2(cg), 'g')} of ${x.names[i]}`;
  const listed = l === 0 ? `${mass(cgL, 0)} and ${mass(given, 1)}` : `${mass(given, 0)} and ${mass(cgL, 1)}`;
  return {
    prompt: `In a sealed container, ${listed} react until all of the ${x.names[l]} is used up. ${cap(q(g2(left), 'g'))} of ${x.names[e]} is left over, unreacted. What mass of ${x.names[2]} forms?`,
    parts: [numPart(product / 100, { decimals: 2, suffix: 'g' })],
    calculator: true,
    hints: ['Only the part of a reactant that reacts ends up in the product. Find how much of the leftover reactant actually reacted.', 'Mass of product = mass of the reactants that reacted.'],
    solution: [
      `Mass of ${x.names[e]} that reacted: $${g2(given)} - ${g2(left)} = ${g2(needed)}\\ \\text{g}$`,
      `Mass of ${x.names[2]}: $${g2(cgL)} + ${g2(needed)} = ${g2(product)}\\ \\text{g}$`,
    ],
  };
}

interface OpenRx extends Eq {
  names: string[];
  /** The weighed solid reactant, and the gas that escapes or the oxygen that is taken in. */
  solid: number;
  gas: number;
  /** The solid product left behind when a carbonate is heated or a metal burns. */
  left?: number;
  escapes: boolean;
  setup: string;
  /** What is on the balance: "The flask and its contents", "The crucible, lid and magnesium". */
  weighed: string;
}
const OPEN_RXS: OpenRx[] = [
  { ...eqn(['CaCO3', 'HCl'], ['CaCl2', 'H2O', 'CO2']), names: ['marble chips (calcium carbonate)', 'hydrochloric acid', 'calcium chloride', 'water', 'carbon dioxide'], solid: 0, gas: 4, escapes: true, setup: 'A conical flask of dilute hydrochloric acid stands on a balance, open to the air. Marble chips (calcium carbonate) are added, and they fizz until they have all reacted.', weighed: 'The flask and its contents' },
  { ...eqn(['Mg', 'HCl'], ['MgCl2', 'H2']), names: ['magnesium ribbon', 'hydrochloric acid', 'magnesium chloride', 'hydrogen'], solid: 0, gas: 3, escapes: true, setup: 'A flask of dilute hydrochloric acid stands on a balance, open to the air. Magnesium ribbon is added, and it fizzes until it has all reacted.', weighed: 'The flask and its contents' },
  { ...eqn(['Zn', 'HCl'], ['ZnCl2', 'H2']), names: ['zinc granules', 'hydrochloric acid', 'zinc chloride', 'hydrogen'], solid: 0, gas: 3, escapes: true, setup: 'A beaker of dilute hydrochloric acid stands on a balance, open to the air. Zinc granules are added, and they fizz until they have all reacted.', weighed: 'The beaker and its contents' },
  { ...eqn(['NaHCO3', 'HCl'], ['NaCl', 'H2O', 'CO2']), names: ['sodium hydrogen carbonate', 'hydrochloric acid', 'sodium chloride', 'water', 'carbon dioxide'], solid: 0, gas: 4, escapes: true, setup: 'A flask of dilute hydrochloric acid stands on a balance, open to the air. Sodium hydrogen carbonate powder is added, and it fizzes until it has all reacted.', weighed: 'The flask and its contents' },
  { ...eqn(['CuCO3'], ['CuO', 'CO2']), names: ['copper(II) carbonate', 'copper(II) oxide', 'carbon dioxide'], solid: 0, gas: 2, left: 1, escapes: true, setup: 'Green copper(II) carbonate in an open boiling tube is heated strongly until it has all turned into black copper(II) oxide.', weighed: 'The tube and its contents' },
  { ...eqn(['CaCO3'], ['CaO', 'CO2']), names: ['calcium carbonate', 'calcium oxide', 'carbon dioxide'], solid: 0, gas: 2, left: 1, escapes: true, setup: 'Calcium carbonate in an open crucible is heated strongly until it has all broken down into calcium oxide.', weighed: 'The crucible and its contents' },
  { ...eqn(['Mg', 'O2'], ['MgO']), names: ['magnesium', 'oxygen', 'magnesium oxide'], solid: 0, gas: 1, left: 2, escapes: false, setup: 'Magnesium ribbon in a crucible is heated strongly, with the lid lifted now and then to let air in, until it has all turned into white magnesium oxide.', weighed: 'The crucible, lid and contents' },
  { ...eqn(['Cu', 'O2'], ['CuO']), names: ['copper', 'oxygen', 'copper(II) oxide'], solid: 0, gas: 1, left: 2, escapes: false, setup: 'Copper powder in an open dish is heated in air until it has all turned into black copper(II) oxide.', weighed: 'The dish and its contents' },
  { ...eqn(['Fe', 'O2'], ['Fe2O3']), names: ['iron', 'oxygen', 'iron(III) oxide'], solid: 0, gas: 1, left: 2, escapes: false, setup: 'Iron wool on a heatproof dish is heated in air until it has all turned into iron(III) oxide.', weighed: 'The dish and its contents' },
  { ...eqn(['Ca', 'O2'], ['CaO']), names: ['calcium', 'oxygen', 'calcium oxide'], solid: 0, gas: 1, left: 2, escapes: false, setup: 'Calcium granules in a crucible are heated in air until they have all turned into white calcium oxide.', weighed: 'The crucible and its contents' },
];

function openMass(rng: Rng): GenOutput {
  const x = rng.pick(OPEN_RXS);
  const sp = species(x);
  // Hydrogen is light, so start with more metal to give a readable mass loss.
  const cgSolid = sp[x.gas] === 'H2' ? rng.int(200, 600) : rng.int(100, 500);
  const ratio = (x.c[x.gas] * mm(sp[x.gas])) / (x.c[x.solid] * mm(sp[x.solid]));
  const cgGas = Math.max(2, Math.round(cgSolid * ratio));
  const start = rng.int(2000, 16000) + cgSolid;
  const end = x.escapes ? start - cgGas : start + cgGas;
  const gasName = x.names[x.gas];
  const solidName = x.names[x.solid];
  const whyRight = x.escapes
    ? `The ${gasName} escapes into the air, so its mass is no longer on the balance.`
    : `Oxygen from the air combines with the ${solidName}, so the mass of that oxygen is now in the ${x.names[x.left!]} on the balance.`;
  const whyWrong = x.escapes
    ? ['Some atoms are destroyed during the reaction.', 'Gases have no mass, so the gas made does not count.', 'The products of a reaction always have less mass than the reactants.']
    : ['New atoms are made when a substance is heated.', 'Hot substances have more mass than cold ones.', 'The products of a reaction always have more mass than the reactants.'];
  const reason = part(mc(rng, whyRight, whyWrong), { label: `Why does the mass ${x.escapes ? 'fall' : 'rise'}?` });
  const hints = [
    'Mass is conserved in every reaction. A change on the balance means something has left the container or entered it.',
    x.escapes ? 'A gas made in an open container escapes into the air.' : 'A metal heated in air combines with oxygen from the air.',
  ];
  const balanced = `The balanced equation is ${eqMd(x)}.`;
  if (rng.chance(0.5)) {
    // The two balance readings: find the mass of gas lost or gained.
    const ask = x.escapes ? `What mass of ${gasName} escaped?` : `What mass of oxygen combined with the ${solidName}?`;
    return {
      prompt: `${x.setup} ${x.weighed} have a mass of ${q(g2(start), 'g')} at the start and ${q(g2(end), 'g')} at the end. ${ask}`,
      parts: [numPart(cgGas / 100, { decimals: 2, suffix: 'g', label: x.escapes ? `Mass of ${gasName}` : 'Mass of oxygen' }), reason],
      calculator: true,
      hints,
      solution: [
        `The mass ${x.escapes ? 'fell' : 'rose'} by $${x.escapes ? `${g2(start)} - ${g2(end)}` : `${g2(end)} - ${g2(start)}`} = ${g2(cgGas)}\\ \\text{g}$.`,
        whyRight,
        balanced,
      ],
    };
  }
  // Predict the final reading from the masses that react.
  let told: string;
  let working: string;
  if (x.left !== undefined) {
    const cgLeft = x.escapes ? cgSolid - cgGas : cgSolid + cgGas;
    told = `${cap(q(g2(cgSolid), 'g'))} of ${solidName} forms ${q(g2(cgLeft), 'g')} of ${x.names[x.left]}.`;
    working = x.escapes
      ? `Mass of ${gasName} that escapes: $${g2(cgSolid)} - ${g2(cgLeft)} = ${g2(cgGas)}\\ \\text{g}$`
      : `Mass of oxygen taken in: $${g2(cgLeft)} - ${g2(cgSolid)} = ${g2(cgGas)}\\ \\text{g}$`;
  } else {
    told = `The ${q(g2(cgSolid), 'g')} of ${solidName} makes ${q(g2(cgGas), 'g')} of ${gasName}.`;
    working = `All ${q(g2(cgGas), 'g')} of the ${gasName} escapes into the air.`;
  }
  return {
    prompt: `${x.setup} ${told} ${x.weighed} have a mass of ${q(g2(start), 'g')} at the start. What is their mass at the end?`,
    parts: [numPart(end / 100, { decimals: 2, suffix: 'g', label: 'Mass at the end' }), reason],
    calculator: true,
    hints,
    solution: [working, `Mass at the end: $${g2(start)} ${x.escapes ? '-' : '+'} ${g2(cgGas)} = ${g2(end)}\\ \\text{g}$`, whyRight, balanced],
  };
}

function conservation(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) return missingMass(rng, rng.pick(MASS_CLOSED));
  if (d === 2) return rng.chance(0.5) ? missingMass(rng, rng.pick(MASS_FOUR)) : excessMass(rng);
  return openMass(rng);
}

// ---------------------------------------------------------------------------- lesson 4.2: counting atoms

const COUNT_SIMPLE = ['H2O', 'CO2', 'NH3', 'CH4', 'H2SO4', 'HNO3', 'NaOH', 'CaCO3', 'C6H12O6', 'C2H5OH', 'NaHCO3', 'KMnO4', 'C3H8', 'Na2CO3', 'H3PO4', 'MgSO4', 'Fe2O3', 'Al2O3', 'CH3COOH', 'KNO3', 'Na2SO4', 'C12H22O11', 'H2O2', 'C4H10'];
const COUNT_BRACKETS = ['Ca(OH)2', 'Mg(NO3)2', 'Al2(SO4)3', '(NH4)2SO4', 'Ca3(PO4)2', 'Fe(OH)3', 'Cu(NO3)2', 'Ba(OH)2', '(NH4)3PO4', 'Al(OH)3', 'Pb(NO3)2', 'Fe2(SO4)3', 'Mg(OH)2', 'Ca(NO3)2', 'Zn(NO3)2', '(NH4)2CO3', 'Al(NO3)3', 'Mg3(PO4)2'];

/** Where an element's atoms come from in a formula: "2", "1 \times 2", "5 + 1". */
function contributions(f: string, el: string): string[] {
  const out: string[] = [];
  for (const m of f.matchAll(/\(([^)]+)\)(\d*)|([A-Z][a-z]?)(\d*)/g)) {
    if (m[1]) {
      const inner = parseFormula(m[1]).atoms.get(el);
      if (inner) out.push(m[2] ? `${inner} \\times ${m[2]}` : `${inner}`);
    } else if (m[3] === el) out.push(m[4] || '1');
  }
  return out;
}
const atomsOf = (f: string, el: string) => parseFormula(f).atoms.get(el) ?? 0;
const totalAtoms = (f: string) => [...parseFormula(f).atoms.values()].reduce((a, b) => a + b, 0);
const elName = (el: string) => element(el)!.name;

/** "In $\ce{Ca(OH)2}$: $1 \times 2 = 2$ O atoms." */
function countWorking(f: string, el: string): string {
  const terms = contributions(f, el);
  const n = atomsOf(f, el);
  const sum = terms.length === 1 && terms[0] === `${n}` ? `${n}` : `${terms.join(' + ')} = ${n}`;
  return `One $${ce(f)}$ holds $${sum}$ ${el} atom${n === 1 ? '' : 's'}${terms.some((t) => t.includes('times')) ? ' (a number after a bracket multiplies every atom inside it)' : ''}.`;
}

const ATOM_EQS: Eq[] = [
  eqn(['Al', 'CuSO4'], ['Al2(SO4)3', 'Cu']),
  eqn(['CaCl2', 'Na3PO4'], ['Ca3(PO4)2', 'NaCl']),
  eqn(['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']),
  eqn(['FeCl3', 'NaOH'], ['Fe(OH)3', 'NaCl']),
  eqn(['Ca(OH)2', 'HNO3'], ['Ca(NO3)2', 'H2O']),
  eqn(['Al2(SO4)3', 'Ba(NO3)2'], ['BaSO4', 'Al(NO3)3']),
  eqn(['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag']),
  eqn(['C3H8', 'O2'], ['CO2', 'H2O']),
];

function countAtoms(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A subscript counts the atom just before it. A number after a bracket multiplies every atom inside the bracket.', 'A coefficient in front multiplies every atom in the whole formula.'];
  if (d === 3 && rng.chance(0.35)) {
    const x = rng.pick(ATOM_EQS);
    const els = [...new Set(x.r.flatMap((f) => [...parseFormula(f).atoms.keys()]))];
    const preferred = els.filter((e) => ['O', 'N', 'H', 'Cl', 'Na'].includes(e));
    const el = rng.pick(preferred.length ? preferred : els);
    const left = x.r.reduce((s, f, i) => s + x.c[i] * atomsOf(f, el), 0);
    const terms = x.r.map((f, i) => ({ f, i })).filter(({ f }) => atomsOf(f, el) > 0).map(({ f, i }) => `${x.c[i]} \\times ${atomsOf(f, el)}`);
    return {
      prompt: `In the balanced equation ${eqMd(x)}, how many ${elName(el)} atoms are on the left side, the reactants?`,
      parts: [numPart(left, { decimals: 0, tolerance: 0, suffix: 'atoms' })],
      hints: [...hints, 'Count each reactant separately (coefficient times the atoms in one formula), then add.'],
      solution: [...x.r.filter((f) => atomsOf(f, el) > 0).map((f) => countWorking(f, el)), `Left side: $${terms.join(' + ')} = ${left}$ ${el} atoms. The right side has the same number, because the equation is balanced.`],
    };
  }
  const f = d === 1 ? rng.pick(COUNT_SIMPLE) : d === 2 ? (rng.chance(0.5) ? rng.pick(COUNT_SIMPLE) : rng.pick(COUNT_BRACKETS)) : rng.pick(COUNT_BRACKETS);
  const k = d === 1 ? 1 : d === 2 ? (COUNT_SIMPLE.includes(f) ? rng.int(2, 5) : 1) : rng.int(2, 4);
  const shown = `${coef(k)}${f}`;
  const total = rng.chance(d === 1 ? 0.25 : 0.2);
  if (total) {
    const one = totalAtoms(f);
    const parts = [...parseFormula(f).atoms].map(([e, n]) => `${n}\\ \\text{${e}}`);
    return {
      prompt: `How many atoms in total are shown by $${ce(shown)}$?`,
      parts: [numPart(one * k, { decimals: 0, tolerance: 0, suffix: 'atoms' })],
      hints: [...hints, 'Count the atoms of each element, then add them up.'],
      solution: [`One $${ce(f)}$ holds $${parts.join(' + ')} = ${one}$ atoms.`, ...(k > 1 ? [`The coefficient ${k} means ${k} of them: $${k} \\times ${one} = ${one * k}$ atoms.`] : [])],
    };
  }
  const els = [...parseFormula(f).atoms.keys()];
  // Prefer an element inside the brackets, where the counting is harder.
  const inside = f.includes('(') ? [...parseFormula(/\(([^)]+)\)/.exec(f)![1]).atoms.keys()] : [];
  const el = inside.length && rng.chance(0.7) ? rng.pick(inside) : rng.pick(els);
  const one = atomsOf(f, el);
  return {
    prompt: `How many ${elName(el)} atoms are shown by $${ce(shown)}$?`,
    parts: [numPart(one * k, { decimals: 0, tolerance: 0, suffix: 'atoms' })],
    hints: d === 1 ? ['A subscript counts the atom just before it. No subscript means 1.', 'Add up every place the element appears in the formula.'] : hints,
    solution: [countWorking(f, el), ...(k > 1 ? [`The coefficient ${k} multiplies them: $${k} \\times ${one} = ${one * k}$ ${el} atoms.`] : [])],
  };
}

// ---------------------------------------------------------------------------- lesson 4.2: balancing

interface BalRx extends Eq {
  states?: string[];
  /** State symbol questions: the species and what it is like in the reaction. */
  ask?: Array<[number, string]>;
  kind: 'simple' | 'combustion' | 'displacement' | 'ions';
}
const brx = (kind: BalRx['kind'], r: string[], p: string[], states?: string[], ask?: Array<[number, string]>): BalRx => ({ ...eqn(r, p), kind, states, ask });

const BAL_RXS: BalRx[] = [
  // Difficulty 1: two steps.
  brx('simple', ['H2', 'O2'], ['H2O']),
  brx('simple', ['Na', 'Cl2'], ['NaCl']),
  brx('simple', ['Mg', 'O2'], ['MgO']),
  brx('simple', ['N2', 'H2'], ['NH3']),
  brx('simple', ['H2', 'Cl2'], ['HCl']),
  brx('simple', ['K', 'Br2'], ['KBr']),
  brx('simple', ['Ca', 'O2'], ['CaO']),
  brx('simple', ['H2O2'], ['H2O', 'O2']),
  brx('simple', ['Cu', 'O2'], ['CuO']),
  brx('simple', ['Li', 'Cl2'], ['LiCl']),
  brx('simple', ['Zn', 'O2'], ['ZnO']),
  brx('simple', ['HgO'], ['Hg', 'O2']),
  brx('simple', ['H2O'], ['H2', 'O2']),
  brx('simple', ['Na', 'O2'], ['Na2O']),
  brx('simple', ['H2', 'Br2'], ['HBr']),
  brx('simple', ['Ag2O'], ['Ag', 'O2']),
  // Difficulty 2: combustion of small hydrocarbons, and displacement.
  brx('combustion', ['CH4', 'O2'], ['CO2', 'H2O']),
  brx('combustion', ['C3H8', 'O2'], ['CO2', 'H2O']),
  brx('combustion', ['C2H4', 'O2'], ['CO2', 'H2O']),
  brx('combustion', ['C5H12', 'O2'], ['CO2', 'H2O']),
  brx('displacement', ['Zn', 'HCl'], ['ZnCl2', 'H2'], ['s', 'aq', 'aq', 'g'], [[3, 'The hydrogen bubbles off as a gas.'], [2, 'The zinc chloride stays dissolved in the water.']]),
  brx('displacement', ['Mg', 'HCl'], ['MgCl2', 'H2'], ['s', 'aq', 'aq', 'g'], [[3, 'The hydrogen fizzes off as a gas.'], [1, 'The hydrochloric acid is hydrogen chloride dissolved in water.']]),
  brx('displacement', ['Fe', 'HCl'], ['FeCl2', 'H2'], ['s', 'aq', 'aq', 'g'], [[2, 'The iron(II) chloride forms a pale green solution.'], [0, 'The iron is added as a solid powder.']]),
  brx('displacement', ['Al', 'HCl'], ['AlCl3', 'H2'], ['s', 'aq', 'aq', 'g'], [[3, 'The hydrogen bubbles off as a gas.'], [2, 'The aluminium chloride stays dissolved in the water.']]),
  brx('displacement', ['Na', 'H2O'], ['NaOH', 'H2'], ['s', 'l', 'aq', 'g'], [[1, 'The water is a pure liquid.'], [2, 'The sodium hydroxide dissolves in the water as it forms.'], [3, 'The hydrogen fizzes off as a gas.']]),
  brx('displacement', ['K', 'H2O'], ['KOH', 'H2'], ['s', 'l', 'aq', 'g'], [[1, 'The water is a pure liquid.'], [2, 'The potassium hydroxide dissolves in the water as it forms.']]),
  brx('displacement', ['Li', 'H2O'], ['LiOH', 'H2'], ['s', 'l', 'aq', 'g'], [[2, 'The lithium hydroxide dissolves in the water as it forms.'], [3, 'The hydrogen fizzes off as a gas.']]),
  brx('displacement', ['Cl2', 'KBr'], ['KCl', 'Br2'], ['aq', 'aq', 'aq', 'aq'], [[1, 'The potassium bromide is dissolved in water.']]),
  brx('displacement', ['Cl2', 'NaI'], ['NaCl', 'I2'], ['aq', 'aq', 'aq', 'aq'], [[2, 'The sodium chloride stays dissolved in the water.']]),
  brx('displacement', ['Br2', 'KI'], ['KBr', 'I2'], ['aq', 'aq', 'aq', 'aq'], [[1, 'The potassium iodide is dissolved in water.']]),
  brx('displacement', ['Al', 'CuCl2'], ['AlCl3', 'Cu'], ['s', 'aq', 'aq', 's'], [[3, 'The copper forms as a solid coating on the aluminium.'], [2, 'The aluminium chloride stays dissolved in the water.']]),
  brx('displacement', ['Al', 'Fe2O3'], ['Al2O3', 'Fe'], ['s', 's', 's', 'l'], [[3, 'The reaction is so hot that the iron forms as a molten (melted) metal.']]),
  // Difficulty 3: polyatomic ions, and combustion that needs every coefficient doubled.
  brx('ions', ['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag'], ['s', 'aq', 'aq', 's'], [[3, 'The silver forms as shiny solid crystals on the copper.'], [2, 'The copper(II) nitrate forms a blue solution.']]),
  brx('ions', ['Mg', 'AgNO3'], ['Mg(NO3)2', 'Ag'], ['s', 'aq', 'aq', 's'], [[3, 'The silver forms as a grey solid on the magnesium.']]),
  brx('ions', ['Al', 'CuSO4'], ['Al2(SO4)3', 'Cu'], ['s', 'aq', 'aq', 's'], [[1, 'The copper(II) sulfate is dissolved in water.'], [3, 'The copper forms as a solid coating.']]),
  brx('ions', ['Al', 'H2SO4'], ['Al2(SO4)3', 'H2'], ['s', 'aq', 'aq', 'g'], [[3, 'The hydrogen bubbles off as a gas.']]),
  brx('ions', ['CaCl2', 'Na3PO4'], ['Ca3(PO4)2', 'NaCl'], ['aq', 'aq', 's', 'aq'], [[2, 'The calcium phosphate forms as a white precipitate.']]),
  brx('ions', ['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3'], ['aq', 'aq', 's', 'aq'], [[2, 'The lead(II) iodide forms as a bright yellow precipitate.'], [3, 'The potassium nitrate stays dissolved in the water.']]),
  brx('ions', ['CuSO4', 'NaOH'], ['Cu(OH)2', 'Na2SO4'], ['aq', 'aq', 's', 'aq'], [[2, 'The copper(II) hydroxide forms as a pale blue precipitate.']]),
  brx('ions', ['FeCl3', 'NaOH'], ['Fe(OH)3', 'NaCl'], ['aq', 'aq', 's', 'aq'], [[2, 'The iron(III) hydroxide forms as an orange-brown precipitate.']]),
  brx('ions', ['H2SO4', 'NaOH'], ['Na2SO4', 'H2O'], ['aq', 'aq', 'aq', 'l'], [[3, 'The water formed is a liquid.']]),
  brx('ions', ['Ca(OH)2', 'HNO3'], ['Ca(NO3)2', 'H2O'], ['aq', 'aq', 'aq', 'l'], [[2, 'The calcium nitrate stays dissolved in the water.']]),
  brx('ions', ['Al2(SO4)3', 'Ba(NO3)2'], ['BaSO4', 'Al(NO3)3'], ['aq', 'aq', 's', 'aq'], [[2, 'The barium sulfate forms as a white precipitate.']]),
  brx('ions', ['AgNO3', 'CaCl2'], ['AgCl', 'Ca(NO3)2'], ['aq', 'aq', 's', 'aq'], [[2, 'The silver chloride forms as a white precipitate.']]),
  brx('ions', ['Na2CO3', 'HCl'], ['NaCl', 'H2O', 'CO2'], ['aq', 'aq', 'aq', 'l', 'g'], [[4, 'The carbon dioxide fizzes out of the solution.']]),
  brx('ions', ['H3PO4', 'KOH'], ['K3PO4', 'H2O'], ['aq', 'aq', 'aq', 'l'], [[2, 'The potassium phosphate stays dissolved in the water.']]),
  brx('ions', ['Fe2(SO4)3', 'KOH'], ['Fe(OH)3', 'K2SO4'], ['aq', 'aq', 's', 'aq'], [[2, 'The iron(III) hydroxide forms as an orange-brown precipitate.']]),
  brx('combustion', ['C2H6', 'O2'], ['CO2', 'H2O']),
  brx('combustion', ['C4H10', 'O2'], ['CO2', 'H2O']),
  brx('combustion', ['C2H2', 'O2'], ['CO2', 'H2O']),
];
/** Combustions with an odd number of oxygen atoms on the right need every coefficient doubled: those are harder. */
const doubled = (x: BalRx) => x.c[0] > 1;

const STATE_SYMBOLS = ['(s)', '(l)', '(g)', '(aq)'];
const STATE_NAMES: Record<string, string> = { s: 'a solid', l: 'a liquid', g: 'a gas', aq: 'dissolved in water (aqueous)' };
const BALANCE_HINTS: Record<BalRx['kind'], string[]> = {
  simple: ['Count the atoms of each element on both sides.', 'Change only the coefficients, the big numbers in front, never the small subscripts. A diatomic element such as $\\ce{O2}$ brings its atoms in pairs.'],
  combustion: ['Balance carbon first, then hydrogen, and oxygen last.', 'If oxygen needs half a molecule, double every coefficient.'],
  displacement: ['Count the atoms of each element on both sides, and balance one element at a time.', 'Leave an element written on its own, such as $\\ce{H2}$ or $\\ce{Cu}$, until last: changing it changes nothing else.'],
  ions: ['Treat a polyatomic ion that stays together, such as $\\ce{SO4}$, $\\ce{NO3}$ or $\\ce{OH}$, as one unit.', 'Start with the formula that has the most atoms, then balance the ions, and leave lone elements, hydrogen and oxygen until last.'],
};

function balancing(rng: Rng, d: Difficulty): GenOutput {
  const pool = BAL_RXS.filter((x) => x.c.some((k) => k > 1)).filter((x) =>
    d === 1 ? x.kind === 'simple' : d === 2 ? x.kind === 'displacement' || (x.kind === 'combustion' && !doubled(x)) : x.kind === 'ions' || (x.kind === 'combustion' && doubled(x)),
  );
  const x = rng.pick(pool);
  const coefficients = part({ kind: 'coefficients', reactants: x.r, products: x.p });
  const hints = BALANCE_HINTS[x.kind];
  if (d > 1 && x.ask && x.states && rng.chance(0.5)) {
    const [i, text] = rng.pick(x.ask);
    const f = species(x)[i];
    const shown = x.states.map((s, j) => (j === i ? null : s));
    return {
      prompt: `Balance the equation $\\ce{${eqCe(x, false, shown)}}$ with the smallest whole-number coefficients. Then choose the state symbol for $\\ce{${f}}$, which is left out: ${text.charAt(0).toLowerCase()}${text.slice(1)}`,
      parts: [part(coefficients.answer, { label: 'Coefficients' }), part(fixedChoice(STATE_SYMBOLS, STATE_SYMBOLS.indexOf(`(${x.states[i]})`)), { label: `State symbol for $\\ce{${f}}$` })],
      hints: [...hints, 'State symbols: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. A precipitate is a solid.'],
      solution: [eqMd(x, true, x.states), atomCheck(x), `$\\ce{${f}}$ is ${STATE_NAMES[x.states[i]]}, so its state symbol is (${x.states[i]}).`],
    };
  }
  const withStates = d > 1 && x.states && rng.chance(0.5) ? x.states : undefined;
  return {
    prompt: `Balance the equation $\\ce{${eqCe(x, false, withStates)}}$ with the smallest whole-number coefficients.`,
    parts: [coefficients],
    hints,
    solution: [eqMd(x, true, withStates), atomCheck(x)],
  };
}

// ---------------------------------------------------------------------------- lesson 4.3: types of reactions

type RxType = 'synthesis' | 'decomposition' | 'single' | 'double' | 'combustion';
interface TypedRx extends Eq {
  type: RxType;
  names: string[];
  /** A metal or hydrogen burning in oxygen: a synthesis that is also a combustion, so never used to name a type. */
  burns?: boolean;
  /** Synthesis from two compounds: the reactants alone look like a double displacement. */
  compounds?: boolean;
}
const trx = (type: RxType, r: string[], p: string[], names: string[], more: Partial<TypedRx> = {}): TypedRx => ({ type, ...eqn(r, p), names, ...more });

const TYPED_RXS: TypedRx[] = [
  trx('synthesis', ['Na', 'Cl2'], ['NaCl'], ['sodium', 'chlorine', 'sodium chloride']),
  trx('synthesis', ['N2', 'H2'], ['NH3'], ['nitrogen', 'hydrogen', 'ammonia']),
  trx('synthesis', ['H2', 'Cl2'], ['HCl'], ['hydrogen', 'chlorine', 'hydrogen chloride']),
  trx('synthesis', ['Fe', 'S'], ['FeS'], ['iron', 'sulfur', 'iron(II) sulfide']),
  trx('synthesis', ['Al', 'Br2'], ['AlBr3'], ['aluminium', 'bromine', 'aluminium bromide']),
  trx('synthesis', ['K', 'I2'], ['KI'], ['potassium', 'iodine', 'potassium iodide']),
  trx('synthesis', ['Mg', 'Cl2'], ['MgCl2'], ['magnesium', 'chlorine', 'magnesium chloride']),
  trx('synthesis', ['Zn', 'S'], ['ZnS'], ['zinc', 'sulfur', 'zinc sulfide']),
  trx('synthesis', ['Fe', 'Cl2'], ['FeCl3'], ['iron', 'chlorine', 'iron(III) chloride']),
  trx('synthesis', ['CaO', 'H2O'], ['Ca(OH)2'], ['calcium oxide', 'water', 'calcium hydroxide'], { compounds: true }),
  trx('synthesis', ['Mg', 'O2'], ['MgO'], ['magnesium', 'oxygen', 'magnesium oxide'], { burns: true }),
  trx('synthesis', ['H2', 'O2'], ['H2O'], ['hydrogen', 'oxygen', 'water'], { burns: true }),
  trx('decomposition', ['H2O'], ['H2', 'O2'], ['water', 'hydrogen', 'oxygen']),
  trx('decomposition', ['HgO'], ['Hg', 'O2'], ['mercury(II) oxide', 'mercury', 'oxygen']),
  trx('decomposition', ['NaCl'], ['Na', 'Cl2'], ['sodium chloride', 'sodium', 'chlorine']),
  trx('decomposition', ['CaCO3'], ['CaO', 'CO2'], ['calcium carbonate', 'calcium oxide', 'carbon dioxide']),
  trx('decomposition', ['CuCO3'], ['CuO', 'CO2'], ['copper(II) carbonate', 'copper(II) oxide', 'carbon dioxide']),
  trx('decomposition', ['H2O2'], ['H2O', 'O2'], ['hydrogen peroxide', 'water', 'oxygen']),
  trx('decomposition', ['KClO3'], ['KCl', 'O2'], ['potassium chlorate', 'potassium chloride', 'oxygen']),
  trx('decomposition', ['Ag2O'], ['Ag', 'O2'], ['silver oxide', 'silver', 'oxygen']),
  trx('decomposition', ['MgCO3'], ['MgO', 'CO2'], ['magnesium carbonate', 'magnesium oxide', 'carbon dioxide']),
  trx('single', ['Zn', 'CuSO4'], ['ZnSO4', 'Cu'], ['zinc', 'copper(II) sulfate', 'zinc sulfate', 'copper']),
  trx('single', ['Fe', 'CuSO4'], ['FeSO4', 'Cu'], ['iron', 'copper(II) sulfate', 'iron(II) sulfate', 'copper']),
  trx('single', ['Mg', 'HCl'], ['MgCl2', 'H2'], ['magnesium', 'hydrochloric acid', 'magnesium chloride', 'hydrogen']),
  trx('single', ['Zn', 'HCl'], ['ZnCl2', 'H2'], ['zinc', 'hydrochloric acid', 'zinc chloride', 'hydrogen']),
  trx('single', ['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag'], ['copper', 'silver nitrate', 'copper(II) nitrate', 'silver']),
  trx('single', ['Na', 'H2O'], ['NaOH', 'H2'], ['sodium', 'water', 'sodium hydroxide', 'hydrogen']),
  trx('single', ['Cl2', 'KBr'], ['KCl', 'Br2'], ['chlorine', 'potassium bromide', 'potassium chloride', 'bromine']),
  trx('single', ['Cl2', 'NaI'], ['NaCl', 'I2'], ['chlorine', 'sodium iodide', 'sodium chloride', 'iodine']),
  trx('single', ['Br2', 'KI'], ['KBr', 'I2'], ['bromine', 'potassium iodide', 'potassium bromide', 'iodine']),
  trx('single', ['Al', 'CuCl2'], ['AlCl3', 'Cu'], ['aluminium', 'copper(II) chloride', 'aluminium chloride', 'copper']),
  trx('single', ['Mg', 'CuO'], ['MgO', 'Cu'], ['magnesium', 'copper(II) oxide', 'magnesium oxide', 'copper']),
  trx('double', ['AgNO3', 'NaCl'], ['AgCl', 'NaNO3'], ['silver nitrate', 'sodium chloride', 'silver chloride', 'sodium nitrate']),
  trx('double', ['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3'], ['lead(II) nitrate', 'potassium iodide', 'lead(II) iodide', 'potassium nitrate']),
  trx('double', ['BaCl2', 'Na2SO4'], ['BaSO4', 'NaCl'], ['barium chloride', 'sodium sulfate', 'barium sulfate', 'sodium chloride']),
  trx('double', ['CuSO4', 'NaOH'], ['Cu(OH)2', 'Na2SO4'], ['copper(II) sulfate', 'sodium hydroxide', 'copper(II) hydroxide', 'sodium sulfate']),
  trx('double', ['HCl', 'NaOH'], ['NaCl', 'H2O'], ['hydrochloric acid', 'sodium hydroxide', 'sodium chloride', 'water']),
  trx('double', ['H2SO4', 'KOH'], ['K2SO4', 'H2O'], ['sulfuric acid', 'potassium hydroxide', 'potassium sulfate', 'water']),
  trx('double', ['CaCl2', 'Na2CO3'], ['CaCO3', 'NaCl'], ['calcium chloride', 'sodium carbonate', 'calcium carbonate', 'sodium chloride']),
  trx('double', ['FeCl3', 'NaOH'], ['Fe(OH)3', 'NaCl'], ['iron(III) chloride', 'sodium hydroxide', 'iron(III) hydroxide', 'sodium chloride']),
  trx('combustion', ['CH4', 'O2'], ['CO2', 'H2O'], ['methane', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C3H8', 'O2'], ['CO2', 'H2O'], ['propane', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C2H6', 'O2'], ['CO2', 'H2O'], ['ethane', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C4H10', 'O2'], ['CO2', 'H2O'], ['butane', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C2H4', 'O2'], ['CO2', 'H2O'], ['ethene', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C2H5OH', 'O2'], ['CO2', 'H2O'], ['ethanol', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C5H12', 'O2'], ['CO2', 'H2O'], ['pentane', 'oxygen', 'carbon dioxide', 'water']),
  trx('combustion', ['C8H18', 'O2'], ['CO2', 'H2O'], ['octane', 'oxygen', 'carbon dioxide', 'water']),
];

const TYPE_ORDER: RxType[] = ['synthesis', 'decomposition', 'single', 'double', 'combustion'];
const TYPES: Record<RxType, { name: string; rule: string }> = {
  synthesis: { name: 'Synthesis', rule: 'Two or more reactants combine into one product: A + B → AB.' },
  decomposition: { name: 'Decomposition', rule: 'One reactant breaks down into two or more simpler products: AB → A + B.' },
  single: { name: 'Single displacement', rule: 'An element takes the place of another element in a compound: A + BC → AC + B.' },
  double: { name: 'Double displacement', rule: 'Two compounds swap partners: AB + CD → AD + CB.' },
  combustion: { name: 'Combustion', rule: 'A fuel burns in oxygen. A fuel of carbon and hydrogen (and sometimes oxygen) forms carbon dioxide and water.' },
};
const TYPE_NAMES = TYPE_ORDER.map((t) => TYPES[t].name);
const wordOf = (x: TypedRx) => wordEq(x.names.slice(0, x.r.length), x.names.slice(x.r.length));
const isElement = (f: string) => parseFormula(f).atoms.size === 1;

function reactionType(rng: Rng, d: Difficulty): GenOutput {
  const usable = TYPED_RXS.filter((x) => !x.burns);
  if (d === 3 && rng.chance(0.5)) {
    const want = rng.pick(TYPE_ORDER);
    const right = rng.pick(usable.filter((x) => x.type === want));
    const others = rng.shuffle(TYPE_ORDER.filter((t) => t !== want)).slice(0, 3).map((t) => rng.pick(usable.filter((x) => x.type === t)));
    return {
      prompt: `Which equation shows a ${TYPES[want].name.toLowerCase()} reaction?`,
      parts: [part(mc(rng, eqMd(right), others.map((x) => eqMd(x))))],
      hints: ['Sort each reactant and product into elements (one symbol, such as $\\ce{Na}$ or $\\ce{O2}$) and compounds (two or more symbols).', `A ${TYPES[want].name.toLowerCase()} reaction: ${TYPES[want].rule}`],
      solution: [`${eqMd(right)} is a ${TYPES[want].name.toLowerCase()}. ${TYPES[want].rule}`, ...others.map((x) => `${eqMd(x)} is a ${TYPES[x.type].name.toLowerCase()}.`)],
    };
  }
  const pool = d === 1 ? usable.filter((x) => x.type === 'synthesis' || x.type === 'decomposition' || x.type === 'combustion') : d === 2 ? usable : usable.filter((x) => !x.compounds);
  const x = rng.pick(pool);
  const choice = part(fixedChoice(TYPE_NAMES, TYPE_ORDER.indexOf(x.type)));
  if (d === 3) {
    const sorted = x.r.map((f, i) => `$\\ce{${f}}$ (${x.names[i]}) is ${isElement(f) ? 'an element' : x.type === 'combustion' && f !== 'O2' ? 'a fuel' : 'a compound'}`);
    return {
      prompt: `${x.r.length === 1 ? `A reaction has one reactant, ${x.names[0]}, $\\ce{${x.r[0]}}$.` : `A reaction has the reactants ${x.names[0]}, $\\ce{${x.r[0]}}$, and ${x.names[1]}, $\\ce{${x.r[1]}}$.`} Before you see the products, what type of reaction is it?`,
      parts: [choice],
      hints: ['The reactants decide the type: one compound, two elements, an element and a compound, or two compounds.', 'A fuel with oxygen is a combustion, even though oxygen is an element.'],
      solution: [`${cap(sorted.join(', and '))}.`, `${TYPES[x.type].name}. ${TYPES[x.type].rule} The whole equation is ${eqMd(x)}.`],
    };
  }
  return {
    prompt: d === 1 ? `What type of reaction is ${wordOf(x)}, ${eqMd(x)}?` : `What type of reaction is ${eqMd(x)}?`,
    parts: [choice],
    hints: ['Count the reactants and the products, and decide whether each is an element (one symbol) or a compound (two or more).', 'A fuel such as a hydrocarbon reacting with oxygen to make carbon dioxide and water is a combustion.'],
    solution: [`${TYPES[x.type].name}. ${TYPES[x.type].rule}`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.3: predicting products

const HYDROCARBONS: Array<[string, string]> = [['CH4', 'methane'], ['C2H6', 'ethane'], ['C3H8', 'propane'], ['C4H10', 'butane'], ['C5H12', 'pentane'], ['C6H14', 'hexane'], ['C8H18', 'octane'], ['C2H4', 'ethene']];
const OXIDES: Array<{ metal: string; sym: string; oxide: string; ox: string; ion: string }> = [
  { metal: 'magnesium', sym: 'Mg', oxide: 'MgO', ox: 'magnesium oxide', ion: 'magnesium' },
  { metal: 'calcium', sym: 'Ca', oxide: 'CaO', ox: 'calcium oxide', ion: 'calcium' },
  { metal: 'zinc', sym: 'Zn', oxide: 'ZnO', ox: 'zinc oxide', ion: 'zinc' },
  { metal: 'aluminium', sym: 'Al', oxide: 'Al2O3', ox: 'aluminium oxide', ion: 'aluminium' },
  { metal: 'copper', sym: 'Cu', oxide: 'CuO', ox: 'copper(II) oxide', ion: 'copper(II)' },
  { metal: 'iron', sym: 'Fe', oxide: 'Fe2O3', ox: 'iron(III) oxide', ion: 'iron(III)' },
  { metal: 'lithium', sym: 'Li', oxide: 'Li2O', ox: 'lithium oxide', ion: 'lithium' },
  { metal: 'sodium', sym: 'Na', oxide: 'Na2O', ox: 'sodium oxide', ion: 'sodium' },
];

/** The reactivity order the questions state, most reactive first, with each metal's ion name and charge. */
const SERIES: Array<{ metal: string; sym: string; ion: string; charge: number }> = [
  { metal: 'magnesium', sym: 'Mg', ion: 'magnesium', charge: 2 },
  { metal: 'zinc', sym: 'Zn', ion: 'zinc', charge: 2 },
  { metal: 'iron', sym: 'Fe', ion: 'iron(II)', charge: 2 },
  { metal: 'copper', sym: 'Cu', ion: 'copper(II)', charge: 2 },
  { metal: 'silver', sym: 'Ag', ion: 'silver', charge: 1 },
];
const SERIES_TEXT = 'Use this reactivity order, most reactive first: magnesium, zinc, iron, copper, silver.';
const ACID_SERIES_TEXT = 'Use this reactivity order, most reactive first: magnesium, zinc, iron, hydrogen, copper, silver. A metal above hydrogen reacts with a dilute acid; a metal below it does not.';
function saltFormula(sym: string, charge: number, anion: 'SO4' | 'NO3' | 'Cl'): string {
  if (anion === 'SO4') return charge === 2 ? `${sym}SO4` : `${sym}2SO4`;
  if (anion === 'NO3') return charge === 1 ? `${sym}NO3` : `${sym}(NO3)${charge}`;
  return charge === 1 ? `${sym}Cl` : `${sym}Cl${charge}`;
}
const ANION_NAME = { SO4: 'sulfate', NO3: 'nitrate', Cl: 'chloride' } as const;

/** Double displacements that make a precipitate, with the solubility rules that decide it. */
const PRECIPITATES: Array<{ a: [string, string]; b: [string, string]; solid: [string, string]; other: [string, string]; colour: string; rule: string }> = [
  { a: ['silver nitrate', 'AgNO3'], b: ['sodium chloride', 'NaCl'], solid: ['silver chloride', 'AgCl'], other: ['sodium nitrate', 'NaNO3'], colour: 'white', rule: 'most chlorides dissolve, but silver chloride does not' },
  { a: ['silver nitrate', 'AgNO3'], b: ['potassium bromide', 'KBr'], solid: ['silver bromide', 'AgBr'], other: ['potassium nitrate', 'KNO3'], colour: 'cream', rule: 'most bromides dissolve, but silver bromide does not' },
  { a: ['silver nitrate', 'AgNO3'], b: ['potassium iodide', 'KI'], solid: ['silver iodide', 'AgI'], other: ['potassium nitrate', 'KNO3'], colour: 'pale yellow', rule: 'most iodides dissolve, but silver iodide does not' },
  { a: ['lead(II) nitrate', 'Pb(NO3)2'], b: ['potassium iodide', 'KI'], solid: ['lead(II) iodide', 'PbI2'], other: ['potassium nitrate', 'KNO3'], colour: 'bright yellow', rule: 'most iodides dissolve, but lead(II) iodide does not' },
  { a: ['lead(II) nitrate', 'Pb(NO3)2'], b: ['sodium chloride', 'NaCl'], solid: ['lead(II) chloride', 'PbCl2'], other: ['sodium nitrate', 'NaNO3'], colour: 'white', rule: 'most chlorides dissolve, but lead(II) chloride does not' },
  { a: ['barium chloride', 'BaCl2'], b: ['sodium sulfate', 'Na2SO4'], solid: ['barium sulfate', 'BaSO4'], other: ['sodium chloride', 'NaCl'], colour: 'white', rule: 'most chlorides dissolve, and most sulfates dissolve, but barium sulfate does not' },
  { a: ['barium nitrate', 'Ba(NO3)2'], b: ['potassium sulfate', 'K2SO4'], solid: ['barium sulfate', 'BaSO4'], other: ['potassium nitrate', 'KNO3'], colour: 'white', rule: 'most sulfates dissolve, but barium sulfate does not' },
  { a: ['copper(II) sulfate', 'CuSO4'], b: ['sodium hydroxide', 'NaOH'], solid: ['copper(II) hydroxide', 'Cu(OH)2'], other: ['sodium sulfate', 'Na2SO4'], colour: 'pale blue', rule: 'most sulfates dissolve, but most hydroxides do not, except those of sodium and potassium' },
  { a: ['iron(III) chloride', 'FeCl3'], b: ['sodium hydroxide', 'NaOH'], solid: ['iron(III) hydroxide', 'Fe(OH)3'], other: ['sodium chloride', 'NaCl'], colour: 'orange-brown', rule: 'most chlorides dissolve, but most hydroxides do not, except those of sodium and potassium' },
  { a: ['iron(II) sulfate', 'FeSO4'], b: ['potassium hydroxide', 'KOH'], solid: ['iron(II) hydroxide', 'Fe(OH)2'], other: ['potassium sulfate', 'K2SO4'], colour: 'green', rule: 'most sulfates dissolve, but most hydroxides do not, except those of sodium and potassium' },
  { a: ['calcium chloride', 'CaCl2'], b: ['sodium carbonate', 'Na2CO3'], solid: ['calcium carbonate', 'CaCO3'], other: ['sodium chloride', 'NaCl'], colour: 'white', rule: 'most chlorides dissolve, but most carbonates do not, except those of sodium and potassium' },
  { a: ['magnesium chloride', 'MgCl2'], b: ['potassium hydroxide', 'KOH'], solid: ['magnesium hydroxide', 'Mg(OH)2'], other: ['potassium chloride', 'KCl'], colour: 'white', rule: 'most chlorides dissolve, but most hydroxides do not, except those of sodium and potassium' },
];

function predictProducts(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.5)) {
      const [f, name] = rng.pick(HYDROCARBONS);
      const x = eqn([f, 'O2'], ['CO2', 'H2O']);
      return {
        prompt: `${cap(name)}, ${$(f)}, is a hydrocarbon. What are the products of its complete combustion in plenty of oxygen?`,
        parts: [part(mc(rng, 'Carbon dioxide and water', ['Carbon monoxide and water', 'Carbon dioxide and hydrogen', 'Carbon and hydrogen']))],
        hints: ['A hydrocarbon contains only carbon and hydrogen. In complete combustion, each element joins with oxygen.', 'Carbon joined with oxygen is carbon dioxide; hydrogen joined with oxygen is water.'],
        solution: [`The carbon forms carbon dioxide and the hydrogen forms water: ${eqMd(x)}.`],
      };
    }
    const m = rng.pick(OXIDES);
    const x = eqn([m.sym, 'O2'], [m.oxide]);
    return {
      prompt: `${cap(m.metal)} is heated in oxygen until it has all reacted. What is the product?`,
      parts: [part(mc(rng, cap(m.ox), [`${cap(m.ion)} hydroxide`, `${cap(m.ion)} carbonate`, `${cap(m.metal)} dioxide`].filter((s) => s !== cap(m.ox))))],
      hints: ['A metal that reacts with oxygen forms a metal oxide.', 'Only the metal and oxygen react, so the product contains only those two elements.'],
      solution: [`The metal and oxygen combine into one compound, ${m.ox}: ${eqMd(x)}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.35)) {
      // A metal and a dilute acid, with hydrogen placed in the reactivity order.
      const order = ['magnesium', 'zinc', 'iron', 'copper', 'silver'];
      const m = rng.chance(0.7) ? rng.pick(SERIES.slice(0, 3)) : rng.pick(SERIES.slice(3));
      const acid = rng.pick([{ name: 'hydrochloric acid', f: 'HCl', anion: 'Cl' as const }, { name: 'sulfuric acid', f: 'H2SO4', anion: 'SO4' as const }]);
      const reacts = order.indexOf(m.metal) < 3;
      const salt = `${m.ion} ${ANION_NAME[acid.anion]}`;
      const right = reacts ? `${cap(salt)} and hydrogen` : 'No reaction happens';
      const wrong = reacts ? ['No reaction happens', `${cap(salt)} and water`, `${cap(m.ion)} oxide and hydrogen`] : [`${cap(salt)} and hydrogen`, `${cap(salt)} and water`, `${cap(m.ion)} oxide and hydrogen`];
      const x = reacts ? eqn([m.sym, acid.f], [saltFormula(m.sym, m.charge, acid.anion), 'H2']) : null;
      return {
        prompt: `${cap(m.metal)} is added to dilute ${acid.name}. ${ACID_SERIES_TEXT} What forms?`,
        parts: [part(mc(rng, right, wrong))],
        hints: ['Find the metal in the order: is it above or below hydrogen?', 'A metal that reacts with an acid takes the place of its hydrogen: metal + acid → salt + hydrogen.'],
        solution: reacts
          ? [`${cap(m.metal)} is above hydrogen, so it displaces hydrogen from the acid.`, `${cap(m.metal)} + ${acid.name} → ${salt} + hydrogen: ${eqMd(x!)}.`]
          : [`${cap(m.metal)} is below hydrogen, so it cannot displace hydrogen from the acid. No reaction happens.`],
      };
    }
    // About two in three of these questions have a reaction, so "no reaction" is not the usual answer.
    const pair = rng.sample(SERIES, 2).sort((x, y) => SERIES.indexOf(x) - SERIES.indexOf(y));
    const [m, n] = rng.chance(0.65) ? pair : [pair[1], pair[0]];
    const anion = n.metal === 'silver' ? 'NO3' : 'SO4';
    const solution = `${n.ion} ${ANION_NAME[anion]}`;
    const salt = `${m.ion} ${ANION_NAME[anion]}`;
    const reacts = SERIES.indexOf(m) < SERIES.indexOf(n);
    const right = reacts ? `${cap(salt)} and ${n.metal}` : 'No reaction happens';
    const wrong = reacts ? ['No reaction happens', `${cap(salt)} and hydrogen`, `${cap(m.ion)} oxide and ${n.metal}`] : [`${cap(salt)} and ${n.metal}`, `${cap(salt)} and hydrogen`, `${cap(m.ion)} oxide and ${n.metal}`];
    const x = reacts ? eqn([m.sym, saltFormula(n.sym, n.charge, anion)], [saltFormula(m.sym, m.charge, anion), n.sym]) : null;
    return {
      prompt: `A piece of ${m.metal} is placed in ${solution} solution. ${SERIES_TEXT} What forms?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['A more reactive metal displaces a less reactive metal from a solution of its compound. A less reactive metal cannot.', `Compare the places of ${m.metal} and ${n.metal} in the order.`],
      solution: reacts
        ? [`${cap(m.metal)} is more reactive than ${n.metal}, so it displaces the ${n.metal}.`, `${cap(m.metal)} + ${solution} → ${salt} + ${n.metal}: ${eqMd(x!)}.`]
        : [`${cap(m.metal)} is less reactive than ${n.metal}, so it cannot displace it. No reaction happens.`],
    };
  }
  const pr = rng.pick(PRECIPITATES);
  const x = eqn([pr.a[1], pr.b[1]], [pr.solid[1], pr.other[1]]);
  const both = (n: [string, string]) => `${n[0]}, $\\ce{${n[1]}}$`;
  const right = `${cap(both(pr.solid))}, precipitates; ${both(pr.other)}, stays dissolved`;
  const wrong = [
    `${cap(both(pr.other))}, precipitates; ${both(pr.solid)}, stays dissolved`,
    `${cap(both(pr.a))}, precipitates; ${both(pr.b)}, stays dissolved`,
    'No reaction: everything stays dissolved',
  ];
  return {
    prompt: `Solutions of ${both(pr.a)}, and ${both(pr.b)}, are mixed. Use these solubility rules: all sodium and potassium compounds and all nitrates dissolve in water; ${pr.rule}. What forms?`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['In a double displacement the two compounds swap partners: the metal of each joins the other non-metal part.', 'Check each new compound against the rules. One that does not dissolve comes out of the solution as a solid, the precipitate.'],
    solution: [
      `Swapping partners gives ${pr.solid[0]} and ${pr.other[0]}.`,
      `${cap(pr.other[0])} dissolves, but ${pr.solid[0]} does not, so it forms a ${pr.colour} precipitate.`,
      `${eqMd(x, true, ['aq', 'aq', 's', 'aq'])}`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.4: exothermic and endothermic

const TEMP_RXS: Array<{ text: string; exo: boolean }> = [
  { text: 'Magnesium ribbon is added to dilute hydrochloric acid in a polystyrene cup', exo: true },
  { text: 'Sodium hydroxide solution is added to dilute hydrochloric acid', exo: true },
  { text: 'Zinc powder is stirred into copper(II) sulfate solution', exo: true },
  { text: 'Calcium oxide is added to water', exo: true },
  { text: 'Iron filings are stirred into copper(II) sulfate solution', exo: true },
  { text: 'Potassium hydroxide solution is added to dilute nitric acid', exo: true },
  { text: 'Sodium hydrogen carbonate powder is added to citric acid solution', exo: false },
  { text: 'Ammonium nitrate is dissolved in water', exo: false },
  { text: 'Solid barium hydroxide is mixed with solid ammonium chloride in a beaker', exo: false },
  { text: 'Potassium chloride is dissolved in water', exo: false },
  { text: 'Sodium hydrogen carbonate powder is added to ethanoic acid', exo: false },
];
const EVERYDAY: Array<{ text: string; exo: boolean; why: string }> = [
  { text: 'Natural gas burns in a cooker flame.', exo: true, why: 'Burning gives out energy as heat and light.' },
  { text: 'Respiration in muscle cells releases energy from glucose.', exo: true, why: 'Respiration gives out energy that the cells use.' },
  { text: 'A green leaf makes glucose by photosynthesis.', exo: false, why: 'Photosynthesis takes in energy from light.' },
  { text: 'Calcium carbonate breaks down into calcium oxide and carbon dioxide only while it is heated strongly in a kiln.', exo: false, why: 'The breakdown takes in heat and stops when the heating stops.' },
  { text: 'A hand warmer gets hot as iron powder inside it reacts with oxygen from the air.', exo: true, why: 'The reaction gives out heat to the surroundings.' },
  { text: 'A sports cold pack gets cold when the solid inside dissolves in the water around it.', exo: false, why: 'Dissolving the solid takes in heat from the surroundings, so they cool down.' },
  { text: 'A firework explodes with a bang and a flash.', exo: true, why: 'The explosion gives out energy as heat, light and sound.' },
  { text: 'An electric current splits water into hydrogen and oxygen.', exo: false, why: 'The reaction takes in electrical energy and stops when the current stops.' },
  { text: 'Wood burns on a campfire.', exo: true, why: 'Burning gives out energy as heat and light.' },
  { text: 'Baking powder in a cake mix breaks down and releases carbon dioxide only while the cake is in a hot oven.', exo: false, why: 'The breakdown takes in heat from the oven.' },
];
const EXO_ENDO = ['Exothermic', 'Endothermic'];
const tempText = (v: number) => fmtFixed(v, 1);

function exoEndo(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.int(0, 2);
    if (kind === 0) {
      const e = rng.pick(EVERYDAY);
      return {
        prompt: `${e.text} Is this change exothermic or endothermic?`,
        parts: [part(fixedChoice(EXO_ENDO, e.exo ? 0 : 1))],
        hints: ['An exothermic change gives out energy to its surroundings. An endothermic change takes energy in.', 'Ask whether the change gives out heat or light, or needs energy supplied to keep going.'],
        solution: [`${e.why} So it is ${e.exo ? 'exothermic' : 'endothermic'}.`],
      };
    }
    if (kind === 1) {
      const t = rng.pick(TEMP_RXS);
      const start = rng.float(18, 24, 1);
      const end = t.exo ? start + rng.float(3, 25, 1) : start - rng.float(2, 12, 1);
      return {
        prompt: `${t.text}. The temperature of the mixture ${t.exo ? 'rises' : 'falls'} from ${degC(tempText(start))} to ${degC(tempText(end))}. Is the change exothermic or endothermic?`,
        parts: [part(fixedChoice(EXO_ENDO, t.exo ? 0 : 1))],
        hints: ['In an exothermic change, energy is given out to the surroundings, so the mixture gets warmer.', 'In an endothermic change, energy is taken in from the surroundings, so the mixture gets colder.'],
        solution: [`The temperature ${t.exo ? 'rises, so energy is given out' : 'falls, so energy is taken in'}: the change is ${t.exo ? 'exothermic' : 'endothermic'}.`],
      };
    }
    const exo = rng.chance(0.5);
    const v = rng.int(2, 120) * 5;
    const label = rng.pick(['P', 'Q', 'R', 'X', 'Y', 'Z']);
    return {
      prompt: `The energy change for reaction ${label} is $${exo ? '-' : '+'}${v}\\ \\text{kJ}$. Is the reaction exothermic or endothermic?`,
      parts: [part(fixedChoice(EXO_ENDO, exo ? 0 : 1))],
      hints: ['The energy change is negative when the reaction gives out energy, and positive when it takes energy in.'],
      solution: [`The energy change is ${exo ? 'negative: energy is given out' : 'positive: energy is taken in'}, so the reaction is ${exo ? 'exothermic' : 'endothermic'}.`],
    };
  }
  if (d === 2) {
    const t = rng.pick(TEMP_RXS);
    const start = rng.float(17, 25, 1);
    const change = Math.round((t.exo ? rng.float(2, 25, 1) : -rng.float(2, 12, 1)) * 10) / 10;
    const end = Math.round((start + change) * 10) / 10;
    const dT = Math.round((end - start) * 10) / 10;
    return {
      prompt: `${t.text}. A thermometer reads ${degC(tempText(start))} at the start and ${degC(tempText(end))} at the end. Find the temperature change, final temperature − initial temperature, and classify the change.`,
      parts: [numPart(dT, { decimals: 1, suffix: '°C', label: 'Temperature change' }), part(fixedChoice(EXO_ENDO, dT > 0 ? 0 : 1), { label: 'The change is' })],
      calculator: true,
      hints: ['Temperature change = final temperature − initial temperature. A fall gives a negative answer.', 'A rise in temperature means energy is given out (exothermic); a fall means energy is taken in (endothermic).'],
      solution: [`$${tempText(end)} - ${tempText(start)} = ${tempText(dT)}^\\circ\\text{C}$`, `The temperature ${dT > 0 ? 'rose, so energy was given out: exothermic' : 'fell, so energy was taken in: endothermic'}.`],
    };
  }
  if (rng.chance(0.5)) {
    // Bond breaking takes energy in; bond making gives it out.
    const inE = rng.int(30, 400) * 5;
    let outE = inE + rng.sign() * rng.int(4, 120) * 5;
    if (outE <= 0) outE = inE + rng.int(4, 60) * 5;
    const net = inE - outE;
    const exo = net < 0;
    return {
      prompt: `In a reaction, breaking the bonds in the reactants takes in $${inE}\\ \\text{kJ}$ of energy, and making the bonds in the products gives out $${outE}\\ \\text{kJ}$. Find the overall energy change (energy taken in − energy given out), and classify the reaction.`,
      parts: [numPart(net, { decimals: 0, tolerance: 0, suffix: 'kJ', label: 'Energy change' }), part(fixedChoice(EXO_ENDO, exo ? 0 : 1), { label: 'The reaction is' })],
      calculator: true,
      hints: ['Breaking bonds takes in energy; making bonds gives energy out.', 'If making the new bonds gives out more energy than breaking the old ones takes in, the reaction is exothermic and the energy change is negative.'],
      solution: [`Energy change $= ${inE} - ${outE} = ${net}\\ \\text{kJ}$`, `${exo ? 'More energy is given out making bonds than is taken in breaking them' : 'More energy is taken in breaking bonds than is given out making them'}, so the reaction is ${exo ? 'exothermic' : 'endothermic'}.`],
    };
  }
  // Four mixtures in a table: select every exothermic (or endothermic) one.
  const askExo = rng.chance(0.5);
  const kinds = rng.shuffle([true, false, rng.chance(0.5), rng.chance(0.5)]);
  const rows = kinds.map((exo) => {
    const start = rng.float(18, 24, 1);
    const end = Math.round((start + (exo ? rng.float(1.5, 18, 1) : -rng.float(1.5, 9, 1))) * 10) / 10;
    return { exo, start, end };
  });
  const letters = ['A', 'B', 'C', 'D'];
  const figure: TableFigure = { type: 'table', headers: ['Mixture', 'Initial temperature (°C)', 'Final temperature (°C)'], rows: rows.map((r, i) => [letters[i], tempText(r.start), tempText(r.end)]) };
  return {
    prompt: `A student mixes four pairs of solutions, each in a polystyrene cup, and records the temperature before and after. Select every mixture in which the change is ${askExo ? 'exothermic' : 'endothermic'}.`,
    figure,
    parts: [part(multi(rng, rows.map((r, i) => ({ md: `Mixture ${letters[i]}`, correct: r.exo === askExo })), true))],
    calculator: true,
    hints: ['Work out final − initial for each mixture.', 'A rise in temperature is exothermic; a fall is endothermic.'],
    solution: rows.map((r, i) => `Mixture ${letters[i]}: $${tempText(r.end)} - ${tempText(r.start)} = ${tempText(Math.round((r.end - r.start) * 10) / 10)}^\\circ\\text{C}$, ${r.exo ? 'a rise: exothermic' : 'a fall: endothermic'}.`),
  };
}

// ---------------------------------------------------------------------------- lesson 4.4: energy level diagrams

interface Profile {
  R: number;
  P: number;
  peak: number;
}
const r2 = (v: number) => Math.round(v * 100) / 100;
/** Reactants level, a smooth hump to the peak, and the products level, across progress 1 to 9. */
function profilePoints({ R, P, peak }: Profile): Array<[number, number]> {
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
 * An energy level diagram on a plane: energy up the side in kJ, progress along the bottom with no
 * numbers (no tick falls between 1 and 9 when the step is 1000).
 */
function energyFigure(s: number, curves: Array<Profile & { color?: 'brand' | 'muted' }>, extra: PlanePoint[] = []): PlaneFigure {
  const main = curves[0];
  return {
    type: 'plane',
    grid: { xMin: 1, xMax: 9, yMin: 0, yMax: 10 * s, xStep: 1000, yStep: s, xLabel: 'Progress of reaction', yLabel: 'Energy (kJ)' },
    polylines: curves.map((c) => ({ points: profilePoints(c), color: c.color ?? 'brand' })),
    points: [{ x: 1.3, y: main.R, label: 'reactants', color: 'muted' }, { x: 7.2, y: main.P, label: 'products', color: 'muted' }, ...extra],
  };
}
/** Levels in grid units (1 to 8 for reactants and products, the peak at least one unit above both, at most 9). */
function pickProfile(rng: Rng, maxPeak = 9): Profile {
  for (;;) {
    const R = rng.int(1, 8);
    const P = rng.intExcept(1, 8, [R]);
    const lo = Math.max(R, P) + 1;
    if (lo > maxPeak) continue;
    return { R, P, peak: rng.int(lo, maxPeak) };
  }
}
const scaled = (p: Profile, s: number): Profile => ({ R: p.R * s, P: p.P * s, peak: p.peak * s });
const kJ = (v: number) => q(v, 'kJ');
/** An energy change with its sign: $-40\ \text{kJ}$ or $+40\ \text{kJ}$. */
const kJSigned = (v: number) => q(v > 0 ? `+${v}` : v, 'kJ');

function energyDiagram(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick([10, 20, 25, 50]);
  const u = pickProfile(rng, d === 3 ? 8 : 9);
  const e = scaled(u, s);
  const exo = e.P < e.R;
  const Ea = e.peak - e.R;
  const dH = e.P - e.R;
  const intro = 'The energy level diagram shows a reaction.';
  const readHint = `Read each level against the energy scale: each grid line is ${kJ(s)}.`;
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: `${intro} Is the reaction exothermic or endothermic?`,
        figure: energyFigure(s, [e]),
        parts: [part(fixedChoice(EXO_ENDO, exo ? 0 : 1))],
        hints: ['Compare the energy of the products with the energy of the reactants.', 'Products lower than the reactants means energy was given out to the surroundings.'],
        solution: [`The products (${kJ(e.P)}) are ${exo ? 'lower' : 'higher'} than the reactants (${kJ(e.R)}), so energy is ${exo ? 'given out' : 'taken in'}: the reaction is ${exo ? 'exothermic' : 'endothermic'}.`],
      };
    }
    const which = rng.pick(['reactants', 'products'] as const);
    const v = which === 'reactants' ? e.R : e.P;
    return {
      prompt: `${intro} What is the energy of the ${which}?`,
      figure: energyFigure(s, [e]),
      parts: [numPart(v, { decimals: 0, tolerance: 0, suffix: 'kJ' })],
      hints: [`The ${which} are the flat level on the ${which === 'reactants' ? 'left' : 'right'}.`, readHint],
      solution: [`The ${which} level is at ${kJ(v)}.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `${intro} Find the activation energy and the energy change. Give the energy change a negative sign if energy is given out and a positive sign if energy is taken in.`,
      figure: energyFigure(s, [e]),
      parts: [numPart(Ea, { decimals: 0, tolerance: 0, suffix: 'kJ', label: 'Activation energy' }), numPart(dH, { decimals: 0, tolerance: 0, suffix: 'kJ', label: 'Energy change' })],
      hints: ['The activation energy is the climb from the reactants up to the top of the hump.', 'The energy change is products − reactants: negative when the products are lower.', readHint],
      solution: [
        `Reactants ${kJ(e.R)}, top of the hump ${kJ(e.peak)}, products ${kJ(e.P)}.`,
        `Activation energy $= ${e.peak} - ${e.R} = ${Ea}\\ \\text{kJ}$`,
        `Energy change $= ${e.P} - ${e.R} = ${dH}\\ \\text{kJ}$, so the reaction is ${exo ? 'exothermic' : 'endothermic'}.`,
      ],
    };
  }
  if (rng.chance(0.5)) {
    // A catalyst lowers the hump; the levels stay where they are.
    // The peak is at most 8 units here, so a hump one unit higher still fits.
    const lo = Math.max(u.R, u.P) + 1;
    const top = u.peak - 1 >= lo ? u.peak : u.peak + 1;
    const low = rng.int(lo, top - 1);
    const without = { ...e, peak: top * s, color: 'muted' as const };
    const withCat = { ...e, peak: low * s };
    const drop = without.peak - withCat.peak;
    const askNew = rng.chance(0.5);
    return {
      prompt: `The energy level diagram shows the same reaction without a catalyst (grey curve) and with a catalyst (coloured curve). ${askNew ? 'What is the activation energy with the catalyst?' : 'By how much does the catalyst lower the activation energy?'} What does the catalyst do to the overall energy change?`,
      figure: energyFigure(s, [without, withCat], [{ x: 5, y: without.peak, label: 'no catalyst', color: 'muted' }, { x: 5, y: withCat.peak, label: 'catalyst' }]),
      parts: [
        numPart(askNew ? withCat.peak - e.R : drop, { decimals: 0, tolerance: 0, suffix: 'kJ', label: askNew ? 'Activation energy with the catalyst' : 'Decrease in activation energy' }),
        part(mc(rng, 'It stays the same', ['It becomes larger', 'It becomes smaller', 'It changes sign']), { label: 'Effect on the energy change' }),
      ],
      hints: ['A catalyst gives the reaction a route with a lower hump. The reactants and products stay at the same energies.', readHint],
      solution: [
        `Without the catalyst the hump reaches ${kJ(without.peak)}; with it, ${kJ(withCat.peak)}.`,
        askNew ? `Activation energy with the catalyst $= ${withCat.peak} - ${e.R} = ${withCat.peak - e.R}\\ \\text{kJ}$` : `The catalyst lowers the activation energy by $${without.peak} - ${withCat.peak} = ${drop}\\ \\text{kJ}$`,
        `The reactants and products are at the same levels on both curves, so the energy change (${kJSigned(dH)}) stays the same.`,
      ],
    };
  }
  // Choose the diagram that matches a description.
  const key = (p: Profile) => `${p.R},${p.P},${p.peak}`;
  const valid = (p: Profile) => p.R >= 1 && p.R <= 8 && p.P >= 1 && p.P <= 8 && p.R !== p.P && p.peak >= Math.max(p.R, p.P) + 1 && p.peak <= 9;
  const candidates: Profile[] = [
    { R: u.P, P: u.R, peak: u.peak },
    { R: u.R, P: 2 * u.R - u.P, peak: u.peak },
    { R: u.R, P: u.P, peak: u.peak + 1 },
    { R: u.R, P: u.P, peak: u.peak - 1 },
    { R: u.R, P: u.P + 1, peak: u.peak + 1 },
    { R: u.R, P: u.P - 1, peak: u.peak },
    { R: u.R + 1, P: u.P, peak: u.peak + 1 },
    { R: u.R, P: u.P, peak: u.peak - 2 },
  ];
  const seen = new Set([key(u)]);
  const wrong: Profile[] = [];
  for (const c of candidates) {
    if (wrong.length === 3) break;
    if (valid(c) && !seen.has(key(c))) {
      seen.add(key(c));
      wrong.push(c);
    }
  }
  const fig = (p: Profile): Figure => energyFigure(s, [scaled(p, s)]);
  return {
    prompt: `The reactants of a reaction have an energy of ${kJ(e.R)}. The activation energy is ${kJ(Ea)}, and the energy change is ${kJSigned(dH)}. Which energy level diagram shows the reaction?`,
    parts: [part(mcFigures(rng, [{ md: '', figure: fig(u), correct: true }, ...wrong.map((w) => ({ md: '', figure: fig(w) }))]))],
    hints: ['Start at the reactants level. The top of the hump is the activation energy above it.', 'The products are the energy change away from the reactants: below them if the change is negative, above them if it is positive.'],
    solution: [
      `Reactants at ${kJ(e.R)}. The hump peaks at $${e.R} + ${Ea} = ${e.peak}\\ \\text{kJ}$.`,
      `Products at $${e.R} ${dH < 0 ? '-' : '+'} ${Math.abs(dH)} = ${e.P}\\ \\text{kJ}$, ${exo ? 'below' : 'above'} the reactants: ${exo ? 'exothermic' : 'endothermic'}.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.5: factors that change the rate

type Factor = 'temperature' | 'concentration' | 'surface' | 'catalyst' | 'pressure';
interface Change {
  text: string;
  factor: Factor | null;
  /** true: faster, false: slower, null: no change. */
  up: boolean | null;
}
const RATE_CONTEXTS: Array<{ rx: string; changes: Change[] }> = [
  {
    rx: 'Marble chips (calcium carbonate) react with dilute hydrochloric acid, giving off carbon dioxide.',
    changes: [
      { text: `The acid is warmed from ${degC(20)} to ${degC(40)} before the marble chips are added.`, factor: 'temperature', up: true },
      { text: 'The marble chips are replaced by the same mass of marble powder.', factor: 'surface', up: true },
      { text: 'The acid is replaced by a more dilute acid.', factor: 'concentration', up: false },
      { text: 'The same acid and the same marble chips are used, but in a larger flask.', factor: null, up: null },
    ],
  },
  {
    rx: 'Magnesium ribbon reacts with dilute sulfuric acid, giving off hydrogen.',
    changes: [
      { text: 'The acid is replaced by acid twice as concentrated.', factor: 'concentration', up: true },
      { text: 'The flask is cooled in an ice bath.', factor: 'temperature', up: false },
      { text: 'The magnesium ribbon is replaced by the same mass of magnesium powder.', factor: 'surface', up: true },
    ],
  },
  {
    rx: 'Hydrogen peroxide solution breaks down slowly into water and oxygen.',
    changes: [
      { text: 'A little manganese(IV) oxide powder, a catalyst, is added.', factor: 'catalyst', up: true },
      { text: 'The solution is diluted with water.', factor: 'concentration', up: false },
      { text: 'The solution is warmed.', factor: 'temperature', up: true },
    ],
  },
  {
    rx: 'Zinc reacts with dilute hydrochloric acid, giving off hydrogen.',
    changes: [
      { text: 'One large lump of zinc is used instead of the same mass of small granules.', factor: 'surface', up: false },
      { text: 'The acid is replaced by acid at a lower concentration.', factor: 'concentration', up: false },
      { text: 'A small amount of a catalyst is added.', factor: 'catalyst', up: true },
    ],
  },
  {
    rx: 'Two gases react with each other in a closed container.',
    changes: [
      { text: 'The gases are squeezed into a smaller volume, so their pressure rises.', factor: 'pressure', up: true },
      { text: 'The container is made larger, so the pressure of the gases falls.', factor: 'pressure', up: false },
      { text: 'The container is heated.', factor: 'temperature', up: true },
    ],
  },
  {
    rx: 'Sodium thiosulfate solution reacts with dilute hydrochloric acid, and the mixture slowly turns cloudy.',
    changes: [
      { text: 'The sodium thiosulfate solution is made more concentrated.', factor: 'concentration', up: true },
      { text: 'The solutions are cooled before they are mixed.', factor: 'temperature', up: false },
      { text: 'The same solutions are mixed in a wider beaker.', factor: null, up: null },
    ],
  },
];
const WHY_RATE: Record<Factor, { up: string; down: string; wrong: string }> = {
  temperature: {
    up: 'The particles move faster, so they collide more often, and more of the collisions have at least the activation energy.',
    down: 'The particles move more slowly, so they collide less often, and fewer of the collisions have at least the activation energy.',
    wrong: 'Heating makes the particles bigger, so they are easier to hit.',
  },
  concentration: {
    up: 'There are more reacting particles in the same volume, so they collide more often.',
    down: 'There are fewer reacting particles in the same volume, so they collide less often.',
    wrong: 'The particles in a more concentrated solution each have more energy.',
  },
  surface: {
    up: 'More of the solid’s particles are exposed at its surface, so collisions with them happen more often.',
    down: 'Fewer of the solid’s particles are exposed at its surface, so collisions with them happen less often.',
    wrong: 'Small pieces of a solid have more energy than one large piece.',
  },
  catalyst: {
    up: 'It gives the reaction a different route with a lower activation energy, so more of the collisions succeed.',
    down: '',
    wrong: 'The catalyst is used up, adding extra reacting particles.',
  },
  pressure: {
    up: 'The gas particles are crowded into a smaller space, so they collide more often.',
    down: 'The gas particles are more spread out, so they collide less often.',
    wrong: 'A higher pressure makes each gas particle move faster.',
  },
};
/** Concentration and pressure have the same explanation for gases, so neither is a wrong answer for the other. */
const CLOSE: Partial<Record<Factor, Factor>> = { concentration: 'pressure', pressure: 'concentration' };
const RATE_CHOICES = ['It increases', 'It decreases', 'It stays the same'];

const ALL_CHANGES = RATE_CONTEXTS.flatMap((c) => c.changes.map((ch) => ({ rx: c.rx, ch })));

function rateFactors(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const { rx, ch } = rng.pick(ALL_CHANGES);
    return {
      prompt: `${rx} ${ch.text} What happens to the rate of the reaction?`,
      parts: [part(fixedChoice(RATE_CHOICES, ch.up === null ? 2 : ch.up ? 0 : 1))],
      hints: ['Higher temperature, higher concentration or pressure, smaller pieces (more surface area) and a catalyst all make a reaction faster.', 'A change that does not alter how often the particles collide, or how hard, leaves the rate the same.'],
      solution: [ch.factor === null ? 'Nothing changes about the reacting particles: they collide just as often and with the same energy, so the rate stays the same.' : `${ch.up ? 'The rate increases' : 'The rate decreases'}. ${WHY_RATE[ch.factor][ch.up ? 'up' : 'down']}`],
    };
  }
  if (d === 2) {
    const { rx, ch } = rng.pick(ALL_CHANGES.filter((c) => c.ch.factor !== null));
    const f = ch.factor!;
    const dir = ch.up ? 'up' : 'down';
    const others = (Object.keys(WHY_RATE) as Factor[]).filter((g) => g !== f && g !== CLOSE[f] && WHY_RATE[g][dir]);
    const wrong = [WHY_RATE[f].wrong, ...rng.shuffle(others).map((g) => WHY_RATE[g][dir])];
    return {
      prompt: `${rx} ${ch.text} This makes the reaction ${ch.up ? 'faster' : 'slower'}. Which explanation is correct?`,
      parts: [part(mc(rng, WHY_RATE[f][dir], wrong))],
      hints: ['Collision theory: particles react only when they collide, and only if the collision has at least the activation energy.', 'Ask whether the change alters how often the particles collide, how much energy the collisions have, or the activation energy itself.'],
      solution: [WHY_RATE[f][dir]],
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 0) {
    const all: Array<[Factor, string]> = [['temperature', 'Raising the temperature'], ['concentration', 'Increasing the concentration of a solution'], ['surface', 'Using a powder instead of lumps'], ['catalyst', 'Adding a catalyst'], ['pressure', 'Increasing the pressure of a gas']];
    const ask = rng.int(0, 2);
    if (ask === 2) {
      return {
        prompt: 'Select every change that makes the reacting particles collide more often without giving them more energy.',
        parts: [part(multi(rng, all.map(([f, md]) => ({ md, correct: f === 'concentration' || f === 'surface' || f === 'pressure' }))))],
        hints: ['Only a change in temperature changes how fast the particles move, and so the energy of their collisions.', 'A catalyst does not make collisions more frequent: it lowers the activation energy.'],
        solution: ['A higher concentration or pressure crowds more particles into the same space, and a powder exposes more particles at the surface: all three make collisions more frequent without changing their energy.', 'Raising the temperature also gives the particles more energy, and a catalyst lowers the activation energy instead.'],
      };
    }
    const target: Factor = ask === 0 ? 'temperature' : 'catalyst';
    const others = all.filter(([f]) => f !== target);
    const pick = rng.sample(others, 3);
    return {
      prompt: ask === 0
        ? 'Which change makes the particles collide more often and also makes more of their collisions have at least the activation energy?'
        : 'Which change makes more collisions succeed by lowering the activation energy, without making the particles move faster or collide more often?',
      parts: [part(mc(rng, all.find(([f]) => f === target)![1], pick.map(([, md]) => md)))],
      hints: ['Two things decide the rate: how often particles collide, and what fraction of collisions have at least the activation energy.', 'Concentration, pressure and surface area change only how often particles collide.'],
      solution: [ask === 0 ? 'Raising the temperature: the particles move faster, so they collide more often and harder, and more collisions reach the activation energy.' : 'Adding a catalyst: it provides a route with a lower activation energy, so more of the same collisions succeed.'],
    };
  }
  if (kind === 1) {
    // Four experiments: which is fastest at the start?
    const forms = ['lumps', 'powder'];
    const concs = [0.5, 1.0, 1.5, 2.0];
    const temps = [20, 30, 40, 50];
    const best = [rng.int(0, 1), rng.int(1, 3), rng.int(1, 3)];
    const exps: number[][] = [best];
    const k = (e: number[]) => e.join();
    while (exps.length < 4) {
      const e = best.slice();
      const lowerable = [0, 1, 2].filter((i) => e[i] > 0);
      for (const i of rng.sample(lowerable, rng.int(1, Math.min(2, lowerable.length)))) e[i] = rng.int(0, e[i] - 1);
      if (!exps.some((x) => k(x) === k(e))) exps.push(e);
    }
    const order = rng.shuffle([0, 1, 2, 3]);
    const shown = order.map((i) => exps[i]);
    const figure: TableFigure = {
      type: 'table',
      headers: ['Experiment', 'Marble', 'Acid concentration (mol/L)', 'Temperature (°C)'],
      rows: shown.map((e, i) => [`${i + 1}`, forms[e[0]], concs[e[1]].toFixed(1), `${temps[e[2]]}`]),
    };
    const winner = order.indexOf(0);
    return {
      prompt: 'Four experiments each use the same mass of marble (calcium carbonate) and the same volume of hydrochloric acid, with the conditions in the table. Which experiment has the fastest rate at the start?',
      figure,
      parts: [part(fixedChoice(shown.map((_, i) => `Experiment ${i + 1}`), winner))],
      hints: ['Powder reacts faster than lumps; a higher concentration and a higher temperature also make the reaction faster.', 'Find the experiment that is at least as good as every other one on all three conditions.'],
      solution: [`Experiment ${winner + 1} uses ${forms[best[0]]}, ${concs[best[1]].toFixed(1)} mol/L acid and ${degC(temps[best[2]])}. Every other experiment has a smaller surface area, a lower concentration or a lower temperature, and none is better in any condition, so experiment ${winner + 1} is fastest.`],
    };
  }
  const pool: Array<{ md: string; correct: boolean }> = rng.shuffle([
    { md: 'Warming the acid', correct: true },
    { md: 'Grinding the marble chips into a powder', correct: true },
    { md: 'Using more concentrated acid', correct: true },
    { md: 'Cooling the acid', correct: false },
    { md: 'Using larger marble chips of the same total mass', correct: false },
    { md: 'Diluting the acid with water', correct: false },
    { md: 'Doing the reaction in a larger flask', correct: false },
  ]);
  const right = pool.filter((p) => p.correct).slice(0, rng.int(1, 3));
  const wrongOnes = pool.filter((p) => !p.correct).slice(0, 5 - right.length);
  const options = [...right, ...wrongOnes];
  return {
    prompt: 'Marble chips react with dilute hydrochloric acid. Select every change that would make the reaction faster.',
    parts: [part(multi(rng, options))],
    hints: ['Faster: a higher temperature, a higher concentration, smaller pieces (more surface area) or a catalyst.', 'The size of the container does not change how often the particles collide.'],
    solution: [`Faster: ${andList(right.map((p) => p.md.toLowerCase()))}.`, `Not faster: ${andList(wrongOnes.map((p) => p.md.toLowerCase()))}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.5: mean rate of reaction

const GAS_SETUPS: Array<{ gas: string; setup: string }> = [
  { gas: 'hydrogen', setup: 'Magnesium ribbon reacts with dilute hydrochloric acid, and the hydrogen is collected in a gas syringe.' },
  { gas: 'carbon dioxide', setup: 'Marble chips react with dilute hydrochloric acid, and the carbon dioxide is collected in a gas syringe.' },
  { gas: 'oxygen', setup: 'Hydrogen peroxide breaks down over a catalyst, and the oxygen is collected in an upside-down measuring cylinder full of water.' },
  { gas: 'hydrogen', setup: 'Zinc granules react with dilute sulfuric acid, and the hydrogen is collected in a gas syringe.' },
  { gas: 'carbon dioxide', setup: 'Sodium hydrogen carbonate reacts with dilute ethanoic acid, and the carbon dioxide is collected in a gas syringe.' },
];
/** Decimal places of a nice number such as 0.025. */
const dpOf = (v: number) => (Number.isInteger(v) ? 0 : `${v}`.split('.')[1].length);
const tidy = (v: number) => Number(v.toFixed(6));
const RATE_HINT = 'Mean rate of reaction = amount of product formed ÷ time taken (or amount of reactant used ÷ time taken).';

function meanRate(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.int(0, 2);
    if (kind === 0) {
      const g = rng.pick(GAS_SETUPS);
      let r = 0;
      let t = 0;
      do {
        r = rng.pick([0.4, 0.5, 0.6, 0.8, 1.2, 1.5, 2, 2.4, 2.5, 3]);
        t = rng.pick([10, 20, 25, 30, 40, 50, 60]);
      } while (!Number.isInteger(tidy(r * t)) || r * t > 100 || r * t < 8);
      const V = tidy(r * t);
      return {
        prompt: `${g.setup} In the first ${q(t, 's')}, ${cm3(V)} of ${g.gas} is collected. What is the mean rate of reaction over this time?`,
        parts: [numPart(r, { decimals: dpOf(r), suffix: 'cm³/s' })],
        calculator: true,
        hints: [RATE_HINT, 'A volume in cm³ divided by a time in s gives a rate in cm³/s.'],
        solution: [`Mean rate $= \\dfrac{${V}\\ \\text{cm}^3}{${t}\\ \\text{s}} = ${r}\\ \\text{cm}^3\\text{/s}$`],
      };
    }
    if (kind === 1) {
      const r = rng.pick([0.01, 0.02, 0.025, 0.04, 0.05, 0.015]);
      const t = rng.pick([20, 40, 60, 80, 100, 120]);
      const m = tidy(r * t);
      return {
        prompt: `Marble chips react with hydrochloric acid in an open flask on a balance. As carbon dioxide escapes, the mass reading falls by ${q(m.toFixed(2), 'g')} in ${q(t, 's')}. What is the mean rate of reaction, as mass lost per second?`,
        parts: [numPart(r, { decimals: dpOf(r), suffix: 'g/s' })],
        calculator: true,
        hints: [RATE_HINT, 'The mass lost is the mass of carbon dioxide made. Grams divided by seconds gives g/s.'],
        solution: [`Mean rate $= \\dfrac{${m.toFixed(2)}\\ \\text{g}}{${t}\\ \\text{s}} = ${r}\\ \\text{g/s}$`],
      };
    }
    const r = rng.pick([0.002, 0.003, 0.004, 0.005, 0.006]);
    const t = rng.pick([20, 30, 40, 50, 60, 80]);
    const m = tidy(r * t);
    const metal = rng.pick(['magnesium ribbon', 'zinc powder', 'calcium']);
    return {
      prompt: `A ${q(m, 'g')} sample of ${metal} reacts with excess dilute acid and is all used up in ${q(t, 's')}. What is the mean rate of reaction, as mass of ${metal.split(' ')[0]} used per second?`,
      parts: [numPart(r, { decimals: dpOf(r), suffix: 'g/s' })],
      calculator: true,
      hints: [RATE_HINT, 'Here the reactant is measured: divide the mass used by the time.'],
      solution: [`Mean rate $= \\dfrac{${m}\\ \\text{g}}{${t}\\ \\text{s}} = ${r}\\ \\text{g/s}$`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.6)) {
      const g = rng.pick(GAS_SETUPS);
      const step = rng.pick([10, 15, 20, 30]);
      const Vf = rng.int(55, 95);
      const k = rng.float(2.5, 4, 2) / (6 * step);
      const times = [0, 1, 2, 3, 4, 5, 6].map((i) => i * step);
      const vols = times.map((t) => Math.round(Vf * (1 - Math.exp(-k * t))));
      const figure: TableFigure = { type: 'table', headers: ['Time (s)', ...times.map(String)], rows: [['Volume of gas (cm³)', ...vols.map(String)]], horizontal: true };
      let i1 = 0;
      let i2 = rng.int(2, 6);
      if (rng.chance(0.5)) {
        i1 = rng.int(1, 3);
        i2 = rng.int(i1 + 1, Math.min(6, i1 + 3));
      }
      const rate = (vols[i2] - vols[i1]) / (times[i2] - times[i1]);
      const span = i1 === 0 ? `during the first ${q(times[i2], 's')}` : `between ${q(times[i1], 's')} and ${q(times[i2], 's')}`;
      return {
        prompt: `${g.setup} The table shows the total volume of ${g.gas} collected. What is the mean rate of reaction ${span}, ${roundingPhrase(2)}?`,
        figure,
        parts: [numPart(rate, { decimals: 2, suffix: 'cm³/s' })],
        calculator: true,
        hints: [RATE_HINT, i1 === 0 ? 'Read the volume at the end of the time from the table.' : 'Find the volume made in that time: the later volume minus the earlier volume. Divide by the time between them.'],
        solution: [
          i1 === 0 ? `Volume made: ${cm3(vols[i2])} in ${q(times[i2], 's')}.` : `Volume made: $${vols[i2]} - ${vols[i1]} = ${vols[i2] - vols[i1]}\\ \\text{cm}^3$ in $${times[i2]} - ${times[i1]} = ${times[i2] - times[i1]}\\ \\text{s}$.`,
          `Mean rate $= \\dfrac{${vols[i2] - vols[i1]}}{${times[i2] - times[i1]}} = ${fmtFixed(rate, 2)}\\ \\text{cm}^3\\text{/s}$`,
        ],
      };
    }
    const start = rng.int(14000, 19000);
    const lossF = rng.int(150, 400);
    const k = rng.float(2.5, 4, 2) / 6;
    const times = [0, 1, 2, 3, 4, 5, 6];
    const masses = times.map((t) => start - Math.round(lossF * (1 - Math.exp(-k * t))));
    const figure: TableFigure = { type: 'table', headers: ['Time (min)', ...times.map(String)], rows: [['Mass of flask and contents (g)', ...masses.map(g2)]], horizontal: true };
    const i1 = rng.int(0, 3);
    const i2 = rng.int(i1 + 1, 6);
    const lost = masses[i1] - masses[i2];
    const rate = lost / 100 / (i2 - i1);
    return {
      prompt: `Marble chips react with hydrochloric acid in an open flask on a balance, and carbon dioxide escapes. The table shows the mass reading. What is the mean rate of reaction, as mass lost per minute, between ${q(i1, 'min')} and ${q(i2, 'min')}, ${roundingPhrase(2)}?`,
      figure,
      parts: [numPart(rate, { decimals: 2, suffix: 'g/min' })],
      calculator: true,
      hints: [RATE_HINT, 'The mass lost is the earlier reading minus the later reading.'],
      solution: [`Mass lost: $${g2(masses[i1])} - ${g2(masses[i2])} = ${g2(lost)}\\ \\text{g}$ in ${q(i2 - i1, 'min')}.`, `Mean rate $= \\dfrac{${g2(lost)}}{${i2 - i1}} = ${fmtFixed(rate, 2)}\\ \\text{g/min}$`],
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 0) {
    // Find a time from a rate.
    const g = rng.pick(GAS_SETUPS);
    let r = 0;
    let t = 0;
    do {
      r = rng.pick([0.4, 0.5, 0.6, 0.75, 0.8, 1.2, 1.25, 1.5, 2.5]);
      t = rng.int(4, 30) * 5;
    } while (!Number.isInteger(tidy(r * t)) || r * t > 100 || r * t < 15);
    const V = tidy(r * t);
    return {
      prompt: `${g.setup} The ${g.gas} is made at a mean rate of $${r}\\ \\text{cm}^3\\text{/s}$. How long does it take to collect ${cm3(V)} of ${g.gas}?`,
      parts: [numPart(t, { decimals: 0, suffix: 's' })],
      calculator: true,
      hints: ['Mean rate = volume ÷ time, so time = volume ÷ mean rate.'],
      solution: [`Time $= \\dfrac{${V}\\ \\text{cm}^3}{${r}\\ \\text{cm}^3\\text{/s}} = ${t}\\ \\text{s}$`],
    };
  }
  if (kind === 1) {
    // Two experiments, one with minutes: compare their rates and link the faster one to its cause.
    const cause = rng.pick([
      { what: 'One experiment used marble powder and the other marble chips of the same mass. Which experiment used the powder?', fast: true, did: 'used the powder: a larger surface area makes the reaction faster' },
      { what: 'One experiment was done at a higher temperature than the other. Which experiment was at the higher temperature?', fast: true, did: 'was at the higher temperature, which makes the reaction faster' },
      { what: 'One experiment used more dilute acid than the other. Which experiment used the more dilute acid?', fast: false, did: 'used the more dilute acid, which makes the reaction slower' },
    ]);
    let rA = 0;
    let rB = 0;
    do {
      rA = rng.pick([0.4, 0.5, 0.6, 0.8, 1.2, 1.5]);
      rB = rng.pick([0.4, 0.5, 0.6, 0.8, 1.2, 1.5]);
    } while (Math.max(rA, rB) / Math.min(rA, rB) < 1.4);
    const tA = rng.pick([20, 30, 40, 50, 60]);
    const minB = rng.pick([1, 1.5, 2]);
    const tB = minB * 60;
    const VA = tidy(rA * tA);
    const VB = tidy(rB * tB);
    const fasterA = rA > rB;
    const answerA = cause.fast ? fasterA : !fasterA;
    return {
      prompt: `Marble chips react with hydrochloric acid in two experiments, and the carbon dioxide is collected. Experiment A collects ${cm3(VA)} in ${q(tA, 's')}. Experiment B collects ${cm3(VB)} in ${q(minB, minB === 1 ? 'minute' : 'minutes')}. Find each mean rate in cm³/s. ${cause.what}`,
      parts: [
        numPart(rA, { decimals: dpOf(rA), suffix: 'cm³/s', label: 'Mean rate of A' }),
        numPart(rB, { decimals: dpOf(rB), suffix: 'cm³/s', label: 'Mean rate of B' }),
        part(fixedChoice(['Experiment A', 'Experiment B'], answerA ? 0 : 1)),
      ],
      calculator: true,
      hints: [RATE_HINT, `Change minutes to seconds first: $1\\ \\text{min} = 60\\ \\text{s}$.`, 'Powder, a higher temperature or a higher concentration makes the reaction faster.'],
      solution: [
        `A: $\\dfrac{${VA}}{${tA}} = ${rA}\\ \\text{cm}^3\\text{/s}$`,
        `B: $${minB}\\ \\text{min} = ${tB}\\ \\text{s}$, so $\\dfrac{${VB}}{${tB}} = ${rB}\\ \\text{cm}^3\\text{/s}$`,
        `Experiment ${fasterA ? 'A' : 'B'} is faster, so experiment ${answerA ? 'A' : 'B'} ${cause.did}.`,
      ],
    };
  }
  // The rate early on and later, from a table, and why it slows down.
  const g = rng.pick(GAS_SETUPS);
  const step = rng.pick([10, 20]);
  const Vf = rng.int(60, 95);
  const k = rng.float(2.8, 4, 2) / (6 * step);
  const times = [0, 1, 2, 3, 4, 5, 6].map((i) => i * step);
  const vols = times.map((t) => Math.round(Vf * (1 - Math.exp(-k * t))));
  const figure: TableFigure = { type: 'table', headers: ['Time (s)', ...times.map(String)], rows: [['Volume of gas (cm³)', ...vols.map(String)]], horizontal: true };
  const early = vols[2] / times[2];
  const late = (vols[6] - vols[4]) / (times[6] - times[4]);
  return {
    prompt: `${g.setup} The table shows the total volume of ${g.gas} collected. Find the mean rate during the first ${q(times[2], 's')} and between ${q(times[4], 's')} and ${q(times[6], 's')}, each ${roundingPhrase(2)}. Why does the rate change?`,
    figure,
    parts: [
      numPart(early, { decimals: 2, suffix: 'cm³/s', label: `First ${times[2]} s` }),
      numPart(late, { decimals: 2, suffix: 'cm³/s', label: `${times[4]} s to ${times[6]} s` }),
      part(mc(rng, 'The reactants are being used up, so their particles collide less often.', ['The particles slow down as the reaction goes on.', 'The product stops the particles from colliding.', 'The activation energy rises as the reaction goes on.']), { label: 'Why the rate changes' }),
    ],
    calculator: true,
    hints: [RATE_HINT, 'For a time in the middle of the table, subtract the earlier volume from the later one.', 'Think about the concentration of the reactants as the reaction goes on.'],
    solution: [
      `First ${times[2]} s: $\\dfrac{${vols[2]}}{${times[2]}} = ${fmtFixed(early, 2)}\\ \\text{cm}^3\\text{/s}$`,
      `${times[4]} s to ${times[6]} s: $\\dfrac{${vols[6]} - ${vols[4]}}{${times[6] - times[4]}} = ${fmtFixed(late, 2)}\\ \\text{cm}^3\\text{/s}$`,
      'The rate falls as the reactants are used up: there are fewer reacting particles left, so they collide less often.',
    ],
  };
}

// ----------------------------------------------------------------------------

export const REACTION_SKILLS: SkillDef[] = [
  skill({ id: 'c10-word-equation', name: 'Word equations', description: 'Name the reactants and products of a described reaction and choose its word equation.', outcomes: ['10-D1'], lessonId: L(1), format: 'mc', gen: wordEquation }),
  skill({ id: 'c10-conservation-mass', name: 'Conservation of mass', description: 'Find a missing mass with the conservation of mass, and explain mass changes in open containers.', outcomes: ['10-D1'], lessonId: L(1), calculator: true, gen: conservation }),
  skill({ id: 'c10-count-atoms', name: 'Counting atoms', description: 'Count the atoms of an element in a formula with coefficients and brackets.', outcomes: ['10-D1'], lessonId: L(2), gen: countAtoms }),
  skill({ id: 'c10-balance', name: 'Balancing equations', description: 'Balance symbol equations with the smallest whole-number coefficients, and choose state symbols.', outcomes: ['10-D1'], lessonId: L(2), gen: balancing }),
  skill({ id: 'c10-reaction-type', name: 'Types of reactions', description: 'Classify synthesis, decomposition, single displacement, double displacement and combustion reactions.', outcomes: ['10-D2'], lessonId: L(3), format: 'mc', gen: reactionType }),
  skill({ id: 'c10-predict-products', name: 'Predicting products', description: 'Predict the products of combustion, metal and oxygen, displacement and precipitation reactions.', outcomes: ['10-D2'], lessonId: L(3), format: 'mc', gen: predictProducts }),
  skill({ id: 'c10-exo-endo', name: 'Exothermic and endothermic', description: 'Classify a change as exothermic or endothermic from its temperature change, everyday examples or the sign of its energy change.', outcomes: ['10-D2'], lessonId: L(4), format: 'mc', gen: exoEndo }),
  skill({ id: 'c10-energy-diagram', name: 'Energy level diagrams', description: 'Read the energy change and activation energy from an energy level diagram, including the effect of a catalyst.', outcomes: ['10-D2'], lessonId: L(4), gen: energyDiagram }),
  skill({ id: 'c10-rate-factors', name: 'Factors affecting rate', description: 'Explain how temperature, concentration, surface area, catalysts and pressure change the rate of a reaction with collision theory.', outcomes: ['10-D2'], lessonId: L(5), format: 'mc', gen: rateFactors }),
  skill({ id: 'c10-mean-rate', name: 'Mean rate of reaction', description: 'Calculate a mean rate of reaction from an amount and a time or from a table, and use it to compare and predict.', outcomes: ['10-D2'], lessonId: L(5), calculator: true, gen: meanRate }),
];
