/**
 * Grade 11 Physics, Unit 4, lessons 4.1 to 4.3: oscillations (20-D1). Simple harmonic motion and
 * its restoring force, the mass on a spring and its energy, and the pendulum. Every number a
 * question needs is in the question, including g = 9.81 m/s² (or the value on another world).
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, SkillDef } from '../../../types.ts';
import { An, G, clean, rounded } from './common.ts';

const L = (n: number) => `p20-4-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';
const ACC = 'm/s²';
const PI = Math.PI;

// ---------------------------------------------------------------------------- 4.1 describing an oscillation

/** Things that oscillate, each with periods (s) that suit it. */
const SWINGERS = [
  { name: 'A mass on a spring', Ts: [0.4, 0.5, 0.8, 1.25] },
  { name: 'A child on a swing', Ts: [2, 2.5, 3.2, 4] },
  { name: 'A pendulum', Ts: [0.8, 1.25, 1.6, 2] },
  { name: 'The tip of a ruler clamped to a bench', Ts: [0.05, 0.1, 0.2, 0.25] },
  { name: 'A buoy bobbing on a lake', Ts: [1.6, 2, 2.5, 4] },
];

function periodFrequency(rng: Rng): GenOutput {
  const who = rng.pick(SWINGERS);
  const T = rng.pick(who.Ts);
  const n = rng.pick([5, 10, 20, 25, 40]);
  const t = clean(T * n);
  const wantPeriod = rng.chance(0.5);
  return {
    prompt: `${who.name} makes ${n} complete oscillations in ${q(t, 's')}. What is its ${wantPeriod ? 'period' : 'frequency'}?`,
    parts: [wantPeriod ? numPart(T, { suffix: 's' }) : numPart(clean(1 / T), { suffix: 'Hz' })],
    hints: [wantPeriod ? 'The period is the time for one complete oscillation: the total time ÷ the number of oscillations.' : 'The frequency is the number of oscillations each second: the number of oscillations ÷ the total time.'],
    solution: [wantPeriod ? `$T = \\dfrac{${t}}{${n}} = ${T}$ s` : `$f = \\dfrac{${n}}{${t}} = ${clean(1 / T)}$ Hz`],
  };
}

const SHM_IDEAS: Q[] = [
  { q: 'What is the amplitude of an oscillation?', a: 'The greatest distance from the equilibrium position', w: ['The distance from one extreme to the other', 'The time for one complete oscillation', 'The number of oscillations each second'], why: 'The amplitude is measured from the equilibrium position to one extreme, not from one extreme to the other.' },
  { q: 'A mass on a spring moves from its highest point to its lowest point and back to its highest point. How many complete oscillations is that?', a: 'One', w: ['Half of one', 'Two', 'Four'], order: ['Half of one', 'One', 'Two', 'Four'], why: 'One complete oscillation brings the object back to where it started, moving the same way.' },
  { q: 'The period of an oscillation is 0.2 s. What is its frequency?', a: '5 Hz', w: ['0.2 Hz', '2 Hz', '50 Hz'], order: ['0.2 Hz', '2 Hz', '5 Hz', '50 Hz'], why: 'Frequency is one divided by the period: $\\dfrac{1}{0.2} = 5$ oscillations each second.' },
  { q: 'Which of these is the equilibrium position of a pendulum?', a: 'The lowest point, where it hangs when it is at rest', w: ['The highest point of the swing on the left', 'The highest point of the swing on the right', 'Halfway up on either side'], why: 'The equilibrium position is where the net force is zero, so the object stays there if it is at rest.' },
];

