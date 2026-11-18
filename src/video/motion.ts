/**
 * The physics of a motion element (see MotionEl in script.ts): where every body is, how fast it
 * moves and which forces act on it, at any moment of the clips played so far. The motion comes
 * from the forces drawn, a = F ÷ m in each phase, so the picture and the physics cannot disagree.
 * It is a pure function of the clips and the seconds played, like the rest of the stage.
 */
import { trackOf } from './path.ts';
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
  /** Each body's distance travelled against time so far, as [seconds, metres], for a graph. */
  path: Record<string, Array<[number, number]>>;
  /** Each body's position along the track against time so far, as [seconds, metres], for a graph. */
  place: Record<string, Array<[number, number]>>;
  /**
   * For a force-displacement graph: the force on each body against the distance it has moved (or,
   * for a body on a spring, the size of the spring's force against its extension), as [metres, newtons].
   */
  pull: Record<string, Array<[number, number]>>;
  /** For a force-time graph: the force on its body against time so far, as [seconds, newtons]. */
  push: Record<string, Array<[number, number]>>;
  /** How far each body has travelled along the track, in metres: every metre counts, whichever way it went. */
  travelled: Record<string, number>;
  /** Where each body started, then every place it turned round, in metres. */
  turns: Record<string, number[]>;
  /** The slow-motion factor of the phase being played, and its note. */
  slow: number;
  note: string | null;
  /** The last collision: where the bodies touched, and the seconds of video since. */
  contact: { x: number; age: number } | null;
  /** Each body's energy, in joules. */
  energy: Record<string, Energy>;
}

export interface Energy {
  /** ½ × mass × speed². */
  kinetic: number;
  /** mass × g × height, where the motion has a height (a drop, a lift or a curved track). */
  potential: number;
  /** ½ × k × extension², for the body on a spring. */
  elastic: number;
  /** The work done on the body so far by the forces that push, pull or lift it. */
  work: number;
  /** The energy friction and air resistance have turned to heat so far. */
  heat: number;
}

/** Gravity along a curved track: g, and the sine of the slope's angle at a distance along it. */
export interface Slope {
  g: number;
  sin: (s: number) => number;
}

/** The size of a force that changes with distance, at a distance from where the body started. */
export function profileAt(points: Array<[number, number]>, d: number): number {
  if (d <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [d0, n0] = points[i - 1];
    const [d1, n1] = points[i];
    if (d <= d1) return n0 + ((n1 - n0) * (d - d0)) / (d1 - d0);
  }
  return points[points.length - 1][1];
}

/** The work a force that changes with distance does between two distances: the area under its points. */
export function areaUnder(points: Array<[number, number]>, from: number, to: number): number {
  if (to < from) return -areaUnder(points, to, from);
  const cuts = [from, ...points.map(([d]) => d).filter((d) => d > from && d < to), to];
  let area = 0;
  for (let i = 1; i < cuts.length; i++) area += 0.5 * (profileAt(points, cuts[i - 1]) + profileAt(points, cuts[i])) * (cuts[i] - cuts[i - 1]);
  return area;
}

/** The force of a motion's spring on its body when the body's centre is at x, in newtons along the track. */
export function springForce(el: MotionEl, x: number): number {
  if (!el.spring) return 0;
  const stretch = x - el.spring.rest;
  return el.spring.loose && stretch > 0 ? 0 : -el.spring.k * stretch + 0;
}

const EPS = 1e-9;
/** The longest step between points of a velocity graph, in seconds. */
const TRACE_STEP = 0.05;
/** The longest step in working out motion along a curved track, in seconds. */
const SLOPE_STEP = 0.002;
/** The longest step for a body on a spring, or pushed by a force that changes with distance. */
const FIELD_STEP = 0.0005;
/** The name of the force that is gravity: its work is the change in potential energy. */
const WEIGHT = 'Weight';
/**
 * The complete oscillations a body has made since it was let go from rest: it is back where it
 * started after every second time it turns round.
 */
