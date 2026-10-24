/** Math 10-3 Unit 8 — Trigonometry (G4, A1). */
import { fixedChoice, mc, numPart, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { acosD, asinD, atanD, cosD, fmt, fmtFixed, sinD, tanD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, RightTriangleFigure, SkillDef, TwoTriangleFigure } from '../../../types.ts';

type SideKey = 'opp' | 'adj' | 'hyp';
type Fn = 'sin' | 'cos' | 'tan';
type Vtx = 'a' | 'b';
type SideLabelKey = 'ra' | 'rb' | 'ab';
type Scene = NonNullable<RightTriangleFigure['scene']>;

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const VERTEX_SETS = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['D', 'E', 'F'],
  ['J', 'K', 'L'],
  ['S', 'T', 'U'],
  ['X', 'Y', 'Z'],
  ['G', 'H', 'K'],
  ['M', 'N', 'P'],
];

const PEOPLE = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kai', 'Jasleen', 'Wei', 'Fatima', 'Owen', 'Chloé', 'Tariq',
  'Mei', 'Sofia', 'Arjun', 'Hana', 'Diego', 'Nia', 'Gurpreet', 'Jonah', 'Leila', 'Malik', 'Yuki', 'Tyler',
  'Simran', 'Émile', 'Kiona', 'Darnell', 'Rosa', 'Dmitri', 'Hamid', 'Ava', 'Nathan', 'Lucía',
];

const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Northfield', 'Elmwood'];

const FRIENDLY_ANGLES = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];

const UNIT_WORD: Record<string, string> = { cm: 'centimetre', m: 'metre', ft: 'foot', in: 'inch' };
const FN_WORD: Record<Fn, string> = { sin: 'sine', cos: 'cosine', tan: 'tangent' };
const SIDE_WORD: Record<SideKey, string> = { opp: 'opposite side', adj: 'adjacent side', hyp: 'hypotenuse' };
const RATIO: Record<Fn, string> = {
  sin: '\\dfrac{\\text{opposite}}{\\text{hypotenuse}}',
  cos: '\\dfrac{\\text{adjacent}}{\\text{hypotenuse}}',
  tan: '\\dfrac{\\text{opposite}}{\\text{adjacent}}',
};
const MEMORY: Record<Fn, string> = { sin: 'SOH', cos: 'CAH', tan: 'TOA' };

const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
/** A measurement in Markdown, e.g. $6.5\ \text{m}$. */
const qty = (x: number, unit: string) => `$${fmt(x)}\\ \\text{${unit}}$`;
/** A measurement as a figure label. */
const lbl = (x: number, unit: string) => `${fmt(x)}\\text{ ${unit}}`;
const nearest = (unit: string) => `${roundingPhrase(1)} of a ${UNIT_WORD[unit]}`;
const angleRound = (dp: number) => (dp === 0 ? 'to the nearest degree' : 'to the nearest tenth of a degree');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** True when x is safely away from a rounding boundary (…5) at `dp` decimal places. */
function clear(x: number, dp: number, margin = 0.1): boolean {
  const s = Math.abs(x) * 10 ** dp;
  const f = s - Math.floor(s);
  return Math.abs(f - 0.5) > margin;
}

const trig = (fn: Fn, ang: number) => (fn === 'sin' ? sinD(ang) : fn === 'cos' ? cosD(ang) : tanD(ang));
const inv = (fn: Fn, r: number) => (fn === 'sin' ? asinD(r) : fn === 'cos' ? acosD(r) : atanD(r));

/** The ratio that links two sides (SOH CAH TOA). */
function fnFor(a: SideKey, b: SideKey): Fn {
  const has = (k: SideKey) => a === k || b === k;
  return has('hyp') ? (has('opp') ? 'sin' : 'cos') : 'tan';
}
const topOf = (fn: Fn): SideKey => (fn === 'cos' ? 'adj' : 'opp');
const bottomOf = (fn: Fn): SideKey => (fn === 'tan' ? 'adj' : 'hyp');

/** All three sides for angle θ when one side is known. */
function triFrom(key: SideKey, v: number, ang: number): Record<SideKey, number> {
  const hyp = key === 'hyp' ? v : key === 'opp' ? v / sinD(ang) : v / cosD(ang);
  return { opp: hyp * sinD(ang), adj: hyp * cosD(ang), hyp };
}

/**
 * The unknown side, and whether the worked solution (which shows the ratio to 4 decimal places)
 * rounds to the same answer and the answer is clear of a rounding boundary.
 */
function sideValue(fn: Fn, ang: number, known: number, top: boolean) {
  const r = trig(fn, ang);
  const x = top ? known * r : known / r;
  const r4 = Number(fmtFixed(r, 4));
  const shown = top ? known * r4 : known / r4;
  return { x, ok: clear(x, 1) && fmtFixed(shown, 1) === fmtFixed(x, 1) };
}

function pickVal(rng: Rng, [lo, hi, step]: [number, number, number], friendly: boolean): number {
  if (friendly) {
    const a = Math.ceil(lo);
    const b = Math.floor(hi);
    if (b > a) {
      const st = b - a > 30 ? 5 : 1;
      return a + st * rng.int(0, Math.floor((b - a) / st));
    }
  }
  const n = Math.round((hi - lo) / step);
  return Math.round((lo + step * rng.int(0, n)) * 1000) / 1000;
}

function pickFive(rng: Rng, [lo, hi]: [number, number]): number {
  const a = Math.ceil(lo / 5);
  const b = Math.floor(hi / 5);
  return b >= a ? 5 * rng.int(a, b) : rng.int(lo, hi);
}

const roundStep = (x: number, step: number) => Math.round(Math.round(x / step) * step * 1000) / 1000;

interface Tri {
  /** Right-angle vertex R, vertex A (end of the first leg) and vertex B (end of the second leg). */
  R: string;
  A: string;
  B: string;
  rotate: 0 | 1 | 2 | 3;
  mirror: boolean;
}

function makeTri(rng: Rng, d: Difficulty): Tri {
  const [R, A, B] = rng.shuffle(rng.pick(VERTEX_SETS));
  return { R, A, B, rotate: d === 1 ? 0 : rng.pick([0, 1, 2, 3] as const), mirror: rng.chance(d === 1 ? 0.5 : 0.4) };
}

/** Upright layout for word problems: right angle at the base, A on the ground, B at the top. */
function uprightTri(rng: Rng): Tri {
  const [R, A, B] = rng.shuffle(rng.pick(VERTEX_SETS));
  return { R, A, B, rotate: 0, mirror: false };
}

function fig(t: Tri, legA: number, legB: number, sideLabels: Partial<Record<SideLabelKey, string>>, angleLabels: Partial<Record<Vtx, string>>, scene?: Scene): RightTriangleFigure {
  const f: RightTriangleFigure = {
    type: 'rightTriangle',
    vertices: { right: t.R, a: t.A, b: t.B },
    legA,
    legB,
    sideLabels,
    angleLabels,
    rotate: scene ? 0 : t.rotate,
    mirror: scene ? false : t.mirror,
  };
  if (scene && scene !== 'none') f.scene = scene;
  return f;
}

/** Side names and figure keys relative to the acute angle at vertex `at`. */
function rel(t: Tri, at: Vtx) {
  const name = (p: string, q: string) => [p, q].sort().join('');
  const seg: Record<SideKey, string> = {
    opp: at === 'a' ? name(t.R, t.B) : name(t.R, t.A),
    adj: at === 'a' ? name(t.R, t.A) : name(t.R, t.B),
    hyp: name(t.A, t.B),
  };
  const key: Record<SideKey, SideLabelKey> = { opp: at === 'a' ? 'rb' : 'ra', adj: at === 'a' ? 'ra' : 'rb', hyp: 'ab' };
  return { vtx: at === 'a' ? t.A : t.B, seg, key };
}

/** [legA, legB] for drawing when θ is at vertex `at`. */
const drawLegs = (at: Vtx, s: Record<SideKey, number>): [number, number] => (at === 'a' ? [s.adj, s.opp] : [s.opp, s.adj]);

/** Upright scenes always have θ at vertex a: run along the ground (ra), rise (rb), slope (ab). */
const UPRIGHT_KEY: Record<SideKey, SideLabelKey> = { opp: 'rb', adj: 'ra', hyp: 'ab' };

function labels(entries: Array<[SideLabelKey, string]>): Partial<Record<SideLabelKey, string>> {
  const out: Partial<Record<SideLabelKey, string>> = {};
  for (const [k, v] of entries) out[k] = v;
  return out;
}

function angleAt(at: Vtx, text: string): Partial<Record<Vtx, string>> {
  return at === 'a' ? { a: text } : { b: text };
}

/** Steps that solve fn(θ) = top / bottom for an unknown side. */
function sideSteps(fn: Fn, ang: number, known: number, top: boolean, sym: string, x: number, unit: string): string[] {
  const f = `\\${fn} ${deg(ang)}`;
  const r = fmtFixed(trig(fn, ang), 4);
  const k = fmt(known);
  if (top) {
    return [
      `Write the ratio: $${f} = \\dfrac{${sym}}{${k}}$`,
      `Multiply both sides by $${k}$: $${sym} = ${k}\\${fn} ${deg(ang)}$`,
      `$${sym} \\approx ${k} \\times ${r} \\approx ${fmtFixed(x, 1)}\\ \\text{${unit}}$`,
    ];
  }
  return [
    `Write the ratio: $${f} = \\dfrac{${k}}{${sym}}$`,
    `The unknown is on the bottom. Multiply both sides by $${sym}$, then divide both sides by $${f}$: $${sym} = \\dfrac{${k}}{${f}}$`,
    `$${sym} \\approx \\dfrac{${k}}{${r}} \\approx ${fmtFixed(x, 1)}\\ \\text{${unit}}$`,
  ];
}

const methodHint = (fn: Fn, top: boolean, known: string, ang: number, sym = 'x') =>
  top
    ? `Write $\\${fn} ${deg(ang)} = \\dfrac{${sym}}{${known}}$, then multiply both sides by $${known}$.`
    : `Write $\\${fn} ${deg(ang)} = \\dfrac{${known}}{${sym}}$. The unknown is on the bottom, so $${sym} = \\dfrac{${known}}{\\${fn} ${deg(ang)}}$.`;

// ---------------------------------------------------------------------------
// Word-problem scenarios. θ is the angle at ground level (vertex a in the upright layout).
// ---------------------------------------------------------------------------

type PairKey = 'opp-adj' | 'hyp-opp' | 'hyp-adj';
type Words = Partial<Record<SideKey, string>>;

interface Scenario {
  key: string;
  scene: Scene;
  ang: [number, number];
  sides: SideKey[];
  /** Uses an angle of depression (lesson 8.3 only). */
  depression?: boolean;
  sym: Record<SideKey, string>;
  noun: Partial<Record<SideKey, string>>;
  range: Partial<Record<SideKey, [number, number, number]>>;
  given: Partial<Record<SideKey, (v: string, who: string) => string>>;
  angle: (a: string, who: string, known: SideKey) => string;
  q: Partial<Record<SideKey, (who: string) => string>>;
  pair: Partial<Record<PairKey, (v: Words, who: string) => string>>;
  angleQ: (who: string) => string;
  angleNoun: (who: string) => string;
}

const pairKey = (a: SideKey, b: SideKey): PairKey => (a === 'hyp' || b === 'hyp' ? (a === 'opp' || b === 'opp' ? 'hyp-opp' : 'hyp-adj') : 'opp-adj');

const SYM: Record<SideKey, string> = { opp: 'h', adj: 'd', hyp: 'L' };