/** A displacement-time graph of an oscillation, and the numbers it was drawn from. */
function shmGraph(rng: Rng) {
  const A = rng.pick([2, 3, 4, 5, 6]);
  const T = rng.pick([0.4, 0.8, 2, 4]);
  const cycles = rng.pick([2, 2.5, 3]);
  const tMax = clean(T * cycles);
  const points: Array<[number, number]> = [];
  const steps = Math.round(cycles * 24);
  for (let i = 0; i <= steps; i++) {
    const t = (tMax * i) / steps;
    points.push([clean(t), Math.round(A * Math.sin((2 * PI * t) / T) * 100) / 100]);
  }
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: tMax, yMin: -(A + 1), yMax: A + 1, xStep: clean(T / 4), yStep: 1, xLabel: 'Time (s)', yLabel: 'Displacement (cm)' },
    polylines: [{ points }],
    caption: 'Displacement-time graph of an oscillating mass',
  };
  return { A, T, figure };
}

function readGraph(rng: Rng): GenOutput {
  const g = shmGraph(rng);
  return {
    figure: g.figure,
    prompt: 'The graph shows the displacement of an oscillating mass from its equilibrium position. Read the amplitude and the period from the graph.',
    parts: [numPart(g.A, { suffix: 'cm', label: 'Amplitude' }), numPart(g.T, { suffix: 's', label: 'Period' })],
    hints: ['The amplitude is the greatest displacement from zero.', 'The period is the time for one complete cycle: for example from one peak to the next.'],
    solution: [`The graph reaches ${g.A} cm above and below zero, so the amplitude is ${g.A} cm.`, `One complete cycle takes ${g.T} s, so the period is ${g.T} s`],
  };
}

function distanceTravelled(rng: Rng): GenOutput {
  const A = rng.pick([2, 3, 4, 5, 6, 8]);
  const f = rng.pick([0.5, 2, 2.5, 4, 5]);
  const t = rng.pick([2, 4, 6, 10]);
  const n = clean(f * t);
  const d = 4 * A * n;
  return {
    prompt: `A mass on a spring oscillates with an amplitude of ${q(A, 'cm')} and a frequency of ${q(f, 'Hz')}. Find the number of complete oscillations it makes in ${q(t, 's')} and the total distance it travels in that time, in centimetres.`,
    parts: [numPart(n, { label: 'Oscillations' }), numPart(d, { suffix: 'cm', label: 'Distance' })],
    hints: ['Number of oscillations = frequency × time.', 'In one oscillation the mass goes from the middle to one extreme, back through the middle to the other extreme and back to the middle: four amplitudes.'],
    solution: [`Oscillations: $${f} \\times ${t} = ${n}$.`, `Each oscillation covers $4 \\times ${A} = ${4 * A}$ cm.`, `Distance: $${n} \\times ${4 * A} = ${d}$ cm`],
  };
}

// ---------------------------------------------------------------------------- 4.1 the restoring force

const RESTORING_IDEAS: Q[] = [
  { q: 'A mass on a spring is in simple harmonic motion. Where is its speed greatest?', a: 'At the equilibrium position', w: ['At the extremes of the motion', 'Halfway between the equilibrium position and an extreme', 'It is the same everywhere'], why: 'The restoring force speeds the mass up all the way in to the equilibrium position, and slows it down on the way out.' },
  { q: 'A mass on a spring is in simple harmonic motion. Where is the size of its acceleration greatest?', a: 'At the extremes of the motion', w: ['At the equilibrium position', 'Halfway between the equilibrium position and an extreme', 'It is the same everywhere'], why: 'The restoring force, and so the acceleration, is proportional to the displacement, which is greatest at the extremes.' },
  { q: 'In simple harmonic motion, in which direction does the restoring force point?', a: 'Always towards the equilibrium position', w: ['Always away from the equilibrium position', 'Always in the direction of motion', 'Always opposite to the direction of motion'], why: 'That is what "restoring" means: the force pulls the object back towards equilibrium, whichever side it is on.' },
  { q: 'What is the net force on a mass in simple harmonic motion at the instant it passes through the equilibrium position?', a: 'Zero', w: ['Its greatest value', 'Half its greatest value', 'Equal to the weight of the mass'], why: 'The restoring force is proportional to the displacement, and the displacement is zero at equilibrium.' },
  { q: 'What makes a motion simple harmonic?', a: 'A restoring force proportional to the displacement from equilibrium', w: ['A steady force towards the equilibrium position', 'Any motion that repeats', 'A force proportional to the speed'], why: 'Simple harmonic motion needs $F = -kx$: twice the displacement gives twice the force, pointing back to equilibrium.' },
];

