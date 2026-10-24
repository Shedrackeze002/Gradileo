/** Math 20-3 Unit 4 — Right Triangles: problems with one, two and three right triangles (G1). */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { acosD, asinD, atanD, cosD, fmt, fmtFixed, sinD, tanD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, PlanePoint, PlaneSegment, RightTriangleFigure, SkillDef, TwoTriangleFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Kai', 'Zainab', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills', 'Oakdale', 'Fernbrook', 'Millbrook', 'Glenview'];

type Unit = 'm' | 'cm' | 'ft' | 'in';
const UNIT_WORD: Record<Unit, string> = { m: 'metre', cm: 'centimetre', ft: 'foot', in: 'inch' };
/** "to the nearest tenth of a metre" */
const nearest = (u: Unit, dp = 1) =>
  dp === 0 ? `to the nearest ${UNIT_WORD[u]}` : `to the nearest ${dp === 2 ? 'hundredth' : 'tenth'} of ${u === 'in' ? 'an' : 'a'} ${UNIT_WORD[u]}`;
const NEAR_DEG = 'to the nearest tenth of a degree';
const KEEP = 'Keep all the digits on your calculator until the final answer.';

const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
/** A quantity inside maths: 12\ \text{m}. */
const qm = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x}\\ \\text{${u}}`;
/** A quantity as inline maths: $12\ \text{m}$. */
const Q = (x: number | string, u: string) => `$${qm(x, u)}$`;
/** A plain figure label: "12 m". */
const lb = (x: number, u: string) => `${fmt(x)} ${u}`;
const f1 = (x: number) => fmtFixed(x, 1);
const f2 = (x: number) => fmtFixed(x, 2);
const fx = (x: number, dp: number) => fmtFixed(x, dp);
const rd2 = (x: number) => Number(f2(x));
/** A value to at most 2 decimals: exact values print plainly, others as 2-decimal approximations. */
const v2 = (x: number) => (Math.abs(x * 100 - Math.round(x * 100)) < 1e-9 ? fmt(x) : f2(x));
const eq2 = (x: number) => (Math.abs(x * 100 - Math.round(x * 100)) < 1e-9 ? `= ${fmt(x)}` : `\\approx ${f2(x)}`);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a 6 m ladder" but "an 8 m ladder" and "an 11 m tower". */
const an = (x: number) => (/^(8|11|18)(\.|$)|^8\d/.test(fmt(x)) ? 'an' : 'a');
const sq = (x: number) => Math.round(x * x * 1e6) / 1e6;

/** True when x is safely away from a rounding boundary (…5) at `dp` places. */
function clear(x: number, dp = 1, margin = 0.15): boolean {
  if (!Number.isFinite(x)) return false;
  const s = Math.abs(x) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > margin;
}

/** A length answer, rounded to `dp` places (exact when the value is whole and `exact` is set). */
const lenPart = (x: number, u: string, label?: string, dp = 1): Part => numPart(x, { decimals: dp, suffix: u, label });
const angPart = (x: number, label?: string): Part => numPart(x, { decimals: 1, suffix: '°', label });

type Fn = 'sin' | 'cos' | 'tan';
type Side = 'opp' | 'adj' | 'hyp';
const trig = (fn: Fn, a: number) => (fn === 'sin' ? sinD(a) : fn === 'cos' ? cosD(a) : tanD(a));
const inv = (fn: Fn, r: number) => (fn === 'sin' ? asinD(r) : fn === 'cos' ? acosD(r) : atanD(r));
const MEM: Record<Fn, string> = { sin: 'SOH', cos: 'CAH', tan: 'TOA' };
const FN_WORD: Record<Fn, string> = { sin: 'sine', cos: 'cosine', tan: 'tangent' };
const SIDE_WORD: Record<Side, string> = { opp: 'opposite side', adj: 'adjacent side', hyp: 'hypotenuse' };
const r4 = (x: number) => fmtFixed(x, 4);

/** The ratio that links two sides (SOH CAH TOA). */
function fnFor(a: Side, b: Side): Fn {
  const has = (k: Side) => a === k || b === k;
  return has('hyp') ? (has('opp') ? 'sin' : 'cos') : 'tan';
}
const topOf = (fn: Fn): Side => (fn === 'cos' ? 'adj' : 'opp');

/** All three sides when the angle θ and one side are known. */
function sidesFrom(key: Side, v: number, ang: number): Record<Side, number> {
  const hyp = key === 'hyp' ? v : key === 'opp' ? v / sinD(ang) : v / cosD(ang);
  return { opp: hyp * sinD(ang), adj: hyp * cosD(ang), hyp };
}

/**
 * The unknown side from fn(ang) = top / bottom, with steps that show the ratio to 4 decimal places.
 * `ok` is true when the answer is clear of a rounding boundary and the 4-decimal working rounds the same way.
 */
function solveSide(fn: Fn, ang: number, known: number, unknownOnTop: boolean, sym: string, dp = 1) {
  const r = trig(fn, ang);
  const x = unknownOnTop ? known * r : known / r;
  const shown = unknownOnTop ? known * Number(r4(r)) : known / Number(r4(r));
  const ok = clear(x, dp) && fx(shown, dp) === fx(x, dp);
  const f = `\\${fn} ${deg(ang)}`;
  const k = fmt(known);
  const steps = unknownOnTop
    ? [`$${f} = \\dfrac{${sym}}{${k}}$`, `Multiply both sides by $${k}$: $${sym} = ${k}\\${fn} ${deg(ang)} \\approx ${k} \\times ${r4(r)} \\approx ${fx(x, dp + 1)}$`]
    : [`$${f} = \\dfrac{${k}}{${sym}}$`, `The unknown is on the bottom, so multiply both sides by $${sym}$ and divide by $${f}$: $${sym} = \\dfrac{${k}}{${f}} \\approx \\dfrac{${k}}{${r4(r)}} \\approx ${fx(x, dp + 1)}$`];
  return { x, ok, steps };
}

/** An angle from a ratio of two sides, with a check that the 4-decimal ratio gives the same rounded angle. */
function solveAngle(fn: Fn, top: number, bottom: number) {
  const r = top / bottom;
  const a = inv(fn, r);
  const ok = clear(a, 1) && f1(inv(fn, Number(r4(r)))) === f1(a) && a > 1 && a < 89;
  return { a, r, ok };
}

const VSETS = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['D', 'E', 'F'],
  ['J', 'K', 'L'],
  ['S', 'T', 'U'],
  ['X', 'Y', 'Z'],
  ['L', 'M', 'N'],
  ['G', 'H', 'K'],
];

interface TriN {
  R: string;
  A: string;
  B: string;
  rotate: 0 | 1 | 2 | 3;
  mirror: boolean;
}
function triN(rng: Rng): TriN {
  const [R, A, B] = rng.shuffle(rng.pick(VSETS));
  return { R, A, B, rotate: rng.pick([0, 0, 1, 2, 3] as const), mirror: rng.chance(0.4) };
}
const seg = (p: string, q: string) => [p, q].sort().join('');
type SideKey = 'ra' | 'rb' | 'ab';
type Vtx = 'a' | 'b';

/** Side names and figure keys relative to the acute angle at vertex `at`. */
function rel(t: TriN, at: Vtx) {
  const name: Record<Side, string> = {
    opp: at === 'a' ? seg(t.R, t.B) : seg(t.R, t.A),
    adj: at === 'a' ? seg(t.R, t.A) : seg(t.R, t.B),
    hyp: seg(t.A, t.B),
  };
  const key: Record<Side, SideKey> = { opp: at === 'a' ? 'rb' : 'ra', adj: at === 'a' ? 'ra' : 'rb', hyp: 'ab' };
  return { vtx: at === 'a' ? t.A : t.B, other: at === 'a' ? t.B : t.A, name, key };
}
/** [legA, legB] for drawing when the angle is at vertex `at`. */
const drawLegs = (at: Vtx, s: Record<Side, number>): [number, number] => (at === 'a' ? [s.adj, s.opp] : [s.opp, s.adj]);

function rtFig(t: TriN, legA: number, legB: number, sideLabels: Partial<Record<SideKey, string>>, angleLabels: Partial<Record<Vtx, string>> = {}, scene?: RightTriangleFigure['scene']): RightTriangleFigure {
  const f: RightTriangleFigure = {
    type: 'rightTriangle',
    vertices: { right: t.R, a: t.A, b: t.B },
    legA,
    legB,
    sideLabels,
    angleLabels,
    rotate: scene ? 0 : t.rotate,
    mirror: scene ? false : t.mirror,
  };
  if (scene && scene !== 'none') f.scene = scene;
  return f;
}

/** Upright triangle for word problems: right angle at the base, a on the ground, b at the top. */
const UPRIGHT = (R: string, A: string, B: string): TriN => ({ R, A, B, rotate: 0, mirror: false });

// ---------------------------------------------------------------------------
// Sketches: diagrams drawn on a plain canvas (a plane with no axes)
// ---------------------------------------------------------------------------

type P = [number, number];
type Col = 'brand' | 'accent' | 'muted';
const CANVAS_W = 340;
const r1 = (v: number) => Math.round(v * 10) / 10;

/** Approximate width (px) of a 12 px semibold label. */
function textW(t: string): number {
  let w = 0;
  for (const ch of t) {
    if (ch === ' ' || ch === '.' || ch === ',' || ch === '°') w += 4;
    else if (ch === 'm' || ch === 'w' || ch === 'M' || ch === 'W') w += 10.5;
    else if (/[A-Z]/.test(ch)) w += 8.4;
    else if (/[ijlrft1]/.test(ch)) w += 5.2;
    else w += 7.3;
  }
  return w;
}

interface SLabel {
  text: string;
  at?: P;
  dx?: number;
  dy?: number;
  a?: P;
  b?: P;
  away?: P;
  gap?: number;
}

/** Collects lines, arcs and labels in world units, then scales them onto a 340 px canvas. */
class Sketch {
  private segs: Array<{ a: P; b: P; color: Col; dashed: boolean }> = [];
  private dims: Array<{ a: P; b: P; text: string; shift: P }> = [];
  private polys: Array<{ pts: P[]; color: Col }> = [];
  private rights: Array<{ v: P; p: P; q: P }> = [];
  private arcs: Array<{ v: P; p: P; q: P; r: number; text: string }> = [];
  private dotList: P[] = [];
  private labels: SLabel[] = [];

  line(a: P, b: P, color: Col = 'brand', dashed = false) {
    this.segs.push({ a, b, color, dashed });
    return this;
  }
  path(pts: P[], color: Col = 'brand') {
    this.polys.push({ pts, color });
    return this;
  }
  /** A dimension line with arrows, moved `shift` px (x right, y up) away from the measured segment. */
  dim(a: P, b: P, text: string, shift: P) {
    this.dims.push({ a, b, text, shift });
    return this;
  }
  right(v: P, p: P, q: P) {
    this.rights.push({ v, p, q });
    return this;
  }
  angle(v: P, p: P, q: P, text: string, r = 26) {
    this.arcs.push({ v, p, q, r, text });
    return this;
  }
  dot(p: P) {
    this.dotList.push(p);
    return this;
  }
  text(at: P, text: string, dx = 0, dy = 0) {
    this.labels.push({ text, at, dx, dy });
    return this;
  }
  /** A label beside segment ab, on the side away from the point `away`. */
  side(a: P, b: P, text: string, away: P, gap = 8) {
    this.labels.push({ text, a, b, away, gap });
    return this;
  }

  build(maxW = 280, maxH = 180): PlaneFigure {
    const all: P[] = [
      ...this.segs.flatMap((s) => [s.a, s.b]),
      ...this.dims.flatMap((d) => [d.a, d.b]),
      ...this.polys.flatMap((p) => p.pts),
      ...this.dotList,
      ...this.arcs.map((a) => a.v),
    ];
    const minX = Math.min(...all.map((p) => p[0]));
    const minY = Math.min(...all.map((p) => p[1]));
    const sx = Math.max(...all.map((p) => p[0])) - minX || 1;
    const sy = Math.max(...all.map((p) => p[1])) - minY || 1;
    let k = Math.min(maxW / sx, maxH / sy);
    let L = this.layout(k, minX, minY);
    for (let i = 0; i < 10 && L.box[2] - L.box[0] > CANVAS_W - 8; i++) {
      k *= 0.92;
      L = this.layout(k, minX, minY);
    }
    const [bx0, by0, bx1, by1] = L.box;
    const ox = (CANVAS_W - (bx1 - bx0)) / 2 - bx0;
    const oy = 8 - by0;
    const H = Math.round(by1 - by0 + 16);
    const mv = (p: P): [number, number] => [r1(p[0] + ox), r1(p[1] + oy)];
    const segments: PlaneSegment[] = L.segs.map((s) => ({
      from: mv(s.a),
      to: mv(s.b),
      color: s.color,
      ...(s.dashed ? { dashed: true } : {}),
      ...(s.arrows ? { arrowStart: true, arrowEnd: true } : {}),
    }));
    const polylines: NonNullable<PlaneFigure['polylines']> = L.polys.map((p) => ({ points: p.pts.map(mv), color: p.color }));
    // Every drawn line, for keeping the (invisible) label anchors off them.
    const lines: Array<[P, P]> = [...segments.map((sg): [P, P] => [sg.from, sg.to]), ...polylines.flatMap((pl) => pl.points.slice(1).map((q, i): [P, P] => [pl.points[i], q]))];
    const distTo = (p: P, [a, b]: [P, P]) => {
      const vx = b[0] - a[0];
      const vy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / (vx * vx + vy * vy || 1)));
      return Math.hypot(p[0] - a[0] - t * vx, p[1] - a[1] - t * vy);
    };
    const NUDGE: P[] = [[0, 0], [0, 3], [0, -3], [3, 0], [-3, 0], [0, 6], [0, -6], [6, 0], [-6, 0], [4, 4], [-4, 4], [4, -4], [-4, -4], [0, 9], [0, -9], [9, 0], [-9, 0]];
    const points: PlanePoint[] = [];
    for (const lab of L.labels) {
      const w = textW(lab.text);
      let best: P = [0, 0];
      let bestD = -1;
      for (const n of NUDGE) {
        const cx = Math.min(Math.max(lab.c[0] + ox + n[0], w / 2 + 2), CANVAS_W - w / 2 - 2);
        const cy = lab.c[1] + oy + n[1];
        const anchor: P = [cx - 8 - w / 2, cy - 12.3];
        const dmin = Math.min(99, ...lines.map((ln) => distTo(anchor, ln)));
        if (dmin > bestD) {
          bestD = dmin;
          best = anchor;
        }
        if (dmin >= 6) break;
      }
      points.push({ x: r1(best[0]), y: r1(best[1]), label: lab.text, color: 'muted', open: true });
    }
    for (const d of L.dots) points.push({ x: r1(d[0] + ox), y: r1(d[1] + oy), color: 'accent' });
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: CANVAS_W, yMin: 0, yMax: H, step: 1000 },
      segments,
      polylines,
      points,
      hideTickLabels: true,
    };
  }

  /** Everything in pixels (before centring) at scale k, with the bounding box of lines, dots and label text. */
  private layout(k: number, minX: number, minY: number) {
    const T = (p: P): P => [(p[0] - minX) * k, (p[1] - minY) * k];
    const unit = (v: P): P => {
      const l = Math.hypot(v[0], v[1]) || 1;
      return [v[0] / l, v[1] / l];
    };
    const ext = (n: P, w: number) => Math.abs(n[0]) * (w / 2) + Math.abs(n[1]) * 7;
    const segs: Array<{ a: P; b: P; color: Col; dashed?: boolean; arrows?: boolean }> = this.segs.map((s) => ({ a: T(s.a), b: T(s.b), color: s.color, dashed: s.dashed }));
    const polys: Array<{ pts: P[]; color: Col }> = this.polys.map((p) => ({ pts: p.pts.map(T), color: p.color }));
    const labels: Array<{ c: P; text: string }> = [];
    for (const d of this.dims) {
      const a = T(d.a);
      const b = T(d.b);
      segs.push({ a: [a[0] + d.shift[0], a[1] + d.shift[1]], b: [b[0] + d.shift[0], b[1] + d.shift[1]], color: 'muted', arrows: true });
      const n = unit(d.shift);
      const e = 7 + ext(n, textW(d.text));
      labels.push({ c: [(a[0] + b[0]) / 2 + d.shift[0] + n[0] * e, (a[1] + b[1]) / 2 + d.shift[1] + n[1] * e], text: d.text });
    }
    for (const m of this.rights) {
      const v = T(m.v);
      const u = unit([T(m.p)[0] - v[0], T(m.p)[1] - v[1]]);
      const w = unit([T(m.q)[0] - v[0], T(m.q)[1] - v[1]]);
      const s = 9;
      polys.push({ pts: [[v[0] + u[0] * s, v[1] + u[1] * s], [v[0] + (u[0] + w[0]) * s, v[1] + (u[1] + w[1]) * s], [v[0] + w[0] * s, v[1] + w[1] * s]], color: 'muted' });
    }
    for (const a of this.arcs) {
      const v = T(a.v);
      const p = T(a.p);
      const q = T(a.q);
      const start = Math.atan2(p[1] - v[1], p[0] - v[0]);
      let diff = Math.atan2(q[1] - v[1], q[0] - v[0]) - start;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      while (diff <= -Math.PI) diff += 2 * Math.PI;
      const n = Math.max(6, Math.ceil(Math.abs(diff) / 0.1));
      const pts: P[] = [];
      for (let i = 0; i <= n; i++) {
        const t = start + (diff * i) / n;
        pts.push([v[0] + a.r * Math.cos(t), v[1] + a.r * Math.sin(t)]);
      }
      polys.push({ pts, color: 'accent' });
      if (a.text) {
        const mid = start + diff / 2;
        const bis: P = [Math.cos(mid), Math.sin(mid)];
        const e = a.r + 6 + ext(bis, textW(a.text));
        labels.push({ c: [v[0] + bis[0] * e, v[1] + bis[1] * e], text: a.text });
      }
    }
    for (const l of this.labels) {
      if (l.at) {
        const c = T(l.at);
        labels.push({ c: [c[0] + (l.dx ?? 0), c[1] + (l.dy ?? 0)], text: l.text });
        continue;
      }
      const a = T(l.a!);
      const b = T(l.b!);
      const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n = unit([-(b[1] - a[1]), b[0] - a[0]]);
      const aw = T(l.away!);
      if (n[0] * (aw[0] - m[0]) + n[1] * (aw[1] - m[1]) > 0) n = [-n[0], -n[1]];
      const e = (l.gap ?? 8) + ext(n, textW(l.text));
      labels.push({ c: [m[0] + n[0] * e, m[1] + n[1] * e], text: l.text });
    }
    const dots = this.dotList.map(T);
    const xs: number[] = [];
    const ys: number[] = [];
    const add = (x: number, y: number) => {
      xs.push(x);
      ys.push(y);
    };
    for (const sg of segs) {
      add(...sg.a);
      add(...sg.b);
    }
    for (const pl of polys) for (const q of pl.pts) add(...q);
    for (const d of dots) {
      add(d[0] - 6, d[1] - 6);
      add(d[0] + 6, d[1] + 6);
    }
    for (const lab of labels) {
      const w = textW(lab.text);
      add(lab.c[0] - w / 2, lab.c[1] - 8);
      add(lab.c[0] + w / 2, lab.c[1] + 8);
    }
    const box: [number, number, number, number] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    return { segs, polys, labels, dots, box };
  }
}

// ---------------------------------------------------------------------------
// 4.1 One right triangle
// ---------------------------------------------------------------------------

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
  [12, 35, 37],
];
const FRIENDLY = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];

/** Steps that name the sides from the angle at `vtx`. */
const nameStep = (vtx: string, name: Record<Side, string>) =>
  `Label the sides from $\\angle ${vtx}$: $${name.opp}$ is opposite, $${name.adj}$ is adjacent, and $${name.hyp}$ (across from the right angle) is the hypotenuse.`;
const chooseStep = (known: Side, want: Side) => {
  const fn = fnFor(known, want);
  return `You know the ${SIDE_WORD[known]} and want the ${SIDE_WORD[want]}, so use ${FN_WORD[fn]} (${MEM[fn]}).`;
};

function reviewBasic(rng: Rng): GenOutput {
  const t = triN(rng);
  const unit = rng.pick(['cm', 'm'] as const);
  const mode = rng.pick(['hyp', 'leg', 'trig', 'trig', 'trig'] as const);
  const tri = `\\triangle ${[t.A, t.B, t.R].sort().join('')}`;
  const RA = seg(t.R, t.A);
  const RB = seg(t.R, t.B);
  const AB = seg(t.A, t.B);
  if (mode === 'hyp') {
    const { a, b, c } = retry(
      () => {
        if (rng.chance(0.4)) {
          const [p, q, r] = rng.pick(TRIPLES);
          const k = r <= 13 ? rng.pick([1, 2, 3]) : 1;
          return rng.chance(0.5) ? { a: p * k, b: q * k, c: r * k } : { a: q * k, b: p * k, c: r * k };
        }
        const a = rng.int(4, 24);
        const b = rng.int(4, 24);
        return { a, b, c: Math.hypot(a, b) };
      },
      (v) => v.a !== v.b && (isWhole(v.c) || clear(v.c)),
    );
    const whole = isWhole(c);
    return {
      prompt: `In $${tri}$, $\\angle ${t.R} = 90^\\circ$, $${RA} = ${qm(a, unit)}$ and $${RB} = ${qm(b, unit)}$. Find the length of the hypotenuse, $${AB}$${whole ? '' : `, ${nearest(unit)}`}.`,
      figure: rtFig(t, a, b, { ra: lb(a, unit), rb: lb(b, unit), ab: '?' }),
      parts: [whole ? numPart(c, { suffix: unit, label: `$${AB}$` }) : lenPart(c, unit, `$${AB}$`)],
      hints: ['The hypotenuse is the side across from the right angle. You know both legs.', `Use the Pythagorean theorem: $${AB}^2 = ${RA}^2 + ${RB}^2$, then take the square root.`],
      solution: [
        `$${AB}$ is across from the right angle, so it is the hypotenuse. Use $c^2 = a^2 + b^2$.`,
        `$${AB}^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${a * a + b * b}$`,
        `$${AB} = \\sqrt{${a * a + b * b}} ${whole ? '=' : '\\approx'} ${whole ? c : f2(c)}$`,
        `The hypotenuse $${AB}$ is ${whole ? '' : 'about '}$${qm(whole ? c : f1(c), unit)}$ long.`,
      ],
    };
  }
  if (mode === 'leg') {
    // The hypotenuse c and the leg a are known.
    const { a, b, c } = retry(
      () => {
        if (rng.chance(0.4)) {
          const [p, q, r] = rng.pick(TRIPLES);
          const k = r <= 13 ? rng.pick([1, 2, 3]) : 1;
          return rng.chance(0.5) ? { a: p * k, b: q * k, c: r * k } : { a: q * k, b: p * k, c: r * k };
        }
        const a = rng.int(4, 24);
        const c = rng.int(a + 2, a + 20);
        return { a, b: Math.sqrt(c * c - a * a), c };
      },
      (v) => isWhole(v.b) || clear(v.b),
    );
    const whole = isWhole(b);
    return {
      prompt: `In $${tri}$, $\\angle ${t.R} = 90^\\circ$, the hypotenuse $${AB} = ${qm(c, unit)}$ and $${RA} = ${qm(a, unit)}$. Find the length of $${RB}$${whole ? '' : `, ${nearest(unit)}`}.`,
      figure: rtFig(t, a, b, { ra: lb(a, unit), rb: '?', ab: lb(c, unit) }),
      parts: [whole ? numPart(b, { suffix: unit, label: `$${RB}$` }) : lenPart(b, unit, `$${RB}$`)],
      hints: ['You know the hypotenuse and one leg. The missing side is a leg.', `Rearrange the Pythagorean theorem: $${RB}^2 = ${AB}^2 - ${RA}^2$.`],
      solution: [
        `$${AB}$ is the hypotenuse, so $${AB}^2 = ${RA}^2 + ${RB}^2$. Subtract to find the missing leg: $${RB}^2 = ${AB}^2 - ${RA}^2$.`,
        `$${RB}^2 = ${c}^2 - ${a}^2 = ${c * c} - ${a * a} = ${c * c - a * a}$`,
        `$${RB} = \\sqrt{${c * c - a * a}} ${whole ? '=' : '\\approx'} ${whole ? fmt(b) : f2(b)}$`,
        `$${RB}$ is ${whole ? '' : 'about '}$${qm(whole ? fmt(b) : f1(b), unit)}$ long. Check: it is shorter than the hypotenuse.`,
      ],
    };
  }
  const at = rng.pick(['a', 'b'] as const);
  const R = rel(t, at);
  const v = retry(
    () => {
      const ang = rng.pick(FRIENDLY);
      const known: Side = rng.pick(['hyp', 'hyp', 'adj'] as const);
      const want: Side = known === 'hyp' ? rng.pick(['opp', 'adj'] as const) : 'opp';
      const kv = rng.int(6, 30);
      const fn = fnFor(known, want);
      return { ang, known, want, kv, fn, s: solveSide(fn, ang, kv, true, 'x') };
    },
    (v) => v.s.ok,
  );
  const { ang, known, want, kv, fn, s } = v;
  const sides = sidesFrom(known, kv, ang);
  const [legA, legB] = drawLegs(at, sides);
  return {
    prompt: `In $${tri}$, $\\angle ${t.R} = 90^\\circ$, $\\angle ${R.vtx} = ${deg(ang)}$ and $${R.name[known]} = ${qm(kv, unit)}$. Find $x$, the length of $${R.name[want]}$, ${nearest(unit)}.`,
    figure: rtFig(t, legA, legB, { [R.key[known]]: lb(kv, unit), [R.key[want]]: 'x' }, { [at]: `${ang}°` }),
    parts: [lenPart(s.x, unit, '$x =$')],
    hints: [`Name the sides from the $${deg(ang)}$ angle: opposite, adjacent and hypotenuse.`, `${chooseStep(known, want)} Write $\\${fn} ${deg(ang)} = \\dfrac{x}{${kv}}$.`],
    solution: [nameStep(R.vtx, R.name), chooseStep(known, want), ...s.steps, `$x \\approx ${qm(f1(s.x), unit)}$`],
  };
}

// --- 4.1 level 2: applied problems with one triangle -------------------------

function ladderSide(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const where = rng.pick(['the wall of a barn', 'the side of a house', 'a garage wall', 'the wall of a grain bin shed']);
  const v = retry(
    () => {
      const ang = rng.int(65, 78);
      const mode = rng.pick(['LfromH', 'LfromD', 'DfromH'] as const);
      const given = mode === 'LfromD' ? rng.int(10, 25) / 10 : rng.int(35, 85) / 10;
      const fn: Fn = mode === 'LfromH' ? 'sin' : mode === 'LfromD' ? 'cos' : 'tan';
      const s = solveSide(fn, ang, given, false, mode === 'DfromH' ? 'd' : 'L');
      return { ang, mode, given, fn, s };
    },
    (v) => v.s.ok,
  );
  const { ang, mode, given, s } = v;
  const sides = mode === 'LfromH' ? sidesFrom('opp', given, ang) : mode === 'LfromD' ? sidesFrom('adj', given, ang) : sidesFrom('opp', given, ang);
  const t = UPRIGHT('W', 'F', 'T');
  const labels: Partial<Record<SideKey, string>> =
    mode === 'LfromH' ? { rb: lb(given, 'm'), ab: 'L' } : mode === 'LfromD' ? { ra: lb(given, 'm'), ab: 'L' } : { rb: lb(given, 'm'), ra: 'd' };
  const givenText = mode === 'LfromD' ? `Its foot is ${Q(given, 'm')} from the wall` : `It reaches ${Q(given, 'm')} up the wall`;
  const ask = mode === 'DfromH' ? `How far from the wall is the foot of the ladder` : 'How long is the ladder';
  const known: Side = mode === 'LfromD' ? 'adj' : 'opp';
  const want: Side = mode === 'DfromH' ? 'adj' : 'hyp';
  return {
    prompt: `${who} leans a ladder against ${where}. The ladder makes an angle of $${deg(ang)}$ with the ground. ${givenText}. ${ask}, ${nearest('m')}?`,
    figure: rtFig(t, sides.adj, sides.opp, labels, { a: `${ang}°` }, 'ladder'),
    parts: [lenPart(s.x, 'm', mode === 'DfromH' ? 'Distance' : 'Ladder')],
    hints: ['The ladder is the hypotenuse. The height on the wall is opposite the angle at the ground, and the distance along the ground is adjacent.', `${chooseStep(known, want)} The unknown ends up on the bottom of the ratio, so divide.`],
    solution: ['The ladder is the hypotenuse, the height on the wall is opposite the angle at the ground, and the distance from the wall is adjacent.', chooseStep(known, want), ...s.steps, mode === 'DfromH' ? `The foot of the ladder is about $${qm(f1(s.x), 'm')}$ from the wall.` : `The ladder is about $${qm(f1(s.x), 'm')}$ long.`],
  };
}

function rampOrWire(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  if (rng.chance(0.5)) {
    const v = retry(
      () => {
        const ang = rng.pick([3, 3.5, 4, 4.5, 5, 5.5, 6]);
        const rise = rng.int(6, 18) * 5 / 100;
        const wantLen = rng.chance(0.5);
        const fn: Fn = wantLen ? 'sin' : 'tan';
        return { ang, rise, wantLen, fn, s: solveSide(fn, ang, rise, false, wantLen ? 'L' : 'd') };
      },
      (v) => v.s.ok,
    );
    const { ang, rise, wantLen, s } = v;
    const sides = sidesFrom('opp', rise, ang);
    const t = UPRIGHT('C', 'A', 'B');
    return {
      prompt: `A wheelchair ramp at a clinic in ${town} rises ${Q(rise, 'm')} to the door and makes an angle of $${deg(ang)}$ with the ground. ${wantLen ? 'How long is the sloped surface of the ramp' : 'What horizontal distance (run) does the ramp cover'}, ${nearest('m')}?`,
      figure: rtFig(t, sides.adj, sides.opp, wantLen ? { rb: lb(rise, 'm'), ab: 'L' } : { rb: lb(rise, 'm'), ra: 'd' }, { a: `${fmt(ang)}°` }, 'ramp'),
      parts: [lenPart(s.x, 'm', wantLen ? 'Length' : 'Run')],
      hints: ['The rise is opposite the angle at the ground. The run is adjacent, and the ramp surface is the hypotenuse.', `${chooseStep('opp', wantLen ? 'hyp' : 'adj')} The unknown is on the bottom of the ratio.`],
      solution: ['The rise is opposite the angle, the run is adjacent and the sloped surface is the hypotenuse.', chooseStep('opp', wantLen ? 'hyp' : 'adj'), ...s.steps, wantLen ? `The ramp surface is about $${qm(f1(s.x), 'm')}$ long.` : `The ramp covers a run of about $${qm(f1(s.x), 'm')}$.`],
    };
  }
  const v = retry(
    () => {
      const ang = rng.int(48, 68);
      const h = rng.int(8, 30);
      const wantLen = rng.chance(0.55);
      const fn: Fn = wantLen ? 'sin' : 'tan';
      return { ang, h, wantLen, fn, s: solveSide(fn, ang, h, false, wantLen ? 'L' : 'd') };
    },
    (v) => v.s.ok,
  );
  const { ang, h, wantLen, s } = v;
  const sides = sidesFrom('opp', h, ang);
  const what = rng.pick(['a radio tower', 'a wind-monitoring mast', 'a communications tower', 'a flagpole at a rodeo ground']);
  return {
    prompt: `A guy wire is attached ${Q(h, 'm')} up ${what} near ${town} and runs straight to an anchor in the ground. The wire makes an angle of $${deg(ang)}$ with the ground. ${wantLen ? 'How long is the wire' : 'How far is the anchor from the base of the tower'}, ${nearest('m')}?`,
    figure: rtFig(UPRIGHT('B', 'A', 'T'), sides.adj, sides.opp, wantLen ? { rb: lb(h, 'm'), ab: 'L' } : { rb: lb(h, 'm'), ra: 'd' }, { a: `${ang}°` }),
    parts: [lenPart(s.x, 'm', wantLen ? 'Wire' : 'Distance')],
    hints: ['The height where the wire is attached is opposite the angle at the anchor. The wire is the hypotenuse.', `${chooseStep('opp', wantLen ? 'hyp' : 'adj')} The unknown is on the bottom, so divide.`],
    solution: ['The height on the tower is opposite the angle at the anchor, the ground distance is adjacent and the wire is the hypotenuse.', chooseStep('opp', wantLen ? 'hyp' : 'adj'), ...s.steps, wantLen ? `The wire is about $${qm(f1(s.x), 'm')}$ long.` : `The anchor is about $${qm(f1(s.x), 'm')}$ from the base.`],
  };
}

function heightTop(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  if (rng.chance(0.5)) {
    const thing = rng.pick([
      { name: 'grain bin', scene: 'none' as const },
      { name: 'spruce tree', scene: 'tree' as const },
      { name: 'light standard in a parking lot', scene: 'none' as const },
      { name: 'flagpole', scene: 'none' as const },
    ]);
    const v = retry(
      () => {
        const ang = rng.int(25, 62);
        const sh = rng.int(40, 250) / 10;
        return { ang, sh, s: solveSide('tan', ang, sh, true, 'h') };
      },
      (v) => v.s.ok && v.s.x < 40,
    );
    const { ang, sh, s } = v;
    return {
      prompt: `On a sunny afternoon in ${town}, a ${thing.name} casts a shadow ${Q(sh, 'm')} long on level ground. The angle of elevation of the sun is $${deg(ang)}$. How tall is the ${thing.name.split(' in ')[0]}, ${nearest('m')}?`,
      figure: rtFig(UPRIGHT('B', 'S', 'T'), sh, s.x, { ra: lb(sh, 'm'), rb: 'h' }, { a: `${ang}°` }, thing.scene),
      parts: [lenPart(s.x, 'm', 'Height')],
      hints: ['Sketch a right triangle: the height, the shadow along the ground, and the sun’s ray from the top to the tip of the shadow.', 'The height is opposite the angle and the shadow is adjacent: use TOA, and multiply.'],
      solution: ['The height $h$ is opposite the angle of elevation and the shadow is adjacent.', chooseStep('adj', 'opp'), ...s.steps, `The ${thing.name.split(' in ')[0]} is about $${qm(f1(s.x), 'm')}$ tall.`],
    };
  }
  const v = retry(
    () => {
      const ang = rng.int(30, 65);
      const L = rng.int(35, 120);
      return { ang, L, s: solveSide('sin', ang, L, true, 'h') };
    },
    (v) => v.s.ok,
  );
  const { ang, L, s } = v;
  const sides = sidesFrom('hyp', L, ang);
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is flying a kite at a park in ${town}. The kite string is ${Q(L, 'm')} long and makes an angle of $${deg(ang)}$ with the ground. Ignoring the sag in the string and the height of ${who}'s hands, how high is the kite, ${nearest('m')}?`,
    figure: rtFig(UPRIGHT('G', 'H', 'K'), sides.adj, sides.opp, { ab: lb(L, 'm'), rb: 'h' }, { a: `${ang}°` }, 'kite'),
    parts: [lenPart(s.x, 'm', 'Height')],
    hints: ['The string is the hypotenuse and the height is opposite the angle.', 'Use SOH: $\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$, then multiply.'],
    solution: ['The string is the hypotenuse and the height $h$ is opposite the angle at the ground.', chooseStep('hyp', 'opp'), ...s.steps, `The kite is about $${qm(f1(s.x), 'm')}$ high.`],
  };
}

