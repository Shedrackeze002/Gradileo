/**
 * Figures for the expressions and equations videos, built only from standard diagram parts
 * (labels, lines, curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `tileGroups`: algebra tiles in boxed groups: a long green tile for the variable and a small
 *   orange square for 1, as in the lessons.
 * - `bin`: a box holding bags (each with the same unknown number of marbles) and loose marbles.
 * - `sides`: a polygon with an expression beside each side, for a perimeter.
 *
 * The pan balance and the chain of operations come from the Math 5 helpers (`m5-7-figures.ts`).
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A filled rectangle with its outline, its corners added to `points`, in `group`. */
function rect(points: Record<string, P>, id: string, x0: number, y0: number, x1: number, y1: number, tone: DiagramTone, group: string, shade = 0.35): DiagramItem[] {
  const names = ([[x0, y0], [x1, y0], [x1, y1], [x0, y1]] as P[]).map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  return [
    { kind: 'region', id: `${id}-fill`, points: names, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 2.5, group },
  ];
}

/** Points round a circle, added to `points` as `<key>0`, `<key>1`…, in order. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 16): string[] {
  const names: string[] = [];
  for (let j = 0; j < steps; j++) {
    const t = (2 * Math.PI * j) / steps;
    points[`${key}${j}`] = [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
    names.push(`${key}${j}`);
  }
  return names;
}

/** The size of an algebra tile: a long tile is W wide and L tall, a unit tile W by W. */
const W = 0.8;
const L = 2.8;
const GAP = 0.3;

/**
 * Groups of algebra tiles side by side. Each group has `x` long tiles (labelled `tex`, x by
 * default) in a row, then `units` small squares in columns of three, inside a muted box, with a
 * caption under the box.
 *
 * Parts, for a group with id `g`: its long tiles `g-x0`, `g-x1`… (the group `g-xs`), its unit
 * tiles `g-u0`… (the group `g-us`), the box `g-box` and the caption `g-cap`.
 */
export function tileGroups(o: { name?: string; groups: { id: string; x: number; units: number; tex?: string; caption?: string }[]; gap?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let left = 0;
  for (const g of o.groups) {
    const x0 = left + GAP;
    let x = x0;
    for (let i = 0; i < g.x; i++) {
      const id = n(`${g.id}-x${i}`);
      items.push(...rect(points, id, x, 0, x + W, L, 'good', n(`${g.id}-xs`)));
      points[`${id}-c`] = [x + W / 2, L / 2];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: g.tex ?? 'x', tone: 'ink', place: 'center', group: n(`${g.id}-xs`) });
      x += W + GAP;
    }
    for (let k = 0; k < g.units; k++) {
      const col = Math.floor(k / 3);
      const row = k % 3;
      const ux = x + col * (W + GAP);
      const uy = row * (W + 0.2);
      const id = n(`${g.id}-u${k}`);
      items.push(...rect(points, id, ux, uy, ux + W, uy + W, 'opp', n(`${g.id}-us`)));
      points[`${id}-c`] = [ux + W / 2, uy + W / 2];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: '1', tone: 'ink', place: 'center', group: n(`${g.id}-us`) });
    }
    // The right edge of the last tile, then the same margin as on the left.
    const last = x + Math.ceil(g.units / 3) * (W + GAP) - GAP;
    const bx0 = left;
    const bx1 = Math.max(last, x0 + W) + GAP;
    const box: P[] = [
      [bx0, -GAP],
      [bx1, -GAP],
      [bx1, L + GAP],
      [bx0, L + GAP],
    ];
    const names = box.map((p, i) => {
      points[n(`${g.id}-b${i}`)] = p;
      return n(`${g.id}-b${i}`);
    });
    items.push({ kind: 'curve', id: n(`${g.id}-box`), points: names, closed: true, tone: 'muted', weight: 2 });
    if (g.caption) {
      points[n(`${g.id}-capat`)] = [(bx0 + bx1) / 2, -GAP - 0.25];
      items.push({ kind: 'label', id: n(`${g.id}-cap`), at: n(`${g.id}-capat`), tex: g.caption, tone: 'ink', place: 'below' });
    }
    left = bx1 + (o.gap ?? 1);
  }
  return { points, items };
}

/**
 * A box holding `bags` bags in a row (blue squares with `tex` on them, the unknown number of
 * marbles in each) and `marbles` loose marbles to their right, in columns of `perCol`.
 *
 * Parts: `box`, the bags `bag0`, `bag1`… (the group `bags`), the marbles `m0`, `m1`… (the group
 * `marbles`) and, with `caption`, `cap` under the box.
 */
