/** Math 31 Unit 8 — Antiderivatives and Integrals: antiderivatives, Riemann sums, the fundamental theorem and substitution (I1, I2, I3). */
import { fixedChoice, mc, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fracLatex, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, GridSpec, Part, PlaneFigure, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers (also used by integralapps.ts)
// ---------------------------------------------------------------------------

/** LaTeX for a rational number: integers plainly, other values as fractions when they are simple. */
export function tn(x: number, dfrac = false): string {
  const f = toFrac(x, 1000);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}

/** A rational number as a student types it: 3, -2, 3/4. */
export function txn(x: number): string {
  const f = toFrac(x, 1000);
  if (!f) return fmt(x, 6);
  return f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`;
}

/** Coefficient in front of a body (LaTeX): '' for 1 and '-' for -1. */
export function cf(c: number): string {
  return c === 1 ? '' : c === -1 ? '-' : tn(c);
}

/** Coefficient in front of a body (typed): '' for 1, '-' for -1, (2/3) or -(2/3) for fractions. */
export function cft(c: number): string {
  if (c === 1) return '';
  if (c === -1) return '-';
  const f = toFrac(c, 1000);
  if (!f || f.d === 1) return txn(c);
  return `${c < 0 ? '-' : ''}(${Math.abs(f.n)}/${f.d})`;
}

/** A coefficient written as a product with what follows: '' for 1, '-' for -1, '3 \\cdot ' otherwise. */
export function cdot(c: number): string {
  return c === 1 ? '' : c === -1 ? '-' : `${tn(c)} \\cdot `;
}

/** c times a bracket: the bracket alone when c = 1. */
export function scaled(c: number, inner: string): string {
  return c === 1 ? inner : `${c === -1 ? '-' : tn(c)}\\left(${inner}\\right)`;
}

/** Joins signed terms: ['3x', '-2', '5'] gives '3x - 2 + 5'. Empty and '0' terms are skipped. */
export function joinTerms(ts: string[]): string {
  const out = ts.filter((t) => t !== '' && t !== '0');
  if (!out.length) return '0';
  return out.map((t, i) => (i === 0 ? t : t.startsWith('-') ? `- ${t.slice(1)}` : `+ ${t}`)).join(' ');
}

/** A number ready to substitute: in brackets when negative or a fraction. */
export function par(x: number): string {
  const s = tn(x);
  return x < 0 || !Number.isInteger(x) ? `\\left(${s}\\right)` : s;
}

/** '+ 3' or '- 3' (LaTeX) to append a constant; '' for 0. */
export function pm(c: number): string {
  if (Math.abs(c) < 1e-12) return '';
  return c < 0 ? `- ${tn(-c)}` : `+ ${tn(c)}`;
}

/** An exponent as text: 3, -2, 3/2. */
export function expTex(m: number): string {
  const f = toFrac(m, 100)!;
  return f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`;
}

/** True when the LaTeX has a top-level + or - (so it needs brackets after an integral sign). */
export function isSum(s: string): boolean {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(' || c === '{' || c === '[') depth++;
    else if (c === ')' || c === '}' || c === ']') depth--;
    else if (i > 0 && depth === 0 && (c === '+' || c === '-') && s[i - 1] === ' ') return true;
  }
  return false;
}

/** Brackets around a sum, for writing it after an integral sign. */
export const wrap = (s: string): string => (isSum(s) ? `\\left(${s}\\right)` : s);

/** Snap a float to a nearby simple fraction (removes rounding noise from exact computations). */
export function snap(v: number): number {
  const f = toFrac(v, 1000);
  return f ? f.n / f.d : v;
}

/** Display a decimal value (sample heights, sums) with at most four decimal places. */
const dec = (v: number) => fmt(v, 4);
/** True when a value needs more than `dp` decimal places. */
const isRounded = (v: number, dp = 4) => Math.abs(v * 10 ** dp - Math.round(v * 10 ** dp)) > 1e-6;

export interface Val {
  part: Part;
  /** Text to add to the prompt (how to give the answer), with a leading space, or ''. */
  note: string;
  /** LaTeX of the answer for the last solution step: exact form, and the rounded decimal when it is not exact. */
  show: string;
}

/**
 * A numeric answer. A value that terminates within two decimal places must be given exactly; any other
 * value may be given exactly (a fraction, a multiple of pi, ln 2 ...) or rounded to the nearest hundredth.
 */
export function valuePart(v0: number, o: { tex?: string; exact?: string; fns?: boolean; label?: string; suffix?: string; display?: 'fraction' | 'decimal'; note?: string } = {}): Val {
  const v = snap(v0);
  const tex = o.tex ?? tn(v);
  const clean = Math.abs(v * 100 - Math.round(v * 100)) < 1e-9;
  const base = { ...(o.display && { display: o.display }) };
  if (clean) {
    const answer: AnswerSpec = { kind: 'numeric', value: v, allowExpression: true, ...base };
    return { part: { label: o.label, suffix: o.suffix, answer }, note: '', show: tex };
  }
  const answer: AnswerSpec = {
    kind: 'numeric',
    value: v,
    tolerance: Math.max(0.006, Math.abs(v) * 0.002),
    allowExpression: true,
    ...base,
    ...(o.fns && { allowFunctions: true }),
    ...(o.exact && { exact: o.exact }),
  };
  return { part: { label: o.label, suffix: o.suffix, answer }, note: o.note ?? ' Give the exact value or round to the nearest hundredth.', show: `${tex} \\approx ${fmtFixed(v, 2)}` };
}

// ---------------------------------------------------------------------------
// Powers and terms
// ---------------------------------------------------------------------------

function powBody(m: number, v: string): string {
  if (m === 1) return v;
  if (m === 0.5) return `\\sqrt{${v}}`;
  return Number.isInteger(m) ? `${v}^{${m}}` : `${v}^{${expTex(m)}}`;
}

/** c·x^n as it is usually written in an integrand: 3\\sqrt{x}, \\dfrac{4}{x^{3}}, 2x\\sqrt{x}. */
export function powIntegrandTex(c: number, n: number, v = 'x'): string {
  if (n === 0) return tn(c);
  if (n > 0) {
    let body = powBody(n, v);
    if (n === 1.5) body = `${v}\\sqrt{${v}}`;
    else if (Math.abs(n - 1 / 3) < 1e-9) body = `\\sqrt[3]{${v}}`;
    else if (Math.abs(n - 2 / 3) < 1e-9) body = `\\sqrt[3]{${v}^{2}}`;
    return `${cf(c)}${body}`;
  }
  return `${c < 0 ? '-' : ''}\\dfrac{${tn(Math.abs(c))}}{${powBody(-n, v)}}`;
}

/** k·x^m in LaTeX the way a textbook writes an answer: \\frac{2}{3}x^{3/2}, 2\\sqrt{x}, -\\dfrac{2}{x^{2}}. */
export function powTex(k: number, m: number, v = 'x'): string {
  if (m === 0) return tn(k);
  if (m > 0) return `${cf(k)}${powBody(m, v)}`;
  const f = toFrac(Math.abs(k), 1000)!;
  return `${k < 0 ? '-' : ''}\\dfrac{${f.n}}{${f.d === 1 ? '' : f.d}${powBody(-m, v)}}`;
}

/** k·x^m as a student types it: (2/3)x^(3/2), 2sqrt(x), -2/x^2, 1/(2x^2). */
export function powTxt(k: number, m: number, v = 'x'): string {
  if (m === 0) return txn(k);
  const body = (p: number) => (p === 1 ? v : p === 0.5 ? `sqrt(${v})` : Number.isInteger(p) ? `${v}^${p}` : `${v}^(${expTex(p)})`);
  if (m > 0) return `${cft(k)}${body(m)}`;
  const f = toFrac(Math.abs(k), 1000)!;
  const den = f.d === 1 ? body(-m) : `(${f.d}${body(-m)})`;
  return `${k < 0 ? '-' : ''}${f.n}/${den}`;
}

/** A polynomial from [coefficient, power] pairs (LaTeX). */
export function polyTex(terms: Array<[number, number]>, v = 'x'): string {
  return joinTerms(terms.map(([c, n]) => (c === 0 ? '' : powTex(c, n, v))));
}

/** A polynomial from [coefficient, power] pairs (typed). */
export function polyTxt(terms: Array<[number, number]>, v = 'x'): string {
  return joinTerms(terms.map(([c, n]) => (c === 0 ? '' : powTxt(c, n, v))));
}

/** One term of an integrand with its antiderivative. */
export interface Term {
  /** Integrand term (LaTeX, with a leading '-' when negative). */
  tex: string;
  /** Antiderivative (LaTeX). */
  F: string;
  /** Antiderivative as typed. */
  Ft: string;
  f: (x: number) => number;
  Fv: (x: number) => number;
  /** The rule applied (LaTeX). */
  why: string;
  /** For power terms: the antiderivative's coefficient and power. */
  k?: number;
  m?: number;
}

/** c·x^n with n ≠ -1. */
export function powTerm(c: number, n: number, v = 'x'): Term {
  const m = n + 1;
  const k = c / m;
  const tex = powIntegrandTex(c, n, v);
  const F = powTex(k, m, v);
  const dv = `\\,d${v}`;
  let why: string;
  if (n === 0) why = `\\int ${tex}${dv} = ${F}`;
  else if (Number.isInteger(n) && n > 0) why = `\\int ${tex}${dv} = ${cdot(c)}\\dfrac{${v}^{${m}}}{${m}} = ${F}`;
  else why = `\\int ${tex}${dv} = \\int ${cf(c)}${v}^{${expTex(n)}}${dv} = ${cdot(c)}\\dfrac{${v}^{${expTex(m)}}}{${expTex(m)}} = ${F}`;
  return { tex, F, Ft: powTxt(k, m, v), f: (x) => c * x ** n, Fv: (x) => k * x ** m, why, k, m };
}

export function cosTerm(c: number): Term {
  return { tex: `${cf(c)}\\cos x`, F: `${cf(c)}\\sin x`, Ft: `${cft(c)}sin(x)`, f: (x) => c * Math.cos(x), Fv: (x) => c * Math.sin(x), why: `\\int ${cf(c)}\\cos x\\,dx = ${cf(c)}\\sin x` };
}
export function sinTerm(c: number): Term {
  return { tex: `${cf(c)}\\sin x`, F: `${cf(-c)}\\cos x`, Ft: `${cft(-c)}cos(x)`, f: (x) => c * Math.sin(x), Fv: (x) => -c * Math.cos(x), why: `\\int ${cf(c)}\\sin x\\,dx = ${cdot(c)}(-\\cos x) = ${cf(-c)}\\cos x` };
}
export function sec2Term(c: number): Term {
  return { tex: `${cf(c)}\\sec^2 x`, F: `${cf(c)}\\tan x`, Ft: `${cft(c)}tan(x)`, f: (x) => c / Math.cos(x) ** 2, Fv: (x) => c * Math.tan(x), why: `\\int ${cf(c)}\\sec^2 x\\,dx = ${cf(c)}\\tan x` };
}
export function expTerm(c: number): Term {
  return { tex: `${cf(c)}e^{x}`, F: `${cf(c)}e^{x}`, Ft: `${cft(c)}e^x`, f: (x) => c * Math.exp(x), Fv: (x) => c * Math.exp(x), why: `\\int ${cf(c)}e^{x}\\,dx = ${cf(c)}e^{x}` };
}
export function recipTerm(c: number): Term {
  const tex = c < 0 ? `-\\dfrac{${tn(-c)}}{x}` : `\\dfrac{${tn(c)}}{x}`;
  return { tex, F: `${cf(c)}\\ln x`, Ft: `${cft(c)}ln(x)`, f: (x) => c / x, Fv: (x) => c * Math.log(x), why: `\\int ${tex}\\,dx = ${cf(c)}\\ln x` };
}

type TransKind = 'cos' | 'sin' | 'sec2' | 'exp' | 'recip';
function transTerm(kind: TransKind, c: number): Term {
  return { cos: cosTerm, sin: sinTerm, sec2: sec2Term, exp: expTerm, recip: recipTerm }[kind](c);
}

// ---------------------------------------------------------------------------
// Figures (also used by integralapps.ts)
// ---------------------------------------------------------------------------

export type Pt = [number, number];
export const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;

function niceStep(r: number): number {
  return r <= 1.5 ? 0.25 : r <= 3 ? 0.5 : r <= 12 ? 1 : r <= 24 ? 2 : r <= 60 ? 5 : r <= 120 ? 10 : r <= 240 ? 20 : 50;
}

/**
 * A grid around [x0, x1] × [y0, y1] with tidy steps. Equal steps draw square cells, so when the box
 * would be too tall or too flat for that, the y step is changed to draw an ordinary rectangle.
 */
export function niceGrid(x0: number, x1: number, y0: number, y1: number, xStep?: number): GridSpec {
  const xs = xStep ?? niceStep(x1 - x0);
  let ys = niceStep(y1 - y0);
  const xMin = r3(Math.floor(x0 / xs + 1e-9) * xs);
  const xMax = r3(Math.ceil(x1 / xs - 1e-9) * xs);
  const fit = () => [r3(Math.floor(y0 / ys + 1e-9) * ys), r3(Math.ceil(y1 / ys - 1e-9) * ys)];
  let [yMin, yMax] = fit();
  if (xs === ys) {
    const ratio = (yMax - yMin) / (xMax - xMin);
    if (ratio > 1.3 || ratio < 0.45 || (xMax - xMin) / xs > 24 || (yMax - yMin) / ys > 24) {
      ys = ratio > 1 ? ys * 2 : ys / 2;
      [yMin, yMax] = fit();
    }
  }
  return { xMin, xMax, yMin, yMax, xStep: xs, yStep: ys };
}

/** The plot area in pixels, as the plane figure draws it (380 px wide). */
export function plotBox(g: GridSpec): { w: number; h: number } {
  const xs = g.xStep ?? g.step ?? 1;
  const ys = g.yStep ?? g.step ?? 1;
  const xr = g.xMax - g.xMin;
  const yr = g.yMax - g.yMin;
  const w = 380 - (g.yLabel ? 52 : 26) - 14;
  const square = xs === ys && xr / xs <= 24 && yr / ys <= 24;
  return { w, h: square ? (w * yr) / xr : Math.min(w * 0.72, 300) };
}

/** The graph of y = f(x) for x0 ≤ x ≤ x1, split where it leaves the grid's y-range or its domain. */
export function curve(f: (x: number) => number, x0: number, x1: number, g: GridSpec, n = 120): Pt[][] {
  const out: Pt[][] = [];
  const ok = (y: number) => Number.isFinite(y) && y >= g.yMin && y <= g.yMax;
  const edge = (xi: number, xo: number): Pt => {
    let lo = xi;
    let hi = xo;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (ok(f(mid))) lo = mid;
      else hi = mid;
    }
    return [r3(lo), r3(f(lo))];
  };
  let cur: Pt[] = [];
  let px = x0;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = f(x);
    if (ok(y)) {
      if (!cur.length && i > 0) {
        const e = edge(x, px);
        if (Math.abs(e[0] - x) > 1e-6) cur.push(e);
      }
      cur.push([r3(x), r3(y)]);
    } else if (cur.length) {
      cur.push(edge(px, x));
      if (cur.length > 1) out.push(cur);
      cur = [];
    }
    px = x;
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

/**
 * Hatching of the region a < x < b, lo(x) < y < hi(x): parallel lines at 45° on screen (`dir` 1 rising,
 * -1 falling), `gap` pixels apart, kept a few pixels clear of the boundary.
 */
export function hatch(lo: (x: number) => number, hi: (x: number) => number, a: number, b: number, g: GridSpec, dir: 1 | -1 = 1, gap = 11): PlaneSegment[] {
  return hatchWhere((x, y, padX, padY) => x > a + padX && x < b - padX && y > Math.max(lo(x), g.yMin) + padY && y < Math.min(hi(x), g.yMax) - padY, a, b, g, dir, gap);
}

/**
 * Hatching of any region a < x < b given by a test `inside(x, y, padX, padY)`; padX and padY are the
 * data distances of a few pixels, for keeping the lines clear of the boundary.
 */
export function hatchWhere(test: (x: number, y: number, padX: number, padY: number) => boolean, a: number, b: number, g: GridSpec, dir: 1 | -1 = 1, gap = 11): PlaneSegment[] {
  const { w, h } = plotBox(g);
  const sx = w / (g.xMax - g.xMin);
  const sy = h / (g.yMax - g.yMin);
  const padX = 2.5 / sx;
  const padY = 3 / sy;
  const inside = (x: number, y: number) => test(x, y, padX, padY);
  const segs: PlaneSegment[] = [];
  const spacing = gap * Math.SQRT2;
  const [t0, t1] = dir === 1 ? [-w, h] : [0, w + h];
  const N = 240;
  for (let t = t0 + spacing / 2; t < t1; t += spacing) {
    const yAt = (x: number) => g.yMin + (dir * (x - g.xMin) * sx + t) / sy;
    const ok = (x: number) => inside(x, yAt(x));
    const edge = (bad: number, good: number) => {
      let p = bad;
      let q = good;
      for (let i = 0; i < 30; i++) {
        const mid = (p + q) / 2;
        if (ok(mid)) q = mid;
        else p = mid;
      }
      return q;
    };
    let start: number | null = null;
    let prev = a;
    let prevOk = false;
    const push = (s: number, e: number) => {
      if (Math.hypot((e - s) * sx, (yAt(e) - yAt(s)) * sy) > 4) segs.push({ from: [r3(s), r3(yAt(s))], to: [r3(e), r3(yAt(e))], color: 'muted' });
    };
    for (let i = 0; i <= N; i++) {
      const x = a + ((b - a) * i) / N;
      const cur = ok(x);
      if (cur && !prevOk) start = i === 0 ? x : edge(prev, x);
      if (!cur && prevOk && start !== null) {
        push(start, edge(x, prev));
        start = null;
      }
      prevOk = cur;
      prev = x;
    }
    if (prevOk && start !== null) push(start, b);
  }
  return segs;
}

/** Polylines (with a colour) from curve pieces. */
export const lines = (pieces: Pt[][], color: 'brand' | 'accent' | 'muted' = 'brand') => pieces.map((points) => ({ points, color }));

/** Largest and smallest values of f on [a, b] (sampled). */
export function range(f: (x: number) => number, a: number, b: number): [number, number] {
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i <= 200; i++) {
    const y = f(a + ((b - a) * i) / 200);
    if (!Number.isFinite(y)) continue;
    lo = Math.min(lo, y);
    hi = Math.max(hi, y);
  }
  return [lo, hi];
}

/** Simpson's rule (for checking exact answers while writing generators). */
export function simpson(f: (x: number) => number, a: number, b: number, n = 2000): number {
  const hh = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * hh) * (i % 2 ? 4 : 2);
  return (s * hh) / 3;
}

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];

