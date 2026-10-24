/** Math 20-1 Unit 2 — Trigonometry (T1, T2, T3). */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { acosD, asinD, atanD, cosD, fmt, fmtFixed, frac, fracAdd, fracLatex, fracMul, gcd, isPerfectSquare, lcmAll, radicalSplit, sinD, tanD, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, RightTriangleFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Names, units and formatting
// ---------------------------------------------------------------------------

const PEOPLE = [
  'Amara', 'Jordan', 'Priya', 'Liam', 'Mei', 'Tyler', 'Kiran', 'Noah', 'Aisha', 'Dakota', 'Mateo', 'Sofia', 'Raj', 'Hamid', 'Jasmine',
  'Owen', 'Nadia', 'Wyatt', 'Simran', 'Kai', 'Fatima', 'Lucas', 'Thanh', 'Chloé', 'Darius', 'Leilani', 'Marie-Ève', 'Arjun', 'Rosalie', 'Tanvir',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Oakdale'];
const LAKES = ['Stonebridge Lake', 'Lake Ashford', 'Clearwater Lake', 'Pinewood Lake', 'Brookfield Lake', 'Lake Westbury', 'Hillcrest Lake'];

const TRI_NAMES: Array<[string, string, string]> = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['D', 'E', 'F'],
  ['X', 'Y', 'Z'],
  ['K', 'L', 'M'],
  ['S', 'T', 'U'],
  ['G', 'H', 'J'],
];

const UNIT_WORD: Record<string, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre' };
const tenthOf = (u: string) => `to the nearest tenth of a ${UNIT_WORD[u]}`;
const TENTH_DEG = 'to the nearest tenth of a degree';
const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
const len = (v: number, u: string) => `${fmt(v, 2)}\\text{ ${u}}`;
const lo = (s: string) => s.toLowerCase();
const ROMAN = ['', 'I', 'II', 'III', 'IV'];
/** Figure label text: Unicode minus for negatives. */
const fl = (x: number) => fmt(x).replace('-', '−');

/** True when v is not close to a rounding boundary at `dp` decimals (so a student's rounding is unambiguous). */
function safeRound(v: number, dp = 1): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.1;
}

// ---------------------------------------------------------------------------
// Angles in standard position
// ---------------------------------------------------------------------------

type Fn = 'sin' | 'cos' | 'tan';
const FNS: Fn[] = ['sin', 'cos', 'tan'];
const FN_D: Record<Fn, (x: number) => number> = { sin: sinD, cos: cosD, tan: tanD };
const FN_INV: Record<Fn, (x: number) => number> = { sin: asinD, cos: acosD, tan: atanD };
const FN_NAME: Record<Fn, string> = { sin: 'sine', cos: 'cosine', tan: 'tangent' };
const FN_DEF: Record<Fn, string> = { sin: '\\dfrac{y}{r}', cos: '\\dfrac{x}{r}', tan: '\\dfrac{y}{x}' };

/** Quadrant (1–4) of a non-quadrantal angle in [0, 360). */
function quadrant(t: number): 1 | 2 | 3 | 4 {
  return t < 90 ? 1 : t < 180 ? 2 : t < 270 ? 3 : 4;
}
const isQuadrantal = (t: number) => t % 90 === 0;
function refAngle(t: number): number {
  const q = quadrant(t);
  return q === 1 ? t : q === 2 ? 180 - t : q === 3 ? t - 180 : 360 - t;
}
function fromRef(ref: number, q: number): number {
  return q === 1 ? ref : q === 2 ? 180 - ref : q === 3 ? 180 + ref : 360 - ref;
}
/** The reference-angle formula for an angle in quadrant q, as LaTeX. */
function refWork(t: number): string {
  const q = quadrant(t);
  const r = refAngle(t);
  return q === 1 ? `\\theta_R = \\theta = ${deg(t)}` : q === 2 ? `\\theta_R = 180^\\circ - ${deg(t)} = ${deg(r)}` : q === 3 ? `\\theta_R = ${deg(t)} - 180^\\circ = ${deg(r)}` : `\\theta_R = 360^\\circ - ${deg(t)} = ${deg(r)}`;
}
/** θ in quadrant q from a reference angle, as LaTeX. */
function fromRefWork(ref: number | string, q: number): string {
  const r = typeof ref === 'number' ? deg(ref) : ref;
  return q === 1 ? r : q === 2 ? `180^\\circ - ${r}` : q === 3 ? `180^\\circ + ${r}` : `360^\\circ - ${r}`;
}
const positiveIn = (f: Fn, q: number) => (f === 'sin' ? q <= 2 : f === 'cos' ? q === 1 || q === 4 : q === 1 || q === 3);
const QUAD_RANGE = ['', '0^\\circ < \\theta < 90^\\circ', '90^\\circ < \\theta < 180^\\circ', '180^\\circ < \\theta < 270^\\circ', '270^\\circ < \\theta < 360^\\circ'];
const CAST_WORD = ['', 'all three ratios are positive', 'only sine is positive', 'only tangent is positive', 'only cosine is positive'];

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

/** Exact sin, cos and tan of the special reference angles (tan 90° is undefined). */
const REF_EXACT: Record<Fn, Record<number, Ex | null>> = {
  sin: { 0: ex(0), 30: ex(1, 2), 45: ex(1, 2, 2), 60: ex(1, 2, 3), 90: ex(1) },
  cos: { 0: ex(1), 30: ex(1, 2, 3), 45: ex(1, 2, 2), 60: ex(1, 2), 90: ex(0) },
  tan: { 0: ex(0), 30: ex(1, 3, 3), 45: ex(1), 60: ex(1, 1, 3), 90: null },
};

/** Exact value of f(θ) for a special angle θ in [0, 360]; null when undefined. */
function exactTrig(f: Fn, t: number): Ex | null {
  const ref = isQuadrantal(t) ? (t % 180 === 0 ? 0 : 90) : refAngle(t);
  const base = REF_EXACT[f][ref];
  if (base === null) return null;
  const s = Math.sign(Math.round(FN_D[f](t) * 1e9));
  return s < 0 ? exScale(base, frac(-1)) : base;
}

const SPECIAL_NONQ = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];
const QUADRANTAL = [0, 90, 180, 270];

// ---------------------------------------------------------------------------
// Figure layout (adapted from math10-3/gen/angles.ts): labels are placed clear of every drawn line
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';
const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
const dirOf = (from: P, to: P) => norm360((Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI);
const r3 = (x: number) => Math.round(x * 1000) / 1000;

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

/** x- and y-axes with arrowheads and axis letters. */
function axes(s: Sketch, L: number) {
  s.seg([-L, 0], [L, 0], { color: 'muted', arrowStart: true, arrowEnd: true });
  s.seg([0, -L], [0, L], { color: 'muted', arrowStart: true, arrowEnd: true });
  s.textAt([L - 0.15, -0.5], 'x').textAt([0.45, L - 0.2], 'y');
}

/**
 * An angle in standard position: axes, the terminal arm, and an arc (with an arrowhead) from the
 * initial arm counterclockwise to the terminal arm. Optional point P on the arm and reference angle.
 */
export function standardFigure(o: { theta: number; label?: string; point?: string; refLabel?: string; arc?: boolean; arms?: boolean; caption?: string }): PlaneFigure {
  const s = new Sketch();
  const L = 4.4;
  axes(s, L);
  const t = o.theta;
  const O: P = [0, 0];
  const tip = at(O, t, 3.8);
  s.seg(O, tip, { color: 'brand', arrowEnd: true });
  if (o.arc !== false && norm360(t) !== 0) s.arc(O, 0.75, 0, t, 'accent', true);
  const P0 = at(O, t, 2.9);
  if (o.refLabel !== undefined && !isQuadrantal(t)) {
    const foot: P = [P0[0], 0];
    s.seg(P0, foot, { color: 'muted', dashed: true });
    const xDir = P0[0] >= 0 ? 0 : 180;
    const [a0, a1] = norm360(t - xDir) <= 90 ? [xDir, t] : [t, xDir];
    s.arc(O, 1.35, a0, a1, 'muted');
    if (o.refLabel) s.angleLabel(O, a0, a1, o.refLabel, 52);
  }
  if (o.label && o.arc !== false) s.angleLabel(O, 0, t, o.label, 26);
  if (o.arms) {
    s.sideLabel([2.6, 0], -90, 'initial arm');
    s.sideLabel(at(O, t, 2.4), t + 90, 'terminal arm');
  }
  if (o.point) {
    s.dot(P0);
    s.endLabel(P0, t + 90, o.point, 12);
  }
  return s.build({ margin: 0.6, caption: o.caption });
}

/** The CAST rule: axes with the positive ratios written in each quadrant. */
export function castFigure(): PlaneFigure {
  const s = new Sketch();
  axes(s, 4.4);
  s.textAt([2.2, 2.2], 'A: all > 0').textAt([-2.2, 2.2], 'S: sin > 0').textAt([-2.2, -2.2], 'T: tan > 0').textAt([2.2, -2.2], 'C: cos > 0');
  s.textAt([3.3, 3.6], 'I').textAt([-3.3, 3.6], 'II').textAt([-3.3, -3.6], 'III').textAt([3.3, -3.6], 'IV');
  return s.build({ margin: 0.6 });
}

// ---------------------------------------------------------------------------
// Oblique triangles
// ---------------------------------------------------------------------------

/** A triangle: vertex names, the angle at each vertex and the side opposite each vertex. */
interface Tri {
  n: [string, string, string];
  ang: [number, number, number];
  s: [number, number, number];
}

/** Vertex coordinates with the side opposite vertex `base` horizontal at the bottom, scaled so the longest side is 6. */
function triPoints(t: Tri, base: 0 | 1 | 2, mirror: boolean): [P, P, P] {
  const raw: P[] = [
    [0, 0],
    [t.s[2], 0],
    [t.s[1] * cosD(t.ang[0]), t.s[1] * sinD(t.ang[0])],
  ];
  const i = (base + 1) % 3;
  const j = (base + 2) % 3;
  const phi = Math.atan2(raw[j][1] - raw[i][1], raw[j][0] - raw[i][0]);
  let pts = raw.map(([x, y]) => {
    const X = x - raw[i][0];
    const Y = y - raw[i][1];
    return [X * Math.cos(-phi) - Y * Math.sin(-phi), X * Math.sin(-phi) + Y * Math.cos(-phi)] as P;
  });
  if (pts[base][1] < 0) pts = pts.map(([x, y]) => [x, -y] as P);
  if (mirror) pts = pts.map(([x, y]) => [-x, y] as P);
  const k = 6 / Math.max(...t.s);
  return pts.map(([x, y]) => [x * k, y * k]) as [P, P, P];
}

interface TriLabels {
  /** Label for the side opposite each vertex (null for none). */
  sides?: Array<string | null>;
  /** Label for the angle at each vertex (null for none); labelled angles get an arc. */
  angles?: Array<string | null>;
  /** Hide vertex names. */
  noNames?: boolean;
}

export function triangleFigure(t: Tri, lab: TriLabels, opts: { base?: 0 | 1 | 2; mirror?: boolean; caption?: string; altitude?: { from: 0 | 1 | 2; label: string; foot?: string } } = {}): PlaneFigure {
  const pts = triPoints(t, opts.base ?? 2, opts.mirror ?? false);
  const s = new Sketch();
  for (let k = 0; k < 3; k++) s.seg(pts[(k + 1) % 3], pts[(k + 2) % 3]);
  if (opts.altitude) {
    const v = pts[opts.altitude.from];
    const a = pts[(opts.altitude.from + 1) % 3];
    const b = pts[(opts.altitude.from + 2) % 3];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const u = ((v[0] - a[0]) * dx + (v[1] - a[1]) * dy) / (dx * dx + dy * dy);
    const foot: P = [a[0] + u * dx, a[1] + u * dy];
    s.seg(v, foot, { color: 'muted', dashed: true });
    const d = dirOf(foot, v);
    const p1 = at(foot, d, 0.3);
    s.polyline([at(foot, d + 90 * Math.sign(u - 0.5 || 1), 0.3), at(p1, d + 90 * Math.sign(u - 0.5 || 1), 0.3), p1], 'muted');
    s.sideLabel([(v[0] + foot[0]) / 2, (v[1] + foot[1]) / 2], d + 90 * Math.sign(u - 0.5 || 1), opts.altitude.label);
    if (opts.altitude.foot) s.endLabel(foot, d + 180, opts.altitude.foot, 13);
  }
  const wedge = (k: number): [number, number] => {
    const d1 = dirOf(pts[k], pts[(k + 1) % 3]);
    const d2 = dirOf(pts[k], pts[(k + 2) % 3]);
    return norm360(d2 - d1) <= 180 ? [d1, d2] : [d2, d1];
  };
  for (let k = 0; k < 3; k++) {
    if (!lab.angles?.[k]) continue;
    const [a0, a1] = wedge(k);
    const r = t.ang[k] < 35 ? 0.95 : t.ang[k] > 100 ? 0.5 : 0.65;
    s.arc(pts[k], r, a0, a1);
  }
  if (!lab.noNames) for (let k = 0; k < 3; k++) s.vertexLabel(pts[k], wedge(k), t.n[k]);
  for (let k = 0; k < 3; k++) {
    const text = lab.angles?.[k];
    if (!text) continue;
    const [a0, a1] = wedge(k);
    const r = t.ang[k] < 35 ? 0.95 : t.ang[k] > 100 ? 0.5 : 0.65;
    s.angleLabel(pts[k], a0, a1, text, r * 42 + 9);
  }
  for (let k = 0; k < 3; k++) {
    const text = lab.sides?.[k];
    if (!text) continue;
    const a = pts[(k + 1) % 3];
    const b = pts[(k + 2) % 3];
    const mid: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let nrm = dirOf(a, b) + 90;
    const out = at(mid, nrm, 1);
    if (Math.hypot(out[0] - pts[k][0], out[1] - pts[k][1]) < Math.hypot(mid[0] - pts[k][0], mid[1] - pts[k][1])) nrm += 180;
    s.sideLabel(mid, nrm, text);
  }
  return s.build({ margin: 0.7, caption: opts.caption });
}

/** Solve a triangle from two angles (at vertices i and j) and one side (opposite vertex k). */
function triAAS(n: [string, string, string], angs: [number, number, number], sideIdx: number, side: number): Tri {
  const kk = side / sinD(angs[sideIdx]);
  return { n, ang: angs, s: [kk * sinD(angs[0]), kk * sinD(angs[1]), kk * sinD(angs[2])] };
}
/** Solve a triangle from the angle at vertex 0 and the two sides that form it (opposite vertices 1 and 2). */
function triSAS(n: [string, string, string], A0: number, s1: number, s2: number): Tri {
  const s0 = Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * cosD(A0));
  const A1 = acosD((s0 * s0 + s2 * s2 - s1 * s1) / (2 * s0 * s2));
  return { n, ang: [A0, A1, 180 - A0 - A1], s: [s0, s1, s2] };
}
function triSSS(n: [string, string, string], s0: number, s1: number, s2: number): Tri {
  const A0 = acosD((s1 * s1 + s2 * s2 - s0 * s0) / (2 * s1 * s2));
  const A1 = acosD((s0 * s0 + s2 * s2 - s1 * s1) / (2 * s0 * s2));
  return { n, ang: [A0, A1, 180 - A0 - A1], s: [s0, s1, s2] };
}
/** Reorder a triangle's vertices: vertex i of the result is vertex perm[i] of t. */
function permute(t: Tri, perm: number[]): Tri {
  return { n: perm.map((i) => t.n[i]) as Tri['n'], ang: perm.map((i) => t.ang[i]) as Tri['ang'], s: perm.map((i) => t.s[i]) as Tri['s'] };
}

/** Three integer angles, each in [lo, hi], summing to 180, none equal to 90. */
function threeAngles(rng: Rng, lo = 25, hi = 115): [number, number, number] {
  return retry(
    () => {
      const a = rng.int(lo, hi);
      const b = rng.int(lo, hi);
      return [a, b, 180 - a - b] as [number, number, number];
    },
    (v) => v[2] >= lo && v[2] <= hi && !v.includes(90),
    200,
  );
}

const randomBase = (rng: Rng) => rng.pick([0, 1, 2, 2] as const);

/**
 * A two-leg trip S → T → E: the first leg is extended (dashed) past T so the turn angle can be marked,
 * and the direct line S–E is dashed. `left` turns counterclockwise.
 */