export function bin(o: { name?: string; bags: number; marbles: number; tex?: string; perCol?: number; caption?: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const s = 1;
  const pad = 0.35;
  const per = o.perCol ?? 3;
  let x = pad;
  for (let i = 0; i < o.bags; i++) {
    const id = n(`bag${i}`);
    items.push(...rect(points, `${id}-sq`, x, pad, x + s, pad + s, 'adj', id, 0.35));
    points[`${id}-c`] = [x + s / 2, pad + s / 2];
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: o.tex ?? 'x', tone: 'ink', place: 'center', group: id });
    x += s + 0.3;
  }
  // Marbles in columns, bottom up, to the right of the bags.
  const r = 0.26;
  const step = 0.72;
  const x0 = x + 0.1;
  for (let k = 0; k < o.marbles; k++) {
    const c: P = [x0 + r + Math.floor(k / per) * step, pad + r + (k % per) * step];
    const pts = ring(points, n(`m${k}-`), c, r);
    items.push(
      { kind: 'region', id: n(`m${k}`), points: pts, tone: 'theta', shade: 0.6, group: n('marbles') },
      { kind: 'curve', id: n(`m${k}-e`), points: pts, closed: true, tone: 'theta', weight: 2, group: n('marbles') },
    );
  }
  const right = o.marbles ? x0 + 2 * r + (Math.ceil(o.marbles / per) - 1) * step + pad : x - 0.3 + pad;
  const top = Math.max(pad + s, pad + Math.min(o.marbles, per) * step) + pad;
  const corners: P[] = [
    [0, 0],
    [right, 0],
    [right, top],
    [0, top],
  ];
  const names = corners.map((p, i) => {
    points[n(`box${i}`)] = p;
    return n(`box${i}`);
  });
  items.unshift({ kind: 'curve', id: n('box'), points: names, closed: true, tone: 'muted', weight: 2.5 });
  if (o.caption) {
    points[n('capat')] = [right / 2, -0.15];
    items.push({ kind: 'label', id: n('cap'), at: n('capat'), tex: o.caption, tone: 'ink', place: 'below' });
  }
  return { points, items };
}

/**
 * A polygon through `corners`, shaded, with an expression beside each side (side k joins corner k
 * to corner k + 1), outside the shape.
 *
 * Parts: `shape` (a group: the fill and the sides `s0`, `s1`…) and each side's label `l0`, `l1`…
 */
