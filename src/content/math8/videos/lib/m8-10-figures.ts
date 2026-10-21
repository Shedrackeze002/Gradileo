/**
 * Figures for the critiquing graphs and independent events videos, built only from standard
 * diagram parts and the graph parts in `src/video/graph.ts`, so each goes into a diagram with
 * `figure`:
 *
 * - `bars`: a bar graph whose vertical axis can start above zero (a misleading graph), or be
 *   numbered with uneven steps, beside the same data drawn fairly.
 * - `lineGraph`: a line graph: a grid, numbered axes with titles, and points joined in order.
 * - `pictograph`: rows of star symbols with a key, the symbols the same size or (to mislead) not.
 * - `fanTree`: a compact two-stage tree diagram whose second-stage probabilities sit near the far
 *   end of each branch, so three branches from one point keep their labels apart.
 *
 * Circle graphs come from `circleGraph` (`src/video/charts.ts`); outcome tables from
 * `outcomeGrid` (`m7-11-figures.ts`); coins, dice and spinners from `m6-12-figures.ts`; tree
 * diagrams with a probability on each branch from `probTree` (`m302-3-figures.ts`) and
 * `headedTree` (`m303-7-figures.ts`); and the deck of cards from `deckGrid` (`m302-3-figures.ts`).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, polyline } from '@/video/graph.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const text = (s: string) => `\\text{${s}}`;

/**
 * A bar graph like `barGraph` (`src/video/charts.ts`): a bar for each category, 1 unit wide and 1.6
 * apart, on a scale `height` units tall (6 by default). The scale runs from `min` (0 by default)
 * to `max`, with a grid line and a number every `step`; a `min` above zero cuts off the bottom of
 * every bar, as in a misleading graph. With `numbers`, the axis is numbered with those values
 * instead, equally spaced whatever the steps between them (an uneven scale), and each bar is as
 * tall as its value on that scale.
 *
 * Parts: `scale` (a group: the axes, grid lines, numbers and titles), a group `b<i>` for each bar
 * (the bar and its category name below it), `v<i>` (bar i's value above it) and `r<i>` (a dashed
 * line from the top of bar i across to the scale, for reading its value).
 */
