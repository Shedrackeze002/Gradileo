/**
 * Figures for the statistics videos (mean, median and mode, weighted and trimmed means, and
 * percentiles), built only from standard diagram parts (labels, lines, curves and shaded regions)
 * and the number line in `src/video/numbers.ts`, so each goes into a diagram with `figure`:
 *
 * - `orderedList`: a row of boxes holding data values, with their positions numbered below, boxes
 *   shaded or crossed out, and pointers above (the median, a percentile).
 * - `dotPlot`: a number line with a dot above it for each value (stacked when values repeat), and
 *   markers for the mean and the median.
 * - `meanLevel`: the mean drawn across a bar graph from `src/video/charts.ts`, with the amounts
 *   above it and the gaps below it shaded, to show the mean sharing the total out equally.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import type { Part } from '@/video/solids.ts';

export { drop } from './m303-5-graphs.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * A row of boxes, `w` apart and `h` tall, holding `values` (numbers, or TeX), with the centre of
 * box i at x = i·w. `positions` numbers the boxes 1, 2, 3… below them. `shades` shades boxes (each
 * a group by its id), `crosses` strikes boxes out (each a group by its id), and `pins` are arrows
 * that point down at a box or between two boxes (`at` is a box index; 2.5 is between boxes 2 and 3)
 * with a label above.
 *
 * Parts: `boxes` (a group: the outlines), `vals` (a group: the values, each also `v<i>`), `pos` (a
 * group: the position numbers, each also `p<i>`), each shading and cross-out group by its id, each
 * pin by its id (a group: the arrow and its label), and the row's `title`.
 */
