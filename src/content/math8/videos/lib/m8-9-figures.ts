/**
 * Figures for the congruent polygons videos, built only from standard diagram parts (lines, angles,
 * labels and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `poly`: a polygon through named corners, with its letters, side lengths, angle measures and,
 *   for congruence, tick marks on sides and arcs in corners.
 * - `moved`: the corners of a congruent copy, turned, flipped and slid to a new place, with new
 *   names, to draw beside the original.
 * - `sheet`: squared paper (one unit a square, no numbers) that works as a plane, so the shapes,
 *   mirror lines, arrows and turns of the transformation helpers draw on it.
 * - `shapeOn`: a shaded shape on the squared paper, with a dot and a name at each vertex.
 *
 * Shapes, mirror lines, arrows and turns on the paper come from `m303-4-figures.ts`; the turn
 * arrow that shows which way the vertices go round (`around`) and a labelled move along the grid
 * (`step`, for counting squares across and up) from `m7-9-figures.ts`; and the paper itself from
 * `m6-7-figures.ts`, all used as they are.
 *
 * `QUAD` is the lesson's quadrilateral ABCD on a grid, and `slid`, `flipped` and `turned` its
 * images after a translation, a reflection and a half turn.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';
import { facing } from '@/video/angles.ts';
import { paper } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { arrow, link, mirror, shape, turn } from '@/content/math30-3/videos/lib/m303-4-figures.ts';
import { around, arrow as step } from '@/content/math7/videos/lib/m7-9-figures.ts';

export { arrow, around, link, mirror, shape, step, turn };

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const unit = (a: P): P => mul(a, 1 / (Math.hypot(a[0], a[1]) || 1));
const deg = (v: P) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;

export interface PolyOptions {
  name?: string;
  /** The corners in order round the shape, by name. A side is named by its two corners ("AB"). */
  corners: Record<string, P>;
  /** TeX for each corner's letter (its key by default), or `false` for no letters. */
  names?: Partial<Record<string, string>> | false;
  /** Where a corner's letter sits, instead of straight out from the middle of the shape. */
  places?: Partial<Record<string, Place>>;
  tone?: DiagramTone;
  /** The opacity of the shading inside (0.16 by default). */
  shade?: number;
  /** Side lengths (TeX) beside sides, outside the shape: "AB": "6\\text{ cm}". */
  sides?: Partial<Record<string, string>>;
  /** Angle measures (TeX) inside corners: "A": "87^\\circ". */
  angles?: Partial<Record<string, string>>;
  /** How far an angle's measure sits from its corner, in pixels. */
  angleDist?: Partial<Record<string, number>>;
  /** Tick marks across sides ("AB": 1); equal sides get the same number. */
  ticks?: Partial<Record<string, number>>;
  /** Arcs in corners ("A": 1); equal angles get the same number. */
  arcs?: Partial<Record<string, number>>;
  /** Corners with a right-angle mark. */
  rights?: string[];
  /** The colour of the tick marks and arcs (orange unless set). */
  markTone?: DiagramTone;
}

/**
 * A polygon through named corners. Parts (each id starts with `name-` when there is a name):
 *
 * - `shape` (a group: the shading `fill`, the sides `AB`, `BC`… and the right-angle marks `rA`…),
 * - `names` (a group: the letters `nA`…),
 * - `lens` (a group: each side length `len-AB`, a line along the side that carries the label, so
 *   emphasising it lights up the side and its length together),
 * - `degs` (a group: each angle measure `deg-A`, an arc with its label),
 * - the tick marks on each side, `t-AB` (a group), and the arcs in each corner, `m-A` (a group).
 *
 * Tick marks are sized from the shape, so a copy drawn at the same scale has the same marks.
 */
