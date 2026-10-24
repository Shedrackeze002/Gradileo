/** Math 30-3 Unit 5 — Linear Relations (A1): patterns in tables and graphs, rate of change and initial value, writing and using equations, and interpolating and extrapolating. */
import { fixedChoice, mc, numPart, part, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, PlaneFigure, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj', 'Chloé', 'Tariq',
  'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Kai', 'Zainab', 'Mason',
  'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];

type Out = GenOutput;

const clean = (x: number) => roundTo(x, 9);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** A number in maths, thousands grouped. */
const num = (x: number) => fmtGroupTex(clean(x), 4);
const keys = (n: number) => [...Array(n).keys()];

/** Money in prose (never inside $...$): \$60 or \$63.50. */
function money(x: number, cents = false): string {
  const s = cents || !isWhole(x) ? fmtFixed(x, 2) : String(Math.round(x));
  const [i, f] = s.split('.');
  const g = i.replace(/^-/, '').length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return `\\$${g}${f === undefined ? '' : `.${f}`}`;
}
/** Money inside maths, without a dollar sign: 60 or 63.50. */
const mv = (x: number, cents = false) => (cents || !isWhole(x) ? fmtGroupTex(roundTo(x, 2), 2).replace(/\.(\d)$/, '.$10').replace(/^(-?[\d{},]+)$/, '$1.00') : num(Math.round(x)));
const CENT = 'Give dollar amounts to the nearest cent.';
const moneyPart = (v: number, label = '\\$', suffix?: string): Part => numPart(roundTo(v, 2), { decimals: 2, tolerance: 0.011, label, suffix });

/** True when v sits too close to a rounding boundary at dp places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.03;
}
const exactAt = (v: number, dp: number) => Math.abs(roundTo(v, dp) - v) < 1e-9;

// ---------------------------------------------------------------------------
// Contexts: y = b + sign × m × x
// ---------------------------------------------------------------------------

interface Ctx {
  id: string;
  setup: (name: string) => string;
  /** The pricing or rate rule in words, given the formatted rate and starting value. */
  rule: (M: string, B: string, name: string) => string;
  y: string;
  x: string;
  /** "the cost", "the diesel left in the tank" */
  yWhat: string;
  /** "the cost, $C$, in dollars" */
  yIs: string;
  /** "the number of hours, $h$" */
  xIs: string;
  /** "$3$ hours" */
  xq: (n: number) => string;
  /** "For $3$ hours" or "After $3$ hours", to start a sentence giving one data value. */
  lead?: (q: string) => string;
  per: string;
  money: boolean;
  /** Unit of y when it is not money. */
  yU: string;
  ms: number[];
  bs: number[];
  sign: 1 | -1;
  steps: number[];
  /** Largest sensible x (the tank is empty, a day's work ...). */
  xMax: (m: number, b: number) => number;
  /** What the initial value means. */
  bMean: string;
  xHead: string;
  yHead: string;
  xLabel: string;
  yLabel: string;
}

const hrs = (n: number) => `$${num(n)}$ hour${n === 1 ? '' : 's'}`;

const CTXS: Ctx[] = [
  {
    id: 'skid',
    setup: (n) => `${n} is renting a skid steer from an equipment rental shop.`,
    rule: (M, B) => `The shop charges a flat fee of ${B} plus ${M} per hour.`,
    y: 'C', x: 'h', yWhat: 'the cost', yIs: 'the cost, $C$, in dollars', xIs: 'the number of hours, $h$', xq: hrs, per: 'hour', money: true, yU: '',
    ms: [35, 40, 45, 50, 55], bs: [40, 50, 60, 75, 80], sign: 1, steps: [1, 2], xMax: () => 12,
    bMean: 'the flat fee charged no matter how many hours', xHead: 'Time (h)', yHead: 'Cost (\\$)', xLabel: 'Time (h)', yLabel: 'Cost ($)',
  },
  {
    id: 'taxi',
    setup: (n) => `${n} takes a taxi from the airport.`,
    rule: (M, B) => `The fare is ${B} to start plus ${M} per kilometre.`,
    y: 'C', x: 'd', yWhat: 'the fare', yIs: 'the fare, $C$, in dollars', xIs: 'the distance in kilometres, $d$', xq: (n) => `$${num(n)}\\ \\text{km}$`, per: 'kilometre', money: true, yU: '',
    ms: [1.75, 1.95, 2.05, 2.25], bs: [3.8, 4.1, 4.25, 4.5], sign: 1, steps: [5, 10], xMax: () => 50,
    bMean: 'the flag fee, charged before the taxi moves', xHead: 'Distance (km)', yHead: 'Fare (\\$)', xLabel: 'Distance (km)', yLabel: 'Fare ($)',
  },
  {
    id: 'driver',
    setup: (n) => `${n} drives a delivery van in the city.`,
    rule: (M, B, n) => `${n} earns ${B} a day plus ${M} for each package delivered.`,
    y: 'P', x: 'n', yWhat: 'the daily pay', yIs: 'the daily pay, $P$, in dollars', xIs: 'the number of packages, $n$', xq: (n) => `$${num(n)}$ packages`, per: 'package', money: true, yU: '',
    ms: [1.25, 1.5, 1.75, 2], bs: [80, 90, 100, 120], sign: 1, steps: [10, 20, 25], xMax: () => 200,
    bMean: 'the base pay for a day, even with no packages', xHead: 'Packages', yHead: 'Pay (\\$)', xLabel: 'Packages delivered', yLabel: 'Pay ($)',
  },
  {
    id: 'tractor',
    setup: () => 'A tractor on a grain farm starts the day with a full tank of diesel and works at a steady pace.',
    rule: (M, B) => `The tank holds ${B} and the tractor burns ${M} per hour.`,
    lead: (q) => `After ${q}`,
    y: 'V', x: 'h', yWhat: 'the diesel left in the tank', yIs: 'the diesel left, $V$, in litres', xIs: 'the number of hours worked, $h$', xq: hrs, per: 'hour', money: false, yU: 'L',
    ms: [12, 15, 16, 18, 20, 24], bs: [300, 360, 400, 450, 480], sign: -1, steps: [1, 2], xMax: (m, b) => b / m,
    bMean: 'the diesel in the tank at the start', xHead: 'Time (h)', yHead: 'Diesel left (L)', xLabel: 'Time (h)', yLabel: 'Diesel left (L)',
  },
  {
    id: 'phone',
    setup: (n) => `${n} has a cellphone plan.`,
    rule: (M, B) => `The plan costs ${B} a month plus ${M} for each gigabyte (GB) of data.`,
    y: 'C', x: 'g', yWhat: 'the monthly bill', yIs: 'the monthly bill, $C$, in dollars', xIs: 'the data used in GB, $g$', xq: (n) => `$${num(n)}$ GB`, per: 'GB', money: true, yU: '',
    ms: [5, 7.5, 10, 12.5, 15], bs: [25, 30, 35, 40, 45], sign: 1, steps: [1, 2], xMax: () => 20,
    bMean: 'the monthly fee, even with no data used', xHead: 'Data (GB)', yHead: 'Bill (\\$)', xLabel: 'Data used (GB)', yLabel: 'Monthly bill ($)',
  },
  {
    id: 'plumber',
    setup: (n) => `${n} calls a plumber to fix a leaking water line.`,
    rule: (M, B) => `The plumber charges a call-out fee of ${B} plus ${M} per hour.`,
    y: 'C', x: 'h', yWhat: 'the cost', yIs: 'the cost, $C$, in dollars', xIs: 'the number of hours, $h$', xq: hrs, per: 'hour', money: true, yU: '',
    ms: [85, 90, 95, 110, 120], bs: [65, 75, 89, 99], sign: 1, steps: [1, 0.5], xMax: () => 10,
    bMean: 'the call-out fee, charged before any work is done', xHead: 'Time (h)', yHead: 'Cost (\\$)', xLabel: 'Time (h)', yLabel: 'Cost ($)',
  },
  {
    id: 'concrete',
    setup: () => 'A contractor orders ready-mix concrete for a driveway.',
    rule: (M, B) => `The supplier charges a delivery fee of ${B} plus ${M} per cubic metre.`,
    y: 'C', x: 'v', yWhat: 'the cost', yIs: 'the cost, $C$, in dollars', xIs: 'the volume in cubic metres, $v$', xq: (n) => `$${num(n)}\\ \\text{m}^3$`, per: 'cubic metre', money: true, yU: '',
    ms: [165, 175, 185, 195, 210], bs: [100, 120, 150, 175], sign: 1, steps: [1, 2], xMax: () => 12,
    bMean: 'the delivery fee', xHead: 'Concrete (m³)', yHead: 'Cost (\\$)', xLabel: 'Concrete (m³)', yLabel: 'Cost ($)',
  },
  {
    id: 'tank',
    setup: () => 'A stock tank on a cattle ranch is being drained for cleaning.',
    rule: (M, B) => `It holds ${B} of water at the start and drains at ${M} per minute.`,
    lead: (q) => `After ${q}`,
    y: 'V', x: 't', yWhat: 'the water left in the tank', yIs: 'the water left, $V$, in litres', xIs: 'the time in minutes, $t$', xq: (n) => `$${num(n)}$ minute${n === 1 ? '' : 's'}`, per: 'minute', money: false, yU: 'L',
    ms: [20, 25, 30, 40, 45], bs: [600, 750, 900, 1200], sign: -1, steps: [2, 5], xMax: (m, b) => b / m,
    bMean: 'the water in the tank at the start', xHead: 'Time (min)', yHead: 'Water left (L)', xLabel: 'Time (min)', yLabel: 'Water left (L)',
  },
];

interface Rel {
  c: Ctx;
  m: number;
  b: number;
  name: string;
}

