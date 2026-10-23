/**
 * Grade 10 Chemistry, Unit 5: moles, acids and bases. Molar mass and Avogadro's number, mass, moles
 * and particles, mole ratios, the pH scale and indicators, and neutralization and naming salts.
 * The Grade 10 version of the Grade 11 mole questions: molar masses to one decimal place, amounts
 * chosen to come out neatly, and every atomic mass, constant and indicator colour chart the
 * question needs stated in it.
 */
import { fixedChoice, mc, multi, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { balance, ce, parseFormula } from '../../../chem/formula.ts';
import { ANIONS, CATIONS, ionFormula, ionicFormula } from '../../../chem/ions.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Difficulty, Part, SkillDef, TableFigure } from '../../../types.ts';

const L = (n: number) => `c10-5-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
/** A quantity with its unit, in maths: $2.5\ \text{mol}$. */
const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a, b and c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const t1 = (v: number) => v.toFixed(1);
const elName = (sym: string) => element(sym)!.name;
/** Learners in lab questions, with names from many cultures. */
const NAMES = ['Amara', 'Kenji', 'Priya', 'Mateo', 'Leila', 'Chidi', 'Sione', 'Ingrid', 'Tariq', 'Mei', 'Kwame', 'Sofia', 'Arjun', 'Nadia', 'Tomasz', 'Aroha'];
/** "an acidic", "a neutral", "a basic" */
const withArticle = (w: string) => `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;

// ---------------------------------------------------------------------------- molar masses

/** Molar masses of the elements as Grade 10 questions state them: g/mol to one decimal place. */
const AR: Record<string, number> = {
  H: 1.0, He: 4.0, Li: 6.9, C: 12.0, N: 14.0, O: 16.0, F: 19.0, Ne: 20.2, Na: 23.0, Mg: 24.3, Al: 27.0, Si: 28.1, P: 31.0, S: 32.1,
  Cl: 35.5, K: 39.1, Ca: 40.1, Fe: 55.8, Cu: 63.5, Zn: 65.4, Br: 79.9, Ag: 107.9, I: 126.9, Ba: 137.3, Pb: 207.2,
};
function ar(sym: string): number {
  const v = AR[sym];
  if (v === undefined) throw new Error(`No Grade 10 molar mass for ${sym}`);
  return v;
}
/** Tenths of a gram per mole, so sums of one-decimal masses stay exact. */
const tenths = (sym: string) => Math.round(ar(sym) * 10);
/** A formula's molar mass from the stated element masses, so a student's working matches exactly. */
function mm(f: string): number {
  let t = 0;
  for (const [el, n] of parseFormula(f).atoms) t += tenths(el) * n;
  return t / 10;
}
/** "Use these molar masses: ..." for the elements of some formulas. */
function massesText(...formulas: string[]): string {
  const els = [...new Set(formulas.flatMap((f) => [...parseFormula(f).atoms.keys()]))];
  const items = els.map((s) => `${s} $${t1(ar(s))}\\ \\text{g/mol}$`);
  return items.length === 1 ? `Use the molar mass ${items[0]}.` : `Use these molar masses: ${list(items)}.`;
}
/** Atom counts in words: "2 H and 1 O". */
const atomCounts = (f: string) => list([...parseFormula(f).atoms].map(([el, n]) => `${n} ${el}`));
/** $M(\ce{Ca(OH)2}) = 40.1 + 2 \times 16.0 + 2 \times 1.0 = 40.1 + 32.0 + 2.0 = 74.1\ \text{g/mol}$ */
function mmWorking(f: string): string {
  const atoms = [...parseFormula(f).atoms];
  if (atoms.length === 1 && atoms[0][1] === 1) return `$M(${ce(f)}) = ${t1(mm(f))}\\ \\text{g/mol}$`;
  const terms = atoms.map(([el, n]) => (n === 1 ? t1(ar(el)) : `${n} \\times ${t1(ar(el))}`));
  const sums = atoms.map(([el, n]) => t1((tenths(el) * n) / 10));
  const middle = atoms.length > 1 && atoms.some(([, n]) => n > 1) ? ` = ${sums.join(' + ')}` : '';
  return `$M(${ce(f)}) = ${terms.join(' + ')}${middle} = ${t1(mm(f))}\\ \\text{g/mol}$`;
}

interface Sub {
  f: string;
  name: string;
  /** Ionic: counted in formula units, not molecules. */
  ionic?: boolean;
}
const sub = (f: string, name: string, ionic = false): Sub => ({ f, name, ionic });
const unitWord = (x: Sub) => (x.ionic ? 'formula unit' : 'molecule');
const named = (x: { f: string; name: string }) => `${x.name}, ${$(x.f)}`;

/** A diatomic element or a compound of two elements. */
const MM1: Sub[] = [
  sub('O2', 'oxygen'), sub('N2', 'nitrogen'), sub('Cl2', 'chlorine'), sub('H2', 'hydrogen'), sub('H2O', 'water'), sub('CO2', 'carbon dioxide'),
  sub('NH3', 'ammonia'), sub('CH4', 'methane'), sub('HCl', 'hydrogen chloride'), sub('SO2', 'sulfur dioxide'), sub('C3H8', 'propane'),
  sub('NaCl', 'sodium chloride', true), sub('MgO', 'magnesium oxide', true), sub('CaO', 'calcium oxide', true), sub('KCl', 'potassium chloride', true),
  sub('Al2O3', 'aluminium oxide', true), sub('Fe2O3', 'iron(III) oxide', true), sub('CuO', 'copper(II) oxide', true), sub('CaCl2', 'calcium chloride', true),
  sub('MgCl2', 'magnesium chloride', true), sub('Na2O', 'sodium oxide', true),
];
/** Three elements. */
const MM2: Sub[] = [
  sub('NaOH', 'sodium hydroxide', true), sub('KOH', 'potassium hydroxide', true), sub('CaCO3', 'calcium carbonate', true), sub('MgCO3', 'magnesium carbonate', true),
  sub('Na2CO3', 'sodium carbonate', true), sub('KNO3', 'potassium nitrate', true), sub('NaNO3', 'sodium nitrate', true), sub('CuSO4', 'copper(II) sulfate', true),
  sub('MgSO4', 'magnesium sulfate', true), sub('Na2SO4', 'sodium sulfate', true), sub('ZnSO4', 'zinc sulfate', true), sub('KClO3', 'potassium chlorate', true),
  sub('H2SO4', 'sulfuric acid'), sub('HNO3', 'nitric acid'), sub('H3PO4', 'phosphoric acid'), sub('C6H12O6', 'glucose'), sub('C2H5OH', 'ethanol'), sub('C12H22O11', 'sucrose'),
];
/** Brackets, or polyatomic ions with an element in two places. */
const MM3: Sub[] = [
  sub('Ca(OH)2', 'calcium hydroxide', true), sub('Mg(OH)2', 'magnesium hydroxide', true), sub('Ba(OH)2', 'barium hydroxide', true), sub('Al(OH)3', 'aluminium hydroxide', true),
  sub('Fe(OH)3', 'iron(III) hydroxide', true), sub('Mg(NO3)2', 'magnesium nitrate', true), sub('Ca(NO3)2', 'calcium nitrate', true), sub('Cu(NO3)2', 'copper(II) nitrate', true),
  sub('Zn(NO3)2', 'zinc nitrate', true), sub('Pb(NO3)2', 'lead(II) nitrate', true), sub('Al2(SO4)3', 'aluminium sulfate', true), sub('Fe2(SO4)3', 'iron(III) sulfate', true),
  sub('(NH4)2SO4', 'ammonium sulfate', true), sub('(NH4)2CO3', 'ammonium carbonate', true), sub('Ca3(PO4)2', 'calcium phosphate', true), sub('NH4NO3', 'ammonium nitrate', true),
  sub('NH4Cl', 'ammonium chloride', true),
];

/** Where an element's atoms come from in a formula, to count them. */
const symbolRe = (el: string) => new RegExp(`${el}(?![a-z])(\\d*)`, 'g');
/** Elements worth counting in a bracket formula: those inside a bracket, or those written in two places. */
function countable(f: string): string[] {
  const inner = [...f.matchAll(/\(([^)]+)\)/g)].flatMap((m) => [...parseFormula(m[1]).atoms.keys()]);
  if (inner.length) return [...new Set(inner)];
  const atoms = parseFormula(f).atoms;
  const twice = [...atoms.keys()].filter((el) => [...f.matchAll(symbolRe(el))].length > 1);
  return twice.length ? twice : [...atoms].filter(([, n]) => n > 1).map(([el]) => el);
}
/** How the count of one element is found: the bracket multiplies, or the parts add. */
function countNote(f: string, el: string): string {
  const total = parseFormula(f).atoms.get(el)!;
  const name = elName(el);
  for (const m of f.matchAll(/\(([^)]+)\)(\d+)/g)) {
    const inside = parseFormula(m[1]).atoms.get(el);
    if (!inside) continue;
    const k = Number(m[2]);
    const rest = total - inside * k;
    return `The ${k} after the bracket multiplies everything inside it: $${k} \\times ${inside} = ${k * inside}$ ${name} atoms${rest ? `, plus ${rest} outside the bracket, for ${total}` : ''}.`;
  }
  const counts = [...f.matchAll(symbolRe(el))].map((m) => (m[1] ? Number(m[1]) : 1));
  if (counts.length > 1) return `${cap(name)} appears in ${counts.length} places in the formula: $${counts.join(' + ')} = ${total}$ ${name} atoms.`;
  return `The ${total} after ${el} counts ${total} ${name} atoms.`;
}

