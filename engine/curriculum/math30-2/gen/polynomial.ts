/**
 * Math 30-2 Unit 5 — Polynomial Functions (RF7).
 * Linear, quadratic and cubic functions: degree, end behaviour, intercepts, turning points, domain and range,
 * and their graphs; then modelling data with a regression equation. Students find regression equations with
 * technology in class, so every question gives the equation and never asks for one to be computed.
 */
import { fixedChoice, mc, mcFigures, multi, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Polynomials as ascending coefficient lists [c0, c1, c2, c3]
// ---------------------------------------------------------------------------

type P = number[];

/** Removes floating-point noise (and −0). */
const clean = (x: number) => Math.round(x * 1e9) / 1e9 + 0;
function trim(p: P): P {
  const q = p.map(clean);
  while (q.length > 1 && q[q.length - 1] === 0) q.pop();
  return q;
}
function pmul(a: P, b: P): P {
  const out = new Array<number>(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return trim(out);
}
const peval = (p: P, x: number) => p.reduce((s, c, i) => s + c * x ** i, 0);
const degOf = (p: P) => trim(p).length - 1;
const leadOf = (p: P) => trim(p)[degOf(p)];
/** a(x − r1)(x − r2)… expanded. */
const fromRoots = (a: number, roots: number[]): P => roots.reduce((p, r) => pmul(p, [-r, 1]), [a]);
const negP = (p: P): P => p.map((c) => clean(-c));
/** p(−x): the reflection in the y-axis. */
const reflectP = (p: P): P => p.map((c, i) => clean(i % 2 ? -c : c));

/** LaTeX with the highest power first, or with the powers in the order given. */
function ptex(p: P, order?: number[], v = 'x'): string {
  const idx = order ?? p.map((_, i) => i).reverse();
  let out = '';
  for (const i of idx) {
    const c = clean(p[i] ?? 0);
    if (!c) continue;
    const abs = Math.abs(c);
    const body = i === 0 ? '' : i === 1 ? v : `${v}^{${i}}`;
    const coef = body && abs === 1 ? '' : fmt(abs, 6);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}

/** a(x + 3)(x − 1)², roots in increasing order and repeated roots as powers. */
function factTex(a: number, roots: number[], v = 'x'): string {
  const groups: Array<{ r: number; n: number }> = [];
  for (const r of [...roots].sort((p, q) => p - q)) {
    const g = groups.find((q) => q.r === r);
    if (g) g.n++;
    else groups.push({ r, n: 1 });
  }
  // A factor of x is written first: 2x(x − 3).
  groups.sort((p, q) => (p.r === 0 ? -1 : 0) - (q.r === 0 ? -1 : 0) || p.r - q.r);
  const pow = (n: number) => (n > 1 ? `^{${n}}` : '');
  const body = groups.map((g) => (g.r === 0 ? `${v}${pow(g.n)}` : `(${v} ${g.r < 0 ? '+' : '-'} ${fmt(Math.abs(g.r))})${pow(g.n)}`)).join('');
  return `${a === 1 ? '' : a === -1 ? '-' : fmt(a)}${body}`;
}

const uniqSorted = (xs: number[]) => [...new Set(xs)].sort((p, q) => p - q);

/** x-coordinates of the turning points (where the slope is zero and changes sign). */
function turningXs(p: P): number[] {
  const t = trim(p);
  if (t.length === 3) return [-t[1] / (2 * t[2])];
  if (t.length !== 4) return [];
  const A = 3 * t[3];
  const B = 2 * t[2];
  const C = t[1];
  const disc = B * B - 4 * A * C;
  if (disc <= 1e-9) return [];
  const s = Math.sqrt(disc);
  return [(-B - s) / (2 * A), (-B + s) / (2 * A)].sort((m, n) => m - n);
}

const TYPE_NAME = ['constant', 'linear', 'quadratic', 'cubic'];
const REALS = '\\mathbb{R}';
const allReals = (v: string) => `\\{${v} \\mid ${v} \\in ${REALS}\\}`;
const bound = (v: string, op: string, k: number) => `\\{${v} \\mid ${v} ${op} ${fmt(k)},\\ ${v} \\in ${REALS}\\}`;

// End behaviour, named by the quadrants where the graph starts (far left) and ends (far right).
type EndKey = 'III-I' | 'II-IV' | 'II-I' | 'III-IV';
const END_TEXT: Record<EndKey, string> = {
  'III-I': 'Starts in quadrant III and ends in quadrant I (down on the left, up on the right)',
  'II-IV': 'Starts in quadrant II and ends in quadrant IV (up on the left, down on the right)',
  'II-I': 'Starts in quadrant II and ends in quadrant I (up on both ends)',
  'III-IV': 'Starts in quadrant III and ends in quadrant IV (down on both ends)',
};
const endKey = (deg: number, lead: number): EndKey => (deg % 2 ? (lead > 0 ? 'III-I' : 'II-IV') : lead > 0 ? 'II-I' : 'III-IV');
const endShort = (k: EndKey) => `from quadrant ${k.split('-')[0]} to quadrant ${k.split('-')[1]}`;
function endReason(deg: number, lead: number): string {
  const parity = deg % 2 ? 'odd' : 'even';
  const sign = lead > 0 ? 'positive' : 'negative';
  const shape =
    deg % 2
      ? lead > 0
        ? 'the ends go in opposite directions, down on the left and up on the right'
        : 'the ends go in opposite directions, up on the left and down on the right'
      : lead > 0
        ? 'both ends go up'
        : 'both ends go down';
  return `The degree, $${deg}$, is ${parity} and the leading coefficient is ${sign}, so ${shape}: the graph extends ${endShort(endKey(deg, lead))}.`;
}

const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------

type Pt = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** Sample y = f(x) across the grid and clip it to the grid: one polyline per visible piece. */
function curvePieces(f: (x: number) => number, grid: GridSpec, from = grid.xMin, to = grid.xMax): Pt[][] {
  const n = 200;
  const xs = Array.from({ length: n + 1 }, (_, i) => from + ((to - from) * i) / n);
  const inside = (y: number) => y >= grid.yMin - 1e-9 && y <= grid.yMax + 1e-9;
  const cross = (x0: number, x1: number, level: number): Pt => {
    let lo = x0;
    let hi = x1;
    const s = Math.sign(f(lo) - level);
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2;
      if (Math.sign(f(mid) - level) === s) lo = mid;
      else hi = mid;
    }
    return [r3((lo + hi) / 2), level];
  };
  const pieces: Pt[][] = [];
  let cur: Pt[] = [];
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = f(x);
    if (i > 0) {
      const px = xs[i - 1];
      const py = f(px);
      if (inside(py) && !inside(y)) {
        cur.push(cross(px, x, y > grid.yMax ? grid.yMax : grid.yMin));
        pieces.push(cur);
        cur = [];
        continue;
      }
      if (!inside(py) && inside(y)) cur = [cross(px, x, py > grid.yMax ? grid.yMax : grid.yMin)];
    }
    if (inside(y)) cur.push([r3(x), r3(y)]);
  }
  if (cur.length > 1) pieces.push(cur);
  return pieces.filter((pc) => pc.length > 1);
}

/** A polynomial graph with arrowheads at both ends (the graph continues beyond the grid). */
function polyGraph(p: P, grid: GridSpec, points: PlanePoint[] = []): PlaneFigure {
  const pieces = curvePieces((x) => peval(p, x), grid);
  const segments: PlaneSegment[] = [];
  const span = Math.hypot(grid.xMax - grid.xMin, grid.yMax - grid.yMin) * 0.04;
  const arrow = (pts: Pt[]) => {
    const end = pts[pts.length - 1];
    let from = pts[0];
    for (let i = pts.length - 2; i >= 0; i--) {
      const dx = (pts[i][0] - end[0]) / (grid.xMax - grid.xMin);
      const dy = (pts[i][1] - end[1]) / (grid.yMax - grid.yMin);
      if (Math.hypot(dx, dy) * Math.hypot(grid.xMax - grid.xMin, grid.yMax - grid.yMin) > span) {
        from = pts[i];
        break;
      }
    }
    segments.push({ from, to: end, arrowEnd: true });
  };
  if (pieces.length) {
    arrow([...pieces[0]].reverse());
    arrow(pieces[pieces.length - 1]);
  }
  const fig: PlaneFigure = { type: 'plane', grid, polylines: pieces.map((pts) => ({ points: pts })), segments };
  if (points.length) fig.points = points;
  return fig;
}

function niceStep(span: number, most = 14): number {
  for (const s of [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]) if (span / s <= most) return s;
  return 2000;
}

/** A grid that shows every key point (intercepts and turning points) of each polynomial. */
function fitGrid(ps: P[], keyXs: number[], xMin: number, xMax: number): GridSpec {
  return fitGridEach(ps.map((p) => ({ p, keys: keyXs })), xMin, xMax);
}

/** Like fitGrid, with each polynomial's own key x-values (so a reflected graph is judged on its own region). */
function fitGridEach(fs: Array<{ p: P; keys: number[] }>, xMin: number, xMax: number): GridSpec {
  let lo = 0;
  let hi = 0;
  for (const { p, keys } of fs) {
    const a = Math.min(...keys) - 0.8;
    const b = Math.max(...keys) + 0.8;
    for (let i = 0; i <= 120; i++) {
      const y = peval(p, a + ((b - a) * i) / 120);
      lo = Math.min(lo, y);
      hi = Math.max(hi, y);
    }
  }
  // At most about 11 ticks, so the renderer labels every one.
  let step = niceStep(hi - lo + 1e-9, 9);
  if (step === 1 && hi - lo > xMax - xMin - 2) step = 2;
  return { xMin, xMax, yMin: (Math.ceil(lo / step - 1e-9) - 1) * step, yMax: (Math.floor(hi / step + 1e-9) + 1) * step, xStep: 1, yStep: step };
}

/** Distinct integer roots in [lo, hi], at least `gap` apart, not symmetric about 0 (when `asym`). */
function pickRoots(rng: Rng, n: number, lo: number, hi: number, gap: number, opts: { noZero?: boolean; asym?: boolean } = {}): number[] {
  for (let t = 0; t < 400; t++) {
    const pool: number[] = [];
    for (let i = lo; i <= hi; i++) if (!(opts.noZero && i === 0)) pool.push(i);
    const rs = rng.sample(pool, n).sort((p, q) => p - q);
    if (rs.some((r, i) => i > 0 && r - rs[i - 1] < gap)) continue;
    if (opts.asym && rs.every((r) => rs.includes(-r))) continue;
    return rs;
  }
  return n === 3 ? [-3, 1, 4] : n === 2 ? [-2, 3] : [2];
}

// ---------------------------------------------------------------------------
// 5.1 — Characteristics of polynomial functions: m302-poly-features
// ---------------------------------------------------------------------------

/** A random polynomial of the given degree with small integer coefficients (some zero). */
function randomPoly(rng: Rng, deg: number, opts: { lead?: number; c0?: boolean } = {}): P {
  const p: P = [];
  for (let i = 0; i <= deg; i++) {
    if (i === deg) p.push(opts.lead ?? rng.pick([1, -1, 2, -2, 3, -3, 4, -5, 0.5, -0.5]));
    else if (i === 0 && opts.c0) p.push(rng.nonZero(-9, 9));
    else p.push(rng.chance(0.25) ? 0 : rng.nonZero(-9, 9));
  }
  return p;
}

/** Powers in a jumbled order (not highest first), such as 5 + 2x − x³. */
function jumbled(rng: Rng, p: P): number[] {
  const idx = p.map((_, i) => i).filter((i) => p[i] !== 0);
  if (idx.length < 2) return idx;
  for (let t = 0; t < 20; t++) {
    const o = rng.chance(0.5) ? [...idx] : rng.shuffle(idx);
    if (o[0] !== Math.max(...idx)) return o;
  }
  return [...idx];
}

const fnName = (rng: Rng) => (rng.chance(0.6) ? 'y' : rng.pick(['f(x)', 'g(x)', 'h(x)', 'p(x)']));

function standardStep(p: P, order: number[], lhs: string): string {
  const std = p.map((_, i) => i).reverse();
  const isStd = order.join() === std.filter((i) => p[i] !== 0).join();
  return isStd ? `The equation is already in standard form, highest power first: $${lhs} = ${ptex(p)}$.` : `Write the terms from the highest power down: $${lhs} = ${ptex(p)}$.`;
}

/** d1: degree and leading coefficient. */
function degreeLead(rng: Rng): GenOutput {
  const deg = rng.pick([1, 2, 2, 3, 3]);
  const p = randomPoly(rng, deg);
  const order = rng.chance(0.6) ? jumbled(rng, p) : p.map((_, i) => i).reverse();
  const lhs = fnName(rng);
  const a = leadOf(p);
  return {
    prompt: `For the function $${lhs} = ${ptex(p, order)}$, state the degree and the leading coefficient.`,
    parts: [numPart(deg, { label: 'Degree' }), numPart(a, { label: 'Leading coefficient' })],
    hints: ['The degree is the highest power of $x$ in the function.', 'The leading coefficient is the number multiplying the term with the highest power, including its sign.'],
    solution: [
      standardStep(p, order, lhs),
      `The highest power of $x$ is $x${deg > 1 ? `^{${deg}}` : ''}$, so the degree is $${deg}$: this is a ${TYPE_NAME[deg]} function.`,
      `The leading coefficient is the coefficient of $x${deg > 1 ? `^{${deg}}` : ''}$: $${fmt(a)}$.`,
      `Degree $${deg}$, leading coefficient $${fmt(a)}$.`,
    ],
  };
}

/** d1: end behaviour from the equation. */
function endBehaviourItem(rng: Rng): GenOutput {
  const deg = rng.pick([1, 2, 2, 3, 3, 3]);
  const p = randomPoly(rng, deg);
  const order = rng.chance(0.5) ? jumbled(rng, p) : p.map((_, i) => i).reverse();
  const lhs = fnName(rng);
  const a = leadOf(p);
  const key = endKey(deg, a);
  const others = (Object.keys(END_TEXT) as EndKey[]).filter((k) => k !== key);
  return {
    prompt: `Which statement describes the end behaviour of the graph of $${lhs} = ${ptex(p, order)}$?`,
    parts: [part(mc(rng, END_TEXT[key], others.map((k) => END_TEXT[k])))],
    hints: ['End behaviour depends only on the term with the highest power: its degree and its coefficient.', 'Odd degree: the ends go in opposite directions. Even degree: both ends go the same way. A positive leading coefficient makes the right end go up.'],
    solution: [
      standardStep(p, order, lhs),
      `The leading term is $${ptex(p.map((c, i) => (i === deg ? c : 0)))}$.`,
      endReason(deg, a),
      `${END_TEXT[key]}.`,
    ],
  };
}

/** d1: the y-intercept from the constant term. */
function yInterceptItem(rng: Rng): GenOutput {
  const deg = rng.pick([2, 3, 3]);
  const p = randomPoly(rng, deg, { c0: rng.chance(0.85) });
  const order = jumbled(rng, p);
  const lhs = fnName(rng);
  const x0 = lhs === 'y' ? 'y' : lhs.replace('(x)', '(0)');
  const subst = order.map((i) => (i === 0 ? '' : i)).filter((i) => i !== '').length;
  return {
    prompt: `What is the $y$-intercept of the graph of $${lhs} = ${ptex(p, order)}$?`,
    parts: [numPart(p[0], { label: '$y$-intercept' })],
    hints: ['The graph crosses the $y$-axis where $x = 0$.', 'Substitute $x = 0$: every term with an $x$ becomes $0$, so only the constant term is left.'],
    solution: [
      `On the $y$-axis, $x = 0$. Substitute $x = 0$ into the equation.`,
      `${subst ? 'Every term that contains $x$ becomes $0$' : 'There is no term with $x$'}, so $${x0} = ${fmt(p[0])}$.`,
      `The $y$-intercept is $${fmt(p[0])}$: the graph crosses the $y$-axis at $(0,\\ ${fmt(p[0])})$.`,
    ],
  };
}

/** d1: the greatest possible numbers of x-intercepts and turning points. */
function maxCountsItem(rng: Rng): GenOutput {
  const deg = rng.pick([1, 2, 3, 3]);
  const p = randomPoly(rng, deg);
  const order = rng.chance(0.5) ? jumbled(rng, p) : p.map((_, i) => i).reverse();
  const lhs = fnName(rng);
  return {
    prompt: `Without graphing $${lhs} = ${ptex(p, order)}$, state the greatest number of $x$-intercepts its graph could have and the greatest number of turning points.`,
    parts: [numPart(deg, { label: 'Greatest number of $x$-intercepts' }), numPart(deg - 1, { label: 'Greatest number of turning points' })],
    hints: ['Find the degree: the highest power of $x$.', 'A polynomial of degree $n$ has at most $n$ $x$-intercepts and at most $n - 1$ turning points.'],
    solution: [
      `The highest power of $x$ is $${deg}$, so this is a ${TYPE_NAME[deg]} function of degree $${deg}$.`,
      `A polynomial function of degree $n$ has at most $n$ $x$-intercepts, so at most $${deg}$.`,
      `It has at most $n - 1$ turning points, so at most $${deg - 1}$.`,
      `At most $${deg}$ $x$-intercept${deg > 1 ? 's' : ''} and at most $${deg - 1}$ turning point${deg - 1 === 1 ? '' : 's'}.`,
    ],
  };
}

interface GraphFn {
  p: P;
  roots: number[];
  /** Distinct real x-intercepts. */
  xInts: number[];
  yInt: number;
  turns: number;
}

/** A quadratic or cubic with integer intercepts whose key points fit a readable grid. */
function readableFn(rng: Rng, needY = true): { fn: GraphFn; grid: GridSpec; yReadable: boolean } {
  for (let t = 0; t < 400; t++) {
    const kind = rng.pick(['cubic3', 'cubic3', 'cubic2', 'quad2', 'quad1'] as const);
    let roots: number[];
    if (kind === 'cubic3') roots = pickRoots(rng, 3, -4, 4, 2);
    else if (kind === 'cubic2') {
      const [r, s] = pickRoots(rng, 2, -4, 4, 3);
      roots = rng.chance(0.5) ? [r, r, s] : [r, s, s];
    } else if (kind === 'quad2') roots = pickRoots(rng, 2, -4, 4, 2);
    else {
      const r = rng.nonZero(-4, 4);
      roots = [r, r];
    }
    const a = rng.pick(roots.length === 3 ? [1, -1, 0.5, -0.5] : [1, -1, 0.5, -0.5, 2, -2]);
    const p = fromRoots(a, roots);
    const yInt = p[0];
    if (!Number.isInteger(yInt) || yInt === 0) continue;
    const tx = turningXs(p);
    // x from −5 to 5 keeps every integer labelled.
    const xMin = Math.min(-5, Math.min(...roots) - 1);
    const xMax = Math.max(5, Math.max(...roots) + 1);
    const grid = fitGrid([p], [...roots, ...tx, 0], xMin, xMax);
    if ((grid.yMax - grid.yMin) / (grid.yStep ?? 1) > 11) continue;
    // The y-intercept can be read exactly when it sits on a labelled grid line.
    const yReadable = yInt % (grid.yStep ?? 1) === 0;
    if (needY && !yReadable) continue;
    return { fn: { p, roots, xInts: uniqSorted(roots), yInt, turns: tx.length }, grid, yReadable };
  }
  const p = fromRoots(1, [-3, 1, 4]);
  return { fn: { p, roots: [-3, 1, 4], xInts: [-3, 1, 4], yInt: 12, turns: 2 }, grid: fitGrid([p], [-3, 1, 4, ...turningXs(p), 0], -5, 5), yReadable: true };
}

/** d2: read x-intercepts, y-intercept and turning points from a graph. */
function readGraphItem(rng: Rng): GenOutput {
  const { fn, grid, yReadable } = readableFn(rng, false);
  const deg = fn.roots.length;
  const touch = fn.xInts.length < fn.roots.length;
  const tx = turningXs(fn.p);
  const a = leadOf(fn.p);
  const key = endKey(deg, a);
  const others = (Object.keys(END_TEXT) as EndKey[]).filter((k) => k !== key);
  return {
    prompt: `The graph of a polynomial function is shown. List its $x$-intercepts, count its turning points, and ${yReadable ? 'state its $y$-intercept' : 'describe its end behaviour'}.`,
    figure: polyGraph(fn.p, grid),
    parts: [
      part({ kind: 'numbers', values: fn.xInts }, { label: '$x$-intercepts', placeholder: 'e.g. -2, 3' }),
      numPart(fn.turns, { label: 'Number of turning points' }),
      yReadable ? numPart(fn.yInt, { label: '$y$-intercept' }) : part(mc(rng, END_TEXT[key], others.map((k) => END_TEXT[k])), { label: 'End behaviour' }),
    ],
    hints: ['The $x$-intercepts are where the graph meets the $x$-axis (it may cross or just touch). The $y$-intercept is where it crosses the $y$-axis.', 'A turning point is where the graph changes from going up to going down, or from going down to going up.'],
    solution: [
      `The graph meets the $x$-axis at $x = ${fn.xInts.join(',\\ x = ')}$${touch ? ' (at a repeated root the graph touches the axis and turns back instead of crossing)' : ''}.`,
      `It changes direction ${fn.turns === 1 ? 'once' : 'twice'}, near $x \\approx ${tx.map((x) => fmt(x, 1)).join('$ and $x \\approx ')}$, so it has $${fn.turns}$ turning point${fn.turns > 1 ? 's' : ''}. That fits a ${TYPE_NAME[deg]} function.`,
      yReadable
        ? `It crosses the $y$-axis at $(0,\\ ${fn.yInt})$, so the $y$-intercept is $${fn.yInt}$.`
        : `On the far left the graph is ${key.startsWith('III') ? 'down' : 'up'}, and on the far right it is ${key.endsWith('-I') ? 'up' : 'down'}: it extends ${endShort(key)}.`,
      `$x$-intercepts: $${fn.xInts.join(',\\ ')}$; turning points: $${fn.turns}$; ${yReadable ? `$y$-intercept: $${fn.yInt}$` : `end behaviour: ${endShort(key)}`}.`,
    ],
  };
}

/** d2: intercepts from factored form. */
function factoredItem(rng: Rng): GenOutput {
  const deg = rng.pick([2, 3, 3]);
  let roots: number[];
  const k = rng.int(0, 3);
  if (deg === 3 && k === 0) {
    const [r, s] = pickRoots(rng, 2, -7, 7, 1);
    roots = [r, r, s];
  } else if (k === 1) roots = [0, ...pickRoots(rng, deg - 1, -8, 8, 1, { noZero: true })];
  else roots = pickRoots(rng, deg, -8, 8, 1, { noZero: true });
  const a = rng.pick([1, 1, -1, 2, -2, 3, -3, 0.5, -0.5]);
  const lhs = fnName(rng);
  const y0 = clean(a * roots.reduce((s, r) => s * -r, 1));
  const xInts = uniqSorted(roots);
  const sub = `${a === 1 ? '' : a === -1 ? '-' : `${fmt(a)}`}${[...roots].sort((p, q) => p - q).map((r) => (r === 0 ? '(0)' : `(0 ${r < 0 ? '+' : '-'} ${Math.abs(r)})`)).join('')}`;
  return {
    prompt: `For $${lhs} = ${factTex(a, roots)}$, find the $x$-intercepts and the $y$-intercept.`,
    parts: [part({ kind: 'numbers', values: xInts }, { label: '$x$-intercepts', placeholder: 'e.g. -2, 3' }), numPart(y0, { label: '$y$-intercept' })],
    hints: ['At an $x$-intercept, $y = 0$. A product is zero when one of its factors is zero.', 'For the $y$-intercept, substitute $x = 0$ into the factored form.'],
    solution: [
      `Set the function equal to $0$: $${factTex(a, roots)} = 0$. ${Math.abs(a) === 1 ? 'A product is $0$ only when one of its factors is $0$.' : `The constant $${fmt(a)}$ is never $0$, so one of the other factors must be $0$.`}`,
      `${xInts.map((r) => (r === 0 ? '$x = 0$' : `$x ${r < 0 ? '+' : '-'} ${Math.abs(r)} = 0$ gives $x = ${r}$`)).join('; ')}.${xInts.length < roots.length ? ' The repeated factor gives the same intercept twice, so list it once.' : ''}`,
      `Substitute $x = 0$: $${sub} = ${fmt(y0)}$.`,
      `$x$-intercepts: $${xInts.join(',\\ ')}$; $y$-intercept: $${fmt(y0)}$.`,
    ],
  };
}

/** d2: domain and range from an equation (linear, cubic, or a quadratic in vertex form). */
function domainRangeItem(rng: Rng): GenOutput {
  const kind = rng.pick(['linear', 'cubic', 'cubic', 'quad', 'quad', 'quad'] as const);
  const dr = (d: string, r: string) => `Domain: $${d}$; range: $${r}$`;
  const lhs = fnName(rng);
  if (kind === 'quad') {
    const a = rng.pick([1, -1, 2, -2, 3, -3, 0.5, -0.5]);
    const h = rng.nonZero(-6, 6);
    const k = rng.intExcept(-9, 9, [h, -h, 0]);
    const eq = `${a === 1 ? '' : a === -1 ? '-' : fmt(a)}(x ${h < 0 ? '+' : '-'} ${Math.abs(h)})^{2} ${k < 0 ? '-' : '+'} ${Math.abs(k)}`;
    const op = a > 0 ? '\\ge' : '\\le';
    const opp = a > 0 ? '\\le' : '\\ge';
    const correct = dr(allReals('x'), bound('y', op, k));
    return {
      prompt: `What are the domain and range of $${lhs} = ${eq}$?`,
      parts: [part(mc(rng, correct, [dr(allReals('x'), bound('y', opp, k)), dr(allReals('x'), allReals('y')), dr(bound('x', op, h), bound('y', op, k)), dr(allReals('x'), bound('y', op, h))]))],
      hints: ['Any real number can be substituted into a polynomial, so think about the domain first.', `This quadratic is in vertex form $y = a(x - h)^2 + k$: the vertex is $(h, k)$ and the sign of $a$ tells you whether $k$ is a minimum or a maximum.`],
      solution: [
        `Every real number can be substituted for $x$, so the domain is $${allReals('x')}$.`,
        `The vertex is $(${h},\\ ${k})$. Since $a = ${fmt(a)}$ is ${a > 0 ? 'positive, the parabola opens up and $' + k + '$ is the minimum value' : 'negative, the parabola opens down and $' + k + '$ is the maximum value'}.`,
        `So $y$ takes every value ${a > 0 ? 'from' : 'up to'} $${k}$${a > 0 ? ' upward' : ''}: range $${bound('y', op, k)}$.`,
        `${correct}.`,
      ],
    };
  }
  let p: P;
  if (kind === 'linear') p = [rng.nonZero(-9, 9), rng.pick([2, -2, 3, -3, 4, -1, 0.5, -0.5, 5])];
  else p = randomPoly(rng, 3, { c0: true });
  const c = p[0];
  const correct = dr(allReals('x'), allReals('y'));
  return {
    prompt: `What are the domain and range of $${lhs} = ${ptex(p)}$?`,
    parts: [part(mc(rng, correct, [dr(allReals('x'), bound('y', '\\ge', c)), dr(bound('x', '\\ge', 0), allReals('y')), dr(allReals('x'), bound('y', '\\le', c)), dr(bound('x', '\\ge', 0), bound('y', '\\ge', c))]))],
    hints: ['Can you substitute any real number for $x$?', `Think about the end behaviour: for ${degOf(p) === 1 ? 'a line that is not horizontal' : 'a cubic'}, do the two ends go in the same direction or opposite directions?`],
    solution: [
      `This is a ${TYPE_NAME[degOf(p)]} function. Every real number can be substituted for $x$, so the domain is $${allReals('x')}$.`,
      `${endReason(degOf(p), leadOf(p))} One end goes down without stopping and the other goes up without stopping.`,
      `The graph is unbroken, so it takes every $y$-value on the way: the range is $${allReals('y')}$.`,
      `${correct}.`,
    ],
  };
}

/** d2: which numbers of x-intercepts or turning points are possible (select all). */
function possibleItem(rng: Rng): GenOutput {
  const deg = rng.pick([1, 2, 3, 3]);
  const what = rng.pick(['x-intercepts', 'turning points'] as const);
  const ok =
    what === 'x-intercepts' ? (deg === 1 ? [1] : deg === 2 ? [0, 1, 2] : [1, 2, 3]) : deg === 1 ? [0] : deg === 2 ? [1] : [0, 2];
  const why: Record<string, string> = {
    'x-intercepts1': 'A line of degree 1 is not horizontal, so it crosses the $x$-axis exactly once.',
    'x-intercepts2': 'A parabola can sit entirely above or below the $x$-axis ($0$), touch it at its vertex ($1$), or cross it twice ($2$).',
    'x-intercepts3': 'The ends of a cubic go in opposite directions, so the graph must cross the $x$-axis at least once. It can have $1$, $2$ (one crossing and one touching point) or $3$ $x$-intercepts, but never $0$.',
    'turning points1': 'A line never changes direction, so it has $0$ turning points.',
    'turning points2': 'A parabola changes direction exactly once, at its vertex: $1$ turning point.',
    'turning points3': 'A cubic either has $2$ turning points (it goes up, down, up, or down, up, down) or none (it keeps rising or keeps falling, like $y = x^3$). It cannot have exactly $1$, because its two ends go in opposite directions.',
  };
  const xi = what === 'x-intercepts' ? '$x$-intercepts' : 'turning points';
  return {
    prompt: `Select every number of ${xi} that the graph of a ${TYPE_NAME[deg]} function (degree $${deg}$) could have.`,
    parts: [part(multi(rng, [0, 1, 2, 3].map((n) => ({ md: `$${n}$`, correct: ok.includes(n) })), true))],
    hints: [
      `Sketch a few different ${TYPE_NAME[deg]} graphs and count.`,
      what === 'x-intercepts' ? 'Degree $n$ allows at most $n$ $x$-intercepts. Think about whether the graph is forced to cross the $x$-axis.' : 'Degree $n$ allows at most $n - 1$ turning points. Think about which way the two ends go.',
    ],
    solution: [why[`${what}${deg}`], `Possible: $${ok.join('$, $')}$.`],
  };
}

/** d3: choose the graph of an equation using its end behaviour and y-intercept. */
function matchGraphItem(rng: Rng): GenOutput {
  const cubic = rng.chance(0.65);
  for (let t = 0; t < 300; t++) {
    const roots = cubic ? pickRoots(rng, 3, -4, 4, 2, { noZero: true, asym: true }) : pickRoots(rng, 2, -4, 4, 2, { noZero: true, asym: true });
    const a = rng.pick(cubic ? [1, -1, 0.5, -0.5] : [1, -1, 2, -2, 0.5, -0.5]);
    const p = fromRoots(a, roots);
    const c = p[0];
    if (!Number.isInteger(c) || Math.abs(c) < 2) continue;
    const others: P[] = cubic ? [negP(p), reflectP(p), negP(reflectP(p))] : [negP(p), negP(reflectP(p)), [c, a > 0 ? -2 : 2]];
    const all = [p, ...others];
    const keysOf = (q: P) => [...(q === p || q === others[0] ? roots : roots.map((r) => -r)), ...turningXs(q), 0];
    const keys = all.flatMap(keysOf);
    const xMin = Math.min(-5, Math.floor(Math.min(...keys)) - 1);
    const grid = fitGridEach(all.map((q) => ({ p: q, keys: degOf(q) === 1 ? [0] : keysOf(q) })), xMin, -xMin);
    if ((grid.yMax - grid.yMin) / (grid.yStep ?? 1) > 12) continue;
    const opts = all.map((q, i) => ({ md: '', figure: polyGraph(q, grid), correct: i === 0 }));
    const deg = degOf(p);
    const key = endKey(deg, a);
    return {
      prompt: `Which graph could represent $y = ${ptex(p)}$?`,
      parts: [part(mcFigures(rng, opts))],
      hints: ['Use the leading term to decide the end behaviour.', 'Use the constant term to find the $y$-intercept, then pick the graph that matches both.'],
      solution: [
        endReason(deg, a),
        `The constant term is $${c}$, so the graph crosses the $y$-axis at $(0,\\ ${c})$.`,
        cubic
          ? `Two of the graphs have the wrong end behaviour, and one of the others crosses the $y$-axis at $${-c}$ instead of $${c}$.`
          : `Two of the graphs open the wrong way, and the straight line has degree $1$, not $2$.`,
        `The graph that extends ${endShort(key)} and crosses the $y$-axis at $(0,\\ ${c})$ is the answer.`,
      ],
    };
  }
  return matchGraphItem(rng);
}

/** d3: choose the factored equation of a graph. */
function whichEquationItem(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const { fn, grid } = readableFn(rng);
    const roots = fn.roots;
    if (roots.every((r) => roots.includes(-r))) continue;
    const a = leadOf(fn.p);
    const deg = roots.length;
    const flip = roots.map((r) => -r);
    const k2 = Math.abs(a) === 2 ? a / 4 : 2 * a;
    const cand = [
      { a, roots, ok: true },
      { a, roots: flip },
      { a: -a, roots },
      { a: k2, roots },
      { a: -a, roots: flip },
    ];
    const correct = `$y = ${factTex(a, roots)}$`;
    const distract = cand.slice(1).map((o) => `$y = ${factTex(o.a, o.roots)}$`);
    const yWrong = clean(k2 * roots.reduce((s, r) => s * -r, 1));
    return {
      prompt: 'Which equation matches the graph?',
      figure: polyGraph(fn.p, grid),
      parts: [part(mc(rng, correct, distract))],
      hints: ['Each $x$-intercept $r$ gives a factor $(x - r)$. A graph that touches the axis and turns back has a squared factor.', 'Check the end behaviour (sign of the leading coefficient) and then substitute $x = 0$ to test the $y$-intercept.'],
      solution: [
        `The $x$-intercept${fn.xInts.length > 1 ? 's are' : ' is'} $${fn.xInts.join(',\\ ')}$, so the factors are $${factTex(1, roots)}$${fn.xInts.length < roots.length ? ' (the graph touches the axis at the repeated root and turns back, so that factor is squared)' : ''}.`,
        `The graph extends ${endShort(endKey(deg, a))}. For a ${TYPE_NAME[deg]} (degree $${deg}$, ${deg % 2 ? 'odd' : 'even'}), that means the leading coefficient is ${a > 0 ? 'positive' : 'negative'}.`,
        `The graph crosses the $y$-axis at $${fn.yInt}$. Test $x = 0$ in $y = ${factTex(a, roots)}$: $y = ${fn.yInt}$. ✓ (With $${fmt(k2)}$ in front instead, the $y$-intercept would be $${fmt(yWrong)}$.)`,
        `The equation is $y = ${factTex(a, roots)}$.`,
      ],
    };
  }
  return whichEquationItem(rng);
}

