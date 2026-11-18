/**
 * The physics of a magnets element (see MagnetsEl in script.ts): the magnetic field of bar magnets
 * and of long straight wires seen end-on, in one plane. A wire that carries a current I has the
 * field B = μ₀I ÷ 2πr at a distance r, at right angles to the line from the wire, and it circles
 * the wire anticlockwise when the current comes out of the page (the right-hand rule). A bar
 * magnet is two poles, one near each end: the field points away from the north pole and towards
 * the south pole, and falls with the square of the distance from each. Fields add as vectors, so
 * rows of wires make the field of a solenoid and two magnets make the field between their poles.
 * The force on a wire is F = BIL, at right angles to the field and to the current. A wire that has
 * a mass moves under that force (and its weight), and the coil of a motor is turned about its axle
 * by the forces on its two sides, step by step, while a clip plays. A magnet that is pushed into a
 * coil changes the flux through its turns, and the emf induced is the rate of that change. A pure
 * function of the clips and the seconds played, like the rest of the stage.
 */
import { linesBetween, type LineSource } from './fieldlines.ts';
import type { MagnetsEl } from './script.ts';

/** The permeability of free space, in T·m/A. */
export const MU0 = 4e-7 * Math.PI;

type Point = [number, number];

export interface MagnetsState {
  /** Seconds played so far. */
  time: number;
  /** Where each thing is, by id, in the element's length unit. */
  at: Record<string, Point>;
  /** The way each bar's north pole faces, in degrees. */
  angle: Record<string, number>;
  /** The current of each wire, in amperes. */
  amps: Record<string, number>;
  /** How far the domains of each piece of iron are lined up, from 0 to 1. */
  order: Record<string, number>;
  /** The velocity of each wire that has a mass, in metres per second. */
  v: Record<string, Point>;
  /** The coil: the angle of its first side in degrees, and how fast it turns in radians per second (anticlockwise is positive). */
  spin: { angle: number; omega: number } | null;
}

/** Steps of the model for each second of video, while a wire or a coil moves. */
const STEPS = 240;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x);
const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Everything in an element that has a place. */
const placed = (el: MagnetsEl) => [...(el.bars ?? []), ...(el.wires ?? []), ...(el.iron ?? []), ...(el.compasses ?? []), ...(el.probes ?? [])];

/** The clips played so far, in order, each with the seconds of video it has run for. */
export type MagnetPlays = Array<[clip: string, seconds: number]>;

/**
 * The state of a magnets element after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for. Within a phase each thing eases from where it was to
 * where the phase puts it. A wire with a mass and a coil move while a clip plays, under the forces
 * on them, at `rate` seconds of the model for each second of video.
 */
