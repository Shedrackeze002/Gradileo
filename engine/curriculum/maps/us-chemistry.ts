/**
 * AP Chemistry, the College Board course most US high schools teach in Grade 11 or 12 after a
 * first-year chemistry course. Its nine units follow the AP Chemistry Course and Exam Description
 * (CED), and each unit points to the Gradileo lessons that teach its topics, numbered as in the CED
 * in the descriptions.
 *
 * Gradileo's chemistry was written as three grade courses. The AP units of More Chemistry (chem-more
 * units 20 to 24) fill in the AP topics those courses do not teach, such as photoelectron
 * spectroscopy, the Beer–Lambert law, integrated rate laws and the Henderson–Hasselbalch equation.
 */
import type { MapCourse } from './build.ts';

export const US_CHEMISTRY_COURSES: MapCourse[] = [
  {
    id: 'us-ap-chemistry',
    title: 'AP Chemistry (US)',
    shortTitle: 'AP Chemistry',
    grade: 12,
    subject: 'Chemistry',
    description: 'Atomic structure, bonding and the properties of substances, chemical reactions and stoichiometry, kinetics, thermochemistry, equilibrium, acids and bases, and thermodynamics and electrochemistry, in the order of the nine units of the AP Chemistry course.',
    units: [
      { title: 'Atomic Structure and Properties', description: 'Moles and molar mass, mass spectra of elements, elemental composition and the purity of substances, atomic structure and electron configuration, photoelectron spectroscopy, periodic trends, and valence electrons and ionic compounds (AP topics 1.1 to 1.8).', members: ['c20-4-3', 'c10-2-2', 'cx-7-1', 'cx-3-1', 'cx-20-1', 'c20-1-1', 'cx-20-2', 'cx-7-2', 'cx-8-1'] },
      { title: 'Compound Structure and Properties', description: 'Types of chemical bonds, intramolecular force and potential energy, the structure of ionic solids, metals and alloys, Lewis diagrams, resonance and formal charge, and VSEPR and molecular polarity (AP topics 2.1 to 2.7).', members: ['c20-1-4', 'c20-1-2', 'cx-20-3', 'cx-10-1', 'cx-6-1', 'c20-1-3', 'c20-1-5', 'cx-20-4', 'c20-1-6', 'c20-1-7'] },
      { title: 'Properties of Substances and Mixtures', description: 'Intermolecular forces and the properties of solids, liquids and gases, the ideal gas law and kinetic molecular theory, deviation from ideal behaviour, solutions and their representations, separating mixtures, solubility, spectroscopy and the electromagnetic spectrum, photons and the Beer–Lambert law (AP topics 3.1 to 3.13).', members: ['c20-1-8', 'c10-3-4', 'cx-5-3', 'c10-1-1', 'c20-2-1', 'c20-2-5', 'c20-2-6', 'c20-2-7', 'c20-3-1', 'c20-3-4', 'c20-3-5', 'c10-1-3', 'cx-12-8', 'cx-21-1', 'cx-21-2'] },
      { title: 'Chemical Reactions', description: 'Physical and chemical changes, net ionic equations, representations of reactions, stoichiometry, titration, types of chemical reactions and precipitation, and acid–base and oxidation–reduction reactions (AP topics 4.1 to 4.9).', members: ['c10-4-1', 'c10-1-4', 'c20-4-1', 'c20-4-2', 'c20-3-2', 'c20-4-4', 'c20-4-5', 'c20-4-6', 'c20-4-7', 'c20-4-8', 'c30-4-4', 'c30-2-1', 'c30-2-2', 'c30-2-4'] },
      { title: 'Kinetics', description: 'Reaction rates, rate laws, concentration changes over time, elementary reactions and the collision model, reaction energy profiles, mechanisms and their rate laws, the steady-state and pre-equilibrium approximations, multistep energy profiles and catalysis (AP topics 5.1 to 5.11).', members: ['c10-4-5', 'cx-10-3', 'cx-22-1', 'cx-7-4', 'cx-22-2', 'c30-1-7'] },
      { title: 'Thermochemistry', description: 'Endothermic and exothermic processes, energy diagrams, heat transfer and thermal equilibrium, heat capacity and calorimetry, the energy of phase changes, enthalpy of reaction, bond enthalpies, enthalpy of formation and Hess’s law (AP topics 6.1 to 6.9).', members: ['c30-1-1', 'c30-1-4', 'c30-1-2', 'c30-1-3', 'cx-22-3', 'c30-1-6', 'c30-1-5'] },
      { title: 'Equilibrium', description: 'Reversible reactions and dynamic equilibrium, the reaction quotient and the equilibrium constant, Kc and Kp, the properties of K and calculating equilibrium concentrations, and Le Chatelier’s principle (AP topics 7.1 to 7.10).', members: ['c30-4-1', 'c30-4-2', 'cx-10-4', 'cx-23-1', 'c30-4-3'] },
      { title: 'Acids and Bases', description: 'pH and pOH of strong and weak acids and bases, acid–base reactions and titrations, molecular structure and acid strength, pH and pKa, buffers, the Henderson–Hasselbalch equation and buffer capacity (AP topics 8.1 to 8.10).', members: ['c20-3-7', 'c20-3-8', 'c30-4-6', 'c30-4-7', 'c30-4-5', 'cx-23-2', 'c30-4-8', 'cx-23-3'] },
      { title: 'Thermodynamics and Electrochemistry', description: 'Entropy and Gibbs free energy, thermodynamic and kinetic control, free energy and equilibrium, coupled reactions, galvanic and electrolytic cells, cell potential and free energy, cell potential under nonstandard conditions, and electrolysis and Faraday’s law (AP topics 9.1 to 9.11).', members: ['cx-10-2', 'cx-24-1', 'c30-2-6', 'c30-2-7', 'cx-24-2', 'c30-2-8'] },
    ],
    gaps: [
      'Hybridisation and sigma and pi bonds (AP topic 2.7)',
      'Solubility equilibria, Ksp and the common-ion effect (AP topics 7.11 and 7.12)',
      'pH and solubility (AP topic 8.11)',
    ],
  },
];
