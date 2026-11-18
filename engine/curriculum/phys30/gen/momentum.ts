/**
 * Grade 12 Physics, Unit 1, lessons 1.1 and 1.2: momentum and impulse (30-A1). Momentum as a
 * vector along one line, the change in momentum of an object that speeds up, slows down or
 * rebounds, impulse as force × time, and the area under a force-time graph. Every number a
 * question needs is in the question.
 */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, SkillDef } from '../../../types.ts';
import { AXES, An, an, clean, minusIf, positive, rounded, way } from './common.ts';

const L = (n: number) => `p30-1-${n}`;
const P = 'kg·m/s';
const NS = 'N·s';
const NEG = 'Include a minus sign if it is negative.';

// ---------------------------------------------------------------------------- 1.1 momentum

/** Things that move, each with masses (kg) and speeds (m/s) that suit it. */
const BODIES = [
  { name: 'car', ms: [900, 1200, 1500, 1800], vs: [12, 15, 20, 25, 30] },
  { name: 'truck', ms: [4000, 6000, 8000, 12000], vs: [10, 15, 20, 25] },
  { name: 'cyclist', ms: [70, 80, 90], vs: [5, 8, 10, 12] },
  { name: 'runner', ms: [55, 60, 70, 80], vs: [4, 5, 6, 8] },
  { name: 'bowling ball', ms: [5, 6, 7], vs: [4, 6, 8] },
  { name: 'curling stone', ms: [18, 19, 20], vs: [1.5, 2, 2.5, 3] },
];

function body(rng: Rng) {
  const b = rng.pick(BODIES);
  const m = rng.pick(b.ms);
  const v = rng.pick(b.vs);
  return { name: b.name, m, v, p: clean(m * v) };
}

function momentumOf(rng: Rng): GenOutput {
  const b = body(rng);
  const ax = rng.pick(AXES);
  return {
    prompt: `${An(b.m)} ${q(b.m, 'kg')} ${b.name} moves ${ax.pos} at ${q(b.v, 'm/s')}. What is the size of the momentum of the ${b.name}?`,
    parts: [numPart(b.p, { suffix: P })],
    hints: ['momentum = mass × velocity'],
    solution: [`$p = mv = ${b.m} \\times ${b.v} = ${b.p}$ ${P}, directed ${ax.pos}`],
  };
}

const MOMENTUM_IDEAS: Q[] = [
  { q: 'Which of these is a unit of momentum?', a: 'kg·m/s', w: ['kg·m/s²', 'N/m', 'J/s'], why: 'Momentum is mass × velocity, so its unit is the kilogram multiplied by the metre per second.' },
  { q: 'Momentum is a vector. In which direction does the momentum of an object point?', a: 'In the direction of its velocity', w: ['In the direction of its acceleration', 'In the direction of the net force on it', 'Towards the ground'], why: 'Momentum is the mass, which has no direction, multiplied by the velocity, so it points the way the object is moving.' },
  { q: 'A truck and a car move at the same velocity. The truck has four times the mass of the car. How do their momenta compare?', a: 'The truck has four times the momentum of the car', w: ['They have the same momentum', 'The car has four times the momentum of the truck', 'The truck has sixteen times the momentum of the car'], why: 'At the same velocity, momentum is proportional to mass.' },
  { q: 'The speed of a cyclist doubles. What happens to the momentum and to the kinetic energy of the cyclist?', a: 'The momentum doubles, and the kinetic energy becomes four times as large', w: ['Both double', 'Both become four times as large', 'The momentum becomes four times as large, and the kinetic energy doubles'], why: 'Momentum is proportional to the speed, and kinetic energy to the square of the speed.' },
  { q: 'A parked truck and a rolling tennis ball: which has more momentum?', a: 'The tennis ball, because the truck is not moving', w: ['The truck, because it has more mass', 'They have the same momentum', 'Neither has any momentum'], why: 'An object at rest has no momentum, whatever its mass.' },
  { q: 'Two balls of the same mass move at the same speed in opposite directions. What is their total momentum?', a: 'Zero', w: ['Twice the momentum of one ball', 'The momentum of one ball', 'Half the momentum of one ball'], why: 'Momentum is a vector. Equal momenta in opposite directions add to zero.' },
];

/** Balls and other light things, with masses in grams. */
const LIGHT = [
  { name: 'tennis ball', g: 58, vs: [20, 30, 40, 50] },
  { name: 'baseball', g: 145, vs: [20, 30, 40] },
  { name: 'hockey puck', g: 170, vs: [20, 30, 40] },
  { name: 'golf ball', g: 46, vs: [40, 50, 60, 70] },
  { name: 'soccer ball', g: 430, vs: [10, 15, 20, 25] },
  { name: 'arrow', g: 25, vs: [50, 60, 80] },
];

