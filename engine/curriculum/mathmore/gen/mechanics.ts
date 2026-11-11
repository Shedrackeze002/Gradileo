/**
 * More Mathematics Topics, Unit 12: A level mechanics in the first year. Units and modelling, the
 * constant acceleration formulae, vertical motion under gravity, Newton's laws, lifts, and
 * connected particles (towing and pulleys). Every question states g = 9.8 m/s².
 */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, polyString, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { eq3, s3, SF_TEXT, sfPart, sp } from './common.ts';

type Out = GenOutput;

export const G = 9.8;
export const G_TEXT = 'Take $g = 9.8$ m/s².';
const MS2 = '\\text{ m/s}^2';
const MS = '\\text{ m/s}';
/** The angle, in degrees, whose cosine is c. */
const acosD = (c: number) => (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
/** A coefficient in front of a letter: 1 is left out. */
const co = (x: number) => (x === 1 ? '' : fmt(x));

// ---------------------------------------------------------------------------
// 12.1 Quantities, units and modelling
// ---------------------------------------------------------------------------

function mechUnits(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    if (rng.chance(0.5)) {
      const kmh = rng.pick([18, 27, 36, 45, 54, 63, 72, 90, 108, 126]);
      const ms = kmh / 3.6;
      return {
        prompt: `A car travels at $${kmh}$ km/h. Write this speed in metres per second.`,
        parts: [sfPart(ms, { suffix: 'm/s' })],
        hints: ['$1$ km $= 1000$ m and $1$ hour $= 3600$ s.', 'Multiply by $1000$ and divide by $3600$, which is the same as dividing by $3.6$.'],
        solution: [`$${kmh}$ km/h $= \\dfrac{${kmh} \\times 1000}{3600}$ m/s`, `$= ${kmh} \\div 3.6 = ${fmt(ms)}$ m/s`],
      };
    }
    const ms = rng.int(4, 40);
    const kmh = roundTo(ms * 3.6, 4);
    return {
      prompt: `A sprinter's top speed is $${ms}$ m/s. Write this speed in kilometres per hour.`,
      parts: [numPart(kmh, { suffix: 'km/h', exact: false })],
      hints: ['In one hour there are $3600$ seconds, and $1000$ m make $1$ km.', 'Multiply by $3600$ and divide by $1000$, which is the same as multiplying by $3.6$.'],
      solution: [`$${ms}$ m/s $= \\dfrac{${ms} \\times 3600}{1000}$ km/h`, `$= ${ms} \\times 3.6 = ${fmt(kmh)}$ km/h`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const grams = rng.int(5, 95) * 10;
      const kg = grams / 1000;
      const w = roundTo(kg * G, 6);
      return {
        prompt: `A parcel has a mass of $${grams}$ g. Write its mass in kilograms, the SI unit, and find its weight. ${G_TEXT} ${SF_TEXT}`,
        parts: [numPart(kg, { label: 'Mass:', suffix: 'kg', exact: false }), sfPart(w, { label: 'Weight:', suffix: 'N' })],
        hints: ['$1$ kg $= 1000$ g, so divide by $1000$.', 'Weight is a force: $W = mg$, with the mass in kilograms. Its unit is the newton (N).'],
        solution: [`$${grams}$ g $= ${grams} \\div 1000 = ${fmt(kg)}$ kg`, `$W = mg = ${fmt(kg)} \\times 9.8 ${eq3(w)}$ N`],
      };
    }
    const tonnes = rng.pick([0.8, 1.2, 1.5, 2, 2.4, 3.5, 4.2]);
    const kg = tonnes * 1000;
    const w = roundTo(kg * G, 6);
    return {
      prompt: `A van has a mass of $${fmt(tonnes)}$ tonnes. Write its mass in kilograms and find its weight in newtons. ($1$ tonne $= 1000$ kg.) ${G_TEXT}`,
      parts: [numPart(kg, { label: 'Mass:', suffix: 'kg', exact: false }), sfPart(w, { label: 'Weight:', suffix: 'N' })],
      hints: ['Multiply the number of tonnes by $1000$.', 'Weight $W = mg$, with $m$ in kilograms.'],
      solution: [`$${fmt(tonnes)}$ tonnes $= ${fmt(tonnes)} \\times 1000 = ${fmt(kg)}$ kg`, `$W = mg = ${fmt(kg)} \\times 9.8 = ${fmt(w)}$ N`],
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 0) {
    const [k1, k2] = retry(() => [rng.pick([0, 18, 36, 54]), rng.pick([36, 54, 72, 90, 108])] as const, ([a, b]) => b > a, 50);
    const t = rng.pick([4, 5, 8, 10]);
    const a = (k2 - k1) / 3.6 / t;
    return {
      prompt: `A car's speed rises steadily from $${k1}$ km/h to $${k2}$ km/h in $${t}$ seconds. Find its acceleration in m/s². ${SF_TEXT}`,
      parts: [sfPart(a, { suffix: 'm/s²' })],
      hints: ['Change both speeds into m/s first: divide by $3.6$.', 'Acceleration is the change in velocity divided by the time taken.'],
      solution: [`$${k1}$ km/h $= ${fmt(k1 / 3.6)}$ m/s and $${k2}$ km/h $= ${fmt(k2 / 3.6)}$ m/s.`, `$a = \\dfrac{${fmt(k2 / 3.6)} - ${fmt(k1 / 3.6)}}{${t}} ${eq3(a)}$ m/s²`],
    };
  }
  if (kind === 1) {
    const km = rng.pick([1.8, 2.4, 3, 3.6, 4.5, 5.4, 6]);
    const min = rng.pick([2, 3, 4, 5, 6]);
    const v = (km * 1000) / (min * 60);
    return {
      prompt: `A train travels $${fmt(km)}$ km in $${min}$ minutes. Find its average speed in m/s. ${SF_TEXT}`,
      parts: [sfPart(v, { suffix: 'm/s' })],
      hints: ['Change the distance into metres and the time into seconds.', 'Average speed $= \\dfrac{\\text{distance}}{\\text{time}}$.'],
      solution: [`$${fmt(km)}$ km $= ${fmt(km * 1000)}$ m and $${min}$ minutes $= ${min * 60}$ s.`, `Average speed $= \\dfrac{${fmt(km * 1000)}}{${min * 60}} ${eq3(v)}$ m/s`],
    };
  }
  const rho = rng.pick([0.8, 0.92, 1.03, 2.7, 7.8, 8.9, 11.3, 19.3]);
  return {
    prompt: `A material has a density of $${fmt(rho)}$ g/cm³. Write its density in the SI unit, kg/m³.`,
    parts: [numPart(roundTo(rho * 1000, 4), { suffix: 'kg/m³', exact: false })],
    hints: ['$1$ g $= 0.001$ kg and $1$ m³ $= 100^3 = 1\\,000\\,000$ cm³.', 'So $1$ g/cm³ $= \\dfrac{0.001}{0.000\\,001} = 1000$ kg/m³.'],
    solution: ['$1$ g/cm³ $= 1000$ kg/m³, because $1$ m³ holds $1\\,000\\,000$ cm³ and $1$ g is $0.001$ kg.', `$${fmt(rho)}$ g/cm³ $= ${fmt(rho)} \\times 1000 = ${fmt(rho * 1000)}$ kg/m³`],
  };
}

interface Model {
  term: string;
  object: string;
  meaning: string;
  consequence: string;
}

const MODELS: Model[] = [
  { term: 'a particle', object: 'a stone thrown from a cliff', meaning: 'Its size can be ignored, so its mass is all at one point.', consequence: 'We can ignore its size and any turning, and every force acts at one point.' },
  { term: 'light', object: 'the string joining two blocks', meaning: 'Its mass is small enough to ignore.', consequence: 'The tension is the same all the way along the string.' },
  { term: 'inextensible', object: 'the string joining two blocks', meaning: 'It does not stretch.', consequence: 'The two blocks move with the same speed and the same acceleration.' },
  { term: 'smooth', object: 'the table a block slides on', meaning: 'There is no friction between the table and the block.', consequence: 'The only force from the table is the normal reaction, at right angles to it.' },
  { term: 'rough', object: 'the ramp a box rests on', meaning: 'Friction acts between the ramp and the box.', consequence: 'A friction force acts along the ramp, against the motion or the tendency to move.' },
  { term: 'a smooth pulley', object: 'the pulley a rope passes over', meaning: 'There is no friction in the pulley.', consequence: 'The tension in the rope is the same on both sides of the pulley.' },
  { term: 'rigid', object: 'the towbar between a car and a trailer', meaning: 'It does not bend or change length.', consequence: 'It can push as well as pull, so it can carry a thrust as well as a tension.' },
  { term: 'uniform', object: 'a plank resting on two supports', meaning: 'Its mass is spread evenly along its length.', consequence: 'Its weight acts at its midpoint.' },
  { term: 'moving with no air resistance', object: 'a ball falling through the air', meaning: 'The air has no effect on its motion.', consequence: 'The only force on it is its weight, so it accelerates at $g$.' },
];

function mechModelling(rng: Rng, d: Difficulty): Out {
  const [m, ...rest] = rng.shuffle(MODELS);
  if (d === 1) {
    return {
      prompt: `In a mechanics problem, ${m!.object} is modelled as **${m!.term}**. What does this mean?`,
      parts: [part(mc(rng, m!.meaning, rest.map((r) => r.meaning)))],
      hints: ['Each modelling word describes one simplification of the real object.', 'Think about what the word says the object does not have, or does not do.'],
      solution: [`Modelled as ${m!.term}: ${m!.meaning.charAt(0).toLowerCase()}${m!.meaning.slice(1)}`],
    };
  }
  if (d === 2) {
    return {
      prompt: `In a mechanics problem, ${m!.object} is modelled as **${m!.term}**. Which of these can we use in the working because of this?`,
      parts: [part(mc(rng, m!.consequence, rest.map((r) => r.consequence)))],
      hints: [`First say what ${m!.term} means: ${m!.meaning.charAt(0).toLowerCase()}${m!.meaning.slice(1)}`, 'Then ask what that lets us assume about the forces or the motion.'],
      solution: [`${m!.meaning}`, `So: ${m!.consequence.charAt(0).toLowerCase()}${m!.consequence.slice(1)}`],
    };
  }
  return {
    prompt: `In a solution to a mechanics problem, this line appears:\n\n> ${m!.consequence}\n\nWhich modelling assumption allows it? The object is ${m!.object}.`,
    parts: [part(mc(rng, `It is modelled as ${m!.term}.`, rest.map((r) => `It is modelled as ${r.term}.`)))],
    hints: ['Each assumption removes one complication. Which complication would make this line untrue?', 'Match the line to the word whose meaning leads to it.'],
    solution: [`The line is true because ${m!.object} is modelled as ${m!.term}: ${m!.meaning.charAt(0).toLowerCase()}${m!.meaning.slice(1)}`],
  };
}

// ---------------------------------------------------------------------------
// 12.2 The constant acceleration formulae
// ---------------------------------------------------------------------------

type Q = 's' | 'u' | 'v' | 'a' | 't';
type Vals = Record<Q, number>;

const UNIT: Record<Q, string> = { s: '\\text{ m}', u: MS, v: MS, a: MS2, t: '\\text{ s}' };
const SUFFIX: Record<Q, string> = { s: 'm', u: 'm/s', v: 'm/s', a: 'm/s²', t: 's' };
const NAME: Record<Q, string> = { s: 'the displacement $s$', u: 'the initial velocity $u$', v: 'the final velocity $v$', a: 'the acceleration $a$', t: 'the time $t$' };
/** The formula that leaves out each quantity. */
const FORMULA: Record<Q, string> = {
  s: 'v = u + at',
  v: 's = ut + \\tfrac{1}{2}at^2',
  a: 's = \\tfrac{1}{2}(u + v)t',
  t: 'v^2 = u^2 + 2as',
  u: 's = vt - \\tfrac{1}{2}at^2',
};

/** Worked steps to find x from the formula that leaves out `out`. */
function suvatSteps(out: Q, x: Q, k: Vals): string[] {
  const { s, u, v, a, t } = k;
  const f = `Use $${FORMULA[out]}$, the formula without $${out}$.`;
  const ans = (val: number) => `$${x} ${eq3(val)}$`;
  const steps: Record<string, string[]> = {
    'sv': [`$v = ${fmt(u)} + ${sp(a)} \\times ${fmt(t)}$`, ans(v)],
    'su': [`$${fmt(v)} = u + ${sp(a)} \\times ${fmt(t)}$, so $u = ${fmt(v)} - ${sp(a * t)}$`, ans(u)],
    'sa': [`$${fmt(v)} = ${fmt(u)} + ${fmt(t)}a$, so $a = \\dfrac{${fmt(v)} - ${sp(u)}}{${fmt(t)}}$`, ans(a)],
    'st': [`$${fmt(v)} = ${fmt(u)} + ${sp(a)}t$, so $t = \\dfrac{${fmt(v)} - ${sp(u)}}{${fmt(a)}}$`, ans(t)],
    'vs': [`$s = ${fmt(u)} \\times ${fmt(t)} + \\tfrac{1}{2} \\times ${sp(a)} \\times ${fmt(t)}^2$`, ans(s)],
    'va': [`$${fmt(s)} = ${fmt(u)} \\times ${fmt(t)} + \\tfrac{1}{2}a \\times ${fmt(t)}^2$, so $a = \\dfrac{2(${fmt(s)} - ${fmt(u * t)})}{${fmt(t * t)}}$`, ans(a)],
    'vu': [`$${fmt(s)} = ${fmt(t)}u + \\tfrac{1}{2} \\times ${sp(a)} \\times ${fmt(t)}^2$, so $u = \\dfrac{${fmt(s)} - ${sp(roundTo(0.5 * a * t * t, 6))}}{${fmt(t)}}$`, ans(u)],
    'vt': [
      `$${fmt(s)} = ${fmt(u)}t + ${co(a / 2)}t^2$, so $${co(a / 2)}t^2 + ${fmt(u)}t - ${fmt(s)} = 0$.`,
      `By the quadratic formula, $t = \\dfrac{-${fmt(u)} \\pm \\sqrt{${fmt(u * u)} + ${fmt(roundTo(2 * a * s, 6))}}}{${fmt(a)}}$. Time is positive, so take the $+$ sign.`,
      ans(t),
    ],
    'as': [`$s = \\tfrac{1}{2}(${fmt(u)} + ${fmt(v)}) \\times ${fmt(t)}$`, ans(s)],
    'au': [`$${fmt(s)} = \\tfrac{1}{2}(u + ${fmt(v)}) \\times ${fmt(t)}$, so $u = \\dfrac{2 \\times ${fmt(s)}}{${fmt(t)}} - ${fmt(v)}$`, ans(u)],
    'av': [`$${fmt(s)} = \\tfrac{1}{2}(${fmt(u)} + v) \\times ${fmt(t)}$, so $v = \\dfrac{2 \\times ${fmt(s)}}{${fmt(t)}} - ${fmt(u)}$`, ans(v)],
    'at': [`$${fmt(s)} = \\tfrac{1}{2}(${fmt(u)} + ${fmt(v)})t$, so $t = \\dfrac{2 \\times ${fmt(s)}}{${fmt(u + v)}}$`, ans(t)],
    'tv': [`$v^2 = ${fmt(u)}^2 + 2 \\times ${sp(a)} \\times ${fmt(s)} = ${fmt(v * v)}$`, `$v = \\sqrt{${fmt(v * v)}} ${eq3(v)}$`],
    'tu': [`$${fmt(v)}^2 = u^2 + 2 \\times ${sp(a)} \\times ${fmt(s)}$, so $u^2 = ${fmt(v * v)} - ${sp(roundTo(2 * a * s, 6))} = ${fmt(u * u)}$`, `$u = \\sqrt{${fmt(u * u)}} ${eq3(u)}$`],
    'ta': [`$${fmt(v)}^2 = ${fmt(u)}^2 + 2a \\times ${fmt(s)}$, so $a = \\dfrac{${fmt(v * v)} - ${fmt(u * u)}}{${fmt(2 * s)}}$`, ans(a)],
    'ts': [`$${fmt(v)}^2 = ${fmt(u)}^2 + 2 \\times ${sp(a)} \\times s$, so $s = \\dfrac{${fmt(v * v)} - ${fmt(u * u)}}{${fmt(2 * a)}}$`, ans(s)],
    'us': [`$s = ${fmt(v)} \\times ${fmt(t)} - \\tfrac{1}{2} \\times ${sp(a)} \\times ${fmt(t)}^2$`, ans(s)],
  };
  return [f, ...steps[out + x]!];
}

function suvatValues(rng: Rng, d: Difficulty, positiveA: boolean): Vals {
  return retry(
    () => {
      const u = rng.int(d === 1 ? 0 : 2, 20);
      const a = (positiveA || d === 1 ? 1 : rng.sign()) * rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const t = rng.int(2, 12);
      const v = u + a * t;
      return { u, a, t, v, s: roundTo(((u + v) / 2) * t, 6) };
    },
    (k) => k.v >= 0 && k.v !== k.u && k.s > 0,
    200,
  );
}

function suvat(rng: Rng, d: Difficulty): Out {
  const cases: Array<[Q[], Q]> =
    d === 1
      ? [[['u', 'a', 't'], 'v'], [['u', 'v', 't'], 's'], [['u', 'v', 't'], 'a'], [['u', 'a', 't'], 's']]
      : d === 2
        ? [[['u', 'v', 's'], 'a'], [['u', 'a', 's'], 'v'], [['u', 'v', 'a'], 's'], [['u', 'v', 'a'], 't'], [['u', 'v', 's'], 't']]
        : [[['u', 'a', 's'], 't'], [['v', 'a', 't'], 's'], [['v', 'a', 't'], 'u'], [['s', 't', 'v'], 'u'], [['v', 'a', 's'], 'u']];
  const [known, x] = rng.pick(cases);
  const k = suvatValues(rng, d, x === 't' && known.includes('s') && !known.includes('v'));
  const out = (['s', 'u', 'v', 'a', 't'] as Q[]).find((q) => q !== x && !known.includes(q))!;
  const given = known.map((q) => `${q} = ${fmt(k[q])}${UNIT[q]}`).join(',\\qquad ');
  return {
    prompt: `A particle moves in a straight line with constant acceleration. For one part of its motion,\n\n$$${given}$$\n\nFind ${NAME[x]}. ${SF_TEXT}`,
    parts: [sfPart(k[x], { label: `$${x} =$`, suffix: SUFFIX[x] })],
    hints: [
      'List the five quantities $s, u, v, a, t$, mark the three you know and the one you want, and find the one left out.',
      `The quantity left out is $${out}$, so use the formula without it: $${FORMULA[out]}$.`,
    ],
    solution: suvatSteps(out, x, k),
    calculator: true,
  };
}

function suvatProblems(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const u = rng.int(8, 30);
    const b = rng.pick([2, 2.5, 4, 5, 6.25, 8]);
    const dist = (u * u) / (2 * b);
    const time = u / b;
    return {
      prompt: `A car travelling at $${u}$ m/s brakes with a constant deceleration of $${fmt(b)}$ m/s² until it stops. Find the distance it travels while braking, and the time it takes to stop. ${SF_TEXT}`,
      parts: [sfPart(dist, { label: 'Distance:', suffix: 'm' }), sfPart(time, { label: 'Time:', suffix: 's' })],
      hints: [`Take the direction of motion as positive: $u = ${u}$, $v = 0$ and $a = -${fmt(b)}$.`, 'For the distance use $v^2 = u^2 + 2as$; for the time use $v = u + at$.'],
      solution: [
        `$u = ${u}$, $v = 0$, $a = -${fmt(b)}$.`,
        `$0 = ${u}^2 + 2(-${fmt(b)})s$, so $s = \\dfrac{${u * u}}{${fmt(2 * b)}} ${eq3(dist)}$ m.`,
        `$0 = ${u} - ${fmt(b)}t$, so $t = \\dfrac{${u}}{${fmt(b)}} ${eq3(time)}$ s.`,
      ],
      calculator: true,
    };
  }
  if (d === 2) {
    const V = rng.int(6, 24);
    const [t1, t2, t3] = [rng.int(3, 12), rng.int(10, 40), rng.int(3, 10)];
    const total = V * (t1 / 2 + t2 + t3 / 2);
    const dec = V / t3;
    const T = t1 + t2 + t3;
    const figure: Figure = {
      type: 'plane',
      grid: { xMin: 0, xMax: T + 2, yMin: 0, yMax: V + 4, xStep: Math.max(1, Math.round(T / 10)), yStep: Math.max(1, Math.round(V / 6)), xLabel: 't (s)', yLabel: 'v (m/s)' },
      polylines: [{ points: [[0, 0], [t1, V], [t1 + t2, V], [T, 0]] }],
      hideTickLabels: true,
    };
    return {
      prompt: `A train starts from rest and accelerates uniformly to $${V}$ m/s in $${t1}$ s. It keeps this speed for $${t2}$ s, then decelerates uniformly to rest in $${t3}$ s. The sketch shows its velocity–time graph. Find the total distance travelled, and the deceleration. ${SF_TEXT}`,
      figure,
      parts: [sfPart(total, { label: 'Distance:', suffix: 'm' }), sfPart(dec, { label: 'Deceleration:', suffix: 'm/s²' })],
      hints: ['The distance is the area under the velocity–time graph: two triangles and a rectangle (or one trapezium).', 'The deceleration is the change in speed divided by the time it takes.'],
      solution: [
        `Accelerating: $\\tfrac{1}{2} \\times ${t1} \\times ${V} = ${fmt(V * t1 / 2)}$ m. Steady: $${t2} \\times ${V} = ${V * t2}$ m. Decelerating: $\\tfrac{1}{2} \\times ${t3} \\times ${V} = ${fmt(V * t3 / 2)}$ m.`,
        `Total distance $= ${fmt(total)}$ m.`,
        `Deceleration $= \\dfrac{${V}}{${t3}} ${eq3(dec)}$ m/s².`,
      ],
      calculator: true,
    };
  }
  const V = rng.int(8, 20);
  const a = rng.pick([1, 1.5, 2, 2.5, 3, 4]);
  const t = (2 * V) / a;
  const dist = V * t;
  return {
    prompt: `A van moving at a constant $${V}$ m/s passes a point $O$. At that moment a car starts from rest at $O$ and accelerates uniformly at $${fmt(a)}$ m/s² in the same direction. Find how long the car takes to catch up with the van, and how far from $O$ this happens. ${SF_TEXT}`,
    parts: [sfPart(t, { label: 'Time:', suffix: 's' }), sfPart(dist, { label: 'Distance from $O$:', suffix: 'm' })],
    hints: ['Write each vehicle’s displacement from $O$ after $t$ seconds: the van moves at a constant speed, the car with $s = ut + \\tfrac{1}{2}at^2$.', 'The car catches up when the two displacements are equal. Solve for $t > 0$.'],
    solution: [
      `Van: $s = ${V}t$. Car: $s = \\tfrac{1}{2} \\times ${fmt(a)}t^2 = ${co(a / 2)}t^2$.`,
      `$${co(a / 2)}t^2 = ${V}t$, so $t(${co(a / 2)}t - ${V}) = 0$, and $t = 0$ (the start) or $t = \\dfrac{${V}}{${fmt(a / 2)}} ${eq3(t)}$ s.`,
      `Distance $= ${V} \\times ${s3(t)} ${eq3(dist)}$ m.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 12.3 Vertical motion under gravity
// ---------------------------------------------------------------------------

function verticalMotion(rng: Rng, d: Difficulty): Out {
  const u = rng.pick([4.9, 7, 9.8, 12, 14, 14.7, 15, 18, 19.6, 21, 24.5]);
  const H = (u * u) / (2 * G);
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: `A ball is projected vertically upwards at $${fmt(u)}$ m/s. Ignoring air resistance, find the greatest height it reaches above the point of projection. ${G_TEXT} ${SF_TEXT}`,
        parts: [sfPart(H, { suffix: 'm' })],
        hints: ['Take upwards as positive, so $a = -9.8$. At the greatest height the ball is momentarily at rest, so $v = 0$.', 'Use $v^2 = u^2 + 2as$.'],
        solution: [`$u = ${fmt(u)}$, $v = 0$, $a = -9.8$.`, `$0 = ${fmt(u)}^2 - 2 \\times 9.8 \\times s$, so $s = \\dfrac{${fmt(u * u)}}{19.6} ${eq3(H)}$ m.`],
        calculator: true,
      };
    }
    const t = u / G;
    return {
      prompt: `A ball is projected vertically upwards at $${fmt(u)}$ m/s. Ignoring air resistance, find the time it takes to reach its greatest height. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(t, { suffix: 's' })],
      hints: ['Take upwards as positive, so $a = -9.8$, and at the top $v = 0$.', 'Use $v = u + at$.'],
      solution: [`$u = ${fmt(u)}$, $v = 0$, $a = -9.8$.`, `$0 = ${fmt(u)} - 9.8t$, so $t = \\dfrac{${fmt(u)}}{9.8} ${eq3(t)}$ s.`],
      calculator: true,
    };
  }
  const h = roundTo(rng.int(2, 8) * H / 10, 0) || 1;
  if (d === 2) {
    const v = Math.sqrt(u * u - 2 * G * h);
    const T = (2 * u) / G;
    return {
      prompt: `A stone is thrown vertically upwards at $${fmt(u)}$ m/s. Ignoring air resistance, find its speed when it is $${fmt(h)}$ m above the point of projection, and the time it takes to return to the point of projection. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(v, { label: 'Speed:', suffix: 'm/s' }), sfPart(T, { label: 'Time:', suffix: 's' })],
      hints: ['Take upwards as positive, so $a = -9.8$. For the speed at a height, use $v^2 = u^2 + 2as$.', 'Back at the point of projection the displacement is $0$: use $s = ut + \\tfrac{1}{2}at^2$ with $s = 0$.'],
      solution: [
        `$v^2 = ${fmt(u)}^2 - 2 \\times 9.8 \\times ${fmt(h)} = ${fmt(roundTo(v * v, 4))}$, so $v ${eq3(v)}$ m/s.`,
        `$0 = ${fmt(u)}t - 4.9t^2 = t(${fmt(u)} - 4.9t)$, so $t = 0$ or $t = \\dfrac{${fmt(u)}}{4.9} ${eq3(T)}$ s.`,
      ],
      calculator: true,
    };
  }
  const gap = (2 * Math.sqrt(u * u - 2 * G * h)) / G;
  return {
    prompt: `A ball is projected vertically upwards at $${fmt(u)}$ m/s. Ignoring air resistance, find the length of time for which the ball is at least $${fmt(h)}$ m above the point of projection. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(gap, { suffix: 's' })],
    hints: [`Use $s = ut + \\tfrac{1}{2}at^2$ with $s = ${fmt(h)}$ and $a = -9.8$. You get a quadratic in $t$ with two solutions.`, 'The smaller solution is on the way up and the larger on the way down. The ball is above that height between them.'],
    solution: [
      `$${fmt(h)} = ${fmt(u)}t - 4.9t^2$, so $4.9t^2 - ${fmt(u)}t + ${fmt(h)} = 0$.`,
      `$t = \\dfrac{${fmt(u)} \\pm \\sqrt{${fmt(roundTo(u * u, 4))} - ${fmt(roundTo(19.6 * h, 4))}}}{9.8}$, so $t_1 \\approx ${s3((u - Math.sqrt(u * u - 2 * G * h)) / G)}$ s and $t_2 \\approx ${s3((u + Math.sqrt(u * u - 2 * G * h)) / G)}$ s.`,
      `Time above $${fmt(h)}$ m $= t_2 - t_1 ${eq3(gap)}$ s.`,
    ],
    calculator: true,
  };
}

