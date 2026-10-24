/** Math 30-1 Unit 5 — Trigonometric Functions and Graphs (T4, T5). */
import { mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, frac, toFrac, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, PlaneFigure, PlaneLine, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Angles and formatting
// ---------------------------------------------------------------------------

const PI = Math.PI;
const PI_NOTE = 'Type $\\pi$ as `pi`, for example `3pi/2`.';
const EQ_NOTE = 'Type the right side with brackets, for example `3sin(2(x - pi/4)) + 1`.';

const rv = (deg: number) => (deg * PI) / 180;
const piFrac = (deg: number) => frac(Math.round(deg * 1000), 180000);
const dg = (x: number) => `${fmt(x)}^\\circ`;
/** Figure label text: Unicode minus for negatives. */
const fl = (x: number) => fmt(x).replace('-', '−');

/** LaTeX for (n/d)π. */
function piTex(f: Frac, small = true): string {
  if (f.n === 0) return '0';
  const sign = f.n < 0 ? '-' : '';
  const k = Math.abs(f.n);
  if (f.d === 1) return `${sign}${k === 1 ? '' : k}\\pi`;
  return `${sign}${small ? '\\frac' : '\\dfrac'}{${k === 1 ? '' : k}\\pi}{${f.d}}`;
}
/** How a student types (n/d)π. */
function piText(f: Frac): string {
  if (f.n === 0) return '0';
  const sign = f.n < 0 ? '-' : '';
  const k = Math.abs(f.n);
  const top = `${k === 1 ? '' : k}pi`;
  return f.d === 1 ? `${sign}${top}` : `${sign}${top}/${f.d}`;
}
/** Unicode label for a multiple of π, such as π/2, −3π/2 or 2π. */
function piLabel(deg: number): string {
  const f = piFrac(deg);
  if (f.n === 0) return '0';
  const sign = f.n < 0 ? '−' : '';
  const k = Math.abs(f.n);
  const top = `${k === 1 ? '' : k}π`;
  return f.d === 1 ? `${sign}${top}` : `${sign}${top}/${f.d}`;
}
/** Radian LaTeX of an angle in degrees. */
const rt = (deg: number, small = true) => piTex(piFrac(deg), small);
const ang = (deg: number, rad: boolean, small = true) => (rad ? rt(deg, small) : dg(deg));

/** True when v is safely away from a rounding boundary at dp decimals. */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.06;
}

/** A number in brackets when negative, for substitution. */
const pn = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));

/** {y | lo ≤ y ≤ hi, y ∈ R} */
const rangeSet = (lo: number, hi: number) => `\\{y \\mid ${fmt(lo)} \\le y \\le ${fmt(hi)},\\ y \\in \\mathbb{R}\\}`;
const ALL_REALS_Y = '\\{y \\mid y \\in \\mathbb{R}\\}';

// ---------------------------------------------------------------------------
// Graphs: curves clipped to the grid, and x-axes labelled in multiples of π
// ---------------------------------------------------------------------------

type Pt = [number, number];
type Color = 'brand' | 'accent' | 'muted';
const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;

/**
 * Sample y = f(x) as polylines clipped to the grid. Branches are split at `breaks`
 * (vertical asymptotes), and each polyline stops exactly where the curve leaves the window.
 */
function curvePieces(f: (x: number) => number, g: GridSpec, breaks: number[] = []): Pt[][] {
  const bs = breaks.filter((b) => b > g.xMin && b < g.xMax).sort((a, b) => a - b);
  const edges = [g.xMin, ...bs, g.xMax];
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const out: Pt[][] = [];
  for (let i = 0; i < edges.length - 1; i++) {
    const a = edges[i] + (i > 0 ? 1e-6 : 0);
    const b = edges[i + 1] - (i < edges.length - 2 ? 1e-6 : 0);
    const m = Math.max(24, Math.round((240 * (b - a)) / (g.xMax - g.xMin)));
    const xs: number[] = [];
    for (let k = 0; k <= m; k++) xs.push(a + ((b - a) * k) / m);
    let cur: Pt[] = [];
    for (let k = 0; k < xs.length; k++) {
      const y = f(xs[k]);
      const inNow = inside(y);
      if (k > 0) {
        const yp = f(xs[k - 1]);
        const inPrev = inside(yp);
        if (inPrev !== inNow) {
          const outside = inNow ? yp : y;
          const target = outside > g.yMax ? g.yMax : g.yMin;
          let lo = xs[k - 1];
          let hi = xs[k];
          for (let it = 0; it < 60; it++) {
            const mid = (lo + hi) / 2;
            if (inside(f(mid)) === inPrev) lo = mid;
            else hi = mid;
          }
          const cross: Pt = [r3(inPrev ? lo : hi), target];
          if (inPrev) {
            cur.push(cross);
            if (cur.length > 1) out.push(cur);
            cur = [];
          } else cur = [cross];
        }
      }
      if (inNow) cur.push([r3(xs[k]), r3(y)]);
    }
    if (cur.length > 1) out.push(cur);
  }
  return out;
}

/** Approximate rendered width (px) of a 12px bold figure label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === '/' ? 4.5 : ch === ' ' ? 3.5 : ch === '.' ? 4 : 7.2;
  return w;
}

interface Curve {
  f: (x: number) => number;
  color?: Color;
  /** x-values (in the grid's units) of vertical asymptotes. */
  breaks?: number[];
}

/**
 * A graph whose x-axis is in radians. Angles are given in degrees so the tick labels are exact:
 * grid lines every `step`, labels (π/2, π, 3π/2 ...) every `label`. Tick labels sit along the
 * bottom and left edges of the grid, written as labelled points because the plane only prints decimals.
 */
export function radPlane(o: {
  x0: number;
  x1: number;
  step: number;
  label?: number;
  yMin: number;
  yMax: number;
  yLabel?: number;
  curves: Curve[];
  asymptotes?: number[];
  dots?: PlanePoint[];
  caption?: string;
  /** Use degrees on the x-axis (curves then take x in degrees). */
  deg?: boolean;
}): PlaneFigure {
  const pad = o.step / 2;
  const X = o.deg ? (d: number) => d : rv;
  const grid: GridSpec = { xMin: r3(X(o.x0 - pad)), xMax: r3(X(o.x1 + pad)), yMin: o.yMin, yMax: o.yMax, xStep: X(o.step), yStep: 1, ...(o.deg ? { xLabel: 'x (degrees)' } : {}) };
  const ppx = 340 / (grid.xMax - grid.xMin);
  const ppy = 244.8 / (o.yMax - o.yMin);
  const labels: PlanePoint[] = [];
  const lab = o.label ?? o.step;
  for (let k = Math.ceil(o.x0 / lab - 1e-9); k * lab <= o.x1 + 1e-9; k++) {
    const text = o.deg ? `${fl(k * lab)}°` : piLabel(k * lab);
    labels.push({ x: r3(X(k * lab) - (8 + textWidth(text) / 2) / ppx), y: r3(o.yMin - 22 / ppy), label: text, color: 'muted', open: true });
  }
  const yl = o.yLabel ?? 1;
  for (let k = Math.ceil(o.yMin / yl - 1e-9); k * yl <= o.yMax + 1e-9; k++) {
    const text = fl(k * yl);
    labels.push({ x: r3(grid.xMin - (14 + textWidth(text)) / ppx), y: r3(k * yl - 11.5 / ppy), label: text, color: 'muted', open: true });
  }
  const lines: PlaneLine[] = (o.asymptotes ?? []).map((a) => ({ line: { A: 1, B: 0, C: -r3(X(a)) }, dashed: true, color: 'muted' }));
  const polylines = o.curves.flatMap((c) => curvePieces(c.f, grid, (c.breaks ?? []).map(X)).map((points) => ({ points, color: c.color ?? 'brand' })));
  return {
    type: 'plane',
    grid,
    hideTickLabels: true,
    polylines,
    ...(lines.length ? { lines } : {}),
    points: [...(o.dots ?? []), ...labels],
    ...(o.caption ? { caption: o.caption } : {}),
  };
}

/** A graph with the x-axis in degrees, labelled every `label` degrees. */
function degPlane(o: { x0: number; x1: number; step: number; label?: number; yMin: number; yMax: number; curves: Curve[]; asymptotes?: number[] }): PlaneFigure {
  const span = o.x1 - o.x0 + o.step;
  const label = o.label ?? ((340 * o.step) / span >= 40 ? o.step : 2 * o.step);
  return radPlane({ ...o, label, deg: true, yLabel: o.yMax - o.yMin > 11 ? 2 : 1 });
}

// ---------------------------------------------------------------------------
// Sinusoidal functions y = a sin b(x − c) + d
// ---------------------------------------------------------------------------

type TrigFn = 'sin' | 'cos';
interface Sinus {
  fn: TrigFn;
  a: number;
  b: Frac;
  /** Phase shift in degrees (shown in radians unless the item is in degrees). */
  c: number;
  d: number;
}
const bVal = (s: Sinus) => s.b.n / s.b.d;
/** Period in degrees. */
const periodDeg = (s: Sinus) => (360 * s.b.d) / s.b.n;
/** y as a function of x in radians (or degrees). */
function sinusFn(s: Sinus, deg = false): (x: number) => number {
  const F = s.fn === 'sin' ? Math.sin : Math.cos;
  return deg ? (x) => s.a * F(bVal(s) * rv(x - s.c)) + s.d : (x) => s.a * F(bVal(s) * (x - rv(s.c))) + s.d;
}
function coefTex(a: number): string {
  if (a === 1) return '';
  if (a === -1) return '-';
  const f = toFrac(a, 12)!;
  return f.d === 1 ? `${f.n}` : `${f.n < 0 ? '-' : ''}\\frac{${Math.abs(f.n)}}{${f.d}}`;
}
const bTex = (b: Frac) => (b.d === 1 ? (b.n === 1 ? '' : `${b.n}`) : `\\frac{${b.n}}{${b.d}}`);
const shiftTex = (c: number, deg: boolean) => `x ${c > 0 ? '-' : '+'} ${deg ? dg(Math.abs(c)) : rt(Math.abs(c))}`;
const dTex = (d: number) => (d === 0 ? '' : ` ${d > 0 ? '+' : '-'} ${fmt(Math.abs(d))}`);
/** y = a sin b(x − c) + d as LaTeX. */
function sinusTex(s: Sinus, deg = false, lhs = 'y'): string {
  const one = s.b.n === 1 && s.b.d === 1;
  const inner = s.c === 0 ? `${bTex(s.b)}x` : `${one ? '' : bTex(s.b)}\\left(${shiftTex(s.c, deg)}\\right)`;
  return `${lhs} = ${coefTex(s.a)}\\${s.fn} ${inner}${dTex(s.d)}`;
}
/** How a student could type the right side (radians, integer a). */
function sinusText(s: Sinus): string {
  const a = s.a === 1 ? '' : s.a === -1 ? '-' : fmt(s.a);
  const bT = s.b.d === 1 ? (s.b.n === 1 ? '' : `${s.b.n}`) : `(${s.b.n}/${s.b.d})`;
  const cT = piText(piFrac(Math.abs(s.c)));
  const inner = s.c === 0 ? (s.b.d === 1 ? `${bT}x` : `${s.b.n === 1 ? '' : s.b.n}x/${s.b.d}`) : bT ? `${bT}(x ${s.c > 0 ? '-' : '+'} ${cT})` : `x ${s.c > 0 ? '-' : '+'} ${cT}`;
  const dT = s.d === 0 ? '' : ` ${s.d > 0 ? '+' : '-'} ${fmt(Math.abs(s.d))}`;
  return `${a}${s.fn}(${inner})${dT}`;
}
const periodTex = (s: Sinus, deg: boolean) => (deg ? dg(periodDeg(s)) : rt(periodDeg(s), false));
const bFracTex = (s: Sinus) => (s.b.d === 1 ? `${s.b.n}` : `\\frac{${s.b.n}}{${s.b.d}}`);
/** "P = 2π/|b| = ..." */
function periodWork(s: Sinus, deg: boolean): string {
  return deg ? `\\text{period} = \\dfrac{360^\\circ}{|b|} = \\dfrac{360^\\circ}{${bFracTex(s)}} = ${dg(periodDeg(s))}` : `\\text{period} = \\dfrac{2\\pi}{|b|} = \\dfrac{2\\pi}{${bFracTex(s)}} = ${rt(periodDeg(s), false)}`;
}
const phaseWords = (c: number, deg: boolean) => (c === 0 ? 'no phase shift' : `$${ang(Math.abs(c), !deg)}$ to the ${c > 0 ? 'right' : 'left'}`);

