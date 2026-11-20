/**
 * Light as an electromagnetic wave (see LightEl in script.ts). One element is one of four pictures,
 * and each is a pure function of the clips and the seconds played, like the rest of the stage.
 *
 * A wave: a charge is driven up and down an aerial, and a wave of electric and magnetic fields
 * leaves it. A place along the path does what the aerial did the travel time ago, so a change of
 * frequency travels out with the wave, and since every wave crosses the picture at one speed, a
 * higher frequency is a shorter wavelength. A polarizing filter passes the part of the electric
 * field that is along its own direction.
 *
 * A spectrum: a pointer slides along the electromagnetic spectrum, from radio waves to gamma rays.
 *
 * A trip: a flash of light leaves a source, crosses a distance at 3.00 × 10⁸ m/s, and perhaps
 * comes back, while a clock runs.
 *
 * A spinning mirror: Michelson's measurement. Each time a face of the mirror is in place, a flash
 * leaves for a fixed mirror far away. When it returns the mirror has turned, and the flash reaches
 * the detector only if a face stands exactly where the first one was.
 */
import type { LightEl } from './script.ts';

/** The clips played so far, in order, each with the seconds of video it has run for. */
export type Plays = Array<[clip: string, seconds: number]>;

/** The speed of light in a vacuum, in metres per second, to the three figures the lessons use. */
export const C = 3.0e8;

/** Steps of the model for each second of video. */
const STEPS = 60;

// ── A wave from an aerial ─────────────────────────────────────────────────────────────────────

/** What the aerial was doing at one moment: the phase of its charge, how fully it is driven (0 to 1) and the angle of the filter, in degrees. */
export interface WaveSample {
  t: number;
  phase: number;
  amp: number;
  angle: number;
}

export interface LightWaveState {
  /** Seconds of video that clips have played for. */
  time: number;
  on: boolean;
  /** The frequency of the charge now, in cycles for each second of video. */
  hertz: number;
  amp: number;
  phase: number;
  /** The angle of the filter now, in degrees from upright. */
  angle: number;
  history: WaveSample[];
}

/** The seconds of video a charge takes to get going, or to stop. */
const RISE = 0.5;

/** The seconds of video the wave takes to cross the picture. */
export const crossOf = (el: LightEl) => el.wave?.cross ?? 3;

/** The wavelength at a frequency, as a share of the path across the picture. */
export const waveShare = (el: LightEl, hertz: number) => 1 / (crossOf(el) * hertz);

/** The state of a wave after its clips. A phase can start or stop the charge (at its start), and change its frequency or turn the filter (steadily, over the phase). */
export function lightWaveAt(el: LightEl, plays: Plays = []): LightWaveState {
  const w = el.wave!;
  const state: LightWaveState = { time: 0, on: w.on ?? true, hertz: w.hertz, amp: (w.on ?? true) ? 1 : 0, phase: 0, angle: w.filter?.angle ?? 0, history: [] };
  state.history.push({ t: 0, phase: 0, amp: state.amp, angle: state.angle });
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      if (ph.on !== undefined) state.on = ph.on;
      const [hertz0, angle0] = [state.hertz, state.angle];
      const played = Math.min(left, ph.dur);
      const steps = Math.max(1, Math.ceil(played * STEPS));
      const h = played / steps;
      for (let k = 0; k < steps; k++) {
        const share = Math.min(1, ((k + 1) * h) / ph.dur);
        if (ph.hertz !== undefined) state.hertz = hertz0 + (ph.hertz - hertz0) * share;
        if (ph.filter !== undefined) state.angle = angle0 + (ph.filter - angle0) * share;
        state.amp = state.on ? Math.min(1, state.amp + h / RISE) : Math.max(0, state.amp - h / RISE);
        state.phase += 2 * Math.PI * state.hertz * h;
        state.time += h;
        state.history.push({ t: state.time, phase: state.phase, amp: state.amp, angle: state.angle });
      }
      left -= ph.dur;
    }
  }
  return state;
}

