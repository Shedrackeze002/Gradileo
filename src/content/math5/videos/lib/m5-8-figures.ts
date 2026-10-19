/**
 * Figures for the symmetry videos, built only from standard diagram parts (labels, lines, curves
 * and shaded regions), so each goes into a diagram with `figure`. Lines of symmetry are dashed
 * green; a fold line that is not a line of symmetry is dashed red.
 *
 * - `shape`: a filled shape (one outline or several pieces) with its outline.
 * - `fold`: a dashed fold line from one point to another (green when it is a line of symmetry).
 * - `axes`: the lines of symmetry through a centre, at given directions.
 * - `turns`: a shape drawn again at each turn of a rotation, side by side, over a dashed outline
 *   of where it started, with a dot that shows how far it has turned.
 * - `mark`: a dot with a label (a centre, or a vertex name).
 * - `ticks`: equal-side marks across the middle of a side.
 * - point lists for the shapes in the lessons: `regular`, `heart`, `arrowSign`, `pinwheel`,
 *   `starPoints`, `ellipsePoints`, and `turn` and `reflect` to move them.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

export type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (deg: number) => (deg * Math.PI) / 180;

/** `p` turned `deg` anticlockwise about `c`. */
export const turn = (p: P, deg: number, c: P = [0, 0]): P => {
  const [x, y] = [p[0] - c[0], p[1] - c[1]];
  const a = rad(deg);
  return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
};

/** `p` reflected in the line through `a` and `b`. */
export const reflect = (p: P, a: P, b: P): P => {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const l = Math.hypot(dx, dy);
  const [ux, uy] = [dx / l, dy / l];
  const [px, py] = [p[0] - a[0], p[1] - a[1]];
  const k = px * ux + py * uy;
  return [a[0] + 2 * k * ux - px, a[1] + 2 * k * uy - py];
};

/** Moves points by (dx, dy) and scales them by `k` about the origin first. */
export const place = (pts: P[], dx: number, dy: number, k = 1): P[] => pts.map(([x, y]) => [x * k + dx, y * k + dy]);

/** The corners of a regular polygon with `n` sides, radius `r`, centre `c`, the first corner at `start` degrees. */
export const regular = (n: number, r = 1, start = 90, c: P = [0, 0]): P[] => Array.from({ length: n }, (_, i) => [c[0] + r * Math.cos(rad(start + (360 * i) / n)), c[1] + r * Math.sin(rad(start + (360 * i) / n))] as P);

/** A star with `n` points: outer radius `r`, inner radius `inner`, the first point at `start` degrees. */
export const starPoints = (n: number, r: number, inner: number, start = 90, c: P = [0, 0]): P[] =>
  Array.from({ length: 2 * n }, (_, i) => {
    const k = i % 2 === 0 ? r : inner;
    const a = rad(start + (180 * i) / n);
    return [c[0] + k * Math.cos(a), c[1] + k * Math.sin(a)] as P;
  });

/** An ellipse about `c` with half-widths `rx` and `ry`, tilted `tilt` degrees. */
export const ellipsePoints = (c: P, rx: number, ry: number, tilt = 0, steps = 40): P[] =>
  Array.from({ length: steps }, (_, i) => {
    const t = (2 * Math.PI * i) / steps;
    return turn([c[0] + rx * Math.cos(t), c[1] + ry * Math.sin(t)], tilt, c);
  });

/** A heart about 2 units wide, its centre line on x = 0, point at the bottom. */
export const heart = (): P[] =>
  Array.from({ length: 64 }, (_, i) => {
    const t = (2 * Math.PI * i) / 64;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [x / 16, (y + 2) / 16] as P;
  });

/** The arrow sign from the lessons, 2 units long, pointing right, centred on the origin. */
export const arrowSign = (): P[] => [
  [-1, -0.267],
  [0.2, -0.267],
  [0.2, -0.633],
  [1, 0],
  [0.2, 0.633],
  [0.2, 0.267],
  [-1, 0.267],
];

/** The four blades of a pinwheel about the origin, each a right triangle, `r` long. */
export const pinwheel = (r = 1): P[][] =>
  [0, 90, 180, 270].map((deg) =>
    (
      [
        [0, 0],
        [r, 0],
        [r, (2 * r) / 3],
      ] as P[]
    ).map((p) => turn(p, deg)),
  );

/**
 * A filled shape: each piece in `pieces` is shaded and outlined. With `dashed`, only a dashed
 * outline is drawn.
 *
 * Parts: `<id>` (a group: the fills and outlines), with `id` "shape" unless set.
 */
