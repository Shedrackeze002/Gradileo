/** Math 30-3 Unit 2 — Oblique Triangles (G1): the sine law and the cosine law, without the ambiguous case. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { acosD, asinD, cosD, fmt, fmtFixed, roundTo, sinD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj', 'Chloé', 'Tariq',
  'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Kai', 'Zainab', 'Mason',
  'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills', 'Oakdale', 'Fernbrook'];

type Unit = 'mm' | 'cm' | 'm' | 'km' | 'ft';
const UNIT_NAME: Record<Unit, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre', ft: 'foot' };

/** A measurement inside $...$, e.g. 12\ \text{cm}. */
const ms = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x}\\ \\text{${u}}`;
/** A measurement as a figure label, e.g. "12 cm". */
const fl = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x} ${u}`;
const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
/** An angle as a figure label. */
const degL = (x: number) => `${fmt(x)}°`;
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** "to the nearest tenth of a metre". */
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
  ['K', 'L', 'M'],
  ['S', 'T', 'U'],
  ['G', 'H', 'J'],
  ['R', 'S', 'T'],
];
const triName = (V: V3) => `\\triangle ${V.join('')}`;
/** The two vertex indices other than k, in increasing order. */
const others = (k: number): [number, number] => (k === 0 ? [1, 2] : k === 1 ? [0, 2] : [0, 1]);

/**
 * Three distinct whole-degree angles that add to 180°. With `obtuse`, one angle is between 100° and 140°;
 * otherwise all three are between 35° and 85°. Every angle is at least 20°, so the figure stays clear.
 */