const yAt = (r: Rel, x: number) => clean(r.b + r.c.sign * r.m * x);
/** The signed rate of change. */
const slope = (r: Rel) => r.c.sign * r.m;
/** A y-value in prose: \$60 or $400\ \text{L}$. */
const qty = (r: Rel, v: number, cents?: boolean) => (r.c.money ? money(v, cents) : `$${num(v)}\\ \\text{${r.c.yU}}$`);
/** A y-value in maths, no unit. */
const yv = (r: Rel, v: number, cents?: boolean) => (r.c.money ? mv(v, cents) : num(v));
/** The rate in prose: \$40 per hour, $18\ \text{L}$ per hour (no sign). */
const rateQty = (r: Rel) => `${qty(r, r.m)} per ${r.c.per}`;
/** The signed rate in prose: \$40 per hour, $-18\ \text{L}$ per hour. */
const signedRate = (r: Rel) => (r.c.sign < 0 ? `$-${num(r.m)}\\ \\text{${r.c.yU}}$ per ${r.c.per}` : rateQty(r));
/** "dollars per hour", "litres per minute" */
const rateUnits = (r: Rel) => `${r.c.money ? 'dollars' : 'litres'} per ${r.c.per}`;
const hasCents = (r: Rel, vs: number[]) => r.c.money && vs.some((v) => !isWhole(v));
/** The rule in words. */
const ruleText = (r: Rel) => r.c.rule(qty(r, r.m), qty(r, r.b), r.name);

/** Typed form of the equation (for the answer). */
function eqText(r: Rel): string {
  return r.c.sign > 0 ? `${fmt(r.m)}${r.c.x} + ${fmt(r.b)}` : `${fmt(r.b)} - ${fmt(r.m)}${r.c.x}`;
}
/** LaTeX right-hand side. */
function eqTex(r: Rel): string {
  return r.c.sign > 0 ? `${yv(r, r.m)}${r.c.x} + ${yv(r, r.b)}` : `${num(r.b)} - ${num(r.m)}${r.c.x}`;
}
/** "For $3$ hours" / "After $3$ hours" */
const lead = (r: Rel, x: number) => (r.c.lead ?? ((q: string) => `For ${q}`))(r.c.xq(x));
const fullEq = (r: Rel) => `${r.c.y} = ${eqTex(r)}`;

function newRel(rng: Rng, c = rng.pick(CTXS)): Rel {
  return { c, m: rng.pick(c.ms), b: rng.pick(c.bs), name: rng.pick(NAMES) };
}

function table(r: Rel, xs: number[]): TableFigure {
  const ys = xs.map((x) => yAt(r, x));
  const cents = hasCents(r, ys);
  return {
    type: 'table',
    horizontal: true,
    headers: [r.c.xHead, r.c.yHead],
    rows: xs.map((x, i) => [fmt(x), r.c.money ? fmtCell(ys[i], cents) : fmt(ys[i])]),
  };
}
const fmtCell = (v: number, cents: boolean) => (cents ? fmtFixed(v, 2) : fmt(v));

const NICE = [1, 2, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200, 250, 300, 500, 1000];
/** Graph of the relation from x = 0 to xEnd with dots at the data points. Returns null when the values do not fit a grid. */
function graph(r: Rel, dataXs: number[], xEnd: number, xStep: number, extraYs: number[] = []): PlaneFigure | null {
  const ys = dataXs.map((x) => yAt(r, x));
  const yEnd = yAt(r, xEnd);
  const hi = Math.max(r.b, yEnd, ...ys, ...extraYs);
  for (const s of NICE) {
    const top = Math.ceil(hi / s - 1e-9) * s + (r.c.sign > 0 ? s : 0);
    if (![...ys, r.b, ...extraYs].every((v) => isWhole(clean(v / s)))) continue;
    if (top / s > 16) continue;
    const end: [number, number] = yEnd >= 0 ? [xEnd, yEnd] : [clean(r.b / r.m), 0];
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: xEnd, yMin: 0, yMax: top, xStep, yStep: s, xLabel: r.c.xLabel, yLabel: r.c.yLabel },
      polylines: [{ points: [[0, r.b], end] }],
      points: dataXs.map((x, i) => ({ x, y: ys[i] })),
    };
  }
  return null;
}

/** Answer parts for the rate and the initial value. */
function rateParts(r: Rel): Part[] {
  const rate = slope(r);
  return r.c.money
    ? [moneyPart(rate, 'Rate of change: \\$', `per ${r.c.per}`), moneyPart(r.b, 'Initial value: \\$')]
    : [numPart(rate, { label: 'Rate of change:', suffix: `${r.c.yU} per ${r.c.per}` }), numPart(r.b, { label: 'Initial value:', suffix: r.c.yU })];
}

const RATE_HINT = 'Rate of change $= \\dfrac{\\text{change in } y}{\\text{change in } x}$. Use two columns of the table.';

/** Pick a relation whose table values stay positive. */
function relFor(rng: Rng, xs: (r: Rel) => number[], ok: (r: Rel) => boolean = () => true, ctxs = CTXS): Rel {
  return retry(
    () => newRel(rng, rng.pick(ctxs)),
    (r) => xs(r).every((x) => yAt(r, x) > 0 && x <= r.c.xMax(r.m, r.b)) && ok(r),
    300,
  );
}

// ---------------------------------------------------------------------------
// 5.1 Patterns, tables and graphs
// ---------------------------------------------------------------------------

/** Rate of change and initial value from a table (d1: starts at 0 in steps of the context; d2: starts later). */
function tableRate(rng: Rng, d: 1 | 2): Out {
  const r0 = newRel(rng);
  const s = d === 1 ? r0.c.steps[0] : rng.pick(r0.c.steps);
  const x0 = d === 1 ? 0 : s * rng.int(1, 3);
  const xsOf = () => keys(5).map((i) => clean(x0 + s * i));
  const r = relFor(rng, xsOf, (q) => q.c === r0.c, [r0.c]);
  const xs = xsOf();
  const ys = xs.map((x) => yAt(r, x));
  const dy = clean(ys[1] - ys[0]);
  const rate = slope(r);
  const cents = hasCents(r, [...ys, r.m, r.b]);
  const solution: string[] = [
    `From one column to the next, $x$ goes up by $${num(s)}$ and $y$ changes by $${yv(r, ys[1], cents)} - ${yv(r, ys[0], cents)} = ${yv(r, dy, cents)}$. Every column changes by the same amount, so the relation is linear.`,
    s === 1 ? `Rate of change: $\\dfrac{${yv(r, dy, cents)}}{1} = ${yv(r, rate, cents)}$ ${rateUnits(r)}.` : `Rate of change: $\\dfrac{${yv(r, dy, cents)}}{${num(s)}} = ${yv(r, rate, cents)}$ ${rateUnits(r)}.`,
  ];
  if (x0 === 0) solution.push(`The initial value is the value of $y$ when $x = 0$: ${qty(r, r.b, cents)}.`);
  else
    solution.push(
      `Work back from the first column to $x = 0$: that is $${num(x0)} \\div ${num(s)} = ${x0 / s}$ step${x0 / s === 1 ? '' : 's'} back, so ${r.c.sign > 0 ? 'subtract' : 'add'} $${x0 / s} \\times ${yv(r, Math.abs(dy), cents)} = ${yv(r, Math.abs(clean(dy * (x0 / s))), cents)}$.`,
      `Initial value: $${yv(r, ys[0], cents)} ${r.c.sign > 0 ? '-' : '+'} ${yv(r, Math.abs(clean(dy * (x0 / s))), cents)} = ${yv(r, r.b, cents)}$`,
    );
  solution.push(`The rate of change is ${signedRate(r)} and the initial value is ${qty(r, r.b, cents)} (${r.c.bMean}).`);
  return {
    prompt: `${r.c.setup(r.name)} The table shows ${r.c.yWhat} for different values of ${r.c.xIs.replace(/, \$.*\$$/, '')}. Find the rate of change and the initial value.${r.c.sign < 0 ? ' A rate of change for a decreasing relation is negative.' : ''}${r.c.money ? ` ${CENT}` : ''}`,
    figure: table(r, xs),
    parts: rateParts(r),
    hints: [RATE_HINT, x0 === 0 ? 'The initial value is the value of $y$ when $x = 0$.' : 'The table does not show $x = 0$. Work backward one step at a time, undoing the change, to reach $x = 0$.'],
    solution,
    calculator: true,
  };
}

/** Linear or not, from a table. */
function linearOrNot(rng: Rng): Out {
  const linear = rng.chance(0.5);
  const c = rng.pick(CTXS.filter((x) => x.sign > 0 && x.money && x.id !== 'taxi'));
  const r = newRel(rng, c);
  const s = c.steps[0];
  const xs = keys(5).map((i) => clean(s * i));
  let ys = xs.map((x) => yAt(r, x));
  let what = '';
  if (!linear) {
    const kind = rng.pick(['bump', 'grow'] as const);
    if (kind === 'bump') {
      const k = rng.int(2, 4);
      const delta = rng.pick([5, 10, 15]) * rng.sign();
      ys = ys.map((y, i) => (i === k ? clean(y + delta) : y));
      what = 'One step is different from the others.';
    } else {
      // Growing steps: a discount for longer use, or an extra charge that grows.
      const extra = rng.pick([5, 10]);
      ys = xs.map((x, i) => clean(r.b + r.m * x + (extra * i * (i - 1)) / 2));
      what = 'The steps keep getting bigger.';
    }
  }
  const diffs = ys.slice(1).map((y, i) => clean(y - ys[i]));
  const choices = [
    'Linear: $y$ changes by the same amount for each step in $x$',
    'Not linear: $y$ does not change by the same amount for each step in $x$',
    'Not linear: the $y$-values do not start at $0$',
  ];
  return {
    prompt: `${r.c.setup(r.name)} The table shows ${c.yWhat} for different amounts of use. Is the relation linear?`,
    figure: { type: 'table', horizontal: true, headers: [c.xHead, c.yHead], rows: xs.map((x, i) => [fmt(x), fmt(ys[i])]) },
    parts: [{ answer: fixedChoice(choices, linear ? 0 : 1) }],
    hints: ['Find the change in $y$ from each column to the next (the $x$-values go up by the same amount each time).', 'If every change in $y$ is the same, the relation is linear. A linear relation does not have to start at $0$.'],
    solution: [
      `The $x$-values go up by $${num(s)}$ each time.`,
      `The changes in $y$ are ${diffs.map((v) => `$${num(v)}$`).join(', ')}.`,
      linear ? 'They are all the same, so the points lie on a straight line.' : `They are not all the same. ${what}`,
      linear ? 'The relation is linear (it starts at the initial value, not at $0$, which is fine).' : 'The relation is not linear.',
    ],
    calculator: false,
  };
}

