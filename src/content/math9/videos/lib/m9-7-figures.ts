/**
 * Figures for the similarity and scale videos (Grade 9, unit 7), built only from standard diagram
 * parts (lines, shaded regions, right-angle marks, angle arcs and labels), so each goes into a
 * diagram with `figure`:
 *
 * - `shape`: a polygon through a list of corners, shaded, with each side in its own colour and an
 *   optional length beside it, letters at its corners and right-angle marks, so the matching sides
 *   of a figure and its scale diagram (or of two similar polygons) can share a colour.
 * - `scaled`: the corners of a figure multiplied by a scale factor about its first corner, then
 *   moved so that corner sits at a new place.
 * - `canoe`: a canoe seen from above, `length` long.
 * - `scaleBar`: a map's scale bar, with its marks numbered.
 * - `blob`: a smooth closed shape through points (a lake on a map).
 *
 * Squared paper comes from the Grade 6 helpers (`paper` in `m6-7-figures.ts`), labels (`tag`) and
 * double number lines (`rateLine`) from the Grade 8 helpers (`m8-3-figures.ts`), and turned copies
 * of a polygon (`moved`) from `m8-9-figures.ts`, all used as they are.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { facing } from '@/video/angles.ts';

type P = [number, number];

const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const deg = (v: P) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** A side of a `shape`: its colour, its length (TeX) and which side of it the length sits on. */
export interface Side {
  tone?: DiagramTone;
  label?: string;
  /** Looking from this corner to the next; outside the shape unless set. */
  side?: 'left' | 'right';
  /** Where along the side the label sits (0 to 1, the middle by default). */
  at?: number;
}

/**
 * A polygon through `pts` (in order round it), shaded in `tone`. Side `i` runs from corner `i` to
 * corner `i + 1`; `sides[i]` gives it a colour and a length. `names` letters the corners (TeX),
 * straight out from the middle of the shape unless `places` says otherwise, and `rights` lists the
 * corners with a right-angle mark. `angles` labels corners with an arc and a measure.
 *
 * Parts (every id starts with `name-`): the group `name` (the shading `name-fill`, the sides
 * `name-e0`, `name-e1`… and the right-angle marks `name-r0`…), the group `name-lens` (each length
 * `name-len0`…, a line along its side that carries the label, so emphasising it lights up the side
 * and its length together), the group `name-names` (the letters `name-n0`…) and the group
 * `name-angs` (each angle `name-a0`…).
 */
export function shape(o: {
  name: string;
  pts: P[];
  tone?: DiagramTone;
  shade?: number;
  sides?: (Side | undefined)[];
  names?: string[];
  places?: (Place | undefined)[];
  rights?: number[];
  angles?: { at: number; label: string; tone?: DiagramTone; r?: number; dist?: number }[];
  weight?: number;
}): Part {
  const n = (s: string) => `${o.name}-${s}`;
  const tone = o.tone ?? 'brand';
  const points: Record<string, P> = {};
  o.pts.forEach((p, i) => (points[n(`p${i}`)] = p));
  const k = o.pts.length;
  const mid: P = mul(o.pts.reduce<P>((s, p) => add(s, p), [0, 0]), 1 / k);
  const next = (i: number) => (i + 1) % k;
  const prev = (i: number) => (i + k - 1) % k;
  const outside = (i: number): 'left' | 'right' => {
    const d = sub(o.pts[next(i)], o.pts[i]);
    const w = sub(mid, o.pts[i]);
    return d[0] * w[1] - d[1] * w[0] > 0 ? 'right' : 'left';
  };
  const items: DiagramItem[] = [];
  if ((o.shade ?? 0.16) > 0) items.push({ kind: 'region', id: n('fill'), points: o.pts.map((_, i) => n(`p${i}`)), tone, shade: o.shade ?? 0.16, group: o.name });
  o.pts.forEach((_, i) => {
    const s = o.sides?.[i];
    items.push({ kind: 'line', id: n(`e${i}`), from: n(`p${i}`), to: n(`p${next(i)}`), tone: s?.tone ?? tone, ...(o.weight ? { weight: o.weight } : {}), group: o.name });
  });
  for (const i of o.rights ?? []) items.push({ kind: 'right', id: n(`r${i}`), at: n(`p${i}`), from: n(`p${prev(i)}`), to: n(`p${next(i)}`), group: o.name });
  o.pts.forEach((_, i) => {
    const s = o.sides?.[i];
    if (!s?.label) return;
    items.push({ kind: 'line', id: n(`len${i}`), from: n(`p${i}`), to: n(`p${next(i)}`), tone: s.tone ?? tone, label: s.label, labelSide: s.side ?? outside(i), ...(s.at !== undefined ? { labelAt: s.at } : {}), ...(o.weight ? { weight: o.weight } : {}), group: n('lens') });
  });
  for (const a of o.angles ?? []) {
    items.push({ kind: 'angle', id: n(`a${a.at}`), at: n(`p${a.at}`), from: n(`p${prev(a.at)}`), to: n(`p${next(a.at)}`), tone: a.tone ?? 'theta', label: a.label, r: a.r ?? 34, ...(a.dist ? { labelDist: a.dist } : {}), group: n('angs') });
  }
  (o.names ?? []).forEach((tex, i) => {
    if (!tex) return;
    items.push({ kind: 'label', id: n(`n${i}`), at: n(`p${i}`), tex, place: o.places?.[i] ?? facing(deg(sub(o.pts[i], mid))), group: n('names') });
  });
  return { points, items };
}