function turnFigure(o: { leg1: number; leg2: number; turn: number; left: boolean; leg1Label: string; leg2Label: string; seLabel?: string; atS?: string }): PlaneFigure {
  const k = 6 / (o.leg1 + o.leg2);
  const sg = o.left ? 1 : -1;
  const S: P = [0, 0];
  const T: P = [o.leg1 * k, 0];
  const E: P = at(T, sg * o.turn, o.leg2 * k);
  const s = new Sketch();
  s.seg(S, T, { arrowEnd: true }).seg(T, E, { arrowEnd: true });
  s.seg(T, [T[0] + 1.6, 0], { color: 'muted', dashed: true });
  s.seg(S, E, { color: 'accent', dashed: true });
  const [a0, a1] = o.left ? [0, o.turn] : [-o.turn, 0];
  s.arc(T, 0.8, a0, a1);
  s.angleLabel(T, a0, a1, `${o.turn}°`, 40);
  if (o.atS) {
    const dSE = dirOf(S, E);
    const [b0, b1] = o.left ? [0, dSE] : [dSE, 360];
    s.arc(S, 1.0, b0, b1);
    s.angleLabel(S, b0, b1, o.atS, 50);
  }
  s.vertexLabel(S, [0, dirOf(S, E)], 'S').vertexLabel(T, [0, 180, sg * o.turn], 'T').vertexLabel(E, [dirOf(E, T), dirOf(E, S)], 'E');
  s.sideLabel([T[0] / 2, 0], o.left ? -90 : 90, o.leg1Label);
  s.sideLabel([(T[0] + E[0]) / 2, (T[1] + E[1]) / 2], sg * o.turn + (o.left ? -90 : 90), o.leg2Label);
  if (o.seLabel) s.sideLabel([E[0] / 2, E[1] / 2], dirOf(S, E) + (o.left ? 90 : -90), o.seLabel);
  return s.build({ margin: 0.6 });
}

/**
 * The ambiguous case: angle A at the left, side b from A to C, and side a from C reaching the base
 * ray at B₁ (acute triangle) and B₂ (obtuse triangle).
 */
export function ambiguousFigure(o: { A: number; a: number; b: number; names: [string, string, string]; angleLabel: string; aLabel: string; bLabel: string; swing?: boolean; caption?: string }): PlaneFigure {
  const h = o.b * sinD(o.A);
  const foot = o.b * cosD(o.A);
  const dx = Math.sqrt(Math.max(0, o.a * o.a - h * h));
  const k = 6 / Math.max(foot + dx, o.b);
  const A: P = [0, 0];
  const C: P = [foot * k, h * k];
  const B1: P = [(foot + dx) * k, 0];
  const B2: P = [(foot - dx) * k, 0];
  const s = new Sketch();
  s.seg(A, [B1[0] + 0.9, 0], { color: 'muted', arrowEnd: true });
  s.seg(A, B1, { color: 'brand' });
  s.seg(A, C).seg(C, B1).seg(C, B2, { color: 'accent', dashed: true });
  if (o.swing) {
    const d1 = dirOf(C, B1);
    const d2 = dirOf(C, B2);
    s.arc(C, o.a * k, d2 - 10, d1 + 10, 'muted');
  }
  s.arc(A, 0.65, 0, o.A);
  const [nA, nB, nC] = o.names;
  s.vertexLabel(A, [0, o.A], nA).vertexLabel(C, [dirOf(C, A), dirOf(C, B1)], nC);
  s.endLabel(B1, -60, `${nB}₁`, 12).endLabel(B2, -90, `${nB}₂`, 12);
  s.angleLabel(A, 0, o.A, o.angleLabel, 34);
  const midAC: P = [C[0] / 2, C[1] / 2];
  s.sideLabel(midAC, o.A + 90, o.bLabel);
  const midCB1: P = [(C[0] + B1[0]) / 2, (C[1] + B1[1]) / 2];
  s.sideLabel(midCB1, dirOf(C, B1) + 90, o.aLabel);
  return s.build({ margin: 0.6, caption: o.caption });
}

// ---------------------------------------------------------------------------
// Lesson 2.1 — Angles in standard position
// ---------------------------------------------------------------------------

const QUADRANT_CHOICES = ['quadrant I', 'quadrant II', 'quadrant III', 'quadrant IV'];

const referenceAngle = skill({
  id: 'm201-reference-angle',
  name: 'Reference angles and quadrants',
  description: 'Name the quadrant and the reference angle of an angle in standard position from 0° to 360°, and find every angle with a given reference angle.',
  outcomes: ['T1'],
  lessonId: 'm201-2-1',
  gen(rng, d) {
    if (d === 3) {
      const ref = rng.int(8, 82);
      const all = rng.chance(0.2);
      const qs = all ? [1, 2, 3, 4] : rng.sample([1, 2, 3, 4], 2).sort();
      const values = qs.map((q) => fromRef(ref, q));
      const where = all ? 'in any quadrant' : `in quadrant ${ROMAN[qs[0]]} or quadrant ${ROMAN[qs[1]]}`;
      return {
        prompt: `Determine every angle $\\theta$ in standard position, $0^\\circ \\le \\theta < 360^\\circ$, that has a reference angle of $${deg(ref)}$ and a terminal arm ${where}. Separate the angles with commas.`,
        parts: [part({ kind: 'numbers', values }, { label: '$\\theta =$', suffix: '°', placeholder: 'For example: 20, 160' })],
        hints: [
          'Sketch the reference angle in each quadrant. It is always measured from the nearest part of the $x$-axis.',
          'Quadrant I: $\\theta = \\theta_R$. Quadrant II: $\\theta = 180^\\circ - \\theta_R$. Quadrant III: $\\theta = 180^\\circ + \\theta_R$. Quadrant IV: $\\theta = 360^\\circ - \\theta_R$.',
        ],
        solution: [
          ...qs.map((q) => `Quadrant ${ROMAN[q]}: $\\theta = ${q === 1 ? deg(ref) : `${fromRefWork(ref, q)} = ${deg(fromRef(ref, q))}`}$`),
          `The angles are ${values.map((v) => `$${deg(v)}$`).join(', ')}.`,
        ],
        answerDisplay: values.map((v) => `$${deg(v)}$`).join(', '),
      };
    }
    if (d === 1) {
      const q = rng.pick([1, 2, 2, 3, 3, 4, 4]);
      const t = fromRef(5 * rng.int(2, 16), q);
      const r = refAngle(t);
      return {
        prompt: `The angle $\\theta = ${deg(t)}$ is drawn in standard position. In which quadrant does its terminal arm lie, and what is its reference angle $\\theta_R$?`,
        figure: standardFigure({ theta: t, label: `${t}°` }),
        parts: [part(fixedChoice(QUADRANT_CHOICES, q - 1), { label: 'Terminal arm in' }), numPart(r, { label: '$\\theta_R =$', suffix: '°' })],
        hints: [
          'The quadrants are numbered counterclockwise from the positive $x$-axis: I ($0^\\circ$ to $90^\\circ$), II ($90^\\circ$ to $180^\\circ$), III ($180^\\circ$ to $270^\\circ$), IV ($270^\\circ$ to $360^\\circ$).',
          'The reference angle is the acute angle between the terminal arm and the nearest part of the $x$-axis (toward $0^\\circ$, $180^\\circ$ or $360^\\circ$).',
        ],
        solution: [`$${QUAD_RANGE[q].replace(/\\theta/, deg(t))}$, so the terminal arm lies in quadrant ${ROMAN[q]}.`, `$${refWork(t)}$`, `Quadrant ${ROMAN[q]}, reference angle $${deg(r)}$.`],
      };
    }
    // d === 2
    if (rng.chance(0.5)) {
      const q = rng.pick([2, 3, 4]);
      const t = fromRef(rng.intExcept(3, 87, [45]), q);
      const r = refAngle(t);
      return {
        prompt: `Determine the reference angle of $${deg(t)}$.`,
        parts: [numPart(r, { label: '$\\theta_R =$', suffix: '°' })],
        hints: ['First decide which quadrant the terminal arm is in.', 'The reference angle is measured to the nearest part of the $x$-axis: subtract from $180^\\circ$ in quadrant II, subtract $180^\\circ$ in quadrant III, subtract from $360^\\circ$ in quadrant IV.'],
        solution: [`$${QUAD_RANGE[q].replace(/\\theta/, deg(t))}$, so $${deg(t)}$ is in quadrant ${ROMAN[q]}.`, `$${refWork(t)}$`],
      };
    }
    const q = rng.pick([2, 3, 4]);
    const ref = rng.intExcept(3, 87, [45]);
    const t = fromRef(ref, q);
    return {
      prompt: `An angle $\\theta$ in standard position, $0^\\circ \\le \\theta < 360^\\circ$, has a reference angle of $${deg(ref)}$, and its terminal arm lies in quadrant ${ROMAN[q]}. Determine $\\theta$.`,
      parts: [numPart(t, { label: '$\\theta =$', suffix: '°' })],
      hints: ['Sketch the reference angle in the given quadrant, measured from the $x$-axis.', `In quadrant ${ROMAN[q]}, $\\theta = ${fromRefWork('\\theta_R', q)}$.`],
      solution: [`In quadrant ${ROMAN[q]}, $\\theta = ${fromRefWork('\\theta_R', q)}$.`, `$\\theta = ${fromRefWork(ref, q)} = ${deg(t)}$`],
    };
  },
});

const SPECIAL_TRI: Record<number, { fig: RightTriangleFigure; how: string }> = {
  45: {
    fig: { type: 'rightTriangle', vertices: { right: 'C', a: 'A', b: 'B' }, legA: 1, legB: 1, sideLabels: { ra: '1', rb: '1', ab: '\\sqrt{2}' }, angleLabels: { a: '45°', b: '45°' } },
    how: 'In the $45^\\circ$–$45^\\circ$–$90^\\circ$ triangle, both legs are $1$ and the hypotenuse is $\\sqrt{2}$.',
  },
  30: {
    fig: { type: 'rightTriangle', vertices: { right: 'C', a: 'A', b: 'B' }, legA: Math.sqrt(3), legB: 1, sideLabels: { ra: '\\sqrt{3}', rb: '1', ab: '2' }, angleLabels: { a: '30°', b: '60°' } },
    how: 'In the $30^\\circ$–$60^\\circ$–$90^\\circ$ triangle, the side opposite $30^\\circ$ is $1$, the side opposite $60^\\circ$ is $\\sqrt{3}$ and the hypotenuse is $2$.',
  },
};
SPECIAL_TRI[60] = SPECIAL_TRI[30];

/** opposite, adjacent and hypotenuse of a special acute angle (as LaTeX). */
function specialSides(a: number): [string, string, string] {
  return a === 45 ? ['1', '1', '\\sqrt{2}'] : a === 30 ? ['1', '\\sqrt{3}', '2'] : ['\\sqrt{3}', '1', '2'];
}
function specialRatioWork(f: Fn, a: number): string {
  const [o, adj, h] = specialSides(a);
  const [num, den] = f === 'sin' ? [o, h] : f === 'cos' ? [adj, h] : [o, adj];
  const v = exactTrig(f, a)!;
  const raw = `\\dfrac{${num}}{${den}}`;
  const fin = exLatex(v);
  return raw === fin ? `\\${f} ${deg(a)} = ${fin}` : `\\${f} ${deg(a)} = ${raw} = ${fin}`;
}

/** Point on the terminal arm of a quadrantal angle (r = 1). */
const AXIS_POINT: Record<number, [number, number]> = { 0: [1, 0], 90: [0, 1], 180: [-1, 0], 270: [0, -1] };

const EXACT_NOTE = 'Give an exact value. Type a square root with sqrt, for example `2sqrt(5)/3`.';
const EXACT_NOTE2 = 'Give exact values. Type a square root with sqrt, for example `2sqrt(5)/3`.';

function exactSteps(f: Fn, t: number): { steps: string[]; value: Ex | null } {
  const value = exactTrig(f, t);
  if (isQuadrantal(t)) {
    const [x, y] = AXIS_POINT[t];
    const ratio = f === 'sin' ? `\\dfrac{y}{r} = \\dfrac{${y}}{1}` : f === 'cos' ? `\\dfrac{x}{r} = \\dfrac{${x}}{1}` : `\\dfrac{y}{x} = \\dfrac{${y}}{${x}}`;
    return {
      value,
      steps: [
        `The terminal arm of $${deg(t)}$ lies on the ${t === 0 ? 'positive $x$' : t === 90 ? 'positive $y$' : t === 180 ? 'negative $x$' : 'negative $y$'}-axis. The point $(${x}, ${y})$ is on it, with $r = 1$.`,
        value === null ? `$\\tan ${deg(t)} = ${ratio}$, and division by zero is not defined, so $\\tan ${deg(t)}$ is undefined.` : `$\\${f} ${deg(t)} = ${ratio} = ${exLatex(value)}$`,
      ],
    };
  }
  const q = quadrant(t);
  const r = refAngle(t);
  const pos = positiveIn(f, q);
  return {
    value,
    steps: [
      `Quadrant ${ROMAN[q]}: $${refWork(t)}$`,
      `In quadrant ${ROMAN[q]}, $x ${q === 1 || q === 4 ? '>' : '<'} 0$ and $y ${q <= 2 ? '>' : '<'} 0$, so $\\${f} ${deg(t)} = ${FN_DEF[f]}$ is ${pos ? 'positive' : 'negative'}.`,
      `From the special triangle, $${specialRatioWork(f, r)}$.`,
      `$\\${f} ${deg(t)} = ${pos ? '' : '-'}\\${f} ${deg(r)} = ${exLatex(value!)}$`,
    ],
  };
}

