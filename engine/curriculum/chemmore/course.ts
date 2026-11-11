/**
 * More Chemistry Topics: lessons that other school systems' chemistry courses teach and Gradileo's
 * own grade courses do not (roadmap item 5, step 4, "fill the gaps"). The curriculum maps file
 * these lessons into their courses (the reactivity series and the tests for ions in GCSE
 * Chemistry), and Browse by topic lists them with the other lessons of their topics. It is not a
 * course to take on its own, so it is not offered in the course pickers (`extra`), and each lesson
 * carries its own level (`grade`).
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'MR1', strand: 'Metals and their reactions', text: 'Place metals in a reactivity series from their reactions with water, acids and each other’s compounds, and predict displacement reactions.' },
  { code: 'MR2', strand: 'Metals and their reactions', text: 'Explain how a metal’s place in the reactivity series decides how it is extracted from its ore, and calculate the mass of metal an ore can give.' },
  { code: 'MR3', strand: 'Metals and their reactions', text: 'Choose the reactants for a soluble salt, and describe how to make a pure, dry sample of it.' },
  { code: 'MR4', strand: 'Metals and their reactions', text: 'Predict the products of the electrolysis of molten compounds and of solutions, and write the half equations at the electrodes.' },
  { code: 'CA1', strand: 'Chemical analysis', text: 'Tell pure substances from mixtures and formulations, and identify hydrogen, oxygen, carbon dioxide and chlorine by their tests.' },
  { code: 'CA2', strand: 'Chemical analysis', text: 'Identify metal ions by flame tests and hydroxide precipitates, and carbonate, halide and sulfate ions by their tests.' },
  { code: 'QC1', strand: 'Formulae and atom economy', text: 'Find the empirical formula of a compound from masses or percentages, and a molecular formula from it.' },
  { code: 'QC2', strand: 'Formulae and atom economy', text: 'Calculate the atom economy of a reaction, and use it with yield to compare ways of making a product.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  grade: number,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, grade, outcomes, skills, objectives, minutes: 60, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Metals and Their Reactions ----------------
  L('cx-1-1', 'cx-u1', '1.1', 'The Reactivity Series', 10, ['MR1'],
    ['cx-reactivity-order', 'cx-displacement'],
    ['Put metals in order of reactivity from their reactions with water and dilute acids', 'Predict whether one metal displaces another, and say what is oxidised and what is reduced'],
    ['reactivity series', 'displacement reaction', 'oxidation', 'reduction', 'ion']),
  L('cx-1-2', 'cx-u1', '1.2', 'Extracting Metals', 10, ['MR2'],
    ['cx-extraction-method', 'cx-ore-mass'],
    ['Choose how a metal is extracted from its place in the reactivity series', 'Calculate the mass of metal in a mass of its oxide'],
    ['ore', 'native metal', 'extraction', 'reduction with carbon', 'electrolysis']),
  L('cx-1-3', 'cx-u1', '1.3', 'Making Soluble Salts', 10, ['MR3'],
    ['cx-salt-reactants', 'cx-salt-method'],
    ['Choose an acid and a metal, oxide, hydroxide or carbonate that make a named salt', 'Describe each step in making a pure, dry sample of a soluble salt, and why it is done'],
    ['salt', 'excess', 'filtrate', 'residue', 'crystallisation']),
  L('cx-1-4', 'cx-u1', '1.4', 'Electrolysis of Solutions and Half Equations', 10, ['MR4'],
    ['cx-electrolysis-products', 'cx-half-equation'],
    ['Predict what forms at each electrode when a molten compound or a solution is electrolysed', 'Write and balance the half equations at the electrodes'],
    ['electrolysis', 'electrolyte', 'cathode', 'anode', 'half equation', 'discharge']),

  // ---------------- Unit 2: Chemical Analysis ----------------
  L('cx-2-1', 'cx-u2', '2.1', 'Purity, Formulations and Tests for Gases', 10, ['CA1'],
    ['cx-purity', 'cx-gas-tests'],
    ['Use melting and boiling points to tell a pure substance from a mixture, and recognise a formulation', 'Identify hydrogen, oxygen, carbon dioxide and chlorine by their tests'],
    ['pure substance', 'formulation', 'melting point', 'limewater', 'litmus']),
  L('cx-2-2', 'cx-u2', '2.2', 'Identifying Ions', 10, ['CA2'],
    ['cx-cation-tests', 'cx-anion-tests'],
    ['Identify metal ions by their flame colours and by the precipitates they give with sodium hydroxide solution', 'Identify carbonate, halide and sulfate ions by their tests, and name an unknown compound from its results'],
    ['flame test', 'precipitate', 'carbonate', 'halide', 'sulfate']),

  // ---------------- Unit 3: Formulae and Atom Economy ----------------
  L('cx-3-1', 'cx-u3', '3.1', 'Empirical and Molecular Formulae', 10, ['QC1'],
    ['cx-empirical-formula', 'cx-molecular-formula'],
    ['Find an empirical formula from the masses or percentages of the elements in a compound', 'Find a molecular formula from an empirical formula and a relative formula mass'],
    ['empirical formula', 'molecular formula', 'relative formula mass', 'mole ratio']),
  L('cx-3-2', 'cx-u3', '3.2', 'Atom Economy', 10, ['QC2'],
    ['cx-atom-economy', 'cx-atom-economy-compare'],
    ['Calculate the atom economy of a reaction from its balanced equation', 'Compare ways of making a product by their atom economy and their yield'],
    ['atom economy', 'desired product', 'by-product', 'percentage yield']),
];

export const UNITS: UnitMeta[] = [
  { id: 'cx-u1', number: 1, title: 'Metals and Their Reactions', description: 'The reactivity series, extracting metals from their ores, making soluble salts, and the electrolysis of solutions with half equations.', outcomes: ['MR1', 'MR2', 'MR3', 'MR4'], lessons: [], color: 'amber' },
  { id: 'cx-u2', number: 2, title: 'Chemical Analysis', description: 'Pure substances and formulations, the tests for four common gases, flame tests and the tests for ions in solution.', outcomes: ['CA1', 'CA2'], lessons: [], color: 'sky' },
  { id: 'cx-u3', number: 3, title: 'Formulae and Atom Economy', description: 'Empirical and molecular formulae, and the atom economy of a reaction.', outcomes: ['QC1', 'QC2'], lessons: [], color: 'emerald' },
];
for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const CHEMMORE: CourseMeta = {
  id: 'chem-more',
  title: 'More Chemistry Topics',
  shortTitle: 'More Chemistry',
  grade: 10,
  subject: 'Chemistry',
  description: 'Topics that school systems around the world teach and Gradileo’s grade courses do not: the reactivity series and extracting metals, making soluble salts, the electrolysis of solutions, the tests for gases and ions, empirical formulae and atom economy.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  extra: true,
};