function gramMomentum(rng: Rng): GenOutput {
  const b = rng.pick(LIGHT);
  const v = rng.pick(b.vs);
  const p = (b.g / 1000) * v;
  return {
    prompt: `${An(b.g)} ${q(b.g, 'g')} ${b.name} moves at ${q(v, 'm/s')}. What is the size of its momentum? Give your answer to 2 decimal places.`,
    parts: [rounded(p, 2, P)],
    hints: ['Change the grams to kilograms.', 'momentum = mass × velocity'],
    solution: [`$m = ${b.g}\\ \\text{g} = ${b.g / 1000}$ kg`, `$p = mv = ${b.g / 1000} \\times ${v} = ${num(p, 2)}$ ${P}`],
  };
}

function speedFromMomentum(rng: Rng): GenOutput {
  const b = body(rng);
  return {
    prompt: `${An(b.m)} ${q(b.m, 'kg')} ${b.name} has a momentum of ${q(b.p, P)}. How fast is the ${b.name} moving?`,
    parts: [numPart(b.v, { suffix: 'm/s' })],
    hints: ['Rearrange $p = mv$: the speed is the momentum ÷ the mass.'],
    solution: [`$v = \\dfrac{p}{m} = \\dfrac{${b.p}}{${b.m}} = ${b.v}$ m/s`],
  };
}

function massFromMomentum(rng: Rng): GenOutput {
  const b = body(rng);
  return {
    prompt: `A ${b.name} moving at ${q(b.v, 'm/s')} has a momentum of ${q(b.p, P)}. What is its mass?`,
    parts: [numPart(b.m, { suffix: 'kg' })],
    hints: ['Rearrange $p = mv$: the mass is the momentum ÷ the speed.'],
    solution: [`$m = \\dfrac{p}{v} = \\dfrac{${b.p}}{${b.v}} = ${b.m}$ kg`],
  };
}

/** Two things that can move along one line, with masses (kg) and speeds (m/s). */
const PAIRS = [
  { a: 'car', b: 'truck', ma: [900, 1200, 1500], mb: [4000, 6000, 8000], va: [15, 20, 25, 30], vb: [5, 10, 15] },
  { a: 'runner', b: 'cyclist', ma: [60, 70, 80], mb: [80, 90, 100], va: [4, 5, 6, 8], vb: [5, 8, 10] },
  { a: 'red cart', b: 'blue cart', ma: [0.5, 1, 1.5, 2], mb: [0.5, 1, 2, 3], va: [0.4, 0.6, 0.8, 1.2], vb: [0.3, 0.5, 0.9] },
];

function totalMomentum(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const k = rng.pick(PAIRS);
  const c = retry(
    () => ({ ma: rng.pick(k.ma), mb: rng.pick(k.mb), va: rng.pick(k.va), vb: rng.pick(k.vb) }),
    (t) => clean(t.ma * t.va - t.mb * t.vb) !== 0,
  );
  const pa = clean(c.ma * c.va);
  const pb = clean(c.mb * c.vb);
  const total = clean(pa - pb);
  return {
    prompt: `${positive(ax)} ${An(c.ma)} ${q(c.ma, 'kg')} ${k.a} moves ${ax.pos} at ${q(c.va, 'm/s')}, and ${an(c.mb)} ${q(c.mb, 'kg')} ${k.b} moves ${ax.neg} at ${q(c.vb, 'm/s')}. Find the total momentum of the two. ${minusIf(ax)}`,
    parts: [numPart(total, { suffix: P })],
    hints: ['Find the momentum of each, with a minus sign for the one that moves in the negative direction.', 'Add the two momenta, keeping their signs.'],
    solution: [
      `The ${k.a}: $${c.ma} \\times ${c.va} = ${pa}$ ${P}. The ${k.b}: $${c.mb} \\times (-${c.vb}) = -${pb}$ ${P}.`,
      `Total: $${pa} + (-${pb}) = ${total}$ ${P}, so the total momentum is directed ${way(ax, total)}`,
    ],
  };
}

