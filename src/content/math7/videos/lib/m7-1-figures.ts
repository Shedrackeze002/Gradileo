/**
 * Figures for the number relationships videos (Grade 7, unit 1), built only from standard diagram
 * parts (lines, curves, shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `spare`: counters left over after sharing, in a row in red, with a note under them.
 * - `carroll`: a Carroll diagram, a 2 by 2 grid that sorts numbers by two rules, each number its
 *   own part so it can be placed as the narrator sorts it.
 * - `tag`: a label (TeX) at a point.
 * - `ring`: a loop drawn round a stretch of a figure (to circle the last digits of a number).
 *
 * Counters in equal groups come from `dotGroups` (`src/content/math6/videos/lib/m6-4-figures.ts`),
 * place value charts and hundred grids from the Grade 5 helpers, long division from `decimalDivision`
 * (`m6-4-figures.ts`), and number lines, fraction strips, factor trees and Venn diagrams from
 * `src/video/numbers.ts`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle of radius r about c, added to `points`. */
function disc(points: Record<string, P>, key: string, c: P, r: number, steps = 16): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
}

/**
 * `count` counters in a row from `at` (the centre of the first), `gap` apart, in red, with `tex`
 * written under them: the counters left over after sharing into equal groups (the same size as the
 * dots of `dotGroups`).
 *
 * Parts: `spare` (a group: the counters `spare<k>` and the note `spare-note`).
 */
export function spare(o: { name?: string; count: number; at: P; gap?: number; tex?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const g = o.gap ?? 0.62;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.count; k++) {
    items.push({ kind: 'region', id: n(`spare${k}`), points: disc(points, n(`sp${k}-`), [o.at[0] + k * g, o.at[1]], 0.21), tone: o.tone ?? 'bad', shade: 0.9, group: n('spare') });
  }
  if (o.tex) {
    points[n('spare-at')] = [o.at[0] + ((o.count - 1) * g) / 2, o.at[1] - 0.35];
    items.push({ kind: 'label', id: n('spare-note'), at: n('spare-at'), tex: o.tex, tone: o.tone ?? 'bad', place: 'below', group: n('spare') });
  }
  return { points, items };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * A rounded loop from (x0, y0) to (x1, y1), to circle part of a figure (the last two digits of a
 * number). Part: its `id`.
 */
export function ring(id: string, x0: number, y0: number, x1: number, y1: number, o: { tone?: DiagramTone; r?: number; dashed?: boolean; group?: string } = {}): Part {
  const r = o.r ?? Math.min(0.35, (x1 - x0) / 2, (y1 - y0) / 2);
  const points: Record<string, P> = {};
  const names: string[] = [];
  const corners: [number, number, number][] = [
    [x1 - r, y1 - r, 0],
    [x0 + r, y1 - r, Math.PI / 2],
    [x0 + r, y0 + r, Math.PI],
    [x1 - r, y0 + r, (3 * Math.PI) / 2],
  ];
  corners.forEach(([cx, cy, from], k) => {
    for (let i = 0; i <= 6; i++) {
      const a = from + (Math.PI / 2) * (i / 6);
      points[`${id}-${k}-${i}`] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      names.push(`${id}-${k}-${i}`);
    }
  });
  return { points, items: [{ kind: 'curve', id, points: names, closed: true, tone: o.tone ?? 'theta', weight: 3, ...(o.dashed ? { dashed: true } : {}), ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * A Carroll diagram: two columns (a rule and its opposite, `cols`) and two rows (`rows`), with the
 * numbers of each section written in it, one part each. `cells[r][c]` lists the numbers of row r,
 * column c (TeX). The headings are blue across the top and orange down the side.
 *
 * Parts: `frame` (a group: the lines and headings), each number `n<r><c>-<k>` (in the group
 * `s<r><c>`, the section), and a shaded highlight `h<r><c>` for each section.
 */
export function carroll(o: { name?: string; cols: [string, string]; rows: [string, string]; cells: string[][][]; colW?: number; rowH?: number; headW?: number; headH?: number }): Part {
  const n = namer(o.name);
  const cw = o.colW ?? 4.6;
  const rh = o.rowH ?? 2.2;
  const hw = o.headW ?? 4.6;
  const hh = o.headH ?? 1.3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const xs = [0, hw, hw + cw, hw + 2 * cw];
  const ys = [0, -hh, -hh - rh, -hh - 2 * rh];
  const seg = (id: string, a: P, b: P, weight = 2) => {
    Object.assign(points, { [n(`${id}-a`)]: a, [n(`${id}-b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), tone: 'muted', weight, group: n('frame') });
  };
  // Section highlights first, so the lines and numbers are drawn over them.
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 2; c++) {
      const key = `${r}${c}`;
      Object.assign(points, { [n(`h${key}a`)]: [xs[c + 1], ys[r + 1]], [n(`h${key}b`)]: [xs[c + 2], ys[r + 1]], [n(`h${key}c`)]: [xs[c + 2], ys[r + 2]], [n(`h${key}d`)]: [xs[c + 1], ys[r + 2]] });
      items.push({ kind: 'region', id: n(`h${key}`), points: ['a', 'b', 'c', 'd'].map((k) => n(`h${key}${k}`)), tone: 'theta', shade: 0.16 });
    }
  seg('top', [hw, 0], [xs[3], 0]);
  seg('mid', [0, -hh], [xs[3], -hh], 3);
  seg('row', [0, ys[2]], [xs[3], ys[2]]);
  seg('bottom', [0, ys[3]], [xs[3], ys[3]]);
  seg('left', [0, -hh], [0, ys[3]]);
  seg('v1', [hw, 0], [hw, ys[3]], 3);
  seg('v2', [hw + cw, 0], [hw + cw, ys[3]]);
  seg('right', [xs[3], 0], [xs[3], ys[3]]);
  o.cols.forEach((t, c) => {
    points[n(`ch${c}`)] = [xs[c + 1] + cw / 2, -hh / 2];
    items.push({ kind: 'label', id: n(`ch${c}`), at: n(`ch${c}`), tex: t, tone: 'adj', place: 'center', group: n('frame') });
  });
  o.rows.forEach((t, r) => {
    points[n(`rh${r}`)] = [hw / 2, (ys[r + 1] + ys[r + 2]) / 2];
    items.push({ kind: 'label', id: n(`rh${r}`), at: n(`rh${r}`), tex: t, tone: 'opp', place: 'center', group: n('frame') });
  });
  o.cells.forEach((row, r) =>
    row.forEach((list, c) => {
      const k = list.length;
      list.forEach((tex, i) => {
        const id = `n${r}${c}-${i}`;
        points[n(id)] = [xs[c + 1] + (cw * (i + 1)) / (k + 1), (ys[r + 1] + ys[r + 2]) / 2];
        items.push({ kind: 'label', id: n(id), at: n(id), tex, tone: 'ink', place: 'center', group: n(`s${r}${c}`) });
      });
    }),
  );
  return { points, items };
}