function triAngles(rng: Rng, obtuse: boolean): number[] {
  return retry(
    () => {
      if (obtuse) {
        const O = rng.int(100, 140);
        const a = rng.int(20, Math.max(20, 160 - O));
        return rng.shuffle([O, a, 180 - O - a]);
      }
      const A = rng.int(35, 85);
      const B = rng.int(35, 85);
      return [A, B, 180 - A - B];
    },
    (t) => t.every((x) => x >= 20 && x <= 140) && (obtuse || (t[2] >= 35 && t[2] <= 85)) && new Set(t).size === 3,
    300,
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

/** Every angle is a real angle between lo and hi degrees. */
const anglesOk = (ang: number[], lo = 20, hi = 145) => ang.every((a) => Number.isFinite(a) && a >= lo && a <= hi);
/** Index of the largest angle. */
const largest = (ang: number[]) => ang.indexOf(Math.max(...ang));

// ---------------------------------------------------------------------------
// Triangle figures: a plane canvas (1 unit = 1 px) with invisible label anchors (from Math 20-2)
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
  /** Label the segment without drawing it. */
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
  /** Vertex with a right-angle square. */
  right?: number;
  /** Extra segments (an altitude, say), in model units. */
  extra?: Extra[];
  /** A right-angle mark at the foot of an altitude: the foot, a point along the base and the top of the altitude. */
  foot?: { at: P; along: P; top: P };
  /**
   * An exterior angle at vertex `at`: side from→at is extended past `at` (dashed, `len` model units long),
   * and the angle between the extension and the side to vertex `to` is marked and labelled.
   */
  turn?: { at: number; from: number; to: number; label: string; len: number };
}

/** A triangle on a plain canvas with labelled vertices, sides and angles. */
function triFigure(o: TriSpec): PlaneFigure {
  const turnEnd: P | null = o.turn ? add(o.pts[o.turn.at], mul(unit(sub(o.pts[o.turn.at], o.pts[o.turn.from])), o.turn.len)) : null;
  const model = [...o.pts, ...(o.extra ?? []).flatMap((e) => [e.from, e.to]), ...(turnEnd ? [turnEnd] : [])];
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
    if (o.turn && turnEnd) segs.push({ from: V[o.turn.at], to: T(turnEnd), dashed: true });
    for (const e of segs) if (!e.hidden) obstacles.push([e.from, e.to]);
    const ccw = signedArea(V) > 0;
    const angleLabs: Lab[] = [];
    const vertLabs: Lab[] = [];
    const sideLabs: Lab[] = [];
    /** Arc (and label candidates) at Vk from direction e1 to direction e2 (the smaller angle). */
    const arcAt = (Vk: P, e1: P, e2: P, lab: string | null | undefined) => {
      const a1 = Math.atan2(e1[1], e1[0]);
      let span = Math.atan2(e2[1], e2[0]) - a1;
      while (span > Math.PI) span -= 2 * Math.PI;
      while (span < -Math.PI) span += 2 * Math.PI;
      const r = 15;
      const n = 12;
      const pts: P[] = [];
      for (let t = 0; t <= n; t++) {
        const a = a1 + (span * t) / n;
        pts.push(add(Vk, [r * Math.cos(a), r * Math.sin(a)]));
      }
      polys.push({ points: pts, color: 'accent' });
      for (let t = 0; t < n; t++) obstacles.push([pts[t], pts[t + 1]]);
      if (lab) {
        const w = textW(lab);
        const cands: P[] = [];
        for (const rr of [21, 25, 29, 34, 40, 47, 55, 64, 75])
          for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.22, 0.78]) {
            const a = a1 + span * t;
            const d: P = [Math.cos(a), Math.sin(a)];
            cands.push(add(Vk, mul(d, rr + 0.6 * reach(d, w))));
          }
        angleLabs.push({ text: lab, cands });
      }
    };
    for (let k = 0; k < 3; k++) {
      const Vk = V[k];
      const e1 = unit(sub(V[(k + 1) % 3], Vk));
      const e2 = unit(sub(V[(k + 2) % 3], Vk));
      if (o.right === k) {
        const q = 11;
        const p1 = add(Vk, mul(e1, q));
        const p3 = add(Vk, mul(e2, q));
        const p2 = add(p1, mul(e2, q));
        polys.push({ points: [p1, p2, p3], color: 'accent' });
        obstacles.push([p1, p2], [p2, p3]);
      } else if (o.angles?.[k]) arcAt(Vk, e1, e2, o.angles[k]);
      const vl = o.verts?.[k];
      if (vl) {
        const w = textW(vl);
        const dirs = [e1, e2];
        if (o.turn?.at === k) dirs.push(unit(sub(V[k], V[o.turn.from])));
        // Point away from the sides that meet here (and from an extension line).
        let out = unit(mul(add(e1, e2), -1));
        if (dirs.length === 3) out = unit(mul(add(add(e1, e2), dirs[2]), -1));
        const cands: P[] = [];
        for (const r of [6, 9, 13, 18, 24])
          for (const off of [0, 25, -25, 50, -50, 75, -75, 100, -100, 140, -140]) {
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
    if (o.turn) {
      const k = o.turn.at;
      arcAt(V[k], unit(sub(V[k], V[o.turn.from])), unit(sub(V[o.turn.to], V[k])), o.turn.label);
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
    const xs = [...polys.flatMap((p) => p.points.map((q) => q[0])), ...segs.flatMap((e) => [e.from[0], e.to[0]]), ...placed.flatMap((p) => [p.box.x0, p.box.x1, p.A[0] - 5, p.A[0] + 5])];
    const ys = [...polys.flatMap((p) => p.points.map((q) => q[1])), ...segs.flatMap((e) => [e.from[1], e.to[1]]), ...placed.flatMap((p) => [p.box.y0, p.box.y1, p.A[1] - 5, p.A[1] + 5])];
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

/** The vertex to put at the top: the obtuse angle (so its long opposite side is the base), or any vertex. */
const topVertex = (rng: Rng, ang: number[]) => (Math.max(...ang) > 90 ? largest(ang) : rng.int(0, 2));

const nulls = (): Array<string | null> => [null, null, null];

/** "2ab" for single letters, "2(SP)(SQ)" for longer names. */
const twoProd = (p: string, q: string) => (p.length === 1 && q.length === 1 ? `2${p}${q}` : `2(${p})(${q})`);

// ---------------------------------------------------------------------------
// Worked-solution builders shared by the skills
// ---------------------------------------------------------------------------

/** Sine law for a side: x / sin X = g / sin G. */
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
    t < 0
      ? `$\\cos ${deg(o.kAng)}$ is negative (the angle is obtuse), so subtracting this term **adds** to the total: $$${o.x}^2 \\approx ${fmt(p2)} + ${fmt(q2)} + ${fmtFixed(-t, 2)} = ${fmtFixed(sq, 2)}$$`
      : `$$${o.x}^2 \\approx ${fmt(p2)} + ${fmt(q2)} - ${fmtFixed(t, 2)} = ${fmtFixed(sq, 2)}$$`,
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
    `Use the inverse cosine${c < 0 ? ' (a negative cosine means the angle is obtuse)' : ''}: $$\\angle ${o.K} = \\cos^{-1}(${fmtFixed(c, 4)}) \\approx ${deg(calc(o.value, o.dp))}$$`,
  ];
}

// ---------------------------------------------------------------------------
// Lesson 2.1 — The sine law
// ---------------------------------------------------------------------------

/** A unit, and a length suited to it and the difficulty. */
function pickUnit(rng: Rng): Unit {
  return rng.pick(['m', 'cm', 'm', 'mm', 'ft'] as const);
}
function pickLen(rng: Rng, d: Difficulty, u: Unit, lo = 6, hi = 40): number {
  if (u === 'mm') return rng.int(25, 95);
  return d === 1 ? rng.int(lo, hi) : rng.float(lo, hi, 1);
}

/**
 * Find a side with the sine law.
 * aas: know ∠i, ∠j and side i; find side j.  asa: know ∠i, ∠j and side k (between them); find side i.
 */
function sineSide(rng: Rng, d: Difficulty, mode: 'aas' | 'asa', obtuse: boolean): GenOutput {
  const V = rng.pick(LETTERS);
  const u = pickUnit(rng);
  const r = retry(
    () => {
      const ang = triAngles(rng, obtuse);
      const [i, j] = rng.sample([0, 1, 2], 2);
      const k = 3 - i - j;
      const g = mode === 'asa' ? k : i;
      const q = mode === 'asa' ? i : j;
      const len = pickLen(rng, d, u);
      return { ang, i, j, k, g, q, len, side: sidesFromAngles(ang, g, len) };
    },
    (x) => safe(x.side[x.q], 1),
    200,
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
  const third = mode === 'asa';
  return {
    prompt: `In $${triName(V)}$, $\\angle ${V[i]} = ${deg(ang[i])}$, $\\angle ${V[j]} = ${deg(ang[j])}$ and $${s(g)} = ${ms(len, u)}$. Determine the length of side $${s(q)}$, ${nearest(1, u)}.`,
    figure: triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: V, sides, angles }),
    parts: [numPart(x, { decimals: 1, suffix: u })],
    hints: third
      ? [
          'The given side is not opposite either of the given angles. Which angle is opposite it?',
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
 * Find an angle with the sine law: know sides i and j (side i longer) and ∠i, so the triangle is unique.
 * With `obtuse`, ∠i is the obtuse angle. then: 'side' asks for side k instead; 'third' also asks for ∠k.
 */
function sineAngle(rng: Rng, d: Difficulty, dp: number, obtuse: boolean, then?: 'side' | 'third'): GenOutput {
  const V = rng.pick(LETTERS);
  const u = pickUnit(rng);
  const r = retry(
    () => {
      const angT = triAngles(rng, obtuse);
      let i: number;
      let j: number;
      if (obtuse) {
        i = largest(angT);
        j = rng.pick(others(i));
      } else {
        const [p, q] = rng.sample([0, 1, 2], 2);
        [i, j] = angT[p] > angT[q] ? [p, q] : [q, p];
      }
      const k = 3 - i - j;
      const si = pickLen(rng, d, u, 10, 45);
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
      x.sj < 0.92 * x.si &&
      x.sj > 0 &&
      anglesOk(x.ang, 18, 145) &&
      safe(x.ang[x.j], dp) &&
      (then !== 'side' || safe(x.side[x.k], 1)) &&
      (then !== 'third' || safe(x.ang[x.k], dp)),
    300,
  );
  const { ang, i, j, k, si, sj, side } = r;
  const s = (n: number) => V[n].toLowerCase();
  const sides = nulls();
  sides[i] = fl(si, u);
  sides[j] = fl(sj, u);
  if (then === 'side') sides[k] = s(k);
  const angles = nulls();
  angles[i] = degL(ang[i]);
  if (then !== 'side') angles[j] = '?';
  if (then === 'third') angles[k] = '?';
  const givens = `In $${triName(V)}$, $${s(i)} = ${ms(si, u)}$, $${s(j)} = ${ms(sj, u)}$ and $\\angle ${V[i]} = ${deg(ang[i])}$.`;
  const angleSteps = sineAngleSteps({ X: V[j], x: s(j), xVal: sj, G: V[i], g: s(i), gVal: si, gAng: ang[i], value: ang[j], dp: then === 'side' ? 0 : dp });
  const figure = triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: V, sides, angles });
  const unique = `Side $${s(j)}$ is shorter than side $${s(i)}$, so $\\angle ${V[j]}$ is smaller than $\\angle ${V[i]}$ and must be acute. There is only one answer.`;
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
      unique,
      `$\\angle ${V[j]}$ is about $${deg(fmtFixed(ang[j], dp))}$.`,
    ],
  };
}

/** Know ∠i, ∠j and side k (between them); find both other sides. */
function sineTwoSides(rng: Rng, obtuse: boolean): GenOutput {
  const V = rng.pick(LETTERS);
  const u = pickUnit(rng);
  const r = retry(
    () => {
      const ang = triAngles(rng, obtuse);
      const k = rng.int(0, 2);
      const [i, j] = others(k);
      const len = pickLen(rng, 2, u);
      return { ang, i, j, k, len, side: sidesFromAngles(ang, k, len) };
    },
    (x) => safe(x.side[x.i], 1) && safe(x.side[x.j], 1),
    200,
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
    prompt: `In $${triName(V)}$, $\\angle ${V[i]} = ${deg(ang[i])}$, $\\angle ${V[j]} = ${deg(ang[j])}$ and $${s(k)} = ${ms(len, u)}$. Determine the lengths of sides $${s(i)}$ and $${s(j)}$, ${nearest(1, u)}.`,
    figure: triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: V, sides, angles }),
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
  id: 'm303-sine-law',
  name: 'Using the sine law',
  description: 'Use the sine law to find an unknown side or angle in an oblique triangle (acute or obtuse, no ambiguous case).',
  outcomes: ['G1'],
  lessonId: 'm303-2-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.6) ? sineSide(rng, 1, 'aas', rng.chance(0.3)) : sineAngle(rng, 1, 0, rng.chance(0.3));
    if (d === 2) {
      const v = rng.pick(['asa', 'aas', 'angle', 'angle'] as const);
      return v === 'angle' ? sineAngle(rng, 2, 1, rng.chance(0.4)) : sineSide(rng, 2, v, rng.chance(0.5));
    }
    const v = rng.pick(['side', 'side', 'third', 'two'] as const);
    if (v === 'two') return sineTwoSides(rng, rng.chance(0.5));
    return v === 'side' ? sineAngle(rng, 3, 0, rng.chance(0.5), 'side') : sineAngle(rng, 3, 1, rng.chance(0.5), 'third');
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — The cosine law
// ---------------------------------------------------------------------------

/** SAS: know sides i and j and the angle between them (∠k); find side k (and, optionally, the angle opposite the shorter given side). */
function cosSide(rng: Rng, d: Difficulty, obtuse: boolean, thenAngle = false): GenOutput {
  const V = rng.pick(LETTERS);
  const u = pickUnit(rng);
  const r = retry(
    () => {
      const k = rng.int(0, 2);
      const [i, j] = others(k);
      const si = pickLen(rng, d, u, 5, 30);
      const sj = pickLen(rng, d, u, 5, 30);
      const C = obtuse ? rng.int(95, 145) : rng.int(35, 85);
      const side = [0, 0, 0];
      side[i] = si;
      side[j] = sj;
      side[k] = Math.sqrt(si * si + sj * sj - 2 * si * sj * cosD(C));
      const ang = anglesFromSides(side);
      ang[k] = C;
      const target = si < sj ? i : j;
      return { i, j, k, si, sj, C, side, ang, target };
    },
    (x) => anglesOk(x.ang, 18, 145) && safe(x.side[x.k], 1) && Math.abs(x.si - x.sj) >= 1 && (!thenAngle || safe(x.ang[x.target], 1)),
    300,
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
  const figure = triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: V, sides, angles });
  const givens = `In $${triName(V)}$, $${s(i)} = ${ms(si, u)}$, $${s(j)} = ${ms(sj, u)}$ and $\\angle ${V[k]} = ${deg(C)}$.`;
  if (thenAngle) {
    const T = ang[target];
    return {
      prompt: `${givens} (a) Determine the length of side $${s(k)}$, ${nearest(1, u)}. (b) Determine the measure of $\\angle ${V[target]}$, ${angNearest(1)}.`,
      figure,
      parts: [
        numPart(x, { decimals: 1, label: `(a) $${s(k)} =$`, suffix: u }),
        numPart(T, { decimals: 1, label: `(b) $\\angle ${V[target]} =$`, suffix: '°' }),
      ],
      hints: [
        `$\\angle ${V[k]}$ is the angle between the two known sides, so start with the cosine law.`,
        `Once you know side $${s(k)}$, you have a matching pair ($${s(k)}$ and $\\angle ${V[k]}$), so the sine law gives $\\angle ${V[target]}$. Use the unrounded value of $${s(k)}$.`,
      ],
      solution: [
        `(a) Two sides and the contained angle are known, so use the cosine law:`,
        ...steps,
        `(b) Now $${s(k)}$ and $\\angle ${V[k]}$ are a matching pair. $\\angle ${V[target]}$ is opposite the shorter given side, so it is acute and the sine law gives it directly:`,
        ...sineAngleSteps({ X: V[target], x: s(target), xVal: side[target], G: V[k], g: s(k), gVal: roundTo(x, 3), gAng: C, value: T, dp: 1 }),
        `$${s(k)} \\approx ${ms(fmtFixed(x, 1), u)}$ and $\\angle ${V[target]} \\approx ${deg(fmtFixed(T, 1))}$.`,
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
    solution: [`You know two sides and the angle between them (the contained angle), so use the cosine law:`, ...steps, `Side $${s(k)}$ is about $${ms(fmtFixed(x, 1), u)}$ long.`],
  };
}

/** SSS: know all three sides; find ∠k (a named angle, or the largest or smallest angle). */
function cosAngle(rng: Rng, d: Difficulty, which: 'named' | 'largest' | 'smallest', dp: number, obtuse: boolean): GenOutput {
  const V = rng.pick(LETTERS);
  const u = pickUnit(rng);
  const r = retry(
    () => {
      const angT = triAngles(rng, obtuse);
      const g = rng.int(0, 2);
      const len = pickLen(rng, d, u, 8, 35);
      const side = sidesFromAngles(angT, g, len).map((v) => (d === 1 || u === 'mm' ? Math.round(v) : roundTo(v, 1)));
      const ang = anglesFromSides(side);
      const sorted = [0, 1, 2].sort((a, b) => side[a] - side[b]);
      const k = which === 'largest' ? sorted[2] : which === 'smallest' ? sorted[0] : obtuse && rng.chance(0.6) ? largest(ang) : rng.int(0, 2);
      return { side, ang, k, sorted };
    },
    (x) =>
      anglesOk(x.ang, 18, 145) &&
      safe(x.ang[x.k], dp) &&
      x.side[x.sorted[1]] - x.side[x.sorted[0]] >= 1 &&
      x.side[x.sorted[2]] - x.side[x.sorted[1]] >= 1 &&
      (!obtuse || Math.max(...x.ang) > 92),
    300,
  );
  const { side, ang, k } = r;
  const [i, j] = others(k);
  const s = (n: number) => V[n].toLowerCase();
  const sides = side.map((v) => fl(v, u));
  const angles = nulls();
  if (which === 'named') angles[k] = '?';
  const what = which === 'named' ? `the measure of $\\angle ${V[k]}$` : `the measure of the ${which} angle in $${triName(V)}$`;
  return {
    prompt: `In $${triName(V)}$, $${s(0)} = ${ms(side[0], u)}$, $${s(1)} = ${ms(side[1], u)}$ and $${s(2)} = ${ms(side[2], u)}$. Determine ${what}, ${angNearest(dp)}.`,
    figure: triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: V, sides, angles }),
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
  id: 'm303-cosine-law',
  name: 'Using the cosine law',
  description: 'Use the cosine law to find a side from two sides and the contained angle, or an angle from three sides, in acute and obtuse triangles.',
  outcomes: ['G1'],
  lessonId: 'm303-2-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.6) ? cosSide(rng, 1, rng.chance(0.35)) : cosAngle(rng, 1, 'named', 0, rng.chance(0.3));
    if (d === 2) return rng.chance(0.5) ? cosSide(rng, 2, rng.chance(0.45)) : cosAngle(rng, 2, 'named', 1, rng.chance(0.45));
    const v = rng.pick(['then', 'largest', 'largest', 'smallest'] as const);
    if (v === 'then') return cosSide(rng, 3, rng.chance(0.5), true);
    return v === 'largest' ? cosAngle(rng, 3, 'largest', 1, rng.chance(0.7)) : cosAngle(rng, 3, 'smallest', 1, rng.chance(0.5));
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.3 — Choosing a law, and workplace problems
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
  const mirror = rng.chance(0.5);
  const u = rng.pick(['cm', 'm', 'ft'] as const);
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
      const ang = triAngles(rng, rng.chance(0.35));
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
    (t) => anglesOk(t.shown, 22, 140) && Math.abs(Math.max(...t.shown) - 90) > 4 && new Set(t.side.map((v) => Math.round(v))).size === 3,
    300,
  );
  const { ang, i, j, k, side, shown } = g;
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
  return { figure: triFigure({ pts: triPts(side, topVertex(rng, shown), mirror), verts: V, sides, angles }), unknown, desc };
}

