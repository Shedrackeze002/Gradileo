/**
 * Figures for the second half of the Thermochemical Changes videos (Grade 12 Chemistry, unit 1,
 * lessons 1.5 to 1.7: Hess's law, enthalpies of formation, and activation energy and catalysts),
 * built only from standard diagram parts (lines, curves and labels), so each goes into a diagram
 * with `figure` (src/video/solids.ts):
 *
 * - `enthalpyLevels`: an enthalpy diagram with any number of levels: the enthalpy axis, each level
 *   as a line with its substances, and arrows between levels labelled with their enthalpy changes
 *   (an equation and its reverse, two routes to carbon dioxide, the route through the elements).
 * - `peDiagram`: a potential energy diagram with an energy scale in kJ, as the lesson draws it:
 *   the reactants, a hump to the activated complex and the products, with arrows for the
 *   activation energies of the forward and reverse reactions and for ΔH, and, with `catalyst`, a
 *   lower hump for the same reaction with a catalyst.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Which side of a vertical line, looking from `from` to `to`, puts its label east (to the right on screen). */
const sideFor = (from: P, to: P, side: 'east' | 'west'): 'left' | 'right' => {
  const down = to[1] < from[1];
  return side === 'east' ? (down ? 'left' : 'right') : down ? 'right' : 'left';
};

/** A level of an enthalpy diagram: a line from x `from` to `to` at height `y`, with its substances (TeX). */
export interface Level {
  id: string;
  y: number;
  from: number;
  to: number;
  tex: string;
  /** Where the label sits beside the left end of the line (`above right` by default). */
  place?: Place;
  /** Where along the line the label starts, instead of its left end. */
  labelX?: number;
}

/** An arrow between levels, labelled (TeX) on its `side`: east or west of it on the screen. */
export interface LevelArrow {
  id: string;
  from: P;
  to: P;
  tex?: string;
  tone?: DiagramTone;
  side?: 'east' | 'west';
  labelAt?: number;
}

/**
 * An enthalpy diagram: the enthalpy axis up the left (from 0 to `top`, at x = 0), the `levels`
 * (horizontal lines with their substances above them), `arrows` between them, and `notes`
 * (labels anywhere, such as "not to scale"). `room` keeps space out to a point, for a label that
 * reaches past the drawing.
 *
 * Parts: `axis` (a group: the axis and its title), each level by its id (a group: its line
 * `<id>-line` and its label `<id>-label`), each arrow by its id, and each note by its id.
 */
export function enthalpyLevels(o: {
  name?: string;
  top: number;
  title?: string;
  levels: Level[];
  arrows: LevelArrow[];
  notes?: Array<{ id: string; at: P; tex: string; tone?: DiagramTone; place?: Place }>;
  room?: P[];
}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = { [n('ax-a')]: [0, 0], [n('ax-b')]: [0, o.top] };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('axis-line'), from: n('ax-a'), to: n('ax-b'), arrow: true, tone: 'muted', weight: 2.5, group: n('axis') },
    { kind: 'label', id: n('axis-title'), at: n('ax-b'), tex: o.title ?? '\\text{Enthalpy, } H', tone: 'muted', place: 'above right', group: n('axis') },
  ];
  for (const l of o.levels) {
    Object.assign(points, { [n(`${l.id}-a`)]: [l.from, l.y], [n(`${l.id}-b`)]: [l.to, l.y], [n(`${l.id}-t`)]: [l.labelX ?? l.from, l.y] });
    items.push(
      { kind: 'line', id: n(`${l.id}-line`), from: n(`${l.id}-a`), to: n(`${l.id}-b`), tone: 'brand', weight: 3.5, group: n(l.id) },
      { kind: 'label', id: n(`${l.id}-label`), at: n(`${l.id}-t`), tex: l.tex, place: l.place ?? 'above right', group: n(l.id) },
    );
  }
  for (const a of o.arrows) {
    Object.assign(points, { [n(`${a.id}-a`)]: a.from, [n(`${a.id}-b`)]: a.to });
    items.push({
      kind: 'line',
      id: n(a.id),
      from: n(`${a.id}-a`),
      to: n(`${a.id}-b`),
      arrow: true,
      weight: 3,
      tone: a.tone ?? (a.to[1] < a.from[1] ? 'good' : 'bad'),
      ...(a.tex ? { label: a.tex, labelSide: sideFor(a.from, a.to, a.side ?? 'east'), ...(a.labelAt !== undefined ? { labelAt: a.labelAt } : {}) } : {}),
    });
  }
  for (const t of o.notes ?? []) {
    points[n(`${t.id}-at`)] = t.at;
    items.push({ kind: 'label', id: n(t.id), at: n(`${t.id}-at`), tex: t.tex, tone: t.tone ?? 'muted', place: t.place ?? 'center' });
  }
  (o.room ?? []).forEach((p, i) => (points[n(`room${i}`)] = p));
  return { points, items };
}

