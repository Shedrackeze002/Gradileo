/**
 * Figures for the vehicle and small business videos, built only from standard diagram parts
 * (labels, lines and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `stackBar`: a bar of money split into stretches (a down payment, the amount financed and the
 *   finance charge), with brackets that name a total over several stretches. Two bars with the
 *   same `scale` compare two choices (leasing and buying).
 * - `valueBars`: a vehicle's value year by year as horizontal bars, each with the value lost that
 *   year after it.
 * - `breakEven`: the revenue and total cost lines of a business, crossing at the break-even point,
 *   with the loss before it and the profit after it shaded.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The four corners of a rectangle, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}a`]: [x0, y0], [`${key}b`]: [x1, y0], [`${key}c`]: [x1, y1], [`${key}d`]: [x0, y1] });
  return ['a', 'b', 'c', 'd'].map((k) => `${key}${k}`);
}

/** A stretch of a `stackBar`. Its label sits inside it, or above or below its middle. */
export interface Stretch {
  id: string;
  value: number;
  tone: DiagramTone;
  label?: string;
  place?: 'inside' | 'above' | 'below';
  /** Moves the label along the bar, in diagram units, to keep two labels apart. */
  shift?: number;
}

/**
 * A horizontal bar, `height` tall, with its bottom left corner at `at`, split into `stretches`
 * from left to right, each as long as its value: `width` units stand for `scale` (the sum of the
 * values by default), so two bars with the same width and scale can be compared. `title` sits to
 * the left of the bar, with `titleRoom` units kept clear for it (2.6 by default), and `pad` widens the
 * figure to the right, for labels beyond the end of the bar. Each bracket in `spans` runs over stretches `from` to `to` (indexes) above
 * or below the bar, with its label beyond it.
 *
 * Parts: each stretch by its `id` (a group: the shading, the outline and the label), each span by
 * its `id` (a group: the bracket and its label), and `title`.
 */