function matchMomentum(rng: Rng): GenOutput {
  const { mt, vt, mc } = retry(
    () => ({ mt: rng.pick([4000, 6000, 8000]), vt: rng.pick([4, 5, 6, 8, 10]), mc: rng.pick([900, 1200, 1500, 1600]) }),
    (t) => (t.mt * t.vt) / t.mc <= 45,
  );
  const v = (mt * vt) / mc;
  return {
    prompt: `${An(mt)} ${q(mt, 'kg')} truck moves at ${q(vt, 'm/s')}. How fast must ${an(mc)} ${q(mc, 'kg')} car move to have the same size of momentum? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['Find the momentum of the truck first.', 'The speed of the car is that momentum ÷ the mass of the car.'],
    solution: [`Truck: $p = ${mt} \\times ${vt} = ${mt * vt}$ ${P}`, `Car: $v = \\dfrac{p}{m} = \\dfrac{${mt * vt}}{${mc}} = ${num(v, 1)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 1.1 change in momentum

function changeSameWay(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const b = rng.pick(BODIES.slice(0, 4));
  const m = rng.pick(b.ms);
  const [u, v] = rng.sample(b.vs, 2);
  const dp = clean(m * (v - u));
  return {
    prompt: `${positive(ax)} ${An(m)} ${q(m, 'kg')} ${b.name} moving ${ax.pos} ${v > u ? 'speeds up' : 'slows down'} from ${q(u, 'm/s')} to ${q(v, 'm/s')}. Find the change in the momentum of the ${b.name}. ${NEG}`,
    parts: [numPart(dp, { suffix: P })],
    hints: ['change in momentum = final momentum − initial momentum', '$\\Delta p = m(v - u)$'],
    solution: [`$\\Delta p = m(v - u) = ${m} \\times (${v} - ${u}) = ${dp}$ ${P}`],
  };
}

/** Things that bounce, with masses in kilograms. */
const BOUNCERS = [
  { name: 'tennis ball', m: 0.06 },
  { name: 'rubber ball', m: 0.2 },
  { name: 'squash ball', m: 0.024 },
  { name: 'hockey puck', m: 0.17 },
  { name: 'soccer ball', m: 0.43 },
  { name: 'basketball', m: 0.6 },
];

function rebound(rng: Rng): GenOutput {
  const ax = rng.pick([AXES[0], AXES[2]]);
  const b = rng.pick(BOUNCERS);
  const u = rng.pick([8, 10, 12, 15, 20, 25]);
  const v = rng.pick([4, 5, 6, 8, 10, 12, 15, 20].filter((x) => x <= u));
  const dp = clean(b.m * (-v - u));
  return {
    prompt: `${An(b.m)} ${q(b.m, 'kg')} ${b.name} moving ${ax.pos} at ${q(u, 'm/s')} hits a wall and rebounds, moving ${ax.neg} at ${q(v, 'm/s')}. ${positive(ax)} Find the change in the momentum of the ${b.name}. ${NEG}`,
    parts: [numPart(dp, { suffix: P })],
    hints: ['The velocity after the rebound is negative, because the direction has reversed.', '$\\Delta p = m(v - u)$'],
    solution: [`$u = +${u}$ m/s and $v = -${v}$ m/s.`, `$\\Delta p = m(v - u) = ${b.m} \\times (-${v} - ${u}) = ${b.m} \\times (-${u + v}) = ${dp}$ ${P}`],
  };
}

function reboundVertical(rng: Rng): GenOutput {
  const b = rng.pick([BOUNCERS[0], BOUNCERS[1], BOUNCERS[4], BOUNCERS[5]]);
  const u = rng.pick([5, 6, 8, 10]);
  const v = rng.pick([2, 3, 4, 5].filter((x) => x < u));
  const up = rng.chance(0.5);
  const dp = clean(b.m * (u + v) * (up ? 1 : -1));
  return {
    prompt: `${An(b.m)} ${q(b.m, 'kg')} ${b.name} hits the floor moving down at ${q(u, 'm/s')} and leaves it moving up at ${q(v, 'm/s')}. Take ${up ? 'up' : 'down'} as the positive direction. Find the change in the momentum of the ${b.name}. ${NEG}`,
    parts: [numPart(dp, { suffix: P })],
    hints: ['Give each velocity its sign before you subtract.', '$\\Delta p = m(v - u)$'],
    solution: [
      up ? `$u = -${u}$ m/s and $v = +${v}$ m/s.` : `$u = +${u}$ m/s and $v = -${v}$ m/s.`,
      up ? `$\\Delta p = m(v - u) = ${b.m} \\times (${v} - (-${u})) = ${dp}$ ${P}` : `$\\Delta p = m(v - u) = ${b.m} \\times (-${v} - ${u}) = ${dp}$ ${P}`,
      'The change in momentum is directed up, the way the floor pushes',
    ],
  };
}

function velocityAfterChange(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const b = rng.pick([{ name: 'hockey puck', m: 0.17 }, { name: 'soccer ball', m: 0.43 }, { name: 'ball', m: 0.2 }, { name: 'cart', m: 0.5 }, { name: 'cart', m: 2 }]);
  const u = rng.pick([4, 6, 8, 10, 12]);
  const v = rng.pick([-8, -6, -4, -2, 2, 3, 5, 15, 18].filter((x) => x !== u));
  const dp = clean(b.m * (v - u));
  return {
    prompt: `${positive(ax)} ${An(b.m)} ${q(b.m, 'kg')} ${b.name} moves ${ax.pos} at ${q(u, 'm/s')}. A force then changes its momentum by ${q(dp, P)}. Find its velocity afterwards. ${minusIf(ax)}`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['Find the momentum at the start, then add the change to it.', 'The velocity afterwards is the new momentum ÷ the mass.'],
    solution: [
      `Momentum at the start: $${b.m} \\times ${u} = ${clean(b.m * u)}$ ${P}`,
      `Momentum afterwards: $${clean(b.m * u)} ${dp < 0 ? '-' : '+'} ${Math.abs(dp)} = ${clean(b.m * v)}$ ${P}`,
      `$v = \\dfrac{${clean(b.m * v)}}{${b.m}} = ${v}$ m/s, so the ${b.name} moves ${way(ax, v)}`,
    ],
  };
}

const CHANGE_IDEAS: Q[] = [
  { q: 'A rubber ball hits a wall at 10 m/s and rebounds at 10 m/s. A lump of clay of the same mass hits the wall at 10 m/s and sticks. Which has the greater change in momentum?', a: 'The ball: its change is twice that of the clay', w: ['The clay, because it stops', 'They have the same change', 'Neither has any change in momentum'], why: 'The clay goes from $mv$ to zero, a change of size $mv$. The ball goes from $mv$ to $-mv$, a change of size $2mv$.' },
  { q: 'A car drives around a bend at a steady speed. Is its momentum constant?', a: 'No, because the direction of its velocity is changing', w: ['Yes, because its speed is steady', 'Yes, because its mass is constant', 'No, because its kinetic energy is changing'], why: 'Momentum is a vector. A change in direction is a change in momentum, even at a steady speed.' },
  { q: 'A 0.5 kg ball moving east at 4 m/s is hit, and then moves west at 4 m/s. With east as the positive direction, what is the change in its momentum?', a: '−4 kg·m/s', w: ['0 kg·m/s', '+4 kg·m/s', '−2 kg·m/s'], order: ['−4 kg·m/s', '−2 kg·m/s', '0 kg·m/s', '+4 kg·m/s'], why: '$\\Delta p = m(v - u) = 0.5 \\times (-4 - 4) = -4$ kg·m/s. The speed is the same, but the velocity has reversed.' },
  { q: 'The change in momentum of an object is directed west. What can you say for certain?', a: 'The net force on the object was directed west', w: ['The object is now moving west', 'The object was moving west before', 'The object has stopped'], why: 'A change in momentum points the way the net force acted. The object may still be moving east, only more slowly.' },
];

// ---------------------------------------------------------------------------- 1.2 impulse

function impulseOf(rng: Rng): GenOutput {
  const F = rng.pick([20, 50, 80, 120, 250, 400, 600]);
  const t = rng.pick([0.2, 0.5, 1.5, 2, 4, 5]);
  const k = rng.pick(['a cart', 'a sled', 'a boat', 'a crate on ice']);
  return {
    prompt: `A steady force of ${q(F, 'N')} acts on ${k} for ${q(t, 's')}. What impulse does the force give?`,
    parts: [numPart(clean(F * t), { suffix: NS })],
    hints: ['impulse = force × the time the force acts'],
    solution: [`Impulse $= F\\Delta t = ${F} \\times ${t} = ${clean(F * t)}$ ${NS}`],
  };
}

const IMPULSE_IDEAS: Q[] = [
  { q: 'What does the impulse of the net force on an object equal?', a: 'The change in its momentum', w: ['Its momentum', 'The change in its kinetic energy', 'Its acceleration'], why: 'From Newton’s second law, $F\\Delta t = m(v - u)$: the impulse of the net force equals the change in momentum.' },
  { q: 'Why does an airbag reduce injuries in a crash?', a: 'It makes the stop take longer, so the force is smaller for the same change in momentum', w: ['It reduces the change in momentum of the passenger', 'It reduces the impulse on the passenger', 'It makes the stop take a shorter time'], why: 'The passenger must lose the same momentum either way. A longer time means a smaller force, because $F = \\dfrac{\\Delta p}{\\Delta t}$.' },
  { q: 'A golfer "follows through", keeping the club on the ball for as long as possible. Why does the ball leave faster?', a: 'The force acts for a longer time, so the impulse is greater', w: ['The force becomes smaller, so less energy is wasted', 'The mass of the ball becomes smaller', 'The impulse is the same, but it acts more smoothly'], why: 'Impulse is force × time. A longer contact gives the ball a greater change in momentum.' },
  { q: 'Which of these is the same as 1 N·s?', a: '1 kg·m/s', w: ['1 kg·m/s²', '1 J', '1 W'], why: '1 N is 1 kg·m/s², so 1 N·s is 1 kg·m/s: the unit of impulse is the unit of momentum.' },
  { q: 'An egg dropped on a cushion does not break, but an egg dropped from the same height on concrete does. The change in momentum is the same. What is different?', a: 'The cushion stops the egg over a longer time, so the force is smaller', w: ['The cushion gives the egg a smaller impulse', 'The egg hits the cushion more slowly', 'The concrete gives the egg a greater change in momentum'], why: 'Both stops need the same impulse. Spread over a longer time, the same impulse needs a smaller force.' },
  { q: 'The same impulse is given to a light cart and to a heavy cart, both at rest. Which has the greater momentum afterwards?', a: 'They have the same momentum', w: ['The light cart', 'The heavy cart', 'It depends on how long the force acted'], why: 'Impulse equals the change in momentum, whatever the mass. The light cart moves faster, but its momentum is the same.' },
];

/** Balls hit from rest: the mass in kilograms, leaving speeds (m/s) and contact times (ms). */
const STRUCK = [
  { name: 'soccer ball', m: 0.43, vs: [20, 25, 30], ms: [8, 10, 12], by: 'A boot kicks' },
  { name: 'golf ball', m: 0.046, vs: [50, 60, 70], ms: [0.5], by: 'A club hits' },
  { name: 'hockey puck', m: 0.17, vs: [30, 35, 40], ms: [10, 20, 25], by: 'A stick hits' },
];

function struckFromRest(rng: Rng): GenOutput {
  const b = rng.pick(STRUCK);
  const v = rng.pick(b.vs);
  const ms = rng.pick(b.ms);
  const dp = b.m * v;
  const F = dp / (ms / 1000);
  return {
    prompt: `${b.by} ${an(b.m)} ${q(b.m, 'kg')} ${b.name} that is at rest. The ${b.name} leaves at ${q(v, 'm/s')}, and the contact lasts ${q(ms, 'ms')}. What is the size of the average force on the ${b.name}? Give your answer to the nearest newton.`,
    parts: [rounded(F, 0, 'N')],
    hints: ['Change the milliseconds to seconds: 1 ms = 0.001 s.', 'The impulse equals the change in momentum, so $F = \\dfrac{m(v - u)}{\\Delta t}$.'],
    solution: [`$\\Delta p = m(v - u) = ${b.m} \\times (${v} - 0) = ${num(dp, 3)}$ ${P}`, `$\\Delta t = ${ms}\\ \\text{ms} = ${ms / 1000}$ s`, `$F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{${num(dp, 3)}}{${ms / 1000}} = ${num(F, 0)}$ N`],
  };
}

/** Balls hit straight back: the speeds before and after (m/s) and contact times (ms). */
const RETURNED = [
  { name: 'baseball', m: 0.145, us: [30, 35, 40], vs: [40, 45, 50], ms: [1, 1.5, 2], by: 'a bat' },
  { name: 'tennis ball', m: 0.058, us: [20, 25, 30], vs: [30, 40, 50], ms: [4, 5], by: 'a racket' },
  { name: 'squash ball', m: 0.024, us: [20, 30], vs: [30, 40], ms: [2, 4], by: 'a racket' },
];

function hitBack(rng: Rng): GenOutput {
  const b = rng.pick(RETURNED);
  const u = rng.pick(b.us);
  const v = rng.pick(b.vs);
  const ms = rng.pick(b.ms);
  const dp = b.m * (u + v);
  const F = dp / (ms / 1000);
  return {
    prompt: `${An(b.m)} ${q(b.m, 'kg')} ${b.name} moving at ${q(u, 'm/s')} is hit straight back by ${b.by}, and leaves at ${q(v, 'm/s')}. The contact lasts ${q(ms, 'ms')}. What is the size of the average force on the ${b.name}? Give your answer to the nearest newton.`,
    parts: [rounded(F, 0, 'N')],
    hints: ['Take the direction the ball leaves in as positive, so the velocity before is negative.', 'Change the milliseconds to seconds, then use $F = \\dfrac{m(v - u)}{\\Delta t}$.'],
    solution: [
      `With the direction the ball leaves in as positive, $u = -${u}$ m/s and $v = +${v}$ m/s.`,
      `$\\Delta p = m(v - u) = ${b.m} \\times (${v} - (-${u})) = ${num(dp, 3)}$ ${P}`,
      `$F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{${num(dp, 3)}}{${ms / 1000}} = ${num(F, 0)}$ N`,
    ],
  };
}

function stoppingTime(rng: Rng): GenOutput {
  const m = rng.pick([800, 1000, 1200, 1500]);
  const v = rng.pick([10, 15, 20, 25, 30]);
  const t = rng.pick([2, 2.5, 4, 5, 8]);
  const F = clean((m * v) / t);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} car moving at ${q(v, 'm/s')} brakes with a steady net force of ${q(F, 'N')}. How long does it take to stop?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['The car must lose all of its momentum.', 'The impulse equals the change in momentum, so the time is the change in momentum ÷ the force.'],
    solution: [`The car loses $mv = ${m} \\times ${v} = ${m * v}$ ${P} of momentum.`, `$\\Delta t = \\dfrac{\\Delta p}{F} = \\dfrac{${m * v}}{${F}} = ${t}$ s`],
  };
}

function velocityAfterForce(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const c = retry(
    () => ({ m: rng.pick([0.5, 1, 2, 4]), u: rng.pick([2, 3, 4, 5, 6]), F: rng.pick([1, 2, 3, 4, 6, 8]), t: rng.pick([1, 2, 3, 4, 5]) }),
    (x) => Math.abs(x.u - (x.F * x.t) / x.m) <= 12,
  );
  const J = c.F * c.t;
  const v = clean(c.u - J / c.m);
  return {
    prompt: `${positive(ax)} ${An(c.m)} ${q(c.m, 'kg')} cart moves ${ax.pos} at ${q(c.u, 'm/s')}. A steady net force of ${q(c.F, 'N')} directed ${ax.neg} then acts on it for ${q(c.t, 's')}. Find its velocity at the end of that time. ${minusIf(ax)}`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['The force is in the negative direction, so the impulse is negative.', '$F\\Delta t = m(v - u)$, so $v = u + \\dfrac{F\\Delta t}{m}$.'],
    solution: [`Impulse: $F\\Delta t = -${c.F} \\times ${c.t} = -${J}$ ${NS}`, `$v = u + \\dfrac{F\\Delta t}{m} = ${c.u} + \\dfrac{-${J}}{${c.m}} = ${v}$ m/s`],
  };
}

function crashForces(rng: Rng): GenOutput {
  const m = rng.pick([60, 70, 80]);
  const v = rng.pick([10, 12, 15, 20]);
  const soft = rng.pick([0.2, 0.25, 0.4]);
  const hard = rng.pick([0.01, 0.02, 0.025]);
  const dp = m * v;
  return {
    prompt: `In a crash test, ${an(m)} ${q(m, 'kg')} dummy moving at ${q(v, 'm/s')} is brought to rest. With an airbag the stop takes ${q(soft, 's')}, and without one it takes ${q(hard, 's')}. Find the size of the average force on the dummy in each case.`,
    parts: [numPart(clean(dp / soft), { suffix: 'N', label: 'With the airbag' }), numPart(clean(dp / hard), { suffix: 'N', label: 'Without it' })],
    hints: ['The change in momentum is the same in both stops.', 'average force = change in momentum ÷ time'],
    solution: [
      `The dummy loses $mv = ${m} \\times ${v} = ${dp}$ ${P} of momentum in both stops.`,
      `With the airbag: $F = \\dfrac{${dp}}{${soft}} = ${clean(dp / soft)}$ N.`,
      `Without it: $F = \\dfrac{${dp}}{${hard}} = ${clean(dp / hard)}$ N, which is ${num(soft / hard, 1)} times as large`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.2 force-time graphs

/** A force-time graph through the given points. */
function ftGraph(points: Array<[number, number]>, o: { xStep: number; yStep: number; caption: string; xLabel?: string }): Figure {
  const xMax = points[points.length - 1][0];
  const top = Math.max(...points.map((p) => p[1]));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: xMax + o.xStep, yMin: 0, yMax: top + o.yStep, xStep: o.xStep, yStep: o.yStep, xLabel: o.xLabel ?? 'Time (s)', yLabel: 'Force (N)' },
    polylines: [{ points }],
    caption: o.caption,
  };
}
const FT_INTRO = 'The graph shows the net force on a cart against time.';
const FT_HINT = 'The impulse is the area under a force-time graph.';
const FT_CAPTION = 'Force-time graph of a cart';

function ftRect(rng: Rng): GenOutput {
  const F = rng.pick([10, 20, 30, 40, 50]);
  const t = rng.pick([2, 3, 4, 5, 6]);
  return {
    figure: ftGraph([[0, F], [t, F], [t, 0]], { xStep: 1, yStep: 10, caption: FT_CAPTION }),
    prompt: `${FT_INTRO} What impulse does the force give the cart?`,
    parts: [numPart(F * t, { suffix: NS })],
    hints: [FT_HINT, 'The area is a rectangle: the force × the time.'],
    solution: [`Area of the rectangle: $${F} \\times ${t} = ${F * t}$ ${NS}`],
  };
}

function ftTriangle(rng: Rng): GenOutput {
  const F = rng.pick([20, 30, 40, 60]);
  const T = rng.pick([2, 4, 6]);
  const peak = rng.int(1, T - 1);
  return {
    figure: ftGraph([[0, 0], [peak, F], [T, 0]], { xStep: 1, yStep: 10, caption: FT_CAPTION }),
    prompt: `${FT_INTRO} What impulse does the force give the cart?`,
    parts: [numPart((F * T) / 2, { suffix: NS })],
    hints: [FT_HINT, 'The area is a triangle: half the base × the height.'],
    solution: [`Area of the triangle: $\\dfrac{1}{2} \\times ${T} \\times ${F} = ${(F * T) / 2}$ ${NS}`],
  };
}

function ftSpeed(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const T = rng.pick([2, 4, 6]);
      return { F: rng.pick([20, 40, 60, 80]), T, peak: rng.int(1, T - 1), m: rng.pick([2, 4, 5, 8, 10]) };
    },
    (x) => Number.isInteger(((x.F * x.T) / 2 / x.m) * 10) && (x.F * x.T) / 2 / x.m <= 12,
  );
  const J = (c.F * c.T) / 2;
  const v = clean(J / c.m);
  return {
    figure: ftGraph([[0, 0], [c.peak, c.F], [c.T, 0]], { xStep: 1, yStep: 10, caption: FT_CAPTION }),
    prompt: `${FT_INTRO} The cart has a mass of ${q(c.m, 'kg')} and starts at rest. Find the impulse the force gives the cart, and the speed of the cart at the end.`,
    parts: [numPart(J, { suffix: NS, label: 'Impulse' }), numPart(v, { suffix: 'm/s', label: 'Speed' })],
    hints: [FT_HINT, 'The impulse equals the change in momentum: $F\\Delta t = m(v - u)$, with $u = 0$.'],
    solution: [`Impulse: area of the triangle $= \\dfrac{1}{2} \\times ${c.T} \\times ${c.F} = ${J}$ ${NS}`, `$v = \\dfrac{\\text{impulse}}{m} = \\dfrac{${J}}{${c.m}} = ${v}$ m/s`],
  };
}

