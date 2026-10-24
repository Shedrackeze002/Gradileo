/**
 * Math 30-2 Unit 7 — Sinusoidal Functions (RF8).
 * Periodic behaviour and the features of sinusoidal graphs and of equations y = a sin(bx + c) + d
 * (amplitude, period, midline, maximum, minimum, range), and given sinusoidal regression equations
 * for tides, daylight, Ferris wheels, temperatures and breathing: evaluate, interpret, interpolate,
 * extrapolate and find the time of a maximum. Regression equations are given, never computed.
 */
import { byDifficulty, fixedChoice, mc, mcFigures, multi, numPart, part, retry, roundingPhrase, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, PlaneFigure, SkillDef } from '../../../types.ts';

const PI = Math.PI;
const DEG = PI / 180;

const NAMES = [
  'Aiyana', 'Mateo', 'Priya', 'Owen', 'Fatima', 'Liam', 'Mei', 'Jasper', 'Noor', 'Ethan', 'Chloé', 'Daniel',
  'Hana', 'Kwame', 'Sofia', 'Arjun', 'Maya', 'Lucas', 'Zara', 'Nathaniel', 'Inès', 'Kai', 'Tatum', 'Bilal',
];

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** True when x is safely away from a rounding boundary at the given number of decimals. */
function clear(x: number, dp: number): boolean {
  const s = Math.abs(x) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.08;
}
/** A number in brackets when negative. */
const pn = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));
/** A working value: exact, or four decimals followed by an ellipsis. */
const work = (x: number, d = 4) => (Math.abs(roundTo(x, d) - x) < 1e-9 ? fmt(x, d) : `${fmtFixed(x, d)}\\ldots`);
/** "+ 3" or "- 3" after a term. */
const plus = (x: number, dp = 4) => `${x < 0 ? '-' : '+'} ${fmt(Math.abs(x), dp)}`;
const r3 = (v: number) => Math.round(v * 1000) / 1000 + 0;
const setRange = (lo: number, hi: number) => `$\\{y \\mid ${fmt(lo)} \\le y \\le ${fmt(hi)},\\ y \\in \\mathbb{R}\\}$`;

