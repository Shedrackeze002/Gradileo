/**
 * Helpers for the linear-relations videos, built only from standard diagram parts (labels, lines,
 * curves and shaded regions) and the graph parts in `src/video/graph.ts`, so each goes into a
 * diagram with `figure`:
 *
 * - `valueTable`: a table of values with an x row and a y row, and arcs between neighbouring
 *   columns that show the change in x (above) and the change in y (below).
 * - `riseRun`: the run and the rise between two points of a line on a plane.
 * - `line`: a straight line on a plane between two x-values, with a label.
 * - `drop`: a figure without some of its parts, for a scene (or a thumbnail) that does not use them.
 *
 * Graphs are drawn with `every: 0` and numbered along the bottom and left edges of the grid
 * (`numbers`, from the Math 30-2 polynomial videos), clear of every line.
 */
import type { DiagramEl, DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

export { band, guide, join, numbers, numTex, range, scatter, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A value as TeX: a number as written, or TeX as given. */
const valueTex = (v: number | string) => (typeof v === 'number' ? String(v) : v);

/**
 * A table of values: the x row on top and the y row below, each with its title (TeX) in a column on
 * the left, `titleW` wide, and a column `cellW` wide for each value. `dx[i]` labels an arc above
 * the x row from column i to column i + 1 (the change in x), and `dy[i]` an arc below the y row
 * (the change in y), in `dyTones[i]` (green by default). The last `extra` columns are drawn
 * separately (`more`), for values predicted beyond the table, in `extraTone`.
 *
 * Parts: `frame` (a group: the lines and titles of the main columns), `xs` and `ys` (groups: the
 * main values, each also a part `x<i>`, `y<i>`), `more` (a group: the extra columns' lines and
 * values, and the arcs into them), `dxs` and `dys` (groups: the arcs of the main columns, each also
 * a part `dx<i>`, `dy<i>`), and a shaded highlight of each column, `hl<i>`, shown on its own.
 */
export function valueTable(o: {
  name?: string;
  x: { title: string; values: (number | string)[] };
  y: { title: string; values: (number | string)[] };
  dx?: string[];
  dy?: string[];
  dyTones?: DiagramTone[];
  titleW?: number;
  cellW?: number;
  extra?: number;
  extraTone?: DiagramTone;
}): Part {
  const n = namer(o.name);
  const TW = o.titleW ?? 3.4;
  const CW = o.cellW ?? 1.7;
  const count = o.x.values.length;
  const extra = o.extra ?? 0;
  const isExtra = (i: number) => i >= count - extra;
  const left = (i: number) => TW + i * CW;
  const mid = (i: number) => TW + (i + 0.5) * CW;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const seg = (id: string, a: P, b: P, group: string, tone: DiagramTone = 'muted', weight = 2) => {
    Object.assign(points, { [n(`${id}a`)]: a, [n(`${id}b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}a`), to: n(`${id}b`), tone, weight, group: n(group) });
  };

  // Column highlights first, so the lines and values sit on top of them.
  for (let i = 0; i < count; i++) {
    const ids = [0, 1, 2, 3].map((k) => n(`hl${i}-${k}`));
    [[left(i), 0], [left(i) + CW, 0], [left(i) + CW, 2], [left(i), 2]].forEach((q, k) => (points[ids[k]] = q as P));
    items.push({ kind: 'region', id: n(`hl${i}`), points: ids, tone: 'theta', shade: 0.2 });
  }

  // The title column: its outline and the two titles.
  seg('t-top', [0, 2], [TW, 2], 'frame', 'ink', 2.5);
  seg('t-mid', [0, 1], [TW, 1], 'frame', 'muted', 2);
  seg('t-bot', [0, 0], [TW, 0], 'frame', 'ink', 2.5);
  seg('t-left', [0, 0], [0, 2], 'frame', 'ink', 2.5);
  seg('t-right', [TW, 0], [TW, 2], 'frame', 'ink', 2.5);
  Object.assign(points, { [n('tx')]: [TW / 2, 1.5], [n('ty')]: [TW / 2, 0.5] });
  items.push(
    { kind: 'label', id: n('x-title'), at: n('tx'), tex: o.x.title, tone: 'adj', place: 'center', group: n('frame') },
    { kind: 'label', id: n('y-title'), at: n('ty'), tex: o.y.title, tone: 'opp', place: 'center', group: n('frame') },
  );

  for (let i = 0; i < count; i++) {
    const g = isExtra(i) ? 'more' : 'frame';
    const last = i === count - 1;
    seg(`c${i}-top`, [left(i), 2], [left(i) + CW, 2], g, 'ink', 2.5);
    seg(`c${i}-mid`, [left(i), 1], [left(i) + CW, 1], g, 'muted', 2);
    seg(`c${i}-bot`, [left(i), 0], [left(i) + CW, 0], g, 'ink', 2.5);
    seg(`c${i}-right`, [left(i) + CW, 0], [left(i) + CW, 2], g, last ? 'ink' : 'muted', last ? 2.5 : 2);
    Object.assign(points, { [n(`px${i}`)]: [mid(i), 1.5], [n(`py${i}`)]: [mid(i), 0.5] });
    const tone: DiagramTone = isExtra(i) ? (o.extraTone ?? 'hyp') : 'ink';
    items.push(
      { kind: 'label', id: n(`x${i}`), at: n(`px${i}`), tex: valueTex(o.x.values[i]), tone, place: 'center', group: n(isExtra(i) ? 'more' : 'xs') },
      { kind: 'label', id: n(`y${i}`), at: n(`py${i}`), tex: valueTex(o.y.values[i]), tone, place: 'center', group: n(isExtra(i) ? 'more' : 'ys') },
    );
  }

  // A shallow arc from column i to column i + 1, above the table (up) or below it.
  const arc = (id: string, i: number, up: boolean, label: string, tone: DiagramTone, group: string) => {
    const names: string[] = [];
    const a = mid(i) + 0.2 * CW;
    const b = mid(i + 1) - 0.2 * CW;
    for (let k = 0; k <= 12; k++) {
      const t = k / 12;
      const lift = 0.1 + 0.36 * Math.sin(Math.PI * t);
      const name = n(`${id}-${k}`);
      points[name] = [a + (b - a) * t, up ? 2 + lift : -lift];
      names.push(name);
    }
    items.push({ kind: 'curve', id: n(id), points: names, tone, weight: 2.5, label, labelSide: up ? 'left' : 'right', labelAt: 0.5, group: n(group) });
  };
  (o.dx ?? []).forEach((label, i) => label && arc(`dx${i}`, i, true, label, 'adj', isExtra(i + 1) ? 'more' : 'dxs'));
  (o.dy ?? []).forEach((label, i) => label && arc(`dy${i}`, i, false, label, o.dyTones?.[i] ?? 'good', isExtra(i + 1) ? 'more' : 'dys'));
  return { points, items };
}

/**
 * The run and the rise between two points of a line on the plane: a horizontal segment from
 * `from` to below (or above) `to`, then a vertical one up (or down) to `to`, with their labels
 * (TeX) below the run and to the right of the rise unless `riseSide` says left.
 *
 * Parts: `<id>-run` and `<id>-rise`, both in the group `id`.
 */
export function riseRun(g: Plane, o: { id: string; from: P; to: P; run: string; rise: string; riseSide?: 'left' | 'right'; runSide?: 'above' | 'below' }): Part {
  const [a, c, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-c`), g.n(`${o.id}-b`)];
  const goingRight = o.to[0] > o.from[0];
  const goingUp = o.to[1] > o.from[1];
  // Looking along the run, "right" is below it when it goes to the right.
  const runBelow = (o.runSide ?? 'below') === 'below';
  const runSide: 'left' | 'right' = goingRight === runBelow ? 'right' : 'left';
  // Looking along the rise, "left" is to the left of it when it goes up.
  const riseRight = (o.riseSide ?? 'right') === 'right';
  const riseSide: 'left' | 'right' = goingUp === riseRight ? 'right' : 'left';
  return {
    points: { [a]: g.map(...o.from), [c]: g.map(o.to[0], o.from[1]), [b]: g.map(...o.to) },
    items: [
      { kind: 'line', id: g.n(`${o.id}-run`), from: a, to: c, tone: 'adj', weight: 3, dashed: true, label: o.run, labelSide: runSide, group: g.n(o.id) },
      { kind: 'line', id: g.n(`${o.id}-rise`), from: c, to: b, tone: 'opp', weight: 3, dashed: true, label: o.rise, labelSide: riseSide, group: g.n(o.id) },
    ],
  };
}

/**
 * The straight line y = m x + b on the plane from x = `from` to x = `to`, as the part `id`, with an
 * optional label (TeX) at the point `labelAt` along it ([x, y] in the plane), placed `place`.
 */
export function line(g: Plane, o: { id: string; m: number; b: number; from: number; to: number; tone?: DiagramTone; dashed?: boolean; label?: string; labelAt?: P; place?: Place; group?: string }): Part {
  const [a, z] = [g.n(`${o.id}-a`), g.n(`${o.id}-z`)];
  const points: Record<string, P> = { [a]: g.map(o.from, o.m * o.from + o.b), [z]: g.map(o.to, o.m * o.to + o.b) };
  const tone = o.tone ?? 'brand';
  const group = o.group ? { group: g.n(o.group) } : {};
  const items: DiagramItem[] = [{ kind: 'line', id: g.n(o.id), from: a, to: z, tone, dashed: o.dashed, weight: o.dashed ? 3 : 4, ...group }];
  if (o.label && o.labelAt) {
    const t = g.n(`${o.id}-t`);
    points[t] = g.map(...o.labelAt);
    items.push({ kind: 'label', id: g.n(`${o.id}-label`), at: t, tex: o.label, tone, place: o.place ?? 'above left', ...group });
  }
  return { points, items };
}

/**
 * The figure without the parts (or groups of parts) named in `parts`. A thumbnail draws every part
 * of its figure at once, so a figure whose parts appear one scene at a time can crowd it; the
 * points stay, so the layout does not move.
 */
export function drop(d: DiagramEl, parts: string[]): DiagramEl {
  return { ...d, items: d.items.filter((it) => !parts.includes(it.id) && !parts.includes(it.group ?? '')) };
}