/** The ids that show a `shape` called `name` in the figure `fig`, with its lengths and letters. */
export const shapeIds = (fig: string, name: string, o: { lens?: boolean; names?: boolean } = {}): string[] => [
  `${fig}.${name}`,
  ...(o.lens ? [`${fig}.${name}-lens`] : []),
  ...(o.names ? [`${fig}.${name}-names`] : []),
];

/** `pts` multiplied by `k` about the first point, then moved so the first point sits at `to`. */
export function scaled(pts: P[], k: number, to: P): P[] {
  const [x0, y0] = pts[0];
  return pts.map(([x, y]) => [to[0] + (x - x0) * k, to[1] + (y - y0) * k]);
}

/** `pts` moved by (dx, dy). */
export const shifted = (pts: P[], dx: number, dy: number): P[] => pts.map(([x, y]) => [x + dx, y + dy]);

/**
 * A canoe seen from above: `length` long from its back at `at` to its front, and `width` across
 * at the middle, pointed at both ends. Part: `id` (a group: the shading and the outline).
 */
export function canoe(id: string, at: P, length: number, width: number, tone: DiagramTone = 'good'): Part {
  const points: Record<string, P> = {};
  const names: string[] = [];
  const steps = 24;
  const half = (t: number) => (width / 2) * Math.pow(Math.sin(Math.PI * t), 0.75);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points[`${id}-u${i}`] = [at[0] + length * t, at[1] + half(t)];
    names.push(`${id}-u${i}`);
  }
  for (let i = steps - 1; i >= 1; i--) {
    const t = i / steps;
    points[`${id}-d${i}`] = [at[0] + length * t, at[1] - half(t)];
    names.push(`${id}-d${i}`);
  }
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: names, tone, shade: 0.3, group: id },
      { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 3, group: id },
    ],
  };
}

/**
 * A map's scale bar from `at`: `marks` numbered marks (`labels`, TeX), `step` apart, joined by a bar.
 * Part: `id` (a group: the bar, its marks and their numbers).
 */
export function scaleBar(id: string, at: P, step: number, labels: string[], o: { tone?: DiagramTone; title?: string } = {}): Part {
  const tone = o.tone ?? 'ink';
  const points: Record<string, P> = { [`${id}-a`]: at, [`${id}-b`]: [at[0] + step * (labels.length - 1), at[1]] };
  const items: DiagramItem[] = [{ kind: 'line', id: `${id}-bar`, from: `${id}-a`, to: `${id}-b`, tone, weight: 4, group: id }];
  const tick = 0.18 * step;
  labels.forEach((tex, i) => {
    const x = at[0] + step * i;
    Object.assign(points, { [`${id}-t${i}a`]: [x, at[1] - tick], [`${id}-t${i}b`]: [x, at[1] + tick], [`${id}-t${i}l`]: [x, at[1] - tick] });
    items.push(
      { kind: 'line', id: `${id}-t${i}`, from: `${id}-t${i}a`, to: `${id}-t${i}b`, tone, weight: 3, group: id },
      { kind: 'label', id: `${id}-l${i}`, at: `${id}-t${i}l`, tex, tone, place: 'below', group: id },
    );
  });
  if (o.title) {
    points[`${id}-title`] = [at[0] + (step * (labels.length - 1)) / 2, at[1] + tick];
    items.push({ kind: 'label', id: `${id}-tt`, at: `${id}-title`, tex: o.title, tone, place: 'above', group: id });
  }
  return { points, items };
}

/**
 * A smooth closed shape through `pts` (a lake), shaded. Part: `id` (a group: shading and edge).
 */
export function blob(id: string, pts: P[], tone: DiagramTone = 'adj'): Part {
  // A closed Catmull-Rom curve through the points.
  const points: Record<string, P> = {};
  const names: string[] = [];
  const k = pts.length;
  const steps = 8;
  for (let i = 0; i < k; i++) {
    const [p0, p1, p2, p3] = [pts[(i + k - 1) % k], pts[i], pts[(i + 1) % k], pts[(i + 2) % k]];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const c = (a: number, b: number, cc: number, d: number) => 0.5 * (2 * b + (-a + cc) * t + (2 * a - 5 * b + 4 * cc - d) * t2 + (-a + 3 * b - 3 * cc + d) * t3);
      const name = `${id}-${i}-${s}`;
      points[name] = [c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])];
      names.push(name);
    }
  }
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: names, tone, shade: 0.25, group: id },
      { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 2, group: id },
    ],
  };
}

/** A line from `a` to `b` as a figure part, with its own points: the part `id`. */
export function seg(id: string, a: P, b: P, o: { tone?: DiagramTone; label?: string; side?: 'left' | 'right'; at?: number; dashed?: boolean; weight?: number; group?: string; arrow?: boolean } = {}): Part {
  return {
    points: { [`${id}-a`]: a, [`${id}-b`]: b },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        ...(o.tone ? { tone: o.tone } : {}),
        ...(o.label ? { label: o.label, labelSide: o.side ?? 'left' } : {}),
        ...(o.at !== undefined ? { labelAt: o.at } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.weight ? { weight: o.weight } : {}),
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** An empty point that keeps room in a figure (for a label beside its edge): no part. */
export const room = (id: string, at: P): Part => ({ points: { [`room-${id}`]: at }, items: [] });

/** A place on a map or plan: a dot with its name (TeX) beside it. Part: `id`. */
export function spot(id: string, at: P, tex: string, place: Place = 'below', tone: DiagramTone = 'ink'): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place, dot: true, tone }] };
}