function ftStruck(rng: Rng): GenOutput {
  const b = rng.pick([{ name: 'tennis ball', m: 0.058, by: 'a racket' }, { name: 'golf ball', m: 0.046, by: 'a club' }, { name: 'hockey puck', m: 0.17, by: 'a stick' }]);
  const F = rng.pick([200, 300, 400, 500, 600]);
  const t1 = rng.pick([1, 2]);
  const t2 = t1 + rng.pick([2, 4]);
  const t3 = t2 + rng.pick([1, 2]);
  const area = (F * (t3 + (t2 - t1))) / 2;
  const J = clean(area / 1000);
  const v = J / b.m;
  return {
    figure: ftGraph([[0, 0], [t1, F], [t2, F], [t3, 0]], { xStep: 1, yStep: 100, xLabel: 'Time (ms)', caption: `Force-time graph of a ${b.name}` }),
    prompt: `The graph shows the force of ${b.by} on ${an(b.m)} ${q(b.m, 'kg')} ${b.name} that starts at rest. The time is in milliseconds. Find the impulse on the ${b.name}, in newton seconds, and the speed at which it leaves, to 1 decimal place.`,
    parts: [numPart(J, { suffix: NS, label: 'Impulse' }), rounded(v, 1, 'm/s', 'Speed')],
    hints: [FT_HINT, 'The area is a trapezoid: half the sum of the parallel sides × the height. Change the milliseconds to seconds.', 'The speed is the impulse ÷ the mass.'],
    solution: [
      `The parallel sides are ${t3} ms and ${t2 - t1} ms long, and the height is ${F} N.`,
      `Area: $\\dfrac{1}{2} \\times (${t3} + ${t2 - t1}) \\times ${F} = ${area}$ N·ms $= ${J}$ ${NS}`,
      `$v = \\dfrac{\\text{impulse}}{m} = \\dfrac{${J}}{${b.m}} = ${num(v, 1)}$ m/s`,
    ],
  };
}

