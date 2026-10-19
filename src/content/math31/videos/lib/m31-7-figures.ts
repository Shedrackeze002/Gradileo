/**
 * Figures for the optimization and related rates videos, built only from standard diagram parts
 * (lines, curves, shaded regions, labels and scenery), so each goes into a diagram with `figure`.
 * Graphs of the objective functions use the plane helpers in `m31-8-graphs.ts`.
 *
 * - `pasture`: a rectangular field fenced on three sides, with a river along the fourth.
 * - `sheetBox`: a sheet with a square cut from each corner and the fold lines, beside the open
 *   box it folds into.
 * - `crossing`: a river crossing: swim from one bank to a landing point, then run along the far
 *   bank to a cabin.
 * - `ripple`: a circular ripple, with the thin ring it adds as its radius grows.
 * - `ladder`: a ladder sliding down a wall, with the rates of its two ends.
 * - `shadow`: a street light, a walker and the walker's shadow, with the two similar triangles.
 * - `tank`: a conical tank, vertex down, partly filled with water.
 * - `cars`: two cars driving away from an intersection on roads at right angles.
 * - `balloon`: a balloon rising straight up, seen by an observer on the ground.
 *
 * Heights are orange, lengths along the ground and radii blue, and slanted lengths pink, as in the
 * other videos.
 */
import type { DiagramItem } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A line from point `a` to point `b` (already named), as a diagram part. */
const seg = (id: string, from: string, to: string, extra: Partial<Extract<DiagramItem, { kind: 'line' }>> = {}): DiagramItem => ({ kind: 'line', id, from, to, ...extra });

/** Points round an ellipse centred at `c`, `rx` across and `ry` up, added to `points`; the names, in order. */
function ring(points: Record<string, P>, key: string, c: P, rx: number, ry: number, steps = 48, from = 0, to = 2 * Math.PI): string[] {
  const names: string[] = [];
  const closed = Math.abs(to - from - 2 * Math.PI) < 1e-9;
  const count = closed ? steps : steps + 1;
  for (let i = 0; i < count; i++) {
    const t = from + ((to - from) * i) / steps;
    const name = `${key}${i}`;
    points[name] = [c[0] + rx * Math.cos(t), c[1] + ry * Math.sin(t)];
    names.push(name);
  }
  return names;
}

/**
 * A rectangular field `w` wide along a river and `h` deep, fenced on its other three sides. Parts:
 * `river` (the water and its name), `field` (the shading), the fence sides `left`, `top` and
 * `right` (in the group `fence`), with `labels.x` on both short sides and `labels.y` on the top.
 */
export function pasture(o: { name?: string; w: number; h: number; labels?: { x?: string; y?: string } }): Part {
  const n = namer(o.name);
  const { w, h } = o;
  const points: Record<string, P> = {
    [n('A')]: [0, 0],
    [n('B')]: [0, h],
    [n('C')]: [w, h],
    [n('D')]: [w, 0],
    [n('R')]: [-0.6, 0],
    [n('R2')]: [w + 0.6, 0],
    [n('Rt')]: [w / 2, -0.55],
  };
  const items: DiagramItem[] = [
    { kind: 'thing', id: n('water'), type: 'water', at: n('R'), group: n('river') },
    { kind: 'label', id: n('river-name'), at: n('Rt'), tex: '\\text{river}', tone: 'adj', place: 'center', group: n('river') },
    { kind: 'region', id: n('field'), points: ['A', 'B', 'C', 'D'].map(n), tone: 'good', shade: 0.12 },
    seg(n('left'), n('A'), n('B'), { tone: 'opp', weight: 4.5, group: n('fence'), ...(o.labels?.x ? { label: o.labels.x, labelSide: 'left' as const } : {}) }),
    seg(n('top'), n('B'), n('C'), { tone: 'adj', weight: 4.5, group: n('fence'), ...(o.labels?.y ? { label: o.labels.y, labelSide: 'left' as const } : {}) }),
    seg(n('right'), n('C'), n('D'), { tone: 'opp', weight: 4.5, group: n('fence'), ...(o.labels?.x ? { label: o.labels.x, labelSide: 'left' as const } : {}) }),
  ];
  return { points, items };
}

