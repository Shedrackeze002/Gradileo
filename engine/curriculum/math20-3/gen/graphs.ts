/** Math 20-3 Unit 8 — Graphs and Puzzles (S1, N1): bar graphs, circle graphs, histograms and line graphs; choosing a graph and spotting a misleading one; numerical puzzles and games. */
import { fixedChoice, mc, mcFigures, numPart, retry, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { BarChartFigure, CircleGraphFigure, Figure, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean; answerDisplay?: string };
type P = [number, number];

const clean = (x: number) => roundTo(x, 9);
/** A number inside maths, thousands grouped. */
const num = (x: number, dp = 4) => fmtGroupTex(clean(x), dp);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const plus = (a: number[]) => a.map((x) => num(x)).join(' + ');
const keys = (n: number) => [...Array(n).keys()];
/** Each value is its own formula, so a long data list wraps on a phone. */
const listTex = (a: number[]) => a.map((x) => `$${num(x)}$`).join(', ');
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

/** True when v sits too close to a rounding boundary at dp places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.03;
}
const exactAt = (v: number, dp: number) => Math.abs(roundTo(v, dp) - v) < 1e-9;
/** "= 12.5" when exact, otherwise "\approx 12.467". */
const eq = (v: number, dp: number) => (exactAt(v, dp) ? `= ${num(v, dp)}` : `\\approx ${num(v, dp + 2)}`);

/** An answer that is exact when it has at most dp decimals, and otherwise rounded to dp places. */
function rounded(v: number, dp: number, suffix: string, phrase: string): { part: Part; ask: string; exact: boolean; tex: string } {
  const exact = exactAt(v, dp);
  return {
    part: exact ? numPart(clean(v), { suffix }) : numPart(v, { decimals: dp, suffix }),
    ask: exact ? '' : ` Round to ${phrase}.`,
    exact,
    tex: num(roundTo(v, dp), dp),
  };
}

/** Money in prose (never inside $...$): \$12.50, or \$1,200 for whole dollars. */
function money(x: number): string {
  const whole = isWhole(x);
  const s = whole ? String(Math.round(x)) : fmtFixed(x, 2);
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return `\\$${g}${f === undefined ? '' : `.${f}`}`;
}
/** Money inside maths, without a dollar sign. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : fmtGroupTex(roundTo(x, 2), 2).replace(/\.(\d)$/, '.$10'));
const CENT = 'to the nearest cent';
const moneyPart = (v: number): Part => numPart(v, { decimals: 2, tolerance: 0.011, label: '\\$' });

/** Percents that add to 100: k parts, each a multiple of `unit` and at least `min`, all different. */
function percents(rng: Rng, k: number, unit: number, min: number): number[] {
  return retry(
    () => {
      const slots = 100 / unit - 1;
      const cuts = rng.sample(keys(slots).map((i) => (i + 1) * unit), k - 1).sort((a, b) => a - b);
      return [...cuts, 100].map((c, i) => c - (i ? cuts[i - 1] : 0));
    },
    (ps) => ps.every((p) => p >= min) && new Set(ps).size === ps.length,
    400,
  );
}

// ---------------------------------------------------------------------------
// Drawing on a plain canvas (a plane figure with no axes or grid lines)
// ---------------------------------------------------------------------------

const r3 = (x: number) => Math.round(x * 1000) / 1000;

/** Approximate width in pixels of a 12px bold label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' ? 3.5 : /[mMwW]/.test(ch) ? 10.5 : /[iljtfI1r]/.test(ch) ? 4.5 : 7.4;
  return w;
}

class Canvas {
  private segs: PlaneSegment[] = [];
  private texts: Array<{ c: P; text: string }> = [];

  constructor(
    private W: number,
    private H: number,
  ) {}

  seg(a: P, b: P, opts: { dashed?: boolean; color?: 'brand' | 'accent' | 'muted' } = {}) {
    this.segs.push({ from: [r3(a[0]), r3(a[1])], to: [r3(b[0]), r3(b[1])], ...opts });
    return this;
  }

  /** Text centred at c. */
  text(c: P, text: string) {
    this.texts.push({ c, text });
    return this;
  }

  build(): PlaneFigure {
    // The canvas is 340 px wide inside the figure, so this many pixels make one unit.
    const ppu = 340 / this.W;
    const points: PlanePoint[] = this.texts.map(({ c, text }) => ({
      x: r3(c[0] - (8 + textWidth(text) / 2) / ppu),
      y: r3(c[1] - 12.3 / ppu),
      label: text,
      color: 'muted',
      open: true,
    }));
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: this.W, yMin: 0, yMax: this.H, step: Math.max(this.W, this.H) },
      hideTickLabels: true,
      ...(this.segs.length ? { segments: this.segs } : {}),
      ...(points.length ? { points } : {}),
    };
  }
}

// ---------------------------------------------------------------------------
// 8.1 Bar graphs and circle graphs
// ---------------------------------------------------------------------------

interface BarCtx {
  intro: string;
  cats: string[];
  /** The categories as they read in a sentence. */
  words: string[];
  label: string;
  cl: string;
  steps: number[];
  /** Bar heights in grid steps. */
  lo: number;
  hi: number;
  /** Suffix after the answer box. */
  unit: string;
  ask: (w: string) => string;
  more: (a: string, b: string) => string;
  pct: (w: string) => string;
}

const BAR_CTX: BarCtx[] = [
  {
    intro: 'The bar graph shows the vehicles an auto shop serviced last month.',
    cats: ['Cars', 'Pickups', 'SUVs', 'Vans', 'Semis'],
    words: ['cars', 'pickups', 'SUVs', 'vans', 'semis'],
    label: 'Vehicles serviced', cl: 'Type of vehicle', steps: [10, 20], lo: 1, hi: 9, unit: 'vehicles',
    ask: (w) => `How many ${w} did the shop service?`,
    more: (a, b) => `How many more ${a} than ${b} did the shop service?`,
    pct: (w) => `What percent of the vehicles serviced were ${w}?`,
  },
  {
    intro: 'The bar graph shows the bags of seed a farm supply store sold in April.',
    cats: ['Wheat', 'Canola', 'Barley', 'Oats', 'Peas'],
    words: ['wheat', 'canola', 'barley', 'oat', 'pea'],
    label: 'Bags sold', cl: 'Seed', steps: [10, 20, 50], lo: 1, hi: 9, unit: 'bags',
    ask: (w) => `How many bags of ${w} seed did the store sell?`,
    more: (a, b) => `How many more bags of ${a} seed than ${b} seed did the store sell?`,
    pct: (w) => `What percent of the bags sold were ${w} seed?`,
  },
  {
    intro: 'The bar graph shows the service calls a plumbing company answered last month.',
    cats: ['Leaks', 'Drains', 'Water heaters', 'Toilets', 'Sump pumps'],
    words: ['leak', 'drain', 'water heater', 'toilet', 'sump pump'],
    label: 'Service calls', cl: 'Type of call', steps: [5, 10], lo: 1, hi: 9, unit: 'calls',
    ask: (w) => `How many ${w} calls did the company answer?`,
    more: (a, b) => `How many more ${a} calls than ${b} calls did the company answer?`,
    pct: (w) => `What percent of the calls were ${w} calls?`,
  },
  {
    intro: 'The bar graph shows how many customers a tire shop served each day last week.',
    cats: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    words: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    label: 'Customers', cl: 'Day', steps: [5, 10], lo: 2, hi: 9, unit: 'customers',
    ask: (w) => `How many customers did the shop serve on ${w}?`,
    more: (a, b) => `How many more customers did the shop serve on ${a} than on ${b}?`,
    pct: (w) => `What percent of the week’s customers came on ${w}?`,
  },
  {
    intro: 'The bar graph shows the hours each apprentice at an electrical contractor worked last month.',
    cats: ['Aisha', 'Ben', 'Carlos', 'Dana', 'Emeka'],
    words: ['Aisha', 'Ben', 'Carlos', 'Dana', 'Emeka'],
    label: 'Hours worked', cl: 'Apprentice', steps: [20], lo: 4, hi: 9, unit: 'hours',
    ask: (w) => `How many hours did ${w} work?`,
    more: (a, b) => `How many more hours did ${a} work than ${b}?`,
    pct: (w) => `What percent of all the hours did ${w} work?`,
  },
  {
    intro: 'The bar graph shows how many litres of each kind of fuel a highway gas station sold on Saturday.',
    cats: ['Regular', 'Mid-grade', 'Premium', 'Diesel'],
    words: ['regular gas', 'mid-grade gas', 'premium gas', 'diesel'],
    label: 'Fuel sold (L)', cl: 'Fuel', steps: [500, 1000], lo: 1, hi: 9, unit: 'L',
    ask: (w) => `How many litres of ${w} did the station sell?`,
    more: (a, b) => `How many more litres of ${a} than ${b} did the station sell?`,
    pct: (w) => `What percent of the fuel sold was ${w}?`,
  },
];

const barText = (ctx: BarCtx, v: number) => (ctx.unit === 'L' ? `$${num(v)}\\ \\text{L}$` : `$${num(v)}$ ${ctx.unit}`);

function barData(rng: Rng, ctx: BarCtx, half: boolean): { values: number[]; step: number; figure: BarChartFigure } {
  const step = rng.pick(ctx.steps);
  const values = retry(
    () => ctx.cats.map(() => step * rng.int(ctx.lo, ctx.hi) + (half && rng.chance(0.5) ? step / 2 : 0)),
    (vs) => new Set(vs).size === vs.length && (!half || vs.some((v) => v % step !== 0)),
    300,
  );
  return { values, step, figure: { type: 'barChart', categories: ctx.cats, values, valueLabel: ctx.label, categoryLabel: ctx.cl, max: step * (ctx.hi + 1), step } };
}

const READ_BAR = 'Find the bar, then look straight across from its top to the scale on the left.';
const halfHint = (step: number) => `The grid lines go up by $${num(step)}$. A bar that ends halfway between two grid lines is halfway between their numbers.`;

function barRead(rng: Rng): Out {
  const ctx = rng.pick(BAR_CTX);
  const { values, step, figure } = barData(rng, ctx, false);
  const i = rng.int(0, values.length - 1);
  return {
    prompt: `${ctx.intro} ${ctx.ask(ctx.words[i])}`,
    figure,
    parts: [numPart(values[i], { suffix: ctx.unit })],
    hints: [READ_BAR, `The grid lines go up by $${num(step)}$.`],
    solution: [`Find the ${ctx.cats[i]} bar.`, `Its top is level with $${num(values[i])}$ on the scale.`, `The answer is ${barText(ctx, values[i])}.`],
    calculator: false,
  };
}

function barMore(rng: Rng, half: boolean): Out {
  const ctx = rng.pick(BAR_CTX);
  const { values, step, figure } = barData(rng, ctx, half);
  const [i, j] = retry(() => rng.sample(keys(values.length), 2), ([a, b]) => values[a] > values[b] && (!half || values[a] % step !== 0 || values[b] % step !== 0));
  const diff = values[i] - values[j];
  return {
    prompt: `${ctx.intro} ${ctx.more(ctx.words[i], ctx.words[j])}`,
    figure,
    parts: [numPart(diff, { suffix: ctx.unit })],
    hints: [`Read the ${ctx.cats[i]} bar and the ${ctx.cats[j]} bar. ${half ? halfHint(step) : READ_BAR}`, 'Subtract the smaller value from the larger value.'],
    solution: [`${ctx.cats[i]}: $${num(values[i])}$. ${ctx.cats[j]}: $${num(values[j])}$.`, `$${num(values[i])} - ${num(values[j])} = ${num(diff)}$`, `The answer is ${barText(ctx, diff)} more.`],
    calculator: false,
  };
}

function barPercent(rng: Rng): Out {
  const ctx = rng.pick(BAR_CTX);
  const { values, step, figure, i, p } = retry(
    () => {
      const d = barData(rng, ctx, true);
      const i = rng.int(0, d.values.length - 1);
      return { ...d, i, p: (d.values[i] * 100) / sum(d.values) };
    },
    (o) => !onEdge(o.p, 1),
    300,
  );
  const T = sum(values);
  const r = rounded(p, 1, '%', 'the nearest tenth of a percent');
  return {
    prompt: `${ctx.intro} ${ctx.pct(ctx.words[i])}${r.ask}`,
    figure,
    parts: [r.part],
    hints: [`Read every bar and add them to find the total. ${halfHint(step)}`, 'Percent $= \\dfrac{\\text{part}}{\\text{total}} \\times 100$'],
    solution: [
      `Read the bars: ${ctx.cats.map((c, k) => `${c} $${num(values[k])}$`).join(', ')}.`,
      `Total: $${plus(values)} = ${num(T)}$`,
      `$\\dfrac{${num(values[i])}}{${num(T)}} \\times 100 ${eq(p, 1)}$`,
      `The answer is ${r.exact ? '' : 'about '}$${r.tex}\\%$.`,
    ],
  };
}

function barAngle(rng: Rng): Out {
  const ctx = rng.pick(BAR_CTX);
  const { values, step, figure, i, a } = retry(
    () => {
      const d = barData(rng, ctx, true);
      const i = rng.int(0, d.values.length - 1);
      return { ...d, i, a: (d.values[i] * 360) / sum(d.values) };
    },
    (o) => !onEdge(o.a, 0),
    300,
  );
  const T = sum(values);
  const r = rounded(a, 0, '°', 'the nearest degree');
  return {
    prompt: `${ctx.intro} The same data will be shown in a circle graph. What should the angle of the ${ctx.cats[i]} sector be?${r.ask}`,
    figure,
    parts: [r.part],
    hints: [`Read every bar and add them to find the total. ${halfHint(step)}`, 'Sector angle $= \\dfrac{\\text{part}}{\\text{total}} \\times 360^\\circ$, because a full circle is $360^\\circ$.'],
    solution: [
      `Read the bars: ${ctx.cats.map((c, k) => `${c} $${num(values[k])}$`).join(', ')}.`,
      `Total: $${plus(values)} = ${num(T)}$`,
      `$\\dfrac{${num(values[i])}}{${num(T)}} \\times 360 ${eq(a, 0)}$`,
      `The ${ctx.cats[i]} sector should be ${r.exact ? '' : 'about '}$${r.tex}^\\circ$.`,
    ],
  };
}

interface PieCtx {
  intro: (name: string, total: number) => string;
  /** From the usual largest share to the usual smallest. */
  cats: string[];
  words: string[];
  top: number;
  t1: number[];
  t2: number[];
  money?: boolean;
  unit: string;
  ask: (w: string) => string;
  pct: (w: string) => string;
  /** Counts shown on a graph: "The circle graph shows the number of workers in each group." */
  counts: string;
  /** Realistic percent range for each category (a budget); all categories are then used. */
  ranges?: Array<[number, number]>;
}