function ftBraking(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const t1 = rng.pick([2, 3, 4]);
      return { m: rng.pick([800, 1000, 1200, 1500]), u: rng.pick([20, 25, 30]), F: rng.pick([2000, 3000, 4000, 6000]), t1, t2: t1 + rng.pick([2, 4]) };
    },
    (x) => x.u - (x.F * x.t1 + (x.F * (x.t2 - x.t1)) / 2) / x.m >= 1,
  );
  const J = c.F * c.t1 + (c.F * (c.t2 - c.t1)) / 2;
  const v = c.u - J / c.m;
  return {
    figure: ftGraph([[0, c.F], [c.t1, c.F], [c.t2, 0]], { xStep: 1, yStep: 1000, caption: 'Force-time graph of the braking force on a car' }),
    prompt: `The graph shows the size of the braking force on ${an(c.m)} ${q(c.m, 'kg')} car that is moving at ${q(c.u, 'm/s')} when the brakes go on. Find the size of the impulse of the braking force, and the speed of the car at the end, to 1 decimal place.`,
    parts: [numPart(J, { suffix: NS, label: 'Impulse' }), rounded(v, 1, 'm/s', 'Speed')],
    hints: [FT_HINT, 'Split the area into a rectangle and a triangle.', 'The braking force takes momentum away: the car loses the impulse ÷ its mass in speed.'],
    solution: [
      `Rectangle: $${c.F} \\times ${c.t1} = ${c.F * c.t1}$ ${NS}. Triangle: $\\dfrac{1}{2} \\times ${c.t2 - c.t1} \\times ${c.F} = ${(c.F * (c.t2 - c.t1)) / 2}$ ${NS}.`,
      `Impulse: $${c.F * c.t1} + ${(c.F * (c.t2 - c.t1)) / 2} = ${J}$ ${NS}, against the motion.`,
      `Speed lost: $\\dfrac{${J}}{${c.m}} = ${num(J / c.m, 2)}$ m/s, so $v = ${c.u} - ${num(J / c.m, 2)} = ${num(v, 1)}$ m/s`,
    ],
  };
}

