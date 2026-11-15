/**
 * Grade 11 Physics, Unit 2: Dynamics (20-B1, 20-B2). Free-body diagrams and net force, Newton's
 * laws, static and kinetic friction, inclined planes, connected objects, forces in two dimensions,
 * universal gravitation and gravitational field strength. Every number a question needs is in the
 * question, including g = 9.81 m/s² and G = 6.67 × 10⁻¹¹ N·m²/kg², and the masses and radii of
 * planets are given in the question, not quoted as official figures.
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { An, BIG_G, BIG_G_NOTE, G, RAD, SCI_TIP, an, clean, direction, rounded, sciPart, sciTex } from './common.ts';

const L = (n: number) => `p20-2-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';
const ACC = 'm/s²';
const ANGLES = [15, 20, 25, 30, 35, 40];
const THINGS = ['crate', 'box', 'toolbox', 'suitcase', 'parcel'];
const sin = (deg: number) => Math.sin(deg * RAD);
const cos = (deg: number) => Math.cos(deg * RAD);
const tan = (deg: number) => Math.tan(deg * RAD);
/** The nearest multiple of `step`. */
const near = (x: number, step: number) => Math.round(x / step) * step;

// ---------------------------------------------------------------------------- 2.1 free-body diagrams

function weightOf(rng: Rng): GenOutput {
  const m = rng.pick([2, 5, 8, 12, 15, 20, 25, 40, 60, 75]);
  const what = rng.pick(THINGS);
  return {
    prompt: `${G_NOTE} A ${what} has a mass of ${q(m, 'kg')}. What is its weight? Give your answer to 1 decimal place.`,
    parts: [rounded(m * G, 1, 'N')],
    hints: ['weight = mass × g'],
    solution: [`$F_g = mg = ${m} \\times 9.81 = ${num(m * G, 1)}$ N`],
  };
}

function normalWithPush(rng: Rng): GenOutput {
  const m = rng.int(4, 30);
  const what = rng.pick(THINGS);
  const W = m * G;
  const down = rng.chance(0.5);
  const P = down ? rng.int(2, 12) * 5 : Math.max(5, Math.floor((W * rng.float(0.2, 0.7, 1)) / 5) * 5);
  const N = down ? W + P : W - P;
  return {
    prompt: `${G_NOTE} A ${what} of mass ${q(m, 'kg')} rests on a level floor. ${down ? `A worker pushes straight down on it with a force of ${q(P, 'N')}` : `A rope pulls straight up on it with a force of ${q(P, 'N')}, which is not enough to lift it`}. What is the normal force of the floor on the ${what}? Give your answer to 1 decimal place.`,
    parts: [rounded(N, 1, 'N')],
    hints: [`The ${what} is at rest, so the forces up balance the forces down.`, 'Find the weight first: $F_g = mg$.'],
    solution: [
      `Weight: $F_g = mg = ${m} \\times 9.81 = ${num(W, 2)}$ N.`,
      `The ${what} does not accelerate, so the forces up equal the forces down.`,
      down ? `$F_N = F_g + ${P} = ${num(W, 2)} + ${P} = ${num(N, 1)}$ N` : `$F_N + ${P} = F_g$, so $F_N = ${num(W, 2)} - ${P} = ${num(N, 1)}$ N`,
    ],
  };
}

function stacked(rng: Rng): GenOutput {
  const top = rng.int(2, 12);
  const bottom = rng.int(5, 25);
  return {
    prompt: `${G_NOTE} ${An(top)} ${q(top, 'kg')} box rests on top of ${an(bottom)} ${q(bottom, 'kg')} box, which rests on a level floor. Find the normal force of the lower box on the upper box, and the normal force of the floor on the lower box, each to 1 decimal place.`,
    parts: [rounded(top * G, 1, 'N', 'On the upper box'), rounded((top + bottom) * G, 1, 'N', 'From the floor')],
    hints: ['Each box is at rest, so the forces on it balance.', 'The floor holds up both boxes.'],
    solution: [
      `Upper box: $F_N = mg = ${top} \\times 9.81 = ${num(top * G, 1)}$ N.`,
      `Lower box: the floor supports both boxes. $F_N = (${top} + ${bottom}) \\times 9.81 = ${num((top + bottom) * G, 1)}$ N`,
    ],
  };
}

const FBD_IDEAS: Array<Q | Select> = [
  { q: 'A book rests on a level table. Which forces act on the book?', a: 'Its weight downwards and the normal force of the table upwards', w: ['Only its weight', 'Its weight downwards and friction upwards', 'No forces, because it is at rest'], why: 'The Earth pulls the book down and the table pushes it up. The two balance, so the book stays at rest.' },
  { q: 'In which direction does the normal force on an object act?', a: 'Perpendicular to the surface, away from it', w: ['Always straight up', 'Along the surface', 'Towards the centre of the Earth'], why: '"Normal" means perpendicular. A surface can only push straight out from itself.' },
  { q: 'What does a free-body diagram show?', a: 'One object, with an arrow for every force that acts on it', w: ['Every object in the problem, with the forces between them', 'The path that the object follows', 'Only the net force on the object'], why: 'A free-body diagram isolates one object and shows only the forces that act on that object.' },
  { q: 'A crate is dragged along a rough, level floor by a horizontal rope. How many forces act on the crate?', a: 'Four', w: ['Two', 'Three', 'Five'], order: ['Two', 'Three', 'Four', 'Five'], why: 'Its weight, the normal force, the tension in the rope and friction.' },
  { q: 'A ball has been thrown and is moving upwards through the air. Air resistance can be ignored. Which forces act on it?', a: 'Only its weight', w: ['Its weight and the force of the throw', 'Only the force of the throw', 'No forces until it starts to fall'], why: 'The hand stopped pushing when the ball left it. Only gravity acts during the flight.' },
];

// ---------------------------------------------------------------------------- 2.1 net force along a line

const COMPASS: Array<[string, string]> = [['East', 'West'], ['North', 'South']];
const low = (s: string) => s.toLowerCase();

function netTwo(rng: Rng): GenOutput {
  const dir = rng.pick(COMPASS);
  const a = rng.int(5, 60);
  let b = rng.int(5, 60);
  if (a === b) b += 7;
  const net = a - b;
  return {
    prompt: `Two forces act on a cart along one line: ${q(a, 'N')} [${dir[0][0]}] and ${q(b, 'N')} [${dir[1][0]}]. What is the net force on the cart?`,
    parts: [numPart(Math.abs(net), { label: 'Size', suffix: 'N' }), direction(dir, net > 0)],
    hints: [`Take ${low(dir[0])} as positive and ${low(dir[1])} as negative, then add.`],
    solution: [`$F_{\\text{net}} = ${a} - ${b} = ${net}$ N`, `The net force is ${q(Math.abs(net), 'N')} [${dir[net > 0 ? 0 : 1][0]}].`],
  };
}

function netThree(rng: Rng): GenOutput {
  const dir = rng.pick(COMPASS);
  const pull = rng.int(6, 24) * 5;
  const push = rng.int(2, 12) * 5;
  let f = rng.int(4, 40) * 5;
  if (f === pull + push) f += 15;
  const net = pull + push - f;
  return {
    prompt: `A sled is pulled ${low(dir[0])} with a force of ${q(pull, 'N')} and pushed ${low(dir[0])} from behind with a force of ${q(push, 'N')}. A friction force of ${q(f, 'N')} acts ${low(dir[1])}. What is the net force on the sled?`,
    parts: [numPart(Math.abs(net), { label: 'Size', suffix: 'N' }), direction(dir, net > 0)],
    hints: [`Take ${low(dir[0])} as positive. Forces that point ${low(dir[1])} are negative.`],
    solution: [`$F_{\\text{net}} = ${pull} + ${push} - ${f} = ${net}$ N`, `The net force is ${q(Math.abs(net), 'N')} [${dir[net > 0 ? 0 : 1][0]}].`],
  };
}

function balanced(rng: Rng): GenOutput {
  const dir = rng.pick(COMPASS);
  const F = rng.int(4, 40) * 5;
  const what = rng.pick(THINGS);
  return {
    prompt: `A ${what} is pushed ${low(dir[0])} across a level floor with a horizontal force of ${q(F, 'N')}. It moves at a steady velocity. What is the friction force on the ${what}?`,
    parts: [numPart(F, { label: 'Size', suffix: 'N' }), direction(dir, false)],
    hints: ['A steady velocity means no acceleration, so the net force is zero.', 'Friction acts against the motion.'],
    solution: ['The velocity is steady, so the net force is zero and the forces balance.', `The friction force is ${q(F, 'N')} [${dir[1][0]}].`],
  };
}

function liftNet(rng: Rng): GenOutput {
  const m = rng.pick([20, 50, 80, 120, 150, 200, 250]);
  const W = m * G;
  const up = rng.chance(0.6);
  const T = near(W * (up ? rng.float(1.1, 1.4, 2) : rng.float(0.7, 0.92, 2)), 10);
  const net = T - W;
  return {
    prompt: `${G_NOTE} A crane cable pulls upwards on ${an(m)} ${q(m, 'kg')} load with a force of ${q(T, 'N')}. Find the size of the net force on the load, to 1 decimal place, and its direction.`,
    parts: [rounded(Math.abs(net), 1, 'N', 'Size'), direction(['Up', 'Down'], net > 0)],
    hints: ['Two forces act on the load: the pull of the cable upwards and its weight downwards.', 'Find the weight first: $F_g = mg$.'],
    solution: [`Weight: $F_g = mg = ${m} \\times 9.81 = ${num(W, 2)}$ N, downwards.`, `Taking up as positive: $F_{\\text{net}} = ${T} - ${num(W, 2)} = ${num(net, 1)}$ N`, `The net force is ${q(num(Math.abs(net), 1), 'N')} ${net > 0 ? 'upwards' : 'downwards'}.`],
  };
}

// ---------------------------------------------------------------------------- 2.2 Newton's second law

