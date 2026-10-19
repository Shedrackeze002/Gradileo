/**
 * Helpers for the derivative videos (rates of change, tangent lines and the derivative from first
 * principles), built only from the standard graph parts in `src/video/graph.ts`, so each goes into
 * a diagram with `figure`:
 *
 * - `slopeLine`: a straight line through a point with a given slope, cut off at the plane's edges
 *   (a diagram fits every point it holds, so a line must not run past the grid).
 * - `secant`: the secant line of a curve through the points at x = a and x = b.
 * - `tangent`: the tangent line of a curve at x = a, with its slope.
 * - `span`: a marked distance along the x-axis between two x-values (the step h), with its label.
 *
 * Graphs are drawn with `every: 0` and numbered along the bottom and left edges of the grid
 * (`numbers`, from the Math 30-2 polynomial videos), clear of every curve and line. The run and
 * rise of a secant line come from `riseRun` (the Math 30-3 linear-relations videos).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';
import { join, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';

export { dots, plane, plot } from '@/video/graph.ts';
export { band, guide, hline, join, numbers, panels, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';
export { riseRun } from '@/content/math30-3/videos/lib/m303-5-graphs.ts';

type P = [number, number];

/**
 * The straight line through `at` with slope `m`, from x = `from` to x = `to` (the plane's width by
 * default), cut off where it leaves the plane: the part `id`. Returns no line if none of it is
 * inside the plane.
 */
export function slopeLine(g: Plane, o: { id: string; at: P; m: number; from?: number; to?: number; tone?: DiagramTone; dashed?: boolean; weight?: number; group?: string }): Part {
  const [y0, y1] = g.y;
  let lo = Math.max(o.from ?? g.x[0], g.x[0]);
  let hi = Math.min(o.to ?? g.x[1], g.x[1]);
  const y = (x: number) => o.at[1] + o.m * (x - o.at[0]);
  if (Math.abs(o.m) > 1e-12) {
    // The x-values where the line meets the bottom and top of the plane.
    const xa = o.at[0] + (y0 - o.at[1]) / o.m;
    const xb = o.at[0] + (y1 - o.at[1]) / o.m;
    lo = Math.max(lo, Math.min(xa, xb));
    hi = Math.min(hi, Math.max(xa, xb));
  }
  if (hi <= lo) return { points: {}, items: [] };
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  const item: DiagramItem = {
    kind: 'line',
    id: g.n(o.id),
    from: a,
    to: b,
    tone: o.tone ?? 'theta',
    dashed: o.dashed,
    weight: o.weight ?? (o.dashed ? 3 : 3.5),
    ...(o.group ? { group: g.n(o.group) } : {}),
  };
  return { points: { [a]: g.map(lo, y(lo)), [b]: g.map(hi, y(hi)) }, items: [item] };
}

/**
 * The secant line of `f` through the points at x = `a` and x = `b`, drawn from `ext` before the
 * first point to `ext` after the second (across the whole plane when `ext` is left out): the part
 * `id`. Its slope is the average rate of change of `f` from a to b.
 */
export function secant(g: Plane, o: { id: string; f: (x: number) => number; a: number; b: number; ext?: number; tone?: DiagramTone; dashed?: boolean; weight?: number; group?: string }): Part {
  const m = (o.f(o.b) - o.f(o.a)) / (o.b - o.a);
  const [l, r] = [Math.min(o.a, o.b), Math.max(o.a, o.b)];
  return slopeLine(g, {
    id: o.id,
    at: [o.a, o.f(o.a)],
    m,
    ...(o.ext !== undefined ? { from: l - o.ext, to: r + o.ext } : {}),
    tone: o.tone ?? 'theta',
    dashed: o.dashed,
    weight: o.weight,
    group: o.group,
  });
}

/**
 * The tangent line of a curve at the point `at`, with slope `m`, drawn `ext` either side of the
 * point (across the whole plane when `ext` is left out): the part `id`.
 */
export function tangent(g: Plane, o: { id: string; at: P; m: number; ext?: number; tone?: DiagramTone; weight?: number; group?: string }): Part {
  return slopeLine(g, {
    id: o.id,
    at: o.at,
    m: o.m,
    ...(o.ext !== undefined ? { from: o.at[0] - o.ext, to: o.at[0] + o.ext } : {}),
    tone: o.tone ?? 'good',
    weight: o.weight ?? 4,
    group: o.group,
  });
}

/**
 * A distance along the plane at height `y`, from x = `from` to x = `to`: a line with an arrowhead
 * at each end (`id-l` and `id-r`, from the middle outwards), and its label (TeX) `place`d by the
 * middle (below by default). All in the group `id`.
 */
export function span(g: Plane, o: { id: string; from: number; to: number; y: number; label: string; tone?: DiagramTone; place?: 'above' | 'below' }): Part {
  const mid = (o.from + o.to) / 2;
  const tone = o.tone ?? 'adj';
  const [m, l, r] = [g.n(`${o.id}-m`), g.n(`${o.id}-l0`), g.n(`${o.id}-r0`)];
  const arrows: Part = {
    points: { [m]: g.map(mid, o.y), [l]: g.map(o.from, o.y), [r]: g.map(o.to, o.y) },
    items: [
      { kind: 'line', id: g.n(`${o.id}-l`), from: m, to: l, tone, weight: 2.5, arrow: true, group: g.n(o.id) },
      { kind: 'line', id: g.n(`${o.id}-r`), from: m, to: r, tone, weight: 2.5, arrow: true, group: g.n(o.id) },
    ],
  };
  return join([arrows, tag(g, `${o.id}-t`, mid, o.y, o.label, o.place ?? 'below', tone, o.id)]);
}
