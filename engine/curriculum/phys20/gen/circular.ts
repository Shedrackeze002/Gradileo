/**
 * Grade 11 Physics, Unit 3, lessons 3.1 to 3.3: circular motion (20-C1). Period, frequency and
 * speed round a circle, centripetal acceleration and force, cars on curves and vertical circles,
 * and the speed and period of satellites. Every number a question needs is in the question,
 * including g = 9.81 m/s² and G = 6.67 × 10⁻¹¹ N·m²/kg², and the masses and radii of planets are
 * given in the question, not quoted as official figures.
 */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { BIG_G, BIG_G_NOTE, G, SCI_TIP, clean, rounded, sciPart, sciTex } from './common.ts';

const L = (n: number) => `p20-3-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';
const ACC = 'm/s²';
const PI = Math.PI;
const SCI_ASK = `Give your answer in scientific notation to 3 significant digits. ${SCI_TIP}`;
/** A value m × 10^e with a two-figure m, and how it is written. */
function sciPick(rng: Rng, lo: number, hi: number, e: number): { v: number; tex: string } {
  const m = rng.float(lo, hi, 1);
  return { v: Number(`${m}e${e}`), tex: `${m.toFixed(1)} \\times 10^{${e}}` };
}

// ---------------------------------------------------------------------------- 3.1 period, frequency and speed

/** Things that turn steadily, each with radii (m) and periods (s) that suit it. */
const SPINNERS = [
  { name: 'A playground roundabout', rs: [0.8, 1.2, 1.5, 2], Ts: [2, 2.5, 4, 5] },
  { name: 'A fairground ride', rs: [3.5, 5, 6, 8], Ts: [4, 5, 8, 10] },
  { name: 'A record on a turntable', rs: [0.05, 0.08, 0.12, 0.15], Ts: [0.8, 1.25, 1.6, 2] },
  { name: 'A model plane on a control line', rs: [8, 10, 12, 15], Ts: [2, 2.5, 4, 5] },
  { name: 'A toy car on a circular track', rs: [0.5, 0.8, 1.2, 2], Ts: [1.6, 2, 2.5, 4] },
];

function periodOf(rng: Rng): GenOutput {
  const who = rng.pick(SPINNERS);
  const T = rng.pick(who.Ts);
  const n = rng.pick([5, 10, 20, 25, 40]);
  const t = clean(T * n);
  const wantPeriod = rng.chance(0.5);
  return {
    prompt: `${who.name} makes ${n} complete turns in ${q(t, 's')} at a steady rate. What is its ${wantPeriod ? 'period' : 'frequency'}?`,
    parts: [wantPeriod ? numPart(T, { suffix: 's' }) : numPart(clean(1 / T), { suffix: 'Hz' })],
    hints: [wantPeriod ? 'The period is the time for one turn: the total time ÷ the number of turns.' : 'The frequency is the number of turns each second: the number of turns ÷ the total time.'],
    solution: [wantPeriod ? `$T = \\dfrac{${t}}{${n}} = ${T}$ s` : `$f = \\dfrac{${n}}{${t}} = ${clean(1 / T)}$ Hz`],
  };
}

function speedRound(rng: Rng): GenOutput {
  const who = rng.pick(SPINNERS);
  const r = rng.pick(who.rs);
  const T = rng.pick(who.Ts);
  const v = (2 * PI * r) / T;
  return {
    prompt: `${who.name} turns steadily with a period of ${q(T, 's')}. What is the speed of a point ${q(r, 'm')} from the centre of the circle? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['In one period the point travels once round the circle, a distance of $2\\pi r$.', '$v = \\dfrac{2\\pi r}{T}$'],
    solution: [`$v = \\dfrac{2\\pi r}{T} = \\dfrac{2\\pi \\times ${r}}{${T}} = ${num(v, 2)}$ m/s`],
  };
}

