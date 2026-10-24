/** Math 30-3 Unit 3 — Triangles, Quadrilaterals and Polygons (G2): angle properties, regular polygons and design problems. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj', 'Chloé', 'Tariq',
  'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Kai', 'Zainab', 'Mason',
  'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];

const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
/** An angle as a figure label. */
const degL = (x: number) => `${fmt(x)}°`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Linear expression such as 3x - 10 in LaTeX, or with a Unicode minus for figure labels. */
function linExpr(a: number, b: number, plain = false): string {
  const xs = a === 1 ? 'x' : `${a}x`;
  if (b === 0) return xs;
  const minus = plain ? ' − ' : ' - ';
  return `${xs}${b < 0 ? minus : ' + '}${Math.abs(b)}`;
}
/** "(3x - 10)^\circ" in LaTeX. */
const exprDeg = (a: number, b: number) => (b === 0 ? `${linExpr(a, b)}^\\circ` : `(${linExpr(a, b)})^\\circ`);
/** "(3x − 10)°" for a figure label. */
const exprLabel = (a: number, b: number) => (b === 0 ? `${linExpr(a, b, true)}°` : `(${linExpr(a, b, true)})°`);
const coefX = (k: number) => (k === 1 ? 'x' : `${k}x`);
const signed = (c: number) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}`);
/** kx + c with a value substituted for x, e.g. 3(14) - 8. */
const subst = (k: number, c: number, x: number) => `${k === 1 ? x : `${k}(${x})`}${signed(c)}`;

/** Worked steps for k1 x + c1 = k2 x + c2 (k1 ≠ k2), keeping the x-term positive. */
function solveEqual(k1: number, c1: number, k2: number, c2: number): string[] {
  const [kb, cb, ks, cs] = k1 > k2 ? [k1, c1, k2, c2] : [k2, c2, k1, c1];
  const k = kb - ks;
  const r = cs - cb;
  const steps = [`Subtract $${coefX(ks)}$ from both sides: $${coefX(k)}${signed(cb)} = ${cs}$`];
  if (cb !== 0) steps.push(`${cb > 0 ? 'Subtract' : 'Add'} $${Math.abs(cb)}$ ${cb > 0 ? 'from' : 'to'} both sides: $${coefX(k)} = ${r}$`);
  if (k !== 1) steps.push(`Divide both sides by $${k}$: $x = ${fmt(r / k)}$`);
  return steps;
}

/** Worked steps for (sum of k_i x + c_i) = total. */
function solveSum(terms: Array<[number, number]>, total: number): string[] {
  const k = terms.reduce((s, t) => s + t[0], 0);
  const c = terms.reduce((s, t) => s + t[1], 0);
  const steps = [`Collect like terms: $${coefX(k)}${signed(c)} = ${total}$`];
  if (c !== 0) steps.push(`${c > 0 ? 'Subtract' : 'Add'} $${Math.abs(c)}$ ${c > 0 ? 'from' : 'to'} both sides: $${coefX(k)} = ${total - c}$`);
  if (k !== 1) steps.push(`Divide both sides by $${k}$: $x = ${fmt((total - c) / k)}$`);
  return steps;
}

// ---------------------------------------------------------------------------
// Figure helpers: diagrams drawn on a plane with no axes (the Math 10-3 approach)
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const dirTo = (a: P, b: P) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

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
  const dx = Math.max(b.x0 - p[0], 0, p[0] - b.x1);
  const dy = Math.max(b.y0 - p[1], 0, p[1] - b.y1);
  return Math.hypot(dx, dy);
}

/** Liang–Barsky: does segment ab meet the box? */
function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const ps = [-dx, dx, -dy, dy];
  const qs = [a[0] - box.x0, box.x1 - a[0], a[1] - box.y0, box.y1 - a[1]];
  for (let i = 0; i < 4; i++) {
    const p = ps[i];
    const q = qs[i];
    if (p === 0) {
      if (q < 0) return false;
    } else {
      const r = q / p;
      if (p < 0) {
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
  const dx = Math.max(q.x0 - p.x1, p.x0 - q.x1, 0);
  const dy = Math.max(q.y0 - p.y1, p.y0 - q.y1, 0);
  return Math.hypot(dx, dy);
}

/** Approximate rendered width (px) of a 12px bold figure label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === '°' ? 5 : ch === ' ' ? 3.5 : ch === '(' || ch === ')' ? 4.5 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  /** Candidate text centres (data units) in order of preference; receives pixels per unit. */
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

/**
 * Collects segments, arcs and labels, then lays the figure out on a plane with no tick labels.
 * Labels are drawn with invisible anchor points (open + muted), and each label is placed where it
 * stays clear of every drawn line. Copied from the Math 20-2 angles unit.
 */
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

  ray(v: P, a: number, len: number, opts: { color?: Color; dashed?: boolean; arrow?: boolean } = {}) {
    return this.seg(v, at(v, a, len), { color: opts.color, dashed: opts.dashed, arrowEnd: opts.arrow ?? true });
  }

  /** A line through c in direction a, drawn `half` units each way with arrows at both ends. */
  line(c: P, a: number, half: number, color?: Color) {
    return this.seg(at(c, a + 180, half), at(c, a, half), { color, arrowEnd: true, arrowStart: true });
  }

  /** Arc around v from direction a0 counterclockwise to a1. */
  arc(v: P, r: number, a0: number, a1: number, color: Color = 'accent') {
    const span = norm360(a1 - a0) || 360;
    const n = Math.max(6, Math.ceil(span / 8));
    const points: P[] = [];
    for (let i = 0; i <= n; i++) points.push(at(v, a0 + (span * i) / n, r));
    this.polys.push({ points, color });
    for (let i = 0; i < n; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  /** Square right-angle mark between directions a0 and a0 + 90. */
  rightMark(v: P, a0: number, s = 0.45) {
    const p1 = at(v, a0, s);
    const p2 = at(p1, a0 + 90, s);
    const p3 = at(v, a0 + 90, s);
    this.polys.push({ points: [p1, p2, p3], color: 'accent' });
    this.obstacles.push([p1, p2], [p2, p3]);
    return this;
  }

  /** Equal-length tick marks across the middle of segment pq. */
  ticks(p: P, q: P, count: number, size = 0.24) {
    const m = mid(p, q);
    const d = dirTo(p, q);
    for (let k = 0; k < count; k++) {
      const c = at(m, d, (k - (count - 1) / 2) * 0.2);
      this.seg(at(c, d + 90, size), at(c, d - 90, size), { color: 'accent' });
    }
    return this;
  }

  /** Arrowhead-style parallel marks (">" or ">>") at the middle of segment pq, pointing from p to q. */
  chevrons(p: P, q: P, count = 1, size = 0.28) {
    const m = mid(p, q);
    const d = dirTo(p, q);
    for (let k = 0; k < count; k++) {
      const tip = at(m, d, (k - (count - 1) / 2) * 0.26 + 0.12);
      this.polyline([at(tip, d + 145, size), tip, at(tip, d - 145, size)]);
    }
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

  /** Reserve space so the layout box includes this point. */
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

  /** Label for a point, placed just beyond it in direction a (or nearby). */
  endLabel(p: P, a: number, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [15, 19, 24, 30, 38])
          for (const off of [0, 30, -30, 60, -60, 90, -90, 125, -125, 180]) out.push(at(p, a + off, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label for a vertex where rays meet: tries the widest gaps between the rays first. */
  vertexLabel(v: P, rayDirs: number[], text: string) {
    const dirs = [...rayDirs].map(norm360).sort((a, b) => a - b);
    const gaps: Array<{ a0: number; span: number }> = dirs.map((a, i) => {
      const next = i + 1 < dirs.length ? dirs[i + 1] : dirs[0] + 360;
      return { a0: a, span: next - a };
    });
    gaps.sort((g, h) => h.span - g.span);
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const g of gaps)
          for (const rpx of [15, 19, 24, 30])
            for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8]) out.push(at(v, g.a0 + t * g.span, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Text centred exactly at c (for numbers inside squares). */
  textAt(c: P, text: string) {
    this.pending.push({ text, cands: () => [c], fixed: true });
    return this;
  }

  build(opts: { margin?: number; grid?: boolean; caption?: string; minWidth?: number } = {}): PlaneFigure {
    const m = opts.margin ?? 0.9;
    const pts: P[] = [
      ...this.segs.flatMap((s) => [s.from, s.to] as P[]),
      ...this.polys.flatMap((p) => p.points),
      ...this.dots.map((d) => d.p),
      ...this.extra,
    ];
    let minX = Math.min(...pts.map((p) => p[0])) - m;
    let maxX = Math.max(...pts.map((p) => p[0])) + m;
    let minY = Math.min(...pts.map((p) => p[1])) - m;
    let maxY = Math.max(...pts.map((p) => p[1])) + m;
    let w = maxX - minX;
    let h = maxY - minY;
    const wantW = Math.max(h, opts.minWidth ?? 0);
    if (w < wantW) {
      minX -= (wantW - w) / 2;
      maxX += (wantW - w) / 2;
      w = wantW;
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

    // Place labels.
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
        if (score >= 5) {
          best = { c, score };
          break;
        }
      }
      const c = best!.c;
      const hw = (wpx / 2 + 1.5) / ppu;
      const hh = 6.5 / ppu;
      placed.push({ x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh });
      anchors.push({ x: c[0] - (8 + wpx / 2) / ppu, y: c[1] - 12.3 / ppu, label: lab.text, color: 'muted', open: true });
    }

    const T = (p: P): [number, number] => [r3(p[0] - ox), r3(p[1] - oy)];
    const step = opts.grid ? 1 : Math.max(xr, yr);
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: xr, yMin: 0, yMax: yr, step },
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

/** The angle region at v between the rays to u and w, as [a0, a1] counterclockwise (span below 180°). */
function wedge(v: P, u: P, w: P): [number, number] {
  const du = dirTo(v, u);
  const dw = dirTo(v, w);
  const s = norm360(dw - du);
  return s < 180 ? [du, du + s] : [dw, dw + (360 - s)];
}

/** Label (and optional arc) for the interior angle at v between rays to u and w. */
function markAngle(s: Sketch, v: P, u: P, w: P, text: string | null, opts: { arc?: boolean; r?: number; right?: boolean } = {}) {
  const [a0, a1] = wedge(v, u, w);
  if (opts.right) s.rightMark(v, a0, 0.4);
  else if (opts.arc ?? true) s.arc(v, opts.r ?? 0.5, a0, a1);
  if (text) s.angleLabel(v, a0, a1, text, text.length > 3 ? 28 : 20);
}

/** Vertex name placed outside a polygon at v (away from its neighbours u and w). */
function nameVertex(s: Sketch, v: P, u: P, w: P, name: string) {
  s.dot(v);
  s.vertexLabel(v, [dirTo(v, u), dirTo(v, w)], name);
}

// ---------------------------------------------------------------------------
// Shapes: triangles, quadrilaterals and regular polygons
// ---------------------------------------------------------------------------

const TRI_LETTERS: Array<[string, string, string]> = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['K', 'L', 'M'],
  ['X', 'Y', 'Z'],
  ['D', 'E', 'F'],
  ['R', 'S', 'T'],
];

/** Vertices of a triangle with angles a0 at vertex 0 and a1 at vertex 1, base along the x-axis. */
function trianglePts(a0: number, a1: number, base = 6, mirror = false): [P, P, P] {
  const a2 = 180 - a0 - a1;
  const side02 = (base * Math.sin(rad(a1))) / Math.sin(rad(a2));
  const raw: P[] = [[0, 0], [base, 0], at([0, 0], a0, side02)];
  return raw.map(([x, y]) => [mirror ? -x : x, y] as P) as [P, P, P];
}

interface TriFig {
  angles: [number, number];
  names: string[];
  labels?: Array<string | null>;
  ticks?: Array<[number, number, number]>;
  /** A segment from vertex 2 straight down to the base (a king post), with a right-angle mark. */
  post?: { label: string | null };
  mirror?: boolean;
}

function triangleFigure(o: TriFig): PlaneFigure {
  const s = new Sketch();
  const V = trianglePts(o.angles[0], o.angles[1], 6, o.mirror ?? false);
  s.polyline([V[0], V[1], V[2], V[0]]);
  const extDirs: number[][] = [[], [], []];
  if (o.post) {
    const F: P = [V[2][0], 0];
    s.seg(V[2], F, { color: 'muted', dashed: true });
    s.rightMark(F, dirTo(F, V[1]) < 90 && dirTo(F, V[1]) > -90 ? 0 : 90, 0.35);
    extDirs[2].push(-90);
    if (o.post.label) {
      const [a0, a1] = wedge(V[2], F, V[1]);
      s.arc(V[2], 0.75, a0, a1);
      s.angleLabel(V[2], a0, a1, o.post.label, 30);
    }
  }
  for (let i = 0; i < 3; i++) {
    const u = V[(i + 1) % 3];
    const w = V[(i + 2) % 3];
    const lab = o.labels?.[i] ?? null;
    if (lab) markAngle(s, V[i], u, w, lab);
    s.dot(V[i]);
    s.vertexLabel(V[i], [dirTo(V[i], u), dirTo(V[i], w), ...extDirs[i]], o.names[i]);
  }
  for (const [i, j, c] of o.ticks ?? []) s.ticks(V[i], V[j], c);
  return s.build({ margin: 0.7 });
}

/** Three whole-degree angles of a triangle, each between min and max, the first two different. */
function triAngles(rng: Rng, min = 25, max = 120): [number, number, number] {
  return retry(
    () => {
      const a = rng.int(min, max);
      const b = rng.int(min, max);
      return [a, b, 180 - a - b] as [number, number, number];
    },
    (t) => t[2] >= min && t[2] <= max && t[0] !== t[1],
    300,
  );
}

const QUAD_LETTERS: string[][] = [
  ['A', 'B', 'C', 'D'],
  ['P', 'Q', 'R', 'S'],
  ['K', 'L', 'M', 'N'],
  ['W', 'X', 'Y', 'Z'],
  ['E', 'F', 'G', 'H'],
];

/** Parallelogram A(0,0), B(w,0), C, D with angle θ at A and slanted side length s. */
function paraPts(theta: number, w: number, side: number): P[] {
  const d: P = [side * Math.cos(rad(theta)), side * Math.sin(rad(theta))];
  return [[0, 0], [w, 0], [w + d[0], d[1]], d];
}
/** Trapezoid with base AB along the bottom, base angles α at A and β at B, and height h (AB ∥ DC). */
function trapPts(alpha: number, beta: number, w: number, h: number): P[] {
  return [[0, 0], [w, 0], [w - h / Math.tan(rad(beta)), h], [h / Math.tan(rad(alpha)), h]];
}
/** Kite with AB = AD and CB = CD: A at the bottom, C at the top, angle α at A and γ at C. */
function kitePts(alpha: number, gamma: number, r = 2): P[] {
  return [[0, -r / Math.tan(rad(alpha / 2))], [r, 0], [0, r / Math.tan(rad(gamma / 2))], [-r, 0]];
}

interface QuadSpec {
  pts: P[];
  names: string[];
  angles?: Array<string | null>;
  right?: number[];
  /** Equal-side ticks: [i, j, count] marks side ViVj. */
  ticks?: Array<[number, number, number]>;
  /** Parallel marks: [i, j, count] on side ViVj, pointing from Vi to Vj. */
  par?: Array<[number, number, number]>;
  diagonals?: boolean;
  /** One diagonal only (a brace), from vertex i to vertex j. */
  brace?: [number, number];
  /** Name of the point where the diagonals meet. */
  centre?: string;
  /** Extra angle marks: at vertex index v between the rays to points u and w (indices, or 'E' for the centre). */
  marks?: Array<{ v: number | 'E'; u: number | 'E'; w: number | 'E'; label: string | null; right?: boolean }>;
  /** Labels on the half-diagonals from the centre: [vertex index, label]. */
  halves?: Array<[number, string]>;
}

function lineCross(a: P, b: P, c: P, d: P): P {
  const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

function quadFigure(o: QuadSpec): PlaneFigure {
  const s = new Sketch();
  const V = o.pts;
  s.polyline([...V, V[0]]);
  const E = lineCross(V[0], V[2], V[1], V[3]);
  if (o.diagonals) {
    s.seg(V[0], V[2], { color: 'muted' });
    s.seg(V[1], V[3], { color: 'muted' });
  }
  if (o.brace) s.seg(V[o.brace[0]], V[o.brace[1]], { color: 'muted' });
  const pt = (k: number | 'E') => (k === 'E' ? E : V[k]);
  for (let i = 0; i < 4; i++) {
    const u = V[(i + 3) % 4];
    const w = V[(i + 1) % 4];
    const lab = o.angles?.[i] ?? null;
    const right = o.right?.includes(i) ?? false;
    if (lab || right) markAngle(s, V[i], u, w, lab, { right, r: 0.45 });
  }
  for (const m of o.marks ?? []) markAngle(s, pt(m.v), pt(m.u), pt(m.w), m.label, { right: m.right, r: 0.6 });
  for (const [i, j, c] of o.ticks ?? []) s.ticks(V[i], V[j], c);
  for (const [i, j, c] of o.par ?? []) s.chevrons(V[i], V[j], c);
  for (let i = 0; i < 4; i++) {
    const u = V[(i + 3) % 4];
    const w = V[(i + 1) % 4];
    s.dot(V[i]);
    const extra = o.diagonals ? [dirTo(V[i], E)] : o.brace?.includes(i) ? [dirTo(V[i], V[o.brace[0] === i ? o.brace[1] : o.brace[0]])] : [];
    s.vertexLabel(V[i], [dirTo(V[i], u), dirTo(V[i], w), ...extra], o.names[i]);
  }
  if (o.centre) {
    s.dot(E);
    s.vertexLabel(E, V.map((v) => dirTo(E, v)), o.centre);
  }
  for (const [k, lab] of o.halves ?? []) {
    const m = mid(E, V[k]);
    s.endLabel(m, dirTo(E, V[k]) + 90, lab);
  }
  return s.build({ margin: 0.7 });
}

/** Marks for a parallelogram ABCD: both pairs of opposite sides parallel. */
const PARA_MARKS = { par: [[0, 1, 1], [3, 2, 1], [0, 3, 2], [1, 2, 2]] as Array<[number, number, number]> };
const RHOMBUS_TICKS: Array<[number, number, number]> = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 0, 1]];

const POLY: Record<number, string> = {
  3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon',
};
const polyName = (n: number) => POLY[n] ?? `${n}-sided polygon`;
/** Name of a regular polygon: "square", "equilateral triangle", "regular hexagon". */
const regName = (n: number) => (n === 3 ? 'equilateral triangle' : n === 4 ? 'square' : `regular ${polyName(n)}`);
const article = (w: string) => (/^[aeiou]/i.test(w) || /^8/.test(w) || /^1[18]\b/.test(w) || /^1[18]-/.test(w) ? 'an' : 'a');

/** Vertices of a regular n-gon on a circle of radius r centred at the origin, with a flat bottom edge (vertices 0 and 1). */
function regularPts(n: number, r = 3): P[] {
  const st = -90 - 180 / n;
  return Array.from({ length: n }, (_, i) => at([0, 0], st + (360 * i) / n, r));
}

/** A regular polygon with optional marks: an interior angle (at vertex 1), an exterior angle (at vertex 1), a central angle, a frame. */
function regularFigure(n: number, o: { interior?: string | null; exterior?: string | null; central?: string | null; frame?: boolean; ticks?: boolean } = {}): PlaneFigure {
  const s = new Sketch();
  const V = regularPts(n, 3);
  s.polyline([...V, V[0]]);
  if (o.frame) {
    const inner = regularPts(n, 3 - Math.min(0.75, 2.4 * Math.sin(Math.PI / n)));
    s.polyline([...inner, inner[0]]);
    for (let i = 0; i < n; i++) s.seg(V[i], inner[i]);
  }
  if (o.ticks && n <= 10) for (let i = 0; i < n; i++) s.ticks(V[i], V[(i + 1) % n], 1, 0.2);
  if (o.interior !== undefined) markAngle(s, V[1], V[0], V[2], o.interior, { r: 0.5 });
  if (o.exterior !== undefined) {
    const E = at(V[1], dirTo(V[0], V[1]), 2.2);
    s.seg(V[1], E, { color: 'muted', dashed: true });
    markAngle(s, V[1], E, V[2], o.exterior, { r: 0.7 });
  }
  if (o.central !== undefined) {
    const O: P = [0, 0];
    const k = Math.floor(n / 2);
    s.seg(O, V[k], { color: 'muted', dashed: true });
    s.seg(O, V[(k + 1) % n], { color: 'muted', dashed: true });
    s.dot(O);
    markAngle(s, O, V[k], V[(k + 1) % n], o.central, { r: 0.6 });
  }
  return s.build({ margin: 0.8 });
}

/** Regular polygons around one point: the n-gons in order, then the gap marked with `gapLabel`. */
function vertexFigure(ns: number[], gapLabel: string): PlaneFigure {
  const s = new Sketch();
  const V: P = [0, 0];
  let a = 0;
  const L = 2.2;
  for (const n of ns) {
    const ext = 360 / n;
    const pts: P[] = [V];
    let dir = a;
    for (let k = 1; k < n; k++) {
      pts.push(at(pts[k - 1], dir, L));
      dir += ext;
    }
    s.polyline([...pts, V]);
    markAngle(s, V, pts[1], pts[n - 1], `${fmt(180 - ext, 1)}°`, { r: 0.45 });
    a += 180 - ext;
  }
  markAngle(s, V, at(V, a, 1), at(V, 360, 1), gapLabel, { r: 0.55 });
  s.dot(V);
  return s.build({ margin: 0.6 });
}

/** Vertices of a convex polygon with the given interior angles (sum 180(n-2)), or null if no nice shape was found. */
function polygonPts(rng: Rng, interior: number[]): P[] | null {
  const n = interior.length;
  const phi: number[] = [0];
  for (let i = 1; i < n; i++) phi.push(phi[i - 1] + (180 - interior[i]));
  const u = phi.map((p) => [Math.cos(rad(p)), Math.sin(rad(p))] as P);
  for (let tries = 0; tries < 200; tries++) {
    const L = Array.from({ length: n - 2 }, () => rng.float(2.4, 3.8, 2));
    const S: P = [0, 0];
    for (let i = 0; i < n - 2; i++) {
      S[0] += L[i] * u[i][0];
      S[1] += L[i] * u[i][1];
    }
    const [p, q] = [u[n - 2], u[n - 1]];
    const det = p[0] * q[1] - p[1] * q[0];
    if (Math.abs(det) < 1e-6) continue;
    const a = (-S[0] * q[1] + S[1] * q[0]) / det;
    const b = (-p[0] * S[1] + p[1] * S[0]) / det;
    if (a < 1.4 || b < 1.4 || a > 5 || b > 5) continue;
    const lens = [...L, a, b];
    const pts: P[] = [[0, 0]];
    for (let i = 0; i < n - 1; i++) pts.push(at(pts[i], phi[i], lens[i]));
    // Avoid long, flat shapes: they leave too little room for the angle labels.
    const w = Math.max(...pts.map((pp) => pp[0])) - Math.min(...pts.map((pp) => pp[0]));
    const h = Math.max(...pts.map((pp) => pp[1])) - Math.min(...pts.map((pp) => pp[1]));
    if (h / w < 0.65 || h / w > 1.5) continue;
    return pts;
  }
  return null;
}

function polygonFigure(pts: P[], labels: string[], names?: string[]): PlaneFigure {
  const s = new Sketch();
  s.polyline([...pts, pts[0]]);
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const u = pts[(i + n - 1) % n];
    const w = pts[(i + 1) % n];
    markAngle(s, pts[i], u, w, labels[i], { r: 0.42 });
    if (names) nameVertex(s, pts[i], u, w, names[i]);
  }
  return s.build({ margin: 0.6 });
}

/** Interior angles (whole numbers, convex) adding to 180(n - 2). */
function polyAngles(rng: Rng, n: number): number[] {
  const total = 180 * (n - 2);
  const avg = total / n;
  for (;;) {
    const a = Array.from({ length: n - 1 }, () => rng.int(Math.max(70, Math.round(avg - 30)), Math.min(170, Math.round(avg + 30))));
    const last = total - a.reduce((s, v) => s + v, 0);
    if (last >= Math.max(70, avg - 35) && last <= Math.min(170, avg + 35)) return rng.shuffle([...a, last]);
  }
}

// ---------------------------------------------------------------------------
// Lesson 3.1 — Properties of triangles and quadrilaterals
// ---------------------------------------------------------------------------

const TRI_THINGS = ['a triangular steel gusset plate', 'a triangular corner shelf', 'a triangular flower bed', 'a triangular sail', 'a triangular brace for a gate', 'a triangular glass panel'];

/** Two angles of a triangle given; find the third. */
function triThird(rng: Rng): GenOutput {
  const [a, b, c] = triAngles(rng);
  const names = rng.pick(TRI_LETTERS);
  const who = rng.pick(NAMES);
  const thing = rng.pick(TRI_THINGS);
  return {
    prompt: `${who} is cutting ${thing}, $\\triangle ${names.join('')}$. $\\angle ${names[0]} = ${deg(a)}$ and $\\angle ${names[1]} = ${deg(b)}$. Find $\\angle ${names[2]}$.`,
    figure: triangleFigure({ angles: [a, b], names, labels: [degL(a), degL(b), 'x'], mirror: rng.chance(0.5) }),
    parts: [numPart(c, { label: `$\\angle ${names[2]} =$`, suffix: '°' })],
    hints: ['The three angles of any triangle add to $180^\\circ$.', `Subtract the two known angles from $180^\\circ$.`],
    solution: [`The angles of a triangle add to $180^\\circ$.`, `$\\angle ${names[2]} = 180^\\circ - ${deg(a)} - ${deg(b)} = ${deg(c)}$`, `$\\angle ${names[2]}$ measures $${deg(c)}$.`],
  };
}

/** Isosceles triangle (a gable truss or a sign): apex → base angles, or base → apex. */
function isoTriangle(rng: Rng): GenOutput {
  const b = rng.int(15, 70);
  const apex = 180 - 2 * b;
  const toBase = rng.chance(0.55);
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    { story: `${who} is building a gable roof truss. Its two rafters are the same length, so the truss is an isosceles triangle.`, apexW: 'the angle at the peak', baseW: 'the angle each rafter makes with the bottom chord' },
    { story: `${who} is cutting a sign shaped like an isosceles triangle, with its two long edges equal.`, apexW: 'the angle at the top', baseW: 'each angle at the bottom' },
    { story: `${who} is building an A-frame shelter. The two sloped walls are equal, so the end wall is an isosceles triangle.`, apexW: 'the angle at the ridge', baseW: 'the angle each sloped wall makes with the floor' },
  ]);
  const names = rng.pick(TRI_LETTERS);
  const fig = triangleFigure({
    angles: [b, b],
    names,
    labels: toBase ? ['x', 'x', degL(apex)] : [degL(b), null, 'x'],
    ticks: [
      [0, 2, 1],
      [1, 2, 1],
    ],
  });
  if (toBase) {
    return {
      prompt: `${ctx.story} If ${ctx.apexW} is $${deg(apex)}$, what is ${ctx.baseW}?`,
      figure: fig,
      parts: [numPart(b, { suffix: '°' })],
      hints: ['In an isosceles triangle, the two angles opposite the equal sides are equal.', `The two equal angles share $180^\\circ - ${deg(apex)}$.`],
      solution: [`The two base angles are equal, and all three angles add to $180^\\circ$.`, `$2x = 180^\\circ - ${deg(apex)} = ${deg(180 - apex)}$`, `$x = ${deg(180 - apex)} \\div 2 = ${deg(b)}$`, `Each base angle is $${deg(b)}$.`],
    };
  }
  return {
    prompt: `${ctx.story} If ${ctx.baseW} is $${deg(b)}$, what is ${ctx.apexW}?`,
    figure: fig,
    parts: [numPart(apex, { suffix: '°' })],
    hints: ['In an isosceles triangle, the two angles opposite the equal sides are equal.', 'Both base angles are known. Subtract them from $180^\\circ$.'],
    solution: [`Both base angles are $${deg(b)}$.`, `$180^\\circ - 2(${deg(b)}) = 180^\\circ - ${deg(2 * b)} = ${deg(apex)}$`, `The angle is $${deg(apex)}$.`],
  };
}

/** Any convex quadrilateral: three angles given; find the fourth. */
function quadFourth(rng: Rng): GenOutput {
  for (;;) {
    const ang = polyAngles(rng, 4);
    const pts = polygonPts(rng, ang);
    if (!pts) continue;
    const u = rng.int(0, 3);
    const known = ang.filter((_, i) => i !== u);
    const sum = known.reduce((s, v) => s + v, 0);
    const thing = rng.pick(['a four-sided garden plot', 'a four-sided steel plate', 'a piece of plywood with four straight edges', 'a four-sided concrete pad']);
    return {
      prompt: `${rng.pick(NAMES)} measures three corners of ${thing}: $${deg(known[0])}$, $${deg(known[1])}$ and $${deg(known[2])}$. Find the fourth angle, $x$.`,
      figure: polygonFigure(pts, ang.map((a, i) => (i === u ? 'x' : degL(a)))),
      parts: [numPart(ang[u], { label: '$x =$', suffix: '°' })],
      hints: ['The four angles of any quadrilateral add to $360^\\circ$.', 'A diagonal splits a quadrilateral into two triangles: $2 \\times 180^\\circ = 360^\\circ$.'],
      solution: [`The angles of a quadrilateral add to $360^\\circ$.`, `Known angles: $${known.join(' + ')} = ${sum}$`, `$x = 360^\\circ - ${deg(sum)} = ${deg(ang[u])}$`, `The fourth angle is $${deg(ang[u])}$.`],
    };
  }
}

/** A parallelogram (or rhombus) with angle θ at vertex 0 and shape points. */
function paraShape(rng: Rng, rhombus: boolean) {
  const theta = rng.chance(0.5) ? rng.int(48, 80) : rng.int(100, 132);
  const w = 5;
  const side = rhombus ? 5 : rng.pick([3, 3.4, 3.8]);
  const pts = paraPts(theta, w, side);
  return { theta, pts, angs: [theta, 180 - theta, theta, 180 - theta] };
}

/** Parallelogram: one angle given, find the next angle or the opposite angle. */
function paraOne(rng: Rng): GenOutput {
  const rhombus = rng.chance(0.3);
  const { theta, pts, angs } = paraShape(rng, rhombus);
  const N = rng.pick(QUAD_LETTERS);
  const ask = rng.pick([1, 2, 3]);
  const kind = rhombus ? 'rhombus' : 'parallelogram';
  const labels: Array<string | null> = [degL(theta), null, null, null];
  labels[ask] = 'x';
  const adj = ask !== 2;
  return {
    prompt: `$${N.join('')}$ is a ${kind}, and $\\angle ${N[0]} = ${deg(theta)}$. Find $\\angle ${N[ask]}$.`,
    figure: quadFigure({ pts, names: N, angles: labels, ...(rhombus ? { ticks: RHOMBUS_TICKS } : PARA_MARKS) }),
    parts: [numPart(angs[ask], { label: `$\\angle ${N[ask]} =$`, suffix: '°' })],
    hints: [
      `In a ${kind}, opposite angles are equal, and angles next to each other (consecutive angles) add to $180^\\circ$.`,
      adj ? `$\\angle ${N[ask]}$ is next to $\\angle ${N[0]}$.` : `$\\angle ${N[ask]}$ is opposite $\\angle ${N[0]}$.`,
    ],
    solution: adj
      ? [`$\\angle ${N[ask]}$ and $\\angle ${N[0]}$ are consecutive angles of a ${kind}, so they add to $180^\\circ$.`, `$\\angle ${N[ask]} = 180^\\circ - ${deg(theta)} = ${deg(180 - theta)}$`, `$\\angle ${N[ask]} = ${deg(angs[ask])}$`]
      : [`$\\angle ${N[2]}$ is opposite $\\angle ${N[0]}$, and opposite angles of a ${kind} are equal.`, `$\\angle ${N[2]} = ${deg(theta)}$`],
  };
}

const QUAD_DESCRIPTIONS: Array<{ name: string; text: string[] }> = [
  { name: 'Square', text: ['All four sides are equal and all four angles are $90^\\circ$.', 'It is a rhombus with four right angles.'] },
  { name: 'Rectangle', text: ['Both pairs of opposite sides are parallel and all four angles are $90^\\circ$, but the sides are not all equal.', 'Its diagonals are equal, but its sides are not all the same length.'] },
  { name: 'Rhombus', text: ['All four sides are equal, but the angles are not $90^\\circ$.', 'Its diagonals cross at $90^\\circ$, all four sides are equal, and no angle is a right angle.'] },
  { name: 'Parallelogram', text: ['Both pairs of opposite sides are parallel and equal, but no angle is $90^\\circ$ and the sides next to each other are different lengths.'] },
  { name: 'Trapezoid', text: ['Exactly one pair of opposite sides is parallel.', 'Two sides are parallel and the other two are not.'] },
  { name: 'Kite', text: ['It has two pairs of equal sides that are next to each other, and no parallel sides.', 'Two short sides meet at one corner, two long sides meet at the opposite corner, and no sides are parallel.'] },
];

/** Name the quadrilateral from a description. */
function classifyQuad(rng: Rng): GenOutput {
  const q = rng.pick(QUAD_DESCRIPTIONS);
  const text = rng.pick(q.text);
  const near: Record<string, string[]> = {
    Square: ['Rhombus', 'Rectangle', 'Kite'],
    Rectangle: ['Square', 'Parallelogram', 'Trapezoid'],
    Rhombus: ['Square', 'Parallelogram', 'Kite'],
    Parallelogram: ['Rectangle', 'Rhombus', 'Trapezoid'],
    Trapezoid: ['Parallelogram', 'Kite', 'Rectangle'],
    Kite: ['Rhombus', 'Trapezoid', 'Parallelogram'],
  };
  const why: Record<string, string> = {
    Square: 'A square has four equal sides and four right angles.',
    Rectangle: 'A rectangle has four right angles and opposite sides equal. Its sides are not all equal, so it is not a square.',
    Rhombus: 'A rhombus has four equal sides. Without right angles, it is not a square.',
    Parallelogram: 'A parallelogram has both pairs of opposite sides parallel. With no right angles and unequal neighbouring sides, it is not a rectangle or a rhombus.',
    Trapezoid: 'A trapezoid has exactly one pair of parallel sides.',
    Kite: 'A kite has two pairs of equal sides next to each other, and its opposite sides are not parallel.',
  };
  return {
    prompt: `${rng.pick(NAMES)} describes a quadrilateral on a shop drawing: "${text}" What is the most specific name for this shape?`,
    parts: [{ answer: mc(rng, q.name, near[q.name]) }],
    hints: ['Check the sides (equal? parallel?) and the angles (right angles?).', 'Choose the name that matches every part of the description, not just some of it.'],
    solution: [why[q.name], `The shape is a ${q.name.toLowerCase()}.`],
  };
}

/** Parallelogram or rhombus: one angle given; find two others. */
function paraTwo(rng: Rng): GenOutput {
  const rhombus = rng.chance(0.4);
  const { pts, angs } = paraShape(rng, rhombus);
  const N = rng.pick(QUAD_LETTERS);
  const kind = rhombus ? 'rhombus' : 'parallelogram';
  const g = rng.int(0, 3);
  const asks = [(g + 1) % 4, (g + 2) % 4];
  const labels: Array<string | null> = [null, null, null, null];
  labels[g] = degL(angs[g]);
  labels[asks[0]] = '?';
  labels[asks[1]] = '?';
  return {
    prompt: `In ${kind} $${N.join('')}$, $\\angle ${N[g]} = ${deg(angs[g])}$. Find $\\angle ${N[asks[0]]}$ and $\\angle ${N[asks[1]]}$.`,
    figure: quadFigure({ pts, names: N, angles: labels, ...(rhombus ? { ticks: RHOMBUS_TICKS } : PARA_MARKS) }),
    parts: asks.map((k) => numPart(angs[k], { label: `$\\angle ${N[k]} =$`, suffix: '°' })),
    hints: [`Opposite angles of a ${kind} are equal. Consecutive angles add to $180^\\circ$.`, `$\\angle ${N[asks[0]]}$ is next to $\\angle ${N[g]}$, and $\\angle ${N[asks[1]]}$ is opposite it.`],
    solution: [
      `$\\angle ${N[asks[0]]}$ is next to $\\angle ${N[g]}$: $180^\\circ - ${deg(angs[g])} = ${deg(angs[asks[0]])}$`,
      `$\\angle ${N[asks[1]]}$ is opposite $\\angle ${N[g]}$, so it is also $${deg(angs[g])}$.`,
      `$\\angle ${N[asks[0]]} = ${deg(angs[asks[0]])}$ and $\\angle ${N[asks[1]]} = ${deg(angs[asks[1]])}$`,
    ],
  };
}

/** Trapezoid ABCD with AB ∥ DC: base angles → top angles (co-interior angles), or an isosceles trapezoid. */
function trapezoidAngles(rng: Rng): GenOutput {
  const iso = rng.chance(0.5);
  const alpha = rng.int(50, 82);
  const beta = iso ? alpha : retry(() => rng.int(45, 85), (b) => Math.abs(b - alpha) >= 6);
  const N = rng.pick(QUAD_LETTERS);
  const pts = trapPts(alpha, beta, 6, 2.6);
  const who = rng.pick(NAMES);
  const thing = rng.pick(['a trapezoid-shaped window', 'the cross-section of a trapezoid-shaped irrigation ditch', 'a trapezoid-shaped panel for a bridge railing', 'a trapezoid-shaped retaining wall']);
  if (iso) {
    const labels: Array<string | null> = [degL(alpha), '?', '?', null];
    return {
      prompt: `${who} is building ${thing}. It is an isosceles trapezoid $${N.join('')}$ with $${N[0]}${N[1]} \\parallel ${N[3]}${N[2]}$ and equal sides $${N[0]}${N[3]} = ${N[1]}${N[2]}$. If $\\angle ${N[0]} = ${deg(alpha)}$, find $\\angle ${N[1]}$ and $\\angle ${N[2]}$.`,
      figure: quadFigure({ pts, names: N, angles: labels, par: [[0, 1, 1], [3, 2, 1]], ticks: [[0, 3, 1], [1, 2, 1]] }),
      parts: [numPart(alpha, { label: `$\\angle ${N[1]} =$`, suffix: '°' }), numPart(180 - alpha, { label: `$\\angle ${N[2]} =$`, suffix: '°' })],
      hints: ['In an isosceles trapezoid, the two angles on the same parallel side are equal.', `$\\angle ${N[1]}$ and $\\angle ${N[2]}$ are on the same slanted side, between the parallel sides, so they add to $180^\\circ$.`],
      solution: [
        `Base angles of an isosceles trapezoid are equal: $\\angle ${N[1]} = \\angle ${N[0]} = ${deg(alpha)}$.`,
        `$\\angle ${N[1]}$ and $\\angle ${N[2]}$ are co-interior angles between the parallel sides, so they add to $180^\\circ$: $\\angle ${N[2]} = 180^\\circ - ${deg(alpha)} = ${deg(180 - alpha)}$.`,
        `$\\angle ${N[1]} = ${deg(alpha)}$ and $\\angle ${N[2]} = ${deg(180 - alpha)}$`,
      ],
    };
  }
  const labels: Array<string | null> = [degL(alpha), degL(beta), '?', '?'];
  return {
    prompt: `${who} is building ${thing}. It is a trapezoid $${N.join('')}$ with $${N[0]}${N[1]} \\parallel ${N[3]}${N[2]}$. If $\\angle ${N[0]} = ${deg(alpha)}$ and $\\angle ${N[1]} = ${deg(beta)}$, find $\\angle ${N[3]}$ and $\\angle ${N[2]}$.`,
    figure: quadFigure({ pts, names: N, angles: labels, par: [[0, 1, 1], [3, 2, 1]] }),
    parts: [numPart(180 - alpha, { label: `$\\angle ${N[3]} =$`, suffix: '°' }), numPart(180 - beta, { label: `$\\angle ${N[2]} =$`, suffix: '°' })],
    hints: ['Along each slanted side, the two angles are between the parallel sides.', 'Angles on the same side of a line crossing two parallel lines (co-interior angles) add to $180^\\circ$.'],
    solution: [
      `$\\angle ${N[0]}$ and $\\angle ${N[3]}$ are co-interior angles between the parallel sides: $\\angle ${N[3]} = 180^\\circ - ${deg(alpha)} = ${deg(180 - alpha)}$.`,
      `$\\angle ${N[1]}$ and $\\angle ${N[2]}$ are co-interior too: $\\angle ${N[2]} = 180^\\circ - ${deg(beta)} = ${deg(180 - beta)}$.`,
      `Check: $${alpha} + ${beta} + ${180 - beta} + ${180 - alpha} = 360$. So $\\angle ${N[3]} = ${deg(180 - alpha)}$ and $\\angle ${N[2]} = ${deg(180 - beta)}$.`,
    ],
  };
}

/** Kite ABCD with AB = AD and CB = CD: angles at A and C given; find the equal angles at B and D. */
function kiteAngles(rng: Rng): GenOutput {
  const r = retry(
    () => {
      const a = rng.int(25, 60) * 2;
      const c = rng.int(30, 75) * 2;
      return { a, c, b: (360 - a - c) / 2 };
    },
    (x) => x.a !== x.c && x.b >= 50 && x.b <= 140 && Number.isInteger(x.b),
    300,
  );
  const N = rng.pick(QUAD_LETTERS);
  const angA = r.a;
  const angC = r.c;
  const pts = kitePts(angA, angC);
  const thing = rng.pick(['a kite-shaped stained-glass panel', 'a kite-shaped floor tile', 'the frame of a kite for a summer kite festival', 'a kite-shaped sign']);
  return {
    prompt: `${rng.pick(NAMES)} is making ${thing}. Kite $${N.join('')}$ has $${N[0]}${N[1]} = ${N[0]}${N[3]}$ and $${N[2]}${N[1]} = ${N[2]}${N[3]}$. If $\\angle ${N[0]} = ${deg(angA)}$ and $\\angle ${N[2]} = ${deg(angC)}$, find $\\angle ${N[1]}$.`,
    figure: quadFigure({ pts, names: N, angles: [degL(angA), '?', degL(angC), null], ticks: [[0, 1, 1], [0, 3, 1], [2, 1, 2], [2, 3, 2]] }),
    parts: [numPart(r.b, { label: `$\\angle ${N[1]} =$`, suffix: '°' })],
    hints: ['In a kite, the two angles between the unequal sides are equal.', `So $\\angle ${N[1]} = \\angle ${N[3]}$. All four angles add to $360^\\circ$.`],
    solution: [
      `$\\angle ${N[1]} = \\angle ${N[3]}$, and the four angles add to $360^\\circ$.`,
      `$2\\angle ${N[1]} = 360^\\circ - ${deg(angA)} - ${deg(angC)} = ${deg(2 * r.b)}$`,
      `$\\angle ${N[1]} = ${deg(2 * r.b)} \\div 2 = ${deg(r.b)}$`,
    ],
  };
}

/** Rhombus with diagonals: the diagonals bisect the angles and cross at 90°. */
function rhombusDiag(rng: Rng): GenOutput {
  const theta = rng.int(26, 64) * 2; // ∠ABC, even so the halves are whole numbers
  const N = rng.pick(QUAD_LETTERS);
  const pts = paraPts(180 - theta, 5, 5); // ∠A = 180 − θ, ∠B = θ
  const half = theta / 2;
  const other = (180 - theta) / 2;
  const E = rng.pick(['E', 'O', 'M'].filter((x) => !N.includes(x)));
  return {
    prompt: `$${N.join('')}$ is a rhombus, and its diagonals meet at $${E}$. If $\\angle ${N[0]}${N[1]}${N[2]} = ${deg(theta)}$, find $\\angle ${N[0]}${N[1]}${E}$ and $\\angle ${N[1]}${N[0]}${E}$.`,
    figure: quadFigure({ pts, names: N, diagonals: true, centre: E, ticks: RHOMBUS_TICKS, angles: [null, degL(theta), null, null], marks: [{ v: 'E', u: 0, w: 1, label: null, right: true }] }),
    parts: [numPart(half, { label: `$\\angle ${N[0]}${N[1]}${E} =$`, suffix: '°' }), numPart(other, { label: `$\\angle ${N[1]}${N[0]}${E} =$`, suffix: '°' })],
    hints: ['The diagonals of a rhombus cut each corner angle in half, and they cross at $90^\\circ$.', `$\\angle ${N[0]}${N[1]}${E}$ is half of $\\angle ${N[0]}${N[1]}${N[2]}$. Then use the angle sum in $\\triangle ${N[0]}${N[1]}${E}$.`],
    solution: [
      `Diagonal $${N[1]}${N[3]}$ bisects $\\angle ${N[1]}$: $\\angle ${N[0]}${N[1]}${E} = ${deg(theta)} \\div 2 = ${deg(half)}$.`,
      `The diagonals cross at right angles, so $\\angle ${N[0]}${E}${N[1]} = 90^\\circ$.`,
      `In $\\triangle ${N[0]}${N[1]}${E}$: $\\angle ${N[1]}${N[0]}${E} = 180^\\circ - 90^\\circ - ${deg(half)} = ${deg(other)}$.`,
      `$\\angle ${N[0]}${N[1]}${E} = ${deg(half)}$ and $\\angle ${N[1]}${N[0]}${E} = ${deg(other)}$`,
    ],
  };
}

/** Diagonals bisect each other (parallelogram, rectangle, rhombus); a rectangle's diagonals are also equal. */
function diagHalves(rng: Rng): GenOutput {
  const kind = rng.pick(['rectangle', 'parallelogram'] as const);
  const N = rng.pick(QUAD_LETTERS);
  const E = rng.pick(['E', 'O', 'M'].filter((x) => !N.includes(x)));
  const u = rng.pick(['m', 'cm'] as const);
  const ae = u === 'm' ? rng.int(105, 480) / 100 : rng.int(12, 85) + rng.pick([0, 0.5]);
  const be = u === 'm' ? retry(() => rng.int(105, 480) / 100, (x) => Math.abs(x - ae) > 0.3) : retry(() => rng.int(12, 85) + rng.pick([0, 0.5]), (x) => Math.abs(x - ae) > 3);
  const pts = kind === 'rectangle' ? paraPts(90, 5, 3) : paraPts(rng.int(55, 70), 5.5, 3.2);
  const ms = (x: number) => `${fmt(x)}\\ \\text{${u}}`;
  const who = rng.pick(NAMES);
  if (kind === 'rectangle') {
    const story = rng.pick([`${who} is checking the forms for a rectangular concrete pad`, `${who} is squaring a rectangular deck frame`, `${who} is building a rectangular gate`]);
    return {
      prompt: `${story}, $${N.join('')}$. The diagonals meet at $${E}$, and $${N[0]}${E} = ${ms(ae)}$. How long must diagonal $${N[1]}${N[3]}$ be?`,
      figure: quadFigure({ pts, names: N, diagonals: true, centre: E, right: [0, 1, 2, 3], halves: [[0, `${fmt(ae)} ${u}`]] }),
      parts: [numPart(2 * ae, { label: `$${N[1]}${N[3]} =$`, suffix: u })],
      hints: ['The diagonals of a rectangle bisect each other, so $' + `${N[0]}${E}` + '$ is half of diagonal $' + `${N[0]}${N[2]}` + '$.', 'The diagonals of a rectangle are also equal in length.'],
      solution: [`$${N[0]}${E}$ is half of $${N[0]}${N[2]}$: $${N[0]}${N[2]} = 2 \\times ${fmt(ae)} = ${fmt(2 * ae)}$`, `A rectangle's diagonals are equal, so $${N[1]}${N[3]} = ${N[0]}${N[2]}$.`, `$${N[1]}${N[3]} = ${ms(2 * ae)}$`],
    };
  }
  const askAC = rng.chance(0.5);
  const val = askAC ? 2 * ae : 2 * be;
  return {
    prompt: `In parallelogram $${N.join('')}$, the diagonals meet at $${E}$. $${N[0]}${E} = ${ms(ae)}$ and $${N[1]}${E} = ${ms(be)}$. How long is diagonal $${askAC ? `${N[0]}${N[2]}` : `${N[1]}${N[3]}`}$?`,
    figure: quadFigure({ pts, names: N, diagonals: true, centre: E, ...PARA_MARKS, halves: [[0, `${fmt(ae)} ${u}`], [1, `${fmt(be)} ${u}`]] }),
    parts: [numPart(val, { label: `$${askAC ? `${N[0]}${N[2]}` : `${N[1]}${N[3]}`} =$`, suffix: u })],
    hints: ['The diagonals of a parallelogram bisect each other: each is cut into two equal halves.', `Find which half of the diagonal you know, then double it.`],
    solution: askAC
      ? [`$${E}$ is the midpoint of $${N[0]}${N[2]}$, so $${N[0]}${N[2]} = 2 \\times ${N[0]}${E} = 2 \\times ${fmt(ae)} = ${fmt(2 * ae)}$.`, `$${N[0]}${N[2]} = ${ms(2 * ae)}$ (the diagonals of a parallelogram are not equal in general, so $${N[1]}${E}$ is not needed).`]
      : [`$${E}$ is the midpoint of $${N[1]}${N[3]}$, so $${N[1]}${N[3]} = 2 \\times ${N[1]}${E} = 2 \\times ${fmt(be)} = ${fmt(2 * be)}$.`, `$${N[1]}${N[3]} = ${ms(2 * be)}$`],
  };
}

