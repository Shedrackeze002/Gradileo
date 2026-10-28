/**
 * Figures for the first half of the Chemical Equilibrium videos (Grade 12 Chemistry, unit 4,
 * lessons 4.1 to 4.4), built from standard diagram parts (lines, curves, shaded regions and
 * labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `timeGraph`: a concentration–time or rate–time graph, its curves drawn as polylines from
 *   points (`settle` makes the points of a curve that levels off), each with a label, and dashed
 *   upright lines (`marks`) at the times that matter, such as when equilibrium is reached.
 * - `rateArrows`: the forward and reverse reactions as two arrows, as long as their rates, at
 *   a few moments side by side (the start, later, at equilibrium).
 * - `vessel`: a container of liquid with gas above it, open (the gas escapes) or sealed (gas
 *   leaves the liquid and dissolves back).
 * - `saturated`: a sealed flask of saturated solution with solid at the bottom, and radioactive
 *   particles that start in the solid and later turn up in the solution.
 * - `pairEq`: an acid–base equation with each particle's role under it and a bracket joining
 *   each conjugate pair, one pair above the equation and one below, in matching colours.
 * - `ladder`: a particle between its conjugate acid and its conjugate base, with arrows that
 *   add or remove a proton.
 * - `tag`, `link`, `room` and `join`: a label, a line or arrow, two unused points that keep
 *   space, and several parts made into one; `showAll` lists what to show for all of a part.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { plane, polyline, type Plane } from '@/video/graph.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** A line from one point to another (an arrow with `arrow`), with an optional label (TeX) beside its middle. Part: its `id`. */