/**
 * A sheet `L` by `W` with a square of side `x` cut from each corner (the group `cuts`), the dashed
 * fold lines (`folds`) and the base they leave (`base`, with its sizes), and to its right the open
 * box it folds into (parts `box-…`: `box-shape`, the edges, and the sizes `box-l`, `box-w`,
 * `box-h`), with an arrow (`fold`) between them. Parts of the sheet: `sheet` (its outline), the
 * sizes `L` and `W`, and `x1`, `x2` (the side of a cut square, twice).
 */
export function sheetBox(o: { L: number; W: number; x: number; labels: { L: string; W: string; x: string; l: string; w: string } }): Part {
  const { L, W, x } = o;
  const points: Record<string, P> = { s0: [0, 0], s1: [L, 0], s2: [L, W], s3: [0, W] };
  const items: DiagramItem[] = [];
  // The base the folds leave, shaded first so the cuts and folds draw over it.
  Object.assign(points, { b0: [x, x], b1: [L - x, x], b2: [L - x, W - x], b3: [x, W - x] });
  items.push({ kind: 'region', id: 'base-fill', points: ['b0', 'b1', 'b2', 'b3'], tone: 'brand', shade: 0.16, group: 'base' });
  for (let k = 0; k < 4; k++) items.push(seg(`sheet${k}`, `s${k}`, `s${(k + 1) % 4}`, { group: 'sheet' }));
  // A square cut from each corner.
  const corners: P[] = [
    [0, 0],
    [L - x, 0],
    [L - x, W - x],
    [0, W - x],
  ];
  corners.forEach(([cx, cy], k) => {
    const sq = [`c${k}a`, `c${k}b`, `c${k}c`, `c${k}d`];
    Object.assign(points, { [sq[0]]: [cx, cy], [sq[1]]: [cx + x, cy], [sq[2]]: [cx + x, cy + x], [sq[3]]: [cx, cy + x] });
    items.push({ kind: 'region', id: `cut${k}`, points: sq, tone: 'bad', shade: 0.35, group: 'cuts' }, { kind: 'curve', id: `cut${k}-edge`, points: sq, closed: true, tone: 'bad', weight: 2.5, group: 'cuts' });
  });
  // Fold lines.
  items.push(
    seg('fold0', 'b0', 'b1', { tone: 'muted', dashed: true, group: 'folds' }),
    seg('fold1', 'b1', 'b2', { tone: 'muted', dashed: true, group: 'folds' }),
    seg('fold2', 'b2', 'b3', { tone: 'muted', dashed: true, group: 'folds' }),
    seg('fold3', 'b3', 'b0', { tone: 'muted', dashed: true, group: 'folds' }),
  );
  // Sizes of the sheet, of a cut square and of the base.
  Object.assign(points, { Lt: [L / 2, W], Wl: [0, W / 2], x1a: [0, W], x1b: [x, W], x2a: [0, 0], x2b: [0, x], bl: [L / 2, x], bw: [L - x, W / 2] });
  items.push(
    { kind: 'label', id: 'L', at: 'Lt', tex: o.labels.L, place: 'above', tone: 'ink' },
    { kind: 'label', id: 'W', at: 'Wl', tex: o.labels.W, place: 'left', tone: 'ink' },
    seg('x1', 'x1a', 'x1b', { tone: 'opp', weight: 4, label: o.labels.x, labelSide: 'left' }),
    seg('x2', 'x2a', 'x2b', { tone: 'opp', weight: 4, label: o.labels.x, labelSide: 'left' }),
    { kind: 'label', id: 'base-l', at: 'bl', tex: o.labels.l, place: 'above', tone: 'adj', group: 'base' },
    { kind: 'label', id: 'base-w', at: 'bw', tex: o.labels.w, place: 'left', tone: 'adj', group: 'base' },
  );
  // The open box: base (L − 2x) by (W − 2x), sides x tall, drawn as an oblique view a little larger
  // than the sheet (`k`), standing on the same line as the bottom of the sheet.
  const k = 1.3;
  const bl = k * (L - 2 * x);
  const bw = k * (W - 2 * x);
  const bh = k * x;
  const gap = 4.5;
  const d: P = [0.5 * Math.cos(Math.PI / 6) * bw, 0.5 * Math.sin(Math.PI / 6) * bw];
  const ox = L + gap;
  const oy = 0;
  const A: P = [ox, oy];
  const B: P = [ox + bl, oy];
  const C: P = [ox + bl, oy + bh];
  const D: P = [ox, oy + bh];
  const add = (p: P): P => [p[0] + d[0], p[1] + d[1]];
  Object.assign(points, { 'box-A': A, 'box-B': B, 'box-C': C, 'box-D': D, 'box-E': add(A), 'box-F': add(B), 'box-G': add(C), 'box-H': add(D) });
  const edge = (id: string, a: string, b: string, dashed = false) => seg(`box-${id}`, `box-${a}`, `box-${b}`, { group: 'box-shape', ...(dashed ? { dashed } : {}) });
  items.push(
    { kind: 'region', id: 'box-front', points: ['box-A', 'box-B', 'box-C', 'box-D'], tone: 'brand', shade: 0.2, group: 'box-shape' },
    { kind: 'region', id: 'box-side', points: ['box-B', 'box-F', 'box-G', 'box-C'], tone: 'brand', shade: 0.14, group: 'box-shape' },
    { kind: 'region', id: 'box-inside', points: ['box-D', 'box-C', 'box-G', 'box-H'], tone: 'brand', shade: 0.06, group: 'box-shape' },
    edge('ae', 'A', 'E', true),
    edge('ef', 'E', 'F', true),
    edge('eh', 'E', 'H'),
    edge('ab', 'A', 'B'),
    edge('bc', 'B', 'C'),
    edge('cd', 'C', 'D'),
    edge('da', 'D', 'A'),
    edge('bf', 'B', 'F'),
    edge('fg', 'F', 'G'),
    edge('cg', 'C', 'G'),
    edge('dh', 'D', 'H'),
    edge('hg', 'H', 'G'),
    seg('box-l', 'box-A', 'box-B', { tone: 'adj', label: o.labels.l, labelSide: 'right' }),
    seg('box-w', 'box-B', 'box-F', { tone: 'adj', label: o.labels.w, labelSide: 'right' }),
    seg('box-h', 'box-A', 'box-D', { tone: 'opp', label: o.labels.x, labelSide: 'left' }),
  );
  Object.assign(points, { fa: [L + 0.8, W / 2], fb: [ox + bl / 3, W / 2] });
  items.push(seg('fold', 'fa', 'fb', { tone: 'theta', arrow: true, weight: 3 }));
  return { points, items };
}

