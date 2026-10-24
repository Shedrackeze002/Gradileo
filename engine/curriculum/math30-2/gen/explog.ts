/**
 * Math 30-2 Unit 6 — Exponents and Logarithms (RF4, RF5, RF6).
 * Exponential functions y = a(b)^x, exponential equations, logarithms and their laws, and exponential and
 * logarithmic models (interest, growth, depreciation, half-life, pH, decibels and earthquake magnitude).
 * Every formula, rate and rule is stated in the question; regression equations are given, never computed.
 */
import { byDifficulty, fixedChoice, mc, mcFigures, multi, numPart, part, retry, roundingPhrase, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, frac, fracLatex, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amira', 'Jonah', 'Keisha', 'Tomás', 'Leila', 'Brayden', 'Mai', 'Harjit', 'Sloane', 'Kofi', 'Nanami', 'Ezra',
  'Rosalie', 'Devin', 'Tanvi', 'Malik', 'Sakura', 'Gabriel', 'Ayesha', 'Colton', 'Ngozi', 'Félix', 'Isla', 'Rajan',
];

/** A number for LaTeX, thousands grouped. */
const nx = (x: number) => fmtGroupTex(x, 6);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function group(i: string): string {
  const neg = i.startsWith('-');
  const d = neg ? i.slice(1) : i;
  return `${neg ? '-' : ''}${d.length > 4 ? d.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : d}`;
}
/** Money inside maths, to the cent (no dollar sign): 12{,}345.60 */
const m2 = (x: number) => {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `${group(i).replace(/,/g, '{,}')}.${f}`;
};
/** Money in Markdown, outside maths: \$12,345.60 or \$12,000 */
const money = (x: number) => {
  if (Math.abs(x - Math.round(x)) < 1e-9) return `\\$${group(String(Math.round(x)))}`;
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${group(i)}.${f}`;
};
const CENT = 'Give your answer to the nearest cent.';
const moneyPart = (v: number, label: string): Part => ({ label, answer: { kind: 'numeric', value: v, decimals: 2, tolerance: 0.011 } });

/** True when x is safely away from a rounding boundary (x.xx5) at the given number of decimals. */
function clear(x: number, decimals: number): boolean {
  const s = Math.abs(x) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.08;
}

/** A rounded value with "≈" or "=" as appropriate. */
function approx(x: number, decimals: number): string {
  return Math.abs(roundTo(x, decimals) - x) < 1e-9 ? `= ${nx(roundTo(x, decimals))}` : `\\approx ${fmtGroupTex(roundTo(x, decimals), decimals)}`;
}
/** A value shown with a few more decimals for working. */
const work = (x: number, d = 4) => (Math.abs(roundTo(x, d) - x) < 1e-9 ? nx(x) : `${fmtGroupTex(roundTo(x, d), d)}\\ldots`);
/** Fixed decimals, grouped, for LaTeX. */
const fx = (x: number, d: number) => {
  const [i, f] = fmtFixed(x, d).split('.');
  return f ? `${group(i).replace(/,/g, '{,}')}.${f}` : group(i).replace(/,/g, '{,}');
};

/** LaTeX for a number that may be a simple fraction. */
function fracTex(x: number, d = false): string {
  const f = toFrac(x, 1000);
  if (f && f.d !== 1) return fracLatex(f, { dfrac: d });
  return nx(x);
}

/** a·x + c in LaTeX. */
function lin(a: number, c: number, v = 'x'): string {
  const head = a === 0 ? '' : a === 1 ? v : a === -1 ? `-${v}` : `${fmt(a)}${v}`;
  if (!head) return fmt(c);
  if (c === 0) return head;
  return `${head} ${c < 0 ? '-' : '+'} ${fmt(Math.abs(c))}`;
}

/** \log_{b} or \log for base 10. */
const logB = (b: number | string) => (b === 10 || b === '10' ? '\\log' : `\\log_{${b}}`);
/** A power of p as a number or as 1/p^k, in LaTeX. */
function powTex(p: number, k: number, d = true): string {
  if (k >= 0) return nx(p ** k);
  if (p === 10) return fmt(10 ** k, 8);
  return `${d ? '\\dfrac' : '\\frac'}{1}{${nx(p ** -k)}}`;
}

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------

const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** Sample y = f(x) and clip it to the grid's y-range (polylines are drawn unclipped). */
function curvePieces(f: (x: number) => number, g: GridSpec, from = g.xMin, to = g.xMax, n = 160): Array<Array<[number, number]>> {
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const edge = (xIn: number, xOut: number): [number, number] => {
    const bound = f(xOut) > g.yMax ? g.yMax : g.yMin;
    let lo = xIn;
    let hi = xOut;
    for (let i = 0; i < 40; i++) {
      const m = (lo + hi) / 2;
      if (inside(f(m))) lo = m;
      else hi = m;
    }
    return [r3(lo), r3(bound)];
  };
  const pieces: Array<Array<[number, number]>> = [];
  let cur: Array<[number, number]> = [];
  let px = from;
  let pin = inside(f(px));
  if (pin) cur.push([r3(px), r3(f(px))]);
  for (let i = 1; i <= n; i++) {
    const x = from + ((to - from) * i) / n;
    const yin = inside(f(x));
    if (yin && !pin) cur.push(edge(x, px));
    if (yin) cur.push([r3(x), r3(f(x))]);
    else if (pin) {
      cur.push(edge(px, x));
      pieces.push(cur);
      cur = [];
    }
    px = x;
    pin = yin;
  }
  if (cur.length > 1) pieces.push(cur);
  return pieces.filter((p) => p.length > 1);
}

/** A graph of y = f(x) with arrowheads where the curve leaves the grid. */
function graphFigure(f: (x: number) => number, grid: GridSpec, points: PlanePoint[] = []): PlaneFigure {
  const pieces = curvePieces(f, grid);
  const segments: PlaneSegment[] = [];
  const onEdge = (q: [number, number]) =>
    Math.abs(q[1] - grid.yMax) < 1e-6 || Math.abs(q[0] - grid.xMin) < 1e-6 || Math.abs(q[0] - grid.xMax) < 1e-6;
  const back = (p: Array<[number, number]>, end: [number, number]) => {
    const span = Math.max(grid.xMax - grid.xMin, grid.yMax - grid.yMin) * 0.03;
    for (let i = p.length - 2; i >= 0; i--) if (Math.hypot(p[i][0] - end[0], p[i][1] - end[1]) > span) return p[i];
    return p[0];
  };
  for (const p of pieces) {
    const last = p[p.length - 1];
    if (onEdge(last)) segments.push({ from: back(p, last), to: last, arrowEnd: true });
    const first = p[0];
    if (onEdge(first)) segments.push({ from: back([...p].reverse(), first), to: first, arrowEnd: true });
  }
  const fig: PlaneFigure = { type: 'plane', grid, polylines: pieces.map((pts) => ({ points: pts })) };
  if (segments.length) fig.segments = segments;
  if (points.length) fig.points = points;
  return fig;
}

// ---------------------------------------------------------------------------
// 6.1 — Exponential functions: m302-exp-features
// ---------------------------------------------------------------------------

interface ExpF {
  a: number;
  /** base = bn / bd */
  bn: number;
  bd: number;
}
const bVal = (f: ExpF) => f.bn / f.bd;
const growth = (f: ExpF) => bVal(f) > 1;
const evalExp = (f: ExpF) => (x: number) => f.a * bVal(f) ** x;
const baseTex = (f: ExpF) => (f.bd === 1 ? `(${fmt(f.bn)})` : `\\left(\\frac{${f.bn}}{${f.bd}}\\right)`);
const bTex = (f: ExpF) => (f.bd === 1 ? fmt(f.bn) : `\\frac{${f.bn}}{${f.bd}}`);
function expTex(f: ExpF, v = 'x'): string {
  if (f.a === 1) return f.bd === 1 ? `${fmt(f.bn)}^{${v}}` : `${baseTex(f)}^{${v}}`;
  return `${nx(f.a)}${baseTex(f)}^{${v}}`;
}
/** Exact y = a(b)^x at an integer x, as a value. */
function expAt(f: ExpF, x: number): number {
  return x >= 0 ? (f.a * f.bn ** x) / f.bd ** x : (f.a * f.bd ** -x) / f.bn ** -x;
}

const D_ALL = '$\\{x \\mid x \\in \\mathbb{R}\\}$';
const setRel = (v: string, rel: string, n: number) => `$\\{${v} \\mid ${v} ${rel} ${fmt(n)},\\ ${v} \\in \\mathbb{R}\\}$`;
const R_POS = setRel('y', '>', 0);

function rangeDistractors(f: ExpF): string[] {
  return [setRel('y', '\\ge', 0), setRel('y', '>', f.a), '$\\{y \\mid y \\in \\mathbb{R}\\}$', setRel('y', '\\ge', f.a)];
}
function domainDistractors(): string[] {
  return [setRel('x', '>', 0), setRel('x', '\\ge', 0), '$\\{x \\mid x \\ne 0,\\ x \\in \\mathbb{R}\\}$'];
}

/** A graphable function with y-intercept and the points at x = ±1 on whole-number grid lines. */
function graphable(rng: Rng, opts: { growth?: boolean } = {}): ExpF {
  const g = opts.growth ?? rng.chance(0.5);
  const a = rng.int(1, 3);
  const k = a === 3 ? 2 : rng.int(2, 3);
  return g ? { a, bn: k, bd: 1 } : { a, bn: 1, bd: k };
}

const FEAT_GRID: GridSpec = { xMin: -6, xMax: 6, yMin: -1, yMax: 10 };

function expGraph(f: ExpF, grid: GridSpec = FEAT_GRID, marks: number[] = [0]): PlaneFigure {
  const pts: PlanePoint[] = marks.map((x) => ({ x, y: expAt(f, x) })).filter((p) => p.y <= grid.yMax && p.y >= grid.yMin);
  return graphFigure(evalExp(f), grid, pts);
}

const growthStep = (f: ExpF) =>
  growth(f)
    ? `The base is $b = ${bTex(f)}$, which is greater than $1$, so the function shows exponential growth: the $y$-values increase as $x$ increases.`
    : `The base is $b = ${bTex(f)}$, which is between $0$ and $1$, so the function shows exponential decay: the $y$-values decrease as $x$ increases.`;

function featGrowthYint(rng: Rng): GenOutput {
  const g = rng.chance(0.5);
  const a = rng.pick([1, 2, 3, 4, 5, 6, 8, 10, 12, 20, 0.5, 1.5, 2.5]);
  const f: ExpF = g
    ? rng.pick([{ a, bn: 2, bd: 1 }, { a, bn: 3, bd: 1 }, { a, bn: 1.5, bd: 1 }, { a, bn: 1.2, bd: 1 }, { a, bn: 4, bd: 1 }, { a, bn: 1.05, bd: 1 }])
    : rng.pick([{ a, bn: 1, bd: 2 }, { a, bn: 1, bd: 3 }, { a, bn: 0.5, bd: 1 }, { a, bn: 0.8, bd: 1 }, { a, bn: 0.25, bd: 1 }, { a, bn: 0.9, bd: 1 }]);
  return {
    prompt: `Consider the exponential function $y = ${expTex(f)}$. Does it show exponential growth or exponential decay? What is its $y$-intercept?`,
    parts: [
      { label: 'Type', answer: fixedChoice(['Exponential growth', 'Exponential decay'], g ? 0 : 1) },
      numPart(f.a, { label: '$y$-intercept' }),
    ],
    hints: [
      'In $y = a(b)^x$, the base $b$ decides growth ($b > 1$) or decay ($0 < b < 1$).',
      'For the $y$-intercept, substitute $x = 0$: any non-zero base to the power $0$ is $1$.',
    ],
    solution: [
      growthStep(f),
      `At $x = 0$: $y = ${f.a === 1 ? '' : nx(f.a)}${baseTex(f)}^{0} = ${f.a === 1 ? '' : `${nx(f.a)}(1) = `}${nx(f.a)}$.`,
      `The function shows exponential ${g ? 'growth' : 'decay'}, and its $y$-intercept is $${nx(f.a)}$ (the value of $a$).`,
    ],
  };
}

function featEvaluate(rng: Rng, d: Difficulty): GenOutput {
  const x = d === 1 ? rng.pick([1, 2, 2, 3]) : rng.pick([-1, -2, -2, -3]);
  const f = retry(
    () => {
      const g = rng.chance(0.5);
      const a = rng.pick(d === 1 ? [1, 2, 3, 4, 5, 10] : [2, 3, 4, 5, 6, 8, 12, 16, 20, 24]);
      const k = rng.pick([2, 3, 4, 5]);
      return g ? { a, bn: k, bd: 1 } : { a, bn: 1, bd: k };
    },
    (f) => Math.abs(expAt(f, x)) <= 2000,
  );
  const v = expAt(f, x);
  const xs = x < 0 ? `(${x})` : `${x}`;
  const powV = expAt({ a: 1, bn: f.bn, bd: f.bd }, x);
  return {
    prompt: `For $y = ${expTex(f)}$, find the value of $y$ when $x = ${x}$.${toFrac(v, 1000)?.d !== 1 ? ' Give an exact answer (a fraction is fine).' : ''}`,
    parts: [numPart(v, { label: '$y =$' })],
    hints: [
      `Substitute $x = ${x}$ and evaluate the power first${f.a === 1 ? '' : `, then multiply by $${nx(f.a)}$`}.`,
      x < 0 ? 'A negative exponent means a reciprocal: $b^{-n} = \\dfrac{1}{b^n}$.' : 'Powers before multiplication (order of operations).',
    ],
    solution: [
      `$y = ${f.a === 1 ? '' : nx(f.a)}${baseTex(f)}^{${xs}}$`,
      ...(x < 0 ? [`$${baseTex(f)}^{${x}} = ${fracTex(powV, true)}$, because a negative exponent gives the reciprocal.`] : [`$${baseTex(f)}^{${x}} = ${fracTex(powV, true)}$`]),
      ...(f.a === 1 ? [] : [`$y = ${nx(f.a)} \\times ${fracTex(powV, true)} = ${fracTex(v, true)}$`]),
      `When $x = ${x}$, $y = ${fracTex(v, true)}$.`,
    ],
  };
}

function featGraphRead(rng: Rng): GenOutput {
  const f = graphable(rng);
  return {
    prompt: 'The graph of an exponential function $y = a(b)^x$ is shown. What is its $y$-intercept, and what is the equation of its horizontal asymptote?',
    figure: expGraph(f),
    parts: [numPart(f.a, { label: '$y$-intercept' }), numPart(0, { label: 'Asymptote: $y =$' })],
    hints: [
      'The $y$-intercept is where the curve crosses the $y$-axis.',
      `Follow the ${growth(f) ? 'left' : 'right'} end of the curve: which horizontal line does it get closer and closer to without touching?`,
    ],
    solution: [
      `The curve crosses the $y$-axis at $(0,\\ ${f.a})$, so the $y$-intercept is $${f.a}$.`,
      `As $x$ moves ${growth(f) ? 'left' : 'right'}, the curve gets closer and closer to the $x$-axis but never reaches it, so the horizontal asymptote is the $x$-axis.`,
      `The $y$-intercept is $${f.a}$ and the asymptote is $y = 0$.`,
    ],
  };
}

function featDomainRange(rng: Rng): GenOutput {
  const f: ExpF = rng.pick([
    { a: rng.int(2, 9), bn: rng.pick([2, 3, 4, 1.5]), bd: 1 },
    { a: rng.int(2, 9), bn: 1, bd: rng.pick([2, 3, 4]) },
    { a: rng.pick([100, 250, 500, 40, 60]), bn: rng.pick([0.8, 0.9, 1.1, 1.25]), bd: 1 },
  ]);
  return {
    prompt: `State the domain and the range of $y = ${expTex(f)}$.`,
    parts: [
      { label: 'Domain', answer: mc(rng, D_ALL, domainDistractors()) },
      { label: 'Range', answer: mc(rng, R_POS, rangeDistractors(f)) },
    ],
    hints: [
      'Any real number can be used as an exponent, so think about which $x$-values are allowed.',
      `A positive number times a positive power is always positive, and the graph approaches the asymptote $y = 0$ without reaching it.`,
    ],
    solution: [
      `You can raise $${bTex(f)}$ to any real power, so the domain is ${D_ALL}.`,
      `Since $a = ${nx(f.a)} > 0$ and every power of $${bTex(f)}$ is positive, every $y$-value is positive.`,
      `The curve approaches the horizontal asymptote $y = 0$ but never reaches it, so $0$ is not in the range. The $y$-intercept $${nx(f.a)}$ is just one value; the curve goes above and below it.`,
      `Domain: ${D_ALL}. Range: ${R_POS}.`,
    ],
  };
}

function featStatements(rng: Rng): GenOutput {
  const f: ExpF = retry(
    () => (rng.chance(0.5) ? { a: rng.int(2, 8), bn: rng.pick([2, 3, 5, 1.5]), bd: 1 } : { a: rng.int(2, 8), bn: 1, bd: rng.pick([2, 3, 4]) }),
    (f) => f.a !== f.bn && f.a !== f.bd,
  );
  const g = growth(f);
  const pool = [
    { md: `The $y$-intercept is $${f.a}$.`, correct: true },
    { md: `The $y$-intercept is $${bTex(f)}$.`, correct: false },
    { md: 'The graph has no $x$-intercept.', correct: true },
    { md: 'The graph has one $x$-intercept.', correct: false },
    { md: g ? 'The function is increasing.' : 'The function is decreasing.', correct: true },
    { md: g ? 'The function is decreasing.' : 'The function is increasing.', correct: false },
    { md: 'The horizontal asymptote is $y = 0$.', correct: true },
    { md: `The horizontal asymptote is $y = ${f.a}$.`, correct: false },
    { md: `The range is ${R_POS}.`, correct: true },
    { md: `The domain is ${setRel('x', '>', 0)}.`, correct: false },
  ];
  const trues = rng.sample(pool.filter((p) => p.correct), rng.int(2, 3));
  const falses = rng.sample(pool.filter((p) => !p.correct), 5 - trues.length);
  const chosen = [...trues, ...falses];
  return {
    prompt: `Select all the statements that are true for $y = ${expTex(f)}$.`,
    parts: [part(multi(rng, chosen))],
    hints: [
      `Check the base: is $b = ${bTex(f)}$ greater than $1$ or between $0$ and $1$?`,
      'For $y = a(b)^x$ with $a > 0$: the $y$-intercept is $a$, the asymptote is $y = 0$, there is no $x$-intercept, the domain is all real numbers and the range is $y > 0$.',
    ],
    solution: [
      `The $y$-intercept is $a = ${f.a}$.`,
      `${growthStep(f)} So the function is ${g ? 'increasing' : 'decreasing'}.`,
      'The curve approaches $y = 0$ but never reaches it, so the horizontal asymptote is $y = 0$ and there is no $x$-intercept.',
      `The domain is all real numbers and the range is ${R_POS}.`,
      `The true statements are: ${chosen.filter((c) => c.correct).map((c) => c.md.replace(/\.$/, '')).join('; ')}.`,
    ],
  };
}

function featPointsToEq(rng: Rng): GenOutput {
  const f = graphable(rng);
  const marks = [-1, 0, 1].filter((x) => expAt(f, x) <= 10);
  const fig = expGraph(f, FEAT_GRID, marks);
  fig.points = (fig.points ?? []).map((p) => ({ ...p, label: `(${fmt(p.x)}, ${fmt(p.y)})` }));
  const ratioLine = growth(f)
    ? `From $x = 0$ to $x = 1$ the $y$-value goes from $${f.a}$ to $${expAt(f, 1)}$, so $b = \\dfrac{${expAt(f, 1)}}{${f.a}} = ${bTex(f)}$.`
    : `From $x = 0$ to $x = 1$ the $y$-value goes from $${f.a}$ to $${fracTex(expAt(f, 1))}$, so $b = \\dfrac{${fracTex(expAt(f, 1))}}{${f.a}} = ${bTex(f)}$.`;
  return {
    prompt: 'The graph of $y = a(b)^x$ passes through the labelled points. Determine the values of $a$ and $b$.',
    figure: fig,
    parts: [numPart(f.a, { label: '$a =$' }), numPart(bVal(f), { label: '$b =$' })],
    hints: [
      'At $x = 0$, $y = a(b)^0 = a$, so $a$ is the $y$-intercept.',
      'Each time $x$ increases by $1$, $y$ is multiplied by $b$. Divide a $y$-value by the one before it.',
    ],
    solution: [
      `The point $(0,\\ ${f.a})$ gives $a = ${f.a}$.`,
      ratioLine,
      `$a = ${f.a}$ and $b = ${bTex(f)}$, so the equation is $y = ${expTex(f)}$.`,
    ],
  };
}

function featGraphToEq(rng: Rng): GenOutput {
  const f = retry(() => graphable(rng), (f) => f.a !== 1);
  const k = growth(f) ? f.bn : f.bd;
  const recip: ExpF = growth(f) ? { a: f.a, bn: 1, bd: k } : { a: f.a, bn: k, bd: 1 };
  const swapped: ExpF = { a: k, bn: growth(f) ? f.a : 1, bd: growth(f) ? 1 : f.a };
  const y1 = expAt(f, 1);
  const slope = y1 - f.a;
  const linTex = `y = ${slope === 1 ? '' : slope === -1 ? '-' : fracTex(slope)}x + ${f.a}`;
  const correct = `$y = ${expTex(f)}$`;
  const ds = [`$y = ${expTex(recip)}$`, `$y = ${expTex(swapped)}$`, `$${linTex}$`, `$y = ${expTex({ a: f.a + 1, bn: f.bn, bd: f.bd })}$`];
  return {
    prompt: 'Which equation matches the graph?',
    figure: expGraph(f, FEAT_GRID, [-1, 0, 1]),
    parts: [part(mc(rng, correct, ds))],
    hints: [
      'Read the $y$-intercept: it is the value of $a$.',
      'Then compare the $y$-values at $x = 0$ and $x = 1$: the ratio is the base $b$. Is the graph rising or falling?',
    ],
    solution: [
      `The graph crosses the $y$-axis at $(0,\\ ${f.a})$, so $a = ${f.a}$.`,
      `It passes through $(1,\\ ${fracTex(y1)})$, so $b = \\dfrac{${fracTex(y1)}}{${f.a}} = ${bTex(f)}$. ${growth(f) ? 'The graph rises, so $b > 1$ makes sense.' : 'The graph falls, so $0 < b < 1$ makes sense.'}`,
      `The graph is a curve, not a line: the $y$-values are multiplied by the same number each step, not increased by the same amount.`,
      `The equation is ${correct}.`,
    ],
  };
}

function featMatchGraph(rng: Rng): GenOutput {
  const f = retry(() => graphable(rng), (f) => f.a !== 1 || rng.chance(0.3));
  const k = growth(f) ? f.bn : f.bd;
  const a2 = rng.pick([1, 2, 3].filter((v) => v !== f.a));
  const make = (a: number, up: boolean): ExpF => (up ? { a, bn: k, bd: 1 } : { a, bn: 1, bd: k });
  const grid: GridSpec = { xMin: -5, xMax: 5, yMin: -1, yMax: 10 };
  const opts = [
    { f, correct: true },
    { f: make(f.a, !growth(f)), correct: false },
    { f: make(a2, growth(f)), correct: false },
    { f: make(a2, !growth(f)), correct: false },
  ];
  const options = opts.map((o) => ({ md: '', figure: expGraph(o.f, grid), correct: o.correct }));
  return {
    prompt: `Which graph shows $y = ${expTex(f)}$?`,
    parts: [part(mcFigures(rng, options))],
    hints: [
      `The $y$-intercept of $y = a(b)^x$ is $a$. Which graphs cross the $y$-axis at $${f.a}$?`,
      `The base $b = ${bTex(f)}$ is ${growth(f) ? 'greater than $1$, so the graph rises from left to right' : 'between $0$ and $1$, so the graph falls from left to right'}.`,
    ],
    solution: [
      `$a = ${f.a}$, so the graph crosses the $y$-axis at $(0,\\ ${f.a})$.`,
      growthStep(f),
      `At $x = 1$ the graph is at $y = ${fracTex(expAt(f, 1))}$, and the curve approaches the $x$-axis on the ${growth(f) ? 'left' : 'right'}.`,
      `The correct graph ${growth(f) ? 'rises' : 'falls'} from left to right and crosses the $y$-axis at $${f.a}$.`,
    ],
  };
}

interface ExpContext {
  make: (rng: Rng) => { a: number; b: number };
  text: (name: string, eq: string) => string;
  v: string;
  per: string;
  initial: string;
  unit?: string;
  isMoney?: boolean;
}

const EXP_CONTEXTS: ExpContext[] = [
  {
    make: (rng) => ({ a: rng.int(64, 116) * 500, b: rng.pick([0.78, 0.8, 0.82, 0.84, 0.85, 0.86, 0.88, 0.9]) }),
    text: (n, eq) => `The value of ${n}'s new pickup truck $t$ years after it was bought is modelled by $${eq}$, where $V$ is in dollars.`,
    v: 'V', per: 'year', initial: 'Value when new: \\$', isMoney: true,
  },
  {
    make: (rng) => ({ a: rng.int(4, 18) * 50, b: rng.pick([1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45]) }),
    text: (n, eq) => `In ${n}'s biology class, the number of bacteria in a dish $h$ hours after the start of an experiment is modelled by $${eq}$.`,
    v: 'N', per: 'hour', initial: 'Bacteria at the start', unit: 'bacteria',
  },
  {
    make: (rng) => ({ a: rng.pick([200, 250, 300, 400, 500, 600]), b: rng.pick([0.78, 0.8, 0.82, 0.85, 0.88, 0.9, 0.92]) }),
    text: (_n, eq) => `The amount of a medication in a patient's bloodstream $h$ hours after an injection is modelled by $${eq}$, where $A$ is in milligrams.`,
    v: 'A', per: 'hour', initial: 'Amount at the injection', unit: 'mg',
  },
  {
    make: (rng) => ({ a: rng.int(8, 40) * 10, b: rng.pick([1.08, 1.1, 1.12, 1.15, 1.18, 1.2, 1.25]) }),
    text: (n, eq) => `${n} opens a food truck in Riverton. The number of followers of the truck's social media account $w$ weeks after opening is modelled by $${eq}$.`,
    v: 'F', per: 'week', initial: 'Followers at opening', unit: 'followers',
  },
  {
    make: (rng) => ({ a: rng.int(55, 70), b: rng.pick([0.92, 0.93, 0.94, 0.95, 0.96, 0.97]) }),
    text: (n, eq) => `${n} pours a cup of coffee. The difference between the coffee's temperature and the room temperature $m$ minutes later is modelled by $${eq}$, where $D$ is in degrees Celsius.`,
    v: 'D', per: 'minute', initial: 'Difference at the start', unit: '°C',
  },
  {
    make: (rng) => ({ a: rng.int(4, 12) * 10, b: rng.pick([1.05, 1.06, 1.07, 1.08, 1.1, 1.12, 1.14]) }),
    text: (_n, eq) => `A herd of bison is released into a large park. The number of bison $t$ years after the release is modelled by $${eq}$.`,
    v: 'P', per: 'year', initial: 'Bison released', unit: 'bison',
  },
  {
    make: (rng) => ({ a: rng.int(12, 26) * 100, b: rng.pick([0.7, 0.72, 0.75, 0.78, 0.8, 0.82]) }),
    text: (n, eq) => `The value of ${n}'s new laptop $t$ years after it was bought is modelled by $${eq}$, where $V$ is in dollars.`,
    v: 'V', per: 'year', initial: 'Value when new: \\$', isMoney: true,
  },
];
const CTX_VAR: Record<string, string> = { year: 't', hour: 'h', week: 'w', minute: 'm' };

