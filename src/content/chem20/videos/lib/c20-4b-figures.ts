/**
 * Figures for the second half of the Quantitative Relationships in Chemical Changes videos (Grade
 * 11 Chemistry, unit 4, lessons 4.5 to 4.8), built only from standard diagram parts (lines, curves,
 * shaded regions and labels) and the graph helpers, so each goes into a diagram with `figure`
 * (src/video/solids.ts):
 *
 * - `flow`: quantities in boxes in a row, joined by arrows that say how to get from one to the
 *   next (as in the first half of the unit).
 * - `crowd`: molecules drawn as balls (`mol`, `star`) in a box, for a mixture before and after a
 *   reaction, with the molecules in named groups.
 * - `massBar`: a total mass as a bar split into the parts that add up to it.
 * - `yieldBars`: a theoretical yield and an actual yield as two bars to the same scale.
 * - `beaker` and `filtration`: a beaker with a precipitate, and a precipitate on filter paper.
 * - `rig`: a burette over a conical flask, with its scale, tap, titrant and sample.
 * - `buretteScale`: a close-up of a burette's scale, with the meniscus and the eye-level line.
 * - `titrationCurve`: pH against the volume of titrant for the lesson's four titrations, worked
 *   out the way the lesson's graphs are, with the equivalence point, indicator ranges and the
 *   buffer region marked on it.
 * - `tag`, `link` and `room`: a label, a line or arrow, and two unused points that keep space.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, polyline } from '@/video/graph.ts';

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

/** Point names round a circle, added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}-0`]: [x0, y0], [`${key}-1`]: [x1, y0], [`${key}-2`]: [x1, y1], [`${key}-3`]: [x0, y1] });
  return [0, 1, 2, 3].map((i) => `${key}-${i}`);
}

/** Point names along a list of coordinates, added to `points`. */
function path(points: Record<string, P>, key: string, list: P[]): string[] {
  return list.map((p, i) => {
    points[`${key}-${i}`] = p;
    return `${key}-${i}`;
  });
}

// ---------------------------------------------------------------------------- quantities in boxes

export interface FlowNode {
  id: string;
  tex: string;
  tone?: DiagramTone;
  /** Written under the box, such as the value worked out ("0.50\\ \\text{mol}"). */
  value?: string;
}

export interface FlowArrow {
  id: string;
  from: string;
  to: string;
  tex: string;
  tone?: DiagramTone;
}

/**
 * Quantities in boxes in a row, `gap` apart, joined by arrows that say how to get from one to the
 * next. An arrow to the right is labelled above it. A node's `value` is written under its box.
 *
 * Parts: each node by its `id` (a group: its box, its shading and its label), its value
 * `<id>-value`, and each arrow by its `id`.
 */
