/**
 * Figures for the puzzles, games and research-project videos, built only from standard diagram
 * parts (labels, lines, curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `cells`: a square grid of cells (a magic square, a Sudoku) with digits in its cells.
 * - `logicGrid`: the yes/no grid of a logic puzzle, people down the side and choices across.
 * - `track`: a row of numbered boxes (the pile sizes of a take-away game), shaded one by one.
 * - `counters`: a row of counters, each a part, so some can be taken away.
 * - `jugs`: two jugs with their water levels, for a measuring puzzle.
 * - `crowd`: a population of dots with a sample picked out.
 * - `bars`: bars on a plane whose scale may start above zero (a misleading bar graph).
 * - `causes`: one quantity driving two others (correlation without causation).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const LETTERS = 'ABCDEFGH';

/**
 * An n by n grid of unit cells named by column letter and row number, A1 at the top left (as in
 * the lessons). `box` draws thicker lines around blocks of that size (2 for a 4 by 4 Sudoku).
 *
 * Parts: `grid` (a group: every line), `letters` and `numbers` (groups: the column letters above
 * and the row numbers to the left, when `labels` is set), `given` (a group: the digits given at the
 * start), each digit to fill in `v-<cell>` (from `fill`), each label in `marks` by its id (a
 * placeholder such as x, on its own), and each shading in `shades` by its id (a group of one
 * shaded square per cell).
 */
export function cells(o: {
  name?: string;
  n: number;
  box?: number;
  labels?: boolean;
  given?: Record<string, string>;
  fill?: Record<string, string>;
  marks?: { id: string; cell: string; tex: string; tone?: DiagramTone }[];
  shades?: { id: string; cells: string[]; tone?: DiagramTone }[];
}): Part {
  const n = namer(o.name);
  const N = o.n;
  const centre = (cell: string): P => {
    const c = LETTERS.indexOf(cell[0]);
    const r = Number(cell.slice(1)) - 1;
    return [c + 0.5, N - r - 0.5];
  };
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const s of o.shades ?? []) {
    for (const cell of s.cells) {
      const [x, y] = centre(cell);
      const ids = [0, 1, 2, 3].map((k) => n(`${s.id}-${cell}-${k}`));
      [[x - 0.5, y - 0.5], [x + 0.5, y - 0.5], [x + 0.5, y + 0.5], [x - 0.5, y + 0.5]].forEach((q, k) => (points[ids[k]] = q as P));
      items.push({ kind: 'region', id: n(`${s.id}-${cell}`), points: ids, tone: s.tone ?? 'adj', shade: 0.25, group: n(s.id) });
    }
  }
  for (let k = 0; k <= N; k++) {
    const thick = k === 0 || k === N || (o.box !== undefined && k % o.box === 0);
    Object.assign(points, { [n(`v${k}a`)]: [k, 0], [n(`v${k}b`)]: [k, N], [n(`h${k}a`)]: [0, k], [n(`h${k}b`)]: [N, k] });
    items.push(
      { kind: 'line', id: n(`gv${k}`), from: n(`v${k}a`), to: n(`v${k}b`), tone: thick ? 'ink' : 'muted', weight: thick ? 3.5 : 1.5, group: n('grid') },
      { kind: 'line', id: n(`gh${k}`), from: n(`h${k}a`), to: n(`h${k}b`), tone: thick ? 'ink' : 'muted', weight: thick ? 3.5 : 1.5, group: n('grid') },
    );
  }
  if (o.labels) {
    for (let k = 0; k < N; k++) {
      Object.assign(points, { [n(`L${k}`)]: [k + 0.5, N + 0.35], [n(`N${k}`)]: [-0.35, N - k - 0.5] });
      items.push(
        { kind: 'label', id: n(`letter${k}`), at: n(`L${k}`), tex: `\\text{${LETTERS[k]}}`, tone: 'adj', place: 'center', group: n('letters') },
        { kind: 'label', id: n(`number${k}`), at: n(`N${k}`), tex: String(k + 1), tone: 'opp', place: 'center', group: n('numbers') },
      );
    }
  }
  for (const [cell, tex] of Object.entries(o.given ?? {})) {
    points[n(`c-${cell}`)] = centre(cell);
    items.push({ kind: 'label', id: n(`g-${cell}`), at: n(`c-${cell}`), tex, tone: 'ink', place: 'center', group: n('given') });
  }
  for (const [cell, tex] of Object.entries(o.fill ?? {})) {
    points[n(`c-${cell}`)] = centre(cell);
    items.push({ kind: 'label', id: n(`v-${cell}`), at: n(`c-${cell}`), tex, tone: 'good', place: 'center' });
  }
  for (const m of o.marks ?? []) {
    points[n(`c-${m.cell}`)] = centre(m.cell);
    items.push({ kind: 'label', id: n(m.id), at: n(`c-${m.cell}`), tex: m.tex, tone: m.tone ?? 'theta', place: 'center' });
  }
  return { points, items };
}