/**
 * A river `width` wide (bottom bank to top bank), crossed from the start S on the bottom bank to a
 * landing point P on the top bank, `land` downstream of the point Q directly across, then along the
 * top bank to a cabin K, `down` downstream of Q. Parts: `banks` (a group), `water`, `across` (the
 * dashed width, labelled), `swim` and `run` (with their labels), `x` (Q to P) and `names`.
 */
export function crossing(o: { width: number; down: number; land: number; labels: { width: string; x: string; run: string; swim?: string } }): Part {
  const { width: w, down, land } = o;
  const points: Record<string, P> = {
    S: [0, 0],
    Q: [0, w],
    P: [land, w],
    K: [down, w],
    l0: [-0.8, 0],
    l1: [down + 0.8, 0],
    u0: [-0.8, w],
    u1: [down + 0.8, w],
    xq: [0, w + 0.45],
    xp: [land, w + 0.45],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'water', points: ['l0', 'l1', 'u1', 'u0'], tone: 'adj', shade: 0.12 },
    seg('bank0', 'l0', 'l1', { tone: 'good', weight: 4, group: 'banks' }),
    seg('bank1', 'u0', 'u1', { tone: 'good', weight: 4, group: 'banks' }),
    seg('across', 'S', 'Q', { tone: 'muted', dashed: true, label: o.labels.width, labelSide: 'left' }),
    seg('swim', 'S', 'P', { tone: 'adj', weight: 4, arrow: true, ...(o.labels.swim ? { label: o.labels.swim, labelSide: 'right' as const } : {}) }),
    seg('run', 'P', 'K', { tone: 'theta', weight: 4, arrow: true, label: o.labels.run, labelSide: 'left' }),
    seg('x', 'xq', 'xp', { tone: 'opp', weight: 3, label: o.labels.x, labelSide: 'left' }),
    { kind: 'label', id: 'nS', at: 'S', tex: '\\text{start}', place: 'below', dot: true, tone: 'ink', group: 'names' },
    { kind: 'label', id: 'nP', at: 'P', tex: 'P', place: 'below right', dot: true, tone: 'ink', group: 'names' },
    { kind: 'label', id: 'nK', at: 'K', tex: '\\text{cabin}', place: 'above', dot: true, tone: 'ink', group: 'names' },
  ];
  return { points, items };
}