export function shape(o: { name?: string; id?: string; pieces: P[][]; tone?: DiagramTone; shade?: number; dashed?: boolean; weight?: number }): Part {
  const n = namer(o.name);
  const id = o.id ?? 'shape';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const tone = o.tone ?? 'brand';
  o.pieces.forEach((piece, k) => {
    const names = piece.map((p, i) => {
      points[n(`${id}${k}-${i}`)] = p;
      return n(`${id}${k}-${i}`);
    });
    if (!o.dashed) items.push({ kind: 'region', id: n(`${id}${k}-fill`), points: names, tone, shade: o.shade ?? 0.22, group: n(id) });
    items.push({ kind: 'curve', id: n(`${id}${k}-edge`), points: names, closed: true, tone, weight: o.weight ?? (o.dashed ? 2.5 : 3), dashed: o.dashed, group: n(id) });
  });
  return { points, items };
}

/** A dashed fold line from `a` to `b`: green when it is a line of symmetry, red when it is not (`ok: false`). Part: `<id>`. */
export function fold(o: { name?: string; id: string; a: P; b: P; ok?: boolean; group?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  return {
    points: { [n(`${o.id}-a`)]: o.a, [n(`${o.id}-b`)]: o.b },
    items: [{ kind: 'line', id: n(o.id), from: n(`${o.id}-a`), to: n(`${o.id}-b`), tone: o.tone ?? (o.ok === false ? 'bad' : 'good'), dashed: true, weight: 3, ...(o.group ? { group: n(o.group) } : {}) }],
  };
}

/**
 * Lines of symmetry through `c`, one at each direction in `angles` (degrees), each `r` long on
 * either side of the centre.
 *
 * Parts: each line `<id><k>` in the group `<id>` (the id is "l" unless set).
 */
export function axes(o: { name?: string; id?: string; c?: P; r: number; angles: number[] }): Part {
  const id = o.id ?? 'l';
  const c = o.c ?? [0, 0];
  const parts = o.angles.map((deg, k) => fold({ name: o.name, id: `${id}${k}`, a: [c[0] - o.r * Math.cos(rad(deg)), c[1] - o.r * Math.sin(rad(deg))], b: [c[0] + o.r * Math.cos(rad(deg)), c[1] + o.r * Math.sin(rad(deg))], group: id }));
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** The directions of the lines of symmetry of a regular polygon with `n` sides whose first corner is at `start` degrees. */
export const regularAxes = (n: number, start = 90): number[] => Array.from({ length: n }, (_, k) => start + (180 * k) / n);

/** A dot at `at`, with a label beside it (or none). Part: `<id>`. */
export function mark(o: { name?: string; id: string; at: P; tex?: string; place?: Place; tone?: DiagramTone; group?: string; dot?: boolean }): Part {
  const n = namer(o.name);
  return {
    points: { [n(`${o.id}-at`)]: o.at },
    items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex ?? '', place: o.place ?? 'above', tone: o.tone ?? 'ink', dot: o.dot ?? true, ...(o.group ? { group: n(o.group) } : {}) }],
  };
}

/** `count` short marks across the middle of the side from `a` to `b`, to show equal sides. Part: `<id>` (a group). */
export function ticks(o: { name?: string; id: string; a: P; b: P; count?: number; size?: number }): Part {
  const n = namer(o.name);
  const [dx, dy] = [o.b[0] - o.a[0], o.b[1] - o.a[1]];
  const l = Math.hypot(dx, dy);
  const [ux, uy] = [dx / l, dy / l];
  const s = o.size ?? 0.14;
  const m: P = [(o.a[0] + o.b[0]) / 2, (o.a[1] + o.b[1]) / 2];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const count = o.count ?? 1;
  for (let k = 0; k < count; k++) {
    const off = (k - (count - 1) / 2) * 0.1;
    const c: P = [m[0] + off * ux, m[1] + off * uy];
    points[n(`${o.id}${k}a`)] = [c[0] - s * uy, c[1] + s * ux];
    points[n(`${o.id}${k}b`)] = [c[0] + s * uy, c[1] - s * ux];
    items.push({ kind: 'line', id: n(`${o.id}${k}`), from: n(`${o.id}${k}a`), to: n(`${o.id}${k}b`), tone: 'ink', weight: 2.5, group: n(o.id) });
  }
  return { points, items };
}

/** A label (TeX) at a point, for a caption under a figure. Part: `<id>`. */
export function caption(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; group?: string }): Part {
  return mark({ ...o, place: 'center', dot: false });
}

