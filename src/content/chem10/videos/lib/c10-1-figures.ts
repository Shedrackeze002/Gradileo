/**
 * Figures for the Matter and the Particle Model videos (Grade 10 Chemistry, unit 1), built only
 * from standard diagram parts (lines, curves, shaded regions and labels), so each goes into a
 * diagram with `figure` (src/video/solids.ts). With a `name`, each part's id starts with it.
 *
 * - `tag`: a label (TeX) at a point; `room`: two unused points that reserve space for labels.
 * - `stateBoxes`: the particles of a solid, a liquid and a gas side by side, each named below.
 * - `syringe`: a sealed syringe of gas or liquid particles, with its plunger pulled out or pushed in.
 * - `stateChanges`: a solid, a liquid and a gas at the corners of a triangle, joined by the six
 *   changes of state (taken-in energy orange, given-out energy blue).
 * - `heatingCurve`: the lesson's heating curve, with its five sections labelled A to E.
 * - `mixBeakers`: salt water (homogeneous) beside oil, water and sand (heterogeneous).
 * - `filtration`: a filter funnel with filter paper over a beaker: residue on the paper, filtrate below.
 * - `evaporation`: an evaporating dish of solution on a tripod over a flame, with vapour rising.
 * - `distillation`: a flask of solution over a flame, a thermometer, a condenser with cold water
 *   flowing round it, and a beaker collecting the distillate; with `column`, a fractionating column.
 * - `separatingFunnel`: two liquid layers in a separating funnel with a tap, over a beaker.
 * - `chromatographyTank`: a strip of chromatography paper standing in a little solvent under a lid.
 * - `chromatogram`: the paper afterwards: baseline, solvent front, spots and measuring arrows.
 * - `cylinders`: two measuring cylinders, before and after an object is lowered into the water.
 * - `floatSink`: a beaker of water with a block of ice floating and an iron nail on the bottom.
 * - `hazardFrame`: the red-bordered diamond that every hazard pictogram sits in.
 * - `testTube`: a test tube of liquid in a holder over a small flame, its open end pointing away.
 *
 * Particles are drawn with `particles` from src/video/chem.ts where a square container suits.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { particles } from '@/video/chem.ts';
import { plane, polyline } from '@/video/graph.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** Two points that nothing uses, so the diagram keeps room for labels out to them. */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** Point names around a circle (or ellipse, with `ry`), added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 16, ry = r): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + ry * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A filled circle with an edge, as two parts: the fill `id` and the edge `id-edge`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, group?: string) {
  const ids = ring(points, id, c, r);
  items.push(
    { kind: 'region', id, points: ids, tone, shade: 0.75, ...(group ? { group } : {}) },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, ...(group ? { group } : {}) },
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

/** Adds a polyline of named points; returns the names. */
function path(points: Record<string, P>, id: string, list: P[]): string[] {
  return list.map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
}

/** Moves every item into one group (so a whole figure from chem.ts appears at once). */
function regroup(part: Part, group: string): Part {
  return { points: part.points, items: part.items.map((it) => ({ ...it, group })) };
}

/**
 * The particles of a solid, a liquid and a gas side by side, each container `size` across (5 by
 * default) and named below. Parts: `solid`, `liquid` and `gas` (each a group: container, particles
 * and name).
 */
export function stateBoxes(o: { name?: string; size?: number; gap?: number } = {}): Part {
  const n = namer(o.name);
  const size = o.size ?? 5;
  const gap = o.gap ?? 2;
  const parts: Part[] = [];
  (['solid', 'liquid', 'gas'] as const).forEach((state, i) => {
    const x = i * (size + gap);
    const box = particles({ name: n(`${state}-f`), at: [x, 0], state, size, open: state !== 'gas', seed: 11 + i, kinds: [{ id: 'p', tone: 'adj', count: state === 'gas' ? 9 : 16 }] });
    parts.push(regroup(box, n(state)), tag(n(`${state}-name`), [x + size / 2, -0.25], `\\text{${state}}`, { place: 'below', group: n(state) }));
  });
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/**
 * A sealed syringe lying on its side: the barrel `length` long (9 by default) with its nozzle
 * sealed on the left, the plunger `plunger` from the sealed end, and particles in the space
 * between: a gas spread out, or a liquid packed close. `at` is the barrel's bottom left corner.
 * Parts: `barrel` (a group), `plunger` (a group) and `p` (a group: the particles).
 */
export function syringe(o: { name?: string; at?: P; length?: number; plunger: number; state: 'gas' | 'liquid'; count?: number; seed?: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 9;
  const H = 2.4;
  const px = x0 + o.plunger;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const line = (id: string, a: P, b: P, group: string, weight = 3, tone: DiagramTone = 'muted') => {
    points[`${id}-a`] = a;
    points[`${id}-b`] = b;
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, weight, tone, group });
  };
  const barrel = n('barrel');
  line(n('top'), [x0, y0 + H], [x0 + L, y0 + H], barrel);
  line(n('bottom'), [x0, y0], [x0 + L, y0], barrel);
  line(n('end'), [x0, y0], [x0, y0 + H], barrel);
  line(n('noz-t'), [x0, y0 + H / 2 + 0.25], [x0 - 0.8, y0 + H / 2 + 0.25], barrel);
  line(n('noz-b'), [x0, y0 + H / 2 - 0.25], [x0 - 0.8, y0 + H / 2 - 0.25], barrel);
  line(n('seal'), [x0 - 0.8, y0 + H / 2 - 0.45], [x0 - 0.8, y0 + H / 2 + 0.45], barrel, 6, 'bad');
  const plunger = n('plunger');
  const rodEnd = Math.max(px + 1.5, x0 + L + 1.2);
  line(n('head'), [px, y0 + 0.12], [px, y0 + H - 0.12], plunger, 7, 'ink');
  line(n('rod'), [px, y0 + H / 2], [rodEnd, y0 + H / 2], plunger, 4, 'ink');
  line(n('thumb'), [rodEnd, y0 + 0.2], [rodEnd, y0 + H - 0.2], plunger, 6, 'ink');
  const r = 0.3;
  const rand = random(o.seed ?? 5);
  const spots: P[] = [];
  const w = px - x0;
  if (o.state === 'gas') {
    const count = o.count ?? 7;
    const m = r + 0.15;
    for (let apart = Math.min(1.8, w / 2); spots.length < count; apart *= 0.92) {
      spots.length = 0;
      for (let tries = 0; spots.length < count && tries < 3000; tries++) {
        const p: P = [x0 + m + rand() * (w - 2 * m), y0 + m + rand() * (H - 2 * m)];
        if (spots.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) >= apart)) spots.push(p);
      }
    }
  } else {
    const cell = 0.62;
    const rows = Math.floor((H - 0.1) / cell);
    const cols = Math.floor((w - 0.15) / cell);
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols - (row % 2); col++)
        spots.push([x0 + 0.08 + cell / 2 + col * cell + (row % 2 ? cell / 2 : 0) + (rand() - 0.5) * 0.08, y0 + 0.05 + cell / 2 + row * cell + (rand() - 0.5) * 0.06]);
  }
  spots.forEach((p, i) => ball(points, items, n(`p${i}`), p, r, o.tone ?? 'adj', n('p')));
  return { points, items };
}

