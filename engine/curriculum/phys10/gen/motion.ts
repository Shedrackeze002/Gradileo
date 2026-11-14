/**
 * Grade 10 Physics, Unit 1: Describing Motion (10-A1, 10-A2). Units and prefixes, scalars and
 * vectors, speed, displacement and velocity, acceleration, and distance-time and velocity-time
 * graphs. Every number a question needs is in the question; g is not used in this unit.
 */
import { fixedChoice, numPart, part, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, NAMES, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, SkillDef } from '../../../types.ts';

const L = (n: number) => `p10-1-${n}`;
/** Drops the rounding noise of a product or quotient of decimals. */
const clean = (x: number) => Math.round(x * 1e6) / 1e6;

// ---------------------------------------------------------------------------- 1.1 units, scalars and vectors

interface Conv { from: string; to: string; mul?: number; div?: number; values: number[]; how: string }

const SIMPLE: Conv[] = [
  { from: 'km', to: 'm', mul: 1000, values: [2, 3.5, 0.4, 12, 7.25], how: '1 km = 1000 m, so multiply by 1000.' },
  { from: 'm', to: 'km', div: 1000, values: [3000, 4500, 800, 12000, 250], how: '1000 m = 1 km, so divide by 1000.' },
  { from: 'kg', to: 'g', mul: 1000, values: [3, 0.5, 1.2, 25, 0.75], how: '1 kg = 1000 g, so multiply by 1000.' },
  { from: 'g', to: 'kg', div: 1000, values: [2000, 500, 1250, 80, 6400], how: '1000 g = 1 kg, so divide by 1000.' },
  { from: 'min', to: 's', mul: 60, values: [2, 5, 1.5, 10, 12], how: '1 min = 60 s, so multiply by 60.' },
  { from: 'h', to: 'min', mul: 60, values: [2, 0.5, 1.5, 3, 4], how: '1 h = 60 min, so multiply by 60.' },
  { from: 'cm', to: 'm', div: 100, values: [250, 80, 1500, 45, 120], how: '100 cm = 1 m, so divide by 100.' },
  { from: 'm', to: 'cm', mul: 100, values: [3, 0.6, 1.25, 12, 0.05], how: '1 m = 100 cm, so multiply by 100.' },
];

const HARDER: Conv[] = [
  { from: 'h', to: 's', mul: 3600, values: [1, 2, 0.5, 1.5, 0.25], how: '1 h = 60 min and 1 min = 60 s, so 1 h = 3600 s. Multiply by 3600.' },
  { from: 'ms', to: 's', div: 1000, values: [500, 2000, 250, 1500, 40], how: '"Milli" means one thousandth: 1000 ms = 1 s, so divide by 1000.' },
  { from: 'mm', to: 'm', div: 1000, values: [3000, 450, 1200, 75, 20], how: '1000 mm = 1 m, so divide by 1000.' },
  { from: 'km/h', to: 'm/s', div: 3.6, values: [18, 36, 54, 72, 90, 108], how: '1 km/h is 1000 m in 3600 s, so divide by 3.6.' },
  { from: 'm/s', to: 'km/h', mul: 3.6, values: [5, 10, 15, 20, 25, 30], how: '1 m/s is 3.6 km/h, so multiply by 3.6.' },
];

function convert(rng: Rng, table: Conv[]): GenOutput {
  const c = rng.pick(table);
  const v = rng.pick(c.values);
  const out = clean(c.mul ? v * c.mul : v / c.div!);
  return {
    prompt: `Convert ${q(v, c.from)} to ${c.to}.`,
    parts: [numPart(out, { suffix: c.to })],
    hints: [c.how],
    solution: [c.how, `${q(v, c.from)} $= ${num(out, 6)}\\ \\text{${c.to}}$`],
  };
}

function mixedTime(rng: Rng): GenOutput {
  const h = rng.int(1, 3);
  const m = rng.pick([10, 15, 20, 30, 45]);
  const s = h * 3600 + m * 60;
  return {
    prompt: `A journey lasts ${h} h ${m} min. How long is that in seconds?`,
    parts: [numPart(s, { suffix: 's' })],
    hints: ['Change the hours to seconds and the minutes to seconds, then add.', '1 h = 3600 s and 1 min = 60 s.'],
    solution: [`$${h} \\times 3600 = ${h * 3600}$ s and $${m} \\times 60 = ${m * 60}$ s.`, `$${h * 3600} + ${m * 60} = ${s}$ s`],
  };
}

const SI_UNITS: Q[] = [
  { q: 'What is the SI unit of length?', a: 'The metre (m)', w: ['The kilometre (km)', 'The centimetre (cm)', 'The mile'], why: 'The metre is the SI base unit of length. Kilometres and centimetres are metres with a prefix.' },
  { q: 'What is the SI unit of mass?', a: 'The kilogram (kg)', w: ['The gram (g)', 'The newton (N)', 'The litre (L)'], why: 'The kilogram is the SI base unit of mass. The newton is the unit of force.' },
  { q: 'What is the SI unit of time?', a: 'The second (s)', w: ['The minute (min)', 'The hour (h)', 'The day'], why: 'The second is the SI base unit of time.' },
  { q: 'Speed is a distance divided by a time. Which is the SI unit of speed?', a: 'Metres per second (m/s)', w: ['Kilometres per hour (km/h)', 'Metres times seconds (m s)', 'Seconds per metre (s/m)'], why: 'Metres divided by seconds gives metres per second.' },
  { q: 'What does the prefix "kilo" mean?', a: 'One thousand times', w: ['One thousandth of', 'One hundred times', 'One million times'], why: 'A kilometre is 1000 metres and a kilogram is 1000 grams.' },
  { q: 'What does the prefix "milli" mean?', a: 'One thousandth of', w: ['One thousand times', 'One hundredth of', 'One millionth of'], why: 'A millimetre is one thousandth of a metre.' },
];

