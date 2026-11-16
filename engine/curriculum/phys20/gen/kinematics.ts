/**
 * Grade 11 Physics, Unit 1: Kinematics (20-A1, 20-A2). Position and displacement, uniform motion,
 * acceleration, motion graphs, the equations of motion, free fall, vectors in two dimensions,
 * relative velocity and projectile motion. Every number a question needs is in the question,
 * including g = 9.81 m/s², and every question that needs rounding says how far to round.
 */
import { numPart, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, SkillDef } from '../../../types.ts';
import { G, RAD, br, clean, direction, dpWords, round, rounded } from './common.ts';

const L = (n: number) => `p20-1-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$ and ignore air resistance.';
const ACC = 'm/s²';

// ---------------------------------------------------------------------------- 1.1 position and displacement

const AXES: Array<{ pos: string; neg: string; line: string }> = [
  { pos: 'east', neg: 'west', line: 'a straight road that runs east and west' },
  { pos: 'north', neg: 'south', line: 'a straight path that runs north and south' },
  { pos: 'right', neg: 'left', line: 'a straight track' },
];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const WALKERS = ['A cyclist', 'A runner', 'A delivery robot', 'A dog', 'A skater', 'A hiker'];

function displacementOf(rng: Rng, signed: boolean): GenOutput {
  const ax = rng.pick(AXES);
  const who = rng.pick(WALKERS);
  const d1 = signed ? rng.int(-12, 12) * 5 : rng.int(1, 12) * 5;
  let d2 = signed ? rng.int(-12, 12) * 5 : rng.int(1, 12) * 5;
  if (d2 === d1) d2 += 15;
  const dd = d2 - d1;
  return {
    prompt: `On ${ax.line}, ${ax.pos} is the positive direction. ${who} moves from the position ${q(d1, 'm')} to the position ${q(d2, 'm')}. What is the displacement? Include a minus sign if it is negative.`,
    parts: [numPart(dd, { suffix: 'm' })],
    hints: ['displacement = final position − initial position', `A negative displacement points ${ax.neg}.`],
    solution: [`$\\Delta d = d_2 - d_1 = ${br(d2)} - ${br(d1)} = ${dd}$ m`, `The displacement is ${q(Math.abs(dd), 'm')} ${dd > 0 ? ax.pos : ax.neg}.`],
  };
}

function finalPosition(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const who = rng.pick(WALKERS);
  const d1 = rng.int(-8, 8) * 5;
  const size = rng.int(2, 14) * 5;
  const positive = rng.chance(0.5);
  const dd = positive ? size : -size;
  return {
    prompt: `On ${ax.line}, ${ax.pos} is the positive direction. ${who} starts at the position ${q(d1, 'm')} and has a displacement of ${q(size, 'm')} ${positive ? ax.pos : ax.neg}. What is the final position? Include a minus sign if it is negative.`,
    parts: [numPart(d1 + dd, { suffix: 'm' })],
    hints: ['final position = initial position + displacement', `A displacement to the ${ax.neg} is negative.`.replace('to the north', 'north').replace('to the south', 'south').replace('to the east', 'east').replace('to the west', 'west')],
    solution: [`The displacement is $${dd}$ m.`, `$d_2 = d_1 + \\Delta d = ${br(d1)} + ${br(dd)} = ${d1 + dd}$ m`],
  };
}

function thereAndPartBack(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const who = rng.pick(WALKERS);
  const a = rng.int(-4, 4) * 10;
  const out = rng.int(3, 9) * 10;
  const back = rng.int(1, 12) * 10;
  const b = a + out;
  const c = b - back;
  return {
    prompt: `On ${ax.line}, ${ax.pos} is the positive direction. ${who} moves from the position ${q(a, 'm')} to ${q(b, 'm')}, then turns round and moves to ${q(c, 'm')}. Find the distance travelled and the displacement for the whole trip. Include a minus sign if the displacement is negative.`,
    parts: [numPart(out + back, { label: 'Distance', suffix: 'm' }), numPart(c - a, { label: 'Displacement', suffix: 'm' })],
    hints: ['Distance adds the length of every part of the path. Displacement only compares the final position with the initial one.'],
    solution: [`Distance: $${out} + ${back} = ${out + back}$ m.`, `Displacement: $\\Delta d = ${br(c)} - ${br(a)} = ${c - a}$ m`],
  };
}

const VECTOR_IDEAS: Q[] = [
  { q: 'Which of these is a vector quantity?', a: 'Displacement', w: ['Distance', 'Speed', 'Time'], why: 'Displacement has a size and a direction. Distance, speed and time have a size only.' },
  { q: 'A runner goes once round a 400 m track and stops where she started. What is her displacement?', a: '0 m', w: ['400 m', '200 m', '800 m'], why: 'Displacement compares the final position with the initial position, and they are the same.' },
  { q: 'What does a negative displacement mean?', a: 'The object ended on the negative side of where it started', w: ['The object moved backwards in time', 'The object slowed down', 'The distance travelled was less than zero'], why: 'The sign of a displacement gives its direction along the line.' },
  { q: 'When is the distance travelled equal to the size of the displacement?', a: 'When the object moves along a straight line without turning back', w: ['Always', 'Never', 'When the object returns to its starting point'], why: 'Any turn or return makes the path longer than the straight line from start to finish.' },
];

// ---------------------------------------------------------------------------- 1.1 vectors along a line

const LEGS: Array<{ who: string; verb: string; unit: string }> = [
  { who: 'A hiker', verb: 'walks', unit: 'km' },
  { who: 'A boat', verb: 'sails', unit: 'km' },
  { who: 'A crane', verb: 'moves its load', unit: 'm' },
  { who: 'A robot', verb: 'drives', unit: 'm' },
];
const COMPASS: Array<[string, string]> = [['East', 'West'], ['North', 'South']];

function collinear(rng: Rng, legs: 2 | 3, decimals: boolean): GenOutput {
  const k = rng.pick(LEGS);
  const dir = rng.pick(COMPASS);
  const size = () => (decimals ? rng.int(12, 95) / 10 : rng.int(2, 15));
  let steps: number[] = [];
  do {
    steps = Array.from({ length: legs }, (_, i) => (i === 0 || (legs === 3 && i === 2 && rng.chance(0.5)) ? size() : -size()));
  } while (Math.abs(steps.reduce((a, b) => a + b, 0)) < 1e-9);
  const net = clean(steps.reduce((a, b) => a + b, 0));
  const said = steps.map((s) => `${q(Math.abs(s), k.unit)} [${dir[s > 0 ? 0 : 1][0]}]`);
  return {
    prompt: `${k.who} ${k.verb} ${said.length === 2 ? `${said[0]} and then ${said[1]}` : `${said[0]}, then ${said[1]}, and then ${said[2]}`}. What is the resultant displacement?`,
    parts: [numPart(Math.abs(net), { label: 'Size', suffix: k.unit }), direction(dir, net > 0)],
    hints: [`Take ${dir[0].toLowerCase()} as positive and ${dir[1].toLowerCase()} as negative, then add.`],
    solution: [`$${steps.map((s, i) => (i === 0 ? num(s, 2) : s < 0 ? `- ${num(-s, 2)}` : `+ ${num(s, 2)}`)).join(' ')} = ${num(net, 2)}$ ${k.unit}`, `The resultant is ${q(num(Math.abs(net), 2), k.unit)} [${dir[net > 0 ? 0 : 1][0]}].`],
  };
}

function missingLeg(rng: Rng): GenOutput {
  const k = rng.pick(LEGS);
  const dir = rng.pick(COMPASS);
  const first = rng.int(4, 15);
  let net = rng.int(-9, 12);
  if (net === 0 || net === first) net = first + 3;
  const second = net - first;
  return {
    prompt: `${k.who} ${k.verb} ${q(first, k.unit)} [${dir[0][0]}] and then makes a second move along the same line. The resultant displacement is ${q(Math.abs(net), k.unit)} [${dir[net > 0 ? 0 : 1][0]}]. What was the second displacement?`,
    parts: [numPart(Math.abs(second), { label: 'Size', suffix: k.unit }), direction(dir, second > 0)],
    hints: ['resultant = first displacement + second displacement', 'Rearrange: second = resultant − first.'],
    solution: [`Taking ${dir[0].toLowerCase()} as positive: $${net} - ${first} = ${second}$ ${k.unit}`, `The second displacement is ${q(Math.abs(second), k.unit)} [${dir[second > 0 ? 0 : 1][0]}].`],
  };
}

// ---------------------------------------------------------------------------- 1.2 uniform motion

const MOVERS: Array<{ who: string; v: [number, number] }> = [
  { who: 'A cyclist', v: [4, 12] },
  { who: 'A train', v: [18, 40] },
  { who: 'A car', v: [10, 30] },
  { who: 'A runner', v: [3, 8] },
  { who: 'A drone', v: [6, 15] },
];

function velocityOf(rng: Rng): GenOutput {
  const m = rng.pick(MOVERS);
  const ax = rng.pick(AXES.slice(0, 2));
  const v = rng.int(m.v[0], m.v[1]) * (rng.chance(0.5) ? 1 : -1);
  const t = rng.pick([4, 5, 8, 10, 12, 20]);
  const d1 = rng.int(-10, 10) * 10;
  const d2 = d1 + v * t;
  return {
    prompt: `${cap(ax.pos)} is the positive direction. ${m.who} moves at a steady velocity from the position ${q(d1, 'm')} to the position ${q(d2, 'm')} in ${q(t, 's')}. What is the velocity? Include a minus sign if it is negative.`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['velocity = displacement ÷ time', 'displacement = final position − initial position'],
    solution: [`$\\Delta d = ${br(d2)} - ${br(d1)} = ${d2 - d1}$ m`, `$v = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{${d2 - d1}}{${t}} = ${v}$ m/s, which is ${q(Math.abs(v), 'm/s')} ${v > 0 ? ax.pos : ax.neg}.`],
  };
}

function positionLater(rng: Rng): GenOutput {
  const m = rng.pick(MOVERS);
  const ax = rng.pick(AXES.slice(0, 2));
  const speed = rng.int(m.v[0], m.v[1]);
  const positive = rng.chance(0.5);
  const v = positive ? speed : -speed;
  const t = rng.pick([5, 6, 8, 10, 15]);
  const d1 = rng.int(-8, 8) * 10;
  if (rng.chance(0.5)) {
    return {
      prompt: `${cap(ax.pos)} is the positive direction. ${m.who} is at the position ${q(d1, 'm')} and moves ${positive ? ax.pos : ax.neg} at a steady ${q(speed, 'm/s')}. What is its position after ${q(t, 's')}? Include a minus sign if it is negative.`,
      parts: [numPart(d1 + v * t, { suffix: 'm' })],
      hints: ['displacement = velocity × time', 'final position = initial position + displacement'],
      solution: [`$\\Delta d = v\\,\\Delta t = ${br(v)} \\times ${t} = ${v * t}$ m`, `$d_2 = ${br(d1)} + ${br(v * t)} = ${d1 + v * t}$ m`],
    };
  }
  const d2 = d1 + v * t;
  return {
    prompt: `${cap(ax.pos)} is the positive direction. ${m.who} is at the position ${q(d1, 'm')} and moves ${positive ? ax.pos : ax.neg} at a steady ${q(speed, 'm/s')}. How long does it take to reach the position ${q(d2, 'm')}?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = displacement ÷ velocity'],
    solution: [`$\\Delta d = ${br(d2)} - ${br(d1)} = ${d2 - d1}$ m`, `$\\Delta t = \\dfrac{\\Delta d}{v} = \\dfrac{${d2 - d1}}{${v}} = ${t}$ s`],
  };
}

