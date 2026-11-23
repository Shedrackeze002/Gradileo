/**
 * The nucleus of an atom (the `nucleus` element; src/video/stage/Nucleus.tsx draws it).
 *
 * A nucleus is made of Z protons and N neutrons: A = Z + N nucleons, packed equally closely in
 * every nucleus, so its radius is r = 1.2 fm × ∛A. The lessons' constants are used:
 * k = 8.99 × 10⁹ N·m²/C², e = 1.60 × 10⁻¹⁹ C and 1 fm = 10⁻¹⁵ m.
 *
 * The element has three pictures:
 *
 * - `build`: the nucleus as a ball of protons and neutrons, drawn to scale, with its symbol and
 *   its numbers. Nucleons arrive and leave as a phase changes Z or N, a `decay` throws out an
 *   alpha particle, a beta particle or a gamma ray, and the electrons of the atom can circle it
 *   (far closer than they really are), and leave or arrive to make an ion.
 * - `pair`: two nucleons a distance apart, with the electric repulsion between two protons
 *   (worked out from Coulomb's law) and the strong attraction, which reaches only about as far as
 *   the next nucleon.
 * - `mix`: a sample of atoms of two isotopes of an element, and the average mass of an atom.
 */
import type { NucleusEl } from './script.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;
export type P3 = [number, number, number];

export const COULOMB = 8.99e9;
export const CHARGE = 1.6e-19;
export const FM = 1e-15;
/** The radius of a single nucleon, in femtometres, and of a nucleus of A nucleons. */
export const R0 = 1.2;
export const radiusOf = (a: number) => R0 * Math.cbrt(a);
/** The electric force between two protons a distance apart in femtometres, in newtons. */
export const electricForce = (fm: number) => (COULOMB * CHARGE * CHARGE) / (fm * FM) ** 2;
/**
 * How strong the strong attraction between two nucleons is at a distance in femtometres, as a
 * share of its strength when they touch. This is a sketch of a force with a very short range,
 * not a measured law: full when the nucleons touch, about a seventh at 2 fm, nothing by 3 fm.
 */
export const strongShare = (fm: number) => (fm <= 1 ? 1 : Math.exp(-(((fm - 1) / 0.7) ** 2)));
/** The average mass of an atom of an element with two isotopes, where `share` of the atoms are the first, and the share of the first that gives an average. */
export const averageMass = (masses: [number, number], share: number) => share * masses[0] + (1 - share) * masses[1];
export const shareFor = (masses: [number, number], average: number) => (masses[1] - average) / (masses[1] - masses[0]);

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/** The points of a close packing of equal balls (one ball's width apart), measured from a centre that can be a ball, or one of the two kinds of gap between balls. */
function lattice(origin: P3): P3[] {
  const points: P3[] = [];
  const s = Math.SQRT1_2;
  for (let i = -6; i <= 6; i++)
    for (let j = -6; j <= 6; j++)
      for (let k = -6; k <= 6; k++) {
        if ((((i + j + k) % 2) + 2) % 2 !== 0) continue;
        points.push([i * s - origin[0], j * s - origin[1], k * s - origin[2]]);
      }
  return points.sort((a, b) => Math.hypot(...a) - Math.hypot(...b) || a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
}
const S = Math.SQRT1_2;
const LATTICES = [lattice([0, 0, 0]), lattice([S / 2, S / 2, S / 2]), lattice([S, 0, 0])];
const packs = new Map<number, P3[]>();

/** The places of A balls packed as closely as they will go, in ball widths from their centre, innermost first. */
export function packed(a: number): P3[] {
  const known = packs.get(a);
  if (known) return known;
  let best: P3[] = [];
  let reach = Infinity;
  for (const points of LATTICES) {
    const taken = points.slice(0, a);
    const mid = [0, 1, 2].map((axis) => taken.reduce((sum, p) => sum + p[axis], 0) / Math.max(1, a));
    const moved = taken.map((p): P3 => [p[0] - mid[0], p[1] - mid[1], p[2] - mid[2]]);
    const far = Math.max(0, ...moved.map((p) => Math.hypot(...p)));
    if (far < reach - 1e-9) [best, reach] = [moved, far];
  }
  packs.set(a, best);
  return best;
}

/** Which of the A places of a nucleus hold protons: Z of them, spread evenly from the centre outwards. */
export const protonAt = (k: number, a: number, z: number) => Math.floor(((k + 1) * z) / a) > Math.floor((k * z) / a);

/** The nucleons of a nucleus: where each proton and each neutron is, in femtometres from the centre, and the radius of one nucleon as drawn, so that the whole ball has the radius 1.2 fm × ∛A. */
export function nucleons(z: number, n: number): { protons: P3[]; neutrons: P3[]; ball: number } {
  const a = z + n;
  const places = packed(a);
  const far = Math.max(0, ...places.map((p) => Math.hypot(...p)));
  const width = radiusOf(Math.max(1, a)) / (far + 0.5);
  const [protons, neutrons]: [P3[], P3[]] = [[], []];
  places.forEach((p, k) => (protonAt(k, a, z) ? protons : neutrons).push([p[0] * width, p[1] * width, p[2] * width]));
  return { protons, neutrons, ball: width / 2 };
}

export type DecayKind = 'alpha' | 'beta-' | 'beta+' | 'gamma';
/** What a decay does to the protons and the neutrons of a nucleus. */
export const DECAYS: Record<DecayKind, { z: number; n: number; gives: string }> = {
  alpha: { z: -2, n: -2, gives: 'Alpha particle' },
  'beta-': { z: 1, n: -1, gives: 'Beta-minus particle (an electron)' },
  'beta+': { z: -1, n: 1, gives: 'Beta-plus particle (a positron)' },
  gamma: { z: 0, n: 0, gives: 'Gamma ray' },
};

/** A change of the nucleus: from one number of protons and neutrons to another, by a decay or by nucleons that arrive and leave. `at` is when it began, in seconds of video, and `over` how long it takes. */
export interface Change {
  at: number;
  over: number;
  kind: DecayKind | 'move';
  from: { z: number; n: number; symbol: string; name: string };
  to: { z: number; n: number; symbol: string; name: string };
}

/** The seconds that nucleons take to arrive or leave, and that a decay takes. */
export const MOVE = 1.6;
export const DECAY = 2.4;
/** The seconds that electrons take to leave an atom, or to join it. */
export const LEAVE = 1.6;

export interface NucleusState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** The nucleus now (once the latest change is over). */
  z: number;
  n: number;
  symbol: string;
  name: string;
  /** The latest change, and how far it has gone, from 0 to 1. */
  change?: Change;
  gone: number;
  /** Every change so far. */
  changes: Change[];
  /** Whether the nucleus is marked as unstable, and trembles. */
  shaky: boolean;
  /** The electrons round the nucleus (when the element gives them), how many there were before the latest change of them, and when that change began. */
  electrons?: number;
  electronsWere?: number;
  electronsAt: number;
  /** A `pair` picture: the femtometres between the two nucleons, and which two they are. */
  apart: number;
  kinds: 'pp' | 'pn' | 'nn';
  /** A `mix` picture: the share of the atoms that are the first isotope. */
  share: number;
}