/** Which property is true of every X (but not of every Y)? */
function propertyMC(rng: Rng): GenOutput {
  const items = [
    { q: 'Which property is true of every rhombus but **not** of every parallelogram?', a: 'All four sides are equal.', w: ['Opposite sides are parallel.', 'Opposite angles are equal.', 'The diagonals bisect each other.'], why: 'Every parallelogram has parallel opposite sides, equal opposite angles and diagonals that bisect each other. Only a rhombus also has four equal sides.' },
    { q: 'Which property is true of every rectangle but **not** of every parallelogram?', a: 'The diagonals are equal in length.', w: ['Opposite sides are equal.', 'Consecutive angles add to $180^\\circ$.', 'The diagonals bisect each other.'], why: 'All parallelograms have equal opposite sides, supplementary consecutive angles and diagonals that bisect each other. Only a rectangle (with its right angles) has equal diagonals.' },
    { q: 'Which property is true of every square but **not** of every rectangle?', a: 'The diagonals cross at $90^\\circ$.', w: ['All four angles are $90^\\circ$.', 'The diagonals are equal in length.', 'Opposite sides are parallel.'], why: 'Every rectangle has four right angles and equal diagonals. A square is also a rhombus, so its diagonals cross at right angles.' },
    { q: 'Which statement is true of every kite?', a: 'One pair of opposite angles is equal.', w: ['Both pairs of opposite sides are parallel.', 'All four sides are equal.', 'The diagonals bisect each other.'], why: 'A kite has two pairs of equal adjacent sides. The angles between the unequal sides are equal, but its sides are not parallel and only one diagonal is bisected.' },
    { q: 'Which statement is true of every trapezoid?', a: 'Exactly one pair of opposite sides is parallel.', w: ['Opposite angles are equal.', 'The diagonals are equal in length.', 'Both pairs of opposite sides are equal.'], why: 'A trapezoid is defined by having exactly one pair of parallel sides. Only an isosceles trapezoid has equal diagonals.' },
    { q: 'Which statement about the diagonals of a parallelogram is always true?', a: 'They bisect each other.', w: ['They are equal in length.', 'They cross at $90^\\circ$.', 'They bisect the corner angles.'], why: 'The diagonals of every parallelogram cut each other in half. Equal diagonals happen only in rectangles, and perpendicular diagonals only in rhombuses.' },
  ];
  const it = rng.pick(items);
  return {
    prompt: it.q,
    parts: [{ answer: mc(rng, it.a, it.w) }],
    hints: ['Picture the more general shape (for example, a slanted parallelogram) and check whether each statement still holds.', 'A property that only some of the shapes have is not true of every one of them.'],
    solution: [it.why, `Answer: ${it.a}`],
  };
}