function secondSimple(rng: Rng): GenOutput {
  const m = rng.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
  const a = rng.pick([0.5, 1.5, 2, 2.5, 3, 4, 6]);
  const F = clean(m * a);
  const kind = rng.int(0, 2);
  if (kind === 0) {
    return {
      prompt: `A net force of ${q(F, 'N')} acts on ${an(m)} ${q(m, 'kg')} trolley. What is its acceleration?`,
      parts: [numPart(a, { suffix: ACC })],
      hints: ['$a = \\dfrac{F_{\\text{net}}}{m}$'],
      solution: [`$a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{${F}}{${m}} = ${a}\\ \\text{m/s}^2$`],
    };
  }
  if (kind === 1) {
    return {
      prompt: `${An(m)} ${q(m, 'kg')} trolley has an acceleration of $${a}\\ \\text{m/s}^2$. What is the net force on it?`,
      parts: [numPart(F, { suffix: 'N' })],
      hints: ['$F_{\\text{net}} = ma$'],
      solution: [`$F_{\\text{net}} = ma = ${m} \\times ${a} = ${F}$ N`],
    };
  }
  return {
    prompt: `A net force of ${q(F, 'N')} gives a trolley an acceleration of $${a}\\ \\text{m/s}^2$. What is the mass of the trolley?`,
    parts: [numPart(m, { suffix: 'kg' })],
    hints: ['$m = \\dfrac{F_{\\text{net}}}{a}$'],
    solution: [`$m = \\dfrac{F_{\\text{net}}}{a} = \\dfrac{${F}}{${a}} = ${m}$ kg`],
  };
}

function secondNet(rng: Rng): GenOutput {
  const m = rng.pick([4, 5, 8, 10, 20, 25, 40, 50]);
  const a = rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
  const f = rng.int(2, 12) * 5;
  const F = clean(m * a + f);
  const what = rng.pick(THINGS);
  if (rng.chance(0.5)) {
    return {
      prompt: `${An(m)} ${q(m, 'kg')} ${what} is pushed along a level floor with a horizontal force of ${q(F, 'N')}. A friction force of ${q(f, 'N')} acts on it. What is its acceleration?`,
      parts: [numPart(a, { suffix: ACC })],
      hints: ['Find the net force first: the push minus the friction.', '$a = \\dfrac{F_{\\text{net}}}{m}$'],
      solution: [`$F_{\\text{net}} = ${F} - ${f} = ${clean(F - f)}$ N`, `$a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{${clean(F - f)}}{${m}} = ${a}\\ \\text{m/s}^2$`],
    };
  }
  return {
    prompt: `A friction force of ${q(f, 'N')} acts on ${an(m)} ${q(m, 'kg')} ${what} as it slides along a level floor. What horizontal push gives the ${what} an acceleration of $${a}\\ \\text{m/s}^2$?`,
    parts: [numPart(F, { suffix: 'N' })],
    hints: ['The net force needed is $ma$.', 'The push must supply the net force and also cancel the friction.'],
    solution: [`$F_{\\text{net}} = ma = ${m} \\times ${a} = ${clean(m * a)}$ N`, `Push $= F_{\\text{net}} + \\text{friction} = ${clean(m * a)} + ${f} = ${F}$ N`],
  };
}

function brakingForce(rng: Rng): GenOutput {
  const m = rng.pick([800, 1000, 1200, 1500, 2000]);
  const u = rng.pick([10, 12, 15, 20, 24, 30]);
  const d = rng.pick([20, 25, 30, 40, 50, 60, 75]);
  const a = (u * u) / (2 * d);
  return {
    prompt: `A car of mass ${q(m, 'kg')} travelling at ${q(u, 'm/s')} brakes steadily and stops in ${q(d, 'm')}. Find the size of its acceleration, to 2 decimal places, and the size of the net braking force, to the nearest newton.`,
    parts: [rounded(a, 2, ACC, 'Acceleration'), rounded(m * a, 0, 'N', 'Force')],
    hints: ['The time is not known: use $v^2 = u^2 + 2ad$ with $v = 0$.', 'Then $F_{\\text{net}} = ma$.'],
    solution: [`$0 = ${u}^2 + 2a \\times ${d}$, so the size of the acceleration is $\\dfrac{${u * u}}{${2 * d}} = ${num(a, 2)}\\ \\text{m/s}^2$.`, `$F_{\\text{net}} = ma = ${m} \\times ${num(a, 4)} = ${num(m * a, 0)}$ N`],
  };
}

function fromRestForce(rng: Rng): GenOutput {
  const m = rng.pick([2, 4, 5, 8, 10, 20]);
  const a = rng.pick([1.5, 2, 2.5, 3, 4]);
  const t = rng.pick([2, 3, 4, 5, 6]);
  const F = clean(m * a);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} cart is at rest on a level, frictionless track. A steady horizontal force of ${q(F, 'N')} acts on it for ${q(t, 's')}. Find its speed at the end of that time, and how far it has moved.`,
    parts: [numPart(clean(a * t), { label: 'Speed', suffix: 'm/s' }), numPart(clean(0.5 * a * t * t), { label: 'Distance', suffix: 'm' })],
    hints: ['Find the acceleration from $a = \\dfrac{F_{\\text{net}}}{m}$.', 'From rest, $v = at$ and $d = \\tfrac12at^2$.'],
    solution: [`$a = \\dfrac{${F}}{${m}} = ${a}\\ \\text{m/s}^2$`, `$v = at = ${a} \\times ${t} = ${clean(a * t)}$ m/s`, `$d = \\tfrac12at^2 = \\tfrac12 \\times ${a} \\times ${t}^2 = ${clean(0.5 * a * t * t)}$ m`],
  };
}

const LAW_IDEAS: Q[] = [
  { q: 'A puck slides across frictionless ice at a steady velocity. What is the net force on it?', a: 'Zero', w: ['A small force forwards', 'A force equal to its weight', 'A force that depends on its speed'], why: 'By the first law, an object keeps a steady velocity when the net force on it is zero.' },
  { q: 'A truck and a small car collide. How does the force of the truck on the car compare with the force of the car on the truck?', a: 'They are equal in size and opposite in direction', w: ['The force of the truck on the car is larger', 'The force of the car on the truck is larger', 'It depends on which one was moving faster'], why: 'By the third law, the two forces of an interaction are always equal and opposite. The car is damaged more because its mass is smaller.' },
  { q: 'A book rests on a table. The Earth pulls down on the book. What is the other force of this interaction pair?', a: 'The book pulls up on the Earth', w: ['The table pushes up on the book', 'The book pushes down on the table', 'Friction between the book and the table'], why: 'An interaction pair acts between the same two objects: the Earth on the book, and the book on the Earth.' },
  { q: 'The net force on an object doubles while its mass stays the same. What happens to its acceleration?', a: 'It doubles', w: ['It halves', 'It stays the same', 'It becomes four times as large'], why: 'Acceleration is proportional to the net force: $a = \\dfrac{F_{\\text{net}}}{m}$.' },
  { q: 'The same net force acts on two objects. Object B has three times the mass of object A. How does the acceleration of B compare with that of A?', a: 'It is one third as large', w: ['It is three times as large', 'It is the same', 'It is one ninth as large'], why: 'For the same net force, acceleration is inversely proportional to mass.' },
];

// ---------------------------------------------------------------------------- 2.2 forces in vertical motion

const LOADS = [50, 80, 120, 200, 400, 500, 650, 800];

function tensionSteady(rng: Rng): GenOutput {
  const m = rng.pick(LOADS);
  const up = rng.chance(0.5);
  return {
    prompt: `${G_NOTE} A cable ${up ? 'raises' : 'lowers'} ${an(m)} ${q(m, 'kg')} load at a steady velocity. What is the tension in the cable? Give your answer to 1 decimal place.`,
    parts: [rounded(m * G, 1, 'N')],
    hints: ['A steady velocity means that the net force is zero.', 'The tension balances the weight.'],
    solution: ['The velocity is steady, so the net force is zero, whichever way the load moves.', `$F_T = mg = ${m} \\times 9.81 = ${num(m * G, 1)}$ N`],
  };
}

function tensionAccel(rng: Rng): GenOutput {
  const m = rng.pick(LOADS);
  const a = rng.pick([0.5, 1, 1.5, 2, 2.5]);
  const up = rng.chance(0.5);
  const T = m * (G + (up ? a : -a));
  return {
    prompt: `${G_NOTE} A lift and its passengers have a total mass of ${q(m, 'kg')}. The lift accelerates ${up ? 'upwards' : 'downwards'} at $${a}\\ \\text{m/s}^2$. What is the tension in its cable? Give your answer to 1 decimal place.`,
    parts: [rounded(T, 1, 'N')],
    hints: ['Take up as positive: $F_T - mg = ma$.', up ? 'The tension must hold the lift up and also accelerate it.' : 'A downward acceleration is negative.'],
    solution: [`Taking up as positive, $F_T - mg = ma$ with $a = ${up ? a : -a}\\ \\text{m/s}^2$.`, `$F_T = m(g + a) = ${m} \\times (9.81 ${up ? '+' : '-'} ${a}) = ${num(T, 1)}$ N`],
  };
}

function accelFromTension(rng: Rng): GenOutput {
  const m = rng.pick(LOADS);
  const target = rng.pick([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5]);
  const T = Math.round(m * (G + target));
  const a = T / m - G;
  return {
    prompt: `${G_NOTE} A cable pulls upwards with a force of ${q(T, 'N')} on ${an(m)} ${q(m, 'kg')} load. Taking up as positive, what is the acceleration of the load? Give your answer to 2 decimal places, with a minus sign if it is negative.`,
    parts: [rounded(a, 2, ACC)],
    hints: ['Find the net force: the tension minus the weight.', '$a = \\dfrac{F_{\\text{net}}}{m}$'],
    solution: [`Weight: $mg = ${m} \\times 9.81 = ${num(m * G, 2)}$ N.`, `$F_{\\text{net}} = ${T} - ${num(m * G, 2)} = ${num(T - m * G, 2)}$ N`, `$a = \\dfrac{${num(T - m * G, 2)}}{${m}} = ${num(a, 2)}\\ \\text{m/s}^2$`],
  };
}

function scaleReading(rng: Rng): GenOutput {
  const m = rng.int(45, 90);
  const a = rng.pick([0.5, 1, 1.5, 2, 2.5]);
  const up = rng.chance(0.5);
  const N = m * (G + (up ? a : -a));
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} person stands on a scale in a lift. The lift accelerates ${up ? 'upwards' : 'downwards'} at $${a}\\ \\text{m/s}^2$. What force does the scale read? Give your answer to 1 decimal place.`,
    parts: [rounded(N, 1, 'N')],
    hints: ['The scale reads the normal force on the person.', 'Take up as positive: $F_N - mg = ma$.'],
    solution: [`Taking up as positive, $F_N - mg = ma$ with $a = ${up ? a : -a}\\ \\text{m/s}^2$.`, `$F_N = m(g + a) = ${m} \\times (9.81 ${up ? '+' : '-'} ${a}) = ${num(N, 1)}$ N`, `The person's true weight is ${q(num(m * G, 1), 'N')}, so the person feels ${up ? 'heavier' : 'lighter'}.`],
  };
}