const SCALARS = ['distance', 'speed', 'mass', 'time', 'temperature', 'energy', 'volume'];
const VECTORS = ['displacement', 'velocity', 'acceleration', 'force', 'weight'];
const KIND = ['Scalar', 'Vector'];

const KIND_EASY: Q[] = [
  ...SCALARS.map((x) => ({ q: `Is ${x} a scalar or a vector?`, a: 'Scalar', w: ['Vector'], order: KIND, why: `${x[0].toUpperCase()}${x.slice(1)} has a size only, with no direction, so it is a scalar.` })),
  ...VECTORS.map((x) => ({ q: `Is ${x} a scalar or a vector?`, a: 'Vector', w: ['Scalar'], order: KIND, why: `${x[0].toUpperCase()}${x.slice(1)} has a size and a direction, so it is a vector.` })),
];

const KIND_MEDIUM: Q[] = [
  { q: '"The car moves at 20 m/s to the north." Is this measurement a scalar or a vector?', a: 'Vector', w: ['Scalar'], order: KIND, why: 'It gives a size (20 m/s) and a direction (north): it is a velocity, a vector.' },
  { q: '"The bag has a mass of 5 kg." Is this measurement a scalar or a vector?', a: 'Scalar', w: ['Vector'], order: KIND, why: 'Mass has a size only. No direction can be given for it.' },
  { q: '"The race took 12 s." Is this measurement a scalar or a vector?', a: 'Scalar', w: ['Vector'], order: KIND, why: 'A time has a size only.' },
  { q: '"A force of 30 N pushes the box to the left." Is this measurement a scalar or a vector?', a: 'Vector', w: ['Scalar'], order: KIND, why: 'A force has a size (30 N) and a direction (left).' },
  { q: '"The runner ended 50 m east of the start." Is this measurement a scalar or a vector?', a: 'Vector', w: ['Scalar'], order: KIND, why: 'A size with a direction from the start is a displacement, a vector.' },
  { q: '"The runner covered 400 m." Is this measurement a scalar or a vector?', a: 'Scalar', w: ['Vector'], order: KIND, why: 'The ground covered, with no direction, is a distance, a scalar.' },
  { q: 'What must a vector have that a scalar does not?', a: 'A direction', w: ['A unit', 'A size', 'A decimal point'], why: 'Both have a size and a unit. Only a vector has a direction as well.' },
  { q: 'Which pair is a scalar and the vector that matches it?', a: 'Speed and velocity', w: ['Mass and time', 'Force and weight', 'Distance and speed'], why: 'Velocity is speed in a stated direction. Distance and displacement are the other such pair.' },
];

const KIND_HARD: Select[] = [
  { q: 'Which of these are vectors?', opts: [['Velocity', true], ['Force', true], ['Displacement', true], ['Acceleration', true], ['Speed', false], ['Mass', false], ['Time', false], ['Distance', false]], why: 'A vector has a size and a direction.' },
  { q: 'Which of these are scalars?', opts: [['Speed', true], ['Distance', true], ['Mass', true], ['Temperature', true], ['Velocity', false], ['Weight', false], ['Displacement', false], ['Force', false]], why: 'A scalar has a size only.' },
  { q: 'Which statements are true?', opts: [['A vector has a size and a direction.', true], ['Two cars can have the same speed but different velocities.', true], ['Distance can never be less than the size of the displacement.', true], ['A scalar has a direction but no size.', false], ['Speed and velocity always mean the same thing.', false], ['Mass is a vector because it has a unit.', false]], why: 'Vectors carry a direction. Cars moving at the same speed in different directions have different velocities.' },
];

// ---------------------------------------------------------------------------- 1.2 speed

const MOVERS: Array<{ who: string; verb: string; v: [number, number] }> = [
  { who: 'A cyclist', verb: 'rides', v: [4, 12] },
  { who: 'A runner', verb: 'runs', v: [3, 8] },
  { who: 'A train', verb: 'travels', v: [20, 45] },
  { who: 'A car', verb: 'travels', v: [10, 30] },
  { who: 'A swimmer', verb: 'swims', v: [1, 2] },
  { who: 'A delivery drone', verb: 'flies', v: [8, 16] },
];

const SPEED_HINT = 'speed = distance ÷ time';

