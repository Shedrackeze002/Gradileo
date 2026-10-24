/** Math 30-1 Unit 4 — Trigonometry and the Unit Circle (T1, T2, T3, T5). */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { cosD, fmt, fmtFixed, frac, fracAdd, fracLatex, fracMul, gcd, isPerfectSquare, lcmAll, radicalSplit, sinD, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Angles: degrees, radians as multiples of π, formatting
// ---------------------------------------------------------------------------

const PI = Math.PI;
const ROMAN = ['', 'I', 'II', 'III', 'IV'];
const QUADRANT_CHOICES = ['quadrant I', 'quadrant II', 'quadrant III', 'quadrant IV'];
const PI_NOTE = 'Type $\\pi$ as `pi`, for example `7pi/4`.';
const SQRT_NOTE = 'Type a square root with `sqrt`, for example `-sqrt(3)/2`.';
const PEOPLE = [
  'Amara', 'Jordan', 'Priya', 'Liam', 'Mei', 'Tyler', 'Kiran', 'Noah', 'Aisha', 'Dakota', 'Mateo', 'Sofia', 'Raj', 'Hamid', 'Jasmine',
  'Owen', 'Nadia', 'Wyatt', 'Simran', 'Kai', 'Fatima', 'Lucas', 'Thanh', 'Chloé', 'Darius', 'Leilani', 'Marie-Ève', 'Arjun', 'Rosalie', 'Tanvir',
];

const norm360 = (a: number) => ((a % 360) + 360) % 360;
/** Degrees as LaTeX. */
const dg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
/** An angle in degrees as a fraction of π radians. */
const piFrac = (deg: number) => frac(deg, 180);

/** LaTeX for (n/d)π. */
function piTex(f: Frac, small = false): string {
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
/** Radian LaTeX of an angle given in degrees. */
const rt = (deg: number, small = false) => piTex(piFrac(deg), small);
/** Radian value of an angle given in degrees. */
const rv = (deg: number) => (deg * PI) / 180;
/** The angle in degrees or radians. */
const ang = (deg: number, rad: boolean, small = false) => (rad ? rt(deg, small) : dg(deg));

/** True when v is safely away from a rounding boundary at dp decimals. */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.06;
}

/** Quadrant of a non-quadrantal angle in [0, 360). */
function quadrant(t: number): 1 | 2 | 3 | 4 {
  return t < 90 ? 1 : t < 180 ? 2 : t < 270 ? 3 : 4;
}
function refAngle(t: number): number {
  const q = quadrant(t);
  return q === 1 ? t : q === 2 ? 180 - t : q === 3 ? t - 180 : 360 - t;
}
function fromRef(ref: number, q: number): number {
  return q === 1 ? ref : q === 2 ? 180 - ref : q === 3 ? 180 + ref : 360 - ref;
}
/** "θ_R = π − θ = ..." for an angle t in [0, 360). */
function refWork(t: number, rad: boolean): string {
  const q = quadrant(t);
  const r = refAngle(t);
  const A = (x: number) => ang(x, rad);
  const half = rad ? '\\pi' : '180^\\circ';
  const full = rad ? '2\\pi' : '360^\\circ';
  if (q === 1) return `\\theta_R = ${A(t)}`;
  if (q === 2) return `\\theta_R = ${half} - ${A(t)} = ${A(r)}`;
  if (q === 3) return `\\theta_R = ${A(t)} - ${half} = ${A(r)}`;
  return `\\theta_R = ${full} - ${A(t)} = ${A(r)}`;
}

const SPECIAL_DEG = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
const NONQ = SPECIAL_DEG.filter((t) => t % 90 !== 0);
const isQuadrantal = (t: number) => t % 90 === 0;

/** once, twice, three times ... */
const timesWord = (k: number) => (k === 1 ? 'once' : k === 2 ? 'twice' : `${['', '', '', 'three', 'four', 'five'][k] ?? k} times`);
/** k(360°), or just 360° when k = 1. */
const times = (k: number, full: string) => (k === 1 ? full : `${k}(${full})`);

/** "θ is coterminal with t0" steps for an angle outside [0°, 360°). */
function coterminalNote(t: number, rad: boolean): string | null {
  const t0 = norm360(t);
  if (t0 === t) return null;
  const k = (t0 - t) / 360;
  const full = rad ? '2\\pi' : '360^\\circ';
  const how = `${ang(t, rad)} ${k > 0 ? '+' : '-'} ${times(Math.abs(k), full)}`;
  return `$${ang(t, rad)}$ is coterminal with $${how} = ${ang(t0, rad)}$, so it has the same terminal arm.`;
}

// ---------------------------------------------------------------------------
// Exact values: sums of rational multiples of square roots
// ---------------------------------------------------------------------------

/** radicand (square-free) -> rational coefficient */
type Ex = Map<number, Frac>;

function ex(n: number, d = 1, r = 1): Ex {
  const out: Ex = new Map();
  if (n === 0) return out;
  const { outside, inside } = radicalSplit(r);
  out.set(inside, frac(n * outside, d));
  return out;
}
function exAdd(a: Ex, b: Ex): Ex {
  const out: Ex = new Map(a);
  for (const [r, c] of b) {
    const s = out.has(r) ? fracAdd(out.get(r)!, c) : c;
    if (s.n === 0) out.delete(r);
    else out.set(r, s);
  }
  return out;
}
function exScale(a: Ex, k: Frac): Ex {
  const out: Ex = new Map();
  if (k.n === 0) return out;
  for (const [r, c] of a) out.set(r, fracMul(c, k));
  return out;
}
const exNeg = (a: Ex) => exScale(a, frac(-1));
function exMul(a: Ex, b: Ex): Ex {
  let out: Ex = new Map();
  for (const [r1, c1] of a)
    for (const [r2, c2] of b) {
      const { outside, inside } = radicalSplit(r1 * r2);
      out = exAdd(out, new Map([[inside, fracMul(fracMul(c1, c2), frac(outside))]]));
    }
  return out;
}
/** a ÷ b where b is a single non-zero term c√r: multiply by √r / (c·r). */
function exDiv(a: Ex, b: Ex): Ex {
  const [[r, c]] = [...b];
  return exMul(a, new Map([[r, frac(c.d, c.n * r)]]));
}
function exValue(a: Ex): number {
  let v = 0;
  for (const [r, c] of a) v += (c.n / c.d) * Math.sqrt(r);
  return v;
}
function exTerms(a: Ex) {
  const terms = [...a].sort((x, y) => x[0] - y[0]);
  const L = lcmAll(terms.map(([, c]) => c.d));
  const nums = terms.map(([r, c]) => ({ k: (c.n * L) / c.d, r }));
  const pull = nums.length > 0 && nums.every((t) => t.k < 0) && (L > 1 || nums.length === 1);
  if (pull) nums.forEach((t) => (t.k = -t.k));
  nums.sort((p, q) => Number(q.k > 0) - Number(p.k > 0));
  return { L, nums, pull };
}
function exLatex(a: Ex): string {
  if (!a.size) return '0';
  const { L, nums, pull } = exTerms(a);
  const term = (k: number, r: number) => (r === 1 ? `${Math.abs(k)}` : `${Math.abs(k) === 1 ? '' : Math.abs(k)}\\sqrt{${r}}`);
  let top = '';
  nums.forEach((t, i) => (top += i === 0 ? `${t.k < 0 ? '-' : ''}${term(t.k, t.r)}` : ` ${t.k < 0 ? '-' : '+'} ${term(t.k, t.r)}`));
  return `${pull ? '-' : ''}${L === 1 ? top : `\\dfrac{${top}}{${L}}`}`;
}
/** How a student could type the exact value. */
function exText(a: Ex): string {
  if (!a.size) return '0';
  const { L, nums, pull } = exTerms(a);
  const term = (k: number, r: number) => (r === 1 ? `${Math.abs(k)}` : `${Math.abs(k) === 1 ? '' : Math.abs(k)}sqrt(${r})`);
  let top = '';
  nums.forEach((t, i) => (top += i === 0 ? `${t.k < 0 ? '-' : ''}${term(t.k, t.r)}` : ` ${t.k < 0 ? '-' : '+'} ${term(t.k, t.r)}`));
  const body = L === 1 ? top : nums.length > 1 ? `(${top})/${L}` : `${top}/${L}`;
  return `${pull ? '-' : ''}${body}`;
}
/** True when the exact value contains a square root. */
const hasRoot = (a: Ex) => [...a.keys()].some((r) => r !== 1);
/** A numeric answer for an exact value (review screens show sums of radicals exactly too). */
function exPart(v: Ex, opts: { label: string }): Part {
  return part({ kind: 'numeric', value: exValue(v), allowExpression: true, display: 'fraction', ...(v.size > 1 ? { exact: exText(v) } : {}) }, opts);
}
/** Wrap a negative or fractional value in brackets for substitution. */
function exParen(a: Ex): string {
  const l = exLatex(a);
  return l.startsWith('-') || l.includes('\\dfrac') ? `\\left(${l}\\right)` : l;
}

/** cos and sin of the special reference angles. */
const COS_REF: Record<number, Ex> = { 0: ex(1), 30: ex(1, 2, 3), 45: ex(1, 2, 2), 60: ex(1, 2), 90: ex(0) };
const SIN_REF: Record<number, Ex> = { 0: ex(0), 30: ex(1, 2), 45: ex(1, 2, 2), 60: ex(1, 2, 3), 90: ex(1) };

/** Exact coordinates of P(θ) for a multiple of 30° or 45° (any size). */
function unitPoint(deg: number): [Ex, Ex] {
  const t = norm360(deg);
  const ref = t <= 90 ? t : t <= 180 ? 180 - t : t <= 270 ? t - 180 : 360 - t;
  const sx = Math.sign(Math.round(cosD(t) * 1e9));
  const sy = Math.sign(Math.round(sinD(t) * 1e9));
  return [exScale(COS_REF[ref], frac(sx || 1)), exScale(SIN_REF[ref], frac(sy || 1))];
}
const pointTex = (p: [Ex, Ex]) => `\\left(${exLatex(p[0])},\\ ${exLatex(p[1])}\\right)`;

type Fn6 = 'sin' | 'cos' | 'tan' | 'csc' | 'sec' | 'cot';
const FN6: Fn6[] = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot'];
const RECIP: Record<Fn6, Fn6> = { sin: 'csc', cos: 'sec', tan: 'cot', csc: 'sin', sec: 'cos', cot: 'tan' };
/** Each ratio in terms of x, y and r. */
const DEF_XYR: Record<Fn6, string> = { sin: '\\dfrac{y}{r}', cos: '\\dfrac{x}{r}', tan: '\\dfrac{y}{x}', csc: '\\dfrac{r}{y}', sec: '\\dfrac{r}{x}', cot: '\\dfrac{x}{y}' };
/** Each ratio in terms of the unit-circle point (x, y). */
const DEF_UNIT: Record<Fn6, string> = { sin: 'y', cos: 'x', tan: '\\dfrac{y}{x}', csc: '\\dfrac{1}{y}', sec: '\\dfrac{1}{x}', cot: '\\dfrac{x}{y}' };
/** Quadrants where each ratio is positive (CAST). */
const positiveIn = (f: Fn6, q: number) => (f === 'sin' || f === 'csc' ? q <= 2 : f === 'cos' || f === 'sec' ? q === 1 || q === 4 : q === 1 || q === 3);
const VALUE_FN: Record<Fn6, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  csc: (x) => 1 / Math.sin(x),
  sec: (x) => 1 / Math.cos(x),
  cot: (x) => Math.cos(x) / Math.sin(x),
};

/** Exact value of a ratio from x, y and r; null when it is undefined. */
function ratioXYR(f: Fn6, x: Ex, y: Ex, r: Ex): Ex | null {
  const zx = x.size === 0;
  const zy = y.size === 0;
  switch (f) {
    case 'sin':
      return exDiv(y, r);
    case 'cos':
      return exDiv(x, r);
    case 'tan':
      return zx ? null : exDiv(y, x);
    case 'csc':
      return zy ? null : exDiv(r, y);
    case 'sec':
      return zx ? null : exDiv(r, x);
    case 'cot':
      return zy ? null : exDiv(x, y);
  }
}
/** Exact value of f(θ) for a special angle in degrees; null when undefined. */
const exact6 = (f: Fn6, deg: number) => {
  const [x, y] = unitPoint(deg);
  return ratioXYR(f, x, y, ex(1));
};

/** f(θ) as LaTeX, e.g. \sec \dfrac{5\pi}{4} or \cot\left(-\dfrac{\pi}{6}\right). */
function fnAt(f: Fn6, deg: number, rad: boolean): string {
  const a = ang(deg, rad);
  return deg < 0 ? `\\${f}\\left(${a}\\right)` : `\\${f} ${a}`;
}

/** Steps giving P(θ) = (x, y) for a special angle. */
function pointSteps(deg: number, rad: boolean): string[] {
  const steps: string[] = [];
  const note = coterminalNote(deg, rad);
  if (note) steps.push(note);
  const t = norm360(deg);
  const p = unitPoint(t);
  if (isQuadrantal(t)) {
    const where = t === 0 ? 'positive $x$-axis' : t === 90 ? 'positive $y$-axis' : t === 180 ? 'negative $x$-axis' : 'negative $y$-axis';
    steps.push(`The terminal arm of $${ang(t, rad)}$ lies on the ${where}, so it meets the unit circle at $${pointTex(p)}$.`);
    return steps;
  }
  const q = quadrant(t);
  const r = refAngle(t);
  if (q !== 1) steps.push(`$${ang(t, rad)}$ is in quadrant ${ROMAN[q]}: $${refWork(t, rad)}$.`);
  steps.push(`For $${ang(r, rad)}$ the special triangle gives the point $${pointTex(unitPoint(r))}$ on the unit circle.`);
  if (q !== 1) steps.push(`In quadrant ${ROMAN[q]}, $x ${q === 4 ? '>' : '<'} 0$ and $y ${q <= 2 ? '>' : '<'} 0$. Give each coordinate that sign.`);
  return steps;
}

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

type Pt = [number, number];
const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;

// Figure layout (copied from math20-1/gen/trig.ts): labels are placed clear of every drawn line.
type P = Pt;
type Color = 'brand' | 'accent' | 'muted';
const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];

interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}
function distPtSeg(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}
function distPtBox(p: P, b: Box): number {
  return Math.hypot(Math.max(b.x0 - p[0], 0, p[0] - b.x1), Math.max(b.y0 - p[1], 0, p[1] - b.y1));
}
function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const ps = [-dx, dx, -dy, dy];
  const qs = [a[0] - box.x0, box.x1 - a[0], a[1] - box.y0, box.y1 - a[1]];
  for (let i = 0; i < 4; i++) {
    if (ps[i] === 0) {
      if (qs[i] < 0) return false;
    } else {
      const r = qs[i] / ps[i];
      if (ps[i] < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return true;
}
function distSegBox(a: P, b: P, box: Box): number {
  if (segHitsBox(a, b, box)) return 0;
  const corners: P[] = [
    [box.x0, box.y0],
    [box.x0, box.y1],
    [box.x1, box.y0],
    [box.x1, box.y1],
  ];
  return Math.min(...corners.map((c) => distPtSeg(c, a, b)), distPtBox(a, box), distPtBox(b, box));
}
function distBoxBox(p: Box, q: Box): number {
  return Math.hypot(Math.max(q.x0 - p.x1, p.x0 - q.x1, 0), Math.max(q.y0 - p.y1, p.y0 - q.y1, 0));
}
/** Approximate rendered width (px) of a 12px bold figure label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === '°' ? 5 : ch === ' ' ? 3.5 : ch === '(' || ch === ')' || ch === ',' || ch === '.' ? 4.5 : ch === '₁' || ch === '₂' ? 5 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color }> = [];
  private dots: Array<{ p: P; color: Color }> = [];
  private obstacles: Array<[P, P]> = [];
  private pending: PendingLabel[] = [];
  private extra: P[] = [];

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean; arrowEnd?: boolean; arrowStart?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    this.obstacles.push([from, to]);
    return this;
  }

  /** Arc around v from direction a0 counterclockwise to a1, optionally with an arrowhead at a1. */
  arc(v: P, r: number, a0: number, a1: number, color: Color = 'accent', arrow = false) {
    const span = norm360(a1 - a0) || 360;
    const n = Math.max(6, Math.ceil(span / 8));
    const points: P[] = [];
    for (let i = 0; i <= n; i++) points.push(at(v, a0 + (span * i) / n, r));
    if (arrow) {
      const last = points.pop()!;
      this.polys.push({ points: [...points], color });
      this.segs.push({ from: points[points.length - 1], to: last, color, arrowEnd: true });
      points.push(last);
    } else this.polys.push({ points, color });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  polyline(points: P[], color: Color = 'brand') {
    this.polys.push({ points, color });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  dot(p: P, color: Color = 'brand') {
    this.dots.push({ p, color });
    return this;
  }

  include(p: P) {
    this.extra.push(p);
    return this;
  }

  /** Label inside the angle region from direction a0 counterclockwise to a1, near vertex v. */
  angleLabel(v: P, a0: number, a1: number, text: string, minPx = 18) {
    const span = norm360(a1 - a0) || 360;
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const rpx of [minPx, minPx + 6, minPx + 12, minPx + 19, minPx + 27, minPx + 36, minPx + 48, minPx + 62])
          for (const t of [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.18, 0.82]) out.push(at(v, a0 + t * span, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label near point p, preferring direction a. */
  endLabel(p: P, a: number, text: string, near = 15) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [near, near + 4, near + 9, near + 15, near + 23])
          for (const off of [0, 30, -30, 60, -60, 90, -90, 125, -125, 180]) out.push(at(p, a + off, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label beside a side, on the side of direction a: tries every outward spot (moving further out) before any other. */
  sideLabel(mid: P, a: number, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [12, 16, 21, 27, 34, 42, 51])
          for (const off of [0, 20, -20, 40, -40]) out.push(at(mid, a + off, dpx / ppu));
        for (const dpx of [14, 20, 28])
          for (const off of [70, -70, 110, -110, 180]) out.push(at(mid, a + off, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label for a vertex where rays meet: tries the widest gaps between the rays first. */
  vertexLabel(v: P, rayDirs: number[], text: string) {
    const dirs = [...rayDirs].map(norm360).sort((a, b) => a - b);
    const gaps = dirs.map((a, i) => ({ a0: a, span: (i + 1 < dirs.length ? dirs[i + 1] : dirs[0] + 360) - a }));
    gaps.sort((g, h) => h.span - g.span);
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const g of gaps)
          for (const rpx of [14, 18, 23, 29])
            for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8]) out.push(at(v, g.a0 + t * g.span, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Text centred exactly at c. */
  textAt(c: P, text: string) {
    this.pending.push({ text, cands: () => [c], fixed: true });
    return this;
  }

  build(opts: { margin?: number; caption?: string } = {}): PlaneFigure {
    const m = opts.margin ?? 0.9;
    const pts: P[] = [...this.segs.flatMap((s) => [s.from, s.to] as P[]), ...this.polys.flatMap((p) => p.points), ...this.dots.map((d) => d.p), ...this.extra];
    let minX = Math.min(...pts.map((p) => p[0])) - m;
    let maxX = Math.max(...pts.map((p) => p[0])) + m;
    let minY = Math.min(...pts.map((p) => p[1])) - m;
    let maxY = Math.max(...pts.map((p) => p[1])) + m;
    let w = maxX - minX;
    let h = maxY - minY;
    if (w < h) {
      minX -= (h - w) / 2;
      maxX += (h - w) / 2;
      w = h;
    }
    if (w > 2.2 * h) {
      minY -= (w / 2.2 - h) / 2;
      maxY += (w / 2.2 - h) / 2;
      h = w / 2.2;
    }
    const xr = Math.ceil(w - 1e-9);
    const yr = Math.ceil(h - 1e-9);
    const ox = minX - (xr - w) / 2;
    const oy = minY - (yr - h) / 2;
    const bounds: Box = { x0: ox, x1: ox + xr, y0: oy, y1: oy + yr };
    const ppu = 340 / xr;

    const placed: Box[] = [];
    const anchors: PlanePoint[] = [];
    for (const lab of this.pending) {
      const wpx = textWidth(lab.text);
      let best: { c: P; score: number } | null = null;
      for (const c of lab.cands(ppu)) {
        const hw = (wpx / 2 + 1.5) / ppu;
        const hh = 6.5 / ppu;
        const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh };
        const A: P = [c[0] - (8 + wpx / 2) / ppu, c[1] - 12.3 / ppu];
        let score: number;
        if (lab.fixed) score = 100;
        else if (box.x0 < bounds.x0 || box.x1 > bounds.x1 || box.y0 < bounds.y0 || box.y1 > bounds.y1) score = -1000;
        else {
          let tc = Infinity;
          let ac = Infinity;
          for (const [a, b] of this.obstacles) {
            tc = Math.min(tc, distSegBox(a, b, box));
            ac = Math.min(ac, distPtSeg(A, a, b) - 5.5 / ppu);
          }
          for (const pb of placed) {
            tc = Math.min(tc, distBoxBox(pb, box) - 2 / ppu);
            ac = Math.min(ac, distPtBox(A, pb) - 5.5 / ppu);
          }
          for (const d of this.dots) {
            tc = Math.min(tc, distPtBox(d.p, box) - 6 / ppu);
            ac = Math.min(ac, Math.hypot(A[0] - d.p[0], A[1] - d.p[1]) - 11 / ppu);
          }
          score = Math.min(tc, ac) * ppu;
        }
        if (!best || score > best.score) best = { c, score };
        if (score >= 5) break;
      }
      const c = best!.c;
      const hw = (wpx / 2 + 1.5) / ppu;
      const hh = 6.5 / ppu;
      placed.push({ x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh });
      anchors.push({ x: c[0] - (8 + wpx / 2) / ppu, y: c[1] - 12.3 / ppu, label: lab.text, color: 'muted', open: true });
    }

    const T = (p: P): [number, number] => [r3(p[0] - ox), r3(p[1] - oy)];
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: xr, yMin: 0, yMax: yr, step: Math.max(xr, yr) },
      hideTickLabels: true,
      segments: this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) })),
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.color ? { color: p.color } : {}) })),
      points: [
        ...this.dots.map((d) => {
          const [x, y] = T(d.p);
          return { x, y, color: d.color } as PlanePoint;
        }),
        ...anchors.map((a) => {
          const [x, y] = T([a.x, a.y]);
          return { ...a, x, y };
        }),
      ],
      ...(opts.caption ? { caption: opts.caption } : {}),
    };
  }
}


/** A spiral arc from 0° to t° (any sign or size) with an arrowhead at t. */
function turnArc(s: Sketch, t: number, r0: number) {
  const n = Math.max(6, Math.ceil(Math.abs(t) / 15));
  const pts: P[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (t * i) / n;
    pts.push(at([0, 0], a, r0 + (0.07 * Math.abs(a)) / 360));
  }
  const last = pts.pop()!;
  s.polyline(pts, 'muted');
  s.seg(pts[pts.length - 1], last, { color: 'muted', arrowEnd: true });
}

const circlePts = (): P[] => Array.from({ length: 73 }, (_, i) => [Math.cos((2 * PI * i) / 72), Math.sin((2 * PI * i) / 72)] as P);
/** Laying out labels is slow, and the same unit-circle figure is drawn for many items: keep the results. */
const FIG_CACHE = new Map<string, PlaneFigure>();
function cached(key: string, make: () => PlaneFigure): PlaneFigure {
  let f = FIG_CACHE.get(key);
  if (!f) {
    f = make();
    if (FIG_CACHE.size > 500) FIG_CACHE.clear();
    FIG_CACHE.set(key, f);
  }
  return structuredClone(f);
}

/** The unit circle with the terminal arm of θ (degrees) and the point P(θ). */
export function unitCircleFigure(o: { theta: number; label?: string; arc?: boolean; caption?: string }): PlaneFigure {
  return cached(JSON.stringify(['uc', o]), () => drawUnitCircle(o));
}
function drawUnitCircle(o: { theta: number; label?: string; arc?: boolean; caption?: string }): PlaneFigure {
  const s = new Sketch();
  const L = 1.45;
  s.seg([-L, 0], [L, 0], { color: 'muted', arrowStart: true, arrowEnd: true });
  s.seg([0, -L], [0, L], { color: 'muted', arrowStart: true, arrowEnd: true });
  s.textAt([L - 0.02, -0.16], 'x').textAt([0.12, L - 0.04], 'y');
  s.polyline(circlePts(), 'brand');
  const t = o.theta;
  const P0: P = [cosD(t), sinD(t)];
  s.seg([0, 0], P0, { color: 'accent' });
  if (o.arc !== false && t !== 0) turnArc(s, t, 0.2);
  s.dot(P0, 'brand');
  s.endLabel(P0, t, o.label ?? 'P', 13);
  // Label each axis point on the side away from P.
  const axisPts: Array<[P, number, string]> = [
    [[1, 0], P0[1] > 0 ? -45 : 45, '(1, 0)'],
    [[0, 1], P0[0] > 0 ? 135 : 45, '(0, 1)'],
    [[-1, 0], P0[1] > 0 ? -135 : 135, '(−1, 0)'],
    [[0, -1], P0[0] > 0 ? -135 : -45, '(0, −1)'],
  ];
  for (const [p, a, text] of axisPts) if (Math.hypot(p[0] - P0[0], p[1] - P0[1]) > 0.2) s.endLabel(p, a, text, 20);
  return s.build({ margin: 0.3, caption: o.caption });
}

/** A sector of a circle with central angle θ (radians): the radius, angle and arc are labelled. */
export function sectorFigure(o: { theta: number; r: string; angle: string; arc?: string }): PlaneFigure {
  const s = new Sketch();
  const deg = (o.theta * 180) / PI;
  s.polyline(circlePts(), 'muted');
  const n = Math.max(6, Math.ceil(deg / 8));
  s.polyline(Array.from({ length: n + 1 }, (_, i) => at([0, 0], (deg * i) / n, 1)), 'accent');
  s.seg([0, 0], [1, 0], { color: 'brand' });
  s.seg([0, 0], at([0, 0], deg, 1), { color: 'brand' });
  s.arc([0, 0], 0.16, 0, deg, 'muted');
  s.dot([0, 0], 'brand');
  s.angleLabel([0, 0], 0, deg, o.angle, 24);
  s.sideLabel([0.5, 0], deg > 300 ? 90 : -90, o.r);
  if (o.arc) s.endLabel(at([0, 0], deg / 2, 1), deg / 2, o.arc, 12);
  return s.build({ margin: 0.35 });
}

// ---------------------------------------------------------------------------
// Lesson 4.1 — Angles and angle measure
// ---------------------------------------------------------------------------

const DEG_SPECIAL_LIST = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];

/** "θ × π/180° = ..." */
function toRadSteps(deg: number): string[] {
  const f = piFrac(deg);
  const raw = `${deg < 0 ? '-' : ''}\\dfrac{${Math.abs(deg)}\\pi}{180}`;
  return [`Multiply by $\\dfrac{\\pi}{180^\\circ}$: $${dg(deg)} \\times \\dfrac{\\pi}{180^\\circ} = ${raw}$`, `Simplify the fraction: $${raw} = ${piTex(f)}$, so $${dg(deg)} = ${piTex(f)}$ radians.`];
}
function toDegSteps(deg: number): string[] {
  const f = piFrac(deg);
  const mid = f.d === 1 ? `${f.n}(180^\\circ)` : `${f.n < 0 ? '-' : ''}\\dfrac{${Math.abs(f.n)}(180^\\circ)}{${f.d}}`;
  return [`Multiply by $\\dfrac{180^\\circ}{\\pi}$, because $\\pi$ radians $= 180^\\circ$: $${piTex(f)} \\times \\dfrac{180^\\circ}{\\pi} = ${mid}$`, `$${piTex(f)} = ${dg(deg)}$`];
}

const SPINNERS = [
  { what: 'The blades of a wind turbine at a wind farm turn', noun: 'a blade', rpm: [12, 15, 18, 20] },
  { what: "A potter's wheel spins", noun: 'the wheel', rpm: [60, 75, 90, 120] },
  { what: 'A ceiling fan turns', noun: 'a fan blade', rpm: [80, 90, 100, 120] },
  { what: 'The drum of a clothes dryer turns', noun: 'the drum', rpm: [45, 50, 54, 60] },
  { what: 'A merry-go-round at a playground turns', noun: 'the merry-go-round', rpm: [6, 8, 10, 12] },
  { what: 'The reel of a combine harvester turns', noun: 'the reel', rpm: [30, 36, 40, 45] },
];