function molarMass(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(d === 1 ? MM1 : d === 2 ? MM2 : MM3);
  const M = mm(x.f);
  const countStep = `One ${unitWord(x)} of ${$(x.f)} has ${atomCounts(x.f)}.`;
  if (d < 3) {
    return {
      prompt: `What is the molar mass of ${named(x)}, to the nearest tenth? ${massesText(x.f)}`,
      parts: [numPart(M, { decimals: 1, suffix: 'g/mol' })],
      calculator: true,
      hints: [
        'Add up the molar masses of all the atoms in the formula.',
        d === 1
          ? 'A small number after a symbol counts that atom: $\\ce{H2O}$ has 2 H and 1 O, and $\\ce{O2}$ has 2 O.'
          : 'Count each element first: $\\ce{H2SO4}$ has 2 H, 1 S and 4 O. Then multiply each count by that element\'s molar mass.',
      ],
      solution: [countStep, mmWorking(x.f)],
    };
  }
  const el = rng.pick(countable(x.f));
  const k = parseFormula(x.f).atoms.get(el)!;
  const brackets = x.f.includes('(');
  return {
    prompt: `${cap(x.name)} has the formula ${$(x.f)}. How many ${elName(el)} atoms are in one formula unit? Then find its molar mass, to the nearest tenth. ${massesText(x.f)}`,
    parts: [numPart(k, { label: `${cap(elName(el))} atoms:` }), numPart(M, { decimals: 1, suffix: 'g/mol', label: '$M =$' })],
    calculator: true,
    hints: [
      brackets
        ? 'A number after a bracket multiplies every atom inside the bracket: $\\ce{Ca(OH)2}$ has 2 O and 2 H.'
        : 'An element can appear in more than one place in a formula. Add the atoms from each place.',
      'Count every element, then add up the molar masses of all the atoms.',
    ],
    solution: [countNote(x.f, el), countStep, mmWorking(x.f)],
  };
}

// ---------------------------------------------------------------------------- Avogadro's number

const NA = 6.02e23;
const NA_TEXT = 'One mole of any substance holds $6.02 \\times 10^{23}$ particles (Avogadro\'s number).';
const SCI_TIP = 'Type scientific notation like `1.51e24` or `1.51*10^24`.';
/** A number in scientific notation: the mantissa to n significant figures, and the exponent. */
function sci(v: number, n = 3): { m: string; e: number } {
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = roundTo(v / 10 ** e, n - 1);
  if (Math.abs(m) >= 10) {
    m = roundTo(m / 10, n - 1);
    e += 1;
  }
  return { m: m.toFixed(n - 1), e };
}
/** LaTeX for a number in scientific notation: 1.51 \times 10^{24}. */
function sciTex(v: number, n = 3): string {
  const { m, e } = sci(v, n);
  return `${m} \\times 10^{${e}}`;
}
/** A given value in scientific notation with up to four significant figures and no trailing zeros. */
function sciGiven(v: number): { tex: string; value: number } {
  const { m, e } = sci(v, 4);
  const mant = String(Number(m));
  return { tex: `${mant} \\times 10^{${e}}`, value: Number(mant) * 10 ** e };
}
/** An answer in scientific notation to n significant figures, allowing for rounding along the way. */
function sciPart(v: number, suffix: string, label?: string, n = 3): Part {
  const { m, e } = sci(v, n);
  return {
    label,
    suffix,
    answer: { kind: 'numeric', value: v, tolerance: Math.max(0.6 * 10 ** (e - n + 1), Math.abs(v) * 0.004), allowExpression: true, scientific: true, exact: `${m}*10^${e}` },
  };
}
/** $N = 2.5 \times 6.02 \times 10^{23} = 15.05 \times 10^{23}$, then the answer in scientific notation. */
function particleSteps(n: number, word: string): string[] {
  const product = roundTo(n * 6.02, 4);
  const standard = product >= 1 && product < 10;
  return [
    `$N = n \\times 6.02 \\times 10^{23} = ${fmt(n)} \\times 6.02 \\times 10^{23} = ${fmt(product, 4)} \\times 10^{23}$`,
    `${standard ? 'To three significant figures' : 'In scientific notation, to three significant figures'}: $${sciTex(n * NA)}$ ${word}.`,
  ];
}

interface Particle {
  f: string;
  name: string;
  word: 'molecules' | 'atoms';
}
const P = (f: string, name: string, word: Particle['word'] = 'molecules'): Particle => ({ f, name, word });
const MOLECULES: Particle[] = [
  P('H2O', 'water'), P('CO2', 'carbon dioxide'), P('O2', 'oxygen'), P('N2', 'nitrogen'), P('H2', 'hydrogen'), P('CH4', 'methane'), P('NH3', 'ammonia'),
  P('Cl2', 'chlorine'), P('SO2', 'sulfur dioxide'), P('C6H12O6', 'glucose'), P('C2H5OH', 'ethanol'), P('C3H8', 'propane'),
];
const ATOMS: Particle[] = [P('Fe', 'iron', 'atoms'), P('Cu', 'copper', 'atoms'), P('Al', 'aluminium', 'atoms'), P('Mg', 'magnesium', 'atoms'), P('Zn', 'zinc', 'atoms'), P('Ag', 'silver', 'atoms'), P('He', 'helium', 'atoms'), P('C', 'carbon', 'atoms')];
const PARTICLES = [...MOLECULES, ...ATOMS];
/** Amounts that come out neatly. */
const N_NICE = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.75, 1.2, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10];

function avogadro(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const x = rng.pick(PARTICLES);
    const n = rng.pick(N_NICE);
    return {
      prompt: `How many ${x.word} are in ${q(fmt(n), 'mol')} of ${named(x)}? Give the answer in scientific notation to three significant figures. ${NA_TEXT} ${SCI_TIP}`,
      parts: [sciPart(n * NA, x.word)],
      calculator: true,
      hints: ['Number of particles = moles $\\times\\ 6.02 \\times 10^{23}$.', 'Multiply the number of moles by 6.02 first, then write the answer with one digit before the decimal point.'],
      solution: particleSteps(n, x.word),
    };
  }
  if (d === 2) {
    const x = rng.pick(PARTICLES);
    const given = rng.chance(0.5) ? sciGiven(rng.pick(N_NICE) * NA) : sciGiven(rng.float(1.1, 9.9, 2) * 10 ** rng.int(23, 24));
    const n = given.value / NA;
    return {
      prompt: `A sample of ${named(x)}, contains $${given.tex}$ ${x.word}. How many moles is that, to the nearest hundredth? ${NA_TEXT}`,
      parts: [numPart(n, { decimals: 2, suffix: 'mol' })],
      calculator: true,
      hints: ['Moles = number of particles $\\div\\ 6.02 \\times 10^{23}$.', 'Enter $6.02 \\times 10^{23}$ with the EXP or $\\times 10^x$ key of your calculator, or put the whole number in brackets when you divide by it.'],
      solution: [`$n = \\dfrac{N}{6.02 \\times 10^{23}} = \\dfrac{${given.tex}}{6.02 \\times 10^{23}} = ${fmtFixed(n, 2)}\\ \\text{mol}$`],
    };
  }
  // Atoms in moles of molecules: of one element, or all the atoms.
  const x = rng.pick(MOLECULES);
  const atoms = [...parseFormula(x.f).atoms];
  const total = atoms.reduce((s, [, k]) => s + k, 0);
  const one = atoms.length === 1 || rng.chance(0.6);
  const several = atoms.filter(([, c]) => c > 1);
  const [el, k]: [string, number] = one ? rng.pick(several.length ? several : atoms) : ['', total];
  const what = one ? `${elName(el)} atoms` : 'atoms in total';
  const short = one ? `${el} atoms` : 'atoms';
  const n = rng.pick(N_NICE);
  const nAtoms = roundTo(n * k, 4);
  const perMolecule = one ? `Each molecule of ${$(x.f)} has ${k} ${elName(el)} atom${k === 1 ? '' : 's'}` : `Each molecule of ${$(x.f)} has ${atomCounts(x.f)}: ${total} atoms`;
  return {
    prompt: `How many ${what} are in ${q(fmt(n), 'mol')} of ${named(x)}? First find the amount of ${short} in moles, then the number of ${short} in scientific notation to three significant figures. ${NA_TEXT} ${SCI_TIP}`,
    parts: [
      numPart(nAtoms, { label: `Moles of ${short}:`, suffix: 'mol', display: 'decimal' }),
      sciPart(nAtoms * NA, 'atoms', `Number of ${short}:`),
    ],
    calculator: true,
    hints: [`${perMolecule}, so each mole of ${$(x.f)} holds ${k} mol of ${one ? `${elName(el)} atoms` : 'atoms'}.`, 'Then multiply the moles of atoms by $6.02 \\times 10^{23}$.'],
    solution: [`${perMolecule}.`, `Moles of ${short}: $${k} \\times ${fmt(n)} = ${fmt(nAtoms)}\\ \\text{mol}$`, ...particleSteps(nAtoms, short)],
  };
}

