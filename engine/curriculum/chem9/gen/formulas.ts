/**
 * Grade 9 Chemistry, Unit 2: Formulas and Names (9-B1, 9-B2). Ionic and covalent bonding, writing
 * the formulas of ionic compounds (with polyatomic ions), naming ionic and covalent compounds, and
 * relative formula mass.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, either, fromBank, type Q, type Select } from '../../chemjr/bank.ts';
import { ce, parseFormula } from '../../../chem/formula.ts';
import { element } from '../../../chem/elements.ts';
import { ANIONS, CATIONS, ionicFormula, molecularNames, type Ion } from '../../../chem/ions.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c9-2-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const pickIons = (list: Ion[], names: string[]) => names.map((n) => list.find((i) => i.name === n)!);
const METALS = pickIons(CATIONS, ['lithium', 'sodium', 'potassium', 'magnesium', 'calcium', 'aluminium', 'zinc', 'silver', 'barium']);
const SIMPLE_ANIONS = pickIons(ANIONS, ['fluoride', 'chloride', 'bromide', 'iodide', 'oxide', 'sulfide', 'nitride']);
const POLY_ANIONS = pickIons(ANIONS, ['hydroxide', 'nitrate', 'sulfate', 'carbonate', 'phosphate']);
const AMMONIUM = CATIONS.find((i) => i.name === 'ammonium')!;
const ionText = (i: Ion) => `$\\ce{${i.formula}^{${Math.abs(i.charge) === 1 ? '' : Math.abs(i.charge)}${i.charge > 0 ? '+' : '-'}}}$`;

// ---------------------------------------------------------------------------- 2.1 bond type

const BOND_CHOICES = ['Ionic', 'Covalent'];
const COMPOUNDS: Array<{ f: string; name: string; ionic: boolean }> = [
  { f: 'NaCl', name: 'sodium chloride', ionic: true },
  { f: 'MgO', name: 'magnesium oxide', ionic: true },
  { f: 'CaCl2', name: 'calcium chloride', ionic: true },
  { f: 'KBr', name: 'potassium bromide', ionic: true },
  { f: 'Al2O3', name: 'aluminium oxide', ionic: true },
  { f: 'LiF', name: 'lithium fluoride', ionic: true },
  { f: 'H2O', name: 'water', ionic: false },
  { f: 'CO2', name: 'carbon dioxide', ionic: false },
  { f: 'CH4', name: 'methane', ionic: false },
  { f: 'NH3', name: 'ammonia', ionic: false },
  { f: 'HCl', name: 'hydrogen chloride', ionic: false },
  { f: 'SO2', name: 'sulfur dioxide', ionic: false },
  { f: 'Cl2', name: 'chlorine gas', ionic: false },
];

function bondFromName(rng: Rng, showFormula: boolean): GenOutput {
  const x = rng.pick(COMPOUNDS);
  const answer = x.ionic ? 'Ionic' : 'Covalent';
  return {
    prompt: `Is the bonding in ${x.name}${showFormula ? `, ${$(x.f)},` : ''} ionic or covalent?`,
    parts: [part(fixedChoice(BOND_CHOICES, BOND_CHOICES.indexOf(answer)))],
    hints: ['A metal joined to a non-metal: ionic. Non-metals only: covalent.'],
    solution: [x.ionic ? `${cap(x.name)} contains a metal and a non-metal, so electrons are transferred: ionic.` : `${cap(x.name)} contains only non-metals, which share electrons: covalent.`, `Answer: ${answer}`],
  };
}

const BOND_EASY: Q[] = [
  { q: 'In ionic bonding, what happens to electrons?', a: 'They are transferred from a metal atom to a non-metal atom', w: ['They are shared between two non-metal atoms', 'They are destroyed', 'They move into the nucleus'], why: 'The metal loses electrons and the non-metal gains them, making oppositely charged ions that attract.' },
  { q: 'In covalent bonding, what happens to electrons?', a: 'Pairs of electrons are shared between non-metal atoms', w: ['They are transferred from a metal to a non-metal', 'They are lost to the air', 'They turn into protons'], why: 'A covalent bond is a shared pair of electrons between two non-metal atoms.' },
];

const BOND_HARD: Select[] = [
  { q: 'Which of these compounds have ionic bonding?', opts: [['Sodium chloride', true], ['Magnesium oxide', true], ['Calcium fluoride', true], ['Water', false], ['Methane', false], ['Carbon dioxide', false]], why: 'Ionic compounds contain a metal and a non-metal. Water, methane and carbon dioxide contain only non-metals.' },
];

// ---------------------------------------------------------------------------- 2.1 properties

const PROPS_EASY: Q[] = [
  { q: 'Ionic compounds such as salt usually have…', a: 'high melting points', w: ['low melting points', 'no melting point', 'melting points below room temperature'], why: 'Strong attractions between ions in a giant lattice take a lot of energy to break.' },
  { q: 'Small covalent molecules such as water and carbon dioxide usually have…', a: 'low melting and boiling points', w: ['very high melting points', 'no boiling point', 'the same melting point as salt'], why: 'The forces between small molecules are weak, so little energy separates them.' },
  { q: 'At room temperature, ionic compounds are usually…', a: 'solids', w: ['gases', 'liquids', 'plasmas'], why: 'The ions are held tightly in a lattice, so ionic compounds are crystalline solids.' },
];

const PROPS_MEDIUM: Q[] = [
  { q: 'When does an ionic compound conduct electricity?', a: 'When it is melted or dissolved in water', w: ['When it is a solid', 'Never', 'Only when it is cold'], why: 'The ions must be free to move. In a solid they are held in place.' },
  { q: 'Why does solid salt not conduct electricity?', a: 'Its ions are fixed in place and cannot move', w: ['It has no ions', 'Its electrons are too heavy', 'Salt is a metal'], why: 'Charged particles must move to carry a current. In solid salt the ions are locked in the lattice.' },
  { q: 'A substance melts at −23 °C and does not conduct when melted. What kind of bonding does it most likely have?', a: 'Covalent (small molecules)', w: ['Ionic', 'Metallic', 'It has no bonds'], why: 'A low melting point and no conduction point to small covalent molecules.' },
];

const PROPS_HARD: Select[] = [
  { q: 'A white solid melts at 801 °C. Which statements about it are likely to be true?', opts: [['It is an ionic compound.', true], ['It conducts electricity when molten.', true], ['It is made of a giant lattice of ions.', true], ['It is made of small covalent molecules.', false], ['It conducts electricity as a solid.', false]], why: 'A high melting point points to an ionic lattice, which conducts only when its ions can move.' },
];

// ---------------------------------------------------------------------------- 2.2 ionic formulas

/** Plausible wrong formulas: swapped counts, charges ignored, a polyatomic ion without brackets. */
function wrongFormulas(cation: Ion, anion: Ion, right: string): string[] {
  const c = cation.charge;
  const a = -anion.charge;
  const ion = (i: Ion, k: number) => (k === 1 ? i.formula : i.poly ? `(${i.formula})${k}` : `${i.formula}${k}`);
  const out = new Set<string>([
    ion(cation, a === c ? 2 : 1) + ion(anion, 1),
    cation.formula + anion.formula,
    ion(cation, c) + ion(anion, a),
    ion(cation, 1) + ion(anion, c === 1 ? 2 : c),
    ion(cation, a) + ion(anion, c === a ? 2 : c),
    ion(cation, 2) + ion(anion, 2),
  ]);
  out.delete(right);
  return [...out].filter((f) => f !== right);
}

