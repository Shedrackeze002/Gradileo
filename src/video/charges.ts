/**
 * The physics of a charges element (see ChargesEl in script.ts): charged bodies that push and pull
 * one another as Coulomb's law says, F = k q₁ q₂ ÷ r², with r measured between their centres. A
 * body that shows its charges has + marks that never move and electrons that do: a phase sends
 * electrons from one body to another, or along a wire to the ground, and the charge of each body
 * is counted from the electrons it holds, so charge is conserved by construction. The electrons of
 * a metal sphere lean away from a negative body that is near and towards a positive one. A body
 * with a mass moves under the forces on it while a phase lets time run. Two parallel plates with a
 * potential difference ΔV between them, a distance d apart, have a uniform field E = ΔV ÷ d in the
 * gap: a charge there feels the force qE wherever it is, and the potential falls evenly from one
 * plate to the other. A pure function of the clips and the seconds played, like the rest of the
 * stage.
 */
import { linesBetween, type FieldLine } from './fieldlines.ts';
import { CHARGE_UNITS, type ChargeBody, type ChargesEl } from './script.ts';

export type { FieldLine } from './fieldlines.ts';

/** Coulomb's constant, in N·m²/C². */
export const COULOMB_K = 8.99e9;
/** The elementary charge, in coulombs. */
export const ELEMENTARY = 1.6e-19;

/** The size of the electric force between two point charges, in coulombs, a distance r apart. */
export const coulombForce = (q1: number, q2: number, r: number, k = COULOMB_K) => (k * Math.abs(q1 * q2)) / (r * r);

/** How many elementary charges make up a charge in coulombs: N = q ÷ e. */
export const electronsIn = (q: number) => Math.abs(q) / ELEMENTARY;

type Point = [number, number];
type Vector = { n: number; angle: number };

export interface ChargeBodyState {
  /** Where its centre is. */
  x: number;
  y: number;
  /** Its charge, in the element's unit: for a body that shows its charges, counted from the electrons on it. */
  charge: number;
  /** Where its + marks and the electrons at rest on it are, in the units of the view. */
  plus: Point[];
  minus: Point[];
  /** How far its electrons lean, and which way: a vector of length 0 (not at all) to 1. */
  lean: Point;
  /** The net force on it: its size in newtons and its direction in degrees anticlockwise from the right. */
  force: Vector;
  /** The force on it from each of the other bodies, by id; from the field of the plates, or the uniform field (`field`); and its weight (`weight`). */
  from: Record<string, Vector>;
  /** The electric field at its centre, in newtons per coulomb: of the other bodies and of the plates together. */
  field: Vector;
  /** The field there of each of the other bodies, by id, and of the plates or the uniform field (`field`). */
  fields: Record<string, Vector>;
  /** The potential where it is, in volts, when there are plates. */
  potential: number | null;
  /** Its kinetic energy, in joules. */
  kinetic: number;
  /** The electric potential energy it can still lose between the plates, in joules: its charge times the potential difference to the plate it is pulled towards. */
  stored: number | null;
  /** Where it has been while time ran. */
  trail: Point[];
  /** Its velocity in metres per second, as [right, up], and its speed. */
  v: Point;
  speed: number;
  /** How much of its ground wire is there (0 to 1), and the path of the wire from the sphere to the ground. */
  wire: number;
  wirePath: Point[];
}

export interface ChargesState {
  bodies: Record<string, ChargeBodyState>;
  /** Where the electrons on their way from one body to another are. */
  flying: Point[];
  /** The height of the table, when a sphere stands on it. */
  floor: number | null;
  /** Where the two plates are, and the potential difference between them (the first less the second), in volts. */
  plates: { at: [number, number]; volts: number } | null;
  /** Seconds of the motion that have run. */
  time: number;
  note: string | null;
}

