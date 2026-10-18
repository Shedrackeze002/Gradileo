/**
 * Helpers for the polynomial videos (and, through `m302-6-graphs.ts`, the exponential and
 * logarithm videos) of this course, built only from the standard graph parts in
 * `src/video/graph.ts`, so they go into a diagram with `figure`.
 *
 * A curve often crosses an axis right where `plane` writes its numbers, so these graphs are drawn
 * with `every: 0` and numbered along the bottom and left edges of the grid instead (`numbers`),
 * clear of every curve. Labels that are not points (a curve's name, a caption, a quadrant number)
 * are placed by hand with `tag`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import { dots, plane, plot, type Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** Several parts as one. */
export const join = (parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

/** The numbers from `from` to `to` in steps of `step`, rounded so 0.1 steps read 0.3 and not 0.30000000000000004. */
export function range(from: number, to: number, step: number): number[] {
  const list: number[] = [];
  for (let k = Math.ceil(from / step - 1e-9); k * step <= to + 1e-9; k++) list.push(Number((k * step).toFixed(6)));
  return list;
}

/** A number as TeX, with a thin space in the thousands (12 000) as in the lessons. */
export const numTex = (v: number): string => {
  const s = String(Number(v.toFixed(6)));
  return /^-?\d{5,}/.test(s) ? s.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : s;
};

/**
 * Axis numbers along the plane's bottom edge (`xs`) and left edge (`ys`), in the plane's `axes`
 * group, so showing `d.axes` shows them. Parts: `ex0`, `ex1`… and `ey0`, `ey1`….
 */
export function edgeNumbers(g: Plane, o: { xs?: number[]; ys?: number[]; xTex?: (x: number) => string; yTex?: (y: number) => string }): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  (o.xs ?? []).forEach((x, i) => {
    const id = g.n(`ex${i}`);
    points[id] = g.map(x, g.y[0]);
    items.push({ kind: 'label', id, at: id, tex: (o.xTex ?? numTex)(x), tone: 'muted', place: 'below', group: g.n('axes') });
  });
  // A little left of the edge, so a curve that runs along the edge does not touch them.
  const dx = 0.015 * (g.map(g.x[1], 0)[0] - g.map(g.x[0], 0)[0]);
  (o.ys ?? []).forEach((y, j) => {
    const id = g.n(`ey${j}`);
    const [px, py] = g.map(g.x[0], y);
    points[id] = [px - dx, py];
    items.push({ kind: 'label', id, at: id, tex: (o.yTex ?? numTex)(y), tone: 'muted', place: 'left', group: g.n('axes') });
  });
  return { points, items };
}

/** Edge numbers every `xStep` across and every `yStep` up the plane (see `edgeNumbers`). */
export function numbers(g: Plane, xStep: number, yStep = xStep, o: { xTex?: (x: number) => string; yTex?: (y: number) => string } = {}): Part {
  return edgeNumbers(g, { xs: range(g.x[0], g.x[1], xStep), ys: range(g.y[0], g.y[1], yStep), ...o });
}

/** A label (TeX) with no dot at the plane's point (x, y): a curve's name, a caption. The part `id`. */
export function tag(g: Plane, id: string, x: number, y: number, tex: string, place: Place = 'center', tone: DiagramTone = 'ink', group?: string): Part {
  const at = g.n(`${id}-at`);
  return { points: { [at]: g.map(x, y) }, items: [{ kind: 'label', id: g.n(id), at, tex, tone, place, ...(group ? { group: g.n(group) } : {}) }] };
}