export function bars(o: {
  name?: string;
  categories: string[];
  values: number[];
  min?: number;
  max: number;
  step: number;
  numbers?: number[];
  height?: number;
  tone?: DiagramTone;
  titles?: { x?: string; y?: string };
}): Part {
  const n = namer(o.name);
  const H = o.height ?? 6;
  const min = o.min ?? 0;
  const marks = o.numbers ?? Array.from({ length: Math.round((o.max - min) / o.step) + 1 }, (_, i) => Number((min + i * o.step).toFixed(6)));
  // The height of a value: straight from the scale, or, on an uneven scale, between its two marks.
  const at = (v: number): number => {
    if (!o.numbers) return ((v - min) / (o.max - min)) * H;
    const k = marks.length - 1;
    for (let i = 0; i < k; i++) {
      if (v <= marks[i + 1] + 1e-9) return ((i + (v - marks[i]) / (marks[i + 1] - marks[i])) * H) / k;
    }
    return H;
  };
  const W = 0.4 + o.categories.length * 1.6;
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = { [n('o')]: [0, 0], [n('xe')]: [W, 0], [n('ye')]: [0, H + 0.4] };
  const scale = n('scale');
  const items: DiagramItem[] = [];
  marks.forEach((v, i) => {
    const y = o.numbers ? (i * H) / (marks.length - 1) : at(v);
    Object.assign(points, { [n(`g${i}a`)]: [0, y], [n(`g${i}b`)]: [W, y] });
    if (i > 0) items.push({ kind: 'line', id: n(`grid${i}`), from: n(`g${i}a`), to: n(`g${i}b`), tone: 'muted', weight: 1, group: scale });
    items.push({ kind: 'label', id: n(`num${i}`), at: n(`g${i}a`), tex: String(v), tone: 'muted', place: 'left', group: scale });
  });
  items.push(
    { kind: 'line', id: n('x-axis'), from: n('o'), to: n('xe'), weight: 2.5, group: scale },
    { kind: 'line', id: n('y-axis'), from: n('o'), to: n('ye'), weight: 2.5, group: scale },
  );
  if (o.titles?.y) items.push({ kind: 'label', id: n('y-title'), at: n('ye'), tex: text(o.titles.y), place: 'above', group: scale });
  if (o.titles?.x) {
    points[n('xt')] = [W / 2, -0.16 * H];
    items.push({ kind: 'label', id: n('x-title'), at: n('xt'), tex: text(o.titles.x), place: 'below', group: scale });
  }
  o.categories.forEach((cat, i) => {
    const c = 0.4 + 1.6 * i + 0.5;
    const top = at(o.values[i]);
    const corners: P[] = [[c - 0.5, 0], [c + 0.5, 0], [c + 0.5, top], [c - 0.5, top]];
    const ids = corners.map((q, j) => {
      points[n(`b${i}-${j}`)] = q;
      return n(`b${i}-${j}`);
    });
    Object.assign(points, { [n(`b${i}-base`)]: [c, 0], [n(`b${i}-top`)]: [c, top], [n(`b${i}-axis`)]: [0, top] });
    items.push(
      { kind: 'region', id: n(`b${i}-fill`), points: ids, tone, shade: 0.55, group: n(`b${i}`) },
      { kind: 'curve', id: n(`b${i}-edge`), points: ids, closed: true, tone, weight: 2, group: n(`b${i}`) },
      { kind: 'label', id: n(`b${i}-name`), at: n(`b${i}-base`), tex: text(cat), place: 'below', group: n(`b${i}`) },
      { kind: 'label', id: n(`v${i}`), at: n(`b${i}-top`), tex: String(o.values[i]), place: 'above' },
      { kind: 'line', id: n(`r${i}`), from: n(`b${i}-3`), to: n(`b${i}-axis`), tone: 'theta', dashed: true },
    );
  });
  return { points, items };
}

/** The ids that show a `bars` graph called `name` (or unnamed) in the figure `fig`: its scale and every bar. */
export const barIds = (fig: string, count: number, name?: string): string[] => {
  const n = namer(name);
  return [`${fig}.${n('scale')}`, ...Array.from({ length: count }, (_, i) => `${fig}.${n(`b${i}`)}`)];
};

/**
 * A line graph: a grid over `x` and `y` with lines every `xStep` and `yStep`, numbered axes (TeX
 * from `xTex` if given) with `titles`, stretched to `width` by `height` diagram units, and the
 * points joined in order with a dot on each.
 *
 * When the x-axis starts above zero, the axes meet at the bottom left corner, numbered with the
 * first x and the first y.
 *
 * Parts: those of the plane (`grid`, `axes`), `line` (a group: the segments `line-0`…) and `pts`
 * (a group: the dots `p0`, `p1`…).
 */
export function lineGraph(o: {
  name?: string;
  x: [number, number];
  y: [number, number];
  xStep: number;
  yStep: number;
  points: P[];
  width?: number;
  height?: number;
  titles?: { x?: string; y?: string };
  xTex?: (x: number) => string;
  tone?: DiagramTone;
}): Part {
  const g = plane({ name: o.name, x: o.x, y: o.y, xStep: o.xStep, yStep: o.yStep, width: o.width ?? 10, height: o.height ?? 6, titles: o.titles, xTex: o.xTex });
  const tone = o.tone ?? 'opp';
  const line = polyline(g, { id: 'line', points: o.points, tone });
  const pts = dots(g, o.points.map(([x, y], i) => ({ id: `p${i}`, x, y, tone, group: 'pts' })));
  // When the axes meet at the bottom left corner rather than at the origin, the plane numbers
  // neither axis there: number the first x below the corner and the first y to its left.
  const corner: DiagramItem[] =
    o.x[0] > 0 && o.y[0] >= 0
      ? [
          { kind: 'label', id: g.n('x-start'), at: g.n('o'), tex: (o.xTex ?? String)(o.x[0]), tone: 'muted', place: 'below', group: g.n('axes') },
          { kind: 'label', id: g.n('y-start'), at: g.n('o'), tex: String(o.y[0]), tone: 'muted', place: 'left', group: g.n('axes') },
        ]
      : [];
  return { points: { ...g.points, ...line.points, ...pts.points }, items: [...g.items, ...corner, ...line.items, ...pts.items] };
}

