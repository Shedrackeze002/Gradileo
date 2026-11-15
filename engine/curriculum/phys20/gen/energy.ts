/**
 * Grade 11 Physics, Unit 3, lessons 3.4 to 3.7: work and energy (20-C2). Work and
 * force-displacement graphs, kinetic, gravitational and elastic energy, the conservation of
 * mechanical energy with and without friction, and power and efficiency. Every number a question
 * needs is in the question, including g = 9.81 m/s².
 */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, SkillDef } from '../../../types.ts';
import { An, G, RAD, an, clean, rounded } from './common.ts';

const L = (n: number) => `p20-3-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';

// ---------------------------------------------------------------------------- 3.4 work

function workSimple(rng: Rng): GenOutput {
  const F = rng.pick([20, 35, 50, 60, 75, 120, 150, 200, 400]);
  const d = rng.pick([2, 4, 5, 8, 12, 15, 20, 50]);
  const what = rng.pick(['pushes a trolley', 'pulls a crate', 'pushes a stalled car', 'drags a sack']);
  return {
    prompt: `A worker ${what} with a steady force of ${q(F, 'N')} in the direction of motion, through ${q(d, 'm')}. How much work does the worker do?`,
    parts: [numPart(F * d, { suffix: 'J' })],
    hints: ['When the force is along the direction of motion, work = force × displacement.'],
    solution: [`$W = Fd = ${F} \\times ${d} = ${F * d}$ J`],
  };
}

const WORK_IDEAS: Q[] = [
  { q: 'A student holds a heavy bag still, at shoulder height, for one minute. How much work does the student do on the bag in that minute?', a: 'None, because the bag does not move', w: ['A large amount, because the bag is heavy', 'An amount equal to the weight of the bag', 'An amount equal to the weight × 60'], why: 'Work needs a displacement. A force on an object that does not move does no work on it, however tiring it is.' },
  { q: 'A waiter carries a tray across a level room at a steady speed. How much work does the upward force of the waiter’s hand do on the tray?', a: 'None, because the force is at right angles to the displacement', w: ['The weight of the tray × the distance walked', 'Half the weight of the tray × the distance walked', 'It depends on the speed'], why: 'Only the part of a force along the displacement does work. An upward force has no part along a horizontal displacement.' },
  { q: 'A box slides along a rough floor and slows down. What is the sign of the work that friction does on the box?', a: 'Negative, because friction points opposite to the displacement', w: ['Positive, because the box is moving', 'Zero, because friction is not a real force', 'Positive, because friction is along the floor'], why: 'A force opposite to the displacement does negative work: it takes energy away from the object.' },
  { q: 'Which of these is equal to one joule?', a: '1 N·m', w: ['1 N/m', '1 N·s', '1 kg·m/s'], order: ['1 N/m', '1 N·m', '1 N·s', '1 kg·m/s'], why: 'Work is force × displacement, so a joule is a newton multiplied by a metre.' },
  { q: 'A satellite moves in a circular orbit. How much work does gravity do on it during one orbit?', a: 'None, because gravity is always at right angles to the motion', w: ['A large positive amount', 'A large negative amount', 'It depends on the mass of the satellite'], why: 'The pull of gravity points to the centre and the motion is along the tangent, so gravity does no work and the speed stays the same.' },
];

function workAngle(rng: Rng): GenOutput {
  const F = rng.pick([40, 60, 80, 100, 120, 150, 200]);
  const th = rng.pick([20, 25, 30, 35, 40, 45, 50, 60]);
  const d = rng.pick([5, 8, 10, 12, 15, 20, 25]);
  const W = F * d * Math.cos(th * RAD);
  const what = rng.pick(['a sled', 'a suitcase on wheels', 'a wagon', 'a crate']);
  return {
    prompt: `A rope pulls ${what} along level ground with a force of ${q(F, 'N')} at ${th}° above the horizontal. How much work does the rope do as the load moves ${q(d, 'm')}? Give your answer to the nearest joule.`,
    parts: [rounded(W, 0, 'J')],
    hints: ['Only the component of the force along the displacement does work.', '$W = Fd\\cos\\theta$'],
    solution: [`$W = Fd\\cos\\theta = ${F} \\times ${d} \\times \\cos ${th}° = ${num(W, 0)}$ J`],
  };
}

function netWork(rng: Rng): GenOutput {
  const m = rng.pick([10, 20, 25, 40, 50]);
  const mu = rng.pick([0.1, 0.2, 0.25, 0.3, 0.4]);
  const d = rng.pick([4, 5, 8, 10, 12]);
  const Ff = mu * m * G;
  const F = Math.ceil(Ff / 10) * 10 + rng.pick([20, 40, 60]);
  return {
    prompt: `${G_NOTE} A horizontal push of ${q(F, 'N')} moves a ${q(m, 'kg')} crate ${q(d, 'm')} across a level floor. The coefficient of kinetic friction is ${mu}. Find the work done by the push, the work done by friction and the net work done on the crate. Give the last two to 1 decimal place, with a minus sign for negative work.`,
    parts: [numPart(F * d, { suffix: 'J', label: 'Work done by the push' }), rounded(-Ff * d, 1, 'J', 'Work done by friction'), rounded((F - Ff) * d, 1, 'J', 'Net work')],
    hints: ['On a level floor the normal force equals the weight, so $F_f = \\mu_k mg$.', 'Friction points opposite to the displacement, so its work is negative.', 'The net work is the sum of the two.'],
    solution: [
      `Push: $W = Fd = ${F} \\times ${d} = ${F * d}$ J.`,
      `Friction: $F_f = \\mu_k mg = ${mu} \\times ${m} \\times 9.81 = ${num(Ff, 2)}$ N, so $W = -${num(Ff, 2)} \\times ${d} = ${num(-Ff * d, 1)}$ J.`,
      `Net work: $${F * d} - ${num(Ff * d, 1)} = ${num((F - Ff) * d, 1)}$ J`,
    ],
  };
}

// ---------------------------------------------------------------------------- 3.4 force-displacement graphs

/** A force-displacement graph through the given points. */
function fdGraph(points: Array<[number, number]>, caption: string): Figure {
  const xMax = points[points.length - 1][0];
  const top = Math.max(...points.map((p) => p[1]));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: xMax + (xMax % 2 === 0 ? 2 : 1), yMin: 0, yMax: top + 10, xStep: 2, yStep: 10, xLabel: 'Displacement (m)', yLabel: 'Force (N)' },
    polylines: [{ points }],
    caption,
  };
}
const FD_INTRO = 'The graph shows the force on a cart, in the direction of its motion, against its displacement.';
const FD_HINT = 'The work done is the area under a force-displacement graph.';

function graphRect(rng: Rng): GenOutput {
  const F = rng.pick([20, 30, 40, 50, 60]);
  const d = rng.pick([4, 6, 8, 10]);
  return {
    figure: fdGraph([[0, F], [d, F]], 'Force-displacement graph of a cart'),
    prompt: `${FD_INTRO} How much work does the force do over the ${q(d, 'm')}?`,
    parts: [numPart(F * d, { suffix: 'J' })],
    hints: [FD_HINT, 'Here the area is a rectangle: height × width.'],
    solution: [`The area is a rectangle ${F} N high and ${d} m wide.`, `$W = ${F} \\times ${d} = ${F * d}$ J`],
  };
}

function graphRamp(rng: Rng): GenOutput {
  const F = rng.pick([20, 30, 40, 50, 60]);
  const d = rng.pick([4, 6, 8, 10]);
  return {
    figure: fdGraph([[0, 0], [d, F]], 'Force-displacement graph of a cart'),
    prompt: `${FD_INTRO} The force rises steadily from zero. How much work does it do over the ${q(d, 'm')}?`,
    parts: [numPart((F * d) / 2, { suffix: 'J' })],
    hints: [FD_HINT, 'Here the area is a triangle: $\\dfrac{1}{2} \\times$ base × height.'],
    solution: [`The area is a triangle with a base of ${d} m and a height of ${F} N.`, `$W = \\dfrac{1}{2} \\times ${d} \\times ${F} = ${(F * d) / 2}$ J`],
  };
}

function graphTwo(rng: Rng): GenOutput {
  const F = rng.pick([20, 30, 40, 50, 60]);
  const d1 = rng.pick([2, 4, 6]);
  const w = rng.pick([2, 4]);
  const d2 = d1 + w;
  const rect = F * d1;
  const tri = (F * w) / 2;
  return {
    figure: fdGraph([[0, F], [d1, F], [d2, 0]], 'Force-displacement graph of a cart'),
    prompt: `${FD_INTRO} The force is steady for the first ${q(d1, 'm')} and then falls to zero. How much work does it do over the whole ${q(d2, 'm')}?`,
    parts: [numPart(rect + tri, { suffix: 'J' })],
    hints: [FD_HINT, 'Split the area into a rectangle and a triangle, and add them.'],
    solution: [`Rectangle, from 0 m to ${d1} m: $${F} \\times ${d1} = ${rect}$ J.`, `Triangle, from ${d1} m to ${d2} m: $\\dfrac{1}{2} \\times ${w} \\times ${F} = ${tri}$ J.`, `$W = ${rect} + ${tri} = ${rect + tri}$ J`],
  };
}

function graphThree(rng: Rng): GenOutput {
  const F1 = rng.pick([30, 40, 50, 60]);
  const F0 = rng.pick([10, 20].filter((f) => f < F1));
  const w1 = rng.pick([2, 4]);
  const w2 = rng.pick([2, 4, 6]);
  const w3 = rng.pick([2, 4]);
  const d1 = w1;
  const d2 = d1 + w2;
  const d3 = d2 + w3;
  const a1 = ((F0 + F1) / 2) * w1;
  const a2 = F1 * w2;
  const a3 = (F1 * w3) / 2;
  const W = a1 + a2 + a3;
  return {
    figure: fdGraph([[0, F0], [d1, F1], [d2, F1], [d3, 0]], 'Force-displacement graph of a cart'),
    prompt: `${FD_INTRO} Find the work done by the force over the whole ${q(d3, 'm')}, and the average force over that displacement, to 1 decimal place.`,
    parts: [numPart(W, { suffix: 'J', label: 'Work' }), rounded(W / d3, 1, 'N', 'Average force')],
    hints: [FD_HINT, 'Split the area into a trapezoid, a rectangle and a triangle.', 'The average force is the steady force that would do the same work over the same displacement: work ÷ displacement.'],
    solution: [
      `Trapezoid, from 0 m to ${d1} m: $\\dfrac{1}{2} \\times (${F0} + ${F1}) \\times ${w1} = ${a1}$ J.`,
      `Rectangle, from ${d1} m to ${d2} m: $${F1} \\times ${w2} = ${a2}$ J.`,
      `Triangle, from ${d2} m to ${d3} m: $\\dfrac{1}{2} \\times ${w3} \\times ${F1} = ${a3}$ J.`,
      `$W = ${a1} + ${a2} + ${a3} = ${W}$ J, and the average force is $\\dfrac{${W}}{${d3}} = ${num(W / d3, 1)}$ N`,
    ],
  };
}

// ---------------------------------------------------------------------------- 3.5 kinetic and gravitational energy

function kineticEnergy(rng: Rng): GenOutput {
  const [what, m] = rng.pick<[string, number]>([['ball', 0.5], ['trolley', 2], ['dog', 12], ['runner', 60], ['cyclist with a bicycle', 80], ['car', 1200]]);
  const v = rng.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
  const Ek = clean(0.5 * m * v * v);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} ${what} moves at ${q(v, 'm/s')}. What is its kinetic energy?`,
    parts: [numPart(Ek, { suffix: 'J' })],
    hints: ['$E_k = \\dfrac{1}{2}mv^2$', 'Square the speed first, then multiply by the mass and halve.'],
    solution: [`$E_k = \\dfrac{1}{2}mv^2 = \\dfrac{1}{2} \\times ${m} \\times ${v}^2 = ${Ek}$ J`],
  };
}