const radianConvert = skill({
  id: 'm301-radian-convert',
  name: 'Degrees and radians',
  description: 'Convert angle measures between degrees and radians, exactly in terms of π or as decimals, and use radians to describe rotations.',
  outcomes: ['T1'],
  lessonId: 'm301-4-1',
  calculator: true,
  gen(rng, d): GenOutput {
    if (d === 1) {
      const deg = rng.pick(DEG_SPECIAL_LIST) * (rng.chance(0.2) ? -1 : 1);
      if (rng.chance(0.5)) {
        return {
          prompt: `Convert $${dg(deg)}$ to radians. Give an exact answer in terms of $\\pi$. ${PI_NOTE}`,
          parts: [numPart(rv(deg), { label: `$${dg(deg)} =$`, suffix: 'rad' })],
          hints: ['A full turn is $360^\\circ = 2\\pi$ radians, so $180^\\circ = \\pi$ radians.', 'Multiply the degree measure by $\\dfrac{\\pi}{180^\\circ}$ and simplify the fraction.'],
          solution: toRadSteps(deg),
          answerDisplay: `$${dg(deg)} = ${rt(deg)}$`,
          calculator: false,
        };
      }
      return {
        prompt: `Convert $${rt(deg)}$ radians to degrees.`,
        parts: [numPart(deg, { label: `$${rt(deg)} =$`, suffix: '°' })],
        hints: ['$\\pi$ radians $= 180^\\circ$.', 'Multiply by $\\dfrac{180^\\circ}{\\pi}$, or simply replace $\\pi$ with $180^\\circ$ and simplify.'],
        solution: toDegSteps(deg),
        calculator: false,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['degExact', 'degDecimal', 'radDecimal', 'radExact'] as const);
      if (mode === 'degExact') {
        const deg = retry(
          () => 5 * rng.int(2, 100) * (rng.chance(0.25) ? -1 : 1),
          (x) => x % 30 !== 0 && x % 45 !== 0,
        );
        return {
          prompt: `Convert $${dg(deg)}$ to radians. Give an exact answer in terms of $\\pi$, in lowest terms. ${PI_NOTE}`,
          parts: [numPart(rv(deg), { label: `$${dg(deg)} =$`, suffix: 'rad' })],
          hints: ['Multiply by $\\dfrac{\\pi}{180^\\circ}$.', `Reduce $\\dfrac{${Math.abs(deg)}}{180}$ by dividing the numerator and denominator by their greatest common factor, $${gcd(Math.abs(deg), 180)}$.`],
          solution: toRadSteps(deg),
          answerDisplay: `$${dg(deg)} = ${rt(deg)}$`,
          calculator: false,
        };
      }
      if (mode === 'radExact') {
        const den = rng.pick([5, 9, 10, 12, 18, 20]);
        const n = retry(
          () => rng.int(1, 3 * den) * (rng.chance(0.2) ? -1 : 1),
          (k) => gcd(Math.abs(k), den) === 1,
        );
        const deg = (180 * n) / den;
        return {
          prompt: `Convert $${piTex(frac(n, den))}$ radians to degrees.`,
          parts: [numPart(deg, { label: `$${piTex(frac(n, den))} =$`, suffix: '°' })],
          hints: ['$\\pi$ radians $= 180^\\circ$.', 'Multiply by $\\dfrac{180^\\circ}{\\pi}$: the $\\pi$ cancels.'],
          solution: toDegSteps(deg),
          calculator: false,
        };
      }
      if (mode === 'degDecimal') {
        const deg = retry(
          () => rng.int(10, 350) * (rng.chance(0.15) ? -1 : 1),
          (x) => x % 15 !== 0 && safeRound(rv(x), 2),
        );
        const v = rv(deg);
        return {
          prompt: `Convert $${dg(deg)}$ to radians. Round your answer to the nearest hundredth of a radian.`,
          parts: [numPart(v, { label: `$${dg(deg)} \\approx$`, suffix: 'rad', decimals: 2 })],
          hints: ['$180^\\circ = \\pi$ radians.', 'Multiply by $\\dfrac{\\pi}{180^\\circ}$, then evaluate with a calculator.'],
          solution: [`$${dg(deg)} \\times \\dfrac{\\pi}{180^\\circ} = ${rt(deg)} \\approx ${fmt(v, 4)}$`, `$${dg(deg)} \\approx ${fmtFixed(v, 2)}$ radians`],
        };
      }
      const r = retry(
        () => rng.float(0.3, 6.2, rng.chance(0.5) ? 1 : 2) * (rng.chance(0.15) ? -1 : 1),
        (x) => x !== 0 && safeRound((x * 180) / PI, 1),
      );
      const deg = (r * 180) / PI;
      return {
        prompt: `Convert $${fmt(r)}$ radians to degrees. Round your answer to the nearest tenth of a degree.`,
        parts: [numPart(deg, { label: `$${fmt(r)} \\text{ rad} \\approx$`, suffix: '°', decimals: 1 })],
        hints: ['$\\pi$ radians $= 180^\\circ$, so one radian is $\\dfrac{180^\\circ}{\\pi} \\approx 57.3^\\circ$.', 'Multiply by $\\dfrac{180^\\circ}{\\pi}$ and evaluate with a calculator.'],
        solution: [`$${fmt(r)} \\times \\dfrac{180^\\circ}{\\pi} \\approx ${fmt(deg, 3)}^\\circ$`, `$${fmt(r)}$ radians $\\approx ${fmtFixed(deg, 1)}^\\circ$`],
      };
    }
    // d === 3
    if (rng.chance(0.5)) {
      const sp = rng.pick(SPINNERS);
      const rpm = rng.pick(sp.rpm);
      const t = rng.pick([2, 3, 4, 5, 6, 8, 10, 12, 15]);
      const revs = frac(rpm * t, 60);
      const angF = frac(rpm * t, 30);
      const revTex = revs.d === 1 ? `${revs.n}` : `\\dfrac{${revs.n}}{${revs.d}}`;
      const degs = 6 * rpm * t;
      return {
        prompt: `${sp.what} at $${rpm}$ revolutions per minute. Through what angle does ${sp.noun} turn in $${t}$ seconds? Give the angle in radians, as an exact value in terms of $\\pi$, and in degrees. ${PI_NOTE}`,
        parts: [numPart((PI * rpm * t) / 30, { label: 'Angle in radians', suffix: 'rad' }), numPart(degs, { label: 'Angle in degrees', suffix: '°' })],
        hints: ['First find the number of revolutions in the given time. One minute is $60$ s.', 'One revolution is $2\\pi$ radians, or $360^\\circ$.'],
        solution: [
          `In $${t}$ s, ${sp.noun} makes $${rpm} \\times \\dfrac{${t}}{60} = ${revTex}$ revolutions.`,
          `In radians: $${revTex} \\times 2\\pi = ${piTex(angF)}$`,
          `In degrees: $${revTex} \\times 360^\\circ = ${dg(degs)}$`,
          `The angle is $${piTex(angF)}$ radians, or $${dg(degs)}$.`,
        ],
        answerDisplay: `$${piTex(angF)}$ rad $= ${dg(degs)}$`,
        calculator: false,
      };
    }
    const r = retry(
      () => rng.float(0.4, 12, 1) * (rng.chance(0.3) ? -1 : 1),
      (x) => {
        const t = norm360((x * 180) / PI);
        return t % 90 > 4 && t % 90 < 86 && safeRound((x * 180) / PI, 1);
      },
    );
    const degs = (r * 180) / PI;
    const t0 = norm360(degs);
    const q = quadrant(t0);
    const k = Math.round((t0 - degs) / 360);
    const steps = [`$${fmt(r)} \\times \\dfrac{180^\\circ}{\\pi} \\approx ${fmt(degs, 2)}^\\circ$, or about $${fmtFixed(degs, 1)}^\\circ$.`];
    if (k !== 0) steps.push(`${k > 0 ? 'Add' : 'Subtract'} $${times(Math.abs(k), '360^\\circ')}$ to find the coterminal angle between $0^\\circ$ and $360^\\circ$: about $${fmt(t0, 2)}^\\circ$.`);
    steps.push(`$${fmt(t0, 2)}^\\circ$ is between $${(q - 1) * 90}^\\circ$ and $${q * 90}^\\circ$, so the terminal arm is in quadrant ${ROMAN[q]}.`);
    return {
      prompt: `An angle of $${fmt(r)}$ radians is drawn in standard position. Convert it to degrees, to the nearest tenth of a degree, and state the quadrant in which its terminal arm lies.`,
      parts: [numPart(degs, { label: 'Angle in degrees', suffix: '°', decimals: 1 }), part(fixedChoice(QUADRANT_CHOICES, q - 1), { label: 'The terminal arm is in' })],
      hints: ['Multiply by $\\dfrac{180^\\circ}{\\pi}$ to convert to degrees.', 'If the angle is negative or more than $360^\\circ$, add or subtract $360^\\circ$ to find where the terminal arm ends. Then compare with $90^\\circ$, $180^\\circ$ and $270^\\circ$.'],
      solution: steps,
    };
  },
});

/** "θ + 360°n, n ∈ I" style general form. */
function generalTex(base: number, period: number, rad: boolean): string {
  const p = rad ? (period === 360 ? '2\\pi' : period === 180 ? '\\pi' : rt(period, true)) : dg(period);
  const b = base === 0 ? '' : `${ang(base, rad, true)} + `;
  return `${b}${p} n,\\ n \\in \\mathbb{I}`;
}

/** Every angle coterminal with t0 in [lo, hi] (inclusive flags), in degrees. */
function coterminalIn(t0: number, lo: number, hi: number, loIn: boolean, hiIn: boolean): number[] {
  const out: number[] = [];
  for (let k = -10; k <= 10; k++) {
    const v = t0 + 360 * k;
    if ((v > lo || (loIn && v === lo)) && (v < hi || (hiIn && v === hi))) out.push(v);
  }
  return out;
}
const ineq = (lo: number, hi: number, loIn: boolean, hiIn: boolean, rad: boolean, v = '\\theta') => `${ang(lo, rad, true)} ${loIn ? '\\le' : '<'} ${v} ${hiIn ? '\\le' : '<'} ${ang(hi, rad, true)}`;

const coterminal = skill({
  id: 'm301-coterminal',
  name: 'Coterminal angles',
  description: 'Find coterminal angles in degrees and radians, list the coterminal angles in a domain, and write the general form θ + 360°n or θ + 2πn.',
  outcomes: ['T1'],
  lessonId: 'm301-4-1',
  gen(rng, d): GenOutput {
    if (d === 1) {
      if (rng.chance(0.3)) {
        const deg = 5 * rng.int(74, 200);
        const pos = norm360(deg);
        if (pos === 0) return coterminalSimple(rng, deg + 25);
        return {
          prompt: `Determine the smallest positive angle and the largest negative angle that are coterminal with $${dg(deg)}$.`,
          parts: [numPart(pos, { label: 'Smallest positive angle', suffix: '°' }), numPart(pos - 360, { label: 'Largest negative angle', suffix: '°' })],
          hints: ['Coterminal angles differ by a multiple of $360^\\circ$: they share the same terminal arm.', 'Subtract $360^\\circ$ as many times as needed.'],
          solution: [
            `$${dg(deg)} - ${times((deg - pos) / 360, '360^\\circ')} = ${dg(pos)}$, the smallest positive coterminal angle.`,
            `$${dg(pos)} - 360^\\circ = ${dg(pos - 360)}$, the largest negative coterminal angle.`,
            `The angles are $${dg(pos)}$ and $${dg(pos - 360)}$.`,
          ],
        };
      }
      const deg = retry(
        () => (rng.chance(0.5) ? -5 * rng.int(1, 143) : 5 * rng.int(73, 215)),
        (x) => x % 360 !== 0,
      );
      return coterminalSimple(rng, deg);
    }
    if (d === 2) {
      if (rng.chance(0.6)) {
        const deg = retry(
          () => (rng.chance(0.5) ? -1 : 1) * rng.pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]) + 360 * rng.pick([-1, 1, 1, 2]),
          (x) => x < 0 || x >= 360,
        );
        const t0 = norm360(deg);
        const k = (t0 - deg) / 360;
        const f = piFrac(deg);
        const step = `${piTex(f)} ${k > 0 ? '+' : '-'} ${times(Math.abs(k), '2\\pi')}`;
        return {
          prompt: `Determine the angle $\\theta$, $0 \\le \\theta < 2\\pi$, that is coterminal with $${piTex(f)}$. Give an exact answer. ${PI_NOTE}`,
          parts: [numPart(rv(t0), { label: '$\\theta =$' })],
          hints: ['Coterminal angles differ by a multiple of $2\\pi$.', `${deg < 0 ? 'Add' : 'Subtract'} $2\\pi = \\dfrac{${2 * f.d}\\pi}{${f.d}}$ until the angle is between $0$ and $2\\pi$.`],
          solution: [
            ...(f.d > 1 ? [`Write $2\\pi$ with denominator $${f.d}$: $2\\pi = \\dfrac{${2 * f.d}\\pi}{${f.d}}$.`] : []),
            `${deg < 0 ? 'Add' : 'Subtract'} $2\\pi$ ${timesWord(Math.abs(k))}: $${step} = ${rt(t0)}$`,
            `$\\theta = ${rt(t0)}$`,
          ],
          answerDisplay: `$\\theta = ${rt(t0)}$`,
        };
      }
      return generalFormMc(rng, false);
    }
    // d === 3
    if (rng.chance(0.35)) return generalFormMc(rng, true);
    const rad = rng.chance(0.6);
    const t0 = rng.pick(rad ? SPECIAL_DEG.filter((t) => t !== 0) : [...SPECIAL_DEG.filter((t) => t !== 0), 20, 50, 75, 100, 110, 165, 200, 250, 290, 345]);
    const given = t0 + 360 * rng.pick([-2, -1, 0, 1, 2]);
    const [lo, hi, loIn, hiIn] = rng.pick([
      [-720, 720, true, true],
      [-720, 360, true, false],
      [-360, 1080, true, false],
      [0, 1080, true, false],
      [-1080, 360, false, true],
      [-540, 540, true, true],
    ] as Array<[number, number, boolean, boolean]>);
    const values = coterminalIn(t0, lo, hi, loIn, hiIn);
    const A = (x: number) => ang(x, rad, true);
    const full = rad ? '2\\pi' : '360^\\circ';
    const sorted = [...values].sort((a, b) => a - b);
    const seq: number[] = [];
    for (let v = sorted[0] - 360; v <= sorted[sorted.length - 1] + 360; v += 360) seq.push(v);
    const steps = [
      `Coterminal angles differ by multiples of $${full}$. Adding and subtracting $${full}$ from $${A(given)}$ gives $\\ldots,\\ ${seq.map(A).join(',\\ ')},\\ \\ldots$`,
      `Keep the angles with $${ineq(lo, hi, loIn, hiIn, rad)}$${seq.some((v) => v === lo || v === hi) ? ', checking whether each endpoint is included' : ''}.`,
    ];
    steps.push(`The angles are ${sorted.map((v) => `$${A(v)}$`).join(', ')}.`);
    return {
      prompt: `Determine all angles $\\theta$ that are coterminal with $${ang(given, rad)}$ in the domain $${ineq(lo, hi, loIn, hiIn, rad)}$. ${rad ? `Give exact values separated by commas. ${PI_NOTE}` : 'Separate the angles with commas.'}`,
      parts: [part({ kind: 'numbers', values: sorted.map((v) => (rad ? rv(v) : v)) }, { label: '$\\theta =$', ...(rad ? {} : { suffix: '°' }), placeholder: rad ? 'For example: -pi/3, 5pi/3' : 'For example: -300, 60' })],
      hints: [`Coterminal angles differ by a multiple of $${full}$.`, `Add and subtract $${full}$ from $${A(given)}$ until you leave the domain. Check the endpoints carefully.`],
      solution: steps,
      answerDisplay: sorted.map((v) => `$${A(v)}$`).join(', '),
    };
  },
});

function coterminalSimple(rng: Rng, deg: number): GenOutput {
  const t0 = norm360(deg);
  const k = (t0 - deg) / 360;
  const how = `${dg(deg)} ${k > 0 ? '+' : '-'} ${times(Math.abs(k), '360^\\circ')}`;
  void rng;
  return {
    prompt: `Determine the angle $\\theta$, $0^\\circ \\le \\theta < 360^\\circ$, that is coterminal with $${dg(deg)}$.`,
    parts: [numPart(t0, { label: '$\\theta =$', suffix: '°' })],
    hints: ['Coterminal angles share the same terminal arm, so they differ by a multiple of $360^\\circ$.', `${deg < 0 ? 'Add' : 'Subtract'} $360^\\circ$ until the angle is between $0^\\circ$ and $360^\\circ$.`],
    solution: [`${deg < 0 ? 'Add' : 'Subtract'} $360^\\circ$ ${timesWord(Math.abs(k))}: $${how} = ${dg(t0)}$`, `$\\theta = ${dg(t0)}$`],
  };
}