export function oscillations(state: MotionState, id: string): number {
  const t = state.turns[id];
  let turned = t.length - 1;
  // A body that stands at an extreme it has not left yet has finished that swing too.
  if (t.length >= 2) {
    const swing = Math.abs(t[t.length - 1] - t[t.length - 2]);
    if (swing > 0 && Math.abs(state.bodies[id].x - t[t.length - 1]) >= 0.9995 * swing) turned++;
  }
  return Math.floor(turned / 2);
}

/** The largest displacement from the equilibrium position that a body has had so far, in metres. */
export function amplitudeOf(el: MotionEl, state: MotionState, id: string): number {
  const zero = el.equilibrium ?? state.turns[id][0];
  return Math.max(...state.turns[id].map((x) => Math.abs(x - zero)), Math.abs(state.bodies[id].x - zero));
}

/** The displacement of a body from the equilibrium position, in metres: over a drop, upwards is positive. */
export const displacementOf = (el: MotionEl, x: number): number => (el.vertical ? -1 : 1) * (x - (el.equilibrium ?? 0)) + 0;

/** The name of the force of a motion's spring. */
export const SPRING = 'Spring';

/** The sum of the forces on a body along the track, in newtons. */
export function netForce(forces: MotionForce[], id: string, moving: (f: MotionForce) => boolean = () => true): number {
  return forces.reduce((n, f) => (f.on === id && f.axis !== 'y' && moving(f) ? n + f.n : n), 0);
}

/**
 * Moves one body through `dt` seconds of a phase. A resisting force (friction) acts only while
 * the body moves: once it has brought the body to rest, the body stays at rest unless the other
 * forces are larger than it. On a curved track (`slope`), gravity pulls along the slope as well,
 * and a spring or a force that changes with distance (`field`, newtons at each place) depends on
 * where the body is: the motion is then worked out in short steps.
 */
function advance(b: MotionBody, s: BodyState, forces: MotionForce[], dt: number, slope?: Slope, field?: (x: number) => number): BodyState {
  const mine = forces.filter((f) => f.on === b.id && f.axis !== 'y');
  if (slope || field) {
    const push = mine.filter((f) => !f.resist && !f.drag && !f.profile).reduce((n, f) => n + f.n, 0);
    // The most that friction can slow the body, as an acceleration, and air resistance for each m/s.
    const grip = mine.filter((f) => f.resist).reduce((n, f) => n + Math.abs(f.n), 0) / b.mass;
    const drag = mine.reduce((n, f) => n + (f.drag ?? 0), 0) / b.mass;
    const pull = (x: number) => (push + (field ? field(x) : 0)) / b.mass - (slope ? slope.g * slope.sin(x) : 0);
    const steps = Math.max(1, Math.ceil(dt / (field ? FIELD_STEP : SLOPE_STEP)));
    const h = dt / steps;
    let { x, v } = s;
    for (let i = 0; i < steps && h > 0; i++) {
      const a0 = pull(x) - drag * v;
      const atRest = Math.abs(v) < EPS;
      // At rest, friction holds the body unless the slope and the push beat it.
      if (atRest && Math.abs(a0) <= grip) {
        v = 0;
        continue;
      }
      const way = atRest ? Math.sign(a0) : Math.sign(v);
      const x1 = x + v * h + 0.5 * (a0 - way * grip) * h * h;
      // Air resistance at the end of the step is found with the velocity it is about to have.
      let v1 = (v + 0.5 * (a0 + pull(x1) - 2 * way * grip) * h) / (1 + 0.5 * drag * h);
      // Friction never turns a body round: it stops the body, and the next step decides whether it stays.
      if (grip > 0 && !atRest && v1 * v < 0) v1 = 0;
      x = x1;
      v = v1;
    }
    const a0 = pull(x) - drag * v;
    const a = Math.abs(v) < EPS ? (Math.abs(a0) <= grip ? 0 : a0 - Math.sign(a0) * grip) : a0 - Math.sign(v) * grip;
    return { x, v, a };
  }
  const drag = mine.reduce((n, f) => n + (f.drag ?? 0), 0);
  if (drag > 0) {
    // Air resistance of `drag` newtons for each m/s: m dv/dt = F − drag × v, so the velocity
    // closes on F ÷ drag, the terminal velocity, and never passes it.
    const push = mine.filter((f) => !f.drag).reduce((n, f) => n + f.n, 0);
    const terminal = push / drag;
    const tau = b.mass / drag;
    const e = Math.exp(-dt / tau);
    const v = terminal + (s.v - terminal) * e;
    return { x: s.x + terminal * dt + (s.v - terminal) * tau * (1 - e), v, a: (push - drag * v) / b.mass };
  }
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
  const spring = el.spring && bodies[el.spring.on] ? springForce(el, bodies[el.spring.on].x) : 0;
  const coil: MotionForce[] = el.spring && Math.abs(spring) > 1e-6 ? [{ on: el.spring.on, name: SPRING, n: spring, tone: 'brand', ...(el.spring.hidden ? { hidden: true } : {}) }] : [];
  return [...coil, ...forces]
    .filter((f) => {
      if (!f.resist) return true;
      const b = el.bodies.find((q) => q.id === f.on);
      if (!b) return false;
      if (Math.abs(bodies[b.id].v) > EPS) return true;
      // At rest, friction shows only while a push it is holding back acts.
      return Math.abs(netForce(forces, b.id, (g) => !g.resist)) > EPS;
    })
    // Air resistance is as large as the body is fast, and points against its motion; a force
    // that changes with distance has the size that belongs to where the body is.
    .map((f) => {
      const b = el.bodies.find((q) => q.id === f.on);
      if (f.profile && b && bodies[b.id]) return { ...f, n: profileAt(f.profile, bodies[b.id].x - b.x) };
      return f.drag && bodies[f.on] ? { ...f, n: -f.drag * bodies[f.on].v + 0 } : f;
    });
}