const BOX_PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury'];

/** d3: the volume of an open-top box, V(x) = x(L − 2x)(W − 2x). */
function boxItem(rng: Rng): GenOutput {
  const W = rng.pick([16, 20, 24, 28, 30, 36, 40]);
  const L = W + rng.pick([4, 6, 8, 10, 12, 14, 20]);
  const x = rng.pick([1.5, 2, 2.5, 3, 3.5, 4, 5].filter((c) => c < W / 2 - 1));
  const V = x * (L - 2 * x) * (W - 2 * x);
  const who = rng.pick(NAMES);
  const where = rng.pick(BOX_PLACES);
  const half = W / 2;
  const domain = (lo: string, hi: string) => `$${lo} < x < ${hi}$`;
  return {
    prompt: `${who}, a student in ${where}, makes an open-top box from a ${L} cm by ${W} cm sheet of cardboard by cutting a square with side length $x$ cm from each corner and folding up the sides. The volume of the box, in cubic centimetres, is
$$V(x) = x(${L} - 2x)(${W} - 2x)$$
(a) What are the $x$-intercepts of the graph of $V$? (b) Which values of $x$ make sense in this situation? (c) What is the volume when $x = ${fmt(x)}$?`,
    parts: [
      part({ kind: 'numbers', values: [0, half, L / 2] }, { label: '(a) $x$-intercepts', placeholder: 'e.g. 0, 5, 8' }),
      part(mc(rng, domain('0', fmt(half)), [domain('0', fmt(L / 2)), `$x > 0$`, `$0 < x < ${fmt(L)}$`]), { label: '(b) Values that make sense' }),
      numPart(V, { label: '(c) Volume', suffix: 'cm³' }),
    ],
    hints: ['Set each factor equal to zero for the $x$-intercepts.', `The side length must be positive, and you cannot cut more than half of the ${W} cm side from each end. Then substitute $x = ${fmt(x)}$.`],
    solution: [
      `(a) $V(x) = 0$ when $x = 0$, when $${L} - 2x = 0$ ($x = ${fmt(L / 2)}$), or when $${W} - 2x = 0$ ($x = ${fmt(half)}$). The $x$-intercepts are $0$, $${fmt(half)}$ and $${fmt(L / 2)}$.`,
      `(b) The cut must be longer than $0$ cm, and two cuts along the ${W} cm side must leave a positive width: $${W} - 2x > 0$, so $x < ${fmt(half)}$. The values that make sense are ${domain('0', fmt(half))}. (Between the intercepts $${fmt(half)}$ and $${fmt(L / 2)}$ the formula gives negative volumes, which are impossible.)`,
      `(c) $V(${fmt(x)}) = ${fmt(x)}(${L} - ${fmt(2 * x)})(${W} - ${fmt(2 * x)}) = ${fmt(x)}(${fmt(L - 2 * x)})(${fmt(W - 2 * x)}) = ${fmt(V)}$`,
      `(a) $0$, $${fmt(half)}$, $${fmt(L / 2)}$; (b) ${domain('0', fmt(half))}; (c) the volume is ${fmt(V)} cm³.`,
    ],
  };
}

