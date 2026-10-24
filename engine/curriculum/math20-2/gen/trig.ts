/** Math 20-2 Unit 3 — Acute Triangle Trigonometry (G3): the sine law and the cosine law. */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { acosD, asinD, cosD, fmt, fmtFixed, roundTo, sinD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const PEOPLE = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
];
const TOWNS = ['Riverton', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Oakdale', 'Millbrook'];

type Unit = 'mm' | 'cm' | 'm' | 'km';
const UNIT_NAME: Record<Unit, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre' };

/** A measurement inside $...$, e.g. 12\ \text{cm}. */
const ms = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x}\\ \\text{${u}}`;
/** A measurement as a figure label, e.g. "12 cm". */
const fl = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x} ${u}`;
const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
/** An angle as a figure label. */
const degL = (x: number) => `${fmt(x)}°`;

function nearest(dp: number, u: Unit): string {
  const name = UNIT_NAME[u];
  return dp === 0 ? `to the nearest ${name}` : `to the nearest ${dp === 1 ? 'tenth' : 'hundredth'} of a ${name}`;
}
const angNearest = (dp: number) => (dp === 0 ? 'to the nearest degree' : 'to the nearest tenth of a degree');

/** True when x is a positive finite number safely away from a rounding boundary at dp places. */
function safe(x: number, dp: number): boolean {
  if (!Number.isFinite(x) || x <= 0) return false;
  const f = x * 10 ** dp;
  return Math.abs(f - Math.floor(f) - 0.5) > 0.06;
}

/** A calculator value shown with two more places than the final answer. */
const calc = (x: number, dp: number) => fmtFixed(x, dp + 2);

type V3 = [string, string, string];
const LETTERS: V3[] = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['D', 'E', 'F'],
  ['X', 'Y', 'Z'],
  ['M', 'N', 'P'],
  ['S', 'T', 'U'],
  ['G', 'H', 'K'],
  ['R', 'S', 'T'],
];
const triName = (V: V3) => `\\triangle ${V.join('')}`;
/** The two vertex indices other than k, in increasing order. */
const others = (k: number): [number, number] => (k === 0 ? [1, 2] : k === 1 ? [0, 2] : [0, 1]);

/** Three distinct whole-degree angles in [lo, hi] that add to 180°. */
function acuteAngles(rng: Rng, lo = 40, hi = 80): number[] {
  return retry(
    () => {
      const A = rng.int(lo, hi);
      const B = rng.int(lo, hi);
      return [A, B, 180 - A - B];
    },
    (t) => t[2] >= lo && t[2] <= hi && new Set(t).size === 3,
    200,
  );
}

/** Side lengths (side k is opposite vertex k) when side g has length len. */
function sidesFromAngles(ang: number[], g: number, len: number): number[] {
  return ang.map((x, k) => (k === g ? len : (len * sinD(x)) / sinD(ang[g])));
}

/** Angles from three sides (cosine law). */
function anglesFromSides(s: number[]): number[] {
  return s.map((_, k) => {
    const [i, j] = others(k);
    return acosD((s[i] * s[i] + s[j] * s[j] - s[k] * s[k]) / (2 * s[i] * s[j]));
  });
}

const acuteOk = (ang: number[], lo = 32, hi = 86) => ang.every((a) => Number.isFinite(a) && a >= lo && a <= hi);

// ---------------------------------------------------------------------------
// Triangle figures: a plane canvas (1 unit = 1 px) with invisible label anchors
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';
interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

const add = (p: P, q: P): P => [p[0] + q[0], p[1] + q[1]];
const sub = (p: P, q: P): P => [p[0] - q[0], p[1] - q[1]];
const mul = (p: P, k: number): P => [p[0] * k, p[1] * k];
const unit = (p: P): P => {
  const L = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / L, p[1] / L];
};
const rot = (p: P, d: number): P => {
  const t = (d * Math.PI) / 180;
  return [p[0] * Math.cos(t) - p[1] * Math.sin(t), p[0] * Math.sin(t) + p[1] * Math.cos(t)];
};
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Approximate width (px) of a 12 px semibold label. */
function textW(t: string): number {
  let w = 0;
  for (const ch of t) {
    if (ch === '°') w += 5;
    else if (ch === ' ' || ch === '.' || ch === ',') w += 3.8;
    else if (ch === 'm' || ch === 'w' || ch === 'M' || ch === 'W') w += 10.5;
    else if (/[A-Z]/.test(ch)) w += 8.4;
    else if (/[ijlrft1]/.test(ch)) w += 5.2;
    else w += 7.3;
  }
  return w;
}

function distPtSeg(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy;
  const t = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}
function distPtBox(p: P, b: Box): number {
  return Math.hypot(Math.max(b.x0 - p[0], 0, p[0] - b.x1), Math.max(b.y0 - p[1], 0, p[1] - b.y1));
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

interface Lab {
  text: string;
  cands: P[];
}
interface Placed {
  text: string;
  box: Box;
  /** The invisible anchor point: the renderer draws text 8 px right of and 8 px above it. */
  A: P;
}

const boxAt = (c: P, w: number): Box => ({ x0: c[0] - w / 2 - 1.5, x1: c[0] + w / 2 + 1.5, y0: c[1] - 6.5, y1: c[1] + 6.5 });
const anchorOf = (c: P, w: number): P => [c[0] - 8 - w / 2, c[1] - 12.3];
/** How far a label box reaches in direction d from its centre. */
const reach = (d: P, w: number) => Math.abs(d[0]) * (w / 2 + 1.5) + Math.abs(d[1]) * 6.5;

/** Place each label at its first candidate that stays clear of every line and earlier label. */
function placeLabels(labs: Lab[], obstacles: Array<[P, P]>): Placed[] {
  const placed: Placed[] = [];
  for (const lab of labs) {
    const w = textW(lab.text);
    let best: (Placed & { score: number }) | null = null;
    for (const c of lab.cands) {
      const box = boxAt(c, w);
      const A = anchorOf(c, w);
      let score = Infinity;
      for (const [a, b] of obstacles) score = Math.min(score, distSegBox(a, b, box), distPtSeg(A, a, b) - 5.5);
      for (const p of placed) score = Math.min(score, distBoxBox(p.box, box) - 2, distPtBox(p.A, box) - 5.5, distPtBox(A, p.box) - 5.5);
      if (!best || score > best.score) best = { text: lab.text, box, A, score };
      if (score >= 3) break;
    }
    placed.push({ text: best!.text, box: best!.box, A: best!.A });
  }
  return placed;
}

function signedArea(p: P[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}

interface Extra {
  from: P;
  to: P;
  dashed?: boolean;
  label?: string;
  /** Label the segment without drawing it (to label part of a side). */
  hidden?: boolean;
}
interface TriSpec {
  /** The three vertices in model units (y up). */
  pts: P[];
  verts?: Array<string | null>;
  /** sides[k] labels the side opposite vertex k. */
  sides?: Array<string | null>;
  /** angles[k] is written inside the angle at vertex k (an arc is drawn there too). */
  angles?: Array<string | null>;
  /** Draw an arc at vertex k without a label. */
  arcs?: boolean[];
  /** Vertex with a right-angle square. */
  right?: number;
  /** Extra segments (an altitude, say), in model units. */
  extra?: Extra[];
  /** A right-angle mark at the foot of an altitude: the foot, a point along the base and the top of the altitude. */
  foot?: { at: P; along: P; top: P };
}

/** An acute (or right) triangle on a plain canvas with labelled vertices, sides and angles. */
function triFigure(o: TriSpec): PlaneFigure {
  const model = [...o.pts, ...(o.extra ?? []).flatMap((e) => [e.from, e.to])];
  const mx = Math.min(...model.map((p) => p[0]));
  const my = Math.min(...model.map((p) => p[1]));
  const mw = Math.max(...model.map((p) => p[0])) - mx || 1;
  const mh = Math.max(...model.map((p) => p[1])) - my || 1;
  let s = Math.min(235 / mw, 165 / mh);
  let polys: Array<{ points: P[]; color: Color }> = [];
  let segs: Extra[] = [];
  let placed: Placed[] = [];
  let bounds = { x0: 0, x1: 0, y0: 0, y1: 0 };
  for (let iter = 0; iter < 60; iter++) {
    const T = (p: P): P => [(p[0] - mx) * s, (p[1] - my) * s];
    const V = o.pts.map(T);
    polys = [{ points: [V[0], V[1], V[2], V[0]], color: 'brand' }];
    const obstacles: Array<[P, P]> = [
      [V[0], V[1]],
      [V[1], V[2]],
      [V[2], V[0]],
    ];
    segs = (o.extra ?? []).map((e) => ({ ...e, from: T(e.from), to: T(e.to) }));
    for (const e of segs) if (!e.hidden) obstacles.push([e.from, e.to]);
    const ccw = signedArea(V) > 0;
    const angleLabs: Lab[] = [];
    const vertLabs: Lab[] = [];
    const sideLabs: Lab[] = [];
    for (let k = 0; k < 3; k++) {
      const Vk = V[k];
      const e1 = unit(sub(V[(k + 1) % 3], Vk));
      const e2 = unit(sub(V[(k + 2) % 3], Vk));
      const a1 = Math.atan2(e1[1], e1[0]);
      let span = Math.atan2(e2[1], e2[0]) - a1;
      while (span > Math.PI) span -= 2 * Math.PI;
      while (span < -Math.PI) span += 2 * Math.PI;
      if (o.right === k) {
        const q = 11;
        const p1 = add(Vk, mul(e1, q));
        const p3 = add(Vk, mul(e2, q));
        const p2 = add(p1, mul(e2, q));
        polys.push({ points: [p1, p2, p3], color: 'accent' });
        obstacles.push([p1, p2], [p2, p3]);
      } else if (o.arcs?.[k] ?? !!o.angles?.[k]) {
        const r = 15;
        const n = 12;
        const pts: P[] = [];
        for (let t = 0; t <= n; t++) {
          const a = a1 + (span * t) / n;
          pts.push(add(Vk, [r * Math.cos(a), r * Math.sin(a)]));
        }
        polys.push({ points: pts, color: 'accent' });
        for (let t = 0; t < n; t++) obstacles.push([pts[t], pts[t + 1]]);
      }
      const lab = o.angles?.[k];
      if (lab) {
        const w = textW(lab);
        const cands: P[] = [];
        for (const r of [21, 25, 29, 34, 40, 47, 55, 64, 75])
          for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.22, 0.78]) {
            const a = a1 + span * t;
            const d: P = [Math.cos(a), Math.sin(a)];
            cands.push(add(Vk, mul(d, r + 0.6 * reach(d, w))));
          }
        angleLabs.push({ text: lab, cands });
      }
      const vl = o.verts?.[k];
      if (vl) {
        const w = textW(vl);
        const out = unit(mul(add(e1, e2), -1));
        const cands: P[] = [];
        for (const r of [6, 9, 13, 18, 24])
          for (const off of [0, 25, -25, 50, -50, 75, -75, 100, -100]) {
            const d = rot(out, off);
            cands.push(add(Vk, mul(d, r + reach(d, w))));
          }
        vertLabs.push({ text: vl, cands });
      }
      const sl = o.sides?.[k];
      if (sl) {
        const a = V[(k + 1) % 3];
        const b = V[(k + 2) % 3];
        const dir = unit(sub(b, a));
        const n: P = ccw ? [dir[1], -dir[0]] : [-dir[1], dir[0]];
        const w = textW(sl);
        const cands: P[] = [];
        for (let i = 0; i < 10; i++) for (const t of [0.5, 0.42, 0.58, 0.33, 0.67]) cands.push(add(lerp(a, b, t), mul(n, reach(n, w) + 4 + 2.5 * i)));
        sideLabs.push({ text: sl, cands });
      }
    }
    for (const e of segs) {
      if (!e.label) continue;
      const w = textW(e.label);
      const dir = unit(sub(e.to, e.from));
      const n1: P = [dir[1], -dir[0]];
      const n2: P = [-dir[1], dir[0]];
      const cands: P[] = [];
      for (let i = 0; i < 8; i++)
        for (const t of [0.5, 0.4, 0.6, 0.3, 0.7]) for (const n of [n1, n2]) cands.push(add(lerp(e.from, e.to, t), mul(n, reach(n, w) + 4 + 2.5 * i)));
      sideLabs.push({ text: e.label, cands });
    }
    if (o.foot) {
      const F = T(o.foot.at);
      const al = unit(sub(T(o.foot.along), F));
      const up = unit(sub(T(o.foot.top), F));
      const q = 9;
      const p1 = add(F, mul(al, q));
      const p2 = add(p1, mul(up, q));
      const p3 = add(F, mul(up, q));
      polys.push({ points: [p1, p2, p3], color: 'accent' });
      obstacles.push([p1, p2], [p2, p3]);
    }
    placed = placeLabels([...angleLabs, ...vertLabs, ...sideLabs], obstacles);
    const xs = [...polys.flatMap((p) => p.points.map((q) => q[0])), ...placed.flatMap((p) => [p.box.x0, p.box.x1, p.A[0] - 5, p.A[0] + 5])];
    const ys = [...polys.flatMap((p) => p.points.map((q) => q[1])), ...placed.flatMap((p) => [p.box.y0, p.box.y1, p.A[1] - 5, p.A[1] + 5])];
    bounds = { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
    if (bounds.x1 - bounds.x0 <= 332 && bounds.y1 - bounds.y0 <= 250) break;
    s *= 0.93;
  }
  const ox = (340 - (bounds.x1 - bounds.x0)) / 2 - bounds.x0;
  const oy = 6 - bounds.y0;
  const r1 = (v: number) => Math.round(v * 10) / 10;
  const tr = (p: P): [number, number] => [r1(p[0] + ox), r1(p[1] + oy)];
  const segments: PlaneSegment[] = segs.filter((e) => !e.hidden).map((e) => ({ from: tr(e.from), to: tr(e.to), color: 'muted', ...(e.dashed ? { dashed: true } : {}) }));
  const points: PlanePoint[] = placed.map((p) => {
    const [x, y] = tr(p.A);
    return { x, y, label: p.text, color: 'muted', open: true };
  });
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 340, yMin: 0, yMax: Math.ceil(bounds.y1 - bounds.y0 + 12), step: 1000 },
    polylines: polys.map((p) => ({ points: p.points.map(tr), color: p.color })),
    ...(segments.length ? { segments } : {}),
    points,
    hideTickLabels: true,
  };
}

