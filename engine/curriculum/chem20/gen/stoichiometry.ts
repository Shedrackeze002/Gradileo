/**
 * Chemistry 20, Unit 4: quantitative relationships in chemical changes. Balancing equations and
 * reaction types, net ionic equations, the mole, and stoichiometry: gravimetric, gas and solution
 * stoichiometry, limiting and excess reagents, percent yield, and titration. Every question states
 * the molar masses and constants it uses.
 */
import { fixedChoice, mc, multi, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { balance, ce, parseFormula } from '../../../chem/formula.ts';
import { ANIONS, CATIONS, ionFormula, ionicFormula, type Ion } from '../../../chem/ions.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, PlaneFigure, SkillDef, TableFigure } from '../../../types.ts';

const L = (n: number) => `c20-4-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
/** A quantity with its unit, in maths: $2.50\ \text{L}$. */
const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
/** Decimal places that keep about three significant figures. */
const dpFor = (v: number) => (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : Math.abs(v) >= 1 ? 2 : 3);
/** An answer rounded to about three significant figures, with the rounding said in the prompt. */
const answer = (v: number, suffix: string, dp = dpFor(v)) => ({ part: numPart(v, { decimals: dp, suffix }), phrase: roundingPhrase(dp), shown: v.toFixed(dp) });
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const coef = (k: number) => (k === 1 ? '' : `${k}`);
/** A value rounded to three significant figures, as a question states it. */
const sig = (v: number, n = 3) => Number(v.toPrecision(n));
/** The same value written with its significant figures: 0.250, 12.0 (and 1290, not 1.29e+3). */
const sf = (v: number, n = 3) => (Math.abs(v) >= 10 ** n ? v.toFixed(0) : v.toPrecision(n));
/** A working value in a solution, to four significant figures. */
const w = (v: number) => String(Number(v.toPrecision(4)));

// ---------------------------------------------------------------------------- molar masses

/** An element's molar mass as the questions state it, to two decimal places. */
const atomMass = (s: string) => Number(element(s)!.mass.toFixed(2));
/** A formula's molar mass from the stated element masses, so a student's working matches exactly. */
function mm(f: string): number {
  let m = 0;
  for (const [el, n] of parseFormula(f).atoms) m += atomMass(el) * n;
  return Math.round(m * 100) / 100;
}
/** "Use these molar masses: ..." for the elements of some formulas. */
function massesText(...formulas: string[]): string {
  const els = [...new Set(formulas.flatMap((f) => [...parseFormula(f).atoms.keys()]))];
  const list = els.map((s) => `${s} $${atomMass(s).toFixed(2)}\\ \\text{g/mol}$`);
  return list.length === 1 ? `Use the molar mass ${list[0]}.` : `Use these molar masses: ${list.join(', ')}.`;
}
/** $M(\ce{H2O}) = 2(1.01) + 16.00 = 18.02\ \text{g/mol}$ */
function mmWorking(f: string): string {
  const terms = [...parseFormula(f).atoms].map(([el, n]) => (n === 1 ? atomMass(el).toFixed(2) : `${n}(${atomMass(el).toFixed(2)})`));
  return `$M(${ce(f)}) = ${terms.join(' + ')} = ${mm(f).toFixed(2)}\\ \\text{g/mol}$`;
}

// ---------------------------------------------------------------------------- reactions

type RxType = 'formation' | 'decomposition' | 'single' | 'double' | 'combustion';
interface Reaction {
  type: RxType;
  r: string[];
  p: string[];
  /** Smallest whole-number coefficients, reactants first. */
  c: number[];
  /** A metal or hydrogen burning in oxygen: a formation that is also a combustion, so not used to name types. */
  burns?: boolean;
}
const rx = (type: RxType, r: string[], p: string[], burns = false): Reaction => ({ type, r, p, c: balance(r, p)!, burns });

const REACTIONS: Reaction[] = [
  rx('formation', ['Na', 'Cl2'], ['NaCl']),
  rx('formation', ['N2', 'H2'], ['NH3']),
  rx('formation', ['Al', 'Br2'], ['AlBr3']),
  rx('formation', ['Li', 'N2'], ['Li3N']),
  rx('formation', ['Ca', 'N2'], ['Ca3N2']),
  rx('formation', ['Fe', 'Cl2'], ['FeCl3']),
  rx('formation', ['H2', 'Cl2'], ['HCl']),
  rx('formation', ['Mg', 'N2'], ['Mg3N2']),
  rx('formation', ['K', 'Br2'], ['KBr']),
  rx('formation', ['Al', 'O2'], ['Al2O3'], true),
  rx('formation', ['Mg', 'O2'], ['MgO'], true),
  rx('formation', ['H2', 'O2'], ['H2O'], true),
  rx('formation', ['Fe', 'O2'], ['Fe2O3'], true),
  rx('formation', ['P4', 'O2'], ['P4O10'], true),
  rx('decomposition', ['H2O'], ['H2', 'O2']),
  rx('decomposition', ['NaN3'], ['Na', 'N2']),
  rx('decomposition', ['HgO'], ['Hg', 'O2']),
  rx('decomposition', ['Al2O3'], ['Al', 'O2']),
  rx('decomposition', ['NaCl'], ['Na', 'Cl2']),
  rx('decomposition', ['Ag2O'], ['Ag', 'O2']),
  rx('decomposition', ['NH3'], ['N2', 'H2']),
  rx('decomposition', ['Fe2O3'], ['Fe', 'O2']),
  rx('decomposition', ['KCl'], ['K', 'Cl2']),
  rx('single', ['Zn', 'CuSO4'], ['ZnSO4', 'Cu']),
  rx('single', ['Al', 'CuCl2'], ['AlCl3', 'Cu']),
  rx('single', ['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag']),
  rx('single', ['Mg', 'HCl'], ['MgCl2', 'H2']),
  rx('single', ['Na', 'H2O'], ['NaOH', 'H2']),
  rx('single', ['Cl2', 'NaBr'], ['NaCl', 'Br2']),
  rx('single', ['Al', 'HCl'], ['AlCl3', 'H2']),
  rx('single', ['Fe', 'CuSO4'], ['FeSO4', 'Cu']),
  rx('single', ['Ca', 'H2O'], ['Ca(OH)2', 'H2']),
  rx('single', ['Al', 'Fe2O3'], ['Al2O3', 'Fe']),
  rx('single', ['Zn', 'HCl'], ['ZnCl2', 'H2']),
  rx('single', ['Al', 'H2SO4'], ['Al2(SO4)3', 'H2']),
  rx('single', ['Al', 'AgNO3'], ['Al(NO3)3', 'Ag']),
  rx('double', ['AgNO3', 'NaCl'], ['AgCl', 'NaNO3']),
  rx('double', ['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']),
  rx('double', ['BaCl2', 'Na2SO4'], ['BaSO4', 'NaCl']),
  rx('double', ['CaCl2', 'Na2CO3'], ['CaCO3', 'NaCl']),
  rx('double', ['CuSO4', 'NaOH'], ['Cu(OH)2', 'Na2SO4']),
  rx('double', ['FeCl3', 'NaOH'], ['Fe(OH)3', 'NaCl']),
  rx('double', ['CaCl2', 'Na3PO4'], ['Ca3(PO4)2', 'NaCl']),
  rx('double', ['AgNO3', 'K2CrO4'], ['Ag2CrO4', 'KNO3']),
  rx('double', ['H2SO4', 'NaOH'], ['Na2SO4', 'H2O']),
  rx('double', ['HCl', 'Ca(OH)2'], ['CaCl2', 'H2O']),
  rx('double', ['Al2(SO4)3', 'Ba(NO3)2'], ['BaSO4', 'Al(NO3)3']),
  rx('double', ['H3PO4', 'KOH'], ['K3PO4', 'H2O']),
  rx('combustion', ['CH4', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C3H8', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C4H10', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C2H6', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C2H5OH', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C8H18', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C6H12O6', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C2H4', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['CH3OH', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C5H12', 'O2'], ['CO2', 'H2O']),
  rx('combustion', ['C2H2', 'O2'], ['CO2', 'H2O']),
];
const find = (r: string[], p: string[]) => REACTIONS.find((x) => x.r.join() === r.join() && x.p.join() === p.join()) ?? rx('double', r, p);

const species = (x: Reaction) => [...x.r, ...x.p];
/** The equation inside \ce{}, with its coefficients (or none, to be balanced) and optional states. */
function eqCe(x: Reaction, withCoefficients = true, states?: string[]): string {
  const sp = species(x).map((f, i) => `${withCoefficients ? coef(x.c[i]) : ''}${f}${states ? `(${states[i]})` : ''}`);
  return `${sp.slice(0, x.r.length).join(' + ')} -> ${sp.slice(x.r.length).join(' + ')}`;
}
const eq = (x: Reaction, withCoefficients = true, states?: string[]) => `$\\ce{${eqCe(x, withCoefficients, states)}}$`;

/** "Check: Al 4 = 4, O 6 = 6." */
function atomCheck(x: Reaction): string {
  const fs = species(x).map(parseFormula);
  const els = [...new Set(fs.flatMap((f) => [...f.atoms.keys()]))];
  const count = (from: number, to: number, el: string) => fs.slice(from, to).reduce((s, f, i) => s + (f.atoms.get(el) ?? 0) * x.c[from + i], 0);
  return `Check: ${els.map((el) => `${el} ${count(0, x.r.length, el)} = ${count(x.r.length, fs.length, el)}`).join(', ')}.`;
}

// ---------------------------------------------------------------------------- lesson 4.1: balancing and reaction types

const BALANCE_HINTS: Record<RxType, string[]> = {
  formation: ['Count the atoms of each element on both sides.', 'A diatomic element such as $\\ce{O2}$ or $\\ce{N2}$ brings atoms in pairs, so the other side often needs an even number.'],
  decomposition: ['Count the atoms of each element on both sides.', 'A diatomic element such as $\\ce{O2}$ or $\\ce{N2}$ brings atoms in pairs, so the other side often needs an even number.'],
  single: ['Treat a polyatomic ion that stays together, such as $\\ce{SO4}$ or $\\ce{NO3}$, as one unit.', 'Balance the metals first, then the ions, and hydrogen and oxygen last.'],
  double: ['Treat a polyatomic ion that stays together, such as $\\ce{SO4}$ or $\\ce{PO4}$, as one unit.', 'Balance the metals first, then the ions, and hydrogen and oxygen last.'],
  combustion: ['Balance carbon first, then hydrogen, and oxygen last.', 'If oxygen needs half a molecule, double every coefficient.'],
};

function balancing(rng: Rng, d: Difficulty): GenOutput {
  const types: RxType[] = d === 1 ? ['formation', 'decomposition'] : d === 2 ? ['single', 'double'] : ['combustion'];
  const x = rng.pick(REACTIONS.filter((r) => types.includes(r.type) && r.c.some((k) => k > 1)));
  return {
    prompt: `Balance the equation $\\ce{${eqCe(x, false)}}$ with the smallest whole-number coefficients.`,
    parts: [part({ kind: 'coefficients', reactants: x.r, products: x.p })],
    hints: BALANCE_HINTS[x.type],
    solution: [eq(x), atomCheck(x)],
  };
}

const TYPES: Record<RxType, { name: string; rule: string }> = {
  formation: { name: 'Formation', rule: 'Elements combine to form one compound: element + element → compound.' },
  decomposition: { name: 'Simple decomposition', rule: 'A compound breaks down into its elements: compound → element + element.' },
  single: { name: 'Single replacement', rule: 'An element takes the place of another element in a compound: element + compound → element + compound.' },
  double: { name: 'Double replacement', rule: 'Two compounds swap ions: compound + compound → compound + compound.' },
  combustion: { name: 'Complete combustion', rule: 'A hydrocarbon (or an alcohol or sugar) burns in oxygen to form carbon dioxide and water.' },
};
const TYPE_ORDER: RxType[] = ['formation', 'decomposition', 'single', 'double', 'combustion'];

function reactionType(rng: Rng, d: Difficulty): GenOutput {
  const types: RxType[] = d === 1 ? ['formation', 'decomposition', 'combustion'] : TYPE_ORDER;
  const x = rng.pick(REACTIONS.filter((r) => types.includes(r.type) && !r.burns));
  const names = TYPE_ORDER.map((t) => TYPES[t].name);
  const shown = d < 3 ? `$\\ce{${eqCe(x)}}$` : x.r.length === 1 ? `one reactant, $\\ce{${x.r[0]}}$` : `the reactants $\\ce{${x.r[0]}}$ and $\\ce{${x.r[1]}}$`;
  return {
    prompt: d < 3 ? `What type of reaction is ${shown}?` : `A reaction has ${shown}. Before you see the products, what type of reaction is it?`,
    parts: [part(fixedChoice(names, TYPE_ORDER.indexOf(x.type)))],
    hints: d < 3 ? ['Look at what kinds of substances react and form: elements or compounds, and how many of each.', 'A hydrocarbon reacting with oxygen to make carbon dioxide and water is a combustion.'] : ['The reactants alone decide the type: two elements, one compound, an element and a compound, or two compounds.', 'A hydrocarbon (or an alcohol or sugar) with oxygen is a combustion.'],
    solution: [`${TYPES[x.type].name}. ${TYPES[x.type].rule}`, ...(d === 3 ? [`The whole equation: ${eq(x)}`] : [])],
  };
}

// ---------------------------------------------------------------------------- lesson 4.2: net ionic equations

const cation = (name: string) => CATIONS.find((i) => i.name === name)!;
const anion = (name: string) => ANIONS.find((i) => i.name === name)!;
/** How many cations and anions one formula unit holds. */
function counts(c: Ion, a: Ion): [number, number] {
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
  const l = (c.charge * -a.charge) / g(c.charge, -a.charge);
  return [l / c.charge, l / -a.charge];
}

/** Two soluble ionic compounds whose cation of the first and anion of the second precipitate. */
const PRECIPITATIONS: Array<[string, string, string, string]> = [
  ['silver', 'nitrate', 'sodium', 'chloride'],
  ['barium', 'chloride', 'sodium', 'sulfate'],
  ['calcium', 'chloride', 'sodium', 'carbonate'],
  ['lead(II)', 'nitrate', 'sodium', 'sulfate'],
  ['silver', 'nitrate', 'potassium', 'bromide'],
  ['barium', 'nitrate', 'potassium', 'carbonate'],
  ['silver', 'nitrate', 'sodium', 'iodide'],
  ['lead(II)', 'nitrate', 'potassium', 'iodide'],
  ['copper(II)', 'sulfate', 'sodium', 'hydroxide'],
  ['iron(III)', 'chloride', 'sodium', 'hydroxide'],
  ['calcium', 'chloride', 'sodium', 'phosphate'],
  ['silver', 'nitrate', 'potassium', 'chromate'],
  ['magnesium', 'chloride', 'potassium', 'hydroxide'],
  ['zinc', 'sulfate', 'sodium', 'hydroxide'],
  ['lead(II)', 'nitrate', 'sodium', 'chloride'],
  ['aluminium', 'nitrate', 'sodium', 'hydroxide'],
];

function precipitation(row: [string, string, string, string]) {
  const [c1, a1, c2, a2] = [cation(row[0]), anion(row[1]), cation(row[2]), anion(row[3])];
  const r1 = ionicFormula(c1, a1);
  const r2 = ionicFormula(c2, a2);
  const solid = ionicFormula(c1, a2);
  const other = ionicFormula(c2, a1);
  const x = find([r1, r2], [solid, other]);
  /** The ions of a dissolved compound, k formula units of it. */
  const ions = (c: Ion, a: Ion, k: number) => {
    const [m, n] = counts(c, a);
    return `${coef(k * m)}${ionFormula(c)}(aq) + ${coef(k * n)}${ionFormula(a)}(aq)`;
  };
  const [m, n] = counts(c1, a2);
  const [m2, n2] = counts(c2, a1);
  return {
    c1, a1, c2, a2, r1, r2, solid, other, x,
    names: { r1: `${c1.name} ${a1.name}`, r2: `${c2.name} ${a2.name}`, solid: `${c1.name} ${a2.name}` },
    formula: eqCe(x, true, ['aq', 'aq', 's', 'aq']),
    total: `${ions(c1, a1, x.c[0])} + ${ions(c2, a2, x.c[1])} -> ${coef(x.c[2])}${solid}(s) + ${ions(c2, a1, x.c[3])}`,
    net: `${coef(m)}${ionFormula(c1)}(aq) + ${coef(n)}${ionFormula(a2)}(aq) -> ${solid}(s)`,
    spectatorSolid: `${coef(m2)}${ionFormula(c2)}(aq) + ${coef(n2)}${ionFormula(a1)}(aq) -> ${other}(s)`,
    unbalanced: m === 1 && n === 1 ? null : `${ionFormula(c1)}(aq) + ${ionFormula(a2)}(aq) -> ${solid}(s)`,
  };
}
const oneToOne = (row: [string, string, string, string]) => counts(cation(row[0]), anion(row[3])).every((k) => k === 1);
const ceMd = (s: string) => `$\\ce{${s}}$`;

function netIonic(rng: Rng, d: Difficulty): GenOutput {
  const p = precipitation(rng.pick(PRECIPITATIONS.filter((r) => (d === 1 ? oneToOne(r) : d === 2 ? !oneToOne(r) : true))));
  const intro = d < 3
    ? `Solutions of ${p.names.r1}, ${$(p.r1)}, and ${p.names.r2}, ${$(p.r2)}, are mixed: ${ceMd(p.formula)}.`
    : `Solutions of ${p.names.r1} and ${p.names.r2} are mixed, and ${p.names.solid} precipitates.`;
  const wrong = [p.total, p.formula, p.spectatorSolid];
  if (p.unbalanced) wrong.unshift(p.unbalanced);
  return {
    prompt: `${intro} Which is the net ionic equation?`,
    parts: [part(mc(rng, ceMd(p.net), wrong.slice(0, 3).map(ceMd)))],
    hints: ['Write each dissolved ionic compound as its separate ions. The solid stays together.', 'Cross out the spectator ions: the ions that appear unchanged on both sides.'],
    solution: [`Total ionic equation: ${ceMd(p.total)}`, `The spectator ions are $\\ce{${ionFormula(p.c2)}}$ and $\\ce{${ionFormula(p.a1)}}$. Leaving them out gives the net ionic equation: ${ceMd(p.net)}`],
  };
}

const STRONG_ACIDS: Array<[string, string, string]> = [['HCl', 'hydrochloric acid', 'Cl^-'], ['HBr', 'hydrobromic acid', 'Br^-'], ['HNO3', 'nitric acid', 'NO3^-'], ['HClO4', 'perchloric acid', 'ClO4^-']];
const STRONG_BASES: Array<[string, string, string]> = [['NaOH', 'sodium hydroxide', 'Na^+'], ['KOH', 'potassium hydroxide', 'K^+'], ['LiOH', 'lithium hydroxide', 'Li^+']];

function spectatorIons(rng: Rng, d: Difficulty): GenOutput {
  if (d === 3) {
    const [acid, acidName, an] = rng.pick(STRONG_ACIDS);
    const [base, baseName, cat] = rng.pick(STRONG_BASES);
    return {
      prompt: `${cap(acidName)}, $\\ce{${acid}(aq)}$, is neutralised by ${baseName}, $\\ce{${base}(aq)}$. The acid is strong, so in water it is entirely $\\ce{H3O+}$ and $\\ce{${an}}$ ions. Select every spectator ion.`,
      parts: [part(multi(rng, [{ md: ceMd('H3O^+'), correct: false }, { md: ceMd(an), correct: true }, { md: ceMd(cat), correct: true }, { md: ceMd('OH^-'), correct: false }]))],
      hints: ['Write the total ionic equation: the acid as $\\ce{H3O+}$ and its anion, the base as its metal ion and $\\ce{OH-}$.', 'The ions that react make water. The others are spectators.'],
      solution: [`Total ionic equation: ${ceMd(`H3O^+(aq) + ${an}(aq) + ${cat}(aq) + OH^-(aq) -> 2H2O(l) + ${cat}(aq) + ${an}(aq)`)}`, `The spectator ions are $\\ce{${cat}}$ and $\\ce{${an}}$. The net ionic equation is ${ceMd('H3O^+(aq) + OH^-(aq) -> 2H2O(l)')}`],
    };
  }
  const p = precipitation(rng.pick(PRECIPITATIONS));
  const intro = d === 1
    ? `Solutions of ${p.names.r1} and ${p.names.r2} are mixed: ${ceMd(p.formula)}.`
    : `Solutions of ${p.names.r1} and ${p.names.r2} are mixed, and ${p.names.solid} precipitates.`;
  return {
    prompt: `${intro} Select every spectator ion.`,
    parts: [part(multi(rng, [p.c1, p.a1, p.c2, p.a2].map((i) => ({ md: ceMd(ionFormula(i)), correct: i === p.c2 || i === p.a1 }))))],
    hints: ['Spectator ions are dissolved before the reaction and still dissolved after it.', 'The ions that form the solid are not spectators.'],
    solution: [`Total ionic equation: ${ceMd(p.total)}`, `$\\ce{${ionFormula(p.c2)}}$ and $\\ce{${ionFormula(p.a1)}}$ stay dissolved, so they are the spectators. Net ionic equation: ${ceMd(p.net)}`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.3: the mole and molar mass

const MM_SIMPLE = ['H2O', 'CO2', 'NaCl', 'NH3', 'CH4', 'MgO', 'Fe2O3', 'C3H8', 'KCl', 'H2SO4', 'C6H12O6', 'CaCO3', 'NaHCO3', 'C2H5OH', 'KMnO4', 'SO2'];
const MM_BRACKETS = ['Ca(OH)2', 'Mg(NO3)2', 'Al2(SO4)3', '(NH4)3PO4', 'Ca3(PO4)2', 'Fe(NO3)3', 'Ba(OH)2', '(NH4)2SO4', 'Cu(NO3)2', 'Al(OH)3'];
const MM_HYDRATES = ['CuSO4.5H2O', 'Na2CO3.10H2O', 'MgSO4.7H2O', 'CaCl2.2H2O', 'CoCl2.6H2O', 'BaCl2.2H2O'];

function molarMassSkill(rng: Rng, d: Difficulty): GenOutput {
  const f = rng.pick(d === 1 ? MM_SIMPLE : d === 2 ? MM_BRACKETS : MM_HYDRATES);
  const m = mm(f);
  return {
    prompt: `What is the molar mass of ${$(f)}, to the nearest hundredth? ${massesText(f)}`,
    parts: [numPart(m, { decimals: 2, suffix: 'g/mol' })],
    calculator: true,
    hints: [
      'Add the molar masses of all the atoms in one formula unit.',
      d === 1 ? 'A subscript counts the atom before it.' : d === 2 ? 'A subscript after brackets multiplies every atom inside them.' : 'The dot adds the water molecules: each formula unit includes that many $\\ce{H2O}$.',
    ],
    solution: [mmWorking(f)],
  };
}

const SUBSTANCES: Array<[string, string]> = [
  ['H2O', 'water'], ['CO2', 'carbon dioxide'], ['NaCl', 'sodium chloride'], ['C6H12O6', 'glucose'], ['CaCO3', 'calcium carbonate'],
  ['NH3', 'ammonia'], ['H2SO4', 'sulfuric acid'], ['NaOH', 'sodium hydroxide'], ['C2H5OH', 'ethanol'], ['CuSO4', 'copper(II) sulfate'],
  ['C12H22O11', 'sucrose'], ['KMnO4', 'potassium permanganate'], ['Fe2O3', 'iron(III) oxide'], ['NaHCO3', 'sodium hydrogen carbonate'], ['Mg(OH)2', 'magnesium hydroxide'],
];
const named = ([f, name]: [string, string]) => `${name}, ${$(f)}`;

function moleMass(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(SUBSTANCES);
  const M = mm(s[0]);
  const given = `The molar mass of ${s[1]} is $${M.toFixed(2)}\\ \\text{g/mol}$.`;
  if (d === 2) {
    const n = sig(rng.float(0.05, 6, 3));
    const a = answer(n * M, 'g');
    return {
      prompt: `What is the mass of ${q(sf(n), 'mol')} of ${named(s)}, ${a.phrase}? ${given}`,
      parts: [a.part],
      calculator: true,
      hints: ['Mass = amount × molar mass: $m = nM$.'],
      solution: [`$m = nM = ${sf(n)}\\ \\text{mol} \\times ${M.toFixed(2)}\\ \\text{g/mol} = ${a.shown}\\ \\text{g}$`],
    };
  }
  const m = sig(rng.float(2, 300, 2));
  const n = m / M;
  const a = answer(n, 'mol');
  if (d === 1) {
    return {
      prompt: `How many moles are in ${q(sf(m), 'g')} of ${named(s)}? Give the answer ${a.phrase}. ${given}`,
      parts: [a.part],
      calculator: true,
      hints: ['Amount = mass ÷ molar mass: $n = \\dfrac{m}{M}$.'],
      solution: [`$n = \\dfrac{m}{M} = \\dfrac{${sf(m)}\\ \\text{g}}{${M.toFixed(2)}\\ \\text{g/mol}} = ${a.shown}\\ \\text{mol}$`],
    };
  }
  return {
    prompt: `A sample of ${named(s)}, has a mass of ${q(sf(m), 'g')}. Find the molar mass of ${s[1]} to the nearest hundredth, then the amount in moles ${a.phrase}. ${massesText(s[0])}`,
    parts: [numPart(M, { decimals: 2, suffix: 'g/mol', label: '$M =$' }), { ...a.part, label: '$n =$' }],
    calculator: true,
    hints: ['Add the molar masses of the atoms in the formula.', 'Then $n = \\dfrac{m}{M}$.'],
    solution: [mmWorking(s[0]), `$n = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${a.shown}\\ \\text{mol}$`],
  };
}

const NA = 6.02e23;
const NA_TEXT = 'Use $N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$.';
/** A value in scientific notation, as LaTeX: 1.51 × 10²⁴. */
function sciTex(v: number, n = 3): string {
  const [m, e] = v.toExponential(n - 1).split('e');
  return `${m} \\times 10^{${Number(e)}}`;
}
/** An answer in scientific notation, to `n` significant figures, allowing for rounding along the way. */
function sciPart(v: number, n: number, suffix: string): Part {
  const [m, e] = v.toExponential(n - 1).split('e');
  const exp = Number(e);
  return { suffix, answer: { kind: 'numeric', value: v, tolerance: Math.max(0.6 * 10 ** (exp - n + 1), Math.abs(v) * 0.004), allowExpression: true, scientific: true, exact: `${m}*10^${exp}` } };
}
const SCI_TIP = 'Type scientific notation like `1.51e24` or `1.51*10^24`.';
const MOLECULES: Array<[string, string]> = [['H2O', 'water'], ['CO2', 'carbon dioxide'], ['CH4', 'methane'], ['NH3', 'ammonia'], ['C6H12O6', 'glucose'], ['O2', 'oxygen'], ['N2', 'nitrogen'], ['C2H5OH', 'ethanol'], ['C3H8', 'propane'], ['SO2', 'sulfur dioxide']];
const ELEMENT_NAMES: Record<string, string> = { H: 'hydrogen', C: 'carbon', O: 'oxygen', N: 'nitrogen', S: 'sulfur' };

function particles(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(MOLECULES);
  if (d === 1) {
    const n = sig(rng.float(0.1, 9.9, 3));
    const N = n * NA;
    return {
      prompt: `How many molecules are in ${q(sf(n), 'mol')} of ${named(s)}? Give the answer in scientific notation to three significant figures. ${NA_TEXT} ${SCI_TIP}`,
      parts: [sciPart(N, 3, 'molecules')],
      calculator: true,
      hints: ['Number of particles = amount × Avogadro\'s number: $N = n N_A$.'],
      solution: [`$N = nN_A = ${sf(n)} \\times 6.02 \\times 10^{23} = ${sciTex(N)}$ molecules`],
    };
  }
  if (d === 2) {
    const N = sig(rng.float(1.1, 9.9, 2) * 10 ** rng.int(22, 24));
    const n = N / NA;
    const a = answer(n, 'mol');
    return {
      prompt: `A sample of ${named(s)}, contains $${sciTex(N)}$ molecules. How many moles is that, ${a.phrase}? ${NA_TEXT}`,
      parts: [a.part],
      calculator: true,
      hints: ['Amount = number of particles ÷ Avogadro\'s number: $n = \\dfrac{N}{N_A}$.'],
      solution: [`$n = \\dfrac{N}{N_A} = \\dfrac{${sciTex(N)}}{6.02 \\times 10^{23}} = ${a.shown}\\ \\text{mol}$`],
    };
  }
  const withMany = MOLECULES.filter(([f]) => [...parseFormula(f).atoms.values()].some((k) => k > 1));
  const t = rng.pick(withMany);
  const [el, k] = rng.pick([...parseFormula(t[0]).atoms].filter(([, c]) => c > 1));
  const M = mm(t[0]);
  const m = sig(rng.float(1, 120, 2));
  const n = m / M;
  const atoms = n * NA * k;
  return {
    prompt: `How many ${ELEMENT_NAMES[el]} atoms are in ${q(sf(m), 'g')} of ${named(t)}? Give the answer in scientific notation to three significant figures. ${massesText(t[0])} ${NA_TEXT} ${SCI_TIP}`,
    parts: [sciPart(atoms, 3, 'atoms')],
    calculator: true,
    hints: ['Change the mass to moles, then the moles to molecules.', `Each molecule of $\\ce{${t[0]}}$ has ${k} ${ELEMENT_NAMES[el]} atoms.`],
    solution: [mmWorking(t[0]), `$n = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`, `Molecules: $${w(n)} \\times 6.02 \\times 10^{23} = ${sciTex(n * NA, 4)}$`, `Atoms: $${k} \\times ${sciTex(n * NA, 4)} = ${sciTex(atoms)}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.4: mole ratios and gravimetric stoichiometry

/** How species j relates to species i in a question: "react with", "are needed to make", ... */
function verb(x: Reaction, given: number, asked: number, singular = false): string {
  const isR = (k: number) => k < x.r.length;
  const [pl, sg] = isR(asked) ? (isR(given) ? ['react with', 'reacts with'] : ['are needed to make', 'is needed to make']) : isR(given) ? ['form from', 'forms from'] : ['form along with', 'forms along with'];
  return singular ? sg : pl;
}
/** Two different species of a reaction, the given one first; their coefficients differ unless `same` is allowed. */
function pickPair(rng: Rng, x: Reaction, same: boolean): [number, number] {
  const idx = species(x).map((_, i) => i);
  const pairs = idx.flatMap((i) => idx.filter((j) => j !== i && (same || x.c[i] !== x.c[j])).map((j) => [i, j] as [number, number]));
  return rng.pick(pairs);
}
/** Reactions for mole ratios: something to work out, and no element written as P4. */
const RATIO_RX = REACTIONS.filter((x) => x.c.some((k) => k > 1) && !species(x).includes('P4'));

function moleRatio(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(RATIO_RX);
  const [i, j] = pickPair(rng, x, d === 1);
  const sp = species(x);
  const n = sig(rng.float(0.1, 8, 3));
  const nj = (n * x.c[j]) / x.c[i];
  const a = answer(nj, 'mol');
  const shown = d === 3 ? `$\\ce{${eqCe(x, false)}}$ (not yet balanced)` : eq(x);
  return {
    prompt: `In the reaction ${shown}, how many moles of $\\ce{${sp[j]}}$ ${verb(x, i, j)} ${q(sf(n), 'mol')} of $\\ce{${sp[i]}}$? Give the answer ${a.phrase}.`,
    parts: [a.part],
    calculator: true,
    hints: [...(d === 3 ? ['Balance the equation first.'] : []), 'The coefficients give the mole ratio.', `$n(\\text{wanted}) = n(\\text{given}) \\times \\dfrac{\\text{wanted coefficient}}{\\text{given coefficient}}$`],
    solution: [...(d === 3 ? [`Balanced: ${eq(x)}`] : []), `$n(\\ce{${sp[j]}}) = ${sf(n)} \\times \\dfrac{${x.c[j]}}{${x.c[i]}} = ${a.shown}\\ \\text{mol}$`],
  };
}

function gravimetric(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(RATIO_RX);
  const [i, j] = pickPair(rng, x, false);
  const sp = species(x);
  const [Mi, Mj] = [mm(sp[i]), mm(sp[j])];
  if (d === 1) {
    const n = sig(rng.float(0.1, 5, 3));
    const nj = (n * x.c[j]) / x.c[i];
    const a = answer(nj * Mj, 'g');
    return {
      prompt: `In the reaction ${eq(x)}, what mass of $\\ce{${sp[j]}}$ ${verb(x, i, j, true)} ${q(sf(n), 'mol')} of $\\ce{${sp[i]}}$? Give the answer ${a.phrase}. ${massesText(sp[j])}`,
      parts: [a.part],
      calculator: true,
      hints: ['Use the mole ratio from the coefficients.', 'Then change moles to mass: $m = nM$.'],
      solution: [`$n(\\ce{${sp[j]}}) = ${sf(n)} \\times \\dfrac{${x.c[j]}}{${x.c[i]}} = ${w(nj)}\\ \\text{mol}$`, `$m = ${w(nj)} \\times ${Mj.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
    };
  }
  const m = sig(rng.float(2, 150, 2));
  const ni = m / Mi;
  const nj = (ni * x.c[j]) / x.c[i];
  const a = answer(nj * Mj, 'g');
  const shown = d === 3 ? `$\\ce{${eqCe(x, false)}}$ (not yet balanced)` : eq(x);
  return {
    prompt: `In the reaction ${shown}, what mass of $\\ce{${sp[j]}}$ ${verb(x, i, j, true)} ${q(sf(m), 'g')} of $\\ce{${sp[i]}}$? Give the answer ${a.phrase}. ${massesText(sp[i], sp[j])}`,
    parts: [a.part],
    calculator: true,
    hints: [...(d === 3 ? ['Balance the equation first.'] : []), 'Change the given mass to moles.', 'Use the mole ratio, then change moles back to mass.'],
    solution: [
      ...(d === 3 ? [`Balanced: ${eq(x)}`] : []),
      `$n(\\ce{${sp[i]}}) = \\dfrac{${sf(m)}}{${Mi.toFixed(2)}} = ${w(ni)}\\ \\text{mol}$`,
      `$n(\\ce{${sp[j]}}) = ${w(ni)} \\times \\dfrac{${x.c[j]}}{${x.c[i]}} = ${w(nj)}\\ \\text{mol}$`,
      `$m = ${w(nj)} \\times ${Mj.toFixed(2)} = ${a.shown}\\ \\text{g}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.5: gas and solution stoichiometry

const R = 8.314;
const R_TEXT = '$R = 8.314\\ \\text{kPa·L/(mol·K)}$';
const CONDITIONS = [
  { name: 'STP', full: 'STP ($0^\\circ\\text{C}$ and $101.325\\ \\text{kPa}$)', vm: 22.4 },
  { name: 'SATP', full: 'SATP ($25^\\circ\\text{C}$ and $100\\ \\text{kPa}$)', vm: 24.8 },
];
/** A reaction with a gas: the substance weighed, the gas measured, and a sentence that sets the scene. */
const GAS_RX: Array<{ x: Reaction; solid: string; gas: string; story: string }> = [
  { x: find(['NaN3'], ['Na', 'N2']), solid: 'NaN3', gas: 'N2', story: 'An airbag inflates when sodium azide decomposes:' },
  { x: find(['Zn', 'HCl'], ['ZnCl2', 'H2']), solid: 'Zn', gas: 'H2', story: 'Zinc reacts with excess hydrochloric acid:' },
  { x: find(['Mg', 'HCl'], ['MgCl2', 'H2']), solid: 'Mg', gas: 'H2', story: 'Magnesium reacts with excess hydrochloric acid:' },
  { x: find(['Al', 'HCl'], ['AlCl3', 'H2']), solid: 'Al', gas: 'H2', story: 'Aluminium reacts with excess hydrochloric acid:' },
  { x: find(['CaCO3'], ['CaO', 'CO2']), solid: 'CaCO3', gas: 'CO2', story: 'Limestone, calcium carbonate, breaks down when heated:' },
  { x: find(['KClO3'], ['KCl', 'O2']), solid: 'KClO3', gas: 'O2', story: 'Potassium chlorate breaks down when heated:' },
  { x: find(['CaC2', 'H2O'], ['Ca(OH)2', 'C2H2']), solid: 'CaC2', gas: 'C2H2', story: 'Calcium carbide reacts with water to make acetylene:' },
  { x: find(['Na', 'H2O'], ['NaOH', 'H2']), solid: 'Na', gas: 'H2', story: 'Sodium reacts with water:' },
  { x: find(['NaHCO3', 'HCl'], ['NaCl', 'H2O', 'CO2']), solid: 'NaHCO3', gas: 'CO2', story: 'Baking soda reacts with excess hydrochloric acid:' },
  { x: find(['N2', 'H2'], ['NH3']), solid: 'NH3', gas: 'H2', story: 'Ammonia is made from nitrogen and hydrogen:' },
  { x: find(['C3H8', 'O2'], ['CO2', 'H2O']), solid: 'C3H8', gas: 'O2', story: 'Propane burns completely in a barbecue:' },
  { x: find(['C6H12O6'], ['C2H5OH', 'CO2']), solid: 'C6H12O6', gas: 'CO2', story: 'Yeast ferments glucose:' },
];

function gasStoich(rng: Rng, d: Difficulty): GenOutput {
  const g = rng.pick(GAS_RX);
  const sp = species(g.x);
  const [i, j] = [sp.indexOf(g.solid), sp.indexOf(g.gas)];
  const M = mm(g.solid);
  const ratio = `\\dfrac{${g.x.c[j]}}{${g.x.c[i]}}`;
  const masses = massesText(g.solid);
  if (d === 2) {
    const c = rng.pick(CONDITIONS);
    const v = sig(rng.float(0.5, 40, 2));
    const nGas = v / c.vm;
    const nSolid = (nGas * g.x.c[i]) / g.x.c[j];
    const a = answer(nSolid * M, 'g');
    return {
      prompt: `${g.story} ${eq(g.x)}. What mass of $\\ce{${g.solid}}$ ${verb(g.x, j, i, true)} ${q(sf(v), 'L')} of $\\ce{${g.gas}}$ at ${c.name}? Give the answer ${a.phrase}. At ${c.full}, the molar volume of a gas is $${c.vm}\\ \\text{L/mol}$. ${masses}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the gas volume to moles: $n = \\dfrac{V}{V_m}$.', 'Use the mole ratio, then $m = nM$.'],
      solution: [`$n(\\ce{${g.gas}}) = \\dfrac{${sf(v)}}{${c.vm}} = ${w(nGas)}\\ \\text{mol}$`, `$n(\\ce{${g.solid}}) = ${w(nGas)} \\times \\dfrac{${g.x.c[i]}}{${g.x.c[j]}} = ${w(nSolid)}\\ \\text{mol}$`, `$m = ${w(nSolid)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
    };
  }
  const m = sig(rng.float(1, 100, 2));
  const nSolid = m / M;
  const nGas = (nSolid * g.x.c[j]) / g.x.c[i];
  const steps = [`$n(\\ce{${g.solid}}) = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(nSolid)}\\ \\text{mol}$`, `$n(\\ce{${g.gas}}) = ${w(nSolid)} \\times ${ratio} = ${w(nGas)}\\ \\text{mol}$`];
  if (d === 1) {
    const c = rng.pick(CONDITIONS);
    const a = answer(nGas * c.vm, 'L');
    return {
      prompt: `${g.story} ${eq(g.x)}. What volume of $\\ce{${g.gas}}$ at ${c.name} ${verb(g.x, i, j, true)} ${q(sf(m), 'g')} of $\\ce{${g.solid}}$? Give the answer ${a.phrase}. At ${c.full}, the molar volume of a gas is $${c.vm}\\ \\text{L/mol}$. ${masses}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the mass to moles, and use the mole ratio.', 'Then $V = nV_m$.'],
      solution: [...steps, `$V = ${w(nGas)} \\times ${c.vm} = ${a.shown}\\ \\text{L}$`],
    };
  }
  const t = rng.int(10, 40);
  const p = rng.int(90, 110);
  const T = t + 273.15;
  const a = answer((nGas * R * T) / p, 'L');
  return {
    prompt: `${g.story} ${eq(g.x)}. What volume of $\\ce{${g.gas}}$ at $${t}^\\circ\\text{C}$ and ${q(p, 'kPa')} ${verb(g.x, i, j, true)} ${q(sf(m), 'g')} of $\\ce{${g.solid}}$? Give the answer ${a.phrase}. Use $PV = nRT$ with ${R_TEXT}, and $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$. ${masses}`,
    parts: [a.part],
    calculator: true,
    hints: ['Change the mass to moles, and use the mole ratio.', 'Then solve $PV = nRT$ for $V$, with the temperature in kelvins.'],
    solution: [...steps, `$V = \\dfrac{nRT}{P} = \\dfrac{${w(nGas)} \\times 8.314 \\times ${T.toFixed(2)}}{${p}} = ${a.shown}\\ \\text{L}$`],
  };
}

/** Reactions in solution: [reaction, the dissolved reactant measured by volume, its name, the other substance, its name]. */
const SOLUTION_RX: Array<{ x: Reaction; sol: string; solName: string; other: string; otherName: string; otherSolid?: boolean }> = [
  { x: find(['Mg', 'HCl'], ['MgCl2', 'H2']), sol: 'HCl', solName: 'hydrochloric acid', other: 'Mg', otherName: 'magnesium', otherSolid: true },
  { x: find(['Zn', 'HCl'], ['ZnCl2', 'H2']), sol: 'HCl', solName: 'hydrochloric acid', other: 'Zn', otherName: 'zinc', otherSolid: true },
  { x: find(['CaCO3', 'HCl'], ['CaCl2', 'H2O', 'CO2']), sol: 'HCl', solName: 'hydrochloric acid', other: 'CaCO3', otherName: 'calcium carbonate', otherSolid: true },
  { x: find(['Mg(OH)2', 'HCl'], ['MgCl2', 'H2O']), sol: 'HCl', solName: 'hydrochloric acid', other: 'Mg(OH)2', otherName: 'magnesium hydroxide', otherSolid: true },
  { x: find(['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag']), sol: 'AgNO3', solName: 'silver nitrate', other: 'Cu', otherName: 'copper', otherSolid: true },
  { x: find(['H2SO4', 'NaOH'], ['Na2SO4', 'H2O']), sol: 'NaOH', solName: 'sodium hydroxide', other: 'H2SO4', otherName: 'sulfuric acid' },
  { x: find(['H3PO4', 'KOH'], ['K3PO4', 'H2O']), sol: 'KOH', solName: 'potassium hydroxide', other: 'H3PO4', otherName: 'phosphoric acid' },
  { x: find(['HCl', 'Ca(OH)2'], ['CaCl2', 'H2O']), sol: 'HCl', solName: 'hydrochloric acid', other: 'Ca(OH)2', otherName: 'calcium hydroxide' },
  { x: find(['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']), sol: 'KI', solName: 'potassium iodide', other: 'Pb(NO3)2', otherName: 'lead(II) nitrate' },
  { x: find(['AgNO3', 'K2CrO4'], ['Ag2CrO4', 'KNO3']), sol: 'AgNO3', solName: 'silver nitrate', other: 'K2CrO4', otherName: 'potassium chromate' },
];

/** A concentration a student reads off a bottle: 0.100 to 0.500 mol/L, to three significant figures. */
const conc = (rng: Rng) => rng.pick([0.1, 0.125, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]);

function solutionStoich(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = precipitation(rng.pick(PRECIPITATIONS));
    const c = conc(rng);
    const vol = rng.int(20, 100) / 2;
    const n1 = (c * vol) / 1000;
    const nS = (n1 * p.x.c[2]) / p.x.c[0];
    const M = mm(p.solid);
    const a = answer(nS * M, 'g');
    return {
      prompt: `${q(vol.toFixed(1), 'mL')} of ${q(sf(c), 'mol/L')} ${p.names.r1} reacts with excess ${p.names.r2}: ${ceMd(p.formula)}. What mass of ${p.names.solid} precipitates, ${a.phrase}? ${massesText(p.solid)}`,
      parts: [a.part],
      calculator: true,
      hints: ['Amount from a solution: $n = cV$, with the volume in litres.', 'Use the mole ratio, then $m = nM$.'],
      solution: [`$n(\\ce{${p.r1}}) = ${sf(c)}\\ \\text{mol/L} \\times ${(vol / 1000).toFixed(4)}\\ \\text{L} = ${w(n1)}\\ \\text{mol}$`, `$n(\\ce{${p.solid}}) = ${w(n1)} \\times \\dfrac{${p.x.c[2]}}{${p.x.c[0]}} = ${w(nS)}\\ \\text{mol}$`, `$m = ${w(nS)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
    };
  }
  const s = rng.pick(SOLUTION_RX.filter((r) => (d === 2 ? r.otherSolid : !r.otherSolid)));
  const sp = species(s.x);
  const [i, j] = [sp.indexOf(s.other), sp.indexOf(s.sol)];
  const c = conc(rng);
  if (d === 2) {
    const M = mm(s.other);
    // A mass that needs 10 to 60 mL of the solution.
    const m = sig(((rng.float(10, 60, 1) / 1000) * c * s.x.c[i] / s.x.c[j]) * M);
    const nOther = m / M;
    const nSol = (nOther * s.x.c[j]) / s.x.c[i];
    const a = answer((nSol / c) * 1000, 'mL');
    return {
      prompt: `In the reaction ${eq(s.x)}, what volume of ${q(sf(c), 'mol/L')} ${s.solName} reacts exactly with ${q(sf(m), 'g')} of ${s.otherName}? Give the answer in millilitres, ${a.phrase}. ${massesText(s.other)}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the mass to moles, and use the mole ratio.', 'Then $V = \\dfrac{n}{c}$, in litres; multiply by 1000 for millilitres.'],
      solution: [`$n(\\ce{${s.other}}) = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(nOther)}\\ \\text{mol}$`, `$n(\\ce{${s.sol}}) = ${w(nOther)} \\times \\dfrac{${s.x.c[j]}}{${s.x.c[i]}} = ${w(nSol)}\\ \\text{mol}$`, `$V = \\dfrac{${w(nSol)}}{${sf(c)}} = ${w(nSol / c)}\\ \\text{L} = ${a.shown}\\ \\text{mL}$`],
    };
  }
  const c2 = conc(rng);
  const v2 = rng.pick([10, 15, 20, 25]);
  const nOther = (c2 * v2) / 1000;
  const nSol = (nOther * s.x.c[j]) / s.x.c[i];
  const a = answer((nSol / c) * 1000, 'mL');
  return {
    prompt: `In the reaction ${eq(s.x)}, what volume of ${q(sf(c), 'mol/L')} ${s.solName} reacts exactly with ${q(v2.toFixed(1), 'mL')} of ${q(sf(c2), 'mol/L')} ${s.otherName}? Give the answer in millilitres, ${a.phrase}.`,
    parts: [a.part],
    calculator: true,
    hints: ['Amount of the solution you know everything about: $n = cV$.', 'Use the mole ratio, then $V = \\dfrac{n}{c}$.'],
    solution: [`$n(\\ce{${s.other}}) = ${sf(c2)} \\times ${(v2 / 1000).toFixed(4)} = ${w(nOther)}\\ \\text{mol}$`, `$n(\\ce{${s.sol}}) = ${w(nOther)} \\times \\dfrac{${s.x.c[j]}}{${s.x.c[i]}} = ${w(nSol)}\\ \\text{mol}$`, `$V = \\dfrac{${w(nSol)}}{${sf(c)}} = ${w(nSol / c)}\\ \\text{L} = ${a.shown}\\ \\text{mL}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.6: limiting and excess reagents

/** Two-reactant reactions, with the product the questions ask about. */
const LIMITING_RX: Array<{ x: Reaction; product: string }> = [
  { x: find(['N2', 'H2'], ['NH3']), product: 'NH3' },
  { x: find(['Al', 'Br2'], ['AlBr3']), product: 'AlBr3' },
  { x: find(['Al', 'O2'], ['Al2O3']), product: 'Al2O3' },
  { x: find(['Na', 'Cl2'], ['NaCl']), product: 'NaCl' },
  { x: find(['CH4', 'O2'], ['CO2', 'H2O']), product: 'CO2' },
  { x: find(['C3H8', 'O2'], ['CO2', 'H2O']), product: 'H2O' },
  { x: find(['Zn', 'HCl'], ['ZnCl2', 'H2']), product: 'ZnCl2' },
  { x: find(['Al', 'CuCl2'], ['AlCl3', 'Cu']), product: 'Cu' },
  { x: find(['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag']), product: 'Ag' },
  { x: find(['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']), product: 'PbI2' },
  { x: find(['Al', 'Fe2O3'], ['Al2O3', 'Fe']), product: 'Fe' },
  { x: find(['Fe2O3', 'CO'], ['Fe', 'CO2']), product: 'Fe' },
  { x: find(['H2', 'O2'], ['H2O']), product: 'H2O' },
  { x: find(['Mg', 'HCl'], ['MgCl2', 'H2']), product: 'MgCl2' },
];

/** Amounts of the two reactants, well away from the exact ratio, and which one runs out. */
function limitingSetup(rng: Rng, useMass: boolean) {
  const { x, product } = rng.pick(LIMITING_RX);
  const [A, B] = x.r;
  // About 2 to 80 g of the first reactant, or 0.2 to 3 mol.
  const nA0 = useMass ? rng.float(2, 80, 1) / mm(A) : rng.float(0.2, 3, 2);
  const f = rng.chance(0.5) ? rng.float(0.45, 0.8, 2) : rng.float(1.25, 2, 2);
  const nB0 = (nA0 * x.c[1] * f) / x.c[0];
  // Masses or amounts as a question states them, to three significant figures; recompute from those.
  const [gA, gB] = useMass ? [sig(nA0 * mm(A)), sig(nB0 * mm(B))] : [sig(nA0), sig(nB0)];
  const [nA, nB] = useMass ? [gA / mm(A), gB / mm(B)] : [gA, gB];
  const limA = nA / x.c[0] < nB / x.c[1];
  const [lim, ex] = limA ? [0, 1] : [1, 0];
  const nLim = limA ? nA : nB;
  return { x, product, A, B, gA, gB, nA, nB, lim, ex, nLim, unit: useMass ? 'g' : 'mol' };
}

function limiting(rng: Rng, d: Difficulty): GenOutput {
  const s = limitingSetup(rng, d > 1);
  const askExcess = d === 3;
  const masses = d > 1 ? ` ${massesText(s.A, s.B)}` : '';
  const need = (s.nA * s.x.c[1]) / s.x.c[0];
  const correct = askExcess ? s.ex : s.lim;
  return {
    prompt: `A mixture for the reaction ${eq(s.x)} holds ${q(sf(s.gA), s.unit)} of $\\ce{${s.A}}$ and ${q(sf(s.gB), s.unit)} of $\\ce{${s.B}}$. Which reactant is ${askExcess ? 'in excess' : 'the limiting reagent'}?${masses}`,
    parts: [part(fixedChoice([`$\\ce{${s.A}}$`, `$\\ce{${s.B}}$`, 'Neither: both are used up exactly'], correct))],
    hints: [...(d > 1 ? ['Change both masses to moles first.'] : []), `Find how much $\\ce{${s.B}}$ the $\\ce{${s.A}}$ would need, using the mole ratio, and compare it with what is there.`],
    solution: [
      ...(d > 1 ? [`$n(\\ce{${s.A}}) = \\dfrac{${sf(s.gA)}}{${mm(s.A).toFixed(2)}} = ${w(s.nA)}\\ \\text{mol}$, $n(\\ce{${s.B}}) = \\dfrac{${sf(s.gB)}}{${mm(s.B).toFixed(2)}} = ${w(s.nB)}\\ \\text{mol}$`] : []),
      `The $\\ce{${s.A}}$ needs $${w(s.nA)} \\times \\dfrac{${s.x.c[1]}}{${s.x.c[0]}} = ${w(need)}\\ \\text{mol}$ of $\\ce{${s.B}}$, and there is ${w(s.nB)} mol.`,
      need > s.nB ? `Not enough $\\ce{${s.B}}$: it runs out first, so $\\ce{${s.B}}$ is limiting and $\\ce{${s.A}}$ is in excess.` : `More than enough $\\ce{${s.B}}$: $\\ce{${s.A}}$ runs out first, so $\\ce{${s.A}}$ is limiting and $\\ce{${s.B}}$ is in excess.`,
    ],
  };
}

function limitingYield(rng: Rng, d: Difficulty): GenOutput {
  const s = limitingSetup(rng, d > 1);
  const sp = species(s.x);
  const pi = sp.indexOf(s.product);
  const limF = s.x.r[s.lim];
  const nP = (s.nLim * s.x.c[pi]) / s.x.c[s.lim];
  const intro = `A mixture for the reaction ${eq(s.x)} holds ${q(sf(s.gA), s.unit)} of $\\ce{${s.A}}$ and ${q(sf(s.gB), s.unit)} of $\\ce{${s.B}}$.`;
  const molesStep = d > 1 ? [`$n(\\ce{${s.A}}) = ${w(s.nA)}\\ \\text{mol}$, $n(\\ce{${s.B}}) = ${w(s.nB)}\\ \\text{mol}$`] : [];
  const limStep = `$\\ce{${limF}}$ is the limiting reagent: $\\dfrac{n}{\\text{coefficient}}$ is ${w(s.nA / s.x.c[0])} for $\\ce{${s.A}}$ and ${w(s.nB / s.x.c[1])} for $\\ce{${s.B}}$, and the smaller one runs out first.`;
  if (d === 1) {
    const a = answer(nP, 'mol');
    return {
      prompt: `${intro} How many moles of $\\ce{${s.product}}$ can form, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: ['Find the limiting reagent first.', 'Only the limiting reagent decides how much product forms.'],
      solution: [limStep, `$n(\\ce{${s.product}}) = ${w(s.nLim)} \\times \\dfrac{${s.x.c[pi]}}{${s.x.c[s.lim]}} = ${a.shown}\\ \\text{mol}$`],
    };
  }
  if (d === 2) {
    const M = mm(s.product);
    const a = answer(nP * M, 'g');
    return {
      prompt: `${intro} What mass of $\\ce{${s.product}}$ can form, ${a.phrase}? ${massesText(s.A, s.B, s.product)}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change both masses to moles, and find the limiting reagent.', 'Use the limiting reagent and the mole ratio to find the product, then $m = nM$.'],
      solution: [...molesStep, limStep, `$n(\\ce{${s.product}}) = ${w(s.nLim)} \\times \\dfrac{${s.x.c[pi]}}{${s.x.c[s.lim]}} = ${w(nP)}\\ \\text{mol}$`, `$m = ${w(nP)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
    };
  }
  const exF = s.x.r[s.ex];
  const nExHad = s.ex === 0 ? s.nA : s.nB;
  const used = (s.nLim * s.x.c[s.ex]) / s.x.c[s.lim];
  const M = mm(exF);
  const a = answer((nExHad - used) * M, 'g');
  return {
    prompt: `${intro} When the reaction stops, what mass of the excess reagent is left over, ${a.phrase}? ${massesText(s.A, s.B)}`,
    parts: [a.part],
    calculator: true,
    hints: ['Find the limiting reagent first.', 'Find how much of the excess reagent reacts with it, and subtract that from what was there.'],
    solution: [...molesStep, limStep, `$\\ce{${exF}}$ used: $${w(s.nLim)} \\times \\dfrac{${s.x.c[s.ex]}}{${s.x.c[s.lim]}} = ${w(used)}\\ \\text{mol}$`, `Left: $(${w(nExHad)} - ${w(used)}) \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.7: percent yield

/** Reactions run in a lab, with the reactant weighed, the product collected and a sentence of setting. */
const YIELD_RX: Array<{ x: Reaction; from: string; to: string; story: string }> = [
  { x: find(['CaCO3'], ['CaO', 'CO2']), from: 'CaCO3', to: 'CaO', story: 'Calcium carbonate is heated to make lime, calcium oxide:' },
  { x: find(['Zn', 'CuSO4'], ['ZnSO4', 'Cu']), from: 'Zn', to: 'Cu', story: 'Zinc is added to excess copper(II) sulfate solution, and the copper is collected:' },
  { x: find(['Cu', 'AgNO3'], ['Cu(NO3)2', 'Ag']), from: 'Cu', to: 'Ag', story: 'A copper wire is placed in excess silver nitrate solution, and the silver is collected:' },
  { x: find(['Fe2O3', 'CO'], ['Fe', 'CO2']), from: 'Fe2O3', to: 'Fe', story: 'Iron is made from iron(III) oxide in a blast furnace:' },
  { x: find(['Al', 'CuCl2'], ['AlCl3', 'Cu']), from: 'Al', to: 'Cu', story: 'Aluminium foil is placed in excess copper(II) chloride solution:' },
  { x: find(['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']), from: 'Pb(NO3)2', to: 'PbI2', story: 'Lead(II) nitrate reacts with excess potassium iodide, and the precipitate is filtered and dried:' },
  { x: find(['BaCl2', 'Na2SO4'], ['BaSO4', 'NaCl']), from: 'BaCl2', to: 'BaSO4', story: 'Barium chloride reacts with excess sodium sulfate, and the precipitate is filtered and dried:' },
  { x: find(['Mg', 'O2'], ['MgO']), from: 'Mg', to: 'MgO', story: 'Magnesium ribbon is burned in air:' },
  { x: find(['C6H12O6'], ['C2H5OH', 'CO2']), from: 'C6H12O6', to: 'C2H5OH', story: 'Yeast ferments glucose into ethanol:' },
  { x: find(['N2', 'H2'], ['NH3']), from: 'N2', to: 'NH3', story: 'Nitrogen reacts with excess hydrogen to make ammonia:' },
];
const pctPart = (v: number, label?: string) => numPart(v, { decimals: 1, suffix: '%', label });

function percentYield(rng: Rng, d: Difficulty): GenOutput {
  const y = rng.pick(YIELD_RX);
  const sp = species(y.x);
  const [i, j] = [sp.indexOf(y.from), sp.indexOf(y.to)];
  const [Mi, Mj] = [mm(y.from), mm(y.to)];
  const pct = rng.float(60, 97, 1);
  const m = sig(rng.float(2, 100, 2));
  const theo = ((m / Mi) * y.x.c[j] * Mj) / y.x.c[i];
  const actual = sig((theo * pct) / 100);
  const theoSteps = [`$n(\\ce{${y.from}}) = \\dfrac{${sf(m)}}{${Mi.toFixed(2)}} = ${w(m / Mi)}\\ \\text{mol}$`, `$n(\\ce{${y.to}}) = ${w(m / Mi)} \\times \\dfrac{${y.x.c[j]}}{${y.x.c[i]}} = ${w((m / Mi) * y.x.c[j] / y.x.c[i])}\\ \\text{mol}$`];
  if (d === 1) {
    const t = sig(theo);
    const p = (actual / t) * 100;
    return {
      prompt: `${y.story} ${eq(y.x)}. The theoretical yield is ${q(sf(t), 'g')} of $\\ce{${y.to}}$, and ${q(sf(actual), 'g')} is collected. What is the percent yield, to the nearest tenth?`,
      parts: [pctPart(p)],
      calculator: true,
      hints: ['$\\text{percent yield} = \\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%$'],
      solution: [`$\\dfrac{${sf(actual)}}{${sf(t)}} \\times 100\\% = ${p.toFixed(1)}\\%$`],
    };
  }
  if (d === 2) {
    const ta = answer(theo, 'g');
    const p = (actual / theo) * 100;
    return {
      prompt: `${y.story} ${eq(y.x)}. ${q(sf(m), 'g')} of $\\ce{${y.from}}$ is used, and ${q(sf(actual), 'g')} of $\\ce{${y.to}}$ is collected. Find the theoretical yield ${ta.phrase}, then the percent yield to the nearest tenth. ${massesText(y.from, y.to)}`,
      parts: [{ ...ta.part, label: 'Theoretical yield' }, pctPart(p, 'Percent yield')],
      calculator: true,
      hints: ['The theoretical yield is the mass of product the stoichiometry predicts.', 'Percent yield = actual ÷ theoretical × 100%.'],
      solution: [...theoSteps, `Theoretical yield: $${w((m / Mi) * y.x.c[j] / y.x.c[i])} \\times ${Mj.toFixed(2)} = ${ta.shown}\\ \\text{g}$`, `Percent yield: $\\dfrac{${sf(actual)}}{${w(theo)}} \\times 100\\% = ${p.toFixed(1)}\\%$`],
    };
  }
  const want = sig(rng.float(2, 60, 2));
  const pctShown = Math.round(pct);
  const theoNeeded = want / (pctShown / 100);
  const mFrom = ((theoNeeded / Mj) * y.x.c[i] * Mi) / y.x.c[j];
  const a = answer(mFrom, 'g');
  return {
    prompt: `${y.story} ${eq(y.x)}. The process has a percent yield of ${pctShown}%. What mass of $\\ce{${y.from}}$ is needed to collect ${q(sf(want), 'g')} of $\\ce{${y.to}}$? Give the answer ${a.phrase}. ${massesText(y.from, y.to)}`,
    parts: [a.part],
    calculator: true,
    hints: ['The theoretical yield must be larger than what you collect: divide by the percent yield.', 'Then work back through moles to the mass of the reactant.'],
    solution: [
      `Theoretical yield needed: $\\dfrac{${sf(want)}}{${(pctShown / 100).toFixed(2)}} = ${w(theoNeeded)}\\ \\text{g}$`,
      `$n(\\ce{${y.to}}) = \\dfrac{${w(theoNeeded)}}{${Mj.toFixed(2)}} = ${w(theoNeeded / Mj)}\\ \\text{mol}$`,
      `$n(\\ce{${y.from}}) = ${w(theoNeeded / Mj)} \\times \\dfrac{${y.x.c[i]}}{${y.x.c[j]}} = ${w((theoNeeded / Mj) * y.x.c[i] / y.x.c[j])}\\ \\text{mol}$`,
      `$m = ${w((theoNeeded / Mj) * y.x.c[i] / y.x.c[j])} \\times ${Mi.toFixed(2)} = ${a.shown}\\ \\text{g}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.8: titration

/** Titrations: the sample in the flask and the standard solution in the burette, with states for the equation. */
const TITRATIONS: Array<{ x: Reaction; sample: string; sampleName: string; titrant: string; titrantName: string; states: string[] }> = [
  { x: find(['HCl', 'NaOH'], ['NaCl', 'H2O']), sample: 'HCl', sampleName: 'hydrochloric acid', titrant: 'NaOH', titrantName: 'sodium hydroxide', states: ['aq', 'aq', 'aq', 'l'] },
  { x: find(['HNO3', 'KOH'], ['KNO3', 'H2O']), sample: 'HNO3', sampleName: 'nitric acid', titrant: 'KOH', titrantName: 'potassium hydroxide', states: ['aq', 'aq', 'aq', 'l'] },
  { x: find(['CH3COOH', 'NaOH'], ['NaCH3COO', 'H2O']), sample: 'CH3COOH', sampleName: 'acetic acid (vinegar)', titrant: 'NaOH', titrantName: 'sodium hydroxide', states: ['aq', 'aq', 'aq', 'l'] },
  { x: find(['H2SO4', 'NaOH'], ['Na2SO4', 'H2O']), sample: 'H2SO4', sampleName: 'sulfuric acid', titrant: 'NaOH', titrantName: 'sodium hydroxide', states: ['aq', 'aq', 'aq', 'l'] },
  { x: find(['Ba(OH)2', 'HCl'], ['BaCl2', 'H2O']), sample: 'Ba(OH)2', sampleName: 'barium hydroxide', titrant: 'HCl', titrantName: 'hydrochloric acid', states: ['aq', 'aq', 'aq', 'l'] },
  { x: find(['Na2CO3', 'HCl'], ['NaCl', 'H2O', 'CO2']), sample: 'Na2CO3', sampleName: 'sodium carbonate', titrant: 'HCl', titrantName: 'hydrochloric acid', states: ['aq', 'aq', 'aq', 'l', 'g'] },
  { x: find(['NH3', 'HCl'], ['NH4Cl']), sample: 'NH3', sampleName: 'ammonia (a household cleaner)', titrant: 'HCl', titrantName: 'hydrochloric acid', states: ['aq', 'aq', 'aq'] },
  { x: find(['NaOH', 'HCl'], ['NaCl', 'H2O']), sample: 'NaOH', sampleName: 'sodium hydroxide', titrant: 'HCl', titrantName: 'hydrochloric acid', states: ['aq', 'aq', 'aq', 'l'] },
];
/** Burette readings are read to the nearest 0.05 mL. */
const burette = (v: number) => Math.round(v * 20) / 20;

function titration(rng: Rng, d: Difficulty): GenOutput {
  const t = rng.pick(TITRATIONS.filter((x) => d > 1 || x.x.c[x.x.r.indexOf(x.sample)] === x.x.c[x.x.r.indexOf(x.titrant)]));
  const [si, ti] = [t.x.r.indexOf(t.sample), t.x.r.indexOf(t.titrant)];
  const cT = conc(rng);
  const vS = rng.pick([10, 20, 25]);
  // Three trials that agree within 0.20 mL, after a rough first trial that overshoots.
  const base = burette(rng.float(12, 32, 2));
  const good = rng.shuffle([base, burette(base + rng.pick([0.05, 0.1])), burette(base - rng.pick([0, 0.05, 0.1]))]);
  const rough = burette(base + rng.float(0.5, 1.4, 2));
  const titres = d === 1 ? [base] : [rough, ...good];
  const avg = d === 1 ? base : (good[0] + good[1] + good[2]) / 3;
  const nT = (cT * avg) / 1000;
  const nS = (nT * t.x.c[si]) / t.x.c[ti];
  const cS = nS / (vS / 1000);
  const a = answer(cS, 'mol/L', cS < 0.1 ? 4 : 3);
  const setup = `A ${q(vS.toFixed(2), 'mL')} sample of ${t.sampleName}, $\\ce{${t.sample}(aq)}$, is titrated with ${q(sf(cT), 'mol/L')} ${t.titrantName}, $\\ce{${t.titrant}(aq)}$: ${eq(t.x, true, t.states)}.`;
  const ask = `What is the concentration of the ${t.sampleName.replace(/ \(.*\)$/, '')}, ${a.phrase}?`;
  const steps = [`$n(\\ce{${t.titrant}}) = ${sf(cT)} \\times ${(avg / 1000).toFixed(5)} = ${w(nT)}\\ \\text{mol}$`, `$n(\\ce{${t.sample}}) = ${w(nT)} \\times \\dfrac{${t.x.c[si]}}{${t.x.c[ti]}} = ${w(nS)}\\ \\text{mol}$`, `$c = \\dfrac{${w(nS)}}{${(vS / 1000).toFixed(3)}} = ${a.shown}\\ \\text{mol/L}$`];
  if (d === 1) {
    return {
      prompt: `${setup} The endpoint is reached after ${q(base.toFixed(2), 'mL')} of ${t.titrantName}. ${ask}`,
      parts: [a.part],
      calculator: true,
      hints: ['Amount of titrant used: $n = cV$, with the volume in litres.', 'Use the mole ratio to find the amount in the sample, then $c = \\dfrac{n}{V}$.'],
      solution: steps,
    };
  }
  const trials = titres.map((_, k) => `${k + 1}`);
  let figure: TableFigure;
  let readNote = '';
  if (d === 2) {
    figure = { type: 'table', headers: ['Trial', ...trials], rows: [[`Volume of ${t.titrant} (mL)`, ...titres.map((v) => v.toFixed(2))]] };
  } else {
    const starts = titres.map(() => burette(rng.float(0.2, 12, 2)));
    figure = { type: 'table', headers: ['Trial', ...trials], rows: [['Final reading (mL)', ...titres.map((v, k) => (starts[k] + v).toFixed(2))], ['Initial reading (mL)', ...starts.map((v) => v.toFixed(2))]] };
    readNote = ' Each volume used is the final reading minus the initial reading.';
  }
  return {
    prompt: `${setup} The table shows the ${d === 2 ? 'volumes' : 'burette readings'} for four trials.${readNote} Average the trials that agree within $0.20\\ \\text{mL}$. ${ask}`,
    figure,
    parts: [a.part],
    calculator: true,
    hints: ['Trial 1 is a quick rough trial; leave out any trial that does not agree with the others.', 'Amount of titrant: $n = cV$. Then use the mole ratio and $c = \\dfrac{n}{V}$.'],
    solution: [`Volumes used: ${titres.map((v) => `${v.toFixed(2)}`).join(', ')} mL. Trials 2 to 4 agree, so the average is $\\dfrac{${good.map((v) => v.toFixed(2)).join(' + ')}}{3} = ${avg.toFixed(2)}\\ \\text{mL}$`, ...steps],
  };
}

// The four kinds of titration curve: analyte in the flask, titrant from the burette.
type CurveKind = 'sa-sb' | 'wa-sb' | 'sb-sa' | 'wb-sa';
const CURVES: Record<CurveKind, { name: string; sample: string; titrant: string; indicator: number }> = {
  'sa-sb': { name: 'A strong acid titrated with a strong base', sample: 'HCl', titrant: 'NaOH', indicator: 2 },
  'wa-sb': { name: 'A weak acid titrated with a strong base', sample: 'CH3COOH', titrant: 'NaOH', indicator: 3 },
  'sb-sa': { name: 'A strong base titrated with a strong acid', sample: 'NaOH', titrant: 'HCl', indicator: 2 },
  'wb-sa': { name: 'A weak base titrated with a strong acid', sample: 'NH3', titrant: 'HCl', indicator: 1 },
};
const INDICATORS = [
  { name: 'methyl orange', lo: 3.2, hi: 4.4 },
  { name: 'methyl red', lo: 4.8, hi: 6.0 },
  { name: 'bromothymol blue', lo: 6.0, hi: 7.6 },
  { name: 'phenolphthalein', lo: 8.2, hi: 10.0 },
];
const KW = 1e-14;
const KA = 1.8e-5;

/** pH of 25.00 mL of 0.100 mol/L acid after v mL of base whose equivalence volume is ve (weak: Ka of acetic acid). */
function acidPh(v: number, ve: number, weak: boolean): number {
  const nA = 0.1 * 25;
  const nB = (nA / ve) * v;
  const vt = 25 + v;
  if (Math.abs(nB - nA) < 1e-9) return weak ? 14 + Math.log10(Math.sqrt((KW / KA) * (nA / vt))) : 7;
  if (nB > nA) return 14 + Math.log10((nB - nA) / vt);
  if (!weak) return -Math.log10((nA - nB) / vt);
  if (nB === 0) return -Math.log10(Math.sqrt(KA * 0.1));
  return -Math.log10(KA) + Math.log10(nB / (nA - nB));
}
function curvePh(kind: CurveKind, v: number, ve: number): number {
  const ph = kind === 'sa-sb' || kind === 'sb-sa' ? acidPh(v, ve, false) : acidPh(v, ve, true);
  // A base titrated with an acid is the mirror image, about pH 7.
  return Math.min(14, Math.max(0, kind === 'sb-sa' || kind === 'wb-sa' ? 14 - ph : ph));
}
function curveFigure(kind: CurveKind, ve: number, xLabel: string): PlaneFigure {
  const xs = new Set<number>();
  for (let v = 0; v <= 50; v += 1) xs.add(v);
  for (const dv of [-0.5, -0.2, -0.05, 0, 0.05, 0.2, 0.5]) xs.add(ve + dv);
  const points = [...xs].sort((a, b) => a - b).map((v) => [v, Math.round(curvePh(kind, v, ve) * 100) / 100] as [number, number]);
  // The weak-acid buffer starts just above the first point: keep the curve rising.
  for (let k = 1; k < points.length; k++) {
    const rising = kind === 'sa-sb' || kind === 'wa-sb';
    if (rising ? points[k][1] < points[k - 1][1] : points[k][1] > points[k - 1][1]) points[k][1] = points[k - 1][1];
  }
  return { type: 'plane', grid: { xMin: 0, xMax: 50, yMin: 0, yMax: 14, xStep: 5, yStep: 1, xLabel, yLabel: 'pH' }, polylines: [{ points, color: 'brand' }] };
}

function titrationCurve(rng: Rng, d: Difficulty): GenOutput {
  const kind = rng.pick(Object.keys(CURVES) as CurveKind[]);
  const c = CURVES[kind];
  const ve = rng.pick([15, 20, 25, 30, 35]);
  const eqPh = curvePh(kind, ve, ve);
  const intro = `The graph shows the titration of $25.00\\ \\text{mL}$ of $\\ce{${c.sample}(aq)}$ with $\\ce{${c.titrant}(aq)}$.`;
  if (d === 1) {
    return {
      prompt: `${intro} What volume of $\\ce{${c.titrant}}$ has been added at the equivalence point, to the nearest millilitre?`,
      figure: curveFigure(kind, ve, `Volume of ${c.titrant} added (mL)`),
      parts: [numPart(ve, { tolerance: 1, suffix: 'mL' })],
      hints: ['The equivalence point is in the middle of the steep, nearly vertical part of the curve.', 'Read straight down from it to the volume axis.'],
      solution: [`The pH changes fastest at ${q(ve, 'mL')}: that is the equivalence point.`],
    };
  }
  if (d === 2) {
    const table = INDICATORS.map((i) => `${i.name} (pH ${i.lo.toFixed(1)} to ${i.hi.toFixed(1)})`).join(', ');
    return {
      prompt: `${intro} Which indicator changes colour closest to the equivalence point? The colour-change ranges are: ${table}.`,
      figure: curveFigure(kind, ve, `Volume of ${c.titrant} added (mL)`),
      parts: [part(fixedChoice(INDICATORS.map((i) => cap(i.name)), c.indicator))],
      hints: ['Find the equivalence point, in the middle of the steep part, and read its pH.', 'Choose the indicator whose colour-change range includes that pH.'],
      solution: [`The equivalence point is at about pH ${eqPh.toFixed(1)}, which is inside the range of ${INDICATORS[c.indicator].name} (pH ${INDICATORS[c.indicator].lo.toFixed(1)} to ${INDICATORS[c.indicator].hi.toFixed(1)}).`],
    };
  }
  const kinds = Object.keys(CURVES) as CurveKind[];
  return {
    prompt: 'The graph shows a titration curve. Which titration does it show?',
    figure: curveFigure(kind, ve, 'Volume of titrant added (mL)'),
    parts: [part(fixedChoice(kinds.map((k) => CURVES[k].name), kinds.indexOf(kind)))],
    hints: ['The starting pH tells you what is in the flask: low for an acid, high for a base, and closer to 7 when it is weak.', 'The pH at the equivalence point is 7 for strong with strong, above 7 for a weak acid, and below 7 for a weak base.'],
    solution: [`It starts at pH ${curvePh(kind, 0, ve).toFixed(1)} and the equivalence point is at about pH ${eqPh.toFixed(1)}: ${c.name.toLowerCase()}.`],
  };
}

// ----------------------------------------------------------------------------

export const STOICHIOMETRY_SKILLS: SkillDef[] = [
  skill({ id: 'c20-balance', name: 'Balancing equations', description: 'Balance chemical equations with the smallest whole-number coefficients.', outcomes: ['20-D1'], lessonId: L(1), gen: balancing }),
  skill({ id: 'c20-reaction-type', name: 'Types of reactions', description: 'Classify formation, simple decomposition, single and double replacement, and complete combustion reactions.', outcomes: ['20-D1'], lessonId: L(1), format: 'mc', gen: reactionType }),
  skill({ id: 'c20-net-ionic', name: 'Net ionic equations', description: 'Choose the net ionic equation for a precipitation reaction.', outcomes: ['20-D1'], lessonId: L(2), format: 'mc', gen: netIonic }),
  skill({ id: 'c20-spectator-ions', name: 'Spectator ions', description: 'Identify the spectator ions in precipitation and neutralisation reactions.', outcomes: ['20-D1'], lessonId: L(2), format: 'mc', gen: spectatorIons }),
  skill({ id: 'c20-molar-mass', name: 'Molar mass', description: 'Calculate the molar mass of a compound, including hydrates.', outcomes: ['20-D2'], lessonId: L(3), calculator: true, gen: molarMassSkill }),
  skill({ id: 'c20-mole-mass', name: 'Moles and mass', description: 'Convert between mass and amount in moles.', outcomes: ['20-D2'], lessonId: L(3), calculator: true, gen: moleMass }),
  skill({ id: 'c20-particles', name: 'Avogadro\'s number', description: 'Convert between amount in moles and numbers of molecules and atoms.', outcomes: ['20-D2'], lessonId: L(3), calculator: true, gen: particles }),
  skill({ id: 'c20-mole-ratio', name: 'Mole ratios', description: 'Use the coefficients of a balanced equation to find an amount in moles.', outcomes: ['20-D1', '20-D2'], lessonId: L(4), calculator: true, gen: moleRatio }),
  skill({ id: 'c20-gravimetric', name: 'Gravimetric stoichiometry', description: 'Find the mass of a reactant or product from the mass of another.', outcomes: ['20-D2'], lessonId: L(4), calculator: true, gen: gravimetric }),
  skill({ id: 'c20-gas-stoich', name: 'Gas stoichiometry', description: 'Relate the mass of one substance to the volume of a gas, at STP, at SATP or with the ideal gas law.', outcomes: ['20-D2'], lessonId: L(5), calculator: true, gen: gasStoich }),
  skill({ id: 'c20-solution-stoich', name: 'Solution stoichiometry', description: 'Use volumes and concentrations of solutions in stoichiometry.', outcomes: ['20-D2'], lessonId: L(5), calculator: true, gen: solutionStoich }),
  skill({ id: 'c20-limiting', name: 'Limiting and excess reagents', description: 'Decide which reactant is limiting and which is in excess.', outcomes: ['20-D2'], lessonId: L(6), format: 'mc', calculator: true, gen: limiting }),
  skill({ id: 'c20-limiting-yield', name: 'Product from a limiting reagent', description: 'Find the amount or mass of product, and the excess left over, when one reactant runs out.', outcomes: ['20-D2'], lessonId: L(6), calculator: true, gen: limitingYield }),
  skill({ id: 'c20-percent-yield', name: 'Percent yield', description: 'Calculate theoretical and percent yield, and plan for a known percent yield.', outcomes: ['20-D2'], lessonId: L(7), calculator: true, gen: percentYield }),
  skill({ id: 'c20-titration', name: 'Titration', description: 'Find the concentration of a sample from titration data.', outcomes: ['20-D2'], lessonId: L(8), calculator: true, gen: titration }),
  skill({ id: 'c20-titration-curve', name: 'Titration curves', description: 'Read the equivalence point from a titration curve, choose an indicator, and recognise strong and weak titrations.', outcomes: ['20-D2'], lessonId: L(8), gen: titrationCurve }),
];