// ---------------------------------------------------------------------------- 2.3 static friction

function maxStatic(rng: Rng): GenOutput {
  const m = rng.int(4, 40);
  const mu = rng.pick([0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7]);
  const what = rng.pick(THINGS);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} ${what} rests on a level floor. The coefficient of static friction between them is ${mu}. What is the greatest static friction force the floor can exert on the ${what}? Give your answer to 1 decimal place.`,
    parts: [rounded(mu * m * G, 1, 'N')],
    hints: ['On a level floor the normal force equals the weight: $F_N = mg$.', 'Greatest static friction $= \\mu_s F_N$.'],
    solution: [`$F_N = mg = ${m} \\times 9.81 = ${num(m * G, 2)}$ N`, `Greatest static friction $= \\mu_s F_N = ${mu} \\times ${num(m * G, 2)} = ${num(mu * m * G, 1)}$ N`],
  };
}

function willItMove(rng: Rng): GenOutput {
  const m = rng.int(4, 40);
  const mu = rng.pick([0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7]);
  const what = rng.pick(THINGS);
  const max = mu * m * G;
  const moves = rng.chance(0.5);
  const P = Math.max(1, Math.round(max * (moves ? rng.float(1.1, 1.5, 2) : rng.float(0.5, 0.9, 2))));
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} ${what} rests on a level floor. The coefficient of static friction between them is ${mu}. A horizontal push of ${q(P, 'N')} is applied to the ${what}. Find the greatest static friction force, to 1 decimal place, and decide whether the ${what} moves.`,
    parts: [rounded(max, 1, 'N', 'Greatest static friction'), part(fixedChoice(['Yes', 'No'], moves ? 0 : 1), { label: 'Does it move?' })],
    hints: ['Greatest static friction $= \\mu_s mg$ on a level floor.', 'The object starts to move only if the push is greater than the greatest static friction.'],
    solution: [
      `Greatest static friction $= \\mu_s mg = ${mu} \\times ${m} \\times 9.81 = ${num(max, 1)}$ N.`,
      moves ? `The push of ${q(P, 'N')} is greater than this, so the ${what} moves.` : `The push of ${q(P, 'N')} is less than this, so the ${what} stays at rest. The static friction on it is only ${q(P, 'N')}, enough to balance the push.`,
    ],
  };
}

function muStatic(rng: Rng): GenOutput {
  const m = rng.int(4, 40);
  const what = rng.pick(THINGS);
  const F = Math.max(2, Math.round(rng.pick([0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7]) * m * G));
  const mu = F / (m * G);
  return {
    prompt: `${G_NOTE} A horizontal force on ${an(m)} ${q(m, 'kg')} ${what} at rest on a level floor is slowly increased. The ${what} just starts to move when the force reaches ${q(F, 'N')}. What is the coefficient of static friction? Give your answer to 2 decimal places.`,
    parts: [rounded(mu, 2, '')],
    hints: ['At the moment it starts to move, the force equals the greatest static friction: $F = \\mu_s F_N$.', 'On a level floor, $F_N = mg$.'],
    solution: [`$F_N = mg = ${m} \\times 9.81 = ${num(m * G, 2)}$ N`, `$\\mu_s = \\dfrac{F}{F_N} = \\dfrac{${F}}{${num(m * G, 2)}} = ${num(mu, 2)}$`],
  };
}

const STATIC_IDEAS: Q[] = [
  { q: 'A box rests on a level floor. You push it sideways with 10 N and it does not move. What is the static friction force on it?', a: '10 N', w: ['0 N', 'More than 10 N', 'Equal to its weight'], why: 'The box is at rest, so the forces balance. Static friction matches the push exactly, up to its greatest value.' },
  { q: 'For the same pair of surfaces, which coefficient is usually larger?', a: 'The coefficient of static friction', w: ['The coefficient of kinetic friction', 'They are always equal', 'It depends on the mass of the object'], why: 'It usually takes more force to start an object sliding than to keep it sliding.' },
  { q: 'What is the unit of a coefficient of friction?', a: 'It has no unit', w: ['N', 'N/kg', 'kg'], order: ['N', 'N/kg', 'kg', 'It has no unit'], why: 'It is a friction force divided by a normal force, so the newtons cancel.' },
  { q: 'The normal force on a box doubles. What happens to the greatest static friction force on it?', a: 'It doubles', w: ['It halves', 'It stays the same', 'It becomes four times as large'], why: 'Greatest static friction $= \\mu_s F_N$, which is proportional to the normal force.' },
];

// ---------------------------------------------------------------------------- 2.3 kinetic friction

const SLIDERS = ['A hockey puck', 'A curling stone', 'A box', 'A sled', 'A book'];

function kineticForce(rng: Rng): GenOutput {
  const m = rng.int(4, 40);
  const mu = rng.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]);
  const what = rng.pick(THINGS);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} ${what} slides across a level floor. The coefficient of kinetic friction between them is ${mu}. What is the friction force on the ${what}? Give your answer to 1 decimal place.`,
    parts: [rounded(mu * m * G, 1, 'N')],
    hints: ['On a level floor the normal force equals the weight.', 'Kinetic friction $= \\mu_k F_N$.'],
    solution: [`$F_N = mg = ${m} \\times 9.81 = ${num(m * G, 2)}$ N`, `$F_f = \\mu_k F_N = ${mu} \\times ${num(m * G, 2)} = ${num(mu * m * G, 1)}$ N`],
  };
}

function accelWithFriction(rng: Rng): GenOutput {
  const m = rng.int(4, 40);
  const mu = rng.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]);
  const what = rng.pick(THINGS);
  const F = near(m * (mu * G + rng.pick([0.5, 1, 1.5, 2, 3])), 5);
  const f = mu * m * G;
  const a = (F - f) / m;
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} ${what} is pushed across a level floor with a horizontal force of ${q(F, 'N')}. The coefficient of kinetic friction is ${mu}. What is the acceleration of the ${what}? Give your answer to 2 decimal places.`,
    parts: [rounded(a, 2, ACC)],
    hints: ['Find the friction force: $F_f = \\mu_k mg$.', 'Then the net force is the push minus the friction, and $a = \\dfrac{F_{\\text{net}}}{m}$.'],
    solution: [`$F_f = \\mu_k mg = ${mu} \\times ${m} \\times 9.81 = ${num(f, 2)}$ N`, `$F_{\\text{net}} = ${F} - ${num(f, 2)} = ${num(F - f, 2)}$ N`, `$a = \\dfrac{${num(F - f, 2)}}{${m}} = ${num(a, 2)}\\ \\text{m/s}^2$`],
  };
}

function slideToStop(rng: Rng): GenOutput {
  const who = rng.pick(SLIDERS);
  const u = rng.pick([2, 3, 4, 5, 6, 8, 10]);
  const mu = rng.pick([0.05, 0.1, 0.15, 0.2, 0.3, 0.4]);
  const a = mu * G;
  const d = (u * u) / (2 * a);
  return {
    prompt: `${G_NOTE} ${who} slides across a level surface with an initial speed of ${q(u, 'm/s')}. The coefficient of kinetic friction is ${mu}, and friction is the only horizontal force. Find the size of its acceleration, to 2 decimal places, and how far it slides before it stops, to 1 decimal place.`,
    parts: [rounded(a, 2, ACC, 'Acceleration'), rounded(d, 1, 'm', 'Distance')],
    hints: ['The net force is the friction, $\\mu_k mg$, so $a = \\mu_k g$. The mass cancels.', 'Then use $v^2 = u^2 + 2ad$ with $v = 0$.'],
    solution: [`$ma = \\mu_k mg$, so the size of the acceleration is $\\mu_k g = ${mu} \\times 9.81 = ${num(a, 2)}\\ \\text{m/s}^2$. The mass is not needed.`, `$0 = ${u}^2 - 2 \\times ${num(a, 4)} \\times d$, so $d = \\dfrac{${u * u}}{${num(2 * a, 3)}} = ${num(d, 1)}$ m`],
  };
}

const KINETIC_IDEAS: Q[] = [
  { q: 'In which direction does kinetic friction act on a sliding box?', a: 'Opposite to the direction in which the box slides', w: ['In the direction in which the box slides', 'Straight up', 'Straight down'], why: 'Kinetic friction always opposes the sliding of one surface over the other.' },
  { q: 'A box slides across a level floor. According to $F_f = \\mu_k F_N$, what happens to the kinetic friction force if the box slides twice as fast?', a: 'It stays the same', w: ['It doubles', 'It halves', 'It becomes four times as large'], why: 'The rule contains only the coefficient and the normal force, not the speed.' },
  { q: 'A box is pushed across a level floor at a steady velocity. How does the push compare with the kinetic friction on the box?', a: 'They are equal in size', w: ['The push is larger', 'The friction is larger', 'It depends on the speed'], why: 'A steady velocity means that the net force is zero.' },
];