/** Sample y = f(x) as polylines clipped to the grid's y-range. */
function curve(f: (x: number) => number, g: GridSpec, n = 240): Array<Array<[number, number]>> {
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const out: Array<Array<[number, number]>> = [];
  let cur: Array<[number, number]> = [];
  let px = g.xMin;
  let pin = inside(f(px));
  if (pin) cur.push([r3(px), r3(f(px))]);
  for (let i = 1; i <= n; i++) {
    const x = g.xMin + ((g.xMax - g.xMin) * i) / n;
    const yin = inside(f(x));
    if (yin !== pin) {
      let lo = pin ? px : x;
      let hi = pin ? x : px;
      for (let k = 0; k < 40; k++) {
        const m = (lo + hi) / 2;
        if (inside(f(m))) lo = m;
        else hi = m;
      }
      const edge: [number, number] = [r3(lo), r3(f(pin ? hi : lo) > g.yMax ? g.yMax : g.yMin)];
      if (pin) {
        cur.push(edge);
        if (cur.length > 1) out.push(cur);
        cur = [];
      } else cur = [edge];
    }
    if (yin) cur.push([r3(x), r3(f(x))]);
    px = x;
    pin = yin;
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

function plot(f: (x: number) => number, grid: GridSpec, extra: Partial<PlaneFigure> = {}): PlaneFigure {
  return { type: 'plane', grid, polylines: curve(f, grid).map((points) => ({ points })), ...extra };
}

// ---------------------------------------------------------------------------
// y = a sin(bx + c) + d
// ---------------------------------------------------------------------------

type Fn = 'sin' | 'cos';
interface Wave {
  fn: Fn;
  a: number;
  b: number;
  /** Degrees when deg, radians otherwise. */
  c: number;
  d: number;
  deg: boolean;
}

function waveFn(w: Wave): (x: number) => number {
  const F = w.fn === 'sin' ? Math.sin : Math.cos;
  return w.deg ? (x) => w.a * F((w.b * x + w.c) * DEG) + w.d : (x) => w.a * F(w.b * x + w.c) + w.d;
}
const amp = (w: Wave) => Math.abs(w.a);
const per = (w: Wave) => (w.deg ? 360 : 2 * PI) / w.b;
const wMax = (w: Wave) => w.d + amp(w);
const wMin = (w: Wave) => w.d - amp(w);

const coefTex = (a: number) => (a === 1 ? '' : a === -1 ? '-' : fmt(a));
function innerTex(w: Wave): string {
  const bx = w.b === 1 ? 'x' : `${fmt(w.b)}x`;
  if (w.c === 0) return bx;
  return `${bx} ${w.c > 0 ? '+' : '-'} ${fmt(Math.abs(w.c))}${w.deg ? '^\\circ' : ''}`;
}
const dTex = (d: number) => (d === 0 ? '' : ` ${plus(d)}`);
function waveTex(w: Wave, lhs = 'y'): string {
  return `${lhs} = ${coefTex(w.a)}\\${w.fn}(${innerTex(w)})${dTex(w.d)}`;
}

/** A multiple of π in LaTeX and as typed. */
function piTex(k: number): string {
  const f = toFrac(k, 12)!;
  const num = f.n === 1 ? '\\pi' : `${f.n}\\pi`;
  return f.d === 1 ? num : `\\frac{${num}}{${f.d}}`;
}
function piText(k: number): string {
  const f = toFrac(k, 12)!;
  const num = f.n === 1 ? 'pi' : `${f.n}pi`;
  return f.d === 1 ? num : `${num}/${f.d}`;
}
/** "period = 360°/b = ..." */
function perWork(w: Wave): string {
  return w.deg
    ? `\\text{period} = \\dfrac{360^\\circ}{${fmt(w.b)}} = ${fmt(per(w))}^\\circ`
    : `\\text{period} = \\dfrac{2\\pi}{${fmt(w.b)}} = ${piTex(2 / w.b)}`;
}

/** A grid for a wave in degrees: about two periods, grid lines on the quarter points. */
function degGrid(w: Wave): GridSpec {
  const P = per(w);
  const [xMax, xStep] = P === 90 ? [360, 22.5] : P === 120 ? [360, 30] : P === 180 ? [360, 45] : P === 360 ? [720, 45] : [720, 90];
  const lo = Math.min(0, wMin(w)) - 1;
  const hi = Math.max(0, wMax(w)) + 1;
  const yStep = hi - lo > 13 ? 2 : 1;
  return { xMin: 0, xMax, yMin: Math.floor(lo / yStep) * yStep, yMax: Math.ceil(hi / yStep) * yStep, xStep, yStep, xLabel: 'x (degrees)' };
}
/** A grid for a wave in radians, labelled in multiples of π. */
function radGrid(w: Wave): GridSpec {
  const [xMax, xStep] = w.b === 1 ? [4 * PI, PI / 2] : w.b === 2 ? [2 * PI, PI / 4] : w.b === 3 ? [2 * PI, PI / 6] : [4 * PI, PI / 2];
  const lo = Math.min(0, wMin(w)) - 1;
  const hi = Math.max(0, wMax(w)) + 1;
  const yStep = hi - lo > 13 ? 2 : 1;
  return { xMin: 0, xMax: r3(xMax), yMin: Math.floor(lo / yStep) * yStep, yMax: Math.ceil(hi / yStep) * yStep, xStep, yStep, xPi: true };
}
const waveGraph = (w: Wave) => plot(waveFn(w), w.deg ? degGrid(w) : radGrid(w));

/** True when two waves have the same graph. */
function sameGraph(p: Wave, q: Wave): boolean {
  const f = waveFn(p);
  const g = waveFn(q);
  for (let i = 0; i < 60; i++) {
    const x = p.deg ? i * 13.7 : i * 0.23;
    if (Math.abs(f(x) - g(x)) > 1e-6) return false;
  }
  return true;
}

/** A wave with whole-number features, for reading from a graph. */
function gridWave(rng: Rng, deg: boolean): Wave {
  const a = rng.int(1, 4) * rng.sign();
  const d = rng.int(-2, 5);
  const b = deg ? rng.pick([1, 2, 2, 3, 4, 0.5]) : rng.pick([1, 2, 3, 0.5]);
  return { fn: rng.pick(['sin', 'cos'] as const), a, b, c: 0, d, deg };
}

// ---------------------------------------------------------------------------
// 7.1 — Features: m302-sinusoid-features
// ---------------------------------------------------------------------------

function featGraphBasic(rng: Rng): GenOutput {
  const w = retry(() => gridWave(rng, true), (w) => w.d !== 0 || rng.chance(0.3));
  const M = wMax(w);
  const m = wMin(w);
  return {
    prompt: 'The graph of a sinusoidal function is shown. Determine its maximum value, its minimum value and the equation of its midline.',
    figure: waveGraph(w),
    parts: [numPart(M, { label: 'Maximum value' }), numPart(m, { label: 'Minimum value' }), numPart(w.d, { label: 'Midline: $y =$' })],
    hints: [
      'The maximum and minimum values are the $y$-values of the highest and lowest points on the graph.',
      'The midline is the horizontal line halfway between them: $y = \\dfrac{\\text{max} + \\text{min}}{2}$.',
    ],
    solution: [
      `The highest points are at $y = ${fmt(M)}$, so the maximum value is $${fmt(M)}$.`,
      `The lowest points are at $y = ${fmt(m)}$, so the minimum value is $${fmt(m)}$.`,
      `Midline: $y = \\dfrac{${fmt(M)} + ${pn(m)}}{2} = \\dfrac{${fmt(M + m)}}{2} = ${fmt(w.d)}$`,
      `Maximum $${fmt(M)}$, minimum $${fmt(m)}$, midline $y = ${fmt(w.d)}$.`,
    ],
  };
}

interface RangeCtx {
  text: (lo: string, hi: string) => string;
  make: (rng: Rng) => [number, number];
  unit: string;
}
const RANGE_CTXS: RangeCtx[] = [
  { text: (lo, hi) => `A sinusoidal function has a maximum value of $${hi}$ and a minimum value of $${lo}$.`, make: (rng) => { const lo = rng.int(-6, 4); return [lo, lo + 2 * rng.int(1, 6)]; }, unit: '' },
  { text: (lo, hi) => `The depth of the water at a dock in Prince Rupert rises and falls with the tides, between $${lo}$ m at low tide and $${hi}$ m at high tide.`, make: (rng) => { const lo = rng.float(0.8, 2.4, 1); return [lo, roundTo(lo + rng.float(3.6, 6.4, 1), 1)]; }, unit: 'm' },
  { text: (lo, hi) => `The height of a seat on a Ferris wheel varies between $${lo}$ m and $${hi}$ m above the ground as the wheel turns.`, make: (rng) => { const lo = rng.int(1, 3); return [lo, lo + 2 * rng.int(6, 15)]; }, unit: 'm' },
  { text: (lo, hi) => `A nurse measures a patient's blood pressure. It rises and falls with each heartbeat, between $${lo}$ mmHg and $${hi}$ mmHg (millimetres of mercury).`, make: (rng) => { const lo = rng.int(70, 85); return [lo, lo + rng.int(35, 50)]; }, unit: 'mmHg' },
  { text: (lo, hi) => `A buoy bobs up and down on the waves of a mountain lake. Its height above the lake bottom varies between $${lo}$ m and $${hi}$ m.`, make: (rng) => { const lo = rng.float(4, 7, 1); return [lo, roundTo(lo + rng.float(0.4, 1.8, 1), 1)]; }, unit: 'm' },
  { text: (lo, hi) => `A weather station near Hillcrest recorded average monthly temperatures that vary between $${lo}$°C in the coldest month and $${hi}$°C in the warmest month.`, make: (rng) => { const lo = -rng.float(8, 16, 1); return [lo, roundTo(rng.float(14, 19, 1), 1)]; }, unit: '°C' },
];

function featFromMaxMin(rng: Rng): GenOutput {
  const c = rng.pick(RANGE_CTXS);
  const [lo, hi] = c.make(rng);
  const mid = roundTo((hi + lo) / 2, 4);
  const A = roundTo((hi - lo) / 2, 4);
  const u = c.unit ? ` ${c.unit}` : '';
  return {
    prompt: `${c.text(fmt(lo), fmt(hi))} Determine the equation of the midline and the amplitude.`,
    parts: [numPart(mid, { label: 'Midline: $y =$', display: 'decimal' }), numPart(A, { label: 'Amplitude', suffix: c.unit || undefined, display: 'decimal' })],
    hints: [
      'The midline is halfway between the maximum and the minimum: average them.',
      'The amplitude is the distance from the midline to the maximum: half the distance from the minimum to the maximum.',
    ],
    solution: [
      `Midline: $y = \\dfrac{\\text{max} + \\text{min}}{2} = \\dfrac{${fmt(hi)} + ${pn(lo)}}{2} = ${fmt(mid)}$`,
      `Amplitude $= \\dfrac{\\text{max} - \\text{min}}{2} = \\dfrac{${fmt(hi)} - ${pn(lo)}}{2} = ${fmt(A)}$${u}`,
      `The midline is $y = ${fmt(mid)}$ and the amplitude is $${fmt(A)}$${u}.`,
    ],
  };
}

// Small graphs for "which graph is periodic / sinusoidal?"
const SHAPE_GRID: GridSpec = { xMin: 0, xMax: 12, yMin: -3, yMax: 3, xStep: 1, yStep: 1 };
const shapeFig = (f: (x: number) => number): PlaneFigure => ({ ...plot(f, SHAPE_GRID, { hideTickLabels: true }) });
function polyFig(pts: Array<[number, number]>): PlaneFigure {
  return { type: 'plane', grid: SHAPE_GRID, hideTickLabels: true, polylines: [{ points: pts }] };
}
const triangleWave = (P: number, A: number): Array<[number, number]> => {
  const pts: Array<[number, number]> = [[0, 0]];
  for (let x = P / 4; x < 12; x += P / 2) pts.push([x, (Math.round((x - P / 4) / (P / 2)) % 2 === 0 ? 1 : -1) * A]);
  const last = pts[pts.length - 1];
  const slope = (4 * A) / P;
  pts.push([12, last[1] > 0 ? last[1] - slope * (12 - last[0]) : last[1] + slope * (12 - last[0])]);
  return pts.map(([x, y]) => [r3(x), r3(y)]);
};
const SHAPES = {
  sine: (rng: Rng) => { const P = rng.pick([4, 6]); const A = rng.pick([2, 2.5]); const s = rng.sign(); return shapeFig((x) => s * A * Math.sin((2 * PI * x) / P)); },
  cosine: (rng: Rng) => { const P = rng.pick([4, 6]); const A = rng.pick([1.5, 2]); const d = rng.pick([-0.5, 0.5]); return shapeFig((x) => A * Math.cos((2 * PI * x) / P) + d); },
  triangle: (rng: Rng) => polyFig(triangleWave(rng.pick([4, 6]), rng.pick([2, 2.5]))),
  damped: (rng: Rng) => { const P = rng.pick([3, 4]); return shapeFig((x) => 2.8 * Math.exp(-0.2 * x) * Math.sin((2 * PI * x) / P)); },
  growing: (rng: Rng) => { const P = rng.pick([3, 4]); return shapeFig((x) => 0.35 * Math.exp(0.17 * x) * Math.sin((2 * PI * x) / P)); },
  chirp: (rng: Rng) => { const k = rng.pick([0.09, 0.11]); return shapeFig((x) => 2.2 * Math.sin(k * x * x + 0.3)); },
  parabola: (rng: Rng) => { const s = rng.sign(); return shapeFig((x) => s * (0.15 * (x - 6) ** 2 - 2.5)); },
  exponential: (rng: Rng) => { const s = rng.chance(0.5); return shapeFig((x) => (s ? 0.12 * 1.35 ** x - 2.6 : 2.8 * 0.72 ** x - 2.4)); },
};

function featPeriodic(rng: Rng, sinusoidal: boolean): GenOutput {
  const correctKind = sinusoidal ? rng.pick(['sine', 'cosine'] as const) : rng.pick(['sine', 'cosine', 'triangle'] as const);
  const pool = sinusoidal
    ? ['triangle', 'damped', 'chirp', 'growing'] as const
    : ['damped', 'growing', 'chirp', 'parabola', 'exponential'] as const;
  const wrong = rng.sample(pool.filter((k) => k !== 'triangle' || sinusoidal), 3);
  const options = [
    { md: '', figure: SHAPES[correctKind](rng), correct: true },
    ...wrong.map((k) => ({ md: '', figure: SHAPES[k](rng), correct: false })),
  ];
  const why: Record<string, string> = {
    damped: 'the waves get smaller and smaller, so no part repeats exactly',
    growing: 'the waves get bigger and bigger, so no part repeats exactly',
    chirp: 'the waves get closer and closer together, so the cycle length keeps changing',
    parabola: 'it turns once and never repeats',
    exponential: 'it keeps increasing or decreasing and never repeats',
    triangle: 'it repeats, but its peaks are sharp corners joined by straight lines, not smooth curves',
  };
  return {
    prompt: sinusoidal
      ? 'Which graph shows a sinusoidal function?'
      : 'Which graph shows periodic behaviour (a pattern that repeats over and over at regular intervals)?',
    parts: [part(mcFigures(rng, options))],
    hints: sinusoidal
      ? ['A sinusoidal graph is a smooth wave shaped like the sine curve.', 'Its maximums are all the same height, its minimums are all the same depth, and the cycles are all the same length.']
      : ['Look for a graph where one section (a cycle) repeats exactly, over and over.', 'Check that every cycle has the same height and the same length.'],
    solution: [
      ...wrong.map((k) => `One graph is not ${sinusoidal ? 'sinusoidal' : 'periodic'}: ${why[k]}.`),
      sinusoidal
        ? 'The correct graph is a smooth wave whose cycles all have the same length, the same maximum and the same minimum.'
        : `The correct graph repeats the same cycle at regular intervals${correctKind === 'triangle' ? ' (it is periodic, even though it is not sinusoidal)' : ''}.`,
    ],
  };
}

function featEquation(rng: Rng): GenOutput {
  const deg = rng.chance(0.65);
  const w: Wave = retry(
    () => ({
      fn: rng.pick(['sin', 'cos'] as const),
      a: rng.pick([1, 2, 3, 4, 5, 6, 0.5, 1.5, 2.5]) * (rng.chance(0.3) ? -1 : 1),
      b: deg ? rng.pick([2, 3, 4, 5, 6, 0.5, 1.5]) : rng.pick([2, 3, 4, 0.5]),
      c: deg && rng.chance(0.4) ? rng.pick([30, 45, 60, 90, -30, -45, -60, -90]) : 0,
      d: rng.int(-6, 9),
      deg,
    }),
    (w) => Math.abs(w.a) !== Math.abs(w.d) && w.a !== 1,
  );
  const A = amp(w);
  const correct = setRange(wMin(w), wMax(w));
  const ds = [setRange(-A, A), setRange(w.d - 1, w.d + 1), setRange(Math.min(w.d, w.a), Math.max(w.d, w.a)), setRange(wMin(w) - A, wMax(w) + A), '$\\{y \\mid y \\in \\mathbb{R}\\}$'];
  const P = per(w);
  return {
    prompt: `For $${waveTex(w)}$${deg ? ', where $x$ is in degrees' : ', where $x$ is in radians'}, determine the amplitude, the period, the equation of the midline and the range.${deg ? '' : ' Give the period exactly, in terms of $\\pi$ (type `pi`).'}`,
    parts: [
      numPart(A, { label: 'Amplitude', display: 'decimal' }),
      deg ? numPart(P, { label: 'Period', suffix: '°', display: 'decimal' }) : { label: 'Period', answer: { kind: 'numeric', value: P, allowExpression: true, exact: piText(2 / w.b) } },
      numPart(w.d, { label: 'Midline: $y =$' }),
      { label: 'Range', answer: mc(rng, correct, ds) },
    ],
    hints: [
      `In $y = a\\${w.fn}(bx + c) + d$, the amplitude is $|a|$ and the midline is $y = d$.`,
      `The period is $\\dfrac{${deg ? '360^\\circ' : '2\\pi'}}{b}$. The range goes from the minimum, $d - |a|$, to the maximum, $d + |a|$.`,
    ],
    solution: [
      `Here $a = ${fmt(w.a)}$, $b = ${fmt(w.b)}$${w.c ? `, $c = ${fmt(w.c)}${deg ? '^\\circ' : ''}$` : ''} and $d = ${fmt(w.d)}$.`,
      `Amplitude: $|a| = |${fmt(w.a)}| = ${fmt(A)}$${w.a < 0 ? ' (the amplitude is a distance, so it is never negative)' : ''}`,
      `Period: $${perWork(w)}$${w.c ? `. The value of $c$ shifts the graph sideways but does not change the period.` : ''}`,
      `Midline: $y = ${fmt(w.d)}$`,
      `Maximum $= ${fmt(w.d)} + ${fmt(A)} = ${fmt(wMax(w))}$ and minimum $= ${fmt(w.d)} - ${fmt(A)} = ${fmt(wMin(w))}$, so the range is ${correct}.`,
    ],
  };
}

interface TimeCtx {
  intro: (name: string) => string;
  xLabel: string;
  yLabel: string;
  xUnit: string;
  yUnit: string;
  make: (rng: Rng) => { M: number; A: number; T: number; xStep: number; yStep: number; xMax: number; shape: 'max' | 'min' | 'up' | 'down'; t0: number };
}
const TIME_CTXS: TimeCtx[] = [
  {
    intro: () => 'The graph shows the depth of the water at a dock over two days.',
    xLabel: 'Time (h)', yLabel: 'Depth (m)', xUnit: 'h', yUnit: 'm',
    make: (rng) => ({ M: rng.int(4, 6), A: rng.int(2, 3), T: 12, xStep: 2, yStep: 1, xMax: 48, shape: rng.pick(['max', 'min'] as const), t0: rng.pick([2, 4]) }),
  },
  {
    intro: (n) => `${n} rides a Ferris wheel. The graph shows ${n}'s height above the ground.`,
    xLabel: 'Time (s)', yLabel: 'Height (m)', xUnit: 's', yUnit: 'm',
    make: (rng) => { const R = rng.pick([8, 10, 12, 14, 16]); const T = rng.pick([40, 60, 80]); return { M: R + 4, A: R, T, xStep: T / 8, yStep: 4, xMax: 2 * T, shape: 'min', t0: 0 }; },
  },
  {
    intro: (n) => `The graph shows the height of a pedal above the ground as ${n} rides a bicycle at a steady pace.`,
    xLabel: 'Time (s)', yLabel: 'Height (cm)', xUnit: 's', yUnit: 'cm',
    make: (rng) => { const [M, A] = rng.pick([[30, 15], [30, 20], [35, 15]] as Array<[number, number]>); const T = rng.pick([0.8, 1.2, 1.6]); return { M, A, T, xStep: T / 8, yStep: 5, xMax: 2 * T, shape: rng.pick(['max', 'min', 'up'] as const), t0: 0 }; },
  },
  {
    intro: () => 'A buoy bobs up and down on the waves. The graph shows its height above the lake bottom.',
    xLabel: 'Time (s)', yLabel: 'Height (m)', xUnit: 's', yUnit: 'm',
    make: (rng) => { const T = rng.pick([4, 6, 8]); return { M: rng.int(5, 7), A: rng.pick([1, 2]), T, xStep: T / 4, yStep: 1, xMax: 3 * T, shape: rng.pick(['up', 'down', 'max'] as const), t0: 0 }; },
  },
  {
    intro: () => 'The graph shows the temperature in a greenhouse over two days.',
    xLabel: 'Time (h)', yLabel: 'Temperature (°C)', xUnit: 'h', yUnit: '°C',
    make: (rng) => ({ M: 2 * rng.int(7, 11), A: rng.pick([4, 6, 8]), T: 24, xStep: 3, yStep: 2, xMax: 48, shape: 'max', t0: rng.pick([12, 15]) }),
  },
];

function featTimeGraph(rng: Rng): GenOutput {
  const c = rng.pick(TIME_CTXS);
  const o = c.make(rng);
  const name = rng.pick(NAMES);
  const k = (2 * PI) / o.T;
  const f = (t: number) => {
    const u = k * (t - o.t0);
    return o.shape === 'max' ? o.A * Math.cos(u) + o.M : o.shape === 'min' ? -o.A * Math.cos(u) + o.M : o.shape === 'up' ? o.A * Math.sin(u) + o.M : -o.A * Math.sin(u) + o.M;
  };
  const lo = o.M - o.A;
  const hi = o.M + o.A;
  const yMin = lo >= 0 ? 0 : Math.floor((lo - o.yStep) / o.yStep) * o.yStep;
  const grid: GridSpec = { xMin: 0, xMax: r3(o.xMax), yMin, yMax: Math.ceil((hi + o.yStep) / o.yStep) * o.yStep, xStep: o.xStep, yStep: o.yStep, xLabel: c.xLabel, yLabel: c.yLabel };
  const firstMax = (() => {
    for (let i = 0; i <= 400; i++) {
      const t = (o.T * i) / 400;
      if (Math.abs(f(t) - hi) < 1e-6) return t;
    }
    return o.T / 2;
  })();
  const fM = r3(firstMax);
  const sU = c.yUnit === '°C' ? '°C' : ` ${c.yUnit}`;
  return {
    prompt: `${c.intro(name)} Determine the period, the amplitude and the equation of the midline.`,
    figure: plot(f, grid),
    parts: [
      numPart(o.T, { label: 'Period', suffix: c.xUnit, display: 'decimal' }),
      numPart(o.A, { label: 'Amplitude', suffix: c.yUnit, display: 'decimal' }),
      numPart(o.M, { label: 'Midline: $y =$', display: 'decimal' }),
    ],
    hints: [
      'The period is the horizontal length of one cycle: for example, from one maximum to the next.',
      'Read the maximum and minimum values. The midline is their average, and the amplitude is half their difference.',
    ],
    solution: [
      `The graph reaches a maximum at $${fmt(fM)}$ ${c.xUnit} and again at $${fmt(r3(fM + o.T))}$ ${c.xUnit}, so the period is $${fmt(r3(fM + o.T))} - ${fmt(fM)} = ${fmt(o.T)}$ ${c.xUnit}.`,
      `The maximum is $${fmt(hi)}$${sU} and the minimum is $${fmt(lo)}$${sU}.`,
      `Midline: $y = \\dfrac{${fmt(hi)} + ${fmt(lo)}}{2} = ${fmt(o.M)}$. Amplitude: $\\dfrac{${fmt(hi)} - ${fmt(lo)}}{2} = ${fmt(o.A)}$${sU}.`,
      `Period $${fmt(o.T)}$ ${c.xUnit}, amplitude $${fmt(o.A)}$${sU}, midline $y = ${fmt(o.M)}$.`,
    ],
  };
}

function featRadGraph(rng: Rng): GenOutput {
  const w = retry(() => gridWave(rng, false), (w) => Math.abs(w.a) !== Math.abs(w.d));
  const k = 2 / w.b;
  return {
    prompt: 'The graph of a sinusoidal function is shown, with $x$ in radians. Determine its amplitude, its period and the equation of its midline. Give the period exactly, in terms of $\\pi$ (type `pi`, for example `2pi/3`).',
    figure: waveGraph(w),
    parts: [
      numPart(amp(w), { label: 'Amplitude' }),
      { label: 'Period', answer: { kind: 'numeric', value: k * PI, allowExpression: true, exact: piText(k) } },
      numPart(w.d, { label: 'Midline: $y =$' }),
    ],
    hints: [
      'Read the maximum and minimum values. The midline is halfway between them and the amplitude is the distance from the midline to a maximum.',
      'For the period, find two neighbouring maximums (or minimums) and read the horizontal distance between them on the $\\pi$ scale.',
    ],
    solution: [
      `The maximum is $${fmt(wMax(w))}$ and the minimum is $${fmt(wMin(w))}$.`,
      `Midline: $y = \\dfrac{${fmt(wMax(w))} + ${pn(wMin(w))}}{2} = ${fmt(w.d)}$. Amplitude: $\\dfrac{${fmt(wMax(w))} - ${pn(wMin(w))}}{2} = ${fmt(amp(w))}$.`,
      `One complete cycle covers a horizontal distance of $${piTex(k)}$, so the period is $${piTex(k)}$ (about $${fmt(k * PI, 2)}$).`,
      `Amplitude $${fmt(amp(w))}$, period $${piTex(k)}$, midline $y = ${fmt(w.d)}$.`,
    ],
  };
}

const NICE_C = [0, 30, 90, 150, 180, 210, 270, 330];

function featStatements(rng: Rng): GenOutput {
  const w: Wave = retry(
    () => ({ fn: 'sin', a: rng.pick([2, 3, 4, 5, 6]) * (rng.chance(0.35) ? -1 : 1), b: rng.pick([2, 3, 4, 0.5]), c: rng.pick(NICE_C), d: rng.int(-5, 7), deg: true }),
    (w) => Math.abs(Math.abs(w.a) - Math.abs(w.d)) > 0.5 && w.d !== 0,
  );
  const A = amp(w);
  const P = per(w);
  const yInt = roundTo(w.a * Math.sin(w.c * DEG) + w.d, 6);
  const crosses = Math.abs(w.d) < A;
  const pool = [
    { md: `The amplitude is $${fmt(A)}$.`, correct: true },
    { md: `The amplitude is $${fmt(2 * A)}$.`, correct: false },
    { md: `The period is $${fmt(P)}^\\circ$.`, correct: true },
    { md: `The period is $${fmt(360 * w.b)}^\\circ$.`, correct: false },
    { md: `The midline is $y = ${fmt(w.d)}$.`, correct: true },
    { md: `The midline is $y = ${fmt(w.a)}$.`, correct: false },
    { md: `The maximum value is $${fmt(wMax(w))}$.`, correct: true },
    { md: `The maximum value is $${fmt(A)}$.`, correct: false },
    { md: `The $y$-intercept is $${fmt(yInt)}$.`, correct: true },
    ...(Math.abs(yInt - (w.a + w.d)) > 1e-9 ? [{ md: `The $y$-intercept is $${fmt(w.a + w.d)}$.`, correct: false }] : []),
    { md: crosses ? 'The graph crosses the $x$-axis.' : 'The graph never crosses the $x$-axis.', correct: true },
    { md: crosses ? 'The graph never crosses the $x$-axis.' : 'The graph crosses the $x$-axis.', correct: false },
  ];
  const trues = rng.sample(pool.filter((p) => p.correct), rng.int(2, 3));
  const falses = rng.sample(pool.filter((p) => !p.correct), 5 - trues.length);
  const chosen = [...trues, ...falses];
  return {
    prompt: `Select all the statements that are true for $${waveTex(w)}$, where $x$ is in degrees.`,
    parts: [part(multi(rng, chosen))],
    hints: [
      'In $y = a\\sin(bx + c) + d$: the amplitude is $|a|$, the period is $\\dfrac{360^\\circ}{b}$, the midline is $y = d$, the maximum is $d + |a|$ and the minimum is $d - |a|$.',
      'For the $y$-intercept, substitute $x = 0$. The graph crosses the $x$-axis only if the minimum is below $0$ and the maximum is above $0$.',
    ],
    solution: [
      `Amplitude $= |${fmt(w.a)}| = ${fmt(A)}$; period $= \\dfrac{360^\\circ}{${fmt(w.b)}} = ${fmt(P)}^\\circ$; midline $y = ${fmt(w.d)}$.`,
      `Maximum $= ${fmt(w.d)} + ${fmt(A)} = ${fmt(wMax(w))}$; minimum $= ${fmt(w.d)} - ${fmt(A)} = ${fmt(wMin(w))}$.`,
      `$y$-intercept: $y = ${fmt(w.a)}\\sin(${fmt(w.c)}^\\circ) ${plus(w.d)} = ${fmt(w.a)}(${fmt(roundTo(Math.sin(w.c * DEG), 6))}) ${plus(w.d)} = ${fmt(yInt)}$`,
      crosses ? `The minimum $${fmt(wMin(w))}$ is below $0$ and the maximum $${fmt(wMax(w))}$ is above $0$, so the graph crosses the $x$-axis.` : `The graph stays between $${fmt(wMin(w))}$ and $${fmt(wMax(w))}$, which ${wMin(w) > 0 ? 'are both positive' : 'are both negative'}, so it never crosses the $x$-axis.`,
      `The true statements are: ${chosen.filter((c) => c.correct).map((c) => c.md.replace(/\.$/, '')).join('; ')}.`,
    ],
  };
}

function wrongWaves(w: Wave): Wave[] {
  const out: Wave[] = [
    { ...w, a: w.d, d: w.a },
    { ...w, b: 1 / w.b },
    { ...w, a: -w.a },
    { ...w, fn: w.fn === 'sin' ? 'cos' : 'sin' },
    { ...w, d: -w.d },
    { ...w, a: w.a > 0 ? w.a + 1 : w.a - 1 },
  ];
  return out.filter((q) => q.a !== 0 && [0.5, 1, 2, 3, 4].includes(q.b));
}

function featMatchEq(rng: Rng): GenOutput {
  const w = retry(() => gridWave(rng, true), (w) => w.d !== 0 && Math.abs(w.a) !== Math.abs(w.d) && w.b !== 3);
  const pool = wrongWaves(w).filter((q) => !sameGraph(q, w));
  const ds: Wave[] = [];
  for (const q of rng.shuffle(pool)) if (ds.length < 3 && !ds.some((x) => sameGraph(x, q))) ds.push(q);
  const correct = `$${waveTex(w)}$`;
  return {
    prompt: 'Which equation matches the graph? ($x$ is in degrees.)',
    figure: waveGraph(w),
    parts: [part(mc(rng, correct, ds.map((q) => `$${waveTex(q)}$`)))],
    hints: [
      'Read the maximum and minimum to find the midline $y = d$ and the amplitude $|a|$.',
      `Read the period from the graph, then $b = \\dfrac{360^\\circ}{\\text{period}}$. Check the $y$-intercept to decide between sine and cosine and the sign of $a$.`,
    ],
    solution: [
      `The maximum is $${fmt(wMax(w))}$ and the minimum is $${fmt(wMin(w))}$, so the midline is $y = ${fmt(w.d)}$ and the amplitude is $${fmt(amp(w))}$.`,
      `One cycle is $${fmt(per(w))}^\\circ$ long, so $b = \\dfrac{360^\\circ}{${fmt(per(w))}^\\circ} = ${fmt(w.b)}$.`,
      w.fn === 'sin'
        ? `At $x = 0$ the graph is on the midline and moving ${w.a > 0 ? 'up' : 'down'}, like ${w.a > 0 ? 'a sine curve' : 'a sine curve reflected in the midline'}, so the equation uses $\\sin$ with $a = ${fmt(w.a)}$.`
        : `At $x = 0$ the graph is at a ${w.a > 0 ? 'maximum' : 'minimum'}, like ${w.a > 0 ? 'a cosine curve' : 'a cosine curve reflected in the midline'}, so the equation uses $\\cos$ with $a = ${fmt(w.a)}$.`,
      `The equation is ${correct}.`,
    ],
  };
}

function featMatchGraph(rng: Rng): GenOutput {
  const w = retry(() => gridWave(rng, true), (w) => w.d !== 0 && Math.abs(w.a) !== Math.abs(w.d) && w.b !== 3);
  const pool = wrongWaves(w).filter((q) => !sameGraph(q, w));
  const ds: Wave[] = [];
  for (const q of rng.shuffle(pool)) if (ds.length < 3 && !ds.some((x) => sameGraph(x, q))) ds.push(q);
  const all = [w, ...ds];
  // One shared window so the graphs can be compared.
  const grids = all.map(degGrid);
  const grid: GridSpec = {
    ...grids[0],
    xMax: Math.max(...grids.map((g) => g.xMax)),
    xStep: Math.max(...grids.map((g) => g.xStep ?? 45)),
    yMin: Math.min(...grids.map((g) => g.yMin)),
    yMax: Math.max(...grids.map((g) => g.yMax)),
  };
  grid.yStep = grid.yMax - grid.yMin > 13 ? 2 : 1;
  grid.yMin = Math.floor(grid.yMin / grid.yStep) * grid.yStep;
  grid.yMax = Math.ceil(grid.yMax / grid.yStep) * grid.yStep;
  const options = all.map((q, i) => ({ md: '', figure: plot(waveFn(q), grid), correct: i === 0 }));
  return {
    prompt: `Which graph shows $${waveTex(w)}$, where $x$ is in degrees?`,
    parts: [part(mcFigures(rng, options))],
    hints: [
      `The midline is $y = ${fmt(w.d)}$ and the amplitude is $${fmt(amp(w))}$: which graphs go from $${fmt(wMin(w))}$ to $${fmt(wMax(w))}$?`,
      `The period is $\\dfrac{360^\\circ}{${fmt(w.b)}} = ${fmt(per(w))}^\\circ$. Then check where the graph starts at $x = 0$.`,
    ],
    solution: [
      `Midline $y = ${fmt(w.d)}$ and amplitude $${fmt(amp(w))}$, so the graph runs from a minimum of $${fmt(wMin(w))}$ to a maximum of $${fmt(wMax(w))}$.`,
      `Period: $${perWork(w)}$`,
      `At $x = 0$: $y = ${fmt(w.a)}\\${w.fn}(0^\\circ) ${plus(w.d)} = ${fmt(waveFn(w)(0))}$, ${w.fn === 'sin' ? `on the midline, moving ${w.a > 0 ? 'up' : 'down'}` : `at a ${w.a > 0 ? 'maximum' : 'minimum'}`}.`,
      `The correct graph has all of these features: midline $y = ${fmt(w.d)}$, amplitude $${fmt(amp(w))}$, period $${fmt(per(w))}^\\circ$ and $y$-intercept $${fmt(waveFn(w)(0))}$.`,
    ],
  };
}

function featContext(rng: Rng): GenOutput {
  const kind = rng.pick(['tide', 'wheel', 'pressure', 'ferris', 'tire'] as const);
  const name = rng.pick(NAMES);
  if (kind === 'tide') {
    const lo = rng.float(0.6, 2.2, 1);
    const hi = roundTo(lo + rng.float(4, 9, 1), 1);
    const place = rng.pick(['Saint John, New Brunswick', 'Prince Rupert, British Columbia', 'a harbour on the Bay of Fundy', 'Churchill, Manitoba']);
    const hour = rng.int(1, 5);
    return {
      prompt: `At a dock in ${place}, high tide on one day is at ${hour}:00 a.m., when the water is $${fmt(hi)}$ m deep. The next low tide is $6.2$ hours later, when the water is $${fmt(lo)}$ m deep. The depth can be modelled by a sinusoidal function. Determine the amplitude, the equation of the midline and the period.`,
      parts: [
        numPart(roundTo((hi - lo) / 2, 4), { label: 'Amplitude', suffix: 'm', display: 'decimal' }),
        numPart(roundTo((hi + lo) / 2, 4), { label: 'Midline: $y =$', display: 'decimal' }),
        numPart(12.4, { label: 'Period', suffix: 'h', display: 'decimal' }),
      ],
      hints: ['The midline is halfway between the high-tide and low-tide depths, and the amplitude is half the difference.', 'From high tide to low tide is only half a cycle. A full cycle goes from high tide back to high tide.'],
      solution: [
        `Amplitude $= \\dfrac{${fmt(hi)} - ${fmt(lo)}}{2} = ${fmt(roundTo((hi - lo) / 2, 4))}$ m`,
        `Midline: $y = \\dfrac{${fmt(hi)} + ${fmt(lo)}}{2} = ${fmt(roundTo((hi + lo) / 2, 4))}$`,
        'High tide to low tide is half a cycle, so the period is $2 \\times 6.2 = 12.4$ h. (The next high tide is $12.4$ h after the first.)',
        `Amplitude $${fmt(roundTo((hi - lo) / 2, 4))}$ m, midline $y = ${fmt(roundTo((hi + lo) / 2, 4))}$, period $12.4$ h.`,
      ],
    };
  }
  if (kind === 'wheel') {
    const r = rng.int(2, 5);
    const h = rng.pick([1, 1.5, 2, 2.5, 3].filter((v) => v < r));
    const T = rng.pick([8, 10, 12, 15, 20, 24]);
    return {
      prompt: `A water wheel at a heritage park has a radius of $${r}$ m. Its centre is $${fmt(h)}$ m above the surface of the water, and it makes one rotation every $${T}$ s. The height of a paddle tip above the water is a sinusoidal function of time. Determine the maximum height, the minimum height, the amplitude and the period. (A negative height means the paddle is under water.)`,
      parts: [
        numPart(r + h, { label: 'Maximum height', suffix: 'm', display: 'decimal' }),
        numPart(h - r, { label: 'Minimum height', suffix: 'm', display: 'decimal' }),
        numPart(r, { label: 'Amplitude', suffix: 'm' }),
        numPart(T, { label: 'Period', suffix: 's' }),
      ],
      hints: ['The centre of the wheel is on the midline. The tip goes one radius above the centre and one radius below it.', 'The period is the time for one complete rotation.'],
      solution: [
        `The midline is the height of the centre: $y = ${fmt(h)}$.`,
        `Maximum $= ${fmt(h)} + ${r} = ${fmt(h + r)}$ m; minimum $= ${fmt(h)} - ${r} = ${fmt(h - r)}$ m (below the surface, under water).`,
        `The amplitude is the radius, $${r}$ m, and the period is the time for one rotation, $${T}$ s.`,
        `Maximum $${fmt(h + r)}$ m, minimum $${fmt(h - r)}$ m, amplitude $${r}$ m, period $${T}$ s.`,
      ],
    };
  }
  if (kind === 'pressure') {
    const lo = rng.int(72, 85);
    const hi = lo + 2 * rng.int(18, 24);
    const N = retry(() => rng.pick([60, 64, 66, 70, 72, 75, 78, 80, 84, 90]), (n) => clear(60 / n, 2));
    const P = 60 / N;
    return {
      prompt: `${name}'s blood pressure rises and falls with each heartbeat, between $${lo}$ mmHg and $${hi}$ mmHg (millimetres of mercury). ${name}'s heart beats $${N}$ times per minute. Model the blood pressure as a sinusoidal function of time and determine the amplitude, the equation of the midline and the period in seconds, ${roundingPhrase(2)}.`,
      parts: [
        numPart((hi - lo) / 2, { label: 'Amplitude', suffix: 'mmHg' }),
        numPart((hi + lo) / 2, { label: 'Midline: $y =$', display: 'decimal' }),
        numPart(P, { label: 'Period', suffix: 's', decimals: 2 }),
      ],
      calculator: true,
      hints: ['The amplitude is half the difference between the highest and lowest pressures; the midline is their average.', `One heartbeat is one cycle. $${N}$ beats take $60$ s, so one beat takes $\\dfrac{60}{${N}}$ s.`],
      solution: [
        `Amplitude $= \\dfrac{${hi} - ${lo}}{2} = ${fmt((hi - lo) / 2)}$ mmHg`,
        `Midline: $y = \\dfrac{${hi} + ${lo}}{2} = ${fmt((hi + lo) / 2)}$`,
        `Period $= \\dfrac{60 \\text{ s}}{${N}} = ${work(P)}$ s, about $${fmtFixed(P, 2)}$ s.`,
        `Amplitude $${fmt((hi - lo) / 2)}$ mmHg, midline $y = ${fmt((hi + lo) / 2)}$, period about $${fmtFixed(P, 2)}$ s.`,
      ],
    };
  }
  if (kind === 'ferris') {
    const D = 2 * rng.int(8, 30);
    const p = rng.pick([1, 1.5, 2, 3]);
    const T = rng.pick([45, 60, 75, 90, 120]);
    return {
      prompt: `A Ferris wheel at a summer fair has a diameter of $${D}$ m. Riders board at the bottom, from a platform $${fmt(p)}$ m above the ground, and the wheel makes one rotation every $${T}$ s. Determine the maximum height of a rider, the amplitude, the equation of the midline and the period of the rider's height.`,
      parts: [
        numPart(D + p, { label: 'Maximum height', suffix: 'm', display: 'decimal' }),
        numPart(D / 2, { label: 'Amplitude', suffix: 'm' }),
        numPart(D / 2 + p, { label: 'Midline: $y =$', display: 'decimal' }),
        numPart(T, { label: 'Period', suffix: 's' }),
      ],
      hints: ['The lowest height is the platform height. The highest point is one diameter above it.', 'The amplitude is the radius, and the midline is the height of the centre of the wheel.'],
      solution: [
        `Minimum height $= ${fmt(p)}$ m. Maximum height $= ${fmt(p)} + ${D} = ${fmt(D + p)}$ m.`,
        `Amplitude $=$ radius $= \\dfrac{${D}}{2} = ${D / 2}$ m.`,
        `Midline: $y = ${fmt(p)} + ${D / 2} = ${fmt(D / 2 + p)}$ (the height of the centre).`,
        `Period $= ${T}$ s. Maximum $${fmt(D + p)}$ m, amplitude $${D / 2}$ m, midline $y = ${fmt(D / 2 + p)}$, period $${T}$ s.`,
      ],
    };
  }
  const Dcm = rng.pick([60, 64, 66, 70, 72]);
  const n = rng.pick([2, 4, 5]);
  return {
    prompt: `A small stone is stuck in the tread of a bicycle tire with a diameter of $${Dcm}$ cm. As ${name} rides, the wheel turns $${n}$ times per second. The height of the stone above the ground is a sinusoidal function of time. Determine the amplitude, the equation of the midline and the period in seconds.`,
    parts: [
      numPart(Dcm / 2, { label: 'Amplitude', suffix: 'cm' }),
      numPart(Dcm / 2, { label: 'Midline: $y =$' }),
      numPart(1 / n, { label: 'Period', suffix: 's', display: 'decimal' }),
    ],
    hints: ['The stone touches the ground (height $0$) at the bottom and is one diameter up at the top.', `The wheel turns $${n}$ times in $1$ s, so one turn takes $\\dfrac{1}{${n}}$ s.`],
    solution: [
      `Minimum $0$ cm, maximum $${Dcm}$ cm.`,
      `Amplitude $= \\dfrac{${Dcm} - 0}{2} = ${Dcm / 2}$ cm, and the midline is $y = ${Dcm / 2}$ (the height of the axle).`,
      `Period $= \\dfrac{1}{${n}}$ s $= ${fmt(1 / n)}$ s.`,
      `Amplitude $${Dcm / 2}$ cm, midline $y = ${Dcm / 2}$, period $${fmt(1 / n)}$ s.`,
    ],
  };
}

const sinusoidFeatures = skill({
  id: 'm302-sinusoid-features',
  name: 'Characteristics of sinusoidal functions',
  description: 'Recognize periodic behaviour and identify the amplitude, period, midline, maximum, minimum and range of sinusoidal functions from graphs, equations y = a sin(bx + c) + d and descriptions.',
  outcomes: ['RF8'],
  lessonId: 'm302-7-1',
  gen(rng, d) {
    const kind = byDifficulty(
      d,
      rng.pick(['graphBasic', 'graphBasic', 'maxMin', 'maxMin', 'periodic'] as const),
      rng.pick(['equation', 'equation', 'timeGraph', 'timeGraph', 'radGraph', 'sinusoidal'] as const),
      rng.pick(['statements', 'matchEq', 'matchGraph', 'context', 'context'] as const),
    );
    switch (kind) {
      case 'graphBasic': return featGraphBasic(rng);
      case 'maxMin': return featFromMaxMin(rng);
      case 'periodic': return featPeriodic(rng, false);
      case 'sinusoidal': return featPeriodic(rng, true);
      case 'equation': return featEquation(rng);
      case 'timeGraph': return featTimeGraph(rng);
      case 'radGraph': return featRadGraph(rng);
      case 'statements': return featStatements(rng);
      case 'matchEq': return featMatchEq(rng);
      case 'matchGraph': return featMatchGraph(rng);
      default: return featContext(rng);
    }
  },
});

// ---------------------------------------------------------------------------
// 7.2 — Sinusoidal regression models: m302-sinusoid-model
// ---------------------------------------------------------------------------

const MONTHS: Array<[string, number]> = [
  ['January', 31], ['February', 28], ['March', 31], ['April', 30], ['May', 31], ['June', 30],
  ['July', 31], ['August', 31], ['September', 30], ['October', 31], ['November', 30], ['December', 31],
];
/** Day n of a (non-leap) year as a date. */
function dateOf(n: number): string {
  let k = ((n - 1) % 365) + 1;
  for (const [m, len] of MONTHS) {
    if (k <= len) return `${m} ${k}`;
    k -= len;
  }
  return `day ${n}`;
}
/** t hours after midnight as a clock time. */
function clock(t: number): string {
  const day = Math.floor(t / 24);
  const h = t - 24 * day;
  let hh = Math.floor(h + 1e-9);
  let mm = Math.round((h - hh) * 60);
  if (mm === 60) {
    hh += 1;
    mm = 0;
  }
  const ap = hh % 24 < 12 ? 'a.m.' : 'p.m.';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, '0')} ${ap}${day === 1 ? ' the next day' : ''}`;
}
const monthName = (m: number) => MONTHS[((Math.round(m) - 1) % 12 + 12) % 12][0];

interface Interp {
  max: string;
  min: string;
  avg: string;
  amp: string;
  range: string;
  period: string;
}

interface Model {
  kind: 'tide' | 'daylight' | 'ferris' | 'temp' | 'lungs';
  intro: string;
  f: string;
  v: string;
  a: number;
  b: number;
  c: number;
  d: number;
  qty: string;
  unit: string;
  /** Rounding for values of the function. */
  dp: number;
  /** Rounding for times, and for the period. */
  xDp: number;
  pDp: number;
  xUnit: string;
  xWords: string;
  lo: number;
  hi: number;
  when: (x: number) => string;
  pickX: (rng: Rng) => number;
  /** A time a little beyond the data, and what it means. */
  far: (rng: Rng) => { x: number; words: string; ok: string[]; correct: number };
  mean: Interp;
}

const valuePhrase = (m: Model) => (m.unit === '°C' ? 'to the nearest tenth of a degree' : m.unit === 'h' ? 'to the nearest tenth of an hour' : m.unit === 'L' ? 'to the nearest hundredth of a litre' : `to the nearest ${m.dp === 1 ? 'tenth' : 'hundredth'} of a metre`);
const timePhrase = (m: Model, dp = m.xDp) => (m.xUnit === 'days' ? 'to the nearest day' : m.xUnit === 'h' ? `to the nearest ${dp === 1 ? 'tenth' : 'hundredth'} of an hour` : m.xUnit === 's' ? `to the nearest ${dp === 0 ? 'second' : dp === 1 ? 'tenth of a second' : 'hundredth of a second'}` : roundingPhrase(dp));
const uS = (m: Model) => (m.unit === '°C' ? '°C' : ` ${m.unit}`);

const DAYLIGHT: Array<[string, number, number, number]> = [
  ['Pinewood', 5.07, 12.16, 3],
  ['Riverton', 4.88, 12.19, 1],
  ['Brookfield', 4.31, 12.18, 1],
  ['Clearwater', 5.62, 12.21, 1],
  ['Ashford', 4.05, 12.17, 1],
  ['Northgate', 6.38, 12.3, 1],
];
const TEMPS: Array<[string, number, number]> = [
  ['Riverton', 14.0, 3.5], ['Brookfield', 11.8, 4.3], ['Pinewood', 14.6, 2.1], ['Clearwater', 16.8, 1.0],
  ['Hillcrest', 13.1, 3.2], ['Ashford', 11.3, 5.9], ['Westbury', 13.6, 6.1], ['Stonebridge', 11.6, 3.1],
];

function makeModel(rng: Rng, kinds: Model['kind'][] = ['tide', 'daylight', 'daylight', 'ferris', 'temp', 'lungs']): Model {
  const kind = rng.pick(kinds);
  const name = rng.pick(NAMES);
  if (kind === 'tide') {
    const [place, aR, dR] = rng.pick([
      ['Saint John, New Brunswick', [3.2, 4.0], [4.2, 4.7]],
      ['Hopewell Rocks, New Brunswick', [5.4, 6.6], [6.8, 7.6]],
      ['Prince Rupert, British Columbia', [2.3, 3.1], [3.6, 4.1]],
      ['Churchill, Manitoba', [1.6, 2.2], [2.4, 2.8]],
    ] as Array<[string, [number, number], [number, number]]>);
    const a = rng.float(aR[0], aR[1], 2);
    const d = rng.float(dR[0], dR[1], 2);
    const c = retry(() => rng.float(-3, 3, 2), (c) => Math.abs(c) > 0.1);
    return {
      kind, f: 'h', v: 't', a, b: 0.506, c, d,
      intro: `${name} downloaded the water level at a dock in ${place} every hour for one day and used sinusoidal regression to get the model below, where $h$ is the water level in metres and $t$ is the time in hours after midnight (the data covers $0 \\le t \\le 24$).`,
      qty: 'water level', unit: 'm', dp: 2, xDp: 1, pDp: 1, xUnit: 'h', xWords: 'hours', lo: 0, hi: 24,
      when: (x) => `at ${clock(x)} ($t = ${fmt(x)}$)`,
      pickX: (r) => r.int(1, 23),
      far: (r) => {
        const x = r.int(27, 45);
        return {
          x, words: `at ${clock(x)} ($t = ${x}$)`, correct: 0,
          ok: [
            'Reasonable as an estimate: tides repeat about every 12.4 hours, although weather and the monthly tide cycle change the heights a little',
            'Not reasonable: a model can never be used outside the data',
            'Exactly right: the water level will be exactly this value',
          ],
        };
      },
      mean: {
        max: 'the water level at high tide', min: 'the water level at low tide', avg: 'the mean water level, halfway between high tide and low tide',
        amp: 'half the difference between the water levels at high tide and low tide', range: 'the difference between the water levels at high tide and low tide', period: 'the time from one high tide to the next',
      },
    };
  }
  if (kind === 'daylight') {
    const [city, a0, d0] = rng.weighted(DAYLIGHT.map((x) => [x, x[3]] as const));
    const c = rng.pick([-1.41, -1.4, -1.39, -1.38, -1.37]);
    return {
      kind, f: 'L', v: 'n', a: roundTo(a0 + rng.pick([-0.02, -0.01, 0, 0.01, 0.02]), 2), b: 0.0172, c, d: d0,
      intro: `${name} used sunrise and sunset times for ${city} to find the number of hours of daylight on many days of one year, then used sinusoidal regression to get the model below. $L$ is the number of hours of daylight and $n$ is the day of the year ($n = 1$ is January 1; the data covers one year, $1 \\le n \\le 365$).`,
      qty: 'number of hours of daylight', unit: 'h', dp: 1, xDp: 0, pDp: 0, xUnit: 'days', xWords: 'days', lo: 1, hi: 365,
      when: (x) => `on ${dateOf(x)} (day $${x}$)`,
      pickX: (r) => r.int(5, 360),
      far: (r) => {
        const x = r.int(380, 700);
        return {
          x, words: `on ${dateOf(x)} of the next year (day $${x}$)`, correct: 0,
          ok: [
            'Reasonable: the pattern of daylight repeats every year',
            'Not reasonable: a model can never be used outside the data',
            'Not reasonable: daylight keeps increasing from year to year',
          ],
        };
      },
      mean: {
        max: 'the number of hours of daylight on the longest day', min: 'the number of hours of daylight on the shortest day', avg: 'the average number of hours of daylight, halfway between the longest and shortest days',
        amp: 'half the difference between the longest and shortest days', range: 'the difference between the longest and shortest days', period: 'the length of one year in days',
      },
    };
  }
  if (kind === 'ferris') {
    const place = rng.pick(['a summer rodeo', 'the city exhibition in Riverton', 'a summer fair in Westbury', 'a county fair in Hillcrest', 'a carnival in Ashford']);
    const T = rng.pick([36, 40, 45, 48, 60, 72, 75, 90]);
    const R = rng.int(6, 20);
    const N = rng.int(3, 5);
    const a = roundTo(R + rng.float(-0.15, 0.15, 2), 2);
    return {
      kind, f: 'h', v: 't', a, b: roundTo((2 * PI) / T, 4), c: roundTo(-PI / 2 + rng.float(-0.06, 0.06, 2), 2), d: roundTo(a + rng.float(1, 2.5, 2), 2),
      intro: `${name} rode the Ferris wheel at ${place} with a phone app that recorded height every second. The ride lasted ${N} rotations ($0 \\le t \\le ${N * T}$). Sinusoidal regression gives the model below, where $h$ is the height above the ground in metres and $t$ is the time in seconds after the ride started.`,
      qty: 'height', unit: 'm', dp: 1, xDp: 1, pDp: 0, xUnit: 's', xWords: 'seconds', lo: 0, hi: N * T,
      when: (x) => `at $t = ${fmt(x)}$ s`,
      pickX: (r) => r.int(3, N * T - 3),
      far: (r) => {
        const mins = r.int(15, 40);
        return {
          x: 60 * mins, words: `$${mins}$ minutes after the ride started ($t = ${60 * mins}$ s)`, correct: 0,
          ok: [
            `Not reasonable: the ride ended after ${N} rotations, so the model no longer applies`,
            'Reasonable: the wheel always keeps turning at the same speed',
            'Reasonable: it is an interpolation inside the data',
          ],
        };
      },
      mean: {
        max: "the rider's greatest height", min: "the rider's least height, at the bottom of the wheel", avg: 'the height of the centre of the wheel',
        amp: 'the radius of the wheel', range: 'the diameter of the wheel', period: 'the time for one rotation of the wheel',
      },
    };
  }
  if (kind === 'temp') {
    const [city, a0, d0] = rng.pick(TEMPS);
    return {
      kind, f: 'T', v: 'm', a: rng.float(a0 - 0.4, a0 + 0.4, 2), b: 0.524, c: rng.float(-2.2, -2.02, 2), d: rng.float(d0 - 0.4, d0 + 0.4, 2),
      intro: `${name} found the average temperature for each month in ${city} over several years and used sinusoidal regression to get the model below, where $T$ is the average temperature in degrees Celsius and $m$ is the month ($m = 1$ is January and $m = 12$ is December).`,
      qty: 'average temperature', unit: '°C', dp: 1, xDp: 1, pDp: 1, xUnit: 'months', xWords: 'months', lo: 1, hi: 12,
      when: (x) => (Number.isInteger(x) ? `in ${monthName(x)} ($m = ${x}$)` : `at $m = ${fmt(x)}$`),
      pickX: (r) => r.int(1, 12),
      far: (r) => {
        const x = r.int(14, 24);
        return {
          x, words: `in ${monthName(x)} of the next year ($m = ${x}$)`, correct: 0,
          ok: [
            'Reasonable as an estimate: the seasons repeat every year, although actual temperatures vary from year to year',
            'Not reasonable: a model can never be used outside the data',
            'Exactly right: the average temperature will be exactly this value',
          ],
        };
      },
      mean: {
        max: 'the average temperature in the warmest month', min: 'the average temperature in the coldest month', avg: 'the midline: halfway between the warmest and coldest monthly temperatures',
        amp: 'half the difference between the warmest and coldest monthly temperatures', range: 'the difference between the warmest and coldest monthly temperatures', period: 'one year (12 months)',
      },
    };
  }
  const b = rng.pick([1.05, 1.26, 1.4, 1.57]);
  return {
    kind: 'lungs', f: 'V', v: 't', a: rng.float(0.22, 0.48, 2), b, c: retry(() => rng.float(-1.5, 1.5, 2), (c) => Math.abs(c) > 0.1), d: rng.float(2.3, 3.2, 2),
    intro: `A respiratory therapist measured the volume of air in a patient's lungs for $30$ seconds while the patient breathed calmly. Sinusoidal regression gives the model below, where $V$ is the volume of air in litres and $t$ is the time in seconds ($0 \\le t \\le 30$).`,
    qty: 'volume of air in the lungs', unit: 'L', dp: 2, xDp: 1, pDp: 1, xUnit: 's', xWords: 'seconds', lo: 0, hi: 30,
    when: (x) => `at $t = ${fmt(x)}$ s`,
    pickX: (r) => r.int(1, 29),
    far: (r) => {
      const mins = r.int(5, 20);
      return {
        x: 60 * mins, words: `$${mins}$ minutes later ($t = ${60 * mins}$ s)`, correct: 0,
        ok: [
          'Reasonable only if the patient keeps breathing calmly at the same steady rate',
          'Exactly right: breathing never changes',
          'It is an interpolation, so it is certainly reliable',
        ],
      };
    },
    mean: {
      max: 'the greatest volume of air in the lungs', min: 'the least volume of air in the lungs', avg: 'the average volume, halfway between the greatest and least volumes',
      amp: 'half the difference between the greatest and least volumes', range: 'the difference between the greatest and least volumes (the amount of air in one breath)', period: 'the time for one breath',
    },
  };
}

