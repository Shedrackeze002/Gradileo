/**
 * Helpers for the exponent and logarithm videos (Unit 6 of this course). The graph helpers are
 * shared with the polynomial videos (`m302-5-graphs.ts`): graphs drawn with `every: 0` and
 * numbered along the bottom and left edges, so an exponential curve that hugs its asymptote, the
 * x-axis, never runs through the numbers.
 */
import { plane, plot, type Plane } from '@/video/graph.ts';
import type { DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { join, tag } from './m302-5-graphs.ts';

export { band, edgeNumbers, guide, hline, join, numbers, numTex, range, scatter, tag } from './m302-5-graphs.ts';
export { dots } from '@/video/graph.ts';
export { plane, plot };

/**
 * A model drawn solid over the range of its data (`from` to `to`) and dashed beyond it, to `end`:
 * the parts `id` (solid) and `id-ext` (dashed).
 */
export function model(g: Plane, o: { id: string; f: (x: number) => number; from: number; to: number; end: number; tone?: DiagramTone }): Part {
  return join([
    plot(g, { id: o.id, f: o.f, from: o.from, to: o.to, tone: o.tone ?? 'brand', samples: 200 }),
    plot(g, { id: `${o.id}-ext`, f: o.f, from: o.to, to: o.end, tone: o.tone ?? 'brand', dashed: true, samples: 120 }),
  ]);
}

/** A curve's name (TeX) beside the plane's point (x, y), in the curve's colour: the part `id`. */
export const name = (g: Plane, id: string, x: number, y: number, tex: string, place: 'left' | 'right' | 'above' | 'below' | 'above left' | 'above right' | 'below left' | 'below right', tone: DiagramTone = 'brand'): Part =>
  tag(g, id, x, y, tex, place, tone);
