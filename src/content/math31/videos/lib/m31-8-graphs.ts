/**
 * Graph helpers for the calculus videos on antiderivatives and integrals (and, through
 * `m31-7-figures.ts` and `m31-9-figures.ts`, the optimization, related rates and area and volume
 * videos), built only from the standard graph parts in `src/video/graph.ts`, so they go into a
 * diagram with `figure`.
 *
 * Like the polynomial and exponential videos (`../../math30-2/videos/lib/m302-5-graphs.ts`, whose
 * helpers are re-exported here), graphs are drawn with `every: 0` and numbered along the bottom
 * and left edges, clear of every curve and shaded area. These add:
 *
 * - `area`: the region between two graphs (or a graph and the x-axis), shaded.
 * - `rects`: the rectangles of a left, right or midpoint Riemann sum, each with its sample point
 *   and, optionally, its height written inside it.
 * - `strip`: one thin rectangle from a lower graph up to an upper one (a slice of an area).
 * - `path`: a curve through points of the plane that is not y = f(x) (x = y², an ellipse).
 * - `tangent`: a short tangent segment, to compare slopes.
 * - `rect`: a rectangle on the plane, outlined, shaded or both.
 */
import { dots, plane, plot, type Plane } from '@/video/graph.ts';
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

export { band, edgeNumbers, guide, hline, join, numbers, numTex, range, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';
export { dots, plane, plot };

type P = [number, number];
type F = (x: number) => number;

/** Names the plane's axes (TeX), in place of x and y at their ends: `named(plane({…}), 't', 's')`. */
export function named<T extends Plane>(g: T, x?: string, y?: string): T {
  for (const item of g.items) {
    if (item.kind !== 'label') continue;
    if (x && item.id === g.n('x-name')) item.tex = x;
    if (y && item.id === g.n('y-name')) item.tex = y;
  }
  return g;
}

/** A number as TeX with a comma in the thousands (45{,}000), as in the lessons. */
export const commas = (v: number): string => String(Number(v.toFixed(6))).replace(/\B(?=(\d{3})+(?!\d))/g, '{,}');

/** The ids of parts `id0`, `id1`… of the diagram `d`, to show several at once: `each('d', 'L', 4)`. */
export const each = (d: string, id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${d}.${id}${i}`);

/**
 * The region between the graph of `f` and the graph of `lower` (the x-axis by default) from x =
 * `from` to x = `to`, shaded: the part `id`.
 */
export function area(g: Plane, o: { id: string; f: F; lower?: F; from: number; to: number; tone?: DiagramTone; shade?: number; samples?: number; group?: string }): Part {
  const n = o.samples ?? 64;
  const lower = o.lower ?? (() => 0);
  const points: Record<string, P> = {};
  const names: string[] = [];
  const x = (i: number) => o.from + ((o.to - o.from) * i) / n;
  for (let i = 0; i <= n; i++) {
    const name = g.n(`${o.id}-u${i}`);
    points[name] = g.map(x(i), o.f(x(i)));
    names.push(name);
  }
  for (let i = n; i >= 0; i--) {
    const name = g.n(`${o.id}-l${i}`);
    points[name] = g.map(x(i), lower(x(i)));
    names.push(name);
  }
  return { points, items: [{ kind: 'region', id: g.n(o.id), points: names, tone: o.tone ?? 'brand', shade: o.shade ?? 0.3, ...(o.group ? { group: g.n(o.group) } : {}) }] };
}

/**
 * The `n` rectangles of a Riemann sum for `f` on [`a`, `b`], each as tall as `f` at its left end,
 * right end or middle (`rule`). Rectangle `i` is the group `id<i>`: its shading, its outline, its
 * sample point (a dot on the curve) and its height (TeX, from `heights`, written inside it).
 */
export function rects(g: Plane, o: { id: string; f: F; a: number; b: number; n: number; rule: 'left' | 'right' | 'mid'; tone?: DiagramTone; heights?: string[]; noDots?: boolean; shade?: number }): Part {
  const w = (o.b - o.a) / o.n;
  const tone = o.tone ?? 'theta';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.n; i++) {
    const x0 = o.a + i * w;
    const x1 = x0 + w;
    const xs = o.rule === 'left' ? x0 : o.rule === 'right' ? x1 : (x0 + x1) / 2;
    const h = o.f(xs);
    const key = g.n(`${o.id}${i}`);
    const corners = ['a', 'b', 'c', 'd'].map((c) => `${key}-${c}`);
    Object.assign(points, { [corners[0]]: g.map(x0, 0), [corners[1]]: g.map(x1, 0), [corners[2]]: g.map(x1, h), [corners[3]]: g.map(x0, h) });
    items.push(
      { kind: 'region', id: `${key}-fill`, points: corners, tone, shade: o.shade ?? 0.22, group: key },
      { kind: 'curve', id: `${key}-edge`, points: corners, closed: true, tone, weight: 2.5, group: key },
    );
    if (!o.noDots) {
      points[`${key}-s`] = g.map(xs, h);
      items.push({ kind: 'label', id: `${key}-pt`, at: `${key}-s`, tex: '', tone, dot: true, group: key });
    }
    if (o.heights?.[i]) {
      points[`${key}-m`] = g.map((x0 + x1) / 2, h / 2);
      items.push({ kind: 'label', id: `${key}-h`, at: `${key}-m`, tex: o.heights[i], tone: 'ink', place: 'center', group: key });
    }
  }
  return { points, items };
}

/**
 * A thin rectangle at `x`, `w` wide, from the graph of `bottom` (the x-axis by default) up to the
 * graph of `top`: the part `id` (a group: its shading and outline), with an optional `label` (TeX)
 * beside it, on the right unless `side` says otherwise.
 */
export function strip(g: Plane, o: { id: string; x: number; w: number; top: F; bottom?: F; tone?: DiagramTone; label?: string; side?: 'left' | 'right'; labelY?: number }): Part {
  const bottom = o.bottom ?? (() => 0);
  const tone = o.tone ?? 'theta';
  const mid = o.x + o.w / 2;
  const [y0, y1] = [bottom(mid), o.top(mid)];
  const key = g.n(o.id);
  const corners = ['a', 'b', 'c', 'd'].map((c) => `${key}-${c}`);
  const points: Record<string, P> = { [corners[0]]: g.map(o.x, y0), [corners[1]]: g.map(o.x + o.w, y0), [corners[2]]: g.map(o.x + o.w, y1), [corners[3]]: g.map(o.x, y1) };
  const items: DiagramItem[] = [
    { kind: 'region', id: `${key}-fill`, points: corners, tone, shade: 0.45, group: key },
    { kind: 'curve', id: `${key}-edge`, points: corners, closed: true, tone, weight: 2.5, group: key },
  ];
  if (o.label) {
    const right = (o.side ?? 'right') === 'right';
    points[`${key}-t`] = g.map(right ? o.x + o.w : o.x, o.labelY ?? (y0 + y1) / 2);
    items.push({ kind: 'label', id: `${key}-label`, at: `${key}-t`, tex: o.label, tone, place: right ? 'right' : 'left', group: key });
  }
  return { points, items };
}

/** A curve through points (x, y) of the plane, in order: the part `id`. */
export function path(g: Plane, o: { id: string; pts: P[]; tone?: DiagramTone; dashed?: boolean; closed?: boolean; weight?: number; group?: string; label?: string; labelAt?: number; side?: 'left' | 'right' }): Part {
  const points: Record<string, P> = {};
  const names = o.pts.map((p, i) => {
    const name = g.n(`${o.id}-q${i}`);
    points[name] = g.map(p[0], p[1]);
    return name;
  });
  return {
    points,
    items: [
      {
        kind: 'curve',
        id: g.n(o.id),
        points: names,
        tone: o.tone ?? 'brand',
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.closed ? { closed: true } : {}),
        ...(o.weight ? { weight: o.weight } : {}),
        ...(o.group ? { group: g.n(o.group) } : {}),
        ...(o.label ? { label: o.label, labelAt: o.labelAt ?? 0.85, labelSide: o.side ?? 'left' } : {}),
      },
    ],
  };
}

/** Points along x = h(y) for y from `from` to `to`: a curve given as x in terms of y, for `path`. */
export function sideways(h: F, from: number, to: number, n = 64): P[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const y = from + ((to - from) * i) / n;
    return [h(y), y] as P;
  });
}

/** A short tangent segment through (x, y) with slope `m`, `len` units long across: the part `id`. */
export function tangent(g: Plane, o: { id: string; x: number; y: number; m: number; len?: number; tone?: DiagramTone; group?: string }): Part {
  const d = (o.len ?? 1) / 2;
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  return {
    points: { [a]: g.map(o.x - d, o.y - o.m * d), [b]: g.map(o.x + d, o.y + o.m * d) },
    items: [{ kind: 'line', id: g.n(o.id), from: a, to: b, tone: o.tone ?? 'theta', weight: 4, ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/** A rectangle on the plane from (x0, y0) to (x1, y1), shaded and outlined (dashed with `dashed`): the part `id` (a group). */
export function rect(g: Plane, o: { id: string; x0: number; x1: number; y0: number; y1: number; tone?: DiagramTone; shade?: number; dashed?: boolean; outline?: boolean }): Part {
  const key = g.n(o.id);
  const corners = ['a', 'b', 'c', 'd'].map((c) => `${key}-${c}`);
  const tone = o.tone ?? 'theta';
  const points: Record<string, P> = { [corners[0]]: g.map(o.x0, o.y0), [corners[1]]: g.map(o.x1, o.y0), [corners[2]]: g.map(o.x1, o.y1), [corners[3]]: g.map(o.x0, o.y1) };
  const items: DiagramItem[] = [{ kind: 'region', id: `${key}-fill`, points: corners, tone, shade: o.shade ?? 0.2, group: key }];
  if (o.outline !== false) items.push({ kind: 'curve', id: `${key}-edge`, points: corners, closed: true, tone, weight: 2.5, ...(o.dashed ? { dashed: true } : {}), group: key });
  return { points, items };
}
