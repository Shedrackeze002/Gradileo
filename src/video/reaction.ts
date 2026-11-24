/**
 * Nuclear reactions and the energy they release (the `reaction` element; src/video/stage/Reaction.tsx draws it).
 *
 * The mass of a nucleus is less than the mass of its separate protons and neutrons. The
 * difference is its mass defect, and the energy equivalent to it is its binding energy:
 *
 *     Δm = Z m_p + N m_n − m_nucleus        E = Δm × 931.5 MeV
 *
 * with m_p = 1.0073 u and m_n = 1.0087 u, as the lessons write them. The binding energy for each
 * nucleon is greatest near iron, so a change that moves nuclei towards that peak releases
 * energy: fission splits a heavy nucleus, and fusion joins light ones.
 */
import type { ReactionEl } from './script.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

/** The energy equivalent to one atomic mass unit, in MeV, and the masses of a proton and a neutron, in u. */
export const MEV_PER_U = 931.5;
export const PROTON_U = 1.0073;
export const NEUTRON_U = 1.0087;

/** The mass of Z protons and N neutrons that are apart, in u. */
export const separateMass = (z: number, n: number) => z * PROTON_U + n * NEUTRON_U;
/** The mass defect of a nucleus of that mass, in u, and its binding energy, in MeV. */
export const massDefect = (z: number, n: number, mass: number) => separateMass(z, n) - mass;
export const bindingEnergy = (z: number, n: number, mass: number) => massDefect(z, n, mass) * MEV_PER_U;
/** The energy that a lost mass (in u) becomes, in MeV. */
export const energyOf = (lost: number) => lost * MEV_PER_U;

/** The binding energy for each nucleon, in MeV, against the mass number: the points of the lesson's graph. */
export const CURVE: Array<[a: number, mev: number]> = [
  [1, 0],
  [2, 1.11],
  [3, 2.57],
  [4, 7.07],
  [6, 5.33],
  [7, 5.61],
  [9, 6.46],
  [12, 7.68],
  [16, 7.98],
  [20, 8.03],
  [24, 8.26],
  [32, 8.49],
  [40, 8.55],
  [56, 8.79],
  [62, 8.79],
  [84, 8.72],
  [98, 8.64],
  [120, 8.5],
  [132, 8.43],
  [144, 8.33],
  [174, 8.08],
  [208, 7.87],
  [238, 7.57],
];

/** The binding energy for each nucleon at a mass number, read off the graph. */
export function bindingAt(a: number): number {
  if (a <= CURVE[0][0]) return CURVE[0][1];
  for (let i = 1; i < CURVE.length; i++) {
    const [[a0, e0], [a1, e1]] = [CURVE[i - 1], CURVE[i]];
    if (a <= a1) return e0 + ((e1 - e0) * (a - a0)) / (a1 - a0);
  }
  return CURVE[CURVE.length - 1][1];
}

/** How long nucleons take to come together into a nucleus (or to be pulled apart), in seconds. */
export const JOIN = 2.6;
/** A fission: the seconds for the neutron to arrive, for the nucleus to stretch, and then it splits. */
export const ARRIVE = 1.3;
export const STRETCH = 2;
/** A chain reaction: the seconds before the first fission, and from one generation of fissions to the next. */
export const FIRST = 1.2;
export const GEN = 1.5;
/** A fusion: the seconds for two fast nuclei to meet, and for two slow ones to come to rest before they turn back. */
export const MEET = 1.1;
export const TURN = 1.7;

/** The fissions in each generation of a chain reaction: with control rods one neutron from each fission causes another, and without them two do. */
export const generations = (rods: boolean): number[] => (rods ? [1, 1, 1, 1, 1] : [1, 2, 4, 8]);

/** The fissions that have happened a time after a chain reaction was started. */
export function fissionsBy(rods: boolean, since: number): number {
  let total = 0;
  generations(rods).forEach((count, g) => {
    if (since >= FIRST + g * GEN) total += count;
  });
  return total;
}

/** One start of a fission, a chain reaction or a fusion. */
export interface Shot {
  at: number;
  slow: boolean;
}

export interface ReactionState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** A `weigh` picture: how far the nucleons have come together, from 0 (apart) to 1 (a nucleus), the furthest they have ever come, whether they are on their way together, and when they last set off. */
  joined: number;
  most: number;
  joining: boolean;
  joinAt: number;
  /** A `curve` picture: the mass number that the marker is at. */
  at: number;
  /** Every start so far, and the seconds since the latest (−1 before any). */
  shots: Shot[];
  since: number;
  slow: boolean;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/** The state of a reaction element after its clips. */
export function reactionAt(el: ReactionEl, plays: Plays = []): ReactionState {
  let time = 0;
  let at = el.at ?? 56;
  let [from, target, joinAt] = [el.joined ? 1 : 0, el.joined ? 1 : 0, -Infinity];
  const joinedAt = (t: number) => from + (target - from) * Math.min(1, Math.max(0, (t - joinAt) / JOIN));
  let most = from;
  const shots: Shot[] = [];
  for (const [clipName, seconds] of plays) {
    const clip = el.clips[clipName];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      if (ph.join !== undefined && (ph.join ? 1 : 0) !== target) {
        most = Math.max(most, joinedAt(time));
        [from, target, joinAt] = [joinedAt(time), ph.join ? 1 : 0, time];
      }
      if (ph.fire !== undefined && ph.fire !== false) shots.push({ at: time, slow: ph.fire === 'slow' });
      if (ph.to !== undefined) at += (ph.to - at) * ease(run / ph.dur);
      time += run;
      left -= ph.dur;
    }
  }
  const last = shots[shots.length - 1];
  return { time, joined: joinedAt(time), most: Math.max(most, joinedAt(time)), joining: target === 1, joinAt, at, shots, since: last ? time - last.at : -1, slow: last?.slow ?? false };
}

/** A nucleus that a fission makes. */
export interface Product {
  z: number;
  n: number;
  name: string;
}

/** The two nuclei that uranium-235 splits into unless the element says otherwise: krypton-92 and barium-141, with 3 neutrons. */
export const PRODUCTS: [Product, Product] = [
  { z: 36, n: 56, name: 'Krypton' },
  { z: 56, n: 85, name: 'Barium' },
];

/** The neutrons that a fission of uranium-235 sets free, for its two products: 235 + 1 less the two mass numbers. */
export const freed = (products: [Product, Product]) => 236 - products[0].z - products[0].n - products[1].z - products[1].n;