function gravEnergy(rng: Rng): GenOutput {
  const [what, m, hs] = rng.pick<[string, number, number[]]>([
    ['book on a shelf', 1.5, [1.2, 1.8, 2]],
    ['flowerpot on a balcony', 4, [3, 6, 9, 12]],
    ['climber on a cliff', 70, [15, 25, 40, 60]],
    ['bucket of water at the top of a well', 12, [5, 8, 15]],
    ['lift cabin', 900, [10, 20, 35]],
  ]);
  const h = rng.pick(hs);
  const Eg = m * G * h;
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} ${what} is ${q(h, 'm')} above the ground. What is its gravitational potential energy relative to the ground? Give your answer to 1 decimal place.`,
    parts: [rounded(Eg, 1, 'J')],
    hints: ['$E_g = mgh$'],
    solution: [`$E_g = mgh = ${m} \\times 9.81 \\times ${h} = ${num(Eg, 1)}$ J`],
  };
}

function workEnergySpeed(rng: Rng): GenOutput {
  const m = rng.pick([2, 4, 5, 10, 20, 40]);
  const F = rng.pick([10, 20, 30, 50, 80, 120]);
  const d = rng.pick([2, 3, 4, 5, 8, 10]);
  const u = rng.pick([0, 0, 2, 3, 4, 5]);
  const W = F * d;
  const E0 = clean(0.5 * m * u * u);
  const v = Math.sqrt((2 * (E0 + W)) / m);
  return {
    prompt: `A net force of ${q(F, 'N')} acts on ${an(m)} ${q(m, 'kg')} cart in the direction of its motion, through ${q(d, 'm')}. The cart ${u === 0 ? 'starts from rest' : `is moving at ${q(u, 'm/s')} at the start`}. What is its speed at the end? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['The net work equals the change in kinetic energy: $W_{\\text{net}} = \\Delta E_k$.', 'Find the kinetic energy at the end, then solve $E_k = \\dfrac{1}{2}mv^2$ for $v$.'],
    solution: [
      `Net work: $W = Fd = ${F} \\times ${d} = ${W}$ J.`,
      u === 0 ? `The cart starts with no kinetic energy, so at the end $E_k = ${W}$ J.` : `At the start $E_k = \\dfrac{1}{2} \\times ${m} \\times ${u}^2 = ${E0}$ J, so at the end $E_k = ${E0} + ${W} = ${clean(E0 + W)}$ J.`,
      `$v = \\sqrt{\\dfrac{2E_k}{m}} = \\sqrt{\\dfrac{2 \\times ${clean(E0 + W)}}{${m}}} = ${num(v, 2)}$ m/s`,
    ],
  };
}