const SCENARIOS: Scenario[] = [
  {
    key: 'ladder',
    scene: 'ladder',
    ang: [65, 80],
    sides: ['opp', 'adj', 'hyp'],
    sym: SYM,
    noun: { opp: 'the height the ladder reaches up the wall', adj: 'the distance from the foot of the ladder to the wall', hyp: 'the length of the ladder' },
    range: { hyp: [4, 9, 0.5], opp: [3.5, 8.5, 0.5], adj: [0.8, 2.4, 0.1] },
    given: {
      hyp: (v, w) => `${w} leans a ladder that is ${v} long against the wall of a house.`,
      opp: (v, w) => `${w} needs a ladder that reaches ${v} up the wall of a house.`,
      adj: (v, w) => `${w} sets the foot of a ladder ${v} from the wall of a house.`,
    },
    angle: (a) => `The ladder makes an angle of ${a} with the ground.`,
    q: { opp: () => 'How high up the wall does the ladder reach', adj: () => 'How far from the wall is the foot of the ladder', hyp: () => 'How long must the ladder be' },
    pair: {
      'hyp-adj': (v, w) => `${w} leans a ladder that is ${v.hyp} long against a wall, with its foot ${v.adj} from the wall.`,
      'hyp-opp': (v, w) => `${w} leans a ladder that is ${v.hyp} long against a wall. The top of the ladder is ${v.opp} above the ground.`,
      'opp-adj': (v, w) => `${w} leans a ladder against a wall. The top of the ladder is ${v.opp} above the ground, and its foot is ${v.adj} from the wall.`,
    },
    angleQ: () => 'What angle does the ladder make with the ground',
    angleNoun: () => 'the angle between the ladder and the ground',
  },
  {
    key: 'ramp',
    scene: 'ramp',
    ang: [8, 20],
    sides: ['opp', 'adj', 'hyp'],
    sym: SYM,
    noun: { opp: 'the rise of the ramp', adj: 'the horizontal run of the ramp', hyp: 'the length of the ramp surface' },
    range: { hyp: [3, 8, 0.5], opp: [0.8, 1.5, 0.1], adj: [3, 7.5, 0.5] },
    given: {
      hyp: (v) => `A loading ramp at a warehouse is ${v} long, measured along its sloped surface.`,
      opp: (v) => `A loading ramp at a warehouse rises ${v} from the parking lot to a loading dock.`,
      adj: (v) => `A loading ramp at a warehouse covers a horizontal distance of ${v}.`,
    },
    angle: (a) => `The ramp makes an angle of ${a} with the ground.`,
    q: { opp: () => 'How high does the ramp rise', adj: () => 'What horizontal distance does the ramp cover', hyp: () => 'How long is the sloped surface of the ramp' },
    pair: {
      'hyp-adj': (v) => `A loading ramp is ${v.hyp} long, measured along its sloped surface, and covers a horizontal distance of ${v.adj}.`,
      'hyp-opp': (v) => `A loading ramp is ${v.hyp} long, measured along its sloped surface, and rises ${v.opp} to a loading dock.`,
      'opp-adj': (v) => `A loading ramp rises ${v.opp} to a loading dock over a horizontal distance of ${v.adj}.`,
    },
    angleQ: () => 'What angle does the ramp make with the ground',
    angleNoun: () => 'the angle between the ramp and the ground',
  },
  {
    key: 'guy',
    scene: 'none',
    ang: [45, 70],
    sides: ['opp', 'adj', 'hyp'],
    sym: SYM,
    noun: { opp: 'the height where the wire is attached', adj: 'the distance from the base of the tower to the anchor', hyp: 'the length of the guy wire' },
    range: { hyp: [12, 40, 1], opp: [10, 35, 1], adj: [5, 18, 0.5] },
    given: {
      hyp: (v, w) => `${w} is installing a guy wire that is ${v} long. It runs from a radio tower down to an anchor in the ground.`,
      opp: (v, w) => `${w} is installing a guy wire that is attached to a radio tower ${v} above the ground.`,
      adj: (v, w) => `${w} is installing a guy wire for a radio tower. The wire is anchored in the ground ${v} from the base of the tower.`,
    },
    angle: (a) => `The wire makes an angle of ${a} with the ground.`,
    q: { opp: () => 'How high up the tower is the wire attached', adj: () => 'How far from the base of the tower is the anchor', hyp: () => 'How long is the guy wire' },
    pair: {
      'hyp-adj': (v) => `A guy wire ${v.hyp} long runs from a radio tower down to an anchor ${v.adj} from the base of the tower.`,
      'hyp-opp': (v) => `A guy wire ${v.hyp} long is attached to a radio tower ${v.opp} above the ground and runs straight down to an anchor.`,
      'opp-adj': (v) => `A guy wire is attached to a radio tower ${v.opp} above the ground and anchored ${v.adj} from the base of the tower.`,
    },
    angleQ: () => 'What angle does the wire make with the ground',
    angleNoun: () => 'the angle between the wire and the ground',
  },
  {
    key: 'rafter',
    scene: 'none',
    ang: [18, 40],
    sides: ['opp', 'adj', 'hyp'],
    sym: SYM,
    noun: { opp: 'the rise of the roof', adj: 'the horizontal run of the rafter', hyp: 'the length of the rafter' },
    range: { hyp: [3, 7, 0.1], opp: [1.2, 3, 0.1], adj: [3, 6, 0.1] },
    given: {
      hyp: (v, w) => `${w}, a carpentry apprentice, cuts a roof rafter ${v} long, from the top of the wall to the peak.`,
      opp: (v) => `A roof rises ${v} from the top of the wall to the peak.`,
      adj: (v) => `A roof rafter covers a horizontal run of ${v}, from the top of the wall to the point directly under the peak.`,
    },
    angle: (a) => `The rafter makes an angle of ${a} with the horizontal.`,
    q: { opp: () => 'How high does the roof rise from the top of the wall to the peak', adj: () => 'What horizontal run does the rafter cover', hyp: () => 'How long is the rafter' },
    pair: {
      'hyp-adj': (v) => `A roof rafter is ${v.hyp} long and covers a horizontal run of ${v.adj}.`,
      'hyp-opp': (v) => `A roof rafter is ${v.hyp} long, and the roof rises ${v.opp} from the top of the wall to the peak.`,
      'opp-adj': (v) => `A roof rises ${v.opp} from the top of the wall to the peak over a horizontal run of ${v.adj}.`,
    },
    angleQ: () => 'What angle does the rafter make with the horizontal',
    angleNoun: () => 'the angle between the rafter and the horizontal',
  },
  {
    key: 'auger',
    scene: 'none',
    ang: [25, 40],
    sides: ['opp', 'adj', 'hyp'],
    sym: SYM,
    noun: { opp: 'the height the auger reaches', adj: 'the distance from the bottom of the auger to the bin', hyp: 'the length of the auger' },
    range: { hyp: [10, 20, 1], opp: [5, 10, 0.5], adj: [8, 16, 0.5] },
    given: {
      hyp: (v, w) => `On ${w}'s farm, a grain auger ${v} long reaches up to the opening at the top of a grain bin.`,
      opp: (v, w) => `On ${w}'s farm, a grain auger must reach the opening at the top of a grain bin, ${v} above the ground.`,
      adj: (v, w) => `On ${w}'s farm, the bottom of a grain auger sits ${v} from the wall of a grain bin. The top of the auger rests at the opening on top of the bin.`,
    },
    angle: (a) => `The auger makes an angle of ${a} with the ground.`,
    q: { opp: () => 'How high does the auger reach', adj: () => 'How far from the bin is the bottom of the auger', hyp: () => 'How long must the auger be' },
    pair: {
      'hyp-adj': (v, w) => `On ${w}'s farm, a grain auger ${v.hyp} long reaches the top of a grain bin. Its bottom end sits ${v.adj} from the wall of the bin.`,
      'hyp-opp': (v, w) => `On ${w}'s farm, a grain auger ${v.hyp} long reaches the opening at the top of a grain bin, ${v.opp} above the ground.`,
      'opp-adj': (v, w) => `On ${w}'s farm, a grain auger reaches the opening at the top of a grain bin, ${v.opp} above the ground. Its bottom end sits ${v.adj} from the wall of the bin.`,
    },
    angleQ: () => 'What angle does the auger make with the ground',
    angleNoun: () => 'the angle between the auger and the ground',
  },
  {
    key: 'kite',
    scene: 'kite',
    ang: [30, 65],
    sides: ['opp', 'adj', 'hyp'],
    sym: SYM,
    noun: { opp: 'the height of the kite', adj: 'the distance along the ground to the point below the kite', hyp: 'the length of the string' },
    range: { hyp: [30, 80, 5], opp: [20, 60, 1], adj: [15, 50, 1] },
    given: {
      hyp: (v, w) => `${w} flies a kite on a string ${v} long.`,
      opp: (v, w) => `${w}'s kite is flying ${v} above the ground.`,
      adj: (v, w) => `${w} is flying a kite and stands ${v} from the point on the ground directly below it.`,
    },
    angle: (a) => `The string is straight and makes an angle of ${a} with the ground. (Ignore the height of the person's hands.)`,
    q: { opp: () => 'How high is the kite', adj: (w) => `How far is ${w} from the point directly below the kite`, hyp: () => 'How long is the string' },
    pair: {
      'hyp-adj': (v, w) => `${w} flies a kite on a straight string ${v.hyp} long and stands ${v.adj} from the point on the ground directly below the kite. (Ignore the height of the person's hands.)`,
      'hyp-opp': (v, w) => `${w} flies a kite on a straight string ${v.hyp} long. The kite is ${v.opp} above the ground. (Ignore the height of the person's hands.)`,
      'opp-adj': (v, w) => `${w}'s kite is ${v.opp} above the ground, and ${w} stands ${v.adj} from the point on the ground directly below it. The string is straight. (Ignore the height of the person's hands.)`,
    },
    angleQ: () => 'What angle does the string make with the ground',
    angleNoun: () => 'the angle between the string and the ground',
  },
  {
    key: 'tree',
    scene: 'tree',
    ang: [25, 50],
    sides: ['opp', 'adj'],
    sym: SYM,
    noun: { opp: 'the height of the tree', adj: 'the distance along the ground to the tree' },
    range: { opp: [8, 30, 0.5], adj: [10, 30, 1] },
    given: {
      adj: (v, w) => `${w}, a forestry technician, stands ${v} from the base of a spruce tree on level ground.`,
      opp: (v) => `A spruce tree on level ground is ${v} tall.`,
    },
    angle: (a, w, known) =>
      known === 'adj' ? `The angle of elevation from the ground where ${w} stands to the top of the tree is ${a}.` : `From a point on the ground, ${w}, a forestry technician, measures the angle of elevation to the top of the tree as ${a}.`,
    q: { opp: () => 'How tall is the tree', adj: (w) => `How far is ${w} from the base of the tree` },
    pair: { 'opp-adj': (v, w) => `A spruce tree on level ground is ${v.opp} tall. ${w}, a forestry technician, stands ${v.adj} from its base.` },
    angleQ: (w) => `What is the angle of elevation from the ground where ${w} stands to the top of the tree`,
    angleNoun: () => 'the angle of elevation',
  },
  {
    key: 'shadow',
    scene: 'none',
    ang: [25, 65],
    sides: ['opp', 'adj'],
    sym: { opp: 'h', adj: 's', hyp: 'L' },
    noun: { opp: 'the height of the light standard', adj: 'the length of the shadow' },
    range: { opp: [6, 15, 0.5], adj: [4, 25, 0.5] },
    given: {
      opp: (v) => `A light standard in a parking lot is ${v} tall.`,
      adj: (v) => `A light standard in a parking lot casts a shadow ${v} long on level ground.`,
    },
    angle: (a) => `The sun's rays make an angle of ${a} with the ground.`,
    q: { opp: () => 'How tall is the light standard', adj: () => 'How long is its shadow' },
    pair: { 'opp-adj': (v) => `A light standard ${v.opp} tall casts a shadow ${v.adj} long on level ground.` },
    angleQ: () => "What angle do the sun's rays make with the ground",
    angleNoun: () => "the angle between the sun's rays and the ground",
  },
  {
    key: 'elevator',
    scene: 'building',
    ang: [20, 55],
    sides: ['opp', 'adj'],
    depression: true,
    sym: SYM,
    noun: { opp: 'the height of the grain elevator', adj: 'the distance from the truck to the base of the elevator' },
    range: { opp: [20, 40, 1], adj: [15, 80, 1] },
    given: {
      opp: (v, w) => `${w} is working at the top of a grain elevator, ${v} above the ground.`,
      adj: (v, w) => `A grain truck is parked ${v} from the base of a grain elevator. ${w} is working at the top of the elevator.`,
    },
    angle: (a, w, known) =>
      known === 'adj' ? `From the top, ${w} sees the truck at an angle of depression of ${a}.` : `From there, ${w} sees a grain truck on the ground at an angle of depression of ${a}.`,
    q: { opp: () => 'How tall is the grain elevator', adj: () => 'How far is the truck from the base of the elevator' },
    pair: { 'opp-adj': (v, w) => `${w} is working at the top of a grain elevator, ${v.opp} above the ground. A grain truck is parked ${v.adj} from the base of the elevator.` },
    angleQ: (w) => `What is the angle of depression from ${w} to the truck`,
    angleNoun: () => 'the angle of depression',
  },
];

const byKey = (k: string) => SCENARIOS.find((s) => s.key === k)!;

/** True when every side is a realistic size for the scenario. */
function fits(sc: Scenario, s: Record<SideKey, number>): boolean {
  return (['opp', 'adj', 'hyp'] as SideKey[]).every((k) => {
    const r = sc.range[k];
    return !r || (s[k] >= 0.5 * r[0] && s[k] <= 1.6 * r[1]);
  });
}

const DEPRESSION_NOTE = 'The angle of depression is measured down from the horizontal at the top. That horizontal line is parallel to the ground, so the angle at the truck has the same size (alternate angles).';