// ---------------------------------------------------------------------------- mass and moles

/** Substances weighed in mass and mole questions. */
const MASS_SUBS: Sub[] = [
  sub('H2O', 'water'), sub('CO2', 'carbon dioxide'), sub('NH3', 'ammonia'), sub('CH4', 'methane'), sub('O2', 'oxygen'), sub('C6H12O6', 'glucose'), sub('C2H5OH', 'ethanol'),
  sub('H2SO4', 'sulfuric acid'), sub('NaCl', 'sodium chloride', true), sub('CaCO3', 'calcium carbonate', true), sub('NaOH', 'sodium hydroxide', true),
  sub('MgO', 'magnesium oxide', true), sub('CuSO4', 'copper(II) sulfate', true), sub('KNO3', 'potassium nitrate', true), sub('Ca(OH)2', 'calcium hydroxide', true),
  sub('Na2CO3', 'sodium carbonate', true), sub('Fe2O3', 'iron(III) oxide', true), sub('KCl', 'potassium chloride', true),
];
/** Amounts with at most one decimal place, so a mass worked out from them has at most two. */
const N_TENTHS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5, 2, 2.5, 3, 4, 5];
const MASS_HINT = 'Moles = mass $\\div$ molar mass: $n = \\dfrac{m}{M}$.';
const MOLES_HINT = 'Mass = moles $\\times$ molar mass: $m = n \\times M$.';

function massMoles(rng: Rng, d: Difficulty): GenOutput {
  if (d === 3) {
    const x = rng.pick(PARTICLES);
    const M = mm(x.f);
    const n = rng.pick(N_TENTHS);
    const m = roundTo(n * M, 2);
    // An element's molar mass is given; a compound's is worked out first.
    const element1 = x.word === 'atoms';
    return {
      prompt: `How many ${x.word} are in ${q(fmt(m, 2), 'g')} of ${named(x)}? ${element1 ? 'Find' : 'Find the molar mass to the nearest tenth, then'} the amount in moles to the nearest hundredth, then the number of ${x.word} in scientific notation to three significant figures. ${massesText(x.f)} ${NA_TEXT} ${SCI_TIP}`,
      parts: [
        ...(element1 ? [] : [numPart(M, { decimals: 1, suffix: 'g/mol', label: '$M =$' })]),
        numPart(n, { decimals: 2, suffix: 'mol', label: '$n =$' }),
        sciPart(n * NA, x.word, '$N =$'),
      ],
      calculator: true,
      hints: ['Work in steps: mass → moles → particles.', MASS_HINT, 'Then multiply the moles by $6.02 \\times 10^{23}$.'],
      solution: [...(element1 ? [] : [mmWorking(x.f)]), `$n = \\dfrac{m}{M} = \\dfrac{${fmt(m, 2)}\\ \\text{g}}{${t1(M)}\\ \\text{g/mol}} = ${fmtFixed(n, 2)}\\ \\text{mol}$`, ...particleSteps(n, x.word)],
    };
  }
  const x = rng.pick(MASS_SUBS);
  const M = mm(x.f);
  const givenM = `The molar mass of ${x.name} is ${q(t1(M), 'g/mol')}.`;
  const mPart = numPart(M, { decimals: 1, suffix: 'g/mol', label: '$M =$' });
  const label = d === 2 ? { label: '$n =$' } : {};
  if (rng.chance(0.5)) {
    // Mass to moles.
    const m = rng.chance(0.5) ? roundTo(rng.pick(N_NICE) * M, 1) : rng.float(0.1 * M, 10 * M, 1);
    const n = m / M;
    const step = `$n = \\dfrac{m}{M} = \\dfrac{${t1(m)}\\ \\text{g}}{${t1(M)}\\ \\text{g/mol}} = ${fmtFixed(n, 2)}\\ \\text{mol}$`;
    const nPart = numPart(n, { decimals: 2, suffix: 'mol', ...label });
    if (d === 1) {
      return {
        prompt: `How many moles are in ${q(t1(m), 'g')} of ${named(x)}? Give the answer to the nearest hundredth. ${givenM}`,
        parts: [nPart],
        calculator: true,
        hints: [MASS_HINT, 'Check the units: $\\text{g} \\div \\text{g/mol} = \\text{mol}$.'],
        solution: [step],
      };
    }
    return {
      prompt: `A sample of ${named(x)}, has a mass of ${q(t1(m), 'g')}. Find the molar mass of ${x.name} to the nearest tenth, then the amount in moles to the nearest hundredth. ${massesText(x.f)}`,
      parts: [mPart, nPart],
      calculator: true,
      hints: ['Add up the molar masses of all the atoms in the formula.', MASS_HINT],
      solution: [mmWorking(x.f), step],
    };
  }
  // Moles to mass.
  const n = rng.chance(0.5) ? rng.pick(N_NICE) : rng.float(0.1, 5, 2);
  const m = n * M;
  const step = `$m = n \\times M = ${fmt(n)}\\ \\text{mol} \\times ${t1(M)}\\ \\text{g/mol} = ${fmtFixed(m, 1)}\\ \\text{g}$`;
  const massPart = numPart(m, { decimals: 1, suffix: 'g', ...(d === 2 ? { label: '$m =$' } : {}) });
  if (d === 1) {
    return {
      prompt: `What is the mass of ${q(fmt(n), 'mol')} of ${named(x)}, to the nearest tenth? ${givenM}`,
      parts: [massPart],
      calculator: true,
      hints: [MOLES_HINT, 'Check the units: $\\text{mol} \\times \\text{g/mol} = \\text{g}$.'],
      solution: [step],
    };
  }
  return {
    prompt: `What is the mass of ${q(fmt(n), 'mol')} of ${named(x)}? Find the molar mass of ${x.name} to the nearest tenth, then the mass to the nearest tenth. ${massesText(x.f)}`,
    parts: [mPart, massPart],
    calculator: true,
    hints: ['Add up the molar masses of all the atoms in the formula.', MOLES_HINT],
    solution: [mmWorking(x.f), step],
  };
}

// ---------------------------------------------------------------------------- mole ratios

