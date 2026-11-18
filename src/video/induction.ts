/**
 * The physics of an induction element (see InductionEl in script.ts): a circuit in a magnetic
 * field that points through the page. The flux through the circuit is Φ = BA, where A is the part
 * of its area that the field passes through, and while the flux changes an emf is induced in it,
 * ε = NΔΦ ÷ Δt (Faraday's law). For a rod of length L that slides along two rails at a speed v,
 * the area grows by Lv each second, so ε = BLv. The emf drives a current I = ε ÷ R the way that
 * opposes the change (Lenz's law), and the field pushes on the rod with F = BIL, against its
 * motion. A rod that is let go slows down under that force, step by step. A pure function of the
 * clips and the seconds played, like the rest of the stage.
 */
import type { InductionEl } from './script.ts';

export interface InductionState {
  /** Seconds of the model that have passed. */
  time: number;
  /** The field now, in teslas (positive comes out of the page). */
  tesla: number;
  /** How fast the field is changing, in teslas per second. */
  rising: number;
  /** Where the rod is, in the element's length unit, and its velocity in metres per second (positive is to the right). */
  rod: number;
  v: number;
  /** How far the current has carried the arrowheads that mark it: amperes × seconds of video (anticlockwise is positive). */
  drift: number;
}

/** The clips played so far, in order, each with the seconds of video it has run for. */
export type InductionPlays = Array<[clip: string, seconds: number]>;

/** Steps of the model for each second of video. */
const STEPS = 240;

const overlap = (a0: number, a1: number, b0: number, b1: number) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));

/** The sides of the circuit now: [left, right, bottom, top], in the length unit. */
export function circuitRect(el: InductionEl, state: InductionState): [number, number, number, number] {
  if (el.loop) return el.loop.rect;
  if (el.rails) return [el.rails.x[0], state.rod, el.rails.y[0], el.rails.y[1]];
  return [0, 0, 0, 0];
}

/** The part of the circuit that the field passes through: [left, right, bottom, top], or null when the field misses it. */
export function fluxRect(el: InductionEl, state: InductionState): [number, number, number, number] | null {
  const [l, r, b, t] = circuitRect(el, state);
  const [fl, fr, fb, ft] = el.region ?? el.view;
  const [left, right, bottom, top] = [Math.max(l, fl), Math.min(r, fr), Math.max(b, fb), Math.min(t, ft)];
  return right > left && top > bottom ? [left, right, bottom, top] : null;
}

/** The area of the circuit that the field passes through, in square metres. */
export function fluxArea(el: InductionEl, state: InductionState): number {
  const metres = el.length?.metres ?? 1;
  const rect = fluxRect(el, state);
  return rect ? (rect[1] - rect[0]) * (rect[3] - rect[2]) * metres * metres : 0;
}

/** The flux through one turn of the circuit, Φ = BA, in webers (positive comes out of the page). */
export const fluxOf = (el: InductionEl, state: InductionState) => state.tesla * fluxArea(el, state);

/** The length of the rod that lies in the field between the rails, in metres (none when the rod is outside the field). */
export function rodLength(el: InductionEl, state: InductionState): number {
  if (!el.rails) return 0;
  const metres = el.length?.metres ?? 1;
  const [fl, fr, fb, ft] = el.region ?? el.view;
  if (state.rod < fl || state.rod > fr) return 0;
  return overlap(el.rails.y[0], el.rails.y[1], fb, ft) * metres;
}

/**
 * The emf induced in the circuit, in volts: minus the rate at which the flux through it changes,
 * for each of its turns. It is positive when it drives a current anticlockwise round the circuit,
 * which makes a field out of the page inside it. The flux changes as the field changes (A × ΔB ÷ Δt)
 * and as the rod sweeps out more area (BLv).
 */
export function emfOf(el: InductionEl, state: InductionState): number {
  const turns = el.loop?.turns ?? 1;
  return -turns * (fluxArea(el, state) * state.rising + state.tesla * rodLength(el, state) * state.v) || 0;
}