/** Which expression gives every angle coterminal with θ? */
function generalFormMc(rng: Rng, hard: boolean): GenOutput {
  const rad = hard || rng.chance(0.5);
  const t0 = rng.pick(rad ? NONQ : [...NONQ, 20, 75, 110, 160, 200, 250, 290, 340]);
  const given = hard ? t0 + 360 * rng.pick([-2, -1, 1, 2]) : t0;
  const correctBase = hard ? t0 : given;
  type Opt = { base: number; period: number; mixed?: boolean };
  const pool: Opt[] = [
    { base: given, period: 180 },
    { base: -given, period: 360 },
    { base: 180 - correctBase, period: 360 },
    { base: correctBase, period: 180 },
    { base: refAngle(t0) === t0 ? 360 - t0 : refAngle(t0), period: 360 },
  ];
  if (!rad) pool.push({ base: given, period: 360, mixed: true });
  if (hard) pool.push({ base: given - 360 * Math.sign(given), period: 180 });
  const same = (o: Opt) => !o.mixed && o.period === 360 && (o.base - given) % 360 === 0;
  const tex = (o: Opt) => (o.mixed ? `${dg(o.base)} + 2\\pi n,\\ n \\in \\mathbb{I}` : generalTex(o.base, o.period, rad));
  const distractors = rng.shuffle(pool.filter((o) => !same(o))).map((o) => `$${tex(o)}$`);
  const correct = `$${generalTex(correctBase, 360, rad)}$`;
  const full = rad ? '2\\pi' : '360^\\circ';
  const steps = [`Every angle coterminal with $${ang(given, rad)}$ differs from it by a whole number of turns, $${full} n$, where $n$ is an integer.`];
  if (hard) steps.push(`First find the coterminal angle between $0$ and $2\\pi$: ${coterminalNote(given, true)!.replace(/, so it has the same terminal arm\.$/, '.')}`);
  steps.push(`So the angles are $${generalTex(correctBase, 360, rad)}$. Adding $${rad ? '\\pi' : '180^\\circ'} n$ would also include angles on the opposite ray.`);
  return {
    prompt: `Which expression represents all angles coterminal with $${ang(given, rad)}$?`,
    parts: [part(mc(rng, correct, distractors))],
    hints: [`Coterminal angles share the same terminal arm, so they differ by full rotations of $${full}$.`, hard ? 'Find a coterminal angle between $0$ and $2\\pi$ first, then add $2\\pi n$.' : 'Write the angle, then add $360^\\circ n$ (or $2\\pi n$), where $n$ is any integer.'],
    solution: steps,
  };
}

const UNIT_WORD: Record<string, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre' };
const tenthOf = (u: string) => `to the nearest tenth of a ${UNIT_WORD[u]}`;

