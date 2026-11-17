/**
 * The physics of a ramp element (see RampEl in script.ts): blocks on a surface that is level or
 * tilted, tied to each other by light strings, or to a body that hangs over a pulley at the top.
 * The script gives only the masses, the tilt, the coefficients of friction and the pushes and
 * pulls. The weight, the normal force, friction (static or kinetic, whichever applies), every
 * tension and the motion itself are worked out here, so the free-body diagram on the screen and
 * the way the blocks move cannot disagree. It is a pure function of the clips and the seconds
 * played, like the rest of the stage.
 */
import type { RampEl, RampForce, Tone } from './script.ts';

export const RAMP_G = 9.81;
/** The names of the forces a ramp works out, as they are written beside their arrows and in the table of work. */
export const WEIGHT = 'Weight';
export const NORMAL = 'Normal force';
export const FRICTION = 'Friction';
export const TENSION = 'Tension';
export const NET_WORK = 'Net';

/** A force on a body as it is drawn: its size in newtons and the way it points on the screen. */
export interface RampArrow {
  kind: 'weight' | 'normal' | 'friction' | 'applied' | 'tension';
  name: string;
  n: number;
  /** Degrees anticlockwise from the right of the screen. */
  turn: number;
  tone?: Tone;
  /** For a push or a pull: the seconds of video it has been acting (its arrow grows in). */
  age?: number;
}

export interface RampBodyState {
  /**
   * A block: the distance of its centre along the surface from the lower end, in metres. The
   * hanging body: how far its centre is below the pulley.
   */
  x: number;
  /** Velocity and acceleration, positive up the surface (to the right); downwards for the hanging body. */
  v: number;
  a: number;
  forces: RampArrow[];
  /** The net force on it along its line of motion, in newtons, signed like the velocity. */
  net: number;
  /** The normal force on a block, in newtons. */
  normal: number;
  /** How far it has moved from where it started, in metres, signed like the velocity. */
  moved: number;
  /**
   * The work each force has done on it so far, in joules, by the name of the force ("Weight",
   * "Normal force", "Friction", "Tension" and the name of each push or pull), and `Net`, their sum.
   */
  work: Record<string, number>;
}

export interface RampState {
  /** The tilt of the surface now, in degrees. */
  angle: number;
  bodies: Record<string, RampBodyState>;
  /** Seconds of the motion's own time since it started (or was last put back). */
  time: number;
  /** Where each body was at every strobe step so far. */
  marks: Record<string, number[]>;
  slow: number;
  note: string | null;
}

const EPS = 1e-9;
/** The longest step while the surface is tilting, in seconds. */
const TILT_STEP = 0.004;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Every body of a ramp: its blocks, then the body that hangs over the pulley. */
export function rampBodies(el: RampEl): Array<{ id: string; mass: number; hangs: boolean }> {
  return [...el.bodies.map((b) => ({ id: b.id, mass: b.mass, hangs: false })), ...(el.hanging ? [{ id: el.hanging.id, mass: el.hanging.mass, hangs: true }] : [])];
}

/**
 * The bodies that move together: each chain lists blocks tied by strings from the lower end of the
 * surface upwards, with the hanging body last when it is tied to the block nearest the pulley.
 */
export function chains(el: RampEl): string[][] {
  const order = [...el.bodies].sort((a, b) => a.x - b.x).map((b) => b.id);
  const tied = (a: string, b: string) => (el.ropes ?? []).some(([p, q]) => (p === a && q === b) || (p === b && q === a));
  const out: string[][] = [];
  for (const [i, id] of order.entries()) {
    if (i > 0 && tied(order[i - 1], id)) out[out.length - 1].push(id);
    else out.push([id]);
  }
  if (el.hanging && out.length) out[out.length - 1].push(el.hanging.id);
  return out;
}

interface Solved {
  a: number;
  /** For each member of the chain: the normal force, friction (signed along the surface) and its other forces along the line of motion. */
  normal: number[];
  friction: number[];
  drive: number[];
  /** The tension in the string between each member and the next. */
  tension: number[];
}