/**
 * A circular ripple of radius `r` about the point where a pebble fell: the shaded disc `disc` with
 * its edge `edge` and the name `A`, the radius `r` (labelled), the centre `O`, and the thin ring
 * `grow` (a group: the ring from r to r + `dr`, its outer edge, and the labels for its thickness
 * and its length round, 2πr).
 */
export function ripple(o: { r: number; dr: number; labels: { r: string; A: string; dr?: string; around?: string } }): Part {
  const { r, dr } = o;
  const points: Record<string, P> = { O: [0, 0], R: [r, 0], At: [-r * 0.42, r * 0.3] };
  const disc = ring(points, 'd', [0, 0], r, r, 72);
  const outer = ring(points, 'o', [0, 0], r + dr, r + dr, 72);
  // The ring between the two circles: round the outside one way and the inside the other way, so
  // the middle is left unshaded.
  const band = [...outer, outer[0], disc[0], ...[...disc].reverse()];
  const items: DiagramItem[] = [
    { kind: 'region', id: 'grow-fill', points: band, tone: 'good', shade: 0.4, group: 'grow' },
    { kind: 'curve', id: 'grow-edge', points: outer, closed: true, tone: 'good', dashed: true, group: 'grow' },
    { kind: 'region', id: 'disc', points: disc, tone: 'adj', shade: 0.16 },
    { kind: 'curve', id: 'edge', points: disc, closed: true, tone: 'adj', weight: 4 },
    seg('r', 'O', 'R', { tone: 'adj', weight: 3.5, label: o.labels.r, labelSide: 'left' }),
    { kind: 'label', id: 'A', at: 'At', tex: o.labels.A, tone: 'adj', place: 'center' },
    { kind: 'label', id: 'O', at: 'O', tex: '', tone: 'ink', dot: true },
  ];
  if (o.labels.dr) {
    points.Dt = [r + dr, 0];
    items.push({ kind: 'label', id: 'grow-dr', at: 'Dt', tex: o.labels.dr, tone: 'good', place: 'right', group: 'grow' });
  }
  if (o.labels.around) {
    const a = Math.PI * 0.25;
    points.Ct = [(r + dr) * Math.cos(a), (r + dr) * Math.sin(a)];
    items.push({ kind: 'label', id: 'grow-around', at: 'Ct', tex: o.labels.around, tone: 'good', place: 'above right', group: 'grow' });
  }
  return { points, items };
}

/**
 * A ladder from the foot F on the ground, `x` from the wall, to the top T, `y` up the wall. Parts:
 * `scene` (a group: the ground and the wall), `ladder` (labelled `labels.l`), `x` and `y` (the two
 * distances, labelled), `mark` (the right angle), and the arrows `pull` (the foot moving out) and
 * `slide` (the top sliding down), each with its label.
 */
