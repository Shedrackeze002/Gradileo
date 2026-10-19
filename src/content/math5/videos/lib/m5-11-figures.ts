/**
 * Helpers for the arithmetic-sequence videos, built only from standard diagram parts and the graph
 * parts in `src/video/graph.ts`, so each goes into a diagram with `figure`:
 *
 * - `towers`: towers of stacked cups, a growing pattern, each with its number of cups below it.
 * - `seqPlane`: a first-quadrant grid for (position, term) points, with its axes named.
 * - `valueTable` (from the linear-relations videos): a position row over a term row, with arcs
 *   between neighbouring columns for the change from term to term.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import { plane, type Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

export { valueTable } from '@/content/math30-3/videos/lib/m303-5-graphs.ts';
export { guide, join, tag } from '@/content/math30-2/videos/lib/m302-5-graphs.ts';

type P = [number, number];

/**
 * Towers of cups standing side by side, `counts[i]` cups in tower i, each cup a little wider at
 * the top. Under each tower, its number of cups (`n<i>`) and its name (`name<i>`, "Tower 1").
 *
 * Parts: a group `tower<i>` for each tower's cups, and the labels `n<i>` and `name<i>`.
 */
export function towers(o: { counts: number[]; gap?: number; tone?: DiagramTone }): Part {
  const gap = o.gap ?? 2.2;
  const H = 0.55;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.counts.forEach((count, i) => {
    const cx = i * gap;
    for (let k = 0; k < count; k++) {
      const y = k * H;
      const corners: P[] = [[cx - 0.32, y], [cx + 0.32, y], [cx + 0.46, y + H], [cx - 0.46, y + H]];
      const names = corners.map((c, j) => {
        const name = `c${i}-${k}-${j}`;
        points[name] = c;
        return name;
      });
      items.push(
        { kind: 'region', id: `cup${i}-${k}`, points: names, tone: o.tone ?? 'hyp', shade: 0.35, group: `tower${i}` },
        { kind: 'curve', id: `cup${i}-${k}-edge`, points: names, closed: true, tone: o.tone ?? 'hyp', weight: 2.5, group: `tower${i}` },
      );
    }
    Object.assign(points, { [`n${i}-at`]: [cx, -0.15], [`name${i}-at`]: [cx, -1] });
    items.push(
      { kind: 'label', id: `n${i}`, at: `n${i}-at`, tex: String(count), place: 'below', tone: 'theta' },
      { kind: 'label', id: `name${i}`, at: `name${i}-at`, tex: `\\text{Tower ${i + 1}}`, place: 'below', tone: 'muted' },
    );
  });
  return { points, items };
}

/**
 * A grid for the points (position, term) of a sequence: positions 0 to `x` across, terms 0 to `y`
 * up with a grid line every `yStep`, numbered on its axes, with the axes named "Position" and
 * "Term". With `height`, the term axis is stretched or squeezed to that many position units.
 */
export function seqPlane(o: { name?: string; x: number; y: number; yStep?: number; height?: number }): Plane {
  return plane({
    name: o.name,
    x: [0, o.x],
    y: [0, o.y],
    yStep: o.yStep ?? 1,
    ...(o.height ? { width: o.x, height: o.height } : {}),
    titles: { x: '\\text{Position}', y: '\\text{Term}' },
  });
}

