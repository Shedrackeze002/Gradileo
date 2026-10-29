/**
 * Figures for the second half of the Electrochemical Changes videos (Grade 12 Chemistry, unit 2,
 * lessons 2.5 to 2.8), built only from standard diagram parts (lines, curves, shaded regions and
 * labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `rig`: a burette of a coloured titrant over a conical flask, for a redox titration.
 * - `halfCell`: a beaker of electrolyte with an electrode standing in it.
 * - `cell`: a voltaic cell, two half-cells joined by a wire through a voltmeter and by a salt
 *   bridge, with arrows for the electrons in the wire and the ions in the salt bridge.
 * - `electrolytic`: one beaker with two electrodes joined to a power supply, with arrows for the
 *   electrons (for electrolysis and electroplating).
 * - `potentials`: a vertical scale of standard reduction potentials, with arrows from one value to
 *   another (a cell potential is the distance from the anode up to the cathode).
 * - `flow`: quantities in boxes in a row, joined by arrows that say how to get from one to the next.
 *
 * Colours are the same in every video of these lessons: electrons yellow, anions green, cations
 * pink, the anode orange and the cathode blue.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** Point names round a circle, added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 24): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** Point names along a list of coordinates, added to `points`. */
function path(points: Record<string, P>, key: string, list: P[]): string[] {
  return list.map((p, i) => {
    points[`${key}-${i}`] = p;
    return `${key}-${i}`;
  });
}

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  return path(points, key, [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ]);
}

/** The fixed colours of these videos. */
export const TONE = { electron: 'theta', anion: 'good', cation: 'hyp', anode: 'opp', cathode: 'adj' } as const satisfies Record<string, DiagramTone>;

// ---------------------------------------------------------------------------- a titration

/**
 * A burette held over a conical flask. The burette is a long tube of titrant (deep purple, for
 * permanganate, unless `tone` says otherwise) with a scale that reads downward, 0 at the top and 50
 * at the bottom, and a tap; a drop falls from its tip into the neck of the flask. The flask holds
 * the sample, almost colourless, and the same sample turned pale pink at the endpoint. `titrant`
 * and `sample` (TeX) name them.
 *
 * Parts: `burette` (a group: the tube and its name), `titrant` (a group: the liquid in the burette
 * and its name), `scale` (a group: the marks and the numbers 0 and 50), `tap` (a group: the tap and
 * its name), `drop`, `flask` (a group: the glass and its name), `sample` (a group: the liquid and
 * its name) and `pink` (the liquid turned pink).
 */
