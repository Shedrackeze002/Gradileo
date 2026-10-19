/**
 * Figures for the expressions and equations videos, built only from standard diagram parts
 * (labels, lines, curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `packs`: packs of stickers, each with the same number of star and heart stickers.
 * - `bagRow`: bags in a row, each holding the same unknown number of marbles (`n`).
 * - `balance`: a pan balance, level, with bags and marbles on each pan, for an equation such as
 *   n + 7 = 15; the marbles come in named groups, so the ones taken away can be shown and hidden.
 * - `chain`: what is done to a number, step by step along the top (n, then × 3, then + 4, gives
 *   19), and the inverse operations that undo it, in reverse order, along the bottom.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

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

/** A closed shape through the given points, added to `points` as `<key>0`, `<key>1`…: its fill and its edge. */
function shape(points: Record<string, P>, id: string, pts: P[], tone: DiagramTone, group: string, shade = 0.45): DiagramItem[] {
  const names = pts.map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  return [
    { kind: 'region', id: `${id}-fill`, points: names, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 2.5, group },
  ];
}

/** A five-pointed star of radius r about c. */
const star = (c: P, r: number): P[] =>
  Array.from({ length: 10 }, (_, i) => {
    const a = Math.PI / 2 + (i * Math.PI) / 5;
    const k = i % 2 === 0 ? r : 0.45 * r;
    return [c[0] + k * Math.cos(a), c[1] + k * Math.sin(a)] as P;
  });

/** A heart about c, about 2r wide. */
const heart = (c: P, r: number): P[] =>
  Array.from({ length: 28 }, (_, i) => {
    const t = (2 * Math.PI * i) / 28;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [c[0] + (r * x) / 16, c[1] + (r * (y + 2)) / 16] as P;
  });

/**
 * `count` packs of stickers side by side, each a box with `stars` yellow stars (in rows of 3)
 * and `hearts` pink hearts (in a row below them).
 *
 * Parts: each pack's box `pack<i>`, its stars `stars<i>` and its hearts `hearts<i>` (groups).
 */