function featContext(rng: Rng): GenOutput {
  const c = rng.pick(EXP_CONTEXTS);
  const { a, b } = c.make(rng);
  const name = rng.pick(NAMES);
  const tv = CTX_VAR[c.per];
  const eq = `${c.v} = ${nx(a)}(${fmt(b)})^{${tv}}`;
  const g = b > 1;
  const pct = roundTo(Math.abs(b - 1) * 100, 6);
  return {
    prompt: `${c.text(name, eq)} Is this exponential growth or decay? What is the initial value, and by what percent does the quantity ${g ? 'increase' : 'decrease'} each ${c.per}?`,
    parts: [
      { label: 'Type', answer: fixedChoice(['Exponential growth', 'Exponential decay'], g ? 0 : 1) },
      c.isMoney ? numPart(a, { label: c.initial }) : numPart(a, { label: c.initial, suffix: c.unit }),
      numPart(pct, { label: `Percent ${g ? 'increase' : 'decrease'} per ${c.per}`, suffix: '%', display: 'decimal' }),
    ],
    hints: [
      `Compare with $y = a(b)^x$: the initial value is $a$ (the value when $${tv} = 0$) and the base is $b$.`,
      `Each ${c.per} the quantity is multiplied by $b = ${fmt(b)}$. Multiplying by $${fmt(b)}$ is the same as ${g ? `adding $${fmt(pct)}\\%$` : `keeping $${fmt(roundTo(b * 100, 6))}\\%$`}: compare $b$ with $1$.`,
    ],
    solution: [
      `The base is $b = ${fmt(b)}$, which is ${g ? 'greater than $1$, so this is exponential growth' : 'between $0$ and $1$, so this is exponential decay'}.`,
      `When $${tv} = 0$: $${c.v} = ${nx(a)}(${fmt(b)})^{0} = ${nx(a)}$, so the initial value is ${c.isMoney ? money(a) : `$${nx(a)}$${c.unit ? ` ${c.unit === 'mg' ? 'mg' : c.unit === '°C' ? '°C' : c.unit}` : ''}`}.`,
      g
        ? `$b = ${fmt(b)} = 1 + ${fmt(roundTo(b - 1, 6))}$, so each ${c.per} the quantity is the previous amount plus $${fmt(pct)}\\%$ of it.`
        : `$b = ${fmt(b)} = 1 - ${fmt(roundTo(1 - b, 6))}$, so each ${c.per} the quantity keeps $${fmt(roundTo(b * 100, 6))}\\%$ of its value and loses $${fmt(pct)}\\%$.`,
      `Exponential ${g ? 'growth' : 'decay'}; initial value ${c.isMoney ? money(a) : `$${nx(a)}$`}; ${g ? 'increase' : 'decrease'} of $${fmt(pct)}\\%$ per ${c.per}.`,
    ],
  };
}

function featTable(rng: Rng): GenOutput {
  const f: ExpF = rng.pick([
    { a: rng.pick([1, 2, 3, 5]), bn: 2, bd: 1 },
    { a: rng.pick([1, 2, 4]), bn: 3, bd: 1 },
    { a: rng.pick([64, 96, 160, 192, 320]), bn: 1, bd: 2 },
    { a: rng.pick([81, 162, 243]), bn: 1, bd: 3 },
    { a: rng.pick([16, 32, 48]), bn: 1.5, bd: 1 },
    { a: rng.pick([256, 512]), bn: 0.75, bd: 1 },
  ]);
  const xs = [0, 1, 2, 3, 4];
  const ask = rng.pick([5, 6, -1]);
  const yAsk = expAt(f, ask);
  return {
    prompt: `The table shows values of an exponential function $y = a(b)^x$. Determine $a$ and $b$, then find $y$ when $x = ${ask}$.`,
    figure: { type: 'table', headers: ['$x$', '$y$'], rows: xs.map((x) => [String(x), fmt(expAt(f, x))]), horizontal: true },
    parts: [numPart(f.a, { label: '$a =$' }), numPart(bVal(f), { label: '$b =$' }), numPart(yAsk, { label: `$y$ when $x = ${ask}$:` })],
    hints: [
      'The value of $y$ at $x = 0$ is $a$.',
      'Divide each $y$-value by the one before it. In an exponential function this ratio is always the same: it is $b$.',
    ],
    solution: [
      `At $x = 0$, $y = ${nx(f.a)}$, so $a = ${nx(f.a)}$.`,
      `The ratios are all the same: $\\dfrac{${fmt(expAt(f, 1))}}{${fmt(expAt(f, 0))}} = \\dfrac{${fmt(expAt(f, 2))}}{${fmt(expAt(f, 1))}} = ${fmt(bVal(f))}$, so $b = ${fmt(bVal(f))}$.`,
      ask > 0
        ? `$y = ${nx(f.a)}(${fmt(bVal(f))})^{${ask}} = ${fracTex(yAsk)}$ (or keep multiplying the table by $${fmt(bVal(f))}$).`
        : `$y = ${nx(f.a)}(${fmt(bVal(f))})^{-1} = ${nx(f.a)} \\div ${fmt(bVal(f))} = ${fracTex(yAsk)}$ (one step back divides by $b$).`,
      `$a = ${nx(f.a)}$, $b = ${fmt(bVal(f))}$, and $y = ${fracTex(yAsk)}$ when $x = ${ask}$.`,
    ],
  };
}