function restoringForce(rng: Rng): GenOutput {
  const k = rng.pick([20, 40, 50, 80, 120, 200, 250]);
  const cm = rng.pick([2, 4, 5, 8, 10, 12, 15]);
  const F = clean((k * cm) / 100);
  return {
    prompt: `A mass on a spring with a spring constant of ${q(k, 'N/m')} is ${q(cm, 'cm')} from its equilibrium position. What is the size of the restoring force on it?`,
    parts: [numPart(F, { suffix: 'N' })],
    hints: ['Change the centimetres to metres.', 'The size of the restoring force is $kx$.'],
    solution: [`$x = ${cm}\\ \\text{cm} = ${cm / 100}$ m`, `$F = kx = ${k} \\times ${cm / 100} = ${F}$ N, towards the equilibrium position`],
  };
}

function maxAcceleration(rng: Rng): GenOutput {
  const k = rng.pick([20, 40, 50, 80, 120, 200]);
  const m = rng.pick([0.2, 0.25, 0.4, 0.5, 0.8, 1, 2]);
  const cm = rng.pick([2, 4, 5, 8, 10]);
  const a = (k * cm) / 100 / m;
  return {
    prompt: `${An(m)} ${q(m, 'kg')} mass on a spring with a spring constant of ${q(k, 'N/m')} oscillates on a frictionless surface with an amplitude of ${q(cm, 'cm')}. What is the size of its greatest acceleration? Give your answer to 2 decimal places.`,
    parts: [rounded(a, 2, ACC)],
    hints: ['The acceleration is greatest where the restoring force is greatest: at the extremes, where $x$ equals the amplitude.', '$a = \\dfrac{kx}{m}$, with $x$ in metres'],
    solution: [`At an extreme, $x = ${cm / 100}$ m, so $F = kx = ${k} \\times ${cm / 100} = ${clean((k * cm) / 100)}$ N.`, `$a = \\dfrac{F}{m} = \\dfrac{${clean((k * cm) / 100)}}{${m}} = ${num(a, 2)}\\ \\text{m/s}^2$`],
  };
}

function displacementForAccel(rng: Rng): GenOutput {
  const c = retry(
    () => ({ k: rng.pick([40, 50, 80, 100, 200]), m: rng.pick([0.25, 0.4, 0.5, 1, 2]), a: rng.pick([2, 4, 5, 8, 10]) }),
    (t) => (t.m * t.a) / t.k <= 0.2,
  );
  const cm = ((c.m * c.a) / c.k) * 100;
  const right = rng.chance(0.5);
  return {
    prompt: `A ${q(c.m, 'kg')} mass on a horizontal spring with a spring constant of ${q(c.k, 'N/m')} oscillates on a frictionless surface. At one instant its acceleration is $${c.a}\\ \\text{m/s}^2$ to the ${right ? 'right' : 'left'}. How far is the mass from its equilibrium position, in centimetres, and on which side? Give the distance to 1 decimal place.`,
    parts: [rounded(cm, 1, 'cm', 'Distance'), part(fixedChoice(['To the left of equilibrium', 'To the right of equilibrium'], right ? 0 : 1), { label: 'Side' })],
    hints: ['The restoring force is $ma$, and its size is also $kx$.', 'The force and the acceleration point towards the equilibrium position, so the mass is on the opposite side.'],
    solution: [`$F = ma = ${c.m} \\times ${c.a} = ${clean(c.m * c.a)}$ N.`, `$x = \\dfrac{F}{k} = \\dfrac{${clean(c.m * c.a)}}{${c.k}} = ${num(cm / 100, 4)}$ m $= ${num(cm, 1)}$ cm.`, `The acceleration points to the ${right ? 'right' : 'left'}, towards equilibrium, so the mass is to the ${right ? 'left' : 'right'} of equilibrium`],
  };
}

