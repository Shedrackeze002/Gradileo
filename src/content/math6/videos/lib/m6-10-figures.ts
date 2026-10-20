/**
 * Helpers for the volume videos, built only from standard diagram parts (shaded regions, lines and
 * labels), so each goes into a diagram with `figure`:
 *
 * - `cubes`: unit cubes stacked in columns, drawn in an oblique view with their front, top and
 *   right faces shaded in three strengths of one colour, so they look solid. A full rectangular
 *   prism of cubes can be built layer by layer, and labelled with its length, width and height.
 * - `layerGrid`: one layer of cubes seen from above, as a grid of squares, numbered for counting.
 *
 * Lengths are blue and heights orange, as for the solids in `src/video/solids.ts`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The direction of depth: back and to the right, a little steeper than `box`, so the top faces show. */
const DEPTH: P = [0.45, 0.32];

/**
 * Unit cubes: `heights[r][c]` cubes stand in row `r` (0 is the front row; rows go back) and column
 * `c` (left to right). `at` is the front bottom left corner. Only the faces you can see are drawn
 * (a front face with no cube in front of it, a top face with no cube on it, a right face with no
 * cube beside it), so no face covers another.
 *
 * Groups, by `group`:
 * - `'all'` (the default): every face is in `cubes`.
 * - `'stack'`: the faces of column c's cubes are in `s<c>`.
 * - `'layer'`: the front and right faces of layer k (counting from 0 at the bottom) are in
 *   `layer<k>`, and the top faces of every cube in layer k in `top<k>`. To build a prism layer by
 *   layer, show `layer0` and `top0`, then hide `top0` and show `layer1` and `top1`, and so on.
 *
 * With `counts`, the number of cubes in each column of the front row is written under it (`n<c>`).
 * `labels` names the prism's length `l` (along the front bottom edge), width `w` (along the right
 * bottom edge, going back) and height `h` (up the left front edge).
 */