function speedFromRpm(rng: Rng): GenOutput {
  const rpm = rng.pick([30, 45, 60, 90, 120, 150, 300, 600]);
  const r = rng.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]);
  const T = 60 / rpm;
  const v = (2 * PI * r) / T;
  return {
    prompt: `A wheel of radius ${q(r, 'm')} spins at ${rpm} revolutions per minute. Find its period, to 3 decimal places, and the speed of a point on its rim, to 2 decimal places.`,
    parts: [rounded(T, 3, 's', 'Period'), rounded(v, 2, 'm/s', 'Speed')],
    hints: ['One minute is 60 s, so the period is $60 \\div$ the number of revolutions per minute.', '$v = \\dfrac{2\\pi r}{T}$'],
    solution: [`$T = \\dfrac{60}{${rpm}} = ${num(T, 3)}$ s`, `$v = \\dfrac{2\\pi r}{T} = \\dfrac{2\\pi \\times ${r}}{${num(T, 4)}} = ${num(v, 2)}$ m/s`],
  };
}

function periodFromSpeed(rng: Rng): GenOutput {
  const r = rng.pick([5, 8, 12, 20, 25, 40, 50]);
  const v = rng.pick([4, 5, 8, 10, 12, 15, 20]);
  const T = (2 * PI * r) / v;
  return {
    prompt: `A car drives round a circular track of radius ${q(r, 'm')} at a steady ${q(v, 'm/s')}. How long does one lap take? Give your answer to 1 decimal place.`,
    parts: [rounded(T, 1, 's')],
    hints: ['One lap is the circumference, $2\\pi r$.', 'time = distance ÷ speed'],
    solution: [`$T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi \\times ${r}}{${v}} = ${num(T, 1)}$ s`],
  };
}

const CIRCLE_IDEAS: Q[] = [
  { q: 'An object moves round a circle at a steady speed. Which statement about its velocity is true?', a: 'Its size stays the same but its direction keeps changing', w: ['It stays the same', 'Its size keeps changing but its direction stays the same', 'It is zero'], why: 'Velocity is a vector. The speed is steady, but the direction of motion turns all the time.' },
  { q: 'In which direction does the velocity of an object in uniform circular motion point?', a: 'Along the tangent to the circle', w: ['Towards the centre of the circle', 'Away from the centre of the circle', 'Along the radius'], why: 'At each instant the object is moving along the circle, which is the direction of the tangent.' },
  { q: 'The period of a spinning wheel is 0.25 s. What is its frequency?', a: '4 Hz', w: ['0.25 Hz', '2.5 Hz', '40 Hz'], order: ['0.25 Hz', '2.5 Hz', '4 Hz', '40 Hz'], why: 'Frequency is one divided by the period: $\\dfrac{1}{0.25} = 4$ turns each second.' },
  { q: 'Two children sit on a roundabout, one near the centre and one at the edge. How do their periods and speeds compare?', a: 'They have the same period, and the child at the edge is faster', w: ['They have the same period and the same speed', 'The child at the edge has a longer period and the same speed', 'The child near the centre is faster'], why: 'Both go round once in the same time, but the child at the edge travels round a larger circle.' },
];

// ---------------------------------------------------------------------------- 3.1 centripetal acceleration

function accelFromSpeed(rng: Rng): GenOutput {
  const { v, r } = retry(
    () => ({ v: rng.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), r: rng.pick([0.5, 2, 4, 5, 8, 10, 20, 25, 40, 50]) }),
    (c) => (c.v * c.v) / c.r <= 50,
  );
  const a = (v * v) / r;
  return {
    prompt: `An object moves at a steady ${q(v, 'm/s')} round a circle of radius ${q(r, 'm')}. What is its centripetal acceleration? Give your answer to 2 decimal places.`,
    parts: [rounded(a, 2, ACC)],
    hints: ['$a_c = \\dfrac{v^2}{r}$', 'Square the speed first.'],
    solution: [`$a_c = \\dfrac{v^2}{r} = \\dfrac{${v}^2}{${r}} = ${num(a, 2)}\\ \\text{m/s}^2$, towards the centre`],
  };
}