function angleFind(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['ramp', 'ladder', 'rafter', 'conveyor', 'sun'] as const);
  type C = { fn: Fn; top: number; bottom: number; u: Unit; prompt: string; fig: RightTriangleFigure; tw: Side; bw: Side; what: string };
  const make = (): C => {
    if (kind === 'ramp') {
      const rise = rng.int(6, 18) * 5 / 100;
      const run = rng.int(40, 110) / 10;
      return {
        fn: 'tan', top: rise, bottom: run, u: 'm', tw: 'opp', bw: 'adj', what: 'The ramp makes an angle of about %A with the ground.',
        prompt: `A loading ramp behind a shop in ${town} rises ${Q(rise, 'm')} over a horizontal run of ${Q(run, 'm')}. What angle does the ramp make with the ground, ${NEAR_DEG}?`,
        fig: rtFig(UPRIGHT('C', 'A', 'B'), run, rise, { ra: lb(run, 'm'), rb: lb(rise, 'm') }, { a: 'θ' }, 'ramp'),
      };
    }
    if (kind === 'ladder') {
      const L = rng.int(8, 18) / 2;
      const d = rng.int(10, 26) / 10;
      return {
        fn: 'cos', top: d, bottom: L, u: 'm', tw: 'adj', bw: 'hyp', what: 'The ladder makes an angle of about %A with the ground.',
        prompt: `${cap(an(L))} ${fmt(L)} m ladder leans against a wall with its foot ${Q(d, 'm')} from the wall. What angle does the ladder make with the ground, ${NEAR_DEG}?`,
        fig: rtFig(UPRIGHT('W', 'F', 'T'), d, Math.sqrt(L * L - d * d), { ra: lb(d, 'm'), ab: lb(L, 'm') }, { a: 'θ' }, 'ladder'),
      };
    }
    if (kind === 'rafter') {
      const len = rng.int(20, 36) / 2;
      const rise = rng.int(3, 9);
      return {
        fn: 'sin', top: rise, bottom: len, u: 'ft', tw: 'opp', bw: 'hyp', what: 'The rafter makes an angle of about %A with the horizontal.',
        prompt: `A roof rafter on a garage in ${town} is ${Q(len, 'ft')} long from the top of the wall to the peak, and the peak is ${Q(rise, 'ft')} higher than the top of the wall. What angle does the rafter make with the horizontal, ${NEAR_DEG}?`,
        fig: rtFig(UPRIGHT('C', 'A', 'B'), Math.sqrt(len * len - rise * rise), rise, { rb: lb(rise, 'ft'), ab: lb(len, 'ft') }, { a: 'θ' }),
      };
    }
    if (kind === 'conveyor') {
      const len = rng.int(12, 30);
      const h = rng.int(30, 100) / 10;
      return {
        fn: 'sin', top: h, bottom: len, u: 'm', tw: 'opp', bw: 'hyp', what: 'The conveyor makes an angle of about %A with the ground.',
        prompt: `A grain conveyor on a farm near ${town} is ${Q(len, 'm')} long. Its top end rests on the edge of a bin ${Q(h, 'm')} above the ground. What angle does the conveyor make with the ground, ${NEAR_DEG}?`,
        fig: rtFig(UPRIGHT('C', 'A', 'B'), Math.sqrt(len * len - h * h), h, { rb: lb(h, 'm'), ab: lb(len, 'm') }, { a: 'θ' }),
      };
    }
    const h = rng.int(3, 12);
    const sh = rng.int(25, 220) / 10;
    return {
      fn: 'tan', top: h, bottom: sh, u: 'm', tw: 'opp', bw: 'adj', what: 'The angle of elevation of the sun is about %A.',
      prompt: `${cap(an(h))} ${h} m flagpole in ${town} casts a shadow ${Q(sh, 'm')} long on level ground. What is the angle of elevation of the sun, ${NEAR_DEG}?`,
      fig: rtFig(UPRIGHT('B', 'S', 'T'), sh, h, { ra: lb(sh, 'm'), rb: lb(h, 'm') }, { a: 'θ' }),
    };
  };
  const { c, s } = retry(
    () => {
      const c = make();
      return { c, s: solveAngle(c.fn, c.top, c.bottom) };
    },
    (v) => v.s.ok && v.s.a > 2,
  );
  const { fn, top, bottom, u } = c;
  return {
    prompt: c.prompt,
    figure: c.fig,
    parts: [angPart(s.a, '$\\theta =$')],
    hints: [`Name the two sides you know from the angle $\\theta$: the ${SIDE_WORD[c.tw]} and the ${SIDE_WORD[c.bw]}.`, `Use ${MEM[fn]}: $\\${fn}\\theta = \\dfrac{${fmt(top)}}{${fmt(bottom)}}$. Then use the inverse key, $\\${fn}^{-1}$, to find the angle.`],
    solution: [
      `From $\\theta$, the ${fmt(top)} ${u} side is the ${SIDE_WORD[c.tw]} and the ${fmt(bottom)} ${u} side is the ${SIDE_WORD[c.bw]}, so use ${FN_WORD[fn]} (${MEM[fn]}).`,
      `$\\${fn}\\theta = \\dfrac{${fmt(top)}}{${fmt(bottom)}} \\approx ${r4(s.r)}$`,
      `$\\theta = \\${fn}^{-1}\\left(\\dfrac{${fmt(top)}}{${fmt(bottom)}}\\right) \\approx ${fx(s.a, 2)}^\\circ$`,
      c.what.replace('%A', `$${f1(s.a)}^\\circ$`),
    ],
  };
}

