/**
 * Figures for the first half of the Thermochemical Changes videos (Grade 12 Chemistry, unit 1,
 * lessons 1.1 to 1.4), built only from standard diagram parts (lines, curves, shaded regions and
 * labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `join`, `tag`, `line`, `arrow` and `room`: parts put together, a label, a line or an arrow at
 *   given points, and two unused points that keep space for labels.
 * - `cup`: a simple calorimeter, two nested polystyrene cups with a lid, a thermometer and a
 *   stirrer, holding a solution, with particles or a metal block in it and labels pointing at its
 *   parts.
 * - `beaker`: a small beaker of solution with a label under it.
 * - `systems`: an open, a closed and an isolated system side by side, with arrows for the matter
 *   and energy that cross each boundary.
 * - `flow`: a chemical system inside its surroundings, with energy flowing out (exothermic) or in
 *   (endothermic).
 * - `motionBox`: particles in a container, each with an arrow for its motion (longer when hotter).
 * - `levels`: an enthalpy diagram, the levels of the reactants and the products (and of atoms
 *   between them) on an enthalpy axis, with arrows between them; `twoLevels` draws the usual one,
 *   the reactants and the products with one arrow between them labelled with ΔH.
 * - `bomb`: a bomb calorimeter: an insulated jacket, a bucket of water, a steel bomb holding the
 *   sample, ignition wires and a thermometer.
 * - `burnerCan`: a burner heating a metal can of water, with heat escaping to the air.
 * - `pan`: a saucepan of water.
 * - `chain`: boxes joined by labelled arrows, for a calculation done in steps (mass to moles to
 *   energy).
 * - `hbars`: a bar graph lying on its side, a name to the left of each bar and its value at its
 *   end, with an optional dashed line marking a value across the bars.
 *
 * Energy released is orange and energy absorbed blue, and the substances studied are yellow, in
 * every video of the unit.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** A straight line between two points (an arrow with `arrow`). Part: its `id`. */
export function line(id: string, from: P, to: P, o: { tone?: DiagramTone; weight?: number; dashed?: boolean; arrow?: boolean; group?: string } = {}): Part {
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
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** An arrow from one point to another. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { tone?: DiagramTone; weight?: number; group?: string } = {}): Part {
  return line(id, from, to, { ...o, arrow: true });
}

/** Two points that nothing uses, so the diagram keeps room out to them (for the text of a label). */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** Draws into a figure being built: its points and parts, and helpers for shapes and labels. */
class Pen {
  points: Record<string, P> = {};
  items: DiagramItem[] = [];
  /** `n` names each point and part; `gn` names each group (the same way, unless given). */
  constructor(
    readonly n: (s: string) => string,
    readonly gn: (s: string) => string = n,
  ) {}
  pt(id: string, p: P) {
    this.points[this.n(id)] = p;
    return this.n(id);
  }
  seg(id: string, a: P, b: P, o: { tone?: DiagramTone; weight?: number; dashed?: boolean; arrow?: boolean; group?: string } = {}) {
    this.items.push({
      kind: 'line',
      id: this.n(id),
      from: this.pt(`${id}-a`, a),
      to: this.pt(`${id}-b`, b),
      tone: o.tone ?? 'ink',
      weight: o.weight ?? 3,
      ...(o.dashed ? { dashed: true } : {}),
      ...(o.arrow ? { arrow: true } : {}),
      ...(o.group ? { group: this.gn(o.group) } : {}),
    });
  }
  /** A closed shape through `pts`: a shaded region `id` (with `fill`, its opacity) and an outline `id-edge` (unless `edge` is false). */
  shape(id: string, pts: P[], o: { tone?: DiagramTone; fill?: number; edge?: boolean; edgeTone?: DiagramTone; weight?: number; group?: string } = {}) {
    const names = pts.map((p, i) => this.pt(`${id}-${i}`, p));
    const group = o.group ? { group: this.gn(o.group) } : {};
    if (o.fill) this.items.push({ kind: 'region', id: this.n(id), points: names, tone: o.tone ?? 'ink', shade: o.fill, ...group });
    if (o.edge !== false) this.items.push({ kind: 'curve', id: this.n(`${id}-edge`), points: names, closed: true, tone: o.edgeTone ?? o.tone ?? 'ink', weight: o.weight ?? 2.5, ...group });
  }
  rect(id: string, x0: number, y0: number, x1: number, y1: number, o: Parameters<Pen['shape']>[2] = {}) {
    this.shape(id, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], o);
  }
  circle(id: string, c: P, r: number, o: Parameters<Pen['shape']>[2] = {}) {
    this.shape(id, Array.from({ length: 18 }, (_, j): P => [c[0] + r * Math.cos((2 * Math.PI * j) / 18), c[1] + r * Math.sin((2 * Math.PI * j) / 18)]), o);
  }
  label(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}) {
    this.items.push({ kind: 'label', id: this.n(id), at: this.pt(`${id}-at`, at), tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: this.gn(o.group) } : {}) });
  }
  /** A label at `at` with a thin leader line from `from`: the group `id` (the line `id-lead` and the text `id-text`). */
  pointer(id: string, from: P, at: P, tex: string, place: Place = 'right', tone: DiagramTone = 'ink') {
    this.seg(`${id}-lead`, from, at, { tone: 'muted', weight: 1.5, group: id });
    // The text starts a little past the end of the leader line, so the two do not touch.
    const gap = place.includes('left') ? -0.15 : place.includes('right') ? 0.15 : 0;
    this.label(`${id}-text`, [at[0] + gap, at[1]], tex, { place, tone, group: id });
  }
  /** A thermometer whose bulb is at `bulb`, its tube up to `top`, red up to `reading`: the group `id`. */
  thermometer(id: string, bulb: P, top: number, reading: number) {
    const [x, y] = bulb;
    const h = 0.09;
    this.seg(`${id}-l`, [x - h, y + 0.17], [x - h, top], { weight: 2, group: id });
    this.seg(`${id}-r`, [x + h, y + 0.17], [x + h, top], { weight: 2, group: id });
    this.seg(`${id}-cap`, [x - h, top], [x + h, top], { weight: 2, group: id });
    this.circle(`${id}-bulb`, [x, y], 0.2, { tone: 'bad', fill: 0.85, edgeTone: 'ink', weight: 2, group: id });
    this.seg(`${id}-red`, [x, y], [x, reading], { tone: 'bad', weight: 4, group: id });
  }
  part(): Part {
    return { points: this.points, items: this.items };
  }
}