export function rig(o: { name?: string; titrant?: string; sample?: string; tone?: DiagramTone } = {}): Part {
  const n = namer(o.name);
  const tone = o.tone ?? 'brand';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The flask: a cone from a wide base up to a narrow neck with a lip.
  const flask = path(points, n('fl'), [[-0.6, 3.1], [-0.45, 3.0], [-0.45, 2.3], [-1.8, 0], [1.8, 0], [0.45, 2.3], [0.45, 3.0], [0.6, 3.1]]);
  items.push({ kind: 'curve', id: n('flask-glass'), points: flask, tone: 'ink', weight: 3, group: n('flask') });
  // Its liquid, up to y = 0.9, where the flask is 1.27 wide each side.
  const liquid = path(points, n('liq'), [[-1.7, 0.07], [1.7, 0.07], [1.22, 0.9], [-1.22, 0.9]]);
  items.push({ kind: 'region', id: n('sample-fill'), points: liquid, tone: 'ink', shade: 0.1, group: n('sample') });
  items.push({ kind: 'region', id: n('pink'), points: liquid, tone: 'hyp', shade: 0.4 });
  // The burette: walls from y = 4.2 to 12.4, a taper, and the tip down into the neck of the flask.
  const tube = path(points, n('tb'), [[-0.3, 12.4], [-0.3, 4.2], [-0.1, 3.85], [-0.07, 2.75], [0.07, 2.75], [0.1, 3.85], [0.3, 4.2], [0.3, 12.4]]);
  items.push({ kind: 'curve', id: n('tube'), points: tube, tone: 'ink', weight: 3, group: n('burette') });
  const fill = path(points, n('tf'), [[-0.25, 4.25], [0.25, 4.25], [0.25, 11.6], [-0.25, 11.6]]);
  items.push({ kind: 'region', id: n('titrant-fill'), points: fill, tone, shade: 0.7, group: n('titrant') });
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
  // The tap: a small block across the stem.
  const tap = path(points, n('tp'), [[-0.55, 3.62], [0.55, 3.62], [0.55, 3.88], [-0.55, 3.88]]);
  items.push({ kind: 'region', id: n('tap-fill'), points: tap, tone: 'ink', shade: 0.75, group: n('tap') });
  // A drop just below the tip.
  const drop = ring(points, n('drop'), [0, 2.45], 0.1, 12);
  items.push({ kind: 'region', id: n('drop'), points: drop, tone, shade: 0.95 });
  // Names, each with a short pointer.
  const name = (id: string, from: P, to: P, tex: string, group: string, labelTone: DiagramTone = 'ink') => {
    Object.assign(points, { [n(`${id}-p0`)]: from, [n(`${id}-p1`)]: to });
    items.push(
      { kind: 'line', id: n(`${id}-pointer`), from: n(`${id}-p0`), to: n(`${id}-p1`), tone: 'muted', weight: 2, group: n(group) },
      { kind: 'label', id: n(`${id}-name`), at: n(`${id}-p1`), tex, place: 'right', tone: labelTone, group: n(group) },
    );
  };
  name('burette', [0.4, 10.6], [1.3, 10.6], '\\text{burette}', 'burette');
  name('titrant', [0.35, 8.2], [1.3, 8.2], o.titrant ?? '\\text{titrant}', 'titrant', tone);
  name('tap', [0.65, 3.75], [1.3, 3.75], '\\text{tap}', 'tap');
  name('flask', [1.2, 1.6], [2.0, 2.0], '\\text{conical flask}', 'flask');
  name('sample', [1.5, 0.45], [2.0, 0.45], o.sample ?? '\\text{sample}', 'sample');
  // Room for the names on the right.
  Object.assign(points, { [n('room-a')]: [-2, -0.2], [n('room-b')]: [6.2, 12.6] });
  return { points, items };
}

// ---------------------------------------------------------------------------- half-cells and cells

/** One half-cell: a beaker of electrolyte with an electrode in it. */
export interface HalfCell {
  /** The electrode's name (TeX), such as `\\text{Zn}`. */
  electrode: string;
  /** The electrolyte's name (TeX), written under the beaker. */
  solution?: string;
  /** The colour of the electrolyte (muted, almost clear, by default). */
  tone?: DiagramTone;
  /** A label in the solution (TeX), such as the ion that forms or is used up. */
  ion?: string;
  /** What the electrode is (TeX), under the electrolyte's name, such as `\\text{anode}`. */
  role?: string;
  roleTone?: DiagramTone;
}

/**
 * A beaker `w` wide and 3.8 tall with its bottom left corner at `at`, filled to 2.9 with
 * electrolyte, and an electrode (a strip 0.5 wide) standing in it from 0.5 up to `top`, its middle
 * `x` from the beaker's left side. The electrode's name sits beside its top, on the `side` away
 * from the middle of the drawing. The electrolyte's name and the electrode's role sit under the
 * beaker; a label `ion` sits in the solution at `ionAt` (from the bottom left corner).
 *
 * Parts (each id made by `k`): `beaker` (a group: the glass, the electrolyte and its name),
 * `electrode` (a group: the strip and its name), `ion` and `role`.
 */