export function ladder(o: { x: number; y: number; labels: { x: string; y: string; l: string; pull?: string; slide?: string } }): Part {
  const { x, y } = o;
  const points: Record<string, P> = {
    O: [0, 0],
    F: [x, 0],
    T: [0, y],
    G: [x + 3.2, 0],
    W: [0, y + 1.6],
    pa: [x + 0.4, 0.55],
    pb: [x + 2.4, 0.55],
    sa: [0.5, y + 1.7],
    sb: [0.5, y + 0.2],
  };
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'O', group: 'scene' },
    { kind: 'thing', id: 'wall', type: 'building', at: 'O', top: 'W', side: 'left', width: 1.6, group: 'scene' },
    seg('x', 'O', 'F', { tone: 'adj', weight: 4, label: o.labels.x, labelSide: 'right' }),
    seg('y', 'O', 'T', { tone: 'opp', weight: 4, label: o.labels.y, labelSide: 'right' }),
    { kind: 'right', id: 'mark', at: 'O', from: 'F', to: 'T' },
    seg('ladder', 'F', 'T', { tone: 'hyp', weight: 7, label: o.labels.l, labelSide: 'right' }),
  ];
  if (o.labels.pull) items.push(seg('pull', 'pa', 'pb', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.pull, labelSide: 'left' }));
  if (o.labels.slide) items.push(seg('slide', 'sa', 'sb', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.slide, labelSide: 'left' }));
  return { points, items };
}

/**
 * A street light `pole` tall, a walker `person` tall, `x` from the pole, and the walker's shadow,
 * `s` long, to the tip where the light's ray meets the ground. Parts: `ground`, `pole` (a group:
 * the pole, its arm and the lamp), `pole-h` (its height, labelled), `walker` (a group: the figure
 * and the height `person-h`, labelled), `ray` (dashed), the distances `x` and `s` (labelled, under
 * the ground), the shaded triangles `big` and `small`, and the arrow `walk`.
 */
export function shadow(o: { pole: number; person: number; x: number; labels: { pole: string; person: string; x: string; s: string; walk?: string } }): Part {
  const { pole: H, person: h, x } = o;
  const s = (h * x) / (H - h);
  const tip = x + s;
  const points: Record<string, P> = {
    O: [0, 0],
    L: [0, H],
    arm: [0.7, H],
    pa: [-0.5, 0],
    pb: [-0.5, H],
    M: [x, 0],
    Hd: [x, h],
    K: [tip, 0],
    g0: [-1.2, 0],
    g1: [tip + 1.2, 0],
    xa: [0, -0.75],
    xb: [x, -0.75],
    sb: [tip, -0.75],
    wa: [x + 0.4, h + 1.0],
    wb: [x + 2.2, h + 1.0],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'big', points: ['O', 'L', 'K'], tone: 'theta', shade: 0.08 },
    { kind: 'region', id: 'small', points: ['M', 'Hd', 'K'], tone: 'opp', shade: 0.3 },
    { kind: 'thing', id: 'ground', type: 'ground', at: 'g0' },
    seg('pole-line', 'O', 'L', { tone: 'ink', weight: 6, group: 'pole' }),
    seg('pole-arm', 'L', 'arm', { tone: 'ink', weight: 5, group: 'pole' }),
    { kind: 'label', id: 'lamp', at: 'arm', tex: '', tone: 'theta', dot: true, group: 'pole' },
    seg('pole-h', 'pa', 'pb', { tone: 'opp', weight: 3, label: o.labels.pole, labelSide: 'left' }),
    { kind: 'thing', id: 'figure', type: 'person', at: 'M', top: 'Hd', group: 'walker' },
    seg('person-h', 'M', 'Hd', { tone: 'opp', weight: 3, label: o.labels.person, labelSide: 'left', group: 'walker' }),
    seg('ray', 'L', 'K', { tone: 'theta', dashed: true }),
    seg('x', 'xa', 'xb', { tone: 'adj', weight: 3.5, label: o.labels.x, labelSide: 'right' }),
    seg('s', 'xb', 'sb', { tone: 'hyp', weight: 3.5, label: o.labels.s, labelSide: 'right' }),
  ];
  if (o.labels.walk) items.push(seg('walk', 'wa', 'wb', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.walk, labelSide: 'left' }));
  return { points, items };
}

/** How much flatter than wide a circle looks, seen from a little above (as in `solids.ts`). */
const TILT = 0.3;

/**
 * A conical tank, vertex down, with top radius `R` and height `H`, holding water `h` deep. Parts:
 * `tank` (a group: the rim and the sides), `axis` (dashed), `R` and `H` (the tank's sizes,
 * labelled), `water` (a group: the water's body, surface and rim), `r` and `h` (the water's
 * radius and depth, labelled) and `flow` (an arrow pouring in, labelled).
 */
