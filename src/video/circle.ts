/**
 * The physics of a circle element (see CircleEl in script.ts): bodies that go round a circle. On a
 * level surface each keeps its speed, and needs a net force of m v² ÷ r towards the centre. On a
 * circle that stands upright, gravity slows a body as it climbs and speeds it up as it falls
 * (energy is conserved), and the string or the track gives whatever force is still needed to turn
 * it: m v² ÷ r − m g sin θ, the most at the bottom and the least at the top. A body that is let go
 * carries on in a straight line along the tangent. A pure function of the clips and the seconds
 * played, like the rest of the stage.
 */
import { circleSpeed, type CircleEl } from './script.ts';

export const CIRCLE_G = 9.81;

export interface CircleForce {
  kind: 'tension' | 'friction' | 'normal' | 'weight';
  name: string;
  n: number;
  /** Degrees anticlockwise from the right of the picture. */
  angle: number;
}

/** One mark of a strobe: where a body was, and its velocity and acceleration there. */
export interface CircleMark {
  x: number;
  y: number;
  v: [number, number];
  a: [number, number];
}

export interface CircleBodyState {
  /** Where it is, in metres from the centre of the circle. */
  x: number;
  y: number;
  /** Its place on the circle in degrees anticlockwise from the right (where it left, once it is let go). */
  angle: number;
  /** Its velocity in metres per second, and its speed. */
  v: [number, number];
  speed: number;
  /** Its acceleration in metres per second squared, and the part of it towards the centre (v² ÷ r). */
  a: [number, number];
  ac: number;
  /** The time for one turn at this speed, in seconds. */
  period: number;
  /** The real forces on it (none once it is let go, and no weight on a level surface, where the surface holds it up). */
  forces: CircleForce[];
  /** The net force: its size in newtons and its direction in degrees anticlockwise from the right. */
  net: { n: number; angle: number };
  /** The force towards the centre that the string, the road or the track must give, in newtons. */
  needed: number;
  /** Let go: it moves in a straight line. */
  free: boolean;
  /** How many turns it has made. */
  turns: number;
  trail: Array<[number, number]>;
  marks: CircleMark[];
}

export interface CircleState {
  bodies: Record<string, CircleBodyState>;
  time: number;
  slow: number;
  note: string | null;
}

const EPS = 1e-9;
const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** The centripetal acceleration of a body that moves at speed v round a circle of radius r. */
export const centripetal = (v: number, r: number) => (v * v) / r;

/** The speed of a body that goes round a circle of radius r once in a period T. */
export const speedRound = (r: number, period: number) => (2 * Math.PI * r) / period;

const NAMES = { string: ['tension', 'Tension'], friction: ['friction', 'Friction'], track: ['normal', 'Normal force'] } as const;

interface Moving {
  /** Its angle on the circle in radians, and how far it has turned since the start. */
  th: number;
  swept: number;
  /** Its speed along the circle, in metres per second. */
  v: number;
  /** Once let go: where it is and its velocity. */
  free: { x: number; y: number; vx: number; vy: number } | null;
  /** The rate at which its speed is changing along the circle, for a body that is being sped up. */
  along: number;
  trail: Array<[number, number]>;
  marks: CircleMark[];
}

