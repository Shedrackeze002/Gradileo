/**
 * The physics of a forces element (see ForcesEl in script.ts): one object with forces on it that
 * point any way in a plane. Seen from above on frictionless ice, the forces of each phase add to a
 * net force and the object accelerates along it (a = F ÷ m). Hung from two cables, the object is
 * in equilibrium: its weight is known, and the two tensions are worked out from the angles of the
 * cables, so they change as the cables are tilted. A pure function of the clips and the seconds
 * played, like the rest of the stage.
 */
import type { ForcesEl, PlaneForce, Tone } from './script.ts';

export const FORCES_G = 9.81;

export interface ForceArrow {
  kind: 'applied' | 'weight' | 'tension';
  name: string;
  n: number;
  /** Degrees anticlockwise from the right of the picture (east). */
  angle: number;
  tone?: Tone;
  /** Seconds of video it has been acting: its arrow grows in. */
  age: number;
}

export interface ForcesState {
  /** Where the object is, its velocity and its acceleration, as [x, y] in metres and seconds. */
  at: [number, number];
  v: [number, number];
  a: [number, number];
  forces: ForceArrow[];
  /** The net force: its size in newtons and its direction in degrees anticlockwise from the right. */
  net: { n: number; angle: number };
  /** The angles of the two cables above the horizontal now, in degrees (left, right). */
  cables: [number, number] | null;
  /** Where the object has been, for its trail. */
  trail: Array<[number, number]>;
  time: number;
  slow: number;
  note: string | null;
}

const EPS = 1e-9;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** The tensions in two cables that hold a weight at rest: left and right, at these angles above the horizontal. */
export function tensions(weight: number, left: number, right: number): [number, number] {
  const both = Math.sin(rad(left + right));
  return [(weight * Math.cos(rad(right))) / both, (weight * Math.cos(rad(left))) / both];
}

/** The sum of forces: its size, and its direction in degrees anticlockwise from the right. */
export function resultant(forces: Array<{ n: number; angle: number }>): { n: number; angle: number; x: number; y: number } {
  const x = forces.reduce((s, f) => s + f.n * Math.cos(rad(f.angle)), 0);
  const y = forces.reduce((s, f) => s + f.n * Math.sin(rad(f.angle)), 0);
  const n = Math.hypot(x, y);
  return { n: n < 1e-6 ? 0 : n, angle: n < 1e-6 ? 0 : (Math.atan2(y, x) * 180) / Math.PI, x, y };
}

/** The state of a forces element after its clips have been played for the seconds given, in order. */
export function forcesAt(el: ForcesEl, plays: Array<[clip: string, seconds: number]> = []): ForcesState {
  let at: [number, number] = [0, 0];
  let v: [number, number] = [0, 0];
  let a: [number, number] = [0, 0];
  let cables = el.cables ? ([...el.cables] as [number, number]) : null;
  let trail: Array<[number, number]> = [[0, 0]];
  let time = 0;
  let pushes: PlaneForce[] = [];
  let slow = 1;
  let note: string | null = null;
  let ages = new Map<string, number>();
  const keyOf = (f: PlaneForce) => `${f.name}|${f.n}|${f.angle}`;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Forces "${el.id}" has no clip "${name}".`);
    if (clip.reset) {
      at = [0, 0];
      v = [0, 0];
      cables = el.cables ? ([...el.cables] as [number, number]) : null;
      trail = [[0, 0]];
      time = 0;
      ages = new Map();
    }
    let left = Math.max(0, seconds);
    for (const [pi, ph] of clip.phases.entries()) {
      if (pi > 0 && left <= EPS) break;
      const k = ph.slow ?? 1;
      const dt = ph.freeze ? 0 : Math.min(left / k, ph.dur);
      pushes = ph.forces ?? [];
      const sum = resultant(pushes);
      // A hung object stays where it is; on the ice, the net force accelerates it.
      a = el.cables ? [0, 0] : [sum.x / el.body.mass, sum.y / el.body.mass];
      const steps = Math.max(1, Math.ceil(dt / 0.05));
      for (let i = 1; i <= steps && dt > EPS; i++) {
        const t = (dt * i) / steps;
        trail.push([at[0] + v[0] * t + 0.5 * a[0] * t * t, at[1] + v[1] * t + 0.5 * a[1] * t * t]);
      }
      at = [at[0] + v[0] * dt + 0.5 * a[0] * dt * dt, at[1] + v[1] * dt + 0.5 * a[1] * dt * dt];
      v = [v[0] + a[0] * dt, v[1] + a[1] * dt];
      if (cables && ph.cables) {
        const part = dt / ph.dur;
        cables = [cables[0] + (ph.cables[0] - cables[0]) * part, cables[1] + (ph.cables[1] - cables[1]) * part];
      }
      time += dt;
      const age = ph.freeze ? Math.min(left, ph.dur) : dt * k;
      ages = new Map(pushes.map((f) => [keyOf(f), (ages.get(keyOf(f)) ?? 0) + age]));
      slow = k;
      note = ph.note ?? null;
      left -= age;
    }
  }
  const tidy = (n: number) => Math.round(n * 1e9) / 1e9 + 0;
  const forces: ForceArrow[] = pushes.map((f) => ({ kind: 'applied', name: f.name, n: f.n, angle: f.angle, tone: f.tone, age: ages.get(keyOf(f)) ?? 0 }));
  if (cables) {
    const weight = el.body.mass * (el.g ?? FORCES_G);
    const [tl, tr] = tensions(weight, cables[0], cables[1]);
    forces.push({ kind: 'weight', name: 'Weight', n: weight, angle: -90, age: 1 });
    forces.push({ kind: 'tension', name: el.names?.[0] ?? 'Tension', n: tl, angle: 180 - cables[0], age: 1 });
    forces.push({ kind: 'tension', name: el.names?.[1] ?? 'Tension', n: tr, angle: cables[1], age: 1 });
  }
  const sum = resultant(forces);
  return {
    at: [tidy(at[0]), tidy(at[1])],
    v: [tidy(v[0]), tidy(v[1])],
    a: [tidy(a[0]), tidy(a[1])],
    forces,
    net: { n: tidy(sum.n), angle: tidy(sum.angle) },
    cables: cables ? [tidy(cables[0]), tidy(cables[1])] : null,
    trail,
    time: tidy(time),
    slow,
    note,
  };
}