const modelF = (m: Model) => (x: number) => m.a * Math.sin(m.b * x + m.c) + m.d;
const bTex = (m: Model) => fmt(m.b, 4);
function modelTex(m: Model): string {
  return `${m.f}(${m.v}) = ${fmt(m.a)}\\sin(${bTex(m)}${m.v} ${plus(m.c)}) ${plus(m.d)}`;
}
/** The model with a value substituted. */
function subTex(m: Model, x: number): string {
  return `${fmt(m.a)}\\sin(${bTex(m)}(${fmt(x)}) ${plus(m.c)}) ${plus(m.d)}`;
}
const show = (m: Model) => `${m.intro}\n\n$$${modelTex(m)}$$\n\n`;
const RADIANS = 'The model uses radians: set your calculator to radian mode.';

/** Steps for evaluating the model at x. */
function evalSteps(m: Model, x: number): string[] {
  const ang = m.b * x + m.c;
  const s = Math.sin(ang);
  const y = modelF(m)(x);
  return [
    `$${m.f}(${fmt(x)}) = ${subTex(m, x)}$`,
    `In radian mode: $${bTex(m)}(${fmt(x)}) ${plus(m.c)} = ${work(ang)}$ and $\\sin(${work(ang)}) = ${work(s)}$.`,
    `$${m.f}(${fmt(x)}) = ${fmt(m.a)}(${work(s)}) ${plus(m.d)} = ${work(y)}$`,
  ];
}

