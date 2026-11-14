/**
 * Particles that move, for the chemistry videos: a small molecular-dynamics simulation of each box
 * of a `particles` element. Every particle attracts its neighbours and repels them up close (the
 * Lennard-Jones force), gravity pulls them down gently, and a thermostat holds the box at its
 * temperature. Nothing about the states is scripted: cold particles settle into rows and vibrate,
 * warmer ones slide past one another, and hot ones fly apart and fill the box. Heating a box melts
 * and boils it for the same reason.
 *
 * The simulation is a pure function of time: the same script always gives the same frames. It runs
 * in fixed steps from the moment the element is shown, with its temperature and lid following the
 * clips the narration plays, and keeps its last state so the next frame only takes a few steps.
 *
 * Units are the particle's own: its diameter is 1 (it is drawn touching its neighbours at about
 * 1.1 apart), and a temperature of about 0.1 is a solid, 0.5 a liquid and 4 a gas.
 */
import type { ParticleBox, ParticlesEl, Temp } from './script.ts';

/** Temperatures for the three states, which a script may name instead of a number. */
export const TEMPS = { solid: 0.12, liquid: 0.47, gas: 4 } as const;
export type { Temp };
export const tempOf = (t: Temp | undefined, fallback: number) => (t === undefined ? fallback : typeof t === 'number' ? t : TEMPS[t]);

/** Simulated time for each second of video. */
const RATE = 2;
const DT = 0.004;
const GRAVITY = 0.6;
/** How strongly the thermostat pulls the particles towards the box's temperature. */
const GAMMA = 0.6;
const CUT = 2.5;
const CUT2 = CUT * CUT;
/** Seconds of video between the points of a followed particle's trail, and how long it is. */
const TRAIL_STEP = 1 / 15;
const TRAIL_SECONDS = 2.4;
/** A wall hit shows as a flash for this many seconds of video. */
export const FLASH = 0.28;

export const DEFAULT_N = { solid: 30, liquid: 30, gas: 30 } as const;

export function boxSize(b: ParticleBox): { w: number; h: number } {
  return { w: b.width ?? 10, h: b.height ?? 10 };
}

/** The same numbers every time, from a seed (mulberry32). */
function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** A normally distributed number (Box-Muller). */
function gauss(rnd: () => number) {
  const u = Math.max(rnd(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rnd());
}

/** Where the controls stand at a moment: each box's temperature and lid height. */
export interface Controls {
  temp: Record<string, number>;
  /** The lid's height as a fraction of the box's full height (1 = the top). */
  lid: Record<string, number>;
}

/** A play of a clip: its name and the element's age (seconds since shown) when it started. */
export type PlayAt = [clip: string, startAge: number];

/** The controls at `age`: each played clip walks its phases, moving the values towards its targets. */
export function controlsAt(el: ParticlesEl, played: PlayAt[], age: number): Controls {
  const temp: Record<string, number> = {};
  const lid: Record<string, number> = {};
  for (const b of el.boxes) {
    temp[b.id] = tempOf(b.temp, TEMPS[b.state]);
    lid[b.id] = b.lid ?? 1;
  }
  for (const [name, start] of played) {
    const clip = el.clips[name];
    if (!clip || age < start) continue;
    let t = start;
    for (const ph of clip.phases) {
      if (age <= t) break;
      const k = Math.min(1, (age - t) / ph.dur);
      for (const [id, v] of Object.entries(ph.heat ?? {})) temp[id] += (tempOf(v, temp[id]) - temp[id]) * k;
      for (const [id, v] of Object.entries(ph.lid ?? {})) lid[id] += (v - lid[id]) * k;
      t += ph.dur;
    }
  }
  return { temp, lid };
}

export interface Hit {
  /** Video seconds since the element was shown. */
  at: number;
  x: number;
  y: number;
  wall: 'left' | 'right' | 'floor' | 'lid';
}

interface BoxSim {
  n: number;
  x: Float64Array;
  y: Float64Array;
  vx: Float64Array;
  vy: Float64Array;
  fx: Float64Array;
  fy: Float64Array;
  /** Which kind each particle is (an index into the box's kinds). */
  kind: Uint8Array;
  rnd: () => number;
  /** The lid's actual height (it cannot be pushed into a liquid or solid). */
  lidY: number;
  hits: Hit[];
  trail: Array<[number, number]>;
}

export interface BoxFrame {
  x: number[];
  y: number[];
  kind: number[];
  /** The lid's height in particle units. */
  lidY: number;
  temp: number;
  hits: Hit[];
  /** Wall hits each second of video, over the last two seconds. */
  hitRate: number;
  trail: Array<[number, number]>;
}

/**
 * Gravity keeps a liquid at the bottom of its box. A real gas in a box this size is no denser at
 * the bottom than the top (air only thins over kilometres), so gravity fades as a box gets hotter
 * than a liquid, and a gas spreads evenly through its box.
 */
function gravityAt(temp: number) {
  return GRAVITY * Math.min(1, (0.6 / temp) ** 2);
}

function forces(s: BoxSim, temp: number) {
  const { n, x, y, fx, fy } = s;
  fx.fill(0);
  fy.fill(-gravityAt(temp));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = x[i] - x[j];
      const dy = y[i] - y[j];
      let r2 = dx * dx + dy * dy;
      if (r2 > CUT2) continue;
      if (r2 < 0.5) r2 = 0.5; // never let two particles overlap far enough to explode apart
      const i2 = 1 / r2;
      const i6 = i2 * i2 * i2;
      const f = 24 * i6 * (2 * i6 - 1) * i2;
      fx[i] += f * dx;
      fy[i] += f * dy;
      fx[j] -= f * dx;
      fy[j] -= f * dy;
    }
  }
}