const smooth = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** The i-th of `count` places spread evenly over a disc of radius 1 (a sunflower's seeds): one more place moves the others only a little. */
function seed(i: number, count: number): Point {
  const r = Math.sqrt((i + 0.5) / Math.max(count, i + 1));
  const a = i * GOLDEN + 0.6;
  return [r * Math.cos(a), r * Math.sin(a)];
}

const shapeOf = (b: ChargeBody) => b.shape ?? 'point';
/** The radius of the nucleus of an atom and of its two shells, as parts of the radius of the atom. */
export const ATOM_NUCLEUS = 0.24;
export const ATOM_SHELLS = [0.52, 0.88] as const;
const halfThick = (b: ChargeBody) => b.thick ?? (b.radius ?? 0) * (shapeOf(b) === 'cloth' ? 0.6 : 0.2);

/**
 * Where a mark sits on a body, from its centre and before the body is turned: the i-th + mark, or
 * the i-th electron when the body holds `count` of them (a number that changes smoothly while
 * electrons arrive and leave) and its electrons lean by `lean`. The electrons of an atom circle
 * its nucleus, so their places also depend on the seconds the atom has been shown (`age`).
 */
export function markAt(b: ChargeBody, kind: 'plus' | 'minus', i: number, count: number, lean: Point = [0, 0], age = 0): Point {
  const pairs = b.pairs ?? 1;
  const R = b.radius ?? 0;
  if (shapeOf(b) === 'atom') {
    if (kind === 'plus') {
      const [u, v] = seed(i, pairs);
      return [ATOM_NUCLEUS * 0.7 * R * u, ATOM_NUCLEUS * 0.7 * R * v];
    }
    // Two electrons in the first shell and the rest in the second, evenly spaced, the two shells turning opposite ways.
    const outer = i >= 2;
    const [j, n] = outer ? [i - 2, count - 2] : [i, Math.min(count, 2)];
    const a = (2 * Math.PI * j) / Math.max(n, j + 1) + (outer ? 0.9 - 0.55 * age : 0.9 * age);
    const r = ATOM_SHELLS[outer ? 1 : 0] * R;
    return [r * Math.cos(a), r * Math.sin(a)];
  }
  if (shapeOf(b) === 'rod') {
    const [step, row] = [(2 * R) / pairs, 0.4 * halfThick(b)];
    if (kind === 'plus') return [-R + (i + 0.5) * step, row];
    if (i < pairs) return [-R + (i + 0.5) * step, -row];
    // An extra electron sits between two others, from the working end; when that row is full, between the + marks.
    const j = i - pairs;
    return j < pairs - 1 ? [R - (j + 1) * step, -row] : [R - (j - pairs + 2) * step, row];
  }
  if (shapeOf(b) === 'cloth') {
    const T = halfThick(b);
    // As many columns as make the cells about square, and then no more than fill the rows evenly.
    const rows = Math.ceil(pairs / Math.max(1, Math.round(Math.sqrt((pairs * R) / T))));
    const cols = Math.ceil(pairs / rows);
    const [cw, ch] = [(2 * R) / cols, (2 * T) / rows];
    const cell = (n: number): Point => [-R + ((n % cols) + 0.5) * cw, T - (Math.floor(n / cols) + 0.5) * ch];
    if (kind === 'plus') return [cell(i)[0] - 0.2 * cw, cell(i)[1] - 0.12 * ch];
    if (i < pairs) return [cell(i)[0] + 0.2 * cw, cell(i)[1] - 0.12 * ch];
    // An extra electron sits over a pair, from the last pair back.
    const at = cell(pairs - 1 - ((i - pairs) % pairs));
    return [at[0], at[1] + 0.24 * ch];
  }
  // A sphere: each electron beside its + mark while the sphere is neutral and nothing is near.
  if (kind === 'plus') {
    const [u, v] = seed(i, pairs);
    return [0.76 * R * u - 0.07 * R, 0.76 * R * v + 0.05 * R];
  }
  let [u, v] = seed(i, count);
  const pol = Math.hypot(lean[0], lean[1]);
  if (pol > 1e-9) {
    // Pushed along the lean, more in the middle than at the rim (so that none passes another), and squeezed to stay inside the circle.
    const [dx, dy] = [lean[0] / pol, lean[1] / pol];
    const [a, c] = [u * dx + v * dy, -u * dy + v * dx];
    const push = 0.8 * pol;
    const a2 = (a + push) / (1 + push * a);
    const c2 = c * Math.sqrt(Math.max(0, 1 - a2 * a2) / Math.max(1e-9, 1 - a * a));
    [u, v] = [a2 * dx - c2 * dy, a2 * dy + c2 * dx];
  }
  return [0.76 * R * u + 0.07 * R, 0.76 * R * v - 0.05 * R];
}

/** A point of a body, turned with the body and put where the body is. */
function placed(b: ChargeBody, at: { x: number; y: number }, [u, v]: Point): Point {
  const t = shapeOf(b) === 'rod' || shapeOf(b) === 'cloth' ? ((b.turn ?? 0) * Math.PI) / 180 : 0;
  return [at.x + u * Math.cos(t) - v * Math.sin(t), at.y + u * Math.sin(t) + v * Math.cos(t)];
}

/** Where the charge of a body acts from: its centre, or half way to the working end of a rod. */
const seat = (b: ChargeBody, at: { x: number; y: number }): Point => (shapeOf(b) === 'rod' ? placed(b, at, [0.5 * (b.radius ?? 0), 0]) : [at.x, at.y]);

/** The point a fraction f of the way along a path. */
function along(path: Point[], f: number): Point {
  const lengths = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]));
  let left = clamp01(f) * lengths.reduce((n, l) => n + l, 0);
  for (const [i, l] of lengths.entries()) {
    if (left <= l || i === lengths.length - 1) {
      const part = l > 0 ? Math.min(1, left / l) : 0;
      return [path[i][0] + (path[i + 1][0] - path[i][0]) * part, path[i][1] + (path[i + 1][1] - path[i][1]) * part];
    }
    left -= l;
  }
  return path[path.length - 1];
}