/** Checking a frame for square with its diagonals. */
function squareCheck(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const w = rng.int(24, 60) / 10;
  const l = retry(() => rng.int(30, 90) / 10, (x) => x > w + 0.5);
  const d = Math.hypot(w, l);
  const off = rng.pick([0.04, 0.05, 0.06, 0.08, 0.1, 0.12]);
  const square = rng.chance(0.4);
  const d1 = square ? d : d - off / 2;
  const d2 = square ? d : d + off / 2;
  const job = rng.pick(['the forms for a concrete garage pad', 'a deck frame', 'the wall plates for a shed floor', 'a frame for a hay-storage shed']);
  const correct = square ? 'It is a rectangle: opposite sides are equal and the diagonals are equal.' : 'It is a parallelogram but not a rectangle: the diagonals are not equal, so the corners are not square.';
  const wrong = square
    ? ['It is a parallelogram but not a rectangle: the diagonals are longer than the sides.', 'It might not be a parallelogram: equal diagonals do not tell you anything.', 'It is a square, because the diagonals are equal.']
    : ['It is a rectangle, because opposite sides are equal.', 'It is a rhombus, because the diagonals are not equal.', 'It is a trapezoid, because the diagonals are not equal.'];
  return {
    prompt: `${who} lays out ${job}. Opposite sides measure $${fmtFixed(l, 2)}\\ \\text{m}$ and $${fmtFixed(w, 2)}\\ \\text{m}$. The two diagonals measure $${fmtFixed(d1, 2)}\\ \\text{m}$ and $${fmtFixed(d2, 2)}\\ \\text{m}$. What can ${who} conclude?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['A quadrilateral with both pairs of opposite sides equal is a parallelogram.', 'A parallelogram with equal diagonals is a rectangle (all four corners are square).'],
    solution: [
      'Both pairs of opposite sides are equal, so the frame is a parallelogram.',
      square ? 'The diagonals are equal, and a parallelogram with equal diagonals is a rectangle.' : `The diagonals differ by $${fmtFixed(d2 - d1, 2)}\\ \\text{m}$, so the corners are not square yet. ${who} should push the frame along the longer diagonal until the diagonals match.`,
      correct,
    ],
  };
}

/** Parallelogram with angles as expressions: opposite angles equal or consecutive angles supplementary. */
function paraAlgebra(rng: Rng): GenOutput {
  for (;;) {
    const x = rng.int(8, 35);
    const theta = rng.chance(0.5) ? rng.int(50, 80) : rng.int(100, 130);
    const opposite = rng.chance(0.5);
    const k1 = rng.int(1, 5);
    const k2 = rng.int(1, 5);
    if (opposite && k1 === k2) continue;
    const c1 = theta - k1 * x;
    const v2 = opposite ? theta : 180 - theta;
    const c2 = v2 - k2 * x;
    if (Math.abs(c1) > 60 || Math.abs(c2) > 60 || (c1 === 0 && c2 === 0)) continue;
    const N = rng.pick(QUAD_LETTERS);
    const j = opposite ? 2 : 1;
    const ask = opposite ? 1 : 2;
    const askVal = opposite ? 180 - theta : theta;
    const labels: Array<string | null> = [exprLabel(k1, c1), null, null, null];
    labels[j] = exprLabel(k2, c2);
    const pts = paraPts(theta, 5, 3.4);
    const thing = rng.pick(['a parallelogram-shaped shelf bracket', 'a parallelogram-shaped skylight', 'a parallelogram-shaped parking stall', 'a parallelogram-shaped paving stone']);
    return {
      prompt: `${rng.pick(NAMES)} is designing ${thing}, $${N.join('')}$. $\\angle ${N[0]} = ${exprDeg(k1, c1)}$ and $\\angle ${N[j]} = ${exprDeg(k2, c2)}$. Find $x$, then find $\\angle ${N[ask]}$.`,
      figure: quadFigure({ pts, names: N, angles: labels, ...PARA_MARKS }),
      parts: [numPart(x, { label: '$x =$' }), numPart(askVal, { label: `$\\angle ${N[ask]} =$`, suffix: '°' })],
      hints: [
        opposite ? `$\\angle ${N[0]}$ and $\\angle ${N[2]}$ are opposite angles of a parallelogram, so they are equal.` : `$\\angle ${N[0]}$ and $\\angle ${N[1]}$ are consecutive angles of a parallelogram, so they add to $180^\\circ$.`,
        `Solve for $x$, find $\\angle ${N[0]}$, then use the parallelogram properties again for $\\angle ${N[ask]}$.`,
      ],
      solution: opposite
        ? [`Opposite angles are equal: $${linExpr(k1, c1)} = ${linExpr(k2, c2)}$`, ...solveEqual(k1, c1, k2, c2), `$\\angle ${N[0]} = ${subst(k1, c1, x)} = ${deg(theta)}$`, `$\\angle ${N[1]}$ is next to $\\angle ${N[0]}$: $180^\\circ - ${deg(theta)} = ${deg(180 - theta)}$`, `$x = ${x}$ and $\\angle ${N[1]} = ${deg(180 - theta)}$`]
        : [`Consecutive angles add to $180^\\circ$: $(${linExpr(k1, c1)}) + (${linExpr(k2, c2)}) = 180$`, ...solveSum([[k1, c1], [k2, c2]], 180), `$\\angle ${N[1]} = ${subst(k2, c2, x)} = ${deg(180 - theta)}$`, `$\\angle ${N[2]}$ is opposite $\\angle ${N[0]}$: $\\angle ${N[2]} = \\angle ${N[0]} = ${subst(k1, c1, x)} = ${deg(theta)}$`, `$x = ${x}$ and $\\angle ${N[2]} = ${deg(theta)}$`],
    };
  }
}

/** Isosceles trapezoid with expressions: co-interior angles add to 180°. */
function isoTrapAlgebra(rng: Rng): GenOutput {
  for (;;) {
    const x = rng.int(8, 30);
    const alpha = rng.int(52, 82);
    const k1 = rng.int(1, 4);
    const k2 = rng.int(1, 4);
    const c1 = alpha - k1 * x;
    const c2 = 180 - alpha - k2 * x;
    if (Math.abs(c1) > 50 || Math.abs(c2) > 60) continue;
    const N = rng.pick(QUAD_LETTERS);
    const pts = trapPts(alpha, alpha, 7, 3.4);
    return {
      prompt: `${rng.pick(NAMES)} is framing a window shaped like an isosceles trapezoid, $${N.join('')}$, with $${N[0]}${N[1]} \\parallel ${N[3]}${N[2]}$ and $${N[0]}${N[3]} = ${N[1]}${N[2]}$. $\\angle ${N[0]} = ${exprDeg(k1, c1)}$ and $\\angle ${N[3]} = ${exprDeg(k2, c2)}$. Find $x$, then find $\\angle ${N[2]}$.`,
      figure: quadFigure({ pts, names: N, angles: [exprLabel(k1, c1), null, null, exprLabel(k2, c2)], par: [[0, 1, 1], [3, 2, 1]], ticks: [[0, 3, 1], [1, 2, 1]] }),
      parts: [numPart(x, { label: '$x =$' }), numPart(180 - alpha, { label: `$\\angle ${N[2]} =$`, suffix: '°' })],
      hints: [`$\\angle ${N[0]}$ and $\\angle ${N[3]}$ are co-interior angles between the parallel sides, so they add to $180^\\circ$.`, `In an isosceles trapezoid, $\\angle ${N[2]} = \\angle ${N[3]}$.`],
      solution: [
        `Co-interior angles add to $180^\\circ$: $(${linExpr(k1, c1)}) + (${linExpr(k2, c2)}) = 180$`,
        ...solveSum([[k1, c1], [k2, c2]], 180),
        `$\\angle ${N[3]} = ${subst(k2, c2, x)} = ${deg(180 - alpha)}$`,
        `The trapezoid is isosceles, so $\\angle ${N[2]} = \\angle ${N[3]} = ${deg(180 - alpha)}$.`,
        `$x = ${x}$ and $\\angle ${N[2]} = ${deg(180 - alpha)}$`,
      ],
    };
  }
}

/** A diagonal brace in a rhombus makes a known angle with a side: find the corner angles. */
function rhombusBrace(rng: Rng): GenOutput {
  const phi = rng.int(20, 68);
  const big = 2 * phi;
  const N = rng.pick(QUAD_LETTERS);
  const pts = paraPts(180 - big, 5, 5); // ∠B = 2φ, ∠A = 180 − 2φ
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is building a gate shaped like a rhombus, $${N.join('')}$, with a diagonal brace from $${N[1]}$ to $${N[3]}$. The brace makes an angle of $${deg(phi)}$ with side $${N[0]}${N[1]}$ ($\\angle ${N[0]}${N[1]}${N[3]} = ${deg(phi)}$). Find $\\angle ${N[0]}${N[1]}${N[2]}$ and $\\angle ${N[3]}${N[0]}${N[1]}$.`,
    figure: quadFigure({ pts, names: N, ticks: RHOMBUS_TICKS, brace: [1, 3], marks: [{ v: 1, u: 0, w: 3, label: degL(phi) }] }),
    parts: [numPart(big, { label: `$\\angle ${N[0]}${N[1]}${N[2]} =$`, suffix: '°' }), numPart(180 - big, { label: `$\\angle ${N[3]}${N[0]}${N[1]} =$`, suffix: '°' })],
    hints: ['A diagonal of a rhombus cuts the corner angles at its ends exactly in half.', 'Consecutive angles of a rhombus add to $180^\\circ$.'],
    solution: [
      `Diagonal $${N[1]}${N[3]}$ bisects $\\angle ${N[1]}$, so $\\angle ${N[0]}${N[1]}${N[2]} = 2 \\times ${deg(phi)} = ${deg(big)}$.`,
      `$\\angle ${N[0]}$ is next to $\\angle ${N[1]}$: $\\angle ${N[3]}${N[0]}${N[1]} = 180^\\circ - ${deg(big)} = ${deg(180 - big)}$.`,
      `$\\angle ${N[0]}${N[1]}${N[2]} = ${deg(big)}$ and $\\angle ${N[3]}${N[0]}${N[1]} = ${deg(180 - big)}$`,
    ],
  };
}

