/**
 * Light as a stream of photons (the `photons` element; src/video/stage/Photons.tsx draws it).
 *
 * The numbers are the lessons' own: h = 6.63 × 10⁻³⁴ J·s, c = 3.00 × 10⁸ m/s and
 * 1 eV = 1.60 × 10⁻¹⁹ J. A photon of wavelength λ carries E = hc ÷ λ.
 *
 * The light sends out its photons one by one, `rate` of them in each second of video, and a
 * clip can change the wavelength, the brightness and the voltage of a collecting plate as it
 * plays. With a metal, each photon that lands gives all of its energy to one electron: the
 * electron leaves only if hf is more than the work function W, and the fastest leave with
 * Ek max = hf − W (others lose some energy on the way out). In a tube, a collecting plate that
 * is negative by V volts slows each electron steadily, so an electron crosses only if its
 * kinetic energy is more than eV, and turns back otherwise. At the stopping voltage,
 * e V = Ek max, and none cross.
 */
import type { PhotonsEl } from './script.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

/** Planck's constant in joule seconds, the speed of light in metres per second, and one electronvolt in joules. */
export const PLANCK = 6.63e-34;
export const C = 3.0e8;
export const EV = 1.6e-19;
/** The mass of an electron, in kilograms. */
export const ELECTRON = 9.11e-31;

/** The frequency of light of a wavelength in nanometres, in hertz. */
export const hertzOf = (nm: number) => C / (nm * 1e-9);
/** The energy of one photon, in joules. */
export const photonJoules = (nm: number) => (PLANCK * C) / (nm * 1e-9);
/** The energy of one photon in electronvolts, to three figures, as a student would carry it into the next step. */
export const photonVolts = (nm: number) => Number((photonJoules(nm) / EV).toPrecision(3));
/** The photons that a beam of a given power gives out each second. */
export const photonsEachSecond = (watts: number, nm: number) => watts / photonJoules(nm);

/** The threshold of a metal with a work function in electronvolts: the lowest frequency, in hertz, and the longest wavelength, in nanometres, that free electrons. */
export const thresholdHertz = (work: number) => (work * EV) / PLANCK;
export const thresholdNm = (work: number) => ((PLANCK * C) / (work * EV)) * 1e9;

/** The greatest kinetic energy of the electrons that light of a wavelength frees from a metal, in electronvolts: hf − W, or zero when a photon has too little energy to free one. */
export const kineticMax = (work: number, nm: number) => Math.max(0, Math.round((photonVolts(nm) - work) * 1000) / 1000);

/** The speed of an electron with a kinetic energy in electronvolts, in metres per second. */
export const electronSpeed = (volts: number) => Math.sqrt((2 * volts * EV) / ELECTRON);

/**
 * The share of the greatest kinetic energy that each electron leaves with, in the order the
 * photons land: some electrons lose energy on the way out of the metal, and three in ten lose
 * none.
 */
export const SHARES = [1, 0.55, 0.8, 0.4, 1, 0.65, 0.9, 0.5, 1, 0.72];
export const shareOf = (n: number) => SHARES[(((n - 1) % SHARES.length) + SHARES.length) % SHARES.length];

/** Where along the face of the metal (or across the beam) the nth photon travels: a share from 0 to 1, spread evenly without a pattern that the eye can follow. */
export const spotOf = (n: number) => (n * 0.6180339887) % 1;

/** Of the electrons that a metal gives out, the share that reach a collecting plate that is negative by `volts`. */
export function collected(work: number, nm: number, volts: number): number {
  const most = kineticMax(work, nm);
  if (!(most > 0)) return 0;
  return SHARES.filter((share) => share * most > volts).length / SHARES.length;
}

/** One photon that the light has sent: its number, when it left (in seconds of video), and the light and the plate at that moment. */
export interface PhotonSent {
  n: number;
  at: number;
  nm: number;
  volts: number;
}

