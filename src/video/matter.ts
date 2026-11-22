/**
 * Matter as a wave (the `matter` element; src/video/stage/Matter.tsx draws it).
 *
 * De Broglie gave every moving particle a wavelength, λ = h ÷ p = h ÷ mv, with the lessons'
 * constants (h = 6.63 × 10⁻³⁴ J·s, an electron of 9.11 × 10⁻³¹ kg and 1.60 × 10⁻¹⁹ C). The
 * element has four pictures:
 *
 * - `wave`: a particle crosses the picture with its wave drawn to scale around it;
 * - `crystal`: electrons are fired at a crystal and come off most strongly where the rows of
 *   atoms, d apart, send waves that agree: d sin θ = nλ (Davisson and Germer);
 * - `rings`: electrons pass through a thin foil and land in rings on a screen, which shrink as
 *   the electrons are made faster (Thomson);
 * - `slits`: photons or electrons go through two slits one at a time, each lands as one dot, and
 *   the dots build up the fringes of an interference pattern.
 *
 * Where a particle lands is a matter of chance, so each particle draws its numbers from its own
 * place in a fixed sequence: the same particle lands in the same place in every frame.
 */
import type { MatterEl } from './script.ts';
import { ELECTRON, EV, PLANCK } from './photons.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

/** The mass of a proton, in kilograms. */
export const PROTON = 1.67e-27;

/** The mass, in kilograms, and the name of the particle that a picture shows. */
export const massOf = (body: MatterEl['body']): number => (body === undefined || body === 'electron' ? ELECTRON : body === 'proton' ? PROTON : body.mass);
export const nameOf = (body: MatterEl['body']): string => (body === undefined || body === 'electron' ? 'Electron' : body === 'proton' ? 'Proton' : body.name);

/** The de Broglie wavelength of a particle, in metres: h ÷ mv. */
export const deBroglie = (mass: number, speed: number) => PLANCK / (mass * speed);
/** The speed of a particle with the charge of an electron that has been accelerated from rest through a potential difference, in metres per second: eV = ½mv². */
export const speedFromVolts = (volts: number, mass = ELECTRON) => Math.sqrt((2 * EV * volts) / mass);
/** The momentum of a particle with a kinetic energy in joules: p = √(2 m Ek). */
export const momentumFromEnergy = (joules: number, mass = ELECTRON) => Math.sqrt(2 * mass * joules);
/** The wavelength, in nanometres, of an electron that has been accelerated through a potential difference (or has that many electronvolts of kinetic energy). */
export const electronNm = (volts: number) => (PLANCK / momentumFromEnergy(volts * EV)) * 1e9;

/** A number from 0 up to 1 that belongs to the nth particle: the same every time, and with no pattern from one particle to the next. */
export function chance(n: number, salt = 0): number {
  let t = (Math.imul(n | 0, 0x9e3779b1) + Math.imul((salt | 0) + 1, 0x85ebca6b)) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** A place chosen by a share u (0 to 1) of the area under a curve of brightness, which is given at evenly spaced places from `from` to `to`. */
function placeOf(u: number, total: number[], from: number, to: number): number {
  const want = u * total[total.length - 1];
  let [lo, hi] = [0, total.length - 1];
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (total[mid] <= want) lo = mid;
    else hi = mid;
  }
  const part = total[hi] > total[lo] ? (want - total[lo]) / (total[hi] - total[lo]) : 0;
  return from + ((lo + part) / (total.length - 1)) * (to - from);
}
const running = (bright: (x: number) => number, from: number, to: number, steps: number): number[] => {
  const total = [0];
  for (let i = 1; i <= steps; i++) total.push(total[i - 1] + bright(from + ((i - 0.5) / steps) * (to - from)));
  return total;
};

// ── Two slits, one particle at a time ────────────────────────────────────────────────────────

/** How far the pattern reaches each side of the centre, and how wide the band of fringes is, in fringe spacings. */
export const FRINGE_REACH = 5.5;
export const FRINGE_BAND = 3.1;

/** The brightness of the pattern at a place on the screen, in fringe spacings from the centre: bright where the two waves agree, dark where they cancel. */
export const fringe = (y: number) => Math.cos(Math.PI * y) ** 2 * Math.exp(-((y / FRINGE_BAND) ** 2));

const FRINGE_TOTAL = running(fringe, -FRINGE_REACH, FRINGE_REACH, 2200);

/** Where the nth particle lands, in fringe spacings from the centre: more often where the pattern is bright, and never where it is dark. */
export const landing = (n: number) => placeOf(chance(n, 1), FRINGE_TOTAL, -FRINGE_REACH, FRINGE_REACH);

/** The first `count` particles, counted into `bins` strips across the screen. */
export function tally(count: number, bins: number): number[] {
  const out = new Array<number>(bins).fill(0);
  for (let n = 1; n <= count; n++) out[Math.min(bins - 1, Math.floor(((landing(n) + FRINGE_REACH) / (2 * FRINGE_REACH)) * bins))]++;
  return out;
}

// ── Electrons and a crystal ──────────────────────────────────────────────────────────────────

/** The spacing of the rows of atoms on the face of Davisson and Germer's nickel crystal, in nanometres. */
export const NICKEL = 0.215;
const RAD = Math.PI / 180;

/** The angle, in degrees from the beam, at which a crystal with rows d apart sends back the nth strong beam of waves of a wavelength (both in nanometres): d sin θ = nλ. Undefined when there is none. */
export const strongAngle = (nm: number, d = NICKEL, n = 1): number | undefined => ((n * nm) / d <= 1 ? Math.asin((n * nm) / d) / RAD : undefined);