/** Newton's second law for one chain: the acceleration they share, and the forces that are not given. */
function solve(el: RampEl, chain: string[], angle: number, v: number, pushes: RampForce[]): Solved {
  const g = el.g ?? RAMP_G;
  const [mus, muk] = el.friction ?? [0, 0];
  const th = rad(angle);
  const all = rampBodies(el);
  const members = chain.map((id) => all.find((b) => b.id === id)!);
  const normal: number[] = [];
  const drive: number[] = [];
  for (const m of members) {
    if (m.hangs) {
      // Its weight pulls the chain round the pulley, up the surface.
      normal.push(0);
      drive.push(m.mass * g);
      continue;
    }
    const mine = pushes.filter((f) => f.on === m.id);
    const along = mine.reduce((n, f) => n + f.n * Math.cos(rad(f.angle ?? 0)), 0);
    const away = mine.reduce((n, f) => n + f.n * Math.sin(rad(f.angle ?? 0)), 0);
    normal.push(Math.max(0, m.mass * g * Math.cos(th) - away));
    drive.push(along - m.mass * g * Math.sin(th));
  }
  const total = members.reduce((n, m) => n + m.mass, 0);
  const pull = drive.reduce((n, d) => n + d, 0);
  const press = normal.reduce((n, d) => n + d, 0);
  // Sliding: kinetic friction against the motion. At rest: static friction holds the chain unless
  // the other forces beat its greatest value, and then kinetic friction takes over.
  let rub: number;
  if (Math.abs(v) > EPS) rub = -Math.sign(v) * muk * press;
  else if (Math.abs(pull) <= mus * press + EPS) rub = -pull;
  else rub = -Math.sign(pull) * muk * press;
  const a = (pull + rub) / total;
  const friction = normal.map((n) => (press > EPS ? (rub * n) / press : 0));
  const tension: number[] = [];
  let behind = 0;
  for (let i = 0; i < members.length - 1; i++) {
    behind += members[i].mass * a - drive[i] - friction[i];
    tension.push(behind);
  }
  return { a, normal, friction, drive, tension };
}

type Moving = Record<string, { x: number; v: number }>;
type Works = Record<string, Record<string, number>>;

/**
 * Moves one chain through `dt` seconds with the surface at one angle: friction can stop it, and
 * never turns it round. The work of every force on each body is added to `works` as it goes:
 * the part of the force along the motion, times the distance moved.
 */
function advance(el: RampEl, chain: string[], angle: number, now: Moving, pushes: RampForce[], dt: number, works: Works): void {
  const g = el.g ?? RAMP_G;
  const all = rampBodies(el);
  let left = dt;
  for (let turn = 0; turn < 4 && left > EPS; turn++) {
    const v = now[chain[0]].v;
    const { a, friction, tension } = solve(el, chain, angle, v, pushes);
    const rubbing = friction.some((f) => Math.abs(f) > EPS);
    let h = left;
    let stops = false;
    if (rubbing && Math.abs(v) > EPS && a * v < 0 && -v / a <= left) {
      h = -v / a;
      stops = true;
    }
    const dx = v * h + 0.5 * a * h * h;
    chain.forEach((id, i) => {
      const s = now[id];
      now[id] = { x: s.x + dx, v: stops ? 0 : v + a * h };
      const m = all.find((b) => b.id === id)!;
      const w = works[id];
      const add = (name: string, along: number) => (w[name] = (w[name] ?? 0) + along * dx);
      // A hanging body moves straight down, along its weight; a block's weight has a part down the surface.
      add(WEIGHT, m.hangs ? m.mass * g : -m.mass * g * Math.sin(rad(angle)));
      add(TENSION, (i < chain.length - 1 ? tension[i] : 0) - (i > 0 ? tension[i - 1] : 0));
      if (m.hangs) return;
      add(FRICTION, friction[i]);
      for (const f of pushes) if (f.on === id) add(f.name, f.n * Math.cos(rad(f.angle ?? 0)));
    });
    left -= h;
  }
}

const start = (el: RampEl): Moving => Object.fromEntries([...el.bodies.map((b) => [b.id, { x: b.x, v: b.v ?? 0 }]), ...(el.hanging ? [[el.hanging.id, { x: el.hanging.drop ?? 1, v: 0 }]] : [])]);

