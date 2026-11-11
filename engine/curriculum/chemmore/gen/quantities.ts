/**
 * More Chemistry Topics, Unit 3: formulae and atom economy. Empirical formulae from masses and
 * percentages, molecular formulae from a relative formula mass, and the atom economy of a
 * reaction, alone and with percentage yield. Every question states the relative atomic masses it
 * uses, and every equation takes its coefficients from `balance()`.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { balance } from '../../../chem/formula.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { $, AR, ELEMENT_NAME, andList, arText, atomsOf, coef, eq, mr, mrWorking, q } from './common.ts';

const L = (n: number) => `cx-3-${n}`;
const formulaPart = (expected: string, label = 'Formula:'): Part => part({ kind: 'formula', expected }, { label, placeholder: 'e.g. Fe2O3' });

// ---------------------------------------------------------------------------- lesson 3.1: empirical formulae

/** Compounds of two elements, as empirical formulae. */
const BINARY = ['MgO', 'Fe2O3', 'CuO', 'Cu2O', 'SO2', 'SO3', 'CO2', 'CH4', 'CH3', 'CH2', 'Al2O3', 'Na2O', 'CaCl2', 'P2O5', 'NO2', 'N2O', 'H2O', 'NH3', 'K2O', 'MgCl2', 'SiO2', 'TiO2', 'Fe3O4', 'C3H8', 'C2H5', 'CaO', 'ZnO', 'PbO2', 'N2O5', 'FeCl3'];
/** Compounds of three elements, as empirical formulae. */
const TERNARY = ['CaCO3', 'Na2SO4', 'MgSO4', 'CH2O', 'C2H6O', 'KNO3', 'NaNO3', 'Na2CO3', 'CuSO4', 'CuCO3', 'H2SO4', 'HNO3', 'NaOH', 'K2CO3', 'MgCO3', 'C2H4O', 'ZnSO4'];
/** Metal oxides made by heating a metal in oxygen, for finding a formula from a gain in mass. */
const OXIDES = ['MgO', 'Al2O3', 'CuO', 'Cu2O', 'Fe2O3', 'Fe3O4', 'ZnO', 'CaO', 'PbO', 'TiO2', 'Na2O', 'K2O'];

/** The smallest whole number that turns the mole ratio n ÷ (smallest n) into whole numbers. */
function multiplier(counts: number[]): number {
  const least = Math.min(...counts);
  for (let t = 1; t <= 12; t++) if (counts.every((n) => Number.isInteger(Math.round((n * t * 1e6) / least) / 1e6))) return t;
  throw new Error(`No multiplier for ${counts.join(':')}`);
}

/** The working from an amount of each element (a mass in grams, or a percentage) to the formula. */
function empiricalWorking(f: string, amounts: number[], unit: string): string[] {
  const atoms = atomsOf(f);
  const moles = atoms.map(([el], i) => amounts[i] / AR[el]);
  const least = Math.min(...moles);
  const t = multiplier(atoms.map(([, n]) => n));
  const lines = [
    `Divide each ${unit === '%' ? 'percentage' : 'mass'} by the relative atomic mass: ${atoms.map(([el], i) => `${el}: $${fmt(amounts[i], 2)} \\div ${AR[el]} = ${fmt(moles[i], 3)}$`).join('; ')}.`,
    `Divide by the smallest, $${fmt(least, 3)}$: ${atoms.map(([el], i) => `${el}: $${fmt(moles[i] / least, 2)}$`).join('; ')}.`,
  ];
  if (t > 1) lines.push(`These are not all whole numbers, so multiply each by ${t}: ${atoms.map(([el, n]) => `${el}: $${n}$`).join('; ')}.`);
  lines.push(`The simplest whole-number ratio is ${atoms.map(([el, n]) => `${n} ${el}`).join(' : ')}, so the empirical formula is ${$(f)}.`);
  return lines;
}

