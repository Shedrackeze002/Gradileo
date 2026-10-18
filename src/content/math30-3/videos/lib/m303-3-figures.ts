/**
 * Figures for the triangles, quadrilaterals and polygons videos, built only from standard diagram
 * parts (lines, curves, angles, labels and shaded regions), so each goes into a diagram with
 * `figure`:
 *
 * - `polygon`: any polygon through named corners, with its corner letters, angle marks, tick marks
 *   on equal sides, arrowheads on parallel sides, diagonals and right-angle marks.
 * - `regularCorners`: the corners of a regular polygon (flat side at the bottom by default).
 * - `fan`: a polygon split into triangles by every diagonal from one corner.
 * - `exteriors`: sides extended past their corners, with the exterior angles.
 * - `frame`: a frame shaped like a regular polygon, with its mitre joints.
 * - `mitreEnd`: one piece of a frame with its end cut at the mitre angle, beside a square cut.
 * - `spokes`: lines from the centre of a regular polygon to its corners, and one central triangle.
 * - `tileAt`: a regular polygon with one corner at a given point, for tiles meeting at a point.
 * - `caption`: a line of text (TeX) under a shape.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { facing } from '@/video/angles.ts';

type P = [number, number];

const namer = (name?: string) => (s: string) => (name ? `${name}-${s}` : s);
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const size = (a: P) => Math.hypot(a[0], a[1]);
const unit = (a: P): P => mul(a, 1 / (size(a) || 1));
const angleOf = (a: P) => (Math.atan2(a[1], a[0]) * 180) / Math.PI;
/** The unit vector in the direction `d` degrees, anticlockwise from the right. */
export const dir = (d: number): P => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)];

/** Several parts as one. */
export const join = (parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

/**
 * The corners of a regular polygon with `n` sides, anticlockwise, centred at `c`, with
 * circumradius `r` (or side length `side`), the first corner in the direction `start` (degrees)
 * from the centre: by default the bottom left corner of a flat bottom side.
 */
export function regularCorners(n: number, o: { c?: P; r?: number; side?: number; start?: number } = {}): P[] {
  const r = o.r ?? (o.side ? o.side / (2 * Math.sin(Math.PI / n)) : 2);
  const c = o.c ?? [0, 0];
  const start = o.start ?? -90 - 180 / n;
  return Array.from({ length: n }, (_, i) => add(c, mul(dir(start + (360 * i) / n), r)));
}

/** A label (TeX) with no dot at a point: a caption under a shape, a note. The part `id`. */
export function caption(o: { name?: string; id: string; at: P; tex: string; place?: Place; tone?: DiagramTone; group?: string }): Part {
  const n = namer(o.name);
  return { points: { [n(`${o.id}-at`)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: n(o.group) } : {}) }] };
}

export interface PolygonOptions {
  name?: string;
  /** The corners in order round the shape (either way round), by name. Sides are named by their two corners ("AB"). */
  corners: Record<string, P>;
  /** TeX for each corner's letter (its key by default), or `false` for no letters. */
  names?: Partial<Record<string, string>> | false;
  /** Where a corner's letter sits, instead of straight out from the middle of the shape. */
  namePlaces?: Partial<Record<string, Place>>;
  tone?: DiagramTone;
  /** The opacity of the shading inside (0.12 by default; 0 for none). */
  shade?: number;
  /** Interior angles to mark: the arc at a corner, between its two sides, with an optional label. */
  angles?: { at: string; label?: string; tone?: DiagramTone; id?: string; r?: number; labelDist?: number }[];
  /** Tick marks across the middle of sides ("AB": 1); equal sides get the same number. */
  ticks?: Record<string, number>;
  /** Arrowheads on sides ("AB": 1), pointing from the first corner to the second; parallel sides get the same number. */
  arrows?: Record<string, number>;
  /** Corners with a right-angle mark. */
  rights?: string[];
  /** Labels beside sides ("AB": "5\\text{ cm}"), outside the shape. */
  sides?: Record<string, string>;
  /** Diagonals (or any segments between corners): solid unless `dashed`. */
  diagonals?: { from: string; to: string; id?: string; tone?: DiagramTone; dashed?: boolean; label?: string; labelAt?: number; labelSide?: 'left' | 'right' }[];
  /** Put every part in this one group (a shape in a gallery; not prefixed with the name), instead of the groups below. */
  group?: string;
}