/** How strongly electrons come off a crystal at an angle from the beam: a low background that falls away, and a peak wherever d sin θ = nλ. */
export function comeOff(degrees: number, nm: number, d = NICKEL): number {
  let bright = 0.22 * Math.cos(degrees * RAD) ** 2 + 0.05;
  for (let n = 1; n <= 3; n++) {
    const at = strongAngle(nm, d, n);
    if (at !== undefined) bright += Math.exp(-(((degrees - at) / 5.5) ** 2)) / n;
  }
  return bright;
}

/** The angles between which a detector can swing, in degrees from the beam. */
export const SWING: [number, number] = [20, 80];

const offCache = new Map<string, number[]>();
/** The angle at which the nth electron comes off the crystal, in degrees from the beam. */
export function offAngle(n: number, nm: number, d = NICKEL): number {
  const key = `${nm.toFixed(4)}:${d}`;
  let total = offCache.get(key);
  if (!total) {
    total = running((a) => comeOff(a, nm, d), 8, 88, 320);
    if (offCache.size > 400) offCache.clear();
    offCache.set(key, total);
  }
  return placeOf(chance(n, 2), total, 8, 88);
}

// ── Rings from a foil ────────────────────────────────────────────────────────────────────────

/** The first rings of a metal foil whose atoms are packed as closely as they can be: how far out each lies, in step with 1 ÷ d for its planes of atoms, and the share of the scattered electrons that it takes. */
export const RINGS = [Math.sqrt(3), 2, Math.sqrt(8)];
const RING_SHARE = [0.4, 0.27, 0.18];

/** How far out the kth ring is, as a share of the radius of the screen: in step with the wavelength, so faster electrons make smaller rings. `spread` is the share for each nanometre. */
export const ringRadius = (nm: number, k: number, spread = 24) => spread * nm * RINGS[k];

/** Where the nth electron lands on the screen: how far out (as a share of the radius) and how far round (in radians). A few go straight through to the middle. */
export function ringLanding(n: number, nm: number, spread = 24): { r: number; turn: number } {
  const [pick, wobble, turn] = [chance(n, 3), chance(n, 4) + chance(n, 5) - 1, chance(n, 6) * 2 * Math.PI];
  let k = -1;
  for (let i = 0, sum = 0; i < RINGS.length; i++) if (pick >= sum && pick < (sum += RING_SHARE[i])) k = i;
  if (k < 0) return { r: 0.045 * Math.abs(wobble) + 0.01, turn };
  return { r: ringRadius(nm, k, spread) + 0.022 * wobble, turn };
}

// ── The state of a picture after its clips ───────────────────────────────────────────────────

/** One particle that has been sent: its number, when it left (in seconds of video), and the accelerating voltage at that moment. */
export interface MatterSent {
  n: number;
  at: number;
  volts: number;
}

export interface MatterState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** The speed of the particle now, in metres per second; the accelerating voltage; the particles sent each second; and the angle of the detector, in degrees. */
  speed: number;
  volts: number;
  rate: number;
  detector: number;
  /** The lowest and the highest angle that the detector has been to. */
  swept: [number, number];
  /** How far the particle of a `wave` picture has gone, in pixels of the picture, counting each crossing on from the last. */
  travel: number;
  /** Every particle sent so far, in order. */
  sent: MatterSent[];
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const STEP = 1 / 30;

/** How fast the particle of a `wave` picture crosses it, in pixels each second: faster for a greater speed, though not in proportion, so that a slow particle still moves. */
export const paceOf = (speed: number, first: number) => Math.max(60, Math.min(330, 150 * Math.sqrt(speed / first)));

/** The speed that a `wave` picture starts with: the one it is given, or the one that its accelerating voltage gives an electron. */
export const firstSpeed = (el: MatterEl) => el.speed ?? speedFromVolts(el.volts ?? 150, massOf(el.body));

/** The state of a matter element after its clips. A phase can slide the speed, the voltage, the rate and the detector to new values, gently. */
export function matterAt(el: MatterEl, plays: Plays = []): MatterState {
  const first = firstSpeed(el);
  const byVolts = el.speed === undefined;
  let [speed, volts, rate, detector] = [first, el.volts ?? 0, el.rate ?? 0, el.detector ?? SWING[0]];
  const swept: [number, number] = [detector, detector];
  let [time, travel, count] = [0, 0, 0.75];
  const sent: MatterSent[] = [];
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      const from = { speed, volts, rate, detector };
      const at = (t: number) => {
        const k = ease(t / ph.dur);
        const v = mix(from.volts, ph.volts ?? from.volts, k);
        return { volts: v, speed: byVolts && el.picture === 'wave' ? speedFromVolts(v, massOf(el.body)) : mix(from.speed, ph.speed ?? from.speed, k), rate: mix(from.rate, ph.rate ?? from.rate, k), detector: mix(from.detector, ph.detector ?? from.detector, k) };
      };
      for (let t0 = 0; t0 < run - 1e-9; t0 += STEP) {
        const dt = Math.min(STEP, run - t0);
        const now = at(t0);
        travel += paceOf(now.speed, first) * dt;
        const before = count;
        count += now.rate * dt;
        for (let n = Math.floor(before) + 1; n <= count; n++) sent.push({ n, at: time + t0 + (n - before) / now.rate, volts: now.volts });
        swept[0] = Math.min(swept[0], now.detector);
        swept[1] = Math.max(swept[1], now.detector);
      }
      ({ speed, volts, rate, detector } = at(run));
      swept[0] = Math.min(swept[0], detector);
      swept[1] = Math.max(swept[1], detector);
      time += run;
      left -= ph.dur;
    }
  }
  return { time, speed, volts, rate, detector, swept, travel, sent };
}
