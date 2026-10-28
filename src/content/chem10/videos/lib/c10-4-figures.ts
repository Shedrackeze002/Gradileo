/**
 * Figures for the Chemical Reactions videos (Grade 10 Chemistry, Unit 4). Like the other course
 * helpers, they are built only from standard diagram parts (lines, labels and shaded regions), so
 * each goes into a diagram with `figure`:
 *
 * - `row`: a reaction drawn with atoms as labelled balls, molecules as touching balls, plus signs
 *   and an arrow, laid out from left to right (atoms rearranging, balancing, reaction patterns).
 *   Build its terms with `mol`, `water`, `stack`, `plus` and `arrow`.
 * - `flaskOnBalance`: a conical flask of acid with marble chips on a balance, its reading, and
 *   the gas escaping from the open neck (or a stopper that keeps it in).
 * - `energyFlow`: a reaction in a box with energy arrows pointing out of it (exothermic) or into
 *   it (endothermic).
 * - `energyLevels`: the energy diagram of `chem.ts` with an energy scale in kJ up the side, and a
 *   second, lower hump for the same reaction with a catalyst.
 * - `lumpAndPowder`: a lump of solid beside the same particles broken into small pieces, with the
 *   particles at the surface coloured.
 * - `gasGraph`: the lesson's graph of the volume of carbon dioxide against time, for marble powder
 *   and marble lumps in the same acid.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { energyDiagram } from '@/video/chem.ts';
import { plane, polyline } from '@/video/graph.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle, added to `points`. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A ball: a shaded circle with an edge and, with `tex`, a label in the middle, all in `group`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, tex: string | undefined, group: string, shade = 0.55) {
  const ids = ring(points, id, c, r);
  items.push(
    { kind: 'region', id, points: ids, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, group },
  );
  if (tex) {
    points[`${id}-c`] = c;
    items.push({ kind: 'label', id: `${id}-sym`, at: `${id}-c`, tex, place: 'center', group });
  }
}

/** The colour of each element's atoms, the same in every video of the unit. */
export const ATOM_TONE: Record<string, DiagramTone> = { H: 'adj', O: 'bad', Cl: 'good', N: 'hyp', C: 'muted', Na: 'brand', Mg: 'theta', Cu: 'opp' };
/** Colours for the letters of the reaction patterns: A + B → AB. */
export const LETTER_TONE: Record<string, DiagramTone> = { A: 'opp', B: 'adj', C: 'good', D: 'hyp' };

const R = 0.45;

/** One atom of a molecule: its symbol (TeX, set upright), where it sits, its colour and size. */
interface Atom {
  sym: string;
  at: P;
  tone: DiagramTone;
  r: number;
}

/** A term of a reaction drawn as balls. */
export type Term =
  | { kind: 'mol'; id: string; atoms: Atom[] }
  | { kind: 'stack'; mols: Array<{ kind: 'mol'; id: string; atoms: Atom[] }> }
  | { kind: 'plus'; id: string }
  | { kind: 'arrow'; id: string; label?: string; tone?: DiagramTone; length?: number };

/**
 * A molecule (or a formula unit, or a lone atom) as balls in a row, touching: `mol('w', ['H',
 * 'Cl'])`. Each symbol is TeX set upright (`'NO_3'` for nitrate); `tones` overrides the element
 * colours, and `r` sets the size of every ball.
 */
export function mol(id: string, syms: string[], o: { tones?: DiagramTone[]; r?: number } = {}): Term & { kind: 'mol' } {
  const r = o.r ?? R;
  const step = r * 1.8;
  return {
    kind: 'mol',
    id,
    atoms: syms.map((sym, i) => ({ sym, at: [(i - (syms.length - 1) / 2) * step, 0], tone: o.tones?.[i] ?? ATOM_TONE[sym] ?? LETTER_TONE[sym] ?? 'brand', r })),
  };
}

/** A water molecule: the oxygen atom with a hydrogen atom on each side, bent. */
export function water(id: string): Term & { kind: 'mol' } {
  return {
    kind: 'mol',
    id,
    atoms: [
      { sym: 'H', at: [-0.62, -0.32], tone: ATOM_TONE.H, r: 0.38 },
      { sym: 'H', at: [0.62, -0.32], tone: ATOM_TONE.H, r: 0.38 },
      { sym: 'O', at: [0, 0.14], tone: ATOM_TONE.O, r: R },
    ],
  };
}

