/**
 * Helpers for the frequency and data videos, built only from standard diagram parts (lines,
 * shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `tallyChart`: a table with a row for each category, its tally marks (each mark a part, so they
 *   can appear one at a time) and its frequency.
 * - `answers`: a list of survey answers in columns, each with a line to cross it off.
 * - `dotPlot`: a number line with a stack of dots above each value.
 *
 * Bar graphs come from `barGraph` in `src/video/charts.ts`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const text = (s: string) => `\\text{${s}}`;

/**
 * A tally chart: a header row (`head`, three titles), then a row for each category with its name,
 * its tally marks and its frequency. Marks come in bundles of five: four upright and the fifth
 * across them.
 *
 * Parts: `frame` (a group: the lines and the titles), `name<i>` (in the group `names`), each mark
 * `m<i>-<k>` (in the group `tally<i>`), the frequency `f<i>` (in the group `freqs`), and a shaded
 * highlight of each row, `hl<i>`, shown on its own.
 */
export function tallyChart(o: { head: [string, string, string]; rows: { label: string; count: number }[]; widths?: [number, number, number] }): Part {
  const [w1, w2, w3] = o.widths ?? [3.2, 3.6, 3.4];
  const xs = [0, w1, w1 + w2, w1 + w2 + w3];
  const headH = 1.1;
  const rowH = 1.3;
  const top = headH + rowH * o.rows.length;
  const rowTop = (i: number) => top - headH - rowH * i;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const seg = (id: string, a: P, b: P, tone: DiagramTone, weight: number, group: string) => {
    Object.assign(points, { [`${id}a`]: a, [`${id}b`]: b });
    items.push({ kind: 'line', id, from: `${id}a`, to: `${id}b`, tone, weight, group });
  };
  // Row highlights first, so the lines and labels sit on top of them.
  o.rows.forEach((_, i) => {
    const [y1, y0] = [rowTop(i), rowTop(i) - rowH];
    const ids = [0, 1, 2, 3].map((k) => `hl${i}-${k}`);
    [[0, y0], [xs[3], y0], [xs[3], y1], [0, y1]].forEach((q, k) => (points[ids[k]] = q as P));
    items.push({ kind: 'region', id: `hl${i}`, points: ids, tone: 'theta', shade: 0.2 });
  });
  // The frame: the outline, the line under the titles, the lines between rows and between columns.
  seg('top', [0, top], [xs[3], top], 'ink', 2.5, 'frame');
  seg('bottom', [0, 0], [xs[3], 0], 'ink', 2.5, 'frame');
  seg('under', [0, top - headH], [xs[3], top - headH], 'ink', 2.5, 'frame');
  for (let i = 1; i < o.rows.length; i++) seg(`row${i}`, [0, rowTop(i)], [xs[3], rowTop(i)], 'muted', 1.5, 'frame');
  xs.forEach((x, k) => seg(`col${k}`, [x, 0], [x, top], k === 0 || k === 3 ? 'ink' : 'muted', k === 0 || k === 3 ? 2.5 : 1.5, 'frame'));
  o.head.forEach((h, k) => {
    points[`head${k}-at`] = [(xs[k] + xs[k + 1]) / 2, top - headH / 2];
    items.push({ kind: 'label', id: `head${k}`, at: `head${k}-at`, tex: text(h), tone: 'muted', place: 'center', group: 'frame' });
  });
  o.rows.forEach((r, i) => {
    const mid = rowTop(i) - rowH / 2;
    points[`name${i}-at`] = [w1 / 2, mid];
    points[`f${i}-at`] = [xs[2] + w3 / 2, mid];
    items.push(
      { kind: 'label', id: `name${i}`, at: `name${i}-at`, tex: text(r.label), place: 'center', group: 'names' },
      { kind: 'label', id: `f${i}`, at: `f${i}-at`, tex: String(r.count), tone: 'theta', place: 'center', group: 'freqs' },
    );
    const [y0, y1] = [mid - 0.38, mid + 0.38];
    for (let k = 0; k < r.count; k++) {
      const left = xs[1] + 0.45 + Math.floor(k / 5) * 1.6;
      const j = k % 5;
      const [a, b]: [P, P] = j < 4 ? [[left + 0.28 * j, y0], [left + 0.28 * j, y1]] : [[left - 0.15, y0 + 0.1], [left + 0.99, y1 - 0.1]];
      seg(`m${i}-${k}`, a, b, 'ink', 3, `tally${i}`);
    }
  });
  return { points, items };
}

