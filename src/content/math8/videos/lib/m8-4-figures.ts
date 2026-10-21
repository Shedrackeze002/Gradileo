/**
 * Figures for the multiplying and dividing fractions videos (Grade 8, unit 4), built only from
 * standard diagram parts (lines, shaded regions and labels), so each goes into a diagram with
 * `figure`:
 *
 * - `fractionSquare`: an area model for a fraction times a fraction. A rectangle (a square of area
 *   1 by default) cut into columns and rows; some columns are shaded blue for one fraction, some
 *   rows orange for the other, and the overlap, green and hatched, is the product.
 * - `fitBar`: a bar for "how many fit": an amount in wholes, with the pieces of the divisor marked
 *   off along it and numbered, and any leftover hatched in red.
 *
 * Fraction strips come from the Grade 5 helpers (`bar` in `m5-5-figures.ts`), equal groups of
 * dots from the Grade 6 helpers (`dotGroups` in `m6-4-figures.ts`), and the area model for mixed
 * numbers from `areaModel` in `src/video/algebra.ts`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { bracket } from './m8-3-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A rectangle's corners as point names, from the bottom left, anticlockwise. */
function corners(points: Record<string, P>, id: string, x0: number, y0: number, x1: number, y1: number): string[] {
  return ([[x0, y0], [x1, y0], [x1, y1], [x0, y1]] as P[]).map((q, j) => {
    points[`${id}-${j}`] = q;
    return `${id}-${j}`;
  });
}

/** Lines sloping up to the right across a rectangle, `gap` apart (measured along the bottom). */
function hatch(points: Record<string, P>, id: string, x0: number, y0: number, x1: number, y1: number, gap: number, tone: DiagramTone, group: string): DiagramItem[] {
  const items: DiagramItem[] = [];
  const w = x1 - x0;
  const h = y1 - y0;
  let k = 0;
  for (let d = -h + gap / 2; d < w; d += gap, k++) {
    // The line x = x0 + d + (y − y0), clipped to the rectangle.
    const a: P = d >= 0 ? [x0 + d, y0] : [x0, y0 - d];
    const b: P = d + h <= w ? [x0 + d + h, y1] : [x1, y0 + (w - d)];
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < gap / 3) continue;
    Object.assign(points, { [`${id}${k}a`]: a, [`${id}${k}b`]: b });
    items.push({ kind: 'line', id: `${id}${k}`, from: `${id}${k}a`, to: `${id}${k}b`, tone, weight: 2, group });
  }
  return items;
}

/**
 * An area model for a fraction times a fraction: a rectangle `w` by `h` (a square, 6 by 6, by
 * default) cut into `cols` equal columns and `rows` equal rows. The first `colShade` columns (from
 * the left) are shaded blue, with `colLabel` (TeX) on a bracket above them; the first `rowShade`
 * rows (from the top) are shaded orange, with `rowLabel` on a bracket left of them. Where they
 * overlap is shaded green and hatched; with `numbers`, its small rectangles are numbered 1, 2, 3…
 * row by row.
 *
 * Parts: `outline`, `vcuts` and `hcuts` (groups: the outline, the cuts between the columns and
 * the cuts between the rows; `frame` lists all three), `cols` and `rows` (groups: the shading and
 * its bracket), `both` (a group: the green overlap and its hatching) and `nums` (a group: the
 * numbers in the overlap).
 */
export function fractionSquare(o: {
  name?: string;
  cols: number;
  rows: number;
  colShade: number;
  rowShade: number;
  w?: number;
  h?: number;
  colLabel?: string;
  rowLabel?: string;
  numbers?: boolean;
}): Part {
  const n = namer(o.name);
  const W = o.w ?? 6;
  const H = o.h ?? 6;
  const cw = W / o.cols;
  const rh = H / o.rows;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const a = o.colShade * cw;
  const b = H - o.rowShade * rh;
  items.push({ kind: 'region', id: n('cols-fill'), points: corners(points, n('cf'), 0, 0, a, H), tone: 'adj', shade: 0.32, group: n('cols') });
  items.push({ kind: 'region', id: n('rows-fill'), points: corners(points, n('rf'), 0, b, W, H), tone: 'opp', shade: 0.32, group: n('rows') });
  items.push({ kind: 'region', id: n('both-fill'), points: corners(points, n('bf'), 0, b, a, H), tone: 'good', shade: 0.5, group: n('both') });
  items.push(...hatch(points, n('h'), 0, b, a, H, Math.min(cw, rh) / 3, 'good', n('both')));
  for (let i = 1; i < o.cols; i++) {
    Object.assign(points, { [n(`x${i}a`)]: [i * cw, 0], [n(`x${i}b`)]: [i * cw, H] });
    items.push({ kind: 'line', id: n(`gx${i}`), from: n(`x${i}a`), to: n(`x${i}b`), weight: 2, group: n('vcuts') });
  }
  for (let j = 1; j < o.rows; j++) {
    Object.assign(points, { [n(`y${j}a`)]: [0, j * rh], [n(`y${j}b`)]: [W, j * rh] });
    items.push({ kind: 'line', id: n(`gy${j}`), from: n(`y${j}a`), to: n(`y${j}b`), weight: 2, group: n('hcuts') });
  }
  items.push({ kind: 'curve', id: n('edge'), points: corners(points, n('o'), 0, 0, W, H), closed: true, weight: 3.5, group: n('outline') });
  if (o.colLabel) items.push(...bracket(points, n('cb'), [0, H + 0.45], [a, H + 0.45], [0, -1], o.colLabel, 'above', 'adj', n('cols')));
  if (o.rowLabel) items.push(...bracket(points, n('rb'), [-0.45, H], [-0.45, b], [1, 0], o.rowLabel, 'left', 'opp', n('rows')));
  if (o.numbers) {
    let k = 1;
    for (let r = 0; r < o.rowShade; r++) {
      for (let c = 0; c < o.colShade; c++, k++) {
        points[n(`n${k}`)] = [(c + 0.5) * cw, H - (r + 0.5) * rh];
        items.push({ kind: 'label', id: n(`num${k}`), at: n(`n${k}`), tex: `\\mathbf{${k}}`, tone: 'ink', place: 'center', group: n('nums') });
      }
    }
  }
  return { points, items };
}

