/** Math 7 Unit 7 — Circles and Area (SS1, SS2). */
import { numPart, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Talia', 'Yusuf', 'Rosalie', 'Nathan', 'Tanis',
];

const tx = (u: string) => `\\text{${u}}`;
const sq = (u: string) => `\\text{${u}}^2`;
/** Remove floating-point noise from an exact decimal. */
const exact = (x: number) => roundTo(x, 9);
/** Thin-space grouping for numbers with 5 or more digits before the decimal point (12\,345.6). */
function grp(t: string): string {
  const [i, f] = t.split('.');
  const g = i.replace('-', '').length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f ? `${g}.${f}` : g;
}
/** A number in maths (trailing zeros dropped). */
const n = (x: number) => grp(fmt(exact(x), 6));
/** A number with exactly dp decimals. */
const nf = (x: number, dp: number) => grp(fmtFixed(x, dp));
/** Areas of 1000 or more are rounded to the nearest whole unit, smaller ones to the nearest tenth. */
const dpFor = (v: number) => (v >= 1000 ? 0 : 1);
/** A length in maths: $12\ \text{cm}$. */
const len = (x: number, u: string) => `$${n(x)}\\ ${tx(u)}$`;
/** An area in maths: $12\ \text{cm}^2$. */
const ar = (x: number, u: string) => `$${n(x)}\\ ${sq(u)}$`;
/** A rounded area in maths. */
const arR = (x: number, u: string, dp = 1) => `$${nf(x, dp)}\\ ${sq(u)}$`;
const lenR = (x: number, u: string, dp = 1) => `$${nf(x, dp)}\\ ${tx(u)}$`;
/** Plain-text label for figures: "12 cm". */
const lab = (x: number, u: string) => `${fmt(exact(x))} ${u}`;
const deg = (x: number) => `${fmt(x)}^\\circ`;

const UNIT: Record<string, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre' };
/** "to the nearest tenth of a centimetre" */
const lenRound = (dp: number, u: string) => (dp === 0 ? `to the nearest ${UNIT[u]}` : `${roundingPhrase(dp)} of a ${UNIT[u]}`);
/** "to the nearest tenth of a square metre" */
const sqRound = (dp: number, u: string) => (dp === 0 ? `to the nearest square ${UNIT[u]}` : `${roundingPhrase(dp)} of a square ${UNIT[u]}`);

/** True when v sits on (or very near) a ...5 rounding boundary at dp places. */
function nearHalf(v: number, dp: number): boolean {
  const x = Math.abs(v) * 10 ** dp;
  return Math.abs(x - Math.floor(x) - 0.5) < 0.05;
}

const PI_HINT = 'Use the $\\pi$ key on your calculator, and round only at the end.';

// ---------------------------------------------------------------------------
// Figures: shapes drawn on a plane with no axes, with labels placed clear of the lines.
// The layout code is adapted from the Math 20-2 angles unit (Sketch).
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const r3 = (x: number) => Math.round(x * 1000) / 1000;
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

/** Approximate rendered width (px) of a 12 px bold figure label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === '°' ? 5 : ch === ' ' || ch === '.' ? 3.5 : ch === 'm' ? 10.5 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color; fill?: boolean }> = [];
  private dots: P[] = [];
  private obstacles: Array<[P, P]> = [];
  private pending: PendingLabel[] = [];

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    this.obstacles.push([from, to]);
    return this;
  }

  polyline(points: P[], color: Color = 'brand', fill = false) {
    this.polys.push({ points, color, fill });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  /** A closed polygon. */
  polygon(points: P[], color: Color = 'brand', fill = false) {
    return this.polyline([...points, points[0]], color, fill);
  }

  /** Arc around c from angle a0 counterclockwise through `span` degrees. */
  arc(c: P, r: number, a0: number, span: number, color: Color = 'brand') {
    const k = Math.max(8, Math.ceil(span / 6));
    const pts: P[] = [];
    for (let i = 0; i <= k; i++) pts.push(at(c, a0 + (span * i) / k, r));
    return this.polyline(pts, color);
  }

  circle(c: P, r: number, color: Color = 'brand', fill = false) {
    const pts: P[] = [];
    for (let i = 0; i <= 60; i++) pts.push(at(c, i * 6, r));
    return this.polyline(pts, color, fill);
  }

  /** Square right-angle mark at v between directions a0 and a0 + 90 (degrees). */
  rightMark(v: P, a0: number, s = 0.32) {
    const p1 = at(v, a0, s);
    const p2 = at(p1, a0 + 90, s);
    const p3 = at(v, a0 + 90, s);
    this.polys.push({ points: [p1, p2, p3], color: 'accent' });
    this.obstacles.push([p1, p2], [p2, p3]);
    return this;
  }

  dot(p: P) {
    this.dots.push(p);
    return this;
  }

  /** A label beside segment a-b, on the side of direction `side` (degrees) first, then the other side. */
  sideLabel(a: P, b: P, text: string, side: number, both = true) {
    const m = mid(a, b);
    const along = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        const hw = textWidth(text) / 2;
        for (const s of both ? [side, side + 180] : [side]) {
          const c = Math.abs(Math.cos(rad(s)));
          const base = c * hw + (1 - c) * 7 + 5;
          for (const shift of [0, 10, -10, 20, -20, 32, -32])
            for (const extra of [0, 4, 8, 13, 19, 26]) out.push(at(at(m, s, (base + extra) / ppu), along, shift / ppu));
        }
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

  /** Text near c (tries rings of growing radius). */
  near(c: P, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [c];
        for (const rpx of [8, 14, 20, 28, 38]) for (let k = 0; k < 12; k++) out.push(at(c, k * 30 + 90, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  build(caption?: string, margin = 0.5): PlaneFigure {
    const pts: P[] = [...this.segs.flatMap((s) => [s.from, s.to] as P[]), ...this.polys.flatMap((p) => p.points), ...this.dots];
    let minX = Math.min(...pts.map((p) => p[0])) - margin;
    let maxX = Math.max(...pts.map((p) => p[0])) + margin;
    let minY = Math.min(...pts.map((p) => p[1])) - margin;
    let maxY = Math.max(...pts.map((p) => p[1])) + margin;
    // Room for labels around the shape.
    const padX = (maxX - minX) * 0.1 + 0.4;
    const padY = (maxY - minY) * 0.08 + 0.4;
    minX -= padX;
    maxX += padX;
    minY -= padY;
    maxY += padY;
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
      const hw = (wpx / 2 + 1.5) / ppu;
      const hh = 6.5 / ppu;
      let best: { c: P; score: number } | null = null;
      for (const c of lab.cands(ppu)) {
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
            tc = Math.min(tc, distPtBox(d, box) - 6 / ppu);
            ac = Math.min(ac, Math.hypot(A[0] - d[0], A[1] - d[1]) - 11 / ppu);
          }
          score = Math.min(tc, ac) * ppu;
        }
        if (!best || score > best.score) best = { c, score };
        if (score >= 4) break;
      }
      const c = best!.c;
      placed.push({ x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh });
      anchors.push({ x: c[0] - (8 + wpx / 2) / ppu, y: c[1] - 12.3 / ppu, label: lab.text, color: 'muted', open: true });
    }

    const T = (p: P): [number, number] => [r3(p[0] - ox), r3(p[1] - oy)];
    const fig: PlaneFigure = {
      type: 'plane',
      grid: { xMin: 0, xMax: xr, yMin: 0, yMax: yr, step: Math.max(xr, yr) },
      hideTickLabels: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.color ? { color: p.color } : {}), ...(p.fill ? { fill: true } : {}) })),
      points: [
        ...this.dots.map((d) => {
          const [x, y] = T(d);
          return { x, y, color: 'brand' } as PlanePoint;
        }),
        ...anchors.map((a) => {
          const [x, y] = T([a.x, a.y]);
          return { ...a, x, y };
        }),
      ],
      ...(caption ? { caption } : {}),
    };
    if (this.segs.length) fig.segments = this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) }));
    return fig;
  }
}

/** A vertical dimension line at x = dx from y0 to y1 with end ticks, and a dashed leader from `from` to its top. */
function dimLine(sk: Sketch, from: P, dx: number, y0: number, y1: number) {
  sk.seg([dx, y0], [dx, y1], { color: 'muted' });
  sk.seg([dx - 0.15, y1], [dx + 0.15, y1], { color: 'muted' }).seg([dx - 0.15, y0], [dx + 0.15, y0], { color: 'muted' });
  sk.seg(from, [dx - 0.15, y1], { color: 'muted', dashed: true });
}