/** Which law, from a figure (fixed choices). */
function chooseFigure(rng: Rng): GenOutput {
  const sit = rng.pick<Situation>(['aas', 'asa', 'ssa', 'sas', 'sss', 'right']);
  const { figure, unknown, desc } = situationFigure(rng, sit);
  const info = REASONS[sit];
  const what = unknown === 'x' ? 'the side marked $x$' : 'the angle marked $\\theta$';
  return {
    prompt: `Which is the most direct way to find ${what}?`,
    figure,
    parts: [{ answer: fixedChoice(PLAIN, info.plain) }],
    hints: [
      sit === 'right' ? 'Look carefully at the angles in the diagram.' : 'Look for a matching pair: a known side and the known angle opposite it.',
      'Matching pair → sine law. Two sides and the angle between them, or three sides → cosine law. Right angle → SOH CAH TOA.',
    ],
    solution: [`The diagram gives ${desc}.`, info.why, `Use ${PLAIN[info.plain].charAt(0).toLowerCase()}${PLAIN[info.plain].slice(1)}.`],
  };
}

const JOB_SITUATIONS: Array<{ sit: Situation; story: (who: string) => string; want: string }> = [
  { sit: 'sas', story: (w) => `${w}, a pipe fitter, knows the lengths of two pipe runs that meet at a known angle.`, want: 'the straight-line distance between the open ends of the two runs' },
  { sit: 'sss', story: (w) => `${w} is checking a roof truss. The lengths of the bottom chord and both rafters are known.`, want: 'the angle at the peak of the truss' },
  { sit: 'aas', story: (w) => `${w}, a surveyor, knows two corner angles of a triangular lot and the length of the side opposite one of those angles.`, want: 'the length of the side opposite the other known angle' },
  { sit: 'asa', story: () => 'Two fire lookout towers are a known distance apart. Each tower measures the angle between the line to the other tower and the line to a fire.', want: 'the distance from one tower to the fire' },
  { sit: 'ssa', story: (w) => `${w} is designing a steel bracket shaped like a triangle. Two sides are known, and so is the angle opposite the longer of those sides.`, want: 'the angle opposite the shorter known side' },
  { sit: 'sas', story: (w) => `${w} is laying out a triangular flower bed. Two edges and the angle where they meet are known.`, want: 'the length of the third edge' },
  { sit: 'sss', story: (w) => `${w} has three steel bars of known lengths welded into a triangle for a trailer hitch.`, want: 'the angle where the two shortest bars meet' },
  { sit: 'right', story: (w) => `${w} is building a wheelchair ramp. The ramp, the level ground and a vertical post form a right triangle, and the ramp length and its angle with the ground are known.`, want: 'the height of the post' },
];

