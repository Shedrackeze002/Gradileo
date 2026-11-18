/**
 * The physics of a flight element (see FlightEl in script.ts): where every body is and how fast it
 * moves, in two dimensions, at any moment of the clips played so far. A body in flight under
 * gravity keeps its horizontal velocity and gains downward velocity at g; a body carried by a
 * stream moves with its own velocity plus the stream's. Each phase is worked out exactly from
 * where the last one ended, so the picture and the equations of motion cannot disagree. It is a
 * pure function of the clips and the seconds played, like the rest of the stage.
 *
 * Bodies with a mass can collide (`collisions`) or be blown apart (a phase's `kick`). A collision
 * is found at the exact moment two discs touch, and each gets an equal and opposite impulse along
 * the line through their centres, so the total momentum is the same after it in every direction:
 * nothing here sets a velocity after a collision by hand.
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
  /** The way it last set off, in degrees anticlockwise from east: a car keeps pointing this way when it is locked to another. */
  heading: number;
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
  /** The last collision or explosion: the element's time when it happened, and where. */
  hit: { t: number; x: number; y: number } | undefined;
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

/** The radius of a body with a mass, in the length unit. */
export const radiusOf = (b: FlightBody): number => b.radius ?? 0.5;

const headingOf = (vx: number, vy: number, otherwise: number): number => (Math.hypot(vx, vy) > 1e-9 ? (Math.atan2(vy, vx) * 180) / Math.PI : otherwise);

/**
 * When two discs that move steadily first touch, within the time given: the smaller root of
 * |d + u t| = the sum of their radii, where d is the line between their centres and u their
 * relative velocity. Discs that are moving apart, or that miss, never do.
 */
export function touchTime(a: FlightBodyState, ra: number, b: FlightBodyState, rb: number, within: number): number | undefined {
  const [dx, dy] = [b.x - a.x, b.y - a.y];
  const [ux, uy] = [b.vx - a.vx, b.vy - a.vy];
  const closing = dx * ux + dy * uy;
  if (closing >= -1e-12) return undefined;
  const gap = dx * dx + dy * dy - (ra + rb) ** 2;
  if (gap <= 0) return 0;
  const uu = ux * ux + uy * uy;
  const inside = closing * closing - uu * gap;
  if (inside < 0) return undefined;
  const t = (-closing - Math.sqrt(inside)) / uu;
  return t <= within ? t : undefined;
}

/**
 * The momentum of each body with a mass as [east, north], their total, and their centre of mass
 * (undefined when no body has a mass).
 */