/**
 * The grid of a logic puzzle: a row for each of `rows` (people) and a column for each of `cols`
 * (choices), each cell `w` wide, with a mark in each cell listed in `marks`: a tick for yes, a cross
 * for no.
 *
 * Parts: `grid` (a group: the lines), `rows` and `cols` (groups: the names), and each mark by its
 * id, `m<r><c>` (row r, column c, from 0).
 */
export function logicGrid(o: { name?: string; rows: string[]; cols: string[]; w?: number; marks: { r: number; c: number; yes: boolean }[] }): Part {
  const n = namer(o.name);
  const W = o.w ?? 2.6;
  const R = o.rows.length;
  const C = o.cols.length;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let c = 0; c <= C; c++) {
    Object.assign(points, { [n(`v${c}a`)]: [c * W, 0], [n(`v${c}b`)]: [c * W, R] });
    items.push({ kind: 'line', id: n(`gv${c}`), from: n(`v${c}a`), to: n(`v${c}b`), tone: c === 0 || c === C ? 'ink' : 'muted', weight: c === 0 || c === C ? 3 : 1.5, group: n('grid') });
  }
  for (let r = 0; r <= R; r++) {
    Object.assign(points, { [n(`h${r}a`)]: [0, r], [n(`h${r}b`)]: [C * W, r] });
    items.push({ kind: 'line', id: n(`gh${r}`), from: n(`h${r}a`), to: n(`h${r}b`), tone: r === 0 || r === R ? 'ink' : 'muted', weight: r === 0 || r === R ? 3 : 1.5, group: n('grid') });
  }
  o.rows.forEach((name, r) => {
    points[n(`R${r}`)] = [-0.25, R - r - 0.5];
    items.push({ kind: 'label', id: n(`row${r}`), at: n(`R${r}`), tex: `\\text{${name}}`, tone: 'adj', place: 'left', group: n('rows') });
  });
  o.cols.forEach((name, c) => {
    points[n(`C${c}`)] = [(c + 0.5) * W, R + 0.12];
    items.push({ kind: 'label', id: n(`col${c}`), at: n(`C${c}`), tex: `\\text{${name}}`, tone: 'opp', place: 'above', group: n('cols') });
  });
  for (const m of o.marks) {
    const id = n(`m${m.r}${m.c}`);
    points[id] = [(m.c + 0.5) * W, R - m.r - 0.5];
    items.push({ kind: 'label', id, at: id, tex: m.yes ? '\\checkmark' : '\\times', tone: m.yes ? 'good' : 'bad', place: 'center' });
  }
  return { points, items };
}

/**
 * A row of `n` boxes numbered 1 to n (the sizes of a pile), with each box in `shade` shaded in its
 * tone. Parts: `boxes` (a group: the outlines and numbers), and each shading `s<k>` (box k), in the
 * group given with it, so the boxes can be shaded a few at a time.
 */
