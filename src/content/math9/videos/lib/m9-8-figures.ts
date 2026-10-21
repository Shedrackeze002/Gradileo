/**
 * Figures for the circle geometry videos (Grade 9, unit 8), built only from standard diagram parts
 * (curves, lines, angle arcs, right-angle marks, shaded regions and labels), so each goes into a
 * diagram with `figure`. Every point said to be on a circle is computed from the circle's centre,
 * its radius and an angle, so it really is on the circle.
 *
 * - `on`: the point on a circle at an angle (degrees, anticlockwise from the right).
 * - `ring`: a circle with its centre and named points on it, each with a dot and its letter.
 * - `dot`: a named point anywhere, with a dot and its letter.
 * - `ln`, `ang` and `sq`: a line, an angle arc and a right-angle mark between named points.
 * - `arcOn`: part of a circle (an arc), drawn as a curve.
 * - `ticks`: tick marks across a segment, to show equal lengths.
 * - `segment`: the region between a chord and the circle (the water in a pipe).
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { facing } from '@/video/angles.ts';

type P = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;

/** The point on the circle about `c` of radius `r` at `deg` degrees, anticlockwise from the right. */
export const on = (c: P, r: number, deg: number): P => [c[0] + r * Math.cos(rad(deg)), c[1] + r * Math.sin(rad(deg))];

/** The direction from `a` to `b`, in degrees. */
export const dirOf = (a: P, b: P): number => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;

/**
 * A circle of radius `r` about `c` (the origin by default), with its centre (a dot and the letter
 * `centre`, "O" unless set, or none with `false`) and the points `pts` on it (name: angle in
 * degrees), each with a dot and its letter outside the circle. Points get their own names, so lines
 * can join them ("A", "B"); `places` moves a letter.
 *
 * Parts: `outline` (the circle), `fill` (faint shading, unless `fill` is false), `nO` (the centre),
 * and each point's letter `n<name>`, all letters in the group `names`. With a `name`, ids and the
 * outline's points start with it, but the named points keep their own names.
 */
export function ring(o: { name?: string; r: number; c?: P; centre?: string | false; centrePlace?: Place; pts?: Record<string, number>; places?: Partial<Record<string, Place>>; tone?: DiagramTone; fill?: boolean; weight?: number }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const c = o.c ?? [0, 0];
  const points: Record<string, P> = { O: c };
  const loop: string[] = [];
  for (let i = 0; i < 120; i++) {
    const p = n(`c${i}`);
    points[p] = on(c, o.r, 90 + i * 3);
    loop.push(p);
  }
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [];
  if (o.fill !== false) items.push({ kind: 'region', id: n('fill'), points: loop, tone, shade: 0.08 });
  items.push({ kind: 'curve', id: n('outline'), points: loop, closed: true, tone, ...(o.weight ? { weight: o.weight } : {}) });
  if (o.centre !== false) items.push({ kind: 'label', id: n('nO'), at: 'O', tex: o.centre ?? 'O', place: o.centrePlace ?? 'below left', dot: true, group: n('names') });
  for (const [k, d] of Object.entries(o.pts ?? {})) {
    points[k] = on(c, o.r, d);
    items.push({ kind: 'label', id: n(`n${k}`), at: k, tex: k, place: o.places?.[k] ?? facing(d), dot: true, group: n('names') });
  }
  return { points, items };
}

/** A named point at `at`, with a dot and its letter (`tex`, the name unless set). Part: `n<name>`. */
export function dot(name: string, at: P, place: Place, o: { tex?: string; group?: string; tone?: DiagramTone; dot?: boolean } = {}): Part {
  return { points: { [name]: at }, items: [{ kind: 'label', id: `n${name}`, at: name, tex: o.tex ?? name, place, dot: o.dot ?? true, ...(o.tone ? { tone: o.tone } : {}), ...(o.group ? { group: o.group } : {}) }] };
}

/** A named point with no dot or letter, to end a line at. */
export const pt = (name: string, at: P): Part => ({ points: { [name]: at }, items: [] });

