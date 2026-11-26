/**
 * More Chemistry Topics, Units 20 to 24: the AP Chemistry topics that Gradileo's grade courses and
 * the earlier More Chemistry units do not teach (the College Board's Course and Exam Description,
 * effective fall 2024). The AP Chemistry map (`maps/us-chemistry.ts`) files each lesson under its
 * AP unit. Every lesson is at the level of a Grade 12 course (`grade: 12`).
 */
import type { LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const AP_OUTCOMES: Outcome[] = [
  { code: 'AC1', strand: 'AP atoms and bonding', text: 'Calculate the mass percent of an element in a compound, and use elemental analysis to find the purity or composition of a mixture.' },
  { code: 'AC2', strand: 'AP atoms and bonding', text: 'Use Coulomb’s law to compare the attractions between charged particles, and interpret photoelectron spectra.' },
  { code: 'AC3', strand: 'AP atoms and bonding', text: 'Interpret a graph of potential energy against internuclear distance, compare ionic interactions with Coulomb’s law, and tell interstitial from substitutional alloys.' },
  { code: 'AC4', strand: 'AP atoms and bonding', text: 'Calculate formal charges to choose the best Lewis structure, and use resonance structures to describe bonds.' },
  { code: 'AC5', strand: 'AP light and spectroscopy', text: 'Relate the energy, frequency and wavelength of a photon, and link each region of the spectrum to the molecular change it causes.' },
  { code: 'AC6', strand: 'AP light and spectroscopy', text: 'Use the Beer–Lambert law and a calibration line to find the concentration of a solution.' },
  { code: 'AC7', strand: 'AP kinetics and phase changes', text: 'Use integrated rate laws and their linear graphs to find orders, rate constants, concentrations and half-lives.' },
  { code: 'AC8', strand: 'AP kinetics and phase changes', text: 'Analyse reaction mechanisms: elementary steps, intermediates and catalysts, the rate law of the slow step, the pre-equilibrium approximation and multistep energy profiles.' },
  { code: 'AC9', strand: 'AP kinetics and phase changes', text: 'Calculate the energy of phase changes from molar enthalpies of fusion and vaporisation, and interpret heating curves.' },
  { code: 'AC10', strand: 'AP equilibrium and acids', text: 'Compare the reaction quotient with the equilibrium constant to predict a shift, and find K for a reversed, multiplied or combined reaction.' },
  { code: 'AC11', strand: 'AP equilibrium and acids', text: 'Explain the relative strengths of acids from their molecular structures, and use pH and pKa to find which form of an acid dominates.' },
  { code: 'AC12', strand: 'AP equilibrium and acids', text: 'Use the Henderson–Hasselbalch equation to find the pH or the ratio of a buffer, and compare the capacities of buffers.' },
  { code: 'AC13', strand: 'AP thermodynamics and electrochemistry', text: 'Relate the standard free energy change to the equilibrium constant, and explain kinetic control, coupled reactions and the free energy of dissolution.' },
  { code: 'AC14', strand: 'AP thermodynamics and electrochemistry', text: 'Relate cell potential to free energy, and predict how a cell’s potential changes under nonstandard conditions.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, grade: 12, outcomes, skills, objectives, minutes: 60, vocabulary });

export const AP_LESSONS: LessonMeta[] = [
  // ---------------- Unit 20: AP Atomic Structure and Bonding ----------------
  L('cx-20-1', 'cx-u20', '20.1', 'Elemental Analysis and Purity', ['AC1'],
    ['cx-ap-mass-percent', 'cx-ap-purity'],
    ['Calculate the mass percent of an element in a compound, and the mass of the element in a sample', 'Find the purity of a sample, or the share of each part of a mixture, from the mass of one element in it'],
    ['mass percent', 'law of definite proportions', 'elemental analysis', 'mixture', 'purity']),
  L('cx-20-2', 'cx-u20', '20.2', 'Coulomb’s Law and Photoelectron Spectroscopy', ['AC2'],
    ['cx-ap-coulomb', 'cx-ap-pes'],
    ['Use Coulomb’s law to compare how strongly the nucleus holds electrons, and explain ionisation energies with it', 'Read a photoelectron spectrum: match each peak to a subshell, and name the element'],
    ['Coulomb’s law', 'core electron', 'valence electron', 'photoelectron spectroscopy', 'binding energy']),
  L('cx-20-3', 'cx-u20', '20.3', 'Bond Energy Curves, Ionic Solids and Alloys', ['AC3'],
    ['cx-ap-bond-curve', 'cx-ap-solids-alloys'],
    ['Read the bond length and bond energy from a graph of potential energy against internuclear distance, and compare bonds by their order', 'Compare the strength of ionic solids with Coulomb’s law, and tell interstitial alloys from substitutional ones'],
    ['potential energy', 'internuclear distance', 'bond length', 'bond energy', 'interstitial alloy', 'substitutional alloy']),
  L('cx-20-4', 'cx-u20', '20.4', 'Resonance and Formal Charge', ['AC4'],
    ['cx-ap-formal-charge', 'cx-ap-resonance'],
    ['Calculate the formal charge of each atom in a Lewis structure, and choose the best of several structures', 'Draw the resonance structures of a molecule or ion, and find the average bond order'],
    ['formal charge', 'resonance', 'resonance structure', 'bond order', 'octet rule']),

  // ---------------- Unit 21: AP Light and Spectroscopy ----------------
  L('cx-21-1', 'cx-u21', '21.1', 'Photons and Spectroscopy', ['AC5'],
    ['cx-ap-photon', 'cx-ap-spectroscopy'],
    ['Use E = hν and c = λν to relate a photon’s energy, frequency and wavelength', 'Link microwave, infrared and ultraviolet or visible light to the rotations, vibrations and electron jumps they cause'],
    ['photon', 'frequency', 'wavelength', 'Planck’s constant', 'spectroscopy', 'electronic transition']),
  L('cx-21-2', 'cx-u21', '21.2', 'The Beer–Lambert Law', ['AC6'],
    ['cx-ap-beer-lambert', 'cx-ap-calibration'],
    ['Use A = εbc to find an absorbance, a concentration or a molar absorptivity', 'Find a concentration from a calibration line, and explain how a spectrophotometer is set up and what upsets its readings'],
    ['absorbance', 'molar absorptivity', 'path length', 'spectrophotometer', 'calibration line']),

  // ---------------- Unit 22: AP Kinetics and Phase Changes ----------------
  L('cx-22-1', 'cx-u22', '22.1', 'Integrated Rate Laws and Half-Life', ['AC7'],
    ['cx-ap-integrated', 'cx-ap-order-graphs'],
    ['Use the integrated rate laws of zero, first and second order to find a concentration, a time or a rate constant', 'Tell the order of a reaction from which graph is a straight line, and use the half-life of a first-order reaction'],
    ['integrated rate law', 'rate constant', 'half-life', 'first order', 'second order', 'zero order']),
  L('cx-22-2', 'cx-u22', '22.2', 'Reaction Mechanisms and Rate Laws', ['AC8'],
    ['cx-ap-mechanism', 'cx-ap-mechanism-rate'],
    ['Find the overall equation, the intermediates and the catalysts of a mechanism, and write the rate law of an elementary step', 'Find the rate law of a mechanism from its slow step, with the pre-equilibrium approximation when the slow step comes second, and read a multistep energy profile'],
    ['elementary step', 'molecularity', 'intermediate', 'rate-determining step', 'pre-equilibrium']),
  L('cx-22-3', 'cx-u22', '22.3', 'Energy of Phase Changes', ['AC9'],
    ['cx-ap-phase-energy', 'cx-ap-heating-curve'],
    ['Calculate the energy taken in or given out when a substance melts, boils, freezes or condenses, and over a whole heating curve', 'Read a heating curve: what each part shows, and why the temperature stays constant during a change of state'],
    ['enthalpy of fusion', 'enthalpy of vaporisation', 'heating curve', 'specific heat capacity', 'phase change']),

  // ---------------- Unit 23: AP Equilibrium and Acids ----------------
  L('cx-23-1', 'cx-u23', '23.1', 'The Reaction Quotient and the Properties of K', ['AC10'],
    ['cx-ap-reaction-quotient', 'cx-ap-k-manipulate'],
    ['Calculate a reaction quotient and compare it with K to predict which way a reaction goes', 'Find K for a reaction that is reversed, multiplied or made by adding other reactions'],
    ['reaction quotient', 'equilibrium constant', 'Le Châtelier’s principle']),
  L('cx-23-2', 'cx-u23', '23.2', 'Acid Strength, Structure and pKa', ['AC11'],
    ['cx-ap-acid-structure', 'cx-ap-protonation'],
    ['Explain which of two acids is stronger from bond strength, electronegativity, inductive effects and resonance', 'Compare the pH with the pKa to find whether the acid or its conjugate base dominates, and choose an indicator'],
    ['conjugate base', 'inductive effect', 'oxyacid', 'pKa', 'protonated']),
  L('cx-23-3', 'cx-u23', '23.3', 'The Henderson–Hasselbalch Equation and Buffer Capacity', ['AC12'],
    ['cx-ap-henderson', 'cx-ap-buffer-capacity'],
    ['Use the Henderson–Hasselbalch equation to find the pH of a buffer, the ratio it needs, and its pH after a little strong acid or base', 'Compare buffers by their capacity to neutralise added acid or base'],
    ['buffer', 'Henderson–Hasselbalch equation', 'buffer capacity', 'conjugate acid–base pair']),

  // ---------------- Unit 24: AP Thermodynamics and Electrochemistry ----------------
  L('cx-24-1', 'cx-u24', '24.1', 'Free Energy and Equilibrium', ['AC13'],
    ['cx-ap-free-energy-k', 'cx-ap-favourability'],
    ['Use ΔG° = −RT ln K to find K from ΔG° or ΔG° from K, and link the sign of ΔG° to the size of K', 'Explain kinetic control, coupled reactions and the free energy of dissolution'],
    ['thermodynamically favoured', 'kinetic control', 'coupled reactions', 'free energy of dissolution']),
  L('cx-24-2', 'cx-u24', '24.2', 'Cell Potential, Free Energy and Nonstandard Conditions', ['AC14'],
    ['cx-ap-cell-free-energy', 'cx-ap-nonstandard'],
    ['Use ΔG° = −nFE° to relate a cell’s standard potential to its free energy change', 'Predict how a cell’s potential changes as its concentrations change, and the direction of a concentration cell'],
    ['cell potential', 'Faraday constant', 'nonstandard conditions', 'Nernst equation', 'concentration cell']),
];

export const AP_UNITS: UnitMeta[] = [
  { id: 'cx-u20', number: 20, title: 'AP Atomic Structure and Bonding', description: 'Elemental analysis and purity, Coulomb’s law and photoelectron spectroscopy, bond energy curves, ionic solids and alloys, and resonance and formal charge.', outcomes: ['AC1', 'AC2', 'AC3', 'AC4'], lessons: [], color: 'sky' },
  { id: 'cx-u21', number: 21, title: 'AP Light and Spectroscopy', description: 'Photons, the regions of the electromagnetic spectrum and what each does to a molecule, and the Beer–Lambert law.', outcomes: ['AC5', 'AC6'], lessons: [], color: 'violet' },
  { id: 'cx-u22', number: 22, title: 'AP Kinetics and Phase Changes', description: 'Integrated rate laws and half-life, reaction mechanisms and their rate laws, and the energy of phase changes.', outcomes: ['AC7', 'AC8', 'AC9'], lessons: [], color: 'amber' },
  { id: 'cx-u23', number: 23, title: 'AP Equilibrium and Acids', description: 'The reaction quotient and the properties of K, acid strength and molecular structure, and the Henderson–Hasselbalch equation and buffer capacity.', outcomes: ['AC10', 'AC11', 'AC12'], lessons: [], color: 'teal' },
  { id: 'cx-u24', number: 24, title: 'AP Thermodynamics and Electrochemistry', description: 'Free energy and equilibrium, kinetic control and coupled reactions, and cell potential, free energy and nonstandard conditions.', outcomes: ['AC13', 'AC14'], lessons: [], color: 'rose' },
];
