/** Math 30-3 Unit 4 — Transformations (G3): translations, reflections and rotations on a grid, and dilations about the origin with scale factors, lengths and areas. */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtGroupTex, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj', 'Chloé', 'Tariq',
  'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Kai', 'Zainab', 'Mason',
  'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];

type Out = GenOutput;
type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const clean = (x: number) => roundTo(x, 9);
/** A number in maths with thousands grouped: 25{,}600. */
const num = (x: number) => fmtGroupTex(clean(x));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** A coordinate pair in LaTeX: (3,\ -2). */
const ptx = (p: P) => `(${fmt(p[0])},\\ ${fmt(p[1])})`;
/** A number in maths; negatives in brackets for substitutions. */
const par = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));
const units = (n: number) => `$${Math.abs(n)}$ unit${Math.abs(n) === 1 ? '' : 's'}`;
const pointAns = (p: P, label: string): Part => part({ kind: 'point', x: clean(p[0]), y: clean(p[1]) }, { label, placeholder: '(x, y)' });
const LETTERS = 'ABCDEFG';
/** A number written as a fraction when it is one: \frac{1}{2}, 1.5 stays 1.5 unless asked. */
function kTex(k: number, asFrac = true): string {
  const f = toFrac(k, 12);
  if (asFrac && f && f.d !== 1) return `\\frac{${f.n}}{${f.d}}`;
  return fmt(k);
}

// ---------------------------------------------------------------------------
// Drawing: shapes on a coordinate grid, with labels placed clear of every line
// (the same approach as the Math 10-4 transformation figures).
// ---------------------------------------------------------------------------

const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
const dirOf = (a: P, b: P) => norm360((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
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
  const dx = Math.max(b.x0 - p[0], 0, p[0] - b.x1);
  const dy = Math.max(b.y0 - p[1], 0, p[1] - b.y1);
  return Math.hypot(dx, dy);
}

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
  for (const ch of t) w += ch === '′' ? 5 : ch === ' ' ? 3.5 : ch === '(' || ch === ')' || ch === '.' || ch === ',' ? 4.5 : /[mMwW]/.test(ch) ? 10 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  cands: (ppu: number) => P[];
}

/** Collects lines and labels, then lays them out on a coordinate grid with each label clear of the lines. */
class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color }> = [];
  private dots: Array<{ p: P; color: Color }> = [];
  private obstacles: Array<[P, P]> = [];
  private pending: PendingLabel[] = [];

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    this.obstacles.push([from, to]);
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

  /** Label for a point, placed just beyond it in direction a (or nearby). */
  endLabel(p: P, a: number, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [13, 16, 20, 25, 31, 38]) for (const off of [0, 30, -30, 60, -60, 90, -90, 125, -125, 180]) out.push(at(p, a + off, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  private place(bounds: Box, ppu: number, fixedBoxes: Box[]): PlanePoint[] {
    const placed: Box[] = [...fixedBoxes];
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
        if (box.x0 < bounds.x0 || box.x1 > bounds.x1 || box.y0 < bounds.y0 || box.y1 > bounds.y1) score = -1000;
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
      anchors.push({ x: r3(c[0] - (8 + wpx / 2) / ppu), y: r3(c[1] - 12.3 / ppu), label: lab.text, color: 'muted', open: true });
    }
    return anchors;
  }

  /** A coordinate grid with numbered axes; coordinates are used as given. */
  buildGrid(grid: GridSpec): PlaneFigure {
    const xr = grid.xMax - grid.xMin;
    const ppu = 340 / xr;
    const step = grid.step ?? 1;
    const every = Math.max(1, Math.ceil((xr / step + 1) / 12)) * step;
    const ticks: Box[] = [];
    const axisX = grid.yMin <= 0 && grid.yMax >= 0 ? 0 : grid.yMin;
    const axisY = grid.xMin <= 0 && grid.xMax >= 0 ? 0 : grid.xMin;
    for (let t = Math.ceil(grid.xMin / every) * every; t <= grid.xMax; t += every) {
      const w = String(t).length * 6.5;
      ticks.push({ x0: t - w / 2 / ppu, x1: t + w / 2 / ppu, y0: axisX - 17 / ppu, y1: axisX - 3 / ppu });
    }
    for (let t = Math.ceil(grid.yMin / every) * every; t <= grid.yMax; t += every) {
      const w = String(t).length * 6.5;
      ticks.push({ x0: axisY - (8 + w) / ppu, x1: axisY - 2 / ppu, y0: t - 6 / ppu, y1: t + 6 / ppu });
    }
    const anchors = this.place({ x0: grid.xMin, x1: grid.xMax, y0: grid.yMin, y1: grid.yMax }, ppu, ticks);
    const fig: PlaneFigure = { type: 'plane', grid };
    if (this.segs.length) fig.segments = this.segs.map((s) => ({ ...s, from: [r3(s.from[0]), r3(s.from[1])], to: [r3(s.to[0]), r3(s.to[1])] }));
    if (this.polys.length) fig.polylines = this.polys.map((p) => ({ points: p.points.map(([x, y]) => [r3(x), r3(y)] as P), ...(p.color ? { color: p.color } : {}) }));
    const points: PlanePoint[] = [...this.dots.map((d) => ({ x: r3(d.p[0]), y: r3(d.p[1]), color: d.color })), ...anchors];
    if (points.length) fig.points = points;
    return fig;
  }
}

function centroid(pts: P[]): P {
  return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
}

interface Shape {
  pts: P[];
  color: Color;
  labels?: string[];
}

/** Shapes and points on a grid, with an optional dashed mirror line. */
function gridFigure(g: GridSpec, o: { shapes?: Shape[]; points?: Array<{ p: P; label: string; color?: Color }>; mirror?: { vertical: boolean; at: number }; origin?: boolean }): PlaneFigure {
  const s = new Sketch();
  if (o.mirror) {
    if (o.mirror.vertical) s.seg([o.mirror.at, g.yMin], [o.mirror.at, g.yMax], { dashed: true, color: 'accent' });
    else s.seg([g.xMin, o.mirror.at], [g.xMax, o.mirror.at], { dashed: true, color: 'accent' });
  }
  for (const sh of o.shapes ?? []) s.polyline([...sh.pts, sh.pts[0]], sh.color);
  for (const pt of o.points ?? []) s.dot(pt.p, pt.color ?? 'brand');
  if (o.origin) s.dot([0, 0], 'muted');
  for (const sh of o.shapes ?? []) {
    const c = centroid(sh.pts);
    sh.labels?.forEach((lab, i) => s.endLabel(sh.pts[i], dirOf(c, sh.pts[i]), lab));
  }
  for (const pt of o.points ?? []) s.endLabel(pt.p, 45, pt.label);
  return s.buildGrid(g);
}

const G8: GridSpec = { xMin: -8, xMax: 8, yMin: -8, yMax: 8, step: 1 };
const inGrid = (g: GridSpec, [x, y]: P, margin = 0) => x >= g.xMin + margin && x <= g.xMax - margin && y >= g.yMin + margin && y <= g.yMax - margin;

// ---------------------------------------------------------------------------
// Transformations
// ---------------------------------------------------------------------------

type Tr =
  | { t: 'move'; a: number; b: number }
  | { t: 'rx' }
  | { t: 'ry' }
  | { t: 'rv'; k: number }
  | { t: 'rh'; k: number }
  | { t: 'rot'; deg: 90 | 180 | 270 };

/** Image of p. Rotations are counterclockwise about the origin. */
function apply(T: Tr, [x, y]: P): P {
  switch (T.t) {
    case 'move':
      return [x + T.a, y + T.b];
    case 'rx':
      return [x, -y];
    case 'ry':
      return [-x, y];
    case 'rv':
      return [2 * T.k - x, y];
    case 'rh':
      return [x, 2 * T.k - y];
    case 'rot':
      return T.deg === 90 ? [-y, x] : T.deg === 180 ? [-x, -y] : [y, -x];
  }
}

/** The transformation that undoes T. */
function inverse(T: Tr): Tr {
  if (T.t === 'move') return { t: 'move', a: -T.a, b: -T.b };
  if (T.t === 'rot') return { t: 'rot', deg: T.deg === 180 ? 180 : T.deg === 90 ? 270 : 90 };
  return T;
}