/** A rectangle w × h1 with a triangle of height h2 on top; the roof height is shown with a dimension line. */
export function houseFigure(w: number, h1: number, h2: number, unit: string, caption?: string): PlaneFigure {
  const sk = new Sketch();
  const s = scaleFor(w, h1 + h2, 6);
  const ww = w * s;
  const a1 = h1 * s;
  const a2 = h2 * s;
  const ax = ww / 2;
  sk.polygon([[0, 0], [ww, 0], [ww, a1], [ax, a1 + a2], [0, a1]]);
  sk.seg([0, a1], [ww, a1], { color: 'muted' });
  sk.seg([ax, a1 + a2], [ax, a1], { color: 'accent', dashed: true }).rightMark([ax, a1], 0, 0.25);
  const dx = ww + 0.45;
  dimLine(sk, [ax, a1 + a2], dx, a1, a1 + a2);
  sk.sideLabel([0, 0], [ww, 0], lab(w, unit), -90, false).sideLabel([0, 0], [0, a1], lab(h1, unit), 180, false).sideLabel([dx, a1], [dx, a1 + a2], lab(h2, unit), 0, false);
  return sk.build(caption);
}

/** Drawing scale so the larger of w and h becomes `size` units. */
const scaleFor = (w: number, h: number, size = 6) => size / Math.max(w, h);

/** A circle with its radius or diameter drawn and labelled. */
export function circleFigure(show: 'r' | 'd', text: string, angle = 25, caption?: string): PlaneFigure {
  const R = 3;
  const O: P = [0, 0];
  const s = new Sketch().circle(O, R).dot(O);
  if (show === 'r') {
    const E = at(O, angle, R);
    s.seg(O, E, { color: 'accent' }).sideLabel(O, E, text, angle + 90);
  } else {
    const E1 = at(O, angle + 180, R);
    const E2 = at(O, angle, R);
    s.seg(E1, E2, { color: 'accent' }).sideLabel(E1, E2, text, angle + 90);
  }
  return s.build(caption);
}

/** A circle divided into sectors by radii; each sector is labelled at its middle. */
export function sectorFigure(angles: number[], labels: string[], start = 90, caption?: string): PlaneFigure {
  const R = 3;
  const O: P = [0, 0];
  const s = new Sketch().circle(O, R).dot(O);
  let a = start;
  angles.forEach((t, i) => {
    s.seg(O, at(O, a, R));
    s.textAt(at(O, a + t / 2, t < 50 ? 2.05 : 1.75), labels[i]);
    a += t;
  });
  return s.build(caption);
}

interface ParaOpts {
  b: number;
  h: number;
  /** Horizontal offset of the top side (may exceed b: the height then falls outside). */
  s: number;
  base: string;
  height: string;
  slant?: string;
  caption?: string;
  /** A rectangle (x, y, w, h in real units) drawn inside, for cut-out questions. */
  hole?: [number, number, number, number];
  holeLabels?: [string, string];
}

/** A parallelogram with its base, dashed height (with a right-angle mark) and optional slanted side labelled. */
export function paraFigure(o: ParaOpts): PlaneFigure {
  const k = scaleFor(o.b + o.s, o.h);
  const B = o.b * k;
  const H = o.h * k;
  const S = o.s * k;
  const A: P = [0, 0];
  const Bp: P = [B, 0];
  const C: P = [B + S, H];
  const D: P = [S, H];
  const sk = new Sketch().polygon([A, Bp, C, D]);
  sk.sideLabel(A, Bp, o.base, -90, false);
  const foot: P = [S, 0];
  if (S > B - 0.6) {
    sk.seg(Bp, foot, { color: 'muted', dashed: true }).seg(D, foot, { color: 'accent', dashed: true }).rightMark(foot, 90);
    sk.sideLabel(foot, D, o.height, 0);
  } else {
    // Drop the height from the middle of the part of the top side that lies above the base.
    const x = S + (B - S) * 0.5;
    sk.seg([x, H], [x, 0], { color: 'accent', dashed: true }).rightMark([x, 0], 0);
    sk.sideLabel([x, 0], [x, H], o.height, 0);
  }
  if (o.slant) sk.sideLabel(A, D, o.slant, (Math.atan2(H, S) * 180) / Math.PI + 90, false);
  if (o.hole) {
    const [hx, hy, hw, hh] = o.hole.map((v) => v * k);
    const pts: P[] = [[hx, hy], [hx + hw, hy], [hx + hw, hy + hh], [hx, hy + hh]];
    sk.polygon(pts, 'accent');
    if (o.holeLabels) {
      sk.sideLabel(pts[0], pts[1], o.holeLabels[0], 90);
      sk.sideLabel(pts[1], pts[2], o.holeLabels[1], 180);
    }
  }
  return sk.build(o.caption);
}

interface TriOpts {
  b: number;
  h: number;
  /** x-coordinate of the apex (0 = right angle at the left end; < 0 or > b = obtuse, height outside). */
  p: number;
  base: string;
  height: string;
  /** Labels for the left side (A to apex) and right side (B to apex). */
  left?: string;
  right?: string;
  caption?: string;
}

/** A triangle with its base and dashed height labelled (the height may fall outside the triangle). */
export function triFigure(o: TriOpts): PlaneFigure {
  const x0 = Math.min(0, o.p);
  const x1 = Math.max(o.b, o.p);
  const k = scaleFor(x1 - x0, o.h);
  const B = o.b * k;
  const H = o.h * k;
  const X = o.p * k;
  const A: P = [0, 0];
  const Bp: P = [B, 0];
  const T: P = [X, H];
  const sk = new Sketch().polygon([A, Bp, T]);
  sk.sideLabel(A, Bp, o.base, -90, false);
  const foot: P = [X, 0];
  if (Math.abs(X) < 1e-9) {
    sk.rightMark(A, 0);
    sk.sideLabel(A, T, o.height, 180, false);
  } else if (Math.abs(X - B) < 1e-9) {
    sk.rightMark(Bp, 90);
    sk.sideLabel(Bp, T, o.height, 0, false);
  } else {
    if (X > B) sk.seg(Bp, foot, { color: 'muted', dashed: true });
    if (X < 0) sk.seg(foot, A, { color: 'muted', dashed: true });
    sk.seg(T, foot, { color: 'accent', dashed: true }).rightMark(foot, X > B ? 90 : 0);
    // Inside the triangle, put the height label on the side away from a labelled slanted side (or in the wider part).
    const inside = o.left ? 0 : o.right ? 180 : X > B / 2 ? 180 : 0;
    sk.sideLabel(foot, T, o.height, X > B ? 0 : X < 0 ? 180 : inside);
  }
  if (o.left) sk.sideLabel(A, T, o.left, (Math.atan2(H, X) * 180) / Math.PI + 90, false);
  if (o.right) sk.sideLabel(Bp, T, o.right, (Math.atan2(H, X - B) * 180) / Math.PI - 90, false);
  return sk.build(o.caption);
}

// ---------------------------------------------------------------------------
// Lesson 7.1 — Radius, diameter and circumference
// ---------------------------------------------------------------------------

interface RoundThing {
  what: string;
  u: string;
  lo: number;
  hi: number;
}

const ROUND_THINGS: RoundThing[] = [
  { what: 'a bicycle wheel', u: 'cm', lo: 25, hi: 35 },
  { what: 'a hula hoop', u: 'cm', lo: 35, hi: 50 },
  { what: 'a round kitchen table', u: 'cm', lo: 45, hi: 70 },
  { what: 'a dreamcatcher hoop', u: 'cm', lo: 8, hi: 20 },
  { what: 'a round mirror', u: 'cm', lo: 20, hi: 40 },
  { what: 'a round trampoline', u: 'm', lo: 2, hi: 4 },
  { what: 'a circular flower bed', u: 'm', lo: 2, hi: 6 },
  { what: 'a hockey puck', u: 'mm', lo: 36, hi: 38 },
  { what: 'a dinner plate', u: 'cm', lo: 11, hi: 14 },
  { what: 'a round pizza pan', u: 'cm', lo: 14, hi: 20 },
  { what: 'a circular hot tub', u: 'm', lo: 1, hi: 2 },
  { what: 'a round campfire ring', u: 'cm', lo: 40, hi: 60 },
];

const CIRCLE_HINTS = ['The diameter goes all the way across the circle through the centre. The radius goes from the centre to the circle.', 'The diameter is twice the radius: $d = 2r$, so $r = d \\div 2$.'];