/**
 * A shape turned through each angle in `angles`, side by side, `gap` apart from `x0`: each copy
 * over a dashed outline of where the shape started, with a yellow dot at `marker` (turned with
 * it), a dot at the centre, and a caption under it from `labels` (in the colour from `tones`).
 *
 * Parts: each copy `c<k>` (a group: its outline, shape, dots and caption).
 */
export function turns(o: { name?: string; pieces: P[][]; marker?: P; angles: number[]; labels: string[]; tones?: DiagramTone[]; gap?: number; low?: number; x0?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.angles.forEach((deg, k) => {
    const x = (o.x0 ?? 0) + k * gap;
    const group = `c${k}`;
    const put = (part: Part) => {
      Object.assign(points, part.points);
      items.push(...part.items.map((it) => ({ ...it, group: n(group) })));
    };
    put(shape({ name: o.name, id: `start${k}`, pieces: o.pieces.map((pc) => place(pc, x, 0)), tone: 'muted', dashed: true, weight: 2 }));
    put(shape({ name: o.name, id: `turned${k}`, pieces: o.pieces.map((pc) => place(pc.map((p) => turn(p, deg)), x, 0)), shade: 0.3 }));
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
 * A thick stroke from `a` to `b` (14 pixels unless `weight` says), for drawing letters (Z, N, T).
 * Part: `<id>`, in `group` if set.
 */
export function stroke(o: { name?: string; id: string; a: P; b: P; group?: string; tone?: DiagramTone; weight?: number }): Part {
  const n = namer(o.name);
  return {
    points: { [n(`${o.id}-a`)]: o.a, [n(`${o.id}-b`)]: o.b },
    items: [{ kind: 'line', id: n(o.id), from: n(`${o.id}-a`), to: n(`${o.id}-b`), tone: o.tone ?? 'ink', weight: o.weight ?? 14, ...(o.group ? { group: n(o.group) } : {}) }],
  };
}

/** Joins parts into one. */
export const join = (...parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

/**
 * A curved arrow from `a` to `b`, bulging `h` to its left (looking from `a` to `b`), for a fold
 * or a turn. Part: `<id>` (a group: the curve and its arrowhead).
 */
export function curvedArrow(o: { name?: string; id: string; a: P; b: P; h: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [dx, dy] = [o.b[0] - o.a[0], o.b[1] - o.a[1]];
  const l = Math.hypot(dx, dy);
  const nx = -dy / l;
  const ny = dx / l;
  const at = (t: number): P => [o.a[0] + dx * t + nx * o.h * 4 * t * (1 - t), o.a[1] + dy * t + ny * o.h * 4 * t * (1 - t)];
  const points: Record<string, P> = {};
  const names: string[] = [];
  for (let k = 0; k <= 20; k++) {
    points[n(`${o.id}${k}`)] = at((0.92 * k) / 20);
    names.push(n(`${o.id}${k}`));
  }
  points[n(`${o.id}-end`)] = o.b;
  const tone = o.tone ?? 'theta';
  return {
    points,
    items: [
      { kind: 'curve', id: n(`${o.id}-arc`), points: names, tone, weight: 3, group: n(o.id) },
      { kind: 'line', id: n(`${o.id}-head`), from: names[names.length - 1], to: n(`${o.id}-end`), tone, weight: 3, arrow: true, group: n(o.id) },
    ],
  };
}

/**
 * An arrow round a centre `c` at radius `r`, anticlockwise from `from` to `to` degrees, for a
 * turn. Part: `<id>` (a group: the arc and its arrowhead).
 */
export function arcArrow(o: { name?: string; id: string; c: P; r: number; from: number; to: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const names: string[] = [];
  const end = o.to - 4;
  for (let k = 0; k <= 30; k++) {
    const a = rad(o.from + ((end - o.from) * k) / 30);
    points[n(`${o.id}${k}`)] = [o.c[0] + o.r * Math.cos(a), o.c[1] + o.r * Math.sin(a)];
    names.push(n(`${o.id}${k}`));
  }
  points[n(`${o.id}-end`)] = [o.c[0] + o.r * Math.cos(rad(o.to)), o.c[1] + o.r * Math.sin(rad(o.to))];
  const tone = o.tone ?? 'theta';
  return {
    points,
    items: [
      { kind: 'curve', id: n(`${o.id}-arc`), points: names, tone, weight: 3, group: n(o.id) },
      { kind: 'line', id: n(`${o.id}-head`), from: names[names.length - 1], to: n(`${o.id}-end`), tone, weight: 3, arrow: true, group: n(o.id) },
    ],
  };
}
