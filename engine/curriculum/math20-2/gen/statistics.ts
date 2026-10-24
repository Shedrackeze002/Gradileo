/** Math 20-2 Unit 5 — Statistical Reasoning (S1, S2). */
import { fixedChoice, mc, mcFigures, numPart, part, retry, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { BarChartFigure, Figure, Part, PlaneFigure, PlaneSegment, SkillDef } from '../../../types.ts';

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const mean = (a: number[]) => sum(a) / a.length;
function popSD(a: number[]): number {
  const m = mean(a);
  return Math.sqrt(sum(a.map((x) => (x - m) ** 2)) / a.length);
}
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** A number inside maths (thousands grouped, at most `dp` places). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
function group(s: string): string {
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const d = neg ? i.slice(1) : i;
  const g = d.length > 4 ? d.replace(/\B(?=(\d{3})+(?!\d))/g, '{,}') : d;
  return `${neg ? '-' : ''}${g}${f === undefined ? '' : '.' + f}`;
}
/** Exactly `dp` places, for maths. */
const fixed = (x: number, dp: number) => group(fmtFixed(x, dp));
/** True when v sits too close to a rounding boundary at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
const exactAt = (v: number, dp: number) => Math.abs(roundTo(v, dp) - v) < 1e-9;
/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.46". */
function eq(v: number, dp = 2): string {
  return exactAt(v, dp) ? `= ${num(v, dp)}` : `\\approx ${fixed(v, dp)}`;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** A value with its unit, in prose: $12$ min, $14^\circ\text{C}$, $68\%$. */
function u(x: string, unit: string): string {
  if (!unit) return `$${x}$`;
  if (unit === '°C') return `$${x}^\\circ\\text{C}$`;
  if (unit === '%') return `$${x}\\%$`;
  return `$${x}$ ${unit}`;
}
const pctTex = (p: number) => `$${num(p)}\\%$`;
const listTex = (a: number[]) => `$${a.map((x) => num(x)).join(',\\ \\ ')}$`;

// ---------------------------------------------------------------------------
// The normal distribution
// ---------------------------------------------------------------------------

/** Standard normal cumulative probability P(Z < z), by Marsaglia's series (error far below 1e-7). */
function normalCdf(z: number): number {
  if (z <= -8) return 0;
  if (z >= 8) return 1;
  const q = z * z;
  let s = z;
  let t = 0;
  let b = z;
  for (let i = 1; s !== t && i < 2000; ) {
    t = s;
    i += 2;
    b *= q / i;
    s = t + b;
  }
  return 0.5 + s * Math.exp(-0.5 * q - 0.9189385332046728);
}
const pdf = (z: number) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
/** The z with P(Z < z) = p, by bisection. */
function invNormal(p: number): number {
  let lo = -8;
  let hi = 8;
  for (let i = 0; i < 100; i++) {
    const m = (lo + hi) / 2;
    if (normalCdf(m) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}
/** The area to the left of z as a z-score table prints it: z to 2 places, area to 4 places. */
const tableArea = (z: number) => roundTo(normalCdf(roundTo(z, 2)), 4);
/** The table z (2 places) whose area is closest to p. */
function tableZ(p: number): number {
  const z0 = roundTo(invNormal(p), 2);
  let best = z0;
  for (const z of [roundTo(z0 - 0.01, 2), roundTo(z0 + 0.01, 2)]) if (Math.abs(tableArea(z) - p) < Math.abs(tableArea(best) - p) - 1e-12) best = z;
  return best;
}

const Y_LO = 0.002;
const Y_HI = 0.43;

/**
 * A normal curve on a plane, from 3.5 standard deviations below the mean to 3.5 above.
 * Grid lines (and tick labels) sit at the mean and each standard deviation, so mu must be a multiple of sd.
 * `shade` hatches the area under the curve between two values.
 */
function normalFigure(mu: number, sd: number, xLabel: string, shade?: [number, number]): PlaneFigure {
  const X = (z: number) => roundTo(mu + z * sd, 4);
  const Y = (z: number) => roundTo(Math.max(pdf(z), Y_LO), 4);
  const points: Array<[number, number]> = [];
  for (let i = -35; i <= 35; i++) points.push([X(i / 10), Y(i / 10)]);
  const segments: PlaneSegment[] = [];
  if (shade) {
    const za = Math.max(-3.5, (shade[0] - mu) / sd);
    const zb = Math.min(3.5, (shade[1] - mu) / sd);
    for (let k = Math.ceil(za * 10 + 0.3); k <= Math.floor(zb * 10 - 0.3); k++) segments.push({ from: [X(k / 10), Y_LO], to: [X(k / 10), Y(k / 10)], color: 'accent' });
    for (const z of [za, zb]) if (Math.abs(z) < 3.5) segments.push({ from: [X(z), Y_LO], to: [X(z), Y(z)] });
  }
  return {
    type: 'plane',
    grid: { xMin: X(-3.5), xMax: X(3.5), yMin: Y_LO, yMax: Y_HI, xStep: sd, yStep: 1, xLabel },
    polylines: [{ points }],
    ...(segments.length ? { segments } : {}),
    caption: shade ? 'A normal curve with a shaded region' : 'A normal curve',
  };
}

interface NormCtx {
  /** Subject of "... are normally distributed". */
  intro: string;
  pop: string;
  above: (v: string) => string;
  below: (v: string) => string;
  between: (a: string, b: string) => string;
  /** "a height of 180 cm" */
  one: (v: string) => string;
  /** The measured quantity, for "Kai’s height" and "What is the height?" */
  noun: string;
  /** Who owns a value: a person (a name) or a thing ("One bottle’s"). */
  thing?: string;
  /** "What is that height?" in percentile questions, after "a certain height". */
  cert: string;
  unit: string;
  axis: string;
  /** [mean, standard deviation], with the mean a multiple of the standard deviation (for the figure's grid). */
  pairs: Array<[number, number]>;
  /** Places for a value found from a percentile. */
  dp: number;
}

const NORM: NormCtx[] = [
  {
    intro: 'The marks on a Grade 11 chemistry exam written by every student in a large school division',
    pop: 'students', above: (v) => `scored higher than ${v}`, below: (v) => `scored lower than ${v}`, between: (a, b) => `scored between ${a} and ${b}`,
    one: (v) => `a mark of ${v}`, noun: 'mark', cert: 'mark', unit: '', axis: 'Mark',
    pairs: [[72, 8], [70, 7], [66, 6], [75, 5], [68, 4], [65, 5], [72, 6], [64, 8]], dp: 1,
  },
  {
    intro: 'The heights of Grade 11 students in a large school division',
    pop: 'students', above: (v) => `are taller than ${v}`, below: (v) => `are shorter than ${v}`, between: (a, b) => `are between ${a} and ${b} tall`,
    one: (v) => `a height of ${v}`, noun: 'height', cert: 'height', unit: 'cm', axis: 'Height (cm)',
    pairs: [[168, 8], [170, 10], [165, 5], [171, 9], [168, 7], [168, 6]], dp: 1,
  },
  {
    intro: 'The volumes of juice that a machine at a bottling plant puts into its bottles',
    pop: 'bottles', above: (v) => `contain more than ${v}`, below: (v) => `contain less than ${v}`, between: (a, b) => `contain between ${a} and ${b}`,
    one: (v) => `a volume of ${v}`, noun: 'volume', thing: 'bottle', cert: 'volume', unit: 'mL', axis: 'Volume (mL)',
    pairs: [[500, 4], [504, 4], [502, 2], [500, 5], [498, 3], [505, 5]], dp: 1,
  },
  {
    intro: 'The lifetimes of a brand of LED light bulb',
    pop: 'bulbs', above: (v) => `last longer than ${v}`, below: (v) => `last less than ${v}`, between: (a, b) => `last between ${a} and ${b}`,
    one: (v) => `a lifetime of ${v}`, noun: 'lifetime', thing: 'bulb', cert: 'number of hours', unit: 'h', axis: 'Lifetime (h)',
    pairs: [[24000, 2000], [25000, 2500], [22000, 1000], [21000, 1500], [30000, 2500]], dp: 0,
  },
  {
    intro: 'The times it takes employees at a large downtown office to commute to work',
    pop: 'employees', above: (v) => `take longer than ${v} to get to work`, below: (v) => `take less than ${v} to get to work`, between: (a, b) => `take between ${a} and ${b} to get to work`,
    one: (v) => `a commute of ${v}`, noun: 'commute time', cert: 'time', unit: 'min', axis: 'Commute time (min)',
    pairs: [[32, 4], [36, 6], [30, 5], [35, 5], [28, 4], [40, 8]], dp: 1,
  },
  {
    intro: 'The birth masses of babies born at a city hospital',
    pop: 'babies', above: (v) => `have a birth mass greater than ${v}`, below: (v) => `have a birth mass less than ${v}`, between: (a, b) => `have a birth mass between ${a} and ${b}`,
    one: (v) => `a birth mass of ${v}`, noun: 'birth mass', thing: 'baby', cert: 'mass', unit: 'g', axis: 'Birth mass (g)',
    pairs: [[3500, 500], [3300, 550], [3360, 480], [3400, 425], [3450, 575]], dp: 0,
  },
  {
    intro: 'The resting heart rates of adults in a large health study',
    pop: 'adults', above: (v) => `have a resting heart rate above ${v}`, below: (v) => `have a resting heart rate below ${v}`, between: (a, b) => `have a resting heart rate between ${a} and ${b}`,
    one: (v) => `a resting heart rate of ${v}`, noun: 'resting heart rate', cert: 'rate', unit: 'beats/min', axis: 'Heart rate (beats/min)',
    pairs: [[72, 8], [70, 7], [66, 6], [72, 9], [70, 10]], dp: 1,
  },
  {
    intro: 'The lengths of adult rainbow trout in a mountain lake',
    pop: 'trout', above: (v) => `are longer than ${v}`, below: (v) => `are shorter than ${v}`, between: (a, b) => `are between ${a} and ${b} long`,
    one: (v) => `a length of ${v}`, noun: 'length', thing: 'trout', cert: 'length', unit: 'cm', axis: 'Length (cm)',
    pairs: [[40, 5], [36, 4], [42, 6], [45, 5], [39, 3]], dp: 1,
  },
  {
    intro: 'The finishing times in a large 5 km charity fun run',
    pop: 'runners', above: (v) => `take longer than ${v} to finish`, below: (v) => `finish in less than ${v}`, between: (a, b) => `finish with a time between ${a} and ${b}`,
    one: (v) => `a time of ${v}`, noun: 'finishing time', cert: 'time', unit: 'min', axis: 'Finishing time (min)',
    pairs: [[30, 3], [32, 4], [28, 4], [30, 5], [33, 3]], dp: 1,
  },
  {
    intro: 'The masses of bags of flour filled by a machine at a flour mill',
    pop: 'bags', above: (v) => `have a mass greater than ${v}`, below: (v) => `have a mass less than ${v}`, between: (a, b) => `have a mass between ${a} and ${b}`,
    one: (v) => `a mass of ${v}`, noun: 'mass', thing: 'bag', cert: 'mass', unit: 'g', axis: 'Mass (g)',
    pairs: [[2500, 10], [1000, 8], [2000, 16], [2500, 20], [1000, 5]], dp: 1,
  },
  {
    intro: 'The battery lives of a model of smartphone on a full charge',
    pop: 'phones', above: (v) => `have a battery life longer than ${v}`, below: (v) => `have a battery life shorter than ${v}`, between: (a, b) => `have a battery life between ${a} and ${b}`,
    one: (v) => `a battery life of ${v}`, noun: 'battery life', thing: 'phone', cert: 'number of hours', unit: 'h', axis: 'Battery life (h)',
    pairs: [[18, 2], [20, 2], [21, 3], [24, 3], [20, 4]], dp: 1,
  },
];

const val = (ctx: NormCtx, x: number, dp = 4) => u(num(x, dp), ctx.unit);
const unitSp = (ctx: NormCtx) => (ctx.unit ? ` ${ctx.unit}` : '');
function statement(ctx: NormCtx, mu: number, sd: number): string {
  return `${ctx.intro} are normally distributed, with mean $\\mu = ${num(mu)}$${unitSp(ctx)} and standard deviation $\\sigma = ${num(sd)}$${unitSp(ctx)}.`;
}
/** Grid of sensible data values: whole numbers, or multiples of 5 or 50 for large spreads. */
const resolution = (sd: number) => (sd >= 400 ? 50 : sd >= 50 ? 5 : 1);

// ---------------------------------------------------------------------------
// 5.1 Standard deviation
// ---------------------------------------------------------------------------

interface SdCtx {
  intro: (name: string, n: number) => string;
  unit: string;
  suffix?: string;
  center: [number, number];
  spread: [number, number];
  hi?: number;
}

const SD_CTX: SdCtx[] = [
  { intro: (nm, n) => `${nm} timed the bus ride to school on ${n} mornings. The times, in minutes, were`, unit: 'min', suffix: 'min', center: [15, 28], spread: [3, 7] },
  { intro: (nm, n) => `${nm}’s marks on ${n} math quizzes, each out of $20$, were`, unit: '', center: [12, 15], spread: [2, 4], hi: 20 },
  { intro: (_nm, n) => `A downtown food truck counted its lunch-hour customers on ${n} weekdays. The counts were`, unit: 'customers', center: [40, 70], spread: [6, 14] },
  { intro: (_nm, n) => `The resting heart rates, in beats per minute, of ${n} members of a local running club were`, unit: 'beats/min', suffix: 'beats/min', center: [54, 66], spread: [4, 9] },
  { intro: (nm, n) => `${nm} recorded the daily high temperature in a mountain town on ${n} days in May. The temperatures, in degrees Celsius, were`, unit: '°C', suffix: '°C', center: [10, 16], spread: [3, 6] },
  { intro: (_nm, n) => `The masses, in grams, of ${n} apples from a farmers’ market were`, unit: 'g', suffix: 'g', center: [150, 180], spread: [8, 18] },
  { intro: (_nm, n) => `The numbers of push-ups done by ${n} students in a fitness test were`, unit: 'push-ups', center: [22, 34], spread: [5, 10] },
  { intro: (nm, n) => `${nm} works part-time at a local garden centre. The hours worked in ${n} weeks were`, unit: 'h', suffix: 'h', center: [10, 18], spread: [2, 5] },
];

function sdOk(xs: number[], ctx: SdCtx): boolean {
  const sd = popSD(xs);
  return new Set(xs).size >= 4 && xs.every((x) => x >= 0 && x <= (ctx.hi ?? Infinity)) && sd >= 1 && !onEdge(sd, 1);
}

/** Five whole numbers with a whole-number mean. */
function easyData(rng: Rng, ctx: SdCtx): number[] {
  return retry(
    () => {
      const s = rng.int(ctx.spread[0], ctx.spread[1]);
      const m = rng.int(ctx.center[0], ctx.center[1]);
      const devs = [0, 0, 0, 0].map(() => rng.int(-s, s));
      devs.push(-sum(devs));
      return devs.map((d) => m + d);
    },
    (xs) => sdOk(xs, ctx) && Math.max(...xs) - Math.min(...xs) <= 2 * ctx.spread[1],
    600,
  );
}

/** n whole numbers whose mean ends in .0 or .5 (or another single decimal). */
function mediumData(rng: Rng, ctx: SdCtx, n: number): number[] {
  return retry(
    () => {
      const s = rng.int(ctx.spread[0], ctx.spread[1]);
      const m = rng.int(ctx.center[0], ctx.center[1]);
      return Array.from({ length: n }, () => m + rng.int(-s, s));
    },
    (xs) => sdOk(xs, ctx) && isWhole((sum(xs) * 10) / n),
    800,
  );
}

const SD_HINTS = [
  'Find the mean first. Then find how far each value is from the mean.',
  'Population standard deviation: $\\sigma = \\sqrt{\\dfrac{\\Sigma(x - \\mu)^2}{N}}$. Square each deviation, add the squares, divide by $N$ (the number of values), then take the square root.',
];

function sdSolution(xs: number[], unit: string): string[] {
  const n = xs.length;
  const m = mean(xs);
  const devs = xs.map((x) => roundTo(x - m, 4));
  const sq = devs.map((d) => roundTo(d * d, 4));
  const ss = roundTo(sum(sq), 4);
  const sd = Math.sqrt(ss / n);
  return [
    `Mean: $\\mu = \\dfrac{${xs.map((x) => num(x)).join(' + ')}}{${n}} = \\dfrac{${num(sum(xs))}}{${n}} = ${num(m)}$`,
    `Deviations from the mean, $x - \\mu$: $${devs.map((d) => num(d)).join(',\\ ')}$`,
    `Squared deviations, $(x - \\mu)^2$: $${sq.map((q) => num(q)).join(',\\ ')}$. Their sum is $${num(ss)}$.`,
    `Divide by $N = ${n}$, then take the square root: $\\sigma = \\sqrt{\\dfrac{${num(ss)}}{${n}}} ${eq(sd, 2)}$`,
    `The mean is ${u(isWhole(m) ? num(m) : fixed(m, 1), unit)} and the standard deviation is about ${u(fixed(sd, 1), unit)}.`,
  ];
}

interface FreqCtx {
  intro: string;
  xs: number[];
  cat: string;
  val: string;
  unit: string;
}

const FREQ_CTX: FreqCtx[] = [
  { intro: 'A ringette team recorded the number of goals it scored in each game of its season.', xs: [0, 1, 2, 3, 4, 5, 6], cat: 'Goals in a game', val: 'Number of games', unit: 'goals' },
  { intro: 'A survey asked Grade 11 students at a school in a northern town how many siblings they have.', xs: [0, 1, 2, 3, 4, 5], cat: 'Number of siblings', val: 'Number of students', unit: 'siblings' },
  { intro: 'A traffic study counted the number of people in each car that passed a checkpoint on a busy city freeway.', xs: [1, 2, 3, 4, 5, 6], cat: 'People in the car', val: 'Number of cars', unit: 'people' },
  { intro: 'The members of a local book club reported how many books each of them read over the summer.', xs: [2, 3, 4, 5, 6, 7, 8], cat: 'Books read', val: 'Number of members', unit: 'books' },
  { intro: 'A Grade 11 class reported how many hours of homework each student did on Monday night.', xs: [0, 1, 2, 3, 4], cat: 'Hours of homework', val: 'Number of students', unit: 'h' },
  { intro: 'A small-town bakery recorded how many loaves of bread each customer bought on Saturday morning.', xs: [1, 2, 3, 4, 5], cat: 'Loaves bought', val: 'Number of customers', unit: 'loaves' },
];

function freqItem(rng: Rng): Out {
  const ctx = rng.pick(FREQ_CTX);
  const fs = retry(
    () => {
      const c = rng.int(1, ctx.xs.length - 2);
      const peak = rng.int(6, 10);
      const drop = rng.int(1, 3);
      return ctx.xs.map((_, i) => Math.max(1, peak - drop * Math.abs(i - c) + rng.int(-1, 1)));
    },
    (f) => {
      const n = sum(f);
      const m = sum(f.map((fi, i) => fi * ctx.xs[i])) / n;
      const ss = sum(f.map((fi, i) => fi * (ctx.xs[i] - m) ** 2));
      return n >= 15 && n <= 45 && !onEdge(m, 1) && !onEdge(Math.sqrt(ss / n), 1);
    },
    600,
  );
  const N = sum(fs);
  const sfx = sum(fs.map((f, i) => f * ctx.xs[i]));
  const m = sfx / N;
  const ss = sum(fs.map((f, i) => f * (ctx.xs[i] - m) ** 2));
  const sd = Math.sqrt(ss / N);
  const figure: BarChartFigure = { type: 'barChart', categories: ctx.xs.map(String), values: fs, valueLabel: ctx.val, categoryLabel: ctx.cat, showValues: true };
  const m2 = fixed(m, 2);
  return {
    prompt: `${ctx.intro} The bar graph shows the frequency of each value. Treat the data as a population. Find the mean, $\\mu$, and the population standard deviation, $\\sigma$, each to the nearest tenth.`,
    figure,
    parts: [numPart(m, { label: 'Mean $\\mu$', decimals: 1 }), numPart(sd, { label: 'Standard deviation $\\sigma$', decimals: 1 })],
    hints: [
      'Each bar tells you how many times a value occurs (its frequency, $f$). The number of data values is $N = \\Sigma f$.',
      'Mean: $\\mu = \\dfrac{\\Sigma fx}{N}$. Standard deviation: $\\sigma = \\sqrt{\\dfrac{\\Sigma f(x - \\mu)^2}{N}}$. A calculator’s one-variable statistics with a frequency list also works.',
    ],
    solution: [
      `Number of data values: $N = ${fs.join(' + ')} = ${N}$`,
      `Sum of the data: $\\Sigma fx = ${fs.map((f, i) => `${f}(${ctx.xs[i]})`).join(' + ')} = ${sfx}$`,
      `Mean: $\\mu = \\dfrac{${sfx}}{${N}} ${eq(m, 2)}$`,
      `Using the unrounded mean: $\\Sigma f(x - \\mu)^2 = ${fs.map((f, i) => `${f}(${ctx.xs[i]} - ${m2})^2`).join(' + ')} ${eq(ss, 2)}$`,
      `$\\sigma = \\sqrt{\\dfrac{${fixed(ss, 2)}}{${N}}} ${eq(sd, 2)}$`,
      `The mean is about $${fixed(m, 1)}$ ${ctx.unit} and the standard deviation is about $${fixed(sd, 1)}$ ${ctx.unit}.`,
    ],
  };
}

const standardDeviation = skill({
  id: 'm202-standard-deviation',
  name: 'Mean and standard deviation',
  description: 'Find the mean and population standard deviation of a data set or a frequency distribution.',
  outcomes: ['S1'],
  lessonId: 'm202-5-1',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return freqItem(rng);
    const ctx = rng.pick(SD_CTX);
    const n = d === 1 ? 5 : rng.pick([6, 8]);
    const xs = d === 1 ? easyData(rng, ctx) : mediumData(rng, ctx, n);
    const m = mean(xs);
    const sd = popSD(xs);
    return {
      prompt: `${ctx.intro(rng.pick(NAMES), n)} ${listTex(xs)}. Treat the data as a population. Find the mean, $\\mu$, and the population standard deviation, $\\sigma$. Give each answer to the nearest tenth.`,
      parts: [numPart(m, { label: 'Mean $\\mu$', decimals: 1, suffix: ctx.suffix }), numPart(sd, { label: 'Standard deviation $\\sigma$', decimals: 1, suffix: ctx.suffix })],
      hints: SD_HINTS,
      solution: sdSolution(xs, ctx.unit),
    };
  },
});

// ---------------------------------------------------------------------------
// 5.1 Comparing spread
// ---------------------------------------------------------------------------

interface PairCtx {
  setting: (a: string, b: string) => string;
  groups: (rng: Rng) => [string, string];
  consistent: string;
  varied: string;
  unit: string;
  /** Short unit for tables. */
  short: string;
  mu: [number, number];
  sd: [number, number];
  data: { center: [number, number]; half: [number, number]; minDiff: number; hi?: number };
}

const twoNames = (rng: Rng) => rng.sample(NAMES, 2) as [string, string];

const PAIRS: PairCtx[] = [
  {
    setting: (a, b) => `${a} and ${b} play basketball for a high school team. The data are their points per game.`,
    groups: twoNames, consistent: 'Who scores more consistently?', varied: 'Whose scoring varies more from game to game?',
    unit: 'points', short: 'points', mu: [10, 22], sd: [1.5, 7], data: { center: [10, 20], half: [5, 9], minDiff: 1 },
  },
  {
    setting: () => 'A bottling plant has two machines that fill 500 mL bottles of juice. The data are the volumes, in millilitres, of bottles from each machine.',
    groups: () => ['Machine A', 'Machine B'], consistent: 'Which machine fills bottles more consistently?', varied: 'Which machine’s fill volumes vary more?',
    unit: 'mL', short: 'mL', mu: [498, 503], sd: [0.8, 4], data: { center: [499, 501], half: [4, 7], minDiff: 1 },
  },
  {
    setting: () => 'A commuter in a city suburb can take either of two bus routes to work. The data are travel times, in minutes, on several days.',
    groups: () => ['Route 1', 'Route 2'], consistent: 'Which route has more consistent travel times?', varied: 'Which route’s travel times vary more?',
    unit: 'min', short: 'min', mu: [26, 40], sd: [2, 9], data: { center: [28, 38], half: [5, 10], minDiff: 1 },
  },
  {
    setting: (a, b) => `A student compared the daily high temperatures in April in ${a} and ${b}. The data are in degrees Celsius.`,
    groups: (rng) => rng.pick([['Riverton', 'Lakeside'], ['Brookfield', 'Hillcrest'], ['Pinewood', 'Maple Falls'], ['Stonebridge', 'Westbury']] as Array<[string, string]>),
    consistent: 'Which city had more consistent daily highs?', varied: 'Which city’s daily highs varied more?',
    unit: '°C', short: '°C', mu: [8, 15], sd: [2, 7], data: { center: [9, 14], half: [5, 9], minDiff: 1 },
  },
  {
    setting: (a, b) => `${a} and ${b} are in the same Grade 11 math class. The data are their unit test marks, in percent.`,
    groups: twoNames, consistent: 'Whose marks are more consistent?', varied: 'Whose marks vary more?',
    unit: '%', short: '%', mu: [65, 88], sd: [3, 12], data: { center: [70, 82], half: [7, 12], minDiff: 1, hi: 100 },
  },
  {
    setting: () => 'A machine shop in an industrial park orders parts from two suppliers and records how many days each delivery takes.',
    groups: () => ['Supplier A', 'Supplier B'], consistent: 'Which supplier’s delivery times are more consistent?', varied: 'Which supplier’s delivery times vary more?',
    unit: 'days', short: 'days', mu: [3, 7], sd: [0.5, 2.5], data: { center: [6, 8], half: [3, 5], minDiff: 0.5 },
  },
];

const pairU = (ctx: PairCtx, x: string) => u(x, ctx.unit);

function compareStatsSolution(names: [string, string], sets: [number[], number[]]): string[] {
  return sets.map((xs, i) => `${names[i]}: $\\mu ${eq(mean(xs), 2)}$, $\\sigma ${eq(popSD(xs), 2)}$ (range $${num(Math.max(...xs))} - ${num(Math.min(...xs))} = ${num(Math.max(...xs) - Math.min(...xs))}$)`);
}

const compareSpread = skill({
  id: 'm202-compare-spread',
  name: 'Comparing spread',
  description: 'Compare two data sets using their means and standard deviations, and decide which is more consistent.',
  outcomes: ['S1'],
  lessonId: 'm202-5-1',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    const ctx = rng.pick(PAIRS);
    const g = ctx.groups(rng);
    const askConsistent = rng.chance(0.5);
    const question = askConsistent ? ctx.consistent : ctx.varied;
    const HINTS = [
      'Standard deviation measures spread: how far the data typically are from the mean.',
      'A smaller standard deviation means the data are closer together, so the results are more consistent. The mean tells you the typical value, not the spread.',
    ];
    if (d === 1) {
      const [s1, s2] = retry(() => [rng.float(ctx.sd[0], ctx.sd[1], 1), rng.float(ctx.sd[0], ctx.sd[1], 1)], ([a, b]) => Math.abs(a - b) >= 0.4 * Math.max(1, ctx.sd[0]));
      const [m1, m2] = retry(() => [rng.float(ctx.mu[0], ctx.mu[1], 1), rng.float(ctx.mu[0], ctx.mu[1], 1)], ([a, b]) => Math.abs(a - b) >= 0.3);
      const small = s1 < s2 ? g[0] : g[1];
      const large = s1 < s2 ? g[1] : g[0];
      const high = m1 > m2 ? g[0] : g[1];
      const low = m1 > m2 ? g[1] : g[0];
      const right = askConsistent ? `**${small}** (smaller standard deviation)` : `**${large}** (larger standard deviation)`;
      const wrong = askConsistent ? `**${large}** (larger standard deviation)` : `**${small}** (smaller standard deviation)`;
      const tab = (x: number) => `${fixed(x, 1)}${ctx.short === '%' || ctx.short === '°C' ? '' : ' '}${ctx.short}`;
      return {
        prompt: `${ctx.setting(g[0], g[1])} The table shows the mean and standard deviation of each data set. ${question}`,
        figure: { type: 'table', headers: ['', 'Mean', 'Standard deviation'], rows: [[g[0], tab(m1), tab(s1)], [g[1], tab(m2), tab(s2)]] },
        parts: [part(mc(rng, right, [wrong, `**${high}** (higher mean)`, `**${low}** (lower mean)`]))],
        hints: HINTS,
        solution: [
          `Consistency is about spread, so compare the standard deviations: ${pairU(ctx, fixed(s1, 1))} for ${g[0]} and ${pairU(ctx, fixed(s2, 1))} for ${g[1]}.`,
          `${small}’s data have the smaller standard deviation, so they are closer to their mean.`,
          askConsistent ? `**${small}** is more consistent.` : `**${large}** varies more.`,
        ],
      };
    }
    const dd = ctx.data;
    const inRange = (xs: number[]) => xs.every((x) => x >= 0 && x <= (dd.hi ?? Infinity));
    if (d === 2) {
      // Same mean and same range, different standard deviations.
      const [A, B] = retry(
        () => {
          const m = rng.int(dd.center[0], dd.center[1]);
          const r = rng.int(dd.half[0], dd.half[1]);
          const make = () => {
            const inner = [0, 0, 0].map(() => rng.int(-r + 1, r - 1));
            return rng.shuffle([-r, r, ...inner, -sum(inner)].map((x) => m + x));
          };
          return [make(), make()];
        },
        ([P, Q]) =>
          [P, Q].every((xs) => inRange(xs) && Math.max(...xs) === Math.max(...P) && Math.min(...xs) === Math.min(...P)) &&
          Math.max(...P) - Math.min(...P) === Math.max(...Q) - Math.min(...Q) &&
          Math.abs(popSD(P) - popSD(Q)) >= 0.5,
        800,
      );
      const sA = popSD(A);
      const sB = popSD(B);
      const small = sA < sB ? g[0] : g[1];
      const large = sA < sB ? g[1] : g[0];
      const right = askConsistent ? `**${small}** (smaller standard deviation)` : `**${large}** (larger standard deviation)`;
      const wrong = askConsistent ? `**${large}** (larger standard deviation)` : `**${small}** (smaller standard deviation)`;
      return {
        prompt: `${ctx.setting(g[0], g[1])}\n\n**${g[0]}:** ${listTex(A)}\n\n**${g[1]}:** ${listTex(B)}\n\n${question} Use the population standard deviation.`,
        parts: [part(mc(rng, right, [wrong, 'Neither: the ranges are equal', 'Neither: the means are equal']))],
        hints: [HINTS[0], 'Find the mean, range and standard deviation of each data set. Which measure is different?'],
        solution: [
          ...compareStatsSolution(g, [A, B]),
          'The means and the ranges are the same, but the standard deviations are not. The range uses only the two extreme values; the standard deviation uses every value.',
          askConsistent ? `${small} has the smaller standard deviation, so **${small}** is more consistent.` : `${large} has the larger standard deviation, so **${large}** varies more.`,
        ],
      };
    }
    // d3: interpret both measures together.
    const [A, B] = retry(
      () => {
        const make = () => {
          const m = rng.int(dd.center[0], dd.center[1]);
          const r = rng.int(dd.half[0], dd.half[1]);
          return Array.from({ length: rng.int(6, 8) }, () => m + rng.int(-r, r));
        };
        return [make(), make()];
      },
      ([P, Q]) => inRange(P) && inRange(Q) && Math.abs(mean(P) - mean(Q)) >= dd.minDiff && Math.abs(popSD(P) - popSD(Q)) >= 0.5,
      800,
    );
    const hiMean = mean(A) > mean(B) ? g[0] : g[1];
    const loSd = popSD(A) < popSD(B) ? g[0] : g[1];
    const statementOf = (x: string, y: string) => (x === y ? `${x} has the higher mean and the smaller standard deviation.` : `${x} has the higher mean, and ${y} has the smaller standard deviation.`);
    const other = (x: string) => (x === g[0] ? g[1] : g[0]);
    const right = statementOf(hiMean, loSd);
    return {
      prompt: `${ctx.setting(g[0], g[1])}\n\n**${g[0]}:** ${listTex(A)}\n\n**${g[1]}:** ${listTex(B)}\n\nWhich statement is true? Use the population standard deviation.`,
      parts: [part(mc(rng, right, [statementOf(other(hiMean), loSd), statementOf(hiMean, other(loSd)), statementOf(other(hiMean), other(loSd))]))],
      hints: ['Find the mean and the standard deviation of each data set (one-variable statistics on a calculator is quickest).', 'Compare the means to see which is higher, then compare the standard deviations to see which is smaller.'],
      solution: [
        ...compareStatsSolution(g, [A, B]),
        `${hiMean} has the higher mean (typical value). ${loSd} has the smaller standard deviation, so ${loSd}’s data are more consistent.`,
        `The true statement: ${right}`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 5.2 The normal distribution and the 68–95–99.7 rule
// ---------------------------------------------------------------------------

/** Percent of a normal distribution in each region: below -3, -3 to -2, ..., above 3 standard deviations. */
const BANDS = [0.15, 2.35, 13.5, 34, 34, 13.5, 2.35, 0.15];
/** Percent between a and b standard deviations from the mean; -4 and 4 stand for no limit. */
const rulePct = (a: number, b: number) => roundTo(sum(BANDS.slice(a + 4, b + 4)), 2);
const ruleSum = (a: number, b: number) => {
  const parts = BANDS.slice(a + 4, b + 4);
  return parts.length === 1 ? `$${num(parts[0])}\\%$` : `$${parts.map((p) => `${num(p)}\\%`).join(' + ')} = ${num(rulePct(a, b))}\\%$`;
};
function position(ctx: NormCtx, mu: number, sd: number, k: number): string {
  const x = mu + k * sd;
  if (k === 0) return `${val(ctx, x)} is the mean.`;
  const n = Math.abs(k);
  return `${val(ctx, x)} is $${n}$ standard deviation${n === 1 ? '' : 's'} ${k > 0 ? 'above' : 'below'} the mean: $${num(mu)} ${k > 0 ? '+' : '-'} ${n}(${num(sd)}) = ${num(x)}$.`;
}
function regionClause(ctx: NormCtx, mu: number, sd: number, a: number, b: number): string {
  if (a === -4) return ctx.below(val(ctx, mu + b * sd));
  if (b === 4) return ctx.above(val(ctx, mu + a * sd));
  return ctx.between(val(ctx, mu + a * sd), val(ctx, mu + b * sd));
}

const RULE_HINTS = [
  'Find how many standard deviations each value is from the mean, and sketch the regions on the normal curve.',
  'The regions from the mean outward hold about $34\\%$, $13.5\\%$, $2.35\\%$ and $0.15\\%$ on each side, so $68\\%$ is within $1\\sigma$, $95\\%$ within $2\\sigma$ and $99.7\\%$ within $3\\sigma$.',
];

const SHAPES: Record<'normal' | 'right' | 'left' | 'flat' | 'twoPeaks', number[][]> = {
  normal: [[1, 4, 10, 14, 10, 4, 1], [2, 5, 11, 15, 11, 5, 2], [1, 3, 8, 12, 9, 4, 1], [2, 6, 12, 16, 11, 5, 2], [1, 4, 9, 13, 10, 3, 1]],
  right: [[5, 14, 12, 7, 4, 2, 1], [8, 15, 10, 6, 3, 2, 1], [3, 12, 14, 8, 5, 3, 1]],
  left: [[1, 2, 4, 7, 12, 14, 5], [1, 2, 3, 6, 10, 15, 8], [1, 3, 5, 8, 14, 12, 3]],
  flat: [[9, 8, 10, 9, 8, 10, 9], [8, 9, 9, 8, 9, 9, 8], [10, 9, 8, 9, 10, 9, 8]],
  twoPeaks: [[3, 10, 12, 5, 11, 13, 4], [2, 11, 9, 4, 10, 12, 3], [4, 12, 8, 3, 9, 13, 5]],
};
const SHAPE_WORDS = { right: 'is skewed right (a long tail on the right)', left: 'is skewed left (a long tail on the left)', flat: 'is flat, with no peak in the middle', twoPeaks: 'has two peaks' };

function histogramItem(rng: Rng): Out {
  const start = rng.pick([10, 20, 40, 50, 150]);
  const w = rng.pick([2, 5, 10]);
  const cats = Array.from({ length: 7 }, (_, i) => `${start + i * w}–${start + (i + 1) * w}`);
  const others = rng.sample(['right', 'left', 'flat', 'twoPeaks'] as const, 3);
  const chart = (values: number[]): Figure => ({ type: 'barChart', categories: cats, values, valueLabel: 'Frequency' });
  const options = [
    { md: '', figure: chart(rng.pick(SHAPES.normal)), correct: true },
    ...others.map((k) => ({ md: '', figure: chart(rng.pick(SHAPES[k])) })),
  ];
  return {
    prompt: 'A researcher made a histogram of each of four data sets. Which data set could be approximately **normally distributed**?',
    parts: [part(mcFigures(rng, options))],
    hints: ['A normal distribution has a bell shape.', 'Look for one peak in the middle, with the bars falling away evenly on both sides.'],
    solution: [
      'A normally distributed data set is symmetric and bell-shaped: most values are near the mean, in the middle, and fewer values are far from it on either side.',
      `The other histograms are not bell-shaped: one ${others.map((k) => SHAPE_WORDS[k]).join(', one ')}.`,
      'The histogram with one peak in the middle and bars that fall away evenly on both sides could be approximately normal.',
    ],
  };
}

const STUDY = [
  { who: 'the reaction times of 200 drivers in a driving simulator', who2: 'reaction times' },
  { who: 'the masses of 300 bags of carrots packed at a vegetable farm', who2: 'masses' },
  { who: 'the daily numbers of visitors to a small-town museum over 250 days', who2: 'visitor counts' },
  { who: 'the heights of 400 spruce seedlings at a tree nursery in the north', who2: 'heights' },
  { who: 'the wait times of 500 patients at a busy city walk-in clinic', who2: 'wait times' },
];

function normalityItem(rng: Rng): Out {
  const s = rng.pick(STUDY);
  const isNormal = rng.chance(0.5);
  const [p1, p2, p3] = isNormal
    ? [rng.int(66, 70), rng.int(94, 96), rng.pick([99, 99.5, 100])]
    : rng.pick([[rng.int(50, 57), rng.int(85, 90), 100], [rng.int(79, 84), rng.int(90, 93), rng.pick([97, 98])], [rng.int(58, 60), rng.int(98, 100), 100]]);
  const yes = 'Yes. The percents are close to $68\\%$, $95\\%$ and $99.7\\%$.';
  const no = 'No. The percents are not close to $68\\%$, $95\\%$ and $99.7\\%$.';
  const exact = 'No. For normal data the percents must be exactly $68\\%$, $95\\%$ and $99.7\\%$.';
  const all = 'Yes. Every data set has a mean and a standard deviation, so every data set is normal.';
  return {
    prompt: `A researcher studied ${s.who}. The table shows the percent of the data within 1, 2 and 3 standard deviations of the mean. Is the data approximately normally distributed?`,
    figure: { type: 'table', headers: ['Interval', 'Percent of the data'], rows: [['Within 1 standard deviation', `${p1}%`], ['Within 2 standard deviations', `${p2}%`], ['Within 3 standard deviations', `${p3}%`]] },
    parts: [part(fixedChoice([yes, no, exact, all], isNormal ? 0 : 1))],
    hints: ['Compare the table with the 68–95–99.7 rule.', 'Real data never match the rule exactly. Data is approximately normal when the percents are close to $68\\%$, $95\\%$ and $99.7\\%$.'],
    solution: [
      'For a normal distribution, about $68\\%$ of the data is within $1\\sigma$ of the mean, $95\\%$ within $2\\sigma$ and $99.7\\%$ within $3\\sigma$.',
      `Here the percents are $${p1}\\%$, $${p2}\\%$ and $${num(p3)}\\%$.`,
      isNormal
        ? `These are close to the rule (real data never match it exactly), so the ${s.who2} are approximately normally distributed.`
        : `$${p1}\\%$ is far from $68\\%$, so the ${s.who2} are not approximately normally distributed.`,
    ],
  };
}

const normalPercent = skill({
  id: 'm202-normal-percent',
  name: 'The 68–95–99.7 rule',
  description: 'Use the 68–95–99.7 rule to find percents of normally distributed data, and decide whether data is approximately normal.',
  outcomes: ['S1'],
  lessonId: 'm202-5-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1 && rng.chance(0.25)) return histogramItem(rng);
    if (d === 2 && rng.chance(0.3)) return normalityItem(rng);
    const ctx = rng.pick(NORM);
    const [mu, sd] = rng.pick(ctx.pairs);
    if (d === 3 && rng.chance(0.4)) {
      // Work backwards from the rule to the mean and standard deviation.
      const k = rng.pick([1, 2, 3]);
      const pct = [68, 95, 99.7][k - 1];
      const lo = mu - k * sd;
      const hi = mu + k * sd;
      return {
        prompt: `${ctx.intro} are normally distributed. About ${pctTex(pct)} of the ${ctx.pop} ${ctx.between(val(ctx, lo), val(ctx, hi))}. Find the mean and the standard deviation.`,
        parts: [numPart(mu, { label: 'Mean $\\mu$', suffix: ctx.unit || undefined }), numPart(sd, { label: 'Standard deviation $\\sigma$', suffix: ctx.unit || undefined })],
        hints: [`About ${pctTex(pct)} of normal data is within $${k}$ standard deviation${k > 1 ? 's' : ''} of the mean, and the mean is in the middle.`, `The interval from ${val(ctx, lo)} to ${val(ctx, hi)} is $${2 * k}$ standard deviations wide.`],
        solution: [
          `The mean is halfway between the ends: $\\mu = \\dfrac{${num(lo)} + ${num(hi)}}{2} = ${num(mu)}$`,
          `About ${pctTex(pct)} is within $${k}$ standard deviation${k > 1 ? 's' : ''} of the mean, so the interval is $${2 * k}\\sigma$ wide: $${2 * k}\\sigma = ${num(hi)} - ${num(lo)} = ${num(hi - lo)}$, so $\\sigma = ${num(sd)}$.`,
          `The mean is ${val(ctx, mu)} and the standard deviation is ${val(ctx, sd)}.`,
        ],
        answerDisplay: `$\\mu = ${num(mu)}$, $\\sigma = ${num(sd)}$`,
      };
    }
    let a: number;
    let b: number;
    if (d === 1) {
      const k = rng.pick([1, 2, 3]);
      [a, b] = rng.pick([[-k, k], [-k, k], [0, k], [-k, 0]]);
    } else {
      // A region that is not symmetric about the mean (a tail, or between two different distances).
      [a, b] = retry(
        () => {
          const p = rng.int(-4, 3);
          return [p, rng.int(p + 1, 4)];
        },
        ([p, q]) => p !== -q && !(p === -4 && q === 4),
        200,
      );
    }
    const pct = rulePct(a, b);
    const clause = regionClause(ctx, mu, sd, a, b);
    const figure = normalFigure(mu, sd, ctx.axis, [mu + a * sd, mu + b * sd]);
    const steps = [a, b].filter((k) => Math.abs(k) < 4).map((k) => position(ctx, mu, sd, k));
    const regions = `Add the percents of the regions between these values: ${ruleSum(a, b)}`;
    if (d === 3) {
      const N = retry(() => rng.pick([200, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2400]), (n) => !onEdge((n * pct) / 100, 0), 50);
      const count = (N * pct) / 100;
      const whole = isWhole(count);
      return {
        prompt: `${statement(ctx, mu, sd)} Suppose there are $${num(N)}$ ${ctx.pop}. Use the 68–95–99.7 rule to estimate how many of them ${clause}.${whole ? '' : ' Round to the nearest whole number.'}`,
        figure,
        parts: [numPart(roundTo(count, 4), { decimals: whole ? undefined : 0, suffix: ctx.pop })],
        hints: [RULE_HINTS[0], `Find the percent with the 68–95–99.7 rule, then multiply it by $${num(N)}$.`],
        solution: [...steps, regions, `Number: $${num(pct / 100)} \\times ${num(N)} ${eq(count, 2)}$`, `About $${num(Math.round(count))}$ ${ctx.pop} ${clause}.`],
      };
    }
    return {
      prompt: `${statement(ctx, mu, sd)} Use the 68–95–99.7 rule. What percent of the ${ctx.pop} ${clause}?`,
      figure,
      parts: [numPart(pct, { suffix: '%' })],
      hints: RULE_HINTS,
      solution: [...steps, regions, `About ${pctTex(pct)} of the ${ctx.pop} ${clause}.`],
      answerDisplay: pctTex(pct),
    };
  },
});

// ---------------------------------------------------------------------------
// 5.3 Z-scores
// ---------------------------------------------------------------------------

const Z_FORMULA = '$z = \\dfrac{x - \\mu}{\\sigma}$: subtract the mean, then divide by the standard deviation.';
const zText = (z: number) => (exactAt(z, 2) ? num(z, 2) : fixed(z, 2));
function zLine(x: number, mu: number, sd: number): string {
  const z = (x - mu) / sd;
  return `$z = \\dfrac{${num(x)} - ${num(mu)}}{${num(sd)}} = \\dfrac{${num(x - mu)}}{${num(sd)}} ${eq(z, 2)}$`;
}
const owner = (ctx: NormCtx, name: string) => (ctx.thing ? `One ${ctx.thing}’s` : `${name}’s`);

interface CmpCtx {
  setting: (nm: string) => string;
  labels: Array<[string, string]>;
  line: (label: string, nm: string, x: number, mu: number, sd: number) => string;
  ask: (nm: string) => string;
  /** "on the exam", "in the race" */
  prep: string;
  lowerBetter: boolean;
  A: { mu: [number, number]; sd: [number, number] };
  B: { mu: [number, number]; sd: [number, number] };
}

const CMP: CmpCtx[] = [
  {
    setting: (nm) => `${nm} wrote two final exams, each marked out of $100$.`,
    labels: [['chemistry exam', 'English exam'], ['math exam', 'social studies exam'], ['biology exam', 'French exam'], ['physics exam', 'history exam']],
    line: (l, nm, x, mu, sd) => `On the ${l}, ${nm} scored $${x}$. The marks had mean $\\mu = ${mu}$ and standard deviation $\\sigma = ${sd}$.`,
    ask: (nm) => `Compared with the other students who wrote each exam, on which exam did ${nm} do better?`,
    prep: 'on',
    lowerBetter: false,
    A: { mu: [58, 74], sd: [5, 12] },
    B: { mu: [60, 76], sd: [5, 12] },
  },
  {
    setting: (nm) => `${nm} ran two races this summer.`,
    labels: [['5 km trail race', '10 km road race'], ['5 km fun run', '10 km city race']],
    line: (l, nm, x, mu, sd) => `In the ${l}, ${nm}’s time was $${x}$ min. The times had mean $\\mu = ${mu}$ min and standard deviation $\\sigma = ${sd}$ min.`,
    ask: (nm) => `Compared with the other runners in each race, in which race did ${nm} do better?`,
    prep: 'in',
    lowerBetter: true,
    A: { mu: [25, 31], sd: [2, 4] },
    B: { mu: [52, 62], sd: [4, 8] },
  },
  {
    setting: (nm) => `${nm} entered two contests: a math contest scored out of $150$ and a science contest scored out of $60$.`,
    labels: [['math contest', 'science contest']],
    line: (l, nm, x, mu, sd) => `In the ${l}, ${nm} scored $${x}$. The scores had mean $\\mu = ${mu}$ and standard deviation $\\sigma = ${sd}$.`,
    ask: (nm) => `Compared with the other students in each contest, in which contest did ${nm} do better?`,
    prep: 'in',
    lowerBetter: false,
    A: { mu: [70, 95], sd: [10, 18] },
    B: { mu: [28, 40], sd: [4, 8] },
  },
];

function compareItem(rng: Rng): Out {
  const ctx = rng.pick(CMP);
  const [la, lb] = rng.pick(ctx.labels);
  const nm = rng.pick(NAMES);
  const wantTrap = rng.chance(0.7);
  const make = (r: { mu: [number, number]; sd: [number, number] }) => {
    const mu = rng.int(r.mu[0], r.mu[1]);
    const sd = rng.int(r.sd[0], r.sd[1]);
    const z = rng.float(0.3, 2.3, 2) * (ctx.lowerBetter ? -1 : 1);
    return { mu, sd, x: Math.round(mu + z * sd) };
  };
  const [A, B] = retry(
    () => [make(ctx.A), make(ctx.B)],
    ([p, q]) => {
      const zp = (p.x - p.mu) / p.sd;
      const zq = (q.x - q.mu) / q.sd;
      const ok = Math.abs(zp - zq) >= 0.15 && Math.abs(zp) >= 0.2 && Math.abs(zq) >= 0.2 && !onEdge(zp, 2) && !onEdge(zq, 2);
      // A trap: the result with more raw units past the mean has the weaker z-score.
      const trap = Math.abs(p.x - p.mu) > Math.abs(q.x - q.mu) !== Math.abs(zp) > Math.abs(zq);
      return ok && (!wantTrap || trap);
    },
    600,
  );
  const zA = (A.x - A.mu) / A.sd;
  const zB = (B.x - B.mu) / B.sd;
  const aBetter = ctx.lowerBetter ? zA < zB : zA > zB;
  const best = aBetter ? la : lb;
  return {
    prompt: `${ctx.setting(nm)} ${ctx.line(la, nm, A.x, A.mu, A.sd)} ${ctx.line(lb, nm, B.x, B.mu, B.sd)} Find each z-score to the nearest hundredth. ${ctx.ask(nm)}`,
    parts: [
      numPart(zA, { label: `$z$ for the ${la}`, decimals: 2 }),
      numPart(zB, { label: `$z$ for the ${lb}`, decimals: 2 }),
      part(fixedChoice([`The ${la}`, `The ${lb}`, 'Both equally well', 'They cannot be compared, because the means and standard deviations are different'], aBetter ? 0 : 1), { label: 'Better result' }),
    ],
    hints: [Z_FORMULA, ctx.lowerBetter ? 'For race times, a lower time is better, so the more negative z-score is the better result.' : 'The z-score shows how many standard deviations a result is above the mean, so the greater z-score is the better result.'],
    solution: [
      `${cap(la)}: ${zLine(A.x, A.mu, A.sd)}`,
      `${cap(lb)}: ${zLine(B.x, B.mu, B.sd)}`,
      ctx.lowerBetter
        ? `A lower time is better. The ${best} time is further below its mean, measured in standard deviations ($z ${eq(Math.min(zA, zB), 2)}$).`
        : `The ${best} result is further above its mean, measured in standard deviations ($z ${eq(Math.max(zA, zB), 2)}$).`,
      `Compared with the others, ${nm} did better ${ctx.prep} the **${best}**. Z-scores let us compare results from distributions with different means and standard deviations.`,
    ],
  };
}

const zScore = skill({
  id: 'm202-z-score',
  name: 'Z-scores',
  description: 'Find and interpret a z-score, find a value from its z-score, and compare results from different distributions.',
  outcomes: ['S1'],
  lessonId: 'm202-5-3',
  calculator: true,
  gen(rng, d) {
    if (d === 3 && rng.chance(0.5)) return compareItem(rng);
    const ctx = rng.pick(NORM);
    const [mu, sd] = rng.pick(ctx.pairs);
    const name = rng.pick(NAMES);
    if (d === 1) {
      const z = retry(() => rng.pick([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5]) * rng.sign(), (zz) => isWhole(zz * sd / resolution(sd)), 100);
      const x = mu + z * sd;
      return {
        prompt: `${statement(ctx, mu, sd)} Find the z-score for ${ctx.one(val(ctx, x))}.`,
        parts: [numPart(z, { label: '$z =$' })],
        hints: [Z_FORMULA, `Here $x = ${num(x)}$, $\\mu = ${num(mu)}$ and $\\sigma = ${num(sd)}$.`],
        solution: [
          '$z = \\dfrac{x - \\mu}{\\sigma}$',
          zLine(x, mu, sd),
          `The z-score is $${num(z)}$: ${val(ctx, x)} is $${num(Math.abs(z))}$ standard deviation${Math.abs(z) === 1 ? '' : 's'} ${z > 0 ? 'above' : 'below'} the mean.`,
        ],
        answerDisplay: `$z = ${num(z)}$`,
      };
    }
    if (d === 2) {
      const res = resolution(sd);
      const x = retry(
        () => mu + res * rng.int(Math.ceil((-2.8 * sd) / res), Math.floor((2.8 * sd) / res)),
        (xx) => Math.abs(xx - mu) >= 0.3 * sd && !onEdge((xx - mu) / sd, 2),
        200,
      );
      const z = (x - mu) / sd;
      const zs = zText(Math.abs(z));
      const about = exactAt(z, 2) ? '' : 'about ';
      const dir = z > 0 ? 'above' : 'below';
      const opp = z > 0 ? 'below' : 'above';
      const v = val(ctx, x);
      const right = `${v} is ${about}$${zs}$ standard deviations ${dir} the mean.`;
      return {
        prompt: `${statement(ctx, mu, sd)} Find the z-score for ${ctx.one(v)}, to the nearest hundredth. Then choose what it means.`,
        parts: [
          numPart(z, { label: '$z =$', decimals: 2 }),
          part(mc(rng, right, [`${v} is ${about}$${zs}$ standard deviations ${opp} the mean.`, `${v} is ${about}${u(zs, ctx.unit || 'marks')} ${dir} the mean.`, `${v} is ${about}$${zs}\\%$ ${dir} the mean.`]), { label: 'Meaning' }),
        ],
        hints: [Z_FORMULA, 'A z-score counts standard deviations, not units or percents. A positive z-score is above the mean; a negative one is below.'],
        solution: [zLine(x, mu, sd), `The z-score is ${z > 0 ? 'positive' : 'negative'}, so the value is ${dir} the mean.`, `$z ${eq(z, 2)}$: ${right}`],
      };
    }
    // d3: rearrange the formula to find the value.
    const z = retry(() => rng.pick([0.4, 0.6, 0.8, 1.2, 1.4, 1.6, 1.8, 2.2, 2.4, 0.35, 0.65, 1.15, 1.35, 1.85, 2.15, 2.45]) * rng.sign(), (zz) => !onEdge(mu + zz * sd, 1), 100);
    const x = roundTo(mu + z * sd, 4);
    const whole = isWhole(x);
    return {
      prompt: `${statement(ctx, mu, sd)} ${owner(ctx, name)} ${ctx.noun} has a z-score of $${num(z)}$. What is the ${ctx.noun}?${whole ? '' : ' Round to the nearest tenth if necessary.'}`,
      parts: [numPart(x, { decimals: whole ? undefined : 1, suffix: ctx.unit || undefined })],
      hints: ['Rearrange $z = \\dfrac{x - \\mu}{\\sigma}$ to solve for $x$.', '$x = \\mu + z\\sigma$. A negative z-score gives a value below the mean.'],
      solution: [
        'Multiply both sides of $z = \\dfrac{x - \\mu}{\\sigma}$ by $\\sigma$, then add $\\mu$: $x = \\mu + z\\sigma$',
        `$x = ${num(mu)} + (${num(z)})(${num(sd)}) ${eq(x, 2)}$`,
        `The ${ctx.noun} is ${exactAt(x, 1) ? '' : 'about '}${val(ctx, whole ? x : roundTo(x, 1), 1)}.`,
      ],
      answerDisplay: val(ctx, whole ? x : roundTo(x, 1), 1),
    };
  },
});

// ---------------------------------------------------------------------------
// 5.3 Areas under the normal curve
// ---------------------------------------------------------------------------

const TABLE_NOTE = 'Use a z-score table or technology. Round z-scores to two decimal places before you use the table.';
const areaTex = (a: number) => fixed(a, 4);

/** A percent answer to the nearest tenth that accepts both table and technology answers. */
function pctAreaPart(table: number, exact: number): Part {
  return { suffix: '%', answer: { kind: 'numeric', value: roundTo(table, 6), decimals: 1, tolerance: roundTo(Math.abs(table - exact) + 0.06, 6) } };
}

function zStep(ctx: NormCtx, x: number, mu: number, sd: number): string {
  const z = (x - mu) / sd;
  return `For ${val(ctx, x)}: ${zLine(x, mu, sd)}${exactAt(z, 2) ? '' : `, so use $z = ${fixed(z, 2)}$`}.`;
}

function pickX(rng: Rng, mu: number, sd: number, zlo: number, zhi: number, exact: boolean): number {
  const res = resolution(sd);
  return retry(
    () => mu + res * rng.sign() * rng.int(Math.ceil((zlo * sd) / res), Math.floor((zhi * sd) / res)),
    (x) => !exact || exactAt((x - mu) / sd, 2),
    300,
  );
}

const zArea = skill({
  id: 'm202-z-area',
  name: 'Percents from z-scores',
  description: 'Use z-scores and a z-score table to find the percent of data below, above or between values, and find a value from a percentile.',
  outcomes: ['S1'],
  lessonId: 'm202-5-3',
  calculator: true,
  gen(rng, d) {
    const ctx = rng.pick(NORM);
    const [mu, sd] = rng.pick(ctx.pairs);
    const kind = d === 1 ? rng.pick(['below', 'above'] as const) : d === 2 ? rng.pick(['below', 'above', 'between', 'between'] as const) : rng.pick(['percentile', 'percentile', 'count'] as const);
    if (kind === 'percentile') {
      const p = rng.pick([1, 10, 15, 20, 25, 30, 40]);
      const top = rng.chance(0.5);
      const left = top ? 1 - p / 100 : p / 100;
      const zt = tableZ(left);
      const ze = invNormal(left);
      const x = mu + zt * sd;
      const dp = ctx.dp;
      const tol = Math.max(Math.abs(zt - ze), 0.005) * sd + 0.6 * 10 ** -dp;
      const cert = `a certain ${ctx.cert}`;
      const ans = u(fixed(x, dp), ctx.unit);
      return {
        prompt: `${statement(ctx, mu, sd)} ${cap(pctTex(p))} of the ${ctx.pop} ${top ? ctx.above(cert) : ctx.below(cert)}. What is that ${ctx.cert}? Use a z-score table or technology, and round to the nearest ${dp ? 'tenth' : 'whole number'}.`,
        figure: normalFigure(mu, sd, ctx.axis),
        parts: [{ suffix: ctx.unit || undefined, answer: { kind: 'numeric', value: roundTo(x, 6), decimals: dp, tolerance: roundTo(tol, 6) } }],
        hints: [
          'A z-score table gives the area to the **left** of $z$. Find the area to the left of the value you want, then look for it inside the table.',
          'Read the z-score for that area, then use $x = \\mu + z\\sigma$.',
        ],
        solution: [
          top ? `The top $${p}\\%$ is to the right, so the area to the left of the value is $1 - ${num(p / 100)} = ${num(left)}$.` : `The area to the left of the value is $${num(left)}$.`,
          `In the table, the area closest to $${areaTex(left)}$ is $${areaTex(tableArea(zt))}$, at $z = ${fixed(zt, 2)}$. (Technology gives $z \\approx ${fixed(ze, 4)}$.)`,
          `$x = \\mu + z\\sigma = ${num(mu)} + (${fixed(zt, 2)})(${num(sd)}) ${eq(x, 2)}$`,
          `The ${ctx.cert} is about ${ans}.`,
        ],
        answerDisplay: ans,
      };
    }
    if (kind === 'below' || kind === 'above') {
      const x = pickX(rng, mu, sd, d === 1 ? 0.25 : 0.2, d === 1 ? 2.5 : 2.9, d === 1);
      const z = (x - mu) / sd;
      const A = tableArea(z);
      const below = kind === 'below';
      const table = 100 * (below ? A : 1 - A);
      const exact = 100 * (below ? normalCdf(z) : 1 - normalCdf(z));
      const clause = below ? ctx.below(val(ctx, x)) : ctx.above(val(ctx, x));
      return {
        prompt: `${statement(ctx, mu, sd)} What percent of the ${ctx.pop} ${clause}? ${TABLE_NOTE} Give the percent to the nearest tenth.`,
        figure: normalFigure(mu, sd, ctx.axis, below ? [mu - 4 * sd, x] : [x, mu + 4 * sd]),
        parts: [pctAreaPart(table, exact)],
        hints: [Z_FORMULA, below ? 'The table gives the area to the left of $z$, which is the fraction of the data below the value.' : 'The table gives the area to the left of $z$. The area to the right is $1$ minus that area.'],
        solution: [
          zStep(ctx, x, mu, sd),
          `From the table, the area to the left of $z = ${fixed(z, 2)}$ is $${areaTex(A)}$.`,
          ...(below ? [] : [`The area to the right is $1 - ${areaTex(A)} = ${areaTex(1 - A)}$.`]),
          `About $${fixed(table, 1)}\\%$ of the ${ctx.pop} ${clause}.`,
        ],
      };
    }
    // between (d2), or a count between two values (d3)
    const [x1, x2] = retry(
      () => [pickX(rng, mu, sd, 0.2, 2.6, false), pickX(rng, mu, sd, 0.2, 2.6, false)].sort((p, q) => p - q),
      ([p, q]) => q - p >= 0.5 * sd,
      200,
    );
    const z1 = (x1 - mu) / sd;
    const z2 = (x2 - mu) / sd;
    const A1 = tableArea(z1);
    const A2 = tableArea(z2);
    const table = 100 * (A2 - A1);
    const exact = 100 * (normalCdf(z2) - normalCdf(z1));
    const clause = ctx.between(val(ctx, x1), val(ctx, x2));
    const figure = normalFigure(mu, sd, ctx.axis, [x1, x2]);
    const steps = [
      zStep(ctx, x1, mu, sd),
      zStep(ctx, x2, mu, sd),
      `Areas to the left from the table: $${areaTex(A2)}$ for $z = ${fixed(z2, 2)}$ and $${areaTex(A1)}$ for $z = ${fixed(z1, 2)}$.`,
      `Area between: $${areaTex(A2)} - ${areaTex(A1)} = ${areaTex(A2 - A1)}$`,
    ];
    const HINTS = [Z_FORMULA, 'Find the area to the left of each value. The area between them is the larger area minus the smaller area.'];
    if (kind === 'count') {
      const N = retry(() => rng.pick([300, 400, 500, 600, 750, 800, 1000, 1200, 1500, 2000, 2500]), (n) => !onEdge((n * table) / 100, 0), 50);
      const count = (N * table) / 100;
      return {
        prompt: `${statement(ctx, mu, sd)} Suppose there are $${num(N)}$ ${ctx.pop}. About how many of them ${clause}? ${TABLE_NOTE} Round your answer to the nearest whole number.`,
        figure,
        parts: [{ suffix: ctx.pop, answer: { kind: 'numeric', value: roundTo(count, 6), decimals: 0, tolerance: roundTo((N * Math.abs(table - exact)) / 100 + 0.6, 6) } }],
        hints: [HINTS[1], `Then multiply the area by $${num(N)}$.`],
        solution: [...steps, `Number: $${areaTex(A2 - A1)} \\times ${num(N)} ${eq(count, 2)}$`, `About $${num(Math.round(count))}$ ${ctx.pop} ${clause}.`],
      };
    }
    return {
      prompt: `${statement(ctx, mu, sd)} What percent of the ${ctx.pop} ${clause}? ${TABLE_NOTE} Give the percent to the nearest tenth.`,
      figure,
      parts: [pctAreaPart(table, exact)],
      hints: HINTS,
      solution: [...steps, `About $${fixed(table, 1)}\\%$ of the ${ctx.pop} ${clause}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 5.4 Confidence intervals
// ---------------------------------------------------------------------------

const POLLS = [
  { who: 'adults in Riverton', topic: 'support building a new recreation centre', N: [40000, 60000] },
  { who: 'high school students in the region', topic: 'have a part-time job during the school year', N: [150000, 200000] },
  { who: 'customers of a local online store', topic: 'were satisfied with their most recent order', N: [20000, 80000] },
  { who: 'adults in the region', topic: 'get at least seven hours of sleep on a typical night', N: [3000000, 3600000] },
  { who: 'Grade 11 students in a large school division', topic: 'eat breakfast every school day', N: [6000, 12000] },
  { who: 'drivers in Westbury', topic: 'use winter tires', N: [500000, 700000] },
  { who: 'Lakeside residents', topic: 'support adding bike lanes downtown', N: [90000, 110000] },
  { who: 'adults in Brookfield', topic: 'shop at a farmers’ market at least once a month', N: [70000, 90000] },
];
const LEVELS = [
  { L: 95, text: '19 times out of 20', frac: '\\dfrac{19}{20}' },
  { L: 90, text: '9 times out of 10', frac: '\\dfrac{9}{10}' },
  { L: 99, text: '99 times out of 100', frac: '\\dfrac{99}{100}' },
];
const CANDIDATES = ['Okafor', 'Lindqvist', 'Tran', 'Bouchard', 'Singh', 'Whitehorse', 'MacDonald', 'Haddad', 'Moreau', 'Petrenko', 'Nakamura', 'Delorme'];
const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];
const ISSUES = ['building a new arena', 'building a new public library', 'switching to a four-day school week', 'building a new dog park', 'adding a new transit route', 'building a covered outdoor rink'];
const MEANS = [
  { what: 'bags of chips', label: 235, unit: 'g', noun: 'mass', sdRange: [0.8, 2.5] },
  { what: 'bottles of water', label: 500, unit: 'mL', noun: 'volume', sdRange: [0.8, 2.5] },
  { what: 'boxes of cereal', label: 750, unit: 'g', noun: 'mass', sdRange: [1.5, 4] },
  { what: 'bags of dog food', label: 8000, unit: 'g', noun: 'mass', sdRange: [10, 30] },
];

const CI_HINTS = [
  'The confidence interval is the survey result minus the margin of error to the survey result plus the margin of error.',
  'The confidence level (such as “19 times out of 20”, or $95\\%$) tells how often this method gives an interval that contains the true population value.',
];

const confidenceInterval = skill({
  id: 'm202-confidence-interval',
  name: 'Confidence intervals',
  description: 'Find and interpret a confidence interval from a survey result, margin of error and confidence level, and explain how sample size affects the margin of error.',
  outcomes: ['S2'],
  lessonId: 'm202-5-4',
  calculator: true,
  gen(rng, d) {
    const poll = rng.pick(POLLS);
    const lv = rng.pick(LEVELS);
    const n = rng.pick([500, 600, 800, 1000, 1200, 1500, 2000]);
    const p = rng.int(18, 82);
    const me = rng.float(2, 4.9, 1);
    const lo = roundTo(p - me, 1);
    const hi = roundTo(p + me, 1);
    const pollText = `A polling company surveyed a random sample of $${num(n)}$ ${poll.who}. Of these, ${pctTex(p)} said they ${poll.topic}. The results are accurate to within $${num(me)}$ percentage points, ${lv.text}.`;
    const ciSteps = [`Lower end: $${p} - ${num(me)} = ${num(lo)}$`, `Upper end: $${p} + ${num(me)} = ${num(hi)}$`];
    const kind =
      d === 1 ? rng.pick(['interval', 'interval', 'level'] as const) : d === 2 ? rng.pick(['reverse', 'interpret', 'size', 'clevel'] as const) : rng.pick(['overlap', 'majority', 'population', 'mean'] as const);
    if (kind === 'interval') {
      return {
        prompt: `${pollText} What is the confidence interval?`,
        parts: [numPart(lo, { label: 'From', suffix: '%' }), numPart(hi, { label: 'to', suffix: '%' })],
        hints: CI_HINTS,
        solution: [`The survey result is ${pctTex(p)} and the margin of error is $${num(me)}$ percentage points.`, ...ciSteps, `The confidence interval is ${pctTex(lo)} to ${pctTex(hi)}.`],
        answerDisplay: `${pctTex(lo)} to ${pctTex(hi)}`,
      };
    }
    if (kind === 'level') {
      return {
        prompt: `${pollText} What is the confidence level, as a percent?`,
        parts: [numPart(lv.L, { label: 'Confidence level', suffix: '%' })],
        hints: ['The phrase “___ times out of ___” gives the confidence level.', 'Write it as a fraction, then as a percent.'],
        solution: [`“${cap(lv.text)}” means $${lv.frac}$.`, `$${lv.frac} = ${num(lv.L / 100)} = ${lv.L}\\%$`, `The confidence level is $${lv.L}\\%$.`],
        answerDisplay: pctTex(lv.L),
      };
    }
    if (kind === 'reverse') {
      const p1 = rng.float(20, 80, 1);
      const lo1 = roundTo(p1 - me, 1);
      const hi1 = roundTo(p1 + me, 1);
      return {
        prompt: `A news report says that, according to a survey, between ${pctTex(lo1)} and ${pctTex(hi1)} of ${poll.who} ${poll.topic}, ${lv.text}. What were the survey result and the margin of error?`,
        parts: [numPart(p1, { label: 'Survey result', suffix: '%' }), numPart(me, { label: 'Margin of error', suffix: 'percentage points' })],
        hints: ['The survey result is in the middle of the confidence interval.', 'The margin of error is half the width of the interval.'],
        solution: [
          `Survey result (the midpoint): $\\dfrac{${num(lo1)} + ${num(hi1)}}{2} = ${num(p1)}$`,
          `Margin of error (half the width): $\\dfrac{${num(hi1)} - ${num(lo1)}}{2} = ${num(me)}$`,
          `The survey result was ${pctTex(p1)}, with a margin of error of $${num(me)}$ percentage points.`,
        ],
        answerDisplay: `${pctTex(p1)}, $\\pm ${num(me)}$ percentage points`,
      };
    }
    if (kind === 'interpret') {
      const right = `We can be $${lv.L}\\%$ confident that the percent of **all** ${poll.who} who ${poll.topic} is between ${pctTex(lo)} and ${pctTex(hi)}.`;
      return {
        prompt: `${pollText} Which statement is the best interpretation of these results?`,
        parts: [part(mc(rng, right, [
          `$${lv.L}\\%$ of all ${poll.who} ${poll.topic}.`,
          `Exactly ${pctTex(p)} of all ${poll.who} ${poll.topic}.`,
          `The percent of all ${poll.who} who ${poll.topic} is certainly between ${pctTex(lo)} and ${pctTex(hi)}.`,
        ]))],
        hints: CI_HINTS,
        solution: [
          ...ciSteps,
          `The confidence interval is ${pctTex(lo)} to ${pctTex(hi)}, and “${lv.text}” is a confidence level of $${lv.L}\\%$.`,
          `A sample cannot give the exact population percent, and the interval is not certain. The confidence level is not the percent who ${poll.topic}.`,
          `Best interpretation: ${right}`,
        ],
      };
    }
    if (kind === 'size') {
      const bigger = rng.chance(0.5);
      const n2 = bigger ? n * rng.pick([2, 4]) : n / 2;
      const right = bigger ? 'The margin of error will most likely decrease.' : 'The margin of error will most likely increase.';
      return {
        prompt: `${pollText} The company repeats the survey with a random sample of $${num(n2)}$ ${poll.who} and the same confidence level. What will most likely happen to the margin of error?`,
        parts: [part(mc(rng, right, [
          bigger ? 'The margin of error will most likely increase.' : 'The margin of error will most likely decrease.',
          'The margin of error will stay the same, because the confidence level did not change.',
          bigger ? 'The margin of error will become 0, because more people were surveyed.' : 'The confidence level will become lower, because fewer people were surveyed.',
        ]))],
        hints: ['A larger random sample gives more information about the population.', 'With the same confidence level, a larger sample gives a smaller margin of error, and a smaller sample gives a larger one.'],
        solution: [
          `The new sample has $${num(n2)}$ people instead of $${num(n)}$, so it is ${bigger ? 'larger' : 'smaller'}.`,
          `For the same confidence level, ${bigger ? 'a larger sample gives a more precise estimate, so the margin of error gets smaller (but it never becomes 0 unless everyone is surveyed)' : 'a smaller sample gives a less precise estimate, so the margin of error gets larger'}.`,
          right,
        ],
      };
    }
    if (kind === 'clevel') {
      const other = rng.pick(LEVELS.filter((x) => x.L !== lv.L));
      const wider = other.L > lv.L;
      const right = wider ? 'The interval will be wider (a larger margin of error).' : 'The interval will be narrower (a smaller margin of error).';
      return {
        prompt: `${pollText} Using the same survey data, the company reports a $${other.L}\\%$ confidence interval instead of a $${lv.L}\\%$ one. How will the interval change?`,
        parts: [part(mc(rng, right, [
          wider ? 'The interval will be narrower (a smaller margin of error).' : 'The interval will be wider (a larger margin of error).',
          'The interval will stay the same, because the sample did not change.',
          'The interval will move so that it is centred on a different percent.',
        ]))],
        hints: ['To be more confident that an interval contains the true value, would you want a wider or a narrower interval?', 'With the same sample, a higher confidence level needs a wider interval; a lower confidence level gives a narrower one. The centre stays at the survey result.'],
        solution: [
          `The confidence level changes from $${lv.L}\\%$ to $${other.L}\\%$.`,
          wider ? 'To be more confident of capturing the true percent, the interval must cover more values, so the margin of error grows.' : 'Being less confident allows a shorter interval, so the margin of error shrinks.',
          `The centre stays at ${pctTex(p)}. ${right}`,
        ],
      };
    }
    if (kind === 'overlap') {
      const [A, B] = rng.sample(CANDIDATES, 2);
      const city = rng.pick(CITIES);
      const m = rng.float(2, 4.5, 1);
      const clear = rng.chance(0.5);
      const pB = rng.int(30, 42);
      const gap = clear ? roundTo(2 * m + rng.float(0.5, 4, 1), 1) : roundTo(rng.float(1, 2 * m - 0.5, 1), 1);
      const pA = roundTo(pB + gap, 1);
      const yes = `Yes. The two confidence intervals do not overlap.`;
      const no = `No. The two confidence intervals overlap, so ${B} could actually be ahead.`;
      return {
        prompt: `In a poll of $${num(n)}$ voters in ${city}, ${pctTex(pA)} said they would vote for ${A} for mayor and ${pctTex(pB)} said they would vote for ${B}. Each result is accurate to within $${num(m)}$ percentage points, 19 times out of 20. Can ${A} be confident of being ahead? Choose the answer with the correct reason.`,
        parts: [part(mc(rng, clear ? yes : no, [clear ? no : yes, `Yes. ${A} has a higher percent in the poll.`, 'No. A poll can never show who is ahead.']))],
        hints: ['Find the confidence interval for each candidate.', 'If the intervals overlap, the true percents could be in either order.'],
        solution: [
          `${A}: $${num(pA)} \\pm ${num(m)}$, from ${pctTex(roundTo(pA - m, 1))} to ${pctTex(roundTo(pA + m, 1))}`,
          `${B}: $${num(pB)} \\pm ${num(m)}$, from ${pctTex(roundTo(pB - m, 1))} to ${pctTex(roundTo(pB + m, 1))}`,
          clear
            ? `${A}’s lowest likely value, ${pctTex(roundTo(pA - m, 1))}, is above ${B}’s highest, ${pctTex(roundTo(pB + m, 1))}. The intervals do not overlap, so ${A} can be confident of being ahead.`
            : `${A}’s lowest likely value, ${pctTex(roundTo(pA - m, 1))}, is below ${B}’s highest, ${pctTex(roundTo(pB + m, 1))}. The intervals overlap, so the race is too close to call.`,
        ],
      };
    }
    if (kind === 'majority') {
      const issue = rng.pick(ISSUES);
      const city = rng.pick(CITIES);
      const [p2, m] = retry(() => [rng.float(50.5, 58, 1), rng.float(1.5, 5, 1)], ([a, b]) => Math.abs(a - b - 50) >= 0.4, 100);
      const lo2 = roundTo(p2 - m, 1);
      const win = lo2 > 50;
      const yes = 'Yes. The whole confidence interval is above $50\\%$.';
      const no = 'No. The confidence interval includes values of $50\\%$ or less.';
      return {
        prompt: `${city} will hold a vote on ${issue}. In a poll of $${num(n)}$ voters, ${pctTex(p2)} said they would vote yes. The poll is accurate to within $${num(m)}$ percentage points, ${lv.text}. Can the yes side be confident of winning a majority (more than $50\\%$)? Choose the answer with the correct reason.`,
        parts: [part(mc(rng, win ? yes : no, [win ? no : yes, 'Yes. The survey result is above $50\\%$.', `Yes. The margin of error is less than $5$ percentage points.`]))],
        hints: CI_HINTS,
        solution: [
          `Confidence interval: $${num(p2)} - ${num(m)} = ${num(lo2)}$ to $${num(p2)} + ${num(m)} = ${num(roundTo(p2 + m, 1))}$`,
          win ? `The lowest value in the interval, ${pctTex(lo2)}, is above $50\\%$.` : `The interval includes values down to ${pctTex(lo2)}, which is not above $50\\%$.`,
          win ? 'The yes side can be confident of a majority.' : 'The yes side cannot be confident of a majority: the vote is too close to call.',
        ],
      };
    }
    if (kind === 'population') {
      const N = 1000 * rng.int(poll.N[0] / 1000, poll.N[1] / 1000);
      const least = roundTo((N * lo) / 100, 4);
      const most = roundTo((N * hi) / 100, 4);
      return {
        prompt: `${pollText} Suppose there are $${num(N)}$ ${poll.who} in all. Use the confidence interval to estimate the least and the greatest number of ${poll.who} who ${poll.topic}.`,
        parts: [numPart(least, { label: 'Least' }), numPart(most, { label: 'Greatest' })],
        hints: ['First find the confidence interval: survey result $\\pm$ margin of error.', 'Multiply the population by each end of the interval (as decimals).'],
        solution: [...ciSteps, `Least: $${num(lo / 100)} \\times ${num(N)} = ${num(least)}$`, `Greatest: $${num(hi / 100)} \\times ${num(N)} = ${num(most)}$`, `Between $${num(least)}$ and $${num(most)}$ ${poll.who} ${poll.topic}, ${lv.text}.`],
        answerDisplay: `$${num(least)}$ to $${num(most)}$`,
      };
    }
    // kind === 'mean': does the interval contain the labelled amount?
    const g = rng.pick(MEANS);
    const e = rng.float(g.sdRange[0], g.sdRange[1], 1);
    const inside = rng.chance(0.5);
    const off = inside ? rng.float(-e + 0.3, e - 0.3, 1) : rng.sign() * rng.float(e + 0.3, e + 2, 1);
    const m = roundTo(g.label + off, 1);
    const sz = rng.pick([30, 40, 50, 60]);
    const yes = `Yes. $${num(g.label)}$ ${g.unit} is outside the confidence interval.`;
    const no = `No. $${num(g.label)}$ ${g.unit} is inside the confidence interval, so the mean could be $${num(g.label)}$ ${g.unit}.`;
    return {
      prompt: `A company fills ${g.what} labelled $${num(g.label)}$ ${g.unit}. An inspector measured a random sample of $${sz}$ ${g.what}. The sample mean ${g.noun} was $${num(m)}$ ${g.unit}, with a margin of error of $${num(e)}$ ${g.unit}, ${lv.text}. Does this suggest that the mean ${g.noun} of **all** the ${g.what} is different from $${num(g.label)}$ ${g.unit}? Choose the answer with the correct reason.`,
      parts: [part(mc(rng, inside ? no : yes, [inside ? yes : no, `Yes. The sample mean is not exactly $${num(g.label)}$ ${g.unit}.`, `No. The margin of error is small.`]))],
      hints: ['Find the confidence interval for the mean: sample mean $\\pm$ margin of error.', 'If the labelled amount is inside the interval, it is a reasonable value for the true mean.'],
      solution: [
        `Confidence interval: $${num(m)} - ${num(e)} = ${num(roundTo(m - e, 1))}$ to $${num(m)} + ${num(e)} = ${num(roundTo(m + e, 1))}$ ${g.unit}`,
        inside ? `$${num(g.label)}$ is inside this interval, so the true mean could be $${num(g.label)}$ ${g.unit}. A sample mean that is a little different is expected.` : `$${num(g.label)}$ is outside this interval, so it is unlikely that the true mean is $${num(g.label)}$ ${g.unit}.`,
        inside ? 'No, the data does not suggest the mean is different from the label.' : 'Yes, the data suggests the mean is different from the label.',
      ],
    };
  },
});

export const STATISTICS_SKILLS: SkillDef[] = [standardDeviation, compareSpread, normalPercent, zScore, zArea, confidenceInterval];