/** Places the particles of a box as it starts: rows at the bottom, or spread through the box for a gas. */
function initBox(b: ParticleBox, seed: number): BoxSim {
  const { w, h } = boxSize(b);
  const kinds = b.kinds ?? [{ n: b.n ?? DEFAULT_N[b.state] }];
  const n = kinds.reduce((s, k) => s + k.n, 0);
  const rnd = random(seed);
  const s: BoxSim = {
    n,
    x: new Float64Array(n),
    y: new Float64Array(n),
    vx: new Float64Array(n),
    vy: new Float64Array(n),
    fx: new Float64Array(n),
    fy: new Float64Array(n),
    kind: new Uint8Array(n),
    rnd,
    lidY: (b.lid ?? 1) * h,
    hits: [],
    trail: [],
  };
  let k = 0;
  kinds.forEach((kd, ki) => {
    for (let i = 0; i < kd.n; i++) s.kind[k++] = ki;
  });
  const spacing = 1.12;
  if (b.state === 'gas') {
    // A loose grid through the whole box, jiggled, so no two start too close.
    const top = s.lidY - 0.5;
    const cols = Math.max(1, Math.round(Math.sqrt((n * (w - 1)) / (top - 0.5))));
    const rows = Math.ceil(n / cols);
    const gx = (w - 1) / cols;
    const gy = (top - 0.5) / rows;
    for (let i = 0; i < n; i++) {
      s.x[i] = 0.5 + gx * ((i % cols) + 0.5 + (rnd() - 0.5) * 0.4);
      s.y[i] = 0.5 + gy * (Math.floor(i / cols) + 0.5 + (rnd() - 0.5) * 0.4);
    }
  } else {
    // Rows packed tightly at the bottom, in the middle of the box.
    const cols = Math.min(Math.floor((w - 1) / spacing) + 1, Math.max(1, Math.round(Math.sqrt(n * 1.6))));
    const rowH = spacing * Math.sqrt(3) / 2;
    const width = (cols - 1) * spacing;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;
      s.x[i] = w / 2 - width / 2 + c * spacing + (r % 2 ? spacing / 2 : 0) - spacing / 4;
      s.y[i] = 0.56 + r * rowH;
    }
  }
  // Mix the kinds through the box unless they start apart (`apart`: the first kind on the left).
  if (!b.apart && kinds.length > 1) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = s.kind[i];
      s.kind[i] = s.kind[j];
      s.kind[j] = t;
    }
  } else if (b.apart && kinds.length > 1) {
    const order = Array.from({ length: n }, (_, i) => i).sort((a, c) => s.x[a] - s.x[c]);
    let at = 0;
    kinds.forEach((kd, ki) => {
      for (let i = 0; i < kd.n; i++) s.kind[order[at++]] = ki;
    });
  }
  const t0 = tempOf(b.temp, TEMPS[b.state]);
  for (let i = 0; i < n; i++) {
    s.vx[i] = gauss(rnd) * Math.sqrt(t0);
    s.vy[i] = gauss(rnd) * Math.sqrt(t0);
  }
  forces(s, tempOf(b.temp, TEMPS[b.state]));
  return s;
}