function braking(rng: Rng): GenOutput {
  const m = rng.pick([900, 1000, 1200, 1500, 1800]);
  const v = rng.pick([10, 15, 20, 25, 30]);
  const d = rng.pick([25, 40, 50, 60, 75]);
  const Ek = 0.5 * m * v * v;
  const kJ = clean(Ek / 1000);
  return {
    prompt: `A ${q(m, 'kg')} car travelling at ${q(v, 'm/s')} brakes and comes to rest in ${q(d, 'm')}. Find the change in its kinetic energy, in kilojoules and with a minus sign if it is negative, and the size of the average net force on the car, to the nearest newton.`,
    parts: [numPart(-kJ, { suffix: 'kJ', label: 'Change in kinetic energy' }), rounded(Ek / d, 0, 'N', 'Average net force')],
    hints: ['The car ends with no kinetic energy, so the change is the negative of what it had.', 'The net work equals the change in kinetic energy, and $W = Fd$.', '1 kJ is 1000 J.'],
    solution: [
      `At the start $E_k = \\dfrac{1}{2} \\times ${m} \\times ${v}^2 = ${Ek}$ J $= ${kJ}$ kJ, and at the end it is zero, so $\\Delta E_k = -${kJ}$ kJ.`,
      `The size of the net work is ${Ek} J, so $F = \\dfrac{W}{d} = \\dfrac{${Ek}}{${d}} = ${num(Ek / d, 0)}$ N, opposite to the motion`,
    ],
  };
}

// ---------------------------------------------------------------------------- 3.5 springs and elastic energy

function hooke(rng: Rng): GenOutput {
  const k = rng.pick([50, 80, 120, 200, 250, 400, 500]);
  const x = rng.pick([0.02, 0.05, 0.1, 0.15, 0.2, 0.25]);
  const F = clean(k * x);
  if (rng.chance(0.5)) {
    return {
      prompt: `A spring has a spring constant of ${q(k, 'N/m')}. What force is needed to stretch it by ${q(x, 'm')}?`,
      parts: [numPart(F, { suffix: 'N' })],
      hints: ['Hooke’s law: $F = kx$'],
      solution: [`$F = kx = ${k} \\times ${x} = ${F}$ N`],
    };
  }
  return {
    prompt: `A force of ${q(F, 'N')} stretches a spring by ${q(x, 'm')}. What is the spring constant of the spring?`,
    parts: [numPart(k, { suffix: 'N/m' })],
    hints: ['Hooke’s law, $F = kx$, rearranged: $k = \\dfrac{F}{x}$'],
    solution: [`$k = \\dfrac{F}{x} = \\dfrac{${F}}{${x}} = ${k}$ N/m`],
  };
}