function pythApplied(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const who = rng.pick(NAMES);
  const kind = rng.pick(['gate', 'reach', 'rafter', 'field'] as const);
  if (kind === 'reach') {
    const v = retry(
      () => {
        const L = rng.int(8, 20) / 2;
        const d = rng.int(10, 28) / 10;
        return { L, d, h: Math.sqrt(L * L - d * d) };
      },
      (v) => v.d < v.L * 0.4 && clear(v.h),
    );
    const { L, d, h } = v;
    return {
      prompt: `${who} sets the foot of ${an(L)} ${fmt(L)} m ladder ${Q(d, 'm')} from the wall of a house in ${town}. How high up the wall does the ladder reach, ${nearest('m')}?`,
      figure: rtFig(UPRIGHT('W', 'F', 'T'), d, h, { ra: lb(d, 'm'), ab: lb(L, 'm'), rb: 'h' }, {}, 'ladder'),
      parts: [lenPart(h, 'm', 'Height')],
      hints: ['No angle is given, but you know two sides of a right triangle: use the Pythagorean theorem.', 'The ladder is the hypotenuse, so $h^2 = L^2 - d^2$.'],
      solution: [
        `The ladder ($${fmt(L)}$ m) is the hypotenuse. The height $h$ is a leg: $h^2 = ${fmt(L)}^2 - ${fmt(d)}^2$.`,
        `$h^2 = ${fmt(sq(L))} - ${fmt(sq(d))} = ${fmt(sq(L) - sq(d))}$`,
        `$h = \\sqrt{${fmt(sq(L) - sq(d))}} \\approx ${f2(h)}$`,
        `The ladder reaches about $${qm(f1(h), 'm')}$ up the wall.`,
      ],
    };
  }
  const c = retry(
    () => {
      if (kind === 'gate') {
        const w = rng.int(8, 16) / 2;
        const h = rng.int(7, 12) / 2;
        return { a: w, b: h, u: 'ft' as Unit, text: `${who} is building a wooden farm gate that is ${Q(w, 'ft')} wide and ${Q(h, 'ft')} tall. A diagonal brace runs from one corner of the gate to the opposite corner. How long is the brace`, ask: 'Brace' };
      }
      if (kind === 'rafter') {
        const run = rng.int(16, 32) / 2;
        const rise = rng.int(6, 16) / 2;
        return { a: run, b: rise, u: 'ft' as Unit, text: `A shed roof rises ${Q(rise, 'ft')} over a horizontal run of ${Q(run, 'ft')}. How long is a rafter that spans the roof from the low wall to the high wall, ignoring any overhang`, ask: 'Rafter' };
      }
      const a = rng.int(12, 40) * 10;
      const b = rng.int(8, 30) * 10;
      return { a, b, u: 'm' as Unit, text: `A rectangular hayfield near ${town} measures ${Q(a, 'm')} by ${Q(b, 'm')}. ${who} drives a quad in a straight line from one corner of the field to the opposite corner. How far does ${who} drive`, ask: 'Distance' };
    },
    (c) => c.a !== c.b && (isWhole(Math.hypot(c.a, c.b)) || clear(Math.hypot(c.a, c.b))),
  );
  const d = Math.hypot(c.a, c.b);
  const whole = isWhole(d);
  return {
    prompt: `${c.text}${whole ? '' : `, ${nearest(c.u)}`}?`,
    figure: rtFig(UPRIGHT('C', 'A', 'B'), c.a, c.b, { ra: lb(c.a, c.u), rb: lb(c.b, c.u), ab: '?' }),
    parts: [whole ? numPart(d, { suffix: c.u, label: c.ask }) : lenPart(d, c.u, c.ask)],
    hints: ['Find the right triangle. The diagonal is across from the right angle, so it is the hypotenuse.', 'Use $c^2 = a^2 + b^2$, then take the square root.'],
    solution: [
      `The diagonal is the hypotenuse of a right triangle with legs $${qm(c.a, c.u)}$ and $${qm(c.b, c.u)}$.`,
      `$c^2 = ${fmt(c.a)}^2 + ${fmt(c.b)}^2 = ${fmt(sq(c.a))} + ${fmt(sq(c.b))} = ${fmt(sq(c.a) + sq(c.b))}$`,
      `$c = \\sqrt{${fmt(sq(c.a) + sq(c.b))}} ${whole ? '=' : '\\approx'} ${whole ? fmt(d) : f2(d)}$`,
      `The answer is ${whole ? '' : 'about '}$${qm(whole ? fmt(d) : f1(d), c.u)}$.`,
    ],
  };
}

// --- 4.1 level 3: multi-step problems with one triangle ----------------------

function solveAll(rng: Rng): GenOutput {
  const t = triN(rng);
  const at = rng.pick(['a', 'b'] as const);
  const R = rel(t, at);
  const unit = rng.pick(['cm', 'm'] as const);
  const v = retry(
    () => {
      const ang = rng.int(22, 68);
      const known: Side = rng.pick(['opp', 'adj', 'hyp'] as const);
      const kv = rng.int(8, 40);
      const [u1, u2] = (['opp', 'adj', 'hyp'] as Side[]).filter((k) => k !== known);
      const solve = (want: Side) => {
        const fn = fnFor(known, want);
        return { fn, want, ...solveSide(fn, ang, kv, topOf(fn) === want, R.name[want]) };
      };
      return { ang, known, kv, s1: solve(u1), s2: solve(u2) };
    },
    (v) => v.s1.ok && v.s2.ok,
  );
  const { ang, known, kv, s1, s2 } = v;
  const sides = sidesFrom(known, kv, ang);
  const [legA, legB] = drawLegs(at, sides);
  return {
    prompt: `In $\\triangle ${[t.A, t.B, t.R].sort().join('')}$, $\\angle ${t.R} = 90^\\circ$, $\\angle ${R.vtx} = ${deg(ang)}$ and $${R.name[known]} = ${qm(kv, unit)}$. Solve the triangle: find $\\angle ${R.other}$ and the lengths of $${R.name[s1.want]}$ and $${R.name[s2.want]}$, ${nearest(unit)}.`,
    figure: rtFig(t, legA, legB, { [R.key[known]]: lb(kv, unit) }, { [at]: `${ang}°` }),
    parts: [numPart(90 - ang, { suffix: '°', label: `$\\angle ${R.other}$` }), lenPart(s1.x, unit, `$${R.name[s1.want]}$`), lenPart(s2.x, unit, `$${R.name[s2.want]}$`)],
    hints: ['The angles of a triangle add to $180^\\circ$. With a $90^\\circ$ angle, the two acute angles add to $90^\\circ$.', `Label the sides from $\\angle ${R.vtx}$, then use the side you were given to find each missing side. ${KEEP}`],
    solution: [
      `$\\angle ${R.other} = 90^\\circ - ${deg(ang)} = ${deg(90 - ang)}$`,
      nameStep(R.vtx, R.name),
      `${R.name[s1.want]}: ${chooseStep(known, s1.want)}`,
      ...s1.steps,
      `${R.name[s2.want]}: ${chooseStep(known, s2.want)}`,
      ...s2.steps,
      `$\\angle ${R.other} = ${deg(90 - ang)}$, $${R.name[s1.want]} \\approx ${qm(f1(s1.x), unit)}$ and $${R.name[s2.want]} \\approx ${qm(f1(s2.x), unit)}$.`,
    ],
  };
}

function solveTwoSides(rng: Rng): GenOutput {
  const t = triN(rng);
  const unit = rng.pick(['cm', 'm'] as const);
  const RA = seg(t.R, t.A);
  const RB = seg(t.R, t.B);
  const AB = seg(t.A, t.B);
  const v = retry(
    () => {
      const legs = rng.chance(0.5);
      const a = rng.int(5, 30);
      const other = legs ? rng.int(5, 30) : rng.int(a + 3, a + 25);
      const b = legs ? other : Math.sqrt(other * other - a * a);
      const c = legs ? Math.hypot(a, other) : other;
      // Angle at A: opposite side RB, adjacent RA.
      const angA = atanD(b / a);
      const shownA = legs ? atanD(Number(r4(b / a))) : acosD(Number(r4(a / c)));
      return { legs, a, b, c, angA, shownA };
    },
    (v) => v.a !== v.b && clear(v.angA) && f1(v.shownA) === f1(v.angA) && clear(v.legs ? v.c : v.b) && f1(v.angA) !== f1(45) && v.angA > 15 && v.angA < 75,
  );
  const { legs, a, b, c, angA } = v;
  const angB = 90 - angA;
  const third = legs ? c : b;
  const thirdName = legs ? AB : RB;
  const givenText = legs ? `$${RA} = ${qm(a, unit)}$ and $${RB} = ${qm(b, unit)}$` : `$${RA} = ${qm(a, unit)}$ and the hypotenuse $${AB} = ${qm(c, unit)}$`;
  const fnA: Fn = legs ? 'tan' : 'cos';
  const ratioA = legs ? `\\dfrac{${RB}}{${RA}} = \\dfrac{${fmt(b)}}{${fmt(a)}}` : `\\dfrac{${RA}}{${AB}} = \\dfrac{${fmt(a)}}{${fmt(c)}}`;
  const rA = legs ? b / a : a / c;
  return {
    prompt: `In $\\triangle ${[t.A, t.B, t.R].sort().join('')}$, $\\angle ${t.R} = 90^\\circ$, ${givenText}. Find the length of $${thirdName}$ ${nearest(unit)}, and find $\\angle ${t.A}$ and $\\angle ${t.B}$ ${NEAR_DEG}.`,
    figure: rtFig(t, a, b, legs ? { ra: lb(a, unit), rb: lb(b, unit) } : { ra: lb(a, unit), ab: lb(c, unit) }),
    parts: [lenPart(third, unit, `$${thirdName}$`), angPart(angA, `$\\angle ${t.A}$`), angPart(angB, `$\\angle ${t.B}$`)],
    hints: ['Use the Pythagorean theorem for the missing side. Use an inverse trig ratio for one angle, then subtract from $90^\\circ$ for the other.', `From $\\angle ${t.A}$, $${RA}$ is adjacent${legs ? ` and $${RB}$ is opposite: use TOA` : ` and $${AB}$ is the hypotenuse: use CAH`}.`],
    solution: [
      legs
        ? `$${AB}^2 = ${a}^2 + ${fmt(b)}^2 = ${a * a + b * b}$, so $${AB} = \\sqrt{${a * a + b * b}} \\approx ${f2(c)}$`
        : `$${RB}^2 = ${fmt(c)}^2 - ${a}^2 = ${c * c - a * a}$, so $${RB} = \\sqrt{${c * c - a * a}} \\approx ${f2(b)}$`,
      `From $\\angle ${t.A}$: $\\${fnA} ${t.A} = ${ratioA} \\approx ${r4(rA)}$, so $\\angle ${t.A} = \\${fnA}^{-1}(${r4(rA)}) \\approx ${fx(angA, 2)}^\\circ$`,
      `The acute angles add to $90^\\circ$: $\\angle ${t.B} \\approx 90^\\circ - ${fx(angA, 2)}^\\circ = ${fx(angB, 2)}^\\circ$`,
      `$${thirdName} \\approx ${qm(f1(third), unit)}$, $\\angle ${t.A} \\approx ${f1(angA)}^\\circ$ and $\\angle ${t.B} \\approx ${f1(angB)}^\\circ$.`,
    ],
  };
}