export function flow(o: { name?: string; at?: P; nodes: FlowNode[]; arrows: FlowArrow[]; width?: number; height?: number; gap?: number }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 3;
  const H = o.height ?? 1.4;
  const G = o.gap ?? 3.4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const index = new Map(o.nodes.map((nd, i) => [nd.id, i]));
  const left = (i: number) => x0 + i * (W + G);
  o.nodes.forEach((nd, i) => {
    const id = n(nd.id);
    const x = left(i);
    const tone = nd.tone ?? 'brand';
    const c = rect(points, `${id}-box`, x, y0 - H / 2, x + W, y0 + H / 2);
    points[`${id}-c`] = [x + W / 2, y0];
    items.push({ kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.16, group: id });
    c.forEach((p, j) => items.push({ kind: 'line', id: `${id}-side${j}`, from: p, to: c[(j + 1) % 4], tone, weight: 2.5, group: id }));
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: nd.tex, place: 'center', group: id });
    if (nd.value) {
      points[`${id}-v`] = [x + W / 2, y0 - H / 2 - 0.05];
      items.push({ kind: 'label', id: `${id}-value`, at: `${id}-v`, tex: nd.value, place: 'below', tone: 'good' });
    }
  });
  for (const a of o.arrows) {
    const i = index.get(a.from);
    const j = index.get(a.to);
    if (i === undefined || j === undefined) throw new Error(`flow: no node for arrow ${a.id}`);
    const forward = j > i;
    const id = n(a.id);
    points[`${id}-s`] = [forward ? left(i) + W + 0.15 : left(i) - 0.15, y0];
    points[`${id}-e`] = [forward ? left(j) - 0.15 : left(j) + W + 0.15, y0];
    items.push({ kind: 'line', id, from: `${id}-s`, to: `${id}-e`, arrow: true, tone: a.tone ?? 'theta', weight: 3, label: a.tex, labelSide: 'left' });
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- molecules as balls

/** The colour and size of each element's atoms, the same in every video of the unit. */
export const ATOM: Record<string, { tone: DiagramTone; r: number }> = {
  H: { tone: 'adj', r: 0.36 },
  O: { tone: 'bad', r: 0.45 },
  C: { tone: 'muted', r: 0.45 },
  N: { tone: 'hyp', r: 0.45 },
  Cl: { tone: 'good', r: 0.5 },
  Al: { tone: 'theta', r: 0.5 },
  Na: { tone: 'brand', r: 0.5 },
};

/** One atom of a molecule: its symbol, where it sits (from the molecule's centre), its colour and size. */
interface Atom {
  sym: string;
  at: P;
  tone: DiagramTone;
  r: number;
}

/** A molecule (or a lone atom) as balls. */
export interface Mol {
  id: string;
  atoms: Atom[];
}

const look = (sym: string) => ATOM[sym] ?? { tone: 'brand' as DiagramTone, r: 0.45 };
const atom = (sym: string, at: P): Atom => ({ sym, at, ...look(sym) });

/** Atoms in a line, touching, centred on the molecule's centre: `mol('n2', ['N', 'N'])`. */
export function mol(id: string, syms: string[]): Mol {
  const rs = syms.map((s) => look(s).r);
  const xs: number[] = [];
  let x = 0;
  rs.forEach((r, i) => {
    if (i > 0) x += (rs[i - 1] + r) * 0.82;
    xs.push(x);
  });
  return { id, atoms: syms.map((s, i) => atom(s, [xs[i] - x / 2, 0])) };
}

/**
 * A centre atom with others round it, touching it, the first at the top and the rest spread evenly
 * clockwise: `star('nh3', 'N', ['H', 'H', 'H'])` is ammonia.
 */
export function star(id: string, centre: string, around: string[]): Mol {
  const rc = look(centre).r;
  const k = around.length;
  const atoms = [
    ...around.map((s, i) => {
      const a = Math.PI / 2 - (2 * Math.PI * i) / k;
      const d = (rc + look(s).r) * 0.95;
      return atom(s, [d * Math.cos(a), d * Math.sin(a)]);
    }),
    // The centre atom last, so it is drawn over the inner edges of the others.
    atom(centre, [0, 0]),
  ];
  return { id, atoms };
}

/** A ball: a shaded circle with an edge and a label in the middle, all in `group`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, tex: string, group: string) {
  const ids = ring(points, id, c, r);
  points[`${id}-c`] = c;
  items.push(
    { kind: 'region', id, points: ids, tone, shade: 0.55, group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, group },
    { kind: 'label', id: `${id}-sym`, at: `${id}-c`, tex, place: 'center', group },
  );
}

/** A molecule placed in a `crowd`: its centre, measured from the box's bottom left corner, and the group it belongs to. */
export interface Placed {
  mol: Mol;
  at: P;
  group: string;
}

/**
 * Molecules as balls in a box `w` wide and `h` tall, with its bottom left corner at `at`: a
 * mixture before or after a reaction. `title` (TeX) sits above the box and `caption` (TeX) below.
 *
 * Parts: `frame` (a group: the box and its title), `caption`, and each molecule's group by name (a
 * group holds every ball and symbol of its molecules).
 */
export function crowd(o: { name?: string; at?: P; w: number; h: number; title?: string; caption?: string; mols: Placed[] }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const c = rect(points, n('box'), x0, y0, x0 + o.w, y0 + o.h);
  c.forEach((p, j) => items.push({ kind: 'line', id: n(`side${j}`), from: p, to: c[(j + 1) % 4], tone: 'muted', weight: 2.5, group: n('frame') }));
  if (o.title) {
    points[n('title-at')] = [x0 + o.w / 2, y0 + o.h + 0.1];
    items.push({ kind: 'label', id: n('title'), at: n('title-at'), tex: o.title, place: 'above', group: n('frame') });
  }
  if (o.caption) {
    points[n('caption-at')] = [x0 + o.w / 2, y0 - 0.15];
    items.push({ kind: 'label', id: n('caption'), at: n('caption-at'), tex: o.caption, place: 'below', tone: 'theta' });
  }
  for (const pl of o.mols) {
    pl.mol.atoms.forEach((a, i) => ball(points, items, n(`${pl.mol.id}-${i}`), [x0 + pl.at[0] + a.at[0], y0 + pl.at[1] + a.at[1]], a.r, a.tone, `\\mathsf{${a.sym}}`, n(pl.group)));
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- masses and yields as bars

export interface MassPiece {
  id: string;
  /** Above the piece: what it is ("\\ce{CH4}"). */
  top: string;
  /** Below the piece: its mass ("16.0\\ \\text{g}"). */
  bottom: string;
  value: number;
  tone: DiagramTone;
}

/**
 * A total mass as a bar `length` long (12 by default) and `height` tall, split into pieces as long
 * as their shares of the mass (but never shorter than `least` of the bar, so a small piece keeps
 * room for its labels), with what each piece is above it and its mass below it. `total` (TeX) is
 * written at the right end and `title` (TeX) at the left; `at` is the bar's bottom left corner.
 *
 * Parts: each piece by its `id` (a group: its shading, its edge and its two labels), `total` and
 * `title`.
 */
export function massBar(o: { name?: string; at?: P; pieces: MassPiece[]; length?: number; height?: number; least?: number; total?: string; title?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const H = o.height ?? 1.1;
  const least = o.least ?? 0.16;
  const sum = o.pieces.reduce((s, p) => s + p.value, 0);
  // Shares, with small pieces raised to `least` and the rest scaled down to make room.
  const raw = o.pieces.map((p) => p.value / sum);
  const small = raw.map((f) => f < least);
  const fixed = small.filter(Boolean).length * least;
  const rest = raw.reduce((s, f, i) => s + (small[i] ? 0 : f), 0);
  const shares = raw.map((f, i) => (small[i] ? least : (f * (1 - fixed)) / rest));
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = x0;
  o.pieces.forEach((p, i) => {
    const id = n(p.id);
    const w = shares[i] * L;
    const c = rect(points, `${id}-r`, x, y0, x + w, y0 + H);
    Object.assign(points, { [`${id}-t`]: [x + w / 2, y0 + H + 0.05], [`${id}-b`]: [x + w / 2, y0 - 0.05] });
    items.push(
      { kind: 'region', id: `${id}-fill`, points: c, tone: p.tone, shade: 0.45, group: id },
      { kind: 'curve', id: `${id}-edge`, points: c, closed: true, tone: p.tone, weight: 2.5, group: id },
      { kind: 'label', id: `${id}-top`, at: `${id}-t`, tex: p.top, place: 'above', group: id },
      { kind: 'label', id: `${id}-bottom`, at: `${id}-b`, tex: p.bottom, place: 'below', group: id },
    );
    x += w;
  });
  if (o.total) {
    points[n('total-at')] = [x0 + L + 0.3, y0 + H / 2];
    items.push({ kind: 'label', id: n('total'), at: n('total-at'), tex: o.total, place: 'right', tone: 'good' });
  }
  if (o.title) {
    points[n('title-at')] = [x0 - 0.3, y0 + H / 2];
    items.push({ kind: 'label', id: n('title'), at: n('title-at'), tex: o.title, place: 'left' });
  }
  return { points, items };
}

/**
 * A theoretical yield and an actual yield as two bars to the same scale: the theoretical yield on
 * top, `length` long (9 by default), and the actual yield below it. Each bar has its name on the
 * left (`names`, TeX, with `nameRoom` units kept for them) and its mass (`values`, TeX) on the
 * right. A dashed line marks the end of the theoretical bar, 100%. When the actual yield is larger,
 * the part of its bar past the line is red, with `extra` (TeX) under it.
 *
 * Parts: `theo` and `actual` (groups: each bar, its name and its mass), `extra` (a group: the red
 * part and its label) and `full` (the dashed line and its label, 100%).
 */
export function yieldBars(o: { name?: string; theoretical: number; actual: number; values: [string, string]; names?: [string, string]; nameRoom?: number; extra?: string; length?: number }): Part {
  const n = namer(o.name);
  const L = o.length ?? 9;
  const k = L / o.theoretical;
  const H = 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const bar = (id: string, x0: number, x1: number, y: number, tone: DiagramTone, group: string) => {
    const c = rect(points, n(`${id}-r`), x0, y, x1, y + H);
    items.push({ kind: 'region', id: n(`${id}-fill`), points: c, tone, shade: 0.45, group }, { kind: 'curve', id: n(`${id}-edge`), points: c, closed: true, tone, weight: 2.5, group });
  };
  const [nameT, nameA] = o.names ?? ['\\text{theoretical}', '\\text{actual}'];
  const yT = 1.8;
  const aLen = o.actual * k;
  bar('theo', 0, L, yT, 'brand', n('theo'));
  bar('actual', 0, Math.min(aLen, L), 0, 'good', n('actual'));
  if (aLen > L) {
    bar('extra', L, aLen, 0, 'bad', n('extra'));
    points[n('extra-at')] = [(L + aLen) / 2, -0.1];
    items.push({ kind: 'label', id: n('extra-label'), at: n('extra-at'), tex: o.extra ?? '', place: 'below', tone: 'bad', group: n('extra') });
  }
  Object.assign(points, {
    [n('theo-name-at')]: [-0.3, yT + H / 2],
    [n('actual-name-at')]: [-0.3, H / 2],
    [n('theo-value-at')]: [L + 0.3, yT + H / 2],
    [n('actual-value-at')]: [Math.max(aLen, L) + 0.3, H / 2],
    [n('full-a')]: [L, -0.3],
    [n('full-b')]: [L, yT + H + 0.3],
  });
  items.push(
    { kind: 'label', id: n('theo-name'), at: n('theo-name-at'), tex: nameT, place: 'left', tone: 'brand', group: n('theo') },
    { kind: 'label', id: n('theo-value'), at: n('theo-value-at'), tex: o.values[0], place: 'right', tone: 'brand', group: n('theo') },
    { kind: 'label', id: n('actual-name'), at: n('actual-name-at'), tex: nameA, place: 'left', tone: 'good', group: n('actual') },
    { kind: 'label', id: n('actual-value'), at: n('actual-value-at'), tex: o.values[1], place: 'right', tone: 'good', group: n('actual') },
    { kind: 'line', id: n('full-line'), from: n('full-a'), to: n('full-b'), tone: 'muted', dashed: true, weight: 2, group: n('full') },
    { kind: 'label', id: n('full-label'), at: n('full-b'), tex: '100\\%', place: 'above', tone: 'muted', group: n('full') },
  );
  return join([{ points, items }, room(n('room'), [-(o.nameRoom ?? 4.2), aLen > L ? -1 : -0.4], [Math.max(aLen, L) + 2.8, yT + H + 1])]);
}

// ---------------------------------------------------------------------------- lab pictures

/**
 * A beaker `w` wide and `h` tall (3.6 by 4 by default) with its bottom left corner at `at`, filled
 * to `level` (three quarters of `h` by default) with a solution of colour `tone`. Its `label`
 * (TeX) sits under it. `ions` writes labels (TeX) at given places in the solution, measured from
 * the bottom left corner, and `solid` draws a low heap of precipitate on the bottom, `height` tall
 * (0.5 by default), with its name `solid.tex` beside it.
 *
 * Parts: `glass` (a group: the sides, bottom and lip), `liquid`, `label`, `solid` (a group: the
 * heap, its edge and its name), and each ion label by its `id` (in its `group`, if it has one).
 */
export function beaker(o: {
  name?: string;
  at?: P;
  w?: number;
  h?: number;
  level?: number;
  tone?: DiagramTone;
  label?: string;
  ions?: { id: string; at: P; tex: string; tone?: DiagramTone; group?: string }[];
  solid?: { tone?: DiagramTone; height?: number; tex?: string };
}): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.w ?? 3.6;
  const H = o.h ?? 4;
  const level = o.level ?? H * 0.75;
  const points: Record<string, P> = {
    [n('g0')]: [x - 0.2, y + H + 0.16],
    [n('g1')]: [x, y + H],
    [n('g2')]: [x, y],
    [n('g3')]: [x + W, y],
    [n('g4')]: [x + W, y + H],
    [n('g5')]: [x + W + 0.2, y + H + 0.16],
  };
  const inset = 0.07;
  const liquid = rect(points, n('liq'), x + inset, y + inset, x + W - inset, y + level);
  const items: DiagramItem[] = [{ kind: 'region', id: n('liquid'), points: liquid, tone: o.tone ?? 'adj', shade: 0.16 }];
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: n(`glass${i}`), from: n(`g${i}`), to: n(`g${i + 1}`), tone: 'ink', weight: 3, group: n('glass') });
  if (o.solid) {
    // The heap: a low dome along the bottom, short of the walls.
    const heap = o.solid.height ?? 0.5;
    const ids: string[] = [];
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points[n(`heap-${i}`)] = [x + 0.2 + t * (W - 0.4), y + inset + heap * Math.pow(Math.sin(Math.PI * t), 0.6)];
      ids.push(n(`heap-${i}`));
    }
    items.push(
      { kind: 'region', id: n('heap'), points: ids, tone: o.solid.tone ?? 'ink', shade: 0.7, group: n('solid') },
      { kind: 'curve', id: n('heap-edge'), points: ids, closed: true, tone: o.solid.tone ?? 'ink', weight: 2, group: n('solid') },
    );
    if (o.solid.tex) {
      points[n('solid-at')] = [x + W + 0.3, y + 0.3];
      items.push({ kind: 'label', id: n('solid-name'), at: n('solid-at'), tex: o.solid.tex, place: 'right', group: n('solid') });
    }
  }
  for (const ion of o.ions ?? []) {
    const id = n(ion.id);
    points[`${id}-at`] = [x + ion.at[0], y + ion.at[1]];
    items.push({ kind: 'label', id, at: `${id}-at`, tex: ion.tex, place: 'center', tone: ion.tone ?? 'ink', ...(ion.group ? { group: n(ion.group) } : {}) });
  }
  if (o.label) {
    points[n('label-at')] = [x + W / 2, y - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below' });
  }
  return { points, items };
}

/**
 * A precipitate caught on filter paper in a funnel, over a beaker that collects the filtrate. The
 * precipitate is named `solid` (TeX) and the filtrate `filtrate` (TeX), each beside it.
 *
 * Parts: `funnel` (a group: the cone and the stem), `paper` (the filter paper, dashed), `solid`
 * (a group: the precipitate, a pointer and its name), `beaker` (a group: the glass) and `filtrate`
 * (a group: the liquid in the beaker and its name).
 */
export function filtration(o: { name?: string; solid: string; filtrate: string }): Part {
  const n = namer(o.name);
  const pts: Record<string, P> = {
    cl: [-1.7, 4.6], cr: [1.7, 4.6], nl: [-0.22, 2.6], nr: [0.22, 2.6], sl: [-0.22, 1.2], sr: [0.22, 1.2],
    pl: [-1.45, 4.45], pt: [0, 2.85], pr: [1.45, 4.45],
    s0: [-0.72, 3.5], s1: [0, 2.95], s2: [0.72, 3.5], s3: [0.36, 3.6], s4: [-0.36, 3.6],
    b0: [-1.8, 1.8], b1: [-1.6, 1.6], b2: [-1.6, -1], b3: [1.6, -1], b4: [1.6, 1.6], b5: [1.8, 1.8],
    f0: [-1.53, -0.93], f1: [1.53, -0.93], f2: [1.53, 0.1], f3: [-1.53, 0.1],
    sp: [0.45, 3.3], sq: [2.2, 2.75], sn: [2.25, 2.75], fn: [1.85, -0.4],
  };
  const points: Record<string, P> = Object.fromEntries(Object.entries(pts).map(([k, v]) => [n(k), v]));
  const L = (id: string, a: string, b: string, group: string): DiagramItem => ({ kind: 'line', id: n(id), from: n(a), to: n(b), tone: 'ink', weight: 3, group: n(group) });
  const items: DiagramItem[] = [
    { kind: 'region', id: n('filtrate-fill'), points: ['f0', 'f1', 'f2', 'f3'].map(n), tone: 'adj', shade: 0.18, group: n('filtrate') },
    L('cone-l', 'cl', 'nl', 'funnel'),
    L('cone-r', 'cr', 'nr', 'funnel'),
    L('stem-l', 'nl', 'sl', 'funnel'),
    L('stem-r', 'nr', 'sr', 'funnel'),
    { kind: 'curve', id: n('paper'), points: ['pl', 'pt', 'pr'].map(n), tone: 'muted', weight: 2.5, dashed: true },
    { kind: 'region', id: n('solid-fill'), points: ['s0', 's1', 's2', 's3', 's4'].map(n), tone: 'ink', shade: 0.75, group: n('solid') },
    { kind: 'line', id: n('solid-pointer'), from: n('sp'), to: n('sq'), tone: 'muted', weight: 2, group: n('solid') },
    { kind: 'label', id: n('solid-name'), at: n('sn'), tex: o.solid, place: 'right', group: n('solid') },
    ...[0, 1, 2, 3, 4].map((i) => L(`glass${i}`, `b${i}`, `b${i + 1}`, 'beaker')),
    { kind: 'label', id: n('filtrate-name'), at: n('fn'), tex: o.filtrate, place: 'right', group: n('filtrate') },
  ];
  return { points, items };
}

/**
 * A burette held over a conical flask. The burette is a long tube of titrant (blue) with a scale
 * that reads downward, 0 at the top and 50 at the bottom, and a tap; a drop falls from its tip
 * into the neck of the flask. The flask holds the sample, clear, and the same sample turned pink
 * at the endpoint.
 *
 * Parts: `burette` (a group: the tube, tip and its name), `titrant` (a group: the liquid in the
 * burette and its name), `scale` (a group: the marks and the numbers 0 and 50), `tap` (a group:
 * the tap and its name), `drop`, `flask` (a group: the glass and its name), `sample` (a group: the
 * clear liquid and its name) and `pink` (the liquid turned pink).
 */
export function rig(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The flask: a cone from a wide base up to a narrow neck with a lip.
  const flask = path(points, n('fl'), [[-0.6, 3.1], [-0.45, 3.0], [-0.45, 2.3], [-1.8, 0], [1.8, 0], [0.45, 2.3], [0.45, 3.0], [0.6, 3.1]]);
  items.push({ kind: 'curve', id: n('flask-glass'), points: flask, tone: 'ink', weight: 3, group: n('flask') });
  // Its liquid, up to y = 0.9, where the flask is 1.27 wide each side.
  const liquid = path(points, n('liq'), [[-1.7, 0.07], [1.7, 0.07], [1.22, 0.9], [-1.22, 0.9]]);
  items.push({ kind: 'region', id: n('sample-fill'), points: liquid, tone: 'ink', shade: 0.12, group: n('sample') });
  items.push({ kind: 'region', id: n('pink'), points: liquid, tone: 'hyp', shade: 0.45 });
  // The burette: walls from y = 4.2 to 12.4, a taper, and the tip down into the neck of the flask.
  const tube = path(points, n('tb'), [[-0.3, 12.4], [-0.3, 4.2], [-0.1, 3.85], [-0.07, 2.75], [0.07, 2.75], [0.1, 3.85], [0.3, 4.2], [0.3, 12.4]]);
  items.push({ kind: 'curve', id: n('tube'), points: tube, tone: 'ink', weight: 3, group: n('burette') });
  const fill = path(points, n('tf'), [[-0.25, 4.25], [0.25, 4.25], [0.25, 11.6], [-0.25, 11.6]]);
  items.push({ kind: 'region', id: n('titrant-fill'), points: fill, tone: 'adj', shade: 0.3, group: n('titrant') });
  // The scale: a long mark every 10 mL and a short one between, 0 mL at y = 11.9 and 50 mL at 4.6.
  for (let i = 0; i <= 10; i++) {
    const y = 11.9 - (i * 7.3) / 10;
    Object.assign(points, { [n(`tk${i}a`)]: [-0.3, y], [n(`tk${i}b`)]: [i % 2 === 0 ? 0.05 : -0.1, y] });
    items.push({ kind: 'line', id: n(`tick${i}`), from: n(`tk${i}a`), to: n(`tk${i}b`), tone: 'ink', weight: 2, group: n('scale') });
  }
  Object.assign(points, { [n('zero-at')]: [-0.45, 11.9], [n('fifty-at')]: [-0.45, 4.6] });
  items.push(
    { kind: 'label', id: n('zero'), at: n('zero-at'), tex: '0', place: 'left', tone: 'theta', group: n('scale') },
    { kind: 'label', id: n('fifty'), at: n('fifty-at'), tex: '50', place: 'left', tone: 'theta', group: n('scale') },
  );
  // The tap: a small block across the stem with a handle.
  const tap = path(points, n('tp'), [[-0.55, 3.62], [0.55, 3.62], [0.55, 3.88], [-0.55, 3.88]]);
  items.push({ kind: 'region', id: n('tap-fill'), points: tap, tone: 'ink', shade: 0.75, group: n('tap') });
  // A drop just below the tip.
  const drop = ring(points, n('drop'), [0, 2.45], 0.1, 12);
  items.push({ kind: 'region', id: n('drop'), points: drop, tone: 'adj', shade: 0.9 });
  // Names, each with a short pointer.
  const name = (id: string, from: P, to: P, tex: string, group: string, tone: DiagramTone = 'ink') => {
    Object.assign(points, { [n(`${id}-p0`)]: from, [n(`${id}-p1`)]: to });
    items.push(
      { kind: 'line', id: n(`${id}-pointer`), from: n(`${id}-p0`), to: n(`${id}-p1`), tone: 'muted', weight: 2, group: n(group) },
      { kind: 'label', id: n(`${id}-name`), at: n(`${id}-p1`), tex, place: 'right', tone, group: n(group) },
    );
  };
  name('burette', [0.4, 10.6], [1.3, 10.6], '\\text{burette}', 'burette');
  name('titrant', [0.35, 8.2], [1.3, 8.2], '\\text{titrant}', 'titrant', 'adj');
  name('tap', [0.65, 3.75], [1.3, 3.75], '\\text{tap}', 'tap');
  name('flask', [1.2, 1.6], [2.0, 2.0], '\\text{conical flask}', 'flask');
  name('sample', [1.5, 0.45], [2.0, 0.45], '\\text{sample}', 'sample');
  return join([{ points, items }, room(n('room'), [-2, -0.2], [6.2, 12.6])]);
}

/**
 * A close-up of a burette's scale from about 17.6 mL to 20.4 mL: marks every 0.1 mL, longer at
 * each half and whole millilitre, with 18, 19 and 20 numbered beside the tube. The titrant's
 * surface curves down into a meniscus whose bottom is at `reading` (18.40 by default), and a
 * dashed line runs from it at eye level.
 *
 * Parts: `tube` (a group: the two walls), `scale` (a group: the marks and numbers), `liquid` (a
 * group: the titrant and the meniscus), `eye` (a group: the dashed line and "eye level") and
 * `value` (the reading, under the eye line).
 */
export function buretteScale(o: { name?: string; reading?: number; value?: string } = {}): Part {
  const n = namer(o.name);
  const reading = o.reading ?? 18.4;
  const W = 2.4;
  const top = 17.6;
  const y = (v: number) => 7 - (v - top) * 2.5;
  const points: Record<string, P> = {
    [n('wl0')]: [0, 0], [n('wl1')]: [0, 7.4], [n('wr0')]: [W, 0], [n('wr1')]: [W, 7.4],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('wall-l'), from: n('wl0'), to: n('wl1'), tone: 'ink', weight: 3, group: n('tube') },
    { kind: 'line', id: n('wall-r'), from: n('wr0'), to: n('wr1'), tone: 'ink', weight: 3, group: n('tube') },
  ];
  // The meniscus: a flat-bottomed curve from the walls down to the reading in the middle.
  const yr = y(reading);
  const men: P[] = [];
  for (let i = 0; i <= 20; i++) {
    const x = 0.06 + ((W - 0.12) * i) / 20;
    const t = (x - W / 2) / (W / 2 - 0.06);
    men.push([x, yr + 0.4 * Math.pow(t, 4)]);
  }
  const menIds = path(points, n('men'), men);
  const liquid = [...menIds, ...path(points, n('lq'), [[W - 0.06, 0.04], [0.06, 0.04]])];
  items.push(
    { kind: 'region', id: n('liquid-fill'), points: liquid, tone: 'adj', shade: 0.3, group: n('liquid') },
    { kind: 'curve', id: n('meniscus'), points: menIds, tone: 'adj', weight: 3, group: n('liquid') },
  );
  // Marks every 0.1 mL from 17.7 to 20.3 mL, on the left wall.
  for (let k = 1; k <= 27; k++) {
    const v = Number((top + k / 10).toFixed(1));
    const whole = Math.abs(v - Math.round(v)) < 1e-6;
    const half = !whole && Math.abs(v * 2 - Math.round(v * 2)) < 1e-6;
    Object.assign(points, { [n(`mk${k}a`)]: [0, y(v)], [n(`mk${k}b`)]: [whole ? 1.1 : half ? 0.75 : 0.45, y(v)] });
    items.push({ kind: 'line', id: n(`mark${k}`), from: n(`mk${k}a`), to: n(`mk${k}b`), tone: 'ink', weight: whole ? 2.5 : 1.5, group: n('scale') });
    if (whole) {
      points[n(`num${k}-at`)] = [-0.2, y(v)];
      items.push({ kind: 'label', id: n(`num${k}`), at: n(`num${k}-at`), tex: String(Math.round(v)), place: 'left', tone: 'theta', group: n('scale') });
    }
  }
  Object.assign(points, { [n('eye-a')]: [0.6, yr], [n('eye-b')]: [W + 1.2, yr], [n('eye-at')]: [W + 1.3, yr + 0.15], [n('value-at')]: [W + 1.3, yr - 0.15] });
  items.push(
    { kind: 'line', id: n('eye-line'), from: n('eye-a'), to: n('eye-b'), tone: 'theta', dashed: true, weight: 2, group: n('eye') },
    { kind: 'label', id: n('eye-name'), at: n('eye-at'), tex: '\\text{eye level}', place: 'above right', tone: 'theta', group: n('eye') },
    { kind: 'label', id: n('value'), at: n('value-at'), tex: o.value ?? '18.40\\ \\text{mL}', place: 'below right', tone: 'good' },
  );
  return join([{ points, items }, room(n('room'), [-1.4, 0], [W + 4.6, 7.6])]);
}