export function poly(o: PolyOptions): Part {
  const n = namer(o.name);
  const keys = Object.keys(o.corners);
  const at = (k: string) => o.corners[k];
  const points: Record<string, P> = {};
  for (const k of keys) points[n(k)] = at(k);
  const tone = o.tone ?? 'brand';
  const mark = o.markTone ?? 'opp';
  const mid: P = mul(keys.reduce<P>((s, k) => add(s, at(k)), [0, 0]), 1 / keys.length);
  const xs = keys.map((k) => at(k)[0]);
  const ys = keys.map((k) => at(k)[1]);
  const big = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  const sides = keys.map((k, i) => [k, keys[(i + 1) % keys.length]] as const);
  const neighbours = (k: string): [string, string] => {
    const i = keys.indexOf(k);
    return [keys[(i + keys.length - 1) % keys.length], keys[(i + 1) % keys.length]];
  };
  // A side's label sits outside the shape: on the side of the line away from its middle.
  const outside = (p: string, q: string): 'left' | 'right' => {
    const d = sub(at(q), at(p));
    const w = sub(mid, at(p));
    return d[0] * w[1] - d[1] * w[0] > 0 ? 'right' : 'left';
  };
  const pick = <T>(rec: Partial<Record<string, T>> | undefined, p: string, q: string) => rec?.[`${p}${q}`] ?? rec?.[`${q}${p}`];

  const items: DiagramItem[] = [];
  if ((o.shade ?? 0.16) > 0) items.push({ kind: 'region', id: n('fill'), points: keys.map(n), tone, shade: o.shade ?? 0.16, group: n('shape') });
  for (const [p, q] of sides) items.push({ kind: 'line', id: n(`${p}${q}`), from: n(p), to: n(q), tone, group: n('shape') });
  for (const k of o.rights ?? []) {
    const [p, q] = neighbours(k);
    items.push({ kind: 'right', id: n(`r${k}`), at: n(k), from: n(p), to: n(q), group: n('shape') });
  }
  for (const [p, q] of sides) {
    const label = pick(o.sides, p, q);
    if (label) items.push({ kind: 'line', id: n(`len-${p}${q}`), from: n(p), to: n(q), tone, label, labelSide: outside(p, q), group: n('lens') });
  }
  for (const k of keys) {
    const label = o.angles?.[k];
    if (!label) continue;
    const [p, q] = neighbours(k);
    const dist = o.angleDist?.[k];
    items.push({ kind: 'angle', id: n(`deg-${k}`), at: n(k), from: n(p), to: n(q), tone: 'theta', label, r: 34, ...(dist ? { labelDist: dist } : {}), group: n('degs') });
  }
  for (const [p, q] of sides) {
    const count = pick(o.ticks, p, q) ?? 0;
    const along = unit(sub(at(q), at(p)));
    const across: P = [-along[1], along[0]];
    const centre = mul(add(at(p), at(q)), 0.5);
    for (let i = 0; i < count; i++) {
      const c = add(centre, mul(along, (i - (count - 1) / 2) * 0.045 * big));
      points[n(`t${p}${q}${i}a`)] = add(c, mul(across, 0.05 * big));
      points[n(`t${p}${q}${i}b`)] = add(c, mul(across, -0.05 * big));
      items.push({ kind: 'line', id: n(`t-${p}${q}-${i}`), from: n(`t${p}${q}${i}a`), to: n(`t${p}${q}${i}b`), tone: mark, weight: 3.5, group: n(`t-${p}${q}`) });
    }
  }
  for (const k of keys) {
    const [p, q] = neighbours(k);
    for (let i = 0; i < (o.arcs?.[k] ?? 0); i++) {
      items.push({ kind: 'angle', id: n(`m-${k}-${i}`), at: n(k), from: n(p), to: n(q), tone: mark, r: 30 + 8 * i, group: n(`m-${k}`) });
    }
  }
  if (o.names !== false) {
    for (const k of keys) {
      const tex = (o.names && o.names[k]) ?? k;
      items.push({ kind: 'label', id: n(`n${k}`), at: n(k), tex, place: o.places?.[k] ?? facing(deg(sub(at(k), mid))), group: n('names') });
    }
  }
  return { points, items };
}