/**
 * A solid (bottom left), a liquid (bottom right) and a gas (top) at the corners of a triangle,
 * joined by two arrows for each pair of states: the changes that take in energy in orange, those
 * that give it out in blue. Parts: `solid`, `liquid`, `gas` (groups: container, particles and
 * name), and the arrows `melt`, `freeze`, `evap`, `cond`, `subl` and `depo`, each with its name.
 */
export function stateChanges(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const s = 4;
  const W = 24;
  const corner = { solid: [0, 0], liquid: [W - s, 0], gas: [(W - s) / 2, 10] } as Record<'solid' | 'liquid' | 'gas', P>;
  const parts: Part[] = [];
  (['solid', 'liquid', 'gas'] as const).forEach((state, i) => {
    const [x, y] = corner[state];
    const box = particles({ name: n(`${state}-f`), at: [x, y], state, size: s, open: state !== 'gas', seed: 21 + i, kinds: [{ id: 'p', tone: 'adj', count: state === 'gas' ? 6 : 9 }] });
    parts.push(regroup(box, n(state)), tag(n(`${state}-name`), state === 'gas' ? [x + s + 0.2, y + s / 2] : [x + s / 2, y - 0.2], `\\text{${state}}`, { place: state === 'gas' ? 'right' : 'below', group: n(state) }));
  });
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // One arrow from a to b, moved sideways by `off` (to the left of a→b), with its label on `side`.
  const arrow = (id: string, a: P, b: P, off: number, tex: string, takesIn: boolean, side: 'left' | 'right', labelAt = 0.5) => {
    const d: P = [b[0] - a[0], b[1] - a[1]];
    const len = Math.hypot(d[0], d[1]);
    const u: P = [d[0] / len, d[1] / len];
    const v: P = [-u[1], u[0]];
    points[n(`${id}-a`)] = [a[0] + v[0] * off, a[1] + v[1] * off];
    points[n(`${id}-b`)] = [b[0] + v[0] * off, b[1] + v[1] * off];
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), arrow: true, weight: 3.5, tone: takesIn ? 'opp' : 'adj', label: `\\text{${tex}}`, labelSide: side, labelAt });
  };
  const gx = corner.gas[0];
  // Solid and liquid: melting along the top, freezing back along the bottom.
  arrow('melt', [s + 0.8, 2.6], [W - s - 0.8, 2.6], 0, 'melting', true, 'left');
  arrow('freeze', [W - s - 0.8, 1.3], [s + 0.8, 1.3], 0, 'freezing', false, 'left');
  // Solid and gas: sublimation up the outside, deposition down the inside.
  const sa: P = [s - 0.3, s + 0.7];
  const sb: P = [gx - 0.3, 10 - 0.5];
  arrow('subl', sa, sb, 0.45, 'sublimation', true, 'left');
  arrow('depo', sb, sa, 0.45, 'deposition', false, 'left', 0.64);
  // Liquid and gas: evaporation or boiling up the outside, condensation down the inside.
  const la: P = [W - s + 0.3, s + 0.7];
  const lb: P = [gx + s + 0.3, 10 - 0.5];
  arrow('evap', la, lb, -0.45, 'evaporation, boiling', true, 'right');
  arrow('cond', lb, la, -0.45, 'condensation', false, 'right', 0.64);
  parts.push({ points, items });
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/**
 * The heating curve from the lesson: a pure substance warmed from 20 °C, melting at 50 °C and
 * boiling at 120 °C, over 28 minutes. Parts: `grid`, `axes` (groups), `curve` (a group of the
 * five sections `curve-0` to `curve-4`, labelled A to E), and the dashed levels `mp` and `bp`
 * (groups).
 */
export function heatingCurve(): Part {
  const g = plane({ x: [0, 30], y: [0, 140], xStep: 5, yStep: 20, width: 10, height: 8, titles: { x: '\\text{Time (min)}', y: '\\text{Temperature }(^\\circ\\text{C})' } });
  const curve = polyline(g, { id: 'curve', points: [[0, 20], [4, 50], [10, 50], [17, 120], [25, 120], [28, 140]], labels: ['A', 'B', 'C', 'D', 'E'], sides: ['right', 'left', 'left', 'left', 'left'] });
  const mp = polyline(g, { id: 'mp', points: [[0, 50], [4, 50]], tone: 'muted', dashed: true });
  const bp = polyline(g, { id: 'bp', points: [[0, 120], [17, 120]], tone: 'muted', dashed: true });
  return { points: { ...g.points, ...mp.points, ...bp.points, ...curve.points }, items: [...g.items, ...mp.items, ...bp.items, ...curve.items] };
}