/** Molecules one above another, for a coefficient: two H₂ molecules for 2H₂. */
export function stack(...mols: Array<Term & { kind: 'mol' }>): Term {
  return { kind: 'stack', mols };
}

export const plus = (id: string): Term => ({ kind: 'plus', id });
export const arrow = (id: string, label?: string, o: { tone?: DiagramTone; length?: number } = {}): Term => ({ kind: 'arrow', id, label, ...o });

/** How far a molecule reaches left, right, down and up from its centre. */
function extent(m: { atoms: Atom[] }) {
  return {
    x0: Math.min(...m.atoms.map((a) => a.at[0] - a.r)),
    x1: Math.max(...m.atoms.map((a) => a.at[0] + a.r)),
    y0: Math.min(...m.atoms.map((a) => a.at[1] - a.r)),
    y1: Math.max(...m.atoms.map((a) => a.at[1] + a.r)),
  };
}

/**
 * A reaction drawn as balls along the line y = `y`, starting at `x`: molecules, plus signs and
 * arrows (with a label above), `gap` apart. A `title` (TeX) sits at the left end.
 *
 * Parts: each molecule by its id (a group of its balls and symbols), each plus sign and arrow by
 * its id (an arrow's label is part of the arrow), and the title by its id. `mid` gives the middle
 * of each term along the row, by its id (a stack's by the id of each of its molecules), and `end`
 * where the row ends, for placing labels.
 */
export function row(o: { y?: number; x?: number; terms: Term[]; gap?: number; title?: { id: string; tex: string } }): Part & { mid: Record<string, number>; end: number } {
  const y = o.y ?? 0;
  const gap = o.gap ?? 0.28;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const mid: Record<string, number> = {};
  let x = o.x ?? 0;
  if (o.title) {
    points[o.title.id] = [x - 0.4, y];
    items.push({ kind: 'label', id: o.title.id, at: o.title.id, tex: o.title.tex, place: 'left' });
  }
  const draw = (m: { id: string; atoms: Atom[] }, c: P) =>
    m.atoms.forEach((a, i) => ball(points, items, `${m.id}-${i}`, [c[0] + a.at[0], c[1] + a.at[1]], a.r, a.tone, `\\mathsf{${a.sym}}`, m.id));
  o.terms.forEach((t, k) => {
    if (k > 0) x += gap;
    if (t.kind === 'mol') {
      const e = extent(t);
      draw(t, [x - e.x0, y]);
      mid[t.id] = x + (e.x1 - e.x0) / 2;
      x += e.x1 - e.x0;
    } else if (t.kind === 'stack') {
      // Rows a little more than a molecule's height apart, centred on the line.
      const w = Math.max(...t.mols.map((m) => extent(m).x1 - extent(m).x0));
      const h = Math.max(...t.mols.map((m) => extent(m).y1 - extent(m).y0)) + 0.3;
      t.mols.forEach((m, i) => {
        const e = extent(m);
        draw(m, [x + (w - (e.x1 - e.x0)) / 2 - e.x0, y + ((t.mols.length - 1) / 2 - i) * h - (e.y0 + e.y1) / 2]);
        mid[m.id] = x + w / 2;
      });
      x += w;
    } else if (t.kind === 'plus') {
      points[t.id] = [x + 0.25, y];
      items.push({ kind: 'label', id: t.id, at: t.id, tex: '+', place: 'center' });
      mid[t.id] = x + 0.25;
      x += 0.5;
    } else {
      const len = t.length ?? 1.1;
      Object.assign(points, { [`${t.id}-a`]: [x, y], [`${t.id}-b`]: [x + len, y] });
      items.push({ kind: 'line', id: t.id, from: `${t.id}-a`, to: `${t.id}-b`, arrow: true, weight: 3, ...(t.tone ? { tone: t.tone } : {}), ...(t.label ? { label: t.label, labelSide: 'left' as const } : {}) });
      mid[t.id] = x + len / 2;
      x += len;
    }
  });
  return { points, items, mid, end: x };
}

/** Labels (TeX) at given points, each a part by its id: below its point unless `place` says otherwise. */
export function labels(list: Array<{ id: string; at: P; tex: string; tone?: DiagramTone; place?: 'above' | 'below' | 'left' | 'right' | 'center' }>): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const l of list) {
    points[`${l.id}-at`] = l.at;
    items.push({ kind: 'label', id: l.id, at: `${l.id}-at`, tex: l.tex, place: l.place ?? 'below', ...(l.tone ? { tone: l.tone } : {}) });
  }
  return { points, items };
}

