/** Math 31 Unit 6 — Applications of Derivatives (DA1, DA4). */
import { fixedChoice, mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fracLatex, toFrac } from '../../../math/numbers.ts';
import { normalizeLine } from '../../../math/linear.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Figure, GridSpec, Line, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** A number in LaTeX: integers plainly, other rationals as fractions. */
function tn(x: number, dfrac = false): string {
  if (Math.abs(x - Math.round(x)) < 1e-9) return fmt(Math.round(x));
  const f = toFrac(x, 400);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}
const par = (x: number) => (x < 0 ? `(${tn(x)})` : tn(x));
/** A polynomial from [coefficient, body] pairs, skipping zero terms. */
function poly(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (Math.abs(c) < 1e-12) continue;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : tn(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}
const cubicTex = (A: number, B: number, C: number, D: number, v = 'x') => poly([[A, `${v}^3`], [B, `${v}^2`], [C, v], [D, '']]);
const quadTex = (a: number, b: number, c: number, v = 'x') => poly([[a, `${v}^2`], [b, v], [c, '']]);
const linTex = (m: number, b: number, v = 'x') => poly([[m, v], [b, '']]);
const pm = (n: number) => (n < 0 ? `- ${tn(-n)}` : `+ ${tn(n)}`);
const cf = (n: number) => (n === 1 ? '' : n === -1 ? '-' : tn(n));
/** x - p, written x + 3 when p = -3 and x when p = 0. */
const xm = (p: number, v = 'x') => (p === 0 ? v : `${v} ${p < 0 ? '+' : '-'} ${tn(Math.abs(p))}`);
/** A factor (x - p), or x alone when p = 0. */
const fac = (p: number, v = 'x') => (p === 0 ? v : `(${xm(p, v)})`);
/** Substitute a value into a polynomial given as [coefficient, power] pairs: 2(3)^2 - 4(3) + 1. */
function subst(terms: Array<[number, number]>, a: number): string {
  let out = '';
  for (const [c, k] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const body = k === 0 ? '' : k === 1 ? `(${tn(a)})` : `(${tn(a)})^{${k}}`;
    const coef = body && abs === 1 ? '' : tn(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}
/** True when v is not close to a rounding boundary at `dp` decimals. */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.05;
}
const dec = (x: number, dp = 4) => fmt(x, dp);

const INF = '\\infty';
/** An open interval; null means an infinite end. */
function iv(a: number | null, b: number | null, closedLeft = false): string {
  return `${closedLeft ? '[' : '('}${a === null ? `-${INF}` : tn(a)}, ${b === null ? INF : tn(b)})`;
}
const cup = (...s: string[]) => s.join(' \\cup ');

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];

// ---------------------------------------------------------------------------
// Graph helpers
// ---------------------------------------------------------------------------

type Pt = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000 + 0;

/** Sample y = f(x) across the grid and clip it to the grid: one polyline per visible piece. */
function curvePieces(f: (x: number) => number, grid: GridSpec, extraXs: number[] = []): Pt[][] {
  const n = 160;
  const raw = Array.from({ length: n + 1 }, (_, i) => grid.xMin + ((grid.xMax - grid.xMin) * i) / n);
  for (const x of extraXs) if (x > grid.xMin && x < grid.xMax) raw.push(x);
  raw.sort((a, b) => a - b);
  const xs = raw.filter((x, i) => i === 0 || x - raw[i - 1] > 1e-9);
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
  return pieces.filter((p) => p.length > 1);
}

type Curve = { f: (x: number) => number; color?: 'brand' | 'accent' | 'muted'; extra?: number[] };
function curveFig(grid: GridSpec, curves: Curve[], extra: Partial<Omit<PlaneFigure, 'type' | 'grid'>> = {}): PlaneFigure {
  return {
    type: 'plane',
    grid,
    polylines: curves.flatMap((c) => curvePieces(c.f, grid, c.extra ?? []).map((points) => ({ points, color: c.color ?? 'brand' }))),
    ...extra,
  };
}
const G55: GridSpec = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
const G56: GridSpec = { xMin: -5, xMax: 5, yMin: -6, yMax: 6 };

// ---------------------------------------------------------------------------
// Lines
// ---------------------------------------------------------------------------

const lineOf = (m: number, b: number): Line => normalizeLine({ A: m, B: -1, C: b });
const lineAns = (m: number, b: number): AnswerSpec => ({ kind: 'line', line: lineOf(m, b), form: 'any' });
const linePart = (m: number, b: number, label?: string): Part => part(lineAns(m, b), { placeholder: 'y = mx + b', label });
const yEq = (m: number, b: number) => `y = ${linTex(m, b)}`;
/** y - y1 = m(x - x1) in LaTeX. */
function pointSlope(m: number, a: number, fa: number): string {
  if (m === 0) return `y = ${tn(fa)}`;
  const yPart = fa === 0 ? 'y' : `y ${fa < 0 ? '+' : '-'} ${tn(Math.abs(fa))}`;
  const xs = a === 0 ? 'x' : m === 1 ? xm(a) : `(${xm(a)})`;
  const mPart = m === 1 ? '' : m === -1 ? '-' : tn(m);
  return `${yPart} = ${mPart}${xs}`;
}

// ---------------------------------------------------------------------------
// Cubics with integer critical numbers: f'(x) = 3A(x - p)(x - q)
// ---------------------------------------------------------------------------

interface Cubic {
  A: number;
  B: number;
  C: number;
  D: number;
  p: number;
  q: number;
}
function cubicCrit(rng: Rng, opts: { lo?: number; hi?: number; As?: number[]; gapMax?: number; D?: [number, number] } = {}): Cubic {
  const { lo = -3, hi = 4, As = [1, -1, 2, -2], gapMax = 5, D = [-6, 6] } = opts;
  return retry(
    () => {
      const A = rng.pick(As);
      const p = rng.int(lo, hi - 1);
      const q = rng.int(p + 1, Math.min(hi, p + gapMax));
      return { A, p, q, B: (-3 * A * (p + q)) / 2 + 0, C: 3 * A * p * q + 0, D: rng.int(D[0], D[1]) };
    },
    (c) => Number.isInteger(c.B),
    200,
  );
}
const cubicFn = (c: Cubic) => (x: number) => c.A * x ** 3 + c.B * x ** 2 + c.C * x + c.D;
const cubicDFn = (c: Cubic) => (x: number) => 3 * c.A * x * x + 2 * c.B * x + c.C;
const cubicTexOf = (c: Cubic, v = 'x') => cubicTex(c.A, c.B, c.C, c.D, v);
const cubicDTex = (c: Cubic, v = 'x') => quadTex(3 * c.A, 2 * c.B, c.C, v);
/** k(x - p)(x - q) in LaTeX, with a bare x factor first: 6x(x - 4). */
const factored2 = (k: number, p: number, q: number, v = 'x') => (q === 0 ? `${cf(k)}${fac(q, v)}${fac(p, v)}` : `${cf(k)}${fac(p, v)}${fac(q, v)}`);
const cubicDFactored = (c: Cubic, v = 'x') => factored2(3 * c.A, c.p, c.q, v);
const cubicSub = (c: Cubic, a: number) => subst([[c.A, 3], [c.B, 2], [c.C, 1], [c.D, 0]], a);

/** Test points between and beyond sorted critical numbers (integers where possible). */
function testPoints(crits: number[]): number[] {
  const pts = [crits[0] - 1];
  for (let i = 0; i + 1 < crits.length; i++) {
    const a = crits[i];
    const b = crits[i + 1];
    pts.push(b - a >= 2 ? a + 1 : (a + b) / 2);
  }
  pts.push(crits[crits.length - 1] + 1);
  return pts;
}
function intervalsOf(crits: number[]): Array<[number | null, number | null]> {
  const out: Array<[number | null, number | null]> = [[null, crits[0]]];
  for (let i = 0; i + 1 < crits.length; i++) out.push([crits[i], crits[i + 1]]);
  out.push([crits[crits.length - 1], null]);
  return out;
}
/** Sign-chart steps for a derivative with the given zeros. */
function signSteps(g: (x: number) => number, crits: number[], gName: string, pos: string, neg: string): { steps: string[]; signs: number[] } {
  const pts = testPoints(crits);
  const ivs = intervalsOf(crits);
  const signs = pts.map((t) => Math.sign(g(t)));
  const steps = ivs.map(([a, b], i) => {
    const t = pts[i];
    const v = g(t);
    return `On $${iv(a, b)}$: $${gName}(${tn(t)}) = ${tn(v)} ${v > 0 ? '> 0' : '< 0'}$, so $f$ is ${v > 0 ? pos : neg}.`;
  });
  return { steps, signs };
}

// ---------------------------------------------------------------------------
// 6.1 — Tangent lines, normal lines and linear approximation
// ---------------------------------------------------------------------------

interface TanCase {
  fTex: string;
  a: number;
  fa: number;
  m: number;
  /** Steps that find f(a) and f'(a). */
  work: string[];
}

function quadCase(rng: Rng): TanCase {
  const p = rng.nonZero(-3, 3);
  const q = rng.int(-6, 6);
  const r = rng.int(-6, 6);
  const a = rng.int(-3, 3);
  const fa = p * a * a + q * a + r;
  const m = 2 * p * a + q;
  return {
    fTex: quadTex(p, q, r),
    a,
    fa,
    m,
    work: [
      `Point: $f(${a}) = ${subst([[p, 2], [q, 1], [r, 0]], a)} = ${fa}$, so the point of tangency is $(${a}, ${fa})$.`,
      `Slope: $f'(x) = ${linTex(2 * p, q)}$, so $m = f'(${a}) = ${subst([[2 * p, 1], [q, 0]], a)} = ${m}$.`,
    ],
  };
}

function cubicCase(rng: Rng): TanCase {
  const A = rng.pick([1, -1, 2]);
  const B = rng.int(-3, 3);
  const C = rng.int(-6, 6);
  const D = rng.int(-5, 5);
  const a = rng.int(-2, 2);
  const fa = A * a ** 3 + B * a * a + C * a + D;
  const m = 3 * A * a * a + 2 * B * a + C;
  return {
    fTex: cubicTex(A, B, C, D),
    a,
    fa,
    m,
    work: [
      `Point: $f(${a}) = ${subst([[A, 3], [B, 2], [C, 1], [D, 0]], a)} = ${fa}$, so the point of tangency is $(${a}, ${fa})$.`,
      `Slope: $f'(x) = ${quadTex(3 * A, 2 * B, C)}$, so $m = f'(${a}) = ${subst([[3 * A, 2], [2 * B, 1], [C, 0]], a)} = ${m}$.`,
    ],
  };
}

function rootCase(rng: Rng): TanCase {
  const k = rng.pick([1, 2, 3, 4, 6]);
  const c = rng.int(-4, 4);
  const a = rng.pick([1, 4, 9, 16]);
  const s = Math.sqrt(a);
  const fa = k * s + c;
  const m = k / (2 * s);
  const fTex = `${cf(k)}\\sqrt{x}${c ? ` ${pm(c)}` : ''}`;
  return {
    fTex,
    a,
    fa,
    m,
    work: [
      `Point: $f(${a}) = ${cf(k)}\\sqrt{${a}}${c ? ` ${pm(c)}` : ''} = ${tn(fa)}$, so the point of tangency is $(${a}, ${tn(fa)})$.`,
      `Slope: $f(x) = ${cf(k)}x^{1/2}${c ? ` ${pm(c)}` : ''}$, so $f'(x) = \\dfrac{${k}}{2}x^{-1/2} = \\dfrac{${k}}{2\\sqrt{x}}$ and $m = f'(${a}) = \\dfrac{${k}}{2\\sqrt{${a}}} = ${tn(m)}$.`,
    ],
  };
}

function recipCase(rng: Rng): TanCase {
  const k = rng.pick([2, 3, 4, 6, 8, 12]) * rng.sign();
  const a = rng.pick([1, 2, 3]) * rng.sign();
  const fa = k / a;
  const m = -k / (a * a);
  const sg = k > 0 ? '-' : '';
  return {
    fTex: `${k < 0 ? '-' : ''}\\dfrac{${Math.abs(k)}}{x}`,
    a,
    fa,
    m,
    work: [
      `Point: $f(${a}) = \\dfrac{${k}}{${a}} = ${tn(fa)}$, so the point of tangency is $(${a}, ${tn(fa)})$.`,
      `Slope: $f(x) = ${k}x^{-1}$, so $f'(x) = ${-k}x^{-2} = ${sg}\\dfrac{${Math.abs(k)}}{x^2}$ and $m = f'(${a}) = ${sg}\\dfrac{${Math.abs(k)}}{${par(a)}^2} = ${tn(m)}$.`,
    ],
  };
}

function quotCase(rng: Rng): TanCase {
  const s = rng.int(-3, 3);
  const d = rng.pick([1, -1, 2, -2]);
  const a = d - s;
  const r = rng.intExcept(-4, 4, [s]);
  const fa = (a + r) / d;
  const m = (s - r) / (d * d);
  const num = xm(-r);
  const den = xm(-s);
  const denSq = s === 0 ? 'x^2' : `(${den})^2`;
  return {
    fTex: `\\dfrac{${num}}{${den}}`,
    a,
    fa,
    m,
    work: [
      `Point: $f(${a}) = \\dfrac{${a + r}}{${a + s}} = ${tn(fa)}$, so the point of tangency is $(${a}, ${tn(fa)})$.`,
      `Slope, by the quotient rule: $f'(x) = \\dfrac{(1)(${den}) - (${num})(1)}{${denSq}} = \\dfrac{${s - r}}{${denSq}}$, so $m = f'(${a}) = \\dfrac{${s - r}}{${par(a + s)}^2} = ${tn(m)}$.`,
    ],
  };
}

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [4, 3, 5],
  [5, 12, 13],
  [12, 5, 13],
  [6, 8, 10],
  [8, 6, 10],
  [8, 15, 17],
  [15, 8, 17],
];