function elasticEnergy(rng: Rng): GenOutput {
  const k = rng.pick([200, 250, 400, 500, 800, 1200]);
  const cm = rng.pick([4, 5, 8, 10, 12, 15, 20]);
  const x = cm / 100;
  const E = 0.5 * k * x * x;
  const how = rng.pick(['compressed', 'stretched']);
  return {
    prompt: `A spring with a spring constant of ${q(k, 'N/m')} is ${how} by ${q(cm, 'cm')}. How much elastic potential energy does it store? Give your answer to 2 decimal places.`,
    parts: [rounded(E, 2, 'J')],
    hints: ['Change the centimetres to metres first.', '$E_e = \\dfrac{1}{2}kx^2$'],
    solution: [`$x = ${cm}\\ \\text{cm} = ${x}$ m`, `$E_e = \\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\times ${k} \\times ${x}^2 = ${num(E, 2)}$ J`],
  };
}

function hangingMass(rng: Rng): GenOutput {
  const m = rng.pick([0.5, 0.8, 1, 1.5, 2, 2.5, 4]);
  const cm = rng.pick([4, 5, 8, 10, 12.5, 16, 20]);
  const x = cm / 100;
  const F = m * G;
  const k = F / x;
  const E = 0.5 * k * x * x;
  return {
    prompt: `${G_NOTE} A spring hangs from a hook. When ${an(m)} ${q(m, 'kg')} mass is hung from it and comes to rest, the spring is ${q(cm, 'cm')} longer than before. Find the spring constant, to 1 decimal place, and the elastic potential energy stored in the spring, to 3 decimal places.`,
    parts: [rounded(k, 1, 'N/m', 'Spring constant'), rounded(E, 3, 'J', 'Energy stored')],
    hints: ['At rest, the force of the spring balances the weight: $kx = mg$.', 'Change the centimetres to metres.', '$E_e = \\dfrac{1}{2}kx^2$'],
    solution: [
      `The spring force equals the weight: $F = mg = ${m} \\times 9.81 = ${num(F, 3)}$ N, and $x = ${x}$ m.`,
      `$k = \\dfrac{F}{x} = \\dfrac{${num(F, 3)}}{${x}} = ${num(k, 1)}$ N/m`,
      `With the unrounded spring constant, $E_e = \\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\times ${num(k, 2)} \\times ${x}^2 = ${num(E, 3)}$ J`,
    ],
  };
}

// ---------------------------------------------------------------------------- 3.6 conservation of mechanical energy

function dropSpeed(rng: Rng): GenOutput {
  const [who, hs] = rng.pick<[string, number[]]>([
    ['A diver steps off a platform', [3, 5, 7.5, 10]],
    ['An apple falls from a branch', [1.8, 2.5, 3.2, 4]],
    ['A stone is dropped from a bridge', [8, 12, 20, 30]],
    ['A ball is dropped from a window', [4.5, 6, 9, 15]],
  ]);
  const h = rng.pick(hs);
  const v = Math.sqrt(2 * G * h);
  return {
    prompt: `${G_NOTE} ${who}, from rest, ${q(h, 'm')} above the ${who.includes('diver') || who.includes('bridge') ? 'water' : 'ground'}. Ignore air resistance. With what speed does ${who.includes('diver') ? 'the diver' : 'it'} arrive? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['All the gravitational potential energy at the top becomes kinetic energy at the bottom: $mgh = \\dfrac{1}{2}mv^2$.', 'The mass cancels: $v = \\sqrt{2gh}$.'],
    solution: [`$mgh = \\dfrac{1}{2}mv^2$, so $v = \\sqrt{2gh}$. The mass is not needed.`, `$v = \\sqrt{2 \\times 9.81 \\times ${h}} = ${num(v, 1)}$ m/s`],
  };
}

const CONSERVATION_IDEAS: Q[] = [
  { q: 'A pendulum swings back and forth. Where is the kinetic energy of the bob greatest?', a: 'At the lowest point of the swing', w: ['At the highest points of the swing', 'Halfway up on each side', 'It is the same everywhere'], why: 'At the lowest point the bob has the least gravitational potential energy, so it has the most kinetic energy.' },
  { q: 'A ball is thrown straight up. Ignoring air resistance, what happens to its energy as it rises?', a: 'Kinetic energy becomes gravitational potential energy, and the total stays the same', w: ['Both its kinetic and its potential energy increase', 'Its total mechanical energy decreases', 'Its kinetic energy stays the same'], why: 'The ball slows down as it gains height. With no air resistance, what it loses in kinetic energy it gains in potential energy.' },
  { q: 'A 2 kg ball and a 5 kg ball are dropped from the same height. Ignoring air resistance, how do their speeds compare just before they land?', a: 'They are the same', w: ['The 5 kg ball is faster', 'The 2 kg ball is faster', 'The 5 kg ball is 2.5 times as fast'], why: 'From $mgh = \\dfrac{1}{2}mv^2$ the mass cancels, so $v = \\sqrt{2gh}$ for both.' },
  { q: 'A roller coaster car starts from rest at the top of the first hill, 40 m high, and nothing drives it after that. Which later hill can it not get over, even with no friction?', a: 'A hill 45 m high', w: ['A hill 39 m high', 'A hill 20 m high', 'A hill 5 m high'], order: ['A hill 5 m high', 'A hill 20 m high', 'A hill 39 m high', 'A hill 45 m high'], why: 'The car has only the energy it started with, which is enough to reach 40 m and no higher.' },
  { q: 'When is the mechanical energy of an object conserved?', a: 'When only gravity and spring forces do work on it', w: ['Always', 'Only when it moves at a steady speed', 'Only when friction does work on it'], why: 'Friction and air resistance turn mechanical energy into thermal energy. Without them, kinetic and potential energy only change into each other.' },
];

function coasterDown(rng: Rng): GenOutput {
  const u = rng.pick([2, 3, 4, 5, 6]);
  const h1 = rng.pick([20, 25, 30, 35, 40]);
  const h2 = rng.pick([5, 8, 10, 12, 15]);
  const v = Math.sqrt(u * u + 2 * G * (h1 - h2));
  return {
    prompt: `${G_NOTE} A roller coaster car passes the top of a hill ${q(h1, 'm')} high at ${q(u, 'm/s')}. Ignore friction. How fast is it moving at a point ${q(h2, 'm')} high? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['Total mechanical energy is the same at both points: $\\dfrac{1}{2}mu^2 + mgh_1 = \\dfrac{1}{2}mv^2 + mgh_2$.', 'The mass cancels: $v = \\sqrt{u^2 + 2g(h_1 - h_2)}$.'],
    solution: [`$\\dfrac{1}{2}mu^2 + mgh_1 = \\dfrac{1}{2}mv^2 + mgh_2$, so $v^2 = u^2 + 2g(h_1 - h_2)$.`, `$v = \\sqrt{${u}^2 + 2 \\times 9.81 \\times (${h1} - ${h2})} = ${num(v, 1)}$ m/s`],
  };
}

