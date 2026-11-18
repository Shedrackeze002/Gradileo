/**
 * The physics of a transformer element and of a power line element (see TransformerEl and
 * PowerlineEl in script.ts).
 *
 * A transformer is two coils on one iron core. The supply across the primary coil drives a current
 * in it, and that current makes a flux in the core. The same flux passes through every turn of
 * both coils, so while it changes the emf in each coil is in proportion to its turns:
 * Vs ÷ Vp = Ns ÷ Np. With an alternating supply the flux changes all the time. With a battery the
 * flux changes only for a moment after the switch is closed or opened: the secondary gives one
 * short kick each time, and nothing while the current is steady. An ideal transformer wastes no
 * power, so VpIp = VsIs.
 *
 * A power line carries a fixed power P at a voltage V, so its current is I = P ÷ V, and the power
 * wasted as heat in its resistance is I²R. Both are pure functions of the clips and the seconds
 * played, like the rest of the stage.
 */
import type { PowerlineEl, TransformerEl } from './script.ts';

/** The clips played so far, in order, each with the seconds of video it has run for. */
export type Plays = Array<[clip: string, seconds: number]>;

export interface TransformerState {
  /** Seconds of the model that have passed while clips played. */
  time: number;
  /** Whether the supply is joined to the primary coil. */
  on: boolean;
  /** When the switch was last closed or opened, in seconds of the model, and the share of the full flux the core had then (0 to 1). */
  since: number;
  level: number;
  /** The turns on the secondary coil now. */
  secondary: number;
  /** The flux in the core now, as a share of its greatest value (−1 to 1). */
  flux: number;
  /** The voltage across the primary coil and the emf of the secondary coil at this moment, in volts. */
  vp: number;
  vs: number;
  /** The present sweep of the two traces: [seconds into the sweep, primary volts, secondary volts]. */
  trace: Array<[number, number, number]>;
}

/** Steps of the model for each second of video. */
const STEPS = 120;

/** The frequency of the supply in hertz, the seconds a steady current takes to settle, and the seconds one sweep of the traces takes. */
export const hertzOf = (el: TransformerEl) => el.hertz ?? 50;
export const settleOf = (el: TransformerEl) => el.settle ?? 0.004;
export const sweepOf = (el: TransformerEl) => el.sweep ?? 2 / hertzOf(el);

/** The flux and the two voltages at the present time of the state. */
function settle(el: TransformerEl, state: TransformerState): void {
  const ratio = state.secondary / el.turns[0];
  if (el.dc) {
    // The current in the primary, and the flux with it, rises to its steady value after the switch is closed, and dies away after it is opened.
    const fade = Math.exp(-(state.time - state.since) / settleOf(el));
    state.flux = state.on ? 1 - (1 - state.level) * fade : state.level * fade;
    state.vp = state.on ? el.volts : 0;
    // The emf in each coil follows the rate of change of the flux: all of the supply voltage at the moment the switch is closed, then less and less.
    state.vs = (state.on ? (1 - state.level) * fade : -state.level * fade) * el.volts * ratio || 0;
    return;
  }
  if (!state.on) {
    state.flux = 0;
    state.vp = 0;
    state.vs = 0;
    return;
  }
  const phase = 2 * Math.PI * hertzOf(el) * (state.time - state.since);
  state.vp = el.volts * Math.sin(phase) || 0;
  // vp = Np ΔΦ ÷ Δt, so the flux is a quarter of a cycle behind the voltage.
  state.flux = -Math.cos(phase);
  state.vs = state.vp * ratio || 0;
}

/**
 * The state of a transformer after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for. A phase can close or open the switch (at its start)
 * and wind turns on or off the secondary coil (steadily, over the phase). Time passes at `rate`
 * seconds of the model for each second of video, and only while a clip plays.
 */
