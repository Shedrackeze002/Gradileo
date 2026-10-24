/** Math 8 Unit 8 — Surface Area and Volume (SS2, SS3, SS4, SS5): views of objects made of cubes, nets, and the surface area and volume of prisms and cylinders. */
import { fixedChoice, mc, mcFigures, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, CubesFigure, Figure, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef, SolidFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Cody', 'Talia', 'Yusuf', 'Brooklyn', 'Sanjay', 'Tanis',
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Remove floating-point noise from an exact decimal result. */
const exact = (x: number) => roundTo(x, 6);

function withGroups(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return `${g}${f ? `.${f}` : ''}`;
}
/** LaTeX number, trailing zeros dropped, thin-space groups for 5+ digits. */
const n = (x: number, dec = 4) => withGroups(fmt(x, dec));
/** LaTeX number with exactly `dec` decimals. */
const nf = (x: number, dec: number) => withGroups(fmtFixed(x, dec));
const sq = (u: string) => `\\ \\text{${u}}^2`;
const cu = (u: string) => `\\ \\text{${u}}^3`;
const un = (u: string) => `\\ \\text{${u}}`;
/** Measurement in maths: $12\ \text{cm}$. */
const len = (x: number, u: string) => `$${n(x)}${un(u)}$`;
const LETTERS = 'ABCD';

/** The letter (A, B, C, D) of the correct choice. */
function letterOf(a: AnswerSpec): string {
  return a.kind === 'mc' ? LETTERS[a.choices.findIndex((c) => c.id === a.correct)] : 'A';
}

/** True when rounding to `dec` places sits close to a ...5 boundary. */
function nearHalf(v: number, dec: number): boolean {
  const x = Math.abs(v) * 10 ** dec;
  return Math.abs(x - Math.floor(x) - 0.5) < 0.06;
}

/** Money for Markdown text, kept outside maths. */
function cash(x: number): string {
  return `\\$${fmtFixed(x, 2)}`;
}

/** Answer rounded to `dec` places. */
const rPart = (v: number, dec: number, suffix: string, label?: string): Part => numPart(v, { decimals: dec, suffix, label });
/** Exact answer, shown as a decimal on review screens. */
const xPart = (v: number, suffix: string, label?: string): Part => numPart(exact(v), { suffix, label, display: 'decimal' });

const ROUND_WORD = ['whole number', 'tenth', 'hundredth'];
const roundSq = (dec: number, u: string) => (dec === 0 ? `to the nearest square ${UNIT_WORD[u]}` : `to the nearest ${ROUND_WORD[dec]} of a square ${UNIT_WORD[u]}`);
const roundCu = (dec: number, u: string) => (dec === 0 ? `to the nearest cubic ${UNIT_WORD[u]}` : `to the nearest ${ROUND_WORD[dec]} of a cubic ${UNIT_WORD[u]}`);
const UNIT_WORD: Record<string, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre' };

// ---------------------------------------------------------------------------
// Plane drawings: polygons, segments and labels placed clear of every line
// ---------------------------------------------------------------------------

export type P = [number, number];
export type Color = 'brand' | 'accent' | 'muted';
const r3 = (x: number) => Math.round(x * 1000) / 1000;
/** Width in px of the plot area of a plane figure (380 px wide, no axis titles). */
const PLOT_W = 340;

function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' ? 3.5 : ch === '.' || ch === ',' ? 4 : /[mMwW]/.test(ch) ? 10.5 : /[il1]/.test(ch) ? 4.5 : 7.4;
  return w;
}

interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/** Does segment ab meet the box? (Liang–Barsky) */
function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const tests: Array<[number, number]> = [
    [-dx, a[0] - box.x0],
    [dx, box.x1 - a[0]],
    [-dy, a[1] - box.y0],
    [dy, box.y1 - a[1]],
  ];
  for (const [p, q] of tests) {
    if (Math.abs(p) < 1e-12) {
      if (q < 0) return false;
      continue;
    }
    const t = q / p;
    if (p < 0) t0 = Math.max(t0, t);
    else t1 = Math.min(t1, t);
    if (t0 > t1) return false;
  }
  return true;
}

function distPtSeg(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

function inPoly(p: P, poly: P[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

interface LabelReq {
  text: string;
  /** Candidate centres, given the scale in px per unit. */
  cands: (ppu: number) => P[];
}

/**
 * Collects filled polygons, segments and labels, then lays them out on a blank canvas. Each label is
 * drawn by an invisible point and placed where its text stays clear of every line.
 */
export class Drawing {
  polys: Array<{ points: P[]; color: Color; fill: boolean }> = [];
  segs: PlaneSegment[] = [];
  labels: LabelReq[] = [];
  extra: P[] = [];

  poly(points: P[], color: Color = 'brand', fill = true) {
    const closed = points[0][0] === points[points.length - 1][0] && points[0][1] === points[points.length - 1][1];
    this.polys.push({ points: closed ? points : [...points, points[0]], color, fill });
    return this;
  }

  /** An open polyline (not filled). */
  line(points: P[], color: Color = 'brand') {
    this.polys.push({ points, color, fill: false });
    return this;
  }

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    return this;
  }

  /** Label near point p, preferably in direction `dir` (degrees). */
  label(text: string, p: P, dir: number, minPx = 12) {
    this.labels.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        const at = (off: number, d: number) => {
          const a = ((dir + off) * Math.PI) / 180;
          const w = textWidth(text) / 2;
          // Push the centre out by the half-size of the text box in that direction.
          const ext = Math.abs(Math.cos(a)) * (w + 2) + Math.abs(Math.sin(a)) * 7;
          out.push([p[0] + (Math.cos(a) * (d + ext)) / ppu, p[1] + (Math.sin(a) * (d + ext)) / ppu]);
        };
        const ds = [minPx, minPx + 4, minPx + 9, minPx + 15, minPx + 22, minPx + 30, minPx + 40];
        // Close to the preferred direction first (even a little further out), then anywhere around.
        for (const off of [0, 20, -20, 40, -40]) for (const d of ds) at(off, d);
        for (const d of ds) for (const off of [65, -65, 90, -90, 130, -130, 180]) at(off, d);
        return out;
      },
    });
    return this;
  }

  /** Label inside an angle at vertex p, along the direction `dir` (degrees) into the angle. */
  angleLabel(text: string, p: P, dir: number, minPx = 14) {
    this.labels.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (let d = minPx; d <= minPx + 60; d += 5)
          for (const off of [0, 8, -8, 15, -15]) {
            const a = ((dir + off) * Math.PI) / 180;
            const w = textWidth(text) / 2;
            const ext = Math.abs(Math.cos(a)) * (w + 2) + Math.abs(Math.sin(a)) * 7;
            out.push([p[0] + (Math.cos(a) * (d + ext)) / ppu, p[1] + (Math.sin(a) * (d + ext)) / ppu]);
          }
        return out;
      },
    });
    return this;
  }

  /** Label centred on p (inside a face), nudged only if needed. */
  centre(text: string, p: P) {
    this.labels.push({
      text,
      cands: (ppu) => {
        const out: P[] = [p];
        for (let r = 3; r <= 30; r += 3) for (let a = 0; a < 360; a += 30) out.push([p[0] + (r * Math.cos((a * Math.PI) / 180)) / ppu, p[1] + (r * Math.sin((a * Math.PI) / 180)) / ppu]);
        return out;
      },
    });
    return this;
  }

  include(p: P) {
    this.extra.push(p);
    return this;
  }

  private edges(): Array<[P, P]> {
    const out: Array<[P, P]> = [];
    for (const pl of this.polys) for (let i = 0; i + 1 < pl.points.length; i++) out.push([pl.points[i], pl.points[i + 1]]);
    for (const s of this.segs) out.push([s.from, s.to]);
    return out;
  }

  bbox(): Box {
    const pts: P[] = [...this.polys.flatMap((p) => p.points), ...this.segs.flatMap((s) => [s.from, s.to]), ...this.extra];
    return {
      x0: Math.min(...pts.map((p) => p[0])),
      x1: Math.max(...pts.map((p) => p[0])),
      y0: Math.min(...pts.map((p) => p[1])),
      y1: Math.max(...pts.map((p) => p[1])),
    };
  }

  /** Place the labels for a figure `xr` units wide; returns the label points and their boxes. */
  private place(xr: number): { points: PlanePoint[]; boxes: Box[] } {
    const ppu = PLOT_W / xr;
    const edges = this.edges();
    const boxes: Box[] = [];
    const points: PlanePoint[] = [];
    for (const lab of this.labels) {
      const w = textWidth(lab.text);
      const hw = (w / 2 + 2) / ppu;
      const hh = 7 / ppu;
      const cands = lab.cands(ppu);
      // Take the first spot with no clash; if every spot clashes, the one with the fewest.
      let chosen = cands[0];
      let best = Infinity;
      for (const c of cands) {
        const box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh };
        const anchor: P = [c[0] - (8 + w / 2) / ppu, c[1] - 12.4 / ppu];
        const pad = 3 / ppu;
        const bad =
          3 * edges.filter(([a, b]) => segHitsBox(a, b, box)).length +
          edges.filter(([a, b]) => distPtSeg(anchor, a, b) < 6 / ppu).length +
          // The invisible anchor dot would show as a white spot on a shaded face.
          this.polys.filter((pl) => pl.fill && inPoly(anchor, pl.points)).length +
          3 * boxes.filter((o) => !(box.x1 + pad < o.x0 || o.x1 + pad < box.x0 || box.y1 + pad < o.y0 || o.y1 + pad < box.y0)).length;
        if (bad < best) {
          best = bad;
          chosen = c;
        }
        if (bad === 0) break;
      }
      const box = { x0: chosen[0] - hw, x1: chosen[0] + hw, y0: chosen[1] - hh, y1: chosen[1] + hh };
      boxes.push(box);
      const anchor: P = [chosen[0] - (8 + w / 2) / ppu, chosen[1] - 12.4 / ppu];
      boxes.push({ x0: anchor[0] - 5 / ppu, x1: anchor[0] + 5 / ppu, y0: anchor[1] - 5 / ppu, y1: anchor[1] + 5 / ppu });
      points.push({ x: r3(anchor[0]), y: r3(anchor[1]), label: lab.text, color: 'muted', open: true });
    }
    return { points, boxes };
  }

  /** Lay out the figure on a fixed grid of unit squares (no axes or numbers). */
  buildGrid(xMin: number, xMax: number, yMin: number, yMax: number): PlaneFigure {
    const placed = this.place(xMax - xMin);
    return {
      type: 'plane',
      grid: { xMin, xMax, yMin, yMax, step: 1 },
      hideTickLabels: true,
      hideAxes: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(([x, y]) => [r3(x), r3(y)] as P), color: p.color, ...(p.fill && { fill: true }) })),
      ...(this.segs.length && { segments: this.segs.map((s) => ({ ...s, from: [r3(s.from[0]), r3(s.from[1])] as P, to: [r3(s.to[0]), r3(s.to[1])] as P })) }),
      ...(placed.points.length && { points: placed.points }),
    };
  }

  /** Lay out the figure on a blank canvas, at least `min` = [width, height] units. */
  build(opts: { margin?: number; caption?: string; min?: [number, number] } = {}): PlaneFigure {
    const m = opts.margin ?? 0.3;
    const g = this.bbox();
    let box = { x0: g.x0 - m, x1: g.x1 + m, y0: g.y0 - m, y1: g.y1 + m };
    /** At least as wide as it is tall, so a tall drawing does not fill the page. */
    const square = (b: Box) => {
      const wd = b.x1 - b.x0;
      const ht = b.y1 - b.y0;
      return ht > wd ? { ...b, x0: b.x0 - (ht - wd) / 2, x1: b.x1 + (ht - wd) / 2 } : b;
    };
    const grow = (b: Box) => {
      if (!opts.min) return b;
      const [mw, mh] = opts.min;
      const cx = (b.x0 + b.x1) / 2;
      const cy = (b.y0 + b.y1) / 2;
      return { x0: Math.min(b.x0, cx - mw / 2), x1: Math.max(b.x1, cx + mw / 2), y0: Math.min(b.y0, cy - mh / 2), y1: Math.max(b.y1, cy + mh / 2) };
    };
    box = grow(box);
    box = square(box);
    let placed = this.place(box.x1 - box.x0);
    for (let k = 0; k < 4; k++) {
      const all = [box, ...placed.boxes.map((b) => ({ x0: b.x0 - 0.1, x1: b.x1 + 0.1, y0: b.y0 - 0.1, y1: b.y1 + 0.1 }))];
      const nb = square(grow({ x0: Math.min(...all.map((b) => b.x0)), x1: Math.max(...all.map((b) => b.x1)), y0: Math.min(...all.map((b) => b.y0)), y1: Math.max(...all.map((b) => b.y1)) }));
      if (Math.abs(nb.x1 - nb.x0 - (box.x1 - box.x0)) < 1e-6 && Math.abs(nb.y1 - nb.y0 - (box.y1 - box.y0)) < 1e-6) break;
      box = nb;
      placed = this.place(box.x1 - box.x0);
    }
    const xr = box.x1 - box.x0;
    const yr = box.y1 - box.y0;
    return {
      type: 'plane',
      grid: { xMin: r3(box.x0), xMax: r3(box.x1), yMin: r3(box.y0), yMax: r3(box.y1), step: r3(Math.max(xr, yr) + 0.01) },
      hideTickLabels: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(([x, y]) => [r3(x), r3(y)] as P), color: p.color, ...(p.fill && { fill: true }) })),
      ...(this.segs.length && { segments: this.segs.map((s) => ({ ...s, from: [r3(s.from[0]), r3(s.from[1])] as P, to: [r3(s.to[0]), r3(s.to[1])] as P })) }),
      ...(placed.points.length && { points: placed.points }),
      ...(opts.caption && { caption: opts.caption }),
    };
  }
}

const rectPts = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
  [x, y],
];

function circlePts(cx: number, cy: number, r: number, k = 36): P[] {
  const out: P[] = [];
  for (let i = 0; i <= k; i++) out.push([cx + r * Math.cos((2 * Math.PI * i) / k), cy + r * Math.sin((2 * Math.PI * i) / k)]);
  return out;
}

// ---------------------------------------------------------------------------
// Lesson 8.1 — Views of objects made of cubes
// ---------------------------------------------------------------------------

/** heights[row][col]: row 0 at the back, last row at the front; column 0 on the left. */
type HMap = number[][];