/** A window showing about two periods, with grid lines on the key points. */
function sinusWindow(s: Sinus): { x0: number; x1: number; step: number; label: number; yMin: number; yMax: number } {
  const P = periodDeg(s);
  const step = P / 8 >= 15 ? P / 8 : P / 4;
  const x0 = -P / 4;
  const x1 = x0 + 2 * P;
  const label = (340 * step) / (x1 - x0 + step) >= 38 ? step : 2 * step;
  const A = Math.abs(s.a);
  return { x0, x1, step, label, yMin: Math.min(s.d - A, 0) - 0.5, yMax: Math.max(s.d + A, 0) + 0.5 };
}
function sinusGraph(s: Sinus, extra: Curve[] = []): PlaneFigure {
  const w = sinusWindow(s);
  return radPlane({ ...w, yLabel: w.yMax - w.yMin > 11 ? 2 : 1, curves: [...extra, { f: sinusFn(s) }] });
}
/** True when two sinusoids have the same graph (checked at many points). */
function sameGraph(p: Sinus, q: Sinus): boolean {
  const f = sinusFn(p);
  const g = sinusFn(q);
  for (let i = 0; i < 40; i++) {
    const x = -7 + i * 0.37;
    if (Math.abs(f(x) - g(x)) > 1e-6) return false;
  }
  return true;
}

/** Range choices: the correct range and common mistakes. */
function rangeMc(rng: Rng, s: Sinus) {
  const A = Math.abs(s.a);
  const correct = `$${rangeSet(s.d - A, s.d + A)}$`;
  const ds = [rangeSet(-A, A), rangeSet(s.d - 1, s.d + 1), rangeSet(s.d - 2 * A, s.d + 2 * A), rangeSet(s.d, s.d + A), rangeSet(-1, 1)].map((x) => `$${x}$`);
  return mc(rng, correct, ds);
}

// ---------------------------------------------------------------------------
// Lesson 5.1 — Graphing sine and cosine
// ---------------------------------------------------------------------------

const A_CHOICES = [2, 3, 4, 5, 0.5, 1.5, 2.5];
const B_CHOICES: Frac[] = [frac(2), frac(3), frac(4), frac(1, 2), frac(1, 3), frac(2, 3), frac(3, 2), frac(4, 3)];