/** A line between named points: the part `id`. */
export function ln(id: string, from: string, to: string, o: { tone?: DiagramTone; label?: string; side?: 'left' | 'right'; at?: number; dashed?: boolean; weight?: number; group?: string } = {}): Part {
  return {
    points: {},
    items: [
      {
        kind: 'line',
        id,
        from,
        to,
        ...(o.tone ? { tone: o.tone } : {}),
        ...(o.label ? { label: o.label, ...(o.side ? { labelSide: o.side } : {}) } : {}),
        ...(o.at !== undefined ? { labelAt: o.at } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.weight ? { weight: o.weight } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** The angle at `at` between the directions to `from` and `to` (the smaller one): the part `id`. */
export function ang(id: string, at: string, from: string, to: string, o: { label?: string; tone?: DiagramTone; r?: number; dist?: number; group?: string } = {}): Part {
  return { points: {}, items: [{ kind: 'angle', id, at, from, to, tone: o.tone ?? 'theta', ...(o.label ? { label: o.label } : {}), ...(o.r ? { r: o.r } : {}), ...(o.dist ? { labelDist: o.dist } : {}), ...(o.group ? { group: o.group } : {}) }] };
}

/** A right-angle mark at `at`, between the directions to `from` and `to`: the part `id`. */
export function sq(id: string, at: string, from: string, to: string, group?: string): Part {
  return { points: {}, items: [{ kind: 'right', id, at, from, to, ...(group ? { group } : {}) }] };
}

/**
 * The arc of the circle about `c` of radius `r` from `from` to `to` degrees (anticlockwise),
 * drawn on from `from`, thicker than the circle: the part `id`, with an optional label.
 */
export function arcOn(id: string, c: P, r: number, from: number, to: number, o: { tone?: DiagramTone; weight?: number; label?: string; side?: 'left' | 'right'; dashed?: boolean; group?: string } = {}): Part {
  const points: Record<string, P> = {};
  const names: string[] = [];
  const steps = Math.max(8, Math.ceil(Math.abs(to - from) / 3));
  for (let i = 0; i <= steps; i++) {
    points[`${id}-${i}`] = on(c, r, from + ((to - from) * i) / steps);
    names.push(`${id}-${i}`);
  }
  return {
    points,
    items: [
      {
        kind: 'curve',
        id,
        points: names,
        tone: o.tone ?? 'good',
        weight: o.weight ?? 7,
        ...(o.label ? { label: o.label, labelSide: o.side ?? 'left' } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** `count` tick marks across the middle of the segment from `a` to `b`, `size` long: the group `id`. */
export function ticks(id: string, a: P, b: P, count: number, size: number, tone: DiagramTone = 'opp'): Part {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const l = Math.hypot(dx, dy);
  const [ux, uy] = [dx / l, dy / l];
  const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < count; k++) {
    const off = (k - (count - 1) / 2) * size * 0.7;
    const c: P = [m[0] + off * ux, m[1] + off * uy];
    points[`${id}${k}a`] = [c[0] - (size / 2) * uy, c[1] + (size / 2) * ux];
    points[`${id}${k}b`] = [c[0] + (size / 2) * uy, c[1] - (size / 2) * ux];
    items.push({ kind: 'line', id: `${id}${k}`, from: `${id}${k}a`, to: `${id}${k}b`, tone, weight: 3, group: id });
  }
  return { points, items };
}

/**
 * The region of the circle about `c` of radius `r` cut off by a horizontal chord at height `y`
 * (relative to the centre), below the chord: water lying in a round pipe. Part: `id` (a shaded
 * region, with a wavy surface drawn as the chord).
 */
export function waterBelow(id: string, c: P, r: number, y: number, tone: DiagramTone = 'adj'): Part {
  const half = Math.sqrt(r * r - y * y);
  const a = (Math.atan2(y, -half) * 180) / Math.PI; // left end of the chord
  const b = (Math.atan2(y, half) * 180) / Math.PI; // right end
  // From the left end, round the bottom of the circle, to the right end.
  const from = a < 0 ? a + 360 : a;
  const to = b < 0 ? b + 360 : b;
  const points: Record<string, P> = {};
  const names: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    points[`${id}-${i}`] = on(c, r, from + ((to - from) * i) / steps);
    names.push(`${id}-${i}`);
  }
  return { points, items: [{ kind: 'region', id, points: names, tone, shade: 0.3 }] };
}