const totalCubes = (h: HMap) => h.flat().reduce((s, v) => s + v, 0);
/** Front view: the tallest stack in each column, left to right. */
const frontHeights = (h: HMap) => h[0].map((_, c) => Math.max(...h.map((r) => r[c])));
/** Right side view: the tallest stack in each row, front row first (on the left). */
const sideHeights = (h: HMap) => h.map((r) => Math.max(...r)).reverse();

/** Unit squares of a view made of columns of the given heights. */
function colCells(heights: number[]): P[] {
  const out: P[] = [];
  heights.forEach((ht, x) => {
    for (let y = 0; y < ht; y++) out.push([x, y]);
  });
  return out;
}

/** Top view: back row at the top of the drawing, front row at the bottom. */
function topCells(h: HMap): P[] {
  const out: P[] = [];
  h.forEach((r, row) =>
    r.forEach((ht, c) => {
      if (ht > 0) out.push([c, h.length - 1 - row]);
    }),
  );
  return out;
}

const cellsKey = (cells: P[]) =>
  [...cells]
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
    .map((c) => c.join(','))
    .join(';');
const cellsW = (cells: P[]) => Math.max(...cells.map((c) => c[0])) + 1;
const cellsH = (cells: P[]) => Math.max(...cells.map((c) => c[1])) + 1;

/** A view drawn as unit squares on a grid of `gw` by `gh` squares, centred across and standing on the bottom row. */
function viewFig(cells: P[], gw: number, gh: number): PlaneFigure {
  const ox = Math.floor((gw - cellsW(cells)) / 2);
  const oy = 1;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: gw, yMin: 0, yMax: gh, step: 1 },
    hideTickLabels: true,
    hideAxes: true,
    polylines: cells.map(([x, y]) => ({ points: rectPts(x + ox, y + oy, 1, 1), color: 'brand' as const, fill: true })),
  };
}

/** Front, top and right side views side by side, each named underneath. */
function threeViewsFig(h: HMap): PlaneFigure {
  const views: Array<[string, P[]]> = [
    ['Front', colCells(frontHeights(h))],
    ['Top', topCells(h)],
    ['Right side', colCells(sideHeights(h))],
  ];
  const tall = Math.max(...views.map(([, c]) => cellsH(c)));
  const polylines: PlaneFigure['polylines'] = [];
  const points: PlanePoint[] = [];
  let x0 = 1;
  const xMax = views.reduce((s, [, c]) => s + cellsW(c), 0) + 6;
  const ppu = PLOT_W / xMax;
  for (const [name, cells] of views) {
    const w = cellsW(cells);
    for (const [x, y] of cells) polylines.push({ points: rectPts(x + x0, y + 1, 1, 1), color: 'brand', fill: true });
    const tw = textWidth(name);
    points.push({ x: r3(x0 + w / 2 - (8 + tw / 2) / ppu), y: r3(0.45 - 12.4 / ppu), label: name, color: 'muted', open: true });
    x0 += w + 2;
  }
  return {
    type: 'plane',
    grid: { xMin: 0, xMax, yMin: -0.5, yMax: tall + 1.5, step: 1 },
    hideTickLabels: true,
    hideAxes: true,
    polylines,
    points,
  };
}

/**
 * How many small triangles of each cube are still showing in the isometric drawing (front right view).
 * Mirrors the painter's order of the cubes figure: farther cubes first.
 */
function cubeVisibility(h: HMap): number[] {
  const cubes: Array<[number, number, number]> = [];
  h.forEach((r, y) =>
    r.forEach((ht, x) => {
      for (let z = 0; z < ht; z++) cubes.push([x, y, z]);
    }),
  );
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);
  const owner = new Map<string, number>();
  cubes.forEach(([x, y, z], i) => {
    const a = x - y;
    const c = x + y - 2 * z;
    // Each face of the cube covers two triangles of the isometric grid: [vertical edge x, its lower end, apex side].
    for (const k of [
      [a, c - 2, -1],
      [a, c - 2, 1],
      [a - 1, c - 1, 1],
      [a, c, -1],
      [a + 1, c - 1, -1],
      [a, c, 1],
    ])
      owner.set(k.join(','), i);
  });
  const count = new Array<number>(cubes.length).fill(0);
  for (const i of owner.values()) count[i]++;
  return count;
}

/** Every cube shows at least a full face's worth of triangles. */
const allVisible = (h: HMap) => cubeVisibility(h).every((v) => v >= 2);

function connected(h: HMap): boolean {
  const cells: P[] = [];
  h.forEach((r, y) => r.forEach((v, x) => v > 0 && cells.push([x, y])));
  if (!cells.length) return false;
  const seen = new Set<string>([cells[0].join(',')]);
  const stack = [cells[0]];
  while (stack.length) {
    const [x, y] = stack.pop()!;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const k = `${x + dx},${y + dy}`;
      if (!seen.has(k) && (h[y + dy]?.[x + dx] ?? 0) > 0) {
        seen.add(k);
        stack.push([x + dx, y + dy]);
      }
    }
  }
  return seen.size === cells.length;
}

/** Every row and column is used, the base is in one piece, and no cube is hidden. */
function goodStructure(h: HMap): boolean {
  return h.every((r) => r.some((v) => v > 0)) && h[0].every((_, c) => h.some((r) => r[c] > 0)) && connected(h) && allVisible(h);
}

function randomStructure(rng: Rng, o: { rows: [number, number]; cols: [number, number]; maxH: number; cubes: [number, number]; empty?: number }): HMap {
  for (;;) {
    const rows = rng.int(o.rows[0], o.rows[1]);
    const cols = rng.int(o.cols[0], o.cols[1]);
    const h: HMap = [];
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < cols; c++) row.push(rng.chance(o.empty ?? 0.2) ? 0 : rng.int(1, o.maxH));
      h.push(row);
    }
    const t = totalCubes(h);
    if (t < o.cubes[0] || t > o.cubes[1]) continue;
    if (!goodStructure(h)) continue;
    // Not every stack the same height (the views would be too plain).
    if (new Set(h.flat().filter((v) => v > 0)).size < 2) continue;
    return h;
  }
}

const cubesFig = (h: HMap, front = true): CubesFigure => ({ type: 'cubes', heights: h.map((r) => [...r]), ...(front && { showFront: true }) });

const COL_NAMES: Record<number, string[]> = { 1: ['column'], 2: ['left', 'right'], 3: ['left', 'middle', 'right'], 4: ['first', 'second', 'third', 'fourth'] };
const ROW_NAMES: Record<number, string[]> = { 1: ['only'], 2: ['back', 'front'], 3: ['back', 'middle', 'front'] };