export const MOMENTUM_SKILLS: SkillDef[] = [
  skill({ id: 'p30-momentum', name: 'Momentum', description: 'Calculate the momentum of an object, a speed or a mass from a momentum, and the total momentum of objects that move along one line.', outcomes: ['30-A1'], lessonId: L(1), calculator: true, gen: bank([either(momentumOf, fromBank(MOMENTUM_IDEAS, ['Momentum is mass × velocity. It is a vector, in the direction of the velocity.'])), either(gramMomentum, speedFromMomentum, massFromMomentum), either(totalMomentum, matchMomentum)], ['momentum = mass × velocity: $p = mv$, with the mass in kilograms']) }),
  skill({ id: 'p30-momentum-change', name: 'Change in momentum', description: 'Find a change in momentum, with its sign, when an object speeds up, slows down or rebounds.', outcomes: ['30-A1'], lessonId: L(1), calculator: true, gen: bank([changeSameWay, rebound, either(reboundVertical, velocityAfterChange, fromBank(CHANGE_IDEAS, ['Momentum is a vector: a change in direction is a change in momentum.']))], ['change in momentum = final momentum − initial momentum: $\\Delta p = m(v - u)$, with a sign for each direction']) }),
  skill({ id: 'p30-impulse', name: 'Impulse', description: 'Use impulse = force × time = change in momentum to find an impulse, an average force, a time or a velocity.', outcomes: ['30-A1'], lessonId: L(2), calculator: true, gen: bank([either(impulseOf, fromBank(IMPULSE_IDEAS, ['The impulse of the net force equals the change in momentum: $F\\Delta t = \\Delta p$.'])), either(struckFromRest, hitBack), either(stoppingTime, velocityAfterForce, crashForces)], ['impulse = force × time = change in momentum: $F\\Delta t = m(v - u)$']) }),
  skill({ id: 'p30-ft-graph', name: 'Force-time graphs', description: 'Find an impulse from the area under a force-time graph, and the change in velocity it causes.', outcomes: ['30-A1'], lessonId: L(2), calculator: true, gen: bank([either(ftRect, ftTriangle), ftSpeed, either(ftStruck, ftBraking)], ['The impulse is the area under a force-time graph, and it equals the change in momentum']) }),
];