/**
 * A polygon through named corners. Parts (each id starts with `name-` when there is a name):
 * `shape` (a group: the shading `fill`, the sides `AB`, `BC`… and the right-angle marks `rA`…),
 * `names` (a group: the letters `nA`…), each angle by its id (`aA` unless set), `ticks` (a group:
 * the tick marks, `tAB0`…), `arrows` (a group: the arrowheads, `pAB0`…) and `diags` (a group: the
 * diagonals, `dAC` unless set). With `group`, every part is in that group instead.
 *
 * Tick marks and arrowheads are sized from the shape, so they look the same at any scale.
 */
export function polygon(o: PolygonOptions): Part {
  const n = namer(o.name);
  const keys = Object.keys(o.corners);
  const at = (k: string) => o.corners[k];
  const points: Record<string, P> = {};
  for (const k of keys) points[n(k)] = at(k);
  const items: DiagramItem[] = [];
  // `group` is used as given (not prefixed with the name), so captions can share it.
  const grp = (g: string) => o.group ?? n(g);
  const tone = o.tone ?? 'brand';
  const sides = keys.map((k, i) => [k, keys[(i + 1) % keys.length]] as const);
  const mid: P = mul(keys.reduce<P>((s, k) => add(s, at(k)), [0, 0]), 1 / keys.length);
  const xs = keys.map((k) => at(k)[0]);
  const ys = keys.map((k) => at(k)[1]);
  const big = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  const neighbours = (k: string): [string, string] => {
    const i = keys.indexOf(k);
    return [keys[(i + keys.length - 1) % keys.length], keys[(i + 1) % keys.length]];
  };

  if ((o.shade ?? 0.12) > 0) items.push({ kind: 'region', id: n('fill'), points: keys.map(n), tone, shade: o.shade ?? 0.12, group: grp('shape') });
  for (const [p, q] of sides) {
    const label = o.sides?.[`${p}${q}`];
    // A side's label sits outside the shape: on the side of the line away from its middle.
    const d = sub(at(q), at(p));
    const w = sub(mid, at(p));
    const side = d[0] * w[1] - d[1] * w[0] > 0 ? ('right' as const) : ('left' as const);
    items.push({ kind: 'line', id: n(`${p}${q}`), from: n(p), to: n(q), tone, ...(label ? { label, labelSide: side } : {}), group: grp('shape') });
  }
  for (const k of o.rights ?? []) {
    const [p, q] = neighbours(k);
    items.push({ kind: 'right', id: n(`r${k}`), at: n(k), from: n(p), to: n(q), group: grp('shape') });
  }
  for (const d of o.diagonals ?? []) {
    items.push({ kind: 'line', id: n(d.id ?? `d${d.from}${d.to}`), from: n(d.from), to: n(d.to), tone: d.tone ?? 'muted', weight: 2.5, ...(d.dashed ? { dashed: true } : {}), ...(d.label ? { label: d.label, ...(d.labelAt ? { labelAt: d.labelAt } : {}), ...(d.labelSide ? { labelSide: d.labelSide } : {}) } : {}), group: grp('diags') });
  }
  for (const a of o.angles ?? []) {
    const [p, q] = neighbours(a.at);
    items.push({ kind: 'angle', id: n(a.id ?? `a${a.at}`), at: n(a.at), from: n(p), to: n(q), tone: a.tone ?? 'theta', ...(a.label ? { label: a.label } : {}), ...(a.r ? { r: a.r } : {}), ...(a.labelDist ? { labelDist: a.labelDist } : {}), ...(o.group ? { group: o.group } : {}) });
  }
  // Tick marks and arrowheads; a side with both has its ticks a little before the middle and its
  // arrowheads a little after it.
  for (const [p, q] of sides) {
    const s = `${p}${q}`;
    const back = `${q}${p}`;
    const ticks = o.ticks?.[s] ?? o.ticks?.[back] ?? 0;
    const arrowsFwd = o.arrows?.[s] ?? 0;
    const arrowsBack = o.arrows?.[back] ?? 0;
    const arrows = arrowsFwd || arrowsBack;
    const [a, b] = arrowsBack ? [at(q), at(p)] : [at(p), at(q)];
    const along = unit(sub(b, a));
    const across: P = [-along[1], along[0]];
    const both = ticks > 0 && arrows > 0;
    const tickAt = add(at(p), mul(sub(at(q), at(p)), both ? 0.36 : 0.5));
    const tAlong = unit(sub(at(q), at(p)));
    const tAcross: P = [-tAlong[1], tAlong[0]];
    for (let i = 0; i < ticks; i++) {
      const c = add(tickAt, mul(tAlong, (i - (ticks - 1) / 2) * 0.035 * big));
      points[n(`t${s}${i}a`)] = add(c, mul(tAcross, 0.04 * big));
      points[n(`t${s}${i}b`)] = add(c, mul(tAcross, -0.04 * big));
      items.push({ kind: 'line', id: n(`t${s}${i}`), from: n(`t${s}${i}a`), to: n(`t${s}${i}b`), tone: 'opp', weight: 3, group: grp('ticks') });
    }
    // Measured from the side's first corner, like the ticks, whichever way the arrowheads point.
    const arrowAt = add(at(p), mul(sub(at(q), at(p)), both ? 0.64 : 0.5));
    const arm = 0.045 * big;
    for (let i = 0; i < arrows; i++) {
      const tip = add(arrowAt, mul(along, arm * 0.5 + (i - (arrows - 1) / 2) * 0.7 * arm));
      const tail = sub(tip, mul(along, arm));
      points[n(`p${s}${i}t`)] = tip;
      points[n(`p${s}${i}l`)] = add(tail, mul(across, 0.75 * arm));
      points[n(`p${s}${i}r`)] = add(tail, mul(across, -0.75 * arm));
      items.push({ kind: 'curve', id: n(`p${s}${i}`), points: [n(`p${s}${i}l`), n(`p${s}${i}t`), n(`p${s}${i}r`)], tone: 'adj', weight: 3, group: grp('arrows') });
    }
  }
  if (o.names !== false) {
    for (const k of keys) {
      const tex = (o.names && o.names[k]) ?? k;
      items.push({ kind: 'label', id: n(`n${k}`), at: n(k), tex, place: o.namePlaces?.[k] ?? facing(angleOf(sub(at(k), mid))), group: grp('names') });
    }
  }
  return { points, items };
}