/**
 * A filter funnel lined with filter paper, its stem in a beaker. Parts: `funnel` (a group: the
 * funnel and the beaker), `paper`, `mixture` (the liquid in the paper), `residue` (the solid on the
 * paper), `drip`, `filtrate`, the labels `paper-l` and `filtrate-l`, and `residue-p` (a group: the
 * residue's label `residue-l` and its pointer). Labels are TeX from `labels`.
 */
export function filtration(o: { labels?: { paper?: string; residue?: string; filtrate?: string } } = {}): Part {
  const L = o.labels ?? {};
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const line = (id: string, a: P, b: P, group?: string, tone: DiagramTone = 'muted', weight = 3, arrow = false) => {
    points[`${id}-a`] = a;
    points[`${id}-b`] = b;
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, weight, ...(arrow ? { arrow } : {}), ...(group ? { group } : {}) });
  };
  // The funnel: a cone from the rim down to the stem.
  line('cone-l', [-3, 8], [-0.35, 4.6], 'funnel');
  line('cone-r', [3, 8], [0.35, 4.6], 'funnel');
  line('stem-l', [-0.35, 4.6], [-0.35, 2.4], 'funnel');
  line('stem-r', [0.35, 4.6], [0.35, 2.4], 'funnel');
  // The beaker under it.
  line('bk-l', [-2.4, 3.2], [-2.4, 0], 'funnel');
  line('bk-b', [-2.4, 0], [2.4, 0], 'funnel');
  line('bk-r', [2.4, 0], [2.4, 3.2], 'funnel');
  // The filter paper: a cone just inside the funnel.
  items.push({ kind: 'curve', id: 'paper', points: path(points, 'pp', [[-2.75, 8.2], [0, 4.95], [2.75, 8.2]]), tone: 'ink', weight: 2.5 });
  // The liquid in the paper, and the solid at its bottom.
  items.push({ kind: 'region', id: 'mixture', points: path(points, 'mx', [[-1.95, 7.1], [1.95, 7.1], [0.85, 5.95], [-0.85, 5.95]]), tone: 'adj', shade: 0.3 });
  items.push({ kind: 'region', id: 'residue', points: path(points, 'rs', [[-0.85, 5.95], [0.85, 5.95], [0, 4.95]]), tone: 'opp', shade: 0.7 });
  line('drip', [0, 2.2], [0, 1.4], undefined, 'adj', 3, true);
  items.push({ kind: 'region', id: 'filtrate', points: path(points, 'ft', [[-2.4, 0], [2.4, 0], [2.4, 1.1], [-2.4, 1.1]]), tone: 'adj', shade: 0.35 });
  const label = (id: string, at: P, tex: string, place: Place) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place });
  };
  label('paper-l', [2.8, 7.7], L.paper ?? '\\text{filter paper}', 'right');
  // The residue's label sits outside the funnel, with a pointer to the solid.
  line('residue-ptr', [0.45, 5.45], [3.0, 5.45], 'residue-p', 'muted', 2);
  points['residue-l-at'] = [3.0, 5.45];
  items.push({ kind: 'label', id: 'residue-l', at: 'residue-l-at', tex: L.residue ?? '\\text{residue}', place: 'right', group: 'residue-p' });
  label('filtrate-l', [2.5, 0.55], L.filtrate ?? '\\text{filtrate}', 'right');
  Object.assign(points, { 'room-a': [-3.2, 0], 'room-b': [8.2, 8.2] });
  return { points, items };
}

/**
 * An evaporating dish of solution on a tripod and gauze over a flame, with vapour rising from it.
 * Parts: `stand` (a group: tripod, gauze and burner), `flame`, `dish`, `solution`, `solid` (the
 * dry solid left in the dish), `vapour` (a group of three arrows) and the labels `solution-l`,
 * `solid-l`, `vapour-l` and `heat-l`.
 */
export function evaporation(o: { solution?: string; solid?: string } = {}): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const line = (id: string, a: P, b: P, group?: string, tone: DiagramTone = 'muted', weight = 3, arrow = false) => {
    points[`${id}-a`] = a;
    points[`${id}-b`] = b;
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, weight, ...(arrow ? { arrow } : {}), ...(group ? { group } : {}) });
  };
  // The dish: the lower half of an ellipse.
  const rim: P[] = Array.from({ length: 25 }, (_, i) => {
    const a = (Math.PI * i) / 24;
    return [3 * Math.cos(a), 3.3 - 1.3 * Math.sin(a)];
  });
  items.push({ kind: 'curve', id: 'dish', points: path(points, 'dish', rim), tone: 'ink', weight: 3 });
  // The solution: the part of the dish below the surface at 2.75.
  const below = (top: number): P[] => {
    const s = (3.3 - top) / 1.3;
    const a0 = Math.asin(Math.min(1, s));
    return Array.from({ length: 17 }, (_, i) => {
      const a = a0 + ((Math.PI - 2 * a0) * i) / 16;
      return [3 * Math.cos(a) * 0.97, 3.3 - 1.3 * Math.sin(a) + 0.04];
    });
  };
  items.push({ kind: 'region', id: 'solution', points: path(points, 'sol', below(2.75)), tone: 'adj', shade: 0.35 });
  items.push({ kind: 'region', id: 'solid', points: path(points, 'sld', below(2.2)), tone: 'ink', shade: 0.55 });
  // Gauze, tripod legs and a burner with its flame.
  line('gauze', [-3.6, 1.95], [3.6, 1.95], 'stand', 'muted', 3);
  line('leg-l', [-3.1, 1.95], [-3.7, -2], 'stand');
  line('leg-r', [3.1, 1.95], [3.7, -2], 'stand');
  line('tube-l', [-0.3, -2], [-0.3, -0.7], 'stand');
  line('tube-r', [0.3, -2], [0.3, -0.7], 'stand');
  line('base', [-1.1, -2], [1.1, -2], 'stand', 'muted', 4);
  items.push({ kind: 'curve', id: 'flame', points: path(points, 'fl', [[-0.3, -0.6], [-0.4, 0.1], [-0.15, 0.8], [0, 1.45], [0.15, 0.8], [0.4, 0.1], [0.3, -0.6]]), tone: 'opp', weight: 3 });
  // Vapour rising.
  [-1.4, 0, 1.4].forEach((x, i) => line(`vap${i}`, [x, 3.6], [x + 0.25, 5.2], 'vapour', 'muted', 2.5, true));
  const label = (id: string, at: P, tex: string, place: Place) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place });
  };
  label('vapour-l', [1.9, 4.7], '\\text{water vapour}', 'right');
  label('solution-l', [3.1, 2.7], o.solution ?? '\\text{salt solution}', 'right');
  label('solid-l', [3.1, 2.7], o.solid ?? '\\text{salt}', 'right');
  label('heat-l', [0.5, -0.3], '\\text{heat}', 'right');
  Object.assign(points, { 'room-a': [-3.8, -2], 'room-b': [8.2, 5.4] });
  return { points, items };
}