const circleParts = skill({
  id: 'm7-circle-parts',
  name: 'Radius, diameter and central angles',
  description: 'Use d = 2r and r = d ÷ 2, and use the fact that the central angles of a circle add to 360° to find a missing angle.',
  outcomes: ['SS1'],
  lessonId: 'm7-7-1',
  gen(rng, d): GenOutput {
    const angle = rng.pick([20, 35, 150, 200, 330, 0]);
    if (d === 1 || (d === 2 && rng.chance(0.4))) {
      const c = rng.pick(ROUND_THINGS);
      const toD = rng.chance(0.5);
      let r = rng.int(c.lo, Math.max(c.lo, c.hi));
      if (d === 2 && c.u !== 'mm' && rng.chance(0.7)) r = exact(r + 0.5);
      const dia = exact(2 * r);
      const useThing = d === 2 || rng.chance(0.4);
      const thing = useThing ? c.what : 'a circle';
      const Thing = thing.charAt(0).toUpperCase() + thing.slice(1);
      if (toD) {
        return {
          prompt: `${Thing} has a radius of ${len(r, c.u)}. What is its diameter?`,
          figure: circleFigure('r', `r = ${lab(r, c.u)}`, angle),
          parts: [numPart(dia, { suffix: c.u })],
          hints: CIRCLE_HINTS,
          solution: ['The diameter is twice the radius: $d = 2r$.', `$d = 2 \\times ${n(r)} = ${n(dia)}$`, `The diameter is ${len(dia, c.u)}.`],
          calculator: false,
        };
      }
      return {
        prompt: `${Thing} has a diameter of ${len(dia, c.u)}. What is its radius?`,
        figure: circleFigure('d', `d = ${lab(dia, c.u)}`, angle),
        parts: [numPart(r, { suffix: c.u })],
        hints: CIRCLE_HINTS,
        solution: ['The radius is half the diameter: $r = d \\div 2$.', `$r = ${n(dia)} \\div 2 = ${n(r)}$`, `The radius is ${len(r, c.u)}.`],
        calculator: false,
      };
    }
    if (d === 2) {
      // Missing central angle.
      const k = rng.int(3, 4);
      const angles = retry(
        () => {
          const a: number[] = [];
          let left = 360;
          for (let i = 0; i < k - 1; i++) {
            const t = rng.int(5, 26) * 5;
            a.push(t);
            left -= t;
          }
          a.push(left);
          return a;
        },
        (a) => a.every((t) => t >= 40 && t <= 200),
      );
      const miss = rng.int(0, k - 1);
      const labels = angles.map((t, i) => (i === miss ? 'x' : `${t}°`));
      const known = angles.filter((_, i) => i !== miss);
      const sum = known.reduce((s, t) => s + t, 0);
      return {
        prompt: `The circle is divided into ${k} sectors by radii. Find the missing central angle $x$.`,
        figure: sectorFigure(angles, labels, rng.int(0, 11) * 30),
        parts: [numPart(angles[miss], { label: '$x =$', suffix: '°' })],
        hints: ['A central angle has its vertex at the centre of the circle.', 'The central angles of a circle add to $360^\\circ$.'],
        solution: [
          'The central angles of a circle add to $360^\\circ$.',
          `Add the known angles: $${known.map(deg).join(' + ')} = ${deg(sum)}$`,
          `$x = 360^\\circ - ${deg(sum)} = ${deg(angles[miss])}$`,
          `The missing central angle is $${deg(angles[miss])}$.`,
        ],
        calculator: false,
      };
    }
    const mode = rng.pick(['slices', 'equal', 'row', 'inside'] as const);
    const name = rng.pick(NAMES);
    if (mode === 'slices') {
      const cuts = rng.pick([6, 8, 9, 10, 12]);
      const eaten = rng.int(2, cuts - 2);
      const each = 360 / cuts;
      const leftA = each * (cuts - eaten);
      const food = rng.pick(['pizza', 'apple pie', 'birthday cake', 'bannock loaf']);
      return {
        prompt: `${name} cuts a round ${food} into ${cuts} equal slices from the centre. ${eaten} slices are eaten. What is the total central angle of the slices that are left?`,
        parts: [numPart(leftA, { suffix: '°' })],
        hints: ['All the central angles together make a full turn of $360^\\circ$.', 'Find the angle of one slice first, then multiply by the number of slices left.'],
        solution: [
          `One slice: $360^\\circ \\div ${cuts} = ${deg(each)}$`,
          `Slices left: $${cuts} - ${eaten} = ${cuts - eaten}$`,
          `Total angle: $${cuts - eaten} \\times ${deg(each)} = ${deg(leftA)}$`,
          `The slices that are left have a central angle of $${deg(leftA)}$.`,
        ],
        calculator: false,
      };
    }
    if (mode === 'equal') {
      const known = retry(() => [rng.int(8, 30) * 5, rng.int(8, 24) * 5], ([a, b]) => a !== b && a + b <= 280 && (360 - a - b) % 2 === 0 && (360 - a - b) / 2 >= 30);
      const x = (360 - known[0] - known[1]) / 2;
      return {
        prompt: `A circle is divided into 4 sectors. Two central angles are $${deg(known[0])}$ and $${deg(known[1])}$. The other two central angles are equal to each other. What is the measure of each of them?`,
        figure: sectorFigure([known[0], x, known[1], x], [`${known[0]}°`, 'x', `${known[1]}°`, 'x'], rng.int(0, 11) * 30),
        parts: [numPart(x, { label: '$x =$', suffix: '°' })],
        hints: ['The four central angles add to $360^\\circ$.', 'Subtract the known angles from $360^\\circ$, then share what is left equally between the two equal angles.'],
        solution: [
          `The central angles add to $360^\\circ$: $${deg(known[0])} + ${deg(known[1])} + x + x = 360^\\circ$`,
          `What is left for the two equal angles: $360^\\circ - ${deg(known[0])} - ${deg(known[1])} = ${deg(2 * x)}$`,
          `Each equal angle: $${deg(2 * x)} \\div 2 = ${deg(x)}$`,
          `Each of the two equal angles measures $${deg(x)}$.`,
        ],
        calculator: false,
      };
    }
    if (mode === 'row') {
      const count = rng.int(3, 6);
      const [thing, u, rr] = rng.pick([
        ['coins', 'cm', (): number => rng.int(9, 14) / 10],
        ['checkers', 'cm', (): number => rng.int(14, 18) / 10],
        ['hockey pucks', 'cm', (): number => 3.8],
        ['tennis balls', 'cm', (): number => rng.int(32, 34) / 10],
        ['round hay bales', 'm', (): number => rng.int(8, 9) / 10],
      ] as const);
      const r = rr();
      const L = exact(2 * r * count);
      return {
        prompt: `${count} identical ${thing} are placed in a straight row, each one touching the next. From one end of the row to the other is ${len(L, u)}. What is the radius of each one?`,
        parts: [numPart(r, { suffix: u })],
        hints: ['The length of the row is made of diameters placed end to end.', 'Find one diameter first, then halve it to get the radius.'],
        solution: [
          `The row is ${count} diameters long, so one diameter is $${n(L)} \\div ${count} = ${n(2 * r)}\\ ${tx(u)}$.`,
          `The radius is half the diameter: $${n(2 * r)} \\div 2 = ${n(r)}$`,
          `The radius of each one is ${len(r, u)}.`,
        ],
        calculator: true,
      };
    }
    // Two equal small circles fit side by side across a large circle's diameter.
    const big = rng.int(4, 30);
    const u = rng.pick(['cm', 'm']);
    const R = 3;
    const sk = new Sketch().circle([0, 0], R).circle([-R / 2, 0], R / 2, 'accent').circle([R / 2, 0], R / 2, 'accent').dot([0, 0]);
    sk.seg([0, 0], at([0, 0], 90, R), { color: 'muted' }).sideLabel([0, 0], at([0, 0], 90, R), `${big} ${u}`, 0, false);
    return {
      prompt: `Two identical small circles fit side by side inside a large circle, as shown. Together, their diameters stretch exactly across the large circle. The large circle has a radius of ${len(big, u)}. What is the radius of each small circle?`,
      figure: sk.build(),
      parts: [numPart(big / 2, { suffix: u })],
      hints: ['The two small diameters together make the large diameter.', 'Find the large diameter first. Then find one small diameter, then its radius.'],
      solution: [
        `Large diameter: $2 \\times ${big} = ${2 * big}\\ ${tx(u)}$`,
        `Each small diameter is half of that: $${2 * big} \\div 2 = ${big}\\ ${tx(u)}$`,
        `Each small radius: $${big} \\div 2 = ${n(big / 2)}$`,
        `Each small circle has a radius of ${len(big / 2, u)}.`,
      ],
      calculator: false,
    };
  },
});

const CIRC_HINTS = ['The circumference is the distance around a circle.', '$C = \\pi d$, or $C = 2\\pi r$. ' + PI_HINT];

/** A measurement that does not make value(x) sit on a rounding boundary. */
function niceMeasure(make: () => number, value: (x: number) => number, dp: number | 'area' = 1): number {
  return retry(make, (x) => !nearHalf(value(x), dp === 'area' ? dpFor(value(x)) : dp));
}

