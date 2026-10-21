/**
 * Figures for the data analysis videos, built only from standard diagram parts (lines, shaded
 * regions, angles and labels) and the circle graph in `src/video/charts.ts`, so each goes into a
 * diagram with `figure`:
 *
 * - `levelBlocks`: towers of blocks, one per value, and the same blocks levelled out to the mean.
 * - `dotLine`: a number line with a dot above it for each value (repeats stack up), and dashed
 *   markers for the mean or the median.
 * - `pieAngles`: a circle graph with the central angle of each sector marked.
 *
 * Number cards in a row come from `chips` (`m6-3-figures.ts`), bar graphs from `barGraph`
 * (`src/video/charts.ts`), and dot plots of whole numbers from `dotPlot` (`m5-12-figures.ts`).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { circleGraph } from '@/video/charts.ts';

type P = [number, number];

/** The favourite sports of 200 students, in percent (the circle graph videos). */
export const SPORTS = [
  { label: 'Hockey', value: 35 },
  { label: 'Soccer', value: 25 },
  { label: 'Basketball', value: 20 },
  { label: 'Volleyball', value: 15 },
  { label: 'Swimming', value: 5 },
];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A square block from (x0, y0) to (x1, y1): its shading and outline, in `group`. */
function block(points: Record<string, P>, items: DiagramItem[], id: string, x0: number, y0: number, x1: number, y1: number, tone: DiagramTone, group: string) {
  const corners: P[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const names = corners.map((c, j) => {
    points[`${id}-${j}`] = c;
    return `${id}-${j}`;
  });
  items.push(
    { kind: 'region', id, points: names, tone, shade: 0.55, group },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 2, group },
  );
}

/**
 * Towers of unit blocks, one tower for each of `values` (whole numbers), `gap` apart, with the
 * value under each tower and a dashed line at the `mean` (a whole number). The blocks above the
 * mean are orange, and the same number of orange blocks fill the gaps below it, so moving them
 * levels every tower out to the mean.
 *
 * Parts: `col<i>` (a group: tower i's blue blocks, up to the mean), `ex<i>` (a group: its orange
 * blocks above the mean), `fill<i>` (a group: the orange blocks that fill tower i up to the mean),
 * `n<i>` (the value under tower i), and `mean` (a group: the dashed line and its label).
 */
export function levelBlocks(o: { values: number[]; mean: number; gap?: number; label?: string }): Part {
  const gap = o.gap ?? 1.6;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.values.forEach((v, i) => {
    const [x0, x1] = [i * gap - 0.45, i * gap + 0.45];
    for (let k = 0; k < Math.max(v, o.mean); k++) {
      const [y0, y1] = [k + 0.05, k + 0.95];
      if (k < Math.min(v, o.mean)) block(points, items, `b${i}-${k}`, x0, y0, x1, y1, 'adj', `col${i}`);
      else if (k < v) block(points, items, `x${i}-${k}`, x0, y0, x1, y1, 'opp', `ex${i}`);
      else block(points, items, `f${i}-${k}`, x0, y0, x1, y1, 'opp', `fill${i}`);
    }
    points[`n${i}-at`] = [i * gap, -0.15];
    items.push({ kind: 'label', id: `n${i}`, at: `n${i}-at`, tex: `\\large ${v}`, tone: 'theta', place: 'below' });
  });
  const right = (o.values.length - 1) * gap + 0.8;
  Object.assign(points, { 'mean-a': [-0.8, o.mean], 'mean-b': [right, o.mean] });
  items.push(
    { kind: 'line', id: 'mean-line', from: 'mean-a', to: 'mean-b', tone: 'good', dashed: true, weight: 3, group: 'mean' },
    { kind: 'label', id: 'mean-label', at: 'mean-b', tex: o.label ?? `\\text{mean} = ${o.mean}`, tone: 'good', place: 'right', group: 'mean' },
  );
  // Keep room under the values, and for the label to the right of the line.
  points['floor'] = [0, -1.1];
  points['room'] = [right + 2.8, o.mean];
  return { points, items };
}

/**
 * A number line from `min` to `max`, `length` units long (14 by default), with a mark every `step`
 * and a number under every `every`-th mark (TeX from `tex` if given), and a dot above the line for
 * each of `values`; equal values stack up. Dots listed in `odd` are red (an outlier). Each marker
 * is a dashed line up through the dots at its value, with its label (TeX) above it (or above to
 * one side, with `place`).
 *
 * Parts: `axis` (a group: the line, marks and numbers), each dot `d<i>` (in the group `dots`, or
 * `odd` for the red ones), and each marker by its `id` (a group: the line and its label).
 */
