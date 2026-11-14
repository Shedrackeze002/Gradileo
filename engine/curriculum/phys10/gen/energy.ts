/**
 * Grade 10 Physics, Unit 3: Work, Energy and Power (10-C1, 10-C2). Work, kinetic energy,
 * gravitational potential energy, the conservation of energy, power, and efficiency. Every
 * question that needs g states it (9.8 N/kg on Earth).
 */
import { numPart, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, NAMES, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `p10-3-${n}`;
const clean = (x: number) => Math.round(x * 1e6) / 1e6;
const G = 9.8;
const G_NOTE = 'On Earth, $g = 9.8$ N/kg.';

// ---------------------------------------------------------------------------- 3.1 work

function workDone(rng: Rng, find: 'W' | 'F' | 'd'): GenOutput {
  const F = rng.int(2, 40) * 5;
  const d = rng.pick([2, 3, 4, 5, 8, 10, 12, 20]);
  const W = F * d;
  const [what, verb] = rng.pick([['a crate', 'pushes'], ['a sledge', 'pulls'], ['a trolley', 'pushes'], ['a suitcase', 'pulls'], ['a lawnmower', 'pushes']]);
  const name = rng.pick(NAMES);
  if (find === 'W') {
    return {
      prompt: `${name} ${verb} ${what} with a steady force of ${q(F, 'N')} for ${q(d, 'm')} in the direction of the force. How much work does ${name} do?`,
      parts: [numPart(W, { suffix: 'J' })],
      hints: ['work = force × distance moved in the direction of the force'],
      solution: [`$W = Fd = ${F} \\times ${d} = ${W}$ J`],
    };
  }
  if (find === 'F') {
    return {
      prompt: `${name} does ${q(W, 'J')} of work moving ${what} ${q(d, 'm')} with a steady force along the motion. How large is the force?`,
      parts: [numPart(F, { suffix: 'N' })],
      hints: ['force = work ÷ distance'],
      solution: [`$F = \\dfrac{W}{d} = \\dfrac{${W}}{${d}} = ${F}$ N`],
    };
  }
  return {
    prompt: `${name} ${verb} ${what} with a steady force of ${q(F, 'N')} along the motion and does ${q(W, 'J')} of work. How far does it move?`,
    parts: [numPart(d, { suffix: 'm' })],
    hints: ['distance = work ÷ force'],
    solution: [`$d = \\dfrac{W}{F} = \\dfrac{${W}}{${F}} = ${d}$ m`],
  };
}

function workKilo(rng: Rng): GenOutput {
  const F = rng.pick([250, 400, 500, 800, 1200, 1500]);
  const d = rng.pick([5, 10, 20, 40, 50]);
  const W = (F * d) / 1000;
  return {
    prompt: `A tow truck pulls a car with a steady force of ${q(F, 'N')} for ${q(d, 'm')} along a level road. How much work does it do, in kilojoules?`,
    parts: [numPart(W, { suffix: 'kJ' })],
    hints: ['work = force × distance, in joules', '1 kJ = 1000 J, so divide by 1000.'],
    solution: [`$W = ${F} \\times ${d} = ${F * d}$ J`, `$${F * d} \\div 1000 = ${W}$ kJ`],
  };
}

const YES_NO = ['Yes', 'No'];
const WORK_EASY: Q[] = [
  { q: 'In physics, when is work done?', a: 'When a force moves an object in the direction of the force', w: ['Whenever a force acts, even if nothing moves', 'Whenever an object is heavy', 'Whenever someone feels tired'], why: 'Work needs both a force and a movement along the direction of the force.' },
  { q: 'What is the unit of work?', a: 'The joule (J)', w: ['The newton (N)', 'The watt (W)', 'The kilogram (kg)'], why: 'One joule is the work done when a force of 1 N moves an object 1 m. Work is energy transferred, so it shares the unit of energy.' },
  { q: 'A weightlifter holds a heavy bar still above their head. Is work being done on the bar?', a: 'No', w: ['Yes'], order: YES_NO, why: 'The bar is not moving, so the distance is zero and no work is done on it, however tiring it feels.' },
  { q: 'A person pushes hard against a wall that does not move. Is work done on the wall?', a: 'No', w: ['Yes'], order: YES_NO, why: 'There is a force but no movement, so no work is done.' },
  { q: 'A crane lifts a load straight up. Is work done on the load?', a: 'Yes', w: ['No'], order: YES_NO, why: 'The upward force moves the load upwards, so work is done.' },
];

const WORK_MEDIUM: Q[] = [
  { q: 'A waiter carries a tray at a steady height straight across a level room. How much work does the upward force of the waiter’s hand do on the tray?', a: 'None, because the force is at right angles to the motion', w: ['A lot, because the room is long', 'The weight of the tray times the length of the room', 'It depends on how fast the waiter walks'], why: 'The hand pushes up but the tray moves sideways. No distance is moved in the direction of the force.' },
  { q: 'When work is done on an object, what happens to energy?', a: 'Energy is transferred to the object or to its surroundings', w: ['Energy is created', 'Energy is destroyed', 'Nothing happens to energy'], why: 'Doing work is one way of transferring energy. The work done equals the energy transferred.' },
  { q: 'A box is pushed across a rough floor at a steady speed. Where does the energy from the work go?', a: 'It heats the box and the floor', w: ['It is stored as kinetic energy', 'It disappears', 'It is stored as height'], why: 'The speed does not change, so the kinetic energy does not grow. The work done against friction ends up as heat.' },
  { q: 'Which change doubles the work done by a force?', a: 'Moving the object twice as far with the same force', w: ['Moving it the same distance in half the time', 'Using half the force over the same distance', 'Using a heavier object with the same force and distance'], why: 'Work = force × distance. The time taken does not matter.' },
];

const WORK_HARD: Select[] = [
  { q: 'In which of these is work done on the object named?', opts: [['A crane lifts a crate upwards (the crate)', true], ['A child pulls a sledge along the snow (the sledge)', true], ['Gravity pulls a falling apple down (the apple)', true], ['A shelf holds up a row of books (the books)', false], ['A person pushes a parked truck that does not move (the truck)', false], ['A weightlifter holds a bar still overhead (the bar)', false]], why: 'Work is done only when the object moves along the direction of the force.' },
];

// ---------------------------------------------------------------------------- 3.2 kinetic energy

const KE_CASES: Array<[string, number[], number[]]> = [
  ['A ball', [0.5, 2], [2, 4, 6, 10]],
  ['A runner', [50, 60, 80], [2, 4, 5, 6]],
  ['A scooter', [100, 120, 150], [4, 5, 10, 20]],
  ['A car', [800, 1000, 1200], [5, 10, 20, 30]],
  ['A trolley', [4, 10, 20], [1, 2, 3, 5]],
];

function kinetic(rng: Rng, find: 'E' | 'm' | 'v'): GenOutput {
  const [what, ms, vs] = rng.pick(KE_CASES);
  const m = rng.pick(ms);
  const v = rng.pick(vs);
  const E = clean(0.5 * m * v * v);
  if (find === 'E') {
    return {
      prompt: `${what} of mass ${q(m, 'kg')} moves at ${q(v, 'm/s')}. What is the kinetic energy?`,
      parts: [numPart(E, { suffix: 'J' })],
      hints: ['kinetic energy = ½ × mass × speed²', 'Square the speed first.'],
      solution: [`$E_k = \\tfrac12 mv^2 = \\tfrac12 \\times ${m} \\times ${v}^2 = \\tfrac12 \\times ${m} \\times ${v * v} = ${E}$ J`],
    };
  }
  if (find === 'm') {
    return {
      prompt: `An object moving at ${q(v, 'm/s')} has ${q(E, 'J')} of kinetic energy. What is its mass?`,
      parts: [numPart(m, { suffix: 'kg' })],
      hints: ['Rearrange kinetic energy = ½ × mass × speed².', 'mass = 2 × kinetic energy ÷ speed²'],
      solution: [`$m = \\dfrac{2E_k}{v^2} = \\dfrac{2 \\times ${E}}{${v * v}} = ${m}$ kg`],
    };
  }
  return {
    prompt: `An object of mass ${q(m, 'kg')} has ${q(E, 'J')} of kinetic energy. How fast is it moving?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['Rearrange kinetic energy = ½ × mass × speed².', 'speed² = 2 × kinetic energy ÷ mass, then take the square root.'],
    solution: [`$v^2 = \\dfrac{2E_k}{m} = \\dfrac{2 \\times ${E}}{${m}} = ${v * v}$`, `$v = \\sqrt{${v * v}} = ${v}$ m/s`],
  };
}

const KE_EASY: Q[] = [
  { q: 'What is kinetic energy?', a: 'The energy an object has because it is moving', w: ['The energy an object has because of its height', 'The energy stored in a fuel', 'The energy an object has because it is hot'], why: 'Anything that moves has kinetic energy. An object at rest has none.' },
  { q: 'Which two things does the kinetic energy of an object depend on?', a: 'Its mass and its speed', w: ['Its height and its mass', 'Its colour and its shape', 'Its weight and its height'], why: 'Kinetic energy = ½ × mass × speed².' },
  { q: 'A parked car and a moving car have the same mass. Which has more kinetic energy?', a: 'The moving car', w: ['The parked car', 'They have the same', 'Neither has any'], why: 'The parked car has no kinetic energy, because its speed is zero.' },
  { q: 'A truck and a small car travel at the same speed. Which has more kinetic energy?', a: 'The truck, because it has more mass', w: ['The car, because it is smaller', 'They have the same, because the speeds are equal', 'Neither has any'], why: 'At the same speed, more mass means more kinetic energy.' },
];

function keRatio(rng: Rng): GenOutput {
  const k = rng.pick([2, 3, 4]);
  const what = rng.pick(['A car', 'A cyclist', 'A train', 'A ball']);
  if (rng.chance(0.6)) {
    return {
      prompt: `${what} speeds up until its speed is ${k} times what it was. How many times larger is its kinetic energy?`,
      parts: [numPart(k * k, { suffix: 'times' })],
      hints: ['Kinetic energy depends on the speed squared.'],
      solution: [`The speed is multiplied by ${k}, so the kinetic energy is multiplied by $${k}^2 = ${k * k}$.`],
    };
  }
  return {
    prompt: `Two objects move at the same speed. One has ${k} times the mass of the other. How many times larger is its kinetic energy?`,
    parts: [numPart(k, { suffix: 'times' })],
    hints: ['Kinetic energy is proportional to the mass.'],
    solution: [`At the same speed, ${k} times the mass gives ${k} times the kinetic energy.`],
  };
}

function keTwoSpeeds(rng: Rng): GenOutput {
  // Masses and speeds that give a whole number of kilojoules.
  const m = rng.pick([800, 1000, 1200, 1600]);
  const [v1, v2] = rng.pick([[10, 20], [10, 30], [20, 30], [20, 40]]);
  const e1 = 0.5 * m * v1 * v1;
  const e2 = 0.5 * m * v2 * v2;
  return {
    prompt: `A car of mass ${q(m, 'kg')} speeds up from ${q(v1, 'm/s')} to ${q(v2, 'm/s')}. By how much does its kinetic energy increase, in kilojoules?`,
    parts: [numPart((e2 - e1) / 1000, { suffix: 'kJ' })],
    hints: ['Find the kinetic energy at each speed, then subtract.', '1 kJ = 1000 J'],
    solution: [`At ${v1} m/s: $\\tfrac12 \\times ${m} \\times ${v1}^2 = ${e1}$ J. At ${v2} m/s: $\\tfrac12 \\times ${m} \\times ${v2}^2 = ${e2}$ J.`, `Increase $= ${e2} - ${e1} = ${e2 - e1}$ J $= ${(e2 - e1) / 1000}$ kJ. ${v2 === 2 * v1 ? 'Doubling the speed made the kinetic energy four times as large.' : 'The kinetic energy grows much faster than the speed, because it depends on the speed squared.'}`],
  };
}

const KE_COMPARE: Q[] = [
  { q: 'A car doubles its speed. What happens to its kinetic energy?', a: 'It becomes four times as large', w: ['It doubles', 'It stays the same', 'It becomes eight times as large'], why: 'Kinetic energy depends on speed squared, and $2^2 = 4$.' },
  { q: 'Why does a small increase in a car’s speed matter so much in a crash?', a: 'Kinetic energy grows with the square of the speed', w: ['Kinetic energy grows with the square of the mass', 'Faster cars have more mass', 'Faster cars have less inertia'], why: 'All the kinetic energy has to go somewhere in a crash, and it rises steeply with speed.' },
  { q: 'A lorry has twice the mass of a van and travels at the same speed. Compare their kinetic energies.', a: 'The lorry has twice as much', w: ['The lorry has four times as much', 'They are equal', 'The van has twice as much'], why: 'Kinetic energy is proportional to mass: double the mass, double the energy.' },
];

// ---------------------------------------------------------------------------- 3.3 gravitational potential energy

/** [what, masses in kg, heights in m, how it rises, the short name]. */
const LIFTED: Array<[string, number[], number[], string, string]> = [
  ['A book', [0.5, 1, 2], [1, 2, 3], 'is lifted', 'the book'],
  ['A bag of cement', [20, 25, 50], [2, 3, 5, 10], 'is lifted', 'the bag'],
  ['A climber', [50, 60, 70, 80], [5, 10, 15, 20, 50], 'climbs', 'the climber'],
  ['A crate', [10, 20, 40], [2, 3, 5, 10, 15], 'is lifted', 'the crate'],
  ['A bucket of water', [5, 10, 15], [2, 3, 5, 10], 'is lifted', 'the bucket'],
];

function gpe(rng: Rng, find: 'E' | 'h' | 'm'): GenOutput {
  const [what, ms, hs, rises, short] = rng.pick(LIFTED);
  const m = rng.pick(ms);
  const h = rng.pick(hs);
  const E = clean(m * G * h);
  if (find === 'E') {
    return {
      prompt: `${G_NOTE} ${what} of mass ${q(m, 'kg')} ${rises} through a height of ${q(h, 'm')}. How much gravitational potential energy does ${short} gain?`,
      parts: [numPart(E, { suffix: 'J' })],
      hints: ['gravitational potential energy = mass × g × height'],
      solution: [`$E_p = mgh = ${m} \\times 9.8 \\times ${h} = ${E}$ J`],
    };
  }
  if (find === 'h') {
    return {
      prompt: `${G_NOTE} ${what} of mass ${q(m, 'kg')} gains ${q(E, 'J')} of gravitational potential energy. Through what height does ${short} rise?`,
      parts: [numPart(h, { suffix: 'm' })],
      hints: ['height = energy ÷ (mass × g)'],
      solution: [`$h = \\dfrac{E_p}{mg} = \\dfrac{${E}}{${m} \\times 9.8} = ${h}$ m`],
    };
  }
  return {
    prompt: `${G_NOTE} An object gains ${q(E, 'J')} of gravitational potential energy when it is lifted through ${q(h, 'm')}. What is its mass?`,
    parts: [numPart(m, { suffix: 'kg' })],
    hints: ['mass = energy ÷ (g × height)'],
    solution: [`$m = \\dfrac{E_p}{gh} = \\dfrac{${E}}{9.8 \\times ${h}} = ${m}$ kg`],
  };
}

const GPE_EASY: Q[] = [
  { q: 'What is gravitational potential energy?', a: 'The energy an object has because of its height', w: ['The energy an object has because it is moving', 'The energy an object has because it is hot', 'The energy stored in a stretched spring'], why: 'Lifting an object against gravity stores energy, which is released if the object falls.' },
  { q: 'A book is lifted from the floor onto a high shelf. What happens to its gravitational potential energy?', a: 'It increases', w: ['It decreases', 'It stays the same', 'It becomes zero'], why: 'The higher an object is lifted, the more gravitational potential energy it has.' },
  { q: 'Two identical bricks rest on shelves, one at 1 m and one at 2 m. Which has more gravitational potential energy?', a: 'The brick at 2 m', w: ['The brick at 1 m', 'They have the same', 'Neither has any'], why: 'Same mass, greater height, so more gravitational potential energy.' },
  { q: 'A heavy rock and a light rock sit at the top of the same cliff. Which has more gravitational potential energy?', a: 'The heavy rock', w: ['The light rock', 'They have the same', 'Neither has any'], why: 'Same height, greater mass, so more gravitational potential energy.' },
];

function gpeChange(rng: Rng): GenOutput {
  const m = rng.pick([2, 5, 10, 50, 60]);
  const h1 = rng.pick([2, 5, 10, 20]);
  const dh = rng.pick([3, 5, 10, 15]);
  const up = rng.chance(0.5);
  const from = up ? h1 : h1 + dh;
  const to = up ? h1 + dh : h1;
  const dE = clean(m * G * dh);
  return {
    prompt: `${G_NOTE} A ${q(m, 'kg')} load is moved from a height of ${q(from, 'm')} to a height of ${q(to, 'm')} above the ground. By how much does its gravitational potential energy change? Include a minus sign if it decreases.`,
    parts: [numPart(up ? dE : -dE, { suffix: 'J' })],
    hints: ['Only the change in height matters.', 'change in energy = mass × g × change in height'],
    solution: [`Change in height $= ${to} - ${from} = ${to - from}$ m.`, `$\\Delta E_p = ${m} \\times 9.8 \\times ${up ? dh : `(-${dh})`} = ${up ? dE : -dE}$ J`],
  };
}

function gpeStairs(rng: Rng): GenOutput {
  const m = rng.pick([50, 60, 70]);
  const steps = rng.pick([10, 20, 40, 50]);
  const rise = rng.pick([0.15, 0.2, 0.25]);
  const h = clean(steps * rise);
  const name = rng.pick(NAMES);
  return {
    prompt: `${G_NOTE} ${name} has a mass of ${q(m, 'kg')} and climbs ${steps} stairs, each ${q(rise, 'm')} high. How much gravitational potential energy does ${name} gain?`,
    parts: [numPart(clean(m * G * h), { suffix: 'J' })],
    hints: ['Find the total height first: number of stairs × height of each.', 'gravitational potential energy = mass × g × height'],
    solution: [`Height $= ${steps} \\times ${rise} = ${h}$ m.`, `$E_p = ${m} \\times 9.8 \\times ${h} = ${clean(m * G * h)}$ J`],
  };
}

// ---------------------------------------------------------------------------- 3.4 conservation of energy

const STORE_EASY: Q[] = [
  { q: 'What does the law of conservation of energy say?', a: 'Energy cannot be created or destroyed, only transferred from one store to another', w: ['Energy is used up whenever something moves', 'Energy can be created by machines', 'Moving objects slowly destroy their energy'], why: 'The total amount of energy always stays the same. It only moves between stores.' },
  { q: 'A ball is dropped from a window. As it falls, which energy transfer takes place?', a: 'Gravitational potential energy to kinetic energy', w: ['Kinetic energy to gravitational potential energy', 'Kinetic energy to chemical energy', 'Thermal energy to gravitational potential energy'], why: 'It loses height and gains speed.' },
  { q: 'A ball is thrown straight up. On the way up, which energy transfer takes place?', a: 'Kinetic energy to gravitational potential energy', w: ['Gravitational potential energy to kinetic energy', 'Chemical energy to kinetic energy', 'Thermal energy to kinetic energy'], why: 'It slows down as it gains height.' },
  { q: 'Which store of energy does a stretched rubber band have?', a: 'Elastic potential energy', w: ['Kinetic energy', 'Gravitational potential energy', 'Chemical energy'], why: 'Energy is stored in anything stretched, squashed or bent that will spring back.' },
  { q: 'Which store of energy do food, fuel and batteries have?', a: 'Chemical energy', w: ['Kinetic energy', 'Elastic potential energy', 'Gravitational potential energy'], why: 'Energy is stored in the substances and released when they react.' },
];

const STORE_MEDIUM: Q[] = [
  { q: 'A pendulum swings from side to side. Where in the swing is its kinetic energy greatest?', a: 'At the lowest point', w: ['At the highest points', 'It is the same everywhere', 'Halfway up'], why: 'At the bottom it has lost the most height, so the most gravitational potential energy has become kinetic energy.' },
  { q: 'A pendulum swings from side to side. Where in the swing is its gravitational potential energy greatest?', a: 'At the highest points', w: ['At the lowest point', 'It is the same everywhere', 'Halfway up'], why: 'It is highest, and for an instant at rest, at each end of the swing.' },
  { q: 'A swinging pendulum slowly comes to rest. Where has its energy gone?', a: 'It has spread into the surroundings as heat', w: ['It has been destroyed', 'It has turned into mass', 'It is still stored in the pendulum'], why: 'Air resistance and friction transfer the energy to the air and the pivot, warming them slightly. The total is still conserved.' },
  { q: 'A roller coaster car is at the top of the first hill, at rest. Which store holds almost all of its energy?', a: 'Gravitational potential energy', w: ['Kinetic energy', 'Elastic potential energy', 'Thermal energy'], why: 'It is high up and not moving.' },
  { q: 'A car brakes to a stop on a level road. What happens to its kinetic energy?', a: 'It is transferred to heat in the brakes and the surroundings', w: ['It is destroyed', 'It becomes gravitational potential energy', 'It stays in the car as kinetic energy'], why: 'Friction in the brakes turns the kinetic energy into heat.' },
];

const STORE_HARD: Select[] = [
  { q: 'A ball falls from a height, with no air resistance. Which statements are true?', opts: [['Its gravitational potential energy decreases.', true], ['Its kinetic energy increases.', true], ['Its total energy stays the same.', true], ['Its total energy increases as it speeds up.', false], ['Energy is destroyed as it loses height.', false], ['Its kinetic energy is greatest at the top.', false]], why: 'Energy moves from the gravitational store to the kinetic store, and the total is constant.' },
];

/** Heights (m) and the speeds (m/s) reached after falling through them, with g = 9.8: v² = 2gh. */
const FALLS: Array<[number, number]> = [[0.9, 4.2], [1.6, 5.6], [2.5, 7], [3.6, 8.4], [4.9, 9.8], [10, 14], [22.5, 21], [40, 28]];

function totalEnergy(rng: Rng): GenOutput {
  const total = rng.int(4, 40) * 10;
  const ke = Math.round((total * rng.pick([0.2, 0.3, 0.4, 0.5, 0.7])) / 10) * 10;
  const kin = rng.chance(0.5);
  return {
    prompt: `A roller coaster car has ${q(total, 'J')} of gravitational potential energy at the top of a hill, where it is at rest. Part of the way down, with no friction, it has ${q(kin ? total - ke : ke, 'J')} of ${kin ? 'gravitational potential' : 'kinetic'} energy. How much ${kin ? 'kinetic' : 'gravitational potential'} energy does it have at that point?`,
    parts: [numPart(kin ? ke : total - ke, { suffix: 'J' })],
    hints: ['With no friction, the total of kinetic and gravitational potential energy stays the same.'],
    solution: [`Total energy $= ${total}$ J all the way down.`, `$${total} - ${kin ? total - ke : ke} = ${kin ? ke : total - ke}$ J`],
  };
}

function fallSpeed(rng: Rng): GenOutput {
  const [h, v] = rng.pick(FALLS);
  const m = rng.pick([0.5, 1, 2, 5]);
  const E = clean(m * G * h);
  return {
    prompt: `${G_NOTE} A ${q(m, 'kg')} ball is dropped from rest from a height of ${q(h, 'm')}. Ignore air resistance. Find its kinetic energy just before it lands, and its speed then.`,
    parts: [numPart(E, { label: 'Kinetic energy', suffix: 'J' }), numPart(v, { label: 'Speed', suffix: 'm/s' })],
    hints: ['All the gravitational potential energy lost becomes kinetic energy: use mgh.', 'Then use kinetic energy = ½mv² to find the speed.'],
    solution: [`Energy lost from the gravitational store: $mgh = ${m} \\times 9.8 \\times ${h} = ${E}$ J, which is the kinetic energy at the bottom.`, `$v^2 = \\dfrac{2 \\times ${E}}{${m}} = ${clean(v * v)}$, so $v = ${v}$ m/s`],
  };
}

function riseHeight(rng: Rng): GenOutput {
  const [h, v] = rng.pick(FALLS);
  return {
    prompt: `${G_NOTE} A ball is thrown straight up at ${q(v, 'm/s')}. Ignore air resistance. How high does it rise above the point where it was thrown?`,
    parts: [numPart(h, { suffix: 'm' })],
    hints: ['All the kinetic energy at the start becomes gravitational potential energy at the top: ½mv² = mgh.', 'The mass cancels: height = speed² ÷ (2 × g).'],
    solution: [`$\\tfrac12 mv^2 = mgh$, so $h = \\dfrac{v^2}{2g} = \\dfrac{${clean(v * v)}}{2 \\times 9.8} = ${h}$ m`],
  };
}

// ---------------------------------------------------------------------------- 3.5 power

function power(rng: Rng, find: 'P' | 'E' | 't'): GenOutput {
  const P = rng.pick([20, 40, 60, 100, 150, 250, 500, 800, 1200]);
  const t = rng.pick([5, 10, 20, 30, 60, 120]);
  const E = P * t;
  const what = rng.pick(['A motor', 'A lamp', 'A crane', 'A heater', 'A pump']);
  if (find === 'P') {
    return {
      prompt: `${what} transfers ${q(E, 'J')} of energy in ${q(t, 's')}. What is its power?`,
      parts: [numPart(P, { suffix: 'W' })],
      hints: ['power = energy transferred ÷ time'],
      solution: [`$P = \\dfrac{E}{t} = \\dfrac{${E}}{${t}} = ${P}$ W`],
    };
  }
  if (find === 'E') {
    return {
      prompt: `${what} has a power of ${q(P, 'W')}. How much energy does it transfer in ${q(t, 's')}?`,
      parts: [numPart(E, { suffix: 'J' })],
      hints: ['energy transferred = power × time'],
      solution: [`$E = Pt = ${P} \\times ${t} = ${E}$ J`],
    };
  }
  return {
    prompt: `${what} has a power of ${q(P, 'W')}. How long does it take to transfer ${q(E, 'J')} of energy?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = energy transferred ÷ power'],
    solution: [`$t = \\dfrac{E}{P} = \\dfrac{${E}}{${P}} = ${t}$ s`],
  };
}

function powerMinutes(rng: Rng): GenOutput {
  const kW = rng.pick([1.5, 2, 2.5, 3]);
  const mins = rng.pick([2, 5, 10]);
  const E = clean(kW * 1000 * mins * 60);
  return {
    prompt: `A kettle has a power of ${q(kW, 'kW')}. How much energy does it transfer in ${q(mins, 'min')}, in kilojoules?`,
    parts: [numPart(E / 1000, { suffix: 'kJ' })],
    hints: ['Change kilowatts to watts and minutes to seconds.', 'energy = power × time, then divide by 1000 for kilojoules'],
    solution: [`${q(kW, 'kW')} $= ${kW * 1000}$ W and ${q(mins, 'min')} $= ${mins * 60}$ s.`, `$E = ${kW * 1000} \\times ${mins * 60} = ${E}$ J $= ${E / 1000}$ kJ`],
  };
}

function liftPower(rng: Rng, hard: boolean): GenOutput {
  const m = rng.pick([10, 20, 50, 100, 200]);
  const h = rng.pick([2, 5, 10, 20]);
  const t = rng.pick([4, 5, 10, 20]);
  const E = clean(m * G * h);
  const P = clean(E / t);
  if (!hard) {
    return {
      prompt: `${G_NOTE} A motor lifts a ${q(m, 'kg')} load through ${q(h, 'm')}. How much work does it do against gravity?`,
      parts: [numPart(E, { suffix: 'J' })],
      hints: ['The work done lifting equals the gravitational potential energy gained: mgh.'],
      solution: [`$W = mgh = ${m} \\times 9.8 \\times ${h} = ${E}$ J`],
    };
  }
  return {
    prompt: `${G_NOTE} A motor lifts a ${q(m, 'kg')} load through ${q(h, 'm')} in ${q(t, 's')} at a steady speed. Find the work done against gravity and the useful power of the motor.`,
    parts: [numPart(E, { label: 'Work', suffix: 'J' }), numPart(P, { label: 'Power', suffix: 'W' })],
    hints: ['Work done lifting = mgh.', 'power = work ÷ time'],
    solution: [`$W = mgh = ${m} \\times 9.8 \\times ${h} = ${E}$ J`, `$P = \\dfrac{${E}}{${t}} = ${P}$ W`],
  };
}

function stairsPower(rng: Rng): GenOutput {
  const m = rng.pick([50, 60, 70, 80]);
  const h = rng.pick([3, 5, 6, 10]);
  const t = rng.pick([4, 5, 8, 10]);
  const name = rng.pick(NAMES);
  const P = clean((m * G * h) / t);
  return {
    prompt: `${G_NOTE} ${name} has a mass of ${q(m, 'kg')} and runs up a staircase ${q(h, 'm')} high in ${q(t, 's')}. What is ${name}’s useful power?`,
    parts: [numPart(P, { suffix: 'W' })],
    hints: ['The work done is the gravitational potential energy gained: mgh.', 'power = work ÷ time'],
    solution: [`Work $= ${m} \\times 9.8 \\times ${h} = ${clean(m * G * h)}$ J.`, `$P = \\dfrac{${clean(m * G * h)}}{${t}} = ${P}$ W`],
  };
}

const POWER_IDEAS: Q[] = [
  { q: 'What is power?', a: 'The energy transferred each second', w: ['The total energy transferred', 'The force on an object', 'The distance moved each second'], why: 'Power is the rate of transferring energy: energy ÷ time.' },
  { q: 'What is the unit of power?', a: 'The watt (W)', w: ['The joule (J)', 'The newton (N)', 'The joule second (J s)'], why: 'One watt is one joule transferred each second.' },
  { q: 'Two cranes lift identical loads to the same height. Crane A takes 10 s and crane B takes 20 s. Which statement is true?', a: 'They do the same work, but crane A has twice the power', w: ['Crane A does twice the work', 'Crane B has twice the power', 'They have the same power'], why: 'Same load, same height: same work. Crane A does it in half the time, so its power is double.' },
];

// ---------------------------------------------------------------------------- 3.6 efficiency

function efficiency(rng: Rng, find: 'eff' | 'useful' | 'input'): GenOutput {
  // Each device with efficiencies it could really have.
  const [what, effs] = rng.pick([
    ['An electric motor', [75, 80, 90]],
    ['An LED lamp', [30, 40, 50]],
    ['A petrol engine', [20, 25, 30]],
    ['A hand winch', [40, 60, 75]],
    ['A food mixer', [50, 60, 70]],
    ['A diesel generator', [30, 35, 40]],
  ] as Array<[string, number[]]>);
  const eff = rng.pick(effs);
  const input = rng.pick([200, 400, 500, 800, 1000, 2000]);
  const useful = (input * eff) / 100;
  if (find === 'eff') {
    return {
      prompt: `${what} is supplied with ${q(input, 'J')} of energy and transfers ${q(useful, 'J')} usefully. What is its efficiency, as a percentage?`,
      parts: [numPart(eff, { suffix: '%' })],
      hints: ['efficiency = useful energy out ÷ total energy in × 100%'],
      solution: [`Efficiency $= \\dfrac{${useful}}{${input}} \\times 100\\% = ${eff}\\%$`],
    };
  }
  if (find === 'useful') {
    const wasted = rng.chance(0.5);
    return {
      prompt: `${what} is ${eff}% efficient and is supplied with ${q(input, 'J')} of energy. How much energy is ${wasted ? 'wasted' : 'transferred usefully'}?`,
      parts: [numPart(wasted ? input - useful : useful, { suffix: 'J' })],
      hints: ['useful energy = efficiency × total energy in', ...(wasted ? ['wasted energy = total energy in − useful energy'] : [])],
      solution: [`Useful energy $= ${eff / 100} \\times ${input} = ${useful}$ J.`, ...(wasted ? [`Wasted energy $= ${input} - ${useful} = ${input - useful}$ J`] : [])],
    };
  }
  return {
    prompt: `${what} is ${eff}% efficient and transfers ${q(useful, 'J')} of energy usefully. How much energy was it supplied with?`,
    parts: [numPart(input, { suffix: 'J' })],
    hints: ['total energy in = useful energy ÷ efficiency (as a decimal)'],
    solution: [`Total energy in $= \\dfrac{${useful}}{${eff / 100}} = ${input}$ J`],
  };
}

const TRANSFER_EASY: Q[] = [
  { q: 'What does it mean for a machine to be efficient?', a: 'Most of the energy supplied is transferred usefully', w: ['It uses a lot of energy', 'It creates extra energy', 'It works very fast'], why: 'Efficiency compares the useful energy out with the total energy in.' },
  { q: 'In a filament lamp, which energy transfer is the useful one?', a: 'To light', w: ['To heat', 'To sound', 'To kinetic energy'], why: 'A lamp is meant to give light. The heat it gives out is wasted.' },
  { q: 'What usually happens to the energy a machine wastes?', a: 'It spreads into the surroundings as heat', w: ['It is destroyed', 'It is stored in the machine for later', 'It turns into mass'], why: 'Wasted energy warms the machine and the air around it, where it is too spread out to be useful.' },
  { q: 'Can a machine be more than 100% efficient?', a: 'No, because it cannot give out more energy than it takes in', w: ['Yes, if it is well oiled', 'Yes, if it is very powerful', 'Yes, if it runs for a long time'], why: 'Energy cannot be created, so the useful energy out can never be more than the energy in.' },
];

const TRANSFER_MEDIUM: Q[] = [
  { q: 'In an electric motor lifting a load, which energy is wasted?', a: 'Heat in the wires and sound', w: ['Gravitational potential energy of the load', 'Electrical energy supplied', 'Kinetic energy of the load'], why: 'Lifting the load is the useful transfer. Heat from the wires and friction, and sound, are wasted.' },
  { q: 'How does oiling a bicycle chain make the bicycle more efficient?', a: 'Less energy is wasted as heat by friction', w: ['It creates extra energy', 'It makes the bicycle heavier', 'It increases the friction in the chain'], why: 'Less friction means less of the rider’s energy is turned into heat.' },
  { q: 'A car engine is about 30% efficient. What happens to the other 70% of the energy from the fuel?', a: 'It is wasted, mostly as heat', w: ['It is stored in the fuel tank', 'It is destroyed', 'It becomes the car’s kinetic energy'], why: 'Most of the chemical energy in the fuel heats the engine, the exhaust gases and the surroundings.' },
  { q: 'An LED lamp and a filament lamp give out the same amount of light. The LED lamp needs much less electrical energy. What does this show?', a: 'The LED lamp is more efficient', w: ['The LED lamp is more powerful', 'The filament lamp is more efficient', 'The LED lamp creates energy'], why: 'The same useful output from less input means a higher efficiency. The filament lamp wastes far more as heat.' },
];

function wastedSplit(rng: Rng): GenOutput {
  const input = rng.pick([100, 200, 500, 1000]);
  const useful = (input * rng.pick([10, 20, 25, 40])) / 100;
  const sound = (input * rng.pick([5, 10])) / 100;
  const heat = input - useful - sound;
  return {
    prompt: `Each second a machine is supplied with ${q(input, 'J')} of energy. It transfers ${q(useful, 'J')} usefully and wastes ${q(sound, 'J')} as sound. The rest is wasted as heat. Find the energy wasted as heat each second, and the machine’s efficiency.`,
    parts: [numPart(heat, { label: 'Heat', suffix: 'J' }), numPart((useful / input) * 100, { label: 'Efficiency', suffix: '%' })],
    hints: ['Energy is conserved: the energy in equals the total of all the energy out.', 'efficiency = useful energy out ÷ total energy in × 100%'],
    solution: [`Heat $= ${input} - ${useful} - ${sound} = ${heat}$ J.`, `Efficiency $= \\dfrac{${useful}}{${input}} \\times 100\\% = ${(useful / input) * 100}\\%$`],
  };
}

export const ENERGY_SKILLS: SkillDef[] = [
  skill({ id: 'p10-work', name: 'Work', description: 'Use work = force × distance to find the work done, the force or the distance.', outcomes: ['10-C1'], lessonId: L(1), calculator: true, gen: bank([(rng) => workDone(rng, 'W'), (rng) => workDone(rng, rng.pick(['F', 'd'] as const)), workKilo], ['work = force × distance moved in the direction of the force']) }),
  skill({ id: 'p10-work-done', name: 'When work is done', description: 'Decide whether a force does work, and say where the energy goes.', outcomes: ['10-C1'], lessonId: L(1), format: 'mc', gen: bank([WORK_EASY, WORK_MEDIUM, WORK_HARD], ['Work needs a force and a movement along the direction of the force.']) }),
  skill({ id: 'p10-kinetic-energy', name: 'Kinetic energy', description: 'Use kinetic energy = ½mv² to find an energy, a mass or a speed.', outcomes: ['10-C1'], lessonId: L(2), calculator: true, gen: bank([(rng) => kinetic(rng, 'E'), (rng) => kinetic(rng, rng.pick(['E', 'm'] as const)), (rng) => kinetic(rng, rng.pick(['m', 'v'] as const))], ['kinetic energy = ½ × mass × speed²']) }),
  skill({ id: 'p10-ke-compare', name: 'Comparing kinetic energies', description: 'Explain how kinetic energy changes with mass and with the square of the speed.', outcomes: ['10-C1'], lessonId: L(2), gen: bank([KE_EASY, either(keRatio, fromBank(KE_COMPARE, ['Kinetic energy depends on the speed squared.'])), keTwoSpeeds], ['Kinetic energy is proportional to the mass and to the square of the speed.']) }),
  skill({ id: 'p10-gpe', name: 'Gravitational potential energy', description: 'Use gravitational potential energy = mgh to find an energy, a height or a mass.', outcomes: ['10-C1'], lessonId: L(3), calculator: true, gen: bank([(rng) => gpe(rng, 'E'), (rng) => gpe(rng, 'h'), (rng) => gpe(rng, rng.pick(['h', 'm'] as const))], ['gravitational potential energy = mass × g × height']) }),
  skill({ id: 'p10-gpe-change', name: 'Changes in height', description: 'Find the change in gravitational potential energy when an object moves between two heights.', outcomes: ['10-C1'], lessonId: L(3), calculator: true, gen: bank([GPE_EASY, gpeChange, gpeStairs], ['Only the change in height matters: change in energy = mass × g × change in height.']) }),
  skill({ id: 'p10-energy-stores', name: 'Energy stores and transfers', description: 'Name energy stores and describe the transfers between them.', outcomes: ['10-C1'], lessonId: L(4), format: 'mc', gen: bank([STORE_EASY, STORE_MEDIUM, either(fromBank(STORE_HARD, ['The total energy stays the same.']), fromBank(STORE_MEDIUM, ['Energy moves between stores; the total stays the same.']))], ['Energy is never created or destroyed. Ask which store it leaves and which it enters.']) }),
  skill({ id: 'p10-energy-conservation', name: 'Conservation of energy', description: 'Use the conservation of energy to find energies, speeds and heights of falling and rising objects.', outcomes: ['10-C1'], lessonId: L(4), calculator: true, gen: bank([totalEnergy, fallSpeed, either(fallSpeed, riseHeight)], ['With no friction, kinetic energy + gravitational potential energy stays the same.']) }),
  skill({ id: 'p10-power', name: 'Power', description: 'Use power = energy ÷ time to find a power, an energy or a time.', outcomes: ['10-C2'], lessonId: L(5), calculator: true, gen: bank([either((rng) => power(rng, 'P'), fromBank(POWER_IDEAS, ['Power is energy transferred each second.'])), (rng) => power(rng, rng.pick(['E', 't'] as const)), powerMinutes], ['power = energy transferred ÷ time']) }),
  skill({ id: 'p10-power-lift', name: 'Power and lifting', description: 'Find the work done and the power needed to lift a load.', outcomes: ['10-C2'], lessonId: L(5), calculator: true, gen: bank([(rng) => liftPower(rng, false), (rng) => liftPower(rng, true), stairsPower], ['Work done lifting = mgh, and power = work ÷ time.']) }),
  skill({ id: 'p10-efficiency', name: 'Efficiency', description: 'Calculate efficiency, useful energy and wasted energy.', outcomes: ['10-C2'], lessonId: L(6), calculator: true, gen: bank([(rng) => efficiency(rng, 'eff'), (rng) => efficiency(rng, 'useful'), (rng) => efficiency(rng, 'input')], ['efficiency = useful energy out ÷ total energy in × 100%']) }),
  skill({ id: 'p10-energy-transfers', name: 'Useful and wasted energy', description: 'Identify the useful and wasted energy transfers of a device.', outcomes: ['10-C2'], lessonId: L(6), gen: bank([TRANSFER_EASY, TRANSFER_MEDIUM, wastedSplit], ['Wasted energy usually spreads into the surroundings as heat.']) }),
];