function ladderSafety(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const L = rng.int(8, 20) / 2;
      const d = rng.int(8, 40) / 10;
      const ang = acosD(d / L);
      return { L, d, ang, h: Math.sqrt(L * L - d * d) };
    },
    (v) => v.d < v.L * 0.6 && clear(v.ang) && clear(v.h) && Math.abs(v.ang - 70) > 0.6 && Math.abs(v.ang - 80) > 0.6 && v.ang > 55 && f1(acosD(Number(r4(v.d / v.L)))) === f1(v.ang),
  );
  const { L, d, ang, h } = v;
  const safe = ang >= 70 && ang <= 80;
  return {
    prompt: `Suppose a safety guideline says a ladder should make an angle between $70^\\circ$ and $80^\\circ$ with the ground. ${who} sets up ${an(L)} ${fmt(L)} m ladder with its foot ${Q(d, 'm')} from a wall.\n\n(a) What angle does the ladder make with the ground, ${NEAR_DEG}?\n\n(b) How high up the wall does it reach, ${nearest('m')}?\n\n(c) Does the setup follow the guideline?`,
    figure: rtFig(UPRIGHT('W', 'F', 'T'), d, h, { ra: lb(d, 'm'), ab: lb(L, 'm'), rb: 'h' }, { a: 'θ' }, 'ladder'),
    parts: [angPart(ang, '(a) $\\theta =$'), lenPart(h, 'm', '(b) $h =$'), part(fixedChoice(['Yes', 'No'], safe ? 0 : 1), { label: '(c)' })],
    hints: ['The ladder is the hypotenuse and the distance from the wall is adjacent to the angle at the ground: use CAH and $\\cos^{-1}$.', 'For the height, use the Pythagorean theorem (or SOH with your angle). Then compare the angle with the guideline.'],
    solution: [
      `(a) $\\cos\\theta = \\dfrac{${fmt(d)}}{${fmt(L)}} \\approx ${r4(d / L)}$, so $\\theta = \\cos^{-1}(${r4(d / L)}) \\approx ${fx(ang, 2)}^\\circ$`,
      `(b) $h^2 = ${fmt(L)}^2 - ${fmt(d)}^2 = ${fmt(sq(L) - sq(d))}$, so $h \\approx ${f2(h)}\\ \\text{m}$`,
      safe ? `(c) $${f1(ang)}^\\circ$ is between $70^\\circ$ and $80^\\circ$, so yes, the setup follows the guideline.` : `(c) $${f1(ang)}^\\circ$ is ${ang < 70 ? 'less than $70^\\circ$ (the foot is too far out)' : 'more than $80^\\circ$ (the ladder is too steep)'}, so no, the setup does not follow the guideline.`,
      `(a) about $${f1(ang)}^\\circ$; (b) about $${qm(f1(h), 'm')}$; (c) ${safe ? 'Yes' : 'No'}.`,
    ],
  };
}

function rampDesign(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const v = retry(
    () => {
      const lim = rng.pick([4.5, 4.8, 5]);
      const rise = rng.int(6, 18) * 5 / 100;
      return { lim, rise, run: rise / tanD(lim), len: rise / sinD(lim) };
    },
    (v) => clear(v.run) && clear(v.len, 2) && f1(v.rise / Number(r4(tanD(v.lim)))) === f1(v.run) && f2(v.rise / Number(r4(sinD(v.lim)))) === f2(v.len),
  );
  const { lim, rise, run, len } = v;
  return {
    prompt: `Suppose the building code says a wheelchair ramp can make an angle of at most $${deg(lim)}$ with the ground. A ramp at a community hall in ${town} must rise ${Q(rise, 'm')} to the door. The builder uses the steepest angle allowed.\n\n(a) What horizontal run does the ramp need, ${nearest('m')}?\n\n(b) How long is the sloped surface of the ramp, ${nearest('m', 2)} (to the nearest centimetre), so the builder can cut the ramp deck?`,
    figure: rtFig(UPRIGHT('C', 'A', 'B'), run, rise, { ra: 'd', rb: lb(rise, 'm'), ab: 'L' }, { a: `${fmt(lim)}°` }, 'ramp'),
    parts: [lenPart(run, 'm', '(a) Run $d =$'), lenPart(len, 'm', '(b) Length $L =$', 2)],
    hints: [`The rise is opposite the $${deg(lim)}$ angle. The run is adjacent and the sloped surface is the hypotenuse.`, `Rearrange each ratio so the unknown is alone: $d = \\dfrac{${fmt(rise)}}{\\tan ${deg(lim)}}$ and $L = \\dfrac{${fmt(rise)}}{\\sin ${deg(lim)}}$.`],
    solution: [
      `(a) Opposite and adjacent: TOA. $\\tan ${deg(lim)} = \\dfrac{${fmt(rise)}}{d}$, so $d = \\dfrac{${fmt(rise)}}{\\tan ${deg(lim)}} \\approx \\dfrac{${fmt(rise)}}{${r4(tanD(lim))}} \\approx ${f2(run)}\\ \\text{m}$`,
      `(b) Opposite and hypotenuse: SOH. $\\sin ${deg(lim)} = \\dfrac{${fmt(rise)}}{L}$, so $L = \\dfrac{${fmt(rise)}}{\\sin ${deg(lim)}} \\approx \\dfrac{${fmt(rise)}}{${r4(sinD(lim))}} \\approx ${fx(len, 3)}\\ \\text{m}$`,
      `Check: the hypotenuse $L$ is a little longer than the run, as it should be.`,
      `(a) about $${qm(f1(run), 'm')}$; (b) about $${qm(f2(len), 'm')}$.`,
    ],
  };
}

function roofPitch(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const v = retry(
    () => {
      const p = rng.int(4, 10);
      const run = rng.int(16, 32) / 2;
      const ang = atanD(p / 12);
      return { p, run, ang, len: run / cosD(ang) };
    },
    (v) => clear(v.ang) && clear(v.len) && f1(atanD(Number(r4(v.p / 12)))) === f1(v.ang),
  );
  const { p, run, ang, len } = v;
  const rise = (run * p) / 12;
  return {
    prompt: `A new house in ${town} has ${p === 8 ? 'an' : 'a'} ${p}/12 roof pitch: the roof rises $${p}$ in for every $12$ in of horizontal run. Each rafter covers a horizontal run of ${Q(run, 'ft')} (ignore the overhang).\n\n(a) What angle does the roof make with the horizontal, ${NEAR_DEG}?\n\n(b) How long is each rafter, ${nearest('ft')}?`,
    figure: rtFig(UPRIGHT('C', 'A', 'B'), run, rise, { ra: lb(run, 'ft'), ab: 'L' }, { a: 'θ' }),
    parts: [angPart(ang, '(a) $\\theta =$'), lenPart(len, 'ft', '(b) $L =$')],
    hints: [`The pitch makes a small right triangle with rise $${p}$ and run $12$: $\\tan\\theta = \\dfrac{${p}}{12}$.`, `The run is adjacent to $\\theta$ and the rafter is the hypotenuse: $L = \\dfrac{${fmt(run)}}{\\cos\\theta}$. ${KEEP}`],
    solution: [
      `(a) $\\tan\\theta = \\dfrac{${p}}{12} \\approx ${r4(p / 12)}$, so $\\theta = \\tan^{-1}\\left(\\dfrac{${p}}{12}\\right) \\approx ${fx(ang, 2)}^\\circ$`,
      `(b) CAH: $\\cos\\theta = \\dfrac{${fmt(run)}}{L}$, so $L = \\dfrac{${fmt(run)}}{\\cos\\theta} \\approx ${f2(len)}\\ \\text{ft}$ (using the unrounded angle)`,
      `Check with the Pythagorean theorem: the rise is $${fmt(run)} \\times \\dfrac{${p}}{12} = ${fmt(rise)}$ ft, and $\\sqrt{${fmt(run)}^2 + ${fmt(rise)}^2} \\approx ${f2(len)}$ ft.`,
      `(a) about $${f1(ang)}^\\circ$; (b) about $${qm(f1(len), 'ft')}$.`,
    ],
  };
}

const trigReview = skill({
  id: 'm203-trig-review',
  name: 'Solving one right triangle',
  description: 'Use the Pythagorean theorem and the sine, cosine and tangent ratios to find missing sides and angles of one right triangle, including workplace problems.',
  outcomes: ['G1'],
  lessonId: 'm203-4-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return reviewBasic(rng);
    if (d === 2) return rng.pick([ladderSide, rampOrWire, heightTop, angleFind, angleFind, pythApplied])(rng);
    return rng.pick([solveAll, solveTwoSides, ladderSafety, rampDesign, roofPitch])(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Two right triangles
// ---------------------------------------------------------------------------

const SPLIT = 'Split the diagram into two right triangles and mark the side they share.';

function oppositeTower(rng: Rng): GenOutput {
  const [w1, w2] = rng.sample(NAMES, 2);
  const town = rng.pick(TOWNS);
  const thing = rng.pick([
    { name: `a wind turbine tower near ${town}`, short: 'tower' },
    { name: `a grain elevator near ${town}`, short: 'elevator' },
    { name: `a communications tower in ${town}`, short: 'tower' },
    { name: `a water tower in ${town}`, short: 'water tower' },
  ]);
  const v = retry(
    () => {
      const h = rng.int(20, 80);
      const a1 = rng.int(25, 65);
      const a2 = rng.int(25, 65);
      const d1 = h / tanD(a1);
      const d2 = h / tanD(a2);
      return { h, a1, a2, d1, d2, x: d1 + d2 };
    },
    (v) => Math.abs(v.a1 - v.a2) >= 4 && clear(v.x) && f1(rd2(v.d1) + rd2(v.d2)) === f1(v.x),
  );
  const { h, a1, a2, d1, d2, x } = v;
  const figure: TwoTriangleFigure = { type: 'twoTriangles', arrangement: 'opposite', labels: { h: `${h} m`, a1: `${a1}°`, a2: `${a2}°`, x: 'x' } };
  return {
    prompt: `${w1} and ${w2} stand on opposite sides of ${thing.name}, in a straight line with its base. The ${thing.short} is ${Q(h, 'm')} tall. The angle of elevation to the top is $${deg(a1)}$ from ${w1} and $${deg(a2)}$ from ${w2}. Measuring from ground level, how far apart are ${w1} and ${w2}, ${nearest('m')}?`,
    figure,
    parts: [lenPart(x, 'm', '$x =$')],
    hints: [`${SPLIT} Here they share the ${thing.short}, which is opposite the angle in each triangle.`, `In each triangle the ground distance is adjacent, so use TOA: distance $= \\dfrac{${h}}{\\tan\\theta}$. Add the two distances. ${KEEP}`],
    solution: [
      `The two right triangles share the ${thing.short}, $${qm(h, 'm')}$. In each one, the ${thing.short} is opposite the angle and the ground distance is adjacent: use TOA.`,
      `${w1}'s triangle: $\\tan ${deg(a1)} = \\dfrac{${h}}{d_1}$, so $d_1 = \\dfrac{${h}}{\\tan ${deg(a1)}} \\approx ${f2(d1)}\\ \\text{m}$`,
      `${w2}'s triangle: $d_2 = \\dfrac{${h}}{\\tan ${deg(a2)}} \\approx ${f2(d2)}\\ \\text{m}$`,
      `$x = d_1 + d_2 \\approx ${f2(d1)} + ${f2(d2)} \\approx ${f2(x)}\\ \\text{m}$`,
      `${w1} and ${w2} are about $${qm(f1(x), 'm')}$ apart.`,
    ],
  };
}

/** Two walls of an alley with one ladder leaning on each side from the same foot. */
function alleyFig(L: number, a1: number, a2: number, ask: 'width' | 'heights'): PlaneFigure {
  const p = L * cosD(a1);
  const W = p + L * cosD(a2);
  const h1 = L * sinD(a1);
  const h2 = L * sinD(a2);
  const top = Math.max(h1, h2) * 1.12;
  const F: P = [p, 0];
  const s = new Sketch()
    .line([0, 0], [0, top], 'muted')
    .line([W, 0], [W, top], 'muted')
    .line([0, 0], [W, 0], 'muted')
    .line(F, [0, h1], 'brand')
    .line(F, [W, h2], 'brand', true)
    .right([0, 0], [1, 0], [0, 1])
    .right([W, 0], [W - 1, 0], [W, 1])
    .angle(F, [0, 0], [0, h1], `${a1}°`, 22)
    .angle(F, [W, 0], [W, h2], `${a2}°`, 22)
    .side(F, [0, h1], lb(L, 'm'), [0, 0], 6)
    .side(F, [W, h2], lb(L, 'm'), [W, 0], 6);
  if (ask === 'width') s.dim([0, 0], [W, 0], 'x', [0, -14]);
  else s.dim([0, h2], [0, h1], 'x', [-12, 0]).line([0, h2], [W, h2], 'muted', true);
  return s.build(220, 200);
}

function alleyWidth(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const v = retry(
    () => {
      const L = rng.int(8, 16) / 2;
      const a1 = rng.int(55, 80);
      const a2 = rng.int(55, 80);
      const d1 = L * cosD(a1);
      const d2 = L * cosD(a2);
      return { L, a1, a2, d1, d2, x: d1 + d2 };
    },
    (v) => Math.abs(v.a1 - v.a2) >= 5 && clear(v.x) && f1(rd2(v.d1) + rd2(v.d2)) === f1(v.x),
  );
  const { L, a1, a2, d1, d2, x } = v;
  return {
    prompt: `${who} is painting in a narrow alley between two buildings in ${town}. The foot of ${an(L)} ${fmt(L)} m ladder stands on the ground between the buildings. Leaned against one wall, the ladder makes an angle of $${deg(a1)}$ with the ground. Without moving the foot, ${who} swings the ladder over to the other wall, where it makes an angle of $${deg(a2)}$ with the ground. How wide is the alley, ${nearest('m')}?`,
    figure: alleyFig(L, a1, a2, 'width'),
    parts: [lenPart(x, 'm', 'Width $x =$')],
    hints: [`${SPLIT} The ladder is the hypotenuse of both triangles.`, `In each triangle the distance from the foot to the wall is adjacent to the angle: use CAH, distance $= ${fmt(L)}\\cos\\theta$. Add the two distances.`],
    solution: [
      `The two right triangles share the foot of the ladder, and the ladder ($${qm(L, 'm')}$) is the hypotenuse of both. The ground distance to each wall is adjacent to the angle: use CAH.`,
      `First wall: $d_1 = ${fmt(L)}\\cos ${deg(a1)} \\approx ${f2(d1)}\\ \\text{m}$`,
      `Second wall: $d_2 = ${fmt(L)}\\cos ${deg(a2)} \\approx ${f2(d2)}\\ \\text{m}$`,
      `$x = d_1 + d_2 \\approx ${f2(d1)} + ${f2(d2)} \\approx ${f2(x)}\\ \\text{m}$`,
      `The alley is about $${qm(f1(x), 'm')}$ wide.`,
    ],
  };
}

const GUY_SETS: Array<[number, number[]]> = [
  [12, [5, 9, 16]],
  [15, [8, 20]],
  [16, [12, 30]],
  [20, [15, 21]],
  [24, [7, 10, 18, 32]],
  [30, [16, 40]],
  [40, [9, 30, 42]],
];

function guyFigPair(h: number, d1: number, d2: number): PlaneFigure {
  const top = h * 1.12;
  return new Sketch()
    .line([-d1 * 1.12, 0], [d2 * 1.12, 0], 'muted')
    .line([0, 0], [0, top], 'brand')
    .line([-d1, 0], [0, h], 'accent')
    .line([d2, 0], [0, h], 'accent')
    .right([0, 0], [1, 0], [0, 1])
    .right([0, 0], [-1, 0], [0, 1])
    .dot([-d1, 0])
    .dot([d2, 0])
    .dim([-d1, 0], [0, 0], lb(d1, 'm'), [0, -14])
    .dim([0, 0], [d2, 0], lb(d2, 'm'), [0, -14])
    .dim([0, 0], [0, h], lb(h, 'm'), [d2 > d1 ? 12 : -12, 0])
    .build(270, 170);
}

function guyPair(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const exact = rng.chance(0.5);
  const v = retry(
    () => {
      if (exact) {
        const [h, ds] = rng.pick(GUY_SETS);
        const [d1, d2] = rng.sample(ds, 2);
        return { h, d1, d2 };
      }
      const h = rng.int(10, 30);
      return { h, d1: rng.int(Math.ceil(h * 0.4), Math.floor(h * 1.1)), d2: rng.int(Math.ceil(h * 0.4), Math.floor(h * 1.1)) };
    },
    (v) => v.d1 !== v.d2 && (exact || (clear(Math.hypot(v.h, v.d1) + Math.hypot(v.h, v.d2)) && !isWhole(Math.hypot(v.h, v.d1) + Math.hypot(v.h, v.d2)))),
  );
  const { h, d1, d2 } = v;
  const w1 = Math.hypot(h, d1);
  const w2 = Math.hypot(h, d2);
  const total = w1 + w2;
  const [mast, short] = rng.pick([['radio mast', 'mast'], ['wind-monitoring mast', 'mast'], ['communications tower', 'tower'], ['light tower at a ball diamond', 'tower']] as const);
  const show = (w: number) => (isWhole(w) ? `= ${fmt(w)}` : `\\approx ${f2(w)}`);
  return {
    prompt: `Two guy wires hold up a ${mast} near ${town}. Both wires are attached ${Q(h, 'm')} above the ground and run to anchors on opposite sides of the base: one anchor is ${Q(d1, 'm')} from the base and the other is ${Q(d2, 'm')} from the base. What total length of wire is needed${exact ? '' : `, ${nearest('m')}`}? Ignore the extra wire needed to fasten the ends.`,
    figure: guyFigPair(h, d1, d2),
    parts: [exact ? numPart(total, { suffix: 'm', label: 'Total' }) : lenPart(total, 'm', 'Total')],
    hints: [`${SPLIT} They share the height on the ${short}, $${qm(h, 'm')}$.`, 'No angles are given, so use the Pythagorean theorem in each triangle (each wire is a hypotenuse), then add the two lengths.'],
    solution: [
      `The two right triangles share the vertical side: $${qm(h, 'm')}$ up the ${short}. Each wire is a hypotenuse.`,
      `First wire: $\\sqrt{${h}^2 + ${d1}^2} = \\sqrt{${h * h + d1 * d1}} ${show(w1)}\\ \\text{m}$`,
      `Second wire: $\\sqrt{${h}^2 + ${d2}^2} = \\sqrt{${h * h + d2 * d2}} ${show(w2)}\\ \\text{m}$`,
      exact ? `Total: $${fmt(w1)} + ${fmt(w2)} = ${fmt(total)}\\ \\text{m}$` : `Total: $${f2(w1)} + ${f2(w2)} \\approx ${f2(total)}\\ \\text{m}$`,
      `The crew needs ${exact ? '' : 'about '}$${qm(exact ? fmt(total) : f1(total), 'm')}$ of wire.`,
    ],
  };
}

function cliffBoats(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    { top: 'the top of a cliff above a mountain lake', base: 'the base of the cliff', objs: 'boats', obj: 'boat', h: [25, 80] },
    { top: 'the deck of a fire lookout tower in the foothills', base: 'the base of the tower', objs: 'campsites', obj: 'campsite', h: [20, 35] },
    { top: `the top of a grain elevator near ${rng.pick(TOWNS)}`, base: 'the base of the elevator', objs: 'grain trucks', obj: 'truck', h: [25, 40] },
    { top: 'a lookout on a cliff above a river in the badlands', base: 'the base of the cliff', objs: 'canoes', obj: 'canoe', h: [30, 90] },
  ]);
  const v = retry(
    () => {
      const h = rng.int(ctx.h[0], ctx.h[1]);
      const near = rng.int(35, 62);
      const far = rng.int(14, near - 10);
      const dn = h / tanD(near);
      const df = h / tanD(far);
      return { h, near, far, dn, df, x: df - dn };
    },
    (v) => clear(v.x) && f1(rd2(v.df) - rd2(v.dn)) === f1(v.x),
  );
  const { h, near, far, dn, df, x } = v;
  return {
    prompt: `${who} stands at ${ctx.top}, ${Q(h, 'm')} above the ground below. Two ${ctx.objs} are in a straight line out from ${ctx.base}. The angles of depression from ${who} to the ${ctx.objs} are $${deg(near)}$ and $${deg(far)}$. How far apart are the ${ctx.objs}, ${nearest('m')}?`,
    figure: { type: 'twoTriangles', arrangement: 'same', labels: { h: `${h} m`, a1: `${near}°`, a2: `${far}°`, x: 'x' } },
    parts: [lenPart(x, 'm', '$x =$')],
    hints: ['The angle of depression to each object equals the angle of elevation from that object up to you (alternate angles). Put each angle at the object.', `Both triangles share the height, $${qm(h, 'm')}$. Find each distance from the base with $\\dfrac{${h}}{\\tan\\theta}$, then subtract. ${KEEP}`],
    solution: [
      `The angle of depression to each ${ctx.obj} equals the angle of elevation from it (alternate angles). Both triangles share the height, $${qm(h, 'm')}$, which is opposite each angle.`,
      `Nearer ${ctx.obj}: $\\tan ${deg(near)} = \\dfrac{${h}}{d_1}$, so $d_1 = \\dfrac{${h}}{\\tan ${deg(near)}} \\approx ${f2(dn)}\\ \\text{m}$`,
      `Farther ${ctx.obj}: $d_2 = \\dfrac{${h}}{\\tan ${deg(far)}} \\approx ${f2(df)}\\ \\text{m}$`,
      `$x = d_2 - d_1 \\approx ${f2(df)} - ${f2(dn)} \\approx ${f2(x)}\\ \\text{m}$`,
      `The ${ctx.objs} are about $${qm(f1(x), 'm')}$ apart.`,
    ],
  };
}

function stackedPole(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const thing = rng.pick([
    { what: 'A flagpole stands on the flat roof of the town office', short: 'flagpole' },
    { what: 'A cell-phone antenna stands on the flat roof of an apartment building', short: 'antenna' },
    { what: 'A steel sign tower stands on the flat roof of a hotel', short: 'sign tower' },
  ]);
  const v = retry(
    () => {
      const dist = rng.int(20, 60);
      const a1 = rng.int(20, 40);
      const a2 = rng.int(a1 + 4, a1 + 12);
      const top = dist * tanD(a2);
      const bottom = dist * tanD(a1);
      return { dist, a1, a2, top, bottom, x: top - bottom };
    },
    (v) => clear(v.x) && f1(rd2(v.top) - rd2(v.bottom)) === f1(v.x),
  );
  const { dist, a1, a2, top, bottom, x } = v;
  return {
    prompt: `${thing.what} in ${town}. From a point on the ground ${Q(dist, 'm')} from the base of the building, the angle of elevation to the bottom of the ${thing.short} is $${deg(a1)}$ and the angle of elevation to the top of the ${thing.short} is $${deg(a2)}$. How tall is the ${thing.short}, ${nearest('m')}?`,
    figure: { type: 'twoTriangles', arrangement: 'stacked', labels: { d: `${dist} m`, a1: `${a1}°`, a2: `${a2}°`, x: 'x' } },
    parts: [lenPart(x, 'm', '$x =$')],
    hints: [`${SPLIT} Both triangles share the ground distance, $${qm(dist, 'm')}$, which is adjacent to each angle.`, `Find the height to the top and the height to the bottom with $${dist}\\tan\\theta$, then subtract. ${KEEP}`],
    solution: [
      `Both right triangles share the ground distance, $${qm(dist, 'm')}$. It is adjacent to each angle, and each height is opposite: use TOA.`,
      `Height to the top of the ${thing.short}: $${dist}\\tan ${deg(a2)} \\approx ${f2(top)}\\ \\text{m}$`,
      `Height of the building: $${dist}\\tan ${deg(a1)} \\approx ${f2(bottom)}\\ \\text{m}$`,
      `$x \\approx ${f2(top)} - ${f2(bottom)} \\approx ${f2(x)}\\ \\text{m}$`,
      `The ${thing.short} is about $${qm(f1(x), 'm')}$ tall.`,
    ],
  };
}

function alleyHeights(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const L = rng.int(8, 16) / 2;
      const a1 = rng.int(65, 82);
      const a2 = rng.int(50, a1 - 6);
      const h1 = L * sinD(a1);
      const h2 = L * sinD(a2);
      return { L, a1, a2, h1, h2, x: h1 - h2 };
    },
    (v) => clear(v.x) && v.x > 0.3 && f1(rd2(v.h1) - rd2(v.h2)) === f1(v.x),
  );
  const { L, a1, a2, h1, h2, x } = v;
  return {
    prompt: `${who} stands ${an(L)} ${fmt(L)} m ladder in a narrow alley. Leaned against one wall, it makes an angle of $${deg(a1)}$ with the ground. Without moving the foot, ${who} swings it over to the opposite wall, where it makes an angle of $${deg(a2)}$ with the ground. How much higher does the ladder reach on the first wall than on the second, ${nearest('m')}?`,
    figure: alleyFig(L, a1, a2, 'heights'),
    parts: [lenPart(x, 'm', 'Difference')],
    hints: [`${SPLIT} The ladder is the hypotenuse of both.`, `In each triangle the height on the wall is opposite the angle: use SOH, height $= ${fmt(L)}\\sin\\theta$. Subtract the heights. ${KEEP}`],
    solution: [
      `The ladder ($${qm(L, 'm')}$) is the hypotenuse of both triangles. Each height is opposite the angle at the foot: use SOH.`,
      `First wall: $h_1 = ${fmt(L)}\\sin ${deg(a1)} \\approx ${f2(h1)}\\ \\text{m}$`,
      `Second wall: $h_2 = ${fmt(L)}\\sin ${deg(a2)} \\approx ${f2(h2)}\\ \\text{m}$`,
      `$h_1 - h_2 \\approx ${f2(h1)} - ${f2(h2)} \\approx ${f2(x)}\\ \\text{m}$`,
      `The ladder reaches about $${qm(f1(x), 'm')}$ higher on the first wall.`,
    ],
  };
}