function coasterUp(rng: Rng): GenOutput {
  const { u, h } = retry(
    () => ({ u: rng.pick([8, 10, 12, 15]), h: rng.pick([2, 3, 4, 5]) }),
    (c) => c.u * c.u - 2 * G * c.h >= 9,
  );
  const v = Math.sqrt(u * u - 2 * G * h);
  return {
    prompt: `${G_NOTE} A cyclist reaches the bottom of a hill at ${q(u, 'm/s')} and coasts up it without pedalling. Ignore friction. How fast is the cyclist moving at a height of ${q(h, 'm')} above the bottom? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['Kinetic energy at the bottom becomes kinetic and gravitational potential energy higher up: $\\dfrac{1}{2}mu^2 = \\dfrac{1}{2}mv^2 + mgh$.', 'The mass cancels: $v = \\sqrt{u^2 - 2gh}$.'],
    solution: [`$\\dfrac{1}{2}mu^2 = \\dfrac{1}{2}mv^2 + mgh$, so $v^2 = u^2 - 2gh$.`, `$v = \\sqrt{${u}^2 - 2 \\times 9.81 \\times ${h}} = ${num(v, 1)}$ m/s`],
  };
}

function springLaunch(rng: Rng): GenOutput {
  const c = retry(
    () => ({ k: rng.pick([200, 400, 500, 800, 1000]), cm: rng.pick([5, 8, 10, 12, 15]), m: rng.pick([0.2, 0.25, 0.4, 0.5, 0.8, 1]) }),
    (t) => (0.5 * t.k * (t.cm / 100) ** 2) / (t.m * G) >= 0.2,
  );
  const x = c.cm / 100;
  const E = 0.5 * c.k * x * x;
  const v = Math.sqrt((2 * E) / c.m);
  const h = E / (c.m * G);
  return {
    prompt: `${G_NOTE} A spring with a spring constant of ${q(c.k, 'N/m')} is compressed by ${q(c.cm, 'cm')} and launches a ${q(c.m, 'kg')} cart along a level, frictionless track. The cart then rolls up a frictionless hill. Find the speed of the cart as it leaves the spring and the greatest height it reaches on the hill, each to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s', 'Speed'), rounded(h, 2, 'm', 'Greatest height')],
    hints: ['The elastic potential energy of the spring becomes the kinetic energy of the cart: $\\dfrac{1}{2}kx^2 = \\dfrac{1}{2}mv^2$.', 'At the greatest height all of that energy is gravitational potential energy: $\\dfrac{1}{2}kx^2 = mgh$.', 'Change the centimetres to metres.'],
    solution: [
      `Energy stored: $E_e = \\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\times ${c.k} \\times ${x}^2 = ${num(E, 4)}$ J.`,
      `Speed: $v = \\sqrt{\\dfrac{2E_e}{m}} = \\sqrt{\\dfrac{2 \\times ${num(E, 4)}}{${c.m}}} = ${num(v, 2)}$ m/s.`,
      `Height: $h = \\dfrac{E_e}{mg} = \\dfrac{${num(E, 4)}}{${c.m} \\times 9.81} = ${num(h, 2)}$ m`,
    ],
  };
}

// ---------------------------------------------------------------------------- 3.6 energy lost to friction

/** A height, and a speed at the bottom that is well below the speed of a frictionless descent. */
function descent(rng: Rng, hs: number[]): { h: number; v: number } {
  const h = rng.pick(hs);
  const free = Math.sqrt(2 * G * h);
  const v = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 12].filter((s) => s > 0.4 * free && s < 0.9 * free));
  return { h, v };
}

function slideLoss(rng: Rng): GenOutput {
  const m = rng.pick([20, 25, 30, 40, 50]);
  const { h, v } = descent(rng, [2, 2.5, 3, 4, 5]);
  const Eg = m * G * h;
  const Ek = clean(0.5 * m * v * v);
  return {
    prompt: `${G_NOTE} A ${q(m, 'kg')} child starts from rest at the top of a slide, ${q(h, 'm')} above the bottom, and reaches the bottom at ${q(v, 'm/s')}. How much mechanical energy is changed into thermal energy by friction on the way down? Give your answer to the nearest joule.`,
    parts: [rounded(Eg - Ek, 0, 'J')],
    hints: ['Find the gravitational potential energy at the top and the kinetic energy at the bottom.', 'The difference is the energy that friction has changed into thermal energy.'],
    solution: [`At the top: $E_g = mgh = ${m} \\times 9.81 \\times ${h} = ${num(Eg, 1)}$ J.`, `At the bottom: $E_k = \\dfrac{1}{2}mv^2 = \\dfrac{1}{2} \\times ${m} \\times ${v}^2 = ${Ek}$ J.`, `Energy lost: $${num(Eg, 1)} - ${Ek} = ${num(Eg - Ek, 0)}$ J`],
  };
}

