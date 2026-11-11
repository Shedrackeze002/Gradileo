/**
 * UK chemistry as schools in England teach it.
 *
 * GCSE Chemistry in Years 10 and 11: one course for both tiers. Each unit points to the Gradileo
 * lessons that teach its part of the GCSE subject content, under the topic names schemes of work
 * use, with the Higher tier and separate-science parts named in the descriptions.
 *
 * A level Chemistry in Years 12 and 13: the first year (the AS content) and the second, each in
 * the usual three strands of physical, inorganic and organic chemistry. Gradileo's chemistry was
 * written as three grade courses; the More Chemistry course fills in the rest of both years, so
 * neither A level course lists a gap.
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
    description: 'The first year of A level Chemistry (the AS content): atomic structure, amount of substance, bonding, energetics, kinetics, equilibria, redox, periodicity, Groups 2 and 7, and organic chemistry from mechanisms to analysis, in the order of a two-year scheme of work.',
    units: [
      { title: 'Atomic Structure', description: 'Protons, neutrons and electrons in atoms and ions, isotopes, time of flight mass spectrometry and relative atomic mass from isotopic abundances, electron configurations in s, p and d sub-shells, and ionisation energies.', members: ['c20-1-1', 'c10-2-2', 'cx-7-1', 'cx-7-2'] },
      { title: 'Amount of Substance', description: 'The mole and the Avogadro constant, empirical and molecular formulae, balanced and ionic equations, reacting masses, the ideal gas equation, concentrations and volumes of solutions, limiting reagents, percentage yield, atom economy and titrations.', members: ['c20-4-3', 'cx-3-1', 'c20-4-1', 'c20-4-2', 'c20-4-4', 'c20-2-7', 'c20-3-4', 'c20-3-5', 'c20-4-5', 'c20-4-6', 'c20-4-7', 'cx-3-2', 'c20-4-8'] },
      { title: 'Bonding', description: 'Ionic, covalent, dative covalent and metallic bonding, electronegativity and bond polarity, the shapes of molecules and ions, the forces between molecules, and how structure decides physical properties.', members: ['c20-1-2', 'cx-7-3', 'c20-1-5', 'c20-1-6', 'c20-1-4', 'c20-1-7', 'c20-1-8', 'c10-3-4'] },
      { title: 'Energetics', description: 'Enthalpy changes, calorimetry, molar enthalpy changes, enthalpy level diagrams, Hess’s law, enthalpies of formation and mean bond enthalpies.', members: ['c30-1-1', 'c30-1-2', 'c30-1-3', 'c30-1-4', 'c30-1-5', 'c30-1-6'] },
      { title: 'Kinetics', description: 'Collision theory, the Maxwell–Boltzmann distribution, the factors that change the rate of a reaction, activation energy and catalysts.', members: ['c10-4-5', 'cx-7-4', 'c30-1-7'] },
      { title: 'Chemical Equilibria and Kc', description: 'Dynamic equilibrium, Le Chatelier’s principle and the equilibrium constant Kc for homogeneous systems.', members: ['c30-4-1', 'c30-4-3', 'c30-4-2'] },
      { title: 'Oxidation, Reduction and Redox Equations', description: 'Oxidation and reduction as electron transfer, oxidation states, half-equations and how they combine into a redox equation.', members: ['c30-2-1', 'c30-2-2', 'c30-2-4'] },
      { title: 'Periodicity', description: 'The classification of elements into s, p and d blocks, and the trends in atomic radius, first ionisation energy and melting point across Period 3.', members: ['cx-8-1'] },
      { title: 'Group 2, the Alkaline Earth Metals', description: 'The trends down Group 2, the reactions of the metals with water, the solubilities of the hydroxides and sulfates, the uses of Group 2 compounds and the test for sulfate ions.', members: ['cx-8-2'] },
      { title: 'Group 7, the Halogens', description: 'The trends down Group 7, displacement reactions, the halide ions as reducing agents, the silver nitrate test, and the reactions and uses of chlorine.', members: ['cx-8-3'] },
      { title: 'Introduction to Organic Chemistry', description: 'Molecular, structural, displayed and skeletal formulae, homologous series, IUPAC names, structural isomers, the functional groups, and reaction mechanisms with curly arrows.', members: ['c30-3-1', 'c30-3-2', 'c30-3-3', 'c30-3-4', 'cx-9-1'] },
      { title: 'Alkanes and Halogenoalkanes', description: 'Fractional distillation, cracking and the combustion of alkanes, free-radical substitution, the nucleophilic substitution and elimination reactions of halogenoalkanes, and ozone depletion.', members: ['c30-3-7', 'cx-9-2'] },
      { title: 'Alkenes', description: 'The addition reactions of alkenes by electrophilic addition, E–Z isomerism, and addition polymers.', members: ['c30-3-5', 'cx-9-3'] },
      { title: 'Alcohols', description: 'Making ethanol by fermentation and by hydrating ethene, classifying alcohols, and their oxidation and dehydration.', members: ['cx-9-4'] },
      { title: 'Organic Analysis', description: 'Chemical tests for functional groups, mass spectrometry and high-resolution masses, and infrared spectroscopy.', members: ['cx-9-5'] },
    ],
    gaps: [],
  },
  {
    id: 'uk-a-level-chemistry-2',
    title: 'A level Chemistry: Year 13 (UK)',
    shortTitle: 'A level Chemistry Year 13',
    grade: 12,
    subject: 'Chemistry',
    description: 'The second year of A level Chemistry: thermodynamics, rate equations, Kp, electrode potentials and acids and bases; the Period 3 oxides, transition metals and metal aqua ions; and optical isomerism, carbonyl and aromatic chemistry, amines, polymers, biochemistry, synthesis and NMR, in the order of a two-year scheme of work.',
    units: [
      { title: 'Thermodynamics', description: 'Born–Haber cycles, lattice enthalpies and the perfect ionic model, enthalpies of solution and hydration, entropy, and Gibbs free energy and feasibility.', members: ['cx-10-1', 'cx-10-2'] },
      { title: 'Rate Equations', description: 'Orders of reaction and rate equations, the units of the rate constant, the rate-determining step, and the Arrhenius equation and its graph.', members: ['cx-10-3'] },
      { title: 'The Equilibrium Constant Kp', description: 'Mole fractions and partial pressures, calculating Kp and its units, and how temperature, pressure and catalysts affect it.', members: ['cx-10-4'] },
      { title: 'Electrode Potentials and Electrochemical Cells', description: 'The electrochemical series and predicting redox reactions, cells and their conventional notation, standard cell potentials, electrolysis, and redox titrations with manganate(VII).', members: ['c30-2-3', 'c30-2-6', 'c30-2-7', 'c30-2-8', 'c30-2-5'] },
      { title: 'Acids and Bases', description: 'Brønsted–Lowry acids and bases, pH, strong and weak acids and bases, Ka and Kw, the pH of weak acids, pH curves, indicators and buffer solutions.', members: ['c30-4-4', 'c20-3-7', 'c20-3-8', 'c30-4-5', 'c30-4-6', 'c30-4-7', 'c30-4-8'] },
      { title: 'Properties of Period 3 Elements and Their Oxides', description: 'The reactions of the Period 3 elements with water and oxygen, the structure and bonding of their oxides, and their acid–base reactions, including amphoteric aluminium oxide.', members: ['cx-11-1'] },
      { title: 'Transition Metals', description: 'Complex ions, ligands and coordination numbers, the shapes of complexes, why they are coloured, colorimetry, the oxidation states of vanadium, and transition metals as catalysts.', members: ['cx-11-2'] },
      { title: 'Reactions of Ions in Aqueous Solution', description: 'The acidity of metal aqua ions, their reactions with hydroxide, ammonia and carbonate, ligand substitution and the chelate effect.', members: ['cx-11-3'] },
      { title: 'Optical Isomerism', description: 'Chiral centres, enantiomers, optical activity and racemic mixtures.', members: ['cx-12-1'] },
      { title: 'Aldehydes and Ketones', description: 'Telling aldehydes from ketones, reduction with NaBH₄, nucleophilic addition and hydroxynitriles.', members: ['cx-12-2'] },
      { title: 'Carboxylic Acids and Derivatives', description: 'Esters and their hydrolysis, soaps and biodiesel, and acylation with acyl chlorides and acid anhydrides by nucleophilic addition–elimination.', members: ['cx-12-3'] },
      { title: 'Aromatic Chemistry', description: 'The structure and stability of benzene, and electrophilic substitution: nitration and Friedel–Crafts acylation.', members: ['cx-12-4'] },
      { title: 'Amines', description: 'Classifying amines, their base strengths, quaternary ammonium salts, and making amines from halogenoalkanes, nitriles and nitro compounds.', members: ['cx-12-5'] },
      { title: 'Polymers', description: 'Addition polymers, and condensation polymers such as polyesters and polyamides, with their monomers.', members: ['c30-3-6'] },
      { title: 'Amino Acids, Proteins and DNA', description: 'Amino acids at different pH, peptide links and protein structure, enzymes, the structure of DNA, and the action of cisplatin.', members: ['cx-12-6'] },
      { title: 'Organic Synthesis', description: 'The reagents and conditions for each change of functional group, and planning routes of several steps.', members: ['cx-12-7'] },
      { title: 'NMR Spectroscopy and Chromatography', description: 'Carbon-13 and proton NMR, chemical shift, integration and splitting, and thin-layer, column and gas chromatography.', members: ['cx-12-8'] },
    ],
    gaps: [],
  },
];