/** Rate and initial value from a graph. */
function graphRate(rng: Rng): Out {
  for (let tries = 0; ; tries++) {
    const r = newRel(rng, rng.pick(CTXS.filter((c) => c.id !== 'taxi')));
    const s = rng.pick(r.c.steps.filter((x) => x >= 1));
    const n = rng.int(5, 8);
    const xEnd = clean(s * n);
    if (r.c.sign < 0 && yAt(r, xEnd) < 0) continue;
    const xs = keys(n + 1).filter((i) => i > 0 && i % 2 === 0).map((i) => clean(s * i));
    const fig = graph(r, xs, xEnd, s);
    if (!fig) continue;
    const a = xs[0];
    const bx = xs[xs.length - 1];
    const ya = yAt(r, a);
    const yb = yAt(r, bx);
    return {
      prompt: `${r.c.setup(r.name)} The graph shows ${r.c.yWhat}. Find the rate of change and the initial value.${r.c.money ? ` ${CENT}` : ''}`,
      figure: fig,
      parts: rateParts(r),
      hints: ['Read two points that sit exactly on grid lines. Rate of change $=\\dfrac{\\text{rise}}{\\text{run}}$ between them.', 'The initial value is where the line crosses the vertical axis ($x = 0$).'],
      solution: [
        `Two points on the line: $(${num(a)},\\ ${yv(r, ya)})$ and $(${num(bx)},\\ ${yv(r, yb)})$.`,
        `Rate of change: $\\dfrac{${yv(r, yb)} - ${yv(r, ya)}}{${num(bx)} - ${num(a)}} = \\dfrac{${yv(r, clean(yb - ya))}}{${num(bx - a)}} = ${yv(r, slope(r))}$ ${rateUnits(r)}.`,
        `The line crosses the vertical axis at ${qty(r, r.b)}, so the initial value is ${qty(r, r.b)}: ${r.c.bMean}.`,
        `The rate of change is ${signedRate(r)}, and the initial value is ${qty(r, r.b)}.`,
      ],
      calculator: false,
    };
  }
}

/** What does a number in the equation mean? */
function meaning(rng: Rng): Out {
  const r = newRel(rng);
  const askRate = rng.chance(0.55);
  const cents = hasCents(r, [r.m, r.b]);
  const up = r.c.sign > 0 ? 'goes up' : 'goes down';
  const R = `${cap(r.c.yWhat)} ${up} by ${qty(r, r.m, cents)} for each ${r.c.per}`;
  const I = cap(r.c.bMean);
  const W1 = `${cap(r.c.yWhat)} for ${r.c.xq(askRate ? r.m : r.b)}`;
  const W2 = `${cap(r.c.yWhat)} is always ${qty(r, askRate ? r.m : r.b, cents)}, whatever the value of $${r.c.x}$`;
  const correct = askRate ? R : I;
  const asked = askRate ? yv(r, r.m, cents) : yv(r, r.b, cents);
  return {
    prompt: `${r.c.setup(r.name)} The equation $${fullEq(r)}$ gives ${r.c.yIs}, where $${r.c.x}$ is ${r.c.xIs.replace(/, \$.*\$$/, '')}. What does the number $${asked}$ in the equation represent?`,
    parts: [{ answer: mc(rng, correct, [askRate ? I : R, W1, W2]) }],
    hints: ['In $y = mx + b$, $m$ is the rate of change (the amount $y$ changes for each $1$ added to $x$), and $b$ is the initial value (the value of $y$ when $x = 0$).', `Is $${asked}$ multiplied by $${r.c.x}$, or is it on its own?`],
    solution: [
      `The equation has the form $y = mx + b$ with $m = ${yv(r, slope(r), cents)}$ and $b = ${yv(r, r.b, cents)}$.`,
      askRate ? `$${asked}$ is multiplied by $${r.c.x}$, so it is the rate of change: ${r.c.yWhat} ${up} by ${qty(r, r.m, cents)} for each ${r.c.per}.` : `$${asked}$ is not multiplied by $${r.c.x}$, so it is the initial value, the value when $${r.c.x} = 0$.`,
      `It represents: ${correct.charAt(0).toLowerCase() + correct.slice(1)}.`,
    ],
    calculator: false,
  };
}

/** d3: rate and initial value from two facts or from an uneven table. */
function twoFacts(rng: Rng): Out {
  const uneven = rng.chance(0.4);
  if (uneven) {
    let r = newRel(rng);
    let xs: number[] = [];
    for (let i = 0; i < 300; i++) {
      r = newRel(rng);
      const s = r.c.steps[0];
      xs = rng.sample(keys(10).map((k) => k + 1), 4).sort((a, b) => a - b).map((k) => clean(k * s));
      if (xs.every((x) => yAt(r, x) > 0 && x <= r.c.xMax(r.m, r.b))) break;
    }
    const ys = xs.map((x) => yAt(r, x));
    const cents = hasCents(r, [...ys, r.m, r.b]);
    const pairs = [0, 1, 2].map((i) => `$\\dfrac{${yv(r, ys[i + 1], cents)} - ${yv(r, ys[i], cents)}}{${num(xs[i + 1])} - ${num(xs[i])}} = ${yv(r, slope(r), cents)}$`);
    return {
      prompt: `${r.c.setup(r.name)} The table shows ${r.c.yWhat} for some values of ${r.c.xIs.replace(/, \$.*\$$/, '')}. The $x$-values are not evenly spaced. Find the rate of change and the initial value.${r.c.sign < 0 ? ' A rate of change for a decreasing relation is negative.' : ''}${r.c.money ? ` ${CENT}` : ''}`,
      figure: table(r, xs),
      parts: rateParts(r),
      hints: ['The columns are not evenly spaced, so divide each change in $y$ by the matching change in $x$.', 'Then use the rate to work back from one column to $x = 0$: initial value $= y - (\\text{rate}) \\times x$.'],
      solution: [
        `Rates between neighbouring columns: ${pairs.join(', ')}. They are equal, so the relation is linear with rate ${yv(r, slope(r), cents)} ${rateUnits(r)}.`,
        `From the first column back to $x = 0$: $${yv(r, ys[0], cents)} - (${yv(r, slope(r), cents)})(${num(xs[0])}) = ${yv(r, r.b, cents)}$`,
        `The rate of change is ${signedRate(r)} and the initial value is ${qty(r, r.b, cents)} (${r.c.bMean}).`,
      ],
      calculator: true,
    };
  }
  const r = newRel(rng);
  const s = rng.pick(r.c.steps);
  const { x1, x2 } = retry(
    () => {
      const a = s * rng.int(1, 4);
      return { x1: clean(a), x2: clean(a + s * rng.int(2, 5)) };
    },
    (o) => yAt(r, o.x2) > 0 && o.x2 <= r.c.xMax(r.m, r.b),
    200,
  );
  if (yAt(r, x2) <= 0 || x2 > r.c.xMax(r.m, r.b)) return twoFacts(rng.fork('again'));
  const y1 = yAt(r, x1);
  const y2 = yAt(r, x2);
  const cents = hasCents(r, [y1, y2, r.m, r.b]);
  const what = r.c.money ? `${r.c.yWhat} is` : `${r.c.yWhat} is`;
  return {
    prompt: `${r.c.setup(r.name)} ${lead(r, x1)}, ${what} ${qty(r, y1, cents)}. ${lead(r, x2)}, ${what} ${qty(r, y2, cents)}. The relation is linear. Find the rate of change and the initial value.${r.c.sign < 0 ? ' A rate of change for a decreasing relation is negative.' : ''}${r.c.money ? ` ${CENT}` : ''}`,
    parts: rateParts(r),
    hints: ['Write the two facts as points $(x, y)$. Rate of change $=\\dfrac{y_2 - y_1}{x_2 - x_1}$.', 'Initial value $= y_1 - (\\text{rate}) \\times x_1$: undo the change from $x = 0$ to $x_1$.'],
    solution: [
      `Points: $(${num(x1)},\\ ${yv(r, y1, cents)})$ and $(${num(x2)},\\ ${yv(r, y2, cents)})$.`,
      `Rate of change: $\\dfrac{${yv(r, y2, cents)} - ${yv(r, y1, cents)}}{${num(x2)} - ${num(x1)}} = \\dfrac{${yv(r, clean(y2 - y1), cents)}}{${num(clean(x2 - x1))}} = ${yv(r, slope(r), cents)}$ ${rateUnits(r)}`,
      `Initial value: $${yv(r, y1, cents)} - (${yv(r, slope(r), cents)})(${num(x1)}) = ${yv(r, r.b, cents)}$`,
      `The rate of change is ${signedRate(r)} and the initial value is ${qty(r, r.b, cents)} (${r.c.bMean}).`,
    ],
    calculator: true,
  };
}