function skier(rng: Rng): GenOutput {
  const m = rng.pick([50, 60, 70, 80]);
  const h = rng.pick([20, 30, 40, 50, 60]);
  const Eg = m * G * h;
  const Wf = Math.round((Eg * rng.pick([0.2, 0.3, 0.4, 0.5])) / 500) * 500;
  const v = Math.sqrt((2 * (Eg - Wf)) / m);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} skier starts from rest and descends through a height of ${q(h, 'm')}. On the way, friction and air resistance change ${q(Wf, 'J')} of mechanical energy into thermal energy. What is the speed of the skier at the bottom? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['Energy at the top = kinetic energy at the bottom + the energy lost.', '$mgh = \\dfrac{1}{2}mv^2 + E_{\\text{lost}}$'],
    solution: [`At the top: $E_g = mgh = ${m} \\times 9.81 \\times ${h} = ${num(Eg, 1)}$ J.`, `Kinetic energy at the bottom: $${num(Eg, 1)} - ${Wf} = ${num(Eg - Wf, 1)}$ J.`, `$v = \\sqrt{\\dfrac{2E_k}{m}} = \\sqrt{\\dfrac{2 \\times ${num(Eg - Wf, 1)}}{${m}}} = ${num(v, 1)}$ m/s`],
  };
}

function slopeFriction(rng: Rng): GenOutput {
  const m = rng.pick([5, 10, 20, 40]);
  const { h, v } = descent(rng, [2, 3, 4, 5]);
  const len = clean(h * rng.pick([2, 2.5, 4]));
  const Eg = m * G * h;
  const Ek = clean(0.5 * m * v * v);
  const lost = Eg - Ek;
  return {
    prompt: `${G_NOTE} A ${q(m, 'kg')} crate starts from rest and slides ${q(len, 'm')} down a ramp, dropping through a height of ${q(h, 'm')}. It reaches the bottom at ${q(v, 'm/s')}. Find the mechanical energy lost to friction, to the nearest joule, and the average force of friction on the crate, to 1 decimal place.`,
    parts: [rounded(lost, 0, 'J', 'Energy lost'), rounded(lost / len, 1, 'N', 'Friction force')],
    hints: ['Energy lost = gravitational potential energy at the top − kinetic energy at the bottom.', 'The energy lost is the size of the work done by friction: friction force × the distance slid along the ramp.'],
    solution: [
      `At the top: $E_g = ${m} \\times 9.81 \\times ${h} = ${num(Eg, 1)}$ J. At the bottom: $E_k = \\dfrac{1}{2} \\times ${m} \\times ${v}^2 = ${Ek}$ J.`,
      `Energy lost: $${num(Eg, 1)} - ${Ek} = ${num(lost, 1)}$ J.`,
      `Friction acts along the ${len} m of the ramp: $F_f = \\dfrac{${num(lost, 1)}}{${len}} = ${num(lost / len, 1)}$ N`,
    ],
  };
}

// ---------------------------------------------------------------------------- 3.7 power

function powerSimple(rng: Rng): GenOutput {
  const P = rng.pick([40, 60, 75, 100, 150, 250, 500, 1200]);
  const t = rng.pick([5, 8, 10, 20, 30, 60]);
  const W = P * t;
  if (rng.chance(0.5)) {
    return {
      prompt: `A machine does ${q(W, 'J')} of work in ${q(t, 's')}. What is its power?`,
      parts: [numPart(P, { suffix: 'W' })],
      hints: ['Power is the work done each second: $P = \\dfrac{W}{t}$'],
      solution: [`$P = \\dfrac{W}{t} = \\dfrac{${W}}{${t}} = ${P}$ W`],
    };
  }
  return {
    prompt: `A motor has a power of ${q(P, 'W')}. How much work does it do in ${q(t, 's')}?`,
    parts: [numPart(W, { suffix: 'J' })],
    hints: ['$P = \\dfrac{W}{t}$, rearranged: $W = Pt$'],
    solution: [`$W = Pt = ${P} \\times ${t} = ${W}$ J`],
  };
}

const POWER_IDEAS: Q[] = [
  { q: 'Two students of the same mass climb the same flight of stairs. One takes half the time of the other. How do their work and power compare?', a: 'They do the same work, and the faster student has twice the power', w: ['The faster student does twice the work with the same power', 'They do the same work with the same power', 'The faster student does half the work with twice the power'], why: 'The work, $mgh$, is the same for both. Power is work ÷ time, so half the time means twice the power.' },
  { q: 'Which of these is equal to one watt?', a: '1 J/s', w: ['1 J·s', '1 N/s', '1 N·m'], order: ['1 J·s', '1 J/s', '1 N/s', '1 N·m'], why: 'Power is energy transferred each second, so a watt is a joule per second.' },
  { q: 'The kilowatt-hour is a unit of which quantity?', a: 'Energy', w: ['Power', 'Time', 'Force'], order: ['Energy', 'Power', 'Time', 'Force'], why: 'A kilowatt-hour is the energy transferred by a power of 1 kW in one hour: power × time.' },
  { q: 'A new motor has twice the power of an old one. How long does it take to do the same work?', a: 'Half the time', w: ['Twice the time', 'The same time', 'A quarter of the time'], why: '$t = \\dfrac{W}{P}$, so for the same work, twice the power takes half the time.' },
];

function powerLift(rng: Rng): GenOutput {
  const person = rng.chance(0.5);
  const m = person ? rng.pick([50, 60, 65, 75]) : rng.pick([120, 200, 350, 500]);
  const h = rng.pick([3, 4, 5, 8, 10, 12]);
  const t = rng.pick([4, 5, 8, 10, 12, 15]);
  const P = (m * G * h) / t;
  return {
    prompt: `${G_NOTE} ${person ? `A student of mass ${q(m, 'kg')} climbs a staircase ${q(h, 'm')} high in ${q(t, 's')} at a steady speed. What power does the student develop against gravity?` : `A crane lifts a ${q(m, 'kg')} load through ${q(h, 'm')} in ${q(t, 's')} at a steady speed. What is the power of the crane?`} Give your answer to 1 decimal place.`,
    parts: [rounded(P, 1, 'W')],
    hints: ['The work done against gravity is the gain in gravitational potential energy, $mgh$.', '$P = \\dfrac{mgh}{t}$'],
    solution: [`Work: $W = mgh = ${m} \\times 9.81 \\times ${h} = ${num(m * G * h, 1)}$ J.`, `$P = \\dfrac{W}{t} = \\dfrac{${num(m * G * h, 1)}}{${t}} = ${num(P, 1)}$ W`],
  };
}

