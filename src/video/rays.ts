/**
 * The rays of a `rays` element (see RaysEl in script.ts): a ray of light meets a mirror or the
 * boundary between two materials. All angles are measured from the normal, in degrees. The
 * outgoing ray follows from the incoming one: at a mirror the two angles are equal, and at a
 * boundary sin r ÷ sin i = the second speed ÷ the first, which is what keeps each wavefront in
 * one piece as it crosses (the piece that has crossed travels at the new speed).
 */
import type { RaysEl } from './script.ts';

export interface RaysState {
  /** Seconds of the light's own time played so far (the wavefronts march with it). */
  time: number;
  /** The angle of incidence now. */
  angle: number;
  /** The angle of reflection or refraction now; at a boundary, null when no light can cross. */
  out: number | null;
  note?: string;
}

const RAD = Math.PI / 180;

/** The angle of refraction for an angle of incidence and the speeds before and after, or null when the ray cannot cross. */
export function refraction(angle: number, before: number, after: number): number | null {
  const sin = (Math.sin(angle * RAD) * after) / before;
  return sin > 1 ? null : Math.asin(sin) / RAD;
}

/** Where a phase has turned the ray to, part way through: it starts and stops gently. */
const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/**
 * The state of a rays element after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for (a clip not yet finished is the last one).
 */
export function raysAt(el: RaysEl, plays: Array<[clip: string, seconds: number]> = []): RaysState {
  let angle = el.angle;
  let time = 0;
  let note: string | undefined;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    note = undefined;
    for (const ph of clip.phases) {
      if (left < 0) break;
      const slow = ph.slow ?? 1;
      const video = ph.dur * slow;
      const run = Math.min(left, video);
      time += run / slow;
      if (ph.to !== undefined) angle += (ph.to - angle) * ease(run / video);
      // The note of the phase that is playing; it goes when the clip has finished.
      note = left < video ? ph.note : undefined;
      left -= video;
    }
  }
  const out = el.surface === 'mirror' ? angle : refraction(angle, el.speeds![0], el.speeds![1]);
  return { time, angle, out, note };
}

/** A piece of a wavefront, as two points; x is along the surface and y is up from it, from the point the ray meets it. */
export type Piece = [x1: number, y1: number, x2: number, y2: number];

/**
 * The wavefronts of a beam of the given width that meets the surface at the origin: the pieces
 * still coming in, and the pieces that have left (reflected, or refracted into the second
 * material). `gap` is the distance between fronts before the surface, `ratio` the second speed ÷
 * the first (1 at a mirror), `shift` how far the fronts have marched (in gaps), and `reach` how far
 * from the origin they are drawn. Each front stays in one piece across the surface.
 */
export function fronts(angle: number, out: number | null, mirror: boolean, width: number, gap: number, ratio: number, shift: number, reach: number): { incoming: Piece[]; outgoing: Piece[] } {
  const i = angle * RAD;
  const [si, ci] = [Math.sin(i), Math.cos(i)];
  const half = width / 2;
  const incoming: Piece[] = [];
  const outgoing: Piece[] = [];
  const frac = shift - Math.floor(shift);
  const reflects = mirror || out === null;
  const r = (reflects ? angle : out!) * RAD;
  const [sr, cr] = [Math.sin(r), Math.cos(r)];
  const k = reflects ? 1 : ratio;
  // The beam is as wide after the surface as the stretch of surface it lights allows.
  const halfOut = reflects ? half : (half * cr) / ci;
  // A front is followed from where the beam starts to where its last piece leaves the picture.
  const far = Math.max(reach + half * (si / ci), reach / k);
  for (let n = Math.floor(-(reach + half * (si / ci)) / gap) - 1; n * gap <= far; n++) {
    // How far this front is along the incoming ray: negative before it reaches the origin.
    const a = (n + frac) * gap;
    if (a >= -reach) {
      // Coming in: the travel is along (sin i, −cos i), and the front lies along (cos i, sin i).
      const lo = si > 1e-9 ? Math.max(-half, (a * ci) / si) : a <= 0 ? -half : half;
      if (lo < half) incoming.push([a * si + lo * ci, -a * ci + lo * si, a * si + half * ci, -a * ci + half * si]);
    }
    const b = a * k;
    if (b > reach) continue;
    if (reflects) {
      // Reflected: the travel is along (sin i, cos i), and the front lies along (cos i, −sin i).
      const hi = si > 1e-9 ? Math.min(half, (b * ci) / si) : b >= 0 ? half : -half;
      if (hi > -half) outgoing.push([b * si - half * ci, b * ci + half * si, b * si + hi * ci, b * ci - hi * si]);
    } else {
      // Refracted: the travel is along (sin r, −cos r), and the front lies along (cos r, sin r).
      const hi = sr > 1e-9 ? Math.min(halfOut, (b * cr) / sr) : b >= 0 ? halfOut : -halfOut;
      if (hi > -halfOut) outgoing.push([b * sr - halfOut * cr, -b * cr - halfOut * sr, b * sr + hi * cr, -b * cr + hi * sr]);
    }
  }
  return { incoming, outgoing };
}
