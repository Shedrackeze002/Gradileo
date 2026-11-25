/**
 * A sample of a radioactive isotope (the `halflife` element; src/video/stage/Halflife.tsx draws it).
 *
 * Every nucleus of the sample has a moment of its own at which it decays. Which nucleus decays
 * when has no pattern, but the moments are spread so that the sample as a whole follows the decay
 * equation closely: half of the nuclei that are left decay in each half-life,
 *
 *     N = N₀ × (1/2)^(t / T).
 *
 * A clip runs the sample's clock on, and the picture shows the nuclei beside a graph of the
 * amount that is left, which draws itself as the clock runs.
 */
import type { HalflifeEl } from './script.ts';
import { chance } from './matter.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

/** The share of a sample that is left after a time, for a half-life in the same unit. */
export const shareLeft = (time: number, halfLife: number) => 0.5 ** (time / halfLife);
/** The number of half-lives in which an amount falls from `from` to `to`. */
export const halfLives = (from: number, to: number) => Math.log(from / to) / Math.log(2);

const samples = new Map<string, number[]>();

/**
 * The moment at which each of `count` nuclei decays, as a number of half-lives. The moments are
 * the evenly spread shares of the decay law (so that half have decayed after 1 half-life, three
 * quarters after 2, and so on), dealt out to the nuclei in an order with no pattern.
 */
export function decayMoments(count: number, salt = 0): number[] {
  const key = `${count}:${salt}`;
  const known = samples.get(key);
  if (known) return known;
  const order = Array.from({ length: count }, (_, i) => i).sort((a, b) => chance(a + 1, 90 + salt) - chance(b + 1, 90 + salt) || a - b);
  const moments = new Array<number>(count);
  // The nucleus that is dealt the kth share decays when the share left is (k + ½) ÷ count.
  order.forEach((nucleus, k) => (moments[nucleus] = -Math.log2((k + 0.5) / count)));
  samples.set(key, moments);
  return moments;
}

/** One run of the clock: from one time of the sample to another, over some seconds of video. */
export interface Run {
  at: number;
  over: number;
  from: number;
  to: number;
}

export interface HalflifeState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** The time on the sample's clock, in the element's unit. */
  clock: number;
  /** Every run of the clock so far. */
  runs: Run[];
}

/** The state of a half-life element after its clips. The clock runs at a steady rate through each phase that has a `to`. */
export function halflifeAt(el: HalflifeEl, plays: Plays = []): HalflifeState {
  let [time, clock] = [0, el.start ?? 0];
  const runs: Run[] = [];
  for (const [clipName, seconds] of plays) {
    const clip = el.clips[clipName];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      if (ph.to !== undefined && ph.to !== clock) {
        const reached = clock + (ph.to - clock) * (run / ph.dur);
        runs.push({ at: time, over: ph.dur, from: clock, to: ph.to });
        clock = run >= ph.dur ? ph.to : reached;
      }
      time += run;
      left -= ph.dur;
    }
  }
  return { time, clock, runs };
}

/** The seconds of video at which the clock passed a time of the sample, or nothing if it has not yet. */
export function videoTimeOf(st: HalflifeState, clock: number): number | undefined {
  for (const run of st.runs) {
    const [low, high] = [Math.min(run.from, run.to), Math.max(run.from, run.to)];
    if (run.to > run.from && clock > low && clock <= high) {
      const at = run.at + ((clock - run.from) / (run.to - run.from)) * run.over;
      return at <= st.time ? at : undefined;
    }
  }
  return undefined;
}

/** How many of the nuclei of the sample have not decayed at a time on its clock. */
export function nucleiLeft(el: HalflifeEl, clock: number): number {
  const n = clock / el.halfLife;
  return decayMoments(el.count ?? 400, el.salt ?? 0).filter((moment) => moment > n).length;
}

/** The amount that is left at a time on the clock, by the decay equation, in the unit of the element's `amount` (a share of 1 if it has none). */
export const amountLeft = (el: HalflifeEl, clock: number) => (el.amount ?? 1) * shareLeft(clock, el.halfLife);

/** A number as the lessons write it: up to `places` decimal places, without trailing zeros, and with a thin space in the thousands. */
export function tidy(value: number, places = 2): string {
  const digits = value.toFixed(places);
  const fixed = digits.includes('.') ? digits.replace(/\.?0+$/, '') : digits;
  const [whole, part] = fixed.split('.');
  const spaced = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+$)/g, ' ') : whole;
  return part ? `${spaced}.${part}` : spaced;
}