function accelFromPeriod(rng: Rng): GenOutput {
  const { r, T } = retry(
    () => ({ r: rng.pick([2, 3, 4, 5, 6, 8]), T: rng.pick([2, 2.5, 3, 4, 5, 6]) }),
    (c) => (4 * PI * PI * c.r) / (c.T * c.T) <= 30,
  );
  const a = (4 * PI * PI * r) / (T * T);
  return {
    prompt: `A seat on a fairground ride moves round a circle of radius ${q(r, 'm')} with a period of ${q(T, 's')}. What is its centripetal acceleration? Give your answer to 2 decimal places.`,
    parts: [rounded(a, 2, ACC)],
    hints: ['$a_c = \\dfrac{4\\pi^2 r}{T^2}$', 'Or find the speed first, $v = \\dfrac{2\\pi r}{T}$, and then use $a_c = \\dfrac{v^2}{r}$.'],
    solution: [`$a_c = \\dfrac{4\\pi^2 r}{T^2} = \\dfrac{4\\pi^2 \\times ${r}}{${T}^2} = ${num(a, 2)}\\ \\text{m/s}^2$`],
  };
}

function speedForAccel(rng: Rng): GenOutput {
  const r = rng.pick([20, 30, 45, 60, 80, 120, 150]);
  const k = rng.pick([0.3, 0.4, 0.5, 0.6, 0.8]);
  const a = k * G;
  const v = Math.sqrt(a * r);
  return {
    prompt: `${G_NOTE} For the comfort of its passengers, a train must keep its centripetal acceleration below ${k} times $g$. What is the greatest speed at which it can take a curve of radius ${q(r, 'm')}? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: [`The greatest acceleration is $${k} \\times 9.81\\ \\text{m/s}^2$.`, 'Rearrange $a_c = \\dfrac{v^2}{r}$ to get $v = \\sqrt{a_c r}$.'],
    solution: [`$a_c = ${k} \\times 9.81 = ${num(a, 3)}\\ \\text{m/s}^2$`, `$v = \\sqrt{a_c r} = \\sqrt{${num(a, 3)} \\times ${r}} = ${num(v, 1)}$ m/s`],
  };
}

function radiusForAccel(rng: Rng): GenOutput {
  const v = rng.pick([10, 15, 20, 25, 30, 40]);
  const a = rng.pick([2, 2.5, 4, 5, 8]);
  return {
    prompt: `A car travels at a steady ${q(v, 'm/s')} round a bend, and its centripetal acceleration is $${a}\\ \\text{m/s}^2$. What is the radius of the bend?`,
    parts: [numPart(clean((v * v) / a), { suffix: 'm' })],
    hints: ['Rearrange $a_c = \\dfrac{v^2}{r}$ to get $r = \\dfrac{v^2}{a_c}$.'],
    solution: [`$r = \\dfrac{v^2}{a_c} = \\dfrac{${v}^2}{${a}} = ${clean((v * v) / a)}$ m`],
  };
}

// ---------------------------------------------------------------------------- 3.2 centripetal force

function forceFromSpeed(rng: Rng): GenOutput {
  const m = rng.pick([0.2, 0.5, 2, 4, 5, 30, 50, 60]);
  const v = rng.pick([2, 3, 4, 5, 6, 8]);
  const r = rng.pick([0.5, 0.8, 1.2, 2, 2.5, 4, 5]);
  const F = (m * v * v) / r;
  return {
    prompt: `An object of mass ${q(m, 'kg')} moves at a steady ${q(v, 'm/s')} round a circle of radius ${q(r, 'm')}. What centripetal force acts on it? Give your answer to 1 decimal place.`,
    parts: [rounded(F, 1, 'N')],
    hints: ['$F_c = \\dfrac{mv^2}{r}$'],
    solution: [`$F_c = \\dfrac{mv^2}{r} = \\dfrac{${m} \\times ${v}^2}{${r}} = ${num(F, 1)}$ N, towards the centre`],
  };
}

function tensionFromPeriod(rng: Rng): GenOutput {
  const m = rng.pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.8]);
  const r = rng.pick([0.4, 0.5, 0.6, 0.8, 1, 1.2]);
  const T = rng.pick([0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5]);
  const F = (m * 4 * PI * PI * r) / (T * T);
  return {
    prompt: `A puck of mass ${q(m, 'kg')} on a frictionless table is tied to a string and moves in a horizontal circle of radius ${q(r, 'm')} with a period of ${q(T, 's')}. What is the tension in the string? Give your answer to 1 decimal place.`,
    parts: [rounded(F, 1, 'N')],
    hints: ['The tension is the only horizontal force, so it is the centripetal force.', 'Find the speed, $v = \\dfrac{2\\pi r}{T}$, then use $F_c = \\dfrac{mv^2}{r}$.'],
    solution: [`$v = \\dfrac{2\\pi r}{T} = \\dfrac{2\\pi \\times ${r}}{${T}} = ${num((2 * PI * r) / T, 3)}$ m/s`, `$F_T = \\dfrac{mv^2}{r} = \\dfrac{${m} \\times ${num((2 * PI * r) / T, 3)}^2}{${r}} = ${num(F, 1)}$ N`],
  };
}

function breakingSpeed(rng: Rng): GenOutput {
  const m = rng.pick([0.2, 0.25, 0.4, 0.5, 0.8, 1.5]);
  const r = rng.pick([0.5, 0.6, 0.8, 1, 1.2, 1.5]);
  const Fmax = rng.pick([20, 30, 40, 50, 60, 80, 100]);
  const v = Math.sqrt((Fmax * r) / m);
  return {
    prompt: `A ${q(m, 'kg')} puck on a frictionless table moves in a horizontal circle of radius ${q(r, 'm')} on the end of a string. The string breaks if its tension goes above ${q(Fmax, 'N')}. What is the greatest speed the puck can have? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['At the greatest speed, the tension equals its greatest value, and the tension is the centripetal force.', 'Rearrange $F_c = \\dfrac{mv^2}{r}$ to get $v = \\sqrt{\\dfrac{F_c r}{m}}$.'],
    solution: [`$v = \\sqrt{\\dfrac{F_c r}{m}} = \\sqrt{\\dfrac{${Fmax} \\times ${r}}{${m}}} = ${num(v, 1)}$ m/s`],
  };
}