/** Chain-rule, exponential, logarithmic and trigonometric functions at a convenient point. */
function transCase(rng: Rng): TanCase {
  const kind = rng.pick(['exp', 'xexp', 'ln', 'xln', 'sqrtSum', 'sqrtDiff', 'power', 'trig'] as const);
  if (kind === 'exp') {
    const k = rng.pick([2, 3, -1, -2, 4]);
    const c = rng.pick([0, 0, 1, 2, -1]);
    const ex = linTex(k, -k * c);
    return {
      fTex: `e^{${ex}}`,
      a: c,
      fa: 1,
      m: k,
      work: [
        `Point: $f(${c}) = e^{${k * c - k * c}} = e^0 = 1$, so the point of tangency is $(${c}, 1)$.`,
        `Slope, by the chain rule: $f'(x) = ${k}e^{${ex}}$, so $m = f'(${c}) = ${k}e^0 = ${k}$.`,
      ],
    };
  }
  if (kind === 'xexp') {
    const c = rng.pick([-3, -2, 2, 3, 4, 5]);
    return {
      fTex: `(${xm(-c)})e^{x}`,
      a: 0,
      fa: c,
      m: c + 1,
      work: [
        `Point: $f(0) = (0 ${pm(c)})e^0 = ${c}$, so the point of tangency is $(0, ${c})$.`,
        `Slope, by the product rule: $f'(x) = (1)e^x + (${xm(-c)})e^x = (${xm(-c - 1)})e^x$, so $m = f'(0) = ${c + 1}$.`,
      ],
    };
  }
  if (kind === 'ln') {
    const b = rng.pick([2, 3, 4, 5]);
    const inner = linTex(b, -(b - 1));
    return {
      fTex: `\\ln(${inner})`,
      a: 1,
      fa: 0,
      m: b,
      work: [
        `Point: $f(1) = \\ln(${b} - ${b - 1}) = \\ln 1 = 0$, so the point of tangency is $(1, 0)$.`,
        `Slope, by the chain rule: $f'(x) = \\dfrac{${b}}{${inner}}$, so $m = f'(1) = \\dfrac{${b}}{1} = ${b}$.`,
      ],
    };
  }
  if (kind === 'xln') {
    const c = rng.pick([0, -2, -3, 1, 2, 3]);
    const lead = c === 0 ? 'x' : `(${xm(-c)})`;
    return {
      fTex: `${lead}\\ln x`,
      a: 1,
      fa: 0,
      m: 1 + c,
      work: [
        `Point: $f(1) = ${c === 0 ? '1' : `(1 ${pm(c)})`}\\ln 1 = 0$, so the point of tangency is $(1, 0)$.`,
        `Slope, by the product rule: $f'(x) = (1)\\ln x + ${lead}\\cdot\\dfrac{1}{x}$, so $m = f'(1) = 0 + \\dfrac{${1 + c}}{1} = ${1 + c}$.`,
      ],
    };
  }
  if (kind === 'sqrtSum') {
    const [x0, k, h] = rng.pick(TRIPLES);
    const a = x0 * rng.sign();
    return {
      fTex: `\\sqrt{x^2 + ${k * k}}`,
      a,
      fa: h,
      m: a / h,
      work: [
        `Point: $f(${a}) = \\sqrt{${a * a} + ${k * k}} = \\sqrt{${h * h}} = ${h}$, so the point of tangency is $(${a}, ${h})$.`,
        `Slope, by the chain rule: $f'(x) = \\dfrac{1}{2\\sqrt{x^2 + ${k * k}}}\\cdot 2x = \\dfrac{x}{\\sqrt{x^2 + ${k * k}}}$, so $m = f'(${a}) = ${tn(a / h)}$.`,
      ],
    };
  }
  if (kind === 'sqrtDiff') {
    const [x0, y0, r] = rng.pick(TRIPLES);
    const a = x0 * rng.sign();
    return {
      fTex: `\\sqrt{${r * r} - x^2}`,
      a,
      fa: y0,
      m: -a / y0,
      work: [
        `Point: $f(${a}) = \\sqrt{${r * r} - ${a * a}} = \\sqrt{${y0 * y0}} = ${y0}$, so the point of tangency is $(${a}, ${y0})$.`,
        `Slope, by the chain rule: $f'(x) = \\dfrac{1}{2\\sqrt{${r * r} - x^2}}\\cdot(-2x) = -\\dfrac{x}{\\sqrt{${r * r} - x^2}}$, so $m = f'(${a}) = ${tn(-a / y0)}$.`,
      ],
    };
  }
  if (kind === 'power') {
    const n = rng.pick([3, 4, 5]);
    const b = rng.pick([2, 3]);
    const x0 = rng.pick([1, 2]);
    const val = rng.pick([1, -1]);
    const c = b * x0 - val;
    const fa = val ** n;
    const m = n * b * val ** (n - 1);
    const inner = linTex(b, -c);
    return {
      fTex: `(${inner})^{${n}}`,
      a: x0,
      fa,
      m,
      work: [
        `Point: $f(${x0}) = (${b * x0} - ${c})^{${n}} = (${val})^{${n}} = ${fa}$, so the point of tangency is $(${x0}, ${fa})$.`,
        `Slope, by the chain rule: $f'(x) = ${n}(${inner})^{${n - 1}}\\cdot ${b} = ${n * b}(${inner})^{${n - 1}}$, so $m = f'(${x0}) = ${n * b}(${val})^{${n - 1}} = ${m}$.`,
      ],
    };
  }
  const A = rng.nonZero(-4, 4);
  const B = rng.nonZero(-4, 4);
  return {
    fTex: poly([[A, '\\sin x'], [B, '\\cos x']]),
    a: 0,
    fa: B,
    m: A,
    work: [
      `Point: $f(0) = ${A}\\sin 0 ${pm(B)}\\cos 0 = ${B}$, so the point of tangency is $(0, ${B})$.`,
      `Slope: $f'(x) = ${poly([[A, '\\cos x'], [-B, '\\sin x']])}$, so $m = f'(0) = ${A}\\cos 0 ${pm(-B)}\\sin 0 = ${A}$.`,
    ],
  };
}

const TAN_HINTS = [
  'The tangent line passes through the point $(a, f(a))$ and has slope $f\'(a)$.',
  'Find $f(a)$ and $f\'(a)$, then use point-slope form $y - f(a) = f\'(a)(x - a)$ and simplify.',
];

function tangentItem(c: TanCase, calc = false): GenOutput {
  const b = c.fa - c.m * c.a;
  return {
    prompt: `Find an equation of the tangent line to the graph of $f(x) = ${c.fTex}$ at $x = ${c.a}$.`,
    parts: [linePart(c.m, b)],
    hints: TAN_HINTS,
    solution: [...c.work, `Point-slope form: $${pointSlope(c.m, c.a, c.fa)}$`, `The tangent line is $${yEq(c.m, b)}$.`],
    answerDisplay: `$${yEq(c.m, b)}$`,
    calculator: calc,
  };
}

function normalItem(c: TanCase): GenOutput {
  const mn = -1 / c.m;
  const b = c.fa - mn * c.a;
  return {
    prompt: `Find an equation of the normal line to the graph of $f(x) = ${c.fTex}$ at $x = ${c.a}$. (The normal line is perpendicular to the tangent line at the point of tangency.)`,
    parts: [linePart(mn, b)],
    hints: ['The normal line passes through $(a, f(a))$ and is perpendicular to the tangent there.', 'Its slope is the negative reciprocal of the tangent slope: $m_{\\text{normal}} = -\\dfrac{1}{f\'(a)}$.'],
    solution: [
      ...c.work,
      `The normal slope is $-\\dfrac{1}{${tn(c.m)}} = ${tn(mn)}$.`,
      `Point-slope form: $${pointSlope(mn, c.a, c.fa)}$`,
      `The normal line is $${yEq(mn, b)}$.`,
    ],
    answerDisplay: `$${yEq(mn, b)}$`,
    calculator: false,
  };
}

interface ApproxCase {
  fTex: string;
  a: number;
  fa: number;
  m: number;
  x: number;
  /** What is being estimated, in LaTeX. */
  target: string;
  /** f'(x) in LaTeX. */
  dTex: string;
  /** The exact value, for the closing comparison. */
  exact: number;
}

function approxCase(rng: Rng, kinds: readonly string[]): ApproxCase {
  const kind = rng.pick(kinds);
  if (kind === 'sqrt') {
    const r = rng.int(3, 12);
    const delta = rng.pick([-3, -2, -1, 1, 2, 3]);
    const a = r * r;
    return { fTex: '\\sqrt{x}', a, fa: r, m: 1 / (2 * r), x: a + delta, target: `\\sqrt{${a + delta}}`, dTex: '\\dfrac{1}{2\\sqrt{x}}', exact: Math.sqrt(a + delta) };
  }
  if (kind === 'cbrt') {
    const r = rng.pick([2, 3, 4, 5, 10]);
    const delta = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
    const a = r ** 3;
    return { fTex: '\\sqrt[3]{x}', a, fa: r, m: 1 / (3 * r * r), x: a + delta, target: `\\sqrt[3]{${a + delta}}`, dTex: '\\dfrac{1}{3\\sqrt[3]{x^2}}', exact: Math.cbrt(a + delta) };
  }
  if (kind === 'power') {
    const a = rng.pick([1, 2, 3]);
    const n = a === 3 ? rng.pick([3, 4]) : rng.pick([3, 4, 5, 6]);
    const h = rng.pick([0.01, 0.02, 0.03, -0.01, -0.02]);
    return { fTex: `x^{${n}}`, a, fa: a ** n, m: n * a ** (n - 1), x: a + h, target: `(${dec(a + h)})^{${n}}`, dTex: `${n}x^{${n - 1}}`, exact: (a + h) ** n };
  }
  if (kind === 'exp') {
    const h = rng.pick([0.02, 0.03, 0.04, 0.05, -0.02, -0.03, -0.05]);
    return { fTex: 'e^x', a: 0, fa: 1, m: 1, x: h, target: `e^{${dec(h)}}`, dTex: 'e^x', exact: Math.exp(h) };
  }
  if (kind === 'ln') {
    const h = rng.pick([0.02, 0.03, 0.04, 0.05, -0.02, -0.04, -0.05]);
    return { fTex: '\\ln x', a: 1, fa: 0, m: 1, x: 1 + h, target: `\\ln ${dec(1 + h)}`, dTex: '\\dfrac{1}{x}', exact: Math.log(1 + h) };
  }
  if (kind === 'recip') {
    const a = rng.pick([2, 4, 5, 10]);
    const h = rng.pick([0.1, 0.2, -0.1, -0.2, 0.05]);
    return { fTex: '\\dfrac{1}{x}', a, fa: 1 / a, m: -1 / (a * a), x: a + h, target: `\\dfrac{1}{${dec(a + h)}}`, dTex: '-\\dfrac{1}{x^2}', exact: 1 / (a + h) };
  }
  // binomial: (1 + x)^n at 0
  const n = rng.pick([5, 8, 10, 12]);
  const h = rng.pick([0.01, 0.02, -0.01, -0.02, 0.03]);
  return { fTex: `(1 + x)^{${n}}`, a: 0, fa: 1, m: n, x: h, target: `(${dec(1 + h)})^{${n}}`, dTex: `${n}(1 + x)^{${n - 1}}`, exact: (1 + h) ** n };
}

/** Value of f'(a) shown as a calculation, e.g. 1/(2·5) = 1/10. */
function approxSteps(c: ApproxCase): string[] {
  const L = c.fa + c.m * (c.x - c.a);
  const lx = c.a === 0 ? poly([[c.fa, ''], [c.m, 'x']]) : `${c.fa === 0 ? '' : `${tn(c.fa)} `}${c.fa === 0 ? cf(c.m) : `${pm(c.m)}`}(${xm(c.a)})`;
  return [
    `$f(${tn(c.a)}) = ${tn(c.fa)}$ and $f'(x) = ${c.dTex}$, so $f'(${tn(c.a)}) = ${tn(c.m)}$.`,
    `$L(x) = f(${tn(c.a)}) + f'(${tn(c.a)})(x - ${par(c.a)}) = ${lx}$`,
    `$${c.target} \\approx L(${dec(c.x)}) = ${tn(c.fa)} ${pm(c.m)}(${dec(c.x - c.a)}) \\approx ${fmtFixed(L, 3)}$ (a calculator gives $${fmt(c.exact, 5)}$).`,
  ];
}