/** Find a side in a word problem. */
function scenarioSide(rng: Rng, sc: Scenario, known: SideKey, unknown: SideKey, friendly: boolean): GenOutput {
  const who = rng.pick(PEOPLE);
  const fn = fnFor(known, unknown);
  const top = topOf(fn) === unknown;
  const v = retry(
    () => {
      const ang = friendly ? pickFive(rng, sc.ang) : rng.int(sc.ang[0], sc.ang[1]);
      const k = pickVal(rng, sc.range[known]!, friendly);
      return { ang, k, s: triFrom(known, k, ang), ...sideValue(fn, ang, k, top) };
    },
    (v) => v.ok && fits(sc, v.s),
  );
  const { ang, k, s, x } = v;
  const sym = sc.sym[unknown];
  const a = `$${deg(ang)}$`;
  const sideLabels = labels([
    [UPRIGHT_KEY[known], lbl(k, 'm')],
    [UPRIGHT_KEY[unknown], sym],
  ]);
  return {
    prompt: `${sc.given[known]!(qty(k, 'm'), who)} ${sc.angle(a, who, known)} ${sc.q[unknown]!(who)}, ${nearest('m')}?`,
    figure: fig(uprightTri(rng), s.adj, s.opp, sideLabels, { a: deg(ang) }, sc.scene),
    parts: [numPart(x, { decimals: 1, suffix: 'm', label: `$${sym} =$` })],
    hints: [
      sc.depression
        ? `The angle at the truck equals the angle of depression (alternate angles). Relative to that angle, which side do you know and which side do you want?`
        : `Relative to the $${deg(ang)}$ angle, which side do you know and which side do you want: opposite, adjacent or hypotenuse?`,
      `The ${SIDE_WORD[known]} and the ${SIDE_WORD[unknown]} go together in the ${FN_WORD[fn]} ratio (${MEMORY[fn]}). ${methodHint(fn, top, fmt(k), ang, sym)}`,
    ],
    solution: [
      ...(sc.depression ? [DEPRESSION_NOTE] : []),
      `Relative to the $${deg(ang)}$ angle, ${sc.noun[known]} ($${fmt(k)}$ m) is the ${SIDE_WORD[known]} and ${sc.noun[unknown]} ($${sym}$) is the ${SIDE_WORD[unknown]}. Use ${FN_WORD[fn]}.`,
      ...sideSteps(fn, ang, k, top, sym, x, 'm'),
      `${cap(sc.noun[unknown]!)} is about $${fmtFixed(x, 1)}\\ \\text{m}$.`,
    ],
    calculator: true,
  };
}

/** Values for a word problem that gives two sides and asks for the angle. */
function scenarioPairValues(rng: Rng, sc: Scenario, pair: [SideKey, SideKey], dp: number, friendly: boolean) {
  const fn = fnFor(pair[0], pair[1]);
  return retry(
    () => {
      const ang0 = rng.int(sc.ang[0], sc.ang[1]);
      const first = rng.pick(pair);
      const other = first === pair[0] ? pair[1] : pair[0];
      const k = pickVal(rng, sc.range[first]!, friendly);
      const s0 = triFrom(first, k, ang0);
      const [lo, , step] = sc.range[other]!;
      const vo = roundStep(s0[other], friendly && lo >= 2 ? Math.max(1, step) : step);
      const vals: Partial<Record<SideKey, number>> = { [first]: k, [other]: vo };
      const topV = vals[topOf(fn)]!;
      const botV = vals[bottomOf(fn)]!;
      const ratio = topV / botV;
      const valid = vo > 0 && (fn === 'tan' || ratio < 0.99);
      const ang = valid ? inv(fn, ratio) : ang0;
      return { vals, topV, botV, ang, valid: valid && fits(sc, triFrom(first, k, ang)) };
    },
    (v) => v.valid && clear(v.ang, dp) && v.ang >= sc.ang[0] - 3 && v.ang <= sc.ang[1] + 3,
  );
}

/** Find the angle in a word problem from two sides. */
function scenarioAngle(rng: Rng, sc: Scenario, pair: [SideKey, SideKey], dp: number, friendly: boolean): GenOutput {
  const who = rng.pick(PEOPLE);
  const fn = fnFor(pair[0], pair[1]);
  const { vals, topV, botV, ang } = scenarioPairValues(rng, sc, pair, dp, friendly);
  const words: Words = {};
  const entries: Array<[SideLabelKey, string]> = [];
  for (const k of pair) {
    words[k] = qty(vals[k]!, 'm');
    entries.push([UPRIGHT_KEY[k], lbl(vals[k]!, 'm')]);
  }
  const s = triFrom(pair[0], vals[pair[0]]!, ang);
  const top = topOf(fn);
  const bot = bottomOf(fn);
  const frac = `\\dfrac{${fmt(topV)}}{${fmt(botV)}}`;
  return {
    prompt: `${sc.pair[pairKey(pair[0], pair[1])]!(words, who)} ${sc.angleQ(who)}, ${angleRound(dp)}?`,
    figure: fig(uprightTri(rng), s.adj, s.opp, labels(entries), { a: '\\theta' }, sc.scene),
    parts: [numPart(ang, { decimals: dp, suffix: '°', label: '$\\theta =$' })],
    hints: [
      sc.depression
        ? 'The angle at the truck equals the angle of depression (alternate angles). Name the two known sides relative to that angle.'
        : `Name the two known sides relative to $\\theta$: opposite, adjacent or hypotenuse?`,
      `You know the ${SIDE_WORD[top]} and the ${SIDE_WORD[bot]}, so use ${FN_WORD[fn]} (${MEMORY[fn]}) and the inverse key: $\\theta = \\${fn}^{-1}\\left(${RATIO[fn]}\\right)$.`,
    ],
    solution: [
      ...(sc.depression ? [DEPRESSION_NOTE + ' So find the angle $\\theta$ at the truck.'] : []),
      `Relative to $\\theta$, ${sc.noun[top]} ($${fmt(topV)}$ m) is the ${SIDE_WORD[top]} and ${sc.noun[bot]} ($${fmt(botV)}$ m) is the ${SIDE_WORD[bot]}. Use ${FN_WORD[fn]}.`,
      `$\\${fn}\\theta = ${frac}$`,
      `$\\theta = \\${fn}^{-1}\\left(${frac}\\right) \\approx ${fmtFixed(ang, dp)}^\\circ$`,
      `${cap(sc.angleNoun(who))} is about $${fmtFixed(ang, dp)}^\\circ$.`,
    ],
    calculator: true,
  };
}

const SIDE_PAIRS: Array<[SideKey, SideKey]> = [
  ['adj', 'opp'],
  ['opp', 'adj'],
  ['hyp', 'opp'],
  ['hyp', 'adj'],
  ['opp', 'hyp'],
  ['adj', 'hyp'],
];

/** A random (scenario, known, unknown) choice satisfying a filter. */
function pickScenarioPair(rng: Rng, ok: (sc: Scenario, known: SideKey, unknown: SideKey) => boolean): [Scenario, SideKey, SideKey] {
  const options: Array<[Scenario, SideKey, SideKey]> = [];
  for (const sc of SCENARIOS) for (const [k, u] of SIDE_PAIRS) if (sc.sides.includes(k) && sc.sides.includes(u) && ok(sc, k, u)) options.push([sc, k, u]);
  return rng.pick(options);
}

// ---------------------------------------------------------------------------
// Plain-triangle generators shared by the side and angle skills
// ---------------------------------------------------------------------------

function plainSide(rng: Rng, d: Difficulty, pairs: Array<[SideKey, SideKey]>): GenOutput {
  const t = makeTri(rng, d);
  const at = rng.pick(['a', 'b'] as const);
  const r = rel(t, at);
  const unit = d === 1 ? rng.pick(['cm', 'm']) : rng.pick(['cm', 'm', 'ft']);
  const v = retry(
    () => {
      const [known, unknown] = rng.pick(pairs);
      const fn = fnFor(known, unknown);
      const top = topOf(fn) === unknown;
      const ang = d === 1 ? rng.pick(FRIENDLY_ANGLES) : rng.int(15, 75);
      const k = d === 1 ? rng.int(4, 25) : rng.chance(0.3) ? rng.int(25, 150) / 10 : rng.int(5, 40);
      return { known, unknown, fn, top, ang, k, ...sideValue(fn, ang, k, top) };
    },
    (v) => v.ok,
  );
  const { known, unknown, fn, top, ang, k, x } = v;
  const [legA, legB] = drawLegs(at, triFrom(known, k, ang));
  const kText = `$${fmt(k)}$ ${unit}`;
  return {
    prompt: `Find the length of side $x$, ${nearest(unit)}.`,
    figure: fig(t, legA, legB, labels([[r.key[known], lbl(k, unit)], [r.key[unknown], 'x']]), angleAt(at, deg(ang))),
    parts: [numPart(x, { decimals: 1, suffix: unit, label: '$x =$' })],
    hints: [
      `Label the sides from the $${deg(ang)}$ angle. Is $x$ the opposite side, the adjacent side or the hypotenuse? What about the ${kText} side?`,
      `$x$ is the ${SIDE_WORD[unknown]} and ${kText} is the ${SIDE_WORD[known]}, so use ${FN_WORD[fn]} (${MEMORY[fn]}). ${methodHint(fn, top, fmt(k), ang)}`,
    ],
    solution: [
      `Relative to the $${deg(ang)}$ angle at $${r.vtx}$, $x$ is the ${SIDE_WORD[unknown]} and the ${kText} side is the ${SIDE_WORD[known]}. Use ${FN_WORD[fn]}: $\\${fn}\\theta = ${RATIO[fn]}$.`,
      ...sideSteps(fn, ang, k, top, 'x', x, unit),
      `Side $x$ is about $${fmtFixed(x, 1)}\\ \\text{${unit}}$ long.`,
    ],
    calculator: true,
  };
}

