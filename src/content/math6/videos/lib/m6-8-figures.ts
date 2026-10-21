/**
 * Figures for the Cartesian plane videos, built from the graph parts in `src/video/graph.ts`, the
 * Math 5 coordinate-grid helpers (`m5-9-figures.ts`: points, arrows and polygons on a plane) and
 * the turn arrow in `m6-7-figures.ts`, so each goes into a diagram with `figure`:
 *
 * - `cart`: a Cartesian plane from −5 to 5 on both axes, numbered, with the axes named x and y.
 * - `coord`: an ordered pair as TeX, with any negative number in braces so it is set as a sign.
 * - `dial`: a clock face with hands pointing in given directions, for turning a direction.
 * - `triangle`: a triangle on a plane with its vertices named, for translations, reflections and
 *   rotations.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import { plane, type Plane } from '@/video/graph.ts';
import { clock } from '@/video/angles.ts';
import type { Part } from '@/video/solids.ts';
import { polygon, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (deg: number) => (deg * Math.PI) / 180;

/** A Cartesian plane over `x` and `y` (−5 to 5 by default), numbered every unit. */
export function cart(o: { name?: string; x?: [number, number]; y?: [number, number] } = {}): Plane {
  return plane({ name: o.name, x: o.x ?? [-5, 5], y: o.y ?? [-5, 5] });
}

/** A number as TeX, in braces when it is negative, so KaTeX sets the minus as a sign. */
const num = (v: number) => (v < 0 ? `{-${-v}}` : String(v));

/** An ordered pair as TeX, with a name in front if given: `coord(-4, 1, 'B')` is B(−4, 1). */
export const coord = (x: number, y: number, name = ''): string => `${name}(${num(x)},\\ ${num(y)})`;

/**
 * The corners of a triangle on the plane `g`, joined in order (the part `id`, its sides `id-s0`…,
 * and its shading `id-fill`), with a dot and a name at each vertex: the parts `<id>-<name>` for
 * each name in `names` (placed by `places`).
 */
export function triangle(g: Plane, o: { id: string; corners: P[]; names: string[]; places: Place[]; tone?: DiagramTone; withCoords?: boolean }): Part {
  const tone = o.tone ?? 'brand';
  const parts: Part[] = [polygon(g, { id: o.id, corners: o.corners, tone, shade: 0.22 })];
  o.corners.forEach(([x, y], i) => {
    const name = o.names[i];
    if (!name) return;
    parts.push(pt(g, `${o.id}-${i}`, x, y, o.withCoords ? coord(x, y, name) : name, o.places[i], tone));
  });
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/**
 * A clock face of radius `r` with hands from its centre pointing at `hands` (degrees: 0° points to
 * the 3, 90° to the 12), and turn arrows between directions.
 *
 * Parts: `face` (a group: the rim, ticks and numbers), each hand by its `id`, and each arrow by its
 * `id` (a group: the arc and its arrowhead).
 */
export function dial(o: { name?: string; r?: number; hands: { id: string; deg: number; tone?: DiagramTone; tex?: string }[]; turns?: { id: string; from: number; to: number; r?: number; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const r = o.r ?? 4;
  const face = clock({ name: o.name, h: 0, m: 0, r });
  // Keep only the face: the clock's own hands and angle are left out.
  const keep = new Set([n('hour'), n('minute'), n('between')]);
  const points: Record<string, P> = { ...face.points };
  const items: DiagramItem[] = face.items.filter((it) => !keep.has(it.id));
  for (const h of o.hands) {
    points[n(`${h.id}-tip`)] = [0.6 * r * Math.cos(rad(h.deg)), 0.6 * r * Math.sin(rad(h.deg))];
    items.push({ kind: 'line', id: n(h.id), from: n('O'), to: n(`${h.id}-tip`), tone: h.tone ?? 'theta', weight: 6, arrow: true });
  }
  for (const t of o.turns ?? []) {
    const rr = t.r ?? 0.4 * r;
    const dir = Math.sign(t.to - t.from);
    const end = t.to - 8 * dir;
    const names: string[] = [];
    for (let k = 0; k <= 30; k++) {
      const a = rad(t.from + ((end - t.from) * k) / 30);
      points[n(`${t.id}${k}`)] = [rr * Math.cos(a), rr * Math.sin(a)];
      names.push(n(`${t.id}${k}`));
    }
    points[n(`${t.id}-end`)] = [rr * Math.cos(rad(t.to)), rr * Math.sin(rad(t.to))];
    items.push(
      { kind: 'curve', id: n(`${t.id}-arc`), points: names, tone: t.tone ?? 'good', weight: 3.5, group: n(t.id) },
      { kind: 'line', id: n(`${t.id}-head`), from: names[names.length - 1], to: n(`${t.id}-end`), tone: t.tone ?? 'good', weight: 3.5, arrow: true, group: n(t.id) },
    );
  }
  return { points, items };
}