/**
 * A conical flask on a balance, open to the air (or closed with a stopper), holding acid with
 * marble chips fizzing in it. `readings` are the balance readings (TeX) to show one at a time;
 * `at` is the middle of the bottom of the balance.
 *
 * Parts: `balance` (a group: the balance and its display), each reading by its id, `flask` (a
 * group: the glass), `acid`, `chips` (a group), `bubbles` (a group), `gas` (a group: arrows out of
 * the neck and the gas's name `gasLabel`, TeX), and with `stopper` the stopper `stopper`.
 */
export function flaskOnBalance(o: { name?: string; at?: P; readings: Array<{ id: string; tex: string }>; gasLabel?: string; stopper?: boolean }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const box = (key: string, x0: number, y0: number, x1: number, y1: number) => {
    Object.assign(points, { [n(`${key}a`)]: [x0, y0], [n(`${key}b`)]: [x1, y0], [n(`${key}c`)]: [x1, y1], [n(`${key}d`)]: [x0, y1] });
    return ['a', 'b', 'c', 'd'].map((k) => n(`${key}${k}`));
  };
  const body = box('bal', -2.8, 0, 2.8, 1.1);
  const screen = box('scr', -1.5, 0.22, 1.5, 0.88);
  items.push(
    { kind: 'region', id: n('bal-fill'), points: body, tone: 'muted', shade: 0.18, group: n('balance') },
    { kind: 'curve', id: n('bal-edge'), points: body, closed: true, tone: 'muted', weight: 3, group: n('balance') },
    { kind: 'region', id: n('scr-fill'), points: screen, tone: 'good', shade: 0.12, group: n('balance') },
    { kind: 'curve', id: n('scr-edge'), points: screen, closed: true, tone: 'good', weight: 2, group: n('balance') },
  );
  Object.assign(points, { [n('pan-a')]: [-2.2, 1.2], [n('pan-b')]: [2.2, 1.2], [n('read')]: [0, 0.55] });
  items.push({ kind: 'line', id: n('pan'), from: n('pan-a'), to: n('pan-b'), weight: 5, tone: 'muted', group: n('balance') });
  for (const r of o.readings) items.push({ kind: 'label', id: n(r.id), at: n('read'), tex: r.tex, tone: 'good', place: 'center' });
  // The glass: a wide base narrowing to a neck.
  Object.assign(points, {
    [n('f-bl')]: [-1.6, 1.25],
    [n('f-br')]: [1.6, 1.25],
    [n('f-sr')]: [0.45, 3.4],
    [n('f-nr')]: [0.45, 4.3],
    [n('f-sl')]: [-0.45, 3.4],
    [n('f-nl')]: [-0.45, 4.3],
  });
  for (const [id, a, b] of [['f-base', 'f-bl', 'f-br'], ['f-right', 'f-br', 'f-sr'], ['f-neck-r', 'f-sr', 'f-nr'], ['f-neck-l', 'f-nl', 'f-sl'], ['f-left', 'f-sl', 'f-bl']] as const)
    items.push({ kind: 'line', id: n(id), from: n(a), to: n(b), weight: 3, group: n('flask') });
  // The acid fills the bottom of the flask, up to y = 2.3, inside the glass.
  const side = (y: number) => 1.6 - ((y - 1.25) / (3.4 - 1.25)) * (1.6 - 0.45);
  Object.assign(points, { [n('a0')]: [-1.52, 1.31], [n('a1')]: [1.52, 1.31], [n('a2')]: [side(2.3) - 0.06, 2.3], [n('a3')]: [-side(2.3) + 0.06, 2.3] });
  items.push({ kind: 'region', id: n('acid'), points: ['a0', 'a1', 'a2', 'a3'].map(n), tone: 'adj', shade: 0.28 });
  const chips: P[] = [[-0.95, 1.5], [-0.4, 1.46], [0.15, 1.52], [0.7, 1.47], [1.15, 1.5]];
  chips.forEach((c, i) => ball(points, items, n(`chip${i}`), c, 0.2, 'ink', undefined, n('chips'), 0.5));
  const bubbles: P[] = [[-0.7, 1.95], [-0.15, 2.1], [0.35, 1.85], [0.85, 2.05], [-0.4, 1.75]];
  bubbles.forEach((c, i) => items.push({ kind: 'curve', id: n(`bub${i}`), points: ring(points, n(`bub${i}`), c, 0.09, 12), closed: true, tone: 'ink', weight: 2, group: n('bubbles') }));
  if (o.stopper) {
    const plug = box('stop', -0.5, 4.05, 0.5, 4.55);
    items.push({ kind: 'region', id: n('stopper'), points: plug, tone: 'opp', shade: 0.7 });
  } else {
    Object.assign(points, {
      [n('g0a')]: [-0.15, 4.5], [n('g0b')]: [-0.85, 5.3],
      [n('g1a')]: [0, 4.55], [n('g1b')]: [0, 5.5],
      [n('g2a')]: [0.15, 4.5], [n('g2b')]: [0.85, 5.3],
      [n('gl')]: [0.95, 5.3],
    });
    for (const k of [0, 1, 2]) items.push({ kind: 'line', id: n(`gas${k}`), from: n(`g${k}a`), to: n(`g${k}b`), arrow: true, tone: 'opp', weight: 2.5, group: n('gas') });
    items.push({ kind: 'label', id: n('gas-label'), at: n('gl'), tex: o.gasLabel ?? '\\ce{CO2}', tone: 'opp', place: 'right', group: n('gas') });
  }
  // Drawn with the middle of the balance's base at the origin, then moved to `at`.
  const [dx, dy] = o.at ?? [0, 0];
  for (const k of Object.keys(points)) points[k] = [points[k][0] + dx, points[k][1] + dy];
  return { points, items };
}

