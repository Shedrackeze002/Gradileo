/**
 * Curved tracks for a motion element (see MotionEl.path in script.ts): a hill through given
 * points, or the arc a pendulum swings along. A body's place on a track is its distance along it
 * in metres, and the track says where that is and how steep it is there. That is all the motion
 * needs: along a slope, gravity pulls with m × g × the sine of the slope's angle.
 */

/** A hill: the track passes smoothly through these points, in metres across and up, from left to right. */
export interface HillPath {
  points: Array<[x: number, y: number]>;
}

/** A pendulum: the length of its string in metres, and the largest angle of swing drawn, in degrees. */
export interface SwingPath {
  swing: { length: number; angle: number };
}

/** A curved track, with the gravitational field strength there in newtons per kilogram. */
export type MotionPath = (HillPath | SwingPath) & { g: number };

export interface TrackPoint {
  /** Metres across and up. */
  x: number;
  y: number;
  /** The sine and cosine of the slope's angle there: uphill to the right is a positive sine. */
  sin: number;
  cos: number;
}

export interface Track {
  /** The distances along the track at its two ends, in metres (a pendulum's bottom is 0). */
  start: number;
  end: number;
  /** The point at a distance along the track; past an end, the track carries on straight. */
  at(s: number): TrackPoint;
  /** Points along the track from end to end, for drawing it. */
  outline: Array<[x: number, y: number]>;
  /** A pendulum's pivot. */
  pivot?: [x: number, y: number];
}

/**
 * Samples of the curve between two of a hill's points: close enough together that the height lost
 * along the track and the pull along its slope agree, so energy is conserved to a ten-thousandth.
 */
const SAMPLES = 240;
/** Every this many samples is a point of the outline that is drawn. */
const DRAWN = 6;

/**
 * The slopes of a curve through the points that never overshoots them (a monotone cubic, after
 * Fritsch and Carlson): a hill's top and a valley's floor fall exactly on the points given, and a
 * flat stretch stays flat.
 */
function slopes(pts: Array<[number, number]>): number[] {
  const n = pts.length;
  const h = pts.slice(1).map((p, i) => p[0] - pts[i][0]);
  const d = pts.slice(1).map((p, i) => (p[1] - pts[i][1]) / h[i]);
  if (n === 2) return [d[0], d[0]];
  const end = (h0: number, h1: number, d0: number, d1: number) => {
    const m = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1);
    if (Math.sign(m) !== Math.sign(d0)) return 0;
    if (Math.sign(d0) !== Math.sign(d1) && Math.abs(m) > 3 * Math.abs(d0)) return 3 * d0;
    return m;
  };
  const m = [end(h[0], h[1], d[0], d[1])];
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) m.push(0);
    else {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      m.push((w1 + w2) / (w1 / d[i - 1] + w2 / d[i]));
    }
  }
  m.push(end(h[n - 2], h[n - 3], d[n - 2], d[n - 3]));
  return m;
}

function hill(points: Array<[number, number]>): Track {
  const m = slopes(points);
  // Closely spaced points of the curve, each with its slope and its distance along the track.
  const xs: number[] = [];
  const ys: number[] = [];
  const ms: number[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const h = x1 - x0;
    for (let k = i === 0 ? 0 : 1; k <= SAMPLES; k++) {
      const t = k / SAMPLES;
      const t2 = t * t;
      const t3 = t2 * t;
      xs.push(x0 + t * h);
      ys.push((2 * t3 - 3 * t2 + 1) * y0 + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * y1 + (t3 - t2) * h * m[i + 1]);
      ms.push(((6 * t2 - 6 * t) * y0) / h + (3 * t2 - 4 * t + 1) * m[i] + ((-6 * t2 + 6 * t) * y1) / h + (3 * t2 - 2 * t) * m[i + 1]);
    }
  }
  const ss = [0];
  for (let i = 1; i < xs.length; i++) ss.push(ss[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]));
  const length = ss[ss.length - 1];
  const point = (x: number, y: number, slope: number): TrackPoint => {
    const cos = 1 / Math.hypot(1, slope);
    return { x, y, sin: slope * cos, cos };
  };
  const last = xs.length - 1;
  return {
    start: 0,
    end: length,
    outline: xs.flatMap((x, i): Array<[number, number]> => (i % DRAWN === 0 || i === last ? [[x, ys[i]]] : [])),
    at(s) {
      // Past an end, the track carries on straight at the slope it had there.
      if (s <= 0) {
        const p = point(xs[0], ys[0], ms[0]);
        return { ...p, x: p.x + s * p.cos, y: p.y + s * p.sin };
      }
      if (s >= length) {
        const p = point(xs[last], ys[last], ms[last]);
        return { ...p, x: p.x + (s - length) * p.cos, y: p.y + (s - length) * p.sin };
      }
      let lo = 0;
      let hi = last;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (ss[mid] <= s) lo = mid;
        else hi = mid;
      }
      const t = (s - ss[lo]) / (ss[hi] - ss[lo]);
      return point(xs[lo] + t * (xs[hi] - xs[lo]), ys[lo] + t * (ys[hi] - ys[lo]), ms[lo] + t * (ms[hi] - ms[lo]));
    },
  };
}

function swing(length: number, angle: number): Track {
  const most = (angle * Math.PI) / 180;
  // The bob hangs under a pivot at (0, length): its lowest point is the origin.
  const at = (s: number): TrackPoint => {
    const a = s / length;
    return { x: length * Math.sin(a), y: length * (1 - Math.cos(a)), sin: Math.sin(a), cos: Math.cos(a) };
  };
  const steps = 64;
  return {
    start: -most * length,
    end: most * length,
    at,
    outline: Array.from({ length: steps + 1 }, (_, i) => {
      const p = at((-most + (2 * most * i) / steps) * length);
      return [p.x, p.y];
    }),
    pivot: [0, length],
  };
}

const tracks = new WeakMap<MotionPath, Track>();

/** The track a path describes (worked out once for each path). */
export function trackOf(path: MotionPath): Track {
  let t = tracks.get(path);
  if (!t) {
    t = 'swing' in path ? swing(path.swing.length, path.swing.angle) : hill(path.points);
    tracks.set(path, t);
  }
  return t;
}

/** What is wrong with a path, for the script check. */
export function checkPath(path: MotionPath): string[] {
  const problems: string[] = [];
  if (!(path.g > 0)) problems.push('the path needs g, the gravitational field strength, above zero.');
  if ('swing' in path) {
    if (!(path.swing.length > 0)) problems.push('a pendulum needs a length above zero.');
    if (!(path.swing.angle > 0 && path.swing.angle < 90)) problems.push('a pendulum swings through an angle between 0 and 90 degrees.');
  } else {
    if (path.points.length < 2) problems.push('a hill needs two points or more.');
    if (path.points.some((p, i) => i > 0 && p[0] <= path.points[i - 1][0])) problems.push('a hill’s points must run from left to right.');
  }
  return problems;
}