interface Reaction {
  r: string[];
  p: string[];
  /** Smallest whole-number coefficients, reactants first, worked out by balance(). */
  c: number[];
  story: string;
}
function rx(r: string[], p: string[], story: string): Reaction {
  const c = balance(r, p);
  if (!c) throw new Error(`Cannot balance ${r.join(' + ')} -> ${p.join(' + ')}`);
  return { r, p, c, story };
}
const REACTIONS: Reaction[] = [
  rx(['H2', 'O2'], ['H2O'], 'Hydrogen burns in oxygen to make water:'),
  rx(['N2', 'H2'], ['NH3'], 'Nitrogen and hydrogen react to make ammonia:'),
  rx(['Mg', 'O2'], ['MgO'], 'Magnesium burns in oxygen:'),
  rx(['Na', 'Cl2'], ['NaCl'], 'Sodium reacts with chlorine to make sodium chloride:'),
  rx(['Al', 'O2'], ['Al2O3'], 'Aluminium reacts with oxygen to form aluminium oxide:'),
  rx(['Fe', 'O2'], ['Fe2O3'], 'Iron reacts with oxygen to form iron(III) oxide:'),
  rx(['Cu', 'O2'], ['CuO'], 'Copper heated in air forms copper(II) oxide:'),
  rx(['Ca', 'O2'], ['CaO'], 'Calcium burns in oxygen:'),
  rx(['CH4', 'O2'], ['CO2', 'H2O'], 'Methane burns in oxygen:'),
  rx(['C3H8', 'O2'], ['CO2', 'H2O'], 'Propane burns in oxygen:'),
  rx(['C2H5OH', 'O2'], ['CO2', 'H2O'], 'Ethanol burns in oxygen:'),
  rx(['H2O2'], ['H2O', 'O2'], 'Hydrogen peroxide breaks down into water and oxygen:'),
  rx(['KClO3'], ['KCl', 'O2'], 'Potassium chlorate breaks down when it is heated:'),
  rx(['Zn', 'HCl'], ['ZnCl2', 'H2'], 'Zinc reacts with hydrochloric acid:'),
  rx(['Mg', 'HCl'], ['MgCl2', 'H2'], 'Magnesium reacts with hydrochloric acid:'),
  rx(['Al', 'HCl'], ['AlCl3', 'H2'], 'Aluminium reacts with hydrochloric acid:'),
  rx(['NaOH', 'H2SO4'], ['Na2SO4', 'H2O'], 'Sodium hydroxide neutralizes sulfuric acid:'),
  rx(['Fe2O3', 'CO'], ['Fe', 'CO2'], 'In a blast furnace, carbon monoxide turns iron(III) oxide into iron:'),
  rx(['Na', 'H2O'], ['NaOH', 'H2'], 'Sodium reacts with water:'),
  rx(['H2', 'Cl2'], ['HCl'], 'Hydrogen reacts with chlorine to make hydrogen chloride:'),
];
const species = (x: Reaction) => [...x.r, ...x.p];
const coef = (k: number) => (k === 1 ? '' : `${k}`);
const eq = (x: Reaction) => {
  const sp = species(x).map((f, i) => `${coef(x.c[i])}${f}`);
  return `$\\ce{${sp.slice(0, x.r.length).join(' + ')} -> ${sp.slice(x.r.length).join(' + ')}}$`;
};
/** How the asked species relates to the given one: "react with", "form from", ... */
function verb(x: Reaction, given: number, asked: number): string {
  const isR = (k: number) => k < x.r.length;
  return isR(asked) ? (isR(given) ? 'react with' : 'are needed to make') : isR(given) ? 'form from' : 'form along with';
}
/** Two species whose coefficients differ, the given one first. */
function pickPair(rng: Rng, x: Reaction): [number, number] {
  const idx = species(x).map((_, i) => i);
  return rng.pick(idx.flatMap((i) => idx.filter((j) => x.c[i] !== x.c[j]).map((j) => [i, j] as [number, number])));
}
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const ratioText = (x: Reaction, i: number, j: number) => {
  const sp = species(x);
  return `The coefficients give the mole ratio $\\ce{${sp[i]}} : \\ce{${sp[j]}} = ${x.c[i]} : ${x.c[j]}$.`;
};
const RATIO_HINT = '$n(\\text{wanted}) = n(\\text{given}) \\times \\dfrac{\\text{coefficient of wanted}}{\\text{coefficient of given}}$';