/**
 * A segment from `from` to `to`, with arrowheads at its middle or at `at` (pointing toward `to`) to mark it
 * parallel to a side with as many; `size` is the size of the shape it goes with, so the arrowheads
 * match that shape's. Parts: `id` (a group: the line and its arrowheads).
 */
export function segment(o: { name?: string; id: string; from: P; to: P; tone?: DiagramTone; dashed?: boolean; arrows?: number; size: number; /** Where the arrowheads sit, 0 to 1 along it (0.5 by default). */ at?: number }): Part {
  const n = namer(o.name);
  const id = n(o.id);
  const points: Record<string, P> = { [`${id}-a`]: o.from, [`${id}-b`]: o.to };
  const items: DiagramItem[] = [{ kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone: o.tone ?? 'ink', weight: 3, ...(o.dashed ? { dashed: true } : {}), group: id }];
  const along = unit(sub(o.to, o.from));
  const across: P = [-along[1], along[0]];
  const arm = 0.045 * o.size;
  const middle = add(o.from, mul(sub(o.to, o.from), o.at ?? 0.5));
  for (let i = 0; i < (o.arrows ?? 0); i++) {
    const tip = add(middle, mul(along, arm * 0.5 + (i - ((o.arrows ?? 0) - 1) / 2) * 0.7 * arm));
    const tail = sub(tip, mul(along, arm));
    Object.assign(points, { [`${id}-p${i}t`]: tip, [`${id}-p${i}l`]: add(tail, mul(across, 0.75 * arm)), [`${id}-p${i}r`]: add(tail, mul(across, -0.75 * arm)) });
    items.push({ kind: 'curve', id: `${id}-p${i}`, points: [`${id}-p${i}l`, `${id}-p${i}t`, `${id}-p${i}r`], tone: 'adj', weight: 3, group: id });
  }
  return { points, items };
}

