/** Math 20-4 Unit 7 — Perimeter and Area (SS2): perimeter and circumference, area of shapes, composite shapes and the cost of materials. */
import { fixedChoice, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

const tx = (u: string) => `\\text{${u}}`;
const sq = (u: string) => `\\text{${u}}^2`;
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);

function grp(s: string): string {
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const digits = neg ? i.slice(1) : i;
  const g = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : digits;
  return `${neg ? '-' : ''}${g}${f !== undefined ? '.' + f : ''}`;
}
/** LaTeX number without trailing zeros. */
const nm = (x: number, dp = 4) => grp(fmt(x, dp));
/** LaTeX number with exactly `dp` decimals. */
const nf = (x: number, dp: number) => grp(fmtFixed(x, dp));
/** A length as inline maths. */
const len = (x: number, u: string) => `$${nm(x)}\\ ${tx(u)}$`;
/** An area as inline maths. */
const ar = (x: number, u: string) => `$${nm(x)}\\ ${sq(u)}$`;
/** A label on a figure, e.g. "4.5 m". */
const lab = (x: number, u: string) => `${fmt(x)} ${u}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a hexagon", "an octagon". */
const an = (w: string) => `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;

/** Money for Markdown text (outside maths): \$1,234.50 */
function cash(x: number): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${i.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${f}`;
}
/** Money inside maths, with exactly two decimals. */
const mon = (x: number) => fmtFixed(x, 2);

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}

/** An exact numeric answer. Decimal answers keep their decimal form for display. */
function exact(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  const d = placesOf(v);
  if (d === 0) return numPart(v, { suffix, label });
  return numPart(v, { suffix, label, decimals: d, tolerance: 0.5 * 10 ** -d });
}

/** A money answer to the cent. */
const moneyPart = (x: number, label: string): Part => numPart(x, { decimals: 2, tolerance: 0.011, label });

/** True when x is safely away from a rounding boundary (…5) at `dp` decimal places. */
function clearOf(x: number, dp: number, margin = 0.06): boolean {
  const s = Math.abs(x) * 10 ** dp;
  const f = s - Math.floor(s);
  return Math.abs(f - 0.5) > margin;
}

/** A number with one decimal place between lo and hi that is not a whole number. */
const tenths = (rng: Rng, lo: number, hi: number) => retry(() => rng.int(Math.round(lo * 10), Math.round(hi * 10)) / 10, (x) => !Number.isInteger(x));
/** A realistic shelf price such as 3.49 or 24.99. */
const price = (rng: Rng, lo: number, hi: number) => rng.int(lo, hi) + rng.pick([0.29, 0.49, 0.79, 0.99]);

const UNIT: Record<string, { one: string; many: string }> = {
  cm: { one: 'centimetre', many: 'centimetres' },
  m: { one: 'metre', many: 'metres' },
  in: { one: 'inch', many: 'inches' },
  ft: { one: 'foot', many: 'feet' },
};
const tenthOf = (u: string) => `to the nearest tenth of ${u === 'in' ? 'an' : 'a'} ${UNIT[u].one}`;
const tenthSq = (u: string) => `to the nearest tenth of a square ${UNIT[u].one}`;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Cody', 'Talia',
];

// ---------------------------------------------------------------------------
// Figures: shapes drawn to scale on a plain canvas, with every needed length labelled.
// The canvas is 340 units wide, so one unit is one pixel. Labels are drawn with invisible
// anchor points; each label is pushed away from its side until it clears every line.
// ---------------------------------------------------------------------------

type P = [number, number];
type Box = [number, number, number, number];
type Color = 'brand' | 'accent' | 'muted';

/** A label for the point `at`, placed on the side that `dir` points to. */
interface Lab {
  text: string;
  at: P;
  dir: P;
  /** Other places (or shorter texts) to try, in order, when this one does not fit cleanly. */
  alt?: Lab[];
}

interface Pic {
  /** Closed shapes (the first point is not repeated), or open outlines when `open` is set. */
  shapes: Array<{ pts: P[]; color?: Color; open?: boolean }>;
  dashed?: Array<[P, P]>;
  labels?: Lab[];
  /** Right-angle marks at `at`, between the unit directions u and v. */
  right?: Array<{ at: P; u: P; v: P }>;
  caption: string;
}

const CHAR_W = 7.6;
const TEXT_H = 12;

function segDist(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

function segsCross(a: P, b: P, c: P, d: P): boolean {
  const o = (p: P, q: P, r: P) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}

function segHitsBox(a: P, b: P, box: Box): boolean {
  const [x0, y0, x1, y1] = box;
  const inside = (p: P) => p[0] >= x0 && p[0] <= x1 && p[1] >= y0 && p[1] <= y1;
  if (inside(a) || inside(b)) return true;
  const c: P[] = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
  for (let j = 0; j < 4; j++) if (segsCross(a, b, c[j], c[(j + 1) % 4])) return true;
  return false;
}

const boxesOverlap = (p: Box, q: Box) => p[0] < q[2] && q[0] < p[2] && p[1] < q[3] && q[1] < p[3];
const nearBox = (p: P, b: Box, r: number) => p[0] > b[0] - r && p[0] < b[2] + r && p[1] > b[1] - r && p[1] < b[3] + r;

interface Placed {
  A: P;
  box: Box;
  text: string;
}

/**
 * Push a label out from M along dir until it is clear of every line and every other label.
 * In "inside" mode the label must stay in the region it starts in: it fails as soon as its box touches a line.
 */
function placeLabel(M: P, dir: P, text: string, segs: Array<[P, P]>, placed: Placed[], inside: boolean, maxPush: number): Placed | null {
  const w = text.length * CHAR_W;
  const h = TEXT_H;
  const L = Math.hypot(dir[0], dir[1]) || 1;
  const n: P = [dir[0] / L, dir[1] / L];
  const d0 = Math.abs(n[0]) * (w / 2) + Math.abs(n[1]) * (h / 2) + 6;
  for (let dist = d0; dist <= d0 + maxPush; dist += 2) {
    const T: P = [M[0] + n[0] * dist, M[1] + n[1] * dist];
    const A: P = [T[0] - w / 2 - 8, T[1] - 12];
    const box: Box = [T[0] - w / 2 - 1, T[1] - h / 2 - 1, T[0] + w / 2 + 1, T[1] + h / 2 + 1];
    if (segs.some(([a, b]) => segHitsBox(a, b, box))) {
      if (inside) return null;
      continue;
    }
    const anchorClear = segs.every(([a, b]) => segDist(A, a, b) >= 5.5);
    const labelsClear = placed.every((p) => !boxesOverlap(p.box, box) && !nearBox(A, p.box, 5) && !nearBox(p.A, box, 5));
    if (anchorClear && labelsClear) return { A, box, text };
  }
  return null;
}

/**
 * Place a label. A label with alternatives is an inside label: each option is tried in order and must fit
 * without crossing a line. The last resort is the last option pushed outward as far as needed.
 */
function placeAny(l: Lab, T: (p: P) => P, segs: Array<[P, P]>, placed: Placed[]): Placed {
  const options = [l, ...(l.alt ?? [])];
  if (options.length > 1) {
    for (const o of options) {
      const got = placeLabel(T(o.at), o.dir, o.text, segs, placed, true, 60);
      if (got) return got;
    }
  }
  const last = options[options.length - 1];
  const got = placeLabel(T(last.at), last.dir, last.text, segs, placed, false, 400);
  if (got) return got;
  const M = T(last.at);
  return { A: [M[0] - 8, M[1] - 12], box: [M[0], M[1] - 6, M[0] + last.text.length * CHAR_W, M[1] + 6], text: last.text };
}

const edgesOf = (pts: P[], open?: boolean): Array<[P, P]> => (open ? pts.slice(1) : pts).map((p, i) => (open ? [pts[i], p] : [p, pts[(i + 1) % pts.length]]) as [P, P]);

/** Draw shapes to scale with their labels on a 340-unit-wide canvas. */
export function drawPlan(pic: Pic): PlaneFigure {
  const all = pic.shapes.flatMap((s) => s.pts);
  const minX = Math.min(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const W = Math.max(...all.map((p) => p[0])) - minX || 1;
  const H = Math.max(...all.map((p) => p[1])) - minY || 1;
  let s = Math.min(250 / W, 200 / H);
  let polys: P[][] = [];
  let dashed: Array<[P, P]> = [];
  let marks: P[][] = [];
  let placed: Placed[] = [];
  let bx: Box = [0, 0, 0, 0];
  for (let iter = 0; iter < 60; iter++) {
    const T = (p: P): P => [(p[0] - minX) * s, (p[1] - minY) * s];
    polys = pic.shapes.map((sh) => sh.pts.map(T));
    dashed = (pic.dashed ?? []).map(([a, b]) => [T(a), T(b)] as [P, P]);
    marks = (pic.right ?? []).map((r) => {
      const c = T(r.at);
      const k = 9;
      const p1: P = [c[0] + r.u[0] * k, c[1] + r.u[1] * k];
      const p2: P = [p1[0] + r.v[0] * k, p1[1] + r.v[1] * k];
      const p3: P = [c[0] + r.v[0] * k, c[1] + r.v[1] * k];
      return [p1, p2, p3];
    });
    const segs: Array<[P, P]> = [...polys.flatMap((q, i) => edgesOf(q, pic.shapes[i].open)), ...dashed, ...marks.flatMap((m) => [[m[0], m[1]], [m[1], m[2]]] as Array<[P, P]>)];
    placed = [];
    for (const l of pic.labels ?? []) placed.push(placeAny(l, T, segs, placed));
    const xs = [...polys.flat().map((p) => p[0]), ...placed.flatMap((p) => [p.box[0], p.box[2], p.A[0] - 5])];
    const ys = [...polys.flat().map((p) => p[1]), ...placed.flatMap((p) => [p.box[1], p.box[3], p.A[1] - 5, p.A[1] + 5])];
    bx = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    if (bx[2] - bx[0] <= 330 && bx[3] - bx[1] <= 230) break;
    s *= 0.93;
  }
  const ox = (340 - (bx[2] - bx[0])) / 2 - bx[0];
  const oy = 6 - bx[1];
  const r1 = (v: number) => Math.round(v * 10) / 10;
  const S = (p: P): [number, number] => [r1(p[0] + ox), r1(p[1] + oy)];
  const points: PlanePoint[] = placed.map((p) => {
    const [x, y] = S(p.A);
    return { x, y, label: p.text, color: 'muted', open: true };
  });
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: 340, yMin: 0, yMax: Math.ceil(bx[3] - bx[1] + 12), step: 1000 },
    polylines: [
      ...polys.map((pts, i) => ({ points: (pic.shapes[i].open ? pts : [...pts, pts[0]]).map(S), color: pic.shapes[i].color ?? ('brand' as Color) })),
      ...marks.map((m) => ({ points: m.map(S), color: 'muted' as Color })),
    ],
    points,
    hideTickLabels: true,
    caption: pic.caption,
  };
  if (dashed.length) fig.segments = dashed.map(([a, b]) => ({ from: S(a), to: S(b), dashed: true, color: 'muted' as Color }));
  return fig;
}

// Shape builders (model units).

const rectPts = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

function arcPts(cx: number, cy: number, r: number, a0: number, a1: number, segs = 24): P[] {
  const out: P[] = [];
  for (let i = 0; i <= segs; i++) {
    const a = a0 + ((a1 - a0) * i) / segs;
    out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return out;
}
const circlePts = (cx: number, cy: number, r: number) => arcPts(cx, cy, r, 0, 2 * Math.PI, 48).slice(0, 48);

function signedArea(p: P[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}

/** Labels on the outside of a polygon's sides: texts[i] labels side pts[i] → pts[i + 1]. */
function sideLabels(pts: P[], texts: Array<string | null>): Lab[] {
  const ccw = signedArea(pts) > 0;
  const out: Lab[] = [];
  texts.forEach((t, i) => {
    if (!t) return;
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const L = Math.hypot(dx, dy) || 1;
    out.push({ text: t, at: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], dir: ccw ? [dy / L, -dx / L] : [-dy / L, dx / L] });
  });
  return out;
}

const below = (text: string, x: number, y: number): Lab => ({ text, at: [x, y], dir: [0, -1] });
const above = (text: string, x: number, y: number): Lab => ({ text, at: [x, y], dir: [0, 1] });
const leftOf = (text: string, x: number, y: number): Lab => ({ text, at: [x, y], dir: [-1, 0] });
const rightOf = (text: string, x: number, y: number): Lab => ({ text, at: [x, y], dir: [1, 0] });

/**
 * A label beside a dashed height line at x inside a shape. It tries each height in ys, right of the line and
 * then left of it, first with the full text and then with the bare number.
 */
function heightLab(text: string, short: string, x: number, ys: number[]): Lab {
  const opts: Lab[] = [];
  for (const t of text === short ? [text] : [text, short]) for (const y of ys) for (const dx of [1, -1]) opts.push({ text: t, at: [x, y], dir: [dx, 0] });
  return { ...opts[0], alt: opts.slice(1) };
}

/** A label just above a dashed line across a circle, with a shorter form if it does not fit. */
const overLine = (text: string, short: string, x: number, y: number): Lab => ({ text, at: [x, y], dir: [0, 1], alt: [{ text: short, at: [x, y], dir: [0, 1] }] });

/** Triangle with sides a (bottom), b and c, drawn from its side lengths. */
function sssPts(a: number, b: number, c: number): P[] {
  // Bottom from (0,0) to (a,0); the apex is b from (a,0) and c from (0,0).
  const x = (a * a + c * c - b * b) / (2 * a);
  const y = Math.sqrt(Math.max(c * c - x * x, 0));
  return [
    [0, 0],
    [a, 0],
    [x, y],
  ];
}

function regularPts(nSides: number, s: number): P[] {
  const R = s / (2 * Math.sin(Math.PI / nSides));
  const start = -Math.PI / 2 - Math.PI / nSides; // flat bottom side
  return Array.from({ length: nSides }, (_, i) => [R * Math.cos(start + (2 * Math.PI * i) / nSides), R * Math.sin(start + (2 * Math.PI * i) / nSides)] as P);
}

/** Rectangle figure with the length below and the width on the left (or all four sides). */
function rectFig(l: number, w: number, u: string, caption: string, allSides = false): PlaneFigure {
  const pts = rectPts(0, 0, l, w);
  return drawPlan({ shapes: [{ pts }], labels: sideLabels(pts, allSides ? [lab(l, u), lab(w, u), lab(l, u), lab(w, u)] : [lab(l, u), null, null, lab(w, u)]), caption });
}

/** Circle figure with a dashed diameter (or radius) and its label. */
function circleFig(r: number, u: string, show: 'r' | 'd', caption: string): PlaneFigure {
  const dashed: Array<[P, P]> = show === 'd' ? [[[-r, 0], [r, 0]]] : [[[0, 0], [r, 0]]];
  const text = show === 'd' ? `d = ${lab(2 * r, u)}` : `r = ${lab(r, u)}`;
  return drawPlan({ shapes: [{ pts: circlePts(0, 0, r) }], dashed, labels: [overLine(text, lab(show === 'd' ? 2 * r : r, u), show === 'd' ? 0 : r / 2, 0)], caption });
}

/** L-shape: W × H with a w2 × h2 piece missing from the top-right corner. */
function lPts(W: number, H: number, w2: number, h2: number): P[] {
  return [
    [0, 0],
    [W, 0],
    [W, H - h2],
    [W - w2, H - h2],
    [W - w2, H],
    [0, H],
  ];
}

/** Labels for all six sides of lPts(W, H, w2, h2), in the same order as its sides. */
function lLabels(W: number, H: number, w2: number, h2: number, u: string): Lab[] {
  return [
    below(lab(W, u), W / 2, 0),
    rightOf(lab(H - h2, u), W, (H - h2) / 2),
    above(lab(w2, u), W - w2 / 2, H - h2),
    rightOf(lab(h2, u), W - w2, H - h2 / 2),
    above(lab(W - w2, u), (W - w2) / 2, H),
    leftOf(lab(H, u), 0, H / 2),
  ];
}

/** Whole-number L-shape sizes with a notch big enough for its labels. */
function lDims(rng: Rng, wLo: number, wHi: number): [number, number, number, number] {
  const W = rng.int(wLo, wHi);
  const H = rng.int(Math.ceil(0.6 * W), W - 1);
  const w2 = rng.int(Math.ceil(0.35 * W), Math.floor(0.6 * W));
  const h2 = rng.int(Math.ceil(0.45 * H), Math.floor(0.6 * H));
  return [W, H, w2, h2];
}

// ---------------------------------------------------------------------------
// Lesson 7.1 — Perimeter and circumference
// ---------------------------------------------------------------------------

interface RectCtx {
  thing: string;
  job: string;
  ask: string;
  u: string;
  l: [number, number];
  w: [number, number];
  k: number;
}

const RECT_P: RectCtx[] = [
  { thing: 'vegetable garden', job: 'edging', ask: 'How much edging is needed?', u: 'm', l: [5, 12], w: [2, 8], k: 1 },
  { thing: 'dog run', job: 'fencing', ask: 'How much fencing is needed?', u: 'm', l: [6, 15], w: [3, 8], k: 1 },
  { thing: 'window', job: 'wood trim', ask: 'How much trim is needed?', u: 'ft', l: [3, 7], w: [2, 5], k: 1 },
  { thing: 'sandbox at a daycare', job: 'a wooden border', ask: 'How long is the border all the way around?', u: 'ft', l: [6, 12], w: [4, 9], k: 1 },
  { thing: 'backyard skating rink', job: 'boards', ask: 'What total length of boards goes around the rink?', u: 'ft', l: [20, 40], w: [12, 24], k: 1 },
  { thing: 'bulletin board in a staff room', job: 'a paper border', ask: 'How long is the border all the way around?', u: 'cm', l: [18, 30], w: [12, 17], k: 5 },
];

const CIRC_D: Array<{ thing: string; job: string; u: string; d: number[] }> = [
  { thing: 'round flower bed', job: 'plastic edging', u: 'm', d: [2, 3, 4, 5, 6] },
  { thing: 'round table at a banquet hall', job: 'edge banding', u: 'cm', d: [80, 90, 100, 120, 150] },
  { thing: 'round hot tub', job: 'rubber trim', u: 'ft', d: [6, 7, 8] },
  { thing: 'round trampoline', job: 'safety padding', u: 'ft', d: [8, 10, 12, 14] },
  { thing: 'circular fire pit at a campground', job: 'a steel ring', u: 'm', d: [1, 2] },
];

const CIRC_R: Array<{ thing: string; job: string; u: string; make: (rng: Rng) => number }> = [
  { thing: 'circular flower bed', job: 'edging', u: 'm', make: (r) => tenths(r, 1, 4) },
  { thing: 'round table top', job: 'edge banding', u: 'cm', make: (r) => r.int(40, 75) },
  { thing: 'circular pond at a golf course', job: 'a safety rope', u: 'm', make: (r) => r.int(3, 9) },
  { thing: 'round rug', job: 'binding tape', u: 'ft', make: (r) => r.pick([2.5, 3, 3.5, 4, 4.5, 5]) },
];

const circHints = ['The distance around a circle is called its circumference.', 'Use $C = \\pi d$. Press the $\\pi$ key on your calculator, then multiply by the diameter.'];

function perimEasy(rng: Rng, name: string): GenOutput {
  const mode = rng.weighted([
    ['rect', 4],
    ['square', 1],
    ['tri', 2],
    ['circle', 2],
  ] as const);
  if (mode === 'rect') {
    const c = rng.pick(RECT_P);
    const l = rng.int(c.l[0], c.l[1]) * c.k;
    const w = retry(() => rng.int(c.w[0], c.w[1]) * c.k, (x) => x < l);
    const P = 2 * (l + w);
    return {
      prompt: `${name} is putting ${c.job} around a rectangular ${c.thing}. It is ${len(l, c.u)} long and ${len(w, c.u)} wide. ${c.ask}`,
      figure: rectFig(l, w, c.u, `rectangular ${c.thing}`, true),
      parts: [numPart(P, { suffix: c.u })],
      hints: ['The distance all the way around a shape is its perimeter.', 'A rectangle has 4 sides: 2 lengths and 2 widths. Add all 4 sides.'],
      solution: ['A rectangle has two lengths and two widths. Add all four sides.', `$P = ${l} + ${w} + ${l} + ${w} = ${P}$`, `The perimeter is ${len(P, c.u)}.`],
    };
  }
  if (mode === 'square') {
    const c = rng.pick([
      { thing: 'square sandbox', job: 'a wooden border', u: 'ft', s: [4, 10] },
      { thing: 'square flower bed', job: 'edging', u: 'm', s: [2, 6] },
      { thing: 'square patio', job: 'a row of edging stones', u: 'm', s: [3, 8] },
      { thing: 'square card table', job: 'edge trim', u: 'cm', s: [16, 20] },
    ]);
    const s = rng.int(c.s[0], c.s[1]) * (c.u === 'cm' ? 5 : 1);
    const pts = rectPts(0, 0, s, s);
    return {
      prompt: `${name} is putting ${c.job} around a ${c.thing}. Each side is ${len(s, c.u)} long. What is the perimeter of the ${c.thing}?`,
      figure: drawPlan({ shapes: [{ pts }], labels: sideLabels(pts, [lab(s, c.u), lab(s, c.u), lab(s, c.u), lab(s, c.u)]), caption: c.thing }),
      parts: [numPart(4 * s, { suffix: c.u })],
      hints: ['A square has 4 sides that are all the same length.', 'Add the 4 sides, or multiply one side by 4.'],
      solution: ['A square has 4 equal sides.', `$P = ${s} + ${s} + ${s} + ${s} = 4 \\times ${s} = ${4 * s}$`, `The perimeter is ${len(4 * s, c.u)}.`],
    };
  }
  if (mode === 'tri') {
    const c = rng.pick([
      { thing: 'triangular flower bed', job: 'edging', u: 'm', lo: 3, hi: 9, k: 1 },
      { thing: 'triangular corner shelf', job: 'edge trim', u: 'cm', lo: 6, hi: 14, k: 5 },
      { thing: 'triangular sail on a small boat', job: 'a rope edge', u: 'ft', lo: 5, hi: 14, k: 1 },
      { thing: 'triangular garden in a park', job: 'a low fence', u: 'm', lo: 4, hi: 12, k: 1 },
    ]);
    const [a, b, cc] = retry(
      () => [rng.int(c.lo, c.hi), rng.int(c.lo, c.hi), rng.int(c.lo, c.hi)].sort((x, y) => y - x),
      ([x, y, z]) => y + z >= x + 2 && !(x === y && y === z),
    ).map((x) => x * c.k);
    const pts = sssPts(a, b, cc);
    const P = a + b + cc;
    return {
      prompt: `${name} is putting ${c.job} around a ${c.thing}. Its sides are ${len(a, c.u)}, ${len(b, c.u)} and ${len(cc, c.u)} long. What is the perimeter?`,
      figure: drawPlan({ shapes: [{ pts }], labels: sideLabels(pts, [lab(a, c.u), lab(b, c.u), lab(cc, c.u)]), caption: c.thing }),
      parts: [numPart(P, { suffix: c.u })],
      hints: ['The perimeter is the distance all the way around the shape.', 'Add the lengths of the 3 sides.'],
      solution: ['Add the three sides.', `$P = ${a} + ${b} + ${cc} = ${P}$`, `The perimeter is ${len(P, c.u)}.`],
    };
  }
  const c = rng.pick(CIRC_D);
  const dia = retry(() => rng.pick(c.d), (x) => clearOf(Math.PI * x, 1));
  const C = Math.PI * dia;
  return {
    prompt: `A ${c.thing} has a diameter of ${len(dia, c.u)}. ${name} is putting ${c.job} around the edge. How much ${c.job.replace(/^a /, '')} is needed? Round ${tenthOf(c.u)}.`,
    figure: circleFig(dia / 2, c.u, 'd', c.thing),
    parts: [numPart(C, { decimals: 1, suffix: c.u })],
    hints: circHints,
    solution: ['The distance around a circle is its circumference: $C = \\pi d$.', `$C = \\pi \\times ${nm(dia)} \\approx ${nm(C, 3)}$`, `Rounded ${tenthOf(c.u)}, about $${nf(C, 1)}\\ ${tx(c.u)}$ is needed.`],
  };
}

function perimMid(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['rect', 'poly', 'L', 'circle'] as const);
  if (mode === 'rect') {
    const thing = rng.pick(['patio', 'vegetable garden', 'parking pad', 'greenhouse floor', 'deck']);
    const l = tenths(rng, 5, 12);
    const w = tenths(rng, 2.5, l - 1);
    const P = clean(2 * (l + w));
    return {
      prompt: `A rectangular ${thing} is ${len(l, 'm')} long and ${len(w, 'm')} wide. What is its perimeter?`,
      figure: rectFig(l, w, 'm', `rectangular ${thing}`),
      parts: [exact(P, 'm')],
      hints: ['Opposite sides of a rectangle are the same length, so the rectangle has two lengths and two widths.', 'Add all four sides, or use $P = 2(l + w)$.'],
      solution: [`The sides are ${len(l, 'm')}, ${len(w, 'm')}, ${len(l, 'm')} and ${len(w, 'm')}.`, `$P = 2(${nm(l)} + ${nm(w)}) = 2 \\times ${nm(clean(l + w))} = ${nm(P)}$`, `The perimeter is ${len(P, 'm')}.`],
    };
  }
  if (mode === 'poly') {
    const c = rng.pick([
      { n: 6, shape: 'hexagon', thing: 'gazebo floor', u: 'm', make: () => tenths(rng, 1.5, 3.5) },
      { n: 8, shape: 'octagon', thing: 'hot tub deck', u: 'ft', make: () => rng.int(3, 7) },
      { n: 5, shape: 'pentagon', thing: 'sandbox', u: 'ft', make: () => rng.int(3, 6) + rng.pick([0, 0.5]) },
      { n: 8, shape: 'octagon', thing: 'stop sign', u: 'cm', make: () => rng.int(25, 35) },
      { n: 6, shape: 'hexagon', thing: 'picnic table top', u: 'cm', make: () => rng.int(50, 90) },
    ]);
    const s = c.make();
    const P = clean(c.n * s);
    const pts = regularPts(c.n, s);
    return {
      prompt: `A ${c.thing} is shaped like a regular ${c.shape}. All ${c.n} sides are the same length. One side is ${len(s, c.u)} long. What is the perimeter of the ${c.thing}?`,
      figure: drawPlan({ shapes: [{ pts }], labels: sideLabels(pts, [lab(s, c.u)]), caption: `regular ${c.shape}` }),
      parts: [exact(P, c.u)],
      hints: [`${cap(an(c.shape))} has ${c.n} sides. In a regular ${c.shape}, they are all the same length.`, `Multiply one side by ${c.n}.`],
      solution: [`${cap(an(c.shape))} has $${c.n}$ equal sides.`, `$P = ${c.n} \\times ${nm(s)} = ${nm(P)}$`, `The perimeter is ${len(P, c.u)}.`],
    };
  }
  if (mode === 'L') {
    const c = rng.pick([
      { what: 'L-shaped living room', u: 'm', job: 'baseboard' },
      { what: 'L-shaped deck', u: 'ft', job: 'railing' },
      { what: 'L-shaped garden', u: 'm', job: 'edging' },
      { what: 'L-shaped hotel lobby', u: 'm', job: 'baseboard' },
    ]);
    const [W, H, w2, h2] = lDims(rng, 8, 14);
    const sides = [W, H - h2, w2, h2, W - w2, H];
    const P = sides.reduce((a, b) => a + b, 0);
    return {
      prompt: `${name} is putting ${c.job} around the outside edge of the ${c.what} shown. Every side is labelled. What is the perimeter?`,
      figure: drawPlan({ shapes: [{ pts: lPts(W, H, w2, h2) }], labels: lLabels(W, H, w2, h2, c.u), caption: c.what }),
      parts: [numPart(P, { suffix: c.u })],
      hints: ['An L-shape has 6 sides. Trace around the outside with your finger.', 'Add all 6 side lengths.'],
      solution: ['The shape has 6 sides. Add them all.', `$P = ${sides.join(' + ')} = ${P}$`, `The perimeter is ${len(P, c.u)}.`],
    };
  }
  const c = rng.pick(CIRC_R);
  const r = retry(() => c.make(rng), (x) => clearOf(2 * Math.PI * x, 1));
  const C = 2 * Math.PI * r;
  return {
    prompt: `A ${c.thing} has a radius of ${len(r, c.u)}. ${name} is putting ${c.job} all the way around it. How much ${c.job.replace(/^a /, '')} is needed? Round ${tenthOf(c.u)}.`,
    figure: circleFig(r, c.u, 'r', c.thing),
    parts: [numPart(C, { decimals: 1, suffix: c.u })],
    hints: ['The radius goes from the centre to the edge. The diameter goes all the way across, so it is 2 times the radius.', 'Find the diameter, then use $C = \\pi d$. (Or use $C = 2\\pi r$.)'],
    solution: [`Diameter: $d = 2 \\times ${nm(r)} = ${nm(2 * r)}\\ ${tx(c.u)}$`, `$C = \\pi \\times ${nm(2 * r)} \\approx ${nm(C, 3)}$`, `Rounded ${tenthOf(c.u)}, about $${nf(C, 1)}\\ ${tx(c.u)}$ is needed.`],
  };
}

function perimCost(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['rect', 'gate', 'circle', 'L'] as const);
  if (mode === 'rect') {
    const c = rng.pick([
      { thing: 'vegetable garden', item: 'Garden edging', p: [2, 4] },
      { thing: 'flower bed at a seniors’ home', item: 'Stone edging', p: [5, 9] },
      { thing: 'play area at a daycare', item: 'Rubber edging', p: [6, 11] },
    ]);
    const [l, w, pr] = retry(
      () => [rng.int(4, 12) + rng.pick([0, 0.5]), rng.int(2, 7) + rng.pick([0, 0.5]), price(rng, c.p[0], c.p[1])],
      ([x, y, z]) => y < x && clearOf(2 * (x + y) * z, 2),
    );
    const P = clean(2 * (l + w));
    const cost = P * pr;
    return {
      prompt: `${name} is putting edging around a rectangular ${c.thing} that is ${len(l, 'm')} long and ${len(w, 'm')} wide. ${c.item} costs ${cash(pr)} per metre.\n\n(a) How many metres of edging are needed?\n\n(b) What will the edging cost, to the nearest cent?`,
      figure: rectFig(l, w, 'm', `rectangular ${c.thing}`),
      parts: [{ ...exact(P, 'm'), label: '(a)' }, moneyPart(cost, '(b) \\$')],
      hints: ['First find the perimeter: add all four sides.', 'Then multiply the number of metres by the price for one metre.'],
      solution: [`(a) $P = 2(${nm(l)} + ${nm(w)}) = ${nm(P)}\\ \\text{m}$`, `(b) $${nm(P)} \\times ${mon(pr)} = ${nm(cost, 4)}$`, `(a) ${len(P, 'm')} of edging; (b) it costs ${cash(cost)}.`],
    };
  }
  if (mode === 'gate') {
    const [l, w, g, pr] = retry(
      () => [rng.int(10, 30), rng.int(6, 20), rng.pick([1, 1.2, 1.5, 2]), price(rng, 9, 24)],
      ([x, y, gg, z]) => y < x && clearOf((2 * (x + y) - gg) * z, 2),
    );
    const P = 2 * (l + w);
    const F = clean(P - g);
    const cost = F * pr;
    const where = rng.pick(['a backyard', 'a dog park', 'a community garden', 'a horse paddock']);
    const gx = l * 0.4;
    // The gap is drawn at least 8% of the side so the gate is easy to see.
    const gv = Math.max(g, 0.08 * l);
    const outline: P[] = [
      [gx + gv, w],
      [l, w],
      [l, 0],
      [0, 0],
      [0, w],
      [gx, w],
    ];
    return {
      prompt: `${name} is building a fence around ${where}. The rectangle is ${len(l, 'm')} long and ${len(w, 'm')} wide. A gate ${len(g, 'm')} wide goes in the back side, so that part needs no fencing. Fencing costs ${cash(pr)} per metre.\n\n(a) How many metres of fencing are needed?\n\n(b) What will the fencing cost, to the nearest cent?`,
      figure: drawPlan({
        shapes: [{ pts: outline, open: true }],
        dashed: [[[gx, w], [gx + gv, w]]],
        labels: [below(lab(l, 'm'), l / 2, 0), leftOf(lab(w, 'm'), 0, w / 2), above(`gate ${lab(g, 'm')}`, gx + gv / 2, w)],
        caption: `fenced yard with a gate`,
      }),
      parts: [{ ...exact(F, 'm'), label: '(a)' }, moneyPart(cost, '(b) \\$')],
      hints: ['Find the perimeter of the rectangle, then subtract the width of the gate.', 'Multiply the metres of fencing by the price for one metre.'],
      solution: [`Perimeter: $2(${l} + ${w}) = ${P}\\ \\text{m}$`, `(a) Take away the gate: $${P} - ${nm(g)} = ${nm(F)}\\ \\text{m}$`, `(b) $${nm(F)} \\times ${mon(pr)} = ${nm(cost, 4)}$`, `(a) ${len(F, 'm')} of fencing; (b) it costs ${cash(cost)}.`],
    };
  }
  if (mode === 'circle') {
    const c = rng.pick([
      { thing: 'round flower bed', short: 'flower bed', item: 'Plastic edging', p: [2, 4], d: () => rng.int(2, 6) + rng.pick([0, 0.5]) },
      { thing: 'round fish pond', short: 'pond', item: 'Stone edging', p: [7, 12], d: () => rng.int(2, 5) + rng.pick([0, 0.5]) },
      { thing: 'circular play area at a park', short: 'play area', item: 'Rubber edging', p: [8, 14], d: () => rng.int(6, 12) },
    ]);
    const [dia, pr] = retry(
      () => [c.d(), price(rng, c.p[0], c.p[1])],
      ([x, z]) => clearOf(Math.PI * x, 1) && clearOf(roundTo(Math.PI * x, 1) * z, 2),
    );
    const C = Math.PI * dia;
    const Cr = roundTo(C, 1);
    const cost = Cr * pr;
    return {
      prompt: `A ${c.thing} has a diameter of ${len(dia, 'm')}. ${c.item} costs ${cash(pr)} per metre.\n\n(a) What is the circumference of the ${c.short}, to the nearest tenth of a metre?\n\n(b) Use your rounded answer to find the cost of edging, to the nearest cent.`,
      figure: circleFig(dia / 2, 'm', 'd', c.thing),
      parts: [{ ...numPart(C, { decimals: 1, suffix: 'm' }), label: '(a)' }, moneyPart(cost, '(b) \\$')],
      hints: ['Use $C = \\pi d$ for the distance around the circle, and round to the nearest tenth.', 'Multiply your rounded answer by the price for one metre.'],
      solution: [`(a) $C = \\pi \\times ${nm(dia)} \\approx ${nm(C, 3)}$, which rounds to $${nf(Cr, 1)}\\ \\text{m}$.`, `(b) $${nf(Cr, 1)} \\times ${mon(pr)} = ${nm(cost, 4)}$`, `(a) about $${nf(Cr, 1)}\\ \\text{m}$; (b) the edging costs ${cash(cost)}.`],
    };
  }
  const room = rng.pick(['L-shaped family room', 'L-shaped office', 'L-shaped hotel room', 'L-shaped basement suite']);
  const [W, H, w2, h2, pr] = retry(
    () => [...lDims(rng, 14, 26), price(rng, 1, 3)],
    ([a, b, , , z]) => clearOf(2 * (a + b) * z, 2),
  );
  const sides = [W, H - h2, w2, h2, W - w2, H];
  const P = sides.reduce((a, b) => a + b, 0);
  const cost = P * pr;
  return {
    prompt: `${name} is putting baseboard trim around the ${room} shown. Every side is labelled in feet. Baseboard costs ${cash(pr)} per foot.\n\n(a) What is the perimeter of the room?\n\n(b) What will the baseboard cost, to the nearest cent?`,
    figure: drawPlan({ shapes: [{ pts: lPts(W, H, w2, h2) }], labels: lLabels(W, H, w2, h2, 'ft'), caption: room }),
    parts: [{ ...numPart(P, { suffix: 'ft' }), label: '(a)' }, moneyPart(cost, '(b) \\$')],
    hints: ['Add all 6 sides to find the perimeter.', 'Multiply the perimeter by the price for one foot.'],
    solution: [`(a) $P = ${sides.join(' + ')} = ${P}\\ \\text{ft}$`, `(b) $${P} \\times ${mon(pr)} = ${nm(cost, 4)}$`, `(a) ${len(P, 'ft')}; (b) the baseboard costs ${cash(cost)}.`],
  };
}

const perimeter = skill({
  id: 'm204-perimeter',
  name: 'Perimeter and circumference',
  description: 'Find the perimeter of rectangles, squares, triangles, regular polygons and L-shapes and the circumference of a circle, and use a perimeter to find the cost of edging or fencing.',
  outcomes: ['SS2'],
  lessonId: 'm204-7-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return perimEasy(rng, name);
    if (d === 2) return perimMid(rng, name);
    return perimCost(rng, name);
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.2 — Area of shapes
// ---------------------------------------------------------------------------

type Basic = 'rect' | 'tri' | 'para';

const BASIC_CTX: Record<Basic, Array<{ what: string; u: string; lo: number; hi: number }>> = {
  rect: [
    { what: 'rectangular bedroom floor', u: 'm', lo: 3, hi: 5 },
    { what: 'rectangular garage floor', u: 'ft', lo: 12, hi: 24 },
    { what: 'rectangular vegetable garden', u: 'm', lo: 3, hi: 10 },
    { what: 'rectangular tarp', u: 'ft', lo: 6, hi: 16 },
    { what: 'rectangular counter in a coffee shop', u: 'm', lo: 1, hi: 4 },
  ],
  tri: [
    { what: 'triangular flower bed', u: 'm', lo: 2, hi: 8 },
    { what: 'triangular sail', u: 'ft', lo: 4, hi: 12 },
    { what: 'triangular corner shelf', u: 'cm', lo: 20, hi: 50 },
    { what: 'triangular warning sign', u: 'cm', lo: 40, hi: 90 },
  ],
  para: [
    { what: 'parallelogram-shaped parking stall', u: 'm', lo: 3, hi: 6 },
    { what: 'parallelogram-shaped patio stone', u: 'cm', lo: 20, hi: 45 },
    { what: 'parallelogram-shaped flower bed', u: 'ft', lo: 4, hi: 12 },
  ],
};

/** Figure for a triangle or parallelogram with base b and a dashed height h. */
function bhFig(shape: 'tri' | 'para', b: number, h: number, u: string, caption: string, slant?: number): PlaneFigure {
  if (shape === 'tri') {
    const px = b * 0.3;
    const pts: P[] = [
      [0, 0],
      [b, 0],
      [px, h],
    ];
    return drawPlan({
      shapes: [{ pts }],
      dashed: [[[px, h], [px, 0]]],
      right: [{ at: [px, 0], u: [1, 0], v: [0, 1] }],
      labels: [below(`b = ${lab(b, u)}`, b / 2, 0), heightLab(`h = ${lab(h, u)}`, lab(h, u), px, [h * 0.3, h * 0.4, h * 0.22])],
      caption,
    });
  }
  const k = slant !== undefined ? Math.sqrt(Math.max(slant * slant - h * h, 0)) : Math.min(b * 0.35, h * 0.6);
  const pts: P[] = [
    [0, 0],
    [b, 0],
    [b + k, h],
    [k, h],
  ];
  return drawPlan({
    shapes: [{ pts }],
    dashed: [[[k, h], [k, 0]]],
    right: [{ at: [k, 0], u: [1, 0], v: [0, 1] }],
    labels: [below(`b = ${lab(b, u)}`, b / 2, 0), heightLab(`h = ${lab(h, u)}`, lab(h, u), k, [h * 0.5, h * 0.3, h * 0.7]), ...(slant !== undefined ? sideLabels(pts, [null, null, null, lab(slant, u)]) : [])],
    caption,
  });
}

/** Answer for an area: exact when it has at most two decimals, otherwise rounded to the tenth. */
function areaAns(A: number, u: string) {
  const v = clean(A);
  const round = placesOf(v) > 2;
  return {
    note: round ? ` Round ${tenthSq(u)}.` : '',
    part: round ? numPart(v, { decimals: 1, suffix: `${u}²` }) : exact(v, `${u}²`),
    eq: round ? `${nm(v, 4)} \\approx ${nf(v, 1)}` : nm(v),
    final: round ? `about $${nf(v, 1)}\\ ${sq(u)}$` : ar(v, u),
    ok: !round || clearOf(v, 1),
  };
}

function basicArea(shape: Basic, what: string, u: string, b: number, h: number, slant?: number): GenOutput {
  const A = shape === 'tri' ? (b * h) / 2 : b * h;
  const res = areaAns(A, u);
  if (shape === 'rect') {
    const l = Math.max(b, h);
    const w = Math.min(b, h);
    return {
      prompt: `A ${what} is ${len(l, u)} long and ${len(w, u)} wide. What is its area?${res.note}`,
      figure: rectFig(l, w, u, what),
      parts: [res.part],
      hints: ['Area is the number of unit squares that cover a surface.', 'For a rectangle, multiply the length by the width: $A = l \\times w$.'],
      solution: ['$A = l \\times w$', `$A = ${nm(l)} \\times ${nm(w)} = ${res.eq}$`, `The area is ${res.final}.`],
    };
  }
  if (shape === 'tri') {
    return {
      prompt: `A ${what} has a base of ${len(b, u)} and a height of ${len(h, u)}. What is its area?${res.note}`,
      figure: bhFig('tri', b, h, u, what),
      parts: [res.part],
      hints: ['A triangle is half of a rectangle with the same base and height.', 'Use $A = b \\times h \\div 2$: multiply the base by the height, then divide by 2.'],
      solution: ['$A = b \\times h \\div 2$', `$A = ${nm(b)} \\times ${nm(h)} \\div 2 = ${nm(clean(b * h))} \\div 2 = ${res.eq}$`, `The area is ${res.final}.`],
    };
  }
  return {
    prompt: `A ${what} has a base of ${len(b, u)} and a height of ${len(h, u)}.${slant !== undefined ? ` Its slanted sides are ${len(slant, u)} long.` : ''} What is its area?${res.note}`,
    figure: bhFig('para', b, h, u, what, slant),
    parts: [res.part],
    hints: [
      slant !== undefined ? 'The height is the dashed line that meets the base at a right angle. The slanted side is not the height.' : 'Cut the triangle off one end of a parallelogram and move it to the other end. You get a rectangle.',
      'Use $A = b \\times h$ (base times height).',
    ],
    solution: ['$A = b \\times h$', `$A = ${nm(b)} \\times ${nm(h)} = ${res.eq}$`, ...(slant !== undefined ? [`The slanted side (${len(slant, u)}) is not used.`] : []), `The area is ${res.final}.`],
  };
}

const CIRC_AREA: Array<{ what: string; u: string; r: (rng: Rng) => number }> = [
  { what: 'round rug', u: 'ft', r: (rng) => rng.int(2, 6) },
  { what: 'circular flower bed', u: 'm', r: (rng) => rng.int(1, 5) },
  { what: 'round table top', u: 'cm', r: (rng) => rng.int(4, 8) * 10 },
  { what: 'circular patio', u: 'm', r: (rng) => rng.int(2, 4) },
  { what: 'round pizza', u: 'in', r: (rng) => rng.int(5, 8) },
];

function circleArea(rng: Rng, d: 1 | 2): GenOutput {
  const c = rng.pick(CIRC_AREA);
  const useD = d === 2;
  // Square centimetres are small, so those areas are rounded to the nearest whole square centimetre.
  const dp = c.u === 'cm' ? 0 : 1;
  const round = dp === 0 ? `to the nearest square ${UNIT[c.u].one}` : tenthSq(c.u);
  const r = retry(() => (d === 1 ? c.r(rng) : c.r(rng) + rng.pick(c.u === 'cm' ? [0, 5] : [0, 0.5, 0.25])), (x) => clearOf(Math.PI * x * x, dp));
  const A = Math.PI * r * r;
  return {
    prompt: useD
      ? `A ${c.what} has a diameter of ${len(2 * r, c.u)}. What is its area? Round ${round}.`
      : `A ${c.what} has a radius of ${len(r, c.u)}. What is its area? Round ${round}.`,
    figure: circleFig(r, c.u, useD ? 'd' : 'r', c.what),
    parts: [numPart(A, { decimals: dp, suffix: `${c.u}²` })],
    hints: useD
      ? ['The area formula uses the radius. The radius is half of the diameter.', 'Find $r = d \\div 2$. Then use $A = \\pi \\times r \\times r$.']
      : ['Use $A = \\pi r^2$, which means $\\pi \\times r \\times r$.', 'Multiply the radius by itself first, then multiply by $\\pi$.'],
    solution: [
      ...(useD ? [`Radius: $r = ${nm(2 * r)} \\div 2 = ${nm(r)}\\ ${tx(c.u)}$`] : []),
      '$A = \\pi r^2 = \\pi \\times r \\times r$',
      `$A = \\pi \\times ${nm(r)} \\times ${nm(r)} = \\pi \\times ${nm(clean(r * r))} \\approx ${nm(A, 3)}$`,
      `Rounded ${round}, the area is about $${nf(A, dp)}\\ ${sq(c.u)}$.`,
    ],
  };
}

function areaHard(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['mixedUnits', 'many', 'sprinklers', 'pizza'] as const);
  if (mode === 'mixedUnits') {
    const c = rng.pick([
      { thing: 'table top for a craft fair booth', L: [12, 24], D: [60, 90] },
      { thing: 'counter in a hair salon', L: [15, 30], D: [50, 70] },
      { thing: 'workbench top', L: [12, 25], D: [50, 80] },
      { thing: 'reception desk top at a hotel', L: [15, 28], D: [60, 90] },
    ]);
    const [L, D] = retry(() => [rng.int(c.L[0], c.L[1]) / 10, rng.int(c.D[0] / 10, c.D[1] / 10) * 10], ([l, dd]) => placesOf(clean(l * (dd / 100))) <= 2);
    const Dm = D / 100;
    const A = clean(L * Dm);
    return {
      prompt: `A rectangular ${c.thing} is ${len(L, 'm')} long and ${len(D, 'cm')} wide. ${name} needs the area in **square metres** to order a cover. What is the area?`,
      figure: drawPlan({ shapes: [{ pts: rectPts(0, 0, L, Dm) }], labels: [below(lab(L, 'm'), L / 2, 0), leftOf(lab(D, 'cm'), 0, Dm / 2)], caption: c.thing }),
      parts: [exact(A, 'm²')],
      hints: ['Both lengths must be in the same unit before you multiply.', 'Change centimetres to metres (divide by 100). Then multiply length × width.'],
      solution: [`Change the width to metres: $${D} \\div 100 = ${nm(Dm)}\\ \\text{m}$`, `$A = ${nm(L)} \\times ${nm(Dm)} = ${nm(A)}$`, `The area is ${ar(A, 'm')}.`],
    };
  }
  if (mode === 'many') {
    const kind = rng.pick(['pennants', 'stalls', 'tiles'] as const);
    if (kind === 'pennants') {
      const k = rng.int(10, 24);
      const b = rng.int(8, 14);
      const h = 2 * rng.int(5, 9);
      const one = (b * h) / 2;
      return {
        prompt: `${name} is sewing $${k}$ triangle flags for a banner at a community fair. Each flag has a base of ${len(b, 'in')} and a height of ${len(h, 'in')}. How much fabric is needed for all the flags? (Ignore seams.)`,
        figure: bhFig('tri', b, h, 'in', 'one flag'),
        parts: [numPart(one * k, { suffix: 'in²' })],
        hints: ['First find the area of one flag: $A = b \\times h \\div 2$.', `Then multiply by the number of flags, $${k}$.`],
        solution: [`One flag: $${b} \\times ${h} \\div 2 = ${one}\\ ${sq('in')}$`, `All flags: $${k} \\times ${one} = ${one * k}$`, `${name} needs ${ar(one * k, 'in')} of fabric.`],
      };
    }
    if (kind === 'stalls') {
      const k = rng.int(8, 30);
      const b = rng.pick([2.5, 2.6, 2.7, 3]);
      const h = rng.int(5, 6);
      const one = clean(b * h);
      const tot = clean(one * k);
      return {
        prompt: `A parking lot at a grocery store has $${k}$ parking stalls shaped like parallelograms. Each stall has a base of ${len(b, 'm')} and a height of ${len(h, 'm')}. What is the total area of all the stalls?`,
        figure: bhFig('para', b, h, 'm', 'one parking stall'),
        parts: [exact(tot, 'm²')],
        hints: ['First find the area of one stall: $A = b \\times h$.', `Then multiply by the number of stalls, $${k}$.`],
        solution: [`One stall: $${nm(b)} \\times ${h} = ${nm(one)}\\ ${sq('m')}$`, `All stalls: $${k} \\times ${nm(one)} = ${nm(tot)}$`, `The stalls cover ${ar(tot, 'm')}.`],
      };
    }
    const k = rng.int(4, 12);
    const l = rng.int(4, 8);
    const w = rng.int(3, 6);
    return {
      prompt: `A hotel has $${k}$ rooms that each have a rectangular carpet ${len(l, 'm')} long and ${len(w, 'm')} wide. A cleaner shampoos the carpets in all the rooms. What is the total area of carpet?`,
      figure: rectFig(l, w, 'm', 'one carpet'),
      parts: [numPart(k * l * w, { suffix: 'm²' })],
      hints: ['First find the area of one carpet: $A = l \\times w$.', `Then multiply by the number of rooms, $${k}$.`],
      solution: [`One carpet: $${l} \\times ${w} = ${l * w}\\ ${sq('m')}$`, `All rooms: $${k} \\times ${l * w} = ${k * l * w}$`, `The total area is ${ar(k * l * w, 'm')}.`],
    };
  }
  if (mode === 'sprinklers') {
    const [r, k] = retry(() => [rng.int(2, 6), rng.int(2, 5)], ([x, y]) => clearOf(Math.PI * x * x * y, 1));
    const one = Math.PI * r * r;
    const tot = one * k;
    return {
      prompt: `A lawn sprinkler at a park waters a circle. The water reaches ${len(r, 'm')} from the sprinkler in every direction. A worker sets up $${k}$ sprinklers that do not overlap. What total area of grass gets watered? Round ${tenthSq('m')}.`,
      figure: circleFig(r, 'm', 'r', 'area watered by one sprinkler'),
      parts: [numPart(tot, { decimals: 1, suffix: 'm²' })],
      hints: ['The distance from the sprinkler to the edge of the water is the radius.', `Find the area of one circle with $A = \\pi r^2$, then multiply by $${k}$. Round at the end.`],
      solution: [`One circle: $A = \\pi \\times ${r} \\times ${r} \\approx ${nm(one, 3)}\\ ${sq('m')}$`, `$${k}$ sprinklers: $${k} \\times ${nm(one, 3)} \\approx ${nm(tot, 3)}$`, `Rounded ${tenthSq('m')}, about $${nf(tot, 1)}\\ ${sq('m')}$ of grass gets watered.`],
    };
  }
  const [D, dm] = retry(() => [rng.pick([14, 16, 18]), rng.pick([10, 11, 12])], ([a, b]) => clearOf(Math.PI * (b / 2) ** 2 * 2, 0) && Math.abs(Math.PI * (a / 2) ** 2 - 2 * Math.PI * (b / 2) ** 2) > 5);
  const big = Math.PI * (D / 2) ** 2;
  const two = 2 * Math.PI * (dm / 2) ** 2;
  const bigWins = big > two;
  return {
    prompt: `A pizza place sells a large pizza with a diameter of ${len(D, 'in')}. A medium pizza has a diameter of ${len(dm, 'in')}. ${name} is ordering for a staff party.\n\n(a) What is the total area of **two** medium pizzas, to the nearest square inch?\n\n(b) Which order gives more pizza?`,
    figure: drawPlan({
      shapes: [{ pts: circlePts(D / 2, 0, D / 2) }, { pts: circlePts(D + 2 + dm / 2, 0, dm / 2), color: 'accent' }],
      dashed: [[[0, 0], [D, 0]], [[D + 2, 0], [D + 2 + dm, 0]]],
      labels: [overLine(`d = ${D} in`, `${D} in`, D / 2, 0), overLine(`d = ${dm} in`, `${dm} in`, D + 2 + dm / 2, 0)],
      caption: 'large pizza and medium pizza',
    }),
    parts: [{ ...numPart(two, { decimals: 0, suffix: 'in²' }), label: '(a)' }, { label: '(b)', answer: fixedChoice(['One large pizza', 'Two medium pizzas'], bigWins ? 0 : 1) }],
    hints: ['Find the radius of each pizza (half the diameter). Then use $A = \\pi r^2$.', 'Double the area of one medium pizza, then compare it with the area of one large pizza.'],
    solution: [
      `One medium: $r = ${dm} \\div 2 = ${nm(dm / 2)}$, so $A = \\pi \\times ${nm(dm / 2)} \\times ${nm(dm / 2)} \\approx ${nm(two / 2, 2)}\\ ${sq('in')}$`,
      `(a) Two mediums: $2 \\times ${nm(two / 2, 2)} \\approx ${nm(two, 2)}$, about $${nf(two, 0)}\\ ${sq('in')}$`,
      `One large: $r = ${D} \\div 2 = ${D / 2}$, so $A = \\pi \\times ${D / 2} \\times ${D / 2} \\approx ${nm(big, 2)}\\ ${sq('in')}$`,
      `(b) ${bigWins ? 'One large pizza gives more pizza.' : 'Two medium pizzas give more pizza.'}`,
    ],
  };
}

const area = skill({
  id: 'm204-area',
  name: 'Area of rectangles, triangles, parallelograms and circles',
  description: 'Find the area of rectangles, triangles, parallelograms and circles, and use areas in two-step everyday problems.',
  outcomes: ['SS2'],
  lessonId: 'm204-7-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 3) return areaHard(rng, name);
    const shape = rng.weighted([
      ['rect', 3],
      ['tri', 3],
      ['para', 2],
      ['circle', 3],
    ] as const);
    if (shape === 'circle') return circleArea(rng, d);
    const c = rng.pick(BASIC_CTX[shape]);
    if (d === 1) {
      const [b, h] = retry(() => [rng.int(c.lo, c.hi), rng.int(c.lo, c.hi)], ([x, y]) => x !== y && (shape !== 'tri' || (x * y) % 2 === 0));
      return basicArea(shape, c.what, c.u, b, h);
    }
    const big = c.u === 'cm' || c.hi > 15;
    const [b, h] = retry(
      () => (big ? [rng.int(c.lo, c.hi) + rng.pick([0, 0.5]), rng.int(c.lo, c.hi) + rng.pick([0, 0.5])] : [tenths(rng, c.lo, c.hi), tenths(rng, c.lo, c.hi)]),
      ([x, y]) => x !== y && areaAns(shape === 'tri' ? (x * y) / 2 : x * y, c.u).ok,
    );
    const slant = shape === 'para' && rng.chance(0.5) ? clean(h + rng.int(3, 12) / 10 * (big ? 5 : 1)) : undefined;
    return basicArea(shape, c.what, c.u, b, h, slant);
  },
});

// ---------------------------------------------------------------------------
// Lesson 7.3 — Composite shapes and material costs
// ---------------------------------------------------------------------------

function compositeEasy(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const c = rng.pick([
      { what: 'L-shaped kitchen floor', u: 'm', a: [2, 4], H: [4, 7], w: [2, 4] },
      { what: 'L-shaped deck', u: 'ft', a: [6, 12], H: [10, 18], w: [6, 12] },
      { what: 'L-shaped garden', u: 'm', a: [3, 6], H: [5, 10], w: [3, 7] },
      { what: 'L-shaped staff room', u: 'm', a: [3, 6], H: [6, 10], w: [3, 6] },
    ]);
    const a = rng.int(c.a[0], c.a[1]);
    const H = rng.int(c.H[0], c.H[1]);
    const w = rng.int(c.w[0], c.w[1]);
    const h2 = rng.int(2, H - 2);
    const A1 = a * H;
    const A2 = w * h2;
    const pts: P[] = [
      [0, 0],
      [a + w, 0],
      [a + w, h2],
      [a, h2],
      [a, H],
      [0, H],
    ];
    return {
      prompt: `The ${c.what} shown is split into two rectangles by the dashed line. The left rectangle is ${len(a, c.u)} by ${len(H, c.u)}. The right rectangle is ${len(w, c.u)} by ${len(h2, c.u)}. What is the total area?`,
      figure: drawPlan({
        shapes: [{ pts }],
        dashed: [[[a, 0], [a, h2]]],
        labels: [below(lab(a, c.u), a / 2, 0), below(lab(w, c.u), a + w / 2, 0), leftOf(lab(H, c.u), 0, H / 2), rightOf(lab(h2, c.u), a + w, h2 / 2)],
        caption: c.what,
      }),
      parts: [numPart(A1 + A2, { suffix: `${c.u}²` })],
      hints: ['Find the area of each rectangle: length × width.', 'Add the two areas together.'],
      solution: [`Left rectangle: $${a} \\times ${H} = ${A1}\\ ${sq(c.u)}$`, `Right rectangle: $${w} \\times ${h2} = ${A2}\\ ${sq(c.u)}$`, `Total: $${A1} + ${A2} = ${A1 + A2}$`, `The area is ${ar(A1 + A2, c.u)}.`],
    };
  }
  const c = rng.pick([
    { outer: 'lawn', inner: 'flower bed', u: 'm', W: [10, 18], H: [7, 12], iw: [2, 4], ih: [1, 3], ask: 'What area of grass is left to mow?' },
    { outer: 'backyard', inner: 'shed', u: 'm', W: [12, 20], H: [8, 14], iw: [2, 4], ih: [2, 3], ask: 'How much of the yard is covered by grass?' },
    { outer: 'wall in a hair salon', inner: 'mirror', u: 'ft', W: [10, 16], H: [8, 9], iw: [3, 5], ih: [2, 4], ask: 'What area of wall needs paint?' },
    { outer: 'warehouse floor', inner: 'office', u: 'ft', W: [60, 90], H: [40, 60], iw: [10, 20], ih: [8, 15], ask: 'What floor area is left for storage?' },
  ]);
  const W = rng.int(c.W[0], c.W[1]);
  const H = rng.int(c.H[0], c.H[1]);
  const iw = rng.int(c.iw[0], c.iw[1]);
  const ih = rng.int(c.ih[0], c.ih[1]);
  const x0 = W - iw - Math.max(1, Math.round(W * 0.12));
  const y0 = Math.max(1, Math.round(H * 0.15));
  const big = W * H;
  const small = iw * ih;
  const inner = rectPts(x0, y0, iw, ih);
  return {
    prompt: `A rectangular ${c.outer} is ${len(W, c.u)} by ${len(H, c.u)}. ${cap(an(c.inner))} that is ${len(iw, c.u)} by ${len(ih, c.u)} is inside it. ${c.ask}`,
    figure: drawPlan({
      shapes: [{ pts: rectPts(0, 0, W, H) }, { pts: inner, color: 'accent' }],
      labels: [below(lab(W, c.u), W / 2, 0), leftOf(lab(H, c.u), 0, H / 2), above(lab(iw, c.u), x0 + iw / 2, y0 + ih), leftOf(lab(ih, c.u), x0, y0 + ih / 2)],
      caption: `${c.outer} with ${an(c.inner)}`,
    }),
    parts: [numPart(big - small, { suffix: `${c.u}²` })],
    hints: [`Find the area of the whole ${c.outer}. Then take away the part covered by the ${c.inner}.`, 'Big area − small area.'],
    solution: [`Whole ${c.outer}: $${W} \\times ${H} = ${nm(big)}\\ ${sq(c.u)}$`, `${cap(c.inner)}: $${iw} \\times ${ih} = ${small}\\ ${sq(c.u)}$`, `Subtract: $${nm(big)} - ${small} = ${nm(big - small)}$`, `The area is ${ar(big - small, c.u)}.`],
  };
}

function compositeMid(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['rectSemi', 'rectTri', 'Lsub', 'lawnRound'] as const);
  if (mode === 'rectSemi') {
    const c = rng.pick([
      { what: 'stage at a community hall', u: 'm', L: [4, 8], W: [3, 6] },
      { what: 'garden bed with a rounded end', u: 'm', L: [3, 7], W: [2, 4] },
      { what: 'patio with a rounded end', u: 'ft', L: [10, 18], W: [8, 14] },
      { what: 'conference table top', u: 'm', L: [2, 4], W: [1, 1.5] },
    ]);
    const [L, W] = retry(() => [rng.int(c.L[0], c.L[1]), c.W[1] < 2 ? rng.pick([1, 1.2, 1.4]) : 2 * rng.int(Math.ceil(c.W[0] / 2), Math.floor(c.W[1] / 2))], ([l, w]) => w < l && clearOf(l * w + (Math.PI * (w / 2) ** 2) / 2, 1));
    const r = W / 2;
    const rect = L * W;
    const half = (Math.PI * r * r) / 2;
    const A = rect + half;
    const pts: P[] = [[0, 0], [L, 0], ...arcPts(L, r, r, -Math.PI / 2, Math.PI / 2).slice(1, -1), [L, W], [0, W]];
    return {
      prompt: `The ${c.what} is a rectangle with a half circle on one end. The rectangle is ${len(L, c.u)} long and ${len(W, c.u)} wide. What is the total area? Round ${tenthSq(c.u)}.`,
      figure: drawPlan({ shapes: [{ pts }], dashed: [[[L, 0], [L, W]]], labels: [below(lab(L, c.u), L / 2, 0), leftOf(lab(W, c.u), 0, W / 2)], caption: c.what }),
      parts: [numPart(A, { decimals: 1, suffix: `${c.u}²` })],
      hints: ['Split the shape into a rectangle and a half circle. The width of the rectangle is the diameter of the half circle.', 'Rectangle: $l \\times w$. Half circle: $\\pi r^2 \\div 2$, with $r = w \\div 2$. Add the two areas.'],
      solution: [
        `Rectangle: $${nm(L)} \\times ${nm(W)} = ${nm(rect)}\\ ${sq(c.u)}$`,
        `Half circle: $r = ${nm(W)} \\div 2 = ${nm(r)}$, so $\\pi \\times ${nm(r)} \\times ${nm(r)} \\div 2 \\approx ${nm(half, 3)}\\ ${sq(c.u)}$`,
        `Total: $${nm(rect)} + ${nm(half, 3)} \\approx ${nm(A, 3)}$`,
        `Rounded ${tenthSq(c.u)}, the area is about $${nf(A, 1)}\\ ${sq(c.u)}$.`,
      ],
    };
  }
  if (mode === 'rectTri') {
    const bld = rng.pick(['shed', 'garage', 'barn', 'chicken coop']);
    const w = 2 * rng.int(4, 8);
    const h = rng.int(7, 10);
    const t = rng.int(3, 6);
    const rect = w * h;
    const tri = (w * t) / 2;
    const pts: P[] = [
      [0, 0],
      [w, 0],
      [w, h],
      [w / 2, h + t],
      [0, h],
    ];
    return {
      prompt: `${name} is buying siding for the end wall of a ${bld}. The wall is a rectangle with a triangle on top. The wall is ${len(w, 'ft')} wide. The rectangle is ${len(h, 'ft')} tall, and the triangle is ${len(t, 'ft')} tall. What is the area of the end wall?`,
      figure: drawPlan({
        shapes: [{ pts }],
        dashed: [[[0, h], [w, h]], [[w / 2, h], [w / 2, h + t]]],
        labels: [below(lab(w, 'ft'), w / 2, 0), leftOf(lab(h, 'ft'), 0, h / 2), heightLab(lab(t, 'ft'), lab(t, 'ft'), w / 2, [h + t * 0.35, h + t * 0.3, h + t * 0.45, h + t * 0.25])],
        caption: `end wall of a ${bld}`,
      }),
      parts: [numPart(rect + tri, { suffix: 'ft²' })],
      hints: ['Split the wall into a rectangle and a triangle.', 'Rectangle: $l \\times w$. Triangle: $b \\times h \\div 2$, where the base is the width of the wall.'],
      solution: [`Rectangle: $${w} \\times ${h} = ${rect}\\ ${sq('ft')}$`, `Triangle: $${w} \\times ${t} \\div 2 = ${nm(tri)}\\ ${sq('ft')}$`, `Total: $${rect} + ${nm(tri)} = ${nm(rect + tri)}$`, `The end wall has an area of ${ar(rect + tri, 'ft')}.`],
    };
  }
  if (mode === 'Lsub') {
    const c = rng.pick([
      { what: 'L-shaped basement floor', u: 'ft', sc: 2 },
      { what: 'L-shaped concrete slab', u: 'm', sc: 1 },
      { what: 'L-shaped lawn', u: 'm', sc: 1 },
      { what: 'L-shaped restaurant kitchen', u: 'ft', sc: 2 },
    ]);
    const [W, H, w2, h2] = lDims(rng, 8, 12).map((x) => x * c.sc);
    const pts = lPts(W, H, w2, h2);
    const big = W * H;
    const cut = w2 * h2;
    return {
      prompt: `The ${c.what} shown is a ${len(W, c.u)} by ${len(H, c.u)} rectangle with a ${len(w2, c.u)} by ${len(h2, c.u)} corner missing. What is the area of the ${c.what}?`,
      figure: drawPlan({
        shapes: [{ pts }],
        dashed: [[[W - w2, H], [W, H]], [[W, H], [W, H - h2]]],
        labels: [below(lab(W, c.u), W / 2, 0), leftOf(lab(H, c.u), 0, H / 2), below(lab(w2, c.u), W - w2 / 2, H - h2), leftOf(lab(h2, c.u), W - w2, H - h2 / 2)],
        caption: c.what,
      }),
      parts: [numPart(big - cut, { suffix: `${c.u}²` })],
      hints: ['Imagine the missing corner is filled in. Then the shape is one big rectangle.', 'Find the area of the big rectangle, then subtract the area of the missing corner.'],
      solution: [`Big rectangle: $${W} \\times ${H} = ${nm(big)}\\ ${sq(c.u)}$`, `Missing corner: $${w2} \\times ${h2} = ${cut}\\ ${sq(c.u)}$`, `Subtract: $${nm(big)} - ${cut} = ${nm(big - cut)}$`, `The area is ${ar(big - cut, c.u)}.`],
    };
  }
  const [W, H, dia] = retry(() => [rng.int(8, 16), rng.int(6, 10), rng.pick([1, 1.5, 2, 2.5, 3])], ([x, y, z]) => clearOf(x * y - (Math.PI * z * z) / 4, 1));
  const r = dia / 2;
  const circ = Math.PI * r * r;
  const A = W * H - circ;
  const cx = W * 0.62;
  const cy = H * 0.5;
  return {
    prompt: `A rectangular lawn is ${len(W, 'm')} by ${len(H, 'm')}. A round flower bed with a diameter of ${len(dia, 'm')} is cut out of the lawn. ${name} is spreading fertilizer on the grass only. What area of grass is there? Round ${tenthSq('m')}.`,
    figure: drawPlan({
      shapes: [{ pts: rectPts(0, 0, W, H) }, { pts: circlePts(cx, cy, r), color: 'accent' }],
      dashed: [[[cx - r, cy], [cx + r, cy]]],
      labels: [below(lab(W, 'm'), W / 2, 0), leftOf(lab(H, 'm'), 0, H / 2), above(`d = ${lab(dia, 'm')}`, cx, cy + r)],
      caption: 'lawn with a round flower bed',
    }),
    parts: [numPart(A, { decimals: 1, suffix: 'm²' })],
    hints: ['Find the area of the whole rectangle. Then take away the area of the circle.', 'Circle: $A = \\pi r^2$, with $r = d \\div 2$.'],
    solution: [`Rectangle: $${W} \\times ${H} = ${W * H}\\ ${sq('m')}$`, `Circle: $r = ${nm(dia)} \\div 2 = ${nm(r)}$, so $\\pi \\times ${nm(r)} \\times ${nm(r)} \\approx ${nm(circ, 3)}\\ ${sq('m')}$`, `Subtract: $${W * H} - ${nm(circ, 3)} \\approx ${nm(A, 3)}$`, `Rounded ${tenthSq('m')}, the grass covers about $${nf(A, 1)}\\ ${sq('m')}$.`],
  };
}

function compositeHard(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['gableDoor', 'rink', 'lawnTwo'] as const);
  if (mode === 'gableDoor') {
    const bld = rng.pick(['garage', 'workshop', 'barn', 'storage shed']);
    const w = 2 * rng.int(6, 10);
    const h = rng.int(9, 12);
    const t = rng.int(3, 6);
    const dw = rng.pick([3, 4]);
    const dh = 7;
    const rect = w * h;
    const tri = (w * t) / 2;
    const door = dw * dh;
    const A = rect + tri - door;
    const dx = Math.round(w * 0.15);
    const pts: P[] = [
      [0, 0],
      [w, 0],
      [w, h],
      [w / 2, h + t],
      [0, h],
    ];
    return {
      prompt: `${name} is putting siding on the end wall of a ${bld}. The wall is a rectangle with a triangle on top. The wall is ${len(w, 'ft')} wide, the rectangle is ${len(h, 'ft')} tall, and the triangle is ${len(t, 'ft')} tall. A door that is ${len(dw, 'ft')} wide and ${len(dh, 'ft')} tall gets no siding. What area needs siding?`,
      figure: drawPlan({
        shapes: [{ pts }, { pts: rectPts(dx, 0, dw, dh), color: 'accent' }],
        dashed: [[[0, h], [w, h]], [[w / 2, h], [w / 2, h + t]]],
        labels: [below(lab(w, 'ft'), w * 0.6, 0), leftOf(lab(h, 'ft'), 0, h / 2), heightLab(lab(t, 'ft'), lab(t, 'ft'), w / 2, [h + t * 0.35, h + t * 0.3, h + t * 0.45, h + t * 0.25]), { text: lab(dw, 'ft'), at: [dx + dw / 2, dh], dir: [0, 1], alt: [{ text: lab(dw, 'ft'), at: [dx + dw / 2, dh], dir: [0, -1] }] }, rightOf(lab(dh, 'ft'), dx + dw, dh / 2)],
        caption: `end wall of a ${bld} with a door`,
      }),
      parts: [numPart(A, { suffix: 'ft²' })],
      hints: ['Find the area of the rectangle and the triangle, and add them.', 'Then subtract the area of the door.'],
      solution: [`Rectangle: $${w} \\times ${h} = ${rect}\\ ${sq('ft')}$`, `Triangle: $${w} \\times ${t} \\div 2 = ${nm(tri)}\\ ${sq('ft')}$`, `Door: $${dw} \\times ${dh} = ${door}\\ ${sq('ft')}$`, `$${rect} + ${nm(tri)} - ${door} = ${nm(A)}$`, `${name} needs siding for ${ar(A, 'ft')}.`],
    };
  }
  if (mode === 'rink') {
    const c = rng.pick([
      { what: 'outdoor skating oval', u: 'm', L: [20, 40], W: [10, 20] },
      { what: 'swimming pool at a hotel', u: 'm', L: [8, 14], W: [4, 7] },
      { what: 'running-track infield at a school', u: 'm', L: [60, 90], W: [40, 60] },
      { what: 'boardroom table top', u: 'm', L: [2, 4], W: [1, 1.4] },
    ]);
    const [L, W] = retry(
      () => [rng.int(c.L[0], c.L[1]), c.W[1] < 2 ? rng.pick([1, 1.2, 1.4]) : 2 * rng.int(Math.ceil(c.W[0] / 2), Math.floor(c.W[1] / 2))],
      ([l, w]) => w < l && clearOf(l * w + Math.PI * (w / 2) ** 2, 1),
    );
    const r = W / 2;
    const rect = L * W;
    const circ = Math.PI * r * r;
    const A = rect + circ;
    const pts: P[] = [[r, 0], [r + L, 0], ...arcPts(r + L, r, r, -Math.PI / 2, Math.PI / 2).slice(1, -1), [r + L, W], [r, W], ...arcPts(r, r, r, Math.PI / 2, (3 * Math.PI) / 2).slice(1, -1)];
    return {
      prompt: `The ${c.what} is a rectangle with a half circle on each end. The rectangle is ${len(L, c.u)} long and ${len(W, c.u)} wide. What is the total area? Round ${tenthSq(c.u)}.`,
      figure: drawPlan({ shapes: [{ pts }], dashed: [[[r, 0], [r, W]], [[r + L, 0], [r + L, W]]], labels: [below(lab(L, c.u), r + L / 2, 0), rightOf(lab(W, c.u), r, W / 2)], caption: c.what }),
      parts: [numPart(A, { decimals: 1, suffix: `${c.u}²` })],
      hints: ['The two half circles fit together to make one whole circle. Its diameter is the width of the rectangle.', 'Area = rectangle + one circle: $l \\times w + \\pi r^2$, with $r = w \\div 2$.'],
      solution: [
        `Rectangle: $${nm(L)} \\times ${nm(W)} = ${nm(rect)}\\ ${sq(c.u)}$`,
        `Two half circles make one circle with $r = ${nm(W)} \\div 2 = ${nm(r)}$: $\\pi \\times ${nm(r)} \\times ${nm(r)} \\approx ${nm(circ, 3)}\\ ${sq(c.u)}$`,
        `Total: $${nm(rect)} + ${nm(circ, 3)} \\approx ${nm(A, 3)}$`,
        `Rounded ${tenthSq(c.u)}, the area is about $${nf(A, 1)}\\ ${sq(c.u)}$.`,
      ],
    };
  }
  const [W, H, sw, sh, dia] = retry(
    () => [rng.int(12, 20), rng.int(8, 14), rng.int(2, 4), rng.int(2, 3), rng.pick([1.5, 2, 2.5, 3])],
    ([x, y, a, b, z]) => clearOf(x * y - a * b - (Math.PI * z * z) / 4, 1),
  );
  const r = dia / 2;
  const circ = Math.PI * r * r;
  const shed = sw * sh;
  const A = W * H - shed - circ;
  const sx = W - sw - 1;
  const sy = H - sh - 1;
  const cx = W * 0.35;
  const cy = H * 0.45;
  return {
    prompt: `A rectangular backyard is ${len(W, 'm')} by ${len(H, 'm')}. It has a shed that is ${len(sw, 'm')} by ${len(sh, 'm')} and a round garden with a diameter of ${len(dia, 'm')}. ${name} is laying sod on the rest of the yard. What area needs sod? Round ${tenthSq('m')}.`,
    figure: drawPlan({
      shapes: [{ pts: rectPts(0, 0, W, H) }, { pts: rectPts(sx, sy, sw, sh), color: 'accent' }, { pts: circlePts(cx, cy, r), color: 'accent' }],
      dashed: [[[cx - r, cy], [cx + r, cy]]],
      labels: [below(lab(W, 'm'), W / 2, 0), leftOf(lab(H, 'm'), 0, H / 2), below(lab(sw, 'm'), sx + sw / 2, sy), leftOf(lab(sh, 'm'), sx, sy + sh / 2), above(`d = ${lab(dia, 'm')}`, cx, cy + r)],
      caption: 'backyard with a shed and a round garden',
    }),
    parts: [numPart(A, { decimals: 1, suffix: 'm²' })],
    hints: ['Find the area of the whole yard. Then take away the shed and the round garden.', 'Shed: $l \\times w$. Garden: $\\pi r^2$ with $r = d \\div 2$.'],
    solution: [
      `Whole yard: $${W} \\times ${H} = ${W * H}\\ ${sq('m')}$`,
      `Shed: $${sw} \\times ${sh} = ${shed}\\ ${sq('m')}$`,
      `Garden: $r = ${nm(dia)} \\div 2 = ${nm(r)}$, so $\\pi \\times ${nm(r)} \\times ${nm(r)} \\approx ${nm(circ, 3)}\\ ${sq('m')}$`,
      `$${W * H} - ${shed} - ${nm(circ, 3)} \\approx ${nm(A, 3)}$`,
      `Rounded ${tenthSq('m')}, about $${nf(A, 1)}\\ ${sq('m')}$ needs sod.`,
    ],
  };
}

const compositeArea = skill({
  id: 'm204-composite-area',
  name: 'Area of composite shapes',
  description: 'Find the area of a shape made from rectangles, triangles and circles by adding the parts or subtracting a cut-out.',
  outcomes: ['SS2'],
  lessonId: 'm204-7-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return compositeEasy(rng);
    if (d === 2) return compositeMid(rng, name);
    return compositeHard(rng, name);
  },
});

interface Material {
  item: string;
  pack: string;
  packs: string;
  u: string;
  cover: number[];
  p: [number, number];
  where: string;
  L: [number, number];
  W: [number, number];
}

const MATERIALS: Material[] = [
  { item: 'laminate flooring', pack: 'box', packs: 'boxes', u: 'm', cover: [1.5, 2, 2.2, 2.5], p: [28, 55], where: 'a bedroom floor', L: [3, 5], W: [2.5, 4] },
  { item: 'vinyl plank flooring', pack: 'box', packs: 'boxes', u: 'ft', cover: [20, 22, 24], p: [35, 65], where: 'a basement suite floor', L: [12, 20], W: [9, 14] },
  { item: 'sod', pack: 'roll', packs: 'rolls', u: 'm', cover: [0.8], p: [3, 5], where: 'a new front lawn', L: [5, 12], W: [3, 8] },
  { item: 'grass seed', pack: 'bag', packs: 'bags', u: 'm', cover: [25, 50], p: [15, 40], where: 'a lawn at a community park', L: [12, 30], W: [8, 20] },
  { item: 'carpet tiles', pack: 'box', packs: 'boxes', u: 'm', cover: [2, 2.5, 5], p: [40, 90], where: 'a daycare playroom floor', L: [4, 8], W: [3, 6] },
  { item: 'paint', pack: 'can', packs: 'cans', u: 'm', cover: [10, 12, 15], p: [25, 60], where: 'a wall in a restaurant', L: [6, 15], W: [2.4, 3] },
];

/** "=" when x has at most two decimals, otherwise "≈". */
const eqOr = (x: number) => (placesOf(clean(x)) <= 2 ? '=' : '\\approx');

/** True when need ÷ cover is not close to a whole number, so rounding up really matters. */
function notWhole(q: number): boolean {
  const f = q - Math.floor(q);
  return f > 0.08 && f < 0.92;
}

const dimOf = (rng: Rng, lo: number, hi: number, u: string) => (u === 'm' && hi <= 8 ? tenths(rng, lo, hi) : rng.int(lo, hi));

function materialCost(rng: Rng, d: 1 | 2 | 3, name: string): GenOutput {
  if (d === 1) {
    const c = rng.pick([
      { item: 'grass seed', pack: 'bag', packs: 'bags', cover: [25, 50, 100], A: [60, 480], job: 'seed a lawn' },
      { item: 'paint', pack: 'can', packs: 'cans', cover: [10, 20], A: [24, 95], job: 'paint the walls of a room' },
      { item: 'floor tiles', pack: 'box', packs: 'boxes', cover: [2, 3], A: [9, 40], job: 'tile a kitchen floor' },
      { item: 'fertilizer', pack: 'bag', packs: 'bags', cover: [100, 200], A: [250, 900], job: 'fertilize a soccer field' },
    ]);
    const cover = rng.pick(c.cover);
    if (rng.chance(0.5)) {
      const A = retry(() => rng.int(c.A[0], c.A[1]), (x) => notWhole(x / cover));
      const q = A / cover;
      const N = Math.ceil(q);
      return {
        prompt: `One ${c.pack} of ${c.item} covers ${ar(cover, 'm')}. ${name} needs to ${c.job} with an area of ${ar(A, 'm')}. How many ${c.packs} should ${name} buy?`,
        parts: [numPart(N, { suffix: c.packs })],
        hints: [`Divide the area by the amount one ${c.pack} covers.`, `You cannot buy part of a ${c.pack}, so always round **up** to the next whole number.`],
        solution: [`$${A} \\div ${cover} ${eqOr(q)} ${nm(q, 2)}$`, `You cannot buy $${nm(q, 2)}$ ${c.packs}, and ${Math.floor(q)} ${Math.floor(q) === 1 ? c.pack : c.packs} would not be enough. Round up to $${N}$.`, `${name} should buy ${N} ${c.packs}.`],
      };
    }
    const [l, w] = retry(() => [rng.int(4, 12), rng.int(3, 9)], ([x, y]) => y < x && notWhole((x * y) / cover) && x * y > cover);
    const A = l * w;
    const q = A / cover;
    const N = Math.ceil(q);
    return {
      prompt: `${name} needs to ${c.job}. The area is a rectangle ${len(l, 'm')} long and ${len(w, 'm')} wide. One ${c.pack} of ${c.item} covers ${ar(cover, 'm')}. How many ${c.packs} should ${name} buy?`,
      figure: rectFig(l, w, 'm', `area to cover`),
      parts: [numPart(N, { suffix: c.packs })],
      hints: ['Find the area first: length × width.', `Divide the area by the amount one ${c.pack} covers. Always round **up**.`],
      solution: [`Area: $${l} \\times ${w} = ${A}\\ ${sq('m')}$`, `$${A} \\div ${cover} ${eqOr(q)} ${nm(q, 2)}$`, `You cannot buy part of a ${c.pack}, so round up to $${N}$.`, `${name} should buy ${N} ${c.packs}.`],
    };
  }
  const c = rng.pick(MATERIALS);
  const waste = d === 3;
  const made = retry(
    () => {
      const L = dimOf(rng, c.L[0], c.L[1], c.u);
      const W = c.item === 'paint' ? rng.pick([2.4, 2.5, 3]) : dimOf(rng, c.W[0], c.W[1], c.u);
      const cover = rng.pick(c.cover);
      const pr = price(rng, c.p[0], c.p[1]);
      const A = clean(L * W);
      const need = clean(waste ? A * 1.1 : A);
      const N = Math.ceil(need / cover - 1e-9);
      const sub = clean(N * pr);
      return { L, W, cover, pr, A, need, N, sub, total: sub * 1.05 };
    },
    (x) => x.W < x.L && notWhole(x.need / x.cover) && x.need / x.cover > 1.2 && clearOf(x.total, 2, 0.1),
  );
  const gst = clean(made.total - made.sub);
  const what = c.item === 'paint' ? `one coat of paint on ${c.where}` : `${c.item} on ${c.where}`;
  return {
    prompt: `${name} is putting ${what}. The area is a rectangle ${len(made.L, c.u)} by ${len(made.W, c.u)}.${waste ? ' Add 10% extra for waste.' : ''} One ${c.pack} covers ${ar(made.cover, c.u)} and costs ${cash(made.pr)}. GST of 5% is added to the price.\n\n(a) How many ${c.packs} should ${name} buy?\n\n(b) What is the total cost with GST, to the nearest cent?`,
    figure: rectFig(made.L, made.W, c.u, c.where),
    parts: [{ ...numPart(made.N, { suffix: c.packs }), label: '(a)' }, moneyPart(made.total, '(b) \\$')],
    hints: [
      waste ? 'Find the area. Then add 10% for waste: multiply the area by 1.1.' : 'Find the area: length × width.',
      `Divide by the area one ${c.pack} covers and round **up**. Multiply by the price, then add 5% GST.`,
    ],
    solution: [
      `Area: $${nm(made.L)} \\times ${nm(made.W)} = ${nm(made.A)}\\ ${sq(c.u)}$`,
      ...(waste ? [`Add 10% for waste: $${nm(made.A)} \\times 1.1 = ${nm(made.need)}\\ ${sq(c.u)}$`] : []),
      `(a) $${nm(made.need)} \\div ${nm(made.cover)} ${eqOr(made.need / made.cover)} ${nm(made.need / made.cover, 2)}$, so round up to $${made.N}$ ${c.packs}.`,
      `Cost before tax: $${made.N} \\times ${mon(made.pr)} = ${mon(made.sub)}$`,
      `GST: $${mon(made.sub)} \\times 0.05 \\approx ${mon(gst)}$`,
      `(b) Total: $${mon(made.sub)} + ${mon(gst)} = ${mon(made.total)}$, so the total cost is ${cash(made.total)}.`,
    ],
  };
}

const materialCostSkill = skill({
  id: 'm204-material-cost',
  name: 'Material needed and its cost',
  description: 'Find how many boxes, rolls, bags or cans of material to buy for an area (always rounding up), and the total cost with a 5% sales tax, adding 10% for waste when needed.',
  outcomes: ['SS2'],
  lessonId: 'm204-7-3',
  calculator: true,
  gen(rng, d) {
    return materialCost(rng, d, rng.pick(NAMES));
  },
});

export const AREA_SKILLS: SkillDef[] = [perimeter, area, compositeArea, materialCostSkill];