const expFeatures = skill({
  id: 'm302-exp-features',
  name: 'Characteristics of exponential functions',
  description: 'Identify growth or decay, the y-intercept, the asymptote, the domain and the range of y = a(b)^x, and match equations, tables and graphs.',
  outcomes: ['RF6'],
  lessonId: 'm302-6-1',
  gen(rng, d) {
    const kind = byDifficulty(
      d,
      rng.pick(['growthYint', 'evaluate', 'graphRead'] as const),
      rng.pick(['domainRange', 'statements', 'pointsToEq', 'evaluate'] as const),
      rng.pick(['graphToEq', 'matchGraph', 'context', 'table'] as const),
    );
    switch (kind) {
      case 'growthYint': return featGrowthYint(rng);
      case 'evaluate': return featEvaluate(rng, d);
      case 'graphRead': return featGraphRead(rng);
      case 'domainRange': return featDomainRange(rng);
      case 'statements': return featStatements(rng);
      case 'pointsToEq': return featPointsToEq(rng);
      case 'graphToEq': return featGraphToEq(rng);
      case 'matchGraph': return featMatchGraph(rng);
      case 'context': return featContext(rng);
      default: return featTable(rng);
    }
  },
});

// ---------------------------------------------------------------------------
// 6.2 — Solving exponential equations: m302-exp-equation
// ---------------------------------------------------------------------------

const FAMILY: Record<number, number> = { 2: 7, 3: 5, 5: 4, 10: 4 };

/** "Solve. ..." solution steps for a·x + c = e with an exact answer. */
function solveLinear(a: number, c: number, e: number): { steps: string[]; x: number } {
  const x = (e - c) / a;
  const steps: string[] = [];
  if (c !== 0) steps.push(`$${lin(a, 0)} = ${fmt(e)} ${c > 0 ? '-' : '+'} ${fmt(Math.abs(c))} = ${fmt(e - c)}$`);
  if (a !== 1) steps.push(`$x = ${a === -1 ? `-(${fmt(e - c)})` : `\\dfrac{${fmt(e - c)}}{${fmt(a)}}`} = ${fracTex(x)}$`);
  return { steps, x };
}

function eqSimple(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick([2, 2, 3, 3, 5, 10]);
  const neg = rng.chance(d === 1 ? 0.25 : 0.5);
  const k = rng.int(neg ? 1 : 2, FAMILY[p] - (neg ? 2 : 1)) * (neg ? -1 : 1);
  const a = d === 1 ? 1 : rng.pick([1, 2, 3]);
  const c = rng.chance(0.3) && d === 1 ? 0 : rng.nonZero(-3, 3);
  // a·x + c = k
  const L = lin(a, c);
  const rhs = powTex(p, k);
  const { steps, x } = solveLinear(a, c, k);
  const toPow = k > 0 ? `$${rhs} = ${p}^{${k}}$` : p === 10 ? `$${rhs} = 10^{${k}}$` : `$${rhs} = \\dfrac{1}{${p}^{${-k}}} = ${p}^{${k}}$`;
  return {
    prompt: `Solve $${p}^{${L}} = ${rhs}$.${Number.isInteger(x) ? '' : ' Give an exact answer.'}`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [
      `Write $${rhs}$ as a power of $${p}$.${k < 0 ? ' A reciprocal is a negative power: $\\dfrac{1}{b^n} = b^{-n}$.' : ''}`,
      'When the bases are the same, the exponents must be equal. Set them equal and solve.',
    ],
    solution: [
      `Write the right side as a power of $${p}$: ${toPow}.`,
      `$${p}^{${L}} = ${p}^{${k}}$, and the bases are the same, so the exponents are equal: $${L} = ${k}$.`,
      ...steps,
      `$x = ${fracTex(x)}$`,
    ],
  };
}

function eqBothSides(rng: Rng, d: Difficulty): GenOutput {
  const o = retry(
    () => {
      const p = rng.pick([2, 2, 2, 3, 3, 5]);
      const maxP = p === 2 ? 4 : p === 3 ? 3 : 2;
      const recip = d === 3 && rng.chance(0.6);
      let m = rng.int(1, maxP);
      let n = rng.int(1, maxP);
      if (m === n) n = m === 1 ? 2 : 1;
      if (recip) m = -m; // left base is 1/p^|m|
      const x0 = rng.int(-3, 6);
      const a1 = rng.pick([1, 1, 2]);
      const a2 = rng.pick([1, 1, 2]);
      const c1 = rng.int(-3, 3);
      const c2 = (m * (a1 * x0 + c1) - n * a2 * x0) / n;
      return { p, m, n, x0, a1, a2, c1, c2 };
    },
    (o) => Number.isInteger(o.c2) && Math.abs(o.c2) <= 8 && o.m * o.a1 !== o.n * o.a2 && (o.c1 !== 0 || o.c2 !== 0) && o.p ** Math.max(Math.abs(o.m), o.n) <= 125,
    300,
  );
  const { p, m, n, x0, a1, a2, c1, c2 } = o;
  const baseL = m > 0 ? nx(p ** m) : `\\left(\\frac{1}{${p ** -m}}\\right)`;
  const baseR = nx(p ** n);
  const L1 = lin(a1, c1);
  const L2 = lin(a2, c2);
  const asPow = (k: number) => (k === 1 ? `${p}` : `${p}^{${k}}`);
  const rewrite: string[] = [];
  if (m !== 1) rewrite.push(m > 0 ? `$${baseL} = ${p}^{${m}}$` : `$\\dfrac{1}{${p ** -m}} = \\dfrac{1}{${p}^{${-m}}} = ${p}^{${m}}$`);
  if (n !== 1) rewrite.push(`$${baseR} = ${p}^{${n}}$`);
  const wrap = (k: number, L: string) => (k === 1 ? L : `${k < 0 ? `(${k})` : k}(${L})`);
  const E1 = lin(m * a1, m * c1);
  const E2 = lin(n * a2, n * c2);
  const A = m * a1 - n * a2;
  const C = n * c2 - m * c1;
  return {
    prompt: `Solve $${baseL}^{${L1}} = ${baseR}^{${L2}}$.`,
    parts: [numPart(x0, { label: '$x =$' })],
    hints: [
      `Write both bases as powers of $${p}$.`,
      'Use the power of a power law, $(b^m)^n = b^{mn}$, then set the exponents equal and solve.',
    ],
    solution: [
      `Write both bases as powers of $${p}$: ${rewrite.join(' and ')}.`,
      `$(${asPow(m)})^{${L1}} = (${asPow(n)})^{${L2}}$, so $${p}^{${wrap(m, L1)}} = ${p}^{${wrap(n, L2)}}$.`,
      `$${p}^{${E1}} = ${p}^{${E2}}$. The bases are the same, so $${E1} = ${E2}$.`,
      `Collect the $x$-terms on one side: $${lin(A, 0)} = ${fmt(C)}$.`,
      `$x = ${A === 1 ? fmt(C) : `\\dfrac{${fmt(C)}}{${fmt(A)}}`} = ${fmt(x0)}$`,
      `Check: both sides equal $${p}^{${fmt(m * (a1 * x0 + c1))}}$ when $x = ${x0}$. The solution is $x = ${x0}$.`,
    ],
  };
}

function eqLogs(rng: Rng, d: Difficulty): GenOutput {
  const o = retry(
    () => {
      const b = d === 2 ? rng.pick([2, 3, 4, 5, 6, 7, 1.5, 2.5]) : rng.pick([1.04, 1.05, 1.06, 1.08, 1.12, 1.15, 0.8, 0.85, 0.9, 0.75]);
      const A = d === 2 ? rng.pick([1, 1, 2, 3, 4, 5]) : rng.pick([50, 120, 200, 250, 400, 800]);
      let N: number;
      if (d === 2) N = rng.int(5, 400);
      else N = b > 1 ? rng.pick([1.6, 1.8, 2, 2.5, 3, 3.6, 4, 5]) : rng.pick([0.2, 0.25, 0.3, 0.4, 0.45, 0.6]);
      const C = roundTo(A * N, 6);
      const x = Math.log10(N) / Math.log10(b);
      return { b, A, N, C, x };
    },
    (o) => clear(o.x, 2) && Math.abs(Math.round(o.x) - o.x) > 0.02 && o.x > 0 && o.x < 60 && Number.isInteger(o.C),
  );
  const { b, A, N, C, x } = o;
  const lhs = A === 1 ? `${fmt(b)}^{x}` : `${nx(A)}(${fmt(b)})^{x}`;
  return {
    prompt: `Solve $${lhs} = ${nx(C)}$. Give your answer ${roundingPhrase(2)}.`,
    parts: [numPart(x, { label: '$x \\approx$', decimals: 2 })],
    calculator: true,
    hints: [
      `${A === 1 ? '' : `First divide both sides by $${nx(A)}$. `}$${nx(N)}$ is not a power of $${fmt(b)}$, so take the logarithm of both sides.`,
      'Use $\\log(b^x) = x\\log b$, then divide: $x = \\dfrac{\\log N}{\\log b}$.',
    ],
    solution: [
      ...(A === 1 ? [] : [`Divide both sides by $${nx(A)}$: $(${fmt(b)})^{x} = ${nx(N)}$.`]),
      `Take the common logarithm of both sides: $\\log (${fmt(b)})^{x} = \\log ${nx(N)}$.`,
      `Bring the exponent down: $x\\log ${fmt(b)} = \\log ${nx(N)}$.`,
      `$x = \\dfrac{\\log ${nx(N)}}{\\log ${fmt(b)}} = ${work(x)}$`,
      `$x ${approx(x, 2)}$. Check: $${lhs.replace(/x\}$/, `${fmt(roundTo(x, 2))}}`)} \\approx ${nx(roundTo(A * b ** roundTo(x, 2), 1))}$, close to $${nx(C)}$.`,
    ],
  };
}

function eqCoefficient(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const p = rng.pick([2, 2, 3, 5]);
      const m = rng.int(1, p === 2 ? 3 : 2);
      const k = rng.pick([2, 3, 4, 5]);
      const a1 = rng.pick([1, 1, 2]);
      const c1 = rng.int(-3, 3);
      const e = rng.int(2, FAMILY[p]);
      const x = (e / m - c1) / a1;
      return { p, m, k, a1, c1, e, x };
    },
    (o) => !!toFrac(o.x, 12) && o.k * o.p ** o.e <= 3000 && o.p ** o.m <= 25 && (o.m > 1 || o.a1 > 1 || o.c1 !== 0),
  );
  const { p, m, k, a1, c1, e, x } = o;
  const B = p ** m;
  const L = lin(a1, c1);
  const R = k * p ** e;
  const E = lin(m * a1, m * c1);
  const lead = m * a1;
  const rhs = e - m * c1;
  return {
    prompt: `Solve $${k}(${B})^{${L}} = ${nx(R)}$.${Number.isInteger(x) ? '' : ' Give an exact answer.'}`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [
      `Divide both sides by $${k}$ first.`,
      `Then write both sides as powers of $${p}$ and set the exponents equal.`,
    ],
    solution: [
      `Divide both sides by $${k}$: $${B}^{${L}} = ${nx(p ** e)}$.`,
      `Write both sides as powers of $${p}$: ${m === 1 ? '' : `$(${p}^{${m}})^{${L}} = ${p}^{${e}}$, so `}$${p}^{${E}} = ${p}^{${e}}$.`,
      `Set the exponents equal: $${E} = ${e}$.`,
      ...(m * c1 !== 0 ? [`$${lin(lead, 0)} = ${fmt(rhs)}$`] : []),
      ...(lead !== 1 ? [`$x = \\dfrac{${fmt(rhs)}}{${lead}} = ${fracTex(x)}$`] : []),
      `$x = ${fracTex(x)}$`,
    ],
  };
}

function eqLogsLinear(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 4, 5, 6]);
      const a = rng.pick([2, 3]);
      const c = rng.nonZero(-4, 4);
      const N = rng.int(10, 300);
      const u = Math.log10(N) / Math.log10(b);
      const x = (u - c) / a;
      return { b, a, c, N, u, x };
    },
    (o) => clear(o.x, 2) && Math.abs(o.u - Math.round(o.u)) > 0.03,
  );
  const { b, a, c, N, u, x } = o;
  const L = lin(a, c);
  return {
    prompt: `Solve $${b}^{${L}} = ${N}$. Give your answer ${roundingPhrase(2)}.`,
    parts: [numPart(x, { label: '$x \\approx$', decimals: 2 })],
    calculator: true,
    hints: [
      'Take the logarithm of both sides and bring the exponent down as a factor (keep it in brackets).',
      `You get $(${L})\\log ${b} = \\log ${N}$. Divide by $\\log ${b}$, then solve the linear equation.`,
    ],
    solution: [
      `Take the common logarithm of both sides: $(${L})\\log ${b} = \\log ${N}$.`,
      `$${L} = \\dfrac{\\log ${N}}{\\log ${b}} = ${work(u)}$`,
      `$${lin(a, 0)} = ${work(u)} ${c > 0 ? '-' : '+'} ${Math.abs(c)} = ${work(u - c)}$`,
      `$x = \\dfrac{${work(u - c)}}{${a}} = ${work(x)}$`,
      `$x ${approx(x, 2)}$`,
    ],
  };
}

const expEquation = skill({
  id: 'm302-exp-equation',
  name: 'Solving exponential equations',
  description: 'Solve exponential equations by writing both sides with a common base, or with logarithms when no common base is available.',
  outcomes: ['RF5'],
  lessonId: 'm302-6-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return eqSimple(rng, 1);
    if (d === 2) {
      const k = rng.pick(['both', 'both', 'logs', 'logs', 'simple'] as const);
      return k === 'both' ? eqBothSides(rng, 2) : k === 'logs' ? eqLogs(rng, 2) : eqSimple(rng, 2);
    }
    const k = rng.pick(['logs', 'recip', 'coef', 'linear'] as const);
    if (k === 'logs') return eqLogs(rng, 3);
    if (k === 'recip') return eqBothSides(rng, 3);
    if (k === 'coef') return eqCoefficient(rng);
    return eqLogsLinear(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.3 — Evaluating logarithms: m302-log-evaluate
// ---------------------------------------------------------------------------

const LOG_DEF = '$\\log_b x = y$ means $b^y = x$: a logarithm is an exponent.';
const MAXK: Record<number, number> = { 2: 8, 3: 6, 4: 5, 5: 4, 6: 4, 7: 3, 8: 3, 9: 3, 10: 5 };

function logPowers(rng: Rng): GenOutput {
  const b = rng.pick([2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
  const k = rng.weighted<number>([[0, 1], [1, 1], ...Array.from({ length: MAXK[b] - 1 }, (_, i) => [i + 2, 3] as [number, number])]);
  const N = b ** k;
  return {
    prompt: `Evaluate $${logB(b)} ${nx(N)}$.`,
    parts: [numPart(k)],
    hints: [LOG_DEF, `Ask: $${b}$ to what power gives $${nx(N)}$?${b === 10 ? ' (A logarithm with no base written is base $10$.)' : ''}`],
    solution: [
      `Let $${logB(b)} ${nx(N)} = y$. Then $${b}^{y} = ${nx(N)}$.`,
      k === 0 ? `Any non-zero base to the power $0$ is $1$, so $${b}^{0} = 1$.` : `$${b}^{${k}} = ${nx(N)}$${k > 1 ? ` (${Array(k).fill(b).join(' \\times ')})` : ''}.`.replace('$ (', '$ ($').replace(/\)\.$/, '$).'),
      `$${logB(b)} ${nx(N)} = ${k}$`,
    ],
  };
}

function logToForm(rng: Rng, toLog: boolean): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 10]);
  const k = rng.int(2, Math.min(4, MAXK[b]));
  const N = b ** k;
  const expF = `$${b}^{${k}} = ${nx(N)}$`;
  const logF = `$${logB(b)} ${nx(N)} = ${k}$`;
  if (toLog) {
    return {
      prompt: `Which equation is the logarithmic form of ${expF}?`,
      parts: [part(mc(rng, logF, [`$\\log_{${k}} ${nx(N)} = ${b}$`, `$${logB(b)} ${k} = ${nx(N)}$`, `$\\log_{${nx(N)}} ${b} = ${k}$`, `$\\log_{${k}} ${b} = ${nx(N)}$`]))],
      hints: [LOG_DEF, 'The base stays the base. The logarithm equals the exponent.'],
      solution: [
        `In ${expF}, the base is $${b}$, the exponent is $${k}$ and the result is $${nx(N)}$.`,
        `A logarithm gives the exponent: $\\log_{\\text{base}}(\\text{result}) = \\text{exponent}$.`,
        `The logarithmic form is ${logF}.`,
      ],
    };
  }
  return {
    prompt: `Which equation is the exponential form of ${logF}?`,
    parts: [part(mc(rng, expF, [`$${k}^{${b}} = ${nx(N)}$`, `$${nx(N)}^{${k}} = ${b}$`, `$${b}^{${nx(N)}} = ${k}$`, `$${k}^{${nx(N)}} = ${b}$`]))],
    hints: [LOG_DEF, `The base of the logarithm${b === 10 ? ' (10 when no base is written)' : ''} is the base of the power, and the value of the logarithm is the exponent.`],
    solution: [
      `In ${logF}, the base is $${b}$, the argument is $${nx(N)}$ and the value is $${k}$.`,
      `$\\log_b x = y$ means $b^y = x$.`,
      `The exponential form is ${expF}.`,
    ],
  };
}

function logFractional(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const p = rng.pick([2, 2, 3, 3, 5, 10]);
      const m = p === 10 ? 1 : rng.pick([1, 1, 2, 3]);
      const n = p === 10 ? -rng.int(1, 4) : rng.pick([-3, -2, -1, 1, 2, 3, 4]);
      return { p, m, n };
    },
    (o) => o.p ** o.m <= 27 && o.p ** Math.abs(o.n) <= 125 && (o.n < 0 || o.n % o.m !== 0),
  );
  const { p, m, n } = o;
  const base = p ** m;
  const arg = n > 0 ? nx(p ** n) : p === 10 ? fmt(10 ** n, 6) : `\\frac{1}{${p ** -n}}`;
  const v = n / m;
  return {
    prompt: `Evaluate $${logB(base)} ${arg}$.${Number.isInteger(v) ? '' : ' Give an exact answer.'}`,
    parts: [numPart(v)],
    hints: [LOG_DEF, `Write both $${base}$ and $${arg}$ as powers of $${p}$.${n < 0 ? ' A reciprocal is a negative power.' : ''}`],
    solution: [
      `Let $${logB(base)} ${arg} = y$, so $${base}^{y} = ${arg}$.`,
      `As powers of $${p}$: ${m === 1 ? '' : `$${base} = ${p}^{${m}}$ and `}$${arg} = ${p}^{${n}}$.`,
      `$${m === 1 ? p : `(${p}^{${m}})`}^{y} = ${p}^{${n}}$, so $${m === 1 ? 'y' : `${m}y`} = ${n}$.`,
      `$${logB(base)} ${arg} = ${fracTex(v)}$`,
    ],
  };
}