export function cubes(o: {
  name?: string;
  heights: number[][];
  at?: P;
  tone?: DiagramTone;
  group?: 'all' | 'stack' | 'layer';
  counts?: boolean;
  labels?: { l?: string; w?: string; h?: string };
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const tone = o.tone ?? 'adj';
  const H = o.heights;
  const rows = H.length;
  const cols = Math.max(...H.map((r) => r.length));
  const top = Math.max(...H.flat());
  const has = (r: number, c: number, l: number) => r >= 0 && r < rows && c >= 0 && c < (H[r]?.length ?? 0) && l >= 0 && l < H[r][c];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let k = 0;
  const face = (corners: P[], shade: number, group: string) => {
    const ids = corners.map((q, i) => {
      const id = n(`f${k}-${i}`);
      points[id] = q;
      return id;
    });
    items.push(
      { kind: 'region', id: n(`f${k}`), points: ids, tone, shade, group },
      { kind: 'curve', id: n(`f${k}-edge`), points: ids, closed: true, tone: 'ink', weight: 1.6, group },
    );
    k++;
  };
  const groupOf = (c: number, l: number, side: 'side' | 'top') => {
    if (o.group === 'stack') return n(`s${c}`);
    if (o.group === 'layer') return n(side === 'top' ? `top${l}` : `layer${l}`);
    return n('cubes');
  };
  // From the back row forward, left to right, bottom to top, so nearer faces come later.
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = 0; c < cols; c++) {
      for (let l = 0; l < (H[r][c] ?? 0); l++) {
        const x = x0 + c + r * DEPTH[0];
        const y = y0 + l + r * DEPTH[1];
        const [dx, dy] = DEPTH;
        if (!has(r - 1, c, l)) face([[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]], 0.5, groupOf(c, l, 'side'));
        if (!has(r, c + 1, l)) face([[x + 1, y], [x + 1 + dx, y + dy], [x + 1 + dx, y + 1 + dy], [x + 1, y + 1]], 0.25, groupOf(c, l, 'side'));
        if (o.group === 'layer') face([[x, y + 1], [x + 1, y + 1], [x + 1 + dx, y + 1 + dy], [x + dx, y + 1 + dy]], 0.8, groupOf(c, l, 'top'));
        else if (!has(r, c, l + 1)) {
          // A taller stack on the right hides the back right corner of this top face.
          const hidden = has(r, c + 1, l + 1);
          face(hidden ? [[x, y + 1], [x + 1, y + 1], [x + 1, y + 1 + dy], [x + dx, y + 1 + dy]] : [[x, y + 1], [x + 1, y + 1], [x + 1 + dx, y + 1 + dy], [x + dx, y + 1 + dy]], 0.8, groupOf(c, l, 'top'));
        }
      }
    }
  }
  if (o.counts) {
    H[0].forEach((h, c) => {
      points[n(`n${c}-at`)] = [x0 + c + 0.5, y0 - 0.15];
      items.push({ kind: 'label', id: n(`n${c}`), at: n(`n${c}-at`), tex: String(h), tone: 'theta', place: 'below' });
    });
  }
  const [dx, dy] = DEPTH;
  const line = (id: string, a: P, b: P, t: DiagramTone, label: string, side: 'left' | 'right') => {
    Object.assign(points, { [n(`${id}-a`)]: a, [n(`${id}-b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), tone: t, weight: 5, label, labelSide: side });
  };
  if (o.labels?.l) line('l', [x0, y0], [x0 + cols, y0], 'adj', o.labels.l, 'right');
  if (o.labels?.w) line('w', [x0 + cols, y0], [x0 + cols + rows * dx, y0 + rows * dy], 'adj', o.labels.w, 'right');
  if (o.labels?.h) line('h', [x0, y0], [x0, y0 + top], 'opp', o.labels.h, 'left');
  return { points, items };
}

/**
 * One layer of cubes seen from above: a grid `cols` squares across and `rows` deep, shaded, with
 * the squares numbered 1, 2, 3… row by row from the top left when `numbers` is set. `at` is the
 * bottom left corner.
 *
 * Parts: `grid` (a group: the shading and lines), `nums` (a group of the numbers, each `num<i>`),
 * and the side labels `across` (under the grid) and `deep` (to its left), if given.
 */
export function layerGrid(o: { name?: string; cols: number; rows: number; at?: P; tone?: DiagramTone; numbers?: boolean; labels?: { across?: string; deep?: string } }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {
    [n('A')]: [x0, y0],
    [n('B')]: [x0 + o.cols, y0],
    [n('C')]: [x0 + o.cols, y0 + o.rows],
    [n('D')]: [x0, y0 + o.rows],
  };
  const items: DiagramItem[] = [{ kind: 'region', id: n('fill'), points: ['A', 'B', 'C', 'D'].map(n), tone, shade: 0.55, group: n('grid') }];
  for (let i = 0; i <= o.cols; i++) {
    Object.assign(points, { [n(`v${i}a`)]: [x0 + i, y0], [n(`v${i}b`)]: [x0 + i, y0 + o.rows] });
    items.push({ kind: 'line', id: n(`v${i}`), from: n(`v${i}a`), to: n(`v${i}b`), tone: 'ink', weight: 2, group: n('grid') });
  }
  for (let j = 0; j <= o.rows; j++) {
    Object.assign(points, { [n(`h${j}a`)]: [x0, y0 + j], [n(`h${j}b`)]: [x0 + o.cols, y0 + j] });
    items.push({ kind: 'line', id: n(`h${j}`), from: n(`h${j}a`), to: n(`h${j}b`), tone: 'ink', weight: 2, group: n('grid') });
  }
  if (o.numbers) {
    let i = 0;
    for (let j = o.rows - 1; j >= 0; j--) {
      for (let c = 0; c < o.cols; c++, i++) {
        points[n(`num${i}-at`)] = [x0 + c + 0.5, y0 + j + 0.5];
        items.push({ kind: 'label', id: n(`num${i}`), at: n(`num${i}-at`), tex: String(i + 1), place: 'center', group: n('nums') });
      }
    }
  }
  if (o.labels?.across) items.push({ kind: 'line', id: n('across'), from: n('A'), to: n('B'), tone: 'adj', weight: 4, label: o.labels.across, labelSide: 'right' });
  if (o.labels?.deep) items.push({ kind: 'line', id: n('deep'), from: n('D'), to: n('A'), tone: 'adj', weight: 4, label: o.labels.deep, labelSide: 'right' });
  return { points, items };
}