/** The ids that show a `poly` called `name` in the figure `fig`: its outline, shading and letters. */
export const polyIds = (fig: string, name: string): string[] => [`${fig}.${name}-shape`, `${fig}.${name}-names`];

/**
 * The corners of a congruent copy of a shape: turned `turn` degrees anticlockwise about the
 * shape's middle (after a flip left to right when `flip` is set), then slid so its middle is at
 * `to`. The corners keep their order, renamed from `names` (the same names by default), so the
 * copy's corners match the original's one for one.
 */
export function moved(corners: Record<string, P>, o: { to: P; turn?: number; flip?: boolean; names?: string[] }): Record<string, P> {
  const keys = Object.keys(corners);
  const mid: P = mul(keys.reduce<P>((s, k) => add(s, corners[k]), [0, 0]), 1 / keys.length);
  const t = rad(o.turn ?? 0);
  const out: Record<string, P> = {};
  keys.forEach((k, i) => {
    let [x, y] = sub(corners[k], mid);
    if (o.flip) x = -x;
    [x, y] = [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)];
    out[o.names?.[i] ?? k] = add([x, y], o.to);
  });
  return out;
}

/**
 * Squared paper from (x0, y0) to (x1, y1), one unit a square, with no axes or numbers, as a plane:
 * anything drawn "on" it (`shape`, `mirror`, `arrow`, `turn`, `around`) uses its units directly.
 * Parts: `paper` (a group of the lines).
 */
export function sheet(o: { name?: string; x: [number, number]; y: [number, number] }): Plane {
  const p = paper(o);
  return { ...p, map: (x: number, y: number): P => [x, y], n: namer(o.name), x: o.x, y: o.y };
}

/**
 * A shape on squared paper through `pts`, shaded, with a dot and a name (TeX) at each vertex,
 * straight out from its middle unless `places` says otherwise. Parts: `id` (a group: the shading
 * and the sides) and `id-names` (a group: the dots and names `id-n0`…). The same as `shape`, blue
 * unless `tone` says otherwise, with a firmer shade.
 */
export function shapeOn(g: Plane, o: { id: string; pts: P[]; names?: string[]; places?: (Place | undefined)[]; tone?: DiagramTone }): Part {
  return shape(g, { id: o.id, pts: o.pts, names: o.names, places: o.places, tone: o.tone ?? 'adj', shade: 0.3 });
}

/** The ids that show a shape made by `shapeOn` (or `shape`) called `id` in the figure `fig`, with its names. */
export const onIds = (fig: string, id: string, named = true): string[] => [`${fig}.${id}`, ...(named ? [`${fig}.${id}-names`] : [])];

/**
 * A label (TeX) at a point of the paper, with no dot: the part `id`, in `group` if set.
 */
export function note(g: Plane, o: { id: string; at: P; tex: string; tone?: DiagramTone; place?: Place; group?: string }): Part {
  const at = g.n(`${o.id}-at`);
  return { points: { [at]: g.map(...o.at) }, items: [{ kind: 'label', id: g.n(o.id), at, tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: g.n(o.group) } : {}) }] };
}

/** The lesson's quadrilateral ABCD on a grid: A(1, 2), B(4, 2), C(4, 3), D(2, 5), counterclockwise. */
export const QUAD: P[] = [
  [1, 2],
  [4, 2],
  [4, 3],
  [2, 5],
];
/** ABCD translated 8 squares right and 2 up. */
export const slid: P[] = QUAD.map(([x, y]) => [x + 8, y + 2]);
/** ABCD reflected in the vertical line x = 6: the vertices go round clockwise. */
export const flipped: P[] = QUAD.map(([x, y]) => [12 - x, y]);
/** ABCD turned a half turn about (8, 3): upside down, but still counterclockwise. */
export const turned: P[] = QUAD.map(([x, y]) => [16 - x, 6 - y]);
/** The names of a shape's vertices and of its image's: A, B, C… and A′, B′, C′… */
export const NAMES = ['A', 'B', 'C', 'D'];
export const PRIMES = NAMES.map((k) => `${k}'`);