function slideText(a: number, b: number): string {
  const bits: string[] = [];
  if (a) bits.push(`${units(a)} ${a > 0 ? 'right' : 'left'}`);
  if (b) bits.push(`${units(b)} ${b > 0 ? 'up' : 'down'}`);
  return bits.join(' and ');
}

/** "add $4$ to $x$" or "subtract $3$ from $y$". */
const addWords = (n: number, v: string) => (n >= 0 ? `add $${n}$ to $${v}$` : `subtract $${-n}$ from $${v}$`);

/** "x + 4", "y - 3", "x" */
const plusTex = (v: string, n: number) => (n === 0 ? v : `${v} ${n > 0 ? '+' : '-'} ${Math.abs(n)}`);

/** Mapping rule in LaTeX. */
function ruleTex(T: Tr): string {
  switch (T.t) {
    case 'move':
      return `(x, y) \\to (${plusTex('x', T.a)},\\ ${plusTex('y', T.b)})`;
    case 'rx':
      return '(x, y) \\to (x, -y)';
    case 'ry':
      return '(x, y) \\to (-x, y)';
    case 'rv':
      return `(x, y) \\to (${2 * T.k} - x,\\ y)`;
    case 'rh':
      return `(x, y) \\to (x,\\ ${2 * T.k} - y)`;
    case 'rot':
      return T.deg === 90 ? '(x, y) \\to (-y, x)' : T.deg === 180 ? '(x, y) \\to (-x, -y)' : '(x, y) \\to (y, -x)';
  }
}

/** A rotation of 270° counterclockwise is the same as 90° clockwise; `cw` picks the wording. */
function describe(T: Tr, cw270 = true): string {
  switch (T.t) {
    case 'move':
      return `a translation ${slideText(T.a, T.b)}`;
    case 'rx':
      return 'a reflection in the $x$-axis';
    case 'ry':
      return 'a reflection in the $y$-axis';
    case 'rv':
      return `a reflection in the line $x = ${T.k}$`;
    case 'rh':
      return `a reflection in the line $y = ${T.k}$`;
    case 'rot':
      if (T.deg === 180) return 'a rotation of $180^\\circ$ about the origin';
      if (T.deg === 90) return 'a rotation of $90^\\circ$ counterclockwise about the origin';
      return cw270 ? 'a rotation of $90^\\circ$ clockwise about the origin' : 'a rotation of $270^\\circ$ counterclockwise about the origin';
  }
}

/** How to apply T in words (one step of a worked solution). */
function howTo(T: Tr): string {
  switch (T.t) {
    case 'move':
      return `${cap(addWords(T.a, 'x'))} and ${addWords(T.b, 'y')}: $${ruleTex(T)}$.`;
    case 'rx':
      return 'A reflection in the $x$-axis keeps $x$ and changes the sign of $y$: $(x, y) \\to (x, -y)$.';
    case 'ry':
      return 'A reflection in the $y$-axis changes the sign of $x$ and keeps $y$: $(x, y) \\to (-x, y)$.';
    case 'rv':
      return `In a reflection in the vertical line $x = ${T.k}$, $y$ stays the same and the point ends up the same distance on the other side of the line: $x' = 2(${T.k}) - x$.`;
    case 'rh':
      return `In a reflection in the horizontal line $y = ${T.k}$, $x$ stays the same and the point ends up the same distance on the other side of the line: $y' = 2(${T.k}) - y$.`;
    case 'rot':
      if (T.deg === 180) return 'A rotation of $180^\\circ$ about the origin changes the sign of both coordinates: $(x, y) \\to (-x, -y)$.';
      if (T.deg === 90) return 'A rotation of $90^\\circ$ counterclockwise about the origin swaps the coordinates and changes the sign of the new first coordinate: $(x, y) \\to (-y, x)$.';
      return 'A rotation of $90^\\circ$ clockwise (the same as $270^\\circ$ counterclockwise) about the origin swaps the coordinates and changes the sign of the new second coordinate: $(x, y) \\to (y, -x)$.';
  }
}

/** One substitution line: (3, -2) -> (2, 3). */
function subst(T: Tr, p: P): string {
  const q = apply(T, p);
  const [x, y] = p;
  switch (T.t) {
    case 'move':
      return `$${ptx(p)} \\to (${fmt(x)} ${T.a < 0 ? '-' : '+'} ${Math.abs(T.a)},\\ ${fmt(y)} ${T.b < 0 ? '-' : '+'} ${Math.abs(T.b)}) = ${ptx(q)}$`;
    case 'rv':
      return `$x' = ${2 * T.k} - ${par(x)} = ${fmt(q[0])}$ and $y' = ${fmt(y)}$, so $${ptx(p)} \\to ${ptx(q)}$`;
    case 'rh':
      return `$x' = ${fmt(x)}$ and $y' = ${2 * T.k} - ${par(y)} = ${fmt(q[1])}$, so $${ptx(p)} \\to ${ptx(q)}$`;
    default:
      return `$${ptx(p)} \\to ${ptx(q)}$`;
  }
}

// Shapes with no symmetry, so a flip and a turn always look different.
const TEMPLATES: P[][] = [
  [[0, 0], [3, 0], [0, 2]],
  [[0, 0], [4, 0], [1, 3]],
  [[0, 0], [2, 0], [3, 3]],
  [[0, 0], [3, 0], [3, 2], [1, 2]],
  [[0, 0], [4, 0], [3, 2], [0, 3]],
  [[0, 0], [3, 0], [2, 3], [0, 1]],
];

const SHAPE_CTX = [
  { tri: 'a triangular gusset plate in a CAD drawing', quad: 'a steel bracket in a CAD drawing' },
  { tri: 'a triangular flower bed on a landscape plan', quad: 'a patio slab on a landscape plan' },
  { tri: 'a triangle in a company logo', quad: 'a shape in a company logo' },
  { tri: 'a triangular quilt piece on a pattern grid', quad: 'a quilt piece on a pattern grid' },
  { tri: 'a triangular sign on a site plan', quad: 'a storage shed on a site plan' },
  { tri: 'a triangular window in an architect’s elevation drawing', quad: 'a skylight in an architect’s elevation drawing' },
];

/** Random turn and flip of a template, placed so its lowest-left corner is at (x0, y0). */
function orient(rng: Rng, t: P[]): P[] {
  const flip = rng.chance(0.5);
  let q = t.map(([x, y]) => [flip ? -x : x, y] as P);
  for (let i = rng.int(0, 3); i > 0; i--) q = q.map(([x, y]) => [-y, x] as P);
  const mx = Math.min(...q.map((p) => p[0]));
  const my = Math.min(...q.map((p) => p[1]));
  return q.map(([x, y]) => [x - mx, y - my] as P);
}

/** Place a shape inside one quadrant (sx, sy are the signs), at least 1 unit from both axes and within `lim`. */
function inQuadrant(rng: Rng, q: P[], sx: number, sy: number, lim = 7): P[] {
  const w = Math.max(...q.map((p) => p[0]));
  const h = Math.max(...q.map((p) => p[1]));
  const dx = sx > 0 ? rng.int(1, Math.max(1, lim - w)) : -rng.int(1, Math.max(1, lim - w)) - w;
  const dy = sy > 0 ? rng.int(1, Math.max(1, lim - h)) : -rng.int(1, Math.max(1, lim - h)) - h;
  return q.map(([x, y]) => [x + dx, y + dy] as P);
}

function newShape(rng: Rng, sx = rng.sign(), sy = rng.sign(), lim = 7): { pts: P[]; what: string; labels: string[] } {
  const t = rng.pick(TEMPLATES);
  const pts = inQuadrant(rng, orient(rng, t), sx, sy, lim);
  const ctx = rng.pick(SHAPE_CTX);
  return { pts, what: t.length === 3 ? ctx.tri : ctx.quad, labels: [...LETTERS.slice(0, t.length)] };
}

