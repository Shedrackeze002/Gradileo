/**
 * Grade 9 Chemistry: the third junior chemistry course, after Chemistry 8 and before Grade 10
 * Chemistry. Gradileo's own outline (11 November 2026), checked against the chemistry of Alberta's
 * Science 9 (Matter and Chemical Change), England's Key Stage 3 and early Key Stage 4 chemistry
 * (atomic structure, bonding, equations, acids and alkalis) and the NGSS middle-school standards
 * MS-PS1-1, MS-PS1-2 and MS-PS1-5: atomic structure, formulas and names, reactions and conservation
 * of mass, and acids and bases.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '9-A1', strand: 'Atomic Structure', text: 'Describe protons, neutrons and electrons, how models of the atom developed, and use atomic and mass numbers.' },
  { code: '9-A2', strand: 'Atomic Structure', text: 'Write electron arrangements for the first 20 elements, link them to the periodic table, and explain how ions form.' },
  { code: '9-B1', strand: 'Formulas and Names', text: 'Tell ionic from covalent bonding and relate it to the properties of substances.' },
  { code: '9-B2', strand: 'Formulas and Names', text: 'Write formulas and names of simple ionic and covalent compounds, and calculate relative formula mass.' },
  { code: '9-C1', strand: 'Reactions and Conservation of Mass', text: 'Apply the conservation of mass, and read and balance simple symbol equations.' },
  { code: '9-C2', strand: 'Reactions and Conservation of Mass', text: 'Classify reactions, use the reactivity series, and explain what changes the rate of a reaction.' },
  { code: '9-D1', strand: 'Acids and Bases', text: 'Describe acids, bases and indicators, and use the pH scale.' },
  { code: '9-D2', strand: 'Acids and Bases', text: 'Describe neutralization, name the salts it makes, and explain its everyday uses.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 50,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Atomic Structure ----------------
  L('c9-1-1', 'c9-u1', '1.1', 'Inside the Atom', ['9-A1'],
    ['c9-subatomic', 'c9-atom-models'],
    ['Give the charge, mass and position of protons, neutrons and electrons', 'Describe how the model of the atom changed with new evidence'],
    50, ['proton', 'neutron', 'electron', 'nucleus', 'shell']),
  L('c9-1-2', 'c9-u1', '1.2', 'Atomic Number, Mass Number and Isotopes', ['9-A1'],
    ['c9-atomic-number', 'c9-isotopes'],
    ['Find the numbers of protons, neutrons and electrons in an atom', 'Describe isotopes'],
    50, ['atomic number', 'mass number', 'isotope']),
  L('c9-1-3', 'c9-u1', '1.3', 'Electron Arrangements', ['9-A2'],
    ['c9-electron-shells', 'c9-shells-table'],
    ['Write the electron arrangement of the first 20 elements', 'Link electron arrangements to groups and periods'],
    50, ['electron arrangement', 'outer shell', 'energy level']),
  L('c9-1-4', 'c9-u1', '1.4', 'Ions', ['9-A2'],
    ['c9-ion-charge', 'c9-ion-particles'],
    ['Explain how atoms lose or gain electrons to form ions', 'Count the protons and electrons in an ion'],
    50, ['ion', 'positive ion', 'negative ion']),

  // ---------------- Unit 2: Formulas and Names ----------------
  L('c9-2-1', 'c9-u2', '2.1', 'Ionic and Covalent Bonding', ['9-B1'],
    ['c9-bond-type', 'c9-bond-properties'],
    ['Decide whether a compound is ionic or covalent', 'Relate melting point and conductivity to bonding'],
    50, ['ionic bond', 'covalent bond', 'lattice']),
  L('c9-2-2', 'c9-u2', '2.2', 'Formulas of Ionic Compounds', ['9-B2'],
    ['c9-ionic-formula', 'c9-polyatomic'],
    ['Write the formula of an ionic compound from the charges of its ions', 'Use polyatomic ions in formulas'],
    50, ['charge', 'polyatomic ion']),
  L('c9-2-3', 'c9-u2', '2.3', 'Naming Compounds', ['9-B2'],
    ['c9-name-ionic', 'c9-name-covalent'],
    ['Name ionic compounds from their formulas', 'Name covalent compounds using prefixes'],
    50, ['prefix', '-ide', '-ate']),
  L('c9-2-4', 'c9-u2', '2.4', 'Relative Formula Mass', ['9-B2'],
    ['c9-formula-mass', 'c9-mass-percent'],
    ['Calculate relative formula mass', 'Find the percentage by mass of an element in a compound'],
    50, ['relative atomic mass', 'relative formula mass']),

  // ---------------- Unit 3: Reactions and Conservation of Mass ----------------
  L('c9-3-1', 'c9-u3', '3.1', 'Conservation of Mass', ['9-C1'],
    ['c9-mass-conservation', 'c9-open-closed'],
    ['Use conservation of mass to find an unknown mass', 'Explain mass changes in open and closed systems'],
    50, ['conservation of mass', 'closed system', 'open system']),
  L('c9-3-2', 'c9-u3', '3.2', 'Balancing Equations', ['9-C1'],
    ['c9-count-equation', 'c9-balance'],
    ['Count the atoms on each side of a symbol equation', 'Balance simple symbol equations'],
    50, ['symbol equation', 'coefficient', 'balanced']),
  L('c9-3-3', 'c9-u3', '3.3', 'Types of Reaction', ['9-C2'],
    ['c9-reaction-type', 'c9-displacement'],
    ['Classify reactions as synthesis, decomposition, displacement or combustion', 'Use the reactivity series to predict displacement'],
    50, ['synthesis', 'decomposition', 'displacement', 'reactivity series']),
  L('c9-3-4', 'c9-u3', '3.4', 'Rates of Reaction', ['9-C2'],
    ['c9-rate-factors', 'c9-collision-theory'],
    ['Describe how temperature, concentration, surface area and catalysts change the rate', 'Explain rate with collision theory and calculate a mean rate'],
    50, ['rate of reaction', 'catalyst', 'collision theory', 'surface area']),

  // ---------------- Unit 4: Acids and Bases ----------------
  L('c9-4-1', 'c9-u4', '4.1', 'Acids, Bases and Indicators', ['9-D1'],
    ['c9-acid-base', 'c9-indicators'],
    ['Describe the properties of acids, bases and alkalis', 'Predict the colours of common indicators'],
    50, ['acid', 'base', 'alkali', 'indicator', 'litmus']),
  L('c9-4-2', 'c9-u4', '4.2', 'The pH Scale', ['9-D1'],
    ['c9-ph-scale', 'c9-ph-compare'],
    ['Classify solutions by pH', 'Compare acids and alkalis using pH'],
    50, ['pH', 'neutral', 'universal indicator']),
  L('c9-4-3', 'c9-u4', '4.3', 'Neutralization', ['9-D2'],
    ['c9-neutralization', 'c9-neutralization-uses'],
    ['Name the salt made in a neutralization and write the word equation', 'Explain everyday uses of neutralization'],
    50, ['neutralization', 'salt', 'antacid']),
];

export const UNITS: UnitMeta[] = [
  { id: 'c9-u1', number: 1, title: 'Atomic Structure', description: 'Protons, neutrons and electrons, models of the atom, isotopes, electron arrangements and ions.', outcomes: ['9-A1', '9-A2'], lessons: [], color: 'emerald' },
  { id: 'c9-u2', number: 2, title: 'Formulas and Names', description: 'Ionic and covalent bonding, formulas and names of compounds, and relative formula mass.', outcomes: ['9-B1', '9-B2'], lessons: [], color: 'sky' },
  { id: 'c9-u3', number: 3, title: 'Reactions and Conservation of Mass', description: 'Conservation of mass, balancing equations, types of reaction and rates of reaction.', outcomes: ['9-C1', '9-C2'], lessons: [], color: 'violet' },
  { id: 'c9-u4', number: 4, title: 'Acids and Bases', description: 'Acids, bases and indicators, the pH scale, and neutralization.', outcomes: ['9-D1', '9-D2'], lessons: [], color: 'amber' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const CHEM9: CourseMeta = {
  id: 'chem-9',
  title: 'Grade 9 Chemistry',
  shortTitle: 'Chemistry 9',
  grade: 9,
  subject: 'Chemistry',
  description: 'Chemistry for Grade 9: atomic structure, formulas and names, reactions and conservation of mass, and acids and bases.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