/**
 * A reaction in a box, with energy arrows pointing out of it on four sides (`out`, exothermic) or
 * into it (endothermic), a `title` above and a `note` below (TeX). `at` is the box's centre.
 *
 * Parts: `box` (a group: the box and its label "reaction"), `arrows` (a group, with the label
 * "energy"), `title` and `note`.
 */
export function energyFlow(o: { name?: string; at?: P; out: boolean; title: string; note: string }): Part {
  const n = namer(o.name);
  const [cx, cy] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const w = 1.3;
  const h = 0.8;
  Object.assign(points, { [n('b0')]: [cx - w, cy - h], [n('b1')]: [cx + w, cy - h], [n('b2')]: [cx + w, cy + h], [n('b3')]: [cx - w, cy + h], [n('c')]: [cx, cy] });
  const corners = ['b0', 'b1', 'b2', 'b3'].map(n);
  items.push(
    { kind: 'region', id: n('box-fill'), points: corners, tone: 'brand', shade: 0.15, group: n('box') },
    { kind: 'curve', id: n('box-edge'), points: corners, closed: true, tone: 'brand', weight: 3, group: n('box') },
    { kind: 'label', id: n('box-label'), at: n('c'), tex: '\\text{reaction}', place: 'center', group: n('box') },
  );
  const tone: DiagramTone = o.out ? 'opp' : 'adj';
  // Arrows on the left and right sides, and above and below the box.
  const dirs: Array<[P, P]> = [
    [[cx - w - 0.2, cy], [cx - w - 1.3, cy]],
    [[cx + w + 0.2, cy], [cx + w + 1.3, cy]],
    [[cx, cy + h + 0.2], [cx, cy + h + 1.1]],
    [[cx, cy - h - 0.2], [cx, cy - h - 1.1]],
  ];
  dirs.forEach(([near, far], i) => {
    const [a, b] = o.out ? [near, far] : [far, near];
    Object.assign(points, { [n(`e${i}a`)]: a, [n(`e${i}b`)]: b });
    items.push({ kind: 'line', id: n(`e${i}`), from: n(`e${i}a`), to: n(`e${i}b`), arrow: true, tone, weight: 4, group: n('arrows') });
  });
  Object.assign(points, { [n('el')]: [cx + w + 0.8, cy + h + 0.75], [n('t')]: [cx, cy + h + 1.5], [n('nt')]: [cx, cy - h - 1.45] });
  items.push(
    { kind: 'label', id: n('energy'), at: n('el'), tex: '\\text{energy}', tone, place: 'center', group: n('arrows') },
    { kind: 'label', id: n('title'), at: n('t'), tex: o.title, place: 'above' },
    { kind: 'label', id: n('note'), at: n('nt'), tex: o.note, tone: 'muted', place: 'below' },
  );
  return { points, items };
}