const primed = (labels: string[]) => labels.map((l) => `${l}′`);
const shapeName = (labels: string[]) => labels.join('');
const bbox = (pts: P[]) => [Math.min(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[1]))];
function apart(a: P[], b: P[]): boolean {
  const [a0, a1, a2, a3] = bbox(a);
  const [b0, b1, b2, b3] = bbox(b);
  return a1 < b0 || b1 < a0 || a3 < b2 || b3 < a2;
}
const same = (a: P[], b: P[]) => a.every((p, i) => p[0] === b[i][0] && p[1] === b[i][1]);

/** Signed area: positive when the vertices go counterclockwise. */
function orientation(pts: P[]): number {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return s;
}

// ---------------------------------------------------------------------------
// 4.1 Translations, reflections and rotations
// ---------------------------------------------------------------------------

const POINT_CTX = [
  'A CNC plasma cutter in a fabrication shop uses a coordinate grid to cut steel plate. The torch is at point $P$.',
  'On a grid plan of a building-supply warehouse, a pallet of shingles sits at point $P$.',
  'A sign maker is laying out a logo on a coordinate grid. One corner of a letter is at point $P$.',
  'On a landscape plan for a back yard, a spruce tree is planted at point $P$.',
  'A drafter is drawing a mounting plate in CAD software. A bolt hole is centred at point $P$.',
  'On a tile layout for a kitchen floor, the corner of a feature tile is at point $P$.',
  'A robot arm on an assembly line picks up parts from a grid. The gripper is at point $P$.',
];

function translatePoint(rng: Rng): Out {
  const { p, a, b } = retry(
    () => ({ p: [rng.int(-6, 6), rng.int(-6, 6)] as P, a: rng.nonZero(-6, 6), b: rng.nonZero(-6, 6) }),
    (o) => inGrid(G8, o.p, 1) && inGrid(G8, [o.p[0] + o.a, o.p[1] + o.b], 1) && o.p[0] !== 0 && o.p[1] !== 0,
    200,
  );
  const T: Tr = { t: 'move', a, b };
  const q = apply(T, p);
  const asRule = rng.chance(0.4);
  return {
    prompt: `${rng.pick(POINT_CTX)} Point $P$ is translated ${asRule ? `by the rule $${ruleTex(T)}$` : `**${slideText(a, b)}**`}. What are the coordinates of its image, $P'$?`,
    figure: gridFigure(G8, { points: [{ p, label: 'P' }] }),
    parts: [pointAns(q, "$P'$ =")],
    hints: ['Read the coordinates of $P$ first: across for $x$, then up or down for $y$.', 'Right and left change $x$; up and down change $y$. Add for right or up, subtract for left or down.'],
    solution: [
      `$P$ is at $${ptx(p)}$.`,
      asRule ? `The rule says to ${addWords(a, 'x')} and ${addWords(b, 'y')}.` : `Moving ${slideText(a, b)} means: ${addWords(a, 'x')} and ${addWords(b, 'y')}.`,
      subst(T, p),
      `The image is $P'${ptx(q)}$.`,
    ],
    calculator: false,
  };
}

function simplePoint(rng: Rng, kind: 'rx' | 'ry' | 'rot180'): Out {
  const T: Tr = kind === 'rot180' ? { t: 'rot', deg: 180 } : { t: kind };
  const p: P = [rng.nonZero(-6, 6), rng.nonZero(-6, 6)];
  const q = apply(T, p);
  const hints =
    kind === 'rot180'
      ? ['A half turn about the origin sends a point to the opposite quadrant, the same distance from the origin.', 'Change the sign of both coordinates.']
      : [`The ${kind === 'rx' ? '$x$-axis' : '$y$-axis'} is the mirror. The image is the same distance from it, on the other side.`, kind === 'rx' ? 'Keep $x$. Change the sign of $y$.' : 'Change the sign of $x$. Keep $y$.'];
  return {
    prompt: `${rng.pick(POINT_CTX)} Find the image $P'$ after ${describe(T)}.`,
    figure: gridFigure(G8, { points: [{ p, label: 'P' }] }),
    parts: [pointAns(q, "$P'$ =")],
    hints,
    solution: [`$P$ is at $${ptx(p)}$.`, howTo(T), subst(T, p), `The image is $P'${ptx(q)}$.`],
    calculator: false,
  };
}

/** Rotate (d2) or reflect in a vertical or horizontal line (d2) one vertex of a shape. */
function shapeVertex(rng: Rng, mode: 'rot' | 'line'): Out {
  for (;;) {
    const sh = newShape(rng, rng.sign(), rng.sign(), 6);
    let T: Tr;
    if (mode === 'rot') T = { t: 'rot', deg: rng.pick([90, 270, 270, 180] as const) };
    else {
      const vertical = rng.chance(0.5);
      const [x0, x1, y0, y1] = bbox(sh.pts);
      const lo = vertical ? x0 : y0;
      const hi = vertical ? x1 : y1;
      const k = rng.chance(0.5) ? hi + rng.int(1, 2) : lo - rng.int(1, 2);
      if (k === 0) continue;
      T = vertical ? { t: 'rv', k } : { t: 'rh', k };
    }
    const img = sh.pts.map((p) => apply(T, p));
    if (!img.every((p) => inGrid(G8, p, 1))) continue;
    const i = rng.int(0, sh.pts.length - 1);
    const L = sh.labels[i];
    const cw = rng.chance(0.5);
    const name = shapeName(sh.labels);
    const mirror = T.t === 'rv' ? { vertical: true, at: T.k } : T.t === 'rh' ? { vertical: false, at: T.k } : undefined;
    const hints =
      T.t === 'rot'
        ? [`Use the rule for ${describe(T, cw)}.`, T.deg === 180 ? 'Change the sign of both coordinates.' : T.deg === 90 ? 'Swap $x$ and $y$, then change the sign of the new first coordinate.' : 'Swap $x$ and $y$, then change the sign of the new second coordinate.']
        : ['The image is the same distance from the dashed line as the vertex, on the other side.', `Count how far $${L}$ is from the line, then count the same distance past the line. Only the ${T.t === 'rv' ? '$x$' : '$y$'}-coordinate changes.`];
    return {
      prompt: `${cap(sh.what)} is shown as ${sh.labels.length === 3 ? 'triangle' : 'quadrilateral'} $${name}$. It is transformed by ${describe(T, cw)}${mirror ? ' (the dashed line)' : ''}. What are the coordinates of $${L}'$, the image of vertex $${L}$?`,
      figure: gridFigure(G8, { shapes: [{ pts: sh.pts, color: 'brand', labels: sh.labels }], mirror }),
      parts: [pointAns(img[i], `$${L}'$ =`)],
      hints,
      solution: [
        `$${L}$ is at $${ptx(sh.pts[i])}$.`,
        howTo(T),
        subst(T, sh.pts[i]),
        `The image is $${L}'${ptx(img[i])}$.`,
      ],
      calculator: false,
    };
  }
}

/** A translation given by one vertex and its image; find the image of another vertex. */
function translateFromVertex(rng: Rng): Out {
  for (;;) {
    const sh = newShape(rng, rng.sign(), rng.sign(), 6);
    const a = rng.nonZero(-7, 7);
    const b = rng.nonZero(-7, 7);
    const T: Tr = { t: 'move', a, b };
    const img = sh.pts.map((p) => apply(T, p));
    if (!img.every((p) => inGrid(G8, p, 1)) || Math.abs(a) + Math.abs(b) < 4) continue;
    const j = rng.int(1, sh.pts.length - 1);
    const L = sh.labels[j];
    const name = shapeName(sh.labels);
    return {
      prompt: `${cap(sh.what)} is shown as ${sh.labels.length === 3 ? 'triangle' : 'quadrilateral'} $${name}$. It is translated so that vertex $A$ moves to $A'${ptx(img[0])}$. What are the coordinates of $${L}'$?`,
      figure: gridFigure(G8, { shapes: [{ pts: sh.pts, color: 'brand', labels: sh.labels }] }),
      parts: [pointAns(img[j], `$${L}'$ =`)],
      hints: ['In a translation, every vertex moves the same distance in the same direction.', `Find how far $A$ moved across and up or down, then move $${L}$ the same way.`],
      solution: [
        `$A$ is at $${ptx(sh.pts[0])}$ and $A'$ is at $${ptx(img[0])}$.`,
        `Across: $${fmt(img[0][0])} - ${par(sh.pts[0][0])} = ${a}$. Up or down: $${fmt(img[0][1])} - ${par(sh.pts[0][1])} = ${b}$. The rule is $${ruleTex(T)}$.`,
        `$${L}$ is at $${ptx(sh.pts[j])}$. ${subst(T, sh.pts[j])}`,
        `$${L}'$ is at $${ptx(img[j])}$.`,
      ],
      calculator: false,
    };
  }
}