export function tank(o: { R: number; H: number; h: number; labels: { R: string; H: string; r: string; h: string; flow?: string } }): Part {
  const { R, H, h } = o;
  const r = (R * h) / H;
  const points: Record<string, P> = {
    V: [0, 0],
    T: [0, H],
    TR: [R, H],
    TL: [-R, H],
    W: [0, h],
    WR: [r, h],
    Rl: [R / 2, H + R * TILT],
    Ha: [R + 0.9, 0],
    Hb: [R + 0.9, H],
    ha: [-R - 0.5, 0],
    hb: [-R - 0.5, h],
    hg: [-r, h],
    fa: [-1, H + 2.4],
    fb: [-1, H + 0.4],
  };
  const rim = ring(points, 'rim', [0, H], R, R * TILT, 48);
  const surface = ring(points, 'sf', [0, h], r, r * TILT, 48);
  // The front half of the water's surface, from its left end round the front to its right end.
  const front = ring(points, 'wf', [0, h], r, r * TILT, 24, Math.PI, 2 * Math.PI);
  const items: DiagramItem[] = [
    { kind: 'region', id: 'water-body', points: ['V', ...front], tone: 'adj', shade: 0.3, group: 'water' },
    { kind: 'region', id: 'water-top', points: surface, tone: 'adj', shade: 0.4, group: 'water' },
    { kind: 'curve', id: 'water-rim', points: surface, closed: true, tone: 'adj', weight: 3, group: 'water' },
    { kind: 'curve', id: 'rim', points: rim, closed: true, group: 'tank' },
    seg('left', 'TL', 'V', { group: 'tank' }),
    seg('right', 'TR', 'V', { group: 'tank' }),
    seg('axis', 'V', 'T', { tone: 'muted', dashed: true }),
    seg('R', 'T', 'TR', { tone: 'adj', weight: 3 }),
    { kind: 'label', id: 'R-label', at: 'Rl', tex: o.labels.R, tone: 'adj', place: 'above', group: 'R' },
    seg('H', 'Ha', 'Hb', { tone: 'muted', weight: 2.5, label: o.labels.H, labelSide: 'right' }),
    seg('r', 'W', 'WR', { tone: 'adj', weight: 3.5 }),
    { kind: 'label', id: 'r-label', at: 'WR', tex: o.labels.r, tone: 'adj', place: 'right', group: 'r' },
    seg('h', 'ha', 'hb', { tone: 'opp', weight: 3.5, label: o.labels.h, labelSide: 'left' }),
    seg('h-guide', 'hb', 'hg', { tone: 'muted', dashed: true, weight: 2, group: 'h' }),
  ];
  if (o.labels.flow) items.push(seg('flow', 'fa', 'fb', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.flow, labelSide: 'right' }));
  return { points, items };
}

/**
 * Two roads crossing at right angles at O: car A on the north road, `x` from O, and car B on the
 * east road, `y` from O, each with an arrow for its direction. Parts: `roads` (a group, with the
 * compass letters), `x` and `y` (labelled), `mark`, `D` (the dashed distance between the cars,
 * labelled), `A` and `B` (the cars) and the arrows `va` and `vb` (labelled).
 */