function moleRatio(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(REACTIONS);
  const sp = species(x);
  if (d < 3) {
    const [i, j] = pickPair(rng, x);
    const g = gcd(x.c[i], x.c[j]);
    const k = rng.int(1, 5);
    const n = d === 1 ? (k * x.c[i]) / g : rng.float(0.2, 6, 2);
    const nj = (n * x.c[j]) / x.c[i];
    const answer = d === 1 ? numPart(nj, { suffix: 'mol' }) : numPart(nj, { decimals: 2, suffix: 'mol' });
    return {
      prompt: `${x.story} ${eq(x)}. How many moles of $\\ce{${sp[j]}}$ ${verb(x, i, j)} ${q(fmt(n), 'mol')} of $\\ce{${sp[i]}}$?${d === 2 ? ` Give the answer ${roundingPhrase(2)}.` : ''}`,
      parts: [answer],
      calculator: d === 2,
      hints: ['The coefficients (the big numbers in front) give the mole ratio. No number means 1.', RATIO_HINT],
      solution: [ratioText(x, i, j), `$n(\\ce{${sp[j]}}) = ${fmt(n)} \\times \\dfrac{${x.c[j]}}{${x.c[i]}} = ${d === 1 ? fmt(nj) : fmtFixed(nj, 2)}\\ \\text{mol}$`],
    };
  }
  // Mass of a product from the mass of a reactant, in three steps.
  const i = rng.int(0, x.r.length - 1);
  const j = x.r.length + rng.int(0, x.p.length - 1);
  const [Mi, Mj] = [mm(sp[i]), mm(sp[j])];
  const k = rng.pick(N_TENTHS.slice(0, 11));
  const ni = roundTo(k * x.c[i], 4);
  const nj = roundTo(k * x.c[j], 4);
  const mi = roundTo(ni * Mi, 2);
  const mj = nj * Mj;
  return {
    prompt: `${x.story} ${eq(x)}. What mass of $\\ce{${sp[j]}}$ forms from ${q(fmt(mi, 2), 'g')} of $\\ce{${sp[i]}}$? Find the moles of $\\ce{${sp[i]}}$, then the moles of $\\ce{${sp[j]}}$, then the mass of $\\ce{${sp[j]}}$. Give the amounts ${roundingPhrase(2)} and the mass ${roundingPhrase(1)}. The molar masses are $\\ce{${sp[i]}}$ ${q(t1(Mi), 'g/mol')} and $\\ce{${sp[j]}}$ ${q(t1(Mj), 'g/mol')}.`,
    parts: [
      numPart(ni, { decimals: 2, suffix: 'mol', label: `$n(\\ce{${sp[i]}}) =$` }),
      numPart(nj, { decimals: 2, suffix: 'mol', label: `$n(\\ce{${sp[j]}}) =$` }),
      numPart(mj, { decimals: 1, suffix: 'g', label: `$m(\\ce{${sp[j]}}) =$` }),
    ],
    calculator: true,
    hints: ['Change the mass you know into moles: $n = \\dfrac{m}{M}$.', 'Use the mole ratio from the coefficients to find the moles of the product.', 'Change the moles of product back into a mass: $m = n \\times M$.'],
    solution: [
      `$n(\\ce{${sp[i]}}) = \\dfrac{m}{M} = \\dfrac{${fmt(mi, 2)}}{${t1(Mi)}} = ${fmtFixed(ni, 2)}\\ \\text{mol}$`,
      `${ratioText(x, i, j)} $n(\\ce{${sp[j]}}) = ${fmtFixed(ni, 2)} \\times \\dfrac{${x.c[j]}}{${x.c[i]}} = ${fmtFixed(nj, 2)}\\ \\text{mol}$`,
      `$m(\\ce{${sp[j]}}) = n \\times M = ${fmtFixed(nj, 2)} \\times ${t1(Mj)} = ${fmtFixed(mj, 1)}\\ \\text{g}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- the pH scale

const NATURE = ['Acidic', 'Neutral', 'Basic'];
const natureOf = (p: number) => (p < 7 ? 0 : p > 7 ? 2 : 1);
/** Typical pH values of everyday solutions, as a sample tested in a question might read. */
const EVERYDAY: Array<[string, number]> = [
  ['stomach acid', 1.5], ['lemon juice', 2.2], ['vinegar', 2.8], ['orange juice', 3.6], ['tomato juice', 4.3], ['black coffee', 5.0], ['rainwater', 5.6],
  ['milk', 6.6], ['pure water', 7.0], ['sugar solution', 7.0], ['blood', 7.4], ['seawater', 8.1], ['baking soda solution', 8.4], ['soapy water', 9.8],
  ['milk of magnesia', 10.5], ['ammonia solution', 11.6], ['bleach', 12.6], ['oven cleaner', 13.5],
];
const TENFOLD = 'On the pH scale, each change of 1 pH unit is a tenfold ($\\times 10$) change in acidity.';
const PH_HINT = 'A pH below 7 is acidic, exactly 7 is neutral, and above 7 is basic.';

function phScale(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const everyday = rng.chance(0.5);
    const [name, p] = everyday ? rng.pick(EVERYDAY) : ['', rng.chance(0.15) ? 7 : rng.float(0, 14, 1)];
    const k = natureOf(p);
    return {
      prompt: everyday ? `A sample of ${name} is tested and has a pH of ${p.toFixed(1)}. Is it acidic, neutral or basic?` : `A solution has a pH of ${p.toFixed(1)}. Is it acidic, neutral or basic?`,
      parts: [part(fixedChoice(NATURE, k))],
      hints: [PH_HINT],
      solution: [`${p.toFixed(1)} is ${k === 0 ? 'below' : k === 2 ? 'above' : 'equal to'} 7, so the ${everyday ? name : 'solution'} is ${NATURE[k].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const four = rng.sample(EVERYDAY, 18).reduce<Array<[string, number]>>((acc, s) => (acc.length < 4 && acc.every((a) => Math.abs(a[1] - s[1]) >= 0.4) ? [...acc, s] : acc), []);
    const show = (s: [string, number]) => `${cap(s[0])}, pH ${s[1].toFixed(1)}`;
    if (rng.chance(0.6)) {
      const acidFirst = rng.chance(0.6);
      const sorted = [...four].sort((a, b) => (acidFirst ? a[1] - b[1] : b[1] - a[1]));
      let shown = rng.shuffle(four);
      for (let t = 0; t < 20 && shown.every((s, i) => s === sorted[i]); t++) shown = rng.shuffle(four);
      const items: Choice[] = shown.map((s, i) => ({ id: 'abcd'[i], md: show(s) }));
      const idOf = (s: [string, number]) => items[shown.indexOf(s)].id;
      return {
        prompt: `Put these solutions in order from the **${acidFirst ? 'most acidic' : 'most basic'}** to the **${acidFirst ? 'most basic' : 'most acidic'}**.`,
        parts: [{ answer: { kind: 'order', items, correctOrder: sorted.map(idOf) } }],
        hints: ['The lower the pH, the more acidic the solution. The higher the pH, the more basic.', acidFirst ? 'Start with the lowest pH.' : 'Start with the highest pH.'],
        solution: [`${acidFirst ? 'From the lowest pH to the highest' : 'From the highest pH to the lowest'}: ${sorted.map(show).join('; ')}.`],
      };
    }
    const ask = rng.pick(['most acidic', 'most basic', 'closest to neutral'] as const);
    const dist = (s: [string, number]) => Math.abs(s[1] - 7);
    const nearest = [...four].sort((a, b) => dist(a) - dist(b));
    const unique = ask !== 'closest to neutral' || dist(nearest[0]) < dist(nearest[1]);
    const choice = !unique ? 'most acidic' : ask;
    const best = choice === 'most acidic' ? [...four].sort((a, b) => a[1] - b[1])[0] : choice === 'most basic' ? [...four].sort((a, b) => b[1] - a[1])[0] : nearest[0];
    return {
      prompt: `Which of these solutions is the ${choice}?`,
      parts: [part(mc(rng, show(best), four.filter((s) => s !== best).map(show)))],
      hints: [choice === 'closest to neutral' ? 'A neutral solution has a pH of 7. Find the pH nearest to 7, above or below it.' : choice === 'most acidic' ? 'The lower the pH, the more acidic.' : 'The higher the pH, the more basic.'],
      solution: [`${cap(best[0])} has the ${choice === 'most acidic' ? 'lowest pH' : choice === 'most basic' ? 'highest pH' : 'pH nearest to 7'}, ${best[1].toFixed(1)}, so it is the ${choice}.`],
    };
  }
  const kind = rng.pick(['compare', 'target', 'dilute'] as const);
  if (kind === 'compare') {
    const a = rng.int(1, 9);
    const b = a + rng.int(1, 3);
    const factor = 10 ** (b - a);
    return {
      prompt: `Solution A has a pH of ${a}, and solution B has a pH of ${b}. How many times more acidic is solution A than solution B? ${TENFOLD}`,
      parts: [numPart(factor, { suffix: 'times' })],
      hints: ['Find the difference in pH first.', 'Multiply by 10 once for each pH unit: a difference of 2 is $10 \\times 10 = 100$ times, not 20 times.'],
      solution: [`The pH values differ by $${b} - ${a} = ${b - a}$.`, `Solution A is $${Array(b - a).fill('10').join(' \\times ')} = ${factor}$ times more acidic, because it has the lower pH.`],
    };
  }
  if (kind === 'target') {
    const p = rng.int(4, 10);
    const steps = rng.int(1, 3);
    const more = rng.chance(0.5) || p + steps > 14;
    const ans = more ? p - steps : p + steps;
    const factor = 10 ** steps;
    return {
      prompt: `Solution X has a pH of ${p}. Solution Y is ${factor} times ${more ? 'more' : 'less'} acidic than solution X. What is the pH of solution Y? ${TENFOLD}`,
      parts: [numPart(ans, { label: 'pH =' })],
      hints: [`${more ? 'More acidic means a lower pH.' : 'Less acidic means a higher pH.'}`, `Count how many tens multiply to give ${factor}: each one is a change of 1 pH unit.`],
      solution: [steps === 1 ? 'A tenfold change is a change of 1 pH unit.' : `$${factor} = ${Array(steps).fill('10').join(' \\times ')}$, so the pH changes by ${steps}.`, `Solution Y is ${more ? 'more' : 'less'} acidic, so its pH is ${more ? 'lower' : 'higher'}: $${p} ${more ? '-' : '+'} ${steps} = ${ans}$.`],
    };
  }
  const a = rng.int(1, 4);
  const b = a + rng.int(1, 2);
  const factor = 10 ** (b - a);
  return {
    prompt: `${rng.pick(NAMES)} dilutes a sample of acid by adding water. Its pH rises from ${a} to ${b}. How many times less acidic is the solution now? ${TENFOLD}`,
    parts: [numPart(factor, { suffix: 'times' })],
    hints: ['Adding water spreads the acid out, so the solution becomes less acidic and its pH rises.', 'Multiply by 10 once for each pH unit of change.'],
    solution: [`The pH rose by $${b} - ${a} = ${b - a}$.`, `The solution is $${Array(b - a).fill('10').join(' \\times ')} = ${factor}$ times less acidic.`],
  };
}

// ---------------------------------------------------------------------------- indicators

/** Colours in an acidic, a neutral and a basic solution. */
const SIMPLE_INDICATORS = [
  { name: 'blue litmus paper', colours: ['red', 'blue', 'blue'], verb: 'after it is dipped in' },
  { name: 'red litmus paper', colours: ['red', 'red', 'blue'], verb: 'after it is dipped in' },
  { name: 'phenolphthalein', colours: ['colourless', 'colourless', 'pink'], verb: 'when a few drops are added to' },
];
const COLOURS = ['Red', 'Blue', 'Pink', 'Colourless'];
/** Solutions with their nature (0 acidic, 1 neutral, 2 basic) and a typical pH. */
const SAMPLES: Array<[string, number, number]> = [
  ['dilute hydrochloric acid', 0, 1], ['vinegar', 0, 3], ['lemon juice', 0, 2], ['dilute sulfuric acid', 0, 1], ['dilute nitric acid', 0, 1],
  ['sodium hydroxide solution', 2, 13], ['soapy water', 2, 10], ['limewater (calcium hydroxide solution)', 2, 12], ['ammonia solution', 2, 11],
  ['pure water', 1, 7], ['sugar solution', 1, 7], ['salt (sodium chloride) solution', 1, 7],
];
const LITMUS_RULE = 'Litmus is red in acids and blue in bases; in a neutral solution neither red nor blue litmus changes colour. Phenolphthalein is colourless in acidic and neutral solutions and pink in basic ones.';
/** Universal indicator colours, as the question's chart gives them. */
const UNIVERSAL = [
  { lo: 0, hi: 2, colour: 'red', desc: 'strongly acidic' },
  { lo: 3, hi: 4, colour: 'orange', desc: 'acidic' },
  { lo: 5, hi: 6, colour: 'yellow', desc: 'weakly acidic' },
  { lo: 7, hi: 7, colour: 'green', desc: 'neutral' },
  { lo: 8, hi: 10, colour: 'blue', desc: 'weakly basic' },
  { lo: 11, hi: 14, colour: 'purple', desc: 'strongly basic' },
];
const bandRange = (b: (typeof UNIVERSAL)[number]) => (b.lo === b.hi ? `${b.lo}` : `${b.lo} to ${b.hi}`);
/** "from pH 3 to 4", or "at pH 7" */
const bandWhere = (b: (typeof UNIVERSAL)[number]) => (b.lo === b.hi ? `at pH ${b.lo}` : `from pH ${b.lo} to ${b.hi}`);
const UNIVERSAL_CHART: TableFigure = { type: 'table', headers: ['pH', 'Colour of universal indicator'], rows: UNIVERSAL.map((b) => [b.lo === b.hi ? `${b.lo}` : `${b.lo}–${b.hi}`, b.colour]), horizontal: true };
/** Samples with a whole-number pH for the universal indicator chart. */
const WHOLE_PH: Array<[string, number]> = [
  ['stomach acid', 1], ['lemon juice', 2], ['vinegar', 3], ['tomato juice', 4], ['black coffee', 5], ['pure water', 7], ['baking soda solution', 8],
  ['soapy water', 9], ['milk of magnesia', 10], ['ammonia solution', 11], ['bleach', 12], ['oven cleaner', 13],
];
/** Indicators with a stated colour-change range, for deducing a pH range. */
const RANGED = [
  { name: 'methyl orange', lo: 3.1, hi: 4.4, colours: ['red', 'orange', 'yellow'] },
  { name: 'bromothymol blue', lo: 6.0, hi: 7.6, colours: ['yellow', 'green', 'blue'] },
  { name: 'phenolphthalein', lo: 8.2, hi: 10.0, colours: ['colourless', 'pale pink', 'pink'] },
];

function indicators(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.3)) {
      const [obs, k] = rng.pick([['Blue litmus paper turns red', 0], ['Red litmus paper turns blue', 2], ['A few drops of phenolphthalein turn pink', 2], ['Neither red nor blue litmus paper changes colour', 1]] as const);
      return {
        prompt: `${obs} in a solution. Is the solution acidic, neutral or basic?`,
        parts: [part(fixedChoice(NATURE, k))],
        hints: [LITMUS_RULE],
        solution: [k === 0 ? 'Litmus turns red only in an acid.' : k === 2 ? (obs.startsWith('Red') ? 'Litmus turns blue only in a base.' : 'Phenolphthalein turns pink only in a base.') : 'Litmus changes colour in acids and bases, so a solution that changes neither paper is neutral.', `The solution is ${NATURE[k].toLowerCase()}.`],
      };
    }
    const ind = rng.pick(SIMPLE_INDICATORS);
    const k = rng.int(0, 2);
    const style = rng.int(0, 2);
    const sample = rng.pick(SAMPLES.filter((s) => s[1] === k));
    const what = style === 0 ? `${withArticle(NATURE[k].toLowerCase())} solution` : style === 1 ? `a solution with a pH of ${sample[2]}` : `${sample[0]}, which is ${NATURE[k].toLowerCase()}`;
    const colour = ind.colours[k];
    const changed = ind.name.includes('litmus') && !ind.name.startsWith(colour);
    return {
      prompt: `What colour is ${ind.name} ${ind.verb} ${what}?`,
      parts: [part(fixedChoice(COLOURS, COLOURS.indexOf(cap(colour))))],
      hints: [LITMUS_RULE, ...(style === 1 ? [PH_HINT] : [])],
      solution: [
        ...(style === 1 ? [`A pH of ${sample[2]} is ${k === 0 ? 'below' : k === 2 ? 'above' : 'equal to'} 7, so the solution is ${NATURE[k].toLowerCase()}.`] : []),
        ind.name.includes('litmus') ? `${cap(ind.name)} ${changed ? 'turns' : 'stays'} ${colour} in ${withArticle(NATURE[k].toLowerCase())} solution.` : `Phenolphthalein is ${colour} in ${withArticle(NATURE[k].toLowerCase())} solution.`,
      ],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const everyday = rng.chance(0.5);
      const [name, p] = everyday ? rng.pick(WHOLE_PH) : ['', rng.int(0, 14)];
      const b = UNIVERSAL.findIndex((u) => p >= u.lo && p <= u.hi);
      return {
        prompt: `${everyday ? `A sample of ${name} is tested and has a pH of ${p}.` : `A solution has a pH of ${p}.`} What colour does universal indicator turn in it? Use the colour chart.`,
        figure: UNIVERSAL_CHART,
        parts: [part(fixedChoice(UNIVERSAL.map((u) => cap(u.colour)), b))],
        hints: ['Find the pH in the top row of the chart, and read the colour below it.'],
        solution: [`Universal indicator is ${UNIVERSAL[b].colour} ${bandWhere(UNIVERSAL[b])}, which includes pH ${p}.`],
      };
    }
    const b = rng.int(0, UNIVERSAL.length - 1);
    const sample = rng.chance(0.5) ? 'a solution' : `a sample of ${rng.pick(WHOLE_PH.filter(([, p]) => p >= UNIVERSAL[b].lo && p <= UNIVERSAL[b].hi))[0]}`;
    return {
      prompt: `Universal indicator turns ${UNIVERSAL[b].colour} in ${sample}. Use the colour chart: which describes the solution?`,
      figure: UNIVERSAL_CHART,
      parts: [part(fixedChoice(UNIVERSAL.map((u) => `pH ${bandRange(u)}: ${u.desc}`), b))],
      hints: ['Find the colour in the chart and read the pH range above it.', PH_HINT],
      solution: [`Universal indicator is ${UNIVERSAL[b].colour} ${bandWhere(UNIVERSAL[b])}, so the solution is ${UNIVERSAL[b].desc}.`],
    };
  }
  const pair = rng.pick([[0, 1], [0, 2], [1, 2]] as const);
  const [lower, upper] = [RANGED[pair[0]], RANGED[pair[1]]];
  // Consistent results: the lower indicator below, inside or above its range with the upper one below it; or the upper one inside or above.
  const states: Array<[number, number]> = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]];
  const s = rng.int(0, states.length - 1);
  const [sa, sb] = states[s];
  const ranges = [`below ${t1(lower.lo)}`, `between ${t1(lower.lo)} and ${t1(lower.hi)}`, `between ${t1(lower.hi)} and ${t1(upper.lo)}`, `between ${t1(upper.lo)} and ${t1(upper.hi)}`, `above ${t1(upper.hi)}`];
  const say = (ind: (typeof RANGED)[number], k: number) => (k === 0 ? `below ${t1(ind.lo)}` : k === 1 ? `between ${t1(ind.lo)} and ${t1(ind.hi)}` : `above ${t1(ind.hi)}`);
  const fig: TableFigure = {
    type: 'table',
    headers: ['Indicator', 'Colour at low pH', 'Changes between', 'Colour at high pH'],
    rows: [lower, upper].map((i) => [cap(i.name), i.colours[0], `pH ${t1(i.lo)} and ${t1(i.hi)} (${i.colours[1]})`, i.colours[2]]),
  };
  return {
    prompt: `A solution is tested with two indicators: ${lower.name} is ${lower.colours[sa]} in it, and ${upper.name} is ${upper.colours[sb]}. The table shows each indicator's colours. What is the pH of the solution?`,
    figure: fig,
    parts: [part(fixedChoice(ranges.map((r) => `pH ${r}`), s))],
    hints: ['Each colour tells you whether the pH is below, inside or above that indicator\'s colour-change range.', 'The pH must fit both results at once.'],
    solution: [
      `${cap(lower.name)} is ${lower.colours[sa]}, so the pH is ${say(lower, sa)}.`,
      `${cap(upper.name)} is ${upper.colours[sb]}, so the pH is ${say(upper, sb)}.`,
      `Both are true only when the pH is ${ranges[s]}.`,
    ],
  };
}