// ---------------------------------------------------------------------------- 4.2 the period of a mass on a spring

function springPeriod(rng: Rng): GenOutput {
  const m = rng.pick([0.2, 0.25, 0.4, 0.5, 1, 1.5, 2, 4]);
  const k = rng.pick([20, 40, 50, 80, 100, 200, 250]);
  const T = 2 * PI * Math.sqrt(m / k);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} mass oscillates on a spring with a spring constant of ${q(k, 'N/m')}. What is the period of the oscillation? Give your answer to 2 decimal places.`,
    parts: [rounded(T, 2, 's')],
    hints: ['$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$', 'Work out the square root first, then multiply by $2\\pi$.'],
    solution: [`$T = 2\\pi\\sqrt{\\dfrac{m}{k}} = 2\\pi\\sqrt{\\dfrac{${m}}{${k}}} = ${num(T, 2)}$ s`],
  };
}

function springFrequency(rng: Rng): GenOutput {
  const g = rng.pick([50, 100, 150, 200, 250, 400, 500]);
  const k = rng.pick([10, 20, 25, 40, 50, 80]);
  const m = g / 1000;
  const T = 2 * PI * Math.sqrt(m / k);
  return {
    prompt: `A ${q(g, 'g')} mass oscillates on a spring with a spring constant of ${q(k, 'N/m')}. Find the period, to 3 decimal places, and the frequency, to 2 decimal places.`,
    parts: [rounded(T, 3, 's', 'Period'), rounded(1 / T, 2, 'Hz', 'Frequency')],
    hints: ['Change the grams to kilograms.', '$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$ and $f = \\dfrac{1}{T}$'],
    solution: [`$m = ${g}\\ \\text{g} = ${m}$ kg`, `$T = 2\\pi\\sqrt{\\dfrac{${m}}{${k}}} = ${num(T, 3)}$ s`, `$f = \\dfrac{1}{T} = \\dfrac{1}{${num(T, 3)}} = ${num(1 / T, 2)}$ Hz`],
  };
}

function springConstantFromTiming(rng: Rng): GenOutput {
  const m = rng.pick([0.2, 0.25, 0.4, 0.5, 0.8, 1]);
  const T = rng.pick([0.4, 0.5, 0.6, 0.8, 1, 1.2]);
  const n = rng.pick([10, 20]);
  const t = clean(T * n);
  const k = (4 * PI * PI * m) / (T * T);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} mass on a spring makes ${n} complete oscillations in ${q(t, 's')}. Find the period and the spring constant of the spring. Give the spring constant to 1 decimal place.`,
    parts: [numPart(T, { suffix: 's', label: 'Period' }), rounded(k, 1, 'N/m', 'Spring constant')],
    hints: ['The period is the total time ÷ the number of oscillations.', 'Square $T = 2\\pi\\sqrt{\\dfrac{m}{k}}$ and rearrange: $k = \\dfrac{4\\pi^2 m}{T^2}$.'],
    solution: [`$T = \\dfrac{${t}}{${n}} = ${T}$ s`, `$k = \\dfrac{4\\pi^2 m}{T^2} = \\dfrac{4\\pi^2 \\times ${m}}{${T}^2} = ${num(k, 1)}$ N/m`],
  };
}

function massFromPeriod(rng: Rng): GenOutput {
  const k = rng.pick([20, 40, 50, 80, 100, 200]);
  const T = rng.pick([0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5]);
  const m = (k * T * T) / (4 * PI * PI);
  return {
    prompt: `A spring has a spring constant of ${q(k, 'N/m')}. What mass must be hung on it for the period of the oscillation to be ${q(T, 's')}? Give your answer to 2 decimal places.`,
    parts: [rounded(m, 2, 'kg')],
    hints: ['Square $T = 2\\pi\\sqrt{\\dfrac{m}{k}}$ and rearrange: $m = \\dfrac{kT^2}{4\\pi^2}$.'],
    solution: [`$T^2 = \\dfrac{4\\pi^2 m}{k}$, so $m = \\dfrac{kT^2}{4\\pi^2} = \\dfrac{${k} \\times ${T}^2}{4\\pi^2} = ${num(m, 2)}$ kg`],
  };
}