export function magnetsAt(el: MagnetsEl, plays: MagnetPlays = []): MagnetsState {
  const state: MagnetsState = {
    time: 0,
    at: Object.fromEntries(placed(el).map((o) => [o.id, [o.at[0], o.at[1]] as Point])),
    angle: Object.fromEntries((el.bars ?? []).map((b) => [b.id, b.angle ?? 0])),
    amps: Object.fromEntries((el.wires ?? []).map((w) => [w.id, w.amps])),
    order: Object.fromEntries((el.iron ?? []).map((b) => [b.id, b.order ?? 0])),
    v: Object.fromEntries((el.wires ?? []).filter((w) => w.mass !== undefined).map((w) => [w.id, [0, 0] as Point])),
    spin: el.coil ? { angle: el.coil.angle ?? 0, omega: 0 } : null,
  };
  if (el.coil) {
    state.at[el.coil.id] = [el.coil.at[0], el.coil.at[1]];
    state.amps[el.coil.id] = el.coil.amps;
  }
  const moving = el.coil !== undefined || (el.wires ?? []).some((w) => w.mass !== undefined);
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const from = { at: { ...state.at }, angle: { ...state.angle }, amps: { ...state.amps }, order: { ...state.order } };
      /** Everything the phase carries, turns or changes, this far through it. */
      const ease = (f: number) => {
        for (const [id, [x, y]] of Object.entries(ph.to ?? {})) if (id in from.at) state.at[id] = [from.at[id][0] + (x - from.at[id][0]) * f, from.at[id][1] + (y - from.at[id][1]) * f];
        for (const [id, a] of Object.entries(ph.turn ?? {})) if (id in from.angle) state.angle[id] = from.angle[id] + (a - from.angle[id]) * f;
        for (const [id, i] of Object.entries(ph.amps ?? {})) if (id in from.amps) state.amps[id] = from.amps[id] + (i - from.amps[id]) * f;
        for (const [id, o] of Object.entries(ph.order ?? {})) if (id in from.order) state.order[id] = from.order[id] + (o - from.order[id]) * f;
      };
      const played = Math.min(left, ph.dur);
      if (moving) {
        const steps = Math.max(1, Math.ceil(played * STEPS));
        const h = played / steps;
        for (let k = 0; k < steps; k++) {
          ease(smooth(clamp01(((k + 0.5) * h) / ph.dur)));
          advance(el, state, h * (el.rate ?? 1));
        }
      }
      ease(smooth(clamp01(left / ph.dur)));
      state.time += played;
      left -= ph.dur;
    }
  }
  return state;
}

/**
 * Let a short time pass: each wire with a mass is pushed by the field (and pulled down the screen
 * by its weight, when the element has `g`), and the coil is turned by the forces on its sides and
 * slowed by friction. A wire that rests on supports cannot go below where it started, and a wire
 * that reaches the edge of the picture is stopped there.
 */
function advance(el: MagnetsEl, state: MagnetsState, dt: number): void {
  const metres = el.length?.metres ?? 1;
  const [x0, x1, y0, y1] = el.view;
  const edge = (x1 - x0) * 0.025;
  for (const w of el.wires ?? []) {
    if (w.mass === undefined) continue;
    const [fx, fy] = wireForce(el, state, w.id);
    const v = state.v[w.id];
    v[0] += (fx / w.mass) * dt;
    v[1] += (fy / w.mass - (el.g ?? 0)) * dt;
    let [x, y] = state.at[w.id];
    x += (v[0] * dt) / metres;
    y += (v[1] * dt) / metres;
    if (w.rests && y <= w.at[1]) {
      y = w.at[1];
      v[1] = Math.max(0, v[1]);
    }
    if (x < x0 + edge || x > x1 - edge) {
      x = Math.min(x1 - edge, Math.max(x0 + edge, x));
      v[0] = 0;
    }
    if (y < y0 + edge || y > y1 - edge) {
      y = Math.min(y1 - edge, Math.max(y0 + edge, y));
      v[1] = 0;
    }
    state.at[w.id] = [x, y];
  }
  if (el.coil && state.spin) {
    // Friction is taken at the end of the step, so that a large friction cannot make the coil overshoot.
    const drag = ((el.coil.friction ?? 0) * dt) / el.coil.inertia;
    state.spin.omega = (state.spin.omega + (coilTorque(el, state) / el.coil.inertia) * dt) / (1 + drag);
    state.spin.angle += deg(state.spin.omega * dt);
  }
}

/**
 * The strength of a pole, in T × (length unit)²: a bar with twelve field lines has 0.01 T a tenth
 * of the picture's width from one of its poles. Bar magnets are given no strength of their own, so
 * this only sets how their fields compare with those of wires in the same picture.
 */
const poleStrength = (el: MagnetsEl, lines: number) => (lines / 12) * 0.01 * ((el.view[1] - el.view[0]) / 10) ** 2;

