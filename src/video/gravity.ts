/**
 * The physics of a gravity element (see GravityEl in script.ts): bodies in space that attract one
 * another as Newton's law of universal gravitation says, F = G m₁ m₂ ÷ r², with r measured between
 * their centres. A clip carries a body to a new place or changes its mass, and the forces and the
 * field strengths follow. A pure function of the clips and the seconds played, like the rest of
 * the stage.
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
}

export interface GravityState {
  bodies: Record<string, GravityBodyState>;
  note: string | null;
}

/** The gravitational force between two masses whose centres are a distance r apart. */
export const attraction = (m1: number, m2: number, r: number, G = BIG_G) => (G * m1 * m2) / (r * r);

/** The gravitational field strength at a distance r from the centre of a mass. */
export const fieldStrength = (mass: number, r: number, G = BIG_G) => (G * mass) / (r * r);

/**
 * A number as it is written beside an arrow: plain ("144", "2.45", "1226.3") or, when it is very
 * large or very small, in scientific notation, as a mantissa and a power of ten ("6.53", 3).
 */
export function written(n: number, figures = 3, scientific = false): { text: string; power: number | null } {
  const size = Math.abs(n);
  if (size === 0) return { text: '0', power: null };
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

/** The state of a gravity element after its clips have been played for the seconds given, in order. */
export function gravityAt(el: GravityEl, plays: Array<[clip: string, seconds: number]> = []): GravityState {
  const start = () => new Map(el.bodies.map((b) => [b.id, { x: b.x, y: b.y ?? 0, mass: b.mass }]));
  let now = start();
  let note: string | null = null;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Gravity "${el.id}" has no clip "${name}".`);
    if (clip.reset) now = start();
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
      note = ph.note ?? null;
      left -= dt;
    }
  }
  const G = el.G ?? BIG_G;
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
    bodies[id] = { x: tidy(b.x), y: tidy(b.y), mass: tidy(b.mass), g: tidy(g), force: { n: tidy(g * b.mass), angle: g > 0 ? tidy((Math.atan2(gy, gx) * 180) / Math.PI) : 0 } };
  }
  return { bodies, note };
}
