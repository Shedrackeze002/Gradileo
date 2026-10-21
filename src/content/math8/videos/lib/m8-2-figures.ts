/**
 * Figures for the percents videos (Grade 8, unit 2), built only from standard diagram parts
 * (lines, curves, shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `cellGrid`: a grid of squares (a hundred grid unless set) with shaded blocks given in grid
 *   squares, which can be parts of a square (half of one square is 0.5%), and thick dividers
 *   (to split the shaded part into equal blocks).
 * - `zoomCell`: one square of a grid drawn again, bigger, beside it, cut into equal strips with
 *   some shaded (a quarter of one square), joined to the square by dashed lines.
 * - `pieceBar`: a bar of pieces side by side, each as long as its value, with a value inside and a
 *   label under it; a piece can be shown as taken away (a discount). Brackets above the bar mark
 *   a run of pieces with a label.
 * - `link`: a dashed line joining a small piece to the same piece drawn bigger.
 * - `tag`: a label (TeX) at a point.
 *
 * Place value charts come from `placeChart` (`src/content/math5/videos/lib/m5-1-figures.ts`) and
 * number lines from `src/video/numbers.ts`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** The four corners of a rectangle added to `points` as `<key>-0` … `<key>-3`, in order round it. */
function corners(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  return ([[x0, y0], [x1, y0], [x1, y1], [x0, y1]] as P[]).map((p, i) => {
    points[`${key}-${i}`] = p;
    return `${key}-${i}`;
  });
}

/**
 * A grid `cols` squares wide and `rows` tall (10 by 10 unless set), each `size` units, with its
 * top left corner at `at`. Each block is shaded from column `c0` to `c1` and from row `r0` to `r1`
 * (counted in squares from the top left; 0.5 is half a square), and each divider is a thick line
 * from (`c0`, `r0`) to (`c1`, `r1`) in the same grid units. `label` is written under the grid.
 *
 * Parts: `lines` (a group: the lines between the squares), `frame` (a group: the outline), each
 * block and divider by its `id`, and `label`.
 */
export function cellGrid(o: {
  name?: string;
  cols?: number;
  rows?: number;
  size?: number;
  at?: P;
  blocks?: { id: string; c0: number; r0: number; c1: number; r1: number; tone?: DiagramTone; shade?: number }[];
  dividers?: { id: string; c0: number; r0: number; c1: number; r1: number; tone?: DiagramTone }[];
  label?: string;
  labelTone?: DiagramTone;
}): Part {
  const n = namer(o.name);
  const cols = o.cols ?? 10;
  const rows = o.rows ?? 10;
  const s = o.size ?? 1;
  const [x0, top] = o.at ?? [0, 0];
  const X = (c: number) => x0 + c * s;
  const Y = (r: number) => top - r * s;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const b of o.blocks ?? []) {
    const ids = corners(points, n(`${b.id}-c`), X(b.c0), Y(b.r1), X(b.c1), Y(b.r0));
    items.push({ kind: 'region', id: n(b.id), points: ids, tone: b.tone ?? 'adj', shade: b.shade ?? 0.6 });
  }
  for (let i = 1; i < cols; i++) {
    Object.assign(points, { [n(`x${i}a`)]: [X(i), Y(0)], [n(`x${i}b`)]: [X(i), Y(rows)] });
    items.push({ kind: 'line', id: n(`gx${i}`), from: n(`x${i}a`), to: n(`x${i}b`), tone: 'muted', weight: 1.3, group: n('lines') });
  }
  for (let j = 1; j < rows; j++) {
    Object.assign(points, { [n(`y${j}a`)]: [X(0), Y(j)], [n(`y${j}b`)]: [X(cols), Y(j)] });
    items.push({ kind: 'line', id: n(`gy${j}`), from: n(`y${j}a`), to: n(`y${j}b`), tone: 'muted', weight: 1.3, group: n('lines') });
  }
  const frame = corners(points, n('o'), X(0), Y(rows), X(cols), Y(0));
  items.push({ kind: 'curve', id: n('edge'), points: frame, closed: true, tone: 'ink', weight: 3, group: n('frame') });
  for (const d of o.dividers ?? []) {
    Object.assign(points, { [n(`${d.id}-a`)]: [X(d.c0), Y(d.r0)], [n(`${d.id}-b`)]: [X(d.c1), Y(d.r1)] });
    items.push({ kind: 'line', id: n(d.id), from: n(`${d.id}-a`), to: n(`${d.id}-b`), tone: d.tone ?? 'ink', weight: 4.5 });
  }
  if (o.label) {
    points[n('lab')] = [X(cols / 2), Y(rows) - 0.15 * s];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'below', tone: o.labelTone ?? 'ink' });
  }
  return { points, items };
}