const polyFeatures = skill({
  id: 'm302-poly-features',
  name: 'Characteristics of polynomial functions',
  description: 'Identify the degree, leading coefficient, end behaviour, intercepts, turning points, domain and range of linear, quadratic and cubic functions from equations and graphs, and match equations with graphs.',
  outcomes: ['RF7'],
  lessonId: 'm302-5-1',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const k = rng.pick(['degree', 'end', 'yint', 'max'] as const);
      return k === 'degree' ? degreeLead(rng) : k === 'end' ? endBehaviourItem(rng) : k === 'yint' ? yInterceptItem(rng) : maxCountsItem(rng);
    }
    if (d === 2) {
      const k = rng.weighted([['read', 3], ['factored', 3], ['domain', 2], ['possible', 2]] as const);
      return k === 'read' ? readGraphItem(rng) : k === 'factored' ? factoredItem(rng) : k === 'domain' ? domainRangeItem(rng) : possibleItem(rng);
    }
    const k = rng.weighted([['match', 3], ['equation', 3], ['box', 2]] as const);
    return k === 'match' ? matchGraphItem(rng) : k === 'equation' ? whichEquationItem(rng) : boxItem(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 — Modelling data with polynomial functions: m302-poly-model
// ---------------------------------------------------------------------------

/** Rounds to n significant figures, as a calculator display would. */
const sig = (x: number, n: number) => (x === 0 ? 0 : Number(x.toPrecision(n)));

/** Cubic with turning points t1, t2: a(x³ − 1.5(t1 + t2)x² + 3t1t2x) + d. */
const cubicFromTurns = (a: number, t1: number, t2: number, d: number): P => [d, 3 * a * t1 * t2, -1.5 * a * (t1 + t2), a];

interface ModelCtx {
  deg: 1 | 2 | 3;
  /** Regression coefficients as a calculator would display them. */
  make: (rng: Rng) => P;
  /** Describes the data (without the regression equation). */
  story: (who: string) => string;
  xs: { lo: number; hi: number; step: number };
  xLabel: string;
  yLabel: string;
  /** Where x makes sense: "at 85 km/h", "in 2016". */
  at: (x: number) => string;
  what: string;
  unit: string;
  dec: number;
  /** Rounding and unit for x when solving for x. */
  xDec: number;
  xUnit: string;
  /** Interpolation and extrapolation inputs. */
  inside: (rng: Rng) => number;
  outside: (rng: Rng) => number;
  /** Why a negative prediction is impossible (contexts where a far extrapolation goes negative). */
  impossible?: string;
  /** The meaning of the slope, for linear contexts: [correct, ...distractors]. */
  slope?: (m: number) => string[];
  /** Quadratic contexts: what the vertex means, and a target y that is reached twice. */
  vertex?: { xWhat: string; yWhat: string };
  /** Quadratic contexts: a target y-value with two x-values in the data range. */
  target?: (p: P, rng: Rng) => number;
}

const between = (rng: Rng, lo: number, hi: number, step: number) => lo + step * rng.int(0, Math.round((hi - lo) / step));

const CTXS: ModelCtx[] = [
  {
    deg: 1,
    make: (rng) => [rng.float(5, 40, 1), rng.float(3.5, 6.5, 2)],
    story: (who) => `${who} works at a café in Ashford and recorded the daily high temperature, $x$ (°C), and the number of iced drinks sold, $y$, on summer days with highs from 12°C to 32°C.`,
    xs: { lo: 12, hi: 32, step: 2 },
    xLabel: 'High temperature (°C)',
    yLabel: 'Iced drinks sold',
    at: (x) => `on a day with a high of ${fmt(x)}°C`,
    what: 'the number of iced drinks sold',
    unit: 'drinks',
    dec: 0,
    xDec: 1,
    xUnit: '°C',
    inside: (rng) => between(rng, 13, 31, 2),
    outside: (rng) => rng.pick([34, 35, 36, 37, 38]),
    slope: (m) => [
      `Each 1°C rise in the high temperature goes with about ${fmt(m)} more iced drinks sold.`,
      `The café sells about ${fmt(m)} iced drinks when the temperature is 0°C.`,
      `Each extra iced drink sold raises the temperature by about ${fmt(m)}°C.`,
      `The café sells ${fmt(m)} iced drinks every hour.`,
    ],
  },
  {
    deg: 1,
    make: (rng) => [rng.float(4, 26, 1), rng.float(0.84, 0.97, 2)],
    story: (who) => `${who}’s health class measured the arm span, $x$ (cm), and the height, $y$ (cm), of students with arm spans from 150 cm to 190 cm.`,
    xs: { lo: 150, hi: 190, step: 4 },
    xLabel: 'Arm span (cm)',
    yLabel: 'Height (cm)',
    at: (x) => `for a student with an arm span of ${fmt(x)} cm`,
    what: 'the height',
    unit: 'cm',
    dec: 1,
    xDec: 1,
    xUnit: 'cm',
    inside: (rng) => between(rng, 151, 189, 1),
    outside: (rng) => rng.pick([120, 125, 130, 200, 205, 210]),
    slope: (m) => [
      `Each extra centimetre of arm span goes with about ${fmt(m)} cm more height.`,
      `A student with an arm span of 0 cm is ${fmt(m)} cm tall.`,
      `Height is ${fmt(m)} times the arm span for every student.`,
      `Each extra centimetre of height goes with about ${fmt(m)} cm less arm span.`,
    ],
  },
  {
    deg: 1,
    make: (rng) => [rng.float(8.5, 11, 1), -rng.float(0.36, 0.48, 3)],
    story: (who) => `${who} tracked a house in a northern town through the heating season: the average outdoor temperature, $x$ (°C), and the natural gas used for heating that day, $y$ (m³), for days from −30°C to 10°C.`,
    xs: { lo: -30, hi: 10, step: 4 },
    xLabel: 'Outdoor temperature (°C)',
    yLabel: 'Natural gas used (m³)',
    at: (x) => `on a day with an average temperature of ${fmt(x).replace('-', '−')}°C`,
    what: 'the natural gas used',
    unit: 'm³',
    dec: 1,
    xDec: 1,
    xUnit: '°C',
    inside: (rng) => between(rng, -29, 9, 1),
    outside: (rng) => rng.pick([-36, -38, -40, 12, 14]),
    impossible: 'a house cannot use a negative amount of gas',
    slope: (m) => [
      `Each 1°C rise in outdoor temperature goes with about ${fmt(-m)} m³ less gas used.`,
      `Each 1°C rise in outdoor temperature goes with about ${fmt(-m)} m³ more gas used.`,
      `The house uses ${fmt(-m)} m³ of gas on a day when it is 0°C.`,
      `The temperature drops ${fmt(-m)}°C for each cubic metre of gas used.`,
    ],
  },
  {
    deg: 1,
    make: (rng) => [rng.float(18, 32, 1), rng.float(1.2, 2.4, 2)],
    story: (who) => `${who} tracked a keyboarding class: the total hours of practice, $x$, and each student’s typing speed, $y$ (words per minute), for 0 to 20 hours of practice.`,
    xs: { lo: 0, hi: 20, step: 2 },
    xLabel: 'Practice (h)',
    yLabel: 'Typing speed (words/min)',
    at: (x) => `after ${fmt(x)} hours of practice`,
    what: 'the typing speed',
    unit: 'words/min',
    dec: 0,
    xDec: 1,
    xUnit: 'h',
    inside: (rng) => between(rng, 1, 19, 1),
    outside: (rng) => rng.pick([25, 30, 40, 50]),
    slope: (m) => [
      `Each extra hour of practice goes with about ${fmt(m)} more words per minute.`,
      `A student who has not practised types ${fmt(m)} words per minute.`,
      `Each extra word per minute takes ${fmt(m)} hours of practice.`,
      `Students practise ${fmt(m)} hours for every word they type.`,
    ],
  },
  {
    deg: 2,
    make: (rng) => {
      const v = rng.int(64, 86);
      const a = sig(rng.float(0.0012, 0.0019, 4), 2);
      return [sig(a * v * v + rng.float(5.2, 6.8, 1), 3), sig(-2 * a * v, 3), a];
    },
    story: (who) => `${who} tested a car on a test track, recording the speed, $x$ (km/h), and the fuel consumption, $y$ (L/100 km), at speeds from 40 km/h to 120 km/h.`,
    xs: { lo: 40, hi: 120, step: 8 },
    xLabel: 'Speed (km/h)',
    yLabel: 'Fuel consumption (L/100 km)',
    at: (x) => `at ${fmt(x)} km/h`,
    what: 'the fuel consumption',
    unit: 'L/100 km',
    dec: 1,
    xDec: 0,
    xUnit: 'km/h',
    inside: (rng) => between(rng, 45, 115, 5),
    outside: (rng) => rng.pick([20, 25, 140, 150]),
    vertex: { xWhat: 'the speed with the lowest fuel consumption', yWhat: 'that lowest fuel consumption' },
    target: (p, rng) => roundTo(peval(p, -p[1] / (2 * p[2])) + rng.float(1, 2.5, 1), 1),
  },
  {
    deg: 2,
    make: (rng) => [rng.float(1, 2, 1), rng.float(13, 19, 1), -4.9],
    story: (who) => `${who} threw a ball straight up and used a motion sensor to record its height, $y$ (m), $x$ seconds after it left the hand, for the first 2.5 s.`,
    xs: { lo: 0, hi: 2.5, step: 0.25 },
    xLabel: 'Time (s)',
    yLabel: 'Height (m)',
    at: (x) => `${fmt(x)} s after it is thrown`,
    what: 'the height of the ball',
    unit: 'm',
    dec: 1,
    xDec: 2,
    xUnit: 's',
    inside: (rng) => rng.pick([0.4, 0.6, 0.9, 1.1, 1.3, 1.7, 1.9, 2.1]),
    outside: (rng) => rng.pick([2.6, 2.7]),
    impossible: 'the ball cannot be below the ground',
    vertex: { xWhat: 'the time when the ball is highest', yWhat: 'the maximum height' },
    target: (p, rng) => roundTo(p[0] + rng.float(1.5, 0.8 * (peval(p, -p[1] / (2 * p[2])) - p[0]), 1), 1),
  },
  {
    deg: 2,
    make: (rng) => {
      const n = rng.int(115, 150);
      const c = rng.int(1250, 1650);
      const a = -sig((rng.int(2400, 3000) - c) / (n * n), 3);
      return [c, sig(-2 * a * n, 4), a];
    },
    story: (who) => `An agronomist working with ${who}’s family farm tested canola plots with different amounts of nitrogen fertilizer, $x$ (kg/ha), from 0 to 200 kg/ha, and measured the yield, $y$ (kg/ha).`,
    xs: { lo: 0, hi: 200, step: 20 },
    xLabel: 'Nitrogen (kg/ha)',
    yLabel: 'Canola yield (kg/ha)',
    at: (x) => `with ${fmt(x)} kg/ha of nitrogen`,
    what: 'the canola yield',
    unit: 'kg/ha',
    dec: 0,
    xDec: 0,
    xUnit: 'kg/ha',
    inside: (rng) => between(rng, 10, 190, 5),
    outside: (rng) => rng.pick([240, 250, 260]),
    impossible: 'a yield cannot be negative',
    vertex: { xWhat: 'the amount of nitrogen that gives the greatest yield', yWhat: 'that greatest yield' },
    target: (p, rng) => roundTo(p[0] + rng.float(0.35, 0.8, 2) * (peval(p, -p[1] / (2 * p[2])) - p[0]), -1),
  },
  {
    deg: 3,
    make: (rng) => {
      const P0 = cubicFromTurns(rng.float(0.05, 0.07, 3), rng.float(4, 5.5, 1), rng.float(12, 13.5, 1), rng.float(1.5, 5, 1));
      return [sig(P0[0], 2), sig(P0[1], 3), sig(P0[2], 3), sig(P0[3], 3)];
    },
    story: (who) => `${who}, a game developer in Brookfield, tracked the number of active players, $y$ (thousands), $x$ months after a mobile game launched, for the first 18 months.`,
    xs: { lo: 0, hi: 18, step: 1 },
    xLabel: 'Months since launch',
    yLabel: 'Active players (thousands)',
    at: (x) => `${fmt(x)} months after launch`,
    what: 'the number of active players',
    unit: 'thousand players',
    dec: 1,
    xDec: 1,
    xUnit: 'months',
    inside: (rng) => rng.pick([2.5, 3.5, 7.5, 8.5, 9.5, 10.5, 14.5, 15.5]),
    outside: (rng) => rng.pick([20, 21, 22]),
  },
  {
    deg: 3,
    make: (rng) => {
      const P0 = cubicFromTurns(-rng.float(0.3, 0.45, 2), rng.float(3, 6, 1), rng.float(18, 22, 1), rng.int(3600, 4800));
      return [sig(P0[0], 4), sig(P0[1], 3), sig(P0[2], 3), sig(P0[3], 2)];
    },
    story: (who) => `${who} researched the population, $y$, of a small town in the north from 1990 to 2020, where $x$ is the number of years since 1990.`,
    xs: { lo: 0, hi: 30, step: 2 },
    xLabel: 'Years since 1990',
    yLabel: 'Population',
    at: (x) => `in ${1990 + x}`,
    what: 'the population',
    unit: 'people',
    dec: 0,
    xDec: 0,
    xUnit: 'years',
    inside: (rng) => rng.pick([3, 7, 9, 13, 17, 23, 27]),
    outside: (rng) => rng.pick([32, 33, 34, 35]),
    impossible: 'a population cannot be negative',
  },
  {
    deg: 3,
    make: (rng) => {
      const P0 = cubicFromTurns(-rng.float(0.025, 0.035, 3), rng.float(2.5, 4, 1), rng.float(11, 13, 1), rng.float(28, 36, 1));
      return [sig(P0[0], 3), sig(P0[1], 3), sig(P0[2], 3), sig(P0[3], 2)];
    },
    story: (who) => `${who} runs a board game company in Riverton and tracked the monthly sales of a new game, $y$ (thousands of copies), $x$ months after release, for the first 16 months.`,
    xs: { lo: 0, hi: 16, step: 1 },
    xLabel: 'Months since release',
    yLabel: 'Monthly sales (thousands)',
    at: (x) => `${fmt(x)} months after release`,
    what: 'the monthly sales',
    unit: 'thousand copies',
    dec: 1,
    xDec: 1,
    xUnit: 'months',
    inside: (rng) => rng.pick([1.5, 2.5, 5.5, 6.5, 8.5, 9.5, 13.5]),
    outside: (rng) => rng.pick([17, 18, 19]),
    impossible: 'sales cannot be negative',
  },
];

/** Safely away from a rounding boundary. */
function safeRound(x: number, dec: number): boolean {
  const s = Math.abs(x) * 10 ** dec;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.04;
}

/** y-values of the data: the model plus a little scatter, at the context's precision. */
function dataPoints(rng: Rng, ctx: ModelCtx, p: P): Pt[] {
  const pts: Pt[] = [];
  const ys: number[] = [];
  for (let x = ctx.xs.lo; x <= ctx.xs.hi + 1e-9; x += ctx.xs.step) ys.push(peval(p, x));
  const spread = (Math.max(...ys) - Math.min(...ys)) * (ctx.deg === 1 ? 0.06 : 0.035);
  let i = 0;
  for (let x = ctx.xs.lo; x <= ctx.xs.hi + 1e-9; x += ctx.xs.step) {
    const y = ys[i++] + spread * (rng.next() * 2 - 1);
    pts.push([roundTo(x, 3), roundTo(y, Math.max(ctx.dec, 1))]);
  }
  return pts;
}

/** A scatter plot of the data, with the regression curve when `curve` is set. */
function scatter(ctx: ModelCtx, pts: Pt[], p: P | null, extraX?: number): PlaneFigure {
  const xs = pts.map((q) => q[0]);
  const ys = pts.map((q) => q[1]);
  const xLo = Math.min(...xs, extraX ?? Infinity);
  const xHi = Math.max(...xs, extraX ?? -Infinity);
  const xStep = [0.5, 1, 2, 5, 10, 20, 25, 50].find((st) => (xHi - xLo) / st <= 10) ?? 100;
  let xMin = Math.floor(xLo / xStep + 1e-9) * xStep;
  if (xMin === xLo && xLo !== 0) xMin -= xStep;
  let xMax = Math.ceil(xHi / xStep - 1e-9) * xStep;
  if (xMax === xHi) xMax += xStep;
  const yLo = Math.min(...ys);
  const yHi = Math.max(...ys);
  const useZero = yLo >= 0 && yLo < 0.6 * (yHi - yLo);
  const yStep = niceStep(yHi - (useZero ? 0 : yLo), 10);
  const yMin = useZero ? 0 : Math.floor(yLo / yStep - 0.5) * yStep;
  const yMax = (Math.floor(yHi / yStep) + 1) * yStep;
  const grid: GridSpec = { xMin, xMax, yMin, yMax, xStep, yStep, xLabel: ctx.xLabel, yLabel: ctx.yLabel };
  const fig: PlaneFigure = { type: 'plane', grid, points: pts.map(([x, y]) => ({ x, y, color: 'brand' as const })) };
  if (p) fig.polylines = curvePieces((x) => peval(p, x), grid, ctx.xs.lo, ctx.xs.hi).map((points) => ({ points, color: 'accent' as const }));
  return fig;
}

const yTex = (p: P) => `y = ${ptex(p)}`;
const REG = ['', 'Linear', 'Quadratic', 'Cubic'];
/** The data story followed by the regression equation. */
const ctxText = (ctx: ModelCtx, p: P, who: string) => `${ctx.story(who)} ${REG[ctx.deg]} regression on the data gives $${yTex(p)}$.`;
/** "0.0015(85)^2 - 0.21(85) + 13.4": the equation with x replaced by a value. */
function substTex(p: P, x: number): string {
  const xs = x < 0 ? `(${fmt(x)})` : `(${fmt(x)})`;
  let out = '';
  for (let i = p.length - 1; i >= 0; i--) {
    const c = p[i];
    if (!c) continue;
    const body = i === 0 ? '' : i === 1 ? xs : `${xs}^{${i}}`;
    const coef = fmt(Math.abs(c), 6);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out;
}
const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const answerText = (y: number, ctx: ModelCtx) => `$${fmtFixed(y, ctx.dec)}$ ${ctx.unit}`;

function pickX(rng: Rng, ctx: ModelCtx, p: P, inside: boolean): number {
  let x = inside ? ctx.inside(rng) : ctx.outside(rng);
  for (let t = 0; t < 30 && !safeRound(peval(p, x), ctx.dec); t++) x = inside ? ctx.inside(rng) : ctx.outside(rng);
  return x;
}

function newModel(rng: Rng, ctx: ModelCtx): P {
  for (let t = 0; t < 50; t++) {
    const p = ctx.make(rng);
    // The model must stay positive (and, for cubics, keep both turning points) across the data.
    let okP = true;
    for (let x = ctx.xs.lo; x <= ctx.xs.hi + 1e-9; x += ctx.xs.step) if (peval(p, x) <= 0) okP = false;
    if (ctx.deg === 3) {
      const tx = turningXs(p);
      if (tx.length !== 2 || tx[0] < ctx.xs.lo + 1 || tx[1] > ctx.xs.hi - 1) okP = false;
    }
    if (okP) return p;
  }
  return ctx.make(rng);
}

/** d1: interpolate with the regression equation. */
function interpolateItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS);
  const p = newModel(rng, ctx);
  const x = pickX(rng, ctx, p, true);
  const y = peval(p, x);
  const who = rng.pick(NAMES);
  const showFig = rng.chance(0.6);
  return {
    prompt: `${ctxText(ctx, p, who)}${showFig ? ' The scatter plot shows the data and the regression curve.' : ''} Use the equation to estimate ${ctx.what} ${ctx.at(x)}. Round ${roundingPhrase(ctx.dec)}.`,
    figure: showFig ? scatter(ctx, dataPoints(rng, ctx, p), p) : undefined,
    parts: [numPart(y, { decimals: ctx.dec, suffix: ctx.unit })],
    hints: [`Substitute $x = ${fmt(x)}$ into the regression equation.`, 'Use a calculator and keep every digit until the final rounding.'],
    solution: [
      `Substitute $x = ${fmt(x)}$: $y = ${substTex(p, x)}$.`,
      `$y \\approx ${fmt(y, 4)}$`,
      `$x = ${fmt(x)}$ is inside the range of the data, so this is interpolation. The model estimates ${ctx.what} ${ctx.at(x)} as about ${answerText(y, ctx)}.`,
    ],
  };
}

/** d2: extrapolate and judge the reliability. */
function extrapolateItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS);
  const p = newModel(rng, ctx);
  let x = pickX(rng, ctx, p, false);
  for (let t = 0; t < 20 && peval(p, x) <= 0; t++) x = pickX(rng, ctx, p, false);
  const y = peval(p, x);
  const who = rng.pick(NAMES);
  const lo = ctx.xs.lo;
  const hi = ctx.xs.hi;
  return {
    prompt: `${ctxText(ctx, p, who)} Use the equation to predict ${ctx.what} ${ctx.at(x)}, ${roundingPhrase(ctx.dec)}. Then decide how much you can trust the prediction.`,
    parts: [
      numPart(y, { decimals: ctx.dec, suffix: ctx.unit, label: 'Prediction' }),
      part(
        fixedChoice(
          [
            'Less reliable: it is an extrapolation beyond the data, and the pattern may not continue',
            'Very reliable: the regression equation fits the data, so it works for every value of $x$',
            'Very reliable: it is an interpolation inside the data',
          ],
          0,
        ),
        { label: 'Reliability' },
      ),
    ],
    hints: [`The data cover $x = ${fmt(lo)}$ to $x = ${fmt(hi)}$. Is $x = ${fmt(x)}$ inside that interval?`, `Substitute $x = ${fmt(x)}$ into the equation.`],
    solution: [
      `Substitute $x = ${fmt(x)}$: $y = ${substTex(p, x)} \\approx ${fmt(y, 4)}$, so about ${answerText(y, ctx)}.`,
      `The data run from $x = ${fmt(lo)}$ to $x = ${fmt(hi)}$, and $x = ${fmt(x)}$ is outside that interval, so this is extrapolation.`,
      'A model only describes the pattern where there is data. Outside it, the real relationship can change, so an extrapolation is less reliable, and less so the further it goes.',
      `Prediction: about ${answerText(y, ctx)}; less reliable because it is an extrapolation.`,
    ],
  };
}

