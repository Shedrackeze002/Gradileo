/**
 * Figures for the Place Value videos: a place value chart, a hundred grid (one whole cut into
 * tenths and hundredths), labels under a number line in the lesson's number format, and dashed
 * links (to zoom in on part of a number line). Like the figures in `src/video/`, each is built only
 * from standard diagram parts (lines, curves, regions and labels) and goes into a diagram with
 * `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A place name as a column heading: small, and on two lines when it has two words. */
function heading(name: string, size: string): string {
  const words = name.split(' ');
  if (words.length === 1) return `${size}\\text{${name}}`;
  return `${size}\\begin{array}{c}\\text{${words[0]}}\\\\[-3pt]\\text{${words.slice(1).join(' ')}}\\end{array}`;
}

/**
 * A place value chart: a column for each place, named in the heading row, with a row of digits
 * for each number. A place called '.' is a narrow column for the decimal point.
 *
 * Parts: `frame` (a group: the outline and the lines between the columns and rows), `head` (a
 * group: the headings `h<i>`), each row of digits `row<r>` (a group: the digits `r<r>-<i>`), a
 * shaded highlight for each column `col<i>`, each `note` under a column by its id, and each `arc`
 * over the headings by its id (two columns joined by a curve, with a label above it).
 */
export function placeChart(o: {
  name?: string;
  places: string[];
  rows: string[][];
  /** A colour for a digit, by its id ("r0-2"). */
  tones?: Record<string, DiagramTone>;
  notes?: { id: string; col: number; tex: string; tone?: DiagramTone }[];
  arcs?: { id: string; from: number; to: number; label?: string; tone?: DiagramTone }[];
  /** The TeX size of the headings (\\small by default; \\footnotesize for a chart of eight places). */
  headSize?: string;
  /** The TeX size of the digits (\\LARGE by default). */
  digitSize?: string;
  colW?: number;
  rowH?: number;
  headH?: number;
  at?: P;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const colW = o.colW ?? 2;
  const rowH = o.rowH ?? 1.3;
  const headH = o.headH ?? 1.5;
  const R = o.rows.length;
  // A column is wide enough for its heading: a long place name (Thousandths) gets a wider column.
  const widths = o.places.map((p) => (p === '.' ? colW * 0.4 : colW * Math.max(1, Math.max(...p.split(' ').map((w) => w.length)) / 6)));
  const edges = [x0];
  for (const w of widths) edges.push(edges[edges.length - 1] + w);
  const mid = (i: number) => (edges[i] + edges[i + 1]) / 2;
  const bottom = y0;
  const line = y0 + R * rowH;
  const top = line + headH;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Column highlights first, so the lines and digits are drawn over them.
  o.places.forEach((_, i) => {
    Object.assign(points, { [n(`k${i}a`)]: [edges[i], bottom], [n(`k${i}b`)]: [edges[i + 1], bottom], [n(`k${i}c`)]: [edges[i + 1], top], [n(`k${i}d`)]: [edges[i], top] });
    items.push({ kind: 'region', id: n(`col${i}`), points: ['a', 'b', 'c', 'd'].map((c) => n(`k${i}${c}`)), tone: 'theta', shade: 0.16 });
  });
  const seg = (id: string, a: P, b: P, weight = 2) => {
    Object.assign(points, { [n(`${id}-a`)]: a, [n(`${id}-b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), tone: 'muted', weight, group: n('frame') });
  };
  const right = edges[edges.length - 1];
  seg('top', [x0, top], [right, top]);
  seg('bottom', [x0, bottom], [right, bottom]);
  seg('headline', [x0, line], [right, line], 2.5);
  for (let r = 1; r < R; r++) seg(`rule${r}`, [x0, line - r * rowH], [right, line - r * rowH], 1.5);
  edges.forEach((x, i) => seg(`vl${i}`, [x, bottom], [x, top]));
  o.places.forEach((p, i) => {
    if (p === '.') return;
    points[n(`h${i}`)] = [mid(i), line + headH / 2];
    items.push({ kind: 'label', id: n(`h${i}`), at: n(`h${i}`), tex: heading(p, o.headSize ?? '\\small'), tone: 'muted', place: 'center', group: n('head') });
  });
  o.rows.forEach((row, r) => {
    row.forEach((d, i) => {
      if (!d) return;
      const id = `r${r}-${i}`;
      points[n(id)] = [mid(i), line - (r + 0.5) * rowH];
      items.push({ kind: 'label', id: n(id), at: n(id), tex: `${o.digitSize ?? '\\LARGE'} ${d}`, tone: o.tones?.[id] ?? 'ink', place: 'center', group: n(`row${r}`) });
    });
  });
  for (const note of o.notes ?? []) {
    points[n(note.id)] = [mid(note.col), bottom - 0.2];
    items.push({ kind: 'label', id: n(note.id), at: n(note.id), tex: note.tex, tone: note.tone ?? 'good', place: 'below' });
  }
  for (const a of o.arcs ?? []) {
    const xa = mid(a.from);
    const xb = mid(a.to);
    const h = 0.5 + 0.12 * Math.abs(xb - xa);
    const ids: string[] = [];
    for (let k = 0; k <= 24; k++) {
      const t = k / 24;
      points[n(`${a.id}-${k}`)] = [xa + (xb - xa) * t, top + 0.15 + h * Math.sin(Math.PI * t)];
      ids.push(n(`${a.id}-${k}`));
    }
    items.push({ kind: 'curve', id: n(a.id), points: ids, tone: a.tone ?? 'adj', weight: 3, label: a.label, labelSide: xb > xa ? 'left' : 'right' });
  }
  return { points, items };
}

/**
 * A hundred grid: one whole, a square `size` units wide, cut into 10 columns (tenths) and 100
 * small squares (hundredths). The first `tenths` columns are shaded, and then `hundredths` small
 * squares up the next column. With `zoom`, the top small square of the last column is drawn again,
 * bigger, at `zoom.at`, cut into ten thin strips with one shaded: a thousandth.
 *
 * Parts: `frame` (a group: the outline), `cols` (a group: the lines between the tenths), `rows`
 * (a group: the lines that cut the tenths into small squares), `tenths` and `hundredths` (the shaded pieces), `label` (under the square),
 * `cell` (the top small square of the last column, shaded) and `zoom` (a group: the big square,
 * its strips and the dashed lines to it), with `thousandth` (the shaded strip).
 */
export function hundredGrid(o: {
  name?: string;
  at?: P;
  size?: number;
  tenths?: number;
  hundredths?: number;
  tone?: DiagramTone;
  label?: string;
  zoom?: { at: P; size: number };
}): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const S = o.size ?? 5;
  const s = S / 10;
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const rect = (id: string, x0: number, y0: number, x1: number, y1: number, t: DiagramTone, shade: number, group?: string) => {
    Object.assign(points, { [n(`${id}A`)]: [x0, y0], [n(`${id}B`)]: [x1, y0], [n(`${id}C`)]: [x1, y1], [n(`${id}D`)]: [x0, y1] });
    items.push({ kind: 'region', id: n(id), points: ['A', 'B', 'C', 'D'].map((c) => n(`${id}${c}`)), tone: t, shade, ...(group ? { group: n(group) } : {}) });
  };
  const seg = (id: string, a: P, b: P, extra: Partial<Extract<DiagramItem, { kind: 'line' }>>) => {
    Object.assign(points, { [n(`${id}-a`)]: a, [n(`${id}-b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), ...extra });
  };
  const t = o.tenths ?? 0;
  const h = o.hundredths ?? 0;
  if (t > 0) rect('tenths', x, y, x + t * s, y + S, tone, 0.6);
  if (h > 0) rect('hundredths', x + t * s, y, x + (t + 1) * s, y + h * s, 'opp', 0.6);
  rect('cell', x + 9 * s, y + 9 * s, x + S, y + S, 'opp', 0.6);
  for (let i = 1; i < 10; i++) {
    seg(`gx${i}`, [x + i * s, y], [x + i * s, y + S], { tone: 'ink', weight: 2, group: n('cols') });
    seg(`gy${i}`, [x, y + i * s], [x + S, y + i * s], { tone: 'muted', weight: 1.5, group: n('rows') });
  }
  seg('ob', [x, y], [x + S, y], { weight: 3, group: n('frame') });
  seg('or', [x + S, y], [x + S, y + S], { weight: 3, group: n('frame') });
  seg('ot', [x + S, y + S], [x, y + S], { weight: 3, group: n('frame') });
  seg('ol', [x, y + S], [x, y], { weight: 3, group: n('frame') });
  if (o.label) {
    points[n('lab')] = [x + S / 2, y - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'below' });
  }
  if (o.zoom) {
    const [zx, zy] = o.zoom.at;
    const Z = o.zoom.size;
    rect('thousandth', zx, zy, zx + Z / 10, zy + Z, 'theta', 0.75);
    seg('zl1', [x + S, y + S], [zx, zy + Z], { tone: 'muted', dashed: true, weight: 2, group: n('zoom') });
    seg('zl2', [x + S, y + 9 * s], [zx, zy], { tone: 'muted', dashed: true, weight: 2, group: n('zoom') });
    for (let i = 1; i < 10; i++) seg(`zs${i}`, [zx + (i * Z) / 10, zy], [zx + (i * Z) / 10, zy + Z], { tone: 'muted', weight: 1.5, group: n('zoom') });
    seg('zb', [zx, zy], [zx + Z, zy], { tone: 'opp', weight: 3, group: n('zoom') });
    seg('zr', [zx + Z, zy], [zx + Z, zy + Z], { tone: 'opp', weight: 3, group: n('zoom') });
    seg('zt', [zx + Z, zy + Z], [zx, zy + Z], { tone: 'opp', weight: 3, group: n('zoom') });
    seg('zlft', [zx, zy + Z], [zx, zy], { tone: 'opp', weight: 3, group: n('zoom') });
  }
  return { points, items };
}

/**
 * Labels under a number line drawn by `numberLine` with the same `min`, `max`, `length` and
 * `at`, for numbers the line itself would write without spaces (2 490 000). Parts: each label by
 * its `id`, in the group `ticks`.
 */
export function tickLabels(o: { name?: string; min: number; max: number; length?: number; at?: P; values: { id: string; value: number; tex: string; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const v of o.values) {
    points[n(`tl-${v.id}`)] = [x0 + ((v.value - o.min) / (o.max - o.min)) * L, y0 - 0.22];
    items.push({ kind: 'label', id: n(v.id), at: n(`tl-${v.id}`), tex: v.tex, tone: v.tone ?? 'muted', place: 'below', group: n('ticks') });
  }
  return { points, items };
}

/**
 * Jumps along a number line drawn by `numberLine` with the same `min`, `max`, `length` and `at`:
 * `count` small arcs above the line, each `step` long, starting at `from`.
 * Parts: each jump `hop<k>`, all in the group `hops`.
 */
export function hops(o: { name?: string; min: number; max: number; length?: number; at?: P; from: number; step: number; count: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const X = (v: number) => x0 + ((v - o.min) / (o.max - o.min)) * L;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.count; k++) {
    const a = X(o.from + k * o.step);
    const b = X(o.from + (k + 1) * o.step);
    const ids: string[] = [];
    for (let s = 0; s <= 12; s++) {
      const t = s / 12;
      points[n(`hop${k}-${s}`)] = [a + (b - a) * (0.08 + 0.84 * t), y0 + 0.3 + 0.4 * (b - a) * Math.sin(Math.PI * t)];
      ids.push(n(`hop${k}-${s}`));
    }
    items.push({ kind: 'curve', id: n(`hop${k}`), points: ids, tone: o.tone ?? 'opp', weight: 2.5, group: n('hops') });
  }
  return { points, items };
}

/** A dashed line from one place to another (to zoom in on part of a number line). Part: its `id`. */
export function link(o: { id: string; from: P; to: P; tone?: DiagramTone; group?: string }): Part {
  return {
    points: { [`${o.id}-a`]: o.from, [`${o.id}-b`]: o.to },
    items: [{ kind: 'line', id: o.id, from: `${o.id}-a`, to: `${o.id}-b`, tone: o.tone ?? 'muted', dashed: true, weight: 2, ...(o.group ? { group: o.group } : {}) }],
  };
}

/**
 * Where `numberLine` puts a value (its x), for drawing links to it: a line from `min` to `max`,
 * `length` long, starting at `x0`.
 */
export const xOf = (v: number, min: number, max: number, length = 12, x0 = 0) => x0 + ((v - min) / (max - min)) * length;