// ---------------------------------------------------------------------------- 2.4 inclined planes: components

function alongRamp(rng: Rng): GenOutput {
  const m = rng.int(2, 30);
  const th = rng.pick(ANGLES);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} block rests on a ramp inclined at ${th}° to the horizontal. What is the component of its weight along the ramp? Give your answer to 1 decimal place.`,
    parts: [rounded(m * G * sin(th), 1, 'N')],
    hints: ['Along the ramp, the component of the weight is $mg\\sin\\theta$.'],
    solution: [`$mg\\sin\\theta = ${m} \\times 9.81 \\times \\sin ${th}° = ${num(m * G * sin(th), 1)}$ N`],
  };
}

function rampBoth(rng: Rng): GenOutput {
  const m = rng.int(2, 30);
  const th = rng.pick(ANGLES);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} block rests on a ramp inclined at ${th}° to the horizontal. Find the component of its weight along the ramp, and the normal force of the ramp on the block, each to 1 decimal place.`,
    parts: [rounded(m * G * sin(th), 1, 'N', 'Along the ramp'), rounded(m * G * cos(th), 1, 'N', 'Normal force')],
    hints: ['Along the ramp: $mg\\sin\\theta$.', 'The normal force balances the component of the weight into the ramp: $mg\\cos\\theta$.'],
    solution: [`Along the ramp: $mg\\sin\\theta = ${m} \\times 9.81 \\times \\sin ${th}° = ${num(m * G * sin(th), 1)}$ N.`, `$F_N = mg\\cos\\theta = ${m} \\times 9.81 \\times \\cos ${th}° = ${num(m * G * cos(th), 1)}$ N`],
  };
}

function rampAtRest(rng: Rng): GenOutput {
  const m = rng.int(2, 30);
  const th = rng.pick(ANGLES);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} block stays at rest on a rough ramp inclined at ${th}° to the horizontal. Find the friction force on the block, to 1 decimal place, and the smallest coefficient of static friction that would hold it there, to 2 decimal places.`,
    parts: [rounded(m * G * sin(th), 1, 'N', 'Friction force'), rounded(tan(th), 2, '', 'Smallest coefficient')],
    hints: ['The block is at rest, so the friction balances the component of the weight along the ramp.', 'At the limit, $\\mu_s mg\\cos\\theta = mg\\sin\\theta$, so $\\mu_s = \\tan\\theta$.'],
    solution: [`Friction $= mg\\sin\\theta = ${m} \\times 9.81 \\times \\sin ${th}° = ${num(m * G * sin(th), 1)}$ N, up the ramp.`, `At the limit, $\\mu_s mg\\cos\\theta = mg\\sin\\theta$, so $\\mu_s = \\tan ${th}° = ${num(tan(th), 2)}$`],
  };
}

const INCLINE_IDEAS: Q[] = [
  { q: 'A block rests on a ramp. In which direction does the normal force on it act?', a: 'Perpendicular to the ramp', w: ['Straight up', 'Along the ramp, upwards', 'Straight down'], why: 'A surface pushes straight out from itself, so on a ramp the normal force is tilted.' },
  { q: 'A ramp is made steeper. What happens to the component of a block’s weight along the ramp?', a: 'It increases', w: ['It decreases', 'It stays the same', 'It becomes zero'], why: 'The component along the ramp is $mg\\sin\\theta$, and $\\sin\\theta$ grows as the angle grows.' },
  { q: 'A ramp is made steeper. What happens to the normal force on a block resting on it?', a: 'It decreases', w: ['It increases', 'It stays the same', 'It becomes equal to the weight'], why: 'The normal force is $mg\\cos\\theta$, and $\\cos\\theta$ shrinks as the angle grows.' },
  { q: 'A ramp makes an angle $\\theta$ with the horizontal. Which expression gives the component of a block’s weight along the ramp?', a: '$mg\\sin\\theta$', w: ['$mg\\cos\\theta$', '$mg\\tan\\theta$', '$mg$'], why: 'The component along the ramp is opposite the angle $\\theta$ in the triangle of forces, so it uses the sine.' },
];

// ---------------------------------------------------------------------------- 2.4 inclined planes: motion

function rampFrictionless(rng: Rng): GenOutput {
  const th = rng.pick(ANGLES);
  const what = rng.pick(['A skier', 'A sled', 'A block', 'A cart']);
  return {
    prompt: `${G_NOTE} ${what} slides down a frictionless slope inclined at ${th}° to the horizontal. What is the acceleration? Give your answer to 2 decimal places.`,
    parts: [rounded(G * sin(th), 2, ACC)],
    hints: ['The only force along the slope is the component of the weight, $mg\\sin\\theta$.', '$ma = mg\\sin\\theta$, so the mass cancels.'],
    solution: [`$ma = mg\\sin\\theta$, so $a = g\\sin\\theta = 9.81 \\times \\sin ${th}° = ${num(G * sin(th), 2)}\\ \\text{m/s}^2$`],
  };
}

function rampWithFriction(rng: Rng): GenOutput {
  const th = rng.pick([20, 25, 30, 35, 40]);
  const mu = rng.pick([0.1, 0.15, 0.2, 0.25]);
  const a = G * (sin(th) - mu * cos(th));
  return {
    prompt: `${G_NOTE} A block slides down a ramp inclined at ${th}° to the horizontal. The coefficient of kinetic friction is ${mu}. What is the acceleration of the block? Give your answer to 2 decimal places.`,
    parts: [rounded(a, 2, ACC)],
    hints: ['Down the ramp: $mg\\sin\\theta$. Up the ramp: friction, $\\mu_k F_N$, with $F_N = mg\\cos\\theta$.', 'The mass cancels: $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$.'],
    solution: [`$ma = mg\\sin\\theta - \\mu_k mg\\cos\\theta$, so $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$.`, `$a = 9.81 \\times (\\sin ${th}° - ${mu} \\times \\cos ${th}°) = 9.81 \\times ${num(sin(th) - mu * cos(th), 4)} = ${num(a, 2)}\\ \\text{m/s}^2$`],
  };
}

function rampRun(rng: Rng): GenOutput {
  const th = rng.pick(ANGLES);
  const len = rng.pick([2, 3, 4, 5, 6, 8, 10, 12]);
  const a = G * sin(th);
  const v = Math.sqrt(2 * a * len);
  return {
    prompt: `${G_NOTE} A cart starts from rest and rolls ${q(len, 'm')} down a frictionless ramp inclined at ${th}° to the horizontal. Find its speed at the bottom, to 1 decimal place, and the time it takes, to 2 decimal places.`,
    parts: [rounded(v, 1, 'm/s', 'Speed'), rounded(Math.sqrt((2 * len) / a), 2, 's', 'Time')],
    hints: ['The acceleration is $g\\sin\\theta$.', 'From rest: $v^2 = 2ad$ and $d = \\tfrac12at^2$.'],
    solution: [`$a = g\\sin\\theta = 9.81 \\times \\sin ${th}° = ${num(a, 3)}\\ \\text{m/s}^2$`, `$v = \\sqrt{2ad} = \\sqrt{2 \\times ${num(a, 3)} \\times ${len}} = ${num(v, 1)}$ m/s`, `$t = \\sqrt{\\dfrac{2d}{a}} = \\sqrt{\\dfrac{2 \\times ${len}}{${num(a, 3)}}} = ${num(Math.sqrt((2 * len) / a), 2)}$ s`],
  };
}

function pushUpRamp(rng: Rng): GenOutput {
  const m = rng.int(5, 40);
  const th = rng.pick(ANGLES);
  const mu = rng.pick([0.1, 0.15, 0.2, 0.25, 0.3]);
  const along = m * G * sin(th);
  const f = mu * m * G * cos(th);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} crate is pushed up a ramp inclined at ${th}° to the horizontal, at a steady velocity, by a force parallel to the ramp. The coefficient of kinetic friction is ${mu}. What is the size of the push? Give your answer to 1 decimal place.`,
    parts: [rounded(along + f, 1, 'N')],
    hints: ['At a steady velocity the forces along the ramp balance.', 'The push must balance the component of the weight along the ramp and the friction, which both point down the ramp.'],
    solution: [`Weight along the ramp: $mg\\sin\\theta = ${m} \\times 9.81 \\times \\sin ${th}° = ${num(along, 2)}$ N.`, `Friction: $\\mu_k mg\\cos\\theta = ${mu} \\times ${m} \\times 9.81 \\times \\cos ${th}° = ${num(f, 2)}$ N.`, `Push $= ${num(along, 2)} + ${num(f, 2)} = ${num(along + f, 1)}$ N`],
  };
}

// ---------------------------------------------------------------------------- 2.5 connected objects on a level surface

function train(rng: Rng, tension: boolean): GenOutput {
  const front = rng.int(2, 12);
  const rear = rng.int(2, 12);
  const a = rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
  const F = clean((front + rear) * a);
  const T = clean(rear * a);
  return {
    prompt: `Two blocks on a level, frictionless surface are joined by a light string. A horizontal force of ${q(F, 'N')} pulls the front block, of mass ${q(front, 'kg')}, and the rear block, of mass ${q(rear, 'kg')}, follows. ${tension ? 'Find the acceleration of the blocks and the tension in the string between them.' : 'What is the acceleration of the blocks?'}`,
    parts: tension ? [numPart(a, { label: 'Acceleration', suffix: ACC }), numPart(T, { label: 'Tension', suffix: 'N' })] : [numPart(a, { suffix: ACC })],
    hints: tension ? ['Treat the two blocks as one object for the acceleration.', 'The string is the only horizontal force on the rear block: $F_T = m_{\\text{rear}}a$.'] : ['The blocks move together, so treat them as one object with the total mass.'],
    solution: [`Both blocks together: $a = \\dfrac{F}{m_1 + m_2} = \\dfrac{${F}}{${front} + ${rear}} = ${a}\\ \\text{m/s}^2$`, ...(tension ? [`Rear block alone: $F_T = ma = ${rear} \\times ${a} = ${T}$ N`] : [])],
  };
}