export function transformerAt(el: TransformerEl, plays: Plays = []): TransformerState {
  const rate = el.rate ?? 0.005;
  const sweep = sweepOf(el);
  const state: TransformerState = { time: 0, on: el.on ?? !el.dc, since: 0, level: 0, secondary: el.turns[1], flux: 0, vp: 0, vs: 0, trace: [] };
  settle(el, state);
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      if (ph.on !== undefined && ph.on !== state.on) {
        // The flux carries on from where it was when the switch moved.
        state.level = el.dc ? state.flux : 0;
        state.on = ph.on;
        state.since = state.time;
      }
      const from = state.secondary;
      const played = Math.min(left, ph.dur);
      const steps = Math.max(1, Math.ceil(played * STEPS));
      const h = played / steps;
      for (let k = 0; k < steps; k++) {
        state.time += h * rate;
        if (ph.secondary !== undefined) state.secondary = Math.round(from + (ph.secondary - from) * Math.min(1, ((k + 1) * h) / ph.dur));
        settle(el, state);
        const into = state.time % sweep;
        if (state.trace.length && into < state.trace[state.trace.length - 1][0]) state.trace = [];
        state.trace.push([into, state.vp, state.vs]);
      }
      left -= ph.dur;
    }
  }
  return state;
}

/**
 * The voltage of the secondary coil, in volts: Vs = Vp × Ns ÷ Np for an alternating supply, and
 * the size of the kick at this moment for a battery (nothing once the kick has died away to a
 * hundredth of its first size).
 */
export function secondaryVolts(el: TransformerEl, state: TransformerState): number {
  if (el.dc) return Math.abs(state.vs) < (0.01 * el.volts * state.secondary) / el.turns[0] ? 0 : Math.abs(state.vs);
  return state.on ? (el.volts * state.secondary) / el.turns[0] : 0;
}

/** The current in the secondary circuit, Is = Vs ÷ R, in amperes (none without a load). */
export const secondaryAmps = (el: TransformerEl, state: TransformerState) => (el.load ? secondaryVolts(el, state) / el.load : 0);

/** The power the secondary gives its load, VsIs, in watts. An ideal transformer takes the same power from its supply. */
export const transformerWatts = (el: TransformerEl, state: TransformerState) => secondaryVolts(el, state) * secondaryAmps(el, state);

/** The current in the primary coil of an ideal transformer, from VpIp = VsIs, in amperes. */
export function primaryAmps(el: TransformerEl, state: TransformerState): number {
  if (el.dc || !state.on || !(el.volts > 0)) return 0;
  return transformerWatts(el, state) / el.volts;
}

/** The largest voltage either coil has in any clip, in volts: the two traces are drawn to this scale. */
export function peakVolts(el: TransformerEl): number {
  let most = el.turns[1];
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) if (ph.secondary !== undefined) most = Math.max(most, ph.secondary);
  return el.volts * Math.max(1, most / el.turns[0]);
}

export interface PowerlineState {
  /** The voltage of the line now, in volts. */
  volts: number;
  /** The current in the line, I = P ÷ V, in amperes. */
  amps: number;
  /** The power wasted as heat in the line, I²R, in watts. */
  loss: number;
  /** How far the current has carried the dots that mark it: amperes × seconds of video. */
  drift: number;
}

/** The current in the line at a voltage, I = P ÷ V, and the power it wastes, I²R. */
export const lineAmps = (el: PowerlineEl, volts: number) => el.watts / volts;
export const lineLoss = (el: PowerlineEl, volts: number) => lineAmps(el, volts) ** 2 * el.ohms;

/**
 * The state of a power line after its clips. A phase steps the voltage of the line up or down to
 * a new value, by the same factor in each moment (so 4000 V to 40 000 V passes 12 600 V half way).
 */
export function powerlineAt(el: PowerlineEl, plays: Plays = []): PowerlineState {
  let volts = el.volts;
  let drift = 0;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const from = volts;
      const played = Math.min(left, ph.dur);
      const steps = Math.max(1, Math.ceil(played * 60));
      const h = played / steps;
      for (let k = 0; k < steps; k++) {
        if (ph.volts !== undefined) volts = from * (ph.volts / from) ** Math.min(1, ((k + 0.5) * h) / ph.dur);
        drift += lineAmps(el, volts) * h;
      }
      if (ph.volts !== undefined) volts = from * (ph.volts / from) ** Math.min(1, left / ph.dur);
      left -= ph.dur;
    }
  }
  return { volts, amps: lineAmps(el, volts), loss: lineLoss(el, volts), drift };
}

/** The largest current the line carries, at the start or by the end of any phase, in amperes. */
export function peakLineAmps(el: PowerlineEl): number {
  let least = el.volts;
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) if (ph.volts !== undefined) least = Math.min(least, ph.volts);
  return lineAmps(el, least);
}
