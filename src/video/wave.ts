/**
 * The waves of a `wave` element (see WaveEl in script.ts). A wave is made at the left end of its
 * strip by a source that moves up and down (or in and out) at the wave's frequency, and what the
 * source does travels along the strip at the wave's speed. So the displacement at a place is what
 * the source was doing a little earlier: at the time, the distance from the source ÷ the speed
 * ago. Everything drawn comes from that one rule: crests moving along, the wavelength (speed ÷
 * frequency), a change of frequency travelling in from the source, and each point of the strip
 * only moving about its own rest position.
 *
 * The same rule carries single pulses, a wave into a second medium (where it travels at another
 * speed, so the same number of waves each second are shorter or longer), and a wave back from the
 * far end of the strip. A standing wave is written down directly: every point of it moves in
 * step, by an amount that depends on where it is.
 */
import type { WaveEl, WaveLane, WavePulse } from './script.ts';

/** A stretch of time during which a lane's source keeps one frequency and amplitude. */
interface Stretch {
  /** When it starts, in seconds of the wave's own time. */
  t0: number;
  frequency: number;
  amplitude: number;
  /** The source's phase as it starts, in radians (it carries on from the stretch before). */
  phase0: number;
}

export interface LaneState {
  /** What the source is doing now. */
  frequency: number;
  amplitude: number;
  speed: number;
  /** The displacement at a place, in the lane's own units; 0 where the wave has not arrived. */
  at(x: number): number;
  /** Whether the wave has reached a place. */
  reached(x: number): boolean;
  /** Where the crests (or, in a longitudinal wave, the middles of the compressions) are, from left to right. */
  crests: number[];
  /** Where the troughs (or the middles of the rarefactions) are, from left to right. */
  troughs: number[];
  /** How far the front of the wave (or the middle of its first pulse) has travelled from the source, in metres (past the end when the wave started full). */
  front: number;
  /** Each pulse on its own: its displacement at a place, with what a join or the far end has sent back of it. */
  pulses: Array<(x: number) => number>;
  /** In a lane with a second medium: where it starts, and the wave's speed in it. */
  join?: number;
  speed2?: number;
  /** The points of a standing pattern that never move, and the points between them that move the most, from left to right. */
  nodes: number[];
  antinodes: number[];
  /** Where a standing wave's string or air column ends, in metres. */
  end?: number;
}

export interface WaveState {
  /** Seconds of the wave's own time played so far. */
  time: number;
  note?: string;
  lanes: Record<string, LaneState>;
  /** Complete waves that have passed the marked place since the start, by lane. */
  passed: Record<string, number>;
}

const TAU = 2 * Math.PI;

/** The source's phase at a time, from the stretches of its history. */
function phaseAt(stretches: Stretch[], t: number): number {
  let s = stretches[0];
  for (const next of stretches) if (next.t0 <= t) s = next;
  return s.phase0 + TAU * s.frequency * (t - s.t0);
}

function stretchAt(stretches: Stretch[], t: number): Stretch {
  let s = stretches[0];
  for (const next of stretches) if (next.t0 <= t) s = next;
  return s;
}

/** A single hump: 1 at its middle, falling smoothly to 0 half a width either side. */
const hump = (d: number, width: number) => (Math.abs(d) >= width / 2 ? 0 : Math.cos((Math.PI * d) / width) ** 2);

/** How long a pulse is, in metres: a tenth of the strip when the script does not say. */
export const pulseWidth = (el: WaveEl, pulse: WavePulse) => pulse.width ?? (el.span[1] - el.span[0]) / 10;

/** The length of a standing wave's string or air column, and the frequency that fits it. */
export function standingOf(el: WaveEl, lane: WaveLane): { length: number; k: number; frequency: number } | undefined {
  if (!lane.standing) return undefined;
  const length = lane.standing.length ?? el.span[1] - el.span[0];
  // A string has a node at each end; an air column has one at its closed end, and an antinode at the open one.
  const halves = lane.kind === 'longitudinal' ? (lane.standing.quarters ?? 1) / 2 : (lane.standing.loops ?? 1);
  return { length, k: (halves * Math.PI) / length, frequency: (halves * lane.speed) / (2 * length) };
}

/** The places in [from, to] where the wave's phase is `target` (mod a whole turn), from left to right; `reach` says where what was sent a time ago has got to. */
function places(stretches: Stretch[], reach: (dt: number) => number, time: number, earliest: number, from: number, to: number, target: number): number[] {
  const out: number[] = [];
  stretches.forEach((s, i) => {
    // This stretch was sent out between t0 and the start of the next one (or now).
    const tEnd = i + 1 < stretches.length ? stretches[i + 1].t0 : time;
    const tStart = i === 0 ? Math.min(s.t0, earliest) : s.t0;
    if (!(s.frequency > 0) || tEnd <= tStart) return;
    // Phase target + a whole number of turns, at times within the stretch.
    const first = Math.ceil((s.phase0 + TAU * s.frequency * (tStart - s.t0) - target) / TAU - 1e-9);
    const last = Math.floor((s.phase0 + TAU * s.frequency * (tEnd - s.t0) - target) / TAU + 1e-9);
    for (let n = first; n <= last; n++) {
      const t = s.t0 + (target + TAU * n - s.phase0) / (TAU * s.frequency);
      if (t < earliest - 1e-9) continue;
      const x = reach(time - t);
      if (x >= from - 1e-9 && x <= to + 1e-9) out.push(x);
    }
  });
  return out.sort((a, b) => a - b);
}