/** Which law, and why, for a workplace situation. */
function chooseWhy(rng: Rng): GenOutput {
  const j = rng.pick(JOB_SITUATIONS);
  const info = REASONS[j.sit];
  // The first listed distractor names the same law as the answer (or the other law), so the answer cannot be found by elimination.
  const wrong = [info.wrong[0], ...rng.shuffle(info.wrong.slice(1)).slice(0, 2)];
  return {
    prompt: `${j.story(rng.pick(NAMES))} The job needs ${j.want}. Which method should be used, and why?`,
    parts: [{ answer: mc(rng, info.correct, wrong) }],
    hints: [
      'Sketch the triangle and mark what is known. Is there a known side with its known opposite angle?',
      'Matching pair → sine law. Two sides and the angle between them, or three sides → cosine law. Right angle → SOH CAH TOA.',
    ],
    solution: [info.why, `Answer: ${info.correct}`],
  };
}

type Ctx = (rng: Rng) => GenOutput;

/** Generic SAS cosine-law context. Vertices [vertex with the known angle, end 1, end 2]. */
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
    /** Side names opposite verts[0], verts[1] (length q) and verts[2] (length p). */
    names: [string, string, string];
  },
): GenOutput {
  const r = retry(
    () => {
      const [p, q, ang] = o.pick();
      const x = Math.sqrt(p * p + q * q - 2 * p * q * cosD(ang));
      const side = [x, q, p];
      return { p, q, ang, x, side, angs: anglesFromSides(side).map((a, i) => (i === 0 ? ang : a)) };
    },
    (t) => anglesOk(t.angs, 18, 150) && safe(t.x, o.dp) && Math.abs(t.p - t.q) > 0.05 * Math.max(t.p, t.q),
    300,
  );
  const [n0, n1, n2] = o.names;
  const sides: Array<string | null> = ['?', fl(r.q, o.u), fl(r.p, o.u)];
  return {
    prompt: `${o.story(r.p, r.q, r.ang)} ${o.ask}, ${nearest(o.dp, o.u)}?`,
    figure: triFigure({ pts: triPts(r.side, 0, rng.chance(0.5)), verts: o.verts, sides, angles: [degL(r.ang), null, null] }),
    parts: [numPart(r.x, { decimals: o.dp, suffix: o.u })],
    hints: [
      'Sketch the triangle and mark what you know. Is the known angle between the two known sides?',
      `It is, so use the cosine law: $${n0}^2 = ${n2}^2 + ${n1}^2 - 2(${n2})(${n1})\\cos ${o.verts[0]}$.`,
    ],
    solution: [
      `The known angle is between the two known sides (SAS), so use the cosine law.`,
      ...cosSideSteps({ x: n0, p: n2, q: n1, pVal: r.p, qVal: r.q, K: o.verts[0], kAng: r.ang, value: r.x, dp: o.dp }),
      o.answer(ms(fmtFixed(r.x, o.dp), o.u)),
    ],
  };
}