function modelEvaluate(rng: Rng): GenOutput {
  const m = makeModel(rng);
  const f = modelF(m);
  const x = retry(() => m.pickX(rng), (x) => clear(f(x), m.dp));
  const y = f(x);
  return {
    prompt: `${show(m)}Use the model to estimate the ${m.qty} ${m.when(x)}. Give your answer ${valuePhrase(m)}.`,
    parts: [numPart(y, { label: `$${m.f}(${fmt(x)}) \\approx$`, suffix: m.unit, decimals: m.dp })],
    calculator: true,
    hints: [`Substitute $${m.v} = ${fmt(x)}$ into the equation.`, RADIANS],
    solution: [...evalSteps(m, x), `According to the model, the ${m.qty} ${m.when(x)} is about $${fmtFixed(y, m.dp)}$${uS(m)}. This is interpolation: $${m.v} = ${fmt(x)}$ is inside the data.`],
  };
}

function modelMaxMin(rng: Rng): GenOutput {
  const m = makeModel(rng);
  const hi = roundTo(m.d + m.a, 6);
  const lo = roundTo(m.d - m.a, 6);
  return {
    prompt: `${show(m)}According to the model, what are the greatest and the least values of the ${m.qty}?`,
    parts: [numPart(hi, { label: 'Greatest', suffix: m.unit, display: 'decimal' }), numPart(lo, { label: 'Least', suffix: m.unit, display: 'decimal' })],
    hints: ['The sine of any angle is between $-1$ and $1$.', `So $${fmt(m.a)}\\sin(\\ldots)$ is between $-${fmt(m.a)}$ and $${fmt(m.a)}$. Add $${fmt(m.d)}$ to each.`],
    solution: [
      `The midline is $${m.f} = ${fmt(m.d)}$ and the amplitude is $${fmt(m.a)}$.`,
      `Greatest: $${fmt(m.d)} + ${fmt(m.a)} = ${fmt(hi)}$ (when the sine equals $1$).`,
      `Least: $${fmt(m.d)} - ${fmt(m.a)} = ${fmt(lo)}$ (when the sine equals $-1$).`,
      `The ${m.qty} varies between $${fmt(lo)}$${uS(m)} and $${fmt(hi)}$${uS(m)}. In context, ${m.mean.max} is about $${fmt(hi)}$${uS(m)} and ${m.mean.min} is about $${fmt(lo)}$${uS(m)}.`,
    ],
  };
}