const start = (el: MotionEl): Record<string, BodyState> => Object.fromEntries(el.bodies.map((b) => [b.id, { x: b.x, v: b.v ?? 0, a: 0 }]));

/** The state of a motion after its clips have been played for the seconds given, in order. */
export function motionAt(el: MotionEl, plays: Array<[clip: string, seconds: number]> = []): MotionState {
  const step = el.strobe ?? 0.5;
  // An oscillation is followed closely enough for its graph to be a smooth curve.
  const quick = el.spring ? (2 * Math.PI * Math.sqrt((el.bodies.find((b) => b.id === el.spring!.on)?.mass ?? 1) / el.spring.k)) / 48 : TRACE_STEP;
  const traceStep = Math.min(TRACE_STEP, quick);
  let bodies = start(el);
  let time = 0;
  let marks: Record<string, number[]> = Object.fromEntries(el.bodies.map((b) => [b.id, [b.x]]));
  const fresh = (): MotionState['trace'] => Object.fromEntries(el.bodies.map((b) => [b.id, [[0, b.v ?? 0] as [number, number]]]));
  let trace = fresh();
  const freshPath = (): MotionState['path'] => Object.fromEntries(el.bodies.map((b) => [b.id, [[0, 0] as [number, number]]]));
  let path = freshPath();
  const freshPlace = (): MotionState['place'] => Object.fromEntries(el.bodies.map((b) => [b.id, [[0, b.x] as [number, number]]]));
  let place = freshPlace();
  // For a force-displacement graph: the force named (or the first that changes with distance, or the spring's).
  const graphed = (list: MotionForce[], b: MotionBody, x: number): [number, number] | null => {
    if (el.graph?.y !== 'force' || !el.graph.of.includes(b.id)) return null;
    const f = list.find((q) => q.on === b.id && (el.graph!.force ? q.name === el.graph!.force : q.profile));
    if (f) return [x - b.x, f.profile ? profileAt(f.profile, x - b.x) : f.n];
    if (el.spring?.on === b.id && (!el.graph.force || el.graph.force === SPRING)) return [Math.abs(x - el.spring.rest), Math.abs(springForce(el, x))];
    return null;
  };
  const freshPull = (): MotionState['pull'] => Object.fromEntries(el.bodies.map((b) => [b.id, [] as Array<[number, number]>]));
  let pull = freshPull();
  let push = freshPull();
  let travelled: Record<string, number> = Object.fromEntries(el.bodies.map((b) => [b.id, 0]));
  let turns: Record<string, number[]> = Object.fromEntries(el.bodies.map((b) => [b.id, [b.x]]));
  // The way each body last moved (1 or -1), to notice when it turns round.
  let heading: Record<string, number> = {};
  const move = (id: string, from: number, to: number) => {
    const dx = to - from;
    if (Math.abs(dx) < EPS) return;
    const way = Math.sign(dx);
    if (heading[id] && heading[id] !== way) turns[id].push(Math.round(from * 1e9) / 1e9 + 0);
    heading[id] = way;
    travelled[id] += Math.abs(dx);
  };
  // A curved track, and the height that potential energy is counted from.
  const track = el.path ? trackOf(el.path) : null;
  const slope: Slope | undefined = track && el.path ? { g: el.path.g, sin: (x) => track.at(x).sin } : undefined;
  const g = el.path?.g ?? el.energy?.g ?? 0;
  const heightOf = (x: number) => (track ? track.at(x).y : el.vertical === 'up' ? x - el.span[0] : el.vertical ? el.span[1] - x : 0);
  const kineticOf = (b: MotionBody, v: number) => 0.5 * b.mass * v * v;
  const potentialOf = (b: MotionBody, x: number) => b.mass * g * heightOf(x);
  const elasticOf = (b: MotionBody, x: number) => (el.spring?.on === b.id ? 0.5 * el.spring.k * (el.spring.loose && x > el.spring.rest ? 0 : (x - el.spring.rest) ** 2) : 0);
  // What depends on where a body is: its spring, and any force on it that changes with distance.
  const fieldOf = (b: MotionBody, list: MotionForce[]): ((x: number) => number) | undefined => {
    const changing = list.filter((f) => f.on === b.id && f.profile);
    const sprung = el.spring?.on === b.id;
    if (!changing.length && !sprung) return undefined;
    return (x) => (sprung ? springForce(el, x) : 0) + changing.reduce((n, f) => n + profileAt(f.profile!, x - b.x), 0);
  };
  const freshEnergy = (): Record<string, { work: number; heat: number }> => Object.fromEntries(el.bodies.map((b) => [b.id, { work: 0, heat: 0 }]));
  let spent = freshEnergy();
  let forces: MotionState['forces'] = [];
  let slow = 1;
  let note: string | null = null;
  let contact: MotionState['contact'] = null;
  // How long each force has been acting, in seconds of video: a force that carries on from one
  // phase or clip into the next keeps its arrow, and only a new one grows in.
  let ages = new Map<string, number>();
  const keyOf = (f: MotionForce) => `${f.on}|${f.name}|${f.axis ?? 'x'}|${f.drag ? 'drag' : f.profile || f.name === SPRING || f.to !== undefined ? 'changing' : f.n}`;
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
      path = freshPath();
      place = freshPlace();
      pull = freshPull();
      push = freshPull();
      travelled = Object.fromEntries(el.bodies.map((b) => [b.id, 0]));
      turns = Object.fromEntries(el.bodies.map((b) => [b.id, [b.x]]));
      heading = {};
      spent = freshEnergy();
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
      // A force with `to` changes steadily through the phase: `at` gives the forces as they are a share of the way through it.
      const ramped = list.some((f) => f.to !== undefined);
      const at = (share: number): MotionForce[] => (ramped ? list.map((f) => (f.to === undefined ? f : { ...f, n: f.n + (f.to - f.n) * share })) : list);
      const through = (t: number) => (ph.dur > 0 ? Math.min(1, t / ph.dur) : 1);
      // Strobe marks at equal steps of the motion's time; a body that changes pace inside a
      // phase (stopped by friction) is followed mark by mark.
      let done = 0;
      // A velocity set at the start of the phase is a step on the graph.
      if (ph.set) for (const id of Object.keys(ph.set)) trace[id].push([time, bodies[id].v]);
      const plot = () => {
        for (const b of el.bodies) {
          const point = graphed(list, b, bodies[b.id].x);
          if (point) pull[b.id].push(point);
        }
        if (el.graph?.y === 'impulse') {
          const now = at(through(done));
          for (const id of el.graph.of) push[id]?.push([time + done, now.reduce((n, f) => (f.on === id && f.axis !== 'y' && (!el.graph!.force || f.name === el.graph!.force) ? n + f.n : n), 0)]);
        }
      };
      if (dt > EPS) plot();
      while (done < dt - EPS) {
        const next = (Math.floor((time + done) / step + EPS) + 1) * step - time;
        // Short steps, so the graph follows a body that friction stops part way through.
        const h = Math.min(dt, next, done + traceStep) - done;
        // Over a short step, a force that changes steadily does what its value half way through would.
        const during = at(through(done + h / 2));
        for (const b of el.bodies) {
          const before = bodies[b.id];
          const after = advance(b, before, during, h, slope, fieldOf(b, during));
          // The work of the forces that push or lift the body (for one that changes with distance,
          // the area under its points). What the body does not gain as kinetic or potential
          // energy, friction and air resistance have turned to heat.
          const work = during.reduce((n, f) => (f.on === b.id && f.axis !== 'y' && !f.resist && !f.drag && f.name !== WEIGHT ? n + (f.profile ? areaUnder(f.profile, before.x - b.x, after.x - b.x) : f.n * (after.x - before.x)) : n), 0);
          spent[b.id].work += work;
          spent[b.id].heat += work - (kineticOf(b, after.v) - kineticOf(b, before.v)) - (potentialOf(b, after.x) - potentialOf(b, before.x)) - (elasticOf(b, after.x) - elasticOf(b, before.x));
          if (before.v * after.v < -EPS) {
            // It turned round inside the step: count the way out and the way back separately.
            const a = (after.v - before.v) / h;
            const t = -before.v / a;
            const far = before.x + before.v * t + 0.5 * a * t * t;
            move(b.id, before.x, far);
            move(b.id, far, after.x);
          } else move(b.id, before.x, after.x);
          bodies[b.id] = after;
        }
        done += h;
        for (const b of el.bodies) {
          trace[b.id].push([time + done, bodies[b.id].v]);
          path[b.id].push([time + done, travelled[b.id]]);
          place[b.id].push([time + done, bodies[b.id].x]);
        }
        plot();
        if (Math.abs(done - next) < EPS) for (const b of el.bodies) marks[b.id].push(bodies[b.id].x);
      }
      if (dt <= EPS && !ph.freeze) for (const b of el.bodies) bodies[b.id] = advance(b, bodies[b.id], at(0), 0, slope, fieldOf(b, list));
      if (ph.freeze) for (const b of el.bodies) bodies[b.id] = { ...bodies[b.id], a: 0 };
      time += dt;
      const age = ph.freeze ? Math.min(left, ph.dur) : dt * k;
      const now = acting(el, bodies, at(through(dt)));
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
  for (const id of Object.keys(travelled)) travelled[id] = tidy(travelled[id]);
  // Energies to a millionth of a joule: the short steps of a curved track leave a little noise.
  const joules = (n: number) => Math.round(n * 1e6) / 1e6 + 0;
  const energy: MotionState['energy'] = Object.fromEntries(
    el.bodies.map((b) => [b.id, { kinetic: joules(kineticOf(b, bodies[b.id].v)), potential: joules(potentialOf(b, bodies[b.id].x)), elastic: joules(elasticOf(b, bodies[b.id].x)), work: joules(spent[b.id].work), heat: Math.max(0, joules(spent[b.id].heat)) }]),
  );
  return { bodies, forces, time: tidy(time), marks, trace, path, place, pull, push, travelled, turns, slow, note, contact, energy };
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
