/**
 * Helpers for the area videos, built only from standard diagram parts (lines, curves, shaded
 * regions and labels), so each goes into a diagram with `figure`:
 *
 * - `paper`: grid paper, a sheet of unit squares with no axes.
 * - `cells`: squares of the grid shaded one by one (whole squares), or cut in half along a slant
 *   (half squares), each a part, for counting.
 * - `counts`: a number in each of a list of squares, for counting them in order.
 * - `rect`: a rectangle drawn to scale, shaded, with its sides labelled (all four, or two).
 *
 * Every helper takes a `name`, which prefixes its part ids, so several fit in one figure.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

export { join, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Grid paper `cols` squares across and `rows` up, from `at` (its bottom left corner). The part `paper` (a group of its lines). */
export function paper(o: { name?: string; cols: number; rows: number; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i <= o.cols; i++) {
    Object.assign(points, { [n(`px${i}a`)]: [x0 + i, y0], [n(`px${i}b`)]: [x0 + i, y0 + o.rows] });
    items.push({ kind: 'line', id: n(`px${i}`), from: n(`px${i}a`), to: n(`px${i}b`), tone: 'muted', weight: 1.5, group: n('paper') });
  }
  for (let j = 0; j <= o.rows; j++) {
    Object.assign(points, { [n(`py${j}a`)]: [x0, y0 + j], [n(`py${j}b`)]: [x0 + o.cols, y0 + j] });
    items.push({ kind: 'line', id: n(`py${j}`), from: n(`py${j}a`), to: n(`py${j}b`), tone: 'muted', weight: 1.5, group: n('paper') });
  }
  return { points, items };
}

/**
 * Squares of the grid, each given by its bottom left corner, shaded in `tone`: a whole square, or
 * with `half` the half of it below and left of its slanted diagonal (from its top left corner to
 * its bottom right corner). Each square is a part `<id><k>`, all in the group `id`.
 */
export function cells(o: { name?: string; id: string; list: P[]; tone?: DiagramTone; half?: boolean; shade?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = o.list.map(([x, y], k) => {
    const corners: P[] = o.half ? [[x, y], [x + 1, y], [x, y + 1]] : [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]];
    const names = corners.map((c, i) => {
      const name = n(`${o.id}${k}-${i}`);
      points[name] = c;
      return name;
    });
    return { kind: 'region', id: n(`${o.id}${k}`), points: names, tone: o.tone ?? 'good', shade: o.shade ?? 0.45, group: n(o.id) } satisfies DiagramItem;
  });
  return { points, items };
}

/** A number in each square of `list` (by its bottom left corner), counting on from `start` (1 by default): parts `<id><k>` in the group `id`. */
export function counts(o: { name?: string; id: string; list: P[]; start?: number; tone?: DiagramTone; half?: boolean }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = o.list.map(([x, y], k) => {
    const at = n(`${o.id}${k}-at`);
    points[at] = o.half ? [x + 0.33, y + 0.33] : [x + 0.5, y + 0.5];
    return { kind: 'label', id: n(`${o.id}${k}`), at, tex: String((o.start ?? 1) + k), tone: o.tone ?? 'ink', place: 'center', group: n(o.id) } satisfies DiagramItem;
  });
  return { points, items };
}

/**
 * A rectangle `w` wide and `h` tall with its bottom left corner at `at`, shaded in `tone`, and its
 * sides labelled (TeX): `bottom`, `right`, `top` and `left`, each the part of that name (a line in
 * the side's colour, with its label outside the rectangle). Widths are blue and heights orange.
 *
 * Parts: `shape` (a group: the shading and the outline), `bottom`, `right`, `top`, `left`.
 */
export function rect(o: { name?: string; w: number; h: number; at?: P; tone?: DiagramTone; labels?: { bottom?: string; right?: string; top?: string; left?: string }; shade?: number }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('A')]: [x, y], [n('B')]: [x + o.w, y], [n('C')]: [x + o.w, y + o.h], [n('D')]: [x, y + o.h] };
  const corners = ['A', 'B', 'C', 'D'].map(n);
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: corners, tone, shade: o.shade ?? 0.18, group: n('shape') },
    { kind: 'curve', id: n('edge'), points: corners, closed: true, tone, weight: 3, group: n('shape') },
  ];
  // Each side from corner to corner, looking along it with the rectangle on the left, so its label goes on the right.
  const sides: [string, string, string, DiagramTone][] = [
    ['bottom', 'A', 'B', 'adj'],
    ['right', 'B', 'C', 'opp'],
    ['top', 'C', 'D', 'adj'],
    ['left', 'D', 'A', 'opp'],
  ];
  for (const [side, a, b, t] of sides) {
    const label = o.labels?.[side as 'bottom'];
    if (label) items.push({ kind: 'line', id: n(side), from: n(a), to: n(b), tone: t, weight: 4, label, labelSide: 'right' });
  }
  return { points, items };
}

/** A label (TeX) at a point of the figure, with no dot: the part `id`. */
export function note(id: string, at: P, tex: string, place: Place = 'center', tone: DiagramTone = 'ink', group?: string): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, tone, place, ...(group ? { group } : {}) }] };
}

/** A dashed line from `from` to `to` (a cut that splits a shape), with an optional label: the part `id`. */
export function cut(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; side?: 'left' | 'right' } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: o.tone ?? 'theta', dashed: true, weight: 3, ...(o.label ? { label: o.label, labelSide: o.side ?? 'left' } : {}) }],
  };
}