const CONFUSE: Record<string, Tr[]> = {
  rx: [{ t: 'ry' }, { t: 'rot', deg: 180 }, { t: 'rot', deg: 270 }],
  ry: [{ t: 'rx' }, { t: 'rot', deg: 180 }, { t: 'rot', deg: 90 }],
  rot180: [{ t: 'rx' }, { t: 'ry' }, { t: 'rot', deg: 90 }],
  rot90: [{ t: 'rot', deg: 270 }, { t: 'ry' }, { t: 'rot', deg: 180 }],
  rot270: [{ t: 'rot', deg: 90 }, { t: 'rx' }, { t: 'rot', deg: 180 }],
};
const keyOf = (T: Tr) => (T.t === 'rot' ? `rot${T.deg}` : T.t);

/** Which transformation maps the shape to its image? (d2: axes and rotations about the origin.) */
function identifyBasic(rng: Rng): Out {
  for (;;) {
    const sh = newShape(rng, rng.sign(), rng.sign(), 6);
    const T: Tr = rng.pick<Tr>([{ t: 'rx' }, { t: 'ry' }, { t: 'rot', deg: 90 }, { t: 'rot', deg: 180 }, { t: 'rot', deg: 270 }]);
    const img = sh.pts.map((p) => apply(T, p));
    if (!img.every((p) => inGrid(G8, p, 1)) || !apart(sh.pts, img)) continue;
    const others = CONFUSE[keyOf(T)];
    // Every listed choice gives a different image, so exactly one matches the picture.
    if (others.some((o) => same(sh.pts.map((p) => apply(o, p)), img))) continue;
    const flipped = orientation(sh.pts) * orientation(img) < 0;
    const correct = cap(describe(T));
    const A = sh.pts[0];
    const B = sh.pts[1];
    return {
      prompt: `${cap(sh.what)} is shown as $${shapeName(sh.labels)}$. Its image after one transformation is $${shapeName(sh.labels.map((l) => `${l}'`))}$. Which transformation was used?`,
      figure: gridFigure(G8, { shapes: [{ pts: sh.pts, color: 'brand', labels: sh.labels }, { pts: img, color: 'accent', labels: primed(sh.labels) }] }),
      parts: [{ answer: mc(rng, correct, others.map((o) => cap(describe(o)))) }],
      hints: [
        'Trace $A \\to B \\to C$ and then $A\' \\to B\' \\to C\'$. If one goes clockwise and the other counterclockwise, the shape was flipped (a reflection). If both go the same way, it was turned.',
        'Then compare the coordinates of $A$ and $A\'$ and check which rule turns one into the other.',
      ],
      solution: [
        flipped ? 'The image faces the opposite way: the vertices go around in the opposite direction, so the shape was flipped. It is a reflection.' : 'The vertices go around in the same direction in the image, so the shape was not flipped. It is a rotation.',
        `$A${ptx(A)} \\to A'${ptx(img[0])}$ and $B${ptx(B)} \\to B'${ptx(img[1])}$.`,
        `Both fit the rule $${ruleTex(T)}$.`,
        `The transformation is ${describe(T)}.`,
      ],
      calculator: false,
    };
  }
}

/** d3: identify a transformation that may use a line x = k or y = k, a translation, or a quarter turn. */
function identifyDetailed(rng: Rng): Out {
  for (;;) {
    const sh = newShape(rng, rng.sign(), rng.sign(), 6);
    const [x0, x1, y0, y1] = bbox(sh.pts);
    const kind = rng.pick(['rv', 'rh', 'move', 'rot'] as const);
    let T: Tr;
    let others: Tr[];
    if (kind === 'rv' || kind === 'rh') {
      const lo = kind === 'rv' ? x0 : y0;
      const hi = kind === 'rv' ? x1 : y1;
      const k = rng.chance(0.5) ? hi + rng.int(1, 2) : lo - rng.int(1, 2);
      if (k === 0) continue;
      T = kind === 'rv' ? { t: 'rv', k } : { t: 'rh', k };
      const img0 = apply(T, sh.pts[0]);
      const d = kind === 'rv' ? img0[0] - sh.pts[0][0] : img0[1] - sh.pts[0][1];
      const wrongK = rng.pick([2 * k, k + Math.sign(k), k - Math.sign(k)].filter((x) => x !== k && x !== 0));
      others = [
        kind === 'rv' ? { t: 'rv', k: wrongK } : { t: 'rh', k: wrongK },
        kind === 'rv' ? { t: 'move', a: d, b: 0 } : { t: 'move', a: 0, b: d },
        kind === 'rv' ? { t: 'rh', k } : { t: 'rv', k },
      ];
    } else if (kind === 'move') {
      const a = rng.nonZero(-7, 7);
      const b = rng.nonZero(-7, 7);
      if (Math.abs(a) === Math.abs(b)) continue;
      T = { t: 'move', a, b };
      others = [
        { t: 'move', a: -a, b },
        { t: 'move', a, b: -b },
        { t: 'move', a: b, b: a },
      ];
    } else {
      T = { t: 'rot', deg: rng.pick([90, 270] as const) };
      others = [{ t: 'rot', deg: T.deg === 90 ? 270 : 90 }, { t: 'rot', deg: 180 }, rng.pick<Tr>([{ t: 'rx' }, { t: 'ry' }])];
    }
    const img = sh.pts.map((p) => apply(T, p));
    if (!img.every((p) => inGrid(G8, p, 1)) || !apart(sh.pts, img)) continue;
    if (others.some((o) => same(sh.pts.map((p) => apply(o, p)), img))) continue;
    const asRule = kind === 'move' && rng.chance(0.5);
    const text = (o: Tr) => (asRule ? `$${ruleTex(o)}$` : cap(describe(o)));
    const correct = text(T);
    const A = sh.pts[0];
    const B = sh.pts[1];
    const solution: string[] = [];
    if (kind === 'rv' || kind === 'rh') {
      const k = (T as { k: number }).k;
      const v = kind === 'rv' ? 0 : 1;
      solution.push(
        'The image faces the opposite way (the vertices go around in the opposite direction), so it is a reflection.',
        `${kind === 'rv' ? 'Only the $x$-coordinates change' : 'Only the $y$-coordinates change'}, so the mirror line is ${kind === 'rv' ? 'vertical' : 'horizontal'}. It is halfway between each vertex and its image.`,
        `Halfway between $A$ and $A'$: $\\dfrac{${fmt(A[v])} + ${par(img[0][v])}}{2} = ${k}$. Check with $B$: $\\dfrac{${fmt(B[v])} + ${par(img[1][v])}}{2} = ${k}$.`,
        `The transformation is ${describe(T)}.`,
      );
    } else if (kind === 'move') {
      const { a, b } = T as { a: number; b: number };
      solution.push(
        'The image faces the same way and every vertex moved the same distance in the same direction, so it is a translation.',
        `$A${ptx(A)} \\to A'${ptx(img[0])}$: across $${fmt(img[0][0])} - ${par(A[0])} = ${a}$, up or down $${fmt(img[0][1])} - ${par(A[1])} = ${b}$.`,
        `Check with $B$: $B${ptx(B)} \\to B'${ptx(img[1])}$ moves the same way.`,
        `The transformation is ${asRule ? `$${ruleTex(T)}$, ${describe(T)}` : describe(T)}.`,
      );
    } else {
      solution.push(
        'The image faces the same way (not flipped), and it is in a different quadrant, the same distance from the origin. It is a quarter turn about the origin.',
        `$A${ptx(A)} \\to A'${ptx(img[0])}$ and $B${ptx(B)} \\to B'${ptx(img[1])}$ fit the rule $${ruleTex(T)}$.`,
        T.t === 'rot' && T.deg === 90 ? 'A quarter turn to the left: for example, a point in quadrant I moves to quadrant II.' : 'A quarter turn to the right: for example, a point in quadrant I moves to quadrant IV.',
        `The transformation is ${describe(T)}.`,
      );
    }
    return {
      prompt: `${cap(sh.what)} is shown as $${shapeName(sh.labels)}$. After one transformation its image is $${shapeName(sh.labels.map((l) => `${l}'`))}$. Which ${asRule ? 'mapping rule describes' : 'describes'} the transformation?`,
      figure: gridFigure(G8, { shapes: [{ pts: sh.pts, color: 'brand', labels: sh.labels }, { pts: img, color: 'accent', labels: primed(sh.labels) }] }),
      parts: [{ answer: mc(rng, correct, others.map(text)) }],
      hints: [
        'First decide: is the image slid (same direction, same size), flipped (it faces the other way), or turned?',
        kind === 'rv' || kind === 'rh'
          ? 'For a reflection, the mirror line is exactly halfway between each vertex and its image.'
          : 'Compare the coordinates of $A$ and $A\'$, then check your rule with a second vertex.',
      ],
      solution,
      calculator: false,
    };
  }
}