const arcLength = skill({
  id: 'm301-arc-length',
  name: 'Arc length and sectors',
  description: 'Use a = rθ (θ in radians) to find an arc length, a central angle or a radius, and solve applied problems with arcs and sectors.',
  outcomes: ['T1'],
  lessonId: 'm301-4-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const u = rng.pick(['cm', 'cm', 'm']);
    if (d === 1) {
      const r = rng.int(3, 25);
      if (rng.chance(0.5)) {
        const th = retry(
          () => rng.float(0.4, 5.8, 1),
          (x) => safeRound(r * x, 1),
        );
        const a = r * th;
        return {
          prompt: `A circle has a radius of $${r}$ ${u}. Determine the length of the arc subtended by a central angle of $${fmt(th)}$ radians, ${tenthOf(u)}.`,
          figure: sectorFigure({ theta: th, r: `${r} ${u}`, angle: `${fmt(th)} rad`, arc: 'a' }),
          parts: [numPart(a, { label: '$a \\approx$', suffix: u, decimals: 1 })],
          hints: ['When the central angle is in radians, the arc length is $a = r\\theta$.', 'Multiply the radius by the angle.'],
          solution: [`$a = r\\theta$, with $\\theta$ in radians.`, `$a = ${r}(${fmt(th)}) = ${fmt(a, 3)}$`, `The arc length is ${Number.isInteger(a * 10) ? '' : 'about '}$${fmtFixed(a, 1)}$ ${u}.`],
        };
      }
      const deg = retry(
        () => rng.pick([30, 45, 60, 90, 120, 135, 150, 210, 225, 240, 270, 300]),
        (x) => safeRound(r * rv(x), 1),
      );
      const a = r * rv(deg);
      const af = fracMul(piFrac(deg), frac(r));
      return {
        prompt: `A circle has a radius of $${r}$ ${u}. Determine the length of the arc subtended by a central angle of $${rt(deg)}$ radians, ${tenthOf(u)}.`,
        figure: sectorFigure({ theta: rv(deg), r: `${r} ${u}`, angle: `${piText(piFrac(deg)).replace('pi', 'π')}`, arc: 'a' }),
        parts: [numPart(a, { label: '$a \\approx$', suffix: u, decimals: 1 })],
        hints: ['When the central angle is in radians, the arc length is $a = r\\theta$.', 'Multiply the radius by the angle, then use $\\pi \\approx 3.14159$ (the calculator key).'],
        solution: [`$a = r\\theta = ${r} \\times ${rt(deg)} = ${piTex(af)}$`, `$${piTex(af)} \\approx ${fmt(a, 3)}$`, `The arc length is about $${fmtFixed(a, 1)}$ ${u}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['deg', 'findAngle', 'findRadius'] as const);
      if (mode === 'deg') {
        const r = rng.int(4, 30);
        const deg = retry(
          () => rng.int(20, 340),
          (x) => x % 30 !== 0 && safeRound(r * rv(x), 1),
        );
        const a = r * rv(deg);
        return {
          prompt: `Determine the length of the arc subtended by a central angle of $${dg(deg)}$ in a circle with a radius of $${r}$ ${u}, ${tenthOf(u)}.`,
          figure: sectorFigure({ theta: rv(deg), r: `${r} ${u}`, angle: `${deg}°`, arc: 'a' }),
          parts: [numPart(a, { label: '$a \\approx$', suffix: u, decimals: 1 })],
          hints: ['The formula $a = r\\theta$ only works when $\\theta$ is in radians.', 'Convert first: $\\theta = ' + `${dg(deg)} \\times \\dfrac{\\pi}{180^\\circ}$.`],
          solution: [`Convert to radians: $\\theta = ${dg(deg)} \\times \\dfrac{\\pi}{180^\\circ} = ${rt(deg)} \\approx ${fmt(rv(deg), 4)}$`, `$a = r\\theta = ${r} \\times ${rt(deg)} \\approx ${fmt(a, 3)}$`, `The arc length is about $${fmtFixed(a, 1)}$ ${u}.`],
        };
      }
      if (mode === 'findAngle') {
        const r = rng.int(4, 30);
        const a = retry(
          () => rng.float(2, r * 6, 1),
          (x) => safeRound(x / r, 2) && x / r > 0.3,
        );
        const th = a / r;
        const askDeg = rng.chance(0.4);
        const parts = [numPart(th, { label: '$\\theta \\approx$', suffix: 'rad', decimals: 2 })];
        if (askDeg) parts.push(numPart((th * 180) / PI, { label: 'In degrees, $\\theta \\approx$', suffix: '°', decimals: 1 }));
        const okDeg = !askDeg || safeRound((th * 180) / PI, 1);
        if (!okDeg) parts.pop();
        return {
          prompt: `An arc of length $${fmt(a)}$ ${u} lies on a circle with a radius of $${r}$ ${u}. Determine the central angle subtended by the arc, in radians to the nearest hundredth${parts.length > 1 ? ' and in degrees to the nearest tenth of a degree' : ''}.`,
          figure: sectorFigure({ theta: Math.min(th, 6.1), r: `${r} ${u}`, angle: 'θ', arc: `${fmt(a)} ${u}` }),
          parts,
          hints: ['Start with $a = r\\theta$ and solve for $\\theta$.', '$\\theta = \\dfrac{a}{r}$ gives the angle in radians.'],
          solution: [
            `$a = r\\theta$, so $\\theta = \\dfrac{a}{r} = \\dfrac{${fmt(a)}}{${r}} \\approx ${fmt(th, 4)}$ radians.`,
            ...(parts.length > 1 ? [`In degrees: $${fmt(th, 4)} \\times \\dfrac{180^\\circ}{\\pi} \\approx ${fmt((th * 180) / PI, 2)}^\\circ$`] : []),
            `$\\theta \\approx ${fmtFixed(th, 2)}$ radians${parts.length > 1 ? `, or about $${fmtFixed((th * 180) / PI, 1)}^\\circ$` : ''}.`,
          ],
        };
      }
      // findRadius
      const useDeg = rng.chance(0.5);
      const deg = useDeg ? rng.int(25, 300) : 0;
      const th = useDeg ? rv(deg) : rng.float(0.5, 4.5, 1);
      const a = retry(
        () => rng.float(5, 60, 1),
        (x) => safeRound(x / th, 1),
      );
      const r = a / th;
      return {
        prompt: `An arc of length $${fmt(a)}$ ${u} is subtended by a central angle of $${useDeg ? dg(deg) : `${fmt(th)}\\text{ radians}`}$. Determine the radius of the circle, ${tenthOf(u)}.`,
        figure: sectorFigure({ theta: th, r: 'r', angle: useDeg ? `${deg}°` : `${fmt(th)} rad`, arc: `${fmt(a)} ${u}` }),
        parts: [numPart(r, { label: '$r \\approx$', suffix: u, decimals: 1 })],
        hints: [useDeg ? 'Convert the angle to radians first.' : 'Use $a = r\\theta$ with $\\theta$ in radians.', 'Rearrange to $r = \\dfrac{a}{\\theta}$.'],
        solution: [
          ...(useDeg ? [`$\\theta = ${dg(deg)} \\times \\dfrac{\\pi}{180^\\circ} = ${rt(deg)} \\approx ${fmt(th, 4)}$`] : []),
          `$a = r\\theta$, so $r = \\dfrac{a}{\\theta} = \\dfrac{${fmt(a)}}{${useDeg ? fmt(th, 4) : fmt(th)}} \\approx ${fmt(r, 3)}$`,
          `The radius is about $${fmtFixed(r, 1)}$ ${u}.`,
        ],
      };
    }
    // d === 3: applications
    const kind = rng.pick(['pendulum', 'tire', 'latitude', 'sprinkler', 'clock', 'pulley'] as const);
    const name = rng.pick(PEOPLE);
    if (kind === 'pendulum') {
      const L = rng.int(40, 150);
      const deg = retry(
        () => rng.int(8, 40),
        (x) => safeRound(L * rv(x), 1),
      );
      const a = L * rv(deg);
      return {
        prompt: `The pendulum of a clock in a museum in ${rng.pick(['Riverton', 'Brookfield', 'Hillcrest', 'Ashford'])} is $${L}$ cm long. It swings through an angle of $${dg(deg)}$ from one side to the other. How far does the tip of the pendulum travel in one swing? Give your answer to the nearest tenth of a centimetre.`,
        parts: [numPart(a, { label: 'Distance', suffix: 'cm', decimals: 1 })],
        hints: ['The tip moves along an arc of a circle whose radius is the length of the pendulum.', 'Convert the angle to radians, then use $a = r\\theta$.'],
        solution: [`$r = ${L}$ cm and $\\theta = ${dg(deg)} = ${rt(deg)}$ radians.`, `$a = r\\theta = ${L} \\times ${rt(deg)} \\approx ${fmt(a, 3)}$`, `The tip travels about $${fmtFixed(a, 1)}$ cm in one swing.`],
      };
    }
    if (kind === 'tire') {
      if (rng.chance(0.5)) {
        const D = rng.pick([56, 60, 62, 64, 66, 68, 70, 72]);
        const dist = retry(
          () => rng.int(20, 400) / 10,
          (x) => safeRound((x * 100) / (D / 2), 1),
        );
        const th = (dist * 100) / (D / 2);
        return {
          prompt: `${name}'s bicycle wheel has a diameter of $${D}$ cm. Through what angle, in radians, does the wheel turn as the bicycle rolls $${fmt(dist)}$ m? Give your answer to the nearest tenth of a radian.`,
          parts: [numPart(th, { label: '$\\theta \\approx$', suffix: 'rad', decimals: 1 })],
          hints: ['As the wheel rolls without slipping, the distance travelled equals the arc length turned by a point on the rim.', `Use $r = ${D / 2}$ cm and convert the distance to centimetres. Then $\\theta = \\dfrac{a}{r}$.`],
          solution: [`$r = \\dfrac{${D}}{2} = ${D / 2}$ cm and $a = ${fmt(dist)}$ m $= ${fmt(dist * 100)}$ cm.`, `$\\theta = \\dfrac{a}{r} = \\dfrac{${fmt(dist * 100)}}{${D / 2}} \\approx ${fmt(th, 3)}$`, `The wheel turns through about $${fmtFixed(th, 1)}$ radians.`],
        };
      }
      const [D, revs] = retry(
        () => [rng.pick([56, 60, 62, 64, 66, 68, 70, 72]), rng.pick([2.5, 3, 4.5, 5, 7.5, 10, 12, 15])],
        ([dd, n]) => safeRound(((dd / 2) * 2 * PI * n) / 100, 2),
      );
      const dist = ((D / 2) * 2 * PI * revs) / 100;
      return {
        prompt: `A car tire has a diameter of $${D}$ cm. How far does the car travel, in metres, while the tire makes $${fmt(revs)}$ complete rotations? Give your answer to the nearest hundredth of a metre.`,
        parts: [numPart(dist, { label: 'Distance', suffix: 'm', decimals: 2 })],
        hints: ['The distance travelled equals the arc length turned by a point on the tire. One rotation is $2\\pi$ radians.', 'Find $\\theta$ in radians, then use $a = r\\theta$ with $r$ half the diameter.'],
        solution: [`$\\theta = ${fmt(revs)} \\times 2\\pi = ${fmt(2 * revs)}\\pi$ radians and $r = ${D / 2}$ cm.`, `$a = r\\theta = ${D / 2} \\times ${fmt(2 * revs)}\\pi \\approx ${fmt(dist * 100, 2)}$ cm`, `The car travels about $${fmtFixed(dist, 2)}$ m.`],
      };
    }
    if (kind === 'latitude') {
      const lat1 = rng.float(49, 53, 1);
      const lat2 = retry(
        () => rng.float(53.5, 59.5, 1),
        (x) => safeRound(6370 * rv(Math.round((x - lat1) * 10) / 10), 0),
      );
      const dl = Math.round((lat2 - lat1) * 10) / 10;
      const a = 6370 * rv(dl);
      return {
        prompt: `Two weather stations lie on the same line of longitude, one at latitude $${fmt(lat1)}^\\circ$N and the other at latitude $${fmt(lat2)}^\\circ$N. Treat Earth as a sphere with a radius of $6370$ km. How far apart are the stations, measured along Earth's surface? Give your answer to the nearest kilometre.`,
        parts: [numPart(a, { label: 'Distance', suffix: 'km', decimals: 0 })],
        hints: ['The stations lie on a circle through the poles with the same radius as Earth. The central angle between them is the difference in latitude.', 'Convert the angle to radians, then use $a = r\\theta$.'],
        solution: [`Central angle: $${fmt(lat2)}^\\circ - ${fmt(lat1)}^\\circ = ${fmt(dl)}^\\circ = ${fmt(dl)} \\times \\dfrac{\\pi}{180} \\approx ${fmt(rv(dl), 5)}$ radians`, `$a = r\\theta = 6370 \\times ${fmt(rv(dl), 5)} \\approx ${fmt(a, 2)}$`, `The stations are about $${fmtFixed(a, 0)}$ km apart.`],
      };
    }
    if (kind === 'sprinkler') {
      const r = rng.int(4, 15);
      const deg = retry(
        () => rng.pick([60, 75, 90, 105, 120, 135, 150, 210, 240, 270]),
        (x) => safeRound(0.5 * r * r * rv(x), 1),
      );
      const A = 0.5 * r * r * rv(deg);
      const Af = fracMul(piFrac(deg), frac(r * r, 2));
      return {
        prompt: `A lawn sprinkler sprays water a distance of $${r}$ m while rotating through an angle of $${dg(deg)}$. The area of a sector with radius $r$ and central angle $\\theta$, in radians, is $A = \\dfrac{1}{2}r^2\\theta$. What area of lawn does the sprinkler water? Give your answer to the nearest tenth of a square metre.`,
        figure: sectorFigure({ theta: rv(deg), r: `${r} m`, angle: `${deg}°` }),
        parts: [numPart(A, { label: '$A \\approx$', suffix: 'm²', decimals: 1 })],
        hints: ['The formula needs $\\theta$ in radians.', `Convert $${dg(deg)}$ to radians, then substitute into $A = \\dfrac{1}{2}r^2\\theta$.`],
        solution: [`$\\theta = ${dg(deg)} = ${rt(deg)}$`, `$A = \\dfrac{1}{2}(${r})^2\\left(${rt(deg)}\\right) = ${piTex(Af)} \\approx ${fmt(A, 3)}$`, `The sprinkler waters about $${fmtFixed(A, 1)}$ m².`],
      };
    }
    if (kind === 'clock') {
      const L = rng.int(15, 120);
      const mins = retry(
        () => rng.pick([5, 10, 12, 15, 20, 25, 35, 40, 45, 50]),
        (x) => safeRound((L * 2 * PI * x) / 60, 1),
      );
      const th = frac(mins, 30);
      const a = L * PI * (mins / 30);
      const big = L > 60;
      return {
        prompt: `The minute hand of ${big ? 'the clock on a town hall tower' : 'a classroom clock'} is $${L}$ cm long. How far does the tip of the minute hand travel in $${mins}$ minutes? Give your answer to the nearest tenth of a centimetre.`,
        parts: [numPart(a, { label: 'Distance', suffix: 'cm', decimals: 1 })],
        hints: ['The minute hand makes one full turn, $2\\pi$ radians, every $60$ minutes.', `In $${mins}$ minutes it turns $\\dfrac{${mins}}{60}$ of $2\\pi$. Then use $a = r\\theta$.`],
        solution: [`$\\theta = \\dfrac{${mins}}{60} \\times 2\\pi = ${piTex(th)}$ radians`, `$a = r\\theta = ${L} \\times ${piTex(th)} \\approx ${fmt(a, 3)}$`, `The tip travels about $${fmtFixed(a, 1)}$ cm.`],
      };
    }
    // pulley
    const D = rng.pick([20, 24, 30, 36, 40, 50]);
    const rope = retry(
      () => rng.int(30, 250),
      (x) => safeRound(x / (D / 2), 2) && safeRound((x / (D / 2)) * (180 / PI), 0),
    );
    const th = rope / (D / 2);
    return {
      prompt: `A rope runs over a pulley with a diameter of $${D}$ cm. ${name} pulls $${rope}$ cm of rope over the pulley without slipping. Through what angle does the pulley turn? Give the angle in radians to the nearest hundredth and in degrees to the nearest degree.`,
      parts: [numPart(th, { label: 'In radians', suffix: 'rad', decimals: 2 }), numPart((th * 180) / PI, { label: 'In degrees', suffix: '°', decimals: 0 })],
      hints: ['The length of rope that passes over the pulley equals the arc length turned by the rim.', `Use $\\theta = \\dfrac{a}{r}$ with $r = ${D / 2}$ cm, then multiply by $\\dfrac{180^\\circ}{\\pi}$.`],
      solution: [`$r = \\dfrac{${D}}{2} = ${D / 2}$ cm`, `$\\theta = \\dfrac{a}{r} = \\dfrac{${rope}}{${D / 2}} \\approx ${fmt(th, 4)}$ radians`, `In degrees: $${fmt(th, 4)} \\times \\dfrac{180^\\circ}{\\pi} \\approx ${fmt((th * 180) / PI, 2)}^\\circ$`, `The pulley turns about $${fmtFixed(th, 2)}$ radians, or about $${fmtFixed((th * 180) / PI, 0)}^\\circ$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 4.2 — The unit circle
// ---------------------------------------------------------------------------

/** Pythagorean triples with coprime legs. */
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
];

const pointPart = (p: [Ex, Ex], label: string) => part({ kind: 'point', x: exValue(p[0]), y: exValue(p[1]) }, { label, placeholder: 'For example: (sqrt(2)/2, -1/2)' });

const unitCirclePoint = skill({
  id: 'm301-unit-circle-point',
  name: 'Points on the unit circle',
  description: 'Find exact coordinates of P(θ) on the unit circle for special angles in degrees and radians, a missing coordinate from x² + y² = 1, and related points by symmetry.',
  outcomes: ['T2', 'T3'],
  lessonId: 'm301-4-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const t = rng.pick(rng.chance(0.85) ? NONQ : [0, 90, 180, 270]);
      const rad = rng.chance(0.35);
      const p = unitPoint(t);
      return {
        prompt: `The terminal arm of $\\theta = ${ang(t, rad)}$ in standard position meets the unit circle at $P(\\theta)$. Determine the exact coordinates of $P(\\theta)$. ${SQRT_NOTE}`,
        figure: unitCircleFigure({ theta: t, label: 'P(θ)' }),
        parts: [pointPart(p, '$P(\\theta) =$')],
        hints: [
          'On the unit circle, $P(\\theta) = (\\cos\\theta, \\sin\\theta)$. Use the reference angle and its special triangle.',
          'For the reference angle $30^\\circ$ the point is $\\left(\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$, for $45^\\circ$ it is $\\left(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$, and for $60^\\circ$ it is $\\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$. Then give each coordinate the sign for the quadrant.',
        ],
        solution: [...pointSteps(t, rad), `$P\\left(${ang(t, rad)}\\right) = ${pointTex(p)}$`],
        answerDisplay: `$P\\left(${ang(t, rad)}\\right) = ${pointTex(p)}$`,
      };
    }
    if (d === 2) {
      if (rng.chance(0.55)) {
        const t0 = rng.pick(rng.chance(0.85) ? NONQ : [0, 90, 180, 270]);
        const deg = rng.chance(0.6) ? t0 + 360 * rng.pick([-2, -1, 1]) : t0;
        const p = unitPoint(deg);
        return {
          prompt: `Determine the exact coordinates of $P\\left(${rt(deg)}\\right)$, the point where the terminal arm of $\\theta = ${rt(deg)}$ meets the unit circle. ${SQRT_NOTE}`,
          parts: [pointPart(p, `$P\\left(${rt(deg)}\\right) =$`)],
          hints: [deg < 0 || deg >= 360 ? 'First find a coterminal angle between $0$ and $2\\pi$ by adding or subtracting $2\\pi$.' : 'Find the quadrant and the reference angle.', 'The reference angle gives the coordinates without signs; the quadrant gives the signs.'],
          solution: [...pointSteps(deg, true), `$P\\left(${rt(deg)}\\right) = ${pointTex(p)}$`],
          answerDisplay: `$${pointTex(p)}$`,
        };
      }
      // missing coordinate
      const q = rng.pick([1, 2, 3, 4, 2, 3, 4]);
      const sx = q === 1 || q === 4 ? 1 : -1;
      const sy = q <= 2 ? 1 : -1;
      let known: Ex;
      let other: Ex;
      if (rng.chance(0.6)) {
        const [a, b, c] = rng.pick(TRIPLES);
        const [m, n] = rng.chance(0.5) ? [a, b] : [b, a];
        known = ex(m, c);
        other = ex(n, c);
      } else {
        const [n, h] = retry(
          () => [rng.int(1, 8), rng.int(2, 9)],
          ([a, b]) => a < b && gcd(a, b) === 1 && !isPerfectSquare(b * b - a * a),
        );
        known = ex(n, h);
        other = ex(1, h, h * h - n * n);
      }
      const giveX = rng.chance(0.5);
      const X = exScale(giveX ? known : other, frac(sx));
      const Y = exScale(giveX ? other : known, frac(sy));
      const kv = giveX ? X : Y;
      const uv = giveX ? Y : X;
      const uName = giveX ? 'y' : 'x';
      const k2 = exMul(kv, kv);
      const u2 = exAdd(ex(1), exNeg(k2));
      const pTex = giveX ? `\\left(${exLatex(X)},\\ y\\right)` : `\\left(x,\\ ${exLatex(Y)}\\right)`;
      return {
        prompt: `The point $P(\\theta) = ${pTex}$ lies on the unit circle, and the terminal arm of $\\theta$ is in quadrant ${ROMAN[q]}. Determine the exact value of $${uName}$. ${SQRT_NOTE}`,
        parts: [exPart(uv, { label: `$${uName} =$` })],
        hints: ['Every point on the unit circle satisfies $x^2 + y^2 = 1$.', `Solve for $${uName}^2$, take the square root, and choose the sign for quadrant ${ROMAN[q]}.`],
        solution: [
          `Substitute into $x^2 + y^2 = 1$: $${giveX ? `${exParen(kv)}^2 + y^2` : `x^2 + ${exParen(kv)}^2`} = 1$`,
          `$${uName}^2 = 1 - ${exLatex(k2)} = ${exLatex(u2)}$, so $${uName} = \\pm${exLatex(exScale(uv, frac(Math.sign(exValue(uv)))))}$.`,
          `In quadrant ${ROMAN[q]}, $${uName} ${exValue(uv) > 0 ? '> 0' : '< 0'}$, so $${uName} = ${exLatex(uv)}$.`,
        ],
        answerDisplay: `$${uName} = ${exLatex(uv)}$`,
      };
    }
    // d === 3
    const mode = rng.pick(['symmetry', 'bigCircle', 'findAngle'] as const);
    if (mode === 'symmetry') {
      const [a, b, c] = rng.pick(TRIPLES);
      const [m, n] = rng.chance(0.5) ? [a, b] : [b, a];
      const x = frac(m * rng.sign(), c);
      const y = frac(n * rng.sign(), c);
      const neg = (f: Frac) => frac(-f.n, f.d);
      const f2 = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n < 0 ? '-' : ''}\\dfrac{${Math.abs(f.n)}}{${f.d}}`);
      const P = (u: Frac, v: Frac) => `\\left(${f2(u)},\\ ${f2(v)}\\right)`;
      const opts = [
        { arg: '\\theta + \\pi', p: [neg(x), neg(y)], why: 'Adding $\\pi$ turns the terminal arm halfway around the circle, to the opposite point. Both coordinates change sign.' },
        { arg: '-\\theta', p: [x, neg(y)], why: 'The angle $-\\theta$ is the reflection of $\\theta$ in the $x$-axis: $x$ stays the same and $y$ changes sign.' },
        { arg: '\\pi - \\theta', p: [neg(x), y], why: 'The angle $\\pi - \\theta$ is the reflection of $\\theta$ in the $y$-axis: $x$ changes sign and $y$ stays the same.' },
        { arg: '\\theta + \\dfrac{\\pi}{2}', p: [neg(y), x], why: 'Adding $\\dfrac{\\pi}{2}$ rotates the point a quarter turn counterclockwise, which takes $(x, y)$ to $(-y, x)$.' },
        { arg: '\\dfrac{\\pi}{2} - \\theta', p: [y, x], why: 'The angle $\\dfrac{\\pi}{2} - \\theta$ is the reflection of $\\theta$ in the line $y = x$, which swaps the coordinates.' },
        { arg: '\\theta - \\pi', p: [neg(x), neg(y)], why: 'Subtracting $\\pi$ turns the terminal arm halfway around the circle, to the opposite point. Both coordinates change sign.' },
      ] as const;
      const o = rng.pick(opts);
      const [u, v] = o.p;
      return {
        prompt: `The point $P(\\theta) = ${P(x, y)}$ is on the unit circle. Determine the exact coordinates of $P\\left(${o.arg}\\right)$.`,
        parts: [part({ kind: 'point', x: u.n / u.d, y: v.n / v.d }, { label: `$P\\left(${o.arg}\\right) =$`, placeholder: 'For example: (3/5, -4/5)' })],
        hints: ['Sketch $P(\\theta)$ and the new angle on the unit circle. How is the new terminal arm related to the old one?', 'Rotations by $\\pi$ and reflections in the axes keep the same numbers in the coordinates but can change their signs or swap them.'],
        solution: [o.why, `$P\\left(${o.arg}\\right) = ${P(u, v)}$`],
        answerDisplay: `$${P(u, v)}$`,
      };
    }
    if (mode === 'bigCircle') {
      const r = rng.int(2, 10);
      const t = rng.pick(NONQ);
      const rad = rng.chance(0.6);
      const p = unitPoint(t);
      const big: [Ex, Ex] = [exScale(p[0], frac(r)), exScale(p[1], frac(r))];
      return {
        prompt: `The terminal arm of $\\theta = ${ang(t, rad)}$ in standard position meets the circle $x^2 + y^2 = ${r * r}$ at point $A$. Determine the exact coordinates of $A$. ${SQRT_NOTE}`,
        parts: [pointPart(big, '$A =$')],
        hints: [`The circle $x^2 + y^2 = ${r * r}$ has radius $${r}$. Its points are $(r\\cos\\theta, r\\sin\\theta)$.`, 'Find $P(\\theta)$ on the unit circle, then multiply both coordinates by the radius.'],
        solution: [`The radius is $r = \\sqrt{${r * r}} = ${r}$, so $A = (${r}\\cos\\theta, ${r}\\sin\\theta)$: the point $P(\\theta)$ on the unit circle, scaled by $${r}$.`, ...pointSteps(t, rad), `$A = ${r}${pointTex(p)} = ${pointTex(big)}$`],
        answerDisplay: `$A = ${pointTex(big)}$`,
      };
    }
    // findAngle
    const t = rng.pick(rng.chance(0.85) ? NONQ : [90, 180, 270]);
    const p = unitPoint(t);
    const negDomain = rng.chance(0.35);
    const target = negDomain ? t - 360 : t;
    const q = isQuadrantal(t) ? 0 : quadrant(t);
    const r = isQuadrantal(t) ? t : refAngle(t);
    return {
      prompt: `The point $${pointTex(p)}$ is where the terminal arm of an angle $\\theta$ meets the unit circle. Determine $\\theta$ if $${negDomain ? '-2\\pi \\le \\theta < 0' : '0 \\le \\theta < 2\\pi'}$. Give an exact answer. ${PI_NOTE}`,
      parts: [numPart(rv(target), { label: '$\\theta =$' })],
      hints: ['The signs of the coordinates tell you the quadrant; their sizes tell you the reference angle.', negDomain ? 'Find the angle between $0$ and $2\\pi$ first, then subtract $2\\pi$.' : 'Use $\\theta = \\pi - \\theta_R$, $\\pi + \\theta_R$ or $2\\pi - \\theta_R$ for quadrants II, III and IV.'],
      solution: [
        q === 0
          ? `The point is on an axis, so $\\theta$ is a quadrantal angle: $\\theta = ${rt(t)}$ in $[0, 2\\pi)$.`
          : `$x ${exValue(p[0]) > 0 ? '>' : '<'} 0$ and $y ${exValue(p[1]) > 0 ? '>' : '<'} 0$, so $\\theta$ is in quadrant ${ROMAN[q]}. The coordinates match the reference angle $\\theta_R = ${rt(r)}$.`,
        ...(q > 1 ? [`$\\theta = ${q === 2 ? `\\pi - ${rt(r, true)}` : q === 3 ? `\\pi + ${rt(r, true)}` : `2\\pi - ${rt(r, true)}`} = ${rt(t)}$`] : []),
        ...(negDomain ? [`In $-2\\pi \\le \\theta < 0$: $${rt(t)} - 2\\pi = ${rt(target)}$`] : []),
        `$\\theta = ${rt(target)}$`,
      ],
      answerDisplay: `$\\theta = ${rt(target)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 4.3 — Trigonometric ratios
// ---------------------------------------------------------------------------

/** Steps for the exact value of f at a special angle; value null when undefined. */
function exactSteps(f: Fn6, deg: number, rad: boolean): { steps: string[]; value: Ex | null } {
  const p = unitPoint(deg);
  const value = exact6(f, deg);
  const steps = pointSteps(deg, rad);
  steps.push(`So $x = ${exLatex(p[0])}$ and $y = ${exLatex(p[1])}$.`);
  const sub: Record<Fn6, string> = {
    sin: exLatex(p[1]),
    cos: exLatex(p[0]),
    tan: `\\dfrac{${exLatex(p[1])}}{${exLatex(p[0])}}`,
    csc: `\\dfrac{1}{${exLatex(p[1])}}`,
    sec: `\\dfrac{1}{${exLatex(p[0])}}`,
    cot: `\\dfrac{${exLatex(p[0])}}{${exLatex(p[1])}}`,
  };
  const lhs = fnAt(f, deg, rad);
  if (value === null) {
    steps.push(`$${lhs} = ${DEF_UNIT[f]} = ${sub[f]}$. Division by zero is not defined, so $${lhs}$ is undefined.`);
  } else if (f === 'sin' || f === 'cos') {
    steps.push(`$${lhs} = ${DEF_UNIT[f]} = ${exLatex(value)}$`);
  } else {
    const den = f === 'csc' || f === 'cot' ? p[1] : p[0];
    const rationalize = hasRoot(den) && hasRoot(value);
    steps.push(`$${lhs} = ${DEF_UNIT[f]} = ${sub[f]} = ${exLatex(value)}$${rationalize ? ' (multiply by the reciprocal, then rationalize the denominator)' : ''}`);
  }
  return { steps, value };
}

const exactTrig = skill({
  id: 'm301-exact-trig',
  name: 'Exact values of the six ratios',
  description: 'Determine exact values of sine, cosine, tangent, cosecant, secant and cotangent for special angles in degrees and radians, including quadrantal angles.',
  outcomes: ['T3'],
  lessonId: 'm301-4-3',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const t = rng.pick([30, 45, 60, 30, 45, 60, 120, 135, 150]);
      const f = rng.pick(rng.chance(0.6) ? (['csc', 'sec', 'cot'] as Fn6[]) : (['sin', 'cos', 'tan'] as Fn6[]));
      const rad = rng.chance(0.5);
      const { steps, value } = exactSteps(f, t, rad);
      return {
        prompt: `Determine the exact value of $${fnAt(f, t, rad)}$. ${SQRT_NOTE}`,
        figure: unitCircleFigure({ theta: t, label: 'P(θ)' }),
        parts: [exPart(value!, { label: `$${fnAt(f, t, rad)} =$` })],
        hints: [
          'Find the point $P(\\theta) = (x, y)$ on the unit circle.',
          '$\\sin\\theta = y$, $\\cos\\theta = x$, $\\tan\\theta = \\dfrac{y}{x}$, and the reciprocal ratios are $\\csc\\theta = \\dfrac{1}{y}$, $\\sec\\theta = \\dfrac{1}{x}$, $\\cot\\theta = \\dfrac{x}{y}$.',
        ],
        solution: [...steps, `Type it as \`${exText(value!)}\`.`],
        answerDisplay: `$${fnAt(f, t, rad)} = ${exLatex(value!)}$`,
      };
    }
    if (d === 2) {
      const quad = rng.chance(0.25);
      const t0 = quad ? rng.pick([0, 90, 180, 270]) : rng.pick(NONQ);
      const rad = rng.chance(0.7);
      const deg = rad && rng.chance(0.45) ? t0 + 360 * rng.pick([-1, -1, 1, 2]) : t0;
      const f = rng.pick(FN6);
      const { steps, value } = exactSteps(f, deg, rad);
      const lhs = fnAt(f, deg, rad);
      if (value === null) {
        return {
          prompt: `Determine the exact value of $${lhs}$.`,
          parts: [part(mc(rng, 'undefined', ['$0$', '$1$', '$-1$']))],
          hints: ['Find the point $P(\\theta) = (x, y)$ on the unit circle. For a quadrantal angle it lies on an axis.', 'Write the ratio in terms of $x$ and $y$. A denominator of zero means the ratio is undefined.'],
          solution: [...steps],
          answerDisplay: 'undefined',
        };
      }
      return {
        prompt: `Determine the exact value of $${lhs}$. ${SQRT_NOTE}`,
        parts: [exPart(value, { label: `$${lhs} =$` })],
        hints: [
          deg < 0 || deg >= 360 ? 'Find a coterminal angle between $0$ and $2\\pi$ first.' : 'Find the quadrant and the reference angle, then the point $P(\\theta) = (x, y)$.',
          'Use $\\csc\\theta = \\dfrac{1}{y}$, $\\sec\\theta = \\dfrac{1}{x}$ and $\\cot\\theta = \\dfrac{x}{y}$ for the reciprocal ratios. Keep the signs of $x$ and $y$.',
        ],
        solution: steps,
        answerDisplay: `$${lhs} = ${exLatex(value)}$`,
      };
    }
    // d === 3: an expression with two ratios
    type Term = { f: Fn6; t: number; sq: boolean; k: number; v: Ex; raw: Ex };
    const rad = rng.chance(0.7);
    const makeTerm = (): Term => {
      const f = rng.pick(FN6);
      const t = rng.pick(rng.chance(0.85) ? NONQ : [0, 90, 180, 270]);
      const sq = rng.chance(0.35);
      const k = rng.chance(0.25) ? rng.pick([2, 3, 4]) : 1;
      const raw = exact6(f, t) ?? ex(0);
      const base = sq ? exMul(raw, raw) : raw;
      return { f, t, sq, k, raw, v: exScale(base, frac(k)) };
    };
    const ok = (x: Term) => exact6(x.f, x.t) !== null;
    const t1 = retry(makeTerm, ok);
    const t2 = retry(makeTerm, (x) => ok(x) && (x.f !== t1.f || x.t !== t1.t));
    const op = rng.pick(['+', '-', '\\cdot'] as const);
    const tex = (x: Term) => `${x.k === 1 ? '' : x.k}\\${x.f}${x.sq ? '^2' : ''} ${ang(x.t, rad, true)}`;
    const valTex = (x: Term) => {
      const l = exLatex(x.raw);
      const needParen = l.startsWith('-') || l.includes('\\dfrac') || (x.sq && l.includes('\\sqrt'));
      let body = needParen ? `\\left(${l}\\right)` : l;
      if (x.sq) body = `${body}^2`;
      return x.k === 1 ? body : `${x.k}${needParen ? body : `\\left(${body}\\right)`}`;
    };
    const result = op === '+' ? exAdd(t1.v, t2.v) : op === '-' ? exAdd(t1.v, exNeg(t2.v)) : exMul(t1.v, t2.v);
    const expr = `${tex(t1)} ${op} ${tex(t2)}`;
    const first = (x: Term) => `$\\${x.f} ${ang(x.t, rad, true)} = ${exLatex(x.raw)}$`;
    return {
      prompt: `Determine the exact value of $${expr}$. ${SQRT_NOTE}`,
      parts: [exPart(result, { label: 'Value' })],
      hints: [
        `Find each ratio separately from the point on the unit circle.${t1.sq || t2.sq ? ` Remember that $\\${(t1.sq ? t1 : t2).f}^2\\theta$ means $(\\${(t1.sq ? t1 : t2).f}\\theta)^2$.` : ''}`,
        'Substitute the exact values, then simplify. Keep radicals exact and rationalize denominators.',
      ],
      solution: [`${first(t1)} and ${first(t2)}`, `$${expr} = ${valTex(t1)} ${op} ${valTex(t2)}$`, `$= ${exLatex(result)}$ (type it as \`${exText(result)}\`)`],
      answerDisplay: `$${exLatex(result)}$`,
    };
  },
});

