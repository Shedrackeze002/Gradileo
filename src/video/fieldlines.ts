/**
 * Field lines between point sources (the charges of src/video/charges.ts, the poles of
 * src/video/magnets.ts), followed step by step along the field. They leave positive sources, evenly
 * spaced round each, as many as the source is strong; they end on negative sources or leave the
 * picture; and the lines that a negative source is still owed are followed backwards from it.
 */
type Point = [number, number];

/** A field line: its points, in the direction of the field, and the sources it leaves and ends on (by their place in the list), when it does. */
export interface FieldLine {
  points: Point[];
  from: number | null;
  to: number | null;
}

/** A source of field lines: where it is and how strong, with its sign. `turn` is the angle its first line leaves at, and `offset` moves every line round from there (so that none lies along the axis of a bar magnet). */
export interface LineSource {
  x: number;
  y: number;
  q: number;
  turn?: number;
  offset?: number;
}

/**
 * The lines of the sources in a view: `full` lines for a source of strength `top`, and in
 * proportion for a weaker one. `extra` is a field added to theirs everywhere (in the same units:
 * a strength of q at a distance r is q ÷ r²).
 */
export function linesBetween(sources: LineSource[], view: [number, number, number, number], full: number, top: number, extra?: (x: number, y: number) => Point): FieldLine[] {
  const [x0, x1, y0, y1] = view;
  const wide = x1 - x0;
  const [near, step, pad] = [wide * 0.02, wide / 500, wide * 0.05];
  const count = (q: number) => Math.round((full * Math.abs(q)) / top);
  const fieldAt = (x: number, y: number): Point => {
    let [ex, ey] = extra ? extra(x, y) : [0, 0];
    for (const o of sources) {
      const [dx, dy] = [x - o.x, y - o.y];
      const r = Math.hypot(dx, dy);
      if (r < 1e-12) continue;
      ex += (o.q * dx) / r ** 3;
      ey += (o.q * dy) / r ** 3;
    }
    return [ex, ey];
  };
  // Where the field is this weak beside the largest charge a picture's width away, it has no direction worth following (the point between two like charges).
  const faint = (1e-3 * top) / wide ** 2;
  const most = Math.ceil((3 * (wide + (y1 - y0))) / step);
  /** Follow the field from a point beside a charge, forwards or backwards, to another charge or out of the picture. */
  const follow = (home: number, angle: number, way: 1 | -1): { points: Point[]; end: number | null } => {
    // A line that sets off straight along an axis stays on it, so that one aimed at the point of no field between two like charges ends there and does not wander off to one side.
    const [c, s] = [Math.cos(angle), Math.sin(angle)].map((v) => (Math.abs(v) < 1e-12 ? 0 : v));
    let [x, y] = [sources[home].x + near * c, sources[home].y + near * s];
    const points: Point[] = [[x, y]];
    let [ux, uy] = [c, s];
    for (let n = 0; n < most; n++) {
      const [ex, ey] = fieldAt(x, y);
      const e = Math.hypot(ex, ey);
      // A field that turns right round within one step has passed through zero (the point between two like charges): the line ends there.
      if (e < faint || way * (ex * ux + ey * uy) < 0) break;
      [ux, uy] = [(way * ex) / e, (way * ey) / e];
      // The midpoint rule: the direction half a step on is the direction of the whole step.
      const [fx, fy] = fieldAt(x + (way * ex * step) / (2 * e), y + (way * ey * step) / (2 * e));
      const f = Math.hypot(fx, fy);
      if (f < faint) break;
      x += (way * fx * step) / f;
      y += (way * fy * step) / f;
      const end = sources.findIndex((o, i) => i !== home && Math.hypot(x - o.x, y - o.y) < near);
      if (end >= 0) {
        const o = sources[end];
        const r = Math.hypot(x - o.x, y - o.y) || 1;
        points.push([o.x + ((x - o.x) * near) / r, o.y + ((y - o.y) * near) / r]);
        return { points, end };
      }
      points.push([x, y]);
      if (x < x0 - pad || x > x1 + pad || y < y0 - pad || y > y1 + pad) break;
    }
    return { points, end: null };
  };
  const lines: FieldLine[] = [];
  const arrived = sources.map((): number[] => []);
  sources.forEach((o, i) => {
    if (o.q <= 0) return;
    const n = count(o.q);
    for (let j = 0; j < n; j++) {
      const { points, end } = follow(i, (o.turn ?? 0) + (o.offset ?? 0) + (2 * Math.PI * j) / n, 1);
      if (end !== null) arrived[end].push(Math.atan2(points[points.length - 1][1] - sources[end].y, points[points.length - 1][0] - sources[end].x));
      lines.push({ points, from: i, to: end });
    }
  });
  sources.forEach((o, i) => {
    if (o.q >= 0) return;
    const n = count(o.q);
    // Its places are the mirror image of those of a positive charge; each line that has arrived takes the nearest one that is free.
    const places = Array.from({ length: n }, (_, j) => (o.turn ?? 0) + Math.PI - (o.offset ?? 0) - (2 * Math.PI * j) / n);
    const free = new Set(places.map((_, j) => j));
    const apart = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
    for (const a of arrived[i]) {
      let best = -1;
      for (const j of free) if (best < 0 || apart(places[j], a) < apart(places[best], a)) best = j;
      if (best >= 0) free.delete(best);
    }
    for (const j of free) {
      const { points, end } = follow(i, places[j], -1);
      lines.push({ points: points.reverse(), from: end, to: i });
    }
  });
  return lines;
}