function speedOf(rng: Rng): GenOutput {
  const m = rng.pick(MOVERS);
  const v = rng.int(m.v[0], m.v[1]);
  const t = rng.pick([5, 8, 10, 12, 20, 25, 40]);
  return {
    prompt: `${m.who} ${m.verb} ${q(v * t, 'm')} in ${q(t, 's')} at a steady speed. What is the speed?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: [SPEED_HINT],
    solution: [`$v = \\dfrac{d}{t} = \\dfrac{${v * t}}{${t}} = ${v}$ m/s`],
  };
}

function distanceOrTime(rng: Rng): GenOutput {
  const m = rng.pick(MOVERS);
  const v = rng.int(m.v[0], m.v[1]);
  const t = rng.pick([6, 15, 20, 30, 45, 60]);
  if (rng.chance(0.5)) {
    return {
      prompt: `${m.who} ${m.verb} at a steady ${q(v, 'm/s')} for ${q(t, 's')}. What distance is covered?`,
      parts: [numPart(v * t, { suffix: 'm' })],
      hints: ['distance = speed × time'],
      solution: [`$d = v \\times t = ${v} \\times ${t} = ${v * t}$ m`],
    };
  }
  return {
    prompt: `${m.who} ${m.verb} ${q(v * t, 'm')} at a steady ${q(v, 'm/s')}. How long does this take?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = distance ÷ speed'],
    solution: [`$t = \\dfrac{d}{v} = \\dfrac{${v * t}}{${v}} = ${t}$ s`],
  };
}

function speedWithUnits(rng: Rng): GenOutput {
  const v = rng.pick([5, 10, 15, 20, 25]);
  const mins = rng.pick([5, 10, 15, 20, 30]);
  const km = clean((v * mins * 60) / 1000);
  const what = rng.pick(['A bus', 'A tram', 'A ferry', 'A cyclist']);
  return {
    prompt: `${what} travels ${q(km, 'km')} in ${q(mins, 'min')} at a steady speed. What is the speed in metres per second?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['Change the distance to metres and the time to seconds first.', SPEED_HINT],
    solution: [`${q(km, 'km')} $= ${num(km * 1000, 0)}$ m and ${q(mins, 'min')} $= ${mins * 60}$ s.`, `$v = \\dfrac{${num(km * 1000, 0)}}{${mins * 60}} = ${v}$ m/s`],
  };
}

function twoLegs(rng: Rng, stop: boolean): GenOutput {
  const name = rng.pick(NAMES);
  const t1 = rng.pick([10, 20, 30, 40]);
  const t2 = rng.pick([10, 20, 30, 50]);
  const rest = stop ? rng.pick([10, 20, 30]) : 0;
  const total = t1 + t2 + rest;
  const v = rng.int(2, 6);
  const d = v * total;
  const d1 = Math.round((d * rng.pick([0.3, 0.4, 0.5, 0.6])) / 10) * 10;
  const d2 = d - d1;
  const middle = stop ? `, rests for ${q(rest, 's')},` : '';
  return {
    prompt: `${name} jogs ${q(d1, 'm')} in ${q(t1, 's')}${middle} then jogs another ${q(d2, 'm')} in ${q(t2, 's')}. What is ${name}’s average speed for the whole journey?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['average speed = total distance ÷ total time', ...(stop ? ['The rest is part of the total time.'] : [])],
    solution: [`Total distance $= ${d1} + ${d2} = ${d}$ m.`, `Total time $= ${stop ? `${t1} + ${rest} + ${t2}` : `${t1} + ${t2}`} = ${total}$ s.`, `Average speed $= \\dfrac{${d}}{${total}} = ${v}$ m/s`],
  };
}

function legsBySpeed(rng: Rng): GenOutput {
  for (;;) {
    const v1 = rng.int(4, 20);
    const v2 = rng.int(4, 20);
    const t1 = rng.pick([10, 20, 30, 40, 60]);
    const t2 = rng.pick([10, 20, 30, 40, 60]);
    if (v1 === v2 || t1 === t2 || (v1 * t1 + v2 * t2) % (t1 + t2) !== 0) continue;
    const d = v1 * t1 + v2 * t2;
    const avg = d / (t1 + t2);
    return {
      prompt: `A car travels at ${q(v1, 'm/s')} for ${q(t1, 's')}, then at ${q(v2, 'm/s')} for ${q(t2, 's')}. What is its average speed for the whole journey?`,
      parts: [numPart(avg, { suffix: 'm/s' })],
      hints: ['Find the distance of each part first: distance = speed × time.', 'average speed = total distance ÷ total time. It is not the mean of the two speeds unless the times are equal.'],
      solution: [`Distances: $${v1} \\times ${t1} = ${v1 * t1}$ m and $${v2} \\times ${t2} = ${v2 * t2}$ m, so ${d} m in all.`, `Total time $= ${t1 + t2}$ s.`, `Average speed $= \\dfrac{${d}}{${t1 + t2}} = ${avg}$ m/s`],
    };
  }
}

// ---------------------------------------------------------------------------- 1.3 displacement and velocity

const AXES: Array<[string, string]> = [['east', 'west'], ['north', 'south'], ['right', 'left']];

function legs(rng: Rng, n: 2 | 3) {
  for (;;) {
    const axis = rng.pick(AXES);
    const steps = Array.from({ length: n }, (_, i) => ({ d: rng.int(2, 15) * (n === 2 ? 5 : 2), fwd: i === 0 ? true : rng.chance(0.4) }));
    if (steps.every((s) => s.fwd)) steps[n - 1].fwd = false;
    const net = steps.reduce((s, x) => s + (x.fwd ? x.d : -x.d), 0);
    if (net === 0) continue;
    const text = steps.map((s, i) => `${i === 0 ? '' : i === n - 1 ? ' and then ' : ', then '}${q(s.d, 'm')} ${s.fwd ? axis[0] : axis[1]}`).join('');
    return { axis, steps, net, text, total: steps.reduce((s, x) => s + x.d, 0) };
  }
}

