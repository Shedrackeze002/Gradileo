/**
 * Figures for the circles and area videos, built only from standard diagram parts (lines, curves,
 * shaded regions, angles and labels), so each goes into a diagram with `figure`. Parallelograms,
 * triangles and heights come from the Math 6 helpers (`m6-9-figures.ts`). This adds:
 *
 * - `disc`: a circle with its centre, a radius, a diameter and any number of radii (for central
 *   angles), each labelled if asked.
 * - `unroll`: a circle with a string wrapped once around it, laid out flat beneath it, and the
 *   diameter marked off along the string three times, with a little left over.
 * - `slices`: a circle cut into equal sectors, the top half one colour and the bottom half
 *   another, and `rearranged`: the same sectors laid side by side, pointing up and down in turn,
 *   making a shape close to a parallelogram with base πr and height r.
 * - `windowShape`: a rectangle with a half circle on top.
 * - `ring`: a circle (a pool) with a ring around it (a deck).
 *
 * Radii are blue and diameters pink, the circumference yellow and heights orange, in every video.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (deg: number) => (deg * Math.PI) / 180;
const toward = (c: P, deg: number, len: number): P => [c[0] + len * Math.cos(rad(deg)), c[1] + len * Math.sin(rad(deg))];

/** Points round a circle (or an arc from `from` to `to` degrees), added to `points` as `<key><i>`. */
function arcPoints(points: Record<string, P>, key: string, c: P, r: number, from = 0, to = 360, steps = 96): string[] {
  const names: string[] = [];
  const full = to - from >= 360;
  const count = full ? steps : steps + 1;
  for (let i = 0; i < count; i++) {
    const a = from + ((to - from) * i) / steps;
    points[`${key}${i}`] = toward(c, a, r);
    names.push(`${key}${i}`);
  }
  return names;
}

/**
 * A circle of radius `r` about `at` (the origin by default). `rAt` is the direction of the
 * radius (degrees, anticlockwise from the right) and `dAt` of the diameter; `rays` are more radii,
 * and `angles` the central angles between two of them (indices into `rays`), each labelled.
 *
 * Parts: `shape` (a group: `fill` and `outline`, labelled `labels.c`), `centre` (a dot, with
 * `labels.centre` beside it), `r` and `d` (drawn when labelled, or when `show` asks), the radii
 * `ray0`, `ray1`… (the group `rays`) and each angle by its id.
 */
export function disc(o: {
  name?: string;
  at?: P;
  r: number;
  rAt?: number;
  dAt?: number;
  tone?: DiagramTone;
  shade?: number;
  labels?: { r?: string; d?: string; c?: string; centre?: string };
  centrePlace?: Place;
  /** Which side of the radius its label goes, looking out from the centre ('left' by default). */
  rSide?: 'left' | 'right';
  /** Which side of the diameter its label goes, looking along it ('right' by default). */
  dSide?: 'left' | 'right';
  draw?: ('r' | 'd')[];
  rays?: number[];
  angles?: { id: string; from: number; to: number; label?: string; r?: number; labelDist?: number }[];
}): Part {
  const n = namer(o.name);
  const c: P = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('O')]: c };
  const ring = arcPoints(points, n('c'), c, o.r, 90, 450);
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: ring, tone, shade: o.shade ?? 0.14, group: n('shape') },
    { kind: 'curve', id: n('outline'), points: ring, closed: true, tone: o.labels?.c ? 'theta' : 'ink', weight: 3.5, ...(o.labels?.c ? { label: o.labels.c, labelAt: 0.12 } : {}), group: n('shape') },
  ];
  (o.rays ?? []).forEach((deg, i) => {
    points[n(`R${i}`)] = toward(c, deg, o.r);
    items.push({ kind: 'line', id: n(`ray${i}`), from: n('O'), to: n(`R${i}`), tone: 'adj', weight: 3.5, group: n('rays') });
  });
  for (const a of o.angles ?? []) {
    items.push({ kind: 'angle', id: n(a.id), at: n('O'), from: n(`R${a.from}`), to: n(`R${a.to}`), ...(a.label ? { label: a.label } : {}), ...(a.r ? { r: a.r } : {}), ...(a.labelDist ? { labelDist: a.labelDist } : {}) });
  }
  const draw = new Set(o.draw ?? []);
  if (o.labels?.d || draw.has('d')) {
    const dAt = o.dAt ?? 0;
    Object.assign(points, { [n('D0')]: toward(c, dAt + 180, o.r), [n('D1')]: toward(c, dAt, o.r) });
    items.push({ kind: 'line', id: n('d'), from: n('D0'), to: n('D1'), tone: 'hyp', weight: 4.5, ...(o.labels?.d ? { label: o.labels.d, labelSide: o.dSide ?? 'right' } : {}) });
  }
  if (o.labels?.r || draw.has('r')) {
    points[n('Rr')] = toward(c, o.rAt ?? 30, o.r);
    items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('Rr'), tone: 'adj', weight: 4.5, ...(o.labels?.r ? { label: o.labels.r, labelSide: o.rSide ?? 'left' } : {}) });
  }
  items.push({ kind: 'label', id: n('centre'), at: n('O'), tex: o.labels?.centre ?? '', tone: 'ink', place: o.centrePlace ?? 'below', dot: true });
  return { points, items };
}