function ionicFormulaQ(rng: Rng, anions: Ion[], cations: Ion[]): GenOutput {
  const cation = rng.pick(cations);
  const anion = rng.pick(anions);
  const right = ionicFormula(cation, anion);
  const name = `${cation.name} ${anion.name}`;
  return {
    prompt: `${cap(cation.name)} forms ${ionText(cation)} ions, and ${anion.name} ions are ${ionText(anion)}. What is the formula of ${name}?`,
    parts: [part(mc(rng, $(right), rng.sample(wrongFormulas(cation, anion, right), 3).map($)))],
    hints: ['The charges must cancel: total positive = total negative.', anion.poly || cation.poly ? 'Put brackets round a polyatomic ion when you need more than one.' : 'Use the fewest ions that make the charges cancel.'],
    solution: [`${cation.charge === -anion.charge ? 'The charges are equal and opposite, so one of each' : `Lowest common multiple of ${cation.charge} and ${-anion.charge}`}: ${$(right)}.`],
  };
}

const POLY_EASY: Q[] = [
  { q: 'What is a polyatomic ion?', a: 'A charged group of atoms joined together', w: ['An ion with many charges', 'A single atom with a large charge', 'A compound with no charge'], why: 'Ions such as sulfate, SO₄²⁻, are groups of atoms that carry a charge together.' },
  { q: 'What is the formula of the hydroxide ion?', a: '$\\ce{OH-}$', w: ['$\\ce{H2O}$', '$\\ce{O^2-}$', '$\\ce{H+}$'], why: 'Hydroxide is one oxygen and one hydrogen with a 1− charge.' },
  { q: 'What is the formula of the sulfate ion?', a: '$\\ce{SO4^2-}$', w: ['$\\ce{S^2-}$', '$\\ce{SO3^2-}$', '$\\ce{SO4-}$'], why: 'Sulfate is one sulfur and four oxygens, with a 2− charge.' },
  { q: 'What is the formula of the nitrate ion?', a: '$\\ce{NO3-}$', w: ['$\\ce{N^3-}$', '$\\ce{NO2-}$', '$\\ce{NH4+}$'], why: 'Nitrate is one nitrogen and three oxygens, with a 1− charge.' },
  { q: 'What is the formula of the carbonate ion?', a: '$\\ce{CO3^2-}$', w: ['$\\ce{CO2}$', '$\\ce{C^4-}$', '$\\ce{CO3-}$'], why: 'Carbonate is one carbon and three oxygens, with a 2− charge.' },
];

