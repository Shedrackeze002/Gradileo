/**
 * Graph helpers for the calculus videos (limits, continuity, and the graphs in the precalculus
 * review), built only from the standard graph parts in `src/video/graph.ts` and the Math 30-1 and
 * 30-2 graph helpers, so each goes into a diagram with `figure`.
 *
 * Graphs are drawn with `every: 0` and numbered along the bottom and left edges of the grid
 * (`numbers`), so a curve that hugs an axis never runs through the numbers. A graph is drawn
 * piece by piece (`piece`, or `branches` between vertical asymptotes), with hollow and solid dots
 * where the pieces end (`hole`, `spot`), arrows beside a curve that show x closing in on a number
 * from one side (`approach`), dashed guides for reading a height off the graph (`guide`), and dashed
 * asymptotes (`vAsym`, `hAsym`) named by hand with `tag`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import { dots, plane, plot, type Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';
import { edgeNumbers, guide, join, numbers, panels, range, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';
import { branches, hAsym, vAsym } from '@/content/math30-1/videos/lib/m301-8-graphs.ts';

export { branches, dots, edgeNumbers, guide, hAsym, join, numbers, panels, plane, plot, range, tag, vAsym };

type P = [number, number];

/** One piece of a graph: `f` from x = `from` to x = `to`, drawn finely. The part `id`. */
export function piece(g: Plane, o: { id: string; f: (x: number) => number; from?: number; to?: number; tone?: DiagramTone; dashed?: boolean; samples?: number }): Part {
  return plot(g, { id: o.id, f: o.f, from: o.from, to: o.to, tone: o.tone ?? 'brand', dashed: o.dashed, samples: o.samples ?? 240 });
}