function meeting(rng: Rng): GenOutput {
  const va = rng.int(3, 9);
  const vb = rng.int(2, 8);
  const t = rng.pick([10, 12, 15, 20, 25, 30]);
  const D = (va + vb) * t;
  return {
    prompt: `Two cyclists ride towards each other along a straight road. Cyclist A starts at the position ${q(0, 'm')} and rides at ${q(va, 'm/s')} in the positive direction. Cyclist B starts at the position ${q(D, 'm')} at the same moment and rides at ${q(vb, 'm/s')} in the negative direction. When and where do they meet?`,
    parts: [numPart(t, { label: 'Time', suffix: 's' }), numPart(va * t, { label: 'Position', suffix: 'm' })],
    hints: ['Write the position of each cyclist after a time $t$, and set the two positions equal.', `A is at $${va}t$ and B is at $${D} - ${vb}t$.`],
    solution: [`$${va}t = ${D} - ${vb}t$, so $${va + vb}t = ${D}$ and $t = ${t}$ s.`, `Position: $${va} \\times ${t} = ${va * t}$ m`],
  };
}

// ---------------------------------------------------------------------------- 1.2 position-time graphs

function walk(rng: Rng) {
  const t1 = rng.pick([2, 4]);
  const rest = rng.pick([2, 4]);
  const t3 = rng.pick([2, 4, 6]);
  const v1 = rng.pick([5, 10, 15]);
  const d1 = v1 * t1;
  // The way back overshoots the start by at most 60 m, so the last position is negative.
  const v3 = -rng.pick([5, 10, 15, 20, 25, 30, 40].filter((v) => v * t3 > d1 && v * t3 <= d1 + 60));
  const d3 = d1 + v3 * t3;
  const T = t1 + rest + t3;
  const lo = Math.floor(d3 / 20) * 20;
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: T, yMin: lo, yMax: Math.ceil((d1 + 10) / 20) * 20, xStep: 2, yStep: 20, xLabel: 'Time (s)', yLabel: 'Position (m)' },
    polylines: [{ points: [[0, 0], [t1, d1], [t1 + rest, d1], [T, d3]] }],
    caption: 'Position-time graph of a robot on a straight track',
  };
  const spans = [`0 s to ${t1} s`, `${t1} s to ${t1 + rest} s`, `${t1 + rest} s to ${T} s`];
  return { t1, rest, t3, v1, v3, d1, d3, T, figure, spans };
}
const PT_INTRO = 'The graph shows the position of a robot on a straight track.';

function ptSlope(rng: Rng, back: boolean): GenOutput {
  const g = walk(rng);
  const v = back ? g.v3 : g.v1;
  return {
    figure: g.figure,
    prompt: `${PT_INTRO} What is its velocity from ${g.spans[back ? 2 : 0]}?${back ? ' Include a minus sign if it is negative.' : ''}`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['The velocity is the slope of a position-time graph: the change in position ÷ the time taken.'],
    solution: [back ? `The position changes from ${g.d1} m to ${g.d3} m in ${g.t3} s.` : `The position changes from 0 m to ${g.d1} m in ${g.t1} s.`, `$v = \\dfrac{${back ? g.d3 - g.d1 : g.d1}}{${back ? g.t3 : g.t1}} = ${v}$ m/s`],
  };
}

function ptWhole(rng: Rng): GenOutput {
  const g = walk(rng);
  const distance = g.d1 + Math.abs(g.d3 - g.d1);
  const dp = Number.isInteger((g.d3 / g.T) * 10) ? 1 : 2;
  return {
    figure: g.figure,
    prompt: `${PT_INTRO} For the whole ${q(g.T, 's')}, find the distance travelled and the average velocity. Give the average velocity to ${dpWords(dp)}, with a minus sign if it is negative.`,
    parts: [numPart(distance, { label: 'Distance', suffix: 'm' }), rounded(g.d3 / g.T, dp, 'm/s', 'Average velocity')],
    hints: ['The distance adds the length of each part of the trip.', 'average velocity = total displacement ÷ total time'],
    solution: [`Distance: $${g.d1} + ${Math.abs(g.d3 - g.d1)} = ${distance}$ m.`, `The displacement is $${g.d3} - 0 = ${g.d3}$ m, so $v_{\\text{avg}} = \\dfrac{${g.d3}}{${g.T}} = ${num(g.d3 / g.T, dp)}$ m/s`],
  };
}

const PT_IDEAS: Q[] = [
  { q: 'On a position-time graph, what does a straight line sloping downwards show?', a: 'A steady velocity in the negative direction', w: ['The object is slowing down', 'The object is at rest', 'A steady velocity in the positive direction'], why: 'The slope is the velocity. A constant negative slope is a constant negative velocity.' },
  { q: 'On a position-time graph, what does a horizontal line show?', a: 'The object is at rest', w: ['A steady velocity', 'A steady acceleration', 'The object is at the origin'], why: 'The position is not changing, so the velocity is zero.' },
  { q: 'What does the slope of a position-time graph give?', a: 'The velocity', w: ['The acceleration', 'The displacement', 'The distance travelled'], why: 'Slope is the change in position divided by the time taken.' },
  { q: 'On a position-time graph, the line crosses the time axis. What has happened?', a: 'The object has passed through the origin', w: ['The object has stopped', 'The object has turned round', 'The velocity has become zero'], why: 'On the time axis the position is zero: the object is at the origin, and may still be moving.' },
];

// ---------------------------------------------------------------------------- 1.3 acceleration

