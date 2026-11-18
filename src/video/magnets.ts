/**
 * The physics of a magnets element (see MagnetsEl in script.ts): the magnetic field of bar magnets
 * and of long straight wires seen end-on, in one plane. A wire that carries a current I has the
 * field B = μ₀I ÷ 2πr at a distance r, at right angles to the line from the wire, and it circles
 * the wire anticlockwise when the current comes out of the page (the right-hand rule). A bar
 * magnet is two poles, one near each end: the field points away from the north pole and towards
 * the south pole, and falls with the square of the distance from each. Fields add as vectors, so
 * rows of wires make the field of a solenoid and two magnets make the field between their poles.
 * The force on a wire is F = BIL, at right angles to the field and to the current. A pure function
 * of the clips and the seconds played, like the rest of the stage.
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
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x);
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Everything in an element that has a place. */
const placed = (el: MagnetsEl) => [...(el.bars ?? []), ...(el.wires ?? []), ...(el.iron ?? []), ...(el.compasses ?? []), ...(el.probes ?? [])];

/**
 * The state of a magnets element after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for. Within a phase each thing eases from where it was to
 * where the phase puts it.
 */
export function magnetsAt(el: MagnetsEl, plays: Array<[clip: string, seconds: number]> = []): MagnetsState {
  const state: MagnetsState = {
    time: 0,
    at: Object.fromEntries(placed(el).map((o) => [o.id, [o.at[0], o.at[1]] as Point])),
    angle: Object.fromEntries((el.bars ?? []).map((b) => [b.id, b.angle ?? 0])),
    amps: Object.fromEntries((el.wires ?? []).map((w) => [w.id, w.amps])),
    order: Object.fromEntries((el.iron ?? []).map((b) => [b.id, b.order ?? 0])),
  };
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const f = smooth(clamp01(left / ph.dur));
      for (const [id, [x, y]] of Object.entries(ph.to ?? {})) if (id in state.at) state.at[id] = [state.at[id][0] + (x - state.at[id][0]) * f, state.at[id][1] + (y - state.at[id][1]) * f];
      for (const [id, a] of Object.entries(ph.turn ?? {})) if (id in state.angle) state.angle[id] += (a - state.angle[id]) * f;
      for (const [id, i] of Object.entries(ph.amps ?? {})) if (id in state.amps) state.amps[id] += (i - state.amps[id]) * f;
      for (const [id, o] of Object.entries(ph.order ?? {})) if (id in state.order) state.order[id] += (o - state.order[id]) * f;
      state.time += Math.min(left, ph.dur);
      left -= ph.dur;
    }
  }
  return state;
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

/** The field of the wires and the uniform field at a point, in teslas, leaving out one wire if asked. */
function currentField(el: MagnetsEl, state: MagnetsState, x: number, y: number, without?: string): Point {
  const metres = el.length?.metres ?? 1;
  let [bx, by] = el.uniform ?? [0, 0];
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
  /** Follow the field from a point, forwards or backwards, by the midpoint rule. */
  const follow = (sx: number, sy: number, way: 1 | -1): MagnetLine => {
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
      if (outside(x, y)) break;
    }
    return { points, closed: false };
  };
  const seeds: Point[] = [...(el.seeds ?? [])];
  if (!seeds.length && !poles.length && el.uniform && Math.hypot(...el.uniform) > 0) {
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