/**
 * Survey answers in `cols` columns, read across the rows, each with a line through it to cross it
 * off. Parts: `w<k>` (in the group `words`) and `x<k>`, the line through answer k.
 */
export function answers(o: { words: string[]; cols: number; dx?: number; dy?: number }): Part {
  const dx = o.dx ?? 3.6;
  const dy = o.dy ?? 1.1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.words.forEach((word, k) => {
    const [x, y] = [(k % o.cols) * dx, -Math.floor(k / o.cols) * dy];
    // About half the word's width, in diagram units, for a line just longer than the word.
    const half = 0.17 * word.length + 0.25;
    Object.assign(points, { [`w${k}-at`]: [x, y], [`x${k}a`]: [x - half, y], [`x${k}b`]: [x + half, y] });
    items.push(
      { kind: 'label', id: `w${k}`, at: `w${k}-at`, tex: text(word), place: 'center', group: 'words' },
      { kind: 'line', id: `x${k}`, from: `x${k}a`, to: `x${k}b`, tone: 'bad', weight: 3 },
    );
  });
  return { points, items };
}

/**
 * A dot plot: a number line from `min` to `max` (whole numbers) with a stack of `counts[i]` dots
 * above the value `min + i`, and a `title` under the numbers.
 *
 * Parts: `axis` (a group: the line, its ticks, its numbers and the title), each stack `s<v>` (a
 * group of the dots above the value v, each a part `d<v>-<k>`), and the number under each stack,
 * `num<v>`, also in `axis`.
 */
export function dotPlot(o: { min: number; max: number; counts: number[]; title?: string; gap?: number }): Part {
  const gap = o.gap ?? 0.62;
  const points: Record<string, P> = { L: [o.min - 0.7, 0], R: [o.max + 0.7, 0] };
  const items: DiagramItem[] = [{ kind: 'line', id: 'line', from: 'L', to: 'R', weight: 2.5, group: 'axis' }];
  for (let v = o.min; v <= o.max; v++) {
    Object.assign(points, { [`t${v}a`]: [v, -0.15], [`t${v}b`]: [v, 0.15], [`num${v}-at`]: [v, -0.2] });
    items.push(
      { kind: 'line', id: `t${v}`, from: `t${v}a`, to: `t${v}b`, weight: 2.5, group: 'axis' },
      { kind: 'label', id: `num${v}`, at: `num${v}-at`, tex: String(v), place: 'below', group: 'axis' },
    );
    const count = o.counts[v - o.min] ?? 0;
    for (let k = 0; k < count; k++) {
      // A round dot, drawn as a shaded circle so it scales with the plot.
      const [cx, cy] = [v, 0.55 + gap * k];
      const ring = Array.from({ length: 20 }, (_, j) => {
        const name = `d${v}-${k}-${j}`;
        points[name] = [cx + 0.26 * Math.cos((j * Math.PI) / 10), cy + 0.26 * Math.sin((j * Math.PI) / 10)];
        return name;
      });
      items.push({ kind: 'region', id: `d${v}-${k}`, points: ring, tone: 'adj', shade: 0.9, group: `s${v}` });
    }
  }
  if (o.title) {
    points['title-at'] = [(o.min + o.max) / 2, -1.1];
    items.push({ kind: 'label', id: 'title', at: 'title-at', tex: text(o.title), tone: 'muted', place: 'below', group: 'axis' });
  }
  return { points, items };
}