/** Where the curve of a potential energy diagram is flat and where it climbs, in steps of progress from 0 to 10. */
const FLAT_R = [0.4, 3.6] as const;
const PEAK_AT = 5;
const FLAT_P = [6.4, 9.6] as const;

/**
 * A potential energy diagram: potential energy up the side, numbered in kJ every `step` up to
 * `max` with faint grid lines every `grid` (a sketch with neither), and the reaction's progress
 * along the bottom. The curve is flat at the reactants' level, rises smoothly to the top of the
 * hump (the activated complex, at `peak`) and falls to the products' level. It is `width` wide
 * and `height` tall (10 by 8 diagram units) for `max`.
 *
 * Arrows (each with its label beside it, TeX in `labels`): `fwd`, the activation energy of the
 * forward reaction, from the reactants up to the top of the hump at `at.fwd` (3.2 along the
 * progress axis of 0 to 10), with a dashed line across from the top of the hump; `rev`, the
 * activation energy of the reverse reaction, from the products up to the top at `at.rev` (7.8, or
 * 6.9 for an endothermic reaction); and `dh`, from the reactants to the products at `at.dh` (1.4
 * for an exothermic reaction, 9.3 for an endothermic one), with a dashed line carrying the level it
 * needs across, so it never crosses the curve. `sides` puts each label east or west of its arrow,
 * and `places` moves the names of the levels. With `catalyst`, the
 * main curve turns grey and a green, lower hump reaches `catalyst`, with its own arrows `cat-fwd`
 * and `cat-rev`, and a key names the two curves.
 *
 * Parts: `axes` (a group: the axes, their titles and the scale), `grid` (a group), `curve`,
 * `reactants`, `products`, `complex` (a label above the top of the hump), `fwd`, `rev` and `dh`
 * (groups: each arrow and its dashed line), and with `catalyst`, `cat-curve`, `cat-fwd`,
 * `cat-rev`, and the key labels `no-cat` and `cat`.
 */