export function packs(o: { name?: string; count: number; stars: number; hearts: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const W = 3.2;
  const rowsOfStars = Math.ceil(o.stars / 3);
  const H = 0.9 * (rowsOfStars + Math.ceil(o.hearts / 3)) + 0.5;
  for (let i = 0; i < o.count; i++) {
    const x = i * (W + 0.7);
    items.push(...shape(points, n(`box${i}`), [[x, 0], [x + W, 0], [x + W, H], [x, H]], 'muted', n(`pack${i}`), 0.06));
    for (let k = 0; k < o.stars; k++) {
      const c: P = [x + 0.6 + (k % 3) * 1, H - 0.65 - Math.floor(k / 3) * 0.9];
      items.push(...shape(points, n(`s${i}-${k}`), star(c, 0.38), 'theta', n(`stars${i}`), 0.6));
    }
    for (let k = 0; k < o.hearts; k++) {
      const c: P = [x + 0.6 + (k % 3) * 1, H - 0.65 - (rowsOfStars + Math.floor(k / 3)) * 0.9];
      items.push(...shape(points, n(`h${i}-${k}`), heart(c, 0.34), 'hyp', n(`hearts${i}`), 0.6));
    }
  }
  return { points, items };
}

/** A bag (a blue square with the variable on it) with its bottom left corner at (x, y). */
function bag(points: Record<string, P>, n: (s: string) => string, id: string, x: number, y: number, s: number, tex: string, group: string): DiagramItem[] {
  points[n(`${id}-c`)] = [x + s / 2, y + s / 2];
  return [
    ...shape(points, n(id), [[x, y], [x + s, y], [x + s, y + s], [x, y + s]], 'adj', group, 0.35),
    { kind: 'label', id: n(`${id}-label`), at: n(`${id}-c`), tex, tone: 'ink', place: 'center', group },
  ];
}

/**
 * `count` bags in a row, each a square with `tex` on it (the unknown number of marbles inside).
 *
 * Parts: each bag `bag<i>` (a group: its square and label).
 */
export function bagRow(o: { name?: string; count: number; tex?: string; gap?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) items.push(...bag(points, n, `b${i}`, i * (1 + (o.gap ?? 0.4)), 0, 1, o.tex ?? 'n', n(`bag${i}`)));
  return { points, items };
}

type Side = { bags?: number; marbles?: { id: string; count: number; tone?: DiagramTone }[] };

/**
 * A level pan balance: a stand with a beam, and a pan at each end. On each pan sit `bags` bags
 * (squares with `tex` on them, in rows of `bagsPerRow`, from the bottom) and marbles (in rows of
 * `perRow` above the bags), which come in named groups, in order from the bottom row up, so the
 * marbles to take away can be the last group. `labels` writes what each side stands for under it.
 *
 * Parts: `stand` (a group: the stand, beam and pans), `lbags` and `rbags` (groups), each group of
 * marbles `l-<id>` or `r-<id>`, and `labels` (a group: `llabel` and `rlabel`).
 */
export function balance(o: { name?: string; left: Side; right: Side; tex?: string; perRow?: number; bagsPerRow?: number; pan?: number; labels?: [string, string] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const per = o.perRow ?? 5;
  const bagsPer = o.bagsPerRow ?? 3;
  const r = 0.27;
  const step = 0.6;
  const s = 0.95;
  const W = o.pan ?? Math.max(per * step, bagsPer * (s + 0.16)) + 0.5;
  const arm = W / 2 + 0.75;
  const beamY = 1.4;
  const trayY = 1.65;
  Object.assign(points, {
    [n('g0')]: [-1.6, 0],
    [n('g1')]: [1.6, 0],
    [n('f0')]: [-0.8, 0],
    [n('f1')]: [0.8, 0],
    [n('f2')]: [0, beamY],
    [n('b0')]: [-arm - W / 2 + 0.2, beamY],
    [n('b1')]: [arm + W / 2 - 0.2, beamY],
  });
  items.push(
    { kind: 'line', id: n('ground'), from: n('g0'), to: n('g1'), tone: 'muted', weight: 3, group: n('stand') },
    { kind: 'region', id: n('fulcrum'), points: ['f0', 'f1', 'f2'].map(n), tone: 'muted', shade: 0.5, group: n('stand') },
    { kind: 'line', id: n('beam'), from: n('b0'), to: n('b1'), tone: 'ink', weight: 6, group: n('stand') },
  );
  for (const [key, side, sx] of [['l', o.left, -arm], ['r', o.right, arm]] as const) {
    // The tray: a flat bottom with lips, on a short post from the beam.
    Object.assign(points, {
      [n(`${key}p0`)]: [sx, beamY],
      [n(`${key}p1`)]: [sx, trayY],
      [n(`${key}t0`)]: [sx - W / 2 - 0.2, trayY + 0.3],
      [n(`${key}t1`)]: [sx - W / 2, trayY],
      [n(`${key}t2`)]: [sx + W / 2, trayY],
      [n(`${key}t3`)]: [sx + W / 2 + 0.2, trayY + 0.3],
    });
    items.push(
      { kind: 'line', id: n(`${key}post`), from: n(`${key}p0`), to: n(`${key}p1`), tone: 'ink', weight: 4, group: n('stand') },
      { kind: 'curve', id: n(`${key}tray`), points: ['t0', 't1', 't2', 't3'].map((t) => n(`${key}${t}`)), tone: 'ink', weight: 4, group: n('stand') },
    );
    let top = trayY + 0.08;
    const bags = side.bags ?? 0;
    for (let i = 0; i < bags; i++) {
      const row = Math.floor(i / bagsPer);
      const inRow = Math.min(bagsPer, bags - row * bagsPer);
      const col = i % bagsPer;
      const x = sx - (inRow * s + (inRow - 1) * 0.16) / 2 + col * (s + 0.16);
      const y = trayY + 0.08 + row * (s + 0.12);
      items.push(...bag(points, n, `${key}bag${i}`, x, y, s, o.tex ?? 'n', n(`${key}bags`)));
      top = Math.max(top, y + s + 0.1);
    }
    const total = (side.marbles ?? []).reduce((t, m) => t + m.count, 0);
    let k = 0;
    for (const m of side.marbles ?? []) {
      for (let j = 0; j < m.count; j++, k++) {
        const row = Math.floor(k / per);
        const inRow = Math.min(per, total - row * per);
        const c: P = [sx - ((inRow - 1) * step) / 2 + (k % per) * step, top + r + row * step];
        const pts = ring(points, n(`${key}${m.id}${j}-`), c, r);
        items.push(
          { kind: 'region', id: n(`${key}${m.id}${j}`), points: pts, tone: m.tone ?? 'theta', shade: 0.6, group: n(`${key}-${m.id}`) },
          { kind: 'curve', id: n(`${key}${m.id}${j}-e`), points: pts, closed: true, tone: m.tone ?? 'theta', weight: 2, group: n(`${key}-${m.id}`) },
        );
      }
    }
  }
  if (o.labels) {
    Object.assign(points, { [n('ll')]: [-arm, 0.7], [n('rl')]: [arm, 0.7] });
    items.push(
      { kind: 'label', id: n('llabel'), at: n('ll'), tex: o.labels[0], tone: 'ink', place: 'center', group: n('labels') },
      { kind: 'label', id: n('rlabel'), at: n('rl'), tex: o.labels[1], tone: 'ink', place: 'center', group: n('labels') },
    );
  }
  return { points, items };
}

/** A rough width, in diagram units, for a box round some TeX. */
const boxWidth = (tex: string) => Math.max(1.3, 0.36 * tex.replace(/\\[a-z]+|[{}\\ ]/g, '').length + 0.8);

/**
 * Operations done to a number, along the top: `nodes[0]` (the variable), an arrow labelled
 * `ops[0]` to `nodes[1]`, and so on. Along the bottom, the same places hold `back` (the values
 * found by undoing), joined by arrows that point back, labelled `undo` (the inverse operations).
 *
 * Parts: the top boxes `n<i>`, the forward arrows `f<i>`, the bottom boxes `b<i>` and the undo
 * arrows `u<i>` (each a group: its box or arrow and label).
 */
export function chain(o: { name?: string; nodes: string[]; ops: string[]; back?: string[]; undo?: string[]; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 2.6;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const widths = o.nodes.map((t, i) => Math.max(boxWidth(t), o.back?.[i] ? boxWidth(o.back[i]) : 0));
  const xs: number[] = [];
  let x = 0;
  for (const w of widths) {
    xs.push(x + w / 2);
    x += w + gap;
  }
  const h = 0.9;
  const rows: [number, string[] | undefined, 'n' | 'b', DiagramTone][] = [
    [2.2, o.nodes, 'n', 'ink'],
    [0, o.back, 'b', 'good'],
  ];
  for (const [y, texts, key, tone] of rows) {
    texts?.forEach((tex, i) => {
      if (!tex) return;
      const w = widths[i];
      const cx = xs[i];
      points[n(`${key}${i}-c`)] = [cx, y];
      items.push(
        ...shape(points, n(`${key}box${i}`), [[cx - w / 2, y - h / 2], [cx + w / 2, y - h / 2], [cx + w / 2, y + h / 2], [cx - w / 2, y + h / 2]], i === 0 && key === 'n' ? 'theta' : tone, n(`${key}${i}`), 0.12),
        { kind: 'label', id: n(`${key}${i}-label`), at: n(`${key}${i}-c`), tex, tone: 'ink', place: 'center', group: n(`${key}${i}`) },
      );
    });
  }
  o.ops.forEach((tex, i) => {
    const a = xs[i] + widths[i] / 2 + 0.15;
    const b = xs[i + 1] - widths[i + 1] / 2 - 0.15;
    Object.assign(points, { [n(`f${i}a`)]: [a, 2.2], [n(`f${i}b`)]: [b, 2.2] });
    items.push({ kind: 'line', id: n(`f${i}`), from: n(`f${i}a`), to: n(`f${i}b`), tone: 'adj', arrow: true, label: tex, labelSide: 'left', group: n(`f${i}`) });
    const u = o.undo?.[i];
    if (!u) return;
    Object.assign(points, { [n(`u${i}a`)]: [b, 0], [n(`u${i}b`)]: [a, 0] });
    items.push({ kind: 'line', id: n(`u${i}`), from: n(`u${i}a`), to: n(`u${i}b`), tone: 'good', arrow: true, label: u, labelSide: 'left', group: n(`u${i}`) });
  });
  return { points, items };
}