/** The two poles of each bar: where they are, how many lines leave or end there, and the bar they belong to. */
export function polesOf(el: MagnetsEl, state: MagnetsState): Array<LineSource & { bar: string }> {
  return (el.bars ?? []).flatMap((b) => {
    const a = rad(state.angle[b.id]);
    const reach = b.long / 2 - Math.min(b.thick / 2, b.long / 4);
    const lines = b.lines ?? 12;
    const [cx, cy] = state.at[b.id];
    // No line leaves along the axis of the bar: the lines are spread evenly either side of it.
    const pole = (sign: 1 | -1) => ({ x: cx + sign * reach * Math.cos(a), y: cy + sign * reach * Math.sin(a), q: sign * lines, turn: a, offset: Math.PI / lines, bar: b.id });
    return [pole(1), pole(-1)];
  });
}

/** Whether a point is in the gap between the pole faces of the magnet (anywhere, when the picture has no such magnet). */
const inGap = (el: MagnetsEl, x: number, y: number) => !el.yoke || (x >= el.yoke.faces[0] && x <= el.yoke.faces[1] && y >= el.yoke.span[0] && y <= el.yoke.span[1]);

/** The field of the wires and the uniform field at a point, in teslas, leaving out one wire if asked. */
function currentField(el: MagnetsEl, state: MagnetsState, x: number, y: number, without?: string): Point {
  const metres = el.length?.metres ?? 1;
  // Between the pole faces of a magnet the field is uniform; outside the gap there is none.
  let [bx, by] = (inGap(el, x, y) && el.uniform) || [0, 0];
  for (const w of el.wires ?? []) {
    if (w.id === without) continue;
    const [dx, dy] = [x - state.at[w.id][0], y - state.at[w.id][1]];
    const r2 = dx * dx + dy * dy;
    if (r2 < 1e-24) continue;
    // μ₀I ÷ 2πr, turned a quarter turn anticlockwise from the line out of the wire.
    const k = (MU0 * state.amps[w.id]) / (2 * Math.PI * r2 * metres);
    bx += -dy * k;
    by += dx * k;
  }
  return [bx, by];
}

/** The magnetic field at a point, in teslas: the poles of the bars, the wires and the uniform field, leaving out one bar or wire if asked. */
export function fieldAt(el: MagnetsEl, state: MagnetsState, x: number, y: number, without?: string): Point {
  let [bx, by] = currentField(el, state, x, y, without);
  for (const p of polesOf(el, state)) {
    if (p.bar === without) continue;
    const [dx, dy] = [x - p.x, y - p.y];
    const r = Math.hypot(dx, dy);
    if (r < 1e-12) continue;
    const k = poleStrength(el, p.q) / r ** 3;
    bx += dx * k;
    by += dy * k;
  }
  return [bx, by];
}

/** A field line: its points, in the direction of the field. A closed one comes back to where it started. */
export interface MagnetLine {
  points: Point[];
  closed: boolean;
}

/**
 * The field lines of an element: out of each north pole and round to a south pole (or out of the
 * picture), and from each seed along the field both ways until the line closes on itself or leaves
 * the picture. A uniform field with no seeds has straight lines, evenly spaced.
 */