export function link(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number; arrow?: boolean; dashed?: boolean } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        tone: o.tone ?? 'ink',
        weight: o.weight ?? 3,
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.label ? { label: o.label, labelSide: o.labelSide ?? 'left' } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** Two points that nothing uses, so the diagram keeps room out to them. */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}-0`]: [x0, y0], [`${key}-1`]: [x1, y0], [`${key}-2`]: [x1, y1], [`${key}-3`]: [x0, y1] });
  return [0, 1, 2, 3].map((i) => `${key}-${i}`);
}

/** A dot (a particle) at a point, as a label with no text. */
function dot(points: Record<string, P>, id: string, at: P, tone: DiagramTone, group: string): DiagramItem {
  points[id] = at;
  return { kind: 'label', id, at: id, tex: '', dot: true, tone, place: 'center', group };
}

// ---------------------------------------------------------------------------- graphs against time

const r3 = (v: number) => Math.round(v * 1000) / 1000;

/**
 * The points of a curve that changes from `from` to `to` and levels off at `tEq`, then stays flat
 * until `tMax`, every `step` seconds: the same shape as the lesson's graphs (the change so far is
 * 1 − (1 − t/tEq)² of the whole change).
 */
export function settle(from: number, to: number, tEq: number, tMax: number, step = 2, start = 0): [number, number][] {
  const out: [number, number][] = [];
  for (let t = start; t <= tMax + 1e-9; t += step) {
    const u = t - start;
    const k = u >= tEq ? 1 : 1 - (1 - u / tEq) ** 2;
    out.push([r3(t), r3(from + (to - from) * k)]);
  }
  return out;
}

/** A curve on a time graph: its points, colour, and a label (TeX) beside the point `at`. */
export interface TimeCurve {
  id: string;
  points: [number, number][];
  tone: DiagramTone;
  label?: string;
  at?: P;
  place?: Place;
}

/**
 * A graph against time: a plane (`plane` in graph.ts), the curves as polylines, each curve's label
 * (the part `<id>-lab`), and dashed upright lines `marks` (the part by its `id`, with an optional
 * label at its top). With a `name`, every id starts with it.
 *
 * Parts: `grid`, `axes`, each curve `id` (a group), `<id>-lab`, each mark's `id` (a group).
 */
export function timeGraph(o: {
  name?: string;
  x: [number, number];
  y: [number, number];
  xStep: number;
  yStep: number;
  every?: number;
  width?: number;
  height?: number;
  titles: { x: string; y: string };
  curves: TimeCurve[];
  marks?: { id: string; x: number; tex?: string; tone?: DiagramTone }[];
  at?: P;
}): { part: Part; g: Plane } {
  const g = plane({ name: o.name, x: o.x, y: o.y, xStep: o.xStep, yStep: o.yStep, every: o.every, width: o.width ?? 8, height: o.height ?? 6, titles: o.titles, at: o.at });
  const parts: Part[] = [g];
  for (const m of o.marks ?? []) {
    const a = g.n(`${m.id}-a`);
    const b = g.n(`${m.id}-b`);
    const items: DiagramItem[] = [{ kind: 'line', id: g.n(`${m.id}-line`), from: a, to: b, dashed: true, tone: m.tone ?? 'muted', weight: 2.5, group: g.n(m.id) }];
    if (m.tex) items.push({ kind: 'label', id: g.n(`${m.id}-tex`), at: b, tex: m.tex, tone: m.tone ?? 'muted', place: 'above', group: g.n(m.id) });
    parts.push({ points: { [a]: g.map(m.x, o.y[0]), [b]: g.map(m.x, o.y[1]) }, items });
  }
  for (const c of o.curves) {
    parts.push(polyline(g, { id: c.id, points: c.points, tone: c.tone }));
    if (c.label && c.at) {
      const at = g.n(`${c.id}-lab`);
      parts.push({ points: { [at]: g.map(c.at[0], c.at[1]) }, items: [{ kind: 'label', id: at, at, tex: c.label, tone: c.tone, place: c.place ?? 'above' }] });
    }
  }
  return { part: join(parts), g };
}

// ---------------------------------------------------------------------------- the rates as arrows

/**
 * The forward reaction as an arrow to the right and the reverse reaction as an arrow to the left
 * under it, each as long as its rate (`fwd`, `rev` in any unit; 0 leaves the arrow out), at a few
 * moments side by side, each named by `label` (TeX) underneath. Each arrow is labelled "forward"
 * or "reverse" at the first moment it appears.
 *
 * Parts: each moment as a group `stage-<i>` (its arrows `fwd-<i>` and `rev-<i>`, and its label
 * `lab-<i>`).
 */
export function rateArrows(o: { name?: string; stages: { label: string; fwd: number; rev: number }[]; gap?: number; scale?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 5.5;
  const k = o.scale ?? 4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The first moment with each arrow names it.
  const fwdNamed = o.stages.findIndex((s) => s.fwd > 0);
  const revNamed = o.stages.findIndex((s) => s.rev > 0);
  o.stages.forEach((s, i) => {
    const x = i * gap;
    const group = n(`stage-${i}`);
    if (s.fwd > 0) {
      Object.assign(points, { [n(`f${i}a`)]: [x - (s.fwd * k) / 2, 1], [n(`f${i}b`)]: [x + (s.fwd * k) / 2, 1] });
      items.push({ kind: 'line', id: n(`fwd-${i}`), from: n(`f${i}a`), to: n(`f${i}b`), arrow: true, tone: 'adj', weight: 5, group, ...(i === fwdNamed ? { label: '\\text{forward}', labelSide: 'left' as const } : {}) });
    }
    if (s.rev > 0) {
      Object.assign(points, { [n(`r${i}a`)]: [x + (s.rev * k) / 2, 0], [n(`r${i}b`)]: [x - (s.rev * k) / 2, 0] });
      items.push({ kind: 'line', id: n(`rev-${i}`), from: n(`r${i}a`), to: n(`r${i}b`), arrow: true, tone: 'opp', weight: 5, group, ...(i === revNamed ? { label: '\\text{reverse}', labelSide: 'left' as const } : {}) });
    }
    points[n(`l${i}`)] = [x, -1.3];
    items.push({ kind: 'label', id: n(`lab-${i}`), at: n(`l${i}`), tex: s.label, place: 'below', tone: 'theta', group });
  });
  Object.assign(points, { [n('frame-a')]: [-gap / 2, -2], [n('frame-b')]: [(o.stages.length - 0.5) * gap, 1.8] });
  return { points, items };
}

// ---------------------------------------------------------------------------- containers

/**
 * A container of liquid with gas particles above it, `at` its bottom left corner, 4 wide and 5
 * tall: `open` (no lid; arrows carry the gas up and out) or sealed (a lid; one arrow carries gas
 * out of the liquid and one carries it back). `label` (TeX) sits underneath.
 *
 * Parts: `box` (a group: sides, floor and any lid), `liquid` (a group: the liquid and the
 * particles dissolved in it), `gas` (a group of particles above the liquid), `arrows` (a group)
 * and `label`.
 */
export function vessel(o: { name?: string; at?: P; open: boolean; label?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = 4;
  const H = 5;
  const L = 2.4;
  const tone = o.tone ?? 'theta';
  const points: Record<string, P> = {};
  const c = rect(points, n('c'), x0, y0, x0 + W, y0 + H);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('water'), points: rect(points, n('w'), x0, y0, x0 + W, y0 + L), tone: 'adj', shade: 0.28, group: n('liquid') },
    { kind: 'line', id: n('side-l'), from: c[3], to: c[0], weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('floor'), from: c[0], to: c[1], weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('side-r'), from: c[1], to: c[2], weight: 3, tone: 'muted', group: n('box') },
  ];
  if (!o.open) items.push({ kind: 'line', id: n('lid'), from: c[2], to: c[3], weight: 5, tone: 'ink', group: n('box') });
  // Dissolved gas in the liquid, and gas above it: fewer above an open glass, where it escapes.
  const inside: P[] = [[0.7, 0.6], [1.9, 1.2], [3.1, 0.5], [1.2, 1.9], [3.3, 1.7], [2.5, 0.4]];
  const above: P[] = o.open ? [[0.9, 3.3], [3.0, 4.2]] : [[0.8, 3.2], [2.0, 4.3], [3.2, 3.4], [1.3, 4.5], [3.0, 4.6]];
  inside.forEach(([x, y], i) => items.push(dot(points, n(`in${i}`), [x0 + x, y0 + y], tone, n('liquid'))));
  above.forEach(([x, y], i) => items.push(dot(points, n(`up${i}`), [x0 + x, y0 + y], tone, n('gas'))));
  if (o.open) {
    Object.assign(points, { [n('a1')]: [x0 + 1.6, y0 + L + 0.3], [n('a2')]: [x0 + 1.6, y0 + H + 1.2], [n('a3')]: [x0 + 2.6, y0 + L + 0.3], [n('a4')]: [x0 + 2.6, y0 + H + 1.2] });
    items.push(
      { kind: 'line', id: n('out1'), from: n('a1'), to: n('a2'), arrow: true, tone: 'bad', weight: 3, group: n('arrows') },
      { kind: 'line', id: n('out2'), from: n('a3'), to: n('a4'), arrow: true, tone: 'bad', weight: 3, group: n('arrows') },
    );
  } else {
    Object.assign(points, { [n('a1')]: [x0 + 1.6, y0 + L + 0.3], [n('a2')]: [x0 + 1.6, y0 + H - 0.9], [n('a3')]: [x0 + 2.6, y0 + H - 0.9], [n('a4')]: [x0 + 2.6, y0 + L + 0.3] });
    items.push(
      { kind: 'line', id: n('out1'), from: n('a1'), to: n('a2'), arrow: true, tone: 'good', weight: 3, group: n('arrows') },
      { kind: 'line', id: n('back1'), from: n('a3'), to: n('a4'), arrow: true, tone: 'good', weight: 3, group: n('arrows') },
    );
  }
  points[n('lab')] = [x0 + W / 2, y0 - 0.3];
  if (o.label) items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'below' });
  // Room above for the arrows out of an open glass, the same for both, so they line up.
  points[n('top')] = [x0 + W / 2, y0 + H + 1.4];
  return { points, items };
}

/**
 * A sealed flask of saturated solution (lead(II) iodide in the lesson) with yellow solid on the
 * bottom. Its ions are dots in the solution: positive orange, negative blue. Radioactive particles
 * (green) are first in a small heap of solid added on top, then (`hot-ions`) in the solution.
 *
 * Parts: `flask` (a group), `solution`, `solid`, `ions` (a group), `hot-solid` (a group: the added
 * heap and its radioactive particles), `hot-ions` (a group) and `key` (a label for the green dots).
 */
export function saturated(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const W = 6;
  const H = 5.4;
  const points: Record<string, P> = {};
  const c = rect(points, n('c'), 0, 0, W, H);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('solution'), points: rect(points, n('s'), 0, 0, W, 4.4), tone: 'adj', shade: 0.14 },
    { kind: 'line', id: n('side-l'), from: c[3], to: c[0], weight: 3, tone: 'muted', group: n('flask') },
    { kind: 'line', id: n('floor'), from: c[0], to: c[1], weight: 3, tone: 'muted', group: n('flask') },
    { kind: 'line', id: n('side-r'), from: c[1], to: c[2], weight: 3, tone: 'muted', group: n('flask') },
    { kind: 'line', id: n('lid'), from: c[2], to: c[3], weight: 5, tone: 'ink', group: n('flask') },
  ];
  // The solid: a low heap across the floor.
  const heap: P[] = [[0.3, 0], [5.7, 0], [5.3, 0.55], [4.2, 0.85], [3, 0.95], [1.8, 0.85], [0.7, 0.55]];
  heap.forEach((p, i) => (points[n(`h${i}`)] = p));
  items.push({ kind: 'region', id: n('solid'), points: heap.map((_, i) => n(`h${i}`)), tone: 'theta', shade: 0.55 });
  // A small heap of radioactive solid added on top of the rest, with green particles in it.
  const added: P[] = [[3.6, 0.92], [5.0, 0.6], [5.0, 1.15], [4.3, 1.45]];
  added.forEach((p, i) => (points[n(`a${i}`)] = p));
  items.push({ kind: 'region', id: n('added'), points: added.map((_, i) => n(`a${i}`)), tone: 'good', shade: 0.4, group: n('hot-solid') });
  [[4.2, 1.1], [4.65, 1.0]].forEach((p, i) => items.push(dot(points, n(`hs${i}`), p as P, 'good', n('hot-solid'))));
  // Ions in the solution: one lead ion for every two iodide ions.
  const plus: P[] = [[1.2, 2.2], [3.4, 3.6], [4.9, 2.1]];
  const minus: P[] = [[0.7, 3.4], [2.2, 1.6], [2.5, 3.0], [4.1, 2.6], [5.4, 3.5], [1.6, 4.0]];
  plus.forEach((p, i) => items.push(dot(points, n(`p${i}`), p, 'opp', n('ions'))));
  minus.forEach((p, i) => items.push(dot(points, n(`m${i}`), p, 'adj', n('ions'))));
  [[3.2, 2.0], [1.0, 1.4]].forEach((p, i) => items.push(dot(points, n(`hi${i}`), p as P, 'good', n('hot-ions'))));
  points[n('k')] = [W + 0.3, 1.2];
  items.push({ kind: 'label', id: n('key'), at: n('k'), tex: '\\text{radioactive}', tone: 'good', place: 'right' });
  points[n('room')] = [W + 3.2, H];
  return { points, items };
}

// ---------------------------------------------------------------------------- acids and bases

/**
 * An acid–base equation: four particles (TeX) with a plus sign between each two and an arrow
 * (`arrow`, TeX; ⇌ by default) in the middle, each particle's role (TeX) under it, and a bracket
 * joining each conjugate pair (`pairs`, by index; the first and fourth, and the second and third,
 * by default): the first pair above the equation (orange), the second below the roles (blue).
 * Particles and roles take their pair's colour.
 *
 * Parts: the particles `s0`…`s3`, `plus1`, `arrow`, `plus2`, the roles `r0`…`r3`, and the
 * brackets `pair1` and `pair2` (groups).
 */
export function pairEq(o: { name?: string; species: [string, string, string, string]; roles?: [string, string, string, string]; arrow?: string; gap?: number; pairs?: [[number, number], [number, number]] }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 4.6;
  const xs = [0, gap, 2 * gap + 1.4, 3 * gap + 1.4];
  const [p1, p2] = o.pairs ?? [[0, 3], [1, 2]];
  const tones: DiagramTone[] = xs.map((_, i) => (p1.includes(i) ? 'opp' : 'adj'));
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  xs.forEach((x, i) => {
    points[n(`s${i}`)] = [x, 0];
    items.push({ kind: 'label', id: n(`s${i}`), at: n(`s${i}`), tex: o.species[i], place: 'center', tone: tones[i] });
    if (o.roles) {
      points[n(`r${i}`)] = [x, -0.55];
      items.push({ kind: 'label', id: n(`r${i}`), at: n(`r${i}`), tex: o.roles[i], place: 'below', tone: tones[i] });
    }
  });
  Object.assign(points, { [n('plus1')]: [gap / 2, 0], [n('arrow')]: [(xs[1] + xs[2]) / 2, 0], [n('plus2')]: [(xs[2] + xs[3]) / 2, 0] });
  items.push(
    { kind: 'label', id: n('plus1'), at: n('plus1'), tex: '+', place: 'center' },
    { kind: 'label', id: n('arrow'), at: n('arrow'), tex: o.arrow ?? '\\rightleftharpoons', place: 'center' },
    { kind: 'label', id: n('plus2'), at: n('plus2'), tex: '+', place: 'center' },
  );
  // Brackets: legs from just past each particle (or its role) to a bar joining them.
  const bracket = (id: string, a: number, b: number, y0: number, y1: number, tone: DiagramTone) => {
    Object.assign(points, { [n(`${id}-0`)]: [a, y0], [n(`${id}-1`)]: [a, y1], [n(`${id}-2`)]: [b, y1], [n(`${id}-3`)]: [b, y0] });
    for (let i = 0; i < 3; i++) items.push({ kind: 'line', id: n(`${id}-l${i}`), from: n(`${id}-${i}`), to: n(`${id}-${i + 1}`), tone, weight: 3, group: n(id) });
  };
  bracket('pair1', xs[p1[0]], xs[p1[1]], 0.55, 1.25, 'opp');
  const low = o.roles ? -1.55 : -0.55;
  bracket('pair2', xs[p2[0]], xs[p2[1]], low, low - 0.6, 'adj');
  Object.assign(points, { [n('frame-a')]: [xs[0] - 1.2, low - 0.7], [n('frame-b')]: [xs[3] + 1.2, 1.4] });
  return { points, items };
}

/**
 * A particle (TeX) in the middle, its conjugate acid on the left and its conjugate base on the
 * right, with arrows between them: along the top, to the right, losing a proton ("−H⁺"); along the
 * bottom, to the left, gaining one ("+H⁺"). Names (TeX) sit under the outer particles.
 *
 * Parts: `acid`, `mid`, `base`, the arrows `lose1`, `lose2`, `gain1`, `gain2`, and the names
 * `acid-name` and `base-name`.
 */
export function ladder(o: { name?: string; acid: string; mid: string; base: string; acidName?: string; baseName?: string; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 5;
  const points: Record<string, P> = { [n('acid')]: [0, 0], [n('mid')]: [gap, 0], [n('base')]: [2 * gap, 0] };
  const items: DiagramItem[] = [
    { kind: 'label', id: n('acid'), at: n('acid'), tex: o.acid, place: 'center', tone: 'adj' },
    { kind: 'label', id: n('mid'), at: n('mid'), tex: o.mid, place: 'center', tone: 'theta' },
    { kind: 'label', id: n('base'), at: n('base'), tex: o.base, place: 'center', tone: 'opp' },
  ];
  const arrow = (id: string, from: number, to: number, y: number, label: string, tone: DiagramTone) => {
    Object.assign(points, { [n(`${id}-a`)]: [from, y], [n(`${id}-b`)]: [to, y] });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), arrow: true, tone, weight: 3, label, labelSide: 'left' });
  };
  const inset = 1.3;
  arrow('lose1', inset, gap - inset, 0.5, '-\\ce{H+}', 'opp');
  arrow('lose2', gap + inset, 2 * gap - inset, 0.5, '-\\ce{H+}', 'opp');
  arrow('gain1', gap - inset, inset, -0.5, '+\\ce{H+}', 'adj');
  arrow('gain2', 2 * gap - inset, gap + inset, -0.5, '+\\ce{H+}', 'adj');
  if (o.acidName) {
    points[n('an')] = [0, -1.5];
    items.push({ kind: 'label', id: n('acid-name'), at: n('an'), tex: o.acidName, place: 'below', tone: 'adj' });
  }
  if (o.baseName) {
    points[n('bn')] = [2 * gap, -1.5];
    items.push({ kind: 'label', id: n('base-name'), at: n('bn'), tex: o.baseName, place: 'below', tone: 'opp' });
  }
  Object.assign(points, { [n('frame-a')]: [-1.2, -2.2], [n('frame-b')]: [2 * gap + 1.2, 1.4] });
  return { points, items };
}

/** What to show for all of a part in diagram `fig`: each item's group, or its id when it has none. */
export function showAll(fig: string, part: Part): string[] {
  return [...new Set(part.items.map((it) => `${fig}.${it.group ?? it.id}`))];
}
