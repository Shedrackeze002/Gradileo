/**
 * Figures for the second half of the gases videos (Grade 11 Chemistry, unit 2: the combined gas
 * law, Avogadro's law and molar volume, and the ideal gas law), built only from standard diagram
 * parts (lines, curves, shaded regions and labels), so each goes into a diagram with `figure`
 * (src/video/solids.ts). With a `name`, each part's id starts with it.
 *
 * - `tag`, `arrow` and `frame`: a label, an arrow, or two unused points that keep room for labels.
 * - `container`: a container of gas molecules (single atoms, two-atom molecules such as H₂ and O₂,
 *   or carbon dioxide's three atoms in a row), closed with a lid or with a movable piston.
 * - `weatherBalloon`: a small balloon near the ground and a much larger one high above it.
 * - `chain`: quantities in boxes in a row, joined by arrows that say what to do to get from one to
 *   the next (mass, moles and volume).
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** An arrow from one point to another, with an optional label beside its middle. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, tone: o.tone ?? 'ink', weight: o.weight ?? 3, ...(o.label ? { label: o.label, labelSide: o.labelSide ?? 'left' } : {}), ...(o.group ? { group: o.group } : {}) }],
  };
}

/** Two points that nothing uses, so the diagram keeps room for labels out to them. */
export function frame(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** Point names round a circle (or an ellipse, with `ry`), added to `points`, starting on the right. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 16, ry = r): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${key}-${j}`] = [c[0] + r * Math.cos(a), c[1] + ry * Math.sin(a)];
    return `${key}-${j}`;
  });
}

/** A filled circle with an edge, as two parts: the fill `id` and the edge `id-edge`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, shade: number, group: string) {
  const ids = ring(points, id, c, r);
  items.push(
    { kind: 'region', id, points: ids, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: tone === 'ink' ? 'muted' : tone, weight: 2, group },
  );
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

/** One atom of a molecule: its colour, radius and how solidly it is filled. */
interface Atom {
  tone: DiagramTone;
  r: number;
  shade?: number;
}

/**
 * How each molecule is drawn: its atoms in a row, touching. Hydrogen is small and pale, oxygen red,
 * nitrogen blue, carbon dark grey, helium yellow; `gas` is a plain particle of any gas.
 */
const MOLECULES: Record<string, Atom[]> = {
  gas: [{ tone: 'adj', r: 0.3 }],
  He: [{ tone: 'theta', r: 0.26 }],
  H2: [
    { tone: 'ink', r: 0.22, shade: 0.6 },
    { tone: 'ink', r: 0.22, shade: 0.6 },
  ],
  N2: [
    { tone: 'adj', r: 0.27 },
    { tone: 'adj', r: 0.27 },
  ],
  O2: [
    { tone: 'bad', r: 0.27 },
    { tone: 'bad', r: 0.27 },
  ],
  CO2: [
    { tone: 'bad', r: 0.26 },
    { tone: 'muted', r: 0.28, shade: 0.9 },
    { tone: 'bad', r: 0.26 },
  ],
};

export type MoleculeKind = keyof typeof MOLECULES;

/** Half the length of a molecule from end to end, for keeping molecules apart and inside the walls. */
function reach(atoms: Atom[]): number {
  const length = atoms.reduce((t, a) => t + 2 * a.r * 0.88, 0);
  return Math.max(length / 2, atoms[0].r);
}

/**
 * A container of gas: the walls and floor, `w` wide, with `at` the bottom left corner, closed by a
 * lid `h` above the floor or, with `lid: 'piston'`, by a movable piston at that height (a thick
 * bar with a rod up from its middle; the walls rise above it). Below the lid, `count` molecules of
 * one `molecule` kind are spread out with space between them, at random (the same way every time,
 * from `seed`), or at the given `spots` (measured from `at`), such as clumps of particles drawn by
 * hand. With `added`, the last `added.count` molecules are drawn in another colour, as gas just
 * let in.
 *
 * Parts: `box` (a group: the walls, floor and any lid), `piston` (a group: the bar and its rod),
 * and `p` (a group: the atoms of every molecule, `p0-0`, `p0-1`… for the first), or with `added`,
 * `p` for the molecules already there and `new` for the added ones.
 */
export function container(o: {
  name?: string;
  at?: P;
  w: number;
  h: number;
  lid?: 'closed' | 'piston' | 'open';
  molecule?: MoleculeKind;
  count: number;
  seed?: number;
  spots?: P[];
  added?: { count: number; tone: DiagramTone };
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const { w, h } = o;
  const lid = o.lid ?? 'closed';
  const atoms = MOLECULES[o.molecule ?? 'gas'];
  const wall = lid === 'piston' ? h + 1.1 : h;
  const points: Record<string, P> = {
    [n('c0')]: [x0, y0 + wall],
    [n('c1')]: [x0, y0],
    [n('c2')]: [x0 + w, y0],
    [n('c3')]: [x0 + w, y0 + wall],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('side-l'), from: n('c0'), to: n('c1'), weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('floor'), from: n('c1'), to: n('c2'), weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('side-r'), from: n('c2'), to: n('c3'), weight: 3, tone: 'muted', group: n('box') },
  ];
  if (lid === 'closed') items.push({ kind: 'line', id: n('lid'), from: n('c3'), to: n('c0'), weight: 3, tone: 'muted', group: n('box') });
  if (lid === 'piston') {
    const t = 0.12;
    Object.assign(points, {
      [n('pa')]: [x0 + 0.08, y0 + h + t],
      [n('pb')]: [x0 + w - 0.08, y0 + h + t],
      [n('ra')]: [x0 + w / 2, y0 + h + 2 * t],
      [n('rb')]: [x0 + w / 2, y0 + wall + 0.5],
      [n('ha')]: [x0 + w / 2 - 0.45, y0 + wall + 0.5],
      [n('hb')]: [x0 + w / 2 + 0.45, y0 + wall + 0.5],
    });
    items.push(
      { kind: 'line', id: n('bar'), from: n('pa'), to: n('pb'), weight: 9, tone: 'ink', group: n('piston') },
      { kind: 'line', id: n('rod'), from: n('ra'), to: n('rb'), weight: 4, tone: 'ink', group: n('piston') },
      { kind: 'line', id: n('handle'), from: n('ha'), to: n('hb'), weight: 6, tone: 'ink', group: n('piston') },
    );
  }

  // Where the molecules go: given spots, or spread out as far apart as they will go.
  const rand = random(o.seed ?? 7);
  const R = reach(atoms);
  const margin = R + 0.18;
  const top = lid === 'piston' ? h - 0.05 : h;
  let spots: P[] = (o.spots ?? []).map(([x, y]) => [x0 + x, y0 + y]);
  if (!o.spots) {
    const area = (w - 2 * margin) * (top - 2 * margin);
    // Start wide, with room for a molecule to turn between its neighbours, and if they do not all
    // fit, start again a little closer.
    for (let apart = Math.min(2.4, Math.max(2 * R + 0.35, Math.sqrt(area / o.count) * 1.2)); spots.length < o.count; apart *= 0.95) {
      spots = [];
      for (let tries = 0; spots.length < o.count && tries < 3000; tries++) {
        const p: P = [x0 + margin + rand() * (w - 2 * margin), y0 + margin + rand() * (top - 2 * margin)];
        if (spots.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) >= apart)) spots.push(p);
      }
    }
  }
  spots.forEach((c, i) => {
    const id = n(`p${i}`);
    const fresh = o.added !== undefined && i >= spots.length - o.added.count;
    const turn = rand() * Math.PI;
    const u: P = [Math.cos(turn), Math.sin(turn)];
    // The atoms in a row through the molecule's centre, each overlapping the next a little.
    const sizes = atoms.map((a) => a.r * 0.88);
    const total = sizes.reduce((t, s) => t + 2 * s, 0);
    let along = -total / 2;
    atoms.forEach((a, j) => {
      along += sizes[j];
      ball(points, items, `${id}-${j}`, [c[0] + u[0] * along, c[1] + u[1] * along], a.r, fresh ? o.added!.tone : a.tone, a.shade ?? 0.75, n(fresh ? 'new' : 'p'));
      along += sizes[j];
    });
  });
  return { points, items };
}

/**
 * A weather balloon twice: small, just above the ground, and much larger high above it, with an
 * arrow up beside them and a label to the right of each (TeX).
 *
 * Parts: `ground`, `low` and `high` (groups: each balloon, its knot and its string), `rise` (the
 * arrow), and the labels `low-label` and `high-label`.
 */
export function weatherBalloon(o: { name?: string; low: string; high: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = { [n('g0')]: [-1.6, 0], [n('g1')]: [8.6, 0] };
  const items: DiagramItem[] = [{ kind: 'thing', id: n('ground'), type: 'ground', at: n('g0') }];
  const one = (id: string, c: P, r: number) => {
    const ry = r * 1.15;
    const outline = ring(points, n(`${id}-o`), c, r, 32, ry);
    const knot: P = [c[0], c[1] - ry];
    Object.assign(points, {
      [n(`${id}-k0`)]: [knot[0] - 0.14, knot[1] - 0.2],
      [n(`${id}-k1`)]: [knot[0] + 0.14, knot[1] - 0.2],
      [n(`${id}-k2`)]: knot,
      [n(`${id}-s0`)]: [knot[0], knot[1] - 0.2],
      [n(`${id}-s1`)]: [knot[0] + 0.15, knot[1] - 0.6],
      [n(`${id}-s2`)]: [knot[0] - 0.12, knot[1] - 1.0],
      [n(`${id}-s3`)]: [knot[0] + 0.05, knot[1] - 1.4],
    });
    items.push(
      { kind: 'region', id: n(`${id}-fill`), points: outline, tone: 'adj', shade: 0.22, group: n(id) },
      { kind: 'curve', id: n(`${id}-edge`), points: outline, closed: true, tone: 'adj', weight: 3, group: n(id) },
      { kind: 'region', id: n(`${id}-knot`), points: [n(`${id}-k0`), n(`${id}-k1`), n(`${id}-k2`)], tone: 'adj', shade: 0.8, group: n(id) },
      { kind: 'curve', id: n(`${id}-string`), points: [n(`${id}-s0`), n(`${id}-s1`), n(`${id}-s2`), n(`${id}-s3`)], tone: 'muted', weight: 2, group: n(id) },
    );
  };
  one('low', [1.8, 2.3], 0.6);
  one('high', [1.8, 8.4], 1.7);
  Object.assign(points, { [n('up-a')]: [-0.7, 1.4], [n('up-b')]: [-0.7, 8.4], [n('lo-at')]: [2.6, 2.3], [n('hi-at')]: [3.7, 8.4] });
  items.push(
    { kind: 'line', id: n('rise'), from: n('up-a'), to: n('up-b'), arrow: true, tone: 'muted', weight: 3 },
    { kind: 'label', id: n('low-label'), at: n('lo-at'), tex: o.low, place: 'right' },
    { kind: 'label', id: n('high-label'), at: n('hi-at'), tex: o.high, place: 'right' },
  );
  return { points, items };
}

/** A box in a `chain`. */
export interface ChainNode {
  id: string;
  tex: string;
  tone?: DiagramTone;
  /** Written under the box, such as the value worked out ("0.5681\\ \\text{mol}"). */
  value?: string;
}

/** An arrow in a `chain`, from one box to the next or back. */
export interface ChainArrow {
  id: string;
  from: string;
  to: string;
  tex: string;
  tone?: DiagramTone;
}

/**
 * Quantities in boxes in a row, `gap` apart, joined by arrows that say how to get from one to the
 * next. An arrow to the right runs above the middle and is labelled above it; an arrow back to the
 * left runs below the middle and is labelled below it.
 *
 * Parts: each box by its `id` (a group: its outline, shading and label), its value `<id>-value`,
 * and each arrow by its `id`.
 */
export function chain(o: { name?: string; nodes: ChainNode[]; arrows: ChainArrow[]; width?: number; height?: number; gap?: number }): Part {
  const n = namer(o.name);
  const W = o.width ?? 3;
  const H = o.height ?? 1.5;
  const G = o.gap ?? 3.4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const index = new Map(o.nodes.map((nd, i) => [nd.id, i]));
  const left = (i: number) => i * (W + G);
  o.nodes.forEach((nd, i) => {
    const id = n(nd.id);
    const x = left(i);
    const tone = nd.tone ?? 'brand';
    const c = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`];
    Object.assign(points, { [c[0]]: [x, -H / 2], [c[1]]: [x + W, -H / 2], [c[2]]: [x + W, H / 2], [c[3]]: [x, H / 2], [`${id}-c`]: [x + W / 2, 0] });
    items.push({ kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.16, group: id });
    c.forEach((p, j) => items.push({ kind: 'line', id: `${id}-side${j}`, from: p, to: c[(j + 1) % 4], tone, weight: 2.5, group: id }));
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: nd.tex, place: 'center', group: id });
    if (nd.value) {
      points[`${id}-v`] = [x + W / 2, -H / 2 - 0.05];
      items.push({ kind: 'label', id: `${id}-value`, at: `${id}-v`, tex: nd.value, place: 'below', tone: 'good' });
    }
  });
  for (const a of o.arrows) {
    const i = index.get(a.from);
    const j = index.get(a.to);
    if (i === undefined || j === undefined) throw new Error(`chain: no box for arrow ${a.id}`);
    const forward = j > i;
    const dy = forward ? 0.3 : -0.3;
    const id = n(a.id);
    points[`${id}-s`] = [forward ? left(i) + W + 0.15 : left(i) - 0.15, dy];
    points[`${id}-e`] = [forward ? left(j) - 0.15 : left(j) + W + 0.15, dy];
    items.push({ kind: 'line', id, from: `${id}-s`, to: `${id}-e`, arrow: true, tone: a.tone ?? (forward ? 'theta' : 'opp'), weight: 3, label: a.tex, labelSide: 'left' });
  }
  return { points, items };
}