/** A kind of particle in a solution: small balls of one colour at given places (measured from the figure's `at`). */
export interface Dots {
  id: string;
  tone: DiagramTone;
  at: P[];
  r?: number;
}

/** A label pointing at a part of a figure: from a point on the part to where its text sits (both measured from the figure's `at`). */
export interface Pointer {
  id: string;
  from: P;
  to: P;
  tex: string;
  place?: Place;
  tone?: DiagramTone;
}

/**
 * A simple calorimeter: two nested polystyrene cups (4.6 tall, 3 across the bottom and 4 across
 * the top of the inner cup), a lid, a thermometer through the lid and a stirrer, holding a
 * solution up to `level` (3.3 by default). `at` is the middle of the inner cup's bottom. The
 * thermometer is red up to `reading`. `dots` puts particles in the solution, `block` a metal block
 * on the bottom, and `labels` points at the parts by name, with their text to the right (the
 * stirrer's to the left); `pointers` adds any other labels.
 *
 * Parts: `liquid`, `cups` (a group: both cups), `lid`, `thermometer` and `stirrer` (groups), each
 * kind of dot by its `id` (a group), `block` (a group), and each label by its name (a group: the
 * leader line and the text), such as `thermometer-tag`.
 */
export function cup(o: {
  name?: string;
  at?: P;
  level?: number;
  tone?: DiagramTone;
  reading?: number;
  lid?: boolean;
  stirrer?: boolean;
  dots?: Dots[];
  block?: { tone?: DiagramTone };
  labels?: Partial<Record<'thermometer' | 'lid' | 'cups' | 'liquid' | 'stirrer' | 'block' | 'air', string>>;
  pointers?: Pointer[];
}): Part {
  const pen = new Pen(namer(o.name));
  const c = o.at ?? [0, 0];
  const at = (p: P) => add(c, p);
  const level = o.level ?? 3.3;
  const half = (y: number) => 1.5 + (0.5 * y) / 4.6;
  const lid = o.lid ?? true;
  const L = o.labels ?? {};
  pen.shape('liquid', [at([-1.44, 0.06]), at([1.44, 0.06]), at([half(level) - 0.06, level]), at([-(half(level) - 0.06), level])], { tone: o.tone ?? 'adj', fill: 0.22, edge: false });
  // The polystyrene: a band between the outer and the inner cup.
  const OL = at([-2.2, 4.6]);
  const OB = at([-1.68, -0.2]);
  const OR = at([1.68, -0.2]);
  const OT = at([2.2, 4.6]);
  const IL = at([-2.0, 4.6]);
  const IB = at([-1.5, 0]);
  const IR = at([1.5, 0]);
  const IT = at([2.0, 4.6]);
  pen.shape('foam', [OL, OB, OR, OT, IT, IR, IB, IL], { tone: 'ink', fill: 0.12, edge: false, group: 'cups' });
  pen.seg('o-l', OL, OB, { weight: 2.5, group: 'cups' });
  pen.seg('o-b', OB, OR, { weight: 2.5, group: 'cups' });
  pen.seg('o-r', OR, OT, { weight: 2.5, group: 'cups' });
  pen.seg('i-l', IL, IB, { weight: 2, group: 'cups' });
  pen.seg('i-b', IB, IR, { weight: 2, group: 'cups' });
  pen.seg('i-r', IR, IT, { weight: 2, group: 'cups' });
  if (!lid) {
    pen.seg('rim-l', OL, IL, { weight: 2.5, group: 'cups' });
    pen.seg('rim-r', IT, OT, { weight: 2.5, group: 'cups' });
  }
  for (const d of o.dots ?? []) d.at.forEach((p, i) => pen.circle(`${d.id}${i}`, at(p), d.r ?? 0.17, { tone: d.tone, fill: 0.8, weight: 2, group: d.id }));
  if (o.block) pen.rect('block-body', ...at([-0.55, 0.06]), ...at([0.35, 0.72]), { tone: o.block.tone ?? 'opp', fill: 0.6, group: 'block' });
  if (lid) pen.rect('lid-body', ...at([-2.45, 4.6]), ...at([2.45, 5.0]), { tone: 'ink', fill: 0.2, group: 'lid' });
  if (o.stirrer ?? true) {
    pen.seg('stir-rod', at([-1.0, 0.42]), at([-1.0, 6.1]), { tone: 'muted', weight: 3, group: 'stirrer' });
    pen.seg('stir-ring', at([-1.35, 0.42]), at([-0.65, 0.42]), { tone: 'muted', weight: 3, group: 'stirrer' });
  }
  pen.thermometer('thermometer', at([0.75, 0.45]), c[1] + 6.6, c[1] + (o.reading ?? 3.6));
  const spots: Record<string, [P, P, Place]> = {
    thermometer: [[0.84, 6.2], [3.0, 6.8], 'right'],
    lid: [[2.45, 4.8], [3.0, 5.0], 'right'],
    cups: [[2.04, 3.2], [3.0, 3.4], 'right'],
    liquid: [[1.25, 1.7], [3.0, 1.8], 'right'],
    block: [[0.35, 0.4], [3.0, 0.5], 'right'],
    stirrer: [[-1.0, 5.8], [-2.8, 6.3], 'left'],
  };
  for (const [key, tex] of Object.entries(L)) {
    if (!tex) continue;
    if (key === 'air') {
      pen.label('air-tag', at([-1.9, 7.1]), tex, { tone: 'muted' });
      continue;
    }
    const [from, to, place] = spots[key];
    pen.pointer(`${key}-tag`, at(from), at(to), tex, place);
  }
  for (const p of o.pointers ?? []) pen.pointer(p.id, at(p.from), at(p.to), p.tex, p.place ?? 'right', p.tone ?? 'ink');
  return pen.part();
}