/** The ids that show a `lineGraph` called `name` (or unnamed) in the figure `fig`: grid, axes, line and dots. */
export const lineIds = (fig: string, name?: string): string[] => {
  const n = namer(name);
  return [`${fig}.${n('grid')}`, `${fig}.${n('axes')}`, `${fig}.${n('line')}`, `${fig}.${n('pts')}`];
};

/** The corners of a five-pointed star of radius `r` about `c`, as point names in `points`. */
function star(points: Record<string, P>, key: string, c: P, r: number): string[] {
  return Array.from({ length: 10 }, (_, j) => {
    const a = Math.PI / 2 + (j * Math.PI) / 5;
    const rr = j % 2 === 0 ? r : 0.45 * r;
    points[`${key}-${j}`] = [c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)];
    return `${key}-${j}`;
  });
}

/**
 * A pictograph: a row of stars for each of `rows`, its name on the left, each star `size` across
 * (1 by default; a bigger size makes a row look longer, which misleads), and a key under the rows:
 * one star and `key` (plain text, such as "= 10 votes").
 *
 * Parts: each row's name `name-<id>` and its stars, `row-<id>` (a group), and `key` (a group).
 */
export function pictograph(o: { name?: string; rows: { id: string; label: string; count: number; size?: number; tone?: DiagramTone }[]; key?: string; keyTone?: DiagramTone; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1.7;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.rows.forEach((row, i) => {
    const y = -i * gap;
    const s = row.size ?? 1;
    const tone = row.tone ?? 'theta';
    points[n(`name-${row.id}-at`)] = [-0.3, y];
    items.push({ kind: 'label', id: n(`name-${row.id}`), at: n(`name-${row.id}-at`), tex: text(row.label), place: 'left' });
    for (let k = 0; k < row.count; k++) {
      const c: P = [0.4 + s / 2 + k * s * 1.15, y];
      const ids = star(points, n(`s-${row.id}-${k}`), c, s / 2);
      items.push(
        { kind: 'region', id: n(`s-${row.id}-${k}`), points: ids, tone, shade: 0.75, group: n(`row-${row.id}`) },
        { kind: 'curve', id: n(`s-${row.id}-${k}-edge`), points: ids, closed: true, tone, weight: 2, group: n(`row-${row.id}`) },
      );
    }
  });
  if (o.key) {
    const y = -o.rows.length * gap - 0.2;
    const ids = star(points, n('key-star'), [0.9, y], 0.5);
    points[n('key-at')] = [1.6, y];
    const tone = o.keyTone ?? o.rows[0]?.tone ?? 'theta';
    items.push(
      { kind: 'region', id: n('key-fill'), points: ids, tone, shade: 0.75, group: n('key') },
      { kind: 'curve', id: n('key-edge'), points: ids, closed: true, tone, weight: 2, group: n('key') },
      { kind: 'label', id: n('key-text'), at: n('key-at'), tex: text(o.key), place: 'right', group: n('key') },
    );
  }
  return { points, items };
}

/** The ids that show every row (names and stars) and the key of a `pictograph` in the figure `fig`. */
export const pictoIds = (fig: string, rows: string[], name?: string): string[] => {
  const n = namer(name);
  return [...rows.flatMap((r) => [`${fig}.${n(`name-${r}`)}`, `${fig}.${n(`row-${r}`)}`]), `${fig}.${n('key')}`];
};

/** One outcome of a stage of a tree diagram: its name (TeX), its probability (TeX) and its colour. */
export interface Outcome {
  name: string;
  p: string;
  tone?: DiagramTone;
}

/**
 * A two-stage tree diagram, drawn left to right like `probTree` (`m302-3-figures.ts`), but compact:
 * the first branches are `len1` long, the names of the first outcomes get `room`, the second
 * branches are `len2` long, and each second-stage probability sits `labelAt` of the way along its
 * branch (0.72 by default), where the branches have spread apart: above a rising or level branch,
 * below a falling one. `ends` writes the outcome of each path at its end, in order from the top.
 *
 * Parts: `start`; the first branches `b0`, `b1`… with their outcomes `n0`, `n1`… (group `s1`); the
 * branches after outcome i, `b<i>-0`…, with their outcomes `n<i>-0`… (group `s2-<i>`); and the
 * ends `e<i>-<j>` (group `ends`).
 */
export function fanTree(o: { name?: string; first: Outcome[]; second: Outcome[][]; ends?: string[]; gap?: number; groupGap?: number; len1?: number; len2?: number; room?: number; labelAt?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1.6;
  const groupGap = o.groupGap ?? 0.8;
  const leaves = o.second.reduce((k, s) => k + s.length, 0);
  const top = (leaves - 1) * gap + (o.first.length - 1) * groupGap;
  const x1 = o.len1 ?? 3.5;
  const x2 = x1 + (o.room ?? 1.3);
  const x3 = x2 + (o.len2 ?? 4.5);
  const xEnd = x3 + 1.3;
  const points: Record<string, P> = { [n('S')]: [0, top / 2], [n('edge-l')]: [-1.6, top / 2], [n('edge-r')]: [xEnd + (o.ends ? 2.2 : 0.6), top / 2] };
  const items: DiagramItem[] = [{ kind: 'label', id: n('start'), at: n('S'), tex: '\\text{Start}', tone: 'muted', place: 'left' }];
  let leaf = 0;
  let end = 0;
  o.first.forEach((f, i) => {
    const ys = o.second[i].map((_, j) => top - (leaf + j) * gap - i * groupGap);
    const y = (ys[0] + ys[ys.length - 1]) / 2;
    Object.assign(points, { [n(`F${i}`)]: [x1, y], [n(`G${i}`)]: [x2, y] });
    items.push(
      { kind: 'line', id: n(`b${i}`), from: n('S'), to: n(`F${i}`), tone: 'muted', weight: 3, label: f.p, labelSide: y >= top / 2 ? 'left' : 'right', group: n('s1') },
      { kind: 'label', id: n(`n${i}`), at: n(`F${i}`), tex: f.name, tone: f.tone ?? 'ink', place: 'right', group: n('s1') },
    );
    o.second[i].forEach((s, j) => {
      const id = `${i}-${j}`;
      Object.assign(points, { [n(`T${id}`)]: [x3, ys[j]], [n(`E${id}`)]: [xEnd, ys[j]] });
      items.push(
        { kind: 'line', id: n(`b${id}`), from: n(`G${i}`), to: n(`T${id}`), tone: 'muted', weight: 3, label: s.p, labelSide: ys[j] >= y - 1e-9 ? 'left' : 'right', labelAt: o.labelAt ?? 0.72, group: n(`s2-${i}`) },
        { kind: 'label', id: n(`n${id}`), at: n(`T${id}`), tex: s.name, tone: s.tone ?? 'ink', place: 'right', group: n(`s2-${i}`) },
      );
      const e = o.ends?.[end++];
      if (e) items.push({ kind: 'label', id: n(`e${id}`), at: n(`E${id}`), tex: e, tone: 'theta', place: 'right', group: n('ends') });
    });
    leaf += o.second[i].length;
  });
  return { points, items };
}