const MODEL_CHOICES = [
  'Linear: the points lie close to a straight line',
  'Quadratic: the points change direction once (one turning point)',
  'Cubic: the points change direction twice (two turning points)',
];

/** d2: choose the type of regression for a scatter plot. */
function chooseModelItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS);
  const p = newModel(rng, ctx);
  const pts = dataPoints(rng, ctx, p);
  const who = rng.pick(NAMES);
  const story = `${ctx.story(who)} The scatter plot shows the data.`;
  const why = [
    'The points rise or fall at a steady rate along a straight line, with no turning point.',
    'The points go one way and then turn and go the other way: there is one turning point, like a parabola.',
    'The points change direction twice (for example up, down, then up again), which needs a cubic: two turning points.',
  ][ctx.deg - 1];
  return {
    prompt: `${story} Which type of regression is most likely to model the data in the scatter plot best?`,
    figure: scatter(ctx, pts, null),
    parts: [part(fixedChoice(MODEL_CHOICES, ctx.deg - 1))],
    hints: ['Look at the overall shape of the points, not at single points.', 'Count how many times the pattern changes direction (from rising to falling or from falling to rising).'],
    solution: [why, `${['Linear', 'Quadratic', 'Cubic'][ctx.deg - 1]} regression is the best choice.`],
  };
}