/** What the aerial was doing at a time. Before the start, a wave that fills the picture was already running at its first frequency. */
export function sampleAt(el: LightEl, state: LightWaveState, t: number): WaveSample {
  const w = el.wave!;
  const first = state.history[0];
  if (t <= 0) return { t, phase: 2 * Math.PI * w.hertz * t, amp: w.full ? first.amp : 0, angle: first.angle };
  const hist = state.history;
  if (t >= hist[hist.length - 1].t) return hist[hist.length - 1];
  let [lo, hi] = [0, hist.length - 1];
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (hist[mid].t <= t) lo = mid;
    else hi = mid;
  }
  const [a, b] = [hist[lo], hist[hi]];
  const u = (t - a.t) / (b.t - a.t || 1);
  return { t, phase: a.phase + (b.phase - a.phase) * u, amp: a.amp + (b.amp - a.amp) * u, angle: a.angle + (b.angle - a.angle) * u };
}

/**
 * The two fields at a place along the path (0 at the aerial, 1 at the far end), each as
 * [up, towards you] and as a share of its greatest size. The magnetic field is the electric field
 * turned a quarter of a turn about the path, so the two are always at right angles and in step.
 */
export function fieldAt(el: LightEl, state: LightWaveState, x: number): { e: [number, number]; b: [number, number] } {
  const w = el.wave!;
  const cross = crossOf(el);
  const s = sampleAt(el, state, state.time - x * cross);
  const e0 = s.amp * Math.sin(s.phase);
  let e: [number, number] = [e0, 0];
  if (w.filter && x > w.filter.at) {
    // This part of the wave passed the filter a while ago, at the angle the filter had then.
    const theta = (sampleAt(el, state, state.time - (x - w.filter.at) * cross).angle * Math.PI) / 180;
    const along = e0 * Math.cos(theta);
    e = [along * Math.cos(theta), along * Math.sin(theta)];
  }
  return { e: [e[0] || 0, e[1] || 0], b: [-e[1] || 0, e[0] || 0] };
}

/** How far up its aerial the electron is, as a share of its swing. The field it sends out points the way it accelerates, which is back towards the middle. */
export const chargeAt = (state: LightWaveState) => -state.amp * Math.sin(state.phase) || 0;

/** The real frequency of the wave now, in hertz, and its real wavelength, in metres (with `real`). */
export const realHertz = (el: LightEl, state: LightWaveState) => ((el.wave?.real ?? 0) * state.hertz) / (el.wave?.hertz ?? 1);
export const realMetres = (el: LightEl, state: LightWaveState) => C / realHertz(el, state);

// ── The spectrum ──────────────────────────────────────────────────────────────────────────────

export interface Region {
  id: string;
  name: string;
  /** The shortest wavelength of the region, in metres. */
  down: number;
  made: string;
  use: string;
}

/** The seven regions of the spectrum, from the longest wavelength, with what makes each kind of wave and one use of it. */
export const REGIONS: Region[] = [
  { id: 'radio', name: 'Radio waves', down: 0.3, made: 'electrons driven along an aerial', use: 'radio and television' },
  { id: 'microwaves', name: 'Microwaves', down: 1e-3, made: 'special electronic tubes and circuits', use: 'mobile phones, radar and cooking' },
  { id: 'infrared', name: 'Infrared', down: 7e-7, made: 'warm objects', use: 'remote controls and thermal cameras' },
  { id: 'visible', name: 'Visible light', down: 4e-7, made: 'very hot objects, lamps and lasers', use: 'seeing' },
  { id: 'ultraviolet', name: 'Ultraviolet', down: 1e-8, made: 'the Sun and very hot objects', use: 'killing germs' },
  { id: 'xrays', name: 'X-rays', down: 1e-11, made: 'fast electrons stopped by a metal', use: 'images of bones' },
  { id: 'gamma', name: 'Gamma rays', down: 0, made: 'the nuclei of radioactive atoms', use: 'treating cancer' },
];

/** The ends of the spectrum as it is drawn, in metres: each step along it is ten times shorter. */
export const SPECTRUM: [number, number] = [1e4, 1e-13];

/** The region a wavelength is in. */
export const regionOf = (metres: number): Region => REGIONS.find((r) => metres > r.down) ?? REGIONS[REGIONS.length - 1];

/** How far along the drawn spectrum a wavelength is (0 at the long end, 1 at the short end). */
export const spectrumShare = (metres: number) => (Math.log10(SPECTRUM[0]) - Math.log10(metres)) / (Math.log10(SPECTRUM[0]) - Math.log10(SPECTRUM[1]));

