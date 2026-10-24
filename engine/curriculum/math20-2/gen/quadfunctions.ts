/**
 * Math 20-2 Unit 6 — Quadratic Functions (RF1).
 * Features of parabolas read from graphs, the axis of symmetry and vertex, maximum and minimum problems, and factored form.
 * The graph and formatting helpers are shared with Unit 7 (quadequations.ts).
 */
import { byDifficulty, fixedChoice, mc, mcFigures, numPart, part, pt, skill } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroup, fmtGroupTex, paren, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, Part, PlaneFigure, PlaneLine, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

export const NAMES = [
  'Priya', 'Liam', 'Mateo', 'Aisha', 'Kenji', 'Chloé', 'Owen', 'Noor', 'Tyler', 'Mei',
  'Jasmine', 'Ravi', 'Émilie', 'Dakota', 'Hannah', 'Arjun', 'Sofia', 'Kai', 'Amara', 'Lucas',
];

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** Polynomial in LaTeX from [coefficient, body] pairs: [[-2,'x^2'],[12,'x'],[5,'']] gives -2x^2 + 12x + 5. */
export function polyTex(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c0, body] of terms) {
    const c = roundTo(c0, 6);
    if (c === 0) continue;
    const abs = Math.abs(c);
    const coef = body && abs === 1 ? '' : fmtGroupTex(abs, 6);
    if (!out) out = `${c < 0 ? '-' : ''}${coef}${body}`;
    else out += ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}

/** ax^2 + bx + c in LaTeX. */
export function stdTex(a: number, b: number, c: number, v = 'x'): string {
  return polyTex([[a, `${v}^2`], [b, v], [c, '']]);
}

/** The substitution a(x)^2 + b(x) + c written out, e.g. 2(3)^2 - 12(3) + 5. */
export function substTex(a: number, b: number, c: number, x: number): string {
  const xs = fmt(x);
  return polyTex([[a, `(${xs})^2`], [b, `(${xs})`], [c, '']]);
}

/** (x - r) in LaTeX, or just x when r = 0. */
export function factorTex(r: number, v = 'x'): string {
  if (r === 0) return v;
  return `(${v} ${r > 0 ? '-' : '+'} ${fmt(Math.abs(r))})`;
}

/** Leading coefficient in front of brackets: 1 -> '', -1 -> '-'. */
export function leadTex(a: number): string {
  return a === 1 ? '' : a === -1 ? '-' : fmt(a);
}

/** a(x - r)(x - s) in LaTeX (an x factor goes first; a repeated factor is squared). */
export function factoredTex(a: number, r: number, s: number, v = 'x'): string {
  const [p, q] = s === 0 && r !== 0 ? [s, r] : [r, s];
  if (p === q) return `${leadTex(a)}${factorTex(p, v)}^2`;
  return `${leadTex(a)}${factorTex(p, v)}${factorTex(q, v)}`;
}