const specialExact = skill({
  id: 'm201-special-exact',
  name: 'Exact values of special angles',
  description: 'Determine exact values of sine, cosine and tangent for multiples of 30° and 45° from 0° to 360° using special triangles and reference angles.',
  outcomes: ['T1'],
  lessonId: 'm201-2-1',
  gen(rng, d) {
    if (d === 1) {
      const a = rng.pick([30, 45, 60]);
      const f = rng.pick(FNS);
      const v = exactTrig(f, a)!;
      return {
        prompt: `Use the special triangle to determine the exact value of $\\${f} ${deg(a)}$. ${EXACT_NOTE}`,
        figure: SPECIAL_TRI[a].fig,
        parts: [numPart(exValue(v), { label: `$\\${f} ${deg(a)} =$` })],
        hints: [
          `Relative to the $${deg(a)}$ angle, label the opposite side, the adjacent side and the hypotenuse.`,
          '$\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}$',
        ],
        solution: [SPECIAL_TRI[a].how, `$${specialRatioWork(f, a)}$`, `Type it as \`${exText(v)}\`.`],
        answerDisplay: `$${exLatex(v)}$`,
      };
    }
    if (d === 2) {
      const quad = rng.chance(0.3);
      const t = quad ? rng.pick(QUADRANTAL) : rng.pick(SPECIAL_NONQ.filter((x) => x > 90));
      const f = rng.pick(FNS);
      const { steps, value } = exactSteps(f, t);
      return {
        prompt: `Determine the exact value of $\\${f} ${deg(t)}$. ${EXACT_NOTE} If the ratio is undefined, type *undefined*.`,
        parts: [part(value === null ? { kind: 'numeric', value: 0, undefinedValue: true } : { kind: 'numeric', value: exValue(value), allowExpression: true }, { label: `$\\${f} ${deg(t)} =$` })],
        hints: [
          isQuadrantal(t) ? 'Use a point on the terminal arm with $r = 1$, such as $(0, 1)$ or $(-1, 0)$.' : 'Find the reference angle. Then decide the sign from the signs of $x$ and $y$ in that quadrant.',
          'Use $\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$ and $\\tan\\theta = \\dfrac{y}{x}$, or the special triangles for the reference angle.',
        ],
        solution: steps,
        answerDisplay: value === null ? 'undefined' : `$${exLatex(value)}$`,
      };
    }
    // d === 3: a two-term expression
    type Term = { f: Fn; t: number; sq: boolean; v: Ex };
    const makeTerm = (): Term => {
      const f = rng.pick(FNS);
      const t = rng.pick(SPECIAL_NONQ);
      const sq = rng.chance(0.3);
      const v = exactTrig(f, t);
      return { f, t, sq, v: v === null ? ex(0) : sq ? exMul(v, v) : v };
    };
    const ok = (x: Term) => exactTrig(x.f, x.t) !== null;
    const t1 = retry(makeTerm, ok);
    const t2 = retry(makeTerm, (x) => ok(x) && (x.f !== t1.f || x.t !== t1.t));
    const op = rng.pick(['+', '-', '\\cdot'] as const);
    const tex = (x: Term) => (x.sq ? `\\${x.f}^2 ${deg(x.t)}` : `\\${x.f} ${deg(x.t)}`);
    const result = op === '+' ? exAdd(t1.v, t2.v) : op === '-' ? exAdd(t1.v, exScale(t2.v, frac(-1))) : exMul(t1.v, t2.v);
    const raw = exactTrig(t1.f, t1.t)!;
    const raw2 = exactTrig(t2.f, t2.t)!;
    const show = (x: Term, r: Ex) => {
      const l = exLatex(r);
      const wrap = l.startsWith('-') || l.includes('\\dfrac') ? `\\left(${l}\\right)` : l;
      return x.sq ? `${wrap}^2` : l.startsWith('-') && x !== t1 ? `\\left(${l}\\right)` : l;
    };
    const expr = `${tex(t1)} ${op} ${tex(t2)}`;
    return {
      prompt: `Determine the exact value of $${expr}$. ${EXACT_NOTE}`,
      parts: [numPart(exValue(result), { label: 'Value' })],
      hints: [
        `Find each ratio separately: use the reference angle for the size and the signs of $x$ and $y$ for the sign.${t1.sq || t2.sq ? ' Remember that $\\sin^2\\theta$ means $(\\sin\\theta)^2$.' : ''}`,
        'Substitute the exact values, then simplify. Keep radicals exact — do not use decimals.',
      ],
      solution: [
        `$\\${t1.f} ${deg(t1.t)} = ${exLatex(raw)}$ and $\\${t2.f} ${deg(t2.t)} = ${exLatex(raw2)}$`,
        `$${expr} = ${show(t1, raw)} ${op} ${show(t2, raw2)}$`,
        `$= ${exLatex(result)}$ (type it as \`${exText(result)}\`)`,
      ],
      answerDisplay: `$${exLatex(result)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — Trigonometric ratios of any angle
// ---------------------------------------------------------------------------

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [6, 8, 10],
  [7, 24, 25],
  [9, 12, 15],
  [20, 21, 29],
  [12, 16, 20],
];

/** √n simplified, as LaTeX and as a value. */
function sqrtTex(n: number): string {
  const { outside, inside } = radicalSplit(n);
  if (inside === 1) return `${outside}`;
  return `${outside === 1 ? '' : outside}\\sqrt{${inside}}`;
}
const pointLabel = (x: number, y: number) => `P(${fl(x)}, ${fl(y)})`;
const angleOfPoint = (x: number, y: number) => norm360((Math.atan2(y, x) * 180) / Math.PI);

/** Exact ratio from integer x, y and r = √(x² + y²). */
function pointRatio(f: Fn, x: number, y: number): Ex {
  const r2 = x * x + y * y;
  const r = ex(1, 1, r2);
  return f === 'sin' ? exDiv(ex(y), r) : f === 'cos' ? exDiv(ex(x), r) : ex(y, x);
}

const ratioFromPoint = skill({
  id: 'm201-ratio-from-point',
  name: 'Ratios from a point on the terminal arm',
  description: 'Given a point on the terminal arm of an angle in standard position, determine r and the exact trigonometric ratios; given one ratio and the quadrant, determine the others.',
  outcomes: ['T2'],
  lessonId: 'm201-2-2',
  gen(rng, d) {
    if (d === 3) return ratioFromRatio(rng);
    let x: number;
    let y: number;
    if (d === 1) {
      const [p, q] = rng.pick(TRIPLES);
      [x, y] = rng.chance(0.5) ? [p, q] : [q, p];
      x *= rng.sign();
      y *= rng.sign();
      if (x > 0 && y > 0 && rng.chance(0.6)) x = -x;
    } else {
      [x, y] = retry(
        () => [rng.nonZero(-9, 9), rng.nonZero(-9, 9)] as [number, number],
        ([a, b]) => !isPerfectSquare(a * a + b * b) && Math.abs(a) !== Math.abs(b) && !(a > 0 && b > 0),
      );
    }
    const r2 = x * x + y * y;
    const r = Math.sqrt(r2);
    const f = rng.pick(FNS);
    const v = pointRatio(f, x, y);
    const theta = angleOfPoint(x, y);
    const rWork = isPerfectSquare(r2)
      ? `$r = \\sqrt{x^2 + y^2} = \\sqrt{(${x})^2 + (${y})^2} = \\sqrt{${r2}} = ${r}$`
      : `$r = \\sqrt{x^2 + y^2} = \\sqrt{(${x})^2 + (${y})^2} = \\sqrt{${r2}}${sqrtTex(r2) === `\\sqrt{${r2}}` ? '' : ` = ${sqrtTex(r2)}`}$`;
    const rawRatio = f === 'sin' ? `\\dfrac{${y}}{${sqrtTex(r2)}}` : f === 'cos' ? `\\dfrac{${x}}{${sqrtTex(r2)}}` : `\\dfrac{${y}}{${x}}`;
    const ratioWork = `$\\${f}\\theta = ${FN_DEF[f]} = ${rawRatio}${rawRatio === exLatex(v) ? '' : ` = ${exLatex(v)}`}$`;
    const q = quadrant(theta);
    const ref = atanD(Math.abs(y) / Math.abs(x));
    const fig = standardFigure({ theta, label: 'θ', point: pointLabel(x, y) });
    if (d === 1) {
      return {
        prompt: `The point $P(${x}, ${y})$ lies on the terminal arm of an angle $\\theta$ in standard position. Determine $r$ and the exact value of $\\${f}\\theta$.`,
        figure: fig,
        parts: [numPart(r, { label: '$r =$' }), numPart(exValue(v), { label: `$\\${f}\\theta =$` })],
        hints: ['$r$ is the distance from the origin to $P$: $r = \\sqrt{x^2 + y^2}$. It is always positive.', '$\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$, $\\tan\\theta = \\dfrac{y}{x}$ — keep the signs of $x$ and $y$.'],
        solution: [rWork, ratioWork],
        answerDisplay: `$r = ${r}$, $\\${f}\\theta = ${exLatex(v)}$`,
      };
    }
    return {
      prompt: `The point $P(${x}, ${y})$ lies on the terminal arm of an angle $\\theta$ in standard position, $0^\\circ \\le \\theta < 360^\\circ$. Determine the exact value of $r$, the exact value of $\\${f}\\theta$, and the measure of $\\theta$ ${TENTH_DEG}.`,
      figure: fig,
      parts: [numPart(r, { label: '$r =$' }), numPart(exValue(v), { label: `$\\${f}\\theta =$` }), numPart(theta, { label: '$\\theta =$', decimals: 1, suffix: '°' })],
      hints: [
        '$r = \\sqrt{x^2 + y^2}$. Leave it as a simplified radical. Then use $\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$, $\\tan\\theta = \\dfrac{y}{x}$.',
        `For $\\theta$, first find the reference angle $\\theta_R = \\tan^{-1}\\left|\\dfrac{y}{x}\\right|$, then use the quadrant of $P$.`,
      ],
      solution: [
        rWork,
        ratioWork,
        `$\\theta_R = \\tan^{-1}\\left(\\dfrac{${Math.abs(y)}}{${Math.abs(x)}}\\right) \\approx ${fmt(ref, 2)}^\\circ$`,
        `$P$ is in quadrant ${ROMAN[q]}, so $\\theta = ${fromRefWork(`${fmt(ref, 2)}^\\circ`, q)} \\approx ${fmtFixed(theta, 1)}^\\circ$`,
      ],
      answerDisplay: `$r = ${sqrtTex(r2)}$, $\\${f}\\theta = ${exLatex(v)}$, $\\theta \\approx ${fmtFixed(theta, 1)}^\\circ$`,
      calculator: true,
    };
  },
});

function ratioFromRatio(rng: Rng): GenOutput {
  const f = rng.pick(FNS);
  const q = rng.pick([2, 3, 4, 2, 3, 4, 1]);
  const sx = q === 1 || q === 4 ? 1 : -1;
  const sy = q <= 2 ? 1 : -1;
  // |x|, |y| and r as exact values: one of them may be a radical.
  let ax: Ex;
  let ay: Ex;
  let r: Ex;
  if (rng.chance(0.55)) {
    const [p, qq, h] = rng.pick(TRIPLES.filter((t) => gcd(t[0], t[1]) === 1));
    const [m, n] = rng.chance(0.5) ? [p, qq] : [qq, p];
    ax = ex(m);
    ay = ex(n);
    r = ex(h);
  } else if (f === 'tan') {
    const [m, n] = retry(
      () => [rng.int(1, 9), rng.int(1, 9)],
      ([a, b]) => gcd(a, b) === 1 && a !== b && !isPerfectSquare(a * a + b * b),
    );
    ax = ex(m);
    ay = ex(n);
    r = ex(1, 1, m * m + n * n);
  } else {
    const [n, h] = retry(
      () => [rng.int(1, 8), rng.int(2, 9)],
      ([a, b]) => a < b && gcd(a, b) === 1 && !isPerfectSquare(b * b - a * a),
    );
    r = ex(h);
    const other = ex(1, 1, h * h - n * n);
    if (f === 'sin') {
      ay = ex(n);
      ax = other;
    } else {
      ax = ex(n);
      ay = other;
    }
  }
  const X = exScale(ax, frac(sx));
  const Y = exScale(ay, frac(sy));
  const ratios: Record<Fn, Ex> = { sin: exDiv(Y, r), cos: exDiv(X, r), tan: exDiv(Y, X) };
  const givenTex = `\\${f}\\theta = ${exLatex(ratios[f])}`;
  // Where θ is: a quadrant, an interval, or the sign of a second ratio.
  const style = rng.pick(['quadrant', 'interval', 'sign'] as const);
  const other = FNS.filter((g) => g !== f);
  const signFn = rng.pick(other);
  const where =
    style === 'quadrant'
      ? `$\\theta$ terminates in quadrant ${ROMAN[q]}`
      : style === 'interval'
        ? `$${QUAD_RANGE[q]}$`
        : `$\\${signFn}\\theta ${positiveIn(signFn, q) ? '>' : '<'} 0$`;
  const [g1, g2] = other;
  const knownIsX = f === 'cos';
  const knownIsR = f !== 'tan';
  const steps: string[] = [];
  if (style === 'sign') {
    const fPos = positiveIn(f, q);
    steps.push(`$\\${f}\\theta$ is ${fPos ? 'positive' : 'negative'} and $\\${signFn}\\theta$ is ${positiveIn(signFn, q) ? 'positive' : 'negative'}: by the CAST rule, $\\theta$ is in quadrant ${ROMAN[q]}.`);
  }
  steps.push(`In quadrant ${ROMAN[q]}, $x$ is ${sx > 0 ? 'positive' : 'negative'} and $y$ is ${sy > 0 ? 'positive' : 'negative'}.`);
  if (knownIsR) {
    const known = knownIsX ? 'x' : 'y';
    const unk = knownIsX ? 'y' : 'x';
    const kv = knownIsX ? X : Y;
    const uv = knownIsX ? Y : X;
    steps.push(`From $${givenTex}$, take $${known} = ${exLatex(kv)}$ and $r = ${exLatex(r)}$.`);
    steps.push(`$${unk}^2 = r^2 - ${known}^2 = ${fmt(exValue(r) ** 2)} - ${fmt(exValue(kv) ** 2)} = ${fmt(exValue(uv) ** 2)}$, so $${unk} = ${exLatex(uv)}$ (${exValue(uv) > 0 ? 'positive' : 'negative'} in quadrant ${ROMAN[q]}).`);
  } else {
    steps.push(`From $${givenTex}$, take $x = ${exLatex(X)}$ and $y = ${exLatex(Y)}$.`);
    steps.push(`$r = \\sqrt{x^2 + y^2} = \\sqrt{${fmt(exValue(X) ** 2)} + ${fmt(exValue(Y) ** 2)}} = ${exLatex(r)}$`);
  }
  steps.push(`$\\${g1}\\theta = ${FN_DEF[g1]} = ${exLatex(ratios[g1])}$ and $\\${g2}\\theta = ${FN_DEF[g2]} = ${exLatex(ratios[g2])}$`);
  return {
    prompt: `Given $${givenTex}$ and ${where}, determine the exact values of $\\${g1}\\theta$ and $\\${g2}\\theta$. ${EXACT_NOTE2}`,
    parts: [numPart(exValue(ratios[g1]), { label: `$\\${g1}\\theta =$` }), numPart(exValue(ratios[g2]), { label: `$\\${g2}\\theta =$` })],
    hints: [
      `Sketch the angle in its quadrant and read ${f === 'tan' ? '$x$ and $y$' : f === 'sin' ? '$y$ and $r$' : '$x$ and $r$'} from the given ratio, with the correct signs.`,
      `Use $x^2 + y^2 = r^2$ to find the missing value, then $\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$, $\\tan\\theta = \\dfrac{y}{x}$.`,
    ],
    solution: steps,
    answerDisplay: `$\\${g1}\\theta = ${exLatex(ratios[g1])}$, $\\${g2}\\theta = ${exLatex(ratios[g2])}$`,
  };
}

const POSITIVE_CHOICES = ['only $\\sin\\theta$', 'only $\\cos\\theta$', 'only $\\tan\\theta$', 'all three ratios'];
const positiveChoiceIndex = (q: number) => (q === 1 ? 3 : q === 2 ? 0 : q === 3 ? 2 : 1);

const ratioSign = skill({
  id: 'm201-ratio-sign',
  name: 'The CAST rule',
  description: 'Use the CAST rule to decide the sign of a trigonometric ratio or the quadrant of an angle from the signs of its ratios.',
  outcomes: ['T1', 'T2'],
  lessonId: 'm201-2-2',
  format: 'mc',
  gen(rng, d) {
    if (d === 1) {
      const q = rng.pick([1, 2, 3, 4]);
      const t = fromRef(5 * rng.int(2, 16), q);
      return {
        prompt: `Which primary trigonometric ratios of $\\theta = ${deg(t)}$ are positive?`,
        figure: standardFigure({ theta: t, label: `${t}°` }),
        parts: [{ answer: fixedChoice(POSITIVE_CHOICES, positiveChoiceIndex(q)) }],
        hints: ['Find the quadrant of the terminal arm.', 'CAST, counterclockwise from quadrant IV: **C**osine (IV), **A**ll (I), **S**ine (II), **T**angent (III) — these are the positive ratios.'],
        solution: [`$${QUAD_RANGE[q].replace(/\\theta/, deg(t))}$: quadrant ${ROMAN[q]}.`, `In quadrant ${ROMAN[q]}, $x$ is ${q === 1 || q === 4 ? 'positive' : 'negative'} and $y$ is ${q <= 2 ? 'positive' : 'negative'}, so ${CAST_WORD[q]}.`],
      };
    }
    if (d === 2) {
      const q = rng.pick([1, 2, 3, 4]);
      const [f1, f2] = rng.sample(FNS, 2);
      const cond = (f: Fn) => {
        const pos = positiveIn(f, q);
        if (rng.chance(0.35)) {
          const v = f === 'tan' ? rng.float(0.2, 3.5, 1) : rng.float(0.1, 0.9, 1);
          return `\\${f}\\theta = ${pos ? '' : '-'}${fmt(v)}`;
        }
        return `\\${f}\\theta ${pos ? '>' : '<'} 0`;
      };
      const quadsOf = (f: Fn, pos: boolean) => [1, 2, 3, 4].filter((x) => positiveIn(f, x) === pos);
      const s1 = positiveIn(f1, q);
      const s2 = positiveIn(f2, q);
      return {
        prompt: `An angle $\\theta$ in standard position has $${cond(f1)}$ and $${cond(f2)}$. In which quadrant does its terminal arm lie?`,
        parts: [{ answer: fixedChoice(QUADRANT_CHOICES, q - 1) }],
        hints: ['Use the CAST rule: in quadrant I all ratios are positive; in II only sine; in III only tangent; in IV only cosine.', 'List the quadrants allowed by each condition, then find the quadrant that is on both lists.'],
        solution: [
          `$\\${f1}\\theta$ is ${s1 ? 'positive' : 'negative'} in quadrants ${quadsOf(f1, s1).map((x) => ROMAN[x]).join(' and ')}.`,
          `$\\${f2}\\theta$ is ${s2 ? 'positive' : 'negative'} in quadrants ${quadsOf(f2, s2).map((x) => ROMAN[x]).join(' and ')}.`,
          `Both are true only in quadrant ${ROMAN[q]}.`,
        ],
      };
    }
    // d === 3
    if (rng.chance(0.5)) {
      // Same value as ±f(α).
      const f = rng.pick(FNS);
      const a = rng.intExcept(10, 80, [45]);
      const neg = rng.chance(0.4);
      const target = (neg ? -1 : 1) * FN_D[f](a);
      const cands = [180 - a, 180 + a, 360 - a, 90 + a, 270 - a, 270 + a].map((t) => ({ f, t }));
      cands.push({ f: f === 'sin' ? 'cos' : 'sin', t: rng.pick([180 - a, 180 + a, 360 - a]) });
      const equal = cands.filter((c) => Math.abs(FN_D[c.f](c.t) - target) < 1e-9);
      const unequal = rng.shuffle(cands.filter((c) => Math.abs(FN_D[c.f](c.t) - target) > 1e-6));
      const correct = rng.pick(equal);
      const tex = (c: { f: Fn; t: number }) => `$\\${c.f} ${deg(c.t)}$`;
      const distract = unequal.filter((c) => c.f === f).slice(0, 2);
      const rest = unequal.filter((c) => !distract.includes(c));
      const choices = [...distract, ...rest].slice(0, 3);
      const q = quadrant(correct.t);
      return {
        prompt: `Which expression has the same value as $${neg ? '-' : ''}\\${f} ${deg(a)}$?`,
        parts: [{ answer: mc(rng, tex(correct), choices.map(tex)) }],
        hints: ['Angles with the same reference angle have ratios with the same size; only the sign can differ.', `Decide where $\\${f}$ is ${neg ? 'negative' : 'positive'} with the CAST rule, then look for an angle in that quadrant with reference angle $${deg(a)}$.`],
        solution: [
          `$\\${f} ${deg(a)}$ is positive, so we need an angle with reference angle $${deg(a)}$ whose ${FN_NAME[f]} is ${neg ? 'negative' : 'positive'}.`,
          `$${deg(correct.t)}$ is in quadrant ${ROMAN[q]} with $\\theta_R = ${deg(a)}$, and $\\${f}$ is ${neg ? 'negative' : 'positive'} there.`,
          `So $\\${f} ${deg(correct.t)} = ${neg ? '-' : ''}\\${f} ${deg(a)}$.`,
        ],
      };
    }
    // Exactly one true statement.
    const stmt = () => {
      const f = rng.pick(FNS);
      const t = fromRef(5 * rng.int(2, 16), rng.pick([1, 2, 3, 4]));
      const gt = rng.chance(0.5);
      const val = FN_D[f](t);
      return { f, t, gt, truth: gt ? val > 0 : val < 0, tex: `$\\${f} ${deg(t)} ${gt ? '>' : '<'} 0$` };
    };
    const truth = retry(stmt, (s) => s.truth && s.t > 90);
    const falses: ReturnType<typeof stmt>[] = [];
    for (let i = 0; i < 60 && falses.length < 3; i++) {
      const s = stmt();
      if (!s.truth && !falses.some((x) => x.tex === s.tex) && s.tex !== truth.tex) falses.push(s);
    }
    const explain = (s: ReturnType<typeof stmt>) => `$${deg(s.t)}$ is in quadrant ${ROMAN[quadrant(s.t)]}, where $\\${s.f}$ is ${positiveIn(s.f, quadrant(s.t)) ? 'positive' : 'negative'}: ${s.tex} is ${s.truth ? '**true**' : 'false'}.`;
    return {
      prompt: 'Without a calculator, decide which statement is true.',
      parts: [{ answer: mc(rng, truth.tex, falses.map((s) => s.tex)) }],
      hints: ['Find the quadrant of each angle.', 'Use CAST: quadrant I all positive, II sine, III tangent, IV cosine.'],
      solution: [truth, ...falses].map(explain),
    };
  },
});

/** The special values of each ratio with their reference angles (positive values). */
const SPECIAL_VALUES: Record<Fn, Array<{ v: Ex; ref: number }>> = {
  sin: [
    { v: ex(1, 2), ref: 30 },
    { v: ex(1, 2, 2), ref: 45 },
    { v: ex(1, 2, 3), ref: 60 },
  ],
  cos: [
    { v: ex(1, 2, 3), ref: 30 },
    { v: ex(1, 2, 2), ref: 45 },
    { v: ex(1, 2), ref: 60 },
  ],
  tan: [
    { v: ex(1, 3, 3), ref: 30 },
    { v: ex(1), ref: 45 },
    { v: ex(1, 1, 3), ref: 60 },
  ],
};

/** Solutions in [0, 360) of f(θ) = v. */
function solveTrig(f: Fn, v: number): number[] {
  const out: number[] = [];
  for (let t = 0; t < 360; t += 0.5) if (Math.abs(FN_D[f](t) - v) < 1e-9 && !(f === 'tan' && t % 180 === 90)) out.push(t);
  return out;
}

function quadrantsFor(f: Fn, positive: boolean): number[] {
  return [1, 2, 3, 4].filter((q) => positiveIn(f, q) === positive);
}

const solveAngle = skill({
  id: 'm201-solve-angle',
  name: 'Solving for angles from 0° to 360°',
  description: 'Determine every angle from 0° to 360° with a given value of sine, cosine or tangent, exactly for special values and to the nearest tenth otherwise.',
  outcomes: ['T2'],
  lessonId: 'm201-2-2',
  gen(rng, d) {
    const f = rng.pick(FNS);
    const range = '$0^\\circ \\le \\theta < 360^\\circ$';
    const sep = 'Enter every solution in degrees, separated by commas.';
    if (d < 3) {
      const quadValue = d === 2 && rng.chance(0.25);
      if (quadValue) {
        const v = f === 'tan' ? 0 : rng.pick([0, 1, -1]);
        const sols = solveTrig(f, v);
        const where = sols.map((t) => `$(${AXIS_POINT[t][0]}, ${AXIS_POINT[t][1]})$ at $${deg(t)}$`).join(' and ');
        return {
          prompt: `Solve $\\${f}\\theta = ${v}$ for ${range}. ${sep}`,
          parts: [part({ kind: 'numbers', values: sols }, { label: '$\\theta =$', suffix: '°' })],
          hints: ['Think of the points $(1, 0)$, $(0, 1)$, $(-1, 0)$ and $(0, -1)$ on the axes, each with $r = 1$.', `$\\${f}\\theta = ${FN_DEF[f]}$ — which axis points make this ratio equal $${v}$?`],
          solution: [`On the axes, with $r = 1$: $\\${f}\\theta = ${FN_DEF[f]} = ${v}$ at the point${sols.length > 1 ? 's' : ''} ${where}.`, `$\\theta = ${sols.map(deg).join('$ or $\\theta = ')}$`],
          answerDisplay: sols.map((t) => `$${deg(t)}$`).join(', '),
        };
      }
      const pick = rng.pick(SPECIAL_VALUES[f]);
      const neg = d === 2 && rng.chance(0.7);
      const v = neg ? exScale(pick.v, frac(-1)) : pick.v;
      const qs = quadrantsFor(f, !neg);
      const sols = qs.map((q) => fromRef(pick.ref, q)).sort((a, b) => a - b);
      // d2: sometimes as an equation such as 2 sin θ + √3 = 0.
      let eq = `\\${f}\\theta = ${exLatex(v)}`;
      const isolate: string[] = [];
      if (d === 2 && rng.chance(0.5)) {
        const [[rr, c]] = [...v];
        const k = c.d;
        const num = c.n;
        const top = rr === 1 ? `${Math.abs(num)}` : `${Math.abs(num) === 1 ? '' : Math.abs(num)}\\sqrt{${rr}}`;
        eq = `${k === 1 ? '' : k}\\${f}\\theta ${num < 0 ? '+' : '-'} ${top} = 0`;
        isolate.push(k === 1 ? `Isolate the ratio: $\\${f}\\theta = ${exLatex(v)}$.` : `Isolate the ratio: $${k}\\${f}\\theta = ${num < 0 ? '-' : ''}${top}$, so $\\${f}\\theta = ${exLatex(v)}$.`);
      }
      return {
        prompt: `Solve $${eq}$ for ${range}. ${sep}`,
        parts: [part({ kind: 'numbers', values: sols }, { label: '$\\theta =$', suffix: '°', placeholder: 'For example: 30, 150' })],
        hints: [
          `Find the reference angle from the special triangles: which acute angle has $\\${f}\\theta_R = ${exLatex(pick.v)}$?`,
          `Use CAST: $\\${f}$ is ${neg ? 'negative' : 'positive'} in quadrants ${qs.map((q) => ROMAN[q]).join(' and ')}. Place the reference angle in each.`,
        ],
        solution: [
          ...isolate,
          `Reference angle: $\\${f}\\theta_R = ${exLatex(pick.v)}$, so $\\theta_R = ${deg(pick.ref)}$.`,
          `$\\${f}\\theta$ is ${neg ? 'negative' : 'positive'} in quadrants ${qs.map((q) => ROMAN[q]).join(' and ')}.`,
          ...qs.map((q) => `Quadrant ${ROMAN[q]}: $\\theta = ${q === 1 ? deg(pick.ref) : `${fromRefWork(pick.ref, q)} = ${deg(fromRef(pick.ref, q))}`}$`),
          `$\\theta = ${sols.map(deg).join('$ or $\\theta = ')}$`,
        ],
        answerDisplay: sols.map((t) => `$${deg(t)}$`).join(', '),
      };
    }
    // d === 3: a value that is not special; calculator, nearest tenth.
    const data = retry(
      () => {
        let n: number;
        let m: number;
        if (f === 'tan') {
          m = rng.int(2, 7);
          n = rng.nonZero(-15, 15);
        } else {
          m = rng.int(3, 9);
          n = rng.nonZero(-(m - 1), m - 1);
        }
        const g = gcd(n, m);
        return { n: n / g, m: m / g };
      },
      ({ n, m }) => {
        const v = n / m;
        if (m === 1 || (f !== 'tan' && Math.abs(v) === 0.5) || (f === 'tan' && Math.abs(v) === 1)) return false;
        return safeRound(FN_INV[f](Math.abs(v))) && FN_INV[f](Math.abs(v)) > 3 && FN_INV[f](Math.abs(v)) < 87;
      },
      200,
    );
    const v = data.n / data.m;
    const ref = FN_INV[f](Math.abs(v));
    const qs = quadrantsFor(f, v > 0);
    const sols = qs.map((q) => fromRef(ref, q)).sort((a, b) => a - b);
    const b = rng.intExcept(-8, 8, [0]);
    const style = rng.pick(['equation', 'equation', 'decimal'] as const);
    const decimal = style === 'decimal' && Number.isInteger(v * 100) && f !== 'tan';
    const vTex = fracLatex(frac(data.n, data.m));
    const eq = decimal ? `\\${f}\\theta = ${fmt(v)}` : `${data.m}\\${f}\\theta ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${data.n + b}`;
    return {
      prompt: `Solve $${eq}$ for ${range}. Give each solution ${TENTH_DEG}. ${sep}`,
      parts: [part({ kind: 'numbers', values: sols, decimals: 1 }, { label: '$\\theta =$', suffix: '°', placeholder: 'For example: 41.8, 138.2' })],
      hints: [
        decimal ? `Find the reference angle with the positive value: $\\theta_R = \\${f}^{-1}(${fmt(Math.abs(v))})$.` : `Isolate $\\${f}\\theta$ first. Then find the reference angle from the positive value: $\\theta_R = \\${f}^{-1}\\left|\\${f}\\theta\\right|$.`,
        `$\\${f}\\theta$ is ${v > 0 ? 'positive' : 'negative'}, so use CAST to find the two quadrants, and place $\\theta_R$ in each.`,
      ],
      solution: [
        ...(decimal ? [] : [`$${data.m}\\${f}\\theta = ${data.n}$, so $\\${f}\\theta = ${vTex}$`]),
        `Reference angle: $\\theta_R = \\${f}^{-1}\\left(${decimal ? fmt(Math.abs(v)) : fracLatex(frac(Math.abs(data.n), data.m))}\\right) \\approx ${fmt(ref, 3)}^\\circ$`,
        `$\\${f}\\theta$ is ${v > 0 ? 'positive' : 'negative'} in quadrants ${qs.map((q) => ROMAN[q]).join(' and ')}.`,
        ...qs.map((q) => `Quadrant ${ROMAN[q]}: $\\theta = ${fromRefWork(`${fmt(ref, 3)}^\\circ`, q)} \\approx ${fmtFixed(fromRef(ref, q), 1)}^\\circ$`),
        `$\\theta \\approx ${sols.map((t) => `${fmtFixed(t, 1)}^\\circ`).join('$ or $\\theta \\approx ')}$`,
      ],
      answerDisplay: sols.map((t) => `$${fmtFixed(t, 1)}^\\circ$`).join(', '),
      calculator: true,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.3 — The sine law
// ---------------------------------------------------------------------------

const ang = (t: Tri, i: number) => `\\angle ${t.n[i]}`;
/** The triangle's name in its usual letter order (△PQR), even when the vertex roles are shuffled. */
const triName = (n: string[]) => (TRI_NAMES.find((x) => x.every((c) => n.includes(c))) ?? n).join('');
/** "p = 12 cm, q = 9 cm and r = 15 cm" in the usual letter order. */
function sidesList(t: Tri, u: string): string {
  const order = triName(t.n).split('');
  const items = order.map((c) => `$${lo(c)} = ${len(t.s[t.n.indexOf(c)], u)}$`);
  return `${items[0]}, ${items[1]} and ${items[2]}`;
}
const side = (t: Tri, i: number) => lo(t.n[i]);
const r1 = (x: number) => Math.round(x * 10) / 10;
/** A "nice" side length: an integer or one decimal place. */
const niceSide = (rng: Rng, a: number, b: number, dec: boolean) => (dec ? rng.float(a, b, 1) : rng.int(a, b));

/** Sine-law worked steps for the unknown side i from the known pair (side j, angle j). */
function sineSideSteps(t: Tri, i: number, j: number, u: string, sj: number): string[] {
  const si = (sj * sinD(t.ang[i])) / sinD(t.ang[j]);
  return [
    `$\\dfrac{${side(t, i)}}{\\sin ${t.n[i]}} = \\dfrac{${side(t, j)}}{\\sin ${t.n[j]}}$`,
    `$\\dfrac{${side(t, i)}}{\\sin ${deg(t.ang[i])}} = \\dfrac{${fmt(sj, 2)}}{\\sin ${deg(t.ang[j])}}$`,
    `$${side(t, i)} = \\dfrac{${fmt(sj, 2)}\\sin ${deg(t.ang[i])}}{\\sin ${deg(t.ang[j])}} \\approx ${fmtFixed(si, 1)}\\text{ ${u}}$`,
  ];
}

const sineLawSide = skill({
  id: 'm201-sine-law-side',
  name: 'Sine law: finding a side',
  description: 'Use the sine law to determine an unknown side of an oblique triangle when two angles and a side are known.',
  outcomes: ['T3'],
  lessonId: 'm201-2-3',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return sineSideContext(rng);
    const u = rng.pick(['cm', 'm', 'mm']);
    const t0 = retry(
      () => {
        const angs = threeAngles(rng, 28, 112);
        const known = niceSide(rng, 8, 40, d === 2 && rng.chance(0.5));
        // d1: known side opposite vertex 0, unknown opposite vertex 1, angles at 0 and 1 given.
        // d2: known side opposite vertex 2 (between the known angles at 0 and 1).
        const t = triAAS(rng.shuffle(rng.pick(TRI_NAMES)) as Tri['n'], angs, d === 1 ? 0 : 2, known);
        return { t, known };
      },
      ({ t }) => safeRound(t.s[1]) && safeRound(t.s[0]),
      200,
    );
    const { t, known } = t0;
    const ask = d === 1 ? 1 : rng.pick([0, 1]);
    const kj = d === 1 ? 0 : 2;
    const value = t.s[ask];
    const sides: Array<string | null> = [null, null, null];
    sides[kj] = `${fmt(known)} ${u}`;
    sides[ask] = '?';
    const angles: Array<string | null> = [`${t.ang[0]}°`, `${t.ang[1]}°`, null];
    const fig = triangleFigure(t, { sides, angles }, { base: randomBase(rng), mirror: rng.chance(0.5) });
    const third = d === 2 ? [`$${ang(t, 2)} = 180^\\circ - ${deg(t.ang[0])} - ${deg(t.ang[1])} = ${deg(t.ang[2])}$`] : [];
    return {
      prompt: `In $\\triangle ${triName(t.n)}$, $${ang(t, 0)} = ${deg(t.ang[0])}$, $${ang(t, 1)} = ${deg(t.ang[1])}$ and $${side(t, kj)} = ${len(known, u)}$. Determine the length of side $${side(t, ask)}$, ${tenthOf(u)}.`,
      figure: fig,
      parts: [numPart(value, { decimals: 1, suffix: u, label: `$${side(t, ask)} =$` })],
      hints: [
        d === 2 ? 'You need an angle opposite a known side. Find the third angle first: the angles of a triangle add to $180^\\circ$.' : 'Pair each side with the angle opposite it. You know one complete pair.',
        `$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$ — write the unknown side in a numerator, then multiply both sides by the sine below it.`,
      ],
      solution: [...third, ...sineSideSteps(t, ask, kj, u, known)],
    };
  },
});

function sineSideContext(rng: Rng): GenOutput {
  const kind = rng.pick(['towers', 'river', 'balloon', 'truss'] as const);
  if (kind === 'balloon') {
    // Observers P (far) and Q (near) on level ground, same side of the balloon B.
    const { alpha, beta, dist, QB } = retry(
      () => {
        const alpha = rng.int(24, 45);
        const beta = rng.int(alpha + 15, Math.min(alpha + 40, 78));
        const dist = rng.int(12, 60) * 10;
        return { alpha, beta, dist, QB: (dist * sinD(alpha)) / sinD(beta - alpha) };
      },
      (v) => safeRound(v.QB, 0),
    );
    const [n1, n2] = rng.sample(PEOPLE, 2);
    const s = new Sketch();
    const k = 6 / (dist + QB * cosD(beta));
    const Pp: P = [0, 0];
    const Qp: P = [dist * k, 0];
    const Bp: P = [Qp[0] + QB * k * cosD(beta), QB * k * sinD(beta)];
    const Fp: P = [Bp[0], 0];
    s.seg([-0.4, 0], [Fp[0] + 0.6, 0], { color: 'muted' }).seg(Pp, Bp).seg(Qp, Bp, { color: 'accent' }).seg(Bp, Fp, { color: 'muted', dashed: true });
    s.arc(Pp, 1.1, 0, alpha).arc(Qp, 0.7, 0, beta);
    s.dot(Bp, 'accent');
    s.vertexLabel(Pp, [0, alpha, 180], 'P').vertexLabel(Qp, [0, 180, beta], 'Q').endLabel(Bp, 90, 'B');
    s.angleLabel(Pp, 0, alpha, `${alpha}°`, 52).angleLabel(Qp, 0, beta, `${beta}°`, 36);
    s.sideLabel([dist * k * 0.5, 0], -90, `${dist} m`);
    return {
      prompt: `${n1} and ${n2} stand ${dist} m apart on level ground, on the same side of a hot-air balloon $B$ and in line with it. From ${n1}'s position $P$, the angle of elevation of the balloon is $${deg(alpha)}$. From ${n2}'s position $Q$, closer to the balloon, it is $${deg(beta)}$. How far is ${n2} from the balloon (the length $QB$), to the nearest metre?`,
      figure: s.build({ margin: 0.6 }),
      parts: [numPart(QB, { decimals: 0, suffix: 'm', label: '$QB =$' })],
      hints: [
        `In $\\triangle PQB$, the angle at $Q$ is the supplement of $${deg(beta)}$, and the angles add to $180^\\circ$.`,
        `Then use the sine law with the pair $PQ = ${dist}$ m and the angle at $B$ opposite it.`,
      ],
      solution: [
        `$\\angle PQB = 180^\\circ - ${deg(beta)} = ${deg(180 - beta)}$`,
        `$\\angle PBQ = 180^\\circ - ${deg(alpha)} - ${deg(180 - beta)} = ${deg(beta - alpha)}$`,
        `$\\dfrac{QB}{\\sin ${deg(alpha)}} = \\dfrac{${dist}}{\\sin ${deg(beta - alpha)}}$`,
        `$QB = \\dfrac{${dist}\\sin ${deg(alpha)}}{\\sin ${deg(beta - alpha)}} \\approx ${fmtFixed(QB, 0)}\\text{ m}$`,
      ],
      calculator: true,
    };
  }
  // Two angles at the ends of a known baseline; find a distance to the third point.
  const data = retry(
    () => {
      const a = rng.int(35, 78);
      const b = rng.int(35, 78);
      const base = kind === 'truss' ? rng.float(6, 14, 1) : kind === 'river' ? rng.int(40, 180) : rng.float(8, 30, 1);
      return { a, b, base };
    },
    ({ a, b, base }) => a !== b && a + b < 150 && safeRound((base * sinD(b)) / sinD(a + b)) && safeRound((base * sinD(a)) / sinD(a + b)),
  );
  const { a, b, base } = data;
  const C = 180 - a - b;
  const u = kind === 'river' ? 'm' : kind === 'truss' ? 'm' : 'km';
  const names: Tri['n'] = kind === 'towers' ? ['A', 'B', 'F'] : kind === 'river' ? ['P', 'Q', 'T'] : ['L', 'R', 'K'];
  const t = triAAS(names, [a, b, C], 2, base);
  // Ask for the distance from the second point (opposite the first angle) or from the first.
  const ask = rng.pick([0, 1]);
  const other = 1 - ask;
  const value = t.s[ask];
  const sides: Array<string | null> = [null, null, `${fmt(base)} ${u}`];
  sides[ask] = '?';
  const fig = triangleFigure(t, { sides, angles: [`${a}°`, `${b}°`, null] }, { base: 2 });
  const from = names[other];
  const askSeg = `${names[other]}${names[2]}`;
  const prompt =
    kind === 'towers'
      ? `Two fire lookout towers, $A$ and $B$, are ${fmt(base)} km apart. A ranger in tower $A$ sees smoke at $F$ and measures $\\angle FAB = ${deg(a)}$. A ranger in tower $B$ measures $\\angle FBA = ${deg(b)}$. How far is the fire from tower $${from}$, ${tenthOf(u)}?`
      : kind === 'river'
        ? `To find the distance across a river, a surveyor marks points $P$ and $Q$, ${base} m apart, on one bank. A tree $T$ stands on the other bank. She measures $\\angle TPQ = ${deg(a)}$ and $\\angle TQP = ${deg(b)}$. Determine the distance from $${from}$ to the tree, ${tenthOf(u)}.`
        : `A roof truss is a triangle $LRK$ with a horizontal span $LR = ${fmt(base)}$ m. The rafters meet the span at $\\angle L = ${deg(a)}$ and $\\angle R = ${deg(b)}$, and meet each other at the peak $K$. Determine the length of the rafter $${askSeg}$, ${tenthOf(u)}.`;
  return {
    prompt,
    figure: fig,
    parts: [numPart(value, { decimals: 1, suffix: u, label: `$${askSeg} =$` })],
    hints: [
      `The known side is $${names[0]}${names[1]}$, but you know neither angle opposite it yet. Find $\\angle ${names[2]}$ first.`,
      `$${askSeg}$ is opposite $\\angle ${names[ask]}$. Use $\\dfrac{${askSeg}}{\\sin ${names[ask]}} = \\dfrac{${names[0]}${names[1]}}{\\sin ${names[2]}}$.`,
    ],
    solution: [
      `$\\angle ${names[2]} = 180^\\circ - ${deg(a)} - ${deg(b)} = ${deg(C)}$`,
      `$\\dfrac{${askSeg}}{\\sin ${deg(t.ang[ask])}} = \\dfrac{${fmt(base)}}{\\sin ${deg(C)}}$`,
      `$${askSeg} = \\dfrac{${fmt(base)}\\sin ${deg(t.ang[ask])}}{\\sin ${deg(C)}} \\approx ${fmtFixed(value, 1)}\\text{ ${u}}$`,
    ],
    calculator: true,
  };
}

const sineLawAngle = skill({
  id: 'm201-sine-law-angle',
  name: 'Sine law: finding an angle',
  description: 'Use the sine law to determine an unknown angle of an oblique triangle, including an obtuse angle.',
  outcomes: ['T3'],
  lessonId: 'm201-2-3',
  calculator: true,
  gen(rng, d) {
    const u = rng.pick(['cm', 'm', 'mm']);
    const names = rng.shuffle(rng.pick(TRI_NAMES)) as Tri['n'];
    const obtuse = d === 3;
    // Known: angle at vertex 0 and sides opposite vertices 0 and 1; unknown: angle at 1 (then 2).
    const data = retry(
      () => {
        const A0 = obtuse ? rng.int(22, 48) : rng.int(35, 118);
        const A1true = obtuse ? rng.int(98, Math.min(140, 160 - A0)) : rng.int(22, Math.min(A0 - 6, 150 - A0));
        const s0 = niceSide(rng, 8, 30, d >= 2 && rng.chance(0.5));
        const s1 = r1((s0 * sinD(A1true)) / sinD(A0));
        const sB = (s1 * sinD(A0)) / s0;
        const B = obtuse ? 180 - asinD(sB) : asinD(sB);
        return { A0, s0, s1, B, C: 180 - A0 - B, sB };
      },
      (v) => v.sB < 0.995 && v.C > 12 && safeRound(v.B) && safeRound(v.C) && v.s1 >= 3,
      300,
    );
    const { A0, s0, s1, B, C } = data;
    const t: Tri = { n: names, ang: [A0, B, C], s: [s0, s1, (s0 * sinD(C)) / sinD(A0)] };
    const askThird = d === 2 || (d === 3 && rng.chance(0.5));
    const target = askThird ? C : B;
    const ti = askThird ? 2 : 1;
    const angles: Array<string | null> = [`${A0}°`, null, null];
    angles[ti] = '?';
    const fig = triangleFigure(t, { sides: [`${fmt(s0)} ${u}`, `${fmt(s1)} ${u}`, null], angles }, { base: randomBase(rng), mirror: rng.chance(0.5) });
    const ratio = `\\dfrac{${fmt(s1)}\\sin ${deg(A0)}}{${fmt(s0)}}`;
    const Bacute = asinD((s1 * sinD(A0)) / s0);
    const steps = [
      `$\\dfrac{\\sin ${names[1]}}{${side(t, 1)}} = \\dfrac{\\sin ${names[0]}}{${side(t, 0)}}$, so $\\sin ${names[1]} = ${ratio} \\approx ${fmt(data.sB, 4)}$`,
      obtuse
        ? `$\\sin^{-1}(${fmt(data.sB, 4)}) \\approx ${fmt(Bacute, 2)}^\\circ$, but $${ang(t, 1)}$ is obtuse, so $${ang(t, 1)} = 180^\\circ - ${fmt(Bacute, 2)}^\\circ \\approx ${fmtFixed(B, 1)}^\\circ$`
        : `$${ang(t, 1)} = \\sin^{-1}(${fmt(data.sB, 4)}) \\approx ${fmtFixed(B, 1)}^\\circ$ (it is acute because $${side(t, 1)} < ${side(t, 0)}$, so $${ang(t, 1)} < ${ang(t, 0)}$)`,
      ...(askThird ? [`$${ang(t, 2)} = 180^\\circ - ${deg(A0)} - ${fmt(B, 2)}^\\circ \\approx ${fmtFixed(C, 1)}^\\circ$`] : []),
    ];
    return {
      prompt: `In $\\triangle ${triName(names)}$, $${ang(t, 0)} = ${deg(A0)}$, $${side(t, 0)} = ${len(s0, u)}$ and $${side(t, 1)} = ${len(s1, u)}$${obtuse ? `, and $${ang(t, 1)}$ is obtuse` : ''}. Determine the measure of $${ang(t, ti)}$, ${TENTH_DEG}.`,
      figure: fig,
      parts: [numPart(target, { decimals: 1, suffix: '°', label: `$${ang(t, ti)} =$` })],
      hints: [
        `Use the sine law with the angles in the numerators: $\\dfrac{\\sin ${names[1]}}{${side(t, 1)}} = \\dfrac{\\sin ${names[0]}}{${side(t, 0)}}$.`,
        obtuse
          ? `$\\sin^{-1}$ always gives an acute angle. The obtuse angle with the same sine is $180^\\circ$ minus that angle.`
          : askThird
            ? `After finding $${ang(t, 1)}$, use the angle sum of $180^\\circ$.`
            : `Solve for $\\sin ${names[1]}$, then use $\\sin^{-1}$.`,
      ],
      solution: steps,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.4 — The ambiguous case
// ---------------------------------------------------------------------------

const COUNT_CHOICES = ['no triangle', 'exactly one triangle', 'two triangles'];

const ambiguousCount = skill({
  id: 'm201-ambiguous-count',
  name: 'How many triangles? (SSA)',
  description: 'Decide whether an angle, its opposite side and an adjacent side determine no triangle, one triangle or two triangles.',
  outcomes: ['T3'],
  lessonId: 'm201-2-4',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    const u = rng.pick(['cm', 'm']);
    // Known: angle at vertex 0 (A), side a opposite it, side b adjacent (opposite vertex 1).
    const names = (d === 1 ? ['A', 'B', 'C'] : rng.shuffle(rng.pick(TRI_NAMES))) as Tri['n'];
    let A: number;
    let a: number;
    let b: number;
    let h: number;
    let count: 0 | 1 | 2;
    let exactH = false;
    if (d === 1) {
      A = 30;
      b = 2 * rng.int(4, 12);
      h = b / 2;
      exactH = true;
      const c = rng.pick(['none', 'right', 'two', 'two', 'one'] as const);
      a = c === 'none' ? rng.int(2, h - 1) : c === 'right' ? h : c === 'two' ? rng.int(h + 1, b - 1) : rng.int(b, b + 9);
      count = c === 'none' ? 0 : c === 'two' ? 2 : 1;
    } else if (d === 3 && rng.chance(0.4)) {
      A = rng.int(100, 140);
      b = niceSide(rng, 6, 25, true);
      const one = rng.chance(0.5);
      a = r1(b * (one ? rng.float(1.1, 1.7, 2) : rng.float(0.45, 0.9, 2)));
      h = b * sinD(A);
      count = one ? 1 : 0;
    } else {
      const c = rng.pick(['none', 'two', 'two', 'one'] as const);
      const g = retry(
        () => {
          const A = rng.int(22, 68);
          const b = niceSide(rng, 8, 30, rng.chance(0.5));
          const h = b * sinD(A);
          const a = r1(c === 'none' ? h * rng.float(0.55, 0.92, 2) : c === 'two' ? h + (b - h) * rng.float(0.15, 0.85, 2) : b * rng.float(1.04, 1.6, 2));
          return { A, b, h, a };
        },
        (v) => (c === 'none' ? v.a < v.h * 0.97 : c === 'two' ? v.a > v.h * 1.03 && v.a < v.b * 0.97 : v.a > v.b) && v.a >= 2,
      );
      ({ A, b, h, a } = g);
      count = c === 'none' ? 0 : c === 'two' ? 2 : 1;
    }
    const sa = lo(names[0]);
    const sb = lo(names[1]);
    const acute = A < 90;
    const hTex = exactH ? `${fmt(h)}` : `${fmt(h, 2)}`;
    const steps = acute
      ? [
          `$${'\\angle ' + names[0]}$ is acute, so compare $${sa}$ with the height $h = ${sb}\\sin ${names[0]}$ and with $${sb}$.`,
          `$h = ${fmt(b)}\\sin ${deg(A)} ${exactH ? '=' : '\\approx'} ${hTex}$`,
          count === 0
            ? `$${sa} = ${fmt(a)} < h$: side $${sa}$ is too short to reach the base. **No triangle.**`
            : count === 2
              ? `$h < ${sa} < ${sb}$ $(${hTex} < ${fmt(a)} < ${fmt(b)})$: side $${sa}$ can swing to meet the base in two places. **Two triangles.**`
              : a === h
                ? `$${sa} = h$: side $${sa}$ just touches the base, forming a right triangle. **Exactly one triangle.**`
                : `$${sa} = ${fmt(a)} \\ge ${sb} = ${fmt(b)}$: side $${sa}$ meets the base on only one side of $${names[0]}$. **Exactly one triangle.**`,
        ]
      : [
          `$${'\\angle ' + names[0]}$ is obtuse, so it must be the largest angle and $${sa}$ must be the longest side.`,
          count === 1 ? `$${sa} = ${fmt(a)} > ${sb} = ${fmt(b)}$. **Exactly one triangle.**` : `$${sa} = ${fmt(a)} \\le ${sb} = ${fmt(b)}$, so side $${sa}$ cannot be the longest side. **No triangle.**`,
        ];
    return {
      prompt: `In $\\triangle ${triName(names)}$, $\\angle ${names[0]} = ${deg(A)}$, $${sa} = ${len(a, u)}$ and $${sb} = ${len(b, u)}$. How many triangles are possible?`,
      parts: [{ answer: fixedChoice(COUNT_CHOICES, count) }],
      hints: [
        acute ? `The given angle is acute. Find the height $h = ${sb}\\sin ${names[0]}$ from the vertex between the two given sides to the base.` : 'The given angle is obtuse. In a triangle, the side opposite the obtuse angle is the longest side.',
        acute ? `If $${sa} < h$: none. If $${sa} = h$ or $${sa} \\ge ${sb}$: one. If $h < ${sa} < ${sb}$: two.` : `One triangle if $${sa} > ${sb}$; none if $${sa} \\le ${sb}$.`,
      ],
      solution: steps,
    };
  },
});

/** Data for a two-triangle SSA case: angle A (vertex 0), side a opposite, side b adjacent (opposite vertex 1). */
function twoTriangles(rng: Rng, opts: { Amin?: number; Amax?: number; bMin?: number; bMax?: number; dec?: boolean } = {}) {
  return retry(
    () => {
      const A = rng.int(opts.Amin ?? 24, opts.Amax ?? 62);
      const b = niceSide(rng, opts.bMin ?? 8, opts.bMax ?? 30, opts.dec ?? rng.chance(0.4));
      const h = b * sinD(A);
      const a = r1(h + (b - h) * rng.float(0.2, 0.8, 2));
      const B1 = asinD((b * sinD(A)) / a);
      const B2 = 180 - B1;
      const C1 = 180 - A - B1;
      const C2 = 180 - A - B2;
      const c1 = (a * sinD(C1)) / sinD(A);
      const c2 = (a * sinD(C2)) / sinD(A);
      return { A, a, b, h, B1, B2, C1, C2, c1, c2 };
    },
    (v) => v.a > v.h * 1.04 && v.a < v.b * 0.96 && v.C2 > 10 && [v.B1, v.B2, v.C1, v.C2, v.c1, v.c2].every((x) => safeRound(x)),
    300,
  );
}

const ambiguousSolve = skill({
  id: 'm201-ambiguous-solve',
  name: 'Solving the ambiguous case',
  description: 'Determine both possible measures of an angle, or both possible lengths of a side, when SSA information gives two triangles.',
  outcomes: ['T3'],
  lessonId: 'm201-2-4',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return ambiguousContext(rng);
    const u = rng.pick(['cm', 'm']);
    const names = (d === 1 && rng.chance(0.5) ? ['A', 'B', 'C'] : rng.shuffle(rng.pick(TRI_NAMES))) as Tri['n'];
    const g = twoTriangles(rng, { dec: d === 2 && rng.chance(0.5) });
    const [nA, nB, nC] = names;
    const sa = lo(nA);
    const sb = lo(nB);
    const sc = lo(nC);
    const what = d === 1 ? 'B' : rng.pick(['C', 'c'] as const);
    const fig = ambiguousFigure({ A: g.A, a: g.a, b: g.b, names, angleLabel: `${g.A}°`, aLabel: `${fmt(g.a)} ${u}`, bLabel: `${fmt(g.b)} ${u}` });
    const base = [
      `$\\dfrac{\\sin ${nB}}{${sb}} = \\dfrac{\\sin ${nA}}{${sa}}$, so $\\sin ${nB} = \\dfrac{${fmt(g.b)}\\sin ${deg(g.A)}}{${fmt(g.a)}} \\approx ${fmt((g.b * sinD(g.A)) / g.a, 4)}$`,
      `$\\angle ${nB}_1 = \\sin^{-1}(${fmt((g.b * sinD(g.A)) / g.a, 4)}) \\approx ${fmtFixed(g.B1, 1)}^\\circ$ and $\\angle ${nB}_2 = 180^\\circ - ${fmt(g.B1, 2)}^\\circ \\approx ${fmtFixed(g.B2, 1)}^\\circ$`,
      `Both work, because $${deg(g.A)} + ${fmtFixed(g.B2, 1)}^\\circ < 180^\\circ$.`,
    ];
    const Csteps = [
      `$\\angle ${nC}_1 = 180^\\circ - ${deg(g.A)} - ${fmt(g.B1, 2)}^\\circ \\approx ${fmtFixed(g.C1, 1)}^\\circ$`,
      `$\\angle ${nC}_2 = 180^\\circ - ${deg(g.A)} - ${fmt(g.B2, 2)}^\\circ \\approx ${fmtFixed(g.C2, 1)}^\\circ$`,
    ];
    const csteps = [
      `$${sc}_1 = \\dfrac{${fmt(g.a)}\\sin ${fmt(g.C1, 2)}^\\circ}{\\sin ${deg(g.A)}} \\approx ${fmtFixed(g.c1, 1)}\\text{ ${u}}$`,
      `$${sc}_2 = \\dfrac{${fmt(g.a)}\\sin ${fmt(g.C2, 2)}^\\circ}{\\sin ${deg(g.A)}} \\approx ${fmtFixed(g.c2, 1)}\\text{ ${u}}$`,
    ];
    const values = what === 'B' ? [g.B1, g.B2] : what === 'C' ? [g.C1, g.C2] : [g.c1, g.c2];
    const target = what === 'B' ? `both possible measures of $\\angle ${nB}$` : what === 'C' ? `both possible measures of $\\angle ${nC}$` : `both possible lengths of side $${sc}$`;
    const rounding = what === 'c' ? tenthOf(u) : TENTH_DEG;
    return {
      prompt: `In $\\triangle ${triName(names)}$, $\\angle ${nA} = ${deg(g.A)}$, $${sa} = ${len(g.a, u)}$ and $${sb} = ${len(g.b, u)}$. This information gives two triangles. Determine ${target}, ${rounding}. Separate the answers with a comma.`,
      figure: fig,
      parts: [part({ kind: 'numbers', values, decimals: 1 }, { label: what === 'c' ? `$${sc} =$` : `$\\angle ${what === 'B' ? nB : nC} =$`, suffix: what === 'c' ? u : '°' })],
      hints: [
        `Use the sine law to find $\\sin ${nB}$. The acute angle from $\\sin^{-1}$ is one answer; its supplement $180^\\circ - \\angle ${nB}$ is the other.`,
        what === 'B' ? 'Check that the obtuse angle still leaves room in the triangle: the angle sum must stay below $180^\\circ$.' : what === 'C' ? `For each value of $\\angle ${nB}$, find $\\angle ${nC} = 180^\\circ - \\angle ${nA} - \\angle ${nB}$.` : `For each triangle, find $\\angle ${nC}$, then use the sine law again for $${sc}$.`,
      ],
      solution: [...base, ...(what === 'C' ? Csteps : what === 'c' ? [...Csteps, ...csteps] : [])],
      answerDisplay: [...values].sort((x, y) => x - y).map((v) => `$${fmtFixed(v, 1)}${what === 'c' ? `\\text{ ${u}}` : '^\\circ'}$`).join(' and '),
    };
  },
});

function ambiguousContext(rng: Rng): GenOutput {
  const kind = rng.pick(['tower', 'garden', 'brace'] as const);
  if (kind === 'tower') {
    const g = twoTriangles(rng, { Amin: 18, Amax: 42, bMin: 15, bMax: 40, dec: false });
    const town = rng.pick(TOWNS);
    return {
      prompt: `A straight highway leaves ${town}. A cell tower stands ${g.b} km from ${town}, and the line from ${town} to the tower makes an angle of $${deg(g.A)}$ with the highway. The tower's signal reaches ${fmt(g.a)} km in every direction. Along the highway, at what two distances from ${town} is a car exactly ${fmt(g.a)} km from the tower? Give both distances ${tenthOf('km')}, separated by a comma.`,
      figure: ambiguousFigure({ A: g.A, a: g.a, b: g.b, names: ['H', 'X', 'T'], angleLabel: `${g.A}°`, aLabel: `${fmt(g.a)} km`, bLabel: `${g.b} km`, swing: true, caption: `${town} at H, tower at T` }),
      parts: [part({ kind: 'numbers', values: [g.c1, g.c2], decimals: 1 }, { label: 'Distances', suffix: 'km' })],
      hints: [
        'Draw the triangle: town, tower and car. You know the angle at the town, the side opposite it (the signal range) and the side from the town to the tower.',
        'Find the angle at the car with the sine law — there are two (acute and obtuse). For each, find the angle at the tower, then the distance along the highway.',
      ],
      solution: [
        `Let the town be $H$, the tower $T$ and the car $X$. In $\\triangle HXT$: $\\angle H = ${deg(g.A)}$, $TX = ${fmt(g.a)}$ km (opposite $\\angle H$), $HT = ${g.b}$ km.`,
        `$\\sin X = \\dfrac{${g.b}\\sin ${deg(g.A)}}{${fmt(g.a)}} \\approx ${fmt((g.b * sinD(g.A)) / g.a, 4)}$, so $\\angle X \\approx ${fmt(g.B1, 2)}^\\circ$ or $\\angle X \\approx ${fmt(g.B2, 2)}^\\circ$`,
        `$\\angle T \\approx ${fmt(g.C1, 2)}^\\circ$ or $\\angle T \\approx ${fmt(g.C2, 2)}^\\circ$`,
        `$HX = \\dfrac{${fmt(g.a)}\\sin T}{\\sin ${deg(g.A)}}$: $HX \\approx ${fmtFixed(g.c1, 1)}$ km or $HX \\approx ${fmtFixed(g.c2, 1)}$ km`,
        `The car is ${fmt(g.a)} km from the tower when it is about ${fmtFixed(g.c2, 1)} km and ${fmtFixed(g.c1, 1)} km from ${town}.`,
      ],
      answerDisplay: `$${fmtFixed(g.c2, 1)}$ km and $${fmtFixed(g.c1, 1)}$ km`,
      calculator: true,
    };
  }
  const g = twoTriangles(rng, { Amin: 28, Amax: 60, bMin: 5, bMax: 14, dec: true });
  const who = rng.pick(PEOPLE);
  if (kind === 'garden') {
    return {
      prompt: `${who} is laying out a triangular garden bed $PQR$. Edge $PR$ is ${fmt(g.b)} m long and $\\angle P = ${deg(g.A)}$. The edge opposite $\\angle P$, $QR$, must be ${fmt(g.a)} m long. Determine both possible lengths of edge $PQ$, ${tenthOf('m')}, separated by a comma.`,
      figure: ambiguousFigure({ A: g.A, a: g.a, b: g.b, names: ['P', 'Q', 'R'], angleLabel: `${g.A}°`, aLabel: `${fmt(g.a)} m`, bLabel: `${fmt(g.b)} m`, swing: true }),
      parts: [part({ kind: 'numbers', values: [g.c1, g.c2], decimals: 1 }, { label: '$PQ =$', suffix: 'm' })],
      hints: ['Use the sine law to find $\\angle Q$: there is an acute value and an obtuse value.', 'For each value, find $\\angle R$ from the angle sum, then use the sine law to find $PQ$ (opposite $\\angle R$).'],
      solution: [
        `$\\sin Q = \\dfrac{${fmt(g.b)}\\sin ${deg(g.A)}}{${fmt(g.a)}} \\approx ${fmt((g.b * sinD(g.A)) / g.a, 4)}$, so $\\angle Q \\approx ${fmt(g.B1, 2)}^\\circ$ or $${fmt(g.B2, 2)}^\\circ$`,
        `$\\angle R \\approx ${fmt(g.C1, 2)}^\\circ$ or $${fmt(g.C2, 2)}^\\circ$`,
        `$PQ = \\dfrac{${fmt(g.a)}\\sin R}{\\sin ${deg(g.A)}}$: $PQ \\approx ${fmtFixed(g.c1, 1)}\\text{ m}$ or $PQ \\approx ${fmtFixed(g.c2, 1)}\\text{ m}$`,
      ],
      answerDisplay: `$${fmtFixed(g.c2, 1)}$ m and $${fmtFixed(g.c1, 1)}$ m`,
      calculator: true,
    };
  }
  return {
    prompt: `${who} is building a triangular shelf bracket $ABC$ from two pieces of wood. Piece $AC$ is ${fmt(g.b)} cm long and must make an angle of $${deg(g.A)}$ with the wall line $AB$ at $A$. Piece $BC$, opposite that angle, is ${fmt(g.a)} cm long. Determine both possible measures of $\\angle B$, where piece $BC$ meets the wall line, ${TENTH_DEG}. Separate the answers with a comma.`,
    figure: ambiguousFigure({ A: g.A, a: g.a, b: g.b, names: ['A', 'B', 'C'], angleLabel: `${g.A}°`, aLabel: `${fmt(g.a)} cm`, bLabel: `${fmt(g.b)} cm`, swing: true }),
    parts: [part({ kind: 'numbers', values: [g.B1, g.B2], decimals: 1 }, { label: '$\\angle B =$', suffix: '°' })],
    hints: [`Compare $BC$ with the height $h = ${fmt(g.b)}\\sin ${deg(g.A)}$ and with $AC$ to see why there are two triangles.`, 'Use the sine law for $\\sin B$; the two angles are $\\sin^{-1}$ of that value and its supplement.'],
    solution: [
      `$h = ${fmt(g.b)}\\sin ${deg(g.A)} \\approx ${fmt(g.h, 2)}$, and $${fmt(g.h, 2)} < ${fmt(g.a)} < ${fmt(g.b)}$, so there are two triangles.`,
      `$\\sin B = \\dfrac{${fmt(g.b)}\\sin ${deg(g.A)}}{${fmt(g.a)}} \\approx ${fmt((g.b * sinD(g.A)) / g.a, 4)}$`,
      `$\\angle B \\approx ${fmtFixed(g.B1, 1)}^\\circ$ or $\\angle B \\approx 180^\\circ - ${fmt(g.B1, 2)}^\\circ \\approx ${fmtFixed(g.B2, 1)}^\\circ$`,
    ],
    answerDisplay: `$${fmtFixed(g.B1, 1)}^\\circ$ and $${fmtFixed(g.B2, 1)}^\\circ$`,
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// Lesson 2.5 — The cosine law
// ---------------------------------------------------------------------------

/** A side named by its endpoints, e.g. KR for the side opposite L. */
const segName = (t: Tri, i: number) => [t.n[(i + 1) % 3], t.n[(i + 2) % 3]].sort().join('');

/** Cosine-law steps for side 0 of t, from sides 1, 2 and the angle at vertex 0 (sides named by letter or by endpoints). */
function cosSideSteps(t: Tri, u: string, seg = false, dp = 1): string[] {
  const [s0, s1, s2] = t.s;
  const A = t.ang[0];
  const sq = s0 * s0;
  const nm = (i: number) => (seg ? segName(t, i) : side(t, i));
  const two = seg ? `2(${nm(1)})(${nm(2)})` : `2${nm(1)}${nm(2)}`;
  return [
    `$${nm(0)}^2 = ${nm(1)}^2 + ${nm(2)}^2 - ${two}\\cos ${t.n[0]}$`,
    `$${nm(0)}^2 = ${fmt(s1)}^2 + ${fmt(s2)}^2 - 2(${fmt(s1)})(${fmt(s2)})\\cos ${deg(A)} \\approx ${fmt(sq, 2)}$${A > 90 ? ` (since $\\cos ${deg(A)} < 0$, the last term adds)` : ''}`,
    `$${nm(0)} \\approx \\sqrt{${fmt(sq, 2)}} \\approx ${fmtFixed(s0, dp)}\\text{ ${u}}$`,
  ];
}
/** Cosine-law steps for the angle at vertex 0 of t from three sides. */
function cosAngleSteps(t: Tri, seg = false): string[] {
  const [s0, s1, s2] = t.s;
  const num = s1 * s1 + s2 * s2 - s0 * s0;
  const den = 2 * s1 * s2;
  const nm = (i: number) => (seg ? segName(t, i) : side(t, i));
  const two = seg ? `2(${nm(1)})(${nm(2)})` : `2${nm(1)}${nm(2)}`;
  return [
    `$\\cos ${t.n[0]} = \\dfrac{${nm(1)}^2 + ${nm(2)}^2 - ${nm(0)}^2}{${two}} = \\dfrac{${fmt(s1)}^2 + ${fmt(s2)}^2 - ${fmt(s0)}^2}{2(${fmt(s1)})(${fmt(s2)})} = \\dfrac{${fmt(num, 2)}}{${fmt(den, 2)}} \\approx ${fmt(num / den, 4)}$`,
    `$\\angle ${t.n[0]} = \\cos^{-1}(${fmt(num / den, 4)}) \\approx ${fmtFixed(t.ang[0], 1)}^\\circ$${num < 0 ? ' (a negative cosine means an obtuse angle)' : ''}`,
  ];
}

const cosineLawSide = skill({
  id: 'm201-cosine-law-side',
  name: 'Cosine law: finding a side',
  description: 'Use the cosine law to determine the third side of a triangle when two sides and the contained angle are known.',
  outcomes: ['T3'],
  lessonId: 'm201-2-5',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return cosineSideContext(rng);
    const u = rng.pick(['cm', 'm', 'km']);
    const names = (d === 1 && rng.chance(0.4) ? ['A', 'B', 'C'] : rng.shuffle(rng.pick(TRI_NAMES))) as Tri['n'];
    const t = retry(
      () => {
        const A = d === 1 ? rng.intExcept(35, 85, [60]) : rng.chance(0.6) ? rng.int(95, 150) : rng.int(20, 85);
        const dec = d === 2 && rng.chance(0.5);
        const s1 = niceSide(rng, 5, 30, dec);
        const s2 = niceSide(rng, 5, 30, dec);
        return triSAS(names, A, s1, s2);
      },
      (x) => x.s[1] !== x.s[2] && x.ang[1] > 12 && x.ang[2] > 12 && safeRound(x.s[0]),
    );
    const fig = triangleFigure(t, { sides: ['?', `${fmt(t.s[1])} ${u}`, `${fmt(t.s[2])} ${u}`], angles: [`${t.ang[0]}°`, null, null] }, { base: randomBase(rng), mirror: rng.chance(0.5) });
    return {
      prompt: `In $\\triangle ${triName(names)}$, $${side(t, 1)} = ${len(t.s[1], u)}$, $${side(t, 2)} = ${len(t.s[2], u)}$ and $${ang(t, 0)} = ${deg(t.ang[0])}$. Determine the length of side $${side(t, 0)}$, ${tenthOf(u)}.`,
      figure: fig,
      parts: [numPart(t.s[0], { decimals: 1, suffix: u, label: `$${side(t, 0)} =$` })],
      hints: [
        `You know two sides and the angle between them, so the sine law cannot start: there is no complete side–angle pair. Use the cosine law.`,
        `$${side(t, 0)}^2 = ${side(t, 1)}^2 + ${side(t, 2)}^2 - 2${side(t, 1)}${side(t, 2)}\\cos ${t.n[0]}$ — the angle is the one between the two known sides.`,
      ],
      solution: cosSideSteps(t, u),
    };
  },
});

function cosineSideContext(rng: Rng): GenOutput {
  const kind = rng.pick(['planes', 'parallelogram', 'lake', 'boats'] as const);
  if (kind === 'parallelogram') {
    const data = retry(
      () => {
        const p = rng.int(5, 16);
        const q = rng.int(6, 20);
        const A = rng.int(35, 80);
        const longer = rng.chance(0.5);
        const included = longer ? 180 - A : A;
        const diag = Math.sqrt(p * p + q * q - 2 * p * q * cosD(included));
        return { p, q, A, longer, included, diag };
      },
      (v) => v.p !== v.q && safeRound(v.diag),
    );
    const { p, q, A, longer, included, diag } = data;
    const s = new Sketch();
    const k = 6 / (q + p * cosD(A));
    const P0: P = [0, 0];
    const P1: P = [q * k, 0];
    const P3: P = [p * k * cosD(A), p * k * sinD(A)];
    const P2: P = [P1[0] + P3[0], P3[1]];
    s.seg(P0, P1).seg(P1, P2).seg(P2, P3).seg(P3, P0);
    s.seg(longer ? P1 : P0, longer ? P3 : P2, { color: 'accent', dashed: true });
    s.arc(P0, 0.6, 0, A);
    s.angleLabel(P0, 0, A, `${A}°`, 34);
    s.sideLabel([P1[0] / 2, 0], -90, `${q} cm`).sideLabel([P3[0] / 2, P3[1] / 2], A + 90, `${p} cm`);
    return {
      prompt: `A parallelogram has sides of ${p} cm and ${q} cm, and one interior angle of $${deg(A)}$. Determine the length of the ${longer ? 'longer' : 'shorter'} diagonal, ${tenthOf('cm')}.`,
      figure: s.build({ margin: 0.6 }),
      parts: [numPart(diag, { decimals: 1, suffix: 'cm', label: 'Diagonal' })],
      hints: [
        `Consecutive angles of a parallelogram add to $180^\\circ$, so the angles are $${deg(A)}$ and $${deg(180 - A)}$. The ${longer ? 'longer' : 'shorter'} diagonal is opposite the ${longer ? 'obtuse' : 'acute'} angle.`,
        'Each diagonal cuts the parallelogram into two triangles with sides $' + p + '$ and $' + q + '$ around one of the angles. Use the cosine law.',
      ],
      solution: [
        `The ${longer ? 'longer' : 'shorter'} diagonal $d$ is opposite the $${deg(included)}$ angle${longer ? ` ($180^\\circ - ${deg(A)}$)` : ''}.`,
        `$d^2 = ${p}^2 + ${q}^2 - 2(${p})(${q})\\cos ${deg(included)} \\approx ${fmt(diag * diag, 2)}$`,
        `$d \\approx ${fmtFixed(diag, 1)}\\text{ cm}$`,
      ],
      calculator: true,
    };
  }
  if (kind === 'planes') {
    const data = retry(
      () => {
        const v1 = rng.int(45, 80) * 10;
        const v2 = rng.int(45, 80) * 10;
        const time = rng.pick([1.5, 2, 2.5, 0.5, 3]);
        const b1 = rng.int(10, 60);
        const b2 = rng.int(10, 60);
        const sameNorth = rng.chance(0.5);
        const angle = sameNorth ? b1 + b2 : 180 - b1 - b2;
        const d1 = v1 * time;
        const d2 = v2 * time;
        const dist = Math.sqrt(d1 * d1 + d2 * d2 - 2 * d1 * d2 * cosD(angle));
        return { v1, v2, time, b1, b2, sameNorth, angle, d1, d2, dist };
      },
      (v) => v.angle !== 90 && v.angle > 25 && v.angle < 160 && safeRound(v.dist, 0),
    );
    const { v1, v2, time, b1, b2, sameNorth, angle, d1, d2, dist } = data;
    const dir2 = sameNorth ? `$${deg(b2)}$ west of north` : `$${deg(b2)}$ east of south`;
    return {
      prompt: `Two planes leave a city airport at the same time. One flies at ${v1} km/h on a heading $${deg(b1)}$ east of north. The other flies at ${v2} km/h on a heading ${dir2}. Assuming straight, level flight at constant speed, how far apart are the planes after ${fmt(time)} h, to the nearest kilometre?`,
      parts: [numPart(dist, { decimals: 0, suffix: 'km', label: 'Distance' })],
      hints: [
        `Find each distance with distance = speed × time. Then sketch both headings from north to find the angle between the paths.`,
        sameNorth ? `Both headings are measured from north, on opposite sides, so the angle between them is $${deg(b1)} + ${deg(b2)}$.` : `One heading is measured from north and the other from south, so the angle between them is $180^\\circ - ${deg(b1)} - ${deg(b2)}$.`,
      ],
      solution: [
        `Distances: $${v1} \\times ${fmt(time)} = ${fmt(d1)}$ km and $${v2} \\times ${fmt(time)} = ${fmt(d2)}$ km.`,
        `Angle between the paths: $${sameNorth ? `${deg(b1)} + ${deg(b2)}` : `180^\\circ - ${deg(b1)} - ${deg(b2)}`} = ${deg(angle)}$`,
        `$d^2 = ${fmt(d1)}^2 + ${fmt(d2)}^2 - 2(${fmt(d1)})(${fmt(d2)})\\cos ${deg(angle)} \\approx ${fmt(dist * dist, 1)}$`,
        `$d \\approx ${fmtFixed(dist, 0)}\\text{ km}$`,
      ],
      calculator: true,
    };
  }
  const lake = rng.pick(LAKES);
  const who = rng.pick(PEOPLE);
  const t = retry(
    () => (kind === 'lake' ? triSAS(['C', 'A', 'B'], rng.int(48, 125), rng.int(18, 60) * 10, rng.int(18, 60) * 10) : triSAS(['D', 'X', 'Y'], rng.int(35, 140), rng.float(2, 9, 1), rng.float(2, 9, 1))),
    (x) => x.s[1] !== x.s[2] && x.ang[1] > 15 && x.ang[2] > 15 && safeRound(x.s[0], kind === 'lake' ? 0 : 1),
  );
  const u = kind === 'lake' ? 'm' : 'km';
  const dp = kind === 'lake' ? 0 : 1;
  const fig = triangleFigure(t, { sides: ['?', `${fmt(t.s[1])} ${u}`, `${fmt(t.s[2])} ${u}`], angles: [`${t.ang[0]}°`, null, null] }, { base: 0 });
  const prompt =
    kind === 'lake'
      ? `${who} wants the distance $AB$ across ${lake}, between two docks $A$ and $B$. From a point $C$ on shore, the distance to $A$ is ${t.s[2]} m, the distance to $B$ is ${t.s[1]} m, and $\\angle ACB = ${deg(t.ang[0])}$. Determine $AB$, to the nearest metre.`
      : `Two boats leave a dock $D$ on ${lake} at the same time. One travels ${fmt(t.s[2])} km to buoy $X$ and the other travels ${fmt(t.s[1])} km to buoy $Y$. The angle between their straight-line paths is $${deg(t.ang[0])}$. How far apart are the buoys, ${tenthOf('km')}?`;
  return {
    prompt,
    figure: fig,
    parts: [numPart(t.s[0], { decimals: dp, suffix: u, label: kind === 'lake' ? '$AB =$' : '$XY =$' })],
    hints: ['Sketch the triangle. You know two sides and the angle between them.', 'Use the cosine law: the unknown side is opposite the known angle.'],
    solution: cosSideSteps(t, u, true, dp),
    calculator: true,
  };
}

const cosineLawAngle = skill({
  id: 'm201-cosine-law-angle',
  name: 'Cosine law: finding an angle',
  description: 'Use the cosine law to determine an angle of a triangle when all three sides are known.',
  outcomes: ['T3'],
  lessonId: 'm201-2-5',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return cosineAngleContext(rng);
    const u = rng.pick(['cm', 'm', 'mm']);
    const names = rng.shuffle(rng.pick(TRI_NAMES)) as Tri['n'];
    const dec = d === 2 && rng.chance(0.4);
    const raw = retry(
      () => triSSS(names, niceSide(rng, 5, 30, dec), niceSide(rng, 5, 30, dec), niceSide(rng, 5, 30, dec)),
      (x) => x.ang.every((a) => a > 15 && Math.abs(a - 90) > 1 && safeRound(a)) && new Set(x.s).size === 3,
    );
    const largest = d === 2 && rng.chance(0.5);
    const k = largest ? raw.s.indexOf(Math.max(...raw.s)) : rng.int(0, 2);
    const perm = [k, (k + 1) % 3, (k + 2) % 3];
    const t = permute(raw, perm);
    const angles: Array<string | null> = [null, null, null];
    angles[k] = '?';
    const fig = triangleFigure(raw, { sides: raw.s.map((s) => `${fmt(s)} ${u}`), angles }, { base: randomBase(rng), mirror: rng.chance(0.5) });
    return {
      prompt: largest
        ? `The sides of $\\triangle ${triName(names)}$ are ${sidesList(raw, u)}. Determine the measure of the largest angle, ${TENTH_DEG}.`
        : `In $\\triangle ${triName(names)}$, ${sidesList(raw, u)}. Determine the measure of $${ang(raw, k)}$, ${TENTH_DEG}.`,
      figure: largest ? undefined : fig,
      parts: [numPart(t.ang[0], { decimals: 1, suffix: '°', label: largest ? 'Largest angle' : `$${ang(raw, k)} =$` })],
      hints: [
        largest ? 'The largest angle is opposite the longest side.' : `With three sides known, use the cosine law solved for the cosine of the angle.`,
        `$\\cos ${t.n[0]} = \\dfrac{${side(t, 1)}^2 + ${side(t, 2)}^2 - ${side(t, 0)}^2}{2${side(t, 1)}${side(t, 2)}}$ — the side opposite the angle is the one subtracted.`,
      ],
      solution: [...(largest ? [`The longest side is $${side(t, 0)} = ${len(t.s[0], u)}$, so the largest angle is $${ang(t, 0)}$.`] : []), ...cosAngleSteps(t)],
    };
  },
});

function cosineAngleContext(rng: Rng): GenOutput {
  const kind = rng.pick(['hockey', 'soccer', 'truss', 'lot'] as const);
  if (kind === 'hockey' || kind === 'soccer') {
    const w = kind === 'hockey' ? 1.8 : 7.3;
    const data = retry(
      () => {
        const d1 = kind === 'hockey' ? rng.float(4, 12, 1) : rng.float(10, 30, 1);
        const d2 = r1(d1 + rng.float(-w * 0.75, w * 0.75, 1));
        return triSSS(['S', 'L', 'R'], w, d2, d1);
      },
      (x) => x.ang[0] > 3 && safeRound(x.ang[0]) && x.s[1] !== x.s[2] && x.ang.every((a) => a > 0),
    );
    const who = rng.pick(PEOPLE);
    const [, dR, dL] = data.s;
    return {
      prompt: `A ${kind === 'hockey' ? 'hockey net is 1.8 m wide' : 'soccer goal is 7.3 m wide'}. ${who} shoots from a point $S$ that is ${fmt(dL)} m from the left post $L$ and ${fmt(dR)} m from the right post $R$. Determine the shooting angle $\\angle LSR$, ${TENTH_DEG}.`,
      figure: triangleFigure(data, { sides: [`${w} m`, `${fmt(dR)} m`, `${fmt(dL)} m`], angles: ['?', null, null] }, { base: 0 }),
      parts: [numPart(data.ang[0], { decimals: 1, suffix: '°', label: '$\\angle LSR =$' })],
      hints: ['The three sides of $\\triangle LSR$ are known. The angle at $S$ is opposite the goal line $LR$.', '$\\cos S = \\dfrac{SL^2 + SR^2 - LR^2}{2(SL)(SR)}$'],
      solution: [
        `$\\cos S = \\dfrac{${fmt(dL)}^2 + ${fmt(dR)}^2 - ${w}^2}{2(${fmt(dL)})(${fmt(dR)})} \\approx ${fmt((dL * dL + dR * dR - w * w) / (2 * dL * dR), 5)}$`,
        `$\\angle LSR = \\cos^{-1}(${fmt((dL * dL + dR * dR - w * w) / (2 * dL * dR), 5)}) \\approx ${fmtFixed(data.ang[0], 1)}^\\circ$`,
      ],
      calculator: true,
    };
  }
  if (kind === 'truss') {
    const t = retry(
      () => triSSS(['K', 'L', 'R'], rng.float(7, 14, 1), rng.float(3.5, 9, 1), rng.float(3.5, 9, 1)),
      (x) => x.ang[0] > 95 && x.ang[0] < 150 && x.s[1] !== x.s[2] && safeRound(x.ang[0]),
    );
    return {
      prompt: `A roof truss is a triangle $LRK$. The horizontal span $LR$ is ${fmt(t.s[0])} m, and the rafters are $KL = ${fmt(t.s[2])}$ m and $KR = ${fmt(t.s[1])}$ m. Determine the angle at the peak, $\\angle LKR$, ${TENTH_DEG}.`,
      figure: triangleFigure(t, { sides: [`${fmt(t.s[0])} m`, `${fmt(t.s[1])} m`, `${fmt(t.s[2])} m`], angles: ['?', null, null] }, { base: 0 }),
      parts: [numPart(t.ang[0], { decimals: 1, suffix: '°', label: '$\\angle LKR =$' })],
      hints: ['The peak angle is opposite the span $LR$.', '$\\cos K = \\dfrac{KL^2 + KR^2 - LR^2}{2(KL)(KR)}$. A negative cosine means an obtuse angle.'],
      solution: cosAngleSteps(t, true),
      calculator: true,
    };
  }
  // A triangular lot: the smallest or the largest angle.
  const raw = retry(
    () => triSSS(['A', 'B', 'C'], rng.int(30, 95), rng.int(30, 95), rng.int(30, 95)),
    (x) => new Set(x.s).size === 3 && x.ang.every((a) => a > 18 && safeRound(a)),
  );
  const smallest = rng.chance(0.5);
  const k = raw.s.indexOf(smallest ? Math.min(...raw.s) : Math.max(...raw.s));
  const t = permute(raw, [k, (k + 1) % 3, (k + 2) % 3]);
  const town = rng.pick(TOWNS);
  return {
    prompt: `A triangular lot in ${town} has sides of ${raw.s[0]} m, ${raw.s[1]} m and ${raw.s[2]} m. Determine the measure of the ${smallest ? 'smallest' : 'largest'} angle of the lot, ${TENTH_DEG}.`,
    parts: [numPart(t.ang[0], { decimals: 1, suffix: '°', label: `${smallest ? 'Smallest' : 'Largest'} angle` })],
    hints: [`The ${smallest ? 'smallest' : 'largest'} angle is opposite the ${smallest ? 'shortest' : 'longest'} side.`, 'Use the cosine law: the side opposite the angle is the one subtracted in the numerator.'],
    solution: [`The ${smallest ? 'shortest' : 'longest'} side is ${t.s[0]} m; call the angle opposite it $\\theta$.`, `$\\cos\\theta = \\dfrac{${t.s[1]}^2 + ${t.s[2]}^2 - ${t.s[0]}^2}{2(${t.s[1]})(${t.s[2]})} \\approx ${fmt((t.s[1] ** 2 + t.s[2] ** 2 - t.s[0] ** 2) / (2 * t.s[1] * t.s[2]), 4)}$`, `$\\theta \\approx ${fmtFixed(t.ang[0], 1)}^\\circ$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// Choosing a law: applications
// ---------------------------------------------------------------------------

const LAW_CHOICES = ['the sine law', 'the cosine law', 'a primary trigonometric ratio (SOH CAH TOA)'];

const obliqueApply = skill({
  id: 'm201-oblique-apply',
  name: 'Choosing the sine law or the cosine law',
  description: 'Choose the sine law or the cosine law to solve a problem in context, including problems that need two steps.',
  outcomes: ['T3'],
  lessonId: 'm201-2-5',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return applyOneStep(rng);
    if (d === 2) return applyTwoPart(rng);
    return applyTwoStep(rng);
  },
});

function applyOneStep(rng: Rng): GenOutput {
  const kind = rng.pick(['golf', 'hikers', 'sail', 'truss'] as const);
  const who = rng.pick(PEOPLE);
  if (kind === 'golf' || kind === 'hikers') {
    const t = retry(
      () => (kind === 'golf' ? triSAS(['K', 'G', 'T'], rng.int(115, 160), rng.int(18, 30) * 10, rng.int(10, 20) * 10) : triSAS(['C', 'X', 'Y'], rng.int(40, 130), rng.float(2, 7, 1), rng.float(2, 7, 1))),
      (x) => x.s[1] !== x.s[2] && safeRound(x.s[0], kind === 'golf' ? 0 : 1) && x.ang[0] !== 90,
    );
    const u = kind === 'golf' ? 'm' : 'km';
    const dp = kind === 'golf' ? 0 : 1;
    const prompt =
      kind === 'golf'
        ? `On a dogleg golf hole, the fairway runs ${t.s[1]} m from the tee $T$ to the bend $K$, then turns and runs ${t.s[2]} m from $K$ to the green $G$. The angle at the bend, $\\angle TKG$, is $${deg(t.ang[0])}$. ${who} wants to know the straight-line distance $TG$ from the tee to the green.`
        : `${who} and a friend leave camp $C$ on two straight trails. The angle between the trails is $${deg(t.ang[0])}$. After ${who} has hiked ${fmt(t.s[1])} km to $Y$ and the friend ${fmt(t.s[2])} km to $X$, how far apart are they?`;
    return {
      prompt: `${prompt} (a) Which tool should you use? (b) Determine the distance, ${dp === 0 ? 'to the nearest metre' : tenthOf(u)}.`,
      figure: triangleFigure(t, { sides: ['?', `${fmt(t.s[1])} ${u}`, `${fmt(t.s[2])} ${u}`], angles: [`${t.ang[0]}°`, null, null] }, { base: 0 }),
      parts: [part(fixedChoice(LAW_CHOICES, 1), { label: '(a)' }), numPart(t.s[0], { decimals: dp, suffix: u, label: '(b)' })],
      hints: ['The triangle has no right angle. You know two sides and the angle between them (SAS), so there is no complete side–angle pair for the sine law.', 'Use the cosine law: the unknown side is opposite the known angle.'],
      solution: ['Two sides and the contained angle are known (SAS): use **the cosine law**.', ...cosSideSteps(t, u, true, dp)],
      calculator: true,
    };
  }
  if (kind === 'sail') {
    const t = retry(
      () => triSSS(['H', 'T', 'L'], rng.float(2.5, 6, 1), rng.float(2.5, 6, 1), rng.float(2.5, 6, 1)),
      (x) => new Set(x.s).size === 3 && x.ang.every((a) => a > 22 && a < 120) && safeRound(x.ang[0]),
    );
    return {
      prompt: `A triangular sail $HTL$ has edges $TL = ${fmt(t.s[0])}$ m, $HL = ${fmt(t.s[1])}$ m and $HT = ${fmt(t.s[2])}$ m. ${who} needs the angle at the head of the sail, $\\angle H$. (a) Which tool should you use? (b) Determine $\\angle H$, ${TENTH_DEG}.`,
      figure: triangleFigure(t, { sides: [`${fmt(t.s[0])} m`, `${fmt(t.s[1])} m`, `${fmt(t.s[2])} m`], angles: ['?', null, null] }, { base: 1 }),
      parts: [part(fixedChoice(LAW_CHOICES, 1), { label: '(a)' }), numPart(t.ang[0], { decimals: 1, suffix: '°', label: '(b)' })],
      hints: ['All three sides are known and no angle is (SSS).', '$\\cos H = \\dfrac{HL^2 + HT^2 - TL^2}{2(HL)(HT)}$'],
      solution: ['Three sides are known (SSS): use **the cosine law**.', ...cosAngleSteps(t, true)],
      calculator: true,
    };
  }
  // Truss: AAS, the known side is opposite a known angle -> sine law directly.
  const data = retry(
    () => {
      const angs = [rng.int(95, 125), rng.int(22, 40), 0] as [number, number, number];
      angs[2] = 180 - angs[0] - angs[1];
      const known = rng.float(3, 7, 1);
      return triAAS(['K', 'L', 'R'], angs, 1, known);
    },
    (x) => x.ang[2] > 20 && x.ang[1] !== x.ang[2] && safeRound(x.s[0]),
  );
  const t = data;
  return {
    prompt: `A roof truss is a triangle $LRK$ with peak $K$. The angle at the peak is $${deg(t.ang[0])}$, the angle at $L$ is $${deg(t.ang[1])}$, and the rafter $KR$, opposite $\\angle L$, is ${fmt(t.s[1])} m long. ${who} needs the length of the span $LR$. (a) Which tool should you use? (b) Determine $LR$, ${tenthOf('m')}.`,
    figure: triangleFigure(t, { sides: ['?', `${fmt(t.s[1])} m`, null], angles: [`${t.ang[0]}°`, `${t.ang[1]}°`, null] }, { base: 0 }),
    parts: [part(fixedChoice(LAW_CHOICES, 0), { label: '(a)' }), numPart(t.s[0], { decimals: 1, suffix: 'm', label: '(b)' })],
    hints: ['You know a side and the angle opposite it — a complete pair.', '$\\dfrac{LR}{\\sin K} = \\dfrac{KR}{\\sin L}$'],
    solution: ['A side and its opposite angle are known, plus another angle (AAS): use **the sine law**.', `$\\dfrac{LR}{\\sin ${deg(t.ang[0])}} = \\dfrac{${fmt(t.s[1])}}{\\sin ${deg(t.ang[1])}}$`, `$LR = \\dfrac{${fmt(t.s[1])}\\sin ${deg(t.ang[0])}}{\\sin ${deg(t.ang[1])}} \\approx ${fmtFixed(t.s[0], 1)}\\text{ m}$`],
    calculator: true,
  };
}

function applyTwoPart(rng: Rng): GenOutput {
  const kind = rng.pick(['boat', 'survey', 'cabin'] as const);
  const who = rng.pick(PEOPLE);
  if (kind === 'boat') {
    const data = retry(
      () => {
        const leg1 = rng.float(4, 15, 1);
        const leg2 = rng.float(3, 12, 1);
        const turn = rng.int(25, 75);
        const t = triSAS(['T', 'S', 'E'], 180 - turn, leg2, leg1);
        return { leg1, leg2, turn, t };
      },
      (v) => safeRound(v.t.s[0]),
    );
    const { leg1, leg2, turn, t } = data;
    const lake = rng.pick(LAKES);
    const left = rng.chance(0.5);
    return {
      prompt: `${who} paddles ${fmt(leg1)} km in a straight line across ${lake} from $S$ to $T$, then turns $${deg(turn)}$ to the ${left ? 'left' : 'right'} and paddles ${fmt(leg2)} km to $E$. How far is $E$ from the starting point $S$, ${tenthOf('km')}?`,
      figure: turnFigure({ leg1, leg2, turn, left, leg1Label: `${fmt(leg1)} km`, leg2Label: `${fmt(leg2)} km`, seLabel: '?' }),
      parts: [numPart(t.s[0], { decimals: 1, suffix: 'km', label: '$SE =$' })],
      hints: [`The turn is measured from the direction ${who} was already travelling. The interior angle of the triangle at $T$ is $180^\\circ - ${deg(turn)}$.`, 'Two sides and the angle between them: use the cosine law.'],
      solution: [`Interior angle at $T$: $180^\\circ - ${deg(turn)} = ${deg(180 - turn)}$`, ...cosSideSteps(t, 'km', true)],
      calculator: true,
    };
  }
  if (kind === 'survey') {
    const data = retry(
      () => {
        const a = rng.int(40, 80);
        const b = rng.int(40, 80);
        const base = rng.int(25, 90) * 2;
        return { a, b, base, t: triAAS(['P', 'Q', 'H'], [a, b, 180 - a - b], 2, base) };
      },
      (v) => v.a + v.b < 150 && v.a !== v.b && safeRound(v.t.s[1]),
    );
    const { a, b, base, t } = data;
    return {
      prompt: `${who} needs the distance from a survey stake $P$ to a hydro pole $H$ on the far side of a coulee. A second stake $Q$ is ${base} m from $P$. ${who} measures $\\angle HPQ = ${deg(a)}$ and $\\angle HQP = ${deg(b)}$. Determine $PH$, ${tenthOf('m')}.`,
      figure: triangleFigure(t, { sides: [null, '?', `${base} m`], angles: [`${a}°`, `${b}°`, null] }, { base: 2 }),
      parts: [numPart(t.s[1], { decimals: 1, suffix: 'm', label: '$PH =$' })],
      hints: [`You know two angles and the side between them. Find $\\angle H$ first so that $PQ$ has an opposite angle.`, '$PH$ is opposite $\\angle Q$. Use the sine law.'],
      solution: [
        `$\\angle H = 180^\\circ - ${deg(a)} - ${deg(b)} = ${deg(t.ang[2])}$`,
        `$\\dfrac{PH}{\\sin ${deg(b)}} = \\dfrac{${base}}{\\sin ${deg(t.ang[2])}}$`,
        `$PH = \\dfrac{${base}\\sin ${deg(b)}}{\\sin ${deg(t.ang[2])}} \\approx ${fmtFixed(t.s[1], 1)}\\text{ m}$`,
      ],
      calculator: true,
    };
  }
  // Cabin: SSA with the known angle opposite the longer side (one triangle), angle then the third side? Ask the angle at the far corner.
  const data = retry(
    () => {
      const A = rng.intExcept(40, 110, [88, 89, 90, 91, 92]);
      const a = rng.int(30, 80);
      const b = r1(a * rng.float(0.45, 0.85, 2));
      const B = asinD((b * sinD(A)) / a);
      return { A, a, b, B, C: 180 - A - B };
    },
    (v) => safeRound(v.C) && v.C > 15 && v.A + v.B < 170,
  );
  const t: Tri = { n: ['W', 'S', 'G'], ang: [data.A, data.B, data.C], s: [data.a, data.b, (data.a * sinD(data.C)) / sinD(data.A)] };
  return {
    prompt: `A triangular cabin lot $WSG$ has a ${data.a} m fence $SG$ opposite the corner at the well $W$, where the angle is $${deg(data.A)}$. The fence $WG$ is ${fmt(data.b)} m long. Determine the angle at the gate, $\\angle G$, ${TENTH_DEG}.`,
    figure: triangleFigure(t, { sides: [`${data.a} m`, `${fmt(data.b)} m`, null], angles: [`${data.A}°`, null, '?'] }, { base: 1 }),
    parts: [numPart(data.C, { decimals: 1, suffix: '°', label: '$\\angle G =$' })],
    hints: [`$SG$ and $\\angle W$ form a complete pair. Use the sine law to find $\\angle S$ (opposite $WG$) first.`, `Then $\\angle G = 180^\\circ - \\angle W - \\angle S$.`],
    solution: [
      `$\\sin S = \\dfrac{${fmt(data.b)}\\sin ${deg(data.A)}}{${data.a}} \\approx ${fmt((data.b * sinD(data.A)) / data.a, 4)}$, so $\\angle S \\approx ${fmt(data.B, 2)}^\\circ$ (acute, since $WG < SG$)`,
      `$\\angle G = 180^\\circ - ${deg(data.A)} - ${fmt(data.B, 2)}^\\circ \\approx ${fmtFixed(data.C, 1)}^\\circ$`,
    ],
    calculator: true,
  };
}

function applyTwoStep(rng: Rng): GenOutput {
  const kind = rng.pick(['tree', 'crane', 'sailing'] as const);
  const who = rng.pick(PEOPLE);
  if (kind === 'tree') {
    const data = retry(
      () => {
        const alpha = rng.int(18, 40);
        const beta = rng.int(alpha + 10, Math.min(alpha + 35, 72));
        const dist = rng.int(15, 60);
        const BT = (dist * sinD(alpha)) / sinD(beta - alpha);
        const h = BT * sinD(beta);
        return { alpha, beta, dist, BT, h };
      },
      (v) => safeRound(v.h),
    );
    const { alpha, beta, dist, BT, h } = data;
    const s = new Sketch();
    const k = 6 / (dist + BT * cosD(beta));
    const A: P = [0, 0];
    const B: P = [dist * k, 0];
    const F: P = [B[0] + BT * k * cosD(beta), 0];
    const T: P = [F[0], h * k];
    s.seg([-0.3, 0], [F[0] + 0.5, 0], { color: 'muted' }).seg(F, T, { color: 'brand' }).seg(A, T, { color: 'accent' }).seg(B, T, { color: 'accent' });
    s.arc(A, 1.2, 0, alpha).arc(B, 0.7, 0, beta);
    s.vertexLabel(A, [0, alpha, 180], 'A').vertexLabel(B, [0, 180, beta], 'B').endLabel(T, 90, 'T').endLabel(F, -45, 'F');
    s.angleLabel(A, 0, alpha, `${alpha}°`, 56).angleLabel(B, 0, beta, `${beta}°`, 36);
    s.sideLabel([B[0] / 2, 0], -90, `${dist} m`).sideLabel([F[0], h * k * 0.5], 0, 'h');
    return {
      prompt: `To find the height of a tree, ${who} measures the angle of elevation of its top $T$ from point $A$ as $${deg(alpha)}$. Walking ${dist} m straight toward the tree to point $B$, the angle of elevation is $${deg(beta)}$. Determine the height $h$ of the tree, ${tenthOf('m')}.`,
      figure: s.build({ margin: 0.6 }),
      parts: [numPart(h, { decimals: 1, suffix: 'm', label: '$h =$' })],
      hints: [
        `Step 1: in the oblique triangle $ABT$, $\\angle ABT = 180^\\circ - ${deg(beta)}$ and $\\angle ATB = ${deg(beta)} - ${deg(alpha)}$. Use the sine law to find $BT$.`,
        `Step 2: in the right triangle $BFT$, $h = BT\\sin ${deg(beta)}$.`,
      ],
      solution: [
        `$\\angle ABT = 180^\\circ - ${deg(beta)} = ${deg(180 - beta)}$, so $\\angle ATB = 180^\\circ - ${deg(alpha)} - ${deg(180 - beta)} = ${deg(beta - alpha)}$`,
        `$\\dfrac{BT}{\\sin ${deg(alpha)}} = \\dfrac{${dist}}{\\sin ${deg(beta - alpha)}}$, so $BT = \\dfrac{${dist}\\sin ${deg(alpha)}}{\\sin ${deg(beta - alpha)}} \\approx ${fmt(BT, 3)}$ m`,
        `$h = BT\\sin ${deg(beta)} \\approx ${fmt(BT, 3)}\\sin ${deg(beta)} \\approx ${fmtFixed(h, 1)}\\text{ m}$`,
      ],
      calculator: true,
    };
  }
  if (kind === 'crane') {
    const data = retry(
      () => {
        const L = rng.int(14, 32);
        const dW = rng.int(6, 15);
        const th = rng.int(40, 70);
        // Winch W is behind the pivot P: angle WPB = 180 - th.
        const cable = Math.sqrt(L * L + dW * dW - 2 * L * dW * cosD(180 - th));
        const W = asinD((L * sinD(180 - th)) / cable);
        return { L, dW, th, cable, W };
      },
      (v) => safeRound(v.W) && v.W > 15,
    );
    const { L, dW, th, cable, W } = data;
    const s = new Sketch();
    const k = 6 / (dW + L * cosD(th));
    const Pp: P = [dW * k, 0];
    const Wp: P = [0, 0];
    const Bp: P = [Pp[0] + L * k * cosD(th), L * k * sinD(th)];
    s.seg([-0.4, 0], [Bp[0] + 0.6, 0], { color: 'muted' }).seg(Pp, Bp, { color: 'brand' }).seg(Wp, Bp, { color: 'accent' });
    s.arc(Pp, 0.6, 0, th).arc(Wp, 1.1, 0, W);
    s.dot(Pp).dot(Wp);
    s.vertexLabel(Pp, [0, 180, th], 'P').vertexLabel(Wp, [0, 180, W], 'W').endLabel(Bp, 60, 'B');
    s.angleLabel(Pp, 0, th, `${th}°`, 34).angleLabel(Wp, 0, W, '?', 56);
    s.sideLabel([Pp[0] / 2, 0], -90, `${dW} m`).sideLabel([(Pp[0] + Bp[0]) / 2, Bp[1] / 2], th - 90, `${L} m`);
    return {
      prompt: `A crane's boom $PB$ is ${L} m long and makes an angle of $${deg(th)}$ with the level ground at its pivot $P$. A cable runs from the top of the boom $B$ to a winch $W$ on the ground ${dW} m behind the pivot (on the other side of $P$ from the boom). Determine the angle the cable makes with the ground at $W$, ${TENTH_DEG}.`,
      figure: s.build({ margin: 0.6 }),
      parts: [numPart(W, { decimals: 1, suffix: '°', label: '$\\angle W =$' })],
      hints: [`Step 1: in $\\triangle WPB$, $\\angle WPB = 180^\\circ - ${deg(th)}$. Use the cosine law to find the cable length $WB$.`, 'Step 2: use the sine law to find $\\angle W$. It is acute because the angle at $P$ is obtuse.'],
      solution: [
        `$\\angle WPB = 180^\\circ - ${deg(th)} = ${deg(180 - th)}$`,
        `$WB^2 = ${L}^2 + ${dW}^2 - 2(${L})(${dW})\\cos ${deg(180 - th)}$, so $WB \\approx ${fmt(cable, 3)}$ m`,
        `$\\sin W = \\dfrac{${L}\\sin ${deg(180 - th)}}{${fmt(cable, 3)}} \\approx ${fmt((L * sinD(180 - th)) / cable, 4)}$`,
        `$\\angle W \\approx ${fmtFixed(W, 1)}^\\circ$`,
      ],
      calculator: true,
    };
  }
  // Sailing: two legs, then distance home and the angle at the start.
  const data = retry(
    () => {
      const leg1 = rng.float(5, 18, 1);
      const leg2 = rng.float(4, 15, 1);
      const turn = rng.int(30, 80);
      const t = triSAS(['T', 'S', 'E'], 180 - turn, leg2, leg1);
      return { leg1, leg2, turn, t };
    },
    (v) => safeRound(v.t.s[0]) && safeRound(v.t.ang[1]),
  );
  const { leg1, leg2, turn, t } = data;
  const lake = rng.pick(LAKES);
  const left = rng.chance(0.5);
  return {
    prompt: `${who} sails ${fmt(leg1)} km in a straight line across ${lake} from the marina $S$ to a point $T$, then turns $${deg(turn)}$ to the ${left ? 'left' : 'right'} and sails ${fmt(leg2)} km to $E$. (a) How far is $E$ from the marina, ${tenthOf('km')}? (b) What is $\\angle TSE$, the angle at the marina between the first leg and the direct line to $E$, ${TENTH_DEG}?`,
    figure: turnFigure({ leg1, leg2, turn, left, leg1Label: `${fmt(leg1)} km`, leg2Label: `${fmt(leg2)} km`, atS: '?' }),
    parts: [numPart(t.s[0], { decimals: 1, suffix: 'km', label: '(a) $SE =$' }), numPart(t.ang[1], { decimals: 1, suffix: '°', label: '(b) $\\angle TSE =$' })],
    hints: [`The interior angle at $T$ is $180^\\circ - ${deg(turn)}$. With two sides and that angle, use the cosine law for $SE$.`, 'Then use the sine law (or the cosine law again) with your unrounded $SE$ to find $\\angle TSE$.'],
    solution: [
      `Interior angle at $T$: $180^\\circ - ${deg(turn)} = ${deg(180 - turn)}$`,
      `$SE^2 = ${fmt(leg1)}^2 + ${fmt(leg2)}^2 - 2(${fmt(leg1)})(${fmt(leg2)})\\cos ${deg(180 - turn)}$, so $SE \\approx ${fmtFixed(t.s[0], 1)}\\text{ km}$`,
      `$\\sin S = \\dfrac{${fmt(leg2)}\\sin ${deg(180 - turn)}}{${fmt(t.s[0], 3)}} \\approx ${fmt((leg2 * sinD(180 - turn)) / t.s[0], 4)}$, so $\\angle TSE \\approx ${fmtFixed(t.ang[1], 1)}^\\circ$ (acute, because the angle at $T$ is obtuse)`,
    ],
    calculator: true,
  };
}

export const TRIG_SKILLS: SkillDef[] = [
  referenceAngle,
  specialExact,
  ratioFromPoint,
  ratioSign,
  solveAngle,
  sineLawSide,
  sineLawAngle,
  ambiguousCount,
  ambiguousSolve,
  cosineLawSide,
  cosineLawAngle,
  obliqueApply,
];