function distanceWalked(rng: Rng): GenOutput {
  const w = legs(rng, 2);
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} walks ${w.text}. What distance does ${name} walk in all?`,
    parts: [numPart(w.total, { suffix: 'm' })],
    hints: ['Distance is all the ground covered, whatever the direction.'],
    solution: [`Add every part of the walk: $${w.steps.map((s) => s.d).join(' + ')} = ${w.total}$ m.`],
  };
}

function displacementOf(rng: Rng, n: 2 | 3): GenOutput {
  const w = legs(rng, n);
  const name = rng.pick(NAMES);
  const sum = w.steps.map((s, i) => `${i === 0 ? '' : s.fwd ? '+ ' : '- '}${s.d}`).join(' ');
  return {
    prompt: `${name} walks ${w.text}. What is ${name}’s displacement from the start?`,
    parts: [numPart(Math.abs(w.net), { label: 'Size', suffix: 'm' }), part(fixedChoice([w.axis[0], w.axis[1]], w.net > 0 ? 0 : 1), { label: 'Direction' })],
    hints: ['Displacement is the straight-line change in position: how far from the start, and which way.', `Count ${w.axis[0]} as positive and ${w.axis[1]} as negative, then add.`],
    solution: [`Taking ${w.axis[0]} as positive: $${sum} = ${w.net}$ m.`, `${name} ends ${Math.abs(w.net)} m ${w.net > 0 ? w.axis[0] : w.axis[1]} of the start, after walking ${w.total} m.`],
  };
}

const LAPS: Q[] = [
  { q: 'A runner completes exactly one lap of a 400 m track and stops at the start line. What is the runner’s displacement?', a: '0 m', w: ['400 m', '200 m', '800 m'], why: 'The runner ends where they started, so the change in position is zero, although the distance run is 400 m.' },
  { q: 'A swimmer swims one 50 m length of a pool and then swims back to where they started. What are the distance and the size of the displacement?', a: 'Distance 100 m, displacement 0 m', w: ['Distance 0 m, displacement 100 m', 'Distance 100 m, displacement 100 m', 'Distance 50 m, displacement 50 m'], why: 'The swimmer covers 100 m of water but finishes at the start.' },
  { q: 'When is the distance travelled equal to the size of the displacement?', a: 'When the motion is in a straight line without turning back', w: ['Always', 'Never', 'Only when the object returns to the start'], why: 'Any turn or return makes the path longer than the straight line from start to finish.' },
];

function velocitySigned(rng: Rng, back: boolean): GenOutput {
  const axis = rng.pick(AXES);
  const v = rng.int(2, 12);
  const t = rng.pick([4, 5, 8, 10, 20]);
  const what = rng.pick(['A cart', 'A robot', 'A cyclist', 'A toy train']);
  return {
    prompt: `Take ${axis[0]} as the positive direction. ${what} moves ${q(v * t, 'm')} ${back ? axis[1] : axis[0]} in ${q(t, 's')} at a steady rate. What is the velocity? Include a minus sign if it is negative.`,
    parts: [numPart(back ? -v : v, { suffix: 'm/s' })],
    hints: ['velocity = displacement ÷ time', `A displacement to the ${axis[1]} is negative here.`],
    solution: [`The displacement is $${back ? '-' : ''}${v * t}$ m.`, `$v = \\dfrac{${back ? '-' : ''}${v * t}}{${t}} = ${back ? '-' : ''}${v}$ m/s`],
  };
}

function thereAndBack(rng: Rng): GenOutput {
  for (;;) {
    const axis = rng.pick(AXES);
    const T = rng.pick([10, 20, 40, 50]);
    const S = rng.int(3, 9);
    const V = rng.int(1, S - 1);
    if ((S + V) % 2) continue;
    const a = ((S + V) * T) / 2;
    const b = ((S - V) * T) / 2;
    const t1 = (T * rng.pick([2, 3])) / 5;
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} cycles ${q(a, 'm')} ${axis[0]} in ${q(t1, 's')}, then turns and cycles ${q(b, 'm')} ${axis[1]} in ${q(T - t1, 's')}. Take ${axis[0]} as positive. Find the average speed and the average velocity for the whole ride.`,
      parts: [numPart(S, { label: 'Average speed', suffix: 'm/s' }), numPart(V, { label: 'Average velocity', suffix: 'm/s' })],
      hints: ['average speed = total distance ÷ total time', 'average velocity = displacement ÷ total time'],
      solution: [`Distance $= ${a} + ${b} = ${a + b}$ m, so the average speed is $\\dfrac{${a + b}}{${T}} = ${S}$ m/s.`, `Displacement $= ${a} - ${b} = ${a - b}$ m ${axis[0]}, so the average velocity is $\\dfrac{${a - b}}{${T}} = ${V}$ m/s ${axis[0]}.`],
    };
  }
}

// ---------------------------------------------------------------------------- 1.4 acceleration

const ACC = 'm/s²';
/** An acceleration as maths: qa(3) is 3 m/s squared. */
const qa = (v: number) => `$${v}\\ \\text{m/s}^2$`;