function accelSimple(rng: Rng): GenOutput {
  const u = rng.int(2, 12);
  const a = rng.pick([1.5, 2, 2.5, 3, 4]);
  const t = rng.pick([2, 4, 6, 8]);
  const v = u + a * t;
  return {
    prompt: `A car moving in the positive direction speeds up steadily from ${q(u, 'm/s')} to ${q(v, 'm/s')} in ${q(t, 's')}. What is its acceleration?`,
    parts: [numPart(a, { suffix: ACC })],
    hints: ['acceleration = change in velocity ÷ time'],
    solution: [`$a = \\dfrac{v - u}{t} = \\dfrac{${v} - ${u}}{${t}} = ${a}\\ \\text{m/s}^2$`],
  };
}

function accelReversal(rng: Rng): GenOutput {
  const ax = rng.pick(AXES.slice(0, 2));
  const u = rng.int(3, 12);
  const back = rng.int(2, 10);
  const t = rng.pick([2, 4, 5, 10]);
  const a = clean((-back - u) / t);
  return {
    prompt: `${cap(ax.pos)} is the positive direction. A ball is moving ${ax.pos} at ${q(u, 'm/s')}. A steady force acts on it, and ${q(t, 's')} later it is moving ${ax.neg} at ${q(back, 'm/s')}. What is its acceleration? Include a minus sign if it is negative.`,
    parts: [numPart(a, { suffix: ACC })],
    hints: [`A velocity to the ${ax.neg} is negative.`.replace('to the west', 'west').replace('to the south', 'south'), 'acceleration = (final velocity − initial velocity) ÷ time'],
    solution: [`$u = +${u}$ m/s and $v = -${back}$ m/s.`, `$a = \\dfrac{v - u}{t} = \\dfrac{-${back} - ${u}}{${t}} = ${a}\\ \\text{m/s}^2$`],
  };
}

function accelFromKmh(rng: Rng): GenOutput {
  const kmh = rng.pick([36, 54, 72, 90, 108]);
  const v = kmh / 3.6;
  const t = rng.pick([4, 5, 8, 10]);
  const stop = rng.chance(0.5);
  const a = clean((stop ? -v : v) / t);
  return {
    prompt: stop
      ? `A car travelling at ${q(kmh, 'km/h')} in the positive direction brakes steadily and stops in ${q(t, 's')}. What is its acceleration in m/s²? Include a minus sign if it is negative.`
      : `A car starts from rest and reaches ${q(kmh, 'km/h')} in ${q(t, 's')}, speeding up steadily in the positive direction. What is its acceleration in m/s²?`,
    parts: [numPart(a, { suffix: ACC })],
    hints: ['Change km/h to m/s first: divide by 3.6.', 'acceleration = change in velocity ÷ time'],
    solution: [`$${kmh} \\div 3.6 = ${v}$ m/s.`, stop ? `$a = \\dfrac{0 - ${v}}{${t}} = ${a}\\ \\text{m/s}^2$` : `$a = \\dfrac{${v} - 0}{${t}} = ${a}\\ \\text{m/s}^2$`],
  };
}

const ACCEL_IDEAS: Q[] = [
  { q: 'An object has a positive velocity and a negative acceleration. What is happening to it?', a: 'It is slowing down', w: ['It is speeding up', 'It is moving at a steady velocity', 'It is at rest'], why: 'When the acceleration points the opposite way to the velocity, the speed falls.' },
  { q: 'An object has a negative velocity and a negative acceleration. What is happening to it?', a: 'It is speeding up in the negative direction', w: ['It is slowing down', 'It is turning round', 'It is at rest'], why: 'When the acceleration points the same way as the velocity, the speed rises.' },
  { q: 'A ball thrown straight up is at its highest point. Which statement is true there?', a: 'Its velocity is zero but its acceleration is not', w: ['Its velocity and its acceleration are both zero', 'Its acceleration is zero but its velocity is not', 'Neither its velocity nor its acceleration is zero'], why: 'The velocity passes through zero as the ball turns round, but gravity is still changing the velocity.' },
  { q: 'What does "uniformly accelerated motion" mean?', a: 'The velocity changes by the same amount every second', w: ['The velocity stays the same', 'The position changes by the same amount every second', 'The acceleration grows steadily'], why: 'Uniform acceleration is a constant acceleration: equal changes in velocity in equal times.' },
];

// ---------------------------------------------------------------------------- 1.3 velocity-time graphs

/** A lift goes up, steadies, slows, stops and comes back down: the velocity crosses zero. */
function lift(rng: Rng) {
  const t1 = rng.pick([2, 4]);
  const t2 = rng.pick([2, 4]);
  const V = rng.pick([4, 6, 8]);
  const a3 = -rng.pick([1, 2]);
  const tStop = V / -a3;
  const tDown = rng.pick([2, 4]);
  const W = a3 * tDown;
  const T = t1 + t2 + tStop + tDown;
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: T, yMin: Math.floor(W / 2) * 2 - 2, yMax: V + 2, xStep: 2, yStep: 2, xLabel: 'Time (s)', yLabel: 'Velocity (m/s)' },
    polylines: [{ points: [[0, 0], [t1, V], [t1 + t2, V], [T, W]] }],
    caption: 'Velocity-time graph of a lift (up is positive)',
  };
  const up = 0.5 * V * t1 + V * t2 + 0.5 * V * tStop;
  const down = 0.5 * -W * tDown;
  return { t1, t2, V, a3, tStop, tDown, W, T, figure, up, down };
}
const VT_INTRO = 'The graph shows the velocity of a lift, with up as the positive direction.';

function vtSlope(rng: Rng): GenOutput {
  const g = lift(rng);
  const first = rng.chance(0.5);
  const a = first ? clean(g.V / g.t1) : g.a3;
  const from = g.t1 + g.t2;
  return {
    figure: g.figure,
    prompt: `${VT_INTRO} What is its acceleration from ${first ? `0 s to ${g.t1} s` : `${from} s to ${g.T} s`}?${first ? '' : ' Include a minus sign if it is negative.'}`,
    parts: [numPart(a, { suffix: ACC })],
    hints: ['The acceleration is the slope of a velocity-time graph: the change in velocity ÷ the time taken.'],
    solution: [first ? `The velocity rises from 0 to ${g.V} m/s in ${g.t1} s.` : `The velocity changes from ${g.V} m/s to ${g.W} m/s in ${g.T - from} s.`, `$a = \\dfrac{${first ? g.V : g.W - g.V}}{${first ? g.t1 : g.T - from}} = ${a}\\ \\text{m/s}^2$`],
  };
}

function vtAreaUp(rng: Rng): GenOutput {
  const g = lift(rng);
  const end = g.t1 + g.t2;
  const area = 0.5 * g.V * g.t1 + g.V * g.t2;
  return {
    figure: g.figure,
    prompt: `${VT_INTRO} What is its displacement from 0 s to ${end} s?`,
    parts: [numPart(area, { suffix: 'm' })],
    hints: ['The displacement is the area between a velocity-time graph and the time axis.', 'Split the area into a triangle and a rectangle.'],
    solution: [`Triangle: $\\tfrac12 \\times ${g.t1} \\times ${g.V} = ${0.5 * g.V * g.t1}$ m. Rectangle: $${g.t2} \\times ${g.V} = ${g.V * g.t2}$ m.`, `Displacement $= ${0.5 * g.V * g.t1} + ${g.V * g.t2} = ${area}$ m`],
  };
}