/**
 * A small beaker `w` wide and `h` tall (2.4 by 3 by default) with its bottom left corner at `at`,
 * filled to `level`, with its `label` (TeX) under it and a second line `sub` under that.
 *
 * Parts: the group `name` (the glass, the liquid and the labels).
 */
export function beaker(o: { name: string; at?: P; w?: number; h?: number; level?: number; tone?: DiagramTone; label?: string; sub?: string }): Part {
  // Every part is in one group, named `name` itself.
  const pen = new Pen(namer(o.name), (s) => s);
  const [x, y] = o.at ?? [0, 0];
  const W = o.w ?? 2.4;
  const H = o.h ?? 3;
  const g = o.name;
  pen.rect('liquid', x + 0.06, y + 0.06, x + W - 0.06, y + (o.level ?? H * 0.6), { tone: o.tone ?? 'adj', fill: 0.25, edge: false, group: g });
  pen.seg('lip-l', [x - 0.15, y + H + 0.12], [x, y + H], { group: g });
  pen.seg('side-l', [x, y + H], [x, y], { group: g });
  pen.seg('bottom', [x, y], [x + W, y], { group: g });
  pen.seg('side-r', [x + W, y], [x + W, y + H], { group: g });
  pen.seg('lip-r', [x + W, y + H], [x + W + 0.15, y + H + 0.12], { group: g });
  if (o.label) pen.label('label', [x + W / 2, y - 0.1], o.label, { place: 'below', group: g });
  if (o.sub) pen.label('sub', [x + W / 2, y - 1.1], o.sub, { place: 'below', tone: 'muted', group: g });
  return pen.part();
}

/**
 * An open, a closed and an isolated system side by side: a beaker open at the top with bubbles
 * of gas leaving it, the same beaker sealed with a stopper, and a sealed beaker inside insulated
 * walls. Each has its name under it and, in muted grey, what crosses its boundary.
 *
 * Parts: `open`, `closed` and `isolated` (groups: each container and its labels), `open-matter`
 * (a group: an arrow, the bubbles and the word "matter"), and `open-energy` and `closed-energy`
 * (groups: an arrow and the word "energy").
 */