/** The state of a circle element after its clips have been played for the seconds given, in order. */
export function circleAt(el: CircleEl, plays: Array<[clip: string, seconds: number]> = []): CircleState {
  const g = el.g ?? CIRCLE_G;
  const sense = el.clockwise ? -1 : 1;
  const radius = new Map(el.bodies.map((b) => [b.id, b.r]));
  const start = (): Map<string, Moving> =>
    new Map(
      el.bodies.map((b) => {
        const th = rad(b.at ?? 0);
        return [b.id, { th, swept: 0, v: circleSpeed(b), free: null, along: 0, trail: [[b.r * Math.cos(th), b.r * Math.sin(th)]], marks: [] } satisfies Moving];
      }),
    );
  // The velocity and the acceleration of a body on its circle: along the tangent, and towards the centre (with any change of speed along the tangent).
  const velocity = (m: Moving): [number, number] => [-Math.sin(m.th) * m.v * sense, Math.cos(m.th) * m.v * sense];
  const accel = (m: Moving, r: number): [number, number] => {
    const ac = centripetal(m.v, r);
    const at = el.vertical ? -g * Math.cos(m.th) * sense : m.along;
    return [-Math.cos(m.th) * ac - Math.sin(m.th) * at * sense, -Math.sin(m.th) * ac + Math.cos(m.th) * at * sense];
  };
  // Marks are left every eighth of a turn, and the last eight are kept: one turn's worth.
  const EIGHTH = Math.PI / 4;
  const step = (m: Moving, r: number, ds: number, v1: number) => {
    const before = Math.floor(m.swept / EIGHTH + 1e-9);
    m.th += (ds / r) * sense;
    m.swept += ds / r;
    m.v = v1;
    m.trail.push([r * Math.cos(m.th), r * Math.sin(m.th)]);
    if (Math.floor(m.swept / EIGHTH + 1e-9) > before) {
      m.marks.push({ x: r * Math.cos(m.th), y: r * Math.sin(m.th), v: velocity(m), a: accel(m, r) });
      if (m.marks.length > 8) m.marks.shift();
    }
  };

  let now = start();
  let time = 0;
  let slow = 1;
  let note: string | null = null;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Circle "${el.id}" has no clip "${name}".`);
    if (clip.reset) {
      now = start();
      time = 0;
    }
    let left = Math.max(0, seconds);
    for (const [pi, ph] of clip.phases.entries()) {
      if (pi > 0 && left <= EPS) break;
      const k = ph.slow ?? 1;
      const dt = ph.freeze ? 0 : Math.min(left / k, ph.dur);
      for (const id of ph.release ?? []) {
        const m = now.get(id)!;
        if (m.free || !(left > EPS)) continue;
        const r = radius.get(id)!;
        const [vx, vy] = velocity(m);
        m.free = { x: r * Math.cos(m.th), y: r * Math.sin(m.th), vx, vy };
        m.along = 0;
      }
      for (const [id, m] of now) {
        const r = radius.get(id)!;
        if (m.free) {
          m.free.x += m.free.vx * dt;
          m.free.y += m.free.vy * dt;
          if (dt > EPS) m.trail.push([m.free.x, m.free.y]);
          continue;
        }
        // Small steps: three degrees of turn at the most, and a fine step of time where gravity changes the speed.
        const target = ph.speed?.[id];
        m.along = target !== undefined && !ph.freeze ? (target - m.v) / ph.dur : 0;
        const top = Math.max(m.v, target ?? 0, el.vertical ? Math.sqrt(m.v * m.v + 4 * g * r) : 0);
        const steps = Math.max(1, Math.ceil((top * dt) / (r * rad(3))), el.vertical ? Math.ceil(dt / 0.002) : 0);
        const h = dt / steps;
        for (let i = 0; i < steps && dt > EPS; i++) {
          if (el.vertical) {
            // θ'' = −(g ÷ r) cos θ, by the fourth-order Runge–Kutta method.
            const f = (th: number) => (-g / r) * Math.cos(th);
            const w = (m.v / r) * sense;
            const k1 = [w, f(m.th)];
            const k2 = [w + (h / 2) * k1[1], f(m.th + (h / 2) * k1[0])];
            const k3 = [w + (h / 2) * k2[1], f(m.th + (h / 2) * k2[0])];
            const k4 = [w + h * k3[1], f(m.th + h * k3[0])];
            const dth = (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
            const w1 = w + (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
            step(m, r, Math.abs(dth) * r, Math.abs(w1) * r);
          } else {
            const v1 = m.v + m.along * h;
            step(m, r, ((m.v + v1) / 2) * h, v1);
          }
        }
        // Once it has reached its new speed, the speed is steady again.
        if (dt >= ph.dur - EPS) {
          if (target !== undefined) m.v = target;
          m.along = 0;
        }
      }
      time += dt;
      slow = k;
      note = ph.note ?? null;
      left -= ph.freeze ? Math.min(left, ph.dur) : dt * k;
    }
  }

  const tidy = (n: number) => Number(n.toPrecision(10)) + 0;
  const bodies: CircleState['bodies'] = {};
  for (const b of el.bodies) {
    const m = now.get(b.id)!;
    if (m.free) {
      const speed = Math.hypot(m.free.vx, m.free.vy);
      bodies[b.id] = { x: tidy(m.free.x), y: tidy(m.free.y), angle: tidy(deg(m.th)), v: [tidy(m.free.vx), tidy(m.free.vy)], speed: tidy(speed), a: [0, 0], ac: 0, period: Infinity, forces: [], net: { n: 0, angle: 0 }, needed: 0, free: true, turns: m.swept / (2 * Math.PI), trail: m.trail, marks: m.marks };
      continue;
    }
    const inward = deg(m.th) + 180;
    const fc = b.mass * centripetal(m.v, b.r);
    // On an upright circle the weight gives part of the force towards the centre above the middle, and takes from it below.
    const needed = el.vertical ? fc - b.mass * g * Math.sin(m.th) : fc;
    const forces: CircleForce[] = [];
    if (el.by) forces.push({ kind: NAMES[el.by][0], name: NAMES[el.by][1], n: tidy(Math.max(0, needed)), angle: tidy(inward) });
    if (el.vertical) forces.push({ kind: 'weight', name: 'Weight', n: tidy(b.mass * g), angle: -90 });
    const a = accel(m, b.r);
    const size = Math.hypot(a[0], a[1]);
    bodies[b.id] = {
      x: tidy(b.r * Math.cos(m.th)),
      y: tidy(b.r * Math.sin(m.th)),
      angle: tidy(deg(m.th)),
      v: velocity(m).map(tidy) as [number, number],
      speed: tidy(m.v),
      a: a.map(tidy) as [number, number],
      ac: tidy(centripetal(m.v, b.r)),
      period: tidy(speedRound(b.r, 1) / m.v),
      forces,
      net: { n: tidy(b.mass * size), angle: size > EPS ? tidy(deg(Math.atan2(a[1], a[0]))) : 0 },
      needed: tidy(needed),
      free: false,
      turns: m.swept / (2 * Math.PI),
      trail: m.trail,
      marks: m.marks,
    };
  }
  return { bodies, time: tidy(time), slow, note };
}