// ---------------------------------------------------------------------------- 4.2 energy in simple harmonic motion

function shmEnergy(rng: Rng): GenOutput {
  const k = rng.pick([50, 80, 100, 200, 250, 400]);
  const cm = rng.pick([4, 5, 8, 10, 12, 20]);
  const A = cm / 100;
  const E = 0.5 * k * A * A;
  return {
    prompt: `A mass oscillates on a spring with a spring constant of ${q(k, 'N/m')}, with an amplitude of ${q(cm, 'cm')}, on a frictionless surface. What is the total mechanical energy of the oscillation? Give your answer to 2 decimal places.`,
    parts: [rounded(E, 2, 'J')],
    hints: ['At an extreme the mass is at rest for an instant, so all the energy is elastic potential energy.', '$E = \\dfrac{1}{2}kA^2$, with the amplitude in metres'],
    solution: [`$A = ${cm}\\ \\text{cm} = ${A}$ m`, `$E = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\times ${k} \\times ${A}^2 = ${num(E, 2)}$ J`],
  };
}

function maxSpeed(rng: Rng): GenOutput {
  const k = rng.pick([50, 80, 100, 200, 400]);
  const m = rng.pick([0.2, 0.25, 0.5, 0.8, 1, 2]);
  const cm = rng.pick([4, 5, 8, 10, 12]);
  const A = cm / 100;
  const v = A * Math.sqrt(k / m);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} mass oscillates on a spring with a spring constant of ${q(k, 'N/m')}, with an amplitude of ${q(cm, 'cm')}, on a frictionless surface. What is its greatest speed? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['The speed is greatest at the equilibrium position, where all the energy is kinetic.', '$\\dfrac{1}{2}mv^2 = \\dfrac{1}{2}kA^2$, so $v = A\\sqrt{\\dfrac{k}{m}}$.'],
    solution: [`Total energy: $\\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\times ${k} \\times ${A}^2 = ${num(0.5 * k * A * A, 4)}$ J.`, `At equilibrium this is all kinetic: $v = \\sqrt{\\dfrac{2E}{m}} = \\sqrt{\\dfrac{2 \\times ${num(0.5 * k * A * A, 4)}}{${m}}} = ${num(v, 2)}$ m/s`],
  };
}

function speedAtDisplacement(rng: Rng): GenOutput {
  const k = rng.pick([50, 80, 100, 200, 400]);
  const m = rng.pick([0.2, 0.25, 0.5, 0.8, 1, 2]);
  const [cmA, cmX] = rng.pick<[number, number]>([[5, 3], [5, 4], [10, 6], [10, 8], [10, 5], [8, 4], [12, 6], [13, 5], [20, 12]]);
  const A = cmA / 100;
  const x = cmX / 100;
  const E = 0.5 * k * A * A;
  const Ee = 0.5 * k * x * x;
  const v = Math.sqrt((2 * (E - Ee)) / m);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} mass oscillates on a spring with a spring constant of ${q(k, 'N/m')}, with an amplitude of ${q(cmA, 'cm')}, on a frictionless surface. What is its speed when it is ${q(cmX, 'cm')} from the equilibrium position? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['The total energy is $\\dfrac{1}{2}kA^2$. Part of it is elastic potential energy, $\\dfrac{1}{2}kx^2$, and the rest is kinetic.', '$\\dfrac{1}{2}mv^2 = \\dfrac{1}{2}kA^2 - \\dfrac{1}{2}kx^2$'],
    solution: [
      `Total energy: $\\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\times ${k} \\times ${A}^2 = ${num(E, 4)}$ J.`,
      `Elastic potential energy at ${cmX} cm: $\\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\times ${k} \\times ${x}^2 = ${num(Ee, 4)}$ J.`,
      `Kinetic energy: $${num(E, 4)} - ${num(Ee, 4)} = ${num(E - Ee, 4)}$ J, so $v = \\sqrt{\\dfrac{2 \\times ${num(E - Ee, 4)}}{${m}}} = ${num(v, 2)}$ m/s`,
    ],
  };
}