function logSolveUnknown(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const r = rng.int(2, 9);
    const k = rng.int(2, r <= 4 ? 4 : r <= 6 ? 3 : 2);
    const N = r ** k;
    return {
      prompt: `Solve for $x$: $\\log_{x} ${nx(N)} = ${k}$.`,
      parts: [numPart(r, { label: '$x =$' })],
      hints: [LOG_DEF, `Write the equation in exponential form: $x^{${k}} = ${nx(N)}$.`],
      solution: [
        `In exponential form: $x^{${k}} = ${nx(N)}$.`,
        `$x = ${k === 2 ? `\\sqrt{${nx(N)}}` : `\\sqrt[${k}]{${nx(N)}}`} = ${r}$ (a base must be positive).`,
        `$x = ${r}$`,
      ],
    };
  }
  const b = rng.pick([2, 3, 4, 5, 10]);
  const k = rng.pick([-3, -2, -1, 2, 3, 4].filter((t) => Math.abs(t) <= MAXK[b] && b ** Math.abs(t) <= 1000));
  const x = b ** k;
  return {
    prompt: `Solve for $x$: $${logB(b)} x = ${k}$.${k < 0 ? ' Give an exact answer.' : ''}`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [LOG_DEF, `Write the equation in exponential form: $x = ${b}^{${k}}$.`],
    solution: [
      `In exponential form: $x = ${b}^{${k}}$.`,
      k < 0 ? `$${b}^{${k}} = \\dfrac{1}{${b}^{${-k}}} = ${b === 10 ? fmt(x, 6) : `\\dfrac{1}{${b ** -k}}`}$` : `$${b}^{${k}} = ${nx(x)}$`,
      `$x = ${b === 10 ? fmt(x, 6) : fracTex(x)}$`,
    ],
  };
}

function logChangeBase(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 4, 5, 6, 7, 8, 9]);
      const N = rng.int(5, 600);
      const v = Math.log10(N) / Math.log10(b);
      return { b, N, v };
    },
    (o) => clear(o.v, 2) && Math.abs(o.v - Math.round(o.v)) > 0.02,
  );
  const { b, N, v } = o;
  return {
    prompt: `Use the change of base formula $\\log_b x = \\dfrac{\\log x}{\\log b}$ to evaluate $\\log_{${b}} ${N}$ ${roundingPhrase(2)}.`,
    parts: [numPart(v, { decimals: 2 })],
    calculator: true,
    hints: ['Use the LOG key (base 10) on your calculator for the top and the bottom.', `$\\log_{${b}} ${N} = \\dfrac{\\log ${N}}{\\log ${b}}$`],
    solution: [
      `$\\log_{${b}} ${N} = \\dfrac{\\log ${N}}{\\log ${b}} = \\dfrac{${work(Math.log10(N))}}{${work(Math.log10(b))}}$`,
      `$= ${work(v)}$`,
      `Check: $${b}^{${fmtFixed(v, 2)}} \\approx ${nx(roundTo(b ** roundTo(v, 2), 0))}$, close to $${N}$. So $\\log_{${b}} ${N} ${approx(v, 2)}$.`,
    ],
  };
}

function logBetween(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 4, 5, 6, 10]);
      const k = rng.int(1, Math.min(MAXK[b] - 1, b === 10 ? 4 : 6));
      const N = rng.int(b ** k + 1, b ** (k + 1) - 1);
      return { b, k, N, v: Math.log10(N) / Math.log10(b) };
    },
    (o) => clear(o.v, 2) && o.N % o.b !== 0 && o.N <= 5000,
  );
  const { b, k, N, v } = o;
  const correct = `$${k}$ and $${k + 1}$`;
  const naive = Math.floor(N / b);
  const ds = [`$${k - 1}$ and $${k}$`, `$${k + 1}$ and $${k + 2}$`, `$${naive}$ and $${naive + 1}$`];
  return {
    prompt: `Between which two consecutive whole numbers does $${logB(b)} ${nx(N)}$ lie? Then use the change of base formula $\\log_b x = \\dfrac{\\log x}{\\log b}$ to evaluate it ${roundingPhrase(2)}.`,
    parts: [{ label: 'It lies between', answer: mc(rng, correct, ds) }, numPart(v, { label: 'Value', decimals: 2 })],
    calculator: true,
    hints: [`List powers of $${b}$: $${b}^{${k}} = ${nx(b ** k)}$, $${b}^{${k + 1}} = ${nx(b ** (k + 1))}$, ... Where does $${nx(N)}$ fit?`, `$${logB(b)} ${nx(N)} = \\dfrac{\\log ${nx(N)}}{\\log ${b}}$`],
    solution: [
      `$${b}^{${k}} = ${nx(b ** k)}$ and $${b}^{${k + 1}} = ${nx(b ** (k + 1))}$.`,
      `Since $${nx(b ** k)} < ${nx(N)} < ${nx(b ** (k + 1))}$, the exponent that gives $${nx(N)}$ is between $${k}$ and $${k + 1}$.`,
      `$${logB(b)} ${nx(N)} = \\dfrac{\\log ${nx(N)}}{\\log ${b}} = ${work(v)} ${approx(v, 2)}$, which is between $${k}$ and $${k + 1}$ as expected.`,
    ],
  };
}

function logEquation(rng: Rng): GenOutput {
  const kind = rng.pick(['linear', 'linear', 'decimal', 'coef'] as const);
  if (kind === 'decimal') {
    const t = retry(() => rng.float(1.1, 3.6, 1), (t) => clear(10 ** t, 2) && !Number.isInteger(t));
    const x = 10 ** t;
    return {
      prompt: `Solve $\\log x = ${fmt(t)}$. Give your answer ${roundingPhrase(2)}.`,
      parts: [numPart(x, { label: '$x \\approx$', decimals: 2 })],
      calculator: true,
      hints: [LOG_DEF, `With no base written, the base is $10$: $x = 10^{${fmt(t)}}$.`],
      solution: [`In exponential form: $x = 10^{${fmt(t)}}$.`, `$x = ${work(x, 4)}$`, `$x ${approx(x, 2)}$`],
    };
  }
  if (kind === 'coef') {
    const b = rng.pick([2, 3, 4, 5]);
    const j = rng.int(2, Math.min(MAXK[b] - 1, 4));
    const k = rng.pick([2, 3]);
    const x = b ** j;
    return {
      prompt: `Solve $${k}${logB(b)} x = ${k * j}$.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: [`Divide both sides by $${k}$ first.`, LOG_DEF],
      solution: [`Divide by $${k}$: $${logB(b)} x = ${j}$.`, `In exponential form: $x = ${b}^{${j}}$.`, `$x = ${nx(x)}$`],
    };
  }
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 4, 5, 10]);
      const k = rng.int(b === 10 ? 1 : 2, Math.min(MAXK[b], b === 2 ? 6 : 4));
      const a = rng.pick([1, 2, 3]);
      const c = rng.nonZero(-9, 9);
      return { b, k, a, c, x: (b ** k - c) / a };
    },
    (o) => Number.isInteger(o.x) && o.x !== 0 && o.b ** o.k <= 1000,
  );
  const { b, k, a, c, x } = o;
  const L = lin(a, c);
  return {
    prompt: `Solve $${logB(b)}(${L}) = ${k}$.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [LOG_DEF, `Write it in exponential form: $${L} = ${b}^{${k}}$. Then solve the linear equation.`],
    solution: [
      `In exponential form: $${L} = ${b}^{${k}} = ${nx(b ** k)}$.`,
      ...solveLinear(a, c, b ** k).steps,
      `Check: $${L.replace('x', `(${fmt(x)})`)} = ${nx(b ** k)}$, which is positive, so the logarithm is defined. $x = ${fmt(x)}$`,
    ],
  };
}

function logCombo(rng: Rng): GenOutput {
  const term = () => {
    const b = rng.pick([2, 3, 5, 10]);
    const k = rng.pick([-3, -2, -1, 2, 3, 4].filter((t) => b ** Math.abs(t) <= 1000));
    const arg = k > 0 ? nx(b ** k) : b === 10 ? fmt(10 ** k, 6) : `\\frac{1}{${b ** -k}}`;
    return { b, k, arg };
  };
  const ts = retry(() => [term(), term(), term()], (t) => new Set(t.map((x) => x.b)).size === 3);
  const coefs = [rng.pick([1, 2, 3]), rng.sign(), rng.sign()];
  const v = ts.reduce((s, t, i) => s + coefs[i] * t.k, 0);
  const show = (c: number, i: number) => {
    const t = ts[i];
    const abs = Math.abs(c);
    const body = `${abs === 1 ? '' : abs}${logB(t.b)} ${t.arg}`;
    return i === 0 ? (c < 0 ? `-${body}` : body) : ` ${c < 0 ? '-' : '+'} ${body}`;
  };
  const expr = coefs.map((c, i) => show(c, i)).join('');
  return {
    prompt: `Evaluate $${expr}$.`,
    parts: [numPart(v)],
    hints: ['Evaluate each logarithm on its own first: what power of the base gives the argument?', 'Then multiply by any coefficients and add or subtract.'],
    solution: [
      ...ts.map((t) => `$${logB(t.b)} ${t.arg} = ${t.k}$, because $${t.b}^{${t.k}} = ${t.arg}$.`),
      `$${coefs.map((c, i) => `${i === 0 ? (c < 0 ? '-' : '') : c < 0 ? ' - ' : ' + '}${Math.abs(c) === 1 ? '' : `${Math.abs(c)}`}${Math.abs(c) === 1 ? (ts[i].k < 0 ? `(${ts[i].k})` : ts[i].k) : `(${ts[i].k})`}`).join('')} = ${v}$`,
      `The value is $${v}$.`,
    ],
  };
}

const logEvaluate = skill({
  id: 'm302-log-evaluate',
  name: 'Evaluating logarithms',
  description: 'Evaluate logarithms, convert between exponential and logarithmic form, and solve simple logarithmic equations.',
  outcomes: ['RF4'],
  lessonId: 'm302-6-3',
  calculator: true,
  gen(rng, d) {
    const kind = byDifficulty(
      d,
      rng.pick(['powers', 'powers', 'toLog', 'toExp'] as const),
      rng.pick(['fractional', 'unknown', 'changeBase'] as const),
      rng.pick(['between', 'equation', 'combo'] as const),
    );
    switch (kind) {
      case 'powers': return logPowers(rng);
      case 'toLog': return logToForm(rng, true);
      case 'toExp': return logToForm(rng, false);
      case 'fractional': return logFractional(rng);
      case 'unknown': return logSolveUnknown(rng);
      case 'changeBase': return logChangeBase(rng);
      case 'between': return logBetween(rng);
      case 'equation': return logEquation(rng);
      default: return logCombo(rng);
    }
  },
});

// ---------------------------------------------------------------------------
// 6.3 — Laws of logarithms: m302-log-laws
// ---------------------------------------------------------------------------

const LAWS = 'Product law: $\\log_b M + \\log_b N = \\log_b (MN)$. Quotient law: $\\log_b M - \\log_b N = \\log_b \\dfrac{M}{N}$. Power law: $\\log_b M^n = n\\log_b M$.';

function isPowerOf(n: number, b: number): boolean {
  if (n < 1) return false;
  let m = n;
  while (m % b === 0) m /= b;
  return m === 1;
}

function lawProduct(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([6, 10, 10, 12, 15, 20]);
      const k = b === 10 ? rng.pick([2, 3]) : 2;
      const T = b ** k;
      const divs: number[] = [];
      for (let m = 2; m < T; m++) if (T % m === 0 && !isPowerOf(m, b) && !isPowerOf(T / m, b) && m < T / m) divs.push(m);
      const M = rng.pick(divs);
      return { b, k, T, M, N: T / M };
    },
    (o) => o.M > 1,
  );
  const { b, k, T, M, N } = o;
  const [x, y] = rng.chance(0.5) ? [M, N] : [N, M];
  return {
    prompt: `Use the laws of logarithms to evaluate $${logB(b)} ${nx(x)} + ${logB(b)} ${nx(y)}$.`,
    parts: [numPart(k)],
    hints: ['Neither logarithm is a whole number on its own. Combine them first.', 'Product law: $\\log_b M + \\log_b N = \\log_b (MN)$.'],
    solution: [
      `By the product law, $${logB(b)} ${nx(x)} + ${logB(b)} ${nx(y)} = ${logB(b)} (${nx(x)} \\times ${nx(y)}) = ${logB(b)} ${nx(T)}$.`,
      `$${b}^{${k}} = ${nx(T)}$, so $${logB(b)} ${nx(T)} = ${k}$.`,
      `The value is $${k}$.`,
    ],
  };
}

function lawQuotient(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 5, 10]);
      const k = rng.int(b === 10 ? 1 : 2, b === 2 ? 5 : b === 3 ? 3 : 2);
      const N = rng.int(3, 15);
      return { b, k, N, M: N * b ** k };
    },
    (o) => !isPowerOf(o.N, o.b) && o.M <= 2000,
  );
  const { b, k, N, M } = o;
  return {
    prompt: `Use the laws of logarithms to evaluate $${logB(b)} ${nx(M)} - ${logB(b)} ${N}$.`,
    parts: [numPart(k)],
    hints: ['Combine the two logarithms into one first.', 'Quotient law: $\\log_b M - \\log_b N = \\log_b \\dfrac{M}{N}$.'],
    solution: [
      `By the quotient law, $${logB(b)} ${nx(M)} - ${logB(b)} ${N} = ${logB(b)} \\dfrac{${nx(M)}}{${N}} = ${logB(b)} ${nx(b ** k)}$.`,
      `$${b}^{${k}} = ${nx(b ** k)}$, so the value is $${k}$.`,
      `The value is $${k}$.`,
    ],
  };
}

function lawPower(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 10]);
  const m = rng.int(1, b === 2 ? 4 : 3);
  const n = rng.pick([3, 4, 5, 6, 10]);
  const M = b ** m;
  const inside = rng.chance(0.5);
  const expr = inside ? `${logB(b)} ${nx(M)}^{${n}}` : `${n}${logB(b)} ${nx(M)}`;
  return {
    prompt: `Evaluate $${expr}$.`,
    parts: [numPart(m * n)],
    hints: [inside ? `Power law: $\\log_b M^n = n\\log_b M$. Bring the exponent $${n}$ to the front.` : `Evaluate $${logB(b)} ${nx(M)}$ first, then multiply by $${n}$.`, `$${b}^{${m}} = ${nx(M)}$`],
    solution: [
      ...(inside ? [`By the power law, $${logB(b)} ${nx(M)}^{${n}} = ${n}${logB(b)} ${nx(M)}$.`] : []),
      `$${logB(b)} ${nx(M)} = ${m}$, because $${b}^{${m}} = ${nx(M)}$.`,
      `$${n} \\times ${m} = ${m * n}$`,
      `The value is $${m * n}$.`,
    ],
  };
}

/** x^{p} in LaTeX (no exponent for 1). */
const pw = (v: string, p: number) => (p === 1 ? v : `${v}^{${p}}`);
const cf = (c: number) => (c === 1 ? '' : `${c}`);