function halfCellPart(k: (s: string) => string, h: HalfCell, o: { at: P; w: number; x: number; top: number; side: 'left' | 'right'; ionAt: P }): Part {
  const [x, y] = o.at;
  const W = o.w;
  const H = 3.8;
  const level = 2.9;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const glass = path(points, k('g'), [[x - 0.2, y + H + 0.16], [x, y + H], [x, y], [x + W, y], [x + W, y + H], [x + W + 0.2, y + H + 0.16]]);
  const liquid = rect(points, k('liq'), x + 0.07, y + 0.07, x + W - 0.07, y + level);
  items.push({ kind: 'region', id: k('liquid'), points: liquid, tone: h.tone ?? 'muted', shade: h.tone ? 0.22 : 0.14, group: k('beaker') });
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: k(`glass${i}`), from: glass[i], to: glass[i + 1], tone: 'ink', weight: 3, group: k('beaker') });
  const ex = x + o.x;
  const strip = rect(points, k('m'), ex - 0.25, y + 0.5, ex + 0.25, y + o.top);
  items.push(
    { kind: 'region', id: k('metal'), points: strip, tone: 'ink', shade: 0.45, group: k('electrode') },
    { kind: 'curve', id: k('metal-edge'), points: strip, closed: true, tone: 'ink', weight: 2.5, group: k('electrode') },
  );
  points[k('name-at')] = [o.side === 'left' ? ex - 0.37 : ex + 0.37, y + o.top - 0.35];
  items.push({ kind: 'label', id: k('name'), at: k('name-at'), tex: h.electrode, place: o.side, group: k('electrode') });
  if (h.solution) {
    points[k('sol-at')] = [x + W / 2, y - 0.1];
    items.push({ kind: 'label', id: k('solution'), at: k('sol-at'), tex: h.solution, place: 'below', group: k('beaker') });
  }
  if (h.role) {
    points[k('role-at')] = [x + W / 2, y - (h.solution ? 1.25 : 0.1)];
    items.push({ kind: 'label', id: k('role'), at: k('role-at'), tex: h.role, place: 'below', tone: h.roleTone ?? 'ink' });
  }
  if (h.ion) {
    points[k('ion-at')] = [x + o.ionAt[0], y + o.ionAt[1]];
    // A little smaller than other labels, to fit between the electrode and the salt bridge.
    items.push({ kind: 'label', id: k('ion'), at: k('ion-at'), tex: `\\small ${h.ion}`, place: 'center' });
  }
  return { points, items };
}

/**
 * A single half-cell on its own: a beaker of electrolyte with an electrode in it (a strip of zinc
 * in copper(II) sulfate solution, say), the electrode's name on its left.
 *
 * Parts: `beaker` (a group: the glass, the electrolyte and its name), `electrode` (a group: the
 * strip and its name), `ion` and `role`.
 */
export function halfCell(o: HalfCell & { name?: string }): Part {
  return halfCellPart(namer(o.name), o, { at: [0, 0], w: 4, x: 1.6, top: 5.6, side: 'left', ionAt: [2.9, 1.5] });
}

/**
 * A voltaic cell: the half-cell `left` (a beaker from x = 0 to 4) and the half-cell `right` (from
 * 9 to 13), each with its electrode near the outer side, joined by a wire from electrode to
 * electrode through a voltmeter (V) at the top, and by a salt bridge, an upside-down U of
 * electrolyte dipping into both solutions, named `bridge` (TeX) inside the U.
 *
 * `electrons` draws arrows along the wire pointing `'right'` or `'left'`, each marked e⁻. `ions`
 * draws the salt bridge's ions moving: the anion (TeX) above the bridge, toward the anode side
 * `toward`, and the cation below it, toward the other side. `reading` (TeX) is written above the
 * voltmeter. `gas` (TeX) draws a gas inlet into the right-hand beaker, with bubbles at the
 * electrode (for a hydrogen electrode).
 *
 * Parts: `l-beaker`, `l-electrode`, `l-ion`, `l-role` and the same with `r-` for the right-hand
 * half-cell (see `halfCell`), `wire` (a group: the wire and the voltmeter), `reading`, `bridge` (a
 * group: the tube, its electrolyte and its name), `electrons` (a group: the arrows and their
 * labels), `anions` and `cations` (groups: an arrow and its label), and `gas` (a group).
 */