export function cars(o: { x: number; y: number; labels: { x: string; y: string; D: string; va?: string; vb?: string }; towardA?: boolean }): Part {
  const { x, y } = o;
  const points: Record<string, P> = {
    O: [0, 0],
    A: [0, x],
    B: [y, 0],
    n0: [0, -1.2],
    n1: [0, x + 3.4],
    e0: [-1.2, 0],
    e1: [y + 3.4, 0],
    aa: [0.6, o.towardA ? x - 0.3 : x + 0.3],
    ab: [0.6, o.towardA ? x - 2.3 : x + 2.3],
    ba: [y + 0.3, 0.6],
    bb: [y + 2.3, 0.6],
  };
  const items: DiagramItem[] = [
    seg('road-n', 'n0', 'n1', { tone: 'muted', weight: 9, group: 'roads' }),
    seg('road-e', 'e0', 'e1', { tone: 'muted', weight: 9, group: 'roads' }),
    { kind: 'label', id: 'N', at: 'n1', tex: '\\text{N}', tone: 'muted', place: 'above', group: 'roads' },
    { kind: 'label', id: 'E', at: 'e1', tex: '\\text{E}', tone: 'muted', place: 'right', group: 'roads' },
    seg('x', 'O', 'A', { tone: 'opp', weight: 4.5, label: o.labels.x, labelSide: 'left' }),
    seg('y', 'O', 'B', { tone: 'adj', weight: 4.5, label: o.labels.y, labelSide: 'right' }),
    { kind: 'right', id: 'mark', at: 'O', from: 'A', to: 'B' },
    seg('D', 'A', 'B', { tone: 'hyp', dashed: true, weight: 3.5, label: o.labels.D, labelSide: 'left' }),
    { kind: 'label', id: 'A', at: 'A', tex: 'A', tone: 'theta', place: 'left', dot: true },
    { kind: 'label', id: 'B', at: 'B', tex: 'B', tone: 'theta', place: 'below', dot: true },
    { kind: 'label', id: 'nO', at: 'O', tex: 'O', tone: 'muted', place: 'below left' },
  ];
  if (o.labels.va) items.push(seg('va', 'aa', 'ab', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.va, labelSide: o.towardA ? 'left' : 'right' }));
  if (o.labels.vb) items.push(seg('vb', 'ba', 'bb', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.vb, labelSide: 'left' }));
  return { points, items };
}

/**
 * A balloon rising straight up from F, `d` from an observer at O, now `y` up. Parts: `ground`,
 * `O` (the observer), `d` and `y` (labelled), `mark`, `sight` (the line of sight, labelled),
 * `theta` (the angle of elevation), `balloon` (a group: the envelope and basket) and the arrow
 * `rise` (labelled).
 */
export function balloon(o: { d: number; y: number; labels: { d: string; y: string; sight?: string; theta: string; rise?: string } }): Part {
  const { d, y } = o;
  const rb = 0.75;
  const points: Record<string, P> = {
    O: [0, 0],
    F: [d, 0],
    B: [d, y],
    g0: [-1.5, 0],
    ra: [d + 1.3, y - 0.6],
    rb: [d + 1.3, y + 1.4],
    k0: [d - 0.25, y - 0.05],
    k1: [d + 0.25, y - 0.05],
    k2: [d + 0.25, y + 0.3],
    k3: [d - 0.25, y + 0.3],
    pad: [d + 3.6, 0],
  };
  const env = ring(points, 'env', [d, y + 0.3 + rb * 1.1], rb, rb * 1.15, 40);
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'g0' },
    seg('d', 'O', 'F', { tone: 'adj', weight: 4, label: o.labels.d, labelSide: 'right' }),
    seg('y', 'F', 'B', { tone: 'opp', weight: 4, label: o.labels.y, labelSide: 'right' }),
    { kind: 'right', id: 'mark', at: 'F', from: 'O', to: 'B' },
    seg('sight', 'O', 'B', { tone: 'hyp', weight: 3.5, dashed: true, ...(o.labels.sight ? { label: o.labels.sight, labelSide: 'left' as const } : {}) }),
    { kind: 'angle', id: 'theta', at: 'O', from: 'F', to: 'B', tone: 'theta', label: o.labels.theta, r: 52 },
    { kind: 'region', id: 'env-fill', points: env, tone: 'bad', shade: 0.35, group: 'balloon' },
    { kind: 'curve', id: 'env-edge', points: env, closed: true, tone: 'bad', weight: 3, group: 'balloon' },
    { kind: 'curve', id: 'basket', points: ['k0', 'k1', 'k2', 'k3'], closed: true, tone: 'theta', weight: 3, group: 'balloon' },
    { kind: 'label', id: 'O', at: 'O', tex: '', tone: 'ink', dot: true },
  ];
  if (o.labels.rise) items.push(seg('rise', 'ra', 'rb', { tone: 'good', weight: 3.5, arrow: true, label: o.labels.rise, labelSide: 'right' }));
  return { points, items };
}