/**
 * The square from `cell[0]`, `cell[1]` (its bottom left corner) to `cell[2]`, `cell[3]` (its top
 * right corner) drawn again as a big square `size` units wide with its bottom left corner at `at`,
 * cut into `pieces` equal upright strips, the first `shaded` of them shaded, and joined to the
 * small square by two dashed lines. `label` is written under the big square.
 *
 * Parts: `zoom` (a group: the big square, its cuts and the dashed lines), `zoom-shade` and
 * `zoom-label`.
 */
export function zoomCell(o: { name?: string; cell: [number, number, number, number]; at: P; size: number; pieces: number; shaded: number; tone?: DiagramTone; label?: string }): Part {
  const n = namer(o.name);
  const [cx0, cy0, cx1, cy1] = o.cell;
  const [zx, zy] = o.at;
  const Z = o.size;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  if (o.shaded > 0) {
    const ids = corners(points, n('zs'), zx, zy, zx + (Z * o.shaded) / o.pieces, zy + Z);
    items.push({ kind: 'region', id: n('zoom-shade'), points: ids, tone: o.tone ?? 'opp', shade: 0.7 });
  }
  const link = (id: string, a: P, b: P) => {
    Object.assign(points, { [n(`${id}-a`)]: a, [n(`${id}-b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), tone: 'muted', dashed: true, weight: 2, group: n('zoom') });
  };
  link('zl-top', [cx1, cy1], [zx, zy + Z]);
  link('zl-bottom', [cx1, cy0], [zx, zy]);
  for (let i = 1; i < o.pieces; i++) {
    Object.assign(points, { [n(`zc${i}a`)]: [zx + (i * Z) / o.pieces, zy], [n(`zc${i}b`)]: [zx + (i * Z) / o.pieces, zy + Z] });
    items.push({ kind: 'line', id: n(`zcut${i}`), from: n(`zc${i}a`), to: n(`zc${i}b`), tone: 'ink', weight: 2, group: n('zoom') });
  }
  const box = corners(points, n('zb'), zx, zy, zx + Z, zy + Z);
  items.push({ kind: 'curve', id: n('zoom-edge'), points: box, closed: true, tone: 'ink', weight: 3, group: n('zoom') });
  // The small square is outlined as well, so it is clear which square is drawn bigger.
  const small = corners(points, n('zsm'), cx0, cy0, cx1, cy1);
  items.push({ kind: 'curve', id: n('zoom-small'), points: small, closed: true, tone: 'theta', weight: 3, group: n('zoom') });
  if (o.label) {
    points[n('zlab')] = [zx + Z / 2, zy - 0.15];
    items.push({ kind: 'label', id: n('zoom-label'), at: n('zlab'), tex: o.label, place: 'below', tone: 'ink' });
  }
  return { points, items };
}

/**
 * A bar of pieces side by side from `at` (its bottom left corner), each `w` long and `height`
 * tall (1 unless set), shaded in its tone, with `tex` inside it and `below` under it. A `removed`
 * piece is drawn dashed in red, as taken away. `label` is written left of the bar. Each bracket
 * spans the pieces `from` to `to` (counted from 0) above the bar, with its `tex` above it.
 *
 * Parts: each piece `p<i>` (a group: its shading, outline and `tex`), its label under it
 * `below<i>`, `label`, and each bracket by its `id` (a group: the line, its ends and its label).
 */
export function pieceBar(o: {
  name?: string;
  at?: P;
  height?: number;
  pieces: { w: number; tex?: string; below?: string; tone?: DiagramTone; removed?: boolean }[];
  label?: string;
  brackets?: { id: string; from: number; to: number; tex: string; tone?: DiagramTone; lift?: number }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const H = o.height ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const edges = [x0];
  for (const p of o.pieces) edges.push(edges[edges.length - 1] + p.w);
  o.pieces.forEach((p, i) => {
    const g = n(`p${i}`);
    const ids = corners(points, n(`p${i}c`), edges[i], y0, edges[i + 1], y0 + H);
    const tone = p.removed ? 'bad' : (p.tone ?? 'brand');
    items.push(
      { kind: 'region', id: n(`p${i}-fill`), points: ids, tone, shade: p.removed ? 0.08 : 0.4, group: g },
      { kind: 'curve', id: n(`p${i}-edge`), points: ids, closed: true, tone: p.removed ? 'bad' : 'ink', weight: p.removed ? 2.5 : 2, dashed: p.removed, group: g },
    );
    if (p.tex) {
      points[n(`p${i}-mid`)] = [(edges[i] + edges[i + 1]) / 2, y0 + H / 2];
      items.push({ kind: 'label', id: n(`p${i}-tex`), at: n(`p${i}-mid`), tex: p.tex, place: 'center', tone: p.removed ? 'bad' : 'ink', group: g });
    }
    if (p.below) {
      points[n(`p${i}-under`)] = [(edges[i] + edges[i + 1]) / 2, y0 - 0.1];
      items.push({ kind: 'label', id: n(`below${i}`), at: n(`p${i}-under`), tex: p.below, place: 'below', tone: 'muted' });
    }
  });
  if (o.label) {
    points[n('lab')] = [x0 - 0.25, y0 + H / 2];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'left', tone: 'ink' });
  }
  for (const b of o.brackets ?? []) {
    const y = y0 + H + (b.lift ?? 0.35);
    const [xa, xb] = [edges[b.from] + 0.04, edges[b.to + 1] - 0.04];
    const tone = b.tone ?? 'theta';
    Object.assign(points, {
      [n(`${b.id}-a`)]: [xa, y],
      [n(`${b.id}-b`)]: [xb, y],
      [n(`${b.id}-a2`)]: [xa, y - 0.2],
      [n(`${b.id}-b2`)]: [xb, y - 0.2],
      [n(`${b.id}-m`)]: [(xa + xb) / 2, y],
    });
    items.push(
      { kind: 'line', id: n(`${b.id}-line`), from: n(`${b.id}-a`), to: n(`${b.id}-b`), tone, weight: 3, group: n(b.id) },
      { kind: 'line', id: n(`${b.id}-end0`), from: n(`${b.id}-a`), to: n(`${b.id}-a2`), tone, weight: 3, group: n(b.id) },
      { kind: 'line', id: n(`${b.id}-end1`), from: n(`${b.id}-b`), to: n(`${b.id}-b2`), tone, weight: 3, group: n(b.id) },
      { kind: 'label', id: n(`${b.id}-tex`), at: n(`${b.id}-m`), tex: b.tex, place: 'above', tone, group: n(b.id) },
    );
  }
  return { points, items };
}

/** A dashed grey line from `from` to `to`, to join a small piece to the same piece drawn bigger. Part: its `id`. */
export function link(id: string, from: P, to: P, o: { tone?: DiagramTone; group?: string } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: o.tone ?? 'muted', dashed: true, weight: 2, ...(o.group ? { group: o.group } : {}) }],
  };
}
