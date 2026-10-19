/**
 * Helpers for the coordinate-grid videos, built only from the standard diagram parts and the graph
 * parts in `src/video/graph.ts`, so each goes into a diagram with `figure`:
 *
 * - `grid`: a first-quadrant coordinate grid, numbered on its axes, with no x and y names (the
 *   lessons say "horizontal axis" and "vertical axis"), or with those words as its titles.
 * - `pt`: a point with its label.
 * - `move`: a dashed arrow from one point to another (across in blue, up or down in orange).
 * - `polygon`: a polygon's sides, one part each, and its shading.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import { dots, plane, type Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';
import { join, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';

export { join, tag };

type P = [number, number];

/**
 * A coordinate grid from 0 to `x` across and 0 to `y` up (10 by default), numbered on its axes. With
 * `titles`, the axes are named "horizontal axis" and "vertical axis".
 *
 * Parts: `grid`, `axes` (the axes, their numbers and titles), the axes alone `x-axis` and
 * `y-axis`, and `origin` (the 0 in the corner).
 */
export function grid(o: { name?: string; x?: number; y?: number; titles?: boolean } = {}): Plane {
  const g = plane({ name: o.name, x: [0, o.x ?? 10], y: [0, o.y ?? 10], ...(o.titles ? { titles: { x: '\\text{horizontal axis}', y: '\\text{vertical axis}' } } : {}) });
  const drop = new Set([g.n('x-name'), g.n('y-name')]);
  return { ...g, items: g.items.filter((it) => !drop.has(it.id)) };
}

/** A point at (x, y) with its label (TeX): the part `id`. */
export function pt(g: Plane, id: string, x: number, y: number, tex = '', place: Place = 'above right', tone: DiagramTone = 'theta', group?: string): Part {
  return dots(g, [{ id, x, y, tex, place, tone, group }]);
}

/**
 * A dashed arrow from `from` to `to` on the grid, with a label (TeX) beside its middle: on the left
 * of the arrow, looking along it, unless `side` says right. Across is blue and up or down orange,
 * unless `tone` says otherwise. The part `id`.
 */
export function move(g: Plane, id: string, from: P, to: P, o: { label?: string; side?: 'left' | 'right'; tone?: DiagramTone; group?: string; dashed?: boolean } = {}): Part {
  const [a, b] = [g.n(`${id}-a`), g.n(`${id}-b`)];
  const across = from[1] === to[1];
  const item: DiagramItem = {
    kind: 'line',
    id: g.n(id),
    from: a,
    to: b,
    tone: o.tone ?? (across ? 'adj' : 'opp'),
    dashed: o.dashed ?? true,
    weight: 3.5,
    arrow: true,
    ...(o.label ? { label: o.label, labelSide: o.side ?? 'left' } : {}),
    ...(o.group ? { group: g.n(o.group) } : {}),
  };
  return { points: { [a]: g.map(...from), [b]: g.map(...to) }, items: [item] };
}

/**
 * A polygon through `corners`, in order: each side is a part `id-s0`, `id-s1`… (from corner i to
 * corner i + 1, and the last back to the first unless `open`), all in the group `id`, and the
 * shading inside is the part `id-fill`.
 */
export function polygon(g: Plane, o: { id: string; corners: P[]; tone?: DiagramTone; open?: boolean; dashed?: boolean[]; shade?: number }): Part {
  const points: Record<string, P> = {};
  const names = o.corners.map((c, i) => {
    const name = g.n(`${o.id}-v${i}`);
    points[name] = g.map(...c);
    return name;
  });
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [{ kind: 'region', id: g.n(`${o.id}-fill`), points: names, tone, shade: o.shade ?? 0.18 }];
  const count = o.open ? names.length - 1 : names.length;
  for (let i = 0; i < count; i++) {
    items.push({ kind: 'line', id: g.n(`${o.id}-s${i}`), from: names[i], to: names[(i + 1) % names.length], tone, weight: 4, dashed: o.dashed?.[i], group: g.n(o.id) });
  }
  return { points, items };
}