// ---------------------------------------------------------------------------
// 8.1 — Antiderivatives
// ---------------------------------------------------------------------------

const C_NOTE = 'Type the antiderivative with $C = 0$ (the box adds the $+ C$).';
const POWER_RULE = 'Power rule: $\\displaystyle\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ for $n \\ne -1$. Raise the power by 1 and divide by the new power.';
const BASIC_RULES = 'Basic antiderivatives: $\\int \\cos x\\,dx = \\sin x$, $\\int \\sin x\\,dx = -\\cos x$, $\\int \\sec^2 x\\,dx = \\tan x$, $\\int e^x\\,dx = e^x$ and $\\int \\frac{1}{x}\\,dx = \\ln x$ for $x > 0$ (each $+ C$).';

/** A free-response antiderivative item: the student types F(x) with C = 0. */
function antiItem(integrand: string, terms: Term[], o: { domain?: string; rewrite?: string; hints: string[] }): GenOutput {
  const F = joinTerms(terms.map((t) => t.F));
  const Ft = joinTerms(terms.map((t) => t.Ft));
  const steps: string[] = [];
  if (o.rewrite) steps.push(`Rewrite the integrand as a sum of powers and basic functions: $${integrand} = ${o.rewrite}$`);
  if (terms.length === 1) steps.push(`$${terms[0].why}$`);
  else {
    steps.push('Integrate term by term:');
    for (const t of terms) steps.push(`$${t.why}$`);
  }
  steps.push(`Check by differentiating: the derivative of $${F}$ is $${o.rewrite ?? integrand}$.`);
  steps.push(`$\\displaystyle\\int ${wrap(integrand)}\\,dx = ${F} + C$, so with $C = 0$ the answer is $${F}$.`);
  return {
    prompt: `Find $\\displaystyle\\int ${wrap(integrand)}\\,dx$${o.domain ?? ''}. ${C_NOTE}`,
    parts: [part({ kind: 'expression', expected: Ft }, { label: '$F(x) =$', suffix: '+ C' })],
    hints: o.hints,
    solution: steps,
  };
}

const antiderivative = skill({
  id: 'm31-antiderivative',
  name: 'Antiderivatives',
  description: 'Find general antiderivatives of polynomials, roots, negative powers, sin x, cos x, sec² x, eˣ and 1/x, rewriting the integrand first when needed.',
  outcomes: ['I1'],
  lessonId: 'm31-8-1',
  gen(rng, d): GenOutput {
    const kind =
      d === 1 ? rng.pick(['poly', 'poly', 'basic', 'mc'] as const) : d === 2 ? rng.pick(['mixed', 'mixed', 'mixed', 'mcTrig'] as const) : 'rewrite';

    if (kind === 'poly') {
      const exps = rng.pick([[2, 1, 0], [3, 1], [3, 2, 0], [2, 0], [4, 2], [3, 1, 0], [1, 0], [4, 1, 0], [3, 2, 1]]);
      const terms = exps.map((n) => (n === 0 ? powTerm(rng.nonZero(-9, 9), 0) : powTerm((n + 1) * rng.nonZero(-3, 4), n)));
      return antiItem(joinTerms(terms.map((t) => t.tex)), terms, { hints: [POWER_RULE, 'Integrate one term at a time. A constant $k$ integrates to $kx$.'] });
    }

    if (kind === 'basic') {
      const tk = rng.pick(['cos', 'sin', 'sec2', 'exp', 'recip'] as const);
      const t = transTerm(tk, rng.pick([1, 2, 3, 4, 5, -1, -2, -3]));
      const n = rng.pick([0, 1, 2]);
      const p = n === 0 ? powTerm(rng.nonZero(-6, 8), 0) : powTerm((n + 1) * rng.nonZero(-3, 3), n);
      const terms = rng.chance(0.5) ? [t, p] : [p, t];
      return antiItem(joinTerms(terms.map((x) => x.tex)), terms, {
        domain: tk === 'recip' ? ' for $x > 0$' : '',
        hints: [BASIC_RULES, 'Integrate each term separately; a constant multiple stays in front.'],
      });
    }

    if (kind === 'mc') {
      const n = rng.pick([1, 2, 3]);
      const k = rng.nonZero(-3, 4);
      const a = (n + 1) * k;
      const b = rng.nonZero(-7, 7);
      const f = joinTerms([powTex(a, n), tn(b)]);
      const C = (s: string) => `$${s} + C$`;
      const correct = C(joinTerms([powTex(k, n + 1), powTex(b, 1)]));
      const ds = [
        C(n === 1 ? tn(a) : powTex(a * n, n - 1)),
        C(joinTerms([powTex(a, n + 1), powTex(b, 1)])),
        C(joinTerms([powTex(k, n + 1), tn(b)])),
        ...(n > 1 ? [C(joinTerms([powTex(a / n, n + 1), powTex(b, 1)]))] : []),
      ];
      return {
        prompt: `Which function is the general antiderivative of $f(x) = ${f}$?`,
        parts: [part(mc(rng, correct, ds))],
        hints: ['Differentiate each choice. The antiderivative is the one whose derivative is $f(x)$.', POWER_RULE],
        solution: [
          `$\\int ${powTex(a, n)}\\,dx = ${cdot(a)}\\dfrac{x^{${n + 1}}}{${n + 1}} = ${powTex(k, n + 1)}$ and $\\int ${tn(b)}\\,dx = ${powTex(b, 1)}$.`,
          `Check: $\\dfrac{d}{dx}\\left(${joinTerms([powTex(k, n + 1), powTex(b, 1)])}\\right) = ${f}$.`,
          `The general antiderivative is ${correct}.`,
        ],
      };
    }

    if (kind === 'mcTrig') {
      const a = rng.pick([1, 2, 3, 4, 5, -2, -3]);
      const b = rng.pick([1, 2, 3, 4, -1, -2, -4]);
      const C = (s: string) => `$${s} + C$`;
      if (rng.chance(0.5)) {
        const f = joinTerms([`${cf(a)}\\cos x`, `${cf(b)}\\sin x`]);
        const correct = C(joinTerms([`${cf(a)}\\sin x`, `${cf(-b)}\\cos x`]));
        const ds = [C(joinTerms([`${cf(a)}\\sin x`, `${cf(b)}\\cos x`])), C(joinTerms([`${cf(-a)}\\sin x`, `${cf(b)}\\cos x`])), C(joinTerms([`${cf(-a)}\\sin x`, `${cf(-b)}\\cos x`]))];
        return {
          prompt: `Which function is the general antiderivative of $f(x) = ${f}$?`,
          parts: [part(mc(rng, correct, ds))],
          hints: ['Ask which function has derivative $\\cos x$, and which has derivative $\\sin x$.', '$\\dfrac{d}{dx}\\sin x = \\cos x$ and $\\dfrac{d}{dx}(-\\cos x) = \\sin x$, so $\\int \\sin x\\,dx = -\\cos x + C$.'],
          solution: [`$${cosTerm(a).why}$`, `$${sinTerm(b).why}$`, `Check: $\\dfrac{d}{dx}\\left(${joinTerms([`${cf(a)}\\sin x`, `${cf(-b)}\\cos x`])}\\right) = ${f}$.`, `The general antiderivative is ${correct}.`],
        };
      }
      const f = joinTerms([`${cf(a)}\\sec^2 x`, `${cf(b)}e^{x}`]);
      const correct = C(joinTerms([`${cf(a)}\\tan x`, `${cf(b)}e^{x}`]));
      const ds = [
        C(joinTerms([`${cf(2 * a)}\\sec^2 x\\tan x`, `${cf(b)}e^{x}`])),
        C(joinTerms([`${cf(a)}\\tan x`, `${cf(b)}\\dfrac{e^{x + 1}}{x + 1}`])),
        C(joinTerms([`${cf(a)}\\dfrac{\\sec^3 x}{3}`, `${cf(b)}e^{x}`])),
      ];
      return {
        prompt: `Which function is the general antiderivative of $f(x) = ${f}$?`,
        parts: [part(mc(rng, correct, ds))],
        hints: ['The power rule is for powers of $x$ only. Which function has derivative $\\sec^2 x$? Which has derivative $e^x$?', '$\\dfrac{d}{dx}\\tan x = \\sec^2 x$ and $\\dfrac{d}{dx}e^x = e^x$.'],
        solution: [`$${sec2Term(a).why}$`, `$${expTerm(b).why}$`, `Check: $\\dfrac{d}{dx}\\left(${joinTerms([`${cf(a)}\\tan x`, `${cf(b)}e^{x}`])}\\right) = ${f}$.`, `The general antiderivative is ${correct}.`],
      };
    }

    if (kind === 'mixed') {
      const terms: Term[] = [];
      if (rng.chance(0.6)) {
        const n = rng.pick([0.5, -0.5, -2, -3, 1 / 3, 1.5]);
        terms.push(powTerm(rng.pick([1, 2, 3, 4, 5, 6, 8, -2, -3, -4]), n));
      } else {
        const n = rng.pick([2, 3, 4]);
        const c = rng.pick([1, 2, 3, 4, 5, 6, 7].filter((x) => x % (n + 1) !== 0)) * rng.sign();
        terms.push(powTerm(c, n));
      }
      const tk = rng.pick(['cos', 'sin', 'sec2', 'exp', 'recip'] as const);
      terms.push(transTerm(tk, rng.pick([1, 2, 3, 4, 5, -1, -2, -3, -6])));
      if (rng.chance(0.4)) terms.push(powTerm(rng.nonZero(-6, 6), 0));
      const needsPos = terms.some((t) => t.m !== undefined && !Number.isInteger(t.m)) || terms.some((t) => t.m !== undefined && t.m < 0) || tk === 'recip';
      return antiItem(joinTerms(terms.map((t) => t.tex)), terms, {
        domain: needsPos ? ' for $x > 0$' : '',
        hints: ['Write roots and reciprocals as powers first: $\\sqrt{x} = x^{1/2}$ and $\\dfrac{1}{x^{n}} = x^{-n}$. Then use the power rule.', BASIC_RULES],
      });
    }

    // rewrite (d3): split a quotient, expand a product, or use an identity first
    const t = rng.pick(['quotX', 'quotX2', 'square', 'rootProd', 'rootQuot', 'trig', 'exp'] as const);
    const H = [
      'Integrals do not split over products or quotients. Expand or divide first so that every term is a power of $x$ or a basic function.',
      'Then integrate term by term, writing roots and reciprocals as powers.',
    ];
    if (t === 'quotX') {
      const a = rng.pick([1, 2, 3, 4, -2]);
      const b = rng.nonZero(-6, 6);
      const c = rng.nonZero(-5, 6);
      const terms = [powTerm(a, 1), powTerm(b, 0), recipTerm(c)];
      return antiItem(`\\dfrac{${polyTex([[a, 2], [b, 1], [c, 0]])}}{x}`, terms, { domain: ' for $x > 0$', rewrite: joinTerms(terms.map((x) => x.tex)), hints: H });
    }
    if (t === 'quotX2') {
      const a = rng.pick([2, 4, 6, 3, -2]);
      const b = rng.nonZero(-6, 8);
      const terms = [powTerm(a, 1), powTerm(b, -2)];
      return antiItem(`\\dfrac{${polyTex([[a, 3], [b, 0]])}}{x^{2}}`, terms, { domain: ' for $x > 0$', rewrite: joinTerms(terms.map((x) => x.tex)), hints: H });
    }
    if (t === 'square') {
      const p = rng.pick([1, 2, 3]);
      const q = rng.nonZero(-4, 4);
      const terms = [powTerm(p * p, 2), powTerm(2 * p * q, 1), powTerm(q * q, 0)];
      return antiItem(`(${polyTex([[p, 1], [q, 0]])})^{2}`, terms, { rewrite: joinTerms(terms.map((x) => x.tex)), hints: H });
    }
    if (t === 'rootProd') {
      const a = rng.pick([1, 2, 3, 5, -1]);
      const b = rng.nonZero(-6, 6);
      const terms = [powTerm(a, 1.5), powTerm(b, 0.5)];
      return antiItem(`\\sqrt{x}\\,(${polyTex([[a, 1], [b, 0]])})`, terms, { domain: ' for $x > 0$', rewrite: joinTerms([`${cf(a)}x^{3/2}`, `${cf(b)}x^{1/2}`]), hints: H });
    }
    if (t === 'rootQuot') {
      const a = rng.pick([1, 2, 3, 4, 6]);
      const b = rng.nonZero(-6, 6);
      const terms = [powTerm(a, 0.5), powTerm(b, -0.5)];
      return antiItem(`\\dfrac{${polyTex([[a, 1], [b, 0]])}}{\\sqrt{x}}`, terms, { domain: ' for $x > 0$', rewrite: joinTerms([`${cf(a)}x^{1/2}`, `${cf(b)}x^{-1/2}`]), hints: H });
    }
    if (t === 'trig') {
      const k = rng.pick([1, 2, 3, 4]);
      const m = rng.nonZero(-5, 5);
      const terms = [sec2Term(k), powTerm(m, 0)];
      return antiItem(`\\dfrac{${joinTerms([tn(k), `${cf(m)}\\cos^2 x`])}}{\\cos^2 x}`, terms, {
        rewrite: joinTerms(terms.map((x) => x.tex)),
        hints: ['Split the fraction: $\\dfrac{k}{\\cos^2 x} = k\\sec^2 x$, and the second term simplifies to a constant.', 'Then use $\\int \\sec^2 x\\,dx = \\tan x + C$.'],
      });
    }
    const a = rng.pick([1, 2, 3, 4, -1]);
    const k = rng.nonZero(-6, 6);
    const terms = [expTerm(a), powTerm(k, 0)];
    return antiItem(`\\dfrac{${joinTerms([`${cf(a)}e^{2x}`, `${cf(k)}e^{x}`])}}{e^{x}}`, terms, {
      rewrite: joinTerms(terms.map((x) => x.tex)),
      hints: ['Divide each term by $e^x$ using the exponent laws: $\\dfrac{e^{2x}}{e^x} = e^{x}$.', 'Then use $\\int e^x\\,dx = e^x + C$.'],
    });
  },
});

// ---------------------------------------------------------------------------
// 8.1 — Initial-value problems
// ---------------------------------------------------------------------------

/** The value of power terms at x0, written out: 2(3)^{2} + 5(3). */
function powSubTex(terms: Term[], x0: number): string {
  return joinTerms(
    terms.map((t) => {
      const k = t.k!;
      const m = t.m!;
      if (m === 0) return tn(k);
      const base = `(${tn(x0)})`;
      const pow = m === 1 ? base : `${base}^{${expTex(m)}}`;
      return `${k === 1 ? '' : k === -1 ? '-' : tn(k)}${pow}`;
    }),
  );
}

const IV_HINTS = (fn: string, v: string, at: string) => [
  `First find the general antiderivative: $${fn}(${v}) = F(${v}) + C$.`,
  `Then substitute the given condition ${at} to solve for $C$.`,
];