// ---------------------------------------------------------------------------- 2.3 naming

function nameIonic(rng: Rng, anions: Ion[], cations: Ion[]): GenOutput {
  const cation = rng.pick(cations);
  const anion = rng.pick(anions);
  const f = ionicFormula(cation, anion);
  const right = `${cation.name} ${anion.name}`;
  const el = anion.poly ? anion.name : anion.name.replace(/ide$/, '');
  const wrong = new Set<string>([
    `${anion.name} ${cation.name}`,
    anion.poly ? `${cation.name} ${anion.name === 'sulfate' ? 'sulfide' : anion.name === 'nitrate' ? 'nitride' : anion.name === 'carbonate' ? 'carbide' : anion.name === 'phosphate' ? 'phosphide' : 'oxide'}` : `${cation.name} ${el.replace(/(ox|sulf|nitr|fluor|chlor|brom|iod)$/, (m) => ({ ox: 'oxygen', sulf: 'sulfur', nitr: 'nitrogen', fluor: 'fluorine', chlor: 'chlorine', brom: 'bromine', iod: 'iodine' })[m]!)}`,
    `${cation.name} ${anion.poly ? anion.name.replace(/ate$/, 'ite') : anion.name.replace(/ide$/, 'ate')}`,
    `di${cation.name} ${anion.name}`,
  ]);
  wrong.delete(right);
  return {
    prompt: `What is the name of the compound ${$(f)}?`,
    parts: [part(mc(rng, cap(right), [...wrong].slice(0, 3).map(cap)))],
    hints: ['The metal (positive ion) comes first, unchanged.', anion.poly ? 'A polyatomic ion keeps its own name, such as sulfate or nitrate.' : 'A single non-metal ion ends in -ide.'],
    solution: [`${cation.formula} is ${cation.name} and ${anion.formula} is ${anion.name}: ${right}.`],
  };
}