const PIES: PieCtx[] = [
  {
    intro: (_n, t) => `A gas plant outside the city asked its $${num(t)}$ workers how they get to work. The circle graph shows the results.`,
    cats: ['Drive alone', 'Carpool', 'Bus', 'Bike', 'Walk'],
    words: ['drive alone', 'carpool', 'take the bus', 'bike', 'walk'],
    top: 60, t1: [200, 400, 500, 600], t2: [250, 360, 450, 640, 850], unit: 'workers',
    ask: (w) => `How many workers ${w} to work?`,
    pct: (w) => `What percent of the workers ${w} to work?`,
    counts: 'A gas plant outside the city asked its workers how they get to work. The circle graph shows how many workers chose each way.',
  },
  {
    intro: (_n, t) => `A grain farm has $${num(t)}$ hectares of land. The circle graph shows how the land is used.`,
    cats: ['Wheat', 'Canola', 'Barley', 'Hay', 'Pasture'],
    words: ['wheat', 'canola', 'barley', 'hay', 'pasture'],
    top: 60, t1: [400, 500, 800, 1000], t2: [640, 720, 960, 1250], unit: 'ha',
    ask: (w) => `How many hectares are used for ${w}?`,
    pct: (w) => `What percent of the land is used for ${w}?`,
    counts: 'The circle graph shows how many hectares of a grain farm are used for each crop.',
  },
  {
    intro: (_n, t) => `A towing company in the city answered $${num(t)}$ calls in January. The circle graph shows the reasons for the calls.`,
    cats: ['Dead battery', 'Stuck in snow', 'Flat tire', 'Lockout', 'Collision'],
    words: ['dead batteries', 'vehicles stuck in snow', 'flat tires', 'lockouts', 'collisions'],
    top: 50, t1: [200, 300, 400, 500], t2: [240, 350, 480, 650], unit: 'calls',
    ask: (w) => `How many calls were for ${w}?`,
    pct: (w) => `What percent of the calls were for ${w}?`,
    counts: 'The circle graph shows how many calls a towing company in the city answered for each reason in January.',
  },
  {
    intro: (name, t) => `${name} is an apprentice welder who takes home ${money(t)} a month. The circle graph shows ${name}’s monthly budget.`,
    cats: ['Rent', 'Food', 'Truck payment', 'Fuel', 'Savings', 'Other'],
    words: ['rent', 'food', 'the truck payment', 'fuel', 'savings', 'other costs'],
    top: 45, t1: [2000, 3000, 4000], t2: [2850, 3150, 3420, 3780], money: true, unit: '',
    ranges: [[30, 40], [10, 18], [10, 16], [5, 10], [5, 15], [5, 20]],
    ask: (w) => `How much is budgeted for ${w} each month?`,
    pct: (w) => `What percent of the budget is for ${w}?`,
    counts: '',
  },
  {
    intro: (_n, t) => `A hardware store sold ${money(t)} worth of goods on Saturday. The circle graph shows the sales for each department.`,
    cats: ['Lumber', 'Tools', 'Paint', 'Plumbing', 'Garden'],
    words: ['lumber', 'tools', 'paint', 'plumbing', 'garden'],
    top: 55, t1: [5000, 10000, 20000], t2: [12400, 18600, 9450], money: true, unit: '',
    ask: (w) => `How much did the ${w} department sell?`,
    pct: (w) => `What percent of the sales came from the ${w} department?`,
    counts: '',
  },
];

const pieAmt = (ctx: PieCtx, v: number) => (ctx.money ? money(v) : `$${num(v)}$ ${ctx.unit === 'ha' ? 'hectares' : ctx.unit}`);

/** k categories in their usual order, always including the first (largest); every category for a budget. */
function pieCats(rng: Rng, ctx: PieCtx, k: number): number[] {
  if (ctx.ranges) return keys(ctx.cats.length);
  return [0, ...rng.sample(keys(ctx.cats.length).slice(1), k - 1)].sort((a, b) => a - b);
}

/** Percents (multiples of `unit`) for the chosen categories: realistic ranges for a budget, otherwise the first category gets the largest share. */
function piePcts(rng: Rng, ctx: PieCtx, idx: number[], unit: number, min: number, ok: (ps: number[]) => boolean = () => true): number[] {
  const R = ctx.ranges;
  if (R) {
    const last = R[idx[idx.length - 1]];
    return retry(
      () => {
        const ps = idx.slice(0, -1).map((c) => unit * rng.int(Math.ceil(R[c][0] / unit), Math.floor(R[c][1] / unit)));
        return [...ps, 100 - sum(ps)];
      },
      (ps) => ps[ps.length - 1] >= last[0] && ps[ps.length - 1] <= last[1] && ok(ps),
      400,
    );
  }
  return retry(() => percents(rng, idx.length, unit, min).sort((a, b) => b - a), (ps) => ps[0] <= ctx.top && ok(ps), 400);
}

function pieAmount(rng: Rng, d: 1 | 2, name: string): Out {
  const ctx = rng.pick(PIES);
  const idx = pieCats(rng, ctx, d === 1 ? rng.int(3, 4) : rng.int(4, 5));
  const k = idx.length;
  const total = rng.pick(d === 1 ? ctx.t1 : ctx.t2);
  const pcts = piePcts(rng, ctx, idx, d === 1 ? 5 : 1, d === 1 ? 10 : 4, (ps) => (ctx.money && d === 2) || ps.every((p) => isWhole((p * total) / 100)));
  const figure: CircleGraphFigure = { type: 'circleGraph', slices: idx.map((c, j) => ({ label: ctx.cats[c], value: pcts[j] })), show: 'percent' };
  const j = rng.int(0, k - 1);
  const v = (pcts[j] * total) / 100;
  const cents = !isWhole(v);
  return {
    prompt: `${ctx.intro(name, total)} ${ctx.ask(ctx.words[idx[j]])}${cents ? ` Give your answer ${CENT}.` : ''}`,
    figure,
    parts: [ctx.money ? (cents ? moneyPart(v) : numPart(v, { label: '\\$' })) : numPart(v, { suffix: ctx.unit })],
    hints: [`Find the percent for ${ctx.cats[idx[j]]} in the legend. The whole circle is ${pieAmt(ctx, total)}.`, 'To find a percent of an amount, change the percent to a decimal and multiply.'],
    solution: [
      `${ctx.cats[idx[j]]} is $${pcts[j]}\\%$ of ${pieAmt(ctx, total)}.`,
      `$${pcts[j]}\\% \\times ${num(total)} = ${num(pcts[j] / 100)} \\times ${num(total)} = ${ctx.money ? mv(v) : num(v)}$`,
      `The answer is ${pieAmt(ctx, v)}.`,
    ],
    calculator: d === 2,
  };
}

function pieAngle(rng: Rng, name: string): Out {
  const ctx = rng.pick(PIES);
  const idx = pieCats(rng, ctx, rng.int(3, 5));
  const k = idx.length;
  const pcts = piePcts(rng, ctx, idx, 1, 5);
  const j = rng.int(0, k - 1);
  const ang = clean(pcts[j] * 3.6);
  const total = rng.pick(ctx.t1);
  return {
    prompt: `${ctx.intro(name, total)} To draw this graph, the $360^\\circ$ around the centre of the circle is split into sectors. What is the angle of the ${ctx.cats[idx[j]]} sector?`,
    figure: { type: 'circleGraph', slices: idx.map((c, i) => ({ label: ctx.cats[c], value: pcts[i] })), show: 'percent' },
    parts: [numPart(ang, { suffix: '°' })],
    hints: ['A full circle is $360^\\circ$.', `The ${ctx.cats[idx[j]]} sector is $${pcts[j]}\\%$ of the circle, so its angle is $${pcts[j]}\\%$ of $360^\\circ$.`],
    solution: [`${ctx.cats[idx[j]]} is $${pcts[j]}\\%$ of the circle.`, `$${pcts[j]}\\%$ of $360^\\circ$: $${num(pcts[j] / 100)} \\times 360 = ${num(ang)}$`, `The ${ctx.cats[idx[j]]} sector has an angle of $${num(ang)}^\\circ$.`],
  };
}

/** Counts for k categories, each between lo and hi, all different, largest first. */
function counts(rng: Rng, k: number, lo: number, hi: number): number[] {
  return retry(
    () => keys(k).map(() => rng.int(lo, hi)).sort((a, b) => b - a),
    (cs) => new Set(cs).size === k,
    200,
  );
}

function countPercent(rng: Rng): Out {
  const ctx = rng.pick(PIES.filter((c) => !c.money));
  const k = rng.int(3, 5);
  const idx = pieCats(rng, ctx, k);
  const { cs, j, p } = retry(
    () => {
      const cs = counts(rng, k, 6, 90);
      const j = rng.int(0, k - 1);
      return { cs, j, p: (cs[j] * 100) / sum(cs) };
    },
    (o) => !onEdge(o.p, 1) && o.cs[0] <= sum(o.cs) * 0.6,
    300,
  );
  const T = sum(cs);
  const r = rounded(p, 1, '%', 'the nearest tenth of a percent');
  return {
    prompt: `${ctx.counts} ${ctx.pct(ctx.words[idx[j]])}${r.ask}`,
    figure: { type: 'circleGraph', slices: idx.map((c, i) => ({ label: ctx.cats[c], value: cs[i] })), show: 'value' },
    parts: [r.part],
    hints: ['Add all the numbers in the legend to find the total.', 'Percent $= \\dfrac{\\text{part}}{\\text{total}} \\times 100$'],
    solution: [`Total: $${plus(cs)} = ${num(T)}$`, `$\\dfrac{${cs[j]}}{${num(T)}} \\times 100 ${eq(p, 1)}$`, `The answer is ${r.exact ? '' : 'about '}$${r.tex}\\%$.`],
  };
}

function pieFromAngle(rng: Rng, name: string): Out {
  const ctx = rng.pick(PIES.filter((c) => !c.money));
  const k = rng.int(3, 5);
  const idx = pieCats(rng, ctx, k);
  const { total, cs, j, ang } = retry(
    () => {
      const total = rng.pick([120, 180, 240, 360, 400, 480, 600, 720, 900]);
      const pcts = percents(rng, k, 5, 5).sort((a, b) => b - a);
      const cs = pcts.map((p) => (p * total) / 100);
      cs[k - 1] = total - sum(cs.slice(0, k - 1));
      const j = rng.int(0, k - 1);
      return { total, cs, j, ang: (cs[j] * 360) / total };
    },
    (o) => o.cs.every((c) => isWhole(c) && c > 0) && isWhole(o.ang) && o.cs[0] <= o.total * (ctx.top / 100),
    400,
  );
  const v = cs[j];
  return {
    prompt: `${ctx.intro(name, total)} The legend lost its numbers, but the ${ctx.cats[idx[j]]} sector has an angle of $${ang}^\\circ$ at the centre. ${ctx.ask(ctx.words[idx[j]])}`,
    figure: { type: 'circleGraph', slices: idx.map((c, i) => ({ label: ctx.cats[c], value: cs[i] })), show: 'none' },
    parts: [numPart(v, { suffix: ctx.unit })],
    hints: [`A sector of $${ang}^\\circ$ is $\\dfrac{${ang}}{360}$ of the whole circle.`, `Multiply that fraction by the total, $${num(total)}$.`],
    solution: [`The sector is $\\dfrac{${ang}}{360}$ of the circle.`, `$\\dfrac{${ang}}{360} \\times ${num(total)} = ${num(v)}$`, `The answer is ${pieAmt(ctx, v)}.`],
  };
}

const ANGLE_CTX = [
  { intro: 'A hiring manager at a construction firm sorted the job applications for an apprentice position by the applicant’s trade.', head: 'Trade', cats: ['Electrician', 'Plumber', 'Welder', 'Carpenter', 'Mechanic'] },
  { intro: 'A small-town diner counted the breakfasts it sold on Sunday.', head: 'Breakfast', cats: ['Pancakes', 'Eggs and toast', 'Omelette', 'Waffles', 'Oatmeal'] },
  { intro: 'A car dealership counted the colours of the trucks on its lot.', head: 'Colour', cats: ['White', 'Black', 'Grey', 'Red', 'Blue'] },
  { intro: 'A high school asked Grade 11 students which trade course they want to take next year.', head: 'Course', cats: ['Construction', 'Automotive', 'Cosmetology', 'Culinary arts', 'Welding'] },
];

function countsAngle(rng: Rng): Out {
  const ctx = rng.pick(ANGLE_CTX);
  const k = rng.int(4, 5);
  const { cs, j, a } = retry(
    () => {
      const cs = counts(rng, k, 5, 60);
      const j = rng.int(0, k - 1);
      return { cs, j, a: (cs[j] * 360) / sum(cs) };
    },
    (o) => !onEdge(o.a, 0),
    300,
  );
  const cats = ctx.cats.slice(0, k);
  const T = sum(cs);
  const r = rounded(a, 0, '°', 'the nearest degree');
  return {
    prompt: `${ctx.intro} The table shows the counts. To show these data in a circle graph, what should the angle of the ${cats[j]} sector be?${r.ask}`,
    figure: { type: 'table', headers: [ctx.head, 'Count'], rows: cats.map((c, i) => [c, String(cs[i])]) },
    parts: [r.part],
    hints: ['First add the counts to find the total.', 'Sector angle $= \\dfrac{\\text{count}}{\\text{total}} \\times 360^\\circ$'],
    solution: [`Total: $${plus(cs)} = ${T}$`, `${cats[j]}: $\\dfrac{${cs[j]}}{${T}} \\times 360 ${eq(a, 0)}$`, `The ${cats[j]} sector should be ${r.exact ? '' : 'about '}$${r.tex}^\\circ$.`],
  };
}

function budgetYear(rng: Rng, name: string): Out {
  const ctx = PIES[3];
  const idx = pieCats(rng, ctx, 6);
  const k = idx.length;
  const total = rng.pick(ctx.t2);
  const pcts = piePcts(rng, ctx, idx, 1, 4, (ps) => new Set(ps).size >= 4);
  const figure: CircleGraphFigure = { type: 'circleGraph', slices: idx.map((c, i) => ({ label: ctx.cats[c], value: pcts[i] })), show: 'percent' };
  if (rng.chance(0.5)) {
    const j = rng.int(1, k - 1);
    const month = (pcts[j] * total) / 100;
    const year = month * 12;
    return {
      prompt: `${ctx.intro(name, total)} How much does ${name} budget for ${ctx.words[idx[j]]} in a whole year? Give your answer ${CENT}.`,
      figure,
      parts: [moneyPart(year)],
      hints: [`Find $${pcts[j]}\\%$ of the monthly take-home pay.`, 'There are $12$ months in a year, so multiply the monthly amount by $12$.'],
      solution: [`Each month: $${pcts[j]}\\% \\times ${mv(total)} = ${num(pcts[j] / 100)} \\times ${mv(total)} = ${mv(month)}$`, `In a year: $${mv(month)} \\times 12 = ${mv(year)}$`, `${name} budgets ${money(roundTo(year, 2))} a year for ${ctx.words[idx[j]]}.`],
    };
  }
  const [a, b] = retry(() => rng.sample(keys(k), 2), ([x, y]) => pcts[x] > pcts[y]);
  const diffM = ((pcts[a] - pcts[b]) * total) / 100;
  const diffY = diffM * 12;
  return {
    prompt: `${ctx.intro(name, total)} Over a whole year, how much more does ${name} budget for ${ctx.words[idx[a]]} than for ${ctx.words[idx[b]]}? Give your answer ${CENT}.`,
    figure,
    parts: [moneyPart(diffY)],
    hints: ['Subtract the two percents to find the difference as a percent of the monthly pay.', 'Find that percent of the monthly pay, then multiply by $12$ months.'],
    solution: [
      `Difference in percent: $${pcts[a]}\\% - ${pcts[b]}\\% = ${pcts[a] - pcts[b]}\\%$`,
      `Each month: $${pcts[a] - pcts[b]}\\% \\times ${mv(total)} = ${num((pcts[a] - pcts[b]) / 100)} \\times ${mv(total)} = ${mv(diffM)}$`,
      `In a year: $${mv(diffM)} \\times 12 = ${mv(diffY)}$`,
      `${name} budgets ${money(roundTo(diffY, 2))} more a year for ${ctx.words[idx[a]]}.`,
    ],
  };
}

