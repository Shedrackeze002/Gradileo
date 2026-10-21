/**
 * Figures for the line symmetry and rotation symmetry videos, built only from standard diagram
 * parts (lines, curves, shaded regions and labels), so each goes into a diagram with `figure`.
 * Lines of symmetry are dashed green; a fold line that is not one is dashed red, as in the
 * symmetry videos of the younger grades.
 *
 * The filled shapes, fold lines, dots, captions, turn-by-turn strips and arrows come from the
 * Math 5 symmetry helpers (`m5-8-figures.ts`), used as they are. These add:
 *
 * - `design`: a design of several filled pieces, each in its own colour (a two-colour decal).
 * - `colourTurns`: a design turned through each angle in a list, side by side, over a dashed
 *   outline of where it started, so a turn that fits the shapes but not the colours shows up.
 * - point lists for the lessons' shapes: the rectangle `RECT`, the block letters `letterH` and
 *   `letterS`, a `petal`, a `flower` of petals, a hexagon `logo` and a scalene and isosceles
 *   triangle.
 * - `gridMirror`: a dashed line of symmetry across a coordinate plane (`plane` in graph.ts), and
 *   `gridSpan`: a measuring arrow on it.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import type { Plane } from '@/video/graph.ts';
import { arcArrow, axes, caption, curvedArrow, fold, join, mark, pinwheel, place, reflect, regular, regularAxes, shape, turn, turns, type P } from '@/content/math5/videos/lib/m5-8-figures.ts';

export { arcArrow, axes, caption, curvedArrow, fold, join, mark, pinwheel, place, reflect, regular, regularAxes, shape, turn, turns, type P };

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A rectangle 6 units long and 3.5 units tall, centred on the origin, as in the lesson. */
export const RECT: P[] = [
  [-3, -1.75],
  [3, -1.75],
  [3, 1.75],
  [-3, 1.75],
];

/** The lesson's block letter H, 4 units wide and 5 tall, centred on the origin. */
export const letterH = (): P[] =>
  (
    [
      [1.5, 1],
      [2.5, 1],
      [2.5, 3],
      [4.5, 3],
      [4.5, 1],
      [5.5, 1],
      [5.5, 6],
      [4.5, 6],
      [4.5, 4],
      [2.5, 4],
      [2.5, 6],
      [1.5, 6],
    ] as P[]
  ).map(([x, y]) => [x - 3.5, y - 3.5] as P);

/** The lesson's block letter S, 4 units wide and 5 tall, centred on the origin (a half turn fits it). */
export const letterS = (): P[] =>
  (
    [
      [1.5, 1],
      [5.5, 1],
      [5.5, 4],
      [2.5, 4],
      [2.5, 5],
      [5.5, 5],
      [5.5, 6],
      [1.5, 6],
      [1.5, 3],
      [4.5, 3],
      [4.5, 2],
      [1.5, 2],
    ] as P[]
  ).map(([x, y]) => [x - 3.5, y - 3.5] as P);

/**
 * A petal pointing in the direction `deg` from the centre `c`: a kite from 0.6 to 3.2 units out
 * and 1.3 units wide, as in the lesson's decals, scaled by `k`.
 */
export const petal = (deg: number, c: P = [0, 0], k = 1): P[] =>
  (
    [
      [0.6, 0],
      [1.9, 0.65],
      [3.2, 0],
      [1.9, -0.65],
    ] as P[]
  ).map(([x, y]) => turn([c[0] + k * x, c[1] + k * y], deg, c));

/**
 * `n` petals evenly spaced round `c`, the first pointing in the direction `start`, coloured in
 * turn from `tones`: the pieces of a `design`.
 */
export const flower = (o: { n: number; start?: number; tones: DiagramTone[]; c?: P; k?: number }): { pts: P[]; tone: DiagramTone }[] =>
  Array.from({ length: o.n }, (_, i) => ({ pts: petal((o.start ?? 90) + (360 * i) / o.n, o.c, o.k), tone: o.tones[i % o.tones.length] }));

/** The lesson's hexagon logo: a regular hexagon (radius `r`, a corner at the top) with a triangle joining every second corner. */
export const logo = (r = 1, toneHex: DiagramTone = 'brand', toneTri: DiagramTone = 'opp'): { pts: P[]; tone: DiagramTone }[] => {
  const hex = regular(6, r, 90);
  return [
    { pts: hex, tone: toneHex },
    { pts: [hex[0], hex[2], hex[4]], tone: toneTri },
  ];
};

/** An isosceles triangle 2.4 wide and 2.8 tall, its line of symmetry on x = 0. */
export const ISOSCELES: P[] = [
  [-1.2, -1.4],
  [1.2, -1.4],
  [0, 1.4],
];

/** A scalene triangle (sides of about 2.8, 3.1 and 2.6): no two sides equal. */
export const SCALENE: P[] = [
  [-1.4, -1.2],
  [1.4, -1.2],
  [-0.5, 1.2],
];

/**
 * A design of several filled pieces, each shaded and outlined in its own colour; with `dashed`,
 * only a dashed outline of every piece (in muted grey unless `tone` says).
 *
 * Parts: `<id>` (a group: every piece), with `id` "shape" unless set.
 */
