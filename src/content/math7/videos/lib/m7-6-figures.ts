/**
 * Figures for the expressions and equations videos. The pan balance and the chain of operations
 * come from the Math 5 helpers (`m5-7-figures.ts`), and the algebra tiles, bins of marbles, bar
 * models and labelled shapes from the Math 6 helpers (`m6-6-figures.ts`). This adds:
 *
 * - `tip`: a pan balance (made with `balance`) tipped down on its heavier side, for a step that
 *   was done to one side of an equation only.
 */
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/**
 * The balance `part` (made by `balance`, with the same `name`) tipped down on the side `down`:
 * the beam turns about the top of the stand, and each pan, with everything on it, moves down or up
 * with the end of its arm. `slope` is how far the beam drops for each unit along it.
 */
export function tip(part: Part, o: { name?: string; down: 'left' | 'right'; slope?: number }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  // The ground and the stand stay where they are; the words under the pans move with them.
  const fixed = new Set(['g0', 'g1', 'f0', 'f1', 'f2'].map(n));
  const beam = new Set(['b0', 'b1'].map(n));
  const arm = -part.points[n('lp0')][0];
  // A beam down on the left rises to the right.
  const t = (o.slope ?? 0.1) * (o.down === 'left' ? 1 : -1);
  const points: Record<string, P> = {};
  for (const [key, [x, y]] of Object.entries(part.points)) {
    if (fixed.has(key)) points[key] = [x, y];
    else if (beam.has(key)) points[key] = [x, y + t * x];
    else points[key] = [x, y + t * (x < 0 ? -arm : arm)];
  }
  return { points, items: part.items };
}