/** Money in Markdown (outside maths): \$1,250 or \$12.50. */
export function money(x: number): string {
  if (Math.abs(x - Math.round(x)) < 1e-9) return `\\$${fmtGroup(Math.round(x))}`;
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${fmtGroup(Number(i))}.${f}`;
}

/** (x - r) with a number substituted for x, e.g. (4 - 3) or (4 + 2); just (4) when r = 0. */
export function substFactor(x: number, r: number): string {
  return r === 0 ? `(${fmt(x)})` : `(${fmt(x)} ${r > 0 ? '-' : '+'} ${fmt(Math.abs(r))})`;
}

/** Set notation for domain and range: {x | x ∈ R}, {y | y ≥ 3, y ∈ R}, {t | 0 ≤ t ≤ 4, t ∈ R}. */
export const setAll = (v: string) => `$\\{${v} \\mid ${v} \\in \\mathbb{R}\\}$`;
export const setRel = (v: string, rel: '\\ge' | '\\le', n: number) => `$\\{${v} \\mid ${v} ${rel} ${fmt(n)},\\ ${v} \\in \\mathbb{R}\\}$`;
export const setBetween = (v: string, lo: number, hi: number) => `$\\{${v} \\mid ${fmt(lo)} \\le ${v} \\le ${fmt(hi)},\\ ${v} \\in \\mathbb{R}\\}$`;

/** True when x is safely away from a rounding boundary (x.xx5) at the given number of decimals. */
export function clearOfBoundary(x: number, decimals: number): boolean {
  const s = Math.abs(x) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.08;
}

// ---------------------------------------------------------------------------
// Parabolas and graphs
// ---------------------------------------------------------------------------

export interface Parab {
  a: number;
  h: number;
  k: number;
  b: number;
  c: number;
  /** Real zeros in increasing order (one entry for a double zero, none when the graph misses the x-axis). */
  zeros: number[];
}

export function parabFromZeros(a: number, r: number, s: number): Parab {
  const lo = Math.min(r, s);
  const hi = Math.max(r, s);
  return { a, h: (r + s) / 2, k: roundTo(-a * ((hi - lo) / 2) ** 2, 9), b: roundTo(-a * (r + s), 9), c: roundTo(a * r * s, 9), zeros: lo === hi ? [lo] : [lo, hi] };
}

export function parabFromVertex(a: number, h: number, k: number): Parab {
  const q = -k / a;
  const zeros = q < 0 ? [] : q === 0 ? [h] : [h - Math.sqrt(q), h + Math.sqrt(q)];
  return { a, h, k, b: roundTo(-2 * a * h, 9), c: roundTo(a * h * h + k, 9), zeros };
}

export const evalParab = (p: Parab) => (x: number) => p.a * (x - p.h) ** 2 + p.k;

const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** Sample y = f(x) and clip it to the grid's y-range (polylines are drawn unclipped). */
export function curvePieces(f: (x: number) => number, g: GridSpec, from = g.xMin, to = g.xMax, n = 90): Array<Array<[number, number]>> {
  const inside = (y: number) => y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
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

/** A graph of y = f(x) on a plane, with arrowheads where the curve leaves the grid. */
export function graphFigure(
  f: (x: number) => number,
  grid: GridSpec,
  opts: { points?: PlanePoint[]; lines?: PlaneLine[]; arrows?: boolean; from?: number; to?: number } = {},
): PlaneFigure {
  const pieces = curvePieces(f, grid, opts.from ?? grid.xMin, opts.to ?? grid.xMax);
  const segments: PlaneSegment[] = [];
  if (opts.arrows !== false) {
    const onEdge = (q: [number, number]) =>
      Math.abs(q[1] - grid.yMax) < 1e-6 || Math.abs(q[1] - grid.yMin) < 1e-6 || Math.abs(q[0] - grid.xMin) < 1e-6 || Math.abs(q[0] - grid.xMax) < 1e-6;
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
  }
  const fig: PlaneFigure = { type: 'plane', grid, polylines: pieces.map((points) => ({ points })) };
  if (segments.length) fig.segments = segments;
  if (opts.lines?.length) fig.lines = opts.lines;
  if (opts.points?.length) fig.points = opts.points;
  return fig;
}

/** A unit-step grid around a parabola that shows its vertex, intercepts and both arms. */
export function fitGrid(p: Parab, extraX: number[] = [], extraY: number[] = []): GridSpec {
  const ys = [0, p.k, p.c, ...extraY];
  let yMin = Math.floor(Math.min(...ys)) - 1;
  let yMax = Math.ceil(Math.max(...ys)) + 1;
  if (p.a > 0) yMax = Math.max(yMax, Math.ceil(p.k) + 5, 3);
  else yMin = Math.min(yMin, Math.floor(p.k) - 5, -3);
  const reach = Math.sqrt((p.a > 0 ? yMax - p.k : p.k - yMin) / Math.abs(p.a));
  const xs = [0, ...p.zeros, p.h - reach, p.h + reach, ...extraX];
  return { xMin: Math.floor(Math.min(...xs)) - 1, xMax: Math.ceil(Math.max(...xs)) + 1, yMin, yMax };
}

export const gridOk = (g: GridSpec, max = 20) => g.xMax - g.xMin <= max && g.yMax - g.yMin <= max;

/** A dot at the vertex (dots on the axes would hide the tick labels students read). */
export function featurePoints(p: Parab): PlanePoint[] {
  return [{ x: p.h, y: p.k }];
}

const pointPart = (x: number, y: number, label?: string): Part => part({ kind: 'point', x, y }, { label, placeholder: '(x, y)' });
const zerosPart = (values: number[], label?: string, decimals?: number): Part =>
  part({ kind: 'numbers', values, decimals }, { label, placeholder: 'e.g. -2, 5' });

// ---------------------------------------------------------------------------
// 6.1 — Features of a parabola from its graph
// ---------------------------------------------------------------------------

function featureParab(rng: Rng, d: Difficulty, kind?: 'two' | 'none' | 'double'): { p: Parab; grid: GridSpec } {
  for (let t = 0; t < 400; t++) {
    const kd = kind ?? rng.weighted<'two' | 'none' | 'double'>([['two', 6], ['none', 2], ['double', 2]]);
    const a = rng.pick(d === 1 ? [1, -1, 1, -1, 2, -2] : [1, -1, 2, -2, 0.5, -0.5]);
    const h = rng.int(-4, 4);
    let p: Parab;
    if (kd === 'two') {
      const m = Math.abs(a) === 0.5 ? rng.pick([2, 4]) : Math.abs(a) === 2 ? rng.pick([1, 2]) : rng.int(1, 3);
      p = parabFromZeros(a, h - m, h + m);
    } else if (kd === 'none') p = parabFromVertex(a, h, Math.sign(a) * rng.int(1, 4));
    else {
      if (h === 0) continue;
      p = parabFromVertex(a, h, 0);
    }
    if (!Number.isInteger(p.c) || Math.abs(p.c) > 12) continue;
    const grid = fitGrid(p);
    if (!gridOk(grid)) continue;
    return { p, grid };
  }
  throw new Error('featureParab');
}

function rangeChoices(p: Parab): { correct: string; distractors: string[] } {
  const up = p.a > 0;
  const correct = setRel('y', up ? '\\ge' : '\\le', p.k);
  const distractors = [setRel('y', up ? '\\le' : '\\ge', p.k), setRel('y', up ? '\\ge' : '\\le', p.h), setAll('y'), setRel('x', up ? '\\ge' : '\\le', p.k), setRel('y', up ? '\\ge' : '\\le', p.c)];
  return { correct, distractors };
}

function domainChoices(p: Parab): { correct: string; distractors: string[] } {
  const ds = [setRel('x', '\\ge', p.h)];
  if (p.zeros.length === 2) ds.push(setBetween('x', p.zeros[0], p.zeros[1]));
  ds.push(setRel('y', p.a > 0 ? '\\ge' : '\\le', p.k), setRel('x', p.a > 0 ? '\\ge' : '\\le', p.k), setAll('y'));
  return { correct: setAll('x'), distractors: ds };
}

const quadFeatures = skill({
  id: 'm202-quad-features',
  name: 'Features of a parabola from its graph',
  description: 'Read the vertex, axis of symmetry, intercepts, domain and range, and the maximum or minimum value from the graph of a quadratic function.',
  outcomes: ['RF1'],
  lessonId: 'm202-6-1',
  gen(rng, d) {
    const q = byDifficulty(
      d,
      rng.pick(['vertex', 'direction', 'axis', 'yint'] as const),
      rng.pick(['zeros', 'range', 'domainRange', 'maxmin'] as const),
      'full' as const,
    );
    const { p, grid } = featureParab(rng, d, d === 1 ? 'two' : undefined);
    const up = p.a > 0;
    const figure = graphFigure(evalParab(p), grid, { points: featurePoints(p) });
    const intro = 'The graph of a quadratic function is shown.';
    const turn = up ? 'lowest' : 'highest';
    const vertexHint = 'The vertex is the turning point: the lowest point of a parabola that opens up, or the highest point of one that opens down.';
    const vertexStep = `The parabola opens ${up ? 'up' : 'down'}, so the vertex is its ${turn} point, $${pt(p.h, p.k)}$.`;
    const zerosStep =
      p.zeros.length === 2
        ? `The graph crosses the $x$-axis at $${pt(p.zeros[0], 0)}$ and $${pt(p.zeros[1], 0)}$, so the zeros are $${fmt(p.zeros[0])}$ and $${fmt(p.zeros[1])}$.`
        : p.zeros.length === 1
          ? `The graph touches the $x$-axis only at its vertex $${pt(p.h, 0)}$, so there is one zero: $${fmt(p.h)}$.`
          : `The vertex $${pt(p.h, p.k)}$ is ${up ? 'above' : 'below'} the $x$-axis and the parabola opens ${up ? 'up' : 'down'}, so the graph never crosses the $x$-axis: there are no zeros.`;
    const yintStep = `The graph crosses the $y$-axis at $${pt(0, p.c)}$, so the $y$-intercept is $${fmt(p.c)}$.`;
    const range = rangeChoices(p);
    const rangeStep = `The ${up ? 'least' : 'greatest'} $y$-value on the graph is $${fmt(p.k)}$ (at the vertex), and the arms go on ${up ? 'up' : 'down'} forever, so the range is ${range.correct}.`;

    if (q === 'vertex') {
      return {
        prompt: `${intro} What are the coordinates of the vertex?`,
        figure,
        parts: [pointPart(p.h, p.k)],
        hints: [vertexHint, 'Read the $x$-coordinate on the horizontal axis and the $y$-coordinate on the vertical axis.'],
        solution: [vertexStep, `The vertex is $${pt(p.h, p.k)}$.`],
      };
    }
    if (q === 'direction') {
      const options = [
        'It opens up, and its vertex is a minimum point.',
        'It opens down, and its vertex is a maximum point.',
        'It opens up, and its vertex is a maximum point.',
        'It opens down, and its vertex is a minimum point.',
      ];
      return {
        prompt: `${intro} Which statement describes the parabola?`,
        figure,
        parts: [{ answer: fixedChoice(options, up ? 0 : 1) }],
        hints: ['Look at the arms of the parabola: do they point up or down?', 'If the parabola opens up, nothing on the graph is lower than the vertex.'],
        solution: [
          `The arms point ${up ? 'upward' : 'downward'}, so the parabola opens ${up ? 'up' : 'down'}.`,
          `The vertex $${pt(p.h, p.k)}$ is the ${turn} point, so it is a ${up ? 'minimum' : 'maximum'} point.`,
          `The answer is: ${options[up ? 0 : 1]}`,
        ],
      };
    }
    if (q === 'axis') {
      return {
        prompt: `${intro} Write the equation of its axis of symmetry.`,
        figure,
        parts: [numPart(p.h, { label: '$x =$' })],
        hints: ['The axis of symmetry is the vertical line through the vertex.', 'A vertical line has an equation of the form $x = $ a number.'],
        solution: [vertexStep, `The vertical line through the vertex is $x = ${fmt(p.h)}$. The two halves of the parabola are mirror images across it.`, `The axis of symmetry is $x = ${fmt(p.h)}$.`],
      };
    }
    if (q === 'yint') {
      return {
        prompt: `${intro} What is the $y$-intercept?`,
        figure,
        parts: [numPart(p.c, { label: '$y$-intercept' })],
        hints: ['The $y$-intercept is where the graph crosses the $y$-axis, the vertical axis where $x = 0$.'],
        solution: ['Find where the parabola crosses the $y$-axis.', yintStep],
      };
    }
    if (q === 'zeros') {
      return {
        prompt: `${intro} What are the zeros of the function (the $x$-intercepts of the graph)? If there are none, type none.`,
        figure,
        parts: [zerosPart(p.zeros)],
        hints: ['The zeros are the $x$-values where the graph meets the $x$-axis (where $y = 0$).', 'A parabola can cross the $x$-axis twice, touch it once at the vertex, or miss it.'],
        solution: [zerosStep],
      };
    }
    if (q === 'range') {
      return {
        prompt: `${intro} What is the range of the function?`,
        figure,
        parts: [{ answer: mc(rng, range.correct, range.distractors) }],
        hints: ['The range is the set of $y$-values the graph reaches.', `The vertex gives the ${up ? 'least' : 'greatest'} $y$-value.`],
        solution: [vertexStep, rangeStep],
      };
    }
    if (q === 'domainRange') {
      const dom = domainChoices(p);
      return {
        prompt: `${intro} What are the domain and the range of the function?`,
        figure,
        parts: [
          { label: 'Domain', answer: mc(rng, dom.correct, dom.distractors) },
          { label: 'Range', answer: mc(rng, range.correct, range.distractors) },
        ],
        hints: ['The domain is every $x$-value the graph covers; the arrows show the parabola keeps going left and right forever.', 'The range is every $y$-value; it starts or stops at the vertex.'],
        solution: [`The parabola extends forever to the left and right, so the domain is ${dom.correct}.`, vertexStep, rangeStep],
      };
    }
    if (q === 'maxmin') {
      return {
        prompt: `${intro} Does the function have a maximum value or a minimum value? What is that value?`,
        figure,
        parts: [
          { label: 'Type', answer: fixedChoice(['Maximum value', 'Minimum value'], up ? 1 : 0) },
          numPart(p.k, { label: 'Value' }),
        ],
        hints: [vertexHint, 'The maximum or minimum value is the $y$-coordinate of the vertex.'],
        solution: [vertexStep, `The ${up ? 'minimum' : 'maximum'} value is the $y$-coordinate of the vertex: $${fmt(p.k)}$.`],
      };
    }
    // full analysis
    return {
      prompt: `${intro} Identify the vertex, the zeros (type none if there are none), the $y$-intercept and the range.`,
      figure,
      parts: [pointPart(p.h, p.k, 'Vertex'), zerosPart(p.zeros, 'Zeros'), numPart(p.c, { label: '$y$-intercept' }), { label: 'Range', answer: mc(rng, range.correct, range.distractors) }],
      hints: [vertexHint, 'Zeros: where the graph meets the $x$-axis. $y$-intercept: where it crosses the $y$-axis. Range: the $y$-values the graph reaches.'],
      solution: [vertexStep, zerosStep, yintStep, rangeStep],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.1 — Interpreting a graph in context
// ---------------------------------------------------------------------------

interface Flight {
  intro: (name: string) => string;
  obj: string;
  /** x is time in seconds (true) or horizontal distance in metres (false). */
  time: boolean;
  xScale: number;
  yScale: number;
  raised: boolean;
  /** Largest half-width of the unit shape (keeps heights realistic). */
  maxD: number;
  land: string;
  /** "lands", "hits the water" ... */
  lands: string;
  /** What the height is measured above. */
  surface: string;
  yLabel: string;
}

const FLIGHTS: Flight[] = [
  { intro: (n) => `${n} launches a model rocket straight up from the ground.`, obj: 'the rocket', time: true, xScale: 1, yScale: 5, raised: false, maxD: 4, land: 'land', lands: 'lands', surface: 'ground', yLabel: 'Height (m)' },
  { intro: (n) => `${n} kicks a football high into the air from the ground.`, obj: 'the ball', time: true, xScale: 1, yScale: 5, raised: false, maxD: 2, land: 'hit the ground', lands: 'hits the ground', surface: 'ground', yLabel: 'Height (m)' },
  { intro: (n) => `${n} throws a stone upward from the top of a cliff beside a lake.`, obj: 'the stone', time: true, xScale: 1, yScale: 5, raised: true, maxD: 4, land: 'hit the water', lands: 'hits the water', surface: 'water', yLabel: 'Height above the water (m)' },
  { intro: (n) => `${n} tosses a ball upward from the roof of a building.`, obj: 'the ball', time: true, xScale: 1, yScale: 5, raised: true, maxD: 3, land: 'hit the ground', lands: 'hits the ground', surface: 'ground', yLabel: 'Height (m)' },
  { intro: (n) => `${n} kicks a soccer ball from the ground.`, obj: 'the ball', time: false, xScale: 5, yScale: 1, raised: false, maxD: 4, land: 'land', lands: 'lands', surface: 'ground', yLabel: 'Height (m)' },
  { intro: (n) => `${n} hits a golf ball from the tee.`, obj: 'the ball', time: false, xScale: 10, yScale: 2, raised: false, maxD: 4, land: 'land', lands: 'lands', surface: 'ground', yLabel: 'Height (m)' },
  { intro: () => 'A jet of water shoots from a nozzle on a statue in the middle of a fountain.', obj: 'the water', time: false, xScale: 1, yScale: 0.5, raised: true, maxD: 4, land: 'land in the pool', lands: 'lands in the pool', surface: 'pool', yLabel: 'Height above the pool (m)' },
];

const BUSINESSES = [
  { who: 'A food truck', item: 'a burrito', xScale: 1, yScale: 100, period: 'daily ' },
  { who: 'The student council', item: 'a school hoodie', xScale: 5, yScale: 100, period: '' },
  { who: 'A bike rental shop in a mountain town', item: 'a day rental', xScale: 5, yScale: 200, period: 'weekly ' },
  { who: 'A community theatre', item: 'a ticket', xScale: 2, yScale: 200, period: '' },
  { who: 'A farmers’ market stall', item: 'a jar of honey', xScale: 1, yScale: 50, period: 'weekly ' },
];

function flightItem(rng: Rng, d: Difficulty) {
  const ctx = rng.pick(FLIGHTS);
  const name = rng.pick(NAMES);
  const D = rng.int(2, ctx.maxD);
  const uv = ctx.raised ? rng.int(1, D - 1) : D;
  const { xScale: xs, yScale: ys } = ctx;
  const f = (x: number) => ys * (D * D - (x / xs - uv) ** 2);
  const H = ys * D * D;
  const top = xs * uv;
  const landX = xs * (uv + D);
  const h0 = ys * (D * D - uv * uv);
  const xv = ctx.time ? 't' : 'd';
  const xUnit = ctx.time ? 's' : 'm';
  const grid: GridSpec = {
    xMin: 0,
    xMax: landX,
    yMin: 0,
    yMax: ys * (D * D + 1),
    xStep: xs,
    yStep: ys,
    xLabel: ctx.time ? 'Time (s)' : 'Horizontal distance (m)',
    yLabel: ctx.yLabel,
  };
  const figure = graphFigure(f, grid, { arrows: false, from: 0, to: landX });
  const obj = ctx.obj;
  const Obj = obj[0].toUpperCase() + obj.slice(1);
  const intro = `${ctx.intro(name)} The graph shows the height of ${obj} ${ctx.time ? 'over time' : 'against its horizontal distance from where it started'}.`;
  const xWord = ctx.time ? 'time' : 'horizontal distance';
  const hm = (y: number) => `$${fmt(y)}\\ \\text{m}$`;
  const xq = (x: number) => (ctx.time ? `$${fmt(x)}\\ \\text{s}$` : `$${fmt(x)}\\ \\text{m}$`);

  const options = byDifficulty(d, ctx.raised ? ['maxHeight', 'maxAt', 'start'] : ['maxHeight', 'maxAt'], ctx.raised ? ['land', 'heightAt', 'start'] : ['land', 'heightAt'], ['domainRange', 'above', ctx.raised ? 'heightLow' : 'heightAt']);
  let q = rng.pick(options);
  if (q === 'heightAt' && uv < 2) q = 'land';
  if (q === 'heightLow' && uv >= D - 1) q = 'above';
  const topStep = `The highest point of the graph is the vertex, $${pt(top, H)}$.`;

  if (q === 'maxHeight') {
    return {
      prompt: `${intro} What is the maximum height of ${obj}?`,
      figure,
      parts: [numPart(H, { suffix: 'm' })],
      hints: ['The maximum height is at the vertex, the highest point of the parabola.', 'Read the vertical coordinate of the vertex.'],
      solution: [topStep, `The maximum height is ${hm(H)}.`],
    };
  }
  if (q === 'maxAt') {
    return {
      prompt: ctx.time ? `${intro} How many seconds after it is launched does ${obj} reach its maximum height?` : `${intro} At what horizontal distance from the start does ${obj} reach its maximum height?`,
      figure,
      parts: [numPart(top, { suffix: xUnit })],
      hints: ['Find the vertex, the highest point of the parabola.', `Read its ${xWord} on the horizontal axis.`],
      solution: [topStep, ctx.time ? `${Obj} is highest after ${xq(top)}.` : `${Obj} is highest ${xq(top)} from the start.`],
    };
  }
  if (q === 'start') {
    return {
      prompt: `${intro} From what height was ${obj} launched?`,
      figure,
      parts: [numPart(h0, { suffix: 'm' })],
      hints: [`At the start, the ${xWord} is $0$.`, 'Read where the graph meets the vertical axis (the vertical intercept).'],
      solution: [`At $${xv} = 0$ the graph is at height ${hm(h0)}: this is the vertical intercept.`, `${Obj} started ${hm(h0)} above the ${ctx.surface}.`],
    };
  }
  if (q === 'land') {
    return {
      prompt: ctx.time ? `${intro} After how many seconds does ${obj} ${ctx.land}?` : `${intro} How far from the start does ${obj} ${ctx.land}?`,
      figure,
      parts: [numPart(landX, { suffix: xUnit })],
      hints: [`${Obj} lands when its height is $0$.`, 'Find where the graph meets the horizontal axis on the right.'],
      solution: [`The height is $0$ where the graph meets the horizontal axis, at $${xv} = ${fmt(landX)}$.`, ctx.time ? `${Obj} ${ctx.lands} after ${xq(landX)}.` : `${Obj} ${ctx.lands} ${xq(landX)} from the start.`],
    };
  }
  if (q === 'heightAt' || q === 'heightLow') {
    const e = q === 'heightAt' ? rng.int(1, Math.min(uv, D) - 1) : rng.int(uv + 1, D - 1);
    const Y = ys * (D * D - e * e);
    const xsAt = q === 'heightAt' ? [xs * (uv - e), xs * (uv + e)] : [xs * (uv + e)];
    return {
      prompt: ctx.time
        ? `${intro} At what time or times is ${obj} at a height of ${hm(Y)}? Separate two answers with a comma.`
        : `${intro} At what horizontal distance or distances is ${obj} at a height of ${hm(Y)}? Separate two answers with a comma.`,
      figure,
      parts: [part({ kind: 'numbers', values: xsAt }, { suffix: xUnit, placeholder: 'e.g. 1, 3' })],
      hints: [`Find $${fmt(Y)}$ on the vertical axis and look across to the graph.`, xsAt.length === 2 ? 'A horizontal line can meet a parabola twice: once on the way up and once on the way down.' : 'Check both sides of the vertex. The graph starts at the vertical axis, so look carefully at the left side.'],
      solution:
        xsAt.length === 2
          ? [`A horizontal line at height $${fmt(Y)}$ meets the graph twice: once on the way up and once on the way down.`, `The points are $${pt(xsAt[0], Y)}$ and $${pt(xsAt[1], Y)}$.`, ctx.time ? `${Obj} is at a height of ${hm(Y)} after ${xq(xsAt[0])} and again after ${xq(xsAt[1])}.` : `${Obj} is at a height of ${hm(Y)} when it is ${xq(xsAt[0])} and ${xq(xsAt[1])} from the start.`]
          : [`${Obj} starts at a height of ${hm(h0)}, already above ${hm(Y)}, so on the way up it never passes ${hm(Y)}.`, `On the way down, the graph is at height $${fmt(Y)}$ at $${pt(xsAt[0], Y)}$.`, ctx.time ? `${Obj} is at a height of ${hm(Y)} only once, after ${xq(xsAt[0])}.` : `${Obj} is at a height of ${hm(Y)} only once, ${xq(xsAt[0])} from the start.`],
    };
  }
  if (q === 'above') {
    const e = rng.int(1, D - 1);
    const Y = ys * (D * D - e * e);
    const x1 = Math.max(0, xs * (uv - e));
    const x2 = xs * (uv + e);
    const dur = x2 - x1;
    return {
      prompt: ctx.time ? `${intro} For how many seconds is ${obj} higher than ${hm(Y)}?` : `${intro} Over what horizontal distance is ${obj} higher than ${hm(Y)}?`,
      figure,
      parts: [numPart(dur, { suffix: xUnit })],
      hints: [`Draw a horizontal line at height $${fmt(Y)}$. Where is the graph above it?`, `Subtract the ${xWord} where ${obj} rises above that height from the ${xWord} where it drops below.`],
      solution: [
        x1 === 0 && uv - e < 0
          ? `${Obj} starts at a height of ${hm(h0)}, already higher than ${hm(Y)}, so it is above that height from $${xv} = 0$.`
          : `The graph rises through height $${fmt(Y)}$ at $${xv} = ${fmt(x1)}$.`,
        `It falls back through height $${fmt(Y)}$ at $${xv} = ${fmt(x2)}$.`,
        `$${fmt(x2)} - ${fmt(x1)} = ${fmt(dur)}$, so ${obj} is higher than ${hm(Y)} for ${ctx.time ? `${xq(dur)}` : `a horizontal distance of ${xq(dur)}`}.`,
      ],
    };
  }
  // domain and range in context
  const dom = setBetween(xv, 0, landX);
  const ran = setBetween('h', 0, H);
  const domD = [setBetween(xv, 0, top), setRel(xv, '\\ge', 0), setBetween(xv, 0, H), setAll(xv)];
  const ranD = [setBetween('h', 0, landX), setRel('h', '\\le', H), setRel('h', '\\ge', 0)];
  if (h0 > 0) ranD.unshift(setBetween('h', h0, H));
  return {
    prompt: `${intro} What are the domain and the range of this function in the context?`,
    figure,
    parts: [
      { label: 'Domain', answer: mc(rng, dom, domD) },
      { label: 'Range', answer: mc(rng, ran, ranD) },
    ],
    hints: [`In context, the graph only makes sense from the start until ${obj} lands.`, `The domain is the ${xWord} values; the range is the heights, from the lowest to the highest.`],
    solution: [
      `The ${xWord} runs from $0$ at the start to $${fmt(landX)}$ when ${obj} lands, so the domain is ${dom}.`,
      `The height goes from $0$ (on landing) up to the maximum height $${fmt(H)}$ at the vertex, so the range is ${ran}.`,
    ],
  };
}

function businessItem(rng: Rng, d: Difficulty) {
  const biz = rng.pick(BUSINESSES);
  const D = rng.int(2, 4);
  const uv = rng.int(D + 1, D + 3);
  const { xScale: xs, yScale: ys } = biz;
  const f = (x: number) => ys * (D * D - (x / xs - uv) ** 2);
  const best = xs * uv;
  const P = ys * D * D;
  const lo = xs * (uv - D);
  const hi = xs * (uv + D);
  const grid: GridSpec = { xMin: 0, xMax: xs * (uv + D + 1), yMin: -ys * 4, yMax: ys * (D * D + 1), xStep: xs, yStep: ys, xLabel: 'Price ($)', yLabel: `Profit ($)` };
  const figure = graphFigure(f, grid, { arrows: false });
  const intro = `${biz.who} models its ${biz.period}profit from the price it charges for ${biz.item}. The graph shows the profit for each price.`;
  const q = byDifficulty(d, rng.pick(['maxProfit', 'bestPrice'] as const), 'breakEven' as const, rng.pick(['profitable', 'profitAt'] as const));
  const vertexStep = `The highest point of the graph is the vertex, $${pt(best, P)}$.`;
  if (q === 'maxProfit' || q === 'bestPrice') {
    return {
      prompt: q === 'maxProfit' ? `${intro} What is the greatest ${biz.period}profit it can make, in dollars?` : `${intro} What price gives the greatest profit?`,
      figure,
      parts: [numPart(q === 'maxProfit' ? P : best, { label: '\\$' })],
      hints: ['The greatest profit is at the vertex, the highest point of the parabola.', q === 'maxProfit' ? 'Read the vertical coordinate of the vertex.' : 'Read the horizontal coordinate of the vertex.'],
      solution: [vertexStep, q === 'maxProfit' ? `The greatest profit is ${money(P)}.` : `A price of ${money(best)} gives the greatest profit.`],
    };
  }
  if (q === 'breakEven') {
    return {
      prompt: `${intro} At what prices does it break even (make a profit of \\$0)? Separate the two prices with a comma.`,
      figure,
      parts: [part({ kind: 'numbers', values: [lo, hi] }, { label: '\\$', placeholder: 'e.g. 4, 10' })],
      hints: ['Breaking even means the profit is $0$.', 'Find where the graph crosses the horizontal axis (the zeros).'],
      solution: [`The profit is $0$ where the graph crosses the horizontal axis: at $${fmt(lo)}$ and $${fmt(hi)}$.`, `It breaks even at prices of ${money(lo)} and ${money(hi)}.`],
    };
  }
  if (q === 'profitAt') {
    const e = rng.int(1, D - 1);
    const Y = ys * (D * D - e * e);
    const xsAt = [xs * (uv - e), xs * (uv + e)];
    return {
      prompt: `${intro} At what prices is the ${biz.period}profit ${money(Y)}? Separate the two prices with a comma.`,
      figure,
      parts: [part({ kind: 'numbers', values: xsAt }, { label: '\\$', placeholder: 'e.g. 4, 10' })],
      hints: [`Find $${fmt(Y)}$ on the vertical axis and look across to the graph.`, 'A horizontal line meets the parabola on both sides of the vertex.'],
      solution: [`A horizontal line at a profit of $${fmt(Y)}$ meets the graph at $${pt(xsAt[0], Y)}$ and $${pt(xsAt[1], Y)}$.`, `The profit is ${money(Y)} at prices of ${money(xsAt[0])} and ${money(xsAt[1])}.`],
    };
  }
  const correct = `Any price between ${money(lo)} and ${money(hi)}`;
  return {
    prompt: `${intro} For which prices does it make a profit (more than \\$0)?`,
    figure,
    parts: [{ answer: mc(rng, correct, [`Any price below ${money(lo)} or above ${money(hi)}`, `Any price between \\$0 and ${money(best)}`, `Any price above ${money(best)}`]) }],
    hints: ['A profit means the graph is above the horizontal axis.', 'Find the two zeros; the graph is above the axis between them.'],
    solution: [`The graph crosses the horizontal axis at $${fmt(lo)}$ and $${fmt(hi)}$.`, 'Between those prices the graph is above the axis, so the profit is positive; outside them the profit is negative (a loss).', `It makes a profit at any price between ${money(lo)} and ${money(hi)}.`],
  };
}

const quadGraphRead = skill({
  id: 'm202-quad-graph-read',
  name: 'Interpreting quadratic graphs in context',
  description: 'Interpret the graph of a quadratic model in context: maximum height or profit, when an object lands, break-even points, and domain and range.',
  outcomes: ['RF1'],
  lessonId: 'm202-6-1',
  gen(rng, d) {
    return rng.chance(0.3) ? businessItem(rng, d) : flightItem(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 6.2 — Axis of symmetry and vertex
// ---------------------------------------------------------------------------

const AXIS_FORMULA = 'x = -\\dfrac{b}{2a}';

function axisSteps(a: number, b: number): string[] {
  const h = -b / (2 * a);
  return [`Use $${AXIS_FORMULA}$ with $a = ${fmt(a)}$ and $b = ${fmt(b)}$: $x = -\\dfrac{${fmt(b)}}{2(${fmt(a)})} = ${fmt(h)}$.`];
}

const quadAxis = skill({
  id: 'm202-quad-axis',
  name: 'Axis of symmetry and vertex',
  description: 'Find the axis of symmetry from the zeros (their average) or from y = ax² + bx + c (x = −b/(2a)), then find the vertex.',
  outcomes: ['RF1'],
  lessonId: 'm202-6-2',
  gen(rng, d) {
    if (d === 1) {
      const v = rng.pick(['zeros', 'points', 'equation'] as const);
      if (v === 'equation') {
        const a = rng.pick([1, -1, 2, -2, 3]);
        const h = rng.intExcept(-6, 6, [0]);
        const b = -2 * a * h;
        const c = rng.int(-9, 9);
        return {
          prompt: `Write the equation of the axis of symmetry of $y = ${stdTex(a, b, c)}$.`,
          parts: [numPart(h, { label: '$x =$' })],
          hints: [`For $y = ax^2 + bx + c$, the axis of symmetry is $${AXIS_FORMULA}$.`],
          solution: [...axisSteps(a, b), `The axis of symmetry is $x = ${fmt(h)}$.`],
        };
      }
      const r = rng.int(-9, 8);
      const s = rng.int(r + 2, 10);
      const h = (r + s) / 2;
      if (v === 'zeros') {
        return {
          prompt: `A parabola has $x$-intercepts $${r}$ and $${s}$. Write the equation of its axis of symmetry.`,
          parts: [numPart(h, { label: '$x =$' })],
          hints: ['The axis of symmetry passes halfway between the two zeros.', 'Average the zeros: add them and divide by 2.'],
          solution: ['The axis of symmetry is halfway between the zeros.', `$x = \\dfrac{${r} + ${paren(s)}}{2} = \\dfrac{${r + s}}{2} = ${fmt(h)}$`, `The axis of symmetry is $x = ${fmt(h)}$.`],
        };
      }
      const y0 = rng.intExcept(-12, 12, [0]);
      return {
        prompt: `The points $${pt(r, y0)}$ and $${pt(s, y0)}$ both lie on a parabola. Write the equation of its axis of symmetry.`,
        parts: [numPart(h, { label: '$x =$' })],
        hints: ['The two points have the same $y$-coordinate, so they are mirror images across the axis of symmetry.', 'The axis is halfway between their $x$-coordinates.'],
        solution: ['Points at the same height on a parabola are the same distance from the axis of symmetry.', `$x = \\dfrac{${r} + ${paren(s)}}{2} = \\dfrac{${r + s}}{2} = ${fmt(h)}$`, `The axis of symmetry is $x = ${fmt(h)}$.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        const a = rng.pick([1, -1, 2, -2, 3, -3]);
        const h = rng.intExcept(-5, 5, [0]);
        const k = rng.int(-12, 12);
        const b = -2 * a * h;
        const c = a * h * h + k;
        return {
          prompt: `For $y = ${stdTex(a, b, c)}$, determine the equation of the axis of symmetry and the coordinates of the vertex.`,
          parts: [numPart(h, { label: 'Axis of symmetry: $x =$' }), pointPart(h, k, 'Vertex')],
          hints: [`Axis of symmetry: $${AXIS_FORMULA}$.`, 'The vertex lies on the axis. Substitute that $x$-value into the equation to find its $y$-coordinate.'],
          solution: [...axisSteps(a, b), `Substitute $x = ${fmt(h)}$: $y = ${substTex(a, b, c, h)} = ${fmt(k)}$.`, `The axis of symmetry is $x = ${fmt(h)}$ and the vertex is $${pt(h, k)}$.`],
        };
      }
      const a = rng.pick([1, -1, 2, -2]);
      const m = rng.int(1, 5);
      const h = rng.int(-4, 4);
      const p = parabFromZeros(a, h - m, h + m);
      const [r, s] = p.zeros;
      return {
        prompt: `The graph of $y = ${stdTex(a, p.b, p.c)}$ has zeros $${r}$ and $${s}$. Determine the equation of the axis of symmetry and the coordinates of the vertex.`,
        parts: [numPart(h, { label: 'Axis of symmetry: $x =$' }), pointPart(h, p.k, 'Vertex')],
        hints: ['The axis of symmetry is halfway between the zeros.', 'Substitute the $x$-value of the axis into the equation to find the $y$-coordinate of the vertex.'],
        solution: [`$x = \\dfrac{${r} + ${paren(s)}}{2} = ${fmt(h)}$`, `Substitute $x = ${fmt(h)}$: $y = ${substTex(a, p.b, p.c, h)} = ${fmt(p.k)}$.`, `The axis of symmetry is $x = ${fmt(h)}$ and the vertex is $${pt(h, p.k)}$.`],
      };
    }
    if (rng.chance(0.5)) {
      // the axis is not a whole number
      const a = rng.pick([1, -1, 2, -2]);
      const b = Math.abs(a) === 1 ? rng.pick([-1, 1]) * (2 * rng.int(0, 4) + 1) : rng.pick([-1, 1]) * (4 * rng.int(0, 2) + 2);
      const c = rng.int(-9, 9);
      const h = -b / (2 * a);
      const k = roundTo(a * h * h + b * h + c, 9);
      return {
        prompt: `For $y = ${stdTex(a, b, c)}$, determine the equation of the axis of symmetry and the coordinates of the vertex. Give exact decimal values.`,
        parts: [numPart(h, { label: 'Axis of symmetry: $x =$' }), pointPart(h, k, 'Vertex')],
        hints: [`Axis of symmetry: $${AXIS_FORMULA}$. The answer does not have to be a whole number.`, 'Substitute that $x$-value into the equation carefully (a calculator helps).'],
        solution: [...axisSteps(a, b), `Substitute $x = ${fmt(h)}$: $y = ${substTex(a, b, c, h)} = ${fmt(k)}$.`, `The axis of symmetry is $x = ${fmt(h)}$ and the vertex is $${pt(h, k)}$.`],
        calculator: true,
      };
    }
    // other zero from the axis
    const a = rng.pick([1, -1, 2, -2, 3]);
    const m = rng.int(1, 6);
    const h = rng.intExcept(-5, 5, [0]);
    const p = parabFromZeros(a, h - m, h + m);
    const [r, s] = rng.chance(0.5) ? [p.zeros[0], p.zeros[1]] : [p.zeros[1], p.zeros[0]];
    return {
      prompt: `The parabola $y = ${stdTex(a, p.b, p.c)}$ has a zero at $x = ${r}$. Use the axis of symmetry to find the other zero, then find the vertex.`,
      parts: [numPart(s, { label: 'Other zero: $x =$' }), pointPart(h, p.k, 'Vertex')],
      hints: [`Find the axis of symmetry with $${AXIS_FORMULA}$.`, 'The two zeros are the same distance from the axis, on opposite sides.'],
      solution: [
        ...axisSteps(a, p.b),
        `The zero $${r}$ is $${Math.abs(r - h)}$ units ${r < h ? 'left' : 'right'} of the axis, so the other zero is $${Math.abs(r - h)}$ units ${r < h ? 'right' : 'left'} of it: $${fmt(h)} ${r < h ? '+' : '-'} ${Math.abs(r - h)} = ${s}$.`,
        `Vertex: substitute $x = ${fmt(h)}$: $y = ${substTex(a, p.b, p.c, h)} = ${fmt(p.k)}$.`,
        `The other zero is $x = ${s}$ and the vertex is $${pt(h, p.k)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.2 — Maximum and minimum problems
// ---------------------------------------------------------------------------

const quadMaxMin = skill({
  id: 'm202-quad-max-min',
  name: 'Maximum and minimum problems',
  description: 'Solve maximum and minimum problems (height, revenue, area, cost) by finding the vertex of a quadratic model.',
  outcomes: ['RF1'],
  lessonId: 'm202-6-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const tv = rng.int(1, 3);
        const h0 = rng.pick([1, 1.2, 1.5, 1.8, 2]);
        const b = 10 * tv;
        const H = 5 * tv * tv + h0;
        const thing = rng.pick(['a ball', 'a beanbag', 'a water balloon', 'a frisbee']);
        return {
          prompt: `${name} throws ${thing} into the air. Its height, $h$ metres, after $t$ seconds is modelled by $h = ${stdTex(-5, b, h0, 't')}$. It reaches its maximum height at $t = ${tv}$ s. What is the maximum height?`,
          parts: [numPart(H, { suffix: 'm' })],
          hints: ['The maximum height is the value of $h$ at the vertex.', `Substitute $t = ${tv}$ into the equation.`],
          solution: [`$h = ${substTex(-5, b, h0, tv)}$`, `$h = ${fmt(-5 * tv * tv)} + ${fmt(b * tv)}${h0 ? ` + ${fmt(h0)}` : ''} = ${fmt(H)}$`, `The maximum height is $${fmt(H)}\\ \\text{m}$.`],
        };
      }
      const a = rng.pick([1, -1, 2, -2, 3, -3]);
      const h = rng.intExcept(-4, 4, [0]);
      const k = rng.int(-10, 10);
      const b = -2 * a * h;
      const c = a * h * h + k;
      return {
        prompt: `The axis of symmetry of $y = ${stdTex(a, b, c)}$ is $x = ${h}$. Does the function have a maximum or a minimum value? What is that value?`,
        parts: [{ label: 'Type', answer: fixedChoice(['Maximum value', 'Minimum value'], a > 0 ? 1 : 0) }, numPart(k, { label: 'Value' })],
        hints: ['If $a > 0$ the parabola opens up (minimum); if $a < 0$ it opens down (maximum).', `The value is the $y$-coordinate of the vertex: substitute $x = ${h}$.`],
        solution: [`$a = ${a}$ is ${a > 0 ? 'positive, so the parabola opens up and has a minimum' : 'negative, so the parabola opens down and has a maximum'}.`, `$y = ${substTex(a, b, c, h)} = ${fmt(k)}$`, `The ${a > 0 ? 'minimum' : 'maximum'} value is $${fmt(k)}$.`],
      };
    }
    if (d === 2) {
      const v = rng.pick(['ball', 'revenue', 'fuel', 'area', 'cost'] as const);
      if (v === 'ball') {
        for (;;) {
          const tv = rng.pick([1, 1.5, 2, 2.5]);
          const h0 = rng.pick([0.5, 1, 1.2, 1.5, 1.8, 2]);
          const b = roundTo(9.8 * tv, 6);
          const H = roundTo(4.9 * tv * tv + h0, 9);
          if (!clearOfBoundary(H, 1)) continue;
          const sport = rng.pick(['volleyball', 'basketball', 'baseball', 'soccer ball']);
          return {
            prompt: `${name} hits a ${sport} upward. Its height, $h$ metres, after $t$ seconds is modelled by $h = ${stdTex(-4.9, b, h0, 't')}$. When does the ball reach its maximum height, and what is that height? Round the height to the nearest tenth of a metre.`,
            parts: [numPart(tv, { label: 'Time', suffix: 's' }), numPart(H, { label: 'Maximum height', decimals: 1, suffix: 'm' })],
            hints: [`The maximum is at the vertex. Its $t$-coordinate is $t = -\\dfrac{b}{2a}$.`, 'Substitute that time into the equation to find the height.'],
            solution: [
              `$t = -\\dfrac{${fmt(b)}}{2(-4.9)} = \\dfrac{${fmt(b)}}{9.8} = ${fmt(tv)}$`,
              `$h = ${substTex(-4.9, b, h0, tv)} = ${fmt(H)}$`,
              `The ball reaches its maximum height of about $${fmtFixed(H, 1)}\\ \\text{m}$ after $${fmt(tv)}\\ \\text{s}$.`,
            ],
          };
        }
      }
      if (v === 'revenue') {
        const k = rng.pick([5, 10, 20, 25]);
        const p = rng.pick([8, 10, 12, 15, 20]);
        const xs = rng.int(2, 8);
        const n = k * p + 2 * k * xs;
        const B = n - k * p;
        const C = p * n;
        const R = (p + xs) * (n - k * xs);
        const what = rng.pick([
          { thing: 'tickets to its fall concert', place: 'A high school band' },
          { thing: 'car washes', place: 'A volleyball team' },
          { thing: 'plates at its pancake breakfast', place: 'A rodeo committee' },
          { thing: 'passes to its climbing gym', place: 'A downtown climbing gym' },
        ]);
        return {
          prompt: `${what.place} sells ${n} ${what.thing} at ${money(p)} each. For each \\$1 increase in price, it expects to sell ${k} fewer. The revenue, $R$ dollars, after $x$ price increases of \\$1 is modelled by $R = ${stdTex(-k, B, C)}$. How many \\$1 increases give the maximum revenue, and what is the maximum revenue?`,
          parts: [numPart(xs, { label: 'Number of increases' }), numPart(R, { label: 'Maximum revenue (\\$)' })],
          hints: ['The maximum revenue is at the vertex: $x = -\\dfrac{b}{2a}$.', 'Substitute that value of $x$ into the equation to find the revenue.'],
          solution: [
            `$x = -\\dfrac{${fmt(B)}}{2(${-k})} = ${xs}$`,
            `$R = ${substTex(-k, B, C, xs)} = ${fmtGroupTex(R)}$`,
            `${xs} increases of \\$1 (a price of ${money(p + xs)}) give the maximum revenue of ${money(R)}.`,
          ],
        };
      }
      if (v === 'fuel') {
        const vs = rng.pick([80, 85, 90, 95, 100]);
        const fmin = rng.pick([5.4, 5.8, 6.2, 6.6, 7.1, 7.5]);
        const a = 0.002;
        const b = roundTo(-2 * a * vs, 9);
        const c = roundTo(a * vs * vs + fmin, 9);
        const car = rng.pick(['hatchback', 'minivan', 'pickup truck', 'sedan']);
        return {
          prompt: `The fuel consumption of ${name}’s ${car}, $F$ litres per $100\\ \\text{km}$, at a speed of $v$ km/h is modelled by $F = ${stdTex(a, b, c, 'v')}$. At what speed is the fuel consumption least, and what is the least fuel consumption?`,
          parts: [numPart(vs, { label: 'Speed', suffix: 'km/h' }), numPart(fmin, { label: 'Least consumption', suffix: 'L/100 km' })],
          hints: ['$a > 0$, so the parabola opens up and the vertex is a minimum.', 'Find $v = -\\dfrac{b}{2a}$, then substitute it into the equation.'],
          solution: [`$v = -\\dfrac{${fmt(b)}}{2(${fmt(a)})} = \\dfrac{${fmt(-b)}}{${fmt(2 * a)}} = ${vs}$`, `$F = ${substTex(a, b, c, vs)} = ${fmt(fmin)}$`, `The fuel consumption is least, $${fmt(fmin)}$ L/100 km, at $${vs}$ km/h.`],
        };
      }
      if (v === 'area') {
        const P = 4 * rng.int(6, 30);
        const x = P / 4;
        const A = (P * P) / 8;
        const pen = rng.pick(['a dog run', 'a vegetable garden', 'a goat pen', 'a play area']);
        const wall = rng.pick(['a barn wall', 'a fence along the property line', 'the side of a garage', 'a river bank']);
        return {
          prompt: `${name} uses $${P}$ m of fencing to make ${pen} along ${wall}, so only three sides need fencing. The area, $A$ square metres, when the two sides that touch the wall are each $x$ metres long is $A = ${stdTex(-2, P, 0)}$. What value of $x$ gives the greatest area, and what is that area?`,
          parts: [numPart(x, { label: '$x =$', suffix: 'm' }), numPart(A, { label: 'Greatest area', suffix: 'm²' })],
          hints: ['The greatest area is at the vertex: $x = -\\dfrac{b}{2a}$.', 'Substitute that value into the area equation.'],
          solution: [`$x = -\\dfrac{${P}}{2(-2)} = ${fmt(x)}$`, `$A = ${substTex(-2, P, 0, x)} = ${fmtGroupTex(A)}$`, `Sides of $${fmt(x)}$ m give the greatest area, $${fmtGroupTex(A)}\\ \\text{m}^2$.`],
        };
      }
      const a = rng.pick([2, 3, 4, 5]);
      const xs = rng.int(4, 12);
      const cmin = 10 * rng.int(8, 40);
      const b = -2 * a * xs;
      const c = a * xs * xs + cmin;
      const what = rng.pick(['loaves of bread at a bakery', 'jars of salsa at a small factory', 'bags of feed at a feed mill', 'cases of maple syrup at a packing plant']);
      return {
        prompt: `The hourly cost, $C$ dollars, of producing $x$ hundred ${what} is modelled by $C = ${stdTex(a, b, c)}$. How many hundred should be produced each hour to make the cost least, and what is the least hourly cost?`,
        parts: [numPart(xs, { label: 'Hundreds produced' }), numPart(cmin, { label: 'Least cost (\\$)' })],
        hints: ['$a > 0$, so the vertex is a minimum.', 'Find $x = -\\dfrac{b}{2a}$, then substitute it into the equation.'],
        solution: [`$x = -\\dfrac{${b}}{2(${a})} = ${xs}$`, `$C = ${substTex(a, b, c, xs)} = ${cmin}$`, `Producing ${xs} hundred each hour gives the least cost, ${money(cmin)}.`],
      };
    }
    // d3: build the model first
    const v = rng.pick(['fence3', 'fence4', 'revenue', 'numbers'] as const);
    if (v === 'fence3' || v === 'fence4') {
      const three = v === 'fence3';
      const P = 4 * rng.int(6, 30);
      const x = P / 4;
      const A = three ? (P * P) / 8 : (P * P) / 16;
      const other = three ? P - 2 * x : P / 2 - x;
      const pen = rng.pick(['a rectangular corral', 'a rectangular garden', 'a rectangular dog run', 'a rectangular skating area']);
      const story = three
        ? `${name} has $${P}$ m of fencing to enclose ${pen}. One side is along a straight river bank and needs no fence.`
        : `${name} has $${P}$ m of fencing to enclose ${pen} on all four sides.`;
      return {
        prompt: `${story} Let $x$ be the width in metres${three ? ' (the two sides that meet the river)' : ''}. Write an equation for the area, then find the dimensions that give the greatest area and that area.`,
        parts: [numPart(x, { label: 'Width $x$', suffix: 'm' }), numPart(other, { label: 'Length', suffix: 'm' }), numPart(A, { label: 'Greatest area', suffix: 'm²' })],
        hints: [three ? `The fence is $x + x + \\text{length} = ${P}$, so the length is $${P} - 2x$.` : `Two widths and two lengths make $${P}$ m, so the length is $${P / 2} - x$.`, `Area $=$ width $\\times$ length. Expand it, then find the vertex with $x = -\\dfrac{b}{2a}$.`],
        solution: [
          three ? `Length $= ${P} - 2x$, so $A = x(${P} - 2x) = ${stdTex(-2, P, 0)}$.` : `Length $= ${P / 2} - x$, so $A = x(${P / 2} - x) = ${stdTex(-1, P / 2, 0)}$.`,
          three ? `$x = -\\dfrac{${P}}{2(-2)} = ${fmt(x)}$` : `$x = -\\dfrac{${P / 2}}{2(-1)} = ${fmt(x)}$`,
          `Length $= ${three ? `${P} - 2(${fmt(x)})` : `${P / 2} - ${fmt(x)}`} = ${fmt(other)}$ m, and $A = ${fmt(x)} \\times ${fmt(other)} = ${fmtGroupTex(A)}$.`,
          `A width of $${fmt(x)}$ m and a length of $${fmt(other)}$ m give the greatest area, $${fmtGroupTex(A)}\\ \\text{m}^2$.${three ? '' : ' (The best rectangle is a square.)'}`,
        ],
      };
    }
    if (v === 'revenue') {
      const k = rng.pick([10, 20, 25, 40]);
      const p = rng.pick([10, 12, 15, 18, 20, 25]);
      const xs = rng.int(2, 9);
      const n = k * p + 2 * k * xs;
      const R = (p + xs) * (n - k * xs);
      const B = n - k * p;
      const C = p * n;
      const ctx = rng.pick([
        { who: 'A local theatre company', what: 'tickets' },
        { who: 'A mountain ski hill', what: 'lift tickets on a weekday' },
        { who: 'A minor hockey association', what: 'raffle tickets' },
        { who: 'A city science centre', what: 'admission passes each day' },
      ]);
      return {
        prompt: `${ctx.who} sells ${n} ${ctx.what} at ${money(p)} each. A survey suggests that for every \\$1 increase in price, ${k} fewer will be sold. Let $x$ be the number of \\$1 increases. Write an equation for the revenue, then find the price that gives the maximum revenue and the maximum revenue.`,
        parts: [numPart(p + xs, { label: 'Price (\\$)' }), numPart(R, { label: 'Maximum revenue (\\$)' })],
        hints: [`Revenue $=$ price $\\times$ number sold $= (${p} + x)(${n} - ${k}x)$.`, 'Expand, find the vertex with $x = -\\dfrac{b}{2a}$, then add the increases to the original price.'],
        solution: [
          `$R = (${p} + x)(${n} - ${k}x) = ${stdTex(-k, B, C)}$`,
          `$x = -\\dfrac{${B}}{2(${-k})} = ${xs}$`,
          `Price $= ${p} + ${xs} = ${p + xs}$ dollars; number sold $= ${n} - ${k}(${xs}) = ${n - k * xs}$.`,
          `$R = ${p + xs} \\times ${n - k * xs} = ${fmtGroupTex(R)}$`,
          `A price of ${money(p + xs)} gives the maximum revenue, ${money(R)}.`,
        ],
      };
    }
    const diff = 2 * rng.int(3, 15);
    const lo = -diff / 2;
    const hi = diff / 2;
    return {
      prompt: `Two numbers differ by $${diff}$. Their product is as small as possible. Write an equation for the product, then find the two numbers and the minimum product.`,
      parts: [part({ kind: 'numbers', values: [lo, hi] }, { label: 'The two numbers', placeholder: 'e.g. -2, 5' }), numPart(lo * hi, { label: 'Minimum product' })],
      hints: [`Call the smaller number $x$; the larger is $x + ${diff}$. The product is $P = x(x + ${diff})$.`, 'Expand, then find the vertex with $x = -\\dfrac{b}{2a}$. $a > 0$, so the vertex is a minimum.'],
      solution: [
        `$P = x(x + ${diff}) = ${stdTex(1, diff, 0)}$`,
        `$x = -\\dfrac{${diff}}{2(1)} = ${lo}$, and the other number is $${lo} + ${diff} = ${hi}$.`,
        `$P = (${lo})(${hi}) = ${lo * hi}$`,
        `The numbers are $${lo}$ and $${hi}$, and the minimum product is $${lo * hi}$.`,
      ],
      calculator: false,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.3 — Factored form
// ---------------------------------------------------------------------------

function factoredParab(rng: Rng, opts: { half?: boolean; aSet: number[]; noSymmetric?: boolean }): Parab {
  for (let t = 0; t < 400; t++) {
    const a = rng.pick(opts.aSet);
    const r = rng.int(-7, 7);
    const s = rng.int(-7, 7);
    if (r === s) continue;
    if (!opts.half && (r + s) % 2 !== 0) continue;
    if (opts.noSymmetric && r + s === 0) continue;
    const p = parabFromZeros(a, r, s);
    if (Math.abs(p.c) > 40 || Math.abs(p.k) > 40) continue;
    if (Math.abs(a) === 0.5 && !Number.isInteger(p.c)) continue;
    return { ...p, zeros: [r, s] };
  }
  throw new Error('factoredParab');
}

const factoredForm = skill({
  id: 'm202-factored-form',
  name: 'Factored form',
  description: 'Use y = a(x − r)(x − s) to find the zeros, axis of symmetry, vertex and y-intercept, and find a from the zeros and one point.',
  outcomes: ['RF1'],
  lessonId: 'm202-6-3',
  gen(rng, d) {
    if (d === 1) {
      const p = factoredParab(rng, { aSet: [1, -1, 2, -2, 3, -3], half: true });
      const [r, s] = p.zeros;
      const eq = `y = ${factoredTex(p.a, r, s)}`;
      const v = rng.pick(['zeros', 'yint', 'axis'] as const);
      const zs = [Math.min(r, s), Math.max(r, s)];
      if (v === 'zeros') {
        return {
          prompt: `What are the zeros of $${eq}$?`,
          parts: [zerosPart(zs)],
          hints: ['A product is $0$ when one of its factors is $0$.', 'Set each bracket equal to $0$. Watch the signs: $(x + 3) = 0$ gives $x = -3$.'],
          solution: [`Set each factor equal to $0$: ${[r, s].map((z) => `$${factorTex(z).replace(/^\(|\)$/g, '')} = 0$ gives $x = ${z}$`).join('; ')}.`, `The zeros are $${zs[0]}$ and $${zs[1]}$.`],
        };
      }
      if (v === 'yint') {
        return {
          prompt: `What is the $y$-intercept of $${eq}$?`,
          parts: [numPart(p.c, { label: '$y$-intercept' })],
          hints: ['The $y$-intercept is the value of $y$ when $x = 0$.'],
          solution: [`Substitute $x = 0$: $y = ${leadTex(p.a)}${substFactor(0, r)}${substFactor(0, s)}$`, `$y = ${fmt(p.a)} \\times ${paren(-r)} \\times ${paren(-s)} = ${fmt(p.c)}$`, `The $y$-intercept is $${fmt(p.c)}$.`],
        };
      }
      return {
        prompt: `Write the equation of the axis of symmetry of $${eq}$.`,
        parts: [numPart(p.h, { label: '$x =$' })],
        hints: ['First find the zeros: set each factor equal to $0$.', 'The axis of symmetry is halfway between the zeros.'],
        solution: [`The zeros are $${r}$ and $${s}$.`, `$x = \\dfrac{${r} + ${paren(s)}}{2} = ${fmt(p.h)}$`, `The axis of symmetry is $x = ${fmt(p.h)}$.`],
      };
    }
    if (d === 2) {
      const v = rng.pick(['vertex', 'all', 'graph'] as const);
      if (v === 'graph') {
        for (let t = 0; t < 200; t++) {
          const p = factoredParab(rng, { aSet: [1, -1, 2, -2, 0.5, -0.5], noSymmetric: true });
          const [r, s] = p.zeros;
          const variants = [parabFromZeros(p.a, r, s), parabFromZeros(p.a, -r, -s), parabFromZeros(-p.a, r, s), parabFromZeros(-p.a, -r, -s)];
          const grids = variants.map((q) => fitGrid(q));
          const grid: GridSpec = {
            xMin: Math.min(...grids.map((g) => g.xMin)),
            xMax: Math.max(...grids.map((g) => g.xMax)),
            yMin: Math.min(...grids.map((g) => g.yMin)),
            yMax: Math.max(...grids.map((g) => g.yMax)),
          };
          if (!gridOk(grid, 22)) continue;
          const answer = mcFigures(
            rng,
            variants.map((q, i) => ({ md: '', figure: graphFigure(evalParab(q), grid, { points: q.zeros.map((z) => ({ x: z, y: 0 })) }), correct: i === 0 })),
          );
          if (answer.kind === 'mc') answer.choices.forEach((c, i) => (c.md = `Graph ${i + 1}`));
          return {
            prompt: `Which graph shows $y = ${factoredTex(p.a, r, s)}$?`,
            parts: [{ answer }],
            hints: ['Set each factor equal to $0$ to find the $x$-intercepts.', `The sign of $a$ tells you whether the parabola opens up or down.`],
            solution: [`The zeros are $x = ${r}$ and $x = ${s}$.`, `$a = ${fmt(p.a)}$ is ${p.a > 0 ? 'positive, so the parabola opens up' : 'negative, so the parabola opens down'}.`, `The correct graph crosses the $x$-axis at $${r}$ and $${s}$ and opens ${p.a > 0 ? 'up' : 'down'}.`],
          };
        }
      }
      const p = factoredParab(rng, { aSet: [1, -1, 2, -2, 3, -3, 0.5, -0.5], half: rng.chance(0.3) });
      const [r, s] = p.zeros;
      const eq = `y = ${factoredTex(p.a, r, s)}`;
      const vertexSteps = [`Zeros: $x = ${r}$ and $x = ${s}$.`, `Axis of symmetry: $x = \\dfrac{${r} + ${paren(s)}}{2} = ${fmt(p.h)}$.`, `Vertex: $y = ${leadTex(p.a)}${substFactor(p.h, r)}${substFactor(p.h, s)} = ${fmt(p.k)}$.`];
      if (v === 'vertex') {
        return {
          prompt: `For $${eq}$, determine the equation of the axis of symmetry and the coordinates of the vertex.`,
          parts: [numPart(p.h, { label: 'Axis of symmetry: $x =$' }), pointPart(p.h, p.k, 'Vertex')],
          hints: ['Find the zeros, then average them to get the axis of symmetry.', 'Substitute the axis value into the equation to get the $y$-coordinate of the vertex.'],
          solution: [...vertexSteps, `The axis of symmetry is $x = ${fmt(p.h)}$ and the vertex is $${pt(p.h, p.k)}$.`],
        };
      }
      const zs = [Math.min(r, s), Math.max(r, s)];
      return {
        prompt: `For $${eq}$, determine the zeros, the $y$-intercept and the vertex.`,
        parts: [zerosPart(zs, 'Zeros'), numPart(p.c, { label: '$y$-intercept' }), pointPart(p.h, p.k, 'Vertex')],
        hints: ['Zeros: set each factor equal to $0$. $y$-intercept: substitute $x = 0$.', 'Vertex: its $x$-coordinate is the average of the zeros.'],
        solution: [...vertexSteps, `$y$-intercept: $y = ${fmt(p.a)} \\times ${paren(-r)} \\times ${paren(-s)} = ${fmt(p.c)}$.`, `Zeros $${zs[0]}$ and $${zs[1]}$; $y$-intercept $${fmt(p.c)}$; vertex $${pt(p.h, p.k)}$.`],
      };
    }
    if (rng.chance(0.5)) {
      // a from the zeros and one point
      for (;;) {
        const p = factoredParab(rng, { aSet: [1, -1, 2, -2, 3, -3, 0.5, -0.5, 4], half: false });
        const [r, s] = p.zeros;
        const px = rng.intExcept(-8, 8, [r, s]);
        const py = p.a * (px - r) * (px - s);
        if (!Number.isInteger(py) || Math.abs(py) > 80 || px === 0) continue;
        const prod = (px - r) * (px - s);
        return {
          prompt: `A parabola has zeros $${r}$ and $${s}$ and passes through the point $${pt(px, py)}$. Its equation can be written as $y = a${factorTex(r)}${factorTex(s)}$. Determine the value of $a$ and the coordinates of the vertex.`,
          parts: [numPart(p.a, { label: '$a =$' }), pointPart(p.h, p.k, 'Vertex')],
          hints: [`Substitute $x = ${px}$ and $y = ${py}$ into $y = a${factorTex(r)}${factorTex(s)}$ and solve for $a$.`, 'The vertex is on the axis of symmetry, halfway between the zeros.'],
          solution: [
            `$${py} = a${substFactor(px, r)}${substFactor(px, s)} = a(${px - r})(${px - s}) = ${prod}a$`,
            `$a = \\dfrac{${py}}{${prod}} = ${fmt(p.a)}$, so $y = ${factoredTex(p.a, r, s)}$.`,
            `Axis: $x = \\dfrac{${r} + ${paren(s)}}{2} = ${fmt(p.h)}$. Vertex $y$-coordinate: $y = ${fmt(p.a)}(${fmt(p.h - r)})(${fmt(p.h - s)}) = ${fmt(p.k)}$.`,
            `$a = ${fmt(p.a)}$ and the vertex is $${pt(p.h, p.k)}$.`,
          ],
        };
      }
    }
    // an arch with the origin at one base
    for (;;) {
      const W = rng.pick([10, 12, 16, 20, 24, 30, 40, 50]);
      const H = rng.pick([3, 4, 5, 6, 8, 9, 10, 12, 15]);
      const a = (-4 * H) / (W * W);
      if (Math.abs(a * 10000 - Math.round(a * 10000)) > 1e-6 || H >= W) continue;
      const x = rng.intExcept(1, W - 1, [W / 2]);
      const y = a * x * (x - W);
      if (!clearOfBoundary(y, 1)) continue;
      const arch = rng.pick([
        { thing: 'A parabolic arch over the entrance to a park', span: 'spans', base: 'base' },
        { thing: 'The parabolic arch of a footbridge over a creek', span: 'spans', base: 'base' },
        { thing: 'A parabolic greenhouse frame', span: 'is', base: 'side' },
        { thing: 'A parabolic tunnel for a hiking trail', span: 'is', base: 'side' },
      ]);
      return {
        prompt: `${arch.thing} ${arch.span} $${W}$ m wide at the ground and is $${H}$ m high at its centre. Place the origin at the left ${arch.base}, so the arch is $y = ax(x - ${W})$, where $x$ is the horizontal distance and $y$ the height, both in metres. Determine $a$, and the height of the arch $${x}$ m from the left ${arch.base} to the nearest tenth of a metre.`,
        parts: [numPart(a, { label: '$a =$' }), numPart(y, { label: 'Height', decimals: 1, suffix: 'm' })],
        hints: [`The zeros are $0$ and $${W}$, so the top of the arch is halfway, at $${pt(W / 2, H)}$.`, `Substitute $x = ${W / 2}$ and $y = ${H}$ to solve for $a$; then substitute $x = ${x}$.`],
        solution: [
          `The vertex is halfway between the zeros $0$ and $${W}$: $${pt(W / 2, H)}$.`,
          `$${H} = a(${W / 2})(${W / 2} - ${W}) = ${(W / 2) * (-W / 2)}a$, so $a = \\dfrac{${H}}{${(W / 2) * (-W / 2)}} = ${fmt(a, 6)}$.`,
          `At $x = ${x}$: $y = ${fmt(a, 6)}(${x})(${x} - ${W}) = ${fmt(y, 4)}$.`,
          `$a = ${fmt(a, 6)}$, and the arch is about $${fmtFixed(y, 1)}$ m high $${x}$ m from the left ${arch.base}.`,
        ],
        calculator: true,
      };
    }
  },
});

export const QUAD_FUNCTION_SKILLS: SkillDef[] = [quadFeatures, quadGraphRead, quadAxis, quadMaxMin, factoredForm];