/** The state of a nucleus element after its clips. */
export function nucleusAt(el: NucleusEl, plays: Plays = []): NucleusState {
  let now = { z: el.z ?? 6, n: el.n ?? 6, symbol: el.symbol ?? 'C', name: el.name ?? 'Carbon' };
  let [apart, share] = [el.apart ?? 2, el.share ?? 0.5];
  let [shaky, kinds] = [el.shaky ?? false, el.kinds ?? 'pp'];
  let time = 0;
  let [electrons, electronsWere, electronsAt] = [el.electrons, el.electrons, -Infinity];
  const changes: Change[] = [];
  for (const [clipName, seconds] of plays) {
    const clip = el.clips[clipName];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      const decay = ph.decay ? DECAYS[ph.decay] : undefined;
      const to = { z: decay ? now.z + decay.z : (ph.z ?? now.z), n: decay ? now.n + decay.n : (ph.n ?? now.n), symbol: ph.symbol ?? now.symbol, name: ph.name ?? now.name };
      if (ph.decay || to.z !== now.z || to.n !== now.n) {
        changes.push({ at: time, over: Math.min(ph.dur, ph.decay ? DECAY : MOVE), kind: ph.decay ?? 'move', from: now, to });
        now = to;
      } else if (to.symbol !== now.symbol || to.name !== now.name) now = to;
      if (ph.shaky !== undefined) shaky = ph.shaky;
      if (ph.electrons !== undefined && ph.electrons !== electrons) [electrons, electronsWere, electronsAt] = [ph.electrons, electrons, time];
      if (ph.kinds !== undefined) kinds = ph.kinds;
      const part = ease(run / ph.dur);
      if (ph.apart !== undefined) apart += (ph.apart - apart) * part;
      if (ph.share !== undefined) share += (ph.share - share) * part;
      time += run;
      left -= ph.dur;
    }
  }
  const change = changes[changes.length - 1];
  return { time, ...now, change, gone: change ? Math.min(1, (time - change.at) / change.over) : 1, changes, shaky, electrons, electronsWere, electronsAt, apart, kinds, share };
}