function guyAngleFig(d: number, h1: number, h2: number): PlaneFigure {
  return new Sketch()
    .line([-d * 0.15, 0], [d * 1.15, 0], 'muted')
    .line([0, 0], [0, h2 * 1.1], 'brand')
    .line([d, 0], [0, h1], 'accent')
    .line([d, 0], [0, h2], 'accent')
    .right([0, 0], [1, 0], [0, 1])
    .dot([d, 0])
    .angle([d, 0], [0, h1], [0, h2], 'θ', 34)
    .dim([0, 0], [d, 0], lb(d, 'm'), [0, -14])
    .dim([0, 0], [0, h1], lb(h1, 'm'), [-12, 0])
    .dim([0, 0], [0, h2], lb(h2, 'm'), [-26 - textW(lb(h1, 'm')), 0])
    .build(190, 190);
}

function guyAngle(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const v = retry(
    () => {
      const d = rng.int(8, 24);
      const h1 = rng.int(Math.ceil(d * 0.4), Math.floor(d * 1.0));
      const h2 = rng.int(h1 + Math.ceil(d * 0.4), h1 + Math.ceil(d * 1.2));
      const b1 = atanD(h1 / d);
      const b2 = atanD(h2 / d);
      return { d, h1, h2, b1, b2, x: b2 - b1 };
    },
    (v) => v.h2 >= v.h1 * 1.4 && clear(v.x) && f1(rd2(v.b2) - rd2(v.b1)) === f1(v.x),
  );
  const { d, h1, h2, b1, b2, x } = v;
  return {
    prompt: `Two guy wires run from the same ground anchor to a communications tower near ${town}. The anchor is ${Q(d, 'm')} from the base of the tower. One wire is attached ${Q(h1, 'm')} up the tower and the other is attached ${Q(h2, 'm')} up. What is the angle between the two wires at the anchor, ${NEAR_DEG}?`,
    figure: guyAngleFig(d, h1, h2),
    parts: [angPart(x, '$\\theta =$')],
    hints: [`${SPLIT} They share the ground distance, $${qm(d, 'm')}$, which is adjacent to the angle at the anchor.`, `Find the angle each wire makes with the ground using $\\tan^{-1}\\left(\\dfrac{\\text{height}}{${d}}\\right)$, then subtract. ${KEEP}`],
    solution: [
      `Both right triangles share the ground distance, $${qm(d, 'm')}$. In each, the height is opposite the angle at the anchor and the ground distance is adjacent: use TOA.`,
      `Lower wire: $\\tan\\alpha = \\dfrac{${h1}}{${d}}$, so $\\alpha \\approx ${f2(b1)}^\\circ$`,
      `Upper wire: $\\tan\\beta = \\dfrac{${h2}}{${d}}$, so $\\beta \\approx ${f2(b2)}^\\circ$`,
      `$\\theta = \\beta - \\alpha \\approx ${f2(b2)}^\\circ - ${f2(b1)}^\\circ \\approx ${f2(x)}^\\circ$`,
      `The angle between the wires is about $${f1(x)}^\\circ$.`,
    ],
  };
}

// --- 4.2 level 3: find the shared side first --------------------------------

const SHARED_FIRST = 'Find the shared side first: solve the triangle you know the most about.';

function cliffKnownFig(d1: number, d2: number, h: number, A1: number, A2: number, obj1: string, obj2: string): PlaneFigure {
  const T: P = [0, h];
  return new Sketch()
    .line([-d2 * 0.12, 0], [d2 * 1.06, 0], 'muted')
    .line([0, 0], T, 'brand')
    .line([-d2 * 0.12, h], T, 'brand')
    .line(T, [d2 * 1.02, h], 'muted', true)
    .line(T, [d1, 0], 'accent')
    .line(T, [d2, 0], 'accent')
    .right([0, 0], [1, 0], [0, 1])
    .angle(T, [d2, h], [d1, 0], `${A1}°`, 26)
    .angle(T, [d2, h], [d2, 0], `${A2}°`, 58)
    .dot([d1, 0])
    .dot([d2, 0])
    .text([d1, 0], obj1, 0, -13)
    .text([d2, 0], obj2, 0, -13)
    .dim([0, 0], [d1, 0], lb(d1, 'm'), [0, -30])
    .dim([d1, 0], [d2, 0], 'x', [0, -30])
    .dim([0, 0], T, 'h', [-26, 0])
    .build(280, 150);
}

function cliffKnown(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const lake = rng.pick(['Clearwater Lake', 'Silver Lake', 'Willow Lake', 'Crane Lake', 'Loon Lake']);
  const v = retry(
    () => {
      const d1 = rng.int(40, 120);
      const A1 = rng.int(25, 50);
      const A2 = rng.int(12, A1 - 8);
      const h = d1 * tanD(A1);
      const d2 = h / tanD(A2);
      return { d1, A1, A2, h, d2, x: d2 - d1 };
    },
    (v) => clear(v.x) && f1(rd2(v.h) / tanD(v.A2) - v.d1) === f1(v.x) && v.d2 < 6 * v.d1,
  );
  const { d1, A1, A2, h, d2, x } = v;
  return {
    prompt: `${who} is at the top of a cliff above ${lake}. A buoy floats ${Q(d1, 'm')} from the base of the cliff, and the angle of depression from ${who} to the buoy is $${deg(A1)}$. A boat farther out, in line with the buoy, has an angle of depression of $${deg(A2)}$. How far is the boat from the buoy, ${nearest('m')}?`,
    figure: cliffKnownFig(d1, d2, h, A1, A2, 'buoy', 'boat'),
    parts: [lenPart(x, 'm', '$x =$')],
    hints: [`${SHARED_FIRST} The two triangles share the height of the cliff, $h$. Use the buoy’s triangle: $h = ${d1}\\tan ${deg(A1)}$.`, `Then use $h$ in the boat’s triangle to find the boat’s distance from the base, and subtract $${d1}$. ${KEEP}`],
    solution: [
      `The angle of depression to each object equals the angle of elevation from it (alternate angles). The triangles share the cliff height $h$, which is not given, so find it first.`,
      `Buoy triangle (TOA): $\\tan ${deg(A1)} = \\dfrac{h}{${d1}}$, so $h = ${d1}\\tan ${deg(A1)} \\approx ${f2(h)}\\ \\text{m}$`,
      `Boat triangle (TOA): $\\tan ${deg(A2)} = \\dfrac{h}{d}$, so $d = \\dfrac{h}{\\tan ${deg(A2)}} \\approx \\dfrac{${f2(h)}}{\\tan ${deg(A2)}} \\approx ${f2(d2)}\\ \\text{m}$ from the base`,
      `$x = d - ${d1} \\approx ${f2(d2)} - ${d1} \\approx ${f2(x)}\\ \\text{m}$`,
      `The boat is about $${qm(f1(x), 'm')}$ from the buoy.`,
    ],
  };
}

function oppositeKnownFig(dA: number, dB: number, h: number, aA: number, aB: number): PlaneFigure {
  const T: P = [0, h];
  return new Sketch()
    .line([-dA * 1.06, 0], [dB * 1.06, 0], 'muted')
    .line([0, 0], [0, h], 'brand')
    .line([-dA, 0], T, 'accent')
    .line([dB, 0], T, 'accent')
    .right([0, 0], [1, 0], [0, 1])
    .angle([-dA, 0], [0, 0], T, `${aA}°`, 26)
    .angle([dB, 0], [0, 0], T, `${aB}°`, 26)
    .dot([-dA, 0])
    .dot([dB, 0])
    .text([-dA, 0], 'A', -12, 0)
    .text([dB, 0], 'B', 12, 0)
    .dim([-dA, 0], [0, 0], lb(dA, 'm'), [0, -14])
    .dim([-dA, 0], [dB, 0], 'x', [0, -50])
    .text([0, h / 2], 'h', 10, 0)
    .build(280, 150);
}

function oppositeKnown(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const thing = rng.pick(['communications tower', 'grain elevator', 'wind turbine tower', 'ski jump tower']);
  const v = retry(
    () => {
      const dA = rng.int(25, 70);
      const aA = rng.int(35, 60);
      const aB = rng.int(25, 60);
      const h = dA * tanD(aA);
      const dB = h / tanD(aB);
      return { dA, aA, aB, h, dB, x: dA + dB };
    },
    (v) => Math.abs(v.aA - v.aB) >= 4 && clear(v.x) && f1(v.dA + rd2(v.h) / tanD(v.aB)) === f1(v.x),
  );
  const { dA, aA, aB, h, dB, x } = v;
  return {
    prompt: `Points A and B are on level ground on opposite sides of a ${thing} near ${town}, in a straight line with its base. A is ${Q(dA, 'm')} from the base. The angle of elevation to the top of the ${thing} is $${deg(aA)}$ from A and $${deg(aB)}$ from B. How far apart are A and B, ${nearest('m')}?`,
    figure: oppositeKnownFig(dA, dB, h, aA, aB),
    parts: [lenPart(x, 'm', '$x =$')],
    hints: [`${SHARED_FIRST} The triangles share the height $h$. From A you know an angle and the adjacent side: $h = ${dA}\\tan ${deg(aA)}$.`, `Then in B’s triangle, the distance from B to the base is $\\dfrac{h}{\\tan ${deg(aB)}}$. Add the two distances. ${KEEP}`],
    solution: [
      `The two triangles share the height $h$ of the ${thing}. It is not given, so find it first from A's triangle, where you know an angle and a side.`,
      `A's triangle (TOA): $\\tan ${deg(aA)} = \\dfrac{h}{${dA}}$, so $h = ${dA}\\tan ${deg(aA)} \\approx ${f2(h)}\\ \\text{m}$`,
      `B's triangle (TOA): $\\tan ${deg(aB)} = \\dfrac{h}{d_B}$, so $d_B = \\dfrac{h}{\\tan ${deg(aB)}} \\approx ${f2(dB)}\\ \\text{m}$`,
      `$x = ${dA} + d_B \\approx ${dA} + ${f2(dB)} \\approx ${f2(x)}\\ \\text{m}$`,
      `A and B are about $${qm(f1(x), 'm')}$ apart.`,
    ],
  };
}