/** Exact |x|, |y|, r from a triple or a radical. */
function legs(rng: Rng, known: 'xr' | 'yr' | 'xy'): { ax: Ex; ay: Ex; r: Ex } {
  if (rng.chance(0.55)) {
    const [p, q, h] = rng.pick(TRIPLES.slice(0, 5));
    const [m, n] = rng.chance(0.5) ? [p, q] : [q, p];
    return { ax: ex(m), ay: ex(n), r: ex(h) };
  }
  if (known === 'xy') {
    const [m, n] = retry(
      () => [rng.int(1, 9), rng.int(1, 9)],
      ([a, b]) => gcd(a, b) === 1 && a !== b && !isPerfectSquare(a * a + b * b),
    );
    return { ax: ex(m), ay: ex(n), r: ex(1, 1, m * m + n * n) };
  }
  const [n, h] = retry(
    () => [rng.int(1, 8), rng.int(2, 9)],
    ([a, b]) => a < b && gcd(a, b) === 1 && !isPerfectSquare(b * b - a * a),
  );
  const other = ex(1, 1, h * h - n * n);
  return known === 'xr' ? { ax: ex(n), ay: other, r: ex(h) } : { ax: other, ay: ex(n), r: ex(h) };
}

const QUAD_INTERVAL = ['', '0 < \\theta < \\dfrac{\\pi}{2}', '\\dfrac{\\pi}{2} < \\theta < \\pi', '\\pi < \\theta < \\dfrac{3\\pi}{2}', '\\dfrac{3\\pi}{2} < \\theta < 2\\pi'];