/** The wave drawn over the spectrum is not to scale: its wavelength on the picture, in pixels, runs from 300 at the long end to 14 at the short end. It moves along at one speed, in pixels for each second of video. */
export const samplePixels = (metres: number) => 300 * (14 / 300) ** spectrumShare(metres);
export const SAMPLE_SPEED = 180;

/** The state of a spectrum after its clips: the wavelength at the pointer, in metres, the seconds of video played, and the cycles of the wave over it that have passed a fixed place. */
export function spectrumAt(el: LightEl, plays: Plays = []): { metres: number; time: number; cycles: number } {
  let metres = el.spectrum!.at;
  let time = 0;
  let cycles = 0;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const played = Math.min(left, ph.dur);
      const from = metres;
      const steps = Math.max(1, Math.ceil(played * STEPS));
      const h = played / steps;
      for (let k = 0; k < steps; k++) {
        if (ph.to !== undefined) metres = from * (ph.to / from) ** Math.min(1, ((k + 1) * h) / ph.dur);
        cycles += (SAMPLE_SPEED / samplePixels(metres)) * h;
      }
      time += played;
      left -= ph.dur;
    }
  }
  return { metres, time, cycles };
}

/** The colour of visible light of a wavelength, in nanometres, as [red, green, blue] from 0 to 255 (white outside 380 nm to 750 nm). */
export function visibleColour(nm: number): [number, number, number] {
  let [r, g, b] = [1, 1, 1];
  if (nm >= 380 && nm < 440) [r, g, b] = [(440 - nm) / 60, 0, 1];
  else if (nm >= 440 && nm < 490) [r, g, b] = [0, (nm - 440) / 50, 1];
  else if (nm >= 490 && nm < 510) [r, g, b] = [0, 1, (510 - nm) / 20];
  else if (nm >= 510 && nm < 580) [r, g, b] = [(nm - 510) / 70, 1, 0];
  else if (nm >= 580 && nm < 645) [r, g, b] = [1, (645 - nm) / 65, 0];
  else if (nm >= 645 && nm <= 750) [r, g, b] = [1, 0, 0];
  // On a dark stage a pure colour is hard to read, so each is lifted a little towards white.
  const lift = (v: number) => Math.round(255 * (0.22 + 0.78 * v));
  return [lift(r), lift(g), lift(b)];
}

// ── A trip ────────────────────────────────────────────────────────────────────────────────────

export interface TripState {
  /** Seconds of the model that have passed while clips played. */
  time: number;
  /** When the flash left, in seconds of the model (null before one is sent). */
  left: number | null;
  /** How far the flash has travelled, in metres, and how far from the source it is now. */
  covered: number;
  out: number;
  /** The clock: seconds since the flash left. It stops when the flash arrives (or is back). */
  clock: number;
  /** Whether the flash is on its way back, and whether its trip is over. */
  back: boolean;
  done: boolean;
}

/** The whole distance the flash travels: there, or there and back. */
export const tripMetres = (el: LightEl) => el.trip!.metres * (el.trip!.echo ? 2 : 1);

/** Seconds of the model for each second of video: one way takes 2.5 seconds of video unless a rate is given. */
export const tripRate = (el: LightEl) => el.rate ?? el.trip!.metres / C / 2.5;

/** The state of a trip after its clips. A phase with `send` sends a flash as it starts. */
export function tripAt(el: LightEl, plays: Plays = []): TripState {
  const rate = tripRate(el);
  let time = 0;
  let left: number | null = null;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let rest = seconds;
    for (const ph of clip.phases) {
      if (rest <= 0) break;
      if (ph.send) left = time;
      time += Math.min(rest, ph.dur) * rate;
      rest -= ph.dur;
    }
  }
  const total = tripMetres(el);
  const covered = left === null ? 0 : Math.min(total, C * (time - left));
  const metres = el.trip!.metres;
  return { time, left, covered, out: covered <= metres ? covered : 2 * metres - covered, clock: covered / C, back: covered > metres, done: left !== null && covered >= total };
}

// ── A spinning mirror ─────────────────────────────────────────────────────────────────────────

export interface SpinFlash {
  /** When the flash left the mirror and when it is back, in seconds of the model. */
  left: number;
  back: number;
  /** The angle the mirror had turned to when the flash left, in radians. */
  from: number;
  /** Once it is back: how far the face that meets it is from where the first face stood, in radians (null while it is on its way). */
  tilt: number | null;
}

