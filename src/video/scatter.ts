/**
 * Alpha particles fired at a thin gold foil, as in Rutherford's experiment (the `scatter`
 * element). Each alpha particle is pushed away from every gold nucleus by a force that grows as
 * the inverse square of the distance, and its path is worked out step by step, so one that passes
 * far from every nucleus goes straight on, one that passes close is turned aside, and one aimed
 * almost straight at a nucleus is thrown back. The foil's nuclei sit in a few columns, and each
 * shot starts at its own height: shots listed in `close` are aimed at a nucleus with that small a
 * miss, and every other shot keeps well clear of the nuclei, so the picture always tells the
 * story the narration does. Nothing is random: the same element always draws the same paths.
 */
import type { ScatterEl } from './script.ts';

/** The picture, in the element's units: the source on the left, the foil in the middle. */
export const VIEW = { w: 16, h: 9 } as const;
/** Where the foil's middle column of nuclei is, and how far apart its columns and rows are. */
export const FOIL_X = 8;
const COL_GAP = 0.55;
const ROW_GAP = 1.15;
/** How fast an alpha particle moves (units each second) and how strongly a nucleus pushes it. */
const SPEED = 3.2;
const PUSH = 0.06;
/** Where the beam starts, and the step of the path worked out (seconds). */
const START_X = 1.3;
const DT = 1 / 240;
/** A shot farther than this from every nucleus's height is "clear" of it. */
const CLEAR = 0.32;

export interface ScatterShot {
  /** The path, one point each DT seconds, until it leaves the picture. */
  path: Array<[number, number]>;
  /** How far it was turned from straight on, in degrees, once it has left. */
  angle: number;
}

/** The gold nuclei, column by column, in rows across the foil. */
export function nucleiOf(el: ScatterEl): Array<[number, number]> {
  const cols = el.columns ?? 3;
  const out: Array<[number, number]> = [];
  for (let c = 0; c < cols; c++) {
    const x = FOIL_X + (c - (cols - 1) / 2) * COL_GAP;
    for (let y = 0.6; y < VIEW.h - 0.4; y += ROW_GAP) out.push([x, y]);
  }
  return out;
}