// ---------------------------------------------------------------------------- neutralization

interface Acid {
  name: string;
  f: string;
  anion: string;
  /** The element the anion is named from, for a distractor such as "sodium chlorine". */
  element: string;
}
const ACID_LIST: Acid[] = [
  { name: 'hydrochloric acid', f: 'HCl', anion: 'chloride', element: 'chlorine' },
  { name: 'sulfuric acid', f: 'H2SO4', anion: 'sulfate', element: 'sulfur' },
  { name: 'nitric acid', f: 'HNO3', anion: 'nitrate', element: 'nitrogen' },
];
interface Base {
  name: string;
  metal: string;
  kind: 'hydroxide' | 'oxide' | 'carbonate';
}
const B = (metal: string, kind: Base['kind']): Base => ({ name: `${metal} ${kind}`, metal, kind });
const HYDROXIDES = ['sodium', 'potassium', 'calcium', 'magnesium'].map((m) => B(m, 'hydroxide'));
const OXIDES = ['sodium', 'potassium', 'calcium', 'magnesium'].map((m) => B(m, 'oxide'));
const OTHER_OXIDES = ['copper(II)', 'zinc'].map((m) => B(m, 'oxide'));
const CARBONATES = ['sodium', 'potassium', 'calcium', 'magnesium', 'copper(II)', 'zinc'].map((m) => B(m, 'carbonate'));
const ALKALIS = ['sodium', 'potassium'].map((m) => B(m, 'hydroxide'));
const saltOf = (a: Acid, b: Base) => `${b.metal} ${a.anion}`;
const otherAcid = (rng: Rng, a: Acid) => rng.pick(ACID_LIST.filter((x) => x !== a));
/** "hydrochloric acid + sodium hydroxide → sodium chloride + water" */
const wordEq = (a: Acid, b: Base, baseFirst = false) => {
  const left = baseFirst ? `${b.name} + ${a.name}` : `${a.name} + ${b.name}`;
  return `${left} → ${saltOf(a, b)} + water${b.kind === 'carbonate' ? ' + carbon dioxide' : ''}`;
};
const NEUT_RULE = 'Acid + base → salt + water. A base can be a metal hydroxide or a metal oxide.';
const CARB_RULE = 'Acid + metal carbonate → salt + water + carbon dioxide.';
const SALT_RULE = 'The salt is named from the metal in the base and the acid: hydrochloric acid makes chlorides, sulfuric acid sulfates and nitric acid nitrates.';
const UI_COLOURS = '(Universal indicator is red in strongly acidic solutions, green at pH 7, and blue to purple in basic solutions.)';