/** d3: two transformations in a row. */
function twoStep(rng: Rng): Out {
  for (;;) {
    const sh = newShape(rng, rng.sign(), rng.sign(), 6);
    const first: Tr = rng.pick<Tr>([{ t: 'rx' }, { t: 'ry' }, { t: 'rot', deg: 90 }, { t: 'rot', deg: 180 }, { t: 'rot', deg: 270 }]);
    const second: Tr = { t: 'move', a: rng.nonZero(-5, 5), b: rng.nonZero(-5, 5) };
    const mid = sh.pts.map((p) => apply(first, p));
    const fin = mid.map((p) => apply(second, p));
    if (!fin.every((p) => inGrid(G8, p)) || !mid.every((p) => inGrid(G8, p))) continue;
    const swap = rng.chance(0.3);
    const [T1, T2] = swap ? [second, first] : [first, second];
    const i = rng.int(0, sh.pts.length - 1);
    const L = sh.labels[i];
    const p = sh.pts[i];
    const m = apply(T1, p);
    const f = apply(T2, m);
    // Skip a step that leaves the point where it was (a point on the mirror line).
    if (!inGrid(G8, m) || !inGrid(G8, f) || (m[0] === p[0] && m[1] === p[1]) || (f[0] === m[0] && f[1] === m[1])) continue;
    const cw = rng.chance(0.6);
    const the = sh.what.replace(/^a /, 'the ');
    const ctx = rng.pick([
      `${rng.pick(NAMES)} uses CAD software to move ${the}`,
      `A designer repositions ${the}`,
      `To lay out a repeating pattern, ${rng.pick(NAMES)} moves ${the}`,
    ]);
    return {
      prompt: `${ctx}, shown as $${shapeName(sh.labels)}$. First the shape is moved by ${describe(T1, cw)}. Then the image is moved by ${describe(T2, cw)}. Where does vertex $${L}$ end up?`,
      figure: gridFigure(G8, { shapes: [{ pts: sh.pts, color: 'brand', labels: sh.labels }] }),
      parts: [pointAns(f, `Final image of $${L}$ =`)],
      hints: ['Do one transformation at a time. Write down where the vertex is after the first one.', 'Apply the second transformation to that new point, not to the original vertex.'],
      solution: [
        `$${L}$ is at $${ptx(p)}$.`,
        `First, ${describe(T1, cw)}. ${howTo(T1)}`,
        `${subst(T1, p)}`,
        `Then, ${describe(T2, cw)}. ${howTo(T2)}`,
        `${subst(T2, m)}`,
        `Vertex $${L}$ ends up at $${ptx(f)}$.`,
      ],
      calculator: false,
    };
  }
}

/** d3: work backward from an image to the original point. */
function reverse(rng: Rng): Out {
  for (;;) {
    const T: Tr = rng.pick<Tr>([{ t: 'rot', deg: 90 }, { t: 'rot', deg: 270 }, { t: 'rot', deg: 270 }, { t: 'rv', k: rng.nonZero(-3, 3) }, { t: 'rh', k: rng.nonZero(-3, 3) }]);
    const p: P = [rng.nonZero(-6, 6), rng.nonZero(-6, 6)];
    const q = apply(T, p);
    if (!inGrid(G8, q, 1) || (q[0] === p[0] && q[1] === p[1])) continue;
    const inv = inverse(T);
    const cw = rng.chance(0.6);
    const ctx = rng.pick([
      'A drafter moved part of a CAD drawing and lost the original. ',
      'A tile setter is checking a pattern on a floor plan. ',
      'A sign maker is checking a logo layout. ',
      '',
    ]);
    const isRot = T.t === 'rot';
    return {
      prompt: `${ctx}After ${describe(T, cw)}, the image of point $Q$ is $Q'${ptx(q)}$. What were the coordinates of $Q$?`,
      parts: [pointAns(p, '$Q$ =')],
      hints: [
        'Work backward: undo the transformation.',
        isRot ? `To undo ${describe(T, cw)}, rotate the same amount the other way: ${describe(inv)}.` : 'A reflection undoes itself: reflect the image in the same line.',
      ],
      solution: [
        isRot ? `To undo ${describe(T, cw)}, apply ${describe(inv)}.` : `Reflecting twice in the same line brings a point back, so reflect $Q'$ in the line ${T.t === 'rv' ? `$x = ${T.k}$` : `$y = ${(T as { k: number }).k}$`}.`,
        howTo(inv),
        subst(inv, q),
        `Check: ${subst(T, p)}. ✓`,
        `The original point was $Q${ptx(p)}$.`,
      ],
      calculator: false,
    };
  }
}