function ladderSlideFig(L: number, a: number, m: number): PlaneFigure {
  const d1 = L * cosD(a);
  const h1 = L * sinD(a);
  // A small pull is drawn a little larger so the second position is visible.
  const d2 = d1 + Math.max(m, L * 0.12);
  const h2 = Math.sqrt(L * L - d2 * d2);
  return new Sketch()
    .line([0, 0], [0, h1 * 1.1], 'muted')
    .line([0, 0], [d2 * 1.4, 0], 'muted')
    .line([d1, 0], [0, h1], 'brand')
    .line([d2, 0], [0, h2], 'accent', true)
    .right([0, 0], [1, 0], [0, 1])
    .angle([d1, 0], [0, 0], [0, h1], `${a}°`, 22)
    .side([d1, 0], [0, h1], lb(L, 'm'), [d1, h1], 6)
    .dim([d1, 0], [d2, 0], lb(m, 'm'), [0, -14])
    .dim([0, h2], [0, h1], '?', [-12, 0])
    .build(150, 200);
}

function ladderSlide(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const L = rng.int(10, 18) / 2;
      const a = rng.int(70, 80);
      const m = rng.pick([0.3, 0.4, 0.5, 0.6, 0.8, 1]);
      const d1 = L * cosD(a);
      const h1 = L * sinD(a);
      const d2 = d1 + m;
      const h2 = Math.sqrt(L * L - d2 * d2);
      const cm = (h1 - h2) * 100;
      const shown = (Number(fx(h1, 3)) - Math.sqrt(L * L - (Number(fx(d1, 3)) + m) ** 2)) * 100;
      return { L, a, m, d1, h1, d2, h2, cm, shown };
    },
    (v) => clear(v.cm, 0, 0.2) && fx(v.shown, 0) === fx(v.cm, 0) && v.cm >= 5,
  );
  const { L, a, m, d1, h1, d2, h2, cm } = v;
  return {
    prompt: `${cap(an(L))} ${fmt(L)} m ladder leans against a wall and makes an angle of $${deg(a)}$ with the ground. ${who} pulls the foot of the ladder ${Q(m, 'm')} farther away from the wall, and the top slides down the wall. How far does the top of the ladder slide down, to the nearest centimetre?`,
    figure: ladderSlideFig(L, a, m),
    parts: [numPart(cm, { decimals: 0, suffix: 'cm', label: 'Slide' })],
    hints: [`${SHARED_FIRST} In the first position you know the angle and the ladder (hypotenuse): find the height $h_1 = ${fmt(L)}\\sin ${deg(a)}$ and the foot distance $d_1 = ${fmt(L)}\\cos ${deg(a)}$.`, `In the second position the foot is $d_1 + ${fmt(m)}$ from the wall and the ladder is still $${fmt(L)}$ m long: use the Pythagorean theorem for the new height. Subtract. ${KEEP}`],
    solution: [
      `The two triangles share the ladder (the hypotenuse, $${qm(L, 'm')}$) and the wall. Start with the first position, where you know the angle.`,
      `First position: $h_1 = ${fmt(L)}\\sin ${deg(a)} \\approx ${fx(h1, 3)}\\ \\text{m}$ and $d_1 = ${fmt(L)}\\cos ${deg(a)} \\approx ${fx(d1, 3)}\\ \\text{m}$`,
      `Second position: the foot is $${fx(d1, 3)} + ${fmt(m)} \\approx ${fx(d2, 3)}\\ \\text{m}$ from the wall, so $h_2 = \\sqrt{${fmt(L)}^2 - ${fx(d2, 3)}^2} \\approx ${fx(h2, 3)}\\ \\text{m}$`,
      `Slide: $h_1 - h_2 \\approx ${fx(h1, 3)} - ${fx(h2, 3)} \\approx ${fx(h1 - h2, 3)}\\ \\text{m}$, which is about $${fx(cm, 1)}\\ \\text{cm}$`,
      `The top of the ladder slides down about $${fx(cm, 0)}\\ \\text{cm}$.`,
    ],
  };
}

function guySecondFig(L1: number, a: number, k: number, askAngle: boolean): PlaneFigure {
  const d = L1 * cosD(a);
  const h = L1 * sinD(a);
  const s = new Sketch()
    .line([-d * 0.15, 0], [d * 1.15, 0], 'muted')
    .line([0, 0], [0, h * 1.06], 'brand')
    .line([d, 0], [0, h], 'accent')
    .line([d, 0], [0, h - k], 'accent', true)
    .right([0, 0], [1, 0], [0, 1])
    .dot([d, 0])
    .angle([d, 0], [0, 0], [0, h], `${a}°`, askAngle ? 52 : 26)
    .side([d, 0], [0, h], lb(L1, 'm'), [0, 0], 6)
    .dim([0, h - k], [0, h], lb(k, 'm'), [-12, 0]);
  if (askAngle) s.angle([d, 0], [0, 0], [0, h - k], 'θ', 26);
  else s.side([d, 0], [0, h - k], '?', [0, h], 4);
  return s.build(200, 190);
}

function guySecond(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const askAngle = rng.chance(0.45);
  const v = retry(
    () => {
      const L1 = rng.int(15, 40);
      const a = rng.int(50, 68);
      const k = rng.int(3, 9);
      const d = L1 * cosD(a);
      const h = L1 * sinD(a);
      const w2 = Math.hypot(d, h - k);
      const b = atanD((h - k) / d);
      const w2s = Math.hypot(rd2(d), rd2(h) - k);
      const bs = atanD((rd2(h) - k) / rd2(d));
      return { L1, a, k, d, h, w2, b, ok: askAngle ? clear(b) && f1(bs) === f1(b) : clear(w2) && f1(w2s) === f1(w2) };
    },
    (v) => v.ok && v.h - v.k > v.h * 0.55,
  );
  const { L1, a, k, d, h, w2, b } = v;
  return {
    prompt: `A guy wire ${Q(L1, 'm')} long runs from the top of a radio tower near ${town} to an anchor in the ground, and makes an angle of $${deg(a)}$ with the ground. A second wire runs from the same anchor to a point on the tower ${Q(k, 'm')} below the top. ${askAngle ? `What angle does the second wire make with the ground, ${NEAR_DEG}?` : `How long is the second wire, ${nearest('m')}?`}`,
    figure: guySecondFig(L1, a, k, askAngle),
    parts: [askAngle ? angPart(b, '$\\theta =$') : lenPart(w2, 'm', 'Second wire')],
    hints: [`${SHARED_FIRST} From the first wire (the hypotenuse) and its angle, find the tower height $h = ${L1}\\sin ${deg(a)}$ and the anchor distance $d = ${L1}\\cos ${deg(a)}$.`, `The second wire’s triangle shares $d$ and has height $h - ${k}$. ${askAngle ? 'Use $\\tan^{-1}$.' : 'Use the Pythagorean theorem.'} ${KEEP}`],
    solution: [
      `The two triangles share the ground distance $d$ from the anchor to the tower. Find it, and the tower height, from the first wire.`,
      `First wire (SOH and CAH): $h = ${L1}\\sin ${deg(a)} \\approx ${f2(h)}\\ \\text{m}$ and $d = ${L1}\\cos ${deg(a)} \\approx ${f2(d)}\\ \\text{m}$`,
      `The second wire is attached at $${f2(h)} - ${k} \\approx ${f2(h - k)}\\ \\text{m}$ above the ground.`,
      askAngle
        ? `Second wire (TOA): $\\tan\\theta = \\dfrac{${f2(h - k)}}{${f2(d)}}$, so $\\theta \\approx ${f2(b)}^\\circ$`
        : `Second wire (Pythagorean theorem): $\\sqrt{${f2(d)}^2 + ${f2(h - k)}^2} \\approx ${f2(w2)}\\ \\text{m}$`,
      askAngle ? `The second wire makes an angle of about $${f1(b)}^\\circ$ with the ground.` : `The second wire is about $${qm(f1(w2), 'm')}$ long.`,
    ],
  };
}

function flagAngle(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const v = retry(
    () => {
      const dist = rng.int(25, 60);
      const a1 = rng.int(20, 45);
      const x = rng.int(4, 12);
      const H = dist * tanD(a1);
      const th = atanD((H + x) / dist);
      return { dist, a1, x, H, th };
    },
    (v) => clear(v.th) && f1(atanD((rd2(v.H) + v.x) / v.dist)) === f1(v.th) && v.th - v.a1 >= 3,
  );
  const { dist, a1, x, H, th } = v;
  return {
    prompt: `${cap(an(x))} ${x} m flagpole stands on the flat roof of a school in ${town}. From a point on the ground ${Q(dist, 'm')} from the base of the school, the angle of elevation to the top of the roof (the bottom of the flagpole) is $${deg(a1)}$. What is the angle of elevation from the same point to the top of the flagpole, ${NEAR_DEG}?`,
    figure: { type: 'twoTriangles', arrangement: 'stacked', labels: { d: `${dist} m`, a1: `${a1}°`, a2: 'θ', x: `${x} m` } },
    parts: [angPart(th, '$\\theta =$')],
    hints: [`${SHARED_FIRST} Use the lower triangle to find the height of the school: $H = ${dist}\\tan ${deg(a1)}$.`, `The top of the flagpole is $H + ${x}$ above the ground. In the larger triangle, $\\tan\\theta = \\dfrac{H + ${x}}{${dist}}$. ${KEEP}`],
    solution: [
      `Both triangles share the ground distance, $${qm(dist, 'm')}$. The height of the school is not given, so find it first.`,
      `Lower triangle (TOA): $H = ${dist}\\tan ${deg(a1)} \\approx ${f2(H)}\\ \\text{m}$`,
      `The top of the flagpole is $${f2(H)} + ${x} \\approx ${f2(H + x)}\\ \\text{m}$ above the ground.`,
      `Larger triangle (TOA): $\\tan\\theta = \\dfrac{${f2(H + x)}}{${dist}}$, so $\\theta = \\tan^{-1}\\left(\\dfrac{${f2(H + x)}}{${dist}}\\right) \\approx ${f2(th)}^\\circ$`,
      `The angle of elevation to the top of the flagpole is about $${f1(th)}^\\circ$.`,
    ],
  };
}