/** f(x) from f'(x) (power terms) and f(x0) = y0. */
function polyIV(rng: Rng, terms: Term[], x0: number, y0: number, o: { fn?: string; v?: string } = {}): { F: string; Ft: string; C: number; steps: string[] } {
  const fn = o.fn ?? 'f';
  const v = o.v ?? 'x';
  const G = joinTerms(terms.map((t) => t.F));
  const G0 = snap(terms.reduce((s, t) => s + t.Fv(x0), 0));
  const C = snap(y0 - G0);
  const F = joinTerms([...terms.map((t) => t.F), tn(C)]);
  const Ft = joinTerms([...terms.map((t) => t.Ft), txn(C)]);
  const sub = x0 === 0 ? `${fn}(0) = C` : `${fn}(${tn(x0)}) = ${powSubTex(terms, x0)} + C = ${tn(G0)} + C`;
  void rng;
  return {
    F,
    Ft,
    C,
    steps: [
      `Antidifferentiate term by term: $${fn}(${v}) = ${G} + C$`,
      x0 === 0 ? `Substitute $${v} = 0$: $${sub} = ${tn(y0)}$` : `Substitute $${v} = ${tn(x0)}$: $${sub} = ${tn(y0)}$, so $C = ${tn(y0)} - ${par(G0)} = ${tn(C)}$`,
      `$${fn}(${v}) = ${F}$`,
    ],
  };
}

interface TransIV {
  fp: string;
  cond: string;
  G: string;
  Gt: string;
  G0tex: string;
  G0: number;
  x0tex: string;
  dom?: string;
}