export function orderedList(o: {
  name?: string;
  values: (number | string)[];
  at?: P;
  w?: number;
  h?: number;
  positions?: boolean;
  tone?: DiagramTone;
  shades?: { id: string; cells: number[]; tone?: DiagramTone }[];
  crosses?: { id: string; cells: number[] }[];
  pins?: { id: string; at: number; tex: string; tone?: DiagramTone; h?: number }[];
  /** A name for the row (TeX), to the left of the first box. */
  title?: string;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const w = o.w ?? 1;
  const h = o.h ?? 1;
  const half = 0.43 * w;
  const cx = (i: number) => x0 + i * w;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const rect = (key: string, i: number): string[] => {
    const ids = [0, 1, 2, 3].map((k) => n(`${key}-${k}`));
    [[cx(i) - half, y0], [cx(i) + half, y0], [cx(i) + half, y0 + h], [cx(i) - half, y0 + h]].forEach((q, k) => (points[ids[k]] = q as P));
    return ids;
  };
  for (const s of o.shades ?? []) {
    for (const i of s.cells) items.push({ kind: 'region', id: n(`${s.id}-${i}`), points: rect(`${s.id}-r${i}`, i), tone: s.tone ?? 'theta', shade: 0.3, group: n(s.id) });
  }
  o.values.forEach((v, i) => {
    items.push({ kind: 'curve', id: n(`box${i}`), points: rect(`b${i}`, i), closed: true, tone: 'muted', weight: 2, group: n('boxes') });
    points[n(`c${i}`)] = [cx(i), y0 + h / 2];
    items.push({ kind: 'label', id: n(`v${i}`), at: n(`c${i}`), tex: typeof v === 'number' ? String(v) : v, tone: o.tone ?? 'ink', place: 'center', group: n('vals') });
    if (o.positions) {
      points[n(`pc${i}`)] = [cx(i), y0 - 0.12 * h];
      items.push({ kind: 'label', id: n(`p${i}`), at: n(`pc${i}`), tex: String(i + 1), tone: 'muted', place: 'below', group: n('pos') });
    }
  });
  if (o.title) {
    points[n('title-at')] = [x0 - 0.6 * w, y0 + h / 2];
    // An empty point to the left keeps the title inside the figure.
    points[n('title-room')] = [x0 - 0.6 * w - 2.4 * h, y0 + h / 2];
    items.push({ kind: 'label', id: n('title'), at: n('title-at'), tex: o.title, tone: 'muted', place: 'left' });
  }
  for (const c of o.crosses ?? []) {
    for (const i of c.cells) {
      Object.assign(points, { [n(`${c.id}-${i}a`)]: [cx(i) - half - 0.05 * w, y0 - 0.05 * h], [n(`${c.id}-${i}b`)]: [cx(i) + half + 0.05 * w, y0 + 1.05 * h] });
      items.push({ kind: 'line', id: n(`${c.id}-${i}`), from: n(`${c.id}-${i}a`), to: n(`${c.id}-${i}b`), tone: 'bad', weight: 4, group: n(c.id) });
    }
  }
  for (const p of o.pins ?? []) {
    const x = x0 + p.at * w;
    const top = y0 + h + (p.h ?? 1.1) * h;
    Object.assign(points, { [n(`${p.id}-a`)]: [x, top], [n(`${p.id}-b`)]: [x, y0 + h + 0.12 * h] });
    items.push(
      { kind: 'line', id: n(`${p.id}-line`), from: n(`${p.id}-a`), to: n(`${p.id}-b`), tone: p.tone ?? 'good', weight: 3, arrow: true, group: n(p.id) },
      { kind: 'label', id: n(`${p.id}-t`), at: n(`${p.id}-a`), tex: p.tex, tone: p.tone ?? 'good', place: 'above', group: n(p.id) },
    );
  }
  return { points, items };
}

/**
 * A dot plot: a number line from `min` to `max` (`length` units long, a mark every `step` and a
 * number every `every` marks), with a dot above it for each of `values`, stacked when a value
 * repeats. `pins` are upright markers from the line at a value, `h` tall, with a label (TeX) at
 * the top, to the left or right.
 *
 * Parts: `axis` (a group: the line, marks and numbers), `dots` (a group: every dot, each also
 * `d<i>` in the order given), and each pin by its id (a group: the marker and its label).
 */
export function dotPlot(o: {
  name?: string;
  min: number;
  max: number;
  step: number;
  every?: number;
  length?: number;
  values: number[];
  tone?: DiagramTone;
  pins?: { id: string; value: number; tex: string; tone?: DiagramTone; h?: number; side?: 'left' | 'right' }[];
}): Part {
  const n = namer(o.name);
  const L = o.length ?? 12;
  const X = (v: number) => ((v - o.min) / (o.max - o.min)) * L;
  const axis = numberLine({ name: o.name, min: o.min, max: o.max, step: o.step, every: o.every, length: L });
  const points: Record<string, P> = { ...axis.points };
  const items: DiagramItem[] = [...axis.items];
  const seen = new Map<number, number>();
  o.values.forEach((v, i) => {
    const k = seen.get(v) ?? 0;
    seen.set(v, k + 1);
    points[n(`d${i}`)] = [X(v), 0.45 + 0.5 * k];
    items.push({ kind: 'label', id: n(`d${i}`), at: n(`d${i}`), tex: '', tone: o.tone ?? 'theta', dot: true, place: 'above', group: n('dots') });
  });
  for (const p of o.pins ?? []) {
    Object.assign(points, { [n(`${p.id}-a`)]: [X(p.value), 0], [n(`${p.id}-b`)]: [X(p.value), p.h ?? 1.6] });
    items.push(
      { kind: 'line', id: n(`${p.id}-line`), from: n(`${p.id}-a`), to: n(`${p.id}-b`), tone: p.tone ?? 'good', weight: 3, dashed: true, group: n(p.id) },
      { kind: 'label', id: n(`${p.id}-t`), at: n(`${p.id}-b`), tex: p.tex, tone: p.tone ?? 'good', place: p.side === 'left' ? 'above left' : p.side === 'right' ? 'above right' : 'above', group: n(p.id) },
    );
  }
  return { points, items };
}

/**
 * The mean across a bar graph drawn by `barGraph` with the same `values`, `max`, `height` and `at`:
 * a dashed line at the mean with its label at the right-hand end (with `room` units kept free for
 * it), and, for each bar, the amount above the mean shaded green or the gap up to the mean outlined
 * in yellow.
 *
 * Parts: `mean` (a group: the line and its label), `ups` (a group: the amounts above the mean, each
 * also `up<i>`) and `gaps` (a group: the gaps below it).
 */
export function meanLevel(o: { name?: string; values: number[]; mean: number; max: number; height?: number; at?: P; label: string; room?: number }): Part {
  const n = namer(o.name);
  const [ox, oy] = o.at ?? [0, 0];
  const H = o.height ?? 6;
  const k = H / o.max;
  const W = 0.4 + o.values.length * 1.6;
  const ym = oy + o.mean * k;
  // An empty point `room` units past the end of the line keeps its label inside the figure.
  const points: Record<string, P> = { [n('m-a')]: [ox, ym], [n('m-b')]: [ox + W + 0.3, ym], [n('m-room')]: [ox + W + 0.3 + (o.room ?? 2.4), ym] };
  const items: DiagramItem[] = [];
  o.values.forEach((v, i) => {
    const c = ox + 0.4 + 1.6 * i + 0.5;
    const top = oy + v * k;
    if (Math.abs(v - o.mean) < 1e-9) return;
    const ids = [0, 1, 2, 3].map((j) => n(`lv${i}-${j}`));
    const [lo, hi] = v > o.mean ? [ym, top] : [top, ym];
    [[c - 0.5, lo], [c + 0.5, lo], [c + 0.5, hi], [c - 0.5, hi]].forEach((q, j) => (points[ids[j]] = q as P));
    if (v > o.mean) items.push({ kind: 'region', id: n(`up${i}`), points: ids, tone: 'good', shade: 0.6, group: n('ups') });
    else {
      items.push(
        { kind: 'region', id: n(`gap${i}-fill`), points: ids, tone: 'theta', shade: 0.18, group: n('gaps') },
        { kind: 'curve', id: n(`gap${i}-edge`), points: ids, closed: true, tone: 'theta', dashed: true, weight: 2, group: n('gaps') },
      );
    }
  });
  items.push(
    { kind: 'line', id: n('m-line'), from: n('m-a'), to: n('m-b'), tone: 'good', weight: 3, dashed: true, group: n('mean') },
    { kind: 'label', id: n('m-t'), at: n('m-b'), tex: o.label, tone: 'good', place: 'right', group: n('mean') },
  );
  return { points, items };
}