function vtWhole(rng: Rng): GenOutput {
  const g = lift(rng);
  const zero = g.t1 + g.t2 + g.tStop;
  return {
    figure: g.figure,
    prompt: `${VT_INTRO} For the whole ${q(g.T, 's')}, find the displacement of the lift and the distance it travels.`,
    parts: [numPart(g.up - g.down, { label: 'Displacement', suffix: 'm' }), numPart(g.up + g.down, { label: 'Distance', suffix: 'm' })],
    hints: ['Area above the time axis is displacement upwards. Area below it is displacement downwards.', `The line crosses the time axis at ${zero} s.`],
    solution: [
      `Above the axis, from 0 s to ${zero} s: $\\tfrac12 \\times ${g.t1} \\times ${g.V} + ${g.t2} \\times ${g.V} + \\tfrac12 \\times ${g.tStop} \\times ${g.V} = ${g.up}$ m.`,
      `Below the axis, from ${zero} s to ${g.T} s: $\\tfrac12 \\times ${g.tDown} \\times ${-g.W} = ${g.down}$ m.`,
      `Displacement $= ${g.up} - ${g.down} = ${g.up - g.down}$ m. Distance $= ${g.up} + ${g.down} = ${g.up + g.down}$ m`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.4 the equations of motion

const EQ_TIME = ['$v = u + at$', '$d = \\tfrac12(u + v)t$', '$d = ut + \\tfrac12at^2$'];

function averageVelocityRule(rng: Rng): GenOutput {
  const u = rng.int(2, 14);
  const v = u + rng.int(2, 8) * 2;
  const t = rng.pick([3, 4, 5, 6, 8, 10]);
  const d = 0.5 * (u + v) * t;
  return {
    prompt: `A train speeds up steadily from ${q(u, 'm/s')} to ${q(v, 'm/s')} in ${q(t, 's')}. How far does it travel in that time?`,
    parts: [numPart(d, { suffix: 'm' })],
    hints: ['The time is known but the acceleration is not: use $d = \\tfrac12(u + v)t$.'],
    solution: [`$d = \\tfrac12(u + v)t = \\tfrac12(${u} + ${v}) \\times ${t} = ${d}$ m`],
  };
}

function displacementWithTime(rng: Rng): GenOutput {
  const u = rng.int(0, 12);
  const a = rng.pick([1, 2, 3, 4, -1, -2]);
  const t = a < 0 ? rng.pick([2, 3, 4]) : rng.pick([3, 4, 5, 6, 8]);
  // A braking car does not stop within the time.
  const start = a < 0 ? Math.max(u, -a * t + 2) : u;
  const d = start * t + 0.5 * a * t * t;
  return {
    prompt: `A car is moving at ${q(start, 'm/s')} when it starts to ${a > 0 ? 'speed up' : 'slow down'} with a steady acceleration of $${a}\\ \\text{m/s}^2$. How far does it travel in the next ${q(t, 's')}?`,
    parts: [numPart(d, { suffix: 'm' })],
    hints: ['The final velocity is not known: use $d = ut + \\tfrac12at^2$.'],
    solution: [`$d = ut + \\tfrac12at^2 = ${start} \\times ${t} + \\tfrac12 \\times ${br(a)} \\times ${t}^2$`, `$d = ${start * t} ${a < 0 ? '-' : '+'} ${Math.abs(0.5 * a * t * t)} = ${d}$ m`],
  };
}

function fromRest(rng: Rng): GenOutput {
  const t = rng.pick([3, 4, 5, 6, 8, 10]);
  const a = rng.pick([1, 2, 3, 4, 5]);
  const d = 0.5 * a * t * t;
  if (rng.chance(0.5)) {
    return {
      prompt: `A sprinter starts from rest and accelerates steadily at $${a}\\ \\text{m/s}^2$. How long does the sprinter take to cover ${q(d, 'm')}?`,
      parts: [numPart(t, { suffix: 's' })],
      hints: ['From rest, $u = 0$, so $d = \\tfrac12at^2$.', 'Rearrange for $t^2$, then take the square root.'],
      solution: [`$t^2 = \\dfrac{2d}{a} = \\dfrac{2 \\times ${d}}{${a}} = ${t * t}$`, `$t = \\sqrt{${t * t}} = ${t}$ s`],
    };
  }
  return {
    prompt: `A rocket sled starts from rest and covers ${q(d, 'm')} in ${q(t, 's')} with a steady acceleration. What is its acceleration?`,
    parts: [numPart(a, { suffix: ACC })],
    hints: ['From rest, $u = 0$, so $d = \\tfrac12at^2$.', 'Rearrange: $a = \\dfrac{2d}{t^2}$.'],
    solution: [`$a = \\dfrac{2d}{t^2} = \\dfrac{2 \\times ${d}}{${t}^2} = \\dfrac{${2 * d}}{${t * t}} = ${a}\\ \\text{m/s}^2$`],
  };
}

/** Starting and final speeds whose squares differ by a multiple of 2a, so the distance is a whole number. */
function squares(rng: Rng): { u: number; v: number; a: number; d: number } {
  for (;;) {
    const u = rng.int(0, 12);
    const v = u + rng.int(2, 12);
    const a = rng.pick([1, 2, 3, 4, 5]);
    const d = (v * v - u * u) / (2 * a);
    if (Number.isInteger(d)) return { u, v, a, d };
  }
}

function finalFromDistance(rng: Rng): GenOutput {
  const s = squares(rng);
  return {
    prompt: `A motorbike moving at ${q(s.u, 'm/s')} accelerates steadily at $${s.a}\\ \\text{m/s}^2$ over a distance of ${q(s.d, 'm')}. What is its final velocity?`,
    parts: [numPart(s.v, { suffix: 'm/s' })],
    hints: ['The time is not known: use $v^2 = u^2 + 2ad$.', 'Take the square root at the end.'],
    solution: [`$v^2 = u^2 + 2ad = ${s.u}^2 + 2 \\times ${s.a} \\times ${s.d} = ${s.v * s.v}$`, `$v = \\sqrt{${s.v * s.v}} = ${s.v}$ m/s`],
  };
}

function brakingDistance(rng: Rng): GenOutput {
  const a = rng.pick([2, 4, 5, 8]);
  const u = rng.pick([10, 12, 16, 20, 24, 30].filter((x) => Number.isInteger((x * x) / (2 * a))));
  const d = (u * u) / (2 * a);
  return {
    prompt: `A car travelling at ${q(u, 'm/s')} brakes with a steady acceleration of $-${a}\\ \\text{m/s}^2$. How far does it travel before it stops?`,
    parts: [numPart(d, { suffix: 'm' })],
    hints: ['The car stops, so $v = 0$. The time is not known: use $v^2 = u^2 + 2ad$.'],
    solution: [`$0 = ${u}^2 + 2 \\times (-${a}) \\times d$, so $d = \\dfrac{${u * u}}{${2 * a}} = ${d}$ m`],
  };
}

function accelFromDistance(rng: Rng): GenOutput {
  const s = squares(rng);
  const slowing = rng.chance(0.5);
  const [u, v, a] = slowing ? [s.v, s.u, -s.a] : [s.u, s.v, s.a];
  const t = clean((v - u) / a);
  const dp = Number.isInteger(t * 10) ? 1 : 2;
  return {
    prompt: `A train's velocity changes steadily from ${q(u, 'm/s')} to ${q(v, 'm/s')} while it travels ${q(s.d, 'm')} in the positive direction. Find its acceleration, with a minus sign if it is negative, and the time this takes${Number.isInteger(t) ? '' : `, to ${dpWords(dp)}`}.`,
    parts: [numPart(a, { label: 'Acceleration', suffix: ACC }), Number.isInteger(t) ? numPart(t, { label: 'Time', suffix: 's' }) : rounded(t, dp, 's', 'Time')],
    hints: ['For the acceleration, the time is not known: use $v^2 = u^2 + 2ad$.', 'Then $v = u + at$ gives the time.'],
    solution: [`$a = \\dfrac{v^2 - u^2}{2d} = \\dfrac{${v * v} - ${u * u}}{2 \\times ${s.d}} = ${a}\\ \\text{m/s}^2$`, `$t = \\dfrac{v - u}{a} = \\dfrac{${v - u}}{${a}} = ${num(t, dp)}$ s`],
  };
}

const EQUATION_CHOICE: Q[] = [
  { q: 'A car speeds up from a known initial velocity with a known acceleration over a known distance. Which equation gives its final velocity in one step?', a: '$v^2 = u^2 + 2ad$', w: EQ_TIME, why: 'The time is neither given nor wanted, and this is the equation without $t$.' },
  { q: 'You know the initial velocity, the final velocity and the time. Which equation gives the displacement in one step?', a: '$d = \\tfrac12(u + v)t$', w: ['$v = u + at$', '$d = ut + \\tfrac12at^2$', '$v^2 = u^2 + 2ad$'], why: 'The acceleration is neither given nor wanted, and this is the equation without $a$.' },
  { q: 'You know the initial velocity, the acceleration and the time. Which equation gives the displacement in one step?', a: '$d = ut + \\tfrac12at^2$', w: ['$v = u + at$', '$d = \\tfrac12(u + v)t$', '$v^2 = u^2 + 2ad$'], why: 'The final velocity is neither given nor wanted, and this is the equation without $v$.' },
  { q: 'When can the equations of motion be used?', a: 'Only when the acceleration is constant', w: ['Only when the velocity is constant', 'For any motion at all', 'Only when the object starts from rest'], why: 'Each equation is derived for a constant acceleration, which may be zero.' },
];

// ---------------------------------------------------------------------------- 1.5 free fall

const DROPPED = ['A stone', 'A coin', 'A steel ball', 'A key', 'A pebble'];

function dropSpeed(rng: Rng): GenOutput {
  const t = rng.pick([0.5, 0.8, 1.2, 1.5, 2, 2.5, 3]);
  return {
    prompt: `${G_NOTE} ${rng.pick(DROPPED)} is dropped from rest. How fast is it moving after ${q(t, 's')}? Give your answer to 1 decimal place.`,
    parts: [rounded(G * t, 1, 'm/s')],
    hints: ['From rest, $v = gt$.'],
    solution: [`$v = u + at = 0 + 9.81 \\times ${t} = ${num(G * t, 1)}$ m/s`],
  };
}

function dropDistance(rng: Rng): GenOutput {
  const t = rng.pick([0.6, 1, 1.4, 1.8, 2, 2.4, 3]);
  const d = 0.5 * G * t * t;
  return {
    prompt: `${G_NOTE} ${rng.pick(DROPPED)} is dropped from rest down a well and hits the water ${q(t, 's')} later. How far did it fall? Give your answer to 1 decimal place.`,
    parts: [rounded(d, 1, 'm')],
    hints: ['From rest, $d = \\tfrac12gt^2$.'],
    solution: [`$d = ut + \\tfrac12at^2 = 0 + \\tfrac12 \\times 9.81 \\times ${t}^2 = ${num(d, 1)}$ m`],
  };
}

function dropFromHeight(rng: Rng): GenOutput {
  const h = rng.pick([5, 8, 12, 20, 30, 45, 60, 80]);
  const t = Math.sqrt((2 * h) / G);
  const v = Math.sqrt(2 * G * h);
  return {
    prompt: `${G_NOTE} ${rng.pick(DROPPED)} is dropped from rest from a height of ${q(h, 'm')}. Find the time it takes to reach the ground, to 2 decimal places, and its speed just before it lands, to 1 decimal place.`,
    parts: [rounded(t, 2, 's', 'Time'), rounded(v, 1, 'm/s', 'Speed')],
    hints: ['From rest, $d = \\tfrac12gt^2$, so $t = \\sqrt{\\dfrac{2d}{g}}$.', 'For the speed, use $v^2 = u^2 + 2ad$ with $u = 0$.'],
    solution: [`$t = \\sqrt{\\dfrac{2 \\times ${h}}{9.81}} = ${num(t, 2)}$ s`, `$v = \\sqrt{2 \\times 9.81 \\times ${h}} = ${num(v, 1)}$ m/s`],
  };
}

const FALL_IDEAS: Q[] = [
  { q: 'A heavy ball and a light ball are dropped together from the same height. Air resistance can be ignored. Which lands first?', a: 'They land at the same time', w: ['The heavy ball', 'The light ball', 'It depends on their colours'], why: 'In free fall every object has the same acceleration, $g$, whatever its mass.' },
  { q: 'What is the acceleration of a ball in free fall while it is moving upwards?', a: '$9.81\\ \\text{m/s}^2$ downwards', w: ['$9.81\\ \\text{m/s}^2$ upwards', 'Zero', 'It depends on how fast the ball is moving'], why: 'Gravity pulls down all the time, so the acceleration is $g$ downwards on the way up, at the top and on the way down.' },
];

function throwTop(rng: Rng): GenOutput {
  const u = rng.pick([5, 8, 10, 12, 15, 18, 20, 25]);
  return {
    prompt: `${G_NOTE} A ball is thrown straight up at ${q(u, 'm/s')}. How long does it take to reach its highest point? Give your answer to 2 decimal places.`,
    parts: [rounded(u / G, 2, 's')],
    hints: ['At the highest point the velocity is zero.', 'Taking up as positive, $v = u + at$ with $a = -9.81\\ \\text{m/s}^2$.'],
    solution: [`$0 = ${u} - 9.81t$, so $t = \\dfrac{${u}}{9.81} = ${num(u / G, 2)}$ s`],
  };
}

function throwHeight(rng: Rng): GenOutput {
  const u = rng.pick([6, 9, 12, 14, 16, 20, 24]);
  const h = (u * u) / (2 * G);
  return {
    prompt: `${G_NOTE} A ball is thrown straight up at ${q(u, 'm/s')}. How high above the point of release does it rise? Give your answer to 1 decimal place.`,
    parts: [rounded(h, 1, 'm')],
    hints: ['At the highest point the velocity is zero.', 'Taking up as positive, $v^2 = u^2 + 2ad$ with $a = -9.81\\ \\text{m/s}^2$.'],
    solution: [`$0 = ${u}^2 - 2 \\times 9.81 \\times d$, so $d = \\dfrac{${u * u}}{19.62} = ${num(h, 1)}$ m`],
  };
}

function throwLater(rng: Rng): GenOutput {
  const u = rng.pick([12, 15, 18, 20, 24]);
  // A time after the ball has passed its highest point and before it is back at the start.
  const t = round((u / G) * rng.pick([1.3, 1.5, 1.7]), 1);
  const v = u - G * t;
  const h = u * t - 0.5 * G * t * t;
  return {
    prompt: `${G_NOTE} A ball is thrown straight up at ${q(u, 'm/s')}. Taking up as positive, find its velocity ${q(t, 's')} after it is thrown and its height above the point of release at that moment, each to 1 decimal place. Include a minus sign if a value is negative.`,
    parts: [rounded(v, 1, 'm/s', 'Velocity'), rounded(h, 1, 'm', 'Height')],
    hints: ['Taking up as positive, $a = -9.81\\ \\text{m/s}^2$.', '$v = u + at$ and $d = ut + \\tfrac12at^2$.'],
    solution: [`$v = ${u} - 9.81 \\times ${t} = ${num(v, 1)}$ m/s. The minus sign shows that the ball is on its way down.`, `$d = ${u} \\times ${t} - \\tfrac12 \\times 9.81 \\times ${t}^2 = ${num(h, 1)}$ m`],
  };
}

// ---------------------------------------------------------------------------- 1.6 vectors in two dimensions

const ANGLES = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];
const VECTORS: Array<{ what: string; unit: string; size: [number, number] }> = [
  { what: 'A force', unit: 'N', size: [20, 90] },
  { what: 'A velocity', unit: 'm/s', size: [8, 40] },
  { what: 'A displacement', unit: 'km', size: [5, 30] },
];

function component(rng: Rng): GenOutput {
  const k = rng.pick(VECTORS);
  const R = rng.int(k.size[0], k.size[1]);
  const th = rng.pick(ANGLES);
  const horizontal = rng.chance(0.5);
  const value = horizontal ? R * Math.cos(th * RAD) : R * Math.sin(th * RAD);
  return {
    prompt: `${k.what} of ${q(R, k.unit)} points at ${th}° above the horizontal. What is its ${horizontal ? 'horizontal' : 'vertical'} component? Give your answer to 1 decimal place.`,
    parts: [rounded(value, 1, k.unit)],
    hints: ['The horizontal component is $R\\cos\\theta$ and the vertical component is $R\\sin\\theta$, with $\\theta$ measured from the horizontal.'],
    solution: [horizontal ? `$R_x = R\\cos\\theta = ${R} \\times \\cos ${th}° = ${num(value, 1)}$ ${k.unit}` : `$R_y = R\\sin\\theta = ${R} \\times \\sin ${th}° = ${num(value, 1)}$ ${k.unit}`],
  };
}

function bothComponents(rng: Rng): GenOutput {
  const k = rng.pick(VECTORS);
  const R = rng.int(k.size[0], k.size[1]);
  const th = rng.pick(ANGLES);
  const x = R * Math.cos(th * RAD);
  const y = R * Math.sin(th * RAD);
  return {
    prompt: `${k.what} of ${q(R, k.unit)} points at ${th}° north of east. Find its east component and its north component, each to 1 decimal place.`,
    parts: [rounded(x, 1, k.unit, 'East'), rounded(y, 1, k.unit, 'North')],
    hints: ['The angle is measured from east, so the east component is $R\\cos\\theta$ and the north component is $R\\sin\\theta$.'],
    solution: [`East: $${R} \\times \\cos ${th}° = ${num(x, 1)}$ ${k.unit}.`, `North: $${R} \\times \\sin ${th}° = ${num(y, 1)}$ ${k.unit}`],
  };
}

const QUADRANTS: Array<{ say: string; sx: 1 | -1; sy: 1 | -1 }> = [
  { say: 'south of east', sx: 1, sy: -1 },
  { say: 'north of west', sx: -1, sy: 1 },
  { say: 'south of west', sx: -1, sy: -1 },
];

function signedComponents(rng: Rng): GenOutput {
  const k = rng.pick(VECTORS);
  const R = rng.int(k.size[0], k.size[1]);
  const th = rng.pick(ANGLES);
  const quad = rng.pick(QUADRANTS);
  const x = quad.sx * R * Math.cos(th * RAD);
  const y = quad.sy * R * Math.sin(th * RAD);
  return {
    prompt: `East and north are the positive directions. ${k.what} of ${q(R, k.unit)} points at ${th}° ${quad.say}. Find its east component and its north component, each to 1 decimal place. Include a minus sign if a component is negative.`,
    parts: [rounded(x, 1, k.unit, 'East'), rounded(y, 1, k.unit, 'North')],
    hints: ['Find the sizes with $R\\cos\\theta$ and $R\\sin\\theta$, with the angle measured from the east-west line.', 'A component that points west or south is negative.'],
    solution: [`East-west: $${R} \\times \\cos ${th}° = ${num(Math.abs(x), 1)}$ ${k.unit}, pointing ${quad.sx > 0 ? 'east' : 'west'}, so the east component is $${num(x, 1)}$ ${k.unit}.`, `North-south: $${R} \\times \\sin ${th}° = ${num(Math.abs(y), 1)}$ ${k.unit}, pointing ${quad.sy > 0 ? 'north' : 'south'}, so the north component is $${num(y, 1)}$ ${k.unit}`],
  };
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]];

function perpendicularSize(rng: Rng): GenOutput {
  const [a, b, c] = rng.pick(TRIPLES);
  const k = rng.pick([{ who: 'A hiker walks', unit: 'km' }, { who: 'A drone flies', unit: 'm' }, { who: 'A ship sails', unit: 'km' }]);
  return {
    prompt: `${k.who} ${q(a, k.unit)} east and then ${q(b, k.unit)} north. What is the size of the resultant displacement?`,
    parts: [numPart(c, { suffix: k.unit })],
    hints: ['The two displacements are at right angles, so the resultant is the hypotenuse of a right triangle.', 'Use the Pythagorean theorem.'],
    solution: [`$R = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}} = ${c}$ ${k.unit}`],
  };
}

function perpendicularFull(rng: Rng): GenOutput {
  const x = rng.int(4, 30);
  const y = rng.int(4, 30);
  const R = Math.hypot(x, y);
  const th = Math.atan2(y, x) / RAD;
  const k = rng.pick([{ what: 'Two forces act on a crate', a: 'east', b: 'north', unit: 'N' }, { what: 'A plane has two velocity components', a: 'east', b: 'north', unit: 'm/s' }]);
  return {
    prompt: `${k.what}: ${q(x, k.unit)} ${k.a} and ${q(y, k.unit)} ${k.b}. Find the size of the resultant and its direction as an angle north of east, each to 1 decimal place.`,
    parts: [rounded(R, 1, k.unit, 'Size'), rounded(th, 1, '° north of east', 'Angle')],
    hints: ['Size: the Pythagorean theorem.', 'Angle: $\\tan\\theta = \\dfrac{\\text{north component}}{\\text{east component}}$.'],
    solution: [`$R = \\sqrt{${x}^2 + ${y}^2} = ${num(R, 1)}$ ${k.unit}`, `$\\theta = \\tan^{-1}\\left(\\dfrac{${y}}{${x}}\\right) = ${num(th, 1)}°$ north of east`],
  };
}

function addByComponents(rng: Rng): GenOutput {
  const A = rng.int(10, 40);
  const B = rng.int(10, 40);
  const th = rng.pick([30, 40, 50, 60]);
  const bx = B * Math.cos(th * RAD);
  const by = B * Math.sin(th * RAD);
  const x = A + bx;
  const R = Math.hypot(x, by);
  const ang = Math.atan2(by, x) / RAD;
  return {
    prompt: `A boat sails ${q(A, 'km')} east, and then ${q(B, 'km')} at ${th}° north of east. Find the size of the resultant displacement and its direction as an angle north of east, each to 1 decimal place.`,
    parts: [rounded(R, 1, 'km', 'Size'), rounded(ang, 1, '° north of east', 'Angle')],
    hints: ['Resolve the second displacement into east and north components.', 'Add the east components, add the north components, then use the Pythagorean theorem and the tangent.'],
    solution: [
      `Second displacement: east $${B}\\cos ${th}° = ${num(bx, 2)}$ km, north $${B}\\sin ${th}° = ${num(by, 2)}$ km.`,
      `Totals: east $${A} + ${num(bx, 2)} = ${num(x, 2)}$ km, north $${num(by, 2)}$ km.`,
      `$R = \\sqrt{${num(x, 2)}^2 + ${num(by, 2)}^2} = ${num(R, 1)}$ km and $\\theta = \\tan^{-1}\\left(\\dfrac{${num(by, 2)}}{${num(x, 2)}}\\right) = ${num(ang, 1)}°$ north of east`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.7 relative velocity

function onTheTrain(rng: Rng): GenOutput {
  const train = rng.int(12, 30);
  const walk = rng.pick([1, 1.5, 2, 2.5]);
  const forward = rng.chance(0.5);
  const v = clean(forward ? train + walk : train - walk);
  return {
    prompt: `A train travels east at ${q(train, 'm/s')}. A passenger walks towards the ${forward ? 'front' : 'back'} of the train at ${q(walk, 'm/s')} relative to the train. What is the passenger's velocity relative to the ground?`,
    parts: [numPart(v, { label: 'Size', suffix: 'm/s' }), direction(['East', 'West'], true)],
    hints: ['velocity relative to the ground = velocity relative to the train + velocity of the train', 'Take east as positive.'],
    solution: [`$v = ${forward ? '' : '-'}${walk} + ${train} = ${v}$ m/s, so ${q(v, 'm/s')} [E].`],
  };
}

function inTheCurrent(rng: Rng): GenOutput {
  const boat = rng.int(4, 12);
  const current = rng.int(1, boat - 2);
  const down = rng.chance(0.5);
  const D = (down ? boat + current : boat - current) * rng.pick([20, 30, 40, 60]);
  const v = down ? boat + current : boat - current;
  return {
    prompt: `A boat moves at ${q(boat, 'm/s')} relative to the water in a river that flows at ${q(current, 'm/s')}. How long does the boat take to travel ${q(D, 'm')} ${down ? 'downstream' : 'upstream'}, measured along the bank?`,
    parts: [numPart(D / v, { suffix: 's' })],
    hints: [down ? 'Going downstream, the current adds to the boat’s velocity.' : 'Going upstream, the current takes away from the boat’s velocity.', 'time = distance ÷ velocity relative to the bank'],
    solution: [`Velocity relative to the bank: $${boat} ${down ? '+' : '-'} ${current} = ${v}$ m/s.`, `$t = \\dfrac{${D}}{${v}} = ${D / v}$ s`],
  };
}

function catchingUp(rng: Rng): GenOutput {
  const slow = rng.int(15, 25);
  const rel = rng.pick([2, 4, 5, 8]);
  const fast = slow + rel;
  const gap = rel * rng.pick([10, 15, 20, 30]);
  return {
    prompt: `A car travels east at ${q(fast, 'm/s')} and is ${q(gap, 'm')} behind a truck that travels east at ${q(slow, 'm/s')}. Find the car's velocity relative to the truck, and the time the car takes to draw level with the truck.`,
    parts: [numPart(rel, { label: 'Relative velocity', suffix: 'm/s' }), numPart(gap / rel, { label: 'Time', suffix: 's' })],
    hints: ['velocity of the car relative to the truck = velocity of the car − velocity of the truck', 'Seen from the truck, the car closes the gap at the relative velocity.'],
    solution: [`$${fast} - ${slow} = ${rel}$ m/s east.`, `$t = \\dfrac{${gap}}{${rel}} = ${gap / rel}$ s`],
  };
}

const RELATIVE_IDEAS: Q[] = [
  { q: 'Two cars travel side by side along a highway at the same velocity. What is the velocity of one car relative to the other?', a: 'Zero', w: ['Twice the velocity of one car', 'The same as the velocity of one car', 'It cannot be found'], why: 'Relative velocity is the difference between the two velocities, and they are equal.' },
  { q: 'Two trains approach each other on parallel tracks, each at 20 m/s relative to the ground. How fast does one train approach, as measured from the other?', a: '40 m/s', w: ['20 m/s', '0 m/s', '10 m/s'], why: 'Taking one direction as positive, the velocities are +20 m/s and −20 m/s. Their difference is 40 m/s.' },
];

function crossSpeed(rng: Rng): GenOutput {
  const [a, b, c] = rng.pick(TRIPLES.slice(0, 5));
  const boatFirst = rng.chance(0.5);
  const boat = boatFirst ? b : a;
  const current = boatFirst ? a : b;
  return {
    prompt: `A boat points straight across a river and moves at ${q(boat, 'm/s')} relative to the water. The river flows at ${q(current, 'm/s')}. What is the boat's speed relative to the bank?`,
    parts: [numPart(c, { suffix: 'm/s' })],
    hints: ['The two velocities are at right angles. Add them as vectors with the Pythagorean theorem.'],
    solution: [`$v = \\sqrt{${boat}^2 + ${current}^2} = \\sqrt{${boat * boat + current * current}} = ${c}$ m/s`],
  };
}

function crossTimeAndDrift(rng: Rng): GenOutput {
  const boat = rng.pick([2, 2.5, 4, 5]);
  const current = rng.pick([1, 1.5, 2, 3]);
  const W = boat * rng.pick([20, 30, 40, 60]);
  const t = W / boat;
  return {
    prompt: `A river is ${q(W, 'm')} wide and flows at ${q(current, 'm/s')}. A boat points straight across and moves at ${q(boat, 'm/s')} relative to the water. Find the time it takes to cross, and how far downstream it lands.`,
    parts: [numPart(t, { label: 'Time', suffix: 's' }), numPart(clean(current * t), { label: 'Downstream', suffix: 'm' })],
    hints: ['Only the velocity across the river carries the boat across.', 'While it crosses, the current carries it downstream at the speed of the river.'],
    solution: [`$t = \\dfrac{${W}}{${boat}} = ${t}$ s.`, `Downstream: $${current} \\times ${t} = ${clean(current * t)}$ m`],
  };
}

function heading(rng: Rng): GenOutput {
  const boat = rng.pick([4, 5, 6, 8]);
  const current = rng.pick([1, 1.5, 2, 2.5, 3]);
  const th = Math.asin(current / boat) / RAD;
  const across = Math.sqrt(boat * boat - current * current);
  return {
    prompt: `A river flows at ${q(current, 'm/s')}. A boat that moves at ${q(boat, 'm/s')} relative to the water must travel straight across. Find the angle upstream from straight across at which it must point, to 1 decimal place, and its speed relative to the bank, to 2 decimal places.`,
    parts: [rounded(th, 1, '° upstream', 'Angle'), rounded(across, 2, 'm/s', 'Speed')],
    hints: ['The upstream component of the boat’s velocity must cancel the current: $v_{\\text{boat}}\\sin\\theta = v_{\\text{river}}$.', 'The speed across is the other side of the right triangle.'],
    solution: [`$\\sin\\theta = \\dfrac{${current}}{${boat}}$, so $\\theta = ${num(th, 1)}°$ upstream.`, `$v = \\sqrt{${boat}^2 - ${current}^2} = ${num(across, 2)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 1.8 projectile motion

const LAUNCHED = [
  { what: 'A ball rolls off a table', from: 'table' },
  { what: 'A stone is thrown horizontally from a cliff', from: 'cliff' },
  { what: 'A package slides off a flat roof', from: 'roof' },
];

function levelTime(rng: Rng): GenOutput {
  const k = rng.pick(LAUNCHED);
  const h = k.from === 'table' ? rng.pick([0.8, 1, 1.2, 1.5]) : rng.pick([10, 20, 30, 45]);
  const vx = rng.int(2, 15);
  const t = Math.sqrt((2 * h) / G);
  return {
    prompt: `${G_NOTE} ${k.what} at ${q(vx, 'm/s')}, ${q(h, 'm')} above the ground. How long is it in the air? Give your answer to 2 decimal places.`,
    parts: [rounded(t, 2, 's')],
    hints: ['The horizontal velocity does not change how long the fall takes.', 'Vertically it starts from rest: $d = \\tfrac12gt^2$.'],
    solution: [`$t = \\sqrt{\\dfrac{2d}{g}} = \\sqrt{\\dfrac{2 \\times ${h}}{9.81}} = ${num(t, 2)}$ s`],
  };
}

function levelRange(rng: Rng): GenOutput {
  const k = rng.pick(LAUNCHED);
  const h = k.from === 'table' ? rng.pick([0.8, 1, 1.2, 1.5]) : rng.pick([10, 20, 30, 45]);
  const vx = rng.int(2, 15);
  const t = Math.sqrt((2 * h) / G);
  return {
    prompt: `${G_NOTE} ${k.what} at ${q(vx, 'm/s')}, ${q(h, 'm')} above the ground. Find the time it is in the air, to 2 decimal places, and how far from the foot of the ${k.from} it lands, to 1 decimal place.`,
    parts: [rounded(t, 2, 's', 'Time'), rounded(vx * t, 1, 'm', 'Range')],
    hints: ['Vertically it starts from rest: $d = \\tfrac12gt^2$ gives the time.', 'Horizontally the velocity is steady: range = horizontal velocity × time.'],
    solution: [`$t = \\sqrt{\\dfrac{2 \\times ${h}}{9.81}} = ${num(t, 2)}$ s`, `Range $= ${vx} \\times ${num(t, 4)} = ${num(vx * t, 1)}$ m`],
  };
}

function levelLanding(rng: Rng): GenOutput {
  const k = rng.pick(LAUNCHED.slice(1));
  const h = rng.pick([10, 20, 30, 45]);
  const vx = rng.int(5, 20);
  const vy = Math.sqrt(2 * G * h);
  const v = Math.hypot(vx, vy);
  const th = Math.atan2(vy, vx) / RAD;
  return {
    prompt: `${G_NOTE} ${k.what} at ${q(vx, 'm/s')}, ${q(h, 'm')} above the ground. Find its speed just before it lands and the angle its velocity makes below the horizontal, each to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s', 'Speed'), rounded(th, 1, '° below the horizontal', 'Angle')],
    hints: ['The horizontal velocity stays the same. Find the vertical velocity from $v^2 = u^2 + 2ad$ with $u = 0$.', 'Then add the two components as vectors.'],
    solution: [
      `Vertical: $v_y = \\sqrt{2 \\times 9.81 \\times ${h}} = ${num(vy, 2)}$ m/s.`,
      `$v = \\sqrt{${vx}^2 + ${num(vy, 2)}^2} = ${num(v, 1)}$ m/s and $\\theta = \\tan^{-1}\\left(\\dfrac{${num(vy, 2)}}{${vx}}\\right) = ${num(th, 1)}°$ below the horizontal`,
    ],
  };
}

function angleComponents(rng: Rng): GenOutput {
  const v = rng.int(10, 40);
  const th = rng.pick(ANGLES);
  const vx = v * Math.cos(th * RAD);
  const vy = v * Math.sin(th * RAD);
  return {
    prompt: `A ball is kicked from the ground at ${q(v, 'm/s')}, at ${th}° above the horizontal. Find the horizontal and vertical components of its initial velocity, each to 1 decimal place.`,
    parts: [rounded(vx, 1, 'm/s', 'Horizontal'), rounded(vy, 1, 'm/s', 'Vertical')],
    hints: ['Horizontal: $v\\cos\\theta$. Vertical: $v\\sin\\theta$.'],
    solution: [`$v_x = ${v}\\cos ${th}° = ${num(vx, 1)}$ m/s`, `$v_y = ${v}\\sin ${th}° = ${num(vy, 1)}$ m/s`],
  };
}

function angleFlight(rng: Rng): GenOutput {
  const v = rng.int(10, 35);
  const th = rng.pick(ANGLES);
  const vy = v * Math.sin(th * RAD);
  const t = (2 * vy) / G;
  const h = (vy * vy) / (2 * G);
  return {
    prompt: `${G_NOTE} A ball is kicked from level ground at ${q(v, 'm/s')}, at ${th}° above the horizontal. Find the time it is in the air, to 2 decimal places, and the greatest height it reaches, to 1 decimal place.`,
    parts: [rounded(t, 2, 's', 'Time'), rounded(h, 1, 'm', 'Height')],
    hints: ['Find the vertical component of the velocity first: $v\\sin\\theta$.', 'It takes as long to come down as to go up, and at the top the vertical velocity is zero.'],
    solution: [
      `$v_y = ${v}\\sin ${th}° = ${num(vy, 2)}$ m/s.`,
      `Time to the top: $\\dfrac{${num(vy, 2)}}{9.81} = ${num(vy / G, 3)}$ s, so the time in the air is $${num(t, 2)}$ s.`,
      `Height: $\\dfrac{${num(vy, 2)}^2}{2 \\times 9.81} = ${num(h, 1)}$ m`,
    ],
  };
}

function angleRange(rng: Rng): GenOutput {
  const v = rng.int(10, 35);
  const th = rng.pick(ANGLES);
  const vx = v * Math.cos(th * RAD);
  const vy = v * Math.sin(th * RAD);
  const t = (2 * vy) / G;
  return {
    prompt: `${G_NOTE} A ball is kicked from level ground at ${q(v, 'm/s')}, at ${th}° above the horizontal. How far away does it land? Give your answer to 1 decimal place.`,
    parts: [rounded(vx * t, 1, 'm')],
    hints: ['Find both components of the velocity.', 'The vertical component gives the time in the air. The horizontal component, which stays steady, then gives the range.'],
    solution: [
      `$v_x = ${v}\\cos ${th}° = ${num(vx, 2)}$ m/s and $v_y = ${v}\\sin ${th}° = ${num(vy, 2)}$ m/s.`,
      `Time in the air: $\\dfrac{2 \\times ${num(vy, 2)}}{9.81} = ${num(t, 3)}$ s.`,
      `Range $= ${num(vx, 2)} \\times ${num(t, 3)} = ${num(vx * t, 1)}$ m`,
    ],
  };
}

const PROJECTILE_IDEAS: Array<Q | Select> = [
  { q: 'A ball is fired horizontally from a cliff at the same moment as a second ball is dropped from the same height. Air resistance can be ignored. Which lands first?', a: 'They land at the same time', w: ['The dropped ball', 'The fired ball', 'It depends on the speed of the fired ball'], why: 'Both start with no vertical velocity and have the same vertical acceleration, so they fall together.' },
  { q: 'Air resistance can be ignored. What happens to the horizontal velocity of a projectile during its flight?', a: 'It stays the same', w: ['It decreases steadily', 'It increases steadily', 'It is zero at the highest point'], why: 'Gravity acts vertically, so nothing changes the horizontal velocity.' },
  { q: 'A ball is kicked at an angle. What is true at the highest point of its path?', a: 'Its vertical velocity is zero but its horizontal velocity is not', w: ['Its velocity is zero', 'Its acceleration is zero', 'Its horizontal velocity is zero but its vertical velocity is not'], why: 'The ball stops rising for an instant, but it keeps moving sideways, and gravity still acts.' },
  { q: 'For a fixed launch speed on level ground, with no air resistance, which launch angle gives the greatest range?', a: '45°', w: ['30°', '60°', '90°'], order: ['30°', '45°', '60°', '90°'], why: 'At 45° the horizontal velocity and the time in the air are balanced to give the greatest range.' },
];

export const KINEMATICS_SKILLS: SkillDef[] = [
  skill({ id: 'p20-position', name: 'Position and displacement', description: 'Find a displacement from two positions, with its sign, and tell it from the distance travelled.', outcomes: ['20-A1'], lessonId: L(1), gen: bank([either((rng) => displacementOf(rng, false), fromBank(VECTOR_IDEAS, ['A vector has a size and a direction. Displacement compares the final position with the initial one.'])), either((rng) => displacementOf(rng, true), finalPosition), thereAndPartBack], ['displacement = final position − initial position']) }),
  skill({ id: 'p20-collinear', name: 'Adding vectors along a line', description: 'Add displacements that lie along one line and state the resultant with its direction.', outcomes: ['20-A1'], lessonId: L(1), gen: bank([(rng) => collinear(rng, 2, false), either((rng) => collinear(rng, 3, false), (rng) => collinear(rng, 2, true)), either(missingLeg, (rng) => collinear(rng, 3, true))], ['Choose a positive direction, give each vector a sign, and add.']) }),
  skill({ id: 'p20-uniform', name: 'Uniform motion', description: 'Use velocity = displacement ÷ time for motion at a steady velocity, with signs for direction.', outcomes: ['20-A1'], lessonId: L(2), calculator: true, gen: bank([velocityOf, positionLater, meeting], ['velocity = displacement ÷ time']) }),
  skill({ id: 'p20-pt-graph', name: 'Position-time graphs', description: 'Read a position-time graph: velocities from the slope, and the distance and average velocity of a whole trip.', outcomes: ['20-A1'], lessonId: L(2), calculator: true, gen: bank([either((rng) => ptSlope(rng, false), fromBank(PT_IDEAS, ['The slope of a position-time graph is the velocity.'])), (rng) => ptSlope(rng, true), ptWhole], ['The slope of a position-time graph is the velocity.']) }),
  skill({ id: 'p20-accel', name: 'Acceleration with direction', description: 'Find an acceleration, with its sign, from a change in velocity and the time it takes.', outcomes: ['20-A1'], lessonId: L(3), calculator: true, gen: bank([either(accelSimple, fromBank(ACCEL_IDEAS, ['Compare the direction of the acceleration with the direction of the velocity.'])), accelReversal, accelFromKmh], ['acceleration = (final velocity − initial velocity) ÷ time']) }),
  skill({ id: 'p20-vt-graph', name: 'Velocity-time graphs', description: 'Read a velocity-time graph that crosses zero: accelerations from the slope, and displacement and distance from the areas.', outcomes: ['20-A1'], lessonId: L(3), gen: bank([vtSlope, vtAreaUp, vtWhole], ['Slope is acceleration. Area is displacement, negative below the time axis.']) }),
  skill({ id: 'p20-motion-time', name: 'Equations of motion with time', description: 'Use d = ½(u + v)t and d = ut + ½at² to find a displacement, a time or an acceleration.', outcomes: ['20-A1'], lessonId: L(4), calculator: true, gen: bank([averageVelocityRule, displacementWithTime, fromRest], ['List what you know and what you want, then choose the equation that has only those quantities.']) }),
  skill({ id: 'p20-motion-squared', name: 'The equation without time', description: 'Use v² = u² + 2ad to find a velocity, a distance or an acceleration when the time is not known.', outcomes: ['20-A1'], lessonId: L(4), calculator: true, gen: bank([either(finalFromDistance, fromBank(EQUATION_CHOICE, ['Choose the equation that leaves out the quantity you neither know nor want.'])), brakingDistance, accelFromDistance], ['$v^2 = u^2 + 2ad$']) }),
  skill({ id: 'p20-free-drop', name: 'Falling from rest', description: 'Find the speed, the distance fallen and the time of fall of an object dropped from rest.', outcomes: ['20-A1'], lessonId: L(5), calculator: true, gen: bank([either(dropSpeed, fromBank(FALL_IDEAS, ['In free fall every object has the same acceleration, g, downwards.'])), dropDistance, dropFromHeight], ['Free fall is uniformly accelerated motion with $a = g$ downwards.']) }),
  skill({ id: 'p20-free-throw', name: 'Thrown straight up', description: 'Find the time to the top, the greatest height and the later velocity of an object thrown straight up.', outcomes: ['20-A1'], lessonId: L(5), calculator: true, gen: bank([throwTop, throwHeight, throwLater], ['Take up as positive, so the acceleration is $-9.81\\ \\text{m/s}^2$ throughout.']) }),
  skill({ id: 'p20-components', name: 'Components of a vector', description: 'Resolve a vector into two perpendicular components, with signs for direction.', outcomes: ['20-A2'], lessonId: L(6), calculator: true, gen: bank([component, bothComponents, signedComponents], ['Along the side next to the angle use cosine. Along the side opposite the angle use sine.']) }),
  skill({ id: 'p20-resultant', name: 'Adding vectors in two dimensions', description: 'Add two vectors by their components and give the size and the direction of the resultant.', outcomes: ['20-A2'], lessonId: L(6), calculator: true, gen: bank([perpendicularSize, perpendicularFull, addByComponents], ['Add the components along each direction, then use the Pythagorean theorem and the tangent.']) }),
  skill({ id: 'p20-relative-line', name: 'Relative velocity along a line', description: 'Find a velocity relative to the ground, or of one object relative to another, for motion along one line.', outcomes: ['20-A2'], lessonId: L(7), calculator: true, gen: bank([either(onTheTrain, fromBank(RELATIVE_IDEAS, ['Relative velocity is the difference between the two velocities.'])), inTheCurrent, catchingUp], ['Take one direction as positive and add or subtract the velocities with their signs.']) }),
  skill({ id: 'p20-relative-plane', name: 'Crossing a current', description: 'Find the velocity, crossing time and drift of a boat crossing a current, and the heading that takes it straight across.', outcomes: ['20-A2'], lessonId: L(7), calculator: true, gen: bank([crossSpeed, crossTimeAndDrift, heading], ['The velocity across the river and the velocity of the river are at right angles, and each acts on its own.']) }),
  skill({ id: 'p20-projectile-level', name: 'Launched horizontally', description: 'Find the time of flight, the range and the landing velocity of an object launched horizontally.', outcomes: ['20-A2'], lessonId: L(8), calculator: true, gen: bank([either(levelTime, fromBank(PROJECTILE_IDEAS.slice(0, 2), ['The horizontal and vertical motions are independent.'])), levelRange, levelLanding], ['Treat the horizontal motion (steady velocity) and the vertical motion (free fall) separately. The time links them.']) }),
  skill({ id: 'p20-projectile-angle', name: 'Launched at an angle', description: 'Find the components of the launch velocity, the time of flight, the greatest height and the range of a projectile.', outcomes: ['20-A2'], lessonId: L(8), calculator: true, gen: bank([either(angleComponents, fromBank(PROJECTILE_IDEAS.slice(2), ['The horizontal and vertical motions are independent.'])), angleFlight, angleRange], ['Resolve the launch velocity into components first. The vertical component sets the time in the air.']) }),
];