export function systems(o: { name?: string } = {}): Part {
  const pen = new Pen(namer(o.name));
  const W = 3;
  const H = 3.2;
  const xs = { open: 0, closed: 6.2, isolated: 12.4 };
  const subs = { open: '\\text{matter and energy}', closed: '\\text{energy only}', isolated: '\\text{neither}' };
  for (const [key, x] of Object.entries(xs) as Array<[keyof typeof xs, number]>) {
    const g = key;
    if (key === 'isolated') {
      // Thick insulated walls all round, drawn as four shaded slabs.
      const t = 0.4;
      pen.rect('wall-l', x - 0.15 - t, -0.15 - t, x - 0.15, H + 0.55 + t, { tone: 'muted', fill: 0.45, weight: 2, group: g });
      pen.rect('wall-r', x + W + 0.15, -0.15 - t, x + W + 0.15 + t, H + 0.55 + t, { tone: 'muted', fill: 0.45, weight: 2, group: g });
      pen.rect('wall-b', x - 0.15, -0.15 - t, x + W + 0.15, -0.15, { tone: 'muted', fill: 0.45, weight: 2, group: g });
      pen.rect('wall-t', x - 0.15, H + 0.55, x + W + 0.15, H + 0.55 + t, { tone: 'muted', fill: 0.45, weight: 2, group: g });
    }
    pen.rect(`${key}-liquid`, x + 0.06, 0.06, x + W - 0.06, 1.7, { tone: 'adj', fill: 0.25, edge: false, group: g });
    pen.seg(`${key}-side-l`, [x, H], [x, 0], { group: g });
    pen.seg(`${key}-bottom`, [x, 0], [x + W, 0], { group: g });
    pen.seg(`${key}-side-r`, [x + W, 0], [x + W, H], { group: g });
    if (key !== 'open') pen.rect(`${key}-stopper`, x - 0.1, H, x + W + 0.1, H + 0.45, { tone: 'ink', fill: 0.3, group: g });
    pen.label(`${key}-name`, [x + W / 2, -0.7], `\\text{${key}}`, { place: 'below', group: g });
    pen.label(`${key}-sub`, [x + W / 2, -1.55], subs[key], { place: 'below', tone: 'muted', group: g });
  }
  // Gas leaving the open beaker, and energy leaving through the walls.
  [[0.9, 2.1], [1.15, 2.9], [0.8, 3.7]].forEach((p, i) => pen.circle(`bubble${i}`, p as P, 0.16, { tone: 'theta', fill: 0.5, weight: 2, group: 'open-matter' }));
  pen.seg('matter-arrow', [1.9, 2.0], [1.9, 4.6], { tone: 'theta', arrow: true, group: 'open-matter' });
  pen.label('matter-text', [1.9, 4.65], '\\text{matter}', { place: 'above', tone: 'theta', group: 'open-matter' });
  for (const key of ['open', 'closed'] as const) {
    const x = xs[key] + W + 0.3;
    pen.seg(`${key}-heat`, [x, 1.0], [x + 1.6, 1.0], { tone: 'opp', arrow: true, group: `${key}-energy` });
    pen.label(`${key}-heat-text`, [x + 0.8, 1.15], '\\text{energy}', { place: 'above', tone: 'opp', group: `${key}-energy` });
  }
  return pen.part();
}

/**
 * A chemical system (a box) inside its surroundings (a larger box), with four arrows of energy
 * leaving the system (`out`, exothermic, orange) or entering it (blue), centred on `at`. A `title`
 * sits above the surroundings, and a `note` under the word "surroundings".
 *
 * Parts (named with `name`): `box` (a group: both boxes and their names), `arrows` (a group: the
 * four arrows), `title` and `note`.
 */
export function flow(o: { name: string; at?: P; out: boolean; title?: string; note?: string; system?: string; surroundings?: string }): Part {
  const pen = new Pen(namer(o.name));
  const [cx, cy] = o.at ?? [0, 0];
  const at = (x: number, y: number): P => [cx + x, cy + y];
  pen.rect('surr', ...at(-3.9, -2.5), ...at(3.9, 2.5), { tone: 'muted', fill: 0.06, weight: 2, group: 'box' });
  pen.label('surr-text', at(0, -2.55), o.surroundings ?? '\\text{surroundings}', { place: 'below', tone: 'muted', group: 'box' });
  pen.rect('sys', ...at(-2.05, -0.75), ...at(2.05, 0.75), { tone: 'theta', fill: 0.22, group: 'box' });
  pen.label('sys-text', at(0, 0), o.system ?? '\\text{system}', { group: 'box' });
  const tone: DiagramTone = o.out ? 'opp' : 'adj';
  const spokes: Array<[P, P]> = [
    [at(2.2, 0), at(3.7, 0)],
    [at(-2.2, 0), at(-3.7, 0)],
    [at(0, 0.9), at(0, 2.2)],
    [at(0, -0.9), at(0, -2.2)],
  ];
  spokes.forEach(([a, b], i) => pen.seg(`arrow${i}`, o.out ? a : b, o.out ? b : a, { tone, arrow: true, weight: 3.5, group: 'arrows' }));
  if (o.title) pen.label('title', at(0, 2.6), o.title, { place: 'above', group: 'title' });
  if (o.note) pen.label('note', at(0, -3.7), o.note, { place: 'below', tone, group: 'note' });
  return pen.part();
}