/** One step of the simulation (velocity Verlet, then the thermostat and the walls). */
function step(s: BoxSim, w: number, temp: number, lidTarget: number, firm: boolean, age: number, record: boolean) {
  const { n, x, y, vx, vy, fx, fy, rnd } = s;
  const half = DT / 2;
  for (let i = 0; i < n; i++) {
    vx[i] += fx[i] * half;
    vy[i] += fy[i] * half;
    x[i] += vx[i] * DT;
    y[i] += vy[i] * DT;
  }
  // The lid follows its target, but in a box of solid or liquid (`firm`) it cannot squash the
  // particles: it rests just above the highest particle that is touching others below it.
  let lid = lidTarget;
  if (firm && lidTarget < s.lidY) {
    let top = 0;
    for (let i = 0; i < n; i++) if (y[i] > top && crowded(s, i)) top = y[i];
    lid = Math.max(lidTarget, Math.min(s.lidY, top + 0.62));
  }
  const lidV = (lid - s.lidY) / DT;
  s.lidY = lid;
  for (let i = 0; i < n; i++) {
    if (x[i] < 0.5) {
      x[i] = 1 - x[i];
      vx[i] = Math.abs(vx[i]);
      if (record) s.hits.push({ at: age, x: 0, y: y[i], wall: 'left' });
    } else if (x[i] > w - 0.5) {
      x[i] = 2 * (w - 0.5) - x[i];
      vx[i] = -Math.abs(vx[i]);
      if (record) s.hits.push({ at: age, x: w, y: y[i], wall: 'right' });
    }
    if (y[i] < 0.5) {
      y[i] = 1 - y[i];
      vy[i] = Math.abs(vy[i]);
      if (record) s.hits.push({ at: age, x: x[i], y: 0, wall: 'floor' });
    } else if (y[i] > lid - 0.5) {
      y[i] = lid - 0.5 - Math.min(0.2, y[i] - (lid - 0.5));
      // A lid moving down pushes the particle it meets down with it.
      vy[i] = Math.min(-Math.abs(vy[i]), 2 * lidV - Math.abs(vy[i]));
      if (record) s.hits.push({ at: age, x: x[i], y: lid, wall: 'lid' });
    }
  }
  forces(s, temp);
  const c1 = Math.exp(-GAMMA * DT);
  const c2 = Math.sqrt((1 - c1 * c1) * temp);
  for (let i = 0; i < n; i++) {
    vx[i] += fx[i] * half;
    vy[i] += fy[i] * half;
    vx[i] = c1 * vx[i] + c2 * gauss(rnd);
    vy[i] = c1 * vy[i] + c2 * gauss(rnd);
  }
}

/** Whether particle i has at least two neighbours touching it (it is part of a solid or liquid). */
function crowded(s: BoxSim, i: number) {
  let c = 0;
  for (let j = 0; j < s.n; j++) {
    if (j === i) continue;
    const dx = s.x[i] - s.x[j];
    const dy = s.y[i] - s.y[j];
    if (dx * dx + dy * dy < 1.6 * 1.6 && ++c >= 2) return true;
  }
  return false;
}

/** Simulated time each box is run for before it is first seen, so it starts settled. */
const WARM = 30;

interface Cache {
  /** What the cached run was made from: the element, and the clips played (with their start ages). */
  key: string;
  played: PlayAt[];
  age: number;
  boxes: BoxSim[];
  /** The followed particle's trail points so far, per box: [age, x, y]. */
  trails: Array<Array<[number, number, number]>>;
}

const caches = new Map<string, Cache>();
const warmed = new Map<string, BoxSim[]>();

function cloneSim(s: BoxSim): BoxSim {
  return {
    ...s,
    x: s.x.slice(),
    y: s.y.slice(),
    vx: s.vx.slice(),
    vy: s.vy.slice(),
    fx: s.fx.slice(),
    fy: s.fy.slice(),
    kind: s.kind.slice(),
    // The random numbers carry on from the same point each time the warmed state is reused.
    rnd: forkRandom(s),
    hits: [],
    trail: [],
  };
}