function lawSingle(rng: Rng): GenOutput {
  const b = rng.pick([10, 10, 2, 3, 5]);
  const L = logB(b);
  const [p, q, r] = [rng.int(1, 4), rng.int(1, 3), rng.int(2, 4)];
  const expr = `${cf(p)}${L} x + ${cf(q)}${L} y - ${cf(r)}${L} z`;
  const correct = `$${L} \\dfrac{${pw('x', p)}${pw('y', q)}}{${pw('z', r)}}$`;
  const ds = [
    `$${L} (${pw('x', p)} + ${pw('y', q)} - ${pw('z', r)})$`,
    `$${L} \\dfrac{${p === 1 ? '' : p}x${q === 1 ? '' : `\\cdot ${q}`}y}{${r}z}$`,
    `$\\dfrac{${L} ${pw('x', p)}${pw('y', q)}}{${L} ${pw('z', r)}}$`,
    `$${L} (${pw('x', p)}${pw('y', q)} - ${pw('z', r)})$`,
  ];
  return {
    prompt: `Write $${expr}$ as a single logarithm.`,
    parts: [part(mc(rng, correct, ds))],
    hints: ['Use the power law first to move each coefficient into an exponent.', LAWS],
    solution: [
      `Power law: $${expr} = ${L} ${pw('x', p)} + ${L} ${pw('y', q)} - ${L} ${pw('z', r)}$`,
      `Product law: $${L} ${pw('x', p)} + ${L} ${pw('y', q)} = ${L} ${pw('x', p)}${pw('y', q)}$`,
      `Quotient law: subtracting $${L} ${pw('z', r)}$ divides by $${pw('z', r)}$.`,
      `The single logarithm is ${correct}.`,
    ],
  };
}

function lawExpand(rng: Rng): GenOutput {
  const b = rng.pick([10, 2, 3, 5, 7]);
  const L = logB(b);
  const p = rng.int(2, 5);
  const q = rng.int(2, 4);
  const arg = `\\dfrac{${pw('x', p)}y}{${pw('z', q)}}`;
  const correct = `$${p}${L} x + ${L} y - ${q}${L} z$`;
  const ds = [
    `$${p}${L} x + ${L} y + ${q}${L} z$`,
    `$${p}${L} x \\cdot ${L} y - ${q}${L} z$`,
    `$${L} ${p}x + ${L} y - ${L} ${q}z$`,
    `$\\dfrac{${p}${L} x + ${L} y}{${q}${L} z}$`,
  ];
  return {
    prompt: `Which expression is equal to $${L} ${arg}$?`,
    parts: [part(mc(rng, correct, ds))],
    hints: ['A logarithm of a quotient is a difference of logarithms, and a logarithm of a product is a sum.', 'Then use the power law to bring each exponent to the front.'],
    solution: [
      `Quotient law: $${L} ${arg} = ${L} (${pw('x', p)}y) - ${L} ${pw('z', q)}$`,
      `Product law: $${L} (${pw('x', p)}y) = ${L} ${pw('x', p)} + ${L} y$`,
      `Power law: $${L} ${pw('x', p)} = ${p}${L} x$ and $${L} ${pw('z', q)} = ${q}${L} z$.`,
      `$${L} ${arg} = ${p}${L} x + ${L} y - ${q}${L} z$`,
    ],
  };
}

function lawMixed(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const o = retry(
      () => {
        const b = rng.pick([2, 3, 5, 10]);
        const q = rng.pick([2, 3, 5, 7].filter((t) => t !== b && !(b === 10 && (t === 2 || t === 5))));
        const j = rng.pick([1, 1, 2]);
        const n = rng.pick([2, 3]);
        const M = b ** j * q;
        const N = q ** n;
        return { b, q, j, n, M, N };
      },
      (o) => o.M <= 200 && o.N <= 400,
    );
    const { b, j, n, M, N } = o;
    const T = M ** n / N;
    return {
      prompt: `Use the laws of logarithms to evaluate $${n}${logB(b)} ${M} - ${logB(b)} ${N}$.`,
      parts: [numPart(j * n)],
      hints: ['Use the power law to move the coefficient into an exponent, then use the quotient law.', LAWS],
      solution: [
        `Power law: $${n}${logB(b)} ${M} = ${logB(b)} ${M}^{${n}} = ${logB(b)} ${nx(M ** n)}$`,
        `Quotient law: $${logB(b)} ${nx(M ** n)} - ${logB(b)} ${N} = ${logB(b)} \\dfrac{${nx(M ** n)}}{${N}} = ${logB(b)} ${nx(T)}$`,
        `$${b}^{${j * n}} = ${nx(T)}$, so the value is $${j * n}$.`,
      ],
    };
  }
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 6, 10]);
      const k = rng.int(2, b === 2 ? 5 : 3);
      const M = rng.int(3, 30);
      const P = rng.int(2, 30);
      const N = (b ** k * P) / M;
      return { b, k, M, N, P };
    },
    (o) => Number.isInteger(o.N) && o.N > 1 && !isPowerOf(o.M, o.b) && !isPowerOf(o.N, o.b) && !isPowerOf(o.P, o.b) && o.M !== o.P && o.N !== o.P && o.M * o.N <= 5000,
  );
  const { b, k, M, N, P } = o;
  return {
    prompt: `Use the laws of logarithms to evaluate $${logB(b)} ${M} + ${logB(b)} ${N} - ${logB(b)} ${P}$.`,
    parts: [numPart(k)],
    hints: ['Combine the logarithms into one: adding multiplies the arguments and subtracting divides.', LAWS],
    solution: [
      `$${logB(b)} ${M} + ${logB(b)} ${N} - ${logB(b)} ${P} = ${logB(b)} \\dfrac{${M} \\times ${N}}{${P}} = ${logB(b)} \\dfrac{${nx(M * N)}}{${P}} = ${logB(b)} ${nx(b ** k)}$`,
      `$${b}^{${k}} = ${nx(b ** k)}$, so the value is $${k}$.`,
    ],
  };
}

function lawTrue(rng: Rng): GenOutput {
  const b = rng.pick([10, 2, 3]);
  const L = logB(b);
  const [M, N] = retry(() => [rng.int(3, 12), rng.int(2, 9)], ([m, n]) => m > n && m % n === 0 && m / n > 1);
  const k = rng.int(2, 4);
  const which = rng.pick(['product', 'quotient', 'power'] as const);
  const trueS = {
    product: `$${L} ${M} + ${L} ${N} = ${L} ${M * N}$`,
    quotient: `$${L} ${M} - ${L} ${N} = ${L} ${M / N}$`,
    power: `$${L} ${M}^{${k}} = ${k}${L} ${M}$`,
  }[which];
  const falses = [
    `$${L} ${M} + ${L} ${N} = ${L} ${M + N}$`,
    `$${L} ${M} - ${L} ${N} = ${L} ${M - N}$`,
    `$\\dfrac{${L} ${M}}{${L} ${N}} = ${L} ${M / N}$`,
    `$${L} ${M}^{${k}} = (${L} ${M})^{${k}}$`,
    `$${L} ${M} \\times ${L} ${N} = ${L} ${M * N}$`,
  ];
  return {
    prompt: 'Which statement is true?',
    parts: [part(mc(rng, trueS, rng.shuffle(falses)))],
    hints: ['Logarithm laws turn multiplication into addition, division into subtraction and powers into multiplication. They never apply to a sum or difference inside a logarithm.', LAWS],
    solution: [
      { product: `By the product law, adding logarithms multiplies the arguments: $${M} \\times ${N} = ${M * N}$.`, quotient: `By the quotient law, subtracting logarithms divides the arguments: $${M} \\div ${N} = ${M / N}$.`, power: `By the power law, the exponent $${k}$ comes to the front as a factor.` }[which],
      'The other statements apply a law that does not exist, such as $\\log(M + N) = \\log M + \\log N$ or $\\dfrac{\\log M}{\\log N} = \\log \\dfrac{M}{N}$. You can test them with a calculator: the two sides are not equal.',
      `The true statement is ${trueS}.`,
    ],
  };
}

const L2 = 0.301;
const L3 = 0.4771;

function lawApprox(rng: Rng): GenOutput {
  const o = retry(
    () => ({ i: rng.int(0, 4), j: rng.int(0, 3), m: rng.pick([0, 0, 1]) }),
    (o) => {
      const N = 2 ** o.i * 3 ** o.j * 5 ** o.m;
      return N <= 250 && o.i + o.j + o.m >= 2 && !(o.i === o.m && o.j === 0) && (o.j > 0 || o.m > 0) && (o.i > 0 || o.m > 0);
    },
  );
  const { i, j, m } = o;
  const N = 2 ** i * 3 ** j * 5 ** m;
  const v = roundTo(i * L2 + j * L3 + m * (1 - L2), 6);
  const parts: string[] = [];
  if (i) parts.push(pw('2', i));
  if (j) parts.push(pw('3', j));
  if (m) parts.push('5');
  const terms: string[] = [];
  if (i) terms.push(`${cf(i)}\\log 2`);
  if (j) terms.push(`${cf(j)}\\log 3`);
  if (m) terms.push('\\log 5');
  const vals: string[] = [];
  if (i) vals.push(i === 1 ? '0.3010' : `${i}(0.3010)`);
  if (j) vals.push(j === 1 ? '0.4771' : `${j}(0.4771)`);
  if (m) vals.push('0.6990');
  return {
    prompt: `Given $\\log 2 \\approx 0.3010$ and $\\log 3 \\approx 0.4771$, use the laws of logarithms (not the LOG key) to find $\\log ${N}$. Give your answer to four decimal places.`,
    parts: [numPart(v, { decimals: 4 })],
    hints: [`Factor $${N}$ into ${m ? '$2$s, $3$s and $5$s' : '$2$s and $3$s'}.${m ? ' Use $\\log 5 = \\log \\dfrac{10}{2} = 1 - \\log 2$.' : ''}`, LAWS],
    solution: [
      `$${N} = ${parts.join(' \\times ')}$`,
      `$\\log ${N} = ${terms.join(' + ')}$ (product and power laws)`,
      ...(m ? ['$\\log 5 = \\log 10 - \\log 2 \\approx 1 - 0.3010 = 0.6990$'] : []),
      `$\\log ${N} \\approx ${vals.join(' + ')} = ${fmtFixed(v, 4)}$`,
    ],
  };
}

function lawSymbolic(rng: Rng): GenOutput {
  const o = retry(
    () => ({ i: rng.int(-2, 3), j: rng.int(-1, 3) }),
    (o) => o.i !== 0 && o.j !== 0 && Math.abs(o.i) !== Math.abs(o.j) && (o.i > 0 || o.j > 0),
  );
  const { i, j } = o;
  const num = 2 ** Math.max(i, 0) * 3 ** Math.max(j, 0);
  const den = 2 ** Math.max(-i, 0) * 3 ** Math.max(-j, 0);
  const arg = den === 1 ? `${num}` : `\\dfrac{${num}}{${den}}`;
  const term = (c: number, v: string, first: boolean) => {
    const a = Math.abs(c);
    const body = `${a === 1 ? '' : a}${v}`;
    return first ? `${c < 0 ? '-' : ''}${body}` : ` ${c < 0 ? '-' : '+'} ${body}`;
  };
  const combo = (a: number, b: number) => (a > 0 || b < 0 ? `${term(a, 'p', true)}${term(b, 'q', false)}` : `${term(b, 'q', true)}${term(a, 'p', false)}`);
  const correct = `$${combo(i, j)}$`;
  const ds = [
    `$${combo(j, i)}$`,
    `$${Math.abs(i * j) === 1 ? (i * j < 0 ? '-' : '') : i * j}pq$`,
    `$${i > 0 ? (i === 1 ? 'p' : `p^{${i}}`) : `-p^{${-i}}`} ${j > 0 ? '+' : '-'} ${Math.abs(j) === 1 ? 'q' : `q^{${Math.abs(j)}}`}$`,
    `$${combo(-i, -j)}$`,
  ];
  return {
    prompt: `If $\\log 2 = p$ and $\\log 3 = q$, which expression is equal to $\\log ${arg}$?`,
    parts: [part(mc(rng, correct, ds))],
    hints: [`Write $${arg}$ using powers of $2$ and $3$.`, LAWS],
    solution: [
      `$${arg} = ${den === 1 ? `${[i > 0 ? pw('2', i) : '', j > 0 ? pw('3', j) : ''].filter(Boolean).join(' \\times ')}` : `\\dfrac{${[i > 0 ? pw('2', i) : '', j > 0 ? pw('3', j) : ''].filter(Boolean).join(' \\times ')}}{${[i < 0 ? pw('2', -i) : '', j < 0 ? pw('3', -j) : ''].filter(Boolean).join(' \\times ')}}`}$`,
      `Using the product, quotient and power laws: $\\log ${arg} = ${combo(i, j).replace(/p/g, '\\log 2').replace(/q/g, '\\log 3')}$`,
      `Substitute $p$ and $q$: $\\log ${arg} = ${combo(i, j)}$.`,
    ],
  };
}