const slough: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  const water = rng.pick(['slough', 'dugout', 'small lake', 'coulee']);
  return sasContext(rng, {
    verts: ['S', 'P', 'Q'],
    names: ['PQ', 'SQ', 'SP'],
    pick: () => [rng.int(12, 60) * 10, rng.int(12, 60) * 10, rng.chance(0.4) ? rng.int(95, 140) : rng.int(40, 85)],
    u: 'm',
    dp: 1,
    story: (p, q, a) =>
      `${who} is a surveyor measuring across a ${water} on a farm near ${rng.pick(TOWNS)}. From point $S$, it is $${ms(p, 'm')}$ to point $P$ on one side and $${ms(q, 'm')}$ to point $Q$ on the other side. The angle between the two lines of sight, $\\angle PSQ$, is $${deg(a)}$.`,
    ask: `How far is it across the ${water} from $P$ to $Q$`,
    answer: (x) => `It is about $${x}$ from $P$ to $Q$.`,
  });
};

const trussSpan: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  return sasContext(rng, {
    verts: ['T', 'L', 'R'],
    names: ['LR', 'TR', 'TL'],
    pick: () => [rng.float(2.4, 6.5, 1), rng.float(2.4, 6.5, 1), rng.int(95, 125)],
    u: 'm',
    dp: 1,
    story: (p, q, a) =>
      `${who} is building a shed with a saltbox roof, so its two rafters have different lengths. Rafter $TL$ is $${ms(p, 'm')}$ long and rafter $TR$ is $${ms(q, 'm')}$ long, and they meet at the peak $T$ at an angle of $${deg(a)}$.`,
    ask: 'How long is the bottom chord $LR$ of the truss (the distance between the lower ends of the rafters)',
    answer: (x) => `The bottom chord is about $${x}$ long.`,
  });
};

const pipeline: Ctx = (rng) => {
  const place = rng.pick(['Pinewood', 'Stonebridge', 'Clearwater', 'Ashford', 'Westbury']);
  return sasContext(rng, {
    verts: ['B', 'A', 'C'],
    names: ['AC', 'BC', 'AB'],
    pick: () => [rng.float(0.8, 3.6, 1), rng.float(0.8, 3.6, 1), rng.int(100, 150)],
    u: 'km',
    dp: 1,
    story: (p, q, a) =>
      `Near ${place}, a gas pipeline runs from wellhead $A$ to a bend at $B$, then on to a compressor station $C$, to go around a muskeg. $AB = ${ms(p, 'km')}$, $BC = ${ms(q, 'km')}$, and the angle at the bend is $\\angle ABC = ${deg(a)}$.`,
    ask: 'How long would a straight pipeline from $A$ to $C$ be',
    answer: (x) => `A straight pipeline from $A$ to $C$ would be about $${x}$ long.`,
  });
};

/** A triangular lot: two angles and a side opposite one of them (AAS). */
const lot: Ctx = (rng) => {
  const r = retry(
    () => {
      const ang = triAngles(rng, rng.chance(0.35));
      const len = rng.int(30, 95);
      return { ang, len, side: sidesFromAngles(ang, 0, len) };
    },
    (t) => safe(t.side[1], 1),
  );
  const { ang, len, side } = r;
  const town = rng.pick(TOWNS);
  return {
    prompt: `A triangular building lot $PQR$ in ${town} has a corner angle of $${deg(ang[0])}$ at $P$ and $${deg(ang[1])}$ at $Q$. The side opposite $P$, $QR$, is $${ms(len, 'm')}$ long. How much fencing is needed for side $PR$, to the nearest tenth of a metre?`,
    figure: triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: ['P', 'Q', 'R'], sides: [fl(len, 'm'), '?', null], angles: [degL(ang[0]), degL(ang[1]), null] }),
    parts: [numPart(side[1], { decimals: 1, suffix: 'm' })],
    hints: ['Side $PR$ is opposite $\\angle Q$, and side $QR$ is opposite $\\angle P$.', 'Use the sine law: $\\dfrac{PR}{\\sin Q} = \\dfrac{QR}{\\sin P}$.'],
    solution: [
      '$QR$ and $\\angle P$ are a matching pair, and $PR$ is opposite $\\angle Q$. Use the sine law:',
      ...sineSideSteps({ x: 'PR', X: 'Q', xAng: ang[1], g: 'QR', G: 'P', gAng: ang[0], gVal: len, value: side[1], dp: 1 }),
      `About $${ms(fmtFixed(side[1], 1), 'm')}$ of fencing is needed for side $PR$.`,
    ],
  };
};

const STATIONS = [
  { what: 'Two fire lookout towers', each: 'tower', a: 'A', b: 'B', c: 'F', target: 'a column of smoke', obj: 'The fire', u: 'km' as Unit, lo: 8, hi: 25, place: 'in the foothills' },
  { what: 'Two lifeguard towers', each: 'tower', a: 'A', b: 'B', c: 'S', target: 'a swimmer who needs help', obj: 'The swimmer', u: 'm' as Unit, lo: 80, hi: 260, place: 'on a lake beach' },
  { what: 'Two gas-leak monitoring stations', each: 'station', a: 'A', b: 'B', c: 'L', target: 'a gas leak', obj: 'The leak', u: 'km' as Unit, lo: 2, hi: 9, place: 'at a gas plant' },
  { what: 'Two survey stations', each: 'station', a: 'A', b: 'B', c: 'T', target: 'a transmission tower on the far bank', obj: 'The tower', u: 'm' as Unit, lo: 150, hi: 600, place: 'on the bank of a wide river' },
];

