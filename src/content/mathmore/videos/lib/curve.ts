import type { Plane } from '@/video/graph.ts';
import { polyline } from '@/video/graph.ts';
import type { DiagramTone } from '@/video/script.ts';

/** A parametric curve on the plane, (x(t), y(t)) for t from t0 to t1, drawn as one part `id`. */
export function curve(g: Plane, o: { id: string; at: (t: number) => [number, number]; t0: number; t1: number; n?: number; tone?: DiagramTone; dashed?: boolean }) {
  const n = o.n ?? 72;
  const points = Array.from({ length: n + 1 }, (_, i) => o.at(o.t0 + ((o.t1 - o.t0) * i) / n));
  return polyline(g, { id: o.id, points, tone: o.tone, dashed: o.dashed });
}
