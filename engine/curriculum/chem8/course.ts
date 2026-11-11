/**
 * Grade 8 Chemistry: the second junior chemistry course, after Chemistry 7 and before Chemistry 9.
 * Gradileo's own outline (11 November 2026), checked against the chemistry of Alberta's Science 7
 * to 9 (Mix and Flow of Matter; Matter and Chemical Change), England's Key Stage 3 science (atoms,
 * elements and compounds; the periodic table; chemical reactions; materials) and the NGSS
 * middle-school standards MS-PS1-1, MS-PS1-2 and MS-PS1-3: atoms, elements and compounds, the
 * periodic table, physical and chemical changes, and reactions and materials.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '8-A1', strand: 'Atoms, Elements and Compounds', text: 'Describe atoms, elements, compounds and molecules, and name elements from their symbols.' },
  { code: '8-A2', strand: 'Atoms, Elements and Compounds', text: 'Classify matter as elements, compounds or mixtures, and read simple chemical formulas.' },
  { code: '8-B1', strand: 'The Periodic Table', text: 'Use groups and periods to find elements in the periodic table, and tell metals from non-metals.' },
  { code: '8-B2', strand: 'The Periodic Table', text: 'Describe the alkali metals, halogens and noble gases, and use patterns to predict properties.' },
  { code: '8-C1', strand: 'Physical and Chemical Changes', text: 'Tell physical changes from chemical changes, and recognize the signs of a chemical reaction.' },
  { code: '8-C2', strand: 'Physical and Chemical Changes', text: 'Write word equations for simple reactions, naming the reactants and products.' },
  { code: '8-D1', strand: 'Reactions and Materials', text: 'Describe burning and rusting as reactions with oxygen, and how fires and corrosion are controlled.' },
  { code: '8-D2', strand: 'Reactions and Materials', text: 'Relate the properties of metals, alloys, polymers, ceramics and composites to their uses.' },
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
  // ---------------- Unit 1: Atoms, Elements and Compounds ----------------
  L('c8-1-1', 'c8-u1', '1.1', 'Atoms and Elements', ['8-A1'],
    ['c8-atoms-elements', 'c8-element-symbols'],
    ['Describe an atom and an element', 'Match element names and symbols'],
    45, ['atom', 'element', 'chemical symbol']),
  L('c8-1-2', 'c8-u1', '1.2', 'Compounds and Molecules', ['8-A1'],
    ['c8-compounds', 'c8-particle-diagrams'],
    ['Describe a compound and a molecule', 'Read particle diagrams of elements, compounds and mixtures'],
    50, ['compound', 'molecule', 'chemical bond', 'particle diagram']),
  L('c8-1-3', 'c8-u1', '1.3', 'Elements, Compounds and Mixtures', ['8-A2'],
    ['c8-classify-matter', 'c8-compound-vs-mixture'],
    ['Classify a substance as an element, a compound or a mixture', 'Explain how a compound differs from a mixture of its elements'],
    50, ['element', 'compound', 'mixture']),
  L('c8-1-4', 'c8-u1', '1.4', 'Chemical Formulas', ['8-A2'],
    ['c8-read-formula', 'c8-count-atoms'],
    ['Name the elements in a compound from its formula', 'Count the atoms of each element in a formula'],
    50, ['chemical formula', 'subscript']),

  // ---------------- Unit 2: The Periodic Table ----------------
  L('c8-2-1', 'c8-u2', '2.1', 'Organizing the Elements', ['8-B1'],
    ['c8-groups-periods', 'c8-table-history'],
    ['Find an element’s group and period', 'Describe how Mendeleev arranged the elements and left gaps'],
    50, ['periodic table', 'group', 'period', 'atomic number']),
  L('c8-2-2', 'c8-u2', '2.2', 'Metals and Non-metals', ['8-B1'],
    ['c8-metal-properties', 'c8-metal-or-nonmetal'],
    ['Describe the properties of metals and non-metals', 'Classify an element as a metal or a non-metal from its properties or position'],
    50, ['metal', 'non-metal', 'metalloid', 'lustrous', 'ductile']),
  L('c8-2-3', 'c8-u2', '2.3', 'Families of Elements', ['8-B2'],
    ['c8-alkali-metals', 'c8-halogens-noble'],
    ['Describe the alkali metals and their reaction with water', 'Describe the halogens and the noble gases'],
    50, ['alkali metal', 'halogen', 'noble gas', 'reactive', 'unreactive']),
  L('c8-2-4', 'c8-u2', '2.4', 'Patterns in the Periodic Table', ['8-B2'],
    ['c8-group-trends', 'c8-element-uses'],
    ['Use a pattern down a group to predict a property', 'Link the uses of common elements to their properties'],
    50, ['trend', 'predict']),

  // ---------------- Unit 3: Physical and Chemical Changes ----------------
  L('c8-3-1', 'c8-u3', '3.1', 'Physical and Chemical Changes', ['8-C1'],
    ['c8-change-type', 'c8-reversible'],
    ['Tell a physical change from a chemical change', 'Decide whether a change is easily reversed'],
    50, ['physical change', 'chemical change', 'reversible', 'irreversible']),
  L('c8-3-2', 'c8-u3', '3.2', 'Signs of a Chemical Reaction', ['8-C1'],
    ['c8-reaction-signs', 'c8-reactants-products'],
    ['List the signs that a chemical reaction has happened', 'Name the reactants and products of a reaction'],
    50, ['chemical reaction', 'reactant', 'product', 'precipitate']),
  L('c8-3-3', 'c8-u3', '3.3', 'Word Equations', ['8-C2'],
    ['c8-word-equations', 'c8-name-products'],
    ['Write a word equation for a reaction', 'Name the compounds made in simple reactions, such as oxides and chlorides'],
    50, ['word equation', 'oxide', 'chloride', 'sulfide']),

  // ---------------- Unit 4: Reactions and Materials ----------------
  L('c8-4-1', 'c8-u4', '4.1', 'Burning', ['8-D1'],
    ['c8-combustion', 'c8-fire-triangle'],
    ['Describe combustion as a reaction with oxygen and name its products', 'Use the fire triangle to explain how fires are put out'],
    50, ['combustion', 'fuel', 'fire triangle', 'oxygen']),
  L('c8-4-2', 'c8-u4', '4.2', 'Rusting and Corrosion', ['8-D1'],
    ['c8-rusting', 'c8-rust-prevention'],
    ['Explain that iron rusts only when both water and oxygen are present', 'Choose a way to stop rusting and explain how it works'],
    50, ['rusting', 'corrosion', 'oxidation', 'galvanizing']),
  L('c8-4-3', 'c8-u4', '4.3', 'Metals and Alloys', ['8-D2'],
    ['c8-metal-uses', 'c8-alloys'],
    ['Link the uses of metals to their properties', 'Explain why alloys are often harder than pure metals'],
    50, ['alloy', 'steel', 'brass', 'bronze']),
  L('c8-4-4', 'c8-u4', '4.4', 'Polymers, Ceramics and Composites', ['8-D2'],
    ['c8-materials-types', 'c8-choose-material'],
    ['Describe polymers, ceramics and composites', 'Choose a material for a job from its properties'],
    50, ['polymer', 'ceramic', 'composite', 'plastic']),
];

export const UNITS: UnitMeta[] = [
  { id: 'c8-u1', number: 1, title: 'Atoms, Elements and Compounds', description: 'Atoms and elements, compounds and molecules, classifying matter, and chemical formulas.', outcomes: ['8-A1', '8-A2'], lessons: [], color: 'emerald' },
  { id: 'c8-u2', number: 2, title: 'The Periodic Table', description: 'Groups and periods, metals and non-metals, families of elements, and patterns in the table.', outcomes: ['8-B1', '8-B2'], lessons: [], color: 'sky' },
  { id: 'c8-u3', number: 3, title: 'Physical and Chemical Changes', description: 'Physical and chemical changes, the signs of a reaction, and word equations.', outcomes: ['8-C1', '8-C2'], lessons: [], color: 'violet' },
  { id: 'c8-u4', number: 4, title: 'Reactions and Materials', description: 'Burning, rusting and corrosion, metals and alloys, and polymers, ceramics and composites.', outcomes: ['8-D1', '8-D2'], lessons: [], color: 'amber' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const CHEM8: CourseMeta = {
  id: 'chem-8',
  title: 'Grade 8 Chemistry',
  shortTitle: 'Chemistry 8',
  grade: 8,
  subject: 'Chemistry',
  description: 'Chemistry for Grade 8: atoms, elements and compounds, the periodic table, physical and chemical changes, and reactions and materials.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