const CENTRIPETAL_IDEAS: Q[] = [
  { q: 'A ball on a string is whirled in a horizontal circle. The string breaks. Ignoring gravity, how does the ball move just afterwards?', a: 'In a straight line along the tangent to the circle', w: ['Straight outwards, away from the centre', 'On round the circle', 'In a spiral outwards'], why: 'With no force towards the centre, the ball keeps the velocity it had, which pointed along the tangent (Newton’s first law).' },
  { q: 'A car turns a corner on a level road. Which force provides the centripetal force?', a: 'Friction between the tyres and the road', w: ['The weight of the car', 'The normal force of the road', 'The force of the engine'], why: 'On a level road only friction can push the car sideways, towards the centre of the turn.' },
  { q: 'The Moon orbits the Earth. Which force provides the centripetal force?', a: 'The gravitational pull of the Earth', w: ['The Moon’s own motion', 'A force that pushes the Moon outwards', 'Friction'], why: 'Gravity pulls the Moon towards the Earth, at the centre of its orbit.' },
  { q: 'The speed of an object in circular motion doubles, and the radius stays the same. What happens to the centripetal force needed?', a: 'It becomes four times as large', w: ['It doubles', 'It halves', 'It stays the same'], why: '$F_c = \\dfrac{mv^2}{r}$, so the force is proportional to the square of the speed.' },
  { q: 'Which statement about "centripetal force" is true?', a: 'It is the name for the net force towards the centre, provided by forces such as tension, friction or gravity', w: ['It is an extra force that appears on every object that moves in a circle', 'It pushes the object away from the centre', 'It acts along the direction of motion'], why: 'Centripetal force is not a new kind of force. It is a job done by the real forces on the object.' },
];