function accelOf(rng: Rng, kind: 'rest' | 'faster' | 'slower'): GenOutput {
  const t = rng.pick([2, 4, 5, 8, 10]);
  const a = rng.int(1, t > 5 ? 4 : 6);
  const u = kind === 'rest' ? 0 : kind === 'faster' ? rng.int(2, 12) : a * t + rng.int(0, 8);
  const v = kind === 'slower' ? u - a * t : u + a * t;
  const acc = kind === 'slower' ? -a : a;
  // Whatever moves must be able to reach the greatest speed in the question.
  const top = Math.max(u, v);
  const what = rng.pick(([['A car', 40], ['A motorbike', 50], ['A train', 60], ['A cyclist', 14], ['A sprinter', 10]] as Array<[string, number]>).filter((m) => m[1] >= top))[0];
  const start = kind === 'rest' ? 'starts from rest and reaches' : kind === 'faster' ? `speeds up from ${q(u, 'm/s')} to` : `slows down from ${q(u, 'm/s')} to`;
  return {
    prompt: `${what} ${start} ${q(v, 'm/s')} in ${q(t, 's')}, moving in a straight line. What is the acceleration?${kind === 'slower' ? ' Include a minus sign if it is negative.' : ''}`,
    parts: [numPart(acc, { suffix: ACC })],
    hints: ['acceleration = change in velocity ÷ time', 'change in velocity = final velocity − starting velocity'],
    solution: [`Change in velocity $= ${v} - ${u} = ${v - u}$ m/s.`, `$a = \\dfrac{${v - u}}{${t}} = ${acc}\\ \\text{m/s}^2$${kind === 'slower' ? ' (negative: it is slowing down)' : ''}`],
  };
}

function finalVelocity(rng: Rng): GenOutput {
  const a = rng.int(1, 5);
  const t = rng.pick([3, 4, 5, 6, 10]);
  const u = rng.pick([0, 0, 2, 4, 5, 8]);
  const what = rng.pick(['A car', 'A skier', 'A rocket sled', 'A cyclist']);
  return {
    prompt: `${what} ${u === 0 ? 'starts from rest' : `is moving at ${q(u, 'm/s')}`} and accelerates at ${qa(a)} for ${q(t, 's')}. What is the final velocity?`,
    parts: [numPart(u + a * t, { suffix: 'm/s' })],
    hints: ['The velocity changes by acceleration × time.', 'final velocity = starting velocity + acceleration × time'],
    solution: [`Change in velocity $= ${a} \\times ${t} = ${a * t}$ m/s.`, `$v = u + at = ${u} + ${a * t} = ${u + a * t}$ m/s`],
  };
}