/** Vertices (model units) for side lengths side[k] opposite vertex k, with the side opposite `base` along the bottom. */
function triPts(side: number[], base: number, mirror: boolean): P[] {
  const i = (base + 1) % 3;
  const j = (base + 2) % 3;
  const L = side[base];
  const d1 = side[j]; // |V_i V_base|
  const d2 = side[i]; // |V_j V_base|
  const x = (L * L + d1 * d1 - d2 * d2) / (2 * L);
  const y = Math.sqrt(Math.max(d1 * d1 - x * x, 0));
  const pts: P[] = [];
  pts[i] = [0, 0];
  pts[j] = [L, 0];
  pts[base] = [x, y];
  return mirror ? pts.map(([px, py]) => [-px, py] as P) : pts;
}

const nulls = (): Array<string | null> => [null, null, null];

/** "2ab" for single letters, "2(SP)(SQ)" for longer names. */
const twoProd = (p: string, q: string) => (p.length === 1 && q.length === 1 ? `2${p}${q}` : `2(${p})(${q})`);

// ---------------------------------------------------------------------------
// Worked-solution builders shared by the skills
// ---------------------------------------------------------------------------

/** Sine law for a side: x / sin X = g / sin G. Returns steps ending with the calculator value. */
function sineSideSteps(o: { x: string; X: string; xAng: number; g: string; G: string; gAng: number; gVal: number; value: number; dp: number }): string[] {
  return [
    `$$\\dfrac{${o.x}}{\\sin ${o.X}} = \\dfrac{${o.g}}{\\sin ${o.G}}$$`,
    `$$\\dfrac{${o.x}}{\\sin ${deg(o.xAng)}} = \\dfrac{${fmt(o.gVal)}}{\\sin ${deg(o.gAng)}}$$`,
    `Multiply both sides by $\\sin ${deg(o.xAng)}$: $$${o.x} = \\dfrac{${fmt(o.gVal)} \\sin ${deg(o.xAng)}}{\\sin ${deg(o.gAng)}} \\approx ${calc(o.value, o.dp)}$$`,
  ];
}

/** Sine law for an angle: sin X / x = sin G / g. */
function sineAngleSteps(o: { X: string; x: string; xVal: number; G: string; g: string; gVal: number; gAng: number; value: number; dp: number }): string[] {
  const r = (o.xVal * sinD(o.gAng)) / o.gVal;
  return [
    `$$\\dfrac{\\sin ${o.X}}{${o.x}} = \\dfrac{\\sin ${o.G}}{${o.g}}$$`,
    `$$\\dfrac{\\sin ${o.X}}{${fmt(o.xVal)}} = \\dfrac{\\sin ${deg(o.gAng)}}{${fmt(o.gVal)}}$$`,
    `Multiply both sides by $${fmt(o.xVal)}$: $$\\sin ${o.X} = \\dfrac{${fmt(o.xVal)} \\sin ${deg(o.gAng)}}{${fmt(o.gVal)}} \\approx ${fmtFixed(r, 4)}$$`,
    `Use the inverse sine: $$\\angle ${o.X} = \\sin^{-1}(${fmtFixed(r, 4)}) \\approx ${deg(calc(o.value, o.dp))}$$`,
  ];
}

/** Cosine law for a side: x² = p² + q² − 2pq cos K. */
function cosSideSteps(o: { x: string; p: string; q: string; pVal: number; qVal: number; K: string; kAng: number; value: number; dp: number }): string[] {
  const p2 = o.pVal * o.pVal;
  const q2 = o.qVal * o.qVal;
  const t = 2 * o.pVal * o.qVal * cosD(o.kAng);
  const sq = o.value * o.value;
  return [
    `$$${o.x}^2 = ${o.p}^2 + ${o.q}^2 - ${twoProd(o.p, o.q)}\\cos ${o.K}$$`,
    `$$${o.x}^2 = ${fmt(o.pVal)}^2 + ${fmt(o.qVal)}^2 - 2(${fmt(o.pVal)})(${fmt(o.qVal)})\\cos ${deg(o.kAng)}$$`,
    `$$${o.x}^2 \\approx ${fmt(p2)} + ${fmt(q2)} - ${fmtFixed(t, 2)} = ${fmtFixed(sq, 2)}$$`,
    `Take the square root: $$${o.x} \\approx \\sqrt{${fmtFixed(sq, 2)}} \\approx ${calc(o.value, o.dp)}$$`,
  ];
}

/** Cosine law for an angle: cos K = (p² + q² − k²) / 2pq. */
function cosAngleSteps(o: { K: string; k: string; p: string; q: string; kVal: number; pVal: number; qVal: number; value: number; dp: number }): string[] {
  const num = o.pVal * o.pVal + o.qVal * o.qVal - o.kVal * o.kVal;
  const den = 2 * o.pVal * o.qVal;
  const c = num / den;
  return [
    `$$\\cos ${o.K} = \\dfrac{${o.p}^2 + ${o.q}^2 - ${o.k}^2}{${twoProd(o.p, o.q)}}$$`,
    `$$\\cos ${o.K} = \\dfrac{${fmt(o.pVal)}^2 + ${fmt(o.qVal)}^2 - ${fmt(o.kVal)}^2}{2(${fmt(o.pVal)})(${fmt(o.qVal)})} = \\dfrac{${fmt(num)}}{${fmt(den)}} \\approx ${fmtFixed(c, 4)}$$`,
    `Use the inverse cosine: $$\\angle ${o.K} = \\cos^{-1}(${fmtFixed(c, 4)}) \\approx ${deg(calc(o.value, o.dp))}$$`,
  ];
}

// ---------------------------------------------------------------------------
// Lesson 3.1 — The sine law
// ---------------------------------------------------------------------------

interface Setup {
  V: V3;
  u: Unit;
  base: number;
  mirror: boolean;
}
function setup(rng: Rng): Setup {
  return { V: rng.pick(LETTERS), u: rng.pick(['cm', 'm', 'cm', 'm', 'mm'] as const), base: rng.int(0, 2), mirror: rng.chance(0.5) };
}

/**
 * Find a side with the sine law.
 * aas: know ∠i, ∠j and side i; find side j.  aas3: same givens; find side k (third angle first).
 * asa: know ∠i, ∠j and the side between them (side k); find side i (third angle first).
 */