/**
 * `count` tick marks across the middle of the segment from `from` to `to` (half a diagonal, say),
 * to show it equal to others with as many; `size` is the size of the shape, as for `segment`.
 * Parts: `id` (a group of the marks).
 */
export function tickMarks(o: { name?: string; id: string; from: P; to: P; count: number; size: number }): Part {
  const n = namer(o.name);
  const id = n(o.id);
  const along = unit(sub(o.to, o.from));
  const across: P = [-along[1], along[0]];
  const middle = mul(add(o.from, o.to), 0.5);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) {
    const c = add(middle, mul(along, (i - (o.count - 1) / 2) * 0.035 * o.size));
    points[`${id}-${i}a`] = add(c, mul(across, 0.04 * o.size));
    points[`${id}-${i}b`] = add(c, mul(across, -0.04 * o.size));
    items.push({ kind: 'line', id: `${id}-${i}`, from: `${id}-${i}a`, to: `${id}-${i}b`, tone: 'opp', weight: 3, group: id });
  }
  return { points, items };
}

/**
 * A dot at a point with its name (TeX) beside it: the part `id`. With `nameAt`, the name is
 * centred at that point instead (to put it in the gap between two lines), and `id` is a group of
 * the dot and the name.
 */
export function dot(o: { name?: string; id: string; at: P; tex?: string; place?: Place; tone?: DiagramTone; group?: string; nameAt?: P }): Part {
  const n = namer(o.name);
  if (o.nameAt) {
    const g = n(o.id);
    return {
      points: { [g]: o.at, [`${g}-name-at`]: o.nameAt },
      items: [
        { kind: 'label', id: `${g}-dot`, at: g, tex: '', tone: o.tone ?? 'ink', dot: true, group: g },
        { kind: 'label', id: `${g}-name`, at: `${g}-name-at`, tex: o.tex ?? '', tone: o.tone ?? 'ink', place: 'center', group: g },
      ],
    };
  }
  return { points: { [n(o.id)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(o.id), tex: o.tex ?? '', place: o.place ?? 'above', tone: o.tone ?? 'ink', dot: true, ...(o.group ? { group: n(o.group) } : {}) }] };
}

/**
 * Dashed diagonals from corner `from` (an index) of a polygon, and the triangles they make,
 * shaded in turn and numbered. Parts: `diags` (a group: the diagonals `d2`…) and each triangle
 * `t1`, `t2`… (a group: the shading and its number).
 */
export function fan(o: { name?: string; corners: P[]; from?: number; numbers?: boolean }): Part {
  const n = namer(o.name);
  const N = o.corners.length;
  const f = o.from ?? 0;
  const v = (i: number) => n(`v${(f + i) % N}`);
  const points: Record<string, P> = {};
  o.corners.forEach((p, i) => (points[n(`v${i}`)] = p));
  const tones: DiagramTone[] = ['adj', 'opp', 'theta', 'good', 'hyp', 'brand'];
  const items: DiagramItem[] = [];
  for (let k = 1; k <= N - 2; k++) {
    const tri = [v(0), v(k), v(k + 1)];
    const g: P = mul(tri.map((t) => points[t]).reduce<P>((s, q) => add(s, q), [0, 0]), 1 / 3);
    points[n(`g${k}`)] = g;
    items.push({ kind: 'region', id: n(`t${k}-fill`), points: tri, tone: tones[(k - 1) % tones.length], shade: 0.28, group: n(`t${k}`) });
    if (o.numbers !== false) items.push({ kind: 'label', id: n(`t${k}-num`), at: n(`g${k}`), tex: String(k), place: 'center', group: n(`t${k}`) });
  }
  for (let k = 2; k <= N - 2; k++) items.push({ kind: 'line', id: n(`d${k}`), from: v(0), to: v(k), tone: 'muted', dashed: true, weight: 2.5, group: n('diags') });
  return { points, items };
}

