/**
 * Figures for the linear relations videos, built only from standard diagram parts, so each goes
 * into a diagram with `figure`:
 *
 * - `edgeNumbers`: axis numbers along the bottom and left edges of a plane's grid, for a plane
 *   drawn with `every: 0`. A grid that reaches into negative numbers puts its axes in the middle,
 *   where the numbers would sit on the lines being graphed; along the edges they stay clear.
 *
 * Planes, points and lines come from `src/video/graph.ts`; tables of values, guides and tags from
 * the Grade 5 helpers (`m5-11-figures.ts`); toothpicks, plants, candles and function machines from
 * the Grade 6 to 8 helpers.
 */
import type { DiagramItem } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** The numbers from `from` to `to` in steps of `step`. */
const range = (from: number, to: number, step: number): number[] => {
  const list: number[] = [];
  for (let k = Math.ceil(from / step - 1e-9); k * step <= to + 1e-9; k++) list.push(Number((k * step).toFixed(6)));
  return list;
};

/**
 * Numbers every `xStep` along the plane's bottom edge and every `yStep` up its left edge, in the
 * plane's `axes` group, so showing `<fig>.axes` shows them. Parts: `ex<i>` and `ey<j>`.
 */
export function edgeNumbers(g: Plane, xStep = 1, yStep = xStep): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  range(g.x[0], g.x[1], xStep).forEach((x, i) => {
    const id = g.n(`ex${i}`);
    const [px, py] = g.map(x, g.y[0]);
    points[id] = [px, py - 0.05];
    items.push({ kind: 'label', id, at: id, tex: String(x), tone: 'muted', place: 'below', group: g.n('axes') });
  });
  range(g.y[0], g.y[1], yStep).forEach((y, j) => {
    const id = g.n(`ey${j}`);
    const [px, py] = g.map(g.x[0], y);
    points[id] = [px - 0.05, py];
    items.push({ kind: 'label', id, at: id, tex: String(y), tone: 'muted', place: 'left', group: g.n('axes') });
  });
  return { points, items };
}