function timeToChange(rng: Rng): GenOutput {
  const a = rng.int(2, 5);
  const t = rng.pick([3, 4, 5, 6, 8]);
  const u = rng.pick([0, 2, 4, 6, 10]);
  const v = u + a * t;
  return {
    prompt: `A car accelerates steadily at ${qa(a)} from ${q(u, 'm/s')} to ${q(v, 'm/s')}. How long does this take?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = change in velocity ÷ acceleration'],
    solution: [`Change in velocity $= ${v} - ${u} = ${a * t}$ m/s.`, `$t = \\dfrac{${a * t}}{${a}} = ${t}$ s`],
  };
}

function braking(rng: Rng): GenOutput {
  const a = rng.int(2, 6);
  const t = rng.pick([2, 3, 4, 5, 6]);
  const what = rng.pick(['A car', 'A bus', 'A train', 'A cyclist']);
  const kind = rng.pick(['stop', 'after', 'start'] as const);
  if (kind === 'stop') {
    const u = a * t;
    return {
      prompt: `${what} moving at ${q(u, 'm/s')} brakes with an acceleration of ${qa(-a)}. How long does stopping take?`,
      parts: [numPart(t, { suffix: 's' })],
      hints: ['It stops when its velocity is 0.', 'time = change in velocity ÷ acceleration'],
      solution: [`Change in velocity $= 0 - ${u} = -${u}$ m/s.`, `$t = \\dfrac{-${u}}{-${a}} = ${t}$ s`],
    };
  }
  const left = rng.int(1, 6);
  const u = a * t + left;
  if (kind === 'after') {
    return {
      prompt: `${what} moving at ${q(u, 'm/s')} brakes with an acceleration of ${qa(-a)} for ${q(t, 's')}. What is the velocity then?`,
      parts: [numPart(left, { suffix: 'm/s' })],
      hints: ['final velocity = starting velocity + acceleration × time', 'The acceleration is negative, so the velocity falls.'],
      solution: [`$v = u + at = ${u} + (-${a})(${t}) = ${u} - ${a * t} = ${left}$ m/s`],
    };
  }
  return {
    prompt: `${what} brakes with an acceleration of ${qa(-a)} for ${q(t, 's')} and is then moving at ${q(left, 'm/s')}. What was the velocity before the brakes were applied?`,
    parts: [numPart(u, { suffix: 'm/s' })],
    hints: ['final velocity = starting velocity + acceleration × time', 'Rearrange: starting velocity = final velocity − acceleration × time.'],
    solution: [`$u = v - at = ${left} - (-${a})(${t}) = ${left} + ${a * t} = ${u}$ m/s`],
  };
}

const ACCEL_IDEAS: Q[] = [
  { q: 'A car has an acceleration of 3 m/s². What does this mean?', a: 'Its velocity increases by 3 m/s every second', w: ['It travels 3 m every second', 'It reaches 3 m/s and then stays there', 'It travels 3 m in the first second only'], why: 'Acceleration is the change in velocity each second.' },
  { q: 'A train moves at a steady 30 m/s in a straight line. What is its acceleration?', a: '0 m/s²', w: ['30 m/s²', '3 m/s²', 'It cannot be known'], why: 'Its velocity is not changing, so its acceleration is zero, however fast it is going.' },
  { q: 'A cyclist moving forwards has a negative acceleration. What is happening?', a: 'The cyclist is slowing down', w: ['The cyclist is moving backwards', 'The cyclist is speeding up', 'The cyclist has stopped'], why: 'A negative acceleration means the velocity is getting smaller each second.' },
];

// ---------------------------------------------------------------------------- 1.5 motion graphs

/** A ride in three parts: steady speed, a rest, steady speed again. */
function trip(rng: Rng) {
  const t1 = rng.pick([4, 8]);
  const rest = rng.pick([2, 4]);
  const t3 = rng.pick([2, 4]);
  const v1 = rng.pick([2.5, 5, 7.5]);
  const v3 = rng.pick([5, 10, 15].filter((v) => v !== v1));
  const d1 = v1 * t1;
  const d3 = v3 * t3;
  const T = t1 + rest + t3;
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: T, yMin: 0, yMax: d1 + d3 + 10, xStep: 2, yStep: 10, xLabel: 'Time (s)', yLabel: 'Distance (m)' },
    polylines: [{ points: [[0, 0], [t1, d1], [t1 + rest, d1], [T, d1 + d3]] }],
    caption: 'Distance-time graph of a cyclist',
  };
  const spans = [`0 s to ${t1} s`, `${t1} s to ${t1 + rest} s`, `${t1 + rest} s to ${T} s`];
  return { t1, rest, t3, v1, v3, d1, d3, T, figure, spans };
}

const DT_INTRO = 'The graph shows the distance a cyclist has travelled along a straight path.';

function dtRead(rng: Rng): GenOutput {
  const g = trip(rng);
  const kind = rng.pick(['read', 'rest', 'describe'] as const);
  if (kind === 'read') {
    const end = rng.chance(0.5);
    return {
      figure: g.figure,
      prompt: `${DT_INTRO} How far has the cyclist travelled after ${q(end ? g.T : g.t1, 's')}?`,
      parts: [numPart(end ? g.d1 + g.d3 : g.d1, { suffix: 'm' })],
      hints: ['Find the time on the bottom axis, go up to the line, then read across to the distance.'],
      solution: [`At ${end ? g.T : g.t1} s the line is at ${end ? g.d1 + g.d3 : g.d1} m.`],
    };
  }
  if (kind === 'rest') {
    return {
      figure: g.figure,
      prompt: `${DT_INTRO} When is the cyclist not moving?`,
      parts: [part(fixedChoice(g.spans.map((s) => `From ${s}`), 1))],
      hints: ['A flat line means the distance is not changing.'],
      solution: [`The line is flat from ${g.spans[1]}: the distance stays at ${g.d1} m, so the cyclist is at rest.`, `Answer: From ${g.spans[1]}`],
    };
  }
  const i = rng.int(0, 2);
  const options = ['Moving at a steady speed', 'Standing still', 'Speeding up', 'Slowing down'];
  return {
    figure: g.figure,
    prompt: `${DT_INTRO} What is the cyclist doing from ${g.spans[i]}?`,
    parts: [part(fixedChoice(options, i === 1 ? 1 : 0))],
    hints: ['On a distance-time graph, a straight sloping line is a steady speed and a flat line is no motion.'],
    solution: [i === 1 ? 'The line is flat, so the distance is not changing: the cyclist is standing still.' : 'The line is straight and sloping, so the distance grows by the same amount every second: a steady speed.', `Answer: ${options[i === 1 ? 1 : 0]}`],
  };
}

function dtSpeed(rng: Rng): GenOutput {
  const g = trip(rng);
  const first = rng.chance(0.5);
  const [v, d, t, span] = first ? [g.v1, g.d1, g.t1, g.spans[0]] : [g.v3, g.d3, g.t3, g.spans[2]];
  return {
    figure: g.figure,
    prompt: `${DT_INTRO} What is the cyclist’s speed from ${span}?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['The speed is the slope of a distance-time graph: the distance gained ÷ the time taken.'],
    solution: [`In this part the distance rises by ${d} m in ${t} s.`, `Speed $= \\dfrac{${d}}{${t}} = ${v}$ m/s`],
  };
}

function dtWhole(rng: Rng): GenOutput {
  const g = trip(rng);
  if (rng.chance(0.4)) {
    const fastFirst = g.v1 > g.v3;
    return {
      figure: g.figure,
      prompt: `${DT_INTRO} In which part of the ride is the cyclist moving fastest?`,
      parts: [part(fixedChoice(g.spans.map((s) => `From ${s}`), fastFirst ? 0 : 2))],
      hints: ['The steeper the line, the faster the motion.'],
      solution: [`The speeds are ${g.v1} m/s, 0 m/s and ${g.v3} m/s. The steepest part is from ${g.spans[fastFirst ? 0 : 2]}.`, `Answer: From ${g.spans[fastFirst ? 0 : 2]}`],
    };
  }
  const total = g.d1 + g.d3;
  const avg = Math.round((total / g.T) * 10) / 10;
  return {
    figure: g.figure,
    prompt: `${DT_INTRO} What is the cyclist’s average speed for the whole ride? Give your answer to 1 decimal place.`,
    parts: [numPart(avg, { decimals: 1, suffix: 'm/s' })],
    hints: ['average speed = total distance ÷ total time', 'The rest counts as part of the time.'],
    solution: [`The ride covers ${total} m in ${g.T} s.`, `Average speed $= \\dfrac{${total}}{${g.T}} ${avg * g.T === total ? '=' : '\\approx'} ${avg}$ m/s`],
  };
}

