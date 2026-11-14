/**
 * The physics of a motion element (see MotionEl in script.ts): where every body is, how fast it
 * moves and which forces act on it, at any moment of the clips played so far. The motion comes
 * from the forces drawn, a = F ÷ m in each phase, so the picture and the physics cannot disagree.
 * It is a pure function of the clips and the seconds played, like the rest of the stage.
 */
import type { MotionBody, MotionEl, MotionForce, MotionPhase } from './script.ts';

/** A body's length in metres when the script gives none. */
export const BODY_WIDTH: Record<MotionBody['shape'], number> = { block: 0.9, cart: 1.1, ball: 0.6 };

export const widthOf = (b: MotionBody): number => b.width ?? BODY_WIDTH[b.shape];

export interface BodyState {
  /** Its centre, in metres. */
  x: number;
  /** Velocity in metres per second, and acceleration in metres per second squared. */
  v: number;
  a: number;
}

export interface MotionState {
  bodies: Record<string, BodyState>;
  /** The forces acting now, each with the seconds of video it has been acting (arrows grow in). */
  forces: Array<MotionForce & { age: number }>;
  /** Seconds of the motion's own time since it started (or was last put back). */
  time: number;
  /** Where each body was at every strobe step so far. */
  marks: Record<string, number[]>;
  /** Each body's velocity against time so far, as [seconds, metres per second], for a graph. */
  trace: Record<string, Array<[number, number]>>;
  /** The slow-motion factor of the phase being played, and its note. */
  slow: number;
  note: string | null;
  /** The last collision: where the bodies touched, and the seconds of video since. */
  contact: { x: number; age: number } | null;
}

const EPS = 1e-9;
/** The longest step between points of a velocity graph, in seconds. */
const TRACE_STEP = 0.05;

/** The sum of the forces on a body along the track, in newtons. */
export function netForce(forces: MotionForce[], id: string, moving: (f: MotionForce) => boolean = () => true): number {
  return forces.reduce((n, f) => (f.on === id && f.axis !== 'y' && moving(f) ? n + f.n : n), 0);
}

/**
 * Moves one body through `dt` seconds of a phase. A resisting force (friction) acts only while
 * the body moves: once it has brought the body to rest, the body stays at rest unless the other
 * forces are larger than it.
 */
function advance(b: MotionBody, s: BodyState, forces: MotionForce[], dt: number): BodyState {
  const mine = forces.filter((f) => f.on === b.id && f.axis !== 'y');
  const drive = mine.filter((f) => !f.resist).reduce((n, f) => n + f.n, 0);
  const resist = mine.filter((f) => f.resist).reduce((n, f) => n + Math.abs(f.n), 0);
  let { x, v } = s;
  let left = dt;
  // At rest, friction holds the body unless the push beats it.
  const fromRest = () => (Math.abs(drive) > resist ? (drive - Math.sign(drive) * resist) / b.mass : 0);
  if (Math.abs(v) < EPS) {
    const a = fromRest();
    return { x: x + 0.5 * a * left * left, v: a * left, a };
  }
  const a = (drive - Math.sign(v) * resist) / b.mass;
  // Friction never turns a body round: it stops the body, then the rule for a body at rest applies.
  if (resist > 0 && a * v < 0) {
    const stop = -v / a;
    if (stop <= left) {
      x += v * stop + 0.5 * a * stop * stop;
      left -= stop;
      v = 0;
      const a2 = fromRest();
      return { x: x + 0.5 * a2 * left * left, v: a2 * left, a: a2 };
    }
  }
  return { x: x + v * left + 0.5 * a * left * left, v: v + a * left, a };
}

/** The forces that are acting on bodies as they are now: friction disappears with the motion. */
function acting(el: MotionEl, bodies: Record<string, BodyState>, forces: MotionForce[]): MotionForce[] {
  return forces.filter((f) => {
    if (!f.resist) return true;
    const b = el.bodies.find((q) => q.id === f.on);
    if (!b) return false;
    if (Math.abs(bodies[b.id].v) > EPS) return true;
    // At rest, friction shows only while a push it is holding back acts.
    return Math.abs(netForce(forces, b.id, (g) => !g.resist)) > EPS;
  });
}

const start = (el: MotionEl): Record<string, BodyState> => Object.fromEntries(el.bodies.map((b) => [b.id, { x: b.x, v: b.v ?? 0, a: 0 }]));