/**
 * At each corner in `at` (indices into `corners`, which run anticlockwise), the side arriving at
 * the corner extended past it (dashed), and the exterior angle between the extension and the next
 * side, labelled `label`. With `interior`, also the interior angle at the corner, labelled.
 * Parts: each corner's `x<i>` (a group: the extension `xl<i>` and the angle `e<i>`) and `in<i>`.
 */
export function exteriors(o: { name?: string; corners: P[]; at: number[]; label?: string; interior?: string; ext?: number; r?: number; labelDist?: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const N = o.corners.length;
  const points: Record<string, P> = {};
  o.corners.forEach((p, i) => (points[n(`v${i}`)] = p));
  const span = Math.max(...o.corners.map((p) => size(sub(p, o.corners[0]))));
  const items: DiagramItem[] = [];
  for (const i of o.at) {
    const prev = o.corners[(i + N - 1) % N];
    const here = o.corners[i];
    points[n(`x${i}`)] = add(here, mul(unit(sub(here, prev)), (o.ext ?? 0.45) * span));
    items.push({ kind: 'line', id: n(`xl${i}`), from: n(`v${i}`), to: n(`x${i}`), tone: 'muted', dashed: true, weight: 2.5, group: n(`x${i}`) });
    items.push({ kind: 'angle', id: n(`e${i}`), at: n(`v${i}`), from: n(`x${i}`), to: n(`v${(i + 1) % N}`), tone: o.tone ?? 'opp', r: o.r ?? 34, ...(o.label ? { label: o.label } : {}), ...(o.labelDist ? { labelDist: o.labelDist } : {}), group: n(`x${i}`) });
    if (o.interior) items.push({ kind: 'angle', id: n(`in${i}`), at: n(`v${i}`), from: n(`v${(i + 1) % N}`), to: n(`v${(i + N - 1) % N}`), tone: 'theta', r: 40, label: o.interior });
  }
  return { points, items };
}

/**
 * A frame shaped like a regular polygon with `n` sides (a flat bottom), `width` thick: the outer
 * and inner outlines (the group `frame`), the mitre joints from each outer corner to the inner one
 * (the group `joints`, each `j<i>`), and the shading of the bottom piece `piece`. With `turn`, the
 * bottom outer edge is extended past the bottom right corner (`ext`, dashed) and the angle the
 * frame turns there is marked (`turn`, labelled). `c` is the centre.
 */
export function frame(o: { name?: string; n: number; r?: number; width?: number; turn?: string; c?: P }): Part {
  const nm = namer(o.name);
  const r = o.r ?? 3;
  const w = o.width ?? 0.55;
  const outer = regularCorners(o.n, { r, c: o.c });
  // The inner outline is the outer one moved in by the frame's width, measured square to the sides.
  const inner = regularCorners(o.n, { r: r - w / Math.cos(Math.PI / o.n), c: o.c });
  const points: Record<string, P> = {};
  outer.forEach((p, i) => (points[nm(`o${i}`)] = p));
  inner.forEach((p, i) => (points[nm(`i${i}`)] = p));
  const items: DiagramItem[] = [
    { kind: 'region', id: nm('piece'), points: [nm('o0'), nm('o1'), nm('i1'), nm('i0')], tone: 'theta', shade: 0.3 },
    { kind: 'region', id: nm('wood'), points: [...outer.map((_, i) => nm(`o${i}`)), nm('o0'), ...inner.map((_, i) => nm(`i${(o.n - i) % o.n}`)), nm('i0')], tone: 'opp', shade: 0.1, group: nm('frame') },
    { kind: 'curve', id: nm('outer'), points: outer.map((_, i) => nm(`o${i}`)), closed: true, tone: 'opp', weight: 3, group: nm('frame') },
    { kind: 'curve', id: nm('inner'), points: inner.map((_, i) => nm(`i${i}`)), closed: true, tone: 'opp', weight: 3, group: nm('frame') },
  ];
  outer.forEach((_, i) => items.push({ kind: 'line', id: nm(`j${i}`), from: nm(`o${i}`), to: nm(`i${i}`), tone: 'ink', weight: 2.5, group: nm('joints') }));
  if (o.turn !== undefined) {
    points[nm('x')] = add(outer[1], mul(unit(sub(outer[1], outer[0])), 0.55 * r));
    items.push(
      { kind: 'line', id: nm('ext'), from: nm('o1'), to: nm('x'), tone: 'muted', dashed: true, weight: 2.5 },
      { kind: 'angle', id: nm('turn'), at: nm('o1'), from: nm('x'), to: nm('o2'), tone: 'theta', r: 40, ...(o.turn ? { label: o.turn } : {}) },
    );
  }
  return { points, items };
}

/**
 * One straight piece of a frame, `length` long and `width` wide, lying along the bottom, with its
 * right end cut at `angle` degrees from a square cut, so the outer (bottom) edge is the longer one.
 * Parts: `piece` (a group: the outline and shading), `square` (the dashed square cut), `cut` (the
 * angled cut line) and `m` (the mitre angle between them, labelled `label`).
 */
export function mitreEnd(o: { name?: string; angle: number; length?: number; width?: number; label?: string; labelDist?: number; labelAt?: number; r?: number }): Part {
  const n = namer(o.name);
  const L = o.length ?? 6;
  const w = o.width ?? 2;
  const t = Math.tan((o.angle * Math.PI) / 180);
  const points: Record<string, P> = {
    [n('BL')]: [0, 0],
    [n('BR')]: [L, 0],
    [n('TR')]: [L - w * t, w],
    [n('TL')]: [w * t, w],
    [n('SQ')]: [L, w + 0.35 * w],
    [n('CT')]: [L - (w + 0.35 * w) * t, w + 0.35 * w],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: ['BL', 'BR', 'TR', 'TL'].map(n), tone: 'opp', shade: 0.2, group: n('piece') },
    { kind: 'curve', id: n('edge'), points: ['BL', 'BR', 'TR', 'TL'].map(n), closed: true, tone: 'opp', weight: 3, group: n('piece') },
    { kind: 'line', id: n('square'), from: n('BR'), to: n('SQ'), tone: 'muted', dashed: true, weight: 2.5 },
    { kind: 'line', id: n('cut'), from: n('BR'), to: n('CT'), tone: 'ink', weight: 3 },
    { kind: 'angle', id: n('m'), at: n('BR'), from: n('SQ'), to: n('CT'), tone: 'theta', r: o.r ?? 70, ...(o.label ? { label: o.label } : {}), ...(o.labelDist ? { labelDist: o.labelDist } : {}), ...(o.labelAt !== undefined ? { labelAt: o.labelAt } : {}) },
  ];
  return { points, items };
}

