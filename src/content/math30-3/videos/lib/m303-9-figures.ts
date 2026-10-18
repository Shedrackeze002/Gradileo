/**
 * Figures for the logic puzzles and games videos, built only from standard diagram parts (labels,
 * lines, curves and shaded regions), so each goes into a diagram with `figure`. The Sudoku grid
 * and the logic grid of the Math 30-2 puzzle videos (`cells` and `logicGrid` in
 * `../../math30-2/videos/lib/m302-8-figures.ts`) are used as they are; these add:
 *
 * - `gridNumbers`: row numbers down the left and column numbers along the top of a `cells` grid,
 *   so a cell can be named "row 3, column 3".
 * - `pyramid`: a number pyramid of bricks, each the sum of the two below it.
 * - `kenken`: a KenKen grid with its cages outlined and their targets in the corners.
 * - `balance`: a balance scale, level or tipped, with bolts on its pans.
 * - `boltGroups`: rows of bolts split into groups, each with a name.
 * - `positionRow`: the pile sizes of a take-away game, each marked W (a win for the player to move)
 *   or L (a loss).
 * - `ticTacToe`: a tic-tac-toe board with its Xs and Os, and lines through three cells.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Points round a circle, added to `points` as `<key>0`, `<key>1`…, in order. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 24): string[] {
  const names: string[] = [];
  for (let j = 0; j < steps; j++) {
    const t = (2 * Math.PI * j) / steps;
    points[`${key}${j}`] = [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
    names.push(`${key}${j}`);
  }
  return names;
}

/** The four corners of a rectangle, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}a`]: [x0, y0], [`${key}b`]: [x1, y0], [`${key}c`]: [x1, y1], [`${key}d`]: [x0, y1] });
  return ['a', 'b', 'c', 'd'].map((k) => `${key}${k}`);
}

/**
 * Row numbers (1 to n, from the top) to the left of an n by n `cells` grid, and column numbers
 * above it, in the same places as that grid's letters. Give it the grid's `name`, if it has one.
 *
 * Parts: `rownums` and `colnums` (groups).
 */
export function gridNumbers(o: { name?: string; n: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.n; k++) {
    Object.assign(points, { [n(`cn${k}`)]: [k + 0.5, o.n + 0.35], [n(`rn${k}`)]: [-0.38, o.n - k - 0.5] });
    items.push(
      { kind: 'label', id: n(`colnum${k}`), at: n(`cn${k}`), tex: String(k + 1), tone: 'muted', place: 'center', group: n('colnums') },
      { kind: 'label', id: n(`rownum${k}`), at: n(`rn${k}`), tex: String(k + 1), tone: 'muted', place: 'center', group: n('rownums') },
    );
  }
  return { points, items };
}

/**
 * A number pyramid with a bottom row of `base` bricks, each row one brick shorter than the row
 * below it, each brick 2 wide and 1 tall, sitting across the two bricks below it. Brick [r, c] is
 * row r from the bottom (from 0) and brick c from the left in that row.
 *
 * Parts: `bricks` (a group: the outlines), each label in `labels` by its id (so one brick can
 * show "?" and later its value), and each shading in `shades` by its id (a group of bricks).
 */
