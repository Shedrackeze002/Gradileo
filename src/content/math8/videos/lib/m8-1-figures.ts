/**
 * Figures for the squares, square roots and Pythagorean theorem videos (Grade 8, unit 1), built
 * only from standard diagram parts (lines, curves, shaded regions and labels), so each goes into a
 * diagram with `figure`:
 *
 * - `tileSquare`: square tiles set out in a square (or a rectangle), filled in reading order, with
 *   dashed red holes where tiles are missing, a row of tiles left over, and labels on the sides,
 *   in the middle and under it: a perfect square as a square of tiles.
 * - `gridDistance`: two points on a square grid joined by a segment, with the horizontal and
 *   vertical legs of the right triangle under it, for the distance between the points.
 * - `tag`: a label (TeX) at a point.
 *
 * Number lines and factor trees come from `src/video/numbers.ts`, triangles and the squares on
 * their sides from `src/video/triangles.ts`, and prime factors in rings from `chips`
 * (`src/content/math6/videos/lib/m6-3-figures.ts`).
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * Tiles in a square `cols` wide and `rows` tall (a square unless `rows` is set), each `size`
 * units, with the bottom left corner at `at`. The first `filled` tiles (all of them by default)
 * are shaded, in reading order from the top left; the places left empty are dashed red holes.
 * `extra` tiles left over sit in a red row just under the square.
 *
 * Labels: `left` up the left side (orange), `bottom` along the bottom (blue), `area` in the middle
 * and `caption` under it all (with its top at `captionY`, when set).
 *
 * Parts: `tiles` (a group: the shaded tiles and the outline), `holes` (a group), `extra` (a group),
 * `left`, `bottom`, `area` and `caption`.
 */
export function tileSquare(o: {
  name?: string;
  cols: number;
  rows?: number;
  filled?: number;
  extra?: number;
  size?: number;
  at?: P;
  tone?: DiagramTone;
  labels?: { left?: string; bottom?: string; area?: string; caption?: string };
  /** The height of the caption's top, to line up the captions of figures side by side. */
  captionY?: number;
}): Part {
  const n = namer(o.name);
  const cols = o.cols;
  const rows = o.rows ?? cols;
  const s = o.size ?? 1;
  const [x0, y0] = o.at ?? [0, 0];
  const total = cols * rows;
  const filled = Math.min(o.filled ?? total, total);
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const top = y0 + rows * s;
  const cell = (key: string, xa: number, ya: number): string[] => {
    const ids = ([[xa, ya], [xa + s, ya], [xa + s, ya + s], [xa, ya + s]] as P[]).map((p, j) => {
      points[n(`${key}-${j}`)] = p;
      return n(`${key}-${j}`);
    });
    return ids;
  };
  for (let i = 0; i < total; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const ids = cell(`c${i}`, x0 + c * s, top - (r + 1) * s);
    if (i < filled) {
      items.push(
        { kind: 'region', id: n(`t${i}`), points: ids, tone, shade: 0.4, group: n('tiles') },
        { kind: 'curve', id: n(`e${i}`), points: ids, closed: true, tone, weight: 1.5, group: n('tiles') },
      );
    } else {
      items.push(
        { kind: 'region', id: n(`hf${i}`), points: ids, tone: 'bad', shade: 0.08, group: n('holes') },
        { kind: 'curve', id: n(`h${i}`), points: ids, closed: true, tone: 'bad', weight: 1.5, dashed: true, group: n('holes') },
      );
    }
  }
  Object.assign(points, { [n('A')]: [x0, y0], [n('B')]: [x0 + cols * s, y0], [n('C')]: [x0 + cols * s, top], [n('D')]: [x0, top] });
  if (filled === total) items.push({ kind: 'curve', id: n('outline'), points: ['A', 'B', 'C', 'D'].map(n), closed: true, tone, weight: 3, group: n('tiles') });
  let bottom = y0;
  for (let k = 0; k < (o.extra ?? 0); k++) {
    const ids = cell(`x${k}`, x0 + k * s, y0 - 0.35 * s - s);
    items.push(
      { kind: 'region', id: n(`xt${k}`), points: ids, tone: 'bad', shade: 0.45, group: n('extra') },
      { kind: 'curve', id: n(`xe${k}`), points: ids, closed: true, tone: 'bad', weight: 2, group: n('extra') },
    );
    bottom = y0 - 1.35 * s;
  }
  const L = o.labels ?? {};
  if (L.left) items.push({ kind: 'line', id: n('left'), from: n('A'), to: n('D'), tone: 'opp', weight: 4, label: L.left, labelSide: 'left' });
  if (L.bottom) items.push({ kind: 'line', id: n('bottom'), from: n('A'), to: n('B'), tone: 'adj', weight: 4, label: L.bottom, labelSide: 'right' });
  if (L.area) {
    points[n('mid')] = [x0 + (cols * s) / 2, y0 + (rows * s) / 2];
    items.push({ kind: 'label', id: n('area'), at: n('mid'), tex: L.area, place: 'center', tone: 'ink' });
  }
  if (L.caption) {
    points[n('cap')] = [x0 + (cols * s) / 2, o.captionY ?? bottom - (L.bottom ? Math.max(0.9 * s, 0.16 * rows * s) : 0.15 * s)];
    items.push({ kind: 'label', id: n('caption'), at: n('cap'), tex: L.caption, place: 'below', tone: 'ink' });
  }
  return { points, items };
}