export function stackBar(o: {
  name?: string;
  at?: P;
  width?: number;
  height?: number;
  scale?: number;
  title?: string;
  titleRoom?: number;
  pad?: number;
  stretches: Stretch[];
  spans?: { id: string; from: number; to: number; label: string; side: 'above' | 'below'; tone?: DiagramTone }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 12;
  const H = o.height ?? 1.1;
  const total = o.scale ?? o.stretches.reduce((s, x) => s + x.value, 0);
  const k = W / total;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const edges: number[] = [x0];
  o.stretches.forEach((s) => edges.push(edges[edges.length - 1] + s.value * k));
  o.stretches.forEach((s, i) => {
    const [a, b] = [edges[i], edges[i + 1]];
    const corners = rect(points, n(`${s.id}-`), a, y0, b, y0 + H);
    items.push({ kind: 'region', id: n(`${s.id}-shade`), points: corners, tone: s.tone, shade: 0.5, group: n(s.id) });
    corners.forEach((p, j) => items.push({ kind: 'line', id: n(`${s.id}-side${j}`), from: p, to: corners[(j + 1) % 4], tone: 'ink', weight: 2, group: n(s.id) }));
    if (s.label) {
      const place = s.place ?? 'inside';
      const mx = (a + b) / 2 + (s.shift ?? 0);
      points[n(`${s.id}-at`)] = [mx, place === 'inside' ? y0 + H / 2 : place === 'above' ? y0 + H : y0];
      const where: Place = place === 'inside' ? 'center' : place;
      items.push({ kind: 'label', id: n(`${s.id}-label`), at: n(`${s.id}-at`), tex: s.label, tone: place === 'inside' ? 'ink' : s.tone, place: where, group: n(s.id) });
    }
  });
  for (const sp of o.spans ?? []) {
    const [a, b] = [edges[sp.from] + 0.04, edges[sp.to + 1] - 0.04];
    const up = sp.side === 'above';
    const y = up ? y0 + H + 0.35 : y0 - 0.35;
    const tip = up ? y - 0.2 : y + 0.2;
    Object.assign(points, { [n(`${sp.id}-a`)]: [a, tip], [n(`${sp.id}-b`)]: [a, y], [n(`${sp.id}-c`)]: [b, y], [n(`${sp.id}-d`)]: [b, tip], [n(`${sp.id}-m`)]: [(a + b) / 2, y] });
    const tone = sp.tone ?? 'theta';
    items.push(
      { kind: 'line', id: n(`${sp.id}-l`), from: n(`${sp.id}-a`), to: n(`${sp.id}-b`), tone, weight: 2.5, group: n(sp.id) },
      { kind: 'line', id: n(`${sp.id}-t`), from: n(`${sp.id}-b`), to: n(`${sp.id}-c`), tone, weight: 2.5, group: n(sp.id) },
      { kind: 'line', id: n(`${sp.id}-r`), from: n(`${sp.id}-c`), to: n(`${sp.id}-d`), tone, weight: 2.5, group: n(sp.id) },
      { kind: 'label', id: n(`${sp.id}-label`), at: n(`${sp.id}-m`), tex: sp.label, tone, place: up ? 'above' : 'below', group: n(sp.id) },
    );
  }
  if (o.pad) points[n('pad')] = [x0 + W + o.pad, y0 + H / 2];
  if (o.title) {
    points[n('title-pad')] = [x0 - (o.titleRoom ?? 2.6), y0 + H / 2];
    points[n('title-at')] = [x0 - 0.3, y0 + H / 2];
    items.push({ kind: 'label', id: n('title'), at: n('title-at'), tex: o.title, tone: 'ink', place: 'left' });
  }
  return { points, items };
}

/**
 * A value year by year as horizontal bars, one under another from the top, `gap` apart and 1 unit
 * tall, `width` units standing for `max`. Each bar has its name (TeX) to its left and its value
 * (TeX) inside its right end. With `losses`, the value lost since the bar above is drawn after each
 * later bar, out to the length of the bar above, with the amount (TeX) after it.
 *
 * Parts: each bar `b0`, `b1`… (a group: the bar, its outline and its name), its value `v0`, `v1`…,
 * and each loss `l1`, `l2`… (a group: the dashed outline, the shading and the amount).
 */
export function valueBars(o: { name?: string; bars: { name: string; value: number; tex: string }[]; max: number; width?: number; gap?: number; tone?: DiagramTone; losses?: string[] }): Part {
  const n = namer(o.name);
  const W = o.width ?? 8;
  const gap = o.gap ?? 1.6;
  const k = W / o.max;
  const tone = o.tone ?? 'adj';
  // Room on the left for the names and on the right for the losses.
  const points: Record<string, P> = { [n('pad-l')]: [-2.2, 0], [n('pad-r')]: [W + (o.losses ? 2.6 : 0.2), 0] };
  const items: DiagramItem[] = [];
  Object.assign(points, { [n('base-a')]: [0, 0.3], [n('base-b')]: [0, -(o.bars.length - 1) * gap - 1.3] });
  items.push({ kind: 'line', id: n('base'), from: n('base-a'), to: n('base-b'), tone: 'muted', weight: 2.5 });
  o.bars.forEach((b, i) => {
    const y = -i * gap;
    const end = b.value * k;
    const corners = rect(points, n(`b${i}-`), 0, y - 1, end, y);
    Object.assign(points, { [n(`b${i}-end`)]: [end - 0.12, y - 0.5], [n(`b${i}-name-at`)]: [-0.25, y - 0.5] });
    items.push(
      { kind: 'region', id: n(`b${i}-fill`), points: corners, tone, shade: 0.55, group: n(`b${i}`) },
      { kind: 'curve', id: n(`b${i}-edge`), points: corners, closed: true, tone, weight: 2, group: n(`b${i}`) },
      { kind: 'label', id: n(`b${i}-name`), at: n(`b${i}-name-at`), tex: b.name, tone: 'ink', place: 'left', group: n(`b${i}`) },
      { kind: 'label', id: n(`v${i}`), at: n(`b${i}-end`), tex: b.tex, tone: 'ink', place: 'left' },
    );
    const lost = o.losses?.[i - 1];
    if (i > 0 && lost) {
      const prev = o.bars[i - 1].value * k;
      const box = rect(points, n(`l${i}-`), end, y - 1, prev, y);
      points[n(`l${i}-at`)] = [prev + 0.1, y - 0.5];
      items.push(
        { kind: 'region', id: n(`l${i}-fill`), points: box, tone: 'bad', shade: 0.3, group: n(`l${i}`) },
        { kind: 'curve', id: n(`l${i}-edge`), points: box, closed: true, tone: 'bad', weight: 2, dashed: true, group: n(`l${i}`) },
        { kind: 'label', id: n(`l${i}-t`), at: n(`l${i}-at`), tex: lost, tone: 'bad', place: 'right', group: n(`l${i}`) },
      );
    }
  });
  return { points, items };
}

/** Writes a whole number of dollars with a thin comma for TeX: 7000 as 7{,}000. */
const commas = (v: number) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '{,}');

