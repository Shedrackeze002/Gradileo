/**
 * The physics of a flight element (see FlightEl in script.ts): where every body is and how fast it
 * moves, in two dimensions, at any moment of the clips played so far. A body in flight under
 * gravity keeps its horizontal velocity and gains downward velocity at g; a body carried by a
 * stream moves with its own velocity plus the stream's. Each phase is worked out exactly from
 * where the last one ended, so the picture and the equations of motion cannot disagree. It is a
 * pure function of the clips and the seconds played, like the rest of the stage.
 */
import type { FlightBody, FlightEl } from './script.ts';

export interface FlightBodyState {
  /** Where it is. */
  x: number;
  y: number;
  /** Its velocity over the ground (with the stream's, when it is carried). */
  vx: number;
  vy: number;
  /** Its own velocity, through the water or the air (the same as vx and vy with no stream). */
  ownX: number;
  ownY: number;
  /** How far the stream has carried it, as [x, y]: the rest of its displacement is its own doing. */
  driftX: number;
  driftY: number;
  /** Under gravity: in flight (let go or launched, and not yet landed), and landed. */
  flying: boolean;
  landed: boolean;
  /** Stopped by a phase (a boat that has reached the bank): at rest, and no longer carried. */
  stopped: boolean;
}

export interface FlightState {
  bodies: Record<string, FlightBodyState>;
  /** The element's own time since it started (or was last put back). */
  time: number;
  /** Where each body has been, as [x, y] points along its path. */
  trails: Record<string, Array<[number, number]>>;
  /** Where each body was at every strobe step while it moved. */
  marks: Record<string, Array<[number, number]>>;
  /** How far the stream has carried the water or the air, as [x, y]. */
  flow: [number, number];
  /** The slow-motion factor of the phase being played, and its note. */
  slow: number;
  note: string | undefined;
}

/** Whether the stream carries a body. */
export const carried = (el: FlightEl, b: FlightBody): boolean => !!el.stream && (!el.stream.of || el.stream.of.includes(b.id));

/** The stream's velocity on a body: zero when it is not carried. */
const drift = (el: FlightEl, b: FlightBody): [number, number] => (carried(el, b) ? el.stream!.v : [0, 0]);

/**
 * When a body in flight from height y with vertical velocity vy reaches the ground (y = 0) under
 * gravity g: the positive root of y + vy t − ½ g t² = 0.
 */
export function landingTime(y: number, vy: number, g: number): number {
  return (vy + Math.sqrt(vy * vy + 2 * g * Math.max(0, y))) / g;
}

/**
 * The state of a flight element after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for (a clip not yet finished is the last one).
 */
export function flightAt(el: FlightEl, plays: Array<[clip: string, seconds: number]> = []): FlightState {
  const g = el.gravity ?? 0;
  const step = el.strobe ?? 0.5;
  const bodies: Record<string, FlightBodyState> = {};
  const trails: FlightState['trails'] = {};
  const marks: FlightState['marks'] = {};
  let time = 0;
  let flow: [number, number] = [0, 0];
  let slow = 1;
  let note: string | undefined;
  const start = () => {
    for (const b of el.bodies) {
      const [sx, sy] = drift(el, b);
      const [vx, vy] = b.v ?? [0, 0];
      bodies[b.id] = { x: b.at[0], y: b.at[1], vx: vx + sx, vy: vy + sy, ownX: vx, ownY: vy, driftX: 0, driftY: 0, flying: g > 0 && !!b.v, landed: false, stopped: false };
      trails[b.id] = [[b.at[0], b.at[1]]];
      marks[b.id] = [];
    }
    time = 0;
    flow = [0, 0];
  };
  start();

  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    if (clip.reset) start();
    let left = seconds;
    note = undefined;
    slow = 1;
    for (const ph of clip.phases) {
      if (left < 0) break;
      const rate = ph.freeze ? 1 : (ph.slow ?? 1);
      const video = ph.dur * rate;
      const run = Math.min(left, video);
      // The note and the pace of the phase that is playing; they go when the clip has finished.
      note = left < video ? ph.note : undefined;
      slow = left < video ? rate : 1;
      left -= video;
      // What the phase sets takes hold as it starts, frozen or not, so the arrows can be named first.
      for (const b of el.bodies) {
        const s = bodies[b.id];
        const v = ph.set?.[b.id];
        if (v) {
          const [sx, sy] = drift(el, b);
          Object.assign(s, { ownX: v[0], ownY: v[1], vx: v[0] + sx, vy: v[1] + sy, landed: false, stopped: false, flying: g > 0 });
        }
        if (g > 0 && ph.release?.includes(b.id) && !s.landed) s.flying = true;
        if (ph.stop?.includes(b.id)) Object.assign(s, { vx: 0, vy: 0, ownX: 0, ownY: 0, flying: false, stopped: true });
      }
      if (ph.freeze) continue;
      const tau = run / rate;
      if (tau <= 0) continue;
      for (const b of el.bodies) {
        const s = bodies[b.id];
        const falls = g > 0 && s.flying;
        const moving = falls || s.vx !== 0 || s.vy !== 0;
        if (!moving) continue;
        // How long it moves in this phase: a body in flight stops where it lands.
        const end = falls ? Math.min(tau, landingTime(s.y, s.vy, g)) : tau;
        const at = (t: number): [number, number] => [s.x + s.vx * t, s.y + s.vy * t - (falls ? 0.5 * g * t * t : 0)];
        // The path, a point for each frame of video, and the strobe marks at equal steps of the element's time.
        const points = Math.min(600, Math.max(1, Math.ceil(end * rate * 30)));
        for (let i = 1; i <= points; i++) trails[b.id].push(at((end * i) / points));
        const first = Math.ceil((time - 1e-9) / step);
        for (let k = first; k * step <= time + end + 1e-9; k++) {
          const m = at(Math.max(0, k * step - time));
          // A step that falls where two phases meet is marked once.
          const last = marks[b.id][marks[b.id].length - 1];
          if (!last || Math.hypot(last[0] - m[0], last[1] - m[1]) > 1e-9) marks[b.id].push(m);
        }
        const [x, y] = at(end);
        const [sx, sy] = drift(el, b);
        s.driftX += sx * end;
        s.driftY += sy * end;
        const landed = falls && end < tau - 1e-12;
        Object.assign(s, landed ? { x, y: 0, vx: 0, vy: 0, ownX: 0, ownY: 0, flying: false, landed: true } : { x, y, vy: s.vy - (falls ? g * end : 0), ownY: s.ownY - (falls ? g * end : 0) });
      }
      time += tau;
      if (el.stream) flow = [flow[0] + el.stream.v[0] * tau, flow[1] + el.stream.v[1] * tau];
    }
  }
  return { bodies, time, trails, marks, flow, slow, note };
}

/** The fastest velocity a script gives any body, with the stream's, for the scale of the arrows. */
export function fastest(el: FlightEl): number {
  let top = 0;
  const see = (b: FlightBody, v: [number, number]) => {
    const [sx, sy] = drift(el, b);
    top = Math.max(top, Math.hypot(v[0], v[1]), Math.hypot(v[0] + sx, v[1] + sy), Math.hypot(sx, sy));
  };
  for (const b of el.bodies) {
    see(b, b.v ?? [0, 0]);
    for (const clip of Object.values(el.clips)) for (const ph of clip.phases) if (ph.set?.[b.id]) see(b, ph.set[b.id]);
  }
  return top;
}