function trainWithFriction(rng: Rng): GenOutput {
  const front = rng.int(2, 12);
  const rear = rng.int(2, 12);
  const mu = rng.pick([0.1, 0.15, 0.2, 0.25]);
  const M = front + rear;
  const F = near(M * (mu * G + rng.pick([0.5, 1, 1.5, 2])), 5);
  const a = F / M - mu * G;
  const T = rear * (a + mu * G);
  return {
    prompt: `${G_NOTE} Two blocks on a level surface are joined by a light string. A horizontal force of ${q(F, 'N')} pulls the front block, of mass ${q(front, 'kg')}, and the rear block, of mass ${q(rear, 'kg')}, follows. The coefficient of kinetic friction for both blocks is ${mu}. Find the acceleration of the blocks, to 2 decimal places, and the tension in the string between them, to 1 decimal place.`,
    parts: [rounded(a, 2, ACC, 'Acceleration'), rounded(T, 1, 'N', 'Tension')],
    hints: ['For both blocks together, the net force is the pull minus the friction on both: $\\mu_k(m_1 + m_2)g$.', 'For the rear block alone: $F_T - \\mu_k m g = ma$.'],
    solution: [
      `Friction on both blocks: $\\mu_k(m_1 + m_2)g = ${mu} \\times ${M} \\times 9.81 = ${num(mu * M * G, 2)}$ N.`,
      `$a = \\dfrac{${F} - ${num(mu * M * G, 2)}}{${M}} = ${num(a, 2)}\\ \\text{m/s}^2$`,
      `Rear block: $F_T = m(a + \\mu_k g) = ${rear} \\times (${num(a, 3)} + ${num(mu * G, 3)}) = ${num(T, 1)}$ N`,
    ],
  };
}

// ---------------------------------------------------------------------------- 2.5 pulleys

function overTheEdge(rng: Rng, tension: boolean): GenOutput {
  const hang = rng.int(1, 8);
  const table = rng.int(2, 12);
  const a = (hang * G) / (hang + table);
  return {
    prompt: `${G_NOTE} ${An(table)} ${q(table, 'kg')} block on a level, frictionless table is joined by a light string over a frictionless pulley to ${an(hang)} ${q(hang, 'kg')} mass that hangs over the edge. The masses are released. ${tension ? 'Find the acceleration of the masses, to 2 decimal places, and the tension in the string, to 1 decimal place.' : 'What is the acceleration of the masses? Give your answer to 2 decimal places.'}`,
    parts: tension ? [rounded(a, 2, ACC, 'Acceleration'), rounded(table * a, 1, 'N', 'Tension')] : [rounded(a, 2, ACC)],
    hints: tension ? ['The weight of the hanging mass accelerates both masses.', 'The string is the only horizontal force on the block on the table: $F_T = m_{\\text{table}}a$.'] : ['The weight of the hanging mass is the only force that drives the motion, and it accelerates both masses.'],
    solution: [`$a = \\dfrac{m_{\\text{hang}}\\,g}{m_{\\text{hang}} + m_{\\text{table}}} = \\dfrac{${hang} \\times 9.81}{${hang} + ${table}} = ${num(a, 2)}\\ \\text{m/s}^2$`, ...(tension ? [`Block on the table: $F_T = ma = ${table} \\times ${num(a, 3)} = ${num(table * a, 1)}$ N`] : [])],
  };
}

function atwood(rng: Rng): GenOutput {
  const light = rng.int(1, 8);
  const heavy = light + rng.int(1, 6);
  const a = ((heavy - light) * G) / (heavy + light);
  const T = (2 * heavy * light * G) / (heavy + light);
  return {
    prompt: `${G_NOTE} Masses of ${q(heavy, 'kg')} and ${q(light, 'kg')} hang from the two ends of a light string that passes over a frictionless pulley. The masses are released. Find the size of their acceleration, to 2 decimal places, and the tension in the string, to 1 decimal place.`,
    parts: [rounded(a, 2, ACC, 'Acceleration'), rounded(T, 1, 'N', 'Tension')],
    hints: ['The net driving force is the difference between the two weights, and it accelerates both masses.', 'For the lighter mass, which moves up: $F_T - mg = ma$.'],
    solution: [`$a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2} = \\dfrac{(${heavy} - ${light}) \\times 9.81}{${heavy} + ${light}} = ${num(a, 2)}\\ \\text{m/s}^2$`, `Lighter mass: $F_T = m(g + a) = ${light} \\times (9.81 + ${num(a, 3)}) = ${num(T, 1)}$ N`],
  };
}

const PULLEY_IDEAS: Q[] = [
  { q: 'Two blocks are joined by a light string that stays taut. How do the sizes of their accelerations compare?', a: 'They are the same', w: ['The lighter block has the larger acceleration', 'The heavier block has the larger acceleration', 'It depends on which block is in front'], why: 'A taut string of fixed length makes the two blocks move together.' },
  { q: 'A light string passes over a frictionless pulley. How does the tension on one side of the pulley compare with the tension on the other side?', a: 'It is the same', w: ['It is larger on the side of the heavier mass', 'It is larger on the side of the lighter mass', 'It is zero on one side'], why: 'A light string over a frictionless pulley has the same tension all along it. The pulley only changes its direction.' },
  { q: 'Two masses of 2 kg each hang from the ends of a string over a frictionless pulley. What is their acceleration when they are released?', a: 'Zero', w: ['$9.81\\ \\text{m/s}^2$', '$4.9\\ \\text{m/s}^2$', '$19.6\\ \\text{m/s}^2$'], why: 'The two weights are equal, so there is no net driving force.' },
];

// ---------------------------------------------------------------------------- 2.6 pulling at an angle

function pullComponent(rng: Rng): GenOutput {
  const F = rng.int(4, 30) * 5;
  const th = rng.pick(ANGLES);
  const horizontal = rng.chance(0.5);
  const value = F * (horizontal ? cos(th) : sin(th));
  return {
    prompt: `A rope pulls on a sled with a force of ${q(F, 'N')} at ${th}° above the horizontal. What is the ${horizontal ? 'horizontal' : 'vertical'} component of the pull? Give your answer to 1 decimal place.`,
    parts: [rounded(value, 1, 'N')],
    hints: ['The horizontal component is $F\\cos\\theta$ and the vertical component is $F\\sin\\theta$.'],
    solution: [`$F_${horizontal ? 'x' : 'y'} = F\\${horizontal ? 'cos' : 'sin'}\\theta = ${F} \\times \\${horizontal ? 'cos' : 'sin'} ${th}° = ${num(value, 1)}$ N`],
  };
}

function pullOnIce(rng: Rng): GenOutput {
  const m = rng.int(10, 60);
  const th = rng.pick(ANGLES);
  const F = near(m * G * rng.float(0.15, 0.6, 2), 5);
  const N = m * G - F * sin(th);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} sled on level, frictionless ice is pulled by a rope with a force of ${q(F, 'N')} at ${th}° above the horizontal. Find the acceleration of the sled, to 2 decimal places, and the normal force of the ice on it, to 1 decimal place.`,
    parts: [rounded((F * cos(th)) / m, 2, ACC, 'Acceleration'), rounded(N, 1, 'N', 'Normal force')],
    hints: ['Only the horizontal component of the pull, $F\\cos\\theta$, accelerates the sled.', 'Vertically the forces balance: $F_N + F\\sin\\theta = mg$.'],
    solution: [`Horizontal: $a = \\dfrac{F\\cos\\theta}{m} = \\dfrac{${F} \\times \\cos ${th}°}{${m}} = ${num((F * cos(th)) / m, 2)}\\ \\text{m/s}^2$`, `Vertical: $F_N = mg - F\\sin\\theta = ${m} \\times 9.81 - ${F} \\times \\sin ${th}° = ${num(N, 1)}$ N`],
  };
}

function pullWithFriction(rng: Rng): GenOutput {
  const g = retry(
    () => {
      const m = rng.int(10, 60);
      const th = rng.pick(ANGLES);
      const mu = rng.pick([0.1, 0.15, 0.2]);
      const F = rng.int(8, 40) * 5;
      const N = m * G - F * sin(th);
      const a = (F * cos(th) - mu * N) / m;
      return { m, th, mu, F, N, a };
    },
    (v) => v.N > 0.4 * v.m * G && v.a > 0.2 && v.a < 5,
  );
  return {
    prompt: `${G_NOTE} ${An(g.m)} ${q(g.m, 'kg')} sled on level snow is pulled by a rope with a force of ${q(g.F, 'N')} at ${g.th}° above the horizontal. The coefficient of kinetic friction is ${g.mu}. Find the normal force on the sled, to 1 decimal place, and its acceleration, to 2 decimal places.`,
    parts: [rounded(g.N, 1, 'N', 'Normal force'), rounded(g.a, 2, ACC, 'Acceleration')],
    hints: ['Vertically: $F_N = mg - F\\sin\\theta$. The rope carries part of the weight.', 'Horizontally: $F\\cos\\theta - \\mu_k F_N = ma$.'],
    solution: [
      `$F_N = mg - F\\sin\\theta = ${g.m} \\times 9.81 - ${g.F} \\times \\sin ${g.th}° = ${num(g.N, 1)}$ N`,
      `Friction: $\\mu_k F_N = ${g.mu} \\times ${num(g.N, 2)} = ${num(g.mu * g.N, 2)}$ N.`,
      `$a = \\dfrac{F\\cos\\theta - \\mu_k F_N}{m} = \\dfrac{${num(g.F * cos(g.th), 2)} - ${num(g.mu * g.N, 2)}}{${g.m}} = ${num(g.a, 2)}\\ \\text{m/s}^2$`,
    ],
  };
}

// ---------------------------------------------------------------------------- 2.6 net force and equilibrium in two dimensions

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15], [7, 24, 25]];

function perpendicularNet(rng: Rng): GenOutput {
  const scale = rng.pick([1, 2, 5, 10]);
  const [x, y, R] = rng.pick(TRIPLES).map((v) => v * scale);
  return {
    prompt: `Two forces act on a crate at right angles: ${q(x, 'N')} east and ${q(y, 'N')} north. What is the size of the net force?`,
    parts: [numPart(R, { suffix: 'N' })],
    hints: ['Forces at right angles add like the two shorter sides of a right triangle.', 'Use the Pythagorean theorem.'],
    solution: [`$F_{\\text{net}} = \\sqrt{${x}^2 + ${y}^2} = \\sqrt{${x * x + y * y}} = ${R}$ N`],
  };
}

function perpendicularAccel(rng: Rng): GenOutput {
  const m = rng.pick([2, 4, 5, 8, 10, 20]);
  const x = rng.int(4, 40);
  const y = rng.int(4, 40);
  const R = Math.hypot(x, y);
  return {
    prompt: `Two horizontal forces act on ${an(m)} ${q(m, 'kg')} puck on frictionless ice: ${q(x, 'N')} east and ${q(y, 'N')} north. Find the size of the puck’s acceleration, to 2 decimal places, and its direction as an angle north of east, to 1 decimal place.`,
    parts: [rounded(R / m, 2, ACC, 'Acceleration'), rounded(Math.atan2(y, x) / RAD, 1, '° north of east', 'Angle')],
    hints: ['Find the net force with the Pythagorean theorem, then use $a = \\dfrac{F_{\\text{net}}}{m}$.', 'The acceleration points along the net force: $\\tan\\theta = \\dfrac{\\text{north}}{\\text{east}}$.'],
    solution: [`$F_{\\text{net}} = \\sqrt{${x}^2 + ${y}^2} = ${num(R, 2)}$ N`, `$a = \\dfrac{${num(R, 2)}}{${m}} = ${num(R / m, 2)}\\ \\text{m/s}^2$`, `$\\theta = \\tan^{-1}\\left(\\dfrac{${y}}{${x}}\\right) = ${num(Math.atan2(y, x) / RAD, 1)}°$ north of east`],
  };
}

function hungSign(rng: Rng): GenOutput {
  const m = rng.int(2, 40);
  const th = rng.pick([20, 25, 30, 35, 40, 45, 50, 60]);
  const T = (m * G) / (2 * sin(th));
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} sign hangs at rest from two cables. Each cable makes an angle of ${th}° with the horizontal. What is the tension in each cable? Give your answer to 1 decimal place.`,
    parts: [rounded(T, 1, 'N')],
    hints: ['The sign is in equilibrium, so the upward components of the two tensions balance the weight.', '$2F_T\\sin\\theta = mg$'],
    solution: [`Vertically: $2F_T\\sin\\theta = mg$. The horizontal components cancel each other.`, `$F_T = \\dfrac{mg}{2\\sin\\theta} = \\dfrac{${m} \\times 9.81}{2 \\times \\sin ${th}°} = ${num(T, 1)}$ N`],
  };
}