// ---------------------------------------------------------------------------- titration curves

/** The four titrations: a strong or weak acid titrated with a strong base, or a strong or weak base titrated with a strong acid. */
export type CurveKind = 'sa-sb' | 'wa-sb' | 'sb-sa' | 'wb-sa';

const KW = 1e-14;
/** Ka of acetic acid, and Kb of ammonia taken as the same, as in the lesson. */
const KA = 1.8e-5;

/**
 * The pH of 25.00 mL of 0.100 mol/L acid after `v` mL of 0.100 mol/L base (equivalence at 25 mL),
 * as in the lesson's graphs: a strong acid from the acid left over; a weak acid with Ka = 1.8 × 10⁻⁵
 * from √(Ka·c) at the start, the buffer equation before the equivalence point, and the acetate
 * ion's hydrolysis at it; and the excess base after it.
 */
function acidPh(v: number, weak: boolean): number {
  const nA = 0.1 * 25;
  const nB = 0.1 * v;
  const vt = 25 + v;
  if (Math.abs(nB - nA) < 1e-9) return weak ? 14 + Math.log10(Math.sqrt((KW / KA) * (nA / vt))) : 7;
  if (nB > nA) return 14 + Math.log10((nB - nA) / vt);
  if (!weak) return -Math.log10((nA - nB) / vt);
  if (nB === 0) return -Math.log10(Math.sqrt(KA * 0.1));
  return -Math.log10(KA) + Math.log10(nB / (nA - nB));
}

