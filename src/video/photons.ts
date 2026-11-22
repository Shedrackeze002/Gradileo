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
  /** In a Compton collision: the angle of scattering now, in degrees, and each collision so far with the angle it had. */
  angle: number;
  collisions: Array<{ at: number; angle: number }>;
}

/** In the picture of a Compton collision, an X-ray photon arrives every so many seconds, and meets the electron this long after it sets out. */
export const COLLIDE_EVERY = 4.6;
export const COLLIDE_LEAD = 2.2;

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
/** The step of the count of photons, in seconds: the same grid whatever the frame, so a photon never moves between frames. */
const STEP = 1 / 30;

/** The state of a photons element after its clips. A phase can slide the wavelength, the brightness and the voltage to new values, gently. */
export function photonsAt(el: PhotonsEl, plays: Plays = []): PhotonsState {
  let [nm, rate, volts, angle] = [el.nm, el.rate, el.tube?.volts ?? 0, el.compton?.angle ?? 0];
  const collisions: PhotonsState['collisions'] = [];
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
      const from = { nm, rate, volts, angle };
      const at = (t: number) => {
        const k = ease(t / ph.dur);
        return { nm: mix(from.nm, ph.nm ?? from.nm, k), rate: mix(from.rate, ph.rate ?? from.rate, k), volts: mix(from.volts, ph.volts ?? from.volts, k), angle: mix(from.angle, ph.angle ?? from.angle, k) };
      };
      for (let t0 = 0; t0 < run - 1e-9; t0 += STEP) {
        const dt = Math.min(STEP, run - t0);
        const now = at(t0);
        const before = count;
        count += now.rate * dt;
        // Each whole number that the count passes is a photon, which leaves part of the way through the step.
        for (let n = Math.floor(before) + 1; n <= count; n++) sent.push({ n, at: time + t0 + (n - before) / now.rate, nm: now.nm, volts: now.volts });
        if (el.compton) {
          // A collision that falls in this step keeps the angle of its moment.
          const meets = Math.ceil((time + t0 - COLLIDE_LEAD) / COLLIDE_EVERY - 1e-9) * COLLIDE_EVERY + COLLIDE_LEAD;
          if (meets >= COLLIDE_LEAD - 1e-9 && meets >= time + t0 - 1e-9 && meets < time + t0 + dt - 1e-9) collisions.push({ at: meets, angle: now.angle });
        }
      }
      ({ nm, rate, volts, angle } = at(run));
      time += run;
      left -= ph.dur;
    }
  }
  return { time, nm, rate, volts, sent, angle, collisions };
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

// ── The momentum of a photon ─────────────────────────────────────────────────────────────────

/** The momentum of one photon, in kilogram metres per second: h ÷ λ. */
export const photonMomentum = (nm: number) => PLANCK / (nm * 1e-9);

/** The force of a beam of light on a surface, in newtons: P ÷ c when the light is taken in, and twice that when it is sent straight back. */
export const lightForce = (watts: number, surface: 'black' | 'mirror') => ((surface === 'mirror' ? 2 : 1) * watts) / C;

/**
 * In the picture of the push of light, a lane runs from the lamp (0) to the far end (1). A
 * photon crosses it at LANE_SPEED lanes each second, the surface starts at LANE_START, and each
 * photon that it takes in adds KICK to its speed (a mirror, which sends the photon back, gains
 * twice as much). The kick is far larger than a real one, so that the push can be seen.
 */
export const LANE_SPEED = 0.45;
export const LANE_START = 0.5;
export const KICK = 7e-5;

export interface PushState {
  /** Where the surface is, and how fast it moves, in lanes and lanes each second. */
  x: number;
  v: number;
  /** The photons that have reached it: which, when and where. */
  hits: Array<{ n: number; at: number; x: number }>;
}

/** A surface on wheels and the photons that have reached it. Between two photons it rolls at a steady speed, so each meeting is found exactly. */
export function pushAt(state: PhotonsState, surface: 'black' | 'mirror'): PushState {
  let [x, v, t] = [LANE_START, 0, 0];
  const hits: PushState['hits'] = [];
  for (const ph of state.sent) {
    // The photon has gone LANE_SPEED (T − sent) when the surface is at x + v (T − t).
    const meets = (x - v * t + LANE_SPEED * ph.at) / (LANE_SPEED - v);
    if (meets > state.time) break;
    x += v * (meets - t);
    t = meets;
    v += KICK * (surface === 'mirror' ? 2 : 1);
    hits.push({ n: ph.n, at: meets, x });
  }
  return { x: x + v * (state.time - t), v, hits };
}

// ── The Compton effect ───────────────────────────────────────────────────────────────────────

const RAD = Math.PI / 180;

/** h ÷ mc for an electron, in picometres, as the lesson gives it. */
export const COMPTON = 2.43;

/** The change in the wavelength of a photon that an electron scatters through an angle, in picometres. */
export const comptonShift = (degrees: number) => COMPTON * (1 - Math.cos(degrees * RAD));

export interface Scatter {
  /** The wavelength of the photon afterwards, in picometres. */
  after: number;
  /** The momentum of the photon afterwards, and of the electron, as shares of the photon's momentum before. */
  photon: number;
  electron: number;
  /** The direction of the electron, in degrees from the line of the photon's arrival (negative: on the other side of it from the scattered photon). */
  electronAngle: number;
  /** The energy of the photon before and afterwards, and the kinetic energy of the electron, in electronvolts. */
  before: number;
  left: number;
  kinetic: number;
  /** The speed of the electron, as a share of the speed of light. */
  beta: number;
}

/** A photon of a wavelength in picometres, scattered through an angle by an electron at rest: energy and momentum are both conserved. */
export function scatterAt(pm: number, degrees: number): Scatter {
  const after = pm + comptonShift(degrees);
  const photon = pm / after;
  // The electron takes the momentum that the photon has lost: before = after, as vectors.
  const [ex, ey] = [1 - photon * Math.cos(degrees * RAD), -photon * Math.sin(degrees * RAD)];
  const electron = Math.hypot(ex, ey);
  const volts = (length: number) => (PLANCK * C) / (length * 1e-12) / EV;
  const [before, left] = [volts(pm), volts(after)];
  // Its speed is pc ÷ E, with its rest energy mc² = hc ÷ (h ÷ mc).
  const beta = (electron * before) / (before - left + volts(COMPTON));
  return { after, photon, electron, electronAngle: electron > 1e-12 ? Math.atan2(ey, ex) / RAD : 0, before, left, kinetic: before - left, beta };
}
