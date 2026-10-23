/**
 * Chemistry 20, Unit 2: gases. The kinetic molecular theory, pressure and temperature units, and
 * the gas laws: Boyle's, Charles's and Gay-Lussac's laws, the combined gas law, Avogadro's law,
 * molar volume and the ideal gas law. Every question states the constants it uses.
 */
import { mc, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { ce, molarMass, parseFormula } from '../../../chem/formula.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';

const L = (n: number) => `c20-2-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;

const ZERO = 273.15;
const KELVIN = 'Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.';
const R = 8.314;
const R_TEXT = '$R = 8.314\\ \\text{kPa·L/(mol·K)}$';

/** Decimal places that keep about three significant figures. */
const dpFor = (v: number) => (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : Math.abs(v) >= 1 ? 2 : 3);
/** A quantity with its unit, in maths: $2.50\ \text{L}$. */
const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
const degC = (v: string | number) => `$${v}^\\circ\\text{C}$`;
const kelvin = (c: number) => c + ZERO;
/** An answer rounded to about three significant figures, with the rounding said in the prompt. */
const answer = (v: number, suffix: string, dp = dpFor(v)) => ({ part: numPart(v, { decimals: dp, suffix }), phrase: roundingPhrase(dp), shown: fmtFixed(v, dp) });
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- lesson 2.1: the kinetic molecular theory

const KMT_TRUE = [
  'Gas particles move constantly and randomly, in straight lines between collisions.',
  'Gas particles are very small compared with the distances between them.',
  'Collisions between gas particles, and with the walls, lose no kinetic energy overall.',
  'In an ideal gas, the particles do not attract or repel each other.',
  'The average kinetic energy of the particles is proportional to the Kelvin temperature.',
];
const KMT_FALSE = [
  'Gas particles attract each other strongly, which keeps them close together.',
  'Gas particles slow down a little every time they hit the walls, until they stop.',
  'Most of the volume of a gas is taken up by the particles themselves.',
  'At the same temperature, heavier gas particles have a greater average kinetic energy.',
  'Gas particles stand still unless the gas is heated.',
];

const EXPLAIN: Array<{ ask: string; right: string; wrong: string[] }> = [
  {
    ask: 'Why does a gas exert pressure on the walls of its container?',
    right: 'Its particles keep colliding with the walls, and each collision pushes on them.',
    wrong: ['Its particles attract the walls of the container.', 'Its particles expand when they are heated and press on the walls.', 'Its particles are packed tightly against the walls.'],
  },
  {
    ask: 'Why can a gas be compressed much more easily than a liquid or a solid?',
    right: 'Its particles are far apart, with mostly empty space between them.',
    wrong: ['Its particles are softer and can be squashed.', 'Its particles shrink when they are pushed together.', 'Its particles attract each other, so they pull closer together.'],
  },
  {
    ask: 'A sealed, rigid can of gas is heated. Why does the pressure inside it rise?',
    right: 'The particles move faster, so they hit the walls more often and harder.',
    wrong: ['The particles get bigger, so they take up more room.', 'More particles form as the gas is heated.', 'The particles attract the walls more strongly.'],
  },
  {
    ask: 'A balloon is taken from a warm room into the cold outdoors. Why does it shrink?',
    right: 'The particles slow down, so at the same pressure they need less room.',
    wrong: ['The particles shrink in the cold.', 'Some of the particles stop moving and fall to the bottom.', 'The cold air pulls particles out through the rubber.'],
  },
  {
    ask: 'Why does the smell of perfume spread across a room even when the air seems still?',
    right: 'The particles move constantly and randomly, so they spread out on their own.',
    wrong: ['The perfume particles are pushed by the walls.', 'The perfume particles are lighter than nothing and float upwards.', 'The perfume particles expand to fill the room.'],
  },
];

function kmt(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const right = rng.pick(KMT_TRUE);
    return {
      prompt: 'Which statement is part of the kinetic molecular theory of an ideal gas?',
      parts: [part(mc(rng, right, rng.shuffle(KMT_FALSE).slice(0, 3)))],
      hints: ['The theory pictures tiny particles moving constantly and randomly, far apart, with no attractions in an ideal gas.'],
      solution: [`${right}`, 'The other statements contradict the theory.'],
    };
  }
  if (d === 2) {
    const e = rng.pick(EXPLAIN);
    return {
      prompt: `Use the kinetic molecular theory. ${e.ask}`,
      parts: [part(mc(rng, e.right, e.wrong))],
      hints: ['Gas particles never change size; what changes is how fast they move and how often they hit things.'],
      solution: [e.right],
    };
  }
  const variant = rng.int(0, 2);
  if (variant === 0) {
    return {
      prompt: 'Real gases behave most like an ideal gas under which conditions?',
      parts: [part(mc(rng, 'High temperature and low pressure', ['Low temperature and high pressure', 'Low temperature and low pressure', 'High temperature and high pressure']))],
      hints: ['A gas is most ideal when its particles are far apart and moving fast, so their own volume and their attractions matter least.'],
      solution: ['At low pressure the particles are far apart, so their own volume hardly matters.', 'At high temperature they move fast, so their attractions hardly matter.', 'High temperature and low pressure.'],
    };
  }
  const gases = rng.shuffle(['H2', 'He', 'CH4', 'N2', 'O2', 'Ar', 'CO2', 'Cl2']).slice(0, 2).sort((a, b) => molarMass(a) - molarMass(b));
  const [light, heavy] = gases;
  if (variant === 1) {
    return {
      prompt: `Samples of ${$(light)} and ${$(heavy)} are at the same temperature. How do the average kinetic energies of their molecules compare?`,
      parts: [part(mc(rng, 'They are the same.', [`${$(heavy)} has the greater average kinetic energy.`, `${$(light)} has the greater average kinetic energy.`, 'It depends on the pressure.']))],
      hints: ['The average kinetic energy of gas particles depends only on the Kelvin temperature.'],
      solution: ['Average kinetic energy is proportional to the Kelvin temperature, whatever the gas.', 'They are the same.'],
    };
  }
  return {
    prompt: `Samples of ${$(light)} and ${$(heavy)} are at the same temperature. Which molecules move faster on average?`,
    parts: [part(mc(rng, `${$(light)}, because its molecules are lighter`, [`${$(heavy)}, because its molecules are heavier`, 'They move at the same average speed.', `${$(heavy)}, because its molecules have more kinetic energy`]))],
    hints: ['At the same temperature they have the same average kinetic energy, $\\tfrac{1}{2}mv^2$. A smaller mass needs a higher speed.'],
    solution: ['Both have the same average kinetic energy, $\\tfrac{1}{2}mv^2$.', `${$(light)} has the smaller mass, so its molecules move faster.`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.2: pressure and temperature

const ATM = 101.325;
const MMHG = 760;
const PRESSURE_RULE = 'Use $1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}$.';
/** kPa in one of each unit. */
const KPA_PER: Record<string, number> = { kPa: 1, atm: ATM, 'mm Hg': ATM / MMHG };

function pressureUnits(rng: Rng, d: Difficulty): GenOutput {
  const pairs: Array<[string, string]> = d === 1 ? [['atm', 'kPa'], ['kPa', 'atm']] : d === 2 ? [['mm Hg', 'kPa'], ['kPa', 'mm Hg']] : [['mm Hg', 'atm'], ['atm', 'mm Hg']];
  const [from, to] = rng.pick(pairs);
  const given = from === 'atm' ? rng.float(0.2, 4.5, 2) : from === 'kPa' ? rng.int(30, 450) : rng.int(150, 2500);
  const kpa = given * KPA_PER[from];
  const v = kpa / KPA_PER[to];
  const a = answer(v, to);
  const factor = from === 'kPa' ? (to === 'atm' ? `\\dfrac{1\\ \\text{atm}}{101.325\\ \\text{kPa}}` : `\\dfrac{760\\ \\text{mm Hg}}{101.325\\ \\text{kPa}}`) : from === 'atm' ? (to === 'kPa' ? `\\dfrac{101.325\\ \\text{kPa}}{1\\ \\text{atm}}` : `\\dfrac{760\\ \\text{mm Hg}}{1\\ \\text{atm}}`) : to === 'kPa' ? `\\dfrac{101.325\\ \\text{kPa}}{760\\ \\text{mm Hg}}` : `\\dfrac{1\\ \\text{atm}}{760\\ \\text{mm Hg}}`;
  return {
    prompt: `Convert ${q(given, from)} to ${to === 'mm Hg' ? 'millimetres of mercury' : to === 'atm' ? 'atmospheres' : 'kilopascals'}, ${a.phrase}. ${PRESSURE_RULE}`,
    parts: [a.part],
    calculator: true,
    hints: ['Multiply by a conversion factor that has the unit you want on top and the unit you have on the bottom.'],
    solution: [`$${given}\\ \\text{${from}} \\times ${factor} = ${a.shown}\\ \\text{${to}}$`],
  };
}

function kelvinSkill(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const c = rng.int(-80, 200);
    const k = kelvin(c);
    return {
      prompt: `Convert ${degC(c)} to kelvins. ${KELVIN}`,
      parts: [numPart(k, { decimals: 2, tolerance: 0.005, suffix: 'K' })],
      hints: ['Add 273.15 to the Celsius temperature.'],
      solution: [`$T = ${c} + 273.15 = ${k.toFixed(2)}\\ \\text{K}$`],
    };
  }
  if (d === 2) {
    const k = rng.int(40, 700);
    const c = k - ZERO;
    return {
      prompt: `Convert ${q(k, 'K')} to degrees Celsius. ${KELVIN}`,
      parts: [numPart(c, { decimals: 2, tolerance: 0.005, suffix: '°C' })],
      hints: ['Subtract 273.15 from the Kelvin temperature.'],
      solution: [`$T = ${k} - 273.15 = ${c.toFixed(2)}^\\circ\\text{C}$`],
    };
  }
  const c = rng.int(-50, 120);
  const factor = rng.pick([2, 3]);
  const k2 = kelvin(c) * factor;
  const c2 = k2 - ZERO;
  return {
    prompt: `A gas is at ${degC(c)}. Its Kelvin temperature is ${factor === 2 ? 'doubled' : 'tripled'}. What is its new temperature in degrees Celsius? ${KELVIN}`,
    parts: [numPart(c2, { decimals: 2, tolerance: 0.005, suffix: '°C' })],
    hints: ['Change to kelvins first, multiply, then change back to degrees Celsius.', `${factor === 2 ? 'Doubling' : 'Tripling'} the Celsius temperature is not the same thing.`],
    solution: [`$T_1 = ${c} + 273.15 = ${kelvin(c).toFixed(2)}\\ \\text{K}$`, `$T_2 = ${factor} \\times ${kelvin(c).toFixed(2)} = ${k2.toFixed(2)}\\ \\text{K}$`, `$T_2 = ${k2.toFixed(2)} - 273.15 = ${c2.toFixed(2)}^\\circ\\text{C}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.3: Boyle's law

const CONTAINERS = ['a cylinder with a movable piston', 'a syringe sealed at the tip', 'a bicycle pump with its outlet blocked', 'a gas syringe'];

/** A pressure in kPa that is not the given one. */
const otherPressure = (rng: Rng, p: number) => {
  let p2 = p;
  while (p2 === p || Math.abs(p2 - p) < 20) p2 = rng.int(6, 45) * 10;
  return p2;
};

function boyle(rng: Rng, d: Difficulty): GenOutput {
  const p1 = rng.int(8, 30) * 10;
  const v1 = rng.float(1.5, 12, 1);
  const where = rng.pick(CONTAINERS);
  if (d < 3) {
    const k = d === 1 ? rng.pick([2, 3, 0.5]) : 0;
    const p2 = d === 1 ? p1 * k : otherPressure(rng, p1);
    const v2 = (p1 * v1) / p2;
    const a = answer(v2, 'L');
    return {
      prompt: `A gas in ${where} has a volume of ${q(v1.toFixed(1), 'L')} at ${q(p1, 'kPa')}. The pressure changes to ${q(p2, 'kPa')} while the temperature stays the same. What is the new volume, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: ["Boyle's law: $P_1V_1 = P_2V_2$ when the temperature and amount of gas stay the same.", 'Solve for $V_2 = \\dfrac{P_1V_1}{P_2}$.'],
      solution: [`$V_2 = \\dfrac{P_1V_1}{P_2} = \\dfrac{${p1} \\times ${v1.toFixed(1)}}{${p2}} = ${a.shown}\\ \\text{L}$`, p2 > p1 ? 'The pressure went up, so the volume went down.' : 'The pressure went down, so the volume went up.'],
    };
  }
  let v2 = v1;
  while (Math.abs(v2 - v1) < 0.5) v2 = rng.float(1, 15, 1);
  const p2 = (p1 * v1) / v2;
  const a = answer(p2, 'kPa');
  return {
    prompt: `A gas in ${where} is at ${q(p1, 'kPa')} with a volume of ${q(v1.toFixed(1), 'L')}. At the same temperature, what pressure would make its volume ${q(v2.toFixed(1), 'L')}? Give the pressure ${a.phrase}.`,
    parts: [a.part],
    calculator: true,
    hints: ["Boyle's law: $P_1V_1 = P_2V_2$.", 'Solve for $P_2 = \\dfrac{P_1V_1}{V_2}$.'],
    solution: [`$P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{${p1} \\times ${v1.toFixed(1)}}{${v2.toFixed(1)}} = ${a.shown}\\ \\text{kPa}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.4: Charles's and Gay-Lussac's laws

/** Two different temperatures in °C, at least 15 degrees apart. */
function twoTemps(rng: Rng, lo = -30, hi = 150): [number, number] {
  const t1 = rng.int(lo, hi);
  let t2 = t1;
  while (Math.abs(t2 - t1) < 15) t2 = rng.int(lo, hi);
  return [t1, t2];
}

function charles(rng: Rng, d: Difficulty): GenOutput {
  const v1 = rng.float(1.0, 9.0, 2);
  if (d === 1) {
    const k1 = rng.int(25, 40) * 10;
    let k2 = k1;
    while (Math.abs(k2 - k1) < 20) k2 = rng.int(20, 45) * 10;
    const v2 = (v1 * k2) / k1;
    const a = answer(v2, 'L');
    return {
      prompt: `A balloon holds ${q(v1.toFixed(2), 'L')} of gas at ${q(k1, 'K')}. At the same pressure, what is its volume at ${q(k2, 'K')}, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: ["Charles's law: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, with temperatures in kelvins.", 'Solve for $V_2 = V_1 \\times \\dfrac{T_2}{T_1}$.'],
      solution: [`$V_2 = V_1 \\times \\dfrac{T_2}{T_1} = ${v1.toFixed(2)} \\times \\dfrac{${k2}}{${k1}} = ${a.shown}\\ \\text{L}$`],
    };
  }
  const [t1, t2] = twoTemps(rng);
  if (d === 2) {
    const v2 = (v1 * kelvin(t2)) / kelvin(t1);
    const a = answer(v2, 'L');
    return {
      prompt: `A gas has a volume of ${q(v1.toFixed(2), 'L')} at ${degC(t1)}. The pressure stays the same. What is its volume at ${degC(t2)}, ${a.phrase}? ${KELVIN}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change both temperatures to kelvins first.', "Charles's law: $V_2 = V_1 \\times \\dfrac{T_2}{T_1}$."],
      solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$ and $T_2 = ${kelvin(t2).toFixed(2)}\\ \\text{K}$`, `$V_2 = ${v1.toFixed(2)} \\times \\dfrac{${kelvin(t2).toFixed(2)}}{${kelvin(t1).toFixed(2)}} = ${a.shown}\\ \\text{L}$`],
    };
  }
  const v2 = (v1 * kelvin(t2)) / kelvin(t1);
  const v2r = Math.round(v2 * 100) / 100;
  const t2c = (v2r / v1) * kelvin(t1) - ZERO;
  return {
    prompt: `A gas has a volume of ${q(v1.toFixed(2), 'L')} at ${degC(t1)}. At the same pressure, at what temperature in degrees Celsius will its volume be ${q(v2r.toFixed(2), 'L')}? Round to the nearest degree. ${KELVIN}`,
    parts: [numPart(t2c, { decimals: 0, suffix: '°C' })],
    calculator: true,
    hints: ["Charles's law, solved for the temperature: $T_2 = T_1 \\times \\dfrac{V_2}{V_1}$, in kelvins.", 'Change the answer back to degrees Celsius.'],
    solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$`, `$T_2 = ${kelvin(t1).toFixed(2)} \\times \\dfrac{${v2r.toFixed(2)}}{${v1.toFixed(2)}} = ${(t2c + ZERO).toFixed(1)}\\ \\text{K}$`, `$T_2 = ${(t2c + ZERO).toFixed(1)} - 273.15 = ${t2c.toFixed(0)}^\\circ\\text{C}$`],
  };
}

const RIGID = ['a sealed steel gas cylinder', 'a sealed aerosol can', 'a rigid sealed flask', 'a pressure cooker with its valve closed'];

function gayLussac(rng: Rng, d: Difficulty): GenOutput {
  const p1 = rng.int(9, 40) * 10;
  const where = rng.pick(RIGID);
  if (d === 1) {
    const k1 = rng.int(25, 40) * 10;
    let k2 = k1;
    while (Math.abs(k2 - k1) < 20) k2 = rng.int(20, 50) * 10;
    const p2 = (p1 * k2) / k1;
    const a = answer(p2, 'kPa');
    return {
      prompt: `The gas in ${where} is at ${q(p1, 'kPa')} and ${q(k1, 'K')}. What is its pressure at ${q(k2, 'K')}, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: ["Gay-Lussac's law: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$ when the volume stays the same, with temperatures in kelvins."],
      solution: [`$P_2 = P_1 \\times \\dfrac{T_2}{T_1} = ${p1} \\times \\dfrac{${k2}}{${k1}} = ${a.shown}\\ \\text{kPa}$`],
    };
  }
  const [t1, t2] = twoTemps(rng, -20, 130);
  if (d === 2) {
    const p2 = (p1 * kelvin(t2)) / kelvin(t1);
    const a = answer(p2, 'kPa');
    return {
      prompt: `The gas in ${where} is at ${q(p1, 'kPa')} and ${degC(t1)}. What is its pressure at ${degC(t2)}, ${a.phrase}? ${KELVIN}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change both temperatures to kelvins first.', "Gay-Lussac's law: $P_2 = P_1 \\times \\dfrac{T_2}{T_1}$."],
      solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$ and $T_2 = ${kelvin(t2).toFixed(2)}\\ \\text{K}$`, `$P_2 = ${p1} \\times \\dfrac{${kelvin(t2).toFixed(2)}}{${kelvin(t1).toFixed(2)}} = ${a.shown}\\ \\text{kPa}$`],
    };
  }
  const p2 = Math.round((p1 * kelvin(t2)) / kelvin(t1));
  const t2c = (p2 / p1) * kelvin(t1) - ZERO;
  return {
    prompt: `The gas in ${where} is at ${q(p1, 'kPa')} and ${degC(t1)}. At what temperature in degrees Celsius will its pressure be ${q(p2, 'kPa')}? Round to the nearest degree. ${KELVIN}`,
    parts: [numPart(t2c, { decimals: 0, suffix: '°C' })],
    calculator: true,
    hints: ["Gay-Lussac's law, solved for the temperature: $T_2 = T_1 \\times \\dfrac{P_2}{P_1}$, in kelvins.", 'Change the answer back to degrees Celsius.'],
    solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$`, `$T_2 = ${kelvin(t1).toFixed(2)} \\times \\dfrac{${p2}}{${p1}} = ${(t2c + ZERO).toFixed(1)}\\ \\text{K}$`, `$T_2 = ${(t2c + ZERO).toFixed(1)} - 273.15 = ${t2c.toFixed(0)}^\\circ\\text{C}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.5: the combined gas law

function combined(rng: Rng, d: Difficulty): GenOutput {
  const p1 = rng.int(8, 30) * 10;
  const p2 = otherPressure(rng, p1);
  const v1 = rng.float(1.0, 15, 1);
  const law = '$\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}$';
  if (d === 1) {
    const k1 = rng.int(25, 40) * 10;
    let k2 = k1;
    while (Math.abs(k2 - k1) < 20) k2 = rng.int(20, 45) * 10;
    const v2 = (p1 * v1 * k2) / (k1 * p2);
    const a = answer(v2, 'L');
    return {
      prompt: `A gas occupies ${q(v1.toFixed(1), 'L')} at ${q(p1, 'kPa')} and ${q(k1, 'K')}. What volume does it occupy at ${q(p2, 'kPa')} and ${q(k2, 'K')}, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: [`The combined gas law: ${law}.`, 'Solve for $V_2 = V_1 \\times \\dfrac{P_1}{P_2} \\times \\dfrac{T_2}{T_1}$.'],
      solution: [`$V_2 = ${v1.toFixed(1)} \\times \\dfrac{${p1}}{${p2}} \\times \\dfrac{${k2}}{${k1}} = ${a.shown}\\ \\text{L}$`],
    };
  }
  const [t1, t2] = twoTemps(rng, -20, 120);
  if (d === 2 || rng.chance(0.5)) {
    if (d === 2) {
      const v2 = (p1 * v1 * kelvin(t2)) / (kelvin(t1) * p2);
      const a = answer(v2, 'L');
      return {
        prompt: `A gas occupies ${q(v1.toFixed(1), 'L')} at ${q(p1, 'kPa')} and ${degC(t1)}. What volume does it occupy at ${q(p2, 'kPa')} and ${degC(t2)}, ${a.phrase}? ${KELVIN}`,
        parts: [a.part],
        calculator: true,
        hints: ['Change both temperatures to kelvins first.', `The combined gas law: ${law}, so $V_2 = V_1 \\times \\dfrac{P_1}{P_2} \\times \\dfrac{T_2}{T_1}$.`],
        solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$ and $T_2 = ${kelvin(t2).toFixed(2)}\\ \\text{K}$`, `$V_2 = ${v1.toFixed(1)} \\times \\dfrac{${p1}}{${p2}} \\times \\dfrac{${kelvin(t2).toFixed(2)}}{${kelvin(t1).toFixed(2)}} = ${a.shown}\\ \\text{L}$`],
      };
    }
    let v2 = v1;
    while (Math.abs(v2 - v1) < 0.5) v2 = rng.float(1, 15, 1);
    const p = (p1 * v1 * kelvin(t2)) / (kelvin(t1) * v2);
    const a = answer(p, 'kPa');
    return {
      prompt: `A gas occupies ${q(v1.toFixed(1), 'L')} at ${q(p1, 'kPa')} and ${degC(t1)}. It is moved into a ${q(v2.toFixed(1), 'L')} container and brought to ${degC(t2)}. What is its new pressure, ${a.phrase}? ${KELVIN}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change both temperatures to kelvins first.', `Solve the combined gas law for $P_2 = P_1 \\times \\dfrac{V_1}{V_2} \\times \\dfrac{T_2}{T_1}$.`],
      solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$ and $T_2 = ${kelvin(t2).toFixed(2)}\\ \\text{K}$`, `$P_2 = ${p1} \\times \\dfrac{${v1.toFixed(1)}}{${v2.toFixed(1)}} \\times \\dfrac{${kelvin(t2).toFixed(2)}}{${kelvin(t1).toFixed(2)}} = ${a.shown}\\ \\text{kPa}$`],
    };
  }
  const v2 = Math.round(((p1 * v1 * kelvin(t2)) / (kelvin(t1) * p2)) * 10) / 10;
  const k2 = (p2 * v2 * kelvin(t1)) / (p1 * v1);
  const t2c = k2 - ZERO;
  return {
    prompt: `A gas occupies ${q(v1.toFixed(1), 'L')} at ${q(p1, 'kPa')} and ${degC(t1)}. At what temperature in degrees Celsius will it occupy ${q(v2.toFixed(1), 'L')} at ${q(p2, 'kPa')}? Round to the nearest degree. ${KELVIN}`,
    parts: [numPart(t2c, { decimals: 0, suffix: '°C' })],
    calculator: true,
    hints: [`Solve the combined gas law for $T_2 = T_1 \\times \\dfrac{P_2}{P_1} \\times \\dfrac{V_2}{V_1}$, in kelvins.`, 'Change the answer back to degrees Celsius.'],
    solution: [`$T_1 = ${kelvin(t1).toFixed(2)}\\ \\text{K}$`, `$T_2 = ${kelvin(t1).toFixed(2)} \\times \\dfrac{${p2}}{${p1}} \\times \\dfrac{${v2.toFixed(1)}}{${v1.toFixed(1)}} = ${k2.toFixed(1)}\\ \\text{K}$`, `$T_2 = ${k2.toFixed(1)} - 273.15 = ${t2c.toFixed(0)}^\\circ\\text{C}$`],
  };
}

/** A fraction p/q in lowest terms, as LaTeX. */
function ratio(p: number, qq: number): string {
  const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
  const k = g(p, qq);
  const [a, b] = [p / k, qq / k];
  return b === 1 ? `${a}` : `\\tfrac{${a}}{${b}}`;
}

const TIMES: Record<number, string> = { 2: 'doubled', 3: 'tripled', 4: 'multiplied by 4' };
const changeWord = (k: number) => (k >= 1 ? TIMES[k] : k === 0.5 ? 'halved' : k === 1 / 3 ? 'cut to a third' : 'cut to a quarter');
/** k as a fraction p/q with small whole numbers. */
const asFrac = (k: number): [number, number] => (k >= 1 ? [k, 1] : [1, Math.round(1 / k)]);

function gasChange(rng: Rng, d: Difficulty): GenOutput {
  const factors = [2, 3, 4, 0.5, 1 / 3, 0.25];
  if (d === 2 && rng.chance(0.4)) {
    const t1 = rng.pick([10, 20, 25, 30, 40]);
    const t2 = t1 * 2;
    const pct = Math.round(((t2 - t1) / kelvin(t1)) * 100);
    return {
      prompt: `At constant pressure, a gas is warmed from ${degC(t1)} to ${degC(t2)}. What happens to its volume?`,
      parts: [part(mc(rng, `It increases by about ${pct}%.`, ['It doubles.', 'It is halved.', 'It increases by about 50%.']))],
      hints: ["Charles's law uses Kelvin temperatures. Doubling the Celsius temperature does not double the Kelvin temperature."],
      solution: [`In kelvins, the gas goes from about ${Math.round(kelvin(t1))} K to about ${Math.round(kelvin(t2))} K.`, `The volume is multiplied by $\\dfrac{${kelvin(t2).toFixed(2)}}{${kelvin(t1).toFixed(2)}} \\approx ${(kelvin(t2) / kelvin(t1)).toFixed(3)}$: an increase of about ${pct}%.`],
    };
  }
  if (d < 3) {
    const k = rng.pick(factors);
    const [a, b] = asFrac(k);
    const cases = d === 1
      ? [
          { what: 'pressure', held: 'temperature', target: 'volume', direct: false },
          { what: 'Kelvin temperature', held: 'pressure', target: 'volume', direct: true },
        ]
      : [
          { what: 'amount of gas (in moles)', held: 'temperature and pressure', target: 'volume', direct: true },
          { what: 'Kelvin temperature', held: 'volume', target: 'pressure', direct: true },
          { what: 'volume', held: 'temperature', target: 'pressure', direct: false },
        ];
    const c = rng.pick(cases);
    const [p, qq] = c.direct ? [a, b] : [b, a];
    const right = `It is multiplied by $${ratio(p, qq)}$.`;
    return {
      prompt: `The ${c.what} of a gas is ${changeWord(k)}, while its ${c.held} stay${c.held.includes(' and ') ? '' : 's'} the same. What happens to its ${c.target}?`,
      parts: [part(mc(rng, right, [`It is multiplied by $${ratio(qq, p)}$.`, 'It stays the same.', `It is multiplied by $${ratio(p * p, qq * qq)}$.`]))],
      hints: [c.direct ? `The ${c.target} is directly proportional to the ${c.what}: they change by the same factor.` : `The ${c.target} is inversely proportional to the ${c.what}: when one is multiplied by a factor, the other is divided by it.`],
      solution: [`${cap(c.target)} and ${c.what} are ${c.direct ? 'directly' : 'inversely'} proportional here.`, `The ${c.target} is multiplied by $${ratio(p, qq)}$.`],
    };
  }
  const kp = rng.pick(factors);
  let kt = kp;
  while (kt === kp) kt = rng.pick(factors);
  const [pa, pb] = asFrac(kp);
  const [ta, tb] = asFrac(kt);
  // V2/V1 = (T2/T1) / (P2/P1) = (ta/tb) * (pb/pa)
  const num = ta * pb;
  const den = tb * pa;
  const right = `It is multiplied by $${ratio(num, den)}$.`;
  return {
    prompt: `The pressure of a gas is ${changeWord(kp)} and its Kelvin temperature is ${changeWord(kt)}. The amount of gas stays the same. What happens to its volume?`,
    parts: [part(mc(rng, right, [[den, num], [pa * ta, pb * tb], [pb * tb, pa * ta]].map(([x, y]) => (x === y ? 'It stays the same.' : `It is multiplied by $${ratio(x, y)}$.`)).concat('It stays the same.', `It is multiplied by $${ratio(num * num, den * den)}$.`)))],
    hints: ['From the combined gas law, $V_2 = V_1 \\times \\dfrac{P_1}{P_2} \\times \\dfrac{T_2}{T_1}$.', 'Multiply by the temperature factor and divide by the pressure factor.'],
    solution: [`$\\dfrac{V_2}{V_1} = \\dfrac{T_2/T_1}{P_2/P_1} = \\dfrac{${ratio(ta, tb)}}{${ratio(pa, pb)}} = ${ratio(num, den)}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.6: Avogadro's law and molar volume

const GASES = ['H2', 'He', 'CH4', 'NH3', 'N2', 'O2', 'Ar', 'CO2', 'SO2', 'Cl2'];
const GAS_NAMES: Record<string, string> = {
  H2: 'hydrogen', He: 'helium', CH4: 'methane', NH3: 'ammonia', N2: 'nitrogen', O2: 'oxygen', Ar: 'argon', CO2: 'carbon dioxide', SO2: 'sulfur dioxide', Cl2: 'chlorine',
};
const gasName = (f: string) => `${GAS_NAMES[f]}, ${$(f)}`;
/** The molar masses of the elements in a formula, as a sentence: "Use these molar masses: C 12.01 g/mol, O 16.00 g/mol." */
function massesText(f: string): string {
  const list = [...parseFormula(f).atoms.keys()].map((s) => `${s} $${element(s)!.mass.toFixed(2)}\\ \\text{g/mol}$`);
  return list.length === 1 ? `Use the molar mass ${list[0]}.` : `Use these molar masses: ${list.join(', ')}.`;
}
/** Gases that condense under modest pressure near room temperature: kept to 100 kPa or less and 20 °C or more. */
const CONDENSABLE = new Set(['NH3', 'SO2', 'Cl2']);

function avogadro(rng: Rng, d: Difficulty): GenOutput {
  const n1 = rng.float(0.2, 2.5, 2);
  const v1 = Math.round(n1 * rng.float(22, 26, 1) * 10) / 10;
  const law = "Avogadro's law: $\\dfrac{V_1}{n_1} = \\dfrac{V_2}{n_2}$ at the same temperature and pressure.";
  if (d < 3) {
    const n2 = d === 1 ? n1 * rng.pick([2, 3, 0.5]) : rng.float(0.2, 3.5, 2);
    const v2 = (v1 * n2) / n1;
    const a = answer(v2, 'L');
    return {
      prompt: `A flexible container holds ${q(n1.toFixed(2), 'mol')} of gas in ${q(v1.toFixed(1), 'L')}. At the same temperature and pressure, what volume would ${q(n2.toFixed(2), 'mol')} of the gas occupy, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: [law, 'Solve for $V_2 = V_1 \\times \\dfrac{n_2}{n_1}$.'],
      solution: [`$V_2 = ${v1.toFixed(1)} \\times \\dfrac{${n2.toFixed(2)}}{${n1.toFixed(2)}} = ${a.shown}\\ \\text{L}$`],
    };
  }
  const v2 = Math.round((v1 + rng.float(2, 15, 1)) * 10) / 10;
  const n2 = (n1 * v2) / v1;
  const added = n2 - n1;
  const a = answer(added, 'mol');
  return {
    prompt: `A flexible container holds ${q(n1.toFixed(2), 'mol')} of gas in ${q(v1.toFixed(1), 'L')}. How many moles of gas must be added to make its volume ${q(v2.toFixed(1), 'L')} at the same temperature and pressure? Give the answer ${a.phrase}.`,
    parts: [a.part],
    calculator: true,
    hints: [law, 'Find the total amount $n_2$ first, then subtract what is already there.'],
    solution: [`$n_2 = n_1 \\times \\dfrac{V_2}{V_1} = ${n1.toFixed(2)} \\times \\dfrac{${v2.toFixed(1)}}{${v1.toFixed(1)}} = ${n2.toFixed(3)}\\ \\text{mol}$`, `Added: $${n2.toFixed(3)} - ${n1.toFixed(2)} = ${a.shown}\\ \\text{mol}$`],
  };
}

const CONDITIONS = [
  { name: 'STP', full: 'STP ($0^\\circ\\text{C}$ and $101.325\\ \\text{kPa}$)', vm: 22.4 },
  { name: 'SATP', full: 'SATP ($25^\\circ\\text{C}$ and $100\\ \\text{kPa}$)', vm: 24.8 },
];

function molarVolume(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(CONDITIONS);
  const rule = `At ${c.full}, the molar volume of a gas is $${c.vm}\\ \\text{L/mol}$.`;
  const gas = rng.pick(GASES);
  if (d === 1) {
    const n = rng.float(0.15, 6, 2);
    const v = n * c.vm;
    const a = answer(v, 'L');
    return {
      prompt: `What volume does ${q(n.toFixed(2), 'mol')} of ${gasName(gas)}, occupy at ${c.name}, ${a.phrase}? ${rule}`,
      parts: [a.part],
      calculator: true,
      hints: ['Volume = amount × molar volume: $V = n \\times V_m$.'],
      solution: [`$V = ${n.toFixed(2)}\\ \\text{mol} \\times ${c.vm}\\ \\text{L/mol} = ${a.shown}\\ \\text{L}$`],
    };
  }
  if (d === 2) {
    const v = rng.float(1, 120, 1);
    const n = v / c.vm;
    const a = answer(n, 'mol');
    return {
      prompt: `How many moles of ${gasName(gas)}, are in ${q(v.toFixed(1), 'L')} of the gas at ${c.name}? Give the answer ${a.phrase}. ${rule}`,
      parts: [a.part],
      calculator: true,
      hints: ['Amount = volume ÷ molar volume: $n = \\dfrac{V}{V_m}$.'],
      solution: [`$n = \\dfrac{${v.toFixed(1)}\\ \\text{L}}{${c.vm}\\ \\text{L/mol}} = ${a.shown}\\ \\text{mol}$`],
    };
  }
  const M = molarMass(gas);
  const m = rng.float(1, 80, 1);
  const v = (m / M) * c.vm;
  const a = answer(v, 'L');
  return {
    prompt: `What volume does ${q(m.toFixed(1), 'g')} of ${gasName(gas)}, occupy at ${c.name}, ${a.phrase}? ${rule} ${massesText(gas)}`,
    parts: [a.part],
    calculator: true,
    hints: ['Change the mass to moles first: $n = \\dfrac{m}{M}$.', 'Then $V = n \\times V_m$.'],
    solution: [`$M = ${M.toFixed(2)}\\ \\text{g/mol}$`, `$n = \\dfrac{${m.toFixed(1)}}{${M.toFixed(2)}} = ${(m / M).toFixed(4)}\\ \\text{mol}$`, `$V = ${(m / M).toFixed(4)} \\times ${c.vm} = ${a.shown}\\ \\text{L}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.7: the ideal gas law

function idealGas(rng: Rng, d: Difficulty): GenOutput {
  const rule = `Use $PV = nRT$ with ${R_TEXT}.`;
  if (d === 1) {
    const n = rng.float(0.1, 3, 2);
    const v = rng.float(2, 40, 1);
    const k = rng.int(25, 40) * 10;
    const p = (n * R * k) / v;
    const a = answer(p, 'kPa');
    return {
      prompt: `A ${q(v.toFixed(1), 'L')} container holds ${q(n.toFixed(2), 'mol')} of gas at ${q(k, 'K')}. What is the pressure of the gas, ${a.phrase}? ${rule}`,
      parts: [a.part],
      calculator: true,
      hints: ['Solve $PV = nRT$ for $P = \\dfrac{nRT}{V}$.'],
      solution: [`$P = \\dfrac{nRT}{V} = \\dfrac{${n.toFixed(2)} \\times 8.314 \\times ${k}}{${v.toFixed(1)}} = ${a.shown}\\ \\text{kPa}$`],
    };
  }
  let t = rng.int(-20, 150);
  let T = kelvin(t);
  let p = rng.int(5, 40) * 10;
  if (d === 2) {
    if (rng.chance(0.5)) {
      const n = rng.float(0.1, 3, 2);
      const v = (n * R * T) / p;
      const a = answer(v, 'L');
      return {
        prompt: `What volume does ${q(n.toFixed(2), 'mol')} of gas occupy at ${q(p, 'kPa')} and ${degC(t)}, ${a.phrase}? ${rule} ${KELVIN}`,
        parts: [a.part],
        calculator: true,
        hints: ['Change the temperature to kelvins.', 'Solve $PV = nRT$ for $V = \\dfrac{nRT}{P}$.'],
        solution: [`$T = ${T.toFixed(2)}\\ \\text{K}$`, `$V = \\dfrac{${n.toFixed(2)} \\times 8.314 \\times ${T.toFixed(2)}}{${p}} = ${a.shown}\\ \\text{L}$`],
      };
    }
    const v = rng.float(1, 50, 1);
    const n = (p * v) / (R * T);
    const a = answer(n, 'mol');
    return {
      prompt: `How many moles of gas are in a ${q(v.toFixed(1), 'L')} tank at ${q(p, 'kPa')} and ${degC(t)}? Give the answer ${a.phrase}. ${rule} ${KELVIN}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the temperature to kelvins.', 'Solve $PV = nRT$ for $n = \\dfrac{PV}{RT}$.'],
      solution: [`$T = ${T.toFixed(2)}\\ \\text{K}$`, `$n = \\dfrac{${p} \\times ${v.toFixed(1)}}{8.314 \\times ${T.toFixed(2)}} = ${a.shown}\\ \\text{mol}$`],
    };
  }
  const gas = rng.pick(GASES);
  const M = molarMass(gas);
  const v = rng.float(1, 30, 1);
  if (rng.chance(0.5)) {
    if (CONDENSABLE.has(gas)) [t, T, p] = [Math.max(t, 20), kelvin(Math.max(t, 20)), Math.min(p, 100)];
    const n = (p * v) / (R * T);
    const m = n * M;
    const a = answer(m, 'g');
    return {
      prompt: `What mass of ${gasName(gas)}, is in a ${q(v.toFixed(1), 'L')} container at ${q(p, 'kPa')} and ${degC(t)}, ${a.phrase}? ${rule} ${KELVIN} ${massesText(gas)}`,
      parts: [a.part],
      calculator: true,
      hints: ['Find the amount with $n = \\dfrac{PV}{RT}$, in kelvins.', 'Then the mass: $m = n \\times M$.'],
      solution: [`$n = \\dfrac{${p} \\times ${v.toFixed(1)}}{8.314 \\times ${T.toFixed(2)}} = ${n.toFixed(4)}\\ \\text{mol}$`, `$m = ${n.toFixed(4)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
    };
  }
  const n = rng.float(0.2, 2.5, 2);
  const k = (p * v) / (n * R);
  const c = k - ZERO;
  return {
    prompt: `${cap(q(n.toFixed(2), 'mol'))} of gas in a ${q(v.toFixed(1), 'L')} container has a pressure of ${q(p, 'kPa')}. What is its temperature in degrees Celsius? Round to the nearest degree. ${rule} ${KELVIN}`,
    parts: [numPart(c, { decimals: 0, suffix: '°C' })],
    calculator: true,
    hints: ['Solve $PV = nRT$ for $T = \\dfrac{PV}{nR}$, which gives kelvins.', 'Change the answer to degrees Celsius.'],
    solution: [`$T = \\dfrac{${p} \\times ${v.toFixed(1)}}{${n.toFixed(2)} \\times 8.314} = ${k.toFixed(1)}\\ \\text{K}$`, `$T = ${k.toFixed(1)} - 273.15 = ${c.toFixed(0)}^\\circ\\text{C}$`],
  };
}

function gasMolarMass(rng: Rng, d: Difficulty): GenOutput {
  const gas = rng.pick(GASES);
  const trueM = molarMass(gas);
  const t = CONDENSABLE.has(gas) ? rng.int(20, 60) : rng.int(0, 60);
  const T = kelvin(t);
  const p = CONDENSABLE.has(gas) ? rng.int(5, 10) * 10 : rng.int(8, 25) * 10;
  const v = rng.float(0.5, 5, 2);
  const m = Math.round(((p * v) / (R * T)) * trueM * 1000) / 1000;
  const M = (m * R * T) / (p * v);
  const a = answer(M, 'g/mol', 1);
  const rule = `Use $PV = nRT$ with ${R_TEXT}. ${KELVIN}`;
  const prompt = `A ${q(m.toFixed(3), 'g')} sample of a gas occupies ${q(v.toFixed(2), 'L')} at ${q(p, 'kPa')} and ${degC(t)}. What is the molar mass of the gas, to the nearest tenth?`;
  const work = [`$n = \\dfrac{PV}{RT} = \\dfrac{${p} \\times ${v.toFixed(2)}}{8.314 \\times ${T.toFixed(2)}} = ${(m / M).toFixed(5)}\\ \\text{mol}$`, `$M = \\dfrac{m}{n} = \\dfrac{${m.toFixed(3)}}{${(m / M).toFixed(5)}} = ${a.shown}\\ \\text{g/mol}$`];
  const hints = ['Find the amount in moles with $n = \\dfrac{PV}{RT}$.', 'Molar mass is mass per mole: $M = \\dfrac{m}{n}$.'];
  if (d < 3) return { prompt: `${prompt} ${rule}`, parts: [a.part], calculator: true, hints, solution: work };
  // Hard: then say which gas it could be, from choices whose molar masses are far apart.
  const others = rng.shuffle(GASES.filter((g) => g !== gas));
  const picked: string[] = [];
  for (const g of others) if (picked.length < 3 && [gas, ...picked].every((x) => Math.abs(molarMass(x) - molarMass(g)) > 3)) picked.push(g);
  return {
    prompt: `${prompt} Which gas could it be? ${rule}`,
    parts: [a.part, part(mc(rng, gasName(gas), picked.map(gasName)), { label: 'The gas is' })],
    calculator: true,
    hints: [...hints, 'Compare your molar mass with the molar mass of each gas.'],
    solution: [...work, `${cap(GAS_NAMES[gas])}, ${$(gas)}, has a molar mass of $${trueM.toFixed(2)}\\ \\text{g/mol}$, the closest match.`],
  };
}

export const GAS_SKILLS: SkillDef[] = [
  skill({ id: 'c20-kmt', name: 'The kinetic molecular theory', description: 'Explain the behaviour of gases with the kinetic molecular theory.', outcomes: ['20-B1'], lessonId: L(1), format: 'mc', gen: kmt }),
  skill({ id: 'c20-pressure-units', name: 'Pressure units', description: 'Convert pressures between kilopascals, atmospheres and millimetres of mercury.', outcomes: ['20-B1'], lessonId: L(2), calculator: true, gen: pressureUnits }),
  skill({ id: 'c20-kelvin', name: 'The Kelvin scale', description: 'Convert temperatures between degrees Celsius and kelvins.', outcomes: ['20-B1'], lessonId: L(2), gen: kelvinSkill }),
  skill({ id: 'c20-boyle', name: "Boyle's law", description: 'Use Boyle’s law to find a new volume or pressure at constant temperature.', outcomes: ['20-B1'], lessonId: L(3), calculator: true, gen: boyle }),
  skill({ id: 'c20-charles', name: "Charles's law", description: 'Use Charles’s law to find a new volume or temperature at constant pressure.', outcomes: ['20-B1'], lessonId: L(4), calculator: true, gen: charles }),
  skill({ id: 'c20-gay-lussac', name: "Gay-Lussac's law", description: 'Use Gay-Lussac’s law to find a new pressure or temperature at constant volume.', outcomes: ['20-B1'], lessonId: L(4), calculator: true, gen: gayLussac }),
  skill({ id: 'c20-combined-gas', name: 'The combined gas law', description: 'Use the combined gas law when pressure, volume and temperature all change.', outcomes: ['20-B1'], lessonId: L(5), calculator: true, gen: combined }),
  skill({ id: 'c20-gas-change', name: 'Predicting gas changes', description: 'Predict how a gas’s volume or pressure changes when other conditions change.', outcomes: ['20-B1'], lessonId: L(5), format: 'mc', gen: gasChange }),
  skill({ id: 'c20-avogadro', name: "Avogadro's law", description: 'Relate the volume of a gas to the amount of gas at constant temperature and pressure.', outcomes: ['20-B1'], lessonId: L(6), calculator: true, gen: avogadro }),
  skill({ id: 'c20-molar-volume', name: 'Molar volume', description: 'Use the molar volume at STP or SATP to convert between amount, volume and mass.', outcomes: ['20-B1'], lessonId: L(6), calculator: true, gen: molarVolume }),
  skill({ id: 'c20-ideal-gas', name: 'The ideal gas law', description: 'Use the ideal gas law, PV = nRT, to find pressure, volume, amount, mass or temperature.', outcomes: ['20-B1'], lessonId: L(7), calculator: true, gen: idealGas }),
  skill({ id: 'c20-gas-molar-mass', name: 'Molar mass of a gas', description: 'Find the molar mass of a gas from its mass, volume, pressure and temperature, and identify it.', outcomes: ['20-B1'], lessonId: L(7), calculator: true, gen: gasMolarMass }),
];