function neutralization(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.25)) {
      return {
        prompt: 'An acid reacts with a base, such as a metal hydroxide. What are the products?',
        parts: [part(mc(rng, 'A salt and water', ['A salt and hydrogen', 'A salt, water and carbon dioxide', 'Water only', 'A metal and water']))],
        hints: ['This reaction is called neutralization: the acid and the base cancel each other out.'],
        solution: [NEUT_RULE],
      };
    }
    const a = rng.pick(ACID_LIST);
    const b = rng.pick([...HYDROXIDES, ...OXIDES, ...OTHER_OXIDES]);
    const salt = saltOf(a, b);
    return {
      prompt: `${cap(a.name)} reacts with ${b.name}. What are the products?`,
      parts: [part(mc(rng, `${cap(salt)} and water`, [`${cap(salt)} and hydrogen`, `${cap(salt)}, water and carbon dioxide`, `${cap(b.metal)} ${otherAcid(rng, a).anion} and water`]))],
      hints: [NEUT_RULE, SALT_RULE],
      solution: [`${cap(b.name)} is a base, so the products are a salt and water.`, `The salt is ${salt}: ${wordEq(a, b)}.`],
    };
  }
  if (d === 2) {
    const a = rng.pick(ACID_LIST);
    const carbonate = rng.chance(0.5);
    const b = rng.pick(carbonate ? CARBONATES : [...HYDROXIDES, ...OXIDES, ...OTHER_OXIDES]);
    const salt = saltOf(a, b);
    const wrong = `${b.metal} ${otherAcid(rng, a).anion}`;
    return {
      prompt: `${cap(b.name)} reacts with ${a.name}. Select every product.`,
      parts: [part(multi(rng, [
        { md: cap(salt), correct: true },
        { md: 'Water', correct: true },
        { md: 'Carbon dioxide', correct: carbonate },
        { md: 'Hydrogen', correct: false },
        { md: cap(wrong), correct: false },
      ]))],
      hints: [CARB_RULE, `${NEUT_RULE} No gas forms.`],
      solution: [`${cap(b.name)} is a ${carbonate ? 'metal carbonate' : `metal ${b.kind}`}, so the products are ${carbonate ? 'a salt, water and carbon dioxide' : 'a salt and water'}.`, cap(wordEq(a, b, true))],
    };
  }
  return rng.pick(SCENARIOS)(rng);
}

/** Reasoning about neutralization in the lab and in everyday life, described in words. */
const SCENARIOS: Array<(rng: Rng) => GenOutput> = [
  (rng) => {
    const a = rng.pick(ACID_LIST);
    // Calcium carbonate soon stops fizzing in sulfuric acid: the calcium sulfate formed coats it.
    const b = rng.pick(CARBONATES.filter((c) => !(c.metal === 'calcium' && a.anion === 'sulfate')));
    const who = rng.pick(NAMES);
    return {
      prompt: `${who} adds ${b.name} to dilute ${a.name} in a test tube, and the mixture fizzes. Which gas is given off, and how can ${who} identify it?`,
      parts: [part(mc(rng, 'Carbon dioxide: bubbled through limewater, it turns the limewater cloudy.', [
        'Hydrogen: a lit splint held at the mouth of the tube goes out with a squeaky pop.',
        'Oxygen: it relights a glowing splint.',
        'Carbon dioxide: it relights a glowing splint.',
      ]))],
      hints: [CARB_RULE, 'The test for carbon dioxide uses limewater.'],
      solution: [cap(wordEq(a, b, true)), 'The gas is carbon dioxide. It turns limewater (calcium hydroxide solution) cloudy, because solid calcium carbonate forms.'],
    };
  },
  (rng) => {
    const a = rng.pick(ACID_LIST);
    const b = rng.pick(ALKALIS);
    return {
      prompt: `${rng.pick(NAMES)} puts dilute ${a.name} and a few drops of universal indicator in a flask, then adds ${b.name} solution a little at a time, swirling the flask, until the base is in excess. How do the pH and the colour change? ${UI_COLOURS}`,
      parts: [part(mc(rng, 'The pH rises: the colour changes from red to green at pH 7, then to blue or purple once the base is in excess.', [
        'The pH falls: the colour changes from purple to green, then to red.',
        'The pH rises to 7 and stays there however much base is added, so the colour stays green.',
        'The pH stays the same, because the salt that forms is neutral.',
      ]))],
      hints: ['Adding a base uses up the acid, so the solution becomes less acidic and its pH rises.', 'Once all the acid has reacted, extra base makes the solution basic.'],
      solution: [cap(wordEq(a, b)), 'As the acid is used up, the pH rises towards 7 and the indicator turns green. Extra base then makes the solution basic, so the pH goes above 7 and the indicator turns blue or purple.'],
    };
  },
  (rng) => {
    const a = rng.pick(ACID_LIST);
    return {
      prompt: `${rng.pick(NAMES)} knocks over a beaker and spills a small amount of dilute ${a.name} on the bench. After telling the teacher, which is the safest way to deal with the spill?`,
      parts: [part(mc(rng, 'Sprinkle a weak base, such as sodium hydrogen carbonate powder, on the spill until the fizzing stops, then wipe it up with plenty of water.', [
        'Pour concentrated sodium hydroxide solution on it to neutralize it as fast as possible.',
        'Wipe it up quickly with bare hands and a dry paper towel.',
        'Leave it on the bench until it evaporates.',
      ]))],
      hints: ['Neutralize an acid with a base that is not itself dangerous.', 'A strong, concentrated base is corrosive too, and its reaction with acid gives out heat.'],
      solution: ['A weak base such as sodium hydrogen carbonate neutralizes the acid safely. When the fizzing (carbon dioxide) stops, the acid has been used up, and the salt solution left can be wiped up with water.', 'Concentrated sodium hydroxide is corrosive itself, and the acid can burn bare skin.'],
    };
  },
  (rng) => {
    const acid = rng.chance(0.5);
    const what = acid ? `dilute ${rng.pick(ACID_LIST).name}` : `dilute ${rng.pick(ALKALIS).name} solution`;
    return {
      prompt: `During an experiment, a drop of ${what} splashes onto ${rng.pick(NAMES)}'s hand. What should be done first?`,
      parts: [part(mc(rng, 'Rinse the skin under plenty of cold running water, and tell the teacher.', [
        `Neutralize it by rubbing ${acid ? 'sodium hydroxide solution' : 'hydrochloric acid'} onto the skin.`,
        'Wipe it off with a dry cloth and carry on with the experiment.',
        'Cover it with a bandage straight away.',
      ]))],
      hints: ['Water dilutes the chemical and washes it away quickly.', `Adding ${acid ? 'a base' : 'an acid'} to skin is dangerous: it is a second harmful chemical, and neutralization gives out heat.`],
      solution: ['Rinse with plenty of cold running water to dilute and wash away the chemical, and tell the teacher.', `Never try to neutralize ${acid ? 'an acid' : 'a base'} on skin with ${acid ? 'a base' : 'an acid'}.`],
    };
  },
  (rng) => {
    const hcl = ACID_LIST[0];
    const b = rng.pick([B('magnesium', 'hydroxide'), B('calcium', 'carbonate'), B('magnesium', 'carbonate'), B('aluminium', 'hydroxide')]);
    const correct = cap(wordEq(hcl, b, true));
    return {
      prompt: `Indigestion can be caused by too much hydrochloric acid in the stomach. An antacid tablet contains ${b.name}. Which word equation shows the antacid neutralizing the acid?`,
      parts: [part(mc(rng, correct, [
        `${cap(b.name)} + hydrochloric acid → ${saltOf(hcl, b)} + water${b.kind === 'carbonate' ? '' : ' + carbon dioxide'}`,
        `${cap(b.name)} + hydrochloric acid → ${saltOf(hcl, b)} + hydrogen`,
        `${cap(b.name)} + hydrochloric acid → ${b.metal} sulfate + water${b.kind === 'carbonate' ? ' + carbon dioxide' : ''}`,
      ]))],
      hints: [b.kind === 'carbonate' ? CARB_RULE : NEUT_RULE, 'Hydrochloric acid makes chloride salts.'],
      solution: [`${cap(b.name)} is a ${b.kind === 'carbonate' ? 'metal carbonate' : 'base'}, and hydrochloric acid makes chlorides.`, correct],
    };
  },
  (rng) => {
    const a = rng.pick(ACID_LIST);
    const b = rng.pick(ALKALIS);
    return {
      prompt: `${rng.pick(NAMES)} wants to make a neutral solution of ${saltOf(a, b)} from dilute ${a.name} and ${b.name} solution. Which method works best?`,
      parts: [part(mc(rng, 'Add the alkali to the acid a little at a time, stirring, and test with universal indicator until it just turns green.', [
        'Add the alkali until bubbles stop forming.',
        'Pour in a large amount of alkali at once, so that all the acid reacts.',
        'Heat the acid until the indicator turns green.',
      ]))],
      hints: ['A neutral solution has a pH of 7, where universal indicator is green.', `${cap(b.name)} and ${a.name} make no gas, so there are no bubbles to watch.`],
      solution: [cap(wordEq(a, b)), 'Adding the alkali a little at a time and testing with universal indicator shows the moment the pH reaches 7 (green). Adding too much at once leaves the solution basic.'],
    };
  },
];