/** A dashed segment between two points of the plane (reading a value off a graph): the part `id`. */
export function guide(g: Plane, id: string, from: P, to: P, tone: DiagramTone = 'muted', o: { arrow?: boolean; group?: string; dashed?: boolean; weight?: number } = {}): Part {
  const [a, b] = [g.n(`${id}-a`), g.n(`${id}-b`)];
  return {
    points: { [a]: g.map(...from), [b]: g.map(...to) },
    items: [{ kind: 'line', id: g.n(id), from: a, to: b, tone, dashed: o.dashed ?? true, weight: o.weight ?? 2.5, ...(o.arrow ? { arrow: true } : {}), ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/**
 * Arrowheads on both ends of the graph of `f`, pointing out of the plane at x = `left` and x =
 * `right` (where the curve leaves the grid), to show that it goes on forever: the part `id` (a group
 * of `id-l` and `id-r`).
 */
export function ends(g: Plane, id: string, f: (x: number) => number, left: number, right: number, tone: DiagramTone = 'brand'): Part {
  const d = 0.035 * (g.x[1] - g.x[0]);
  return join([
    guide(g, `${id}-l`, [left + d, f(left + d)], [left, f(left)], tone, { arrow: true, dashed: false, weight: 3.5, group: id }),
    guide(g, `${id}-r`, [right - d, f(right - d)], [right, f(right)], tone, { arrow: true, dashed: false, weight: 3.5, group: id }),
  ]);
}

/** Where the graph of `f` leaves the plane on each side: the first and last x inside it (to put `ends` on). */
export function exits(g: Plane, f: (x: number) => number, steps = 2000): [number, number] {
  const inside = (x: number) => f(x) >= g.y[0] && f(x) <= g.y[1];
  const xs = Array.from({ length: steps + 1 }, (_, i) => g.x[0] + ((g.x[1] - g.x[0]) * i) / steps).filter(inside);
  return [xs[0], xs[xs.length - 1]];
}

/** A line across the whole plane at height `y` (a level to reach, a maximum, an asymptote): the part `id`. */
export function hline(g: Plane, id: string, y: number, tone: DiagramTone = 'opp', dashed = true): Part {
  return guide(g, id, [g.x[0], y], [g.x[1], y], tone, { dashed, weight: dashed ? 2.5 : 3 });
}

/** A shaded band from x = `from` to x = `to`, the full height of the plane (the range of the data): the part `id`. */
export function band(g: Plane, id: string, from: number, to: number, tone: DiagramTone = 'adj', shade = 0.14): Part {
  const names = [`${id}-p0`, `${id}-p1`, `${id}-p2`, `${id}-p3`].map(g.n);
  const corners: P[] = [g.map(from, g.y[0]), g.map(to, g.y[0]), g.map(to, g.y[1]), g.map(from, g.y[1])];
  return {
    points: Object.fromEntries(names.map((n, i) => [n, corners[i]])),
    items: [{ kind: 'region', id: g.n(id), points: names, tone, shade }],
  };
}

/** Data points: dots with no labels, all in the group `id` (`d0`, `d1`… inside it). */
export function scatter(g: Plane, id: string, pts: P[], tone: DiagramTone = 'theta'): Part {
  return dots(g, pts.map(([x, y], i) => ({ id: `${id}${i}`, x, y, tone, group: id })));
}

/** Muted quadrant numbers I to IV at (±x, ±y) of the plane, in the group `quads` (parts `QI`…`QIV`). */
export function quadrants(g: Plane, x: number, y: number): Part {
  const spots: Record<string, P> = { I: [x, y], II: [-x, y], III: [-x, -y], IV: [x, -y] };
  return join(Object.entries(spots).map(([q, [qx, qy]]) => tag(g, `Q${q}`, qx, qy, `\\text{${q}}`, 'center', 'muted', 'quads')));
}

/**
 * Small graphs side by side, each on its own plane `name` (at `gap` apart), with up to two lines of
 * caption under it. Parts for each: `<name>-grid`, `<name>-axes`, `<name>-curve` (or several curves
 * `<name>-<id>`), `<name>-pts` (data dots, if any), and the caption `<name>-text` (a group of its
 * lines `<name>-cap` and `<name>-sub`).
 */
export function panels(o: {
  x: [number, number];
  y: [number, number];
  size?: number;
  gap?: number;
  yStep?: number;
  list: { name: string; f?: (x: number) => number; tone?: DiagramTone; pts?: P[]; caption?: string; sub?: string; subTone?: DiagramTone; extra?: (g: Plane) => Part[] }[];
}): Part {
  const size = o.size ?? 4.4;
  const gap = o.gap ?? size + 1.6;
  const [x0, x1] = o.x;
  const [y0, y1] = o.y;
  const w = size;
  const h = size;
  return join(
    o.list.flatMap((p, i) => {
      const g = plane({ name: p.name, x: o.x, y: o.y, yStep: o.yStep, every: 0, width: w, height: h, at: [gap * i - (x0 * w) / (x1 - x0), -(y0 * h) / (y1 - y0)] });
      const left = g.map(x0, y0);
      const mid = gap * i + w / 2;
      const text: Part = {
        points: { [`${p.name}-k`]: [mid, left[1] - 0.55], [`${p.name}-s`]: [mid, left[1] - 1.35] },
        items: [
          ...(p.caption ? [{ kind: 'label', id: `${p.name}-cap`, at: `${p.name}-k`, tex: p.caption, place: 'center', group: `${p.name}-text` } satisfies DiagramItem] : []),
          ...(p.sub ? [{ kind: 'label', id: `${p.name}-sub`, at: `${p.name}-s`, tex: p.sub, tone: p.subTone ?? 'theta', place: 'center', group: `${p.name}-text` } satisfies DiagramItem] : []),
        ],
      };
      return [g, ...(p.f ? [plot(g, { id: 'curve', f: p.f, tone: p.tone ?? 'brand', samples: 200 })] : []), ...(p.pts ? [scatter(g, 'pts', p.pts)] : []), ...(p.extra ? p.extra(g) : []), text];
    }),
  );
}

/** The lesson's fuel test: speed (km/h) against fuel use (L/100 km), and its quadratic regression. */
export const fuelData: P[] = [[40, 7.52], [50, 6.55], [60, 6.35], [70, 5.97], [80, 6.3], [90, 6.51], [100, 7.45], [110, 8.57], [120, 9.7]];
export const fuelModel = (x: number) => 0.0015 * x * x - 0.21 * x + 13.4;

/** The lesson's game: active players (thousands) x months after launch, and its cubic regression. */
export const playersData: P[] = [[0, 3.8], [2, 21.88], [4, 34.74], [6, 35.46], [8, 36.42], [10, 31.6], [12, 32.88], [14, 37.34], [16, 46.16], [18, 69.42]];
export const playersModel = (x: number) => 0.06 * x ** 3 - 1.6 * x * x + 13 * x + 3;