function sineSide(rng: Rng, d: Difficulty, mode: 'aas' | 'aas3' | 'asa'): GenOutput {
  const t = setup(rng);
  const { V, u } = t;
  const r = retry(
    () => {
      const ang = acuteAngles(rng);
      const [i, j] = rng.sample([0, 1, 2], 2);
      const k = 3 - i - j;
      const g = mode === 'asa' ? k : i;
      const q = mode === 'aas' ? j : mode === 'aas3' ? k : i;
      const len = d === 1 ? rng.int(6, 30) : u === 'mm' ? rng.int(25, 90) : rng.float(4, 40, 1);
      return { ang, i, j, k, g, q, len, side: sidesFromAngles(ang, g, len) };
    },
    (x) => safe(x.side[x.q], 1) && x.len >= 4,
  );
  const { ang, i, j, k, g, q, len, side } = r;
  const x = side[q];
  const s = (n: number) => V[n].toLowerCase();
  const sides = nulls();
  sides[g] = fl(len, u);
  sides[q] = s(q);
  const angles = nulls();
  angles[i] = degL(ang[i]);
  angles[j] = degL(ang[j]);
  const third = mode !== 'aas';
  return {
    prompt: `In acute $${triName(V)}$, $\\angle ${V[i]} = ${deg(ang[i])}$, $\\angle ${V[j]} = ${deg(ang[j])}$ and $${s(g)} = ${ms(len, u)}$. Determine the length of side $${s(q)}$, ${nearest(1, u)}.`,
    figure: triFigure({ pts: triPts(side, t.base, t.mirror), verts: V, sides, angles }),
    parts: [numPart(x, { decimals: 1, suffix: u })],
    hints: third
      ? [
          mode === 'asa'
            ? 'The given side is not opposite either of the given angles. Which angle is opposite it?'
            : `Side $${s(q)}$ is opposite the angle you were not given. Find that angle first.`,
          `Use the angle sum ($180^\\circ$) to find $\\angle ${V[k]}$. Then use the sine law: $\\dfrac{${s(q)}}{\\sin ${V[q]}} = \\dfrac{${s(g)}}{\\sin ${V[g]}}$.`,
        ]
      : [
          'Look for a side and the angle opposite it that you both know. That matching pair unlocks the sine law.',
          `Write $\\dfrac{${s(q)}}{\\sin ${V[q]}} = \\dfrac{${s(g)}}{\\sin ${V[g]}}$, then multiply both sides by $\\sin ${V[q]}$.`,
        ],
    solution: [
      ...(third ? [`Find the third angle with the angle sum: $\\angle ${V[k]} = 180^\\circ - ${deg(ang[i])} - ${deg(ang[j])} = ${deg(ang[k])}$.`] : []),
      `Side $${s(g)}$ and $\\angle ${V[g]}$ are a matching pair (a side and its opposite angle). Side $${s(q)}$ is opposite $\\angle ${V[q]}$. Use the sine law:`,
      ...sineSideSteps({ x: s(q), X: V[q], xAng: ang[q], g: s(g), G: V[g], gAng: ang[g], gVal: len, value: x, dp: 1 }),
      `Side $${s(q)}$ is about $${ms(fmtFixed(x, 1), u)}$ long.`,
    ],
  };
}

/**
 * Find an angle with the sine law: know sides i and j (side i longer) and ∠i.
 * then: 'side' asks for side k instead; 'third' also asks for ∠k.
 */
function sineAngle(rng: Rng, d: Difficulty, dp: number, then?: 'side' | 'third'): GenOutput {
  const t = setup(rng);
  const { V, u } = t;
  const r = retry(
    () => {
      const angT = acuteAngles(rng, 40, 82);
      const order = [0, 1, 2].sort((a, b) => angT[b] - angT[a]);
      const pair = rng.pick([
        [order[0], order[1]],
        [order[0], order[2]],
        [order[1], order[2]],
      ]);
      const [i, j] = pair;
      const k = 3 - i - j;
      const si = d === 1 ? rng.int(8, 30) : u === 'mm' ? rng.int(25, 90) : rng.float(5, 40, 1);
      const raw = (si * sinD(angT[j])) / sinD(angT[i]);
      const sj = d === 1 || u === 'mm' ? Math.round(raw) : roundTo(raw, 1);
      const J = asinD((sj * sinD(angT[i])) / si);
      const ang = [0, 0, 0];
      ang[i] = angT[i];
      ang[j] = J;
      ang[k] = 180 - angT[i] - J;
      const side = sidesFromAngles(ang, i, si);
      side[j] = sj;
      return { ang, i, j, k, si, sj, side };
    },
    (x) =>
      x.sj < x.si &&
      x.sj > 0 &&
      acuteOk(x.ang, 30, 86) &&
      safe(x.ang[x.j], dp) &&
      (then !== 'side' || safe(x.side[x.k], 1)) &&
      (then !== 'third' || safe(x.ang[x.k], dp)),
  );
  const { ang, i, j, k, si, sj, side } = r;
  const s = (n: number) => V[n].toLowerCase();
  const sides = nulls();
  sides[i] = fl(si, u);
  sides[j] = fl(sj, u);
  if (then === 'side') sides[k] = s(k);
  const angles = nulls();
  angles[i] = degL(ang[i]);
  if (!then) angles[j] = '?';
  if (then === 'third') {
    angles[j] = '?';
    angles[k] = '?';
  }
  const givens = `In acute $${triName(V)}$, $${s(i)} = ${ms(si, u)}$, $${s(j)} = ${ms(sj, u)}$ and $\\angle ${V[i]} = ${deg(ang[i])}$.`;
  const angleSteps = sineAngleSteps({ X: V[j], x: s(j), xVal: sj, G: V[i], g: s(i), gVal: si, gAng: ang[i], value: ang[j], dp });
  const figure = triFigure({ pts: triPts(side, t.base, t.mirror), verts: V, sides, angles });
  if (then === 'side') {
    const x = side[k];
    return {
      prompt: `${givens} Determine the length of side $${s(k)}$, ${nearest(1, u)}.`,
      figure,
      parts: [numPart(x, { decimals: 1, suffix: u })],
      hints: [
        `You cannot use the sine law for side $${s(k)}$ yet, because you do not know $\\angle ${V[k]}$. Find $\\angle ${V[j]}$ first.`,
        `Sine law for $\\angle ${V[j]}$, then the angle sum for $\\angle ${V[k]}$, then the sine law again for side $${s(k)}$. Keep full calculator values until the end.`,
      ],
      solution: [
        `Step 1: find $\\angle ${V[j]}$, which is opposite the known side $${s(j)}$.`,
        ...angleSteps,
        `Step 2: $\\angle ${V[k]} = 180^\\circ - ${deg(ang[i])} - ${deg(calc(ang[j], 0))} \\approx ${deg(calc(ang[k], 0))}$.`,
        `Step 3: use the sine law again for side $${s(k)}$.`,
        ...sineSideSteps({ x: s(k), X: V[k], xAng: roundTo(ang[k], 2), g: s(i), G: V[i], gAng: ang[i], gVal: si, value: x, dp: 1 }),
        `Side $${s(k)}$ is about $${ms(fmtFixed(x, 1), u)}$ long.`,
      ],
    };
  }
  if (then === 'third') {
    return {
      prompt: `${givens} Determine the measures of $\\angle ${V[j]}$ and $\\angle ${V[k]}$, ${angNearest(dp)}.`,
      figure,
      parts: [
        numPart(ang[j], { decimals: dp, label: `$\\angle ${V[j]} =$`, suffix: '°' }),
        numPart(ang[k], { decimals: dp, label: `$\\angle ${V[k]} =$`, suffix: '°' }),
      ],
      hints: [
        `Side $${s(i)}$ and $\\angle ${V[i]}$ are a matching pair, and side $${s(j)}$ is opposite $\\angle ${V[j]}$.`,
        `Use $\\dfrac{\\sin ${V[j]}}{${s(j)}} = \\dfrac{\\sin ${V[i]}}{${s(i)}}$ for $\\angle ${V[j]}$, then the angle sum for $\\angle ${V[k]}$.`,
      ],
      solution: [
        `Side $${s(i)}$ and $\\angle ${V[i]}$ are a matching pair. Use the sine law with the angles on top:`,
        ...angleSteps,
        `Angle sum: $\\angle ${V[k]} = 180^\\circ - ${deg(ang[i])} - ${deg(calc(ang[j], dp))} \\approx ${deg(calc(ang[k], dp))}$.`,
        `$\\angle ${V[j]} \\approx ${deg(fmtFixed(ang[j], dp))}$ and $\\angle ${V[k]} \\approx ${deg(fmtFixed(ang[k], dp))}$.`,
      ],
    };
  }
  return {
    prompt: `${givens} Determine the measure of $\\angle ${V[j]}$, ${angNearest(dp)}.`,
    figure,
    parts: [numPart(ang[j], { decimals: dp, suffix: '°' })],
    hints: [
      `Side $${s(i)}$ and $\\angle ${V[i]}$ are a matching pair. Side $${s(j)}$ is opposite the angle you want.`,
      `Use the sine law with the angles on top: $\\dfrac{\\sin ${V[j]}}{${s(j)}} = \\dfrac{\\sin ${V[i]}}{${s(i)}}$. Then use $\\sin^{-1}$.`,
    ],
    solution: [
      `Side $${s(i)}$ and $\\angle ${V[i]}$ are a matching pair. To find an angle, use the sine law with the angles on top:`,
      ...angleSteps,
      `$\\angle ${V[j]}$ is about $${deg(fmtFixed(ang[j], dp))}$.`,
    ],
  };
}

/** Know ∠i, ∠j and side k (between them); find both other sides. */
function sineTwoSides(rng: Rng): GenOutput {
  const t = setup(rng);
  const { V, u } = t;
  const r = retry(
    () => {
      const ang = acuteAngles(rng);
      const k = rng.int(0, 2);
      const [i, j] = others(k);
      const len = u === 'mm' ? rng.int(25, 90) : rng.float(4, 40, 1);
      return { ang, i, j, k, len, side: sidesFromAngles(ang, k, len) };
    },
    (x) => safe(x.side[x.i], 1) && safe(x.side[x.j], 1),
  );
  const { ang, i, j, k, len, side } = r;
  const s = (n: number) => V[n].toLowerCase();
  const sides = nulls();
  sides[k] = fl(len, u);
  sides[i] = s(i);
  sides[j] = s(j);
  const angles = nulls();
  angles[i] = degL(ang[i]);
  angles[j] = degL(ang[j]);
  return {
    prompt: `In acute $${triName(V)}$, $\\angle ${V[i]} = ${deg(ang[i])}$, $\\angle ${V[j]} = ${deg(ang[j])}$ and $${s(k)} = ${ms(len, u)}$. Determine the lengths of sides $${s(i)}$ and $${s(j)}$, ${nearest(1, u)}.`,
    figure: triFigure({ pts: triPts(side, t.base, t.mirror), verts: V, sides, angles }),
    parts: [numPart(side[i], { decimals: 1, label: `$${s(i)} =$`, suffix: u }), numPart(side[j], { decimals: 1, label: `$${s(j)} =$`, suffix: u })],
    hints: [
      `The known side $${s(k)}$ is opposite $\\angle ${V[k]}$, which you can find with the angle sum.`,
      `Once you know $\\angle ${V[k]}$, use $\\dfrac{${s(k)}}{\\sin ${V[k]}}$ as the known ratio in the sine law for each unknown side.`,
    ],
    solution: [
      `Angle sum: $\\angle ${V[k]} = 180^\\circ - ${deg(ang[i])} - ${deg(ang[j])} = ${deg(ang[k])}$. Now side $${s(k)}$ and $\\angle ${V[k]}$ are a matching pair.`,
      ...sineSideSteps({ x: s(i), X: V[i], xAng: ang[i], g: s(k), G: V[k], gAng: ang[k], gVal: len, value: side[i], dp: 1 }),
      ...sineSideSteps({ x: s(j), X: V[j], xAng: ang[j], g: s(k), G: V[k], gAng: ang[k], gVal: len, value: side[j], dp: 1 }).slice(1),
      `$${s(i)} \\approx ${ms(fmtFixed(side[i], 1), u)}$ and $${s(j)} \\approx ${ms(fmtFixed(side[j], 1), u)}$.`,
    ],
  };
}