/**
 * The state of a wave element after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for (a clip not yet finished is the last one).
 */
export function waveAt(el: WaveEl, plays: Array<[clip: string, seconds: number]> = []): WaveState {
  const x0 = el.span[0];
  const fresh = (): Record<string, Stretch[]> => Object.fromEntries(el.lanes.map((l) => [l.id, [{ t0: 0, frequency: l.frequency, amplitude: l.amplitude, phase0: 0 }]]));
  let stretches = fresh();
  let time = 0;
  let note: string | undefined;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    if (clip.reset) {
      stretches = fresh();
      time = 0;
    }
    let left = seconds;
    note = undefined;
    for (const ph of clip.phases) {
      if (left < 0) break;
      const slow = ph.slow ?? 1;
      const video = ph.dur * slow;
      // A phase's settings take hold as it starts: the source carries on from the phase it had.
      for (const [id, set] of Object.entries(ph.set ?? {})) {
        const list = stretches[id];
        if (!list) continue;
        const last = list[list.length - 1];
        const next = { t0: time, frequency: set.frequency ?? last.frequency, amplitude: set.amplitude ?? last.amplitude, phase0: phaseAt(list, time) };
        if (last.t0 === time) list[list.length - 1] = next;
        else list.push(next);
      }
      const run = Math.min(left, video);
      time += run / slow;
      // The note of the phase that is playing; it goes when the clip has finished.
      note = left < video ? ph.note : undefined;
      left -= video;
    }
  }

  const lanes: Record<string, LaneState> = {};
  const passed: Record<string, number> = {};
  for (const lane of el.lanes) {
    const list = stretches[lane.id];
    // A lane that starts full has been running for ever; otherwise nothing was sent before time 0.
    const earliest = lane.full ? Number.NEGATIVE_INFINITY : 0;
    const span1 = el.span[1];
    const now = list[list.length - 1];
    const v1 = lane.speed;
    // A second medium from the join on: the wave takes longer (or less long) to cross each metre of it.
    const join = lane.medium?.from;
    const v2 = lane.medium?.speed ?? v1;
    const delay = (x: number) => (join !== undefined && x > join ? (join - x0) / v1 + (x - join) / v2 : (x - x0) / v1);
    const reach = (dt: number) => (join !== undefined && x0 + v1 * dt > join ? join + v2 * (dt - (join - x0) / v1) : x0 + v1 * dt);
    const sent = (x: number) => time - delay(x);
    // What a join sends back of a pulse and what it sends on, as parts of the pulse's height: a
    // slower medium ahead sends back a pulse turned over.
    const back2 = (v2 - v1) / (v2 + v1);
    const on2 = (2 * v2) / (v1 + v2);
    // What the far end sends back: turned over at a fixed end, the same way up at a free one.
    const turn = lane.reflect === 'free' ? 1 : lane.reflect ? -1 : 0;
    // Crests are looked for a wavelength past each end, so a mark between two of them has both.
    const pad = now.frequency > 0 ? Math.max(v1, v2) / Math.min(...list.map((s) => s.frequency).filter((f) => f > 0)) : 0;
    const back = lane.full ? time - delay(span1 + pad) : 0;
    // In a longitudinal wave the particles crowd together where the displacement is falling
    // through zero along the strip (those behind have moved forward, those ahead back): that is
    // where the source's phase is a whole number of turns. Half a turn on, they are spread out.
    const long = lane.kind === 'longitudinal';
    // What the source's steady shaking sent at a time, and nothing from before it started.
    const steady = (t: number) => (t < earliest ? 0 : stretchAt(list, t).amplitude * Math.sin(phaseAt(list, t)));
    // What the source did at a time to send one pulse: the pulse starts to leave at its `at`, and its middle half a width later.
    const send = (pulse: WavePulse) => (t: number) => pulse.height * hump(v1 * (t - (pulse.at ?? 0)) - pulseWidth(el, pulse) / 2, pulseWidth(el, pulse));
    // Something the source sent, at a place: what has come straight there, and (`echo`) what a
    // join or the far end has sent back, which has travelled to it and back to this place.
    const carried = (source: (t: number) => number, x: number, echo: boolean): number => {
      if (join !== undefined) return x > join ? on2 * source(sent(x)) : source(sent(x)) + (echo ? back2 * source(time - (2 * join - x0 - x) / v1) : 0);
      return source(sent(x)) + (echo && turn ? turn * source(time - (2 * span1 - x0 - x) / v1) : 0);
    };
    const pulses = (lane.pulses ?? []).map((pulse) =>
      pulse.from === 'right'
        ? // A pulse from the right end travels left, and runs off at the source.
          (x: number) => pulse.height * hump(x - (span1 + pulseWidth(el, pulse) / 2 - v1 * (time - (pulse.at ?? 0))), pulseWidth(el, pulse))
        : (x: number) => carried(send(pulse), x, true),
    );
    const standing = standingOf(el, lane);
    const wavelength = now.frequency > 0 ? v1 / now.frequency : 0;
    // The points of a standing pattern that never move, and those half way between that move the
    // most: all along a standing wave, and as far back from a reflecting end as the reflected wave has come.
    const still: number[] = [];
    const loud: number[] = [];
    if (standing) {
      const half = Math.PI / standing.k;
      for (let x = x0; x <= x0 + standing.length + 1e-9; x += half) still.push(Math.round(x * 1e9) / 1e9);
      for (let x = x0 + half / 2; x <= x0 + standing.length + 1e-9; x += half) loud.push(Math.round(x * 1e9) / 1e9);
    } else if (turn && wavelength > 0 && join === undefined) {
      const met = lane.full ? Number.POSITIVE_INFINITY : v1 * time - (span1 - x0);
      const here = (x: number) => x >= x0 - 1e-9 && span1 - x <= met + 1e-9;
      for (let x = span1 - (turn < 0 ? 0 : wavelength / 4); here(x); x -= wavelength / 2) still.unshift(Math.round(x * 1e9) / 1e9);
      for (let x = span1 - (turn < 0 ? wavelength / 4 : 0); here(x); x -= wavelength / 2) loud.unshift(Math.round(x * 1e9) / 1e9);
    }
    const first = (lane.pulses ?? []).find((pulse) => pulse.from !== 'right');
    lanes[lane.id] = {
      frequency: standing ? standing.frequency : now.frequency,
      amplitude: now.amplitude,
      speed: v1,
      reached: (x) => Boolean(standing) || sent(x) >= earliest,
      at(x) {
        // Every point of a standing wave moves in step, by an amount set by where it is.
        if (standing) return x > x0 + standing.length + 1e-9 ? 0 : now.amplitude * Math.sin(standing.k * (x - x0)) * Math.sin(TAU * standing.frequency * time);
        // A steady wave that bounces off the right end comes back and adds to itself; past a join
        // it is drawn without its reflected part.
        return carried(steady, x, join === undefined) + pulses.reduce((sum, own) => sum + own(x), 0);
      },
      crests: standing ? [] : places(list, reach, time, back, x0 - pad, span1 + pad, long ? 0 : Math.PI / 2),
      troughs: standing ? [] : places(list, reach, time, back, x0 - pad, span1 + pad, long ? Math.PI : (3 * Math.PI) / 2),
      front: lane.full || standing ? Number.POSITIVE_INFINITY : first && !(now.frequency > 0) ? Math.max(0, v1 * (time - (first.at ?? 0)) - pulseWidth(el, first) / 2) : reach(time) - x0,
      pulses,
      join,
      speed2: join !== undefined ? v2 : undefined,
      nodes: still,
      antinodes: loud,
      end: standing ? x0 + standing.length : undefined,
    };
    // Complete waves past the mark: the turns of phase that have gone by there since the start
    // (or, in a lane that starts empty, since the wave arrived).
    const mark = el.mark ?? (el.span[0] + el.span[1]) / 2;
    const t = sent(mark);
    const base = lane.full ? -delay(mark) : 0;
    passed[lane.id] = t <= base ? 0 : Math.floor((phaseAt(list, t) - phaseAt(list, base)) / TAU + 1e-9);
  }
  return { time, note, lanes, passed };
}

