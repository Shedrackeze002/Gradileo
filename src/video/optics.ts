/**
 * The images of an `optics` element (see OpticsEl in script.ts): a curved mirror or a thin lens,
 * an object that stands on the principal axis, and the rays that find its image.
 *
 * Everything follows from one rule for a ray near the axis. A ray that meets the mirror or lens
 * at a height y, climbing by s for each unit it travels, leaves climbing by s − y ÷ f, where f is
 * the focal length with its sign (positive for a concave mirror or a converging lens). The three
 * rays of a ray diagram, the mirror equation 1 ÷ f = 1 ÷ do + 1 ÷ di and the magnification
 * m = −di ÷ do are all that rule. A mirror folds the path back, so its outgoing rays travel
 * towards the object's side; a lens lets them through.
 */
import type { OpticsEl } from './script.ts';

/** The clips played so far, in order, each with the seconds of video it has run for. */
export type Plays = Array<[clip: string, seconds: number]>;

export const isMirror = (el: OpticsEl) => el.device === 'concave' || el.device === 'convex';

/** The focal length with its sign: positive for a concave mirror or a converging lens, negative for a convex mirror or a diverging lens. */
export const focalOf = (el: OpticsEl) => (el.device === 'concave' || el.device === 'converging' ? el.f : -el.f);

export interface OpticsImage {
  /** The image distance, with its sign (positive for a real image), or null when the rays leave parallel and there is no image. */
  di: number | null;
  /** The magnification, with its sign (positive for an upright image). */
  m: number | null;
  /** The height of the image, with its sign. */
  hi: number | null;
  real: boolean;
  upright: boolean;
  /** How the image compares with the object. */
  size: 'larger' | 'smaller' | 'same' | null;
}

/** The image of an object `at` a distance from a mirror or lens of focal length `f` (with its sign). */
export function imageAt(f: number, at: number, height = 1): OpticsImage {
  if (Math.abs(at - f) < 1e-9 * Math.max(1, Math.abs(f))) return { di: null, m: null, hi: null, real: false, upright: false, size: null };
  const di = (f * at) / (at - f);
  const m = -di / at;
  const big = Math.abs(m);
  return { di, m, hi: m * height, real: di > 0, upright: m > 0, size: Math.abs(big - 1) < 1e-6 ? 'same' : big > 1 ? 'larger' : 'smaller' };
}

/** The image in words, as the lessons describe it. */
export function describeImage(image: OpticsImage): string {
  if (image.di === null) return 'No image: the rays leave parallel';
  const size = image.size === 'same' ? 'the same size' : image.size!;
  return `${image.real ? 'Real' : 'Virtual'}, ${image.upright ? 'upright' : 'upside down'}, ${size}`;
}

export interface OpticsState {
  /** Seconds of video played so far: the light runs along the rays with it. */
  time: number;
  /** How far the object is from the mirror or lens now. */
  at: number;
}

/** Where a phase has slid the object to, part way through: it starts and stops gently. */
const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/** The state of an optics element after its clips. A phase with `to` slides the object to a new distance. */
export function opticsAt(el: OpticsEl, plays: Plays = []): OpticsState {
  let at = el.object?.at ?? 0;
  let time = 0;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      time += run;
      if (ph.to !== undefined) at += (ph.to - at) * ease(run / ph.dur);
      left -= ph.dur;
    }
  }
  return { time, at };
}

export type OpticsRayId = 'parallel' | 'focal' | 'central';

export interface OpticsRay {
  id: OpticsRayId | 'beam';
  /** Where the ray starts: how far in front of the mirror or lens, and how high. */
  from: [distance: number, height: number];
  /** The height at which it meets the mirror or lens. */
  y: number;
  /** How much it climbs for each unit it travels, before and after. */
  inSlope: number;
  outSlope: number;
  /** The point on the axis that the incoming ray is drawn through or towards (the focus, or the centre of curvature), as a distance in front; null for a ray that needs none. */
  through: number | null;
}

/**
 * The three rays from the top of an object that are easy to draw.
 * - `parallel` arrives parallel to the axis, and leaves through the focus (or as if from it).
 * - `focal` arrives through the focus (or heading for it), and leaves parallel to the axis.
 * - `central` meets a mirror along a line through its centre of curvature and comes back along
 *   its own path; through a lens it passes through the centre and carries straight on.
 * A ray that cannot be drawn is left out: the focal ray of an object at the focus, and the
 * central ray of an object at a mirror's centre of curvature.
 */
export function raysOf(el: OpticsEl, at: number, height: number): OpticsRay[] {
  const f = focalOf(el);
  const rays: OpticsRay[] = [];
  const add = (id: OpticsRayId, inSlope: number, through: number | null) => {
    const y = height + inSlope * at;
    rays.push({ id, from: [at, height], y: Math.abs(y) < 1e-12 ? 0 : y, inSlope, outSlope: inSlope - y / f, through });
  };
  const near = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b));
  add('parallel', 0, null);
  if (!near(at, f)) add('focal', -height / (at - f), f);
  if (isMirror(el)) {
    if (!near(at, 2 * f)) add('central', -height / (at - 2 * f), 2 * f);
  } else add('central', -height / at, null);
  return rays;
}

/** A beam of rays parallel to the axis, at the heights given: they leave through the focus, or as if from it. */
export function beamOf(el: OpticsEl, heights: number[], from: number): OpticsRay[] {
  const f = focalOf(el);
  return heights.map((y) => ({ id: 'beam' as const, from: [from, y] as [number, number], y, inSlope: 0, outSlope: y === 0 ? 0 : -y / f, through: null }));
}

/**
 * The height of an outgoing ray (or of the line it lies on) at a place: `x` is measured from the
 * mirror or lens, positive on the far side from the object. A mirror sends its rays back, so they
 * travel towards negative x.
 */
export const outgoingAt = (el: OpticsEl, ray: OpticsRay, x: number) => ray.y + ray.outSlope * (isMirror(el) ? -x : x);

/** Where the image stands, measured like `x` above: a mirror's real image is in front of it, and a lens's is beyond it. */
export const imagePlace = (el: OpticsEl, image: OpticsImage) => (image.di === null ? null : isMirror(el) ? -image.di : image.di);

/** How far a mirror's surface is from the flat line through its middle, at a height: towards the object for a concave mirror (negative), away for a convex one. Zero for a lens, which is drawn thin. */
export function sagOf(el: OpticsEl, y: number): number {
  if (!isMirror(el)) return 0;
  const R = 2 * el.f;
  const h = Math.min(Math.abs(y), R);
  const sag = R - Math.sqrt(R * R - h * h);
  return el.device === 'concave' ? -sag : sag;
}