const graphRead = skill({
  id: 'm203-graph-read',
  name: 'Bar graphs and circle graphs',
  description: 'Read bar graphs and circle graphs, find an amount from a percent, find a percent from a count, and find the sector angle for a circle graph.',
  outcomes: ['S1'],
  lessonId: 'm203-8-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const m = rng.pick(['read', 'more', 'pie'] as const);
      if (m === 'read') return barRead(rng);
      if (m === 'more') return barMore(rng, false);
      return { ...pieAmount(rng, 1, name), calculator: false };
    }
    if (d === 2) {
      const m = rng.pick(['pct', 'angle', 'pie', 'count', 'more'] as const);
      if (m === 'pct') return barPercent(rng);
      if (m === 'angle') return pieAngle(rng, name);
      if (m === 'pie') return pieAmount(rng, 2, name);
      if (m === 'more') return { ...barMore(rng, true), calculator: true };
      return countPercent(rng);
    }
    const m = rng.pick(['barAngle', 'fromAngle', 'budget', 'counts'] as const);
    if (m === 'barAngle') return barAngle(rng);
    if (m === 'fromAngle') return pieFromAngle(rng, name);
    if (m === 'budget') return budgetYear(rng, name);
    return countsAngle(rng);
  },
});

// ---------------------------------------------------------------------------
// 8.1 Histograms
// ---------------------------------------------------------------------------

interface HistCtx {
  intro: string;
  who: string;
  label: string;
  cl: string;
  start: number;
  w: number;
  k: number;
  inRange: (lo: number, hi: number) => string;
  atLeast: (x: number) => string;
  under: (x: number) => string;
  data: string;
}

const HIST_CTX: HistCtx[] = [
  {
    intro: 'A sporting goods store recorded the age of each customer one Saturday morning.',
    who: 'customers', label: 'Number of customers', cl: 'Age (years)', start: 10, w: 10, k: 6, data: 'ages',
    inRange: (a, b) => `were aged ${a} to ${b}`, atLeast: (x) => `were ${x} or older`, under: (x) => `were younger than ${x}`,
  },
  {
    intro: 'A grocery store recorded the hours each part-time employee worked last week.',
    who: 'employees', label: 'Number of employees', cl: 'Hours worked', start: 5, w: 5, k: 6, data: 'hours',
    inRange: (a, b) => `worked ${a} to ${b} hours`, atLeast: (x) => `worked ${x} hours or more`, under: (x) => `worked fewer than ${x} hours`,
  },
  {
    intro: 'A rancher recorded the birth mass of each calf this spring, in kilograms.',
    who: 'calves', label: 'Number of calves', cl: 'Birth mass (kg)', start: 25, w: 5, k: 5, data: 'masses',
    inRange: (a, b) => `had a birth mass of ${a} kg to ${b} kg`, atLeast: (x) => `had a birth mass of ${x} kg or more`, under: (x) => `had a birth mass under ${x} kg`,
  },
  {
    intro: 'A chemical plant outside the city asked its workers how many minutes their drive to work takes.',
    who: 'workers', label: 'Number of workers', cl: 'Commute (minutes)', start: 0, w: 10, k: 6, data: 'commute times',
    inRange: (a, b) => `have a commute of ${a} to ${b} minutes`, atLeast: (x) => `have a commute of ${x} minutes or more`, under: (x) => `have a commute of less than ${x} minutes`,
  },
  {
    intro: 'A safety training school recorded the score of each trainee on a 50-question forklift test.',
    who: 'trainees', label: 'Number of trainees', cl: 'Score', start: 25, w: 5, k: 5, data: 'scores',
    inRange: (a, b) => `scored ${a} to ${b}`, atLeast: (x) => `scored ${x} or more`, under: (x) => `scored less than ${x}`,
  },
  {
    intro: 'A cattle feedlot weighed a pen of steers, in kilograms.',
    who: 'steers', label: 'Number of steers', cl: 'Mass (kg)', start: 400, w: 50, k: 5, data: 'masses',
    inRange: (a, b) => `had a mass of ${a} kg to ${b} kg`, atLeast: (x) => `had a mass of ${x} kg or more`, under: (x) => `had a mass under ${x} kg`,
  },
];

const ivLo = (ctx: HistCtx, j: number) => ctx.start + j * ctx.w;
const ivHi = (ctx: HistCtx, j: number) => ctx.start + (j + 1) * ctx.w - 1;
const ivLabel = (ctx: HistCtx, j: number) => `${ivLo(ctx, j)}–${ivHi(ctx, j)}`;
const ivLabels = (ctx: HistCtx) => keys(ctx.k).map((j) => ivLabel(ctx, j));

function histFigure(ctx: HistCtx, f: number[]): BarChartFigure {
  const step = Math.max(...f) > 14 ? 5 : 2;
  return { type: 'barChart', categories: ivLabels(ctx), values: f, valueLabel: ctx.label, categoryLabel: ctx.cl, max: step * (Math.floor(Math.max(...f) / step) + 1), step };
}

/** Mound-shaped frequencies for each interval (one peak, falling off on both sides); even (on a grid line) when `even`. */
function freqs(rng: Rng, k: number, even: boolean, lo = 1, hi = 12): number[] {
  return retry(
    () => {
      const peak = rng.int(0, k - 1);
      const top = rng.int(hi - 3, hi);
      const drop = rng.int(2, 4);
      return keys(k).map((j) => {
        const v = Math.max(lo, Math.min(hi, top - drop * Math.abs(j - peak) - rng.int(0, 2)));
        return even ? Math.max(2, 2 * Math.round(v / 2)) : v;
      });
    },
    (f) => f.filter((x) => x === Math.max(...f)).length === 1 && new Set(f).size >= k - 2 && (even || f.some((x) => x % 2 === 1)),
    300,
  );
}

const READ_HIST = 'Find the bar for the interval, then look straight across from its top to the scale on the left.';

function histRead(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX);
  const f = freqs(rng, ctx.k, true);
  const j = rng.int(0, ctx.k - 1);
  return {
    prompt: `${ctx.intro} The histogram shows the results. How many ${ctx.who} ${ctx.inRange(ivLo(ctx, j), ivHi(ctx, j))}?`,
    figure: histFigure(ctx, f),
    parts: [numPart(f[j], { suffix: ctx.who })],
    hints: [READ_HIST, 'The height of a bar in a histogram is the frequency: how many values are in that interval.'],
    solution: [`Find the ${ivLabel(ctx, j)} bar.`, `Its top is level with $${f[j]}$ on the scale.`, `$${f[j]}$ ${ctx.who} ${ctx.inRange(ivLo(ctx, j), ivHi(ctx, j))}.`],
  };
}

function histMost(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX);
  const f = freqs(rng, ctx.k, true);
  const top = f.indexOf(Math.max(...f));
  const low = f.indexOf(Math.min(...f));
  const labels = ivLabels(ctx);
  const others = rng.shuffle(keys(ctx.k).filter((j) => j !== top && j !== low));
  const answer = mc(rng, labels[top], [labels[low], ...others.map((j) => labels[j])]);
  return {
    prompt: `${ctx.intro} The histogram shows the results. Which interval has the most ${ctx.who}?`,
    figure: histFigure(ctx, f),
    parts: [{ answer }],
    hints: ['The tallest bar has the greatest frequency.', 'Read the interval under the tallest bar.'],
    solution: [`The tallest bar reaches $${f[top]}$.`, `It is the bar for ${labels[top]}.`, `The interval ${labels[top]} has the most ${ctx.who}.`],
    answerDisplay: labels[top],
  };
}

function histTotal(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX);
  const f = freqs(rng, ctx.k, false);
  const T = sum(f);
  return {
    prompt: `${ctx.intro} The histogram shows the results. How many ${ctx.who} are there in all?`,
    figure: histFigure(ctx, f),
    parts: [numPart(T, { suffix: ctx.who })],
    hints: ['Each bar tells how many values are in its interval. A bar that ends between two grid lines is halfway between their numbers.', 'Add the heights of all the bars.'],
    solution: [`Read every bar: ${ivLabels(ctx).map((l, j) => `${l}: $${f[j]}$`).join(', ')}.`, `$${plus(f)} = ${T}$`, `There are $${T}$ ${ctx.who} in all.`],
  };
}

function histAtLeast(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX);
  const f = freqs(rng, ctx.k, false);
  const j = rng.int(2, ctx.k - 2);
  const x = ivLo(ctx, j);
  const up = rng.chance(0.5);
  const sel = up ? keys(ctx.k).filter((i) => i >= j) : keys(ctx.k).filter((i) => i < j);
  const S = sum(sel.map((i) => f[i]));
  return {
    prompt: `${ctx.intro} The histogram shows the results. How many ${ctx.who} ${up ? ctx.atLeast(x) : ctx.under(x)}?`,
    figure: histFigure(ctx, f),
    parts: [numPart(S, { suffix: ctx.who })],
    hints: [`Decide which intervals fit: ${up ? `every interval from ${ivLabel(ctx, j)} up` : `every interval below ${ivLabel(ctx, j)}`}.`, 'Read those bars and add them.'],
    solution: [
      `The intervals that fit are ${andList(sel.map((i) => ivLabel(ctx, i)))}.`,
      `Their bars are ${andList(sel.map((i) => `$${f[i]}$`))}.`,
      `$${plus(sel.map((i) => f[i]))} = ${S}$`,
      `$${S}$ ${ctx.who} ${up ? ctx.atLeast(x) : ctx.under(x)}.`,
    ],
  };
}

/** Raw data for the frequencies, with at least one value on a lower boundary (not the first) so boundaries matter. */
function rawData(rng: Rng, ctx: HistCtx, f: number[]): { data: number[]; edge: number } {
  const per = f.map((n, j) => keys(n).map(() => rng.int(ivLo(ctx, j), ivHi(ctx, j))));
  const edge = rng.pick(keys(ctx.k).filter((j) => j > 0 && f[j] > 0));
  per[edge][0] = ivLo(ctx, edge);
  const other = rng.pick(keys(ctx.k).filter((j) => f[j] > (j === edge ? 1 : 0)));
  per[other][per[other].length - 1] = ivHi(ctx, other);
  return { data: rng.shuffle(per.flat()), edge };
}

function histTally(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX.filter((c) => c.start < 100));
  const f = retry(() => keys(ctx.k).map(() => rng.int(1, 5)), (fs) => sum(fs) >= 14 && sum(fs) <= 20, 200);
  const { data, edge } = rawData(rng, ctx, f);
  const j = rng.chance(0.6) ? edge : rng.int(0, ctx.k - 1);
  const inside = data.filter((x) => x >= ivLo(ctx, j) && x <= ivHi(ctx, j)).sort((a, b) => a - b);
  return {
    prompt: `${ctx.intro} Here are the ${ctx.data}:\n\n${listTex(data)}\n\nThe data will be shown in a histogram with the intervals ${andList(ivLabels(ctx))}. What is the frequency of the ${ivLabel(ctx, j)} interval?`,
    parts: [numPart(inside.length)],
    hints: [`The interval ${ivLabel(ctx, j)} includes both ${ivLo(ctx, j)} and ${ivHi(ctx, j)}, and every whole number between them.`, 'Go through the list and count the values in that interval. Cross each one off so you do not count it twice.'],
    solution: [
      `The ${ivLabel(ctx, j)} interval holds the values from ${ivLo(ctx, j)} to ${ivHi(ctx, j)}.`,
      `In order, the values in it are ${listTex(inside)}.`,
      `There ${inside.length === 1 ? 'is' : 'are'} $${inside.length}$ of them, so the frequency is $${inside.length}$.`,
    ],
    calculator: false,
  };
}

function histPercent(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX);
  const { f, j, up, p } = retry(
    () => {
      const f = freqs(rng, ctx.k, false, 2, 14);
      const j = rng.int(1, ctx.k - 2);
      const up = rng.chance(0.5);
      const S = sum(keys(ctx.k).filter((i) => (up ? i >= j : i < j)).map((i) => f[i]));
      return { f, j, up, p: (S * 100) / sum(f) };
    },
    (o) => !onEdge(o.p, 1),
    300,
  );
  const sel = keys(ctx.k).filter((i) => (up ? i >= j : i < j));
  const S = sum(sel.map((i) => f[i]));
  const T = sum(f);
  const x = ivLo(ctx, j);
  const r = rounded(p, 1, '%', 'the nearest tenth of a percent');
  return {
    prompt: `${ctx.intro} The histogram shows the results. What percent of the ${ctx.who} ${up ? ctx.atLeast(x) : ctx.under(x)}?${r.ask}`,
    figure: histFigure(ctx, f),
    parts: [r.part],
    hints: ['Add all the bars to find the total. Then add only the bars for the intervals that fit.', 'Percent $= \\dfrac{\\text{part}}{\\text{total}} \\times 100$'],
    solution: [
      `Total: $${plus(f)} = ${T}$`,
      `The intervals that fit are ${andList(sel.map((i) => ivLabel(ctx, i)))}: $${plus(sel.map((i) => f[i]))} = ${S}$`,
      `$\\dfrac{${S}}{${T}} \\times 100 ${eq(p, 1)}$`,
      `${r.exact ? '' : 'About '}$${r.tex}\\%$ of the ${ctx.who} ${up ? ctx.atLeast(x) : ctx.under(x)}.`,
    ],
  };
}

function histMedian(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX);
  const { f, med } = retry(
    () => {
      const f = freqs(rng, ctx.k, false, 1, 12);
      const n = sum(f);
      let acc = 0;
      const med = f.findIndex((x) => (acc += x) >= (n + 1) / 2);
      return { f, med };
    },
    (o) => sum(o.f) % 2 === 1 && o.f.indexOf(Math.max(...o.f)) !== o.med,
    400,
  );
  const n = sum(f);
  const pos = (n + 1) / 2;
  const labels = ivLabels(ctx);
  const mode = f.indexOf(Math.max(...f));
  const near = rng.shuffle(keys(ctx.k).filter((j) => j !== med && j !== mode)).sort((a, b) => Math.abs(a - med) - Math.abs(b - med));
  const cum: number[] = [];
  f.reduce((s, x) => (cum.push(s + x), s + x), 0);
  return {
    prompt: `${ctx.intro} The histogram shows the results. Which interval contains the median?`,
    figure: histFigure(ctx, f),
    parts: [{ answer: mc(rng, labels[med], [labels[mode], ...near.map((j) => labels[j])]) }],
    hints: [`The median is the middle value when all ${n} values are in order: value number $\\dfrac{${n} + 1}{2}$.`, 'Add the bars from the left (the smallest values) until the running total reaches that value number.'],
    solution: [
      `There are $${plus(f)} = ${n}$ values, so the median is value number $\\dfrac{${n} + 1}{2} = ${pos}$ in order.`,
      `Running totals from the left: ${labels.slice(0, med + 1).map((l, j) => `${l}: $${cum[j]}$`).join(', ')}.`,
      `Values $${(med ? cum[med - 1] : 0) + 1}$ to $${cum[med]}$ are in the ${labels[med]} interval, so value number $${pos}$ is there.`,
      `The median is in the interval ${labels[med]}. (The tallest bar, ${labels[mode]}, shows the most common interval, not the median.)`,
    ],
    answerDisplay: labels[med],
  };
}