export function design(o: { name?: string; id?: string; pieces: { pts: P[]; tone: DiagramTone }[]; shade?: number; dashed?: boolean; tone?: DiagramTone; weight?: number }): Part {
  const n = namer(o.name);
  const id = o.id ?? 'shape';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.pieces.forEach((piece, k) => {
    const names = piece.pts.map((p, i) => {
      points[n(`${id}${k}-${i}`)] = p;
      return n(`${id}${k}-${i}`);
    });
    const tone = o.dashed ? (o.tone ?? 'muted') : piece.tone;
    if (!o.dashed) items.push({ kind: 'region', id: n(`${id}${k}-fill`), points: names, tone, shade: o.shade ?? 0.4, group: n(id) });
    items.push({ kind: 'curve', id: n(`${id}${k}-edge`), points: names, closed: true, tone, weight: o.weight ?? (o.dashed ? 2 : 3), dashed: o.dashed, group: n(id) });
  });
  return { points, items };
}

/**
 * A design turned through each angle in `angles` (anticlockwise), side by side, `gap` apart: each
 * copy over a dashed outline of where the design started, with a dot at its centre, a yellow dot
 * at `marker` (turned with it) and a caption under it from `labels` (in the colour from `tones`).
 *
 * Parts: each copy `c<k>` (a group: its outline, design, dots and caption).
 */
export function colourTurns(o: { name?: string; pieces: { pts: P[]; tone: DiagramTone }[]; marker?: P; angles: number[]; labels: string[]; tones?: DiagramTone[]; gap?: number; low?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.angles.forEach((deg, k) => {
    const x = k * gap;
    const group = n(`c${k}`);
    const put = (part: Part) => {
      Object.assign(points, part.points);
      items.push(...part.items.map((it) => ({ ...it, group })));
    };
    put(design({ name: o.name, id: `start${k}`, pieces: o.pieces.map((pc) => ({ ...pc, pts: place(pc.pts, x, 0) })), dashed: true }));
    put(design({ name: o.name, id: `turned${k}`, pieces: o.pieces.map((pc) => ({ ...pc, pts: place(pc.pts.map((p) => turn(p, deg)), x, 0) })), shade: 0.45 }));
    put(mark({ name: o.name, id: `ctr${k}`, at: [x, 0], tone: 'ink' }));
    if (o.marker) {
      const [mx, my] = turn(o.marker, deg);
      put(mark({ name: o.name, id: `mk${k}`, at: [x + mx, my], tone: 'theta' }));
    }
    put(caption({ name: o.name, id: `cap${k}`, at: [x, -(o.low ?? 1.55)], tex: o.labels[k], tone: o.tones?.[k] ?? 'ink' }));
  });
  return { points, items };
}

/**
 * A dashed line of symmetry across a coordinate plane: the vertical line x = `x`, the horizontal
 * line y = `y`, or the slanted line y = x (`diag: 1`) or y = −x (`diag: -1`), from edge to edge,
 * with a label (TeX) at its end, or at `labelAt` (plane coordinates). Green unless `tone` says. Part: `<id>` (a group: the line and its label).
 */
export function gridMirror(g: Plane, o: { id: string; x?: number; y?: number; diag?: 1 | -1; label?: string; labelAt?: P; tone?: DiagramTone; place?: Place }): Part {
  const [x0, x1] = g.x;
  const [y0, y1] = g.y;
  let a: P;
  let b: P;
  if (o.x !== undefined) [a, b] = [[o.x, y0], [o.x, y1]];
  else if (o.y !== undefined) [a, b] = [[x0, o.y], [x1, o.y]];
  else {
    const s = o.diag ?? 1;
    const lo = Math.max(x0, s > 0 ? y0 : -y1);
    const hi = Math.min(x1, s > 0 ? y1 : -y0);
    [a, b] = [[lo, s * lo], [hi, s * hi]];
  }
  const id = g.n(o.id);
  const points: Record<string, P> = { [`${id}-a`]: g.map(...a), [`${id}-b`]: g.map(...b), [`${id}-at`]: g.map(...(o.labelAt ?? b)) };
  const tone = o.tone ?? 'good';
  const items: DiagramItem[] = [{ kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone, dashed: true, weight: 3, group: id }];
  if (o.label) items.push({ kind: 'label', id: `${id}-label`, at: `${id}-at`, tex: o.label, tone, place: o.place ?? 'above', group: id });
  return { points, items };
}

/**
 * A measuring arrow on a plane from `from` to `to` (plane coordinates), with a label (TeX) beside
 * its middle (or `labelAt`, 0 to 1 along it), on the `side` looking along it. Yellow unless `tone` says. Part: `<id>`.
 */
export function gridSpan(g: Plane, o: { id: string; from: P; to: P; label?: string; side?: 'left' | 'right'; labelAt?: number; tone?: DiagramTone; dashed?: boolean; arrow?: boolean; group?: string }): Part {
  const id = g.n(o.id);
  return {
    points: { [`${id}-a`]: g.map(...o.from), [`${id}-b`]: g.map(...o.to) },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        tone: o.tone ?? 'theta',
        weight: 3,
        arrow: o.arrow ?? true,
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.label ? { label: o.label, labelSide: o.side ?? 'left', ...(o.labelAt !== undefined ? { labelAt: o.labelAt } : {}) } : {}),
        ...(o.group ? { group: g.n(o.group) } : {}),
      },
    ],
  };
}

/** A label (TeX) with no dot at a point of the diagram. Part: `<id>`, in `group` if set. */
export function tag(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: Place; group?: string }): Part {
  const n = namer(o.name);
  return { points: { [n(`${o.id}-at`)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: n(o.group) } : {}) }] };
}