/** ASA: two stations a known distance apart sight the same object (third angle first). */
const stations: Ctx = (rng) => {
  const st = rng.pick(STATIONS);
  const toA = rng.chance(0.5);
  const r = retry(
    () => {
      const ang = triAngles(rng, false);
      const len = st.u === 'km' ? rng.float(st.lo, st.hi, 1) : rng.int(st.lo, st.hi);
      return { ang, len, side: sidesFromAngles(ang, 2, len) };
    },
    (t) => safe(t.side[toA ? 1 : 0], 1),
  );
  const { ang, len, side } = r;
  const V: V3 = [st.a, st.b, st.c];
  const q = toA ? 1 : 0; // c–A is opposite B (index 1); c–B is opposite A (index 0)
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

/** SSS contexts: find an angle with the cosine law. */
const SSS_STORIES = [
  {
    verts: ['P', 'T', 'W'] as V3,
    k: 0,
    u: 'm' as Unit,
    /** side opposite P (cable TW), opposite T (PW), opposite W (boom PT) */
    pick: (rng: Rng) => {
      const boom = rng.int(18, 32);
      const pw = rng.float(4, 10, 1);
      const th = rng.chance(0.5) ? rng.int(100, 140) : rng.int(55, 85);
      const cable = roundTo(Math.sqrt(boom * boom + pw * pw - 2 * boom * pw * cosD(th)), 1);
      return [cable, pw, boom];
    },
    check: () => true,
    story: (who: string, s: number[]) =>
      `${who} operates a crane on a building site downtown. The boom $PT$ is $${ms(s[2], 'm')}$ long from its pivot $P$ to its tip $T$. A cable runs from the tip to a winch $W$ on the crane body, $${ms(s[1], 'm')}$ from the pivot, and the cable $TW$ is $${ms(s[0], 'm')}$ long. What angle does the boom make with the line $PW$ (the angle $\\angle TPW$)`,
    answer: (x: string) => `The boom makes an angle of about $${x}$ with $PW$.`,
  },
  {
    verts: ['T', 'L', 'R'] as V3,
    k: 0,
    u: 'm' as Unit,
    pick: (rng: Rng) => [rng.float(7.2, 12.4, 1), rng.float(3.6, 7.2, 1), rng.float(3.6, 7.2, 1)],
    check: (ang: number[]) => ang[0] > 92,
    story: (who: string, s: number[]) =>
      `${who} is checking a roof truss for a garage. The bottom chord $LR$ is $${ms(s[0], 'm')}$ long, and the rafters are $TL = ${ms(s[2], 'm')}$ and $TR = ${ms(s[1], 'm')}$. What is the angle at the peak, $\\angle LTR$`,
    answer: (x: string) => `The angle at the peak is about $${x}$.`,
  },
  {
    verts: ['L', 'T', 'R'] as V3,
    k: 0,
    u: 'm' as Unit,
    pick: (rng: Rng) => [rng.float(3.6, 7.2, 1), rng.float(7.2, 12.4, 1), rng.float(3.6, 7.2, 1)],
    check: (ang: number[]) => ang[1] > 92,
    story: (who: string, s: number[], town: string) =>
      `${who} is building a roof truss for a barn near ${town}. The bottom chord $LR$ is $${ms(s[1], 'm')}$ long, and the rafters are $TL = ${ms(s[2], 'm')}$ and $TR = ${ms(s[0], 'm')}$. What angle does rafter $TL$ make with the bottom chord (the angle $\\angle TLR$)`,
    answer: (x: string) => `Rafter $TL$ meets the bottom chord at about $${x}$.`,
  },
  {
    verts: ['H', 'A', 'B'] as V3,
    k: 0,
    u: 'cm' as Unit,
    pick: (rng: Rng) => [rng.int(40, 75), rng.int(40, 75), rng.int(40, 75)],
    check: () => true,
    story: (who: string, s: number[]) =>
      `${who} is welding a triangular trailer hitch from three steel bars. Bar $AB$ is $${ms(s[0], 'cm')}$, bar $HB$ is $${ms(s[1], 'cm')}$ and bar $HA$ is $${ms(s[2], 'cm')}$ long. At what angle do bars $HA$ and $HB$ meet at the hitch point $H$`,
    answer: (x: string) => `The bars meet at about $${x}$.`,
  },
];

const sssStory: Ctx = (rng) => {
  const st = rng.pick(SSS_STORIES);
  const who = rng.pick(NAMES);
  const r = retry(
    () => {
      const side = st.pick(rng);
      return { side, ang: anglesFromSides(side) };
    },
    (t) => anglesOk(t.ang, 18, 145) && safe(t.ang[st.k], 1) && new Set(t.side).size === 3 && st.check(t.ang),
    300,
  );
  const { side, ang } = r;
  const V = st.verts;
  const k = st.k;
  const [i, j] = others(k);
  const seg = (n: number) => {
    const [a, b] = others(n);
    return `${V[a]}${V[b]}`;
  };
  const angles = nulls();
  angles[k] = '?';
  return {
    prompt: `${st.story(who, side, rng.pick(TOWNS))}, to the nearest tenth of a degree?`,
    figure: triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: V, sides: side.map((v) => fl(v, st.u)), angles }),
    parts: [numPart(ang[k], { decimals: 1, suffix: '°' })],
    hints: ['You know three sides and no angles. Which law can find an angle from three sides?', `Cosine law: the side opposite $\\angle ${V[k]}$, $${seg(k)}$, is the one subtracted.`],
    solution: [
      'All three sides are known, so use the cosine law to find the angle.',
      ...cosAngleSteps({ K: V[k], k: seg(k), p: seg(i), q: seg(j), kVal: side[k], pVal: side[i], qVal: side[j], value: ang[k], dp: 1 }),
      st.answer(deg(fmtFixed(ang[k], 1))),
    ],
  };
};

/** Two legs of a trip with a turn: the interior angle is 180° minus the turn, then the cosine law. */
const navigation: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  const v = rng.pick([
    { S: 'D', lo: 3, hi: 15, intro: (p: string) => `${who} drives a survey boat from a dock $D$ on ${rng.pick(['Clearwater Lake', 'Silver Lake', 'Willow Lake', 'Crane Lake'])}. The boat travels ${p} in a straight line to point $T$`, again: 'travels' },
    { S: 'A', lo: 25, hi: 90, intro: (p: string) => `${who} flies a float plane from a lake $A$ in the far north. The plane flies ${p} in a straight line to point $T$`, again: 'flies' },
    { S: 'H', lo: 4, hi: 18, intro: (p: string) => `${who} leaves a trailhead $H$ in the mountains on a snowmobile and rides ${p} in a straight line to point $T$`, again: 'rides' },
    { S: 'W', lo: 2, hi: 9, intro: (p: string) => `A pipeline inspection drone leaves a well site $W$ and flies ${p} in a straight line to point $T$`, again: 'flies' },
  ]);
  const r = retry(
    () => {
      const p = rng.float(v.lo, v.hi, 1);
      const q = rng.float(v.lo, v.hi, 1);
      const turn = rng.int(25, 80);
      const th = 180 - turn;
      const x = Math.sqrt(p * p + q * q - 2 * p * q * cosD(th));
      const side = [x, q, p]; // vertices [T (turn point), start, E (end)]
      return { p, q, turn, th, x, side };
    },
    (t) => safe(t.x, 1) && Math.abs(t.p - t.q) >= 1,
    300,
  );
  const { p, q, turn, th, x, side } = r;
  const dir = rng.pick(['left', 'right']);
  // Start at the origin and end on the x-axis: a right turn when the end is to the right, a left turn when mirrored.
  const pts = triPts(side, 0, dir === 'left');
  const S = v.S;
  const u: Unit = 'km';
  return {
    prompt: `${v.intro(`$${ms(p, u)}$`)}. There it turns $${deg(turn)}$ to the ${dir} and ${v.again} another $${ms(q, u)}$ in a straight line to point $E$. How far is $E$ from the starting point $${S}$, to the nearest tenth of a kilometre?`,
    figure: triFigure({ pts, verts: ['T', S, 'E'], sides: ['?', fl(q, u), fl(p, u)], angles: nulls(), turn: { at: 0, from: 1, to: 2, label: degL(turn), len: p * 0.45 } }),
    parts: [numPart(x, { decimals: 1, suffix: u })],
    hints: [
      `The turn of $${deg(turn)}$ is measured from the straight-ahead direction (the dashed line), not inside the triangle. The angle inside the triangle at $T$ and the turn make a straight angle.`,
      `So $\\angle ${S}TE = 180^\\circ - ${deg(turn)}$. Then use the cosine law for $${S}E$.`,
    ],
    solution: [
      `Interior angle at $T$: $\\angle ${S}TE = 180^\\circ - ${deg(turn)} = ${deg(th)}$.`,
      `Two sides and the contained angle are known, so use the cosine law:`,
      ...cosSideSteps({ x: `${S}E`, p: `${S}T`, q: 'TE', pVal: p, qVal: q, K: 'T', kAng: th, value: x, dp: 1 }),
      `Point $E$ is about $${ms(fmtFixed(x, 1), u)}$ from the start.`,
    ],
  };
};