const HINTS_EMPIRICAL = ['Divide the amount of each element by its relative atomic mass to compare numbers of atoms.', 'Divide every answer by the smallest one. If a result ends in .5, double them all; if in .33 or .67, multiply by 3.'];

function empiricalFormula(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    // Masses of two elements that combine.
    const f = rng.pick(BINARY);
    const atoms = atomsOf(f);
    const k = rng.pick([0.05, 0.1, 0.2, 0.25, 0.5]);
    const masses = atoms.map(([el, n]) => n * AR[el] * k);
    const [a, b] = atoms.map(([el]) => ELEMENT_NAME[el]);
    return {
      prompt: `A compound contains ${q(fmt(masses[0], 3), 'g')} of ${a} and ${q(fmt(masses[1], 3), 'g')} of ${b} only. What is its empirical formula? ${arText(f)}`,
      parts: [formulaPart(f)],
      hints: HINTS_EMPIRICAL,
      solution: empiricalWorking(f, masses, 'g'),
      calculator: true,
    };
  }
  if (d === 2) {
    // Percentages by mass, two or three elements.
    const f = rng.chance(0.5) ? rng.pick(BINARY) : rng.pick(TERNARY);
    const atoms = atomsOf(f);
    const M = mr(f);
    const pct = atoms.map(([el, n]) => Math.round(((n * AR[el]) / M) * 1000) / 10);
    // Make the rounded percentages add to exactly 100 by adjusting the last.
    pct[pct.length - 1] = Math.round((100 - pct.slice(0, -1).reduce((s, x) => s + x, 0)) * 10) / 10;
    return {
      prompt: `By mass, a compound is ${andList(atoms.map(([el], i) => `${fmtFixed(pct[i], 1)}% ${ELEMENT_NAME[el]}`))}. What is its empirical formula? ${arText(f)}`,
      parts: [formulaPart(f)],
      hints: ['Treat the percentages as the masses in 100 g of the compound.', ...HINTS_EMPIRICAL],
      solution: ['In $100\\ \\text{g}$ of the compound, the percentages are the masses in grams.', ...empiricalWorking(f, pct, '%')],
      calculator: true,
    };
  }
  // A metal heated in oxygen: the oxygen is found from the gain in mass.
  const f = rng.pick(OXIDES);
  const atoms = atomsOf(f);
  const [metal, nMetal] = atoms[0];
  const k = rng.pick([0.02, 0.05, 0.1, 0.2, 0.25]);
  const metalMass = nMetal * AR[metal] * k;
  const total = mr(f) * k;
  const oxygen = total - metalMass;
  return {
    prompt: `${q(fmt(metalMass, 3), 'g')} of ${ELEMENT_NAME[metal]} is heated in oxygen until it has all reacted. The oxide formed has a mass of ${q(fmt(total, 3), 'g')}. What is the empirical formula of the oxide? ${arText(f)}`,
    parts: [formulaPart(f)],
    hints: ['The mass of oxygen that combined is the gain in mass.', ...HINTS_EMPIRICAL],
    solution: [`Mass of oxygen $= ${fmt(total, 3)} - ${fmt(metalMass, 3)} = ${fmt(oxygen, 3)}\\ \\text{g}$.`, ...empiricalWorking(f, [metalMass, oxygen], 'g')],
    calculator: true,
  };
}

/** An empirical formula and a molecular formula built from it. */
const MOLECULES: Array<[string, string, string]> = [
  ['CH2', 'C2H4', 'ethene'],
  ['CH2', 'C3H6', 'propene'],
  ['CH2', 'C4H8', 'butene'],
  ['CH2', 'C6H12', 'cyclohexane'],
  ['CH', 'C2H2', 'ethyne'],
  ['CH', 'C6H6', 'benzene'],
  ['CH3', 'C2H6', 'ethane'],
  ['C2H5', 'C4H10', 'butane'],
  ['C3H7', 'C6H14', 'hexane'],
  ['CH2O', 'C2H4O2', 'ethanoic acid'],
  ['CH2O', 'C6H12O6', 'glucose'],
  ['NO2', 'N2O4', 'dinitrogen tetroxide'],
  ['HO', 'H2O2', 'hydrogen peroxide'],
  ['P2O5', 'P4O10', 'phosphorus(V) oxide'],
  ['NH2', 'N2H4', 'hydrazine'],
  ['C2H4O', 'C4H8O2', 'ethyl ethanoate'],
  ['CH2Cl', 'C2H4Cl2', 'dichloroethane'],
];
/** Molecules whose formula is already the simplest ratio. */
const ALREADY: Array<[string, string]> = [['C3H8', 'propane'], ['CH4', 'methane'], ['C2H6O', 'ethanol'], ['CO2', 'carbon dioxide'], ['NH3', 'ammonia']];