/** The pH after `v` mL of titrant; a base titrated with an acid is the mirror image about pH 7. */
export function curvePh(kind: CurveKind, v: number): number {
  const ph = acidPh(v, kind === 'wa-sb' || kind === 'wb-sa');
  return Math.min(14, Math.max(0, kind === 'sb-sa' || kind === 'wb-sa' ? 14 - ph : ph));
}

/** The lesson's points: every millilitre from 0 to 50 and closer together near 25 mL, pH to two decimal places, never turning back. */
export function curvePoints(kind: CurveKind): P[] {
  const xs = new Set<number>();
  for (let v = 0; v <= 50; v++) xs.add(v);
  for (const dv of [-0.5, -0.2, -0.05, 0.05, 0.2, 0.5]) xs.add(25 + dv);
  const pts = [...xs].sort((a, b) => a - b).map((v): P => [v, Math.round(curvePh(kind, v) * 100) / 100]);
  const rising = kind === 'sa-sb' || kind === 'wa-sb';
  for (let k = 1; k < pts.length; k++) if (rising ? pts[k][1] < pts[k - 1][1] : pts[k][1] > pts[k - 1][1]) pts[k][1] = pts[k - 1][1];
  return pts;
}

/** An indicator's colour-change range, from pH `lo` to `hi`, named `tex` at pH `at` (the middle of the range by default). */
export interface Band {
  id: string;
  lo: number;
  hi: number;
  tex: string;
  tone: DiagramTone;
  at?: number;
}