function pulledAside(rng: Rng): GenOutput {
  const m = rng.int(2, 40);
  const th = rng.pick([10, 15, 20, 25, 30, 35, 40]);
  return {
    prompt: `${G_NOTE} ${An(m)} ${q(m, 'kg')} lamp hangs from a cable. A horizontal rope pulls the lamp to one side and holds it at rest, with the cable at ${th}° to the vertical. Find the tension in the cable and the force in the horizontal rope, each to 1 decimal place.`,
    parts: [rounded((m * G) / cos(th), 1, 'N', 'Cable'), rounded(m * G * tan(th), 1, 'N', 'Rope')],
    hints: ['Vertically: the vertical component of the cable tension balances the weight, $F_T\\cos\\theta = mg$.', 'Horizontally: the rope balances the horizontal component of the cable tension, $F_T\\sin\\theta$.'],
    solution: [`Vertical: $F_T\\cos\\theta = mg$, so $F_T = \\dfrac{${m} \\times 9.81}{\\cos ${th}°} = ${num((m * G) / cos(th), 1)}$ N.`, `Horizontal: rope $= F_T\\sin\\theta = mg\\tan\\theta = ${m} \\times 9.81 \\times \\tan ${th}° = ${num(m * G * tan(th), 1)}$ N`],
  };
}

const EQUILIBRIUM_IDEAS: Q[] = [
  { q: 'An object is in equilibrium. What is the net force on it?', a: 'Zero', w: ['Equal to its weight', 'Equal to the largest force on it', 'It depends on its velocity'], why: 'Equilibrium means that the forces balance in every direction, so the object does not accelerate.' },
  { q: 'Two forces act on an object: 30 N east and 40 N north. A third force keeps the object in equilibrium. What is the size of the third force?', a: '50 N', w: ['70 N', '10 N', '35 N'], order: ['10 N', '35 N', '50 N', '70 N'], why: 'The first two forces have a resultant of $\\sqrt{30^2 + 40^2} = 50$ N. The third force must be equal and opposite to it.' },
  { q: 'A rope pulls on a sled at an angle above the horizontal. What does the vertical component of the pull do to the normal force on the sled?', a: 'It makes the normal force smaller than the weight', w: ['It makes the normal force larger than the weight', 'It does not change the normal force', 'It makes the normal force zero'], why: 'The rope carries part of the weight, so the ground has less to hold up: $F_N = mg - F\\sin\\theta$.' },
];

// ---------------------------------------------------------------------------- 2.7 universal gravitation

const SCI_ASK = `Give your answer in scientific notation to 3 significant digits. ${SCI_TIP}`;
/** A value m × 10^e with a two-figure m, and how it is written. */
function sciPick(rng: Rng, lo: number, hi: number, e: number): { v: number; tex: string } {
  const m = rng.float(lo, hi, 1);
  return { v: Number(`${m}e${e}`), tex: `${m.toFixed(1)} \\times 10^{${e}}` };
}

function labGravity(rng: Rng): GenOutput {
  const m1 = rng.pick([5, 20, 50, 80, 100, 150, 200]);
  const m2 = rng.pick([5, 20, 50, 80, 100, 150, 200]);
  const r = rng.pick([0.2, 0.5, 1.5, 2, 4]);
  const F = (BIG_G * m1 * m2) / (r * r);
  return {
    prompt: `${BIG_G_NOTE} Two spheres of mass ${q(m1, 'kg')} and ${q(m2, 'kg')} have their centres ${q(r, 'm')} apart. What is the gravitational force between them? ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['$F_g = \\dfrac{Gm_1m_2}{r^2}$', 'Square the distance before you divide.'],
    solution: [`$F_g = \\dfrac{Gm_1m_2}{r^2} = \\dfrac{6.67 \\times 10^{-11} \\times ${m1} \\times ${m2}}{${r}^2} = ${sciTex(F)}$ N`],
  };
}

function planetGravity(rng: Rng): GenOutput {
  const M = sciPick(rng, 1.2, 9.8, rng.int(23, 25));
  const moon = rng.chance(0.5);
  const m = moon ? sciPick(rng, 1.2, 9.8, rng.int(20, 22)) : { v: rng.pick([500, 800, 1200, 2500, 4000]), tex: '' };
  const r = sciPick(rng, 1.2, 9.8, moon ? 8 : 7);
  const F = (BIG_G * M.v * m.v) / (r.v * r.v);
  const mTex = moon ? `$${m.tex}\\ \\text{kg}$` : q(m.v, 'kg');
  return {
    prompt: `${BIG_G_NOTE} A planet has a mass of $${M.tex}\\ \\text{kg}$. A ${moon ? 'moon' : 'satellite'} of mass ${mTex} orbits with its centre $${r.tex}\\ \\text{m}$ from the centre of the planet. What is the gravitational force between them? ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['$F_g = \\dfrac{Gm_1m_2}{r^2}$, with $r$ measured between the centres.', 'On a calculator, enter each number in scientific notation and square the distance.'],
    solution: [`$F_g = \\dfrac{Gm_1m_2}{r^2} = \\dfrac{6.67 \\times 10^{-11} \\times ${M.tex} \\times ${moon ? m.tex : m.v}}{(${r.tex})^2} = ${sciTex(F)}$ N`],
  };
}