// ---------------------------------------------------------------------------- 4.3 the period of a pendulum

function pendulumPeriod(rng: Rng): GenOutput {
  const len = rng.pick([0.25, 0.4, 0.5, 0.8, 1, 1.2, 1.5, 2, 2.5]);
  const T = 2 * PI * Math.sqrt(len / G);
  return {
    prompt: `${G_NOTE} A simple pendulum is ${q(len, 'm')} long. What is its period for small swings? Give your answer to 2 decimal places.`,
    parts: [rounded(T, 2, 's')],
    hints: ['$T = 2\\pi\\sqrt{\\dfrac{L}{g}}$'],
    solution: [`$T = 2\\pi\\sqrt{\\dfrac{L}{g}} = 2\\pi\\sqrt{\\dfrac{${len}}{9.81}} = ${num(T, 2)}$ s`],
  };
}

function pendulumLength(rng: Rng): GenOutput {
  const T = rng.pick([0.8, 1, 1.2, 1.5, 2, 2.5, 3]);
  const len = (G * T * T) / (4 * PI * PI);
  return {
    prompt: `${G_NOTE} How long must a simple pendulum be for its period to be ${q(T, 's')}? Give your answer to 2 decimal places.`,
    parts: [rounded(len, 2, 'm')],
    hints: ['Square $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$ and rearrange: $L = \\dfrac{gT^2}{4\\pi^2}$.'],
    solution: [`$T^2 = \\dfrac{4\\pi^2 L}{g}$, so $L = \\dfrac{gT^2}{4\\pi^2} = \\dfrac{9.81 \\times ${T}^2}{4\\pi^2} = ${num(len, 2)}$ m`],
  };
}

function pendulumElsewhere(rng: Rng): GenOutput {
  const [world, g] = rng.pick<[string, number]>([['the Moon', 1.62], ['a planet', 3.71], ['a planet', 24.8], ['a moon', 1.35], ['a planet', 8.87]]);
  const len = rng.pick([0.5, 0.8, 1, 1.5, 2]);
  const Te = 2 * PI * Math.sqrt(len / G);
  const Tw = 2 * PI * Math.sqrt(len / g);
  return {
    prompt: `A simple pendulum is ${q(len, 'm')} long. Find its period on Earth, where $g = 9.81\\ \\text{m/s}^2$, and on ${world} where $g = ${g}\\ \\text{m/s}^2$. Give each answer to 2 decimal places.`,
    parts: [rounded(Te, 2, 's', 'On Earth'), rounded(Tw, 2, 's', world === 'the Moon' ? 'On the Moon' : `On the ${world.split(' ')[1]}`)],
    hints: ['$T = 2\\pi\\sqrt{\\dfrac{L}{g}}$, with the value of $g$ for each place', 'Weaker gravity gives a longer period.'],
    solution: [`On Earth: $T = 2\\pi\\sqrt{\\dfrac{${len}}{9.81}} = ${num(Te, 2)}$ s.`, `On ${world}: $T = 2\\pi\\sqrt{\\dfrac{${len}}{${g}}} = ${num(Tw, 2)}$ s`],
  };
}