const COVALENT: Array<[string, number, string, number]> = [
  ['C', 1, 'O', 1], ['C', 1, 'O', 2], ['S', 1, 'O', 2], ['S', 1, 'O', 3], ['N', 1, 'O', 2], ['N', 2, 'O', 1],
  ['N', 2, 'O', 4], ['P', 1, 'Cl', 3], ['P', 1, 'Cl', 5], ['C', 1, 'Cl', 4], ['Si', 1, 'O', 2], ['N', 1, 'Cl', 3],
];

function nameCovalent(rng: Rng, fromName: boolean): GenOutput {
  const [a, m, b, n] = rng.pick(COVALENT);
  const f = `${a}${m === 1 ? '' : m}${b}${n === 1 ? '' : n}`;
  const right = molecularNames(a, m, b, n).name;
  const alt = (mm: number, nn: number) => molecularNames(a, mm, b, nn).name;
  if (fromName) {
    const wrongF = new Set([`${a}${n === 1 ? '' : n}${b}${m === 1 ? '' : m}`, `${a}${b}${n + 1}`, `${a}${m + 1}${b}${n === 1 ? '' : n}`, `${a}${b}`]);
    wrongF.delete(f);
    return {
      prompt: `What is the formula of ${right}?`,
      parts: [part(mc(rng, $(f), [...wrongF].slice(0, 3).map($)))],
      hints: ['Each prefix gives the number of atoms: mono 1, di 2, tri 3, tetra 4, penta 5.', 'No prefix on the first element means one atom.'],
      solution: [`${right}: ${m} ${a}, ${n} ${b}, so ${$(f)}.`],
    };
  }
  const wrong = new Set([alt(n, m), alt(m, n + 1), alt(m, Math.max(1, n - 1)), `${right.split(' ')[0]} ${b === 'O' ? 'oxygen' : 'chlorine'}`]);
  wrong.delete(right);
  return {
    prompt: `What is the name of the covalent compound ${$(f)}?`,
    parts: [part(mc(rng, cap(right), [...wrong].slice(0, 3).map(cap)))],
    hints: ['Use prefixes for the number of atoms: mono 1, di 2, tri 3, tetra 4, penta 5.', 'The second element ends in -ide; the first never takes "mono".'],
    solution: [`${m} ${a} and ${n} ${b}: ${right}.`],
  };
}

const COVALENT_EASY: Q[] = [
  { q: 'Which prefix means "two" in the name of a covalent compound?', a: 'di', w: ['mono', 'tri', 'tetra'], why: 'mono 1, di 2, tri 3, tetra 4, penta 5.' },
  { q: 'Which prefix means "three"?', a: 'tri', w: ['di', 'tetra', 'penta'], why: 'mono 1, di 2, tri 3, tetra 4, penta 5.' },
  { q: 'Which prefix means "four"?', a: 'tetra', w: ['tri', 'penta', 'di'], why: 'mono 1, di 2, tri 3, tetra 4, penta 5.' },
];

// ---------------------------------------------------------------------------- 2.4 formula mass

/** Relative atomic masses rounded as a junior data sheet gives them (Cl to one decimal place). */
const AR: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Zn: 65 };
const MASS_FORMULAS: Array<{ f: string; name: string; level: 1 | 2 | 3 }> = [
  { f: 'H2O', name: 'water', level: 1 }, { f: 'CO2', name: 'carbon dioxide', level: 1 }, { f: 'NaCl', name: 'sodium chloride', level: 1 },
  { f: 'MgO', name: 'magnesium oxide', level: 1 }, { f: 'CH4', name: 'methane', level: 1 }, { f: 'NH3', name: 'ammonia', level: 1 },
  { f: 'H2SO4', name: 'sulfuric acid', level: 2 }, { f: 'CaCO3', name: 'calcium carbonate', level: 2 }, { f: 'NaOH', name: 'sodium hydroxide', level: 2 },
  { f: 'Al2O3', name: 'aluminium oxide', level: 2 }, { f: 'CuSO4', name: 'copper sulfate', level: 2 }, { f: 'HNO3', name: 'nitric acid', level: 2 },
  { f: 'Ca(OH)2', name: 'calcium hydroxide', level: 3 }, { f: 'Mg(NO3)2', name: 'magnesium nitrate', level: 3 }, { f: '(NH4)2SO4', name: 'ammonium sulfate', level: 3 },
  { f: 'Fe2O3', name: 'iron oxide', level: 3 }, { f: 'C6H12O6', name: 'glucose', level: 3 }, { f: 'Al2(SO4)3', name: 'aluminium sulfate', level: 3 },
];