/** A hollow dot at (x, y), a point the graph comes close to but does not include, with an optional label: the part `id`. */
export function hole(g: Plane, id: string, x: number, y: number, o: { tex?: string; place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return dots(g, [{ id, x, y, open: true, tex: o.tex, place: o.place ?? 'above right', tone: o.tone ?? 'brand', group: o.group }]);
}

/** A solid dot at (x, y), a point on the graph, with an optional label: the part `id`. */
export function spot(g: Plane, id: string, x: number, y: number, o: { tex?: string; place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return dots(g, [{ id, x, y, tex: o.tex, place: o.place ?? 'above right', tone: o.tone ?? 'brand', group: o.group }]);
}

const OFFSET: Record<'above' | 'below' | 'left' | 'right', P> = { above: [0, 1], below: [0, -1], left: [-1, 0], right: [1, 0] };

/**
 * An arrow running beside the graph of `f` from x = `from` to x = `to`, a little to one `side` of
 * the curve, to show x closing in on a number from one side and the graph heading somewhere. The
 * arrowhead is at `to`. With a `label` (TeX), it sits at the start of the arrow, placed `place`.
 *
 * Parts: the group `id` (the arrow's body `id-body`, its head `id-head` and its label `id-label`).
 */
export function approach(g: Plane, o: { id: string; f: (x: number) => number; from: number; to: number; side?: 'above' | 'below' | 'left' | 'right'; gap?: number; tone?: DiagramTone; label?: string; place?: Place }): Part {
  const steps = 24;
  const raw: P[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = o.from + ((o.to - o.from) * i) / steps;
    raw.push(g.map(x, o.f(x)));
  }
  const width = g.map(g.x[1], 0)[0] - g.map(g.x[0], 0)[0];
  const gap = (o.gap ?? 0.035) * width;
  const dir = OFFSET[o.side ?? 'above'];
  // The normal at each point, turned to the chosen side once for the whole arrow, so it never flips.
  const normals = raw.map((_, i) => {
    const a = raw[Math.max(0, i - 1)];
    const b = raw[Math.min(steps, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [-(b[1] - a[1]) / len, (b[0] - a[0]) / len] as P;
  });
  const mean = normals.reduce((s, n) => s + n[0] * dir[0] + n[1] * dir[1], 0);
  const sign = mean >= 0 ? 1 : -1;
  const shifted = raw.map((p, i) => [p[0] + sign * gap * normals[i][0], p[1] + sign * gap * normals[i][1]] as P);
  const points: Record<string, P> = {};
  const names = shifted.map((p, i) => {
    const name = g.n(`${o.id}-q${i}`);
    points[name] = p;
    return name;
  });
  const group = g.n(o.id);
  const tone = o.tone ?? 'good';
  const items: DiagramItem[] = [
    { kind: 'curve', id: g.n(`${o.id}-body`), points: names.slice(0, steps), tone, weight: 3.5, group },
    { kind: 'line', id: g.n(`${o.id}-head`), from: names[steps - 1], to: names[steps], tone, weight: 3.5, arrow: true, group },
  ];
  if (o.label) items.push({ kind: 'label', id: g.n(`${o.id}-label`), at: names[0], tex: o.label, tone, place: o.place ?? 'above', group });
  return { points, items };
}

/**
 * A small plane for a row of graphs: `w` by `h` diagram units, its left edge at `left` and its
 * bottom edge at 0, so planes with different ranges line up side by side. Parts as for `plane`,
 * prefixed with `name`.
 */
export function panel(o: { name: string; x: [number, number]; y: [number, number]; left: number; w: number; h: number; xStep?: number; yStep?: number }): Plane {
  const [x0, x1] = o.x;
  const [y0, y1] = o.y;
  return plane({ name: o.name, x: o.x, y: o.y, xStep: o.xStep, yStep: o.yStep, every: 0, width: o.w, height: o.h, at: [o.left - (x0 * o.w) / (x1 - x0), -(y0 * o.h) / (y1 - y0)] });
}

/** A caption (TeX) centred under a plane, clear of its edge numbers: the part `id`. */
export function caption(g: Plane, id: string, tex: string, tone: DiagramTone = 'ink', drop = 0.22): Part {
  const [x0, x1] = g.x;
  const [y0, y1] = g.y;
  return tag(g, id, (x0 + x1) / 2, y0 - drop * (y1 - y0), tex, 'center', tone);
}

/** Moves every point of a part by (dx, dy), to set two figures side by side. */
export function shift(p: Part, dx: number, dy = 0): Part {
  return { points: Object.fromEntries(Object.entries(p.points).map(([k, [x, y]]) => [k, [x + dx, y + dy] as P])), items: p.items };
}

/** A straight line on the plane through (x1, y1) and (x2, y2), drawn from x = `from` to x = `to`: the part `id`. */
export function lineThrough(g: Plane, o: { id: string; a: P; b: P; from: number; to: number; tone?: DiagramTone; dashed?: boolean; weight?: number }): Part {
  const m = (o.b[1] - o.a[1]) / (o.b[0] - o.a[0]);
  const y = (x: number) => o.a[1] + m * (x - o.a[0]);
  return guide(g, o.id, [o.from, y(o.from)], [o.to, y(o.to)], o.tone ?? 'theta', { dashed: o.dashed ?? true, weight: o.weight ?? 3 });
}

/**
 * The unit-circle picture behind the limit of sin θ over θ: in a circle of radius 1, the triangle
 * inside the sector (height sin θ), the sector itself (angle θ), and the triangle that contains the
 * sector (height tan θ), for an angle `deg` in degrees. The circle is drawn `r` units across.
 *
 * Parts: `axes` (a group), `arc` (the quarter circle), `one` (the radius along the x-axis, labelled
 * 1), `rad` (the radius to P), `theta` (the angle), `inner`, `sector` and `outer` (shaded regions,
 * each with its outline in the same group), `sin` (the dashed height from P, labelled sin θ) and
 * `tan` (the side at A, labelled tan θ).
 */
export function sectorAreas(o: { name?: string; deg: number; r?: number }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const R = o.r ?? 5;
  const t = (o.deg * Math.PI) / 180;
  const P: P = [R * Math.cos(t), R * Math.sin(t)];
  const T: P = [R, R * Math.tan(t)];
  const points: Record<string, P> = {
    [n('O')]: [0, 0],
    [n('A')]: [R, 0],
    [n('P')]: P,
    [n('T')]: T,
    [n('F')]: [P[0], 0],
    [n('xr')]: [R + 1.1, 0],
    [n('yu')]: [0, R + 0.6],
  };
  const quarter: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const a = (i / 30) * (Math.PI / 2);
    points[n(`c${i}`)] = [R * Math.cos(a), R * Math.sin(a)];
    quarter.push(n(`c${i}`));
  }
  // The sector's boundary: the centre, then along the arc from A to P.
  const sector: string[] = [n('O')];
  const k = 24;
  for (let i = 0; i <= k; i++) {
    const a = (i / k) * t;
    points[n(`s${i}`)] = [R * Math.cos(a), R * Math.sin(a)];
    sector.push(n(`s${i}`));
  }
  const items: DiagramItem[] = [
    { kind: 'line', id: n('x-axis'), from: n('O'), to: n('xr'), tone: 'muted', weight: 2, arrow: true, group: n('axes') },
    { kind: 'line', id: n('y-axis'), from: n('O'), to: n('yu'), tone: 'muted', weight: 2, arrow: true, group: n('axes') },
    { kind: 'region', id: n('outer-fill'), points: [n('O'), n('A'), n('T')], tone: 'opp', shade: 0.16, group: n('outer') },
    { kind: 'line', id: n('outer-edge'), from: n('O'), to: n('T'), tone: 'opp', weight: 3, group: n('outer') },
    { kind: 'region', id: n('sector-fill'), points: sector, tone: 'brand', shade: 0.22, group: n('sector') },
    { kind: 'region', id: n('inner-fill'), points: [n('O'), n('A'), n('P')], tone: 'adj', shade: 0.3, group: n('inner') },
    { kind: 'line', id: n('inner-edge'), from: n('A'), to: n('P'), tone: 'adj', weight: 3, group: n('inner') },
    { kind: 'curve', id: n('arc'), points: quarter, tone: 'ink', weight: 3 },
    { kind: 'line', id: n('one'), from: n('O'), to: n('A'), tone: 'ink', weight: 3.5, label: '1', labelSide: 'right' },
    { kind: 'line', id: n('rad'), from: n('O'), to: n('P'), tone: 'ink', weight: 3.5 },
    { kind: 'angle', id: n('theta'), at: n('O'), from: n('A'), to: n('P'), tone: 'theta', label: '\\theta', r: 46 },
    { kind: 'line', id: n('sin'), from: n('P'), to: n('F'), tone: 'adj', dashed: true, weight: 3, label: '\\sin\\theta', labelSide: 'right' },
    { kind: 'line', id: n('tan'), from: n('A'), to: n('T'), tone: 'opp', weight: 4, label: '\\tan\\theta', labelSide: 'right' },
  ];
  return { points, items };
}
