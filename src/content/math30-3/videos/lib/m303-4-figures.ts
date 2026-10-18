/**
 * Figures for the transformations videos: shapes on a coordinate grid with their images, built
 * only from standard diagram parts, so each goes into a diagram with `figure` beside a `plane`
 * from `src/video/graph.ts` (everything is drawn through the plane, in its coordinates):
 *
 * - `shape`: a polygon through points of the plane, shaded, with its corners named outside it.
 * - `mirror`: a dashed line of reflection across the whole plane (x = k or y = k), labelled.
 * - `arrow`: an arrow from a point to its image (a translation).
 * - `turn`: an arc about a centre, with an arrowhead, showing a rotation's direction.
 * - `rays`: dashed lines from a centre out through points (a dilation).
 * - `link`: a dashed segment between a point and its image (to show they are the same distance
 *   from a mirror line).
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';
import { facing } from '@/video/angles.ts';

type P = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;

/** Several parts as one. */
export const join = (parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

/**
 * A polygon through `pts` (plane coordinates), shaded, with its corners named from `names` (TeX)
 * outside it, straight out from its middle unless `places` says otherwise. Parts: `id` (a group:
 * the shading and the sides) and `id-names` (a group: the names `id-n0`…, each with a small dot
 * at its corner).
 */
export function shape(g: Plane, o: { id: string; pts: P[]; names?: string[]; places?: (Place | undefined)[]; tone?: DiagramTone; shade?: number; dashed?: boolean }): Part {
  const id = g.n(o.id);
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {};
  const ids = o.pts.map((p, i) => {
    points[`${id}-v${i}`] = g.map(p[0], p[1]);
    return `${id}-v${i}`;
  });
  const items: DiagramItem[] = [{ kind: 'region', id: `${id}-fill`, points: ids, tone, shade: o.shade ?? 0.22, group: id }];
  ids.forEach((v, i) => items.push({ kind: 'line', id: `${id}-s${i}`, from: v, to: ids[(i + 1) % ids.length], tone, weight: 3, ...(o.dashed ? { dashed: true } : {}), group: id }));
  if (o.names) {
    const mid: P = [o.pts.reduce((s, p) => s + p[0], 0) / o.pts.length, o.pts.reduce((s, p) => s + p[1], 0) / o.pts.length];
    o.names.forEach((tex, i) => {
      const [x, y] = o.pts[i];
      const place = o.places?.[i] ?? facing((Math.atan2(y - mid[1], x - mid[0]) * 180) / Math.PI);
      items.push({ kind: 'label', id: `${id}-n${i}`, at: ids[i], tex, tone, place, dot: true, group: `${id}-names` });
    });
  }
  return { points, items };
}

/**
 * A dashed line of reflection across the whole plane: the vertical line x = `x`, or the horizontal
 * line y = `y`, with `label` (TeX) at its top or right-hand end (above and to the right of the top
 * end, clear of the y-axis's name, unless `place` says otherwise). Parts: `id` (a group: the line
 * and its label).
 */
export function mirror(g: Plane, o: { id: string; x?: number; y?: number; label?: string; tone?: DiagramTone; place?: Place }): Part {
  const id = g.n(o.id);
  const tone = o.tone ?? 'good';
  const [a, b]: [P, P] = o.x !== undefined ? [g.map(o.x, g.y[0]), g.map(o.x, g.y[1])] : [g.map(g.x[0], o.y ?? 0), g.map(g.x[1], o.y ?? 0)];
  const items: DiagramItem[] = [{ kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone, dashed: true, weight: 3.5, group: id }];
  if (o.label) items.push({ kind: 'label', id: `${id}-label`, at: `${id}-b`, tex: o.label, tone, place: o.place ?? (o.x !== undefined ? 'above right' : 'right'), group: id });
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items };
}

/**
 * An arrow from `from` to `to` (plane coordinates), stopping a little short of `to` so its head
 * does not cover a dot there. Parts: `id`, in the group `group` if given.
 */