const transform2d = skill({
  id: 'm303-transform-2d',
  name: 'Translations, reflections and rotations',
  description: 'Find image coordinates after a translation, a reflection in an axis or a vertical or horizontal line, or a rotation of 90°, 180° or 270° about the origin, and identify a transformation from a diagram.',
  outcomes: ['G3'],
  lessonId: 'm303-4-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const m = rng.pick(['move', 'move', 'rx', 'ry', 'rot180'] as const);
      return m === 'move' ? translatePoint(rng) : simplePoint(rng, m);
    }
    if (d === 2) {
      const m = rng.pick(['rot', 'rot', 'line', 'from', 'identify', 'identify'] as const);
      if (m === 'rot' || m === 'line') return shapeVertex(rng, m);
      if (m === 'from') return translateFromVertex(rng);
      return identifyBasic(rng);
    }
    const m = rng.pick(['two', 'two', 'reverse', 'identify', 'identify'] as const);
    if (m === 'two') return twoStep(rng);
    if (m === 'reverse') return reverse(rng);
    return identifyDetailed(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Dilations
// ---------------------------------------------------------------------------

/** A length or an area as inline maths: $12\\ \\text{cm}$, $36\\ \\text{cm}^2$. */
const len = (x: number, u: string) => `$${num(clean(x))}\\ \\text{${u}}$`;
const A2 = (x: number, u: string) => `$${num(clean(x))}\\ \\text{${u}}^2$`;

/** Image of a point after a dilation about the origin. */
function dilatePoint(rng: Rng): Out {
  const k = rng.pick([2, 2, 3, 0.5]);
  const { p } = retry(
    () => {
      const lim = k === 3 ? 3 : k === 2 ? 5 : 10;
      let x = rng.nonZero(-lim, lim);
      let y = rng.nonZero(-lim, lim);
      if (k === 0.5) {
        x = 2 * Math.round(x / 2) || 2;
        y = 2 * Math.round(y / 2) || -2;
      }
      return { p: [x, y] as P };
    },
    (o) => Math.abs(o.p[0]) + Math.abs(o.p[1]) >= 3,
    100,
  );
  const q: P = [k * p[0], k * p[1]];
  const G: GridSpec = { xMin: -10, xMax: 10, yMin: -10, yMax: 10, step: 1 };
  const ctx = rng.pick([
    'A sign maker enlarges a logo on a coordinate grid.',
    'A drafter scales a drawing in CAD software.',
    'A quilter changes the size of a block pattern drawn on a grid.',
    'A landscape designer resizes a plan drawn on a grid.',
  ]);
  return {
    prompt: `${ctx.replace('enlarges', k < 1 ? 'shrinks' : 'enlarges')} Point $P$ is dilated about the origin by a scale factor of $${kTex(k)}$. What are the coordinates of the image $P'$?`,
    figure: gridFigure(G, { points: [{ p, label: 'P' }], origin: true }),
    parts: [pointAns(q, "$P'$ =")],
    hints: ['A dilation about the origin multiplies both coordinates by the scale factor.', `$(x, y) \\to (${kTex(k)}x,\\ ${kTex(k)}y)$`],
    solution: [
      `$P$ is at $${ptx(p)}$.`,
      `Multiply both coordinates by $${kTex(k)}$: $(${kTex(k)} \\times ${par(p[0])},\\ ${kTex(k)} \\times ${par(p[1])}) = ${ptx(q)}$.`,
      `The image is $P'${ptx(q)}$. ${k > 1 ? 'It is farther from the origin: an enlargement.' : 'It is closer to the origin: a reduction.'}`,
    ],
    calculator: false,
  };
}

interface DesignCtx {
  thing: string;
  part: string;
  u: string;
  lo: number;
  hi: number;
  ks: number[];
  use: string;
}
const DESIGNS: DesignCtx[] = [
  { thing: 'a company logo', part: 'the width of the logo', u: 'cm', lo: 4, hi: 16, ks: [3, 4, 5, 2.5, 6], use: 'to fit a sign over the shop door' },
  { thing: 'a ceramic tile pattern', part: 'one side of the tile', u: 'cm', lo: 10, hi: 30, ks: [0.5, 0.25, 1.5, 2], use: 'for a mosaic' },
  { thing: 'a quilt block', part: 'one side of the block', u: 'in', lo: 6, hi: 12, ks: [1.5, 2, 0.5, 2.5], use: 'for a bed quilt' },
  { thing: 'a decal design', part: 'the length of the decal', u: 'cm', lo: 8, hi: 24, ks: [2, 3, 0.5, 1.5], use: 'for the side of a work truck' },
  { thing: 'a stencil for a parking-lot sign', part: 'the height of a letter', u: 'cm', lo: 6, hi: 20, ks: [4, 5, 2.5, 3], use: 'to paint on the pavement' },
];

/** A length after a dilation (d1) or the scale factor from two lengths (d1). */
function lengthItem(rng: Rng, ask: 'image' | 'k'): Out {
  const c = rng.pick(DESIGNS);
  const k = rng.pick(c.ks);
  const unitStep = c.u === 'in' ? 0.5 : 1;
  const s = retry(
    () => rng.int(c.lo / unitStep, c.hi / unitStep) * unitStep,
    (v) => Number.isInteger(clean(v * k * 4)) && v * k >= 1,
    100,
  );
  const img = clean(s * k);
  const word = k > 1 ? 'enlargement' : 'reduction';
  if (ask === 'image') {
    return {
      prompt: `${rng.pick(NAMES)} makes ${k > 1 ? 'a larger' : 'a smaller'} copy of ${c.thing} ${c.use} using a dilation with scale factor $${kTex(k, false)}$. On the original, ${c.part} is ${len(s, c.u)}. What is it on the copy?`,
      parts: [numPart(img, { suffix: c.u, ...(c.u === 'in' ? { display: 'fraction' as const } : {}) })],
      hints: ['Every length in the image is the original length times the scale factor.', `Multiply ${len(s, c.u)} by $${kTex(k, false)}$.`],
      solution: [`Image length $=$ scale factor $\\times$ original length.`, `$${kTex(k, false)} \\times ${num(s)} = ${num(img)}$`, `On the copy, ${c.part} is ${len(img, c.u)}.`],
      calculator: true,
    };
  }
  return {
    prompt: `On the original ${c.thing.replace(/^an? /, '')}, ${c.part} is ${len(s, c.u)}. On a copy made ${c.use}, it is ${len(img, c.u)}. What scale factor was used? Is the copy an enlargement or a reduction?`,
    parts: [numPart(k, { label: '$k =$' }), { label: 'The copy is', answer: fixedChoice(['an enlargement', 'a reduction', 'the same size as the original'], word === 'enlargement' ? 0 : 1) }],
    hints: ['Scale factor $=\\dfrac{\\text{image length}}{\\text{original length}}$.', 'A scale factor greater than $1$ is an enlargement; between $0$ and $1$ is a reduction.'],
    solution: [
      `$k = \\dfrac{\\text{image length}}{\\text{original length}} = \\dfrac{${num(img)}}{${num(s)}} = ${num(k)}$`,
      `$${num(k)} ${k > 1 ? '> 1' : '< 1'}$, so the copy is ${word === 'enlargement' ? 'an enlargement' : 'a reduction'}.`,
      `The scale factor is $${num(k)}$${k < 1 ? ` (that is, $${kTex(k)}$)` : ''}, ${word === 'enlargement' ? 'an enlargement' : 'a reduction'}.`,
    ],
    calculator: true,
  };
}

/** d2: image of a vertex of a shape on a grid. */
function dilateVertex(rng: Rng): Out {
  for (;;) {
    const k = rng.pick([1.5, 2.5, 0.5, 2, 3]);
    const t = orient(rng, rng.pick(TEMPLATES));
    // Coordinates that k turns into whole numbers.
    const m = k === 1.5 || k === 2.5 || k === 0.5 ? 2 : 1;
    const dx = rng.int(0, 3);
    const dy = rng.int(0, 3);
    const pts = t.map(([x, y]) => [m * (x + dx), m * (y + dy)] as P);
    const img = pts.map(([x, y]) => [k * x, k * y] as P);
    const all = [...pts, ...img];
    const top = Math.max(...all.flatMap((p) => p));
    if (top > 15 || pts.some(([x, y]) => x === 0 && y === 0)) continue;
    const G: GridSpec = { xMin: 0, xMax: top <= 10 ? 10 : 15, yMin: 0, yMax: top <= 10 ? 10 : 15, step: 1 };
    const labels = [...LETTERS.slice(0, pts.length)];
    const i = rng.int(0, pts.length - 1);
    const Lb = labels[i];
    const ctx = rng.pick(['a floor plan of a room', 'a logo', 'a quilt block', 'a tile design', 'a garden bed on a site plan']);
    return {
      prompt: `${cap(ctx.replace(/^a /, 'A '))} is drawn on a grid as $${labels.join('')}$. It is dilated about the origin by a scale factor of $${num(k)}$. What are the coordinates of $${Lb}'$?`,
      figure: gridFigure(G, { shapes: [{ pts, color: 'brand', labels }], origin: true }),
      parts: [pointAns(img[i], `$${Lb}'$ =`)],
      hints: ['A dilation about the origin multiplies both coordinates by the scale factor.', `Read the coordinates of $${Lb}$, then multiply each by $${num(k)}$.`],
      solution: [
        `$${Lb}$ is at $${ptx(pts[i])}$.`,
        `$(${num(k)} \\times ${pts[i][0]},\\ ${num(k)} \\times ${pts[i][1]}) = ${ptx(img[i])}$`,
        `$${Lb}'$ is at $${ptx(img[i])}$.`,
      ],
      calculator: true,
    };
  }
}

/** d2: read the scale factor from a picture of a shape and its image. */
function kFromGrid(rng: Rng): Out {
  for (;;) {
    const k = rng.pick([2, 3, 0.5, 1.5, 2.5]);
    const t = orient(rng, rng.pick(TEMPLATES));
    const m = k === 0.5 ? 2 : k === 1.5 || k === 2.5 ? 2 : 1;
    const dx = rng.int(0, 3);
    const dy = rng.int(0, 3);
    const pts = t.map(([x, y]) => [m * (x + dx), m * (y + dy)] as P);
    const img = pts.map(([x, y]) => [k * x, k * y] as P);
    const top = Math.max(...[...pts, ...img].flatMap((p) => p));
    if (top > 15 || pts.some(([x, y]) => x === 0 && y === 0)) continue;
    // A vertex with a non-zero x-coordinate to divide by.
    const i = pts.findIndex((p) => p[0] !== 0);
    if (i < 0) continue;
    const G: GridSpec = { xMin: 0, xMax: top <= 10 ? 10 : 15, yMin: 0, yMax: top <= 10 ? 10 : 15, step: 1 };
    const labels = [...LETTERS.slice(0, pts.length)];
    const word = k > 1 ? 'an enlargement' : 'a reduction';
    return {
      prompt: `Shape $${labels.join('')}$ was dilated about the origin to give $${labels.map((l) => `${l}'`).join('')}$. What is the scale factor?`,
      figure: gridFigure(G, { shapes: [{ pts, color: 'brand', labels }, { pts: img, color: 'accent', labels: primed(labels) }], origin: true }),
      parts: [numPart(k, { label: '$k =$' })],
      hints: ['For a dilation about the origin, each image coordinate is $k$ times the original coordinate.', `Divide a coordinate of $${labels[i]}'$ by the matching coordinate of $${labels[i]}$, or compare the lengths of matching sides.`],
      solution: [
        `$${labels[i]}${ptx(pts[i])} \\to ${labels[i]}'${ptx(img[i])}$`,
        `$k = \\dfrac{${num(img[i][0])}}{${pts[i][0]}} = ${num(k)}$`,
        `Check another vertex: $${labels[(i + 1) % pts.length]}${ptx(pts[(i + 1) % pts.length])} \\to ${ptx(img[(i + 1) % pts.length])}$ also multiplies by $${num(k)}$.`,
        `The scale factor is $${num(k)}$${k < 1 ? ` (that is, $${kTex(k)}$)` : ''}, ${word}.`,
      ],
      calculator: false,
    };
  }
}

/** Area of an image: original area × k². */
function areaItem(rng: Rng, d: 2 | 3): Out {
  const c = rng.pick([
    { thing: 'A logo on a company letterhead', u: 'cm', use: 'for a trade-show banner', ks: [5, 8, 10, 2.5, 4] },
    { thing: 'A quilt block', u: 'in', use: 'for a larger quilt', ks: [1.5, 2, 2.5] },
    { thing: 'A floor tile design', u: 'cm', use: 'for a feature wall', ks: [2, 3, 1.5, 0.5] },
    { thing: 'A window decal', u: 'cm', use: 'for a storefront window', ks: [2, 3, 4, 2.5] },
    { thing: 'A stained-glass panel pattern', u: 'cm', use: 'for a smaller cabinet door', ks: [0.5, 0.25, 0.75] },
  ]);
  const k = rng.pick(c.ks);
  if (d === 2) {
    const A = rng.int(6, 60) * (k === 0.25 || k === 0.75 ? 16 : k === 0.5 || k === 1.5 || k === 2.5 ? 4 : 1);
    const img = clean(A * k * k);
    return {
      prompt: `${c.thing} has an area of ${A2(A, c.u)}. It is dilated by a scale factor of $${num(k)}$ ${c.use}. What is the area of the image?`,
      parts: [numPart(img, { suffix: `${c.u}²` })],
      hints: ['When every length is multiplied by $k$, the area is multiplied by $k^2$.', `Multiply ${A2(A, c.u)} by $${num(k)}^2$.`],
      solution: [
        `Lengths are multiplied by $${num(k)}$, so the area is multiplied by $${num(k)}^2 = ${num(k * k)}$.`,
        `$${num(A)} \\times ${num(k * k)} = ${num(img)}$`,
        `The image has an area of ${A2(img, c.u)}.`,
      ],
      calculator: true,
    };
  }
  // d3: find k from the two areas, then a length.
  const kk = rng.pick(c.ks);
  const A = rng.int(2, 25) * 16;
  const img = clean(A * kk * kk);
  const side = rng.int(2, 9) * 4;
  return {
    prompt: `${c.thing} has an area of ${A2(A, c.u)}. A dilated copy made ${c.use} has an area of ${A2(img, c.u)}. One edge of the original is ${len(side, c.u)}. What is the scale factor, and how long is the matching edge of the copy?`,
    parts: [numPart(kk, { label: '$k =$' }), numPart(clean(kk * side), { label: 'Edge', suffix: c.u, ...(c.u === 'in' ? { display: 'fraction' as const } : {}) })],
    hints: ['The area of the image is $k^2$ times the area of the original.', 'Divide the areas to find $k^2$, then take the square root to find $k$. Multiply the edge by $k$.'],
    solution: [
      `$k^2 = \\dfrac{${num(img)}}{${num(A)}} = ${num(kk * kk)}$`,
      `$k = \\sqrt{${num(kk * kk)}} = ${num(kk)}$`,
      `Edge of the copy: $${num(kk)} \\times ${side} = ${num(clean(kk * side))}$`,
      `The scale factor is $${num(kk)}$ and the matching edge is ${len(clean(kk * side), c.u)}.`,
    ],
    calculator: true,
  };
}

const MODELS = [
  { thing: 'a grain truck', n: 24, lo: 700, hi: 960, part: 'length' },
  { thing: 'a pickup truck', n: 24, lo: 480, hi: 600, part: 'length' },
  { thing: 'a tractor', n: 32, lo: 450, hi: 700, part: 'length' },
  { thing: 'a rail tank car', n: 87, lo: 1400, hi: 1800, part: 'length' },
  { thing: 'a house', n: 50, lo: 900, hi: 1600, part: 'width' },
  { thing: 'a grain bin', n: 48, lo: 600, hi: 1200, part: 'height' },
  { thing: 'a pump jack', n: 40, lo: 600, hi: 1000, part: 'height' },
];

/** d2 scale models: the model's scale factor is 1/n. */
function modelItem(rng: Rng): Out {
  const c = rng.pick(MODELS);
  const toModel = rng.chance(0.5);
  // The model length is a whole number of millimetres and the real length a whole number of centimetres.
  const model = retry(
    () => rng.int(Math.ceil((c.lo / c.n) * 10), Math.floor((c.hi / c.n) * 10)) / 10,
    (v) => Number.isInteger(clean(v * c.n)),
    200,
  );
  const actual = clean(model * c.n);
  const actualM = clean(actual / 100);
  if (toModel) {
    return {
      prompt: `A hobby shop sells a scale model of ${c.thing}. The model is a dilation of the real ${c.thing.replace(/^an? /, '')} with scale factor $\\frac{1}{${c.n}}$ (a scale of $1 : ${c.n}$). The real ${c.part} is ${len(actualM, 'm')}. What is the ${c.part} of the model, in centimetres?`,
      parts: [numPart(model, { suffix: 'cm' })],
      hints: ['Change the real length to centimetres first: multiply metres by $100$.', `Multiply by the scale factor $\\frac{1}{${c.n}}$, which is the same as dividing by $${c.n}$.`],
      solution: [`$${num(actualM)}\\ \\text{m} = ${num(actualM)} \\times 100 = ${num(actual)}\\ \\text{cm}$`, `$${num(actual)} \\div ${c.n} = ${num(model)}$`, `The model's ${c.part} is ${len(model, 'cm')}.`],
      calculator: true,
    };
  }
  return {
    prompt: `A scale model of ${c.thing} is built with a scale factor of $\\frac{1}{${c.n}}$ (a scale of $1 : ${c.n}$). The model's ${c.part} is ${len(model, 'cm')}. What is the real ${c.part}, in metres?`,
    parts: [numPart(actualM, { suffix: 'm' })],
    hints: [`The real object is $${c.n}$ times as large as the model.`, `Multiply by $${c.n}$ to get centimetres, then divide by $100$ to get metres.`],
    solution: [`Real ${c.part}: $${num(model)} \\times ${c.n} = ${num(actual)}\\ \\text{cm}$`, `$${num(actual)} \\div 100 = ${num(actualM)}$`, `The real ${c.part} is ${len(actualM, 'm')}.`],
    calculator: true,
  };
}

/** d3: actual area from a floor plan, or a model's area scaled up. */
function planArea(rng: Rng): Out {
  const mode = rng.pick(['plan', 'plan', 'copy', 'model'] as const);
  const room = rng.pick(['a living room', 'a shop floor', 'a garage', 'a classroom', 'a restaurant kitchen', 'a bedroom']);
  const place = rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Westbury']);
  if (mode === 'plan') {
    const n = rng.pick([50, 100, 200]);
    // Plan lengths in tenths of a centimetre giving real lengths of 3 m to 15 m.
    const lo = Math.ceil((300 / n) * 10);
    const hi = Math.floor((1500 / n) * 10);
    const a = rng.int(lo, hi) / 10;
    const b = rng.int(lo, hi) / 10;
    const ra = clean((a * n) / 100);
    const rb = clean((b * n) / 100);
    const area = clean(ra * rb);
    return {
      prompt: `The floor plan of ${room} in ${place} is drawn with a scale factor of $\\frac{1}{${n}}$ (a scale of $1 : ${n}$). On the plan, the room is ${len(a, 'cm')} by ${len(b, 'cm')}. What is the actual area of the room, in square metres?`,
      parts: [numPart(area, { suffix: 'm²' })],
      hints: [`Each centimetre on the plan is $${n}\\ \\text{cm}$ in real life. Find the real length and width in metres first.`, 'Then multiply the real length by the real width.'],
      solution: [
        `Real length: $${num(a)} \\times ${n} = ${num(clean(a * n))}\\ \\text{cm} = ${num(ra)}\\ \\text{m}$`,
        `Real width: $${num(b)} \\times ${n} = ${num(clean(b * n))}\\ \\text{cm} = ${num(rb)}\\ \\text{m}$`,
        `Area: $${num(ra)} \\times ${num(rb)} = ${num(area)}$`,
        `The room has an area of $${num(area)}\\ \\text{m}^2$.`,
      ],
      calculator: true,
    };
  }
  if (mode === 'copy') {
    const pct = rng.pick([150, 200, 250, 50]);
    const k = pct / 100;
    const a = rng.int(8, 30);
    const b = rng.int(6, 24);
    const area = clean(a * b);
    const img = clean(area * k * k);
    return {
      prompt: `A contractor in ${place} photocopies the plan of ${room} at $${pct}\\%$ (a dilation with scale factor $${num(k)}$). On the original plan the room is ${len(a, 'cm')} by ${len(b, 'cm')}. What is the area of the room on the copy?`,
      parts: [numPart(img, { suffix: 'cm²' })],
      hints: [`A copy at $${pct}\\%$ multiplies every length by $${num(k)}$.`, `Find the area on the original, then multiply by $${num(k)}^2$ (or find the new length and width first).`],
      solution: [
        `Area on the original: $${num(a)} \\times ${num(b)} = ${num(area)}\\ \\text{cm}^2$`,
        `Area scale factor: $${num(k)}^2 = ${num(k * k)}$`,
        `$${num(area)} \\times ${num(k * k)} = ${num(img)}$`,
        `On the copy, the room has an area of $${num(img)}\\ \\text{cm}^2$.`,
      ],
      calculator: true,
    };
  }
  const c = rng.pick([
    { thing: 'a machine shed', n: 50, part: 'roof' },
    { thing: 'a barn', n: 48, part: 'roof' },
    { thing: 'a garage', n: 24, part: 'floor' },
    { thing: 'a gazebo', n: 20, part: 'floor' },
  ]);
  const model = rng.int(60, 400);
  const cm2 = model * c.n * c.n;
  const m2 = clean(cm2 / 10000);
  return {
    prompt: `An architecture student builds a model of ${c.thing} with a scale factor of $\\frac{1}{${c.n}}$. The ${c.part} of the model has an area of $${model}\\ \\text{cm}^2$. What is the area of the real ${c.part}, in square metres?`,
    parts: [numPart(m2, { suffix: 'm²' })],
    hints: [`Lengths on the real ${c.thing.replace(/^an? /, '')} are $${c.n}$ times the model's, so areas are $${c.n}^2$ times as large.`, 'Then change square centimetres to square metres: $1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$.'],
    solution: [
      `Area scale factor: $${c.n}^2 = ${c.n * c.n}$`,
      `$${model} \\times ${c.n * c.n} = ${cm2}\\ \\text{cm}^2$`,
      `$${cm2} \\div 10\\,000 = ${num(m2)}$`,
      `The real ${c.part} has an area of $${num(m2)}\\ \\text{m}^2$.`,
    ],
    calculator: true,
  };
}

/** d3: a rectangle on a grid dilated about the origin; perimeter and area of the image. */
function gridAreaItem(rng: Rng): Out {
  for (;;) {
    const k = rng.pick([2, 3, 1.5, 2.5]);
    const m = k === 1.5 || k === 2.5 ? 2 : 1;
    const w = m * rng.int(1, 3);
    const h = m * rng.int(1, 3);
    const x0 = m * rng.int(0, 2);
    const y0 = m * rng.int(0, 2);
    if (w === h) continue;
    const pts: P[] = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]];
    const img = pts.map(([x, y]) => [k * x, k * y] as P);
    const top = Math.max(...img.flatMap((p) => p));
    if (top > 15 || (x0 === 0 && y0 === 0)) continue;
    const G: GridSpec = { xMin: 0, xMax: top <= 10 ? 10 : 15, yMin: 0, yMax: top <= 10 ? 10 : 15, step: 1 };
    const labels = ['A', 'B', 'C', 'D'];
    const P0 = 2 * (w + h);
    const A0 = w * h;
    const ctx = rng.pick(['a solar panel on a roof plan', 'a window on an elevation drawing', 'a sign on a storefront drawing', 'a garden bed on a landscape plan']);
    return {
      prompt: `Rectangle $ABCD$ shows ${ctx}. Each grid square is $1\\ \\text{m}$ on a side. The rectangle is dilated about the origin by a scale factor of $${num(k)}$. Find the perimeter and the area of the image $A'B'C'D'$.`,
      figure: gridFigure(G, { shapes: [{ pts, color: 'brand', labels }], origin: true }),
      parts: [numPart(clean(k * P0), { label: 'Perimeter', suffix: 'm' }), numPart(clean(k * k * A0), { label: 'Area', suffix: 'm²' })],
      hints: ['Find the length and width of $ABCD$ by counting squares.', `The perimeter is multiplied by $k$, and the area by $k^2$.`],
      solution: [
        `$ABCD$ is $${w}\\ \\text{m}$ by $${h}\\ \\text{m}$: perimeter $2(${w} + ${h}) = ${P0}\\ \\text{m}$, area $${w} \\times ${h} = ${A0}\\ \\text{m}^2$.`,
        `Perimeter of the image: $${num(k)} \\times ${P0} = ${num(clean(k * P0))}\\ \\text{m}$`,
        `Area of the image: $${num(k)}^2 \\times ${A0} = ${num(k * k)} \\times ${A0} = ${num(clean(k * k * A0))}\\ \\text{m}^2$`,
        `Check: the image is $${num(k * w)}\\ \\text{m}$ by $${num(k * h)}\\ \\text{m}$, so the perimeter is ${len(clean(k * P0), 'm')} and the area is $${num(clean(k * k * A0))}\\ \\text{m}^2$.`,
      ],
      calculator: true,
    };
  }
}

const dilation = skill({
  id: 'm303-dilation',
  name: 'Dilations',
  description: 'Find image points of a dilation about the origin, image lengths and areas, and scale factors, and use scale factors with logos, tiles, quilt blocks, floor plans and scale models.',
  outcomes: ['G3'],
  lessonId: 'm303-4-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const m = rng.pick(['point', 'point', 'image', 'k'] as const);
      return m === 'point' ? dilatePoint(rng) : lengthItem(rng, m);
    }
    if (d === 2) {
      const m = rng.pick(['vertex', 'kgrid', 'area', 'model'] as const);
      if (m === 'vertex') return dilateVertex(rng);
      if (m === 'kgrid') return kFromGrid(rng);
      if (m === 'area') return areaItem(rng, 2);
      return modelItem(rng);
    }
    const m = rng.pick(['plan', 'plan', 'karea', 'grid'] as const);
    if (m === 'plan') return planArea(rng);
    if (m === 'karea') return areaItem(rng, 3);
    return gridAreaItem(rng);
  },
});

export const TRANSFORMATIONS_SKILLS: SkillDef[] = [transform2d, dilation];