const PENDULUM_RATIOS: Q[] = [
  { q: 'The length of a pendulum is made four times as large. What happens to its period?', a: 'It doubles', w: ['It becomes four times as large', 'It halves', 'It stays the same'], why: 'The period is proportional to the square root of the length, and $\\sqrt{4} = 2$.' },
  { q: 'The bob of a pendulum is replaced by one of twice the mass, on the same string. What happens to the period?', a: 'It stays the same', w: ['It doubles', 'It halves', 'It becomes $\\sqrt{2}$ times as large'], why: '$T = 2\\pi\\sqrt{\\dfrac{L}{g}}$ contains no mass. A heavier bob has more weight to pull it back, but also more inertia.' },
  { q: 'A pendulum clock is taken from the Earth to the Moon, where gravity is weaker. What happens to the clock?', a: 'It runs slow, because the period is longer', w: ['It runs fast, because the period is shorter', 'It keeps the same time', 'It stops, because there is no gravity'], why: 'A smaller $g$ gives a larger $\\sqrt{\\dfrac{L}{g}}$, so each swing takes longer.' },
  { q: 'A pendulum has a period of 2 s. Its length is cut to one quarter. What is the new period?', a: '1 s', w: ['0.5 s', '2 s', '4 s'], order: ['0.5 s', '1 s', '2 s', '4 s'], why: 'The period is proportional to $\\sqrt{L}$. One quarter of the length gives $\\sqrt{\\dfrac{1}{4}} = \\dfrac{1}{2}$ of the period.' },
];

// ---------------------------------------------------------------------------- 4.3 measuring g with a pendulum

const PENDULUM_IDEAS: Q[] = [
  { q: 'Which of these changes the period of a simple pendulum, for small swings?', a: 'The length of the string', w: ['The mass of the bob', 'The amplitude of the swing', 'The colour of the bob'], why: 'For small swings the period depends only on the length and on $g$.' },
  { q: 'What provides the restoring force on a pendulum bob?', a: 'The component of its weight along the path of the swing', w: ['The tension in the string', 'The whole of its weight', 'Air resistance'], why: 'The tension acts along the string, at right angles to the path. Only the part of the weight along the path pulls the bob back to the lowest point.' },
  { q: 'To measure the period of a pendulum accurately, what should you time?', a: 'Twenty complete swings, then divide by 20', w: ['One complete swing', 'Half a swing, then double it', 'The first swing only'], why: 'Your reaction time is spread over twenty swings, so the error in each period is twenty times smaller.' },
  { q: 'The formula $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$ works well only when which of these is true?', a: 'The angle of the swing is small', w: ['The bob is heavy', 'The string is short', 'The pendulum is on the Earth'], why: 'Only for small angles is the restoring force proportional to the displacement, which is what simple harmonic motion needs.' },
];

function gFromPeriod(rng: Rng): GenOutput {
  const g = rng.pick([1.62, 3.71, 8.87, 9.78, 9.83, 11.2, 24.8]);
  const len = rng.pick([0.5, 0.8, 1, 1.2, 1.5, 2]);
  const T = Math.round(2 * PI * Math.sqrt(len / g) * 100) / 100;
  const found = (4 * PI * PI * len) / (T * T);
  return {
    prompt: `On the surface of a planet, a simple pendulum ${q(len, 'm')} long has a period of ${q(T, 's')}. What is the acceleration due to gravity there? Give your answer to 2 decimal places.`,
    parts: [rounded(found, 2, ACC)],
    hints: ['Square $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$ and rearrange: $g = \\dfrac{4\\pi^2 L}{T^2}$.'],
    solution: [`$T^2 = \\dfrac{4\\pi^2 L}{g}$, so $g = \\dfrac{4\\pi^2 L}{T^2} = \\dfrac{4\\pi^2 \\times ${len}}{${T}^2} = ${num(found, 2)}\\ \\text{m/s}^2$`],
  };
}