/**
 * The revenue line (price × number sold, green) and the total cost line (fixed costs + variable
 * cost × number sold, red) of a business on a plane up to `xMax` items and `yMax` dollars, with the
 * fixed costs as a dashed line. They cross at the break-even point, marked with `beLabel`; the
 * loss between the lines before it and the profit after it are shaded.
 *
 * Parts: `grid` and `axes` (the plane), `fixed`, `revenue`, `cost` (the lines, with their labels),
 * `be` (the point), `loss` and `profit` (the shadings).
 */
export function breakEven(o: { fixed: number; price: number; varCost: number; xMax: number; yMax: number; xStep: number; yStep: number; every?: number; beLabel: string; itemName: string; width?: number; height?: number }): Part {
  const g = plane({
    x: [0, o.xMax],
    y: [0, o.yMax],
    xStep: o.xStep,
    yStep: o.yStep,
    every: o.every ?? 2,
    width: o.width ?? 9,
    height: o.height ?? 5.4,
    titles: { x: `\\text{${o.itemName}}`, y: '\\text{dollars}' },
    yTex: commas,
  });
  const rev = (x: number) => o.price * x;
  const cost = (x: number) => o.fixed + o.varCost * x;
  const be = o.fixed / (o.price - o.varCost);
  const points: Record<string, P> = {
    'loss-0': g.map(0, 0),
    'loss-1': g.map(be, rev(be)),
    'loss-2': g.map(0, o.fixed),
    'profit-0': g.map(be, rev(be)),
    'profit-1': g.map(o.xMax, cost(o.xMax)),
    'profit-2': g.map(o.xMax, rev(o.xMax)),
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'loss', points: ['loss-0', 'loss-1', 'loss-2'], tone: 'bad', shade: 0.25 },
    { kind: 'region', id: 'profit', points: ['profit-0', 'profit-1', 'profit-2'], tone: 'good', shade: 0.25 },
  ];
  const parts: Part[] = [
    g,
    { points, items },
    plot(g, { id: 'fixed', f: () => o.fixed, tone: 'muted', dashed: true, label: '\\text{fixed costs}', labelAt: 0.88, side: 'right' }),
    plot(g, { id: 'cost', f: cost, tone: 'bad', label: '\\text{total costs}', labelAt: 0.9, side: 'right' }),
    plot(g, { id: 'revenue', f: rev, tone: 'good', label: '\\text{revenue}', labelAt: 0.82 }),
    dots(g, [{ id: 'be', x: be, y: rev(be), tex: o.beLabel, tone: 'theta', place: 'below right' }]),
  ];
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}