/** d2: interpret the slope of a linear regression in context. */
function slopeItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS.filter((c) => c.slope));
  const p = newModel(rng, ctx);
  const who = rng.pick(NAMES);
  const [correct, ...wrong] = ctx.slope!(p[1]);
  return {
    prompt: `${ctxText(ctx, p, who)} What does the slope, $${fmt(p[1])}$, tell you?`,
    parts: [part(mc(rng, correct, wrong))],
    hints: ['The slope is the change in $y$ for each increase of $1$ in $x$.', 'Say it in the units of the situation, and check the sign: is $y$ going up or down as $x$ increases?'],
    solution: [
      `In $y = mx + b$, the slope $m = ${fmt(p[1])}$ is the change in $y$ for each increase of 1 in $x$.`,
      `Here $x$ is ${lowerFirst(ctx.xLabel)} and $y$ is ${lowerFirst(ctx.yLabel)}, so ${lowerFirst(correct)}`,
      'This describes the trend in the data, not an exact rule for every case.',
    ],
  };
}

/** d3: solve for x (linear: rearrange; quadratic: the quadratic formula, two answers). */
function solveForXItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS.filter((c) => c.deg === 1 || c.target));
  const p = newModel(rng, ctx);
  const who = rng.pick(NAMES);
  if (ctx.deg === 1) {
    const [b, m] = p;
    let x = ctx.inside(rng) + rng.pick([0.3, 0.6, -0.4]);
    const target = roundTo(peval(p, x), ctx.dec);
    x = (target - b) / m;
    if (!safeRound(x, ctx.xDec)) return solveForXItem(rng);
    return {
      prompt: `${ctxText(ctx, p, who)} According to the model, for what value of $x$ is $y = ${fmt(target)}$? Round ${roundingPhrase(ctx.xDec)}.`,
      parts: [numPart(x, { decimals: ctx.xDec, suffix: ctx.xUnit, label: '$x =$' })],
      hints: [`Substitute $y = ${fmt(target)}$ into the equation.`, 'Subtract the constant term from both sides, then divide by the slope.'],
      solution: [
        `$${fmt(target)} = ${ptex(p)}$`,
        `$${fmt(target)} ${b < 0 ? '+' : '-'} ${fmt(Math.abs(b))} = ${fmt(m)}x$, so $${fmt(roundTo(target - b, 6))} = ${fmt(m)}x$.`,
        `$x = \\dfrac{${fmt(roundTo(target - b, 6))}}{${fmt(m)}} \\approx ${fmt(x, 4)}$`,
        `So $y = ${fmt(target)}$ when $x \\approx ${fmtFixed(x, ctx.xDec)}$, that is, ${ctx.at(roundTo(x, ctx.xDec))}.`,
      ],
    };
  }
  const [c, b, a] = p;
  let target = ctx.target!(p, rng);
  let roots: number[] = [];
  for (let t = 0; t < 40; t++) {
    const disc = b * b - 4 * a * (c - target);
    if (disc > 0) {
      const s = Math.sqrt(disc);
      roots = [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((m, n) => m - n);
      if (roots.every((r) => safeRound(r, ctx.xDec) && r >= ctx.xs.lo && r <= ctx.xs.hi + ctx.xs.step)) break;
    }
    target = ctx.target!(p, rng);
  }
  const disc = b * b - 4 * a * (c - target);
  const cc = roundTo(c - target, 6);
  return {
    prompt: `${ctxText(ctx, p, who)} According to the model, for which values of $x$ is $y = ${fmt(target)}$? Enter both values, separated by a comma, ${roundingPhrase(ctx.xDec)}.`,
    parts: [part({ kind: 'numbers', values: roots, decimals: ctx.xDec }, { label: '$x =$', placeholder: 'e.g. 1.25, 3.4' })],
    hints: [`Set the equation equal to $${fmt(target)}$ and move everything to one side.`, 'Use the quadratic formula $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ (or graph both sides with technology and find the intersections).'],
    solution: [
      `$${fmt(target)} = ${ptex(p)}$, so $${ptex([cc, b, a])} = 0$.`,
      `Use the quadratic formula with $a = ${fmt(a)}$, $b = ${fmt(b)}$, $c = ${fmt(cc)}$: $x = \\dfrac{${fmt(-b, 6)} \\pm \\sqrt{${fmt(disc, 6)}}}{${fmt(2 * a, 6)}}$.`,
      `$x \\approx ${fmt(roots[0], 4)}$ or $x \\approx ${fmt(roots[1], 4)}$. Both are in the range of the data.`,
      `The model gives $y = ${fmt(target)}$ ${ctx.unit} at $x \\approx ${fmtFixed(roots[0], ctx.xDec)}$ and $x \\approx ${fmtFixed(roots[1], ctx.xDec)}$ ${ctx.xUnit}.`,
    ],
  };
}