function gFromTiming(rng: Rng): GenOutput {
  const cm = rng.pick([40, 50, 60, 75, 80, 90, 120]);
  const len = cm / 100;
  const n = rng.pick([10, 20]);
  const g = rng.pick([9.7, 9.76, 9.81, 9.85, 9.9]);
  const t = Math.round(n * 2 * PI * Math.sqrt(len / g) * 10) / 10;
  const T = t / n;
  const found = (4 * PI * PI * len) / (T * T);
  return {
    prompt: `A student times a simple pendulum ${q(cm, 'cm')} long. It makes ${n} complete swings in ${q(t, 's')}. Find the period, to 3 decimal places, and the value of $g$ that this experiment gives, to 2 decimal places.`,
    parts: [rounded(T, 3, 's', 'Period'), rounded(found, 2, ACC, 'g')],
    hints: ['The period is the total time ÷ the number of swings.', 'Change the centimetres to metres.', '$g = \\dfrac{4\\pi^2 L}{T^2}$'],
    solution: [`$T = \\dfrac{${t}}{${n}} = ${num(T, 3)}$ s, and $L = ${len}$ m.`, `$g = \\dfrac{4\\pi^2 L}{T^2} = \\dfrac{4\\pi^2 \\times ${len}}{${num(T, 3)}^2} = ${num(found, 2)}\\ \\text{m/s}^2$`],
  };
}

export const OSCILLATION_SKILLS: SkillDef[] = [
  skill({ id: 'p20-shm-describe', name: 'Describing an oscillation', description: 'Find the period, frequency and amplitude of an oscillation from a description or a displacement-time graph.', outcomes: ['20-D1'], lessonId: L(1), calculator: true, gen: bank([either(periodFrequency, fromBank(SHM_IDEAS, ['The amplitude is measured from the equilibrium position, and the period is the time for one complete oscillation.'])), readGraph, distanceTravelled], ['$f = \\dfrac{1}{T}$, and one oscillation covers four amplitudes']) }),
  skill({ id: 'p20-shm-force', name: 'The restoring force', description: 'Use the restoring force of simple harmonic motion to find forces, accelerations and displacements.', outcomes: ['20-D1'], lessonId: L(1), calculator: true, gen: bank([either(restoringForce, fromBank(RESTORING_IDEAS, ['The restoring force is proportional to the displacement and points towards the equilibrium position.'])), maxAcceleration, displacementForAccel], ['$F = -kx$: the size is $kx$ and the direction is towards equilibrium']) }),
  skill({ id: 'p20-spring-period', name: 'The period of a mass on a spring', description: 'Find the period and frequency of a mass on a spring, and the spring constant or the mass from a measured period.', outcomes: ['20-D1'], lessonId: L(2), calculator: true, gen: bank([springPeriod, springFrequency, either(springConstantFromTiming, massFromPeriod)], ['$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$, with the mass in kilograms']) }),
  skill({ id: 'p20-spring-energy', name: 'Energy in simple harmonic motion', description: 'Find the total energy of a mass on a spring, its greatest speed and its speed at a given displacement.', outcomes: ['20-D1'], lessonId: L(2), calculator: true, gen: bank([shmEnergy, maxSpeed, speedAtDisplacement], ['Total energy $= \\dfrac{1}{2}kA^2 = \\dfrac{1}{2}mv^2 + \\dfrac{1}{2}kx^2$']) }),
  skill({ id: 'p20-pendulum-period', name: 'The period of a pendulum', description: 'Find the period of a simple pendulum, the length that gives a stated period, and how the period changes with length and gravity.', outcomes: ['20-D1'], lessonId: L(3), calculator: true, gen: bank([either(pendulumPeriod, fromBank(PENDULUM_RATIOS, ['The period of a pendulum is proportional to the square root of its length, and does not depend on the mass.'])), pendulumLength, pendulumElsewhere], ['$T = 2\\pi\\sqrt{\\dfrac{L}{g}}$']) }),
  skill({ id: 'p20-pendulum-g', name: 'Measuring g with a pendulum', description: 'Explain what the period of a pendulum depends on, and find the acceleration due to gravity from its length and period.', outcomes: ['20-D1'], lessonId: L(3), calculator: true, gen: bank([fromBank(PENDULUM_IDEAS, ['For small swings, the period of a pendulum depends only on its length and on $g$.']), gFromPeriod, gFromTiming], ['$g = \\dfrac{4\\pi^2 L}{T^2}$']) }),
];