export function magnetLines(el: MagnetsEl, state: MagnetsState): MagnetLine[] {
  const [x0, x1, y0, y1] = el.view;
  const [wide, high] = [x1 - x0, y1 - y0];
  const lines: MagnetLine[] = [];
  const poles = polesOf(el, state);
  if (poles.length) {
    const top = Math.max(...poles.map((p) => Math.abs(p.q)));
    // The tracer works in line counts: a field in teslas is that many lines for each unit of pole strength.
    const unit = poleStrength(el, 1);
    const extra = (el.wires?.length ?? 0) > 0 || el.uniform ? (x: number, y: number): Point => currentField(el, state, x, y).map((b) => b / unit) as Point : undefined;
    for (const line of linesBetween(poles, el.view, top, top, extra)) lines.push({ points: line.points, closed: false });
  }
  const step = wide / 500;
  const pad = wide * 0.05;
  const most = Math.ceil((4 * (wide + high)) / step);
  const outside = (x: number, y: number) => x < x0 - pad || x > x1 + pad || y < y0 - pad || y > y1 + pad;
  /** Follow the field from a point, forwards or backwards, by the midpoint rule (only as far as the edge of the gap of the magnet, if asked). */
  const follow = (sx: number, sy: number, way: 1 | -1, inGapOnly = false): MagnetLine => {
    let [x, y] = [sx, sy];
    const points: Point[] = [[x, y]];
    for (let n = 0; n < most; n++) {
      const [bx, by] = fieldAt(el, state, x, y);
      const b = Math.hypot(bx, by);
      if (!(b > 0)) break;
      const [mx, my] = fieldAt(el, state, x + (way * bx * step) / (2 * b), y + (way * by * step) / (2 * b));
      const m = Math.hypot(mx, my);
      if (!(m > 0)) break;
      x += (way * mx * step) / m;
      y += (way * my * step) / m;
      if (n > 3 && Math.hypot(x - sx, y - sy) < step * 0.9) {
        points.push([sx, sy]);
        return { points, closed: true };
      }
      points.push([x, y]);
      if (outside(x, y) || (inGapOnly && !inGap(el, x, y))) break;
    }
    return { points, closed: false };
  };
  const seeds: Point[] = [...(el.seeds ?? [])];
  if (el.yoke && el.uniform && el.uniform[0] !== 0) {
    // From the north pole face straight across the gap: the line ends where the field does, at the south pole face.
    const { faces, span } = el.yoke;
    const count = el.uniformLines ?? 7;
    for (let j = 0; j < count; j++) lines.push({ points: follow(el.uniform[0] > 0 ? faces[0] : faces[1], span[0] + ((j + 0.5) / count) * (span[1] - span[0]), 1, true).points, closed: false });
  } else if (!seeds.length && !poles.length && el.uniform && Math.hypot(...el.uniform) > 0) {
    // Straight across the picture, from the side the field comes from.
    const b = Math.hypot(...el.uniform);
    const [dx, dy] = [el.uniform[0] / b, el.uniform[1] / b];
    const reach = (Math.abs(wide * dx) + Math.abs(high * dy)) / 2;
    const across = Math.abs(wide * dy) + Math.abs(high * dx);
    const count = el.uniformLines ?? 7;
    for (let j = 0; j < count; j++) {
      const t = ((j + 0.5) / count - 0.5) * across;
      seeds.push([(x0 + x1) / 2 - dx * reach - dy * t, (y0 + y1) / 2 - dy * reach + dx * t]);
    }
  }
  for (const [sx, sy] of seeds) {
    const forward = follow(sx, sy, 1);
    if (forward.closed) lines.push(forward);
    else lines.push({ points: [...follow(sx, sy, -1).points.reverse().slice(0, -1), ...forward.points], closed: false });
  }
  return lines;
}

/**
 * The force on a wire from the field of everything else, as a vector: F = BIL, at right angles to
 * the field and to the current. In newtons when the wire has a length in the field, otherwise in
 * newtons for each metre of wire.
 */
export function wireForce(el: MagnetsEl, state: MagnetsState, id: string): Point {
  const w = (el.wires ?? []).find((o) => o.id === id);
  if (!w) return [0, 0];
  const [bx, by] = fieldAt(el, state, state.at[id][0], state.at[id][1], id);
  // The current is along the line out of the page, so the force is the field turned a quarter turn anticlockwise.
  const k = state.amps[id] * (w.metres ?? 1);
  return [-by * k, bx * k];
}

/** One side of the coil of a motor: where it is, the current in it (positive comes out of the page) and the force on it, in newtons. */
export interface CoilSide {
  at: Point;
  amps: number;
  force: Point;
}

/**
 * The two sides of the coil. The current goes along one side and comes back along the other, so
 * the two currents are opposite, and each side of N turns feels F = NBIL. With a split-ring
 * commutator the current in the coil is reversed each time the coil passes the place where it is
 * at right angles to the field, so the side that is further along the field always carries the
 * current the same way.
 */