/** The state of a ramp after its clips have been played for the seconds given, in order. */
export function rampAt(el: RampEl, plays: Array<[clip: string, seconds: number]> = []): RampState {
  const step = el.strobe ?? 0.5;
  const groups = chains(el);
  const ids = rampBodies(el).map((b) => b.id);
  let now = start(el);
  let angle = el.angle;
  let time = 0;
  let marks: Record<string, number[]> = Object.fromEntries(ids.map((id) => [id, [now[id].x]]));
  const origin = start(el);
  const freshWorks = (): Works => Object.fromEntries(ids.map((id) => [id, {}]));
  let works = freshWorks();
  let pushes: RampForce[] = [];
  let slow = 1;
  let note: string | null = null;
  // How long each push has been acting, in seconds of video: one that carries on into the next
  // phase keeps its arrow, and only a new one grows in.
  let ages = new Map<string, number>();
  const keyOf = (f: RampForce) => `${f.on}|${f.name}|${f.n}|${f.angle ?? 0}`;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Ramp "${el.id}" has no clip "${name}".`);
    if (clip.reset) {
      now = start(el);
      angle = el.angle;
      time = 0;
      marks = Object.fromEntries(ids.map((id) => [id, [now[id].x]]));
      ages = new Map();
      works = freshWorks();
    }
    let left = Math.max(0, seconds);
    for (const [pi, ph] of clip.phases.entries()) {
      if (pi > 0 && left <= EPS) break;
      const k = ph.slow ?? 1;
      // A velocity given to one body is given to everything tied to it.
      for (const [id, v] of Object.entries(ph.set ?? {})) for (const other of groups.find((c) => c.includes(id)) ?? [id]) now[other] = { ...now[other], v };
      const dt = ph.freeze ? 0 : Math.min(left / k, ph.dur);
      pushes = ph.forces ?? [];
      const from = angle;
      const to = ph.tilt ?? angle;
      let done = 0;
      while (done < dt - EPS) {
        // Up to the next strobe mark, and in short steps while the surface tilts.
        const next = (Math.floor((time + done) / step + EPS) + 1) * step - time;
        const h = Math.min(dt, next, to === from ? Infinity : done + TILT_STEP) - done;
        const mid = from + ((to - from) * (done + h / 2)) / ph.dur;
        for (const chain of groups) advance(el, chain, mid, now, pushes, h, works);
        done += h;
        if (Math.abs(done - next) < EPS) for (const id of ids) marks[id].push(now[id].x);
      }
      angle = from + ((to - from) * dt) / ph.dur;
      time += dt;
      const age = ph.freeze ? Math.min(left, ph.dur) : dt * k;
      ages = new Map(pushes.map((f) => [keyOf(f), (ages.get(keyOf(f)) ?? 0) + age]));
      slow = k;
      note = ph.note ?? null;
      left -= age;
    }
  }
  // Many short steps leave a little rounding noise (5.000000000000001 m): drop it.
  const tidy = (n: number) => Math.round(n * 1e9) / 1e9 + 0;
  const g = el.g ?? RAMP_G;
  const all = rampBodies(el);
  const bodies: RampState['bodies'] = {};
  // Work to a millionth of a joule (many short steps leave a little noise), with the sum of them all.
  const worked = (id: string): Record<string, number> => {
    const w: Record<string, number> = Object.fromEntries(Object.entries(works[id]).map(([name, j]) => [name, Math.round(j * 1e6) / 1e6 + 0]));
    return { ...w, [NORMAL]: 0, [NET_WORK]: Math.round(Object.values(works[id]).reduce((n, j) => n + j, 0) * 1e6) / 1e6 + 0 };
  };
  for (const chain of groups) {
    const v = now[chain[0]].v;
    const s = solve(el, chain, angle, v, pushes);
    chain.forEach((id, i) => {
      const m = all.find((b) => b.id === id)!;
      const moved = tidy(now[id].x - origin[id].x);
      const forces: RampArrow[] = [{ kind: 'weight', name: WEIGHT, n: m.mass * g, turn: -90 }];
      // A string pulls a block up the surface towards the pulley or the block ahead, and back
      // towards the block behind. It pulls the hanging body straight up.
      const ahead = i < chain.length - 1 ? s.tension[i] : 0;
      const behind = i > 0 ? s.tension[i - 1] : 0;
      if (m.hangs) {
        if (behind > EPS) forces.push({ kind: 'tension', name: 'Tension', n: behind, turn: 90 });
        bodies[id] = { x: tidy(now[id].x), v: tidy(v), a: tidy(s.a), forces, net: tidy(m.mass * g - behind), normal: 0, moved, work: worked(id) };
        return;
      }
      if (s.normal[i] > EPS) forces.push({ kind: 'normal', name: NORMAL, n: s.normal[i], turn: angle + 90 });
      if (Math.abs(s.friction[i]) > EPS) forces.push({ kind: 'friction', name: FRICTION, n: Math.abs(s.friction[i]), turn: s.friction[i] > 0 ? angle : angle + 180 });
      for (const f of pushes) if (f.on === id && f.n > EPS) forces.push({ kind: 'applied', name: f.name, n: f.n, turn: angle + (f.angle ?? 0), tone: f.tone, age: ages.get(keyOf(f)) ?? 0 });
      if (ahead > EPS) forces.push({ kind: 'tension', name: 'Tension', n: ahead, turn: angle });
      if (behind > EPS) forces.push({ kind: 'tension', name: 'Tension', n: behind, turn: angle + 180 });
      bodies[id] = { x: tidy(now[id].x), v: tidy(v), a: tidy(s.a), forces, net: tidy(s.drive[i] + s.friction[i] + ahead - behind), normal: tidy(s.normal[i]), moved, work: worked(id) };
    });
  }
  return { angle: tidy(angle), bodies, time: tidy(time), marks, slow, note };
}

/** Every tilt the surface of a ramp has in its clips, with the one it starts at, in degrees. */
export function tilts(el: RampEl): number[] {
  return [el.angle, ...Object.values(el.clips).flatMap((c) => c.phases.flatMap((ph) => (ph.tilt === undefined ? [] : [ph.tilt])))];
}
