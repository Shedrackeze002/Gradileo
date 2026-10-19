/**
 * Helpers for the videos on derivatives of the trigonometric, exponential and logarithmic
 * functions, implicit differentiation and higher derivatives (and, through `m31-6-graphs.ts`, the
 * applications of derivatives). Built only from the standard graph parts in `src/video/graph.ts`,
 * so each goes into a diagram with `figure`:
 *
 * - `tangent`: the tangent line of a curve at x = a (a short segment through the point, or the
 *   whole line), cut off at the edges of the plane, with its point of contact.
 * - `curve`: a curve given by x(t) and y(t), such as a circle or an ellipse, which `plot` cannot
 *   draw because it is not the graph of a function.
 *
 * Graphs are drawn with `every: 0` and numbered along the bottom and left edges of the grid
 * (`edgeNumbers`, from the Math 30-1 trigonometric graphs, numbers π axes by default), clear of
 * every curve and line. Labels placed by hand use `note`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

export { dots, plane, plot, piTex } from '@/video/graph.ts';
export { arrow, asymptotes, branches, edgeNumbers, hline, note, steps, vline } from '@/content/math30-1/videos/lib/m301-5-graphs.ts';
export { guide, join, range } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';

type P = [number, number];

/** A plain number as TeX, with a proper minus sign and no floating-point noise. */
export const num = (v: number) => String(Number(v.toFixed(6)));

/**
 * The tangent line at x = `a` through the point (`a`, `y`) with slope `m`, from `a - left` to
 * `a + right` (the whole width of the plane by default), cut off where it leaves the plane, drawn
 * on from left to right: the part `id`. With `dot`, the point of contact is the part `id-pt`,
 * labelled `dot` (TeX, '' for none) at `place`. With `label`, the line carries it `labelAt` of the
 * way along (0.85 by default), on its `side` (left, looking along the line from left to right).
 * Both parts are in the group `id-all`.
 */
export function tangent(
  g: Plane,
  o: { id: string; a: number; y: number; m: number; left?: number; right?: number; tone?: DiagramTone; dashed?: boolean; weight?: number; label?: string; labelAt?: number; side?: 'left' | 'right'; dot?: string; dotTone?: DiagramTone; place?: Place; group?: string },
): Part {
  const [y0, y1] = g.y;
  let lo = Math.max(o.left === undefined ? g.x[0] : o.a - o.left, g.x[0]);
  let hi = Math.min(o.right === undefined ? g.x[1] : o.a + o.right, g.x[1]);
  const line = (x: number) => o.y + o.m * (x - o.a);
  if (Math.abs(o.m) > 1e-12) {
    const xa = o.a + (y0 - o.y) / o.m;
    const xb = o.a + (y1 - o.y) / o.m;
    lo = Math.max(lo, Math.min(xa, xb));
    hi = Math.min(hi, Math.max(xa, xb));
  }
  const group = g.n(o.group ?? `${o.id}-all`);
  const [pa, pb, pc] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`), g.n(`${o.id}-pt`)];
  const points: Record<string, P> = { [pa]: g.map(lo, line(lo)), [pb]: g.map(hi, line(hi)) };
  const items: DiagramItem[] = [
    {
      kind: 'line',
      id: g.n(o.id),
      from: pa,
      to: pb,
      tone: o.tone ?? 'opp',
      dashed: o.dashed,
      weight: o.weight ?? 3,
      ...(o.label ? { label: o.label, labelAt: o.labelAt ?? 0.85, labelSide: o.side ?? ('left' as const) } : {}),
      group,
    },
  ];
  if (o.dot !== undefined) {
    points[pc] = g.map(o.a, o.y);
    items.push({ kind: 'label', id: pc, at: pc, tex: o.dot, tone: o.dotTone ?? 'theta', place: o.place ?? 'above left', dot: true, group });
  }
  return { points, items };
}

/**
 * The plane with its axes named `x` and `y` (TeX, such as `t` and `s\text{ (m)}`) at the ends of
 * the axes instead of "x" and "y", leaving the space under the axis numbers free.
 */
export function rename(g: Plane, x: string, y?: string): Plane {
  return {
    ...g,
    items: g.items.map((it) => (it.kind !== 'label' ? it : it.id === g.n('x-name') ? { ...it, tex: x } : it.id === g.n('y-name') && y ? { ...it, tex: y } : it)),
  };
}

/**
 * The curve (x(t), y(t)) on the plane for t from `from` to `to` (a circle, an ellipse), drawn on in
 * order and joined back to the start when `closed`: the part `id`. Every point must lie inside the
 * plane.
 */
export function curve(g: Plane, o: { id: string; x: (t: number) => number; y: (t: number) => number; from: number; to: number; samples?: number; closed?: boolean; tone?: DiagramTone; dashed?: boolean; weight?: number; group?: string }): Part {
  const n = o.samples ?? 160;
  const points: Record<string, P> = {};
  const names: string[] = [];
  for (let i = 0; i < (o.closed ? n : n + 1); i++) {
    const t = o.from + ((o.to - o.from) * i) / n;
    const name = g.n(`${o.id}-q${i}`);
    points[name] = g.map(o.x(t), o.y(t));
    names.push(name);
  }
  return {
    points,
    items: [{ kind: 'curve', id: g.n(o.id), points: names, closed: o.closed, tone: o.tone ?? 'brand', dashed: o.dashed, weight: o.weight ?? 3.5, ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}