function altitudeGravity(rng: Rng): GenOutput {
  const M = sciPick(rng, 1.2, 9.8, 24);
  const R = sciPick(rng, 3.0, 9.5, 6);
  const h = sciPick(rng, 1.0, 9.5, rng.pick([5, 6]));
  const m = rng.pick([500, 800, 1200, 2500, 4000]);
  const r = R.v + h.v;
  const F = (BIG_G * M.v * m) / (r * r);
  return {
    prompt: `${BIG_G_NOTE} A planet has a mass of $${M.tex}\\ \\text{kg}$ and a radius of $${R.tex}\\ \\text{m}$. ${An(m)} ${q(m, 'kg')} satellite orbits at a height of $${h.tex}\\ \\text{m}$ above the planet’s surface. What is the gravitational force on the satellite? ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['The distance $r$ is measured from the centre of the planet: add the height to the radius.', '$F_g = \\dfrac{Gm_1m_2}{r^2}$'],
    solution: [`$r = ${R.tex} + ${h.tex} = ${sciTex(r)}$ m, measured from the centre of the planet.`, `$F_g = \\dfrac{6.67 \\times 10^{-11} \\times ${M.tex} \\times ${m}}{(${sciTex(r)})^2} = ${sciTex(F)}$ N`],
  };
}

function massFromGravity(rng: Rng): GenOutput {
  const M = sciPick(rng, 1.2, 9.8, rng.int(23, 25));
  const m = rng.pick([500, 800, 1200, 2500, 4000]);
  const r = sciPick(rng, 1.2, 9.8, 7);
  // The force is given to three figures, and the mass is worked out from that.
  const F = Number(((BIG_G * M.v * m) / (r.v * r.v)).toPrecision(3));
  const found = (F * r.v * r.v) / (BIG_G * m);
  return {
    prompt: `${BIG_G_NOTE} ${An(m)} ${q(m, 'kg')} probe orbits a planet with its centre $${r.tex}\\ \\text{m}$ from the centre of the planet. The gravitational force on the probe is ${q(F, 'N')}. What is the mass of the planet? ${SCI_ASK}`,
    parts: [sciPart(found, 3, 'kg')],
    hints: ['Rearrange $F_g = \\dfrac{GMm}{r^2}$ for the mass of the planet.', '$M = \\dfrac{F_g r^2}{Gm}$'],
    solution: [`$M = \\dfrac{F_g r^2}{Gm} = \\dfrac{${F} \\times (${r.tex})^2}{6.67 \\times 10^{-11} \\times ${m}} = ${sciTex(found)}$ kg`],
  };
}

// ---------------------------------------------------------------------------- 2.7 the inverse square law

const START_FORCES = [36, 72, 90, 144, 180, 360, 720];
const DISTANCE_CHANGES: Array<{ k: number; says: string; tex: string }> = [
  { k: 2, says: 'doubled', tex: '2' },
  { k: 3, says: 'made three times as large', tex: '3' },
  { k: 0.5, says: 'halved', tex: '\\tfrac12' },
];

function distanceChange(rng: Rng): GenOutput {
  const F0 = rng.pick(START_FORCES);
  const c = rng.pick(DISTANCE_CHANGES);
  const F = clean(F0 / (c.k * c.k));
  return {
    prompt: `The gravitational force between two objects is ${q(F0, 'N')}. The distance between their centres is ${c.says}, and the masses stay the same. What is the force now?`,
    parts: [numPart(F, { suffix: 'N' })],
    hints: ['The force is proportional to $\\dfrac{1}{r^2}$.', `Divide the force by the square of the factor by which the distance changes.`],
    solution: [`The distance is multiplied by $${c.tex}$, so the force is divided by $${c.tex === '\\tfrac12' ? '\\left(\\tfrac12\\right)' : c.tex}^2 = ${clean(c.k * c.k)}$.`, `$F = \\dfrac{${F0}}{${clean(c.k * c.k)}} = ${F}$ N`],
  };
}

function bothChange(rng: Rng): GenOutput {
  const F0 = rng.pick(START_FORCES);
  const c = rng.pick(DISTANCE_CHANGES);
  // Not the pair that leaves the force as it was (four times the mass at twice the distance).
  const a = rng.pick([2, 3, 4].filter((x) => x !== c.k * c.k));
  const F = clean((F0 * a) / (c.k * c.k));
  return {
    prompt: `The gravitational force between two objects is ${q(F0, 'N')}. The mass of one object is made ${a === 2 ? 'twice' : a === 3 ? 'three times' : 'four times'} as large, and the distance between their centres is ${c.says}. What is the force now?`,
    parts: [numPart(F, { suffix: 'N' })],
    hints: ['The force is proportional to each mass and to $\\dfrac{1}{r^2}$.', 'Multiply by the mass factor, then divide by the square of the distance factor.'],
    solution: [`The larger mass multiplies the force by $${a}$. The change in distance divides it by $${clean(c.k * c.k)}$.`, `$F = ${F0} \\times \\dfrac{${a}}{${clean(c.k * c.k)}} = ${F}$ N`],
  };
}

const INVERSE_IDEAS: Q[] = [
  { q: 'The distance between the centres of two objects is doubled. What happens to the gravitational force between them?', a: 'It becomes one quarter as large', w: ['It becomes half as large', 'It doubles', 'It becomes four times as large'], why: 'The force is proportional to $\\dfrac{1}{r^2}$, and $2^2 = 4$.' },
  { q: 'The mass of one of two objects is doubled. What happens to the gravitational force between them?', a: 'It doubles', w: ['It becomes four times as large', 'It halves', 'It stays the same'], why: 'The force is proportional to each of the masses.' },
  { q: 'The masses of both objects are doubled. What happens to the gravitational force between them?', a: 'It becomes four times as large', w: ['It doubles', 'It stays the same', 'It becomes eight times as large'], why: 'The force is proportional to the product of the masses, and $2 \\times 2 = 4$.' },
  { q: 'The distance between the centres of two objects is halved. What happens to the gravitational force between them?', a: 'It becomes four times as large', w: ['It doubles', 'It halves', 'It becomes one quarter as large'], why: 'Dividing the distance by 2 divides $r^2$ by 4, so the force is multiplied by 4.' },
  { q: 'The Earth pulls on the Moon with a gravitational force. How does the force of the Moon on the Earth compare with it?', a: 'It is equal in size', w: ['It is much smaller, because the Moon has less mass', 'It is larger', 'The Moon does not pull on the Earth'], why: 'The two forces are an interaction pair. The rule $F_g = \\dfrac{Gm_1m_2}{r^2}$ gives one size for both.' },
];

// ---------------------------------------------------------------------------- 2.8 gravitational field strength

const FIELDS = [1.62, 3.71, 8.87, 10.4, 11.2, 24.8];

function fieldFromWeight(rng: Rng): GenOutput {
  const g = rng.pick(FIELDS);
  const m = rng.pick([2, 5, 8, 10, 20, 50]);
  const W = clean(m * g);
  if (rng.chance(0.5)) {
    return {
      prompt: `On the surface of a planet, ${an(m)} ${q(m, 'kg')} instrument has a weight of ${q(W, 'N')}. What is the gravitational field strength there?`,
      parts: [numPart(g, { suffix: 'N/kg' })],
      hints: ['$g = \\dfrac{F_g}{m}$'],
      solution: [`$g = \\dfrac{F_g}{m} = \\dfrac{${W}}{${m}} = ${g}$ N/kg`],
    };
  }
  return {
    prompt: `On the surface of a planet, the gravitational field strength is $${g}$ N/kg. What is the weight of ${an(m)} ${q(m, 'kg')} instrument there?`,
    parts: [numPart(W, { suffix: 'N' })],
    hints: ['$F_g = mg$'],
    solution: [`$F_g = mg = ${m} \\times ${g} = ${W}$ N`],
  };
}

function weightElsewhere(rng: Rng): GenOutput {
  const g = rng.pick(FIELDS);
  const m = rng.pick([2, 5, 8, 10, 20, 50, 80]);
  const WE = clean(m * G);
  return {
    prompt: `On Earth, where $g = 9.81$ N/kg, a rover has a weight of ${q(WE, 'N')}. What is its weight on a planet where $g = ${g}$ N/kg? Give your answer to 1 decimal place.`,
    parts: [rounded(m * g, 1, 'N')],
    hints: ['Find the mass first. It is the same everywhere.', 'Then use the new value of $g$.'],
    solution: [`$m = \\dfrac{F_g}{g} = \\dfrac{${WE}}{9.81} = ${m}$ kg`, `On the planet: $F_g = mg = ${m} \\times ${g} = ${num(m * g, 1)}$ N`],
  };
}

function surfaceField(rng: Rng): GenOutput {
  const p = retry(
    () => {
      const M = sciPick(rng, 1.2, 9.8, rng.int(23, 25));
      const R = sciPick(rng, 2.0, 9.5, 6);
      return { M, R, g: (BIG_G * M.v) / (R.v * R.v) };
    },
    (v) => v.g > 1 && v.g < 30,
  );
  return {
    prompt: `${BIG_G_NOTE} A planet has a mass of $${p.M.tex}\\ \\text{kg}$ and a radius of $${p.R.tex}\\ \\text{m}$. What is the gravitational field strength at its surface? Give your answer to 2 decimal places.`,
    parts: [rounded(p.g, 2, 'N/kg')],
    hints: ['$g = \\dfrac{GM}{r^2}$, with $r$ equal to the radius of the planet at its surface.'],
    solution: [`$g = \\dfrac{GM}{r^2} = \\dfrac{6.67 \\times 10^{-11} \\times ${p.M.tex}}{(${p.R.tex})^2} = ${num(p.g, 2)}$ N/kg`],
  };
}

// ---------------------------------------------------------------------------- 2.8 field strength and distance

const EARTH = { M: 5.97e24, R: 6.37e6, note: 'Take the mass of the Earth as $5.97 \\times 10^{24}\\ \\text{kg}$ and its radius as $6.37 \\times 10^{6}\\ \\text{m}$.' };

function fieldAtHeight(rng: Rng): GenOutput {
  const h = sciPick(rng, 1.0, 9.5, rng.pick([5, 6, 6]));
  const r = EARTH.R + h.v;
  const g = (BIG_G * EARTH.M) / (r * r);
  return {
    prompt: `${BIG_G_NOTE} ${EARTH.note} What is the gravitational field strength at a height of $${h.tex}\\ \\text{m}$ above the Earth’s surface? Give your answer to 2 decimal places.`,
    parts: [rounded(g, 2, 'N/kg')],
    hints: ['Measure $r$ from the centre of the Earth: add the height to the radius.', '$g = \\dfrac{GM}{r^2}$'],
    solution: [`$r = 6.37 \\times 10^{6} + ${h.tex} = ${sciTex(r)}$ m`, `$g = \\dfrac{GM}{r^2} = \\dfrac{6.67 \\times 10^{-11} \\times 5.97 \\times 10^{24}}{(${sciTex(r)})^2} = ${num(g, 2)}$ N/kg`],
  };
}

function fieldInRadii(rng: Rng): GenOutput {
  const k = rng.int(1, 4);
  const m = rng.pick([200, 500, 800, 1200, 2500]);
  const g = G / ((k + 1) * (k + 1));
  return {
    prompt: `At the Earth’s surface, $g = 9.81$ N/kg. ${An(m)} ${q(m, 'kg')} satellite is at a height of ${k === 1 ? 'one Earth radius' : `${['two', 'three', 'four'][k - 2]} Earth radii`} above the surface. Find the gravitational field strength there, to 2 decimal places, and the weight of the satellite, to 1 decimal place.`,
    parts: [rounded(g, 2, 'N/kg', 'Field strength'), rounded(m * g, 1, 'N', 'Weight')],
    hints: ['Distances are measured from the centre of the Earth. The surface is already one Earth radius from the centre.', 'The field strength is proportional to $\\dfrac{1}{r^2}$.'],
    solution: [`The satellite is $${k} + 1 = ${k + 1}$ Earth radii from the centre, so $g$ is divided by $${k + 1}^2 = ${(k + 1) * (k + 1)}$.`, `$g = \\dfrac{9.81}{${(k + 1) * (k + 1)}} = ${num(g, 2)}$ N/kg`, `$F_g = mg = ${m} \\times ${num(g, 4)} = ${num(m * g, 1)}$ N`],
  };
}

const FIELD_IDEAS: Q[] = [
  { q: 'What does gravitational field strength measure?', a: 'The gravitational force on each kilogram of mass', w: ['The mass of each newton of weight', 'The speed of a falling object', 'The total weight of a planet'], why: 'Field strength is force per unit mass: $g = \\dfrac{F_g}{m}$, in N/kg.' },
  { q: 'How does the gravitational field strength of a planet change as you move away from it?', a: 'It decreases with the square of the distance from the planet’s centre', w: ['It stays the same', 'It decreases in proportion to the distance from the surface', 'It increases with distance'], why: '$g = \\dfrac{GM}{r^2}$, with $r$ measured from the centre of the planet.' },
  { q: 'An astronaut travels from the Earth to the Moon. What happens to the astronaut’s mass and weight?', a: 'The mass stays the same and the weight decreases', w: ['Both decrease', 'The mass decreases and the weight stays the same', 'Both stay the same'], why: 'Mass is the amount of matter and does not depend on place. Weight is $mg$, and $g$ is smaller on the Moon.' },
  { q: 'At a distance of two Earth radii from the centre of the Earth, how does $g$ compare with its value at the surface?', a: 'It is one quarter as large', w: ['It is half as large', 'It is the same', 'It is one eighth as large'], why: 'The distance from the centre has doubled, and $g$ is proportional to $\\dfrac{1}{r^2}$.' },
  { q: 'Which unit is equivalent to N/kg?', a: 'm/s²', w: ['kg/N', 'N·m', 'm/s'], why: 'A newton is a kg·m/s², so N/kg is m/s². The field strength is also the acceleration of free fall.' },
];

export const DYNAMICS_SKILLS: SkillDef[] = [
  skill({ id: 'p20-fbd', name: 'Free-body diagrams and the normal force', description: 'Name the forces on an object, and find its weight and the normal force on it when the forces balance.', outcomes: ['20-B1'], lessonId: L(1), calculator: true, gen: bank([either(weightOf, fromBank(FBD_IDEAS, ['Draw the object alone, with one arrow for each force that acts on it.'])), normalWithPush, stacked], ['Draw a free-body diagram: one object, with every force that acts on it.']) }),
  skill({ id: 'p20-net-force', name: 'Net force along a line', description: 'Find the net force of forces along one line, with its direction, and use balanced forces to find an unknown force.', outcomes: ['20-B1'], lessonId: L(1), calculator: true, gen: bank([netTwo, either(netThree, balanced), liftNet], ['Choose a positive direction, give each force a sign, and add.']) }),
  skill({ id: 'p20-second-law', name: 'Newton’s laws', description: 'Apply Newton’s three laws, and use the second law with several forces and with the equations of motion.', outcomes: ['20-B1'], lessonId: L(2), calculator: true, gen: bank([either(secondSimple, fromBank(LAW_IDEAS, ['First law: no net force, no change in velocity. Third law: forces come in equal and opposite pairs, on different objects.'])), secondNet, either(brakingForce, fromRestForce)], ['$F_{\\text{net}} = ma$: find the net force first.']) }),
  skill({ id: 'p20-vertical-forces', name: 'Forces in vertical motion', description: 'Find the tension in a cable or the reading of a scale when an object accelerates up or down.', outcomes: ['20-B1'], lessonId: L(2), calculator: true, gen: bank([tensionSteady, tensionAccel, either(accelFromTension, scaleReading)], ['Take up as positive: the upward force minus the weight equals $ma$.']) }),
  skill({ id: 'p20-static-friction', name: 'Static friction', description: 'Find the greatest static friction force, decide whether an object starts to move, and find a coefficient of static friction.', outcomes: ['20-B1'], lessonId: L(3), calculator: true, gen: bank([either(maxStatic, fromBank(STATIC_IDEAS, ['Static friction matches the applied force, up to a greatest value of $\\mu_s F_N$.'])), willItMove, muStatic], ['Greatest static friction $= \\mu_s F_N$']) }),
  skill({ id: 'p20-kinetic-friction', name: 'Kinetic friction', description: 'Find a kinetic friction force and the acceleration or stopping distance of an object that slides with friction.', outcomes: ['20-B1'], lessonId: L(3), calculator: true, gen: bank([either(kineticForce, fromBank(KINETIC_IDEAS, ['Kinetic friction opposes the sliding, with a size of $\\mu_k F_N$.'])), accelWithFriction, slideToStop], ['Kinetic friction $= \\mu_k F_N$']) }),
  skill({ id: 'p20-incline-components', name: 'Weight on an inclined plane', description: 'Resolve a weight into components along and into a ramp, and find the normal force and the friction that holds an object at rest.', outcomes: ['20-B1'], lessonId: L(4), calculator: true, gen: bank([either(alongRamp, fromBank(INCLINE_IDEAS, ['Along the ramp: $mg\\sin\\theta$. Into the ramp: $mg\\cos\\theta$.'])), rampBoth, rampAtRest], ['Along the ramp: $mg\\sin\\theta$. Into the ramp: $mg\\cos\\theta$.']) }),
  skill({ id: 'p20-incline-motion', name: 'Motion on an inclined plane', description: 'Find the acceleration of an object on a ramp with and without friction, and the force needed to push it up the ramp.', outcomes: ['20-B1'], lessonId: L(4), calculator: true, gen: bank([rampFrictionless, rampWithFriction, either(rampRun, pushUpRamp)], ['Add the forces along the ramp, then use $F_{\\text{net}} = ma$.']) }),
  skill({ id: 'p20-connected', name: 'Connected objects', description: 'Find the acceleration of two objects joined by a string on a level surface, and the tension in the string.', outcomes: ['20-B1'], lessonId: L(5), calculator: true, gen: bank([(rng) => train(rng, false), (rng) => train(rng, true), trainWithFriction], ['Treat the objects as one system for the acceleration, then look at one object alone for the tension.']) }),
  skill({ id: 'p20-pulley', name: 'Objects joined over a pulley', description: 'Find the acceleration and the tension for a hanging mass that pulls a block along a table, and for two hanging masses.', outcomes: ['20-B1'], lessonId: L(5), calculator: true, gen: bank([either((rng) => overTheEdge(rng, false), fromBank(PULLEY_IDEAS, ['A light string has the same tension all along it, and the objects it joins have the same size of acceleration.'])), (rng) => overTheEdge(rng, true), atwood], ['The net driving force accelerates the total mass.']) }),
  skill({ id: 'p20-pull-angle', name: 'A force at an angle', description: 'Resolve a pull at an angle, and find the normal force and the acceleration it gives, with and without friction.', outcomes: ['20-B1'], lessonId: L(6), calculator: true, gen: bank([pullComponent, pullOnIce, pullWithFriction], ['Resolve the pull into horizontal and vertical components, and treat each direction on its own.']) }),
  skill({ id: 'p20-forces-2d', name: 'Net force and equilibrium in two dimensions', description: 'Add perpendicular forces, find the acceleration they give, and find the tensions that hold an object in equilibrium.', outcomes: ['20-B1'], lessonId: L(6), calculator: true, gen: bank([either(perpendicularNet, fromBank(EQUILIBRIUM_IDEAS, ['In equilibrium the forces balance in every direction.'])), perpendicularAccel, either(hungSign, pulledAside)], ['Add the components along each direction. In equilibrium each sum is zero.']) }),
  skill({ id: 'p20-gravitation', name: 'Universal gravitation', description: 'Use Newton’s law of universal gravitation to find the force between two masses, with distances measured between centres.', outcomes: ['20-B2'], lessonId: L(7), calculator: true, gen: bank([labGravity, planetGravity, either(altitudeGravity, massFromGravity)], ['$F_g = \\dfrac{Gm_1m_2}{r^2}$']) }),
  skill({ id: 'p20-inverse-square', name: 'The inverse square law', description: 'Predict how the gravitational force changes when the masses or the distance between them change.', outcomes: ['20-B2'], lessonId: L(7), gen: bank([fromBank(INVERSE_IDEAS, ['The force is proportional to each mass and to $\\dfrac{1}{r^2}$.']), distanceChange, bothChange], ['The force is proportional to each mass and to $\\dfrac{1}{r^2}$.']) }),
  skill({ id: 'p20-field', name: 'Gravitational field strength', description: 'Use g = F ÷ m and g = GM ÷ r² to find field strengths and weights on the surfaces of planets.', outcomes: ['20-B2'], lessonId: L(8), calculator: true, gen: bank([fieldFromWeight, weightElsewhere, surfaceField], ['$g = \\dfrac{F_g}{m}$, and at a distance $r$ from the centre of a planet $g = \\dfrac{GM}{r^2}$.']) }),
  skill({ id: 'p20-field-distance', name: 'Field strength and distance', description: 'Find how gravitational field strength falls with distance from the centre of a planet.', outcomes: ['20-B2'], lessonId: L(8), calculator: true, gen: bank([fromBank(FIELD_IDEAS, ['$g = \\dfrac{GM}{r^2}$, with $r$ measured from the centre of the planet.']), fieldAtHeight, fieldInRadii], ['$g = \\dfrac{GM}{r^2}$, with $r$ measured from the centre of the planet.']) }),
];
