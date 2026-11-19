/**
 * The physics of a gravity element (see GravityEl in script.ts): bodies in space that attract one
 * another as Newton's law of universal gravitation says, F = G m₁ m₂ ÷ r², with r measured between
 * their centres. A clip carries a body to a new place or changes its mass, and the forces and the
 * field strengths follow. A body in orbit, or one that has been thrown, moves freely under the pull
 * of the bodies that stay where they are while a phase lets time run: it is followed in small
 * steps (the fourth-order Runge–Kutta method) until it lands on a planet, if it does. A pure
 * function of the clips and the seconds played, like the rest of the stage.
 */
import type { GravityEl } from './script.ts';

/** The universal gravitational constant, in N·m²/kg². */
export const BIG_G = 6.67e-11;

export interface GravityBodyState {
  /** Where its centre is, in metres. */
  x: number;
  y: number;
  mass: number;
  /** The gravitational field strength at its centre from every other body, in newtons per kilogram. */
  g: number;
  /** The gravitational force on it: its size in newtons and its direction in degrees anticlockwise from the right. */
  force: { n: number; angle: number };
  /** Its velocity in metres per second, as [right, up], and its speed (zero for a body that stays where it is). */
  v: [number, number];
  speed: number;
  /** Moving freely under gravity: in orbit, or thrown and not yet landed. */
  flying: boolean;
  /** It has come down on a planet. */
  landed: boolean;
  /** How many times it has been round the first body. */
  turns: number;
  /** Where it has been since it started or was last thrown. */
  trail: Array<[number, number]>;
}

export interface GravityState {
  bodies: Record<string, GravityBodyState>;
  /** The paths of earlier throws. */
  ghosts: Array<Array<[number, number]>>;
  /** Seconds of the motion that have run. */
  time: number;
  note: string | null;
}

/** The speed of a circular orbit of radius r round a mass: √(GM ÷ r). */
export const orbitalSpeed = (mass: number, r: number, G = BIG_G) => Math.sqrt((G * mass) / r);

/** The period of a circular orbit of radius r round a mass: 2πr ÷ v, so that T² = 4π² r³ ÷ (GM). */
export const orbitalPeriod = (mass: number, r: number, G = BIG_G) => 2 * Math.PI * Math.sqrt(r ** 3 / (G * mass));

/** The gravitational force between two masses whose centres are a distance r apart. */
export const attraction = (m1: number, m2: number, r: number, G = BIG_G) => (G * m1 * m2) / (r * r);

/** The gravitational field strength at a distance r from the centre of a mass. */
export const fieldStrength = (mass: number, r: number, G = BIG_G) => (G * mass) / (r * r);

/**
 * A number as it is written beside an arrow: plain ("144", "2.45", "1226.3") or, when it is very
 * large or very small, in scientific notation, as a mantissa and a power of ten ("6.53", 3). With
 * `keep`, a plain number keeps every significant figure asked for ("1.50", "0.30").
 */
export function written(n: number, figures = 3, scientific = false, keep = false): { text: string; power: number | null } {
  const size = Math.abs(n);
  if (size === 0) return { text: '0', power: null };
  if (keep && !scientific && size >= 0.01 && Number(size.toPrecision(figures)) < 10 ** figures) return { text: n.toPrecision(figures), power: null };
  if (!scientific && size >= 0.01 && size < 1e5) return { text: size >= 99.95 ? n.toFixed(1).replace(/\.0$/, '') : String(Number(n.toPrecision(figures))), power: null };
  let power = Math.floor(Math.log10(size));
  let mantissa = n / 10 ** power;
  // 9.996 rounds up to 10.0: carry it into the power.
  if (Math.abs(Number(mantissa.toPrecision(figures))) >= 10) {
    power += 1;
    mantissa /= 10;
  }
  return { text: mantissa.toPrecision(figures), power };
}

const smooth = (x: number) => x * x * (3 - 2 * x);