/** The largest amplitude a lane ever has, for giving it room. */
export function largestAmplitude(el: WaveEl, lane: WaveLane): number {
  // Pulses that meet add up, and a free end is flicked twice as far as the pulse that reaches it.
  const heights = (lane.pulses ?? []).map((pulse) => pulse.height);
  const up = heights.filter((n) => n > 0).reduce((a, b) => a + b, 0);
  const down = -heights.filter((n) => n < 0).reduce((a, b) => a + b, 0);
  let most = Math.max(lane.amplitude, up, down, lane.reflect === 'free' ? 2 * Math.max(0, ...heights.map(Math.abs)) : 0);
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) most = Math.max(most, ph.set?.[lane.id]?.amplitude ?? 0);
  return most;
}

/** The shortest wavelength a lane ever has, in metres. */
export function shortestWavelength(el: WaveEl, lane: WaveLane): number {
  let most = lane.frequency;
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) most = Math.max(most, ph.set?.[lane.id]?.frequency ?? 0);
  const standing = standingOf(el, lane);
  if (standing) return (2 * Math.PI) / standing.k;
  const slowest = Math.min(lane.speed, lane.medium?.speed ?? lane.speed);
  // A single pulse is as steep as a wave of twice its length; in a slower medium it is shorter by the ratio of the speeds.
  const pulses = (lane.pulses ?? []).map((pulse) => (2 * pulseWidth(el, pulse) * slowest) / lane.speed);
  return Math.min(most > 0 ? slowest / most : Number.POSITIVE_INFINITY, ...pulses);
}