// ---------------------------------------------------------------------------- 3.2 curves and vertical circles

function frictionOnCurve(rng: Rng): GenOutput {
  const m = rng.pick([800, 1000, 1200, 1500, 1800]);
  const v = rng.pick([8, 10, 12, 15, 20]);
  const r = rng.pick([25, 40, 50, 60, 80, 100]);
  const F = (m * v * v) / r;
  return {
    prompt: `A car of mass ${q(m, 'kg')} takes a level bend of radius ${q(r, 'm')} at a steady ${q(v, 'm/s')}. What friction force must the road provide to keep it on the bend? Give your answer to the nearest newton.`,
    parts: [rounded(F, 0, 'N')],
    hints: ['On a level road, friction is the centripetal force.', '$F_c = \\dfrac{mv^2}{r}$'],
    solution: [`$F_f = \\dfrac{mv^2}{r} = \\dfrac{${m} \\times ${v}^2}{${r}} = ${num(F, 0)}$ N, towards the centre of the bend`],
  };
}

function maxSpeedOnCurve(rng: Rng): GenOutput {
  const mu = rng.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
  const r = rng.pick([20, 30, 45, 60, 80, 100, 150]);
  const v = Math.sqrt(mu * G * r);
  return {
    prompt: `${G_NOTE} The coefficient of static friction between a car’s tyres and a level road is ${mu}. What is the greatest speed at which the car can take a bend of radius ${q(r, 'm')} without skidding? Give your answer to 1 decimal place.`,
    parts: [rounded(v, 1, 'm/s')],
    hints: ['The greatest friction, $\\mu_s mg$, is the greatest centripetal force: $\\mu_s mg = \\dfrac{mv^2}{r}$.', 'The mass cancels: $v = \\sqrt{\\mu_s g r}$.'],
    solution: [`$\\mu_s mg = \\dfrac{mv^2}{r}$, so $v = \\sqrt{\\mu_s g r}$. The mass of the car is not needed.`, `$v = \\sqrt{${mu} \\times 9.81 \\times ${r}} = ${num(v, 1)}$ m/s`],
  };
}

function verticalCircle(rng: Rng): GenOutput {
  const m = rng.pick([0.2, 0.25, 0.4, 0.5, 0.8]);
  const r = rng.pick([0.5, 0.6, 0.8, 1, 1.2]);
  const vTop = rng.pick([4, 5, 6, 7, 8]);
  // The ball is faster at the bottom, by the speed that falling through the diameter gives it.
  const vLow = Math.round(Math.sqrt(vTop * vTop + 4 * G * r) * 10) / 10;
  const top = (m * vTop * vTop) / r;
  const low = (m * vLow * vLow) / r;
  return {
    prompt: `${G_NOTE} A ${q(m, 'kg')} ball on a string is whirled in a vertical circle of radius ${q(r, 'm')}. It passes the highest point at ${q(vTop, 'm/s')} and the lowest point at ${q(vLow, 'm/s')}. Find the tension in the string at each of these points, to 1 decimal place.`,
    parts: [rounded(top - m * G, 1, 'N', 'Highest point'), rounded(low + m * G, 1, 'N', 'Lowest point')],
    hints: ['At the highest point both the tension and the weight point down, towards the centre: $F_T + mg = \\dfrac{mv^2}{r}$.', 'At the lowest point the tension points up, towards the centre, and the weight points down: $F_T - mg = \\dfrac{mv^2}{r}$.'],
    solution: [
      `Weight: $mg = ${m} \\times 9.81 = ${num(m * G, 2)}$ N.`,
      `Highest point: $F_T + mg = \\dfrac{mv^2}{r}$, so $F_T = \\dfrac{${m} \\times ${vTop}^2}{${r}} - ${num(m * G, 2)} = ${num(top, 2)} - ${num(m * G, 2)} = ${num(top - m * G, 1)}$ N.`,
      `Lowest point: $F_T - mg = \\dfrac{mv^2}{r}$, so $F_T = \\dfrac{${m} \\times ${vLow}^2}{${r}} + ${num(m * G, 2)} = ${num(low, 2)} + ${num(m * G, 2)} = ${num(low + m * G, 1)}$ N`,
    ],
  };
}