interface Free {
  x: number;
  y: number;
  mass: number;
  /** Its velocity when it moves freely; null for a body that stays where it is put. */
  v: [number, number] | null;
  landed: boolean;
  /** The angle it has swept round the first body, in radians. */
  swept: number;
  trail: Array<[number, number]>;
}

/** The state of a gravity element after its clips have been played for the seconds given, in order. */
export function gravityAt(el: GravityEl, plays: Array<[clip: string, seconds: number]> = []): GravityState {
  const G = el.G ?? BIG_G;
  const centre = el.bodies[0];
  const start = () =>
    new Map<string, Free>(
      el.bodies.map((b) => {
        const [dx, dy] = [b.x - centre.x, (b.y ?? 0) - (centre.y ?? 0)];
        const r = Math.hypot(dx, dy);
        const speed = b.orbit && r > 0 ? orbitalSpeed(centre.mass, r, G) : 0;
        // A circular orbit starts at right angles to the line from the centre, anticlockwise.
        const v: [number, number] | null = b.orbit && r > 0 ? [(-dy / r) * speed, (dx / r) * speed] : b.v ? [b.v[0], b.v[1]] : null;
        return [b.id, { x: b.x, y: b.y ?? 0, mass: b.mass, v, landed: false, swept: 0, trail: [[b.x, b.y ?? 0]] }];
      }),
    );
  let now = start();
  let ghosts: Array<Array<[number, number]>> = [];
  let time = 0;
  let note: string | null = null;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Gravity "${el.id}" has no clip "${name}".`);
    if (clip.reset) {
      now = start();
      ghosts = [];
      time = 0;
    }
    let left = Math.max(0, seconds);
    for (const [pi, ph] of clip.phases.entries()) {
      if (pi > 0 && left <= 1e-9) break;
      const dt = Math.min(left, ph.dur);
      // A body is carried smoothly: it starts and stops gently.
      const part = smooth(dt / ph.dur);
      for (const [id, to] of Object.entries(ph.to ?? {})) {
        const b = now.get(id)!;
        const [x, y] = typeof to === 'number' ? [to, b.y] : to;
        now.set(id, { ...b, x: b.x + (x - b.x) * part, y: b.y + (y - b.y) * part });
      }
      for (const [id, mass] of Object.entries(ph.mass ?? {})) {
        const b = now.get(id)!;
        now.set(id, { ...b, mass: b.mass + (mass - b.mass) * part });
      }
      // A throw: back to where it started, with the velocity given; the path of the last throw stays.
      for (const [id, v] of Object.entries(ph.launch ?? {})) {
        const b = now.get(id)!;
        const first = el.bodies.find((o) => o.id === id)!;
        if (b.trail.length > 1) ghosts.push(b.trail);
        now.set(id, { ...b, x: first.x, y: first.y ?? 0, v: [v[0], v[1]], landed: false, swept: 0, trail: [[first.x, first.y ?? 0]] });
      }
      if (ph.fly && dt > 1e-9) {
        const span = dt * (ph.rate ?? el.rate ?? 1);
        const fixed = [...now.entries()].filter(([, b]) => !b.v).map(([id, b]) => ({ ...b, radius: el.bodies.find((o) => o.id === id)!.radius }));
        const pull = (x: number, y: number): [number, number] => {
          let [ax, ay] = [0, 0];
          for (const o of fixed) {
            const r = Math.hypot(o.x - x, o.y - y);
            if (r < 1e-12) continue;
            const g = fieldStrength(o.mass, r, G);
            ax += (g * (o.x - x)) / r;
            ay += (g * (o.y - y)) / r;
          }
          return [ax, ay];
        };
        const hub = now.get(centre.id)!;
        for (const b of now.values()) {
          if (!b.v || b.landed) continue;
          // Steps of half a degree of a circular orbit at this distance; the last step is the part left over.
          const h = orbitalPeriod(hub.mass, Math.hypot(b.x - hub.x, b.y - hub.y) || 1, G) / 720;
          for (let t = 0; t < span - 1e-9 && !b.landed; ) {
            const s = Math.min(h, span - t);
            const [x0, y0] = [b.x, b.y];
            const vel = b.v as [number, number];
            const vx: number = vel[0];
            const vy: number = vel[1];
            const a1 = pull(x0, y0);
            const a2 = pull(x0 + (s / 2) * vx, y0 + (s / 2) * vy);
            const v2: [number, number] = [vx + (s / 2) * a1[0], vy + (s / 2) * a1[1]];
            const v3: [number, number] = [vx + (s / 2) * a2[0], vy + (s / 2) * a2[1]];
            const a3 = pull(x0 + (s / 2) * v2[0], y0 + (s / 2) * v2[1]);
            const a4p: [number, number] = [x0 + s * v3[0], y0 + s * v3[1]];
            const v4: [number, number] = [vx + s * a3[0], vy + s * a3[1]];
            const a4 = pull(a4p[0], a4p[1]);
            b.x = x0 + (s / 6) * (vx + 2 * v2[0] + 2 * v3[0] + v4[0]);
            b.y = y0 + (s / 6) * (vy + 2 * v2[1] + 2 * v3[1] + v4[1]);
            b.v = [vx + (s / 6) * (a1[0] + 2 * a2[0] + 2 * a3[0] + a4[0]), vy + (s / 6) * (a1[1] + 2 * a2[1] + 2 * a3[1] + a4[1])];
            // Down on a planet: it stops where its path met the surface.
            for (const o of fixed) {
              if (!o.radius || Math.hypot(b.x - o.x, b.y - o.y) >= o.radius) continue;
              let [lo, hi] = [0, 1];
              for (let i = 0; i < 30; i++) {
                const mid = (lo + hi) / 2;
                if (Math.hypot(x0 + (b.x - x0) * mid - o.x, y0 + (b.y - y0) * mid - o.y) >= o.radius) lo = mid;
                else hi = mid;
              }
              [b.x, b.y] = [x0 + (b.x - x0) * lo, y0 + (b.y - y0) * lo];
              b.v = [0, 0];
              b.landed = true;
            }
            const cross = (x0 - hub.x) * (b.y - hub.y) - (y0 - hub.y) * (b.x - hub.x);
            const dot = (x0 - hub.x) * (b.x - hub.x) + (y0 - hub.y) * (b.y - hub.y);
            b.swept += Math.atan2(cross, dot);
            b.trail.push([b.x, b.y]);
            t += s;
          }
        }
        time += span;
      }
      note = ph.note ?? null;
      left -= dt;
    }
  }
  const tidy = (n: number) => Number(n.toPrecision(12)) + 0;
  const bodies: GravityState['bodies'] = {};
  for (const [id, b] of now) {
    // The field here is the sum of the fields of every other body, each towards that body.
    let [gx, gy] = [0, 0];
    for (const [other, o] of now) {
      if (other === id) continue;
      const r = Math.hypot(o.x - b.x, o.y - b.y);
      if (r < 1e-12) continue;
      const g = fieldStrength(o.mass, r, G);
      gx += (g * (o.x - b.x)) / r;
      gy += (g * (o.y - b.y)) / r;
    }
    const g = Math.hypot(gx, gy);
    const v: [number, number] = b.v ? [tidy(b.v[0]), tidy(b.v[1])] : [0, 0];
    bodies[id] = {
      x: tidy(b.x),
      y: tidy(b.y),
      mass: tidy(b.mass),
      g: tidy(g),
      force: { n: tidy(g * b.mass), angle: g > 0 ? tidy((Math.atan2(gy, gx) * 180) / Math.PI) : 0 },
      v,
      speed: tidy(Math.hypot(v[0], v[1])),
      flying: !!b.v && !b.landed,
      landed: b.landed,
      turns: Math.abs(b.swept) / (2 * Math.PI),
      trail: b.trail,
    };
  }
  return { bodies, ghosts, time: tidy(time), note };
}