/** A run in three parts: speeding up from rest, a steady velocity, slowing down to rest. */
function run(rng: Rng) {
  for (;;) {
    const a1 = rng.int(1, 3);
    const t1 = rng.pick([2, 4]);
    const V = a1 * t1;
    const t2 = rng.pick([2, 4, 6]);
    const t3 = rng.pick([2, 4].filter((t) => V % t === 0));
    if (!t3) continue;
    const T = t1 + t2 + t3;
    const figure: Figure = {
      type: 'plane',
      grid: { xMin: 0, xMax: T, yMin: 0, yMax: V + 2, xStep: 2, yStep: 2, xLabel: 'Time (s)', yLabel: 'Velocity (m/s)' },
      polylines: [{ points: [[0, 0], [t1, V], [t1 + t2, V], [T, 0]] }],
      caption: 'Velocity-time graph of a tram',
    };
    const spans = [`0 s to ${t1} s`, `${t1} s to ${t1 + t2} s`, `${t1 + t2} s to ${T} s`];
    return { a1, t1, V, t2, t3, T, figure, spans };
  }
}

const VT_INTRO = 'The graph shows the velocity of a tram moving along a straight track.';

function vtRead(rng: Rng): GenOutput {
  const g = run(rng);
  if (rng.chance(0.4)) {
    return {
      figure: g.figure,
      prompt: `${VT_INTRO} What is the tram’s greatest velocity?`,
      parts: [numPart(g.V, { suffix: 'm/s' })],
      hints: ['Read the height of the highest part of the line on the velocity axis.'],
      solution: [`The line is highest from ${g.spans[1]}, at ${g.V} m/s.`],
    };
  }
  const i = rng.int(0, 2);
  const options = ['Speeding up', 'Moving at a steady velocity', 'Slowing down', 'Standing still'];
  const why = ['The line slopes up, so the velocity is rising: the tram is speeding up.', 'The line is flat but above zero, so the velocity is steady and the tram is still moving.', 'The line slopes down, so the velocity is falling: the tram is slowing down.'];
  return {
    figure: g.figure,
    prompt: `${VT_INTRO} What is the tram doing from ${g.spans[i]}?`,
    parts: [part(fixedChoice(options, i))],
    hints: ['On a velocity-time graph, a flat line is a steady velocity, not rest. A sloping line is a changing velocity.'],
    solution: [why[i], `Answer: ${options[i]}`],
  };
}

function vtSlope(rng: Rng): GenOutput {
  const g = run(rng);
  const first = rng.chance(0.5);
  const a = first ? g.a1 : -g.V / g.t3;
  return {
    figure: g.figure,
    prompt: `${VT_INTRO} What is the tram’s acceleration from ${g.spans[first ? 0 : 2]}?${first ? '' : ' Include a minus sign if it is negative.'}`,
    parts: [numPart(a, { suffix: ACC })],
    hints: ['The acceleration is the slope of a velocity-time graph: the change in velocity ÷ the time taken.'],
    solution: [first ? `The velocity rises from 0 to ${g.V} m/s in ${g.t1} s.` : `The velocity falls from ${g.V} m/s to 0 in ${g.t3} s.`, `$a = \\dfrac{${first ? g.V : -g.V}}{${first ? g.t1 : g.t3}} = ${a}\\ \\text{m/s}^2$`],
  };
}

function vtArea(rng: Rng): GenOutput {
  const g = run(rng);
  const areas = [0.5 * g.V * g.t1, g.V * g.t2, 0.5 * g.V * g.t3];
  const i = rng.pick([0, 1, 3]);
  if (i === 3) {
    const total = areas[0] + areas[1] + areas[2];
    return {
      figure: g.figure,
      prompt: `${VT_INTRO} How far does the tram travel in the whole ${q(g.T, 's')}?`,
      parts: [numPart(total, { suffix: 'm' })],
      hints: ['The distance travelled is the area under a velocity-time graph.', 'Split the area into a triangle, a rectangle and a triangle.'],
      solution: [`Triangle: $\\tfrac12 \\times ${g.t1} \\times ${g.V} = ${areas[0]}$ m. Rectangle: $${g.t2} \\times ${g.V} = ${areas[1]}$ m. Triangle: $\\tfrac12 \\times ${g.t3} \\times ${g.V} = ${areas[2]}$ m.`, `Total $= ${areas[0]} + ${areas[1]} + ${areas[2]} = ${total}$ m`],
    };
  }
  return {
    figure: g.figure,
    prompt: `${VT_INTRO} How far does the tram travel from ${g.spans[i]}?`,
    parts: [numPart(areas[i], { suffix: 'm' })],
    hints: ['The distance travelled is the area under a velocity-time graph.', i === 0 ? 'The area under this part is a triangle: ½ × base × height.' : 'The area under this part is a rectangle: base × height.'],
    solution: [i === 0 ? `Area of the triangle $= \\tfrac12 \\times ${g.t1} \\times ${g.V} = ${areas[0]}$ m` : `Area of the rectangle $= ${g.t2} \\times ${g.V} = ${areas[1]}$ m`],
  };
}