export function dotLine(o: {
  name?: string;
  min: number;
  max: number;
  step: number;
  every?: number;
  length?: number;
  values: number[];
  odd?: number[];
  tex?: (v: number) => string;
  marks?: { id: string; value: number; tex: string; tone?: DiagramTone; height?: number; place?: 'above' | 'above left' | 'above right' }[];
  r?: number;
}): Part {
  const n = namer(o.name);
  const L = o.length ?? 14;
  const X = (v: number) => ((v - o.min) / (o.max - o.min)) * L;
  const r = o.r ?? 0.18;
  const points: Record<string, P> = { [n('L')]: [-0.3, 0], [n('R')]: [L + 0.3, 0] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: n('axis') }];
  const count = Math.round((o.max - o.min) / o.step);
  const every = o.every ?? 1;
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * o.step;
    const big = i % every === 0;
    Object.assign(points, { [n(`t${i}a`)]: [X(v), big ? -0.2 : -0.12], [n(`t${i}b`)]: [X(v), big ? 0.2 : 0.12] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: 2.5, group: n('axis') });
    if (big) items.push({ kind: 'label', id: n(`num${i}`), at: n(`t${i}a`), tex: o.tex ? o.tex(v) : String(Number(v.toFixed(6))), tone: 'muted', place: 'below', group: n('axis') });
  }
  const seen = new Map<number, number>();
  let top = 0;
  o.values.forEach((v, i) => {
    const k = seen.get(v) ?? 0;
    seen.set(v, k + 1);
    const [cx, cy] = [X(v), 0.2 + r + 0.05 + k * (2 * r + 0.08)];
    top = Math.max(top, cy + r);
    const ring = Array.from({ length: 18 }, (_, j) => {
      const name = n(`d${i}-${j}`);
      points[name] = [cx + r * Math.cos((j * Math.PI) / 9), cy + r * Math.sin((j * Math.PI) / 9)];
      return name;
    });
    const odd = o.odd?.includes(i) ?? false;
    items.push({ kind: 'region', id: n(`d${i}`), points: ring, tone: odd ? 'bad' : 'adj', shade: 0.9, group: n(odd ? 'odd' : 'dots') });
  });
  for (const m of o.marks ?? []) {
    const h = m.height ?? top + 0.9;
    Object.assign(points, { [n(`${m.id}-a`)]: [X(m.value), -0.05], [n(`${m.id}-b`)]: [X(m.value), h] });
    const tone = m.tone ?? 'good';
    items.push(
      { kind: 'line', id: n(`${m.id}-line`), from: n(`${m.id}-a`), to: n(`${m.id}-b`), tone, dashed: true, weight: 3, group: n(m.id) },
      { kind: 'label', id: n(`${m.id}-label`), at: n(`${m.id}-b`), tex: m.tex, tone, place: m.place ?? 'above', group: n(m.id) },
    );
  }
  return { points, items };
}

/**
 * A circle graph (see `circleGraph`) with the central angle of each sector marked by an arc at the
 * centre, `arc` pixels across (36 by default), and its label (TeX, from `angles`) `dist` pixels
 * from the centre (90 by default; `dists` sets it sector by sector). With `namesOnly`, each
 * sector shows only its label, so a label can carry a rounded percent while the sector is drawn
 * from the exact value. `pad` keeps room for long labels, that many radii each side.
 *
 * Parts: the sectors `s<i>` (groups, as in `circleGraph`) and the angles `a<i>`.
 */
export function pieAngles(o: { name?: string; slices: { label: string; value: number; tone?: DiagramTone }[]; r?: number; percent?: boolean; namesOnly?: boolean; angles: string[]; arc?: number; dist?: number; dists?: number[]; pad?: number }): Part {
  const n = namer(o.name);
  const pie = circleGraph({ name: o.name, slices: o.slices, r: o.r, percent: o.percent, namesOnly: o.namesOnly });
  const total = o.slices.reduce((s, x) => s + x.value, 0);
  const items: DiagramItem[] = [...pie.items];
  o.slices.forEach((s, i) => {
    const sweep = (s.value / total) * 360;
    const steps = Math.max(2, Math.ceil(sweep / 4));
    items.push({ kind: 'angle', id: n(`a${i}`), at: n('c'), from: n(`s${i}-0`), to: n(`s${i}-${steps}`), tone: 'ink', label: o.angles[i], r: o.arc ?? 36, labelDist: o.dists?.[i] ?? o.dist ?? 90 });
  });
  // Room each side for long labels: `pad` radii from the centre (the circle graph keeps 2).
  const r = o.r ?? 3;
  const points = { ...pie.points, ...(o.pad ? { [n('pad-l2')]: [-o.pad * r, 0] as P, [n('pad-r2')]: [o.pad * r, 0] as P } : {}) };
  return { points, items };
}