export function momentumOf(el: FlightEl, state: FlightState): { of: Record<string, [number, number]>; total: [number, number]; centre: [number, number] | undefined } {
  const of: Record<string, [number, number]> = {};
  let [px, py, mx, my, m] = [0, 0, 0, 0, 0];
  for (const b of el.bodies) {
    if (b.mass === undefined) continue;
    const s = state.bodies[b.id];
    of[b.id] = [b.mass * s.vx, b.mass * s.vy];
    px += b.mass * s.vx;
    py += b.mass * s.vy;
    mx += b.mass * s.x;
    my += b.mass * s.y;
    m += b.mass;
  }
  return { of, total: [px, py], centre: m > 0 ? [mx / m, my / m] : undefined };
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
  let hit: FlightState['hit'];
  const massive = el.bodies.filter((b) => b.mass !== undefined);
  const start = () => {
    for (const b of el.bodies) {
      const [sx, sy] = drift(el, b);
      const [vx, vy] = b.v ?? [0, 0];
      bodies[b.id] = { x: b.at[0], y: b.at[1], vx: vx + sx, vy: vy + sy, ownX: vx, ownY: vy, driftX: 0, driftY: 0, flying: g > 0 && !!b.v, landed: false, stopped: false, heading: headingOf(vx, vy, 0) };
      trails[b.id] = [[b.at[0], b.at[1]]];
      marks[b.id] = [];
    }
    time = 0;
    flow = [0, 0];
    hit = undefined;
  };
  start();

  // Two discs touch: equal and opposite impulses along the line through their centres. They part
  // at the restitution times the speed at which they closed along that line, or lock together.
  const collide = (a: FlightBody, b: FlightBody) => {
    const [sa, sb] = [bodies[a.id], bodies[b.id]];
    const [ma, mb] = [a.mass!, b.mass!];
    const d = Math.hypot(sb.x - sa.x, sb.y - sa.y) || 1;
    const [nx, ny] = [(sb.x - sa.x) / d, (sb.y - sa.y) / d];
    if (el.collisions!.stick) {
      // Locked together, the two move with the velocity of their centre of mass: the impulse
      // between them is whatever brings both to it.
      const [vx, vy] = [(ma * sa.vx + mb * sb.vx) / (ma + mb), (ma * sa.vy + mb * sb.vy) / (ma + mb)];
      for (const s of [sa, sb]) Object.assign(s, { vx, vy, ownX: vx, ownY: vy });
    } else {
      const closing = (sa.vx - sb.vx) * nx + (sa.vy - sb.vy) * ny;
      const impulse = ((1 + (el.collisions!.restitution ?? 1)) * closing) / (1 / ma + 1 / mb);
      sa.vx -= (impulse / ma) * nx;
      sa.vy -= (impulse / ma) * ny;
      sb.vx += (impulse / mb) * nx;
      sb.vy += (impulse / mb) * ny;
      for (const s of [sa, sb]) Object.assign(s, { ownX: s.vx, ownY: s.vy, heading: headingOf(s.vx, s.vy, s.heading) });
    }
    hit = { t: time, x: sa.x + nx * radiusOf(a), y: sa.y + ny * radiusOf(a) };
  };

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
          Object.assign(s, { ownX: v[0], ownY: v[1], vx: v[0] + sx, vy: v[1] + sy, landed: false, stopped: false, flying: g > 0, heading: headingOf(v[0], v[1], s.heading) });
        }
        if (g > 0 && ph.release?.includes(b.id) && !s.landed) s.flying = true;
        if (ph.stop?.includes(b.id)) Object.assign(s, { vx: 0, vy: 0, ownX: 0, ownY: 0, flying: false, stopped: true });
      }
      // An explosion: each piece gets its impulse, and its velocity changes by the impulse ÷ its mass.
      const kicked = ph.kick ? el.bodies.filter((b) => b.mass !== undefined && ph.kick![b.id]) : [];
      for (const b of kicked) {
        const s = bodies[b.id];
        const [jx, jy] = ph.kick![b.id];
        Object.assign(s, { vx: s.vx + jx / b.mass!, vy: s.vy + jy / b.mass!, ownX: s.ownX + jx / b.mass!, ownY: s.ownY + jy / b.mass! });
        s.heading = headingOf(s.vx, s.vy, s.heading);
      }
      if (kicked.length) hit = { t: time, x: kicked.reduce((n, b) => n + bodies[b.id].x, 0) / kicked.length, y: kicked.reduce((n, b) => n + bodies[b.id].y, 0) / kicked.length };
      if (ph.freeze) continue;
      const whole = run / rate;
      if (whole <= 0) continue;
      const advance = (tau: number) => {
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
      };
      // Move everything up to the next moment two bodies touch, let them collide, and go on.
      let rest = whole;
      for (let hits = 0; rest > 1e-12; hits++) {
        let next: { t: number; a: FlightBody; b: FlightBody } | undefined;
        if (el.collisions && hits < 200) {
          for (let i = 0; i < massive.length; i++) {
            for (let j = i + 1; j < massive.length; j++) {
              const t = touchTime(bodies[massive[i].id], radiusOf(massive[i]), bodies[massive[j].id], radiusOf(massive[j]), rest);
              if (t !== undefined && (!next || t < next.t)) next = { t, a: massive[i], b: massive[j] };
            }
          }
        }
        const dt = next ? next.t : rest;
        if (dt > 0) advance(dt);
        if (next) collide(next.a, next.b);
        rest -= dt;
      }
    }
  }
  return { bodies, time, trails, marks, flow, slow, note, hit };
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