function loopTop(rng: Rng): GenOutput {
  const r = rng.pick([0.6, 0.8, 1, 1.2, 5, 8, 10, 12, 15]);
  const small = r < 3;
  const v = Math.sqrt(G * r);
  return {
    prompt: `${G_NOTE} ${small ? `A bucket of water is swung in a vertical circle of radius ${q(r, 'm')}` : `A roller coaster car goes round a vertical loop of radius ${q(r, 'm')}`}. What is the smallest speed at the top of the circle for which ${small ? 'the water stays in the bucket' : 'the car stays on the track without being held'}? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['At the smallest speed, gravity alone provides the centripetal force at the top: $mg = \\dfrac{mv^2}{r}$.', 'The mass cancels: $v = \\sqrt{gr}$.'],
    solution: [`At the smallest speed the ${small ? 'bucket' : 'track'} exerts no force at the top, so $mg = \\dfrac{mv^2}{r}$ and $v = \\sqrt{gr}$.`, `$v = \\sqrt{9.81 \\times ${r}} = ${num(v, 2)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 3.3 orbital speed

function orbitSpeed(rng: Rng): GenOutput {
  const M = sciPick(rng, 1.2, 9.8, rng.int(23, 25));
  const r = sciPick(rng, 1.2, 9.8, 7);
  const v = Math.sqrt((BIG_G * M.v) / r.v);
  return {
    prompt: `${BIG_G_NOTE} A satellite is in a circular orbit round a planet of mass $${M.tex}\\ \\text{kg}$, with its centre $${r.tex}\\ \\text{m}$ from the centre of the planet. What is the speed of the satellite? ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: ['Gravity provides the centripetal force: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$.', 'The mass of the satellite cancels: $v = \\sqrt{\\dfrac{GM}{r}}$.'],
    solution: [`$v = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{6.67 \\times 10^{-11} \\times ${M.tex}}{${r.tex}}} = ${sciTex(v)}$ m/s`],
  };
}

function orbitSpeedAtHeight(rng: Rng): GenOutput {
  const M = sciPick(rng, 1.2, 9.8, 24);
  const R = sciPick(rng, 3.0, 9.5, 6);
  const h = sciPick(rng, 1.0, 9.5, rng.pick([5, 6]));
  const r = R.v + h.v;
  const v = Math.sqrt((BIG_G * M.v) / r);
  return {
    prompt: `${BIG_G_NOTE} A planet has a mass of $${M.tex}\\ \\text{kg}$ and a radius of $${R.tex}\\ \\text{m}$. A satellite is in a circular orbit at a height of $${h.tex}\\ \\text{m}$ above the surface. What is the speed of the satellite? ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: ['The radius of the orbit is measured from the centre of the planet: add the height to the radius of the planet.', '$v = \\sqrt{\\dfrac{GM}{r}}$'],
    solution: [`$r = ${R.tex} + ${h.tex} = ${sciTex(r)}$ m`, `$v = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{6.67 \\times 10^{-11} \\times ${M.tex}}{${sciTex(r)}}} = ${sciTex(v)}$ m/s`],
  };
}

const ORBIT_IDEAS: Q[] = [
  { q: 'Which force keeps a satellite in a circular orbit round a planet?', a: 'The gravitational pull of the planet', w: ['The thrust of its engines', 'A force that balances gravity', 'Air resistance'], why: 'Gravity is the only force on the satellite, and it points to the centre of the orbit, so it is the centripetal force.' },
  { q: 'Two satellites of different masses are in the same circular orbit. How do their speeds compare?', a: 'They are the same', w: ['The heavier satellite is faster', 'The lighter satellite is faster', 'It depends on their shapes'], why: '$v = \\sqrt{\\dfrac{GM}{r}}$ contains the mass of the planet but not the mass of the satellite.' },
  { q: 'A satellite is moved to a circular orbit with a larger radius. What happens to its orbital speed?', a: 'It decreases', w: ['It increases', 'It stays the same', 'It becomes zero'], why: '$v = \\sqrt{\\dfrac{GM}{r}}$, so a larger radius gives a smaller speed.' },
  { q: 'Astronauts in an orbiting spacecraft float about inside it. Why?', a: 'They and the spacecraft are falling round the Earth together', w: ['There is no gravity at that height', 'The spacecraft’s engines cancel gravity', 'They are too far from the Earth to have weight'], why: 'Gravity is still strong in low orbit. The astronauts are in free fall along with everything around them, so nothing presses on them.' },
  { q: 'A satellite is in a circular orbit. What is the direction of its acceleration?', a: 'Towards the centre of the planet', w: ['Along its direction of motion', 'Away from the planet', 'It has no acceleration'], why: 'It is in uniform circular motion, so its acceleration is centripetal.' },
];

// ---------------------------------------------------------------------------- 3.3 orbital period

function periodFromOrbit(rng: Rng): GenOutput {
  const r = sciPick(rng, 1.2, 9.8, 7);
  const v = sciPick(rng, 1.5, 7.5, 3);
  const T = (2 * PI * r.v) / v.v;
  return {
    prompt: `A satellite is in a circular orbit of radius $${r.tex}\\ \\text{m}$ and moves at $${v.tex}\\ \\text{m/s}$. What is its period, in seconds? ${SCI_ASK}`,
    parts: [sciPart(T, 3, 's')],
    hints: ['In one period the satellite travels once round its orbit, a distance of $2\\pi r$.', '$T = \\dfrac{2\\pi r}{v}$'],
    solution: [`$T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi \\times ${r.tex}}{${v.tex}} = ${sciTex(T)}$ s`],
  };
}

function periodFromMass(rng: Rng): GenOutput {
  const M = sciPick(rng, 1.2, 9.8, rng.int(23, 25));
  const r = sciPick(rng, 1.2, 9.8, 7);
  const T = 2 * PI * Math.sqrt(r.v ** 3 / (BIG_G * M.v));
  const v = Math.sqrt((BIG_G * M.v) / r.v);
  return {
    prompt: `${BIG_G_NOTE} A moon is in a circular orbit round a planet of mass $${M.tex}\\ \\text{kg}$, with its centre $${r.tex}\\ \\text{m}$ from the centre of the planet. What is the period of the moon, in seconds? ${SCI_ASK}`,
    parts: [sciPart(T, 3, 's')],
    hints: ['Find the orbital speed first: $v = \\sqrt{\\dfrac{GM}{r}}$.', 'Then $T = \\dfrac{2\\pi r}{v}$.'],
    solution: [`$v = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{6.67 \\times 10^{-11} \\times ${M.tex}}{${r.tex}}} = ${sciTex(v, 4)}$ m/s`, `$T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi \\times ${r.tex}}{${sciTex(v, 4)}} = ${sciTex(T)}$ s`],
  };
}

function keplerRatio(rng: Rng): GenOutput {
  const k = rng.pick([4, 9, 2, 3]);
  const T1 = rng.pick([2, 3, 5, 6, 8, 12]);
  const unit = rng.pick(['days', 'hours']);
  const T2 = T1 * k ** 1.5;
  const whole = Number.isInteger(Math.sqrt(k));
  return {
    prompt: `Two moons are in circular orbits round the same planet. The inner moon has a period of ${T1} ${unit}. The radius of the outer moon’s orbit is ${k} times the radius of the inner moon’s orbit. What is the period of the outer moon, in ${unit}?${whole ? '' : ' Give your answer to 1 decimal place.'}`,
    parts: [whole ? numPart(clean(T2), { suffix: unit }) : rounded(T2, 1, unit)],
    hints: ['For orbits round the same planet, $T^2$ is proportional to $r^3$.', `Multiplying $r$ by ${k} multiplies $T^2$ by $${k}^3$, so it multiplies $T$ by $\\sqrt{${k}^3}$.`],
    solution: [`$T^2 \\propto r^3$, so $\\dfrac{T_2}{T_1} = \\sqrt{${k}^3} = \\sqrt{${k ** 3}} = ${num(k ** 1.5, 3)}$`, `$T_2 = ${T1} \\times ${num(k ** 1.5, 3)} = ${num(T2, 1)}$ ${unit}`],
  };
}

export const CIRCULAR_SKILLS: SkillDef[] = [
  skill({ id: 'p20-circular-speed', name: 'Period, frequency and speed', description: 'Find the period, the frequency and the speed of an object in uniform circular motion.', outcomes: ['20-C1'], lessonId: L(1), calculator: true, gen: bank([either(periodOf, fromBank(CIRCLE_IDEAS, ['In uniform circular motion the speed is steady but the direction of the velocity keeps changing.'])), speedRound, either(speedFromRpm, periodFromSpeed)], ['$v = \\dfrac{2\\pi r}{T}$ and $f = \\dfrac{1}{T}$']) }),
  skill({ id: 'p20-centripetal-accel', name: 'Centripetal acceleration', description: 'Find the centripetal acceleration of an object from its speed or its period, and the speed or radius that gives a stated acceleration.', outcomes: ['20-C1'], lessonId: L(1), calculator: true, gen: bank([accelFromSpeed, accelFromPeriod, either(speedForAccel, radiusForAccel)], ['$a_c = \\dfrac{v^2}{r} = \\dfrac{4\\pi^2 r}{T^2}$, towards the centre']) }),
  skill({ id: 'p20-centripetal-force', name: 'Centripetal force', description: 'Find the centripetal force on an object, name the force that provides it, and find the speed a given force allows.', outcomes: ['20-C1'], lessonId: L(2), calculator: true, gen: bank([either(forceFromSpeed, fromBank(CENTRIPETAL_IDEAS, ['The centripetal force is the net force towards the centre. Ask which real force provides it.'])), tensionFromPeriod, breakingSpeed], ['$F_c = \\dfrac{mv^2}{r}$, towards the centre']) }),
  skill({ id: 'p20-circular-apply', name: 'Curves and vertical circles', description: 'Apply centripetal force to a car on a level bend and to motion in a vertical circle.', outcomes: ['20-C1'], lessonId: L(2), calculator: true, gen: bank([frictionOnCurve, maxSpeedOnCurve, either(verticalCircle, loopTop)], ['Add the forces towards the centre and set the total equal to $\\dfrac{mv^2}{r}$.']) }),
  skill({ id: 'p20-orbit-speed', name: 'Orbital speed', description: 'Explain circular orbits with gravity as the centripetal force, and find the speed of a satellite.', outcomes: ['20-C1'], lessonId: L(3), calculator: true, gen: bank([fromBank(ORBIT_IDEAS, ['Gravity is the centripetal force on a satellite.']), orbitSpeed, orbitSpeedAtHeight], ['$v = \\sqrt{\\dfrac{GM}{r}}$, with $r$ measured from the centre of the planet']) }),
  skill({ id: 'p20-orbit-period', name: 'Orbital period', description: 'Find the period of a satellite, and compare the periods of orbits of different radii with Kepler’s third law.', outcomes: ['20-C1'], lessonId: L(3), calculator: true, gen: bank([periodFromOrbit, periodFromMass, keplerRatio], ['$T = \\dfrac{2\\pi r}{v}$, and for orbits round the same planet $T^2 \\propto r^3$']) }),
];