/**
 * Distillation: a round flask of solution over a flame, a thermometer at the top, a sloping
 * condenser with cold water flowing round it, and a beaker collecting the distillate. With
 * `column`, a fractionating column stands between the flask and the thermometer.
 *
 * Parts: `flask` (a group: flask, neck and column), `solution`, `flame`, `thermo`, `tube` (a
 * group: the tube from the flask to the beaker), `jacket` (a group: the condenser's water jacket),
 * `water-in` and `water-out` (arrows), `vapour` (an arrow along the tube), `beaker` (a group),
 * `drip`, `distillate`, `beads` (a group, in the column) and the labels `thermo-l`, `cond-l`,
 * `in-l`, `out-l`, `solution-l`, `distillate-l`, `column-l` and `heat-l`.
 */
export function distillation(o: { column?: boolean; solution?: string; distillate?: string } = {}): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const line = (id: string, a: P, b: P, group?: string, tone: DiagramTone = 'muted', weight = 3, arrow = false) => {
    points[`${id}-a`] = a;
    points[`${id}-b`] = b;
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, weight, ...(arrow ? { arrow } : {}), ...(group ? { group } : {}) });
  };
  const label = (id: string, at: P, tex: string, place: Place, tone?: DiagramTone) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place, ...(tone ? { tone } : {}) });
  };
  const R = 2;
  const c: P = [0, 2];
  const neckW = 0.5;
  // The flask: a circle open at the top for the neck.
  const gap = Math.asin(neckW / R);
  const arc: P[] = Array.from({ length: 33 }, (_, i) => {
    const a = Math.PI / 2 + gap + ((2 * Math.PI - 2 * gap) * i) / 32;
    return [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)];
  });
  items.push({ kind: 'curve', id: 'bulb', points: path(points, 'bulb', arc), tone: 'muted', weight: 3, group: 'flask' });
  const neckBase = c[1] + Math.sqrt(R * R - neckW * neckW);
  const top = o.column ? 9.2 : 6;
  line('neck-l', [-neckW, neckBase], [-neckW, top], 'flask');
  line('neck-r', [neckW, neckBase], [neckW, top], 'flask');
  line('stopper', [-neckW - 0.15, top], [neckW + 0.15, top], 'flask', 'muted', 5);
  if (o.column) {
    // Glass beads in the column.
    for (let i = 0; i < 6; i++) {
      const y = 4.6 + i * 0.62;
      const x = i % 2 ? 0.16 : -0.16;
      const ids = ring(points, `bead${i}`, [x, y], 0.2, 10);
      items.push({ kind: 'curve', id: `bead${i}`, points: ids, closed: true, tone: 'muted', weight: 2, group: 'beads' });
    }
    label('column-l', [-0.65, 6.2], '\\text{fractionating column}', 'left');
  }
  // The solution in the bottom of the flask.
  const level = 1.6;
  const a0 = Math.asin((level - c[1]) / R);
  const pool: P[] = Array.from({ length: 21 }, (_, i) => {
    const a = Math.PI - a0 + ((Math.PI + 2 * a0) * i) / 20;
    return [c[0] + R * 0.96 * Math.cos(a), c[1] + R * 0.96 * Math.sin(a)];
  });
  items.push({ kind: 'region', id: 'solution', points: path(points, 'pool', pool), tone: 'adj', shade: 0.35 });
  // The flame under the flask.
  items.push({ kind: 'curve', id: 'flame', points: path(points, 'fl', [[-0.3, -1.2], [-0.4, -0.6], [-0.15, -0.2], [0, 0.2], [0.15, -0.2], [0.4, -0.6], [0.3, -1.2]]), tone: 'opp', weight: 3 });
  label('heat-l', [0.45, -0.8], '\\text{heat}', 'right');
  // The thermometer, its bulb level with the side arm.
  const arm = top - 0.6;
  line('thermo', [0, top + 1.1], [0, arm - 0.15], undefined, 'ink', 3);
  label('thermo-l', [0, top + 1.1], '\\text{thermometer}', 'above');
  // The tube: from the side arm down to the beaker, its inside 0.5 wide.
  const end: P = [11, o.column ? 2.6 : 1.9];
  const start: P = [neckW, arm];
  const d: P = [end[0] - start[0], end[1] - start[1]];
  const len = Math.hypot(d[0], d[1]);
  const u: P = [d[0] / len, d[1] / len];
  const v: P = [-u[1], u[0]];
  const along = (t: number, off: number): P => [start[0] + d[0] * t + v[0] * off, start[1] + d[1] * t + v[1] * off];
  line('tube-t', along(0, 0.25), along(1, 0.25), 'tube');
  line('tube-b', along(0, -0.25), along(1, -0.25), 'tube');
  // The water jacket around the middle of the tube.
  const [j0, j1] = [0.3, 0.84];
  line('jk-t', along(j0, 0.75), along(j1, 0.75), 'jacket', 'adj', 3);
  line('jk-b', along(j0, -0.75), along(j1, -0.75), 'jacket', 'adj', 3);
  line('jk-l', along(j0, 0.75), along(j0, -0.75), 'jacket', 'adj', 3);
  line('jk-r', along(j1, 0.75), along(j1, -0.75), 'jacket', 'adj', 3);
  items.push({ kind: 'region', id: 'jk-water', points: path(points, 'jw', [along(j0, 0.72), along(j1, 0.72), along(j1, -0.72), along(j0, -0.72)]), tone: 'adj', shade: 0.15, group: 'jacket' });
  // Cold water in at the lower end (from below), out at the upper end (from the top).
  const inAt = along(j1 - 0.05, -0.75);
  const outAt = along(j0 + 0.05, 0.75);
  line('water-in', [inAt[0], inAt[1] - 1.3], inAt, undefined, 'adj', 3, true);
  line('water-out', outAt, [outAt[0], outAt[1] + 1.3], undefined, 'adj', 3, true);
  label('in-l', [inAt[0] - 0.15, inAt[1] - 1.2], '\\text{cold water in}', 'left', 'adj');
  label('out-l', [outAt[0] + 0.2, outAt[1] + 1.3], '\\text{water out}', 'right', 'adj');
  label('cond-l', along(0.62, 0.8), '\\text{condenser}', 'above right');
  // The vapour travelling along the tube.
  line('vapour', along(0.05, 0), along(0.27, 0), undefined, 'ink', 2.5, true);
  // The beaker under the end of the tube.
  const bx = end[0];
  const by = -1.2;
  line('bk-l', [bx - 1.3, end[1] + 0.2], [bx - 1.3, by], 'beaker');
  line('bk-b', [bx - 1.3, by], [bx + 1.3, by], 'beaker');
  line('bk-r', [bx + 1.3, by], [bx + 1.3, end[1] + 0.2], 'beaker');
  line('drip', [bx, end[1] - 0.35], [bx, by + 1.0], undefined, 'adj', 2.5, true);
  items.push({ kind: 'region', id: 'distillate', points: path(points, 'dst', [[bx - 1.3, by], [bx + 1.3, by], [bx + 1.3, by + 0.7], [bx - 1.3, by + 0.7]]), tone: 'adj', shade: 0.35 });
  label('distillate-l', [bx + 1.4, by + 0.35], o.distillate ?? '\\text{distillate}', 'right');
  label('solution-l', [-2.05, 0.9], o.solution ?? '\\text{salt water}', 'left');
  Object.assign(points, { 'room-a': [-5.4, by], 'room-b': [bx + 4.6, top + 1.4] });
  return { points, items };
}