const twoTriangles = skill({
  id: 'm203-two-triangles',
  name: 'Problems with two right triangles',
  description: 'Solve problems with two right triangles that share a side, such as angles of elevation and depression from two points, ladders, guy wires and towers.',
  outcomes: ['G1'],
  lessonId: 'm203-4-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.pick([oppositeTower, oppositeTower, alleyWidth, guyPair])(rng);
    if (d === 2) return rng.pick([cliffBoats, cliffBoats, stackedPole, alleyHeights, guyAngle])(rng);
    return rng.pick([cliffKnown, oppositeKnown, ladderSlide, guySecond, flagAngle])(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Three right triangles
// ---------------------------------------------------------------------------

/** An oblique sketch of a box with the floor diagonal and the long (space) diagonal. */
function boxFig(l: number, w: number, h: number, u: string, labels: { floor: string; space: string }, angle?: string): PlaneFigure {
  const k = 0.5;
  const dv: P = [w * k * cosD(30), w * k * sinD(30)];
  const o = (p: P): P => [p[0] + dv[0], p[1] + dv[1]];
  const A: P = [0, 0];
  const B: P = [l, 0];
  const C: P = [l, h];
  const D: P = [0, h];
  const G = o(C);
  const Fb = o(B);
  const s = new Sketch()
    .path([A, B, C, D, A], 'brand')
    .path([D, o(D), G, C], 'brand')
    .path([B, Fb, G], 'brand')
    .line(A, o(A), 'muted', true)
    .line(o(A), o(D), 'muted', true)
    .line(o(A), Fb, 'muted', true)
    .line(A, Fb, 'accent', true)
    .line(A, G, 'accent')
    .right(Fb, A, G)
    .side(A, B, lb(l, u), D, 6)
    .side(B, Fb, lb(w, u), A, 6)
    .side(A, D, lb(h, u), B, 6)
    .side(A, G, labels.space, D, 4)
    .side(A, Fb, labels.floor, B, 3);
  if (angle) s.angle(A, Fb, G, angle, 30);
  return s.build(250, 190);
}

interface BoxCtx {
  u: Unit;
  dp: number;
  l: number;
  w: number;
  h: number;
  what: string;
  pole: string;
}

function boxCtx(rng: Rng, exact: boolean): BoxCtx {
  const who = rng.pick(NAMES);
  const kind = rng.pick(['van', 'shed', 'box'] as const);
  if (exact) {
    const [l, w, h, u] = rng.pick([
      [12, 9, 8, 'ft'],
      [60, 45, 40, 'cm'],
      [120, 90, 80, 'cm'],
      [48, 36, 25, 'cm'],
      [24, 18, 16, 'in'],
    ] as Array<[number, number, number, Unit]>);
    const what = u === 'ft' ? `${who}'s storage shed is` : u === 'in' ? 'A toolbox in the back of a pickup is' : 'A wooden shipping crate is';
    return { u, dp: 1, l, w, h, what: `${what} ${'%L%'} long, ${'%W%'} wide and ${'%H%'} high inside.`, pole: u === 'ft' ? 'a straight length of pipe' : 'a straight steel rod' };
  }
  if (kind === 'van') {
    return { u: 'm', dp: 2, l: rng.int(30, 48) / 10, w: rng.int(17, 23) / 10, h: rng.int(17, 22) / 10, what: `The cargo area of a cube van that ${who} rents in ${rng.pick(TOWNS)} is a box ${'%L%'} long, ${'%W%'} wide and ${'%H%'} high.`, pole: 'a length of PVC pipe' };
  }
  if (kind === 'shed') {
    return { u: 'ft', dp: 1, l: rng.int(8, 16), w: rng.int(6, 10), h: rng.int(7, 9), what: `${who}'s storage shed is ${'%L%'} long, ${'%W%'} wide and ${'%H%'} high inside.`, pole: 'a straight length of pipe' };
  }
  return { u: 'cm', dp: 1, l: rng.int(60, 150), w: rng.int(30, 80), h: rng.int(30, 80), what: `A shipping crate is ${'%L%'} long, ${'%W%'} wide and ${'%H%'} high inside.`, pole: 'a straight steel rod' };
}

const fillBox = (c: BoxCtx) => c.what.replace('%L%', Q(c.l, c.u)).replace('%W%', Q(c.w, c.u)).replace('%H%', Q(c.h, c.u));

function boxDiag(rng: Rng): GenOutput {
  const exact = rng.chance(0.35);
  const c = retry(
    () => boxCtx(rng, exact),
    (c) => c.w < c.l && (exact || (clear(Math.hypot(c.l, c.w), c.dp) && clear(Math.hypot(c.l, c.w, c.h), c.dp) && fx(Math.hypot(rd2(Math.hypot(c.l, c.w)), c.h), c.dp) === fx(Math.hypot(c.l, c.w, c.h), c.dp))),
  );
  const { u, dp, l, w, h } = c;
  const fd = Math.hypot(l, w);
  const sd = Math.hypot(l, w, h);
  const ex = (v: number) => isWhole(v);
  const round = exact ? '' : ` Round each answer ${nearest(u, dp)}.`;
  const pf = (v: number, label: string) => (ex(v) ? numPart(v, { suffix: u, label }) : lenPart(v, u, label, dp));
  const show = (v: number) => (ex(v) ? `= ${fmt(v)}` : `\\approx ${fx(v, dp + 1)}`);
  return {
    prompt: `${fillBox(c)}\n\n(a) How long is the diagonal of the floor, from one corner to the opposite corner?\n\n(b) What is the longest piece of ${c.pole.replace(/^a (straight )?(length of |piece of )?/, '')} that fits inside, running from a bottom corner to the opposite top corner?${round}`,
    figure: boxFig(l, w, h, u, { floor: 'd', space: 'p' }),
    parts: [pf(fd, '(a) $d =$'), pf(sd, '(b) $p =$')],
    hints: ['The floor diagonal $d$ is the hypotenuse of a right triangle on the floor, with legs equal to the length and the width.', 'The long diagonal $p$ is the hypotenuse of a standing right triangle with legs $d$ and the height. Use the Pythagorean theorem twice.'],
    solution: [
      `(a) Floor triangle: $d^2 = ${fmt(l)}^2 + ${fmt(w)}^2 = ${fmt(sq(l) + sq(w))}$, so $d = \\sqrt{${fmt(sq(l) + sq(w))}} ${show(fd)}\\ \\text{${u}}$`,
      `(b) The standing triangle has legs $d$ and the height, $${qm(h, u)}$. Use $d^2$ from part (a) so nothing is rounded: $p^2 = ${fmt(sq(l) + sq(w))} + ${fmt(h)}^2 = ${fmt(sq(l) + sq(w) + sq(h))}$`,
      `$p = \\sqrt{${fmt(sq(l) + sq(w) + sq(h))}} ${show(sd)}\\ \\text{${u}}$`,
      `(a) ${ex(fd) ? '' : 'about '}$${qm(ex(fd) ? fmt(fd) : fx(fd, dp), u)}$; (b) ${ex(sd) ? '' : 'about '}$${qm(ex(sd) ? fmt(sd) : fx(sd, dp), u)}$.`,
    ],
  };
}

/** Two flights of stairs with a landing between them. */
function stairsFig(n1: number, n2: number, r: number, t: number, G: number, mode: 'pyth' | 'trig' | 'angle', labels: { T1?: string; R1?: string; T2?: string; R2?: string; G: string }): PlaneFigure {
  const T1 = n1 * t;
  const R1 = n1 * r;
  const T2 = n2 * t;
  const R2 = n2 * r;
  const X2 = T1 + G;
  const end: P = [X2 + T2, R1 + R2];
  const pts: P[] = [[-t * 0.8, 0], [0, 0]];
  for (let i = 0; i < n1; i++) pts.push([i * t, (i + 1) * r], [(i + 1) * t, (i + 1) * r]);
  pts.push([X2, R1]);
  for (let i = 0; i < n2; i++) pts.push([X2 + i * t, R1 + (i + 1) * r], [X2 + (i + 1) * t, R1 + (i + 1) * r]);
  pts.push([end[0] + t * 0.8, end[1]]);
  const s = new Sketch().path(pts, 'brand').line([0, 0], [T1, R1], 'accent', true).line([X2, R1], end, 'accent', true);
  if (mode !== 'trig') s.line([0, 0], end, 'muted', true);
  if (mode === 'angle') s.angle([0, 0], [end[0], 0], end, 'θ', 34);
  if (labels.T1) s.dim([0, 0], [T1, 0], labels.T1, [0, -14]);
  s.dim([T1, R1], [X2, R1], labels.G, [0, 14]);
  if (labels.T2) s.dim([X2, R1], [end[0], R1], labels.T2, [0, -14]);
  if (labels.R1) s.dim([end[0] + t * 0.8, 0], [end[0] + t * 0.8, R1], labels.R1, [14, 0]);
  if (labels.R2) s.dim([end[0] + t * 0.8, R1], [end[0] + t * 0.8, end[1]], labels.R2, [14, 0]);
  return s.build(260, 160);
}

function stairsPyth(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const r = rng.int(17, 19);
      const t = rng.int(25, 28);
      const n1 = rng.int(5, 8);
      const n2 = rng.int(4, 7);
      const G = rng.int(9, 12) * 10;
      const R1 = n1 * r;
      const T1 = n1 * t;
      const R2 = n2 * r;
      const T2 = n2 * t;
      const L1 = Math.hypot(R1, T1);
      const L2 = Math.hypot(R2, T2);
      const S = Math.hypot(R1 + R2, T1 + G + T2);
      return { r, t, n1, n2, G, R1, T1, R2, T2, L1, L2, S, tot: L1 + L2 };
    },
    (v) => v.n1 !== v.n2 && clear(v.tot, 0, 0.2) && clear(v.S, 0, 0.2) && fx(rd2(v.L1) + rd2(v.L2), 0) === fx(v.tot, 0),
  );
  const { r, t, n1, n2, G, R1, T1, R2, T2, L1, L2, S, tot } = v;
  return {
    prompt: `${who} is building stairs with a landing in a split-level house. The first flight rises ${Q(R1, 'cm')} over a horizontal run of ${Q(T1, 'cm')}. Then there is a landing ${Q(G, 'cm')} long. The second flight rises ${Q(R2, 'cm')} over a run of ${Q(T2, 'cm')}.\n\n(a) A stringer (the sloped board under the steps) runs along each flight from its bottom to its top. What is the total length of the two stringers on one side of the stairs, to the nearest centimetre?\n\n(b) How far is it in a straight line from the bottom of the stairs to the top, to the nearest centimetre?`,
    figure: stairsFig(n1, n2, r, t, G, 'pyth', { T1: lb(T1, 'cm'), R1: lb(R1, 'cm'), T2: lb(T2, 'cm'), R2: lb(R2, 'cm'), G: lb(G, 'cm') }),
    parts: [numPart(tot, { decimals: 0, suffix: 'cm', label: '(a) Stringers' }), numPart(S, { decimals: 0, suffix: 'cm', label: '(b) Straight line' })],
    hints: ['Each flight is a right triangle: its rise and run are the legs and its stringer is the hypotenuse.', 'For (b), make a third, large right triangle: the total rise and the total run (both flights plus the landing) are its legs.'],
    solution: [
      `Flight 1: $L_1 = \\sqrt{${R1}^2 + ${T1}^2} = \\sqrt{${R1 * R1 + T1 * T1}} \\approx ${f2(L1)}\\ \\text{cm}$`,
      `Flight 2: $L_2 = \\sqrt{${R2}^2 + ${T2}^2} = \\sqrt{${R2 * R2 + T2 * T2}} \\approx ${f2(L2)}\\ \\text{cm}$`,
      `(a) $L_1 + L_2 \\approx ${f2(L1)} + ${f2(L2)} \\approx ${f2(tot)}\\ \\text{cm}$`,
      `(b) Large triangle: total rise $${R1} + ${R2} = ${R1 + R2}$ cm and total run $${T1} + ${G} + ${T2} = ${T1 + G + T2}$ cm, so the distance is $\\sqrt{${R1 + R2}^2 + ${T1 + G + T2}^2} \\approx ${f2(S)}\\ \\text{cm}$`,
      `(a) about $${qm(fx(tot, 0), 'cm')}$; (b) about $${qm(fx(S, 0), 'cm')}$.`,
    ],
  };
}

/** A roof truss: rafters, bottom chord, king post, vertical webs at one-third of the span and diagonal webs to the king post. */
function trussFig(S: number, h: number, labels: { span?: string; h?: string; v?: string; angle?: string; rafter?: string; diag?: string }): PlaneFigure {
  const v = (2 * h) / 3;
  const M: P = [S / 2, 0];
  const top: P = [S / 2, h];
  const Q1: P = [S / 3, 0];
  const V1: P = [S / 3, v];
  const Q2: P = [(2 * S) / 3, 0];
  const V2: P = [(2 * S) / 3, v];
  const s = new Sketch()
    .path([[0, 0], top, [S, 0], [0, 0]], 'brand')
    .line(M, top, 'accent')
    .line(Q1, V1, 'accent')
    .line(Q2, V2, 'accent')
    .line(V1, M, 'accent')
    .line(V2, M, 'accent');
  if (labels.span) s.dim([0, 0], [S, 0], labels.span, [0, -14]);
  if (labels.angle) s.angle([0, 0], [S, 0], top, labels.angle, 30);
  if (labels.h) s.text([S / 2, h * 0.62], labels.h, textW(labels.h) / 2 + 7, 0);
  if (labels.v) s.text([S / 3, v * 0.5], labels.v, -textW(labels.v) / 2 - 7, 0);
  if (labels.rafter) s.side([0, 0], top, labels.rafter, [S / 2, 0], 6);
  if (labels.diag) s.side(V1, M, labels.diag, Q1, 5);
  return s.build(290, 150);
}

const TRUSS_WORDS = 'The truss has a horizontal bottom chord, two sloped top chords (rafters) that meet at the peak, a vertical king post in the centre, two vertical webs one-third of the span in from each end, and two diagonal webs from the top of each vertical web down to the foot of the king post.';

function trussPyth(rng: Rng): GenOutput {
  const v0 = retry(
    () => {
      const S = rng.pick([18, 21, 24, 27, 30, 33, 36]);
      const h = rng.pick([4.5, 6, 7.5, 9]);
      const v = (2 * h) / 3;
      const raf = Math.hypot(S / 2, h);
      const dg = Math.hypot(S / 6, v);
      return { S, h, v, raf, dg };
    },
    (x) => (isWhole(x.raf) || clear(x.raf)) && (isWhole(x.dg) || clear(x.dg)) && x.h / (x.S / 2) < 0.8 && x.h / (x.S / 2) > 0.25,
  );
  const { S, h, v, raf, dg } = v0;
  const town = rng.pick(TOWNS);
  const p = (x: number, label: string) => (isWhole(x) ? numPart(x, { suffix: 'ft', label }) : lenPart(x, 'ft', label));
  const show = (x: number) => (isWhole(x) ? `= ${fmt(x)}` : `\\approx ${f2(x)}`);
  return {
    prompt: `A lumber yard in ${town} is building a roof truss that spans ${Q(S, 'ft')}. ${TRUSS_WORDS} The king post is ${Q(h, 'ft')} tall and each vertical web is ${Q(v, 'ft')} tall.\n\n(a) How long is one rafter, from the end of the truss to the peak?\n\n(b) How long is one diagonal web?\n\nRound to the nearest tenth of a foot where needed.`,
    figure: trussFig(S, h, { span: lb(S, 'ft'), h: lb(h, 'ft'), v: lb(v, 'ft'), rafter: 'r', diag: 'w' }),
    parts: [p(raf, '(a) $r =$'), p(dg, '(b) $w =$')],
    hints: ['Find the right triangles. The king post splits the truss into two right triangles: half the span and the king post are the legs of the rafter’s triangle.', `For the diagonal web, its triangle has the vertical web as one leg and the distance from the vertical web to the king post, $\\dfrac{${S}}{2} - \\dfrac{${S}}{3}$, as the other leg.`],
    solution: [
      `(a) Rafter triangle: legs are half the span, $${S} \\div 2 = ${fmt(S / 2)}$ ft, and the king post, $${fmt(h)}$ ft. $r = \\sqrt{${fmt(S / 2)}^2 + ${fmt(h)}^2} = \\sqrt{${fmt(sq(S / 2) + sq(h))}} ${show(raf)}\\ \\text{ft}$`,
      `(b) The vertical web is $${S} \\div 3 = ${fmt(S / 3)}$ ft from the end and the king post is $${fmt(S / 2)}$ ft from the end, so they are $${fmt(S / 2)} - ${fmt(S / 3)} = ${fmt(S / 6)}$ ft apart.`,
      `Diagonal web triangle: legs $${fmt(S / 6)}$ ft and $${fmt(v)}$ ft. $w = \\sqrt{${fmt(S / 6)}^2 + ${fmt(v)}^2} = \\sqrt{${fmt(sq(S / 6) + sq(v))}} ${show(dg)}\\ \\text{ft}$`,
      `(a) ${isWhole(raf) ? '' : 'about '}$${qm(isWhole(raf) ? fmt(raf) : f1(raf), 'ft')}$; (b) ${isWhole(dg) ? '' : 'about '}$${qm(isWhole(dg) ? fmt(dg) : f1(dg), 'ft')}$.`,
    ],
  };
}

function survey3Fig(h: number, ds: [number, number, number], angs: [number, number, number], ask: 'gaps'): PlaneFigure {
  const T: P = [0, h];
  const [dP, dQ, dR] = ds;
  const s = new Sketch()
    .line([-dR * 0.06, 0], [dR * 1.05, 0], 'muted')
    .line([0, 0], T, 'brand')
    .line([dP, 0], T, 'accent')
    .line([dQ, 0], T, 'accent')
    .line([dR, 0], T, 'accent')
    .right([0, 0], [1, 0], [0, 1])
    .dot([dP, 0])
    .dot([dQ, 0])
    .dot([dR, 0])
    .angle([dP, 0], [0, 0], T, `${angs[0]}°`, 20)
    .angle([dQ, 0], [0, 0], T, `${angs[1]}°`, 20)
    .angle([dR, 0], [0, 0], T, `${angs[2]}°`, 20)
    .text([dP, 0], 'P', 0, -12)
    .text([dQ, 0], 'Q', 0, -12)
    .text([dR, 0], 'R', 0, -12)
    .dim([0, 0], T, lb(h, 'm'), [-12, 0]);
  if (ask === 'gaps') s.dim([dP, 0], [dQ, 0], 'x', [0, -28]).dim([dQ, 0], [dR, 0], 'y', [0, -28]);
  return s.build(290, 150);
}

function survey3(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const v = retry(
    () => {
      const h = rng.int(40, 90);
      const aP = rng.int(48, 66);
      const aQ = rng.int(30, aP - 8);
      const aR = rng.int(16, aQ - 6);
      const [dP, dQ, dR] = [aP, aQ, aR].map((a) => h / tanD(a));
      return { h, aP, aQ, aR, dP, dQ, dR, x: dQ - dP, y: dR - dQ };
    },
    (v) => clear(v.x) && clear(v.y) && f1(rd2(v.dQ) - rd2(v.dP)) === f1(v.x) && f1(rd2(v.dR) - rd2(v.dQ)) === f1(v.y) && v.dR < 5 * v.dP && v.x > 0.15 * v.dR && v.y > 0.15 * v.dR,
  );
  const { h, aP, aQ, aR, dP, dQ, dR, x, y } = v;
  return {
    prompt: `${who} is a survey technician near ${town}. Stakes P, Q and R are in a straight line on level ground, going away from the base of ${an(h)} ${h} m communications tower. From each stake, ${who} sights the top of the tower and measures the angle of elevation: $${deg(aP)}$ from P, $${deg(aQ)}$ from Q and $${deg(aR)}$ from R. (Measure from ground level.)\n\n(a) How far apart are P and Q?\n\n(b) How far apart are Q and R?\n\nRound each answer ${nearest('m')}.`,
    figure: survey3Fig(h, [dP, dQ, dR], [aP, aQ, aR], 'gaps'),
    parts: [lenPart(x, 'm', '(a) $x =$'), lenPart(y, 'm', '(b) $y =$')],
    hints: [`There are three right triangles, one for each sighting. They all share the tower, $${qm(h, 'm')}$, which is opposite each angle.`, `Find each stake’s distance from the base with $\\dfrac{${h}}{\\tan\\theta}$, then subtract neighbouring distances. ${KEEP}`],
    solution: [
      `All three triangles share the tower, $${qm(h, 'm')}$. It is opposite each angle, and the distance from each stake to the base is adjacent: use TOA.`,
      `P: $\\dfrac{${h}}{\\tan ${deg(aP)}} \\approx ${f2(dP)}\\ \\text{m}$; Q: $\\dfrac{${h}}{\\tan ${deg(aQ)}} \\approx ${f2(dQ)}\\ \\text{m}$; R: $\\dfrac{${h}}{\\tan ${deg(aR)}} \\approx ${f2(dR)}\\ \\text{m}$`,
      `(a) $x \\approx ${f2(dQ)} - ${f2(dP)} \\approx ${f2(x)}\\ \\text{m}$`,
      `(b) $y \\approx ${f2(dR)} - ${f2(dQ)} \\approx ${f2(y)}\\ \\text{m}$`,
      `(a) P and Q are about $${qm(f1(x), 'm')}$ apart; (b) Q and R are about $${qm(f1(y), 'm')}$ apart.`,
    ],
  };
}

function trussTrig(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const metric = rng.chance(0.5);
  const u: Unit = metric ? 'm' : 'ft';
  const v0 = retry(
    () => {
      const S = metric ? rng.pick([6, 7.2, 8.4, 9, 9.6, 10.8, 12]) : rng.pick([24, 27, 30, 33, 36]);
      const th = rng.int(18, 35);
      const h = (S / 2) * tanD(th);
      const v = (S / 3) * tanD(th);
      const dg = Math.hypot(S / 6, v);
      const dgShown = Math.hypot(S / 6, rd2(v));
      return { S, th, h, v, dg, dgShown };
    },
    (x) => clear(x.h) && clear(x.dg) && f1(x.dgShown) === f1(x.dg) && f1((x.S / 2) * Number(r4(tanD(x.th)))) === f1(x.h),
  );
  const { S, th, h, v, dg } = v0;
  return {
    prompt: `A roof truss for a garage in ${town} spans ${Q(S, u)}, and each rafter makes an angle of $${deg(th)}$ with the bottom chord. ${TRUSS_WORDS}\n\n(a) How tall is the king post?\n\n(b) How long is one diagonal web?\n\nRound each answer ${nearest(u)}.`,
    figure: trussFig(S, h, { span: lb(S, u), angle: `${th}°`, h: 'k', diag: 'w' }),
    parts: [lenPart(h, u, '(a) $k =$'), lenPart(dg, u, '(b) $w =$')],
    hints: [`Triangle 1 (half the truss): the king post is opposite the $${deg(th)}$ angle and half the span is adjacent. Use TOA.`, `Triangle 2: the vertical web is $\\dfrac{${fmt(S)}}{3}$ from the end, so its height is $\\dfrac{${fmt(S)}}{3}\\tan ${deg(th)}$. Triangle 3: the diagonal web is the hypotenuse, with that height and the gap to the king post as legs. ${KEEP}`],
    solution: [
      `(a) Triangle 1: half the span is $${fmt(S)} \\div 2 = ${fmt(S / 2)}$ ${u}. $\\tan ${deg(th)} = \\dfrac{k}{${fmt(S / 2)}}$, so $k = ${fmt(S / 2)}\\tan ${deg(th)} \\approx ${f2(h)}\\ \\text{${u}}$`,
      `(b) Triangle 2: the vertical web stands $${fmt(S)} \\div 3 = ${fmt(S / 3)}$ ${u} from the end, under the rafter. Its height is $${fmt(S / 3)}\\tan ${deg(th)} \\approx ${f2(v)}\\ \\text{${u}}$`,
      `Triangle 3: the diagonal web runs from the top of the vertical web to the foot of the king post, $${fmt(S / 2)} - ${fmt(S / 3)} = ${fmt(S / 6)}$ ${u} away. $w = \\sqrt{${fmt(S / 6)}^2 + ${f2(v)}^2} \\approx ${f2(dg)}\\ \\text{${u}}$`,
      `(a) about $${qm(f1(h), u)}$; (b) about $${qm(f1(dg), u)}$.`,
    ],
  };
}

function stairsTrig(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const r = rng.int(34, 39) / 2;
      const t = rng.int(25, 29);
      const n1 = rng.int(5, 9);
      const n2 = rng.int(4, 8);
      const G = rng.int(9, 12) * 10;
      const th = atanD(r / t);
      const R1 = n1 * r;
      const R2 = n2 * r;
      const tot = (R1 + R2) / sinD(th);
      const shown = R1 / sinD(rd2(th)) + R2 / sinD(rd2(th));
      return { r, t, n1, n2, G, th, R1, R2, tot, shown };
    },
    (v) => v.n1 !== v.n2 && clear(v.th) && clear(v.tot, 0, 0.2) && fx(v.shown, 0) === fx(v.tot, 0) && f1(atanD(Number(r4(v.r / v.t)))) === f1(v.th),
  );
  const { r, t, n1, n2, G, th, R1, R2, tot } = v;
  const L1 = R1 / sinD(th);
  const L2 = R2 / sinD(th);
  return {
    prompt: `${who} is building stairs with a landing. Every step has a riser of ${Q(r, 'cm')} and a tread of ${Q(t, 'cm')}. The first flight rises ${Q(R1, 'cm')}, then there is a landing ${Q(G, 'cm')} long, and the second flight rises ${Q(R2, 'cm')}. A stringer under each flight slopes at the same angle as the steps.\n\n(a) What angle do the stairs make with the floor, ${NEAR_DEG}?\n\n(b) What is the total length of the two stringers on one side of the stairs, to the nearest centimetre?`,
    figure: stairsFig(n1, n2, r, t, G, 'trig', { R1: lb(R1, 'cm'), R2: lb(R2, 'cm'), G: lb(G, 'cm') }),
    parts: [angPart(th, '(a) $\\theta =$'), numPart(tot, { decimals: 0, suffix: 'cm', label: '(b) Stringers' })],
    hints: ['Triangle 1 is one step: the riser is opposite the angle and the tread is adjacent, so $\\theta = \\tan^{-1}\\left(\\dfrac{\\text{riser}}{\\text{tread}}\\right)$.', `Triangles 2 and 3 are the two flights. In each, the rise is opposite $\\theta$ and the stringer is the hypotenuse: stringer $= \\dfrac{\\text{rise}}{\\sin\\theta}$. ${KEEP}`],
    solution: [
      `(a) One step: $\\tan\\theta = \\dfrac{${fmt(r)}}{${t}}$, so $\\theta = \\tan^{-1}\\left(\\dfrac{${fmt(r)}}{${t}}\\right) \\approx ${f2(th)}^\\circ$`,
      `(b) Flight 1 (SOH): $\\sin\\theta = \\dfrac{${fmt(R1)}}{L_1}$, so $L_1 = \\dfrac{${fmt(R1)}}{\\sin\\theta} \\approx ${f2(L1)}\\ \\text{cm}$`,
      `Flight 2: $L_2 = \\dfrac{${fmt(R2)}}{\\sin\\theta} \\approx ${f2(L2)}\\ \\text{cm}$. (The landing is flat, so it has no stringer.)`,
      `$L_1 + L_2 \\approx ${f2(L1)} + ${f2(L2)} \\approx ${f2(tot)}\\ \\text{cm}$`,
      `(a) about $${f1(th)}^\\circ$; (b) about $${qm(fx(tot, 0), 'cm')}$.`,
    ],
  };
}