/** The same numbers every time, from a seed (mulberry32). */
function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Particles in a container `size` across (6 by default) with its bottom left corner at `at`: a
 * 3 by 3 block of balls, nudged a little, each with an arrow `speed` long for its motion in a
 * direction chosen at random (the same every time, from `seed`), kept inside the container. The
 * `label` (TeX) sits under it.
 *
 * Parts (named with `name`): `box` (a group: the container and its label), `balls` and `arrows`
 * (groups).
 */
export function motionBox(o: { name: string; at?: P; size?: number; speed: number; seed?: number; tone?: DiagramTone; label?: string }): Part {
  const pen = new Pen(namer(o.name));
  const [x0, y0] = o.at ?? [0, 0];
  const S = o.size ?? 6;
  const rand = random(o.seed ?? 3);
  pen.seg('wall-l', [x0, y0 + S], [x0, y0], { tone: 'muted', group: 'box' });
  pen.seg('floor', [x0, y0], [x0 + S, y0], { tone: 'muted', group: 'box' });
  pen.seg('wall-r', [x0 + S, y0], [x0 + S, y0 + S], { tone: 'muted', group: 'box' });
  pen.seg('lid', [x0 + S, y0 + S], [x0, y0 + S], { tone: 'muted', group: 'box' });
  if (o.label) pen.label('label', [x0 + S / 2, y0 - 0.15], o.label, { place: 'below', group: 'box' });
  const r = 0.32;
  const cell = S / 3;
  for (let i = 0; i < 9; i++) {
    const c: P = [x0 + cell * ((i % 3) + 0.5) + (rand() - 0.5) * 0.5, y0 + cell * (Math.floor(i / 3) + 0.5) + (rand() - 0.5) * 0.5];
    pen.circle(`ball${i}`, c, r, { tone: o.tone ?? 'adj', fill: 0.7, weight: 2, group: 'balls' });
    // A direction that keeps the whole arrow inside the container.
    let a = rand() * 2 * Math.PI;
    for (let k = 0; k < 16; k++) {
      const e: P = [c[0] + Math.cos(a) * (r + o.speed + 0.15), c[1] + Math.sin(a) * (r + o.speed + 0.15)];
      if (e[0] > x0 + 0.1 && e[0] < x0 + S - 0.1 && e[1] > y0 + 0.1 && e[1] < y0 + S - 0.1) break;
      a += Math.PI / 8;
    }
    const d: P = [Math.cos(a), Math.sin(a)];
    pen.seg(`arrow${i}`, [c[0] + d[0] * (r + 0.05), c[1] + d[1] * (r + 0.05)], [c[0] + d[0] * (r + o.speed), c[1] + d[1] * (r + o.speed)], { tone: 'theta', weight: 2.5, arrow: true, group: 'arrows' });
  }
  return pen.part();
}

/** A level of an enthalpy diagram: a horizontal line at height `y` from `from` to `to`, with its substances (TeX) above its left end, or at `at`. */
export interface Level {
  id: string;
  y: number;
  from: number;
  to: number;
  tex?: string;
  at?: P;
  place?: Place;
  dashed?: boolean;
  tone?: DiagramTone;
}

/** An arrow between two levels of an enthalpy diagram, at `x` from height `from` to height `to`, with its label (TeX) to its right, or at `at`. */
export interface Step {
  id: string;
  x: number;
  from: number;
  to: number;
  tex?: string;
  at?: P;
  place?: Place;
  tone?: DiagramTone;
}

/**
 * An enthalpy diagram: a vertical enthalpy axis `height` tall (7 by default) at x = 0, titled
 * "Enthalpy, H" above its top, with `lines` for the levels of the substances and `steps`, arrows
 * from one level to another (orange when they point down, energy released; blue when they point
 * up, energy absorbed, unless a `tone` is given).
 *
 * Parts: `axis` (a group: the axis and its title), each level by its `id` (a group: the line and
 * its substances) and each step by its `id` (a group: the arrow and its label).
 */
export function levels(o: { name?: string; height?: number; title?: string; lines: Level[]; steps?: Step[] }): Part {
  const pen = new Pen(namer(o.name));
  const H = o.height ?? 7;
  pen.seg('axis-line', [0, 0], [0, H], { weight: 2.5, arrow: true, group: 'axis' });
  pen.label('axis-title', [0, H + 0.1], o.title ?? '\\text{Enthalpy, } H', { place: 'above', group: 'axis' });
  for (const l of o.lines) {
    pen.seg(`${l.id}-line`, [l.from, l.y], [l.to, l.y], { tone: l.tone ?? 'brand', weight: l.dashed ? 2 : 4, dashed: l.dashed, group: l.id });
    if (l.tex) pen.label(`${l.id}-tex`, l.at ?? [l.from + 0.1, l.y + 0.12], l.tex, { place: l.place ?? 'above right', group: l.id });
  }
  for (const s of o.steps ?? []) {
    const tone = s.tone ?? (s.to < s.from ? 'opp' : 'adj');
    pen.seg(`${s.id}-arrow`, [s.x, s.from], [s.x, s.to], { tone, weight: 3.5, arrow: true, group: s.id });
    if (s.tex) pen.label(`${s.id}-tex`, s.at ?? [s.x + 0.15, (s.from + s.to) / 2], s.tex, { place: s.place ?? 'right', tone, group: s.id });
  }
  return pen.part();
}