export function arrow(g: Plane, o: { id: string; from: P; to: P; tone?: DiagramTone; group?: string; dashed?: boolean; shorten?: number }): Part {
  const id = g.n(o.id);
  const [x0, y0] = o.from;
  const [x1, y1] = o.to;
  const len = Math.hypot(x1 - x0, y1 - y0);
  const cut = Math.min(o.shorten ?? 0.25, len / 3);
  const end: P = [x1 - ((x1 - x0) / len) * cut, y1 - ((y1 - y0) / len) * cut];
  const start: P = [x0 + ((x1 - x0) / len) * cut, y0 + ((y1 - y0) / len) * cut];
  return {
    points: { [`${id}-a`]: g.map(...start), [`${id}-b`]: g.map(...end) },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: o.tone ?? 'theta', weight: 3, arrow: true, ...(o.dashed ? { dashed: true } : {}), ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/**
 * An arc about `about` (plane coordinates), `r` units out, starting in the direction of `from` and
 * turning `deg` degrees (positive anticlockwise, negative clockwise), with an arrowhead at its end
 * and an optional `label` (TeX) just outside its middle. Parts: `id` (a group: the arc, its
 * arrowhead and its label).
 */
export function turn(g: Plane, o: { id: string; about: P; from: P; deg: number; r?: number; tone?: DiagramTone; label?: string; labelOut?: number }): Part {
  const id = g.n(o.id);
  const [cx, cy] = o.about;
  const r = o.r ?? Math.hypot(o.from[0] - cx, o.from[1] - cy);
  const a0 = (Math.atan2(o.from[1] - cy, o.from[0] - cx) * 180) / Math.PI;
  const steps = 40;
  // Stop the arc a little short, and finish it with a short straight piece carrying the arrowhead.
  const stop = o.deg - Math.sign(o.deg) * Math.min(Math.abs(o.deg) * 0.08, 6);
  const points: Record<string, P> = {};
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = rad(a0 + (stop * i) / steps);
    points[`${id}-p${i}`] = g.map(cx + r * Math.cos(a), cy + r * Math.sin(a));
    names.push(`${id}-p${i}`);
  }
  const aEnd = rad(a0 + o.deg);
  points[`${id}-tip`] = g.map(cx + r * Math.cos(aEnd), cy + r * Math.sin(aEnd));
  const tone = o.tone ?? 'theta';
  const items: DiagramItem[] = [
    { kind: 'curve', id: `${id}-arc`, points: names, tone, weight: 3, dashed: true, group: id },
    { kind: 'line', id: `${id}-head`, from: names[steps], to: `${id}-tip`, tone, weight: 3, arrow: true, group: id },
  ];
  if (o.label) {
    const am = rad(a0 + o.deg / 2);
    const out = r + (o.labelOut ?? 0.9);
    points[`${id}-l`] = g.map(cx + out * Math.cos(am), cy + out * Math.sin(am));
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-l`, tex: o.label, tone, place: 'center', group: id });
  }
  return { points, items };
}

/** Dashed lines from `from` out through each point of `through`, to `scale` times as far. Parts: `id` (a group of the lines `id-0`…). */
export function rays(g: Plane, o: { id: string; from: P; through: P[]; scale?: number; tone?: DiagramTone }): Part {
  const id = g.n(o.id);
  const points: Record<string, P> = { [`${id}-o`]: g.map(...o.from) };
  const items: DiagramItem[] = o.through.map(([x, y], i) => {
    const s = o.scale ?? 1;
    points[`${id}-e${i}`] = g.map(o.from[0] + (x - o.from[0]) * s, o.from[1] + (y - o.from[1]) * s);
    return { kind: 'line', id: `${id}-${i}`, from: `${id}-o`, to: `${id}-e${i}`, tone: o.tone ?? 'muted', dashed: true, weight: 2.5, group: id };
  });
  return { points, items };
}

/** A dashed segment between two points of the plane: the part `id`, in the group `group` if given. */
export function link(g: Plane, o: { id: string; from: P; to: P; tone?: DiagramTone; group?: string }): Part {
  const id = g.n(o.id);
  return {
    points: { [`${id}-a`]: g.map(...o.from), [`${id}-b`]: g.map(...o.to) },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: o.tone ?? 'muted', dashed: true, weight: 2.5, ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/**
 * A square `size` units wide with its bottom left corner at `at` (diagram units, not on a plane),
 * split into `n` by `n` equal cells, with optional labels (TeX) under it and inside each cell.
 * Parts: `name` (a group: the shading, the outline and the cell lines), `name-cells` (a group: the
 * cell labels) and `name-cap` (the label under it).
 */
export function squareGrid(o: { name: string; at: P; size: number; n: number; tone?: DiagramTone; cell?: string; caption?: string; side?: string; /** The height of the caption (diagram units), to line up captions under squares of different sizes. */ captionY?: number }): Part {
  const { name, n } = o;
  const [x0, y0] = o.at;
  const s = o.size;
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {
    [`${name}-c0`]: [x0, y0],
    [`${name}-c1`]: [x0 + s, y0],
    [`${name}-c2`]: [x0 + s, y0 + s],
    [`${name}-c3`]: [x0, y0 + s],
  };
  const corners = [0, 1, 2, 3].map((i) => `${name}-c${i}`);
  const items: DiagramItem[] = [{ kind: 'region', id: `${name}-fill`, points: corners, tone, shade: 0.2, group: name }];
  for (let k = 1; k < n; k++) {
    const t = (k * s) / n;
    Object.assign(points, { [`${name}-v${k}a`]: [x0 + t, y0], [`${name}-v${k}b`]: [x0 + t, y0 + s], [`${name}-h${k}a`]: [x0, y0 + t], [`${name}-h${k}b`]: [x0 + s, y0 + t] });
    items.push(
      { kind: 'line', id: `${name}-v${k}`, from: `${name}-v${k}a`, to: `${name}-v${k}b`, tone, weight: 1.5, group: name },
      { kind: 'line', id: `${name}-h${k}`, from: `${name}-h${k}a`, to: `${name}-h${k}b`, tone, weight: 1.5, group: name },
    );
  }
  items.push({ kind: 'line', id: `${name}-bottom`, from: corners[0], to: corners[1], tone, weight: 3.5, ...(o.side ? { label: o.side, labelSide: 'right' as const } : {}), group: name });
  items.push({ kind: 'curve', id: `${name}-edge`, points: [corners[1], corners[2], corners[3], corners[0]], tone, weight: 3.5, group: name });
  if (o.cell) {
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        points[`${name}-m${i}${j}`] = [x0 + ((i + 0.5) * s) / n, y0 + ((j + 0.5) * s) / n];
        items.push({ kind: 'label', id: `${name}-l${i}${j}`, at: `${name}-m${i}${j}`, tex: o.cell, tone: 'muted', place: 'center', group: `${name}-cells` });
      }
  }
  if (o.caption) {
    points[`${name}-cap-at`] = [x0 + s / 2, o.captionY ?? y0 - 0.22 * s - (o.side ? 0.12 * s : 0)];
    items.push({ kind: 'label', id: `${name}-cap`, at: `${name}-cap-at`, tex: o.caption, place: 'center' });
  }
  return { points, items };
}

/**
 * Axis numbers along the plane's bottom and left edges, every `step` (2 by default), instead of
 * along the axes, where shapes and their images often cover them. Draw the plane with `every: 0`.
 * The numbers are in the plane's `axes` group, so showing `d.axes` shows them.
 */
export function edgeNumbers(g: Plane, step = 2): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const list = (a: number, b: number) => {
    const out: number[] = [];
    for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(Number(v.toFixed(6)));
    return out;
  };
  const dx = 0.15;
  list(g.x[0], g.x[1]).forEach((x, i) => {
    const id = g.n(`ex${i}`);
    points[id] = g.map(x, g.y[0]);
    items.push({ kind: 'label', id, at: id, tex: x < 0 ? `{-${-x}}` : String(x), tone: 'muted', place: 'below', group: g.n('axes') });
  });
  list(g.y[0], g.y[1]).forEach((y, j) => {
    const id = g.n(`ey${j}`);
    const [px, py] = g.map(g.x[0] - dx, y);
    points[id] = [px, py];
    items.push({ kind: 'label', id, at: id, tex: y < 0 ? `{-${-y}}` : String(y), tone: 'muted', place: 'left', group: g.n('axes') });
  });
  return { points, items };
}