/**
 * A separating funnel holding two layers, its tap above a beaker. Parts: `funnel` (a group:
 * funnel, tap and beaker), `upper` and `lower` (the layers), and the labels `upper-l`, `lower-l`
 * and `tap-l`.
 */
export function separatingFunnel(o: { upper?: string; lower?: string } = {}): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The right half of the outline, from the top of the neck down to the bottom of the stem.
  const half: P[] = [[0.35, 9], [0.35, 8.3], [1.4, 7.7], [2.1, 6.7], [2.1, 5.9], [1.5, 4.7], [0.3, 3.5], [0.3, 1.4]];
  const mirror = (p: P): P => [-p[0], p[1]];
  items.push({ kind: 'curve', id: 'side-r', points: path(points, 'sr', half), tone: 'muted', weight: 3, group: 'funnel' });
  items.push({ kind: 'curve', id: 'side-l', points: path(points, 'sl', half.map(mirror)), tone: 'muted', weight: 3, group: 'funnel' });
  // The width of the funnel at a height, from the outline.
  const xAt = (y: number) => {
    for (let i = 0; i < half.length - 1; i++) {
      const [a, b] = [half[i], half[i + 1]];
      if ((y <= a[1] && y >= b[1]) || (y >= a[1] && y <= b[1])) return a[1] === b[1] ? Math.max(a[0], b[0]) : a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]);
    }
    return 0;
  };
  const layer = (id: string, y0: number, y1: number, tone: DiagramTone) => {
    const ys = [y0, ...half.map((p) => p[1]).filter((y) => y > y0 && y < y1).sort((p, q) => p - q), y1];
    const right = ys.map((y) => [xAt(y) - 0.06, y] as P);
    const left = [...ys].reverse().map((y) => [-(xAt(y) - 0.06), y] as P);
    items.push({ kind: 'region', id, points: path(points, id, [...right, ...left]), tone, shade: 0.45 });
  };
  layer('lower', 3.6, 5.5, 'adj');
  layer('upper', 5.5, 7.3, 'theta');
  // The tap: a small bar across the stem.
  points['tap-a'] = [-0.75, 2.4];
  points['tap-b'] = [0.75, 2.4];
  items.push({ kind: 'line', id: 'tap', from: 'tap-a', to: 'tap-b', tone: 'ink', weight: 8, group: 'funnel' });
  // A beaker under the stem.
  const bk: P[] = [[-1.6, 1.8], [-1.6, -0.6], [1.6, -0.6], [1.6, 1.8]];
  items.push({ kind: 'curve', id: 'beaker', points: path(points, 'bk', bk), tone: 'muted', weight: 3, group: 'funnel' });
  const label = (id: string, at: P, tex: string, place: Place) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place });
  };
  label('upper-l', [2.2, 6.6], o.upper ?? '\\text{oil (less dense)}', 'right');
  label('lower-l', [2.0, 4.6], o.lower ?? '\\text{water (denser)}', 'right');
  label('tap-l', [0.8, 2.4], '\\text{tap}', 'right');
  Object.assign(points, { 'room-a': [-2.4, -0.6], 'room-b': [8.6, 9] });
  return { points, items };
}