export interface PhotonsState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** The wavelength of the light now, in nanometres; the photons it sends each second; and the volts by which the collecting plate is negative. */
  nm: number;
  rate: number;
  volts: number;
  /** Every photon sent so far, in order. */
  sent: PhotonSent[];
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
/** The step of the count of photons, in seconds: the same grid whatever the frame, so a photon never moves between frames. */
const STEP = 1 / 30;

/** The state of a photons element after its clips. A phase can slide the wavelength, the brightness and the voltage to new values, gently. */
export function photonsAt(el: PhotonsEl, plays: Plays = []): PhotonsState {
  let [nm, rate, volts] = [el.nm, el.rate, el.tube?.volts ?? 0];
  let time = 0;
  // The first photon leaves a quarter of the way to the second one, so a picture is never empty for long.
  let count = 0.75;
  const sent: PhotonSent[] = [];
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      const from = { nm, rate, volts };
      const at = (t: number) => {
        const k = ease(t / ph.dur);
        return { nm: mix(from.nm, ph.nm ?? from.nm, k), rate: mix(from.rate, ph.rate ?? from.rate, k), volts: mix(from.volts, ph.volts ?? from.volts, k) };
      };
      for (let t0 = 0; t0 < run - 1e-9; t0 += STEP) {
        const dt = Math.min(STEP, run - t0);
        const now = at(t0);
        const before = count;
        count += now.rate * dt;
        // Each whole number that the count passes is a photon, which leaves part of the way through the step.
        for (let n = Math.floor(before) + 1; n <= count; n++) sent.push({ n, at: time + t0 + (n - before) / now.rate, nm: now.nm, volts: now.volts });
      }
      ({ nm, rate, volts } = at(run));
      time += run;
      left -= ph.dur;
    }
  }
  return { time, nm, rate, volts, sent };
}

/**
 * How fast an electron of one electronvolt crosses the gap between the plates: gaps in each
 * second. Speed goes with the square root of the kinetic energy, as ½mv² says.
 */
export const GAP_SPEED = 0.6;

export interface ElectronState {
  /** How far it is from the metal, as a share of the gap to the collecting plate. */
  x: number;
  /** Its velocity, in gaps each second (negative on the way back). */
  v: number;
  /** Whether it is still in flight, has reached the collecting plate, or has been turned back to the metal. */
  fate: 'flying' | 'collected' | 'returned';
}

/**
 * An electron that left the metal `t` seconds ago with a kinetic energy in electronvolts, on its
 * way to a plate that is negative by `volts`. The field between the plates is uniform, so the
 * electron loses speed steadily: v² = v₀² (1 − V x ÷ Ek).
 */
export function electronAt(kinetic: number, volts: number, t: number): ElectronState {
  const v0 = GAP_SPEED * Math.sqrt(kinetic);
  const flight = electronFlight(kinetic, volts);
  if (t >= flight.seconds) return flight.fate === 'collected' ? { x: 1, v: GAP_SPEED * Math.sqrt(Math.max(0, kinetic - volts)), fate: 'collected' } : { x: 0, v: -v0, fate: 'returned' };
  const a = (GAP_SPEED * GAP_SPEED * volts) / 2;
  return { x: v0 * t - (a * t * t) / 2, v: v0 - a * t, fate: 'flying' };
}

/**
 * How long an electron is in flight between the plates, in seconds, and how it ends: it reaches
 * the collecting plate only if its kinetic energy is more than eV, and otherwise it stops part
 * of the way across and falls back to the metal.
 */
export function electronFlight(kinetic: number, volts: number): { seconds: number; fate: 'collected' | 'returned' } {
  const v0 = GAP_SPEED * Math.sqrt(kinetic);
  const a = (GAP_SPEED * GAP_SPEED * volts) / 2;
  if (!(kinetic > volts + 1e-9)) return { seconds: (2 * v0) / a, fate: 'returned' };
  if (Math.abs(a) < 1e-9) return { seconds: 1 / v0, fate: 'collected' };
  return { seconds: (v0 - Math.sqrt(v0 * v0 - 2 * a)) / a, fate: 'collected' };
}