/** A small number in [0, 1) from a whole number, the same every time. */
function hash(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** The rows of nuclei, as heights, lowest first. */
const rowsOf = (el: ScatterEl) => [...new Set(nucleiOf(el).map(([, y]) => Math.round(y * 1000) / 1000))].sort((a, b) => a - b);
/** The beam: shots start between these heights, the height of the source. */
export const BEAM: [number, number] = [VIEW.h / 2 - 2.5, VIEW.h / 2 + 2.5];

/** The nucleus a close shot is aimed at: the first column, in a row near the middle of the beam. */
function targetOf(el: ScatterEl, shot: number): [number, number] {
  const rows = rowsOf(el).filter((y) => y > BEAM[0] + 0.3 && y < BEAM[1] - 0.3);
  const y = rows[Math.min(rows.length - 1, Math.max(0, Math.floor(rows.length / 2) + ((shot % 3) - 1)))];
  return [FOIL_X - (((el.columns ?? 3) - 1) / 2) * COL_GAP, y];
}

/**
 * Flies one shot from the source at height `y0`, pushed by every nucleus, until it leaves the
 * picture (or, with `stopX`, until it reaches that far across). Returns its path and its velocity.
 */
function fly(nuclei: Array<[number, number]>, y0: number, stopX = Infinity) {
  let x = START_X;
  let y = y0;
  let vx = SPEED;
  let vy = 0;
  const path: Array<[number, number]> = [[x, y]];
  const accel = (px: number, py: number): [number, number] => {
    let ax = 0;
    let ay = 0;
    for (const [nx, ny] of nuclei) {
      const dx = px - nx;
      const dy = py - ny;
      const r2 = Math.max(dx * dx + dy * dy, 1e-4);
      const f = PUSH / (r2 * Math.sqrt(r2));
      ax += f * dx;
      ay += f * dy;
    }
    return [ax, ay];
  };
  for (let k = 0; k < 20000 && x < stopX; k++) {
    // Finer steps near a nucleus, where the push changes fast; half-step velocities (leapfrog)
    // keep the energy steady through a close pass.
    const near = Math.min(...nuclei.map(([nx, ny]) => Math.hypot(x - nx, y - ny)));
    const sub = near < 0.1 ? 400 : near < 0.3 ? 40 : near < 1 ? 4 : 1;
    for (let s = 0; s < sub; s++) {
      const h = DT / sub;
      let [ax, ay] = accel(x, y);
      vx += (ax * h) / 2;
      vy += (ay * h) / 2;
      x += vx * h;
      y += vy * h;
      [ax, ay] = accel(x, y);
      vx += (ax * h) / 2;
      vy += (ay * h) / 2;
    }
    path.push([x, y]);
    if (x < -0.5 || x > VIEW.w + 0.5 || y < -0.5 || y > VIEW.h + 0.5) break;
  }
  return { path, x, y, vx, vy };
}

/**
 * Where each shot starts (its height), in firing order. A close shot is aimed so that, on its
 * way in, it would pass its nucleus by exactly `miss`: the other nuclei nudge it a little as it
 * comes, so its start is corrected for that, a few times over.
 */
export function startsOf(el: ScatterEl): number[] {
  const nuclei = nucleiOf(el);
  const rows = rowsOf(el);
  const close = new Map((el.close ?? []).map((c) => [c.shot, c.miss]));
  const out: number[] = [];
  for (let i = 0; i < el.shots; i++) {
    const miss = close.get(i);
    if (miss !== undefined) {
      const [nx, ny] = targetOf(el, i);
      let y0 = ny + miss;
      for (let k = 0; k < 6; k++) {
        const f = fly(nuclei, y0, nx - 0.6);
        const err = f.y + (f.vy / f.vx) * (nx - f.x) - (ny + miss);
        y0 -= err;
      }
      out.push(y0);
      continue;
    }
    // Otherwise somewhere in the beam that keeps clear of every row of nuclei.
    const pick = (k: number) => BEAM[0] + 0.1 + hash(k) * (BEAM[1] - BEAM[0] - 0.2);
    let y = pick(i + 1);
    for (let k = 0; k < 40 && rows.some((h) => Math.abs(h - y) < CLEAR); k++) y = pick(i + 101 + k * 17);
    out.push(y);
  }
  return out;
}

const cache = new Map<string, ScatterShot[]>();

/** Every shot's path, worked out once for each element. */
export function shotsOf(el: ScatterEl): ScatterShot[] {
  const key = JSON.stringify([el.shots, el.columns, el.close]);
  const hit = cache.get(key);
  if (hit) return hit;
  const nuclei = nucleiOf(el);
  const shots = startsOf(el).map((y0) => {
    const f = fly(nuclei, y0);
    return { path: f.path, angle: (Math.abs(Math.atan2(f.vy, f.vx)) * 180) / Math.PI };
  });
  cache.set(key, shots);
  return shots;
}

/** What became of a shot: straight on (under 10°), turned aside, or thrown back (over 90°). */
export const fateOf = (angle: number): 'through' | 'turned' | 'back' => (angle < 10 ? 'through' : angle <= 90 ? 'turned' : 'back');

/**
 * When each shot is fired, in seconds of the clips played: a phase's `fire` shots leave evenly
 * through it, after the shots of the phases before it.
 */
export function fireTimes(el: ScatterEl, plays: Array<[string, number]>): Array<number | undefined> {
  const out: Array<number | undefined> = Array(el.shots).fill(undefined);
  let next = 0;
  // `plays` gives, for each clip played so far, how far into it the video is.
  for (const [name, into] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let t = 0;
    for (const ph of clip.phases) {
      const n = ph.fire ?? 0;
      for (let i = 0; i < n && next < el.shots; i++) {
        const at = t + ((i + 0.5) / n) * ph.dur;
        if (at <= into + 1e-9) out[next] = into - at;
        next++;
      }
      t += ph.dur;
    }
  }
  return out;
}

export interface ScatterFrame {
  /** Each shot fired so far: how much of its path has been travelled, and where it is now. */
  shots: Array<{ i: number; upto: number; at: [number, number] | null; fate: 'through' | 'turned' | 'back' | null }>;
}

/**
 * The picture at a moment: for each shot fired, the part of its path travelled so far (`upto`
 * points), where it is (null once it has left), and, once it has left, what became of it.
 */
export function scatterAt(el: ScatterEl, plays: Array<[string, number]>): ScatterFrame {
  const shots = shotsOf(el);
  const ages = fireTimes(el, plays);
  const frame: ScatterFrame = { shots: [] };
  ages.forEach((age, i) => {
    if (age === undefined) return;
    const s = shots[i];
    const k = Math.min(s.path.length - 1, Math.floor(age / DT));
    const gone = k >= s.path.length - 1;
    frame.shots.push({ i, upto: k, at: gone ? null : s.path[k], fate: gone ? fateOf(s.angle) : null });
  });
  return frame;
}

export function checkScatter(e: ScatterEl): string[] {
  const problems: string[] = [];
  if (!(Number.isInteger(e.shots) && e.shots > 0 && e.shots <= 80)) problems.push('it needs between 1 and 80 shots.');
  if (e.columns !== undefined && !(Number.isInteger(e.columns) && e.columns >= 1 && e.columns <= 5)) problems.push('the foil needs 1 to 5 columns of atoms.');
  for (const c of e.close ?? []) {
    if (!(Number.isInteger(c.shot) && c.shot >= 0 && c.shot < e.shots)) problems.push(`a close shot (${c.shot}) is not one of the shots.`);
    if (!(Math.abs(c.miss) < CLEAR)) problems.push(`a close shot's miss must be under ${CLEAR}, or it is not close.`);
  }
  const fired = Object.values(e.clips).reduce((n, c) => n + c.phases.reduce((m, ph) => m + (ph.fire ?? 0), 0), 0);
  if (fired > e.shots) problems.push(`the clips fire ${fired} shots, but there are only ${e.shots}.`);
  return problems;
}