export function coilSides(el: MagnetsEl, state: MagnetsState): CoilSide[] {
  const c = el.coil;
  if (!c || !state.spin) return [];
  const a = rad(state.spin.angle);
  const [cx, cy] = state.at[c.id];
  const [ax, ay] = fieldAt(el, state, cx, cy);
  const swapped = c.commutator === true && Math.cos(a) * ax + Math.sin(a) * ay < 0;
  return ([1, -1] as const).map((side) => {
    const at: Point = [cx + side * c.radius * Math.cos(a), cy + side * c.radius * Math.sin(a)];
    const amps = side * (swapped ? -1 : 1) * state.amps[c.id];
    const [bx, by] = fieldAt(el, state, at[0], at[1]);
    const k = amps * (c.turns ?? 1) * c.metres;
    return { at, amps, force: [-by * k, bx * k] as Point };
  });
}

/** The turning effect of the two forces about the axle of the coil, in newton metres (anticlockwise is positive). */
export function coilTorque(el: MagnetsEl, state: MagnetsState): number {
  if (!el.coil) return 0;
  const metres = el.length?.metres ?? 1;
  const [cx, cy] = state.at[el.coil.id];
  return coilSides(el, state).reduce((sum, side) => sum + ((side.at[0] - cx) * side.force[1] - (side.at[1] - cy) * side.force[0]) * metres, 0);
}

/**
 * The reading of the balance the magnet stands on, in grams. The field pushes each wire, and by
 * Newton's third law each wire pushes the magnet back with an equal force the other way: a wire
 * that is pushed up presses the magnet down, and the reading rises by that force ÷ g.
 */
export function balanceReading(el: MagnetsEl, state: MagnetsState): number | null {
  if (!el.balance || !(el.g !== undefined && el.g > 0)) return null;
  const up = (el.wires ?? []).reduce((sum, w) => sum + (w.metres !== undefined ? wireForce(el, state, w.id)[1] : 0), 0);
  return el.balance.grams + (1000 * up) / el.g;
}

/**
 * The force on a bar magnet from the other bars: each of its poles is pushed along the field of
 * theirs if it is a north pole, and against it if it is a south pole. It has no unit (bar magnets
 * are given no strength of their own), so only its direction and how it grows are drawn.
 */
export function barForce(el: MagnetsEl, state: MagnetsState, id: string): Point {
  const poles = polesOf(el, state);
  let [fx, fy] = [0, 0];
  for (const p of poles) {
    if (p.bar !== id) continue;
    for (const o of poles) {
      if (o.bar === id) continue;
      const [dx, dy] = [p.x - o.x, p.y - o.y];
      const r = Math.hypot(dx, dy);
      if (r < 1e-12) continue;
      fx += (p.q * o.q * dx) / r ** 3;
      fy += (p.q * o.q * dy) / r ** 3;
    }
  }
  return [fx, fy];
}

/** Where the turns that are drawn of the pickup coil cross its axis: evenly spaced along its length. */
export function pickupTurns(el: MagnetsEl): number[] {
  const k = el.pickup;
  if (!k) return [];
  const drawn = k.drawn ?? 7;
  return Array.from({ length: drawn }, (_, j) => k.at[0] - k.long / 2 + ((j + 0.5) / drawn) * k.long);
}

/**
 * The flux of the bar magnets through the pickup coil, added over its turns, counted along +x (in
 * T × length unit², for each turn that is drawn). A pole of strength p sends the flux
 * 2πp(1 − z ÷ √(z² + a²)) through a turn of radius a that is a distance z along the axis from it,
 * and inside the magnet all of the flux of a pole, 4πp, runs from the south pole to the north pole,
 * so the flux through a turn is greatest when the turn is round the middle of the magnet.
 */