/** The induced current in amperes, I = ε ÷ R (anticlockwise is positive; none in a coil that is joined only to a meter). */
export function ampsOf(el: InductionEl, state: InductionState): number {
  const ohms = el.loop ? el.loop.ohms : el.rails?.ohms;
  return ohms ? emfOf(el, state) / ohms : 0;
}

/**
 * The force of the field on the rod, in newtons along x: F = BIL. An anticlockwise current goes up
 * the rod, and a field out of the page then pushes the rod to the right; the induced current
 * always gives a force against the motion of the rod.
 */
export const rodForce = (el: InductionEl, state: InductionState) => ampsOf(el, state) * rodLength(el, state) * state.tesla || 0;

/**
 * The state of an induction element after its clips: `plays` lists each clip played so far, in
 * order, with the seconds of video it has run for. Within a phase the field and the speed of the
 * rod change at a steady rate, and the rod moves at `rate` seconds of the model for each second of
 * video. A rod that is let go is slowed by the force on it. The rod stops at the ends of the rails.
 * A clip with `reset` starts from the first picture again.
 */
export function inductionAt(el: InductionEl, plays: InductionPlays = []): InductionState {
  const metres = el.length?.metres ?? 1;
  const rate = el.rate ?? 1;
  const state: InductionState = { time: 0, tesla: el.tesla, rising: 0, rod: el.rails?.rod ?? 0, v: el.rails?.speed ?? 0, drift: 0 };
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    // A clip that starts again puts the field and the rod back where they began (the arrowheads of the current carry on from where they were).
    if (clip.reset) Object.assign(state, { tesla: el.tesla, rising: 0, rod: el.rails?.rod ?? 0, v: el.rails?.speed ?? 0 });
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const from = { tesla: state.tesla, v: state.v };
      const played = Math.min(left, ph.dur);
      const steps = Math.max(1, Math.ceil(played * STEPS));
      const h = played / steps;
      const dt = h * rate;
      state.rising = ph.tesla !== undefined ? (ph.tesla - from.tesla) / (ph.dur * rate) : 0;
      for (let k = 0; k < steps; k++) {
        const f = ((k + 0.5) * h) / ph.dur;
        if (ph.tesla !== undefined) state.tesla = from.tesla + (ph.tesla - from.tesla) * f;
        if (el.rails) {
          if (ph.speed !== undefined) state.v = from.v + (ph.speed - from.v) * f;
          else if (ph.free && el.rails.mass !== undefined) {
            // F = −(B²L² ÷ R)v: taken at the end of the step, so that a strong field cannot make the rod overshoot.
            const length = rodLength(el, state);
            state.v /= 1 + ((state.tesla * state.tesla * length * length) / (el.rails.ohms * el.rails.mass)) * dt;
          }
          state.drift += ampsOf(el, state) * h;
          state.rod += (state.v * dt) / metres;
          const [start, end] = el.rails.x;
          const room = (end - start) * 0.02;
          if (state.rod <= start + room || state.rod >= end - room) {
            state.rod = Math.min(end - room, Math.max(start + room, state.rod));
            state.v = 0;
          }
        } else state.drift += ampsOf(el, state) * h;
      }
      const f = Math.min(1, left / ph.dur);
      if (ph.tesla !== undefined) state.tesla = from.tesla + (ph.tesla - from.tesla) * f;
      if (el.rails && ph.speed !== undefined && state.v !== 0) state.v = from.v + (ph.speed - from.v) * f;
      // Once the phase is over the field is steady again.
      if (left >= ph.dur) state.rising = 0;
      state.time += played * rate;
      left -= ph.dur;
    }
  }
  return state;
}

/** The strongest field the element ever has: at the start, or by the end of any phase. */
export function peakTesla(el: InductionEl): number {
  let top = Math.abs(el.tesla);
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) if (ph.tesla !== undefined) top = Math.max(top, Math.abs(ph.tesla));
  return top;
}