const linearTable = skill({
  id: 'm303-linear-table',
  name: 'Linear patterns, rate of change and initial value',
  description: 'Recognize linear relations in tables and graphs, and find the rate of change (with units) and the initial value from a table, a graph or two facts.',
  outcomes: ['A1'],
  lessonId: 'm303-5-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.65) ? tableRate(rng, 1) : linearOrNot(rng);
    if (d === 2) {
      const m = rng.int(0, 2);
      return m === 0 ? tableRate(rng, 2) : m === 1 ? graphRate(rng) : meaning(rng);
    }
    return twoFacts(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Writing linear equations
// ---------------------------------------------------------------------------

const eqPart = (r: Rel): Part => part({ kind: 'expression', expected: eqText(r) }, { label: `$${r.c.y} =$` });
const EQ_HINT2 = 'Write $y = mx + b$: the rate of change is $m$ (it multiplies the variable) and the initial value is $b$.';

function writeFromWords(rng: Rng): Out {
  const r = newRel(rng);
  return {
    prompt: `${r.c.setup(r.name)} ${ruleText(r)} Write an equation for ${r.c.yIs}, in terms of ${r.c.xIs}.`,
    parts: [eqPart(r)],
    hints: ['Find the amount that changes with each unit (the rate of change) and the amount you start with (the initial value).', EQ_HINT2 + (r.c.sign < 0 ? ' The amount goes down, so subtract.' : '')],
    solution: [
      `Rate of change: ${signedRate(r)}, so $m = ${yv(r, slope(r))}$.`,
      `Initial value: ${qty(r, r.b)} (${r.c.bMean}), so $b = ${yv(r, r.b)}$.`,
      `$${fullEq(r)}$`,
    ],
    calculator: false,
  };
}

function evaluate(rng: Rng): Out {
  const r = newRel(rng);
  const s = rng.pick(r.c.steps);
  const x = retry(
    () => clean(s * rng.int(2, 9) + (r.c.id === 'taxi' ? rng.int(0, 4) : 0)),
    (v) => v <= r.c.xMax(r.m, r.b) && yAt(r, v) > 0,
    100,
  );
  const y = yAt(r, x);
  const cents = hasCents(r, [y, r.m, r.b]);
  return {
    prompt: `${r.c.setup(r.name)} The equation $${fullEq(r)}$ gives ${r.c.yIs}, where $${r.c.x}$ is ${r.c.xIs.replace(/, \$.*\$$/, '')}. Find ${r.c.yWhat} for ${r.c.xq(x)}.${r.c.money ? ` ${CENT}` : ''}`,
    parts: [r.c.money ? moneyPart(y) : numPart(y, { suffix: r.c.yU })],
    hints: [`Substitute $${r.c.x} = ${num(x)}$ into the equation.`, 'Multiply first, then add or subtract.'],
    solution: [
      `$${r.c.y} = ${r.c.sign > 0 ? `${yv(r, r.m, cents)}(${num(x)}) + ${yv(r, r.b, cents)}` : `${num(r.b)} - ${num(r.m)}(${num(x)})`}$`,
      `$${r.c.y} = ${r.c.sign > 0 ? `${yv(r, clean(r.m * x), cents)} + ${yv(r, r.b, cents)}` : `${num(r.b)} - ${num(clean(r.m * x))}`} = ${yv(r, y, cents)}$`,
      `${cap(r.c.yWhat)} for ${r.c.xq(x)} is ${qty(r, y, cents)}.`,
    ],
    calculator: true,
  };
}

function writeFromTableOrGraph(rng: Rng): Out {
  const useGraph = rng.chance(0.5);
  if (useGraph) {
    for (;;) {
      const r = newRel(rng, rng.pick(CTXS.filter((c) => c.id !== 'taxi')));
      const s = rng.pick(r.c.steps.filter((x) => x >= 1));
      const n = rng.int(5, 8);
      const xEnd = clean(s * n);
      if (r.c.sign < 0 && yAt(r, xEnd) < 0) continue;
      const xs = keys(n + 1).filter((i) => i > 0 && i % 2 === 0).map((i) => clean(s * i));
      const fig = graph(r, xs, xEnd, s);
      if (!fig) continue;
      const a = xs[0];
      const bx = xs[xs.length - 1];
      return {
        prompt: `${r.c.setup(r.name)} The graph shows ${r.c.yIs}, for ${r.c.xIs}. Write an equation for the relation.`,
        figure: fig,
        parts: [eqPart(r)],
        hints: ['Find the initial value where the line meets the vertical axis, and the rate of change from two points.', EQ_HINT2],
        solution: [
          `Initial value (at $${r.c.x} = 0$): $b = ${yv(r, r.b)}$.`,
          `Rate of change from $(${num(a)},\\ ${yv(r, yAt(r, a))})$ and $(${num(bx)},\\ ${yv(r, yAt(r, bx))})$: $m = \\dfrac{${yv(r, clean(yAt(r, bx) - yAt(r, a)))}}{${num(bx - a)}} = ${yv(r, slope(r))}$`,
          `$${fullEq(r)}$`,
        ],
        calculator: false,
      };
    }
  }
  const r0 = newRel(rng);
  const s = rng.pick(r0.c.steps);
  const x0 = s * rng.int(0, 2);
  const xsOf = () => keys(5).map((i) => clean(x0 + s * i));
  const r = relFor(rng, xsOf, (q) => q.c === r0.c, [r0.c]);
  const xs = xsOf();
  const ys = xs.map((x) => yAt(r, x));
  const cents = hasCents(r, [...ys, r.m, r.b]);
  return {
    prompt: `${r.c.setup(r.name)} The table shows ${r.c.yIs}, for ${r.c.xIs}. Write an equation for the relation.`,
    figure: table(r, xs),
    parts: [eqPart(r)],
    hints: [RATE_HINT + (x0 === 0 ? ' The initial value is the value at $x = 0$.' : ' Then work back to $x = 0$ to find the initial value.'), EQ_HINT2],
    solution: [
      `Rate of change: $m = \\dfrac{${yv(r, ys[1], cents)} - ${yv(r, ys[0], cents)}}{${num(s)}} = ${yv(r, slope(r), cents)}$`,
      x0 === 0 ? `Initial value: the value at $${r.c.x} = 0$, so $b = ${yv(r, r.b, cents)}$.` : `Initial value: $b = ${yv(r, ys[0], cents)} - (${yv(r, slope(r), cents)})(${num(x0)}) = ${yv(r, r.b, cents)}$`,
      `$${fullEq(r)}$`,
    ],
    calculator: true,
  };
}

/** Solve the equation for x given y. */
function solveForX(rng: Rng): Out {
  const r = newRel(rng);
  const s = r.c.steps[0];
  const x = retry(
    () => clean(s * rng.int(3, 12)),
    (v) => v <= r.c.xMax(r.m, r.b) && yAt(r, v) > 0 && (r.c.id !== 'plumber' || isWhole(v * 2)),
    100,
  );
  const y = yAt(r, x);
  const cents = hasCents(r, [y, r.m, r.b]);
  const ask = r.c.money
    ? r.c.id === 'driver'
      ? `How many packages must ${r.name} deliver to earn ${qty(r, y, cents)} in a day?`
      : `For how ${r.c.id === 'taxi' ? 'many kilometres' : r.c.id === 'concrete' ? 'many cubic metres' : r.c.id === 'phone' ? 'many GB' : 'many hours'} is ${r.c.yWhat} ${qty(r, y, cents)}?`
    : `After how many ${r.c.per}s will ${qty(r, y, cents)} be left?`;
  const unit = r.c.id === 'taxi' ? 'km' : r.c.id === 'concrete' ? 'm³' : r.c.id === 'phone' ? 'GB' : r.c.id === 'driver' ? 'packages' : r.c.per === 'minute' ? 'min' : 'h';
  return {
    prompt: `${r.c.setup(r.name)} The equation $${fullEq(r)}$ gives ${r.c.yIs}, where $${r.c.x}$ is ${r.c.xIs.replace(/, \$.*\$$/, '')}. ${ask}`,
    parts: [numPart(x, { suffix: unit })],
    hints: [`Substitute $${r.c.y} = ${yv(r, y, cents)}$ and solve for $${r.c.x}$.`, r.c.sign > 0 ? `Subtract $${yv(r, r.b, cents)}$ from both sides, then divide by $${yv(r, r.m, cents)}$.` : `Subtract from $${num(r.b)}$ to find how much was used, then divide by $${num(r.m)}$.`],
    solution:
      r.c.sign > 0
        ? [
            `$${yv(r, y, cents)} = ${eqTex(r)}$`,
            `$${yv(r, clean(y - r.b), cents)} = ${yv(r, r.m, cents)}${r.c.x}$`,
            `$${r.c.x} = ${yv(r, clean(y - r.b), cents)} \\div ${yv(r, r.m, cents)} = ${num(x)}$`,
            `The answer is ${r.c.xq(x)}.`,
          ]
        : [
            `$${num(y)} = ${eqTex(r)}$`,
            `$${num(r.m)}${r.c.x} = ${num(r.b)} - ${num(y)} = ${num(clean(r.b - y))}$`,
            `$${r.c.x} = ${num(clean(r.b - y))} \\div ${num(r.m)} = ${num(x)}$`,
            `After ${r.c.xq(x)}, ${qty(r, y)} will be left.`,
          ],
    calculator: true,
  };
}

/** d3: equation from two facts, then use it. */
function twoFactsEquation(rng: Rng): Out {
  const r = newRel(rng);
  const s = rng.pick(r.c.steps);
  const { x1, x2, x3 } = retry(
    () => {
      const a = clean(s * rng.int(1, 3));
      const b = clean(a + s * rng.int(2, 4));
      return { x1: a, x2: b, x3: clean(b + s * rng.int(1, 4)) };
    },
    (o) => o.x3 <= r.c.xMax(r.m, r.b) && yAt(r, o.x3) > 0,
    200,
  );
  if (!(x3 <= r.c.xMax(r.m, r.b) && yAt(r, x3) > 0)) return twoFactsEquation(rng.fork('again'));
  const [y1, y2, y3] = [x1, x2, x3].map((x) => yAt(r, x));
  const cents = hasCents(r, [y1, y2, y3, r.m, r.b]);
  return {
    prompt: `${r.c.setup(r.name)} ${lead(r, x1)}, ${r.c.yWhat} is ${qty(r, y1, cents)}. ${lead(r, x2)}, it is ${qty(r, y2, cents)}. The relation is linear. Write an equation for ${r.c.yIs}, in terms of ${r.c.xIs}. Then use it to find ${r.c.yWhat} for ${r.c.xq(x3)}.${r.c.money ? ` ${CENT}` : ''}`,
    parts: [eqPart(r), r.c.money ? moneyPart(y3, `For ${r.c.xq(x3)}: \\$`) : numPart(y3, { label: `For ${r.c.xq(x3)}:`, suffix: r.c.yU })],
    hints: ['Find the rate of change from the two facts: change in $y$ divided by change in $x$.', 'Find the initial value by working back to $x = 0$, write $y = mx + b$, then substitute.'],
    solution: [
      `Rate of change: $m = \\dfrac{${yv(r, y2, cents)} - ${yv(r, y1, cents)}}{${num(x2)} - ${num(x1)}} = ${yv(r, slope(r), cents)}$`,
      `Initial value: $b = ${yv(r, y1, cents)} - (${yv(r, slope(r), cents)})(${num(x1)}) = ${yv(r, r.b, cents)}$`,
      `Equation: $${fullEq(r)}$`,
      `For ${r.c.xq(x3)}: $${r.c.y} = ${r.c.sign > 0 ? `${yv(r, r.m, cents)}(${num(x3)}) + ${yv(r, r.b, cents)}` : `${num(r.b)} - ${num(r.m)}(${num(x3)})`} = ${yv(r, y3, cents)}$`,
      `${cap(r.c.yWhat)} for ${r.c.xq(x3)} is ${qty(r, y3, cents)}.`,
    ],
    calculator: true,
  };
}

/** d3: Celsius and Fahrenheit. */
function temperature(rng: Rng): Out {
  const ctx = rng.pick([
    'A baker in a mountain town uses an oven from the United States with a Fahrenheit dial.',
    'A market-garden greenhouse has a thermostat that reads in degrees Fahrenheit.',
    'A mechanic at a truck shop reads an engine-temperature gauge in degrees Fahrenheit.',
    'A cook at a lodge follows a recipe from the United States.',
  ]);
  const toF = rng.chance(0.5);
  const Cv = toF ? rng.pick([-25, -15, -12, 18, 22, 37, 65, 85, 175, 190, 205]) : 0;
  const Fv = toF ? clean(1.8 * Cv + 32) : rng.pick([-4, 14, 50, 75, 98, 160, 325, 350, 375, 425]);
  const Cans = toF ? Cv : (Fv - 32) / 1.8;
  const exact = exactAt(Cans, 1);
  const val = toF ? Fv : Cans;
  if (!toF && !exact && onEdge(Cans, 1)) return temperature(rng.fork('edge'));
  return {
    prompt: `${ctx} Water freezes at $0^\\circ\\text{C}$, which is $32^\\circ\\text{F}$, and boils at $100^\\circ\\text{C}$, which is $212^\\circ\\text{F}$. The relation between the two scales is linear. Write an equation for the Fahrenheit temperature $F$ in terms of the Celsius temperature $C$. Then ${toF ? `convert $${num(Cv)}^\\circ\\text{C}$ to Fahrenheit` : `convert $${num(Fv)}^\\circ\\text{F}$ to Celsius${exact ? '' : `, ${roundingPhrase(1)}`}`}.`,
    parts: [
      part({ kind: 'expression', expected: '1.8C + 32' }, { label: '$F =$' }),
      toF ? numPart(val, { suffix: '°F', label: 'Temperature:', display: 'decimal' }) : exact ? numPart(clean(val), { suffix: '°C', label: 'Temperature:', display: 'decimal' }) : numPart(val, { decimals: 1, suffix: '°C', label: 'Temperature:' }),
    ],
    hints: ['Use the two facts as points $(C, F)$: $(0, 32)$ and $(100, 212)$. The rate of change is $\\dfrac{212 - 32}{100 - 0}$.', toF ? 'Substitute the Celsius temperature for $C$.' : 'Substitute the Fahrenheit temperature for $F$ and solve for $C$: subtract $32$, then divide by $1.8$.'],
    solution: [
      'Rate of change: $m = \\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1.8$ degrees Fahrenheit per degree Celsius.',
      'Initial value: at $C = 0$, $F = 32$, so $b = 32$.',
      'Equation: $F = 1.8C + 32$',
      toF ? `$F = 1.8(${num(Cv)}) + 32 = ${num(clean(1.8 * Cv))} + 32 = ${num(Fv)}$` : `$${num(Fv)} = 1.8C + 32$, so $1.8C = ${num(Fv - 32)}$ and $C = ${num(Fv - 32)} \\div 1.8 ${exact ? '=' : '\\approx'} ${exact ? num(clean(Cans)) : fmtFixed(Cans, 1)}$`,
      toF ? `$${num(Cv)}^\\circ\\text{C}$ is $${num(Fv)}^\\circ\\text{F}$.` : `$${num(Fv)}^\\circ\\text{F}$ is ${exact ? '' : 'about '}$${exact ? num(clean(Cans)) : fmtFixed(Cans, 1)}^\\circ\\text{C}$.`,
    ],
    calculator: true,
  };
}

const PLANS = [
  { what: 'rent a carpet cleaner', unit: 'hour', units: 'hours', q: hrs, A: 'Shop A', B: 'Shop B', xs: [2, 12] },
  { what: 'rent a cargo van', unit: 'kilometre', units: 'kilometres', q: (n: number) => `$${num(n)}\\ \\text{km}$`, A: 'Company A', B: 'Company B', xs: [20, 400] },
  { what: 'pay for a cellphone plan', unit: 'GB', units: 'GB', q: (n: number) => `$${num(n)}$ GB`, A: 'Plan A', B: 'Plan B', xs: [2, 20] },
  { what: 'rent a trailer', unit: 'day', units: 'days', q: (n: number) => `$${num(n)}$ day${n === 1 ? '' : 's'}`, A: 'Dealer A', B: 'Dealer B', xs: [2, 14] },
];

/** d3: two pricing plans; when do they cost the same, and which is cheaper? */
function comparePlans(rng: Rng): Out {
  const p = rng.pick(PLANS);
  const name = rng.pick(NAMES);
  const big = p.unit === 'kilometre';
  const { b1, m1, b2, m2, xs } = retry(
    () => {
      const m1 = big ? rng.pick([0.35, 0.4, 0.45, 0.5]) : rng.pick([8, 10, 12, 15, 20]);
      const m2 = big ? clean(m1 - rng.pick([0.1, 0.15, 0.2, 0.25])) : m1 - rng.pick([2, 3, 4, 5]);
      const xs = big ? 10 * rng.int(5, 30) : rng.int(p.xs[0] + 1, p.xs[1] - 2);
      const b1 = big ? rng.pick([20, 25, 29.95, 35]) : rng.pick([15, 20, 25, 30]);
      const b2 = clean(b1 + (m1 - m2) * xs);
      return { b1, m1, b2, m2, xs };
    },
    (o) => o.m2 > 0 && isWhole(clean(o.b2 * 100)),
    200,
  );
  const xAsk = retry(
    () => (big ? 10 * rng.int(3, 45) : rng.int(p.xs[0], p.xs[1])),
    (v) => Math.abs(v - xs) >= (big ? 30 : 2),
    100,
  );
  const cA = clean(b1 + m1 * xAsk);
  const cB = clean(b2 + m2 * xAsk);
  const cheaper = cA < cB ? p.A : p.B;
  return {
    prompt: `${name} needs to ${p.what}. ${p.A} charges ${money(b1)} plus ${money(m1)} per ${p.unit}. ${p.B} charges ${money(b2)} plus ${money(m2)} per ${p.unit}. For how many ${p.units} do the two cost the same? Which is cheaper for ${p.q(xAsk)}?`,
    parts: [numPart(xs, { label: 'Same cost for', suffix: p.units }), { label: `Cheaper for ${p.q(xAsk)}:`, answer: fixedChoice([p.A, p.B, 'They cost the same'], cheaper === p.A ? 0 : 1) }],
    hints: [`Write an equation for each: $C = ${mv(m1)}x + ${mv(b1)}$ and $C = ${mv(m2)}x + ${mv(b2)}$. Set them equal and solve for $x$.`, `Then substitute $x = ${num(xAsk)}$ into both equations and compare.`],
    solution: [
      `${p.A}: $C = ${mv(m1)}x + ${mv(b1)}$. ${p.B}: $C = ${mv(m2)}x + ${mv(b2)}$, where $x$ is the number of ${p.units}.`,
      `Same cost: $${mv(m1)}x + ${mv(b1)} = ${mv(m2)}x + ${mv(b2)}$, so $${mv(clean(m1 - m2))}x = ${mv(clean(b2 - b1))}$ and $x = ${num(xs)}$.`,
      `For ${p.q(xAsk)}: ${p.A} costs $${mv(m1)}(${num(xAsk)}) + ${mv(b1)} = ${mv(cA, true)}$ and ${p.B} costs $${mv(m2)}(${num(xAsk)}) + ${mv(b2)} = ${mv(cB, true)}$.`,
      `They cost the same for ${p.q(xs)}. For ${p.q(xAsk)}, ${cheaper} is cheaper. (${p.A} has the lower starting fee, so it is cheaper for fewer ${p.units}; ${p.B} has the lower rate, so it is cheaper for more.)`,
    ],
    calculator: true,
  };
}

const linearEquation = skill({
  id: 'm303-linear-equation',
  name: 'Writing and using linear equations',
  description: 'Write the equation of a linear relation from a description, table, graph or two facts, and use it to solve problems such as rentals, wages, taxi fares, fuel use, phone plans and temperature conversion.',
  outcomes: ['A1'],
  lessonId: 'm303-5-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? writeFromWords(rng) : evaluate(rng);
    if (d === 2) return rng.chance(0.55) ? writeFromTableOrGraph(rng) : solveForX(rng);
    const m = rng.int(0, 3);
    return m === 0 ? temperature(rng) : m === 1 ? comparePlans(rng) : twoFactsEquation(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.3 Interpolating and extrapolating
// ---------------------------------------------------------------------------

/** Read a value from the graph between the plotted data points. */
function interpGraph(rng: Rng): Out {
  for (;;) {
    const r = newRel(rng, rng.pick(CTXS.filter((c) => c.id !== 'taxi')));
    const s = rng.pick(r.c.steps.filter((x) => x >= 1));
    const n = rng.int(6, 8);
    const xEnd = clean(s * n);
    if (r.c.sign < 0 && yAt(r, xEnd) < 0) continue;
    const data = keys(n + 1).filter((i) => i % 2 === 0 && i > 0).map((i) => clean(s * i));
    const between = keys(n).filter((i) => i % 2 === 1 && i > data[0] / s && i < data[data.length - 1] / s).map((i) => clean(s * i));
    if (!between.length) continue;
    const xq = rng.pick(between);
    const yq = yAt(r, xq);
    const fig = graph(r, data, xEnd, s, [yq]);
    if (!fig) continue;
    const reverse = rng.chance(0.4);
    const cents = hasCents(r, [yq]);
    return {
      prompt: reverse
        ? `${r.c.setup(r.name)} The graph shows ${r.c.yWhat}, with the measured values marked. Use the graph to estimate the value of $${r.c.x}$ when ${r.c.yWhat} is ${qty(r, yq, cents)}.`
        : `${r.c.setup(r.name)} The graph shows ${r.c.yWhat}, with the measured values marked. Use the graph to estimate ${r.c.yWhat} ${lead(r, xq).replace(/^F/, 'f').replace(/^A/, 'a')}.${r.c.money ? ` ${CENT}` : ''}`,
      figure: fig,
      parts: [reverse ? numPart(xq, { label: `$${r.c.x} =$` }) : r.c.money ? moneyPart(yq) : numPart(yq, { suffix: r.c.yU })],
      hints: reverse
        ? [`Find ${qty(r, yq, cents)} on the vertical axis.`, 'Go straight across to the line, then straight down to the horizontal axis.']
        : [`Find ${r.c.xq(xq)} on the horizontal axis.`, 'Go straight up to the line, then straight across to the vertical axis.'],
      solution: [
        `${reverse ? `${qty(r, yq, cents)} is between the measured values` : `${r.c.xq(xq)} is between the measured values`}, so this is **interpolation**.`,
        reverse ? `Across from ${qty(r, yq, cents)} to the line and down: $${r.c.x} = ${num(xq)}$.` : `Up from ${r.c.xq(xq)} to the line and across: ${qty(r, yq, cents)}.`,
        `Check with the rate of change (${signedRate(r)}): $${yv(r, r.b, cents)} ${r.c.sign > 0 ? '+' : '-'} ${yv(r, r.m, cents)} \\times ${num(xq)} = ${yv(r, yq, cents)}$.`,
        reverse ? `The answer is ${r.c.xq(xq)}.` : `${cap(r.c.yWhat)} for ${r.c.xq(xq)} is about ${qty(r, yq, cents)}.`,
      ],
      calculator: false,
    };
  }
}

/** Interpolation or extrapolation? */
function classify(rng: Rng): Out {
  const r = newRel(rng);
  const s = r.c.steps[0];
  const lo = clean(s * rng.int(1, 3));
  const hi = clean(lo + s * rng.int(4, 6));
  const inside = rng.chance(0.5);
  const xq = inside ? clean(lo + s * rng.int(1, Math.round((hi - lo) / s) - 1) + (s >= 2 ? s / 2 : 0)) : rng.chance(0.5) || lo <= s ? clean(hi + s * rng.int(2, 6)) : clean(lo - s);
  const choices = ['Interpolation: the value is inside the range of the data', 'Extrapolation: the value is outside the range of the data', 'Neither: the value is not in the table'];
  return {
    prompt: `${r.c.setup(r.name)} ${cap(r.c.yWhat)} was recorded from ${r.c.xq(lo)} to ${r.c.xq(hi)}. ${rng.pick(NAMES)} uses the trend to estimate ${r.c.yWhat} ${lead(r, xq).replace(/^F/, 'f').replace(/^A/, 'a')}. Is this interpolation or extrapolation?`,
    parts: [{ answer: fixedChoice(choices, inside ? 0 : 1) }],
    hints: ['Interpolation estimates a value **between** known data values. Extrapolation goes **beyond** them.', `Is ${r.c.xq(xq)} between ${r.c.xq(lo)} and ${r.c.xq(hi)}?`],
    solution: [
      `The data cover ${r.c.xq(lo)} to ${r.c.xq(hi)}.`,
      inside ? `${cap(r.c.xq(xq))} is between them.` : `${cap(r.c.xq(xq))} is ${xq > hi ? 'more than the largest' : 'less than the smallest'} value in the data.`,
      inside ? 'This is **interpolation**.' : 'This is **extrapolation**.',
    ],
    calculator: false,
  };
}

/** d2: extrapolate from a table using the rate. */
function extrapTable(rng: Rng): Out {
  const r0 = newRel(rng);
  const s = r0.c.steps[0];
  const xsOf = () => keys(5).map((i) => clean(s * (i + 1)));
  const r = relFor(rng, () => [...xsOf(), clean(s * 9)], (q) => q.c === r0.c, [r0.c]);
  const xs = xsOf();
  const last = xs[4];
  const xq = retry(
    () => clean(last + s * rng.int(2, 6)),
    (v) => v <= r.c.xMax(r.m, r.b) && yAt(r, v) > 0,
    100,
  );
  const ok = xq <= r.c.xMax(r.m, r.b) && yAt(r, xq) > 0;
  const x = ok ? xq : clean(last + s);
  const y = yAt(r, x);
  const ys = xs.map((v) => yAt(r, v));
  const cents = hasCents(r, [...ys, y, r.m]);
  const dy = clean(ys[1] - ys[0]);
  const steps = Math.round((x - last) / s);
  return {
    prompt: `${r.c.setup(r.name)} The table shows ${r.c.yWhat}. If the pattern continues, what will ${r.c.yWhat} be ${lead(r, x).replace(/^F/, 'f').replace(/^A/, 'a')}?${r.c.money ? ` ${CENT}` : ''}`,
    figure: table(r, xs),
    parts: [r.c.money ? moneyPart(y) : numPart(y, { suffix: r.c.yU })],
    hints: ['Find how much $y$ changes for each step in the table.', `${r.c.xq(x)} is beyond the table, so extend the pattern: count the steps from the last column.`],
    solution: [
      `Each step of $${num(s)}$ changes $y$ by $${yv(r, dy, cents)}$.`,
      `From $${num(last)}$ to $${num(x)}$ is $${num(clean(x - last))} \\div ${num(s)} = ${steps}$ steps.`,
      `$${yv(r, ys[4], cents)} ${dy < 0 ? '-' : '+'} ${steps} \\times ${yv(r, Math.abs(dy), cents)} = ${yv(r, y, cents)}$`,
      `This is extrapolation. If the pattern continues, ${r.c.yWhat} for ${r.c.xq(x)} will be ${qty(r, y, cents)}.`,
    ],
    calculator: true,
  };
}

interface FitCtx {
  intro: string;
  x: string;
  y: string;
  xName: string;
  yName: string;
  xU: string;
  yU: string;
  m: number[];
  b: number[];
  xs: number[];
  noise: number;
  dp: number;
  xLabel: string;
  yLabel: string;
}

const FITS: FitCtx[] = [
  { intro: 'A greenhouse measured the height of tomato plants each week.', x: 'w', y: 'h', xName: 'the week', yName: 'the height in centimetres', xU: 'weeks', yU: 'cm', m: [4.2, 4.6, 5.3, 5.8], b: [6.5, 8.2, 10.4], xs: [1, 2, 3, 4, 5, 6, 7, 8], noise: 2, dp: 1, xLabel: 'Week', yLabel: 'Height (cm)' },
  { intro: 'A food truck recorded the high temperature and the number of iced drinks sold on several days.', x: 't', y: 'n', xName: 'the high temperature in degrees Celsius', yName: 'the number of iced drinks sold', xU: '°C', yU: 'drinks', m: [6.4, 7.8, 8.5], b: [-22.6, -15.3, -9.8], xs: [14, 16, 18, 20, 22, 24, 26, 28, 30], noise: 8, dp: 0, xLabel: 'High temperature (°C)', yLabel: 'Iced drinks sold' },
  { intro: 'A welding apprentice tracked the length of weld (in centimetres) completed per hour against the weeks of training.', x: 'w', y: 'L', xName: 'the weeks of training', yName: 'the centimetres of weld per hour', xU: 'weeks', yU: 'cm', m: [3.6, 4.1, 4.8], b: [22.5, 25.4, 30.2], xs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], noise: 3, dp: 1, xLabel: 'Weeks of training', yLabel: 'Weld per hour (cm)' },
  { intro: 'A farmer compared growing-season rainfall with the canola yield on several fields.', x: 'r', y: 'Y', xName: 'the rainfall in millimetres', yName: 'the yield in bushels per acre', xU: 'mm', yU: 'bu/ac', m: [0.12, 0.14, 0.16], b: [8.6, 11.2, 13.5], xs: [150, 175, 200, 225, 250, 275, 300], noise: 2.5, dp: 1, xLabel: 'Rainfall (mm)', yLabel: 'Yield (bu/ac)' },
];

/** d2: use a given line of best fit; say whether it is interpolation or extrapolation. */
function bestFit(rng: Rng): Out {
  const c = rng.pick(FITS);
  const m = rng.pick(c.m);
  const b = rng.pick(c.b);
  const data = rng.sample(c.xs, 6).sort((p, q) => p - q);
  const pts = data.map((x) => [x, roundTo(m * x + b + rng.float(-c.noise, c.noise, 1), c.dp)] as [number, number]);
  const span = data[data.length - 1] - data[0];
  const stepX = c.xs[1] - c.xs[0];
  const inside = rng.chance(0.5);
  const xq = retry(
    () => (inside ? data[0] + stepX * rng.int(1, Math.round(span / stepX) - 1) + (rng.chance(0.5) ? stepX / 2 : 0) : data[data.length - 1] + stepX * rng.int(1, 3)),
    (v) => !data.includes(v) && !onEdge(m * v + b, c.dp),
    100,
  );
  const yq = m * xq + b;
  const exact = exactAt(yq, c.dp);
  const top = Math.max(...pts.map((p) => p[1]), yq);
  const yStep = [1, 2, 5, 10, 20, 25, 50, 100].find((s) => top / s <= 10) ?? 100;
  const xMin = c.xs[0] - stepX;
  const xMax = Math.max(c.xs[c.xs.length - 1], xq) + stepX;
  const yMin = Math.min(0, Math.floor(Math.min(...pts.map((p) => p[1])) / yStep) * yStep);
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin, xMax, yMin, yMax: Math.ceil(top / yStep) * yStep + yStep, xStep: stepX, yStep, xLabel: c.xLabel, yLabel: c.yLabel },
    lines: [{ through: [[xMin, m * xMin + b], [xMax, m * xMax + b]], color: 'accent' }],
    points: pts.map(([x, y]) => ({ x, y })),
  };
  const choices = ['Interpolation', 'Extrapolation'];
  const bTex = b < 0 ? `- ${fmt(-b)}` : `+ ${fmt(b)}`;
  return {
    prompt: `${c.intro} The graph shows the data and the line of best fit, $${c.y} = ${fmt(m)}${c.x} ${bTex}$, where $${c.x}$ is ${c.xName} and $${c.y}$ is ${c.yName}. Use the equation to estimate ${c.yName.replace(/^the /, 'the ')} when $${c.x} = ${num(xq)}$${exact ? '' : `, ${roundingPhrase(c.dp)}`}. Is this interpolation or extrapolation?`,
    figure: fig,
    parts: [exact ? numPart(clean(yq), { label: `$${c.y} \\approx$`, suffix: c.yU, display: 'decimal' }) : numPart(yq, { decimals: c.dp, label: `$${c.y} \\approx$`, suffix: c.yU }), { label: 'This is', answer: fixedChoice(choices, inside ? 0 : 1) }],
    hints: [`Substitute $${c.x} = ${num(xq)}$ into the equation of the line of best fit.`, `The data go from $${num(data[0])}$ to $${num(data[data.length - 1])}$. Inside that range is interpolation; outside is extrapolation.`],
    solution: [
      `$${c.y} = ${fmt(m)}(${num(xq)}) ${bTex} = ${num(clean(m * xq))} ${bTex} ${exact ? '=' : '\\approx'} ${exact ? num(clean(yq)) : fmtFixed(yq, c.dp)}$`,
      `The data go from $${c.x} = ${num(data[0])}$ to $${c.x} = ${num(data[data.length - 1])}$. $${num(xq)}$ is ${inside ? 'inside' : 'outside'} that range, so this is **${inside ? 'interpolation' : 'extrapolation'}**.`,
      `The estimate is about $${exact ? num(clean(yq)) : fmtFixed(yq, c.dp)}$ ${c.yU}, by ${inside ? 'interpolation' : 'extrapolation'}.`,
    ],
    calculator: true,
  };
}

interface Judge {
  text: (name: string) => string;
  reasonable: boolean;
  why: string;
  calc: string;
}

/** Each scenario computes its prediction so the solution can show it. */
function judgeScenario(rng: Rng, name: string): Judge {
  const k = rng.int(0, 8);
  if (k === 0) {
    const r = rng.pick([5, 6, 7]);
    const b = rng.pick([35, 40, 45]);
    const yrs = rng.pick([8, 10, 12]);
    const w = yrs * 52;
    return {
      text: (n) => `${n} weighed a calf every week for its first $10$ weeks. Its mass went up about $${r}\\ \\text{kg}$ a week from a birth mass of $${b}\\ \\text{kg}$, so ${n} wrote $M = ${r}w + ${b}$. Using the equation to predict the mass at $${yrs}$ years ($${w}$ weeks) gives $M = ${num(r * w + b)}\\ \\text{kg}$.`,
      reasonable: false,
      why: 'a calf’s growth slows down as it matures, so the trend from its first $10$ weeks does not continue for years',
      calc: `$${r}(${w}) + ${b} = ${num(r * w + b)}\\ \\text{kg}$, far heavier than a full-grown cow`,
    };
  }
  if (k === 1) {
    const g = rng.pick([6, 7]);
    const age = rng.pick([40, 50, 60]);
    const h0 = rng.pick([85, 88, 90]);
    const pred = h0 + g * (age - 2);
    return {
      text: (n) => `From age $2$ to age $8$, ${n}’s height went up about $${g}\\ \\text{cm}$ a year from $${h0}\\ \\text{cm}$. Extending this trend predicts a height of $${pred}\\ \\text{cm}$ at age $${age}$.`,
      reasonable: false,
      why: 'people stop growing in their late teens, so the childhood trend cannot continue to adulthood',
      calc: `$${h0} + ${g}(${age} - 2) = ${pred}\\ \\text{cm}$, taller than any person`,
    };
  }
  if (k === 2) {
    const m = rng.pick([18, 20, 24]);
    const b = rng.pick([360, 400, 480]);
    const h = Math.ceil(b / m) + rng.int(3, 8);
    return {
      text: (n) => `A tractor started with $${b}\\ \\text{L}$ of diesel and burned $${m}\\ \\text{L}$ per hour for the first $6$ hours. ${n} uses $V = ${b} - ${m}h$ to predict the diesel left after $${h}$ hours: $V = ${b - m * h}\\ \\text{L}$.`,
      reasonable: false,
      why: 'a tank cannot hold a negative amount of fuel; the tractor runs out before then',
      calc: `$${b} - ${m}(${h}) = ${b - m * h}\\ \\text{L}$`,
    };
  }
  if (k === 3) {
    const t0 = rng.pick([14.8, 15.2, 15.6]);
    const drop = rng.pick([0.3, 0.4]);
    const yrs = rng.pick([40, 50, 60]);
    const pred = clean(t0 - drop * yrs);
    if (pred > 0) return judgeScenario(rng, name);
    return {
      text: (n) => `${n}’s 100 m sprint time dropped about $${fmt(drop)}$ seconds a year from $${fmt(t0)}$ seconds at age $14$, up to age $18$. Extending the line predicts a time of $${fmt(pred)}$ seconds at age $${14 + yrs}$.`,
      reasonable: false,
      why: 'a runner’s times level off with age, and a time can never be zero or negative',
      calc: `$${fmt(t0)} - ${fmt(drop)}(${yrs}) = ${fmt(pred)}$ seconds`,
    };
  }
  if (k === 4) {
    const t = rng.pick([1.5, 2, 2.5]);
    const days = rng.pick([150, 180, 200]);
    return {
      text: (n) => `In December, the ice on a northern lake got about $${fmt(t)}\\ \\text{cm}$ thicker each day. ${n} extends the trend to predict the ice will be $${num(t * days)}\\ \\text{cm}$ thick $${days}$ days later, in June.`,
      reasonable: false,
      why: 'the ice stops thickening and melts in spring, so the December trend does not hold until June',
      calc: `$${fmt(t)} \\times ${days} = ${num(t * days)}\\ \\text{cm}$, about $${num((t * days) / 100)}\\ \\text{m}$ of ice in June`,
    };
  }
  if (k === 5) {
    const m = rng.pick([85, 95, 110]);
    const b = rng.pick([75, 89, 99]);
    const h = rng.pick([5, 5.5, 6]);
    return {
      text: (n) => `A plumber charges a call-out fee of ${money(b)} plus ${money(m)} per hour. ${n} has bills for jobs of $1$ to $4$ hours, and uses $C = ${m}h + ${b}$ to predict the cost of a $${fmt(h)}$-hour job: ${money(m * h + b)}.`,
      reasonable: true,
      why: 'the pricing rule (a call-out fee plus an hourly rate) stays the same, and the job is only a little longer than the jobs in the data',
      calc: `$${m}(${fmt(h)}) + ${b} = ${mv(m * h + b)}$`,
    };
  }
  if (k === 6) {
    const m = rng.pick([1.95, 2.05, 2.25]);
    const b = rng.pick([3.8, 4.1, 4.25]);
    const d = rng.pick([32, 35, 38]);
    const c = clean(m * d + b);
    return {
      text: (n) => `A taxi fare is ${money(b, true)} plus ${money(m, true)} per kilometre. ${n} has receipts for trips of $5\\ \\text{km}$ to $30\\ \\text{km}$ and uses $C = ${mv(m, true)}d + ${mv(b, true)}$ to predict the fare for a $${d}\\ \\text{km}$ trip: ${money(c, true)}.`,
      reasonable: true,
      why: 'the fare rule does not change with distance, and the trip is only a little longer than the trips in the data',
      calc: `$${mv(m, true)}(${d}) + ${mv(b, true)} = ${mv(c, true)}$`,
    };
  }
  if (k === 7) {
    const m = rng.pick([175, 185, 195]);
    const b = rng.pick([100, 120, 150]);
    const v = rng.pick([7, 8, 9]);
    return {
      text: (n) => `A concrete supplier charges a delivery fee of ${money(b)} plus ${money(m)} per cubic metre. ${n} has invoices for $2$ to $6$ cubic metres and predicts the cost of $${v}\\ \\text{m}^3$ with $C = ${m}v + ${b}$: ${money(m * v + b)}.`,
      reasonable: true,
      why: 'the price per cubic metre and the delivery fee stay the same, and the order is only a little larger than the orders in the data',
      calc: `$${m}(${v}) + ${b} = ${num(m * v + b)}$`,
    };
  }
  const m = rng.pick([5, 7.5, 10]);
  const b = rng.pick([30, 35, 40]);
  const g = rng.pick([11, 12, 13]);
  return {
    text: (n) => `A phone plan costs ${money(b)} a month plus ${money(m, !isWhole(m))} per GB. ${n}’s bills cover $1$ to $10$ GB. ${n} predicts the bill for $${g}$ GB with $C = ${fmt(m)}g + ${b}$: ${money(m * g + b)}.`,
    reasonable: true,
    why: 'the plan’s pricing rule stays the same, and the amount is only a little more than in the bills',
    calc: `$${fmt(m)}(${g}) + ${b} = ${num(m * g + b)}$`,
  };
}

function judge(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const sc = judgeScenario(rng, name);
  const R = `Reasonable: ${sc.reasonable ? sc.why : 'the data follow a straight line, so the line can be extended as far as needed'}`;
  const N = `Not reasonable: ${sc.reasonable ? 'you can never predict outside the data' : sc.why}`;
  const correct = sc.reasonable ? R : N;
  const distract = sc.reasonable
    ? [N, 'Not reasonable: the answer is not one of the values in the data', 'Reasonable only if the line passes through $(0, 0)$']
    : [R, 'Not reasonable: you can never predict outside the data', 'Reasonable: the equation gives an exact answer'];
  return {
    prompt: `${sc.text(name)} Is this prediction reasonable?`,
    parts: [{ answer: mc(rng, correct, distract) }],
    hints: ['Extrapolation assumes the trend keeps going. Ask: does the situation stay the same that far beyond the data?', 'Check whether the predicted value is even possible in real life.'],
    solution: [
      `The prediction: ${sc.calc}.`,
      'This is extrapolation: it uses the trend beyond the data.',
      sc.reasonable ? `It is reasonable because ${sc.why}.` : `It is not reasonable because ${sc.why}.`,
      `So the prediction is ${sc.reasonable ? 'reasonable' : 'not reasonable'}.`,
    ],
    calculator: true,
  };
}

/** d3: extrapolate from a table to when y reaches a target: the nearest tenth, or a whole number rounded up or down. */
function whenReach(rng: Rng): Out {
  const kind = rng.pick(['empty', 'empty', 'budget', 'earn'] as const);
  for (;;) {
    const c = kind === 'empty' ? rng.pick(CTXS.filter((x) => x.sign < 0)) : kind === 'earn' ? CTXS.find((x) => x.id === 'driver')! : rng.pick(CTXS.filter((x) => ['skid', 'taxi', 'phone'].includes(x.id)));
    const r = newRel(rng, c);
    const s = c.steps[0];
    const xs = keys(4).map((i) => clean(s * i));
    const last = xs[3];
    let target: number;
    if (kind === 'empty') target = rng.chance(0.5) ? 0 : rng.pick([50, 60, 75, 100]);
    else {
      const xr = last * rng.float(2.2, 4, 2);
      target = Math.round((r.b + r.m * xr) / 5) * 5;
    }
    const x = c.sign < 0 ? (r.b - target) / r.m : (target - r.b) / r.m;
    if (x <= last + s || target >= r.b && c.sign < 0) continue;
    if (kind === 'empty' && !exactAt(x, 1) && onEdge(x, 1)) continue;
    if (kind !== 'empty' && isWhole(clean(x))) continue;
    const ys = xs.map((v) => yAt(r, v));
    const cents = hasCents(r, [...ys, r.m, r.b, target]);
    const exact = exactAt(x, 1);
    const unit = c.id === 'taxi' ? 'km' : c.id === 'phone' ? 'GB' : c.id === 'driver' ? 'packages' : c.per === 'minute' ? 'min' : 'h';
    const whole = { skid: 'whole hours', taxi: 'whole kilometres', phone: 'whole GB' }[c.id as 'skid'] ?? '';
    let ask: string;
    let ans: number;
    let last2: string;
    let round: string;
    if (kind === 'empty') {
      ask = `${target === 0 ? `After how long will the tank be empty` : `After how long will only ${qty(r, target)} be left`}? ${exact ? '' : `Give the answer ${roundingPhrase(1)}.`}`;
      ans = x;
      round = exact ? '' : `Rounded ${roundingPhrase(1)}: $${fmtFixed(x, 1)}$.`;
      last2 = `${target === 0 ? 'The tank will be empty' : `Only ${qty(r, target)} will be left`} after ${exact ? '' : 'about '}${c.xq(roundTo(x, 1))}.`;
    } else if (kind === 'earn') {
      ask = `How many packages must ${r.name} deliver to earn at least ${qty(r, target)} in a day?`;
      ans = Math.ceil(x);
      round = `$${fmtFixed(x, 2)}$ packages is not possible, and $${Math.floor(x)}$ packages would be just short of ${qty(r, target)}, so round **up** to $${ans}$.`;
      last2 = `${r.name} must deliver $${ans}$ packages.`;
    } else {
      ask = `${r.name} has a budget of ${qty(r, target)}. ${c.id === 'taxi' ? 'Suppose the distance is' : c.id === 'phone' ? 'Data is' : 'Time is'} charged in ${whole}. What is the greatest number of ${whole} ${r.name} can pay for?`;
      ans = Math.floor(x);
      round = `${r.name} cannot go over the budget, so round **down** to $${ans}$ (the next whole number, $${ans + 1}$, would cost more than ${qty(r, target)}).`;
      last2 = `${r.name} can pay for at most ${c.xq(ans)}.`;
    }
    const dy = clean(ys[1] - ys[0]);
    return {
      prompt: `${c.setup(r.name)} The table shows ${c.yWhat} for ${c.per === 'hour' || c.per === 'minute' ? 'the first' : 'up to'} ${c.xq(last)}. ${ask}`.trim(),
      figure: table(r, xs),
      parts: [kind === 'empty' ? (exact ? numPart(clean(x), { suffix: unit, display: 'decimal' }) : numPart(x, { decimals: 1, suffix: unit })) : numPart(ans, { suffix: unit })],
      hints: ['Find the rate of change and the initial value from the table, and write the equation.', `Set ${c.yWhat} equal to ${qty(r, target)} and solve. Then think about how to round in this situation.`],
      solution: [
        `From the table: initial value ${qty(r, r.b, cents)}, and $y$ changes by $${yv(r, dy, cents)}$ every $${num(s)}$, so the rate of change is $${yv(r, slope(r), cents)}$ ${rateUnits(r)}.`,
        `Equation: $${fullEq(r)}$`,
        c.sign < 0
          ? `$${num(target)} = ${eqTex(r)}$, so $${num(r.m)}${c.x} = ${num(r.b - target)}$ and $${c.x} = ${num(r.b - target)} \\div ${num(r.m)} ${exactAt(x, 4) ? '=' : '\\approx'} ${exactAt(x, 4) ? num(clean(x)) : fmtFixed(x, 3)}$.`
          : `$${yv(r, target)} = ${eqTex(r)}$, so $${yv(r, r.m)}${c.x} = ${yv(r, clean(target - r.b))}$ and $${c.x} = ${yv(r, clean(target - r.b))} \\div ${yv(r, r.m)} ${exactAt(x, 4) ? '=' : '\\approx'} ${exactAt(x, 4) ? num(clean(x)) : fmtFixed(x, 3)}$.`,
        ...(round ? [round] : []),
        `This is extrapolation (beyond the table), so it assumes the rate stays the same. ${last2}`,
      ],
      calculator: true,
    };
  }
}

const interpolate = skill({
  id: 'm303-interpolate',
  name: 'Interpolating and extrapolating',
  description: 'Interpolate and extrapolate from graphs, tables and equations (including a line of best fit), decide which one a prediction uses, and judge whether an extrapolation is reasonable.',
  outcomes: ['A1'],
  lessonId: 'm303-5-3',
  calculator: true,
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.6) ? interpGraph(rng) : classify(rng);
    if (d === 2) return rng.chance(0.5) ? extrapTable(rng) : bestFit(rng);
    return rng.chance(0.5) ? judge(rng) : whenReach(rng);
  },
});

export const LINEAR_SKILLS: SkillDef[] = [linearTable, linearEquation, interpolate];