const circumference = skill({
  id: 'm7-circumference',
  name: 'Circumference',
  description: 'Use C = πd and C = 2πr to find the circumference of a circle, and find the diameter or radius from the circumference.',
  outcomes: ['SS1'],
  lessonId: 'm7-7-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const angle = rng.pick([20, 35, 150, 200, 330, 0]);
    if (d === 1) {
      const u = rng.pick(['cm', 'm', 'mm']);
      const useD = rng.chance(0.5);
      const x = niceMeasure(() => rng.int(3, u === 'mm' ? 60 : 25), (v) => (useD ? Math.PI * v : 2 * Math.PI * v));
      const C = useD ? Math.PI * x : 2 * Math.PI * x;
      return {
        prompt: `A circle has a ${useD ? 'diameter' : 'radius'} of ${len(x, u)}. What is its circumference, ${lenRound(1, u)}?`,
        figure: circleFigure(useD ? 'd' : 'r', `${useD ? 'd' : 'r'} = ${lab(x, u)}`, angle),
        parts: [numPart(C, { decimals: 1, suffix: u })],
        hints: CIRC_HINTS,
        solution: useD
          ? ['$C = \\pi d$', `$C = \\pi \\times ${n(x)} \\approx ${nf(C, 2)}$`, `The circumference is about ${lenR(C, u)}.`]
          : ['$C = 2\\pi r$', `$C = 2 \\times \\pi \\times ${n(x)} \\approx ${nf(C, 2)}$`, `The circumference is about ${lenR(C, u)}.`],
      };
    }
    if (d === 2) {
      const mode = rng.weighted([['forward', 4], ['reverse', 3], ['ratio', 2]] as const);
      if (mode === 'forward') {
        const c = rng.pick(ROUND_THINGS);
        const useD = rng.chance(0.5);
        const r = niceMeasure(() => (c.u === 'm' ? rng.int(c.lo * 10, c.hi * 10 + 5) / 10 : rng.int(c.lo, c.hi)), (v) => 2 * Math.PI * v);
        const C = 2 * Math.PI * r;
        const Thing = c.what.charAt(0).toUpperCase() + c.what.slice(1);
        return {
          prompt: `${Thing} has a ${useD ? 'diameter' : 'radius'} of ${len(useD ? 2 * r : r, c.u)}. What is its circumference, ${lenRound(1, c.u)}?`,
          parts: [numPart(C, { decimals: 1, suffix: c.u })],
          hints: ['Decide whether you are given the radius or the diameter.', useD ? '$C = \\pi d$. ' + PI_HINT : 'With the radius, use $C = 2\\pi r$ (or double the radius to get the diameter first).'],
          solution: useD
            ? ['$C = \\pi d$', `$C = \\pi \\times ${n(2 * r)} \\approx ${nf(C, 2)}$`, `The circumference is about ${lenR(C, c.u)}.`]
            : ['$C = 2\\pi r$', `$C = 2 \\times \\pi \\times ${n(r)} \\approx ${nf(C, 2)}$`, `The circumference is about ${lenR(C, c.u)}.`],
        };
      }
      if (mode === 'reverse') {
        const name = rng.pick(NAMES);
        const [lead, ask, u, lo, hi] = rng.pick([
          [(x: string) => `${name} wraps a measuring tape around a tree trunk. The distance around it is ${x}.`, 'the diameter of the trunk', 'cm', 60, 250],
          [(x: string) => `${name} measures around a round hay bale with a measuring tape. The circumference is ${x}.`, 'the diameter of the bale', 'cm', 380, 560],
          [(x: string) => `A circular walking path around a pond is ${x} long.`, 'the diameter of the circle', 'm', 200, 900],
          [(x: string) => `${name} runs a measuring tape around the edge of a round tabletop. The circumference is ${x}.`, 'the diameter of the tabletop', 'cm', 250, 420],
          [(x: string) => `The rope around a circular corral on a ranch is ${x} long.`, 'the diameter of the corral', 'm', 40, 90],
        ] as const);
        const C = niceMeasure(() => rng.int(lo, hi), (v) => v / Math.PI);
        const D = C / Math.PI;
        return {
          prompt: `${lead(len(C, u))} What is ${ask}, ${lenRound(1, u)}?`,
          parts: [numPart(D, { decimals: 1, suffix: u })],
          hints: ['$C = \\pi d$. You know $C$, so work backwards to find $d$.', 'Divide the circumference by $\\pi$: $d = C \\div \\pi$.'],
          solution: ['$C = \\pi d$, so $d = C \\div \\pi$.', `$d = ${n(C)} \\div \\pi \\approx ${nf(D, 2)}$`, `The diameter is about ${lenR(D, u)}.`],
        };
      }
      // Measured C and d: C ÷ d is close to pi.
      const [thing, u] = rng.pick([['a soup can lid', 'cm'], ['a jar lid', 'cm'], ['a bicycle wheel', 'cm'], ['a coffee mug', 'cm'], ['a drum', 'cm'], ['a round clock', 'cm']] as const);
      const { D, C } = retry(
        () => {
          const D0 = rng.int(60, 600) / 10;
          return { D: D0, C: roundTo(Math.PI * D0 + rng.pick([-0.1, 0, 0.1]), 1) };
        },
        ({ D: dd, C: cc }) => !nearHalf(cc / dd, 2),
      );
      const ratio = C / D;
      const name = rng.pick(NAMES);
      return {
        prompt: `${name} measures ${thing}. The circumference is ${len(C, u)} and the diameter is ${len(D, u)}. What is $C \\div d$, to the nearest hundredth?`,
        parts: [numPart(ratio, { decimals: 2, label: '$C \\div d \\approx$' })],
        hints: ['Divide the circumference by the diameter.', 'For every circle, $C \\div d$ is the same number, $\\pi$. Measured values give a number close to it.'],
        solution: [
          `$C \\div d = ${n(C)} \\div ${n(D)} \\approx ${nf(ratio, 4)}$`,
          `To the nearest hundredth, $C \\div d \\approx ${nf(ratio, 2)}$.`,
          `This is close to $\\pi \\approx 3.14$. For every circle, the circumference is a little more than 3 times the diameter.`,
          `The answer is about $${nf(ratio, 2)}$.`,
        ],
      };
    }
    const mode = rng.pick(['radius', 'semicircle', 'track', 'wheel'] as const);
    const name = rng.pick(NAMES);
    if (mode === 'radius') {
      const [lead, u, lo, hi] = rng.pick([
        [(x: string) => `A circular garden has a circumference of ${x}.`, 'm', 12, 40],
        [(x: string) => `A circular skating path on a frozen pond is ${x} around.`, 'm', 60, 200],
        [(x: string) => `The rim of a round fire pit measures ${x} around.`, 'cm', 280, 420],
        [(x: string) => `A circular fountain has a circumference of ${x}.`, 'm', 15, 35],
      ] as const);
      const C = niceMeasure(() => rng.int(lo, hi), (v) => v / (2 * Math.PI));
      const r = C / (2 * Math.PI);
      return {
        prompt: `${lead(len(C, u))} What is its radius, ${lenRound(1, u)}?`,
        parts: [numPart(r, { decimals: 1, suffix: u })],
        hints: ['Find the diameter first: $d = C \\div \\pi$.', 'Then halve the diameter to get the radius.'],
        solution: [`$d = C \\div \\pi = ${n(C)} \\div \\pi \\approx ${nf(C / Math.PI, 3)}\\ ${tx(u)}$`, `$r = d \\div 2 \\approx ${nf(C / Math.PI, 3)} \\div 2 \\approx ${nf(r, 2)}$`, `The radius is about ${lenR(r, u)}.`],
      };
    }
    if (mode === 'semicircle') {
      const u = rng.pick(['cm', 'm']);
      const D = niceMeasure(() => (u === 'cm' ? rng.int(30, 120) : rng.int(2, 9)), (v) => (Math.PI * v) / 2 + v);
      const curve = (Math.PI * D) / 2;
      const P = curve + D;
      const thing = u === 'cm' ? rng.pick(['a semicircular window', 'a semicircular rug', 'a half-moon cutting board']) : rng.pick(['a semicircular patio', 'a semicircular stage', 'a semicircular garden bed']);
      const R = 3;
      const sk = new Sketch().arc([0, 0], R, 0, 180).seg([-R, 0], [R, 0]).dot([0, 0]);
      sk.sideLabel([-R, 0], [R, 0], lab(D, u), -90, false);
      return {
        prompt: `${name} wants to put a trim all the way around the edge of ${thing}. The straight edge is ${len(D, u)} long. How much trim is needed, ${lenRound(1, u)}?`,
        figure: sk.build(),
        parts: [numPart(P, { decimals: 1, suffix: u })],
        hints: ['The edge has two parts: the curved part and the straight part.', 'The curved part is half the circumference of a full circle: $\\pi d \\div 2$. Then add the straight edge.'],
        solution: [
          `The straight edge is a diameter: $d = ${n(D)}\\ ${tx(u)}$.`,
          `Curved part: $\\pi \\times ${n(D)} \\div 2 \\approx ${nf(curve, 3)}\\ ${tx(u)}$`,
          `Total: $${nf(curve, 3)} + ${n(D)} \\approx ${nf(P, 2)}$`,
          `About ${lenR(P, u)} of trim is needed.`,
        ],
      };
    }
    if (mode === 'track') {
      const L = rng.int(6, 12) * 10;
      const D = niceMeasure(() => rng.int(40, 75), (v) => 2 * L + Math.PI * v);
      const P = 2 * L + Math.PI * D;
      const k = scaleFor(L + D, D, 7);
      const l = L * k;
      const r = (D * k) / 2;
      const sk = new Sketch().seg([0, r], [l, r]).seg([0, -r], [l, -r]).arc([l, 0], r, -90, 180).arc([0, 0], r, 90, 180);
      sk.seg([l, -r], [l, r], { color: 'accent', dashed: true });
      sk.sideLabel([0, r], [l, r], lab(L, 'm'), 90, false).sideLabel([l, -r], [l, r], lab(D, 'm'), 180, false);
      return {
        prompt: `A school running track has two straight sides, each ${len(L, 'm')} long, and a half circle at each end. The half circles have a diameter of ${len(D, 'm')}. How far is one lap around the track, ${lenRound(1, 'm')}?`,
        figure: sk.build(),
        parts: [numPart(P, { decimals: 1, suffix: 'm' })],
        hints: ['The two half circles together make one full circle.', 'Add the two straight sides and the circumference of one full circle.'],
        solution: [
          `The two straight sides: $2 \\times ${L} = ${2 * L}\\ \\text{m}$`,
          `The two half circles make one circle: $C = \\pi \\times ${D} \\approx ${nf(Math.PI * D, 3)}\\ \\text{m}$`,
          `One lap: $${2 * L} + ${nf(Math.PI * D, 3)} \\approx ${nf(P, 2)}$`,
          `One lap is about ${lenR(P, 'm')}.`,
        ],
      };
    }
    const turns = rng.pick([20, 25, 40, 50, 100, 150]);
    const DD = niceMeasure(() => rng.int(50, 70), (v) => (Math.PI * v * turns) / 100);
    const dist2 = (Math.PI * DD * turns) / 100;
    return {
      prompt: `The wheels on ${name}’s bike have a diameter of ${len(DD, 'cm')}. How far does the bike move when the wheels turn ${turns} times? Give your answer in metres, ${lenRound(1, 'm')}.`,
      parts: [numPart(dist2, { decimals: 1, suffix: 'm' })],
      hints: ['In one turn, the bike moves forward one circumference of the wheel.', 'Find $C = \\pi d$, multiply by the number of turns, then change centimetres to metres (divide by 100).'],
      solution: [
        `In one turn, the bike moves one circumference: $C = \\pi \\times ${DD}\\ \\text{cm}$.`,
        `In ${turns} turns: $${turns} \\times \\pi \\times ${DD} = \\pi \\times ${n(turns * DD)} \\approx ${nf(Math.PI * DD * turns, 2)}\\ \\text{cm}$`,
        `In metres: $${nf(Math.PI * DD * turns, 2)} \\div 100 \\approx ${nf(dist2, 2)}$`,
        `The bike moves about ${lenR(dist2, 'm')}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.2 — Area of a parallelogram
// ---------------------------------------------------------------------------

/** Right-triangle side sets [run, rise, slant] for drawing a slanted side with a whole-number length. */
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [12, 16, 20], [16, 12, 20],
  [7, 24, 25], [15, 20, 25], [20, 15, 25], [10, 24, 26], [9, 40, 41],
];

interface DecThing {
  what: string;
  short: string;
  u: string;
  /** Ranges for the base and height. */
  b: [number, number];
  h: [number, number];
}

const PARA_THINGS: DecThing[] = [
  { what: 'parallelogram-shaped patio stone', short: 'patio stone', u: 'cm', b: [30, 45], h: [20, 35] },
  { what: 'parallelogram-shaped garden bed', short: 'garden bed', u: 'm', b: [2.5, 6], h: [1.2, 3] },
  { what: 'parallelogram-shaped parking stall', short: 'parking stall', u: 'm', b: [2.5, 3.2], h: [5, 6] },
  { what: 'parallelogram-shaped piece of felt for a banner', short: 'piece of felt', u: 'cm', b: [20, 60], h: [15, 40] },
  { what: 'parallelogram-shaped floor tile', short: 'tile', u: 'cm', b: [10, 25], h: [8, 20] },
  { what: 'parallelogram-shaped vegetable plot', short: 'vegetable plot', u: 'm', b: [4, 12], h: [3, 8] },
];

/** A measurement in range with one decimal place (metres) or a half (centimetres), not a whole number. */
function decMeasure(rng: Rng, [lo, hi]: [number, number], u: string): number {
  if (u === 'm') return retry(() => rng.int(Math.round(lo * 10), Math.round(hi * 10)) / 10, (x) => !Number.isInteger(x));
  return rng.int(lo, hi) + 0.5;
}

const PARA_HINTS = [
  'Cut a triangle off one end of a parallelogram and slide it to the other end: you get a rectangle with the same base and height.',
  'Use $A = bh$. The height is measured at a right angle to the base, not along the slanted side.',
];

const areaParallelogram = skill({
  id: 'm7-area-parallelogram',
  name: 'Area of a parallelogram',
  description: 'Use A = bh to find the area of a parallelogram (choosing the perpendicular height, not the slanted side), and work backwards to find a base or height.',
  outcomes: ['SS2'],
  lessonId: 'm7-7-2',
  gen(rng, d): GenOutput {
    const u = rng.pick(['cm', 'm', 'mm']);
    if (d === 1) {
      const [b, h] = retry(() => [rng.int(4, 15), rng.int(3, 12)], ([x, y]) => x !== y && y * 3 >= x && y <= 2 * x);
      const A = b * h;
      return {
        prompt: `Find the area of the parallelogram.`,
        figure: paraFigure({ b, h, s: rng.int(2, 4) * (b / 10), base: lab(b, u), height: lab(h, u) }),
        parts: [numPart(A, { suffix: `${u}²` })],
        hints: PARA_HINTS,
        solution: ['$A = bh$', `$A = ${b} \\times ${h} = ${A}$`, `The area is ${ar(A, u)}.`],
        calculator: false,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['slant', 'outside', 'decimal'] as const);
      if (mode === 'slant' || mode === 'outside') {
        const outside = mode === 'outside';
        const [run, rise, sl] = rng.pick(TRIPLES.filter((t) => t[2] <= 25 && t[0] <= t[1] * 1.5 && (!outside || t[0] >= 6)));
        const b = outside ? rng.int(3, run - 2) : rng.int(run + 3, run + 14);
        const A = b * rise;
        return {
          prompt: `Find the area of the parallelogram.${outside ? ' The dashed height is drawn outside the shape.' : ''}`,
          figure: paraFigure({ b, h: rise, s: run, base: lab(b, u), height: lab(rise, u), slant: lab(sl, u) }),
          parts: [numPart(A, { suffix: `${u}²` })],
          hints: ['Which measurement meets the base at a right angle? That one is the height.', 'Use $A = bh$. The slanted side is not the height.'],
          solution: [
            `The base is ${len(b, u)}. The height is ${len(rise, u)}: it meets the base${outside ? ' (extended)' : ''} at a right angle.`,
            `The slanted side, ${len(sl, u)}, is not needed.`,
            `$A = bh = ${b} \\times ${rise} = ${A}$`,
            `The area is ${ar(A, u)}.`,
          ],
          calculator: false,
        };
      }
      const c = rng.pick(PARA_THINGS);
      const b = decMeasure(rng, c.b, c.u);
      const h = rng.chance(0.5) ? rng.int(Math.ceil(c.h[0]), Math.floor(c.h[1])) : decMeasure(rng, c.h, c.u);
      const A = exact(b * h);
      return {
        prompt: `A ${c.what} has a base of ${len(b, c.u)} and a height of ${len(h, c.u)}. What is its area?`,
        parts: [numPart(A, { suffix: `${c.u}²` })],
        hints: PARA_HINTS,
        solution: ['$A = bh$', `$A = ${n(b)} \\times ${n(h)} = ${n(A)}$`, `The area of the ${c.short} is ${ar(A, c.u)}.`],
        calculator: true,
      };
    }
    const mode = rng.pick(['height', 'base', 'hole'] as const);
    const name = rng.pick(NAMES);
    if (mode === 'height' || mode === 'base') {
      const [b, h] = retry(() => [rng.int(5, 20), rng.int(3, 15)], ([x, y]) => x !== y && y * 3 >= x && y <= 2 * x);
      const A = b * h;
      const s = rng.int(2, 5);
      const findH = mode === 'height';
      return {
        prompt: findH
          ? `A parallelogram has an area of ${ar(A, u)} and a base of ${len(b, u)}. What is its height?`
          : `A parallelogram has an area of ${ar(A, u)} and a height of ${len(h, u)}. How long is its base?`,
        figure: paraFigure({ b, h, s, base: findH ? lab(b, u) : 'b = ?', height: findH ? 'h = ?' : lab(h, u), caption: `A = ${A} ${u}²` }),
        parts: [numPart(findH ? h : b, { suffix: u, label: findH ? '$h =$' : '$b =$' })],
        hints: ['Write $A = bh$ and put in the numbers you know.', findH ? 'Undo the multiplying: divide the area by the base.' : 'Undo the multiplying: divide the area by the height.'],
        solution: findH
          ? ['$A = bh$', `$${A} = ${b} \\times h$`, `Divide both sides by $${b}$: $h = ${A} \\div ${b} = ${h}$`, `Check: $${b} \\times ${h} = ${A}$ ✓`, `The height is ${len(h, u)}.`]
          : ['$A = bh$', `$${A} = b \\times ${h}$`, `Divide both sides by $${h}$: $b = ${A} \\div ${h} = ${b}$`, `Check: $${b} \\times ${h} = ${A}$ ✓`, `The base is ${len(b, u)}.`],
        calculator: false,
      };
    }
    const b = rng.int(12, 24);
    const h = rng.int(8, 14);
    const s = rng.int(3, 6);
    const w = rng.int(3, Math.floor(b / 2));
    const hh = rng.int(2, h - 4);
    const A = b * h - w * hh;
    const hole: [number, number, number, number] = [s / 2 + (b - w) / 2, (h - hh) / 2, w, hh];
    return {
      prompt: `${name}’s school has a lawn shaped like a parallelogram, with a rectangular flower bed in the middle. The lawn has a base of ${len(b, 'm')} and a height of ${len(h, 'm')}. The flower bed is ${len(w, 'm')} by ${len(hh, 'm')}. What is the area of the grass?`,
      figure: paraFigure({ b, h, s, base: lab(b, 'm'), height: lab(h, 'm'), hole, holeLabels: [lab(w, 'm'), lab(hh, 'm')] }),
      parts: [numPart(A, { suffix: 'm²' })],
      hints: ['Find the area of the whole parallelogram, then take away the flower bed.', 'Parallelogram: $A = bh$. Rectangle: $A = lw$.'],
      solution: [
        `Whole parallelogram: $A = ${b} \\times ${h} = ${b * h}\\ \\text{m}^2$`,
        `Flower bed: $A = ${w} \\times ${hh} = ${w * hh}\\ \\text{m}^2$`,
        `Grass: $${b * h} - ${w * hh} = ${A}$`,
        `The area of the grass is ${ar(A, 'm')}.`,
      ],
      calculator: false,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.3 — Area of a triangle
// ---------------------------------------------------------------------------

const TRI_HINTS = [
  'A triangle is half of a parallelogram with the same base and height.',
  'Use $A = bh \\div 2$. The height is measured at a right angle to the base, even when it falls outside the triangle.',
];

const TRI_THINGS: DecThing[] = [
  { what: 'triangular sail', short: 'sail', u: 'm', b: [2, 4], h: [3, 6] },
  { what: 'triangular pennant', short: 'pennant', u: 'cm', b: [15, 30], h: [25, 45] },
  { what: 'triangular yield sign', short: 'sign', u: 'cm', b: [60, 90], h: [50, 80] },
  { what: 'triangular corner shelf', short: 'shelf', u: 'cm', b: [25, 50], h: [20, 40] },
  { what: 'triangular flower bed', short: 'flower bed', u: 'm', b: [2, 6], h: [1.5, 4] },
  { what: 'triangular piece of a quilt', short: 'quilt piece', u: 'cm', b: [8, 20], h: [6, 15] },
];

const areaTriangle = skill({
  id: 'm7-area-triangle',
  name: 'Area of a triangle',
  description: 'Use A = bh ÷ 2 for any triangle (including obtuse triangles with the height outside), and solve composite and missing-height problems.',
  outcomes: ['SS2'],
  lessonId: 'm7-7-3',
  gen(rng, d): GenOutput {
    const u = rng.pick(['cm', 'm', 'mm']);
    if (d === 1) {
      const [b, h] = retry(() => [rng.int(4, 16), rng.int(3, 14)], ([x, y]) => (x * y) % 2 === 0 && x !== y && y * 3 >= x && y <= 2 * x);
      const right = rng.chance(0.35);
      const p = right ? (rng.chance(0.5) ? 0 : b) : roundTo(b * rng.pick([0.3, 0.4, 0.6, 0.7]), 2);
      const A = (b * h) / 2;
      return {
        prompt: 'Find the area of the triangle.',
        figure: triFigure({ b, h, p, base: lab(b, u), height: lab(h, u) }),
        parts: [numPart(A, { suffix: `${u}²` })],
        hints: TRI_HINTS,
        solution: ['$A = bh \\div 2$', `$A = ${b} \\times ${h} \\div 2 = ${b * h} \\div 2 = ${n(A)}$`, `The area is ${ar(A, u)}.`],
        calculator: false,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['obtuse', 'acuteSide', 'decimal'] as const);
      if (mode === 'obtuse') {
        // The long slanted side has a whole-number length: its run is b + q and its rise is h.
        const [run, h, sl] = rng.pick(TRIPLES.filter((t) => t[0] >= 6 && t[2] <= 26 && t[1] * 3 >= t[0]));
        const q = rng.int(2, Math.floor(run / 2));
        const b = run - q;
        const A = (b * h) / 2;
        const flip = rng.chance(0.5);
        return {
          prompt: 'Find the area of the triangle. The dashed height is drawn outside the triangle.',
          figure: flip
            ? triFigure({ b, h, p: -q, base: lab(b, u), height: lab(h, u), right: lab(sl, u) })
            : triFigure({ b, h, p: b + q, base: lab(b, u), height: lab(h, u), left: lab(sl, u) }),
          parts: [numPart(A, { suffix: `${u}²` })],
          hints: ['The height goes from the top vertex straight down to the line of the base, at a right angle. Here it lands outside the triangle.', 'Use $A = bh \\div 2$ with the base and the dashed height. The slanted side is not used.'],
          solution: [
            `The base is ${len(b, u)} and the height is ${len(h, u)}. The side of ${len(sl, u)} is slanted, so it is not the height.`,
            `$A = bh \\div 2 = ${b} \\times ${h} \\div 2 = ${b * h} \\div 2 = ${n(A)}$`,
            `The area is ${ar(A, u)}.`,
          ],
          calculator: false,
        };
      }
      if (mode === 'acuteSide') {
        // The labelled slanted side covers the shorter part of the base, so the height label has room on the other part.
        const [run, h, sl] = rng.pick(TRIPLES.filter((t) => t[2] <= 26 && t[0] <= t[1] && t[1] >= 4));
        const b = retry(() => run + rng.int(run + 2, run + 8), (x) => x <= 2.5 * h);
        const A = (b * h) / 2;
        const onLeft = rng.chance(0.5);
        return {
          prompt: 'Find the area of the triangle.',
          figure: onLeft
            ? triFigure({ b, h, p: run, base: lab(b, u), height: lab(h, u), left: lab(sl, u) })
            : triFigure({ b, h, p: b - run, base: lab(b, u), height: lab(h, u), right: lab(sl, u) }),
          parts: [numPart(A, { suffix: `${u}²` })],
          hints: ['Which length meets the base at a right angle?', 'Use $A = bh \\div 2$. The slanted side is not the height.'],
          solution: [`The height is ${len(h, u)} (it meets the base at a right angle). The slanted side, ${len(sl, u)}, is not used.`, `$A = bh \\div 2 = ${b} \\times ${h} \\div 2 = ${n(A)}$`, `The area is ${ar(A, u)}.`],
          calculator: false,
        };
      }
      const c = rng.pick(TRI_THINGS);
      const b = decMeasure(rng, c.b, c.u);
      const h = rng.chance(0.5) ? rng.int(Math.ceil(c.h[0]), Math.floor(c.h[1])) : decMeasure(rng, c.h, c.u);
      const A = exact((b * h) / 2);
      return {
        prompt: `A ${c.what} has a base of ${len(b, c.u)} and a height of ${len(h, c.u)}. What is its area?`,
        parts: [numPart(A, { suffix: `${c.u}²` })],
        hints: TRI_HINTS,
        solution: ['$A = bh \\div 2$', `$A = ${n(b)} \\times ${n(h)} \\div 2 = ${n(b * h)} \\div 2 = ${n(A)}$`, `The area of the ${c.short} is ${ar(A, c.u)}.`],
        calculator: true,
      };
    }
    const mode = rng.pick(['house', 'flag', 'height'] as const);
    if (mode === 'house') {
      const [thing, unit, w, h1, h2] = rng.pick([
        ['the front wall of a shed', 'm', rng.int(2, 4) * 2, rng.int(2, 3), rng.int(1, 3)],
        ['the end wall of a barn', 'm', rng.int(5, 8) * 2, rng.int(4, 8), rng.int(3, 6)],
        ['the front of a doghouse', 'cm', rng.int(6, 10) * 10, rng.int(5, 9) * 10, rng.int(2, 4) * 10],
        ['the front of a birdhouse', 'cm', rng.int(5, 10) * 2, rng.int(12, 25), rng.int(5, 10)],
      ] as const);
      const rect = w * h1;
      const tri = (w * h2) / 2;
      const A = rect + tri;
      const W = w;
      const H1 = h1;
      const H2 = h2;
      return {
        prompt: `The diagram shows ${thing}. It is a rectangle with a triangle on top. What is its area?`,
        figure: houseFigure(W, H1, H2, unit),
        parts: [numPart(A, { suffix: `${unit}²` })],
        hints: ['Split the shape into a rectangle and a triangle.', 'Rectangle: $A = lw$. Triangle: $A = bh \\div 2$, where the base of the triangle is the top of the rectangle. Then add.'],
        solution: [
          `Rectangle: $${W} \\times ${H1} = ${rect}\\ ${sq(unit)}$`,
          `Triangle: the base is the width, ${len(W, unit)}, and the height is ${len(H2, unit)}. $A = ${W} \\times ${H2} \\div 2 = ${n(tri)}\\ ${sq(unit)}$`,
          `Total: $${rect} + ${n(tri)} = ${n(A)}$`,
          `The area is ${ar(A, unit)}.`,
        ],
        calculator: false,
      };
    }
    if (mode === 'flag') {
      const b = rng.int(4, 10) * 10;
      const h1 = rng.int(6, 14) * 5;
      const h2 = rng.int(4, 10) * 5;
      const off = rng.int(1, 3) * 10;
      const para = b * h1;
      const tri = (b * h2) / 2;
      const A = para + tri;
      const s = scaleFor(b + off, h1 + h2, 6);
      const B = b * s;
      const H1 = h1 * s;
      const H2 = h2 * s;
      const S = off * s;
      const apex: [number, number] = [S + B / 2, H1 + H2];
      const sk = new Sketch().polygon([[0, 0], [B, 0], [B + S, H1], apex, [S, H1]]);
      sk.seg([S, H1], [B + S, H1], { color: 'muted' });
      const xh = S + B * 0.25;
      sk.seg([xh, H1], [xh, 0], { color: 'accent', dashed: true }).rightMark([xh, 0], 0, 0.25);
      sk.seg(apex, [apex[0], H1], { color: 'accent', dashed: true }).rightMark([apex[0], H1], 0, 0.25);
      const dx = B + S + 0.45;
      dimLine(sk, apex, dx, H1, H1 + H2);
      sk.seg([B + S, H1], [dx - 0.15, H1], { color: 'muted', dashed: true });
      sk.sideLabel([0, 0], [B, 0], lab(b, 'cm'), -90, false).sideLabel([xh, 0], [xh, H1], lab(h1, 'cm'), 0).sideLabel([dx, H1], [dx, H1 + H2], lab(h2, 'cm'), 0, false);
      return {
        prompt: `A team banner is made from a parallelogram with a triangle on top. The top side of the parallelogram is the base of the triangle, and it is the same length as the bottom side, ${len(b, 'cm')}. The parallelogram is ${len(h1, 'cm')} high and the triangle is ${len(h2, 'cm')} high. What is the area of the banner?`,
        figure: sk.build(),
        parts: [numPart(A, { suffix: 'cm²' })],
        hints: ['Split the banner into a parallelogram and a triangle.', 'Parallelogram: $A = bh$. Triangle: $A = bh \\div 2$. Add the two areas.'],
        solution: [
          `Parallelogram: $A = ${b} \\times ${h1} = ${para}\\ \\text{cm}^2$`,
          `Triangle: $A = ${b} \\times ${h2} \\div 2 = ${n(tri)}\\ \\text{cm}^2$`,
          `Total: $${para} + ${n(tri)} = ${n(A)}$`,
          `The banner has an area of ${ar(A, 'cm')}.`,
        ],
        calculator: false,
      };
    }
    const c = rng.pick(TRI_THINGS);
    const [b, h] = retry(
      () => [rng.int(Math.ceil(c.b[0]), Math.floor(c.b[1])), rng.int(Math.ceil(c.h[0]), Math.floor(c.h[1]))],
      ([x, y]) => (x * y) % 2 === 0 && x !== y && y * 3 >= x && y <= 2 * x,
    );
    const A = (b * h) / 2;
    return {
      prompt: `A ${c.what} has an area of ${ar(A, c.u)}. Its base is ${len(b, c.u)}. What is its height?`,
      figure: triFigure({ b, h, p: roundTo(b * rng.pick([0.3, 0.5, 0.7]), 2), base: lab(b, c.u), height: 'h = ?', caption: `A = ${A} ${c.u}²` }),
      parts: [numPart(h, { suffix: c.u, label: '$h =$' })],
      hints: ['Write $A = bh \\div 2$ and put in the numbers you know.', 'Undo the dividing by 2 first (multiply the area by 2), then divide by the base.'],
      solution: [
        '$A = bh \\div 2$, so $bh = 2A$.',
        `$${b} \\times h = 2 \\times ${A} = ${2 * A}$`,
        `$h = ${2 * A} \\div ${b} = ${h}$`,
        `Check: $${b} \\times ${h} \\div 2 = ${A}$ ✓`,
        `The height is ${len(h, c.u)}.`,
      ],
      calculator: false,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.4 — Area of a circle
// ---------------------------------------------------------------------------

const AREA_C_HINTS = ['The area of a circle is $A = \\pi r^2$, which means $\\pi \\times r \\times r$.', 'Square the radius first, then multiply by $\\pi$. ' + PI_HINT];

const AREA_THINGS: Array<{ lead: (x: string) => string; thing: string; u: string; lo: number; hi: number; given: 'r' | 'd' }> = [
  { lead: (x) => `A round trampoline has a diameter of ${x}.`, thing: 'the trampoline mat', u: 'm', lo: 3, hi: 5, given: 'd' },
  { lead: (x) => `A pizza has a diameter of ${x}.`, thing: 'the top of the pizza', u: 'cm', lo: 25, hi: 40, given: 'd' },
  { lead: (x) => `A circular skating rink on a farm pond has a diameter of ${x}.`, thing: 'the rink', u: 'm', lo: 14, hi: 30, given: 'd' },
  { lead: (x) => `A round table has a diameter of ${x}.`, thing: 'the tabletop', u: 'cm', lo: 80, hi: 130, given: 'd' },
  { lead: (x) => `The centre circle on a soccer field has a diameter of ${x}.`, thing: 'the centre circle', u: 'm', lo: 16, hi: 19, given: 'd' },
  { lead: (x) => `A lawn sprinkler sprays water ${x} in every direction.`, thing: 'the lawn it waters', u: 'm', lo: 3, hi: 9, given: 'r' },
  { lead: (x) => `A goat on a farm is tied to a post with a rope ${x} long.`, thing: 'the ground the goat can reach', u: 'm', lo: 3, hi: 8, given: 'r' },
  { lead: (x) => `A round rug has a radius of ${x}.`, thing: 'the rug', u: 'cm', lo: 60, hi: 120, given: 'r' },
];

const areaCircle = skill({
  id: 'm7-area-circle',
  name: 'Area of a circle',
  description: 'Use A = πr² to find the area of a circle from its radius or diameter, and find the areas of shapes made with circles and half circles.',
  outcomes: ['SS2'],
  lessonId: 'm7-7-4',
  calculator: true,
  gen(rng, d): GenOutput {
    const angle = rng.pick([20, 35, 150, 200, 330, 0]);
    if (d === 1) {
      const u = rng.pick(['cm', 'm', 'mm']);
      const r = niceMeasure(() => rng.int(2, 20), (v) => Math.PI * v * v, 'area');
      const A = Math.PI * r * r;
      return {
        prompt: `Find the area of the circle, ${sqRound(dpFor(A), u)}.`,
        figure: circleFigure('r', `r = ${lab(r, u)}`, angle),
        parts: [numPart(A, { decimals: dpFor(A), suffix: `${u}²` })],
        hints: AREA_C_HINTS,
        solution: ['$A = \\pi r^2$', `$A = \\pi \\times ${r}^2 = \\pi \\times ${r * r} \\approx ${nf(A, 2)}$`, `The area is about ${arR(A, u, dpFor(A))}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.3)) {
        const u = rng.pick(['cm', 'm']);
        const D = niceMeasure(() => rng.int(3, 30) * 2 + (rng.chance(0.3) ? 1 : 0), (v) => (Math.PI * v * v) / 4, 'area');
        const r = D / 2;
        const A = Math.PI * r * r;
        return {
          prompt: `Find the area of the circle, ${sqRound(dpFor(A), u)}.`,
          figure: circleFigure('d', `d = ${lab(D, u)}`, angle),
          parts: [numPart(A, { decimals: dpFor(A), suffix: `${u}²` })],
          hints: ['The formula uses the radius, but the diagram shows the diameter.', 'Halve the diameter to get the radius, then use $A = \\pi r^2$.'],
          solution: [`$r = d \\div 2 = ${D} \\div 2 = ${n(r)}\\ ${tx(u)}$`, `$A = \\pi r^2 = \\pi \\times ${n(r)}^2 = \\pi \\times ${n(r * r)} \\approx ${nf(A, 2)}$`, `The area is about ${arR(A, u, dpFor(A))}.`],
        };
      }
      const c = rng.pick(AREA_THINGS);
      const g = niceMeasure(() => rng.int(c.lo, c.hi), (v) => (c.given === 'd' ? (Math.PI * v * v) / 4 : Math.PI * v * v), 'area');
      const r = c.given === 'd' ? g / 2 : g;
      const A = Math.PI * r * r;
      return {
        prompt: `${c.lead(len(g, c.u))} What is the area of ${c.thing}, ${sqRound(dpFor(A), c.u)}?`,
        parts: [numPart(A, { decimals: dpFor(A), suffix: `${c.u}²` })],
        hints: ['Are you given the radius or the diameter?', c.given === 'd' ? 'Halve the diameter to get the radius, then use $A = \\pi r^2$.' : 'The distance from the centre to the edge is the radius. Use $A = \\pi r^2$.'],
        solution: [
          c.given === 'd' ? `The diameter is ${len(g, c.u)}, so $r = ${g} \\div 2 = ${n(r)}\\ ${tx(c.u)}$.` : `The distance from the centre is the radius: $r = ${g}\\ ${tx(c.u)}$.`,
          `$A = \\pi r^2 = \\pi \\times ${n(r)}^2 = \\pi \\times ${n(r * r)} \\approx ${nf(A, 2)}$`,
          `The area of ${c.thing} is about ${arR(A, c.u, dpFor(A))}.`,
        ],
      };
    }
    const mode = rng.pick(['window', 'ring', 'hole', 'field'] as const);
    const name = rng.pick(NAMES);
    if (mode === 'window') {
      const [w, h] = retry(() => [rng.int(4, 12) * 10, rng.int(6, 16) * 10], ([ww, hh]) => !nearHalf(ww * hh + (Math.PI * (ww / 2) ** 2) / 2, dpFor(ww * hh)));
      const r = w / 2;
      const semi = (Math.PI * r * r) / 2;
      const A = w * h + semi;
      const s = scaleFor(w, h + r, 6);
      const W = w * s;
      const H = h * s;
      const sk = new Sketch().polyline([[W, H], [W, 0], [0, 0], [0, H]]).arc([W / 2, H], W / 2, 0, 180).seg([0, H], [W, H], { color: 'muted', dashed: true });
      sk.sideLabel([0, 0], [W, 0], lab(w, 'cm'), -90, false).sideLabel([W, 0], [W, H], lab(h, 'cm'), 0, false);
      return {
        prompt: `A window is a rectangle with a half circle on top. The rectangle is ${len(w, 'cm')} wide and ${len(h, 'cm')} tall. What is the area of the glass, ${sqRound(dpFor(A), 'cm')}?`,
        figure: sk.build(),
        parts: [numPart(A, { decimals: dpFor(A), suffix: 'cm²' })],
        hints: ['Split the window into a rectangle and a half circle. The width of the rectangle is the diameter of the half circle.', 'Half circle: $\\pi r^2 \\div 2$. Add it to the area of the rectangle.'],
        solution: [
          `Rectangle: $${w} \\times ${h} = ${w * h}\\ \\text{cm}^2$`,
          `The half circle has diameter ${len(w, 'cm')}, so $r = ${r}\\ \\text{cm}$. Half circle: $\\pi \\times ${r}^2 \\div 2 \\approx ${nf(semi, 2)}\\ \\text{cm}^2$`,
          `Total: $${w * h} + ${nf(semi, 2)} \\approx ${nf(A, 2)}$`,
          `The glass has an area of about ${arR(A, 'cm', dpFor(A))}.`,
        ],
      };
    }
    if (mode === 'ring') {
      const [r, t, A] = retry(
        () => {
          const rr = rng.int(2, 6);
          const tt = rng.pick([1, 1.5, 2, 2.5]);
          return [rr, tt, Math.PI * ((rr + tt) ** 2 - rr * rr)];
        },
        ([, , a]) => !nearHalf(a, dpFor(a)),
      );
      const R = r + t;
      const k = 3 / R;
      const sk = new Sketch().circle([0, 0], R * k).circle([0, 0], r * k, 'accent').dot([0, 0]);
      sk.seg([0, 0], at([0, 0], 210, r * k), { color: 'accent' }).sideLabel([0, 0], at([0, 0], 210, r * k), lab(r, 'm'), 300);
      sk.seg(at([0, 0], 30, r * k), at([0, 0], 30, R * k), { color: 'muted' }).sideLabel(at([0, 0], 30, r * k), at([0, 0], 30, R * k), lab(t, 'm'), 120);
      return {
        prompt: `A round hot tub has a radius of ${len(r, 'm')}. ${name} builds a deck ${len(t, 'm')} wide all the way around it. What is the area of the deck, ${sqRound(dpFor(A), 'm')}?`,
        figure: sk.build(),
        parts: [numPart(A, { decimals: dpFor(A), suffix: 'm²' })],
        hints: ['The deck is the big circle (hot tub and deck) minus the small circle (hot tub).', `The big circle has radius $${r} + ${n(t)}$. Find both areas with $A = \\pi r^2$ and subtract.`],
        solution: [
          `Radius of the big circle: $${r} + ${n(t)} = ${n(R)}\\ \\text{m}$`,
          `Big circle: $\\pi \\times ${n(R)}^2 \\approx ${nf(Math.PI * R * R, 3)}\\ \\text{m}^2$. Hot tub: $\\pi \\times ${r}^2 \\approx ${nf(Math.PI * r * r, 3)}\\ \\text{m}^2$`,
          `Deck: $${nf(Math.PI * R * R, 3)} - ${nf(Math.PI * r * r, 3)} \\approx ${nf(A, 2)}$`,
          `The deck has an area of about ${arR(A, 'm', dpFor(A))}.`,
        ],
      };
    }
    if (mode === 'hole') {
      const [S, D, A] = retry(
        () => {
          const ss = rng.int(4, 12) * 10;
          const dd = rng.int(2, ss / 10 - 1) * 10 - rng.pick([0, 5]);
          return [ss, dd, ss * ss - (Math.PI * dd * dd) / 4];
        },
        ([ss, dd, a]) => dd >= 10 && dd < ss - 5 && !nearHalf(a, dpFor(a)),
      );
      const k = 6 / S;
      const W = S * k;
      const rr = (D * k) / 2;
      const sk = new Sketch().polygon([[0, 0], [W, 0], [W, W], [0, W]]).circle([W / 2, W / 2], rr, 'accent');
      sk.seg([W / 2 - rr, W / 2], [W / 2 + rr, W / 2], { color: 'accent' });
      sk.sideLabel([0, 0], [W, 0], lab(S, 'cm'), -90, false).sideLabel([W / 2 - rr, W / 2], [W / 2 + rr, W / 2], lab(D, 'cm'), 90);
      const circ = (Math.PI * D * D) / 4;
      return {
        prompt: `${name} cuts a circular hole with a diameter of ${len(D, 'cm')} out of a square piece of plywood. The square is ${len(S, 'cm')} on each side. What area of plywood is left, ${sqRound(dpFor(A), 'cm')}?`,
        figure: sk.build(),
        parts: [numPart(A, { decimals: dpFor(A), suffix: 'cm²' })],
        hints: ['Find the area of the square, then take away the area of the hole.', 'The hole is a circle. Halve its diameter to get the radius, then use $A = \\pi r^2$.'],
        solution: [
          `Square: $${S} \\times ${S} = ${S * S}\\ \\text{cm}^2$`,
          `Hole: $r = ${D} \\div 2 = ${n(D / 2)}\\ \\text{cm}$, so $A = \\pi \\times ${n(D / 2)}^2 \\approx ${nf(circ, 2)}\\ \\text{cm}^2$`,
          `Left over: $${S * S} - ${nf(circ, 2)} \\approx ${nf(A, 2)}$`,
          `About ${arR(A, 'cm', dpFor(A))} of plywood is left.`,
        ],
      };
    }
    const [L, w, A] = retry(
      () => {
        const ll = rng.int(5, 12) * 10;
        const ww = rng.int(3, 7) * 10;
        return [ll, ww, ll * ww + Math.PI * (ww / 2) ** 2];
      },
      ([ll, ww, a]) => ll > ww && !nearHalf(a, dpFor(a)),
    );
    const s = scaleFor(L + w, w, 7);
    const l = L * s;
    const r = (w * s) / 2;
    const sk = new Sketch().seg([0, r], [l, r]).seg([0, -r], [l, -r]).arc([l, 0], r, -90, 180).arc([0, 0], r, 90, 180);
    sk.seg([0, -r], [0, r], { color: 'muted', dashed: true }).seg([l, -r], [l, r], { color: 'muted', dashed: true });
    sk.sideLabel([0, r], [l, r], lab(L, 'm'), 90, false).sideLabel([l, -r], [l, r], lab(w, 'm'), 180, false);
    const circle = Math.PI * (w / 2) ** 2;
    return {
      prompt: `A sports field is a rectangle with a half circle at each end. The rectangle is ${len(L, 'm')} long and ${len(w, 'm')} wide. What is the area of the field, ${sqRound(dpFor(A), 'm')}?`,
      figure: sk.build(),
      parts: [numPart(A, { decimals: dpFor(A), suffix: 'm²' })],
      hints: ['The two half circles together make one full circle. Its diameter is the width of the rectangle.', 'Add the area of the rectangle and the area of one full circle.'],
      solution: [
        `Rectangle: $${L} \\times ${w} = ${L * w}\\ \\text{m}^2$`,
        `The two half circles make one circle with $r = ${w} \\div 2 = ${w / 2}\\ \\text{m}$: $\\pi \\times ${w / 2}^2 \\approx ${nf(circle, 2)}\\ \\text{m}^2$`,
        `Total: $${L * w} + ${nf(circle, 2)} \\approx ${nf(A, 2)}$`,
        `The field has an area of about ${arR(A, 'm', dpFor(A))}.`,
      ],
    };
  },
});

export const CIRCLESAREA_SKILLS: SkillDef[] = [circleParts, circumference, areaParallelogram, areaTriangle, areaCircle];