function listWords(ws: string[]): string {
  return ws.length <= 1 ? ws.join('') : ws.length === 2 ? `${ws[0]} and ${ws[1]}` : `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
}

/** "the left and middle columns" */
function whichCols(row: number[]): string {
  const names = COL_NAMES[row.length];
  const used = row.map((v, i) => (v > 0 ? names[i] : '')).filter(Boolean);
  if (row.length === 1) return 'the column';
  if (used.length === row.length) return row.length === 2 ? 'both columns' : `all ${row.length} columns`;
  return `the ${listWords(used)} column${used.length > 1 ? 's' : ''}`;
}

const VIEW_WORD = { front: 'front view', top: 'top view', side: 'right side view' } as const;
type ViewKind = keyof typeof VIEW_WORD;

function viewCells(h: HMap, kind: ViewKind): P[] {
  return kind === 'front' ? colCells(frontHeights(h)) : kind === 'top' ? topCells(h) : colCells(sideHeights(h));
}

/** The correct view and drawings from common mistakes. */
function viewChoices(h: HMap, kind: ViewKind): P[][] {
  const front = frontHeights(h);
  const side = sideHeights(h);
  const top = topCells(h);
  const R = h.length;
  const pool: P[][] = [];
  if (kind === 'front') {
    pool.push(colCells([...front].reverse()), colCells(side), colCells([...side].reverse()), colCells(h[R - 1]), top);
    const sums = h[0].map((_, c) => h.reduce((s, r) => s + r[c], 0));
    if (Math.max(...sums) <= 5) pool.push(colCells(sums));
  } else if (kind === 'side') {
    pool.push(colCells([...side].reverse()), colCells(front), colCells([...front].reverse()), top);
    const sums = h.map((r) => r.reduce((s, v) => s + v, 0)).reverse();
    if (Math.max(...sums) <= 5) pool.push(colCells(sums));
  } else {
    const H = cellsH(top);
    const W = cellsW(top);
    pool.push(
      top.map(([x, y]) => [x, H - 1 - y] as P),
      top.map(([x, y]) => [W - 1 - x, y] as P),
      top.map(([x, y]) => [y, x] as P),
      colCells(front),
      colCells(side),
    );
  }
  const correct = viewCells(h, kind);
  const seen = new Set([cellsKey(correct)]);
  const out: P[][] = [correct];
  for (const c of pool) {
    if (!c.length) continue;
    const k = cellsKey(c);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(c);
  }
  return out;
}

const VIEW_CTX = [
  (w: string) => `${w} built this object with linking cubes.`,
  (w: string) => `${w} stacked wooden blocks to make this model of a building.`,
  () => 'This object is a stack of equal boxes in a warehouse.',
  (w: string) => `${w} made this sculpture from sugar cubes for a science fair.`,
  () => 'An architect made this model of an apartment block from cubes.',
  (w: string) => `${w} glued cubes together to make a game piece.`,
];

function viewSolution(h: HMap, kind: ViewKind, letter: string): string[] {
  if (kind === 'front') {
    const f = frontHeights(h);
    const names = COL_NAMES[f.length];
    return [
      'Look at the object from the front, in the direction of the arrow.',
      'Go across the columns from left to right. In each column you see the **tallest** stack; shorter stacks behind it are hidden.',
      f.map((v, i) => `${cap(names[i])}${f.length === 1 ? '' : ' column'}: $${v}$ high`).join('; ') + '.',
      `The front view is drawing ${letter}, with columns ${listWords(f.map(String))} squares high.`,
    ];
  }
  if (kind === 'side') {
    const s = sideHeights(h);
    const rows = [...ROW_NAMES[h.length]].reverse();
    return [
      'Stand on the right side of the object and look left. The **front** of the object is now on your **left**.',
      'Each column of the view is one row of the object, from the front row (left) to the back row (right). You see the tallest stack in each row.',
      s.map((v, i) => `${cap(rows[i])} row: $${v}$ high`).join('; ') + '.',
      `The right side view is drawing ${letter}, with columns ${listWords(s.map(String))} squares high.`,
    ];
  }
  const rows = ROW_NAMES[h.length];
  return [
    'Look straight down from above. Every stack shows as **one** square, however tall it is.',
    'The back row is at the top of the drawing and the front row is at the bottom.',
    h.map((r, i) => `${cap(rows[i])} row: squares in ${whichCols(r)}`).join('; ') + '.',
    `The top view is drawing ${letter}.`,
  ];
}

function viewHints(kind: ViewKind): string[] {
  if (kind === 'front') return ['Imagine standing where the arrow is and looking straight at the object.', 'In each column, from left to right, the height you see is the tallest stack in that column.'];
  if (kind === 'side') return ['Imagine standing on the right side and looking left. The front of the object is on your left.', 'In each row, from front to back, the height you see is the tallest stack in that row.'];
  return ['Imagine looking straight down from above. Height does not matter: each stack shows as one square.', 'Put the back row at the top of the drawing and the front row at the bottom.'];
}

function countSolution(h: HMap): string[] {
  const rows = ROW_NAMES[h.length];
  const sums = h.map((r) => r.reduce((s, v) => s + v, 0));
  const steps = h.map((r, i) => {
    const st = r.filter((v) => v > 0);
    return `${cap(rows[i])} row: stacks of ${listWords(st.map((v) => `$${v}$`))}, so $${st.length > 1 ? `${st.join(' + ')} = ` : ''}${sums[i]}$ cube${sums[i] === 1 ? '' : 's'}.`;
  });
  const t = totalCubes(h);
  return ['Count one stack at a time, row by row, from the back to the front.', ...steps, h.length > 1 ? `Total: $${sums.join(' + ')} = ${t}$ cubes.` : `Total: $${t}$ cubes.`];
}

const views = skill({
  id: 'm8-views',
  name: 'Top, front and side views',
  description: 'Match the top, front and right side views of an object made of cubes, count its cubes, and choose the object that has a given set of views.',
  outcomes: ['SS5'],
  lessonId: 'm8-8-1',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const ctx = rng.pick(VIEW_CTX)(who);
    const mode = d === 3 ? rng.weighted([['match', 0.65], ['fill', 0.35]] as const) : rng.weighted([['view', 0.62], ['count', 0.38]] as const);

    if (mode === 'count') {
      const h = d === 1 ? randomStructure(rng, { rows: [1, 2], cols: [2, 3], maxH: 2, cubes: [3, 7] }) : randomStructure(rng, { rows: [2, 3], cols: [2, 3], maxH: 3, cubes: [7, 13] });
      const t = totalCubes(h);
      return {
        prompt: `${ctx} Every cube sits on the table or on another cube, and no cubes are hidden from view. How many cubes are in the object?`,
        figure: cubesFig(h, false),
        parts: [numPart(t, { suffix: 'cubes' })],
        hints: ['Count one stack at a time, so you do not count a cube twice.', 'A tall stack still stands on the table: count every cube in it, from the bottom to the top.'],
        solution: countSolution(h),
      };
    }

    if (mode === 'fill') {
      let h: HMap;
      do h = randomStructure(rng, { rows: [2, 3], cols: [2, 3], maxH: 3, cubes: [5, 12], empty: 0.25 });
      while (h.length * h[0].length * Math.max(...h.flat()) - totalCubes(h) < 2);
      const R = h.length;
      const C = h[0].length;
      const H = Math.max(...h.flat());
      const t = totalCubes(h);
      const full = R * C * H;
      const goal = rng.pick([
        `${who} wants to add cubes to turn this object into a rectangular prism`,
        `${who} wants to fill in the gaps so the object becomes a rectangular prism`,
        'A builder wants to add more blocks to make this model a rectangular prism',
      ]);
      return {
        prompt: `${ctx} No cubes are hidden from view. ${goal} that is $${C}$ cubes wide, $${R}$ cube${R === 1 ? '' : 's'} deep and $${H}$ cubes high. How many more cubes are needed?`,
        figure: cubesFig(h, false),
        parts: [numPart(full - t, { suffix: 'cubes' })],
        hints: ['First count the cubes in the object now, one stack at a time.', `A rectangular prism ${C} by ${R} by ${H} has $${C} \\times ${R} \\times ${H}$ cubes. Subtract the cubes already there.`],
        solution: [...countSolution(h).slice(1), `The finished prism has $${C} \\times ${R} \\times ${H} = ${full}$ cubes.`, `Cubes needed: $${full} - ${t} = ${full - t}$ cubes.`],
      };
    }

    if (mode === 'match') {
      for (;;) {
        const h = randomStructure(rng, { rows: [2, 3], cols: [2, 3], maxH: 3, cubes: [5, 12], empty: 0.25 });
        const vk = (x: HMap) => ['front', 'top', 'side'].map((k) => cellsKey(viewCells(x, k as ViewKind)));
        const target = vk(h);
        const cands: HMap[] = [
          h.map((r) => [...r].reverse()),
          [...h].reverse().map((r) => [...r]),
          [...h].reverse().map((r) => [...r].reverse()),
        ];
        for (let k = 0; k < 8; k++) {
          const g = h.map((r) => [...r]);
          const r = rng.int(0, g.length - 1);
          const c = rng.int(0, g[0].length - 1);
          g[r][c] = Math.max(0, Math.min(3, g[r][c] + rng.pick([-1, 1, 2])));
          cands.push(g);
        }
        const keyOf = (x: HMap) => JSON.stringify(x);
        const seen = new Set([keyOf(h)]);
        const ds: Array<{ h: HMap; why: string }> = [];
        for (const g of rng.shuffle(cands)) {
          if (seen.has(keyOf(g)) || !goodStructure(g)) continue;
          const v = vk(g);
          const bad = v.findIndex((x, i) => x !== target[i]);
          if (bad < 0) continue;
          seen.add(keyOf(g));
          ds.push({ h: g, why: ['front view', 'top view', 'right side view'][bad] });
          if (ds.length === 3) break;
        }
        if (ds.length < 3) continue;
        const opts = [{ md: '', figure: cubesFig(h) as Figure, correct: true, why: '' }, ...ds.map((x) => ({ md: '', figure: cubesFig(x.h) as Figure, correct: false, why: x.why }))];
        const shuffled = rng.shuffle(opts);
        const answer = mcFigures(rng, shuffled, true);
        const letter = letterOf(answer);
        const reasons = shuffled.map((o, i) => (o.correct ? '' : `Object ${LETTERS[i]} has a different ${o.why}.`)).filter(Boolean);
        return {
          prompt: `${who} drew the front, top and right side views of an object made of cubes. Which object has these views?`,
          figure: threeViewsFig(h),
          parts: [{ answer }],
          hints: ['Check one view at a time. The top view shows where the stacks are. The front and side views show the tallest stack in each column or row.', 'For the right side view, stand on the right: the front of the object is on the left of the view.'],
          solution: ['Use the top view first: it shows which squares have a stack on them.', 'Then use the front view (tallest stack in each column) and the right side view (tallest stack in each row, front on the left).', ...reasons, `Object ${letter} matches all three views.`],
          answerDisplay: `Object ${letter}`,
        };
      }
    }

    // Which drawing is the front, top or right side view?
    for (;;) {
      const kind: ViewKind = d === 1 ? rng.pick(['front', 'top'] as const) : rng.pick(['front', 'top', 'side', 'side'] as const);
      const h = d === 1 ? randomStructure(rng, { rows: [1, 2], cols: [2, 3], maxH: 2, cubes: [3, 7] }) : randomStructure(rng, { rows: [2, 3], cols: [2, 3], maxH: 3, cubes: [5, 12] });
      if (d === 1 && kind === 'top' && h.length === 1) continue;
      const choices = viewChoices(h, kind);
      if (choices.length < 4) continue;
      const opts = choices.slice(0, 4);
      const gw = Math.max(4, ...opts.map(cellsW)) + 2;
      const gh = Math.max(3, ...opts.map(cellsH)) + 2;
      const answer = mcFigures(
        rng,
        opts.map((c, i) => ({ md: '', figure: viewFig(c, gw, gh), correct: i === 0 })),
      );
      const letter = letterOf(answer);
      return {
        prompt: `${ctx} Which drawing shows the **${VIEW_WORD[kind]}** of the object?`,
        figure: cubesFig(h),
        parts: [{ answer }],
        hints: viewHints(kind),
        solution: viewSolution(h, kind, letter),
        answerDisplay: `Drawing ${letter}`,
      };
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — Nets of 3-D objects
// ---------------------------------------------------------------------------

type Cell = [number, number];

/** Roll a cube over the squares; returns the cube face (0–5) each square lands on, or null if two land on the same face. Opposite faces are 0–1, 2–3, 4–5. */
function foldFaces(cells: Cell[]): number[] | null {
  const faces = new Array<number>(cells.length).fill(-1);
  const idx = (x: number, y: number) => cells.findIndex((c) => c[0] === x && c[1] === y);
  const visit = (i: number, st: { B: number; T: number; N: number; S: number; E: number; W: number }) => {
    faces[i] = st.B;
    const [x, y] = cells[i];
    const moves: Array<[number, number, typeof st]> = [
      [1, 0, { ...st, B: st.E, E: st.T, T: st.W, W: st.B }],
      [-1, 0, { ...st, B: st.W, W: st.T, T: st.E, E: st.B }],
      [0, 1, { ...st, B: st.N, N: st.T, T: st.S, S: st.B }],
      [0, -1, { ...st, B: st.S, S: st.T, T: st.N, N: st.B }],
    ];
    for (const [dx, dy, next] of moves) {
      const j = idx(x + dx, y + dy);
      if (j >= 0 && faces[j] < 0) visit(j, next);
    }
  };
  visit(0, { B: 0, T: 1, N: 2, S: 3, E: 4, W: 5 });
  return new Set(faces).size === 6 && !faces.includes(-1) ? faces : null;
}

function normCells(cells: Cell[]): Cell[] {
  const mx = Math.min(...cells.map((c) => c[0]));
  const my = Math.min(...cells.map((c) => c[1]));
  return cells.map(([x, y]) => [x - mx, y - my] as Cell).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/** The 8 rotations and reflections of a set of squares. */
function variants(cells: Cell[]): Cell[][] {
  const out: Cell[][] = [];
  let cur = cells;
  for (let r = 0; r < 4; r++) {
    cur = cur.map(([x, y]) => [-y, x] as Cell);
    out.push(normCells(cur), normCells(cur.map(([x, y]) => [-x, y] as Cell)));
  }
  return out;
}

const shapeKey = (cells: Cell[]) => variants(cells).map((v) => v.map((c) => c.join(',')).join(';')).sort()[0];

/** All 35 hexominoes: the 11 nets of a cube and the 24 that do not fold into a cube. */
const HEXOMINOES: { nets: Cell[][]; nonNets: Cell[][] } = (() => {
  let level = new Map<string, Cell[]>([['0,0', [[0, 0]]]]);
  for (let k = 1; k < 6; k++) {
    const next = new Map<string, Cell[]>();
    for (const cells of level.values())
      for (const [x, y] of cells)
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          if (cells.some((c) => c[0] === x + dx && c[1] === y + dy)) continue;
          const grown = normCells([...cells, [x + dx, y + dy]]);
          const key = shapeKey(grown);
          if (!next.has(key)) next.set(key, grown);
        }
    level = next;
  }
  const nets: Cell[][] = [];
  const nonNets: Cell[][] = [];
  for (const cells of level.values()) (foldFaces(cells) ? nets : nonNets).push(cells);
  return { nets, nonNets };
})();

/** Non-nets students can reason about: at most 4 squares across or up, so nothing is a plain row of 5 or 6. */
const NON_NETS = HEXOMINOES.nonNets.filter((c) => Math.max(...c.map((p) => p[0])) < 4 && Math.max(...c.map((p) => p[1])) < 4);

/** A random turn or flip of the squares, wider than it is tall. */
const orient = (rng: Rng, cells: Cell[]) => rng.pick(variants(cells).filter((v) => Math.max(...v.map((c) => c[0])) >= Math.max(...v.map((c) => c[1]))));

function squaresDrawing(cells: Cell[], fill = true): Drawing {
  const dr = new Drawing();
  for (const [x, y] of cells) dr.poly(rectPts(x, y, 1, 1), 'brand', fill);
  return dr;
}

type NetSolid = 'cube' | 'rectangular prism' | 'triangular prism' | 'square pyramid' | 'cylinder';
type NetFlaw = 'ok' | 'sameSide' | 'missing' | 'wrongSize' | 'extra' | 'other';

/** A drawing of a net. `flaw` makes a pattern that does not fold into the object. */
function netDrawing(rng: Rng, solid: NetSolid, flaw: NetFlaw = 'ok'): Drawing {
  const dr = new Drawing();
  if (solid === 'cube') {
    if (flaw === 'ok') return squaresDrawing(orient(rng, rng.pick(HEXOMINOES.nets)));
    return squaresDrawing(orient(rng, rng.pick(NON_NETS)));
  }
  if (solid === 'rectangular prism') {
    const l = rng.pick([1.8, 2, 2.2]);
    const w = rng.pick([0.9, 1, 1.1]);
    const h = rng.pick([1.3, 1.5]);
    const xs = [0, w, w + l, 2 * w + l, 2 * w + 2 * l];
    for (let i = 0; i < 4; i++) dr.poly(rectPts(xs[i], w, xs[i + 1] - xs[i], h));
    const t = rng.pick([1, 3]);
    const b = rng.pick([1, 3]);
    const lidW = flaw === 'wrongSize' ? w : l;
    if (flaw === 'sameSide') {
      dr.poly(rectPts(xs[1], w + h, l, w));
      dr.poly(rectPts(xs[3], w + h, l, w));
    } else {
      dr.poly(rectPts(xs[t], w + h, lidW, w));
      if (flaw !== 'missing') dr.poly(rectPts(xs[b], 0, lidW, w));
    }
    if (flaw === 'extra') dr.poly(rectPts(xs[4], w, w, h));
    return dr;
  }
  if (solid === 'triangular prism') {
    const a = 1.2;
    const L = rng.pick([2.2, 2.6]);
    const t = (a * Math.sqrt(3)) / 2;
    const nRect = flaw === 'extra' ? 4 : 3;
    for (let i = 0; i < nRect; i++) dr.poly(rectPts(i * a, t, a, L));
    const top = rng.int(0, 2);
    const bot = rng.int(0, 2);
    const up = (i: number) => dr.poly([[i * a, t + L], [(i + 1) * a, t + L], [(i + 0.5) * a, 2 * t + L]]);
    const down = (i: number) => dr.poly([[i * a, t], [(i + 1) * a, t], [(i + 0.5) * a, 0]]);
    if (flaw === 'sameSide') {
      const [i, j] = rng.pick([[0, 2], [0, 1], [1, 2]]);
      up(i);
      up(j);
    } else {
      up(top);
      if (flaw !== 'missing') down(bot);
    }
    return dr;
  }
  if (solid === 'square pyramid') {
    const a = 1.6;
    const t = rng.pick([1.3, 1.5]);
    if (flaw === 'other') {
      // A net of a triangular pyramid: a large triangle cut into four.
      const s = 3.2;
      const k = (s * Math.sqrt(3)) / 2;
      dr.poly([[0, 0], [s / 2, 0], [s / 4, k / 2]]);
      dr.poly([[s / 2, 0], [s, 0], [(3 * s) / 4, k / 2]]);
      dr.poly([[s / 4, k / 2], [(3 * s) / 4, k / 2], [s / 2, k]]);
      dr.poly([[s / 2, 0], [(3 * s) / 4, k / 2], [s / 4, k / 2]]);
      return dr;
    }
    const b = flaw === 'wrongSize' ? 2.4 : a;
    dr.poly(rectPts(0, 0, b, a));
    const sides: Array<() => void> = [
      () => dr.poly([[0, 0], [b, 0], [b / 2, -t]]),
      () => dr.poly([[b, 0], [b, a], [b + t, a / 2]]),
      () => dr.poly([[b, a], [0, a], [b / 2, a + t]]),
      () => dr.poly([[0, a], [0, 0], [-t, a / 2]]),
    ];
    const skip = flaw === 'missing' ? rng.int(0, 3) : -1;
    sides.forEach((f, i) => i !== skip && f());
    return dr;
  }
  // cylinder
  const r = 0.62;
  const H = rng.pick([2, 2.4]);
  const W = flaw === 'wrongSize' ? 2.3 * r : 2 * Math.PI * r;
  dr.poly(rectPts(0, 0, W, H));
  const xTop = rng.pick([r, W / 2, W - r]);
  const xBot = rng.pick([r, W / 2, W - r]);
  if (flaw === 'sameSide') {
    dr.poly(circlePts(r, H + r, r));
    dr.poly(circlePts(W - r, H + r, r));
  } else {
    dr.poly(circlePts(xTop, H + r, r));
    if (flaw !== 'missing') dr.poly(circlePts(xBot, -r, r));
  }
  return dr;
}

/** Build several drawings at one common size, so the choices look alike. */
function sameSize(drs: Drawing[]): PlaneFigure[] {
  const sizes = drs.map((d) => {
    const b = d.bbox();
    return [b.x1 - b.x0 + 0.6, b.y1 - b.y0 + 0.6] as [number, number];
  });
  const W = Math.max(...sizes.map((s) => s[0]));
  const H = Math.max(...sizes.map((s) => s[1]));
  return drs.map((d) => d.build({ min: [W, H] }));
}

interface PolyInfo {
  name: string;
  /** sides of the base */
  k: number;
  kind: 'prism' | 'pyramid';
  /** Name of the base shape, when it is not the usual one (a square). */
  base?: readonly [string, string];
}

const POLY_NAMES: Record<number, string> = { 3: 'triangular', 4: 'rectangular', 5: 'pentagonal', 6: 'hexagonal', 7: 'heptagonal', 8: 'octagonal' };
const BASE_SHAPE: Record<number, [string, string]> = { 3: ['triangle', 'triangles'], 4: ['rectangle', 'rectangles'], 5: ['pentagon', 'pentagons'], 6: ['hexagon', 'hexagons'], 7: ['heptagon', 'heptagons'], 8: ['octagon', 'octagons'] };

function fev(p: PolyInfo) {
  return p.kind === 'prism' ? { faces: p.k + 2, edges: 3 * p.k, vertices: 2 * p.k } : { faces: p.k + 1, edges: 2 * p.k, vertices: p.k + 1 };
}

function fevSteps(p: PolyInfo, what: 'faces' | 'edges' | 'vertices'): string[] {
  const k = p.k;
  const [one, many] = p.base ?? BASE_SHAPE[k];
  if (p.kind === 'prism') {
    if (what === 'faces') return [`A ${p.name} has $2$ ${many} (the ends) and one rectangle for each side of the end: $${k}$ rectangles.`, `Faces: $2 + ${k} = ${k + 2}$`];
    if (what === 'edges') return [`Each ${one} end has $${k}$ edges, and $${k}$ more edges join the two ends.`, `Edges: $${k} + ${k} + ${k} = ${3 * k}$`];
    return [`Each ${one} end has $${k}$ corners.`, `Vertices: $${k} + ${k} = ${2 * k}$`];
  }
  if (what === 'faces') return [`A ${p.name} has $1$ ${one} base and one triangle for each side of the base: $${k}$ triangles.`, `Faces: $1 + ${k} = ${k + 1}$`];
  if (what === 'edges') return [`The ${one} base has $${k}$ edges, and $${k}$ more edges go up to the top point.`, `Edges: $${k} + ${k} = ${2 * k}$`];
  return [`The ${one} base has $${k}$ corners, plus $1$ at the top point.`, `Vertices: $${k} + 1 = ${k + 1}$`];
}

const FEV_MEANING = {
  faces: 'A **face** is a flat surface.',
  edges: 'An **edge** is a line segment where two faces meet.',
  vertices: 'A **vertex** is a corner where edges meet.',
};

const NET_CTX: Record<NetSolid, string[]> = {
  cube: ['a cube-shaped gift box', 'a cube-shaped storage box', 'a giant foam die for a board game'],
  'rectangular prism': ['a cereal box', 'a shoebox', 'a box for a new phone'],
  'triangular prism': ['a box for a chocolate bar', 'a model of a pup tent', 'a doorstop wedge'],
  'square pyramid': ['a model of a pyramid', 'a paper lantern with a square base', 'a roof for a model gazebo'],
  cylinder: ['a soup can', 'an oatmeal container', 'a tube for a rolled-up poster'],
};

const NET_HOW: Record<NetSolid, string> = {
  cube: 'a cube has $6$ equal square faces.',
  'rectangular prism': 'a rectangular prism has $6$ rectangle faces in $3$ matching pairs.',
  'triangular prism': 'a triangular prism has $2$ triangle ends and $3$ rectangles that wrap around.',
  'square pyramid': 'a square pyramid has $1$ square base and $4$ triangles that fold up to meet at a point.',
  cylinder: 'a cylinder has $2$ circles and one rectangle that rolls up into the curved surface.',
};

const FLAW_WHY: Record<NetSolid, Partial<Record<NetFlaw, string>>> = {
  cube: {},
  'rectangular prism': {
    sameSide: 'both lids are on the same side of the strip, so they fold onto the same end and one end is left open',
    missing: 'it has only $5$ faces, so one end is missing',
    wrongSize: 'the two lids are too small to cover the ends',
    extra: 'it has $7$ faces, one too many',
  },
  'triangular prism': {
    sameSide: 'both triangles are on the same side of the strip, so they fold onto the same end',
    missing: 'it has only one triangle, so one end is open',
    extra: 'it has $4$ rectangles, one too many, so the faces overlap',
  },
  'square pyramid': {
    missing: 'it has only $3$ triangles, so one side is open',
    wrongSize: 'the base is a rectangle that is not a square, so it makes a rectangular pyramid',
    other: 'it has $4$ triangles and no square, so it makes a triangular pyramid',
  },
  cylinder: {
    sameSide: 'both circles are on the same side of the rectangle, so they cannot cover both ends',
    missing: 'it has only one circle, so one end is open',
    wrongSize: 'the rectangle is far too short to wrap all the way around the circle',
  },
};

const FLAWS_FOR: Record<Exclude<NetSolid, 'cube'>, NetFlaw[]> = {
  'rectangular prism': ['sameSide', 'missing', 'wrongSize', 'extra'],
  'triangular prism': ['sameSide', 'missing', 'extra'],
  'square pyramid': ['missing', 'wrongSize', 'other'],
  cylinder: ['sameSide', 'missing', 'wrongSize'],
};

const FACE_LETTERS = 'ABCDEF';

const nets = skill({
  id: 'm8-nets',
  name: 'Nets of 3-D objects',
  description: 'Match nets to cubes, prisms, pyramids and cylinders, decide whether a net folds into a cube, and count faces, edges and vertices.',
  outcomes: ['SS2'],
  lessonId: 'm8-8-2',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const SOLIDS: NetSolid[] = ['cube', 'rectangular prism', 'triangular prism', 'square pyramid', 'cylinder'];
    const clash = (a: NetSolid, b: NetSolid) => (a === 'cube' && b === 'rectangular prism') || (a === 'rectangular prism' && b === 'cube');

    if (d === 1) {
      const mode = rng.weighted([['which', 0.35], ['name', 0.3], ['count', 0.35]] as const);
      if (mode === 'count') {
        const so = rng.pick([
          { shape: 'cube', p: { name: 'cube', k: 4, kind: 'prism' }, things: ['a number cube', 'an ice cube', 'a toy block'] },
          { shape: 'rectPrism', p: { name: 'rectangular prism', k: 4, kind: 'prism' }, things: ['a cereal box', 'a brick', 'a shipping box'] },
          { shape: 'triPrism', p: { name: 'triangular prism', k: 3, kind: 'prism' }, things: ['a doorstop wedge', 'a box for a chocolate bar', 'a ramp for a skateboard park'] },
          { shape: 'squarePyramid', p: { name: 'square pyramid', k: 4, kind: 'pyramid', base: ['square', 'squares'] }, things: ['a roof on a gazebo', 'a glass paperweight', 'a tent with a square floor'] },
        ] as const);
        const what = rng.pick(['faces', 'edges', 'vertices'] as const);
        const v = fev(so.p)[what];
        const steps = so.shape === 'cube' || so.shape === 'rectPrism'
          ? { faces: ['Top and bottom, front and back, left and right.', 'Faces: $2 + 2 + 2 = 6$'], edges: ['$4$ edges around the top, $4$ around the bottom and $4$ going up the sides.', 'Edges: $4 + 4 + 4 = 12$'], vertices: ['$4$ corners on the top and $4$ on the bottom.', 'Vertices: $4 + 4 = 8$'] }[what]
          : fevSteps(so.p, what);
        return {
          prompt: `${cap(rng.pick(so.things))} has the shape of a ${so.p.name}, as shown. How many **${what}** does it have?`,
          figure: { type: 'solid', shape: so.shape, labels: {} },
          parts: [numPart(v, { suffix: what })],
          hints: [`${FEV_MEANING[what]} Dashed lines show edges at the back that you cannot see.`, 'Count in groups (top, bottom, sides) so you do not miss any or count any twice.'],
          solution: [FEV_MEANING[what], ...steps, `A ${so.p.name} has $${v}$ ${what}.`],
        };
      }
      const target = rng.pick(SOLIDS);
      if (mode === 'name') {
        const others = rng.shuffle(SOLIDS.filter((s) => s !== target && !clash(target, s)));
        if (target !== 'triangular prism' && !others.includes('triangular pyramid' as NetSolid)) others.unshift('triangular pyramid' as NetSolid);
        const fig = netDrawing(rng, target).build();
        return {
          prompt: `${who} cuts out this net and folds it up. Which 3-D object does it make?`,
          figure: fig,
          parts: [{ answer: mc(rng, cap(target), others.slice(0, 3).map(cap)) }],
          hints: ['Count the faces in the net and name their shapes.', 'Prisms have two matching ends joined by rectangles. Pyramids have one base and triangles that meet at a point. A cylinder has two circles.'],
          solution: [`Look at the faces: ${NET_HOW[target]}`, `The net folds into a **${target}**.`],
          answerDisplay: cap(target),
        };
      }
      const others = rng.sample(SOLIDS.filter((s) => s !== target && !clash(target, s)), 3);
      const drs = [netDrawing(rng, target), ...others.map((s) => netDrawing(rng, s))];
      const figs = sameSize(drs);
      const answer = mcFigures(rng, figs.map((f, i) => ({ md: '', figure: f, correct: i === 0 })));
      const letter = letterOf(answer);
      return {
        prompt: `${who} wants to make ${rng.pick(NET_CTX[target])} shaped like a **${target}**. Which net should ${who} cut out?`,
        parts: [{ answer }],
        hints: ['Think about the faces of the object: how many, and what shapes?', `Remember: ${NET_HOW[target]}`],
        solution: [`Remember: ${NET_HOW[target]}`, `Net ${letter} has exactly those faces, so it folds into a ${target}.`, `The other nets fold into a ${listWords(others)}.`],
        answerDisplay: `Net ${letter}`,
      };
    }

    if (d === 2) {
      const mode = rng.weighted([['cube', 0.3], ['flawed', 0.4], ['count', 0.3]] as const);
      if (mode === 'count') {
        const p: PolyInfo = rng.pick([
          { name: 'pentagonal prism', k: 5, kind: 'prism' },
          { name: 'hexagonal prism', k: 6, kind: 'prism' },
          { name: 'octagonal prism', k: 8, kind: 'prism' },
          { name: 'triangular pyramid', k: 3, kind: 'pyramid' },
          { name: 'pentagonal pyramid', k: 5, kind: 'pyramid' },
          { name: 'hexagonal pyramid', k: 6, kind: 'pyramid' },
        ] as const);
        const what = rng.pick(['faces', 'edges', 'vertices'] as const);
        const v = fev(p)[what];
        const [one, many] = BASE_SHAPE[p.k];
        const intro = rng.pick(
          p.kind === 'prism'
            ? [
                `A new pencil is shaped like a ${p.name}.`,
                `${who} folds a net with $2$ ${many} and $${p.k}$ rectangles into a ${p.name}.`,
                `A gazebo at a park in ${rng.pick(['Riverton', 'Westbury', 'Pinewood', 'Ashford'])} has a floor and roof shaped like ${many}; the building is a ${p.name}.`,
              ]
            : [
                `${who} folds a net with $1$ ${one} and $${p.k}$ triangles into a ${p.name}.`,
                `The roof of a bird feeder is shaped like a ${p.name}.`,
                `A paper lantern is shaped like a ${p.name}.`,
              ],
        );
        return {
          prompt: `${intro} How many **${what}** does the ${p.name} have?`,
          parts: [numPart(v, { suffix: what })],
          hints: [FEV_MEANING[what], p.kind === 'prism' ? `A prism has two matching ${one} ends joined by rectangles.` : `A pyramid has one ${one} base and triangles that meet at one point.`],
          solution: [...fevSteps(p, what), `The ${p.name} has $${v}$ ${what}.`],
        };
      }
      if (mode === 'cube') {
        const good = squaresDrawing(orient(rng, rng.pick(HEXOMINOES.nets)));
        const bad = rng.sample(NON_NETS, 3).map((c) => squaresDrawing(orient(rng, c)));
        const figs = sameSize([good, ...bad]);
        const answer = mcFigures(rng, figs.map((f, i) => ({ md: '', figure: f, correct: i === 0 })));
        const letter = letterOf(answer);
        return {
          prompt: `${who} is cutting cardboard to make ${rng.pick(NET_CTX.cube)}. Each choice has $6$ squares. Which net folds into a **cube**?`,
          parts: [{ answer }],
          hints: ['Picture folding the net. No two squares can land on the same face of the cube.', 'Four squares in a row wrap around the cube. The other two squares must be on opposite sides of that row: one above and one below.'],
          solution: [
            'Every choice has $6$ squares, so check how they fold.',
            'In the wrong nets, two squares fold onto the same face, so one face of the cube is left open. A $2$ by $2$ block of squares, or a row of $4$ with both extra squares on the same side, never folds into a cube.',
            `Net ${letter} folds into a cube with no gaps and no overlaps.`,
          ],
          answerDisplay: `Net ${letter}`,
        };
      }
      const target = rng.pick(['rectangular prism', 'triangular prism', 'square pyramid', 'cylinder'] as const);
      const flaws = rng.sample(FLAWS_FOR[target], 3);
      const drs = [netDrawing(rng, target), ...flaws.map((f) => netDrawing(rng, target, f))];
      const figs = sameSize(drs);
      const options = figs.map((f, i) => ({ md: '', figure: f, correct: i === 0, flaw: i === 0 ? 'ok' : flaws[i - 1] }));
      const shuffled = rng.shuffle(options);
      const answer = mcFigures(rng, shuffled, true);
      const letter = letterOf(answer);
      return {
        prompt: `${who} is designing ${rng.pick(NET_CTX[target])}, shaped like a **${target}**. Only one of these nets folds into a ${target}. Which one?`,
        parts: [{ answer }],
        hints: [`Remember: ${NET_HOW[target]}`, 'Imagine folding each net. Check that every face lands in its own place, with no face missing and none on top of another.'],
        solution: [
          `Remember: ${NET_HOW[target]}`,
          ...shuffled.map((o, i) => (o.correct ? '' : `Net ${LETTERS[i]} does not work: ${FLAW_WHY[target][o.flaw as NetFlaw]}.`)).filter(Boolean),
          `Net ${letter} folds into a ${target}.`,
        ],
        answerDisplay: `Net ${letter}`,
      };
    }

    // d === 3
    const mode = rng.weighted([['notCube', 0.35], ['opposite', 0.35], ['reverse', 0.3]] as const);
    if (mode === 'reverse') {
      const kind = rng.pick(['prism', 'pyramid'] as const);
      const k = rng.int(kind === 'prism' ? 5 : 4, 8);
      const p: PolyInfo = { name: `${POLY_NAMES[k]} ${kind}`, k, kind };
      const all = fev(p);
      const given = rng.pick(['faces', 'edges', 'vertices'] as const);
      const ask = rng.pick((['faces', 'edges', 'vertices'] as const).filter((x) => x !== given));
      const findK = kind === 'prism'
        ? { faces: `$${all.faces} - 2 = ${k}$`, edges: `$${all.edges} \\div 3 = ${k}$`, vertices: `$${all.vertices} \\div 2 = ${k}$` }[given]
        : { faces: `$${all.faces} - 1 = ${k}$`, edges: `$${all.edges} \\div 2 = ${k}$`, vertices: `$${all.vertices} - 1 = ${k}$` }[given];
      const rule = kind === 'prism'
        ? { faces: 'A prism has $2$ ends plus one rectangle for each side of an end.', edges: 'A prism has $3$ edges for each side of an end (one on each end and one joining them).', vertices: 'A prism has $2$ vertices for each side of an end (one on each end).' }[given]
        : { faces: 'A pyramid has $1$ base plus one triangle for each side of the base.', edges: 'A pyramid has $2$ edges for each side of the base (one on the base and one going up).', vertices: 'A pyramid has one vertex for each corner of the base, plus $1$ at the top.' }[given];
      return {
        prompt: `${who} built a ${kind} with ${given === 'faces' ? 'flat' : 'straight'} ${given === 'vertices' ? 'corners' : given} only. It has **${all[given]} ${given}**. How many **${ask}** does it have?`,
        parts: [numPart(all[ask], { suffix: ask })],
        hints: ['First work out how many sides the base (or end) has.', kind === 'prism' ? 'For a prism whose end has $n$ sides: faces $= n + 2$, edges $= 3n$, vertices $= 2n$.' : 'For a pyramid whose base has $n$ sides: faces $= n + 1$, edges $= 2n$, vertices $= n + 1$.'],
        solution: [rule, `So the ${kind === 'prism' ? 'end' : 'base'} has ${findK} sides. It is a ${p.name}.`, ...fevSteps(p, ask), `The ${kind} has $${all[ask]}$ ${ask}.`],
      };
    }
    if (mode === 'notCube') {
      const bad = squaresDrawing(orient(rng, rng.pick(NON_NETS)));
      const good = rng.sample(HEXOMINOES.nets, 3).map((c) => squaresDrawing(orient(rng, c)));
      const figs = sameSize([bad, ...good]);
      const answer = mcFigures(rng, figs.map((f, i) => ({ md: '', figure: f, correct: i === 0 })));
      const letter = letterOf(answer);
      return {
        prompt: `${who} drew four patterns of $6$ squares for ${rng.pick(NET_CTX.cube)}. Three of them fold into a cube. Which pattern does **not** fold into a cube?`,
        parts: [{ answer }],
        hints: ['Fold each net in your head, one square at a time. Mark the bottom face first.', 'Look for two squares that would fold onto the same face, which leaves another face open.'],
        solution: [
          'Fold each pattern in your head. Choose one square as the bottom, then fold the squares next to it up to make the sides.',
          'Three patterns cover all $6$ faces of the cube with no overlap.',
          `In pattern ${letter}, two squares fold onto the same face, so one face of the cube is left open. Pattern ${letter} does not fold into a cube.`,
        ],
        answerDisplay: `Pattern ${letter}`,
      };
    }
    // Which face is opposite a lettered face?
    const cells = orient(rng, rng.pick(HEXOMINOES.nets));
    const faces = foldFaces(cells)!;
    const letters = rng.shuffle(FACE_LETTERS.split(''));
    const dr = squaresDrawing(cells, false);
    cells.forEach(([x, y], i) => dr.centre(letters[i], [x + 0.5, y + 0.5]));
    const i0 = rng.int(0, 5);
    const opp = faces.indexOf(faces[i0] ^ 1);
    const others = letters.filter((_, i) => i !== i0 && i !== opp);
    const adj = cells
      .map((c, i) => (i !== i0 && Math.abs(c[0] - cells[i0][0]) + Math.abs(c[1] - cells[i0][1]) === 1 ? letters[i] : ''))
      .filter(Boolean);
    const [ax, ay] = cells[i0];
    const [bx, by] = cells[opp];
    const inRow = (ax === bx && Math.abs(ay - by) === 2 && cells.some((c) => c[0] === ax && c[1] === (ay + by) / 2)) || (ay === by && Math.abs(ax - bx) === 2 && cells.some((c) => c[1] === ay && c[0] === (ax + bx) / 2));
    return {
      prompt: `${who} folds this net into a cube, ${rng.pick(['to make a game die', 'to make a puzzle box', 'for a craft project'])}. Which face will be **opposite** face ${letters[i0]}?`,
      figure: dr.build(),
      parts: [{ answer: mc(rng, `Face ${letters[opp]}`, rng.shuffle(others).map((l) => `Face ${l}`)) }],
      hints: ['Faces that touch along an edge in the net are next to each other on the cube, so they cannot be opposite.', 'In a straight row of three squares, the first and the third squares end up opposite each other.'],
      solution: [
        `Face ${letters[i0]} touches ${listWords(adj.map((l) => `face ${l}`))} in the net. ${adj.length > 1 ? 'Those faces are' : 'That face is'} next to face ${letters[i0]} on the cube, so ${adj.length > 1 ? 'they are' : 'it is'} not opposite.`,
        inRow
          ? `Faces ${letters[i0]} and ${letters[opp]} are at the two ends of a straight row of three squares. When the middle square is the bottom, they fold up to face each other.`
          : `Fold the net in your head with face ${letters[i0]} as the bottom. The faces next to it fold up to make the sides, and face ${letters[opp]} folds over to make the top.`,
        `Face ${letters[opp]} is opposite face ${letters[i0]}.`,
      ],
      answerDisplay: `Face ${letters[opp]}`,
    };
  },
});

// ---------------------------------------------------------------------------
// Prism drawings
// ---------------------------------------------------------------------------

const prismFig = (l: number, w: number, h: number, u: string): SolidFigure => ({
  type: 'solid',
  shape: 'rectPrism',
  labels: { l: `${fmt(l)} ${u}`, w: `${fmt(w)} ${u}`, h: `${fmt(h)} ${u}` },
});
const cubeFig = (s: number, u: string): SolidFigure => ({ type: 'solid', shape: 'cube', labels: { l: `${fmt(s)} ${u}` } });
/** Right triangular prism: legs a (upright) and b (bottom), sloped side c, length l. */
const wedgeFig = (a: number, b: number, c: number, l: number, u: string) => triPrismFig('left', b, a, { base: `${fmt(b)} ${u}`, height: `${fmt(a)} ${u}`, side: `${fmt(c)} ${u}`, length: `${fmt(l)} ${u}` });
const cylFig = (r: number, h: number, u: string, useD: boolean): SolidFigure => ({
  type: 'solid',
  shape: 'cylinder',
  labels: useD ? { d: `${fmt(2 * r)} ${u}`, h: `${fmt(h)} ${u}` } : { r: `${fmt(r)} ${u}`, h: `${fmt(h)} ${u}` },
});

/**
 * A triangular prism drawn as an oblique line sketch: the front triangle, the edges you can see and
 * dashed hidden edges. `apex: 'mid'` gives isosceles ends (a tent or a roof) labelled with the base,
 * the height and a sloped side; `apex: 'left'` gives right-triangle ends (a wedge) labelled with the
 * two legs and the sloped side. The last label is the length of the prism.
 */
function triPrismFig(apex: 'mid' | 'left', b: number, h: number, lab: { base: string; height: string; side: string; length: string }): PlaneFigure {
  const bw = 3;
  const hw = Math.max(1.4, Math.min(2.6, (3 * h) / b));
  const d: P = [1.6, 1.1];
  const A: P = [0, 0];
  const B: P = [bw, 0];
  const C: P = [apex === 'mid' ? bw / 2 : 0, hw];
  const o = (p: P): P => [p[0] + d[0], p[1] + d[1]];
  const dr = new Drawing();
  dr.poly([A, B, C], 'brand', false);
  dr.line([B, o(B), o(C), C]);
  for (const [p, q] of [[A, o(A)], [o(A), o(B)], [o(A), o(C)]] as Array<[P, P]>) dr.seg(p, q, { dashed: true, color: 'muted' });
  dr.label(lab.base, [apex === 'mid' ? bw * 0.3 : bw / 2, 0], -90, 6);
  if (apex === 'mid') {
    dr.seg(C, [bw / 2, 0], { dashed: true, color: 'muted' });
    dr.line([[bw / 2 + 0.2, 0], [bw / 2 + 0.2, 0.2], [bw / 2, 0.2]], 'muted');
    dr.label(lab.height, [bw / 2, hw * 0.42], 0, 6);
    dr.label(lab.side, [bw / 4, hw / 2], 150, 6);
  } else {
    dr.line([[0.2, 0], [0.2, 0.2], [0, 0.2]], 'muted');
    dr.label(lab.height, [0, hw / 2], 180, 6);
    // Inside the triangle, below the hidden edge from the right angle.
    dr.label(lab.side, [bw * 0.66, hw * 0.34], -125, 4);
  }
  dr.label(lab.length, [bw + d[0] / 2, d[1] / 2], -40, 6);
  return dr.build();
}

const tentFig = (b: number, h: number, s: number, L: number, u: string) => triPrismFig('mid', b, h, { base: `${fmt(b)} ${u}`, height: `${fmt(h)} ${u}`, side: `${fmt(s)} ${u}`, length: `${fmt(L)} ${u}` });

/** Isosceles triangle ends [base, height, sloped side] with whole-number sides. */
const ISO_ENDS: Array<[number, number, number]> = [
  [6, 4, 5],
  [8, 3, 5],
  [10, 12, 13],
  [12, 8, 10],
  [16, 6, 10],
  [16, 15, 17],
  [18, 12, 15],
  [24, 9, 15],
];
/** Right triangles [leg a, leg b, hypotenuse c]. */
const RIGHT_TRIS: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [9, 12, 15],
  [12, 16, 20],
  [7, 24, 25],
  [12, 9, 15],
  [4, 3, 5],
  [8, 6, 10],
];

function boxSteps(l: number, w: number, h: number, u: string, parts: { top?: boolean; bottom?: boolean; ends?: boolean } = {}) {
  const top = parts.top ?? true;
  const bottom = parts.bottom ?? true;
  const lw = exact(l * w);
  const lh = exact(l * h);
  const wh = exact(w * h);
  const nTB = (top ? 1 : 0) + (bottom ? 1 : 0);
  const tb = exact(nTB * lw);
  const fb = exact(2 * lh);
  const ends = exact(2 * wh);
  const SA = exact(tb + fb + ends);
  const steps: string[] = [];
  if (nTB === 2) steps.push(`Top and bottom: $2 \\times ${n(l)} \\times ${n(w)} = ${n(tb)}${sq(u)}$`);
  else if (nTB === 1) steps.push(`${bottom ? 'Bottom' : 'Top'} only: $${n(l)} \\times ${n(w)} = ${n(tb)}${sq(u)}$`);
  steps.push(`Front and back: $2 \\times ${n(l)} \\times ${n(h)} = ${n(fb)}${sq(u)}$`);
  steps.push(`Two ends: $2 \\times ${n(w)} \\times ${n(h)} = ${n(ends)}${sq(u)}$`);
  steps.push(`$SA = ${nTB ? `${n(tb)} + ` : ''}${n(fb)} + ${n(ends)} = ${n(SA)}${sq(u)}$`);
  return { SA, steps };
}

const BOX_HINTS = ['A closed rectangular prism has $6$ faces in $3$ matching pairs: top and bottom, front and back, and the two ends.', '$SA = 2lw + 2lh + 2wh$: find the area of each pair, then add.'];

const BOXES = [
  { thing: 'cereal box', u: 'cm', l: [18, 30], w: [5, 9], h: [25, 35] },
  { thing: 'shoebox with its lid on', u: 'cm', l: [28, 36], w: [16, 22], h: [10, 14] },
  { thing: 'tissue box', u: 'cm', l: [20, 26], w: [10, 13], h: [7, 10] },
  { thing: 'wooden toy chest', u: 'cm', l: [60, 90], w: [35, 50], h: [35, 50] },
  { thing: 'closed shipping container', u: 'm', l: [6, 12], w: [2, 3], h: [2, 3] },
  { thing: 'box for a board game', u: 'cm', l: [25, 40], w: [20, 30], h: [5, 9] },
  { thing: 'storage bin with a lid', u: 'cm', l: [40, 60], w: [30, 40], h: [25, 35] },
] as const;

const saPrism = skill({
  id: 'm8-surface-area-prism',
  name: 'Surface area of prisms',
  description: 'Find the surface area of right rectangular and triangular prisms, including open boxes and paint or fabric problems.',
  outcomes: ['SS3'],
  lessonId: 'm8-8-3',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.25)) {
        const c = rng.pick([
          { thing: 'cube-shaped gift box', u: 'cm', lo: 8, hi: 25 },
          { thing: 'cube-shaped foam ottoman', u: 'cm', lo: 35, hi: 50 },
          { thing: 'wooden puzzle cube', u: 'cm', lo: 4, hi: 9 },
          { thing: 'cube-shaped planter', u: 'cm', lo: 20, hi: 40 },
        ]);
        const s = rng.int(c.lo, c.hi);
        const SA = 6 * s * s;
        return {
          prompt: `A ${c.thing} has edges ${len(s, c.u)} long. What is its surface area?`,
          figure: cubeFig(s, c.u),
          parts: [xPart(SA, `${c.u}²`)],
          hints: ['A cube has $6$ faces, and every face is the same square.', 'Find the area of one face, then multiply by $6$.'],
          solution: [`One face: $${s} \\times ${s} = ${n(s * s)}${sq(c.u)}$`, `Six faces: $6 \\times ${n(s * s)} = ${n(SA)}${sq(c.u)}$`, `The surface area is $${n(SA)}${sq(c.u)}$.`],
        };
      }
      const c = rng.pick(BOXES);
      const l = rng.int(c.l[0], c.l[1]);
      const w = rng.int(c.w[0], c.w[1]);
      const h = rng.int(c.h[0], c.h[1]);
      const { SA, steps } = boxSteps(l, w, h, c.u);
      return {
        prompt: `A ${c.thing} is ${len(l, c.u)} long, ${len(w, c.u)} wide and ${len(h, c.u)} high. What is its surface area?`,
        figure: prismFig(l, w, h, c.u),
        parts: [xPart(SA, `${c.u}²`)],
        hints: BOX_HINTS,
        solution: [...steps, `The surface area is $${n(SA)}${sq(c.u)}$.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['wedge', 'tent', 'decimal'] as const);
      if (mode === 'wedge') {
        const c = rng.pick([
          { thing: 'A rubber doorstop', u: 'cm', k: 1, L: [4, 9] },
          { thing: 'A wooden ramp for a toy car track', u: 'cm', k: 2, L: [10, 25] },
          { thing: 'A foam wedge for a gym class', u: 'cm', k: 5, L: [40, 80] },
          { thing: 'A cheese wedge', u: 'cm', k: 1, L: [5, 12] },
        ]);
        const [a0, b0, c0] = rng.pick(RIGHT_TRIS.filter((t) => t[2] * c.k <= 100));
        const [a, b, hyp] = [a0 * c.k, b0 * c.k, c0 * c.k];
        const L = rng.int(c.L[0], c.L[1]);
        const u = c.u;
        const tri = a * b;
        const bottom = b * L;
        const back = a * L;
        const slope = hyp * L;
        const SA = tri + bottom + back + slope;
        return {
          prompt: `${c.thing} is a right triangular prism. Each triangular end has legs of ${len(a, u)} and ${len(b, u)} and a sloped side of ${len(hyp, u)}. The prism is ${len(L, u)} long. What is its surface area?`,
          figure: wedgeFig(a, b, hyp, L, u),
          parts: [xPart(SA, `${u}²`)],
          hints: ['A triangular prism has $2$ triangle ends and $3$ rectangle faces.', 'Each triangle has area $\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}$. Each rectangle is one side of the triangle times the length of the prism.'],
          solution: [
            `Two triangle ends: $2 \\times \\tfrac{1}{2} \\times ${a} \\times ${b} = ${n(tri)}${sq(u)}$`,
            `Bottom rectangle: $${b} \\times ${L} = ${n(bottom)}${sq(u)}$`,
            `Upright rectangle: $${a} \\times ${L} = ${n(back)}${sq(u)}$`,
            `Sloped rectangle: $${hyp} \\times ${L} = ${n(slope)}${sq(u)}$`,
            `$SA = ${n(tri)} + ${n(bottom)} + ${n(back)} + ${n(slope)} = ${n(SA)}${sq(u)}$`,
          ],
        };
      }
      if (mode === 'tent') {
        const real = rng.chance(0.5);
        const [b0, h0, s0] = rng.pick(ISO_ENDS);
        const k = real ? 0.1 : 1;
        const [b, h, s] = [exact(b0 * k), exact(h0 * k), exact(s0 * k)];
        const u = real ? 'm' : 'cm';
        const L = real ? rng.int(2, 4) : rng.int(15, 35);
        const thing = real ? rng.pick(['A pup tent', 'A small camping tent', 'A play tent for a daycare']) : rng.pick(['A box for a chocolate bar', 'A wooden model of a roof', 'A gift box for a pen set']);
        const floor = real ? 'including its floor' : 'including its bottom';
        const tri = exact(b * h);
        const bottom = exact(b * L);
        const slopes = exact(2 * s * L);
        const SA = exact(tri + bottom + slopes);
        return {
          prompt: `${thing} is a triangular prism, ${floor}. Each triangular end has a base of ${len(b, u)}, a height of ${len(h, u)} and sloped sides of ${len(s, u)}. The prism is ${len(L, u)} long. What is its surface area?`,
          figure: tentFig(b, h, s, L, u),
          parts: [xPart(SA, `${u}²`)],
          hints: ['Find the area of the $2$ triangle ends, the bottom rectangle and the $2$ sloped rectangles.', 'Use the height of the triangle for its area. Use the sloped side for the sloped rectangles.'],
          solution: [
            `Two triangle ends: $2 \\times \\tfrac{1}{2} \\times ${n(b)} \\times ${n(h)} = ${n(tri)}${sq(u)}$`,
            `Bottom: $${n(b)} \\times ${L} = ${n(bottom)}${sq(u)}$`,
            `Two sloped sides: $2 \\times ${n(s)} \\times ${L} = ${n(slopes)}${sq(u)}$`,
            `$SA = ${n(tri)} + ${n(bottom)} + ${n(slopes)} = ${n(SA)}${sq(u)}$`,
          ],
        };
      }
      const c = rng.pick([
        { thing: 'juice box', u: 'cm', l: [6, 9], w: [3, 5], h: [10, 13] },
        { thing: 'jewellery box', u: 'cm', l: [12, 20], w: [8, 12], h: [4, 8] },
        { thing: 'box of crackers', u: 'cm', l: [20, 26], w: [5, 8], h: [15, 20] },
        { thing: 'closed glass display case', u: 'm', l: [1, 2], w: [0.4, 0.7], h: [0.5, 1] },
      ]);
      const pickD = (lo: number, hi: number) => (c.u === 'm' ? rng.int(lo * 10, hi * 10) / 10 : rng.int(lo * 2, hi * 2) / 2);
      let l: number;
      let w: number;
      let h: number;
      do {
        l = pickD(c.l[0], c.l[1]);
        w = pickD(c.w[0], c.w[1]);
        h = pickD(c.h[0], c.h[1]);
      } while ([l, w, h].every(Number.isInteger));
      const { SA, steps } = boxSteps(l, w, h, c.u);
      return {
        prompt: `A ${c.thing} is ${len(l, c.u)} long, ${len(w, c.u)} wide and ${len(h, c.u)} high. What is its surface area?`,
        figure: prismFig(l, w, h, c.u),
        parts: [xPart(SA, `${c.u}²`)],
        hints: BOX_HINTS,
        solution: [...steps, `The surface area is $${n(SA)}${sq(c.u)}$.`],
      };
    }
    // d === 3
    const mode = rng.pick(['open', 'paint', 'tentFabric'] as const);
    if (mode === 'open') {
      const c = rng.pick([
        { thing: 'wooden planter box with no top', u: 'cm', l: [60, 120], w: [30, 45], h: [25, 40], job: 'How much wood is needed for the outside of the box' },
        { thing: 'fish tank with no lid', u: 'cm', l: [50, 90], w: [25, 40], h: [30, 45], job: 'How much glass is needed to make the tank' },
        { thing: 'sandbox with no top', u: 'm', l: [2, 3], w: [1.2, 2], h: [0.3, 0.5], job: 'How much plywood is needed to build the sandbox, bottom included' },
        { thing: 'open storage tray', u: 'cm', l: [30, 45], w: [20, 30], h: [5, 10], job: 'How much plastic is needed to make the tray' },
      ]);
      const pick = (r: readonly [number, number] | number[]) => (c.u === 'm' ? rng.int(r[0] * 10, r[1] * 10) / 10 : rng.int(r[0], r[1]));
      const l = pick(c.l);
      const w = pick(c.w);
      const h = pick(c.h);
      const { SA, steps } = boxSteps(l, w, h, c.u, { top: false });
      return {
        prompt: `${who} is building a ${c.thing}. It is ${len(l, c.u)} long, ${len(w, c.u)} wide and ${len(h, c.u)} high. ${c.job}?`,
        figure: prismFig(l, w, h, c.u),
        parts: [xPart(SA, `${c.u}²`)],
        hints: ['There is no top, so the box has only $5$ faces.', 'Add the bottom, the front and back, and the two ends.'],
        solution: ['The box has no top, so count only $5$ faces.', ...steps, `${who} needs $${n(SA)}${sq(c.u)}$.`],
      };
    }
    if (mode === 'paint') {
      const c = rng.pick([
        { thing: 'wooden toy box', l: [0.8, 1.2], w: [0.4, 0.6], h: [0.4, 0.6] },
        { thing: 'storage bench', l: [1.2, 1.8], w: [0.4, 0.5], h: [0.4, 0.5] },
        { thing: 'doghouse shaped like a box', l: [0.9, 1.3], w: [0.7, 1], h: [0.7, 1] },
      ]);
      for (;;) {
        const l = rng.int(c.l[0] * 10, c.l[1] * 10) / 10;
        const w = rng.int(c.w[0] * 10, c.w[1] * 10) / 10;
        const h = rng.int(c.h[0] * 10, c.h[1] * 10) / 10;
        const { SA, steps } = boxSteps(l, w, h, 'm', { bottom: false });
        const cover = rng.pick([0.8, 1, 1.2, 1.5]);
        const q = SA / cover;
        if (q - Math.floor(q) < 0.12 || q - Math.floor(q) > 0.9) continue;
        const cans = Math.ceil(q);
        return {
          prompt: `${who} is painting a ${c.thing} that is ${len(l, 'm')} long, ${len(w, 'm')} wide and ${len(h, 'm')} high. Every face is painted except the bottom. One small can of paint covers $${n(cover)}${sq('m')}$.\n\n(a) What area is painted?\n\n(b) How many cans of paint must ${who} buy?`,
          figure: prismFig(l, w, h, 'm'),
          parts: [xPart(SA, 'm²', '(a) Area painted'), numPart(cans, { label: '(b) Cans', suffix: 'cans' })],
          hints: ['The bottom is not painted, so add the areas of the other $5$ faces.', 'Divide the area by the area one can covers. A part of a can is not enough, so round up.'],
          solution: ['The bottom is not painted, so count $5$ faces.', ...steps, `Cans: $${n(SA)} \\div ${n(cover)} \\approx ${n(q, 2)}$. That is more than $${cans - 1}$ cans, so round up.`, `(a) The painted area is $${n(SA)}${sq('m')}$. (b) ${who} must buy $${cans}$ cans.`],
        };
      }
    }
    // tent fabric (no floor) and its cost
    const [b0, h0, s0] = rng.pick(ISO_ENDS.filter((t) => t[0] <= 24));
    const b = exact(b0 / 10);
    const h = exact(h0 / 10);
    const s = exact(s0 / 10);
    const L = rng.pick([2, 2.5, 3, 3.5]);
    const tri = exact(b * h);
    const slopes = exact(2 * s * L);
    const A = exact(tri + slopes);
    const price = retry(() => rng.pick([4.25, 5.5, 6.75, 7.2, 8.4, 9.15, 5.8, 6.3]), (p) => !nearHalf(A * p, 2));
    const cost = exact(A * price);
    return {
      prompt: `${who} is sewing a tent shaped like a triangular prism. The tent has no floor. Each triangular end has a base of ${len(b, 'm')}, a height of ${len(h, 'm')} and sloped sides of ${len(s, 'm')}. The tent is ${len(L, 'm')} long. The fabric costs ${cash(price)} per square metre.\n\n(a) How much fabric is needed?\n\n(b) What does the fabric cost, to the nearest cent?`,
      figure: tentFig(b, h, s, L, 'm'),
      parts: [xPart(A, 'm²', '(a) Fabric'), numPart(cost, { label: '(b) Cost (\\$)', decimals: 2, tolerance: 0.011 })],
      hints: ['There is no floor: use the $2$ triangle ends and the $2$ sloped rectangles only.', 'Multiply the area by the price per square metre.'],
      solution: [
        `Two triangle ends: $2 \\times \\tfrac{1}{2} \\times ${n(b)} \\times ${n(h)} = ${n(tri)}${sq('m')}$`,
        `Two sloped sides: $2 \\times ${n(s)} \\times ${n(L)} = ${n(slopes)}${sq('m')}$`,
        `Fabric: $${n(tri)} + ${n(slopes)} = ${n(A)}${sq('m')}$`,
        `Cost: $${n(A)} \\times ${fmtFixed(price, 2)} = ${n(cost)}$`,
        `(a) ${who} needs $${n(A)}${sq('m')}$ of fabric. (b) It costs ${cash(cost)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.4 — Surface area of cylinders
// ---------------------------------------------------------------------------

const CYL_HINTS = ['A cylinder has two circle ends and a curved surface. Unrolled, the curved surface is a rectangle: its length is the circumference $2\\pi r$ and its width is the height $h$.', '$SA = 2\\pi r^2 + 2\\pi r h$'];

function cylSteps(r: number, h: number, u: string, opts: { top?: boolean; bottom?: boolean } = {}) {
  const ends = (opts.top ?? true ? 1 : 0) + (opts.bottom ?? true ? 1 : 0);
  const circle = Math.PI * r * r;
  const curved = 2 * Math.PI * r * h;
  const SA = ends * circle + curved;
  const steps: string[] = [];
  if (ends === 2) steps.push(`Two circle ends: $2 \\times \\pi \\times ${n(r)}^2 \\approx ${nf(2 * circle, 2)}${sq(u)}$`);
  else if (ends === 1) steps.push(`One circle end: $\\pi \\times ${n(r)}^2 \\approx ${nf(circle, 2)}${sq(u)}$`);
  steps.push(`Curved surface: $2 \\times \\pi \\times ${n(r)} \\times ${n(h)} \\approx ${nf(curved, 2)}${sq(u)}$`);
  if (ends) steps.push(`$SA \\approx ${nf(ends * circle, 2)} + ${nf(curved, 2)} = ${nf(SA, 2)}${sq(u)}$`);
  return { SA, steps };
}

const CANS = [
  { thing: 'soup can', u: 'cm', d: [6.6, 8.4], h: [9, 12] },
  { thing: 'hockey puck', u: 'cm', d: [7.6, 7.6], h: [2.5, 2.5] },
  { thing: 'round tin of hot chocolate mix', u: 'cm', d: [10, 13], h: [12, 16] },
  { thing: 'round hay bale', u: 'm', d: [1.2, 1.8], h: [1.2, 1.5] },
  { thing: 'oil drum', u: 'm', d: [0.5, 0.6], h: [0.8, 0.9] },
  { thing: 'pillar candle', u: 'cm', d: [6, 9], h: [10, 20] },
];

const saCylinder = skill({
  id: 'm8-surface-area-cylinder',
  name: 'Surface area of cylinders',
  description: 'Find the surface area of a right cylinder from its radius or diameter, including labels, open containers and paint costs.',
  outcomes: ['SS3'],
  lessonId: 'm8-8-4',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      for (;;) {
        const r = rng.int(2, 7);
        const h = rng.int(3, 15);
        if (rng.chance(0.45)) {
          const [c, noun] = rng.pick([['a can of soup', 'can'], ['a can of tomatoes', 'can'], ['a jar of peanut butter', 'jar'], ['a can of tennis balls', 'can'], ['a bottle of vitamins', 'bottle']]);
          const A = 2 * Math.PI * r * h;
          if (nearHalf(A, 1)) continue;
          return {
            prompt: `A paper label covers the curved surface of ${c}. The ${noun} has a radius of ${len(r, 'cm')} and a height of ${len(h, 'cm')}. What is the area of the label? Use the $\\pi$ key and round ${roundSq(1, 'cm')}.`,
            figure: cylFig(r, h, 'cm', false),
            parts: [rPart(A, 1, 'cm²')],
            hints: ['Unrolled, the label is a rectangle. Its length is the circumference of the can and its width is the height.', 'Area of the label $= 2\\pi r h$'],
            solution: [`The label is a rectangle: length $2\\pi r$, width $h$.`, `$A = 2 \\times \\pi \\times ${r} \\times ${h} \\approx ${nf(A, 2)}$`, `The label has an area of about $${nf(A, 1)}${sq('cm')}$.`],
          };
        }
        const { SA, steps } = cylSteps(r, h, 'cm');
        if (nearHalf(SA, 1)) continue;
        const c = rng.pick(['a can of beans', 'a round gift box', 'a wooden cylinder for a stacking toy', 'a can of cat food']);
        return {
          prompt: `${cap(c)} is a cylinder with a radius of ${len(r, 'cm')} and a height of ${len(h, 'cm')}. What is its surface area? Use the $\\pi$ key and round ${roundSq(1, 'cm')}.`,
          figure: cylFig(r, h, 'cm', false),
          parts: [rPart(SA, 1, 'cm²')],
          hints: CYL_HINTS,
          solution: [...steps, `The surface area is about $${nf(SA, 1)}${sq('cm')}$.`],
        };
      }
    }
    if (d === 2) {
      for (;;) {
        const c = rng.pick(CANS);
        const step = c.u === 'm' ? 0.1 : 0.2;
        const dia = exact(c.d[0] + step * rng.int(0, Math.round((c.d[1] - c.d[0]) / step)));
        const h = c.u === 'm' ? exact(c.h[0] + 0.1 * rng.int(0, Math.round((c.h[1] - c.h[0]) / 0.1))) : exact(c.h[0] + 0.5 * rng.int(0, Math.round((c.h[1] - c.h[0]) / 0.5)));
        const r = exact(dia / 2);
        const dec = c.u === 'm' ? 2 : 1;
        const { SA, steps } = cylSteps(r, h, c.u);
        if (nearHalf(SA, dec)) continue;
        return {
          prompt: `A ${c.thing} is a cylinder with a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. What is its surface area? Use the $\\pi$ key and round ${roundSq(dec, c.u)}.`,
          figure: cylFig(r, h, c.u, true),
          parts: [rPart(SA, dec, `${c.u}²`)],
          hints: ['First find the radius: half of the diameter.', CYL_HINTS[1]],
          solution: [`Radius: $r = ${n(dia)} \\div 2 = ${n(r)}${un(c.u)}$`, ...steps, `The surface area is about $${nf(SA, dec)}${sq(c.u)}$.`],
        };
      }
    }
    // d === 3
    const mode = rng.pick(['open', 'tube', 'cost'] as const);
    for (;;) {
      if (mode === 'open') {
        const c = rng.pick([
          { thing: 'an above-ground swimming pool', u: 'm', d: [3, 5.4], h: [1, 1.3], job: 'The inside of the wall and the floor are covered with a liner. What area does the liner cover?', step: 0.2 },
          { thing: 'a clay flower pot (no top)', u: 'cm', d: [12, 24], h: [10, 20], job: 'The outside of the pot, including the bottom, is painted. What area is painted?', step: 1 },
          { thing: 'a drinking glass (no top)', u: 'cm', d: [6, 8], h: [10, 14], job: 'How much glass is needed to make it?', step: 0.5 },
          { thing: 'a metal garbage can without its lid', u: 'cm', d: [40, 56], h: [60, 80], job: 'How much metal is needed to make it?', step: 2 },
        ]);
        const dia = exact(c.d[0] + c.step * rng.int(0, Math.round((c.d[1] - c.d[0]) / c.step)));
        const h = c.u === 'm' ? exact(c.h[0] + 0.1 * rng.int(0, Math.round((c.h[1] - c.h[0]) / 0.1))) : rng.int(c.h[0], c.h[1]);
        const r = exact(dia / 2);
        const { SA, steps } = cylSteps(r, h, c.u, { top: false });
        if (nearHalf(SA, 1)) continue;
        return {
          prompt: `${cap(c.thing)} is a cylinder with a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. It has a bottom but no top. ${c.job} Round ${roundSq(1, c.u)}.`,
          figure: cylFig(r, h, c.u, true),
          parts: [rPart(SA, 1, `${c.u}²`)],
          hints: ['There is no top, so use only one circle and the curved surface.', 'Area $= \\pi r^2 + 2\\pi r h$. Remember to halve the diameter.'],
          solution: [`Radius: $r = ${n(dia)} \\div 2 = ${n(r)}${un(c.u)}$`, 'There is no top: one circle plus the curved surface.', ...steps, `The area is about $${nf(SA, 1)}${sq(c.u)}$.`],
        };
      }
      if (mode === 'tube') {
        const c = rng.pick([
          { thing: 'cardboard tube for mailing a poster', u: 'cm', d: [6, 10], h: [60, 90], job: 'How much cardboard is used for the tube (the ends are left open)?' },
          { thing: 'section of round air duct', u: 'cm', d: [10, 20], h: [100, 150], job: 'How much sheet metal is needed for the duct (it has no ends)?' },
          { thing: 'concrete column for a deck', u: 'cm', d: [20, 30], h: [90, 120], job: 'Only the curved side is painted. What area is painted?' },
        ]);
        const dia = rng.int(c.d[0], c.d[1]);
        const h = rng.int(c.h[0] / 5, c.h[1] / 5) * 5;
        const r = dia / 2;
        const A = Math.PI * dia * h;
        if (nearHalf(A, 0)) continue;
        return {
          prompt: `A ${c.thing} has a diameter of ${len(dia, 'cm')} and a length of ${len(h, 'cm')}. ${c.job} Round ${roundSq(0, 'cm')}.`,
          figure: cylFig(r, h, 'cm', true),
          parts: [rPart(A, 0, 'cm²')],
          hints: ['There are no circle ends: only the curved surface counts.', 'Curved surface $= 2\\pi r h$, which is the same as $\\pi d h$.'],
          solution: ['Only the curved surface counts.', `Curved surface: $\\pi \\times ${dia} \\times ${h} \\approx ${nf(A, 2)}$`, `The area is about $${nf(A, 0)}${sq('cm')}$.`],
        };
      }
      // cost to paint a closed tank
      const c = rng.pick([
        { thing: 'water tank on a farm', d: [2, 3.2], h: [2.5, 4] },
        { thing: 'grain bin model for a school project', d: [1, 1.6], h: [1.2, 2] },
        { thing: 'rain barrel', d: [0.6, 0.8], h: [0.9, 1.1] },
      ]);
      const dia = exact(c.d[0] + 0.2 * rng.int(0, Math.round((c.d[1] - c.d[0]) / 0.2)));
      const h = exact(c.h[0] + 0.1 * rng.int(0, Math.round((c.h[1] - c.h[0]) / 0.1)));
      const r = exact(dia / 2);
      const { SA, steps } = cylSteps(r, h, 'm');
      if (nearHalf(SA, 1)) continue;
      const area = roundTo(SA, 1);
      const price = rng.pick([3.25, 4.5, 5.75, 6.4, 7.8]);
      const cost = exact(area * price);
      if (nearHalf(cost, 2)) continue;
      return {
        prompt: `${who} is painting the outside of a closed ${c.thing}, including the top and the bottom. It is a cylinder with a diameter of ${len(dia, 'm')} and a height of ${len(h, 'm')}. Paint costs ${cash(price)} per square metre.\n\n(a) Find the surface area, rounded ${roundSq(1, 'm')}.\n\n(b) Use your rounded area to find the cost of the paint, to the nearest cent.`,
        figure: cylFig(r, h, 'm', true),
        parts: [rPart(SA, 1, 'm²', '(a) Surface area'), numPart(cost, { label: '(b) Cost (\\$)', decimals: 2, tolerance: 0.011 })],
        hints: ['Halve the diameter to get the radius, then use $SA = 2\\pi r^2 + 2\\pi r h$.', 'Multiply the rounded area by the price per square metre.'],
        solution: [`Radius: $r = ${n(dia)} \\div 2 = ${n(r)}${un('m')}$`, ...steps, `Rounded: $SA \\approx ${nf(area, 1)}${sq('m')}$`, `Cost: $${nf(area, 1)} \\times ${fmtFixed(price, 2)} = ${nf(cost, 2)}$`, `(a) About $${nf(area, 1)}${sq('m')}$. (b) The paint costs ${cash(cost)}.`],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.5 — Volume of prisms and cylinders
// ---------------------------------------------------------------------------

const volPrism = skill({
  id: 'm8-volume-prism',
  name: 'Volume of prisms',
  description: 'Use V = (area of base) × height to find the volume and capacity of rectangular and triangular prisms, and find a missing dimension.',
  outcomes: ['SS4'],
  lessonId: 'm8-8-5',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.3)) {
        const shape = rng.pick(['triangle', 'pentagon', 'hexagon', 'trapezoid'] as const);
        const base = rng.int(12, 60);
        const h = rng.int(4, 15);
        const u = rng.pick(['cm', 'm'] as const);
        const V = base * h;
        return {
          prompt: `The base of a prism is a ${shape} with an area of $${base}${sq(u)}$. The height of the prism is ${len(h, u)}. What is its volume?`,
          parts: [xPart(V, `${u}³`)],
          hints: ['For any right prism, $V = (\\text{area of base}) \\times \\text{height}$.', 'The shape of the base does not matter once you know its area.'],
          solution: [`$V = (\\text{area of base}) \\times \\text{height}$`, `$V = ${base} \\times ${h} = ${n(V)}${cu(u)}$`, `The volume is $${n(V)}${cu(u)}$.`],
        };
      }
      const c = rng.pick(BOXES);
      const l = rng.int(c.l[0], c.l[1]);
      const w = rng.int(c.w[0], c.w[1]);
      const h = rng.int(c.h[0], c.h[1]);
      const base = l * w;
      const V = base * h;
      return {
        prompt: `A ${c.thing} is ${len(l, c.u)} long, ${len(w, c.u)} wide and ${len(h, c.u)} high. What is its volume?`,
        figure: prismFig(l, w, h, c.u),
        parts: [xPart(V, `${c.u}³`)],
        hints: ['$V = (\\text{area of base}) \\times \\text{height}$', 'The base is a rectangle: its area is length $\\times$ width.'],
        solution: [`Area of base: $${l} \\times ${w} = ${n(base)}${sq(c.u)}$`, `$V = ${n(base)} \\times ${h} = ${n(V)}${cu(c.u)}$`, `The volume is $${n(V)}${cu(c.u)}$.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['wedge', 'litres', 'decimal'] as const);
      if (mode === 'wedge') {
        const c = rng.pick([
          { thing: 'A wooden doorstop', u: 'cm', k: 1, L: [4, 9] },
          { thing: 'A ramp for a skateboard park', u: 'cm', k: 10, L: [100, 200] },
          { thing: 'A block of cheese cut as a wedge', u: 'cm', k: 1, L: [5, 12] },
          { thing: 'A foam wedge for a gym class', u: 'cm', k: 5, L: [40, 80] },
        ]);
        const [a0, b0, c0] = rng.pick(RIGHT_TRIS.filter((t) => t[2] * c.k <= 120));
        const [a, b, hyp] = [a0 * c.k, b0 * c.k, c0 * c.k];
        const L = c.k === 10 ? rng.int(c.L[0] / 10, c.L[1] / 10) * 10 : rng.int(c.L[0], c.L[1]);
        const base = exact((a * b) / 2);
        const V = exact(base * L);
        return {
          prompt: `${c.thing} is a right triangular prism. Each triangular end has legs of ${len(a, c.u)} and ${len(b, c.u)} and a sloped side of ${len(hyp, c.u)}. The prism is ${len(L, c.u)} long. What is its volume?`,
          figure: wedgeFig(a, b, hyp, L, c.u),
          parts: [xPart(V, `${c.u}³`)],
          hints: ['The base of this prism is the triangle at the end. Its area is $\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}$, using the two legs.', 'Multiply the area of the triangle by the length of the prism. You do not need the sloped side.'],
          solution: [`Area of the triangle: $\\tfrac{1}{2} \\times ${a} \\times ${b} = ${n(base)}${sq(c.u)}$`, `$V = ${n(base)} \\times ${L} = ${n(V)}${cu(c.u)}$`, `The volume is $${n(V)}${cu(c.u)}$.`],
        };
      }
      if (mode === 'litres') {
        const c = rng.pick([
          { thing: 'fish tank', l: [50, 100], w: [25, 40], h: [30, 50] },
          { thing: 'cooler', l: [40, 60], w: [25, 35], h: [25, 40] },
          { thing: 'planter box', l: [60, 100], w: [20, 30], h: [20, 30] },
          { thing: 'storage tote', l: [50, 70], w: [30, 40], h: [25, 35] },
        ]);
        const l = rng.int(c.l[0] / 5, c.l[1] / 5) * 5;
        const w = rng.int(c.w[0] / 5, c.w[1] / 5) * 5;
        const h = rng.int(c.h[0], c.h[1]);
        const V = l * w * h;
        const L = exact(V / 1000);
        return {
          prompt: `The inside of a ${c.thing} is ${len(l, 'cm')} long, ${len(w, 'cm')} wide and ${len(h, 'cm')} deep. What is its capacity in litres? Use $1\\ \\text{L} = 1000\\ \\text{cm}^3$.`,
          figure: prismFig(l, w, h, 'cm'),
          parts: [xPart(L, 'L')],
          hints: ['Find the volume in cubic centimetres first.', 'Divide by $1000$ to change cubic centimetres to litres.'],
          solution: [`$V = ${l} \\times ${w} \\times ${h} = ${n(V)}${cu('cm')}$`, `Litres: $${n(V)} \\div 1000 = ${n(L)}$`, `The ${c.thing} holds $${n(L)}${un('L')}$.`],
        };
      }
      const l = rng.int(8, 19) + 0.5;
      const w = rng.int(8, 24) / 2;
      const h = rng.int(6, 30) / 2;
      const base = exact(l * w);
      const V = exact(base * h);
      const thing = rng.pick(['brick of modelling clay', 'block of butter', 'bar of soap', 'sponge']);
      return {
        prompt: `A ${thing} is a rectangular prism ${len(l, 'cm')} long, ${len(w, 'cm')} wide and ${len(h, 'cm')} high. What is its volume?`,
        figure: prismFig(l, w, h, 'cm'),
        parts: [xPart(V, 'cm³')],
        hints: ['$V = (\\text{area of base}) \\times \\text{height}$', 'Multiply length $\\times$ width $\\times$ height.'],
        solution: [`Area of base: $${n(l)} \\times ${n(w)} = ${n(base)}${sq('cm')}$`, `$V = ${n(base)} \\times ${n(h)} = ${n(V)}${cu('cm')}$`, `The volume is $${n(V)}${cu('cm')}$.`],
      };
    }
    // d === 3
    const mode = rng.pick(['missingBox', 'missingWedge', 'depth', 'tent'] as const);
    if (mode === 'missingBox') {
      const l = rng.int(6, 25);
      const w = rng.int(4, 15);
      const h = rng.int(3, 20);
      const V = l * w * h;
      const thing = rng.pick(['A box of printer paper', 'A gift box', 'A tissue box', 'A toy box for a doll house', 'A lunch box']);
      const unit = 'cm';
      return {
        prompt: `${thing} is a rectangular prism with a volume of $${n(V)}${cu(unit)}$. Its base is ${len(l, unit)} long and ${len(w, unit)} wide. How high is it?`,
        parts: [numPart(h, { suffix: unit })],
        hints: ['$V = (\\text{area of base}) \\times \\text{height}$, so height $= V \\div (\\text{area of base})$.', 'Find the area of the base first.'],
        solution: [`Area of base: $${l} \\times ${w} = ${n(l * w)}${sq(unit)}$`, `$${n(V)} = ${n(l * w)} \\times h$`, `$h = ${n(V)} \\div ${n(l * w)} = ${h}$`, `It is ${len(h, unit)} high.`],
      };
    }
    if (mode === 'missingWedge') {
      const [a, b] = rng.pick(RIGHT_TRIS);
      const L = rng.int(5, 30);
      const base = exact((a * b) / 2);
      const V = exact(base * L);
      const thing = rng.pick(['A wooden wedge', 'A triangular box for a chocolate bar', 'A slice of a block of cheese']);
      return {
        prompt: `${thing} is a right triangular prism with a volume of $${n(V)}${cu('cm')}$. Each triangular end has legs of ${len(a, 'cm')} and ${len(b, 'cm')}. How long is the prism?`,
        parts: [numPart(L, { suffix: 'cm' })],
        hints: ['Find the area of the triangular end: $\\tfrac{1}{2} \\times$ leg $\\times$ leg.', 'Length $= V \\div (\\text{area of the triangle})$.'],
        solution: [`Area of the triangle: $\\tfrac{1}{2} \\times ${a} \\times ${b} = ${n(base)}${sq('cm')}$`, `$${n(V)} = ${n(base)} \\times L$`, `$L = ${n(V)} \\div ${n(base)} = ${L}$`, `The prism is ${len(L, 'cm')} long.`],
      };
    }
    if (mode === 'depth') {
      const l = rng.int(10, 20) * 5;
      const w = rng.int(5, 9) * 5;
      const H = rng.int(30, 50);
      const gap = rng.int(3, 8);
      const depth = H - gap;
      const V = l * w * depth;
      const Lt = exact(V / 1000);
      return {
        prompt: `${who}'s fish tank is ${len(l, 'cm')} long, ${len(w, 'cm')} wide and ${len(H, 'cm')} high. ${who} fills it with water to ${len(gap, 'cm')} below the top. How many litres of water are in the tank? Use $1\\ \\text{L} = 1000\\ \\text{cm}^3$.`,
        figure: prismFig(l, w, H, 'cm'),
        parts: [xPart(Lt, 'L')],
        hints: ['The water does not reach the top: find the depth of the water first.', 'Find the volume of the water in cubic centimetres, then divide by $1000$.'],
        solution: [`Depth of water: $${H} - ${gap} = ${depth}${un('cm')}$`, `Volume of water: $${l} \\times ${w} \\times ${depth} = ${n(V)}${cu('cm')}$`, `Litres: $${n(V)} \\div 1000 = ${n(Lt)}$`, `There are $${n(Lt)}${un('L')}$ of water in the tank.`],
      };
    }
    const [b0, h0, s0] = rng.pick(ISO_ENDS.filter((t) => t[0] <= 24));
    const b = exact(b0 / 10);
    const h = exact(h0 / 10);
    const s = exact(s0 / 10);
    const L = rng.pick([2, 2.5, 3, 3.5, 4]);
    const base = exact((b * h) / 2);
    const V = exact(base * L);
    return {
      prompt: `${who}'s tent is a triangular prism. Each triangular end has a base of ${len(b, 'm')}, a height of ${len(h, 'm')} and sloped sides of ${len(s, 'm')}. The tent is ${len(L, 'm')} long. How much space is inside the tent?`,
      figure: tentFig(b, h, s, L, 'm'),
      parts: [xPart(V, 'm³')],
      hints: ['The space inside is the volume. The base of the prism is the triangle at the end.', 'Use the height of the triangle, not the sloped side, for its area.'],
      solution: [`Area of the triangle: $\\tfrac{1}{2} \\times ${n(b)} \\times ${n(h)} = ${n(base)}${sq('m')}$`, `$V = ${n(base)} \\times ${n(L)} = ${n(V)}${cu('m')}$`, `There are $${n(V)}${cu('m')}$ of space inside the tent.`],
    };
  },
});

