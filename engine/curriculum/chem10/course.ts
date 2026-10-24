/**
 * Grade 10 Chemistry: the first chemistry course, before Grade 11 Chemistry. Gradileo's own outline
 * (23 October 2026), written for learners anywhere: the particle model and mixtures, atoms and the
 * periodic table, bonding, names and formulas, chemical reactions, and moles, acids and bases, at
 * the level most English-speaking school systems teach in Grades 9 and 10.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '10-A1', strand: 'Matter and the Particle Model', text: 'Describe matter and its changes of state with the particle model, and classify matter as elements, compounds and mixtures.' },
  { code: '10-A2', strand: 'Matter and the Particle Model', text: 'Separate mixtures, tell physical from chemical changes, and work safely in the laboratory.' },
  { code: '10-B1', strand: 'Atoms and the Periodic Table', text: 'Describe the structure of atoms: protons, neutrons and electrons, isotopes and electron shells.' },
  { code: '10-B2', strand: 'Atoms and the Periodic Table', text: 'Use the periodic table to explain and predict the properties of elements and their families.' },
  { code: '10-C1', strand: 'Bonding, Names and Formulas', text: 'Explain ionic, covalent and metallic bonding, and relate a substance’s bonding to its properties.' },
  { code: '10-C2', strand: 'Bonding, Names and Formulas', text: 'Name ionic and simple molecular compounds and write their formulas.' },
  { code: '10-D1', strand: 'Chemical Reactions', text: 'Represent reactions with word equations and balanced symbol equations, using the conservation of mass.' },
  { code: '10-D2', strand: 'Chemical Reactions', text: 'Classify reactions, and describe their energy changes and the factors that change their rates.' },
  { code: '10-E1', strand: 'Moles, Acids and Bases', text: 'Use the mole to relate the mass, amount and number of particles of a substance.' },
  { code: '10-E2', strand: 'Moles, Acids and Bases', text: 'Describe acids and bases with the pH scale and indicators, and the products of neutralization.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 60,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Matter and the Particle Model ----------------
  L('c10-1-1', 'c10-u1', '1.1', 'States of Matter and the Particle Model', ['10-A1'],
    ['c10-states', 'c10-state-changes'],
    ['Describe solids, liquids and gases by how their particles are arranged and move', 'Name each change of state and say whether energy is taken in or given out'],
    60, ['particle model', 'solid', 'liquid', 'gas', 'melting', 'freezing', 'evaporation', 'boiling', 'condensation', 'sublimation', 'deposition']),
  L('c10-1-2', 'c10-u1', '1.2', 'Pure Substances and Mixtures', ['10-A1'],
    ['c10-classify-matter', 'c10-solutions'],
    ['Classify matter as an element, a compound or a mixture', 'Tell homogeneous from heterogeneous mixtures', 'Name the solute, solvent and solution, and find the mass of a solution'],
    60, ['pure substance', 'element', 'compound', 'mixture', 'homogeneous', 'heterogeneous', 'solution', 'solute', 'solvent']),
  L('c10-1-3', 'c10-u1', '1.3', 'Separating Mixtures', ['10-A2'],
    ['c10-separation', 'c10-chromatography'],
    ['Choose a method to separate a mixture from the properties of its parts', 'Find and use Rf values in paper chromatography'],
    60, ['filtration', 'evaporation', 'crystallization', 'distillation', 'chromatography', 'filtrate', 'residue', 'Rf value']),
  L('c10-1-4', 'c10-u1', '1.4', 'Physical and Chemical Change', ['10-A2'],
    ['c10-change-type', 'c10-properties', 'c10-density'],
    ['Tell a physical change from a chemical change by its evidence', 'Sort physical and chemical properties', 'Use density to describe and identify substances'],
    65, ['physical change', 'chemical change', 'physical property', 'chemical property', 'density']),
  L('c10-1-5', 'c10-u1', '1.5', 'Lab Safety and Hazard Symbols', ['10-A2'],
    ['c10-hazard-symbols', 'c10-lab-safety'],
    ['Read the hazard pictograms on chemical labels', 'Choose safe ways to work in a laboratory'],
    50, ['hazard pictogram', 'flammable', 'corrosive', 'toxic', 'oxidizer', 'safety data sheet']),

  // ---------------- Unit 2: Atoms and the Periodic Table ----------------
  L('c10-2-1', 'c10-u2', '2.1', 'Inside the Atom', ['10-B1'],
    ['c10-subatomic-particles', 'c10-atom-counts'],
    ['Describe the charge, mass and place of protons, neutrons and electrons', 'Count the protons, neutrons and electrons in an atom from its atomic number and mass number'],
    60, ['atom', 'nucleus', 'proton', 'neutron', 'electron', 'atomic number', 'mass number']),
  L('c10-2-2', 'c10-u2', '2.2', 'Isotopes and Relative Atomic Mass', ['10-B1'],
    ['c10-isotopes', 'c10-relative-atomic-mass'],
    ['Recognize isotopes of an element and count their neutrons', 'Find a relative atomic mass from the masses and abundances of isotopes'],
    60, ['isotope', 'abundance', 'relative atomic mass']),
  L('c10-2-3', 'c10-u2', '2.3', 'Electron Shells', ['10-B1'],
    ['c10-electron-arrangement', 'c10-outer-electrons'],
    ['Write the electron arrangement of the first 20 elements (2,8,8,2)', 'Link the outer electrons and the number of shells to the group and period'],
    60, ['electron shell', 'energy level', 'electron arrangement', 'outer electrons', 'valence electrons']),
  L('c10-2-4', 'c10-u2', '2.4', 'The Periodic Table', ['10-B2'],
    ['c10-groups-periods', 'c10-metal-nonmetal'],
    ['Find an element’s group and period', 'Classify elements as metals, non-metals and metalloids by their place and properties'],
    55, ['periodic table', 'group', 'period', 'metal', 'non-metal', 'metalloid']),
  L('c10-2-5', 'c10-u2', '2.5', 'Families of Elements', ['10-B2'],
    ['c10-group-trends'],
    ['Describe the alkali metals, halogens and noble gases', 'Predict reactivity down a group'],
    60, ['alkali metal', 'alkaline earth metal', 'halogen', 'noble gas', 'transition metal', 'reactivity']),

  // ---------------- Unit 3: Bonding, Names and Formulas ----------------
  L('c10-3-1', 'c10-u3', '3.1', 'Ions', ['10-C1'],
    ['c10-ion-charge', 'c10-ion-electrons'],
    ['Predict the charge of an ion from the element’s group', 'Count the electrons of an ion and write its electron arrangement'],
    55, ['ion', 'cation', 'anion', 'charge']),
  L('c10-3-2', 'c10-u3', '3.2', 'Ionic Compounds: Names and Formulas', ['10-C1', '10-C2'],
    ['c10-ionic-formula', 'c10-ionic-name'],
    ['Write the formula of an ionic compound so the charges cancel', 'Name ionic compounds, including a few common polyatomic ions'],
    65, ['ionic bond', 'ionic compound', 'polyatomic ion', 'formula unit']),
  L('c10-3-3', 'c10-u3', '3.3', 'Covalent Bonds and Molecular Names', ['10-C1', '10-C2'],
    ['c10-bond-kind', 'c10-shared-pairs', 'c10-molecular-name'],
    ['Decide whether a compound is ionic or covalent from its elements', 'Count the shared pairs in simple molecules', 'Name binary molecular compounds with prefixes and write their formulas'],
    65, ['covalent bond', 'molecule', 'shared pair', 'single bond', 'double bond', 'triple bond', 'prefix']),
  L('c10-3-4', 'c10-u3', '3.4', 'Bonding and Properties', ['10-C1'],
    ['c10-bonding-properties'],
    ['Explain melting points, conductivity and solubility by ionic, simple molecular, giant covalent and metallic bonding'],
    60, ['metallic bonding', 'giant covalent structure', 'simple molecular substance', 'conductivity', 'melting point']),

  // ---------------- Unit 4: Chemical Reactions ----------------
  L('c10-4-1', 'c10-u4', '4.1', 'Word Equations and Conservation of Mass', ['10-D1'],
    ['c10-word-equation', 'c10-conservation-mass'],
    ['Name the reactants and products of a reaction and write its word equation', 'Use the conservation of mass to find a missing mass'],
    55, ['reactant', 'product', 'word equation', 'conservation of mass']),
  L('c10-4-2', 'c10-u4', '4.2', 'Balancing Equations', ['10-D1'],
    ['c10-count-atoms', 'c10-balance'],
    ['Count the atoms in a formula with coefficients and brackets', 'Balance symbol equations with coefficients, and add state symbols'],
    65, ['symbol equation', 'coefficient', 'subscript', 'balanced equation', 'state symbol']),
  L('c10-4-3', 'c10-u4', '4.3', 'Types of Reactions', ['10-D2'],
    ['c10-reaction-type', 'c10-predict-products'],
    ['Classify synthesis, decomposition, single and double displacement, and combustion reactions', 'Predict the products of simple reactions'],
    65, ['synthesis', 'decomposition', 'single displacement', 'double displacement', 'combustion', 'precipitate']),
  L('c10-4-4', 'c10-u4', '4.4', 'Energy in Reactions', ['10-D2'],
    ['c10-exo-endo', 'c10-energy-diagram'],
    ['Classify a reaction as exothermic or endothermic from its temperature change', 'Read an energy level diagram: reactants, products, energy change and activation energy'],
    55, ['exothermic', 'endothermic', 'energy level diagram', 'activation energy']),
  L('c10-4-5', 'c10-u4', '4.5', 'Rates of Reaction', ['10-D2'],
    ['c10-rate-factors', 'c10-mean-rate'],
    ['Explain how temperature, concentration, surface area and catalysts change a reaction’s rate, with collision theory', 'Calculate a mean rate of reaction from data'],
    60, ['rate of reaction', 'collision theory', 'catalyst', 'surface area', 'concentration']),

  // ---------------- Unit 5: Moles, Acids and Bases ----------------
  L('c10-5-1', 'c10-u5', '5.1', 'The Mole and Molar Mass', ['10-E1'],
    ['c10-molar-mass', 'c10-avogadro'],
    ['Find the molar mass of an element or compound from atomic masses', 'Convert between moles and numbers of particles with Avogadro’s number'],
    60, ['mole', 'Avogadro’s number', 'molar mass']),
  L('c10-5-2', 'c10-u5', '5.2', 'Moles, Mass and Particles', ['10-E1'],
    ['c10-mass-moles', 'c10-mole-ratio'],
    ['Convert between mass and moles', 'Use a balanced equation’s mole ratio to find the moles of another substance'],
    65, ['amount of substance', 'mole ratio']),
  L('c10-5-3', 'c10-u5', '5.3', 'Acids, Bases and the pH Scale', ['10-E2'],
    ['c10-ph-scale', 'c10-indicators'],
    ['Classify solutions as acidic, neutral or basic from their pH', 'Predict the colours of common indicators'],
    55, ['acid', 'base', 'alkali', 'neutral', 'pH scale', 'indicator', 'litmus']),
  L('c10-5-4', 'c10-u5', '5.4', 'Neutralization', ['10-E2'],
    ['c10-neutralization', 'c10-salt-name'],
    ['Describe neutralization: an acid and a base make a salt and water', 'Name the salt made by an acid and a base, and write its word equation'],
    55, ['neutralization', 'salt', 'hydroxide']),
];

export const UNITS: UnitMeta[] = [
  { id: 'c10-u1', number: 1, title: 'Matter and the Particle Model', description: 'States of matter and changes of state, pure substances and mixtures, separating mixtures, physical and chemical change, and working safely.', outcomes: ['10-A1', '10-A2'], lessons: [], color: 'emerald' },
  { id: 'c10-u2', number: 2, title: 'Atoms and the Periodic Table', description: 'Protons, neutrons and electrons, isotopes and relative atomic mass, electron shells, and the groups and families of the periodic table.', outcomes: ['10-B1', '10-B2'], lessons: [], color: 'sky' },
  { id: 'c10-u3', number: 3, title: 'Bonding, Names and Formulas', description: 'Ions, ionic and covalent bonding, naming compounds and writing their formulas, and how bonding explains properties.', outcomes: ['10-C1', '10-C2'], lessons: [], color: 'violet' },
  { id: 'c10-u4', number: 4, title: 'Chemical Reactions', description: 'Word and symbol equations, conservation of mass, balancing, types of reactions, energy changes and rates of reaction.', outcomes: ['10-D1', '10-D2'], lessons: [], color: 'amber' },
  { id: 'c10-u5', number: 5, title: 'Moles, Acids and Bases', description: 'The mole and molar mass, converting between mass, moles and particles, the pH scale and indicators, and neutralization.', outcomes: ['10-E1', '10-E2'], lessons: [], color: 'rose' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const CHEM10: CourseMeta = {
  id: 'chem-10',
  title: 'Grade 10 Chemistry',
  shortTitle: 'Chemistry 10',
  grade: 10,
  subject: 'Chemistry',
  description: 'Chemistry for Grade 10: the particle model and mixtures, atoms and the periodic table, bonding, names and formulas, chemical reactions, and moles, acids and bases.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