function histMatch(rng: Rng): Out {
  const ctx = rng.pick(HIST_CTX.filter((c) => c.start < 100));
  const { data, f, wrong } = retry(
    () => {
      const f = keys(ctx.k).map(() => rng.int(1, 5));
      const { data } = rawData(rng, ctx, f);
      // Boundary mistake: a value on a lower boundary counted in the interval below.
      const edgeMistake = keys(ctx.k).map((j) => data.filter((x) => (x > ivLo(ctx, j) && x <= ivHi(ctx, j)) || x === ivLo(ctx, j + 1)).length);
      // Two neighbouring bars swapped.
      const s = rng.int(0, ctx.k - 2);
      const swapped = f.slice();
      [swapped[s], swapped[s + 1]] = [swapped[s + 1], swapped[s]];
      // One value counted in the wrong interval.
      const [a, b] = rng.sample(keys(ctx.k), 2);
      const miscount = f.slice();
      miscount[a] += 1;
      miscount[b] -= 1;
      const wrong = [edgeMistake, swapped, miscount];
      return { data, f, wrong };
    },
    (o) => new Set([o.f, ...o.wrong].map((x) => x.join(','))).size === 4 && o.wrong.every((x) => x.every((v) => v >= 0)) && sum(o.f) >= 13 && sum(o.f) <= 20,
    400,
  );
  const answer = mcFigures(rng, [f, ...wrong].map((fs, i) => ({ md: '', figure: histFigure(ctx, fs), correct: i === 0 })));
  const edges = data.filter((x) => (x - ctx.start) % ctx.w === 0 && x > ctx.start).sort((a, b) => a - b);
  return {
    prompt: `${ctx.intro} Here are the ${ctx.data}:\n\n${listTex(data)}\n\nWhich histogram shows these data correctly, using the intervals ${andList(ivLabels(ctx))}?`,
    parts: [{ answer }],
    hints: ['Make a tally: go through the list and put each value in its interval.', `Watch the values on a boundary: ${ivLo(ctx, 1)} belongs in ${ivLabel(ctx, 1)}, not in ${ivLabel(ctx, 0)}.`],
    solution: [
      ...keys(ctx.k).map((j) => {
        const inside = data.filter((x) => x >= ivLo(ctx, j) && x <= ivHi(ctx, j)).sort((a, b) => a - b);
        return `${ivLabel(ctx, j)}: ${inside.length ? listTex(inside) : 'none'}, so the frequency is $${f[j]}$.`;
      }),
      `Values on a lower boundary, such as ${listTex(edges)}, go in the interval that starts with them.`,
      `The correct histogram has bars of heights ${andList(f.map((x) => `$${x}$`))} from left to right.`,
    ],
  };
}

const histogram = skill({
  id: 'm203-histogram',
  name: 'Histograms',
  description: 'Read a histogram with equal intervals, sort raw data into intervals, and find totals, percents and the interval that holds the median or the most values.',
  outcomes: ['S1'],
  lessonId: 'm203-8-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return { ...(rng.chance(0.6) ? histRead(rng) : histMost(rng)), calculator: false };
    if (d === 2) {
      const m = rng.pick(['tally', 'total', 'atLeast'] as const);
      if (m === 'tally') return histTally(rng);
      return { ...(m === 'total' ? histTotal(rng) : histAtLeast(rng)), calculator: false };
    }
    const m = rng.pick(['pct', 'median', 'match'] as const);
    if (m === 'pct') return histPercent(rng);
    if (m === 'median') return { ...histMedian(rng), calculator: false };
    return { ...histMatch(rng), calculator: false };
  },
});

// ---------------------------------------------------------------------------
// 8.2 Line graphs
// ---------------------------------------------------------------------------

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Shape = 'up' | 'down' | 'hill' | 'valley';

interface LineCtx {
  intro: (name: string) => string;
  xs: number[];
  xStep: number;
  xLabel: string;
  yLabel: string;
  yStep: number;
  yTop: number;
  vLo: number;
  vHi: number;
  shape: Shape;
  /** Suffix and words for a value: 'kg'. */
  unit: string;
  when: (x: number) => string;
  ask: string;
  what: string;
  per: string;
}

const LINES: LineCtx[] = [
  {
    intro: () => 'The line graph shows the temperature in Riverton on a summer day. The times use the 24-hour clock.',
    xs: [6, 8, 10, 12, 14, 16, 18], xStep: 2, xLabel: 'Time of day (h)', yLabel: 'Temperature (°C)',
    yStep: 4, yTop: 32, vLo: 12, vHi: 30, shape: 'hill', unit: '°C',
    when: (x) => `at ${x}:00`, ask: 'What was the temperature', what: 'the temperature', per: 'hour',
  },
  {
    intro: () => 'The line graph shows the natural gas a house in a city with cold winters used each month last year, in gigajoules (GJ).',
    xs: keys(12).map((i) => i + 1), xStep: 1, xLabel: 'Month (1 = January)', yLabel: 'Gas used (GJ)',
    yStep: 2, yTop: 24, vLo: 2, vHi: 22, shape: 'valley', unit: 'GJ',
    when: (x) => `in ${MONTHS[x - 1]}`, ask: 'How much gas did the house use', what: 'the gas used', per: 'month',
  },
  {
    intro: (name) => `${name} weighed a calf at birth and then once a week. The line graph shows its mass.`,
    xs: [0, 1, 2, 3, 4, 5, 6], xStep: 1, xLabel: 'Week', yLabel: 'Mass (kg)',
    yStep: 10, yTop: 120, vLo: 30, vHi: 110, shape: 'up', unit: 'kg',
    when: (x) => (x === 0 ? 'at birth' : `at week ${x}`), ask: 'What was the calf’s mass', what: 'the calf’s mass', per: 'week',
  },
  {
    intro: () => 'A rancher measured the depth of the water in a stock-watering dugout each week during a dry summer.',
    xs: [0, 1, 2, 3, 4, 5, 6], xStep: 1, xLabel: 'Week', yLabel: 'Water depth (cm)',
    yStep: 20, yTop: 260, vLo: 40, vHi: 240, shape: 'down', unit: 'cm',
    when: (x) => (x === 0 ? 'at the start' : `at week ${x}`), ask: 'How deep was the water', what: 'the water depth', per: 'week',
  },
  {
    intro: () => 'The line graph shows how many campsites were booked each month at a campground in the mountains.',
    xs: [5, 6, 7, 8, 9, 10], xStep: 1, xLabel: 'Month (5 = May)', yLabel: 'Campsites booked',
    yStep: 20, yTop: 220, vLo: 20, vHi: 200, shape: 'hill', unit: 'campsites',
    when: (x) => `in ${MONTHS[x - 1]}`, ask: 'How many campsites were booked', what: 'the number of campsites booked', per: 'month',
  },
  {
    intro: () => 'The line graph shows the depth of the snow at a small ski hill at the start of each week in spring.',
    xs: [0, 1, 2, 3, 4, 5, 6], xStep: 1, xLabel: 'Week', yLabel: 'Snow depth (cm)',
    yStep: 20, yTop: 200, vLo: 20, vHi: 180, shape: 'down', unit: 'cm',
    when: (x) => (x === 0 ? 'at the start' : `at week ${x}`), ask: 'How deep was the snow', what: 'the snow depth', per: 'week',
  },
];

const valTex = (ctx: { unit: string }, v: number) => (ctx.unit === '°C' ? `$${num(v)}^\\circ\\text{C}$` : ctx.unit === 'campsites' ? `$${num(v)}$ campsites` : `$${num(v)}\\ \\text{${ctx.unit}}$`);
const whenCap = (ctx: LineCtx, x: number) => cap(ctx.when(x));

/** Values with the context's shape: strictly rising, falling, rising then falling, or falling then rising. */
function lineValues(rng: Rng, ctx: LineCtx, half: boolean): number[] {
  const unit = half ? ctx.yStep / 2 : ctx.yStep;
  const n = ctx.xs.length;
  return retry(
    () => {
      // The line turns at `peak` for a hill or valley, and never turns for a steady rise or fall.
      const peak = ctx.shape === 'hill' || ctx.shape === 'valley' ? rng.int(2, n - 3) : n - 1;
      const rising = ctx.shape === 'up' || ctx.shape === 'hill';
      const out = [rising ? ctx.vLo + unit * rng.int(0, 3) : ctx.vHi - unit * rng.int(0, 3)];
      for (let i = 1; i < n; i++) {
        const goUp = i <= peak ? rising : !rising;
        out.push(out[i - 1] + (goUp ? 1 : -1) * unit * rng.int(1, 3));
      }
      return out;
    },
    (vs) => vs.every((v) => v >= ctx.vLo && v <= ctx.vHi) && (!half || vs.some((v) => v % ctx.yStep !== 0)),
    500,
  );
}

function lineFigure(ctx: LineCtx, vs: number[]): PlaneFigure {
  const pts = ctx.xs.map((x, i) => [x, vs[i]] as [number, number]);
  return {
    type: 'plane',
    grid: { xMin: ctx.xs[0], xMax: ctx.xs[ctx.xs.length - 1], yMin: 0, yMax: ctx.yTop, xStep: ctx.xStep, yStep: ctx.yStep, xLabel: ctx.xLabel, yLabel: ctx.yLabel },
    polylines: [{ points: pts }],
    points: pts.map(([x, y]) => ({ x, y })),
  };
}

const READ_LINE = 'Find the time on the bottom axis. Go straight up to the point, then straight across to the scale on the left.';
const HALF_LINE = 'A point halfway between two grid lines is halfway between their numbers.';

function lineRead(rng: Rng, name: string): Out {
  const ctx = rng.pick(LINES);
  const vs = lineValues(rng, ctx, false);
  const i = rng.int(0, vs.length - 1);
  return {
    prompt: `${ctx.intro(name)} ${ctx.ask} ${ctx.when(ctx.xs[i])}?`,
    figure: lineFigure(ctx, vs),
    parts: [numPart(vs[i], { suffix: ctx.unit })],
    hints: [READ_LINE, `The grid lines on the left go up by $${num(ctx.yStep)}$.`],
    solution: [`Find ${ctx.xs[i]} on the bottom axis (${ctx.xLabel.replace(/ \(.*\)$/, '').toLowerCase()}).`, `The point above it is level with $${num(vs[i])}$ on the left scale.`, `The answer is ${valTex(ctx, vs[i])}.`],
  };
}

const TREND: Record<Shape, string> = {
  up: 'It went up the whole time.',
  down: 'It went down the whole time.',
  hill: 'It went up, then down.',
  valley: 'It went down, then up.',
};

function lineTrend(rng: Rng, name: string): Out {
  const ctx = rng.pick(LINES);
  const vs = lineValues(rng, ctx, false);
  const order: Shape[] = ['up', 'down', 'hill', 'valley'];
  const turn = ctx.shape === 'hill' ? vs.indexOf(Math.max(...vs)) : ctx.shape === 'valley' ? vs.indexOf(Math.min(...vs)) : -1;
  const n = vs.length;
  const steps =
    turn < 0
      ? [`From ${ctx.when(ctx.xs[0])} to ${ctx.when(ctx.xs[n - 1])}, every segment of the line goes ${ctx.shape === 'up' ? 'up' : 'down'}: from $${num(vs[0])}$ to $${num(vs[n - 1])}$.`]
      : [
          `From ${ctx.when(ctx.xs[0])} to ${ctx.when(ctx.xs[turn])}, the line goes ${ctx.shape === 'hill' ? 'up' : 'down'}, from $${num(vs[0])}$ to $${num(vs[turn])}$.`,
          `After that, it goes ${ctx.shape === 'hill' ? 'down' : 'up'} to $${num(vs[n - 1])}$ ${ctx.when(ctx.xs[n - 1])}.`,
        ];
  return {
    prompt: `${ctx.intro(name)} Which statement best describes the trend in ${ctx.what}?`,
    figure: lineFigure(ctx, vs),
    parts: [{ answer: fixedChoice(order.map((s) => TREND[s]), order.indexOf(ctx.shape)) }],
    hints: ['Follow the line from left to right.', 'Notice whether each piece of the line goes up or down, and where it changes direction.'],
    solution: [...steps, `The trend: ${TREND[ctx.shape].charAt(0).toLowerCase()}${TREND[ctx.shape].slice(1)}`],
    answerDisplay: TREND[ctx.shape],
    calculator: false,
  };
}

function lineRate(rng: Rng, name: string): Out {
  const ctx = rng.pick(LINES);
  const { vs, i, j, rate } = retry(
    () => {
      const vs = lineValues(rng, ctx, true);
      const [i, j] = rng.sample(keys(vs.length), 2).sort((a, b) => a - b);
      // Where a hill or valley turns: both points must be on the same side, so the line only rises or only falls between them.
      const turn = ctx.shape === 'hill' ? vs.indexOf(Math.max(...vs)) : ctx.shape === 'valley' ? vs.indexOf(Math.min(...vs)) : -1;
      return { vs, i, j, rate: Math.abs(vs[j] - vs[i]) / (ctx.xs[j] - ctx.xs[i]), sameSide: turn < 0 || j <= turn || i >= turn };
    },
    (o) => o.sameSide && o.j - o.i >= 2 && o.vs[o.j] !== o.vs[o.i] && !onEdge(o.rate, 1),
    400,
  );
  const up = vs[j] > vs[i];
  const dv = Math.abs(vs[j] - vs[i]);
  const dx = ctx.xs[j] - ctx.xs[i];
  const unitPer = `${ctx.unit} per ${ctx.per}`;
  const r = rounded(rate, 1, unitPer, 'the nearest tenth');
  const perWord = ctx.per === 'hour' ? 'hours' : `${ctx.per}s`;
  return {
    prompt: `${ctx.intro(name)} At what average rate did ${ctx.what} ${up ? 'go up' : 'go down'} from ${ctx.when(ctx.xs[i]).replace(/^(at|in) /, '')} to ${ctx.when(ctx.xs[j]).replace(/^(at|in) /, '')}? Give the rate in ${unitPer}.${r.ask}`,
    figure: lineFigure(ctx, vs),
    parts: [r.part],
    hints: [`${READ_LINE} ${HALF_LINE}`, 'Rate of change $= \\dfrac{\\text{change in value}}{\\text{change in time}}$'],
    solution: [
      `${whenCap(ctx, ctx.xs[i])}: ${valTex(ctx, vs[i])}. ${whenCap(ctx, ctx.xs[j])}: ${valTex(ctx, vs[j])}.`,
      `Change: $${num(Math.max(vs[i], vs[j]))} - ${num(Math.min(vs[i], vs[j]))} = ${num(dv)}$ over $${ctx.xs[j]} - ${ctx.xs[i]} = ${dx}$ ${perWord}.`,
      `Rate: $${num(dv)} \\div ${dx} ${eq(rate, 1)}$`,
      `${cap(ctx.what)} went ${up ? 'up' : 'down'} at ${r.exact ? '' : 'about '}$${r.tex}$ ${unitPer}.`,
    ],
  };
}

function lineChange(rng: Rng, name: string): Out {
  const ctx = rng.pick(LINES);
  const vs = lineValues(rng, ctx, true);
  const [i, j] = retry(() => rng.sample(keys(vs.length), 2).sort((a, b) => a - b), ([a, b]) => vs[a] !== vs[b] && (vs[a] % ctx.yStep !== 0 || vs[b] % ctx.yStep !== 0));
  const up = vs[j] > vs[i];
  const dv = Math.abs(vs[j] - vs[i]);
  return {
    prompt: `${ctx.intro(name)} By how much did ${ctx.what} ${up ? 'go up' : 'go down'} from ${ctx.when(ctx.xs[i]).replace(/^(at|in) /, '')} to ${ctx.when(ctx.xs[j]).replace(/^(at|in) /, '')}?`,
    figure: lineFigure(ctx, vs),
    parts: [numPart(dv, { suffix: ctx.unit })],
    hints: [`${READ_LINE} ${HALF_LINE}`, 'Subtract the smaller value from the larger value.'],
    solution: [
      `${whenCap(ctx, ctx.xs[i])}: ${valTex(ctx, vs[i])}. ${whenCap(ctx, ctx.xs[j])}: ${valTex(ctx, vs[j])}.`,
      `$${num(Math.max(vs[i], vs[j]))} - ${num(Math.min(vs[i], vs[j]))} = ${num(dv)}$`,
      `${cap(ctx.what)} went ${up ? 'up' : 'down'} by ${valTex(ctx, dv)}.`,
    ],
    calculator: false,
  };
}