// ---------------------------------------------------------------------------- naming salts

/** The spellings a name can be typed in: sulphate as well as sulfate, aluminum as well as aluminium. */
function variants(name: string): string[] {
  const out = new Set([name]);
  for (const n of [...out]) out.add(n.replace(/sulf/g, 'sulph'));
  for (const n of [...out]) out.add(n.replace(/aluminium/g, 'aluminum'));
  return [...out];
}
const SALT_BASES = [...HYDROXIDES, ...OXIDES];
const ION_TEXT = `Ions: ${list(['sodium Na^+', 'potassium K^+', 'calcium Ca^2+', 'magnesium Mg^2+', 'chloride Cl^-', 'nitrate NO3^-', 'sulfate SO4^2-'].map((s) => {
  const [n, f] = s.split(' ');
  return `${n} $\\ce{${f}}$`;
}))}.`;
const cation = (name: string) => CATIONS.find((i) => i.name === name)!;
const anion = (name: string) => ANIONS.find((i) => i.name === name)!;

function saltName(rng: Rng, d: Difficulty): GenOutput {
  const a = rng.pick(ACID_LIST);
  const b = rng.pick(SALT_BASES);
  const salt = saltOf(a, b);
  if (d === 1) {
    const others = ACID_LIST.filter((x) => x !== a).map((x) => `${b.metal} ${x.anion}`);
    return {
      prompt: `Which salt forms when ${a.name} reacts with ${b.name}?`,
      parts: [part(mc(rng, cap(salt), [...others.map(cap), cap(rng.chance(0.5) ? `${b.metal} ${a.element}` : b.name)]))],
      hints: ['The first word of the salt\'s name is the metal from the base.', 'The second word comes from the acid: hydrochloric acid → chloride, sulfuric acid → sulfate, nitric acid → nitrate.'],
      solution: [`The metal comes from ${b.name}: ${b.metal}. ${cap(a.name)} makes ${a.anion}s.`, `The salt is ${salt}: ${wordEq(a, b)}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.6)) {
      return {
        prompt: `Write the word equation for the reaction of ${a.name} with ${b.name} by naming the two products: ${a.name} + ${b.name} → salt + other product.`,
        parts: [
          part({ kind: 'text', accepted: variants(salt) }, { label: 'Salt:', placeholder: 'Name' }),
          part({ kind: 'text', accepted: ['water', 'H2O'] }, { label: 'Other product:', placeholder: 'Name' }),
        ],
        hints: [NEUT_RULE, 'Name the salt: the metal from the base, then chloride, sulfate or nitrate from the acid.'],
        solution: [`The salt is ${salt}, and the other product is water.`, cap(wordEq(a, b))],
      };
    }
    const h = HYDROXIDES.find((x) => x.metal === b.metal)!;
    return {
      prompt: `${cap(salt)} and water form when an acid reacts with a metal hydroxide. Name the acid and the hydroxide to complete the word equation: acid + hydroxide → ${salt} + water.`,
      parts: [
        part({ kind: 'text', accepted: variants(a.name) }, { label: 'Acid:', placeholder: 'Name' }),
        part({ kind: 'text', accepted: variants(h.name) }, { label: 'Hydroxide:', placeholder: 'Name' }),
      ],
      hints: ['The metal in the salt comes from the hydroxide.', 'Chlorides come from hydrochloric acid, sulfates from sulfuric acid and nitrates from nitric acid.'],
      solution: [`${cap(b.metal)} comes from ${h.name}, and ${a.anion} comes from ${a.name}.`, cap(wordEq(a, h))],
    };
  }
  const c = cation(b.metal);
  const an = anion(a.anion);
  const formula = ionicFormula(c, an);
  const total = Math.abs(c.charge * -an.charge) / gcd(c.charge, -an.charge);
  const nc = total / c.charge;
  const na = total / -an.charge;
  const ions = (k: number, f: string, sign: string) => `${k === 1 ? 'one' : k === 2 ? 'two' : `${k}`} $\\ce{${f}}$ ion${k === 1 ? '' : 's'} (${total}${sign})`;
  return {
    prompt: `${cap(b.name)} reacts with ${a.name}. Name the salt that forms, and write its formula. ${ION_TEXT}`,
    parts: [
      part({ kind: 'text', accepted: variants(salt) }, { label: 'Name:', placeholder: 'Name' }),
      part({ kind: 'formula', expected: formula }, { label: 'Formula:', placeholder: 'Formula' }),
    ],
    hints: ['The salt is made of the metal ion from the base and the negative ion from the acid.', 'Take just enough of each ion for the charges to add up to zero. If you need more than one polyatomic ion, put it in brackets.'],
    solution: [
      `The salt is ${salt}, made of $\\ce{${ionFormula(c)}}$ and $\\ce{${ionFormula(an)}}$ ions.`,
      `${cap(ions(nc, ionFormula(c), '+'))} balance${nc === 1 ? 's' : ''} ${ions(na, ionFormula(an), '−')}, so the formula is ${$(formula)}.`,
    ],
  };
}

// ----------------------------------------------------------------------------

export const MOLE_SKILLS: SkillDef[] = [
  skill({ id: 'c10-molar-mass', name: 'Molar mass', description: 'Find the molar mass of an element or compound from the molar masses of its atoms.', outcomes: ['10-E1'], lessonId: L(1), calculator: true, gen: molarMass }),
  skill({ id: 'c10-avogadro', name: 'Avogadro\'s number', description: 'Convert between moles and numbers of particles, and count the atoms in moles of molecules.', outcomes: ['10-E1'], lessonId: L(1), calculator: true, gen: avogadro }),
  skill({ id: 'c10-mass-moles', name: 'Mass and moles', description: 'Convert between mass and moles with n = m/M, and go on from mass to the number of particles.', outcomes: ['10-E1'], lessonId: L(2), calculator: true, gen: massMoles }),
  skill({ id: 'c10-mole-ratio', name: 'Mole ratios', description: 'Use a balanced equation\'s mole ratio to find the moles of another substance, or the mass of a product.', outcomes: ['10-E1'], lessonId: L(2), calculator: true, gen: moleRatio }),
  skill({ id: 'c10-ph-scale', name: 'The pH scale', description: 'Classify solutions as acidic, neutral or basic from their pH, order them by acidity, and use the tenfold steps of the scale.', outcomes: ['10-E2'], lessonId: L(3), gen: phScale }),
  skill({ id: 'c10-indicators', name: 'Indicators', description: 'Predict the colours of litmus, universal indicator and phenolphthalein, and find a pH range from two indicators.', outcomes: ['10-E2'], lessonId: L(3), format: 'mc', gen: indicators }),
  skill({ id: 'c10-neutralization', name: 'Neutralization', description: 'Identify the products when an acid reacts with a base or a metal carbonate, and neutralize safely.', outcomes: ['10-E2'], lessonId: L(4), format: 'mc', gen: neutralization }),
  skill({ id: 'c10-salt-name', name: 'Naming salts', description: 'Name the salt an acid and a base make, write the word equation, and write the salt\'s formula.', outcomes: ['10-E2'], lessonId: L(4), gen: saltName }),
];