function modelPeriod(rng: Rng): GenOutput {
  const m = retry(() => makeModel(rng), (m) => clear((2 * PI) / m.b, m.pDp));
  const P = (2 * PI) / m.b;
  const pRound = roundTo(P, m.pDp);
  const ds = [m.mean.avg, m.mean.amp, m.mean.range, m.mean.max];
  const parts = [
    numPart(P, { label: 'Period', suffix: m.xUnit, decimals: m.pDp }),
    { label: 'Meaning', answer: mc(rng, cap(m.mean.period), ds.map(cap)) },
  ];
  const lungs = m.kind === 'lungs' && clear(60 / pRound, 0) && clear(60 / P, 0);
  if (lungs) parts.push(numPart(60 / P, { label: 'Breaths per minute', decimals: 0 }));
  return {
    prompt: `${show(m)}Determine the period of the model, ${timePhrase(m, m.pDp)}, and choose what it represents.${lungs ? ' Then use the period to estimate how many breaths the patient takes per minute, to the nearest whole number.' : ''}`,
    parts,
    calculator: true,
    hints: [`For $y = a\\sin(bx + c) + d$ in radians, the period is $\\dfrac{2\\pi}{b}$.`, 'The period is the length of one complete cycle in the context.'],
    solution: [
      `$b = ${bTex(m)}$, so the period is $\\dfrac{2\\pi}{${bTex(m)}} = ${work(P)}$, about $${fmtFixed(P, m.pDp)}$ ${m.xUnit}.`,
      `One cycle of the ${m.qty} takes about $${fmtFixed(P, m.pDp)}$ ${m.xWords}: it is ${m.mean.period}.`,
      ...(lungs ? [`Breaths per minute: $\\dfrac{60}{${work(P)}} = ${work(60 / P)}$, about $${fmtFixed(60 / P, 0)}$.`] : []),
    ],
  };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function modelInterpret(rng: Rng): GenOutput {
  const m = makeModel(rng);
  const which = rng.pick(['a', 'd'] as const);
  const val = which === 'a' ? m.a : m.d;
  const correct = which === 'a' ? m.mean.amp : m.mean.avg;
  const ds = which === 'a' ? [m.mean.range, m.mean.max, m.mean.avg] : [m.mean.max, m.mean.amp, m.mean.min];
  return {
    prompt: `${show(m)}In this model, what does the value $${which} = ${fmt(val)}$ represent?`,
    parts: [part(mc(rng, cap(correct), ds.map(cap)))],
    hints: [
      `In $y = a\\sin(bx + c) + d$, ${which === 'a' ? '$a$ is the amplitude: the distance from the midline to a maximum' : '$d$ gives the midline: the horizontal line halfway between the maximums and minimums'}.`,
      'Translate that into the context: what are the maximum and minimum in this situation?',
    ],
    solution: which === 'a'
      ? [
        `$a = ${fmt(m.a)}$ is the amplitude. The ${m.qty} goes $${fmt(m.a)}$${uS(m)} above and below the midline.`,
        `The maximum is $${fmt(roundTo(m.d + m.a, 6))}$ and the minimum is $${fmt(roundTo(m.d - m.a, 6))}$; half their difference is $${fmt(m.a)}$.`,
        `So $a$ is ${m.mean.amp}.`,
      ]
      : [
        `$d = ${fmt(m.d)}$ gives the midline $${m.f} = ${fmt(m.d)}$.`,
        `The maximum is $${fmt(roundTo(m.d + m.a, 6))}$ and the minimum is $${fmt(roundTo(m.d - m.a, 6))}$; their average is $${fmt(m.d)}$.`,
        `So $d$ is ${m.mean.avg}.`,
      ],
  };
}

function modelResidual(rng: Rng): GenOutput {
  const m = makeModel(rng, ['tide', 'daylight', 'ferris', 'temp']);
  const f = modelF(m);
  const step = m.kind === 'tide' ? 3 : m.kind === 'daylight' ? 30 : m.kind === 'temp' ? 2 : Math.round(m.hi / 12);
  const start = m.kind === 'daylight' ? rng.int(1, 20) : m.kind === 'temp' ? rng.int(1, 2) : m.kind === 'tide' ? rng.int(0, 2) : rng.int(1, 4);
  const xs = Array.from({ length: 6 }, (_, i) => start + i * step);
  const noise = m.kind === 'ferris' ? 0.4 : m.kind === 'tide' ? 0.12 : m.kind === 'daylight' ? 0.15 : 1.2;
  const ys = xs.map((x) => roundTo(f(x) + rng.float(-noise, noise, 3), m.dp));
  const i = retry(() => rng.int(0, 5), (j) => clear(f(xs[j]), m.dp) && Math.abs(ys[j] - roundTo(f(xs[j]), m.dp)) > 1e-9);
  const x = xs[i];
  const pred = f(x);
  const diff = roundTo(ys[i] - roundTo(pred, m.dp), m.dp);
  const head = m.kind === 'daylight' ? 'Day $n$' : m.kind === 'temp' ? 'Month $m$' : `$t$ (${m.xUnit})`;
  const yHead = m.kind === 'daylight' ? 'Daylight (h)' : m.kind === 'temp' ? 'Temperature (°C)' : m.kind === 'tide' ? 'Water level (m)' : 'Height (m)';
  return {
    prompt: `${show(m)}The table shows some of the data. Use the model to predict the ${m.qty} ${m.when(x)}, ${valuePhrase(m)}. Then find how far the measured value is from the prediction (measured minus predicted).`,
    figure: { type: 'table', headers: [head, yHead], rows: xs.map((t, j) => [fmt(t), fmtFixed(ys[j], m.dp)]), horizontal: true },
    parts: [
      numPart(pred, { label: 'Predicted', suffix: m.unit, decimals: m.dp }),
      numPart(diff, { label: 'Measured $-$ predicted', suffix: m.unit, decimals: m.dp }),
    ],
    calculator: true,
    hints: [`Substitute $${m.v} = ${fmt(x)}$ into the model (radian mode).`, `Then subtract: measured $-$ predicted. A negative answer means the model predicted too high.`],
    solution: [
      ...evalSteps(m, x),
      `The model predicts about $${fmtFixed(pred, m.dp)}$${uS(m)}. The measured value is $${fmtFixed(ys[i], m.dp)}$${uS(m)}.`,
      `$${fmtFixed(ys[i], m.dp)} - ${fmtFixed(pred, m.dp)} = ${fmtFixed(diff, m.dp)}$${uS(m)}. ${diff > 0 ? 'The measured value is above the model.' : 'The measured value is below the model.'} A small difference like this shows the model fits the data well.`,
    ],
  };
}

function modelInterpolate(rng: Rng): GenOutput {
  const m = makeModel(rng, ['tide', 'tide', 'daylight', 'ferris', 'lungs']);
  const f = modelF(m);
  const x = retry(
    () => (m.kind === 'tide' ? rng.int(1, 47) / 2 : m.kind === 'ferris' ? rng.int(5, 2 * m.hi - 5) / 2 : m.kind === 'lungs' ? rng.int(3, 59) / 2 : rng.int(5, 360)),
    (x) => clear(f(x), m.dp) && (m.kind === 'daylight' || !Number.isInteger(x) || m.kind === 'tide'),
  );
  const y = f(x);
  const tide = m.kind === 'tide';
  return {
    prompt: `${show(m)}Use the model to estimate the ${m.qty} ${tide ? `at ${clock(x)}` : m.when(x)}${tide ? '' : '.'} Give your answer ${valuePhrase(m)}.`,
    parts: [numPart(y, { label: `$${m.f} \\approx$`, suffix: m.unit, decimals: m.dp })],
    calculator: true,
    hints: [tide ? `First write the time as hours after midnight: ${clock(x)} is $t = ${fmt(x)}$.` : `Substitute $${m.v} = ${fmt(x)}$ into the model.`, RADIANS],
    solution: [
      ...(tide ? [`${cap(clock(x))} is $${fmt(x)}$ hours after midnight, so $t = ${fmt(x)}$.`] : []),
      ...evalSteps(m, x),
      `The ${m.qty} ${tide ? `at ${clock(x)}` : m.when(x)} is about $${fmtFixed(y, m.dp)}$${uS(m)}.`,
    ],
  };
}

function modelCompare(rng: Rng): GenOutput {
  const daylight = rng.chance(0.55);
  const name = rng.pick(NAMES);
  if (daylight) {
    const [p, q] = rng.sample(DAYLIGHT, 2);
    const c = rng.pick([-1.4, -1.39, -1.38]);
    const fP = (n: number) => p[1] * Math.sin(0.0172 * n + c) + p[2];
    const fQ = (n: number) => q[1] * Math.sin(0.0172 * n + c) + q[2];
    const n = retry(() => rng.int(5, 360), (n) => clear(fP(n) - fQ(n), 1) && Math.abs(fP(n) - fQ(n)) > 0.15);
    const diff = fP(n) - fQ(n);
    const eP = `L = ${fmt(p[1])}\\sin(0.0172n ${plus(c)}) + ${fmt(p[2])}`;
    const eQ = `L = ${fmt(q[1])}\\sin(0.0172n ${plus(c)}) + ${fmt(q[2])}`;
    const sP = Math.sin(0.0172 * n + c);
    return {
      prompt: `${name} used sinusoidal regression to model the number of hours of daylight, $L$, on day $n$ of the year ($n = 1$ is January 1) in two northern towns:\n\n${p[0]}: $${eP}$\n\n${q[0]}: $${eQ}$\n\nOn ${dateOf(n)} (day $${n}$), how many more hours of daylight does ${p[0]} have than ${q[0]}? Give your answer ${roundingPhrase(1)} of an hour (negative if ${p[0]} has less).`,
      parts: [numPart(diff, { label: 'Difference', suffix: 'h', decimals: 1 })],
      calculator: true,
      hints: [`Evaluate both models at $n = ${n}$ (radian mode).`, `Subtract: ${p[0]} minus ${q[0]}.`],
      solution: [
        `Both models have the same angle: $0.0172(${n}) ${plus(c)} = ${work(0.0172 * n + c)}$, and $\\sin(${work(0.0172 * n + c)}) = ${work(sP)}$.`,
        `${p[0]}: $L = ${fmt(p[1])}(${work(sP)}) + ${fmt(p[2])} = ${work(fP(n))}$ h`,
        `${q[0]}: $L = ${fmt(q[1])}(${work(sP)}) + ${fmt(q[2])} = ${work(fQ(n))}$ h`,
        `Difference: $${work(fP(n))} - ${work(fQ(n))} = ${work(diff)}$, about $${fmtFixed(diff, 1)}$ h. ${sP > 0 ? `Between the spring and fall equinoxes the town farther north (the one with the larger amplitude) has more daylight.` : `Between the fall and spring equinoxes the town farther north (the one with the larger amplitude) has less daylight.`}`,
      ],
    };
  }
  const [p, q] = rng.sample(TEMPS, 2);
  const c = rng.pick([-2.12, -2.1, -2.08]);
  const fP = (m: number) => p[1] * Math.sin(0.524 * m + c) + p[2];
  const fQ = (m: number) => q[1] * Math.sin(0.524 * m + c) + q[2];
  const mo = retry(() => rng.int(1, 12), (m) => clear(fP(m) - fQ(m), 1) && Math.abs(fP(m) - fQ(m)) > 0.2);
  const diff = fP(mo) - fQ(mo);
  const s = Math.sin(0.524 * mo + c);
  return {
    prompt: `${name} used sinusoidal regression to model the average monthly temperature, $T$ (°C), in month $m$ ($m = 1$ is January) for two cities:\n\n${p[0]}: $T = ${fmt(p[1])}\\sin(0.524m ${plus(c)}) + ${fmt(p[2])}$\n\n${q[0]}: $T = ${fmt(q[1])}\\sin(0.524m ${plus(c)}) + ${fmt(q[2])}$\n\nAccording to the models, how much warmer is ${p[0]} than ${q[0]} in ${monthName(mo)}? Give your answer ${roundingPhrase(1)} of a degree (negative if ${p[0]} is colder).`,
    parts: [numPart(diff, { label: 'Difference', suffix: '°C', decimals: 1 })],
    calculator: true,
    hints: [`${monthName(mo)} is $m = ${mo}$. Evaluate both models (radian mode).`, `Subtract: ${p[0]} minus ${q[0]}.`],
    solution: [
      `Both models have the same angle: $0.524(${mo}) ${plus(c)} = ${work(0.524 * mo + c)}$, and $\\sin(${work(0.524 * mo + c)}) = ${work(s)}$.`,
      `${p[0]}: $T = ${fmt(p[1])}(${work(s)}) + ${fmt(p[2])} = ${work(fP(mo))}$°C`,
      `${q[0]}: $T = ${fmt(q[1])}(${work(s)}) + ${fmt(q[2])} = ${work(fQ(mo))}$°C`,
      `Difference: $${work(fP(mo))} - ${fQ(mo) < 0 ? `(${work(fQ(mo))})` : work(fQ(mo))} = ${work(diff)}$, about $${fmtFixed(diff, 1)}$°C.`,
    ],
  };
}

function modelTimeMax(rng: Rng): GenOutput {
  const findMin = rng.chance(0.35);
  const target = findMin ? (3 * PI) / 2 : PI / 2;
  const m = retry(
    () => makeModel(rng),
    (m) => {
      const P = (2 * PI) / m.b;
      let x = (target - m.c) / m.b;
      while (x < m.lo) x += P;
      while (x - P >= m.lo) x -= P;
      return clear(x, m.xDp) && x <= m.hi;
    },
  );
  const P = (2 * PI) / m.b;
  const x0 = (target - m.c) / m.b;
  let x = x0;
  let k = 0;
  while (x < m.lo) {
    x += P;
    k++;
  }
  while (x - P >= m.lo) {
    x -= P;
    k--;
  }
  const word = findMin ? 'least' : 'greatest';
  const ext = findMin ? 'minimum' : 'maximum';
  const val = roundTo(findMin ? m.d - m.a : m.d + m.a, 6);
  const temp = m.kind === 'temp';
  const parts = [numPart(x, { label: `$${m.v} \\approx$`, suffix: temp ? undefined : m.xUnit, decimals: m.xDp })];
  if (temp) {
    // The month nearest the answer, with its neighbours and the opposite season as distractors.
    const r = Math.round(x);
    parts.push({ label: 'Month', answer: mc(rng, monthName(r), [monthName(r - 1), monthName(r + 1), monthName(r + 6)]) });
  }
  const first = m.kind === 'tide' ? 'the first time after midnight' : m.kind === 'daylight' ? 'the day of the year' : m.kind === 'temp' ? 'the value of $m$' : 'the first time after the start';
  return {
    prompt: `${show(m)}According to the model, ${m.kind === 'daylight' ? `on which day of the year is the number of hours of daylight ${word}` : `what is ${first} when the ${m.qty} is ${word}`}? Give your answer ${timePhrase(m)}${temp ? ', and name the month' : ''}.`,
    parts,
    calculator: true,
    hints: [
      `The ${ext} happens when $\\sin(${bTex(m)}${m.v} ${plus(m.c)}) = ${findMin ? '-1' : '1'}$, which happens when the angle is $${findMin ? '\\dfrac{3\\pi}{2}' : '\\dfrac{\\pi}{2}'}$ (or that plus a multiple of $2\\pi$).`,
      `Solve $${bTex(m)}${m.v} ${plus(m.c)} = ${findMin ? '\\dfrac{3\\pi}{2}' : '\\dfrac{\\pi}{2}'}$ for $${m.v}$. If the answer is outside the data, add or subtract the period, $\\dfrac{2\\pi}{${bTex(m)}}$. (You can also use the maximum or minimum feature of a graphing calculator.)`,
    ],
    solution: [
      `The ${m.qty} is ${word} when $\\sin(${bTex(m)}${m.v} ${plus(m.c)}) = ${findMin ? '-1' : '1'}$; then $${m.f} = ${fmt(m.d)} ${findMin ? '-' : '+'} ${fmt(m.a)} = ${fmt(val)}$.`,
      `$${bTex(m)}${m.v} ${plus(m.c)} = ${findMin ? '\\dfrac{3\\pi}{2}' : '\\dfrac{\\pi}{2}'}$, so $${m.v} = \\dfrac{${findMin ? '3\\pi/2' : '\\pi/2'} ${plus(-m.c)}}{${bTex(m)}} = ${work(x0)}$.`,
      ...(k !== 0 ? [`That is ${k > 0 ? 'before' : 'after'} the start of the data, so ${k > 0 ? 'add' : 'subtract'} the period, $\\dfrac{2\\pi}{${bTex(m)}} = ${work(P)}$${Math.abs(k) > 1 ? `, ${Math.abs(k)} times` : ''}: $${m.v} = ${work(x)}$.`] : []),
      m.kind === 'daylight'
        ? `The ${word} amount of daylight is on about day $${fmtFixed(x, 0)}$ (${dateOf(Math.round(x))}).`
        : m.kind === 'tide'
          ? `The water level is ${word} at about $t = ${fmtFixed(x, 1)}$ h, which is about ${clock(roundTo(x, 1))}`
          : temp
            ? `$m \\approx ${fmtFixed(x, 1)}$, which is closest to $m = ${Math.round(x)}$: ${monthName(x)} is the ${findMin ? 'coldest' : 'warmest'} month.`
            : `The ${m.qty} is first ${word} at about $t = ${fmtFixed(x, 1)}$ s.`,
    ],
  };
}

function modelExtrapolate(rng: Rng): GenOutput {
  const m = makeModel(rng);
  const f = modelF(m);
  const o = retry(() => m.far(rng), (o) => clear(f(o.x), m.dp));
  const y = f(o.x);
  return {
    prompt: `${show(m)}Use the model to predict the ${m.qty} ${o.words}, ${valuePhrase(m)}. Is this interpolation or extrapolation, and is the prediction reasonable?`,
    parts: [
      numPart(y, { label: 'Prediction', suffix: m.unit, decimals: m.dp }),
      { label: 'Type', answer: fixedChoice(['Interpolation', 'Extrapolation'], 1) },
      { label: 'Reasonable?', answer: fixedChoice(o.ok, o.correct) },
    ],
    calculator: true,
    hints: [`Substitute $${m.v} = ${fmt(o.x)}$ (radian mode). The data covers $${fmt(m.lo)} \\le ${m.v} \\le ${fmt(m.hi)}$.`, 'Extrapolation uses the model outside the data. Think about whether the situation will keep repeating in the same way.'],
    solution: [
      ...evalSteps(m, o.x),
      `$${m.v} = ${fmt(o.x)}$ is outside the data ($${fmt(m.lo)} \\le ${m.v} \\le ${fmt(m.hi)}$), so this is extrapolation.`,
      `${o.ok[o.correct]}.`,
    ],
  };
}

const sinusoidModel = skill({
  id: 'm302-sinusoid-model',
  name: 'Sinusoidal regression models',
  description: 'Use given sinusoidal regression equations (tides, daylight, Ferris wheels, temperatures, breathing) to interpolate and extrapolate, interpret the amplitude, midline and period in context, and find when a maximum or minimum occurs.',
  outcomes: ['RF8'],
  lessonId: 'm302-7-2',
  calculator: true,
  gen(rng, d) {
    const kind = byDifficulty(
      d,
      rng.pick(['evaluate', 'evaluate', 'maxMin'] as const),
      rng.pick(['period', 'interpret', 'residual', 'interpolate'] as const),
      rng.pick(['timeMax', 'timeMax', 'extrapolate', 'compare'] as const),
    );
    switch (kind) {
      case 'evaluate': return modelEvaluate(rng);
      case 'maxMin': return modelMaxMin(rng);
      case 'period': return modelPeriod(rng);
      case 'interpret': return modelInterpret(rng);
      case 'residual': return modelResidual(rng);
      case 'interpolate': return modelInterpolate(rng);
      case 'timeMax': return modelTimeMax(rng);
      case 'extrapolate': return modelExtrapolate(rng);
      default: return modelCompare(rng);
    }
  },
});

export const SINUSOIDAL_SKILLS: SkillDef[] = [sinusoidFeatures, sinusoidModel];

/** For lesson figures. */
export const __internal = { waveGraph, plot, degGrid, radGrid, makeModel, modelF, modelTex };