/**
 * A strip of chromatography paper standing in a container with a little solvent in the bottom,
 * under a lid; a pencil baseline across the paper above the solvent, with spots on it. Parts:
 * `tank` (a group: container and lid), `paper`, `baseline`, `spots` (a group), `solvent`, and the
 * labels `lid-l`, `paper-l`, `baseline-l` and `solvent-l`.
 */
export function chromatographyTank(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  items.push({ kind: 'curve', id: 'jar', points: path(points, 'jar', [[-2.6, 8], [-2.6, 0], [2.6, 0], [2.6, 8]]), tone: 'muted', weight: 3, group: 'tank' });
  points['lid-a'] = [-3, 8.15];
  points['lid-b'] = [3, 8.15];
  items.push({ kind: 'line', id: 'lid', from: 'lid-a', to: 'lid-b', tone: 'muted', weight: 6, group: 'tank' });
  items.push({ kind: 'region', id: 'solvent', points: path(points, 'sv', [[-2.55, 0.05], [2.55, 0.05], [2.55, 1.0], [-2.55, 1.0]]), tone: 'adj', shade: 0.35 });
  items.push({ kind: 'curve', id: 'paper', points: path(points, 'pa', [[-1.5, 0.35], [1.5, 0.35], [1.5, 8.0], [-1.5, 8.0]]), closed: true, tone: 'ink', weight: 2.5 });
  points['base-a'] = [-1.5, 1.6];
  points['base-b'] = [1.5, 1.6];
  items.push({ kind: 'line', id: 'baseline', from: 'base-a', to: 'base-b', tone: 'ink', weight: 2, dashed: true });
  ([['s0', -0.8, 'opp'], ['s1', 0, 'hyp'], ['s2', 0.8, 'good']] as const).forEach(([id, x, tone]) => {
    const ids = ring(points, id, [x, 1.6], 0.2, 12);
    items.push({ kind: 'region', id, points: ids, tone, shade: 0.9, group: 'spots' });
  });
  const label = (id: string, at: P, tex: string, place: Place) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place });
  };
  label('lid-l', [3.0, 8.15], '\\text{lid}', 'right');
  label('paper-l', [1.6, 5.4], '\\text{paper}', 'right');
  label('baseline-l', [2.7, 1.9], '\\text{pencil baseline}', 'right');
  label('solvent-l', [2.7, 0.5], '\\text{solvent}', 'right');
  Object.assign(points, { 'room-a': [-3, 0], 'room-b': [8.2, 8.6] });
  return { points, items };
}

/**
 * The chromatogram from the lesson, 10 cm square: the baseline 1 cm above the bottom edge, the
 * solvent front at 9 cm, ink X with spots at 3 cm and 7 cm, dye A with one spot at 3 cm and dye
 * B with one at 7 cm (heights above the bottom edge; across the paper, there is room for arrows). Parts: `paper`, `baseline` and `front` (each with its label), `x-spots`,
 * `a-spot`, `b-spot`, `names` (a group: X, A and B under the baseline), and the measuring arrows
 * `solvent` (8 cm), `low` (2 cm) and `high` (6 cm).
 */
export function chromatogram(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  items.push({ kind: 'curve', id: 'paper', points: path(points, 'pa', [[0, 0], [10, 0], [10, 10], [0, 10]]), closed: true, tone: 'ink', weight: 2.5 });
  points['base-a'] = [0, 1];
  points['base-b'] = [10, 1];
  points['front-a'] = [0, 9];
  points['front-b'] = [10, 9];
  items.push({ kind: 'line', id: 'baseline', from: 'base-a', to: 'base-b', tone: 'muted', weight: 2.5, dashed: true, label: '\\text{baseline}', labelSide: 'left', labelAt: 0.8 });
  items.push({ kind: 'line', id: 'front', from: 'front-a', to: 'front-b', tone: 'brand', weight: 2.5, dashed: true, label: '\\text{solvent front}', labelSide: 'right', labelAt: 0.7 });
  const spot = (id: string, at: P, tone: DiagramTone, group: string) => {
    const ids = ring(points, id, at, 0.42, 14, 0.34);
    items.push({ kind: 'region', id, points: ids, tone, shade: 0.9, group });
  };
  spot('x-low', [3.2, 3], 'opp', 'x-spots');
  spot('x-high', [3.2, 7], 'adj', 'x-spots');
  spot('a', [5.6, 3], 'opp', 'a-spot');
  spot('b', [8, 7], 'adj', 'b-spot');
  ([['x', 3.2, 'X'], ['an', 5.6, 'A'], ['bn', 8, 'B']] as const).forEach(([id, x, t]) => {
    points[`${id}-at`] = [x, 0.48];
    items.push({ kind: 'label', id: `${id}-name`, at: `${id}-at`, tex: `\\text{${t}}`, place: 'center', group: 'names' });
  });
  const arrow = (id: string, x: number, y1: number, tex: string, side: 'left' | 'right', tone: DiagramTone, labelAt = 0.5) => {
    points[`${id}-a`] = [x, 1];
    points[`${id}-b`] = [x, y1];
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, tone, weight: 3, label: tex, labelSide: side, labelAt });
  };
  arrow('solvent', 10.9, 9, '8\\text{ cm}', 'right', 'brand');
  arrow('low', 2.4, 2.75, '2\\text{ cm}', 'right', 'opp');
  arrow('high', 4.0, 6.75, '6\\text{ cm}', 'right', 'adj', 0.72);
  Object.assign(points, { 'room-a': [-1.4, 0], 'room-b': [12.8, 10] });
  return { points, items };
}