/** The side of the line from `p` to `q`, looking along it, away from `r`. */
function outside(p: P, q: P, r: P): 'left' | 'right' {
  const d = [q[0] - p[0], q[1] - p[1]];
  const w = [r[0] - p[0], r[1] - p[1]];
  return d[0] * w[1] - d[1] * w[0] > 0 ? 'right' : 'left';
}

/**
 * A square grid `cols` by `rows` with points `A` and `B` (grid coordinates), the segment between
 * them (pink), and the right triangle under it: the corner `C` (straight across from `A` and
 * straight below or above `B` unless set), a dashed leg from `A` to `C` and a dashed leg from `C`
 * to `B` (blue across, orange up or down), and a right-angle mark at `C`. Each label sits outside
 * the triangle.
 *
 * Parts: `grid` (a group: the lines), `A` and `B` (the points and their names), `leg1` (A to C),
 * `leg2` (C to B), `ab`, and `right`.
 */
export function gridDistance(o: { name?: string; cols: number; rows: number; A: P; B: P; C?: P; names?: [string, string]; labels?: { leg1?: string; leg2?: string; ab?: string }; places?: [Place, Place] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i <= o.cols; i++) {
    Object.assign(points, { [n(`v${i}a`)]: [i, 0], [n(`v${i}b`)]: [i, o.rows] });
    const edge = i === 0 || i === o.cols;
    items.push({ kind: 'line', id: n(`v${i}`), from: n(`v${i}a`), to: n(`v${i}b`), tone: 'muted', weight: edge ? 2 : 1.2, group: n('grid') });
  }
  for (let j = 0; j <= o.rows; j++) {
    Object.assign(points, { [n(`h${j}a`)]: [0, j], [n(`h${j}b`)]: [o.cols, j] });
    const edge = j === 0 || j === o.rows;
    items.push({ kind: 'line', id: n(`h${j}`), from: n(`h${j}a`), to: n(`h${j}b`), tone: 'muted', weight: edge ? 2 : 1.2, group: n('grid') });
  }
  const [A, B] = [o.A, o.B];
  const C: P = o.C ?? [B[0], A[1]];
  Object.assign(points, { [n('pA')]: A, [n('pB')]: B, [n('pC')]: C });
  const L = o.labels ?? {};
  const names = o.names ?? ['A', 'B'];
  const across = (p: P, q: P): DiagramTone => (p[1] === q[1] ? 'adj' : 'opp');
  items.push(
    { kind: 'line', id: n('leg1'), from: n('pA'), to: n('pC'), tone: across(A, C), dashed: true, weight: 4, ...(L.leg1 ? { label: L.leg1, labelSide: outside(A, C, B) } : {}) },
    { kind: 'line', id: n('leg2'), from: n('pC'), to: n('pB'), tone: across(C, B), dashed: true, weight: 4, ...(L.leg2 ? { label: L.leg2, labelSide: outside(C, B, A) } : {}) },
    { kind: 'right', id: n('right'), at: n('pC'), from: n('pA'), to: n('pB') },
    { kind: 'line', id: n('ab'), from: n('pA'), to: n('pB'), tone: 'hyp', weight: 5, ...(L.ab ? { label: L.ab, labelSide: outside(A, B, C) } : {}) },
    { kind: 'label', id: n('A'), at: n('pA'), tex: names[0], tone: 'theta', place: o.places?.[0] ?? 'below left', dot: true },
    { kind: 'label', id: n('B'), at: n('pB'), tex: names[1], tone: 'theta', place: o.places?.[1] ?? 'above left', dot: true },
  );
  return { points, items };
}