/** Gable truss with a king post: pitch angle → angle between the post and a rafter, and the peak angle. */
function kingPost(rng: Rng): GenOutput {
  const b = rng.int(18, 50);
  const N: [string, string, string] = ['L', 'R', 'T'];
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is building a gable roof truss $LRT$ with equal rafters $TL$ and $TR$. Each rafter makes an angle of $${deg(b)}$ with the bottom chord $LR$. A vertical king post runs from the peak $T$ straight down to the bottom chord. Find (a) the angle at the peak, $\\angle LTR$, and (b) the angle between the king post and rafter $TR$.`,
    figure: triangleFigure({ angles: [b, b], names: N, labels: [degL(b), degL(b), null], ticks: [[0, 2, 1], [1, 2, 1]], post: { label: '?' } }),
    parts: [numPart(180 - 2 * b, { label: '(a)', suffix: '°' }), numPart(90 - b, { label: '(b)', suffix: '°' })],
    hints: ['The angles of the truss add to $180^\\circ$.', 'The king post is vertical, so it meets the bottom chord at $90^\\circ$. Look at the right triangle formed by the post, rafter $TR$ and the bottom chord.'],
    solution: [
      `(a) $\\angle LTR = 180^\\circ - ${deg(b)} - ${deg(b)} = ${deg(180 - 2 * b)}$`,
      `(b) In the right triangle with the post: $180^\\circ - 90^\\circ - ${deg(b)} = ${deg(90 - b)}$. (This is half of the peak angle: the post splits the isosceles truss into two matching halves.)`,
      `(a) $${deg(180 - 2 * b)}$; (b) $${deg(90 - b)}$`,
    ],
  };
}

const quadProperties = skill({
  id: 'm303-quad-properties',
  name: 'Properties of triangles and quadrilaterals',
  description: 'Use angle sums and the properties of isosceles triangles, parallelograms, rectangles, rhombuses, squares, trapezoids and kites to find angles and lengths, and classify quadrilaterals.',
  outcomes: ['G2'],
  lessonId: 'm303-3-1',
  gen(rng, d) {
    if (d === 1) return rng.pick<(r: Rng) => GenOutput>([triThird, isoTriangle, quadFourth, paraOne, classifyQuad])(rng);
    if (d === 2) return rng.pick<(r: Rng) => GenOutput>([paraTwo, trapezoidAngles, kiteAngles, rhombusDiag, diagHalves, propertyMC, squareCheck])(rng);
    return rng.pick<(r: Rng) => GenOutput>([paraAlgebra, isoTrapAlgebra, rhombusBrace, kingPost])(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.2 — Angles in regular polygons
// ---------------------------------------------------------------------------

const SUM_RULE = 'The interior angles of a convex polygon with $n$ sides add to $180^\\circ(n - 2)$.';
const EXT_RULE = 'The exterior angles of a convex polygon, one at each vertex, add to $360^\\circ$.';
/** n for which each interior and exterior angle of a regular n-gon is a whole number. */
const NICE_N = [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];

const REG_THINGS: Record<number, string[]> = {
  5: ['a pentagon-shaped gazebo floor', 'a pentagon-shaped sign'],
  6: ['a hex nut', 'a hexagonal floor tile', 'a hexagonal sandbox', 'a hexagonal picnic table'],
  8: ['an octagonal gazebo', 'an octagonal sign', 'an octagonal window', 'an octagonal hot-tub surround'],
  9: ['a nine-sided bandstand floor'],
  10: ['a ten-sided gazebo', 'a decagon-shaped patio'],
  12: ['a twelve-sided pergola', 'a dodecagon-shaped fire pit surround'],
};

/** A regular polygon thing, or just the name. */
function regThing(rng: Rng, n: number): string {
  const list = REG_THINGS[n];
  return list && rng.chance(0.6) ? `${rng.pick(list)} (a ${regName(n)})` : `${article(regName(n))} ${regName(n)}`;
}

/** A convex polygon split into triangles by the diagonals from one vertex. */
function fanFigure(rng: Rng, n: number): PlaneFigure | undefined {
  const pts = polygonPts(rng, polyAngles(rng, n));
  if (!pts) return undefined;
  const s = new Sketch();
  s.polyline([...pts, pts[0]]);
  for (let k = 2; k < n - 1; k++) s.seg(pts[0], pts[k], { color: 'muted', dashed: true });
  return s.build({ margin: 0.6 });
}

function sumOfInterior(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 7, 8, 9, 10, 12]);
  const named = rng.chance(0.6);
  const nm = polyName(n);
  const total = 180 * (n - 2);
  return {
    prompt: named ? `What is the sum of the interior angles of any convex ${nm}?` : `What is the sum of the interior angles of a convex polygon with $${n}$ sides?`,
    figure: n <= 8 ? fanFigure(rng, n) : undefined,
    parts: [numPart(total, { suffix: '°' })],
    hints: [named ? `A ${nm} has $${n}$ sides. Diagonals from one vertex split it into $${n - 2}$ triangles.` : `Diagonals from one vertex split the polygon into $${n} - 2 = ${n - 2}$ triangles.`, SUM_RULE],
    solution: [`${named ? `A ${nm} has $n = ${n}$ sides. ` : ''}${SUM_RULE}`, `$180^\\circ(${n} - 2) = 180^\\circ \\times ${n - 2} = ${deg(total)}$`, `The interior angles add to $${deg(total)}$.`],
  };
}

function eachInterior(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12]);
  const each = (180 * (n - 2)) / n;
  const thing = regThing(rng, n);
  return {
    prompt: `Find the measure of each interior angle of ${thing}.`,
    figure: regularFigure(n, { interior: '?', ticks: true }),
    parts: [numPart(each, { suffix: '°' })],
    hints: ['All the angles of a regular polygon are equal. Find the sum of the interior angles first.', `Each angle $= \\dfrac{180^\\circ(n - 2)}{n}$ with $n = ${n}$.`],
    solution: [`Sum: $180^\\circ(${n} - 2) = ${deg(180 * (n - 2))}$`, `The $${n}$ angles are equal: $${deg(180 * (n - 2))} \\div ${n} = ${deg(each)}$`, `Each interior angle measures $${deg(each)}$.`],
  };
}

function eachExterior(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12]);
  const e = 360 / n;
  return {
    prompt: `Find the measure of each exterior angle of ${regThing(rng, n)}.`,
    figure: regularFigure(n, { exterior: '?', ticks: true }),
    parts: [numPart(e, { suffix: '°' })],
    hints: [EXT_RULE, `A regular polygon with $${n}$ sides has $${n}$ equal exterior angles.`],
    solution: [EXT_RULE, `$360^\\circ \\div ${n} = ${deg(e)}$`, `Each exterior angle measures $${deg(e)}$.`],
  };
}

function nFromExterior(rng: Rng): GenOutput {
  const n = rng.pick(NICE_N);
  const e = 360 / n;
  return {
    prompt: `Each exterior angle of a regular polygon measures $${deg(e)}$. How many sides does the polygon have?`,
    parts: [numPart(n, { suffix: 'sides' })],
    hints: [EXT_RULE, 'Number of sides $= 360^\\circ \\div$ (each exterior angle).'],
    solution: ['The exterior angles add to $360^\\circ$ and are all equal.', `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `The polygon has $${n}$ sides.`],
  };
}