/**
 * Two measuring cylinders: water at `before` mL, then at `after` mL with an object (a key) on the
 * bottom. Each is drawn 0 to 60 mL. Parts: `cyl1` and `cyl2` (groups: glass and marks), `water1`,
 * `water2`, `key`, and the labels `level1` and `level2`.
 */
export function cylinders(o: { before: number; after: number }): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const k = 0.12;
  const one = (i: number, x0: number, ml: number) => {
    const g = `cyl${i}`;
    items.push({ kind: 'curve', id: `glass${i}`, points: path(points, `gl${i}`, [[x0, 8], [x0, 0], [x0 + 2.4, 0], [x0 + 2.4, 8]]), tone: 'muted', weight: 3, group: g });
    points[`foot${i}-a`] = [x0 - 0.5, 0];
    points[`foot${i}-b`] = [x0 + 2.9, 0];
    items.push({ kind: 'line', id: `foot${i}`, from: `foot${i}-a`, to: `foot${i}-b`, tone: 'muted', weight: 4, group: g });
    for (let m = 10; m <= 60; m += 10) {
      points[`t${i}-${m}-a`] = [x0, m * k];
      points[`t${i}-${m}-b`] = [x0 + 0.45, m * k];
      items.push({ kind: 'line', id: `tick${i}-${m}`, from: `t${i}-${m}-a`, to: `t${i}-${m}-b`, tone: 'muted', weight: 2, group: g });
    }
    items.push({ kind: 'region', id: `water${i}`, points: path(points, `w${i}`, [[x0 + 0.05, 0.05], [x0 + 2.35, 0.05], [x0 + 2.35, ml * k], [x0 + 0.05, ml * k]]), tone: 'adj', shade: 0.35 });
    points[`level${i}-at`] = [x0 + 2.45, ml * k];
    items.push({ kind: 'label', id: `level${i}`, at: `level${i}-at`, tex: `${ml}\\text{ mL}`, place: 'right' });
  };
  one(1, 0, o.before);
  one(2, 6.5, o.after);
  // A key on the bottom of the second cylinder: a ring and a shaft.
  const ids = ring(points, 'keyring', [7.3, 0.75], 0.42, 14);
  items.push({ kind: 'region', id: 'key', points: ids, tone: 'theta', shade: 0.8, group: 'keyg' });
  items.push({ kind: 'region', id: 'shaft', points: path(points, 'sh', [[7.6, 0.6], [8.6, 0.6], [8.6, 0.9], [7.6, 0.9]]), tone: 'theta', shade: 0.8, group: 'keyg' });
  Object.assign(points, { 'room-a': [-0.6, 0], 'room-b': [11.4, 8] });
  return { points, items };
}

/**
 * A beaker of water with a block of ice floating in it, most of it under the surface, and an iron
 * nail lying on the bottom. Parts: `beaker`, `water`, `ice`, `nail` and the labels `ice-l` and
 * `nail-l`.
 */
export function floatSink(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  items.push({ kind: 'curve', id: 'beaker', points: path(points, 'bk', [[0, 6], [0, 0], [7, 0], [7, 6]]), tone: 'muted', weight: 3 });
  items.push({ kind: 'region', id: 'water', points: path(points, 'wt', [[0.05, 0.05], [6.95, 0.05], [6.95, 4.6], [0.05, 4.6]]), tone: 'adj', shade: 0.3 });
  // Ice: 0.92 of its height under the surface.
  const h = 2;
  const under = 0.92 * h;
  items.push({ kind: 'region', id: 'ice', points: path(points, 'ice', [[1.2, 4.6 - under], [3.2, 4.6 - under], [3.2, 4.6 - under + h], [1.2, 4.6 - under + h]]), tone: 'ink', shade: 0.6 });
  items.push({ kind: 'region', id: 'nail', points: path(points, 'nl', [[4.0, 0.15], [6.1, 0.15], [6.1, 0.4], [4.0, 0.4]]), tone: 'opp', shade: 0.9 });
  const label = (id: string, at: P, tex: string, place: Place) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place });
  };
  label('ice-l', [2.2, 4.75], '\\text{ice floats}', 'above');
  label('nail-l', [5.05, 0.45], '\\text{iron sinks}', 'above');
  Object.assign(points, { 'room-a': [0, 0], 'room-b': [7, 6.6] });
  return { points, items };
}

/**
 * The frame of a hazard pictogram: a square standing on one corner, white inside with a red
 * border. Parts: `inside`, `border`, and the labels `border-l` and `inside-l`.
 */
export function hazardFrame(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const corners = path(points, 'dm', [[3, 0], [6, 3], [3, 6], [0, 3]]);
  const inner = path(points, 'in', [[3, 0.45], [5.55, 3], [3, 5.55], [0.45, 3]]);
  items.push({ kind: 'region', id: 'inside', points: inner, tone: 'ink', shade: 0.92 });
  items.push({ kind: 'curve', id: 'border', points: corners, closed: true, tone: 'bad', weight: 9 });
  const label = (id: string, at: P, tex: string, place: Place) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place });
  };
  label('border-l', [4.6, 4.6], '\\text{red border}', 'above right');
  label('inside-l', [4.6, 1.4], '\\text{white inside}', 'below right');
  Object.assign(points, { 'room-a': [-0.6, 0], 'room-b': [10.5, 6] });
  return { points, items };
}