const round1 = (x: number) => Math.round(x * 10) / 10;
const arList = (atoms: Map<string, number>) => [...atoms.keys()].map((el) => `${el} = ${AR[el]}`).join(', ');

function formulaMass(rng: Rng, level: 1 | 2 | 3): GenOutput {
  const x = rng.pick(MASS_FORMULAS.filter((m) => m.level === level));
  const atoms = parseFormula(x.f).atoms;
  const mr = round1([...atoms].reduce((s, [el, n]) => s + AR[el] * n, 0));
  return {
    prompt: `Find the relative formula mass of ${x.name}, ${$(x.f)}. Relative atomic masses: ${arList(atoms)}.`,
    parts: [numPart(mr, { decimals: 1, tolerance: 0.051 })],
    hints: ['Multiply each relative atomic mass by the number of atoms, then add.', ...(level === 3 ? ['A number after a bracket multiplies everything inside it.'] : [])],
    solution: [`${[...atoms].map(([el, n]) => (n === 1 ? `${AR[el]}` : `(${n} × ${AR[el]})`)).join(' + ')} = ${mr}`],
  };
}

function massPercent(rng: Rng): GenOutput {
  const x = rng.pick(MASS_FORMULAS.filter((m) => m.level <= 2));
  const atoms = parseFormula(x.f).atoms;
  const el = rng.pick([...atoms.keys()]);
  const mr = [...atoms].reduce((s, [e, n]) => s + AR[e] * n, 0);
  const part_ = AR[el] * atoms.get(el)!;
  const pct = round1((part_ / mr) * 100);
  return {
    prompt: `What percentage of the mass of ${x.name}, ${$(x.f)}, is ${element(el)!.name}? Relative atomic masses: ${arList(atoms)}. Give your answer to 1 decimal place.`,
    parts: [numPart(pct, { decimals: 1, tolerance: 0.051, suffix: '%' })],
    hints: ['Find the relative formula mass first.', 'Percentage = (mass of that element in the formula ÷ formula mass) × 100.'],
    solution: [`Formula mass = ${round1(mr)}. ${el}: ${atoms.get(el)} × ${AR[el]} = ${round1(part_)}.`, `$\\dfrac{${round1(part_)}}{${round1(mr)}} \\times 100 = ${pct}\\%$`],
  };
}

const MASS_EASY: Q[] = [
  { q: 'How do you find the relative formula mass of a compound?', a: 'Add the relative atomic masses of all the atoms in its formula', w: ['Add the atomic numbers of the elements', 'Count the atoms in the formula', 'Multiply the number of elements by 10'], why: 'Relative formula mass is the sum of the relative atomic masses of every atom in the formula.' },
  { q: 'How do you find the percentage by mass of an element in a compound?', a: 'Divide the mass of that element in the formula by the formula mass, then multiply by 100', w: ['Divide the number of its atoms by the total number of atoms', 'Divide its atomic number by the formula mass', 'Divide 100 by the number of elements'], why: 'Percentage by mass compares the mass the element contributes with the mass of the whole formula.' },
  { q: 'Water, $\\ce{H2O}$, has a relative formula mass of 18, and oxygen contributes 16 of it. What fraction of the mass of water is oxygen?', a: '$\\dfrac{16}{18}$, about 89%', w: ['$\\dfrac{1}{3}$, about 33%', '$\\dfrac{2}{18}$, about 11%', '$\\dfrac{16}{100}$, 16%'], why: 'Oxygen is 16 of the 18 mass units: 16 ÷ 18 × 100 ≈ 89%.' },
];