function plainAngle(rng: Rng, d: Difficulty, kind: 'tan' | 'sincos'): GenOutput {
  const t = makeTri(rng, d);
  const at = rng.pick(['a', 'b'] as const);
  const r = rel(t, at);
  const unit = d === 1 ? rng.pick(['cm', 'm']) : rng.pick(['cm', 'm', 'ft', 'in']);
  const dp = d === 1 ? 0 : rng.pick([0, 1]);
  const decimal = d >= 2 && rng.chance(0.4);
  const v = retry(
    () => {
      if (kind === 'tan') {
        const side = () => (decimal ? rng.int(20, 180) / 10 : rng.int(3, d === 1 ? 20 : 30));
        const opp = side();
        const adj = side();
        return { fn: 'tan' as Fn, vals: { opp, adj } as Partial<Record<SideKey, number>>, topV: opp, botV: adj, ang: atanD(opp / adj), ok: opp !== adj };
      }
      const fn: Fn = rng.pick(['sin', 'cos']);
      const hyp = decimal ? rng.int(80, 300) / 10 : rng.int(8, d === 1 ? 30 : 40);
      const leg = decimal ? roundStep(hyp * rng.float(0.2, 0.95, 3), 0.1) : rng.int(Math.ceil(hyp * 0.2), Math.floor(hyp * 0.95));
      const vals: Partial<Record<SideKey, number>> = { hyp, [topOf(fn)]: leg };
      return { fn, vals, topV: leg, botV: hyp, ang: inv(fn, Math.min(leg / hyp, 1)), ok: leg > 0 && leg < hyp };
    },
    (v) => v.ok && clear(v.ang, dp),
  );
  const { fn, vals, topV, botV, ang } = v;
  const top = topOf(fn);
  const bot = bottomOf(fn);
  const s = triFrom(bot, botV, ang);
  const [legA, legB] = drawLegs(at, s);
  const name = d === 1 ? '\\theta' : `\\angle ${r.vtx}`;
  const frac = `\\dfrac{${fmt(topV)}}{${fmt(botV)}}`;
  const entries: Array<[SideLabelKey, string]> = (Object.keys(vals) as SideKey[]).map((k) => [r.key[k], lbl(vals[k]!, unit)]);
  return {
    prompt: `Find the measure of $${name}$, ${angleRound(dp)}.`,
    figure: fig(t, legA, legB, labels(entries), angleAt(at, d === 1 ? '\\theta' : '?')),
    parts: [numPart(ang, { decimals: dp, suffix: '°', label: `$${name} =$` })],
    hints: [
      `Relative to $${name}$, name the two sides you know: opposite, adjacent or hypotenuse?`,
      `You know the ${SIDE_WORD[top]} and the ${SIDE_WORD[bot]}, so use ${FN_WORD[fn]} (${MEMORY[fn]}). Then use the inverse key, $\\${fn}^{-1}$, in degree mode.`,
    ],
    solution: [
      `Relative to $${name}$, the $${fmt(topV)}$ ${unit} side is the ${SIDE_WORD[top]} and the $${fmt(botV)}$ ${unit} side is the ${SIDE_WORD[bot]}. Use ${FN_WORD[fn]}.`,
      `$\\${fn} ${d === 1 ? '\\theta' : r.vtx} = ${frac}$`,
      `$${name} = \\${fn}^{-1}\\left(${frac}\\right) \\approx ${fmtFixed(ang, dp)}^\\circ$`,
      `So $${name}$ is about $${fmtFixed(ang, dp)}^\\circ$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// Lesson 8.1 — The tangent ratio
// ---------------------------------------------------------------------------

interface LabelScene {
  scene: Scene;
  legs: [number, number];
  intro: (w: string) => string;
  angle: Partial<Record<Vtx, (w: string) => string>>;
  side: Record<SideLabelKey, (w: string) => string>;
}

const LABEL_SCENES: LabelScene[] = [
  {
    scene: 'ladder',
    legs: [1.7, 6],
    intro: (w) => `${w} leans a ladder against a wall.`,
    angle: { a: () => 'the angle between the ladder and the ground', b: () => 'the angle between the ladder and the wall' },
    side: { ra: () => 'the distance from the foot of the ladder to the wall', rb: () => 'the height the ladder reaches up the wall', ab: () => 'the ladder itself' },
  },
  {
    scene: 'ramp',
    legs: [7, 1.4],
    intro: () => 'A loading ramp runs from a parking lot up to a loading dock.',
    angle: { a: () => 'the angle between the ramp and the ground' },
    side: { ra: () => 'the horizontal run along the ground', rb: () => 'the height of the loading dock (the rise)', ab: () => 'the sloped surface of the ramp' },
  },
  {
    scene: 'tree',
    legs: [9, 7],
    intro: (w) => `${w}, a forestry technician, stands on level ground some distance from a tall spruce tree.`,
    angle: { a: (w) => `the angle of elevation from the ground where ${w} stands to the top of the tree`, b: () => 'the angle at the top of the tree, between the trunk and the line of sight' },
    side: { ra: (w) => `the distance along the ground from ${w} to the tree`, rb: () => 'the height of the tree', ab: (w) => `the line of sight from where ${w} stands to the top of the tree` },
  },
  {
    scene: 'kite',
    legs: [8, 7],
    intro: (w) => `${w} flies a kite on a long, straight string.`,
    angle: { a: () => 'the angle between the string and the ground' },
    side: { ra: (w) => `the distance along the ground from ${w} to the point directly below the kite`, rb: () => 'the height of the kite', ab: () => 'the kite string' },
  },
];

const LABEL_HINTS = [
  'Start with the hypotenuse: it is across from the right angle, and it is always the longest side.',
  'The opposite side does not touch the angle. The adjacent side touches the angle and is not the hypotenuse.',
];

const labelSides = skill({
  id: 'm103-label-sides',
  name: 'Opposite, adjacent and hypotenuse',
  description: 'Name the hypotenuse and the sides opposite and adjacent to a marked acute angle, in any orientation or in a real-world diagram.',
  outcomes: ['G4'],
  lessonId: 'm103-8-1',
  format: 'mc',
  gen(rng, d) {
    const mode = d === 1 ? rng.pick(['word', 'segment'] as const) : d === 2 ? rng.pick(['segment', 'letters'] as const) : rng.pick(['vertex', 'scene'] as const);
    const which: SideKey = mode === 'vertex' ? rng.pick(['opp', 'adj'] as const) : rng.pick(['opp', 'adj', 'hyp'] as const);
    const whichWord = which === 'opp' ? 'opposite side' : which === 'adj' ? 'adjacent side' : 'hypotenuse';

    if (mode === 'scene') {
      const sc = rng.pick(LABEL_SCENES);
      const who = rng.pick(PEOPLE);
      const ats = (Object.keys(sc.angle) as Vtx[]);
      const at = rng.pick(ats);
      const t = uprightTri(rng);
      const r = rel(t, at);
      const desc = (k: SideKey) => sc.side[r.key[k]](who);
      const ang = sc.angle[at]!(who);
      return {
        prompt: `${sc.intro(who)} In the diagram, $\\theta$ is ${ang}. Relative to $\\theta$, which part of the diagram is the **${whichWord}**?`,
        figure: fig(t, sc.legs[0], sc.legs[1], {}, angleAt(at, '\\theta'), sc.scene),
        parts: [{ answer: mc(rng, cap(desc(which)), (['opp', 'adj', 'hyp'] as SideKey[]).filter((k) => k !== which).map((k) => cap(desc(k)))) }],
        hints: LABEL_HINTS,
        solution: [
          `The hypotenuse is across from the right angle: ${desc('hyp')}.`,
          `The adjacent side touches $\\theta$ and is not the hypotenuse: ${desc('adj')}.`,
          `The opposite side is across from $\\theta$ and does not touch it: ${desc('opp')}.`,
          `So the ${whichWord} is ${desc(which)}.`,
        ],
      };
    }

    const t = makeTri(rng, d);
    const at = rng.pick(['a', 'b'] as const);
    const r = rel(t, at);
    const [legA, legB] = rng.pick([
      [4, 3],
      [3, 4],
      [8, 6],
      [6, 8],
      [12, 5],
      [5, 12],
      [10, 7],
      [7, 10],
    ] as Array<[number, number]>);

    if (mode === 'word') {
      const letter = rng.pick(['k', 'm', 'p', 'w', 'y']);
      return {
        prompt: `Relative to the angle $\\theta$, what is side $${letter}$ called?`,
        figure: fig(t, legA, legB, labels([[r.key[which], letter]]), angleAt(at, '\\theta')),
        parts: [{ answer: fixedChoice(['the opposite side', 'the adjacent side', 'the hypotenuse'], ['opp', 'adj', 'hyp'].indexOf(which)) }],
        hints: LABEL_HINTS,
        solution: [
          which === 'hyp'
            ? `Side $${letter}$ is across from the right angle at $${t.R}$.`
            : `Side $${letter}$ is not across from the right angle at $${t.R}$, so it is not the hypotenuse.`,
          which === 'hyp' ? 'The side across from the right angle is always the hypotenuse.' : which === 'opp' ? `Side $${letter}$ does not touch $\\theta$, so it is across from $\\theta$.` : `Side $${letter}$ touches $\\theta$ (at vertex $${r.vtx}$).`,
          `So side $${letter}$ is the ${whichWord}.`,
        ],
      };
    }

    if (mode === 'letters') {
      const [l1, l2, l3] = rng.sample(['k', 'm', 'n', 'p', 'q', 'r', 's', 'w', 'y'], 3);
      const let_: Record<SideKey, string> = { opp: l1, adj: l2, hyp: l3 };
      const question = which === 'hyp' ? 'Which side is the **hypotenuse**?' : which === 'opp' ? 'Which side is **opposite** the angle $\\theta$?' : 'Which side is **adjacent** to the angle $\\theta$?';
      return {
        prompt: question,
        figure: fig(t, legA, legB, labels([[r.key.opp, l1], [r.key.adj, l2], [r.key.hyp, l3]]), angleAt(at, '\\theta')),
        parts: [{ answer: mc(rng, `$${let_[which]}$`, [`$${l1}$`, `$${l2}$`, `$${l3}$`]) }],
        hints: LABEL_HINTS,
        solution: [
          `The hypotenuse is across from the right angle at $${t.R}$: side $${l3}$.`,
          `Side $${l2}$ touches $\\theta$ and is not the hypotenuse, so it is the adjacent side.`,
          `Side $${l1}$ does not touch $\\theta$, so it is the opposite side.`,
          `So the ${whichWord} is side $${let_[which]}$.`,
        ],
      };
    }

    // segment (d1, d2) or vertex (d3)
    const named = mode === 'vertex';
    const angName = named ? `\\angle ${r.vtx}` : '\\theta';
    const question =
      which === 'hyp'
        ? `In right triangle $${t.A}${t.B}${t.R}$, which side is the **hypotenuse**?`
        : named
          ? `In right triangle $${t.A}${t.B}${t.R}$, $\\angle ${t.R} = 90^\\circ$. Which side is **${which === 'opp' ? 'opposite' : 'adjacent to'}** $\\angle ${r.vtx}$?`
          : `In right triangle $${t.A}${t.B}${t.R}$, which side is **${which === 'opp' ? 'opposite' : 'adjacent to'}** the angle $\\theta$?`;
    return {
      prompt: question,
      figure: fig(t, legA, legB, {}, named ? {} : angleAt(at, '\\theta')),
      parts: [{ answer: mc(rng, `$${r.seg[which]}$`, [`$${r.seg.opp}$`, `$${r.seg.adj}$`, `$${r.seg.hyp}$`]) }],
      hints: named ? [`Find vertex $${r.vtx}$ first. The angle $${angName}$ is the corner at that vertex.`, LABEL_HINTS[1]] : LABEL_HINTS,
      solution: [
        `The hypotenuse is across from the right angle at $${t.R}$: side $${r.seg.hyp}$.`,
        `$${angName}$ is at vertex $${r.vtx}$. The other side that touches $${r.vtx}$ is the adjacent side: $${r.seg.adj}$.`,
        `The side that does not touch $${r.vtx}$ is the opposite side: $${r.seg.opp}$.`,
        `So the ${whichWord} is side $${r.seg[which]}$.`,
      ],
    };
  },
});

/** Lean-to shed: how much taller the back wall is, then add the front wall. */
function shedProblem(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const front = rng.pick([2.1, 2.2, 2.4, 2.5]);
      const w = rng.pick([2.4, 3, 3.2, 3.6, 4, 4.2, 4.8]);
      const ang = rng.int(10, 25);
      const rise = w * tanD(ang);
      return { front, w, ang, rise, back: front + rise };
    },
    (v) => clear(v.back, 1, 0.2),
  );
  const { front, w, ang, rise, back } = v;
  return {
    prompt: `${who} is building a lean-to shed. The roof slopes up from the front wall to the back wall at an angle of $${deg(ang)}$ to the horizontal. The shed is ${qty(w, 'm')} deep from front to back (measured horizontally), and the front wall is ${qty(front, 'm')} tall. How tall must the back wall be, ${nearest('m')}?`,
    figure: fig(uprightTri(rng), w, rise, labels([['ra', lbl(w, 'm')], ['rb', 'x']]), { a: deg(ang) }, 'none'),
    parts: [numPart(back, { decimals: 1, suffix: 'm', label: 'Back wall' })],
    hints: [
      'First find $x$, how much higher the back of the roof is than the front. Then add the height of the front wall.',
      `Relative to the $${deg(ang)}$ angle, $x$ is opposite and the ${qty(w, 'm')} depth is adjacent: $x = ${fmt(w)}\\tan ${deg(ang)}$.`,
    ],
    solution: [
      `In the triangle, the depth (${qty(w, 'm')}) is adjacent to the $${deg(ang)}$ angle and the extra height $x$ is opposite. Use tangent.`,
      `$\\tan ${deg(ang)} = \\dfrac{x}{${fmt(w)}}$, so $x = ${fmt(w)}\\tan ${deg(ang)} \\approx ${fmtFixed(rise, 2)}\\ \\text{m}$`,
      `Back wall $= ${fmt(front)} + ${fmtFixed(rise, 2)} = ${fmtFixed(front + rise, 2)}\\ \\text{m}$`,
      `The back wall must be about $${fmtFixed(back, 1)}\\ \\text{m}$ tall.`,
    ],
    calculator: true,
  };
}

/** Width of a river measured from one bank. */
function riverProblem(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const dist = rng.int(15, 60);
      const ang = rng.int(30, 70);
      return { dist, ang, ...sideValue('tan', ang, dist, true) };
    },
    (v) => v.ok,
  );
  const { dist, ang, x } = v;
  const t: Tri = { R: 'P', A: 'S', B: 'T', rotate: 0, mirror: rng.chance(0.5) };
  return {
    prompt: `To measure the width of a river without crossing it, ${who} stands at point $P$ on one bank, directly across from a tree $T$ on the far bank. ${who} walks ${qty(dist, 'm')} along the bank to point $S$, so that $\\angle P = 90^\\circ$. At $S$, the angle between the bank and the line of sight to the tree is $${deg(ang)}$. How wide is the river, ${nearest('m')}?`,
    figure: fig(t, dist, x, labels([['ra', lbl(dist, 'm')], ['rb', 'w']]), { a: deg(ang) }),
    parts: [numPart(x, { decimals: 1, suffix: 'm', label: '$w =$' })],
    hints: [
      `The width $w$ is across from the $${deg(ang)}$ angle at $S$, and the ${qty(dist, 'm')} walk touches that angle.`,
      `Use tangent: $\\tan ${deg(ang)} = \\dfrac{w}{${dist}}$, so multiply both sides by $${dist}$.`,
    ],
    solution: [
      `Relative to the $${deg(ang)}$ angle at $S$, the width $w$ is the opposite side and $PS = ${dist}$ m is the adjacent side. Use tangent.`,
      ...sideSteps('tan', ang, dist, true, 'w', x, 'm'),
      `The river is about $${fmtFixed(x, 1)}\\ \\text{m}$ wide.`,
    ],
    calculator: true,
  };
}

const tanSide = skill({
  id: 'm103-tan-side',
  name: 'Finding a side with the tangent ratio',
  description: 'Use the tangent ratio to find the opposite or adjacent side when an acute angle and the other leg are known.',
  outcomes: ['G4'],
  lessonId: 'm103-8-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return plainSide(rng, 1, [['adj', 'opp']]);
    if (d === 2) return plainSide(rng, 2, [['adj', 'opp'], ['opp', 'adj']]);
    const r = rng.next();
    if (r < 0.2) return shedProblem(rng);
    if (r < 0.35) return riverProblem(rng);
    const [sc, known, unknown] = pickScenarioPair(rng, (sc, k, u) => !sc.depression && fnFor(k, u) === 'tan');
    return scenarioSide(rng, sc, known, unknown, false);
  },
});

/** Stairs: angle from the rise and run of one step. */
function stairsProblem(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const rise = rng.int(15, 20);
      const run = rng.int(23, 30);
      return { rise, run, ang: atanD(rise / run) };
    },
    (v) => clear(v.ang, 1),
  );
  const { rise, run, ang } = v;
  return {
    prompt: `${who} is a carpenter building a set of stairs. Each step has a rise of ${qty(rise, 'cm')} and a run (tread depth) of ${qty(run, 'cm')}. What angle does the staircase make with the floor, ${angleRound(1)}?`,
    figure: fig(uprightTri(rng), run, rise, labels([['ra', lbl(run, 'cm')], ['rb', lbl(rise, 'cm')]]), { a: '\\theta' }, 'none'),
    parts: [numPart(ang, { decimals: 1, suffix: '°', label: '$\\theta =$' })],
    hints: ['One step makes a small right triangle. The rise is opposite $\\theta$ and the run is adjacent.', `$\\theta = \\tan^{-1}\\left(\\dfrac{\\text{rise}}{\\text{run}}\\right)$`],
    solution: [
      `The rise ($${rise}$ cm) is opposite $\\theta$ and the run ($${run}$ cm) is adjacent. Use tangent.`,
      `$\\tan\\theta = \\dfrac{${rise}}{${run}}$`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${rise}}{${run}}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      `The staircase makes an angle of about $${fmtFixed(ang, 1)}^\\circ$ with the floor.`,
    ],
    calculator: true,
  };
}

/** Highway grade as an angle. */
function gradeProblem(rng: Rng): GenOutput {
  const g = retry(
    () => rng.int(3, 11),
    (g) => clear(atanD(g / 100), 1),
  );
  const ang = atanD(g / 100);
  return {
    prompt: `A highway sign on a mountain pass warns truck drivers of ${g === 8 || g === 11 ? 'an' : 'a'} $${g}\\%$ grade. This means the road drops ${qty(g, 'm')} for every ${qty(100, 'm')} of horizontal distance. What angle does the road make with the horizontal, ${angleRound(1)}?`,
    figure: fig(uprightTri(rng), 100, g, labels([['ra', '100\\text{ m}'], ['rb', lbl(g, 'm')]]), { a: '\\theta' }, 'none'),
    parts: [numPart(ang, { decimals: 1, suffix: '°', label: '$\\theta =$' })],
    hints: [`Draw a right triangle with a vertical side of ${qty(g, 'm')} and a horizontal side of ${qty(100, 'm')}.`, `The ${g} m drop is opposite $\\theta$ and the 100 m is adjacent: use $\\tan^{-1}$.`],
    solution: [
      `The drop ($${g}$ m) is opposite $\\theta$ and the horizontal distance ($100$ m) is adjacent. Use tangent.`,
      `$\\tan\\theta = \\dfrac{${g}}{100}$`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${g}}{100}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      `The road makes an angle of about $${fmtFixed(ang, 1)}^\\circ$ with the horizontal.`,
    ],
    calculator: true,
  };
}

const tanAngle = skill({
  id: 'm103-tan-angle',
  name: 'Finding an angle with the tangent ratio',
  description: 'Use the inverse tangent to find an acute angle when the opposite and adjacent sides are known.',
  outcomes: ['G4'],
  lessonId: 'm103-8-1',
  calculator: true,
  gen(rng, d) {
    if (d < 3) return plainAngle(rng, d, 'tan');
    const r = rng.next();
    if (r < 0.25) return stairsProblem(rng);
    if (r < 0.4) return gradeProblem(rng);
    const sc = rng.pick(SCENARIOS.filter((s) => !s.depression));
    return scenarioAngle(rng, sc, ['opp', 'adj'], 1, false);
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — The sine and cosine ratios
// ---------------------------------------------------------------------------

/** Rafter with an overhang: L = run / cos θ, then add the overhang. */
function rafterOverhang(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const run = rng.int(30, 60) / 10;
      const ang = rng.int(18, 40);
      const over = rng.pick([0.3, 0.4, 0.45, 0.5, 0.6]);
      const len = run / cosD(ang);
      return { run, ang, over, len, total: len + over };
    },
    (v) => clear(v.total, 1, 0.2),
  );
  const { run, ang, over, len, total } = v;
  return {
    prompt: `${who} is cutting rafters for a new house in ${rng.pick(TOWNS)}. Each rafter covers a horizontal run of ${qty(run, 'm')} and makes an angle of $${deg(ang)}$ with the horizontal. Each rafter also extends ${qty(over, 'm')} past the wall to form the overhang (the eaves), measured along the rafter. How long must each rafter be, ${nearest('m')}?`,
    figure: fig(uprightTri(rng), run, run * tanD(ang), labels([['ra', lbl(run, 'm')], ['ab', 'L']]), { a: deg(ang) }, 'none'),
    parts: [numPart(total, { decimals: 1, suffix: 'm', label: 'Rafter' })],
    hints: [
      'First find $L$, the part of the rafter above the run. Then add the overhang.',
      `The run is adjacent to the $${deg(ang)}$ angle and $L$ is the hypotenuse: $\\cos ${deg(ang)} = \\dfrac{${fmt(run)}}{L}$, so $L = \\dfrac{${fmt(run)}}{\\cos ${deg(ang)}}$.`,
    ],
    solution: [
      `Relative to the $${deg(ang)}$ angle, the run (${qty(run, 'm')}) is the adjacent side and $L$ is the hypotenuse. Use cosine.`,
      `$\\cos ${deg(ang)} = \\dfrac{${fmt(run)}}{L}$, so $L = \\dfrac{${fmt(run)}}{\\cos ${deg(ang)}} \\approx ${fmtFixed(len, 2)}\\ \\text{m}$`,
      `Add the overhang: $${fmtFixed(len, 2)} + ${fmt(over)} \\approx ${fmtFixed(len + over, 2)}\\ \\text{m}$`,
      `Each rafter must be about $${fmtFixed(total, 1)}\\ \\text{m}$ long.`,
    ],
    calculator: true,
  };
}

/** Ladder at a given angle: distance from the wall and height reached. */
function ladderTwoParts(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const len = rng.int(8, 18) / 2;
      const ang = rng.int(70, 80);
      return { len, ang, foot: len * cosD(ang), height: len * sinD(ang) };
    },
    (v) => clear(v.foot, 1) && clear(v.height, 1),
  );
  const { len, ang, foot, height } = v;
  return {
    prompt: `${who} sets up a ${qty(len, 'm')} extension ladder against a house so that it makes an angle of $${deg(ang)}$ with the ground. Find (a) the distance $d$ from the foot of the ladder to the wall and (b) the height $h$ the ladder reaches up the wall. Round each answer ${roundingPhrase(1)} of a metre.`,
    figure: fig(uprightTri(rng), foot, height, labels([['ra', 'd'], ['rb', 'h'], ['ab', lbl(len, 'm')]]), { a: deg(ang) }, 'ladder'),
    parts: [numPart(foot, { decimals: 1, suffix: 'm', label: '(a) $d =$' }), numPart(height, { decimals: 1, suffix: 'm', label: '(b) $h =$' })],
    hints: ['The ladder is the hypotenuse. The distance to the wall touches the angle (adjacent); the height is across from it (opposite).', `$d = ${fmt(len)}\\cos ${deg(ang)}$ and $h = ${fmt(len)}\\sin ${deg(ang)}$`],
    solution: [
      `The ladder ($${fmt(len)}$ m) is the hypotenuse. $d$ is adjacent to the $${deg(ang)}$ angle and $h$ is opposite.`,
      `(a) $\\cos ${deg(ang)} = \\dfrac{d}{${fmt(len)}}$, so $d = ${fmt(len)}\\cos ${deg(ang)} \\approx ${fmtFixed(foot, 1)}\\ \\text{m}$`,
      `(b) $\\sin ${deg(ang)} = \\dfrac{h}{${fmt(len)}}$, so $h = ${fmt(len)}\\sin ${deg(ang)} \\approx ${fmtFixed(height, 1)}\\ \\text{m}$`,
      `The foot of the ladder is about $${fmtFixed(foot, 1)}\\ \\text{m}$ from the wall and the ladder reaches about $${fmtFixed(height, 1)}\\ \\text{m}$ up the wall.`,
    ],
    calculator: true,
  };
}

/** Will a ladder set at 75° reach a window? */
function ladderReach(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const len = rng.int(10, 18) / 2;
      const height = len * sinD(75);
      const target = Math.round((height + rng.pick([-1, 1]) * rng.int(3, 8) / 10) * 10) / 10;
      return { len, height, target };
    },
    (v) => clear(v.height, 1) && Math.abs(v.height - v.target) >= 0.25,
  );
  const { len, height, target } = v;
  const reaches = height >= target;
  return {
    prompt: `A common safety guideline says a ladder should make an angle of about $75^\\circ$ with the ground. ${who} wants to clean a window whose ledge is ${qty(target, 'm')} above the ground, using a ${qty(len, 'm')} ladder set at $75^\\circ$. (a) How high up the wall will the ladder reach, ${nearest('m')}? (b) Will the top of the ladder reach the window ledge?`,
    figure: fig(uprightTri(rng), len * cosD(75), height, labels([['rb', 'h'], ['ab', lbl(len, 'm')]]), { a: deg(75) }, 'ladder'),
    parts: [numPart(height, { decimals: 1, suffix: 'm', label: '(a) $h =$' }), { label: '(b) Does it reach the ledge?', answer: fixedChoice(['Yes', 'No'], reaches ? 0 : 1) }],
    hints: ['The ladder is the hypotenuse and the height is opposite the $75^\\circ$ angle.', `$h = ${fmt(len)}\\sin 75^\\circ$. Then compare $h$ with ${qty(target, 'm')}.`],
    solution: [
      `The ladder ($${fmt(len)}$ m) is the hypotenuse and the height $h$ is opposite the $75^\\circ$ angle. Use sine.`,
      `$\\sin 75^\\circ = \\dfrac{h}{${fmt(len)}}$, so $h = ${fmt(len)}\\sin 75^\\circ \\approx ${fmtFixed(height, 1)}\\ \\text{m}$`,
      reaches
        ? `$${fmtFixed(height, 1)}$ m is more than $${fmt(target)}$ m, so yes, the ladder reaches the window ledge.`
        : `$${fmtFixed(height, 1)}$ m is less than $${fmt(target)}$ m, so no, the ladder does not reach the ledge. ${who} needs a longer ladder.`,
    ],
    calculator: true,
  };
}

const sinCosSide = skill({
  id: 'm103-sin-cos-side',
  name: 'Finding a side with sine or cosine',
  description: 'Use the sine or cosine ratio to find a leg or the hypotenuse of a right triangle.',
  outcomes: ['G4'],
  lessonId: 'm103-8-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return plainSide(rng, 1, [['hyp', 'opp'], ['hyp', 'adj']]);
    if (d === 2) {
      return plainSide(rng, 2, rng.chance(0.55) ? [['opp', 'hyp'], ['adj', 'hyp']] : [['hyp', 'opp'], ['hyp', 'adj']]);
    }
    const r = rng.next();
    if (r < 0.15) return rafterOverhang(rng);
    if (r < 0.3) return ladderTwoParts(rng);
    if (r < 0.4) return ladderReach(rng);
    const [sc, known, unknown] = pickScenarioPair(rng, (sc, k, u) => !sc.depression && fnFor(k, u) !== 'tan');
    return scenarioSide(rng, sc, known, unknown, false);
  },
});

/** Plumbing offset: angle of the diagonal piece from the offset and the travel. */
function pipeOffset(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const travel = rng.int(30, 80);
      const offset = rng.int(Math.ceil(travel * 0.35), Math.floor(travel * 0.85));
      return { travel, offset, ang: asinD(offset / travel) };
    },
    (v) => clear(v.ang, 1),
  );
  const { travel, offset, ang } = v;
  return {
    prompt: `${who}, a plumbing apprentice, must move a drain pipe sideways to get around a beam. A diagonal piece of pipe (the travel) that is ${qty(travel, 'cm')} long moves the pipe over by ${qty(offset, 'cm')} (the offset, measured straight across). What angle does the diagonal piece make with the original direction of the pipe, ${angleRound(1)}?`,
    figure: fig(uprightTri(rng), Math.sqrt(travel ** 2 - offset ** 2), offset, labels([['ab', lbl(travel, 'cm')], ['rb', lbl(offset, 'cm')]]), { a: '\\theta' }, 'none'),
    parts: [numPart(ang, { decimals: 1, suffix: '°', label: '$\\theta =$' })],
    hints: ['The travel is the longest side of the triangle (the hypotenuse). The offset is across from $\\theta$.', `$\\theta = \\sin^{-1}\\left(\\dfrac{\\text{offset}}{\\text{travel}}\\right)$`],
    solution: [
      `The offset ($${offset}$ cm) is opposite $\\theta$ and the travel ($${travel}$ cm) is the hypotenuse. Use sine.`,
      `$\\sin\\theta = \\dfrac{${offset}}{${travel}}$`,
      `$\\theta = \\sin^{-1}\\left(\\dfrac{${offset}}{${travel}}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      `The diagonal piece makes an angle of about $${fmtFixed(ang, 1)}^\\circ$ with the original pipe.`,
    ],
    calculator: true,
  };
}

/** Zipline: angle from the cable length and the drop. */
function zipline(rng: Rng): GenOutput {
  const v = retry(
    () => {
      const len = rng.int(12, 40) * 5;
      const drop = rng.int(Math.ceil(len * 0.08), Math.floor(len * 0.3));
      return { len, drop, ang: asinD(drop / len) };
    },
    (v) => clear(v.ang, 1),
  );
  const { len, drop, ang } = v;
  return {
    prompt: `A zipline at a summer camp near ${rng.pick(['Pinewood', 'Lakeside', 'Clearwater', 'Maple Falls', 'Stonebridge'])} has a straight cable ${qty(len, 'm')} long. The end of the cable is ${qty(drop, 'm')} lower than the start. What angle does the cable make with the horizontal, ${angleRound(1)}? (Ignore any sag in the cable.)`,
    figure: fig(uprightTri(rng), Math.sqrt(len ** 2 - drop ** 2), drop, labels([['ab', lbl(len, 'm')], ['rb', lbl(drop, 'm')]]), { a: '\\theta' }, 'none'),
    parts: [numPart(ang, { decimals: 1, suffix: '°', label: '$\\theta =$' })],
    hints: ['The cable is the hypotenuse. The drop is the vertical side, across from the angle with the horizontal.', 'You know the opposite side and the hypotenuse, so use $\\sin^{-1}$.'],
    solution: [
      `The drop ($${drop}$ m) is opposite $\\theta$ and the cable ($${len}$ m) is the hypotenuse. Use sine.`,
      `$\\sin\\theta = \\dfrac{${drop}}{${len}}$`,
      `$\\theta = \\sin^{-1}\\left(\\dfrac{${drop}}{${len}}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      `The cable makes an angle of about $${fmtFixed(ang, 1)}^\\circ$ with the horizontal.`,
    ],
    calculator: true,
  };
}

const sinCosAngle = skill({
  id: 'm103-sin-cos-angle',
  name: 'Finding an angle with sine or cosine',
  description: 'Use the inverse sine or inverse cosine to find an acute angle from a leg and the hypotenuse.',
  outcomes: ['G4'],
  lessonId: 'm103-8-2',
  calculator: true,
  gen(rng, d) {
    if (d < 3) return plainAngle(rng, d, 'sincos');
    const r = rng.next();
    if (r < 0.2) return pipeOffset(rng);
    if (r < 0.35) return zipline(rng);
    const sc = rng.pick(SCENARIOS.filter((s) => !s.depression && s.sides.includes('hyp')));
    return scenarioAngle(rng, sc, rng.pick([['hyp', 'opp'], ['hyp', 'adj']] as Array<[SideKey, SideKey]>), 1, false);
  },
});

const chooseRatio = skill({
  id: 'm103-choose-ratio',
  name: 'Choosing sine, cosine or tangent',
  description: 'Choose the trigonometric ratio (SOH CAH TOA) that connects the known side and the unknown side or angle.',
  outcomes: ['G4'],
  lessonId: 'm103-8-2',
  format: 'mc',
  gen(rng, d) {
    const fns: Fn[] = ['sin', 'cos', 'tan'];
    if (d === 3) {
      if (rng.chance(0.65)) {
        // A word problem: which solved equation gives the unknown side?
        const [sc, known, unknown] = pickScenarioPair(rng, (sc) => !sc.depression);
        const who = rng.pick(PEOPLE);
        const fn = fnFor(known, unknown);
        const top = topOf(fn) === unknown;
        const ang = rng.int(sc.ang[0], sc.ang[1]);
        const k = pickVal(rng, sc.range[known]!, false);
        const sym = sc.sym[unknown];
        const form = (g: Fn, mult: boolean) => (mult ? `$${sym} = ${fmt(k)}\\${g} ${deg(ang)}$` : `$${sym} = \\dfrac{${fmt(k)}}{\\${g} ${deg(ang)}}$`);
        const correct = form(fn, top);
        const s = triFrom(known, k, ang);
        return {
          prompt: `${sc.given[known]!(qty(k, 'm'), who)} ${sc.angle(`$${deg(ang)}$`, who, known)} Which equation gives ${sc.noun[unknown]}, $${sym}$?`,
          figure: fig(uprightTri(rng), s.adj, s.opp, labels([[UPRIGHT_KEY[known], lbl(k, 'm')], [UPRIGHT_KEY[unknown], sym]]), { a: deg(ang) }, sc.scene),
          parts: [{ answer: mc(rng, correct, [...fns.filter((g) => g !== fn).map((g) => form(g, top)), form(fn, !top)]) }],
          hints: [
            `Relative to the $${deg(ang)}$ angle, is ${sc.noun[known]} the opposite side, the adjacent side or the hypotenuse? What about $${sym}$?`,
            `Pick the ratio with both sides (SOH CAH TOA), then solve for $${sym}$. If $${sym}$ ends up on the bottom of the fraction, you divide.`,
          ],
          solution: [
            `Relative to the $${deg(ang)}$ angle, ${sc.noun[known]} is the ${SIDE_WORD[known]} and $${sym}$ is the ${SIDE_WORD[unknown]}. They go together in ${FN_WORD[fn]} (${MEMORY[fn]}).`,
            top
              ? `$\\${fn} ${deg(ang)} = \\dfrac{${sym}}{${fmt(k)}}$. Multiply both sides by $${fmt(k)}$.`
              : `$\\${fn} ${deg(ang)} = \\dfrac{${fmt(k)}}{${sym}}$. The unknown is on the bottom, so multiply by $${sym}$ and divide by $\\${fn} ${deg(ang)}$.`,
            `The correct equation is ${correct}.`,
          ],
        };
      }
      // A word problem: which equation gives the angle?
      const sc = rng.pick(SCENARIOS.filter((s) => !s.depression));
      const pairs = (['opp-adj', 'hyp-opp', 'hyp-adj'] as PairKey[]).filter((p) => sc.pair[p]);
      const pk = rng.pick(pairs);
      const pair = pk.split('-') as [SideKey, SideKey];
      const who = rng.pick(PEOPLE);
      const fn = fnFor(pair[0], pair[1]);
      const { vals, topV, botV, ang } = scenarioPairValues(rng, sc, pair, 0, false);
      const words: Words = {};
      for (const k of pair) words[k] = qty(vals[k]!, 'm');
      const fr = `\\dfrac{${fmt(topV)}}{${fmt(botV)}}`;
      const flip = `\\dfrac{${fmt(botV)}}{${fmt(topV)}}`;
      const eq = (g: Fn, f: string) => `$\\theta = \\${g}^{-1}\\left(${f}\\right)$`;
      const correct = eq(fn, fr);
      const s = triFrom(pair[0], vals[pair[0]]!, ang);
      return {
        prompt: `${sc.pair[pk]!(words, who)} Which equation gives ${sc.angleNoun(who)}, $\\theta$?`,
        figure: fig(uprightTri(rng), s.adj, s.opp, labels(pair.map((k) => [UPRIGHT_KEY[k], lbl(vals[k]!, 'm')] as [SideLabelKey, string])), { a: '\\theta' }, sc.scene),
        parts: [{ answer: mc(rng, correct, [...fns.filter((g) => g !== fn).map((g) => eq(g, fr)), eq(fn, flip)]) }],
        hints: ['Relative to $\\theta$, name the two sides you know.', 'Pick the ratio that uses those two sides (SOH CAH TOA). To find an angle, use the inverse key.'],
        solution: [
          `Relative to $\\theta$, ${sc.noun[topOf(fn)]} ($${fmt(topV)}$ m) is the ${SIDE_WORD[topOf(fn)]} and ${sc.noun[bottomOf(fn)]} ($${fmt(botV)}$ m) is the ${SIDE_WORD[bottomOf(fn)]}.`,
          `Those sides go together in ${FN_WORD[fn]} (${MEMORY[fn]}): $\\${fn}\\theta = ${fr}$.`,
          `The correct equation is ${correct}.`,
        ],
      };
    }

    const t = makeTri(rng, d);
    const at = rng.pick(['a', 'b'] as const);
    const r = rel(t, at);
    const unit = rng.pick(['cm', 'm']);
    const words = ['sine', 'cosine', 'tangent'];

    if (rng.chance(0.3)) {
      // Unknown angle, two known sides.
      const fn = rng.pick(fns);
      const v = retry(
        () => {
          const a = rng.int(4, 20);
          const b = rng.int(4, 20);
          return { a, b };
        },
        (v) => v.a !== v.b && (fn === 'tan' || v.a < v.b),
      );
      const topV = v.a;
      const botV = v.b;
      const ang = inv(fn, topV / botV);
      const top = topOf(fn);
      const bot = bottomOf(fn);
      const [legA, legB] = drawLegs(at, triFrom(bot, botV, ang));
      const fr = `\\dfrac{${topV}}{${botV}}`;
      const eq = (g: Fn, f: string) => `$\\${g}\\theta = ${f}$`;
      return {
        prompt: d === 1 ? 'You want to find the angle $\\theta$. Which ratio should you use?' : 'Which equation can be used to find the angle $\\theta$?',
        figure: fig(t, legA, legB, labels([[r.key[top], lbl(topV, unit)], [r.key[bot], lbl(botV, unit)]]), angleAt(at, '\\theta')),
        parts: [{ answer: d === 1 ? fixedChoice(words, fns.indexOf(fn)) : mc(rng, eq(fn, fr), [...fns.filter((g) => g !== fn).map((g) => eq(g, fr)), eq(fn, `\\dfrac{${botV}}{${topV}}`)]) }],
        hints: ['Label the two known sides from $\\theta$: opposite, adjacent or hypotenuse.', 'SOH: sine uses opposite and hypotenuse. CAH: cosine uses adjacent and hypotenuse. TOA: tangent uses opposite and adjacent.'],
        solution: [
          `Relative to $\\theta$, the $${topV}$ ${unit} side is the ${SIDE_WORD[top]} and the $${botV}$ ${unit} side is the ${SIDE_WORD[bot]}.`,
          `${cap(SIDE_WORD[top])} and ${SIDE_WORD[bot]} go together in ${MEMORY[fn]}, the ${FN_WORD[fn]} ratio: $\\${fn}\\theta = ${RATIO[fn]}$.`,
          d === 1 ? `Use ${FN_WORD[fn]}.` : `The equation is $\\${fn}\\theta = ${fr}$.`,
        ],
      };
    }

    // Unknown side.
    const [known, unknown] = rng.pick(SIDE_PAIRS);
    const fn = fnFor(known, unknown);
    const ang = d === 1 ? rng.pick(FRIENDLY_ANGLES) : rng.int(15, 75);
    const k = rng.int(5, 30);
    const [legA, legB] = drawLegs(at, triFrom(known, k, ang));
    const val = (s: SideKey) => (s === known ? `${k}` : 'x');
    const eq = (g: Fn, a: string, b: string) => `$\\${g} ${deg(ang)} = \\dfrac{${a}}{${b}}$`;
    const top = topOf(fn);
    const bot = bottomOf(fn);
    const correct = eq(fn, val(top), val(bot));
    return {
      prompt: d === 1 ? 'You want to find the length of side $x$. Which ratio should you use?' : 'Which equation can be used to find $x$?',
      figure: fig(t, legA, legB, labels([[r.key[known], lbl(k, unit)], [r.key[unknown], 'x']]), angleAt(at, deg(ang))),
      parts: [{ answer: d === 1 ? fixedChoice(words, fns.indexOf(fn)) : mc(rng, correct, [...fns.filter((g) => g !== fn).map((g) => eq(g, val(top), val(bot))), eq(fn, val(bot), val(top))]) }],
      hints: [`Label the sides from the $${deg(ang)}$ angle. Which side is $x$, and which side is $${k}$ ${unit}?`, 'SOH: sine uses opposite and hypotenuse. CAH: cosine uses adjacent and hypotenuse. TOA: tangent uses opposite and adjacent.'],
      solution: [
        `Relative to the $${deg(ang)}$ angle, the $${k}$ ${unit} side is the ${SIDE_WORD[known]} and $x$ is the ${SIDE_WORD[unknown]}.`,
        `${cap(SIDE_WORD[known])} and ${SIDE_WORD[unknown]} go together in ${MEMORY[fn]}, the ${FN_WORD[fn]} ratio: $\\${fn}\\theta = ${RATIO[fn]}$.`,
        d === 1 ? `Use ${FN_WORD[fn]}.` : `The equation is ${correct}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.3 — Solving right-triangle problems
// ---------------------------------------------------------------------------

const RAMP_LIMIT = atanD(1 / 12);

/** Wheelchair ramp: find the angle and compare with a 1 : 12 code. */
function rampCheck(rng: Rng): GenOutput {
  const v = retry(
    () => {
      const rise = rng.pick([0.3, 0.4, 0.45, 0.5, 0.6, 0.75, 0.8, 0.9]);
      const run = rng.int(8, 28) / 2;
      return { rise, run, ang: atanD(rise / run) };
    },
    (v) => clear(v.ang, 1) && Math.abs(v.ang - RAMP_LIMIT) > 0.4 && v.ang < 12,
  );
  const { rise, run, ang } = v;
  const meets = rise / run <= 1 / 12;
  return {
    prompt: `Suppose the building code says a wheelchair ramp may rise at most $1$ unit for every $12$ units of horizontal run, which is an angle of about $4.8^\\circ$. A ramp at a community hall rises ${qty(rise, 'm')} over a horizontal run of ${qty(run, 'm')}. (a) What angle does the ramp make with the ground, ${angleRound(1)}? (b) Does the ramp meet the code?`,
    figure: fig(uprightTri(rng), run, rise, labels([['ra', lbl(run, 'm')], ['rb', lbl(rise, 'm')]]), { a: '\\theta' }, 'ramp'),
    parts: [numPart(ang, { decimals: 1, suffix: '°', label: '(a) $\\theta =$' }), { label: '(b) Does it meet the code?', answer: fixedChoice(['Yes', 'No'], meets ? 0 : 1) }],
    hints: ['The rise is opposite the angle and the run is adjacent.', `$\\theta = \\tan^{-1}\\left(\\dfrac{\\text{rise}}{\\text{run}}\\right)$. Then compare your angle with $4.8^\\circ$.`],
    solution: [
      `The rise ($${fmt(rise)}$ m) is opposite $\\theta$ and the run ($${fmt(run)}$ m) is adjacent. Use tangent.`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${fmt(rise)}}{${fmt(run)}}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      `Check with the ratio: a 1 : 12 ramp that rises $${fmt(rise)}$ m needs a run of at least $12 \\times ${fmt(rise)} = ${fmt(12 * rise)}$ m.`,
      meets
        ? `$${fmtFixed(ang, 1)}^\\circ$ is less than about $4.8^\\circ$ (and $${fmt(run)}$ m $\\ge ${fmt(12 * rise)}$ m), so yes, the ramp meets the code.`
        : `$${fmtFixed(ang, 1)}^\\circ$ is more than about $4.8^\\circ$ (the run of $${fmt(run)}$ m is shorter than $${fmt(12 * rise)}$ m), so no, the ramp is too steep.`,
    ],
    calculator: true,
  };
}

/** Roof pitch ↔ roof angle. */
function pitchProblem(rng: Rng): GenOutput {
  const intro = 'Roofers describe the steepness of a roof by its **pitch**.';
  if (rng.chance(0.55)) {
    const p = retry(
      () => rng.int(3, 12),
      (p) => clear(atanD(p / 12), 1),
    );
    const ang = atanD(p / 12);
    return {
      prompt: `${intro} A $${p}/12$ pitch means the roof rises $${p}$ inches for every $12$ inches of horizontal run. What angle does a roof with a $${p}/12$ pitch make with the horizontal, ${angleRound(1)}?`,
      figure: fig(uprightTri(rng), 12, p, labels([['ra', '12\\text{ in}'], ['rb', lbl(p, 'in')]]), { a: '\\theta' }, 'none'),
      parts: [numPart(ang, { decimals: 1, suffix: '°', label: '$\\theta =$' })],
      hints: [`Draw a right triangle with a rise of $${p}$ in and a run of $12$ in.`, 'The rise is opposite $\\theta$ and the run is adjacent: use $\\tan^{-1}$.'],
      solution: [
        `The rise ($${p}$ in) is opposite $\\theta$ and the run ($12$ in) is adjacent. Use tangent.`,
        `$\\tan\\theta = \\dfrac{${p}}{12}$`,
        `$\\theta = \\tan^{-1}\\left(\\dfrac{${p}}{12}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
        `A $${p}/12$ roof makes an angle of about $${fmtFixed(ang, 1)}^\\circ$ with the horizontal.`,
      ],
      calculator: true,
    };
  }
  const v = retry(
    () => {
      const ang = rng.int(15, 45);
      return { ang, rise: 12 * tanD(ang) };
    },
    (v) => clear(v.rise, 0, 0.15),
  );
  const { ang, rise } = v;
  return {
    prompt: `${intro} A pitch of $x/12$ means the roof rises $x$ inches for every $12$ inches of horizontal run. A roof makes an angle of $${deg(ang)}$ with the horizontal. How many inches does it rise for every $12$ inches of run? Round to the nearest whole inch to give the pitch.`,
    figure: fig(uprightTri(rng), 12, rise, labels([['ra', '12\\text{ in}'], ['rb', 'x']]), { a: deg(ang) }, 'none'),
    parts: [numPart(rise, { decimals: 0, suffix: 'in', label: '$x =$' })],
    hints: [`The rise $x$ is opposite the $${deg(ang)}$ angle and the $12$ in run is adjacent.`, `$x = 12\\tan ${deg(ang)}$`],
    solution: [
      `The rise $x$ is opposite the $${deg(ang)}$ angle and the run ($12$ in) is adjacent. Use tangent.`,
      `$\\tan ${deg(ang)} = \\dfrac{x}{12}$, so $x = 12\\tan ${deg(ang)} \\approx ${fmtFixed(rise, 2)}\\ \\text{in}$`,
      `The roof rises about $${fmtFixed(rise, 0)}\\ \\text{in}$ per $12$ in of run, so it is close to a $${fmtFixed(rise, 0)}/12$ pitch.`,
    ],
    calculator: true,
  };
}

/** Ladder set-up: find the angle and compare with a 70°–80° guideline. */
function ladderCheck(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const v = retry(
    () => {
      const len = rng.int(8, 18) / 2;
      const foot = rng.int(6, 35) / 10;
      return { len, foot, ang: acosD(Math.min(foot / len, 1)) };
    },
    (v) => v.foot < v.len * 0.6 && clear(v.ang, 0) && Math.abs(v.ang - 70) > 1 && Math.abs(v.ang - 80) > 1,
  );
  const { len, foot, ang } = v;
  const safe = ang >= 70 && ang <= 80;
  return {
    prompt: `${who} leans a ${qty(len, 'm')} ladder against a wall with its foot ${qty(foot, 'm')} from the wall. Suppose a safety guideline says a ladder should make an angle between $70^\\circ$ and $80^\\circ$ with the ground. (a) What angle does the ladder make with the ground, ${angleRound(0)}? (b) Does the set-up follow the guideline?`,
    figure: fig(uprightTri(rng), foot, Math.sqrt(len ** 2 - foot ** 2), labels([['ra', lbl(foot, 'm')], ['ab', lbl(len, 'm')]]), { a: '\\theta' }, 'ladder'),
    parts: [numPart(ang, { decimals: 0, suffix: '°', label: '(a) $\\theta =$' }), { label: '(b) Follows the guideline?', answer: fixedChoice(['Yes', 'No'], safe ? 0 : 1) }],
    hints: ['The ladder is the hypotenuse. The distance from the wall touches the angle at the ground (adjacent).', 'Adjacent and hypotenuse: use $\\cos^{-1}$. Then compare with $70^\\circ$ and $80^\\circ$.'],
    solution: [
      `The foot distance ($${fmt(foot)}$ m) is adjacent to $\\theta$ and the ladder ($${fmt(len)}$ m) is the hypotenuse. Use cosine.`,
      `$\\theta = \\cos^{-1}\\left(\\dfrac{${fmt(foot)}}{${fmt(len)}}\\right) \\approx ${fmtFixed(ang, 0)}^\\circ$`,
      safe
        ? `$${fmtFixed(ang, 0)}^\\circ$ is between $70^\\circ$ and $80^\\circ$, so yes, the set-up follows the guideline.`
        : ang < 70
          ? `$${fmtFixed(ang, 0)}^\\circ$ is less than $70^\\circ$: the foot is too far out and the ladder could slide. No, it does not follow the guideline.`
          : `$${fmtFixed(ang, 0)}^\\circ$ is more than $80^\\circ$: the ladder is too steep and could tip backward. No, it does not follow the guideline.`,
    ],
    calculator: true,
  };
}

/** Surveyor's transit above the ground: tangent, then add the instrument height. */
function transitProblem(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const thing = rng.pick([
    { name: 'a grain elevator', short: 'grain elevator' },
    { name: 'a water tower', short: 'water tower' },
    { name: 'an office building', short: 'building' },
    { name: 'a flare stack at a gas plant', short: 'flare stack' },
  ]);
  const v = retry(
    () => {
      const inst = rng.pick([1.4, 1.5, 1.6, 1.7]);
      const dist = rng.int(20, 60);
      const ang = rng.int(25, 55);
      const up = dist * tanD(ang);
      return { inst, dist, ang, up, h: up + inst };
    },
    (v) => clear(v.h, 1, 0.2),
  );
  const { inst, dist, ang, up, h } = v;
  return {
    prompt: `${who}, a survey technician, sets up a transit (an instrument that measures angles) on a tripod. The transit is ${qty(inst, 'm')} above the ground and ${qty(dist, 'm')} from the base of ${thing.name}. The angle of elevation from the transit to the top of the ${thing.short} is $${deg(ang)}$. How tall is the ${thing.short}, ${nearest('m')}?`,
    figure: fig(uprightTri(rng), dist, up, labels([['ra', lbl(dist, 'm')], ['rb', 'x']]), { a: deg(ang) }, 'none'),
    parts: [numPart(h, { decimals: 1, suffix: 'm', label: 'Height' })],
    hints: ['The triangle starts at the transit, not at the ground. First find $x$, the height above the transit.', `$x = ${dist}\\tan ${deg(ang)}$. Then add the ${fmt(inst)} m height of the transit.`],
    solution: [
      `In the triangle, the $${dist}$ m distance is adjacent to the $${deg(ang)}$ angle and $x$, the height above the transit, is opposite. Use tangent.`,
      `$\\tan ${deg(ang)} = \\dfrac{x}{${dist}}$, so $x = ${dist}\\tan ${deg(ang)} \\approx ${fmtFixed(up, 2)}\\ \\text{m}$`,
      `Add the height of the transit: $${fmtFixed(up, 2)} + ${fmt(inst)} = ${fmtFixed(up + inst, 2)}\\ \\text{m}$`,
      `The ${thing.short} is about $${fmtFixed(h, 1)}\\ \\text{m}$ tall.`,
    ],
    calculator: true,
  };
}

const KEEP_DIGITS = 'Keep all the digits on your calculator until the final answer.';

function twoTriangleProblem(rng: Rng): GenOutput {
  const kind = rng.pick(['opposite', 'same', 'stacked'] as const);
  if (kind === 'opposite') {
    const v = retry(
      () => {
        const h = rng.int(20, 80);
        const a1 = rng.int(25, 60);
        const a2 = rng.intExcept(25, 60, [a1]);
        const d1 = h / tanD(a1);
        const d2 = h / tanD(a2);
        return { h, a1, a2, d1, d2, x: d1 + d2 };
      },
      (v) => clear(v.x, 1, 0.2),
    );
    const { h, a1, a2, d1, d2, x } = v;
    const figure: TwoTriangleFigure = { type: 'twoTriangles', arrangement: 'opposite', labels: { h: `${h} m`, a1: `${a1}°`, a2: `${a2}°`, x: 'x' } };
    return {
      prompt: `Two survey technicians stand on opposite sides of a ${qty(h, 'm')} communication tower, in a straight line with its base. The angles of elevation from them to the top of the tower are $${deg(a1)}$ and $${deg(a2)}$. How far apart are the two technicians, ${nearest('m')}?`,
      figure,
      parts: [numPart(x, { decimals: 1, suffix: 'm', label: '$x =$' })],
      hints: ['Split the diagram into two right triangles that share the tower.', `In each triangle the tower is opposite and the ground distance is adjacent, so each distance is $\\dfrac{${h}}{\\tan\\theta}$. Add them. ${KEEP_DIGITS}`],
      solution: [
        `Left triangle: $\\tan ${deg(a1)} = \\dfrac{${h}}{d_1}$, so $d_1 = \\dfrac{${h}}{\\tan ${deg(a1)}} \\approx ${fmtFixed(d1, 2)}\\ \\text{m}$`,
        `Right triangle: $d_2 = \\dfrac{${h}}{\\tan ${deg(a2)}} \\approx ${fmtFixed(d2, 2)}\\ \\text{m}$`,
        `$x = d_1 + d_2 \\approx ${fmtFixed(d1, 2)} + ${fmtFixed(d2, 2)} \\approx ${fmtFixed(x, 2)}\\ \\text{m}$`,
        `The technicians are about $${fmtFixed(x, 1)}\\ \\text{m}$ apart.`,
      ],
      calculator: true,
    };
  }
  if (kind === 'same') {
    const v = retry(
      () => {
        const h = rng.int(25, 45);
        const near = rng.int(40, 65);
        const far = rng.int(15, near - 10);
        const dn = h / tanD(near);
        const df = h / tanD(far);
        return { h, near, far, dn, df, x: df - dn };
      },
      (v) => clear(v.x, 1, 0.2),
    );
    const { h, near, far, dn, df, x } = v;
    const figure: TwoTriangleFigure = { type: 'twoTriangles', arrangement: 'same', labels: { h: `${h} m`, a1: `${near}°`, a2: `${far}°`, x: 'x' } };
    const who = rng.pick(PEOPLE);
    return {
      prompt: `${who} is at the top of a grain elevator, ${qty(h, 'm')} above the ground. Two grain trucks are parked in a straight line from the base of the elevator. The angles of depression from ${who} to the trucks are $${deg(near)}$ and $${deg(far)}$. How far apart are the trucks, ${nearest('m')}?`,
      figure,
      parts: [numPart(x, { decimals: 1, suffix: 'm', label: '$x =$' })],
      hints: ['Each angle of depression equals the angle of elevation from that truck (alternate angles).', `Find each truck's distance from the base with $\\dfrac{${h}}{\\tan\\theta}$, then subtract. ${KEEP_DIGITS}`],
      solution: [
        'The angle of depression to each truck equals the angle at that truck (alternate angles), so each triangle has the elevator as the opposite side.',
        `Near truck: $\\dfrac{${h}}{\\tan ${deg(near)}} \\approx ${fmtFixed(dn, 2)}\\ \\text{m}$ from the base`,
        `Far truck: $\\dfrac{${h}}{\\tan ${deg(far)}} \\approx ${fmtFixed(df, 2)}\\ \\text{m}$ from the base`,
        `$x \\approx ${fmtFixed(df, 2)} - ${fmtFixed(dn, 2)} \\approx ${fmtFixed(x, 2)}\\ \\text{m}$`,
        `The trucks are about $${fmtFixed(x, 1)}\\ \\text{m}$ apart.`,
      ],
      calculator: true,
    };
  }
  const v = retry(
    () => {
      const dist = rng.int(25, 60);
      const a1 = rng.int(20, 40);
      const a2 = rng.int(a1 + 4, a1 + 12);
      const top = dist * tanD(a2);
      const bottom = dist * tanD(a1);
      return { dist, a1, a2, top, bottom, x: top - bottom };
    },
    (v) => clear(v.x, 1, 0.2),
  );
  const { dist, a1, a2, top, bottom, x } = v;
  const figure: TwoTriangleFigure = { type: 'twoTriangles', arrangement: 'stacked', labels: { d: `${dist} m`, a1: `${a1}°`, a2: `${a2}°`, x: 'x' } };
  return {
    prompt: `A cell-phone antenna stands on the flat roof of a building in ${rng.pick(TOWNS)}. From a point on the ground ${qty(dist, 'm')} from the base of the building, the angle of elevation to the bottom of the antenna is $${deg(a1)}$ and the angle of elevation to the top of the antenna is $${deg(a2)}$. How tall is the antenna, ${nearest('m')}?`,
    figure,
    parts: [numPart(x, { decimals: 1, suffix: 'm', label: '$x =$' })],
    hints: ['Both right triangles share the same horizontal distance.', `Find the height to the top and the height to the bottom of the antenna with $${dist}\\tan\\theta$, then subtract. ${KEEP_DIGITS}`],
    solution: [
      `Height to the top of the antenna: $${dist}\\tan ${deg(a2)} \\approx ${fmtFixed(top, 2)}\\ \\text{m}$`,
      `Height of the building (bottom of the antenna): $${dist}\\tan ${deg(a1)} \\approx ${fmtFixed(bottom, 2)}\\ \\text{m}$`,
      `$x \\approx ${fmtFixed(top, 2)} - ${fmtFixed(bottom, 2)} \\approx ${fmtFixed(x, 2)}\\ \\text{m}$`,
      `The antenna is about $${fmtFixed(x, 1)}\\ \\text{m}$ tall.`,
    ],
    calculator: true,
  };
}

/** Design a ramp at the steepest allowed angle: run and length. */
function rampDesign(rng: Rng): GenOutput {
  const lim = 4.8;
  const v = retry(
    () => {
      const rise = rng.int(30, 90) / 100;
      return { rise, run: rise / tanD(lim), len: rise / sinD(lim) };
    },
    (v) => clear(v.run, 1, 0.2) && clear(v.len, 2, 0.2),
  );
  const { rise, run, len } = v;
  return {
    prompt: `Suppose the building code says a wheelchair ramp can make an angle of at most $4.8^\\circ$ with the ground. A ramp must rise ${qty(rise, 'm')} from the sidewalk to the door of a clinic. Using the steepest angle allowed, find (a) the horizontal run of the ramp, ${nearest('m')}, and (b) the length of the sloped ramp surface, ${roundingPhrase(2)} of a metre (to the nearest centimetre), so the builder can cut the ramp deck.`,
    figure: fig(uprightTri(rng), run, rise, labels([['ra', 'd'], ['rb', lbl(rise, 'm')], ['ab', 'L']]), { a: '4.8^\\circ' }, 'ramp'),
    parts: [numPart(run, { decimals: 1, suffix: 'm', label: '(a) Run $d =$' }), numPart(len, { decimals: 2, suffix: 'm', label: '(b) Length $L =$' })],
    hints: [
      'The rise is opposite the $4.8^\\circ$ angle. The run is adjacent, and the ramp surface is the hypotenuse.',
      `Rearrange each ratio so the unknown is alone: $d = \\dfrac{${fmt(rise)}}{\\tan 4.8^\\circ}$ and $L = \\dfrac{${fmt(rise)}}{\\sin 4.8^\\circ}$.`,
    ],
    solution: [
      `(a) Opposite and adjacent: $\\tan 4.8^\\circ = \\dfrac{${fmt(rise)}}{d}$, so $d = \\dfrac{${fmt(rise)}}{\\tan 4.8^\\circ} \\approx ${fmtFixed(run, 1)}\\ \\text{m}$`,
      `(b) Opposite and hypotenuse: $\\sin 4.8^\\circ = \\dfrac{${fmt(rise)}}{L}$, so $L = \\dfrac{${fmt(rise)}}{\\sin 4.8^\\circ} \\approx ${fmtFixed(len, 2)}\\ \\text{m}$`,
      `Check: the run is about $12$ times the rise ($12 \\times ${fmt(rise)} = ${fmt(12 * rise)}$), as expected for a 1 : 12 slope.`,
      `The ramp needs a horizontal run of about $${fmtFixed(run, 1)}\\ \\text{m}$ and a sloped surface about $${fmtFixed(len, 2)}\\ \\text{m}$ long.`,
    ],
    calculator: true,
  };
}

/** Roof pitch and run (imperial): angle, then rafter length. */
function rafterPitch(rng: Rng): GenOutput {
  const v = retry(
    () => {
      const p = rng.int(4, 10);
      const run = rng.int(16, 28) / 2;
      const ang = atanD(p / 12);
      return { p, run, ang, len: run / cosD(ang) };
    },
    (v) => clear(v.ang, 1) && clear(v.len, 1, 0.15),
  );
  const { p, run, ang, len } = v;
  return {
    prompt: `A garage roof has a $${p}/12$ pitch: it rises $${p}$ inches for every $12$ inches of horizontal run. Each rafter covers a horizontal run of ${qty(run, 'ft')} (ignore the overhang). (a) What angle does the roof make with the horizontal, ${angleRound(1)}? (b) How long is each rafter, ${nearest('ft')}?`,
    figure: fig(uprightTri(rng), run, (run * p) / 12, labels([['ra', lbl(run, 'ft')], ['ab', 'L']]), { a: '\\theta' }, 'none'),
    parts: [numPart(ang, { decimals: 1, suffix: '°', label: '(a) $\\theta =$' }), numPart(len, { decimals: 1, suffix: 'ft', label: '(b) $L =$' })],
    hints: [`The pitch gives a small triangle with rise $${p}$ and run $12$: use $\\tan^{-1}$ for the angle.`, `The rafter is the hypotenuse and the run is adjacent: $L = \\dfrac{${fmt(run)}}{\\cos\\theta}$. ${KEEP_DIGITS}`],
    solution: [
      `(a) $\\tan\\theta = \\dfrac{${p}}{12}$, so $\\theta = \\tan^{-1}\\left(\\dfrac{${p}}{12}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      `(b) The run is adjacent to $\\theta$ and the rafter $L$ is the hypotenuse: $\\cos\\theta = \\dfrac{${fmt(run)}}{L}$`,
      `$L = \\dfrac{${fmt(run)}}{\\cos\\theta} \\approx ${fmtFixed(len, 1)}\\ \\text{ft}$ (using the unrounded angle)`,
      `The roof makes an angle of about $${fmtFixed(ang, 1)}^\\circ$, and each rafter is about $${fmtFixed(len, 1)}\\ \\text{ft}$ long.`,
    ],
    calculator: true,
  };
}

/** Guy wires: total wire to buy in whole metres. */
function guyPurchase(rng: Rng): GenOutput {
  const v = retry(
    () => {
      const n = rng.pick([3, 4]);
      const h = rng.int(15, 40);
      const ang = rng.int(50, 65);
      const extra = rng.pick([0.5, 1, 1.5]);
      const len = h / sinD(ang);
      const total = n * (len + extra);
      return { n, h, ang, extra, len, total, buy: Math.ceil(total) };
    },
    (v) => v.total - Math.floor(v.total) > 0.15 && v.total - Math.floor(v.total) < 0.85,
  );
  const { n, h, ang, extra, len, total, buy } = v;
  return {
    prompt: `A crew is putting up a radio tower near ${rng.pick(TOWNS)}. Each of the ${n} guy wires is attached ${qty(h, 'm')} up the tower and makes an angle of $${deg(ang)}$ with the ground. Each wire also needs an extra ${qty(extra, 'm')} for fastening at the ends. Wire is sold only in whole metres. How many metres of wire should the crew buy?`,
    figure: fig(uprightTri(rng), h / tanD(ang), h, labels([['rb', lbl(h, 'm')], ['ab', 'L']]), { a: deg(ang) }, 'none'),
    parts: [numPart(buy, { suffix: 'm', label: 'Wire to buy' })],
    hints: ['First find the length $L$ of one wire. The height is opposite the angle and the wire is the hypotenuse.', `$L = \\dfrac{${h}}{\\sin ${deg(ang)}}$. Add the extra, multiply by ${n}, then round **up** to a whole metre.`],
    solution: [
      `One wire: $\\sin ${deg(ang)} = \\dfrac{${h}}{L}$, so $L = \\dfrac{${h}}{\\sin ${deg(ang)}} \\approx ${fmtFixed(len, 2)}\\ \\text{m}$`,
      `With the extra: $${fmtFixed(len, 2)} + ${fmt(extra)} \\approx ${fmtFixed(len + extra, 2)}\\ \\text{m}$ per wire`,
      `For ${n} wires: $${n} \\times ${fmtFixed(len + extra, 2)} \\approx ${fmtFixed(total, 2)}\\ \\text{m}$`,
      `Wire is sold in whole metres, so round up: the crew should buy $${buy}\\ \\text{m}$ of wire.`,
    ],
    calculator: true,
  };
}

const trigApply = skill({
  id: 'm103-trig-apply',
  name: 'Solving right-triangle problems',
  description: 'Solve workplace problems with angles of elevation and depression, ramps, roof pitch, ladders and guy wires, including two-step problems.',
  outcomes: ['G4', 'A1'],
  lessonId: 'm103-8-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      if (rng.chance(0.3)) {
        const sc = byKey(rng.pick(['tree', 'shadow', 'guy', 'kite', 'auger']));
        return scenarioAngle(rng, sc, ['opp', 'adj'], 0, true);
      }
      const [sc, known, unknown] = pickScenarioPair(rng, (sc, k, u) => !sc.depression && topOf(fnFor(k, u)) === u);
      return scenarioSide(rng, sc, known, unknown, true);
    }
    if (d === 2) {
      const r = rng.next();
      if (r < 0.15) return rampCheck(rng);
      if (r < 0.3) return pitchProblem(rng);
      if (r < 0.45) return ladderCheck(rng);
      if (r < 0.65) {
        const sc = byKey('elevator');
        if (rng.chance(0.25)) return scenarioAngle(rng, sc, ['opp', 'adj'], 0, false);
        const known = rng.pick(['opp', 'adj'] as const);
        return scenarioSide(rng, sc, known, known === 'opp' ? 'adj' : 'opp', false);
      }
      const [sc, known, unknown] = pickScenarioPair(rng, (sc, k, u) => !sc.depression && bottomOf(fnFor(k, u)) === u);
      return scenarioSide(rng, sc, known, unknown, false);
    }
    return rng.pick([transitProblem, twoTriangleProblem, twoTriangleProblem, rampDesign, rafterPitch, guyPurchase])(rng);
  },
});

export const TRIG_SKILLS: SkillDef[] = [labelSides, tanSide, tanAngle, sinCosSide, sinCosAngle, chooseRatio, trigApply];