// --- 4.3 level 3 ------------------------------------------------------------

function survey3KnownFig(dA: number, h: number, dQ: number, dR: number, aA: number, aQ: number, aR: number): PlaneFigure {
  const T: P = [0, h];
  return new Sketch()
    .line([-dA * 1.08, 0], [dR * 1.05, 0], 'muted')
    .line([0, 0], T, 'brand')
    .line(T, [dR * 1.02, h], 'muted', true)
    .line([-dA, 0], T, 'accent')
    .line(T, [dQ, 0], 'accent')
    .line(T, [dR, 0], 'accent')
    .right([0, 0], [1, 0], [0, 1])
    .dot([-dA, 0])
    .dot([dQ, 0])
    .dot([dR, 0])
    .angle([-dA, 0], [0, 0], T, `${aA}°`, 22)
    .angle(T, [dR, h], [dQ, 0], `${aQ}°`, 24)
    .angle(T, [dR, h], [dR, 0], `${aR}°`, 52)
    .text([-dA, 0], 'A', 0, -12)
    .text([dQ, 0], 'Q', 0, -12)
    .text([dR, 0], 'R', 0, -12)
    .dim([-dA, 0], [0, 0], lb(dA, 'm'), [0, -26])
    .dim([dQ, 0], [dR, 0], 'x', [0, -26])
    .text([0, h / 2], 'h', -10, 0)
    .build(290, 140);
}

function survey3Known(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const dA = rng.int(30, 80);
      const aA = rng.int(35, 58);
      const aQ = rng.int(30, 55);
      const aR = rng.int(14, aQ - 8);
      const h = dA * tanD(aA);
      const dQ = h / tanD(aQ);
      const dR = h / tanD(aR);
      const sh = rd2(h);
      return { dA, aA, aQ, aR, h, dQ, dR, x: dR - dQ, xs: sh / tanD(aR) - sh / tanD(aQ) };
    },
    (v) => clear(v.h) && clear(v.x) && f1(v.xs) === f1(v.x) && v.dR < 4 * v.dA && v.x > 5,
  );
  const { dA, aA, aQ, aR, h, dQ, dR, x } = v;
  return {
    prompt: `A fire lookout tower stands on level ground in the foothills. ${who} stands at point A, ${Q(dA, 'm')} from the base of the tower, and measures the angle of elevation to the lookout cabin at the top as $${deg(aA)}$. From the lookout, a ranger sees two campsites, Q and R, on the other side of the tower, in line with A and the base. The angles of depression are $${deg(aQ)}$ to Q and $${deg(aR)}$ to R.\n\n(a) How high is the lookout above the ground?\n\n(b) How far apart are the two campsites?\n\nRound each answer ${nearest('m')}.`,
    figure: survey3KnownFig(dA, h, dQ, dR, aA, aQ, aR),
    parts: [lenPart(h, 'm', '(a) $h =$'), lenPart(x, 'm', '(b) $x =$')],
    hints: [`${SHARED_FIRST} All three triangles share the height $h$. A's triangle has a known angle and side: $h = ${dA}\\tan ${deg(aA)}$.`, `Each angle of depression equals the angle of elevation at the campsite (alternate angles). Find each campsite’s distance from the base with $\\dfrac{h}{\\tan\\theta}$, then subtract. ${KEEP}`],
    solution: [
      `The three right triangles share the height $h$ of the lookout. Find it first from A's triangle, where you know an angle and the adjacent side.`,
      `(a) A's triangle (TOA): $h = ${dA}\\tan ${deg(aA)} \\approx ${f2(h)}\\ \\text{m}$`,
      `The angles of depression equal the angles of elevation at the campsites (alternate angles). Q: $\\dfrac{h}{\\tan ${deg(aQ)}} \\approx ${f2(dQ)}\\ \\text{m}$ from the base; R: $\\dfrac{h}{\\tan ${deg(aR)}} \\approx ${f2(dR)}\\ \\text{m}$ from the base`,
      `(b) $x \\approx ${f2(dR)} - ${f2(dQ)} \\approx ${f2(x)}\\ \\text{m}$`,
      `(a) about $${qm(f1(h), 'm')}$; (b) about $${qm(f1(x), 'm')}$.`,
    ],
  };
}

function stairsAngle(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const v = retry(
    () => {
      const r = rng.int(34, 39) / 2;
      const t = rng.int(25, 29);
      const n1 = rng.int(5, 9);
      const n2 = rng.int(4, 8);
      const G = rng.int(8, 15) * 10;
      const th = atanD(r / t);
      const R = (n1 + n2) * r;
      const run = (n1 + n2) * t + G;
      const big = atanD(R / run);
      return { r, t, n1, n2, G, th, R, run, big };
    },
    (v) => v.n1 !== v.n2 && clear(v.th) && clear(v.big) && f1(atanD(Number(r4(v.r / v.t)))) === f1(v.th) && f1(atanD(Number(r4(v.R / v.run)))) === f1(v.big),
  );
  const { r, t, n1, n2, G, th, R, run, big } = v;
  const R1 = n1 * r;
  const R2 = n2 * r;
  const T1 = R1 / tanD(th);
  const T2 = R2 / tanD(th);
  return {
    prompt: `A staircase in a community centre has two flights with a landing between them. Every step has a riser of ${Q(r, 'cm')} and a tread of ${Q(t, 'cm')}. The first flight rises ${Q(R1, 'cm')}, the landing is ${Q(G, 'cm')} long, and the second flight rises ${Q(R2, 'cm')}. ${who} wants to run a straight cable from the bottom of the stairs to the top.\n\n(a) What angle do the steps make with the floor?\n\n(b) What angle does the straight cable make with the floor?\n\nRound each angle ${NEAR_DEG}.`,
    figure: stairsFig(n1, n2, r, t, G, 'angle', { R1: lb(R1, 'cm'), R2: lb(R2, 'cm'), G: lb(G, 'cm') }),
    parts: [angPart(th, '(a) $\\alpha =$'), angPart(big, '(b) $\\theta =$')],
    hints: ['Triangle 1 is one step. Triangles 2 and 3 are the flights: each run is the rise divided by $\\tan$ of the step angle (or the number of steps times the tread).', `The cable is the hypotenuse of a large triangle: total rise over total run, where the total run includes the ${G} cm landing. ${KEEP}`],
    solution: [
      `(a) One step: $\\tan\\alpha = \\dfrac{${fmt(r)}}{${t}}$, so $\\alpha = \\tan^{-1}\\left(\\dfrac{${fmt(r)}}{${t}}\\right) \\approx ${f2(th)}^\\circ$`,
      `Flight 1 run: $\\dfrac{${fmt(R1)}}{\\tan\\alpha} \\approx ${f2(T1)}\\ \\text{cm}$ (that is $${n1}$ treads of $${t}$ cm). Flight 2 run: $\\dfrac{${fmt(R2)}}{\\tan\\alpha} \\approx ${f2(T2)}\\ \\text{cm}$`,
      `Total rise: $${fmt(R1)} + ${fmt(R2)} = ${fmt(R)}\\ \\text{cm}$. Total run: $${f2(T1)} + ${G} + ${f2(T2)} \\approx ${f2(run)}\\ \\text{cm}$`,
      `(b) $\\tan\\theta = \\dfrac{${fmt(R)}}{${f2(run)}}$, so $\\theta \\approx ${f2(big)}^\\circ$. It is less steep than the steps because the landing adds run but no rise.`,
      `(a) about $${f1(th)}^\\circ$; (b) about $${f1(big)}^\\circ$.`,
    ],
  };
}

function boxAngle(rng: Rng): GenOutput {
  const c = retry(
    () => boxCtx(rng, false),
    (c) => {
      const fd = Math.hypot(c.l, c.w);
      const sd = Math.hypot(c.l, c.w, c.h);
      const a = atanD(c.h / fd);
      return c.w < c.l && clear(sd, c.dp) && clear(a) && f1(atanD(c.h / rd2(fd))) === f1(a) && fx(Math.hypot(rd2(fd), c.h), c.dp) === fx(sd, c.dp);
    },
  );
  const { u, dp, l, w, h } = c;
  const fd = Math.hypot(l, w);
  const sd = Math.hypot(l, w, h);
  const a = atanD(h / fd);
  return {
    prompt: `${fillBox(c)} ${cap(c.pole)} is placed inside, running from a bottom corner to the opposite top corner.\n\n(a) How long is the ${c.pole.replace(/^a (straight )?(length of )?/, '')}, ${nearest(u, dp)}?\n\n(b) What angle does it make with the floor, ${NEAR_DEG}?`,
    figure: boxFig(l, w, h, u, { floor: 'd', space: 'p' }, 'θ'),
    parts: [lenPart(sd, u, '(a) $p =$', dp), angPart(a, '(b) $\\theta =$')],
    hints: ['Triangle 1 lies on the floor: its hypotenuse is the floor diagonal $d$. Triangle 2 stands up inside the box, with legs $d$ and the height.', `The angle with the floor is in triangle 2, between $d$ and $p$: the height is opposite and $d$ is adjacent. ${KEEP}`],
    solution: [
      `Triangle 1 (floor): $d = \\sqrt{${fmt(l)}^2 + ${fmt(w)}^2} = \\sqrt{${fmt(sq(l) + sq(w))}} \\approx ${fx(fd, dp + 1)}\\ \\text{${u}}$`,
      `(a) Triangle 2 (standing): $p = \\sqrt{d^2 + ${fmt(h)}^2} = \\sqrt{${fmt(sq(l) + sq(w))} + ${fmt(sq(h))}} \\approx ${fx(sd, dp + 1)}\\ \\text{${u}}$`,
      `(b) In triangle 2, the height is opposite $\\theta$ and $d$ is adjacent: $\\tan\\theta = \\dfrac{${fmt(h)}}{${fx(fd, dp + 1)}}$, so $\\theta \\approx ${f2(a)}^\\circ$`,
      `Check with the third side: $\\sin\\theta = \\dfrac{${fmt(h)}}{p} = \\dfrac{${fmt(h)}}{${fx(sd, dp + 1)}}$ gives the same angle.`,
      `(a) about $${qm(fx(sd, dp), u)}$; (b) about $${f1(a)}^\\circ$.`,
    ],
  };
}
function trussPitch(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const v0 = retry(
    () => {
      const p = rng.int(4, 9);
      const S = rng.pick([24, 27, 30, 33, 36]);
      const th = atanD(p / 12);
      const h = (S / 2) * (p / 12);
      const v = (S / 3) * (p / 12);
      const dg = Math.hypot(S / 6, v);
      const total = h + 2 * v + 2 * dg;
      return { p, S, th, h, v, dg, total };
    },
    (x) => clear(x.th) && clear(x.total) && f1(atanD(Number(r4(x.p / 12)))) === f1(x.th) && f1(x.h + 2 * x.v + 2 * rd2(x.dg)) === f1(x.total),
  );
  const { p, S, th, h, v, dg, total } = v0;
  return {
    prompt: `A truss for a shop roof in ${town} spans ${Q(S, 'ft')} and has ${p === 8 ? 'an' : 'a'} ${p}/12 pitch: the rafters rise $${p}$ in for every $12$ in of run. ${TRUSS_WORDS}\n\n(a) What angle do the rafters make with the bottom chord, ${NEAR_DEG}?\n\n(b) What total length of lumber is needed for the five web pieces (the king post, the two vertical webs and the two diagonal webs), ${nearest('ft')}?`,
    figure: trussFig(S, h, { span: lb(S, 'ft'), angle: 'θ', h: 'k', v: 'v', diag: 'w' }),
    parts: [angPart(th, '(a) $\\theta =$'), lenPart(total, 'ft', '(b) Total')],
    hints: [`The pitch gives a small right triangle with rise $${p}$ and run $12$: $\\theta = \\tan^{-1}\\left(\\dfrac{${p}}{12}\\right)$.`, `Triangle 1 (half the truss) gives the king post, triangle 2 (out to the vertical web) gives the vertical web, and triangle 3 gives the diagonal web. Add $k + 2v + 2w$. ${KEEP}`],
    solution: [
      `(a) $\\tan\\theta = \\dfrac{${p}}{12} \\approx ${r4(p / 12)}$, so $\\theta \\approx ${f2(th)}^\\circ$`,
      `Triangle 1: the king post rises $${p}$ in per foot of run over half the span: $k = ${fmt(S / 2)} \\times \\dfrac{${p}}{12} ${eq2(h)}\\ \\text{ft}$ (or $${fmt(S / 2)}\\tan\\theta$)`,
      `Triangle 2: each vertical web is $${fmt(S / 3)}$ ft from its end: $v = ${fmt(S / 3)} \\times \\dfrac{${p}}{12} ${eq2(v)}\\ \\text{ft}$`,
      `Triangle 3: each diagonal web has legs $${fmt(S / 2)} - ${fmt(S / 3)} = ${fmt(S / 6)}$ ft and $${v2(v)}$ ft: $w = \\sqrt{${fmt(S / 6)}^2 + ${v2(v)}^2} \\approx ${f2(dg)}\\ \\text{ft}$`,
      `(b) Total: $k + 2v + 2w \\approx ${v2(h)} + 2(${v2(v)}) + 2(${f2(dg)}) \\approx ${f2(total)}\\ \\text{ft}$`,
      `(a) about $${f1(th)}^\\circ$; (b) about $${qm(f1(total), 'ft')}$ of lumber.`,
    ],
  };
}

const threeTriangles = skill({
  id: 'm203-three-triangles',
  name: 'Problems with three right triangles',
  description: 'Solve problems that chain three right triangles, such as roof trusses, stair stringers, survey sightings and the diagonal of a box.',
  outcomes: ['G1'],
  lessonId: 'm203-4-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.pick([boxDiag, stairsPyth, trussPyth])(rng);
    if (d === 2) return rng.pick([survey3, trussTrig, stairsTrig])(rng);
    return rng.pick([survey3Known, stairsAngle, boxAngle, trussPitch])(rng);
  },
});

export const TRIANGLE_SKILLS: SkillDef[] = [trigReview, twoTriangles, threeTriangles];