const sinusoidFeatures = skill({
  id: 'm301-sinusoid-features',
  name: 'Features of sine and cosine graphs',
  description: 'Identify the amplitude, period, domain, range, zeros and maximum points of y = sin x, y = cos x and y = a sin bx or y = a cos bx.',
  outcomes: ['T4'],
  lessonId: 'm301-5-1',
  gen(rng, d): GenOutput {
    const fn: TrigFn = rng.pick(['sin', 'cos']);
    if (d === 1) {
      const mode = rng.pick(['amp', 'period', 'base'] as const);
      if (mode === 'amp') {
        const a = rng.pick(A_CHOICES) * rng.sign();
        const s: Sinus = { fn, a, b: frac(1), c: 0, d: 0 };
        return {
          prompt: `State the amplitude of $${sinusTex(s)}$.`,
          parts: [numPart(Math.abs(a), { label: 'Amplitude', display: 'decimal' })],
          hints: ['The amplitude is half the distance between the maximum and minimum values.', 'For $y = a\\sin x$ or $y = a\\cos x$, the amplitude is $|a|$. It is never negative.'],
          solution: [`The amplitude is $|a| = |${fmt(a)}| = ${fmt(Math.abs(a))}$.`, ...(a < 0 ? ['The negative sign reflects the graph in the $x$-axis but does not change the amplitude.'] : []), `The graph goes from $${fmt(-Math.abs(a))}$ to $${fmt(Math.abs(a))}$, so the amplitude is $${fmt(Math.abs(a))}$.`],
        };
      }
      if (mode === 'period') {
        const b = rng.pick(B_CHOICES);
        const s: Sinus = { fn, a: 1, b, c: 0, d: 0 };
        const deg = rng.chance(0.3);
        return {
          prompt: `Determine the period of $${sinusTex(s)}$${deg ? ', in degrees' : `, in radians. Give an exact answer. ${PI_NOTE}`}`,
          parts: [numPart(deg ? periodDeg(s) : rv(periodDeg(s)), { label: 'Period', ...(deg ? { suffix: '°' } : {}) })],
          hints: [`The period of $y = \\${fn} x$ is $${deg ? '360^\\circ' : '2\\pi'}$. The factor $b$ compresses or stretches the graph horizontally.`, `The period of $y = \\${fn} bx$ is $${deg ? '\\dfrac{360^\\circ}{|b|}' : '\\dfrac{2\\pi}{|b|}'}$.`],
          solution: [`$b = ${bFracTex(s)}$`, `$${periodWork(s, deg)}$`],
          answerDisplay: `$${periodTex(s, deg)}$`,
        };
      }
      // base graph: zeros or maxima of y = sin x or y = cos x
      const want = rng.pick(['zeros', 'max', 'min'] as const);
      const [x0, x1] = rng.pick([
        [-360, 360],
        [0, 720],
        [-720, 0],
        [-180, 540],
      ] as Array<[number, number]>);
      const at = (t: number) => (fn === 'sin' ? Math.sin(rv(t)) : Math.cos(rv(t)));
      const vals: number[] = [];
      for (let t = x0; t <= x1; t += 90) {
        const y = at(t);
        if (want === 'zeros' ? Math.abs(y) < 1e-9 : want === 'max' ? Math.abs(y - 1) < 1e-9 : Math.abs(y + 1) < 1e-9) vals.push(t);
      }
      const what = want === 'zeros' ? 'the $x$-intercepts' : `the $x$-values where the graph has a ${want === 'max' ? 'maximum' : 'minimum'}`;
      return {
        prompt: `The graph of $y = \\${fn} x$ is shown. Determine ${what} for $${rt(x0, true)} \\le x \\le ${rt(x1, true)}$. Give exact values separated by commas. ${PI_NOTE}`,
        figure: radPlane({ x0, x1, step: 45, label: 90, yMin: -1.5, yMax: 1.5, curves: [{ f: (x) => (fn === 'sin' ? Math.sin(x) : Math.cos(x)) }] }),
        parts: [part({ kind: 'numbers', values: vals.map(rv) }, { label: '$x =$', placeholder: 'For example: -pi, 0, pi' })],
        hints: [
          `On the unit circle, $\\${fn} x$ is the ${fn === 'sin' ? '$y$' : '$x$'}-coordinate of $P(x)$.`,
          want === 'zeros'
            ? `$y = \\${fn} x$ is zero at ${fn === 'sin' ? '$x = 0, \\pi, 2\\pi, \\ldots$ (every multiple of $\\pi$)' : '$x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\ldots$ (every odd multiple of $\\frac{\\pi}{2}$)'}.`
            : `The pattern repeats every $2\\pi$: find one ${want === 'max' ? 'maximum' : 'minimum'}, then add and subtract $2\\pi$.`,
        ],
        solution: [
          want === 'zeros'
            ? `$\\${fn} x = 0$ when ${fn === 'sin' ? '$x$ is a multiple of $\\pi$' : '$x$ is an odd multiple of $\\frac{\\pi}{2}$'}.`
            : `$\\${fn} x = ${want === 'max' ? 1 : -1}$ at $x = ${rt(fn === 'sin' ? (want === 'max' ? 90 : 270) : want === 'max' ? 0 : 180)}$, and the pattern repeats every $2\\pi$.`,
          `In $${rt(x0, true)} \\le x \\le ${rt(x1, true)}$: $x = ${vals.map((v) => rt(v)).join(',\\ ')}$`,
        ],
        answerDisplay: vals.map((v) => `$${rt(v)}$`).join(', '),
      };
    }
    if (d === 2) {
      const a = rng.pick([2, 3, 4, 5, 0.5, 1.5]) * rng.sign();
      const b = rng.pick([frac(2), frac(3), frac(4), frac(1, 2), frac(1, 3), frac(2, 3)]);
      const s: Sinus = { fn, a, b, c: 0, d: 0 };
      const A = Math.abs(a);
      if (rng.chance(0.5)) {
        const deg = rng.chance(0.3);
        return {
          prompt: `For $${sinusTex(s)}$, determine the amplitude, the period${deg ? ' in degrees' : ' (as an exact value in radians)'}, and the range.${deg ? '' : ` ${PI_NOTE}`}`,
          parts: [numPart(A, { label: 'Amplitude', display: 'decimal' }), numPart(deg ? periodDeg(s) : rv(periodDeg(s)), { label: 'Period', ...(deg ? { suffix: '°' } : {}) }), part(rangeMc(rng, s), { label: 'Range' })],
          hints: ['Compare with $y = a\\sin bx$ or $y = a\\cos bx$: the amplitude is $|a|$.', `The period is $${deg ? '\\dfrac{360^\\circ}{|b|}' : '\\dfrac{2\\pi}{|b|}'}$. The graph goes from $-|a|$ to $|a|$.`],
          solution: [`$a = ${fmt(a)}$, so the amplitude is $|a| = ${fmt(A)}$.`, `$${periodWork(s, deg)}$`, `The graph oscillates between $${fmt(-A)}$ and $${fmt(A)}$: the range is $${rangeSet(-A, A)}$.`],
          answerDisplay: `amplitude $${fmt(A)}$, period $${periodTex(s, deg)}$, range $${rangeSet(-A, A)}$`,
        };
      }
      const g: Sinus = { fn, a: Math.round(A) === A ? a : Math.sign(a) * Math.ceil(A), b: rng.pick([frac(1), frac(2), frac(3), frac(1, 2)]), c: 0, d: 0 };
      const P = periodDeg(g);
      return {
        prompt: `The graph of a function of the form $y = a\\${fn} bx$ is shown. Determine its amplitude and its period, as an exact value in radians. ${PI_NOTE}`,
        figure: sinusGraph(g),
        parts: [numPart(Math.abs(g.a), { label: 'Amplitude' }), numPart(rv(P), { label: 'Period' })],
        hints: ['The amplitude is half the distance from a minimum to a maximum.', 'The period is the horizontal length of one complete cycle, for example from one maximum to the next.'],
        solution: [
          `The maximum value is $${fmt(Math.abs(g.a))}$ and the minimum is $${fmt(-Math.abs(g.a))}$, so the amplitude is $\\dfrac{${fmt(Math.abs(g.a))} - (${fmt(-Math.abs(g.a))})}{2} = ${fmt(Math.abs(g.a))}$.`,
          `One cycle runs from $x = 0$ to $x = ${rt(P, false)}$, so the period is $${rt(P, false)}$.`,
          `The function is $${sinusTex(g)}$: check that $\\dfrac{2\\pi}{${bFracTex(g)}} = ${rt(P, false)}$.`,
        ],
        answerDisplay: `amplitude $${fmt(Math.abs(g.a))}$, period $${rt(P, false)}$`,
      };
    }
    // d === 3
    if (rng.chance(0.5)) {
      // find a and b from features
      const A = rng.pick([2, 3, 4, 5, 6, 0.5, 1.5, 2.5]);
      const b = rng.pick([frac(2), frac(3), frac(4), frac(1, 2), frac(1, 3), frac(2, 3), frac(3, 2), frac(4, 3), frac(6), frac(1, 4)]);
      const s: Sinus = { fn, a: A, b, c: 0, d: 0 };
      const deg = rng.chance(0.3);
      const how = rng.pick(['max', 'range'] as const);
      const feat = how === 'max' ? `a maximum value of $${fmt(A)}$` : `range $${rangeSet(-A, A)}$`;
      return {
        prompt: `The function $y = a\\${fn} bx$, with $a > 0$ and $b > 0$, has ${feat} and a period of $${periodTex(s, deg)}$. Determine $a$ and $b$.`,
        parts: [numPart(A, { label: '$a =$', display: 'decimal' }), numPart(bVal(s), { label: '$b =$', display: 'fraction' })],
        hints: ['The amplitude is $|a|$, and the graph of $y = a\\sin bx$ goes from $-|a|$ to $|a|$.', `Rearrange $\\text{period} = ${deg ? '\\dfrac{360^\\circ}{b}' : '\\dfrac{2\\pi}{b}'}$ to $b = ${deg ? '\\dfrac{360^\\circ}{\\text{period}}' : '\\dfrac{2\\pi}{\\text{period}}'}$.`],
        solution: [
          how === 'max' ? `The maximum value of $y = a\\${fn} bx$ is $|a|$, so $a = ${fmt(A)}$.` : `The range goes from $${fmt(-A)}$ to $${fmt(A)}$, so the amplitude is $${fmt(A)}$ and $a = ${fmt(A)}$.`,
          `$b = ${deg ? `\\dfrac{360^\\circ}{${dg(periodDeg(s))}}` : `\\dfrac{2\\pi}{${rt(periodDeg(s), true)}}`} = ${bFracTex(s)}$`,
          `$a = ${fmt(A)}$ and $b = ${bFracTex(s)}$`,
        ],
        answerDisplay: `$a = ${fmt(A)}$, $b = ${bFracTex(s)}$`,
      };
    }
    // zeros or maxima of y = a sin bx in an interval
    const b = rng.pick([2, 3, 4]);
    const a = rng.pick([1, 2, 3, 4]) * rng.sign();
    const s: Sinus = { fn, a, b: frac(b), c: 0, d: 0 };
    const want = rng.pick(['zeros', 'max'] as const);
    const hi = rng.pick([180, 360]);
    const P = 360 / b;
    const f = sinusFn(s);
    const vals: number[] = [];
    for (let k = 0; k * (P / 4) <= hi + 1e-9; k++) {
      const t = (k * P) / 4;
      const y = f(rv(t));
      if (want === 'zeros' ? Math.abs(y) < 1e-9 : Math.abs(y - Math.abs(a)) < 1e-9) vals.push(t);
    }
    const first = fn === 'sin' ? (a > 0 ? P / 4 : (3 * P) / 4) : a > 0 ? 0 : P / 2;
    return {
      prompt: `Determine ${want === 'zeros' ? 'the zeros' : 'the $x$-values of the maximum points'} of $${sinusTex(s)}$ for $0 \\le x \\le ${rt(hi, true)}$. Give exact values separated by commas. ${PI_NOTE}`,
      parts: [part({ kind: 'numbers', values: vals.map(rv) }, { label: '$x =$', placeholder: 'For example: 0, pi/3, 2pi/3' })],
      hints: [`The period is $\\dfrac{2\\pi}{${b}} = ${rt(P)}$. Key points (zeros, maximums and minimums) are a quarter period, $${rt(P / 4)}$, apart.`, want === 'zeros' ? `Solve $${b}x = ${fn === 'sin' ? 'n\\pi' : '\\frac{\\pi}{2} + n\\pi'}$, or step through the key points.` : `Find the first maximum, then add the period $${rt(P)}$ until you leave the interval.`],
      solution: [
        `$${periodWork(s, false)}$, so key points are $${rt(P / 4)}$ apart.`,
        want === 'zeros'
          ? `$\\${fn} ${b}x = 0$ when $${b}x = ${fn === 'sin' ? 'n\\pi' : '\\frac{\\pi}{2} + n\\pi'}$, so $x = ${fn === 'sin' ? `\\frac{n\\pi}{${b}}` : `${rt(P / 4)} + \\frac{n\\pi}{${b}}`}$.`
          : `${a > 0 ? 'Since $a > 0$, the' : 'Since $a < 0$, the graph is reflected in the $x$-axis and the'} first maximum is at $x = ${rt(first)}$; maximums repeat every $${rt(P)}$.`,
        `In $0 \\le x \\le ${rt(hi, true)}$: $x = ${vals.map((v) => rt(v)).join(',\\ ')}$`,
      ],
      answerDisplay: vals.map((v) => `$${rt(v)}$`).join(', '),
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 5.2 — Transformations of sinusoidal functions
// ---------------------------------------------------------------------------

/** A sinusoid with a nice phase shift (a multiple of an eighth of the period, or of π/12). */
function randomSinus(rng: Rng, opts: { bs?: Frac[]; intA?: boolean; cZero?: boolean; dRange?: [number, number] } = {}): Sinus {
  const fn: TrigFn = rng.pick(['sin', 'cos']);
  const b = rng.pick(opts.bs ?? [frac(1), frac(2), frac(3), frac(1, 2)]);
  const A = opts.intA === false ? rng.pick([1, 2, 3, 4, 0.5, 1.5]) : rng.pick([1, 2, 3, 4]);
  const a = A * rng.sign();
  const P = (360 * b.d) / b.n;
  const step = P / 8 >= 15 ? P / 8 : P / 4;
  const c = opts.cZero ? 0 : step * rng.intExcept(-3, 7, [0]);
  const [dlo, dhi] = opts.dRange ?? [-3, 3];
  return { fn, a, b, c, d: rng.int(dlo, dhi) };
}

/** Phase-shift choices: correct, wrong direction, and unfactored b. */
function phaseMc(rng: Rng, c: number, k: number, deg: boolean) {
  const A = (x: number) => (deg ? dg(x) : rt(x, true));
  const word = (x: number, dir: number) => `$${A(x)}$ to the ${dir > 0 ? 'right' : 'left'}`;
  const correct = word(Math.abs(c), Math.sign(c));
  const ds = [word(Math.abs(c), -Math.sign(c)), word(Math.abs(k), Math.sign(c)), word(Math.abs(k), -Math.sign(c))];
  return mc(rng, correct, ds);
}

const sinusoidEquation = skill({
  id: 'm301-sinusoid-equation',
  name: 'Parameters of y = a sin b(x − c) + d',
  description: 'Describe the effects of a, b, c and d in y = a sin b(x − c) + d and y = a cos b(x − c) + d, and write an equation from given characteristics.',
  outcomes: ['T4'],
  lessonId: 'm301-5-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const s = randomSinus(rng, { bs: [frac(1)], intA: false, dRange: [-5, 5] });
      if (s.d === 0) s.d = rng.pick([-2, 2]);
      const deg = rng.chance(0.25);
      if (deg) s.c = rng.pick([30, 45, 60, 90, 120]) * rng.sign();
      const A = Math.abs(s.a);
      const hc = Math.abs(s.c);
      const hw = (dir: number) => `$${ang(hc, !deg)}$ ${dir > 0 ? 'right' : 'left'}`;
      const vw = (dir: number) => `$${fmt(Math.abs(s.d))}$ ${dir > 0 ? 'up' : 'down'}`;
      const sc = Math.sign(s.c);
      const sd = Math.sign(s.d);
      const opt = (h: number, v: number) => `${hw(h)} and ${vw(v)}`;
      return {
        prompt: `For $${sinusTex(s, deg)}$, state the amplitude and the maximum value, and describe the horizontal and vertical translations of the graph of $y = \\${s.fn} x$.`,
        parts: [
          numPart(A, { label: 'Amplitude', display: 'decimal' }),
          numPart(s.d + A, { label: 'Maximum value', display: 'decimal' }),
          part(mc(rng, opt(sc, sd), [opt(-sc, sd), opt(sc, -sd), opt(-sc, -sd)]), { label: 'Translations' }),
        ],
        hints: ['Compare with $y = a\\sin b(x - c) + d$: $|a|$ is the amplitude, $c$ is the phase shift and $d$ is the vertical displacement.', `Write $x ${s.c > 0 ? '-' : '+'} ${ang(hc, !deg)}$ as $x - c$ to read the sign of $c$. The maximum value is $d + |a|$.`],
        solution: [
          `$a = ${fmt(s.a)}$, so the amplitude is $${fmt(A)}$.`,
          s.c > 0 ? `$x - ${ang(hc, !deg)}$ means $c = ${ang(hc, !deg)}$: a phase shift of $${ang(hc, !deg)}$ to the right.` : `$x + ${ang(hc, !deg)} = x - \\left(-${ang(hc, !deg)}\\right)$, so $c = -${ang(hc, !deg)}$: a phase shift of $${ang(hc, !deg)}$ to the left.`,
          `$d = ${fmt(s.d)}$: a vertical displacement of $${fmt(Math.abs(s.d))}$ ${s.d > 0 ? 'up' : 'down'}.`,
          `Maximum value $= d + |a| = ${fmt(s.d)} + ${fmt(A)} = ${fmt(s.d + A)}$`,
        ],
        answerDisplay: `amplitude $${fmt(A)}$, maximum $${fmt(s.d + A)}$, ${opt(sc, sd)}`,
      };
    }
    if (d === 2) {
      const deg = rng.chance(0.3);
      const b = rng.pick([2, 3, 4]);
      const s: Sinus = { fn: rng.pick(['sin', 'cos']), a: rng.pick([1, 2, 3, 4, 5]) * rng.sign(), b: frac(b), c: 0, d: rng.int(-4, 4) };
      const cAbs = rng.pick((deg ? [10, 15, 20, 30, 40, 45, 60] : [15, 30, 45, 60, 90]).filter((x) => x < 180 / b));
      s.c = cAbs * rng.sign();
      const k = b * s.c;
      const inner = `${b}x ${k > 0 ? '-' : '+'} ${ang(Math.abs(k), !deg)}`;
      const eq = `y = ${coefTex(s.a)}\\${s.fn}\\left(${inner}\\right)${dTex(s.d)}`;
      return {
        prompt: `For $${eq}$, determine the period, the phase shift and the range.${deg ? ' Give the period in degrees.' : ` Give the period as an exact value in radians. ${PI_NOTE}`}`,
        parts: [
          numPart(deg ? periodDeg(s) : rv(periodDeg(s)), { label: 'Period', ...(deg ? { suffix: '°' } : {}) }),
          part(phaseMc(rng, s.c, k, deg), { label: 'Phase shift' }),
          part(rangeMc(rng, s), { label: 'Range' }),
        ],
        hints: [`Factor $b$ out of the brackets first: $${b}x ${k > 0 ? '-' : '+'} ${ang(Math.abs(k), !deg)} = ${b}\\left(x ${s.c > 0 ? '-' : '+'} ${ang(Math.abs(s.c), !deg)}\\right)$.`, `Then read $c$ from $b(x - c)$. The period is $${deg ? '\\dfrac{360^\\circ}{|b|}' : '\\dfrac{2\\pi}{|b|}'}$, and the range runs from $d - |a|$ to $d + |a|$.`],
        solution: [
          `Factor out $b = ${b}$: $${sinusTex(s, deg)}$`,
          `$${periodWork(s, deg)}$`,
          `$c = ${ang(s.c, !deg)}$: the phase shift is ${phaseWords(s.c, deg)}, not $${ang(Math.abs(k), !deg)}$.`,
          `$d - |a| = ${fmt(s.d)} - ${fmt(Math.abs(s.a))} = ${fmt(s.d - Math.abs(s.a))}$ and $d + |a| = ${fmt(s.d + Math.abs(s.a))}$, so the range is $${rangeSet(s.d - Math.abs(s.a), s.d + Math.abs(s.a))}$.`,
        ],
        answerDisplay: `period $${periodTex(s, deg)}$, phase shift ${phaseWords(s.c, deg)}, range $${rangeSet(s.d - Math.abs(s.a), s.d + Math.abs(s.a))}$`,
      };
    }
    // d === 3: write the equation (any equivalent equation is accepted)
    const mode = rng.pick(['features', 'maxmin', 'transform'] as const);
    if (mode === 'maxmin') {
      const s = randomSinus(rng, { bs: [frac(1), frac(2), frac(3), frac(1, 2)], dRange: [-2, 6] });
      s.fn = 'cos';
      s.a = Math.abs(s.a) + (Math.abs(s.a) === 1 ? 1 : 0);
      const P = periodDeg(s);
      s.c = ((s.c % P) + P) % P || P / 4;
      const max = s.d + s.a;
      const min = s.d - s.a;
      return {
        prompt: `A sinusoidal function has a maximum value of $${fmt(max)}$, a minimum value of $${fmt(min)}$ and a period of $${rt(P, false)}$. One of its maximum points is at $x = ${rt(s.c, false)}$. Write an equation of the function in the form $y = a\\cos b(x - c) + d$, with $a > 0$ and $b > 0$. ${EQ_NOTE}`,
        parts: [part({ kind: 'expression', expected: sinusText(s) }, { label: '$y =$' })],
        hints: ['$a = \\dfrac{\\max - \\min}{2}$ and $d = \\dfrac{\\max + \\min}{2}$.', '$b = \\dfrac{2\\pi}{\\text{period}}$. A cosine curve with $a > 0$ starts a cycle at a maximum, so a maximum point gives $c$.'],
        solution: [
          `$a = \\dfrac{${fmt(max)} - ${pn(min)}}{2} = ${fmt(s.a)}$ and $d = \\dfrac{${fmt(max)} + ${pn(min)}}{2} = ${fmt(s.d)}$`,
          `$b = \\dfrac{2\\pi}{${rt(P, true)}} = ${bFracTex(s)}$`,
          `$y = \\cos x$ has a maximum at $x = 0$, so shift it to $x = ${rt(s.c)}$: $c = ${rt(s.c)}$.`,
          `$${sinusTex(s)}$`,
        ],
        answerDisplay: `$${sinusTex(s)}$`,
      };
    }
    const s = randomSinus(rng, { bs: [frac(1), frac(2), frac(3), frac(1, 2)] });
    if (s.d === 0) s.d = rng.pick([-1, 1, 2, -2]);
    const fn = s.fn;
    s.a = Math.abs(s.a) === 1 ? 2 * Math.sign(s.a) : s.a;
    if (mode === 'features') {
      const posA = { ...s, a: Math.abs(s.a) };
      return {
        prompt: `A ${fn === 'sin' ? 'sine' : 'cosine'} function has an amplitude of $${fmt(posA.a)}$, a period of $${rt(periodDeg(s), false)}$, a phase shift of ${phaseWords(s.c, false)}, and a vertical displacement of $${fmt(Math.abs(s.d))}$ ${s.d > 0 ? 'up' : 'down'}. Write its equation in the form $y = a\\${fn} b(x - c) + d$ with $a > 0$ and $b > 0$. ${EQ_NOTE}`,
        parts: [part({ kind: 'expression', expected: sinusText(posA) }, { label: '$y =$' })],
        hints: ['The amplitude gives $a$ and the vertical displacement gives $d$ (negative for down).', `$b = \\dfrac{2\\pi}{\\text{period}}$, and a shift ${s.c > 0 ? 'right' : 'left'} means $c ${s.c > 0 ? '> 0' : '< 0'}$ in $x - c$.`],
        solution: [`$a = ${fmt(posA.a)}$ and $d = ${fmt(s.d)}$`, `$b = \\dfrac{2\\pi}{${rt(periodDeg(s), true)}} = ${bFracTex(s)}$`, `$c = ${rt(s.c)}$`, `$${sinusTex(posA)}$`],
        answerDisplay: `$${sinusTex(posA)}$`,
      };
    }
    // transform: describe the transformations of y = sin x
    const A = Math.abs(s.a);
    const bv = bVal(s);
    const words = [
      `a vertical stretch by a factor of $${fmt(A)}$${s.a < 0 ? ' and a reflection in the $x$-axis' : ''}`,
      bv === 1 ? null : `a horizontal stretch by a factor of $${bv > 1 ? `\\frac{1}{${fmt(bv)}}` : fmt(1 / bv)}$`,
      `a horizontal translation of $${rt(Math.abs(s.c))}$ to the ${s.c > 0 ? 'right' : 'left'}`,
      `a vertical translation of $${fmt(Math.abs(s.d))}$ ${s.d > 0 ? 'up' : 'down'}`,
    ].filter(Boolean) as string[];
    const list = words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}` : words[0];
    return {
      prompt: `The graph of $y = \\${fn} x$ is transformed by ${list}. Write the equation of the transformed function. ${EQ_NOTE}`,
      parts: [part({ kind: 'expression', expected: sinusText(s) }, { label: '$y =$' })],
      hints: ['A vertical stretch by a factor of $|a|$ multiplies the function by $a$; a reflection in the $x$-axis makes $a$ negative.', 'A horizontal stretch by a factor of $\\frac{1}{b}$ replaces $x$ with $bx$; a horizontal translation of $c$ replaces $x$ with $x - c$, so write $y = a\\sin b(x - c) + d$.'],
      solution: [`$a = ${fmt(s.a)}$`, bv === 1 ? 'There is no horizontal stretch: $b = 1$.' : `A horizontal stretch by a factor of $${bv > 1 ? `\\frac{1}{${fmt(bv)}}` : fmt(1 / bv)}$ gives $b = ${bFracTex(s)}$.`, `$c = ${rt(s.c)}$ and $d = ${fmt(s.d)}$`, `$${sinusTex(s)}$`],
      answerDisplay: `$${sinusTex(s)}$`,
    };
  },
});

/** Equivalent forms: the cosine form with a > 0 and the least non-negative c (degrees). */
function cosForm(s: Sinus): Sinus {
  const P = periodDeg(s);
  const shift = s.fn === 'sin' ? (s.a > 0 ? P / 4 : (3 * P) / 4) : s.a > 0 ? 0 : P / 2;
  const c = (((s.c + shift) % P) + P) % P;
  return { fn: 'cos', a: Math.abs(s.a), b: s.b, c, d: s.d };
}
function sinForm(s: Sinus): Sinus {
  const P = periodDeg(s);
  const shift = s.fn === 'sin' ? (s.a > 0 ? 0 : P / 2) : s.a > 0 ? -P / 4 : P / 4;
  const c = (((s.c + shift) % P) + P) % P;
  return { fn: 'sin', a: Math.abs(s.a), b: s.b, c, d: s.d };
}

const sinusoidGraph = skill({
  id: 'm301-sinusoid-graph',
  name: 'Sinusoidal graphs and equations',
  description: 'Read the amplitude, period, midline and phase shift from the graph of a sinusoidal function, write its equation, and match equations to graphs.',
  outcomes: ['T4'],
  lessonId: 'm301-5-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const s = randomSinus(rng, { bs: [frac(1), frac(2), frac(1, 2)], cZero: true, dRange: [-3, 3] });
      if (s.d === 0) s.d = rng.pick([-2, -1, 1, 2]);
      const A = Math.abs(s.a);
      const P = periodDeg(s);
      return {
        prompt: 'The graph of a sinusoidal function is shown. Determine its amplitude, its period (as an exact value in radians), and the equation of its midline. ' + PI_NOTE,
        figure: sinusGraph(s),
        parts: [numPart(A, { label: 'Amplitude' }), numPart(rv(P), { label: 'Period' }), numPart(s.d, { label: 'Midline: $y =$' })],
        hints: ['Read the maximum and minimum values. The midline is halfway between them.', 'Amplitude $= \\dfrac{\\max - \\min}{2}$. The period is the horizontal distance from one maximum to the next.'],
        solution: [
          `Maximum $${fmt(s.d + A)}$, minimum $${fmt(s.d - A)}$.`,
          `Amplitude $= \\dfrac{${fmt(s.d + A)} - ${pn(s.d - A)}}{2} = ${fmt(A)}$; midline $y = \\dfrac{${fmt(s.d + A)} + ${pn(s.d - A)}}{2} = ${fmt(s.d)}$`,
          `One cycle has a horizontal length of $${rt(P, false)}$, so the period is $${rt(P, false)}$.`,
        ],
        answerDisplay: `amplitude $${fmt(A)}$, period $${rt(P, false)}$, midline $y = ${fmt(s.d)}$`,
      };
    }
    if (d === 2) {
      const s = randomSinus(rng, { bs: [frac(1), frac(2), frac(3), frac(1, 2)], dRange: [-2, 2] });
      const target = rng.pick(['sin', 'cos'] as const);
      const form = target === 'sin' ? sinForm(s) : cosForm(s);
      const P = periodDeg(s);
      const keyX = target === 'sin' ? form.c : form.c;
      return {
        prompt: `Write an equation for the sinusoidal function shown, in the form $y = a\\${target} b(x - c) + d$. ${EQ_NOTE}`,
        figure: sinusGraph(s),
        parts: [part({ kind: 'expression', expected: sinusText(form) }, { label: '$y =$' })],
        hints: [
          'Read the maximum and minimum: $a = \\dfrac{\\max - \\min}{2}$ and $d = \\dfrac{\\max + \\min}{2}$. Then measure the period and use $b = \\dfrac{2\\pi}{\\text{period}}$.',
          target === 'sin' ? 'For $a > 0$, a sine curve starts a cycle on the midline going up. The $x$-value of such a point gives $c$.' : 'For $a > 0$, a cosine curve starts a cycle at a maximum. The $x$-value of a maximum gives $c$.',
        ],
        solution: [
          `Maximum $${fmt(s.d + Math.abs(s.a))}$ and minimum $${fmt(s.d - Math.abs(s.a))}$: $a = ${fmt(Math.abs(s.a))}$ and $d = ${fmt(s.d)}$.`,
          `The period is $${rt(P, false)}$, so $b = \\dfrac{2\\pi}{${rt(P, true)}} = ${bFracTex(s)}$.`,
          target === 'sin' ? `The graph crosses the midline going up at $x = ${rt(keyX)}$, so $c = ${rt(keyX)}$.` : `There is a maximum at $x = ${rt(keyX)}$, so $c = ${rt(keyX)}$.`,
          `$${sinusTex(form)}$ (other phase shifts that differ by a multiple of the period, or a reflected ${target === 'sin' ? 'sine' : 'cosine'} curve, describe the same graph)`,
        ],
        answerDisplay: `$${sinusTex(form)}$`,
      };
    }
    // d === 3
    if (rng.chance(0.5)) {
      // match the equation to its graph
      const s = randomSinus(rng, { bs: [frac(1), frac(2), frac(1, 2)], dRange: [-2, 2] });
      const P = periodDeg(s);
      if (s.c === 0 || Math.abs(s.c) % (P / 2) === 0) s.c = P / 8;
      const cands: Sinus[] = [
        { ...s, c: -s.c },
        { ...s, a: -s.a },
        { ...s, b: s.b.n === 1 && s.b.d === 1 ? frac(2) : frac(1), c: s.c },
        { ...s, d: -s.d === s.d ? s.d + 1 : -s.d },
        { ...s, fn: s.fn === 'sin' ? 'cos' : 'sin' },
      ];
      const picked: Sinus[] = [];
      for (const q of rng.shuffle(cands)) {
        if (picked.length === 3) break;
        if (sameGraph(q, s) || picked.some((p) => sameGraph(p, q))) continue;
        picked.push(q);
      }
      const w = sinusWindow(s);
      const yMin = Math.min(w.yMin, ...picked.map((q) => sinusWindow(q).yMin));
      const yMax = Math.max(w.yMax, ...picked.map((q) => sinusWindow(q).yMax));
      const fig = (q: Sinus) => radPlane({ ...w, yMin, yMax, yLabel: yMax - yMin > 9 ? 2 : 1, curves: [{ f: sinusFn(q) }] });
      const opts = [{ md: 'Graph', figure: fig(s), correct: true }, ...picked.map((q) => ({ md: 'Graph', figure: fig(q) }))];
      const ans = mcFigures(rng, opts);
      if (ans.kind === 'mc') ans.choices.forEach((c, i) => (c.md = `Graph ${String.fromCharCode(65 + i)}`));
      return {
        prompt: `Which graph shows $${sinusTex(s)}$?`,
        parts: [part(ans)],
        hints: ['Find the amplitude, period, phase shift and vertical displacement first.', `Check a key point: ${s.fn === 'sin' ? 'a sine curve with $a > 0$ crosses its midline going up at $x = c$' : 'a cosine curve with $a > 0$ has a maximum at $x = c$'}.`],
        solution: [
          `Amplitude $${fmt(Math.abs(s.a))}$, $${periodWork(s, false)}$, phase shift ${phaseWords(s.c, false)}, midline $y = ${fmt(s.d)}$.`,
          s.fn === 'sin'
            ? `${s.a > 0 ? 'Since $a > 0$, the graph crosses the midline going up' : 'Since $a < 0$, the graph crosses the midline going down'} at $x = ${rt(s.c)}$.`
            : `${s.a > 0 ? 'Since $a > 0$, the graph has a maximum' : 'Since $a < 0$, the graph has a minimum'} at $x = ${rt(s.c)}$.`,
          'Only one graph has all of these features.',
        ],
      };
    }
    // degrees: the parameters of the cosine (or sine) form
    const b = rng.pick([frac(1), frac(2), frac(3), frac(1, 2)]);
    const P = (360 * b.d) / b.n;
    const step = P / 8 >= 15 ? P / 8 : P / 4;
    const s: Sinus = { fn: rng.pick(['sin', 'cos']), a: rng.pick([1, 2, 3, 4]) * rng.sign(), b, c: step * rng.intExcept(-3, 7, [0]), d: rng.int(-2, 3) };
    const target = rng.pick(['sin', 'cos'] as const);
    const form = target === 'sin' ? sinForm(s) : cosForm(s);
    const A = Math.abs(s.a);
    const x0 = -P / 4;
    const x1 = x0 + 2 * P;
    const g = degPlane({ x0, x1, step, yMin: Math.min(s.d - A, 0) - 0.5, yMax: Math.max(s.d + A, 0) + 0.5, curves: [{ f: sinusFn(s, true) }] });
    return {
      prompt: `The graph of a sinusoidal function is shown, with $x$ in degrees. Write it in the form $y = a\\${target} b(x - c) + d$ with $a > 0$, $b > 0$ and the least possible non-negative value of $c$. Give $a$, $b$, $c$ (in degrees) and $d$.`,
      figure: g,
      parts: [numPart(form.a, { label: '$a =$' }), numPart(bVal(form), { label: '$b =$', display: 'fraction' }), numPart(form.c, { label: '$c =$', suffix: '°' }), numPart(form.d, { label: '$d =$' })],
      hints: ['$a = \\dfrac{\\max - \\min}{2}$, $d = \\dfrac{\\max + \\min}{2}$, and $b = \\dfrac{360^\\circ}{\\text{period}}$.', target === 'sin' ? 'A sine curve with $a > 0$ starts a cycle on the midline, going up. Find the first such point with $x \\ge 0$.' : 'A cosine curve with $a > 0$ starts a cycle at a maximum. Find the first maximum with $x \\ge 0$.'],
      solution: [
        `Maximum $${fmt(s.d + A)}$, minimum $${fmt(s.d - A)}$: $a = ${fmt(A)}$ and $d = ${fmt(s.d)}$.`,
        `The period is $${dg(P)}$, so $b = \\dfrac{360^\\circ}{${dg(P)}} = ${bFracTex(form)}$.`,
        target === 'sin' ? `The first point with $x \\ge 0$ where the graph crosses the midline going up is at $x = ${dg(form.c)}$, so $c = ${dg(form.c)}$.` : `The first maximum with $x \\ge 0$ is at $x = ${dg(form.c)}$, so $c = ${dg(form.c)}$.`,
        `$${sinusTex(form, true)}$`,
      ],
      answerDisplay: `$${sinusTex(form, true)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 5.3 — The tangent function
// ---------------------------------------------------------------------------

/** Odd multiples of 90° in [x0, x1]. */
const asymptotesIn = (x0: number, x1: number) => {
  const out: number[] = [];
  for (let k = Math.ceil((x0 - 90) / 180); 90 + 180 * k <= x1; k++) if (90 + 180 * k >= x0) out.push(90 + 180 * k);
  return out;
};
const zerosIn = (x0: number, x1: number) => {
  const out: number[] = [];
  for (let k = Math.ceil(x0 / 180); 180 * k <= x1; k++) out.push(180 * k);
  return out;
};
function tanGraph(x0: number, x1: number, deg: boolean): PlaneFigure {
  const asym = asymptotesIn(x0 - 45, x1 + 45);
  if (deg) return degPlane({ x0, x1, step: 45, label: 90, yMin: -4.5, yMax: 4.5, curves: [{ f: (x) => Math.tan(rv(x)), breaks: asym }], asymptotes: asymptotesIn(x0, x1) });
  return radPlane({ x0, x1, step: 45, label: 90, yMin: -4.5, yMax: 4.5, curves: [{ f: Math.tan, breaks: asym }], asymptotes: asymptotesIn(x0, x1) });
}
const TAN_WINDOWS: Array<[number, number]> = [
  [-360, 360],
  [-180, 540],
  [0, 720],
  [-540, 180],
  [-270, 270],
];

const tangentFeatures = skill({
  id: 'm301-tangent-features',
  name: 'The tangent function',
  description: 'Sketch y = tan x and state its period, asymptotes, zeros, domain and range; solve tan x = k over an interval.',
  outcomes: ['T4'],
  lessonId: 'm301-5-3',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const [x0, x1] = rng.pick(TAN_WINDOWS);
      const deg = rng.chance(0.3);
      const mode = rng.pick(['asym', 'zeros', 'period'] as const);
      const A = (x: number) => ang(x, !deg);
      const dom = `${A(x0)} \\le x \\le ${A(x1)}`;
      if (mode === 'period') {
        const k = rng.pick([-45, 135, 225, -135, 315, -225]);
        const val = Math.round(Math.tan(rv(k)));
        const base = val > 0 ? 45 : -45;
        const n = (k - base) / 180;
        return {
          prompt: `The graph of $y = \\tan x$ is shown${deg ? ', with $x$ in degrees' : ''}. State the period of the function, and use the graph to find the value of $\\tan\\left(${A(k)}\\right)$.`,
          figure: tanGraph(x0, x1, deg),
          parts: [numPart(deg ? 180 : PI, { label: 'Period', ...(deg ? { suffix: '°' } : {}) }), numPart(Math.round(Math.tan(rv(k))), { label: `$\\tan\\left(${A(k)}\\right) =$` })],
          hints: ['The period is the horizontal length of one branch of the graph, from one asymptote to the next.', `$\\tan ${A(45)} = 1$, and the pattern repeats every period.`],
          solution: [
            `The graph repeats every $${deg ? '180^\\circ' : '\\pi'}$, so the period is $${deg ? '180^\\circ' : '\\pi'}$.`,
            `$${A(k)} = ${A(base)} ${n > 0 ? '+' : '-'} ${Math.abs(n) === 1 ? '' : Math.abs(n)}${deg ? '(180^\\circ)' : '\\pi'}$, a whole number of periods from $${A(base)}$, and the graph passes through $\\left(${A(base)}, ${val}\\right)$.`,
            `So $\\tan\\left(${A(k)}\\right) = \\tan\\left(${A(base)}\\right) = ${val}$.`,
          ],
          answerDisplay: `period $${deg ? '180^\\circ' : '\\pi'}$, $\\tan\\left(${A(k)}\\right) = ${Math.round(Math.tan(rv(k)))}$`,
        };
      }
      const vals = mode === 'asym' ? asymptotesIn(x0, x1) : zerosIn(x0, x1);
      return {
        prompt: `The graph of $y = \\tan x$ is shown${deg ? ', with $x$ in degrees' : ''}. Determine ${mode === 'asym' ? 'the equations of the vertical asymptotes' : 'the $x$-intercepts'} for $${dom}$. List the $x$-values, separated by commas.${deg ? '' : ` ${PI_NOTE}`}`,
        figure: tanGraph(x0, x1, deg),
        parts: [part({ kind: 'numbers', values: vals.map((v) => (deg ? v : rv(v))) }, { label: '$x =$', ...(deg ? { suffix: '°' } : {}), placeholder: deg ? 'For example: 90, 270' : 'For example: -pi/2, pi/2' })],
        hints: [
          mode === 'asym' ? '$\\tan x = \\dfrac{\\sin x}{\\cos x}$ is undefined where $\\cos x = 0$.' : '$\\tan x = \\dfrac{\\sin x}{\\cos x}$ is zero where $\\sin x = 0$.',
          mode === 'asym' ? `That happens at odd multiples of $${A(90)}$.` : `That happens at multiples of $${A(180)}$.`,
        ],
        solution: [
          mode === 'asym' ? `$\\cos x = 0$ at $x = ${A(90)} + n${deg ? '(180^\\circ)' : '\\pi'}$, $n \\in \\mathbb{I}$: the asymptotes.` : `$\\sin x = 0$ at $x = n${deg ? '(180^\\circ)' : '\\pi'}$, $n \\in \\mathbb{I}$: the $x$-intercepts.`,
          `In $${dom}$: ${mode === 'asym' ? vals.map((v) => `$x = ${A(v)}$`).join(', ') : `$x = ${vals.map(A).join(',\\ ')}$`}`,
        ],
        answerDisplay: vals.map((v) => `$${A(v)}$`).join(', '),
      };
    }
    if (d === 2) {
      const mode = rng.pick(['domain', 'range', 'statement', 'slope'] as const);
      const deg = rng.chance(0.3);
      if (mode === 'domain') {
        const set = (core: string) => `$\\{x \\mid ${core},\\ x \\in \\mathbb{R}\\}$`;
        const correct = deg ? set('x \\ne 90^\\circ + 180^\\circ n,\\ n \\in \\mathbb{I}') : set('x \\ne \\frac{\\pi}{2} + n\\pi,\\ n \\in \\mathbb{I}');
        const ds = deg
          ? [set('x \\ne 180^\\circ n,\\ n \\in \\mathbb{I}'), set('x \\ne 90^\\circ + 360^\\circ n,\\ n \\in \\mathbb{I}'), '$\\{x \\mid x \\in \\mathbb{R}\\}$']
          : [set('x \\ne n\\pi,\\ n \\in \\mathbb{I}'), set('x \\ne \\frac{\\pi}{2} + 2n\\pi,\\ n \\in \\mathbb{I}'), '$\\{x \\mid x \\in \\mathbb{R}\\}$'];
        return {
          prompt: `What is the domain of $y = \\tan x$${deg ? ', with $x$ in degrees' : ''}?`,
          parts: [part(mc(rng, correct, ds))],
          hints: ['$\\tan x = \\dfrac{\\sin x}{\\cos x}$. Where is it undefined?', `$\\cos x = 0$ at $${deg ? '90^\\circ, 270^\\circ, \\ldots' : '\\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\ldots'}$: these are half a turn apart.`],
          solution: [`$\\tan x$ is undefined where $\\cos x = 0$: $x = ${deg ? '90^\\circ + 180^\\circ n' : '\\frac{\\pi}{2} + n\\pi'}$, $n \\in \\mathbb{I}$.`, `These are the vertical asymptotes. Every other real number is in the domain: ${correct}.`],
        };
      }
      if (mode === 'range') {
        const k = rng.pick([2, 3, 4]);
        return {
          prompt: `State the range of $y = \\tan x$ and the period of $y = \\tan x$${deg ? ' in degrees' : ' in radians'}.`,
          parts: [part(mc(rng, `$${ALL_REALS_Y}$`, [`$${rangeSet(-1, 1)}$`, '$\\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}$', `$${rangeSet(-k, k)}$`]), { label: 'Range' }), numPart(deg ? 180 : PI, { label: 'Period', ...(deg ? { suffix: '°' } : {}) })],
          hints: ['Near each asymptote the graph rises or falls without bound.', 'One branch, between consecutive asymptotes, is a complete cycle.'],
          solution: [`Between consecutive asymptotes, $\\tan x$ takes every real value, so the range is $${ALL_REALS_Y}$. There is no maximum or minimum, so $y = \\tan x$ has no amplitude.`, `The asymptotes are $${deg ? '180^\\circ' : '\\pi'}$ apart and each branch is identical, so the period is $${deg ? '180^\\circ' : '\\pi'}$.`],
          answerDisplay: `range $${ALL_REALS_Y}$, period $${deg ? '180^\\circ' : '\\pi'}$`,
        };
      }
      if (mode === 'statement') {
        const TRUE = [
          'The period of $y = \\tan x$ is $\\pi$.',
          'The graph of $y = \\tan x$ has vertical asymptotes at $x = \\frac{\\pi}{2} + n\\pi$, $n \\in \\mathbb{I}$.',
          'The $x$-intercepts of $y = \\tan x$ are at $x = n\\pi$, $n \\in \\mathbb{I}$.',
          'On each branch, $y = \\tan x$ increases from left to right.',
          '$y = \\tan x$ has no amplitude.',
        ];
        const FALSE = [
          'The period of $y = \\tan x$ is $2\\pi$.',
          'The amplitude of $y = \\tan x$ is $1$.',
          'The range of $y = \\tan x$ is $\\{y \\mid -1 \\le y \\le 1,\\ y \\in \\mathbb{R}\\}$.',
          'The graph of $y = \\tan x$ has vertical asymptotes at $x = n\\pi$, $n \\in \\mathbb{I}$.',
          'On each branch, $y = \\tan x$ decreases from left to right.',
          'The $x$-intercepts of $y = \\tan x$ are at $x = \\frac{\\pi}{2} + n\\pi$, $n \\in \\mathbb{I}$.',
        ];
        const t = rng.pick(TRUE);
        return {
          prompt: 'Which statement about the graph of $y = \\tan x$ is true?',
          figure: tanGraph(-360, 360, false),
          parts: [part(mc(rng, t, rng.sample(FALSE, 3)))],
          hints: ['$\\tan x = \\dfrac{\\sin x}{\\cos x}$: it is zero where $\\sin x = 0$ and undefined where $\\cos x = 0$.', 'Look at the graph: how far apart are the asymptotes, and how does each branch behave?'],
          solution: ['$\\tan x$ is zero where $\\sin x = 0$ ($x = n\\pi$) and undefined where $\\cos x = 0$ ($x = \\frac{\\pi}{2} + n\\pi$).', 'Each branch rises from $-\\infty$ to $+\\infty$ between asymptotes $\\pi$ apart, so the period is $\\pi$, the range is all real numbers, and there is no amplitude.', `The true statement: ${t}`],
        };
      }
      // slope of the terminal arm
      const [p, q, h] = rng.pick([
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
      ] as Array<[number, number, number]>);
      const flip = rng.chance(0.5);
      const x = (flip ? q : p) * rng.sign();
      const y = (flip ? p : q) * rng.sign();
      const v = frac(y, x);
      return {
        prompt: `The terminal arm of an angle $\\theta$ meets the unit circle at $P\\left(${x < 0 ? '-' : ''}\\frac{${Math.abs(x)}}{${h}},\\ ${y < 0 ? '-' : ''}\\frac{${Math.abs(y)}}{${h}}\\right)$. Determine $\\tan\\theta$, the slope of the terminal arm.`,
        parts: [numPart(v.n / v.d, { label: '$\\tan\\theta =$', display: 'fraction' })],
        hints: ['$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{y}{x}$.', 'The terminal arm passes through the origin and $P$, so its slope is $\\dfrac{y - 0}{x - 0}$ too.'],
        solution: [`$\\tan\\theta = \\dfrac{y}{x} = \\dfrac{${y}/${h}}{${x}/${h}} = \\dfrac{${y}}{${x}}$`, `$\\tan\\theta = ${v.d === 1 ? v.n : `${v.n < 0 ? '-' : ''}\\dfrac{${Math.abs(v.n)}}{${v.d}}`}$, which is also the slope of the line through $O(0, 0)$ and $P$.`],
        answerDisplay: `$\\tan\\theta = ${v.n < 0 ? '-' : ''}\\dfrac{${Math.abs(v.n)}}{${v.d}}$`,
      };
    }
    // d === 3
    if (rng.chance(0.55)) {
      // solve tan x = k over an interval
      const [x0, x1] = rng.pick([
        [-360, 360],
        [0, 720],
        [-180, 540],
      ] as Array<[number, number]>);
      const k = retry(
        () => rng.int(-45, 45) / 10,
        (v) => {
          if (Math.abs(v) < 0.2 || [1, Math.sqrt(3), 1 / Math.sqrt(3)].some((s) => Math.abs(Math.abs(v) - s) < 0.03)) return false;
          const base = Math.atan(v);
          const sols: number[] = [];
          for (let n = -6; n <= 6; n++) sols.push(base + n * PI);
          return sols.every((s) => safeRound(s, 2) && Math.abs(s - rv(x0)) > 0.02 && Math.abs(s - rv(x1)) > 0.02);
        },
      );
      const base = Math.atan(k);
      const sols: number[] = [];
      for (let n = -6; n <= 6; n++) {
        const s = base + n * PI;
        if (s >= rv(x0) && s <= rv(x1)) sols.push(s);
      }
      return {
        prompt: `Solve $\\tan x = ${fmt(k)}$ for $${rt(x0)} \\le x \\le ${rt(x1)}$. Give each solution in radians, to the nearest hundredth, separated by commas.`,
        figure: radPlane({ x0, x1, step: 45, label: 90, yMin: -4.5, yMax: 4.5, curves: [{ f: Math.tan, breaks: asymptotesIn(x0 - 45, x1 + 45) }, { f: () => k, color: 'accent' }], asymptotes: asymptotesIn(x0, x1) }),
        parts: [part({ kind: 'numbers', values: sols, decimals: 2 }, { label: '$x \\approx$', placeholder: 'For example: -2.03, 1.11' })],
        hints: ['Each branch of $y = \\tan x$ crosses the horizontal line once, so there is one solution per period.', `Find one solution with $\\tan^{-1}(${fmt(k)})$ (radian mode), then add and subtract $\\pi$.`],
        solution: [`$x = \\tan^{-1}(${fmt(k)}) \\approx ${fmt(base, 4)}$`, `The period of $\\tan x$ is $\\pi$, so every solution is $x \\approx ${fmt(base, 4)} + n\\pi$, $n \\in \\mathbb{I}$.`, `In $${rt(x0)} \\le x \\le ${rt(x1)}$: $x \\approx ${sols.map((s) => fmtFixed(s, 2)).join(',\\ ')}$`],
      };
    }
    // y = tan bx: period and asymptotes in [0, π]
    const b = rng.pick([2, 3, 4]);
    const P = 180 / b;
    const asym: number[] = [];
    for (let k = 0; P / 2 + k * P <= 180; k++) asym.push(P / 2 + k * P);
    return {
      prompt: `The period of $y = \\tan bx$ is $\\dfrac{\\pi}{|b|}$. For $y = \\tan ${b}x$, determine the period, and list the $x$-values of the vertical asymptotes for $0 \\le x \\le \\pi$. ${PI_NOTE}`,
      parts: [numPart(rv(P), { label: 'Period' }), part({ kind: 'numbers', values: asym.map(rv) }, { label: 'Asymptotes: $x =$', placeholder: 'For example: pi/6, pi/2' })],
      hints: [`$y = \\tan x$ has asymptotes where $x = \\frac{\\pi}{2} + n\\pi$. For $y = \\tan ${b}x$, the asymptotes are where $${b}x = \\frac{\\pi}{2} + n\\pi$.`, `Divide by $${b}$: the first asymptote is at $x = ${rt(P / 2)}$ and they repeat every period.`],
      solution: [`Period $= \\dfrac{\\pi}{|b|} = \\dfrac{\\pi}{${b}}$`, `$${b}x = \\frac{\\pi}{2} + n\\pi$ gives $x = ${rt(P / 2)} + n${rt(P)}$.`, `In $0 \\le x \\le \\pi$: $x = ${asym.map((v) => rt(v)).join(',\\ ')}$`],
      answerDisplay: `period $${rt(P)}$; asymptotes ${asym.map((v) => `$x = ${rt(v)}$`).join(', ')}`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 5.4 — Modelling with sinusoidal functions
// ---------------------------------------------------------------------------

const MONTHS: Array<[string, number]> = [
  ['January', 31], ['February', 28], ['March', 31], ['April', 30], ['May', 31], ['June', 30],
  ['July', 31], ['August', 31], ['September', 30], ['October', 31], ['November', 30], ['December', 31],
];
function dayName(t: number): string {
  let n = t;
  for (const [m, len] of MONTHS) {
    if (n <= len) return `${m} ${n}`;
    n -= len;
  }
  return `day ${t}`;
}

interface Model {
  kind: 'ferris' | 'turbine' | 'tide' | 'daylight' | 'temp';
  /** Description that introduces the model. */
  intro: string;
  name: string;
  /** Where the model applies. */
  place: string;
  tex: string;
  f: (t: number) => number;
  fn: TrigFn;
  a: number;
  b: number;
  bTex: string;
  c: number;
  d: number;
  period: number;
  qty: string;
  unit: string;
  unitWord: string;
  tWord: string;
  tUnit: string;
  /** A sensible time window for questions. */
  horizon: number;
  /** Phrase for a time t. */
  when: (t: number) => string;
}

function makeModel(rng: Rng, kinds: Model['kind'][]): Model {
  const kind = rng.pick(kinds);
  const town = rng.pick(['Riverton', 'Brookfield', 'Hillcrest', 'Ashford', 'Westbury', 'Pinewood', 'Lakeside']);
  if (kind === 'ferris') {
    const R = rng.int(8, 25);
    const H = R + rng.pick([1, 1.5, 2, 2.5, 3]);
    const T = rng.pick([40, 48, 60, 72, 80, 90, 100, 120]);
    const k = T / 2;
    return {
      kind, name: 'h', place: town, intro: `A Ferris wheel at a summer fair in ${town} has a radius of $${R}$ m, and its centre is $${fmt(H)}$ m above the ground. It turns at a constant speed, making one rotation every $${T}$ s. A rider boards at the lowest point at $t = 0$.`,
      tex: `h(t) = -${R}\\cos\\left(\\frac{\\pi}{${k}}t\\right) + ${fmt(H)}`,
      f: (t) => -R * Math.cos((PI * t) / k) + H, fn: 'cos', a: -R, b: PI / k, bTex: `\\frac{\\pi}{${k}}`, c: 0, d: H, period: T,
      qty: 'height of the rider above the ground', unit: 'm', unitWord: 'metre', tWord: 'seconds', tUnit: 's', horizon: T, when: (t) => `$${fmt(t)}$ s after boarding`,
    };
  }
  if (kind === 'turbine') {
    const L = rng.int(25, 50);
    const H = rng.int(60, 100);
    const T = rng.pick([3, 4, 5, 6]);
    const bf = frac(2, T);
    return {
      kind, name: 'h', place: 'a wind farm', intro: `The blades of a wind turbine at a wind farm are $${L}$ m long and turn about a hub $${H}$ m above the ground, making one rotation every $${T}$ s. At $t = 0$, the tip of one blade points horizontally and is moving upward.`,
      tex: `h(t) = ${L}\\sin\\left(${piTex(bf)}t\\right) + ${H}`,
      f: (t) => L * Math.sin((2 * PI * t) / T) + H, fn: 'sin', a: L, b: (2 * PI) / T, bTex: piTex(bf), c: 0, d: H, period: T,
      qty: 'height of the blade tip above the ground', unit: 'm', unitWord: 'metre', tWord: 'seconds', tUnit: 's', horizon: T, when: (t) => `at $t = ${fmt(t)}$ s`,
    };
  }
  if (kind === 'tide') {
    const A = rng.int(20, 60) / 10;
    const M = Math.round((A + rng.int(15, 50) / 10) * 10) / 10;
    const tH = rng.int(5, 55) / 10;
    return {
      kind, name: 'D', place: 'the Bay of Fundy', intro: `The depth of the water at a dock in a harbour on the Bay of Fundy can be modelled by a sinusoidal function, where $t$ is the time in hours after midnight.`,
      tex: `D(t) = ${fmt(A)}\\cos\\left(\\frac{2\\pi}{12.4}(t - ${fmt(tH)})\\right) + ${fmt(M)}`,
      f: (t) => A * Math.cos(((2 * PI) / 12.4) * (t - tH)) + M, fn: 'cos', a: A, b: (2 * PI) / 12.4, bTex: '\\frac{2\\pi}{12.4}', c: tH, d: M, period: 12.4,
      qty: 'depth of the water', unit: 'm', unitWord: 'metre', tWord: 'hours', tUnit: 'h', horizon: 24, when: (t) => `at $t = ${fmt(t)}$ h`,
    };
  }
  if (kind === 'daylight') {
    const [city, A, d] = rng.pick([
      ['Riverton', 4.9, 12.2],
      ['Brookfield', 4.3, 12.2],
      ['Pinewood', 5.4, 12.3],
      ['Clearwater', 5.7, 12.3],
      ['Ashford', 4.0, 12.2],
    ] as Array<[string, number, number]>);
    return {
      kind, name: 'L', place: city, intro: `A model for the number of hours of daylight in ${city} on day $t$ of the year ($t = 1$ is January 1) is given below.`,
      tex: `L(t) = ${fmt(A)}\\sin\\left(\\frac{2\\pi}{365}(t - 80)\\right) + ${fmt(d)}`,
      f: (t) => A * Math.sin(((2 * PI) / 365) * (t - 80)) + d, fn: 'sin', a: A, b: (2 * PI) / 365, bTex: '\\frac{2\\pi}{365}', c: 80, d, period: 365,
      qty: 'number of hours of daylight', unit: 'h', unitWord: 'hour', tWord: 'days', tUnit: 'days', horizon: 365, when: (t) => `on day $${t}$ (${dayName(t)})`,
    };
  }
  const A = rng.pick([4, 5, 6, 7, 8, 9]);
  const M = rng.int(-12, 22);
  const c = rng.pick([8, 9, 10]);
  return {
    kind: 'temp', name: 'T', place: town, intro: `On a ${M < 3 ? 'winter' : M < 12 ? 'spring' : 'summer'} day in ${town}, the temperature $t$ hours after midnight can be modelled by the function below.`,
    tex: `T(t) = ${A}\\sin\\left(\\frac{\\pi}{12}(t - ${c})\\right) ${M < 0 ? '-' : '+'} ${Math.abs(M)}`,
    f: (t) => A * Math.sin((PI / 12) * (t - c)) + M, fn: 'sin', a: A, b: PI / 12, bTex: '\\frac{\\pi}{12}', c, d: M, period: 24,
    qty: 'temperature', unit: '°C', unitWord: 'degree Celsius', tWord: 'hours', tUnit: 'h', horizon: 24, when: (t) => `at $t = ${fmt(t)}$ h`,
  };
}

/** Times in [0, horizon] when the model equals k (sorted). */
function timesAt(m: Model, k: number): number[] {
  const out: number[] = [];
  const s = (k - m.d) / m.a;
  if (Math.abs(s) > 1) return out;
  const base = m.fn === 'sin' ? Math.asin(s) : Math.acos(s);
  const angles = m.fn === 'sin' ? [base, PI - base] : [base, -base];
  for (const th of angles)
    for (let n = -3; n <= 3; n++) {
      const t = m.c + (th + 2 * PI * n) / m.b;
      if (t > 1e-9 && t <= m.horizon + 1e-9 && !out.some((u) => Math.abs(u - t) < 1e-9)) out.push(t);
    }
  return out.sort((x, y) => x - y);
}

const roundUnit = (m: Model, dp: number) => (m.unit === '°C' ? `to the nearest tenth of a degree` : `to the nearest ${dp === 1 ? 'tenth' : 'hundredth'} of ${m.unit === 'h' ? 'an hour' : `a ${m.unitWord}`}`);
const tRound = (m: Model) => (m.tUnit === 'days' ? 'to the nearest day' : `to the nearest tenth of ${m.tUnit === 's' ? 'a second' : 'an hour'}`);

const sinusoidApply = skill({
  id: 'm301-sinusoid-apply',
  name: 'Sinusoidal models',
  description: 'Use sinusoidal functions to model periodic situations such as Ferris wheels, tides, daylight and temperature: find values at given times and the times when a value is reached.',
  outcomes: ['T4', 'T5'],
  lessonId: 'm301-5-4',
  calculator: true,
  gen(rng, d): GenOutput {
    if (d === 1) {
      const m = makeModel(rng, ['ferris', 'turbine', 'tide', 'daylight', 'temp']);
      const t = retry(
        () => (m.tUnit === 'days' ? rng.int(1, 365) : m.tUnit === 'h' ? rng.int(1, 47) / 2 : m.period <= 6 ? rng.int(1, 4 * m.period) / 4 : rng.int(1, m.period - 1)),
        (x) => safeRound(m.f(x), 1),
      );
      const v = m.f(t);
      const inner = m.kind === 'ferris' ? `\\frac{\\pi}{${(m.period / 2)}}(${fmt(t)})` : m.kind === 'turbine' ? `${m.bTex}(${fmt(t)})` : `${m.bTex}(${fmt(t)} - ${fmt(m.c)})`;
      return {
        prompt: `${m.intro}\n\n$$${m.tex}$$\n\nDetermine the ${m.qty} ${m.when(t)}, ${roundUnit(m, 1)}.`,
        parts: [numPart(v, { label: `$${m.name}(${fmt(t)}) \\approx$`, suffix: m.unit, decimals: 1 })],
        hints: [`Substitute $t = ${fmt(t)}$ into the equation.`, 'Use radian mode: the angle inside the brackets is in radians.'],
        solution: [`$${m.name}(${fmt(t)}) = ${m.tex.split('= ')[1].replace(/\\left\(([^]*)\\right\)/, `\\left(${inner}\\right)`)}$`, `$\\approx ${fmt(v, 3)}$ (radian mode)`, `The ${m.qty} is about $${fmtFixed(v, 1)}$ ${m.unit}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        // build a rotation model from a description
        const m = makeModel(rng, ['ferris', 'turbine']);
        const t = retry(
          () => (m.period <= 6 ? rng.int(1, 4 * m.period - 1) / 4 : rng.int(1, m.period - 1)),
          (x) => safeRound(m.f(x), 1) && Math.abs(Math.sin(m.b * x)) > 0.05 && Math.abs(Math.cos(m.b * x)) > 0.05,
        );
        const v = m.f(t);
        const form = m.fn === 'cos' ? 'h(t) = a\\cos(bt) + d' : 'h(t) = a\\sin(bt) + d';
        return {
          prompt: `${m.intro} The ${m.qty}, in metres, $t$ seconds later is modelled by a function of the form $${form}$, with $b > 0$. Determine $a$, $b$ (exactly, in terms of $\\pi$) and $d$, and then the height at $t = ${fmt(t)}$ s, to the nearest tenth of a metre. ${PI_NOTE}`,
          parts: [numPart(m.a, { label: '$a =$' }), numPart(m.b, { label: '$b =$' }), numPart(m.d, { label: '$d =$', display: 'decimal' }), numPart(v, { label: `$h(${fmt(t)}) \\approx$`, suffix: 'm', decimals: 1 })],
          hints: [
            `$|a|$ is the radius${m.kind === 'turbine' ? ' (the blade length)' : ''} and $d$ is the height of the centre. ${m.kind === 'ferris' ? 'The rider starts at the lowest point, where $-\\cos$ has its minimum, so $a < 0$.' : 'The tip starts on the midline moving up, like $y = \\sin t$, so $a > 0$.'}`,
            `$b = \\dfrac{2\\pi}{\\text{period}}$. Then substitute $t = ${fmt(t)}$ in radian mode.`,
          ],
          solution: [
            m.kind === 'ferris' ? `The rider starts at the bottom: $h(0) = a + d$ must be the minimum, so $a = -${-m.a}$ and $d = ${fmt(m.d)}$.` : `The tip starts at hub height moving up, so $a = ${m.a}$ and $d = ${m.d}$.`,
            `$b = \\dfrac{2\\pi}{${m.period}} = ${m.bTex}$`,
            `$${m.tex}$`,
            `$h(${fmt(t)}) \\approx ${fmt(v, 3)}$, so the height is about $${fmtFixed(v, 1)}$ m.`,
          ],
          answerDisplay: `$a = ${m.a}$, $b = ${m.bTex}$, $d = ${fmt(m.d)}$; $h(${fmt(t)}) \\approx ${fmtFixed(v, 1)}$ m`,
        };
      }
      // read a graph of the model
      const R = rng.int(8, 20);
      const H = R + 2;
      const T = rng.pick([40, 60, 80, 120]);
      const f = (t: number) => -R * Math.cos((2 * PI * t) / T) + H;
      const yTop = 2 * R + 2;
      const yStep = yTop > 30 ? 5 : 2;
      const grid: GridSpec = { xMin: 0, xMax: 2 * T, yMin: 0, yMax: Math.ceil((yTop + 1) / yStep) * yStep, xStep: T / 8, yStep, xLabel: 'Time (s)', yLabel: 'Height (m)' };
      const figure: PlaneFigure = { type: 'plane', grid, polylines: curvePieces(f, grid).map((points) => ({ points })) };
      return {
        prompt: `The graph shows the height of a rider on a Ferris wheel over time, starting at the lowest point. Use the graph to determine the period, the maximum height, the radius of the wheel, and the first time the rider is at the top.`,
        figure,
        parts: [numPart(T, { label: 'Period', suffix: 's' }), numPart(yTop, { label: 'Maximum height', suffix: 'm' }), numPart(R, { label: 'Radius', suffix: 'm' }), numPart(T / 2, { label: 'First time at the top', suffix: 's', display: 'decimal' })],
        hints: ['The period is the time for one complete cycle, from one minimum to the next.', 'The radius is the amplitude: half the distance between the maximum and minimum heights.'],
        solution: [`The minimums are at $t = 0$ and $t = ${T}$ s, so the period is $${T}$ s.`, `The maximum height is $${yTop}$ m and the minimum is $2$ m.`, `Radius $= \\dfrac{${yTop} - 2}{2} = ${R}$ m`, `The rider is at the top half a rotation after boarding: $t = ${fmt(T / 2)}$ s.`],
      };
    }
    // d === 3: when is a value reached?
    const m = makeModel(rng, ['ferris', 'turbine', 'tide', 'daylight', 'temp']);
    const mode = m.kind === 'tide' || m.kind === 'turbine' ? 'first' : rng.pick(['first', 'duration'] as const);
    const dp = m.tUnit === 'days' ? 0 : 1;
    const A = Math.abs(m.a);
    const k = retry(
      () => {
        const frac01 = rng.int(15, 85) / 100;
        const raw = m.d - A + 2 * A * frac01;
        return m.unit === '°C' || m.kind === 'ferris' || m.kind === 'turbine' ? Math.round(raw) : Math.round(raw * 10) / 10;
      },
      (v) => {
        const ts = timesAt(m, v);
        if (ts.length < 2 || Math.abs(v - m.d) < 0.05 * A) return false;
        if (mode === 'first') return safeRound(ts[0], dp);
        return safeRound(ts[1] - ts[0], dp);
      },
      200,
    );
    const ts = timesAt(m, k);
    const s = (k - m.d) / m.a;
    const inv = m.fn === 'sin' ? '\\sin^{-1}' : '\\cos^{-1}';
    const base = m.fn === 'sin' ? Math.asin(s) : Math.acos(s);
    const argTex = m.c === 0 ? `${m.bTex}t` : `${m.bTex}(t - ${fmt(m.c)})`;
    const angs = m.fn === 'sin' ? [base, PI - base] : [base, 2 * PI - base];
    const solveFor = m.c === 0 ? `t = \\dfrac{\\theta}{${m.bTex}}` : `t = ${fmt(m.c)} + \\dfrac{\\theta}{${m.bTex}}`;
    const steps = [
      `Set $${m.name}(t) = ${fmt(k)}$: $${m.tex.split('= ')[1]} = ${fmt(k)}$`,
      `$\\${m.fn}\\left(${argTex}\\right) = \\dfrac{${fmt(k)} - ${pn(m.d)}}{${pn(m.a)}} \\approx ${fmt(s, 4)}$`,
      `Let $\\theta = ${argTex}$. Then $\\theta = ${inv}(${fmt(s, 4)}) \\approx ${fmt(base, 4)}$ (radian mode), or $\\theta = ${m.fn === 'sin' ? `\\pi - ${pn(Number(fmt(base, 4)))}` : `2\\pi - ${fmt(base, 4)}`} \\approx ${fmt(angs[1], 4)}$, plus any multiple of $2\\pi$.`,
      `Solve for $t$: $${solveFor}$. This gives $t \\approx ${angs.map((a) => fmt(m.c + a / m.b, 2)).join('$ and $t \\approx ')}$${ts.some((x) => angs.every((a) => Math.abs(m.c + a / m.b - x) > 1e-6)) ? `; adding or subtracting the period, $${fmt(m.period)}$ ${m.tWord}, gives the other times` : ''}.`,
      `The times in the first ${m.tUnit === 'days' ? 'year' : m.horizon > m.period ? 'day' : 'cycle'} are $t \\approx ${ts.map((x) => fmt(x, 2)).join(',\\ ')}$.`,
    ];
    if (mode === 'first') {
      const t1 = ts[0];
      return {
        prompt: `${m.intro}\n\n$$${m.tex}$$\n\nDetermine the first time after $t = 0$ when the ${m.qty} is $${fmt(k)}$ ${m.unit}. Give your answer ${tRound(m)}.`,
        parts: [numPart(t1, { label: '$t \\approx$', suffix: m.tUnit, decimals: dp })],
        hints: [`Set the function equal to $${fmt(k)}$ and isolate the ${m.fn === 'sin' ? 'sine' : 'cosine'}.`, `Use ${m.fn === 'sin' ? '$\\sin^{-1}$' : '$\\cos^{-1}$'} in radian mode, then remember the second angle in the cycle and solve for $t$. Choose the smallest positive time. You can check with a graph.`],
        solution: [...steps, `The first time is $t \\approx ${fmtFixed(t1, dp)}$ ${m.tUnit}${m.tUnit === 'days' ? ` (${dayName(Math.round(t1))})` : ''}.`],
      };
    }
    const above = rng.chance(0.6);
    const span = ts[1] - ts[0];
    const between = m.f((ts[0] + ts[1]) / 2) > k;
    const dur = above === between ? span : m.period - span;
    if (!safeRound(dur, dp)) {
      // fall back to the first time (rare)
      return {
        prompt: `${m.intro}\n\n$$${m.tex}$$\n\nDetermine the first time after $t = 0$ when the ${m.qty} is $${fmt(k)}$ ${m.unit}. Give your answer ${tRound(m)}.`,
        parts: [numPart(ts[0], { label: '$t \\approx$', suffix: m.tUnit, decimals: dp })],
        hints: [`Set the function equal to $${fmt(k)}$ and isolate the ${m.fn === 'sin' ? 'sine' : 'cosine'}.`, 'Use the inverse function in radian mode, then solve for $t$.'],
        solution: [...steps, `The first time is $t \\approx ${fmtFixed(ts[0], dp)}$ ${m.tUnit}.`],
      };
    }
    const what = m.kind === 'daylight' ? `For how many days of the year does ${m.place} have ${above ? 'more' : 'less'} than $${fmt(k)}$ hours of daylight?` : m.kind === 'ferris' ? `During one rotation, for how long is the rider ${above ? 'more' : 'less'} than $${fmt(k)}$ m above the ground?` : `For how many hours of the day is the temperature ${above ? 'above' : 'below'} $${fmt(k)}$°C?`;
    return {
      prompt: `${m.intro}\n\n$$${m.tex}$$\n\n${what} Give your answer ${tRound(m)}.`,
      parts: [numPart(dur, { label: 'Time', suffix: m.tUnit, decimals: dp })],
      hints: [`Find the two times in one cycle when the ${m.qty} equals $${fmt(k)}$ ${m.unit}.`, `Then decide whether the ${m.qty} is ${above ? 'above' : 'below'} $${fmt(k)}$ between those times or outside them. A graph helps.`],
      solution: [
        ...steps,
        `Between these times the ${m.qty} is ${between ? 'above' : 'below'} $${fmt(k)}$ ${m.unit} (check the value halfway between).`,
        `Time ${between ? 'above' : 'below'}: $${fmt(ts[1], 2)} - ${fmt(ts[0], 2)} \\approx ${fmt(span, 2)}$ ${m.tUnit}`,
        ...(above === between ? [] : [`Time ${above ? 'above' : 'below'}: $${fmt(m.period)} - ${fmt(span, 2)} \\approx ${fmt(dur, 2)}$ ${m.tUnit}`]),
        `About $${fmtFixed(dur, dp)}$ ${m.tUnit}.`,
      ],
    };
  },
});

export const TRIGFUNCTIONS_SKILLS: SkillDef[] = [sinusoidFeatures, sinusoidEquation, sinusoidGraph, tangentFeatures, sinusoidApply];

/** For lesson figures. */
export const _internal = { radPlane, degPlane, sinusGraph, tanGraph, curvePieces };