/** d3: the maximum or minimum of a quadratic model. */
function vertexItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS.filter((c) => c.vertex));
  let p = newModel(rng, ctx);
  for (let t = 0; t < 30; t++) {
    const xv = -p[1] / (2 * p[2]);
    if (safeRound(xv, ctx.xDec) && safeRound(peval(p, xv), ctx.dec)) break;
    p = newModel(rng, ctx);
  }
  const [, b, a] = p;
  const xv = -b / (2 * a);
  const yv = peval(p, xv);
  const who = rng.pick(NAMES);
  const maxmin = a < 0 ? 'maximum' : 'minimum';
  return {
    prompt: `${ctxText(ctx, p, who)} Use the equation to find ${ctx.vertex!.xWhat} and ${ctx.vertex!.yWhat}. Round $x$ ${roundingPhrase(ctx.xDec)} and $y$ ${roundingPhrase(ctx.dec)}.`,
    parts: [numPart(xv, { decimals: ctx.xDec, suffix: ctx.xUnit, label: '$x$' }), numPart(yv, { decimals: ctx.dec, suffix: ctx.unit, label: '$y$' })],
    hints: [`The graph is a parabola that opens ${a < 0 ? 'down' : 'up'}, so the ${maxmin} is at the vertex.`, 'The vertex is on the axis of symmetry, $x = -\\dfrac{b}{2a}$. Substitute that $x$ into the equation (keep all its digits).'],
    solution: [
      `$a = ${fmt(a)}$ is ${a < 0 ? 'negative, so the parabola opens down and the vertex is a maximum' : 'positive, so the parabola opens up and the vertex is a minimum'}.`,
      `$x = -\\dfrac{b}{2a} = -\\dfrac{${fmt(b)}}{2(${fmt(a)})} \\approx ${fmt(xv, 4)}$`,
      `$y = ${substTex(p, roundTo(xv, 4))} \\approx ${fmt(yv, 4)}$ (using the unrounded $x$).`,
      `${ctx.vertex!.xWhat.charAt(0).toUpperCase()}${ctx.vertex!.xWhat.slice(1)} is about ${fmtFixed(xv, ctx.xDec)} ${ctx.xUnit}, and ${ctx.vertex!.yWhat} is about ${answerText(yv, ctx)}.`,
    ],
  };
}