/**
 * An energy level diagram with an energy scale up the side: levels in kJ (`reactants`, `products`
 * and the top of the hump, `peak`), drawn `per` kJ to a diagram unit, with the scale numbered
 * every `step` kJ up to `max`. The axis titles are those of the lesson, "Progress of reaction" and
 * "Energy (kJ)". The arrows for the energy change (`dh`, green when energy is given out and red
 * when it is taken in) and the activation energy (`ea`, orange) carry no labels, which would
 * cross the curve; give their values beside the diagram in the same colours. With `catalyst`, the same reaction with a catalyst is drawn as a second,
 * lower hump reaching that energy: the first curve turns grey, the second is green, and a key at
 * the top right names them.
 *
 * Parts: those of `energyDiagram` (`axes`, which now includes the scale, `curve`, `reactants`,
 * `products`, `dh` and `ea`), and with `catalyst`, `cat-curve` and the labels `no-cat` and `cat`.
 */
export function energyLevels(o: {
  name?: string;
  reactants: number;
  products: number;
  peak: number;
  per: number;
  step: number;
  max: number;
  width?: number;
  labels?: { reactants?: string; products?: string };
  catalyst?: number;
}): Part {
  const n = namer(o.name);
  const W = o.width ?? 9;
  const base = energyDiagram({
    name: o.name,
    reactants: o.reactants / o.per,
    products: o.products / o.per,
    peak: o.peak / o.per,
    width: W,
    height: o.max / o.per,
    labels: { x: '\\text{Progress of reaction}', y: '\\text{Energy (kJ)}', ...o.labels },
  });
  const points = { ...base.points };
  let items = base.items.map((i) => (i.kind === 'line' && (i.id === n('ea-arrow') || i.id === n('dh-arrow')) ? { ...i, label: undefined } : i));
  for (let v = 0; v <= o.max + 1e-9; v += o.step) {
    const y = v / o.per;
    Object.assign(points, { [n(`tick${v}a`)]: [-0.15, y], [n(`tick${v}b`)]: [0, y] });
    items.push(
      { kind: 'line', id: n(`tick${v}`), from: n(`tick${v}a`), to: n(`tick${v}b`), tone: 'muted', weight: 2, group: n('axes') },
      { kind: 'label', id: n(`num${v}`), at: n(`tick${v}a`), tex: String(v), tone: 'muted', place: 'left', group: n('axes') },
    );
  }
  if (o.catalyst !== undefined) {
    // The same drawing with a lower hump; only its curve is kept.
    const cat = energyDiagram({ name: n('cat'), reactants: o.reactants / o.per, products: o.products / o.per, peak: o.catalyst / o.per, width: W, height: o.max / o.per });
    const curve = cat.items.find((i): i is Extract<DiagramItem, { kind: 'curve' }> => i.kind === 'curve' && i.id === n('cat-curve'))!;
    for (const p of curve.points) points[p] = cat.points[p];
    items = items.map((i) => (i.kind === 'curve' && i.id === n('curve') ? { ...i, tone: 'muted' as const } : i));
    items.push({ ...curve, tone: 'good' });
    // A key at the top right, clear of the humps.
    Object.assign(points, { [n('nc')]: [0.8 * W, o.max / o.per], [n('wc')]: [0.8 * W, o.max / o.per - 0.8] });
    items.push(
      { kind: 'label', id: n('no-cat'), at: n('nc'), tex: '\\text{no catalyst}', tone: 'muted', place: 'center' },
      { kind: 'label', id: n('cat'), at: n('wc'), tex: '\\text{catalyst}', tone: 'good', place: 'center' },
    );
  }
  return { points, items };
}

/**
 * A lump of solid, `k` particles along each side, beside the same particles broken into pieces
 * two particles wide (the powder). The particles at a surface, which the other reactant can
 * reach, are coloured; those inside the lump are grey.
 *
 * Parts: `lump-surface` (a group: the lump's particles at its surface, coloured), `lump-inside`
 * (a group: the rest, grey), `powder` (a group), the arrow `split`, and the labels `lump-label` and
 * `powder-label`.
 */
