/**
 * Alpha particles fired at atoms (the `alphas` element; src/video/stage/Alphas.tsx draws it).
 *
 * An alpha particle has a charge of +2e, and a nucleus of Z protons has +Ze, so the two repel
 * with a force k(2e)(Ze) ÷ r². An alpha particle aimed straight at a nucleus stops where all of
 * its kinetic energy has become electric potential energy, Ek = k(2e)(Ze) ÷ r, and one aimed to
 * the side is turned along a path that is worked out step by step from the force. The lessons'
 * constants are used: k = 8.99 × 10⁹ N·m²/C², e = 1.60 × 10⁻¹⁹ C and 1 MeV = 1.60 × 10⁻¹³ J.
 *
 * The element has five pictures:
 *
 * - `pudding`: Thomson's atom, a ball of positive charge with electrons dotted through it, which
 *   alpha particles cross with no deflection that could be seen;
 * - `ring`: the experiment, with a source, a gold foil and a screen all round that flashes
 *   where each alpha particle lands;
 * - `past`: one nucleus up close, to scale, and alpha particles that pass it at chosen distances;
 * - `head`: one alpha particle that heads straight for a nucleus, stops, and is pushed back;
 * - `orbit`: Rutherford's atom, with electrons that circle the nucleus. An electron that radiates
 *   its energy away, as an accelerating charge should, spirals in: the cube of its distance
 *   falls steadily with time, and it turns faster as it falls, as ω ∝ r^(−3/2).
 *
 * Nothing is random: each alpha particle draws its numbers from its own place in a fixed
 * sequence, so the same particle does the same thing in every frame.
 */
import type { AlphasEl } from './script.ts';
import { chance } from './matter.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

export const COULOMB = 8.99e9;
export const CHARGE = 1.6e-19;
export const MEV = 1.6e-13;
/** The mass of an alpha particle, in kilograms, and a femtometre, in metres. */
export const ALPHA = 6.64e-27;
export const FM = 1e-15;
/** The radius of a gold nucleus, about 7 fm, and of a gold atom, about 1.5 × 10⁻¹⁰ m. */
export const NUCLEUS_FM = 7;
export const ATOM = 1.5e-10;

/** The top line of every equation here: k(2e)(Ze), in N·m². */
export const push = (z: number) => COULOMB * (2 * CHARGE) * (z * CHARGE);
/** The distance of closest approach, in metres, of an alpha particle with a kinetic energy in MeV that heads straight for a nucleus of Z protons. */
export const closest = (z: number, mev: number) => push(z) / (mev * MEV);
/** The kinetic energy, in MeV, that brings an alpha particle to a distance, in metres, from the centre of a nucleus. */
export const energyFor = (z: number, metres: number) => push(z) / metres / MEV;
/** The force on an alpha particle, in newtons, at a distance from the centre of a nucleus. */
export const forceAt = (z: number, metres: number) => push(z) / (metres * metres);
/** The kinetic energy of an alpha particle, in joules, from its speed. */
export const kinetic = (speed: number, mass = ALPHA) => 0.5 * mass * speed * speed;
/** The angle an alpha particle is turned through, in degrees, when it is aimed to miss the centre of the nucleus by `miss`, and d is its distance of closest approach head-on. */
export const turned = (miss: number, d: number) => (miss === 0 ? 180 : (2 * Math.atan(d / (2 * Math.abs(miss))) * 180) / Math.PI);

/** A point of a path, with the time at which the particle is there (far from the nucleus the particle has a speed of 1, so times are distances at that speed). */
export type Step = [x: number, y: number, t: number];

/**
 * The path of an alpha particle past a nucleus at the origin. It is aimed to pass `miss` above
 * the nucleus, and has a speed of 1 far away. It is pushed away with an acceleration of
 * (d ÷ 2) ÷ r²: that is the force k(2e)(Ze) ÷ r² for a particle whose kinetic energy would all
 * be potential energy at the distance d. The path starts `reach` to the left, where the particle
 * has already slowed a little, to the speed √(1 − d ÷ r) that leaves its energy the same, and
 * is that much further from the line so that its angular momentum is the same too. The steps
 * are shorter close to the nucleus, where the force changes quickly.
 */
export function pathPast(miss: number, d: number, reach: number): Step[] {
  const v0 = Math.sqrt(Math.max(0.04, 1 - d / Math.hypot(reach, miss)));
  let [x, y, vx, vy, t] = [-reach, miss / v0, v0, 0, 0];
  const steps: Step[] = [[x, y, t]];
  const pull = (px: number, py: number): [number, number] => {
    const r = Math.hypot(px, py);
    const a = d / 2 / (r * r * r);
    return [a * px, a * py];
  };
  let [ax, ay] = pull(x, y);
  for (let i = 0; i < 40000; i++) {
    const r = Math.hypot(x, y);
    const dt = Math.max(d * 1e-4, 0.012 * r) / Math.max(0.2, Math.hypot(vx, vy));
    x += vx * dt + 0.5 * ax * dt * dt;
    y += vy * dt + 0.5 * ay * dt * dt;
    const [bx, by] = pull(x, y);
    vx += 0.5 * (ax + bx) * dt;
    vy += 0.5 * (ay + by) * dt;
    [ax, ay] = [bx, by];
    t += dt;
    steps.push([x, y, t]);
    if (Math.abs(x) > reach * 1.02 || Math.abs(y) > reach) break;
  }
  return steps;
}