/**
 * A regular polygon with `n` sides and its centre `O`, with dashed lines from the centre to every
 * corner and one central triangle (on the top side) shaded. Parts: `shape` (a group: the
 * outline), `O` (the centre's dot), `spokes` (a group: the lines `s<i>`), `tri` (the shaded
 * triangle, with its two spokes `k0` and `k1` drawn solid), `c` (its central angle, labelled
 * `central`) and `b1`, `b2` (its angles at the outside corners, labelled `base` just outside the
 * triangle).
 */
export function spokes(o: { name?: string; n: number; r?: number; central?: string; base?: string }): Part {
  // The base angles' labels sit just outside the shaded triangle, in the sections beside it, so
  // they stay apart on a short top side.
  const out = { labelDist: 95 };
  const nm = namer(o.name);
  const v = regularCorners(o.n, { r: o.r ?? 3 });
  // The top side: the two highest corners, the right one first.
  const order = v.map((p, i) => [p, i] as const).sort((a, b) => b[0][1] - a[0][1] || b[0][0] - a[0][0]);
  const [i1, i2] = [order[0][1], order[1][1]];
  const points: Record<string, P> = { [nm('O')]: [0, 0] };
  v.forEach((p, i) => (points[nm(`v${i}`)] = p));
  const items: DiagramItem[] = [
    { kind: 'curve', id: nm('edge'), points: v.map((_, i) => nm(`v${i}`)), closed: true, tone: 'brand', group: nm('shape') },
    ...v.map((_, i): DiagramItem => ({ kind: 'line', id: nm(`s${i}`), from: nm('O'), to: nm(`v${i}`), tone: 'muted', dashed: true, weight: 2.5, group: nm('spokes') })),
    { kind: 'region', id: nm('tri-fill'), points: [nm('O'), nm(`v${i1}`), nm(`v${i2}`)], tone: 'theta', shade: 0.25, group: nm('tri') },
    { kind: 'line', id: nm('k0'), from: nm('O'), to: nm(`v${i1}`), tone: 'theta', weight: 3, group: nm('tri') },
    { kind: 'line', id: nm('k1'), from: nm('O'), to: nm(`v${i2}`), tone: 'theta', weight: 3, group: nm('tri') },
    { kind: 'angle', id: nm('c'), at: nm('O'), from: nm(`v${i1}`), to: nm(`v${i2}`), tone: 'theta', r: 40, ...(o.central ? { label: o.central } : {}) },
    { kind: 'angle', id: nm('b1'), at: nm(`v${i1}`), from: nm('O'), to: nm(`v${i2}`), tone: 'opp', r: 34, ...(o.base ? { label: o.base, labelAt: -0.5, ...out } : {}) },
    { kind: 'angle', id: nm('b2'), at: nm(`v${i2}`), from: nm(`v${i1}`), to: nm('O'), tone: 'opp', r: 34, ...(o.base ? { label: o.base, labelAt: 1.5, ...out } : {}) },
    { kind: 'label', id: nm('dot'), at: nm('O'), tex: '', tone: 'theta', dot: true, group: nm('O') },
  ];
  return { points, items };
}