/**
 * A circle of diameter `d` with a string wrapped once around it, and the string laid out flat
 * below: a yellow line πd long. Under the string, the diameter is marked off three times (`d0`,
 * `d1`, `d2`, pink and blue in turn), and `extra` is the little bit left over.
 *
 * Parts: `circle` (a group: the shape and its outline, yellow), `dia` (the circle's diameter,
 * pink, labelled `labels.d`), `string` (labelled `labels.c`), `d0` to `d2` and `extra`.
 */
export function unroll(o: { name?: string; d: number; labels?: { d?: string; c?: string; pieces?: string; extra?: string } }): Part {
  const n = namer(o.name);
  const r = o.d / 2;
  const C = Math.PI * o.d;
  const c: P = [r + 0.4, 1.2 + r];
  const points: Record<string, P> = { [n('O')]: c };
  // The ring starts at the bottom of the circle, where the string is laid down.
  const ring = arcPoints(points, n('c'), c, r, 270, 630);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: ring, tone: 'brand', shade: 0.14, group: n('circle') },
    { kind: 'curve', id: n('outline'), points: ring, closed: true, tone: 'theta', weight: 4, group: n('circle') },
  ];
  Object.assign(points, { [n('D0')]: [c[0] - r, c[1]], [n('D1')]: [c[0] + r, c[1]], [n('s0')]: [0, 0], [n('s1')]: [C, 0] });
  items.push(
    { kind: 'line', id: n('dia'), from: n('D0'), to: n('D1'), tone: 'hyp', weight: 4.5, ...(o.labels?.d ? { label: o.labels.d, labelSide: 'left' as const } : {}) },
    { kind: 'line', id: n('string'), from: n('s0'), to: n('s1'), tone: 'theta', weight: 6, ...(o.labels?.c ? { label: o.labels.c, labelSide: 'left' as const } : {}) },
  );
  const y = -0.55;
  for (let k = 0; k < 3; k++) {
    Object.assign(points, { [n(`p${k}a`)]: [k * o.d + 0.04, y], [n(`p${k}b`)]: [(k + 1) * o.d - 0.04, y] });
    items.push({ kind: 'line', id: n(`d${k}`), from: n(`p${k}a`), to: n(`p${k}b`), tone: k % 2 ? 'adj' : 'hyp', weight: 6, ...(o.labels?.pieces ? { label: o.labels.pieces, labelSide: 'right' as const } : {}) });
  }
  Object.assign(points, { [n('xa')]: [3 * o.d + 0.04, y], [n('xb')]: [C, y] });
  items.push({ kind: 'line', id: n('extra'), from: n('xa'), to: n('xb'), tone: 'good', weight: 6 });
  if (o.labels?.extra) {
    points[n('xl')] = [C + 0.2, y];
    items.push({ kind: 'label', id: n('extra-label'), at: n('xl'), tex: o.labels.extra, tone: 'good', place: 'right', group: n('extra') });
  }
  return { points, items };
}

/** One sector as a closed list of points: the apex, then the arc from `from` to `to` degrees. */
function sector(points: Record<string, P>, key: string, apex: P, r: number, from: number, to: number, steps = 8): string[] {
  points[`${key}a`] = apex;
  return [`${key}a`, ...arcPoints(points, `${key}s`, apex, r, from, to, steps)];
}

const TOP: DiagramTone = 'adj';
const BOTTOM: DiagramTone = 'theta';

/**
 * A circle of radius `r` cut into `count` equal sectors (an even number), the top half blue and
 * the bottom half yellow.
 *
 * Parts: each sector `s<i>` (a group: its fill and edge).
 */
export function slices(o: { name?: string; r: number; count: number; at?: P }): Part {
  const n = namer(o.name);
  const c: P = o.at ?? [0, 0];
  const step = 360 / o.count;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) {
    const tone = i < o.count / 2 ? TOP : BOTTOM;
    const pts = sector(points, n(`k${i}`), c, o.r, i * step, (i + 1) * step);
    items.push(
      { kind: 'region', id: n(`s${i}-fill`), points: pts, tone, shade: 0.3, group: n(`s${i}`) },
      { kind: 'curve', id: n(`s${i}-edge`), points: pts, closed: true, tone, weight: 2.5, group: n(`s${i}`) },
    );
  }
  return { points, items };
}