export interface SpinState {
  /** Seconds of the model that have passed while clips played. */
  time: number;
  /** The turns the mirror makes each second now, and the angle it has turned through, in radians. */
  hertz: number;
  angle: number;
  /** The mirror is at rest with a face in place, so the light is a steady beam that reaches the detector. */
  steady: boolean;
  /** When the mirror came to rest with a face in place, in seconds of the model (null while it turns): the beam grows from then. */
  since: number | null;
  /** The flashes on their way, and those that came back a short while ago. */
  flashes: SpinFlash[];
  /** How many flashes have left, and how many have reached the detector. */
  sent: number;
  seen: number;
  /** When a flash last reached the detector, in seconds of the model (null if none has). */
  hit: number | null;
}

/** The faces of the mirror, and the angle from one face to the next, in radians. */
export const FACES = 8;
export const FACE = (2 * Math.PI) / FACES;

/** The time light takes to reach the fixed mirror and come back, in seconds. */
export const roundTrip = (el: LightEl) => (2 * el.spin!.metres) / C;

/** The share of a whole turn the mirror makes during one round trip of the light, at a rate of turning. */
export const turnInTrip = (el: LightEl, hertz: number) => hertz * roundTrip(el);

/** The lowest rate of turning, in turns each second, at which the next face is in place when the light is back. */
export const firstRate = (el: LightEl) => 1 / (FACES * roundTrip(el));

/** Seconds of the model for each second of video: a round trip takes 2.5 seconds of video unless a rate is given. */
export const spinRate = (el: LightEl) => el.rate ?? roundTrip(el) / 2.5;

/** How near its place a face must be for the flash to reach the detector, in radians (about half a degree). */
export const TOLERANCE = 0.009;

/** An angle brought to within half a face either side of zero. */
export function tiltOf(angle: number): number {
  const t = angle - FACE * Math.round(angle / FACE);
  return Math.abs(t) < 1e-12 ? 0 : t;
}

/** The state of a spinning mirror after its clips. A phase with `hertz` brings the mirror steadily to that rate of turning. */
export function spinAt(el: LightEl, plays: Plays = []): SpinState {
  const rate = spinRate(el);
  const face = FACE;
  const trip = roundTrip(el);
  const state: SpinState = { time: 0, hertz: el.spin!.hertz ?? 0, angle: 0, steady: false, since: null, flashes: [], sent: 0, seen: 0, hit: null };
  if (state.hertz === 0) state.since = 0;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const hertz0 = state.hertz;
      const played = Math.min(left, ph.dur);
      const steps = Math.max(1, Math.ceil(played * STEPS));
      const h = (played / steps) * rate;
      for (let k = 0; k < steps; k++) {
        const before = state.hertz;
        if (ph.hertz !== undefined) state.hertz = hertz0 + (ph.hertz - hertz0) * Math.min(1, ((k + 1) * h) / rate / ph.dur);
        const [t0, a0] = [state.time, state.angle];
        const a1 = a0 + 2 * Math.PI * ((before + state.hertz) / 2) * h;
        const angleAt = (t: number) => a0 + ((a1 - a0) * (t - t0)) / h;
        // A flash leaves each time a face comes into place.
        for (let m = Math.floor(a0 / face + 1e-9) + 1; m * face <= a1; m++) {
          const t = t0 + ((m * face - a0) / (a1 - a0)) * h;
          state.flashes.push({ left: t, back: t + trip, from: m * face, tilt: null });
          state.sent++;
        }
        // A flash that is back meets whichever face is nearest to where the first one stood.
        for (const flash of state.flashes) {
          if (flash.tilt !== null || flash.back > t0 + h) continue;
          flash.tilt = tiltOf(angleAt(flash.back) - flash.from);
          if (Math.abs(flash.tilt) < TOLERANCE) {
            state.seen++;
            state.hit = flash.back;
          }
        }
        state.time = t0 + h;
        state.angle = a1;
        if (state.hertz !== 0 || tiltOf(a1) !== 0) state.since = null;
        else if (state.since === null) state.since = state.time;
      }
      left -= ph.dur;
    }
  }
  state.flashes = state.flashes.filter((flash) => flash.back > state.time - trip);
  state.steady = state.hertz === 0 && tiltOf(state.angle) === 0;
  return state;
}

// ── Refraction of a ray ───────────────────────────────────────────────────────────────────────

export type Vec = [number, number];