function lawSolve(rng: Rng): GenOutput {
  const kind = rng.pick(['sum', 'diff'] as const);
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 5, 10]);
      const k = rng.int(b === 10 ? 1 : 2, b === 2 ? 6 : 3);
      const m = rng.int(2, 12);
      const x = kind === 'sum' ? b ** k / m : m * b ** k;
      return { b, k, m, x };
    },
    (o) => Number.isInteger(o.x) && !isPowerOf(o.m, o.b) && o.x <= 5000 && o.x > 1,
  );
  const { b, k, m, x } = o;
  const eq = kind === 'sum' ? `${logB(b)} x + ${logB(b)} ${m} = ${k}` : `${logB(b)} x - ${logB(b)} ${m} = ${k}`;
  return {
    prompt: `Solve $${eq}$.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [`Combine the left side into a single logarithm with the ${kind === 'sum' ? 'product' : 'quotient'} law.`, `Then write the equation in exponential form: $${kind === 'sum' ? `${m}x` : `\\dfrac{x}{${m}}`} = ${b}^{${k}}$.`],
    solution: [
      `${kind === 'sum' ? 'Product' : 'Quotient'} law: $${logB(b)} ${kind === 'sum' ? `${m}x` : `\\dfrac{x}{${m}}`} = ${k}$`,
      `Exponential form: $${kind === 'sum' ? `${m}x` : `\\dfrac{x}{${m}}`} = ${b}^{${k}} = ${nx(b ** k)}$`,
      kind === 'sum' ? `$x = \\dfrac{${nx(b ** k)}}{${m}} = ${nx(x)}$` : `$x = ${m} \\times ${nx(b ** k)} = ${nx(x)}$`,
      `Check: $x = ${nx(x)}$ is positive, so $${logB(b)} x$ is defined. $x = ${nx(x)}$`,
    ],
  };
}

const logLaws = skill({
  id: 'm302-log-laws',
  name: 'Laws of logarithms',
  description: 'Use the product, quotient and power laws of logarithms to evaluate, expand and combine logarithmic expressions.',
  outcomes: ['RF4'],
  lessonId: 'm302-6-3',
  gen(rng, d) {
    const kind = byDifficulty(
      d,
      rng.pick(['product', 'quotient', 'power'] as const),
      rng.pick(['single', 'expand', 'mixed', 'true'] as const),
      rng.pick(['approx', 'symbolic', 'solve'] as const),
    );
    switch (kind) {
      case 'product': return lawProduct(rng);
      case 'quotient': return lawQuotient(rng);
      case 'power': return lawPower(rng);
      case 'single': return lawSingle(rng);
      case 'expand': return lawExpand(rng);
      case 'mixed': return lawMixed(rng);
      case 'true': return lawTrue(rng);
      case 'approx': return { ...lawApprox(rng), calculator: false };
      case 'symbolic': return lawSymbolic(rng);
      default: return lawSolve(rng);
    }
  },
});

// ---------------------------------------------------------------------------
// 6.4 — Exponential models: m302-exp-model
// ---------------------------------------------------------------------------

const INTEREST_FORMULA = 'Use $A = P(1 + i)^n$, where $A$ is the final amount, $P$ is the principal, $i$ is the interest rate per compounding period (as a decimal) and $n$ is the number of compounding periods.';
const HALF_FORMULA = '$A = A_0\\left(\\frac{1}{2}\\right)^{t/h}$, where $A_0$ is the starting amount, $t$ is the time and $h$ is the half-life';
const pct = (r: number) => `${fmt(r)}%`;
const dec = (r: number) => fmt(r / 100, 6);

const SAVINGS = ['a GIC (guaranteed investment certificate)', 'a savings account', 'a term deposit', 'an investment account'];
const PERIODS: Array<{ k: number; word: string; per: string }> = [
  { k: 1, word: 'annually', per: 'year' },
  { k: 2, word: 'semi-annually', per: 'half-year' },
  { k: 4, word: 'quarterly', per: 'quarter' },
  { k: 12, word: 'monthly', per: 'month' },
];

function modelInterest(rng: Rng, periodic: boolean): GenOutput {
  const o = retry(
    () => {
      const P = rng.int(6, 80) * 250;
      const r = rng.pick([2.4, 2.5, 3, 3.2, 3.5, 3.75, 4, 4.25, 4.5, 4.8, 5, 5.5, 6]);
      const per = periodic ? rng.pick(PERIODS.slice(1)) : PERIODS[0];
      const t = rng.int(3, periodic ? 10 : 15);
      const i = r / 100 / per.k;
      const n = per.k * t;
      const A = P * (1 + i) ** n;
      return { P, r, per, t, i, n, A };
    },
    (o) => clear(o.A, 2) && clear(o.A - o.P, 2),
  );
  const { P, r, per, t, n, A } = o;
  const name = rng.pick(NAMES);
  const what = rng.pick(SAVINGS);
  const iTex = per.k === 1 ? dec(r) : `\\dfrac{${dec(r)}}{${per.k}}`;
  const factor = `(1 + ${iTex})^{${n}}`;
  return {
    prompt: `${name} invests ${money(P)} in ${what} that earns ${pct(r)} per year, compounded ${per.word}. ${INTEREST_FORMULA} ${periodic ? `What will the investment be worth after ${t} years, and how much interest will it have earned? Give your answers to the nearest cent.` : `What will the investment be worth after ${t} years? ${CENT}`}`,
    parts: periodic ? [moneyPart(A, 'Amount: \\$'), moneyPart(roundTo(A, 2) - P, 'Interest earned: \\$')] : [moneyPart(A, 'Amount: \\$')],
    calculator: true,
    hints: [
      per.k === 1 ? `Compounded annually: $i = ${dec(r)}$ and $n = ${t}$.` : `Compounded ${per.word}: there are ${per.k} periods per year, so $i = \\dfrac{${dec(r)}}{${per.k}}$ and $n = ${per.k} \\times ${t} = ${n}$.`,
      `$A = ${nx(P)}${factor}$${periodic ? '. The interest is $A - P$.' : ''}`,
    ],
    solution: [
      per.k === 1 ? `$P = ${nx(P)}$, $i = ${dec(r)}$, $n = ${t}$` : `$P = ${nx(P)}$, $i = \\dfrac{${dec(r)}}{${per.k}}$ per ${per.per}, $n = ${per.k} \\times ${t} = ${n}$ ${per.per}s`,
      `$A = ${nx(P)}${factor} = ${work(A, 4)}$`,
      `$A \\approx ${m2(A)}$`,
      ...(periodic ? [`Interest: $${m2(A)} - ${nx(P)} = ${m2(roundTo(A, 2) - P)}$`] : []),
      `After ${t} years the investment is worth ${money(roundTo(A, 2))}${periodic ? `, so it has earned ${money(roundTo(A, 2) - P)} in interest` : ''}.`,
    ],
  };
}

interface HalfCtx {
  text: (A0: number, h: number) => string;
  unit: string;
  tUnit: string;
  hs: number[];
  A0s: number[];
}
const HALF_CTXS: HalfCtx[] = [
  { text: (A0, h) => `A city hospital uses a radioactive tracer with a half-life of ${h} hours. A patient is given ${A0} mg of the tracer.`, unit: 'mg', tUnit: 'hours', hs: [6, 8, 12], A0s: [80, 96, 120, 160, 200, 240] },
  { text: (A0, h) => `Caffeine has a half-life of about ${h} hours in the body of a typical adult. Suppose a student drinks a coffee containing ${A0} mg of caffeine.`, unit: 'mg', tUnit: 'hours', hs: [5, 6], A0s: [80, 120, 160, 200, 240] },
  { text: (A0, h) => `A radioactive isotope used in medicine has a half-life of ${h} days. A lab receives a ${A0} g sample.`, unit: 'g', tUnit: 'days', hs: [8, 14, 30], A0s: [40, 64, 80, 100, 120] },
  { text: (A0, h) => `A medication has a half-life of ${h} hours. A patient takes a ${A0} mg dose.`, unit: 'mg', tUnit: 'hours', hs: [3, 4, 6], A0s: [200, 250, 400, 500, 800] },
];

function modelHalfLife(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(HALF_CTXS);
  const h = rng.pick(c.hs);
  const A0 = rng.pick(c.A0s);
  if (d === 1) {
    const k = rng.int(1, 4);
    const t = h * k;
    const A = A0 / 2 ** k;
    return {
      prompt: `${c.text(A0, h)} The amount remaining is ${HALF_FORMULA}. How much remains after ${t} ${c.tUnit}?`,
      parts: [numPart(A, { label: 'Amount', suffix: c.unit, display: 'decimal' })],
      calculator: true,
      hints: [`Find the number of half-lives first: $\\dfrac{t}{h} = \\dfrac{${t}}{${h}}$.`, 'Each half-life cuts the amount in half.'],
      solution: [
        `$\\dfrac{t}{h} = \\dfrac{${t}}{${h}} = ${k}$ half-li${k === 1 ? 'fe' : 'ves'}.`,
        `$A = ${A0}\\left(\\frac{1}{2}\\right)^{${k}} = ${A0} \\times ${fracTex(1 / 2 ** k)} = ${fmt(A)}$`,
        `After ${t} ${c.tUnit}, ${fmt(A)} ${c.unit} remains.`,
      ],
    };
  }
  if (d === 2) {
    const o = retry(() => {
      const t = rng.int(1, 5 * h);
      return { t, A: A0 * 0.5 ** (t / h) };
    }, (o) => o.t % h !== 0 && clear(o.A, 1));
    const { t, A } = o;
    const askPct = rng.chance(0.35);
    const P = 100 * 0.5 ** (t / h);
    if (askPct && clear(P, 1)) {
      return {
        prompt: `${c.text(A0, h)} The amount remaining is ${HALF_FORMULA}. What percent of the original amount remains after ${t} ${c.tUnit}? Give your answer ${roundingPhrase(1)}.`,
        parts: [numPart(P, { label: 'Percent remaining', suffix: '%', decimals: 1 })],
        calculator: true,
        hints: ['The percent remaining does not depend on the starting amount: it is $100\\left(\\frac{1}{2}\\right)^{t/h}$.', `$\\dfrac{t}{h} = \\dfrac{${t}}{${h}}$`],
        solution: [
          `$\\dfrac{A}{A_0} = \\left(\\frac{1}{2}\\right)^{${t}/${h}} = ${work(P / 100)}$`,
          `As a percent: $${work(P / 100)} \\times 100 ${approx(P, 1)}\\%$`,
          `About ${fmtFixed(P, 1)}% of the original amount remains after ${t} ${c.tUnit}.`,
        ],
      };
    }
    return {
      prompt: `${c.text(A0, h)} The amount remaining is ${HALF_FORMULA}. How much remains after ${t} ${c.tUnit}? Give your answer ${roundingPhrase(1)}.`,
      parts: [numPart(A, { label: 'Amount', suffix: c.unit, decimals: 1 })],
      calculator: true,
      hints: [`Substitute $A_0 = ${A0}$, $t = ${t}$ and $h = ${h}$.`, `The exponent $\\dfrac{${t}}{${h}}$ is not a whole number, so use a calculator: put the exponent in brackets.`],
      solution: [
        `$A = ${A0}\\left(\\frac{1}{2}\\right)^{${t}/${h}}$`,
        `$\\dfrac{${t}}{${h}} ${approx(t / h, 4)}$, so $A = ${A0} \\times ${work(0.5 ** (t / h))} = ${work(A)}$`,
        `About ${fmtFixed(A, 1)} ${c.unit} remains after ${t} ${c.tUnit}.`,
      ],
    };
  }
  // d3: time to reach a level
  const o = retry(() => {
    const target = roundTo(A0 * rng.float(0.04, 0.6, 2), 0);
    const t = (h * Math.log10(target / A0)) / Math.log10(0.5);
    return { target, t };
  }, (o) => o.target > 0 && clear(o.t, 1) && Math.abs(o.t / h - Math.round(o.t / h)) > 0.02);
  const { target, t } = o;
  return {
    prompt: `${c.text(A0, h)} The amount remaining is ${HALF_FORMULA}. How long will it take until only ${target} ${c.unit} remains? Give your answer ${roundingPhrase(1)} of ${c.tUnit === 'days' ? 'a day' : 'an hour'}.`,
    parts: [numPart(t, { label: 'Time', suffix: c.tUnit === 'days' ? 'days' : 'h', decimals: 1 })],
    calculator: true,
    hints: [`Substitute and isolate the power: $\\left(\\frac{1}{2}\\right)^{t/${h}} = \\dfrac{${target}}{${A0}}$.`, `Take the logarithm of both sides: $\\dfrac{t}{${h}}\\log 0.5 = \\log \\dfrac{${target}}{${A0}}$.`],
    solution: [
      `$${target} = ${A0}\\left(\\frac{1}{2}\\right)^{t/${h}}$`,
      `Divide by $${A0}$: $0.5^{t/${h}} = ${work(target / A0)}$`,
      `Take the logarithm of both sides: $\\dfrac{t}{${h}}\\log 0.5 = \\log ${work(target / A0)}$`,
      `$t = \\dfrac{${h}\\log ${work(target / A0)}}{\\log 0.5} = ${work(t)}$`,
      `It takes about ${fmtFixed(t, 1)} ${c.tUnit} for the amount to fall to ${target} ${c.unit}.`,
    ],
  };
}

interface GrowCtx {
  text: (P0: number, r: number) => string;
  what: string;
  rs: number[];
  P0: (rng: Rng) => number;
  tUnit: string;
}
const GROW_CTXS: GrowCtx[] = [
  { text: (P0, r) => `A town near a large city has a population of ${nx(P0).replace('{,}', ',')} and is growing at ${pct(r)} per year. Assume this rate continues, so the population after $t$ years is $P = P_0(1 + r)^t$, where $P_0$ is the starting population and $r$ is the growth rate as a decimal.`, what: 'the population', rs: [1.8, 2.2, 2.5, 2.8, 3.1, 3.5, 4.2], P0: (rng) => rng.int(40, 300) * 100, tUnit: 'years' },
  { text: (P0, r) => `A video game studio in Brookfield has ${nx(P0).replace('{,}', ',')} players for a new game, and the number of players is growing by ${pct(r)} per month. The number of players after $t$ months is modelled by $P = P_0(1 + r)^t$, where $P_0$ is the starting number and $r$ is the growth rate as a decimal.`, what: 'the number of players', rs: [6, 8, 9.5, 11, 12.5, 15], P0: (rng) => rng.int(20, 90) * 100, tUnit: 'months' },
  { text: (P0, r) => `A lake is stocked with ${nx(P0).replace('{,}', ',')} trout. Biologists expect the population to grow by ${pct(r)} per year, so the population after $t$ years is $P = P_0(1 + r)^t$, where $P_0$ is the starting population and $r$ is the growth rate as a decimal.`, what: 'the trout population', rs: [5, 6.5, 8, 9, 12], P0: (rng) => rng.int(8, 40) * 100, tUnit: 'years' },
];

function modelGrowth(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(GROW_CTXS);
  const r = rng.pick(c.rs);
  const P0 = c.P0(rng);
  const unit1 = c.tUnit.slice(0, -1);
  if (d === 1) {
    const o = retry(() => {
      const t = rng.int(3, 12);
      return { t, P: P0 * (1 + r / 100) ** t };
    }, (o) => clear(o.P, 0));
    const { t, P } = o;
    return {
      prompt: `${c.text(P0, r)} Estimate ${c.what} after ${t} ${c.tUnit}, ${roundingPhrase(0)}.`,
      parts: [numPart(P, { decimals: 0 })],
      calculator: true,
      hints: [`$P_0 = ${nx(P0)}$, $r = ${dec(r)}$ and $t = ${t}$.`, `$P = ${nx(P0)}(${fmt(1 + r / 100, 6)})^{${t}}$`],
      solution: [
        `$1 + r = 1 + ${dec(r)} = ${fmt(1 + r / 100, 6)}$`,
        `$P = ${nx(P0)}(${fmt(1 + r / 100, 6)})^{${t}} = ${work(P, 2)}$`,
        `After ${t} ${c.tUnit}, ${c.what} is about $${nx(Math.round(P))}$.`,
      ],
    };
  }
  // d3: time to reach a target
  const o = retry(() => {
    const mult = rng.pick([1.5, 2, 2, 2.5, 3]);
    const target = P0 * mult;
    const t = Math.log10(mult) / Math.log10(1 + r / 100);
    return { mult, target, t };
  }, (o) => clear(o.t, 1) && Number.isInteger(o.target));
  const { mult, target, t } = o;
  return {
    prompt: `${c.text(P0, r)} How long will it take for ${c.what} to reach ${nx(target).replace('{,}', ',')}${mult === 2 ? ' (double)' : ''}? Give your answer ${roundingPhrase(1)} of a ${unit1}.`,
    parts: [numPart(t, { label: 'Time', suffix: c.tUnit, decimals: 1 })],
    calculator: true,
    hints: [`Set up $${nx(target)} = ${nx(P0)}(${fmt(1 + r / 100, 6)})^t$ and divide both sides by $${nx(P0)}$.`, 'Take the logarithm of both sides and use the power law to bring $t$ down.'],
    solution: [
      `$${nx(target)} = ${nx(P0)}(${fmt(1 + r / 100, 6)})^t$`,
      `Divide by $${nx(P0)}$: $${fmt(1 + r / 100, 6)}^t = ${fmt(mult)}$`,
      `Take the logarithm of both sides: $t\\log ${fmt(1 + r / 100, 6)} = \\log ${fmt(mult)}$`,
      `$t = \\dfrac{\\log ${fmt(mult)}}{\\log ${fmt(1 + r / 100, 6)}} = ${work(t)}$`,
      `It will take about ${fmtFixed(t, 1)} ${c.tUnit}.`,
    ],
  };
}

function modelDepreciation(rng: Rng, d: Difficulty): GenOutput {
  const o = retry(() => {
    const V0 = rng.int(36, 140) * 250;
    const r = rng.pick([12, 14, 15, 16, 18, 20, 22, 25]);
    const t = rng.int(2, 8);
    return { V0, r, t, V: V0 * (1 - r / 100) ** t };
  }, (o) => clear(o.V, 2));
  const { V0, r, t, V } = o;
  const name = rng.pick(NAMES);
  const item = rng.pick(['a used car', 'a new snowmobile', 'a pickup truck', 'a used camper trailer', 'a new quad', 'a delivery van for a bakery']);
  const lost = d >= 2;
  const Vr = roundTo(V, 2);
  return {
    prompt: `${name} buys ${item} for ${money(V0)}. Its value decreases by ${pct(r)} each year, so its value after $t$ years is $V = V_0(1 - r)^t$, where $V_0$ is the purchase price and $r$ is the rate of depreciation as a decimal. ${lost ? `What will it be worth after ${t} years, and how much value will it have lost? Give your answers to the nearest cent.` : `What will it be worth after ${t} years? ${CENT}`}`,
    parts: lost ? [moneyPart(V, 'Value: \\$'), moneyPart(roundTo(V0 - Vr, 2), 'Value lost: \\$')] : [moneyPart(V, 'Value: \\$')],
    calculator: true,
    hints: [`$1 - r = 1 - ${dec(r)} = ${fmt(1 - r / 100, 6)}$: each year the value keeps $${100 - r}\\%$.`, `$V = ${nx(V0)}(${fmt(1 - r / 100, 6)})^{${t}}$${lost ? '. The value lost is the purchase price minus the value.' : ''}`],
    solution: [
      `$1 - r = ${fmt(1 - r / 100, 6)}$`,
      `$V = ${nx(V0)}(${fmt(1 - r / 100, 6)})^{${t}} ${approx(V, 4)}$, about ${money(Vr)}.`,
      ...(lost ? [`Value lost: $${nx(V0)} - ${m2(Vr)} = ${m2(V0 - Vr)}$`] : []),
      `After ${t} years it is worth about ${money(Vr)}${lost ? `, so it has lost ${money(roundTo(V0 - Vr, 2))} in value` : ''}.`,
    ],
  };
}

interface RegCtx {
  text: (eq: string) => string;
  a: (rng: Rng) => number;
  b: number[];
  start: number;
  span: number;
  what: string;
  unit: string;
  dec: number;
}
const REG_CTXS: RegCtx[] = [
  { text: (eq) => `A student researched the number of public electric-vehicle charging ports in a province from 2016 to 2024. Exponential regression on the data gives $${eq}$, where $x$ is the number of years since 2016 and $y$ is the number of ports.`, a: (rng) => rng.int(150, 450), b: [1.22, 1.26, 1.31, 1.35, 1.38], start: 2016, span: 8, what: 'the number of charging ports', unit: 'ports', dec: 0 },
  { text: (eq) => `A craft brewery tracked its online followers from 2018 to 2025. Exponential regression gives $${eq}$, where $x$ is the number of years since 2018 and $y$ is the number of followers.`, a: (rng) => rng.int(400, 1200), b: [1.28, 1.34, 1.41, 1.45, 1.52], start: 2018, span: 7, what: 'the number of followers', unit: 'followers', dec: 0 },
  { text: (eq) => `A biologist counted the fish in a pond restocking project every year from 2015 to 2023. Exponential regression gives $${eq}$, where $x$ is the number of years since 2015 and $y$ is the number of fish.`, a: (rng) => rng.int(120, 300), b: [1.12, 1.15, 1.18, 1.21], start: 2015, span: 8, what: 'the number of fish', unit: 'fish', dec: 0 },
  { text: (eq) => `A collector recorded the price of a rare hockey card from 2012 to 2024. Exponential regression gives $${eq}$, where $x$ is the number of years since 2012 and $y$ is the price in dollars.`, a: (rng) => rng.int(40, 160), b: [1.09, 1.11, 1.14, 1.17], start: 2012, span: 12, what: 'the price of the card', unit: 'dollars', dec: 0 },
  { text: (eq) => `A researcher measured the mass of mould growing on bread, in milligrams, every day for 8 days. Exponential regression gives $${eq}$, where $x$ is the number of days and $y$ is the mass in milligrams.`, a: (rng) => rng.float(1.5, 6, 2), b: [1.48, 1.55, 1.62, 1.7], start: 0, span: 8, what: 'the mass of the mould', unit: 'mg', dec: 1 },
];

function modelRegression(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(REG_CTXS);
  const a = c.a(rng);
  const b = rng.pick(c.b);
  const eq = `y = ${fmtGroupTex(a, 2)}(${fmt(b)})^{x}`;
  const when = (x: number) => (c.start ? `in ${c.start + x}` : `on day ${x}`);
  if (d === 2) {
    const o = retry(() => {
      const x = rng.int(1, c.span - 1);
      return { x, y: a * b ** x };
    }, (o) => clear(o.y, c.dec));
    const { x, y } = o;
    return {
      prompt: `${c.text(eq)} Use the equation to interpolate ${c.what} ${when(x)}. Give your answer ${roundingPhrase(c.dec)}.`,
      parts: [numPart(y, { decimals: c.dec, suffix: c.unit === 'dollars' ? undefined : c.unit, label: c.unit === 'dollars' ? 'Price: \\$' : undefined })],
      calculator: true,
      hints: [`${cap(when(x))} means $x = ${x}$${c.start ? ` ($${c.start + x} - ${c.start}$)` : ''}.`, `Substitute into the regression equation: $y = ${fmtGroupTex(a, 2)}(${fmt(b)})^{${x}}$.`],
      solution: [
        `$x = ${x}$`,
        `$y = ${fmtGroupTex(a, 2)}(${fmt(b)})^{${x}} = ${work(y, 3)}$`,
        `${x} is inside the range of the data, so this is interpolation. ${cap(c.what)} ${when(x)} was about ${c.unit === 'dollars' ? money(roundTo(y, 0)) : `$${fx(y, c.dec)}$ ${c.unit}`}.`,
      ],
    };
  }
  // d3: extrapolate (value) or solve for x
  if (rng.chance(0.5)) {
    const o = retry(() => {
      const x = c.span + rng.int(2, 5);
      return { x, y: a * b ** x };
    }, (o) => clear(o.y, c.dec));
    const { x, y } = o;
    return {
      prompt: `${c.text(eq)} Use the equation to extrapolate ${c.what} ${when(x)}, ${roundingPhrase(c.dec)}. Then decide how reliable this prediction is.`,
      parts: [
        numPart(y, { decimals: c.dec, suffix: c.unit === 'dollars' ? undefined : c.unit, label: c.unit === 'dollars' ? 'Prediction: \\$' : 'Prediction' }),
        {
          label: 'Reliability',
          answer: fixedChoice([
            'Less reliable: it extrapolates beyond the data, and the growth rate may not continue',
            'Very reliable: an exponential model always continues the same way',
            'Very reliable: it lies inside the data range',
          ], 0),
        },
      ],
      calculator: true,
      hints: [`$x = ${x}$${c.start ? ` ($${c.start + x} - ${c.start}$)` : ''}, which is beyond the last data value $x = ${c.span}$.`, `$y = ${fmtGroupTex(a, 2)}(${fmt(b)})^{${x}}$`],
      solution: [
        `$x = ${x}$`,
        `$y = ${fmtGroupTex(a, 2)}(${fmt(b)})^{${x}} = ${work(y, 3)}$, about ${c.unit === 'dollars' ? money(roundTo(y, 0)) : `$${fx(y, c.dec)}$ ${c.unit}`}.`,
        `$x = ${x}$ is outside the data (which ends at $x = ${c.span}$), so this is extrapolation. Real growth often slows, so the prediction is less reliable the further it is from the data.`,
      ],
    };
  }
  const o = retry(() => {
    const target = roundTo(a * b ** (c.span + rng.float(0.6, 4, 2)), c.dec === 0 ? -1 : 0);
    const x = Math.log10(target / a) / Math.log10(b);
    return { target, x };
  }, (o) => clear(o.x, 1) && o.x > c.span);
  const { target, x } = o;
  return {
    prompt: `${c.text(eq)} According to the model, when will ${c.what} reach ${nx(target).replace('{,}', ',')}${c.unit === 'dollars' ? ' dollars' : ''}? Give the value of $x$ ${roundingPhrase(1)}.`,
    parts: [numPart(x, { label: '$x \\approx$', decimals: 1 })],
    calculator: true,
    hints: [`Set $${nx(target)} = ${fmtGroupTex(a, 2)}(${fmt(b)})^{x}$ and divide by $${fmtGroupTex(a, 2)}$.`, 'Take the logarithm of both sides and solve for $x$.'],
    solution: [
      `$${nx(target)} = ${fmtGroupTex(a, 2)}(${fmt(b)})^{x}$`,
      `$${fmt(b)}^{x} = \\dfrac{${nx(target)}}{${fmtGroupTex(a, 2)}} = ${work(target / a)}$`,
      `$x = \\dfrac{\\log ${work(target / a)}}{\\log ${fmt(b)}} = ${work(x)}$`,
      `$x \\approx ${fmtFixed(x, 1)}$, which is ${c.start ? `during ${c.start + Math.floor(x)}` : `during day ${Math.floor(x) + 1}`}. This is an extrapolation, so it assumes the growth continues.`,
    ],
  };
}

function modelPresentValue(rng: Rng): GenOutput {
  const o = retry(() => {
    const A = rng.int(8, 60) * 500;
    const r = rng.pick([2.5, 3, 3.5, 4, 4.5, 5, 5.5]);
    const per = rng.pick(PERIODS);
    const t = rng.int(3, 10);
    const P = A / (1 + r / 100 / per.k) ** (per.k * t);
    return { A, r, per, t, P };
  }, (o) => clear(o.P, 2));
  const { A, r, per, t, P } = o;
  const name = rng.pick(NAMES);
  const goal = rng.pick(['a down payment on a condo', 'college tuition', 'a used truck', 'a trip to Japan', 'starting a landscaping business']);
  const n = per.k * t;
  const iTex = per.k === 1 ? dec(r) : `\\dfrac{${dec(r)}}{${per.k}}`;
  return {
    prompt: `${name} wants to have ${money(A)} in ${t} years for ${goal}. An account pays ${pct(r)} per year, compounded ${per.word}. ${INTEREST_FORMULA} How much must ${name} invest now? ${CENT}`,
    parts: [moneyPart(P, 'Invest now: \\$')],
    calculator: true,
    hints: [`This time $A = ${nx(A)}$ is known and $P$ is unknown. ${per.k === 1 ? `$i = ${dec(r)}$, $n = ${t}$.` : `$i = \\dfrac{${dec(r)}}{${per.k}}$, $n = ${per.k} \\times ${t} = ${n}$.`}`, `Rearrange: $P = \\dfrac{A}{(1 + i)^n}$.`],
    solution: [
      `$${nx(A)} = P(1 + ${iTex})^{${n}}$`,
      `Divide both sides by $(1 + ${iTex})^{${n}}$: $P = \\dfrac{${nx(A)}}{(1 + ${iTex})^{${n}}}$`,
      `$(1 + ${iTex})^{${n}} = ${work((1 + r / 100 / per.k) ** n, 6)}$, so $P = ${work(P)}$`,
      `${name} must invest about ${money(roundTo(P, 2))} now.`,
    ],
  };
}

function modelRate(rng: Rng): GenOutput {
  const o = retry(() => {
    const P0 = rng.int(20, 120) * 100;
    const t = rng.int(4, 12);
    const r = rng.float(1.2, 9, 2);
    const P = Math.round(P0 * (1 + r / 100) ** t);
    const rr = ((P / P0) ** (1 / t) - 1) * 100;
    return { P0, t, P, rr };
  }, (o) => clear(o.rr, 1));
  const { P0, t, P, rr } = o;
  const place = rng.pick(['A town in the north', 'A suburb of a large city', 'A First Nations community beside a northern lake', 'A town in a farming region']);
  return {
    prompt: `${place} grew from ${nx(P0).replace('{,}', ',')} people to ${nx(P).replace('{,}', ',')} people in ${t} years. Assume the growth was exponential, following $P = P_0(1 + r)^t$, where $r$ is the annual growth rate as a decimal. What was the annual growth rate, as a percent ${roundingPhrase(1)}?`,
    parts: [numPart(rr, { label: 'Growth rate', suffix: '%', decimals: 1 })],
    calculator: true,
    hints: [`Substitute: $${nx(P)} = ${nx(P0)}(1 + r)^{${t}}$. Divide both sides by $${nx(P0)}$.`, `Undo the power by taking the ${t}th root (raise both sides to the power $\\frac{1}{${t}}$), then subtract $1$.`],
    solution: [
      `$${nx(P)} = ${nx(P0)}(1 + r)^{${t}}$`,
      `$(1 + r)^{${t}} = \\dfrac{${nx(P)}}{${nx(P0)}} = ${work(P / P0, 5)}$`,
      `$1 + r = (${work(P / P0, 5)})^{1/${t}} = ${work(1 + rr / 100, 5)}$`,
      `$r = ${work(rr / 100, 5)}$, which is about ${fmtFixed(rr, 1)}% per year.`,
    ],
  };
}

const expModel = skill({
  id: 'm302-exp-model',
  name: 'Exponential models',
  description: 'Solve problems about compound interest, population growth, depreciation, half-life and given exponential regression equations, including finding the time with logarithms.',
  outcomes: ['RF6'],
  lessonId: 'm302-6-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick(['interest', 'half', 'growth', 'deprec'] as const);
      return k === 'interest' ? modelInterest(rng, false) : k === 'half' ? modelHalfLife(rng, 1) : k === 'growth' ? modelGrowth(rng, 1) : modelDepreciation(rng, 1);
    }
    if (d === 2) {
      const k = rng.pick(['interest', 'half', 'regression', 'deprec'] as const);
      return k === 'interest' ? modelInterest(rng, true) : k === 'half' ? modelHalfLife(rng, 2) : k === 'regression' ? modelRegression(rng, 2) : modelDepreciation(rng, 2);
    }
    const k = rng.pick(['half', 'growth', 'regression', 'present', 'rate'] as const);
    if (k === 'half') return modelHalfLife(rng, 3);
    if (k === 'growth') return modelGrowth(rng, 3);
    if (k === 'regression') return modelRegression(rng, 3);
    if (k === 'present') return modelPresentValue(rng);
    return modelRate(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.4 — Logarithmic scales and models: m302-log-model
// ---------------------------------------------------------------------------

const RICHTER = 'On the Richter scale, each increase of $1$ in magnitude means the earthquake is $10$ times as intense, so $\\dfrac{I_1}{I_2} = 10^{M_1 - M_2}$.';
const PH = 'The pH of a solution is $\\text{pH} = -\\log[\\text{H}^+]$, where $[\\text{H}^+]$ is the hydrogen ion concentration in moles per litre.';
const DB = 'The sound level in decibels is $\\beta = 10\\log \\dfrac{I}{I_0}$, where $I$ is the intensity of the sound and $I_0$ is the intensity of the quietest sound a person can hear.';

const QUAKE_PLACES = ['in Alaska', 'in northern British Columbia', 'off the coast of Vancouver Island', 'in Indonesia', 'in the Yukon', 'near Fort St. John', 'off Haida Gwaii', 'in Chile', 'in Japan', 'in New Zealand'];

function sci(a: number, k: number): string {
  return a === 1 ? `10^{${k}}` : `${fmt(a)} \\times 10^{${k}}`;
}

function richter(rng: Rng, d: Difficulty): GenOutput {
  const [p1, p2] = rng.sample(QUAKE_PLACES, 2);
  if (d === 1) {
    const M2 = rng.int(2, 5);
    const k = rng.int(1, 3);
    const M1 = M2 + k;
    return {
      prompt: `An earthquake ${p1} has magnitude ${M1}. An earthquake ${p2} has magnitude ${M2}. ${RICHTER} How many times as intense is the first earthquake as the second?`,
      parts: [numPart(10 ** k, { suffix: 'times' })],
      hints: [`The difference in magnitude is $${M1} - ${M2} = ${k}$.`, `Each step of $1$ multiplies the intensity by $10$, so use $10^{${k}}$.`],
      solution: [`$\\dfrac{I_1}{I_2} = 10^{${M1} - ${M2}} = 10^{${k}} = ${nx(10 ** k)}$`, `The first earthquake is ${nx(10 ** k).replace('{,}', ',')} times as intense as the second.`],
    };
  }
  if (d === 2) {
    const o = retry(() => {
      const M2 = rng.float(2.5, 5.5, 1);
      const M1 = roundTo(M2 + rng.float(0.3, 2.6, 1), 1);
      const R = 10 ** (M1 - M2);
      const dp = R >= 10 ? 0 : 1;
      return { M1, M2, R, dp };
    }, (o) => clear(o.R, o.dp) && Math.abs(roundTo(o.M1 - o.M2, 1) - Math.round(o.M1 - o.M2)) > 0.05);
    const { M1, M2, R, dp } = o;
    const diff = roundTo(M1 - M2, 1);
    return {
      prompt: `An earthquake ${p1} measures ${fmt(M1)} on the Richter scale. An earthquake ${p2} measures ${fmt(M2)}. ${RICHTER} How many times as intense is the first earthquake as the second? Give your answer ${roundingPhrase(dp)}.`,
      parts: [numPart(R, { suffix: 'times', decimals: dp })],
      calculator: true,
      hints: [`Subtract the magnitudes: $${fmt(M1)} - ${fmt(M2)} = ${fmt(diff)}$.`, `Evaluate $10^{${fmt(diff)}}$ with a calculator.`],
      solution: [
        `$\\dfrac{I_1}{I_2} = 10^{${fmt(M1)} - ${fmt(M2)}} = 10^{${fmt(diff)}}$`,
        `$10^{${fmt(diff)}} = ${work(R, 3)}$`,
        `The first earthquake is about $${fx(R, dp)}$ times as intense as the second. (A difference of ${fmt(diff)} is not "${fmt(diff)} times": the scale is logarithmic.)`,
      ],
    };
  }
  const o = retry(() => {
    const M2 = rng.float(2.8, 5.8, 1);
    const R = rng.pick([3, 5, 8, 15, 20, 25, 40, 50, 60, 80, 150, 200, 250, 400, 500, 750]);
    const M1 = M2 + Math.log10(R);
    return { M2, R, M1 };
  }, (o) => clear(o.M1, 1));
  const { M2, R, M1 } = o;
  return {
    prompt: `An earthquake ${p1} measured ${fmt(M2)} on the Richter scale. A later earthquake ${p2} was ${R} times as intense. ${RICHTER} What was the magnitude of the later earthquake, ${roundingPhrase(1)}?`,
    parts: [numPart(M1, { label: 'Magnitude', decimals: 1 })],
    calculator: true,
    hints: [`Set up $${R} = 10^{M_1 - ${fmt(M2)}}$.`, `Take the logarithm of both sides: $M_1 - ${fmt(M2)} = \\log ${R}$.`],
    solution: [
      `$${R} = 10^{M_1 - ${fmt(M2)}}$`,
      `Take the common logarithm of both sides: $\\log ${R} = M_1 - ${fmt(M2)}$`,
      `$M_1 = ${fmt(M2)} + \\log ${R} = ${fmt(M2)} + ${work(Math.log10(R))} = ${work(M1)}$`,
      `The later earthquake had a magnitude of about ${fmtFixed(M1, 1)}. Being ${R} times as intense only adds about ${fmtFixed(Math.log10(R), 1)} to the magnitude.`,
    ],
  };
}

const PH_THINGS = ['a sample of lake water', 'a cup of black coffee', 'a glass of orange juice', 'a sample of rainwater', 'a cleaning solution', 'a sample of soil water from a farm', 'a soft drink', 'a sample of milk'];

function phItem(rng: Rng, d: Difficulty): GenOutput {
  const thing = rng.pick(PH_THINGS);
  if (d === 1) {
    if (rng.chance(0.5)) {
      const k = rng.int(2, 11);
      return {
        prompt: `The hydrogen ion concentration of ${thing} is $[\\text{H}^+] = 10^{-${k}}$ mol/L. ${PH} What is its pH?`,
        parts: [numPart(k, { label: 'pH' })],
        hints: ['Substitute into $\\text{pH} = -\\log[\\text{H}^+]$.', `$\\log 10^{-${k}} = -${k}$, because a logarithm is an exponent.`],
        solution: [`$\\text{pH} = -\\log 10^{-${k}} = -(-${k}) = ${k}$`, `The pH is $${k}$.`],
      };
    }
    const p2 = rng.int(3, 9);
    const k = rng.int(1, 3);
    const p1 = p2 - k;
    const [n1, n2] = rng.sample(['Solution A', 'Solution B'], 2);
    return {
      prompt: `${n1} has a pH of ${p1} and ${n2} has a pH of ${p2}. ${PH} So $[\\text{H}^+] = 10^{-\\text{pH}}$. How many times as great is the hydrogen ion concentration of ${n1} as that of ${n2}? (In other words, how many times as acidic is it?)`,
      parts: [numPart(10 ** k, { suffix: 'times' })],
      hints: [`Write each concentration as a power of 10: $10^{-${p1}}$ and $10^{-${p2}}$.`, 'Divide them: subtract the exponents.'],
      solution: [
        `$\\dfrac{10^{-${p1}}}{10^{-${p2}}} = 10^{-${p1} - (-${p2})} = 10^{${k}} = ${nx(10 ** k)}$`,
        `A lower pH means more acidic. ${n1} is ${nx(10 ** k).replace('{,}', ',')} times as acidic as ${n2}.`,
      ],
    };
  }
  if (d === 2) {
    const o = retry(() => {
      const a = rng.float(1.1, 9.8, 1);
      const k = rng.int(2, 10);
      return { a, k, pH: -Math.log10(a * 10 ** -k) };
    }, (o) => clear(o.pH, 2) && o.a !== 1);
    const { a, k, pH } = o;
    return {
      prompt: `The hydrogen ion concentration of ${thing} is $[\\text{H}^+] = ${sci(a, -k)}$ mol/L. ${PH} What is its pH, ${roundingPhrase(2)}?`,
      parts: [numPart(pH, { label: 'pH', decimals: 2 })],
      calculator: true,
      hints: ['Substitute into $\\text{pH} = -\\log[\\text{H}^+]$.', `On a calculator enter $-\\log(${fmt(a)} \\times 10^{-${k}})$ (use brackets).`],
      solution: [
        `$\\text{pH} = -\\log(${sci(a, -k)})$`,
        `$\\log(${sci(a, -k)}) = ${work(-pH)}$, so $\\text{pH} = ${work(pH)}$.`,
        `The pH is about ${fmtFixed(pH, 2)}. ${pH < 7 ? 'It is less than 7, so the solution is acidic.' : pH > 7 ? 'It is greater than 7, so the solution is basic.' : ''}`,
      ],
    };
  }
  const o = retry(() => {
    const p0 = rng.float(4.5, 8.5, 1);
    const R = rng.pick([4, 5, 8, 12, 20, 25, 40, 50, 60, 80, 150, 200, 300]);
    const p1 = p0 - Math.log10(R);
    return { p0, R, p1 };
  }, (o) => clear(o.p1, 2) && o.p1 > 1);
  const { p0, R, p1 } = o;
  return {
    prompt: `A sample of ${rng.pick(['pond water', 'well water from a farm', 'water from a mountain creek', 'rainwater'])} has a pH of ${fmt(p0)}. After heavy acid rain, the water is ${R} times as acidic (its hydrogen ion concentration is ${R} times as great). ${PH} What is the new pH, ${roundingPhrase(2)}?`,
    parts: [numPart(p1, { label: 'pH', decimals: 2 })],
    calculator: true,
    hints: [`The new concentration is $${R} \\times 10^{-${fmt(p0)}}$.`, `Use the product law: $-\\log(${R} \\times 10^{-${fmt(p0)}}) = -\\log ${R} + ${fmt(p0)}$.`],
    solution: [
      `Original: $[\\text{H}^+] = 10^{-${fmt(p0)}}$. New: $[\\text{H}^+] = ${R} \\times 10^{-${fmt(p0)}}$.`,
      `$\\text{pH} = -\\log(${R} \\times 10^{-${fmt(p0)}}) = -(\\log ${R} - ${fmt(p0)}) = ${fmt(p0)} - \\log ${R}$`,
      `$= ${fmt(p0)} - ${work(Math.log10(R))} = ${work(p1)}$`,
      `The new pH is about ${fmtFixed(p1, 2)}. More acidic means a lower pH.`,
    ],
  };
}

const SOUNDS = ['a busy street downtown', 'a lawnmower', 'a hockey crowd at a playoff game', 'a vacuum cleaner', 'a rock concert', 'a quiet library', 'a snowblower', 'a chainsaw', 'normal conversation', 'a jet taking off at an airport'];

function dbItem(rng: Rng, d: Difficulty): GenOutput {
  const [s1, s2] = rng.sample(SOUNDS, 2);
  if (d === 1) {
    if (rng.chance(0.5)) {
      const k = rng.int(3, 12);
      return {
        prompt: `The sound of ${s1} has an intensity of $10^{${k}}$ times $I_0$, so $\\dfrac{I}{I_0} = 10^{${k}}$. ${DB} What is its sound level?`,
        parts: [numPart(10 * k, { label: 'Sound level', suffix: 'dB' })],
        hints: [`Substitute: $\\beta = 10\\log 10^{${k}}$.`, `$\\log 10^{${k}} = ${k}$.`],
        solution: [`$\\beta = 10\\log 10^{${k}} = 10 \\times ${k} = ${10 * k}$`, `The sound level is ${10 * k} dB.`],
      };
    }
    const b2 = rng.int(4, 8) * 10;
    const k = rng.int(1, 3);
    const b1 = b2 + 10 * k;
    return {
      prompt: `The sound of ${s1} is ${b1} dB and the sound of ${s2} is ${b2} dB. ${DB} It follows that $\\dfrac{I_1}{I_2} = 10^{(\\beta_1 - \\beta_2)/10}$. How many times as intense is the first sound as the second?`,
      parts: [numPart(10 ** k, { suffix: 'times' })],
      hints: [`The difference is $${b1} - ${b2} = ${10 * k}$ dB.`, `Every $10$ dB means $10$ times the intensity: $10^{${10 * k}/10} = 10^{${k}}$.`],
      solution: [`$\\dfrac{I_1}{I_2} = 10^{(${b1} - ${b2})/10} = 10^{${k}} = ${nx(10 ** k)}$`, `The first sound is ${nx(10 ** k).replace('{,}', ',')} times as intense as the second.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const o = retry(() => {
        const a = rng.float(1.2, 9.6, 1);
        const k = rng.int(3, 11);
        return { a, k, B: 10 * Math.log10(a * 10 ** k) };
      }, (o) => clear(o.B, 1));
      const { a, k, B } = o;
      return {
        prompt: `The sound of ${s1} has an intensity of ${`$${sci(a, k)}$`} times $I_0$. ${DB} What is its sound level, ${roundingPhrase(1)}?`,
        parts: [numPart(B, { label: 'Sound level', suffix: 'dB', decimals: 1 })],
        calculator: true,
        hints: [`$\\dfrac{I}{I_0} = ${sci(a, k)}$`, `$\\beta = 10\\log(${sci(a, k)})$`],
        solution: [`$\\beta = 10\\log(${sci(a, k)})$`, `$\\log(${sci(a, k)}) = ${work(B / 10)}$`, `$\\beta = 10 \\times ${work(B / 10)} ${approx(B, 1)}$ dB`, `The sound level is about ${fmtFixed(B, 1)} dB.`],
      };
    }
    const o = retry(() => {
      const b2 = rng.int(40, 85);
      const b1 = b2 + rng.int(3, 28);
      const R = 10 ** ((b1 - b2) / 10);
      const dp = R >= 10 ? 0 : 1;
      return { b1, b2, R, dp };
    }, (o) => clear(o.R, o.dp) && (o.b1 - o.b2) % 10 !== 0);
    const { b1, b2, R, dp } = o;
    return {
      prompt: `The sound of ${s1} is ${b1} dB and the sound of ${s2} is ${b2} dB. ${DB} It follows that $\\dfrac{I_1}{I_2} = 10^{(\\beta_1 - \\beta_2)/10}$. How many times as intense is the first sound as the second? Give your answer ${roundingPhrase(dp)}.`,
      parts: [numPart(R, { suffix: 'times', decimals: dp })],
      calculator: true,
      hints: [`$\\beta_1 - \\beta_2 = ${b1 - b2}$`, `Evaluate $10^{${b1 - b2}/10} = 10^{${fmt((b1 - b2) / 10)}}$.`],
      solution: [`$\\dfrac{I_1}{I_2} = 10^{(${b1} - ${b2})/10} = 10^{${fmt((b1 - b2) / 10)}} = ${work(R, 3)}$`, `The first sound is about $${fx(R, dp)}$ times as intense as the second.`],
    };
  }
  const o = retry(() => {
    const b0 = rng.int(45, 90);
    const R = rng.pick([2, 3, 4, 5, 6, 8, 15, 20, 25, 40, 50, 200, 500]);
    const b1 = b0 + 10 * Math.log10(R);
    return { b0, R, b1 };
  }, (o) => clear(o.b1, 1));
  const { b0, R, b1 } = o;
  const ctx = rng.pick([
    `One person's leaf blower makes a sound of ${b0} dB. A landscaping crew runs ${R} identical leaf blowers at once, so the total intensity is ${R} times as great.`,
    `One speaker at a school dance produces ${b0} dB. The DJ sets up ${R} identical speakers, so the total intensity is ${R} times as great.`,
    `The sound of ${s1} is ${b0} dB. A second sound is ${R} times as intense.`,
  ]);
  return {
    prompt: `${ctx} ${DB} What is the sound level of the louder sound, ${roundingPhrase(1)}?`,
    parts: [numPart(b1, { label: 'Sound level', suffix: 'dB', decimals: 1 })],
    calculator: true,
    hints: [`If the first sound has intensity $I$, the louder one has intensity $${R}I$. The new level is $10\\log\\dfrac{${R}I}{I_0}$.`, `Product law: $10\\log\\dfrac{${R}I}{I_0} = 10\\log ${R} + 10\\log\\dfrac{I}{I_0} = 10\\log ${R} + ${b0}$.`],
    solution: [
      `$\\beta_{\\text{new}} = 10\\log\\dfrac{${R}I}{I_0} = 10\\log ${R} + 10\\log\\dfrac{I}{I_0}$`,
      `$= 10\\log ${R} + ${b0} = 10(${work(Math.log10(R))}) + ${b0} = ${work(b1)}$`,
      `The louder sound is about ${fmtFixed(b1, 1)} dB. ${R} times the intensity adds only about ${fmtFixed(10 * Math.log10(R), 1)} dB.`,
    ],
  };
}

