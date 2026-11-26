/**
 * WASSCE Chemistry, the West African Examinations Council's syllabus for senior secondary school in
 * Nigeria (SS 1 to SS 3), Ghana (SHS 1 to SHS 3), Sierra Leone, The Gambia and Liberia.
 *
 * The syllabus has three parts: Section A for every candidate, Section B for Ghana only, and Section
 * C for the other countries. The three courses follow the order in which a senior secondary scheme of
 * work meets the Section A topics, and each unit names its Ghana or Section C parts in its
 * description. Gradileo's chemistry was written as grade courses; the More Chemistry course (units
 * 13 to 19) fills in the WASSCE topics they leave out, and nuclear chemistry uses the Physics 30
 * lessons on the nucleus, so no course lists a gap.
 */
import type { MapCourse } from './build.ts';

export const WAEC_CHEMISTRY_COURSES: MapCourse[] = [
  {
    id: 'waec-chem-ss-1',
    title: 'WASSCE Chemistry: SS 1 (WAEC)',
    shortTitle: 'WASSCE Chemistry SS 1',
    grade: 10,
    subject: 'Chemistry',
    description: 'The first year of senior secondary Chemistry (SS 1, or SHS 1 in Ghana): measurement and the scientific method, matter and separating mixtures, the structure of the atom, chemical bonds, stoichiometry and the laws of chemical combination, and the states of matter with the gas laws, in the order of a WASSCE scheme of work.',
    units: [
      { title: 'Introduction to Chemistry', description: 'Measurement, SI units and significant figures, accuracy and precision, the scientific method, and safety in the laboratory.', members: ['cx-13-1', 'c10-1-5'] },
      { title: 'Particulate Nature of Matter', description: 'Atoms, molecules and ions, elements, compounds and mixtures, and physical and chemical changes.', members: ['c8-1-2', 'c10-1-4'] },
      { title: 'Separation Techniques for Mixtures', description: 'Pure substances and mixtures, filtration, crystallisation, distillation, chromatography and the other ways of separating mixtures, and the tests of purity.', members: ['c10-1-2', 'c7-4-1', 'c10-1-3', 'c7-4-3', 'cx-2-1'] },
      { title: 'Structure of the Atom', description: 'The development of the atomic model, protons, neutrons and electrons, isotopes and relative atomic mass, electron shells, and s, p and d orbitals with the Aufbau principle, Hund’s rule and the Pauli principle. For Ghana, the mass spectrometer and quantum numbers.', members: ['cx-5-1', 'c10-2-1', 'c10-2-2', 'c10-2-3', 'cx-13-3', 'cx-7-1'] },
      { title: 'Chemical Bonds', description: 'Lewis structures, ionic bonds and ionic compounds, covalent and dative bonds, the shapes of molecules, metallic bonding, electronegativity and polar molecules, and the forces between molecules. For Ghana, hybridisation and sigma and pi bonds.', members: ['c20-1-5', 'c10-3-1', 'c10-3-2', 'c20-1-2', 'c10-3-3', 'c20-1-3', 'cx-7-3', 'c20-1-6', 'cx-13-4', 'c20-1-4', 'c20-1-7', 'c20-1-8', 'c10-3-4'] },
      { title: 'Stoichiometry and Chemical Reactions', description: 'Writing and balancing equations, types of reactions, the laws of conservation of mass, constant composition and multiple proportions, Gay-Lussac’s law, the mole and molar mass, empirical and molecular formulae, reacting masses and percentage yield.', members: ['c10-4-1', 'c10-4-2', 'c10-4-3', 'cx-13-2', 'c10-5-1', 'c10-5-2', 'cx-3-1', 'c20-4-4', 'c20-4-7'] },
      { title: 'States of Matter', description: 'The kinetic theory and its evidence, vapour pressure and boiling, diffusion and Graham’s law, the gas laws, the molar volume, Dalton’s law of partial pressures, preparing and collecting gases, and the forms of carbon.', members: ['c10-1-1', 'c7-2-4', 'cx-14-2', 'c20-2-1', 'c20-2-3', 'c20-2-4', 'c20-2-5', 'c20-2-6', 'c20-2-7', 'cx-14-1', 'cx-14-3', 'cx-5-3'] },
    ],
    gaps: [],
  },
  {
    id: 'waec-chem-ss-2',
    title: 'WASSCE Chemistry: SS 2 (WAEC)',
    shortTitle: 'WASSCE Chemistry SS 2',
    grade: 11,
    subject: 'Chemistry',
    description: 'The second year of senior secondary Chemistry (SS 2, or SHS 2 in Ghana): periodic chemistry, solutions, acids, bases and salts, solubility, energy changes, rates and equilibrium, redox and electrochemistry, and the non-metals and their compounds, in the order of a WASSCE scheme of work.',
    units: [
      { title: 'Periodic Chemistry', description: 'The periodic table and its families, trends in atomic size, ionisation energy and electronegativity, the Period 3 elements and their oxides, the alkaline earth metals, and the transition metals. For Ghana, silicon and the thermal stability of carbonates and nitrates.', members: ['c10-2-4', 'c10-2-5', 'c20-1-1', 'cx-7-2', 'cx-8-1', 'cx-11-1', 'cx-8-2', 'cx-5-2', 'cx-11-2', 'cx-18-5'] },
      { title: 'Solutions', description: 'Solutions and electrolytes, molar and mass concentration, dilution, and standard solutions. For Ghana, preparing stock solutions from concentrated reagents.', members: ['c20-3-1', 'c20-3-4', 'c20-3-5', 'cx-15-1'] },
      { title: 'Acids, Bases and Salts', description: 'Acids, bases and indicators, the pH scale, strong and weak acids, neutralisation and titration, types of salts and their preparation, salt hydrolysis, and deliquescent, efflorescent and hygroscopic substances.', members: ['c9-4-1', 'c10-5-3', 'c20-3-6', 'c20-3-7', 'c20-3-8', 'c20-4-8', 'cx-1-3', 'cx-15-2'] },
      { title: 'Solubility of Substances', description: 'Saturated solutions, solubility in g dm⁻³ and mol dm⁻³, solubility curves and crystallisation, and precipitation.', members: ['c7-3-3', 'cx-15-3', 'c20-3-2'] },
      { title: 'Energy and Energy Changes', description: 'Exothermic and endothermic reactions, energy profiles and bond energies, calorimetry, and molar enthalpies of combustion, solution and neutralisation.', members: ['c10-4-4', 'c30-1-1', 'c30-1-2', 'c30-1-3'] },
      { title: 'Chemical Kinetics and Equilibrium', description: 'Rates of reaction and the factors that change them, collision theory, activation energy and catalysts, the Maxwell–Boltzmann distribution, dynamic equilibrium, the equilibrium constant and Le Chatelier’s principle.', members: ['c10-4-5', 'c30-1-7', 'cx-7-4', 'c30-4-1', 'c30-4-2', 'c30-4-3'] },
      { title: 'Redox Reactions', description: 'Oxidation and reduction, oxidation numbers, balancing redox equations, predicting redox reactions, and redox titrations.', members: ['c30-2-1', 'c30-2-2', 'c30-2-4', 'c30-2-3', 'c30-2-5'] },
      { title: 'Electrochemical Cells and Electrolysis', description: 'Voltaic cells and standard electrode potentials, batteries and fuel cells, electrolysis of molten and aqueous electrolytes, Faraday’s laws, and corrosion.', members: ['c30-2-6', 'c30-2-7', 'cx-6-3', 'cx-1-4', 'c30-2-8', 'cx-6-1'] },
      { title: 'Non-metals and Their Compounds', description: 'For Nigeria, Sierra Leone, Liberia and The Gambia (Section C): hydrogen, oxygen and the classes of oxides, water, hardness and its treatment, the halogens and hydrogen chloride, nitrogen, ammonia and the Haber process, nitric acid, sulfur and the Contact process, and carbon, coal and the oxides of carbon.', members: ['cx-17-1', 'cx-17-2', 'cx-4-3', 'cx-8-3', 'cx-17-3', 'cx-6-2', 'cx-17-4', 'cx-17-5'] },
    ],
    gaps: [],
  },
  {
    id: 'waec-chem-ss-3',
    title: 'WASSCE Chemistry: SS 3 (WAEC)',
    shortTitle: 'WASSCE Chemistry SS 3',
    grade: 12,
    subject: 'Chemistry',
    description: 'The third year of senior secondary Chemistry (SS 3, or SHS 3 in Ghana): organic chemistry, biochemistry and polymers, metals and their compounds, chemistry in industry and the environment, nuclear chemistry, and qualitative and quantitative analysis, with the Ghana extension topics in their own units, in the order of a WASSCE scheme of work.',
    units: [
      { title: 'Chemistry of Carbon Compounds', description: 'Organic compounds and their formulae, naming hydrocarbons, isomers and functional groups, crude oil and petrol quality, purifying and analysing organic compounds, alkanes, alkenes, alkynes and benzene, alcohols, acids and esters, and addition and substitution reactions. For Ghana, reaction mechanisms, bond fission and the inductive and mesomeric effects.', members: ['c30-3-1', 'c30-3-2', 'c30-3-3', 'c30-3-4', 'c30-3-7', 'cx-19-2', 'cx-19-5', 'c30-3-5', 'cx-9-3', 'cx-19-1', 'cx-12-4', 'cx-9-4', 'c30-3-6', 'cx-9-1', 'cx-9-2', 'cx-19-6'] },
      { title: 'Basic Biochemistry and Synthetic Polymers', description: 'Fats, oils, soaps and detergents, carbohydrates and the tests for food molecules, amino acids and proteins, and addition and condensation polymers and their uses.', members: ['cx-19-3', 'cx-19-4', 'cx-12-6', 'c8-4-4'] },
      { title: 'Metals and Their Compounds', description: 'The reactivity series, extracting metals, and for Section C the extraction of aluminium, iron and tin, alloys, and the compounds of sodium, calcium and copper with the reactions of iron and aluminium.', members: ['cx-1-1', 'cx-1-2', 'cx-18-1', 'c8-4-3', 'cx-18-2'] },
      { title: 'Chemistry, Industry and the Environment', description: 'The chemical industry, heavy and fine chemicals, fermentation and biotechnology, air pollution and greenhouse gases, and for Ghana, mining and processing minerals and making cement.', members: ['cx-18-3', 'cx-4-2', 'cx-18-4'] },
      { title: 'Nuclear Chemistry', description: 'For Ghana: nucleons and nuclides, alpha, beta and gamma radiation, radioactive decay and half-life, and nuclear fission and fusion.', members: ['p30-4-4', 'p30-4-5', 'p30-4-6', 'p30-4-7'] },
      { title: 'Energetics', description: 'For Ghana: enthalpy changes and their notation, Hess’s law, enthalpies of formation, and Born–Haber cycles with lattice energy.', members: ['c30-1-4', 'c30-1-5', 'c30-1-6', 'cx-10-1'] },
      { title: 'Acids, Bases and Buffers', description: 'For Ghana: Brønsted–Lowry and Lewis acids and bases, complex ions and their names, Ka, Kb and the pH of weak acids, buffers and titration curves.', members: ['c30-4-4', 'c30-4-5', 'cx-18-6', 'c30-4-6', 'c30-4-7', 'c30-4-8'] },
      { title: 'Solubility Product', description: 'For Ghana: Ksp, molar solubility, predicting precipitation, the common ion effect, and the effect of pH.', members: ['cx-15-4'] },
      { title: 'Rate Laws and Equilibrium Constants', description: 'For Ghana: rate equations and orders of reaction, the Arrhenius equation, and Kp.', members: ['cx-10-3', 'cx-10-4'] },
      { title: 'Qualitative and Quantitative Analysis', description: 'The tests for cations, anions and gases, identifying ions in solution, and for Ghana, back titrations and double indicator titrations.', members: ['cx-16-1', 'cx-2-2', 'cx-16-2'] },
    ],
    gaps: [],
  },
];