export function cell(o: {
  name?: string;
  left: HalfCell;
  right: HalfCell;
  bridge?: string;
  electrons?: 'left' | 'right';
  ions?: { anion: string; cation: string; toward: 'left' | 'right' };
  reading?: string;
  gas?: string;
}): Part {
  const n = namer(o.name);
  const parts: Part[] = [
    halfCellPart((s) => n(`l-${s}`), o.left, { at: [0, 0], w: 4, x: 0.85, top: 6.4, side: 'left', ionAt: [2.1, 1.75] }),
    halfCellPart((s) => n(`r-${s}`), o.right, { at: [9, 0], w: 4, x: 3.15, top: 6.4, side: 'right', ionAt: [1.9, 1.75] }),
  ];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The salt bridge: an outer and an inner upside-down U, closed at the bottom, with the
  // electrolyte between them.
  const outer = path(points, n('bo'), [[3.1, 1.1], [3.1, 5.8], [9.9, 5.8], [9.9, 1.1]]);
  const inner = path(points, n('bi'), [[3.6, 1.1], [3.6, 5.3], [9.4, 5.3], [9.4, 1.1]]);
  items.push(
    { kind: 'region', id: n('bridge-fill'), points: [...outer, ...[...inner].reverse()], tone: 'muted', shade: 0.2, group: n('bridge') },
    { kind: 'curve', id: n('bridge-outer'), points: outer, tone: 'ink', weight: 2.5, group: n('bridge') },
    { kind: 'curve', id: n('bridge-inner'), points: inner, tone: 'ink', weight: 2.5, group: n('bridge') },
    { kind: 'line', id: n('bridge-end-l'), from: outer[0], to: inner[0], tone: 'ink', weight: 2.5, group: n('bridge') },
    { kind: 'line', id: n('bridge-end-r'), from: outer[3], to: inner[3], tone: 'ink', weight: 2.5, group: n('bridge') },
  );
  if (o.bridge) {
    points[n('bridge-at')] = [6.5, 1.75];
    items.push({ kind: 'label', id: n('bridge-name'), at: n('bridge-at'), tex: o.bridge, place: 'center', tone: 'muted', group: n('bridge') });
  }
  // The wire, from the top of each electrode up and across to the voltmeter in the middle.
  const W = 9.0;
  const wl = path(points, n('wl'), [[0.85, 6.4], [0.85, W], [5.95, W]]);
  const wr = path(points, n('wr'), [[7.05, W], [12.15, W], [12.15, 6.4]]);
  items.push(
    { kind: 'curve', id: n('wire-l'), points: wl, tone: 'ink', weight: 3, group: n('wire') },
    { kind: 'curve', id: n('wire-r'), points: wr, tone: 'ink', weight: 3, group: n('wire') },
    { kind: 'curve', id: n('meter'), points: ring(points, n('mt'), [6.5, W], 0.55, 32), closed: true, tone: 'ink', weight: 3, group: n('wire') },
  );
  points[n('meter-c')] = [6.5, W];
  items.push({ kind: 'label', id: n('meter-v'), at: n('meter-c'), tex: '\\text{V}', place: 'center', group: n('wire') });
  if (o.reading) {
    points[n('reading-at')] = [6.5, W + 0.65];
    items.push({ kind: 'label', id: n('reading'), at: n('reading-at'), tex: o.reading, place: 'above', tone: 'theta' });
  }
  if (o.electrons) {
    // Two arrows above the wire, one on each side of the voltmeter, pointing the way electrons flow.
    const r = o.electrons === 'right';
    const y = W + 0.6;
    for (const [i, [a, b]] of [
      [2.0, 4.4],
      [8.6, 11.0],
    ].entries()) {
      Object.assign(points, { [n(`e${i}-a`)]: [r ? a : b, y], [n(`e${i}-b`)]: [r ? b : a, y] });
      items.push({ kind: 'line', id: n(`e${i}`), from: n(`e${i}-a`), to: n(`e${i}-b`), arrow: true, tone: TONE.electron, weight: 3.5, label: '\\ce{e-}', labelSide: r ? 'left' : 'right', group: n('electrons') });
    }
  }
  if (o.ions) {
    // The anions above the bridge, moving toward the anode; the cations below it, the other way.
    const toLeft = o.ions.toward === 'left';
    Object.assign(points, {
      [n('an-a')]: [toLeft ? 7.7 : 5.3, 6.35],
      [n('an-b')]: [toLeft ? 5.3 : 7.7, 6.35],
      [n('cat-a')]: [toLeft ? 5.3 : 7.7, 4.75],
      [n('cat-b')]: [toLeft ? 7.7 : 5.3, 4.75],
    });
    items.push(
      { kind: 'line', id: n('an-arrow'), from: n('an-a'), to: n('an-b'), arrow: true, tone: TONE.anion, weight: 3.5, label: o.ions.anion, labelSide: toLeft ? 'right' : 'left', group: n('anions') },
      { kind: 'line', id: n('cat-arrow'), from: n('cat-a'), to: n('cat-b'), arrow: true, tone: TONE.cation, weight: 3.5, label: o.ions.cation, labelSide: toLeft ? 'right' : 'left', group: n('cations') },
    );
  }
  if (o.gas) {
    // A gas inlet over the lip of the right-hand beaker and down beside its electrode, with bubbles.
    const inlet = path(points, n('gs'), [[14.2, 5.0], [12.75, 5.0], [12.75, 1.0]]);
    items.push(
      { kind: 'line', id: n('gas-in'), from: inlet[0], to: inlet[1], tone: 'ink', weight: 3, arrow: true, group: n('gas') },
      { kind: 'line', id: n('gas-down'), from: inlet[1], to: inlet[2], tone: 'ink', weight: 3, group: n('gas') },
      { kind: 'label', id: n('gas-name'), at: inlet[0], tex: o.gas, place: 'right', group: n('gas') },
    );
    // Room for the gas's name, which is written to the right of the inlet.
    points[n('gas-room')] = [15.6, 5.0];
    for (const [i, q] of ([
      [12.5, 1.35],
      [12.55, 1.95],
      [12.48, 2.55],
    ] as P[]).entries()) {
      points[n(`bub${i}`)] = q;
      items.push({ kind: 'label', id: n(`bubble${i}`), at: n(`bub${i}`), tex: '', dot: true, open: true, tone: 'ink', place: 'center', group: n('gas') });
    }
  }
  return join([...parts, { points, items }]);
}