interface LnCtx {
  text: (eq: string) => string;
  a: [number, number];
  b: [number, number];
  x: [number, number];
  xFar: [number, number];
  xWord: (x: number) => string;
  yWhat: string;
  unit: string;
}
const LN_CTXS: LnCtx[] = [
  {
    text: (eq) => `A bakery tracks how many pastries a new employee can decorate per hour after $x$ days of training (data for days 1 to 20). Logarithmic regression gives $${eq}$.`,
    a: [8, 14], b: [5, 9], x: [2, 19], xFar: [30, 60], xWord: (x) => `after ${x} days of training`, yWhat: 'the number of pastries per hour', unit: 'pastries per hour',
  },
  {
    text: (eq) => `An ecology class counts the number of plant species found in sample areas of a grassland, from $1$ to $100$ square metres. Logarithmic regression gives $${eq}$, where $x$ is the area in square metres and $y$ is the number of species.`,
    a: [3, 7], b: [3, 6], x: [5, 95], xFar: [200, 500], xWord: (x) => `in an area of ${x} square metres`, yWhat: 'the number of species', unit: 'species',
  },
  {
    text: (eq) => `A board game designer tracks total sales of a new game for its first 24 months. Logarithmic regression gives $${eq}$, where $x$ is the number of months since release and $y$ is total sales in thousands of games.`,
    a: [2, 6], b: [3, 7], x: [2, 23], xFar: [36, 72], xWord: (x) => `${x} months after release`, yWhat: 'total sales', unit: 'thousand games',
  },
];