export function track(o: { name?: string; n: number; shade: { k: number; tone: DiagramTone; group: string }[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const s of o.shade) {
    const x = s.k - 1;
    const ids = [0, 1, 2, 3].map((j) => n(`s${s.k}-${j}`));
    [[x + 0.06, 0.06], [x + 0.94, 0.06], [x + 0.94, 0.94], [x + 0.06, 0.94]].forEach((q, j) => (points[ids[j]] = q as P));
    items.push({ kind: 'region', id: n(`s${s.k}`), points: ids, tone: s.tone, shade: 0.45, group: n(s.group) });
  }
  for (let k = 1; k <= o.n; k++) {
    const x = k - 1;
    const ids = [0, 1, 2, 3].map((j) => n(`b${k}-${j}`));
    [[x + 0.06, 0.06], [x + 0.94, 0.06], [x + 0.94, 0.94], [x + 0.06, 0.94]].forEach((q, j) => (points[ids[j]] = q as P));
    points[n(`t${k}`)] = [x + 0.5, 0.5];
    items.push(
      { kind: 'curve', id: n(`box${k}`), points: ids, closed: true, tone: 'muted', weight: 2, group: n('boxes') },
      { kind: 'label', id: n(`num${k}`), at: n(`t${k}`), tex: String(k), tone: 'ink', place: 'center', group: n('boxes') },
    );
  }
  return { points, items };
}

/**
 * A row of `n` round counters, each a group `c1`, `c2`… from the left (a disc and its edge), so some
 * can be taken away by hiding them.
 */
export function counters(o: { name?: string; n: number; at?: P; gap?: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const gap = o.gap ?? 1;
  const r = 0.38 * gap;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 1; k <= o.n; k++) {
    const cx = x0 + (k - 1) * gap;
    const ring: string[] = [];
    for (let j = 0; j < 24; j++) {
      const t = (2 * Math.PI * j) / 24;
      points[n(`c${k}-${j}`)] = [cx + r * Math.cos(t), y0 + r * Math.sin(t)];
      ring.push(n(`c${k}-${j}`));
    }
    items.push(
      { kind: 'region', id: n(`c${k}-f`), points: ring, tone: o.tone ?? 'theta', shade: 0.35, group: n(`c${k}`) },
      { kind: 'curve', id: n(`c${k}-e`), points: ring, closed: true, tone: o.tone ?? 'theta', weight: 2.5, group: n(`c${k}`) },
    );
  }
  return { points, items };
}

/**
 * Two open-topped jugs side by side, holding 3 L and 5 L (or `caps`), with every water level drawn
 * as a part (or only the levels in `only`, such as `['a3', 'b4']`, for a picture of one state):
 * `a<k>` is k litres in the first jug, `b<k>` k litres in the second (each a group: the water and its
 * amount). Parts: `jugA` and `jugB` (groups: the outline and its name below).
 */
export function jugs(o: { name?: string; caps?: [number, number]; only?: string[] } = {}): Part {
  const n = namer(o.name);
  const [ca, cb] = o.caps ?? [3, 5];
  const unit = 0.62;
  const width = 1.7;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const jug = (key: 'a' | 'b', x: number, cap: number) => {
    const H = cap * unit;
    Object.assign(points, { [n(`${key}0`)]: [x, H + 0.25], [n(`${key}1`)]: [x, 0], [n(`${key}2`)]: [x + width, 0], [n(`${key}3`)]: [x + width, H + 0.25], [n(`${key}name`)]: [x + width / 2, -0.15] });
    for (let k = 1; k <= cap; k++) {
      if (o.only && !o.only.includes(`${key}${k}`)) continue;
      const ids = [0, 1, 2, 3].map((j) => n(`${key}w${k}-${j}`));
      [[x + 0.05, 0.05], [x + width - 0.05, 0.05], [x + width - 0.05, k * unit], [x + 0.05, k * unit]].forEach((q, j) => (points[ids[j]] = q as P));
      points[n(`${key}t${k}`)] = [x + width / 2, (k * unit) / 2];
      items.push(
        { kind: 'region', id: n(`${key}${k}-w`), points: ids, tone: 'adj', shade: 0.55, group: n(`${key}${k}`) },
        { kind: 'label', id: n(`${key}${k}-t`), at: n(`${key}t${k}`), tex: `${k}\\text{ L}`, tone: 'ink', place: 'center', group: n(`${key}${k}`) },
      );
    }
    const jugId = n(`jug${key.toUpperCase()}`);
    items.push(
      { kind: 'curve', id: n(`${key}-edge`), points: [0, 1, 2, 3].map((j) => n(`${key}${j}`)), tone: 'ink', weight: 3.5, group: jugId },
      { kind: 'label', id: n(`${key}-name`), at: n(`${key}name`), tex: `\\text{${cap} L jug}`, tone: 'muted', place: 'below', group: jugId },
    );
  };
  jug('a', 0, ca);
  jug('b', width + 1.6, cb);
  return { points, items };
}

/**
 * A population drawn as a `cols` by `rows` grid of dots, with the dots in `picks` (column, row from
 * the top left, from 0) picked out as a sample. Parts: `pop` (a group: every dot) and `pick` (a
 * group: the sample, drawn over the population), and `title` above the grid.
 */
export function crowd(o: { name?: string; cols: number; rows: number; picks: [number, number][]; at?: P; title?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let c = 0; c < o.cols; c++)
    for (let r = 0; r < o.rows; r++) {
      points[n(`p${c}-${r}`)] = [x0 + c, y0 + o.rows - 1 - r];
      items.push({ kind: 'label', id: n(`p${c}-${r}`), at: n(`p${c}-${r}`), tex: '', tone: 'muted', dot: true, group: n('pop') });
    }
  o.picks.forEach(([c, r], k) => items.push({ kind: 'label', id: n(`k${k}`), at: n(`p${c}-${r}`), tex: '', tone: o.tone ?? 'theta', dot: true, group: n('pick') }));
  if (o.title) {
    points[n('top')] = [x0 + (o.cols - 1) / 2, y0 + o.rows - 0.4];
    items.push({ kind: 'label', id: n('title'), at: n('top'), tex: o.title, tone: o.tone ?? 'theta', place: 'above' });
  }
  return { points, items };
}

/**
 * Bars on the plane `g`, one at each `x` (`width` wide), from the bottom of the plane up to its
 * `value`, which is written above it, with its `name` (TeX) under the plane. The plane's scale may
 * start above zero, as on a misleading graph. Parts: each bar `<id><k>` (a group: the bar, its
 * value and its name).
 */
export function bars(g: Plane, o: { id: string; width?: number; tone?: DiagramTone; items: { x: number; value: number; name: string }[] }): Part {
  const w = o.width ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const base = g.y[0];
  o.items.forEach((b, k) => {
    const id = g.n(`${o.id}${k}`);
    const corners: P[] = [g.map(b.x - w / 2, base), g.map(b.x + w / 2, base), g.map(b.x + w / 2, b.value), g.map(b.x - w / 2, b.value)];
    const ids = corners.map((q, j) => {
      points[`${id}-${j}`] = q;
      return `${id}-${j}`;
    });
    Object.assign(points, { [`${id}-top`]: g.map(b.x, b.value), [`${id}-base`]: g.map(b.x, base) });
    points[`${id}-base`] = [points[`${id}-base`][0], points[`${id}-base`][1] - 0.35];
    items.push(
      { kind: 'region', id: `${id}-fill`, points: ids, tone: o.tone ?? 'adj', shade: 0.55, group: id },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: o.tone ?? 'adj', weight: 2, group: id },
      { kind: 'label', id: `${id}-v`, at: `${id}-top`, tex: String(b.value), place: 'above', group: id },
      { kind: 'label', id: `${id}-name`, at: `${id}-base`, tex: b.name, place: 'below', group: id },
    );
  });
  return { points, items };
}