export function pyramid(o: { name?: string; base: number; labels: { id: string; at: [number, number]; tex: string; tone?: DiagramTone }[]; shades?: { id: string; bricks: [number, number][]; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const corner = (r: number, c: number): P => [2 * c + r, r];
  for (const s of o.shades ?? []) {
    for (const [r, c] of s.bricks) {
      const [x, y] = corner(r, c);
      items.push({ kind: 'region', id: n(`${s.id}-${r}-${c}`), points: rect(points, n(`S${s.id}${r}-${c}-`), x + 0.06, y + 0.06, x + 1.94, y + 0.94), tone: s.tone ?? 'theta', shade: 0.3, group: n(s.id) });
    }
  }
  for (let r = 0; r < o.base; r++) {
    for (let c = 0; c < o.base - r; c++) {
      const [x, y] = corner(r, c);
      items.push({ kind: 'curve', id: n(`brick${r}-${c}`), points: rect(points, n(`B${r}-${c}-`), x, y, x + 2, y + 1), closed: true, tone: 'ink', weight: 2.5, group: n('bricks') });
    }
  }
  for (const l of o.labels) {
    const [x, y] = corner(...l.at);
    points[n(`L${l.id}`)] = [x + 1, y + 0.5];
    items.push({ kind: 'label', id: n(l.id), at: n(`L${l.id}`), tex: l.tex, tone: l.tone ?? 'ink', place: 'center' });
  }
  return { points, items };
}

/**
 * An n by n KenKen grid. Each cage lists its cells ([row, column] from the top left, from 0) and
 * its target with its operation (TeX, such as `6\\times`), written in the corner of its first
 * cell. Lines inside a cage are thin; cage edges and the outside are thick.
 *
 * Parts: `grid` (a group: the thin lines), `cages` (a group: the thick lines), `targets` (a group:
 * every target, `k0`, `k1`…), each cage's shading `cage0`, `cage1`… (groups, to pick a cage out),
 * each number in `fill` as `v<r>-<c>`, and each mark in `marks` by its id (`low` puts a mark near the
 * bottom of its cell, clear of a target, for pencil marks).
 */
export function kenken(o: { name?: string; n: number; cages: { cells: [number, number][]; target: string }[]; fill?: { r: number; c: number; tex: string; tone?: DiagramTone }[]; marks?: { id: string; r: number; c: number; tex: string; tone?: DiagramTone; low?: boolean }[] }): Part {
  const n = namer(o.name);
  const N = o.n;
  const cageOf = new Map<string, number>();
  o.cages.forEach((cg, i) => cg.cells.forEach(([r, c]) => cageOf.set(`${r}-${c}`, i)));
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const top = (r: number) => N - r;
  o.cages.forEach((cg, i) => {
    for (const [r, c] of cg.cells) items.push({ kind: 'region', id: n(`cage${i}-${r}-${c}`), points: rect(points, n(`K${i}${r}-${c}-`), c, top(r) - 1, c + 1, top(r)), tone: 'theta', shade: 0.25, group: n(`cage${i}`) });
  });
  const edge = (id: string, a: P, b: P, thick: boolean) => {
    Object.assign(points, { [n(`${id}a`)]: a, [n(`${id}b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}a`), to: n(`${id}b`), tone: thick ? 'ink' : 'muted', weight: thick ? 4.5 : 1.5, group: n(thick ? 'cages' : 'grid') });
  };
  for (let r = 0; r < N; r++) {
    for (let c = 0; c <= N; c++) {
      const outside = c === 0 || c === N;
      const thick = outside || cageOf.get(`${r}-${c - 1}`) !== cageOf.get(`${r}-${c}`);
      edge(`ev${r}-${c}`, [c, top(r) - 1], [c, top(r)], thick);
    }
  }
  for (let r = 0; r <= N; r++) {
    for (let c = 0; c < N; c++) {
      const outside = r === 0 || r === N;
      const thick = outside || cageOf.get(`${r - 1}-${c}`) !== cageOf.get(`${r}-${c}`);
      edge(`eh${r}-${c}`, [c, N - r], [c + 1, N - r], thick);
    }
  }
  o.cages.forEach((cg, i) => {
    const [r, c] = [...cg.cells].sort((a, b) => a[0] - b[0] || a[1] - b[1])[0];
    points[n(`T${i}`)] = [c + 0.07, top(r) - 0.06];
    items.push({ kind: 'label', id: n(`k${i}`), at: n(`T${i}`), tex: cg.target, tone: 'theta', place: 'below right', group: n('targets') });
  });
  for (const f of o.fill ?? []) {
    points[n(`F${f.r}-${f.c}`)] = [f.c + 0.55, top(f.r) - 0.62];
    items.push({ kind: 'label', id: n(`v${f.r}-${f.c}`), at: n(`F${f.r}-${f.c}`), tex: f.tex, tone: f.tone ?? 'good', place: 'center' });
  }
  for (const m of o.marks ?? []) {
    points[n(`M${m.id}`)] = [m.c + 0.55, top(m.r) - (m.low ? 0.78 : 0.62)];
    items.push({ kind: 'label', id: n(m.id), at: n(`M${m.id}`), tex: m.tex, tone: m.tone ?? 'bad', place: 'center' });
  }
  return { points, items };
}

/**
 * A balance scale standing at `at`: a post, a beam and a pan hanging from each end, with `left`
 * and `right` bolts on the pans. `tilt` is -1 when the left side is lighter (the left end rises),
 * 1 when the right side is lighter, and 0 when the two sides balance. `label` (TeX) sits under
 * the stand.
 *
 * Parts: `stand` (a group: the base and the post), `beam`, `pans` (a group: the strings and the
 * pans), `lbolts` and `rbolts` (groups: the bolts on each pan), and `label`.
 */
export function balance(o: { name?: string; at?: P; tilt: -1 | 0 | 1; left: number; right: number; label?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const tone = o.tone ?? 'theta';
  const arm = 2.2;
  const pivot: P = [x0, y0 + 3.2];
  const lift = 0.45 * o.tilt;
  const ends: Record<'l' | 'r', P> = { l: [x0 - arm, pivot[1] - lift], r: [x0 + arm, pivot[1] + lift] };
  Object.assign(points, { [n('base-a')]: [x0 - 1, y0], [n('base-b')]: [x0 + 1, y0], [n('post-a')]: [x0, y0], [n('post-b')]: pivot, [n('beam-l')]: ends.l, [n('beam-r')]: ends.r });
  items.push(
    { kind: 'line', id: n('base'), from: n('base-a'), to: n('base-b'), tone: 'ink', weight: 4, group: n('stand') },
    { kind: 'line', id: n('post'), from: n('post-a'), to: n('post-b'), tone: 'ink', weight: 4, group: n('stand') },
    { kind: 'line', id: n('beam'), from: n('beam-l'), to: n('beam-r'), tone: 'ink', weight: 4.5 },
  );
  for (const side of ['l', 'r'] as const) {
    const [ex, ey] = ends[side];
    const panY = ey - 1.3;
    Object.assign(points, { [n(`${side}-pa`)]: [ex - 0.95, panY], [n(`${side}-pb`)]: [ex + 0.95, panY] });
    items.push(
      { kind: 'line', id: n(`${side}-s1`), from: n(side === 'l' ? 'beam-l' : 'beam-r'), to: n(`${side}-pa`), tone: 'muted', weight: 1.5, group: n('pans') },
      { kind: 'line', id: n(`${side}-s2`), from: n(side === 'l' ? 'beam-l' : 'beam-r'), to: n(`${side}-pb`), tone: 'muted', weight: 1.5, group: n('pans') },
      { kind: 'line', id: n(`${side}-pan`), from: n(`${side}-pa`), to: n(`${side}-pb`), tone: 'ink', weight: 4, group: n('pans') },
    );
    const count = side === 'l' ? o.left : o.right;
    for (let k = 0; k < count; k++) {
      const cx = ex + (k - (count - 1) / 2) * 0.6;
      const pts = ring(points, n(`${side}b${k}-`), [cx, panY + 0.3], 0.27, 16);
      items.push(
        { kind: 'region', id: n(`${side}b${k}`), points: pts, tone, shade: 0.5, group: n(`${side}bolts`) },
        { kind: 'curve', id: n(`${side}b${k}-e`), points: pts, closed: true, tone, weight: 2, group: n(`${side}bolts`) },
      );
    }
  }
  if (o.label) {
    points[n('label-at')] = [x0, y0 - 0.15];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, tone: 'ink', place: 'below' });
  }
  return { points, items };
}

/**
 * Bolts drawn as small circles, in groups side by side: `groups[i]` bolts in rows of `perRow`,
 * with the name `labels[i]` (TeX) under each group, `gap` apart (1.6 by default). `odd` picks out one bolt (its group and its
 * place in the group, from 0) in a second colour, for the light one.
 *
 * Parts: each group `g0`, `g1`… (a group: its bolts and its name), and `odd` (the picked-out bolt).
 */
export function boltGroups(o: { name?: string; groups: number[]; labels?: string[]; perRow?: number; gap?: number; odd?: [number, number]; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const per = o.perRow ?? 2;
  const step = 0.75;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = 0;
  o.groups.forEach((count, i) => {
    const rows = Math.ceil(count / per);
    for (let k = 0; k < count; k++) {
      const c: P = [x + (k % per) * step, (rows - 1 - Math.floor(k / per)) * step];
      const isOdd = o.odd && o.odd[0] === i && o.odd[1] === k;
      const pts = ring(points, n(`g${i}b${k}-`), c, 0.28, 18);
      const tone = o.tone ?? 'theta';
      items.push(
        { kind: 'region', id: n(`g${i}b${k}`), points: pts, tone, shade: 0.5, group: n(`g${i}`) },
        { kind: 'curve', id: n(`g${i}b${k}-e`), points: pts, closed: true, tone, weight: 2, group: n(`g${i}`) },
      );
      if (isOdd) {
        const pts2 = ring(points, n(`odd-`), c, 0.28, 18);
        items.push({ kind: 'region', id: n('odd'), points: pts2, tone: 'good', shade: 0.9 });
      }
    }
    const width = (Math.min(count, per) - 1) * step;
    if (o.labels?.[i]) {
      points[n(`g${i}-l`)] = [x + width / 2, -0.45];
      items.push({ kind: 'label', id: n(`g${i}-label`), at: n(`g${i}-l`), tex: o.labels[i], tone: 'ink', place: 'below', group: n(`g${i}`) });
    }
    x += width + (o.gap ?? 1.6);
  });
  return { points, items };
}

/**
 * A row of boxes numbered `from` to `to` (the counters left in a take-away game), with a letter
 * under each box listed in `marks`: W (green) when the player about to move can win, and L (red,
 * with the box shaded) when they lose against good play.
 *
 * Parts: `boxes` (a group: the outlines and numbers) and each mark `m<k>` (a group: the letter, and
 * the shading for an L).
 */
export function positionRow(o: { name?: string; from: number; to: number; marks: Record<number, 'W' | 'L'> }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = o.from; k <= o.to; k++) {
    const x = k - o.from;
    const mark = o.marks[k];
    if (mark === 'L') items.push({ kind: 'region', id: n(`s${k}`), points: rect(points, n(`S${k}-`), x + 0.06, 0.06, x + 0.94, 0.94), tone: 'bad', shade: 0.35, group: n(`m${k}`) });
    items.push({ kind: 'curve', id: n(`box${k}`), points: rect(points, n(`B${k}-`), x + 0.06, 0.06, x + 0.94, 0.94), closed: true, tone: 'muted', weight: 2, group: n('boxes') });
    points[n(`t${k}`)] = [x + 0.5, 0.5];
    items.push({ kind: 'label', id: n(`num${k}`), at: n(`t${k}`), tex: String(k), tone: 'ink', place: 'center', group: n('boxes') });
    if (mark) {
      points[n(`w${k}`)] = [x + 0.5, -0.05];
      items.push({ kind: 'label', id: n(`mark${k}`), at: n(`w${k}`), tex: `\\text{${mark}}`, tone: mark === 'W' ? 'good' : 'bad', place: 'below', group: n(`m${k}`) });
    }
  }
  return { points, items };
}

/**
 * A tic-tac-toe board with its bottom left corner at `at`, cells 1 unit square, cell [r, c] in row
 * r and column c from the top left (from 0). Each mark is an X (blue) or an O (orange), unless it
 * sets its own tone. Each line runs through the middles of three cells, from cell `from` to cell
 * `to`, a little past each end. `label` (TeX) sits under the board.
 *
 * Parts: `grid` (a group: the four lines, and the label), each mark by its id (a group), and each
 * line by its id.
 */
export function ticTacToe(o: { name?: string; at?: P; label?: string; marks: { id: string; cell: [number, number]; who: 'X' | 'O'; tone?: DiagramTone }[]; lines?: { id: string; from: [number, number]; to: [number, number]; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const mid = ([r, c]: [number, number]): P => [x0 + c + 0.5, y0 + 2.5 - r];
  for (let k = 1; k <= 2; k++) {
    Object.assign(points, { [n(`v${k}a`)]: [x0 + k, y0], [n(`v${k}b`)]: [x0 + k, y0 + 3], [n(`h${k}a`)]: [x0, y0 + k], [n(`h${k}b`)]: [x0 + 3, y0 + k] });
    items.push(
      { kind: 'line', id: n(`gv${k}`), from: n(`v${k}a`), to: n(`v${k}b`), tone: 'muted', weight: 3, group: n('grid') },
      { kind: 'line', id: n(`gh${k}`), from: n(`h${k}a`), to: n(`h${k}b`), tone: 'muted', weight: 3, group: n('grid') },
    );
  }
  if (o.label) {
    points[n('label-at')] = [x0 + 1.5, y0 - 0.15];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, tone: 'ink', place: 'below', group: n('grid') });
  }
  for (const m of o.marks) {
    const [cx, cy] = mid(m.cell);
    const s = 0.27;
    if (m.who === 'X') {
      const tone = m.tone ?? 'adj';
      Object.assign(points, { [n(`${m.id}-a`)]: [cx - s, cy - s], [n(`${m.id}-b`)]: [cx + s, cy + s], [n(`${m.id}-c`)]: [cx - s, cy + s], [n(`${m.id}-d`)]: [cx + s, cy - s] });
      items.push(
        { kind: 'line', id: n(`${m.id}-1`), from: n(`${m.id}-a`), to: n(`${m.id}-b`), tone, weight: 5, group: n(m.id) },
        { kind: 'line', id: n(`${m.id}-2`), from: n(`${m.id}-c`), to: n(`${m.id}-d`), tone, weight: 5, group: n(m.id) },
      );
    } else {
      items.push({ kind: 'curve', id: n(`${m.id}-o`), points: ring(points, n(`${m.id}-`), [cx, cy], 0.3, 32), closed: true, tone: m.tone ?? 'opp', weight: 5, group: n(m.id) });
    }
  }
  for (const l of o.lines ?? []) {
    const [a, b] = [mid(l.from), mid(l.to)];
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    const len = Math.hypot(dx, dy);
    const [ux, uy] = [(dx / len) * 0.35, (dy / len) * 0.35];
    Object.assign(points, { [n(`${l.id}-a`)]: [a[0] - ux, a[1] - uy], [n(`${l.id}-b`)]: [b[0] + ux, b[1] + uy] });
    items.push({ kind: 'line', id: n(l.id), from: n(`${l.id}-a`), to: n(`${l.id}-b`), tone: l.tone ?? 'good', weight: 4, dashed: true });
  }
  return { points, items };
}