const DT_IDEAS: Q[] = [
  { q: 'On a distance-time graph, what does a flat (horizontal) line show?', a: 'The object is not moving', w: ['The object is moving at a steady speed', 'The object is speeding up', 'The object is going back to the start'], why: 'A flat line means the distance is not changing as time passes.' },
  { q: 'On a distance-time graph, what does a steeper straight line show?', a: 'A greater speed', w: ['A smaller speed', 'A greater distance from the start only', 'A greater acceleration'], why: 'The slope is the distance gained each second, which is the speed.' },
  { q: 'On a distance-time graph, the line curves upwards, getting steeper. What is the object doing?', a: 'Speeding up', w: ['Slowing down', 'Moving at a steady speed', 'Standing still'], why: 'A growing slope means the speed is growing.' },
];

const VT_IDEAS: Q[] = [
  { q: 'On a velocity-time graph, what does a flat line above zero show?', a: 'A steady velocity', w: ['The object is at rest', 'A steady acceleration', 'The object is slowing down'], why: 'The velocity is not changing, but it is not zero, so the object is still moving.' },
  { q: 'On a velocity-time graph, what does the slope of the line give?', a: 'The acceleration', w: ['The speed', 'The distance travelled', 'The time taken'], why: 'The slope is the change in velocity each second.' },
  { q: 'On a velocity-time graph, what does the area under the line give?', a: 'The distance travelled', w: ['The acceleration', 'The average velocity', 'The time taken'], why: 'Velocity × time is a distance, and that product is the area under the line.' },
];

export const MOTION_SKILLS: SkillDef[] = [
  skill({ id: 'p10-units', name: 'Units and prefixes', description: 'Name SI units and convert between units of length, mass, time and speed.', outcomes: ['10-A1'], lessonId: L(1), gen: bank([(rng) => convert(rng, SIMPLE), either((rng) => convert(rng, HARDER), fromBank(SI_UNITS, ['SI units: the metre, the kilogram and the second.'])), either((rng) => convert(rng, HARDER), mixedTime)], ['Multiply to change to a smaller unit, and divide to change to a larger unit.']) }),
  skill({ id: 'p10-scalar-vector', name: 'Scalars and vectors', description: 'Tell a scalar, which has a size only, from a vector, which also has a direction.', outcomes: ['10-A1'], lessonId: L(1), format: 'mc', gen: bank([KIND_EASY, KIND_MEDIUM, KIND_HARD], ['A scalar has a size only. A vector has a size and a direction.']) }),
  skill({ id: 'p10-speed', name: 'Speed, distance and time', description: 'Use speed = distance ÷ time to find a speed, a distance or a time.', outcomes: ['10-A2'], lessonId: L(2), calculator: true, gen: bank([speedOf, distanceOrTime, speedWithUnits], [SPEED_HINT]) }),
  skill({ id: 'p10-average-speed', name: 'Average speed', description: 'Find the average speed of a journey in several parts from the total distance and the total time.', outcomes: ['10-A2'], lessonId: L(2), calculator: true, gen: bank([(rng) => twoLegs(rng, false), (rng) => twoLegs(rng, true), legsBySpeed], ['average speed = total distance ÷ total time']) }),
  skill({ id: 'p10-displacement', name: 'Distance and displacement', description: 'Find the distance travelled and the displacement, with its direction, for motion along a line.', outcomes: ['10-A2'], lessonId: L(3), gen: bank([distanceWalked, (rng) => displacementOf(rng, 2), either((rng) => displacementOf(rng, 3), fromBank(LAPS, ['Displacement is the change in position from start to finish.']))], ['Distance is the ground covered. Displacement is how far, and which way, you end from the start.']) }),
  skill({ id: 'p10-velocity', name: 'Velocity', description: 'Find a velocity with its sign, and tell average speed from average velocity.', outcomes: ['10-A2'], lessonId: L(3), calculator: true, gen: bank([(rng) => velocitySigned(rng, false), (rng) => velocitySigned(rng, true), thereAndBack], ['velocity = displacement ÷ time']) }),
  skill({ id: 'p10-acceleration', name: 'Acceleration', description: 'Find an acceleration from a change in velocity and the time it takes.', outcomes: ['10-A2'], lessonId: L(4), calculator: true, gen: bank([either((rng) => accelOf(rng, 'rest'), fromBank(ACCEL_IDEAS, ['Acceleration is the change in velocity each second.'])), (rng) => accelOf(rng, 'faster'), (rng) => accelOf(rng, 'slower')], ['acceleration = change in velocity ÷ time']) }),
  skill({ id: 'p10-accel-solve', name: 'Using acceleration', description: 'Use v = u + at to find a final velocity, a starting velocity or a time.', outcomes: ['10-A2'], lessonId: L(4), calculator: true, gen: bank([finalVelocity, timeToChange, braking], ['final velocity = starting velocity + acceleration × time']) }),
  skill({ id: 'p10-dt-graph', name: 'Distance-time graphs', description: 'Read a distance-time graph: describe the motion and find speeds from the slope.', outcomes: ['10-A2'], lessonId: L(5), gen: bank([either(dtRead, fromBank(DT_IDEAS, ['The slope of a distance-time graph is the speed.'])), dtSpeed, dtWhole], ['The slope of a distance-time graph is the speed.']) }),
  skill({ id: 'p10-vt-graph', name: 'Velocity-time graphs', description: 'Read a velocity-time graph: find accelerations from the slope and distances from the area.', outcomes: ['10-A2'], lessonId: L(5), gen: bank([either(vtRead, fromBank(VT_IDEAS, ['Slope is acceleration; area is distance.'])), vtSlope, vtArea], ['The slope of a velocity-time graph is the acceleration, and the area under it is the distance.']) }),
];