/** Height of a tower from two angles of elevation measured in line on the same side (sine law, then SOH). */
const towerHeight: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  const t = rng.pick([
    { thing: 'a communication tower', ref: 'the top of the tower', lo: 40, hi: 150 },
    { thing: 'a grain elevator', ref: 'the top of the elevator', lo: 20, hi: 45 },
    { thing: 'a wind turbine', ref: 'the hub of the turbine', lo: 60, hi: 140 },
    { thing: 'a flare stack at a gas plant', ref: 'the top of the flare stack', lo: 25, hi: 80 },
  ]);
  const r = retry(
    () => {
      const a = rng.int(18, 40);
      const b = a + rng.int(12, 30);
      const dd = rng.int(Math.round(t.lo / 2), t.hi);
      const bt = (dd * sinD(a)) / sinD(b - a);
      const h = bt * sinD(b);
      const bf = bt * cosD(b);
      return { a, b, dd, bt, h, bf };
    },
    (x) => x.b <= 70 && safe(x.h, 1) && x.h >= t.lo && x.h <= t.hi && x.bf > 0.25 * x.dd && x.bf < 2.2 * x.dd,
    500,
  );
  const { a, b, dd, bt, h, bf } = r;
  const A: P = [0, 0];
  const B: P = [dd, 0];
  const F: P = [dd + bf, 0];
  const Tp: P = [dd + bf, h];
  return {
    prompt: `${who} wants the height of ${t.thing} on level ground. From point $A$, the angle of elevation of ${t.ref} is $${deg(a)}$. ${who} walks $${ms(dd, 'm')}$ straight toward the base to point $B$, where the angle of elevation is $${deg(b)}$. How high is ${t.ref} above the ground, to the nearest tenth of a metre?`,
    figure: triFigure({
      pts: [A, B, Tp],
      verts: ['A', 'B', 'T'],
      sides: [null, null, fl(dd, 'm')],
      angles: [degL(a), null, null],
      extra: [{ from: Tp, to: F, dashed: true, label: 'h' }],
      foot: { at: F, along: B, top: Tp },
      turn: { at: 1, from: 0, to: 2, label: degL(b), len: bf },
    }),
    parts: [numPart(h, { decimals: 1, suffix: 'm' })],
    hints: [
      `Work in $\\triangle ABT$ first. The angle inside it at $B$ is $180^\\circ - ${deg(b)}$, and the angle at $T$ comes from the angle sum.`,
      `Use the sine law to find $BT$, then the right triangle: $h = BT \\sin ${deg(b)}$.`,
    ],
    solution: [
      `Step 1: angles in $\\triangle ABT$. $\\angle ABT = 180^\\circ - ${deg(b)} = ${deg(180 - b)}$ and $\\angle ATB = 180^\\circ - ${deg(a)} - ${deg(180 - b)} = ${deg(b - a)}$.`,
      `Step 2: $AB$ and $\\angle T$ are a matching pair, and $BT$ is opposite $\\angle A$. Use the sine law:`,
      ...sineSideSteps({ x: 'BT', X: 'A', xAng: a, g: 'AB', G: 'T', gAng: b - a, gVal: dd, value: bt, dp: 1 }),
      `Step 3: in the right triangle with hypotenuse $BT$, the height is opposite the $${deg(b)}$ angle: $$h = BT \\sin ${deg(b)} \\approx ${calc(bt, 1)} \\times \\sin ${deg(b)} \\approx ${calc(h, 1)}$$`,
      `${cap(t.ref)} is about $${ms(fmtFixed(h, 1), 'm')}$ above the ground.`,
    ],
  };
};

/** ASA lot: find both unknown sides, then the perimeter for fencing. */
const lotPerimeter: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  const r = retry(
    () => {
      const ang = triAngles(rng, rng.chance(0.4));
      const len = rng.int(8, 40) * 10;
      const side = sidesFromAngles(ang, 2, len);
      return { ang, len, side, per: side[0] + side[1] + len };
    },
    (t) => safe(t.per, 1),
    300,
  );
  const { ang, len, side, per } = r;
  return {
    prompt: `${who} is fencing a triangular pasture $ABC$ near ${rng.pick(TOWNS)}. Side $AB$ runs along the road and is $${ms(len, 'm')}$ long. The corner angles are $\\angle A = ${deg(ang[0])}$ and $\\angle B = ${deg(ang[1])}$. How much fencing is needed to go all the way around the pasture, to the nearest tenth of a metre?`,
    figure: triFigure({ pts: triPts(side, topVertex(rng, ang), rng.chance(0.5)), verts: ['A', 'B', 'C'], sides: [null, null, fl(len, 'm')], angles: [degL(ang[0]), degL(ang[1]), null] }),
    parts: [numPart(per, { decimals: 1, suffix: 'm' })],
    hints: [`Find $\\angle C$ first, so that $AB$ and $\\angle C$ are a matching pair.`, 'Use the sine law twice to find $BC$ and $AC$, then add all three sides. Round only at the end.'],
    solution: [
      `$\\angle C = 180^\\circ - ${deg(ang[0])} - ${deg(ang[1])} = ${deg(ang[2])}$`,
      `$BC$ is opposite $\\angle A$: $$BC = \\dfrac{${len} \\sin ${deg(ang[0])}}{\\sin ${deg(ang[2])}} \\approx ${calc(side[0], 1)}$$`,
      `$AC$ is opposite $\\angle B$: $$AC = \\dfrac{${len} \\sin ${deg(ang[1])}}{\\sin ${deg(ang[2])}} \\approx ${calc(side[1], 1)}$$`,
      `Perimeter: $${len} + ${calc(side[0], 1)} + ${calc(side[1], 1)} \\approx ${calc(per, 1)}$`,
      `About $${ms(fmtFixed(per, 1), 'm')}$ of fencing is needed.`,
    ],
  };
};