/**
 * The `count` sectors of a circle of radius `r` laid side by side: the top-half sectors with their
 * arcs up, the bottom-half sectors with their arcs down, fitted between them, from `at`. The shape
 * is close to a parallelogram: its base is half the circumference, πr, and its height r.
 *
 * Parts: each sector `p<i>` (a group, in order along the row), `h` (a group: a dashed orange
 * radius straight up from the first apex, labelled `labels.h`, with its mark), and `base` (a line
 * under the shape, labelled `labels.base`).
 */
export function rearranged(o: { name?: string; r: number; count: number; at?: P; labels?: { h?: string; base?: string } }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const th = 360 / o.count;
  const chord = 2 * o.r * Math.sin(rad(th / 2));
  const hgt = o.r * Math.cos(rad(th / 2));
  const half = o.count / 2;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < half; k++) {
    // Arc up: apex at the bottom. Arc down: apex at the top, fitted between two arcs up.
    const up = sector(points, n(`u${k}`), [x0 + chord / 2 + k * chord, y0], o.r, 90 - th / 2, 90 + th / 2);
    const down = sector(points, n(`v${k}`), [x0 + (k + 1) * chord, y0 + hgt], o.r, 270 - th / 2, 270 + th / 2);
    for (const [id, pts, tone] of [
      [`p${2 * k}`, up, TOP],
      [`p${2 * k + 1}`, down, BOTTOM],
    ] as const) {
      items.push(
        { kind: 'region', id: n(`${id}-fill`), points: pts, tone, shade: 0.3, group: n(id) },
        { kind: 'curve', id: n(`${id}-edge`), points: pts, closed: true, tone, weight: 2.5, group: n(id) },
      );
    }
  }
  // The height: the radius of the first sector, straight up from its apex.
  const foot: P = [x0 + chord / 2, y0];
  Object.assign(points, { [n('h0')]: foot, [n('h1')]: [foot[0], y0 + o.r], [n('hm')]: [foot[0] + 0.25 * o.r, y0], [n('hl')]: [x0 - 0.1, y0 + o.r / 2] });
  items.push(
    { kind: 'line', id: n('h-line'), from: n('h0'), to: n('h1'), tone: 'opp', dashed: true, weight: 3.5, group: n('h') },
    { kind: 'right', id: n('h-mark'), at: n('h0'), from: n('h1'), to: n('hm'), group: n('h') },
  );
  // The height's label sits left of the whole shape, clear of the first sector's slanted edge.
  if (o.labels?.h) items.push({ kind: 'label', id: n('h-label'), at: n('hl'), tex: o.labels.h, tone: 'opp', place: 'left', group: n('h') });
  // The base: under the arcs along the bottom, from the first to the last of them.
  const by = y0 + hgt - o.r - 0.35;
  Object.assign(points, { [n('b0')]: [x0 + chord / 2, by], [n('b1')]: [x0 + (half + 0.5) * chord, by] });
  items.push({ kind: 'line', id: n('base'), from: n('b0'), to: n('b1'), tone: 'theta', weight: 4, ...(o.labels?.base ? { label: o.labels.base, labelSide: 'right' as const } : {}) });
  return { points, items };
}

/**
 * A window: a rectangle `w` wide and `h` tall with a half circle on top, whose diameter is the
 * rectangle's top. Parts: `rect` and `semi` (groups: each shape's fill and edge), `w` and `h`
 * (the width and height, labelled), `r` (the right half of the half circle's diameter, a radius,
 * labelled above) and `join` (the dashed line between the two shapes).
 */
export function windowShape(o: { name?: string; w: number; h: number; labels?: { w?: string; h?: string; r?: string } }): Part {
  const n = namer(o.name);
  const r = o.w / 2;
  const c: P = [r, o.h];
  const points: Record<string, P> = { [n('A')]: [0, 0], [n('B')]: [o.w, 0], [n('C')]: [o.w, o.h], [n('D')]: [0, o.h], [n('O')]: c };
  const arc = arcPoints(points, n('a'), c, r, 0, 180, 48);
  const rect = ['A', 'B', 'C', 'D'].map(n);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('rect-fill'), points: rect, tone: 'adj', shade: 0.16, group: n('rect') },
    { kind: 'curve', id: n('rect-edge'), points: rect, closed: true, tone: 'adj', weight: 3, group: n('rect') },
    { kind: 'region', id: n('semi-fill'), points: arc, tone: 'theta', shade: 0.2, group: n('semi') },
    { kind: 'curve', id: n('semi-edge'), points: arc, closed: true, tone: 'theta', weight: 3, group: n('semi') },
    { kind: 'line', id: n('join'), from: n('D'), to: n('C'), tone: 'muted', dashed: true, weight: 2.5 },
    { kind: 'line', id: n('w'), from: n('A'), to: n('B'), tone: 'adj', weight: 4.5, ...(o.labels?.w ? { label: o.labels.w, labelSide: 'right' as const } : {}) },
    { kind: 'line', id: n('h'), from: n('B'), to: n('C'), tone: 'opp', weight: 4.5, ...(o.labels?.h ? { label: o.labels.h, labelSide: 'right' as const } : {}) },
  ];
  // The radius runs along the half circle's diameter, from its centre to the right, labelled above.
  items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('C'), tone: 'adj', weight: 4, ...(o.labels?.r ? { label: o.labels.r, labelSide: 'left' as const } : {}) });
  return { points, items };
}