/**
 * A bar for "how many fit": `total` wholes long, `unit` long per whole. Its outline runs to the
 * next whole (or across `wholes` wholes, so 3/4 can sit inside one whole bar), or ends at `total`
 * itself when `exact` (a board or a ribbon). Thick cuts mark the wholes and thin cuts every
 * 1/`den` of a whole (none when `den` is 1). Along it, pieces `piece` wholes long are marked off
 * from the left, shaded in two alternating tones and numbered above; what is left at the end,
 * too short for a whole piece, is hatched red, with `rest` (TeX) under it. With `scale`, the
 * whole numbers are written under the cuts.
 *
 * Parts: `frame` (a group: the outline and the cuts), each piece `g<i>` (a group: its shading and
 * its number; `pieces` lists them), `rest` (a group: the leftover, its hatching and its label) and
 * `scale` (a group: the whole numbers).
 */
export function fitBar(o: {
  name?: string;
  total: number;
  piece: number;
  den: number;
  wholes?: number;
  unit?: number;
  height?: number;
  tones?: [DiagramTone, DiagramTone];
  rest?: string;
  scale?: boolean;
  numbers?: boolean;
  /** End the bar at `total` (a board or a ribbon) instead of at the next whole. */
  exact?: boolean;
}): Part {
  const n = namer(o.name);
  const wholes = o.wholes ?? Math.ceil(o.total - 1e-9);
  const len = o.exact ? o.total : wholes;
  const u = o.unit ?? 12 / len;
  const H = o.height ?? 1.2;
  const [t0, t1] = o.tones ?? ['adj', 'good'];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const count = Math.floor(o.total / o.piece + 1e-9);
  for (let i = 0; i < count; i++) {
    const x0 = i * o.piece * u;
    const x1 = (i + 1) * o.piece * u;
    const tone = i % 2 === 0 ? t0 : t1;
    items.push({ kind: 'region', id: n(`g${i}-fill`), points: corners(points, n(`g${i}`), x0, 0, x1, H), tone, shade: 0.55, group: n(`g${i}`) });
    if (o.numbers !== false) {
      points[n(`g${i}-top`)] = [(x0 + x1) / 2, H + 0.05];
      items.push({ kind: 'label', id: n(`g${i}-num`), at: n(`g${i}-top`), tex: String(i + 1), tone, place: 'above', group: n(`g${i}`) });
    }
  }
  const used = count * o.piece;
  if (o.total - used > 1e-9) {
    const x0 = used * u;
    const x1 = o.total * u;
    items.push({ kind: 'region', id: n('rest-fill'), points: corners(points, n('rf'), x0, 0, x1, H), tone: 'bad', shade: 0.3, group: n('rest') });
    items.push(...hatch(points, n('rh'), x0, 0, x1, H, Math.min(0.35, (x1 - x0) / 3), 'bad', n('rest')));
    if (o.rest) {
      points[n('rest-at')] = [(x0 + x1) / 2, o.scale ? -0.75 : -0.1];
      items.push({ kind: 'label', id: n('rest-label'), at: n('rest-at'), tex: o.rest, tone: 'bad', place: 'below', group: n('rest') });
    }
  }
  // The outline, the whole cuts and the thin cuts.
  items.push({ kind: 'curve', id: n('outline'), points: corners(points, n('o'), 0, 0, len * u, H), closed: true, weight: 3.5, group: n('frame') });
  const fine = Math.round(len * o.den - 1e-9);
  for (let k = 1; k < fine; k++) {
    const whole = k % o.den === 0;
    Object.assign(points, { [n(`c${k}a`)]: [(k / o.den) * u, 0], [n(`c${k}b`)]: [(k / o.den) * u, H] });
    items.push({ kind: 'line', id: n(`cut${k}`), from: n(`c${k}a`), to: n(`c${k}b`), tone: whole ? 'ink' : 'muted', weight: whole ? 3.5 : 1.5, group: n('frame') });
  }
  if (o.scale) {
    for (let k = 0; k <= Math.floor(len + 1e-9); k++) {
      points[n(`s${k}`)] = [k * u, -0.1];
      items.push({ kind: 'label', id: n(`s${k}`), at: n(`s${k}`), tex: String(k), tone: 'muted', place: 'below', group: n('scale') });
    }
  }
  return { points, items };
}

/** The outline and every cut of a `fractionSquare` in the figure `fig`, for `show`. */
export const frame = (fig: string): string[] => [`${fig}.outline`, `${fig}.vcuts`, `${fig}.hcuts`];

/** The ids of the pieces `g0`… of a `fitBar` in the figure `fig`, from piece `from` on, for `show` and `focus`. */
export const pieces = (fig: string, count: number, from = 0): string[] => Array.from({ length: count }, (_, k) => `${fig}.g${from + k}`);
