/** Math 10-3 Unit 7 — The Pythagorean Theorem and Similarity (G2, G3, A1). */
import { fixedChoice, mc, numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, RightTriangleFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
];

type Unit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft';
const UNIT_NAME: Record<Unit, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre', in: 'inch', ft: 'foot' };

/** A measurement for use inside $...$, e.g. 12\ \text{cm}. */
const ms = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x}\\ \\text{${u}}`;
/** A measurement written as a plain figure label, e.g. "12 cm". */
const fl = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x} ${u}`;

/** "to the nearest tenth of a metre", "to the nearest inch" ... */
function nearest(dp: number, u: Unit): string {
  const name = UNIT_NAME[u];
  if (dp === 0) return `to the nearest ${name}`;
  return `${roundingPhrase(dp)} of ${/^[aeiou]/.test(name) ? 'an' : 'a'} ${name}`;
}

/** True when x is a finite number that is not close to a rounding boundary at dp places. */
function safe(x: number, dp: number): boolean {
  if (!Number.isFinite(x) || x <= 0) return false;
  const f = x * 10 ** dp;
  return Math.abs(f - Math.floor(f) - 0.5) > 0.04;
}

const sq = (x: number) => roundTo(x * x, 6);

/** True when x has at most dp decimal places. */
const hasDp = (x: number, dp: number) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-9;

/** A mixed number in LaTeX with a power-of-two denominator, e.g. 3\tfrac{3}{8}. */
function mixedTex(x: number, den = 16): string {
  let whole = Math.floor(x + 1e-9);
  let num = Math.round((x - whole) * den);
  if (num === den) {
    whole += 1;
    num = 0;
  }
  if (num === 0) return `${whole}`;
  const g = gcd(num, den);
  const f = `\\tfrac{${num / g}}{${den / g}}`;
  return whole ? `${whole}${f}` : f;
}

/** Feet and inches inside maths, e.g. 9\ \text{ft}\ 11\tfrac{1}{2}\ \text{in}. */
function ftInTex(totalInches: number): string {
  const ft = Math.floor(totalInches / 12 + 1e-9);
  const inch = roundTo(totalInches - ft * 12, 4);
  if (inch === 0) return `${ft}\\ \\text{ft}`;
  return `${ft}\\ \\text{ft}\\ ${mixedTex(inch)}\\ \\text{in}`;
}

/** Thin-space grouping for large numbers in maths: 50\,000. */
const big = (n: number) => fmt(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');

/** n/d as a fraction and a decimal. */
function ratioTex(n: number, d: number): string {
  const r = n / d;
  const exact = Math.abs(r * 1000 - Math.round(r * 1000)) < 1e-6;
  return `\\dfrac{${fmt(n)}}{${fmt(d)}} ${exact ? '=' : '\\approx'} ${exact ? fmt(r, 3) : fmtFixed(r, 2)}`;
}

// ---------------------------------------------------------------------------
// Right-triangle figures
// ---------------------------------------------------------------------------

const VERTS = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['X', 'Y', 'Z'],
  ['D', 'E', 'F'],
  ['L', 'M', 'N'],
  ['J', 'K', 'L'],
  ['S', 'T', 'U'],
];

interface Tri {
  R: string;
  A: string;
  B: string;
  rotate: 0 | 1 | 2 | 3;
  mirror: boolean;
}

function makeTri(rng: Rng): Tri {
  const n = rng.shuffle(rng.pick(VERTS));
  return { R: n[0], A: n[1], B: n[2], rotate: rng.pick([0, 0, 1, 2, 3] as const), mirror: rng.chance(0.4) };
}

const CTX_TRI: Tri = { R: 'C', A: 'A', B: 'B', rotate: 0, mirror: false };
const seg = (p: string, q: string) => [p, q].sort().join('');

function triFig(t: Tri, legA: number, legB: number, sideLabels: RightTriangleFigure['sideLabels'], scene?: RightTriangleFigure['scene']): RightTriangleFigure {
  const plain = !scene || scene === 'none';
  const f: RightTriangleFigure = {
    type: 'rightTriangle',
    vertices: { right: t.R, a: t.A, b: t.B },
    legA,
    legB,
    sideLabels,
    rotate: plain ? t.rotate : 0,
    mirror: plain ? t.mirror : false,
  };
  if (!plain) f.scene = scene;
  return f;
}

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
  [15, 20, 25],
  [10, 24, 26],
  [20, 21, 29],
];

/** Steps for c = sqrt(a^2 + b^2). */
function hypSteps(a: number, b: number, c: number, dp: number | undefined, v = 'c'): string[] {
  const s = roundTo(sq(a) + sq(b), 6);
  return [
    `$${v}^2 = ${fmt(a)}^2 + ${fmt(b)}^2$`,
    `$${v}^2 = ${fmt(sq(a))} + ${fmt(sq(b))} = ${fmt(s)}$`,
    dp === undefined ? `$${v} = \\sqrt{${fmt(s)}} = ${fmt(c)}$` : `$${v} = \\sqrt{${fmt(s)}} \\approx ${fmtFixed(c, dp)}$`,
  ];
}

/** Steps for a leg: known leg a, hypotenuse c, unknown leg b. */
function legSteps(c: number, a: number, b: number, dp: number | undefined, v = 'x'): string[] {
  const s = roundTo(sq(c) - sq(a), 6);
  return [
    `$${fmt(a)}^2 + ${v}^2 = ${fmt(c)}^2$`,
    `Rearrange to get $${v}^2$ by itself: $${v}^2 = ${fmt(c)}^2 - ${fmt(a)}^2$`,
    `$${v}^2 = ${fmt(sq(c))} - ${fmt(sq(a))} = ${fmt(s)}$`,
    dp === undefined ? `$${v} = \\sqrt{${fmt(s)}} = ${fmt(b)}$` : `$${v} = \\sqrt{${fmt(s)}} \\approx ${fmtFixed(b, dp)}$`,
  ];
}

// ---------------------------------------------------------------------------
// Workplace right-triangle contexts
// ---------------------------------------------------------------------------

type SideKey = 'horiz' | 'vert' | 'hyp';
const SIDE_KEYS: SideKey[] = ['horiz', 'vert', 'hyp'];
const FIG_KEY = { horiz: 'ra', vert: 'rb', hyp: 'ab' } as const;

interface CtxSide {
  noun: string;
  given: (v: string) => string;
  ask: string;
  label: string;
}

interface RtCtx {
  id: string;
  /** The object that forms the hypotenuse, e.g. "The ladder". */
  hypThing: string;
  u: Unit;
  dp: number;
  scene?: RightTriangleFigure['scene'];
  intro: (name: string) => string;
  order: SideKey[];
  horiz: CtxSide;
  vert: CtxSide;
  hyp: CtxSide;
  /** [horiz, vert, hyp] with friendly (exact) values. */
  friendly: Array<[number, number, number]>;
  make: (rng: Rng, unknown: SideKey) => [number, number, number];
  hint: string;
}

const pickPair = (h: number, v: number): [number, number, number] => [h, v, Math.hypot(h, v)];
const fromHyp = (c: number, known: number, unknown: 'horiz' | 'vert'): [number, number, number] => {
  const other = Math.sqrt(c * c - known * known);
  return unknown === 'horiz' ? [other, known, c] : [known, other, c];
};

const CONTEXTS: RtCtx[] = [
  {
    id: 'ladder-ft',
    hypThing: 'The ladder',
    u: 'ft',
    dp: 1,
    scene: 'ladder',
    intro: (n) => `${n} leans an extension ladder against the wall of a house.`,
    order: ['hyp', 'horiz', 'vert'],
    hyp: { noun: 'length of the ladder', given: (v) => `The ladder is ${v} long.`, ask: 'How long is the ladder', label: 'L' },
    horiz: { noun: 'distance from the wall to the foot of the ladder', given: (v) => `The foot of the ladder is ${v} from the wall.`, ask: 'How far from the wall is the foot of the ladder', label: 'd' },
    vert: { noun: 'height the ladder reaches up the wall', given: (v) => `The top of the ladder touches the wall ${v} above the ground.`, ask: 'How high up the wall does the ladder reach', label: 'h' },
    friendly: [
      [5, 12, 13],
      [7, 24, 25],
      [8, 15, 17],
      [6, 8, 10],
      [9, 12, 15],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(6, 16) / 2, rng.int(20, 56) / 2);
      const L = rng.pick([12, 14, 16, 20, 24, 28, 32]);
      if (k === 'vert') return fromHyp(L, rng.int(6, Math.floor(L / 2)) / 2, 'vert');
      return fromHyp(L, L - rng.pick([0.5, 1, 1.5, 2, 2.5, 3]), 'horiz');
    },
    hint: 'The wall, the ground and the ladder form a right triangle. The ladder is across from the right angle, so it is the hypotenuse.',
  },
  {
    id: 'ladder-m',
    hypThing: 'The ladder',
    u: 'm',
    dp: 1,
    scene: 'ladder',
    intro: (n) => `${n} sets a ladder against the wall of a garage to clean the eavestroughs.`,
    order: ['hyp', 'horiz', 'vert'],
    hyp: { noun: 'length of the ladder', given: (v) => `The ladder is ${v} long.`, ask: 'How long is the ladder', label: 'L' },
    horiz: { noun: 'distance from the wall to the foot of the ladder', given: (v) => `The foot of the ladder is ${v} from the wall.`, ask: 'How far from the wall is the foot of the ladder', label: 'd' },
    vert: { noun: 'height the ladder reaches up the wall', given: (v) => `The top of the ladder rests ${v} up the wall.`, ask: 'How high up the wall does the ladder reach', label: 'h' },
    friendly: [
      [1.5, 3.6, 3.9],
      [1.2, 3.5, 3.7],
      [0.7, 2.4, 2.5],
      [0.9, 4, 4.1],
      [1.6, 6.3, 6.5],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(8, 22) / 10, rng.int(30, 75) / 10);
      const L = rng.pick([3.5, 4, 4.5, 5, 6, 7, 8]);
      if (k === 'vert') return fromHyp(L, rng.int(8, Math.floor((L * 10) / 3)) / 10, 'vert');
      return fromHyp(L, roundTo(L - rng.int(1, 6) / 10, 1), 'horiz');
    },
    hint: 'The wall, the ground and the ladder form a right triangle. The ladder is across from the right angle, so it is the hypotenuse.',
  },
  {
    id: 'tv',
    hypThing: 'The diagonal of the screen',
    u: 'in',
    dp: 1,
    intro: (n) => `${n} is shopping for a TV. Screen sizes are measured along the diagonal of the screen.`,
    order: ['hyp', 'horiz', 'vert'],
    hyp: { noun: 'diagonal of the screen', given: (v) => `The diagonal of the screen is ${v}.`, ask: 'How long is the diagonal of the screen', label: 'd' },
    horiz: { noun: 'width of the screen', given: (v) => `The screen is ${v} wide.`, ask: 'How wide is the screen', label: 'w' },
    vert: { noun: 'height of the screen', given: (v) => `The screen is ${v} tall.`, ask: 'How tall is the screen', label: 'h' },
    friendly: [
      [12, 9, 15],
      [16, 12, 20],
      [24, 18, 30],
      [32, 24, 40],
      [36, 27, 45],
      [40, 30, 50],
    ],
    make(rng, k) {
      if (k === 'hyp') {
        const w = rng.int(240, 640) / 10;
        return pickPair(w, roundTo((w * 9) / 16 + rng.int(-2, 2) / 10, 1));
      }
      const D = rng.pick([32, 40, 43, 50, 55, 65, 70, 75]);
      if (k === 'vert') return fromHyp(D, roundTo(D * 0.8716 + rng.int(-3, 3) / 10, 1), 'vert');
      return fromHyp(D, roundTo(D * 0.4903 + rng.int(-3, 3) / 10, 1), 'horiz');
    },
    hint: 'The width, the height and the diagonal of the screen form a right triangle. The diagonal is the hypotenuse.',
  },
  {
    id: 'rafter',
    hypThing: 'The rafter',
    u: 'ft',
    dp: 1,
    intro: (n) => `${n} is cutting rafters for a shed roof. Each rafter runs from the top of a wall up to the peak of the roof.`,
    order: ['horiz', 'vert', 'hyp'],
    horiz: { noun: 'run of the roof', given: (v) => `The run (the horizontal distance from the wall to the centre of the roof) is ${v}.`, ask: 'What is the run of the roof', label: 'r' },
    vert: { noun: 'rise of the roof', given: (v) => `The rise (the height of the peak above the top of the wall) is ${v}.`, ask: 'What is the rise of the roof', label: 'h' },
    hyp: { noun: 'length of each rafter', given: (v) => `Each rafter is ${v} long.`, ask: 'How long is each rafter', label: 'L' },
    friendly: [
      [12, 5, 13],
      [8, 6, 10],
      [12, 9, 15],
      [15, 8, 17],
      [16, 12, 20],
      [24, 7, 25],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(10, 28) / 2, rng.int(5, 16) / 2);
      const L = rng.int(14, 34) / 2;
      if (k === 'vert') return fromHyp(L, rng.int(Math.ceil(L * 1.4), Math.floor(L * 1.9)) / 2, 'vert');
      return fromHyp(L, rng.int(4, Math.floor(L)) / 2, 'horiz');
    },
    hint: 'The run, the rise and the rafter form a right triangle. The sloping rafter is the hypotenuse.',
  },
  {
    id: 'slab',
    hypThing: 'The diagonal',
    u: 'm',
    dp: 1,
    intro: (n) => `${n}’s crew is building the forms for a rectangular concrete slab. A diagonal splits the rectangle into two right triangles.`,
    order: ['horiz', 'vert', 'hyp'],
    horiz: { noun: 'length of the slab', given: (v) => `The slab is ${v} long.`, ask: 'How long is the slab', label: 'l' },
    vert: { noun: 'width of the slab', given: (v) => `The slab is ${v} wide.`, ask: 'How wide is the slab', label: 'w' },
    hyp: { noun: 'diagonal of the slab', given: (v) => `The diagonal from one corner to the opposite corner is ${v}.`, ask: 'How long is the diagonal from one corner to the opposite corner', label: 'd' },
    friendly: [
      [8, 6, 10],
      [12, 9, 15],
      [12, 5, 13],
      [15, 8, 17],
      [16, 12, 20],
      [4, 3, 5],
    ],
    make(rng, k) {
      if (k === 'hyp') {
        const l = rng.int(40, 140) / 10;
        return pickPair(l, rng.int(30, Math.round(l * 10)) / 10);
      }
      const d = rng.int(60, 160) / 10;
      if (k === 'vert') return fromHyp(d, roundTo((d * rng.int(70, 92)) / 100, 1), 'vert');
      return fromHyp(d, roundTo((d * rng.int(35, 60)) / 100, 1), 'horiz');
    },
    hint: 'The length, the width and the diagonal form a right triangle. The diagonal is the hypotenuse.',
  },
  {
    id: 'ramp',
    hypThing: 'The sloped surface of the ramp',
    u: 'm',
    dp: 2,
    scene: 'ramp',
    intro: (n) => `${n} is building a ramp from the ground up to a loading dock.`,
    order: ['hyp', 'horiz', 'vert'],
    horiz: { noun: 'run of the ramp', given: (v) => `The ramp covers a horizontal distance (run) of ${v}.`, ask: 'What is the run (horizontal distance) of the ramp', label: 'r' },
    vert: { noun: 'rise of the ramp', given: (v) => `It rises ${v} from the ground to the dock.`, ask: 'How high does the ramp rise', label: 'h' },
    hyp: { noun: 'length of the ramp surface', given: (v) => `The sloped surface of the ramp is ${v} long.`, ask: 'How long is the sloped surface of the ramp', label: 's' },
    friendly: [
      [2.4, 0.7, 2.5],
      [4.8, 1.4, 5],
      [3.6, 1.5, 3.9],
      [4, 0.9, 4.1],
      [2.4, 1, 2.6],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(30, 80) / 10, rng.int(60, 140) / 100);
      const s = rng.int(30, 80) / 10;
      if (k === 'vert') return fromHyp(s, roundTo((s * rng.int(950, 985)) / 1000, 2), 'vert');
      return fromHyp(s, rng.int(50, 140) / 100, 'horiz');
    },
    hint: 'The ground (run), the rise and the sloped surface form a right triangle. The sloped surface is the hypotenuse.',
  },
  {
    id: 'guy-wire',
    hypThing: 'The guy wire',
    u: 'm',
    dp: 1,
    intro: (n) => `${n} is installing a guy wire to support a new power pole.`,
    order: ['vert', 'horiz', 'hyp'],
    vert: { noun: 'height where the wire is attached to the pole', given: (v) => `The wire is attached to the pole ${v} above the ground.`, ask: 'How high up the pole is the wire attached', label: 'h' },
    horiz: { noun: 'distance from the base of the pole to the anchor', given: (v) => `The wire is anchored in the ground ${v} from the base of the pole.`, ask: 'How far from the base of the pole is the anchor', label: 'd' },
    hyp: { noun: 'length of the guy wire', given: (v) => `The guy wire is ${v} long.`, ask: 'How long is the guy wire', label: 'L' },
    friendly: [
      [5, 12, 13],
      [6, 8, 10],
      [9, 12, 15],
      [8, 15, 17],
      [4.5, 6, 7.5],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(6, 18) / 2, rng.int(12, 30) / 2);
      const L = rng.int(16, 36) / 2;
      if (k === 'vert') return fromHyp(L, rng.int(6, Math.floor(L)) / 2, 'vert');
      return fromHyp(L, roundTo((L * rng.int(75, 92)) / 100, 1), 'horiz');
    },
    hint: 'The pole, the ground and the wire form a right triangle. The wire is across from the right angle, so it is the hypotenuse.',
  },
  {
    id: 'gate',
    hypThing: 'The brace',
    u: 'in',
    dp: 1,
    intro: (n) => `${n} is building a rectangular wooden gate with a diagonal brace from one corner to the opposite corner.`,
    order: ['horiz', 'vert', 'hyp'],
    horiz: { noun: 'width of the gate', given: (v) => `The gate is ${v} wide.`, ask: 'How wide is the gate', label: 'w' },
    vert: { noun: 'height of the gate', given: (v) => `The gate is ${v} tall.`, ask: 'How tall is the gate', label: 'h' },
    hyp: { noun: 'length of the brace', given: (v) => `The brace is ${v} long.`, ask: 'How long is the brace', label: 'b' },
    friendly: [
      [48, 36, 60],
      [40, 30, 50],
      [36, 27, 45],
      [45, 24, 51],
      [48, 20, 52],
      [60, 45, 75],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(36, 72), rng.int(30, 54));
      const b = rng.int(50, 90);
      if (k === 'vert') return fromHyp(b, rng.int(Math.ceil(b * 0.55), Math.floor(b * 0.85)), 'vert');
      return fromHyp(b, rng.int(Math.ceil(b * 0.45), Math.floor(b * 0.8)), 'horiz');
    },
    hint: 'The width, the height and the brace form a right triangle. The brace is the hypotenuse.',
  },
];