function powerFromSpeed(rng: Rng): GenOutput {
  const F = rng.pick([400, 500, 600, 800, 1000, 1200]);
  const v = rng.pick([15, 20, 25, 30]);
  const kW = clean((F * v) / 1000);
  return {
    prompt: `A car travels along a level road at a steady ${q(v, 'm/s')}. Air resistance and friction together push back on it with ${q(F, 'N')}. What power must the engine deliver to the wheels, in kilowatts?`,
    parts: [numPart(kW, { suffix: 'kW' })],
    hints: ['At a steady speed the driving force equals the resistance.', 'Power = force × speed: $P = Fv$. Then divide by 1000 for kilowatts.'],
    solution: [`The speed is steady, so the driving force is ${F} N.`, `$P = Fv = ${F} \\times ${v} = ${F * v}$ W $= ${kW}$ kW`],
  };
}

function speedFromPower(rng: Rng): GenOutput {
  const kW = rng.pick([30, 45, 60, 75, 90]);
  const F = rng.pick([800, 1200, 1500, 2000, 2500]);
  const v = (kW * 1000) / F;
  return {
    prompt: `The engine of a boat delivers ${q(kW, 'kW')} to the propeller. At its top speed the water pushes back on the boat with ${q(F, 'N')}. What is the top speed of the boat? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['At the top speed the driving force equals the resistance.', 'Change the kilowatts to watts, then rearrange $P = Fv$ to get $v = \\dfrac{P}{F}$.'],
    solution: [`$P = ${kW}\\ \\text{kW} = ${kW * 1000}$ W`, `$v = \\dfrac{P}{F} = \\dfrac{${kW * 1000}}{${F}} = ${num(v, 1)}$ m/s`],
  };
}

function liftSpeed(rng: Rng): GenOutput {
  const P = rng.pick([500, 750, 1200, 1500, 2000, 3000]);
  const m = rng.pick([40, 60, 100, 150, 250]);
  const v = P / (m * G);
  return {
    prompt: `${G_NOTE} A motor delivers ${q(P, 'W')} to a cable that lifts a ${q(m, 'kg')} load at a steady speed. At what speed does the load rise? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['At a steady speed the tension in the cable equals the weight of the load, $mg$.', 'Rearrange $P = Fv$ to get $v = \\dfrac{P}{F}$.'],
    solution: [`Force: $F = mg = ${m} \\times 9.81 = ${num(m * G, 1)}$ N.`, `$v = \\dfrac{P}{F} = \\dfrac{${P}}{${num(m * G, 1)}} = ${num(v, 2)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 3.7 efficiency

function effPercent(rng: Rng): GenOutput {
  const eff = rng.pick([20, 25, 30, 40, 60, 75, 80, 90]);
  const Ein = rng.pick([200, 400, 500, 800, 1000, 1200, 2000]);
  const Eout = clean((Ein * eff) / 100);
  const [device, useful] = rng.pick<[string, string]>([['An electric motor', 'useful work'], ['A lamp', 'light'], ['A petrol engine', 'useful work'], ['A pulley system', 'useful work on the load']]);
  if (rng.chance(0.5)) {
    return {
      prompt: `${device} takes in ${q(Ein, 'J')} of energy and gives out ${q(Eout, 'J')} as ${useful}. What is its efficiency, as a percent?`,
      parts: [numPart(eff, { suffix: '%' })],
      hints: ['efficiency = useful energy out ÷ total energy in × 100%'],
      solution: [`efficiency $= \\dfrac{${Eout}}{${Ein}} \\times 100\\% = ${eff}\\%$`],
    };
  }
  return {
    prompt: `${device} has an efficiency of ${eff}%. It takes in ${q(Ein, 'J')} of energy. How much of that energy becomes ${useful}, and how much is wasted?`,
    parts: [numPart(Eout, { suffix: 'J', label: 'Useful' }), numPart(clean(Ein - Eout), { suffix: 'J', label: 'Wasted' })],
    hints: ['useful energy out = efficiency × total energy in', 'The rest is wasted, mostly as thermal energy.'],
    solution: [`Useful: $${eff / 100} \\times ${Ein} = ${Eout}$ J.`, `Wasted: $${Ein} - ${Eout} = ${clean(Ein - Eout)}$ J`],
  };
}

function effLift(rng: Rng): GenOutput {
  const m = rng.pick([10, 20, 25, 40, 50]);
  const h = rng.pick([2, 3, 4, 5, 6, 8]);
  const out = m * G * h;
  const Ein = Math.ceil(out / rng.pick([0.4, 0.5, 0.6, 0.7, 0.8]) / 50) * 50;
  const eff = (out / Ein) * 100;
  return {
    prompt: `${G_NOTE} An electric hoist uses ${q(Ein, 'J')} of electrical energy to lift a ${q(m, 'kg')} load through ${q(h, 'm')}. What is the efficiency of the hoist, as a percent? Give your answer to 1 decimal place.`,
    parts: [rounded(eff, 1, '%')],
    hints: ['The useful energy out is the gravitational potential energy gained by the load, $mgh$.', 'efficiency = useful energy out ÷ total energy in × 100%'],
    solution: [`Useful energy out: $mgh = ${m} \\times 9.81 \\times ${h} = ${num(out, 1)}$ J.`, `efficiency $= \\dfrac{${num(out, 1)}}{${Ein}} \\times 100\\% = ${num(eff, 1)}\\%$`],
  };
}

function effTime(rng: Rng): GenOutput {
  const { P, eff, m, h } = retry(
    () => ({ P: rng.pick([400, 500, 800, 1000, 1500, 2000]), eff: rng.pick([40, 50, 60, 75, 80]), m: rng.pick([50, 100, 150, 200, 300]), h: rng.pick([4, 5, 8, 10, 12, 15]) }),
    (c) => (c.m * G * c.h) / ((c.P * c.eff) / 100) >= 4,
  );
  const out = m * G * h;
  const useful = clean((P * eff) / 100);
  const t = out / useful;
  return {
    prompt: `${G_NOTE} A motor takes in electrical energy at ${q(P, 'W')} and is ${eff}% efficient. How long does it take to lift a ${q(m, 'kg')} load through ${q(h, 'm')}? Give your answer to 1 decimal place.`,
    parts: [rounded(t, 1, 's')],
    hints: [`Only ${eff}% of the input power does useful work.`, 'The useful work needed is $mgh$, and time = work ÷ power.'],
    solution: [`Useful power: $${eff / 100} \\times ${P} = ${useful}$ W.`, `Useful work: $mgh = ${m} \\times 9.81 \\times ${h} = ${num(out, 1)}$ J.`, `$t = \\dfrac{W}{P} = \\dfrac{${num(out, 1)}}{${useful}} = ${num(t, 1)}$ s`],
  };
}

function effInput(rng: Rng): GenOutput {
  const eff = rng.pick([20, 25, 30, 40]);
  const m = rng.pick([800, 1000, 1200, 1500]);
  const h = rng.pick([20, 30, 50, 80]);
  const out = m * G * h;
  const kJ = out / (eff / 100) / 1000;
  return {
    prompt: `${G_NOTE} The engine of ${an(m)} ${q(m, 'kg')} car is ${eff}% efficient. How much energy must the fuel supply for the car to climb a hill ${q(h, 'm')} high at a steady speed? Count only the work done against gravity, and give your answer in kilojoules, to the nearest kilojoule.`,
    parts: [rounded(kJ, 0, 'kJ')],
    hints: ['The useful energy out is $mgh$.', 'total energy in = useful energy out ÷ efficiency, with the efficiency as a decimal'],
    solution: [`Useful energy out: $mgh = ${m} \\times 9.81 \\times ${h} = ${num(out, 0)}$ J.`, `Energy in: $\\dfrac{${num(out, 0)}}{${eff / 100}} = ${num(kJ * 1000, 0)}$ J $= ${num(kJ, 0)}$ kJ`],
  };
}

export const ENERGY_SKILLS: SkillDef[] = [
  skill({ id: 'p20-work', name: 'Work', description: 'Calculate the work done by a force along or at an angle to the displacement, the work done by friction and the net work.', outcomes: ['20-C2'], lessonId: L(4), calculator: true, gen: bank([either(workSimple, fromBank(WORK_IDEAS, ['Work is done only when a force has a part along the displacement.'])), workAngle, netWork], ['$W = Fd\\cos\\theta$, where $\\theta$ is the angle between the force and the displacement']) }),
  skill({ id: 'p20-work-graph', name: 'Force-displacement graphs', description: 'Find the work done from the area under a force-displacement graph.', outcomes: ['20-C2'], lessonId: L(4), calculator: true, gen: bank([either(graphRect, graphRamp), graphTwo, graphThree], [FD_HINT]) }),
  skill({ id: 'p20-kinetic-potential', name: 'Kinetic and gravitational energy', description: 'Calculate kinetic energy and gravitational potential energy, and use the work-energy theorem.', outcomes: ['20-C2'], lessonId: L(5), calculator: true, gen: bank([either(kineticEnergy, gravEnergy), workEnergySpeed, braking], ['$E_k = \\dfrac{1}{2}mv^2$, $E_g = mgh$ and $W_{\\text{net}} = \\Delta E_k$']) }),
  skill({ id: 'p20-elastic-energy', name: 'Springs and elastic energy', description: 'Use Hooke’s law, and calculate the elastic potential energy stored in a spring.', outcomes: ['20-C2'], lessonId: L(5), calculator: true, gen: bank([hooke, elasticEnergy, hangingMass], ['$F = kx$ and $E_e = \\dfrac{1}{2}kx^2$, with $x$ in metres']) }),
  skill({ id: 'p20-conservation', name: 'Conservation of mechanical energy', description: 'Use the conservation of mechanical energy to find speeds and heights when friction can be ignored.', outcomes: ['20-C2'], lessonId: L(6), calculator: true, gen: bank([either(dropSpeed, fromBank(CONSERVATION_IDEAS, ['With no friction, kinetic and potential energy change into each other and their total stays the same.'])), either(coasterDown, coasterUp), springLaunch], ['Total mechanical energy at the start = total mechanical energy at the end']) }),
  skill({ id: 'p20-energy-loss', name: 'Energy lost to friction', description: 'Find the mechanical energy that friction changes into thermal energy, and the speed or the friction force that follows.', outcomes: ['20-C2'], lessonId: L(6), calculator: true, gen: bank([slideLoss, skier, slopeFriction], ['Mechanical energy at the start = mechanical energy at the end + the energy lost to friction']) }),
  skill({ id: 'p20-power', name: 'Power', description: 'Calculate power from work and time, from a lift against gravity, and from force and speed.', outcomes: ['20-C2'], lessonId: L(7), calculator: true, gen: bank([either(powerSimple, fromBank(POWER_IDEAS, ['Power is the rate of doing work: work ÷ time.'])), powerLift, either(powerFromSpeed, speedFromPower, liftSpeed)], ['$P = \\dfrac{W}{t}$, and at a steady speed $P = Fv$']) }),
  skill({ id: 'p20-efficiency', name: 'Efficiency', description: 'Calculate efficiency, and the useful output, input or time of a machine of known efficiency.', outcomes: ['20-C2'], lessonId: L(7), calculator: true, gen: bank([effPercent, effLift, either(effTime, effInput)], ['efficiency = useful energy out ÷ total energy in × 100%']) }),
];