function verticalFall(rng: Rng, d: Difficulty): Out {
  const H = rng.pick([4.9, 10, 12.5, 19.6, 20, 25, 30, 40, 44.1, 50, 60]);
  if (d === 1) {
    const t = Math.sqrt((2 * H) / G);
    const v = Math.sqrt(2 * G * H);
    return {
      prompt: `A stone is dropped from rest from a bridge $${fmt(H)}$ m above a river. Ignoring air resistance, find the time it takes to reach the water and its speed as it hits the water. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(t, { label: 'Time:', suffix: 's' }), sfPart(v, { label: 'Speed:', suffix: 'm/s' })],
      hints: ['Take downwards as positive: $u = 0$, $a = 9.8$ and $s = ' + fmt(H) + '$.', 'Use $s = ut + \\tfrac{1}{2}at^2$ for the time and $v^2 = u^2 + 2as$ for the speed.'],
      solution: [`$${fmt(H)} = 4.9t^2$, so $t = \\sqrt{\\dfrac{${fmt(H)}}{4.9}} ${eq3(t)}$ s.`, `$v^2 = 0 + 2 \\times 9.8 \\times ${fmt(H)} = ${fmt(roundTo(v * v, 4))}$, so $v ${eq3(v)}$ m/s.`],
      calculator: true,
    };
  }
  const u = rng.int(3, 15);
  const v = Math.sqrt(u * u + 2 * G * H);
  if (d === 2) {
    const t = (v - u) / G;
    return {
      prompt: `A ball is thrown vertically downwards at $${u}$ m/s from a window $${fmt(H)}$ m above the ground. Ignoring air resistance, find its speed as it hits the ground and the time it takes. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(v, { label: 'Speed:', suffix: 'm/s' }), sfPart(t, { label: 'Time:', suffix: 's' })],
      hints: [`Take downwards as positive: $u = ${u}$, $a = 9.8$, $s = ${fmt(H)}$.`, 'Find $v$ with $v^2 = u^2 + 2as$, then $t$ with $v = u + at$.'],
      solution: [`$v^2 = ${u}^2 + 2 \\times 9.8 \\times ${fmt(H)} = ${fmt(roundTo(v * v, 4))}$, so $v ${eq3(v)}$ m/s.`, `$t = \\dfrac{v - u}{a} = \\dfrac{${s3(v)} - ${u}}{9.8} ${eq3(t)}$ s.`],
      calculator: true,
    };
  }
  const t = (u + v) / G;
  return {
    prompt: `A ball is thrown vertically upwards at $${u}$ m/s from the edge of a cliff $${fmt(H)}$ m above the sea, and falls into the sea. Ignoring air resistance, find the time from when it is thrown until it reaches the sea, and its speed as it reaches the sea. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(t, { label: 'Time:', suffix: 's' }), sfPart(v, { label: 'Speed:', suffix: 'm/s' })],
    hints: [`Take upwards as positive. The sea is below the starting point, so $s = -${fmt(H)}$, with $u = ${u}$ and $a = -9.8$.`, 'Use $s = ut + \\tfrac{1}{2}at^2$, solve the quadratic, and keep the positive root. Then use $v^2 = u^2 + 2as$.'],
    solution: [
      `$-${fmt(H)} = ${u}t - 4.9t^2$, so $4.9t^2 - ${u}t - ${fmt(H)} = 0$.`,
      `$t = \\dfrac{${u} + \\sqrt{${u * u} + ${fmt(roundTo(19.6 * H, 4))}}}{9.8} ${eq3(t)}$ s (the other root is negative).`,
      `$v^2 = ${u}^2 + 2(-9.8)(-${fmt(H)}) = ${fmt(roundTo(v * v, 4))}$, so $v ${eq3(v)}$ m/s.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 12.4 Forces and Newton's laws
// ---------------------------------------------------------------------------

const vecTex = (x: number, y: number) => `(${polyString([[roundTo(x, 6), '\\mathbf{i}'], [roundTo(y, 6), '\\mathbf{j}']])})`;

function newtonLaw(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const m = rng.int(8, 15) * 100;
    const a = rng.pick([0.4, 0.5, 0.8, 1.2, 1.5, 2]);
    const R = rng.int(4, 16) * 50;
    const D = roundTo(m * a + R, 6);
    if (rng.chance(0.5)) {
      return {
        prompt: `A car of mass $${m}$ kg moves along a straight horizontal road. Its engine gives a driving force of $${fmt(D)}$ N, and the resistance to motion is $${R}$ N. Find the acceleration of the car.`,
        parts: [sfPart(a, { suffix: 'm/s²' })],
        hints: ['The resultant force is the driving force minus the resistance.', 'Newton’s second law: $F = ma$, so $a = \\dfrac{F}{m}$.'],
        solution: [`Resultant force $= ${fmt(D)} - ${R} = ${fmt(D - R)}$ N.`, `$${fmt(D - R)} = ${m}a$, so $a = ${fmt(a)}$ m/s².`],
      };
    }
    return {
      prompt: `A car of mass $${m}$ kg accelerates at $${fmt(a)}$ m/s² along a straight horizontal road against a resistance of $${R}$ N. Find the driving force of its engine.`,
      parts: [sfPart(D, { suffix: 'N' })],
      hints: ['Write the resultant force as driving force $D$ minus the resistance.', 'Set it equal to $ma$ and solve for $D$.'],
      solution: [`$D - ${R} = ${m} \\times ${fmt(a)} = ${fmt(m * a)}$`, `$D = ${fmt(D)}$ N`],
    };
  }
  if (d === 2) {
    const m = rng.int(5, 60);
    const a = rng.pick([0.2, 0.5, 0.8, 1.2, 1.5, 2.5]);
    if (rng.chance(0.5)) {
      const up = rng.chance(0.5);
      const T = roundTo(m * (G + (up ? a : -a)), 6);
      return {
        prompt: `A crate of mass $${m}$ kg hangs from a vertical rope. The crate is ${up ? 'raised' : 'lowered'} with an acceleration of $${fmt(a)}$ m/s² ${up ? 'upwards' : 'downwards'}. Find the tension in the rope. ${G_TEXT} ${SF_TEXT}`,
        parts: [sfPart(T, { suffix: 'N' })],
        hints: ['Two forces act on the crate: the tension $T$ upwards and its weight $mg$ downwards.', `Resolve in the direction of the acceleration (${up ? 'upwards' : 'downwards'}) and use $F = ma$.`],
        solution: up
          ? [`Upwards: $T - ${m} \\times 9.8 = ${m} \\times ${fmt(a)}$`, `$T = ${fmt(roundTo(m * G, 6))} + ${fmt(m * a)} ${eq3(T)}$ N`]
          : [`Downwards: $${m} \\times 9.8 - T = ${m} \\times ${fmt(a)}$`, `$T = ${fmt(roundTo(m * G, 6))} - ${fmt(m * a)} ${eq3(T)}$ N`],
        calculator: true,
      };
    }
    const T = rng.int(Math.ceil(m * G) + 5, Math.ceil(m * G) + 200);
    const acc = (T - m * G) / m;
    return {
      prompt: `A load of mass $${m}$ kg is pulled vertically upwards by a cable with a tension of $${T}$ N. Find the acceleration of the load. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(acc, { suffix: 'm/s²' })],
      hints: ['The resultant upward force is the tension minus the weight.', 'Weight $= mg$; then $a = \\dfrac{F}{m}$.'],
      solution: [`Weight $= ${m} \\times 9.8 = ${fmt(roundTo(m * G, 6))}$ N.`, `$${T} - ${fmt(roundTo(m * G, 6))} = ${m}a$, so $a ${eq3(acc)}$ m/s².`],
      calculator: true,
    };
  }
  const [p, q, r, s] = retry(() => [rng.nonZero(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-9, 9)], ([p, q, r, s]) => p + r !== 0 && q + s !== 0, 100);
  const m = rng.pick([0.5, 2, 4, 5, 10]);
  const [ax, ay] = [(p + r) / m, (q + s) / m];
  const mag = Math.hypot(ax, ay);
  const ang = acosD(ax / mag);
  return {
    prompt: `Two forces $${vecTex(p, q)}$ N and $${vecTex(r, s)}$ N act on a particle of mass $${fmt(m)}$ kg. Find the magnitude of its acceleration, and the angle between the acceleration and the vector $\\mathbf{i}$. ${SF_TEXT} Give the angle to 1 decimal place.`,
    parts: [sfPart(mag, { label: 'Magnitude:', suffix: 'm/s²' }), numPart(ang, { label: 'Angle with $\\mathbf{i}$:', decimals: 1, suffix: '°' })],
    hints: ['Add the forces component by component to get the resultant force, then use $\\mathbf{F} = m\\mathbf{a}$.', 'The magnitude of $x\\mathbf{i} + y\\mathbf{j}$ is $\\sqrt{x^2 + y^2}$. Sketch the vector to find its angle with $\\mathbf{i}$.'],
    solution: [
      `Resultant force $= ${vecTex(p + r, q + s)}$ N.`,
      `$\\mathbf{a} = \\dfrac{1}{${fmt(m)}}${vecTex(p + r, q + s)} = ${vecTex(roundTo(ax, 4), roundTo(ay, 4))}$ m/s².`,
      `$|\\mathbf{a}| = \\sqrt{${sp(roundTo(ax, 4))}^2 + ${sp(roundTo(ay, 4))}^2} ${eq3(mag)}$ m/s².`,
      `The angle with $\\mathbf{i}$ is $\\cos^{-1}\\left(\\dfrac{${fmt(roundTo(ax, 4))}}{${s3(mag)}}\\right) \\approx ${fmt(roundTo(ang, 1))}^\\circ$ (it points ${ay > 0 ? 'above' : 'below'} the $\\mathbf{i}$ direction).`,
    ],
    calculator: true,
  };
}

function lift(rng: Rng, d: Difficulty): Out {
  const m = rng.int(45, 95);
  const a = rng.pick([0.4, 0.5, 0.8, 1.2, 1.5, 2]);
  const up = rng.chance(0.5);
  const sgn = up ? 1 : -1;
  if (d === 1) {
    const R = m * (G + sgn * a);
    return {
      prompt: `A woman of mass $${m}$ kg stands in a lift that is accelerating ${up ? 'upwards' : 'downwards'} at $${fmt(a)}$ m/s². Find the normal reaction of the floor on her. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(R, { suffix: 'N' })],
      hints: ['Two forces act on her: the reaction $R$ of the floor upwards and her weight $mg$ downwards.', `Her acceleration is ${up ? 'upwards' : 'downwards'}, the same as the lift’s. Resolve in that direction and use $F = ma$.`],
      solution: up
        ? [`Upwards: $R - ${m} \\times 9.8 = ${m} \\times ${fmt(a)}$`, `$R = ${m}(9.8 + ${fmt(a)}) ${eq3(R)}$ N`]
        : [`Downwards: $${m} \\times 9.8 - R = ${m} \\times ${fmt(a)}$`, `$R = ${m}(9.8 - ${fmt(a)}) ${eq3(R)}$ N`],
      calculator: true,
    };
  }
  const M = rng.int(3, 9) * 100;
  if (d === 2) {
    const T = (M + m) * (G + sgn * a);
    const R = m * (G + sgn * a);
    return {
      prompt: `A lift of mass $${M}$ kg carries a box of mass $${m}$ kg on its floor. The lift is pulled by a vertical cable and accelerates ${up ? 'upwards' : 'downwards'} at $${fmt(a)}$ m/s². Find the tension in the cable and the reaction between the box and the floor. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(T, { label: 'Tension:', suffix: 'N' }), sfPart(R, { label: 'Reaction:', suffix: 'N' })],
      hints: ['For the tension, treat the lift and the box as one object of mass $' + (M + m) + '$ kg.', 'For the reaction, look at the box on its own: its weight and the reaction from the floor.'],
      solution: [
        `Whole system, ${up ? 'upwards' : 'downwards'}: ${up ? `$T - ${M + m} \\times 9.8 = ${M + m} \\times ${fmt(a)}$` : `$${M + m} \\times 9.8 - T = ${M + m} \\times ${fmt(a)}$`}, so $T ${eq3(T)}$ N.`,
        `Box alone: ${up ? `$R - ${m} \\times 9.8 = ${m} \\times ${fmt(a)}$` : `$${m} \\times 9.8 - R = ${m} \\times ${fmt(a)}$`}, so $R ${eq3(R)}$ N.`,
      ],
      calculator: true,
    };
  }
  const total = M + m;
  const T = Math.round(total * (G + sgn * a) / 10) * 10;
  const acc = T / total - G;
  const R = m * (G + acc);
  return {
    prompt: `A lift of mass $${M}$ kg carries a man of mass $${m}$ kg. The tension in the lift cable is $${T}$ N. Find the acceleration of the lift, taking upwards as positive, and the reaction of the floor on the man. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(acc, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(R, { label: 'Reaction:', suffix: 'N' })],
    hints: [`Treat the lift and the man as one object of mass $${total}$ kg: $T - ${total}g = ${total}a$.`, 'Then look at the man alone: $R - mg = ma$, with the same acceleration.'],
    solution: [
      `$${T} - ${total} \\times 9.8 = ${total}a$, so $a = \\dfrac{${T} - ${fmt(roundTo(total * G, 6))}}{${total}} ${eq3(acc)}$ m/s²${acc < 0 ? ' (the acceleration is downwards)' : ''}.`,
      `Man: $R = ${m}(9.8 + ${sp(roundTo(acc, 4))}) ${eq3(R)}$ N.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 12.5 Connected particles and pulleys
// ---------------------------------------------------------------------------

function towing(rng: Rng, d: Difficulty): Out {
  const M = rng.int(8, 16) * 100;
  const m = rng.int(3, 8) * 100;
  if (d === 1) {
    const D = rng.int(6, 30) * 100;
    const a = D / (M + m);
    const T = m * a;
    return {
      prompt: `A car of mass $${M}$ kg tows a trailer of mass $${m}$ kg along a straight horizontal road with a light rigid towbar. The engine gives a driving force of $${D}$ N, and resistances to motion can be ignored. Find the acceleration and the tension in the towbar. ${SF_TEXT}`,
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(T, { label: 'Tension:', suffix: 'N' })],
      hints: [`For the acceleration, treat the car and the trailer as one object of mass $${M + m}$ kg.`, 'For the tension, look at the trailer on its own: the tension is the only horizontal force on it.'],
      solution: [`Whole system: $${D} = ${M + m}a$, so $a ${eq3(a)}$ m/s².`, `Trailer: $T = ${m}a = ${m} \\times ${s3(a)} ${eq3(T)}$ N.`],
      calculator: true,
    };
  }
  const R1 = rng.int(2, 8) * 50;
  const R2 = rng.int(1, 6) * 50;
  if (d === 2) {
    const D = rng.int(Math.ceil((R1 + R2) / 100) + 3, 40) * 100;
    const a = (D - R1 - R2) / (M + m);
    const T = m * a + R2;
    return {
      prompt: `A car of mass $${M}$ kg tows a trailer of mass $${m}$ kg along a straight horizontal road with a light rigid towbar. The driving force is $${D}$ N, and the resistances to motion are $${R1}$ N on the car and $${R2}$ N on the trailer. Find the acceleration and the tension in the towbar. ${SF_TEXT}`,
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(T, { label: 'Tension:', suffix: 'N' })],
      hints: ['Whole system: driving force minus both resistances $= (M + m)a$. The tension is internal, so it cancels.', 'Trailer alone: $T - R_2 = ma$.'],
      solution: [`Whole system: $${D} - ${R1} - ${R2} = ${M + m}a$, so $a ${eq3(a)}$ m/s².`, `Trailer: $T - ${R2} = ${m} \\times ${s3(a)}$, so $T ${eq3(T)}$ N.`],
      calculator: true,
    };
  }
  const B = retry(() => rng.int(5, 40) * 100, (b) => Math.abs((m * (b + R1 + R2)) / (M + m) - R2) > 20, 100);
  const dec = (B + R1 + R2) / (M + m);
  const F = m * dec - R2;
  const thrust = F > 0;
  return {
    prompt: `A car of mass $${M}$ kg tows a trailer of mass $${m}$ kg along a straight horizontal road with a light rigid towbar. The engine is switched off and the car brakes with a braking force of $${B}$ N on the car. The resistances to motion are $${R1}$ N on the car and $${R2}$ N on the trailer. Find the deceleration and the magnitude of the force in the towbar, and say whether it is a tension or a thrust. ${SF_TEXT}`,
    parts: [sfPart(dec, { label: 'Deceleration:', suffix: 'm/s²' }), sfPart(Math.abs(F), { label: 'Force in towbar:', suffix: 'N' }), part(fixedChoice(['Tension', 'Thrust'], thrust ? 1 : 0), { label: 'The force is a' })],
    hints: ['Whole system: every backward force (braking and both resistances) gives the deceleration of the total mass.', 'Trailer alone: suppose the towbar pushes back on it with a thrust $F$. Then $F + R_2 = m \\times$ deceleration. A negative $F$ means the towbar is in tension.'],
    solution: [
      `Whole system: $${B} + ${R1} + ${R2} = ${M + m} \\times \\text{deceleration}$, so the deceleration is $${s3(dec)}$ m/s².`,
      `Trailer, with a thrust $F$ backwards: $F + ${R2} = ${m} \\times ${s3(dec)}$, so $F ${eq3(F)}$ N.`,
      thrust ? 'The value is positive, so the towbar pushes on the trailer: it is a thrust.' : `The value is negative, so the towbar pulls the trailer forwards: it is a tension of $${s3(-F)}$ N.`,
    ],
    calculator: true,
  };
}

function pulley(rng: Rng, d: Difficulty): Out {
  const [m1, m2] = retry(() => [rng.int(2, 12) / 2, rng.int(1, 10) / 2] as const, ([a, b]) => a > b, 100);
  if (d === 2) {
    const [mt, mh] = [rng.int(2, 12) / 2, rng.int(1, 8) / 2];
    const a = (mh * G) / (mt + mh);
    const T = mt * a;
    return {
      prompt: `A particle $A$ of mass $${fmt(mt)}$ kg rests on a smooth horizontal table. It is joined by a light inextensible string, which passes over a smooth pulley at the edge of the table, to a particle $B$ of mass $${fmt(mh)}$ kg hanging freely. The system is released from rest. Find the acceleration of the particles and the tension in the string. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(T, { label: 'Tension:', suffix: 'N' })],
      hints: ['Write $F = ma$ for each particle in its own direction of motion: $A$ along the table, $B$ downwards.', `$A$: $T = ${fmt(mt)}a$. $B$: $${fmt(mh)}g - T = ${fmt(mh)}a$. Add them to remove $T$.`],
      solution: [
        `$A$: $T = ${fmt(mt)}a$. $B$: $${fmt(mh)} \\times 9.8 - T = ${fmt(mh)}a$.`,
        `Adding: $${fmt(roundTo(mh * G, 6))} = ${fmt(mt + mh)}a$, so $a ${eq3(a)}$ m/s².`,
        `$T = ${fmt(mt)} \\times ${s3(a)} ${eq3(T)}$ N.`,
      ],
      calculator: true,
    };
  }
  const a = ((m1 - m2) * G) / (m1 + m2);
  const T = (2 * m1 * m2 * G) / (m1 + m2);
  const setup = `Particles $A$ and $B$, of masses $${fmt(m1)}$ kg and $${fmt(m2)}$ kg, are joined by a light inextensible string that passes over a smooth fixed pulley, with both particles hanging freely.`;
  if (d === 1) {
    return {
      prompt: `${setup} The system is released from rest. Find the acceleration of the particles and the tension in the string. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(T, { label: 'Tension:', suffix: 'N' })],
      hints: ['The heavier particle $A$ moves down and $B$ moves up, with the same acceleration $a$ and the same tension $T$.', `$A$: $${fmt(m1)}g - T = ${fmt(m1)}a$. $B$: $T - ${fmt(m2)}g = ${fmt(m2)}a$. Add them to remove $T$.`],
      solution: [
        `$A$ (down): $${fmt(m1)} \\times 9.8 - T = ${fmt(m1)}a$. $B$ (up): $T - ${fmt(m2)} \\times 9.8 = ${fmt(m2)}a$.`,
        `Adding: $${fmt(m1 - m2)} \\times 9.8 = ${fmt(m1 + m2)}a$, so $a ${eq3(a)}$ m/s².`,
        `$T = ${fmt(m2)}(9.8 + ${s3(a)}) ${eq3(T)}$ N.`,
      ],
      calculator: true,
    };
  }
  const h = rng.pick([0.5, 0.8, 1, 1.2, 1.5, 2]);
  const v = Math.sqrt(2 * a * h);
  const t = v / a;
  return {
    prompt: `${setup} The system is released from rest with $A$ at a height of $${fmt(h)}$ m above the floor. Find the speed of $A$ as it hits the floor, and the time it takes to get there. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(v, { label: 'Speed:', suffix: 'm/s' }), sfPart(t, { label: 'Time:', suffix: 's' })],
    hints: ['First find the acceleration: write $F = ma$ for each particle and add the equations.', `Then $A$ falls $${fmt(h)}$ m from rest with that acceleration: use $v^2 = u^2 + 2as$ and $v = u + at$.`],
    solution: [
      `$A$: $${fmt(m1)}g - T = ${fmt(m1)}a$ and $B$: $T - ${fmt(m2)}g = ${fmt(m2)}a$, so $a = \\dfrac{${fmt(m1 - m2)} \\times 9.8}{${fmt(m1 + m2)}} ${eq3(a)}$ m/s².`,
      `$v^2 = 0 + 2 \\times ${s3(a)} \\times ${fmt(h)}$, so $v ${eq3(v)}$ m/s.`,
      `$t = \\dfrac{v}{a} ${eq3(t)}$ s.`,
    ],
    calculator: true,
  };
}

