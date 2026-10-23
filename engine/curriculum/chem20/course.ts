/**
 * Chemistry 20 (Alberta), Grade 11. Outcomes follow the Alberta Chemistry 20–30 Program of
 * Studies (2007, updated 2014): four units, each with its general outcomes (20-A1 to 20-D2). The
 * wording is close to the program but still needs a word-for-word check against it.
 *
 * Being written a unit at a time (docs/PLAN-CHEMISTRY-ENGLISH.md): a draft course runs everywhere
 * except the course pickers, so no class can start it until every unit is in.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '20-A1', strand: 'The Diversity of Matter and Chemical Bonding', text: 'Describe the role of modelling, evidence and theory in explaining and understanding the structure, chemical bonding and properties of ionic compounds.' },
  { code: '20-A2', strand: 'The Diversity of Matter and Chemical Bonding', text: 'Describe the role of modelling, evidence and theory in explaining and understanding the structure, chemical bonding and properties of molecular substances.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 75,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: The Diversity of Matter and Chemical Bonding ----------------
  L('c20-1-1', 'c20-u1', '1.1', 'Atoms, Ions and the Periodic Table', ['20-A1'],
    ['c20-subatomic', 'c20-valence', 'c20-ion-formula'],
    ['Count the protons, neutrons and electrons in an atom or ion', 'Find the valence electrons of a main-group element from its group', 'Predict the ion an element forms from its place in the periodic table'],
    75, ['atomic number', 'mass number', 'isotope', 'valence electron', 'ion', 'cation', 'anion']),
  L('c20-1-2', 'c20-u1', '1.2', 'Ionic Compounds', ['20-A1'],
    ['c20-ionic-formula', 'c20-ionic-name', 'c20-ionic-properties'],
    ['Write the formula of an ionic compound so that its charges cancel', 'Name ionic compounds, with Roman numerals and polyatomic ions', 'Explain the properties of ionic compounds with a lattice of ions'],
    80, ['ionic bond', 'crystal lattice', 'polyatomic ion', 'Roman numeral']),
  L('c20-1-3', 'c20-u1', '1.3', 'Molecular Compounds and Acids', ['20-A2'],
    ['c20-molecular-formula', 'c20-molecular-name', 'c20-acid-name'],
    ['Name binary molecular compounds with prefixes and write their formulas', 'Recognise molecular compounds known by common names', 'Name acids by their classical and IUPAC names'],
    75, ['molecule', 'covalent bond', 'prefix', 'acid']),
  L('c20-1-4', 'c20-u1', '1.4', 'Electronegativity and Bond Types', ['20-A1', '20-A2'],
    ['c20-en-difference', 'c20-bond-type'],
    ['Describe electronegativity and its trends in the periodic table', 'Classify a bond as non-polar covalent, polar covalent or ionic from the electronegativity difference'],
    70, ['electronegativity', 'polar covalent bond', 'non-polar covalent bond', 'partial charge']),
  L('c20-1-5', 'c20-u1', '1.5', 'Lewis Structures', ['20-A2'],
    ['c20-valence-total', 'c20-lewis-pairs'],
    ['Count the valence electrons of a molecule or polyatomic ion', 'Draw Lewis structures with single, double and triple bonds', 'Count bonding pairs and lone pairs'],
    80, ['Lewis structure', 'bonding pair', 'lone pair', 'octet rule', 'double bond', 'triple bond']),
  L('c20-1-6', 'c20-u1', '1.6', 'Shapes of Molecules', ['20-A2'],
    ['c20-vsepr-shape', 'c20-bond-angle'],
    ['Use VSEPR theory to predict the shape of a molecule', 'Predict bond angles, and how lone pairs change them'],
    75, ['VSEPR theory', 'electron group', 'tetrahedral', 'trigonal pyramidal', 'V-shaped', 'trigonal planar', 'linear']),
  L('c20-1-7', 'c20-u1', '1.7', 'Polar and Non-polar Molecules', ['20-A2'],
    ['c20-molecule-polarity'],
    ['Decide whether a molecule is polar from its bonds and its shape'],
    65, ['polar molecule', 'dipole', 'symmetry']),
  L('c20-1-8', 'c20-u1', '1.8', 'Intermolecular Forces', ['20-A2'],
    ['c20-imf-type', 'c20-boiling-compare'],
    ['Identify London dispersion forces, dipole–dipole forces and hydrogen bonds', 'Explain differences in boiling points with intermolecular forces'],
    80, ['intermolecular force', 'London dispersion force', 'dipole–dipole force', 'hydrogen bond', 'boiling point']),
];

export const UNITS: UnitMeta[] = [
  { id: 'c20-u1', number: 1, title: 'The Diversity of Matter and Chemical Bonding', description: 'Atoms and ions, ionic and molecular compounds, electronegativity, Lewis structures, shapes of molecules, polarity and intermolecular forces.', outcomes: ['20-A1', '20-A2'], lessons: [], color: 'emerald' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const CHEM20: CourseMeta = {
  id: 'chem-20',
  title: 'Grade 11 Chemistry (Chemistry 20)',
  shortTitle: 'Chemistry 20',
  grade: 11,
  subject: 'Chemistry',
  description: 'Chemistry for Grade 11: chemical bonding and the shapes of molecules, gases, solutions, acids and bases, and quantitative relationships in chemical changes.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  draft: true,
};