/** d3: an extrapolation that gives an impossible value. */
function judgeItem(rng: Rng): GenOutput {
  const ctx = rng.pick(CTXS.filter((c) => c.impossible));
  const p = newModel(rng, ctx);
  const who = rng.pick(NAMES);
  // The first convenient x past the data where the model goes negative, nudged further out.
  let x0 = ctx.xs.hi;
  const stepOut = ctx.xs.step;
  for (let t = 0; t < 400 && peval(p, x0) >= 0; t++) x0 += stepOut;
  x0 += stepOut * rng.int(1, 2);
  // Nudge x by half a step if the prediction sits on a rounding boundary.
  const x = [0, stepOut / 2, stepOut, -stepOut / 2].map((dx) => roundTo(x0 + dx, 2)).find((c) => peval(p, c) < 0 && safeRound(peval(p, c), ctx.dec)) ?? x0;
  const y = peval(p, x);
  return {
    prompt: `${ctxText(ctx, p, who)} ${who} uses the equation to predict ${ctx.what} ${ctx.at(x)}. Find the prediction (${roundingPhrase(ctx.dec)}), and decide whether it is reasonable.`,
    parts: [
      numPart(y, { decimals: ctx.dec, suffix: ctx.unit, label: 'Prediction' }),
      part(
        mc(rng, `Not reasonable: ${ctx.impossible}. The model is being used far outside the data.`, [
          'Reasonable: the regression equation fits the data, so its predictions are always valid.',
          `Not reasonable: the equation should be solved for $x$ instead of $y$.`,
          'Reasonable: extrapolations are as accurate as interpolations when the data are close to the curve.',
        ]),
        { label: 'Is it reasonable?' },
      ),
    ],
    hints: [`Substitute $x = ${fmt(x)}$ into the equation.`, `The data run from $x = ${fmt(ctx.xs.lo)}$ to $x = ${fmt(ctx.xs.hi)}$. Does the answer make sense in the situation?`],
    solution: [
      `Substitute $x = ${fmt(x)}$: $y = ${substTex(p, x)} \\approx ${fmt(y, 4)}$.`,
      `The prediction is ${answerText(y, ctx)}, which is impossible: ${ctx.impossible}.`,
      `$x = ${fmt(x)}$ is well outside the data ($x = ${fmt(ctx.xs.lo)}$ to $x = ${fmt(ctx.xs.hi)}$). The ${['', 'line', 'parabola', 'cubic'][ctx.deg]} keeps going, but the real situation does not follow it there.`,
      `The prediction, ${answerText(y, ctx)}, is not reasonable: extrapolating this far is not valid.`,
    ],
  };
}

const polyModel = skill({
  id: 'm302-poly-model',
  name: 'Modelling data with polynomial functions',
  description: 'Use a given linear, quadratic or cubic regression equation to interpolate and extrapolate, interpret it in context, choose the best type of model for a scatter plot, and judge whether a prediction is reasonable.',
  outcomes: ['RF7'],
  lessonId: 'm302-5-2',
  calculator: true,
  gen(rng, d): GenOutput {
    if (d === 1) return interpolateItem(rng);
    if (d === 2) {
      const k = rng.weighted([['extrapolate', 3], ['choose', 3], ['slope', 2]] as const);
      return k === 'extrapolate' ? extrapolateItem(rng) : k === 'choose' ? chooseModelItem(rng) : slopeItem(rng);
    }
    const k = rng.weighted([['solve', 3], ['vertex', 3], ['judge', 3]] as const);
    return k === 'solve' ? solveForXItem(rng) : k === 'vertex' ? vertexItem(rng) : judgeItem(rng);
  },
});

export const POLYNOMIAL_SKILLS: SkillDef[] = [polyFeatures, polyModel];