export function pickupFlux(el: MagnetsEl, state: MagnetsState): number {
  const k = el.pickup;
  if (!k) return 0;
  const turns = pickupTurns(el);
  let flux = 0;
  for (const b of el.bars ?? []) {
    const [north, south] = polesOf({ ...el, bars: [b] }, state);
    const p = poleStrength(el, north.q);
    for (const x of turns) {
      for (const [pole, sign] of [[north, 1], [south, -1]] as const) {
        const z = x - pole.x;
        flux += sign * 2 * Math.PI * p * (1 - Math.abs(z) / Math.hypot(z, k.radius)) * Math.sign(z);
      }
      // Inside the magnet the flux runs from the south pole to the north pole.
      if ((x - north.x) * (x - south.x) < 0) flux += 4 * Math.PI * p * Math.sign(north.x - south.x);
    }
  }
  return flux;
}

/** The plays, with this many seconds more (or fewer) of the last clip. */
const shifted = (plays: MagnetPlays, by: number): MagnetPlays => plays.map(([name, seconds], i) => (i === plays.length - 1 ? [name, Math.max(0, seconds + by)] : [name, seconds]));

/**
 * What the pickup coil does at this moment. `emf` is the emf induced in it, minus the rate at which
 * the flux through it changes (Faraday's law): it is positive when the induced current makes a
 * field along +x inside the coil, so that the right-hand end of the coil is a north pole. `drag`
 * is the push of the coil on the magnet along x, which is always against the motion of the magnet
 * (Lenz's law): the work done against it is the electrical energy, so it is emf² ÷ speed. Bar
 * magnets are given no strength of their own, so both have no unit; only their signs and how
 * they compare from moment to moment are drawn.
 */
export function pickupAt(el: MagnetsEl, plays: MagnetPlays = []): { emf: number; drag: number } {
  if (!el.pickup || !plays.length || !el.bars?.length) return { emf: 0, drag: 0 };
  const dt = 1 / 240;
  const [before, after] = [magnetsAt(el, shifted(plays, -dt)), magnetsAt(el, shifted(plays, dt))];
  const gap = (after.time - before.time) * (el.rate ?? 1);
  if (!(gap > 0)) return { emf: 0, drag: 0 };
  const emf = -(pickupFlux(el, after) - pickupFlux(el, before)) / gap;
  const id = el.bars[0].id;
  const v = (after.at[id][0] - before.at[id][0]) / gap;
  return { emf, drag: Math.abs(v) > 1e-9 ? -(emf * emf) / v : 0 };
}

const pickupPeaks = new WeakMap<MagnetsEl, { emf: number; drag: number }>();
/** The largest emf and the largest push of the pickup coil in any clip (the clips played in the order they are written): what swings the needle right across. */
export function pickupPeak(el: MagnetsEl): { emf: number; drag: number } {
  const known = pickupPeaks.get(el);
  if (known) return known;
  const top = { emf: 0, drag: 0 };
  const done: MagnetPlays = [];
  for (const [name, clip] of Object.entries(el.clips)) {
    const total = clip.phases.reduce((n, ph) => n + ph.dur, 0);
    for (let t = 0; t <= total; t += 1 / 30) {
      const now = pickupAt(el, [...done, [name, t]]);
      top.emf = Math.max(top.emf, Math.abs(now.emf));
      top.drag = Math.max(top.drag, Math.abs(now.drag));
    }
    done.push([name, total]);
  }
  pickupPeaks.set(el, top);
  return top;
}

const peaks = new WeakMap<MagnetsEl, number>();
/** The largest force on any bar at the start and at the end of every phase of every clip: the force that is drawn at full length. */
export function peakBarForce(el: MagnetsEl): number {
  const known = peaks.get(el);
  if (known !== undefined) return known;
  const size = (state: MagnetsState) => Math.max(0, ...(el.bars ?? []).map((b) => Math.hypot(...barForce(el, state, b.id))));
  let top = size(magnetsAt(el));
  for (const [name, clip] of Object.entries(el.clips)) {
    let t = 0;
    for (const ph of clip.phases) {
      t += ph.dur;
      top = Math.max(top, size(magnetsAt(el, [[name, t]])));
    }
  }
  peaks.set(el, top);
  return top;
}
