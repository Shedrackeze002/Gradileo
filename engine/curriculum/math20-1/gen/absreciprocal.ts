/** Math 20-1 Unit 7 — Absolute Value and Reciprocal Functions (AN1, RF2, RF11). */
import { mc, mcFigures, niceNum, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, frac, fracAdd, fracLatex, fracSub, fracValue, isPerfectSquare, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, PlaneLine, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type P = number[]; // ascending coefficients [c0, c1, c2]
type Pt = [number, number];
type Fn = (x: number) => number;

/** LaTeX for a polynomial, highest power first. */
function ptex(p: P, v = 'x'): string {
  const idx = p.map((_, i) => i).filter((i) => p[i] !== 0).reverse();
  if (!idx.length) return '0';
  let out = '';
  for (const i of idx) {
    const c = p[i];
    const abs = Math.abs(c);
    const body = i === 0 ? '' : i === 1 ? v : `${v}^{${i}}`;
    const coef = body && abs === 1 ? '' : fmt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out;
}
const neg = (p: P): P => p.map((c) => -c + 0);
const abs = (s: string) => `\\left|${s}\\right|`;
const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloe', 'Tariq', 'Émilie'];

/** Distinct non-zero integers in [lo, hi]. */
function distinctInts(rng: Rng, n: number, lo: number, hi: number): number[] {
  const pool: number[] = [];
  for (let i = lo; i <= hi; i++) if (i !== 0) pool.push(i);
  return rng.sample(pool, n);
}

const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;
const GRID: GridSpec = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };

/**
 * Sample a function as polylines clipped to the grid. Branches are split at `breaks`
 * (vertical asymptotes), and each polyline stops exactly where the curve leaves the window.
 */
function curve(f: Fn, g: GridSpec, opts: { breaks?: number[]; extra?: number[] } = {}): Pt[][] {
  const breaks = (opts.breaks ?? []).filter((b) => b > g.xMin && b < g.xMax).sort((a, b) => a - b);
  const edges = [g.xMin, ...breaks, g.xMax];
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const out: Pt[][] = [];
  for (let i = 0; i < edges.length - 1; i++) {
    const a = edges[i] + (i > 0 ? 1e-6 : 0);
    const b = edges[i + 1] - (i < edges.length - 2 ? 1e-6 : 0);
    const m = Math.max(16, Math.round((160 * (b - a)) / (g.xMax - g.xMin)));
    const xs: number[] = [];
    for (let k = 0; k <= m; k++) xs.push(a + ((b - a) * k) / m);
    for (const e of opts.extra ?? []) if (e > a && e < b) xs.push(e);
    xs.sort((p, q) => p - q);
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

const vAsym = (x: number): PlaneLine => ({ line: { A: 1, B: 0, C: -x }, dashed: true, color: 'muted' });

function graph(main: Fn, opts: { breaks?: number[]; extra?: number[]; ghost?: Fn; ghostExtra?: number[]; grid?: GridSpec } = {}): PlaneFigure {
  const g = opts.grid ?? GRID;
  const polylines: PlaneFigure['polylines'] = [];
  if (opts.ghost) for (const pts of curve(opts.ghost, g, { extra: opts.ghostExtra })) polylines.push({ points: pts, color: 'muted' });
  for (const pts of curve(main, g, { breaks: opts.breaks, extra: opts.extra })) polylines.push({ points: pts });
  const fig: PlaneFigure = { type: 'plane', grid: g, polylines };
  if (opts.breaks?.length) fig.lines = opts.breaks.map(vAsym);
  return fig;
}

/** The roots of ax² + bx + c = 0 when they are integers or simple fractions; [] if none are real; null otherwise. */
function niceRoots(a: number, b: number, c: number): number[] | null {
  const disc = b * b - 4 * a * c;
  if (disc < 0) return [];
  if (!isPerfectSquare(disc)) return null;
  const s = Math.sqrt(disc);
  const rs = disc === 0 ? [-b / (2 * a)] : [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
  return rs.map((r) => r + 0);
}
const xList = (vals: number[], v = 'x') => (vals.length ? vals.map((x) => `$${v} = ${niceNum(x)}$`).join(' or ') : 'no solution');
const solPart = (vals: number[]): Part => part({ kind: 'numbers', values: vals }, { label: 'Solutions', placeholder: 'e.g. 3, -2 or none' });

// ---------------------------------------------------------------------------
// 7.1 — Absolute value
// ---------------------------------------------------------------------------

const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];
const pn = (n: number) => (n < 0 ? `(${n})` : `${n}`);

const absEvaluate = skill({
  id: 'm201-abs-evaluate',
  name: 'Evaluating absolute value',
  description: 'Evaluate expressions with absolute value and use absolute value for distances and changes.',
  outcomes: ['AN1'],
  lessonId: 'm201-7-1',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['basic', 'basic', 'distance'] as const) : d === 2 ? rng.pick(['ops', 'ops', 'context'] as const) : rng.pick(['fractions', 'substitute', 'total'] as const);
    const hint1 = 'The absolute value of a number is its distance from $0$, so it is never negative: $|{-7}| = 7$ and $|7| = 7$.';
    if (kind === 'basic') {
      const t = rng.int(0, 4);
      const a = -rng.int(2, 15);
      const b = rng.nonZero(-15, 15);
      let tex = '';
      let value = 0;
      let steps: string[] = [];
      if (t === 0) {
        tex = `${abs(`${a}`)} + ${abs(`${b}`)}`;
        value = -a + Math.abs(b);
        steps = [`$${abs(`${a}`)} = ${-a}$ and $${abs(`${b}`)} = ${Math.abs(b)}$.`, `$${-a} + ${Math.abs(b)} = ${value}$`];
      } else if (t === 1) {
        const c = rng.int(1, 12);
        const e = c + rng.int(3, 15);
        tex = abs(`${c} - ${e}`);
        value = e - c;
        steps = [`Work inside the bars first: $${c} - ${e} = ${c - e}$.`, `$${abs(`${c - e}`)} = ${value}$`];
      } else if (t === 2) {
        tex = `${abs(`${b}`)} - ${abs(`${a}`)}`;
        value = Math.abs(b) - -a;
        steps = [`$${abs(`${b}`)} = ${Math.abs(b)}$ and $${abs(`${a}`)} = ${-a}$.`, `$${Math.abs(b)} - ${-a} = ${value}$`];
      } else if (t === 3) {
        tex = `-${abs(`${a}`)}`;
        value = a;
        steps = [`Evaluate the absolute value first: $${abs(`${a}`)} = ${-a}$.`, `The negative sign is outside the bars, so the answer is $${a}$.`];
      } else {
        const k = rng.int(2, 6);
        tex = `${k}${abs(`${a}`)}`;
        value = -k * a;
        steps = [`$${abs(`${a}`)} = ${-a}$`, `$${k} \\times ${-a} = ${value}$`];
      }
      return {
        prompt: `Evaluate $${tex}$.`,
        parts: [numPart(value)],
        hints: [hint1, 'Evaluate everything inside the bars first, then take the absolute value, then finish the calculation.'],
        solution: steps,
      };
    }
    if (kind === 'distance') {
      let [a, b] = [-rng.int(1, 8), rng.int(1, 8)];
      if (rng.chance(0.4)) [a, b] = distinctInts(rng, 2, -9, 9).sort((p, q) => p - q);
      while (b - a > 9) b--;
      const [A, B] = rng.chance(0.5) ? [a, b] : [b, a];
      // Twelve labelled ticks, so every integer can be read.
      const lo = a - 1;
      return {
        prompt: `Points $A$ and $B$ are shown on the number line. Use absolute value to find the distance between them.`,
        figure: { type: 'numberLine', min: lo, max: lo + 11, step: 1, points: [{ value: A, label: 'A' }, { value: B, label: 'B' }] },
        parts: [numPart(Math.abs(A - B), { suffix: 'units' })],
        hints: ['The distance between two numbers $a$ and $b$ is $|a - b|$ (or $|b - a|$ — they are equal).', `Read the two numbers: $A = ${A}$ and $B = ${B}$.`],
        solution: [`$A = ${A}$ and $B = ${B}$.`, `Distance $= ${abs(`${A} - ${pn(B)}`)} = ${abs(`${A - B}`)} = ${Math.abs(A - B)}$ units.`, `Check: $${abs(`${B} - ${pn(A)}`)} = ${abs(`${B - A}`)} = ${Math.abs(A - B)}$ as well.`],
      };
    }
    if (kind === 'ops') {
      const t = rng.int(0, 3);
      let tex = '';
      let value = 0;
      let steps: string[] = [];
      if (t === 0) {
        const k = rng.int(2, 5);
        const a = -rng.int(2, 9);
        const b = rng.int(1, 6);
        const c = b + rng.int(3, 10);
        tex = `${k}${abs(`${a}`)} - ${abs(`${b} - ${c}`)}`;
        value = -k * a - (c - b);
        steps = [`Inside the bars: $${abs(`${a}`)} = ${-a}$ and $${abs(`${b} - ${c}`)} = ${abs(`${b - c}`)} = ${c - b}$.`, `$${k}(${-a}) - ${c - b} = ${-k * a} - ${c - b} = ${value}$`];
      } else if (t === 1) {
        const a = rng.int(1, 9);
        const k = rng.int(2, 6);
        const m = rng.int(2, 8);
        tex = abs(`${a} - ${k} \\times ${m}`);
        value = Math.abs(a - k * m);
        steps = [`Order of operations inside the bars: multiply first, $${k} \\times ${m} = ${k * m}$.`, `$${a} - ${k * m} = ${a - k * m}$, and $${abs(`${a - k * m}`)} = ${value}$.`];
      } else if (t === 2) {
        const a = rng.nonZero(-6, 6);
        const b = a * a + rng.nonZero(-12, 12);
        const extra = rng.int(1, 9);
        tex = `${abs(`${pn(a)}^2 - ${pn(b)}`)} + ${extra}`;
        value = Math.abs(a * a - b) + extra;
        steps = [`Inside the bars: $${pn(a)}^2 - ${pn(b)} = ${a * a} - ${pn(b)} = ${a * a - b}$.`, `$${abs(`${a * a - b}`)} + ${extra} = ${Math.abs(a * a - b)} + ${extra} = ${value}$`];
      } else {
        const c = rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
        const q = rng.int(2, 9);
        const a = rng.int(-10, 10);
        const b = a + q * Math.abs(c) * rng.pick([1, -1]);
        tex = `\\dfrac{${abs(`${a} - ${pn(b)}`)}}{${abs(`${c}`)}}`;
        value = Math.abs(a - b) / Math.abs(c);
        steps = [`Numerator: $${abs(`${a} - ${pn(b)}`)} = ${abs(`${a - b}`)} = ${Math.abs(a - b)}$. Denominator: $${abs(`${c}`)} = ${Math.abs(c)}$.`, `$\\dfrac{${Math.abs(a - b)}}{${Math.abs(c)}} = ${value}$`];
      }
      return {
        prompt: `Evaluate $${tex}$.`,
        parts: [numPart(value)],
        hints: [hint1, 'Absolute value bars act like brackets: simplify inside them first, using the order of operations.'],
        solution: steps,
      };
    }
    if (kind === 'context') {
      if (rng.chance(0.55)) {
        const city = rng.pick(CITIES);
        const low = -rng.int(8, 32);
        const high = rng.int(-6, 12);
        return {
          prompt: `One January day in ${city}, the temperature was $${low}\\,^{\\circ}\\text{C}$ at 7 a.m. and $${high}\\,^{\\circ}\\text{C}$ at 3 p.m. Use absolute value to find the change in temperature.`,
          parts: [numPart(high - low, { suffix: '°C' })],
          hints: ['The size of a change is the absolute value of the difference: $|\\text{final} - \\text{initial}|$.', `Calculate $${abs(`${high} - ${pn(low)}`)}$.`],
          solution: [`Change $= ${abs(`${high} - ${pn(low)}`)} = ${abs(`${high - low}`)} = ${high - low}$`, `The temperature changed by $${high - low}\\,^{\\circ}\\text{C}$.`],
        };
      }
      const name = rng.pick(NAMES);
      const depth = rng.int(6, 30);
      const height = rng.int(4, 40);
      const lake = rng.pick(['Clearwater Lake', 'Lake Ashford', 'Pinewood Lake', 'Stonebridge Lake']);
      return {
        prompt: `${name} is scuba diving in ${lake} at an elevation of $${-depth}$ m relative to the surface. An osprey is flying directly above at $${height}$ m. Use absolute value to find the vertical distance between them.`,
        parts: [numPart(height + depth, { suffix: 'm' })],
        hints: ['Distance between two positions $a$ and $b$ is $|a - b|$.', `Calculate $${abs(`${height} - ${pn(-depth)}`)}$.`],
        solution: [`Distance $= ${abs(`${height} - ${pn(-depth)}`)} = ${abs(`${height + depth}`)} = ${height + depth}$`, `They are ${height + depth} m apart vertically.`],
      };
    }
    if (kind === 'fractions') {
      const den = rng.pick([2, 3, 4, 5, 6, 8]);
      const f1 = frac(-rng.int(1, 2 * den - 1), den);
      const k = rng.int(1, 4);
      const den2 = rng.pick([2, 3, 4, 5]);
      const f2 = frac(rng.int(1, den2 - 1), den2);
      const inner = fracSub(f2, frac(k));
      const op = rng.pick(['+', '-'] as const);
      const a1 = frac(Math.abs(f1.n), f1.d);
      const a2 = frac(Math.abs(inner.n), inner.d);
      const value = op === '+' ? fracAdd(a1, a2) : fracSub(a1, a2);
      const L = (f: Frac) => fracLatex(f, { dfrac: true });
      return {
        prompt: `Evaluate $${abs(L(f1))} ${op} ${abs(`${L(f2)} - ${k}`)}$. Give an exact answer.`,
        parts: [numPart(fracValue(value))],
        hints: [hint1, 'Simplify inside the second pair of bars first, using a common denominator.'],
        solution: [`$${abs(L(f1))} = ${L(a1)}$`, `$${L(f2)} - ${k} = ${L(inner)}$, so $${abs(`${L(f2)} - ${k}`)} = ${L(a2)}$.`, `$${L(a1)} ${op} ${L(a2)} = ${L(value)}$`],
        answerDisplay: `$${L(value)}$`,
      };
    }
    if (kind === 'substitute') {
      const x0 = rng.nonZero(-8, 8);
      const a = rng.int(1, 3);
      const b = rng.nonZero(-9, 9);
      const c = rng.int(1, 4);
      const e = rng.nonZero(-6, 6);
      const k = rng.int(1, 3);
      const op = rng.pick(['+', '-'] as const);
      const in1 = ptex([b, a]);
      const in2 = ptex([e, 1]);
      const v1 = a * x0 + b;
      const v2 = x0 + e;
      const value = c * Math.abs(v1) + (op === '+' ? 1 : -1) * k * Math.abs(v2);
      const sub = (p: P) => ptex(p).replace(/(\d*)x/, (_, co: string) => `${co}(${x0})`);
      return {
        prompt: `Evaluate $${c === 1 ? '' : c}${abs(in1)} ${op} ${k === 1 ? '' : k}${abs(in2)}$ when $x = ${x0}$.`,
        parts: [numPart(value)],
        hints: ['Substitute the value of $x$, then simplify inside each pair of bars before taking the absolute value.', hint1],
        solution: [
          `Substitute $x = ${x0}$: $${c === 1 ? '' : c}${abs(sub([b, a]))} ${op} ${k === 1 ? '' : k}${abs(sub([e, 1]))}$`,
          `$= ${c === 1 ? '' : c}${abs(`${v1}`)} ${op} ${k === 1 ? '' : k}${abs(`${v2}`)} = ${c === 1 ? '' : `${c}(`}${Math.abs(v1)}${c === 1 ? '' : ')'} ${op} ${k === 1 ? '' : `${k}(`}${Math.abs(v2)}${k === 1 ? '' : ')'}$`,
          `$= ${value}$`,
        ],
      };
    }
    // total: a sequence of positions; total distance is the sum of absolute changes.
    const drone = rng.chance(0.5);
    const vals: number[] = [];
    const step = drone ? 5 : 20;
    vals.push(drone ? rng.int(0, 10) * 5 : -rng.int(1, 12) * 20);
    for (let i = 0; i < 3; i++) {
      let next = vals[i];
      // The third move reverses direction at least once, so the total distance is more than the net change.
      const mustTurn = i === 2 && Math.sign(vals[2] - vals[1]) === Math.sign(vals[1] - vals[0]);
      while (next === vals[i] || (drone && next < 0) || (!drone && (next > 40 || next < -400)) || (mustTurn && Math.sign(next - vals[i]) === Math.sign(vals[i] - vals[i - 1]))) next = vals[i] + rng.nonZero(-9, 9) * step;
      vals.push(next);
    }
    const legs = vals.slice(1).map((v, i) => Math.abs(v - vals[i]));
    const total = legs.reduce((sum, x) => sum + x, 0);
    const prompt = drone
      ? `A survey drone starts at a height of ${vals[0]} m. It moves straight up or down to ${vals[1]} m, then to ${vals[2]} m, then to ${vals[3]} m. What total vertical distance does it travel?`
      : `Positions in a mine shaft are measured from ground level: negative below ground, positive up in the headframe. A cage (mine elevator) starts at $${vals[0]}$ m, then travels to $${vals[1]}$ m, then to $${vals[2]}$ m, then to $${vals[3]}$ m. What total distance does the cage travel?`;
    return {
      prompt,
      parts: [numPart(total, { suffix: 'm' })],
      hints: ['Find the absolute value of each change, then add them. Distances do not cancel the way changes do.', `First leg: $${abs(`${vals[1]} - ${pn(vals[0])}`)} = ${legs[0]}$.`],
      solution: [
        `Legs: $${legs.map((_, i) => abs(`${vals[i + 1]} - ${pn(vals[i])}`)).join(' + ')}$`,
        `$= ${legs.join(' + ')} = ${total}$`,
        `The total distance is ${total} m. (The net change in position is $${vals[3] - vals[0]}$ m, which is smaller in size, because moves up and down partly cancel.)`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.2 — Absolute value functions
// ---------------------------------------------------------------------------

const RANGE = {
  all: '\\{y \\mid y \\in \\mathbb{R}\\}',
  ge: (k: number) => `\\{y \\mid y \\ge ${niceNum(k)},\\ y \\in \\mathbb{R}\\}`,
  gt: (k: number) => `\\{y \\mid y > ${niceNum(k)},\\ y \\in \\mathbb{R}\\}`,
  le: (k: number) => `\\{y \\mid y \\le ${niceNum(k)},\\ y \\in \\mathbb{R}\\}`,
  between: (k: number) => `\\{y \\mid 0 \\le y \\le ${niceNum(k)},\\ y \\in \\mathbb{R}\\}`,
};
const DOMAIN_ALL = '\\{x \\mid x \\in \\mathbb{R}\\}';

/** y = {first, cond1; second, cond2} as LaTeX. */
const cases = (a: string, ca: string, b: string, cb: string) => `y = \\begin{cases} ${a}, & ${ca} \\\\ ${b}, & ${cb} \\end{cases}`;

const absFunction = skill({
  id: 'm201-abs-function',
  name: 'Absolute value functions',
  description: 'Graph y = |f(x)| for linear and quadratic f(x), and state its intercepts, domain and range, and piecewise form.',
  outcomes: ['RF2'],
  lessonId: 'm201-7-2',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['linIntercepts', 'linGraph'] as const)
        : d === 2
          ? rng.pick(['linPiecewise', 'domainRange', 'quadIntercepts'] as const)
          : rng.pick(['quadPiecewise', 'quadRange', 'quadGraph'] as const);
    if (kind === 'linIntercepts' || kind === 'linGraph' || kind === 'linPiecewise' || kind === 'domainRange') {
      const a = rng.pick([1, 2, 3, -1, -2, -3]);
      const r = rng.nonZero(-4, 4);
      const f: P = [-a * r, a];
      const ft = ptex(f);
      const F: Fn = (x) => a * x - a * r;
      if (kind === 'linIntercepts') {
        return {
          prompt: `For $y = ${abs(ft)}$, find the $x$-intercept and the $y$-intercept.`,
          parts: [numPart(r, { label: '$x$-intercept' }), numPart(Math.abs(a * r), { label: '$y$-intercept' })],
          hints: ['The graph of $y = |f(x)|$ touches the $x$-axis where $f(x) = 0$.', 'For the $y$-intercept, substitute $x = 0$ and take the absolute value.'],
          solution: [`$x$-intercept: $${ft} = 0$ gives $x = ${r}$, so the vertex of the V is $(${r}, 0)$.`, `$y$-intercept: $${abs(ptex(f).replace('x', '(0)'))} = ${abs(`${-a * r}`)} = ${Math.abs(a * r)}$.`, `The intercepts are $x = ${r}$ and $y = ${Math.abs(a * r)}$.`],
        };
      }
      if (kind === 'linGraph') {
        const opts = [
          { md: '', figure: graph((x) => Math.abs(F(x)), { extra: [r] }), correct: true },
          { md: '', figure: graph(F) },
          { md: '', figure: graph((x) => Math.abs(a * x + a * r), { extra: [-r] }) },
          { md: '', figure: graph((x) => -Math.abs(F(x)), { extra: [r] }) },
        ];
        return {
          prompt: `Which graph shows $y = ${abs(ft)}$?`,
          parts: [part(mcFigures(rng, opts))],
          hints: ['Start with the line $y = ' + ft + '$. Any part below the $x$-axis is reflected above it.', `The graph touches the $x$-axis where $${ft} = 0$.`],
          solution: [`The line $y = ${ft}$ crosses the $x$-axis at $x = ${r}$.`, 'Taking the absolute value reflects the part of the line below the $x$-axis in the $x$-axis, so the graph is a V with its vertex at ' + `$(${r}, 0)$ and no points below the $x$-axis.`],
        };
      }
      if (kind === 'linPiecewise') {
        const pos = a > 0 ? `x \\ge ${r}` : `x \\le ${r}`;
        const negc = a > 0 ? `x < ${r}` : `x > ${r}`;
        const nf = ptex(neg(f));
        const correct = cases(ft, pos, nf, negc);
        const wrongPart = ptex([f[0], -f[1]]);
        const distractors = [
          cases(nf, pos, ft, negc),
          cases(ft, a > 0 ? `x \\ge ${-r}` : `x \\le ${-r}`, nf, a > 0 ? `x < ${-r}` : `x > ${-r}`),
          a < 0 ? cases(ft, `x \\ge ${r}`, nf, `x < ${r}`) : cases(ft, pos, wrongPart, negc),
          cases(ft, pos, wrongPart, negc),
        ];
        return {
          prompt: `Which is the piecewise form of $y = ${abs(ft)}$?`,
          parts: [part(mc(rng, `$${correct}$`, distractors.map((s) => `$${s}$`)))],
          hints: ['$|A| = A$ when $A \\ge 0$, and $|A| = -A$ when $A < 0$.', `Solve $${ft} \\ge 0$ to find where the expression keeps its sign.${a < 0 ? ' Dividing by a negative reverses the inequality.' : ''}`],
          solution: [
            `$${ft} \\ge 0$ when $${pos}$${a < 0 ? ' (dividing by a negative number reverses the inequality)' : ''}. There, $y = ${ft}$.`,
            `When $${negc}$, the expression is negative, so $y = -(${ft}) = ${nf}$.`,
            `$${correct}$`,
          ],
        };
      }
      // domainRange (linear)
      const correct = `Domain $${DOMAIN_ALL}$; range $${RANGE.ge(0)}$`;
      const distractors = [`Domain $${DOMAIN_ALL}$; range $${RANGE.all}$`, `Domain $${DOMAIN_ALL}$; range $${RANGE.gt(0)}$`, `Domain $\\{x \\mid x \\ge ${r},\\ x \\in \\mathbb{R}\\}$; range $${RANGE.ge(0)}$`, `Domain $${DOMAIN_ALL}$; range $${RANGE.ge(Math.abs(a * r))}$`];
      return {
        prompt: `What are the domain and range of $y = ${abs(ft)}$?`,
        parts: [part(mc(rng, correct, rng.shuffle(distractors).slice(0, 3)))],
        hints: ['Can you take the absolute value of any real number? That answers the domain.', `The lowest point of the V is on the $x$-axis, at $(${r}, 0)$.`],
        solution: [`Any real $x$ can be substituted, so the domain is $${DOMAIN_ALL}$.`, `The vertex is $(${r}, 0)$ and an absolute value is never negative, so $y$ takes every value from $0$ up: the range is $${RANGE.ge(0)}$.`],
      };
    }
    if (kind === 'quadIntercepts' || kind === 'quadPiecewise') {
      let [r1, r2] = distinctInts(rng, 2, -6, 6).sort((p, q) => p - q);
      while (r1 + r2 === 0 && kind === 'quadIntercepts' && rng.chance(0.5)) [r1, r2] = distinctInts(rng, 2, -6, 6).sort((p, q) => p - q);
      const sgn = kind === 'quadPiecewise' && rng.chance(0.35) ? -1 : 1;
      const f: P = [sgn * r1 * r2, -sgn * (r1 + r2), sgn];
      const ft = ptex(f);
      if (kind === 'quadIntercepts') {
        return {
          prompt: `For $y = ${abs(ft)}$, find the $x$-intercepts and the $y$-intercept.`,
          parts: [part({ kind: 'numbers', values: [r1, r2] }, { label: '$x$-intercepts', placeholder: 'e.g. 3, -2' }), numPart(Math.abs(r1 * r2), { label: '$y$-intercept' })],
          hints: ['The $x$-intercepts of $y = |f(x)|$ are the same as those of $y = f(x)$: solve $f(x) = 0$.', 'For the $y$-intercept, substitute $x = 0$, then take the absolute value.'],
          solution: [`Solve $${ft} = 0$: $(x ${r1 < 0 ? '+' : '-'} ${Math.abs(r1)})(x ${r2 < 0 ? '+' : '-'} ${Math.abs(r2)}) = 0$, so $x = ${r1}$ or $x = ${r2}$.`, `$y$-intercept: $|0^2 + 0 ${r1 * r2 < 0 ? '-' : '+'} ${Math.abs(r1 * r2)}| = ${abs(`${r1 * r2}`)} = ${Math.abs(r1 * r2)}$.`, `The $x$-intercepts are $${r1}$ and $${r2}$; the $y$-intercept is $${Math.abs(r1 * r2)}$.`],
        };
      }
      const outside = `x \\le ${r1} \\text{ or } x \\ge ${r2}`;
      const between = `${r1} < x < ${r2}`;
      const outsideOpen = `x < ${r1} \\text{ or } x > ${r2}`;
      const betweenClosed = `${r1} \\le x \\le ${r2}`;
      const nf = `-(${ft})`;
      const correct = sgn > 0 ? cases(ft, outside, nf, between) : cases(ft, betweenClosed, nf, outsideOpen);
      const p = (r1 + r2) / 2;
      const [m1, m2] = [-r2, -r1];
      const distractors = sgn > 0
        ? [cases(nf, outside, ft, between), cases(ft, `x \\le ${m1} \\text{ or } x \\ge ${m2}`, nf, `${m1} < x < ${m2}`), cases(ft, `x \\ge ${niceNum(p)}`, nf, `x < ${niceNum(p)}`)]
        : [cases(nf, betweenClosed, ft, outsideOpen), cases(ft, outside, nf, between), cases(ft, `${m1} \\le x \\le ${m2}`, nf, `x < ${m1} \\text{ or } x > ${m2}`)];
      return {
        prompt: `Which is the piecewise form of $y = ${abs(ft)}$?`,
        parts: [part(mc(rng, `$${correct}$`, distractors.map((s) => `$${s}$`)))],
        hints: ['Find the $x$-intercepts of $y = f(x)$: they split the $x$-axis into intervals.', 'On each interval decide whether $f(x)$ is positive or negative. Where it is negative, $|f(x)| = -f(x)$.'],
        solution: [
          `$${ft} = ${sgn < 0 ? '-' : ''}(x ${r1 < 0 ? '+' : '-'} ${Math.abs(r1)})(x ${r2 < 0 ? '+' : '-'} ${Math.abs(r2)})$ has zeros $x = ${r1}$ and $x = ${r2}$.`,
          sgn > 0
            ? `The parabola opens up, so $f(x) \\ge 0$ when $${outside}$ and $f(x) < 0$ when $${between}$.`
            : `The parabola opens down, so $f(x) \\ge 0$ when $${betweenClosed}$ and $f(x) < 0$ when $${outsideOpen}$.`,
          `Where $f(x)$ is negative, $|f(x)| = -f(x)$: $${correct}$`,
        ],
      };
    }
    // Quadratics in vertex form: y = a(x − p)² + q.
    const a = rng.pick(kind === 'quadGraph' ? [1, -1, 0.5, -0.5] : [1, 2, -1, -2]);
    const p = kind === 'quadGraph' ? rng.nonZero(-3, 3) : rng.int(-3, 3);
    let q = rng.nonZero(-6, 6);
    if (kind === 'quadGraph') q = a > 0 ? -rng.int(1, 5) : rng.int(1, 5);
    const F: Fn = (x) => a * (x - p) ** 2 + q;
    const aTex = a === 1 ? '' : a === -1 ? '-' : a === 0.5 ? '\\tfrac{1}{2}' : a === -0.5 ? '-\\tfrac{1}{2}' : `${a}`;
    const vf = `${aTex}${p === 0 ? 'x^2' : `(x ${p < 0 ? '+' : '-'} ${Math.abs(p)})^2`} ${q < 0 ? '-' : '+'} ${Math.abs(q)}`;
    if (kind === 'quadRange') {
      const crosses = (a > 0 && q < 0) || (a < 0 && q > 0);
      const correctR = crosses ? RANGE.ge(0) : RANGE.ge(Math.abs(q));
      const pool = [RANGE.ge(0), RANGE.ge(Math.abs(q)), RANGE.between(Math.abs(q)), RANGE.all, a > 0 ? RANGE.ge(q) : RANGE.le(q), RANGE.le(Math.abs(q))].filter((s, i, arr) => s !== correctR && arr.indexOf(s) === i);
      return {
        prompt: `What is the range of $y = ${abs(vf)}$?`,
        parts: [part(mc(rng, `$${correctR}$`, rng.shuffle(pool).slice(0, 3).map((s) => `$${s}$`)))],
        hints: [`First describe $y = ${vf}$: its vertex is $(${p}, ${q})$ and it opens ${a > 0 ? 'up' : 'down'}.`, 'Taking the absolute value reflects every part below the $x$-axis upward. Does the graph of $f$ cross the $x$-axis?'],
        solution: [
          `$y = ${vf}$ has vertex $(${p}, ${q})$ and opens ${a > 0 ? 'up' : 'down'}, so its range is $${a > 0 ? RANGE.ge(q) : RANGE.le(q)}$.`,
          crosses
            ? `Because it ${a > 0 ? 'opens up from a vertex below' : 'opens down from a vertex above'} the $x$-axis, it crosses the $x$-axis. The absolute value reflects the negative part up, the graph touches $y = 0$ at the $x$-intercepts, and it rises without bound.`
            : `It never crosses the $x$-axis. ${q > 0 ? 'All of it is already above the axis, so nothing changes.' : `All of it is below the axis, so the whole graph is reflected: the vertex moves to $(${p}, ${Math.abs(q)})$ and the graph opens up.`}`,
          `Range of $y = ${abs(vf)}$: $${correctR}$`,
        ],
      };
    }
    // quadGraph: given the graph of y = f(x), pick y = |f(x)|.
    const disc = Math.sqrt(-q / a);
    const zeros = [p - disc, p + disc];
    const pOpts = [
      { md: '', figure: graph((x) => Math.abs(F(x)), { extra: zeros }), correct: true },
      { md: '', figure: graph((x) => -Math.abs(F(x)), { extra: zeros }) },
      { md: '', figure: graph((x) => Math.max(F(x), 0), { extra: zeros }) },
      // Confusing y = |f(x)| with y = f(|x|), when that graph is visible; otherwise |f(−x)| (reflected in the wrong axis).
      { md: '', figure: curve((x) => F(Math.abs(x)), GRID).flat().length >= 10 ? graph((x) => F(Math.abs(x)), { extra: [0] }) : graph((x) => Math.abs(F(-x)), { extra: zeros.map((z) => -z) }) },
    ];
    return {
      prompt: `The graph of $y = f(x)$ is shown. Which graph shows $y = |f(x)|$?`,
      figure: graph(F),
      parts: [part(mcFigures(rng, pOpts))],
      hints: ['Points on or above the $x$-axis stay where they are.', 'Points below the $x$-axis are reflected in the $x$-axis: $(x, y)$ becomes $(x, -y)$.'],
      solution: [
        `The parabola crosses the $x$-axis at two points; those $x$-intercepts are invariant (they do not move).`,
        `The part of the parabola ${a > 0 ? 'between' : 'outside'} the $x$-intercepts is below the axis, so it is reflected upward. Nothing ends up below the $x$-axis.`,
        `The correct graph is identical to $y = f(x)$ where $f(x) \\ge 0$ and is the mirror image of it where $f(x) < 0$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.3 — Absolute value equations
// ---------------------------------------------------------------------------

const absEquation = skill({
  id: 'm201-abs-equation',
  name: 'Absolute value equations',
  description: 'Solve absolute value equations with linear and quadratic expressions, rejecting extraneous solutions.',
  outcomes: ['RF2'],
  lessonId: 'm201-7-3',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.weighted([['simple', 5], ['negative', 1]] as const) : d === 2 ? rng.pick(['isolate', 'fraction', 'linearRhs', 'linearRhs'] as const) : rng.pick(['quadConst', 'quadConst', 'quadLinear'] as const);
    const hint1 = 'If $|A| = b$ with $b \\ge 0$, then $A = b$ or $A = -b$. Solve both cases.';
    if (kind === 'simple' || kind === 'negative' || kind === 'isolate' || kind === 'fraction') {
      // |ax + b| = c, possibly with |…| isolated first.
      let a = 1;
      let b = 0;
      let c = 0;
      if (kind === 'fraction') {
        a = rng.int(2, 5);
        b = rng.nonZero(-9, 9);
        c = rng.int(1, 12);
        while ((c - b) % a === 0 && (-c - b) % a === 0) c = rng.int(1, 12);
      } else {
        a = kind === 'simple' && rng.chance(0.5) ? 1 : rng.int(1, 4);
        const r1 = rng.int(-8, 8);
        const k = rng.int(1, 8);
        // Solutions r1 and r1 − 2k/a·… : choose c = a·k so both are integers.
        b = -a * r1 + a * k;
        c = a * k;
        b = rng.chance(0.5) ? b : -a * r1 - a * k;
      }
      if (kind === 'negative') c = -rng.int(1, 9);
      const inner = ptex([b, a]);
      let lhs = abs(inner);
      let rhs = `${c}`;
      const pre: string[] = [];
      if (kind === 'isolate') {
        const m = rng.int(1, 3);
        const k = rng.nonZero(-9, 9);
        const negCase = rng.chance(0.2);
        if (negCase) c = -rng.int(1, 6);
        lhs = `${m === 1 ? '' : m}${abs(inner)} ${k < 0 ? '-' : '+'} ${Math.abs(k)}`;
        rhs = `${m * c + k}`;
        pre.push(`Isolate the absolute value: $${m === 1 ? '' : m}${abs(inner)} = ${m * c + k} ${k < 0 ? '+' : '-'} ${Math.abs(k)} = ${m * c}$${m === 1 ? '' : `, so $${abs(inner)} = ${c}$`}.`);
      }
      let sols: number[];
      const steps = [...pre];
      if (c < 0) {
        sols = [];
        steps.push(`An absolute value is never negative, so $${abs(inner)} = ${c}$ has no solution.`);
      } else {
        sols = [(c - b) / a, (-c - b) / a].sort((p, q) => p - q);
        const solveFor = (rhsV: number) => (a === 1 ? `$x = ${rhsV - b}$` : `$${a}x = ${rhsV - b}$ and $x = ${niceNum((rhsV - b) / a)}$`);
        steps.push(`Case 1: $${inner} = ${c}$, so ${solveFor(c)}.`);
        steps.push(`Case 2: $${inner} = ${-c}$, so ${solveFor(-c)}.`);
        steps.push(`Both check, because the right side $${c}$ is not negative: ${xList(sols)}.`);
      }
      return {
        prompt: `Solve $${lhs} = ${rhs}$. Enter every solution, separated by commas, or type *none*.`,
        parts: [solPart(sols)],
        hints: [kind === 'isolate' ? 'Get the absolute value by itself on one side first.' : hint1, c < 0 ? 'Can an absolute value ever equal a negative number?' : 'Solve both cases and list both answers.'],
        solution: steps,
        answerDisplay: xList(sols),
      };
    }
    if (kind === 'linearRhs') {
      // |ax + b| = cx + e with (usually) one extraneous root.
      for (let t = 0; t < 2000; t++) {
        const a = rng.nonZero(-4, 4);
        const b = rng.nonZero(-9, 9);
        const c = rng.nonZero(-3, 3);
        const e = rng.nonZero(-9, 9);
        if (a === c || a === -c) continue;
        const x1 = (e - b) / (a - c);
        const x2 = (-e - b) / (a + c);
        const ok = (x: number) => c * x + e >= 0;
        const nice = (x: number) => Number.isInteger(x * 2) && Math.abs(x) <= 12;
        if (!nice(x1) || !nice(x2) || Math.abs(x1 - x2) < 1e-9) continue;
        const valid = [x1, x2].filter(ok);
        if (valid.length !== 1 && rng.chance(0.8)) continue;
        const inner = ptex([b, a]);
        const right = ptex([e, c]);
        const at = (expr: string, x: number) => expr.replace(/x/g, `(${niceNum(x)})`);
        const chk = (x: number) =>
          `$x = ${niceNum(x)}$: left side $${abs(at(inner, x))} = ${niceNum(Math.abs(a * x + b))}$, right side $${at(right, x)} = ${niceNum(c * x + e)}$ ${ok(x) ? '✓' : '✗ — an absolute value cannot equal a negative number, so this root is extraneous'}`;
        const sols = valid.sort((p, q) => p - q);
        return {
          prompt: `Solve $${abs(inner)} = ${right}$. Enter every solution, separated by commas, or type *none*.`,
          parts: [solPart(sols)],
          hints: ['Set up two cases: the expression inside the bars equals the right side, or it equals the opposite of the right side.', 'The right side contains $x$, so it could be negative. Check every answer in the original equation.'],
          solution: [
            `Case 1: $${inner} = ${right}$ gives $x = ${niceNum(x1)}$.`,
            `Case 2: $${inner} = -(${right})$ gives $x = ${niceNum(x2)}$.`,
            `Check ${chk(x1)}.`,
            `Check ${chk(x2)}.`,
            `Solution: ${xList(sols)}.`,
          ],
          answerDisplay: xList(sols),
        };
      }
    }
    if (kind === 'quadConst' || kind === 'linearRhs') {
      // |x² + bx + c| = d.
      for (let t = 0; t < 2000; t++) {
        const [r1, r2] = distinctInts(rng, 2, -7, 7).sort((p, q) => p - q);
        const dd = rng.int(1, 12);
        const b = -(r1 + r2);
        const c = r1 * r2 + dd;
        const case2 = niceRoots(1, b, c + dd);
        if (case2 === null) continue;
        if (case2.length && case2.some((x) => !Number.isInteger(x))) continue;
        if (!case2.length && rng.chance(0.4)) continue;
        const sols = [...new Set([r1, r2, ...case2])].sort((p, q) => p - q);
        const ft = ptex([c, b, 1]);
        return {
          prompt: `Solve $${abs(ft)} = ${dd}$. Enter every solution, separated by commas, or type *none*.`,
          parts: [solPart(sols)],
          hints: [hint1, 'Each case is a quadratic equation. Move everything to one side and factor (or use the discriminant to see whether it has real roots).'],
          solution: [
            `Case 1: $${ft} = ${dd}$, so $${ptex([c - dd, b, 1])} = 0$, which factors as $(x ${r1 < 0 ? '+' : '-'} ${Math.abs(r1)})(x ${r2 < 0 ? '+' : '-'} ${Math.abs(r2)}) = 0$: $x = ${r1}$ or $x = ${r2}$.`,
            case2.length
              ? `Case 2: $${ft} = ${-dd}$, so $${ptex([c + dd, b, 1])} = 0$: ${case2.length === 1 ? `a perfect square, $x = ${case2[0]}$` : `$x = ${case2[0]}$ or $x = ${case2[1]}$`}.`
              : `Case 2: $${ft} = ${-dd}$, so $${ptex([c + dd, b, 1])} = 0$. Its discriminant is $${b * b - 4 * (c + dd)} < 0$, so there are no real roots.`,
            `The right side $${dd}$ is positive, so every root found is a solution: ${xList(sols)}.`,
          ],
          answerDisplay: xList(sols),
        };
      }
    }
    // |x² + bx + c| = mx + n, with extraneous roots rejected.
    for (let t = 0; t < 4000; t++) {
      const [s1, s2] = distinctInts(rng, 2, -6, 6);
      const m = rng.nonZero(-4, 4);
      const n = rng.int(-8, 8);
      const b = m - (s1 + s2);
      const c = n + s1 * s2;
      const case2 = niceRoots(1, b + m, c + n);
      if (case2 === null || case2.some((x) => !Number.isInteger(x))) continue;
      const all = [...new Set([s1, s2, ...case2])].sort((p, q) => p - q);
      const ok = (x: number) => m * x + n >= 0;
      const sols = all.filter(ok);
      if (sols.length === all.length || (sols.length === 0 && rng.chance(0.8))) continue;
      const ft = ptex([c, b, 1]);
      const right = ptex([n, m]);
      const checks = all.map((x) => `$x = ${x}$: right side $${right.replace(/x/g, `(${x})`)} = ${m * x + n}$ ${ok(x) ? '✓' : '✗ extraneous'}`);
      return {
        prompt: `Solve $${abs(ft)} = ${right}$. Enter every solution, separated by commas, or type *none*.`,
        parts: [solPart(sols)],
        hints: ['Set up two cases: the expression inside the bars equals the right side, or it equals the opposite of the right side.', 'The right side contains $x$: an answer is extraneous if it makes the right side negative. Check every root.'],
        solution: [
          `Case 1: $${ft} = ${right}$ gives $${ptex([c - n, b - m, 1])} = 0$, so $x = ${Math.min(s1, s2)}$ or $x = ${Math.max(s1, s2)}$.`,
          case2.length
            ? `Case 2: $${ft} = -(${right})$ gives $${ptex([c + n, b + m, 1])} = 0$, so ${case2.map((x) => `$x = ${x}$`).join(' or ')}.`
            : `Case 2: $${ft} = -(${right})$ gives $${ptex([c + n, b + m, 1])} = 0$, which has no real roots.`,
          `Check each root in the original equation. ${checks.join('; ')}.`,
          `Solution: ${xList(sols)}.`,
        ],
        answerDisplay: xList(sols),
      };
    }
    throw new Error('absEquation');
  },
});

// ---------------------------------------------------------------------------
// 7.4 — Reciprocal functions
// ---------------------------------------------------------------------------

const reciprocalFeatures = skill({
  id: 'm201-reciprocal-features',
  name: 'Features of reciprocal functions',
  description: 'Find the vertical and horizontal asymptotes, invariant points and key points of y = 1/f(x) for linear and quadratic f(x).',
  outcomes: ['RF11'],
  lessonId: 'm201-7-4',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['linAsym', 'linAsym', 'linYint'] as const) : d === 2 ? rng.pick(['linInvariant', 'quadAsym', 'quadAsym'] as const) : rng.pick(['vertexPoint', 'quadInvariant'] as const);
    if (kind === 'linAsym' || kind === 'linYint' || kind === 'linInvariant') {
      const a = kind === 'linInvariant' ? rng.pick([1, -1, 2, -2]) : rng.pick([1, 1, 2, 3, -1, -2]);
      const r = rng.nonZero(-6, 6);
      const b = -a * r;
      const ft = ptex([b, a]);
      if (kind === 'linAsym') {
        return {
          prompt: `State the equations of the vertical and horizontal asymptotes of $y = \\dfrac{1}{${ft}}$.`,
          parts: [numPart(r, { label: 'Vertical asymptote: $x =$' }), numPart(0, { label: 'Horizontal asymptote: $y =$' })],
          hints: ['A vertical asymptote of $y = \\dfrac{1}{f(x)}$ occurs where $f(x) = 0$.', 'As $|f(x)|$ grows large, $\\dfrac{1}{f(x)}$ gets close to $0$.'],
          solution: [`$${ft} = 0$ when $x = ${r}$, where $\\dfrac{1}{f(x)}$ is undefined: the vertical asymptote is $x = ${r}$.`, 'As $x$ moves far from the asymptote, $|f(x)|$ becomes very large, so $\\dfrac{1}{f(x)}$ approaches $0$: the horizontal asymptote is $y = 0$.'],
        };
      }
      if (kind === 'linYint') {
        const f0 = b;
        return {
          prompt: `For $f(x) = ${ft}$, find the vertical asymptote and the $y$-intercept of $y = \\dfrac{1}{f(x)}$.`,
          parts: [numPart(r, { label: 'Vertical asymptote: $x =$' }), numPart(1 / f0, { label: '$y$-intercept' })],
          hints: ['The vertical asymptote is where $f(x) = 0$.', 'The $y$-intercept of $y = \\dfrac{1}{f(x)}$ is the reciprocal of the $y$-intercept of $f$.'],
          solution: [`$f(x) = 0$ when $x = ${r}$, so the vertical asymptote is $x = ${r}$.`, `$f(0) = ${f0}$, so $\\dfrac{1}{f(0)} = ${niceNum(1 / f0)}$. The $y$-intercept is $${niceNum(1 / f0)}$.`],
          answerDisplay: `$x = ${r}$; $y$-intercept $${niceNum(1 / f0)}$`,
        };
      }
      const x1 = (1 - b) / a;
      const xm1 = (-1 - b) / a;
      const pts = [
        [x1, 1],
        [xm1, -1],
      ].sort((p, q) => p[0] - q[0]);
      return {
        prompt: `Find the invariant points of $y = ${ft}$ and $y = \\dfrac{1}{${ft}}$. Enter the point with the smaller $x$-coordinate first.`,
        parts: pts.map(([x, y], i) => part({ kind: 'point', x, y }, { label: i === 0 ? 'First point' : 'Second point' })),
        hints: ['A point is invariant when $f(x) = \\dfrac{1}{f(x)}$, which happens when $f(x) = 1$ or $f(x) = -1$.', `Solve $${ft} = 1$ and $${ft} = -1$.`],
        solution: [
          `$${ft} = 1$ gives $x = ${niceNum(x1)}$, so $(${niceNum(x1)}, 1)$ is on both graphs.`,
          `$${ft} = -1$ gives $x = ${niceNum(xm1)}$, so $(${niceNum(xm1)}, -1)$ is on both graphs.`,
          `The invariant points are $(${niceNum(pts[0][0])}, ${pts[0][1]})$ and $(${niceNum(pts[1][0])}, ${pts[1][1]})$.`,
        ],
      };
    }
    if (kind === 'quadAsym') {
      const t = rng.int(0, 2);
      let ft: string;
      let vals: number[];
      let fac: string;
      if (t === 0) {
        const s = rng.int(1, 8);
        ft = ptex([-s * s, 0, 1]);
        vals = [-s, s];
        fac = `(x - ${s})(x + ${s})`;
      } else if (t === 1) {
        const [r1, r2] = distinctInts(rng, 2, -7, 7).sort((p, q) => p - q);
        ft = ptex([r1 * r2, -(r1 + r2), 1]);
        vals = [r1, r2];
        fac = `(x ${r1 < 0 ? '+' : '-'} ${Math.abs(r1)})(x ${r2 < 0 ? '+' : '-'} ${Math.abs(r2)})`;
      } else {
        const h = rng.chance(0.5) ? 0 : rng.nonZero(-4, 4);
        const k = rng.int(1, 9);
        ft = ptex([h * h + k, -2 * h, 1]);
        vals = [];
        fac = h === 0 ? `x^2 + ${k}` : `(x ${h < 0 ? '+' : '-'} ${Math.abs(h)})^2 + ${k}`;
      }
      return {
        prompt: `Find the vertical asymptotes of $y = \\dfrac{1}{${ft}}$. Enter the $x$-values separated by commas, or type *none*.`,
        parts: [part({ kind: 'numbers', values: vals }, { label: 'Vertical asymptotes: $x =$', placeholder: 'e.g. 3, -2 or none' })],
        hints: ['Vertical asymptotes of $y = \\dfrac{1}{f(x)}$ occur at the zeros of $f(x)$.', 'Factor $f(x)$ and set each factor equal to zero.'],
        solution: vals.length
          ? [`Solve $${ft} = 0$: $${fac} = 0$.`, `$x = ${vals[0]}$ or $x = ${vals[1]}$, so the vertical asymptotes are $x = ${vals[0]}$ and $x = ${vals[1]}$.`]
          : [`${fac === ft ? '' : `Complete the square: $${ft} = ${fac}$. `}A square is never negative, so $${fac} > 0$ for every $x$: $f(x) = 0$ has no real solutions.`, 'So $y = \\dfrac{1}{f(x)}$ has no vertical asymptotes.'],
        answerDisplay: vals.length ? `$x = ${vals[0]}$ and $x = ${vals[1]}$` : 'none',
      };
    }
    if (kind === 'vertexPoint') {
      const p = rng.int(-4, 4);
      const q = rng.pick([-1, -4, -9, 1, 2, 4, 5, -2, 2, 3]);
      const vf = `${p === 0 ? 'x^2' : `(x ${p < 0 ? '+' : '-'} ${Math.abs(p)})^2`} ${q < 0 ? '-' : '+'} ${Math.abs(q)}`;
      const root = q < 0 ? Math.sqrt(-q) : NaN;
      const vas = q < 0 ? [p - root, p + root] : [];
      const exact = q < 0 && Number.isInteger(root);
      const vaTex = q < 0 ? (exact ? `x = ${p - root}$ and $x = ${p + root}` : `x = ${p === 0 ? '' : p}\\pm\\sqrt{${-q}}`) : '';
      const parts: Part[] = [
        part({ kind: 'numbers', values: vas }, { label: 'Vertical asymptotes: $x =$', placeholder: 'e.g. 3, -2 or none' }),
        part({ kind: 'point', x: p, y: 1 / q }, { label: `Point on $y = \\dfrac{1}{f(x)}$ that matches the vertex` }),
      ];
      return {
        prompt: `Let $f(x) = ${vf}$. Find the vertical asymptotes of $y = \\dfrac{1}{f(x)}$ (type *none* if there are none) and the point on $y = \\dfrac{1}{f(x)}$ that corresponds to the vertex of $f$.${!exact && q < 0 ? ' Give exact values.' : ''}`,
        parts,
        hints: ['Vertical asymptotes are at the zeros of $f$. Solve $f(x) = 0$.', `The vertex of $f$ is $(${p}, ${q})$. On the reciprocal graph, the $y$-coordinate becomes its reciprocal.`],
        solution: [
          q < 0
            ? `$${vf} = 0$ gives $${p === 0 ? 'x' : `(x ${p < 0 ? '+' : '-'} ${Math.abs(p)})`}^2 = ${-q}$, so $x = ${p === 0 ? '' : `${p} `}\\pm ${exact ? root : `\\sqrt{${-q}}`}$: the vertical asymptotes are $${vaTex}$.`
            : `$${vf} \\ge ${q} > 0$ for every $x$, so $f$ has no zeros and $y = \\dfrac{1}{f(x)}$ has no vertical asymptotes.`,
          `The vertex of $f$ is $(${p}, ${q})$, so $(${p}, ${niceNum(1 / q)})$ is on the reciprocal graph.`,
          q > 0 ? `Because $f$ has a minimum there, $y = \\dfrac{1}{f(x)}$ has a maximum at $(${p}, ${niceNum(1 / q)})$.` : `Between the asymptotes $f$ is negative with a minimum at the vertex, so $y = \\dfrac{1}{f(x)}$ has a local maximum at $(${p}, ${niceNum(1 / q)})$.`,
        ],
        answerDisplay: `${q < 0 ? `$${vaTex}$` : 'no vertical asymptotes'}; $(${p}, ${niceNum(1 / q)})$`,
      };
    }
    // quadInvariant: f(x) = x² − k, invariant points where f(x) = ±1.
    const k = rng.pick([2, 3, 5, 6, 7, 8, 10, 11, 17, 26]);
    const plus = k + 1;
    const minus = k - 1;
    const sq = (n: number) => (isPerfectSquare(n) ? `${Math.sqrt(n)}` : `\\sqrt{${n}}`);
    const vals = [-Math.sqrt(plus), -Math.sqrt(minus), Math.sqrt(minus), Math.sqrt(plus)];
    return {
      prompt: `Find the $x$-coordinates of all the invariant points of $y = x^2 - ${k}$ and $y = \\dfrac{1}{x^2 - ${k}}$. Give exact values (for example, sqrt(3) and -sqrt(3)).`,
      parts: [part({ kind: 'numbers', values: vals }, { label: '$x =$', placeholder: 'e.g. sqrt(3), -sqrt(3)' })],
      hints: ['Invariant points satisfy $f(x) = 1$ or $f(x) = -1$.', `Solve $x^2 - ${k} = 1$ and $x^2 - ${k} = -1$.`],
      solution: [
        `$x^2 - ${k} = 1$ gives $x^2 = ${plus}$, so $x = \\pm ${sq(plus)}$ (points with $y = 1$).`,
        `$x^2 - ${k} = -1$ gives $x^2 = ${minus}$, so $x = \\pm ${sq(minus)}$ (points with $y = -1$).`,
        `There are four invariant points, at $x = \\pm ${sq(plus)}$ and $x = \\pm ${sq(minus)}$.`,
      ],
      answerDisplay: `$x = \\pm ${sq(plus)},\\ \\pm ${sq(minus)}$`,
    };
  },
});

const reciprocalGraph = skill({
  id: 'm201-reciprocal-graph',
  name: 'Graphs of reciprocal functions',
  description: 'Match the graph of y = f(x) with the graph of y = 1/f(x) using zeros, asymptotes, invariant points and sign.',
  outcomes: ['RF11'],
  lessonId: 'm201-7-4',
  format: 'mc',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? 'linear' : d === 2 ? rng.pick(['linear', 'twoZeros', 'twoZeros'] as const) : rng.pick(['noZeros', 'doubleZero', 'twoZerosDown', 'reverse'] as const);
    if (kind === 'linear') {
      const a = d === 1 ? rng.pick([1, -1, 2, -2]) : rng.pick([2, -2, 0.5, -0.5, 1, -1, 3, -3]);
      let r = rng.nonZero(-4, 4);
      if (Math.abs(a) === 0.5 && Math.abs(r) > 2) r = Math.sign(r) * 2;
      const F: Fn = (x) => a * (x - r);
      const fig = (fn: Fn, va: number) => graph(fn, { breaks: [va], ghost: F });
      const opts = [
        { md: '', figure: fig((x) => 1 / F(x), r), correct: true },
        { md: '', figure: fig((x) => -1 / F(x), r) },
        { md: '', figure: fig((x) => 1 / (a * (x + r)), -r) },
        { md: '', figure: fig((x) => 1 / F(x) + 1, r) },
      ];
      const ft = ptex([-a * r, a]).replace('0.5x', '\\tfrac{1}{2}x');
      return {
        prompt: `The graph of $f(x) = ${ft}$ is shown. Which graph shows $y = \\dfrac{1}{f(x)}$? (Each choice also shows $y = f(x)$ in grey.)`,
        figure: graph(F),
        parts: [part(mcFigures(rng, opts))],
        hints: ['The zero of $f$ becomes a vertical asymptote of $y = \\dfrac{1}{f(x)}$, and the $x$-axis is a horizontal asymptote.', 'Where $f(x)$ is positive, so is $\\dfrac{1}{f(x)}$; where $f(x) = \\pm 1$ the graphs meet (invariant points).'],
        solution: [
          `$f(x) = 0$ at $x = ${r}$, so $y = \\dfrac{1}{f(x)}$ has the vertical asymptote $x = ${r}$; its horizontal asymptote is $y = 0$.`,
          `$f(x) > 0$ for $x ${a > 0 ? '>' : '<'} ${r}$, so the reciprocal is above the $x$-axis there and below it on the other side.`,
          `The graphs meet where $f(x) = 1$ or $f(x) = -1$ (invariant points). The correct graph has these features.`,
        ],
      };
    }
    // Quadratic f(x) = s(x − p)² + q.
    let s = 1;
    let p = 0;
    let q = -4;
    if (kind === 'twoZeros') {
      let [r1, r2] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 2).sort((m, n) => m - n);
      while (r2 - r1 < 2) [r1, r2] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 2).sort((m, n) => m - n);
      p = (r1 + r2) / 2;
      q = -(((r2 - r1) / 2) ** 2);
      s = 1;
      if (q < -6) {
        s = 0.5;
        q = q * 0.5;
      }
    } else if (kind === 'twoZerosDown') {
      s = -1;
      p = rng.int(-2, 2);
      q = rng.pick([1, 4]);
    } else if (kind === 'doubleZero') {
      s = rng.pick([1, -1, 0.5]);
      p = rng.int(-3, 3);
      q = 0;
    } else if (kind === 'noZeros') {
      s = rng.pick([1, 0.5, -1]);
      p = rng.int(-3, 3);
      q = s > 0 ? rng.pick([0.5, 1, 2, 3]) : -rng.pick([0.5, 1, 2, 3]);
    } else {
      // reverse: zeros chosen as integers.
      const [r1, r2] = rng.sample([-4, -3, -2, -1, 1, 2, 3, 4], 2).sort((m, n) => m - n);
      p = (r1 + r2) / 2;
      q = -(((r2 - r1) / 2) ** 2);
      s = 1;
      if (q < -6) {
        s = 0.5;
        q *= 0.5;
      }
    }
    const F: Fn = (x) => s * (x - p) ** 2 + q;
    const zeros = q === 0 ? [p] : -q / s > 0 ? [p - Math.sqrt(-q / s), p + Math.sqrt(-q / s)] : [];
    const recip = (fn: Fn, br: number[]) => graph((x) => 1 / fn(x), { breaks: br, ghost: F, extra: [p] });
    if (kind === 'reverse') {
      const r1 = p - Math.sqrt(-q / s);
      const r2 = p + Math.sqrt(-q / s);
      const fac = (z: number) => (z === 0 ? 'x' : `(x ${z < 0 ? '+' : '-'} ${Math.abs(z)})`);
      const fTex = (k: number, z1: number, z2: number) => `${k === 1 ? '' : k === -1 ? '-' : k === 0.5 ? '\\tfrac{1}{2}' : '-\\tfrac{1}{2}'}${fac(z1)}${fac(z2)}`;
      const correct = `$f(x) = ${fTex(s, r1, r2)}$`;
      // Sign errors in the zeros, the wrong direction of opening, or zeros read one unit off.
      const distractors = [
        `$f(x) = ${fTex(s, -r2, -r1)}$`,
        `$f(x) = ${fTex(-s, r1, r2)}$`,
        `$f(x) = ${fTex(-s, -r2, -r1)}$`,
        `$f(x) = ${fTex(s, r1 + 1, r2 + 1)}$`,
        `$f(x) = ${fTex(-s, r1 - 1, r2 - 1)}$`,
      ];
      return {
        prompt: 'The graph of $y = \\dfrac{1}{f(x)}$ is shown, with its asymptotes dashed. Which function is $f(x)$?',
        figure: graph((x) => 1 / F(x), { breaks: [r1, r2], extra: [p] }),
        parts: [part(mc(rng, correct, distractors))],
        hints: ['The vertical asymptotes of $y = \\dfrac{1}{f(x)}$ are at the zeros of $f$.', 'Between the asymptotes, the reciprocal graph has the same sign as $f$.'],
        solution: [
          `The vertical asymptotes are $x = ${r1}$ and $x = ${r2}$, so $f$ has zeros $${r1}$ and $${r2}$.`,
          `Between the asymptotes the reciprocal graph is below the $x$-axis, so $f(x) < 0$ there: the parabola opens up.`,
          `So $f(x) = ${fTex(s, r1, r2)}$.`,
        ],
      };
    }
    const opts: Array<{ md: string; figure: PlaneFigure; correct?: boolean }> = [{ md: '', figure: recip(F, zeros), correct: true }];
    // Every sign flipped: the reciprocal of −f(x).
    opts.push({ md: '', figure: recip((x) => -F(x), zeros) });
    if (zeros.length === 2) {
      // The middle branch on the wrong side of the x-axis: 1/|f(x)|.
      opts.push({ md: '', figure: recip((x) => Math.abs(F(x)), zeros) });
      // Asymptotes in the wrong places: the zeros reflected in the y-axis (or shifted when they are symmetric).
      const moved = p !== 0 ? zeros.map((z) => -z) : zeros.map((z) => z + 1);
      const G: Fn = p !== 0 ? (x) => F(-x) : (x) => F(x - 1);
      opts.push({ md: '', figure: graph((x) => 1 / G(x), { breaks: moved, ghost: F, extra: [p !== 0 ? -p : p + 1] }) });
    } else if (zeros.length === 1) {
      // Branches on opposite sides, as for a linear function, and the horizontal asymptote in the wrong place.
      opts.push({ md: '', figure: graph((x) => 1 / (s * (x - p)), { breaks: zeros, ghost: F }) });
      opts.push({ md: '', figure: graph((x) => 1 / F(x) + (s > 0 ? -1 : 1), { breaks: zeros, ghost: F }) });
    } else {
      // Invented asymptotes (the reciprocal of f shifted to cross the axis) and a wrong horizontal asymptote.
      const G: Fn = (x) => F(x) - 2 * q;
      const gz = [p - Math.sqrt((2 * q - q) / s), p + Math.sqrt((2 * q - q) / s)];
      opts.push({ md: '', figure: graph((x) => 1 / G(x), { breaks: gz, ghost: F, extra: [p] }) });
      opts.push({ md: '', figure: graph((x) => 1 / F(x) + (s > 0 ? 1 : -1), { ghost: F, extra: [p] }) });
    }
    const shape =
      zeros.length === 2
        ? `two vertical asymptotes, at $x = ${niceNum(zeros[0])}$ and $x = ${niceNum(zeros[1])}$. Between them $f(x) ${s > 0 ? '<' : '>'} 0$, so the middle branch is ${s > 0 ? 'below' : 'above'} the $x$-axis with a turning point at $(${niceNum(p)}, ${niceNum(1 / q)})$.`
        : zeros.length === 1
          ? `one vertical asymptote, at $x = ${p}$. $f(x)$ is ${s > 0 ? 'positive' : 'negative'} on both sides, so both branches are ${s > 0 ? 'above' : 'below'} the $x$-axis.`
          : `no vertical asymptotes, because $f$ has no zeros. The reciprocal is a single smooth curve with a ${s > 0 ? 'maximum' : 'minimum'} at $(${p}, ${niceNum(1 / q)})$, where $f$ has its ${s > 0 ? 'minimum' : 'maximum'}.`;
    return {
      prompt: 'The graph of $y = f(x)$ is shown. Which graph shows $y = \\dfrac{1}{f(x)}$? (Each choice also shows $y = f(x)$ in grey.)',
      figure: graph(F),
      parts: [part(mcFigures(rng, opts))],
      hints: ['Zeros of $f$ become vertical asymptotes of the reciprocal, and $y = 0$ is a horizontal asymptote.', 'The reciprocal has the same sign as $f$, meets it where $f(x) = \\pm 1$, and is large where $f$ is close to $0$.'],
      solution: [`$y = \\dfrac{1}{f(x)}$ has ${shape}`, 'Where $|f(x)|$ is large, the reciprocal is close to the $x$-axis; where $f(x) = 1$ or $-1$ the two graphs meet (invariant points).', 'Only one choice has all of these features.'],
    };
  },
});

export const ABS_RECIPROCAL_SKILLS: SkillDef[] = [absEvaluate, absFunction, absEquation, reciprocalFeatures, reciprocalGraph];