/**
 * A pool of radius `r` with a deck `width` wide all the way around it. Parts: `deck` (a group: the
 * ring's fill and its outer edge), `pool` (a group: the pool's fill and edge), `r` (the pool's
 * radius, labelled), `w` (the deck's width, labelled) and `R` (the radius of pool and deck
 * together, labelled), each drawn along its own direction. `w` is a group: the line and its label.
 */
export function ring(o: { name?: string; r: number; width: number; labels?: { r?: string; w?: string; R?: string } }): Part {
  const n = namer(o.name);
  const c: P = [0, 0];
  const R = o.r + o.width;
  const points: Record<string, P> = { [n('O')]: c };
  const outer = arcPoints(points, n('o'), c, R, 0, 360, 96);
  const inner = arcPoints(points, n('i'), c, o.r, 0, 360, 96);
  // The ring: round the outside one way and the inside the other, so the pool is left empty.
  const annulus = [...outer, outer[0], inner[0], ...[...inner].reverse()];
  const items: DiagramItem[] = [
    { kind: 'region', id: n('deck-fill'), points: annulus, tone: 'theta', shade: 0.3, group: n('deck') },
    { kind: 'curve', id: n('deck-edge'), points: outer, closed: true, tone: 'theta', weight: 3, group: n('deck') },
    { kind: 'region', id: n('pool-fill'), points: inner, tone: 'adj', shade: 0.35, group: n('pool') },
    { kind: 'curve', id: n('pool-edge'), points: inner, closed: true, tone: 'adj', weight: 3, group: n('pool') },
  ];
  Object.assign(points, { [n('Pr')]: toward(c, 270, o.r), [n('Pw0')]: toward(c, 0, o.r), [n('Pw1')]: toward(c, 0, R), [n('Pwl')]: toward(c, 0, R + 0.1), [n('PR')]: toward(c, 140, R) });
  items.push(
    { kind: 'line', id: n('r'), from: n('O'), to: n('Pr'), tone: 'adj', weight: 4, ...(o.labels?.r ? { label: o.labels.r, labelSide: 'left' as const } : {}) },
    { kind: 'line', id: n('w-line'), from: n('Pw0'), to: n('Pw1'), tone: 'opp', weight: 5, group: n('w') },
    { kind: 'line', id: n('R'), from: n('O'), to: n('PR'), tone: 'hyp', weight: 4, ...(o.labels?.R ? { label: o.labels.R, labelSide: 'right' as const } : {}) },
    { kind: 'label', id: n('centre'), at: n('O'), tex: '', tone: 'ink', place: 'center', dot: true },
  );
  // The deck's width is labelled just outside the ring, clear of its edges.
  if (o.labels?.w) items.push({ kind: 'label', id: n('w-label'), at: n('Pwl'), tex: o.labels.w, tone: 'opp', place: 'right', group: n('w') });
  return { points, items };
}

/**
 * A stack of `count` thin strips, each `b` long, making a shape `h` tall, with its bottom left
 * corner at `at`. Each strip sits `s / count` further right than the one below, so with `s = 0`
 * the stack is a rectangle, and with `s > 0` it leans over into a parallelogram with the same base,
 * height and area.
 *
 * Parts: `stack` (a group: every strip, each a fill `st<i>-fill` and an edge `st<i>-edge`).
 */
export function stack(o: { name?: string; b: number; h: number; s: number; count: number; at?: P; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const dh = o.h / o.count;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) {
    const x = x0 + (o.s * i) / o.count;
    const y = y0 + i * dh;
    const pts: P[] = [
      [x, y],
      [x + o.b, y],
      [x + o.b, y + dh],
      [x, y + dh],
    ];
    const names = pts.map((p, k) => {
      points[n(`st${i}-${k}`)] = p;
      return n(`st${i}-${k}`);
    });
    const tone = o.tone ?? (i % 2 ? 'adj' : 'theta');
    items.push(
      { kind: 'region', id: n(`st${i}-fill`), points: names, tone, shade: 0.3, group: n('stack') },
      { kind: 'curve', id: n(`st${i}-edge`), points: names, closed: true, tone, weight: 2, group: n('stack') },
    );
  }
  return { points, items };
}