/**
 * A titration curve: pH (0 to 14) against the volume of titrant added (0 to 50 mL), `width` by
 * `height` diagram units (10 by 7.5 by default), for 25.00 mL of a 0.100 mol/L acid or base titrated
 * with a 0.100 mol/L strong base or acid, so the equivalence point is at 25 mL. The curve is drawn
 * on in three pieces: before the jump (to 24.5 mL), the steep part (24.5 to 25.5 mL) and after it.
 * `ref` adds a second curve in grey to compare with. `eq` marks the equivalence point, with dashed
 * lines down to the volume and across to the pH; `bands` shades indicators' colour-change ranges
 * across the graph, each named outside its right end (room is kept for the names); `buffer` shades
 * the buffer region, 5 to 20 mL.
 *
 * Parts: `grid`, `axes`, `curve` (a group of `curve-a`, `curve-b` and `curve-c`), `ref`, `eq` (a
 * group: the dot, its label and the dashed lines), each band by its id (a group: the shading and
 * the name), and `buffer` (a group: the shading and its name).
 */
export function titrationCurve(o: {
  name?: string;
  kind: CurveKind;
  /** The titrant's formula, for the volume axis ("NaOH"). */
  titrant: string;
  ref?: CurveKind;
  eq?: { tex: string; place?: Place };
  bands?: Band[];
  buffer?: boolean;
  width?: number;
  height?: number;
}): Part {
  const g = plane({
    name: o.name,
    x: [0, 50],
    y: [0, 14],
    xStep: 5,
    yStep: 2,
    width: o.width ?? 10,
    height: o.height ?? 7.5,
    titles: { x: `\\text{Volume of }\\ce{${o.titrant}}\\text{ added (mL)}`, y: '\\text{pH}' },
  });
  const parts: Part[] = [g];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Bands and the buffer region first, so the curves are drawn over them.
  for (const b of o.bands ?? []) {
    const ids = path(points, g.n(`${b.id}-r`), [g.map(0, b.lo), g.map(50, b.lo), g.map(50, b.hi), g.map(0, b.hi)]);
    points[g.n(`${b.id}-at`)] = g.map(51, b.at ?? (b.lo + b.hi) / 2);
    items.push(
      { kind: 'region', id: g.n(`${b.id}-fill`), points: ids, tone: b.tone, shade: 0.22, group: g.n(b.id) },
      { kind: 'label', id: g.n(`${b.id}-name`), at: g.n(`${b.id}-at`), tex: b.tex, place: 'right', tone: b.tone, group: g.n(b.id) },
    );
  }
  if (o.buffer) {
    const ids = path(points, g.n('buffer-r'), [g.map(5, 0), g.map(20, 0), g.map(20, 14), g.map(5, 14)]);
    points[g.n('buffer-at')] = g.map(12.5, 7);
    items.push(
      { kind: 'region', id: g.n('buffer-fill'), points: ids, tone: 'good', shade: 0.14, group: g.n('buffer') },
      { kind: 'label', id: g.n('buffer-name'), at: g.n('buffer-at'), tex: '\\text{buffer region}', place: 'center', tone: 'good', group: g.n('buffer') },
    );
  }
  const curve = (id: string, list: P[], tone: DiagramTone, group?: string) => {
    const ids = path(points, g.n(`${id}-p`), list.map(([x, y]) => g.map(x, y)));
    items.push({ kind: 'curve', id: g.n(id), points: ids, tone, weight: 4, ...(group ? { group: g.n(group) } : {}) });
  };
  if (o.ref) curve('ref', curvePoints(o.ref), 'muted');
  const pts = curvePoints(o.kind);
  curve('curve-a', pts.filter(([v]) => v <= 24.5), 'brand', 'curve');
  curve('curve-b', pts.filter(([v]) => v >= 24.5 && v <= 25.5), 'brand', 'curve');
  curve('curve-c', pts.filter(([v]) => v >= 25.5), 'brand', 'curve');
  parts.push({ points, items });
  if (o.eq) {
    const ph = pts.find(([v]) => v === 25)![1];
    const lines = polyline(g, { id: 'eq-lines', points: [[0, ph], [25, ph], [25, 0]], tone: 'theta', dashed: true });
    for (const it of lines.items) it.group = g.n('eq');
    parts.push(lines, dots(g, [{ id: 'eq-dot', x: 25, y: ph, tex: o.eq.tex, tone: 'theta', place: o.eq.place ?? 'right', group: 'eq' }]));
  }
  // Room for the axis titles and numbers, and for the names of the bands.
  parts.push(room(g.n('room'), g.map(-4, -2.4), g.map(o.bands?.length ? 82 : 52, 15)));
  return join(parts);
}