/**
 * An electrolytic cell: one beaker (from x = 0 to 9) of electrolyte `solution` (TeX, written under
 * it) with two electrodes, the cathode on the left and the anode on the right, joined by wires to a
 * power supply drawn as a cell symbol at the top: the short line (−) on the cathode's side and the
 * long line (+) on the anode's side. Each electrode's name (TeX: `cathode`, `anode`) sits beside
 * its top, outside. `electrons` draws arrows under the wires, pointing the way electrons flow:
 * from the anode to the power supply, and from the power supply to the cathode. `ions` writes the
 * ions (TeX) in the solution, the cation by the cathode and the anion by the anode, and `products`
 * what forms at each electrode, higher up.
 *
 * Parts: `beaker` (a group: the glass, the electrolyte and its name), `cathode` and `anode`
 * (groups: the strip and its name), `supply` (a group: the wires, the cell symbol, its signs and
 * its name), `electrons` (a group), `cat-ion`, `an-ion`, `cat-product` and `an-product`.
 */
export function electrolytic(o: {
  name?: string;
  solution: string;
  tone?: DiagramTone;
  cathode?: string;
  anode?: string;
  electrons?: boolean;
  ions?: { cation: string; anion: string };
  products?: { cathode: string; anode: string };
}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const W = 9;
  const H = 3.8;
  const glass = path(points, n('g'), [[-0.2, H + 0.16], [0, H], [0, 0], [W, 0], [W, H], [W + 0.2, H + 0.16]]);
  items.push({ kind: 'region', id: n('liquid'), points: rect(points, n('liq'), 0.07, 0.07, W - 0.07, 2.9), tone: o.tone ?? 'muted', shade: o.tone ? 0.22 : 0.14, group: n('beaker') });
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: n(`glass${i}`), from: glass[i], to: glass[i + 1], tone: 'ink', weight: 3, group: n('beaker') });
  points[n('sol-at')] = [W / 2, -0.1];
  items.push({ kind: 'label', id: n('solution'), at: n('sol-at'), tex: o.solution, place: 'below', group: n('beaker') });
  const top = 5.6;
  const strip = (id: 'cathode' | 'anode', cx: number, tex: string, tone: DiagramTone) => {
    const c = rect(points, n(`${id}-m`), cx - 0.3, 0.5, cx + 0.3, top);
    const left = id === 'cathode';
    points[n(`${id}-at`)] = [left ? cx - 0.42 : cx + 0.42, top - 0.35];
    items.push(
      { kind: 'region', id: n(`${id}-metal`), points: c, tone: 'ink', shade: 0.45, group: n(id) },
      { kind: 'curve', id: n(`${id}-edge`), points: c, closed: true, tone: 'ink', weight: 2.5, group: n(id) },
      { kind: 'label', id: n(`${id}-name`), at: n(`${id}-at`), tex, place: left ? 'left' : 'right', tone, group: n(id) },
    );
  };
  strip('cathode', 1.7, o.cathode ?? '\\text{cathode}\\ (-)', TONE.cathode);
  strip('anode', 7.3, o.anode ?? '\\text{anode}\\ (+)', TONE.anode);
  // The power supply: wires up from each electrode to a cell symbol in the middle.
  const Y = 6.8;
  const wl = path(points, n('wl'), [[1.7, top], [1.7, Y], [4.2, Y]]);
  const wr = path(points, n('wr'), [[4.8, Y], [7.3, Y], [7.3, top]]);
  Object.assign(points, { [n('neg-a')]: [4.2, Y - 0.32], [n('neg-b')]: [4.2, Y + 0.32], [n('pos-a')]: [4.8, Y - 0.62], [n('pos-b')]: [4.8, Y + 0.62] });
  Object.assign(points, { [n('neg-at')]: [3.8, Y + 0.5], [n('pos-at')]: [5.2, Y + 0.75], [n('supply-at')]: [4.5, Y + 1.3] });
  items.push(
    { kind: 'curve', id: n('wire-l'), points: wl, tone: 'ink', weight: 3, group: n('supply') },
    { kind: 'curve', id: n('wire-r'), points: wr, tone: 'ink', weight: 3, group: n('supply') },
    { kind: 'line', id: n('neg'), from: n('neg-a'), to: n('neg-b'), tone: 'ink', weight: 7, group: n('supply') },
    { kind: 'line', id: n('pos'), from: n('pos-a'), to: n('pos-b'), tone: 'ink', weight: 3, group: n('supply') },
    { kind: 'label', id: n('neg-sign'), at: n('neg-at'), tex: '\\boldsymbol{-}', place: 'center', tone: TONE.cathode, group: n('supply') },
    { kind: 'label', id: n('pos-sign'), at: n('pos-at'), tex: '\\boldsymbol{+}', place: 'center', tone: TONE.anode, group: n('supply') },
    { kind: 'label', id: n('supply-name'), at: n('supply-at'), tex: '\\text{power supply}', place: 'above', tone: 'muted', group: n('supply') },
  );
  if (o.electrons) {
    // Under the wires: from the anode toward the supply, and from the supply toward the cathode.
    const y = Y - 0.55;
    Object.assign(points, { [n('e0-a')]: [6.8, y], [n('e0-b')]: [5.3, y], [n('e1-a')]: [3.7, y], [n('e1-b')]: [2.2, y] });
    items.push(
      { kind: 'line', id: n('e0'), from: n('e0-a'), to: n('e0-b'), arrow: true, tone: TONE.electron, weight: 3.5, label: '\\ce{e-}', labelSide: 'left', group: n('electrons') },
      { kind: 'line', id: n('e1'), from: n('e1-a'), to: n('e1-b'), arrow: true, tone: TONE.electron, weight: 3.5, label: '\\ce{e-}', labelSide: 'left', group: n('electrons') },
    );
  }
  if (o.ions) {
    Object.assign(points, { [n('cat-ion-at')]: [3.5, 1.2], [n('an-ion-at')]: [5.5, 1.2] });
    items.push(
      { kind: 'label', id: n('cat-ion'), at: n('cat-ion-at'), tex: o.ions.cation, place: 'center', tone: TONE.cation },
      { kind: 'label', id: n('an-ion'), at: n('an-ion-at'), tex: o.ions.anion, place: 'center', tone: TONE.anion },
    );
  }
  if (o.products) {
    Object.assign(points, { [n('cat-product-at')]: [2.2, 2.35], [n('an-product-at')]: [6.8, 2.35] });
    items.push(
      { kind: 'label', id: n('cat-product'), at: n('cat-product-at'), tex: o.products.cathode, place: 'right', tone: 'good' },
      { kind: 'label', id: n('an-product'), at: n('an-product-at'), tex: o.products.anode, place: 'left', tone: 'good' },
    );
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- a scale of potentials

/**
 * A vertical scale of standard reduction potentials from `min` to `max` volts, `per` diagram units
 * to the volt (3 by default), with a tick every `step` volts and `E° (V)` at the top. Each point is
 * a dot on the scale with its label (TeX) on the right. Each span is an arrow beside the scale, on
 * the left, from one value to another, with its label (TeX) on its left: the distance from the
 * anode up to the cathode is the cell potential.
 *
 * Parts: `axis` (a group: the line, ticks and title), each point by its `id` (its dot and label),
 * and each span by its `id` (the arrow, with dashed lines across from the scale, in a group).
 */
export function potentials(o: {
  name?: string;
  min: number;
  max: number;
  step?: number;
  per?: number;
  points: { id: string; value: number; tex: string; tone?: DiagramTone }[];
  spans?: { id: string; from: number; to: number; tex: string; tone?: DiagramTone }[];
  /** How far to the right the points' labels reach, in diagram units (4.4 by default). */
  room?: number;
}): Part {
  const n = namer(o.name);
  const k = o.per ?? 3;
  const Y = (v: number) => v * k;
  const points: Record<string, P> = { [n('lo')]: [0, Y(o.min) - 0.2], [n('hi')]: [0, Y(o.max) + 0.5] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('line'), from: n('lo'), to: n('hi'), tone: 'ink', weight: 3, arrow: true, group: n('axis') }];
  const step = o.step ?? 0.25;
  const count = Math.round((o.max - o.min) / step);
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * step;
    Object.assign(points, { [n(`t${i}a`)]: [-0.15, Y(v)], [n(`t${i}b`)]: [0.15, Y(v)] });
    items.push({ kind: 'line', id: n(`tick${i}`), from: n(`t${i}a`), to: n(`t${i}b`), tone: 'muted', weight: 2, group: n('axis') });
  }
  items.push({ kind: 'label', id: n('title'), at: n('hi'), tex: 'E^\\circ\\ (\\text{V})', place: 'above', tone: 'muted', group: n('axis') });
  for (const p of o.points) {
    points[n(p.id)] = [0, Y(p.value)];
    items.push({ kind: 'label', id: n(p.id), at: n(p.id), tex: p.tex, tone: p.tone ?? 'ink', place: 'right', dot: true });
  }
  // Room for the labels: the points' names on the right, the spans' labels on the left.
  Object.assign(points, { [n('room-l')]: [o.spans?.length ? -2.9 : -0.6, Y(o.min)], [n('room-r')]: [o.room ?? 4.4, Y(o.min)] });
  for (const s of o.spans ?? []) {
    const id = n(s.id);
    const x = -0.9;
    Object.assign(points, { [`${id}-a`]: [x, Y(s.from)], [`${id}-b`]: [x, Y(s.to)], [`${id}-fa`]: [-0.2, Y(s.from)], [`${id}-fb`]: [-0.2, Y(s.to)], [`${id}-ga`]: [x - 0.25, Y(s.from)], [`${id}-gb`]: [x - 0.25, Y(s.to)] });
    items.push(
      { kind: 'line', id: `${id}-from`, from: `${id}-fa`, to: `${id}-ga`, tone: 'muted', weight: 2, dashed: true, group: id },
      { kind: 'line', id: `${id}-to`, from: `${id}-fb`, to: `${id}-gb`, tone: 'muted', weight: 2, dashed: true, group: id },
      { kind: 'line', id: `${id}-arrow`, from: `${id}-a`, to: `${id}-b`, tone: s.tone ?? 'good', weight: 4, arrow: true, label: s.tex, labelSide: s.to > s.from ? 'left' : 'right', group: id },
    );
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- quantities in boxes

export interface FlowNode {
  id: string;
  tex: string;
  tone?: DiagramTone;
  /** Written under the box, such as the value worked out. */
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
 * next (labelled above the arrow). A node's `value` is written under its box.
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