/** Where a particle is on its path at a time, and which way it is moving. */
export function whereAt(steps: Step[], time: number): { at: [number, number]; index: number; done: boolean } {
  if (time <= 0) return { at: [steps[0][0], steps[0][1]], index: 0, done: false };
  let [lo, hi] = [0, steps.length - 1];
  if (time >= steps[hi][2]) return { at: [steps[hi][0], steps[hi][1]], index: hi, done: true };
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (steps[mid][2] <= time) lo = mid;
    else hi = mid;
  }
  const k = (time - steps[lo][2]) / (steps[hi][2] - steps[lo][2]);
  return { at: [steps[lo][0] + (steps[hi][0] - steps[lo][0]) * k, steps[lo][1] + (steps[hi][1] - steps[lo][1]) * k], index: lo, done: false };
}

/** The nearest that a path comes to the nucleus. */
export const nearest = (steps: Step[]) => steps.reduce((least, [x, y]) => Math.min(least, Math.hypot(x, y)), Infinity);

/**
 * The angle, in degrees, that the foil of a `ring` picture turns alpha particle number n
 * through. Most go nearly straight on, some are turned a little, and a share of `back` are
 * turned through more than 90°: about 1 in 8000 in the experiment, and more often here, so
 * that a few can be seen.
 */
export function ringAngle(n: number, back = 0.02): number {
  const [u, v, side] = [chance(n, 41), chance(n, 42), chance(n, 43) < 0.5 ? -1 : 1];
  if (u < back) return side * (95 + 80 * v);
  if (u < back + 0.16) return side * (6 + 54 * v * v);
  return side * 3 * v;
}

/** What the foil did to an alpha particle: straight through, turned aside, or turned back. */
export const kindOf = (degrees: number): 'through' | 'aside' | 'back' => (Math.abs(degrees) > 90 ? 'back' : Math.abs(degrees) > 5 ? 'aside' : 'through');

// ── The state of a picture after its clips ───────────────────────────────────────────────────

/** One alpha particle that has been sent: its number, when it left (seconds of video), where it was aimed, and the energy and the nucleus at that moment. */
export interface AlphaSent {
  n: number;
  at: number;
  /** How far from the line through the nucleus it was aimed, in femtometres (`past` and `head` pictures). */
  miss: number;
  mev: number;
  z: number;
}

export interface AlphasState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** The kinetic energy of the alpha particles now, in MeV, and the protons in the nucleus. */
  mev: number;
  z: number;
  /** The name of the element of the nucleus. */
  name: string;
  /** The alpha particles sent in each second. */
  rate: number;
  sent: AlphaSent[];
  /** An `orbit` picture: the angle the outer electron has turned through, in radians, and how much of its fall into the nucleus is over, from 0 to 1. */
  turn: number;
  fall: number;
  /** The angle at which the fall began, and the seconds that the whole fall takes. */
  fallFrom: number;
  fallDur: number;
}

/** The turns an electron of an `orbit` picture makes each second before it falls, in radians. */
export const SPIN = 2.2;
/** The distance of a falling electron from the nucleus, as a share of where it began: an electron that radiates as it circles loses r³ at a steady rate. */
export const fallRadius = (fall: number) => Math.cbrt(Math.max(0, 1 - fall));
/** The angle a falling electron has turned through since its fall began: it turns at SPIN ÷ r^(3/2), which adds up to this. */
export const fallTurn = (fall: number, seconds: number) => SPIN * 2 * seconds * (1 - Math.sqrt(Math.max(0, 1 - fall)));

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const STEP = 1 / 30;

/** The state of an alphas element after its clips. A phase fires the particles it lists, evenly through its time, or sends them at a rate; it can slide the energy, and change the nucleus. In an `orbit` picture the electrons circle, and a phase can make them fall. */
export function alphasAt(el: AlphasEl, plays: Plays = []): AlphasState {
  let [mev, z, name, rate] = [el.mev ?? 5, el.z ?? 79, el.name ?? 'Gold', el.rate ?? 0];
  let [time, count] = [0, 0.6];
  let [turn, fall, fallFrom, fallDur] = [0, 0, 0, 1];
  const sent: AlphaSent[] = [];
  for (const [clipName, seconds] of plays) {
    const clip = el.clips[clipName];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      if (ph.z !== undefined) z = ph.z;
      if (ph.name !== undefined) name = ph.name;
      const from = { mev, rate };
      const at = (t: number) => ({ mev: mix(from.mev, ph.mev ?? from.mev, ease(t / ph.dur)), rate: mix(from.rate, ph.rate ?? from.rate, ease(t / ph.dur)) });
      // The particles the phase lists leave evenly through it.
      (ph.fire ?? []).forEach((miss, i) => {
        const t = ((i + 0.5) / ph.fire!.length) * ph.dur;
        if (t < run) sent.push({ n: sent.length + 1, at: time + t, miss, mev: at(t).mev, z });
      });
      if (from.rate > 0 || (ph.rate ?? 0) > 0)
        for (let t0 = 0; t0 < run - 1e-9; t0 += STEP) {
          const dt = Math.min(STEP, run - t0);
          const now = at(t0);
          const before = count;
          count += now.rate * dt;
          for (let n = Math.floor(before) + 1; n <= count; n++) sent.push({ n: sent.length + 1, at: time + t0 + (n - before) / now.rate, miss: 0, mev: now.mev, z });
        }
      if (ph.fall && fall < 1) {
        // The electron spirals in through the whole of this step.
        if (fall === 0) [fallFrom, fallDur] = [turn, ph.dur];
        fall = Math.min(1, fall + run / ph.dur);
        turn = fallFrom + fallTurn(fall, fallDur);
      } else if (fall === 0) turn += SPIN * run;
      ({ mev, rate } = at(run));
      time += run;
      left -= ph.dur;
    }
  }
  return { time, mev, z, name, rate, sent, turn, fall, fallFrom, fallDur };
}