const trigRatioValue = skill({
  id: 'm301-trig-ratio-value',
  name: 'Ratios and angles from given information',
  description: 'Evaluate reciprocal ratios with a calculator, find exact ratios from a point on the terminal arm or from one known ratio and the quadrant, and find an angle from a ratio.',
  outcomes: ['T3'],
  lessonId: 'm301-4-3',
  calculator: true,
  gen(rng, d): GenOutput {
    if (d === 1) {
      if (rng.chance(0.5)) {
        const f = rng.pick(['csc', 'sec', 'cot', 'csc', 'sec', 'cot', 'sin', 'cos', 'tan'] as Fn6[]);
        const rad = rng.chance(0.55);
        const x = retry(
          () => (rad ? rng.float(0.2, 6.2, rng.chance(0.5) ? 1 : 2) : rng.int(5, 355)),
          (v) => {
            const val = VALUE_FN[f](rad ? v : rv(v));
            return Math.abs(val) < 40 && Math.abs(val) > 0.05 && safeRound(val, 3) && (rad || v % 90 !== 0);
          },
        );
        const val = VALUE_FN[f](rad ? x : rv(x));
        const g = RECIP[f];
        const xTex = rad ? fmt(x) : dg(x);
        const recipStep = ['csc', 'sec', 'cot'].includes(f) ? [`$\\${f} ${xTex} = \\dfrac{1}{\\${g} ${xTex}}$`, `$\\${g} ${xTex} \\approx ${fmt(VALUE_FN[g](rad ? x : rv(x)), 6)}$, so $\\${f} ${xTex} \\approx \\dfrac{1}{${fmt(VALUE_FN[g](rad ? x : rv(x)), 6)}} \\approx ${fmt(val, 5)}$`] : [`$\\${f} ${xTex} \\approx ${fmt(val, 5)}$`];
        return {
          prompt: `Use a calculator to determine the approximate value of $\\${f} ${xTex}$${rad ? ' (the angle is in radians)' : ''}. Round your answer to the nearest thousandth.`,
          parts: [numPart(val, { label: `$\\${f} ${xTex} \\approx$`, decimals: 3 })],
          hints: [`Set your calculator to ${rad ? 'radian' : 'degree'} mode.`, ['csc', 'sec', 'cot'].includes(f) ? `Calculators have no $\\${f}$ key: use $\\${f}\\theta = \\dfrac{1}{\\${g}\\theta}$.` : 'Evaluate directly, then round.'],
          solution: [`In ${rad ? 'radian' : 'degree'} mode:`, ...recipStep, `$\\${f} ${xTex} \\approx ${fmtFixed(val, 3)}$`],
        };
      }
      const [p, q, h] = rng.pick(TRIPLES.slice(0, 5));
      const flip = rng.chance(0.5);
      const x = (flip ? q : p) * rng.sign();
      const y = (flip ? p : q) * rng.sign();
      const f = rng.pick(['csc', 'sec', 'cot'] as Fn6[]);
      const v = ratioXYR(f, ex(x), ex(y), ex(h))!;
      return {
        prompt: `The point $P(${x}, ${y})$ lies on the terminal arm of an angle $\\theta$ in standard position. Determine the exact value of $\\${f}\\theta$.`,
        parts: [exPart(v, { label: `$\\${f}\\theta =$` })],
        hints: ['Find $r = \\sqrt{x^2 + y^2}$, the distance from the origin to $P$.', `$\\${f}\\theta = ${DEF_XYR[f]}$`],
        solution: [`$r = \\sqrt{(${x})^2 + (${y})^2} = \\sqrt{${h * h}} = ${h}$`, `$\\${f}\\theta = ${DEF_XYR[f]} = \\dfrac{${f === 'cot' ? x : h}}{${f === 'sec' ? x : y}} = ${exLatex(v)}$`],
        answerDisplay: `$\\${f}\\theta = ${exLatex(v)}$`,
      };
    }
    if (d === 2) {
      const f = rng.pick(FN6);
      const q = rng.pick([2, 3, 4, 2, 3, 4, 1]);
      const known = f === 'sin' || f === 'csc' ? 'yr' : f === 'cos' || f === 'sec' ? 'xr' : 'xy';
      const { ax, ay, r } = legs(rng, known);
      const sx = q === 1 || q === 4 ? 1 : -1;
      const sy = q <= 2 ? 1 : -1;
      const X = exScale(ax, frac(sx));
      const Y = exScale(ay, frac(sy));
      const vals = Object.fromEntries(FN6.map((g) => [g, ratioXYR(g, X, Y, r)!])) as Record<Fn6, Ex>;
      const givenTex = `\\${f}\\theta = ${exLatex(vals[f])}`;
      const style = rng.pick(['quadrant', 'interval', 'sign'] as const);
      const others = FN6.filter((g) => g !== f && g !== RECIP[f]);
      const signFn = rng.pick(others);
      const where =
        style === 'quadrant' ? `the terminal arm of $\\theta$ is in quadrant ${ROMAN[q]}` : style === 'interval' ? `$${QUAD_INTERVAL[q]}$` : `$\\${signFn}\\theta ${positiveIn(signFn, q) ? '>' : '<'} 0$`;
      const asked = rng.sample(FN6.filter((g) => g !== f), 2);
      const steps: string[] = [];
      if (style === 'sign') steps.push(`$\\${f}\\theta$ is ${positiveIn(f, q) ? 'positive' : 'negative'} and $\\${signFn}\\theta$ is ${positiveIn(signFn, q) ? 'positive' : 'negative'}, so by the CAST rule $\\theta$ is in quadrant ${ROMAN[q]}.`);
      else if (style === 'interval') steps.push(`$${QUAD_INTERVAL[q]}$ means the terminal arm is in quadrant ${ROMAN[q]}.`);
      steps.push(`In quadrant ${ROMAN[q]}, $x ${sx > 0 ? '> 0' : '< 0'}$ and $y ${sy > 0 ? '> 0' : '< 0'}$; $r$ is always positive.`);
      if (known === 'xy') {
        steps.push(`$${givenTex} = ${DEF_XYR[f]}$, so take $x = ${exLatex(X)}$ and $y = ${exLatex(Y)}$.`);
        steps.push(`$r = \\sqrt{x^2 + y^2} = \\sqrt{${fmt(exValue(X) ** 2)} + ${fmt(exValue(Y) ** 2)}} = ${exLatex(r)}$`);
      } else {
        const kn = known === 'xr' ? 'x' : 'y';
        const un = known === 'xr' ? 'y' : 'x';
        const kv = known === 'xr' ? X : Y;
        const uv = known === 'xr' ? Y : X;
        steps.push(`$${givenTex} = ${DEF_XYR[f]}$, so take $${kn} = ${exLatex(kv)}$ and $r = ${exLatex(r)}$.`);
        steps.push(`$${un}^2 = r^2 - ${kn}^2 = ${fmt(exValue(r) ** 2)} - ${fmt(exValue(kv) ** 2)} = ${fmt(exValue(uv) ** 2)}$, so $${un} = ${exLatex(uv)}$.`);
      }
      steps.push(asked.map((g) => `$\\${g}\\theta = ${DEF_XYR[g]} = ${exLatex(vals[g])}$`).join(' and '));
      return {
        prompt: `Given $${givenTex}$ and ${where}, determine the exact values of $\\${asked[0]}\\theta$ and $\\${asked[1]}\\theta$. ${SQRT_NOTE}`,
        parts: asked.map((g) => exPart(vals[g], { label: `$\\${g}\\theta =$` })),
        hints: [
          `Write $\\${f}\\theta$ in terms of $x$, $y$ and $r$, and read off two of them with the correct signs.`,
          'Use $x^2 + y^2 = r^2$ for the third, then $\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$, $\\tan\\theta = \\dfrac{y}{x}$ and their reciprocals.',
        ],
        solution: steps,
        answerDisplay: asked.map((g) => `$\\${g}\\theta = ${exLatex(vals[g])}$`).join(', '),
      };
    }
    // d === 3: find the angle
    const f = rng.pick(FN6);
    const g: Fn6 = ['csc', 'sec', 'cot'].includes(f) ? RECIP[f] : f;
    const q = rng.pick([1, 2, 3, 4]);
    const rad = rng.chance(0.6);
    if (rng.chance(0.3)) {
      // a special value: exact answer
      const ref = rng.pick([30, 45, 60]);
      const t = fromRef(ref, q);
      const val = exact6(f, t)!;
      return {
        prompt: `Given $\\${f}\\theta = ${exLatex(val)}$ and ${rad ? `$${QUAD_INTERVAL[q]}$` : `$${dg((q - 1) * 90)} < \\theta < ${dg(q * 90)}$`}, determine the exact value of $\\theta$${rad ? ` in radians. ${PI_NOTE}` : ' in degrees.'}`,
        parts: [numPart(rad ? rv(t) : t, { label: '$\\theta =$', ...(rad ? {} : { suffix: '°' }) })],
        hints: ['Find the reference angle from the positive value of the ratio: it is a special angle.', `Then place the reference angle in quadrant ${ROMAN[q]}.`],
        solution: [
          ...(f !== g ? [`$\\${f}\\theta = ${exLatex(val)}$ means $\\${g}\\theta = ${exLatex(exact6(g, t)!)}$.`] : []),
          `$\\${g}\\theta_R = ${exLatex(exact6(g, ref)!)}$ gives the reference angle $\\theta_R = ${ang(ref, rad)}$.`,
          q === 1 ? `In quadrant I, $\\theta = \\theta_R = ${ang(t, rad)}$.` : `In quadrant ${ROMAN[q]}, $\\theta = ${q === 2 ? (rad ? '\\pi' : '180^\\circ') + ' - ' : q === 3 ? (rad ? '\\pi' : '180^\\circ') + ' + ' : (rad ? '2\\pi' : '360^\\circ') + ' - '}${ang(ref, rad, true)} = ${ang(t, rad)}$`,
        ],
        answerDisplay: `$\\theta = ${ang(t, rad)}$`,
        calculator: false,
      };
    }
    const sign = positiveIn(f, q) ? 1 : -1;
    const make = () => {
      let v: number;
      if (f === 'sin' || f === 'cos') v = rng.int(8, 95) / 100;
      else if (f === 'csc' || f === 'sec') v = rng.int(11, 45) / 10;
      else v = rng.int(2, 40) / 10;
      return v;
    };
    const valid = (v: number) => {
      const base = f === 'csc' || f === 'sec' || f === 'cot' ? 1 / v : v;
      const refR = g === 'sin' ? Math.asin(base) : g === 'cos' ? Math.acos(base) : Math.atan(base);
      const th = fromRef((refR * 180) / PI, q);
      return safeRound(rad ? rv(th) : th, rad ? 2 : 1) && Math.abs(refR - PI / 4) > 0.01 && Math.abs(refR - PI / 6) > 0.01 && Math.abs(refR - PI / 3) > 0.01;
    };
    const vAbs = retry(make, valid, 200);
    const v = sign * vAbs;
    const base = f === g ? vAbs : 1 / vAbs;
    const refR = g === 'sin' ? Math.asin(base) : g === 'cos' ? Math.acos(base) : Math.atan(base);
    const refDeg = (refR * 180) / PI;
    const th = fromRef(refDeg, q);
    const ans = rad ? rv(th) : th;
    const refShow = rad ? fmt(refR, 4) : `${fmt(refDeg, 2)}^\\circ`;
    const placed = q === 1 ? `\\theta = \\theta_R \\approx ${refShow}` : rad ? `\\theta = ${q === 2 ? '\\pi - ' : q === 3 ? '\\pi + ' : '2\\pi - '}${fmt(refR, 4)} \\approx ${fmt(ans, 4)}` : `\\theta = ${q === 2 ? '180^\\circ - ' : q === 3 ? '180^\\circ + ' : '360^\\circ - '}${fmt(refDeg, 2)}^\\circ \\approx ${fmt(ans, 2)}^\\circ`;
    return {
      prompt: `Given $\\${f}\\theta = ${fmt(v)}$ and ${rad ? `$${QUAD_INTERVAL[q]}$` : `$${dg((q - 1) * 90)} < \\theta < ${dg(q * 90)}$`}, determine $\\theta$ ${rad ? 'in radians, to the nearest hundredth' : 'in degrees, to the nearest tenth of a degree'}.`,
      parts: [numPart(ans, { label: '$\\theta \\approx$', decimals: rad ? 2 : 1, ...(rad ? { suffix: 'rad' } : { suffix: '°' }) })],
      hints: [
        f !== g ? `Rewrite with the reciprocal: $\\${g}\\theta = \\dfrac{1}{${fmt(v)}}$.` : 'Find the reference angle from the positive value of the ratio.',
        `Use the inverse ${g === 'sin' ? 'sine' : g === 'cos' ? 'cosine' : 'tangent'} key on the positive value to get $\\theta_R$, then place it in quadrant ${ROMAN[q]}.`,
      ],
      solution: [
        ...(f !== g ? [`$\\${g}\\theta = \\dfrac{1}{\\${f}\\theta} = \\dfrac{1}{${fmt(v)}} ${Number.isInteger(base * 1e5) ? '=' : '\\approx'} ${fmt(sign * base, 5)}$`] : []),
        `Reference angle: $\\theta_R = \\${g}^{-1}(${fmt(base, 5)}) \\approx ${refShow}$${rad ? ' (radian mode)' : ''}`,
        `The terminal arm is in quadrant ${ROMAN[q]}: $${placed}$`,
        `$\\theta \\approx ${rad ? fmtFixed(ans, 2) : `${fmtFixed(ans, 1)}^\\circ`}$`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 4.4 — Introduction to trigonometric equations
// ---------------------------------------------------------------------------

type Fn3 = 'sin' | 'cos' | 'tan';

/** A linear equation equivalent to g(θ) = v for a special value v, with steps that isolate g(θ). */
interface LinEq {
  tex: string;
  steps: string[];
}
function linearForm(rng: Rng, g: Fn3, v: Ex): LinEq {
  const val = exValue(v);
  const vt = exLatex(v);
  const gt = `\\${g}\\theta`;
  const s = val < 0 ? -1 : 1;
  const isHalf = (r: number, n: number, dd: number) => v.size === 1 && v.has(r) && Math.abs(v.get(r)!.n) === n && v.get(r)!.d === dd;
  const opts: LinEq[] = [{ tex: `${gt} = ${vt}`, steps: [] }];
  const pm = s < 0 ? '+' : '-';
  if (val === 0) {
    const k = rng.int(2, 5);
    opts.push({ tex: `${k}${gt} = 0`, steps: [`Divide by $${k}$: $${gt} = 0$`] });
  } else if (isHalf(1, 1, 2)) {
    opts.push({ tex: `2${gt} ${pm} 1 = 0`, steps: [`$2${gt} = ${s < 0 ? '-' : ''}1$`, `$${gt} = ${vt}$`] });
    if (g !== 'tan') opts.push({ tex: `\\${g === 'sin' ? 'csc' : 'sec'}\\theta = ${s < 0 ? '-' : ''}2`, steps: [`$\\${g === 'sin' ? 'csc' : 'sec'}\\theta = \\dfrac{1}{${gt}}$, so $${gt} = ${vt}$`] });
  } else if (isHalf(2, 1, 2)) {
    opts.push({ tex: `2${gt} ${pm} \\sqrt{2} = 0`, steps: [`$2${gt} = ${s < 0 ? '-' : ''}\\sqrt{2}$`, `$${gt} = ${vt}$`] });
    opts.push({ tex: `\\sqrt{2}${gt} ${pm} 1 = 0`, steps: [`$\\sqrt{2}${gt} = ${s < 0 ? '-' : ''}1$`, `$${gt} = ${s < 0 ? '-' : ''}\\dfrac{1}{\\sqrt{2}} = ${vt}$`] });
  } else if (isHalf(3, 1, 2)) {
    opts.push({ tex: `2${gt} ${pm} \\sqrt{3} = 0`, steps: [`$2${gt} = ${s < 0 ? '-' : ''}\\sqrt{3}$`, `$${gt} = ${vt}$`] });
  } else if (isHalf(1, 1, 1)) {
    const k = rng.int(2, 4);
    opts.push({ tex: `${k}${gt} ${pm} ${k} = 0`, steps: [`$${k}${gt} = ${s < 0 ? '-' : ''}${k}$`, `$${gt} = ${vt}$`] });
    if (g === 'tan') opts.push({ tex: `\\cot\\theta = ${vt}`, steps: [`$\\cot\\theta = \\dfrac{1}{\\tan\\theta}$, so $${gt} = ${vt}$`] });
  } else if (isHalf(3, 1, 1)) {
    opts.push({ tex: `${gt} ${pm} \\sqrt{3} = 0`, steps: [`$${gt} = ${vt}$`] });
    opts.push({ tex: `\\cot\\theta = ${s < 0 ? '-' : ''}\\dfrac{\\sqrt{3}}{3}`, steps: [`$\\cot\\theta = \\dfrac{1}{\\tan\\theta}$, so $${gt} = ${s < 0 ? '-' : ''}\\dfrac{3}{\\sqrt{3}} = ${vt}$`] });
  } else if (isHalf(3, 1, 3)) {
    opts.push({ tex: `\\sqrt{3}${gt} ${pm} 1 = 0`, steps: [`$\\sqrt{3}${gt} = ${s < 0 ? '-' : ''}1$`, `$${gt} = ${s < 0 ? '-' : ''}\\dfrac{1}{\\sqrt{3}} = ${vt}$`] });
    opts.push({ tex: `3${gt} ${pm} \\sqrt{3} = 0`, steps: [`$3${gt} = ${s < 0 ? '-' : ''}\\sqrt{3}$`, `$${gt} = ${vt}$`] });
  }
  return opts.length > 1 && rng.chance(0.8) ? rng.pick(opts.slice(1)) : opts[0];
}

/** Special values of each primary ratio. */
const SPECIAL_VALUES: Record<Fn3, Ex[]> = {
  sin: [ex(1, 2), ex(-1, 2), ex(1, 2, 2), ex(-1, 2, 2), ex(1, 2, 3), ex(-1, 2, 3), ex(1), ex(-1), ex(0)],
  cos: [ex(1, 2), ex(-1, 2), ex(1, 2, 2), ex(-1, 2, 2), ex(1, 2, 3), ex(-1, 2, 3), ex(1), ex(-1), ex(0)],
  tan: [ex(1), ex(-1), ex(1, 1, 3), ex(-1, 1, 3), ex(1, 3, 3), ex(-1, 3, 3), ex(0)],
};
const FN3_VAL: Record<Fn3, (deg: number) => number> = { sin: sinD, cos: cosD, tan: (x) => sinD(x) / cosD(x) };

/** Solutions in degrees of g(θ) = v in [lo, hi] (special values only). */
function specialSolutions(g: Fn3, v: number, lo: number, hi: number, loIn = true, hiIn = false): number[] {
  const out: number[] = [];
  for (let t = Math.ceil(lo / 15) * 15; t <= hi; t += 15) {
    if ((t === lo && !loIn) || (t === hi && !hiIn)) continue;
    if (g === 'tan' && Math.abs(cosD(t)) < 1e-9) continue;
    if (Math.abs(FN3_VAL[g](t) - v) < 1e-9) out.push(t);
  }
  return out;
}

/** The steps from g(θ) = v to its solutions in [0°, 360°) (special values). */
function solveSteps(g: Fn3, v: Ex, rad: boolean): string[] {
  const val = exValue(v);
  const sols = specialSolutions(g, val, 0, 360);
  const A = (x: number) => ang(x, rad);
  const gt = `\\${g}\\theta`;
  const dom = rad ? '0 \\le \\theta < 2\\pi' : '0^\\circ \\le \\theta < 360^\\circ';
  if (val === 0 || (Math.abs(val) === 1 && g !== 'tan')) {
    const where = g === 'sin' ? `$y = ${val}$` : g === 'cos' ? `$x = ${val}$` : '$y = 0$';
    return [`$${gt} = ${exLatex(v)}$ when the point $P(\\theta)$ on the unit circle has ${where}: the terminal arm lies on an axis.`, `In $${dom}$: ${sols.map((s) => `$\\theta = ${A(s)}$`).join(' or ')}`];
  }
  const absV = exScale(v, frac(val < 0 ? -1 : 1));
  const ref = specialSolutions(g, Math.abs(val), 0, 90, true, true)[0];
  const quads = [1, 2, 3, 4].filter((q) => (g === 'sin' ? (val > 0 ? q <= 2 : q >= 3) : g === 'cos' ? (val > 0 ? q === 1 || q === 4 : q === 2 || q === 3) : val > 0 ? q === 1 || q === 3 : q === 2 || q === 4));
  const half = rad ? '\\pi' : '180^\\circ';
  const full = rad ? '2\\pi' : '360^\\circ';
  const place = (q: number) => (q === 1 ? A(ref) : q === 2 ? `${half} - ${ang(ref, rad, true)} = ${A(180 - ref)}` : q === 3 ? `${half} + ${ang(ref, rad, true)} = ${A(180 + ref)}` : `${full} - ${ang(ref, rad, true)} = ${A(360 - ref)}`);
  return [
    `Reference angle: $\\${g}\\theta_R = ${exLatex(absV)}$, so $\\theta_R = ${A(ref)}$.`,
    `$\\${g}\\theta$ is ${val > 0 ? 'positive' : 'negative'} in quadrants ${ROMAN[quads[0]]} and ${ROMAN[quads[1]]}.`,
    `$\\theta = ${place(quads[0])}$ or $\\theta = ${place(quads[1])}$`,
  ];
}

const trigEquationBasic = skill({
  id: 'm301-trig-equation-basic',
  name: 'First-degree trigonometric equations',
  description: 'Solve first-degree trigonometric equations over a restricted domain in degrees or radians, exactly or with a calculator, and write the general solution.',
  outcomes: ['T5'],
  lessonId: 'm301-4-4',
  gen(rng, d): GenOutput {
    const g = rng.pick(['sin', 'cos', 'tan', 'sin', 'cos'] as Fn3[]);
    if (d === 1) {
      const v = rng.pick(SPECIAL_VALUES[g].filter((x) => x.size > 0 && (g === 'tan' || Math.abs(exValue(x)) !== 1)));
      const eq = linearForm(rng, g, v);
      const sols = specialSolutions(g, exValue(v), 0, 360);
      return {
        prompt: `Solve $${eq.tex}$ for $0^\\circ \\le \\theta < 360^\\circ$. Give exact answers in degrees, separated by commas.`,
        parts: [part({ kind: 'numbers', values: sols }, { label: '$\\theta =$', suffix: '°', placeholder: 'For example: 30, 150' })],
        hints: [eq.steps.length ? `First isolate $\\${g}\\theta$.` : 'Find the reference angle from the positive value of the ratio.', 'Use the CAST rule to find the two quadrants where the ratio has this sign, then place the reference angle in each.'],
        solution: [...eq.steps.map((s) => s), ...solveSteps(g, v, false), `$\\theta = ${sols.map((s) => dg(s)).join('$ or $\\theta = ')}$`],
        answerDisplay: sols.map((s) => `$${dg(s)}$`).join(', '),
      };
    }
    if (d === 2) {
      if (rng.chance(0.7)) {
        const v = rng.pick(SPECIAL_VALUES[g]);
        const eq = linearForm(rng, g, v);
        const sols = specialSolutions(g, exValue(v), 0, 360);
        return {
          prompt: `Solve $${eq.tex}$ for $0 \\le \\theta < 2\\pi$. Give exact answers in radians, separated by commas. ${PI_NOTE}`,
          parts: [part({ kind: 'numbers', values: sols.map(rv) }, { label: '$\\theta =$', placeholder: 'For example: pi/6, 5pi/6' })],
          hints: [eq.steps.length ? `Isolate $\\${g}\\theta$ first.` : 'Find the reference angle from the positive value.', 'Use the unit circle: the reference angle tells you the size, and the sign of the ratio tells you the quadrants.'],
          solution: [...eq.steps, ...solveSteps(g, v, true), `$\\theta = ${sols.map((s) => rt(s)).join('$ or $\\theta = ')}$`],
          answerDisplay: sols.map((s) => `$${rt(s)}$`).join(', '),
        };
      }
      // calculator: a·g(θ) + b = 0
      const a = rng.int(2, 9);
      const b = retry(
        () => rng.nonZero(-a + 1, a - 1) * (g === 'tan' ? rng.int(1, 3) : 1),
        (x) => {
          const v = -x / a;
          if (g !== 'tan' && Math.abs(v) >= 1) return false;
          if ([0.5, Math.SQRT1_2, Math.sqrt(3) / 2, 1, Math.sqrt(3), 1 / Math.sqrt(3)].some((s) => Math.abs(Math.abs(v) - s) < 0.02)) return false;
          const base = g === 'sin' ? Math.asin(Math.abs(v)) : g === 'cos' ? Math.acos(Math.abs(v)) : Math.atan(Math.abs(v));
          return [base, PI - base, PI + base, 2 * PI - base].every((s) => safeRound(s, 2));
        },
        200,
      );
      return calcEquation(g, a, b);
    }
    // d === 3
    const mode = rng.pick(['general', 'general', 'wide', 'wide', 'none'] as const);
    if (mode === 'none') {
      const gg: Fn3 = rng.pick(['sin', 'cos']);
      const a = rng.int(2, 5);
      const b = (a + rng.int(1, 3)) * rng.sign();
      const v = -b / a;
      const gt = `\\${gg}\\theta`;
      return {
        prompt: `Solve $${a}${gt} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = 0$ for $0 \\le \\theta < 2\\pi$. Separate exact answers with commas, or type *no solution*.`,
        parts: [part({ kind: 'numbers', values: [] }, { label: '$\\theta =$', placeholder: 'For example: pi/3, 2pi/3' })],
        hints: [`Isolate $${gt}$.`, `What are the greatest and least possible values of $${gt}$?`],
        solution: [`$${a}${gt} = ${-b}$, so $${gt} = ${fracLatex(frac(-b, a))}$.`, `But $-1 \\le ${gt} \\le 1$ for every angle, and $${fracLatex(frac(-b, a))}$ is ${v < 0 ? 'less than $-1$' : 'greater than $1$'}.`, 'The equation has no solution.'],
        answerDisplay: 'no solution',
      };
    }
    const v = rng.pick(SPECIAL_VALUES[g].filter((x) => x.size > 0 || g !== 'tan'));
    const val = exValue(v);
    const eq = linearForm(rng, g, v);
    if (mode === 'wide') {
      const rad = rng.chance(0.65);
      const [lo, hi, loIn, hiIn] = rng.pick([
        [-360, 360, true, true],
        [0, 720, true, false],
        [-180, 180, true, true],
        [-360, 0, true, false],
        [-720, 0, false, true],
        [360, 720, true, false],
      ] as Array<[number, number, boolean, boolean]>);
      const sols = specialSolutions(g, val, lo, hi, loIn, hiIn);
      const A = (x: number) => ang(x, rad);
      const full = rad ? '2\\pi' : '360^\\circ';
      return {
        prompt: `Solve $${eq.tex}$ for $${ineq(lo, hi, loIn, hiIn, rad)}$. Give exact answers${rad ? ' in radians' : ' in degrees'}, separated by commas.${rad ? ` ${PI_NOTE}` : ''}`,
        parts: [part({ kind: 'numbers', values: sols.map((s) => (rad ? rv(s) : s)) }, { label: '$\\theta =$', ...(rad ? {} : { suffix: '°' }), placeholder: rad ? 'For example: -pi/4, pi/4' : 'For example: -30, 210' })],
        hints: [`Solve for one rotation, $${rad ? '0 \\le \\theta < 2\\pi' : '0^\\circ \\le \\theta < 360^\\circ'}$, first.`, `Then add or subtract $${full}$ to each solution to find every coterminal solution in the domain.`],
        solution: [
          ...eq.steps,
          ...solveSteps(g, v, rad),
          `Add and subtract $${full}$ to find the coterminal solutions, keeping those with $${ineq(lo, hi, loIn, hiIn, rad)}$.`,
          `$\\theta = ${sols.map(A).join(',\\ ')}$`,
        ],
        answerDisplay: sols.map((s) => `$${A(s)}$`).join(', '),
      };
    }
    // general solution (multiple choice)
    const rad = rng.chance(0.75);
    const base = specialSolutions(g, val, 0, 360);
    const P = (p: number) => (rad ? (p === 360 ? '2\\pi' : '\\pi') : dg(p));
    const fam = (b: number[], p: number) => b.map((t) => `\\theta = ${t === 0 ? '' : `${ang(t, rad, true)} + `}${P(p)} n`).join(' \\text{ or } ') + ',\\ n \\in \\mathbb{I}';
    const setOf = (b: number[], p: number) => {
      const s = new Set<number>();
      for (const t of b) for (let k = -4; k <= 4; k++) s.add(norm360(t + p * k));
      return [...s].sort((x, y) => x - y).join(',');
    };
    const truth = setOf(base, 360);
    let correct: string;
    if (base.length === 2 && base[1] - base[0] === 180) correct = fam([base[0]], 180);
    else correct = fam(base, 360);
    const ref = isQuadrantal(base[0]) ? base[0] : refAngle(base[0]);
    const cands: Array<[number[], number]> = [
      [base, 180],
      [[base[0]], 360],
      [base.map((t) => norm360(-t)), 360],
      [base.map((t) => norm360(180 - t)), 360],
      [base.map((t) => norm360(t + 90)), 360],
      [[base[0]], 180],
    ];
    if (!isQuadrantal(base[0])) cands.push([base.map((t) => fromRef(ref === 45 ? 30 : 90 - ref, quadrant(t))), 360]);
    if (base.length === 2 && base[1] - base[0] === 180) cands.push([base, 360]);
    const seen = new Set<string>([truth]);
    const distractors: string[] = [];
    for (const [b, p] of rng.shuffle(cands)) {
      const key = setOf(b, p);
      if (seen.has(key)) continue;
      seen.add(key);
      distractors.push(`$${fam([...new Set(b)].sort((x, y) => x - y), p)}$`);
    }
    const full = rad ? '2\\pi' : '360^\\circ';
    return {
      prompt: `Which is the general solution of $${eq.tex}$${rad ? ', in radians' : ', in degrees'}?`,
      parts: [part(mc(rng, `$${correct}$`, distractors))],
      hints: [`Solve for $${rad ? '0 \\le \\theta < 2\\pi' : '0^\\circ \\le \\theta < 360^\\circ'}$ first.`, `Every solution repeats each full turn, so add $${full} n$ to each one. If two solutions are exactly half a turn apart, both are covered by adding $${rad ? '\\pi' : '180^\\circ'}n$ to the first.`],
      solution: [
        ...eq.steps,
        ...solveSteps(g, v, rad),
        base.length === 2 && base[1] - base[0] === 180
          ? `The two solutions differ by $${rad ? '\\pi' : '180^\\circ'}$, so one family covers both: $${correct}$`
          : `Add $${full} n$ to each solution: $${correct}$`,
      ],
    };
  },
});

/** a·g(θ) + b = 0 solved with a calculator, in radians. */
function calcEquation(g: Fn3, a: number, b: number): GenOutput {
  const v = -b / a;
  const base = g === 'sin' ? Math.asin(Math.abs(v)) : g === 'cos' ? Math.acos(Math.abs(v)) : Math.atan(Math.abs(v));
  const quads = [1, 2, 3, 4].filter((q) => (g === 'sin' ? (v > 0 ? q <= 2 : q >= 3) : g === 'cos' ? (v > 0 ? q === 1 || q === 4 : q === 2 || q === 3) : v > 0 ? q === 1 || q === 3 : q === 2 || q === 4));
  const place = (q: number) => (q === 1 ? base : q === 2 ? PI - base : q === 3 ? PI + base : 2 * PI - base);
  const sols = quads.map(place);
  const gt = `\\${g}\\theta`;
  const vTex = Number.isInteger(v * 100) ? fmt(v) : `${v < 0 ? '-' : ''}\\dfrac{${Math.abs(b)}}{${a}}`;
  const word = (q: number) => (q === 1 ? `\\theta = \\theta_R \\approx ${fmt(base, 4)}` : q === 2 ? `\\theta = \\pi - ${fmt(base, 4)} \\approx ${fmt(PI - base, 4)}` : q === 3 ? `\\theta = \\pi + ${fmt(base, 4)} \\approx ${fmt(PI + base, 4)}` : `\\theta = 2\\pi - ${fmt(base, 4)} \\approx ${fmt(2 * PI - base, 4)}`);
  return {
    prompt: `Solve $${a}${gt} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = 0$ for $0 \\le \\theta < 2\\pi$. Give each solution in radians, to the nearest hundredth, separated by commas.`,
    parts: [part({ kind: 'numbers', values: sols, decimals: 2 }, { label: '$\\theta \\approx$', placeholder: 'For example: 0.52, 2.62' })],
    hints: [`Isolate $${gt}$, then find the reference angle with the inverse key (radian mode) using the positive value.`, `$\\${g}\\theta$ is ${v > 0 ? 'positive' : 'negative'} in quadrants ${ROMAN[quads[0]]} and ${ROMAN[quads[1]]}.`],
    solution: [
      `$${a}${gt} = ${-b}$, so $${gt} = ${vTex}$${Number.isInteger(v * 100) ? '' : ` \\approx ${fmt(v, 4)}`}.`,
      `Reference angle: $\\theta_R = \\${g}^{-1}\\left(${fmt(Math.abs(v), 4)}\\right) \\approx ${fmt(base, 4)}$`,
      `$\\${g}\\theta$ is ${v > 0 ? 'positive' : 'negative'} in quadrants ${ROMAN[quads[0]]} and ${ROMAN[quads[1]]}: $${word(quads[0])}$ and $${word(quads[1])}$.`,
      `$\\theta \\approx ${fmtFixed(sols[0], 2)}$ or $\\theta \\approx ${fmtFixed(sols[1], 2)}$`,
    ],
    calculator: true,
  };
}

export const UNITCIRCLE_SKILLS: SkillDef[] = [radianConvert, coterminal, arcLength, unitCirclePoint, exactTrig, trigRatioValue, trigEquationBasic];

/** For lesson figures and tests. */
export const _internal = { unitPoint, pointTex, exLatex, exact6, rt, piFrac, piTex };