function lineBiggest(rng: Rng, name: string): Out {
  const ctx = rng.pick(LINES);
  const { vs, k } = retry(
    () => {
      const vs = lineValues(rng, ctx, true);
      const ch = vs.slice(1).map((v, i) => Math.abs(v - vs[i]));
      const best = Math.max(...ch);
      return { vs, k: ch.filter((c) => c === best).length === 1 ? ch.indexOf(best) : -1 };
    },
    (o) => o.k >= 0,
    400,
  );
  const ch = vs.slice(1).map((v, i) => v - vs[i]);
  const best = Math.abs(ch[k]);
  const up = ch[k] > 0;
  const rate = best / ctx.xStep;
  const unitPer = `${ctx.unit} per ${ctx.per}`;
  return {
    prompt: `${ctx.intro(name)} Find the part of the graph between two points next to each other where ${ctx.what} changed the fastest. What was the rate of change there, in ${unitPer}?`,
    figure: lineFigure(ctx, vs),
    parts: [numPart(clean(rate), { suffix: unitPer })],
    hints: ['The steepest part of the line shows the fastest change, up or down.', `Read the two points at the ends of the steepest piece. Divide the change by the time between them (${ctx.xStep === 1 ? `one ${ctx.per}` : `${ctx.xStep} ${ctx.per}s`}).`],
    solution: [
      `Read every point: ${listTex(vs)}.`,
      `The changes from one point to the next are ${andList(ch.map((c) => `$${c > 0 ? '+' : ''}${num(c)}$`))}.`,
      `The biggest change is from ${ctx.when(ctx.xs[k]).replace(/^(at|in) /, '')} to ${ctx.when(ctx.xs[k + 1]).replace(/^(at|in) /, '')}: ${up ? 'up' : 'down'} $${num(best)}$ in $${ctx.xStep}$ ${ctx.xStep === 1 ? ctx.per : `${ctx.per}s`}.`,
      `Rate: $${num(best)} \\div ${ctx.xStep} = ${num(rate)}$`,
      `${cap(ctx.what)} changed fastest there, at $${num(rate)}$ ${unitPer}.`,
    ],
  };
}

interface LinCtx {
  intro: (name: string) => string;
  xLabel: string;
  yLabel: string;
  yStep: number;
  v0: number[];
  /** Change per step; each is a multiple of half a grid step so the points are easy to read. */
  rates: number[];
  sign: 1 | -1;
  unit: string;
  /** The x-axis word: "hour", "week". */
  per: string;
  money?: boolean;
  when: (x: number) => string;
  what: string;
  /** "How much diesel will be left in the tank after 9 hours?" */
  ask: (when: string, name: string) => string;
  /** "When will the tank be empty?" for a target value. */
  reach: (v: number, name: string) => string;
  /** Target values to ask about. */
  targets: number[];
}

const LIN_CTX: LinCtx[] = [
  {
    intro: () => 'A generator at a remote well site burns diesel at a steady rate. The line graph shows the diesel left in its tank.',
    xLabel: 'Time (h)', yLabel: 'Diesel in tank (L)', yStep: 20, v0: [200, 220, 240, 260, 280], rates: [10, 20, 30], sign: -1, unit: 'L', per: 'hour',
    when: (x) => (x === 0 ? 'at the start' : `after ${x} hour${x === 1 ? '' : 's'}`), what: 'the diesel in the tank',
    ask: (w) => `how much diesel will be left in the tank ${w}`,
    reach: (v) => (v === 0 ? 'after how many hours will the tank be empty' : `after how many hours will only $${v}\\ \\text{L}$ be left`),
    targets: [0, 20, 40, 60],
  },
  {
    intro: (name) => `${name} weighs a calf every week. Its mass is going up at a steady rate.`,
    xLabel: 'Week', yLabel: 'Mass (kg)', yStep: 10, v0: [35, 40, 45], rates: [5, 10, 15], sign: 1, unit: 'kg', per: 'week',
    when: (x) => (x === 0 ? 'at birth' : `at week ${x}`), what: 'the calf’s mass',
    ask: (w) => `what will the calf’s mass be ${w}`,
    reach: (v) => `in which week will the calf reach $${v}\\ \\text{kg}$`,
    targets: keys(30).map((i) => 100 + 5 * i),
  },
  {
    intro: () => 'A truck driver leaves Riverton and drives north on the highway at a steady speed. The line graph shows the distance travelled.',
    xLabel: 'Time (h)', yLabel: 'Distance (km)', yStep: 50, v0: [0], rates: [75, 100], sign: 1, unit: 'km', per: 'hour',
    when: (x) => (x === 0 ? 'at the start' : `after ${x} hour${x === 1 ? '' : 's'}`), what: 'the distance travelled',
    ask: (w) => `how far will the driver have travelled ${w}`,
    reach: (v) => `how many hours will it take to travel $${num(v)}\\ \\text{km}$`,
    targets: [525, 600, 675, 700, 750, 800, 900, 1000],
  },
  {
    intro: (name) => `${name} is saving the same amount each week for a used truck. The line graph shows ${name}’s savings.`,
    xLabel: 'Week', yLabel: 'Savings ($)', yStep: 100, v0: [200, 300, 400, 500], rates: [50, 100, 150], sign: 1, unit: '$', per: 'week', money: true,
    when: (x) => (x === 0 ? 'at the start' : `after ${x} week${x === 1 ? '' : 's'}`), what: 'the amount saved',
    ask: (w, name) => `how much will ${name} have saved ${w}`,
    reach: (v, name) => `after how many weeks will ${name} have ${money(v)}`,
    targets: [1500, 2000, 2500, 3000],
  },
  {
    intro: () => 'An auger fills a grain bin on a farm at a steady rate. The line graph shows the wheat in the bin.',
    xLabel: 'Time (h)', yLabel: 'Wheat in bin (t)', yStep: 10, v0: [0, 10, 20], rates: [5, 10, 15], sign: 1, unit: 't', per: 'hour',
    when: (x) => (x === 0 ? 'at the start' : `after ${x} hour${x === 1 ? '' : 's'}`), what: 'the wheat in the bin',
    ask: (w) => `how many tonnes of wheat will be in the bin ${w}`,
    reach: (v) => `after how many hours will the bin hold $${v}\\ \\text{t}$`,
    targets: [80, 90, 100, 120, 150],
  },
];

const linVal = (ctx: LinCtx, v: number) => (ctx.money ? money(v) : `$${num(v)}\\ \\text{${ctx.unit}}$`);
const linNum = (ctx: LinCtx, v: number) => (ctx.money ? mv(v) : num(v));
const linPart = (ctx: LinCtx, v: number) => (ctx.money ? numPart(v, { label: '\\$' }) : numPart(v, { suffix: ctx.unit }));
const ucFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function linFigure(ctx: LinCtx, xs: number[], vs: number[]): PlaneFigure {
  const top = ctx.yStep * (Math.floor(Math.max(...vs) / ctx.yStep) + 1);
  const pts = xs.map((x, i) => [x, vs[i]] as [number, number]);
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: xs[xs.length - 1], yMin: 0, yMax: top, xStep: 1, yStep: ctx.yStep, xLabel: ctx.xLabel, yLabel: ctx.yLabel },
    polylines: [{ points: pts }],
    points: pts.map(([x, y]) => ({ x, y })),
  };
}

function linePredict(rng: Rng, name: string): Out {
  const ctx = rng.pick(LIN_CTX);
  const xs = keys(rng.int(5, 6));
  const last = xs[xs.length - 1];
  const { v0, r } = retry(
    () => ({ v0: rng.pick(ctx.v0), r: rng.pick(ctx.rates) }),
    (o) => o.v0 + ctx.sign * o.r * (last + 2) >= 0 && (ctx.sign > 0 || o.v0 - o.r * last >= ctx.yStep),
    200,
  );
  const vs = xs.map((x) => v0 + ctx.sign * r * x);
  const figure = linFigure(ctx, xs, vs);
  const rateLine = `${ucFirst(ctx.when(0))}, ${ctx.what} is ${linVal(ctx, v0)}; ${ctx.when(1)}, it is ${linVal(ctx, vs[1])}. So it ${ctx.sign > 0 ? 'goes up' : 'goes down'} by ${linVal(ctx, r)} each ${ctx.per}.`;
  // When will it reach a target? (Only targets reached at a whole number of steps after the graph ends.)
  const targets = ctx.targets.filter((t) => {
    const x = (t - v0) / (ctx.sign * r);
    return isWhole(x) && x > last + 1 && x <= last + 14;
  });
  if (targets.length && rng.chance(0.5)) {
    const t = rng.pick(targets);
    const x = (t - v0) / (ctx.sign * r);
    const dv = Math.abs(t - v0);
    return {
      prompt: `${ctx.intro(name)} If the trend continues at the same rate, ${ctx.reach(t, name)}?`,
      figure,
      parts: [numPart(x, { label: ctx.per === 'week' && /which week/.test(ctx.reach(t, name)) ? 'Week' : undefined, suffix: /which week/.test(ctx.reach(t, name)) ? undefined : `${ctx.per}s` })],
      hints: [`Find the rate: how much ${ctx.what} changes each ${ctx.per}.`, 'Find how much it must change from the start, then divide by the rate.'],
      solution: [
        rateLine,
        `From the start, it must change by ${ctx.money ? `${money(Math.max(t, v0))} - ${money(Math.min(t, v0))} = ${money(dv)}` : `$${num(Math.max(t, v0))} - ${num(Math.min(t, v0))} = ${num(dv)}\\ \\text{${ctx.unit}}$`}.`,
        `$${linNum(ctx, dv)} \\div ${linNum(ctx, r)} = ${x}$`,
        /which week/.test(ctx.reach(t, name)) ? `The calf will reach ${linVal(ctx, t)} at week $${x}$.` : `It will take $${x}$ ${ctx.per}s.`,
      ],
    };
  }
  // Predict a value beyond the graph.
  const maxAhead = ctx.sign < 0 ? Math.floor(v0 / r) - last : 8;
  const xt = last + rng.int(2, Math.max(2, Math.min(8, maxAhead)));
  const vt = v0 + ctx.sign * r * xt;
  const lastV = vs[vs.length - 1];
  return {
    prompt: `${ctx.intro(name)} If the trend continues at the same rate, ${ctx.ask(ctx.when(xt), name)}?`,
    figure,
    parts: [linPart(ctx, vt)],
    hints: [`Find the rate: read two points and find how much ${ctx.what} changes each ${ctx.per}.`, `Start from the last point and ${ctx.sign > 0 ? 'add' : 'subtract'} the rate once for every ${ctx.per} after it.`],
    solution: [
      rateLine,
      `The graph ends at ${ctx.per} $${last}$ with ${linVal(ctx, lastV)}. From ${ctx.per} $${last}$ to ${ctx.per} $${xt}$ is $${xt - last}$ ${ctx.per}s.`,
      `$${linNum(ctx, lastV)} ${ctx.sign > 0 ? '+' : '-'} ${xt - last} \\times ${linNum(ctx, r)} = ${linNum(ctx, vt)}$`,
      `${ucFirst(ctx.when(xt))}, ${ctx.what} will be ${linVal(ctx, vt)}.`,
    ],
  };
}