interface Live {
  x: number;
  y: number;
  /** The charge of a body without marks, in the element's unit. */
  q: number;
  /** The electrons on a body with marks. */
  m: number;
  v: Point;
  wire: number;
  /** It has run into another body or a plate, and stays there. */
  stuck: boolean;
  /** The plate it has landed on: the first (0) or the second (1). */
  on: number | null;
  trail: Point[];
}

/** The half width of the hole in a plate, as a part of the length of the plate. */
export const PLATE_HOLE = 0.07;

/** One electron on its way: which place it leaves and which it takes, and how far it has gone (0 to 1). */
interface Hop {
  from: string;
  to: string;
  fromIndex: number;
  toIndex: number;
  u: number;
}

/**
 * The state of a charges element after its clips have been played for the seconds given, in order.
 * `age` is how long the element has been shown, in seconds: the electrons of an atom circle all the time.
 */
export function chargesAt(el: ChargesEl, plays: Array<[clip: string, seconds: number]> = [], age = 0): ChargesState {
  const k = el.k ?? COULOMB_K;
  const unit = CHARGE_UNITS[el.unit ?? 'μC'];
  const mark = el.mark ?? 1;
  const spec = new Map(el.bodies.map((b) => [b.id, b]));
  const marked = (b: ChargeBody) => b.pairs !== undefined;
  const stands = el.bodies.filter((b) => shapeOf(b) === 'sphere' && b.stand !== false);
  const floor = el.floor ?? (stands.length ? Math.min(...stands.map((b) => (b.y ?? 0) - 1.9 * (b.radius ?? 0))) : null);
  const start = () => new Map<string, Live>(el.bodies.map((b) => [b.id, { x: b.x, y: b.y ?? 0, q: b.charge, m: marked(b) ? (b.pairs ?? 0) - Math.round(b.charge / mark) : 0, v: b.v ? [b.v[0], b.v[1]] : [0, 0], wire: 0, stuck: false, on: null, trail: [] }]));
  let now = start();
  // The plates: where they are and the potential difference between them, which a phase can change.
  const upright = el.plates?.across !== 'y';
  let gapAt: [number, number] = el.plates ? [el.plates.at[0], el.plates.at[1]] : [0, 0];
  let volts = el.plates?.volts ?? 0;
  /** The field that does not come from the bodies, at a point: of the plates, in the gap between them, or the uniform field everywhere. */
  const outer = (x: number, y: number, at: [number, number], pd: number): Point => {
    if (el.uniform) {
      const a = ((el.uniform.angle ?? 0) * Math.PI) / 180;
      return [el.uniform.field * Math.cos(a), el.uniform.field * Math.sin(a)];
    }
    if (!el.plates) return [0, 0];
    const [c, o] = upright ? [x, y] : [y, x];
    if (c < Math.min(at[0], at[1]) || c > Math.max(at[0], at[1]) || o < el.plates.span[0] || o > el.plates.span[1]) return [0, 0];
    // From the plate at the higher potential to the other: ΔV ÷ d.
    const e = pd / (at[1] - at[0]);
    return upright ? [e, 0] : [0, e];
  };
  let hops: Hop[] = [];
  let time = 0;
  let note: string | null = null;
  const wireOf = (b: ChargeBody, at: { x: number; y: number }): Point[] => {
    const [side, R] = [b.wire === 'left' ? -1 : 1, b.radius ?? 0];
    return [
      [at.x + side * R, at.y],
      [at.x + side * 1.55 * R, at.y],
      // The wire ends at the ground symbol, which hangs just over the table.
      [at.x + side * 1.55 * R, (floor ?? at.y - 1.9 * R) + 0.3 * R],
    ];
  };
  const chargeOf = (id: string, onIt?: number) => {
    const b = spec.get(id)!;
    return marked(b) ? ((b.pairs ?? 0) - (onIt ?? now.get(id)!.m)) * mark : now.get(id)!.q;
  };

  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) throw new Error(`Charges "${el.id}" has no clip "${name}".`);
    if (clip.reset) {
      now = start();
      time = 0;
      gapAt = el.plates ? [el.plates.at[0], el.plates.at[1]] : [0, 0];
      volts = el.plates?.volts ?? 0;
    }
    let left = Math.max(0, seconds);
    for (const [pi, ph] of clip.phases.entries()) {
      if (pi > 0 && left <= 1e-9) break;
      const dt = Math.min(left, ph.dur);
      const done = dt >= ph.dur - 1e-9;
      const part = smooth(dt / ph.dur);
      hops = [];
      for (const [id, to] of Object.entries(ph.to ?? {})) {
        const b = now.get(id)!;
        const [x, y] = typeof to === 'number' ? [to, b.y] : to;
        // A body that is carried is held: it stops moving, and it can be let go again later.
        now.set(id, { ...b, x: b.x + (x - b.x) * part, y: b.y + (y - b.y) * part, v: [0, 0], stuck: false, on: null, trail: [] });
      }
      // A body that is thrown sets off as the phase starts.
      for (const [id, v] of Object.entries(ph.launch ?? {})) {
        const b = now.get(id)!;
        if (dt > 0) now.set(id, { ...b, v: [v[0], v[1]], stuck: false, on: null });
      }
      const voltsFrom = volts;
      /** The potential difference a part of the way through the phase. */
      const voltsAt = (f: number) => (ph.volts === undefined ? voltsFrom : voltsFrom + (ph.volts - voltsFrom) * smooth(clamp01(f)));
      volts = voltsAt(dt / ph.dur);
      if (ph.plates) gapAt = [gapAt[0] + (ph.plates[0] - gapAt[0]) * part, gapAt[1] + (ph.plates[1] - gapAt[1]) * part];
      for (const [id, q] of Object.entries(ph.charge ?? {})) {
        const b = now.get(id)!;
        now.set(id, { ...b, q: b.q + (q - b.q) * part });
      }
      // A wire is put in place, or taken away, over the first half second of the phase.
      for (const [id, on] of Object.entries(ph.ground ?? {})) {
        const b = now.get(id)!;
        const grown = clamp01(dt / Math.min(0.5, ph.dur));
        now.set(id, { ...b, wire: on ? Math.max(b.wire, grown) : Math.min(b.wire, 1 - grown) });
      }
      // Electrons cross one after another: each sets off a little after the one before, and the last arrives as the phase ends.
      const gone = new Map<string, number>();
      const come = new Map<string, number>();
      for (const t of ph.electrons ?? []) {
        const flight = 1 / (1 + (t.n - 1) * 0.35);
        for (let i = 0; i < t.n; i++) {
          const u = done ? 1 : clamp01((dt / ph.dur - i * 0.35 * flight) / flight);
          const [g, c] = [gone.get(t.from) ?? 0, come.get(t.to) ?? 0];
          hops.push({ from: t.from, to: t.to, fromIndex: t.from === 'ground' ? -1 : now.get(t.from)!.m - 1 - g, toIndex: t.to === 'ground' ? -1 : now.get(t.to)!.m + c, u });
          gone.set(t.from, g + 1);
          come.set(t.to, c + 1);
        }
      }
      if (done) {
        for (const h of hops) {
          if (h.from !== 'ground') now.get(h.from)!.m -= 1;
          if (h.to !== 'ground') now.get(h.to)!.m += 1;
        }
        hops = [];
      }
      if (ph.fly && dt > 1e-9) {
        const span = dt * (ph.rate ?? el.rate ?? 1);
        const steps = Math.max(1, Math.ceil(dt * 400));
        const h = span / steps;
        const all = el.bodies.map((b) => ({ b, s: now.get(b.id)!, q: chargeOf(b.id) * unit }));
        const movers = all.filter((o) => o.b.mass && !o.s.stuck);
        const reach = (b: ChargeBody) => b.radius ?? 0;
        // A test charge with no charge only marks a place or a path: nothing stops at it, and it stops at nothing but a plate.
        const mark = (b: ChargeBody) => !!b.test && b.charge === 0 && b.pairs === undefined;
        let pd = volts;
        const accel = (o: (typeof all)[number]): Point => {
          // The field of the plates and the weight, and then the pull of every other body.
          const field = outer(o.s.x, o.s.y, gapAt, pd);
          let [ax, ay] = [(o.q * field[0]) / o.b.mass!, (o.q * field[1]) / o.b.mass! - (el.g ?? 0)];
          for (const p of all) {
            if (p === o || p.b.test) continue;
            const [dx, dy] = [o.s.x - p.s.x, o.s.y - p.s.y];
            const r = Math.hypot(dx, dy);
            if (r < 1e-12) continue;
            const f = (k * o.q * p.q) / (r * r * r) / o.b.mass!;
            ax += f * dx;
            ay += f * dy;
          }
          return [ax, ay];
        };
        // Velocity Verlet: half a step of velocity, a step of position, and the other half step with the new forces.
        const plate = el.plates;
        const [vx0, vx1, vy0, vy1] = el.view;
        for (const o of movers) if (!o.s.trail.length) o.s.trail = [[o.s.x, o.s.y]];
        pd = voltsAt(0);
        let before = movers.map(accel);
        for (let n = 0; n < steps && movers.some((o) => !o.s.stuck); n++) {
          const was = movers.map((o): Point => [o.s.x, o.s.y]);
          const wasV = movers.map((o): Point => [o.s.v[0], o.s.v[1]]);
          movers.forEach((o, i) => {
            if (o.s.stuck) return;
            o.s.v = [o.s.v[0] + (h / 2) * before[i][0], o.s.v[1] + (h / 2) * before[i][1]];
            o.s.x += h * o.s.v[0];
            o.s.y += h * o.s.v[1];
          });
          // The potential difference follows the phase while the bodies move.
          pd = voltsAt(((n + 1) / steps) * (dt / ph.dur));
          // A body that reaches a plate stops on it, unless it goes through the hole in the middle; one that leaves the picture stops too.
          movers.forEach((o, i) => {
            if (o.s.stuck) return;
            if (plate) {
              const [c0, c1, o1] = upright ? [was[i][0], o.s.x, o.s.y] : [was[i][1], o.s.y, o.s.x];
              for (const [pi, pc] of gapAt.entries()) {
                // Its edge meets the plate before its centre does.
                const face = pc + Math.sign(c0 - pc) * (o.b.radius ?? 0);
                if (c0 === face || (c0 - face) * (c1 - face) > 0) continue;
                if (o1 < plate.span[0] || o1 > plate.span[1]) continue;
                const hole = plate.hole === (pi === 0 ? 'first' : 'second') && Math.abs(o1 - (plate.span[0] + plate.span[1]) / 2) < PLATE_HOLE * (plate.span[1] - plate.span[0]);
                if (hole) {
                  // It leaves the field part of the way through the step: its speed past the plate is the one that keeps its energy, ½mv² + qV.
                  const fallen = pd * (clamp01((gapAt[1] - c0) / (gapAt[1] - gapAt[0])) - (pi === 0 ? 1 : 0));
                  const squared = wasV[i][0] ** 2 + wasV[i][1] ** 2 + (2 * o.q * fallen) / o.b.mass!;
                  const speed = Math.hypot(o.s.v[0], o.s.v[1]);
                  if (squared > 0 && speed > 0) o.s.v = [(o.s.v[0] * Math.sqrt(squared)) / speed, (o.s.v[1] * Math.sqrt(squared)) / speed];
                  continue;
                }
                if (upright) o.s.x = face;
                else o.s.y = face;
                o.s.v = [0, 0];
                o.s.stuck = true;
                o.s.on = pi;
              }
            }
            const far = 0.15 * Math.max(vx1 - vx0, vy1 - vy0);
            if (!o.s.stuck && (o.s.x < vx0 - far || o.s.x > vx1 + far || o.s.y < vy0 - far || o.s.y > vy1 + far)) {
              o.s.v = [0, 0];
              o.s.stuck = true;
            }
            if (n % 4 === 3 || n === steps - 1 || o.s.stuck) o.s.trail = [...o.s.trail, [o.s.x, o.s.y]];
          });
          const after = movers.map(accel);
          movers.forEach((o, i) => {
            if (o.s.stuck) return;
            o.s.v = [o.s.v[0] + (h / 2) * after[i][0], o.s.v[1] + (h / 2) * after[i][1]];
          });
          before = after;
          // A body that reaches another stops there, touching it.
          for (const o of movers) {
            if (o.s.stuck || mark(o.b)) continue;
            for (const p of all) {
              if (p === o || mark(p.b)) continue;
              // A little more than the two radii, so that their outlines meet and do not overlap.
              const gap = Math.max((reach(o.b) + reach(p.b)) * 1.08, (el.view[1] - el.view[0]) * 0.03);
              const [dx, dy] = [o.s.x - p.s.x, o.s.y - p.s.y];
              const r = Math.hypot(dx, dy);
              if (r >= gap) continue;
              const back = r > 1e-12 ? gap / r : 1;
              [o.s.x, o.s.y] = [p.s.x + dx * back, p.s.y + dy * back];
              o.s.v = [0, 0];
              o.s.stuck = true;
              if (p.b.mass) {
                p.s.v = [0, 0];
                p.s.stuck = true;
              }
            }
          }
        }
        time += span;
      }
      note = ph.note ?? null;
      left -= dt;
    }
  }

  // The electrons at rest on each body: the ones it had, less those that have set off, plus those that have arrived.
  const rest = new Map<string, number[]>();
  const layout = new Map<string, number>();
  for (const b of el.bodies) {
    if (!marked(b)) continue;
    const m = now.get(b.id)!.m;
    const leaving = new Set(hops.filter((h) => h.from === b.id && h.u > 0).map((h) => h.fromIndex));
    const arrived = hops.filter((h) => h.to === b.id && h.u >= 1).map((h) => h.toIndex);
    rest.set(b.id, [...Array.from({ length: Math.max(0, m) }, (_, i) => i).filter((i) => !leaving.has(i)), ...arrived]);
    layout.set(b.id, m - hops.filter((h) => h.from === b.id).reduce((n, h) => n + h.u, 0) + hops.filter((h) => h.to === b.id).reduce((n, h) => n + h.u, 0));
  }
  const charge = (id: string) => (rest.has(id) ? chargeOf(id, rest.get(id)!.length) : chargeOf(id));
  const seats = new Map(el.bodies.map((b) => [b.id, seat(b, now.get(b.id)!)]));

  // The electrons of a metal sphere are pushed against the field of the other bodies.
  const leans = new Map<string, Point>();
  for (const b of el.bodies) {
    if (shapeOf(b) !== 'sphere' || !marked(b)) continue;
    const s = now.get(b.id)!;
    let [ex, ey] = [0, 0];
    for (const o of el.bodies) {
      if (o.id === b.id || o.test) continue;
      const at = seats.get(o.id)!;
      const [dx, dy] = [s.x - at[0], s.y - at[1]];
      const r = Math.hypot(dx, dy);
      if (r < 1e-12) continue;
      ex += (charge(o.id) * dx) / r ** 3;
      ey += (charge(o.id) * dy) / r ** 3;
    }
    const e = Math.hypot(ex, ey);
    const half = (el.sway ?? 4 * mark) / (2.5 * (b.radius ?? 1)) ** 2;
    const pol = e / (e + half);
    leans.set(b.id, e > 0 ? [(-ex / e) * pol, (-ey / e) * pol] : [0, 0]);
  }

  const tidy = (n: number) => Number(n.toPrecision(12)) + 0;
  const vector = (x: number, y: number): Vector => {
    const n = Math.hypot(x, y);
    return { n: tidy(n), angle: n > 0 ? tidy((Math.atan2(y, x) * 180) / Math.PI) : 0 };
  };
  const where = (id: string, kind: 'plus' | 'minus', i: number): Point => placed(spec.get(id)!, now.get(id)!, markAt(spec.get(id)!, kind, i, layout.get(id) ?? 0, leans.get(id), age));
  const bodies: ChargesState['bodies'] = {};
  for (const b of el.bodies) {
    const s = now.get(b.id)!;
    const at = seats.get(b.id)!;
    const q = charge(b.id);
    const from: Record<string, Vector> = {};
    const fields: Record<string, Vector> = {};
    let [fx, fy, ex, ey] = [0, 0, 0, 0];
    for (const o of el.bodies) {
      if (o.id === b.id || o.test) continue;
      const other = seats.get(o.id)!;
      const [dx, dy] = [at[0] - other[0], at[1] - other[1]];
      const r = Math.hypot(dx, dy);
      if (r < 1e-12) continue;
      // The field of a positive charge points away from it; the force on a charge is its charge times the field.
      const e = (k * charge(o.id) * unit) / r ** 3;
      if (e !== 0) fields[o.id] = vector(e * dx, e * dy);
      ex += e * dx;
      ey += e * dy;
      const f = e * q * unit;
      if (f !== 0) from[o.id] = vector(f * dx, f * dy);
      fx += f * dx;
      fy += f * dy;
    }
    // The field of the plates, the force qE it gives, and the weight.
    const [ox, oy] = outer(at[0], at[1], gapAt, volts);
    if (ox !== 0 || oy !== 0) {
      fields.field = vector(ox, oy);
      ex += ox;
      ey += oy;
      if (q !== 0) from.field = vector(q * unit * ox, q * unit * oy);
      fx += q * unit * ox;
      fy += q * unit * oy;
    }
    if (el.g && b.mass) {
      from.weight = vector(0, -b.mass * el.g);
      fy -= b.mass * el.g;
    }
    // The potential falls evenly from the first plate to the second; a body on a plate is at the potential of that plate.
    let potential: number | null = null;
    let stored: number | null = null;
    if (el.plates) {
      const base = el.plates.base ?? 0;
      const part = s.on !== null ? 1 - s.on : clamp01((gapAt[1] - (upright ? at[0] : at[1])) / (gapAt[1] - gapAt[0]));
      potential = base + volts * part;
      // What it can still lose: to the plate at the lower potential for a positive charge, and at the higher for a negative one.
      const rest = q > 0 ? Math.min(base, base + volts) : Math.max(base, base + volts);
      stored = q * unit * (potential - rest);
    }
    bodies[b.id] = {
      x: tidy(s.x),
      y: tidy(s.y),
      charge: tidy(q),
      plus: marked(b) ? Array.from({ length: b.pairs ?? 0 }, (_, i) => where(b.id, 'plus', i)) : [],
      minus: (rest.get(b.id) ?? []).map((i) => where(b.id, 'minus', i)),
      lean: leans.get(b.id) ?? [0, 0],
      force: vector(fx, fy),
      from,
      field: vector(ex, ey),
      fields,
      potential: potential === null ? null : tidy(potential),
      kinetic: b.mass ? tidy(0.5 * b.mass * (s.v[0] ** 2 + s.v[1] ** 2)) : 0,
      stored: stored === null ? null : tidy(stored),
      trail: s.trail,
      v: [tidy(s.v[0]), tidy(s.v[1])],
      speed: tidy(Math.hypot(s.v[0], s.v[1])),
      wire: s.wire,
      wirePath: shapeOf(b) === 'sphere' ? wireOf(b, s) : [],
    };
  }
  // An electron in flight goes straight from its old place to its new one, or along the wire to the ground.
  const flying: Point[] = [];
  for (const h of hops) {
    if (h.u <= 0 || h.u >= 1) continue;
    const f = smooth(h.u);
    if (h.to === 'ground') flying.push(along([where(h.from, 'minus', h.fromIndex), ...bodies[h.from].wirePath], f));
    else if (h.from === 'ground') flying.push(along([...bodies[h.to].wirePath].reverse().concat([where(h.to, 'minus', h.toIndex)]), f));
    else flying.push(along([where(h.from, 'minus', h.fromIndex), where(h.to, 'minus', h.toIndex)], f));
  }
  return { bodies, flying, floor, plates: el.plates ? { at: [tidy(gapAt[0]), tidy(gapAt[1])], volts: tidy(volts) } : null, time: tidy(time), note };
}

