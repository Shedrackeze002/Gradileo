/**
 * UK chemistry as schools in England teach it.
 *
 * GCSE Chemistry in Years 10 and 11: one course for both tiers. Each unit points to the Gradileo
 * lessons that teach its part of the GCSE subject content, under the topic names schemes of work
 * use, with the Higher tier and separate-science parts named in the descriptions.
 *
 * A level Chemistry in Years 12 and 13: the first year (the AS content) and the second, each in
 * the usual three strands of physical, inorganic and organic chemistry. Gradileo's chemistry was
 * written as three grade courses, so the A level courses list more gaps than GCSE does; most are
 * inorganic chemistry, reaction mechanisms and the instruments of organic analysis.
 */
import type { MapCourse } from './build.ts';

export const UK_CHEMISTRY_COURSES: MapCourse[] = [
  {
    id: 'uk-gcse-chemistry',
    title: 'GCSE Chemistry (UK)',
    shortTitle: 'GCSE Chemistry',
    grade: 10,
    subject: 'Chemistry',
    description: 'Atomic structure and the periodic table, bonding and structure, quantitative chemistry, chemical and energy changes, rates and equilibrium, organic chemistry and chemical analysis, in the order of a Year 10 and 11 scheme of work.',
    units: [
      { title: 'Atomic Structure and the Periodic Table', description: 'Elements, compounds and mixtures, the particles of the atom, isotopes and relative atomic mass, electron shells, and the groups of the periodic table: the alkali metals, the halogens, the noble gases and the transition metals, and how the model of the atom and the periodic table developed.', members: ['c10-1-2', 'cx-5-1', 'c10-2-1', 'c10-2-2', 'c10-2-3', 'c10-2-4', 'c10-2-5', 'cx-5-2'] },
      { title: 'Bonding, Structure and the Properties of Matter', description: 'The three states of matter, ions and ionic compounds, covalent bonds with dot and cross diagrams, metallic bonding, and how the properties of ionic, simple molecular, giant covalent and metallic substances follow from their structures, the forms of carbon, and nanoparticles.', members: ['c10-1-1', 'c10-3-1', 'c10-3-2', 'c10-3-3', 'c20-1-5', 'c10-3-4', 'cx-5-3'] },
      { title: 'Quantitative Chemistry', description: 'Conservation of mass and balanced equations, relative formula mass, the mole, empirical and molecular formulae, reacting masses, limiting reactants, percentage yield, atom economy, concentrations in mol/dm³ and the volumes of gases (the mole work is Higher tier).', members: ['c10-4-1', 'c10-4-2', 'c10-5-1', 'c10-5-2', 'cx-3-1', 'c20-4-4', 'c20-4-6', 'c20-4-7', 'cx-3-2', 'c20-3-4', 'c20-2-6'] },
      { title: 'Chemical Changes', description: 'The reactivity series and displacement, oxidation and reduction, extracting metals, acids, alkalis and the pH scale, neutralisation and making salts, strong and weak acids, titrations, and electrolysis with half equations.', members: ['c10-4-3', 'cx-1-1', 'c30-2-1', 'cx-1-2', 'c10-5-3', 'c10-5-4', 'cx-1-3', 'c20-3-8', 'c20-4-8', 'c30-2-8', 'cx-1-4'] },
      { title: 'Energy Changes', description: 'Exothermic and endothermic reactions, reaction profiles, the energy of bonds broken and made, chemical cells and batteries, and hydrogen fuel cells.', members: ['c10-4-4', 'c30-1-1', 'c30-2-6', 'cx-6-3'] },
      { title: 'The Rate and Extent of Chemical Change', description: 'Measuring a rate, collision theory and the factors that change a rate, activation energy and catalysts, reversible reactions, dynamic equilibrium and Le Chatelier’s principle.', members: ['c10-4-5', 'c30-1-7', 'c30-4-1', 'c30-4-3'] },
      { title: 'Organic Chemistry', description: 'Crude oil, alkanes, fractional distillation, cracking and combustion, alkenes and their addition reactions, alcohols, carboxylic acids and esters, and addition and condensation polymers.', members: ['c30-3-1', 'c30-3-7', 'c30-3-4', 'c30-3-5', 'c30-3-6'] },
      { title: 'Chemical Analysis', description: 'Pure substances and formulations, separating mixtures, paper chromatography and Rf values, the tests for common gases, flame tests, and the precipitates that identify ions in solution.', members: ['cx-2-1', 'c10-1-3', 'c20-3-2', 'cx-2-2'] },
      { title: 'Chemistry of the Atmosphere', description: 'The gases of the air, how the Earth’s early atmosphere formed and changed, greenhouse gases, climate change and carbon footprints, and the pollutants from burning fuels.', members: ['cx-4-1', 'cx-4-2'] },
      { title: 'Using Resources', description: 'Potable water from fresh water, sea water and waste water, life cycle assessments, reducing, reusing and recycling, corrosion, alloys, ceramics, polymers and composites, and the Haber process and NPK fertilisers.', members: ['cx-4-3', 'cx-4-4', 'cx-6-1', 'cx-6-2'] },
    ],
    gaps: [],
  },
  {
    id: 'uk-a-level-chemistry-1',
    title: 'A level Chemistry: Year 12 (UK)',
    shortTitle: 'A level Chemistry Year 12',
    grade: 11,
    subject: 'Chemistry',
    description: 'The first year of A level Chemistry (the AS content): atomic structure, amount of substance, bonding, energetics, kinetics, equilibria, redox and a first course in organic chemistry, in the order of a two-year scheme of work.',
    units: [
      { title: 'Atomic Structure', description: 'Protons, neutrons and electrons in atoms and ions, isotopes, and relative atomic mass from isotopic abundances.', members: ['c20-1-1', 'c10-2-2'] },
      { title: 'Amount of Substance', description: 'The mole and the Avogadro constant, empirical and molecular formulae, balanced and ionic equations, reacting masses, the ideal gas equation, concentrations and volumes of solutions, limiting reagents, percentage yield, atom economy and titrations.', members: ['c20-4-3', 'cx-3-1', 'c20-4-1', 'c20-4-2', 'c20-4-4', 'c20-2-7', 'c20-3-4', 'c20-3-5', 'c20-4-5', 'c20-4-6', 'c20-4-7', 'cx-3-2', 'c20-4-8'] },
      { title: 'Bonding', description: 'Ionic, covalent and metallic bonding, electronegativity and bond polarity, the shapes of molecules and ions, the forces between molecules, and how structure decides physical properties.', members: ['c20-1-2', 'c20-1-5', 'c20-1-6', 'c20-1-4', 'c20-1-7', 'c20-1-8', 'c10-3-4'] },
      { title: 'Energetics', description: 'Enthalpy changes, calorimetry, molar enthalpy changes, enthalpy level diagrams, Hess’s law, enthalpies of formation and mean bond enthalpies.', members: ['c30-1-1', 'c30-1-2', 'c30-1-3', 'c30-1-4', 'c30-1-5', 'c30-1-6'] },
      { title: 'Kinetics', description: 'Collision theory, the factors that change the rate of a reaction, activation energy and catalysts.', members: ['c10-4-5', 'c30-1-7'] },
      { title: 'Chemical Equilibria and Kc', description: 'Dynamic equilibrium, Le Chatelier’s principle and the equilibrium constant Kc for homogeneous systems.', members: ['c30-4-1', 'c30-4-3', 'c30-4-2'] },
      { title: 'Oxidation, Reduction and Redox Equations', description: 'Oxidation and reduction as electron transfer, oxidation states, half-equations and how they combine into a redox equation.', members: ['c30-2-1', 'c30-2-2', 'c30-2-4'] },
      { title: 'Introduction to Organic Chemistry', description: 'Molecular, structural, displayed and skeletal formulae, homologous series, IUPAC names, structural isomers and the functional groups.', members: ['c30-3-1', 'c30-3-2', 'c30-3-3', 'c30-3-4'] },
      { title: 'Alkanes, Alkenes and Their Reactions', description: 'Fractional distillation, cracking and the combustion of alkanes, and addition, substitution and elimination reactions.', members: ['c30-3-7', 'c30-3-5'] },
    ],
    gaps: [
      'Time of flight mass spectrometry',
      'Electron configurations in s, p and d sub-shells, and ionisation energies',
      'Dative covalent bonds',
      'The Maxwell–Boltzmann distribution',
      'Periodicity: the trends across Period 3',
      'Group 2, the alkaline earth metals',
      'Group 7, the halogens, and the uses of chlorine',
      'Reaction mechanisms with curly arrows: free-radical substitution, nucleophilic substitution, elimination and electrophilic addition',
      'Halogenoalkanes and ozone depletion',
      'E–Z isomerism',
      'Alcohols: their production, oxidation and elimination',
      'Organic analysis: tests for functional groups, mass spectrometry and infrared spectroscopy',
    ],
  },
  {
    id: 'uk-a-level-chemistry-2',
    title: 'A level Chemistry: Year 13 (UK)',
    shortTitle: 'A level Chemistry Year 13',
    grade: 12,
    subject: 'Chemistry',
    description: 'The second year of A level Chemistry: electrode potentials and cells, acids, bases and buffers, and esters and polymers, in the order of a two-year scheme of work. Most of this year’s inorganic and organic chemistry is still to come.',
    units: [
      { title: 'Electrode Potentials and Electrochemical Cells', description: 'The electrochemical series and predicting redox reactions, cells and their conventional notation, standard cell potentials, electrolysis, and redox titrations with manganate(VII).', members: ['c30-2-3', 'c30-2-6', 'c30-2-7', 'c30-2-8', 'c30-2-5'] },
      { title: 'Acids and Bases', description: 'Brønsted–Lowry acids and bases, pH, strong and weak acids and bases, Ka and Kw, the pH of weak acids, pH curves, indicators and buffer solutions.', members: ['c30-4-4', 'c20-3-7', 'c20-3-8', 'c30-4-5', 'c30-4-6', 'c30-4-7', 'c30-4-8'] },
      { title: 'Esters and Polymers', description: 'Making and naming esters, and addition and condensation polymers with their monomers.', members: ['c30-3-6'] },
    ],
    gaps: [
      'Born–Haber cycles and lattice enthalpies',
      'Entropy and Gibbs free energy',
      'Rate equations, orders of reaction and the Arrhenius equation',
      'The equilibrium constant Kp for gases',
      'Properties of the Period 3 elements and their oxides',
      'Transition metals: complex ions, coloured ions, variable oxidation states and catalysts',
      'Reactions of metal ions in aqueous solution',
      'Optical isomerism',
      'Aldehydes and ketones',
      'Carboxylic acid derivatives and acylation',
      'Aromatic chemistry: benzene and electrophilic substitution',
      'Amines',
      'Amino acids, proteins and DNA',
      'Organic synthesis: planning a route of several steps',
      'Nuclear magnetic resonance spectroscopy, and chromatography',
    ],
  },
];