/** A one-step right-triangle problem in a workplace context. */
function rtProblem(rng: Rng, ctx: RtCtx, unknown: SideKey, exact: boolean): GenOutput {
  const name = rng.pick(NAMES);
  const idx = SIDE_KEYS.indexOf(unknown);
  const vals = exact
    ? rng.pick(ctx.friendly)
    : retry(
        () => ctx.make(rng, unknown),
        (v) => v.every((x) => Number.isFinite(x) && x > 0) && safe(v[idx], ctx.dp) && !hasDp(v[idx], ctx.dp),
      );
  const [h, v, c] = vals;
  const val: Record<SideKey, number> = { horiz: h, vert: v, hyp: c };
  const x = val[unknown];
  const dp = exact ? undefined : ctx.dp;
  const givens = ctx.order
    .filter((k) => k !== unknown)
    .map((k) => ctx[k].given(`$${ms(val[k], ctx.u)}$`))
    .join(' ');
  const labels: RightTriangleFigure['sideLabels'] = {};
  for (const k of SIDE_KEYS) labels[FIG_KEY[k]] = k === unknown ? ctx[k].label : fl(val[k], ctx.u);
  const steps =
    unknown === 'hyp' ? hypSteps(h, v, c, dp, ctx.hyp.label) : legSteps(c, unknown === 'horiz' ? v : h, x, dp, ctx[unknown].label);
  const shown = exact ? fmt(x) : fmtFixed(x, ctx.dp);
  return {
    prompt: `${ctx.intro(name)} ${givens} ${ctx[unknown].ask}${exact ? '' : `, ${nearest(ctx.dp, ctx.u)}`}?`,
    figure: triFig(CTX_TRI, h, v, labels, ctx.scene),
    parts: [numPart(x, { decimals: dp, suffix: ctx.u, label: `$${ctx[unknown].label} =$` })],
    hints: [
      ctx.hint,
      unknown === 'hyp'
        ? 'You are finding the hypotenuse: square the two legs, add, then take the square root.'
        : 'You are finding a leg: rearrange $a^2 + b^2 = c^2$ to $a^2 = c^2 - b^2$, subtract, then take the square root.',
    ],
    solution: [
      `${ctx.hypThing} is across from the right angle, so it is the hypotenuse.`,
      ...steps,
      `The ${ctx[unknown].noun} is ${exact ? '' : 'about '}$${ms(shown, ctx.u)}$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// Lesson 7.1 — The Pythagorean theorem
// ---------------------------------------------------------------------------

const RT_UNITS: Unit[] = ['cm', 'm', 'ft', 'in'];

const pythHyp = skill({
  id: 'm103-pyth-hyp',
  name: 'Finding the hypotenuse',
  description: 'Use the Pythagorean theorem to find the hypotenuse of a right triangle from its two legs.',
  outcomes: ['G2'],
  lessonId: 'm103-7-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const [p, q, h] = rng.pick(TRIPLES);
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [a, b] = rng.chance(0.5) ? [p, q] : [q, p];
      return {
        prompt: 'Find the length of the hypotenuse, $c$, of the right triangle.',
        figure: triFig(t, a, b, { ra: fl(a, u), rb: fl(b, u), ab: 'c' }),
        parts: [numPart(h, { label: '$c =$', suffix: u })],
        hints: [
          'The hypotenuse is the side across from the right angle. It is always the longest side.',
          'Use $c^2 = a^2 + b^2$: square each leg, add, then take the square root.',
        ],
        solution: [...hypSteps(a, b, h, undefined), `The hypotenuse is $${ms(h, u)}$ long.`],
      };
    }
    if (d === 2) {
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [a, b, c] = retry(
        () => {
          const dec = rng.chance(0.5);
          const a = dec ? rng.int(20, 150) / 10 : rng.int(3, 30);
          const b = dec ? rng.int(20, 150) / 10 : rng.int(3, 30);
          return [a, b, Math.hypot(a, b)];
        },
        ([a, b, c]) => a !== b && Math.max(a, b) / Math.min(a, b) < 4 && safe(c, 1) && !Number.isInteger(roundTo(c, 6)),
      );
      const ans = `$${ms(fmtFixed(c, 1), u)}$`;
      if (rng.chance(0.4)) {
        // Named vertices, no diagram: the student must find the hypotenuse from the right angle.
        const hyp = seg(t.A, t.B);
        return {
          prompt: `In $\\triangle ${t.A}${t.B}${t.R}$, $\\angle ${t.R} = 90^\\circ$, $${seg(t.R, t.A)} = ${ms(a, u)}$ and $${seg(t.R, t.B)} = ${ms(b, u)}$. Find the length of $${hyp}$, ${nearest(1, u)}.`,
          parts: [numPart(c, { decimals: 1, suffix: u, label: `$${hyp} =$` })],
          hints: [
            `Sketch the triangle. The hypotenuse is across from the right angle at $${t.R}$, so it is $${hyp}$.`,
            `$${hyp}^2 = ${seg(t.R, t.A)}^2 + ${seg(t.R, t.B)}^2$`,
          ],
          solution: [`The right angle is at $${t.R}$, so the hypotenuse is the side across from it, $${hyp}$.`, ...hypSteps(a, b, c, 1, hyp), `$${hyp}$ is about ${ans} long.`],
        };
      }
      return {
        prompt: `Find the length of the hypotenuse, $c$, ${nearest(1, u)}.`,
        figure: triFig(t, a, b, { ra: fl(a, u), rb: fl(b, u), ab: 'c' }),
        parts: [numPart(c, { decimals: 1, label: '$c =$', suffix: u })],
        hints: ['The hypotenuse is across from the right angle.', 'Use $c^2 = a^2 + b^2$, then take the square root and round at the end.'],
        solution: [...hypSteps(a, b, c, 1), `The hypotenuse is about ${ans} long.`],
      };
    }
    if (rng.chance(0.2)) {
      // Wheelchair ramp with mixed units.
      const name = rng.pick(NAMES);
      const [riseIn, runFt, s] = retry(
        () => {
          const riseIn = rng.pick([12, 15, 18, 21, 24, 27, 30]);
          const runFt = riseIn * rng.pick([1, 1.25, 1.5]);
          return [riseIn, runFt, Math.hypot(runFt, riseIn / 12)];
        },
        (v) => safe(v[2], 2),
      );
      const riseFt = riseIn / 12;
      return {
        prompt: `${name} is building a wheelchair ramp. It rises $${ms(riseIn, 'in')}$ over a horizontal run of $${ms(runFt, 'ft')}$. How long is the sloped surface of the ramp, in feet, ${nearest(2, 'ft')}?`,
        figure: triFig(CTX_TRI, runFt, riseFt, { ra: fl(runFt, 'ft'), rb: fl(riseIn, 'in'), ab: 's' }, 'ramp'),
        parts: [numPart(s, { decimals: 2, suffix: 'ft', label: '$s =$' })],
        hints: ['All three sides must be in the same unit. Change the rise from inches to feet first ($12\\ \\text{in} = 1\\ \\text{ft}$).', 'The sloped surface is the hypotenuse: $s^2 = (\\text{run})^2 + (\\text{rise})^2$.'],
        solution: [
          `Change the rise to feet: $${riseIn} \\div 12 = ${fmt(riseFt)}\\ \\text{ft}$.`,
          ...hypSteps(runFt, riseFt, s, 2, 's'),
          `The ramp surface is about $${ms(fmtFixed(s, 2), 'ft')}$ long.`,
        ],
        calculator: true,
      };
    }
    return rtProblem(rng, rng.pick(CONTEXTS), 'hyp', false);
  },
});

const pythLeg = skill({
  id: 'm103-pyth-leg',
  name: 'Finding a leg',
  description: 'Rearrange the Pythagorean theorem to find a leg of a right triangle from the hypotenuse and the other leg.',
  outcomes: ['G2', 'A1'],
  lessonId: 'm103-7-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const [p, q, h] = rng.pick(TRIPLES);
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [legA, legB] = rng.chance(0.5) ? [p, q] : [q, p];
      const unknownA = rng.chance(0.5);
      const x = unknownA ? legA : legB;
      const known = unknownA ? legB : legA;
      return {
        prompt: 'Find the length of the unknown leg, $x$.',
        figure: triFig(t, legA, legB, { ra: unknownA ? 'x' : fl(legA, u), rb: unknownA ? fl(legB, u) : 'x', ab: fl(h, u) }),
        parts: [numPart(x, { label: '$x =$', suffix: u })],
        hints: [
          `The side across from the right angle ($${fmt(h)}$) is the hypotenuse, $c$. The unknown $x$ is a leg.`,
          'Rearrange $a^2 + b^2 = c^2$ to get $x^2 = c^2 - (\\text{known leg})^2$. Subtract, then take the square root.',
        ],
        solution: [...legSteps(h, known, x, undefined), `The missing leg is $${ms(x, u)}$ long.`],
      };
    }
    if (d === 2) {
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [a, c, b] = retry(
        () => {
          const dec = rng.chance(0.5);
          const a = dec ? rng.int(20, 150) / 10 : rng.int(3, 30);
          const c = roundTo(a + (dec ? rng.int(10, 120) / 10 : rng.int(2, 15)), 1);
          return [a, c, Math.sqrt(c * c - a * a)];
        },
        ([a, , b]) => b / a > 0.3 && b / a < 3.5 && safe(b, 1) && !Number.isInteger(roundTo(b, 6)),
      );
      const ans = `$${ms(fmtFixed(b, 1), u)}$`;
      if (rng.chance(0.4)) {
        const hyp = seg(t.A, t.B);
        const knownSeg = seg(t.R, t.A);
        const unknownSeg = seg(t.R, t.B);
        return {
          prompt: `In $\\triangle ${t.A}${t.B}${t.R}$, $\\angle ${t.R} = 90^\\circ$, $${hyp} = ${ms(c, u)}$ and $${knownSeg} = ${ms(a, u)}$. Find the length of $${unknownSeg}$, ${nearest(1, u)}.`,
          parts: [numPart(b, { decimals: 1, suffix: u, label: `$${unknownSeg} =$` })],
          hints: [
            `Sketch the triangle. The hypotenuse is across from the right angle at $${t.R}$, so it is $${hyp}$. The side you want is a leg.`,
            `$${unknownSeg}^2 = ${hyp}^2 - ${knownSeg}^2$`,
          ],
          solution: [`The right angle is at $${t.R}$, so $${hyp}$ is the hypotenuse and $${unknownSeg}$ is a leg.`, ...legSteps(c, a, b, 1, unknownSeg), `$${unknownSeg}$ is about ${ans} long.`],
        };
      }
      const unknownA = rng.chance(0.5);
      const legA = unknownA ? b : a;
      const legB = unknownA ? a : b;
      return {
        prompt: `Find the length of the unknown leg, $x$, ${nearest(1, u)}.`,
        figure: triFig(t, legA, legB, { ra: unknownA ? 'x' : fl(a, u), rb: unknownA ? fl(a, u) : 'x', ab: fl(c, u) }),
        parts: [numPart(b, { decimals: 1, label: '$x =$', suffix: u })],
        hints: ['Which side is the hypotenuse? It is across from the right angle.', 'To find a leg, subtract: $x^2 = c^2 - a^2$. Then take the square root.'],
        solution: [...legSteps(c, a, b, 1), `The missing leg is about ${ans} long.`],
      };
    }
    if (rng.chance(0.2)) {
      // Ladder to a ledge given in feet and inches.
      const name = rng.pick(NAMES);
      const [L, hFt, hIn, dist] = retry(
        () => {
          const L = rng.pick([16, 20, 24, 28]);
          const hFt = L - rng.int(1, 3);
          const hIn = rng.pick([3, 6, 9]);
          const h = hFt + hIn / 12;
          return [L, hFt, hIn, Math.sqrt(L * L - h * h)];
        },
        (v) => safe(v[3], 1),
      );
      const h = hFt + hIn / 12;
      return {
        prompt: `A window ledge is $${hFt}\\ \\text{ft}\\ ${hIn}\\ \\text{in}$ above the ground. ${name} wants the top of a $${ms(L, 'ft')}$ ladder to rest exactly at the ledge. How far from the wall should the foot of the ladder be, in feet, ${nearest(1, 'ft')}?`,
        figure: triFig(CTX_TRI, dist, h, { ra: 'd', rb: `${hFt} ft ${hIn} in`, ab: fl(L, 'ft') }, 'ladder'),
        parts: [numPart(dist, { decimals: 1, suffix: 'ft', label: '$d =$' })],
        hints: ['Change the height to feet only: divide the inches by 12.', 'The ladder is the hypotenuse, so $d^2 = L^2 - h^2$.'],
        solution: [
          `Change the height to feet: $${hIn} \\div 12 = ${fmt(hIn / 12)}$, so $h = ${fmt(h)}\\ \\text{ft}$.`,
          ...legSteps(L, h, dist, 1, 'd'),
          `The foot of the ladder should be about $${ms(fmtFixed(dist, 1), 'ft')}$ from the wall.`,
        ],
        calculator: true,
      };
    }
    return rtProblem(rng, rng.pick(CONTEXTS), rng.pick(['horiz', 'vert'] as const), false);
  },
});

// ---- Is it a right triangle? ----

function rightSet(rng: Rng, decimals: boolean): number[] {
  const [p, q, h] = rng.pick(TRIPLES.slice(0, 8));
  const k = decimals ? rng.pick([0.5, 1.5, 2.5, 0.1, 0.2, 0.3]) : 1;
  return [p, q, h].map((x) => roundTo(x * k, 2));
}

function notRightSet(rng: Rng, decimals: boolean): number[] {
  return retry(
    () => {
      const s = rightSet(rng, decimals);
      const step = decimals ? (s[2] < 4 ? 0.1 : 0.5) : 1;
      const which = rng.int(0, 2);
      s[which] = roundTo(s[which] + rng.pick([-2, -1, 1, 2]) * step, 2);
      return s.sort((x, y) => x - y);
    },
    (s) => s[0] > 0 && s[0] + s[1] > s[2] + 1e-9 && Math.abs(sq(s[0]) + sq(s[1]) - sq(s[2])) > 1e-6 && new Set(s).size === 3,
  );
}

function rightTestSteps(s: number[], u: string): string[] {
  const [a, b, c] = s;
  const sum = roundTo(sq(a) + sq(b), 6);
  const right = Math.abs(sum - sq(c)) < 1e-6;
  return [
    `The longest side is $${ms(c, u)}$, so it is the only side that could be the hypotenuse.`,
    `$a^2 + b^2 = ${fmt(a)}^2 + ${fmt(b)}^2 = ${fmt(sq(a))} + ${fmt(sq(b))} = ${fmt(sum)}$`,
    `$c^2 = ${fmt(c)}^2 = ${fmt(sq(c))}$`,
    right
      ? `$${fmt(sum)} = ${fmt(sq(c))}$, so $a^2 + b^2 = c^2$ and the triangle **is** a right triangle.`
      : `$${fmt(sum)} \\ne ${fmt(sq(c))}$, so the triangle is **not** a right triangle.`,
  ];
}

const CORNER_JOBS = [
  'framing a deck',
  'building the forms for a concrete slab',
  'laying out the floor of a garden shed',
  'framing the walls of a garage',
  'laying out a stone patio',
  'setting fence posts at the corner of a yard',
];

const pythCheck = skill({
  id: 'm103-pyth-check',
  name: 'Checking for a right angle',
  description: 'Use the converse of the Pythagorean theorem and the 3-4-5 method to decide whether a triangle or a corner is square.',
  outcomes: ['G2'],
  lessonId: 'm103-7-1',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    const u = rng.pick(RT_UNITS);
    if (d === 1) {
      const right = rng.chance(0.5);
      const s = right ? rightSet(rng, false) : notRightSet(rng, false);
      return {
        prompt: `A triangle has sides of $${ms(s[0], u)}$, $${ms(s[1], u)}$ and $${ms(s[2], u)}$. Is it a right triangle?`,
        parts: [{ answer: fixedChoice(['Yes, it is a right triangle.', 'No, it is not a right triangle.', 'You cannot tell without measuring the angles.'], right ? 0 : 1) }],
        hints: [
          'You do not need a protractor. A triangle is a right triangle only if the squares of the two shorter sides add up to the square of the longest side.',
          'Compare $a^2 + b^2$ with $c^2$, where $c$ is the longest side.',
        ],
        solution: rightTestSteps(s, u),
      };
    }
    if (d === 2) {
      const dec = rng.chance(0.5);
      if (rng.chance(0.35)) {
        // Which set of sides makes a right triangle?
        const good = rightSet(rng, dec);
        const bad = [notRightSet(rng, dec), notRightSet(rng, dec), notRightSet(rng, dec), notRightSet(rng, dec)];
        const show = (s: number[]) => `$${s.map((x) => ms(x, u)).join(',\\ ')}$`;
        const [a, b, c] = good;
        return {
          prompt: 'Which set of side lengths makes a **right** triangle?',
          parts: [{ answer: mc(rng, show(good), bad.map(show)) }],
          hints: ['For each set, call the longest side $c$.', 'Check whether $a^2 + b^2 = c^2$. Only one set works exactly.'],
          solution: [
            `Test $${fmt(a)}$, $${fmt(b)}$ and $${fmt(c)}$: $${fmt(a)}^2 + ${fmt(b)}^2 = ${fmt(sq(a))} + ${fmt(sq(b))} = ${fmt(sq(a) + sq(b))}$ and $${fmt(c)}^2 = ${fmt(sq(c))}$.`,
            'The two results are equal. In each of the other sets, $a^2 + b^2$ does not equal $c^2$.',
            `The right triangle has sides ${show(good)}.`,
          ],
        };
      }
      const right = rng.chance(0.5);
      const s = right ? rightSet(rng, dec) : notRightSet(rng, dec);
      const [a, b, c] = s.map((x) => fmt(x));
      const shown = rng.shuffle(s);
      const last = shown[2];
      let correct: string;
      let distractors: string[];
      if (right) {
        const wrongHyp =
          last !== s[2]
            ? `No, because $${fmt(shown[0])}^2 + ${fmt(shown[1])}^2 \\ne ${fmt(last)}^2$`
            : `No, because $${a}^2 + ${c}^2 \\ne ${b}^2$`;
        correct = `Yes, because $${a}^2 + ${b}^2 = ${c}^2$`;
        distractors = [`No, because $${a} + ${b} \\ne ${c}$`, wrongHyp, `Yes, because $${a} + ${b} > ${c}$`];
      } else {
        correct = `No, because $${a}^2 + ${b}^2 \\ne ${c}^2$`;
        distractors = [`Yes, because $${a} + ${b} > ${c}$`, `No, because $${a} + ${b} \\ne ${c}$`, `Yes, because $${a}^2 + ${b}^2$ is close to $${c}^2$`];
      }
      return {
        prompt: `A triangle has sides of $${ms(shown[0], u)}$, $${ms(shown[1], u)}$ and $${ms(shown[2], u)}$. Is it a right triangle? Choose the answer with the correct reason.`,
        parts: [{ answer: mc(rng, correct, distractors) }],
        hints: ['The hypotenuse must be the **longest** side, even if it is not listed last.', 'Square the two shorter sides and add. Is the total exactly equal to the square of the longest side?'],
        solution: rightTestSteps(s, u),
      };
    }
    // d = 3: the 3-4-5 method on the job.
    const name = rng.pick(NAMES);
    if (rng.chance(0.35)) {
      const metric = rng.chance(0.4);
      const k = metric ? rng.int(2, 6) : rng.int(2, 5);
      const base = metric ? 0.3 : 3;
      const unit = metric ? 'm' : 'ft';
      const set = (x: number, y: number, z: number) => [x, y, z].map((v) => roundTo(v, 2));
      const step = base / 3;
      const good = set(base * k, ((base * 4) / 3) * k, ((base * 5) / 3) * k);
      const cands = [
        set(good[0], good[0] + step, good[0] + 2 * step),
        set(good[0], good[1], good[0] + good[1]),
        set(good[0], good[1], 2 * good[0]),
        set(((base * 4) / 3) * k, ((base * 5) / 3) * k, 2 * good[0]),
      ].filter((s) => Math.abs(sq(s[0]) + sq(s[1]) - sq(s[2])) > 1e-6);
      const show = (s: number[]) => `$${s.map((x) => ms(x, unit)).join(',\\ ')}$`;
      return {
        prompt: `${name} is ${rng.pick(CORNER_JOBS)} and wants to use the 3-4-5 method to check that a corner is square. Bigger measurements give a more accurate check. Which set of measurements (side, side, diagonal) will work?`,
        parts: [{ answer: mc(rng, show(good), rng.shuffle(cands).map(show)) }],
        hints: ['The 3-4-5 method works because $3^2 + 4^2 = 5^2$.', 'Multiply **all three** numbers by the same number. Adding the same amount to each does not keep the shape.'],
        solution: [
          `Multiply 3, 4 and 5 by the same number: ${show(good)}.`,
          `Check: $${fmt(good[0])}^2 + ${fmt(good[1])}^2 = ${fmt(sq(good[0]))} + ${fmt(sq(good[1]))} = ${fmt(sq(good[0]) + sq(good[1]))} = ${fmt(good[2])}^2$.`,
          `The set ${show(good)} works.`,
        ],
      };
    }
    const status = rng.pick(['square', 'short', 'long'] as const);
    const metric = rng.chance(0.4);
    const k = metric ? rng.int(2, 4) : rng.int(1, 3);
    const [a, b, c] = metric ? [30 * k, 40 * k, 50 * k] : [3 * k, 4 * k, 5 * k];
    const unit = metric ? 'cm' : 'ft';
    const off = status === 'square' ? 0 : metric ? rng.pick([0.5, 1, 1.5, 2]) : rng.pick([0.25, 0.5, 0.75, 1, 1.25, 1.5]);
    const signed = status === 'long' ? off : -off;
    const measured = metric ? ms(c + signed, 'cm') : ftInTex(12 * c + signed);
    const offTex = metric ? ms(off, 'cm') : `${mixedTex(off)}\\ \\text{in}`;
    const last =
      status === 'square'
        ? `The measured diagonal is exactly $${ms(c, unit)}$, so the corner is square ($90^\\circ$).`
        : status === 'short'
          ? `The diagonal is $${offTex}$ too short. A short diagonal means the two sides are pulled too close together, so the corner is not square: the angle is less than $90^\\circ$.`
          : `The diagonal is $${offTex}$ too long. A long diagonal means the two sides are spread too far apart, so the corner is not square: the angle is more than $90^\\circ$.`;
    return {
      prompt: `${name} is ${rng.pick(CORNER_JOBS)}. To check a corner, ${name} measures $${ms(a, unit)}$ along one side and $${ms(b, unit)}$ along the other side, then measures the diagonal between the two marks. The diagonal is $${measured}$. Is the corner square? If not, which way is it out?`,
      parts: [
        {
          answer: fixedChoice(
            ['Yes. The corner is square.', 'No. The diagonal is too short, so the angle is less than $90^\\circ$.', 'No. The diagonal is too long, so the angle is more than $90^\\circ$.'],
            status === 'square' ? 0 : status === 'short' ? 1 : 2,
          ),
        },
      ],
      hints: [
        'Work out how long the diagonal should be if the corner were exactly $90^\\circ$. It is the hypotenuse.',
        'If the diagonal is shorter than it should be, the sides are squeezed together. If it is longer, they are spread apart.',
      ],
      solution: [
        `For a square corner, $${a}^2 + ${b}^2 = ${sq(a)} + ${sq(b)} = ${sq(a) + sq(b)}$, so the diagonal should be $\\sqrt{${sq(a) + sq(b)}} = ${ms(c, unit)}$.`,
        ...(status === 'square' ? [] : [`The measured diagonal is $${measured}$.`]),
        last,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.2 — Pythagorean theorem on the job
// ---------------------------------------------------------------------------

function twoStep(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.int(0, 5);
  if (kind === 0) {
    // Shortcut along a diagonal.
    const job = rng.pick([
      { u: 'm' as Unit, what: 'parking lot', intro: `${name} walks diagonally across a rectangular parking lot instead of along two sides.`, ask: 'How much shorter is the diagonal path', l: [30, 90], w: [20, 60] },
      { u: 'ft' as Unit, what: 'basement room', intro: `${name}, a plumber, can run a pipe diagonally across the ceiling of a rectangular basement room instead of along two walls.`, ask: 'How much pipe does the diagonal route save', l: [12, 26], w: [8, 18] },
      { u: 'm' as Unit, what: 'field', intro: `${name} drives a tractor diagonally across a rectangular hay field instead of along two fence lines.`, ask: 'How much shorter is the diagonal route', l: [200, 600], w: [120, 400] },
    ]);
    const [l, w, save] = retry(
      () => {
        const l = rng.int(job.l[0], job.l[1]);
        const w = rng.int(job.w[0], Math.min(job.w[1], l - 2));
        return [l, w, l + w - Math.hypot(l, w)];
      },
      (v) => safe(v[2], 1) && safe(Math.hypot(v[0], v[1]), 2),
    );
    const dg = Math.hypot(l, w);
    return {
      prompt: `${job.intro} The ${job.what} is $${ms(l, job.u)}$ long and $${ms(w, job.u)}$ wide. ${job.ask}, ${nearest(1, job.u)}?`,
      figure: triFig(CTX_TRI, l, w, { ra: fl(l, job.u), rb: fl(w, job.u), ab: 'd' }),
      parts: [numPart(save, { decimals: 1, suffix: job.u })],
      hints: ['First find the length of the diagonal with the Pythagorean theorem.', 'Then subtract the diagonal from the distance along the two sides.'],
      solution: [
        `Along the two sides: $${l} + ${w} = ${ms(l + w, job.u)}$.`,
        `Diagonal: $d = \\sqrt{${l}^2 + ${w}^2} = \\sqrt{${sq(l) + sq(w)}} \\approx ${ms(fmtFixed(dg, 2), job.u)}$.`,
        `Difference: $${l + w} - ${fmtFixed(dg, 2)} \\approx ${fmtFixed(save, 1)}$.`,
        `The diagonal route is about $${ms(fmtFixed(save, 1), job.u)}$ shorter.`,
      ],
      calculator: true,
    };
  }
  if (kind === 1) {
    // Ladder 4-to-1 rule.
    const metric = rng.chance(0.35);
    const u: Unit = metric ? 'm' : 'ft';
    const h = retry(
      () => (metric ? rng.pick([4, 4.8, 5.2, 6, 6.4, 7.2, 8]) : rng.pick([12, 14, 16, 18, 20, 22, 24, 26, 28])),
      (x) => safe(Math.hypot(x, x / 4), 1),
    );
    const foot = h / 4;
    const L = Math.hypot(h, foot);
    return {
      prompt: `A safety rule for ladders says the foot of the ladder should be $${ms(1, u)}$ out from the wall for every $${ms(4, u)}$ of height where the ladder touches the wall. ${name} needs the ladder to touch the wall $${ms(h, u)}$ above the ground. (a) How far from the wall should the foot of the ladder be? (b) How long must the ladder be, ${nearest(1, u)}?`,
      figure: triFig(CTX_TRI, foot, h, { ra: 'd', rb: fl(h, u), ab: 'L' }, 'ladder'),
      parts: [numPart(foot, { suffix: u, label: '(a) Distance from the wall' }), numPart(L, { decimals: 1, suffix: u, label: '(b) Length of the ladder' })],
      hints: ['For (a), divide the height by 4.', 'For (b), the ladder is the hypotenuse: $L^2 = h^2 + d^2$.'],
      solution: [
        `(a) $d = ${fmt(h)} \\div 4 = ${ms(foot, u)}$`,
        ...hypSteps(foot, h, L, 1, 'L').map((s, i) => (i === 0 ? `(b) ${s}` : s)),
        `The foot goes $${ms(foot, u)}$ from the wall, and the ladder must be about $${ms(fmtFixed(L, 1), u)}$ long.`,
      ],
      calculator: true,
    };
  }
  if (kind === 2) {
    // Rafter with an overhang.
    const [W, r, o, R] = retry(
      () => {
        const W = 2 * rng.int(6, 16);
        const r = rng.int(6, 16) / 2;
        const o = rng.pick([1, 1.5, 2]);
        return [W, r, o, Math.hypot(W / 2, r) + o];
      },
      (v) => safe(v[3], 1) && safe(v[3] - v[2], 2),
    );
    const run = W / 2;
    const slope = Math.hypot(run, r);
    return {
      prompt: `${name} is building a roof on a garage that is $${ms(W, 'ft')}$ wide. The peak of the roof is centred, $${ms(r, 'ft')}$ above the top of the walls. Each rafter also extends $${ms(o, 'ft')}$ past the wall (measured along the rafter) to make the overhang. How long must each rafter be, ${nearest(1, 'ft')}?`,
      figure: triFig(CTX_TRI, run, r, { ra: 'run', rb: fl(r, 'ft'), ab: 'rafter' }),
      parts: [numPart(R, { decimals: 1, suffix: 'ft' })],
      hints: ['The peak is centred, so the run is half the width of the garage.', 'Find the sloped length from the wall to the peak, then add the overhang.'],
      solution: [
        `Run: $${W} \\div 2 = ${ms(run, 'ft')}$`,
        `Wall to peak: $\\sqrt{${fmt(run)}^2 + ${fmt(r)}^2} = \\sqrt{${fmt(sq(run) + sq(r))}} \\approx ${ms(fmtFixed(slope, 2), 'ft')}$`,
        `Add the overhang: $${fmtFixed(slope, 2)} + ${fmt(o)} \\approx ${fmtFixed(R, 1)}$`,
        `Each rafter must be about $${ms(fmtFixed(R, 1), 'ft')}$ long.`,
      ],
      calculator: true,
    };
  }
  if (kind === 3) {
    // Will the TV fit?
    const [D, w, h, H] = retry(
      () => {
        const D = rng.pick([43, 50, 55, 65, 70, 75]);
        const w = roundTo(D * 0.8716 + rng.int(-3, 3) / 10, 1);
        const h = Math.sqrt(D * D - w * w);
        return [D, w, h, Math.round(h) + rng.pick([-2, -1, 1, 2])];
      },
      (v) => safe(v[2], 1) && Math.abs(v[3] - v[2]) >= 0.5,
    );
    const fits = h <= H;
    return {
      prompt: `${name} wants to put a $${ms(D, 'in')}$ TV (measured along the diagonal of the screen) into a cabinet. The screen is $${ms(w, 'in')}$ wide. Ignore the frame around the screen. (a) How tall is the screen, ${nearest(1, 'in')}? (b) Will it fit in an opening that is $${ms(H, 'in')}$ tall?`,
      figure: triFig(CTX_TRI, w, h, { ra: fl(w, 'in'), rb: 'h', ab: fl(D, 'in') }),
      parts: [numPart(h, { decimals: 1, suffix: 'in', label: '(a) Height' }), { label: '(b) Will it fit?', answer: fixedChoice(['Yes', 'No'], fits ? 0 : 1) }],
      hints: ['The diagonal is the hypotenuse, so the height is a leg: $h^2 = d^2 - w^2$.', 'Compare the height with the opening.'],
      solution: [
        ...legSteps(D, w, h, 1, 'h'),
        fits
          ? `The screen is about $${ms(fmtFixed(h, 1), 'in')}$ tall, which is less than $${ms(H, 'in')}$, so it fits.`
          : `The screen is about $${ms(fmtFixed(h, 1), 'in')}$ tall, which is more than $${ms(H, 'in')}$, so it does not fit.`,
      ],
      calculator: true,
    };
  }
  if (kind === 4) {
    // Several guy wires.
    const [n, h, dd, e, total] = retry(
      () => {
        const n = rng.pick([2, 3, 4]);
        const h = rng.int(12, 28) / 2;
        const dd = rng.int(6, 16) / 2;
        const e = rng.pick([0.5, 1]);
        return [n, h, dd, e, n * (Math.hypot(h, dd) + e)];
      },
      (v) => safe(v[4], 1) && safe(Math.hypot(v[1], v[2]), 2),
    );
    const one = Math.hypot(h, dd);
    return {
      prompt: `A crew is putting up a radio antenna that needs $${n}$ guy wires. Each wire is attached $${ms(h, 'm')}$ up the antenna and anchored $${ms(dd, 'm')}$ from its base. The crew adds $${ms(e, 'm')}$ to each wire for tying it off. How much wire is needed in total, ${nearest(1, 'm')}?`,
      figure: triFig(CTX_TRI, dd, h, { ra: fl(dd, 'm'), rb: fl(h, 'm'), ab: 'L' }),
      parts: [numPart(total, { decimals: 1, suffix: 'm' })],
      hints: ['Find the length of one wire with the Pythagorean theorem.', `Add the extra for tying off, then multiply by the number of wires.`],
      solution: [
        `One wire: $L = \\sqrt{${fmt(h)}^2 + ${fmt(dd)}^2} = \\sqrt{${fmt(sq(h) + sq(dd))}} \\approx ${ms(fmtFixed(one, 2), 'm')}$`,
        `Add the extra: $${fmtFixed(one, 2)} + ${fmt(e)} = ${fmtFixed(one + e, 2)}$`,
        `Multiply by $${n}$: $${n} \\times ${fmtFixed(one + e, 2)} \\approx ${fmtFixed(total, 1)}$`,
        `The crew needs about $${ms(fmtFixed(total, 1), 'm')}$ of wire.`,
      ],
      calculator: true,
    };
  }
  // Gate brace from a board, feet and inches.
  const [wIn, hIn, b, B] = retry(
    () => {
      const wIn = 12 * rng.int(3, 5) + rng.pick([0, 3, 6, 9]);
      const hIn = 12 * rng.int(3, 4) + rng.pick([0, 3, 6, 9]);
      const b = Math.hypot(wIn, hIn);
      return [wIn, hIn, b, rng.pick([5, 6, 7, 8])];
    },
    (v) => safe(v[2], 1) && Math.abs(v[2] - 12 * v[3]) >= 1 && Math.abs(v[2] - 12 * v[3]) <= 15 && v[0] !== v[1],
  );
  const fits = b <= 12 * B;
  return {
    prompt: `${name} is building a gate that is $${ftInTex(wIn)}$ wide and $${ftInTex(hIn)}$ tall. A diagonal brace will run from one corner to the opposite corner. (a) How long is the brace, in inches, ${nearest(1, 'in')}? (b) Is one $${ms(B, 'ft')}$ board long enough for the brace?`,
    figure: triFig(CTX_TRI, wIn, hIn, { ra: fl(wIn, 'in'), rb: fl(hIn, 'in'), ab: 'b' }),
    parts: [numPart(b, { decimals: 1, suffix: 'in', label: '(a) Brace length' }), { label: '(b) Long enough?', answer: fixedChoice(['Yes', 'No'], fits ? 0 : 1) }],
    hints: ['Change both measurements to inches first: $1\\ \\text{ft} = 12\\ \\text{in}$.', `The brace is the hypotenuse. Compare it with the board length in inches: $${B} \\times 12 = ${12 * B}\\ \\text{in}$.`],
    solution: [
      `Width: $${ftInTex(wIn)} = ${ms(wIn, 'in')}$. Height: $${ftInTex(hIn)} = ${ms(hIn, 'in')}$.`,
      ...hypSteps(wIn, hIn, b, 1, 'b'),
      `The board is $${B} \\times 12 = ${ms(12 * B, 'in')}$ long.`,
      fits
        ? `The brace is about $${ms(fmtFixed(b, 1), 'in')}$, which is less than $${ms(12 * B, 'in')}$, so one board is long enough.`
        : `The brace is about $${ms(fmtFixed(b, 1), 'in')}$, which is more than $${ms(12 * B, 'in')}$, so one board is not long enough.`,
    ],
    calculator: true,
  };
}

const pythApply = skill({
  id: 'm103-pyth-apply',
  name: 'Pythagorean theorem on the job',
  description: 'Solve workplace problems with ladders, ramps, rafters, screens and diagonals using the Pythagorean theorem.',
  outcomes: ['G2'],
  lessonId: 'm103-7-2',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return twoStep(rng);
    const ctx = rng.pick(CONTEXTS);
    const unknown = rng.pick(['hyp', 'hyp', 'horiz', 'vert'] as const);
    return rtProblem(rng, ctx, unknown, d === 1);
  },
});

// ---------------------------------------------------------------------------
// Polygon-pair figures (PlaneFigure with closed polylines and invisible label anchors)
// ---------------------------------------------------------------------------

type Pt = [number, number];
interface ShapeSpec {
  pts: Pt[];
  /** Label for side i (pts[i] -> pts[i + 1]). */
  sides?: Array<string | null>;
  verts?: string[];
  title?: string;
}
type Box = [number, number, number, number];
interface Placed {
  x: number;
  y: number;
  label: string;
  box: Box;
}

const CHAR_W = 7;
const TEXT_H = 12;

function signedArea(p: Pt[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}

function segDist(p: Pt, a: Pt, b: Pt): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

function segsCross(a: Pt, b: Pt, c: Pt, d: Pt): boolean {
  const o = (p: Pt, q: Pt, r: Pt) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}

function boxHitsPoly(box: Box, poly: Pt[]): boolean {
  const [x0, y0, x1, y1] = box;
  const corners: Pt[] = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
  const inside = (p: Pt) => p[0] >= x0 && p[0] <= x1 && p[1] >= y0 && p[1] <= y1;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    if (inside(a) || inside(b)) return true;
    for (let j = 0; j < 4; j++) if (segsCross(a, b, corners[j], corners[(j + 1) % 4])) return true;
  }
  return false;
}

const boxesOverlap = (p: Box, q: Box) => p[0] < q[2] && q[0] < p[2] && p[1] < q[3] && q[1] < p[3];

/**
 * Place a text label outside a polygon near point M in direction n. The renderer draws a point's
 * label 8 px right of and 8 px above the point, and an (invisible) circle at the point itself, so
 * the anchor is kept at least 6.5 px away from every edge.
 */
function placeLabel(M: Pt, n: Pt, text: string, poly: Pt[], avoid: Box[]): Placed {
  const w = text.length * CHAR_W;
  const h = TEXT_H;
  let dist = Math.max(Math.abs(n[0]) * (w / 2) + Math.abs(n[1]) * (h / 2) + 4, 7 + (w / 2 + 8) * n[0] + 12 * n[1]);
  let out: Placed | null = null;
  for (let i = 0; i < 20; i++, dist += 3) {
    const T: Pt = [M[0] + n[0] * dist, M[1] + n[1] * dist];
    const A: Pt = [T[0] - w / 2 - 8, T[1] - 12];
    const box: Box = [T[0] - w / 2 - 1, T[1] - h / 2 - 1, T[0] + w / 2 + 1, T[1] + h / 2 + 1];
    out = { x: A[0], y: A[1], label: text, box };
    const clear = poly.every((_, j) => segDist(A, poly[j], poly[(j + 1) % poly.length]) >= 6.5);
    if (clear && !boxHitsPoly(box, poly) && !avoid.some((b) => boxesOverlap(b, box))) break;
  }
  return out!;
}

function shapeLabels(pts: Pt[], spec: ShapeSpec): Placed[] {
  const ccw = signedArea(pts) > 0;
  const N = pts.length;
  const normals: Pt[] = pts.map((a, i) => {
    const b = pts[(i + 1) % N];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const L = Math.hypot(dx, dy) || 1;
    return ccw ? [dy / L, -dx / L] : [-dy / L, dx / L];
  });
  const placed: Placed[] = [];
  const boxes = () => placed.map((p) => p.box);
  (spec.sides ?? []).forEach((lab, i) => {
    if (!lab) return;
    const a = pts[i];
    const b = pts[(i + 1) % N];
    placed.push(placeLabel([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], normals[i], lab, pts, boxes()));
  });
  (spec.verts ?? []).forEach((lab, i) => {
    const n1 = normals[(i - 1 + N) % N];
    const n2 = normals[i];
    const dx = n1[0] + n2[0];
    const dy = n1[1] + n2[1];
    const L = Math.hypot(dx, dy) || 1;
    placed.push(placeLabel(pts[i], [dx / L, dy / L], lab, pts, boxes()));
  });
  if (spec.title) {
    const top = Math.max(...pts.map((p) => p[1]), ...placed.map((p) => p.box[3]));
    const cx = (Math.min(...pts.map((p) => p[0])) + Math.max(...pts.map((p) => p[0]))) / 2;
    placed.push(placeLabel([cx, top], [0, 1], spec.title, pts, boxes()));
  }
  return placed;
}

/** Two (or more) polygons side by side, drawn to the same scale, with labels on the sides. */
function shapesFigure(shapes: ShapeSpec[]): PlaneFigure {
  const GAP = 18;
  const PLOT_W = 340;
  const MAX_H = 230;
  const norm = shapes.map((s) => {
    const x0 = Math.min(...s.pts.map((p) => p[0]));
    const y0 = Math.min(...s.pts.map((p) => p[1]));
    return s.pts.map(([x, y]) => [x - x0, y - y0] as Pt);
  });
  const widths = norm.map((p) => Math.max(...p.map((q) => q[0])));
  const heights = norm.map((p) => Math.max(...p.map((q) => q[1])));
  let s = Math.min(260 / widths.reduce((a, b) => a + b, 0), 190 / Math.max(...heights));
  let polys: Pt[][] = [];
  let labels: Placed[] = [];
  let totalW = 0;
  let minY = 0;
  let maxY = 0;
  for (let iter = 0; iter < 80; iter++) {
    polys = [];
    labels = [];
    minY = 0;
    maxY = 0;
    let cursor = 0;
    shapes.forEach((spec, i) => {
      const pts = norm[i].map(([x, y]) => [x * s, y * s] as Pt);
      const placed = shapeLabels(pts, spec);
      const xs = [...pts.map((p) => p[0]), ...placed.flatMap((p) => [p.box[0], p.box[2], p.x - 6])];
      const ys = [...pts.map((p) => p[1]), ...placed.flatMap((p) => [p.box[1], p.box[3], p.y - 6, p.y + 6])];
      const dx = cursor - Math.min(...xs);
      polys.push(pts.map(([x, y]) => [x + dx, y] as Pt));
      labels.push(...placed.map((p) => ({ ...p, x: p.x + dx })));
      cursor = Math.max(...xs) + dx + GAP;
      minY = Math.min(minY, ...ys);
      maxY = Math.max(maxY, ...ys);
    });
    totalW = cursor - GAP;
    if (totalW <= PLOT_W - 4 && maxY - minY <= MAX_H) break;
    s *= 0.94;
  }
  const ox = (PLOT_W - totalW) / 2;
  const oy = 5 - minY;
  const r1 = (v: number) => Math.round(v * 10) / 10;
  const points: PlanePoint[] = labels.map((l) => ({ x: r1(l.x + ox), y: r1(l.y + oy), label: l.label, color: 'muted', open: true }));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: PLOT_W, yMin: 0, yMax: Math.ceil(maxY - minY + 10), step: 1000 },
    polylines: polys.map((p, i) => ({ points: [...p, p[0]].map(([x, y]) => [r1(x + ox), r1(y + oy)] as [number, number]), color: i === 0 ? 'brand' : 'accent' })),
    points,
    hideTickLabels: true,
  };
}

const rectPts = (w: number, h: number): Pt[] => [
  [0, 0],
  [w, 0],
  [w, h],
  [0, h],
];
const rtTriPts = (a: number, b: number): Pt[] => [
  [0, 0],
  [a, 0],
  [0, b],
];
/** Triangle ABC from its side lengths, with AB along the bottom. */
function sssPts(ab: number, bc: number, ca: number): Pt[] {
  const cx = (ab * ab + ca * ca - bc * bc) / (2 * ab);
  const cy = Math.sqrt(Math.max(ca * ca - cx * cx, 0));
  return [
    [0, 0],
    [ab, 0],
    [cx, cy],
  ];
}
function parallelogramPts(a: number, b: number, deg: number): Pt[] {
  const t = (deg * Math.PI) / 180;
  return [
    [0, 0],
    [a, 0],
    [a + b * Math.cos(t), b * Math.sin(t)],
    [b * Math.cos(t), b * Math.sin(t)],
  ];
}
function regularPts(n: number, side: number): Pt[] {
  const R = side / (2 * Math.sin(Math.PI / n));
  return Array.from({ length: n }, (_, i) => {
    const t = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * i) / n;
    return [R * Math.cos(t), R * Math.sin(t)] as Pt;
  });
}
const mirrorX = (p: Pt[]): Pt[] => p.map(([x, y]) => [-x, y] as Pt);
const proportional = (p: number[], q: number[]) => p.every((x, i) => Math.abs(q[i] * p[0] - x * q[0]) < 1e-9);

// ---------------------------------------------------------------------------
// Lesson 7.3 — Similar polygons
// ---------------------------------------------------------------------------

const C_YES = 'Yes. The corresponding angles are equal and the corresponding sides are proportional.';
const C_NO_SIDES = 'No. The corresponding angles are equal, but the corresponding sides are not proportional.';
const C_NO_ANGLES = 'No. The corresponding sides are proportional, but the corresponding angles are not equal.';
const C_SIZE = 'No. Similar shapes must be exactly the same size.';
const C_ANGLES_ONLY = 'Yes. The corresponding angles are equal, and that is enough.';
const C_SIDES_ONLY = 'Yes. The corresponding sides are proportional, and that is enough.';
const SIM_HINTS = [
  'Similar polygons need **both** conditions: corresponding angles are equal **and** corresponding sides are proportional (all in the same ratio).',
  'Divide each side of the second shape by the matching side of the first. Are all the answers the same? Then compare the angles.',
];

const SIM_UNITS: Unit[] = ['cm', 'm', 'in', 'ft'];
const PRINT_SIZES = [
  { u: 'in' as Unit, what: 'photo', intro: 'A print shop is enlarging a', ask: 'Which print size is similar to the original, so that none of the photo is cut off?', bases: [[4, 6], [5, 7], [3, 5], [8, 10], [4, 5]], ks: [1.5, 2, 2.5, 3] },
  { u: 'cm' as Unit, what: 'cabinet door', intro: 'A cabinet maker has built a', ask: 'Which size of larger door would be similar to it?', bases: [[30, 45], [40, 50], [24, 36], [35, 50], [30, 40]], ks: [1.5, 2] },
  { u: 'cm' as Unit, what: 'sign', intro: 'A sign shop is making a bigger copy of a', ask: 'Which size is similar to the original sign?', bases: [[60, 90], [40, 100], [50, 80], [45, 60]], ks: [1.5, 2, 2.5] },
];

const similarCheck = skill({
  id: 'm103-similar-check',
  name: 'Deciding whether polygons are similar',
  description: 'Decide whether two polygons are similar by checking corresponding angles and the ratios of corresponding sides.',
  outcomes: ['G3'],
  lessonId: 'm103-7-3',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    const u = rng.pick(SIM_UNITS);
    if (d === 1) {
      const similar = rng.chance(0.5);
      const [w1, h1, w2, h2, k] = retry(
        () => {
          const w1 = rng.int(3, 9);
          const h1 = rng.int(2, w1 - 1);
          const k = rng.pick([2, 3, 1.5, 0.5]);
          let w2 = w1 * k;
          let h2 = h1 * k;
          if (!similar) {
            if (rng.chance(0.5)) {
              const c = rng.int(1, 4);
              w2 = w1 + c;
              h2 = h1 + c;
            } else h2 = h2 + rng.pick([1, -1, 2]);
          }
          return [w1, h1, w2, h2, k];
        },
        ([w1, h1, w2, h2]) => h2 > 0 && h2 < w2 && hasDp(w2, 1) && hasDp(h2, 1) && proportional([w1, h1], [w2, h2]) === similar,
      );
      return {
        prompt: `Rectangle A is $${ms(w1, u)}$ by $${ms(h1, u)}$. Rectangle B is $${ms(w2, u)}$ by $${ms(h2, u)}$. Are the two rectangles similar?`,
        figure: shapesFigure([
          { pts: rectPts(w1, h1), sides: [fl(w1, u), null, null, fl(h1, u)], title: 'A' },
          { pts: rectPts(w2, h2), sides: [fl(w2, u), null, null, fl(h2, u)], title: 'B' },
        ]),
        parts: [{ answer: mc(rng, similar ? C_YES : C_NO_SIDES, [similar ? C_NO_SIDES : C_YES, C_ANGLES_ONLY, C_SIZE]) }],
        hints: SIM_HINTS,
        solution: [
          'Both shapes are rectangles, so every angle is $90^\\circ$. The corresponding angles are equal.',
          `Compare corresponding sides, long with long and short with short: $${ratioTex(w2, w1)}$ and $${ratioTex(h2, h1)}$.`,
          similar
            ? `The ratios are equal, so the sides are proportional. The rectangles **are** similar, with a scale factor of $${fmt(k)}$.`
            : 'The ratios are not equal, so the sides are not proportional. The rectangles are **not** similar.',
        ],
      };
    }
    if (d === 2) {
      const kind = rng.pick(['rect-square', 'squares', 'rhombus', 'triangles', 'regular', 'parallelogram'] as const);
      if (kind === 'rect-square' || kind === 'squares') {
        const s1 = rng.int(2, 6);
        const s2 = rng.intExcept(3, 12, [s1]);
        const w = kind === 'squares' ? s2 : rng.intExcept(s1 + 1, 14, [s2]);
        const h = s2;
        const yes = kind === 'squares';
        return {
          prompt: yes
            ? `Square A has sides of $${ms(s1, u)}$. Square B has sides of $${ms(s2, u)}$. Are the two squares similar?`
            : `Square A has sides of $${ms(s1, u)}$. Rectangle B is $${ms(w, u)}$ by $${ms(h, u)}$. Are the two shapes similar?`,
          figure: shapesFigure([
            { pts: rectPts(s1, s1), sides: [fl(s1, u), null, null, fl(s1, u)], title: 'A' },
            { pts: rectPts(w, h), sides: [fl(w, u), null, null, fl(h, u)], title: 'B' },
          ]),
          parts: [{ answer: mc(rng, yes ? C_YES : C_NO_SIDES, yes ? [C_SIZE, C_NO_SIDES, C_NO_ANGLES] : [C_ANGLES_ONLY, C_YES, C_NO_ANGLES]) }],
          hints: SIM_HINTS,
          solution: [
            'All the angles in squares and rectangles are $90^\\circ$, so the corresponding angles are equal.',
            yes
              ? `Every side of B divided by every side of A gives $${ratioTex(s2, s1)}$, so the sides are proportional.`
              : `Compare sides: $${ratioTex(w, s1)}$ but $${ratioTex(h, s1)}$. The ratios are different, so the sides are not proportional.`,
            yes ? 'Both conditions hold, so the squares **are** similar. (All squares are similar.)' : 'Equal angles are not enough. The shapes are **not** similar.',
          ],
        };
      }
      if (kind === 'rhombus') {
        const s1 = rng.int(2, 6);
        const s2 = rng.intExcept(3, 10, [s1]);
        const ang = rng.pick([50, 60, 70, 75, 80]);
        return {
          prompt: `Shape A is a square with sides of $${ms(s1, u)}$. Shape B is a rhombus with sides of $${ms(s2, u)}$ and angles of $${ang}^\\circ$ and $${180 - ang}^\\circ$. Are the two shapes similar?`,
          figure: shapesFigure([
            { pts: rectPts(s1, s1), sides: [fl(s1, u), null, null, fl(s1, u)], title: 'A' },
            { pts: parallelogramPts(s2, s2, ang), sides: [fl(s2, u), null, null, fl(s2, u)], title: 'B' },
          ]),
          parts: [{ answer: mc(rng, C_NO_ANGLES, [C_SIDES_ONLY, C_YES, C_NO_SIDES]) }],
          hints: SIM_HINTS,
          solution: [
            `Every side of B divided by every side of A gives $${ratioTex(s2, s1)}$, so the sides are proportional.`,
            `The square has four $90^\\circ$ angles, but the rhombus has angles of $${ang}^\\circ$ and $${180 - ang}^\\circ$. The angles are not equal.`,
            'Proportional sides are not enough. The shapes are **not** similar.',
          ],
        };
      }
      if (kind === 'regular') {
        const n = rng.pick([5, 6, 8]);
        const poly = n === 5 ? 'pentagon' : n === 6 ? 'hexagon' : 'octagon';
        const s1 = rng.int(2, 6);
        const s2 = rng.intExcept(3, 12, [s1]);
        const ang = (180 * (n - 2)) / n;
        return {
          prompt: `Regular ${poly} A has sides of $${ms(s1, u)}$. Regular ${poly} B has sides of $${ms(s2, u)}$. Every angle of a regular ${poly} is $${ang}^\\circ$. Are the two ${poly}s similar?`,
          figure: shapesFigure([
            { pts: regularPts(n, s1), sides: [fl(s1, u)], title: 'A' },
            { pts: regularPts(n, s2), sides: [fl(s2, u)], title: 'B' },
          ]),
          parts: [{ answer: mc(rng, C_YES, [C_SIZE, C_NO_SIDES, C_NO_ANGLES]) }],
          hints: SIM_HINTS,
          solution: [
            `Every angle in both shapes is $${ang}^\\circ$, so the corresponding angles are equal.`,
            `All sides of a regular polygon are equal, so every side of B divided by the matching side of A is $${ratioTex(s2, s1)}$. The sides are proportional.`,
            `Both conditions hold, so the ${poly}s **are** similar. (Regular polygons with the same number of sides are always similar.)`,
          ],
        };
      }
      if (kind === 'parallelogram') {
        const yes = rng.chance(0.5);
        const [a1, b1, k] = retry(
          () => [rng.int(3, 7), rng.int(2, 5), rng.pick([1.5, 2, 2.5, 3])],
          ([a, b]) => a !== b,
        );
        const ang1 = rng.pick([50, 60, 65, 70]);
        const ang2 = yes ? ang1 : ang1 + rng.pick([15, 20, 25]);
        return {
          prompt: `Parallelogram A has sides of $${ms(a1, u)}$ and $${ms(b1, u)}$ with angles of $${ang1}^\\circ$ and $${180 - ang1}^\\circ$. Parallelogram B has sides of $${ms(a1 * k, u)}$ and $${ms(b1 * k, u)}$ with angles of $${ang2}^\\circ$ and $${180 - ang2}^\\circ$. Are the two parallelograms similar?`,
          figure: shapesFigure([
            { pts: parallelogramPts(a1, b1, ang1), sides: [fl(a1, u), null, null, fl(b1, u)], title: 'A' },
            { pts: parallelogramPts(a1 * k, b1 * k, ang2), sides: [fl(a1 * k, u), null, null, fl(b1 * k, u)], title: 'B' },
          ]),
          parts: [{ answer: mc(rng, yes ? C_YES : C_NO_ANGLES, yes ? [C_SIZE, C_NO_SIDES, C_NO_ANGLES] : [C_SIDES_ONLY, C_YES, C_NO_SIDES]) }],
          hints: SIM_HINTS,
          solution: [
            `Compare sides: $${ratioTex(a1 * k, a1)}$ and $${ratioTex(b1 * k, b1)}$. The sides are proportional.`,
            yes
              ? `Both parallelograms have angles of $${ang1}^\\circ$ and $${180 - ang1}^\\circ$, so the corresponding angles are equal.`
              : `A has angles of $${ang1}^\\circ$ and $${180 - ang1}^\\circ$, but B has angles of $${ang2}^\\circ$ and $${180 - ang2}^\\circ$. The angles are not equal.`,
            yes ? 'Both conditions hold, so the parallelograms **are** similar.' : 'Proportional sides are not enough. The parallelograms are **not** similar.',
          ],
        };
      }
      // Triangles given by three sides.
      const yes = rng.chance(0.5);
      const [t1, t2] = retry(
        () => {
          const t1 = [rng.int(3, 7), rng.int(4, 9), rng.int(5, 11)].sort((x, y) => x - y);
          const k = rng.pick([1.5, 2, 2.5, 3]);
          let t2 = t1.map((x) => x * k);
          if (!yes) {
            const c = rng.int(2, 4);
            t2 = rng.chance(0.5) ? t1.map((x) => x + c) : [t2[0], t2[1], t2[2] + rng.pick([1, -1, 2])];
          }
          return [t1, t2];
        },
        ([t1, t2]) =>
          new Set(t1).size === 3 && t1[0] + t1[1] > t1[2] + 1 && t2[0] + t2[1] > t2[2] && t2[1] < t2[2] && proportional(t1, t2) === yes && t1[0] ** 2 + t1[1] ** 2 > t1[2] ** 2 * 0.7,
      );
      const T_YES = 'Yes. All three pairs of corresponding sides have the same ratio.';
      const T_NO = 'No. The three pairs of corresponding sides do not all have the same ratio.';
      const T_LONGER = 'Yes. Each side of triangle B is longer than the matching side of triangle A.';
      return {
        prompt: `Triangle A has sides of $${ms(t1[0], u)}$, $${ms(t1[1], u)}$ and $${ms(t1[2], u)}$. Triangle B has sides of $${ms(t2[0], u)}$, $${ms(t2[1], u)}$ and $${ms(t2[2], u)}$. Are the two triangles similar?`,
        figure: shapesFigure([
          { pts: sssPts(t1[2], t1[1], t1[0]), sides: [fl(t1[2], u), fl(t1[1], u), fl(t1[0], u)], title: 'A' },
          { pts: sssPts(t2[2], t2[1], t2[0]), sides: [fl(t2[2], u), fl(t2[1], u), fl(t2[0], u)], title: 'B' },
        ]),
        parts: [{ answer: mc(rng, yes ? T_YES : T_NO, yes ? [T_NO, C_SIZE] : [T_YES, T_LONGER, C_SIZE]) }],
        hints: ['Match the shortest side with the shortest side, the middle with the middle and the longest with the longest.', 'For triangles, if all three side ratios are equal, the angles match too.'],
        solution: [
          `Shortest: $${ratioTex(t2[0], t1[0])}$. Middle: $${ratioTex(t2[1], t1[1])}$. Longest: $${ratioTex(t2[2], t1[2])}$.`,
          yes ? 'All three ratios are equal, so the triangles **are** similar.' : 'The ratios are not all equal, so the triangles are **not** similar.',
        ],
      };
    }
    // d = 3: choose the similar one from a list.
    if (rng.chance(0.6)) {
      const job = rng.pick(PRINT_SIZES);
      const [w, h] = rng.pick(job.bases);
      const k = rng.pick(job.ks);
      const good = [w * k, h * k];
      const add = good[0] - w;
      const off = h >= 30 ? rng.pick([5, 10]) : rng.pick([1, 2]);
      const cands = [
        [good[0], h + add],
        [good[0], good[1] + off],
        [good[0], good[1] - off],
        [good[0] + off, good[1]],
        [good[0] + off, good[1] + off],
      ].filter((c) => c[0] < c[1] && !proportional([w, h], c));
      const show = (c: number[]) => `$${ms(c[0], job.u)} \\times ${ms(c[1], job.u)}$`;
      const ds = rng.shuffle(cands).map(show);
      return {
        prompt: `${job.intro} $${ms(w, job.u)} \\times ${ms(h, job.u)}$ ${job.what}. ${job.ask}`,
        parts: [{ answer: mc(rng, show(good), ds) }],
        hints: ['A similar size multiplies **both** dimensions by the same scale factor.', 'For each choice, divide the short side by the original short side and the long side by the original long side. The two answers must match.'],
        solution: [
          `For ${show(good)}: $${ratioTex(good[0], w)}$ and $${ratioTex(good[1], h)}$. Both ratios are $${fmt(k)}$.`,
          `For the other sizes, the two ratios are different. For example, adding the same amount to both sides does not keep the shape.`,
          `The similar size is ${show(good)}.`,
        ],
      };
    }
    const t1 = retry(
      () => [rng.int(3, 7), rng.int(4, 9), rng.int(5, 11)].sort((x, y) => x - y),
      (t) => new Set(t).size === 3 && t[0] + t[1] > t[2] + 1,
    );
    const k = rng.pick([1.5, 2, 2.5, 3]);
    const good = t1.map((x) => x * k);
    const cands = [t1.map((x) => x + good[0] - t1[0]), [good[0], good[1], good[2] + 1], [good[0], good[1] + 1, good[2]], [good[0], good[1], good[2] - 1], [t1[0] * 2, t1[1] * 3, t1[2] * 3]].filter(
      (c) => !proportional(t1, c) && c[0] + c[1] > c[2],
    );
    const show = (c: number[]) => `$${c.map((x) => ms(x, u)).join(',\\ ')}$`;
    return {
      prompt: `A triangle has sides of $${ms(t1[0], u)}$, $${ms(t1[1], u)}$ and $${ms(t1[2], u)}$. Which triangle is similar to it?`,
      parts: [{ answer: mc(rng, show(good), rng.shuffle(cands).map(show)) }],
      hints: ['Divide each side of a choice by the matching side of the original (shortest with shortest, and so on).', 'The triangle is similar only if all three ratios are the same.'],
      solution: [
        `For ${show(good)}: $${ratioTex(good[0], t1[0])}$, $${ratioTex(good[1], t1[1])}$ and $${ratioTex(good[2], t1[2])}$.`,
        `All three ratios are $${fmt(k)}$. In the other choices, the ratios are not all equal.`,
        `The similar triangle has sides ${show(good)}.`,
      ],
    };
  },
});

const SF_THINGS = ['rectangle', 'triangle', 'logo', 'floor tile pattern', 'pentagon', 'garden plan', 'photo'];

const scaleFactor = skill({
  id: 'm103-scale-factor',
  name: 'Finding the scale factor',
  description: 'Find the scale factor between similar polygons from corresponding sides and tell whether it is an enlargement or a reduction.',
  outcomes: ['G3'],
  lessonId: 'm103-7-3',
  calculator: true,
  gen(rng, d) {
    const u = rng.pick(SIM_UNITS);
    if (d === 1) {
      const k = rng.pick([2, 3, 4, 5, 0.5, 0.25]);
      const orig = k === 0.5 ? 2 * rng.int(2, 10) : k === 0.25 ? 4 * rng.int(2, 8) : rng.int(2, 12);
      const img = orig * k;
      const thing = rng.pick(SF_THINGS);
      return {
        prompt: `A ${thing} is ${k > 1 ? 'enlarged' : 'reduced'} to make a similar ${thing}. A side that was $${ms(orig, u)}$ long is $${ms(img, u)}$ long on the new ${thing}. What is the scale factor?`,
        parts: [numPart(k, { label: 'Scale factor $k =$' })],
        hints: ['The scale factor compares a new length with the original length.', 'Scale factor $k = \\dfrac{\\text{new length}}{\\text{original length}}$'],
        solution: [
          `$k = \\dfrac{\\text{new length}}{\\text{original length}} = \\dfrac{${fmt(img)}}{${fmt(orig)}} = ${fmt(k)}$`,
          k > 1
            ? `The scale factor is $${fmt(k)}$. It is greater than 1, so the new ${thing} is an enlargement.`
            : `The scale factor is $${fmt(k)}$. It is less than 1, so the new ${thing} is a reduction.`,
        ],
      };
    }
    if (d === 2) {
      const k = rng.pick([1.5, 2.5, 0.4, 0.6, 0.75, 1.25, 0.8, 3.5, 1.2]);
      const kind = rng.pick(['rect', 'rtri', 'trap'] as const);
      let base: number[];
      let pts1: Pt[];
      let pts2: Pt[];
      let quad: boolean;
      // Sides are listed in vertex order: side i joins vertex i to vertex i + 1.
      if (kind === 'rect') {
        base = retry(
          () => [rng.int(3, 10), rng.int(2, 8)],
          (b) => b[0] > b[1] && b.every((x) => hasDp(x * k, 2)),
        );
        pts1 = rectPts(base[0], base[1]);
        pts2 = rectPts(base[0] * k, base[1] * k);
        base = [base[0], base[1], base[0], base[1]];
        quad = true;
      } else if (kind === 'rtri') {
        const [p, q, h] = rng.pick(TRIPLES.slice(0, 6));
        const m = rng.pick([1, 2]);
        base = [q * m, h * m, p * m];
        pts1 = rtTriPts(q * m, p * m);
        pts2 = rtTriPts(q * m * k, p * m * k);
        quad = false;
      } else {
        const t = rng.int(1, 2);
        const top = rng.int(2, 6);
        base = [top + 3 * t, 5 * t, top, 4 * t];
        pts1 = [
          [0, 0],
          [top + 3 * t, 0],
          [top, 4 * t],
          [0, 4 * t],
        ];
        pts2 = pts1.map(([x, y]) => [x * k, y * k] as Pt);
        quad = true;
      }
      const v1 = quad ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C'];
      const v2 = quad ? ['P', 'Q', 'R', 'S'] : ['P', 'Q', 'R'];
      const i1 = rng.int(0, base.length - 1);
      const i2 = (i1 + 1) % base.length;
      const lab = (vals: number[], f: number) => vals.map((x, i) => (i === i1 || i === i2 ? fl(roundTo(x * f, 4), u) : null));
      const nm1 = v1.join('');
      const nm2 = v2.join('');
      const sideName = (v: string[], i: number) => `${v[i]}${v[(i + 1) % v.length]}`;
      const typeIdx = k > 1 ? 0 : 1;
      return {
        prompt: `${quad ? 'Quadrilateral' : 'Triangle'} $${nm2}$ is similar to ${quad ? 'quadrilateral' : 'triangle'} $${nm1}$, with vertices in matching order. Find the scale factor from $${nm1}$ to $${nm2}$, and decide whether $${nm2}$ is an enlargement or a reduction of $${nm1}$.`,
        figure: shapesFigure([
          { pts: pts1, sides: lab(base, 1), verts: v1 },
          { pts: pts2, sides: lab(base, k), verts: v2 },
        ]),
        parts: [numPart(k, { label: 'Scale factor $k =$' }), { label: 'Type', answer: fixedChoice(['Enlargement', 'Reduction', 'Neither (same size)'], typeIdx) }],
        hints: [
          `Match sides by their vertices: $${sideName(v1, i1)}$ matches $${sideName(v2, i1)}$.`,
          `Scale factor = new side $\\div$ original side, so divide a side of $${nm2}$ by the matching side of $${nm1}$. Not the other way around!`,
        ],
        solution: [
          `$${sideName(v1, i1)}$ corresponds to $${sideName(v2, i1)}$.`,
          `$k = \\dfrac{${sideName(v2, i1)}}{${sideName(v1, i1)}} = \\dfrac{${fmt(base[i1] * k)}}{${fmt(base[i1])}} = ${fmt(k)}$`,
          `Check with another pair: $\\dfrac{${fmt(base[i2] * k)}}{${fmt(base[i2])}} = ${fmt(k)}$.`,
          k > 1
            ? `The scale factor is $${fmt(k)}$. It is greater than 1, so $${nm2}$ is an enlargement.`
            : `The scale factor is $${fmt(k)}$. It is less than 1, so $${nm2}$ is a reduction.`,
        ],
      };
    }
    const kind = rng.int(0, 2);
    if (kind === 0) {
      // Scale model, with a unit change.
      const veh = rng.pick([
        { what: 'pickup truck', lo: 5.2, hi: 6, scales: [18, 24, 25, 43] },
        { what: 'semi-trailer truck', lo: 18, hi: 22, scales: [50, 64] },
        { what: 'locomotive', lo: 20, hi: 24, scales: [87, 160] },
        { what: 'combine harvester', lo: 8, hi: 10, scales: [32, 64] },
        { what: 'float plane', lo: 9, hi: 11, scales: [48, 72] },
        { what: 'school bus', lo: 11, hi: 12.5, scales: [50, 64, 87] },
      ]);
      const n = rng.pick(veh.scales);
      const modelMm = retry(
        () => Math.round((rng.float(veh.lo, veh.hi, 2) * 1000) / n),
        (m) => (m * n) % 10 === 0,
      );
      const model = modelMm / 10;
      const real = (modelMm * n) / 1000;
      const realCm = (modelMm * n) / 10;
      return {
        prompt: `A model of a ${veh.what} is $${ms(model, 'cm')}$ long. The real ${veh.what} is $${ms(real, 'm')}$ long. What scale factor was used to make the model from the real ${veh.what}? Write it as a fraction.`,
        parts: [numPart(1 / n, { label: 'Scale factor $k =$' })],
        hints: ['Both lengths must be in the same unit. Change metres to centimetres ($1\\ \\text{m} = 100\\ \\text{cm}$).', 'Scale factor $= \\dfrac{\\text{model length}}{\\text{real length}}$. Then simplify the fraction.'],
        solution: [
          `Change to centimetres: $${ms(real, 'm')} = ${fmt(real)} \\times 100 = ${ms(realCm, 'cm')}$.`,
          `$k = \\dfrac{\\text{model}}{\\text{real}} = \\dfrac{${fmt(model)}}{${fmt(realCm)}}$`,
          `$${fmt(realCm)} \\div ${fmt(model)} = ${n}$, so $k = \\dfrac{1}{${n}}$.`,
          `The scale factor is $\\dfrac{1}{${n}}$: the model is a reduction, and every length on the real ${veh.what} is $${n}$ times as long as on the model.`,
        ],
      };
    }
    if (kind === 1) {
      // Find the original from the new length.
      const job = rng.pick([
        { thing: 'company logo', feature: 'the logo', dim: 'wide', u: 'cm' as Unit },
        { thing: 'floor plan', feature: 'the kitchen wall', dim: 'long', u: 'cm' as Unit },
        { thing: 'photo', feature: 'the photo', dim: 'wide', u: 'in' as Unit },
        { thing: 'safety sign', feature: 'the symbol', dim: 'tall', u: 'cm' as Unit },
      ]);
      const k = rng.pick([0.4, 0.6, 0.75, 0.8, 1.5, 2.5, 3]);
      const o = rng.int(4, 40);
      const img = roundTo(o * k, 2);
      return {
        prompt: `A ${job.thing} is ${k > 1 ? 'enlarged' : 'reduced'} using a scale factor of $${fmt(k)}$. On the new copy, ${job.feature} is $${ms(img, job.u)}$ ${job.dim}. How ${job.dim} was ${job.feature} on the original?`,
        parts: [numPart(o, { suffix: job.u, label: 'Original' })],
        hints: ['Start from $k = \\dfrac{\\text{new}}{\\text{original}}$.', 'Rearrange: $\\text{original} = \\dfrac{\\text{new}}{k}$.'],
        solution: [
          '$k = \\dfrac{\\text{new}}{\\text{original}}$, so $\\text{original} = \\dfrac{\\text{new}}{k}$.',
          `$\\text{original} = \\dfrac{${fmt(img)}}{${fmt(k)}} = ${fmt(o)}$`,
          `On the original, ${job.feature} was $${ms(o, job.u)}$ ${job.dim}.`,
        ],
      };
    }
    // Photo enlargement in two parts.
    const [w, h] = rng.pick([
      [4, 6],
      [5, 7],
      [3, 5],
      [8, 10],
      [4, 5],
    ]);
    const k = rng.pick([1.5, 2, 2.5, 3]);
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} enlarges a $${ms(w, 'in')} \\times ${ms(h, 'in')}$ photo so that the new photo is similar to the original. The short side of the new photo is $${ms(w * k, 'in')}$. (a) What is the scale factor? (b) How long is the long side of the new photo?`,
      parts: [numPart(k, { label: '(a) Scale factor $k =$' }), numPart(h * k, { suffix: 'in', label: '(b) Long side' })],
      hints: ['Use the short sides to find the scale factor: new $\\div$ original.', 'Multiply the original long side by the scale factor.'],
      solution: [`(a) $k = \\dfrac{${fmt(w * k)}}{${w}} = ${fmt(k)}$`, `(b) $${h} \\times ${fmt(k)} = ${fmt(h * k)}$`, `The scale factor is $${fmt(k)}$ and the long side is $${ms(h * k, 'in')}$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.4 — Missing sides and scale diagrams
// ---------------------------------------------------------------------------

const SIM_NAMES = [
  ['A', 'B', 'C', 'D', 'E', 'F'],
  ['P', 'Q', 'R', 'X', 'Y', 'Z'],
  ['K', 'L', 'M', 'R', 'S', 'T'],
  ['A', 'B', 'C', 'P', 'Q', 'R'],
  ['D', 'E', 'F', 'J', 'K', 'L'],
];
const K_FRACS: Array<[number, number]> = [
  [3, 2],
  [5, 2],
  [3, 4],
  [5, 4],
  [2, 3],
  [4, 3],
  [5, 3],
  [3, 5],
  [7, 4],
  [2, 5],
  [7, 2],
];

const similarMissing = skill({
  id: 'm103-similar-missing',
  name: 'Missing sides of similar figures',
  description: 'Use the scale factor or a proportion to find a missing side of similar polygons, including the shadow method for heights.',
  outcomes: ['G3'],
  lessonId: 'm103-7-4',
  calculator: true,
  gen(rng, d) {
    const u = rng.pick(SIM_UNITS);
    if (d === 1) {
      const k = rng.pick([2, 3, 4, 0.5]);
      const rect = rng.chance(0.5);
      const [L1, S1] = retry(
        () => [rng.int(3, 9), rng.int(2, 8)],
        ([a, b]) => a > b && (k !== 0.5 || (a % 2 === 0 && b % 2 === 0)),
      );
      const [L2, S2] = [L1 * k, S1 * k];
      const askLong = rng.chance(0.5);
      const x = askLong ? L2 : S2;
      const known1 = askLong ? S1 : L1;
      const known2 = askLong ? S2 : L2;
      const match = askLong ? L1 : S1;
      const shape = rect ? 'rectangle' : 'right triangle';
      const lab2 = askLong ? ['x', fl(S2, u)] : [fl(L2, u), 'x'];
      return {
        prompt: rect
          ? `Rectangle A is $${ms(L1, u)}$ long and $${ms(S1, u)}$ wide. Rectangle B is similar to A and is $${ms(known2, u)}$ ${askLong ? 'wide' : 'long'}. Find its ${askLong ? 'length' : 'width'}, $x$.`
          : `The two right triangles are similar. Triangle A has legs of $${ms(L1, u)}$ and $${ms(S1, u)}$. The matching legs of triangle B are $x$ and $${ms(known2, u)}$. Find $x$.`,
        figure: shapesFigure(
          rect
            ? [
                { pts: rectPts(L1, S1), sides: [fl(L1, u), null, null, fl(S1, u)], title: 'A' },
                { pts: rectPts(L2, S2), sides: [lab2[0], null, null, lab2[1]], title: 'B' },
              ]
            : [
                { pts: rtTriPts(L1, S1), sides: [fl(L1, u), null, fl(S1, u)], title: 'A' },
                { pts: rtTriPts(L2, S2), sides: [lab2[0], null, lab2[1]], title: 'B' },
              ],
        ),
        parts: [numPart(x, { suffix: u, label: '$x =$' })],
        hints: ['Find the scale factor from a pair of matching sides that you know in both shapes.', 'Multiply the matching side of shape A by the scale factor.'],
        solution: [
          `The ${shape}s are similar. Use the pair of sides you know in both: $k = \\dfrac{${fmt(known2)}}{${fmt(known1)}} = ${fmt(k)}$.`,
          `$x = ${fmt(match)} \\times ${fmt(k)} = ${fmt(x)}$`,
          `The missing side is $x = ${ms(x, u)}$.`,
        ],
      };
    }
    if (d === 2) {
      const nm = rng.pick(SIM_NAMES);
      const tri = rng.chance(0.6);
      const n = tri ? 3 : 4;
      const g = retry(
        () => {
          const [p, q] = rng.pick(K_FRACS);
          let sides: number[];
          if (tri) sides = [rng.int(4, 12), rng.int(3, 12), rng.int(3, 12)];
          else {
            const t = rng.int(1, 3);
            const top = rng.int(2, 6);
            sides = [top + 3 * t, 5 * t, top, 4 * t];
          }
          const iK = rng.int(0, n - 1);
          const iX = rng.intExcept(0, n - 1, [iK]);
          const x = (sides[iX] * p) / q;
          return { p, q, sides, iK, iX, x, exact: hasDp(x, 2) };
        },
        (g) =>
          g.sides[g.iK] % g.q === 0 &&
          (!tri || (g.sides[0] >= g.sides[1] && g.sides[0] >= g.sides[2] && g.sides[1] + g.sides[2] > g.sides[0] + 1 && g.sides[1] !== g.sides[2])) &&
          (g.exact || safe(g.x, 1)),
        400,
      );
      const { p, q, sides, iK, iX, x, exact } = g;
      const k = p / q;
      const known2 = (sides[iK] * p) / q;
      const xs = exact ? fmt(x) : fmtFixed(x, 1);
      const pts1: Pt[] = tri
        ? sssPts(sides[0], sides[1], sides[2])
        : [
            [0, 0],
            [sides[0], 0],
            [sides[2], sides[3]],
            [0, sides[3]],
          ];
      const pts2 = (rng.chance(0.4) ? mirrorX(pts1) : pts1).map(([a, b]) => [a * k, b * k] as Pt);
      const v1 = tri ? nm.slice(0, 3) : ['A', 'B', 'C', 'D'];
      const v2 = tri ? nm.slice(3, 6) : ['E', 'F', 'G', 'H'];
      const sn = (v: string[], i: number) => `${v[i]}${v[(i + 1) % n]}`;
      const nm1 = v1.join('');
      const nm2 = v2.join('');
      const sym = tri ? '\\triangle ' : '';
      return {
        prompt: `$${sym}${nm1} \\sim ${sym}${nm2}$. In $${sym}${nm1}$, $${sn(v1, iK)} = ${ms(sides[iK], u)}$ and $${sn(v1, iX)} = ${ms(sides[iX], u)}$. In $${sym}${nm2}$, $${sn(v2, iK)} = ${ms(known2, u)}$. Find $${sn(v2, iX)}$${exact ? '' : `, ${nearest(1, u)}`}.`,
        figure: shapesFigure([
          { pts: pts1, sides: sides.map((s, i) => (i === iK || i === iX ? fl(s, u) : null)), verts: v1 },
          { pts: pts2, sides: sides.map((_, i) => (i === iK ? fl(known2, u) : i === iX ? 'x' : null)), verts: v2 },
        ]),
        parts: [numPart(x, { decimals: exact ? undefined : 1, suffix: u, label: `$${sn(v2, iX)} =$` })],
        hints: [
          `The order of the letters shows which sides match: $${sn(v1, iK)}$ matches $${sn(v2, iK)}$, and $${sn(v1, iX)}$ matches $${sn(v2, iX)}$.`,
          `Set up a proportion: $\\dfrac{${sn(v2, iX)}}{${sn(v1, iX)}} = \\dfrac{${sn(v2, iK)}}{${sn(v1, iK)}}$.`,
        ],
        solution: [
          `$${sn(v1, iK)}$ matches $${sn(v2, iK)}$ and $${sn(v1, iX)}$ matches $${sn(v2, iX)}$. Let $x = ${sn(v2, iX)}$.`,
          `$\\dfrac{x}{${fmt(sides[iX])}} = \\dfrac{${fmt(known2)}}{${fmt(sides[iK])}}$`,
          `Multiply both sides by $${fmt(sides[iX])}$: $x = ${fmt(sides[iX])} \\times \\dfrac{${fmt(known2)}}{${fmt(sides[iK])}} ${exact ? '=' : '\\approx'} ${xs}$`,
          `$${sn(v2, iX)}$ is ${exact ? '' : 'about '}$${ms(xs, u)}$ long.`,
        ],
      };
    }
    const name = rng.pick(NAMES);
    if (rng.chance(0.7)) {
      // Shadow method.
      const obj = rng.pick([
        { what: 'tree', scene: 'tree' as const, lo: 6, hi: 25 },
        { what: 'flagpole', scene: undefined, lo: 6, hi: 20 },
        { what: 'grain elevator', scene: undefined, lo: 18, hi: 40 },
        { what: 'parking lot light standard', scene: undefined, lo: 6, hi: 14 },
        { what: 'cell tower', scene: undefined, lo: 20, hi: 60 },
        { what: 'drilling rig mast', scene: undefined, lo: 25, hi: 45 },
      ]);
      const [refDesc, refH, refS, S, H] = retry(
        () => {
          const r = rng.int(0, 2);
          const refH = r === 0 ? rng.pick([1.5, 1.6, 1.7, 1.8]) : r === 1 ? 1 : rng.pick([1.2, 1.5]);
          const refDesc = r === 0 ? `${name}, who is $${ms(refH, 'm')}$ tall,` : r === 1 ? 'a metre stick held straight up' : `a fence post that is $${ms(refH, 'm')}$ tall`;
          const refS = rng.int(Math.round(refH * 5), Math.round(refH * 25)) / 10;
          const S = Math.max(3, Math.round((rng.int(obj.lo, obj.hi) * refS) / refH));
          return [refDesc, refH, refS, S, (S * refH) / refS] as const;
        },
        (v) => safe(v[4], 1) && v[2] !== v[1] && v[4] >= obj.lo * 0.8 && v[4] <= obj.hi * 1.2,
      );
      const eq = hasDp(H, 1) ? '=' : '\\approx';
      return {
        prompt: `On a sunny afternoon, ${refDesc} casts a shadow $${ms(refS, 'm')}$ long. At the same time, a nearby ${obj.what} casts a shadow $${ms(S, 'm')}$ long. How tall is the ${obj.what}, ${nearest(1, 'm')}?`,
        figure: triFig(CTX_TRI, S, H, { ra: fl(S, 'm'), rb: 'h' }, obj.scene),
        parts: [numPart(H, { decimals: 1, suffix: 'm', label: '$h =$' })],
        hints: [
          'The sun’s rays hit both objects at the same angle, so the two triangles (height, shadow, sun ray) are similar.',
          'Set up a proportion of height to shadow: $\\dfrac{h}{\\text{shadow}} = \\dfrac{\\text{known height}}{\\text{known shadow}}$.',
        ],
        solution: [
          'Each object, its shadow and the sun’s ray form a right triangle, and the sun’s rays make the same angle with the ground. The triangles are similar.',
          `$\\dfrac{h}{${S}} = \\dfrac{${fmt(refH)}}{${fmt(refS)}}$`,
          `$h = ${S} \\times \\dfrac{${fmt(refH)}}{${fmt(refS)}} ${eq} ${fmtFixed(H, 1)}$`,
          `The ${obj.what} is ${hasDp(H, 1) ? '' : 'about '}$${ms(fmtFixed(H, 1), 'm')}$ tall.`,
        ],
      };
    }
    // Nested triangles under a ramp.
    const [post, d1, D, H] = retry(
      () => {
        const post = rng.int(6, 16) / 20;
        const d1 = rng.int(4, 12) / 4;
        const D = rng.int(16, 40) / 4;
        return [post, d1, D, (post * D) / d1];
      },
      (v) => v[2] > v[1] * 1.8 && safe(v[3], 2) && v[3] < 2.5,
    );
    return {
      prompt: `${name} is checking a ramp that slopes up from the ground. A vertical support post stands under the ramp $${ms(d1, 'm')}$ (measured along the ground) from the bottom end, and the post is $${ms(post, 'm')}$ tall. The ramp covers a total horizontal distance of $${ms(D, 'm')}$. How high is the top end of the ramp, ${nearest(2, 'm')}?`,
      figure: triFig(CTX_TRI, D, H, { ra: fl(D, 'm'), rb: 'h' }, 'ramp'),
      parts: [numPart(H, { decimals: 2, suffix: 'm', label: '$h =$' })],
      hints: ['The small triangle under the post and the whole triangle under the ramp share the angle at the bottom, and both have a right angle. They are similar.', 'Set up $\\dfrac{h}{\\text{total run}} = \\dfrac{\\text{post height}}{\\text{distance to post}}$.'],
      solution: [
        'The small triangle (post, ground, ramp) and the large triangle (top height, ground, ramp) share the angle at the bottom and both have a right angle, so they are similar.',
        `$\\dfrac{h}{${fmt(D)}} = \\dfrac{${fmt(post)}}{${fmt(d1)}}$`,
        `$h = ${fmt(D)} \\times \\dfrac{${fmt(post)}}{${fmt(d1)}} \\approx ${fmtFixed(H, 2)}$`,
        `The top of the ramp is about $${ms(fmtFixed(H, 2), 'm')}$ high.`,
      ],
    };
  },
});

const DRAW_ITEMS = [
  { what: 'a kitchen wall', lo: 2.5, hi: 6 },
  { what: 'a countertop', lo: 1.5, hi: 4.5 },
  { what: 'a deck', lo: 3, hi: 8 },
  { what: 'a driveway', lo: 6, hi: 18 },
  { what: 'a workbench', lo: 1.5, hi: 3.5 },
  { what: 'a hallway', lo: 3, hi: 10 },
  { what: 'a warehouse wall', lo: 20, hi: 60 },
  { what: 'a semi-trailer', lo: 14, hi: 16.2 },
  { what: 'a garden bed', lo: 2, hi: 6 },
];

/** A real-world item, a 1:n scale and a drawn length (cm, multiple of `step`) that gives a realistic real length. */
function pickScaled(rng: Rng, ns: number[], step: number) {
  for (let i = 0; i < 100; i++) {
    const item = rng.pick(DRAW_ITEMS);
    const n = rng.pick(ns);
    const a = Math.ceil(Math.max((item.lo * 100) / n, 1.5) / step - 1e-9);
    const b = Math.floor(Math.min((item.hi * 100) / n, 25) / step + 1e-9);
    if (a > b) continue;
    const drawn = roundTo(rng.int(a, b) * step, 2);
    return { item: item.what, n, drawn, actual: roundTo((drawn * n) / 100, 4) };
  }
  return { item: 'a wall', n: 50, drawn: 8, actual: 4 };
}

const scaleDrawing = skill({
  id: 'm103-scale-drawing',
  name: 'Scale drawings, blueprints and maps',
  description: 'Use a scale (such as 1:50 or 1/4 in = 1 ft) to find an actual length from a drawn length, or a drawn length from an actual length.',
  outcomes: ['G3'],
  lessonId: 'm103-7-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const kind = rng.int(0, 2);
      if (kind === 0) {
        const plan = rng.pick([
          { plan: 'floor plan of a house', what: 'a bedroom wall', Ns: [0.5, 1] },
          { plan: 'site plan for a new shop', what: 'one side of the lot', Ns: [2, 4, 5] },
          { plan: 'landscape plan for a backyard', what: 'a fence', Ns: [0.5, 1, 2] },
          { plan: 'plan of a restaurant kitchen', what: 'a counter', Ns: [0.5, 1] },
        ]);
        const N = rng.pick(plan.Ns);
        const drawn = rng.int(3, 24) / 2;
        const actual = drawn * N;
        return {
          prompt: `On a ${plan.plan}, $${ms(1, 'cm')}$ represents $${ms(N, 'm')}$. On the plan, ${plan.what} measures $${ms(drawn, 'cm')}$. How long is it in real life?`,
          parts: [numPart(actual, { suffix: 'm', label: 'Actual length' })],
          hints: [`Each centimetre on the plan stands for $${ms(N, 'm')}$.`, 'Multiply the drawn length by the number of metres each centimetre represents.'],
          solution: [`$${fmt(drawn)} \\times ${fmt(N)} = ${fmt(actual)}$`, `In real life it is $${ms(actual, 'm')}$ long.`],
        };
      }
      if (kind === 1) {
        const [scaleTex, perIn] = rng.pick([
          ['\\tfrac{1}{4}\\ \\text{in}', 4],
          ['\\tfrac{1}{2}\\ \\text{in}', 2],
          ['1\\ \\text{in}', 8],
          ['1\\ \\text{in}', 10],
        ] as Array<[string, number]>);
        const ftPer = perIn === 8 || perIn === 10 ? perIn : 1;
        const drawn = rng.int(2, 10);
        const actual = drawn * perIn;
        return {
          prompt: `On a blueprint, $${scaleTex}$ represents $${ms(ftPer, 'ft')}$. A wall measures $${ms(drawn, 'in')}$ on the blueprint. How long is the actual wall, in feet?`,
          parts: [numPart(actual, { suffix: 'ft', label: 'Actual length' })],
          hints: [
            ftPer === 1 ? `Work out how many feet one whole inch on the drawing stands for: $1 \\div ${scaleTex.split('\\ ')[0]}$.` : `Each inch on the drawing stands for $${ms(ftPer, 'ft')}$.`,
            'Multiply the drawn length by the number of feet each inch represents.',
          ],
          solution: [
            ftPer === 1 ? `If $${scaleTex}$ represents $1\\ \\text{ft}$, then $1\\ \\text{in}$ represents $${perIn}\\ \\text{ft}$.` : `Each inch represents $${ms(perIn, 'ft')}$.`,
            `$${drawn} \\times ${perIn} = ${actual}$`,
            `The actual wall is $${ms(actual, 'ft')}$ long.`,
          ],
        };
      }
      const N = rng.pick([5, 10, 20, 25, 50]);
      const drawn = rng.int(3, 25) / 2;
      const actual = drawn * N;
      return {
        prompt: `On a regional road map, $${ms(1, 'cm')}$ represents $${ms(N, 'km')}$. Two towns are $${ms(drawn, 'cm')}$ apart on the map. What is the actual distance between them?`,
        parts: [numPart(actual, { suffix: 'km', label: 'Distance' })],
        hints: [`Each centimetre on the map stands for $${ms(N, 'km')}$.`, 'Multiply the map distance by that number.'],
        solution: [`$${fmt(drawn)} \\times ${N} = ${fmt(actual)}$`, `The towns are $${ms(actual, 'km')}$ apart.`],
      };
    }
    if (d === 2) {
      const kind = rng.int(0, 2);
      if (kind < 2) {
        const { n, drawn, actual: actualM, item } = pickScaled(rng, [20, 25, 50, 75, 100, 200, 250], 0.1);
        if (kind === 0) {
          return {
            prompt: `A scale drawing uses a scale of $1:${n}$. On the drawing, ${item} is $${ms(drawn, 'cm')}$ long. How long is it in real life, in metres?`,
            parts: [numPart(actualM, { suffix: 'm', label: 'Actual length' })],
            hints: [`A scale of $1:${n}$ means every length in real life is $${n}$ times the length on the drawing.`, 'Multiply to get centimetres, then divide by 100 to change centimetres to metres.'],
            solution: [`$${fmt(drawn)} \\times ${n} = ${ms(roundTo(drawn * n, 4), 'cm')}$`, `$${fmt(roundTo(drawn * n, 4))} \\div 100 = ${fmt(actualM)}$`, `It is $${ms(actualM, 'm')}$ long in real life.`],
          };
        }
        return {
          prompt: `${name} is making a scale drawing with a scale of $1:${n}$. In real life, ${item} is $${ms(actualM, 'm')}$ long. How long should it be on the drawing, in centimetres?`,
          parts: [numPart(drawn, { suffix: 'cm', label: 'Drawn length' })],
          hints: ['Change the real length to centimetres first: multiply by 100.', `On the drawing, every length is $${n}$ times smaller, so divide by $${n}$.`],
          solution: [`$${fmt(actualM)}\\ \\text{m} = ${fmt(actualM)} \\times 100 = ${ms(roundTo(actualM * 100, 4), 'cm')}$`, `$${fmt(roundTo(actualM * 100, 4))} \\div ${n} = ${fmt(drawn)}$`, `It should be $${ms(drawn, 'cm')}$ long on the drawing.`],
        };
      }
      // Imperial blueprint scale, either direction.
      const [scaleTex, perIn] = rng.pick([
        ['\\tfrac{1}{4}\\ \\text{in}', 4],
        ['\\tfrac{1}{8}\\ \\text{in}', 8],
        ['\\tfrac{1}{2}\\ \\text{in}', 2],
      ] as Array<[string, number]>);
      const roomPick = rng.pick([
        { what: 'bedroom wall', lo: 9, hi: 16 },
        { what: 'garage wall', lo: 18, hi: 30 },
        { what: 'kitchen wall', lo: 8, hi: 16 },
        { what: 'shop floor', lo: 20, hi: 40 },
        { what: 'front porch', lo: 6, hi: 14 },
      ]);
      const feet = rng.int(roomPick.lo, roomPick.hi);
      const drawnIn = feet / perIn;
      const room = roomPick.what;
      if (rng.chance(0.5)) {
        return {
          prompt: `A blueprint uses the scale $${scaleTex} = 1\\ \\text{ft}$. A ${room} measures $${mixedTex(drawnIn)}\\ \\text{in}$ on the blueprint. How long is it in real life, in feet?`,
          parts: [numPart(feet, { suffix: 'ft', label: 'Actual length' })],
          hints: [`How many feet does one whole inch on the blueprint represent? $1 \\div ${scaleTex.split('\\ ')[0]} = ${perIn}$`, `Multiply the drawn length by $${perIn}$.`],
          solution: [`$1\\ \\text{in}$ on the blueprint represents $${perIn}\\ \\text{ft}$.`, `$${mixedTex(drawnIn)} \\times ${perIn} = ${feet}$`, `The ${room} is $${ms(feet, 'ft')}$ long.`],
        };
      }
      return {
        prompt: `A blueprint uses the scale $${scaleTex} = 1\\ \\text{ft}$. A ${room} is $${ms(feet, 'ft')}$ long in real life. How long is it on the blueprint, in inches? (You may answer with a fraction or a mixed number.)`,
        parts: [numPart(drawnIn, { suffix: 'in', label: 'Drawn length' })],
        hints: [`Each foot is drawn as $${scaleTex}$.`, `Divide the number of feet by $${perIn}$ (or multiply by $${scaleTex.split('\\ ')[0]}$).`],
        solution: [`$${feet} \\times ${scaleTex.split('\\ ')[0]} = \\dfrac{${feet}}{${perIn}}$`, `$= ${mixedTex(drawnIn)}$`, `On the blueprint it is $${mixedTex(drawnIn)}\\ \\text{in}$ long.`],
      };
    }
    // d = 3
    const kind = rng.int(0, 4);
    if (kind === 0) {
      const n = rng.pick([20000, 50000, 100000, 250000]);
      const drawn = rng.int(15, 150) / 10;
      const km = (drawn * n) / 100000;
      return {
        prompt: `A topographic map of a mountain park uses a scale of $1:${big(n)}$. A hiking trail measures $${ms(drawn, 'cm')}$ on the map. How long is the trail in real life, in kilometres?`,
        parts: [numPart(km, { suffix: 'km', label: 'Length' })],
        hints: [`Multiply by $${big(n)}$ to get the real length in centimetres.`, 'Then convert: $1\\ \\text{km} = 1000\\ \\text{m} = 100\\,000\\ \\text{cm}$.'],
        solution: [
          `$${fmt(drawn)} \\times ${big(n)} = ${big(roundTo(drawn * n, 2))}\\ \\text{cm}$`,
          `$${big(roundTo(drawn * n, 2))} \\div 100\\,000 = ${fmt(km)}$`,
          `The trail is $${ms(km, 'km')}$ long.`,
        ],
      };
    }
    if (kind === 1) {
      const { n, drawn, actual: actualM, item } = pickScaled(rng, [20, 25, 40, 50, 75, 100, 200], 0.5);
      return {
        prompt: `On ${name}’s scale drawing, ${item} that is $${ms(actualM, 'm')}$ long in real life is drawn $${ms(drawn, 'cm')}$ long. The scale is written as $1:n$. What is $n$?`,
        parts: [numPart(n, { label: '$n =$' })],
        hints: ['Both lengths must be in the same unit. Change the real length to centimetres.', '$n = \\dfrac{\\text{real length}}{\\text{drawn length}}$'],
        solution: [`$${ms(actualM, 'm')} = ${fmt(actualM)} \\times 100 = ${ms(roundTo(actualM * 100, 4), 'cm')}$`, `$n = \\dfrac{${fmt(roundTo(actualM * 100, 4))}}{${fmt(drawn)}} = ${n}$`, `The scale is $1:${n}$.`],
      };
    }
    if (kind === 2) {
      const n = rng.pick([50, 100]);
      const [l, w, area] = retry(
        () => {
          const l = rng.int(40, 120) / 10;
          const w = rng.int(30, Math.round(l * 10)) / 10;
          return [l, w, ((l * n) / 100) * ((w * n) / 100)];
        },
        (v) => safe(v[2], 1) && !hasDp(v[2], 1),
      );
      const L = (l * n) / 100;
      const W = (w * n) / 100;
      return {
        prompt: `On a floor plan with a scale of $1:${n}$, a rectangular room measures $${ms(l, 'cm')}$ by $${ms(w, 'cm')}$. ${name} needs to order flooring. What is the actual area of the room, to the nearest tenth of a square metre?`,
        parts: [numPart(area, { decimals: 1, suffix: 'm²', label: 'Area' })],
        hints: ['Find the **actual** length and width in metres first. Do not find the area on the drawing.', 'Then multiply length by width.'],
        solution: [
          `Length: $${fmt(l)} \\times ${n} = ${fmt(roundTo(l * n, 4))}\\ \\text{cm} = ${ms(L, 'm')}$`,
          `Width: $${fmt(w)} \\times ${n} = ${fmt(roundTo(w * n, 4))}\\ \\text{cm} = ${ms(W, 'm')}$`,
          `Area: $${fmt(L)} \\times ${fmt(W)} \\approx ${fmtFixed(area, 1)}$`,
          `The room has an area of about $${fmtFixed(area, 1)}\\ \\text{m}^2$.`,
        ],
      };
    }
    if (kind === 3) {
      const thing = rng.pick([
        { what: 'workbench', lo: 6, hi: 11 },
        { what: 'garage wall', lo: 18, hi: 26 },
        { what: 'deck', lo: 10, hi: 20 },
        { what: 'storage rack', lo: 8, hi: 16 },
      ]);
      const ft = rng.int(thing.lo, thing.hi);
      const inch = rng.pick([3, 6, 9]);
      const total = ft + inch / 12;
      const drawn = total / 4;
      return {
        prompt: `${name} is drawing a shop floor plan with the scale $\\tfrac{1}{4}\\ \\text{in} = 1\\ \\text{ft}$. A ${thing.what} is $${ft}\\ \\text{ft}\\ ${inch}\\ \\text{in}$ long. How long should it be on the drawing, in inches? (You may answer with a fraction or a mixed number.)`,
        parts: [numPart(drawn, { suffix: 'in', label: 'Drawn length' })],
        hints: ['Change the length to feet only: divide the inches by 12.', 'Each foot is drawn as $\\tfrac{1}{4}\\ \\text{in}$, so divide the number of feet by 4.'],
        solution: [
          `$${inch}\\ \\text{in} = ${mixedTex(inch / 12, 4)}\\ \\text{ft}$, so the ${thing.what} is $${mixedTex(total, 4)}\\ \\text{ft}$ long.`,
          `$${mixedTex(total, 4)} \\div 4 = ${mixedTex(drawn)}$`,
          `On the drawing it is $${mixedTex(drawn)}\\ \\text{in}$ long.`,
        ],
      };
    }
    // Enlarged machinist drawing.
    const k = rng.pick([2, 4, 5, 10]);
    const actual = retry(
      () => rng.int(20, 160) / 10,
      (a) => hasDp(a * k, 1),
    );
    const drawnMm = roundTo(actual * k, 2);
    return {
      prompt: `A machinist’s drawing of a small part is drawn at a scale of $${k}:1$, so the drawing is **larger** than the real part. A slot on the part measures $${ms(drawnMm, 'mm')}$ on the drawing. How long is the real slot?`,
      parts: [numPart(actual, { suffix: 'mm', label: 'Real length' })],
      hints: [`A scale of $${k}:1$ means the drawing is $${k}$ times as long as the real part.`, `Divide the drawn length by $${k}$.`],
      solution: [`$${fmt(drawnMm)} \\div ${k} = ${fmt(actual)}$`, `The real slot is $${ms(actual, 'mm')}$ long.`],
    };
  },
});

export const PYTHAGORAS_SKILLS: SkillDef[] = [pythHyp, pythLeg, pythCheck, pythApply, similarCheck, scaleFactor, similarMissing, scaleDrawing];