function lnItem(rng: Rng, d: Difficulty): GenOutput {
  const c = rng.pick(LN_CTXS);
  const a = rng.float(c.a[0], c.a[1], 2);
  const b = rng.float(c.b[0], c.b[1], 2);
  const eq = `y = ${fmt(a)} + ${fmt(b)}\\ln x`;
  const f = (x: number) => a + b * Math.log(x);
  if (d === 2) {
    const x = retry(() => rng.int(c.x[0], c.x[1]), (x) => clear(f(x), 1));
    const y = f(x);
    return {
      prompt: `${c.text(eq)} Use the equation to estimate ${c.yWhat} ${c.xWord(x)}, ${roundingPhrase(1)}. ($\\ln$ is the natural logarithm key on your calculator.)`,
      parts: [numPart(y, { decimals: 1, suffix: c.unit })],
      calculator: true,
      hints: [`Substitute $x = ${x}$.`, `$y = ${fmt(a)} + ${fmt(b)}\\ln ${x}$: find $\\ln ${x}$ first, then multiply and add.`],
      solution: [`$y = ${fmt(a)} + ${fmt(b)}\\ln ${x}$`, `$\\ln ${x} = ${work(Math.log(x))}$`, `$y = ${fmt(a)} + ${fmt(b)}(${work(Math.log(x))}) = ${work(y)}$`, `${cap(c.yWhat)} ${c.xWord(x)} is about ${fmtFixed(y, 1)} ${c.unit}. This is interpolation: $x = ${x}$ is inside the data.`],
    };
  }
  const o = retry(() => {
    const x1 = rng.int(c.x[0], c.x[1]);
    const x2 = rng.int(c.xFar[0], c.xFar[1]);
    return { x1, x2, diff: f(x2) - f(x1) };
  }, (o) => clear(o.diff, 1) && clear(f(o.x2), 1));
  const { x1, x2, diff } = o;
  return {
    prompt: `${c.text(eq)} Use the model to extrapolate ${c.yWhat} ${c.xWord(x2)}, and find how much greater it is than ${c.xWord(x1)}. Give both answers ${roundingPhrase(1)}.`,
    parts: [numPart(f(x2), { label: `${cap(c.xWord(x2))}`, decimals: 1, suffix: c.unit }), numPart(diff, { label: 'Increase', decimals: 1, suffix: c.unit })],
    calculator: true,
    hints: [`Evaluate the model at $x = ${x2}$ and at $x = ${x1}$.`, 'Subtract to find the increase. Notice how slowly a logarithmic model grows.'],
    solution: [
      `$y(${x2}) = ${fmt(a)} + ${fmt(b)}\\ln ${x2} = ${work(f(x2))}$`,
      `$y(${x1}) = ${fmt(a)} + ${fmt(b)}\\ln ${x1} = ${work(f(x1))}$`,
      `Increase: $${work(f(x2))} - ${work(f(x1))} = ${work(diff)}$`,
      `${cap(c.xWord(x2))} the model gives about ${fmtFixed(f(x2), 1)} ${c.unit}, about ${fmtFixed(diff, 1)} more than ${c.xWord(x1)}. The value at $x = ${x2}$ is an extrapolation, so treat it with caution.`,
    ],
  };
}

const logModel = skill({
  id: 'm302-log-model',
  name: 'Logarithmic scales and models',
  description: 'Use logarithmic scales (pH, decibels and earthquake magnitude) to compare quantities, and use given logarithmic regression equations to interpolate and extrapolate.',
  outcomes: ['RF6'],
  lessonId: 'm302-6-4',
  calculator: true,
  gen(rng, d) {
    const k = d === 1 ? rng.pick(['richter', 'ph', 'db'] as const) : rng.pick(['richter', 'ph', 'db', 'ln'] as const);
    if (k === 'richter') return richter(rng, d);
    if (k === 'ph') return phItem(rng, d);
    if (k === 'db') return dbItem(rng, d);
    return lnItem(rng, d);
  },
});

export const EXPLOG_SKILLS: SkillDef[] = [expFeatures, expEquation, logEvaluate, logLaws, expModel, logModel];

// Exported for the lesson figures script and unit tests.
export const __test = { expTex, expAt, frac };