const volCylinder = skill({
  id: 'm8-volume-cylinder',
  name: 'Volume of cylinders',
  description: 'Use V = πr²h to find the volume and capacity of cylinders, and solve problems such as a missing height or how many containers can be filled.',
  outcomes: ['SS4'],
  lessonId: 'm8-8-5',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    for (;;) {
      if (d === 1) {
        const c = rng.pick([
          { thing: 'a can of soup', r: [3, 4], h: [9, 12] },
          { thing: 'a round cake pan', r: [10, 13], h: [4, 6] },
          { thing: 'a pillar candle', r: [3, 6], h: [8, 20] },
          { thing: 'a glass vase', r: [4, 8], h: [15, 30] },
          { thing: 'a can of paint', r: [8, 9], h: [18, 20] },
          { thing: 'a round tin of cookies', r: [9, 12], h: [7, 10] },
        ]);
        const r = rng.int(c.r[0], c.r[1]);
        const h = rng.int(c.h[0], c.h[1]);
        const base = Math.PI * r * r;
        const V = base * h;
        if (nearHalf(V, 1)) continue;
        const thing = c.thing;
        return {
          prompt: `${cap(thing)} is a cylinder with a radius of ${len(r, 'cm')} and a height of ${len(h, 'cm')}. What is its volume? Use the $\\pi$ key and round ${roundCu(1, 'cm')}.`,
          figure: cylFig(r, h, 'cm', false),
          parts: [rPart(V, 1, 'cm³')],
          hints: ['A cylinder is like a prism with a circle for its base: $V = (\\text{area of base}) \\times \\text{height}$.', '$V = \\pi r^2 h$'],
          solution: [`Area of base: $\\pi \\times ${r}^2 \\approx ${nf(base, 2)}${sq('cm')}$`, `$V \\approx ${nf(base, 2)} \\times ${h} \\approx ${nf(V, 2)}$`, `The volume is about $${nf(V, 1)}${cu('cm')}$.`],
        };
      }
      if (d === 2) {
        const c = rng.pick([
          { thing: 'drinking glass', d: [6, 8], h: [10, 15], out: 'mL' },
          { thing: 'travel mug', d: [7, 9], h: [14, 19], out: 'mL' },
          { thing: 'water jug', d: [12, 16], h: [20, 28], out: 'L' },
          { thing: 'pot for cooking soup', d: [20, 28], h: [14, 20], out: 'L' },
          { thing: 'juice can', d: [5, 7], h: [10, 13], out: 'mL' },
        ] as const);
        const dia = rng.int(c.d[0] * 2, c.d[1] * 2) / 2;
        const h = rng.int(c.h[0], c.h[1]);
        const r = exact(dia / 2);
        const base = Math.PI * r * r;
        const V = base * h;
        if (c.out === 'mL') {
          if (nearHalf(V, 0)) continue;
          return {
            prompt: `The inside of a ${c.thing} is a cylinder with a diameter of ${len(dia, 'cm')} and a height of ${len(h, 'cm')}. How many millilitres does it hold? Use $1\\ \\text{cm}^3 = 1\\ \\text{mL}$ and round to the nearest millilitre.`,
            figure: cylFig(r, h, 'cm', true),
            parts: [rPart(V, 0, 'mL')],
            hints: ['Halve the diameter to get the radius, then use $V = \\pi r^2 h$.', 'Each cubic centimetre holds $1$ mL.'],
            solution: [`Radius: $r = ${n(dia)} \\div 2 = ${n(r)}${un('cm')}$`, `$V = \\pi \\times ${n(r)}^2 \\times ${h} \\approx ${nf(V, 2)}${cu('cm')}$`, `It holds about $${nf(V, 0)}${un('mL')}$.`],
          };
        }
        const Lt = V / 1000;
        if (nearHalf(Lt, 1)) continue;
        return {
          prompt: `The inside of a ${c.thing} is a cylinder with a diameter of ${len(dia, 'cm')} and a height of ${len(h, 'cm')}. What is its capacity in litres? Use $1\\ \\text{L} = 1000\\ \\text{cm}^3$ and round to the nearest tenth of a litre.`,
          figure: cylFig(r, h, 'cm', true),
          parts: [rPart(Lt, 1, 'L')],
          hints: ['Halve the diameter to get the radius, then use $V = \\pi r^2 h$.', 'Divide the volume in cubic centimetres by $1000$ to get litres.'],
          solution: [`Radius: $r = ${n(dia)} \\div 2 = ${n(r)}${un('cm')}$`, `$V = \\pi \\times ${n(r)}^2 \\times ${h} \\approx ${nf(V, 1)}${cu('cm')}$`, `Litres: $${nf(V, 1)} \\div 1000 \\approx ${nf(Lt, 3)}$`, `The capacity is about $${nf(Lt, 1)}${un('L')}$.`],
        };
      }
      // d === 3
      const mode = rng.pick(['height', 'glasses', 'compare'] as const);
      if (mode === 'height') {
        const c = rng.pick([
          { thing: 'water tank', short: 'tank', u: 'm', r: [0.5, 1.5], V: [1500, 6000], step: 0.1 },
          { thing: 'rain barrel', short: 'barrel', u: 'm', r: [0.25, 0.4], V: [150, 300], step: 0.05 },
        ]);
        const r = exact(c.r[0] + c.step * rng.int(0, Math.round((c.r[1] - c.r[0]) / c.step)));
        const litres = rng.int(c.V[0] / 50, c.V[1] / 50) * 50;
        const m3 = litres / 1000;
        const base = Math.PI * r * r;
        const h = m3 / base;
        if (nearHalf(h, 2) || h < 0.4 || h > 4) continue;
        return {
          prompt: `A cylindrical ${c.thing} holds $${n(litres)}${un('L')}$ of water when full. Its radius is ${len(r, 'm')}. How tall is the ${c.short}? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$ and round to the nearest hundredth of a metre.`,
          parts: [rPart(h, 2, 'm')],
          hints: ['Change the capacity to cubic metres first.', 'From $V = \\pi r^2 h$, the height is $h = V \\div (\\pi r^2)$.'],
          solution: [`Volume: $${n(litres)} \\div 1000 = ${n(m3)}${cu('m')}$`, `Area of base: $\\pi \\times ${n(r)}^2 \\approx ${nf(base, 4)}${sq('m')}$`, `$h = ${n(m3)} \\div ${nf(base, 4)} \\approx ${nf(h, 3)}$`, `The ${c.short} is about $${nf(h, 2)}${un('m')}$ tall.`],
        };
      }
      if (mode === 'glasses') {
        const jugD = rng.int(12, 18);
        const jugH = rng.int(20, 28);
        const gD = rng.int(12, 16) / 2;
        const gH = rng.int(9, 13);
        const Vj = Math.PI * (jugD / 2) ** 2 * jugH;
        const Vg = Math.PI * (gD / 2) ** 2 * gH;
        const q = Vj / Vg;
        if (q - Math.floor(q) < 0.1 || q - Math.floor(q) > 0.9) continue;
        const full = Math.floor(q);
        return {
          prompt: `${who} makes lemonade for a ${rng.pick(['school fun fair', 'hockey team', 'family barbecue'])}. The jug is a cylinder with a diameter of ${len(jugD, 'cm')} and a height of ${len(jugH, 'cm')}. Each glass is a cylinder with a diameter of ${len(gD, 'cm')} and a height of ${len(gH, 'cm')}. How many glasses can ${who} fill completely from a full jug?`,
          parts: [numPart(full, { suffix: 'glasses' })],
          hints: ['Find the volume of the jug and the volume of one glass.', 'Divide, then think: can a part of a glass count as a full glass?'],
          solution: [`Jug: $V = \\pi \\times ${n(jugD / 2)}^2 \\times ${jugH} \\approx ${nf(Vj, 1)}${cu('cm')}$`, `Glass: $V = \\pi \\times ${n(gD / 2)}^2 \\times ${gH} \\approx ${nf(Vg, 1)}${cu('cm')}$`, `$${nf(Vj, 1)} \\div ${nf(Vg, 1)} \\approx ${nf(q, 2)}$`, `Only whole glasses count, so ${who} can fill $${full}$ glasses.`],
        };
      }
      const r1 = rng.int(6, 12) / 2;
      const h1 = rng.int(8, 16);
      const r2 = rng.int(6, 12) / 2;
      const h2 = rng.int(8, 16);
      if (r1 === r2 || (r1 > r2) === (h1 > h2) || h1 === h2) continue;
      const V1 = Math.PI * r1 * r1 * h1;
      const V2 = Math.PI * r2 * r2 * h2;
      const diff = Math.abs(V1 - V2);
      if (diff < 30 || nearHalf(diff, 1)) continue;
      const big = V1 > V2 ? 'A' : 'B';
      return {
        prompt: `Can A has a radius of ${len(r1, 'cm')} and a height of ${len(h1, 'cm')}. Can B has a radius of ${len(r2, 'cm')} and a height of ${len(h2, 'cm')}. ${who} thinks the ${h1 > h2 ? 'taller' : 'shorter'} can holds more because ${h1 > h2 ? 'it is taller' : 'it is wider'}.\n\n(a) Which can holds more?\n\n(b) By how many cubic centimetres? Round ${roundCu(1, 'cm')}.`,
        parts: [{ label: '(a)', answer: fixedChoice(['Can A', 'Can B'], big === 'A' ? 0 : 1) }, rPart(diff, 1, 'cm³', '(b) Difference')],
        hints: ['Find the volume of each can with $V = \\pi r^2 h$.', 'Subtract the smaller volume from the larger one.'],
        solution: [`Can A: $V = \\pi \\times ${n(r1)}^2 \\times ${h1} \\approx ${nf(V1, 2)}${cu('cm')}$`, `Can B: $V = \\pi \\times ${n(r2)}^2 \\times ${h2} \\approx ${nf(V2, 2)}${cu('cm')}$`, `Difference: $${nf(Math.max(V1, V2), 2)} - ${nf(Math.min(V1, V2), 2)} \\approx ${nf(diff, 2)}$`, `(a) Can ${big} holds more. (b) It holds about $${nf(diff, 1)}${cu('cm')}$ more.`],
        answerDisplay: `Can ${big}, about ${nf(diff, 1)} cm³ more`,
      };
    }
  },
});

export { NAMES, cap, listWords, letterOf, LETTERS };

export const SOLIDS_SKILLS: SkillDef[] = [views, nets, saPrism, saCylinder, volPrism, volCylinder];