function nFromInterior(rng: Rng): GenOutput {
  const n = rng.pick(NICE_N);
  const each = (180 * (n - 2)) / n;
  const e = 360 / n;
  return {
    prompt: `Each interior angle of a regular polygon measures $${deg(each)}$. How many sides does the polygon have?`,
    parts: [numPart(n, { suffix: 'sides' })],
    hints: ['At each vertex, the interior angle and the exterior angle form a straight angle ($180^\\circ$). Find the exterior angle first.', 'Then divide $360^\\circ$ by the exterior angle.'],
    solution: [`Each exterior angle: $180^\\circ - ${deg(each)} = ${deg(e)}$`, `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `The polygon has $${n}$ sides.`],
  };
}

function nFromSum(rng: Rng): GenOutput {
  const m = rng.int(5, 16);
  const total = 180 * (m - 2);
  return {
    prompt: `The interior angles of a convex polygon add to $${deg(total)}$. How many sides does it have?`,
    parts: [numPart(m, { suffix: 'sides' })],
    hints: [SUM_RULE, `Solve $180(n - 2) = ${total}$.`],
    solution: [`$180(n - 2) = ${total}$`, `$n - 2 = ${total} \\div 180 = ${m - 2}$`, `$n = ${m}$`, `The polygon has $${m}$ sides.`],
  };
}

function missingPolyAngle(rng: Rng): GenOutput {
  const n = rng.pick([5, 6]);
  for (;;) {
    const ang = polyAngles(rng, n);
    const pts = polygonPts(rng, ang);
    if (!pts) continue;
    const u = rng.int(0, n - 1);
    const known = ang.filter((_, i) => i !== u);
    const total = 180 * (n - 2);
    const ks = known.reduce((s, v) => s + v, 0);
    return {
      prompt: `${rng.pick(NAMES)} is laying out a ${polyName(n)}-shaped patio. The figure shows its corner angles. Find $x$.`,
      figure: polygonFigure(pts, ang.map((a, i) => (i === u ? 'x' : degL(a)))),
      parts: [numPart(ang[u], { label: '$x =$', suffix: '°' })],
      hints: ['Count the sides, then find the interior angle sum.', SUM_RULE],
      solution: [`The patio has $${n}$ sides, so its angles add to $180^\\circ(${n} - 2) = ${deg(total)}$.`, `The known angles add to $${known.join(' + ')} = ${ks}$.`, `$x = ${deg(total)} - ${deg(ks)} = ${deg(ang[u])}$`],
    };
  }
}

function ratioIntExt(rng: Rng): GenOutput {
  const k = rng.pick([2, 3, 4, 5, 8, 9, 11]);
  const e = 180 / (k + 1);
  const n = 360 / e;
  const nm = polyName(n);
  return {
    prompt: `Each interior angle of a regular polygon is $${k}$ times as large as each exterior angle. How many sides does the polygon have, and what is each interior angle?`,
    parts: [numPart(n, { label: 'Number of sides:' }), numPart(k * e, { label: 'Each interior angle:', suffix: '°' })],
    hints: ['At each vertex, the interior angle and the exterior angle add to $180^\\circ$.', `Write the interior angle as $${k}e$ and solve $${k}e + e = 180^\\circ$.`],
    solution: [`$${k}e + e = 180^\\circ$, so $${k + 1}e = 180^\\circ$ and $e = ${deg(e)}$.`, `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `Each interior angle: $${k} \\times ${deg(e)} = ${deg(k * e)}$`, `The polygon has $${n}$ sides${POLY[n] ? ` (${article(nm)} ${nm})` : ''}, and each interior angle is $${deg(k * e)}$.`],
  };
}