/**
 * Two beakers: salt water, the same colour all the way through (homogeneous), and oil floating
 * on water with sand on the bottom, in parts you can see (heterogeneous). Parts: `homo` and
 * `hetero` (groups: each beaker, its contents and its label).
 */
export function mixBeakers(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const beaker = (g: string, x0: number) => {
    items.push({ kind: 'curve', id: `${g}-glass`, points: path(points, `${g}-gl`, [[x0, 5], [x0, 0], [x0 + 4.5, 0], [x0 + 4.5, 5]]), tone: 'muted', weight: 3, group: g });
  };
  const box = (g: string, id: string, x0: number, x1: number, y0: number, y1: number, tone: DiagramTone, shade: number) =>
    items.push({ kind: 'region', id, points: path(points, id, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]), tone, shade, group: g });
  beaker('homo', 0);
  box('homo', 'salt', 0.05, 4.45, 0.05, 3.8, 'adj', 0.4);
  beaker('hetero', 7);
  box('hetero', 'water', 7.05, 11.45, 0.05, 2.9, 'adj', 0.4);
  box('hetero', 'oil', 7.05, 11.45, 2.9, 3.8, 'theta', 0.55);
  // Grains of sand on the bottom.
  [7.5, 8.1, 8.7, 9.3, 9.9, 10.5, 11.0, 7.8, 8.4, 9.0, 9.6, 10.2, 10.8].forEach((x, i) => {
    const ids = ring(points, `sand${i}`, [x, i < 7 ? 0.28 : 0.62], 0.22, 8);
    items.push({ kind: 'region', id: `sand${i}`, points: ids, tone: 'opp', shade: 0.85, group: 'hetero' });
  });
  const label = (id: string, at: P, tex: string, g: string) => {
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place: 'below', group: g });
  };
  label('homo-l', [2.25, -0.2], '\\text{salt water}', 'homo');
  label('hetero-l', [9.25, -0.2], '\\text{oil, water and sand}', 'hetero');
  return { points, items };
}

/**
 * A test tube of liquid held at a slant in a test-tube holder over a small flame, with an arrow
 * from its open end pointing the way it must face: away from everyone. Parts: `tube` (a group:
 * glass and liquid), `holder` (a group, with its label), `flame` (a group, with its label) and
 * `away` (a group: the arrow and its label).
 */
export function testTube(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const a = (50 * Math.PI) / 180;
  const u: P = [Math.cos(a), Math.sin(a)];
  const v: P = [-u[1], u[0]];
  const r = 0.45;
  const L = 5;
  const at = (s: number, t: number): P => [u[0] * s + v[0] * t, u[1] * s + v[1] * t];
  // The glass: up one side, round the bottom, and down the other side.
  const glass: P[] = [at(L, r), at(0, r)];
  for (let i = 1; i < 12; i++) {
    const f = (Math.PI * i) / 12;
    glass.push(at(-r * Math.sin(f), r * Math.cos(f)));
  }
  glass.push(at(0, -r), at(L, -r));
  items.push({ kind: 'curve', id: 'glass', points: path(points, 'gl', glass), tone: 'ink', weight: 3, group: 'tube' });
  // The liquid: the part of the tube below a level surface.
  const level = 1.1;
  const closed = [...glass];
  const clip: P[] = [];
  for (let i = 0; i < closed.length; i++) {
    const p = closed[i];
    const q = closed[(i + 1) % closed.length];
    if (p[1] <= level) clip.push(p);
    if ((p[1] - level) * (q[1] - level) < 0) {
      const k = (level - p[1]) / (q[1] - p[1]);
      clip.push([p[0] + k * (q[0] - p[0]), level]);
    }
  }
  items.push({ kind: 'region', id: 'liquid', points: path(points, 'lq', clip), tone: 'adj', shade: 0.45, group: 'tube' });
  // The holder: a clamp near the top and a handle out to the left.
  const clampA = at(3.6, r + 0.05);
  const clampB = at(3.6, -r - 0.05);
  points['clamp-a'] = clampA;
  points['clamp-b'] = clampB;
  points['handle'] = [clampA[0] - 3.2, clampA[1] + 0.8];
  items.push(
    { kind: 'line', id: 'clamp', from: 'clamp-a', to: 'clamp-b', tone: 'theta', weight: 6, group: 'holder' },
    { kind: 'line', id: 'grip', from: 'clamp-a', to: 'handle', tone: 'theta', weight: 6, group: 'holder' },
    { kind: 'label', id: 'holder-l', at: 'handle', tex: '\\text{test-tube holder}', place: 'above', group: 'holder' },
  );
  // A small flame under the bottom of the tube.
  const fx = at(-r, 0)[0];
  items.push({ kind: 'curve', id: 'fire', points: path(points, 'fl', [[fx - 0.3, -2.3], [fx - 0.4, -1.7], [fx - 0.15, -1.25], [fx, -0.85], [fx + 0.15, -1.25], [fx + 0.4, -1.7], [fx + 0.3, -2.3]]), tone: 'opp', weight: 3, group: 'flame' });
  points['flame-at'] = [fx + 0.5, -1.7];
  items.push({ kind: 'label', id: 'flame-l', at: 'flame-at', tex: '\\text{heat gently}', place: 'right', group: 'flame' });
  // The open end points away from everyone.
  points['away-a'] = at(L + 0.3, 0);
  points['away-b'] = at(L + 2.6, 0);
  items.push({ kind: 'line', id: 'away-arrow', from: 'away-a', to: 'away-b', tone: 'good', weight: 3, dashed: true, arrow: true, group: 'away' });
  points['away-at'] = at(L + 2.7, 0);
  items.push({ kind: 'label', id: 'away-l', at: 'away-at', tex: '\\text{away from everyone}', place: 'above', tone: 'good', group: 'away' });
  Object.assign(points, { 'room-a': [-3.6, -2.4], 'room-b': [7.6, 6.6] });
  return { points, items };
}