const lineGraph = skill({
  id: 'm203-line-graph',
  name: 'Line graphs',
  description: 'Read values from a line graph, describe its trend, find the rate of change between two points, and predict by extending a steady trend.',
  outcomes: ['S1'],
  lessonId: 'm203-8-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.6) ? { ...lineRead(rng, name), calculator: false } : lineTrend(rng, name);
    if (d === 2) return rng.chance(0.6) ? lineRate(rng, name) : lineChange(rng, name);
    return rng.chance(0.65) ? linePredict(rng, name) : lineBiggest(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 8.2 Choosing a graph and spotting a misleading graph
// ---------------------------------------------------------------------------

type GType = 'bar' | 'circle' | 'line' | 'histogram';
const GTYPES: GType[] = ['bar', 'circle', 'line', 'histogram'];
const GNAME: Record<GType, string> = { bar: 'Bar graph', circle: 'Circle graph', line: 'Line graph', histogram: 'Histogram' };
const GWHY: Record<GType, string> = {
  bar: 'it compares amounts in separate categories',
  circle: 'it shows how one whole is split into parts',
  line: 'it shows how something changes over time',
  histogram: 'it shows how many numerical values fall in each equal interval',
};

const SCENARIOS: Record<GType, string[]> = {
  bar: [
    'the number of trucks of each brand in a company’s fleet',
    'the number of students in each trade program at a college',
    'how many of each kind of power tool a hardware store sold last month',
    'the number of each breed of cattle on a ranch',
    'the number of apprentices in each trade at a construction company',
    'the number of vehicles of each colour in a parking lot',
  ],
  circle: [
    'the percent of an apprentice’s monthly budget spent on rent, food, fuel, savings and other costs',
    'the fraction of a farm’s land used for each crop',
    'what share of a store’s total sales came from each department',
    'the percent of a company’s workers who drive, carpool, take the bus or walk to work',
    'how a household’s energy bill is split among heating, hot water, lights and appliances',
  ],
  line: [
    'the temperature in a town every hour for one day',
    'a calf’s mass at the end of each week for ten weeks',
    'the number of apprentices a company hired each year from 2015 to 2025',
    'the water level in a reservoir on the first day of each month for a year',
    'the balance in a savings account at the end of each month',
  ],
  histogram: [
    'the ages of 200 customers, grouped as 10–19, 20–29, 30–39 and so on',
    'the birth masses of 80 calves, grouped as 25–29 kg, 30–34 kg, 35–39 kg and so on',
    'the commute times of 150 workers, grouped into 10-minute intervals',
    'the hours worked by 60 part-time employees in one week, grouped into equal intervals',
    'the heights of 40 tomato seedlings, grouped into 5 cm intervals',
  ],
};

function chooseBest(rng: Rng, name: string, why: boolean): Out {
  const t = rng.pick(GTYPES);
  const sc = rng.pick(SCENARIOS[t]);
  const options = GTYPES.map((g) => (why ? `${GNAME[g]}, because ${GWHY[g]}` : GNAME[g]));
  return {
    prompt: `${name} wants to make a graph of ${sc}. Which type of graph is best${why ? ', and why' : ''}?`,
    parts: [{ answer: why ? mc(rng, options[GTYPES.indexOf(t)], options.filter((_, i) => i !== GTYPES.indexOf(t))) : fixedChoice(options, GTYPES.indexOf(t)) }],
    hints: ['Ask yourself: are the data separate categories, parts of one whole, changes over time, or numbers grouped into intervals?', 'Bar graph: categories. Circle graph: parts of a whole. Line graph: change over time. Histogram: numerical data in equal intervals.'],
    solution: [
      t === 'bar'
        ? 'The data are counts for separate categories, so the bars can be compared side by side.'
        : t === 'circle'
          ? 'The data are parts of one whole that add to $100\\%$, so each part can be a sector of a circle.'
          : t === 'line'
            ? 'The data show one quantity measured again and again over time, so a line shows the trend.'
            : 'The data are numbers grouped into equal intervals, so each interval gets a bar and the bars touch.',
      `The best choice is a ${GNAME[t].toLowerCase()}, because ${GWHY[t]}.`,
    ],
    answerDisplay: options[GTYPES.indexOf(t)],
    calculator: false,
  };
}

type Flaw = 'axis' | 'uneven' | 'type' | 'touch';
const FLAW_REASON: Record<Flaw, string> = {
  axis: 'The vertical axis does not start at $0$, so small differences look much bigger than they are.',
  uneven: 'The years are not evenly spaced, but the bars are, so the change looks slower or faster than it really is.',
  type: 'The data should be shown in a circle graph instead.',
  touch: 'The bars should touch each other, as in a histogram.',
};

interface Trunc {
  figure: PlaneFigure;
  intro: string;
  xs: number[];
  vs: number[];
  base: number;
  what: string;
  unit: string;
}

/** A bar graph whose vertical axis starts well above 0, drawn on a plane with the bars as rectangles. */
function truncGraph(rng: Rng): Trunc {
  const ctx = rng.pick([
    { intro: 'A truck dealership made this graph of the pickups it sold each year.', base: 90, step: 2, what: 'Pickups sold', unit: 'pickups' },
    { intro: 'A gym put this graph of its members on a poster.', base: 450, step: 10, what: 'Members', unit: 'members' },
    { intro: 'A bakery made this graph of the loaves of bread it sold each year.', base: 1800, step: 40, what: 'Loaves sold', unit: 'loaves' },
    { intro: 'An oilfield services company made this graph of the wells it serviced each year.', base: 300, step: 5, what: 'Wells serviced', unit: 'wells' },
    { intro: 'A hotel in a mountain park made this graph of the rooms it booked each July.', base: 180, step: 4, what: 'Rooms booked', unit: 'rooms' },
  ]);
  const xs = [2021, 2022, 2023, 2024];
  const vs = retry(
    () => {
      const out = [ctx.base + ctx.step * rng.int(1, 2)];
      for (let i = 1; i < 4; i++) out.push(out[i - 1] + ctx.step * rng.int(1, 3));
      return out;
    },
    (v) => v[3] <= ctx.base + 9 * ctx.step && v[3] - ctx.base >= 3 * (v[0] - ctx.base),
    300,
  );
  const figure: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 2020.4, xMax: 2024.6, yMin: ctx.base, yMax: ctx.base + 10 * ctx.step, xStep: 1, yStep: ctx.step, xLabel: 'Year', yLabel: ctx.what },
    polylines: xs.map((x, i) => ({ points: [[x - 0.3, ctx.base], [x - 0.3, vs[i]], [x + 0.3, vs[i]], [x + 0.3, ctx.base]] as Array<[number, number]> })),
  };
  return { figure, intro: ctx.intro, xs, vs, base: ctx.base, what: ctx.what, unit: ctx.unit };
}

interface Uneven {
  figure: BarChartFigure;
  intro: string;
  years: number[];
  vs: number[];
  g: number;
  what: string;
  unit: string;
}

/** Steady yearly growth shown at uneven years with evenly spaced bars. */
function unevenGraph(rng: Rng): Uneven {
  const ctx = rng.pick([
    { intro: 'A town council near a big city made this bar graph of the town’s population.', what: 'population', label: 'Population', v0: [2000, 2400, 3000], g: [40, 50, 60, 80], unit: 'people' },
    { intro: 'A curling club made this bar graph of its members.', what: 'number of members', label: 'Members', v0: [100, 120, 150], g: [2, 3, 4, 5], unit: 'members' },
    { intro: 'A rural county made this bar graph of the electric vehicles registered there.', what: 'number of electric vehicles', label: 'Electric vehicles', v0: [20, 40, 60], g: [10, 15, 20], unit: 'vehicles' },
    { intro: 'A trucking company made this bar graph of the trucks in its fleet.', what: 'number of trucks', label: 'Trucks', v0: [10, 12, 15], g: [2, 3, 4], unit: 'trucks' },
  ]);
  const years = rng.pick([
    [2000, 2010, 2020, 2022, 2024],
    [2004, 2014, 2020, 2022, 2024],
    [2000, 2010, 2020, 2021, 2022],
  ]);
  const v0 = rng.pick(ctx.v0);
  const g = rng.pick(ctx.g);
  const vs = years.map((y) => v0 + g * (y - years[0]));
  return {
    figure: { type: 'barChart', categories: years.map(String), values: vs, valueLabel: ctx.label, categoryLabel: 'Year' },
    intro: ctx.intro,
    years,
    vs,
    g,
    what: ctx.what,
    unit: ctx.unit,
  };
}

function misleadingWhy(rng: Rng): Out {
  if (rng.chance(0.55)) {
    const t = truncGraph(rng);
    return {
      prompt: `${t.intro} It makes the growth look huge. Why is this graph misleading?`,
      figure: t.figure,
      parts: [{ answer: mc(rng, FLAW_REASON.axis, [FLAW_REASON.uneven, FLAW_REASON.type, FLAW_REASON.touch]) }],
      hints: ['Look at the number at the bottom of the vertical axis.', 'If the axis does not start at $0$, the bottoms of the bars are cut off.'],
      solution: [
        `The vertical axis starts at $${num(t.base)}$, not at $0$, so the bottoms of the bars are cut off.`,
        `The real change is from $${num(t.vs[0])}$ to $${num(t.vs[3])}$, only $${num(t.vs[3] - t.vs[0])}$ ${t.unit}, but the last bar looks several times as tall as the first.`,
        `The answer is: ${FLAW_REASON.axis}`,
      ],
      answerDisplay: FLAW_REASON.axis,
    };
  }
  const u = unevenGraph(rng);
  return {
    prompt: `${u.intro} It seems to show that growth slowed down. Why is this graph misleading?`,
    figure: u.figure,
    parts: [{ answer: mc(rng, FLAW_REASON.uneven, [FLAW_REASON.axis, FLAW_REASON.type, FLAW_REASON.touch]) }],
    hints: ['Read the years under the bars. How many years are between each pair of bars?', 'A fair graph spaces equal time intervals equally.'],
    solution: [
      `The gaps between the years are ${andList(u.years.slice(1).map((y, i) => `$${y - u.years[i]}$`))} years, but the bars are spaced evenly.`,
      `So a $${u.years[1] - u.years[0]}$-year jump and a $${u.years[4] - u.years[3]}$-year jump look the same width apart, and the growth seems to slow down.`,
      `The answer is: ${FLAW_REASON.uneven}`,
    ],
    answerDisplay: FLAW_REASON.uneven,
  };
}

function truncTruth(rng: Rng): Out {
  const t = truncGraph(rng);
  const [a, b] = [t.vs[0], t.vs[3]];
  const pct = ((b - a) / a) * 100;
  const looks = Math.round((b - t.base) / (a - t.base));
  const pctTxt = `about $${fmtFixed(pct, 0)}\\%$`;
  const correct = `${t.what} went up by $${num(b - a)}$, which is ${pctTxt}.`;
  return {
    prompt: `${t.intro} The 2024 bar looks about $${looks}$ times as tall as the 2021 bar. Read the graph carefully. Which statement is true?`,
    figure: t.figure,
    parts: [
      {
        answer: mc(rng, correct, [
          `${t.what} in 2024 were about $${looks}$ times ${t.what.toLowerCase()} in 2021.`,
          `${t.what} more than doubled from 2021 to 2024.`,
          `${t.what} went up by $${num(b - t.base)}$ from 2021 to 2024.`,
        ]),
      },
    ],
    hints: ['Read the real values of the 2021 and 2024 bars from the scale. Notice where the scale starts.', 'Find the increase, then divide it by the 2021 value and multiply by $100$ to get a percent.'],
    solution: [
      `The axis starts at $${num(t.base)}$, not $0$, so the bars are cut off at the bottom.`,
      `2021: $${num(a)}$. 2024: $${num(b)}$. Increase: $${num(b)} - ${num(a)} = ${num(b - a)}$`,
      `Percent increase: $\\dfrac{${num(b - a)}}{${num(a)}} \\times 100 \\approx ${fmtFixed(pct, 1)}\\%$`,
      `The true statement is: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

function unevenTruth(rng: Rng): Out {
  const u = unevenGraph(rng);
  const [y0, y1, y2, y3] = u.years;
  const d1 = u.vs[1] - u.vs[0];
  const d3 = u.vs[3] - u.vs[2];
  const unitTxt = u.unit === 'people' ? 'people' : u.unit;
  const correct = `The ${u.what} grew by the same amount every year: $${num(u.g)}$ ${unitTxt} a year.`;
  const ratio = d1 / d3;
  return {
    prompt: `${u.intro} Read the years carefully. Which statement is true?`,
    figure: u.figure,
    parts: [
      {
        answer: mc(rng, correct, [
          `The ${u.what} grew much more slowly after ${y2}.`,
          `The ${u.what} grew $${num(ratio)}$ times as fast from ${y0} to ${y1} as from ${y2} to ${y3}.`,
          `The ${u.what} grew by the same amount from ${y2} to ${y3} as from ${y0} to ${y1}.`,
        ]),
      },
    ],
    hints: ['Find the increase between each pair of bars, and the number of years between them.', 'Divide each increase by its number of years to compare the growth per year.'],
    solution: [
      `${y0} to ${y1}: up $${num(d1)}$ in $${y1 - y0}$ years, so $${num(d1)} \\div ${y1 - y0} = ${num(u.g)}$ a year.`,
      `${y2} to ${y3}: up $${num(d3)}$ in $${y3 - y2}$ ${y3 - y2 === 1 ? 'year' : 'years'}, so $${num(d3)} \\div ${y3 - y2} = ${num(u.g)}$ a year.`,
      'The growth per year never changed. The uneven years make the bars after the big gaps jump more.',
      `The true statement is: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

const chooseGraph = skill({
  id: 'm203-choose-graph',
  name: 'Choosing a graph and spotting misleading graphs',
  description: 'Choose the best type of graph for a set of data and explain how a graph can mislead, such as with a vertical axis that does not start at 0 or unevenly spaced intervals.',
  outcomes: ['S1'],
  lessonId: 'm203-8-2',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return chooseBest(rng, name, false);
    if (d === 2) return rng.chance(0.6) ? misleadingWhy(rng) : chooseBest(rng, name, true);
    return rng.chance(0.55) ? { ...truncTruth(rng), calculator: true } : { ...unevenTruth(rng), calculator: true };
  },
});

// ---------------------------------------------------------------------------
// 8.3 Numerical puzzles and games
// ---------------------------------------------------------------------------

// ---- Magic squares ----

const MAGIC_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
const LINE_NAMES = ['top row', 'middle row', 'bottom row', 'left column', 'middle column', 'right column', 'diagonal from top left to bottom right', 'diagonal from top right to bottom left'];

/** Every 3 × 3 magic square of whole numbers has this form, with centre c and magic sum 3c. */
const lucas = (c: number, a: number, b: number) => [c - b, c + a + b, c - a, c - a + b, c, c + a - b, c + a, c - a - b, c + b];

/** Brute force: how many magic squares with entries from 1 to 60 agree with the givens (and the magic sum, if given)? Stops at `limit`. */
function countMagic(givens: Array<number | null>, M: number | null, limit = 2): number {
  const known = givens.map((g, i) => [i, g] as const).filter((x): x is readonly [number, number] => x[1] !== null);
  // Cell i of lucas(c, a, b) is c + A[i] a + B[i] b.
  const A = [0, 1, -1, -1, 0, 1, 1, -1, 0];
  const B = [-1, 1, 0, 1, 0, -1, 0, -1, 1];
  let count = 0;
  for (let c = 1; c <= 60; c++) {
    if (M !== null && 3 * c !== M) continue;
    for (let a = -59; a <= 59; a++) {
      for (let b = -59; b <= 59; b++) {
        let ok = true;
        for (const [i, g] of known) if (c + A[i] * a + B[i] * b !== g) { ok = false; break; }
        if (!ok) continue;
        for (let i = 0; i < 9 && ok; i++) { const v = c + A[i] * a + B[i] * b; if (v < 1 || v > 60) ok = false; }
        if (ok && ++count >= limit) return count;
      }
    }
  }
  return count;
}

/** Solve by reasoning, one line at a time. Returns the steps and the order the unknowns were found, or null when stuck. */
function solveMagic(grid: Array<number | null>, M0: number | null, letter: (i: number) => string): { steps: string[]; order: number[]; M: number } | null {
  const g = grid.slice();
  const steps: string[] = [];
  const order: number[] = [];
  let M = M0;
  if (M === null) {
    const full = MAGIC_LINES.findIndex((l) => l.every((i) => g[i] !== null));
    if (full < 0) return null;
    M = sum(MAGIC_LINES[full].map((i) => g[i]!));
    steps.push(`The ${LINE_NAMES[full]} is complete: $${plus(MAGIC_LINES[full].map((i) => g[i]!))} = ${M}$, so every row, column and diagonal adds to $${M}$.`);
  }
  while (g.some((v) => v === null)) {
    const k = MAGIC_LINES.findIndex((l) => l.filter((i) => g[i] === null).length === 1);
    if (k < 0) return null;
    const line = MAGIC_LINES[k];
    const u = line.find((i) => g[i] === null)!;
    const others = line.filter((i) => i !== u).map((i) => g[i]!);
    g[u] = M - sum(others);
    order.push(u);
    steps.push(`The ${LINE_NAMES[k]}: $${plus(others)} + ${letter(u)} = ${M}$, so $${letter(u)} = ${M} - ${sum(others)} = ${g[u]}$.`);
  }
  return { steps, order, M };
}

function magicFigure(grid: Array<number | null>, letter: (i: number) => string): PlaneFigure {
  const c = new Canvas(4, 4);
  for (let k = 0; k <= 3; k++) {
    c.seg([0.5 + k, 0.5], [0.5 + k, 3.5]);
    c.seg([0.5, 0.5 + k], [3.5, 0.5 + k]);
  }
  grid.forEach((v, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    c.text([1 + col, 3 - row], v === null ? letter(i) : String(v));
  });
  return c.build();
}

function magicItem(rng: Rng, d: 1 | 2 | 3): Out {
  const hide = d === 1 ? 1 : d === 2 ? rng.int(3, 4) : 5;
  const { sq, grid, giveM, sol } = retry(
    () => {
      const c = rng.int(d === 1 ? 5 : 8, d === 1 ? 12 : 22);
      const a = rng.nonZero(-(c - 2), c - 2);
      const b = rng.nonZero(-(c - 2), c - 2);
      const sq = lucas(c, a, b);
      const hidden = rng.sample(keys(9), hide);
      const grid = sq.map((v, i) => (hidden.includes(i) ? null : v));
      const complete = MAGIC_LINES.some((l) => l.every((i) => grid[i] !== null));
      const giveM = !complete;
      const sol = solveMagic(grid, giveM ? 3 * c : null, (i) => letterOf(grid, i));
      return { sq, grid, giveM, sol };
    },
    (o) =>
      new Set(o.sq).size === 9 &&
      o.sq.every((v) => v >= 1 && v <= 40) &&
      o.sol !== null &&
      (d < 3 || o.giveM || rng.chance(0.3)) &&
      countMagic(o.grid, o.giveM ? o.sol.M : null) === 1,
    300,
  );
  const s = sol!;
  const target = s.order[s.order.length - 1];
  const L = (i: number) => letterOf(grid, i);
  const v = sq[target];
  const names = grid.map((g, i) => (g === null ? L(i) : '')).filter(Boolean);
  return {
    prompt: `In a magic square, every row, every column and both diagonals add to the same number, called the magic sum.${giveM ? ` The magic sum of this square is $${s.M}$.` : ''} ${hide === 1 ? 'Find the number that goes in the cell marked $?$.' : `The cells ${andList(names)} are missing. What number is ${L(target)}?`}`,
    figure: magicFigure(grid, L),
    parts: [numPart(v, { label: hide === 1 ? '$? =$' : `${L(target)} $=$` })],
    hints: [
      giveM ? `Every line adds to $${s.M}$. Look for a line with only one missing number.` : 'Find a row, column or diagonal with no missing numbers. Its sum is the magic sum.',
      hide === 1 ? 'Use a line through the empty cell: the magic sum minus the two numbers you know.' : 'Then find a line with just one missing number and subtract. Each number you find can help you finish another line.',
    ],
    solution: [...s.steps, `The answer is ${hide === 1 ? '$? = ' : `$${L(target)} = `}${v}$.`],
    calculator: false,
  };
}

/** Letters for the missing cells, in reading order; a single missing cell is "?". */
function letterOf(grid: Array<number | null>, i: number): string {
  const missing = grid.map((g, k) => (g === null ? k : -1)).filter((k) => k >= 0);
  if (missing.length === 1) return '?';
  return 'ABCDEFG'[missing.indexOf(i)];
}

// ---- Cage-sum puzzles (Latin squares with sums) ----

const latinCache = new Map<number, number[][]>();
/** Every n × n Latin square with the numbers 1 to n, as flat arrays (12 when n = 3, 576 when n = 4). */
function latinSquares(n: number): number[][] {
  const hit = latinCache.get(n);
  if (hit) return hit;
  const out: number[][] = [];
  const g: number[] = Array(n * n).fill(0);
  const place = (k: number) => {
    if (k === n * n) {
      out.push(g.slice());
      return;
    }
    const r = Math.floor(k / n);
    const c = k % n;
    for (let v = 1; v <= n; v++) {
      let ok = true;
      for (let j = 0; j < c && ok; j++) if (g[r * n + j] === v) ok = false;
      for (let i = 0; i < r && ok; i++) if (g[i * n + c] === v) ok = false;
      if (!ok) continue;
      g[k] = v;
      place(k + 1);
      g[k] = 0;
    }
  };
  place(0);
  latinCache.set(n, out);
  return out;
}

/** Split the grid into connected cages; returns the cage number of each cell. */
function makeCages(rng: Rng, n: number): number[] {
  const id = Array(n * n).fill(-1);
  let next = 0;
  const nbrs = (k: number) => {
    const r = Math.floor(k / n);
    const c = k % n;
    return [r > 0 ? k - n : -1, r < n - 1 ? k + n : -1, c > 0 ? k - 1 : -1, c < n - 1 ? k + 1 : -1].filter((x) => x >= 0);
  };
  for (const start of rng.shuffle(keys(n * n))) {
    if (id[start] >= 0) continue;
    const size = rng.pick(n === 3 ? [1, 2, 2, 3] : [1, 2, 2, 2, 3, 3]);
    const cage = [start];
    id[start] = next;
    while (cage.length < size) {
      const free = [...new Set(cage.flatMap(nbrs))].filter((k) => id[k] < 0);
      if (!free.length) break;
      const k = rng.pick(free);
      id[k] = next;
      cage.push(k);
    }
    next++;
  }
  return id;
}

function cageFigure(n: number, cage: number[], sums: Map<number, number>, givens: Map<number, number>, target: number): PlaneFigure {
  const c = new Canvas(n + 1, n + 1);
  const X = (col: number) => 0.5 + col;
  const Y = (row: number) => n + 0.5 - row;
  // Outer border.
  c.seg([X(0), Y(0)], [X(n), Y(0)]).seg([X(n), Y(0)], [X(n), Y(n)]).seg([X(n), Y(n)], [X(0), Y(n)]).seg([X(0), Y(n)], [X(0), Y(0)]);
  for (let r = 0; r < n; r++) {
    for (let col = 0; col < n; col++) {
      const k = r * n + col;
      if (col < n - 1) {
        const same = cage[k] === cage[k + 1];
        c.seg([X(col + 1), Y(r)], [X(col + 1), Y(r + 1)], same ? { dashed: true, color: 'muted' } : {});
      }
      if (r < n - 1) {
        const same = cage[k] === cage[k + n];
        c.seg([X(col), Y(r + 1)], [X(col + 1), Y(r + 1)], same ? { dashed: true, color: 'muted' } : {});
      }
    }
  }
  // Each cage's sum in the corner of its first cell (reading order).
  const seen = new Set<number>();
  for (let k = 0; k < n * n; k++) {
    if (seen.has(cage[k])) continue;
    seen.add(cage[k]);
    const r = Math.floor(k / n);
    const col = k % n;
    // A + marks the sum of a cage with more than one cell, so it is not mistaken for a number in the grid.
    c.text([X(col) + 0.3, Y(r) - 0.24], `${sums.get(cage[k])}${cage.filter((x) => x === cage[k]).length > 1 ? '+' : ''}`);
  }
  for (const [k, v] of givens) c.text([X(k % n) + 0.5, Y(Math.floor(k / n)) - 0.58], String(v));
  c.text([X(target % n) + 0.5, Y(Math.floor(target / n)) - 0.58], '?');
  return c.build();
}

function cageItem(rng: Rng, n: 3 | 4): Out {
  const all = latinSquares(n);
  const { sol, cage, sums, givens } = retry(
    () => {
      const sol = rng.pick(all);
      const cage = makeCages(rng, n);
      const sums = new Map<number, number>();
      cage.forEach((id, k) => sums.set(id, (sums.get(id) ?? 0) + sol[k]));
      // Brute force: every Latin square with the same cage sums.
      let fits = all.filter((sq) => [...sums].every(([id, s]) => sum(cage.map((x, k) => (x === id ? sq[k] : 0))) === s));
      const givens = new Map<number, number>();
      // If there is more than one solution, give the number in a cell where the solutions differ.
      while (fits.length > 1 && givens.size < 2) {
        const k = keys(n * n).find((x) => new Set(fits.map((sq) => sq[x])).size > 1)!;
        givens.set(k, sol[k]);
        fits = fits.filter((sq) => sq[k] === sol[k]);
      }
      return { sol, cage, sums, givens, unique: fits.length === 1 };
    },
    (o) => o.unique && [...o.sums.keys()].length >= (n === 3 ? 4 : 6) && keys(n * n).filter((k) => !o.givens.has(k) && o.cage.filter((x) => x === o.cage[k]).length >= 2).length > 0,
    300,
  );
  const target = rng.pick(keys(n * n).filter((k) => !givens.has(k) && cage.filter((x) => x === cage[k]).length >= 2));
  const rows = keys(n).map((r) => sol.slice(r * n, r * n + n));
  const singles = [...sums].filter(([id]) => cage.filter((x) => x === id).length === 1);
  const rowSum = (n * (n + 1)) / 2;
  return {
    prompt: `Fill the grid with the numbers $1$ to $${n}$ so that each number appears exactly once in every row and every column. Solid lines mark the cages. The numbers in each cage add up to the small number in its top-left corner (a cage of one cell just holds that number).${givens.size === 1 ? ' One number is filled in for you.' : givens.size ? ' Two numbers are filled in for you.' : ''} Find the number that goes in the cell marked $?$.`,
    figure: cageFigure(n, cage, sums, givens, target),
    parts: [numPart(sol[target], { label: '$? =$' })],
    hints: [
      `Start with the easy cages: a cage of one cell holds its sum, and a two-cell cage with sum $3$ must hold $1$ and $2$.`,
      `Every row and column holds ${andList(keys(n).map((i) => `$${i + 1}$`))}, so it adds to $${rowSum}$. Use that to finish a row or column when only one cell is left.`,
    ],
    solution: [
      singles.length ? `The one-cell cages are filled in by their sums: ${andList(singles.map(([, s]) => `$${s}$`))}.` : `Look for cages with only one possible set of numbers, such as a two-cell cage with sum $3$ ($1 + 2$) or $${2 * n - 1}$ ($${n - 1} + ${n}$).`,
      `Each row and column must use ${andList(keys(n).map((i) => `$${i + 1}$`))} once. Trying the possibilities in the cages, there is only one way to fill the whole grid:`,
      ...rows.map((row, r) => `Row ${r + 1}: $${row.join(',\\ ')}$`),
      `Check: every row and column uses each number once, and every cage adds to its sum.`,
      `The cell marked $?$ is in row ${Math.floor(target / n) + 1}, column ${(target % n) + 1}, so $? = ${sol[target]}$.`,
    ],
    calculator: false,
  };
}

// ---- Number patterns ----

function patternItem(rng: Rng, d: 1 | 2 | 3): Out {
  if (d === 1) {
    const a = rng.int(2, 40);
    const dd = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 25]) * (rng.chance(0.3) ? -1 : 1);
    const terms = keys(5).map((i) => a + (dd < 0 ? -dd * 6 : 0) + dd * i);
    const missing = rng.chance(0.5);
    const shown = terms.map((t, i) => (missing && i === 2 ? '\\_\\_' : String(t)));
    const ans = missing ? terms[2] : a + (dd < 0 ? -dd * 6 : 0) + dd * 5;
    return {
      prompt: missing
        ? `The pattern ${dd > 0 ? 'adds' : 'subtracts'} the same number each time. What is the missing term? $${shown.join(',\\ ')}$`
        : `The pattern ${dd > 0 ? 'adds' : 'subtracts'} the same number each time. What is the next term? $${shown.join(',\\ ')},\\ \\_\\_$`,
      parts: [numPart(ans)],
      hints: ['Subtract two terms next to each other to find the change from one term to the next.', missing ? 'Add the change to the term before the gap.' : 'Add the change to the last term.'],
      solution: [`The change is $${terms[1]} - ${terms[0]} = ${dd}$.`, missing ? `$${terms[1]} ${dd > 0 ? '+' : '-'} ${Math.abs(dd)} = ${terms[2]}$` : `$${terms[4]} ${dd > 0 ? '+' : '-'} ${Math.abs(dd)} = ${ans}$`, `The ${missing ? 'missing' : 'next'} term is $${ans}$.`],
      calculator: false,
    };
  }
  const ctx = rng.pick([
    { what: 'squares in a row made of toothpicks', unit: 'toothpicks', first: 4, d: 3 },
    { what: 'triangles in a row made of toothpicks', unit: 'toothpicks', first: 3, d: 2 },
    { what: 'hexagons in a row made of toothpicks', unit: 'toothpicks', first: 6, d: 5 },
    { what: 'square tables pushed together in a row at a banquet hall, with chairs all around', unit: 'chairs', first: 4, d: 2 },
    { what: 'fence sections in a row. Each section has $3$ rails, and sections next to each other share a post', unit: 'pieces of wood', first: 5, d: 4 },
    { what: 'fence sections in a row. Each section has $4$ rails, and sections next to each other share a post', unit: 'pieces of wood', first: 6, d: 5 },
  ]);
  const count = (k: number) => ctx.first + ctx.d * (k - 1);
  const intro = `A pattern is made of ${ctx.what}. Figure $1$ uses $${count(1)}$ ${ctx.unit}, figure $2$ uses $${count(2)}$ and figure $3$ uses $${count(3)}$. Each new figure adds the same number of ${ctx.unit}.`;
  if (d === 2) {
    const m = rng.pick(['nth', 'nth', 'growing', 'times'] as const);
    if (m === 'growing') {
      const a = rng.int(1, 10);
      const d1 = rng.int(1, 6);
      const s = rng.int(1, 3);
      const terms = keys(6).map((i) => a + d1 * i + (s * i * (i - 1)) / 2);
      const diffs = terms.slice(1).map((t, i) => t - terms[i]);
      return {
        prompt: `In this pattern, the differences between terms go up by the same amount each time. What is the next term? $${terms.slice(0, 5).join(',\\ ')},\\ \\_\\_$`,
        parts: [numPart(terms[5])],
        hints: ['Find the differences between terms next to each other.', `The differences go up by $${s}$ each time. Find the next difference and add it to the last term.`],
        solution: [`Differences: ${andList(diffs.slice(0, 4).map((x) => `$${x}$`))}. They go up by $${s}$ each time.`, `The next difference is $${diffs[3]} + ${s} = ${diffs[4]}$.`, `$${terms[4]} + ${diffs[4]} = ${terms[5]}$`, `The next term is $${terms[5]}$.`],
        calculator: false,
      };
    }
    if (m === 'times') {
      const a = rng.int(1, 6);
      const r = rng.pick([2, 3]);
      const terms = keys(6).map((i) => a * r ** i);
      return {
        prompt: `In this pattern, each term is the term before it multiplied by the same number. What is the next term? $${terms.slice(0, 5).join(',\\ ')},\\ \\_\\_$`,
        parts: [numPart(terms[5])],
        hints: ['Divide a term by the term before it to find the multiplier.', 'Multiply the last term by that number.'],
        solution: [`$${terms[1]} \\div ${terms[0]} = ${r}$, so each term is multiplied by $${r}$.`, `$${terms[4]} \\times ${r} = ${terms[5]}$`, `The next term is $${terms[5]}$.`],
        calculator: false,
      };
    }
    const k = rng.int(10, 40);
    return {
      prompt: `${intro} How many ${ctx.unit} does figure $${k}$ use?`,
      parts: [numPart(count(k), { suffix: ctx.unit.split(' ')[0] })],
      hints: [`Each figure adds $${ctx.d}$. From figure $1$ to figure $${k}$ there are $${k} - 1 = ${k - 1}$ steps.`, `Figure $${k}$ uses $${ctx.first} + ${ctx.d} \\times ${k - 1}$.`],
      solution: [`The pattern adds $${count(2)} - ${count(1)} = ${ctx.d}$ each time.`, `From figure $1$ to figure $${k}$: $${k - 1}$ steps of $${ctx.d}$, so $${ctx.d} \\times ${k - 1} = ${ctx.d * (k - 1)}$.`, `$${ctx.first} + ${ctx.d * (k - 1)} = ${count(k)}$`, `Figure $${k}$ uses $${count(k)}$ ${ctx.unit}.`],
      calculator: false,
    };
  }
  // d3: which figure uses a given number?
  const k = rng.int(25, 90);
  const N = count(k);
  return {
    prompt: `${intro} Which figure uses exactly $${N}$ ${ctx.unit}?`,
    parts: [numPart(k, { label: 'Figure' })],
    hints: [`Figure $n$ uses $${ctx.first} + ${ctx.d}(n - 1)$ ${ctx.unit}.`, `Subtract $${ctx.first}$ from $${N}$, divide by $${ctx.d}$, then add $1$.`],
    solution: [
      `The pattern adds $${ctx.d}$ each time, so figure $n$ uses $${ctx.first} + ${ctx.d}(n - 1)$.`,
      `$${ctx.first} + ${ctx.d}(n - 1) = ${N}$, so $${ctx.d}(n - 1) = ${N - ctx.first}$.`,
      ctx.d === 1 ? `$n - 1 = ${N - ctx.first}$, so $n = ${k}$.` : `$n - 1 = ${N - ctx.first} \\div ${ctx.d} = ${k - 1}$, so $n = ${k}$.`,
      `Figure $${k}$ uses $${N}$ ${ctx.unit}.`,
    ],
    calculator: false,
  };
}

// ---- Take-away games ----

/** Moves (1 to k) that leave the other player in a losing position. With `misere`, taking the last counter loses. */
function winningMoves(n: number, k: number, misere: boolean): number[] {
  const win: boolean[] = [misere];
  for (let i = 1; i <= n; i++) win[i] = keys(Math.min(k, i)).some((m) => !win[i - (m + 1)]);
  return keys(Math.min(k, n)).map((m) => m + 1).filter((m) => !win[n - m]);
}

const COUNTERS = [
  { things: 'toothpicks', setting: 'on a table' },
  { things: 'coins', setting: 'in a pile' },
  { things: 'bolts', setting: 'in a bin at the shop' },
  { things: 'stones', setting: 'in a row' },
  { things: 'chips', setting: 'in a pile' },
];

function nimItem(rng: Rng, d: 1 | 2 | 3, name: string): Out {
  const ctx = rng.pick(COUNTERS);
  const opp = rng.pick(NAMES.filter((x) => x !== name));
  const race = d === 3 && rng.chance(0.4);
  const misere = d === 3 && !race;
  const k = d === 1 ? 2 : rng.pick([3, 4]);
  if (race) {
    const T = rng.pick([21, 25, 30, 31, 40, 50]);
    const { S, moves } = retry(
      () => {
        const S = rng.int(1, T - k - 2);
        return { S, moves: winningMoves(T - S, k, false) };
      },
      (o) => o.moves.length === 1,
      200,
    );
    const say = S + moves[0];
    const keysNums = keys(T + 1).filter((x) => x > 0 && (T - x) % (k + 1) === 0);
    return {
      prompt: `${name} and ${opp} play a counting game. They take turns adding $1$ to $${k}$ to a running total, and they say the new total out loud. The player who says $${T}$ wins. The total is now $${S}$, and it is ${name}’s turn. What number should ${name} say to be sure of winning?`,
      parts: [numPart(say)],
      hints: [`Work backward from $${T}$. If ${name} says $${T - k - 1}$, can ${opp} reach $${T}$? Whatever ${opp} adds, ${name} can add enough to make $${k + 1}$.`, `So the safe numbers are $${T}$, $${T - (k + 1)}$, $${T - 2 * (k + 1)}$, and so on, going down by $${k + 1}$.`],
      solution: [
        `If ${name} says $${T - k - 1}$, then ${opp} can only reach $${T - k}$ to $${T - 1}$, and ${name} reaches $${T}$ next turn.`,
        `So the safe numbers go down from $${T}$ by $${k + 1}$: ${keysNums.slice().reverse().slice(0, 6).map((x) => `$${x}$`).join(', ')}${keysNums.length > 6 ? ', and so on' : ''}.`,
        `From $${S}$, ${name} can add $1$ to $${k}$, reaching $${S + 1}$ to $${S + k}$. The only safe number in that range is $${say}$.`,
        `${name} should say $${say}$ (add $${moves[0]}$). After that, each round, ${name} adds enough to make $${k + 1}$ together with what ${opp} added.`,
      ],
      calculator: false,
    };
  }
  const { N, moves } = retry(
    () => {
      const N = rng.int(d === 1 ? 7 : 13, d === 1 ? 17 : 35);
      return { N, moves: winningMoves(N, k, misere) };
    },
    (o) => o.moves.length === 1,
    200,
  );
  const m = moves[0];
  const left = N - m;
  const one = ctx.things.replace(/s$/, '');
  const rule = misere ? `The player who takes the last ${one} loses.` : `The player who takes the last ${one} wins.`;
  const safe = misere ? `one more than a multiple of $${k + 1}$` : `a multiple of $${k + 1}$`;
  const range = k === 2 ? '$1$ or $2$' : `$1$ to $${k}$`;
  const others = keys(k).map((i) => i + 1).filter((x) => x !== m && x <= N);
  return {
    prompt: `${name} and ${opp} play a game with $${N}$ ${ctx.things} ${ctx.setting}. They take turns removing $1$${k === 2 ? ' or $2$' : ` to $${k}$`} ${ctx.things}. ${rule} It is ${name}’s turn. How many ${ctx.things} should ${name} take to be sure of winning?`,
    parts: [numPart(m, { suffix: ctx.things })],
    hints: [
      misere
        ? `Work backward. If ${opp} must move when only $1$ is left, ${opp} loses. What about $${k + 2}$ left?`
        : `Work backward. If ${opp} must move when $${k + 1}$ are left, whatever ${opp} takes, ${name} can take the rest.`,
      `Leave ${opp} a number that is ${safe}. After that, each round, take enough to make $${k + 1}$ together with what ${opp} took.`,
    ],
    solution: [
      misere
        ? `If ${opp} faces $1$ ${one}, ${opp} must take it and lose. If ${opp} faces $${k + 2}$, whatever ${opp} takes (${range}), ${name} can leave exactly $1$.`
        : `If ${opp} faces $${k + 1}$ ${ctx.things}, whatever ${opp} takes (${range}), ${name} can take the rest and win.`,
      `So ${name} wants to leave ${opp} a number that is ${safe}: ${andList(keys(5).map((i) => `$${(misere ? 1 : 0) + (k + 1) * (misere ? i : i + 1)}$`))}, and so on.`,
      `From $${N}$, taking $${m}$ leaves $${left}$, which is ${safe}. Taking ${andList(others.map((x) => `$${x}$`)).replace(/ and /, ' or ')} would leave ${andList(others.map((x) => `$${N - x}$`)).replace(/ and /, ' or ')}, and then ${opp} could use the same plan against ${name}.`,
      `${name} should take $${m}$ ${m === 1 ? one : ctx.things}. After that, whatever ${opp} takes, ${name} takes enough to make $${k + 1}$ for the round.`,
    ],
    calculator: false,
  };
}

// ---- Logic puzzles ----

interface Clue {
  text: string;
  test: (x: number) => boolean;
  /** A stricter reading used when listing what is left (the uniqueness check uses `test`). */
  show?: (x: number) => boolean;
}

const tens = (x: number) => Math.floor(x / 10);
const ones = (x: number) => x % 10;

/** Clues that are true for t (a two-digit number). */
function cluesFor(rng: Rng, t: number): Clue[] {
  const out: Clue[] = [];
  out.push(t % 2 ? { text: 'I am odd.', test: (x) => x % 2 === 1 } : { text: 'I am even.', test: (x) => x % 2 === 0 });
  for (const m of [3, 4, 5, 6, 7, 9]) if (t % m === 0) out.push({ text: `I am a multiple of $${m}$.`, test: (x) => x % m === 0 });
  for (const m of rng.sample([3, 4, 5, 7, 9].filter((m) => t % m !== 0), 1)) out.push({ text: `I am not a multiple of $${m}$.`, test: (x) => x % m !== 0 });
  const s = tens(t) + ones(t);
  out.push({ text: `My digits add up to $${s}$.`, test: (x) => tens(x) + ones(x) === s });
  if (tens(t) > ones(t)) out.push({ text: 'My tens digit is greater than my ones digit.', test: (x) => tens(x) > ones(x) });
  if (tens(t) < ones(t)) out.push({ text: 'My tens digit is less than my ones digit.', test: (x) => tens(x) < ones(x) });
  const lo = Math.max(10, t - rng.int(5, 25));
  const hi = Math.min(99, t + rng.int(5, 25));
  // Tested as inclusive, so the answer is unique however a student reads "between".
  if (lo < t && t < hi) out.push({ text: `I am between $${lo}$ and $${hi}$.`, test: (x) => x >= lo && x <= hi, show: (x) => x > lo && x < hi });
  const p = tens(t) * ones(t);
  if (p > 0) out.push({ text: `The product of my digits is $${p}$.`, test: (x) => tens(x) * ones(x) === p });
  const dif = Math.abs(tens(t) - ones(t));
  out.push({ text: `My two digits differ by $${dif}$.`, test: (x) => Math.abs(tens(x) - ones(x)) === dif });
  if (Number.isInteger(Math.sqrt(t))) out.push({ text: 'I am a perfect square.', test: (x) => Number.isInteger(Math.sqrt(x)) });
  return out;
}

const TWO_DIGIT = keys(90).map((i) => i + 10);

function riddleItem(rng: Rng): Out {
  const { t, clues } = retry(
    () => {
      const t = rng.int(10, 99);
      const pool = rng.shuffle(cluesFor(rng, t));
      const clues: Clue[] = [];
      let cand = TWO_DIGIT;
      for (const c of pool) {
        const next = cand.filter(c.test);
        if (next.length === cand.length) continue;
        clues.push(c);
        cand = next;
        if (cand.length === 1) break;
      }
      // Brute force over every two-digit number: exactly one fits all the clues.
      const fits = TWO_DIGIT.filter((x) => clues.every((c) => c.test(x)));
      return { t, clues, fits };
    },
    (o) => o.fits.length === 1 && o.fits[0] === o.t && o.clues.length >= 3 && o.clues.length <= 4,
    400,
  );
  // Explain starting with the clue that leaves the fewest numbers, listing what is left.
  const steps: string[] = [];
  let cand = TWO_DIGIT;
  const count = (c: Clue) => TWO_DIGIT.filter(c.show ?? c.test).length;
  const order = clues.map((c, i) => ({ c, i })).sort((a, b) => count(a.c) - count(b.c));
  order.forEach(({ c, i }, step) => {
    cand = cand.filter(c.show ?? c.test);
    const list = cand.length <= 14 ? listTex(cand) : `$${cand.length}$ numbers`;
    steps.push(step === 0 ? `Start with clue ${i + 1}, “${c.text}” The two-digit numbers that fit are ${list}.` : `Clue ${i + 1}, “${c.text}” leaves ${list}.`);
  });
  return {
    prompt: `Use the clues to find the mystery number. Exactly one number fits.\n\nI am a two-digit number.\n\n${clues.map((c, i) => `${i + 1}. ${c.text}`).join('\n')}\n\nWhat number am I?`,
    parts: [numPart(t)],
    hints: ['Start with the clue that leaves the fewest numbers, and list them.', 'Cross out the numbers on your list that break any other clue.'],
    solution: [...steps, `Check: $${t}$ fits every clue, and no other two-digit number does.`, `The mystery number is $${t}$.`],
    calculator: false,
  };
}

function balanceItem(rng: Rng, name: string): Out {
  const ctx = rng.pick([
    { a: 'bag of gravel', as: 'bags of gravel', b: 'bag of sand', bs: 'bags of sand', verb: 'have a total mass of', unit: 'kg', lo: 15, hi: 40, money: false },
    { a: 'box of deck screws', as: 'boxes of deck screws', b: 'box of nails', bs: 'boxes of nails', verb: 'cost', unit: '$', lo: 6, hi: 30, money: true },
    { a: 'adult ticket', as: 'adult tickets', b: 'youth ticket', bs: 'youth tickets', verb: 'cost', unit: '$', lo: 8, hi: 30, money: true },
    { a: 'bale of hay', as: 'bales of hay', b: 'bale of straw', bs: 'bales of straw', verb: 'have a total mass of', unit: 'kg', lo: 20, hi: 40, money: false },
  ]);
  const twoOne = rng.chance(0.5);
  const { x, y } = retry(
    () => ({ x: rng.int(ctx.lo, ctx.hi), y: rng.int(ctx.lo, ctx.hi) }),
    (o) => o.x !== o.y,
    100,
  );
  const amt = (v: number) => (ctx.money ? money(v) : `$${v}\\ \\text{kg}$`);
  const askA = rng.chance(0.5);
  const v = askA ? x : y;
  // Two clues: (2a + b, a + b) or (2a + b, a + 2b).
  const c1 = 2 * x + y;
  const c2 = twoOne ? x + y : x + 2 * y;
  // Brute force: exactly one pair of whole numbers fits both clues.
  const fits = keys(200).flatMap((p) => keys(200).filter((q) => 2 * (p + 1) + (q + 1) === c1 && (twoOne ? p + 1 + q + 1 : p + 1 + 2 * (q + 1)) === c2));
  if (fits.length !== 1) return balanceItem(rng.fork('again'), name);
  const sol = twoOne
    ? [
        `The first group has one more ${ctx.a} than the second group, and everything else is the same.`,
        `So one ${ctx.a}: ${ctx.money ? `${money(c1)} - ${money(c2)} = ${money(x)}` : `$${c1} - ${c2} = ${x}\\ \\text{kg}$`}.`,
        `Then one ${ctx.b}: ${ctx.money ? `${money(c2)} - ${money(x)} = ${money(y)}` : `$${c2} - ${x} = ${y}\\ \\text{kg}$`}.`,
      ]
    : [
        `Put both groups together: $3$ ${ctx.as} and $3$ ${ctx.bs} ${ctx.verb} ${amt(c1 + c2)}.`,
        `So one ${ctx.a} and one ${ctx.b} together: ${ctx.money ? `${money(c1 + c2)} ÷ 3 = ${money(x + y)}` : `$${c1 + c2} \\div 3 = ${x + y}\\ \\text{kg}$`}.`,
        `The first group is $2$ ${ctx.as} and $1$ ${ctx.b}: that is one extra ${ctx.a} on top of one of each. So one ${ctx.a} is ${ctx.money ? `${money(c1)} - ${money(x + y)} = ${money(x)}` : `$${c1} - ${x + y} = ${x}\\ \\text{kg}$`}.`,
        `One ${ctx.b} is ${ctx.money ? `${money(x + y)} - ${money(x)} = ${money(y)}` : `$${x + y} - ${x} = ${y}\\ \\text{kg}$`}.`,
      ];
  return {
    prompt: `${name} notices that $2$ ${ctx.as} and $1$ ${ctx.b} ${ctx.verb} ${amt(c1)}, and that ${twoOne ? `$1$ ${ctx.a} and $1$ ${ctx.b}` : `$1$ ${ctx.a} and $2$ ${ctx.bs}`} ${ctx.verb} ${amt(c2)}. All the ${ctx.as} are the same, and so are all the ${ctx.bs}. What ${ctx.money ? 'does' : 'is the mass of'} one ${askA ? ctx.a : ctx.b}${ctx.money ? ' cost' : ''}?`,
    parts: [ctx.money ? numPart(v, { label: '\\$' }) : numPart(v, { suffix: 'kg' })],
    hints: [twoOne ? 'Compare the two groups. What is the only difference between them?' : 'Put the two groups together. How many of each item is that?', twoOne ? 'The difference in the totals is the value of the extra item.' : 'Divide to find the value of one of each, then compare with the first group.'],
    solution: [...sol, `One ${askA ? ctx.a : ctx.b} ${ctx.money ? 'costs' : 'has a mass of'} ${amt(v)}.`],
    calculator: false,
  };
}

const numberPuzzle = skill({
  id: 'm203-number-puzzle',
  name: 'Numerical puzzles and games',
  description: 'Solve magic squares, cage-sum puzzles, number patterns and logic puzzles, and find the winning move in take-away and counting games.',
  outcomes: ['N1'],
  lessonId: 'm203-8-3',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const m = rng.pick(['magic', 'pattern', 'nim'] as const);
      if (m === 'magic') return magicItem(rng, 1);
      if (m === 'pattern') return patternItem(rng, 1);
      return nimItem(rng, 1, name);
    }
    if (d === 2) {
      const m = rng.pick(['magic', 'cage', 'pattern', 'nim', 'balance'] as const);
      if (m === 'magic') return magicItem(rng, 2);
      if (m === 'cage') return cageItem(rng, 3);
      if (m === 'pattern') return patternItem(rng, 2);
      if (m === 'balance') return balanceItem(rng, name);
      return nimItem(rng, 2, name);
    }
    const m = rng.pick(['magic', 'cage', 'riddle', 'nim', 'pattern'] as const);
    if (m === 'magic') return magicItem(rng, 3);
    if (m === 'cage') return cageItem(rng, 4);
    if (m === 'riddle') return riddleItem(rng);
    if (m === 'pattern') return patternItem(rng, 3);
    return nimItem(rng, 3, name);
  },
});

export const GRAPH_SKILLS: SkillDef[] = [graphRead, histogram, lineGraph, chooseGraph, numberPuzzle];