/** The state of a motion after its clips have been played for the seconds given, in order. */
export function motionAt(el: MotionEl, plays: Array<[clip: string, seconds: number]> = []): MotionState {
  const step = el.strobe ?? 0.5;
  let bodies = start(el);
  let time = 0;
  let marks: Record<string, number[]> = Object.fromEntries(el.bodies.map((b) => [b.id, [b.x]]));
  const fresh = (): MotionState['trace'] => Object.fromEntries(el.bodies.map((b) => [b.id, [[0, b.v ?? 0] as [number, number]]]));
  let trace = fresh();
  let forces: MotionState['forces'] = [];
  let slow = 1;
  let note: string | null = null;
  let contact: MotionState['contact'] = null;
  // How long each force has been acting, in seconds of video: a force that carries on from one
  // phase or clip into the next keeps its arrow, and only a new one grows in.
  let ages = new Map<string, number>();
  const keyOf = (f: MotionForce) => `${f.on}|${f.name}|${f.axis ?? 'x'}|${f.n}`;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Motion "${el.id}" has no clip "${name}".`);
    if (clip.reset) {
      bodies = start(el);
      time = 0;
      marks = Object.fromEntries(el.bodies.map((b) => [b.id, [b.x]]));
      contact = null;
      ages = new Map();
      trace = fresh();
    }
    let left = Math.max(0, seconds);
    for (const [pi, ph] of clip.phases.entries()) {
      if (pi > 0 && left <= EPS) break;
      const k = ph.slow ?? 1;
      for (const [id, v] of Object.entries(ph.set ?? {})) bodies[id] = { ...bodies[id], v };
      if (ph.contact) {
        const [a, b] = ph.contact.map((id) => el.bodies.find((q) => q.id === id)!);
        const [l, r] = bodies[a.id].x <= bodies[b.id].x ? [a, b] : [b, a];
        contact = { x: (bodies[l.id].x + widthOf(l) / 2 + bodies[r.id].x - widthOf(r) / 2) / 2, age: 0 };
      }
      // A frozen phase takes its time on the video only: the motion's own clock stands still.
      const dt = ph.freeze ? 0 : Math.min(left / k, ph.dur);
      const list = ph.forces ?? [];
      // Strobe marks at equal steps of the motion's time; a body that changes pace inside a
      // phase (stopped by friction) is followed mark by mark.
      let done = 0;
      // A velocity set at the start of the phase is a step on the graph.
      if (ph.set) for (const id of Object.keys(ph.set)) trace[id].push([time, bodies[id].v]);
      while (done < dt - EPS) {
        const next = (Math.floor((time + done) / step + EPS) + 1) * step - time;
        // Short steps, so the graph follows a body that friction stops part way through.
        const h = Math.min(dt, next, done + TRACE_STEP) - done;
        for (const b of el.bodies) bodies[b.id] = advance(b, bodies[b.id], list, h);
        done += h;
        for (const b of el.bodies) trace[b.id].push([time + done, bodies[b.id].v]);
        if (Math.abs(done - next) < EPS) for (const b of el.bodies) marks[b.id].push(bodies[b.id].x);
      }
      if (dt <= EPS && !ph.freeze) for (const b of el.bodies) bodies[b.id] = advance(b, bodies[b.id], list, 0);
      if (ph.freeze) for (const b of el.bodies) bodies[b.id] = { ...bodies[b.id], a: 0 };
      time += dt;
      const age = ph.freeze ? Math.min(left, ph.dur) : dt * k;
      const now = acting(el, bodies, list);
      ages = new Map(now.map((f) => [keyOf(f), (ages.get(keyOf(f)) ?? 0) + age]));
      forces = now.map((f) => ({ ...f, age: ages.get(keyOf(f))! }));
      slow = k;
      note = ph.note ?? null;
      if (contact) contact = { ...contact, age: ph.contact ? age : contact.age + age };
      left -= age;
    }
  }
  // Many short steps leave a little rounding noise (5.000000000000001 m): drop it.
  const tidy = (n: number) => Math.round(n * 1e9) / 1e9 + 0;
  for (const [id, b] of Object.entries(bodies)) bodies[id] = { x: tidy(b.x), v: tidy(b.v), a: tidy(b.a) };
  return { bodies, forces, time: tidy(time), marks, trace, slow, note, contact };
}

export interface CollisionOptions {
  /** They stick together, or bounce apart with no energy lost. */
  type: 'stick' | 'bounce';
  /** Seconds of motion shown after they part or join. */
  after: number;
  /** Slow motion while they touch (seconds of video for each second of motion). */
  slow?: number;
  /** How far the bumpers squeeze, in metres (0.16 by default); it sets how long they touch. */
  squeeze?: number;
  note?: string;
  /** Names for the two forces while they touch ("A on B", "B on A"). */
  names?: [onFirst: string, onSecond: string];
  /** Draw no arrows for the forces: at full speed they would only flash for a few frames. */
  hidden?: boolean;
}

/**
 * The phases of a head-on collision between two bodies on the same track: the approach, the
 * moment they touch (equal and opposite forces, drawn, which change both velocities) and what
 * follows. `a` is the body on the left. Momentum is conserved because the two forces are equal,
 * opposite and act for the same time; nothing here sets the final velocities by hand.
 */
export function collision(a: MotionBody, b: MotionBody, o: CollisionOptions): MotionPhase[] {
  const va = a.v ?? 0;
  const vb = b.v ?? 0;
  const closing = va - vb;
  const gap = b.x - widthOf(b) / 2 - (a.x + widthOf(a) / 2);
  if (!(closing > 0) || gap < 0) throw new Error(`"${a.id}" does not catch up with "${b.id}".`);
  const squeeze = o.squeeze ?? 0.16;
  // With a steady force the gap closes at a falling pace: it squeezes closing·t/2 if they end
  // together, and closing·t/4 at most if they bounce (the pace of closing reverses half way).
  const touch = o.type === 'stick' ? (2 * squeeze) / closing : (4 * squeeze) / closing;
  const total = a.mass + b.mass;
  const vbAfter = o.type === 'stick' ? (a.mass * va + b.mass * vb) / total : (2 * a.mass * va + (b.mass - a.mass) * vb) / total;
  const force = (b.mass * (vbAfter - vb)) / touch;
  const [onA, onB] = o.names ?? [`${b.label ?? b.id} on ${a.label ?? a.id}`, `${a.label ?? a.id} on ${b.label ?? b.id}`];
  return [
    ...(gap > EPS ? [{ dur: gap / closing }] : []),
    {
      dur: touch,
      slow: o.slow,
      contact: [a.id, b.id],
      note: o.note,
      forces: [
        { on: a.id, name: onA, n: -force, tone: 'bad' as const, ...(o.hidden ? { hidden: true } : {}) },
        { on: b.id, name: onB, n: force, tone: 'good' as const, ...(o.hidden ? { hidden: true } : {}) },
      ],
    },
    { dur: o.after },
  ];
}