export interface ChargesPeaks {
  /** The largest force, in newtons. */
  force: number;
  /** The strongest field at a test charge, in newtons per coulomb. */
  field: number;
  /** The greatest speed, in metres per second. */
  speed: number;
  /** The most energy a body has, kinetic and stored together, in joules. */
  energy: number;
}

const peaks = new WeakMap<ChargesEl, ChargesPeaks>();

/**
 * The largest force, field, speed and energy of an element, to scale its arrows and bars by: at its
 * start, at the end of each phase and, while time runs, at eight moments of the phase, with the
 * clips played in the order they are written.
 */
export function peaksOf(el: ChargesEl): ChargesPeaks {
  const known = peaks.get(el);
  if (known !== undefined) return known;
  const peak: ChargesPeaks = { force: 0, field: 0, speed: 0, energy: 0 };
  const look = (plays: Array<[string, number]>) => {
    for (const [id, b] of Object.entries(chargesAt(el, plays).bodies)) {
      peak.force = Math.max(peak.force, b.force.n, ...Object.values(b.from).map((f) => f.n));
      if (el.bodies.find((o) => o.id === id)?.test) peak.field = Math.max(peak.field, b.field.n, ...Object.values(b.fields).map((f) => f.n));
      peak.speed = Math.max(peak.speed, b.speed);
      peak.energy = Math.max(peak.energy, b.kinetic + Math.max(0, b.stored ?? 0));
    }
  };
  look([]);
  const before: Array<[string, number]> = [];
  for (const [name, clip] of Object.entries(el.clips)) {
    if (clip.reset) before.length = 0;
    let t = 0;
    for (const ph of clip.phases) {
      if (ph.fly) for (let i = 1; i < 8; i++) look([...before, [name, t + (ph.dur * i) / 8]]);
      t += ph.dur;
      look([...before, [name, t]]);
    }
    before.push([name, t]);
  }
  peaks.set(el, peak);
  return peak;
}