/**
 * The enthalpy diagram of a reaction, drawn the way the lessons draw it: the higher level at 5.2
 * and the lower at 1.6 on an axis 7 tall, the reactants above the products when `exo` (and below
 * them otherwise), each written above its line at the left, and an arrow near the right end from
 * the reactants to the products, labelled (TeX) to its left.
 *
 * Parts: `axis`, `r` (the reactants: the line and its substances), `p` (the products) and `dh`
 * (the arrow and its label).
 */
export function twoLevels(o: { name?: string; reactants: string; products: string; exo: boolean; label: string }): Part {
  const [hi, lo] = [5.2, 1.6];
  const [rY, pY] = o.exo ? [hi, lo] : [lo, hi];
  return levels({
    name: o.name,
    height: 7,
    lines: [
      { id: 'r', y: rY, from: 0.8, to: 9.6, tex: o.reactants },
      { id: 'p', y: pY, from: 0.8, to: 9.6, tex: o.products },
    ],
    steps: [{ id: 'dh', x: 9.0, from: rY, to: pY, tex: o.label, at: [8.7, (hi + lo) / 2], place: 'left' }],
  });
}

/**
 * A bomb calorimeter, with the middle of its base at x = 0: an insulated jacket, a bucket of water
 * inside it, the steel bomb (filled with oxygen) standing in the water with the sample in a small
 * dish, two ignition wires from the sample up through the lid, and a thermometer in the water.
 * `labels` names the parts, with their text to the right.
 *
 * Parts: `jacket`, `bucket` (a group: the bucket and the water), `bomb`, `sample`, `wires` and
 * `thermometer` (groups), and each label by its name, such as `bomb-tag`.
 */
export function bomb(o: { name?: string; labels?: Partial<Record<'jacket' | 'water' | 'bomb' | 'sample' | 'wires' | 'thermometer', string>> } = {}): Part {
  const pen = new Pen(namer(o.name));
  const t = 0.4;
  pen.rect('wall-l', -4, 0, -4 + t, 7.4, { tone: 'muted', fill: 0.4, weight: 2, group: 'jacket' });
  pen.rect('wall-r', 4 - t, 0, 4, 7.4, { tone: 'muted', fill: 0.4, weight: 2, group: 'jacket' });
  pen.rect('wall-b', -4 + t, 0, 4 - t, t, { tone: 'muted', fill: 0.4, weight: 2, group: 'jacket' });
  pen.rect('wall-t', -4 + t, 7.0, 4 - t, 7.4, { tone: 'muted', fill: 0.4, weight: 2, group: 'jacket' });
  pen.rect('water', -3.05, 0.75, 3.05, 5.7, { tone: 'adj', fill: 0.25, edge: false, group: 'bucket' });
  pen.seg('bucket-l', [-3.1, 6.3], [-3.1, 0.7], { group: 'bucket' });
  pen.seg('bucket-b', [-3.1, 0.7], [3.1, 0.7], { group: 'bucket' });
  pen.seg('bucket-r', [3.1, 0.7], [3.1, 6.3], { group: 'bucket' });
  pen.rect('steel', -1.3, 1.2, 1.3, 4.5, { tone: 'muted', fill: 0.55, edgeTone: 'ink', weight: 3, group: 'bomb' });
  pen.rect('cap', -1.55, 4.5, 1.55, 4.95, { tone: 'muted', fill: 0.75, edgeTone: 'ink', weight: 3, group: 'bomb' });
  pen.seg('dish', [-0.55, 1.75], [0.55, 1.75], { weight: 3, group: 'sample' });
  pen.rect('pellet', -0.3, 1.78, 0.3, 2.15, { tone: 'theta', fill: 0.85, group: 'sample' });
  pen.seg('wire-l', [-0.22, 2.15], [-0.22, 8.2], { tone: 'theta', weight: 2, group: 'wires' });
  pen.seg('wire-r', [0.22, 2.15], [0.22, 8.2], { tone: 'theta', weight: 2, group: 'wires' });
  pen.thermometer('thermometer', [2.2, 1.6], 8.2, 4.4);
  const L = o.labels ?? {};
  const spots: Record<string, [P, P]> = {
    wires: [[0.22, 8.0], [5.0, 9.3]],
    thermometer: [[2.29, 7.6], [5.0, 7.9]],
    bomb: [[1.55, 4.7], [5.0, 5.8]],
    water: [[2.7, 3.2], [5.0, 3.6]],
    sample: [[0.3, 2.0], [5.0, 1.8]],
    jacket: [[4.0, 0.25], [5.0, -0.1]],
  };
  for (const [key, tex] of Object.entries(L)) if (tex) pen.pointer(`${key}-tag`, spots[key][0], spots[key][1], tex);
  return pen.part();
}