const RAD = Math.PI / 180;
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1];
const unit = (a: Vec): Vec => {
  const len = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / len, a[1] / len];
};

/**
 * Snell's law for a ray: `d` is the unit direction it travels in, `normal` the unit normal of the
 * surface on the side it comes from, and n1 and n2 the refractive indices before and after. The
 * answer is the unit direction beyond the surface, or null when no light can cross (total
 * internal reflection).
 */
export function refractRay(d: Vec, normal: Vec, n1: number, n2: number): Vec | null {
  const cosi = -dot(d, normal);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  const c = eta * cosi - Math.sqrt(k);
  return unit([eta * d[0] + c * normal[0], eta * d[1] + c * normal[1]]);
}

/** A ray reflected from a surface with the unit normal given. */
export function reflectRay(d: Vec, normal: Vec): Vec {
  const k = 2 * dot(d, normal);
  return unit([d[0] - k * normal[0], d[1] - k * normal[1]]);
}

/** The angle between a ray and the normal of the surface it meets, in degrees. */
export const incidenceOf = (d: Vec, normal: Vec) => Math.acos(Math.min(1, Math.abs(dot(d, normal)))) / RAD;

/** Where a turn that starts and stops gently has reached, part way through. */
const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/** The seconds of video played and the angle of the incoming ray, after the clips of a prism or a fibre: a phase with `angle` turns the ray. */
function turnedAt(el: LightEl, start: number, plays: Plays): { time: number; angle: number } {
  let angle = start;
  let time = 0;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      time += run;
      if (ph.angle !== undefined) angle += (ph.angle - angle) * ease(run / ph.dur);
      left -= ph.dur;
    }
  }
  return { time, angle };
}

// ── A prism ───────────────────────────────────────────────────────────────────────────────────

/** The wavelengths a prism's light is drawn in, in nanometres, from red to violet. */
export const PRISM_COLOURS = [700, 660, 620, 590, 560, 530, 500, 470, 440, 410];

/** The refractive index of a prism's glass for a wavelength, in nanometres: it rises steadily from red (700 nm) to violet (400 nm). */
export function prismIndex(el: LightEl, nm: number): number {
  const [red, violet] = el.prism!.index ?? [1.5, 1.56];
  return red + (violet - red) * Math.max(0, Math.min(1, (700 - nm) / 300));
}

/** The corners of a prism whose sloping sides are one unit long: the top, the bottom left and the bottom right, with y upwards from the base. */
export function prismShape(el: LightEl): { top: Vec; left: Vec; right: Vec } {
  const half = ((el.prism!.apex ?? 60) / 2) * RAD;
  return { top: [0, Math.cos(half)], left: [-Math.sin(half), 0], right: [Math.sin(half), 0] };
}

export const prismAt = (el: LightEl, plays: Plays = []) => turnedAt(el, el.prism!.angle, plays);

export interface PrismPath {
  /** The refractive index of the glass for this light. */
  index: number;
  /** The direction the light arrives in, and where it enters the first face (half way up it). */
  arrive: Vec;
  enter: Vec;
  /** Its direction inside the glass, and where it meets the second face. */
  inside: Vec;
  leave: Vec;
  /** Its direction beyond the second face, or null when it cannot leave there. */
  out: Vec | null;
  /** The angle the light has been turned through altogether, in degrees. */
  deviation: number | null;
}

/** The path of light of one wavelength through a prism, for an angle of incidence on its first face. */
export function prismPath(el: LightEl, angle: number, nm: number): PrismPath {
  const { top, left, right } = prismShape(el);
  const half = ((el.prism!.apex ?? 60) / 2) * RAD;
  const index = prismIndex(el, nm);
  // The normals of the two sloping faces, pointing out of the glass.
  const outLeft: Vec = [-Math.cos(half), Math.sin(half)];
  const outRight: Vec = [Math.cos(half), Math.sin(half)];
  // The ray arrives from the left, climbing: it is the inward normal of the first face turned through the angle of incidence.
  const turn = -half + angle * RAD;
  const arrive: Vec = [Math.cos(turn), Math.sin(turn)];
  const enter: Vec = [(left[0] + top[0]) / 2, (left[1] + top[1]) / 2];
  const inside = refractRay(arrive, outLeft, 1, index)!;
  // Where the ray inside meets the second face, which runs from the top to the bottom right.
  const edge: Vec = [right[0] - top[0], right[1] - top[1]];
  const cross = inside[0] * edge[1] - inside[1] * edge[0];
  const t = ((top[0] - enter[0]) * edge[1] - (top[1] - enter[1]) * edge[0]) / cross;
  const leave: Vec = [enter[0] + inside[0] * t, enter[1] + inside[1] * t];
  const out = refractRay(inside, [-outRight[0], -outRight[1]], index, 1);
  const deviation = out ? Math.acos(Math.max(-1, Math.min(1, dot(arrive, out)))) / RAD : null;
  return { index, arrive, enter, inside, leave, out, deviation };
}