export function lumpAndPowder(o: { name?: string; k?: number } = {}): Part {
  const n = namer(o.name);
  const k = o.k ?? 6;
  const d = 0.62;
  const r = 0.27;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < k; i++)
    for (let j = 0; j < k; j++) {
      const surface = i === 0 || j === 0 || i === k - 1 || j === k - 1;
      ball(points, items, n(`l${i}-${j}`), [i * d, j * d], r, surface ? 'opp' : 'muted', undefined, surface ? n('lump-surface') : n('lump-inside'), 0.6);
    }
  const gapX = k * d + 1.8;
  const pieces = k / 2;
  const piece = 2 * d + 0.55;
  for (let i = 0; i < k; i++)
    for (let j = 0; j < k; j++) {
      const x = gapX + Math.floor(i / 2) * piece + (i % 2) * d;
      const y = Math.floor(j / 2) * piece + (j % 2) * d - (pieces * piece - 0.55 - k * d) / 2;
      ball(points, items, n(`p${i}-${j}`), [x, y], r, 'opp', undefined, n('powder'), 0.6);
    }
  const mid = ((k - 1) * d) / 2;
  Object.assign(points, {
    [n('sa')]: [(k - 1) * d + 0.55, mid],
    [n('sb')]: [gapX - 0.55, mid],
    [n('ll')]: [mid, -0.75],
    [n('pl')]: [gapX + (pieces * piece - 0.55 - d) / 2, -0.75 - (pieces * piece - 0.55 - k * d) / 2],
  });
  items.push(
    { kind: 'line', id: n('split'), from: n('sa'), to: n('sb'), arrow: true, weight: 3 },
    { kind: 'label', id: n('lump-label'), at: n('ll'), tex: '\\text{lump}', place: 'below' },
    { kind: 'label', id: n('powder-label'), at: n('pl'), tex: '\\text{powder}', place: 'below' },
  );
  return { points, items };
}

/** The lesson's curves: total volume of carbon dioxide (cm³) every 5 s, for marble powder and lumps. */
const POWDER: Array<[number, number]> = [[0, 0], [5, 22.7], [10, 38.9], [15, 50.6], [20, 58.9], [25, 64.9], [30, 69.2], [35, 72.2], [40, 74.4], [45, 76.0], [50, 77.1], [55, 78.0], [60, 78.5], [65, 79.0], [70, 79.2], [75, 79.5], [80, 79.6], [85, 79.7], [90, 79.8], [95, 79.9], [100, 79.9], [105, 79.9], [110, 79.9], [115, 80.0], [120, 80.0]];
const LUMPS: Array<[number, number]> = [[0, 0], [5, 8.4], [10, 15.9], [15, 22.7], [20, 28.7], [25, 34.1], [30, 38.9], [35, 43.2], [40, 47.1], [45, 50.6], [50, 53.7], [55, 56.4], [60, 58.9], [65, 61.1], [70, 63.1], [75, 64.9], [80, 66.5], [85, 67.9], [90, 69.2], [95, 70.3], [100, 71.3], [105, 72.2], [110, 73.1], [115, 73.8], [120, 74.4]];

/**
 * The lesson's graph: total volume of carbon dioxide against time, 0 to 120 s and 0 to 100 cm³,
 * for the same mass of marble as a powder (coloured) and, with `lumps`, as lumps (grey).
 *
 * Parts: `grid`, `axes`, `powder` and `lumps` (groups: each curve), `top` (a dashed line at
 * 80 cm³, where both level off), and the labels `powder-label` and `lumps-label`.
 */
export function gasGraph(o: { lumps?: boolean } = {}): Part {
  const g = plane({ x: [0, 120], y: [0, 100], xStep: 20, yStep: 20, width: 9, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Volume of gas (cm}^3\\text{)}' } });
  const parts: Part[] = [g, polyline(g, { id: 'top', points: [[0, 80], [120, 80]], tone: 'muted', dashed: true }), polyline(g, { id: 'powder', points: POWDER, tone: 'brand' })];
  if (o.lumps) parts.push(polyline(g, { id: 'lumps', points: LUMPS, tone: 'muted' }));
  const points: Record<string, P> = Object.assign({}, ...parts.map((p) => p.points), { 'powder-at': g.map(40, 74.4), 'lumps-at': g.map(80, 66.5) });
  const items = parts.flatMap((p) => p.items);
  items.push({ kind: 'label', id: 'powder-label', at: 'powder-at', tex: '\\text{powder}', tone: 'brand', place: 'below right' });
  if (o.lumps) items.push({ kind: 'label', id: 'lumps-label', at: 'lumps-at', tex: '\\text{lumps}', tone: 'muted', place: 'below right' });
  return { points, items };
}