export const MECHANICS_SKILLS: SkillDef[] = [
  skill({ id: 'mx-mech-units', name: 'Units in mechanics', description: 'Convert speeds, masses and other quantities into SI units, and find a weight from a mass', outcomes: ['ME1'], lessonId: 'mx-12-1', calculator: true, gen: mechUnits }),
  skill({ id: 'mx-mech-modelling', name: 'Modelling assumptions', description: 'Say what modelling words such as particle, light, inextensible and smooth mean, and what they let us assume', outcomes: ['ME1'], lessonId: 'mx-12-1', format: 'mc', gen: mechModelling }),
  skill({ id: 'mx-suvat', name: 'The constant acceleration formulae', description: 'Choose the suvat formula that fits and find a missing quantity', outcomes: ['ME2'], lessonId: 'mx-12-2', calculator: true, gen: suvat }),
  skill({ id: 'mx-suvat-problems', name: 'Problems with constant acceleration', description: 'Solve braking, multi-stage and catching-up problems with the suvat formulae', outcomes: ['ME2'], lessonId: 'mx-12-2', calculator: true, gen: suvatProblems }),
  skill({ id: 'mx-vertical-motion', name: 'Projected vertically upwards', description: 'Find the greatest height, times and speeds of an object projected vertically upwards', outcomes: ['ME3'], lessonId: 'mx-12-3', calculator: true, gen: verticalMotion }),
  skill({ id: 'mx-vertical-fall', name: 'Falling to the ground', description: 'Find the time and the speed of impact of an object dropped or thrown from a height', outcomes: ['ME3'], lessonId: 'mx-12-3', calculator: true, gen: verticalFall }),
  skill({ id: 'mx-newton-law', name: 'Newton’s second law', description: 'Use F = ma with driving forces, resistances, tensions and weights, and with forces as vectors', outcomes: ['ME4'], lessonId: 'mx-12-4', calculator: true, gen: newtonLaw }),
  skill({ id: 'mx-lift', name: 'Lifts', description: 'Find the tension in a lift cable and the reaction of the floor when a lift accelerates', outcomes: ['ME4'], lessonId: 'mx-12-4', calculator: true, gen: lift }),
  skill({ id: 'mx-towing', name: 'Towing', description: 'Find the acceleration of a car and trailer and the tension or thrust in the towbar', outcomes: ['ME5'], lessonId: 'mx-12-5', calculator: true, gen: towing }),
  skill({ id: 'mx-pulley', name: 'Pulleys', description: 'Find the acceleration and tension for particles joined by a string over a pulley', outcomes: ['ME5'], lessonId: 'mx-12-5', calculator: true, gen: pulley }),
];
