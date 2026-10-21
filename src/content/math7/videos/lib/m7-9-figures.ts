/**
 * Figures for the Cartesian plane and transformation videos, built from the graph parts in
 * `src/video/graph.ts` and the Math 5 and Math 6 coordinate helpers (used as they are), so each
 * goes into a diagram with `figure`:
 *
 * - `cart`, `coord` and `triangle` (from `m6-8-figures.ts`): a numbered plane, an ordered pair as
 *   TeX, and a named shape on the plane.
 * - `quadrants`: the quadrant numbers I to IV, each in the middle of its quadrant.
 * - `mirror`: a thick dashed green line along an axis, the mirror line of a reflection.
 * - `around`: a turn arrow inside a shape, to show which way its vertices go round (A to B to C).
 * - `swing`: an arrow round the origin, for a rotation or the order of the quadrants.
 * - `arrow`: a move along the grid with its label placed along it.
 * - `shapeIds` and `base`: the ids that show a shape made by `triangle`, and a plane.
 */
import type { DiagramTone } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';
import { guide, tag } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { join } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { turnArrow } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { cart, coord, triangle } from '@/content/math6/videos/lib/m6-8-figures.ts';

export { cart, coord, triangle, move, pt, join, tag };

type P = [number, number];

/**
 * The quadrant numbers I to IV in Roman numerals, each `d` units from each axis (2.5 by default),
 * written large. Parts: `q1` to `q4`, in the group `quads`.
 */
export function quadrants(g: Plane, o: { d?: number; tone?: DiagramTone } = {}): Part {
  const d = o.d ?? 2.5;
  const name = (r: string) => `\\Large\\text{${r}}`;
  const tone = o.tone ?? 'theta';
  return join(
    tag(g, 'q1', d, d, name('I'), 'center', tone, 'quads'),
    tag(g, 'q2', -d, d, name('II'), 'center', tone, 'quads'),
    tag(g, 'q3', -d, -d, name('III'), 'center', tone, 'quads'),
    tag(g, 'q4', d, -d, name('IV'), 'center', tone, 'quads'),
  );
}

/**
 * The signs of the coordinates in each quadrant, (+, +) and so on, under the quadrant numbers
 * placed by `quadrants` with the same `d`. Parts: `s1` to `s4`, in the group `signs`.
 */
export function quadrantSigns(g: Plane, o: { d?: number; tone?: DiagramTone } = {}): Part {
  const d = o.d ?? 2.5;
  const tone = o.tone ?? 'ink';
  const pair = (x: string, y: string) => `\\large(\\adj{${x}},\\ \\opp{${y}})`;
  return join(
    tag(g, 's1', d, d - 1.1, pair('+', '+'), 'center', tone, 'signs'),
    tag(g, 's2', -d, d - 1.1, pair('-', '+'), 'center', tone, 'signs'),
    tag(g, 's3', -d, -d - 1.1, pair('-', '-'), 'center', tone, 'signs'),
    tag(g, 's4', d, -d - 1.1, pair('+', '-'), 'center', tone, 'signs'),
  );
}

/** A thick dashed green line along the x-axis or the y-axis, across the whole plane: the part `id`. */
export function mirror(g: Plane, id: string, axis: 'x' | 'y'): Part {
  const [from, to]: [P, P] = axis === 'y' ? [[0, g.y[0]], [0, g.y[1]]] : [[g.x[0], 0], [g.x[1], 0]];
  return guide(g, id, from, to, 'good', { weight: 5 });
}

/**
 * A turn arrow round the middle of a shape, `r` units across (0.55 by default), clockwise or
 * counterclockwise, to show which way its named vertices go round: the part `id` (a group).
 */
export function around(g: Plane, id: string, corners: P[], dir: 'cw' | 'ccw', o: { r?: number; tone?: DiagramTone } = {}): Part {
  const cx = corners.reduce((s, c) => s + c[0], 0) / corners.length;
  const cy = corners.reduce((s, c) => s + c[1], 0) / corners.length;
  const [from, to] = dir === 'cw' ? [150, -150] : [30, 330];
  return turnArrow({ name: g.n('').replace(/-$/, '') || undefined, id, c: g.map(cx, cy), r: o.r ?? 0.55, from, to, tone: o.tone ?? 'theta' });
}

/**
 * An arrow round the origin at radius `r`, from the direction `from` to the direction `to` (in
 * degrees, 0° to the right, counterclockwise positive): the part `id` (a group).
 */
export function swing(g: Plane, id: string, r: number, from: number, to: number, tone: DiagramTone = 'theta'): Part {
  return turnArrow({ name: g.n('').replace(/-$/, '') || undefined, id, c: g.map(0, 0), r, from, to, tone });
}

/**
 * An arrow from `from` to `to` on the plane, like `move` but with its label `at` a fraction of the
 * way along (0.5 by default), to keep it clear of an axis: the part `id`.
 */
export function arrow(g: Plane, id: string, from: P, to: P, o: { label?: string; side?: 'left' | 'right'; at?: number; tone?: DiagramTone; dashed?: boolean; group?: string } = {}): Part {
  const [a, b] = [g.n(`${id}-a`), g.n(`${id}-b`)];
  return {
    points: { [a]: g.map(...from), [b]: g.map(...to) },
    items: [
      {
        kind: 'line',
        id: g.n(id),
        from: a,
        to: b,
        tone: o.tone ?? (from[1] === to[1] ? 'adj' : 'opp'),
        dashed: o.dashed ?? true,
        weight: 3.5,
        arrow: true,
        ...(o.label ? { label: o.label, labelSide: o.side ?? 'left', labelAt: o.at ?? 0.5 } : {}),
        ...(o.group ? { group: g.n(o.group) } : {}),
      },
    ],
  };
}

/** The ids that show the shape `t` made by `triangle` with `n` corners, in the figure `fig`. */
export const shapeIds = (fig: string, t: string, n = 3): string[] => [`${fig}.${t}`, `${fig}.${t}-fill`, ...Array.from({ length: n }, (_, i) => `${fig}.${t}-${i}`)];

/** The ids of a figure's grid and axes. */
export const base = (fig: string): string[] => [`${fig}.grid`, `${fig}.axes`];
