/**
 * Figures for the probability videos, built only from standard diagram parts (lines, shaded
 * regions and labels), so each goes into a diagram with `figure`:
 *
 * - `letterTiles`: a row of square tiles, each with a letter on it.
 * - `outcomeGrid`: a table of the outcomes of two events, one cell for each outcome, with shaded
 *   marks on chosen cells (for the outcomes that fit an event).
 * - `sumGrid`: the 36 sums of a red die and a blue die, as an `outcomeGrid`.
 * - `tree`: a tree diagram: branches for the first event, then branches for the second event
 *   from each, and the outcome at the end of each path.
 *
 * Coins, dice and spinners come from `m6-12-figures.ts`, marbles from `src/video/charts.ts`, and
 * tally charts from `m5-12-figures.ts`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A rectangle's corners as point names in `points`. */
function box(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  const corners: P[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  return corners.map((c, j) => {
    points[`${key}-${j}`] = c;
    return `${key}-${j}`;
  });
}

/**
 * Square tiles in a row, `gap` apart, each with a letter (TeX) on it, shaded in its tone from
 * `tones` (muted by default). Parts: each tile `t<i>` (a group: the tile and its letter).
 */
export function letterTiles(o: { name?: string; letters: string[]; tones?: DiagramTone[]; gap?: number; size?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1.3;
  const s = o.size ?? 1.1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.letters.forEach((l, i) => {
    const x = i * gap;
    const ids = box(points, n(`t${i}`), x - s / 2, -s / 2, x + s / 2, s / 2);
    const tone = o.tones?.[i] ?? 'muted';
    points[n(`t${i}-c`)] = [x, 0];
    items.push(
      { kind: 'region', id: n(`t${i}-fill`), points: ids, tone, shade: tone === 'muted' ? 0.25 : 0.45, group: n(`t${i}`) },
      { kind: 'curve', id: n(`t${i}-edge`), points: ids, closed: true, tone: tone === 'muted' ? 'ink' : tone, weight: 2.5, group: n(`t${i}`) },
      { kind: 'label', id: n(`t${i}-letter`), at: n(`t${i}-c`), tex: `\\Large\\text{${l}}`, place: 'center', group: n(`t${i}`) },
    );
  });
  return { points, items };
}

/**
 * A table of the outcomes of two events: the first event's outcomes down the side (`rows`), the
 * second's across the top (`cols`), and `cells[r][c]` (TeX) in each cell. `corner` (TeX) goes in
 * the top-left cell, and the headings are coloured `rowTone` (blue) and `colTone` (orange). Each
 * of `marks` shades a set of cells, to pick out the outcomes that fit an event.
 *
 * Parts: `frame` (a group: the lines, the headings and the corner), each cell `c<r>-<c>` (in the
 * group `row<r>`), and each mark by its `id` (a group of shaded cells `<id>-<k>`).
 */
export function outcomeGrid(o: {
  name?: string;
  rows: string[];
  cols: string[];
  cells: string[][];
  corner?: string;
  w?: number;
  h?: number;
  marks?: { id: string; cells: [number, number][]; tone?: DiagramTone }[];
  rowTone?: DiagramTone;
  colTone?: DiagramTone;
}): Part {
  const n = namer(o.name);
  const w = o.w ?? 1.6;
  const h = o.h ?? 1;
  const R = o.rows.length;
  const C = o.cols.length;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const X = (c: number) => (c + 1) * w; // left edge of column c
  const Y = (r: number) => -(r + 1) * h; // top edge of row r
  // Marks first, so the lines and labels sit on top of them.
  for (const m of o.marks ?? []) {
    m.cells.forEach(([r, c], k) => {
      const ids = box(points, n(`${m.id}-${k}`), X(c) + 0.06, Y(r) - h + 0.06, X(c) + w - 0.06, Y(r) - 0.06);
      items.push({ kind: 'region', id: n(`${m.id}-${k}`), points: ids, tone: m.tone ?? 'good', shade: 0.45, group: n(m.id) });
    });
  }
  const seg = (id: string, a: P, b: P, heavy: boolean) => {
    Object.assign(points, { [n(`${id}a`)]: a, [n(`${id}b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}a`), to: n(`${id}b`), tone: heavy ? 'ink' : 'muted', weight: heavy ? 2.5 : 1.5, group: n('frame') });
  };
  const right = X(C);
  const bottom = Y(R);
  for (let c = 0; c <= C + 1; c++) seg(`v${c}`, [c * w, 0], [c * w, bottom], c === 0 || c === 1 || c === C + 1);
  for (let r = 0; r <= R + 1; r++) seg(`h${r}`, [0, -r * h], [right, -r * h], r === 0 || r === 1 || r === R + 1);
  o.cols.forEach((t, c) => {
    points[n(`col${c}-at`)] = [X(c) + w / 2, -h / 2];
    items.push({ kind: 'label', id: n(`col${c}`), at: n(`col${c}-at`), tex: t, tone: o.colTone ?? 'opp', place: 'center', group: n('frame') });
  });
  o.rows.forEach((t, r) => {
    points[n(`row${r}-at`)] = [w / 2, Y(r) - h / 2];
    items.push({ kind: 'label', id: n(`rowname${r}`), at: n(`row${r}-at`), tex: t, tone: o.rowTone ?? 'adj', place: 'center', group: n('frame') });
  });
  if (o.corner) {
    points[n('corner-at')] = [w / 2, -h / 2];
    items.push({ kind: 'label', id: n('corner'), at: n('corner-at'), tex: o.corner, tone: 'muted', place: 'center', group: n('frame') });
  }
  o.cells.forEach((row, r) =>
    row.forEach((t, c) => {
      points[n(`c${r}-${c}-at`)] = [X(c) + w / 2, Y(r) - h / 2];
      items.push({ kind: 'label', id: n(`c${r}-${c}`), at: n(`c${r}-${c}-at`), tex: t, place: 'center', group: n(`row${r}`) });
    }),
  );
  return { points, items };
}

/**
 * A tree diagram from a starting dot on the left: a branch for each outcome of the first event
 * (`first`, TeX), then from each of those a branch for each outcome of the second event
 * (`second`), with the outcome of the whole path (`outcome(i, j)`, TeX) at its end. Paths are
 * `gap` apart, top to bottom.
 *
 * Parts: `root`, each first branch `b<i>` (a group: its line and name), each second branch
 * `b<i>-<j>` (a group: its line and name), and each outcome `o<i>-<j>`.
 */
export function tree(o: { name?: string; first: string[]; second: string[]; outcome: (i: number, j: number) => string; gap?: number; tones?: [DiagramTone, DiagramTone] }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1;
  const [t1, t2] = o.tones ?? ['adj', 'opp'];
  const S = o.second.length;
  const total = o.first.length * S;
  const yOf = (k: number) => ((total - 1) / 2 - k) * gap;
  const [x1, x2, x3] = [3, 6.4, 7.2];
  const pad = 0.38;
  // `room` keeps space for the outcomes written to the right of the last branches.
  const points: Record<string, P> = { [n('root')]: [0, 0], [n('room')]: [x3 + 2, 0] };
  const items: DiagramItem[] = [{ kind: 'label', id: n('root'), at: n('root'), tex: '', tone: 'ink', dot: true }];
  o.first.forEach((f, i) => {
    const y1 = yOf(i * S + (S - 1) / 2);
    Object.assign(points, { [n(`b${i}-a`)]: [0.15, 0], [n(`b${i}-b`)]: [x1 - pad, y1 * (1 - pad / x1)], [n(`b${i}-at`)]: [x1, y1] });
    items.push(
      { kind: 'line', id: n(`b${i}-line`), from: n(`b${i}-a`), to: n(`b${i}-b`), tone: t1, weight: 3, group: n(`b${i}`) },
      { kind: 'label', id: n(`b${i}-name`), at: n(`b${i}-at`), tex: f, tone: t1, place: 'center', group: n(`b${i}`) },
    );
    o.second.forEach((s, j) => {
      const y2 = yOf(i * S + j);
      const id = `b${i}-${j}`;
      const dx = x2 - x1 - 2 * pad;
      Object.assign(points, { [n(`${id}-a`)]: [x1 + pad, y1], [n(`${id}-b`)]: [x1 + pad + dx, y2], [n(`${id}-at`)]: [x2, y2], [n(`o${i}-${j}-at`)]: [x3, y2] });
      items.push(
        { kind: 'line', id: n(`${id}-line`), from: n(`${id}-a`), to: n(`${id}-b`), tone: t2, weight: 3, group: n(id) },
        { kind: 'label', id: n(`${id}-name`), at: n(`${id}-at`), tex: s, tone: t2, place: 'center', group: n(id) },
        { kind: 'label', id: n(`o${i}-${j}`), at: n(`o${i}-${j}-at`), tex: o.outcome(i, j), tone: 'theta', place: 'right' },
      );
    });
  });
  return { points, items };
}

/**
 * The sums of a red die (down the side, red) and a blue die (across the top, blue): a table of
 * 36 outcomes, with each of `marks` shading the cells whose red and blue numbers fit it.
 *
 * Parts: as `outcomeGrid`: `frame`, each cell `c<r>-<c>` (red r + 1, blue c + 1, in the group
 * `row<r>`), and each mark by its `id`.
 */
export function sumGrid(o: { name?: string; marks?: { id: string; fits: (red: number, blue: number) => boolean; tone?: DiagramTone }[]; w?: number; h?: number } = {}): Part {
  const six = [1, 2, 3, 4, 5, 6];
  return outcomeGrid({
    name: o.name,
    rows: six.map(String),
    cols: six.map(String),
    cells: six.map((r) => six.map((b) => String(r + b))),
    corner: '+',
    rowTone: 'bad',
    colTone: 'adj',
    w: o.w ?? 1.2,
    h: o.h ?? 0.9,
    marks: (o.marks ?? []).map((m) => ({
      id: m.id,
      tone: m.tone,
      cells: six.flatMap((r) => six.filter((b) => m.fits(r, b)).map((b) => [r - 1, b - 1] as [number, number])),
    })),
  });
}
