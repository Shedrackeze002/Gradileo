/**
 * Grade 12 Chemistry, Unit 1: thermochemical changes. Energy in chemical systems, calorimetry,
 * molar enthalpy and the ways an enthalpy change is communicated (lessons 1.1 to 1.4, here), then
 * Hess's law, enthalpies of formation, and activation energy and catalysts (lessons 1.5 to 1.7, in
 * thermo-enthalpy.ts). Every question states the values it uses; enthalpy changes come from one
 * table of formation enthalpies (thermo-data.ts), so the questions agree with each other.
 */
import { fixedChoice, mc, mcFigures, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { parseFormula } from '../../../chem/formula.ts';
import { fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { ENTHALPY_SKILLS } from './thermo-enthalpy.ts';
import {
  $, aAn, answer, C_WATER, cap, cShown, cText, degC, DH, DHM, dHr, dpFor, enthalpyFigure, eqMd, IDENTIFIABLE, JGC, L, MATERIALS, mm, mmText,
  parseEq, q, sf, sideUni, sig, signed, t1, uniSigned, w, WATER, WATER_C_TEXT, type Eq, type Material,
} from './thermo-data.ts';

const A1 = ['12-A1'];
const EXO_ENDO = ['Exothermic', 'Endothermic'];
const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
/** "a, b and c" */
const listAnd = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const WITH_SIGN = 'Give it with its sign';

// ---------------------------------------------------------------------------- lesson 1.1: energy in chemical systems

const SCENES: Array<{ text: string; system: string[]; surroundings: string[] }> = [
  {
    text: 'Zinc powder is stirred into copper(II) sulfate solution in a polystyrene cup, and a thermometer records the temperature.',
    system: ['the zinc atoms', 'the copper(II) ions', 'the copper metal that forms', 'the zinc ions that form'],
    surroundings: ['the water the ions are dissolved in', 'the polystyrene cup', 'the thermometer', 'the air above the cup'],
  },
  {
    text: 'Methane burns in a laboratory burner under a metal can of water.',
    system: ['the methane', 'the oxygen that reacts with the methane', 'the carbon dioxide that forms', 'the water vapour that forms'],
    surroundings: ['the water in the can', 'the metal can', 'the burner', 'the air in the room'],
  },
  {
    text: 'Ammonium nitrate dissolves in the water of an instant cold pack.',
    system: ['the ammonium nitrate', 'the ammonium ions released as it dissolves', 'the nitrate ions released as it dissolves'],
    surroundings: ['the water in the pack', 'the plastic bag of the pack', 'the injured wrist the pack is held against'],
  },
  {
    text: 'A strip of magnesium burns in air with a bright white flame.',
    system: ['the magnesium', 'the oxygen that reacts with the magnesium', 'the magnesium oxide that forms'],
    surroundings: ['the air around the flame', 'the tongs holding the strip', 'the bench below the flame'],
  },
  {
    text: 'Octane burns in the cylinder of a car engine.',
    system: ['the octane', 'the oxygen that reacts with the octane', 'the carbon dioxide and water that form'],
    surroundings: ['the walls of the cylinder', 'the piston', 'the coolant around the engine'],
  },
  {
    text: 'Glucose reacts with oxygen in a muscle cell during respiration.',
    system: ['the glucose', 'the oxygen that reacts with the glucose', 'the carbon dioxide and water that form'],
    surroundings: ['the rest of the cell', 'the blood flowing past the cell', 'the rest of the body'],
  },
  {
    text: 'Hydrochloric acid is neutralised by sodium hydroxide solution in a calorimeter.',
    system: ['the hydronium ions from the acid', 'the hydroxide ions from the base', 'the water molecules that the reaction forms'],
    surroundings: ['the water the acid and base were dissolved in', 'the calorimeter cup', 'the thermometer and stirrer'],
  },
];

const ENERGY_QS: Array<{ ask: string; right: string; wrong: string[]; why: string; boundary?: boolean }> = [
  {
    ask: 'The water in a calorimeter warms from $20.0^\\circ\\text{C}$ to $26.5^\\circ\\text{C}$. What has increased?',
    right: 'The average kinetic energy of the water molecules',
    wrong: ['The potential energy stored in the bonds of the water molecules', 'The number of water molecules', 'The strength of the bonds inside each water molecule'],
    why: 'Temperature measures the average kinetic energy of the particles. A rise in temperature means the water molecules are moving faster.',
  },
  {
    ask: 'Before a fuel burns, where is the energy that it will release?',
    right: 'Stored as potential energy in the bonds and arrangement of the atoms of the fuel and oxygen',
    wrong: ['Stored as kinetic energy in the fast-moving fuel molecules', 'Stored as heat inside the fuel molecules', 'It does not exist yet; the flame creates it'],
    why: 'Chemical energy is potential energy: it depends on how the atoms and electrons are arranged. Burning rearranges them into products with less potential energy.',
  },
  {
    ask: 'What is the enthalpy, $H$, of a chemical system?',
    right: 'The total kinetic and potential energy of the system, at constant pressure',
    wrong: ['The temperature of the system', 'The heat the system gives out when it reacts', 'Only the energy stored in the bonds of the system'],
    why: 'Enthalpy is the total energy of the system: the kinetic energy of its moving particles and the potential energy of their bonds and attractions.',
  },
  {
    ask: 'Why do chemists measure enthalpy changes, $\\Delta H$, rather than enthalpies, $H$?',
    right: 'The total enthalpy of a system cannot be measured, but the energy it gains or loses can be',
    wrong: ['Enthalpy changes are always positive, so they are easier to use', 'Every substance has the same enthalpy, so only changes differ', 'Enthalpy can only be measured at absolute zero'],
    why: 'No instrument measures the total energy of a substance, but a calorimeter measures the energy that moves into or out of it.',
  },
  {
    ask: 'Zinc reacts with hydrochloric acid in an open beaker, and hydrogen gas bubbles off into the room. What kind of system is this?',
    right: 'An open system: matter and energy can both cross its boundary',
    wrong: ['A closed system: only energy can cross its boundary', 'An isolated system: neither matter nor energy can cross its boundary', 'A closed system: only matter can cross its boundary'],
    why: 'Hydrogen leaves the beaker and heat moves to the air, so both matter and energy cross the boundary: an open system.',
    boundary: true,
  },
  {
    ask: 'A reaction takes place in a sealed glass flask, and the flask becomes warm to the touch. What kind of system is this?',
    right: 'A closed system: energy can cross its boundary, but matter cannot',
    wrong: ['An open system: matter and energy can both cross its boundary', 'An isolated system: neither matter nor energy can cross its boundary', 'A closed system: matter can cross its boundary, but energy cannot'],
    why: 'The seal keeps the matter in, but heat passes through the glass: a closed system.',
    boundary: true,
  },
  {
    ask: 'A perfectly insulated, sealed container lets neither heat nor matter in or out. What kind of system is this?',
    right: 'An isolated system',
    wrong: ['An open system', 'A closed system', 'A surroundings system'],
    why: 'When neither matter nor energy can cross the boundary, the system is isolated. A good calorimeter is designed to come close to this.',
    boundary: true,
  },
  {
    ask: 'In an exothermic reaction, what happens to the potential energy of the chemical system?',
    right: 'It decreases, and the energy released warms the surroundings',
    wrong: ['It increases, and the surroundings cool down', 'It stays the same, because energy is conserved', 'It is turned into extra particles'],
    why: 'The products have less potential energy than the reactants. The difference is released and raises the kinetic energy of the particles around them.',
  },
  {
    ask: 'Ice at $0^\\circ\\text{C}$ melts to water at $0^\\circ\\text{C}$. Which energy of the water molecules increases?',
    right: 'Their potential energy, as the attractions between the molecules are partly overcome',
    wrong: ['Their average kinetic energy, because they move faster', 'Neither: the temperature stays the same, so no energy is absorbed', 'The energy of the covalent bonds inside each molecule'],
    why: 'The temperature does not change, so the average kinetic energy stays the same. The energy absorbed separates the molecules, raising their potential energy.',
  },
];

const FLOWS: Array<{ text: string; exo: boolean }> = [
  { text: 'Methane burns in a laboratory burner and heats a beaker of water.', exo: true },
  { text: 'Calcium chloride dissolves in water in a polystyrene cup, and the water gets warmer.', exo: true },
  { text: 'Iron powder in a hand warmer reacts with oxygen from the air, and the hand warmer gets hot.', exo: true },
  { text: 'Sodium hydroxide solution neutralises hydrochloric acid in a calorimeter, and the temperature rises.', exo: true },
  { text: 'Ammonium nitrate dissolves in the water of a cold pack, and the water gets colder.', exo: false },
  { text: 'Solid barium hydroxide and solid ammonium chloride react in a flask, and the flask becomes cold.', exo: false },
  { text: 'Potassium nitrate dissolves in water in a calorimeter, and the temperature falls.', exo: false },
];

function systemEnergy(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const s = rng.pick(SCENES);
    const askSystem = rng.chance(0.5);
    const right = rng.pick(askSystem ? s.system : s.surroundings);
    const wrong = rng.shuffle(askSystem ? s.surroundings : s.system).slice(0, 3);
    return {
      prompt: `${s.text} Which of these is part of the ${askSystem ? 'chemical system' : 'surroundings'}?`,
      parts: [part(mc(rng, cap(right), wrong.map(cap)))],
      hints: ['The chemical system is the substances that react and the products they form.', 'Everything else, including any water the chemicals are dissolved in, the container, the thermometer and the air, is the surroundings.'],
      solution: [`The system is the reacting substances: ${listAnd(s.system)}.`, `The surroundings are everything else: ${listAnd(s.surroundings)}.`, `${cap(right)}: part of the ${askSystem ? 'system' : 'surroundings'}.`],
    };
  }
  if (d === 2) {
    const e = rng.pick(ENERGY_QS);
    return {
      prompt: e.ask,
      parts: [part(mc(rng, e.right, e.wrong))],
      hints: e.boundary
        ? ['Ask what can cross the boundary of the system: matter, energy, both or neither.', 'An open system exchanges matter and energy with its surroundings, a closed system only energy, and an isolated system neither.']
        : ['Kinetic energy is the energy of moving particles; temperature measures its average.', 'Potential energy is stored in chemical bonds and in the attractions between particles.'],
      solution: [e.why, `${e.right}.`],
    };
  }
  const f = rng.pick(FLOWS);
  const pick = <T>(pair: [T, T]) => (rng.chance(0.5) ? pair[0] : pair[1]);
  const statements = [
    pick([{ md: 'The potential energy of the chemical system decreases.', correct: f.exo }, { md: 'The potential energy of the chemical system increases.', correct: !f.exo }]),
    pick([{ md: 'The particles of the surroundings gain kinetic energy.', correct: f.exo }, { md: 'The particles of the surroundings lose kinetic energy.', correct: !f.exo }]),
    pick([{ md: 'The enthalpy change of the system, $\\Delta H$, is negative.', correct: f.exo }, { md: 'The enthalpy change of the system, $\\Delta H$, is positive.', correct: !f.exo }]),
    f.exo
      ? { md: 'The energy lost by the system equals the energy gained by the surroundings.', correct: true }
      : { md: 'The energy gained by the system equals the energy lost by the surroundings.', correct: true },
    f.exo ? { md: 'Energy is created as the products form.', correct: false } : { md: 'Energy is destroyed as the reactants absorb heat.', correct: false },
  ];
  return {
    prompt: `${f.text} Select every true statement.`,
    parts: [part(multi(rng, statements))],
    hints: ['Decide first whether energy flows out of the chemical system or into it.', 'Energy is conserved: whatever the system loses, the surroundings gain, and the other way round.', 'A system that loses energy has a negative enthalpy change.'],
    solution: [
      f.exo ? 'The surroundings get warmer, so energy flows out of the system: the change is exothermic.' : 'The surroundings get colder, so energy flows into the system: the change is endothermic.',
      f.exo
        ? 'The potential energy of the system decreases, the particles of the surroundings gain kinetic energy, and $\\Delta H$ is negative.'
        : 'The potential energy of the system increases, the particles of the surroundings lose kinetic energy, and $\\Delta H$ is positive.',
      'Energy is neither created nor destroyed: the energy one side loses, the other gains.',
      `True: ${statements.filter((s) => s.correct).map((s) => `“${s.md.replace(/\.$/, '')}”`).join('; ')}.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.1: exothermic and endothermic

const OBSERVATIONS: Array<{ text: string; exo: boolean; why: string }> = [
  { text: 'Calcium chloride dissolves in water, and the temperature of the water rises.', exo: true, why: 'The water warms up, so energy flows out of the dissolving calcium chloride into the water.' },
  { text: 'Ammonium nitrate dissolves in water, and the temperature of the water falls.', exo: false, why: 'The water cools down, so energy flows from the water into the dissolving ammonium nitrate.' },
  { text: 'Steam condenses to liquid water on a cold window.', exo: true, why: 'Condensing releases energy as attractions form between the water molecules; the window is warmed.' },
  { text: 'Ice melts in a glass of juice.', exo: false, why: 'Melting absorbs energy to overcome the attractions between the water molecules; the juice is cooled.' },
  { text: 'Water freezes in an ice-cube tray in a freezer.', exo: true, why: 'Freezing releases energy as the molecules settle into the solid; the freezer must remove that energy.' },
  { text: 'Ethanol evaporates from the skin, and the skin feels cool.', exo: false, why: 'Evaporating absorbs energy from the skin to separate the ethanol molecules.' },
  { text: 'Solid carbon dioxide (dry ice) turns straight into a gas.', exo: false, why: 'Subliming absorbs energy to separate the molecules of the solid.' },
  { text: 'Water splits into hydrogen and oxygen only while an electric current passes through it.', exo: false, why: 'The reaction keeps going only while energy is supplied, so it absorbs energy.' },
  { text: 'Propane burns in a camping stove.', exo: true, why: 'Burning releases energy as heat and light.' },
  { text: 'A reaction mixture in a flask gets so cold that frost forms on the outside of the flask.', exo: false, why: 'The flask and the air around it lose energy to the reaction mixture.' },
  { text: 'Sodium hydroxide pellets dissolve in water, and the beaker becomes hot.', exo: true, why: 'The beaker warms up, so energy flows out of the dissolving sodium hydroxide.' },
  { text: 'A green plant makes glucose from carbon dioxide and water, using the energy of sunlight.', exo: false, why: 'Photosynthesis absorbs energy from light and stores it in the glucose.' },
  { text: 'Hydrochloric acid is neutralised by sodium hydroxide solution, and the temperature rises.', exo: true, why: 'The solution warms up, so the neutralisation releases energy.' },
  { text: 'Copper(II) carbonate turns black and gives off carbon dioxide only while it is heated in a test tube.', exo: false, why: 'The decomposition keeps going only while heat is supplied, so it absorbs energy.' },
  { text: 'Iron powder in a hand warmer reacts with oxygen, and the warmer gets hot.', exo: true, why: 'The reaction releases energy that warms the hand warmer.' },
];

/** Average bond energies, kJ/mol, for these questions. */
const BOND_E: Record<string, number> = {
  'H-H': 436, 'Cl-Cl': 243, 'H-Cl': 432, 'F-F': 158, 'H-F': 565, 'Br-Br': 193, 'H-Br': 366, 'I-I': 151, 'H-I': 299,
  'O=O': 498, 'O-H': 463, 'C-H': 413, 'C=O': 799, 'N#N': 945, 'N-H': 391, 'C-C': 348, 'C=C': 614, 'C-Cl': 328,
};
/** The bonds in one molecule. */
const MOL_BONDS: Record<string, Array<[string, number]>> = {
  H2: [['H-H', 1]], Cl2: [['Cl-Cl', 1]], HCl: [['H-Cl', 1]], F2: [['F-F', 1]], HF: [['H-F', 1]], Br2: [['Br-Br', 1]], HBr: [['H-Br', 1]], I2: [['I-I', 1]], HI: [['H-I', 1]],
  O2: [['O=O', 1]], H2O: [['O-H', 2]], CH4: [['C-H', 4]], CO2: [['C=O', 2]], N2: [['N#N', 1]], NH3: [['N-H', 3]],
  CH3Cl: [['C-H', 3], ['C-Cl', 1]], C2H4: [['C=C', 1], ['C-H', 4]], C2H6: [['C-C', 1], ['C-H', 6]],
};
const BOND_RXS = [
  'H2(g) + Cl2(g) -> 2HCl(g)', 'H2(g) + F2(g) -> 2HF(g)', 'H2(g) + Br2(g) -> 2HBr(g)', 'H2(g) + I2(g) -> 2HI(g)', '2H2(g) + O2(g) -> 2H2O(g)',
  'N2(g) + 3H2(g) -> 2NH3(g)', 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)', 'CH4(g) + Cl2(g) -> CH3Cl(g) + HCl(g)', 'C2H4(g) + H2(g) -> C2H6(g)',
  '2HI(g) -> H2(g) + I2(g)', '2NH3(g) -> N2(g) + 3H2(g)', '2H2O(g) -> 2H2(g) + O2(g)', '2HCl(g) -> H2(g) + Cl2(g)', 'C2H6(g) -> C2H4(g) + H2(g)', '2HBr(g) -> H2(g) + Br2(g)',
].map(parseEq);
const bare = (f: string) => f.replace(/\((s|l|g|aq)\)$/, '');
const bondCe = (b: string) => `$\\ce{${b}}$`;

/** The bonds broken and formed in an equation, and their energies. */
function bondTotals(e: Eq) {
  const count = (side: Eq['r']) => {
    const m = new Map<string, number>();
    for (const t of side) for (const [b, n] of MOL_BONDS[bare(t.f)]) m.set(b, (m.get(b) ?? 0) + t.k * n);
    return m;
  };
  const broken = count(e.r);
  const formed = count(e.p);
  const total = (m: Map<string, number>) => [...m].reduce((s, [b, n]) => s + BOND_E[b] * n, 0);
  const work = (m: Map<string, number>) => [...m].map(([b, n]) => (n === 1 ? `${BOND_E[b]}` : `${n}(${BOND_E[b]})`)).join(' + ');
  return { broken, formed, inE: total(broken), outE: total(formed), workIn: work(broken), workOut: work(formed) };
}
/** "Each CH4 molecule has four C–H bonds; each O2 has one O=O bond; ..." */
function bondSentence(e: Eq): string {
  const seen = new Set<string>();
  const bits: string[] = [];
  for (const t of [...e.r, ...e.p]) {
    const f = bare(t.f);
    if (seen.has(f)) continue;
    seen.add(f);
    bits.push(`$\\ce{${f}}$ has ${listAnd(MOL_BONDS[f].map(([b, n]) => `${NUM_WORDS[n]} ${bondCe(b)} bond${n === 1 ? '' : 's'}`))}`);
  }
  return `Each molecule of ${bits.join('; each ')}.`;
}

function exoEndo(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.75)) {
      const o = rng.pick(OBSERVATIONS);
      return {
        prompt: `${o.text} Is the change exothermic or endothermic?`,
        parts: [part(fixedChoice(EXO_ENDO, o.exo ? 0 : 1))],
        hints: ['Ask which way the energy flows: out of the chemical system into the surroundings, or into the system from the surroundings.', 'Surroundings that warm up have gained energy from the system. Surroundings that cool down, or a change that needs a steady supply of energy, have given energy to the system.'],
        solution: [o.why, `So the change is ${o.exo ? 'exothermic' : 'endothermic'}.`],
      };
    }
    const e = rng.pick(NOTE_RXS);
    const dH = dHr(e);
    return {
      prompt: `For the reaction ${eqMd(e)}, $${DH} = ${signed(dH)}\\ \\text{kJ}$. Is the reaction exothermic or endothermic?`,
      parts: [part(fixedChoice(EXO_ENDO, dH < 0 ? 0 : 1))],
      hints: ['$\\Delta H$ is the energy the chemical system gains.', 'A system that loses energy to its surroundings has a negative $\\Delta H$.'],
      solution: [`$${DH}$ is ${dH < 0 ? 'negative: the system loses energy to its surroundings' : 'positive: the system gains energy from its surroundings'}.`, `So the reaction is ${dH < 0 ? 'exothermic' : 'endothermic'}.`],
    };
  }
  const e = rng.pick(BOND_RXS);
  const b = bondTotals(e);
  const dH = b.inE - b.outE;
  const exo = dH < 0;
  if (d === 2) {
    if (rng.chance(0.5)) {
      return {
        prompt: `For the reaction ${eqMd(e)}, breaking the bonds of the reactants absorbs ${kJText(b.inE)}, and forming the bonds of the products releases ${kJText(b.outE)}. What is $${DH}$ (with its sign), and is the reaction exothermic or endothermic?`,
        parts: [numPart(dH, { decimals: 0, suffix: 'kJ', label: `$${DH} =$` }), part(fixedChoice(EXO_ENDO, exo ? 0 : 1), { label: 'The reaction is' })],
        calculator: true,
        hints: ['Breaking bonds absorbs energy; forming bonds releases it.', '$\\Delta H$ = energy absorbed breaking bonds − energy released forming bonds.'],
        solution: [`$${DH} = ${b.inE} - ${b.outE} = ${signed(dH, 0)}\\ \\text{kJ}$`, exo ? 'More energy is released forming the new bonds than is absorbed breaking the old ones, so the reaction is exothermic.' : 'More energy is absorbed breaking the old bonds than is released forming the new ones, so the reaction is endothermic.'],
      };
    }
    const right = exo
      ? 'More energy is released when the bonds of the products form than is absorbed when the bonds of the reactants break.'
      : 'More energy is absorbed when the bonds of the reactants break than is released when the bonds of the products form.';
    const other = exo
      ? 'More energy is absorbed when the bonds of the reactants break than is released when the bonds of the products form.'
      : 'More energy is released when the bonds of the products form than is absorbed when the bonds of the reactants break.';
    return {
      prompt: `The reaction ${eqMd(e)} is ${exo ? 'exothermic' : 'endothermic'}. Which statement explains why, in terms of bonds?`,
      parts: [part(mc(rng, right, [other, 'Breaking bonds releases energy, and more bonds are broken than are formed.', 'Forming bonds absorbs energy, and fewer bonds are formed than are broken.']))],
      hints: ['Breaking a bond always absorbs energy; forming a bond always releases energy.', `$${DH}$ = energy absorbed breaking bonds − energy released forming bonds.`],
      solution: ['Breaking bonds absorbs energy and forming bonds releases energy.', `The reaction is ${exo ? 'exothermic, so overall energy is released: the energy released is the larger amount' : 'endothermic, so overall energy is absorbed: the energy absorbed is the larger amount'}.`, right],
    };
  }
  const used = new Set([...b.broken.keys(), ...b.formed.keys()]);
  const extra = rng.shuffle(Object.keys(BOND_E).filter((k) => !used.has(k))).slice(0, 2);
  const rows = rng.shuffle([...used, ...extra]).map((k) => [bondCe(k), String(BOND_E[k])]);
  const figure: TableFigure = { type: 'table', headers: ['Bond', 'Average bond energy (kJ/mol)'], rows };
  return {
    prompt: `Use the average bond energies in the table to estimate the enthalpy change of ${eqMd(e)}. ${bondSentence(e)} Give $${DH}$ with its sign.`,
    figure,
    parts: [
      numPart(b.inE, { decimals: 0, suffix: 'kJ', label: 'Energy absorbed breaking bonds' }),
      numPart(b.outE, { decimals: 0, suffix: 'kJ', label: 'Energy released forming bonds' }),
      numPart(dH, { decimals: 0, suffix: 'kJ', label: `$${DH} =$` }),
    ],
    calculator: true,
    hints: ['Count every bond in the reactants, using the coefficients, and add their energies: that energy is absorbed.', 'Do the same for the products: that energy is released.', '$\\Delta H$ = energy absorbed − energy released.'],
    solution: [
      `Bonds broken: $${b.workIn} = ${b.inE}\\ \\text{kJ}$`,
      `Bonds formed: $${b.workOut} = ${b.outE}\\ \\text{kJ}$`,
      `$${DH} = ${b.inE} - ${b.outE} = ${signed(dH, 0)}\\ \\text{kJ}$, so the reaction is ${exo ? 'exothermic' : 'endothermic'}.`,
    ],
  };
}
const kJText = (v: number) => q(v, 'kJ');

// ---------------------------------------------------------------------------- lesson 1.2: heat, Q = mcΔt

/** A heat in joules as an answer: in joules when small, otherwise in kilojoules. */
function heatAnswer(joules: number) {
  const big = joules >= 2000;
  const v = big ? joules / 1000 : joules;
  return { ...answer(v, big ? 'kJ' : 'J'), big, unit: big ? 'kJ' : 'J', word: big ? 'kilojoules' : 'joules' };
}
const cOf = (s: Material) => (s === WATER ? WATER_C_TEXT : cText(s));
/** Joules as worked out exactly: to the nearest joule, or to a tenth below 100 J. */
const jShown = (joules: number) => fmtFixed(joules, joules >= 100 ? 0 : 1);
const qWork = (m: string, c: number, dt: string, joules: number) => `$Q = mc\\Delta t = ${m}\\ \\text{g} \\times ${cShown(c)}\\ ${JGC} \\times ${dt}^\\circ\\text{C} = ${jShown(joules)}\\ \\text{J}$`;

const POTS: Array<{ what: string; m: Material; lo: number; hi: number }> = [
  { what: 'an aluminium saucepan', m: MATERIALS[0], lo: 0.4, hi: 1.5 },
  { what: 'a copper pot', m: MATERIALS[1], lo: 0.6, hi: 2.0 },
  { what: 'an iron pot', m: MATERIALS[2], lo: 0.8, hi: 2.5 },
  { what: 'a glass beaker', m: MATERIALS[9], lo: 0.1, hi: 0.4 },
];

function heatQ(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const s = rng.chance(0.55) ? WATER : rng.pick(MATERIALS);
    const m = s === WATER ? rng.int(10, 100) * 5 : rng.int(8, 80) * 5;
    const dt = rng.float(2, 45, 1);
    const warm = rng.chance(0.5);
    const Q = m * s.c * dt;
    const a = heatAnswer(Q);
    return {
      prompt: `How much heat, in ${a.word}, does ${q(m.toFixed(1), 'g')} of ${s.name} ${warm ? 'absorb as it warms' : 'release as it cools'} by ${degC(dt.toFixed(1))}? Give the answer ${a.phrase}. ${cOf(s)}`,
      parts: [a.part],
      calculator: true,
      hints: [`Use $Q = mc\\Delta t$, with the mass in grams, $c$ in $${JGC}$ and the temperature change in degrees Celsius.`, a.big ? 'The formula gives joules. Divide by 1000 for kilojoules.' : 'With these units the formula gives joules.'],
      solution: [qWork(m.toFixed(1), s.c, dt.toFixed(1), Q), a.big ? `$${jShown(Q)}\\ \\text{J} \\div 1000 = ${a.shown}\\ \\text{kJ}$` : `Rounded: $Q = ${a.shown}\\ \\text{J}$`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['water-mL', 'water-kg', 'solution', 'material'] as const);
    const s = kind === 'material' ? rng.pick(MATERIALS.filter((x) => x.c < 1)) : WATER;
    let g: number;
    let given: string;
    let note = '';
    let convert: string | null = null;
    if (kind === 'water-mL') {
      g = rng.int(20, 100) * 5;
      given = `${q(g.toFixed(1), 'mL')} of water`;
      note = 'The density of water is $1.00\\ \\text{g/mL}$.';
      convert = `$m = ${g.toFixed(1)}\\ \\text{mL} \\times 1.00\\ \\text{g/mL} = ${g.toFixed(1)}\\ \\text{g}$`;
    } else if (kind === 'water-kg') {
      const kg = rng.int(20, 300) / 100;
      g = Math.round(kg * 1000);
      given = `${q(sf(kg), 'kg')} of water`;
      convert = `$m = ${sf(kg)}\\ \\text{kg} = ${g}\\ \\text{g}$`;
    } else if (kind === 'solution') {
      g = rng.int(10, 60) * 5;
      given = `${q(g.toFixed(1), 'mL')} of a dilute aqueous solution`;
      note = 'Assume the solution has the density ($1.00\\ \\text{g/mL}$) and the specific heat capacity of water.';
      convert = `$m = ${g.toFixed(1)}\\ \\text{mL} \\times 1.00\\ \\text{g/mL} = ${g.toFixed(1)}\\ \\text{g}$`;
    } else {
      const kg = rng.int(10, 150) / 100;
      g = Math.round(kg * 1000);
      given = `${aAn(sf(kg)).toLowerCase()} ${q(sf(kg), 'kg')} block of ${s.name}`;
      convert = `$m = ${sf(kg)}\\ \\text{kg} = ${g}\\ \\text{g}$`;
    }
    const ti = rng.float(4, 40, 1);
    let tf = ti;
    while (Math.abs(tf - ti) < 4) tf = rng.float(4, kind === 'material' ? 160 : 95, 1);
    const dt = roundTo(tf - ti, 1);
    const gained = dt > 0;
    const Q = g * s.c * Math.abs(dt);
    const a = heatAnswer(Q);
    return {
      prompt: `The temperature of ${given} changes from ${degC(ti.toFixed(1))} to ${degC(tf.toFixed(1))}. How much heat, in ${a.word}, does it gain or lose, ${a.phrase}? Then say whether it gained or lost the heat. ${cOf(s)} ${note}`.trim(),
      parts: [{ ...a.part, label: '$Q =$' }, part(fixedChoice(['Gained', 'Lost'], gained ? 0 : 1), { label: 'The heat was' })],
      calculator: true,
      hints: ['Change the mass to grams first.', '$\\Delta t$ = final temperature − initial temperature. Use its size in $Q = mc\\Delta t$; its sign says whether heat was gained or lost.'],
      solution: [
        ...(convert ? [convert] : []),
        `$\\Delta t = ${tf.toFixed(1)} - ${ti.toFixed(1)} = ${fmtFixed(dt, 1)}^\\circ\\text{C}$`,
        qWork(kind === 'water-kg' || kind === 'material' ? String(g) : g.toFixed(1), s.c, fmtFixed(Math.abs(dt), 1), Q),
        ...(a.big ? [`$${jShown(Q)}\\ \\text{J} = ${a.shown}\\ \\text{kJ}$`] : []),
        `The temperature ${gained ? 'rose, so the heat was gained' : 'fell, so the heat was lost'}.`,
      ],
    };
  }
  const pot = rng.pick(POTS);
  const kg = rng.int(Math.round(pot.lo * 100), Math.round(pot.hi * 100)) / 100;
  const glass = pot.m.name === 'glass';
  const litres = glass ? rng.int(15, 80) / 100 : rng.int(50, 250) / 100;
  const ti = rng.float(8, 25, 1);
  const tf = rng.float(glass ? 55 : 60, glass ? 90 : 100, 1);
  const dt = roundTo(tf - ti, 1);
  const gPot = Math.round(kg * 1000);
  const gW = Math.round(litres * 1000);
  const qPot = gPot * pot.m.c * dt;
  const qW = gW * C_WATER * dt;
  const total = (qPot + qW) / 1000;
  const a = answer(total, 'kJ');
  return {
    prompt: `${cap(pot.what)} with a mass of ${q(sf(kg), 'kg')} holds ${q(sf(litres), 'L')} of water. Both start at ${degC(ti.toFixed(1))}. How much heat, in kilojoules, is needed to warm the ${glass ? 'beaker' : 'pot'} and the water to ${degC(tf.toFixed(1))}, ${a.phrase}? ${cText(pot.m)} ${WATER_C_TEXT} The density of water is $1.00\\ \\text{kg/L}$.`,
    parts: [a.part],
    calculator: true,
    hints: ['The container and the water warm by the same temperature change.', 'Find $Q = mc\\Delta t$ for each, with the masses in grams, then add them.'],
    solution: [
      `$\\Delta t = ${tf.toFixed(1)} - ${ti.toFixed(1)} = ${fmtFixed(dt, 1)}^\\circ\\text{C}$; masses ${gPot} g of ${pot.m.name} and ${gW} g of water.`,
      `${cap(pot.m.name)}: $Q = ${gPot} \\times ${cShown(pot.m.c)} \\times ${fmtFixed(dt, 1)} = ${jShown(qPot)}\\ \\text{J}$`,
      `Water: $Q = ${gW} \\times 4.19 \\times ${fmtFixed(dt, 1)} = ${jShown(qW)}\\ \\text{J}$`,
      `Total: $${jShown(qPot)} + ${jShown(qW)} = ${jShown(qPot + qW)}\\ \\text{J} = ${a.shown}\\ \\text{kJ}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.2: calorimetry

const ASSUMPTIONS: Array<{ ask: string; right: string; wrong: string[] }> = [
  {
    ask: 'A student uses a polystyrene cup with a lid as a simple calorimeter. Which assumption does the calculation of $Q = mc\\Delta t$ for the water make?',
    right: 'No heat is lost to, or gained from, the air and the cup.',
    wrong: ['The temperature of the water stays the same during the reaction.', 'The cup absorbs most of the heat released by the reaction.', 'The reactants have the same mass as the water.'],
  },
  {
    ask: 'A reaction takes place in a dilute aqueous solution in a simple calorimeter. Why can $c = 4.19\\ \\text{J/(g·°C)}$ be used for the solution?',
    right: 'A dilute solution is mostly water, so it is assumed to have the specific heat capacity and density of water.',
    wrong: ['The dissolved substances have no mass.', 'Every solution has exactly the same specific heat capacity.', 'The dissolved substances absorb no heat because they are in solution.'],
  },
  {
    ask: 'Why is a polystyrene cup a better simple calorimeter than a metal can?',
    right: 'Polystyrene is a good insulator, so little heat moves between the solution and the air.',
    wrong: ['Polystyrene reacts with the solution and adds extra heat.', 'Polystyrene absorbs most of the heat of the reaction.', 'A metal can slows the reaction down.'],
  },
  {
    ask: 'A student finds the molar enthalpy of combustion of ethanol by heating a can of water over an ethanol burner. The value found is much smaller in size than the value in a data table. What is the most likely reason?',
    right: 'Much of the heat from the flame went into the air and the can, not into the water.',
    wrong: ['The water absorbed more heat than the ethanol released.', 'The thermometer measured the heat in the wrong units.', 'Ethanol releases less energy when it burns in a laboratory.'],
  },
  {
    ask: 'Why is a lid kept on a simple calorimeter during an experiment?',
    right: 'To reduce the heat that escapes to the air, including heat carried away by evaporation.',
    wrong: ['To keep the pressure inside high, which speeds up the reaction.', 'To stop the temperature from changing.', 'To stop the thermometer from touching the solution.'],
  },
  {
    ask: 'Why is the solution in a simple calorimeter stirred during a reaction?',
    right: 'So the heat spreads evenly and the thermometer reads the temperature of the whole solution.',
    wrong: ['So the reaction releases more heat.', 'So heat escapes to the air more quickly.', 'So the specific heat capacity of the water increases.'],
  },
];

/** A table of specific heat capacities, for identifying a metal. */
const cTable = (ms: Material[]): TableFigure => ({ type: 'table', headers: ['Metal', `Specific heat capacity ($${JGC}$)`], rows: ms.map((m) => [m.name, cShown(m.c)]) });
/** The true metal and three others, in order of specific heat capacity. */
const candidates = (rng: Rng, metal: Material) => [metal, ...rng.shuffle(IDENTIFIABLE.filter((m) => m !== metal)).slice(0, 3)].sort((a, b) => a.c - b.c);

function calorimetrySolve(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.pick(['dt', 'm', 'c'] as const);
    if (kind === 'c') {
      const s = rng.pick(MATERIALS.filter((x) => x.c < 1));
      const m = rng.int(10, 100) * 5;
      const dt = rng.float(10, 60, 1);
      const Q = sig(m * s.c * dt);
      const c = Q / (m * dt);
      const a = answer(c, 'J/(g·°C)', 3);
      return {
        prompt: `${aAn(m.toFixed(1))} ${q(m.toFixed(1), 'g')} sample of ${s.name} absorbs ${q(sf(Q), 'J')} of heat, and its temperature rises by ${degC(dt.toFixed(1))}. What is the specific heat capacity of ${s.name}, ${a.phrase}?`,
        parts: [a.part],
        calculator: true,
        hints: ['Rearrange $Q = mc\\Delta t$ for $c$: $c = \\dfrac{Q}{m\\Delta t}$.', `With $Q$ in joules and $m$ in grams, $c$ comes out in $${JGC}$.`],
        solution: [`$c = \\dfrac{Q}{m\\Delta t} = \\dfrac{${sf(Q)}}{${m.toFixed(1)} \\times ${dt.toFixed(1)}} = ${a.shown}\\ ${JGC}$`],
      };
    }
    const m = rng.int(10, 100) * 5;
    const dtTrue = rng.float(3, 40, 1);
    const Q = sig((m * C_WATER * dtTrue) / 1000);
    if (kind === 'dt') {
      const dt = (Q * 1000) / (m * C_WATER);
      const a = answer(dt, '°C', 1);
      return {
        prompt: `${cap(q(m.toFixed(1), 'g'))} of water absorbs ${q(sf(Q), 'kJ')} of heat. By how much does its temperature rise, ${a.phrase}? ${WATER_C_TEXT}`,
        parts: [a.part],
        calculator: true,
        hints: ['Rearrange $Q = mc\\Delta t$ for $\\Delta t = \\dfrac{Q}{mc}$.', 'Change the heat to joules first, because $c$ is in joules.'],
        solution: [`$Q = ${sf(Q)}\\ \\text{kJ} = ${w(Q * 1000)}\\ \\text{J}$`, `$\\Delta t = \\dfrac{Q}{mc} = \\dfrac{${w(Q * 1000)}}{${m.toFixed(1)} \\times 4.19} = ${a.shown}^\\circ\\text{C}$`],
      };
    }
    const mass = (Q * 1000) / (C_WATER * dtTrue);
    const a = answer(mass, 'g');
    return {
      prompt: `Some water absorbs ${q(sf(Q), 'kJ')} of heat, and its temperature rises by ${degC(dtTrue.toFixed(1))}. What is the mass of the water, in grams, ${a.phrase}? ${WATER_C_TEXT}`,
      parts: [a.part],
      calculator: true,
      hints: ['Rearrange $Q = mc\\Delta t$ for $m = \\dfrac{Q}{c\\Delta t}$.', 'Change the heat to joules first, because $c$ is in joules.'],
      solution: [`$Q = ${sf(Q)}\\ \\text{kJ} = ${w(Q * 1000)}\\ \\text{J}$`, `$m = \\dfrac{Q}{c\\Delta t} = \\dfrac{${w(Q * 1000)}}{4.19 \\times ${dtTrue.toFixed(1)}} = ${a.shown}\\ \\text{g}$`],
    };
  }
  if (d === 2) {
    const kind = rng.weighted([['final', 0.4], ['identify', 0.3], ['assume', 0.3]] as const);
    if (kind === 'assume') {
      const x = rng.pick(ASSUMPTIONS);
      return {
        prompt: x.ask,
        parts: [part(mc(rng, x.right, x.wrong))],
        hints: ['A simple calorimeter is built so that the heat of the reaction ends up in the water, and nowhere else.', 'Think about where else heat could go, and what is assumed about a dilute solution.'],
        solution: [x.right],
      };
    }
    if (kind === 'identify') {
      const metal = rng.pick(IDENTIFIABLE);
      const m = rng.int(8, 60) * 2.5;
      const ti = rng.float(18, 25, 1);
      const tf = rng.float(45, 95, 1);
      const dt = roundTo(tf - ti, 1);
      const Q = sig(m * metal.c * dt);
      const c = Q / (m * dt);
      const a = answer(c, 'J/(g·°C)', 3);
      const set = candidates(rng, metal);
      return {
        prompt: `${aAn(m.toFixed(1))} ${q(m.toFixed(1), 'g')} sample of an unknown metal absorbs ${q(sf(Q), 'J')} of heat as it warms from ${degC(ti.toFixed(1))} to ${degC(tf.toFixed(1))}. Find its specific heat capacity, ${a.phrase}, and use the table to identify the metal.`,
        figure: cTable(set),
        parts: [{ ...a.part, label: '$c =$' }, part(mc(rng, cap(metal.name), set.filter((x) => x !== metal).map((x) => cap(x.name))), { label: 'The metal is' })],
        calculator: true,
        hints: ['Find the temperature change first.', 'Rearrange $Q = mc\\Delta t$ for $c = \\dfrac{Q}{m\\Delta t}$, then find the closest value in the table.'],
        solution: [`$\\Delta t = ${tf.toFixed(1)} - ${ti.toFixed(1)} = ${fmtFixed(dt, 1)}^\\circ\\text{C}$`, `$c = \\dfrac{${sf(Q)}}{${m.toFixed(1)} \\times ${fmtFixed(dt, 1)}} = ${a.shown}\\ ${JGC}$`, `The closest value in the table is ${metal.name}, $${cShown(metal.c)}\\ ${JGC}$.`],
      };
    }
    const m = rng.int(20, 100) * 5;
    const ti = rng.float(15, 30, 1);
    const gain = rng.chance(0.6);
    const dtTrue = gain ? rng.float(3, 40, 1) : rng.float(3, Math.min(25, ti - 2), 1);
    const Q = sig((m * C_WATER * dtTrue) / 1000);
    const dt = (Q * 1000) / (m * C_WATER);
    const tf = gain ? ti + dt : ti - dt;
    const a = answer(tf, '°C', 1);
    return {
      prompt: `${cap(q(m.toFixed(1), 'g'))} of water at ${degC(ti.toFixed(1))} ${gain ? 'absorbs' : 'releases'} ${q(sf(Q), 'kJ')} of heat. What is its final temperature, ${a.phrase}? ${WATER_C_TEXT}`,
      parts: [a.part],
      calculator: true,
      hints: ['Find the temperature change first: $\\Delta t = \\dfrac{Q}{mc}$, with $Q$ in joules.', gain ? 'Water that absorbs heat gets warmer.' : 'Water that releases heat gets colder.'],
      solution: [`$\\Delta t = \\dfrac{${w(Q * 1000)}}{${m.toFixed(1)} \\times 4.19} = ${w(dt)}^\\circ\\text{C}$`, `$t_\\text{final} = ${ti.toFixed(1)} ${gain ? '+' : '-'} ${w(dt)} = ${a.shown}^\\circ\\text{C}$`],
    };
  }
  const kind = rng.weighted([['find-c', 0.4], ['final', 0.35], ['mass-hot', 0.25]] as const);
  const noLoss = 'Assume no heat is lost to the surroundings or to the calorimeter.';
  if (kind === 'mass-hot') {
    const mc0 = rng.int(20, 60) * 5;
    const tc = rng.float(12, 24, 1);
    const th = rng.float(60, 90, 1);
    const tf = rng.float(tc + 8, th - 12, 1);
    const mh = (mc0 * (tf - tc)) / (th - tf);
    const a = answer(mh, 'g');
    return {
      prompt: `What mass of water at ${degC(th.toFixed(1))} must be added to ${q(mc0.toFixed(1), 'g')} of water at ${degC(tc.toFixed(1))} in an insulated cup so that the mixture ends at ${degC(tf.toFixed(1))}? Give the answer ${a.phrase}. ${noLoss}`,
      parts: [a.part],
      calculator: true,
      hints: ['Heat lost by the hot water = heat gained by the cold water.', 'Write $Q = mc\\Delta t$ for each, with $\\Delta t$ measured to the final temperature, and solve for the unknown mass. The specific heat capacity of water cancels.'],
      solution: [
        `$m_\\text{hot} c (${th.toFixed(1)} - ${tf.toFixed(1)}) = ${mc0.toFixed(1)}\\, c\\, (${tf.toFixed(1)} - ${tc.toFixed(1)})$`,
        `$m_\\text{hot} = \\dfrac{${mc0.toFixed(1)} \\times ${fmtFixed(tf - tc, 1)}}{${fmtFixed(th - tf, 1)}} = ${a.shown}\\ \\text{g}$`,
      ],
    };
  }
  const metal = kind === 'find-c' ? rng.pick(IDENTIFIABLE) : rng.pick(MATERIALS.filter((x) => x.c < 1 && x.name !== 'glass' && x.name !== 'granite'));
  const mM = rng.int(10, 40) * 5;
  const tHot = rng.float(90, 99.5, 1);
  const tC = rng.float(16, 24, 1);
  // Enough water to measure, but not so much that its temperature hardly changes.
  const mW = Math.min(250, Math.max(50, Math.round((mM * metal.c * (tHot - tC)) / (C_WATER * rng.float(3, 9, 1)) / 5) * 5));
  const tfTrue = (mM * metal.c * tHot + mW * C_WATER * tC) / (mM * metal.c + mW * C_WATER);
  const story = `${aAn(mM.toFixed(1))} ${q(mM.toFixed(1), 'g')} piece of ${kind === 'find-c' ? 'an unknown metal' : metal.name} is heated to ${degC(tHot.toFixed(1))} in boiling water, then dropped into ${q(mW.toFixed(1), 'g')} of water at ${degC(tC.toFixed(1))} in a calorimeter.`;
  if (kind === 'final') {
    const a = answer(tfTrue, '°C', 1);
    return {
      prompt: `${story} What is the final temperature of the metal and the water, ${a.phrase}? ${cText(metal)} ${WATER_C_TEXT} ${noLoss}`,
      parts: [a.part],
      calculator: true,
      hints: ['Heat lost by the metal = heat gained by the water, and both end at the same final temperature $t_f$.', '$m_\\text{metal}c_\\text{metal}(t_\\text{hot} - t_f) = m_\\text{water}c_\\text{water}(t_f - t_\\text{cold})$: collect the $t_f$ terms on one side.'],
      solution: [
        `$${mM.toFixed(1)} \\times ${cShown(metal.c)} \\times (${tHot.toFixed(1)} - t_f) = ${mW.toFixed(1)} \\times 4.19 \\times (t_f - ${tC.toFixed(1)})$`,
        `$${w(mM * metal.c)}(${tHot.toFixed(1)} - t_f) = ${w(mW * C_WATER)}(t_f - ${tC.toFixed(1)})$`,
        `$t_f = \\dfrac{${w(mM * metal.c)} \\times ${tHot.toFixed(1)} + ${w(mW * C_WATER)} \\times ${tC.toFixed(1)}}{${w(mM * metal.c)} + ${w(mW * C_WATER)}} = ${a.shown}^\\circ\\text{C}$`,
      ],
    };
  }
  const tf = roundTo(tfTrue, 1);
  const c = (mW * C_WATER * (tf - tC)) / (mM * (tHot - tf));
  const a = answer(c, 'J/(g·°C)', 3);
  const identify = rng.chance(0.5);
  const set = candidates(rng, metal);
  return {
    prompt: `${story} The final temperature of the metal and the water is ${degC(tf.toFixed(1))}. What is the specific heat capacity of the metal, ${a.phrase}?${identify ? ' Use the table to identify the metal.' : ''} ${WATER_C_TEXT} ${noLoss}`,
    ...(identify ? { figure: cTable(set) } : {}),
    parts: [{ ...a.part, label: '$c =$' }, ...(identify ? [part(mc(rng, cap(metal.name), set.filter((x) => x !== metal).map((x) => cap(x.name))), { label: 'The metal is' })] : [])],
    calculator: true,
    hints: ['Heat gained by the water = heat lost by the metal.', 'Find the heat the water gains with $Q = mc\\Delta t$, then solve $Q = mc\\Delta t$ for the metal\'s $c$, using its own temperature change.'],
    solution: [
      `Heat gained by the water: $Q = ${mW.toFixed(1)} \\times 4.19 \\times (${tf.toFixed(1)} - ${tC.toFixed(1)}) = ${w(mW * C_WATER * (tf - tC))}\\ \\text{J}$`,
      `The metal cools by $${tHot.toFixed(1)} - ${tf.toFixed(1)} = ${fmtFixed(tHot - tf, 1)}^\\circ\\text{C}$`,
      `$c = \\dfrac{Q}{m\\Delta t} = \\dfrac{${w(mW * C_WATER * (tf - tC))}}{${mM.toFixed(1)} \\times ${fmtFixed(tHot - tf, 1)}} = ${a.shown}\\ ${JGC}$`,
      ...(identify ? [`The closest value in the table is ${metal.name}, $${cShown(metal.c)}\\ ${JGC}$.`] : []),
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.3: molar enthalpy from calorimetry

/** Salts that dissolve with a measurable temperature change, and their molar enthalpies of solution (kJ/mol). */
const DISSOLVE: Array<{ f: string; name: string; dH: number }> = [
  { f: 'NH4NO3', name: 'ammonium nitrate', dH: 25.7 },
  { f: 'NaOH', name: 'sodium hydroxide', dH: -44.5 },
  { f: 'KNO3', name: 'potassium nitrate', dH: 34.9 },
  { f: 'CaCl2', name: 'calcium chloride', dH: -82.8 },
  { f: 'NH4Cl', name: 'ammonium chloride', dH: 14.8 },
  { f: 'LiCl', name: 'lithium chloride', dH: -37.0 },
  { f: 'KCl', name: 'potassium chloride', dH: 17.2 },
  { f: 'LiBr', name: 'lithium bromide', dH: -48.8 },
  { f: 'KBr', name: 'potassium bromide', dH: 19.9 },
];
const combustion = (s: string) => dHr(parseEq(s));
/** Fuels burned in a calorimeter, with their molar enthalpies of combustion (liquid water formed). */
const FUELS: Array<{ f: string; name: string; dH: number; burner?: boolean }> = [
  { f: 'CH3OH', name: 'methanol', dH: combustion('CH3OH(l) + 3/2 O2(g) -> CO2(g) + 2H2O(l)'), burner: true },
  { f: 'C2H5OH', name: 'ethanol', dH: combustion('C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)'), burner: true },
  { f: 'C6H12O6', name: 'glucose', dH: combustion('C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l)') },
  { f: 'C12H22O11', name: 'sucrose', dH: combustion('C12H22O11(s) + 12O2(g) -> 12CO2(g) + 11H2O(l)') },
  { f: 'C6H5COOH', name: 'benzoic acid', dH: -3226.9 },
  { f: 'C10H8', name: 'naphthalene', dH: -5156.3 },
];
const ACIDS = [['HCl', 'hydrochloric acid'], ['HNO3', 'nitric acid']] as const;
const BASES = [['NaOH', 'sodium hydroxide'], ['KOH', 'potassium hydroxide']] as const;
/** A concentration as a solution label gives it. */
const concs = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

function molarEnthalpy(rng: Rng, d: Difficulty): GenOutput {
  const molarHints = ['First find the heat with $Q = mc\\Delta t$ for the water (or $Q = C\\Delta t$ for a calorimeter with a stated heat capacity).', 'Find the amount in moles of the substance that reacted.', `$${DHM} = \\dfrac{\\Delta H}{n}$: negative if the water warmed (the reaction released energy), positive if it cooled.`];
  if (d === 1) {
    const dissolve = rng.chance(0.6);
    const s = dissolve ? rng.pick(DISSOLVE) : rng.pick(FUELS);
    const n = dissolve ? sig(rng.float(0.02, 0.25, 4)) : sig(rng.float(0.002, 0.03, 5));
    const Q = sig(n * Math.abs(s.dH) * rng.float(0.97, 1.03, 3));
    const exo = s.dH < 0;
    const molar = ((exo ? -1 : 1) * Q) / n;
    const a = answer(molar, 'kJ/mol', dpFor(molar), `$${DHM} =$`);
    const what = dissolve ? `molar enthalpy of solution of ${s.name}` : `molar enthalpy of combustion of ${s.name}`;
    return {
      prompt: dissolve
        ? `When ${q(sf(n), 'mol')} of ${s.name}, $\\ce{${s.f}}$, dissolves in the water of a calorimeter, the water ${exo ? 'gains' : 'loses'} ${q(sf(Q), 'kJ')} of heat. What is the ${what}? ${WITH_SIGN}, ${a.phrase}.`
        : `When ${q(sf(n), 'mol')} of ${s.name}, $\\ce{${s.f}}$, burns in a calorimeter, the water around it gains ${q(sf(Q), 'kJ')} of heat. What is the ${what}? ${WITH_SIGN}, ${a.phrase}.`,
      parts: [a.part],
      calculator: true,
      hints: [`$${DHM} = \\dfrac{\\Delta H}{n}$: the enthalpy change per mole.`, 'If the water gains heat, the chemical system lost it, so $\\Delta H$ is negative. If the water loses heat, $\\Delta H$ is positive.'],
      solution: [`The water ${exo ? 'gains' : 'loses'} heat, so the system ${exo ? 'loses' : 'gains'} it: $\\Delta H = ${exo ? '-' : '+'}${sf(Q)}\\ \\text{kJ}$.`, `$${DHM} = \\dfrac{\\Delta H}{n} = \\dfrac{${exo ? '-' : ''}${sf(Q)}\\ \\text{kJ}}{${sf(n)}\\ \\text{mol}} = ${signed(Number(a.shown), dpFor(molar))}\\ \\text{kJ/mol}$`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.6)) {
      const s = rng.pick(DISSOLVE);
      const M = mm(s.f);
      const n0 = rng.float(0.03, 0.15, 3);
      const mass = sig(n0 * M);
      const n = mass / M;
      const qTrue = n * Math.abs(s.dH) * rng.float(0.96, 1.02, 3);
      let mW = Math.round((qTrue * 1000) / (C_WATER * rng.float(3, 12, 1)) / 5) * 5;
      mW = Math.min(250, Math.max(50, mW));
      const dt = roundTo((qTrue * 1000) / (mW * C_WATER), 1);
      if (dt < 0.8) return molarEnthalpy(rng, d);
      const ti = rng.float(18, 23, 1);
      const exo = s.dH < 0;
      const tf = roundTo(exo ? ti + dt : ti - dt, 1);
      const Q = (mW * C_WATER * dt) / 1000;
      const molar = ((exo ? -1 : 1) * Q) / n;
      const a = answer(molar, 'kJ/mol', dpFor(molar), `$${DHM} =$`);
      return {
        prompt: `${cap(q(sf(mass), 'g'))} of ${s.name}, $\\ce{${s.f}}$, is dissolved in ${q(mW.toFixed(1), 'g')} of water in a polystyrene cup calorimeter. The temperature of the water changes from ${degC(ti.toFixed(1))} to ${degC(tf.toFixed(1))}. What is the molar enthalpy of solution of ${s.name}? ${WITH_SIGN}, ${a.phrase}. ${WATER_C_TEXT} Use the mass of the water only. ${mmText(s.f)}.`,
        parts: [a.part],
        calculator: true,
        hints: molarHints,
        solution: [
          `$Q = mc\\Delta t = ${mW.toFixed(1)} \\times 4.19 \\times ${fmtFixed(dt, 1)} = ${w(Q * 1000)}\\ \\text{J} = ${w(Q)}\\ \\text{kJ}$`,
          `$n = \\dfrac{${sf(mass)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`,
          `The water ${exo ? 'warmed, so the dissolving released energy' : 'cooled, so the dissolving absorbed energy'}: $\\Delta H = ${exo ? '-' : '+'}${w(Q)}\\ \\text{kJ}$.`,
          `$${DHM} = \\dfrac{${exo ? '-' : ''}${w(Q)}}{${w(n)}} = ${signed(Number(a.shown), dpFor(molar))}\\ \\text{kJ/mol}$`,
        ],
      };
    }
    const [acid, acidName] = rng.pick(ACIDS);
    const [base, baseName] = rng.pick(BASES);
    const v = rng.int(5, 20) * 5;
    const c = rng.pick(concs);
    const n = (c * v) / 1000;
    const dt = roundTo((n * rng.float(55.2, 57.4, 2) * 1000) / (2 * v * C_WATER), 1);
    const ti = rng.float(18, 23, 1);
    const tf = roundTo(ti + dt, 1);
    const Q = (2 * v * C_WATER * dt) / 1000;
    const molar = -Q / n;
    const a = answer(molar, 'kJ/mol', dpFor(molar), `$${DHM} =$`);
    const salt = `${acid === 'HCl' ? (base === 'NaOH' ? 'NaCl' : 'KCl') : base === 'NaOH' ? 'NaNO3' : 'KNO3'}`;
    return {
      prompt: `${cap(q(v.toFixed(1), 'mL'))} of ${q(sf(c), 'mol/L')} ${acidName} and ${q(v.toFixed(1), 'mL')} of ${q(sf(c), 'mol/L')} ${baseName}, both at ${degC(ti.toFixed(1))}, are mixed in a polystyrene cup calorimeter: $\\ce{${acid}(aq) + ${base}(aq) -> ${salt}(aq) + H2O(l)}$. The highest temperature reached is ${degC(tf.toFixed(1))}. What is the molar enthalpy of neutralisation of ${acidName}? ${WITH_SIGN}, ${a.phrase}. Assume the mixture has the density ($1.00\\ \\text{g/mL}$) and the specific heat capacity of water. ${WATER_C_TEXT}`,
      parts: [a.part],
      calculator: true,
      hints: ['The mass of the mixture is the total volume times the density.', ...molarHints.slice(1)],
      solution: [
        `$m = (${v.toFixed(1)} + ${v.toFixed(1)})\\ \\text{mL} \\times 1.00\\ \\text{g/mL} = ${(2 * v).toFixed(1)}\\ \\text{g}$`,
        `$Q = ${(2 * v).toFixed(1)} \\times 4.19 \\times ${fmtFixed(dt, 1)} = ${w(Q * 1000)}\\ \\text{J} = ${w(Q)}\\ \\text{kJ}$`,
        `$n(\\ce{${acid}}) = ${sf(c)}\\ \\text{mol/L} \\times ${(v / 1000).toFixed(4)}\\ \\text{L} = ${w(n)}\\ \\text{mol}$`,
        `The mixture warmed, so $\\Delta H$ is negative: $${DHM} = \\dfrac{-${w(Q)}}{${w(n)}} = ${a.shown}\\ \\text{kJ/mol}$`,
      ],
    };
  }
  const kind = rng.pick(['bomb', 'limiting', 'can'] as const);
  if (kind === 'bomb') {
    const s = rng.pick(FUELS);
    const M = mm(s.f);
    const C = rng.int(800, 1200) / 100;
    const m = rng.int(500, 1500) / 1000;
    const n = m / M;
    const dt = roundTo((n * Math.abs(s.dH) * rng.float(0.98, 1.02, 3)) / C, 2);
    const Q = C * dt;
    const molar = -Q / n;
    const a = answer(molar, 'kJ/mol', dpFor(molar), `$\\Delta_c H_m =$`);
    return {
      prompt: `A ${q(m.toFixed(3), 'g')} sample of ${s.name}, $\\ce{${s.f}}$, burns completely in a bomb calorimeter whose heat capacity is ${q(C.toFixed(2), 'kJ/°C')}. The temperature of the calorimeter rises by ${degC(dt.toFixed(2))}. What is the molar enthalpy of combustion of ${s.name}? ${WITH_SIGN}, ${a.phrase}. ${mmText(s.f)}.`,
      parts: [a.part],
      calculator: true,
      hints: ['A bomb calorimeter is given a heat capacity $C$ for the whole instrument, so $Q = C\\Delta t$.', 'Find the amount of the fuel in moles.', 'Burning releases energy, so the molar enthalpy is negative.'],
      solution: [`$Q = C\\Delta t = ${C.toFixed(2)}\\ \\text{kJ/°C} \\times ${dt.toFixed(2)}^\\circ\\text{C} = ${w(Q)}\\ \\text{kJ}$`, `$n = \\dfrac{${m.toFixed(3)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`, `$\\Delta_c H_m = \\dfrac{-${w(Q)}}{${w(n)}} = ${a.shown}\\ \\text{kJ/mol}$`],
    };
  }
  if (kind === 'limiting') {
    const [acid, acidName] = rng.pick(ACIDS);
    const [base, baseName] = rng.pick(BASES);
    const va = rng.int(5, 20) * 5;
    let vb = va;
    while (vb === va) vb = rng.int(5, 20) * 5;
    const ca = rng.pick(concs);
    let cb = rng.pick(concs);
    if (Math.abs(ca * va - cb * vb) < 1e-9) cb = cb === 2.0 ? 1.5 : cb + 0.25;
    const na = (ca * va) / 1000;
    const nb = (cb * vb) / 1000;
    const n = Math.min(na, nb);
    const lim = na < nb ? acid : base;
    const total = va + vb;
    const dt = roundTo((n * rng.float(55.2, 57.4, 2) * 1000) / (total * C_WATER), 1);
    const ti = rng.float(18, 23, 1);
    const tf = roundTo(ti + dt, 1);
    const Q = (total * C_WATER * dt) / 1000;
    const molar = -Q / n;
    const a = answer(molar, 'kJ/mol', dpFor(molar), `$${DHM} =$`);
    return {
      prompt: `${cap(q(va.toFixed(1), 'mL'))} of ${q(sf(ca), 'mol/L')} ${acidName} is mixed with ${q(vb.toFixed(1), 'mL')} of ${q(sf(cb), 'mol/L')} ${baseName} in a polystyrene cup calorimeter. Both solutions start at ${degC(ti.toFixed(1))}, and the highest temperature reached is ${degC(tf.toFixed(1))}. What is the molar enthalpy of neutralisation, per mole of water formed? ${WITH_SIGN}, ${a.phrase}. Assume the mixture has the density ($1.00\\ \\text{g/mL}$) and the specific heat capacity of water. ${WATER_C_TEXT}`,
      parts: [a.part],
      calculator: true,
      hints: ['The mass of the mixture comes from the total volume.', 'The acid and the base react 1 : 1. Only the reactant that runs out first, the limiting one, decides how much water forms.', 'Divide $\\Delta H$ by the amount of water formed.'],
      solution: [
        `$Q = (${va.toFixed(1)} + ${vb.toFixed(1)}) \\times 4.19 \\times ${fmtFixed(dt, 1)} = ${w(Q * 1000)}\\ \\text{J} = ${w(Q)}\\ \\text{kJ}$`,
        `$n(\\ce{${acid}}) = ${sf(ca)} \\times ${(va / 1000).toFixed(4)} = ${w(na)}\\ \\text{mol}$ and $n(\\ce{${base}}) = ${sf(cb)} \\times ${(vb / 1000).toFixed(4)} = ${w(nb)}\\ \\text{mol}$`,
        `$\\ce{${lim}}$ is limiting, so $${w(n)}\\ \\text{mol}$ of water forms.`,
        `$${DHM} = \\dfrac{-${w(Q)}}{${w(n)}} = ${a.shown}\\ \\text{kJ/mol}$`,
      ],
    };
  }
  const s = rng.pick(FUELS.filter((f) => f.burner));
  const M = mm(s.f);
  const mCan = rng.int(30, 80);
  // The fuel burned, weighed to the hundredth of a gram; most of its heat (55-80%) reaches the can.
  const burned = rng.int(150, 350) / 100;
  const reached = (burned / M) * Math.abs(s.dH) * rng.float(0.55, 0.8, 2) * 1000;
  const mW = Math.min(500, Math.max(100, Math.round((reached / rng.float(15, 35, 1) - mCan * 0.897) / C_WATER / 5) * 5));
  const dt = roundTo(reached / (mW * C_WATER + mCan * 0.897), 1);
  const absorbed = (mW * C_WATER + mCan * 0.897) * dt;
  const before = rng.float(150, 260, 2);
  const after = roundTo(before - burned, 2);
  const ti = rng.float(15, 22, 1);
  const tf = roundTo(ti + dt, 1);
  const n = burned / M;
  const Q = absorbed / 1000;
  const molar = -Q / n;
  const a = answer(molar, 'kJ/mol', dpFor(molar), `$\\Delta_c H_m =$`);
  return {
    prompt: `${aAn(s.name)} ${s.name} burner heats ${q(mW.toFixed(1), 'g')} of water in ${aAn(mCan.toFixed(1)).toLowerCase()} ${q(mCan.toFixed(1), 'g')} aluminium can from ${degC(ti.toFixed(1))} to ${degC(tf.toFixed(1))}. The burner's mass falls from ${q(before.toFixed(2), 'g')} to ${q(after.toFixed(2), 'g')}. From these data, what is the molar enthalpy of combustion of ${s.name}, $\\ce{${s.f}}$? Count the heat absorbed by both the water and the can. ${WITH_SIGN}, ${a.phrase}. ${WATER_C_TEXT} The specific heat capacity of aluminium is $0.897\\ ${JGC}$. ${mmText(s.f)}.`,
    parts: [a.part],
    calculator: true,
    hints: ['The water and the can warm by the same amount: add their values of $Q = mc\\Delta t$.', 'The mass of fuel burned is the loss in mass of the burner.', 'Burning releases energy, so the molar enthalpy is negative.'],
    solution: [
      `$Q = (${mW.toFixed(1)} \\times 4.19 + ${mCan.toFixed(1)} \\times 0.897) \\times ${dt.toFixed(1)} = ${w(absorbed)}\\ \\text{J} = ${w(Q)}\\ \\text{kJ}$`,
      `Mass burned $= ${before.toFixed(2)} - ${after.toFixed(2)} = ${burned.toFixed(2)}\\ \\text{g}$, so $n = \\dfrac{${burned.toFixed(2)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`,
      `$\\Delta_c H_m = \\dfrac{-${w(Q)}}{${w(n)}} = ${a.shown}\\ \\text{kJ/mol}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.3: ΔH = nΔrHm

interface MolarCase {
  f: string;
  name: string;
  /** "combustion of", "solution of", "fusion of" ... */
  process: string;
  /** What happens to the amount: "burns", "dissolves", "melts". */
  verb: string;
  dH: number;
  /** Where the value applies, for changes of state: "at its boiling point". */
  at?: string;
}
const MOLAR_CASES: MolarCase[] = [
  { f: 'CH4', name: 'methane', process: 'combustion', verb: 'burns', dH: combustion('CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)') },
  { f: 'C3H8', name: 'propane', process: 'combustion', verb: 'burns', dH: combustion('C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)') },
  { f: 'C4H10', name: 'butane', process: 'combustion', verb: 'burns', dH: combustion('C4H10(g) + 13/2 O2(g) -> 4CO2(g) + 5H2O(g)') },
  { f: 'C8H18', name: 'octane', process: 'combustion', verb: 'burns', dH: combustion('C8H18(l) + 25/2 O2(g) -> 8CO2(g) + 9H2O(g)') },
  { f: 'C2H5OH', name: 'ethanol', process: 'combustion', verb: 'burns', dH: combustion('C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)') },
  { f: 'CH3OH', name: 'methanol', process: 'combustion', verb: 'burns', dH: combustion('CH3OH(l) + 3/2 O2(g) -> CO2(g) + 2H2O(l)') },
  { f: 'C6H12O6', name: 'glucose', process: 'combustion', verb: 'is burned', dH: combustion('C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l)') },
  { f: 'C2H2', name: 'ethyne', process: 'combustion', verb: 'burns', dH: combustion('C2H2(g) + 5/2 O2(g) -> 2CO2(g) + H2O(g)') },
  { f: 'H2', name: 'hydrogen', process: 'combustion', verb: 'burns', dH: combustion('H2(g) + 1/2 O2(g) -> H2O(g)') },
  ...DISSOLVE.map((s) => ({ f: s.f, name: s.name, process: 'solution', verb: 'dissolves', dH: s.dH })),
  { f: 'H2O', name: 'ice', process: 'fusion', verb: 'melts', dH: 6.01, at: 'at its melting point' },
  { f: 'H2O', name: 'water', process: 'vaporisation', verb: 'boils away', dH: 40.7, at: 'at its boiling point' },
  { f: 'H2O', name: 'steam', process: 'condensation', verb: 'condenses', dH: -40.7, at: 'at $100^\\circ\\text{C}$' },
  { f: 'H2O', name: 'water', process: 'freezing', verb: 'freezes', dH: -6.01, at: 'at its freezing point' },
  { f: 'C2H5OH', name: 'ethanol', process: 'vaporisation', verb: 'boils away', dH: 38.6, at: 'at its boiling point' },
];
const dhmShown = (c: MolarCase) => signed(c.dH, Math.abs(c.dH) < 10 ? 2 : 1);
/** Fuels that are burned to heat water. */
const STOVE_FUELS = ['methane', 'propane', 'butane', 'octane', 'ethanol', 'methanol'];
const caseText = (c: MolarCase) => `The molar enthalpy of ${c.process} of ${c.name}${c.at ? ` ${c.at}` : ''} is $${dhmShown(c)}\\ \\text{kJ/mol}$.`;

function enthalpyChange(rng: Rng, d: Difficulty): GenOutput {
  const hints = [`$\\Delta H = n${DHM}$: the amount in moles times the molar enthalpy.`, 'The sign of $\\Delta H$ is the sign of the molar enthalpy: negative when energy is released.'];
  if (d === 1) {
    const c = rng.pick(MOLAR_CASES);
    const n = sig(rng.float(0.1, 6, 3));
    const dH = n * c.dH;
    const a = answer(dH, 'kJ', dpFor(dH), '$\\Delta H =$');
    return {
      prompt: `What is the enthalpy change when ${q(sf(n), 'mol')} of ${c.name} ${c.verb}? ${caseText(c)} ${WITH_SIGN}, ${a.phrase}.`,
      parts: [a.part],
      calculator: true,
      hints,
      solution: [`$\\Delta H = n${DHM} = ${sf(n)}\\ \\text{mol} \\times (${dhmShown(c)}\\ \\text{kJ/mol}) = ${signed(Number(a.shown), dpFor(dH))}\\ \\text{kJ}$`],
    };
  }
  if (d === 2) {
    const c = rng.pick(MOLAR_CASES);
    const M = mm(c.f);
    const m = sig(M * rng.float(0.1, 3, 3));
    const n = m / M;
    const dH = n * c.dH;
    const a = answer(dH, 'kJ', dpFor(dH), '$\\Delta H =$');
    return {
      prompt: `What is the enthalpy change when ${q(sf(m), 'g')} of ${c.name} ${c.verb}? ${caseText(c)} ${WITH_SIGN}, ${a.phrase}. ${mmText(c.f)}.`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the mass to moles first: $n = \\dfrac{m}{M}$.', ...hints],
      solution: [`$n = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`, `$\\Delta H = n${DHM} = ${w(n)} \\times (${dhmShown(c)}) = ${signed(Number(a.shown), dpFor(dH))}\\ \\text{kJ}$`],
    };
  }
  const c = rng.pick(MOLAR_CASES.filter((x) => x.process === 'combustion' && STOVE_FUELS.includes(x.name)));
  const M = mm(c.f);
  const assume = 'Assume all the heat released is absorbed by the water.';
  if (rng.chance(0.5)) {
    const litres = rng.int(50, 400) / 100;
    const ti = rng.float(8, 25, 1);
    const tf = rng.float(50, 95, 1);
    const dt = roundTo(tf - ti, 1);
    const Q = (litres * 1000 * C_WATER * dt) / 1000;
    const n = Q / Math.abs(c.dH);
    const m = n * M;
    const a = answer(m, 'g');
    return {
      prompt: `What mass of ${c.name}, $\\ce{${c.f}}$, must burn to warm ${q(sf(litres), 'L')} of water from ${degC(ti.toFixed(1))} to ${degC(tf.toFixed(1))}? Give the answer ${a.phrase}. ${caseText(c)} ${WATER_C_TEXT} The density of water is $1.00\\ \\text{kg/L}$. ${assume} ${mmText(c.f)}.`,
      parts: [a.part],
      calculator: true,
      hints: ['Find the heat the water must absorb with $Q = mc\\Delta t$.', 'The fuel must release that much energy: $n = \\dfrac{Q}{|\\Delta_c H_m|}$.', 'Then $m = nM$.'],
      solution: [
        `$Q = ${litres * 1000} \\times 4.19 \\times ${fmtFixed(dt, 1)} = ${w(Q * 1000)}\\ \\text{J} = ${w(Q)}\\ \\text{kJ}$`,
        `$n = \\dfrac{${w(Q)}\\ \\text{kJ}}{${t1(Math.abs(c.dH))}\\ \\text{kJ/mol}} = ${w(n)}\\ \\text{mol}$`,
        `$m = nM = ${w(n)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`,
      ],
    };
  }
  const m = sig(rng.float(0.5, 6, 3));
  const n = m / M;
  const Q = n * Math.abs(c.dH);
  const mW = Math.min(5000, Math.max(500, Math.round((Q * 1000) / (C_WATER * rng.float(10, 40, 1)) / 50) * 50));
  const ti = rng.float(10, 22, 1);
  const dt = (Q * 1000) / (mW * C_WATER);
  if (ti + dt > 99) return enthalpyChange(rng, d);
  const tf = ti + dt;
  const a = answer(tf, '°C', 1);
  return {
    prompt: `${cap(q(sf(m), 'g'))} of ${c.name}, $\\ce{${c.f}}$, burns under a pot holding ${q(sf(mW / 1000), 'kg')} of water at ${degC(ti.toFixed(1))}. What is the final temperature of the water, ${a.phrase}? ${caseText(c)} ${WATER_C_TEXT} ${assume} ${mmText(c.f)}.`,
    parts: [a.part],
    calculator: true,
    hints: ['Find the energy released: $n = \\dfrac{m}{M}$, then $\\Delta H = n\\Delta_c H_m$.', 'The water absorbs that energy: $\\Delta t = \\dfrac{Q}{mc}$, with $Q$ in joules and the mass in grams.'],
    solution: [
      `$n = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`,
      `Energy released: $${w(n)} \\times ${t1(Math.abs(c.dH))} = ${w(Q)}\\ \\text{kJ} = ${w(Q * 1000)}\\ \\text{J}$`,
      `$\\Delta t = \\dfrac{${w(Q * 1000)}}{${mW} \\times 4.19} = ${w(dt)}^\\circ\\text{C}$`,
      `$t_\\text{final} = ${ti.toFixed(1)} + ${w(dt)} = ${a.shown}^\\circ\\text{C}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.4: communicating enthalpy changes

const NOTE_RXS: Eq[] = [
  '2H2(g) + O2(g) -> 2H2O(g)', 'N2(g) + 3H2(g) -> 2NH3(g)', '4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)', '2SO2(g) + O2(g) -> 2SO3(g)',
  'CaCO3(s) -> CaO(s) + CO2(g)', 'N2(g) + O2(g) -> 2NO(g)', 'N2(g) + 2O2(g) -> 2NO2(g)', 'C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)',
  '2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(g)', '6CO2(g) + 6H2O(l) -> C6H12O6(s) + 6O2(g)', '2C2H6(g) + 7O2(g) -> 4CO2(g) + 6H2O(g)',
  '2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(s)', '2H2O(l) -> 2H2(g) + O2(g)', '2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(g)', '2HgO(s) -> 2Hg(l) + O2(g)',
  'CH4(g) + H2O(g) -> CO(g) + 3H2(g)', '2NaHCO3(s) -> Na2CO3(s) + H2O(g) + CO2(g)', 'H2(g) + Cl2(g) -> 2HCl(g)', '2Mg(s) + O2(g) -> 2MgO(s)',
  'C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)', 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)', '2KClO3(s) -> 2KCl(s) + 3O2(g)', 'C(s) + H2O(g) -> CO(g) + H2(g)',
  '2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(l)',
].map(parseEq);
const sideOf = (ts: Eq['r']) => ts.map((t) => `${t.k === 1 ? '' : t.k}${t.f}`).join(' + ');
/** The equation with the energy as a term: on the left if absorbed, on the right if released. */
function withTerm(e: Eq, energy: number, onLeft: boolean): string {
  const term = `${t1(energy)}\\ \\text{kJ}`;
  return onLeft ? `$\\ce{${sideOf(e.r)}} + ${term} \\mathrel{\\ce{->}} \\ce{${sideOf(e.p)}}$` : `$\\ce{${sideOf(e.r)} -> ${sideOf(e.p)}} + ${term}$`;
}
const species = (e: Eq) => [...e.r, ...e.p];

function enthalpyNotation(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(d === 1 ? NOTE_RXS : NOTE_RXS.filter((x) => species(x).some((t) => t.k > 1)));
  const dH = dHr(e);
  const exo = dH < 0;
  const size = Math.abs(dH);
  const signHint = 'Energy written with the products is released (exothermic, $\\Delta H$ negative). Energy written with the reactants is absorbed (endothermic, $\\Delta H$ positive).';
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: `The thermochemical equation ${withTerm(e, size, !exo)} shows the energy change as a term in the equation. What is $${DH}$ for the reaction as written? Give it with its sign, to the nearest tenth.`,
        parts: [numPart(dH, { decimals: 1, suffix: 'kJ', label: `$${DH} =$` })],
        hints: [signHint],
        solution: [`The energy is written with the ${exo ? 'products, so it is released' : 'reactants, so it is absorbed'}.`, `$${DH} = ${signed(dH)}\\ \\text{kJ}$`],
      };
    }
    const first = e.r[0].k;
    const other = first === 1 ? size * 2 : size / first;
    return {
      prompt: `For ${eqMd(e)}, $${DH} = ${signed(dH)}\\ \\text{kJ}$. Which equation shows the same energy change as a term in the equation?`,
      parts: [part(mc(rng, withTerm(e, size, !exo), [withTerm(e, size, exo), withTerm(e, other, !exo), withTerm(e, other, exo)]))],
      hints: [signHint, `The energy term is the energy for the equation exactly as written, so its size is $${t1(size)}\\ \\text{kJ}$.`],
      solution: [`$${DH}$ is ${exo ? 'negative, so the energy is released: it is written with the products' : 'positive, so the energy is absorbed: it is written with the reactants'}.`, withTerm(e, size, !exo)],
    };
  }
  const pickT = rng.pick(species(e).filter((t) => t.k > 1));
  const isR = e.r.includes(pickT);
  const molar = dH / pickT.k;
  if (d === 2) {
    const asTerm = rng.chance(0.4);
    const a = answer(molar, 'kJ/mol', 1, `$${DHM} =$`);
    return {
      prompt: `${asTerm ? `Consider the thermochemical equation ${withTerm(e, size, !exo)}.` : `For the reaction ${eqMd(e)}, $${DH} = ${signed(dH)}\\ \\text{kJ}$.`} What is the molar enthalpy of reaction per mole of ${$(pickT.f)} ${isR ? 'that reacts' : 'that forms'}? ${WITH_SIGN}, ${a.phrase}.`,
      parts: [a.part],
      calculator: true,
      hints: [...(asTerm ? [signHint] : []), `$${DH}$ is for the amounts in the balanced equation: here, ${pickT.k} mol of ${$(pickT.f)}.`, `$${DHM} = \\dfrac{${DH}}{n}$, where $n$ is the coefficient of that substance.`],
      solution: [...(asTerm ? [`The energy is written with the ${exo ? 'products: released, so' : 'reactants: absorbed, so'} $${DH} = ${signed(dH)}\\ \\text{kJ}$.`] : []), `$${DHM} = \\dfrac{${signed(dH)}\\ \\text{kJ}}{${pickT.k}\\ \\text{mol}} = ${signed(Number(a.shown))}\\ \\text{kJ/mol}$`],
    };
  }
  const others = species(e).filter((t) => t !== pickT);
  const better = others.filter((t) => t.k !== pickT.k && t.k !== 1);
  const fair = others.filter((t) => t.k !== pickT.k);
  const other = rng.pick(better.length ? better : fair.length ? fair : others);
  const given = roundTo(molar, 1);
  const total = given * pickT.k;
  const perOther = total / other.k;
  const a1 = answer(total, 'kJ', 1, `$${DH} =$`);
  const a2 = answer(perOther, 'kJ/mol', 1, `$${DHM}$ per mole of $\\ce{${other.f}}$`);
  return {
    prompt: `The molar enthalpy of reaction for ${$(pickT.f)} in the reaction ${eqMd(e)} is $${signed(given)}\\ \\text{kJ/mol}$. Find $${DH}$ for the equation as written, and the molar enthalpy of reaction per mole of ${$(other.f)}. Give each with its sign, to the nearest tenth.`,
    parts: [a1.part, a2.part],
    calculator: true,
    hints: [`The equation has ${pickT.k} mol of ${$(pickT.f)}, so $${DH} = ${pickT.k} \\times ${DHM}$.`, `Then divide $${DH}$ by the coefficient of ${$(other.f)}.`],
    solution: [`$${DH} = ${pickT.k} \\times (${signed(given)}) = ${signed(total)}\\ \\text{kJ}$`, `Per mole of $\\ce{${other.f}}$: $\\dfrac{${signed(total)}}{${other.k}} = ${signed(Number(a2.shown))}\\ \\text{kJ/mol}$`],
  };
}

/** An enthalpy diagram for an equation, labelled with the energy on the arrow. */
const diagram = (e: Eq, exo: boolean, label: string) => enthalpyFigure(sideUni(e.r), sideUni(e.p), exo, label);
const dhLabel = (v: number) => `ΔH = ${uniSigned(v)} kJ`;

function enthalpyDiagram(rng: Rng, d: Difficulty): GenOutput {
  const e = rng.pick(NOTE_RXS);
  const dH = dHr(e);
  const exo = dH < 0;
  if (d === 1) {
    return {
      prompt: `The enthalpy diagram shows a reaction. The arrow goes from the reactants to the products. What is $${DH}$ for the reaction, and is it exothermic or endothermic? Give $${DH}$ with its sign, to the nearest tenth.`,
      figure: diagram(e, exo, `${t1(Math.abs(dH))} kJ`),
      parts: [numPart(dH, { decimals: 1, suffix: 'kJ', label: `$${DH} =$` }), part(fixedChoice(EXO_ENDO, exo ? 0 : 1), { label: 'The reaction is' })],
      hints: ['Find the reactants and the products: the arrow starts at the reactants.', 'Products lower than the reactants means the system lost enthalpy, so $\\Delta H$ is negative.'],
      solution: [
        `The products, $\\ce{${sideOf(e.p)}}$, are ${exo ? 'below' : 'above'} the reactants, so the system ${exo ? 'lost' : 'gained'} $${t1(Math.abs(dH))}\\ \\text{kJ}$.`,
        `$${DH} = ${signed(dH)}\\ \\text{kJ}$: ${exo ? 'exothermic' : 'endothermic'}.`,
      ],
    };
  }
  if (d === 2) {
    const k = e.r[0].k;
    const wrongSize = k === 1 ? dH * 2 : dH / k;
    const asTerm = rng.chance(0.4);
    return {
      prompt: `${asTerm ? `Consider the thermochemical equation ${withTerm(e, Math.abs(dH), !exo)}.` : `For the reaction ${eqMd(e)}, $${DH} = ${signed(dH)}\\ \\text{kJ}$.`} Which enthalpy diagram shows this reaction?`,
      parts: [
        part(
          mcFigures(rng, [
            { md: '', figure: diagram(e, exo, dhLabel(dH)), correct: true },
            { md: '', figure: diagram(e, !exo, dhLabel(-dH)) },
            { md: '', figure: diagram(e, exo, dhLabel(wrongSize)) },
            { md: '', figure: diagram(e, !exo, dhLabel(dH)) },
          ]),
        ),
      ],
      hints: ['In an exothermic reaction the products are lower on the enthalpy axis than the reactants; in an endothermic reaction they are higher.', 'The arrow goes from the reactants to the products, and its label is $\\Delta H$ for the equation as written.'],
      solution: [
        `$${DH} = ${signed(dH)}\\ \\text{kJ}$ is ${exo ? 'negative' : 'positive'}, so the products are ${exo ? 'below' : 'above'} the reactants and the arrow points ${exo ? 'down' : 'up'}.`,
        `The arrow is labelled $\\Delta H = ${signed(dH)}\\ \\text{kJ}$, the value for the equation as written.`,
      ],
    };
  }
  const compounds = species(e).filter((x) => parseFormula(x.f.replace(/\((s|l|g|aq)\)$/, '')).atoms.size > 1);
  const t = rng.pick(compounds.length && rng.chance(0.8) ? compounds : species(e).filter((x) => x.f !== 'Hg(l)'));
  const f = t.f.replace(/\((s|l|g|aq)\)$/, '');
  const M = mm(f);
  const m = sig(M * rng.float(0.05, 3, 3));
  const n = m / M;
  const dHx = (n / t.k) * dH;
  const a = answer(dHx, 'kJ', dpFor(dHx), '$\\Delta H =$');
  const isR = e.r.includes(t);
  return {
    prompt: `The enthalpy diagram shows a reaction; the arrow goes from the reactants to the products. What is the enthalpy change when ${q(sf(m), 'g')} of ${$(t.f)} ${isR ? 'reacts' : 'forms'}? ${WITH_SIGN}, ${a.phrase}. ${mmText(f)}.`,
    figure: diagram(e, exo, dhLabel(dH)),
    parts: [a.part],
    calculator: true,
    hints: [`The diagram gives $\\Delta H$ for the equation as written, with ${t.k === 1 ? '1 mol' : `${t.k} mol`} of ${$(t.f)}.`, `Find the molar enthalpy per mole of ${$(t.f)}, then use $\\Delta H = n${DHM}$.`],
    solution: [
      `Per mole of $\\ce{${t.f}}$: $${DHM} = \\dfrac{${signed(dH)}}{${t.k}} = ${signed(dH / t.k, 2)}\\ \\text{kJ/mol}$`,
      `$n = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(n)}\\ \\text{mol}$`,
      `$\\Delta H = ${w(n)} \\times (${signed(dH / t.k, 2)}) = ${signed(Number(a.shown), dpFor(dHx))}\\ \\text{kJ}$`,
    ],
  };
}

export const THERMO_SKILLS: SkillDef[] = [
  skill({ id: 'c30-system-energy', name: 'Chemical systems and energy', description: 'Tell a chemical system from its surroundings, and describe the kinetic and potential energy they hold and exchange.', outcomes: A1, lessonId: L(1), format: 'mc', gen: systemEnergy }),
  skill({ id: 'c30-exo-endo', name: 'Exothermic and endothermic changes', description: 'Classify a change as exothermic or endothermic, and explain it with the energy of bonds broken and formed.', outcomes: A1, lessonId: L(1), gen: exoEndo }),
  skill({ id: 'c30-heat-q', name: 'Heat, Q = mcΔt', description: 'Calculate the heat gained or lost from a mass, a specific heat capacity and a temperature change.', outcomes: A1, lessonId: L(2), calculator: true, gen: heatQ }),
  skill({ id: 'c30-calorimetry-solve', name: 'Calorimetry problems', description: 'Find a mass, a specific heat capacity or a temperature from calorimetry data, and explain the assumptions of a simple calorimeter.', outcomes: A1, lessonId: L(2), calculator: true, gen: calorimetrySolve }),
  skill({ id: 'c30-molar-enthalpy', name: 'Molar enthalpy from calorimetry', description: 'Find a molar enthalpy of solution, neutralisation or combustion from calorimetry data, with the right sign.', outcomes: A1, lessonId: L(3), calculator: true, gen: molarEnthalpy }),
  skill({ id: 'c30-enthalpy-change', name: 'Enthalpy change, ΔH = nΔrHm', description: 'Calculate the enthalpy change for an amount or mass of a substance from its molar enthalpy, and work backwards to an amount.', outcomes: A1, lessonId: L(3), calculator: true, gen: enthalpyChange }),
  skill({ id: 'c30-enthalpy-notation', name: 'Communicating enthalpy changes', description: 'Move between an energy term in an equation, the enthalpy change beside it and the molar enthalpy of each substance.', outcomes: A1, lessonId: L(4), gen: enthalpyNotation }),
  skill({ id: 'c30-enthalpy-diagram', name: 'Enthalpy diagrams', description: 'Read and choose enthalpy diagrams for exothermic and endothermic reactions, and use them to find an enthalpy change.', outcomes: A1, lessonId: L(4), gen: enthalpyDiagram }),
  ...ENTHALPY_SKILLS,
];