function molecularFormula(rng: Rng, d: Difficulty): GenOutput {
  if (d === 2) {
    // From a molecular formula back to the empirical formula.
    if (rng.chance(0.25)) {
      const [f, name] = rng.pick(ALREADY);
      return {
        prompt: `The molecular formula of ${name} is ${$(f)}. What is its empirical formula?`,
        parts: [formulaPart(f, 'Empirical formula:')],
        hints: ['The empirical formula is the simplest whole-number ratio of the atoms.', 'Look for a number that divides into every subscript. If only 1 does, the formula is already the simplest.'],
        solution: [`The numbers of atoms are ${atomsOf(f).map(([el, n]) => `${n} ${el}`).join(' : ')}. No whole number larger than 1 divides into all of them, so the empirical formula is the same as the molecular formula: ${$(f)}.`],
      };
    }
    const [emp, mol, name] = rng.pick(MOLECULES);
    const n = atomsOf(mol)[0][1] / atomsOf(emp)[0][1];
    return {
      prompt: `The molecular formula of ${name} is ${$(mol)}. What is its empirical formula?`,
      parts: [formulaPart(emp, 'Empirical formula:')],
      hints: ['The empirical formula is the simplest whole-number ratio of the atoms.', 'Divide every subscript by the largest number that divides into all of them.'],
      solution: [`The numbers of atoms are ${atomsOf(mol).map(([el, k]) => `${k} ${el}`).join(' : ')}. Dividing each by ${n} gives ${atomsOf(emp).map(([el, k]) => `${k} ${el}`).join(' : ')}.`, `The empirical formula is ${$(emp)}.`],
    };
  }
  const [emp, mol, name] = rng.pick(MOLECULES);
  const n = atomsOf(mol)[0][1] / atomsOf(emp)[0][1];
  const scale = [`The empirical formula ${$(emp)} has a relative formula mass of $${mrWorking(emp)}$.`, `$${fmt(mr(mol))} \\div ${fmt(mr(emp))} = ${n}$, so the molecule contains ${n} of these units.`, `Multiply every subscript by ${n}: the molecular formula is ${$(mol)}.`];
  if (d === 1) {
    return {
      prompt: `A compound has the empirical formula ${$(emp)} and a relative formula mass of ${fmt(mr(mol))}. What is its molecular formula? ${arText(emp)}`,
      parts: [formulaPart(mol, 'Molecular formula:')],
      hints: ['Find the relative formula mass of the empirical formula.', 'Divide the compound’s relative formula mass by it. The answer says how many empirical units make one molecule.'],
      solution: scale,
      calculator: true,
    };
  }
  // Percentages and a relative formula mass.
  const atoms = atomsOf(emp);
  const M = mr(emp);
  const pct = atoms.map(([el, k]) => Math.round(((k * AR[el]) / M) * 1000) / 10);
  pct[pct.length - 1] = Math.round((100 - pct.slice(0, -1).reduce((s, x) => s + x, 0)) * 10) / 10;
  const least = Math.min(...atoms.map(([el], i) => pct[i] / AR[el]));
  return {
    prompt: `By mass, ${name} is ${andList(atoms.map(([el], i) => `${fmtFixed(pct[i], 1)}% ${ELEMENT_NAME[el]}`))}. Its relative formula mass is ${fmt(mr(mol))}. What is its molecular formula? ${arText(emp)}`,
    parts: [formulaPart(mol, 'Molecular formula:')],
    hints: ['Find the empirical formula first, from the percentages.', 'Then compare the relative formula mass of the empirical formula with that of the compound.'],
    solution: [
      `Divide each percentage by the relative atomic mass: ${atoms.map(([el], i) => `${el}: $${fmtFixed(pct[i], 1)} \\div ${AR[el]} = ${fmt(pct[i] / AR[el], 3)}$`).join('; ')}.`,
      `Divide by the smallest and, if needed, multiply to reach whole numbers: ${atoms.map(([el, k], i) => `${el}: $${fmt(pct[i] / AR[el] / least, 2)}${multiplier(atoms.map(([, c]) => c)) > 1 ? ` \\to ${k}` : ''}$`).join('; ')}. The empirical formula is ${$(emp)}.`,
      ...scale,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 3.2: atom economy

interface Rx {
  r: string[];
  p: string[];
  /** The useful product, as written in `p`. */
  want: string;
  name: string;
  /** What the reaction is for, as the start of a sentence. */
  told: string;
}
const RXS: Rx[] = [
  { r: ['CaCO3'], p: ['CaO', 'CO2'], want: 'CaO', name: 'calcium oxide', told: 'Calcium oxide (lime) is made by heating limestone' },
  { r: ['Fe2O3', 'C'], p: ['Fe', 'CO2'], want: 'Fe', name: 'iron', told: 'Iron is extracted by heating iron(III) oxide with carbon' },
  { r: ['Fe2O3', 'CO'], p: ['Fe', 'CO2'], want: 'Fe', name: 'iron', told: 'In a blast furnace, iron(III) oxide is reduced by carbon monoxide' },
  { r: ['CuO', 'H2'], p: ['Cu', 'H2O'], want: 'Cu', name: 'copper', told: 'Copper is made by passing hydrogen over hot copper(II) oxide' },
  { r: ['CuO', 'C'], p: ['Cu', 'CO2'], want: 'Cu', name: 'copper', told: 'Copper is made by heating copper(II) oxide with carbon' },
  { r: ['C6H12O6'], p: ['C2H5OH', 'CO2'], want: 'C2H5OH', name: 'ethanol', told: 'Ethanol is made by fermenting glucose' },
  { r: ['CH4', 'H2O'], p: ['CO', 'H2'], want: 'H2', name: 'hydrogen', told: 'Hydrogen is made by reacting methane with steam' },
  { r: ['H2O'], p: ['H2', 'O2'], want: 'H2', name: 'hydrogen', told: 'Hydrogen is made by the electrolysis of water' },
  { r: ['C', 'H2O'], p: ['CO2', 'H2'], want: 'H2', name: 'hydrogen', told: 'Hydrogen is made by reacting hot carbon with steam' },
  { r: ['TiCl4', 'Mg'], p: ['Ti', 'MgCl2'], want: 'Ti', name: 'titanium', told: 'Titanium is made by reacting titanium(IV) chloride with magnesium' },
  { r: ['Al2O3'], p: ['Al', 'O2'], want: 'Al', name: 'aluminium', told: 'Aluminium is made by the electrolysis of aluminium oxide' },
  { r: ['CuO', 'H2SO4'], p: ['CuSO4', 'H2O'], want: 'CuSO4', name: 'copper(II) sulfate', told: 'Copper(II) sulfate is made from copper(II) oxide and sulfuric acid' },
  { r: ['NaOH', 'HCl'], p: ['NaCl', 'H2O'], want: 'NaCl', name: 'sodium chloride', told: 'Sodium chloride is made by neutralising sodium hydroxide with hydrochloric acid' },
  { r: ['MgCO3'], p: ['MgO', 'CO2'], want: 'MgO', name: 'magnesium oxide', told: 'Magnesium oxide is made by heating magnesium carbonate' },
  { r: ['WO3', 'H2'], p: ['W', 'H2O'], want: 'W', name: 'tungsten', told: 'Tungsten is made by heating tungsten(VI) oxide in hydrogen' },
  { r: ['ZnO', 'C'], p: ['Zn', 'CO2'], want: 'Zn', name: 'zinc', told: 'Zinc is extracted by heating zinc oxide with carbon' },
  { r: ['SnO2', 'C'], p: ['Sn', 'CO2'], want: 'Sn', name: 'tin', told: 'Tin is extracted by heating tin(IV) oxide with carbon' },
  { r: ['Cr2O3', 'Al'], p: ['Cr', 'Al2O3'], want: 'Cr', name: 'chromium', told: 'Chromium is made by heating chromium(III) oxide with aluminium' },
  { r: ['Zn', 'HCl'], p: ['ZnCl2', 'H2'], want: 'H2', name: 'hydrogen', told: 'In the laboratory, hydrogen is made from zinc and hydrochloric acid' },
  { r: ['CaCO3', 'HCl'], p: ['CaCl2', 'H2O', 'CO2'], want: 'CaCl2', name: 'calcium chloride', told: 'Calcium chloride is made from calcium carbonate and hydrochloric acid' },
];
/** Reactions with a single product: every atom ends up in it. */
const ADDITIONS: Rx[] = [
  { r: ['C2H4', 'H2O'], p: ['C2H5OH'], want: 'C2H5OH', name: 'ethanol', told: 'Ethanol is made by reacting ethene with steam' },
  { r: ['N2', 'H2'], p: ['NH3'], want: 'NH3', name: 'ammonia', told: 'Ammonia is made from nitrogen and hydrogen' },
  { r: ['Mg', 'O2'], p: ['MgO'], want: 'MgO', name: 'magnesium oxide', told: 'Magnesium oxide is made by burning magnesium in oxygen' },
  { r: ['NH3', 'HNO3'], p: ['NH4NO3'], want: 'NH4NO3', name: 'ammonium nitrate', told: 'The fertiliser ammonium nitrate is made from ammonia and nitric acid' },
  { r: ['CaO', 'H2O'], p: ['Ca(OH)2'], want: 'Ca(OH)2', name: 'calcium hydroxide', told: 'Calcium hydroxide is made by adding water to calcium oxide' },
];

interface Economy {
  equation: string;
  /** Total relative formula mass of the reactants, and of the wanted product, each counted with its coefficient. */
  total: number;
  wanted: number;
  value: number;
  working: string[];
}
function economy(x: Rx): Economy {
  const c = balance(x.r, x.p);
  if (!c) throw new Error(`Cannot balance ${x.r.join(' + ')} -> ${x.p.join(' + ')}`);
  const sp = [...x.r, ...x.p];
  const term = (i: number) => `${coef(c[i])}${sp[i]}`;
  const equation = eq(`${x.r.map((_, i) => term(i)).join(' + ')} -> ${x.p.map((_, i) => term(x.r.length + i)).join(' + ')}`);
  const massOf = (i: number) => c[i] * mr(sp[i]);
  const total = Math.round(x.r.reduce((s, _, i) => s + massOf(i), 0) * 10) / 10;
  const k = x.r.length + x.p.indexOf(x.want);
  const wanted = Math.round(massOf(k) * 10) / 10;
  const show = (i: number) => (c[i] === 1 ? `${fmt(mr(sp[i]))}` : `(${c[i]} \\times ${fmt(mr(sp[i]))})`);
  const working = [
    `Relative formula masses: ${[...new Set(sp)].filter((f) => x.r.includes(f) || f === x.want).map((f) => `${$(f)} $= ${fmt(mr(f))}$`).join(', ')}.`,
    `Total for the reactants $= ${x.r.map((_, i) => show(i)).join(' + ')}${x.r.length === 1 && c[0] === 1 ? '' : ` = ${fmt(total)}`}$.`,
    `For the desired product, ${x.name}: $${c[k] === 1 ? fmt(wanted) : `${c[k]} \\times ${fmt(mr(x.want))} = ${fmt(wanted)}`}$.`,
  ];
  return { equation, total, wanted, value: (wanted / total) * 100, working };
}
const FORMULA_TEXT = 'Atom economy = (total relative formula mass of the desired product ÷ total relative formula mass of all the reactants) × 100.';

function atomEconomy(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(d === 1 ? RXS : [...RXS, ...RXS, ...ADDITIONS]);
  const e = economy(x);
  const last = `Atom economy $= \\dfrac{${fmt(e.wanted)}}{${fmt(e.total)}} \\times 100 = ${fmtFixed(e.value, 1)}\\%$.`;
  if (d === 1) {
    return {
      prompt: `${x.told}: ${e.equation}. In this equation, the reactants have a total relative formula mass of ${fmt(e.total)}, and the ${x.name} has a total of ${fmt(e.wanted)}. What is the atom economy for making ${x.name}? Give your answer to 1 decimal place.`,
      parts: [numPart(e.value, { decimals: 1, suffix: '%' })],
      hints: [FORMULA_TEXT, 'The total for the reactants equals the total for all the products, because mass is conserved.'],
      solution: [last],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${x.told}: ${e.equation}. What is the atom economy for making ${x.name}? ${arText(...x.r, x.want)} Give your answer to 1 decimal place.`,
      parts: [numPart(e.value, { decimals: 1, suffix: '%' })],
      hints: [FORMULA_TEXT, 'Multiply each relative formula mass by the number in front of its formula in the equation.'],
      solution: [...e.working, last, ...(x.p.length === 1 ? ['There is only one product, so every atom of the reactants ends up in it.'] : [])],
      calculator: true,
    };
  }
  // The mass of reactants that ends up as waste.
  const y = rng.pick(RXS);
  const f = economy(y);
  const mass = rng.pick([50, 100, 200, 250, 400, 500, 800]);
  const unit = rng.pick(['kg', 'tonnes', 'g']);
  const waste = rng.chance(0.5);
  const answer = (mass * (waste ? 100 - f.value : f.value)) / 100;
  return {
    prompt: `${y.told}: ${f.equation}. The reactants are mixed in exactly the amounts the equation needs, and they react completely. From ${q(mass, unit)} of reactants, what mass ${waste ? `ends up in products **other than** ${y.name}` : `of ${y.name} is made`}? ${arText(...y.r, y.want)} Give your answer to 1 decimal place.`,
    parts: [numPart(answer, { decimals: 1, suffix: unit, tolerance: 0.11 })],
    hints: ['Find the atom economy first: it is the percentage of the reactants’ mass that ends up in the desired product.', waste ? 'The rest of the mass, 100% minus the atom economy, ends up in the other products.' : 'Multiply the mass of the reactants by that percentage.'],
    solution: [
      ...f.working,
      `Atom economy $= \\dfrac{${fmt(f.wanted)}}{${fmt(f.total)}} \\times 100 = ${fmt(f.value, 2)}\\%$.`,
      waste
        ? `The other products take $100 - ${fmt(f.value, 2)} = ${fmt(100 - f.value, 2)}\\%$ of the mass: $${mass} \\times \\dfrac{${fmt(f.total - f.wanted)}}{${fmt(f.total)}} = ${fmtFixed(answer, 1)}\\ \\text{${unit}}$.`
        : `Mass of ${y.name} $= ${mass} \\times \\dfrac{${fmt(f.wanted)}}{${fmt(f.total)}} = ${fmtFixed(answer, 1)}\\ \\text{${unit}}$.`,
    ],
    calculator: true,
  };
}

/** Two ways to make the same product, by index into the lists above. */
const ROUTES: Array<[Rx, Rx]> = [
  [ADDITIONS[0], RXS[5]], // ethanol: hydration and fermentation
  [RXS[6], RXS[7]], // hydrogen: methane and steam, electrolysis of water
  [RXS[6], RXS[8]], // hydrogen: methane and steam, carbon and steam
  [RXS[7], RXS[8]], // hydrogen: electrolysis of water, carbon and steam
  [RXS[1], RXS[2]], // iron: carbon, carbon monoxide
  [RXS[3], RXS[4]], // copper: hydrogen, carbon
  [ADDITIONS[2], RXS[13]], // magnesium oxide: burning magnesium, heating the carbonate
  [RXS[18], RXS[7]], // hydrogen: zinc and acid, electrolysis of water
];

function atomEconomyCompare(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const item = rng.pick([
      {
        ask: 'What does the atom economy of a reaction measure?',
        right: 'The percentage of the mass of the reactants that ends up in the desired product',
        wrong: ['The percentage of the expected product that is actually collected', 'The cost of the reactants compared with the price of the product', 'The speed at which the reactants turn into products'],
        sol: 'Atom economy compares the mass of the desired product with the mass of all the reactants in the balanced equation. It shows how many of the atoms are used and how many are wasted.',
      },
      {
        ask: 'A reaction makes only one product. What is its atom economy?',
        right: '100%',
        wrong: ['0%', '50%', 'It depends on how much product is lost'],
        sol: 'With one product, every atom of the reactants ends up in that product, so the atom economy is 100%.',
      },
      {
        ask: 'Why do chemical companies prefer reactions with a high atom economy?',
        right: 'Less of the starting material is turned into waste',
        wrong: ['The reaction always goes faster', 'The reaction needs no energy', 'The product is always purer'],
        sol: 'A high atom economy means most of the atoms bought as raw materials end up in the product that is sold. Less waste has to be dealt with, and fewer resources are used.',
      },
      {
        ask: 'A reaction has a low atom economy. Which change would make the process less wasteful?',
        right: 'Finding a use for the other products, so that they can be sold',
        wrong: ['Stirring the mixture faster', 'Using larger containers', 'Collecting the desired product more carefully'],
        sol: 'The atom economy is fixed by the equation. If the other products are useful too, their atoms are no longer waste. Collecting the product more carefully raises the yield, not the atom economy.',
      },
      {
        ask: 'Which of these changes the atom economy of making a product?',
        right: 'Choosing a different reaction that makes the same product',
        wrong: ['Losing less product when it is filtered', 'Leaving the reaction for longer', 'Using purer reactants in the same reaction'],
        sol: 'Atom economy is worked out from the balanced equation, so only a different reaction changes it. The other changes affect the percentage yield.',
      },
    ]);
    return {
      prompt: item.ask,
      parts: [part(mc(rng, item.right, item.wrong))],
      hints: ['Atom economy is worked out from the balanced equation alone.', 'It asks: of all the atoms that go in, what share ends up in the product we want?'],
      solution: [item.sol],
    };
  }
  if (d === 2) {
    const [a, b] = rng.pick(ROUTES);
    const [first, second] = rng.chance(0.5) ? [a, b] : [b, a];
    const e1 = economy(first);
    const e2 = economy(second);
    return {
      prompt: `Two ways to make ${first.name}:\n\n**Route 1.** ${first.told}: ${e1.equation}.\n\n**Route 2.** ${second.told}: ${e2.equation}.\n\nWhich route has the higher atom economy for ${first.name}? ${arText(...first.r, ...second.r, first.want)}`,
      parts: [part(fixedChoice(['Route 1', 'Route 2', 'They are the same'], e1.value > e2.value ? 0 : 1))],
      hints: [FORMULA_TEXT, 'A route with only one product has an atom economy of 100%.'],
      solution: [
        `Route 1: $\\dfrac{${fmt(e1.wanted)}}{${fmt(e1.total)}} \\times 100 = ${fmtFixed(e1.value, 1)}\\%$.`,
        `Route 2: $\\dfrac{${fmt(e2.wanted)}}{${fmt(e2.total)}} \\times 100 = ${fmtFixed(e2.value, 1)}\\%$.`,
        `Route ${e1.value > e2.value ? 1 : 2} has the higher atom economy, so it wastes fewer atoms.`,
      ],
      calculator: true,
    };
  }
  if (rng.chance(0.3)) {
    const item = rng.pick([
      {
        ask: 'A reaction has an atom economy of 100%, but a factory collects only 70% of the product the equation predicts. Which statement explains this?',
        right: 'Atom economy comes from the equation, while yield depends on how much product is actually collected',
        wrong: ['The atom economy must have been calculated wrongly', 'A reaction with 100% atom economy always has a 100% yield', 'Thirty percent of the atoms were destroyed'],
      },
      {
        ask: 'Reaction A has a yield of 95% and an atom economy of 20%. Reaction B makes the same product with a yield of 80% and an atom economy of 100%. Which uses the raw materials less wastefully?',
        right: 'Reaction B, because far more of the mass of its reactants ends up in the product',
        wrong: ['Reaction A, because its yield is higher', 'Reaction A, because a low atom economy means little waste', 'They are equally wasteful'],
      },
    ]);
    return {
      prompt: item.ask,
      parts: [part(mc(rng, item.right, item.wrong))],
      hints: ['Yield compares what you collect with what the equation predicts.', 'Atom economy compares the desired product with everything the equation makes.'],
      solution: [`${item.right}. Multiplying the two gives the share of the reactants’ mass that is collected as product.`],
    };
  }
  // Atom economy and percentage yield together.
  const x = rng.pick(RXS);
  const e = economy(x);
  const mass = rng.pick([100, 200, 250, 500, 1000]);
  const unit = rng.pick(['kg', 'tonnes', 'g']);
  const yld = rng.pick([60, 70, 75, 80, 85, 90]);
  // The question states the atom economy to 1 decimal place, so the answer is worked from that value.
  const stated = Number(fmtFixed(e.value, 1));
  const most = (mass * stated) / 100;
  const answer = Math.round((most * yld) / 100);
  return {
    prompt: `${x.told}: ${e.equation}. The atom economy for ${x.name} is ${fmtFixed(e.value, 1)}%. A factory starts with ${q(mass, unit)} of reactants, mixed in exactly the amounts the equation needs, and the percentage yield is ${yld}%. What mass of ${x.name} does it collect? Give your answer to the nearest whole number.`,
    parts: [numPart(answer, { decimals: 0, suffix: unit, tolerance: 1 })],
    hints: ['The atom economy gives the greatest mass of the product that the reactants could make.', 'The percentage yield says how much of that greatest mass is actually collected.'],
    solution: [
      `Greatest possible mass of ${x.name} $= ${mass} \\times ${fmtFixed(e.value, 1)}\\% = ${fmt(most, 1)}\\ \\text{${unit}}$.`,
      `Mass collected $= ${fmt(most, 1)} \\times ${yld}\\% = ${answer}\\ \\text{${unit}}$ to the nearest whole number.`,
    ],
    calculator: true,
  };
}

export const QUANTITY_SKILLS: SkillDef[] = [
  skill({ id: 'cx-empirical-formula', name: 'Empirical formulae', description: 'Find an empirical formula from the masses or percentages of the elements in a compound.', outcomes: ['QC1'], lessonId: L(1), calculator: true, gen: empiricalFormula }),
  skill({ id: 'cx-molecular-formula', name: 'Molecular formulae', description: 'Move between empirical and molecular formulae with a relative formula mass.', outcomes: ['QC1'], lessonId: L(1), calculator: true, gen: molecularFormula }),
  skill({ id: 'cx-atom-economy', name: 'Atom economy', description: 'Calculate the atom economy of a reaction, and the mass of the desired product and of waste.', outcomes: ['QC2'], lessonId: L(2), calculator: true, gen: atomEconomy }),
  skill({ id: 'cx-atom-economy-compare', name: 'Comparing atom economies', description: 'Explain atom economy, compare routes to a product, and use atom economy with percentage yield.', outcomes: ['QC2'], lessonId: L(2), calculator: true, gen: atomEconomyCompare }),
];