const tangentLine = skill({
  id: 'm31-tangent-line',
  name: 'Tangent lines and linear approximation',
  description: 'Find equations of tangent and normal lines, points where the tangent has a given slope, and estimates from the tangent line (linear approximation).',
  outcomes: ['DA4'],
  lessonId: 'm31-6-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['tangentQuad', 'tangentQuad', 'normalSlope', 'vertex'] as const)
        : d === 2
          ? rng.pick(['tangent', 'tangent', 'normal', 'horizontal', 'parallel', 'approx'] as const)
          : rng.pick(['tangentTrans', 'tangentTrans', 'parallelCubic', 'perpendicular', 'linearization', 'differential'] as const);

    if (kind === 'tangentQuad') return tangentItem(quadCase(rng));

    if (kind === 'normalSlope') {
      const { p, q, r, a } = retry(
        () => ({ p: rng.nonZero(-3, 3), q: rng.int(-6, 6), r: rng.int(-6, 6), a: rng.int(-3, 3) }),
        (o) => 2 * o.p * o.a + o.q !== 0,
      );
      const m = 2 * p * a + q;
      const mn = -1 / m;
      return {
        prompt: `Find the slope of the normal line to the graph of $y = ${quadTex(p, q, r)}$ at $x = ${a}$. (The normal line is perpendicular to the tangent line.)`,
        parts: [numPart(mn, { label: 'Slope $=$' })],
        hints: ['First find the slope of the tangent, $\\dfrac{dy}{dx}$ at the point.', 'Perpendicular slopes are negative reciprocals: $m_{\\text{normal}} = -\\dfrac{1}{m_{\\text{tangent}}}$.'],
        solution: [
          `$\\dfrac{dy}{dx} = ${linTex(2 * p, q)}$`,
          `Tangent slope at $x = ${a}$: $m = ${subst([[2 * p, 1], [q, 0]], a)} = ${m}$`,
          `The normal slope is $-\\dfrac{1}{${tn(m)}} = ${tn(mn)}$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'vertex') {
      const p = rng.nonZero(-3, 3);
      const x0 = rng.int(-4, 4);
      const q = -2 * p * x0;
      const r = rng.int(-6, 6);
      const y0 = p * x0 * x0 + q * x0 + r;
      return {
        prompt: `At what point on the graph of $y = ${quadTex(p, q, r)}$ is the tangent line horizontal?`,
        parts: [part({ kind: 'point', x: x0, y: y0 }, { placeholder: '(x, y)' })],
        hints: ['A horizontal tangent has slope $0$.', 'Solve $\\dfrac{dy}{dx} = 0$ for $x$, then find $y$.'],
        solution: [
          `$\\dfrac{dy}{dx} = ${linTex(2 * p, q)}$`,
          `$${linTex(2 * p, q)} = 0 \\Rightarrow x = ${x0}$`,
          `$y = ${subst([[p, 2], [q, 1], [r, 0]], x0)} = ${y0}$`,
          `The tangent is horizontal at $(${x0}, ${y0})$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'tangent') {
      const c = rng.pick([cubicCase, cubicCase, rootCase, recipCase, quotCase])(rng);
      return tangentItem(c);
    }

    if (kind === 'normal') {
      const c = retry(() => rng.pick([quadCase, cubicCase, rootCase, recipCase])(rng), (x) => x.m !== 0);
      return normalItem(c);
    }

    if (kind === 'horizontal') {
      const c = cubicCrit(rng, { lo: -4, hi: 4 });
      return {
        prompt: `Find the $x$-coordinates of all points where the tangent line to $y = ${cubicTexOf(c)}$ is horizontal. Separate your answers with commas.`,
        parts: [part({ kind: 'numbers', values: [c.p, c.q] }, { label: '$x =$' })],
        hints: ['A horizontal tangent line has slope $0$, so solve $\\dfrac{dy}{dx} = 0$.', 'Factor out the common factor first, then factor the quadratic.'],
        solution: [
          `$\\dfrac{dy}{dx} = ${cubicDTex(c)} = ${cubicDFactored(c)}$`,
          `Set $\\dfrac{dy}{dx} = 0$: $${fac(c.p)} = 0$ or $${fac(c.q)} = 0$.`,
          `The tangent is horizontal at $x = ${c.p}$ and $x = ${c.q}$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'parallel') {
      const p = rng.nonZero(-3, 3);
      const x0 = rng.int(-4, 4);
      const m = rng.nonZero(-6, 6);
      const q = m - 2 * p * x0;
      const r = rng.int(-6, 6);
      const y0 = p * x0 * x0 + q * x0 + r;
      const cc = retry(() => rng.int(-8, 8), (v) => v !== y0 - m * x0);
      return {
        prompt: `Find the point on the graph of $f(x) = ${quadTex(p, q, r)}$ where the tangent line is parallel to the line $${yEq(m, cc)}$.`,
        parts: [part({ kind: 'point', x: x0, y: y0 }, { placeholder: '(x, y)' })],
        hints: ['Parallel lines have equal slopes.', `Solve $f'(x) = ${m}$ for $x$, then find $f(x)$.`],
        solution: [
          `The given line has slope $${m}$, so the tangent must have slope $${m}$.`,
          `$f'(x) = ${linTex(2 * p, q)} = ${m} \\Rightarrow ${tn(2 * p)}x = ${m - q} \\Rightarrow x = ${x0}$`,
          `$f(${x0}) = ${subst([[p, 2], [q, 1], [r, 0]], x0)} = ${y0}$`,
          `The point is $(${x0}, ${y0})$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'approx') {
      const c = retry(() => approxCase(rng, ['sqrt', 'sqrt', 'cbrt', 'power']), (x) => safeRound(x.fa + x.m * (x.x - x.a), 3));
      const L = c.fa + c.m * (c.x - c.a);
      return {
        prompt: `Use the linear approximation of $f(x) = ${c.fTex}$ at $x = ${tn(c.a)}$ to estimate $${c.target}$. Give your answer to the nearest thousandth.`,
        parts: [numPart(L, { decimals: 3, tolerance: 0.0006 })],
        hints: ['Near $x = a$, $f(x) \\approx L(x) = f(a) + f\'(a)(x - a)$, the tangent line at $a$.', `Find $f(${tn(c.a)})$ and $f'(${tn(c.a)})$, then evaluate $L(${dec(c.x)})$.`],
        solution: [...approxSteps(c), `$${c.target} \\approx ${fmtFixed(L, 3)}$`],
      };
    }

    // ---------------- difficulty 3 ----------------
    if (kind === 'tangentTrans') return tangentItem(transCase(rng));

    if (kind === 'parallelCubic') {
      const c = cubicCrit(rng, { lo: -3, hi: 3, As: [1, -1, 2, -2], D: [-4, 4] });
      const m = rng.nonZero(-5, 5);
      const C = c.C + m;
      const k = rng.pick([1, 2, 3]);
      const cc = rng.int(-6, 6);
      const lineGen = `${poly([[k * m, 'x'], [-k, 'y'], [k * cc, '']])} = 0`;
      return {
        prompt: `Find the $x$-coordinates of all points on the graph of $f(x) = ${cubicTex(c.A, c.B, C, c.D)}$ where the tangent line is parallel to the line $${lineGen}$. Separate your answers with commas.`,
        parts: [part({ kind: 'numbers', values: [c.p, c.q] }, { label: '$x =$' })],
        hints: ['Rewrite the line in the form $y = mx + b$ to read its slope.', 'Set $f\'(x)$ equal to that slope and solve the quadratic equation.'],
        solution: [
          `Solving for $y$: $${k === 1 ? '' : `${k}y = ${linTex(k * m, k * cc)}$, so $`}y = ${linTex(m, cc)}$, which has slope $${m}$.`,
          `$f'(x) = ${quadTex(3 * c.A, 2 * c.B, C)} = ${m}$`,
          `$${quadTex(3 * c.A, 2 * c.B, c.C)} = 0 \\Rightarrow ${cubicDFactored(c)} = 0$`,
          `The tangent is parallel to the line at $x = ${c.p}$ and $x = ${c.q}$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'perpendicular') {
      const p = rng.nonZero(-2, 2);
      const x0 = rng.int(-3, 3);
      const m = rng.pick([2, 3, 4, -2, -3, -4, 1, -1]);
      const q = m - 2 * p * x0;
      const r = rng.int(-5, 5);
      const y0 = p * x0 * x0 + q * x0 + r;
      const b = y0 - m * x0;
      const cc = rng.int(-6, 6);
      // the given line: x + m y + c = 0 has slope -1/m
      const lineGen = `${poly([[1, 'x'], [m, 'y'], [cc, '']])} = 0`;
      return {
        prompt: `Find an equation of the tangent line to $f(x) = ${quadTex(p, q, r)}$ that is perpendicular to the line $${lineGen}$.`,
        parts: [linePart(m, b)],
        hints: ['Find the slope of the given line, then take its negative reciprocal: that is the slope the tangent needs.', 'Solve $f\'(x) = m$ to find the point of tangency, then write the line.'],
        solution: [
          `The given line is $y = ${linTex(-1 / m, -cc / m)}$, with slope $${tn(-1 / m)}$, so the tangent needs slope $m = ${m}$.`,
          `$f'(x) = ${linTex(2 * p, q)} = ${m} \\Rightarrow x = ${x0}$`,
          `$f(${x0}) = ${subst([[p, 2], [q, 1], [r, 0]], x0)} = ${y0}$, so the point of tangency is $(${x0}, ${y0})$.`,
          `$${pointSlope(m, x0, y0)}$`,
          `The tangent line is $${yEq(m, b)}$.`,
        ],
        answerDisplay: `$${yEq(m, b)}$`,
        calculator: false,
      };
    }

    if (kind === 'linearization') {
      const c = retry(() => approxCase(rng, ['sqrt', 'cbrt', 'exp', 'ln', 'recip', 'binom']), (x) => safeRound(x.fa + x.m * (x.x - x.a), 3));
      const L = c.fa + c.m * (c.x - c.a);
      const b = c.fa - c.m * c.a;
      return {
        prompt: `Find the linearization $L(x)$ of $f(x) = ${c.fTex}$ at $x = ${tn(c.a)}$ (enter it as $y = \\dots$), then use it to estimate $${c.target}$ to the nearest thousandth.`,
        parts: [linePart(c.m, b, 'Linearization'), numPart(L, { decimals: 3, tolerance: 0.0006, label: 'Estimate $\\approx$' })],
        hints: ['The linearization is the tangent line: $L(x) = f(a) + f\'(a)(x - a)$.', `Choose $x$ so that $f(x) = ${c.target}$, then evaluate $L(x)$.`],
        solution: [...approxSteps(c).slice(0, 2), `Simplified: $L(x) = ${linTex(c.m, b)}$`, approxSteps(c)[2], `$L(x) = ${linTex(c.m, b)}$ and $${c.target} \\approx ${fmtFixed(L, 3)}$`],
        answerDisplay: `$y = ${linTex(c.m, b)}$; $${fmtFixed(L, 3)}$`,
      };
    }

    // differential: applied estimates
    const ctx = rng.pick(['cube', 'sphere', 'circle', 'fall'] as const);
    if (ctx === 'cube') {
      const s0 = rng.pick([5, 8, 10, 12, 20]);
      const ds = rng.pick([0.1, 0.2, -0.1, 0.05, -0.2]);
      const est = s0 ** 3 + 3 * s0 * s0 * ds;
      return {
        prompt: `A metal cube has edges of exactly $${s0}$ cm. Use the tangent line to $V(s) = s^3$ at $s = ${s0}$ to estimate the volume of a cube with edges of $${dec(s0 + ds)}$ cm.`,
        parts: [numPart(est, { suffix: 'cm³', display: 'decimal' })],
        hints: ['$V(s) \\approx V(a) + V\'(a)(s - a)$ for $s$ near $a$.', `$V'(s) = 3s^2$, so find $V(${s0})$ and $V'(${s0})$.`],
        solution: [
          `$V(${s0}) = ${s0 ** 3}$ and $V'(s) = 3s^2$, so $V'(${s0}) = ${3 * s0 * s0}$.`,
          `$V(${dec(s0 + ds)}) \\approx ${s0 ** 3} + ${3 * s0 * s0}(${dec(ds)}) = ${dec(est)}$`,
          `The volume is about $${dec(est)}$ cm³ (the exact value is $${dec((s0 + ds) ** 3, 6)}$ cm³).`,
        ],
      };
    }
    if (ctx === 'sphere') {
      const r0 = rng.pick([3, 5, 6, 8, 10]);
      const dr = rng.pick([0.1, 0.2, 0.05, -0.1]);
      const est = 4 * Math.PI * r0 * r0 * dr;
      const grow = dr > 0;
      return {
        prompt: `The radius of a spherical balloon ${grow ? 'increases' : 'decreases'} from $${r0}$ cm to $${dec(r0 + dr)}$ cm. Use linear approximation with $V(r) = \\frac{4}{3}\\pi r^3$ to estimate the ${grow ? 'increase' : 'decrease'} in its volume. Give the exact value or round to the nearest tenth.`,
        parts: [numPart(Math.abs(est), { decimals: 1, exact: true, suffix: 'cm³' })],
        hints: ['A small change in $r$ changes $V$ by about $\\Delta V \\approx V\'(r)\\,\\Delta r$.', '$V\'(r) = 4\\pi r^2$, the surface area of the sphere.'],
        solution: [
          `$V'(r) = 4\\pi r^2$, so $V'(${r0}) = ${4 * r0 * r0}\\pi$.`,
          `$\\Delta V \\approx V'(${r0})\\,\\Delta r = ${4 * r0 * r0}\\pi(${dec(dr)}) = ${dec(4 * r0 * r0 * dr)}\\pi \\approx ${fmtFixed(est, 1)}$`,
          `The volume ${grow ? 'increases' : 'decreases'} by about $${dec(Math.abs(4 * r0 * r0 * dr))}\\pi \\approx ${fmtFixed(Math.abs(est), 1)}$ cm³.`,
        ],
      };
    }
    if (ctx === 'circle') {
      const r0 = rng.pick([20, 25, 40, 50, 100]);
      const dr = rng.pick([0.5, 1, 2, 1.5]);
      const est = 2 * Math.PI * r0 * dr;
      return {
        prompt: `An oil slick on a lake is circular. Its radius grows from $${r0}$ m to $${dec(r0 + dr)}$ m. Use linear approximation with $A(r) = \\pi r^2$ to estimate the increase in its area. Give the exact value or round to the nearest tenth.`,
        parts: [numPart(est, { decimals: 1, exact: true, suffix: 'm²' })],
        hints: ['$\\Delta A \\approx A\'(r)\\,\\Delta r$ for a small change $\\Delta r$.', '$A\'(r) = 2\\pi r$, the circumference.'],
        solution: [
          `$A'(r) = 2\\pi r$, so $A'(${r0}) = ${2 * r0}\\pi$.`,
          `$\\Delta A \\approx ${2 * r0}\\pi(${dec(dr)}) = ${dec(2 * r0 * dr)}\\pi \\approx ${fmtFixed(est, 1)}$`,
          `The area increases by about $${dec(2 * r0 * dr)}\\pi \\approx ${fmtFixed(est, 1)}$ m².`,
        ],
      };
    }
    const t0 = rng.pick([2, 3, 4, 5]);
    const dt = rng.pick([0.1, 0.2, -0.1, 0.05]);
    const s0 = 4.9 * t0 * t0;
    const v0 = 9.8 * t0;
    const est = s0 + v0 * dt;
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} drops a stone from a bridge over a river. It falls $s(t) = 4.9t^2$ metres in $t$ seconds. Use the tangent line to $s$ at $t = ${t0}$ to estimate how far the stone has fallen after $${dec(t0 + dt)}$ s.`,
      parts: [numPart(est, { suffix: 'm', display: 'decimal' })],
      hints: ['$s(t) \\approx s(a) + s\'(a)(t - a)$ for $t$ near $a$.', `Find $s(${t0})$ and $s'(${t0})$; $s'(t) = 9.8t$.`],
      solution: [
        `$s(${t0}) = 4.9(${t0})^2 = ${dec(s0)}$ and $s'(t) = 9.8t$, so $s'(${t0}) = ${dec(v0)}$.`,
        `$s(${dec(t0 + dt)}) \\approx ${dec(s0)} + ${dec(v0)}(${dec(dt)}) = ${dec(est)}$`,
        `The stone has fallen about $${dec(est)}$ m (the exact value is $${dec(4.9 * (t0 + dt) ** 2, 5)}$ m).`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.2 — Increasing, decreasing and extreme values
// ---------------------------------------------------------------------------

/** "Increasing on ...; decreasing on ..." for a cubic with critical numbers p < q. */
function monoText(A: number, p: number, q: number): { inc: string; dec: string } {
  const outer = cup(iv(null, p), iv(q, null));
  const inner = iv(p, q);
  return A > 0 ? { inc: outer, dec: inner } : { inc: inner, dec: outer };
}

/** f' = k(x - p)(x - q) with k sized so the graph fits a ±5 window. */
function fprimeQuad(rng: Rng): { k: number; p: number; q: number } {
  return retry(
    () => {
      const p = rng.int(-4, 2);
      const q = rng.int(p + 2, Math.min(4, p + 5));
      const gap = q - p;
      const k = (gap <= 3 ? rng.pick([1, 1.5]) : gap === 4 ? 1 : 0.5) * rng.sign();
      return { k, p, q };
    },
    (o) => Math.abs(o.k) * (o.q - o.p) ** 2 / 4 <= 4.6 && Math.abs(o.k) * (o.q - o.p) ** 2 / 4 >= 1,
  );
}

const extrema = skill({
  id: 'm31-extrema',
  name: 'Increasing, decreasing and extreme values',
  description: 'Find critical numbers and intervals of increase and decrease, and find local and absolute extrema from a function or from the graph of its derivative.',
  outcomes: ['DA1'],
  lessonId: 'm31-6-2',
  calculator: false,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['crit', 'crit', 'critQuad', 'fromFactored'] as const)
        : d === 2
          ? rng.pick(['intervals', 'localExt', 'fprimeGraph', 'fprimeGraph3'] as const)
          : rng.pick(['absCubic', 'absCubic', 'absOther', 'fprimeDouble', 'quartic', 'critUndefined'] as const);

    const critHints = ['A critical number of $f$ is a number $c$ in the domain of $f$ where $f\'(c) = 0$ or $f\'(c)$ does not exist.', 'Differentiate, factor $f\'(x)$ completely, and set each factor equal to $0$.'];

    if (kind === 'crit') {
      const c = cubicCrit(rng, { lo: -4, hi: 4 });
      return {
        prompt: `Find the critical numbers of $f(x) = ${cubicTexOf(c)}$. Separate your answers with commas.`,
        parts: [part({ kind: 'numbers', values: [c.p, c.q] }, { label: '$x =$' })],
        hints: critHints,
        solution: [
          `$f'(x) = ${cubicDTex(c)} = ${cubicDFactored(c)}$`,
          `$f'(x)$ is a polynomial, so it exists everywhere. $f'(x) = 0$ when $x = ${c.p}$ or $x = ${c.q}$.`,
          `The critical numbers are $${c.p}$ and $${c.q}$.`,
        ],
      };
    }

    if (kind === 'critQuad') {
      const a = rng.nonZero(-4, 4);
      const b = rng.nonZero(-12, 12);
      const c0 = rng.int(-9, 9);
      const x0 = -b / (2 * a);
      return {
        prompt: `Find the critical number of $f(x) = ${quadTex(a, b, c0)}$.`,
        parts: [part({ kind: 'numbers', values: [x0] }, { label: '$x =$' })],
        hints: critHints,
        solution: [`$f'(x) = ${linTex(2 * a, b)}$, which exists for every $x$.`, `$${linTex(2 * a, b)} = 0 \\Rightarrow ${tn(2 * a)}x = ${-b} \\Rightarrow x = ${tn(x0)}$`, `The critical number is $${tn(x0)}$.`],
      };
    }

    if (kind === 'fromFactored') {
      const p = rng.int(-5, 3);
      const q = rng.int(p + 1, p + 6);
      const k = rng.pick([1, 2, 3, -1, -2, -3]);
      const askInc = rng.chance(0.5);
      const outer = cup(iv(null, p), iv(q, null));
      const inner = iv(p, q);
      // f' = k(x-p)(x-q): positive outside when k > 0
      const incSet = k > 0 ? outer : inner;
      const decSet = k > 0 ? inner : outer;
      const correct = askInc ? incSet : decSet;
      const wrong = askInc ? decSet : incSet;
      const flipped = k > 0 === askInc ? cup(iv(null, -q), iv(-p, null)) : iv(-q, -p);
      const fp = factored2(k, p, q);
      const ans = mc(rng, `$${correct}$`, [`$${wrong}$`, `$${flipped}$`, `$${iv(p, null)}$`, `$${iv(null, q)}$`]);
      const gd = (x: number) => k * (x - p) * (x - q);
      const { steps } = signSteps(gd, [p, q], "f'", 'increasing', 'decreasing');
      return {
        prompt: `The derivative of a function $f$ is $f'(x) = ${fp}$. On which interval(s) is $f$ ${askInc ? 'increasing' : 'decreasing'}?`,
        parts: [part(ans)],
        hints: ['$f$ is increasing where $f\'(x) > 0$ and decreasing where $f\'(x) < 0$.', `The zeros of $f'$ are $${p}$ and $${q}$. Test one value of $x$ in each interval they create.`],
        solution: [`$f'(x) = 0$ at $x = ${p}$ and $x = ${q}$.`, ...steps, `$f$ is ${askInc ? 'increasing' : 'decreasing'} on $${correct}$.`],
      };
    }

    if (kind === 'intervals') {
      const c = cubicCrit(rng, { lo: -4, hi: 4 });
      const f = cubicFn(c);
      const { inc, dec: decr } = monoText(c.A, c.p, c.q);
      const h = (c.p + c.q) / 2;
      const say = (i: string, dd: string) => `Increasing on $${i}$; decreasing on $${dd}$`;
      const [lowY, highY] = [Math.min(f(c.p), f(c.q)), Math.max(f(c.p), f(c.q))];
      const yOuter = cup(iv(null, lowY), iv(highY, null));
      const ans = mc(rng, say(inc, decr), [
        say(decr, inc),
        c.A > 0 ? say(yOuter, iv(lowY, highY)) : say(iv(lowY, highY), yOuter),
        c.A > 0 ? say(iv(h, null), iv(null, h)) : say(iv(null, h), iv(h, null)),
      ]);
      const { steps } = signSteps(cubicDFn(c), [c.p, c.q], "f'", 'increasing', 'decreasing');
      return {
        prompt: `Find the intervals on which $f(x) = ${cubicTexOf(c)}$ is increasing or decreasing.`,
        parts: [part(ans)],
        hints: ['Find the critical numbers, then the sign of $f\'(x)$ on each interval between them.', 'Intervals are written in terms of $x$, not $y$.'],
        solution: [`$f'(x) = ${cubicDTex(c)} = ${cubicDFactored(c)}$, which is $0$ at $x = ${c.p}$ and $x = ${c.q}$.`, ...steps, `${say(inc, decr)}.`],
      };
    }

    if (kind === 'localExt') {
      const c = cubicCrit(rng, { lo: -3, hi: 3, D: [-5, 5] });
      const f = cubicFn(c);
      const [xMax, xMin] = c.A > 0 ? [c.p, c.q] : [c.q, c.p];
      const { steps } = signSteps(cubicDFn(c), [c.p, c.q], "f'", 'increasing', 'decreasing');
      return {
        prompt: `Find the local maximum point and the local minimum point of $f(x) = ${cubicTexOf(c)}$.`,
        parts: [
          part({ kind: 'point', x: xMax, y: f(xMax) }, { label: 'Local maximum', placeholder: '(x, y)' }),
          part({ kind: 'point', x: xMin, y: f(xMin) }, { label: 'Local minimum', placeholder: '(x, y)' }),
        ],
        hints: ['Find the critical numbers, then use the first derivative test: $f\'$ changes from $+$ to $-$ at a local maximum and from $-$ to $+$ at a local minimum.', 'Substitute each critical number into $f(x)$ (not $f\'(x)$) to get the $y$-coordinate.'],
        solution: [
          `$f'(x) = ${cubicDTex(c)} = ${cubicDFactored(c)}$, so the critical numbers are $${c.p}$ and $${c.q}$.`,
          ...steps,
          `$f'$ changes from $+$ to $-$ at $x = ${xMax}$: local maximum $f(${xMax}) = ${cubicSub(c, xMax)} = ${f(xMax)}$.`,
          `$f'$ changes from $-$ to $+$ at $x = ${xMin}$: local minimum $f(${xMin}) = ${cubicSub(c, xMin)} = ${f(xMin)}$.`,
          `Local maximum $(${xMax}, ${f(xMax)})$; local minimum $(${xMin}, ${f(xMin)})$.`,
        ],
      };
    }

    if (kind === 'fprimeGraph') {
      const { k, p, q } = fprimeQuad(rng);
      const g = (x: number) => k * (x - p) * (x - q);
      const askMax = rng.chance(0.5);
      // k > 0: + then - at p (max), - then + at q (min)
      const xMax = k > 0 ? p : q;
      const xMin = k > 0 ? q : p;
      const ansX = askMax ? xMax : xMin;
      const fig = curveFig(G55, [{ f: g }], { points: [{ x: p, y: 0 }, { x: q, y: 0 }] });
      return {
        prompt: `The graph of $y = f'(x)$, the **derivative** of a function $f$, is shown. At what value of $x$ does $f$ have a local ${askMax ? 'maximum' : 'minimum'}?`,
        figure: fig,
        parts: [numPart(ansX, { label: '$x =$' })],
        hints: ['The graph shows $f\'$, not $f$. Where the graph is above the $x$-axis, $f$ is increasing; below, $f$ is decreasing.', `A local ${askMax ? 'maximum' : 'minimum'} of $f$ is where $f'$ changes sign from ${askMax ? '$+$ to $-$' : '$-$ to $+$'}.`],
        solution: [
          `$f'(x) = 0$ at $x = ${p}$ and $x = ${q}$ (where the graph crosses the $x$-axis).`,
          `At $x = ${xMax}$ the graph of $f'$ crosses from above the axis to below it ($+$ to $-$): $f$ changes from increasing to decreasing, a local maximum.`,
          `At $x = ${xMin}$ it crosses from below to above ($-$ to $+$): a local minimum.`,
          `$f$ has a local ${askMax ? 'maximum' : 'minimum'} at $x = ${ansX}$.`,
        ],
      };
    }

    if (kind === 'fprimeGraph3') {
      const { p, q, r, k } = retry(
        () => {
          const [p, q, r] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 3).sort((a, b) => a - b);
          const s = rng.sign();
          let k = 0;
          for (const kk of [1, 0.5, 0.25, 0.2, 0.1]) {
            let mx = 0;
            for (let x = p; x <= r; x += 0.05) mx = Math.max(mx, Math.abs(kk * (x - p) * (x - q) * (x - r)));
            if (mx <= 4.6) {
              k = kk;
              if (mx >= 1) break;
            }
          }
          return { p, q, r, k: k * s };
        },
        (o) => o.k !== 0 && o.q - o.p >= 2 && o.r - o.q >= 2,
      );
      const g = (x: number) => k * (x - p) * (x - q) * (x - r);
      const askMax = rng.chance(0.5);
      // k > 0: - + - + : min at p, max at q, min at r
      const mins = k > 0 ? [p, r] : [q];
      const maxs = k > 0 ? [q] : [p, r];
      const ans = askMax ? maxs : mins;
      const fig = curveFig(G55, [{ f: g }], { points: [p, q, r].map((x) => ({ x, y: 0 })) });
      const word = askMax ? 'maximum' : 'minimum';
      return {
        prompt: `The graph of $y = f'(x)$, the **derivative** of a function $f$, is shown. Find all values of $x$ at which $f$ has a local ${word}. Separate your answers with commas.`,
        figure: fig,
        parts: [part({ kind: 'numbers', values: ans }, { label: '$x =$' })],
        hints: ['Read where $f\'(x) = 0$, then look at the sign of $f\'$ on each side.', `A local ${word} of $f$ is where $f'$ changes from ${askMax ? '$+$ to $-$' : '$-$ to $+$'}.`],
        solution: [
          `$f'(x) = 0$ at $x = ${p}$, $${q}$ and $${r}$.`,
          `Signs of $f'$ from left to right: ${k > 0 ? '$-, +, -, +$' : '$+, -, +, -$'}.`,
          `Local minima (from $-$ to $+$) at $x = ${mins.join('$ and $x = ')}$; local maxima (from $+$ to $-$) at $x = ${maxs.join('$ and $x = ')}$.`,
          `$f$ has a local ${word} at $x = ${ans.join('$ and $x = ')}$.`,
        ],
      };
    }

    // ---------------- difficulty 3 ----------------
    if (kind === 'absCubic') {
      const { c, lo, hi } = retry(
        () => {
          const c = cubicCrit(rng, { lo: -3, hi: 3, As: [1, -1, 2, -2], D: [-5, 5] });
          const lo = rng.int(c.p - 2, c.p);
          const hi = rng.int(Math.max(lo + 2, c.p + 1), c.q + 2);
          return { c, lo, hi };
        },
        (o) => o.lo < o.c.p || (o.c.q < o.hi && o.c.q > o.lo),
      );
      const f = cubicFn(c);
      const inside = [c.p, c.q].filter((x) => x > lo && x < hi);
      const cands = [lo, ...inside, hi];
      const vals = cands.map(f);
      const mx = Math.max(...vals);
      const mn = Math.min(...vals);
      const outside = [c.p, c.q].filter((x) => !(x > lo && x < hi));
      return {
        prompt: `Find the absolute maximum and absolute minimum values of $f(x) = ${cubicTexOf(c)}$ on the interval $[${lo}, ${hi}]$.`,
        parts: [numPart(mx, { label: 'Absolute maximum value' }), numPart(mn, { label: 'Absolute minimum value' })],
        hints: ['Closed interval method: evaluate $f$ at the critical numbers inside the interval and at both endpoints.', 'The largest of these values is the absolute maximum and the smallest is the absolute minimum.'],
        solution: [
          `$f'(x) = ${cubicDTex(c)} = ${cubicDFactored(c)}$, so the critical numbers are $${c.p}$ and $${c.q}$.`,
          ...outside.map((x) => (x === lo || x === hi ? `$x = ${x}$ is an endpoint, so it is already on the list.` : `$x = ${x}$ is outside $[${lo}, ${hi}]$, so it is ignored.`)),
          `Candidates: the endpoints $${lo}$ and $${hi}$ and the critical number${inside.length === 1 ? '' : 's'} ${inside.map((x) => `$${x}$`).join(' and ')}.`,
          `Values: ${cands.map((x) => `$f(${x}) = ${f(x)}$`).join(', ')}.`,
          `The absolute maximum value is $${mx}$ and the absolute minimum value is $${mn}$.`,
        ],
      };
    }

    if (kind === 'absOther') {
      const sub = rng.pick(['recip', 'root', 'trig', 'exp'] as const);
      const hintsAbs = ['Closed interval method: find the critical numbers in the interval, then evaluate $f$ there and at both endpoints.', 'Compare all of the values: the largest is the absolute maximum, the smallest the absolute minimum.'];
      if (sub === 'recip') {
        const k = rng.pick([2, 3, 4, 5, 6]);
        const lo = rng.pick([1, 2].filter((v) => v < k));
        const hi = rng.pick([k + 1, k + 2, 2 * k, 3 * k]);
        const f = (x: number) => x + (k * k) / x;
        const vals = [f(lo), 2 * k, f(hi)];
        const mx = Math.max(...vals);
        return {
          prompt: `Find the absolute maximum and absolute minimum values of $f(x) = x + \\dfrac{${k * k}}{x}$ on the interval $[${lo}, ${hi}]$. Give exact values.`,
          parts: [numPart(mx, { label: 'Absolute maximum value' }), numPart(2 * k, { label: 'Absolute minimum value' })],
          hints: hintsAbs,
          solution: [
            `$f'(x) = 1 - \\dfrac{${k * k}}{x^2} = \\dfrac{x^2 - ${k * k}}{x^2}$, which is $0$ at $x = \\pm ${k}$ and undefined at $x = 0$.`,
            `Only $x = ${k}$ is in $[${lo}, ${hi}]$.`,
            `$f(${lo}) = ${tn(f(lo))}$, $f(${k}) = ${2 * k}$, $f(${hi}) = ${tn(f(hi))}$`,
            `The absolute maximum value is $${tn(mx)}$ and the absolute minimum value is $${2 * k}$.`,
          ],
        };
      }
      if (sub === 'root') {
        const c = rng.pick([1, 2, 3]);
        const m = rng.int(c + 1, 3 * c);
        const M = m * m;
        const fM = M - 2 * c * m;
        const mx = Math.max(0, fM);
        return {
          prompt: `Find the absolute maximum and absolute minimum values of $f(x) = x - ${2 * c}\\sqrt{x}$ on the interval $[0, ${M}]$.`,
          parts: [numPart(mx, { label: 'Absolute maximum value' }), numPart(-c * c, { label: 'Absolute minimum value' })],
          hints: hintsAbs,
          solution: [
            `$f'(x) = 1 - \\dfrac{${c}}{\\sqrt{x}}$, which is $0$ when $\\sqrt{x} = ${c}$, so $x = ${c * c}$. ($f'(0)$ is undefined, but $0$ is an endpoint, so it is checked anyway.)`,
            `$f(0) = 0$, $f(${c * c}) = ${c * c} - ${2 * c}(${c}) = ${-c * c}$, $f(${M}) = ${M} - ${2 * c}(${m}) = ${fM}$`,
            `The absolute maximum value is $${mx}$ and the absolute minimum value is $${-c * c}$.`,
          ],
        };
      }
      if (sub === 'exp') {
        const k = rng.pick([1, 2, 3]);
        const M = rng.pick([2 * k, 3 * k, 4 * k, k + 1]);
        const f = (x: number) => x * Math.exp(-x / k);
        const ex = k === 1 ? '-x' : `-x/${k}`;
        return {
          prompt: `Find the absolute maximum and absolute minimum values of $f(x) = xe^{${ex}}$ on the interval $[0, ${M}]$. Give exact values or round to the nearest thousandth.`,
          parts: [numPart(k / Math.E, { label: 'Absolute maximum value', decimals: 3, exact: true }), numPart(0, { label: 'Absolute minimum value' })],
          hints: hintsAbs,
          solution: [
            k === 1
              ? `$f'(x) = e^{-x} - xe^{-x} = e^{-x}(1 - x)$, which is $0$ only at $x = 1$ (since $e^{-x} > 0$).`
              : `$f'(x) = e^{${ex}} + x\\left(-\\dfrac{1}{${k}}\\right)e^{${ex}} = e^{${ex}}\\left(1 - \\dfrac{x}{${k}}\\right)$, which is $0$ only at $x = ${k}$ (since $e^{${ex}} > 0$).`,
            `$f(0) = 0$, $f(${k}) = ${k}e^{-1} = \\dfrac{${k}}{e} \\approx ${fmtFixed(k / Math.E, 3)}$, $f(${M}) = ${M}e^{${tn(-M / k)}} \\approx ${fmtFixed(f(M), 3)}$`,
            `The absolute maximum value is $\\dfrac{${k}}{e} \\approx ${fmtFixed(k / Math.E, 3)}$ and the absolute minimum value is $0$.`,
          ],
        };
      }
      const cfg = rng.pick([
        { tex: '2\\sin x + \\cos 2x', a: '0', b: '\\pi', crit: 'f\'(x) = 2\\cos x - 2\\sin 2x = 2\\cos x(1 - 2\\sin x)', cands: [['0', 1], ['\\frac{\\pi}{6}', 1.5], ['\\frac{\\pi}{2}', 1], ['\\frac{5\\pi}{6}', 1.5], ['\\pi', 1]], mx: 1.5, mn: 1, mxT: '\\frac{3}{2}', mnT: '1' },
        { tex: '2\\sin x + \\cos 2x', a: '-\\frac{\\pi}{2}', b: '\\frac{\\pi}{2}', crit: 'f\'(x) = 2\\cos x - 2\\sin 2x = 2\\cos x(1 - 2\\sin x)', cands: [['-\\frac{\\pi}{2}', -3], ['\\frac{\\pi}{6}', 1.5], ['\\frac{\\pi}{2}', 1]], mx: 1.5, mn: -3, mxT: '\\frac{3}{2}', mnT: '-3' },
        { tex: 'x + 2\\cos x', a: '0', b: '\\pi', crit: 'f\'(x) = 1 - 2\\sin x', cands: [['0', 2], ['\\frac{\\pi}{6}', Math.PI / 6 + Math.sqrt(3)], ['\\frac{5\\pi}{6}', (5 * Math.PI) / 6 - Math.sqrt(3)], ['\\pi', Math.PI - 2]], mx: Math.PI / 6 + Math.sqrt(3), mn: (5 * Math.PI) / 6 - Math.sqrt(3), mxT: '\\frac{\\pi}{6} + \\sqrt{3}', mnT: '\\frac{5\\pi}{6} - \\sqrt{3}' },
        { tex: 'x - 2\\sin x', a: '0', b: '\\pi', crit: 'f\'(x) = 1 - 2\\cos x', cands: [['0', 0], ['\\frac{\\pi}{3}', Math.PI / 3 - Math.sqrt(3)], ['\\pi', Math.PI]], mx: Math.PI, mn: Math.PI / 3 - Math.sqrt(3), mxT: '\\pi', mnT: '\\frac{\\pi}{3} - \\sqrt{3}' },
        { tex: '\\sin x + \\cos x', a: '0', b: '\\pi', crit: 'f\'(x) = \\cos x - \\sin x', cands: [['0', 1], ['\\frac{\\pi}{4}', Math.SQRT2], ['\\pi', -1]], mx: Math.SQRT2, mn: -1, mxT: '\\sqrt{2}', mnT: '-1' },
      ] as const);
      const exactish = (v: number, t: string) => (Number.isInteger(v * 2) ? t : `${t} \\approx ${fmtFixed(v, 3)}`);
      return {
        prompt: `Find the absolute maximum and absolute minimum values of $f(x) = ${cfg.tex}$ on the interval $\\left[${cfg.a}, ${cfg.b}\\right]$. Give exact values or round to the nearest thousandth.`,
        parts: [numPart(cfg.mx, { label: 'Absolute maximum value', decimals: 3, exact: true }), numPart(cfg.mn, { label: 'Absolute minimum value', decimals: 3, exact: true })],
        hints: hintsAbs,
        solution: [
          `$${cfg.crit}$. Its zeros in the interval give the critical numbers ${cfg.cands.slice(1, -1).map((c) => `$${c[0]}$`).join(', ')}.`,
          `Values: ${cfg.cands.map(([x, v]) => `$f\\left(${x}\\right) ${Number.isInteger(v * 2) ? `= ${tn(v)}` : `\\approx ${fmtFixed(v, 3)}`}$`).join(', ')}.`,
          `The absolute maximum value is $${exactish(cfg.mx, cfg.mxT)}$ and the absolute minimum value is $${exactish(cfg.mn, cfg.mnT)}$.`,
        ],
        calculator: true,
      };
    }

    if (kind === 'fprimeDouble') {
      const { p, q, k } = retry(
        () => {
          const [p, q] = rng.sample([-3, -2, -1, 0, 1, 2, 3], 2);
          const s = rng.sign();
          let k = 0;
          for (const kk of [1, 0.5, 0.25, 0.2, 0.1]) {
            let mx = 0;
            for (let x = Math.min(p, q) - 0.5; x <= Math.max(p, q) + 0.5; x += 0.05) mx = Math.max(mx, Math.abs(kk * (x - p) ** 2 * (x - q)));
            if (mx <= 4.6) {
              k = kk;
              if (mx >= 0.8) break;
            }
          }
          return { p, q, k: k * s };
        },
        (o) => o.k !== 0 && Math.abs(o.q - o.p) >= 2,
      );
      const g = (x: number) => k * (x - p) ** 2 * (x - q);
      const fig = curveFig(G55, [{ f: g }], { points: [{ x: p, y: 0 }, { x: q, y: 0 }] });
      const qType = k > 0 ? 'minimum' : 'maximum';
      const other = k > 0 ? 'maximum' : 'minimum';
      const ans = mc(rng, `Local ${qType} at $x = ${q}$ only`, [
        `Local ${other} at $x = ${p}$ and local ${qType} at $x = ${q}$`,
        `Local ${qType} at $x = ${p}$ and at $x = ${q}$`,
        `Local ${other} at $x = ${q}$ only`,
        'No local extrema',
      ]);
      return {
        prompt: `The graph of $y = f'(x)$, the **derivative** of a function $f$, is shown. Which statement about the local extrema of $f$ is true?`,
        figure: fig,
        parts: [part(ans)],
        hints: ['A critical number gives a local extremum only if $f\'$ changes sign there.', `Look at the sign of $f'$ on both sides of $x = ${p}$ and of $x = ${q}$.`],
        solution: [
          `$f'(x) = 0$ at $x = ${p}$ and $x = ${q}$.`,
          `At $x = ${p}$ the graph touches the axis without crossing: $f'$ has the same sign on both sides, so there is no extremum there.`,
          `At $x = ${q}$, $f'$ changes from ${k > 0 ? '$-$ to $+$' : '$+$ to $-$'}, so $f$ has a local ${qType}.`,
          `Local ${qType} at $x = ${q}$ only.`,
        ],
      };
    }

    if (kind === 'quartic') {
      const k = rng.pick([1, 2, 3]);
      const s = rng.pick([1, -1]);
      const D = rng.int(-5, 5);
      // f = s(x^4 - 2k^2 x^2) + D; f' = 4s x(x - k)(x + k)
      const atK = s * (k ** 4 - 2 * k ** 4) + D;
      const [maxV, minV] = s > 0 ? [D, atK] : [atK, D];
      const fTex = poly([[s, 'x^4'], [-2 * s * k * k, 'x^2'], [D, '']]);
      return {
        prompt: `Find the critical numbers of $f(x) = ${fTex}$, its local maximum value and its local minimum value.`,
        parts: [part({ kind: 'numbers', values: [-k, 0, k] }, { label: 'Critical numbers' }), numPart(maxV, { label: 'Local maximum value' }), numPart(minV, { label: 'Local minimum value' })],
        hints: ['Factor $f\'(x)$ completely: take out the common factor, then use a difference of squares.', 'Use the first derivative test (signs of $f\'$) to classify each critical number, then evaluate $f$.'],
        solution: [
          `$f'(x) = ${poly([[4 * s, 'x^3'], [-4 * s * k * k, 'x']])} = ${cf(4 * s)}x(x - ${k})(x + ${k})$, so the critical numbers are $${-k}$, $0$ and $${k}$.`,
          `Signs of $f'$ on $(-\\infty, ${-k})$, $(${-k}, 0)$, $(0, ${k})$, $(${k}, \\infty)$: ${s > 0 ? '$-, +, -, +$' : '$+, -, +, -$'}.`,
          s > 0 ? `Local minima at $x = \\pm ${k}$ and a local maximum at $x = 0$.` : `Local maxima at $x = \\pm ${k}$ and a local minimum at $x = 0$.`,
          `$f(0) = ${D}$ and $f(\\pm ${k}) = ${atK}$.`,
          `The local maximum value is $${maxV}$ and the local minimum value is $${minV}$.`,
        ],
      };
    }

    // critUndefined: f(x) = x^{2/3}(x - c) = x^{5/3} - c x^{2/3}
    const c = rng.pick([5, 10, -5, -10, 15, 5 / 2]);
    const x1 = (2 * c) / 5;
    return {
      prompt: `Find all critical numbers of $f(x) = x^{2/3}(x ${pm(-c)})$. Separate your answers with commas.`,
      parts: [part({ kind: 'numbers', values: [0, x1] }, { label: '$x =$' })],
      hints: [`Expand to $x^{5/3} ${pm(-c)}x^{2/3}$ before differentiating, then write $f'(x)$ as one fraction.`, 'Critical numbers include values where $f\'(x) = 0$ AND values in the domain where $f\'(x)$ does not exist.'],
      solution: [
        `$f(x) = x^{5/3} ${pm(-c)}x^{2/3}$, so $f'(x) = \\dfrac{5}{3}x^{2/3} ${pm((-2 * c) / 3)}x^{-1/3} = \\dfrac{5x ${pm(-2 * c)}}{3x^{1/3}}$`,
        `$f'(x) = 0$ when $5x ${pm(-2 * c)} = 0$, so $x = ${tn(x1)}$.`,
        `$f'(x)$ does not exist at $x = 0$, but $f(0) = 0$ is defined, so $0$ is also a critical number.`,
        `The critical numbers are $0$ and $${tn(x1)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.3 — Concavity and curve sketching
// ---------------------------------------------------------------------------

/** f(x) = k(x^3/3 - (p+q)x^2/2 + pq x) + D, scaled to fit a graph window. */
function graphCubic(rng: Rng) {
  return retry(
    () => {
      const p = rng.int(-3, 2);
      const gap = rng.pick([2, 3, 4]);
      const q = p + gap;
      const k = (gap === 2 ? 3 : gap === 3 ? 1 : 0.5) * rng.sign();
      const f0 = (x: number) => k * (x ** 3 / 3 - ((p + q) * x * x) / 2 + p * q * x);
      const D = -Math.round(((f0(p) + f0(q)) / 2) * 2) / 2;
      return { p, q, k, D, f: (x: number) => f0(x) + D, fp: (x: number) => k * (x - p) * (x - q), fpp: (x: number) => k * (2 * x - p - q) };
    },
    (o) => o.q <= 4 && Math.abs(o.f(o.p)) <= 5 && Math.abs(o.f(o.q)) <= 5,
  );
}

const concavity = skill({
  id: 'm31-concavity',
  name: 'Concavity, inflection points and curve sketching',
  description: 'Find intervals of concavity and points of inflection, apply the second derivative test, match graphs of f, f′ and f″, and summarize the features of a curve.',
  outcomes: ['DA1'],
  lessonId: 'm31-6-3',
  calculator: false,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['inflX', 'concaveAt'] as const)
        : d === 2
          ? rng.pick(['concIntervals', 'inflPoint', 'secondTest', 'fprimeConcavity'] as const)
          : rng.pick(['matchGraph', 'matchGraph', 'transInfl', 'summary'] as const);
    const concHints = ['$f$ is concave up where $f\'\'(x) > 0$ and concave down where $f\'\'(x) < 0$.', 'A point of inflection is a point on the graph where the concavity changes, so $f\'\'$ changes sign there.'];

    if (kind === 'inflX') {
      const A = rng.pick([1, -1, 2, -2, 3]);
      const B = rng.nonZero(-9, 9);
      const C = rng.int(-8, 8);
      const D = rng.int(-6, 6);
      const h = -B / (3 * A);
      return {
        prompt: `Find the $x$-coordinate of the point of inflection of $f(x) = ${cubicTex(A, B, C, D)}$.`,
        parts: [numPart(h, { label: '$x =$' })],
        hints: concHints,
        solution: [
          `$f'(x) = ${quadTex(3 * A, 2 * B, C)}$ and $f''(x) = ${linTex(6 * A, 2 * B)}$`,
          `$f''(x) = 0 \\Rightarrow x = \\dfrac{${-2 * B}}{${6 * A}} = ${tn(h)}$`,
          `$f''$ is linear, so it changes sign at $x = ${tn(h)}$ and the concavity changes there.`,
          `The point of inflection has $x = ${tn(h)}$.`,
        ],
      };
    }

    if (kind === 'concaveAt') {
      const useQuartic = rng.chance(0.4);
      let fTex: string;
      let fppTex: string;
      let fpp: (x: number) => number;
      let a: number;
      let fppSub: string;
      if (useQuartic) {
        const b = rng.int(-4, 4);
        const c = rng.nonZero(-6, 6);
        const e = rng.int(-5, 5);
        fTex = poly([[1, 'x^4'], [b, 'x^3'], [c, 'x^2'], [e, 'x']]);
        fppTex = quadTex(12, 6 * b, 2 * c);
        fpp = (x) => 12 * x * x + 6 * b * x + 2 * c;
        a = retry(() => rng.int(-3, 3), (x) => fpp(x) !== 0);
        fppSub = subst([[12, 2], [6 * b, 1], [2 * c, 0]], a);
      } else {
        const A = rng.pick([1, -1, 2, -2]);
        const h = rng.int(-3, 3);
        const B = -3 * A * h;
        const C = rng.int(-6, 6);
        fTex = cubicTex(A, B, C, rng.int(-5, 5));
        fppTex = linTex(6 * A, 2 * B);
        fpp = (x) => 6 * A * x + 2 * B;
        a = rng.chance(0.2) ? h : rng.int(-4, 4);
        fppSub = subst([[6 * A, 1], [2 * B, 0]], a);
      }
      const v = fpp(a);
      const idx = v > 0 ? 0 : v < 0 ? 1 : 2;
      return {
        prompt: `Is the graph of $f(x) = ${fTex}$ concave up or concave down at $x = ${a}$?`,
        parts: [part(fixedChoice(['Concave up', 'Concave down', `Neither: $x = ${a}$ is where the concavity changes`], idx))],
        hints: ['Find $f\'\'(x)$ and evaluate it at the given $x$.', 'Concave up if $f\'\'(a) > 0$; concave down if $f\'\'(a) < 0$. If $f\'\'(a) = 0$, check whether the sign changes there.'],
        solution: [
          `$f''(x) = ${fppTex}$`,
          `$f''(${a}) = ${fppSub} = ${v}$`,
          v > 0 ? `$f''(${a}) > 0$, so the graph is concave up at $x = ${a}$.` : v < 0 ? `$f''(${a}) < 0$, so the graph is concave down at $x = ${a}$.` : `$f''(${a}) = 0$ and the linear function $f''$ changes sign there, so $x = ${a}$ is a point of inflection: neither concave up nor concave down.`,
        ],
      };
    }

    if (kind === 'concIntervals') {
      const sub = rng.pick(['cubic', 'quarticB', 'quarticK'] as const);
      let fTex: string;
      let fppTex: string;
      let roots: number[];
      let lead: number;
      let fpp: (x: number) => number;
      if (sub === 'cubic') {
        const A = rng.pick([1, -1, 2, -2]);
        const h = rng.int(-3, 3);
        const B = -3 * A * h;
        const C = rng.int(-9, 9);
        fTex = cubicTex(A, B, C, rng.int(-5, 5));
        fppTex = h === 0 ? linTex(6 * A, 0) : `${linTex(6 * A, 2 * B)} = ${cf(6 * A)}${fac(h)}`;
        roots = [h];
        lead = A;
        fpp = (x) => 6 * A * (x - h);
      } else if (sub === 'quarticB') {
        const s = rng.pick([1, -1]);
        const b = rng.pick([2, 4, 6, -2, -4, -6]);
        const r = -b / 2;
        fTex = poly([[s, 'x^4'], [s * b, 'x^3'], [rng.int(-6, 6), 'x'], [rng.int(-5, 5), '']]);
        fppTex = `${quadTex(12 * s, 6 * s * b, 0)} = ${cf(12 * s)}x${fac(r)}`;
        roots = [0, r].sort((u, w) => u - w);
        lead = s;
        fpp = (x) => 12 * s * x * x + 6 * s * b * x;
      } else {
        const s = rng.pick([1, -1]);
        const k = rng.pick([1, 2, 3]);
        fTex = poly([[s, 'x^4'], [-6 * s * k * k, 'x^2'], [rng.int(-6, 6), 'x']]);
        fppTex = `${quadTex(12 * s, 0, -12 * s * k * k)} = ${cf(12 * s)}(x - ${k})(x + ${k})`;
        roots = [-k, k];
        lead = s;
        fpp = (x) => 12 * s * (x * x - k * k);
      }
      let up: string;
      let down: string;
      if (roots.length === 1) {
        const h = roots[0];
        [up, down] = lead > 0 ? [iv(h, null), iv(null, h)] : [iv(null, h), iv(h, null)];
      } else {
        const outer = cup(iv(null, roots[0]), iv(roots[1], null));
        const inner = iv(roots[0], roots[1]);
        [up, down] = lead > 0 ? [outer, inner] : [inner, outer];
      }
      const say = (u: string, w: string) => `Concave up on $${u}$; concave down on $${w}$`;
      const neg = roots.map((r) => -r).sort((u, w) => u - w);
      let shifted: string;
      if (roots.length === 1) shifted = say(lead > 0 ? iv(-roots[0] || 1, null) : iv(null, -roots[0] || 1), lead > 0 ? iv(null, -roots[0] || 1) : iv(-roots[0] || 1, null));
      else shifted = say(lead > 0 ? iv(neg[0] - 1, neg[1] + 1) : cup(iv(null, neg[0] - 1), iv(neg[1] + 1, null)), lead > 0 ? cup(iv(null, neg[0] - 1), iv(neg[1] + 1, null)) : iv(neg[0] - 1, neg[1] + 1));
      const ans = mc(rng, say(up, down), [say(down, up), shifted, `Concave up on $(-\\infty, \\infty)$`]);
      const { steps } = signSteps(fpp, roots, "f''", 'concave up', 'concave down');
      return {
        prompt: `Find the intervals on which $f(x) = ${fTex}$ is concave up or concave down.`,
        parts: [part(ans)],
        hints: concHints,
        solution: [`$f''(x) = ${fppTex}$, which is $0$ at $x = ${roots.join('$ and $x = ')}$.`, ...steps, `${say(up, down)}.`],
      };
    }

    if (kind === 'inflPoint') {
      if (rng.chance(0.6)) {
        const A = rng.pick([1, -1, 2, -2]);
        const h = rng.int(-3, 3);
        const B = -3 * A * h;
        const C = rng.int(-9, 9);
        const D = rng.int(-6, 6);
        const f = (x: number) => A * x ** 3 + B * x * x + C * x + D;
        return {
          prompt: `Find the point of inflection of $f(x) = ${cubicTex(A, B, C, D)}$.`,
          parts: [part({ kind: 'point', x: h, y: f(h) }, { placeholder: '(x, y)' })],
          hints: [concHints[1], 'Solve $f\'\'(x) = 0$, check that $f\'\'$ changes sign, then substitute into $f(x)$ for the $y$-coordinate.'],
          solution: [
            `$f'(x) = ${quadTex(3 * A, 2 * B, C)}$ and $f''(x) = ${linTex(6 * A, 2 * B)}$`,
            `$f''(x) = 0 \\Rightarrow x = ${h}$, and $f''$ changes sign there (it is linear).`,
            `$f(${h}) = ${subst([[A, 3], [B, 2], [C, 1], [D, 0]], h)} = ${f(h)}$`,
            `The point of inflection is $(${h}, ${f(h)})$.`,
          ],
        };
      }
      const s = rng.pick([1, -1]);
      const b = rng.pick([2, 4, 6, 8, -2, -4, -6, -8]);
      const c = rng.int(-6, 6);
      const r = -b / 2;
      return {
        prompt: `Find the $x$-coordinates of all points of inflection of $f(x) = ${poly([[s, 'x^4'], [s * b, 'x^3'], [c, 'x']])}$. Separate your answers with commas.`,
        parts: [part({ kind: 'numbers', values: [0, r] }, { label: '$x =$' })],
        hints: concHints,
        solution: [
          `$f'(x) = ${poly([[4 * s, 'x^3'], [3 * s * b, 'x^2'], [c, '']])}$ and $f''(x) = ${quadTex(12 * s, 6 * s * b, 0)} = ${cf(12 * s)}x${fac(r)}$`,
          `$f''(x) = 0$ at $x = 0$ and $x = ${r}$.`,
          `$f''$ is a quadratic with two distinct zeros, so it changes sign at both.`,
          `The points of inflection are at $x = ${[0, r].sort((u, w) => u - w).join('$ and $x = ')}$.`,
        ],
      };
    }

    if (kind === 'secondTest') {
      const c = cubicCrit(rng, { lo: -4, hi: 4 });
      const fpp = (x: number) => 6 * c.A * x + 2 * c.B;
      const [vp, vq] = [fpp(c.p), fpp(c.q)];
      const opts = [
        `Local maximum at $x = ${c.p}$; local minimum at $x = ${c.q}$`,
        `Local minimum at $x = ${c.p}$; local maximum at $x = ${c.q}$`,
        `Local minima at $x = ${c.p}$ and $x = ${c.q}$`,
        `Local maxima at $x = ${c.p}$ and $x = ${c.q}$`,
      ];
      return {
        prompt: `The critical numbers of $f(x) = ${cubicTexOf(c)}$ are $x = ${c.p}$ and $x = ${c.q}$. Use the second derivative test: find $f''(${c.p})$ and $f''(${c.q})$, then classify each critical number.`,
        parts: [numPart(vp, { label: `$f''(${c.p}) =$` }), numPart(vq, { label: `$f''(${c.q}) =$` }), part(fixedChoice(opts, vp < 0 ? 0 : 1))],
        hints: ['Second derivative test: at a critical number $c$, $f\'\'(c) > 0$ means a local minimum (concave up), $f\'\'(c) < 0$ means a local maximum (concave down).', `Differentiate twice: $f''(x) = ${linTex(6 * c.A, 2 * c.B)}$.`],
        solution: [
          `$f'(x) = ${cubicDTex(c)}$ and $f''(x) = ${linTex(6 * c.A, 2 * c.B)}$`,
          `$f''(${c.p}) = ${subst([[6 * c.A, 1], [2 * c.B, 0]], c.p)} = ${vp} ${vp < 0 ? '< 0' : '> 0'}$: concave ${vp < 0 ? 'down, so a local maximum' : 'up, so a local minimum'}.`,
          `$f''(${c.q}) = ${subst([[6 * c.A, 1], [2 * c.B, 0]], c.q)} = ${vq} ${vq < 0 ? '< 0' : '> 0'}$: concave ${vq < 0 ? 'down, so a local maximum' : 'up, so a local minimum'}.`,
          `${opts[vp < 0 ? 0 : 1]}.`,
        ],
      };
    }

    if (kind === 'fprimeConcavity') {
      const { k, p, q } = retry(() => fprimeQuad(rng), (o) => (o.p + o.q) % 2 === 0);
      const h = (p + q) / 2;
      const g = (x: number) => k * (x - p) * (x - q);
      const askUp = rng.chance(0.5);
      // f' opens up (k > 0): f' increasing on (h, ∞) → f concave up there
      const upSet = k > 0 ? iv(h, null) : iv(null, h);
      const downSet = k > 0 ? iv(null, h) : iv(h, null);
      const posSet = k > 0 ? cup(iv(null, p), iv(q, null)) : iv(p, q);
      const negSet = k > 0 ? iv(p, q) : cup(iv(null, p), iv(q, null));
      const correct = askUp ? upSet : downSet;
      const ans = mc(rng, `$${correct}$`, [`$${askUp ? downSet : upSet}$`, `$${askUp ? posSet : negSet}$`, `$${askUp ? negSet : posSet}$`]);
      return {
        prompt: `The graph of $y = f'(x)$, the **derivative** of a function $f$, is shown. On which interval is $f$ concave ${askUp ? 'up' : 'down'}?`,
        figure: curveFig(G55, [{ f: g }], { points: [{ x: h, y: g(h) }] }),
        parts: [part(ans)],
        hints: ['$f$ is concave up where $f\'$ is increasing, because then $f\'\' > 0$.', 'Do not confuse the sign of $f\'$ (which tells whether $f$ increases) with whether $f\'$ is rising or falling.'],
        solution: [
          `The graph of $f'$ is a parabola with its turning point at $x = ${h}$.`,
          `$f'$ is increasing on $${upSet}$, so $f'' > 0$ and $f$ is concave up there; $f'$ is decreasing on $${downSet}$, so $f$ is concave down there.`,
          `$f$ is concave ${askUp ? 'up' : 'down'} on $${correct}$.`,
        ],
      };
    }

    // ---------------- difficulty 3 ----------------
    if (kind === 'matchGraph') {
      const g = graphCubic(rng);
      const dir = rng.pick(['fToFp', 'fpToF', 'fToFpp'] as const);
      const fig = (f: (x: number) => number): Figure => curveFig(G56, [{ f }]);
      if (dir === 'fToFp') {
        const answer = mcFigures(rng, [
          { md: '', figure: fig(g.fp), correct: true },
          { md: '', figure: fig((x) => -g.fp(x)) },
          { md: '', figure: fig((x) => g.fp(x - 1)) },
          { md: '', figure: fig(g.fpp) },
        ]);
        return {
          prompt: 'The graph of $y = f(x)$ is shown. Which graph is the graph of its derivative, $y = f\'(x)$?',
          figure: fig(g.f),
          parts: [part(answer)],
          hints: ['Where $f$ has a horizontal tangent (a local maximum or minimum), $f\'(x) = 0$.', 'Where $f$ is increasing, the graph of $f\'$ is above the $x$-axis; where $f$ is decreasing, it is below.'],
          solution: [
            `$f$ has horizontal tangents at $x = ${g.p}$ and $x = ${g.q}$, so $f'$ has zeros there.`,
            `$f$ is ${g.k > 0 ? 'increasing' : 'decreasing'} for $x < ${g.p}$ and $x > ${g.q}$ and ${g.k > 0 ? 'decreasing' : 'increasing'} between them, so $f'$ is ${g.k > 0 ? 'positive outside and negative between' : 'negative outside and positive between'} its zeros.`,
            `The correct graph is a parabola opening ${g.k > 0 ? 'up' : 'down'} with $x$-intercepts $${g.p}$ and $${g.q}$.`,
          ],
        };
      }
      if (dir === 'fpToF') {
        const answer = mcFigures(rng, [
          { md: '', figure: fig(g.f), correct: true },
          { md: '', figure: fig((x) => -g.f(x)) },
          { md: '', figure: fig((x) => g.f(x - 1)) },
          { md: '', figure: fig(g.fpp) },
        ]);
        return {
          prompt: 'The graph of the derivative, $y = f\'(x)$, is shown. Which graph could be the graph of $y = f(x)$?',
          figure: fig(g.fp),
          parts: [part(answer)],
          hints: ['The zeros of $f\'$ are where $f$ has horizontal tangents.', 'Where $f\' > 0$, $f$ is increasing; where $f\' < 0$, $f$ is decreasing.'],
          solution: [
            `$f'(x) = 0$ at $x = ${g.p}$ and $x = ${g.q}$, so $f$ has horizontal tangents there.`,
            `$f' ${g.k > 0 ? '> 0' : '< 0'}$ for $x < ${g.p}$, $f' ${g.k > 0 ? '< 0' : '> 0'}$ between, and $f' ${g.k > 0 ? '> 0' : '< 0'}$ for $x > ${g.q}$.`,
            `So $f$ has a local ${g.k > 0 ? 'maximum' : 'minimum'} at $x = ${g.p}$ and a local ${g.k > 0 ? 'minimum' : 'maximum'} at $x = ${g.q}$: the correct graph is the cubic with those turning points.`,
          ],
        };
      }
      const h = (g.p + g.q) / 2;
      const answer = mcFigures(rng, [
        { md: '', figure: fig(g.fpp), correct: true },
        { md: '', figure: fig((x) => -g.fpp(x)) },
        { md: '', figure: fig(g.fp) },
        { md: '', figure: fig((x) => g.fpp(x - 2)) },
      ]);
      return {
        prompt: 'The graph of $y = f(x)$ is shown. Which graph is the graph of its second derivative, $y = f\'\'(x)$?',
        figure: fig(g.f),
        parts: [part(answer)],
        hints: ['$f\'\'$ is positive where $f$ is concave up and negative where $f$ is concave down.', 'The point of inflection of the cubic is where $f\'\'(x) = 0$.'],
        solution: [
          `The cubic changes concavity at its point of inflection, $x = ${tn(h)}$ (halfway between its turning points), so $f''(${tn(h)}) = 0$.`,
          `$f$ is concave ${g.k > 0 ? 'down' : 'up'} for $x < ${tn(h)}$ and concave ${g.k > 0 ? 'up' : 'down'} for $x > ${tn(h)}$.`,
          `So $f''$ is a line through $(${tn(h)}, 0)$ with ${g.k > 0 ? 'positive' : 'negative'} slope.`,
        ],
      };
    }

    if (kind === 'transInfl') {
      const sub = rng.pick(['xexp', 'lnsq', 'gauss', 'trig'] as const);
      if (sub === 'xexp') {
        const k = rng.pick([1, 2, 3, 4]);
        const ex = k === 1 ? '-x' : `-x/${k}`;
        return {
          prompt: `Find the $x$-coordinates of all points of inflection of $f(x) = xe^{${ex}}$. Separate your answers with commas.`,
          parts: [part({ kind: 'numbers', values: [2 * k] }, { label: '$x =$' })],
          hints: concHints,
          solution: [
            k === 1 ? `$f'(x) = e^{-x} - xe^{-x} = e^{-x}(1 - x)$` : `$f'(x) = e^{${ex}} - \\dfrac{x}{${k}}e^{${ex}} = e^{${ex}}\\left(1 - \\dfrac{x}{${k}}\\right)$`,
            k === 1
              ? `$f''(x) = -e^{-x}(1 - x) - e^{-x} = e^{-x}(x - 2)$`
              : `$f''(x) = -\\dfrac{1}{${k}}e^{${ex}}\\left(1 - \\dfrac{x}{${k}}\\right) - \\dfrac{1}{${k}}e^{${ex}} = \\dfrac{1}{${k * k}}e^{${ex}}(x - ${2 * k})$`,
            `$e^{${ex}} > 0$, so $f''$ has the sign of $x - ${2 * k}$: it changes sign at $x = ${2 * k}$.`,
            `There is one point of inflection, at $x = ${2 * k}$.`,
          ],
          calculator: false,
        };
      }
      if (sub === 'lnsq') {
        const k = rng.pick([1, 2, 3, 4]);
        return {
          prompt: `Find the $x$-coordinates of all points of inflection of $f(x) = \\ln(x^2 + ${k * k})$. Separate your answers with commas.`,
          parts: [part({ kind: 'numbers', values: [-k, k] }, { label: '$x =$' })],
          hints: concHints,
          solution: [
            `$f'(x) = \\dfrac{2x}{x^2 + ${k * k}}$`,
            `$f''(x) = \\dfrac{2(x^2 + ${k * k}) - 2x(2x)}{(x^2 + ${k * k})^2} = \\dfrac{2(${k * k} - x^2)}{(x^2 + ${k * k})^2}$`,
            `The denominator is always positive, so $f''$ changes sign where $${k * k} - x^2 = 0$, at $x = \\pm ${k}$.`,
            `The points of inflection are at $x = ${-k}$ and $x = ${k}$.`,
          ],
        };
      }
      if (sub === 'gauss') {
        const k = rng.pick([1, 2, 3]);
        const den = 2 * k * k;
        const ex = `-x^2/${den}`;
        return {
          prompt: `Find the $x$-coordinates of all points of inflection of $f(x) = e^{${ex}}$, a bell-shaped curve. Separate your answers with commas.`,
          parts: [part({ kind: 'numbers', values: [-k, k] }, { label: '$x =$' })],
          hints: concHints,
          solution: [
            k === 1 ? `$f'(x) = -xe^{${ex}}$` : `$f'(x) = -\\dfrac{x}{${k * k}}e^{${ex}}$`,
            k === 1
              ? `$f''(x) = -e^{${ex}} + x^2e^{${ex}} = e^{${ex}}(x^2 - 1)$`
              : `$f''(x) = -\\dfrac{1}{${k * k}}e^{${ex}} + \\dfrac{x^2}{${k ** 4}}e^{${ex}} = \\dfrac{1}{${k ** 4}}e^{${ex}}(x^2 - ${k * k})$`,
            `$e^{${ex}} > 0$, so $f''$ changes sign where $x^2 = ${k * k}$.`,
            `The points of inflection are at $x = ${-k}$ and $x = ${k}$.`,
          ],
        };
      }
      const cfg = rng.pick([
        { tex: '\\sin x + \\cos x', fpp: '-\\sin x - \\cos x', eq: '\\tan x = -1', vals: [(3 * Math.PI) / 4, (7 * Math.PI) / 4], txt: ['\\frac{3\\pi}{4}', '\\frac{7\\pi}{4}'] },
        { tex: '\\sin x - \\cos x', fpp: '-\\sin x + \\cos x', eq: '\\tan x = 1', vals: [Math.PI / 4, (5 * Math.PI) / 4], txt: ['\\frac{\\pi}{4}', '\\frac{5\\pi}{4}'] },
        { tex: 'x + 2\\sin x', fpp: '-2\\sin x', eq: '\\sin x = 0', vals: [Math.PI], txt: ['\\pi'] },
        { tex: '\\sqrt{3}\\sin x + \\cos x', fpp: '-\\sqrt{3}\\sin x - \\cos x', eq: '\\tan x = -\\frac{1}{\\sqrt{3}}', vals: [(5 * Math.PI) / 6, (11 * Math.PI) / 6], txt: ['\\frac{5\\pi}{6}', '\\frac{11\\pi}{6}'] },
      ] as const);
      return {
        prompt: `Find the $x$-coordinates of all points of inflection of $f(x) = ${cfg.tex}$ for $0 < x < 2\\pi$. Give exact values, separated by commas.`,
        parts: [part({ kind: 'numbers', values: [...cfg.vals] }, { label: '$x =$' })],
        hints: concHints,
        solution: [
          `$f''(x) = ${cfg.fpp}$`,
          `$f''(x) = 0 \\Rightarrow ${cfg.eq}$, so $x = ${cfg.txt.join('$ or $x = ')}$ in $(0, 2\\pi)$.`,
          `$f''$ changes sign at each of these (each is a simple zero of a sine wave).`,
          `The points of inflection are at $x = ${cfg.txt.join('$ and $x = ')}$.`,
        ],
      };
    }

    // summary
    const sub = rng.pick(['quartic', 'cubic'] as const);
    if (sub === 'quartic') {
      const c = rng.pick([1, -1]);
      // f = x^4 - 4c x^3: f' = 4x^2(x - 3c), f'' = 12x(x - 2c)
      const f = (x: number) => x ** 4 - 4 * c * x ** 3;
      const m = 3 * c;
      const i2 = 2 * c;
      const [lo, hi] = [Math.min(0, i2), Math.max(0, i2)];
      const correct = `Local minimum at $(${m}, ${f(m)})$; points of inflection at $x = ${lo}$ and $x = ${hi}$; concave down on $${iv(lo, hi)}$`;
      const ans = mc(rng, correct, [
        `Local maximum at $(0, 0)$ and local minimum at $(${m}, ${f(m)})$; concave down on $${iv(lo, hi)}$`,
        `Local minimum at $(${m}, ${f(m)})$; points of inflection at $x = 0$ and $x = ${m}$; concave down on $${iv(Math.min(0, m), Math.max(0, m))}$`,
        `Local minimum at $(${m}, ${f(m)})$; one point of inflection, at $x = ${i2}$; concave down on $${c > 0 ? iv(null, i2) : iv(i2, null)}$`,
      ]);
      return {
        prompt: `Which summary correctly describes the graph of $f(x) = ${poly([[1, 'x^4'], [-4 * c, 'x^3']])}$?`,
        parts: [part(ans)],
        hints: ['Find and factor $f\'(x)$ and $f\'\'(x)$, then make sign charts for both.', 'A critical number where $f\'$ does not change sign is not a local extremum.'],
        solution: [
          `$f'(x) = ${poly([[4, 'x^3'], [-12 * c, 'x^2']])} = 4x^2(${xm(m)})$: zeros at $0$ and $${m}$. $f'$ has the sign of $x ${pm(-m)}$, so it changes sign only at $x = ${m}$ (from $-$ to $+$): a local minimum, $f(${m}) = ${f(m)}$. There is no extremum at $x = 0$.`,
          `$f''(x) = ${poly([[12, 'x^2'], [-24 * c, 'x']])} = 12x(${xm(i2)})$: zeros at $0$ and $${i2}$, with signs $+, -, +$.`,
          `So $f$ is concave up on $${cup(iv(null, lo), iv(hi, null))}$, concave down on $${iv(lo, hi)}$, with points of inflection at $x = ${lo}$ and $x = ${hi}$.`,
          `${correct}.`,
        ],
      };
    }
    const k = rng.pick([1, 2, 3]);
    const s = rng.pick([1, -1]);
    const D = rng.int(-4, 4);
    // f = s(x^3 - 3k^2 x) + D
    const f = (x: number) => s * (x ** 3 - 3 * k * k * x) + D;
    const [xMax, xMin] = s > 0 ? [-k, k] : [k, -k];
    const up = s > 0 ? iv(0, null) : iv(null, 0);
    const correct = `Local maximum at $(${xMax}, ${f(xMax)})$; local minimum at $(${xMin}, ${f(xMin)})$; point of inflection at $(0, ${D})$; concave up on $${up}$`;
    const ans = mc(rng, correct, [
      `Local maximum at $(${xMin}, ${f(xMin)})$; local minimum at $(${xMax}, ${f(xMax)})$; point of inflection at $(0, ${D})$; concave up on $${up}$`,
      `Local maximum at $(${xMax}, ${f(xMax)})$; local minimum at $(${xMin}, ${f(xMin)})$; point of inflection at $(0, ${D})$; concave up on $${s > 0 ? iv(null, 0) : iv(0, null)}$`,
      `Local maximum at $(${xMax}, ${f(xMax)})$; local minimum at $(${xMin}, ${f(xMin)})$; points of inflection at $x = \\pm ${k}$; concave up on $${up}$`,
    ]);
    return {
      prompt: `Which summary correctly describes the graph of $f(x) = ${cubicTex(s, 0, -3 * s * k * k, D)}$?`,
      parts: [part(ans)],
      hints: ['Use $f\'$ for the extrema and $f\'\'$ for the concavity and inflection point.', 'Critical numbers are zeros of $f\'$; possible points of inflection are zeros of $f\'\'$.'],
      solution: [
        `$f'(x) = ${quadTex(3 * s, 0, -3 * s * k * k)} = ${cf(3 * s)}(x + ${k})(x - ${k})$: zeros at $\\pm ${k}$.`,
        `$f''(x) = ${linTex(6 * s, 0)}$: $f''(${xMax}) ${s * xMax < 0 ? '< 0' : '> 0'}$ gives a local maximum at $x = ${xMax}$, $f''(${xMin}) > 0$ gives a local minimum at $x = ${xMin}$.`,
        `$f''$ changes sign at $x = 0$: concave up on $${up}$, with a point of inflection at $(0, ${D})$.`,
        `${correct}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.4 — Motion along a line
// ---------------------------------------------------------------------------

interface Motion {
  A: number;
  B: number;
  C: number;
  D: number;
  p: number;
  q: number;
}
/** s(t) = At^3 + Bt^2 + Ct + D with v(t) = 3A(t - p)(t - q), 0 < p < q. */
function motionCubic(rng: Rng, maxQ = 6): Motion {
  return retry(
    () => {
      const A = rng.pick([1, 1, 2]);
      const p = rng.int(1, maxQ - 1);
      const q = rng.int(p + 1, maxQ);
      return { A, p, q, B: (-3 * A * (p + q)) / 2, C: 3 * A * p * q, D: rng.int(-5, 8) };
    },
    (m) => Number.isInteger(m.B),
    200,
  );
}
const sFn = (m: Motion) => (t: number) => m.A * t ** 3 + m.B * t * t + m.C * t + m.D;
const vFn = (m: Motion) => (t: number) => 3 * m.A * t * t + 2 * m.B * t + m.C;
const aFn = (m: Motion) => (t: number) => 6 * m.A * t + 2 * m.B;
const sTex = (m: Motion) => cubicTex(m.A, m.B, m.C, m.D, 't');
const vTex = (m: Motion) => quadTex(3 * m.A, 2 * m.B, m.C, 't');
const aTex = (m: Motion) => linTex(6 * m.A, 2 * m.B, 't');

/** Contexts for s(t); positions can be negative, so each one says which way is positive. */
const MOVERS: Array<{ text: string; u: 'm' | 'cm' }> = [
  { text: 'A particle moves along a horizontal line. Its position, in metres to the right of the origin, after $t$ seconds is', u: 'm' },
  { text: 'A particle moves along a vertical line. Its position, in metres above the origin (negative values are below it), after $t$ seconds is', u: 'm' },
  { text: 'A bead slides along a straight wire. Its position, in centimetres to the right of a fixed point $O$, after $t$ seconds is', u: 'cm' },
  { text: 'A toy train runs back and forth on a straight track. Its position, in centimetres east of the station (negative values are west of it), after $t$ seconds is', u: 'cm' },
  { text: 'A cart rolls back and forth on a straight track in a physics lab. Its position, in centimetres to the right of a marker on the track, after $t$ seconds is', u: 'cm' },
];

const motion = skill({
  id: 'm31-motion',
  name: 'Motion along a line',
  description: 'Find velocity and acceleration from position, find when an object is at rest or moving in the positive direction, decide whether it is speeding up or slowing down, and find the total distance travelled.',
  outcomes: ['DA4'],
  lessonId: 'm31-6-4',
  calculator: false,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['velAt', 'accAt', 'ballVel'] as const)
        : d === 2
          ? rng.pick(['rest', 'positive', 'ballMax', 'speedAt'] as const)
          : rng.pick(['distance', 'distance', 'speedIntervals', 'impact'] as const);
    const { text: mover, u } = rng.pick(MOVERS);
    const vaHints = ['Velocity is the derivative of position: $v(t) = s\'(t)$. Acceleration is the derivative of velocity: $a(t) = v\'(t) = s\'\'(t)$.'];

    if (kind === 'velAt' || kind === 'accAt') {
      const m = motionCubic(rng, 7);
      const t0 = rng.int(0, 6);
      if (kind === 'velAt') {
        const v = vFn(m)(t0);
        return {
          prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. Find the velocity at $t = ${t0}$ s.`,
          parts: [numPart(v, { suffix: `${u}/s`, label: `$v(${t0}) =$` })],
          hints: [...vaHints, `Differentiate $s(t)$, then substitute $t = ${t0}$.`],
          solution: [`$v(t) = s'(t) = ${vTex(m)}$`, `$v(${t0}) = ${subst([[3 * m.A, 2], [2 * m.B, 1], [m.C, 0]], t0)} = ${v}$`, `The velocity at $t = ${t0}$ s is $${v}$ ${u}/s.`],
        };
      }
      const a = aFn(m)(t0);
      return {
        prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. Find the acceleration at $t = ${t0}$ s.`,
        parts: [numPart(a, { suffix: `${u}/s²`, label: `$a(${t0}) =$` })],
        hints: [...vaHints, 'Differentiate twice, then substitute.'],
        solution: [`$v(t) = s'(t) = ${vTex(m)}$`, `$a(t) = v'(t) = ${aTex(m)}$`, `$a(${t0}) = ${subst([[6 * m.A, 1], [2 * m.B, 0]], t0)} = ${a}$`, `The acceleration at $t = ${t0}$ s is $${a}$ ${u}/s².`],
      };
    }

    if (kind === 'ballVel') {
      const { v0, h0, t0 } = retry(
        () => ({ v0: rng.pick([14.7, 19.6, 24.5, 15, 20, 12]), h0: rng.pick([0, 1.5, 2]), t0: rng.pick([0.5, 1, 1.5, 2, 2.5, 3]) }),
        (o) => o.h0 + o.v0 * o.t0 - 4.9 * o.t0 * o.t0 > 0.5,
      );
      const v = v0 - 9.8 * t0;
      const name = rng.pick(NAMES);
      const hT = `${h0 ? `${dec(h0)} + ` : ''}${dec(v0)}t - 4.9t^2`;
      return {
        prompt: `${name} throws a ball straight up. Its height, in metres, after $t$ seconds is $h(t) = ${hT}$. Find the velocity of the ball at $t = ${dec(t0)}$ s.`,
        parts: [numPart(v, { suffix: 'm/s', display: 'decimal' })],
        hints: [vaHints[0], 'A negative velocity means the ball is moving down.'],
        solution: [`$v(t) = h'(t) = ${dec(v0)} - 9.8t$`, `$v(${dec(t0)}) = ${dec(v0)} - 9.8(${dec(t0)}) = ${dec(v)}$`, `The velocity is $${dec(v)}$ m/s${v < 0 ? ' (the ball is falling)' : v > 0 ? ' (the ball is rising)' : ' (the ball is at its highest point)'}.`],
      };
    }

    if (kind === 'rest') {
      const m = motionCubic(rng);
      return {
        prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. At what times is the object at rest? Separate your answers with commas.`,
        parts: [part({ kind: 'numbers', values: [m.p, m.q] }, { label: '$t =$', suffix: 's' })],
        hints: ['An object is at rest when its velocity is $0$.', 'Set $v(t) = s\'(t) = 0$ and factor.'],
        solution: [`$v(t) = ${vTex(m)} = ${factored2(3 * m.A, m.p, m.q, 't')}$`, `$v(t) = 0$ when $t = ${m.p}$ or $t = ${m.q}$.`, `The object is at rest at $t = ${m.p}$ s and $t = ${m.q}$ s.`],
      };
    }

    if (kind === 'positive') {
      const m = motionCubic(rng);
      const h = (m.p + m.q) / 2;
      const correct = cup(iv(0, m.p, true), iv(m.q, null));
      const ans = mc(rng, `$${correct}$`, [`$${iv(m.p, m.q)}$`, `$${iv(h, null)}$`, `$${iv(0, h, true)}$`]);
      const { steps } = signSteps(vFn(m), [m.p, m.q], 'v', 'moving in the positive direction', 'moving in the negative direction');
      return {
        prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. During which time interval(s) is the object moving in the positive direction?`,
        parts: [part(ans)],
        hints: ['The object moves in the positive direction when $v(t) > 0$.', 'Find when $v(t) = 0$, then test the sign of $v$ on each interval (remember $t \\ge 0$).'],
        solution: [`$v(t) = ${vTex(m)} = ${factored2(3 * m.A, m.p, m.q, 't')}$, which is $0$ at $t = ${m.p}$ and $t = ${m.q}$.`, ...steps.map((s) => s.replace(/\$f\$ is /, 'the object is ').replace(/\(-\\infty, /, '[0, ')), `The object moves in the positive direction on $${correct}$.`],
      };
    }

    if (kind === 'ballMax') {
      const launch = rng.pick([
        { text: 'A soccer ball is kicked straight up', ks: [1, 1.5, 2], h0s: [0, 0.5, 1] },
        { text: 'A model rocket is launched straight up from a platform', ks: [2, 2.5, 3], h0s: [1, 1.5, 2] },
        { text: 'A volleyball is bumped straight up', ks: [1, 1.5], h0s: [1, 1.5, 2] },
        { text: 'A stone is thrown straight up from the edge of a coulee', ks: [1, 1.5, 2], h0s: [5, 12, 20] },
      ]);
      const ctx = launch.text;
      const k = rng.pick(launch.ks);
      const v0 = 9.8 * k;
      const h0 = rng.pick(launch.h0s);
      const hmax = h0 + 4.9 * k * k;
      return {
        prompt: `${ctx}. Its height, in metres, after $t$ seconds is $h(t) = ${h0 ? `${dec(h0)} + ` : ''}${dec(v0)}t - 4.9t^2$. Find the time at which it reaches its maximum height, and the maximum height to the nearest tenth of a metre.`,
        parts: [numPart(k, { label: 'Time', suffix: 's', display: 'decimal' }), numPart(hmax, { label: 'Maximum height', suffix: 'm', decimals: 1 })],
        hints: ['At the highest point, the velocity is $0$ (the object stops rising and starts falling).', 'Solve $h\'(t) = 0$, then evaluate $h$ at that time.'],
        solution: [
          `$v(t) = h'(t) = ${dec(v0)} - 9.8t$`,
          `$v(t) = 0 \\Rightarrow t = \\dfrac{${dec(v0)}}{9.8} = ${dec(k)}$ s. Since $h''(t) = -9.8 < 0$, this is a maximum.`,
          `$h(${dec(k)}) = ${h0 ? `${dec(h0)} + ` : ''}${dec(v0)}(${dec(k)}) - 4.9(${dec(k)})^2 = ${dec(hmax)}$`,
          `It reaches its maximum height of $${dec(hmax)}${Math.abs(hmax * 10 - Math.round(hmax * 10)) < 1e-9 ? '' : ` \\approx ${fmtFixed(hmax, 1)}`}$ m at $t = ${dec(k)}$ s.`,
        ],
        calculator: true,
      };
    }

    if (kind === 'speedAt') {
      const m = motionCubic(rng);
      const h = (m.p + m.q) / 2;
      const t0 = retry(() => rng.int(0, m.q + 2), (t) => t !== m.p && t !== m.q && t !== h);
      const v = vFn(m)(t0);
      const a = aFn(m)(t0);
      const up = v * a > 0;
      return {
        prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. At $t = ${t0}$ s, is the object speeding up or slowing down?`,
        parts: [part(fixedChoice(['Speeding up', 'Slowing down'], up ? 0 : 1))],
        hints: ['Find $v(t)$ and $a(t)$ at that time.', 'The object speeds up when $v$ and $a$ have the same sign, and slows down when they have opposite signs.'],
        solution: [
          `$v(t) = ${vTex(m)}$, so $v(${t0}) = ${v}$.`,
          `$a(t) = ${aTex(m)}$, so $a(${t0}) = ${a}$.`,
          `$v$ and $a$ have ${up ? 'the same sign' : 'opposite signs'}, so the speed $|v|$ is ${up ? 'increasing' : 'decreasing'}.`,
          `The object is ${up ? 'speeding up' : 'slowing down'} at $t = ${t0}$ s.`,
        ],
      };
    }

    // ---------------- difficulty 3 ----------------
    if (kind === 'distance') {
      const m = motionCubic(rng, 5);
      const s = sFn(m);
      const T = rng.chance(0.7) ? rng.int(m.q + 1, m.q + 2) : retry(() => rng.int(m.p + 1, m.q), (t) => t > m.p);
      const turns = [m.p, m.q].filter((t) => t < T);
      const marks = [0, ...turns, T];
      const legs = marks.slice(1).map((t, i) => Math.abs(s(t) - s(marks[i])));
      const total = legs.reduce((u, w) => u + w, 0);
      const disp = s(T) - s(0);
      return {
        prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. For the interval $0 \\le t \\le ${T}$, find the displacement and the total distance travelled.`,
        parts: [numPart(disp, { label: 'Displacement', suffix: u }), numPart(total, { label: 'Total distance', suffix: u })],
        hints: ['Displacement is $s(\\text{end}) - s(\\text{start})$. Total distance adds the length of every leg, so you need the times where the object turns around ($v = 0$).', 'Find where $v(t) = 0$ inside the interval, then add $|s(t_{k+1}) - s(t_k)|$ for each leg.'],
        solution: [
          `$v(t) = ${vTex(m)} = ${factored2(3 * m.A, m.p, m.q, 't')}$, so the object turns around at $t = ${turns.join('$ and $t = ')}$ (where $v$ changes sign).`,
          `Positions: ${marks.map((t) => `$s(${t}) = ${s(t)}$`).join(', ')}.`,
          `Displacement $= s(${T}) - s(0) = ${s(T)} - ${par(s(0))} = ${disp}$ ${u}`,
          `Total distance $= ${marks.slice(1).map((t, i) => `|${s(t)} - ${par(s(marks[i]))}|`).join(' + ')} = ${legs.join(' + ')} = ${total}$ ${u}`,
          `The displacement is $${disp}$ ${u} and the total distance travelled is $${total}$ ${u}.`,
        ],
      };
    }

    if (kind === 'speedIntervals') {
      const m = retry(() => motionCubic(rng), (x) => x.q - x.p >= 2);
      const h = (m.p + m.q) / 2;
      const askUp = rng.chance(0.6);
      const upSet = cup(iv(m.p, h), iv(m.q, null));
      const downSet = cup(iv(0, m.p, true), iv(h, m.q));
      const correct = askUp ? upSet : downSet;
      const ans = mc(rng, `$${correct}$`, [`$${askUp ? downSet : upSet}$`, `$${askUp ? iv(h, null) : iv(0, h, true)}$`, `$${askUp ? cup(iv(0, m.p, true), iv(m.q, null)) : iv(m.p, m.q)}$`]);
      return {
        prompt: `${mover} $s(t) = ${sTex(m)}$, for $t \\ge 0$. During which time interval(s) is the object ${askUp ? 'speeding up' : 'slowing down'}?`,
        parts: [part(ans)],
        hints: ['An object speeds up when $v(t)$ and $a(t)$ have the same sign, and slows down when they have opposite signs.', 'Make one sign chart for $v$ and one for $a$ on $t \\ge 0$, then compare them interval by interval.'],
        solution: [
          `$v(t) = ${factored2(3 * m.A, m.p, m.q, 't')}$: $v > 0$ on $${cup(iv(0, m.p, true), iv(m.q, null))}$ and $v < 0$ on $${iv(m.p, m.q)}$.`,
          `$a(t) = ${aTex(m)} = ${cf(6 * m.A)}${fac(h, 't')}$: $a < 0$ on $${iv(0, h, true)}$ and $a > 0$ on $${iv(h, null)}$.`,
          `Same signs (speeding up): $${upSet}$. Opposite signs (slowing down): $${downSet}$.`,
          `The object is ${askUp ? 'speeding up' : 'slowing down'} on $${correct}$.`,
        ],
      };
    }

    // impact
    const { v0, h0 } = retry(
      () => ({ v0: rng.pick([0, 5, 8, 10, 12, 15]), h0: rng.pick([20, 25, 30, 40, 45, 60, 80]) }),
      (o) => {
        const disc = Math.sqrt(o.v0 * o.v0 + 19.6 * o.h0);
        return safeRound(disc, 1) && safeRound((o.v0 + disc) / 9.8, 2);
      },
    );
    const disc = Math.sqrt(v0 * v0 + 19.6 * h0);
    const tHit = (v0 + disc) / 9.8;
    const vHit = v0 - 9.8 * tHit;
    const place = rng.pick(['the top of a cliff above a river', 'a balcony of a city apartment building', 'a bridge over a wide river', 'the top of a ski jump tower']);
    return {
      prompt: `A stone is ${v0 ? 'thrown straight up' : 'dropped'} from ${place}. Its height above the ground, in metres, after $t$ seconds is $h(t) = ${h0}${v0 ? ` + ${v0}t` : ''} - 4.9t^2$. When does the stone hit the ground, and what is its velocity at impact? Round the time to the nearest hundredth and the velocity to the nearest tenth.`,
      parts: [numPart(tHit, { label: 'Time', suffix: 's', decimals: 2 }), numPart(vHit, { label: 'Velocity', suffix: 'm/s', decimals: 1 })],
      hints: ['The stone hits the ground when $h(t) = 0$. Use the quadratic formula and keep the positive root.', 'Then substitute that time into $v(t) = h\'(t)$. The velocity is negative because the stone is moving down.'],
      solution: [
        `$-4.9t^2${v0 ? ` + ${v0}t` : ''} + ${h0} = 0 \\Rightarrow t = \\dfrac{${v0 ? `-${v0}` : '0'} - \\sqrt{${v0 * v0} + 4(4.9)(${h0})}}{2(-4.9)} = \\dfrac{${v0 ? `${v0} + ` : ''}\\sqrt{${dec(v0 * v0 + 19.6 * h0)}}}{9.8} \\approx ${fmtFixed(tHit, 2)}$ s (the other root is not positive).`,
        `$v(t) = h'(t) = ${v0 ? `${v0} - ` : '-'}9.8t$`,
        `$v(${fmtFixed(tHit, 2)}) \\approx ${fmtFixed(vHit, 1)}$ m/s (exactly $-\\sqrt{${dec(v0 * v0 + 19.6 * h0)}}$).`,
        `The stone hits the ground after about $${fmtFixed(tHit, 2)}$ s, moving at about $${fmtFixed(vHit, 1)}$ m/s (downward).`,
      ],
      calculator: true,
    };
  },
});

export const APPLICATIONS_SKILLS: SkillDef[] = [tangentLine, extrema, concavity, motion];