/**
 * A burner heating a metal can of water, with the middle of the burner's base at x = 0: the
 * burner with its fuel and wick, the flame, the can and its water, and a thermometer in the water.
 * `labels` names the parts, with their text to the right; with `labels.loss`, two arrows of heat
 * escape to the air on the left, under that label.
 *
 * Parts: `burner`, `flame`, `can` (a group: the can and the water), `thermometer`, `loss` (a
 * group: the arrows and their label), and each label by its name, such as `can-tag`.
 */
export function burnerCan(o: { name?: string; labels?: Partial<Record<'burner' | 'flame' | 'can' | 'thermometer' | 'loss', string>> } = {}): Part {
  const pen = new Pen(namer(o.name));
  pen.shape('bottle', [[-1.0, 0], [1.0, 0], [1.0, 1.0], [0.35, 1.5], [-0.35, 1.5], [-1.0, 1.0]], { tone: 'ink', fill: 0.08, group: 'burner' });
  pen.rect('fuel', -0.94, 0.06, 0.94, 0.7, { tone: 'theta', fill: 0.3, edge: false, group: 'burner' });
  pen.seg('wick', [0, 1.5], [0, 1.9], { weight: 3, group: 'burner' });
  const flame: P[] = [[0, 1.85], [0.32, 2.05], [0.42, 2.4], [0.33, 2.75], [0.15, 3.0], [0, 3.2], [-0.15, 3.0], [-0.33, 2.75], [-0.42, 2.4], [-0.32, 2.05]];
  pen.shape('flame-body', flame, { tone: 'opp', fill: 0.75, edgeTone: 'theta', weight: 2, group: 'flame' });
  pen.rect('water', -1.74, 3.46, 1.74, 6.0, { tone: 'adj', fill: 0.25, edge: false, group: 'can' });
  pen.seg('can-l', [-1.8, 6.6], [-1.8, 3.4], { weight: 3, group: 'can' });
  pen.seg('can-b', [-1.8, 3.4], [1.8, 3.4], { weight: 3, group: 'can' });
  pen.seg('can-r', [1.8, 3.4], [1.8, 6.6], { weight: 3, group: 'can' });
  pen.thermometer('thermometer', [0.9, 3.85], 7.9, 5.2);
  const L = o.labels ?? {};
  if (L.loss) {
    pen.seg('loss0', [-0.55, 2.6], [-2.3, 2.2], { tone: 'bad', arrow: true, group: 'loss' });
    pen.seg('loss1', [-1.95, 4.4], [-3.0, 5.2], { tone: 'bad', arrow: true, group: 'loss' });
  }
  const spots: Record<string, [P, P]> = {
    thermometer: [[0.99, 7.4], [2.7, 7.6]],
    can: [[1.8, 4.8], [2.7, 5.1]],
    flame: [[0.42, 2.6], [2.7, 2.8]],
    burner: [[1.0, 0.6], [2.7, 0.8]],
  };
  for (const [key, tex] of Object.entries(L)) {
    if (!tex) continue;
    if (key === 'loss') pen.label('loss-text', [-3.1, 3.7], tex, { place: 'left', tone: 'bad', group: 'loss' });
    else pen.pointer(`${key}-tag`, spots[key][0], spots[key][1], tex);
  }
  return pen.part();
}

/**
 * A saucepan of water over a flame, the middle of its base at x = 0, with a handle to the right:
 * `water` (TeX) is written in the water, `metal` under the pan and `top` above it.
 *
 * Parts: `pan` (a group: the walls, the base and the handle, and the text under it), `water` (a
 * group: the water and its text), `flame` and `top`.
 */
export function pan(o: { name?: string; water?: string; metal?: string; top?: string } = {}): Part {
  const pen = new Pen(namer(o.name));
  pen.rect('water-body', -3.15, 0.1, 3.15, 2.9, { tone: 'adj', fill: 0.25, edge: false, group: 'water' });
  pen.seg('wall-l', [-3.2, 3.4], [-3.2, 0], { weight: 4.5, group: 'pan' });
  pen.seg('base', [-3.2, 0], [3.2, 0], { weight: 4.5, group: 'pan' });
  pen.seg('wall-r', [3.2, 0], [3.2, 3.4], { weight: 4.5, group: 'pan' });
  pen.rect('handle', 3.2, 2.95, 5.8, 3.3, { tone: 'muted', fill: 0.6, weight: 2, group: 'pan' });
  if (o.water) pen.label('water-text', [0, 1.5], o.water, { group: 'water' });
  if (o.metal) pen.label('metal-text', [0, -1.25], o.metal, { place: 'below', group: 'pan' });
  for (const [i, x] of [-1.8, 0, 1.8].entries()) {
    pen.shape(`flame${i}`, [[x, -0.95], [x + 0.25, -0.75], [x + 0.2, -0.45], [x, -0.2], [x - 0.2, -0.45], [x - 0.25, -0.75]], { tone: 'opp', fill: 0.7, edgeTone: 'theta', weight: 1.5, group: 'flame' });
  }
  if (o.top) pen.label('top', [0, 3.7], o.top, { place: 'above', group: 'top' });
  return pen.part();
}