const seeds = new WeakMap<BoxSim, number>();
function forkRandom(s: BoxSim) {
  return random(seeds.get(s) ?? 1);
}

function warmBoxes(el: ParticlesEl): BoxSim[] {
  const key = JSON.stringify([el.id, el.boxes, el.seed]);
  let boxes = warmed.get(key);
  if (!boxes) {
    boxes = el.boxes.map((b, bi) => {
      const s = initBox(b, (el.seed ?? 7) * 101 + bi * 7919);
      const { w } = boxSize(b);
      const t = tempOf(b.temp, TEMPS[b.state]);
      // Every box settles before it is seen: a solid's loose edge particles drop into place.
      const steps = Math.round(WARM / DT);
      for (let k = 0; k < steps; k++) step(s, w, t, s.lidY, false, 0, false);
      seeds.set(s, (el.seed ?? 7) * 31 + bi);
      return s;
    });
    warmed.set(key, boxes);
  }
  return boxes.map(cloneSim);
}

/**
 * The particles of every box at `age` seconds of video after the element was shown, with the
 * clips played so far (each with the age it started at).
 */
export function particlesAt(el: ParticlesEl, played: PlayAt[], age: number): BoxFrame[] {
  const key = JSON.stringify([el.id, el.boxes, el.clips, el.seed]);
  let c = caches.get(el.id);
  // A cached run can carry on if it is for the same element, is not ahead of the time asked for,
  // and knew of every clip that started before the moment it has reached.
  const usable =
    c !== undefined &&
    c.key === key &&
    c.age <= age + 1e-9 &&
    played.every(([clip, at]) => at >= c!.age || c!.played.some(([k, t]) => k === clip && Math.abs(t - at) < 1e-6));
  if (!usable) {
    c = { key, played: [], age: 0, boxes: warmBoxes(el), trails: el.boxes.map(() => []) };
    caches.set(el.id, c);
  }
  c = c!;
  c.played = played;
  const stepsPerSecond = RATE / DT;
  const steps = Math.floor((age - c.age) * stepsPerSecond + 1e-9);
  for (let k = 0; k < steps; k++) {
    const a = c.age + 1 / stepsPerSecond;
    const ctl = controlsAt(el, played, a);
    el.boxes.forEach((b, bi) => {
      const { w, h } = boxSize(b);
      const s = c!.boxes[bi];
      step(s, w, ctl.temp[b.id], ctl.lid[b.id] * h, b.state !== 'gas', a, true);
      while (s.hits.length && s.hits[0].at < a - 2.5) s.hits.shift();
      const tr = c!.trails[bi];
      if (b.follow !== undefined && (!tr.length || a - tr[tr.length - 1][0] >= TRAIL_STEP - 1e-9)) {
        tr.push([a, s.x[b.follow], s.y[b.follow]]);
        while (tr.length && tr[0][0] < a - TRAIL_SECONDS) tr.shift();
      }
    });
    c.age = a;
  }
  const ctl = controlsAt(el, played, age);
  return el.boxes.map((b, bi) => {
    const s = c!.boxes[bi];
    // Hits are counted over the last two seconds, so the count does not flicker.
    const recent = s.hits.filter((hh) => hh.at > age - 2);
    return {
      x: Array.from(s.x),
      y: Array.from(s.y),
      kind: Array.from(s.kind),
      lidY: s.lidY,
      temp: ctl.temp[b.id],
      hits: recent.filter((hh) => hh.at > age - FLASH),
      hitRate: Math.round(recent.length / 2),
      trail: c!.trails[bi].map(([, x, y]) => [x, y] as [number, number]),
    };
  });
}

/**
 * The gas pressure a gauge shows: the box's starting pressure scaled by its temperature and the
 * space under its lid (P ∝ T ÷ V), so the reading always agrees with the gas laws and the numbers
 * the narrator says.
 */
export function pressureOf(el: ParticlesEl, b: ParticleBox, temp: number, lidFraction: number): number {
  const p0 = el.gauge?.start ?? 100;
  const t0 = tempOf(b.temp, TEMPS[b.state]);
  const l0 = b.lid ?? 1;
  return p0 * (temp / t0) * (l0 / lidFraction);
}