/**
 * A regular polygon with `n` sides, each `side` long, with one corner at `at` and its interior
 * angle there opening anticlockwise from the direction `from` (degrees). Parts: `id` (a group: the
 * shading, the outline and, with `angle`, the interior angle at `at`, `id-a`, labelled).
 */
export function tileAt(o: { id: string; n: number; side?: number; at: P; from: number; tone?: DiagramTone; angle?: string; angleTone?: DiagramTone; shade?: number; r?: number }): Part {
  const s = o.side ?? 1;
  const interior = (180 * (o.n - 2)) / o.n;
  const R = s / (2 * Math.sin(Math.PI / o.n));
  const b = o.from + interior / 2;
  const c = add(o.at, mul(dir(b), R));
  const v = Array.from({ length: o.n }, (_, i) => add(c, mul(dir(b + 180 + (360 * i) / o.n), R)));
  const points: Record<string, P> = {};
  v.forEach((p, i) => (points[`${o.id}-v${i}`] = p));
  const ids = v.map((_, i) => `${o.id}-v${i}`);
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [
    { kind: 'region', id: `${o.id}-fill`, points: ids, tone, shade: o.shade ?? 0.2, group: o.id },
    { kind: 'curve', id: `${o.id}-edge`, points: ids, closed: true, tone, weight: 3, group: o.id },
  ];
  // The corner at `at` is v0; its neighbours are v1 and the last corner.
  if (o.angle !== undefined) items.push({ kind: 'angle', id: `${o.id}-a`, at: ids[0], from: ids[1], to: ids[o.n - 1], tone: o.angleTone ?? 'theta', r: o.r ?? 30, ...(o.angle ? { label: o.angle } : {}), group: o.id });
  return { points, items };
}