const sineLaw = skill({
  id: 'm202-sine-law',
  name: 'Using the sine law',
  description: 'Use the sine law to determine an unknown side or angle in an acute triangle.',
  outcomes: ['G3'],
  lessonId: 'm202-3-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.65) ? sineSide(rng, 1, 'aas') : sineAngle(rng, 1, 0);
    if (d === 2) {
      const v = rng.pick(['asa', 'aas3', 'angle', 'angle'] as const);
      return v === 'angle' ? sineAngle(rng, 2, 0) : sineSide(rng, 2, v);
    }
    const v = rng.pick(['side', 'side', 'third', 'two'] as const);
    if (v === 'two') return sineTwoSides(rng);
    return v === 'side' ? sineAngle(rng, 3, 0, 'side') : sineAngle(rng, 3, 1, 'third');
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.2 — The cosine law
// ---------------------------------------------------------------------------

/** SAS: know sides i and j and the angle between them (∠k); find side k (and, optionally, ∠i). */
function cosSide(rng: Rng, dec: boolean, thenAngle = false): GenOutput {
  const t = setup(rng);
  const { V, u } = t;
  const r = retry(
    () => {
      const k = rng.int(0, 2);
      const [i, j] = others(k);
      const pick = () => (u === 'mm' ? rng.int(20, 95) : dec ? rng.float(4, 35, 1) : rng.int(5, 20));
      const si = pick();
      const sj = pick();
      const C = rng.int(38, 82);
      const side = [0, 0, 0];
      side[i] = si;
      side[j] = sj;
      side[k] = Math.sqrt(si * si + sj * sj - 2 * si * sj * cosD(C));
      const ang = anglesFromSides(side);
      ang[k] = C;
      const target = rng.pick([i, j]);
      return { i, j, k, si, sj, C, side, ang, target };
    },
    (x) => acuteOk(x.ang, 32, 86) && safe(x.side[x.k], 1) && Math.abs(x.si - x.sj) >= 1 && (!thenAngle || safe(x.ang[x.target], 0)),
  );
  const { i, j, k, si, sj, C, side, ang, target } = r;
  const s = (n: number) => V[n].toLowerCase();
  const x = side[k];
  const sides = nulls();
  sides[i] = fl(si, u);
  sides[j] = fl(sj, u);
  sides[k] = s(k);
  const angles = nulls();
  angles[k] = degL(C);
  if (thenAngle) angles[target] = '?';
  const steps = cosSideSteps({ x: s(k), p: s(i), q: s(j), pVal: si, qVal: sj, K: V[k], kAng: C, value: x, dp: 1 });
  const figure = triFigure({ pts: triPts(side, t.base, t.mirror), verts: V, sides, angles });
  const givens = `In acute $${triName(V)}$, $${s(i)} = ${ms(si, u)}$, $${s(j)} = ${ms(sj, u)}$ and $\\angle ${V[k]} = ${deg(C)}$.`;
  if (thenAngle) {
    const T = ang[target];
    return {
      prompt: `${givens} (a) Determine the length of side $${s(k)}$, ${nearest(1, u)}. (b) Determine the measure of $\\angle ${V[target]}$, ${angNearest(0)}.`,
      figure,
      parts: [
        numPart(x, { decimals: 1, label: `(a) $${s(k)} =$`, suffix: u }),
        numPart(T, { decimals: 0, label: `(b) $\\angle ${V[target]} =$`, suffix: '°' }),
      ],
      hints: [
        `$\\angle ${V[k]}$ is the angle between the two known sides, so start with the cosine law.`,
        `Once you know side $${s(k)}$, you have a matching pair ($${s(k)}$ and $\\angle ${V[k]}$), so the sine law gives $\\angle ${V[target]}$. Use the unrounded value of $${s(k)}$.`,
      ],
      solution: [
        `(a) Two sides and the contained angle are known, so use the cosine law:`,
        ...steps,
        `(b) Now $${s(k)}$ and $\\angle ${V[k]}$ are a matching pair. Use the sine law with the angles on top (the cosine law would work too):`,
        ...sineAngleSteps({ X: V[target], x: s(target), xVal: side[target], G: V[k], g: s(k), gVal: roundTo(x, 3), gAng: C, value: T, dp: 0 }),
        `$${s(k)} \\approx ${ms(fmtFixed(x, 1), u)}$ and $\\angle ${V[target]} \\approx ${deg(fmtFixed(T, 0))}$.`,
      ],
    };
  }
  return {
    prompt: `${givens} Determine the length of side $${s(k)}$, ${nearest(1, u)}.`,
    figure,
    parts: [numPart(x, { decimals: 1, suffix: u })],
    hints: [
      `There is no matching side–angle pair, so the sine law will not work. $\\angle ${V[k]}$ is the angle **between** the two known sides.`,
      `Use the cosine law: $${s(k)}^2 = ${s(i)}^2 + ${s(j)}^2 - ${twoProd(s(i), s(j))}\\cos ${V[k]}$.`,
    ],
    solution: [
      `You know two sides and the angle between them (the contained angle), so use the cosine law:`,
      ...steps,
      `Side $${s(k)}$ is about $${ms(fmtFixed(x, 1), u)}$ long.`,
    ],
  };
}

/** SSS: know all three sides; find ∠k (a named angle, or the largest or smallest angle). */
function cosAngle(rng: Rng, dec: boolean, which: 'named' | 'largest' | 'smallest' = 'named', dp = 0): GenOutput {
  const t = setup(rng);
  const { V, u } = t;
  const r = retry(
    () => {
      const pick = () => (u === 'mm' ? rng.int(20, 95) : dec ? rng.float(4, 30, 1) : rng.int(5, 20));
      const side = [pick(), pick(), pick()];
      const ang = anglesFromSides(side);
      const sorted = [0, 1, 2].sort((a, b) => side[a] - side[b]);
      const k = which === 'largest' ? sorted[2] : which === 'smallest' ? sorted[0] : rng.int(0, 2);
      return { side, ang, k, sorted };
    },
    (x) =>
      acuteOk(x.ang, 34, 86) &&
      safe(x.ang[x.k], dp) &&
      x.side[x.sorted[1]] - x.side[x.sorted[0]] >= 1 &&
      x.side[x.sorted[2]] - x.side[x.sorted[1]] >= 1,
    200,
  );
  const { side, ang, k } = r;
  const [i, j] = others(k);
  const s = (n: number) => V[n].toLowerCase();
  const sides = side.map((v) => fl(v, u));
  const angles = nulls();
  if (which === 'named') angles[k] = '?';
  const what = which === 'named' ? `the measure of $\\angle ${V[k]}$` : `the measure of the ${which} angle in $${triName(V)}$`;
  return {
    prompt: `In acute $${triName(V)}$, $${s(0)} = ${ms(side[0], u)}$, $${s(1)} = ${ms(side[1], u)}$ and $${s(2)} = ${ms(side[2], u)}$. Determine ${what}, ${angNearest(dp)}.`,
    figure: triFigure({ pts: triPts(side, t.base, t.mirror), verts: V, sides, angles }),
    parts: [numPart(ang[k], { decimals: dp, suffix: '°' })],
    hints:
      which === 'named'
        ? ['You know all three sides and no angles, so use the cosine law.', `Rearranged: $\\cos ${V[k]} = \\dfrac{${s(i)}^2 + ${s(j)}^2 - ${s(k)}^2}{${twoProd(s(i), s(j))}}$. The side opposite the angle you want is the one subtracted.`]
        : [
            `In any triangle, the ${which} angle is opposite the ${which === 'largest' ? 'longest' : 'shortest'} side.`,
            `That angle is $\\angle ${V[k]}$. Use $\\cos ${V[k]} = \\dfrac{${s(i)}^2 + ${s(j)}^2 - ${s(k)}^2}{${twoProd(s(i), s(j))}}$.`,
          ],
    solution: [
      ...(which === 'named'
        ? ['You know all three sides, so use the cosine law, rearranged to find an angle:']
        : [`The ${which} angle is opposite the ${which === 'largest' ? 'longest' : 'shortest'} side, $${s(k)} = ${ms(side[k], u)}$. So find $\\angle ${V[k]}$ with the cosine law:`]),
      ...cosAngleSteps({ K: V[k], k: s(k), p: s(i), q: s(j), kVal: side[k], pVal: side[i], qVal: side[j], value: ang[k], dp }),
      `${which === 'named' ? `$\\angle ${V[k]}$` : `The ${which} angle, $\\angle ${V[k]}$,`} is about $${deg(fmtFixed(ang[k], dp))}$.`,
    ],
  };
}

const cosineLaw = skill({
  id: 'm202-cosine-law',
  name: 'Using the cosine law',
  description: 'Use the cosine law to find a side from two sides and the contained angle, or an angle from three sides.',
  outcomes: ['G3'],
  lessonId: 'm202-3-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.65) ? cosSide(rng, false) : cosAngle(rng, false);
    if (d === 2) return rng.chance(0.5) ? cosSide(rng, true) : cosAngle(rng, true, 'named', rng.chance(0.3) ? 1 : 0);
    return rng.chance(0.5) ? cosSide(rng, rng.chance(0.5), true) : cosAngle(rng, rng.chance(0.5), rng.pick(['largest', 'smallest'] as const));
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.3 — Choosing a law
// ---------------------------------------------------------------------------

type Situation = 'aas' | 'asa' | 'ssa' | 'sas' | 'sss' | 'right';

const PLAIN = ['The sine law', 'The cosine law', 'A primary trigonometric ratio (SOH CAH TOA)', 'The Pythagorean theorem'];

const R = {
  sinePair: 'The sine law, because a side and the angle opposite it are both known.',
  sineAfterSum: 'The sine law, after using the angle sum to find the third angle.',
  cosSAS: 'The cosine law, because two sides and the angle between them are known.',
  cosSSS: 'The cosine law, because all three sides are known.',
  primary: 'A primary trigonometric ratio, because the triangle has a right angle.',
  sineTwoSides: 'The sine law, because two sides and one angle are known.',
  cosTwoAngles: 'The cosine law, because two angles and a side are known.',
  pythag: 'The Pythagorean theorem, because two sides are known.',
  sineAllSides: 'The sine law, because all three sides are known.',
  cosPair: 'The cosine law, because a side and the angle opposite it are known.',
  neither: 'Neither law works: you need to know at least two sides.',
};

const REASONS: Record<Situation, { correct: string; wrong: string[]; plain: number; why: string }> = {
  aas: { correct: R.sinePair, wrong: [R.sineTwoSides, R.cosTwoAngles, R.cosSAS, R.cosPair], plain: 0, why: 'A side and its opposite angle are a matching pair, and the unknown side is opposite a known angle. That is exactly what the sine law needs.' },
  asa: { correct: R.sineAfterSum, wrong: [R.sineTwoSides, R.cosTwoAngles, R.neither, R.cosPair], plain: 0, why: 'The known side is not opposite a known angle yet. The angle sum gives the third angle, which completes a matching pair, so then the sine law works.' },
  ssa: { correct: R.sinePair, wrong: [R.sineAfterSum, R.cosSAS, R.cosSSS, R.cosPair], plain: 0, why: 'A side and its opposite angle are a matching pair, and the unknown angle is opposite a known side, so the sine law (angles on top) gives it.' },
  sas: { correct: R.cosSAS, wrong: [R.cosSSS, R.sineTwoSides, R.sinePair, R.pythag], plain: 1, why: 'There is no matching side–angle pair, so the sine law cannot start. Two sides and the contained angle is a cosine law situation.' },
  sss: { correct: R.cosSSS, wrong: [R.cosSAS, R.sineAllSides, R.sinePair, R.primary], plain: 1, why: 'No angles are known, so there is no matching pair for the sine law. With three sides, the cosine law gives any angle.' },
  right: { correct: R.primary, wrong: [R.sineTwoSides, R.cosSAS, R.cosTwoAngles, R.pythag], plain: 2, why: 'In a right triangle, SOH CAH TOA connects an acute angle with two sides directly. It is the quickest method.' },
};

/** A triangle drawn with the given information for a situation; the unknown is x (side) or θ (angle). */
function situationFigure(rng: Rng, sit: Situation): { figure: PlaneFigure; unknown: 'x' | '\\theta'; desc: string } {
  const V = rng.pick(LETTERS);
  const base = rng.int(0, 2);
  const mirror = rng.chance(0.5);
  const u = rng.pick(['cm', 'm'] as const);
  const sides = nulls();
  const angles = nulls();
  if (sit === 'right') {
    const rv = rng.int(0, 2);
    const [p, q] = others(rv);
    const A = rng.int(28, 62);
    const ang = [0, 0, 0];
    ang[rv] = 90;
    ang[p] = A;
    ang[q] = 90 - A;
    const hyp = rng.int(8, 30);
    const side = sidesFromAngles(ang, rv, hyp);
    sides[rv] = fl(hyp, u);
    sides[rng.pick([p, q])] = 'x';
    angles[p] = degL(A);
    return {
      figure: triFigure({ pts: triPts(side, rv, mirror), verts: V, sides, angles, right: rv }),
      unknown: 'x',
      desc: 'one acute angle and the hypotenuse of a right triangle',
    };
  }
  // The triangle is drawn from the rounded values that the diagram shows.
  const g = retry(
    () => {
      const ang = acuteAngles(rng, 42, 80);
      const [i, j] = rng.sample([0, 1, 2], 2);
      const k = 3 - i - j;
      const raw = sidesFromAngles(ang, i, rng.int(6, 30));
      let side = raw.map((v) => Math.round(v));
      let shown = ang.slice();
      if (sit === 'sas') {
        side[k] = Math.sqrt(side[i] ** 2 + side[j] ** 2 - 2 * side[i] * side[j] * cosD(ang[k]));
        shown = anglesFromSides(side);
        shown[k] = ang[k];
      } else if (sit === 'ssa') {
        const big = ang[i] > ang[j] ? i : j;
        const small = big === i ? j : i;
        shown[small] = asinD((side[small] * sinD(ang[big])) / side[big]);
        shown[k] = 180 - ang[big] - shown[small];
        side = sidesFromAngles(shown, big, side[big]);
        side[small] = Math.round(side[small]);
      } else if (sit === 'sss') {
        shown = anglesFromSides(side);
      } else {
        side = sidesFromAngles(ang, sit === 'aas' ? i : k, Math.round(raw[sit === 'aas' ? i : k]));
      }
      return { ang, i, j, k, side, shown };
    },
    (t) => acuteOk(t.shown, 30, 86) && new Set(t.side.map((v) => Math.round(v))).size === 3,
    200,
  );
  const { ang, i, j, k, side } = g;
  let unknown: 'x' | '\\theta' = 'x';
  let desc = '';
  const L = (n: number) => fl(Math.round(side[n]), u);
  if (sit === 'aas') {
    angles[i] = degL(ang[i]);
    angles[j] = degL(ang[j]);
    sides[i] = L(i);
    sides[j] = 'x';
    desc = 'two angles and a side opposite one of them';
  } else if (sit === 'asa') {
    angles[i] = degL(ang[i]);
    angles[j] = degL(ang[j]);
    sides[k] = L(k);
    sides[i] = 'x';
    desc = 'two angles and the side between them';
  } else if (sit === 'ssa') {
    // The known angle is opposite the longer known side, so the triangle is unique.
    const big = ang[i] > ang[j] ? i : j;
    const small = big === i ? j : i;
    angles[big] = degL(ang[big]);
    sides[big] = L(big);
    sides[small] = L(small);
    angles[small] = 'θ';
    unknown = '\\theta';
    desc = 'two sides and an angle opposite one of them';
  } else if (sit === 'sas') {
    angles[k] = degL(ang[k]);
    sides[i] = L(i);
    sides[j] = L(j);
    sides[k] = 'x';
    desc = 'two sides and the angle between them';
  } else {
    sides[0] = L(0);
    sides[1] = L(1);
    sides[2] = L(2);
    angles[k] = 'θ';
    unknown = '\\theta';
    desc = 'three sides';
  }
  return { figure: triFigure({ pts: triPts(side, base, mirror), verts: V, sides, angles }), unknown, desc };
}

const PLANS = [
  {
    sit: 'asa' as Situation,
    q: (V: V3) => `In $${triName(V)}$, you know $\\angle ${V[0]}$, $\\angle ${V[1]}$ and side $${V[2].toLowerCase()}$ (the side between them). You want side $${V[0].toLowerCase()}$. What is the best plan?`,
    correct: 'Find the third angle with the angle sum, then use the sine law.',
    wrong: ['Use the cosine law, because two angles and a side are known.', 'Use the sine law right away with the two given angles and the given side.', 'It cannot be done: you need to know two sides.'],
    why: (V: V3) => `Side $${V[2].toLowerCase()}$ is opposite $\\angle ${V[2]}$, which is not given yet. The angle sum gives $\\angle ${V[2]} = 180^\\circ - \\angle ${V[0]} - \\angle ${V[1]}$, which makes a matching pair. Then $\\dfrac{${V[0].toLowerCase()}}{\\sin ${V[0]}} = \\dfrac{${V[2].toLowerCase()}}{\\sin ${V[2]}}$.`,
  },
  {
    sit: 'sas' as Situation,
    q: (V: V3) => `In $${triName(V)}$, you know sides $${V[0].toLowerCase()}$ and $${V[1].toLowerCase()}$ and the angle between them, $\\angle ${V[2]}$. You want $\\angle ${V[0]}$. What is the best plan?`,
    correct: 'Use the cosine law to find the third side, then use the sine law (or the cosine law) to find the angle.',
    wrong: ['Use the sine law right away, because two sides and an angle are known.', 'Use the cosine law to find the angle directly from the two given sides.', 'It cannot be done: you need to know two angles.'],
    why: (V: V3) => `There is no matching pair yet, so the sine law cannot start. The cosine law gives side $${V[2].toLowerCase()}$, and then $${V[2].toLowerCase()}$ with $\\angle ${V[2]}$ is a matching pair for the sine law.`,
  },
  {
    sit: 'ssa' as Situation,
    q: (V: V3) => `In acute $${triName(V)}$, you know sides $${V[0].toLowerCase()}$ and $${V[1].toLowerCase()}$ and $\\angle ${V[0]}$, where $${V[0].toLowerCase()} > ${V[1].toLowerCase()}$. You want side $${V[2].toLowerCase()}$. What is the best plan?`,
    correct: `Use the sine law to find the angle opposite the second known side, then the angle sum, then the sine law again.`,
    wrong: ['Use the cosine law right away with the two sides and the angle.', 'Use the sine law once, with the given angle, to find the third side directly.', 'Use the Pythagorean theorem, because two sides are known.'],
    why: (V: V3) => `The given angle $\\angle ${V[0]}$ is not between the known sides, so the cosine law does not apply directly. The sine law gives $\\angle ${V[1]}$, the angle sum gives $\\angle ${V[2]}$, and then $\\dfrac{${V[2].toLowerCase()}}{\\sin ${V[2]}} = \\dfrac{${V[0].toLowerCase()}}{\\sin ${V[0]}}$.`,
  },
];

const chooseLaw = skill({
  id: 'm202-choose-law',
  name: 'Choosing the sine law or the cosine law',
  description: 'Decide whether the sine law, the cosine law or a primary trigonometric ratio fits the given information, and explain why.',
  outcomes: ['G3'],
  lessonId: 'm202-3-3',
  format: 'mc',
  gen(rng, d) {
    if (d === 3 && rng.chance(0.75)) {
      if (rng.chance(0.3)) {
        // Which information does not fix one triangle?
        const ang = acuteAngles(rng, 45, 75);
        const V = rng.pick(LETTERS);
        const s = (n: number) => V[n].toLowerCase();
        const a = rng.int(6, 15);
        const b = rng.int(6, 15);
        const sets = {
          aaa: `$\\angle ${V[0]} = ${deg(ang[0])}$, $\\angle ${V[1]} = ${deg(ang[1])}$, $\\angle ${V[2]} = ${deg(ang[2])}$`,
          sss: `$${s(0)} = ${a}$, $${s(1)} = ${b}$, $${s(2)} = ${rng.int(Math.max(a, b) - 3, Math.max(a, b) + 2)}$`,
          sas: `$${s(0)} = ${a}$, $${s(1)} = ${b}$, $\\angle ${V[2]} = ${deg(ang[2])}$`,
          asa: `$\\angle ${V[0]} = ${deg(ang[0])}$, $\\angle ${V[1]} = ${deg(ang[1])}$, $${s(2)} = ${a}$`,
        };
        return {
          prompt: `Which set of information does **not** determine exactly one triangle $${triName(V)}$?`,
          parts: [{ answer: mc(rng, sets.aaa, [sets.sss, sets.sas, sets.asa]) }],
          hints: ['Think about which set lets you draw triangles of different sizes.', 'Similar triangles have the same angles but can have any size.'],
          solution: [
            'Three sides (SSS), two sides and the contained angle (SAS), and two angles and a side (ASA or AAS) each fix one triangle, so the sine law or the cosine law can solve it.',
            'Three angles only fix the **shape**. You can draw a small triangle or a large one with the same angles (similar triangles), so no side length can be found.',
            `The answer is ${sets.aaa}.`,
          ],
        };
      }
      const plan = rng.pick(PLANS);
      const V = rng.pick(LETTERS);
      return {
        prompt: plan.q(V),
        parts: [{ answer: mc(rng, plan.correct, plan.wrong) }],
        hints: [
          'Ask: is there a known side with its opposite angle (a matching pair)? If so, the sine law can start.',
          'If not, look for two sides and the contained angle, or three sides: the cosine law. Sometimes one law sets up the other.',
        ],
        solution: [plan.why(V), `Best plan: ${plan.correct.charAt(0).toLowerCase()}${plan.correct.slice(1)}`],
      };
    }
    const pool: Situation[] = d === 1 ? ['aas', 'ssa', 'sas', 'sss'] : ['aas', 'asa', 'ssa', 'sas', 'sss', 'right'];
    const sit = rng.pick(pool);
    const { figure, unknown, desc } = situationFigure(rng, sit);
    const info = REASONS[sit];
    const what = unknown === 'x' ? 'the side marked $x$' : 'the angle marked $\\theta$';
    if (d === 1) {
      return {
        prompt: `Which is the most direct way to find ${what}?`,
        figure,
        parts: [{ answer: fixedChoice(PLAIN, info.plain) }],
        hints: [
          'Look for a matching pair: a known side and the known angle opposite it.',
          'Matching pair → sine law. Two sides and the angle between them, or three sides → cosine law. Right angle → SOH CAH TOA.',
        ],
        solution: [`The diagram gives ${desc}.`, info.why, `Use ${PLAIN[info.plain].charAt(0).toLowerCase()}${PLAIN[info.plain].slice(1)}.`],
      };
    }
    // The first listed distractor names the same law as the answer (or the other law), so the answer cannot be found by elimination.
    const wrong = [info.wrong[0], ...rng.shuffle(info.wrong.slice(1)).slice(0, 2)];
    return {
      prompt: `Which method should you use to find ${what}, and why?`,
      figure,
      parts: [{ answer: mc(rng, info.correct, wrong) }],
      hints: [
        sit === 'right' ? 'Look carefully at the angles in the diagram.' : 'Look for a matching pair: a known side and the known angle opposite it.',
        'Matching pair → sine law. Two sides and the angle between them, or three sides → cosine law. Right angle → SOH CAH TOA.',
      ],
      solution: [`The diagram gives ${desc}.`, info.why, `Answer: ${info.correct}`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.3 — Applications
// ---------------------------------------------------------------------------

type Ctx = (rng: Rng) => GenOutput;

/** Generic SAS cosine-law context. Vertices [top, left, right] with the known angle at vertex 0. */
function sasContext(
  rng: Rng,
  o: {
    verts: V3;
    pick: () => [number, number, number];
    u: Unit;
    dp: number;
    story: (p: number, q: number, ang: number) => string;
    ask: string;
    answer: (x: string) => string;
    names: [string, string, string];
  },
): GenOutput {
  const r = retry(
    () => {
      const [p, q, ang] = o.pick();
      const x = Math.sqrt(p * p + q * q - 2 * p * q * cosD(ang));
      const side = [x, q, p];
      return { p, q, ang, x, side, angs: anglesFromSides(side) };
    },
    (t) => acuteOk(t.angs, 30, 86) && safe(t.x, o.dp) && Math.abs(t.p - t.q) > 0.05 * Math.max(t.p, t.q),
    200,
  );
  const [n0, n1, n2] = o.names;
  const sides: Array<string | null> = ['?', fl(r.q, o.u), fl(r.p, o.u)];
  return {
    prompt: `${o.story(r.p, r.q, r.ang)} ${o.ask}, ${nearest(o.dp, o.u)}?`,
    figure: triFigure({ pts: triPts(r.side, 0, rng.chance(0.5)), verts: o.verts, sides, angles: [degL(r.ang), null, null] }),
    parts: [numPart(r.x, { decimals: o.dp, suffix: o.u })],
    hints: [
      'Sketch the triangle and mark what you know. Is the known angle between the two known sides?',
      `It is, so use the cosine law: $${n0}^2 = ${n1}^2 + ${n2}^2 - 2(${n1})(${n2})\\cos ${o.verts[0]}$.`,
    ],
    solution: [
      `The known angle is between the two known sides (SAS), so use the cosine law.`,
      ...cosSideSteps({ x: n0, p: n1, q: n2, pVal: r.p, qVal: r.q, K: o.verts[0], kAng: r.ang, value: r.x, dp: o.dp }),
      o.answer(ms(fmtFixed(r.x, o.dp), o.u)),
    ],
  };
}

const lake: Ctx = (rng) => {
  const who = rng.pick(PEOPLE);
  return sasContext(rng, {
    verts: ['S', 'P', 'Q'],
    names: ['PQ', 'SQ', 'SP'],
    pick: () => [rng.int(15, 60) * 10, rng.int(15, 60) * 10, rng.int(40, 80)],
    u: 'm',
    dp: 0,
    story: (p, q, a) =>
      `${who} is surveying a small lake on a ranch near ${rng.pick(TOWNS)}. From point $S$ on the shore, it is $${ms(p, 'm')}$ to point $P$ at one end of the lake and $${ms(q, 'm')}$ to point $Q$ at the other end. The angle between the two lines of sight, $\\angle PSQ$, is $${deg(a)}$.`,
    ask: 'How long is the lake from $P$ to $Q$',
    answer: (x) => `The lake is about $${x}$ long.`,
  });
};

const hike: Ctx = (rng) => {
  const who = rng.pick(PEOPLE);
  return sasContext(rng, {
    verts: ['L', 'C', 'F'],
    names: ['CF', 'LF', 'LC'],
    pick: () => [rng.float(1.5, 6, 1), rng.float(1.5, 6, 1), rng.int(40, 80)],
    u: 'km',
    dp: 1,
    story: (p, q, a) =>
      `${who} hikes $${ms(p, 'km')}$ in a straight line from camp $C$ to a lookout $L$, then turns and hikes $${ms(q, 'km')}$ to a waterfall $F$. The angle between the two trails at the lookout is $${deg(a)}$.`,
    ask: 'How far is the waterfall from camp in a straight line',
    answer: (x) => `The waterfall is about $${x}$ from camp.`,
  });
};

const robot: Ctx = (rng) =>
  sasContext(rng, {
    verts: ['E', 'S', 'G'],
    names: ['SG', 'EG', 'ES'],
    pick: () => [rng.int(30, 60), rng.int(25, 55), rng.int(42, 80)],
    u: 'cm',
    dp: 1,
    story: (p, q, a) =>
      `A robotic arm in an engineering lab has an upper arm $${ms(p, 'cm')}$ long from the shoulder joint $S$ to the elbow joint $E$, and a forearm $${ms(q, 'cm')}$ long from the elbow to the gripper $G$. The elbow is bent so that $\\angle SEG = ${deg(a)}$.`,
    ask: 'How far is the gripper from the shoulder joint',
    answer: (x) => `The gripper is about $${x}$ from the shoulder joint.`,
  });

/** A triangular lot: two angles and a side opposite one of them (AAS). */
const lot: Ctx = (rng) => {
  const r = retry(
    () => {
      const ang = acuteAngles(rng, 40, 80);
      const len = rng.int(30, 95);
      return { ang, len, side: sidesFromAngles(ang, 0, len) };
    },
    (t) => safe(t.side[1], 1),
  );
  const { ang, len, side } = r;
  return {
    prompt: `A triangular building lot $PQR$ has a corner angle of $${deg(ang[0])}$ at $P$ and $${deg(ang[1])}$ at $Q$. The side opposite $P$, $QR$, is $${ms(len, 'm')}$ long. How much fencing is needed for side $PR$, to the nearest tenth of a metre?`,
    figure: triFigure({ pts: triPts(side, rng.int(0, 2), rng.chance(0.5)), verts: ['P', 'Q', 'R'], sides: [fl(len, 'm'), '?', null], angles: [degL(ang[0]), degL(ang[1]), null] }),
    parts: [numPart(side[1], { decimals: 1, suffix: 'm' })],
    hints: ['Side $PR$ is opposite $\\angle Q$, and side $QR$ is opposite $\\angle P$. Both pairs are complete except for $PR$.', 'Use the sine law: $\\dfrac{PR}{\\sin Q} = \\dfrac{QR}{\\sin P}$.'],
    solution: [
      '$QR$ and $\\angle P$ are a matching pair, and $PR$ is opposite $\\angle Q$. Use the sine law:',
      ...sineSideSteps({ x: 'PR', X: 'Q', xAng: ang[1], g: 'QR', G: 'P', gAng: ang[0], gVal: len, value: side[1], dp: 1 }),
      `About $${ms(fmtFixed(side[1], 1), 'm')}$ of fencing is needed for side $PR$.`,
    ],
  };
};

const STATIONS = [
  { what: 'Two fire lookout towers', each: 'tower', a: 'A', b: 'B', c: 'F', target: 'a column of smoke', obj: 'The fire', u: 'km' as Unit, lo: 8, hi: 25, dec: 1, place: 'in the forested foothills' },
  { what: 'Two lifeguard towers', each: 'tower', a: 'A', b: 'B', c: 'S', target: 'a swimmer who needs help', obj: 'The swimmer', u: 'm' as Unit, lo: 80, hi: 260, dec: 0, place: 'on a busy lake beach' },
  { what: 'Two marine rescue stations', each: 'station', a: 'A', b: 'B', c: 'S', target: 'a disabled sailboat', obj: 'The sailboat', u: 'km' as Unit, lo: 6, hi: 20, dec: 1, place: 'on the shore of a large lake' },
];

/** ASA: two stations a known distance apart sight the same object (third angle first). */
const stations: Ctx = (rng) => {
  const st = rng.pick(STATIONS);
  const toA = rng.chance(0.5);
  const r = retry(
    () => {
      const ang = acuteAngles(rng, 42, 80);
      const len = st.dec ? rng.float(st.lo, st.hi, 1) : rng.int(st.lo, st.hi);
      return { ang, len, side: sidesFromAngles(ang, 2, len) };
    },
    (t) => safe(t.side[toA ? 1 : 0], 1),
  );
  const { ang, len, side } = r;
  const V: V3 = [st.a, st.b, st.c];
  const q = toA ? 1 : 0; // the side wanted: c–A is opposite B (index 1); c–B is opposite A (index 0)
  const x = side[q];
  const name = toA ? `${st.a}${st.c}` : `${st.b}${st.c}`;
  const sides = nulls();
  sides[2] = fl(len, st.u);
  sides[q] = '?';
  return {
    prompt: `${st.what} $${st.a}$ and $${st.b}$ ${st.place} are $${ms(len, st.u)}$ apart. Both spot ${st.target} at $${st.c}$. At $${st.a}$, the angle between the line to $${st.b}$ and the line to $${st.c}$ is $${deg(ang[0])}$. At $${st.b}$, the angle between the line to $${st.a}$ and the line to $${st.c}$ is $${deg(ang[1])}$. How far is $${st.c}$ from ${st.each} $${toA ? st.a : st.b}$, ${nearest(1, st.u)}?`,
    figure: triFigure({ pts: triPts(side, 2, rng.chance(0.5)), verts: V, sides, angles: [degL(ang[0]), degL(ang[1]), null] }),
    parts: [numPart(x, { decimals: 1, suffix: st.u })],
    hints: [`The known side $${st.a}${st.b}$ is opposite $\\angle ${st.c}$. Find $\\angle ${st.c}$ first.`, `Then use the sine law: $\\dfrac{${name}}{\\sin ${V[1 - q]}} = \\dfrac{${st.a}${st.b}}{\\sin ${st.c}}$.`],
    solution: [
      `Angle sum: $\\angle ${st.c} = 180^\\circ - ${deg(ang[0])} - ${deg(ang[1])} = ${deg(ang[2])}$. Now $${st.a}${st.b}$ and $\\angle ${st.c}$ are a matching pair.`,
      `$${name}$ is opposite $\\angle ${V[1 - q]}$. Use the sine law:`,
      ...sineSideSteps({ x: name, X: V[1 - q], xAng: ang[1 - q], g: `${st.a}${st.b}`, G: st.c, gAng: ang[2], gVal: len, value: x, dp: 1 }),
      `${st.obj} is about $${ms(fmtFixed(x, 1), st.u)}$ from ${st.each} $${toA ? st.a : st.b}$.`,
    ],
  };
};

/** SSS contexts: find an angle. */
const SSS_STORIES = [
  {
    verts: ['G', 'H', 'K'] as V3,
    u: 'm' as Unit,
    pick: (rng: Rng) => [rng.float(1.5, 4.5, 1), rng.float(1.5, 4.5, 1), rng.float(1.5, 4.5, 1)],
    story: (who: string, s: number[], V: V3, k: number) =>
      `${who} is building a triangular raised garden bed $${V.join('')}$ with sides $${V[1]}${V[2]} = ${ms(s[0], 'm')}$, $${V[0]}${V[2]} = ${ms(s[1], 'm')}$ and $${V[0]}${V[1]} = ${ms(s[2], 'm')}$. At what angle must the boards meet at corner $${V[k]}$`,
  },
  {
    verts: ['T', 'C', 'H'] as V3,
    u: 'm' as Unit,
    pick: (rng: Rng) => [rng.float(2.5, 7, 1), rng.float(2.5, 7, 1), rng.float(2.5, 7, 1)],
    story: (who: string, s: number[], V: V3, k: number) =>
      `${who} is cutting a triangular sail $${V.join('')}$ for a small sailboat. The edges measure $${V[1]}${V[2]} = ${ms(s[0], 'm')}$, $${V[0]}${V[2]} = ${ms(s[1], 'm')}$ and $${V[0]}${V[1]} = ${ms(s[2], 'm')}$. What is the angle of the sail at corner $${V[k]}$`,
  },
  {
    verts: ['P', 'A', 'B'] as V3,
    u: 'km' as Unit,
    pick: (rng: Rng) => [rng.float(3, 9, 1), rng.float(3, 9, 1), rng.float(3, 9, 1)],
    story: (_who: string, s: number[], V: V3, k: number) =>
      `A cell phone at $${V[0]}$ is $${ms(s[2], 'km')}$ from tower $${V[1]}$ and $${ms(s[1], 'km')}$ from tower $${V[2]}$. The towers are $${ms(s[0], 'km')}$ apart. What is the angle at ${k === 0 ? 'the phone' : 'tower'} $${V[k]}$ between the lines to the other two points`,
  },
  {
    verts: ['S', 'T', 'D'] as V3,
    u: 'cm' as Unit,
    pick: (rng: Rng) => [rng.int(40, 65), rng.int(40, 65), rng.int(40, 65)],
    story: (who: string, s: number[], V: V3, k: number) =>
      `${who} is designing a bicycle frame in a CAD program. The seat tube, top tube and down tube form an approximate triangle $${V.join('')}$ with $${V[1]}${V[2]} = ${ms(s[0], 'cm')}$, $${V[0]}${V[2]} = ${ms(s[1], 'cm')}$ and $${V[0]}${V[1]} = ${ms(s[2], 'cm')}$. What is the angle between the tubes at $${V[k]}$`,
  },
];

const sssStory: Ctx = (rng) => {
  const st = rng.pick(SSS_STORIES);
  const who = rng.pick(PEOPLE);
  const r = retry(
    () => {
      const side = st.pick(rng);
      const k = rng.int(0, 2);
      return { side, k, ang: anglesFromSides(side) };
    },
    (t) => acuteOk(t.ang, 35, 85) && safe(t.ang[t.k], 0) && new Set(t.side).size === 3,
    300,
  );
  const { side, k, ang } = r;
  const V = st.verts;
  const [i, j] = others(k);
  const seg = (n: number) => {
    const [a, b] = others(n);
    return `${V[a]}${V[b]}`;
  };
  const angles = nulls();
  angles[k] = '?';
  return {
    prompt: `${st.story(who, side, V, k)}, to the nearest degree?`,
    figure: triFigure({ pts: triPts(side, rng.int(0, 2), rng.chance(0.5)), verts: V, sides: side.map((v) => fl(v, st.u)), angles }),
    parts: [numPart(ang[k], { decimals: 0, suffix: '°' })],
    hints: ['You know three sides and no angles. Which law can find an angle from three sides?', `Cosine law: the side opposite $\\angle ${V[k]}$, $${seg(k)}$, is the one subtracted.`],
    solution: [
      'All three sides are known, so use the cosine law to find the angle.',
      ...cosAngleSteps({ K: V[k], k: seg(k), p: seg(i), q: seg(j), kVal: side[k], pVal: side[i], qVal: side[j], value: ang[k], dp: 0 }),
      `The angle at $${V[k]}$ is about $${deg(fmtFixed(ang[k], 0))}$.`,
    ],
  };
};

const ELEVATION = [
  { thing: 'a hot-air balloon', ref: 'the balloon', who: 'Two friends', top: 'H', u: 'm' as Unit, lo: 300, hi: 900, place: 'at a balloon festival' },
  { thing: 'a drone', ref: 'the drone', who: 'Two students', top: 'D', u: 'm' as Unit, lo: 60, hi: 180, place: 'on a school field' },
  { thing: 'the top of a ski-lift tower', ref: 'the top of the tower', who: 'Two surveyors', top: 'T', u: 'm' as Unit, lo: 40, hi: 120, place: 'at a mountain ski hill' },
];

/** Base angles that leave room for labels beside an altitude, with an acute top angle. */
function baseAngles(rng: Rng): number[] {
  return retry(
    () => {
      const a = rng.int(48, 67);
      const b = rng.int(48, 67);
      return [a, b, 180 - a - b];
    },
    (t) => t[0] !== t[1] && t[2] <= 84,
  );
}
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Two observers on opposite sides of an object above the ground; ASA, then optionally the height. */
function elevation(rng: Rng, height: boolean): GenOutput {
  const e = rng.pick(ELEVATION);
  const toA = rng.chance(0.5);
  const r = retry(
    () => {
      const ang = baseAngles(rng);
      const len = rng.int(e.lo, e.hi);
      const side = sidesFromAngles(ang, 2, len);
      const h = side[1] * sinD(ang[0]);
      return { ang, len, side, h };
    },
    (t) => safe(t.side[toA ? 1 : 0], height ? 0 : 1) && (!height || safe(t.h, 1)),
  );
  const { ang, len, side, h } = r;
  const V: V3 = ['A', 'B', e.top];
  const pts = triPts(side, 2, false);
  const q = toA ? 1 : 0;
  const name = toA ? `A${e.top}` : `B${e.top}`;
  const story = `${e.who} ${e.place} stand $${ms(len, e.u)}$ apart at points $A$ and $B$ on level ground, with ${e.thing} at $${e.top}$ between them. The angle of elevation of ${e.ref} is $${deg(ang[0])}$ from $A$ and $${deg(ang[1])}$ from $B$.`;
  if (!height) {
    const sides = nulls();
    sides[2] = fl(len, e.u);
    sides[q] = '?';
    return {
      prompt: `${story} How far is ${e.ref} from point $${toA ? 'A' : 'B'}$, to the nearest tenth of a metre?`,
      figure: triFigure({ pts, verts: V, sides, angles: [degL(ang[0]), degL(ang[1]), null] }),
      parts: [numPart(side[q], { decimals: 1, suffix: 'm' })],
      hints: [`$AB$ is opposite $\\angle ${e.top}$. Find $\\angle ${e.top}$ with the angle sum first.`, `Then $\\dfrac{${name}}{\\sin ${toA ? 'B' : 'A'}} = \\dfrac{AB}{\\sin ${e.top}}$.`],
      solution: [
        `$\\angle ${e.top} = 180^\\circ - ${deg(ang[0])} - ${deg(ang[1])} = ${deg(ang[2])}$, so $AB$ and $\\angle ${e.top}$ are a matching pair.`,
        ...sineSideSteps({ x: name, X: toA ? 'B' : 'A', xAng: ang[1 - q], g: 'AB', G: e.top, gAng: ang[2], gVal: len, value: side[q], dp: 1 }),
        `${cap(e.ref)} is about $${ms(fmtFixed(side[q], 1), 'm')}$ from point $${toA ? 'A' : 'B'}$.`,
      ],
    };
  }
  const D: P = [pts[2][0], 0];
  return {
    prompt: `${story} How high above the ground is ${e.ref}, to the nearest tenth of a metre?`,
    figure: triFigure({
      pts,
      verts: V,
      sides: [null, null, fl(len, e.u)],
      angles: [degL(ang[0]), degL(ang[1]), null],
      extra: [{ from: pts[2], to: D, dashed: true, label: 'h' }],
      foot: { at: D, along: pts[0], top: pts[2] },
    }),
    parts: [numPart(h, { decimals: 1, suffix: 'm' })],
    hints: [
      `Neither small right triangle has enough information yet. Use the sine law in $\\triangle AB${e.top}$ to find a slanted side, such as $A${e.top}$.`,
      `Then use the right triangle with the height: $h = A${e.top} \\sin ${deg(ang[0])}$.`,
    ],
    solution: [
      `Step 1: $\\angle ${e.top} = 180^\\circ - ${deg(ang[0])} - ${deg(ang[1])} = ${deg(ang[2])}$.`,
      `Step 2: find $A${e.top}$, which is opposite $\\angle B$, with the sine law:`,
      ...sineSideSteps({ x: `A${e.top}`, X: 'B', xAng: ang[1], g: 'AB', G: e.top, gAng: ang[2], gVal: len, value: side[1], dp: 0 }),
      `Step 3: in the right triangle with hypotenuse $A${e.top}$, the height is opposite the $${deg(ang[0])}$ angle: $$h = A${e.top} \\sin ${deg(ang[0])} \\approx ${calc(side[1], 0)} \\times \\sin ${deg(ang[0])} \\approx ${calc(h, 1)}$$`,
      `${cap(e.ref)} is about $${ms(fmtFixed(h, 1), 'm')}$ above the ground.`,
    ],
  };
}

/** Width of a river from a baseline on one bank (sine law, then a primary ratio). */
const river: Ctx = (rng) => {
  const who = rng.pick(PEOPLE);
  const r = retry(
    () => {
      const ang = baseAngles(rng);
      const len = rng.int(60, 250);
      const side = sidesFromAngles(ang, 2, len);
      const w = side[1] * sinD(ang[0]);
      return { ang, len, side, w };
    },
    (t) => safe(t.w, 1),
  );
  const { ang, len, side, w } = r;
  const pts = triPts(side, 2, rng.chance(0.5));
  const D: P = [pts[2][0], 0];
  return {
    prompt: `To find the width of a river, ${who} marks two points, $A$ and $B$, $${ms(len, 'm')}$ apart along one straight bank. A tree $T$ stands on the far bank. ${who} measures $\\angle TAB = ${deg(ang[0])}$ and $\\angle TBA = ${deg(ang[1])}$. How wide is the river, to the nearest tenth of a metre? (The width is the perpendicular distance from the tree to the line $AB$.)`,
    figure: triFigure({
      pts,
      verts: ['A', 'B', 'T'],
      sides: [null, null, fl(len, 'm')],
      angles: [degL(ang[0]), degL(ang[1]), null],
      extra: [{ from: pts[2], to: D, dashed: true, label: 'w' }],
      foot: { at: D, along: pts[0], top: pts[2] },
    }),
    parts: [numPart(w, { decimals: 1, suffix: 'm' })],
    hints: ['First find the distance from $A$ (or $B$) to the tree with the sine law. You will need $\\angle T$.', `Then use the right triangle: $w = AT \\sin ${deg(ang[0])}$.`],
    solution: [
      `Step 1: $\\angle T = 180^\\circ - ${deg(ang[0])} - ${deg(ang[1])} = ${deg(ang[2])}$.`,
      'Step 2: $AT$ is opposite $\\angle B$. Use the sine law:',
      ...sineSideSteps({ x: 'AT', X: 'B', xAng: ang[1], g: 'AB', G: 'T', gAng: ang[2], gVal: len, value: side[1], dp: 0 }),
      `Step 3: the width is opposite the $${deg(ang[0])}$ angle in the right triangle with hypotenuse $AT$: $$w = AT \\sin ${deg(ang[0])} \\approx ${calc(side[1], 0)} \\times \\sin ${deg(ang[0])} \\approx ${calc(w, 1)}$$`,
      `The river is about $${ms(fmtFixed(w, 1), 'm')}$ wide.`,
    ],
  };
};

/** Two boats leave together on different courses: distances from speeds, then the cosine law. */
const boats: Ctx = (rng) => {
  const marina = rng.pick(['Stonebridge Lake', 'Lake Ashford', 'Clearwater Lake', 'Pinewood Lake', 'Westbury Reservoir']);
  const r = retry(
    () => {
      const v1 = rng.int(12, 30);
      const v2 = rng.int(12, 30);
      const tm = rng.pick([45, 60, 75, 90, 120, 150]);
      const th = rng.int(40, 80);
      const p = (v1 * tm) / 60;
      const q = (v2 * tm) / 60;
      const x = Math.sqrt(p * p + q * q - 2 * p * q * cosD(th));
      const side = [x, q, p];
      return { v1, v2, tm, th, p, q, x, side, angs: anglesFromSides(side) };
    },
    (t) => acuteOk(t.angs, 30, 86) && safe(t.x, 1) && Math.abs(t.v1 - t.v2) >= 3,
    300,
  );
  const { v1, v2, tm, th, p, q, x, side } = r;
  const hrs = tm / 60;
  const TIME: Record<number, string> = { 45: '45 minutes', 60: '1 hour', 75: '1 hour 15 minutes', 90: '1.5 hours', 120: '2 hours', 150: '2.5 hours' };
  const timeText = TIME[tm];
  const inMinutes = tm === 45 || tm === 75;
  return {
    prompt: `Two boats leave the same dock on ${marina} at the same time. One travels at $${v1}$ km/h and the other at $${v2}$ km/h, on straight courses that are $${deg(th)}$ apart. How far apart are the boats after ${timeText}, to the nearest tenth of a kilometre?`,
    figure: triFigure({ pts: triPts(side, 0, rng.chance(0.5)), verts: ['D', 'P', 'Q'], sides: ['?', `${fmt(q)} km`, `${fmt(p)} km`], angles: [degL(th), null, null] }),
    parts: [numPart(x, { decimals: 1, suffix: 'km' })],
    hints: ['First find how far each boat travels: distance = speed × time (in hours).', 'Then you know two sides and the angle between them: use the cosine law.'],
    solution: [
      `${inMinutes ? `Time in hours: ${timeText} $= ${fmt(hrs)}$ h. ` : ''}Distances: $DP = ${v1} \\times ${fmt(hrs)} = ${fmt(p)}$ km and $DQ = ${v2} \\times ${fmt(hrs)} = ${fmt(q)}$ km.`,
      'The $' + deg(th) + '$ angle is between these two sides, so use the cosine law:',
      ...cosSideSteps({ x: 'PQ', p: 'DP', q: 'DQ', pVal: p, qVal: q, K: 'D', kAng: th, value: x, dp: 1 }),
      `The boats are about $${ms(fmtFixed(x, 1), 'km')}$ apart.`,
    ],
  };
};

/** The lake survey, then the angle at one end (cosine law, then sine law). */
const lakeAngle: Ctx = (rng) => {
  const who = rng.pick(PEOPLE);
  const r = retry(
    () => {
      const p = rng.int(15, 60) * 10;
      const q = rng.int(15, 60) * 10;
      const th = rng.int(40, 80);
      const x = Math.sqrt(p * p + q * q - 2 * p * q * cosD(th));
      const side = [x, q, p];
      return { p, q, th, x, side, angs: anglesFromSides(side) };
    },
    (t) => acuteOk(t.angs, 30, 86) && safe(t.x, 0) && safe(t.angs[1], 0) && Math.abs(t.p - t.q) >= 40,
    300,
  );
  const { p, q, th, x, side, angs } = r;
  return {
    prompt: `${who} stands at point $S$ on the shore of a lake near ${rng.pick(TOWNS)}. It is $${ms(p, 'm')}$ to point $P$ on one side of the lake and $${ms(q, 'm')}$ to point $Q$ on the other side, and $\\angle PSQ = ${deg(th)}$. A bridge will be built from $P$ to $Q$. (a) How long is the bridge, to the nearest metre? (b) What angle does the bridge make with the line $PS$ at $P$, to the nearest degree?`,
    figure: triFigure({ pts: triPts(side, 0, rng.chance(0.5)), verts: ['S', 'P', 'Q'], sides: ['?', fl(q, 'm'), fl(p, 'm')], angles: [degL(th), '?', null] }),
    parts: [numPart(x, { decimals: 0, label: '(a) $PQ =$', suffix: 'm' }), numPart(angs[1], { decimals: 0, label: '(b) $\\angle SPQ =$', suffix: '°' })],
    hints: ['(a) The known angle is between the two known sides: cosine law.', '(b) Now $PQ$ and $\\angle S$ are a matching pair. Use the sine law for $\\angle P$, which is opposite $SQ$. Use the unrounded value of $PQ$.'],
    solution: [
      '(a) Two sides and the contained angle: use the cosine law.',
      ...cosSideSteps({ x: 'PQ', p: 'SP', q: 'SQ', pVal: p, qVal: q, K: 'S', kAng: th, value: x, dp: 0 }),
      '(b) $PQ$ and $\\angle S$ are a matching pair, and $\\angle P$ is opposite $SQ$:',
      ...sineAngleSteps({ X: 'P', x: 'SQ', xVal: q, G: 'S', g: 'PQ', gVal: roundTo(x, 2), gAng: th, value: angs[1], dp: 0 }),
      `The bridge is about $${ms(fmtFixed(x, 0), 'm')}$ long and meets $PS$ at about $${deg(fmtFixed(angs[1], 0))}$.`,
    ],
  };
};

const trigApply = skill({
  id: 'm202-trig-apply',
  name: 'Solving problems with the sine and cosine laws',
  description: 'Model a situation with an acute triangle and solve it with the sine law, the cosine law or both.',
  outcomes: ['G3'],
  lessonId: 'm202-3-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.pick([lake, hike, robot, lot])(rng);
    if (d === 2) return rng.pick<Ctx>([stations, stations, (g) => elevation(g, false), sssStory, sssStory])(rng);
    return rng.pick<Ctx>([(g) => elevation(g, true), river, boats, lakeAngle])(rng);
  },
});

export const TRIG_SKILLS: SkillDef[] = [sineLaw, cosineLaw, chooseLaw, trigApply];