/** The largest force of an element, in newtons. */
export const peakForce = (el: ChargesEl): number => peaksOf(el).force;

const largest = new WeakMap<ChargesEl, number>();
/** The largest charge an element ever has, at its start or by the end of a phase: the charge that has the full number of field lines. */
function largestCharge(el: ChargesEl): number {
  const known = largest.get(el);
  if (known !== undefined) return known;
  let top = Math.max(0, ...el.bodies.filter((b) => !b.test).map((b) => Math.abs(b.charge)));
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) for (const [id, q] of Object.entries(ph.charge ?? {})) if (!el.bodies.find((b) => b.id === id)?.test) top = Math.max(top, Math.abs(q));
  largest.set(el, top);
  return top;
}

/**
 * The field lines of the charges of an element (not its test charges), followed step by step along
 * the field. They leave positive charges, evenly spaced round each, as many as the charge is large;
 * they end on negative charges or leave the picture; and the lines that a negative charge is still
 * owed are followed backwards from it. Each line is given in the direction of the field.
 */
export function fieldLines(el: ChargesEl, state: ChargesState): FieldLine[] {
  const top = largestCharge(el);
  const sources = el.bodies.filter((b) => !b.test).map((b) => ({ x: state.bodies[b.id].x, y: state.bodies[b.id].y, q: state.bodies[b.id].charge })).filter((o) => Math.abs(o.q) > 1e-9 * Math.max(top, 1e-300));
  if (!sources.length || !(top > 0)) return [];
  return linesBetween(sources, el.view, el.lines ?? 12, top);
}