/**
 * One quantity (`top`) that drives two others (`left` and `right`), with arrows down to each, and
 * a dashed question between the two: they rise together, but neither causes the other.
 * Parts: `top`, `left`, `right` (the names), `a1` and `a2` (the arrows) and `link` (the dashed
 * line with its question mark, a group).
 */
export function causes(o: { name?: string; top: string; left: string; right: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {
    [n('T')]: [0, 3],
    [n('L')]: [-3.6, 0],
    [n('R')]: [3.6, 0],
    [n('T1')]: [-0.5, 2.55],
    [n('T2')]: [0.5, 2.55],
    [n('L1')]: [-3.1, 0.5],
    [n('R1')]: [3.1, 0.5],
    [n('La')]: [-1.6, 0],
    [n('Ra')]: [1.6, 0],
    [n('Q')]: [0, 0],
  };
  const items: DiagramItem[] = [
    { kind: 'label', id: n('top'), at: n('T'), tex: `\\text{${o.top}}`, tone: 'theta', place: 'center' },
    { kind: 'label', id: n('left'), at: n('L'), tex: `\\text{${o.left}}`, tone: 'adj', place: 'center' },
    { kind: 'label', id: n('right'), at: n('R'), tex: `\\text{${o.right}}`, tone: 'opp', place: 'center' },
    { kind: 'line', id: n('a1'), from: n('T1'), to: n('L1'), tone: 'theta', arrow: true, weight: 3 },
    { kind: 'line', id: n('a2'), from: n('T2'), to: n('R1'), tone: 'theta', arrow: true, weight: 3 },
    { kind: 'line', id: n('link-l'), from: n('La'), to: n('Q'), tone: 'muted', dashed: true, weight: 2.5, group: n('link') },
    { kind: 'line', id: n('link-r'), from: n('Q'), to: n('Ra'), tone: 'muted', dashed: true, weight: 2.5, group: n('link') },
    { kind: 'label', id: n('link-q'), at: n('Q'), tex: '?', tone: 'bad', place: 'above', group: n('link') },
  ];
  return { points, items };
}

/**
 * A pin standing up from `at` (on a number line, say), `h` tall, with its label (TeX) at the top,
 * to the left or right of the pin, so two pins close together keep their labels apart.
 * Parts: `id` (a group: the pin and its label).
 */
export function pin(o: { id: string; at: P; h?: number; tex: string; tone?: DiagramTone; side?: 'left' | 'right' }): Part {
  const [x, y] = o.at;
  const top: P = [x, y + (o.h ?? 0.9)];
  return {
    points: { [`${o.id}-a`]: [x, y], [`${o.id}-b`]: top },
    items: [
      { kind: 'line', id: `${o.id}-line`, from: `${o.id}-a`, to: `${o.id}-b`, tone: o.tone ?? 'ink', weight: 2.5, group: o.id },
      { kind: 'label', id: `${o.id}-t`, at: `${o.id}-b`, tex: o.tex, tone: o.tone ?? 'ink', place: o.side === 'right' ? 'above right' : 'above left', group: o.id },
    ],
  };
}