export function peDiagram(o: {
  name?: string;
  reactants: number;
  products: number;
  peak: number;
  max: number;
  step?: number;
  grid?: number;
  width?: number;
  height?: number;
  catalyst?: number;
  labels?: { fwd?: string; rev?: string; dh?: string; catFwd?: string; catRev?: string; complex?: string; y?: string; reactants?: string; products?: string };
  at?: { fwd?: number; rev?: number; dh?: number };
  sides?: { fwd?: 'east' | 'west'; rev?: 'east' | 'west'; dh?: 'east' | 'west' };
  places?: { reactants?: Place; products?: Place };
}): Part {
  const n = namer(o.name);
  const W = o.width ?? 10;
  const H = o.height ?? 8;
  const L = o.labels ?? {};
  const X = (u: number) => (u * W) / 10;
  const Y = (kJ: number) => (kJ * H) / o.max;
  const pt = (u: number, kJ: number): P => [X(u), Y(kJ)];
  const exo = o.products < o.reactants;
  const points: Record<string, P> = {
    [n('o')]: [0, 0],
    [n('xe')]: [X(10.3), 0],
    [n('ye')]: [0, Y(o.max) + 0.5],
    [n('xt')]: [X(5), 0],
  };
  const items: DiagramItem[] = [];
  // Faint grid lines first, so everything else is drawn over them.
  if (o.grid) {
    for (let v = o.grid; v <= o.max + 1e-9; v += o.grid) {
      Object.assign(points, { [n(`g${v}a`)]: [0, Y(v)], [n(`g${v}b`)]: [X(10.3), Y(v)] });
      items.push({ kind: 'line', id: n(`grid${v}`), from: n(`g${v}a`), to: n(`g${v}b`), tone: 'muted', weight: 1, group: n('grid') });
    }
  }
  items.push(
    { kind: 'line', id: n('x-axis'), from: n('o'), to: n('xe'), weight: 2.5, arrow: true, group: n('axes') },
    { kind: 'line', id: n('y-axis'), from: n('o'), to: n('ye'), weight: 2.5, arrow: true, group: n('axes') },
    { kind: 'label', id: n('x-title'), at: n('xt'), tex: '\\text{Reaction progress}', place: 'below', tone: 'muted', group: n('axes') },
    { kind: 'label', id: n('y-title'), at: n('ye'), tex: L.y ?? (o.step ? '\\text{Potential energy (kJ)}' : '\\text{Potential energy}'), place: 'above right', tone: 'muted', group: n('axes') },
  );
  if (o.step) {
    for (let v = 0; v <= o.max + 1e-9; v += o.step) {
      Object.assign(points, { [n(`t${v}a`)]: [-0.18, Y(v)], [n(`t${v}b`)]: [0, Y(v)] });
      items.push(
        { kind: 'line', id: n(`tick${v}`), from: n(`t${v}a`), to: n(`t${v}b`), tone: 'muted', weight: 2, group: n('axes') },
        { kind: 'label', id: n(`num${v}`), at: n(`t${v}a`), tex: String(v), tone: 'muted', place: 'left', group: n('axes') },
      );
    }
  }

  // The curve: flat, a smooth rise to the top of the hump, a smooth fall, flat again.
  const hump = (id: string, top: number, tone: DiagramTone) => {
    const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
    const level = (u: number) => {
      if (u <= FLAT_R[1]) return o.reactants;
      if (u <= PEAK_AT) return o.reactants + (top - o.reactants) * ease((u - FLAT_R[1]) / (PEAK_AT - FLAT_R[1]));
      if (u <= FLAT_P[0]) return top + (o.products - top) * ease((u - PEAK_AT) / (FLAT_P[0] - PEAK_AT));
      return o.products;
    };
    const names: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const u = FLAT_R[0] + ((FLAT_P[1] - FLAT_R[0]) * i) / 60;
      points[n(`${id}${i}`)] = pt(u, level(u));
      names.push(n(`${id}${i}`));
    }
    items.push({ kind: 'curve', id: n(id), points: names, tone, weight: 3.5 });
  };
  hump('curve', o.peak, o.catalyst !== undefined ? 'muted' : 'brand');
  if (o.catalyst !== undefined) hump('cat-curve', o.catalyst, 'good');

  // The levels' names at the outer end of each flat part: the reactants' above their line, clear of
  // the ΔH arrow below it; the products' below their line for an exothermic reaction, and above it
  // for an endothermic one, clear of the ΔH arrow beside it.
  Object.assign(points, { [n('r')]: pt(FLAT_R[0], o.reactants), [n('p')]: pt(FLAT_P[1], o.products), [n('top')]: pt(PEAK_AT, o.peak) });
  items.push(
    { kind: 'label', id: n('reactants'), at: n('r'), tex: L.reactants ?? '\\text{reactants}', place: o.places?.reactants ?? 'above right', tone: 'muted' },
    { kind: 'label', id: n('products'), at: n('p'), tex: L.products ?? '\\text{products}', place: o.places?.products ?? (exo ? 'below left' : 'above left'), tone: 'muted' },
    { kind: 'label', id: n('complex'), at: n('top'), tex: L.complex ?? '\\text{activated complex}', place: 'above' },
  );

  const at = { fwd: o.at?.fwd ?? 3.2, rev: o.at?.rev ?? (exo ? 7.8 : 6.9), dh: o.at?.dh ?? (exo ? 1.4 : 9.3) };
  const sides = { fwd: o.sides?.fwd ?? 'west', rev: o.sides?.rev ?? 'east', dh: o.sides?.dh ?? (exo ? 'east' : 'west') };
  /** A vertical arrow at progress u from one energy to another, with a dashed line along `dash` (from progress, to progress, energy). */
  const arrow = (id: string, u: number, from: number, to: number, tex: string | undefined, tone: DiagramTone, side: 'east' | 'west', dash?: [number, number, number], labelAt = 0.5) => {
    const a = pt(u, from);
    const b = pt(u, to);
    Object.assign(points, { [n(`${id}-a`)]: a, [n(`${id}-b`)]: b });
    if (dash) {
      Object.assign(points, { [n(`${id}-d0`)]: pt(dash[0], dash[2]), [n(`${id}-d1`)]: pt(dash[1], dash[2]) });
      items.push({ kind: 'line', id: n(`${id}-dash`), from: n(`${id}-d0`), to: n(`${id}-d1`), dashed: true, tone: 'muted', weight: 2, group: n(id) });
    }
    items.push({ kind: 'line', id: n(`${id}-arrow`), from: n(`${id}-a`), to: n(`${id}-b`), arrow: true, weight: 3, tone, group: n(id), ...(tex ? { label: tex, labelSide: sideFor(a, b, side), labelAt } : {}) });
  };
  const hasCat = o.catalyst !== undefined;
  // The activation energies' labels sit high on their arrows, clear of the level names.
  arrow('fwd', at.fwd, o.reactants, o.peak, L.fwd ?? 'E_a(\\text{fwd})', 'opp', sides.fwd, [at.fwd, PEAK_AT, o.peak], 0.75);
  arrow('rev', at.rev, o.products, o.peak, L.rev ?? 'E_a(\\text{rev})', 'hyp', sides.rev, [PEAK_AT, at.rev, o.peak], 0.75);
  // ΔH: the level that is not already drawn where the arrow stands is carried across by a dashed line.
  const dhDash: [number, number, number] | undefined =
    at.dh < FLAT_R[1] ? [at.dh, FLAT_P[0], o.products] : at.dh > FLAT_P[0] ? [FLAT_R[1], at.dh, o.reactants] : undefined;
  arrow('dh', at.dh, o.reactants, o.products, L.dh ?? '\\Delta H', exo ? 'good' : 'bad', sides.dh, dhDash);
  if (hasCat) {
    arrow('cat-fwd', at.fwd, o.reactants, o.catalyst!, L.catFwd ?? 'E_a(\\text{fwd})', 'opp', sides.fwd, [at.fwd, PEAK_AT, o.catalyst!], 0.75);
    arrow('cat-rev', at.rev, o.products, o.catalyst!, L.catRev ?? 'E_a(\\text{rev})', 'hyp', sides.rev, [PEAK_AT, at.rev, o.catalyst!], 0.75);
    // A key at the top right, clear of the humps, each name between two grid lines.
    Object.assign(points, { [n('k1')]: pt(8.6, o.max * 0.95), [n('k2')]: pt(8.6, o.max * 0.85) });
    items.push(
      { kind: 'label', id: n('no-cat'), at: n('k1'), tex: '\\text{no catalyst}', tone: 'muted', place: 'center' },
      { kind: 'label', id: n('cat'), at: n('k2'), tex: '\\text{catalyst}', tone: 'good', place: 'center' },
    );
  }
  return { points, items };
}