export function sides(o: { name?: string; corners: P[]; labels: string[]; places?: Place[]; tones?: DiagramTone[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const names = o.corners.map((p, i) => {
    points[n(`v${i}`)] = p;
    return n(`v${i}`);
  });
  const items: DiagramItem[] = [{ kind: 'region', id: n('fill'), points: names, tone: 'brand', shade: 0.15, group: n('shape') }];
  const cx = o.corners.reduce((t, p) => t + p[0], 0) / o.corners.length;
  const cy = o.corners.reduce((t, p) => t + p[1], 0) / o.corners.length;
  o.corners.forEach((a, i) => {
    const b = o.corners[(i + 1) % o.corners.length];
    items.push({ kind: 'line', id: n(`s${i}`), from: names[i], to: names[(i + 1) % names.length], tone: o.tones?.[i] ?? 'brand', weight: 4, group: n('shape') });
    // The label sits just outside the middle of the side.
    const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const [dx, dy] = [m[0] - cx, m[1] - cy];
    const len = Math.hypot(dx, dy) || 1;
    points[n(`m${i}`)] = [m[0] + (0.25 * dx) / len, m[1] + (0.25 * dy) / len];
    const place = o.places?.[i] ?? ((Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'above' : 'below') as Place);
    items.push({ kind: 'label', id: n(`l${i}`), at: n(`m${i}`), tex: o.labels[i], tone: o.tones?.[i] ?? 'ink', place });
  });
  return { points, items };
}

/**
 * The steps of the order of operations as boxes in a row, joined by arrows: each box holds a
 * symbol (TeX) and has a caption (TeX) under it.
 *
 * Parts: each step `b0`, `b1`… (a group: its box, symbol and caption) and the arrows `a1`, `a2`…
 * (the arrow into step k is `a<k>`).
 */
export function ladder(o: { name?: string; symbols: string[]; captions: string[]; width?: number; gap?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const w = o.width ?? 2.4;
  const gap = o.gap ?? 1.1;
  const h = 1.3;
  const tones: DiagramTone[] = ['adj', 'hyp', 'good', 'opp'];
  o.symbols.forEach((tex, i) => {
    const x = i * (w + gap);
    const tone = tones[i % tones.length];
    items.push(...rect(points, n(`box${i}`), x, 0, x + w, h, tone, n(`b${i}`), 0.18));
    points[n(`c${i}`)] = [x + w / 2, h / 2];
    points[n(`k${i}`)] = [x + w / 2, -0.15];
    items.push(
      { kind: 'label', id: n(`sym${i}`), at: n(`c${i}`), tex, tone: 'ink', place: 'center', group: n(`b${i}`) },
      { kind: 'label', id: n(`cap${i}`), at: n(`k${i}`), tex: o.captions[i], tone, place: 'below', group: n(`b${i}`) },
    );
    if (i === 0) return;
    Object.assign(points, { [n(`a${i}s`)]: [x - gap + 0.15, h / 2], [n(`a${i}e`)]: [x - 0.15, h / 2] });
    items.push({ kind: 'line', id: n(`a${i}`), from: n(`a${i}s`), to: n(`a${i}e`), tone: 'muted', weight: 3, arrow: true });
  });
  return { points, items };
}

/** A label (TeX) at a point, such as a caption under a figure. Part: `<id>`. */
export function note(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: Place }): Part {
  const n = namer(o.name);
  return { points: { [n(`${o.id}-at`)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center' }] };
}

/**
 * A bar model: rows of pieces side by side, each piece `w` long with its value (TeX) written in it,
 * and a name (TeX) left of each row. `total` marks the whole: a line over a single row, or a line
 * down the right of several rows, with its label (TeX).
 *
 * Parts: each piece `<row>-p<i>` (a group: its box and value), each row's name `<row>-label`, and
 * `total` (a group: the line, its end marks and its label).
 */
export function bars(o: { name?: string; rows: { id: string; label?: string; pieces: { w: number; tex: string; tone?: DiagramTone }[] }[]; total?: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const h = 1;
  const step = 1.5;
  let widest = 0;
  o.rows.forEach((row, k) => {
    const y = -k * step;
    let x = 0;
    row.pieces.forEach((pc, i) => {
      const id = n(`${row.id}-p${i}`);
      items.push(...rect(points, `${id}-box`, x, y, x + pc.w, y + h, pc.tone ?? 'brand', id, 0.3));
      points[`${id}-c`] = [x + pc.w / 2, y + h / 2];
      items.push({ kind: 'label', id: `${id}-tex`, at: `${id}-c`, tex: pc.tex, tone: 'ink', place: 'center', group: id });
      x += pc.w;
    });
    widest = Math.max(widest, x);
    if (row.label) {
      points[n(`${row.id}-l`)] = [-0.2, y + h / 2];
      items.push({ kind: 'label', id: n(`${row.id}-label`), at: n(`${row.id}-l`), tex: row.label, tone: 'ink', place: 'left' });
    }
  });
  if (o.total) {
    const g = n('total');
    if (o.rows.length === 1) {
      const y = h + 0.4;
      Object.assign(points, { [n('t0')]: [0, y], [n('t1')]: [widest, y], [n('t0a')]: [0, y - 0.2], [n('t1a')]: [widest, y - 0.2], [n('tm')]: [widest / 2, y] });
      items.push(
        { kind: 'line', id: n('t-line'), from: n('t0'), to: n('t1'), tone: 'theta', weight: 3, group: g },
        { kind: 'line', id: n('t-end0'), from: n('t0'), to: n('t0a'), tone: 'theta', weight: 3, group: g },
        { kind: 'line', id: n('t-end1'), from: n('t1'), to: n('t1a'), tone: 'theta', weight: 3, group: g },
        { kind: 'label', id: n('t-label'), at: n('tm'), tex: o.total, tone: 'theta', place: 'above', group: g },
      );
    } else {
      const x = widest + 0.4;
      const top = h;
      const bottom = -(o.rows.length - 1) * step;
      Object.assign(points, { [n('t0')]: [x, top], [n('t1')]: [x, bottom], [n('t0a')]: [x - 0.2, top], [n('t1a')]: [x - 0.2, bottom], [n('tm')]: [x, (top + bottom) / 2] });
      items.push(
        { kind: 'line', id: n('t-line'), from: n('t0'), to: n('t1'), tone: 'theta', weight: 3, group: g },
        { kind: 'line', id: n('t-end0'), from: n('t0'), to: n('t0a'), tone: 'theta', weight: 3, group: g },
        { kind: 'line', id: n('t-end1'), from: n('t1'), to: n('t1a'), tone: 'theta', weight: 3, group: g },
        { kind: 'label', id: n('t-label'), at: n('tm'), tex: o.total, tone: 'theta', place: 'right', group: g },
      );
    }
  }
  return { points, items };
}
