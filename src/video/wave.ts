/**
 * The waves of a `wave` element (see WaveEl in script.ts). A wave is made at the left end of its
 * strip by a source that moves up and down (or in and out) at the wave's frequency, and what the
 * source does travels along the strip at the wave's speed. So the displacement at a place is what
 * the source was doing a little earlier: at the time, the distance from the source ÷ the speed
 * ago. Everything drawn comes from that one rule: crests moving along, the wavelength (speed ÷
 * frequency), a change of frequency travelling in from the source, and each point of the strip
 * only moving about its own rest position.
 */
import type { WaveEl, WaveLane } from './script.ts';

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
  /** How far the front of the wave has travelled from the source, in metres (past the end when the wave started full). */
  front: number;
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

/** The places in [from, to] where the wave's phase is `target` (mod a whole turn), from left to right. */
function places(stretches: Stretch[], lane: WaveLane, x0: number, time: number, earliest: number, from: number, to: number, target: number): number[] {
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
      const x = x0 + lane.speed * (time - t);
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
    const sent = (x: number) => time - (x - x0) / lane.speed;
    const now = list[list.length - 1];
    const span1 = el.span[1];
    // Crests are looked for a wavelength past each end, so a mark between two of them has both.
    const pad = now.frequency > 0 ? lane.speed / Math.min(...list.map((s) => s.frequency).filter((f) => f > 0)) : 0;
    const back = lane.full ? time - (span1 + pad - x0) / lane.speed : 0;
    // In a longitudinal wave the particles crowd together where the displacement is falling
    // through zero along the strip (those behind have moved forward, those ahead back): that is
    // where the source's phase is a whole number of turns. Half a turn on, they are spread out.
    const long = lane.kind === 'longitudinal';
    lanes[lane.id] = {
      frequency: now.frequency,
      amplitude: now.amplitude,
      speed: lane.speed,
      reached: (x) => sent(x) >= earliest,
      at(x) {
        // What the source sent at a time, and nothing from before it started.
        const value = (t: number) => (t < earliest ? 0 : stretchAt(list, t).amplitude * Math.sin(phaseAt(list, t)));
        // A wave that bounces off the right end comes back turned over: it has travelled to the
        // end and back to this place, and the end itself stays still.
        return value(sent(x)) - (lane.reflect ? value(time - (2 * span1 - x0 - x) / lane.speed) : 0);
      },
      crests: places(list, lane, x0, time, back, x0 - pad, span1 + pad, long ? 0 : Math.PI / 2),
      troughs: places(list, lane, x0, time, back, x0 - pad, span1 + pad, long ? Math.PI : (3 * Math.PI) / 2),
      front: lane.full ? Number.POSITIVE_INFINITY : lane.speed * time,
    };
    // Complete waves past the mark: the turns of phase that have gone by there since the start
    // (or, in a lane that starts empty, since the wave arrived).
    const mark = el.mark ?? (el.span[0] + el.span[1]) / 2;
    const t = sent(mark);
    const base = lane.full ? -(mark - x0) / lane.speed : 0;
    passed[lane.id] = t <= base ? 0 : Math.floor((phaseAt(list, t) - phaseAt(list, base)) / TAU + 1e-9);
  }
  return { time, note, lanes, passed };
}

/** The largest amplitude a lane ever has, for giving it room. */
export function largestAmplitude(el: WaveEl, lane: WaveLane): number {
  let most = lane.amplitude;
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) most = Math.max(most, ph.set?.[lane.id]?.amplitude ?? 0);
  return most;
}

/** The shortest wavelength a lane ever has, in metres. */
export function shortestWavelength(el: WaveEl, lane: WaveLane): number {
  let most = lane.frequency;
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) most = Math.max(most, ph.set?.[lane.id]?.frequency ?? 0);
  return most > 0 ? lane.speed / most : Number.POSITIVE_INFINITY;
}