/**
 * Boxes `w` by `h` (5 by 1.4 by default) holding TeX, joined in order by arrows labelled with
 * TeX: down the page when `vertical` (labels to the right of the arrows), otherwise across it
 * (labels above them, level with the tops of the boxes). `gap` is the length of each arrow's space (1.8 by default).
 *
 * Parts: `b0`, `b1`… (groups: each box and its text) and `a0`, `a1`… (groups: each arrow and its label).
 */
export function chain(o: { name?: string; boxes: string[]; arrows: string[]; vertical?: boolean; w?: number; h?: number; gap?: number; tones?: DiagramTone[] }): Part {
  const pen = new Pen(namer(o.name));
  const W = o.w ?? 5;
  const H = o.h ?? 1.4;
  const G = o.gap ?? 1.8;
  const centre = (i: number): P => (o.vertical ? [0, -i * (H + G)] : [i * (W + G), 0]);
  o.boxes.forEach((tex, i) => {
    const [x, y] = centre(i);
    const tone = o.tones?.[i] ?? 'brand';
    pen.rect(`box${i}`, x - W / 2, y - H / 2, x + W / 2, y + H / 2, { tone, fill: 0.16, weight: 2.5, group: `b${i}` });
    pen.label(`text${i}`, [x, y], tex, { group: `b${i}` });
  });
  o.arrows.forEach((tex, i) => {
    const [x, y] = centre(i);
    if (o.vertical) {
      pen.seg(`arrow${i}`, [x, y - H / 2 - 0.15], [x, y - H / 2 - G + 0.15], { tone: 'theta', arrow: true, group: `a${i}` });
      pen.label(`label${i}`, [x + 0.25, y - H / 2 - G / 2], tex, { place: 'right', tone: 'theta', group: `a${i}` });
    } else {
      pen.seg(`arrow${i}`, [x + W / 2 + 0.15, y], [x + W / 2 + G - 0.15, y], { tone: 'theta', arrow: true, group: `a${i}` });
      pen.label(`label${i}`, [x + W / 2 + G / 2, y + H / 2 + 0.05], tex, { place: 'above', tone: 'theta', group: `a${i}` });
    }
  });
  return pen.part();
}

/**
 * A bar graph on its side: a row for each bar, from the top down, `gap` apart (1.2 by default),
 * its name (text) to the left of an axis at x = 0, the bar `length` long (6 by default) for the
 * value `max`, and the value (TeX, `shown` or the number) at its end. `mark` draws a dashed line
 * up across the bars (down to row `to`) at a value, labelled above them. The names are not counted
 * in the figure's size, so give it `room` on the left for them.
 *
 * Parts: `axis`, `r0`, `r1`… (groups: each bar, its name and its value) and `mark` (a group: the
 * line and its label).
 */
export function hbars(o: {
  name?: string;
  rows: { label: string; value: number; shown?: string; tone?: DiagramTone }[];
  max: number;
  length?: number;
  gap?: number;
  tone?: DiagramTone;
  mark?: { value: number; tex: string; tone?: DiagramTone; /** The last row the line crosses (all of them by default). */ to?: number };
}): Part {
  const pen = new Pen(namer(o.name));
  const L = o.length ?? 6;
  const G = o.gap ?? 1.2;
  const k = L / o.max;
  const bottom = -(o.rows.length - 1) * G - 0.6;
  pen.seg('axis-line', [0, 0.6], [0, bottom], { tone: 'muted', weight: 2.5, group: 'axis' });
  o.rows.forEach((r, i) => {
    const y = -i * G;
    const tone = r.tone ?? o.tone ?? 'adj';
    const end = Math.max(r.value * k, 0.04);
    pen.rect(`bar${i}`, 0, y - 0.36, end, y + 0.36, { tone, fill: 0.55, weight: 2, group: `r${i}` });
    pen.label(`name${i}`, [-0.2, y], `\\text{${r.label}}`, { place: 'left', group: `r${i}` });
    pen.label(`value${i}`, [end + 0.15, y], r.shown ?? String(r.value), { place: 'right', group: `r${i}` });
  });
  if (o.mark) {
    const x = o.mark.value * k;
    const tone = o.mark.tone ?? 'theta';
    const end = o.mark.to === undefined ? bottom : -o.mark.to * G - 0.5;
    pen.seg('mark-line', [x, end], [x, 0.75], { tone, dashed: true, weight: 2.5, group: 'mark' });
    pen.label('mark-text', [x, 0.8], o.mark.tex, { place: 'above', tone, group: 'mark' });
  }
  return pen.part();
}