const initialValue = skill({
  id: 'm31-initial-value',
  name: 'Initial-value problems',
  description: 'Find the antiderivative that satisfies an initial condition, including position from velocity or acceleration and totals from rates.',
  outcomes: ['I1'],
  lessonId: 'm31-8-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1 ? rng.pick(['poly', 'poly', 'motion1'] as const) : d === 2 ? rng.pick(['trans', 'trans', 'trans', 'motion2'] as const) : rng.pick(['second', 'projectile', 'cost', 'growth'] as const);

    if (kind === 'poly') {
      const deg = rng.pick([1, 2, 2, 3]);
      const terms: Term[] = [];
      for (let n = deg; n >= 1; n--) if (n === deg || rng.chance(0.7)) terms.push(powTerm((n + 1) * rng.nonZero(-3, 4), n));
      terms.push(powTerm(rng.nonZero(-6, 6), 0));
      const x0 = rng.pick([0, 0, 1, 2, -1]);
      const y0 = rng.int(-6, 12);
      const fp = joinTerms(terms.map((t) => t.tex));
      const r = polyIV(rng, terms, x0, y0);
      return {
        prompt: `Find $f(x)$ given that $f'(x) = ${fp}$ and $f(${x0}) = ${y0}$.`,
        parts: [part({ kind: 'expression', expected: r.Ft }, { label: '$f(x) =$' })],
        hints: IV_HINTS('f', 'x', `$f(${x0}) = ${y0}$`),
        solution: r.steps,
        calculator: false,
      };
    }

    if (kind === 'motion1') {
      const a = rng.pick([2, 4, 6, 8, -2, -4]);
      const b = rng.nonZero(-5, 9);
      const s0 = rng.int(-10, 20);
      const terms = [powTerm(a, 1, 't'), powTerm(b, 0, 't')];
      const vt = joinTerms(terms.map((t) => t.tex));
      const r = polyIV(rng, terms, 0, s0, { fn: 's', v: 't' });
      const name = rng.pick(NAMES);
      const intro = `${rng.pick([`A particle moves along a straight line`, `${name}'s robot moves along a straight track`, 'A cart rolls along a straight rail'])} with velocity $v(t) = ${vt}$ m/s, where $t$ is the time in seconds. At $t = 0$ its position is $s(0) = ${s0}$ m.`;
      const H = ['Position is an antiderivative of velocity: $s\'(t) = v(t)$.', 'Find $s(t) = \\int v(t)\\,dt$, then use $s(0)$ to find the constant.'];
      if (rng.chance(0.5)) {
        return {
          prompt: `${intro} Find the position function $s(t)$.`,
          parts: [part({ kind: 'expression', expected: r.Ft }, { label: '$s(t) =$' })],
          hints: H,
          solution: [...r.steps.slice(0, 2), `The position function is $s(t) = ${r.F}$ (in metres).`],
          calculator: false,
        };
      }
      const T = rng.int(2, 6);
      const sT = terms.reduce((s, t) => s + t.Fv(T), 0) + r.C;
      return {
        prompt: `${intro} Find its position at $t = ${T}$ s.`,
        parts: [part({ kind: 'numeric', value: sT }, { suffix: 'm' })],
        hints: H,
        solution: [...r.steps, `$s(${T}) = ${powSubTex(terms, T)} ${pm(r.C)} = ${tn(sT)}$`, `The position at $t = ${T}$ s is $${tn(sT)}$ m.`],
        calculator: false,
      };
    }

    if (kind === 'motion2') {
      const p = 3 * rng.nonZero(-1, 2);
      const q = 2 * rng.nonZero(-4, 4);
      const c = rng.int(-6, 8);
      const terms = [powTerm(p, 2, 't'), powTerm(q, 1, 't'), ...(c ? [powTerm(c, 0, 't')] : [])];
      const t0 = rng.pick([0, 1, 2]);
      const s1 = rng.int(-8, 15);
      const T = rng.intExcept(2, 5, [t0]);
      const r = polyIV(rng, terms, t0, s1, { fn: 's', v: 't' });
      const sT = snap(terms.reduce((s, t) => s + t.Fv(T), 0) + r.C);
      return {
        prompt: `An object moves along a line with velocity $v(t) = ${joinTerms(terms.map((t) => t.tex))}$ m/s at time $t$ seconds. Its position at $t = ${t0}$ s is $s(${t0}) = ${s1}$ m. Find its position at $t = ${T}$ s.`,
        parts: [part({ kind: 'numeric', value: sT }, { suffix: 'm' })],
        hints: ['Position is an antiderivative of velocity. Find $s(t) = \\int v(t)\\,dt$ with a constant $C$.', `Use $s(${t0}) = ${s1}$ to find $C$, then evaluate $s(${T})$.`],
        solution: [...r.steps, `$s(${T}) = ${powSubTex(terms, T)} ${pm(r.C)} = ${tn(sT)}$`, `The position at $t = ${T}$ s is $${tn(sT)}$ m.`],
        calculator: false,
      };
    }

    if (kind === 'trans') {
      const t = rng.pick(['cos', 'sin', 'exp', 'sqrt', 'invsq', 'recip', 'sec2', 'cosHalf', 'sinPi'] as const);
      const c = rng.pick([1, 2, 3, 4, 5, -2, -3]);
      const k = rng.int(-4, 4);
      const y0 = rng.int(-5, 10);
      let o: TransIV;
      if (t === 'cos') {
        const terms = [cosTerm(c), ...(k ? [powTerm(k, 0)] : [])];
        o = { fp: joinTerms(terms.map((x) => x.tex)), cond: 'f(0)', G: joinTerms(terms.map((x) => x.F)), Gt: joinTerms(terms.map((x) => x.Ft)), G0tex: `${cf(c)}\\sin 0${k ? ` ${pm(k)}(0)` : ''}`, G0: 0, x0tex: '0' };
      } else if (t === 'sin') {
        const terms = [sinTerm(c), ...(k ? [powTerm(k, 0)] : [])];
        o = { fp: joinTerms(terms.map((x) => x.tex)), cond: 'f(0)', G: joinTerms(terms.map((x) => x.F)), Gt: joinTerms(terms.map((x) => x.Ft)), G0tex: `${cf(-c)}\\cos 0${k ? ` ${pm(k)}(0)` : ''}`, G0: -c, x0tex: '0' };
      } else if (t === 'exp') {
        const terms = [expTerm(c), ...(k ? [powTerm(2 * k, 1)] : [])];
        o = { fp: joinTerms(terms.map((x) => x.tex)), cond: 'f(0)', G: joinTerms(terms.map((x) => x.F)), Gt: joinTerms(terms.map((x) => x.Ft)), G0tex: `${cf(c)}e^{0}${k ? ` ${pm(k)}(0)^{2}` : ''}`, G0: c, x0tex: '0' };
      } else if (t === 'sqrt') {
        const cc = rng.pick([3, 6, 9, -3, -6]);
        const x0 = rng.pick([1, 4, 9]);
        const term = powTerm(cc, 0.5);
        o = { fp: term.tex, cond: `f(${x0})`, G: term.F, Gt: term.Ft, G0tex: `${tn(term.k!)}(${x0})^{3/2}`, G0: term.Fv(x0), x0tex: `${x0}`, dom: ' for $x \\ge 0$' };
      } else if (t === 'invsq') {
        const term = powTerm(c, -2);
        o = { fp: term.tex, cond: 'f(1)', G: term.F, Gt: term.Ft, G0tex: powTex(-c, -1).replace(/x/g, '1'), G0: -c, x0tex: '1', dom: ' for $x > 0$' };
      } else if (t === 'recip') {
        const terms = [recipTerm(c), ...(k ? [powTerm(k, 0)] : [])];
        o = { fp: joinTerms(terms.map((x) => x.tex)), cond: 'f(1)', G: joinTerms(terms.map((x) => x.F)), Gt: joinTerms(terms.map((x) => x.Ft)), G0tex: `${cf(c)}\\ln 1${k ? ` ${pm(k)}(1)` : ''}`, G0: k, x0tex: '1', dom: ' for $x > 0$' };
      } else if (t === 'sec2') {
        const term = sec2Term(c);
        o = { fp: term.tex, cond: 'f\\left(\\frac{\\pi}{4}\\right)', G: term.F, Gt: term.Ft, G0tex: `${cf(c)}\\tan\\frac{\\pi}{4}`, G0: c, x0tex: '\\frac{\\pi}{4}', dom: ' for $-\\frac{\\pi}{2} < x < \\frac{\\pi}{2}$' };
      } else if (t === 'cosHalf') {
        const term = cosTerm(c);
        o = { fp: term.tex, cond: 'f\\left(\\frac{\\pi}{2}\\right)', G: term.F, Gt: term.Ft, G0tex: `${cf(c)}\\sin\\frac{\\pi}{2}`, G0: c, x0tex: '\\frac{\\pi}{2}' };
      } else {
        const term = sinTerm(c);
        o = { fp: term.tex, cond: 'f(\\pi)', G: term.F, Gt: term.Ft, G0tex: `${cf(-c)}\\cos \\pi`, G0: c, x0tex: '\\pi' };
      }
      const C = snap(y0 - o.G0);
      const ans = joinTerms([o.Gt, txn(C)]);
      return {
        prompt: `Find $f(x)$${o.dom ?? ''} given that $f'(x) = ${o.fp}$ and $${o.cond} = ${y0}$.`,
        parts: [part({ kind: 'expression', expected: ans }, { label: '$f(x) =$' })],
        hints: [`First antidifferentiate: $f(x) = F(x) + C$. ${BASIC_RULES}`, `Then use $${o.cond} = ${y0}$ to solve for $C$.`],
        solution: [
          `Antidifferentiate: $f(x) = ${o.G} + C$`,
          `Substitute $x = ${o.x0tex}$: $${o.cond} = ${o.G0tex} + C = ${tn(o.G0)} + C = ${y0}$, so $C = ${tn(C)}$`,
          `$f(x) = ${joinTerms([o.G, tn(C)])}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'second') {
      if (rng.chance(0.35)) {
        // f''(x) = c sin x + 2b, f'(0) = s, f(0) = h
        const c = rng.pick([1, 2, 3, 4, -2, -3]);
        const b = rng.int(-3, 3);
        const s = rng.int(-4, 6);
        const h = rng.int(-5, 8);
        const C1 = s + c;
        const fpp = joinTerms([`${cf(c)}\\sin x`, b ? tn(2 * b) : '']);
        const fp = joinTerms([`${cf(-c)}\\cos x`, b ? powTex(2 * b, 1) : '', tn(C1)]);
        const F = joinTerms([`${cf(-c)}\\sin x`, b ? powTex(b, 2) : '', C1 ? powTex(C1, 1) : '', tn(h)]);
        const Ft = joinTerms([`${cft(-c)}sin(x)`, b ? powTxt(b, 2) : '', C1 ? powTxt(C1, 1) : '', txn(h)]);
        return {
          prompt: `Find $f(x)$ given that $f''(x) = ${fpp}$, $f'(0) = ${s}$ and $f(0) = ${h}$.`,
          parts: [part({ kind: 'expression', expected: Ft }, { label: '$f(x) =$' })],
          hints: ['Antidifferentiate twice. Each antiderivative brings its own constant.', "Use $f'(0)$ to find the first constant before you antidifferentiate again; then use $f(0)$."],
          solution: [
            `$f'(x) = \\int (${fpp})\\,dx = ${joinTerms([`${cf(-c)}\\cos x`, b ? powTex(2 * b, 1) : ''])} + C_1$`,
            `$f'(0) = ${tn(-c)} + C_1 = ${s}$, so $C_1 = ${C1}$ and $f'(x) = ${fp}$`,
            `$f(x) = \\int f'(x)\\,dx = ${joinTerms([`${cf(-c)}\\sin x`, b ? powTex(b, 2) : '', C1 ? powTex(C1, 1) : ''])} + C_2$`,
            `$f(0) = C_2 = ${h}$`,
            `$f(x) = ${F}$`,
          ],
          calculator: false,
        };
      }
      // f''(x) = 6p x + 2q, f'(x1) = s, f(0) = h
      const p = rng.nonZero(-2, 3);
      const q = rng.int(-3, 3);
      const x1 = rng.pick([0, 1]);
      const s = rng.int(-5, 6);
      const h = rng.int(-6, 8);
      const C1 = s - (3 * p * x1 * x1 + 2 * q * x1);
      const fpp = joinTerms([powTex(6 * p, 1), q ? tn(2 * q) : '']);
      const fpG = joinTerms([powTex(3 * p, 2), q ? powTex(2 * q, 1) : '']);
      const fpF = joinTerms([fpG, tn(C1)]);
      const G2 = joinTerms([powTex(p, 3), q ? powTex(q, 2) : '', C1 ? powTex(C1, 1) : '']);
      const Ft = joinTerms([powTxt(p, 3), q ? powTxt(q, 2) : '', C1 ? powTxt(C1, 1) : '', txn(h)]);
      return {
        prompt: `Find $f(x)$ given that $f''(x) = ${fpp}$, $f'(${x1}) = ${s}$ and $f(0) = ${h}$.`,
        parts: [part({ kind: 'expression', expected: Ft }, { label: '$f(x) =$' })],
        hints: ['Antidifferentiate twice. Each antiderivative brings its own constant.', `Use $f'(${x1}) = ${s}$ to find the first constant, then $f(0) = ${h}$ for the second.`],
        solution: [
          `$f'(x) = \\int (${fpp})\\,dx = ${fpG} + C_1$`,
          x1 === 0 ? `$f'(0) = C_1 = ${s}$, so $f'(x) = ${fpF}$` : `$f'(1) = ${tn(3 * p + 2 * q)} + C_1 = ${s}$, so $C_1 = ${C1}$ and $f'(x) = ${fpF}$`,
          `$f(x) = \\int f'(x)\\,dx = ${G2} + C_2$`,
          `$f(0) = C_2 = ${h}$`,
          `$f(x) = ${joinTerms([G2, tn(h)])}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'projectile') {
      const v0 = rng.pick([9.8, 14.7, 19.6, 24.5, 12, 15, 18, 20]);
      const h0 = rng.pick([0, 1.5, 2, 5, 10, 25]);
      const s = (t: number) => h0 + v0 * t - 4.9 * t * t;
      const T = rng.pick([1, 2, 3].filter((x) => s(x) > 0.5));
      const sT = Math.round(s(T) * 1000) / 1000;
      const st = joinTerms(['-4.9t^2', `${fmt(v0)}t`, h0 ? fmt(h0) : '']);
      const what = rng.pick(['A ball', 'A volleyball', 'A water balloon', 'A stone']);
      return {
        prompt: `${what} is thrown straight up ${h0 ? `from a height of ${fmt(h0)} m` : 'from ground level'} with an initial velocity of ${fmt(v0)} m/s. Its acceleration is $a(t) = -9.8$ m/s² (gravity), where $t$ is in seconds.\n\n(a) Find its height $s(t)$, in metres. (b) Find its height at $t = ${T}$ s.`,
        parts: [part({ kind: 'expression', expected: st }, { label: '(a) $s(t) =$' }), part({ kind: 'numeric', value: sT }, { label: `(b) $s(${T}) =$`, suffix: 'm' })],
        hints: ["Velocity is an antiderivative of acceleration, and height is an antiderivative of velocity.", `$v(t) = -9.8t + C_1$ with $v(0) = ${fmt(v0)}$; then $s(t) = -4.9t^2 + ${fmt(v0)}t + C_2$ with $s(0) = ${fmt(h0)}$.`],
        solution: [
          `$v(t) = \\int -9.8\\,dt = -9.8t + C_1$, and $v(0) = ${fmt(v0)}$ gives $C_1 = ${fmt(v0)}$.`,
          `$s(t) = \\int (-9.8t + ${fmt(v0)})\\,dt = -4.9t^2 + ${fmt(v0)}t + C_2$, and $s(0) = ${fmt(h0)}$ gives $C_2 = ${fmt(h0)}$.`,
          `(a) $s(t) = ${st}$`,
          `(b) $s(${T}) = -4.9(${T})^2 + ${fmt(v0)}(${T})${h0 ? ` + ${fmt(h0)}` : ''} = ${fmt(sT)}$, so the height is $${fmt(sT)}$ m.`,
        ],
      };
    }

    if (kind === 'cost') {
      const item = rng.pick([
        ['hockey sticks', 'stick'],
        ['canoe paddles', 'paddle'],
        ['jars of berry jam', 'jar'],
        ['cowboy hats', 'hat'],
        ['bike frames', 'frame'],
        ['wooden chairs', 'chair'],
      ] as const);
      const a = rng.pick([12, 15, 18, 20, 24, 30]);
      const b = rng.pick([0.01, 0.02, 0.03, 0.04, 0.05]);
      const N = rng.pick([100, 150, 200, 250, 300].filter((n) => a - b * n > 2));
      const F0 = rng.pick([400, 500, 750, 800, 1200, 1500]);
      const cost = F0 + a * N - (b / 2) * N * N;
      const v = Math.round(cost * 100) / 100;
      return {
        prompt: `A workshop in ${rng.pick(['Hillcrest', 'Ashford', 'Pinewood', 'Westbury', 'Lakeside'])} makes ${item[0]}. The marginal cost of making $x$ ${item[0]} is $C'(x) = ${a} - ${fmt(b)}x$ dollars per ${item[1]}, and the fixed costs (the cost when $x = 0$) are \\$${F0}. Find the total cost $C(${N})$ of making ${N} ${item[0]}, to the nearest cent.`,
        parts: [part({ kind: 'numeric', value: v, decimals: 2, tolerance: 0.011 }, { label: 'Total cost: \\$' })],
        hints: ["Total cost is an antiderivative of marginal cost: $C(x) = \\int C'(x)\\,dx$.", `Use $C(0) = ${F0}$ (the fixed costs) to find the constant, then evaluate $C(${N})$.`],
        solution: [
          `$C(x) = \\int (${a} - ${fmt(b)}x)\\,dx = ${a}x - ${fmt(b / 2)}x^2 + K$`,
          `$C(0) = K = ${F0}$, so $C(x) = ${a}x - ${fmt(b / 2)}x^2 + ${F0}$`,
          `$C(${N}) = ${a}(${N}) - ${fmt(b / 2)}(${N})^2 + ${F0} = ${fmt(a * N)} - ${fmt((b / 2) * N * N)} + ${F0} = ${fmt(v)}$`,
          `The total cost is \\$${fmtFixed(v, 2)}.`,
        ],
      };
    }

    // growth: h'(t) = k√t, h(t1) = H1, find h(t2)
    const k = rng.pick([1.5, 3, 4.5, 6]);
    const t1 = rng.pick([0, 1, 4]);
    const t2 = rng.pick([4, 9, 16].filter((x) => x > t1));
    const H1 = rng.pick([5, 8, 10, 12, 20]);
    const coef = (2 * k) / 3;
    const C = H1 - coef * t1 ** 1.5;
    const h2 = coef * t2 ** 1.5 + C;
    const plant = rng.pick(['A sunflower seedling', 'A spruce sapling at a tree nursery', 'A tomato plant in a greenhouse', 'A poplar sapling']);
    return {
      prompt: `${plant} grows at a rate of $h'(t) = ${fmt(k)}\\sqrt{t}$ cm per week, where $t$ is the time in weeks. At $t = ${t1}$ the plant is ${H1} cm tall. How tall is it at $t = ${t2}$?`,
      parts: [part({ kind: 'numeric', value: h2 }, { suffix: 'cm' })],
      hints: ["Height is an antiderivative of the growth rate. Write $\\sqrt{t} = t^{1/2}$ and use the power rule.", `Find $h(t) = ${tn(coef)}t^{3/2} + C$, use $h(${t1}) = ${H1}$ to find $C$, then evaluate $h(${t2})$.`],
      solution: [
        `$h(t) = \\int ${fmt(k)}t^{1/2}\\,dt = ${fmt(k)} \\cdot \\dfrac{t^{3/2}}{3/2} + C = ${cf(coef)}t^{3/2} + C$`,
        t1 === 0 ? `$h(0) = C = ${H1}$` : `$h(${t1}) = ${cf(coef)}(${t1})^{3/2} + C = ${fmt(coef * t1 ** 1.5)} + C = ${H1}$, so $C = ${fmt(C)}$`,
        `$h(${t2}) = ${cf(coef)}(${t2})^{3/2} ${pm(C)} = ${fmt(coef * t2 ** 1.5)} ${pm(C)} = ${fmt(h2)}$`,
        `At $t = ${t2}$ weeks the plant is ${fmt(h2)} cm tall.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 8.2 — Riemann sums
// ---------------------------------------------------------------------------

interface RFn {
  tex: string;
  f: (x: number) => number;
  mono: 'inc' | 'dec' | null;
  ivs: Array<[number, number]>;
}

function riemannPool(rng: Rng): RFn[] {
  const c = rng.int(0, 3);
  const a = rng.pick([1, 0.5, 2]);
  const m = rng.pick([2, 3]);
  const k = rng.pick([9, 16]);
  const kk = rng.pick([20, 25]);
  const q = rng.pick([6, 12]);
  return [
    { tex: polyTex([[a, 2], [c, 0]]), f: (x) => a * x * x + c, mono: 'inc', ivs: [[0, 4], [1, 5], [0, 2], [0, 3]] },
    { tex: `${k} - x^{2}`, f: (x) => k - x * x, mono: 'dec', ivs: k === 9 ? [[0, 3]] : [[0, 4], [0, 2]] },
    { tex: `${kk} - x^{2}`, f: (x) => kk - x * x, mono: 'dec', ivs: [[0, 4], [1, 3]] },
    { tex: polyTex([[m, 1], [c + 1, 0]]), f: (x) => m * x + c + 1, mono: 'inc', ivs: [[0, 4], [1, 5], [0, 6]] },
    { tex: '\\sqrt{x}', f: Math.sqrt, mono: 'inc', ivs: [[0, 4], [1, 9], [0, 9]] },
    { tex: `\\dfrac{${q}}{x}`, f: (x) => q / x, mono: 'dec', ivs: [[1, 5], [2, 6], [1, 4], [1, 3]] },
    { tex: 'e^{x}', f: Math.exp, mono: 'inc', ivs: [[0, 2], [0, 1]] },
    { tex: 'x^{3}', f: (x) => x ** 3, mono: 'inc', ivs: [[0, 2], [1, 3]] },
    { tex: '4x - x^{2}', f: (x) => 4 * x - x * x, mono: null, ivs: [[0, 4]] },
    { tex: '\\ln x', f: Math.log, mono: 'inc', ivs: [[1, 5], [1, 3]] },
  ];
}

type RKind = 'left' | 'right' | 'mid';
const RNAME: Record<RKind, string> = { left: 'left', right: 'right', mid: 'midpoint' };
const RSYM: Record<RKind, string> = { left: 'L', right: 'R', mid: 'M' };

function samplePoints(a: number, b: number, n: number, kind: RKind): number[] {
  const dx = (b - a) / n;
  return Array.from({ length: n }, (_, i) => snap(a + (i + (kind === 'left' ? 0 : kind === 'right' ? 1 : 0.5)) * dx));
}

function riemannFigure(fn: RFn, a: number, b: number, n: number, kind: RKind | null): PlaneFigure {
  const dx = (b - a) / n;
  const [, top] = range(fn.f, a, b);
  const x0 = Math.min(0, a);
  const xStep = Number.isInteger((a - x0) / dx) && (b - x0) / dx <= 16 ? dx : undefined;
  const g = niceGrid(x0, b, 0, top * 1.12, xStep);
  const polylines: PlaneFigure['polylines'] = [];
  const points: PlaneFigure['points'] = [];
  if (kind) {
    for (const [i, xs] of samplePoints(a, b, n, kind).entries()) {
      const l = r3(a + i * dx);
      const r = r3(a + (i + 1) * dx);
      const h = r3(fn.f(xs));
      polylines.push({ points: [[l, 0], [l, h], [r, h], [r, 0]], color: 'accent' });
      points.push({ x: r3(xs), y: h, color: 'accent' });
    }
  }
  const lo = fn.tex.includes('\\ln') ? 0.05 : fn.tex.startsWith('\\dfrac') ? 0.01 : g.xMin;
  polylines.push(...lines(curve(fn.f, Math.max(g.xMin, lo), g.xMax, g)));
  return { type: 'plane', grid: g, polylines, ...(points.length ? { points } : {}) };
}

/** The worked solution of a Riemann sum. */
function riemannSteps(fn: RFn, a: number, b: number, n: number, kind: RKind): { steps: string[]; value: number } {
  const dx = (b - a) / n;
  const xs = samplePoints(a, b, n, kind);
  const hs = xs.map((x) => fn.f(x));
  const sum = hs.reduce((s, h) => s + h, 0);
  const value = sum * dx;
  const approx = hs.some((h) => isRounded(h));
  const S = `${RSYM[kind]}_{${n}}`;
  return {
    value,
    steps: [
      `$\\Delta x = \\dfrac{${b} - ${a}}{${n}} = ${dec(dx)}$`,
      `The ${kind === 'mid' ? 'midpoints' : `${RNAME[kind]} endpoints`} of the subintervals are $x = ${xs.map(dec).join(',\\ ')}$.`,
      `$${S} = ${dec(dx)}\\left[${xs.map((x) => `f(${dec(x)})`).join(' + ')}\\right]$`,
      `$${S} ${approx ? '\\approx' : '='} ${dec(dx)}\\left(${hs.map((h) => dec(h)).join(' + ')}\\right) ${approx ? '\\approx' : '='} ${dec(dx)}(${dec(sum)}) ${approx ? '\\approx' : '='} ${dec(value)}$`,
    ],
  };
}

function overUnder(mono: 'inc' | 'dec', kind: 'left' | 'right'): boolean {
  return (mono === 'inc') === (kind === 'right');
}

const OU_CHOICES = ['An overestimate', 'An underestimate', 'Exactly equal to the area', 'It cannot be determined'];

const riemann = skill({
  id: 'm31-riemann',
  name: 'Riemann sums',
  description: 'Approximate the area under a curve with left, right and midpoint Riemann sums, and decide whether a sum over- or underestimates the area.',
  outcomes: ['I2'],
  lessonId: 'm31-8-2',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind = d === 1 ? 'basic' : d === 2 ? rng.pick(['compute', 'compute', 'compute', 'ou'] as const) : rng.pick(['combo', 'table', 'table'] as const);
    const H1 = 'Find $\\Delta x = \\dfrac{b - a}{n}$, then the sample point in each subinterval (its left end, right end or midpoint).';
    const H2 = 'Add the heights $f(x_i)$ at the sample points and multiply the total by $\\Delta x$.';

    if (kind === 'basic') {
      const fns: RFn[] = [
        ...[0, 1, 2, 3].map((c): RFn => ({ tex: polyTex([[1, 2], [c, 0]]), f: (x) => x * x + c, mono: 'inc', ivs: [[0, 4], [1, 5]] })),
        { tex: '16 - x^{2}', f: (x) => 16 - x * x, mono: 'dec', ivs: [[0, 4]] },
        { tex: '20 - x^{2}', f: (x) => 20 - x * x, mono: 'dec', ivs: [[0, 4]] },
        { tex: '2x + 1', f: (x) => 2 * x + 1, mono: 'inc', ivs: [[0, 4], [1, 5]] },
        { tex: 'x^{2} - 2x + 3', f: (x) => x * x - 2 * x + 3, mono: null, ivs: [[0, 4], [1, 5]] },
        { tex: '\\dfrac{1}{2}x^{2} + 1', f: (x) => 0.5 * x * x + 1, mono: 'inc', ivs: [[0, 4]] },
      ];
      const fn = rng.pick(fns);
      const [a, b] = rng.pick(fn.ivs);
      const rk = rng.pick(['left', 'right'] as const);
      const r = riemannSteps(fn, a, b, 4, rk);
      const v = valuePart(r.value, { display: 'decimal' });
      return {
        prompt: `Estimate the area under $f(x) = ${fn.tex}$ on $[${a}, ${b}]$ with a ${RNAME[rk]} Riemann sum using $n = 4$ rectangles of equal width (shown in the graph).`,
        figure: riemannFigure(fn, a, b, 4, rk),
        parts: [{ ...v.part, label: `$${RSYM[rk]}_{4} =$` }],
        hints: [H1, H2],
        solution: [...r.steps, `The ${RNAME[rk]} sum is $${RSYM[rk]}_{4} = ${dec(r.value)}$ square units.`],
        calculator: false,
      };
    }

    if (kind === 'compute' || kind === 'combo') {
      const pool = riemannPool(rng).filter((f) => kind === 'compute' || f.mono);
      const fn = rng.pick(pool);
      const [a, b] = rng.pick(fn.ivs);
      const ns = [4, 5, 6, 8].filter((n) => Number.isInteger(((b - a) / n) * 4));
      const n = rng.pick(ns);
      const rk: RKind = kind === 'combo' ? rng.pick(['left', 'right'] as const) : rng.pick(['left', 'right', 'mid'] as const);
      const r = riemannSteps(fn, a, b, n, rk);
      const v = valuePart(r.value, { display: 'decimal', note: ' Round to the nearest hundredth if necessary.' });
      const S = `${RSYM[rk]}_{${n}}`;
      const shown = v.note && isRounded(r.value) ? `${S} \\approx ${fmtFixed(r.value, 2)}` : `${S} = ${dec(r.value)}`;
      if (kind === 'compute') {
        return {
          prompt: `Estimate the area under $f(x) = ${fn.tex}$ on $[${a}, ${b}]$ with a ${RNAME[rk]} Riemann sum using $n = ${n}$ subintervals of equal width.${v.note}`,
          figure: riemannFigure(fn, a, b, n, rk),
          parts: [{ ...v.part, label: `$${S} =$` }],
          hints: [H1, H2],
          solution: [...r.steps, `The ${RNAME[rk]} sum is $${shown}$ square units.`],
        };
      }
      const over = overUnder(fn.mono!, rk as 'left' | 'right');
      return {
        prompt: `The function $f(x) = ${fn.tex}$ is ${fn.mono === 'inc' ? 'increasing' : 'decreasing'} on $[${a}, ${b}]$.\n\n(a) Find the ${RNAME[rk]} Riemann sum with $n = ${n}$.${v.note} (b) Is it an overestimate or an underestimate of the area under the curve?`,
        figure: riemannFigure(fn, a, b, n, rk),
        parts: [{ ...v.part, label: `(a) $${S} =$` }, part(fixedChoice(OU_CHOICES, over ? 0 : 1), { label: '(b) The sum is' })],
        hints: [H1, `On an ${fn.mono === 'inc' ? 'increasing' : 'decreasing'} function, the ${rk} end of each subinterval is its ${(fn.mono === 'inc') === (rk === 'left') ? 'lowest' : 'highest'} point.`],
        solution: [
          ...r.steps,
          `(a) $${shown}$`,
          `(b) $f$ is ${fn.mono === 'inc' ? 'increasing' : 'decreasing'}, so each ${rk} endpoint is the ${over ? 'highest' : 'lowest'} point of its subinterval: every rectangle ${over ? 'sticks out above' : 'fits under'} the curve. The sum is ${over ? 'an overestimate' : 'an underestimate'}.`,
        ],
      };
    }

    if (kind === 'ou') {
      const fn = rng.pick(riemannPool(rng).filter((f) => f.mono));
      const [a, b] = rng.pick(fn.ivs);
      const n = rng.pick([4, 5, 6, 8].filter((x) => Number.isInteger(((b - a) / x) * 4)));
      const rk = rng.pick(['left', 'right'] as const);
      const over = overUnder(fn.mono!, rk);
      return {
        prompt: `The graph shows $f(x) = ${fn.tex}$, which is ${fn.mono === 'inc' ? 'increasing' : 'decreasing'} on $[${a}, ${b}]$. Does the ${rk} Riemann sum with $n = ${n}$ overestimate or underestimate the area under the curve on this interval?`,
        figure: riemannFigure(fn, a, b, n, null),
        parts: [part(fixedChoice(OU_CHOICES, over ? 0 : 1))],
        hints: [`Sketch one rectangle: its height is $f$ at the ${rk} end of the subinterval.`, `On an ${fn.mono === 'inc' ? 'increasing' : 'decreasing'} function, is the ${rk} end the lowest or the highest point of the subinterval?`],
        solution: [
          `A ${rk} sum uses the height at the ${rk} end of each subinterval.`,
          `$f$ is ${fn.mono === 'inc' ? 'increasing' : 'decreasing'}, so the ${rk} end is the ${over ? 'highest' : 'lowest'} point of each subinterval.`,
          `Every rectangle ${over ? 'reaches above' : 'stays below'} the curve, so the sum is ${over ? 'an overestimate' : 'an underestimate'}.`,
        ],
      };
    }

    // table (d3): estimate a total from rates recorded at equal time steps
    const ctx = rng.pick([
      { what: 'The velocity of a car merging onto a highway', q: 'v (m/s)', t: 't (s)', dt: 2, start: [0, 2, 4], inc: [2, 5], total: 'distance travelled', unit: 'm', rate: 'velocity' },
      { what: 'The rate at which water flows into a reservoir', q: 'r (L/min)', t: 't (min)', dt: 10, start: [40, 50, 60], inc: [-6, -2], total: 'volume of water that flows in', unit: 'L', rate: 'flow rate' },
      { what: "A cyclist's speed on a valley bike trail", q: 'v (m/s)', t: 't (s)', dt: 30, start: [4, 5, 6], inc: [-1, 2], total: 'distance travelled', unit: 'm', rate: 'speed' },
      { what: 'The rate at which oil flows from a well', q: 'r (barrels/h)', t: 't (h)', dt: 4, start: [30, 36, 42], inc: [-4, -1], total: 'amount of oil produced', unit: 'barrels', rate: 'flow rate' },
    ]);
    const rk = rng.pick(['left', 'right', 'mid'] as const);
    const n = rk === 'mid' ? 4 : rng.pick([4, 5, 6]);
    const cols = rk === 'mid' ? 9 : n + 1;
    const vals: number[] = [rng.pick(ctx.start)];
    for (let i = 1; i < cols; i++) vals.push(Math.max(1, vals[i - 1] + rng.int(ctx.inc[0], ctx.inc[1])));
    const times = vals.map((_, i) => i * ctx.dt);
    const width = rk === 'mid' ? 2 * ctx.dt : ctx.dt;
    const idx = Array.from({ length: n }, (_, i) => (rk === 'left' ? i : rk === 'right' ? i + 1 : 2 * i + 1));
    const used = idx.map((i) => vals[i]);
    const sum = used.reduce((s, v) => s + v, 0);
    const total = sum * width;
    const end = times[times.length - 1];
    return {
      prompt: `${ctx.what} is recorded in the table. Use a ${RNAME[rk]} Riemann sum with ${n} subintervals of equal width to estimate the ${ctx.total} from $t = 0$ to $t = ${end}$.`,
      figure: { type: 'table', headers: [ctx.t, ctx.q], rows: times.map((t, i) => [fmt(t), fmt(vals[i])]), horizontal: true },
      parts: [part({ kind: 'numeric', value: total }, { suffix: ctx.unit })],
      hints: [
        `The ${ctx.total} is the area under the ${ctx.rate} graph, so each rectangle is (${ctx.rate}) × (time).`,
        rk === 'mid'
          ? `With 4 subintervals each one is $${width}$ wide: $[0, ${width}], [${width}, ${2 * width}], \\dots$ Their midpoints are $t = ${idx.map((i) => times[i]).join(', ')}$.`
          : `Each subinterval is $${width}$ wide. A ${rk} sum uses the values at $t = ${idx.map((i) => times[i]).join(', ')}$.`,
      ],
      solution: [
        `$\\Delta t = \\dfrac{${end} - 0}{${n}} = ${width}$`,
        `The ${rk === 'mid' ? 'midpoints' : `${RNAME[rk]} endpoints`} are $t = ${idx.map((i) => times[i]).join(',\\ ')}$, with values $${used.join(',\\ ')}$.`,
        `Estimate $= ${width}(${used.join(' + ')}) = ${width}(${sum}) = ${fmt(total)}$`,
        `The ${ctx.total} is about ${fmt(total)} ${ctx.unit}.`,
      ],
      calculator: false,
    };
  },
});

// ---------------------------------------------------------------------------
// 8.3 — Definite integrals and the fundamental theorem
// ---------------------------------------------------------------------------

const FTC = 'Fundamental theorem: $\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)$, where $F$ is any antiderivative of $f$.';

/** ∫_a^b of power terms, solved with the fundamental theorem. */
function ftcSteps(terms: Term[], a: number, b: number): { F: string; Fa: number; Fb: number; value: number; steps: string[] } {
  const F = joinTerms(terms.map((t) => t.F));
  const Fa = snap(terms.reduce((s, t) => s + t.Fv(a), 0));
  const Fb = snap(terms.reduce((s, t) => s + t.Fv(b), 0));
  const value = snap(Fb - Fa);
  return {
    F,
    Fa,
    Fb,
    value,
    steps: [
      `An antiderivative is $F(x) = ${F}$.`,
      `$F(${b}) = ${powSubTex(terms, b)} = ${tn(Fb)}$`,
      a === 0 ? '$F(0) = 0$' : `$F(${a}) = ${powSubTex(terms, a)} = ${tn(Fa)}$`,
      `$\\displaystyle\\int_{${a}}^{${b}} f(x)\\,dx = F(${b}) - F(${a}) = ${tn(Fb)} - ${par(Fa)} = ${tn(value)}$`,
    ],
  };
}

interface TransDef {
  f: string;
  aT: string;
  bT: string;
  F: string;
  evalTex: string;
  value: number;
  exactTex: string;
  exact?: string;
  fns?: boolean;
}

function transDef(rng: Rng, c: number): TransDef {
  const k = rng.pick([2, 3, 5]);
  const cases: Array<() => TransDef> = [
    () => ({ f: `${cf(c)}\\cos x`, aT: '0', bT: '\\frac{\\pi}{2}', F: `${cf(c)}\\sin x`, evalTex: scaled(c, '\\sin\\frac{\\pi}{2} - \\sin 0') + ` = ${scaled(c, '1 - 0')}`, value: c, exactTex: tn(c) }),
    () => ({ f: `${cf(c)}\\sin x`, aT: '0', bT: '\\pi', F: `${cf(-c)}\\cos x`, evalTex: scaled(c, '-\\cos\\pi + \\cos 0') + ` = ${scaled(c, '1 + 1')}`, value: 2 * c, exactTex: tn(2 * c) }),
    () => ({ f: `${cf(c)}\\cos x`, aT: '0', bT: '\\frac{\\pi}{3}', F: `${cf(c)}\\sin x`, evalTex: scaled(c, '\\sin\\frac{\\pi}{3} - \\sin 0') + ` = ${scaled(c, '\\frac{\\sqrt{3}}{2} - 0')}`, value: (c * Math.sqrt(3)) / 2, exactTex: `\\dfrac{${cf(c)}\\sqrt{3}}{2}`, exact: `${cft(c)}sqrt(3)/2` }),
    () => ({ f: `${cf(c)}\\sec^2 x`, aT: '0', bT: '\\frac{\\pi}{4}', F: `${cf(c)}\\tan x`, evalTex: scaled(c, '\\tan\\frac{\\pi}{4} - \\tan 0') + ` = ${scaled(c, '1 - 0')}`, value: c, exactTex: tn(c) }),
    () => ({ f: `${cf(c)}\\cos x`, aT: '\\frac{\\pi}{6}', bT: '\\frac{\\pi}{2}', F: `${cf(c)}\\sin x`, evalTex: scaled(c, '\\sin\\frac{\\pi}{2} - \\sin\\frac{\\pi}{6}') + ` = ${scaled(c, '1 - \\frac{1}{2}')}`, value: c / 2, exactTex: tn(c / 2) }),
    () => ({ f: `${cf(c)}\\sin x`, aT: '\\frac{\\pi}{2}', bT: '\\pi', F: `${cf(-c)}\\cos x`, evalTex: scaled(c, '-\\cos\\pi + \\cos\\frac{\\pi}{2}') + ` = ${scaled(c, '1 + 0')}`, value: c, exactTex: tn(c) }),
    () => ({ f: `${cf(c)}e^{x}`, aT: '0', bT: '1', F: `${cf(c)}e^{x}`, evalTex: scaled(c, 'e^{1} - e^{0}') + ` = ${scaled(c, 'e - 1')}`, value: c * (Math.E - 1), exactTex: scaled(c, 'e - 1'), exact: c === 1 ? 'e - 1' : `${txn(c)}(e - 1)` }),
    () => ({ f: `${cf(c)}e^{x}`, aT: '0', bT: `\\ln ${k}`, F: `${cf(c)}e^{x}`, evalTex: scaled(c, `e^{\\ln ${k}} - e^{0}`) + ` = ${scaled(c, `${k} - 1`)}`, value: c * (k - 1), exactTex: tn(c * (k - 1)) }),
    () => ({ f: c < 0 ? `-\\dfrac{${-c}}{x}` : `\\dfrac{${c}}{x}`, aT: '1', bT: 'e', F: `${cf(c)}\\ln x`, evalTex: scaled(c, '\\ln e - \\ln 1') + ` = ${scaled(c, '1 - 0')}`, value: c, exactTex: tn(c) }),
    () => ({ f: c < 0 ? `-\\dfrac{${-c}}{x}` : `\\dfrac{${c}}{x}`, aT: '1', bT: `${k}`, F: `${cf(c)}\\ln x`, evalTex: scaled(c, `\\ln ${k} - \\ln 1`), value: c * Math.log(k), exactTex: `${cf(c)}\\ln ${k}`, exact: `${cft(c)}ln(${k})`, fns: true }),
    () => ({ f: c < 0 ? `-\\dfrac{${-c}}{x}` : `\\dfrac{${c}}{x}`, aT: '1', bT: 'e^{2}', F: `${cf(c)}\\ln x`, evalTex: scaled(c, '\\ln e^{2} - \\ln 1') + ` = ${scaled(c, '2 - 0')}`, value: 2 * c, exactTex: tn(2 * c) }),
  ];
  return rng.pick(cases)();
}

/** A polynomial with integer roots r1 (and r2) for the net-area questions. */
interface NetCase {
  tex: string;
  f: (x: number) => number;
  F: string;
  Fv: (x: number) => number;
  a: number;
  b: number;
  aT: string;
  bT: string;
  roots: number[];
  rootsT: string[];
  trig?: boolean;
}

function netCase(rng: Rng): NetCase {
  const t = rng.pick(['sq', 'shift', 'lin', 'quad', 'trig'] as const);
  if (t === 'trig') {
    const c = rng.pick([1, 2, 3]);
    const which = rng.pick(['sin32', 'sin2', 'cos1', 'cos32'] as const);
    const isSin = which.startsWith('sin');
    const b = which === 'sin32' || which === 'cos32' ? 1.5 * Math.PI : which === 'sin2' ? 2 * Math.PI : Math.PI;
    const bT = b === Math.PI ? '\\pi' : b === 2 * Math.PI ? '2\\pi' : '\\frac{3\\pi}{2}';
    const roots = isSin ? [Math.PI] : [Math.PI / 2];
    return {
      tex: `${cf(c)}\\${isSin ? 'sin' : 'cos'} x`,
      f: (x) => c * (isSin ? Math.sin(x) : Math.cos(x)),
      F: isSin ? `${cf(-c)}\\cos x` : `${cf(c)}\\sin x`,
      Fv: (x) => (isSin ? -c * Math.cos(x) : c * Math.sin(x)),
      a: 0,
      b,
      aT: '0',
      bT,
      roots: roots.filter((r) => r < b - 1e-9),
      rootsT: isSin ? ['\\pi'] : ['\\frac{\\pi}{2}'],
      trig: true,
    };
  }
  let P: Array<[number, number]>;
  let roots: number[];
  let a: number;
  let b: number;
  if (t === 'sq') {
    const k = rng.pick([1, 2, 3]);
    P = [[1, 2], [-k * k, 0]];
    roots = [k];
    a = 0;
    b = k + rng.pick([1, 2]);
  } else if (t === 'shift') {
    const p = rng.pick([2, 3, 4]);
    P = [[1, 2], [-p, 1]];
    roots = [p];
    a = rng.pick([0, 1]);
    b = p + rng.pick([1, 2]);
  } else if (t === 'lin') {
    const m = rng.pick([1, 2, 3]);
    const r = rng.int(1, 3);
    P = [[m, 1], [-m * r, 0]];
    roots = [r];
    a = r - rng.int(1, 2);
    b = r + rng.int(1, 3);
  } else {
    const r1 = rng.pick([-1, 0, 1]);
    const r2 = r1 + rng.pick([2, 3]);
    const s = rng.sign();
    P = [[s, 2], [-s * (r1 + r2), 1], [s * r1 * r2, 0]];
    a = r1 + 1;
    b = r2 + 1;
    roots = [r2];
  }
  const terms = P.filter(([c]) => c !== 0).map(([c, n]) => powTerm(c, n));
  return {
    tex: polyTex(P),
    f: (x) => terms.reduce((s, tt) => s + tt.f(x), 0),
    F: joinTerms(terms.map((tt) => tt.F)),
    Fv: (x) => terms.reduce((s, tt) => s + tt.Fv(x), 0),
    a,
    b,
    aT: `${a}`,
    bT: `${b}`,
    roots,
    rootsT: roots.map((r) => `${r}`),
  };
}

function netFigure(nc: NetCase): PlaneFigure {
  const [lo, hi] = range(nc.f, nc.a, nc.b);
  const g = niceGrid(Math.min(0, nc.a), nc.b, Math.min(0, lo * 1.15), Math.max(0, hi * 1.15));
  const zero = () => 0;
  return {
    type: 'plane',
    grid: g,
    polylines: lines(curve(nc.f, g.xMin, g.xMax, g)),
    segments: [...hatch(zero, (x) => Math.max(0, nc.f(x)), nc.a, nc.b, g, 1), ...hatch((x) => Math.min(0, nc.f(x)), zero, nc.a, nc.b, g, -1)],
  };
}

const definiteIntegral = skill({
  id: 'm31-definite-integral',
  name: 'Definite integrals and the fundamental theorem',
  description: 'Evaluate definite integrals with the fundamental theorem of calculus, use their properties, and interpret them as net area and average value.',
  outcomes: ['I2'],
  lessonId: 'm31-8-3',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1 ? rng.pick(['poly', 'poly', 'prop'] as const) : d === 2 ? rng.pick(['trans', 'trans', 'root', 'avg', 'prop2'] as const) : rng.pick(['net', 'net', 'avgApp', 'mvt', 'solveK'] as const);

    if (kind === 'poly') {
      const exps = rng.pick([[1, 0], [2, 0], [2, 1], [3, 1], [2, 1, 0], [3, 0], [3, 2]]);
      const terms = exps.map((n) => (n === 0 ? powTerm(rng.nonZero(-6, 8), 0) : powTerm((n + 1) * rng.nonZero(-2, 3), n)));
      const a = rng.int(-2, 1);
      const b = a + rng.int(1, 3);
      const r = ftcSteps(terms, a, b);
      const f = joinTerms(terms.map((t) => t.tex));
      return {
        prompt: `Evaluate $\\displaystyle\\int_{${a}}^{${b}} ${wrap(f)}\\,dx$.`,
        parts: [part({ kind: 'numeric', value: r.value })],
        hints: [FTC, 'Find an antiderivative $F$ (no $+ C$ is needed), then compute $F(b) - F(a)$.'],
        solution: [...r.steps.slice(0, 3), `$\\displaystyle\\int_{${a}}^{${b}} ${wrap(f)}\\,dx = F(${b}) - F(${a}) = ${tn(r.Fb)} - ${par(r.Fa)} = ${tn(r.value)}$`],
        calculator: false,
      };
    }

    if (kind === 'prop') {
      const t = rng.pick(['add', 'sub', 'rev', 'scale'] as const);
      const a = rng.int(-2, 2);
      const b = a + rng.int(2, 4);
      const c = b + rng.int(1, 4);
      const A = rng.nonZero(-8, 12);
      const B = rng.nonZero(-8, 12);
      const I = (p: number | string, q: number | string, g = 'f') => `\\displaystyle\\int_{${p}}^{${q}} ${g}(x)\\,dx`;
      if (t === 'add') {
        return {
          prompt: `Given $${I(a, b)} = ${A}$ and $${I(b, c)} = ${B}$, find $${I(a, c)}$.`,
          parts: [part({ kind: 'numeric', value: A + B })],
          hints: ['Integrals over adjacent intervals add: $\\int_a^b f + \\int_b^c f = \\int_a^c f$.', 'The interval $[' + a + ', ' + c + ']$ is made of $[' + a + ', ' + b + ']$ and $[' + b + ', ' + c + ']$.'],
          solution: [`$${I(a, c)} = ${I(a, b)} + ${I(b, c)}$`, `$= ${A} + ${par(B)} = ${A + B}$`],
          calculator: false,
        };
      }
      if (t === 'sub') {
        return {
          prompt: `Given $${I(a, c)} = ${A}$ and $${I(a, b)} = ${B}$, find $${I(b, c)}$.`,
          parts: [part({ kind: 'numeric', value: A - B })],
          hints: ['Integrals over adjacent intervals add: $\\int_a^b f + \\int_b^c f = \\int_a^c f$.', 'Solve that equation for the unknown integral.'],
          solution: [`$${I(a, b)} + ${I(b, c)} = ${I(a, c)}$`, `$${B} + ${I(b, c)} = ${A}$, so $${I(b, c)} = ${A} - ${par(B)} = ${A - B}$`],
          calculator: false,
        };
      }
      if (t === 'rev') {
        const k = rng.pick([1, 2, 3, -2]);
        return {
          prompt: `Given $${I(a, b)} = ${A}$, find $\\displaystyle\\int_{${b}}^{${a}} ${cf(k)}f(x)\\,dx$.`,
          parts: [part({ kind: 'numeric', value: -k * A })],
          hints: ['Reversing the limits changes the sign: $\\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx$.', 'A constant factor comes out of the integral: $\\int k f(x)\\,dx = k\\int f(x)\\,dx$.'],
          solution: [`$\\displaystyle\\int_{${b}}^{${a}} ${cf(k)}f(x)\\,dx = ${cf(k)}\\int_{${b}}^{${a}} f(x)\\,dx = ${cf(-k)}\\int_{${a}}^{${b}} f(x)\\,dx$`, `$= ${cdot(-k)}${par(A)} = ${-k * A}$`],
          calculator: false,
        };
      }
      const k = rng.pick([2, 3, 4, -3]);
      const m = rng.nonZero(-4, 5);
      const v = k * A + m * (b - a);
      return {
        prompt: `Given $${I(a, b)} = ${A}$, find $\\displaystyle\\int_{${a}}^{${b}} \\left(${cf(k)}f(x) ${pm(m)}\\right)dx$.`,
        parts: [part({ kind: 'numeric', value: v })],
        hints: ['Split the integral and take the constant factor out: $\\int (kf + m)\\,dx = k\\int f\\,dx + \\int m\\,dx$.', `$\\int_{${a}}^{${b}} ${m}\\,dx$ is the area of a rectangle of height $${m}$ and width $${b - a}$ (or use $F(x) = ${m}x$).`],
        solution: [
          `$\\displaystyle\\int_{${a}}^{${b}} \\left(${cf(k)}f(x) ${pm(m)}\\right)dx = ${cf(k)}\\int_{${a}}^{${b}} f(x)\\,dx + \\int_{${a}}^{${b}} ${tn(m)}\\,dx$`,
          `$= ${cdot(k)}${par(A)} + ${tn(m)}(${b} - ${par(a)}) = ${k * A} ${pm(m * (b - a))} = ${v}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'trans') {
      const c = rng.pick([1, 1, 2, 3, 4, -2]);
      const o = transDef(rng, c);
      const v = valuePart(o.value, { tex: o.exactTex, exact: o.exact, fns: o.fns });
      return {
        prompt: `Evaluate $\\displaystyle\\int_{${o.aT}}^{${o.bT}} ${o.f}\\,dx$.${v.note}`,
        parts: [v.part],
        hints: [FTC, BASIC_RULES],
        solution: [`An antiderivative is $F(x) = ${o.F}$.`, `$\\displaystyle\\int_{${o.aT}}^{${o.bT}} ${o.f}\\,dx = \\Big[${o.F}\\Big]_{${o.aT}}^{${o.bT}} = ${o.evalTex}$`, `The integral equals $${v.show}$.`],
      };
    }

    if (kind === 'root') {
      const opts: Array<[number, Array<[number, number]>]> = [
        [0.5, [[1, 4], [0, 4], [1, 9], [4, 9], [0, 9]]],
        [-0.5, [[1, 4], [1, 9], [4, 9], [4, 16]]],
        [-2, [[1, 2], [1, 3], [1, 4], [2, 4]]],
        [-3, [[1, 2], [1, 3]]],
        [1 / 3, [[0, 8], [1, 8], [0, 1]]],
      ];
      const [n, ivs] = rng.pick(opts);
      const [a, b] = rng.pick(ivs);
      const c = n === 0.5 || n === 1 / 3 ? rng.pick([1, 2, 3, 4, 6]) : rng.pick([1, 2, 3, 4, 6, 8]);
      const terms = [powTerm(c, n)];
      if (rng.chance(0.5)) terms.push(rng.chance(0.5) ? powTerm(rng.nonZero(-4, 5), 0) : powTerm(2 * rng.nonZero(-2, 3), 1));
      const f = joinTerms(terms.map((t) => t.tex));
      const r = ftcSteps(terms, a, b);
      const v = valuePart(r.value);
      return {
        prompt: `Evaluate $\\displaystyle\\int_{${a}}^{${b}} ${wrap(f)}\\,dx$.${v.note}`,
        parts: [v.part],
        hints: ['Write each root or reciprocal as a power of $x$, then use the power rule to find an antiderivative.', FTC],
        solution: [`Rewrite and integrate: $${terms[0].why}$`, ...r.steps.slice(0, 3), `$\\displaystyle\\int_{${a}}^{${b}} ${wrap(f)}\\,dx = ${tn(r.Fb)} - ${par(r.Fa)} = ${v.show}$`],
        calculator: false,
      };
    }

    if (kind === 'avg') {
      const exps = rng.pick([[2, 0], [2, 1], [1, 0], [2, 1, 0], [3, 0]]);
      const terms = exps.map((n) => (n === 0 ? powTerm(rng.nonZero(-4, 8), 0) : powTerm(rng.nonZero(-3, 4) * (n === 1 ? 2 : n === 2 ? 3 : 4), n)));
      const a = rng.pick([0, 0, 1, -1]);
      const b = a + rng.pick([2, 3, 4]);
      const r = ftcSteps(terms, a, b);
      const avg = snap(r.value / (b - a));
      const v = valuePart(avg);
      const f = joinTerms(terms.map((t) => t.tex));
      return {
        prompt: `Find the average value of $f(x) = ${f}$ on the interval $[${a}, ${b}]$.${v.note}`,
        parts: [v.part],
        hints: ['Average value: $f_{\\text{avg}} = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$.', 'Evaluate the integral with the fundamental theorem, then divide by the length of the interval.'],
        solution: [...r.steps, `$f_{\\text{avg}} = \\dfrac{1}{${b} - ${par(a)}}(${tn(r.value)}) = ${v.show}$`],
        calculator: false,
      };
    }

    if (kind === 'prop2') {
      const a = rng.int(-1, 2);
      const b = a + rng.int(2, 5);
      const A = rng.nonZero(-6, 10);
      const B = rng.nonZero(-6, 10);
      const p = rng.pick([2, 3, -1, 4]);
      const q = rng.pick([-2, -3, 1, 5]);
      const m = rng.int(-3, 4);
      const v = p * A + q * B + m * (b - a);
      const I = (g: string) => `\\displaystyle\\int_{${a}}^{${b}} ${g}(x)\\,dx`;
      const integrand = joinTerms([`${cf(p)}f(x)`, `${cf(q)}g(x)`, m ? tn(m) : '']);
      return {
        prompt: `Given $${I('f')} = ${A}$ and $${I('g')} = ${B}$, find $\\displaystyle\\int_{${a}}^{${b}} \\left(${integrand}\\right)dx$.`,
        parts: [part({ kind: 'numeric', value: v })],
        hints: ['The integral of a sum is the sum of the integrals, and constant factors come out.', `A constant integrates to the constant times the length of the interval: $\\int_{${a}}^{${b}} k\\,dx = k(${b} - ${par(a)})$.`],
        solution: [
          `$= ${cf(p)}${I('f')} ${q < 0 ? '-' : '+'} ${cf(Math.abs(q))}${I('g')}${m ? ` ${pm(m)}(${b} - ${par(a)})` : ''}$`,
          `$= ${cdot(p)}${par(A)} ${q < 0 ? '-' : '+'} ${cdot(Math.abs(q))}${par(B)}${m ? ` ${pm(m * (b - a))}` : ''} = ${v}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'net') {
      const nc = netCase(rng);
      const net = snap(nc.Fv(nc.b) - nc.Fv(nc.a));
      const pts = [nc.a, ...nc.roots, nc.b];
      const ptsT = [nc.aT, ...nc.rootsT, nc.bT];
      const pieces = pts.slice(1).map((x, i) => snap(nc.Fv(x) - nc.Fv(pts[i])));
      const total = snap(pieces.reduce((s, p) => s + Math.abs(p), 0));
      const v1 = valuePart(net, { label: '(a) Integral $=$' });
      const v2 = valuePart(total, { label: '(b) Total area $=$' });
      const sec = (i: number) => `\\displaystyle\\int_{${ptsT[i]}}^{${ptsT[i + 1]}} f(x)\\,dx = ${tn(pieces[i])}`;
      return {
        prompt: `The graph shows $f(x) = ${nc.tex}$ on $[${nc.aT}, ${nc.bT}]$.\n\n(a) Evaluate $\\displaystyle\\int_{${nc.aT}}^{${nc.bT}} f(x)\\,dx$. (b) Find the total area between the graph and the $x$-axis on this interval.${v1.note || v2.note ? ' Give exact values or round to the nearest hundredth.' : ''}`,
        figure: netFigure(nc),
        parts: [v1.part, v2.part],
        hints: [
          'The definite integral is the net area: area above the $x$-axis counts as positive, area below as negative.',
          `For the total area, split the interval where $f(x) = 0$ (at $x = ${nc.rootsT.join(', ')}$) and add the absolute values of the pieces.`,
        ],
        solution: [
          `An antiderivative is $F(x) = ${nc.F}$.`,
          `(a) $\\displaystyle\\int_{${nc.aT}}^{${nc.bT}} f(x)\\,dx = F(${nc.bT}) - F(${nc.aT}) = ${v1.show}$`,
          `$f(x) = 0$ at $x = ${nc.rootsT.join(', ')}$. On each piece: ${pieces.map((_, i) => `$${sec(i)}$`).join(' and ')}.`,
          `(b) Total area $= ${pieces.map((p) => `\\left|${tn(p)}\\right|`).join(' + ')} = ${v2.show}$ square units.`,
        ],
      };
    }

    if (kind === 'avgApp') {
      const ctx = rng.pick(['temp', 'drug', 'vel'] as const);
      if (ctx === 'temp') {
        const a = rng.pick([0.25, 0.5]);
        const T = 12;
        const bb = rng.pick([3, 4, 5]) * (a === 0.25 ? 1 : 2) / 1;
        const c0 = rng.int(-8, 6);
        const terms = [powTerm(-a, 2, 't'), powTerm(bb, 1, 't'), powTerm(c0, 0, 't')].filter((t) => t.tex !== '0');
        const r = ftcSteps(terms, 0, T);
        const avg = snap(r.value / T);
        const v = valuePart(avg, { suffix: '°C', display: 'decimal' });
        const city = rng.pick(['Brookfield', 'Riverton', 'Stonebridge', 'Clearwater', 'Pinewood']);
        return {
          prompt: `On a spring day in ${city}, the temperature $t$ hours after 6:00 a.m. is modelled by $T(t) = ${joinTerms(terms.map((x) => x.tex))}$ degrees Celsius, for $0 \\le t \\le 12$. Find the average temperature from 6:00 a.m. to 6:00 p.m.${v.note}`,
          parts: [v.part],
          hints: ['Average value: $T_{\\text{avg}} = \\dfrac{1}{b - a}\\displaystyle\\int_a^b T(t)\\,dt$.', 'Here $a = 0$ and $b = 12$.'],
          solution: [`$T_{\\text{avg}} = \\dfrac{1}{12}\\displaystyle\\int_0^{12} T(t)\\,dt$`, `An antiderivative is $${r.F}$, which equals $${tn(r.Fb)}$ at $t = 12$ and $0$ at $t = 0$.`, `$T_{\\text{avg}} = \\dfrac{${tn(r.value)}}{12} = ${v.show}$`, `The average temperature is ${fmt(avg, 2)} °C.`],
        };
      }
      if (ctx === 'drug') {
        const k = rng.pick([4, 6, 8]);
        const T = rng.pick([2, 3, k / 2]);
        const terms = [powTerm(k, 1, 't'), powTerm(-1, 2, 't')];
        const r = ftcSteps(terms, 0, T);
        const avg = snap(r.value / T);
        const v = valuePart(avg, { suffix: 'mg/L', display: 'decimal' });
        return {
          prompt: `The concentration of a medication in a patient's blood $t$ hours after an injection is $C(t) = ${k}t - t^{2}$ mg/L. Find the average concentration during the first ${T} hours.${v.note}`,
          parts: [v.part],
          hints: ['Average value: $C_{\\text{avg}} = \\dfrac{1}{b - a}\\displaystyle\\int_a^b C(t)\\,dt$.', `Integrate from $t = 0$ to $t = ${T}$, then divide by ${T}.`],
          solution: [`$C_{\\text{avg}} = \\dfrac{1}{${T}}\\displaystyle\\int_0^{${T}} (${k}t - t^{2})\\,dt$`, `An antiderivative is $${r.F}$; at $t = ${T}$ it equals $${tn(r.Fb)}$.`, `$C_{\\text{avg}} = \\dfrac{${tn(r.value)}}{${T}} = ${v.show}$`, `The average concentration is about ${fmt(avg, 2)} mg/L.`],
        };
      }
      const p = rng.pick([2, 3, 4, 6]);
      const T = rng.pick([2, 3, 4]);
      const q = rng.pick([1, 2, 3, 4]);
      const terms = [powTerm(3 * q, 2, 't'), powTerm(p * 2, 1, 't')];
      const r = ftcSteps(terms, 0, T);
      const avg = snap(r.value / T);
      const v = valuePart(avg, { suffix: 'm/s', display: 'decimal' });
      return {
        prompt: `A drone's velocity is $v(t) = ${joinTerms(terms.map((x) => x.tex))}$ m/s, $t$ seconds after take-off. Find its average velocity over the first ${T} seconds.${v.note}`,
        parts: [v.part],
        hints: ['Average value: $v_{\\text{avg}} = \\dfrac{1}{b - a}\\displaystyle\\int_a^b v(t)\\,dt$ (the displacement divided by the time).', `Integrate from $t = 0$ to $t = ${T}$, then divide by ${T}.`],
        solution: [`The displacement is $\\displaystyle\\int_0^{${T}} v(t)\\,dt = \\Big[${r.F}\\Big]_0^{${T}} = ${tn(r.value)}$ m.`, `$v_{\\text{avg}} = \\dfrac{${tn(r.value)}}{${T}} = ${v.show}$`, `The average velocity is ${fmt(avg, 2)} m/s.`],
      };
    }

    if (kind === 'mvt') {
      const b = rng.pick([2, 3, 4, 6]);
      const c0 = rng.int(0, 4);
      const coef = rng.pick([1, 3]);
      const terms = [powTerm(coef, 2), ...(c0 ? [powTerm(c0, 0)] : [])];
      const r = ftcSteps(terms, 0, b);
      const avg = snap(r.value / b);
      const c = b / Math.sqrt(3);
      const v1 = valuePart(avg, { label: '(a) $f_{\\text{avg}} =$' });
      // c = b/sqrt(3) = (b/3)sqrt(3)
      const cTex = b % 3 === 0 ? `${cf(b / 3)}\\sqrt{3}` : `\\dfrac{${b}\\sqrt{3}}{3}`;
      const cTyped = b % 3 === 0 ? `${b === 3 ? '' : b / 3}sqrt(3)` : `${b}sqrt(3)/3`;
      const v2 = valuePart(c, { label: '(b) $c =$', tex: cTex, exact: cTyped });
      const c2 = tn((avg - c0) / coef);
      const solveC =
        c0 === 0 && coef === 1
          ? `$c^{2} = ${c2}$.`
          : coef === 1
            ? `$c^{2} + ${c0} = ${tn(avg)}$, so $c^{2} = ${c2}$.`
            : `$${joinTerms([`${coef}c^{2}`, c0 ? tn(c0) : ''])} = ${tn(avg)}$, so $${coef}c^{2} = ${tn(avg - c0)}$ and $c^{2} = ${c2}$.`;
      const f = joinTerms(terms.map((t) => t.tex));
      return {
        prompt: `Let $f(x) = ${f}$ on $[0, ${b}]$. (a) Find the average value of $f$. (b) Find the number $c$ in $[0, ${b}]$ with $f(c) = f_{\\text{avg}}$.${v2.note}`,
        parts: [v1.part, v2.part],
        hints: ['$f_{\\text{avg}} = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$.', 'Then solve $f(c) = f_{\\text{avg}}$ and keep the solution that lies in the interval.'],
        solution: [
          ...r.steps.slice(0, 2),
          `(a) $f_{\\text{avg}} = \\dfrac{1}{${b}}(${tn(r.value)}) = ${tn(avg)}$`,
          solveC,
          `(b) $c = ${b === 3 ? '' : `\\sqrt{${c2}} = `}${v2.show}$ (the negative root is not in the interval).`,
        ],
      };
    }

    // solveK: find the upper limit
    if (rng.chance(0.6)) {
      const k = rng.int(2, 6);
      const p = rng.int(1, 5);
      const V = k * k + p * k;
      return {
        prompt: `Find the value of $k > 0$ for which $\\displaystyle\\int_0^{k} (2x + ${p})\\,dx = ${V}$.`,
        parts: [part({ kind: 'numeric', value: k }, { label: '$k =$' })],
        hints: ['Evaluate the integral in terms of $k$ with the fundamental theorem.', 'You get a quadratic equation in $k$. Solve it and keep the positive root.'],
        solution: [
          `$\\displaystyle\\int_0^{k} (2x + ${p})\\,dx = \\Big[x^{2} + ${p}x\\Big]_0^{k} = k^{2} + ${p}k$`,
          `$k^{2} + ${p}k = ${V}$, so $k^{2} + ${p}k - ${V} = 0$ and $(k - ${k})(k + ${k + p}) = 0$.`,
          `$k = ${k}$ or $k = ${-(k + p)}$; since $k > 0$, $k = ${k}$.`,
        ],
      };
    }
    const c = rng.pick([1, 2, 3, 4]);
    const m = rng.pick([1, 2, 3]);
    const V = c * m;
    const v = valuePart(Math.exp(m), { tex: `e^{${m}}`, exact: `e^${m}`, label: '$k =$' });
    return {
      prompt: `Find the value of $k > 1$ for which $\\displaystyle\\int_1^{k} ${c === 1 ? '\\dfrac{1}{x}' : `\\dfrac{${c}}{x}`}\\,dx = ${V}$.${v.note}`,
      parts: [v.part],
      hints: ['$\\int \\frac{1}{x}\\,dx = \\ln x$ for $x > 0$, and $\\ln 1 = 0$.', 'You get an equation $\\ln k = $ (a number). Undo the logarithm with $e$.'],
      solution: [`$\\displaystyle\\int_1^{k} ${c === 1 ? '\\dfrac{1}{x}' : `\\dfrac{${c}}{x}`}\\,dx = ${cf(c)}\\ln k - ${cf(c)}\\ln 1 = ${cf(c)}\\ln k$`, `$${cf(c)}\\ln k = ${V}$, so $\\ln k = ${m}$`, `$k = ${v.show}$`],
    };
  },
});

// ---------------------------------------------------------------------------
// 8.4 — Substitution
// ---------------------------------------------------------------------------

interface Sub {
  /** Integrand (LaTeX). */
  f: string;
  /** u in terms of x (LaTeX). */
  u: string;
  /** "du = ... dx" with any rearrangement (LaTeX sentence piece). */
  du: string;
  /** The integral in u, with optional limits. */
  swap: (lo?: string, hi?: string) => string;
  /** Antiderivative in u (LaTeX). */
  H: string;
  /** Antiderivative in x (LaTeX) and typed. */
  G: string;
  Gt: string;
  Gv: (x: number) => number;
  uv: (x: number) => number;
  /** H at a value of u (LaTeX). */
  Hat: (uT: string) => string;
  Hv: (u: number) => number;
  /** A natural starting point for an initial condition. */
  x0: number;
  x0T: string;
  /** G(x0) as LaTeX, its value, and typed (for constants that are not rational). */
  G0T: string;
  /** Limits for a definite integral: x-limits (number and LaTeX) and the u-limits as LaTeX. */
  lims: Array<{ a: number; b: number; aT: string; bT: string; uaT: string; ubT: string }>;
  /** The exact value of a definite integral (LaTeX), with a typed form when it is not rational. */
  exact: (ua: number, ub: number) => { tex: string; typed?: string; fns?: boolean };
  /** Whether the u-limits are rational (so they can be asked for). */
  uRational: boolean;
  /** Wrong choices of u, and the integrand's right and wrong u-forms for multiple choice. */
  wrongU: string[];
  wrongSwap: string[];
  dom?: string;
}

const uBase = (x: string) => `(${x})`;

function subCase(rng: Rng, exactDu: boolean): Sub {
  const fam = exactDu
    ? rng.pick(['chain', 'chain', 'exp', 'trig', 'lin', 'ln'] as const)
    : rng.pick(['chain', 'chain', 'sqrt', 'invsqrt', 'log', 'exp', 'xexp', 'trig', 'lin', 'ln'] as const);

  if (fam === 'chain') {
    const m = rng.pick([2, 2, 3]);
    const p = rng.int(1, 4);
    const q = rng.pick([2, 3, 4].filter((x) => m === 2 || x <= 3));
    const k = exactDu ? m : rng.pick([1, 3, 4, 5, 6].filter((x) => x !== m));
    const s = k / m;
    const c = s / (q + 1);
    const xm = m === 2 ? 'x^{2}' : 'x^{3}';
    const inner = `${xm} + ${p}`;
    const innerT = `x^${m} + ${p}`;
    const outside = `${cf(k)}${m === 2 ? 'x' : 'x^{2}'}`;
    const lims =
      m === 2
        ? [
            { a: 0, b: 1, aT: '0', bT: '1', uaT: `${p}`, ubT: `${p + 1}` },
            { a: 0, b: 2, aT: '0', bT: '2', uaT: `${p}`, ubT: `${p + 4}` },
            { a: 1, b: 2, aT: '1', bT: '2', uaT: `${p + 1}`, ubT: `${p + 4}` },
          ]
        : [{ a: 0, b: 1, aT: '0', bT: '1', uaT: `${p}`, ubT: `${p + 1}` }];
    return {
      f: `${outside}(${inner})^{${q}}`,
      u: inner,
      du: `$du = ${m}${m === 2 ? 'x' : 'x^{2}'}\\,dx$${s === 1 ? '' : `, so $${m === 2 ? 'x' : 'x^{2}'}\\,dx = \\frac{1}{${m}}\\,du$`}`,
      swap: (lo, hi) => `${s === 1 ? '' : cf(s)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} u^{${q}}\\,du`,
      H: `${cf(c)}u^{${q + 1}}`,
      G: `${cf(c)}(${inner})^{${q + 1}}`,
      Gt: `${cft(c)}(${innerT})^${q + 1}`,
      Gv: (x) => c * (x ** m + p) ** (q + 1),
      uv: (x) => x ** m + p,
      Hat: (uT) => `${cf(c)}(${uT})^{${q + 1}}`,
      Hv: (u) => c * u ** (q + 1),
      x0: 0,
      x0T: '0',
      G0T: `${cf(c)}(${p})^{${q + 1}}`,
      lims,
      exact: (ua, ub) => ({ tex: tn(c * (ub ** (q + 1) - ua ** (q + 1))) }),
      uRational: true,
      wrongU: [`(${inner})^{${q}}`, outside, 'x'],
      wrongSwap: [`\\int ${outside}u^{${q}}\\,du`, `\\int u^{${q}}\\,dx`, `${cf(s * m)}\\int u^{${q}}\\,du`, `${cf(1 / (m * (s === 1 ? 1 : m)))}\\int u^{${q}}\\,du`],
    };
  }

  if (fam === 'sqrt' || fam === 'invsqrt') {
    const [p, b] = rng.pick([[9, 4], [16, 3], [36, 8]] as const);
    const ub = p + b * b;
    const r = Math.sqrt(ub);
    const rp = Math.sqrt(p);
    const lims = [{ a: 0, b, aT: '0', bT: `${b}`, uaT: `${p}`, ubT: `${ub}` }];
    if (fam === 'sqrt') {
      const k = rng.pick([1, 2, 3, 6]);
      const s = k / 2;
      const c = k / 3;
      return {
        f: `${cf(k)}x\\sqrt{x^{2} + ${p}}`,
        u: `x^{2} + ${p}`,
        du: `$du = 2x\\,dx$${s === 1 ? '' : `, so $x\\,dx = \\frac{1}{2}\\,du$`}`,
        swap: (lo, hi) => `${s === 1 ? '' : cf(s)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} u^{1/2}\\,du`,
        H: `${cf(c)}u^{3/2}`,
        G: `${cf(c)}(x^{2} + ${p})^{3/2}`,
        Gt: `${cft(c)}(x^2 + ${p})^(3/2)`,
        Gv: (x) => c * (x * x + p) ** 1.5,
        uv: (x) => x * x + p,
        Hat: (uT) => `${cf(c)}(${uT})^{3/2}`,
        Hv: (u) => c * u ** 1.5,
        x0: 0,
        x0T: '0',
        G0T: `${cf(c)}(${p})^{3/2}`,
        lims,
        exact: () => ({ tex: tn(c * (r ** 3 - rp ** 3)) }),
        uRational: true,
        wrongU: [`\\sqrt{x^{2} + ${p}}`, `${cf(k)}x`, 'x^{2}'],
        wrongSwap: [`\\int ${cf(k)}x\\sqrt{u}\\,du`, `\\int \\sqrt{u}\\,dx`, `${cf(2 * k)}\\int \\sqrt{u}\\,du`],
      };
    }
    const k = rng.pick([1, 2, 3, 4]);
    const s = k / 2;
    return {
      f: `\\dfrac{${cf(k)}x}{\\sqrt{x^{2} + ${p}}}`,
      u: `x^{2} + ${p}`,
      du: `$du = 2x\\,dx$${s === 1 ? '' : `, so $x\\,dx = \\frac{1}{2}\\,du$`}`,
      swap: (lo, hi) => `${s === 1 ? '' : cf(s)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} u^{-1/2}\\,du`,
      H: `${cf(k)}\\sqrt{u}`,
      G: `${cf(k)}\\sqrt{x^{2} + ${p}}`,
      Gt: `${cft(k)}sqrt(x^2 + ${p})`,
      Gv: (x) => k * Math.sqrt(x * x + p),
      uv: (x) => x * x + p,
      Hat: (uT) => `${cf(k)}\\sqrt{${uT}}`,
      Hv: (u) => k * Math.sqrt(u),
      x0: 0,
      x0T: '0',
      G0T: `${cf(k)}\\sqrt{${p}}`,
      lims,
      exact: () => ({ tex: tn(k * (r - rp)) }),
      uRational: true,
      wrongU: [`\\sqrt{x^{2} + ${p}}`, `${cf(k)}x`, 'x^{2}'],
      wrongSwap: [`\\int \\dfrac{${cf(k)}x}{\\sqrt{u}}\\,du`, `\\int \\dfrac{1}{\\sqrt{u}}\\,dx`, `${cf(2 * k)}\\int \\dfrac{1}{\\sqrt{u}}\\,du`],
    };
  }

  if (fam === 'log') {
    const m = rng.pick([2, 2, 3]);
    const p = rng.int(1, 9);
    const k = rng.pick([1, 2, 3, 4, 6]);
    const c = k / m;
    const xm = m === 2 ? 'x^{2}' : 'x^{3}';
    const outside = `${cf(k)}${m === 2 ? 'x' : 'x^{2}'}`;
    const lims = [1, 2].map((b) => ({ a: 0, b, aT: '0', bT: `${b}`, uaT: `${p}`, ubT: `${b ** m + p}` }));
    return {
      f: `\\dfrac{${outside}}{${xm} + ${p}}`,
      u: `${xm} + ${p}`,
      du: `$du = ${m}${m === 2 ? 'x' : 'x^{2}'}\\,dx$${c * m === 1 ? '' : `, so $${m === 2 ? 'x' : 'x^{2}'}\\,dx = \\frac{1}{${m}}\\,du$`}`,
      swap: (lo, hi) => `${cf(c)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} \\dfrac{1}{u}\\,du`,
      H: `${cf(c)}\\ln u`,
      G: `${cf(c)}\\ln(${xm} + ${p})`,
      Gt: `${cft(c)}ln(x^${m} + ${p})`,
      Gv: (x) => c * Math.log(x ** m + p),
      uv: (x) => x ** m + p,
      Hat: (uT) => `${cf(c)}\\ln ${uT}`,
      Hv: (u) => c * Math.log(u),
      x0: 0,
      x0T: '0',
      G0T: p === 1 ? '0' : `${cf(c)}\\ln ${p}`,
      lims,
      exact: (ua, ub) => {
        const ratio = toFrac(ub / ua, 1000)!;
        const arg = ratio.d === 1 ? `${ratio.n}` : `\\frac{${ratio.n}}{${ratio.d}}`;
        return { tex: `${cf(c)}\\ln ${arg}`, typed: `${cft(c)}ln(${ratio.n}${ratio.d === 1 ? '' : `/${ratio.d}`})`, fns: true };
      },
      uRational: true,
      wrongU: [outside, `\\ln(${xm} + ${p})`, 'x'],
      wrongSwap: [`\\int \\dfrac{${outside}}{u}\\,du`, `\\int \\dfrac{1}{u}\\,dx`, `${cf(c * m * m)}\\int \\dfrac{1}{u}\\,du`],
      dom: '',
    };
  }

  if (fam === 'exp') {
    const a = rng.pick([2, 3, 4, 5, -2]);
    const k = exactDu ? a : rng.pick([1, 2, 3, 6].filter((x) => x !== a));
    const c = k / a;
    const useLn = rng.chance(0.5) && a > 0;
    const lims = useLn ? [{ a: 0, b: Math.log(2), aT: '0', bT: '\\ln 2', uaT: '0', ubT: `${a}\\ln 2` }] : [{ a: 0, b: 1, aT: '0', bT: '1', uaT: '0', ubT: `${a}` }];
    return {
      f: `${cf(k)}e^{${a}x}`,
      u: `${a}x`,
      du: `$du = ${a}\\,dx$${c === 1 ? '' : `, so $dx = ${tn(1 / a)}\\,du$`}`,
      swap: (lo, hi) => `${cf(c)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} e^{u}\\,du`,
      H: `${cf(c)}e^{u}`,
      G: `${cf(c)}e^{${a}x}`,
      Gt: `${cft(c)}e^(${a}x)`,
      Gv: (x) => c * Math.exp(a * x),
      uv: (x) => a * x,
      Hat: (uT) => `${cf(c)}e^{${uT}}`,
      Hv: (u) => c * Math.exp(u),
      x0: 0,
      x0T: '0',
      G0T: tn(c),
      lims,
      exact: (ua, ub) => {
        if (useLn) return { tex: tn(c * (2 ** a - 1)) };
        void ua;
        void ub;
        return { tex: scaled(c, `e^{${a}} - 1`), typed: `${cft(c)}(e^${a} - 1)` };
      },
      uRational: !useLn,
      wrongU: [`e^{${a}x}`, `${a}`, 'x'],
      wrongSwap: [`${cf(k * a)}\\int e^{u}\\,du`, `\\int ${cf(k)}e^{u}\\,dx`, `${cf(k)}\\int e^{u}\\,du`],
    };
  }

  if (fam === 'xexp') {
    const m = rng.pick([2, 2, 3]);
    const k = rng.pick([1, 2, 3, 4, 6]);
    const c = k / m;
    const xm = m === 2 ? 'x^{2}' : 'x^{3}';
    const outside = `${cf(k)}${m === 2 ? 'x' : 'x^{2}'}`;
    const lims = [{ a: 0, b: 1, aT: '0', bT: '1', uaT: '0', ubT: '1' }];
    return {
      f: `${outside}e^{${xm}}`,
      u: xm,
      du: `$du = ${m}${m === 2 ? 'x' : 'x^{2}'}\\,dx$${c * m === 1 ? '' : `, so $${m === 2 ? 'x' : 'x^{2}'}\\,dx = \\frac{1}{${m}}\\,du$`}`,
      swap: (lo, hi) => `${cf(c)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} e^{u}\\,du`,
      H: `${cf(c)}e^{u}`,
      G: `${cf(c)}e^{${xm}}`,
      Gt: `${cft(c)}e^(x^${m})`,
      Gv: (x) => c * Math.exp(x ** m),
      uv: (x) => x ** m,
      Hat: (uT) => `${cf(c)}e^{${uT}}`,
      Hv: (u) => c * Math.exp(u),
      x0: 0,
      x0T: '0',
      G0T: tn(c),
      lims,
      exact: () => ({ tex: scaled(c, 'e - 1'), typed: c === 1 ? 'e - 1' : `${cft(c)}(e - 1)` }),
      uRational: true,
      wrongU: [`e^{${xm}}`, outside, 'x'],
      wrongSwap: [`\\int ${outside}e^{u}\\,du`, `\\int e^{u}\\,dx`, `${cf(k * m)}\\int e^{u}\\,du`],
    };
  }

  if (fam === 'trig') {
    const n = rng.pick([1, 2, 3, 4]);
    const useSin = rng.chance(0.5); // u = sin x (integrand cos x sin^n x) or u = cos x
    const k = exactDu ? (useSin ? 1 : -1) : rng.pick([1, 2, 3, 4, 6]);
    const c = (useSin ? k : -k) / (n + 1);
    const pw = n === 1 ? '' : `^{${n}}`;
    const f = useSin ? `${cf(k)}\\cos x\\sin${pw} x` : `${cf(k)}\\sin x\\cos${pw} x`;
    const fnT = useSin ? 'sin' : 'cos';
    const lims = useSin
      ? [
          { a: 0, b: Math.PI / 2, aT: '0', bT: '\\frac{\\pi}{2}', uaT: '0', ubT: '1' },
          { a: 0, b: Math.PI / 6, aT: '0', bT: '\\frac{\\pi}{6}', uaT: '0', ubT: '\\frac{1}{2}' },
        ]
      : [
          { a: 0, b: Math.PI / 2, aT: '0', bT: '\\frac{\\pi}{2}', uaT: '1', ubT: '0' },
          { a: 0, b: Math.PI / 3, aT: '0', bT: '\\frac{\\pi}{3}', uaT: '1', ubT: '\\frac{1}{2}' },
        ];
    const swapC = useSin ? k : -k;
    return {
      f,
      u: `\\${fnT} x`,
      du: useSin ? '$du = \\cos x\\,dx$' : '$du = -\\sin x\\,dx$, so $\\sin x\\,dx = -du$',
      swap: (lo, hi) => `${cf(swapC)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} u^{${n}}\\,du`,
      H: `${cf(c)}u^{${n + 1}}`,
      G: `${cf(c)}\\${fnT}^{${n + 1}} x`,
      Gt: `${cft(c)}${fnT}(x)^${n + 1}`,
      Gv: (x) => c * (useSin ? Math.sin(x) : Math.cos(x)) ** (n + 1),
      uv: (x) => (useSin ? Math.sin(x) : Math.cos(x)),
      Hat: (uT) => `${cf(c)}\\left(${uT}\\right)^{${n + 1}}`,
      Hv: (u) => c * u ** (n + 1),
      x0: 0,
      x0T: '0',
      G0T: useSin ? '0' : tn(c),
      lims,
      exact: (ua, ub) => ({ tex: tn(c * (ub ** (n + 1) - ua ** (n + 1))) }),
      uRational: true,
      wrongU: useSin ? ['\\cos x', `\\sin${pw} x`, 'x'] : ['\\sin x', `\\cos${pw} x`, 'x'],
      wrongSwap: [`\\int ${useSin ? '\\cos x' : '\\sin x'}\\,u^{${n}}\\,du`, `\\int u^{${n}}\\,dx`, `${cf(-swapC)}\\int u^{${n}}\\,du`],
    };
  }

  if (fam === 'lin') {
    const a = rng.pick([2, 3, 4, 5]);
    const bb = rng.nonZero(-3, 3);
    const n = rng.pick([2, 3, 4]);
    const k = exactDu ? a : rng.pick([1, 2, 3, 6].filter((x) => x !== a));
    const c = k / (a * (n + 1));
    const inner = polyTex([[a, 1], [bb, 0]]);
    const innerT = polyTxt([[a, 1], [bb, 0]]);
    const lims = [{ a: 0, b: 1, aT: '0', bT: '1', uaT: `${bb}`, ubT: `${a + bb}` }];
    return {
      f: `${cf(k)}(${inner})^{${n}}`,
      u: inner,
      du: `$du = ${a}\\,dx$${k === a ? '' : `, so $dx = ${tn(1 / a)}\\,du$`}`,
      swap: (lo, hi) => `${cf(k / a)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} u^{${n}}\\,du`,
      H: `${cf(c)}u^{${n + 1}}`,
      G: `${cf(c)}(${inner})^{${n + 1}}`,
      Gt: `${cft(c)}(${innerT})^${n + 1}`,
      Gv: (x) => c * (a * x + bb) ** (n + 1),
      uv: (x) => a * x + bb,
      Hat: (uT) => `${cf(c)}${uBase(uT)}^{${n + 1}}`,
      Hv: (u) => c * u ** (n + 1),
      x0: 0,
      x0T: '0',
      G0T: `${cf(c)}${uBase(`${bb}`)}^{${n + 1}}`,
      lims,
      exact: (ua, ub) => ({ tex: tn(c * (ub ** (n + 1) - ua ** (n + 1))) }),
      uRational: true,
      wrongU: [`(${inner})^{${n}}`, `${a}x`, 'x'],
      wrongSwap: [`${cf(k * a)}\\int u^{${n}}\\,du`, `\\int ${cf(k)}u^{${n}}\\,dx`, `${cf(k)}\\int u^{${n}}\\,du`],
    };
  }

  // ln: ∫ k (ln x)^n / x dx
  const n = rng.pick([1, 2, 3]);
  const k = exactDu ? 1 : rng.pick([2, 3, 4, 6]);
  const c = k / (n + 1);
  const lnPow = n === 1 ? '\\ln x' : `(\\ln x)^{${n}}`;
  return {
    f: `\\dfrac{${cf(k)}${lnPow}}{x}`,
    u: '\\ln x',
    du: '$du = \\dfrac{1}{x}\\,dx$',
    swap: (lo, hi) => `${cf(k)}\\int${lo ? `_{${lo}}^{${hi}}` : ''} u^{${n}}\\,du`,
    H: `${cf(c)}u^{${n + 1}}`,
    G: `${cf(c)}(\\ln x)^{${n + 1}}`,
    Gt: `${cft(c)}ln(x)^${n + 1}`,
    Gv: (x) => c * Math.log(x) ** (n + 1),
    uv: (x) => Math.log(x),
    Hat: (uT) => `${cf(c)}(${uT})^{${n + 1}}`,
    Hv: (u) => c * u ** (n + 1),
    x0: 1,
    x0T: '1',
    G0T: '0',
    lims: [
      { a: 1, b: Math.E, aT: '1', bT: 'e', uaT: '0', ubT: '1' },
      { a: 1, b: Math.E ** 2, aT: '1', bT: 'e^{2}', uaT: '0', ubT: '2' },
    ],
    exact: (ua, ub) => ({ tex: tn(c * (ub ** (n + 1) - ua ** (n + 1))) }),
    uRational: true,
    wrongU: ['x', `${lnPow}`, '\\dfrac{1}{x}'],
    wrongSwap: [`${cf(k)}\\int \\dfrac{u^{${n}}}{x}\\,du`, `${cf(k)}\\int u^{${n}}\\,dx`, `${cf(k)}\\int \\dfrac{1}{u}\\,du`],
    dom: ' for $x > 0$',
  };
}

const SUB_HINTS = [
  'Choose $u$ to be the inside of a power, root, exponential or logarithm whose derivative also appears (up to a constant factor) in the integrand.',
  'Write $du = u\'(x)\\,dx$, replace everything in terms of $u$, integrate, then substitute back.',
];

/** A total change from a rate that needs a substitution (level 3). */
function substitutionApp(rng: Rng): GenOutput {
  const ctx = rng.pick(['vel', 'growth', 'users'] as const);
  if (ctx === 'vel') {
    const [p, b] = rng.pick([[9, 4], [16, 3], [36, 8]] as const);
    const k = rng.pick([3, 6]);
    const c = k / 3;
    const ub = p + b * b;
    const value = c * (ub ** 1.5 - p ** 1.5);
    const who = rng.pick(['A test car on a straight track', 'A drone flying in a straight line', 'An electric scooter on a straight bike path', 'A sled on a straight run']);
    return {
      prompt: `${who} starts at $t = 0$ with velocity $v(t) = ${cf(k)}t\\sqrt{t^{2} + ${p}}$ m/s, where $t$ is the time in seconds. Since $v(t) \\ge 0$, the distance travelled is $\\displaystyle\\int_0^{${b}} v(t)\\,dt$. How far does it travel in the first ${b} seconds?`,
      parts: [part({ kind: 'numeric', value }, { suffix: 'm' })],
      hints: ['Let $u$ be the expression under the square root; its derivative $2t$ is (up to a constant) the factor in front.', `With $u = t^{2} + ${p}$, the limits $t = 0$ and $t = ${b}$ become $u = ${p}$ and $u = ${ub}$.`],
      solution: [
        `Let $u = t^{2} + ${p}$. Then $du = 2t\\,dt$, so $t\\,dt = \\frac{1}{2}\\,du$.`,
        `Change the limits: $t = 0$ gives $u = ${p}$; $t = ${b}$ gives $u = ${ub}$.`,
        `$\\displaystyle\\int_0^{${b}} ${cf(k)}t\\sqrt{t^{2} + ${p}}\\,dt = ${cf(k / 2)}\\int_{${p}}^{${ub}} u^{1/2}\\,du = \\Big[${cf(c)}u^{3/2}\\Big]_{${p}}^{${ub}}$`,
        `$= ${cdot(c)}(${ub ** 1.5} - ${p ** 1.5}) = ${fmt(value)}$`,
        `It travels ${fmt(value)} m.`,
      ],
    };
  }
  if (ctx === 'growth') {
    const o = retry(
      () => ({ A: rng.pick([200, 300, 400, 500, 600]), r: rng.pick([0.1, 0.2, 0.25]), T: rng.pick([4, 5, 6, 8]) }),
      ({ A, r, T }) => {
        const v = (A / r) * (Math.exp(r * T) - 1);
        return Math.abs(v - Math.floor(v) - 0.5) > 0.05;
      },
    );
    const { A, r, T } = o;
    const c = A / r;
    const value = c * (Math.exp(r * T) - 1);
    const what = rng.pick(['A bacteria culture in a university lab grows', 'A population of yeast cells in a bakery starter grows', 'A colony of algae in a farm pond grows']);
    return {
      prompt: `${what} at a rate of $P'(t) = ${A}e^{${fmt(r)}t}$ cells per hour, where $t$ is the time in hours. By how much does the population increase during the first ${T} hours? Round to the nearest whole number.`,
      parts: [part({ kind: 'numeric', value, decimals: 0 }, { suffix: 'cells' })],
      hints: ['The increase is the integral of the rate: $\\displaystyle\\int_0^{' + T + "} P'(t)\\,dt$.", `Substitute $u = ${fmt(r)}t$, so $dt = ${tn(1 / r)}\\,du$, and change the limits.`],
      solution: [
        `Increase $= \\displaystyle\\int_0^{${T}} ${A}e^{${fmt(r)}t}\\,dt$`,
        `Let $u = ${fmt(r)}t$. Then $du = ${fmt(r)}\\,dt$, so $dt = ${tn(1 / r)}\\,du$; the limits become $u = 0$ and $u = ${fmt(r * T)}$.`,
        `$= ${tn(c)}\\displaystyle\\int_0^{${fmt(r * T)}} e^{u}\\,du = ${tn(c)}\\left(e^{${fmt(r * T)}} - 1\\right) \\approx ${fmtFixed(value, 2)}$`,
        `The population increases by about ${Math.round(value)} cells.`,
      ],
    };
  }
  const o = retry(
    () => ({ A: rng.pick([2000, 3000, 4000, 6000]), pt: rng.pick([[9, 4], [16, 3], [4, 6], [25, 10]] as const) }),
    ({ A, pt }) => {
      const v = (A / 2) * Math.log((pt[1] ** 2 + pt[0]) / pt[0]);
      return Math.abs(v - Math.floor(v) - 0.5) > 0.05;
    },
  );
  const { A } = o;
  const [p, T] = o.pt;
  const ub = T * T + p;
  const value = (A / 2) * Math.log(ub / p);
  const app = rng.pick(['a new transit app in Riverton', 'a local news podcast in Ashford', 'a hiking-trail app for a mountain park']);
  return {
    prompt: `After launch, ${app} gains new users at a rate of $N'(t) = \\dfrac{${A}t}{t^{2} + ${p}}$ users per week, where $t$ is the time in weeks. How many new users does it gain in the first ${T} weeks? Round to the nearest whole number.`,
    parts: [part({ kind: 'numeric', value, decimals: 0 }, { suffix: 'users' })],
    hints: ['The total gained is $\\displaystyle\\int_0^{' + T + "} N'(t)\\,dt$. Look for a denominator whose derivative appears on top.", `Let $u = t^{2} + ${p}$, so $t\\,dt = \\frac{1}{2}\\,du$, and use $\\int \\frac{1}{u}\\,du = \\ln u$.`],
    solution: [
      `Let $u = t^{2} + ${p}$. Then $du = 2t\\,dt$, so $t\\,dt = \\frac{1}{2}\\,du$; the limits become $u = ${p}$ and $u = ${ub}$.`,
      `$\\displaystyle\\int_0^{${T}} \\dfrac{${A}t}{t^{2} + ${p}}\\,dt = ${A / 2}\\int_{${p}}^{${ub}} \\dfrac{1}{u}\\,du = ${A / 2}\\left(\\ln ${ub} - \\ln ${p}\\right)$`,
      `$= ${A / 2}\\ln ${tn(ub / p, true)} \\approx ${fmtFixed(value, 2)}$`,
      `It gains about ${Math.round(value)} new users.`,
    ],
  };
}

const substitution = skill({
  id: 'm31-substitution',
  name: 'Integration by substitution',
  description: 'Integrate by substitution u = g(x), adjusting constant factors, and evaluate definite integrals by changing the limits.',
  outcomes: ['I3'],
  lessonId: 'm31-8-4',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['chooseU', 'swapMc', 'indef', 'indef'] as const) : d === 2 ? rng.pick(['indef', 'indef', 'def'] as const) : rng.pick(['def', 'defLimits', 'indefCond', 'app'] as const);
    if (kind === 'app') return substitutionApp(rng);
    const S = subCase(rng, d === 1);

    if (kind === 'chooseU') {
      const correct = `$u = ${S.u}$`;
      return {
        prompt: `Which substitution turns $\\displaystyle\\int ${S.f}\\,dx$ into a basic integral?`,
        parts: [part(mc(rng, correct, S.wrongU.map((w) => `$u = ${w}$`)))],
        hints: [SUB_HINTS[0], 'Check your choice: is $\\dfrac{du}{dx}$ (or a constant multiple of it) also a factor of the integrand?'],
        solution: [`Let $u = ${S.u}$. Then ${S.du}.`, `The integral becomes $${S.swap()}$, a basic integral.`, `The substitution is ${correct}.`],
      };
    }

    if (kind === 'swapMc') {
      const correct = `$${S.swap()}$`;
      return {
        prompt: `Using the substitution $u = ${S.u}$, which integral is equal to $\\displaystyle\\int ${S.f}\\,dx$?`,
        parts: [part(mc(rng, correct, S.wrongSwap.map((w) => `$${w}$`)))],
        hints: ['Find $du$ in terms of $dx$, and solve for the part of the integrand that it replaces.', 'After the substitution, no $x$ and no $dx$ may be left.'],
        solution: [`$u = ${S.u}$, so ${S.du}.`, `Replace the inside with $u$ and the rest with $du$: $\\displaystyle\\int ${S.f}\\,dx = ${S.swap()}$.`, `The equal integral is ${correct}.`],
      };
    }

    if (kind === 'indef' || kind === 'indefCond') {
      // F(x0) = y0: on level 1 always F(x0) = 0; otherwise a small integer.
      const y0 = d === 1 ? 0 : rng.int(-3, 6);
      const G0 = S.Gv(S.x0);
      const C = y0 - G0;
      const Crat = toFrac(C, 1000);
      let Ctex: string;
      let Ct: string;
      if (Crat) {
        Ctex = tn(C);
        Ct = txn(C);
      } else {
        // C = y0 - (c ln p): keep it exact
        Ctex = joinTerms([y0 ? tn(y0) : '', S.G0T.startsWith('-') ? S.G0T.slice(1) : `-${S.G0T}`]);
        const lnMatch = /^(.*)\\ln (\d+)$/.exec(S.G0T)!;
        const cc = S.Gv(S.x0) / Math.log(Number(lnMatch[2]));
        Ct = joinTerms([y0 ? `${y0}` : '', `${cft(-snap(cc))}ln(${lnMatch[2]})`]);
      }
      const expected = joinTerms([S.Gt, Ct]);
      const cond = `F(${S.x0T}) = ${y0}`;
      return {
        prompt: `Find the antiderivative $F(x)$ of $f(x) = ${S.f}$${S.dom ?? ''} that satisfies $${cond}$.`,
        parts: [part({ kind: 'expression', expected }, { label: '$F(x) =$' })],
        hints: [...SUB_HINTS.slice(0, 1), `After integrating and substituting back, use $${cond}$ to find $C$.`],
        solution: [
          `Let $u = ${S.u}$. Then ${S.du}.`,
          `$\\displaystyle\\int ${S.f}\\,dx = ${S.swap()} = ${S.H} + C$`,
          `Substitute back: $F(x) = ${S.G} + C$`,
          `$F(${S.x0T}) = ${S.G0T} + C = ${y0}$, so $C = ${Ctex}$.`,
          `$F(x) = ${joinTerms([S.G, Ctex])}$`,
        ],
      };
    }

    // definite integrals with changed limits
    const L = rng.pick(S.lims);
    const ua = S.uv(L.a);
    const ub = S.uv(L.b);
    const value = S.Hv(ub) - S.Hv(ua);
    const ex = S.exact(ua, ub);
    const v = valuePart(value, { tex: ex.tex, exact: ex.typed, fns: ex.fns });
    const integral = `\\displaystyle\\int_{${L.aT}}^{${L.bT}} ${S.f}\\,dx`;
    const steps = [
      `Let $u = ${S.u}$. Then ${S.du}.`,
      `Change the limits: when $x = ${L.aT}$, $u = ${L.uaT}$; when $x = ${L.bT}$, $u = ${L.ubT}$.`,
      `$${integral} = ${S.swap(L.uaT, L.ubT)}$`,
      `$= \\Big[${S.H}\\Big]_{${L.uaT}}^{${L.ubT}} = ${S.Hat(L.ubT)} - ${S.Hat(L.uaT).startsWith('-') ? `\\left(${S.Hat(L.uaT)}\\right)` : S.Hat(L.uaT)}$`,
      `$= ${v.show}$`,
    ];
    if (kind === 'defLimits' && S.uRational) {
      return {
        prompt: `Evaluate $${integral}$ using the substitution $u = ${S.u}$.\n\n(a) Find the new lower and upper limits for $u$. (b) Evaluate the integral.${v.note}`,
        parts: [part({ kind: 'numeric', value: snap(ua) }, { label: '(a) lower limit $u =$' }), part({ kind: 'numeric', value: snap(ub) }, { label: 'upper limit $u =$' }), { ...v.part, label: '(b) Integral $=$' }],
        hints: ['Substitute each $x$-limit into $u = ' + S.u + '$ to get the $u$-limits.', 'Rewrite the whole integral in $u$ (including $du$), then use the fundamental theorem with the new limits. No need to substitute back.'],
        solution: steps,
      };
    }
    return {
      prompt: `Evaluate $${integral}$.${v.note}`,
      parts: [v.part],
      hints: [SUB_HINTS[0], 'Change the limits to $u$-values when you substitute; then you do not need to substitute back.'],
      solution: steps,
    };
  },
});

export const INTEGRALS_SKILLS: SkillDef[] = [antiderivative, initialValue, riemann, definiteIntegral, substitution];