/** A slough survey, then the angle at one end (cosine law, then sine law). */
const sloughAngle: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  const r = retry(
    () => {
      const p = rng.int(15, 60) * 10;
      const q = rng.int(12, 50) * 10;
      const th = rng.chance(0.4) ? rng.int(95, 135) : rng.int(45, 85);
      const x = Math.sqrt(p * p + q * q - 2 * p * q * cosD(th));
      const side = [x, q, p];
      const angs = anglesFromSides(side);
      return { p, q, th, x, side, angs };
    },
    (t) => t.q < t.p - 30 && anglesOk(t.angs, 18, 145) && safe(t.x, 1) && safe(t.angs[1], 1),
    300,
  );
  const { p, q, th, x, side, angs } = r;
  return {
    prompt: `${who} stands at point $S$ beside a slough near ${rng.pick(TOWNS)}. It is $${ms(p, 'm')}$ to point $P$ on one side and $${ms(q, 'm')}$ to point $Q$ on the other side, and $\\angle PSQ = ${deg(th)}$. A boardwalk will be built straight from $P$ to $Q$. (a) How long is the boardwalk, to the nearest tenth of a metre? (b) What angle does the boardwalk make with the line $PS$ at $P$, to the nearest tenth of a degree?`,
    figure: triFigure({ pts: triPts(side, 0, rng.chance(0.5)), verts: ['S', 'P', 'Q'], sides: ['?', fl(q, 'm'), fl(p, 'm')], angles: [degL(th), '?', null] }),
    parts: [numPart(x, { decimals: 1, label: '(a) $PQ =$', suffix: 'm' }), numPart(angs[1], { decimals: 1, label: '(b) $\\angle SPQ =$', suffix: '°' })],
    hints: ['(a) The known angle is between the two known sides: cosine law.', '(b) Now $PQ$ and $\\angle S$ are a matching pair. Use the sine law for $\\angle P$, which is opposite $SQ$. Use the unrounded value of $PQ$.'],
    solution: [
      '(a) Two sides and the contained angle: use the cosine law.',
      ...cosSideSteps({ x: 'PQ', p: 'SP', q: 'SQ', pVal: p, qVal: q, K: 'S', kAng: th, value: x, dp: 1 }),
      '(b) $PQ$ and $\\angle S$ are a matching pair, and $\\angle P$ is opposite $SQ$, the shorter given side, so $\\angle P$ is acute:',
      ...sineAngleSteps({ X: 'P', x: 'SQ', xVal: q, G: 'S', g: 'PQ', gVal: roundTo(x, 3), gAng: th, value: angs[1], dp: 1 }),
      `The boardwalk is about $${ms(fmtFixed(x, 1), 'm')}$ long and meets $PS$ at about $${deg(fmtFixed(angs[1], 1))}$.`,
    ],
  };
};

/** Truss: bottom chord, one rafter and its pitch angle → the other rafter (cosine law) and the other pitch angle (sine law). */
const trussRafter: Ctx = (rng) => {
  const who = rng.pick(NAMES);
  const r = retry(
    () => {
      const L = rng.float(7, 12, 1);
      const al = rng.int(20, 40);
      const be = rng.int(20, 45);
      const r1 = roundTo((L * sinD(be)) / sinD(180 - al - be), 1);
      const r2 = Math.sqrt(L * L + r1 * r1 - 2 * L * r1 * cosD(al));
      const b2 = asinD((r1 * sinD(al)) / r2);
      return { L, al, r1, r2, b2, peak: 180 - al - b2 };
    },
    (t) => t.peak > 95 && t.peak < 140 && Math.abs(t.al - t.b2) > 2 && safe(t.r2, 1) && safe(t.b2, 1),
    300,
  );
  const { L, al, r1, r2, b2, peak } = r;
  // Vertices: T (peak), L (left wall), R (right wall); sides opposite them: the chord LR, rafter RT, rafter LT.
  const side = [L, r1, r2];
  return {
    prompt: `${who} is building a truss for an uneven roof. The bottom chord $LR$ is $${ms(L, 'm')}$ long. Rafter $RT$ is $${ms(r1, 'm')}$ long and meets the bottom chord at $\\angle R = ${deg(al)}$. (a) How long is the other rafter, $LT$, to the nearest tenth of a metre? (b) What angle does rafter $LT$ make with the bottom chord, $\\angle L$, to the nearest tenth of a degree?`,
    figure: triFigure({ pts: triPts(side, 0, false), verts: ['T', 'L', 'R'], sides: [fl(L, 'm'), fl(r1, 'm'), null], angles: [null, '?', degL(al)] }),
    parts: [numPart(r2, { decimals: 1, label: '(a) $LT =$', suffix: 'm' }), numPart(b2, { decimals: 1, label: '(b) $\\angle L =$', suffix: '°' })],
    hints: [
      '(a) The known angle $\\angle R$ is between the bottom chord and rafter $RT$: two sides and the contained angle.',
      '(b) $LT$ and $\\angle R$ are now a matching pair. $\\angle L$ is opposite rafter $RT$.',
    ],
    solution: [
      '(a) Two sides and the contained angle are known, so use the cosine law:',
      ...cosSideSteps({ x: 'LT', p: 'LR', q: 'RT', pVal: L, qVal: r1, K: 'R', kAng: al, value: r2, dp: 1 }),
      `(b) $LT$ and $\\angle R$ are a matching pair, and $\\angle L$ is opposite $RT$. The peak is the largest angle in a roof truss, so $\\angle L$ is acute:`,
      ...sineAngleSteps({ X: 'L', x: 'RT', xVal: r1, G: 'R', g: 'LT', gVal: roundTo(r2, 3), gAng: al, value: b2, dp: 1 }),
      `Check: the peak angle is $180^\\circ - ${deg(al)} - ${deg(fmtFixed(b2, 1))} \\approx ${deg(fmtFixed(peak, 1))}$, the largest angle, opposite the longest side (the chord).`,
      `$LT \\approx ${ms(fmtFixed(r2, 1), 'm')}$ and $\\angle L \\approx ${deg(fmtFixed(b2, 1))}$.`,
    ],
  };
};

const obliqueApply = skill({
  id: 'm303-oblique-apply',
  name: 'Solving problems with oblique triangles',
  description: 'Choose the sine law or the cosine law, and solve workplace problems with roof trusses, survey lots, sloughs, towers and navigation.',
  outcomes: ['G1'],
  lessonId: 'm303-2-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.pick<Ctx>([chooseFigure, chooseFigure, slough, trussSpan, lot])(rng);
    if (d === 2) return rng.pick<Ctx>([chooseWhy, stations, sssStory, sssStory, pipeline])(rng);
    return rng.pick<Ctx>([navigation, towerHeight, lotPerimeter, sloughAngle, trussRafter])(rng);
  },
});

export const OBLIQUE_SKILLS: SkillDef[] = [sineLaw, cosineLaw, obliqueApply];