function diffIntExt(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
  const e = 360 / n;
  const i = 180 - e;
  const diff = i - e;
  return {
    prompt: `Each interior angle of a regular polygon is $${deg(diff)}$ greater than each exterior angle. Find each exterior angle and the number of sides.`,
    parts: [numPart(e, { label: 'Each exterior angle:', suffix: '°' }), numPart(n, { label: 'Number of sides:' })],
    hints: ['The interior and exterior angles at a vertex add to $180^\\circ$.', `Write the interior angle as $e + ${diff}$ and solve $(e + ${diff}) + e = 180$.`],
    solution: [`$(e + ${diff}) + e = 180$`, `$2e = ${180 - diff}$, so $e = ${deg(e)}$.`, `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `Each exterior angle is $${deg(e)}$ and the polygon has $${n}$ sides.`],
  };
}

function sumThenEach(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
  const total = 180 * (n - 2);
  const each = total / n;
  return {
    prompt: `The interior angles of a regular polygon add to $${deg(total)}$. (a) How many sides does it have? (b) What is each interior angle? (c) What is each exterior angle?`,
    parts: [numPart(n, { label: '(a)', suffix: 'sides' }), numPart(each, { label: '(b)', suffix: '°' }), numPart(360 / n, { label: '(c)', suffix: '°' })],
    hints: [SUM_RULE, 'Once you know $n$, divide the sum by $n$ for each interior angle. Each exterior angle is $180^\\circ$ minus the interior angle.'],
    solution: [`$180(n - 2) = ${total}$, so $n - 2 = ${n - 2}$ and $n = ${n}$.`, `Each interior angle: $${deg(total)} \\div ${n} = ${deg(each)}$`, `Each exterior angle: $180^\\circ - ${deg(each)} = ${deg(360 / n)}$ (check: $360^\\circ \\div ${n} = ${deg(360 / n)}$)`, `(a) $${n}$ sides; (b) $${deg(each)}$; (c) $${deg(360 / n)}$`],
  };
}

function polyAlgebra(rng: Rng): GenOutput {
  const n = rng.pick([5, 6]);
  const names = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, n);
  for (;;) {
    const ang = polyAngles(rng, n);
    const x = rng.int(12, 40);
    const k = ang.map(() => rng.int(1, 4));
    const c = ang.map((a, i) => a - k[i] * x);
    const exprIdx = rng.sample([...ang.keys()], rng.int(2, 3)).sort((a, b) => a - b);
    if (exprIdx.some((i) => Math.abs(c[i]) > 60)) continue;
    const exprs = exprIdx.map((i) => linExpr(k[i], c[i]));
    if (new Set(exprs).size < exprs.length) continue;
    const pts = polygonPts(rng, ang);
    if (!pts) continue;
    const total = 180 * (n - 2);
    const terms: Array<[number, number]> = exprIdx.map((i) => [k[i], c[i]]);
    const keep = [...ang.keys()].filter((i) => !exprIdx.includes(i));
    const knownSum = keep.reduce((sum, i) => sum + ang[i], 0);
    const ask = exprIdx.reduce((best, i) => (ang[i] > ang[best] ? i : best), exprIdx[0]);
    const list = ang.map((a, i) => `$\\angle ${names[i]} = ${exprIdx.includes(i) ? exprDeg(k[i], c[i]) : deg(a)}$`);
    return {
      prompt: `A landscaper designs a ${polyName(n)}-shaped flower bed $${names.join('')}$ with ${list.slice(0, -1).join(', ')} and ${list[n - 1]}. Find $x$, then find the measure of $\\angle ${names[ask]}$.`,
      figure: polygonFigure(pts, ang.map(() => ''), names),
      parts: [numPart(x, { label: '$x =$' }), numPart(ang[ask], { label: `$\\angle ${names[ask]} =$`, suffix: '°' })],
      hints: [SUM_RULE, 'Add all the angles, set the sum equal to the angle sum for this polygon, and solve for $x$. Then substitute.'],
      solution: [
        `The angles of a ${polyName(n)} add to $180^\\circ(${n} - 2) = ${deg(total)}$.`,
        `$${ang.map((a, i) => (exprIdx.includes(i) ? (c[i] === 0 ? coefX(k[i]) : `(${linExpr(k[i], c[i])})`) : String(a))).join(' + ')} = ${total}$`,
        ...solveSum([[0, knownSum], ...terms], total),
        `Substitute $x = ${x}$: $\\angle ${names[ask]} = ${subst(k[ask], c[ask], x)} = ${deg(ang[ask])}$`,
        `$x = ${x}$ and $\\angle ${names[ask]} = ${deg(ang[ask])}$`,
      ],
    };
  }
}

const polygonAngles = skill({
  id: 'm303-polygon-angles',
  name: 'Angles in polygons',
  description: 'Find the interior angle sum of a polygon, the interior and exterior angles of a regular polygon, and the number of sides from an angle.',
  outcomes: ['G2'],
  lessonId: 'm303-3-2',
  gen(rng, d) {
    if (d === 1) return rng.pick<(r: Rng) => GenOutput>([sumOfInterior, eachInterior, eachInterior, eachExterior])(rng);
    if (d === 2) return rng.pick<(r: Rng) => GenOutput>([nFromExterior, nFromInterior, nFromSum, missingPolyAngle, missingPolyAngle])(rng);
    return rng.pick<(r: Rng) => GenOutput>([ratioIntExt, diffIntExt, sumThenEach, polyAlgebra])(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.3 — Problems with polygons
// ---------------------------------------------------------------------------

const MITRE_RULE = 'For a frame shaped like a regular polygon with $n$ sides, each joint turns through one exterior angle, $\\dfrac{360^\\circ}{n}$, and the two pieces share it equally. So the mitre saw is set to half an exterior angle: $\\dfrac{180^\\circ}{n}$.';

/** Perimeter of a regular polygon from the side length, or the side length from the perimeter. */
function perimeterRegular(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 10, 12]);
  const who = rng.pick(NAMES);
  const toPer = rng.chance(0.55);
  const thing = rng.pick(n === 6 ? ['sandbox', 'raised garden bed', 'hot-tub surround'] : n === 8 ? ['gazebo floor', 'deck', 'raised garden bed'] : ['gazebo floor', 'flower bed', 'patio']);
  if (toPer) {
    const side = rng.int(6, 30) / 10;
    const per = Math.round(n * side * 100) / 100;
    return {
      prompt: `${who} is building a ${thing} shaped like a ${regName(n)}. Each side is $${fmt(side)}\\ \\text{m}$ long. How much edging is needed to go all the way around?`,
      figure: regularFigure(n, { ticks: true }),
      parts: [numPart(per, { suffix: 'm' })],
      hints: [`A regular ${polyName(n)} has $${n}$ equal sides.`, 'Perimeter = number of sides × side length.'],
      solution: [`Perimeter: $${n} \\times ${fmt(side)} = ${fmt(per)}$`, `${who} needs $${fmt(per)}\\ \\text{m}$ of edging.`],
    };
  }
  const side = rng.int(6, 30) / 10;
  const per = Math.round(n * side * 100) / 100;
  return {
    prompt: `${who} has $${fmt(per)}\\ \\text{m}$ of edging for a ${thing} shaped like a ${regName(n)}, and wants to use all of it. How long is each side?`,
    figure: regularFigure(n, { ticks: true }),
    parts: [numPart(per / n, { suffix: 'm' })],
    hints: [`A regular ${polyName(n)} has $${n}$ equal sides.`, 'Side length = perimeter ÷ number of sides.'],
    solution: [`Each side: $${fmt(per)} \\div ${n} = ${fmt(per / n)}$`, `Each side is $${fmt(per / n)}\\ \\text{m}$ long.`],
  };
}

/** Mitre saw setting for a regular n-sided frame: 180°/n. */
function mitreAngle(rng: Rng): GenOutput {
  const n = rng.pick([4, 5, 6, 8, 9, 10, 12]);
  const m = 180 / n;
  const thing = rng.pick(['picture frame', 'mirror frame', 'planter box', 'clock frame', 'window trim']);
  return {
    prompt: `${rng.pick(NAMES)} is making a ${thing} shaped like a ${regName(n)} from strips of moulding. ${MITRE_RULE} What should the mitre saw be set to?`,
    figure: regularFigure(n, { frame: true }),
    parts: [numPart(m, { suffix: '°' })],
    hints: [`Each exterior angle of a regular ${polyName(n)} is $360^\\circ \\div ${n}$.`, 'The saw setting is half of that.'],
    solution: [`Each exterior angle: $360^\\circ \\div ${n} = ${deg(360 / n)}$`, `Half of it: $${deg(360 / n)} \\div 2 = ${deg(m)}$ (the same as $180^\\circ \\div ${n}$)`, `Set the mitre saw to $${deg(m)}$.`],
  };
}

/** Interior angle at the corner of a sign or tile, in context. */
function signCorner(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 10, 12]);
  const each = (180 * (n - 2)) / n;
  const who = rng.pick(NAMES);
  const job = rng.pick([
    { s: `${who} runs a sign shop and cuts a sign shaped like a ${regName(n)} from aluminum.`, q: 'What angle is each corner of the sign?' },
    { s: `${who} is building a gazebo whose floor is a ${regName(n)}.`, q: 'What angle do the floor rims make at each corner?' },
    { s: `${who} is tiling a floor with tiles shaped like ${regName(n)}s.`, q: 'What is the angle at each corner of a tile?' },
  ]);
  return {
    prompt: `${job.s} ${job.q}`,
    figure: regularFigure(n, { interior: '?', ticks: true }),
    parts: [numPart(each, { suffix: '°' })],
    hints: [SUM_RULE, `Divide the sum by $${n}$, because all the angles of a regular polygon are equal.`],
    solution: [`Sum: $180^\\circ(${n} - 2) = ${deg(180 * (n - 2))}$`, `Each corner: $${deg(180 * (n - 2))} \\div ${n} = ${deg(each)}$`, `Each corner is $${deg(each)}$.`],
  };
}

/** Number of sides from the mitre setting. */
function nFromMitre(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18]);
  const m = 180 / n;
  return {
    prompt: `${rng.pick(NAMES)} sets a mitre saw to $${deg(m)}$ and cuts identical pieces of trim to make a frame shaped like a regular polygon. ${MITRE_RULE} How many sides will the frame have, and what is each interior angle of the frame?`,
    parts: [numPart(n, { label: 'Number of sides:' }), numPart(180 - 360 / n, { label: 'Each interior angle:', suffix: '°' })],
    hints: ['The saw setting is $\\dfrac{180^\\circ}{n}$. Solve for $n$.', 'Each exterior angle is twice the saw setting. The interior angle is $180^\\circ$ minus the exterior angle.'],
    solution: [`$\\dfrac{180^\\circ}{n} = ${deg(m)}$, so $n = 180^\\circ \\div ${deg(m)} = ${n}$.`, `Each exterior angle: $2 \\times ${deg(m)} = ${deg(2 * m)}$`, `Each interior angle: $180^\\circ - ${deg(2 * m)} = ${deg(180 - 2 * m)}$`, `The frame has $${n}$ sides, and each interior angle is $${deg(180 - 2 * m)}$.`],
  };
}

/** Which regular polygon tiles a floor by itself? */
function tilingMC(rng: Rng): GenOutput {
  const tiles = rng.chance(0.5);
  const good = rng.pick([3, 4, 6]);
  const bad = rng.sample([5, 8, 10, 12], 3);
  const nameOf = (n: number) => `${cap(article(regName(n)))} ${regName(n)} (each angle $${deg(fmt(180 - 360 / n, 2))}$)`;
  if (tiles) {
    return {
      prompt: `A tile company wants floor tiles that are all the same regular polygon and fit together around each corner with no gaps or overlaps. Which shape works?`,
      parts: [{ answer: mc(rng, nameOf(good), bad.map(nameOf)) }],
      hints: ['At each corner where tiles meet, the angles must add to exactly $360^\\circ$.', 'So each interior angle must divide evenly into $360^\\circ$.'],
      solution: [
        `$${deg(fmt(180 - 360 / good, 2))}$ goes into $360^\\circ$ exactly $${360 / (180 - 360 / good)}$ times, so ${regName(good)}s fit around a point.`,
        ...bad.map((n) => `${cap(regName(n))}: $360 \\div ${fmt(180 - 360 / n, 2)} \\approx ${fmt(360 / (180 - 360 / n), 2)}$, not a whole number.`),
        `The ${regName(good)} works.`,
      ],
    };
  }
  const n = rng.pick([5, 8, 10, 12]);
  const each = 180 - 360 / n;
  const fit = Math.floor(360 / each);
  const gap = 360 - fit * each;
  return {
    prompt: `${rng.pick(NAMES)} tries to tile a floor using only ${regName(n)}s, each with interior angles of $${deg(fmt(each, 2))}$. When as many tiles as possible meet at one corner, what angle is left uncovered?`,
    figure: vertexFigure(Array(fit).fill(n), '?'),
    parts: [numPart(gap, { suffix: '°' })],
    hints: [`How many angles of $${deg(fmt(each, 2))}$ fit into $360^\\circ$ without going over?`, 'Subtract their total from $360^\\circ$.'],
    solution: [`$${fit} \\times ${deg(fmt(each, 2))} = ${deg(fit * each)}$, and one more would go past $360^\\circ$.`, `Gap: $360^\\circ - ${deg(fit * each)} = ${deg(gap)}$`, `A gap of $${deg(gap)}$ is left, so ${regName(n)}s cannot tile a floor by themselves.`],
  };
}

/** Central angle of a regular polygon (gazebo rafters, spokes). */
function centralAngle(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12]);
  const c = 360 / n;
  const who = rng.pick(NAMES);
  const job = rng.pick([
    `${who} is building a gazebo with a floor shaped like a ${regName(n)}. Floor joists run from the centre to each corner.`,
    `${who} is laying out a ${regName(n)}-shaped fire pit patio. Lines are chalked from the centre to each corner.`,
    `${who} is building a ${regName(n)}-shaped picnic table top. Boards meet at the centre, with a seam running from the centre to each corner.`,
  ]);
  return {
    prompt: `${job} What is the angle at the centre between two neighbouring lines (the central angle)?`,
    figure: regularFigure(n, { central: '?' }),
    parts: [numPart(c, { suffix: '°' })],
    hints: ['The lines from the centre split the full turn around the centre into equal angles.', `There are $${n}$ equal angles around the centre.`],
    solution: [`A full turn is $360^\\circ$, split into $${n}$ equal angles.`, `$360^\\circ \\div ${n} = ${deg(c)}$`, `The central angle is $${deg(c)}$.`],
  };
}

/** Two kinds of regular tiles around a point: find the gap and the regular polygon that fills it. */
function tilingGap(rng: Rng): GenOutput {
  const sets: Array<{ ns: number[]; fill: number }> = [
    { ns: [8, 8], fill: 4 },
    { ns: [12, 12], fill: 3 },
    { ns: [6, 4, 4], fill: 3 },
    { ns: [6, 6], fill: 6 },
    { ns: [4, 3, 3, 3], fill: 4 },
    { ns: [5, 5], fill: 10 },
    { ns: [6, 3, 3], fill: 6 },
    { ns: [4, 4, 3], fill: 6 },
    { ns: [12, 4], fill: 6 },
  ];
  const st = rng.pick(sets);
  const angs = st.ns.map((n) => 180 - 360 / n);
  const used = angs.reduce((s, a) => s + a, 0);
  const gap = 360 - used;
  const WORDS = ['', 'one', 'two', 'three', 'four'];
  const kinds = st.ns.filter((n, i) => st.ns.indexOf(n) === i);
  const list = kinds.map((n) => {
    const count = st.ns.filter((m) => m === n).length;
    return count === 1 ? `${article(regName(n))} ${regName(n)}` : `${WORDS[count]} ${regName(n)}s`;
  });
  const listText = list.length === 1 ? list[0] : `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`;
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is designing a tile pattern for a restaurant floor. At one corner, ${listText} meet, with no overlaps. (a) What angle is left to fill at that corner? (b) A regular polygon will fill the gap exactly. How many sides does it have?`,
    figure: vertexFigure(st.ns, '?'),
    parts: [numPart(gap, { label: '(a)', suffix: '°' }), numPart(st.fill, { label: '(b)', suffix: 'sides' })],
    hints: ['Find the interior angle of each regular polygon. The angles around a point add to $360^\\circ$.', 'For (b), find the regular polygon whose interior angle equals the gap: its exterior angle is $180^\\circ$ minus the gap.'],
    solution: [
      ...kinds.map((n) => `${cap(regName(n))}: $\\dfrac{180^\\circ(${n} - 2)}{${n}} = ${deg(180 - 360 / n)}$`),
      `Gap: $360^\\circ - (${angs.map((a) => fmt(a)).join(' + ')})^\\circ = ${deg(gap)}$`,
      `A regular polygon with interior angle $${deg(gap)}$ has exterior angle $180^\\circ - ${deg(gap)} = ${deg(180 - gap)}$, so $n = 360^\\circ \\div ${deg(180 - gap)} = ${st.fill}$.`,
      `(a) $${deg(gap)}$; (b) $${st.fill}$ sides (${article(regName(st.fill))} ${regName(st.fill)})`,
    ],
  };
}

/** A regular polygon floor split into triangles from the centre: central angle and base angles. */
function floorTriangles(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12]);
  const c = 360 / n;
  const base = (180 - c) / 2;
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is building a gazebo floor shaped like a ${regName(n)}. It is made of $${n}$ identical triangular sections that meet at the centre. Each section is an isosceles triangle with its two equal sides running from the centre to two neighbouring corners. Find (a) the angle of each section at the centre and (b) each of the other two angles of a section.`,
    figure: regularFigure(n, { central: '?' }),
    parts: [numPart(c, { label: '(a)', suffix: '°' }), numPart(base, { label: '(b)', suffix: '°' })],
    hints: ['The angles at the centre add to $360^\\circ$.', 'Each section is isosceles, so its two other angles are equal. Use the angle sum of a triangle.'],
    solution: [
      `(a) $360^\\circ \\div ${n} = ${deg(c)}$`,
      `(b) $\\dfrac{180^\\circ - ${deg(c)}}{2} = \\dfrac{${deg(180 - c)}}{2} = ${deg(base)}$`,
      `Check: two of these angles meet at each corner of the floor, $2 \\times ${deg(base)} = ${deg(2 * base)}$, which is the interior angle of a ${regName(n)}.`,
      `(a) $${deg(c)}$; (b) $${deg(base)}$`,
    ],
  };
}

/** Frame from a length of moulding and a mitre setting: number of sides and length of each piece. */
function frameFromMitre(rng: Rng): GenOutput {
  const n = rng.pick([5, 6, 8, 9, 10, 12]);
  const m = 180 / n;
  const side = rng.int(15, 60) / 100;
  const total = Math.round(n * side * 100) / 100;
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} has a mitre saw set to $${deg(m)}$ and $${fmt(total)}\\ \\text{m}$ of moulding. ${MITRE_RULE} ${who} cuts identical pieces to make one regular frame and uses all the moulding (measured along the outside edge, with no waste). (a) How many sides does the frame have? (b) How long is each piece along its outside edge? (c) What is each interior angle of the frame?`,
    parts: [numPart(n, { label: '(a)', suffix: 'sides' }), numPart(total / n, { label: '(b)', suffix: 'm' }), numPart(180 - 360 / n, { label: '(c)', suffix: '°' })],
    hints: ['The saw setting is $\\dfrac{180^\\circ}{n}$, so $n = 180^\\circ \\div$ setting.', 'Share the moulding equally among the sides. The exterior angle is twice the saw setting.'],
    solution: [
      `(a) $n = 180^\\circ \\div ${deg(m)} = ${n}$`,
      `(b) $${fmt(total)} \\div ${n} = ${fmt(total / n)}$, so each piece is $${fmt(total / n)}\\ \\text{m}$.`,
      `(c) Exterior angle: $2 \\times ${deg(m)} = ${deg(2 * m)}$. Interior angle: $180^\\circ - ${deg(2 * m)} = ${deg(180 - 2 * m)}$.`,
      `(a) $${n}$ sides; (b) $${fmt(total / n)}\\ \\text{m}$; (c) $${deg(180 - 2 * m)}$`,
    ],
  };
}

const polygonApply = skill({
  id: 'm303-polygon-apply',
  name: 'Design problems with polygons',
  description: 'Solve design and construction problems with regular polygons: perimeters, corner angles, mitre cuts (180°/n), central angles and tiling.',
  outcomes: ['G2'],
  lessonId: 'm303-3-3',
  gen(rng, d) {
    if (d === 1) return rng.pick<(r: Rng) => GenOutput>([perimeterRegular, mitreAngle, signCorner])(rng);
    if (d === 2) return rng.pick<(r: Rng) => GenOutput>([nFromMitre, tilingMC, centralAngle, centralAngle])(rng);
    return rng.pick<(r: Rng) => GenOutput>([tilingGap, floorTriangles, frameFromMitre])(rng);
  },
});

export const POLYGONS_SKILLS: SkillDef[] = [quadProperties, polygonAngles, polygonApply];