// ── An optical fibre ──────────────────────────────────────────────────────────────────────────

/** The fibre is drawn 1000 units long, with a core 46 units to each side of its centre line, which makes a gentle S-bend. */
export const FIBRE = { length: 1000, half: 46, bend: 52 };

/** The height of the centre line of the fibre at a place along it, and its slope there. */
export const fibreCentre = (x: number) => FIBRE.bend * Math.cos((Math.PI * x) / FIBRE.length);
export const fibreSlope = (x: number) => -((FIBRE.bend * Math.PI) / FIBRE.length) * Math.sin((Math.PI * x) / FIBRE.length);

/** The refractive indices of a fibre's core and cladding, and the critical angle at the wall between them, in degrees. */
export const fibreIndex = (el: LightEl): [number, number] => el.fibre!.index ?? [1.5, 1.2];
export const fibreCritical = (el: LightEl) => Math.asin(fibreIndex(el)[1] / fibreIndex(el)[0]) / RAD;

export const fibreAt = (el: LightEl, plays: Plays = []) => turnedAt(el, el.fibre!.angle, plays);

export interface FibreBounce {
  /** Where the ray meets the wall, and the angle between the ray and the wall's normal there, in degrees. */
  at: Vec;
  incidence: number;
  /** Whether all of the light is reflected (the angle is more than the critical angle). */
  total: boolean;
  /** The direction of the light that escapes into the cladding, when some does. */
  escape: Vec | null;
}

export interface FibrePath {
  /** The corners of the ray's path, from where it enters, each with the share of the light that reaches it. */
  points: Array<{ at: Vec; strength: number }>;
  bounces: FibreBounce[];
  /** The length of the path, in units. */
  length: number;
  /** The share of the light that reaches the far end. */
  through: number;
}

/**
 * The path of a ray that enters a fibre at an angle to its axis, in degrees. The ray is followed
 * in short steps; at the wall it is reflected, wholly if it meets the wall at more than the
 * critical angle, and otherwise only in part (a quarter of the light, for the picture), while the
 * rest escapes into the cladding by Snell's law.
 */
export function fibrePath(el: LightEl, angle: number): FibrePath {
  const [core, cladding] = fibreIndex(el);
  const critical = fibreCritical(el);
  let p: Vec = [0, fibreCentre(0)];
  let d: Vec = [Math.cos(angle * RAD), Math.sin(angle * RAD)];
  let strength = 1;
  const points: FibrePath['points'] = [{ at: p, strength }];
  const bounces: FibreBounce[] = [];
  let length = 0;
  const step = 1;
  for (let k = 0; k < 20000 && p[0] < FIBRE.length && strength > 0.02 && bounces.length < 80; k++) {
    const next: Vec = [p[0] + d[0] * step, p[1] + d[1] * step];
    const off = next[1] - fibreCentre(next[0]);
    if (Math.abs(off) <= FIBRE.half || next[0] <= 0) {
      p = next;
      length += step;
      continue;
    }
    // The wall: its normal points into the core.
    const slope = fibreSlope(next[0]);
    const inward = unit(off > 0 ? [slope, -1] : [-slope, 1]);
    // A ray that is already heading back into the core has just been reflected; let it go on.
    if (dot(d, inward) >= 0) {
      p = next;
      length += step;
      continue;
    }
    const incidence = incidenceOf(d, inward);
    const total = incidence >= critical;
    const escape = total ? null : refractRay(d, inward, core, cladding);
    bounces.push({ at: p, incidence, total, escape });
    points.push({ at: p, strength });
    d = reflectRay(d, inward);
    if (!total) strength *= 0.25;
  }
  points.push({ at: p, strength });
  return { points, bounces, length, through: p[0] >= FIBRE.length ? strength : 0 };
}