export const FORMULA_SKILLS: SkillDef[] = [
  skill({ id: 'c9-bond-type', name: 'Ionic and covalent bonds', description: 'Decide whether a compound has ionic or covalent bonding, and describe what happens to the electrons.', outcomes: ['9-B1'], lessonId: L(1), format: 'mc', gen: bank([BOND_EASY, (rng) => bondFromName(rng, true), either((rng) => bondFromName(rng, false), fromBank(BOND_HARD, ['Metal + non-metal: ionic. Non-metals only: covalent.']))], ['Metal + non-metal: ionic (electrons transferred). Non-metals only: covalent (electrons shared).']) }),
  skill({ id: 'c9-bond-properties', name: 'Properties of ionic and covalent substances', description: 'Relate melting points and conductivity to ionic or covalent bonding.', outcomes: ['9-B1'], lessonId: L(1), format: 'mc', gen: bank([PROPS_EASY, PROPS_MEDIUM, PROPS_HARD], ['Ionic: high melting point, conducts when melted or dissolved. Small covalent molecules: low melting point, do not conduct.']) }),
  skill({ id: 'c9-ionic-formula', name: 'Formulas of ionic compounds', description: 'Write the formula of an ionic compound from the charges of its ions.', outcomes: ['9-B2'], lessonId: L(2), format: 'mc', gen: bank([(rng) => ionicFormulaQ(rng, SIMPLE_ANIONS.filter((a) => a.charge === -1), METALS.filter((m) => m.charge === 1)), (rng) => ionicFormulaQ(rng, SIMPLE_ANIONS, METALS), (rng) => ionicFormulaQ(rng, SIMPLE_ANIONS.filter((a) => a.charge !== -1), METALS.filter((m) => m.charge !== 1))], ['The total positive charge must equal the total negative charge.']) }),
  skill({ id: 'c9-polyatomic', name: 'Polyatomic ions', description: 'Recognize common polyatomic ions and write formulas that contain them.', outcomes: ['9-B2'], lessonId: L(2), format: 'mc', gen: bank([POLY_EASY, (rng) => ionicFormulaQ(rng, POLY_ANIONS.filter((a) => a.charge === -1), METALS.filter((m) => m.charge === 1)), (rng) => ionicFormulaQ(rng, POLY_ANIONS, [...METALS.filter((m) => m.charge > 1), AMMONIUM])], ['A polyatomic ion is a group of atoms with one charge. Bracket it when you need more than one.']) }),
  skill({ id: 'c9-name-ionic', name: 'Naming ionic compounds', description: 'Name an ionic compound from its formula, including polyatomic ions.', outcomes: ['9-B2'], lessonId: L(3), format: 'mc', gen: bank([(rng) => nameIonic(rng, SIMPLE_ANIONS.filter((a) => a.charge === -1), METALS), (rng) => nameIonic(rng, SIMPLE_ANIONS, METALS), (rng) => nameIonic(rng, POLY_ANIONS, METALS)], ['Metal first, unchanged; then the negative ion (-ide, or the polyatomic ion’s name).']) }),
  skill({ id: 'c9-name-covalent', name: 'Naming covalent compounds', description: 'Name simple covalent compounds with prefixes, and write their formulas from their names.', outcomes: ['9-B2'], lessonId: L(3), format: 'mc', gen: bank([COVALENT_EASY, (rng) => nameCovalent(rng, false), (rng) => nameCovalent(rng, true)], ['mono 1, di 2, tri 3, tetra 4, penta 5; the second element ends in -ide.']) }),
  skill({ id: 'c9-formula-mass', name: 'Relative formula mass', description: 'Calculate the relative formula mass of a compound from relative atomic masses.', outcomes: ['9-B2'], lessonId: L(4), gen: bank([(rng) => formulaMass(rng, 1), (rng) => formulaMass(rng, 2), (rng) => formulaMass(rng, 3)], ['Add the relative atomic masses of every atom in the formula.']) }),
  skill({ id: 'c9-mass-percent', name: 'Percentage by mass', description: 'Find the percentage by mass of an element in a compound.', outcomes: ['9-B2'], lessonId: L(4), gen: bank([MASS_EASY, massPercent, massPercent], ['Percentage = mass of the element in the formula ÷ formula mass × 100.']) }),
];
