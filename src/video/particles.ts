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
  /** When each lifted divider was lifted (the element's age); a divider not in it still stands. */
  lifted: Record<string, number>;
  /** When each box's held lump was let go. */
  released: Record<string, number>;
  /** How hard each box is being stirred. */
  stir: Record<string, number>;
  /** How strongly a magnet pulls on each box's magnetic kinds. */
  magnet: Record<string, number>;
  /** How fast the solvent is running up each paper box. */
  run: Record<string, number>;
  /** How many reserved units have been poured into each box so far (a fraction while one falls). */
  added: Record<string, number>;
  /** How strongly the current through each box's electrodes is flowing (0 off, 1 the usual). */
  power: Record<string, number>;
}

/** A play of a clip: its name and the element's age (seconds since shown) when it started. */
export type PlayAt = [clip: string, startAge: number];

/** The controls at `age`: each played clip walks its phases, moving the values towards its targets. */
export function controlsAt(el: ParticlesEl, played: PlayAt[], age: number): Controls {
  const temp: Record<string, number> = {};
  const lid: Record<string, number> = {};
  const lifted: Record<string, number> = {};
  const released: Record<string, number> = {};
  const stir: Record<string, number> = {};
  const magnet: Record<string, number> = {};
  const run: Record<string, number> = {};
  const added: Record<string, number> = {};
  const power: Record<string, number> = {};
  for (const b of el.boxes) {
    added[b.id] = 0;
    power[b.id] = 0;
    stir[b.id] = 0;
    magnet[b.id] = 0;
    run[b.id] = 0;
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
      for (const id of ph.lift ?? []) if (lifted[id] === undefined) lifted[id] = t;
      for (const id of ph.release ?? []) if (released[id] === undefined) released[id] = t;
      for (const [id, v] of Object.entries(ph.stir ?? {})) stir[id] += (v - stir[id]) * k;
      for (const [id, v] of Object.entries(ph.magnet ?? {})) magnet[id] += (v - magnet[id]) * k;
      for (const [id, v] of Object.entries(ph.run ?? {})) run[id] += (v - run[id]) * k;
      for (const [id, v] of Object.entries(ph.power ?? {})) power[id] += (v - power[id]) * k;
      for (const [id, v] of Object.entries(ph.heat ?? {})) temp[id] += (tempOf(v, temp[id]) - temp[id]) * k;
      for (const [id, v] of Object.entries(ph.lid ?? {})) lid[id] += (v - lid[id]) * k;
      for (const [id, v] of Object.entries(ph.add ?? {})) added[id] += v * k;
      t += ph.dur;
    }
  }
  return { temp, lid, lifted, released, stir, magnet, run, added, power };
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
  /** Each particle's kinetic energy, smoothed over a moment (for colouring it by heat). */
  ke: Float64Array;
  /** How strongly each pair of kinds attracts (kinds × kinds, 1 for the usual). */
  eps: Float64Array;
  kinds: number;
  /** How strongly gravity pulls each kind (1 for the usual). */
  heavy: Float64Array;
  /** Each kind's mass (1 for the usual): at one temperature, heavier particles move more slowly. */
  mass: Float64Array;
  /** Particles held still (a lump not yet dropped in). */
  held: Uint8Array;
  /** Particles made by a reaction that settles: held still for good, where they formed. */
  stuck: Uint8Array;
  /** Each kind's diameter, whether a magnet pulls it, and how fast the solvent carries it up paper. */
  size: Float64Array;
  magnetic: Uint8Array;
  rise: Float64Array;
  /** How strongly each kind's particles hold on to one another. */
  bond: Float64Array;
  /** The square of the distance each pair of kinds settles apart (kinds × kinds). */
  sig2: Float64Array;
  /** Particles that have left the box (evaporated through an open top). */
  gone: Uint8Array;
  /** Each kind's charge (pushed along by the current between electrodes). */
  charge: Float64Array;
  /** Which electrode each particle is stuck on: 0 none, 1 the left, 2 the right. */
  side: Uint8Array;
  /** Units (a molecule's particles, or one particle) still to be poured in, in order, and how many have been. */
  units: number[][];
  poured: number;
  /** How far up a paper box the solvent has soaked. */
  front: number;
  /** The reactions between kinds, and the pairs of particles bonded into molecules. */
  reactions: NonNullable<ParticleBox['reactions']>;
  breaks: NonNullable<ParticleBox['breaks']>;
  bonds: Bond[];
  /** The bonded pairs, as i × n + j with i < j, to find quickly. */
  bonded: Set<number>;
  /** Pairs close enough to react, found as the forces are worked out (i, j, i, j, ...). */
  contacts: number[];
  /** How much warmer (or colder) than its surroundings the box's reactions have made it. */
  warm: number;
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
  /** Each particle's smoothed kinetic energy, as a temperature (only for a box with `heatColor`). */
  ke?: number[];
  /** The divider's place across the box, and how far it has been lifted out (0 to 1). */
  divider?: { x: number; out: number };
  /** The left and right ends of the particles now, and when the element was shown. */
  span: [number, number];
  span0: [number, number];
  /** How many particles of the first kind have broken away (dissolved), for a box with kinds. */
  loose: number;
  /** How hard the box is being stirred now. */
  stir: number;
  /** How strongly a magnet over the box is pulling now. */
  magnet: number;
  /** The filter's height, and whether it lets the small particles through yet. */
  filter?: { y: number; open: boolean };
  /** How far up a paper box the solvent has soaked. */
  front: number;
  /** How many particles have left the box. */
  goneCount: number;
  /** The bonded pairs, as places in x and y. */
  bonds: Array<[number, number]>;
  /** How many particles of the tallied kinds there are. */
  tally: number;
  /** Each particle's speed now (only for a box with `spread`). */
  speed?: number[];
  /** The liquid's surface now and when the element was shown (only for a box with `level`). */
  level?: { now: number; start: number };
}

/**
 * Gravity keeps a liquid at the bottom of its box. A real gas in a box this size is no denser at
 * the bottom than the top (air only thins over kilometres), so gravity fades as a box gets hotter
 * than a liquid, and a gas spreads evenly through its box.
 */
function gravityAt(temp: number) {
  return GRAVITY * Math.min(1, (0.6 / temp) ** 2);
}

/** The forces on every particle: gravity, one another, and a stirrer if the box is being stirred. */
function forces(s: BoxSim, temp: number, sigma = 1, stir = 0, w = 10, h = 10, magnet = 0) {
  const { fx, fy, n, kind, heavy, mass } = s;
  fx.fill(0);
  const g = gravityAt(temp);
  // Gravity pulls in proportion to mass, so it gives every particle of a kind the same fall.
  for (let i = 0; i < n; i++) fy[i] = -g * heavy[kind[i]] * mass[kind[i]];
  forcesBetween(s, sigma);
  if (stir) {
    // A stirrer turns the liquid round the middle of the box.
    const cx = w / 2;
    const cy = h / 3;
    for (let i = 0; i < n; i++) {
      const dx = s.x[i] - cx;
      const dy = s.y[i] - cy;
      const r = Math.max(1, Math.hypot(dx, dy));
      fx[i] += (-stir * dy) / r;
      fy[i] += (stir * dx) / r;
    }
  }
  if (magnet) {
    // A magnet above the middle of the box pulls its magnetic particles up towards it.
    const cx = w / 2;
    const cy = h + 1.5;
    for (let i = 0; i < n; i++) {
      if (!s.magnetic[kind[i]]) continue;
      const dx = cx - s.x[i];
      const dy = cy - s.y[i];
      const r = Math.max(1, Math.hypot(dx, dy));
      fx[i] += (MAGNET * magnet * dx) / r;
      fy[i] += (MAGNET * magnet * dy) / r;
    }
  }
}

/**
 * Two atoms held together: by a bond drawn as a line, or (`show` false) by a hidden one that only
 * keeps a molecule's shape, such as the two hydrogens of a water molecule apart.
 */
interface Bond {
  i: number;
  j: number;
  len: number;
  show: boolean;
}

/** How stiffly a bond holds two atoms together, and how far apart (a fraction of their mean diameter). */
const BOND_K = 150;
const BOND_R = 0.85;
/** How fast a box warmed by its reactions cools back to its surroundings (a fraction each unit of time). */
const COOL = 0.03;
/** How close two particles must come to react (a multiple of their mean diameter). */
const REACT_R = 1.6;

/**
 * The reactions in a box this step: each pair of particles that came close enough, of kinds a
 * reaction joins, and hitting hard enough, becomes the reaction's products (each particle reacts at
 * most once a step).
 */
function react(s: BoxSim, divider?: number) {
  const { contacts, kind, x, y, vx, vy, n, held, gone } = s;
  if (!contacts.length) return;
  const used = new Set<number>();
  for (let c = 0; c < contacts.length; c += 2) {
    let i = contacts[c];
    let j = contacts[c + 1];
    if (used.has(i) || used.has(j) || held[i] || held[j] || gone[i] || gone[j]) continue;
    // Nothing reacts through a standing divider.
    if (divider !== undefined && (x[i] - divider) * (x[j] - divider) < 0) continue;
    for (const r of s.reactions) {
      if (kind[i] === r.b && kind[j] === r.a && r.a !== r.b) [i, j] = [j, i];
      if (kind[i] !== r.a || kind[j] !== r.b) continue;
      // How hard they hit: the kinetic energy of their approach along the line between them.
      const dx = x[i] - x[j];
      const dy = y[i] - y[j];
      const d = Math.hypot(dx, dy) || 1;
      // With `reach`, only a pair this close (a multiple of their mean diameter) reacts: touching.
      if (r.reach !== undefined && d * d > r.reach * r.reach * s.sig2[kind[i] * s.kinds + kind[j]]) continue;
      const closing = -((vx[i] - vx[j]) * dx + (vy[i] - vy[j]) * dy) / d;
      if (0.25 * Math.max(0, closing) ** 2 < (r.energy ?? 0)) continue;
      // Two atoms of one molecule never react with each other.
      if (s.bonded.has(Math.min(i, j) * n + Math.max(i, j))) continue;
      // With `chance`, only that fraction of such meetings react (each step they touch), so a
      // reaction can be slow without depending on a few very fast particles.
      if (r.chance !== undefined && s.rnd() >= r.chance) continue;
      const carried: number[] = [];
      if (r.free) {
        // Each lets go of its old partners, which become the reaction's `free` kinds; with
        // `carry`, the `a` atom's partners come along, joined to the `b` atom instead.
        s.bonds = s.bonds.filter((bd) => {
          const at: number = bd.i === i || bd.j === i ? 0 : bd.i === j || bd.j === j ? 1 : -1;
          if (at < 0 || r.free![at] === null) return true;
          const other = bd.i === i || bd.i === j ? bd.j : bd.i;
          if (bd.show) {
            kind[other] = r.free![at]!;
            used.add(other);
            if (at === 0 && r.carry) carried.push(other);
          }
          s.bonded.delete(Math.min(bd.i, bd.j) * n + Math.max(bd.i, bd.j));
          return false;
        });
      }
      kind[i] = r.to[0];
      kind[j] = r.to[1];
      if (r.settle)
        for (const k of [i, j]) {
          s.held[k] = 1;
          s.stuck[k] = 1;
          vx[k] = 0;
          vy[k] = 0;
        }
      if (r.join) addBond(s, i, j, true);
      for (const c of carried) {
        addBond(s, j, c, true);
        // A hidden bond bends the new molecule the way water is bent (or holds it straight).
        const len = s.bonds[s.bonds.length - 1].len;
        addBond(s, i, c, false, r.line ? 2 * len : 2 * len * Math.sin((52.5 * Math.PI) / 180));
      }
      if (r.heat) {
        // The box warms by `heat` (or cools, if it is below zero), and the energy given out sends
        // the pair off faster, in random directions.
        s.warm += r.heat;
        if (r.heat > 0)
          for (const k of [i, j]) {
            const a = s.rnd() * 2 * Math.PI;
            const v = Math.sqrt((r.heat * n) / s.mass[kind[k]]);
            vx[k] += v * Math.cos(a);
            vy[k] += v * Math.sin(a);
          }
      }
      used.add(i);
      used.add(j);
      break;
    }
  }
}

/**
 * Molecules falling apart by themselves: each step, a bond between two kinds that a box's `breaks`
 * names snaps with its chance (less at a low temperature, with `energy`), and the two atoms
 * become the kinds in `to`.
 */
function breakApart(s: BoxSim, temp: number) {
  const { kind, n } = s;
  s.bonds = s.bonds.filter((bd) => {
    if (!bd.show || s.gone[bd.i] || s.gone[bd.j]) return true;
    for (const r of s.breaks) {
      const [i, j] = kind[bd.i] === r.kinds[0] && kind[bd.j] === r.kinds[1] ? [bd.i, bd.j] : kind[bd.j] === r.kinds[0] && kind[bd.i] === r.kinds[1] ? [bd.j, bd.i] : [-1, -1];
      if (i < 0) continue;
      const p = r.chance * (r.energy ? Math.exp(-r.energy / Math.max(temp, 0.02)) : 1);
      if (s.rnd() >= p) return true;
      kind[i] = r.to[0];
      kind[j] = r.to[1];
      s.bonded.delete(Math.min(i, j) * n + Math.max(i, j));
      if (r.heat) s.warm += r.heat;
      return false;
    }
    return true;
  });
}

/** Bonds atoms i and j, at the usual length for their sizes (or `len`). */
function addBond(s: BoxSim, i: number, j: number, show: boolean, len?: number) {
  const [a, c] = i < j ? [i, j] : [j, i];
  const k = s.kind;
  s.bonds.push({ i: a, j: c, len: len ?? BOND_R * Math.sqrt(s.sig2[k[a] * s.kinds + k[c]]), show });
  s.bonded.add(a * s.n + c);
}

/** How hard a magnet at full strength pulls. */
const MAGNET = 5;
/** How fast the solvent soaks up paper at the usual `run` (particle diameters a simulated second). */
const RUN_SPEED = 0.5;

/** The temperature the particles of a box are at, from how fast they move (kinetic energy = T in 2D). */
function measuredTemp(s: BoxSim) {
  let e = 0;
  let m = 0;
  for (let i = 0; i < s.n; i++) {
    if (s.gone[i] || s.held[i]) continue;
    e += s.mass[s.kind[i]] * (s.vx[i] * s.vx[i] + s.vy[i] * s.vy[i]);
    m++;
  }
  return m ? e / (2 * m) : 0;
}

/**
 * The forces between particles. `sigma` is the distance they settle apart, as a multiple of the
 * usual: a box that shows expansion widens it as it is heated (see `expand`), while the particles
 * are drawn the same size, so the spaces between them grow.
 */
function forcesBetween(s: BoxSim, sigma: number) {
  const { n, x, y, fx, fy, kind, eps, kinds, sig2, bonded } = s;
  const sg2 = sigma * sigma;
  const reacting = s.reactions.length > 0;
  s.contacts.length = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = x[i] - x[j];
      const dy = y[i] - y[j];
      let r2 = dx * dx + dy * dy;
      // Two kinds of different sizes settle apart by the mean of their diameters.
      const s2 = sg2 * sig2[kind[i] * kinds + kind[j]];
      if (r2 > CUT2 * s2) continue;
      if (bonded.size && bonded.has(i * n + j)) continue;
      if (reacting && r2 < REACT_R * REACT_R * s2) s.contacts.push(i, j);
      if (r2 < 0.5 * s2) r2 = 0.5 * s2; // never let two particles overlap far enough to explode apart
      const i2 = 1 / r2;
      const q2 = s2 * i2;
      const i6 = q2 * q2 * q2;
      const f = 24 * i6 * (2 * i6 - 1) * i2 * eps[kind[i] * kinds + kind[j]];
      fx[i] += f * dx;
      fy[i] += f * dy;
      fx[j] -= f * dx;
      fy[j] -= f * dy;
    }
  }
  // Atoms bonded into a molecule are held together by stiff springs.
  for (const { i, j, len } of s.bonds) {
    const dx = x[i] - x[j];
    const dy = y[i] - y[j];
    const r = Math.hypot(dx, dy);
    const f = (-BOND_K * (r - len)) / Math.max(r, 1e-6);
    fx[i] += f * dx;
    fy[i] += f * dy;
    fx[j] -= f * dx;
    fy[j] -= f * dy;
  }
}

/**
 * Places a box's single particles and molecules mixed together: each takes a place on a loose
 * grid (through the box for a gas, packed at the bottom otherwise), a molecule's atoms round its
 * first, bonded to it.
 */
function placeMolecules(s: BoxSim, b: ParticleBox, kinds: NonNullable<ParticleBox['kinds']>, mols: NonNullable<ParticleBox['molecules']>, w: number) {
  const units: number[][] = [];
  // With `lump`, the first kind starts as a block on the floor in the middle (or, with `lump: 3`,
  // as three smaller blocks spread along the floor), the rest above it.
  const lumpN = b.lump ? kinds[0].n : 0;
  let at = 0;
  let floor = 0.5;
  if (lumpN) {
    const pieces = b.lump === true ? 1 : Math.max(1, b.lump || 1);
    const sp = 1.12 * (kinds[0].size ?? 1);
    const rowH = (sp * Math.sqrt(3)) / 2;
    const per = Math.floor(lumpN / pieces);
    let top = 0;
    for (let L = 0; L < pieces; L++) {
      const count = L === pieces - 1 ? lumpN - per * (pieces - 1) : per;
      const cx = (w * (L + 0.5)) / pieces;
      const cols = Math.min(Math.floor((w / pieces - 1) / sp) + 1, b.cols ?? Math.max(1, Math.round(Math.sqrt(count * 1.6))));
      for (let i = 0; i < count; i++) {
        const r = Math.floor(i / cols);
        s.kind[at] = 0;
        s.x[at] = cx - ((cols - 1) * sp) / 2 + (i % cols) * sp + (r % 2 ? sp / 2 : 0) - sp / 4;
        s.y[at++] = 0.56 * (sp / 1.12) + r * rowH;
      }
      top = Math.max(top, Math.ceil(count / cols));
    }
    floor = 0.56 * (sp / 1.12) + top * rowH + 0.6;
  }
  kinds.forEach((kd, ki) => {
    if (ki > 0 || !lumpN) for (let i = 0; i < kd.n; i++) units.push([ki]);
  });
  for (const m of mols) for (let i = 0; i < m.n; i++) units.push(m.atoms);
  const bent = new Set(mols.filter((m) => m.bent).map((m) => m.atoms));
  // Mixed in a random order.
  for (let i = units.length - 1; i > 0; i--) {
    const j = Math.floor(s.rnd() * (i + 1));
    [units[i], units[j]] = [units[j], units[i]];
  }
  const cell = 1.12 * Math.max(...kinds.map((k) => k.size ?? 1)) * (mols.some((m) => m.atoms.length > 1) ? 2.2 : 1);
  const m = units.length;
  const top = b.state === 'gas' ? s.lidY - 0.5 : Math.min(s.lidY - 0.5, floor + Math.ceil(m / Math.max(1, Math.floor((w - 1) / cell))) * cell);
  const cols = Math.max(1, Math.min(Math.floor((w - 1) / cell), Math.round(Math.sqrt((m * (w - 1)) / (top - floor)))));
  const rows = Math.ceil(m / cols);
  const gx = (w - 1) / cols;
  const gy = (top - floor) / rows;
  units.forEach((atoms, u) => {
    const cx = 0.5 + gx * ((u % cols) + 0.5 + (s.rnd() - 0.5) * 0.2);
    const cy = floor + gy * (Math.floor(u / cols) + 0.5 + (s.rnd() - 0.5) * 0.2);
    const first = at;
    s.kind[at] = atoms[0];
    s.x[at] = cx;
    s.y[at++] = cy;
    const spin = s.rnd() * 2 * Math.PI;
    const k = atoms.length - 1;
    // A bent molecule's two outer atoms 105 degrees apart, like water's; otherwise evenly round.
    const step = bent.has(atoms) ? (105 * Math.PI) / 180 : (2 * Math.PI) / k;
    for (let a = 1; a <= k; a++) {
      s.kind[at] = atoms[a];
      const len = BOND_R * Math.sqrt(s.sig2[atoms[0] * s.kinds + atoms[a]]);
      s.x[at] = cx + len * Math.cos(spin + (a - 1) * step);
      s.y[at] = cy + len * Math.sin(spin + (a - 1) * step);
      addBond(s, first, at, true);
      at++;
    }
    // Hidden bonds between neighbouring outer atoms keep the molecule's shape.
    for (let a = 1; a < k; a++) {
      const i = first + a;
      const j = first + a + 1;
      addBond(s, i, j, false, Math.hypot(s.x[i] - s.x[j], s.y[i] - s.y[j]));
    }
    if (k > 2) addBond(s, first + k, first + 1, false, Math.hypot(s.x[first + k] - s.x[first + 1], s.y[first + k] - s.y[first + 1]));
  });
}

/** Places the particles of a box as it starts: rows at the bottom, or spread through the box for a gas. */
function initBox(b: ParticleBox, seed: number): BoxSim {
  const { w, h } = boxSize(b);
  const kinds = b.kinds ?? [{ n: b.n ?? DEFAULT_N[b.state] }];
  const mols = b.molecules ?? [];
  const n = kinds.reduce((s, k) => s + k.n, 0) + mols.reduce((s, m) => s + m.n * m.atoms.length, 0);
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
    ke: new Float64Array(n),
    eps: new Float64Array(kinds.length * kinds.length),
    kinds: kinds.length,
    heavy: new Float64Array(kinds.map((k) => k.heavy ?? 1)),
    mass: new Float64Array(kinds.map((k) => k.mass ?? 1)),
    held: new Uint8Array(n),
    stuck: new Uint8Array(n),
    size: new Float64Array(kinds.map((k) => k.size ?? 1)),
    magnetic: new Uint8Array(kinds.map((k) => (k.magnetic ? 1 : 0))),
    rise: new Float64Array(kinds.map((k) => k.rise ?? 0)),
    bond: new Float64Array(kinds.map((k) => k.bond ?? 1)),
    sig2: new Float64Array(kinds.length * kinds.length),
    gone: new Uint8Array(n),
    charge: new Float64Array(kinds.map((k) => k.charge ?? 0)),
    side: new Uint8Array(n),
    units: [],
    poured: 0,
    front: PAPER_START - 0.6,
    reactions: b.reactions ?? [],
    breaks: b.breaks ?? [],
    bonds: [],
    bonded: new Set(),
    contacts: [],
    warm: 0,
    rnd,
    lidY: (b.lid ?? 1) * h,
    hits: [],
    trail: [],
  };
  let k = 0;
  kinds.forEach((kd, ki) => {
    for (let i = 0; i < kd.n; i++) s.kind[k++] = ki;
  });
  kinds.forEach((ka, a) =>
    kinds.forEach((kb, c) => {
      s.eps[a * kinds.length + c] = a === c ? (ka.bond ?? 1) : (b.cross ?? Math.sqrt((ka.bond ?? 1) * (kb.bond ?? 1)));
      s.sig2[a * kinds.length + c] = (((ka.size ?? 1) + (kb.size ?? 1)) / 2) ** 2;
    }),
  );
  for (const { kinds: [a, c], bond } of b.pairs ?? []) {
    s.eps[a * kinds.length + c] = bond;
    s.eps[c * kinds.length + a] = bond;
  }
  // Molecules, and a gas that reacts with a lump, are placed unit by unit.
  const units = mols.length > 0 || (b.state === 'gas' && !!b.lump && !!b.reactions?.length);
  if (units) placeMolecules(s, b, kinds, mols, w);
  const spacing = 1.12 * Math.max(...kinds.map((k) => k.size ?? 1));
  // Two kinds kept apart by a divider start on its two sides; behind a wall, all start on its
  // left; on paper, as a small dot in the middle; otherwise the whole box is one region.
  // (Kinds after the first two may start with none: the products of a reaction.)
  const split = b.divider !== undefined && b.apart === true && kinds.length >= 2 && kinds.slice(2).every((k) => k.n === 0);
  const dot = Math.ceil(Math.sqrt(n)) * spacing + 1;
  // With `ends`, the first kind is packed at the left end and the last that has particles at the right.
  const right = [...kinds].reverse().find((k) => k.n > 0)?.n ?? 0;
  const ends = b.ends !== undefined && b.apart === true && kinds.length >= 3 ? b.ends * w : 0;
  const regions: Array<[x0: number, x1: number, from: number, to: number]> = split
    ? [[0, b.divider! * w, 0, kinds[0].n], [b.divider! * w, w, kinds[0].n, n]]
    : ends
      ? [[0, ends, 0, kinds[0].n], [ends, w - ends, kinds[0].n, n - right], [w - ends, w, n - right, n]]
      : b.wall
      ? [[0, b.wall.at * w - 0.2, 0, n]]
      : b.paper
        ? [[w / 2 - dot / 2, w / 2 + dot / 2, 0, n]]
        : [[0, w, 0, n]];
  // Where the bottom row starts: on the filter, on paper's start line, or on the floor.
  const base = b.filter ? b.filter.at * h : b.paper ? PAPER_START - 0.56 : 0;
  for (const [x0, x1, from, to] of units ? [] : regions) {
    const m = to - from;
    const rw = x1 - x0;
    if (b.state === 'gas') {
      // A loose grid through the whole region, jiggled, so no two start too close.
      const top = s.lidY - 0.5;
      const cols = Math.max(1, Math.round(Math.sqrt((m * (rw - 1)) / (top - 0.5))));
      const rows = Math.ceil(m / cols);
      const gx = (rw - 1) / cols;
      const gy = (top - 0.5) / rows;
      for (let j = 0; j < m; j++) {
        s.x[from + j] = x0 + 0.5 + gx * ((j % cols) + 0.5 + (rnd() - 0.5) * 0.4);
        s.y[from + j] = 0.5 + gy * (Math.floor(j / cols) + 0.5 + (rnd() - 0.5) * 0.4);
      }
    } else {
      // Rows packed tightly at the bottom, in the middle of the region.
      const cols = Math.min(Math.floor((rw - 1) / spacing) + 1, b.cols ?? Math.max(1, Math.round(Math.sqrt(m * (b.paper ? 1 : 1.6)))));
      const rowH = spacing * Math.sqrt(3) / 2;
      const width = (cols - 1) * spacing;
      for (let j = 0; j < m; j++) {
        const r = Math.floor(j / cols);
        const c = j % cols;
        s.x[from + j] = x0 + rw / 2 - width / 2 + c * spacing + (r % 2 ? spacing / 2 : 0) - spacing / 4;
        s.y[from + j] = base + 0.56 * (spacing / 1.12) + r * rowH;
      }
    }
  }
  // A lump: the first kind starts as a block on the floor in the middle, the rest round it.
  if (b.lump && kinds.length > 1 && !units) {
    // `lump: 3` makes three smaller lumps spread along the floor, with the same particles between them.
    const m = b.lump === true ? 1 : b.lump;
    s.kind.fill(1);
    const per = Math.floor(kinds[0].n / m);
    const taken = new Set<number>();
    // With `above`, the lump is taken from the top of the stack and lifted clear of it.
    const cy = b.above === undefined ? 0 : Math.max(...Array.from(s.y.subarray(0, n)));
    for (let L = 0; L < m; L++) {
      const cx = (w * (L + 0.5)) / m;
      const want = L === m - 1 ? kinds[0].n - per * (m - 1) : per;
      const order = Array.from({ length: n }, (_, i) => i).filter((i) => !taken.has(i)).sort((a, c) => Math.hypot((s.x[a] - cx) * 0.8, s.y[a] - cy) - Math.hypot((s.x[c] - cx) * 0.8, s.y[c] - cy));
      for (let i = 0; i < want; i++) {
        s.kind[order[i]] = 0;
        taken.add(order[i]);
      }
    }
    if (b.above !== undefined) {
      // The rest settle a little lower without the lump's particles, so it is lifted by the gap
      // between its lowest particle and the highest of the rest, plus `above`.
      const lump = [...taken];
      const rest = Array.from({ length: n }, (_, i) => i).filter((i) => !taken.has(i));
      const lift = Math.max(0, Math.max(...rest.map((i) => s.y[i])) + spacing - Math.min(...lump.map((i) => s.y[i]))) + b.above;
      for (const i of lump) s.y[i] = Math.min(s.lidY - 0.5, s.y[i] + lift);
    }
    // With more than one other kind starting in the box (ions in a solution), they are mixed
    // through the rest of it. With one, it simply fills the rest, using up no random numbers.
    const others = kinds.flatMap((kd, ki) => (ki > 0 ? Array<number>(kd.n).fill(ki) : []));
    if (new Set(others).size > 1) {
      const rest = Array.from({ length: n }, (_, i) => i).filter((i) => !taken.has(i));
      for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
      }
      rest.forEach((i, k) => (s.kind[i] = others[k] ?? 1));
    }
    // An ionic lattice: each lump particle in turn takes the kind its placed neighbours have
    // fewer of, so the two kinds alternate through the lump, half and half.
    if (b.lumpMix !== undefined) {
      const mix = b.lumpMix;
      const lumped = Array.from({ length: n }, (_, i) => i).filter((i) => s.kind[i] === 0).sort((a, c) => s.y[a] - s.y[c] || s.x[a] - s.x[c]);
      const placed: number[] = [];
      let made = 0;
      for (const i of lumped) {
        let same = 0;
        let other = 0;
        for (const j of placed) if (Math.hypot(s.x[i] - s.x[j], s.y[i] - s.y[j]) < 1.3) s.kind[j] === 0 ? same++ : other++;
        const half = made * 2 < placed.length;
        if (same > other || (same === other && half)) {
          s.kind[i] = mix;
          made++;
        }
        placed.push(i);
      }
    }
  } else if (!b.apart && kinds.length > 1 && !units) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = s.kind[i];
      s.kind[i] = s.kind[j];
      s.kind[j] = t;
    }
  } else if (b.apart && kinds.length > 1 && !split && !ends) {
    const order = Array.from({ length: n }, (_, i) => i).sort((a, c) => s.x[a] - s.x[c]);
    let at = 0;
    kinds.forEach((kd, ki) => {
      for (let i = 0; i < kd.n; i++) s.kind[order[at++]] = ki;
    });
  }
  // In a liquid or solid, kinds kept back to pour in later take the top places, so what is in
  // the box from the start is packed at the bottom, with no gaps where they were.
  if (b.reserve?.length && b.state !== 'gas' && !units && !b.lump) {
    const r = b.reserve;
    const order = Array.from({ length: n }, (_, i) => i).sort((a, c) => s.y[a] - s.y[c] || s.x[a] - s.x[c]);
    const ks = order.map((i) => s.kind[i]);
    const sorted = [...ks.filter((k) => !r.includes(k)), ...ks.filter((k) => r.includes(k))];
    order.forEach((i, j) => (s.kind[i] = sorted[j]));
  }
  // Held particles (the first kind, or the kinds listed) keep still until a clip lets them go.
  if (b.hold) {
    const kept = b.hold === true ? [0] : b.hold;
    for (let i = 0; i < n; i++) s.held[i] = kept.includes(s.kind[i]) ? 1 : 0;
  }
  // No particle starts inside a divider: each is moved out to the side it is nearer.
  if (b.divider !== undefined) {
    const d = b.divider * w;
    for (let i = 0; i < n; i++) if (Math.abs(s.x[i] - d) < 0.55) s.x[i] = s.x[i] < d ? d - 0.55 : d + 0.55;
  }
  // Reserved kinds wait outside the box, unit by unit, the units of each kind taking turns.
  if (b.reserve?.length) {
    const seen = new Uint8Array(n);
    const byKind = new Map<number, number[][]>();
    for (let i = 0; i < n; i++) {
      if (seen[i] || !b.reserve.includes(s.kind[i])) continue;
      const unit = [i];
      seen[i] = 1;
      for (let u = 0; u < unit.length; u++)
        for (const bd of s.bonds) {
          const o = bd.i === unit[u] ? bd.j : bd.j === unit[u] ? bd.i : -1;
          if (o >= 0 && !seen[o]) {
            seen[o] = 1;
            unit.push(o);
          }
        }
      for (const k of unit) s.gone[k] = 1;
      // Out of reach until poured, so they push on nothing in the box. (A gas box keeps them where
      // they were placed, as its videos were made with them there.)
      if (b.state !== 'gas') for (const k of unit) s.y[k] = 1000 + 3 * k;
      const list = byKind.get(s.kind[i]) ?? [];
      list.push(unit);
      byKind.set(s.kind[i], list);
    }
    const lists = [...byKind.values()];
    for (let r = 0; lists.some((l) => r < l.length); r++) for (const l of lists) if (r < l.length) s.units.push(l[r]);
  }
  // An electrode coated with a metal: that many of its kind's particles stand in a column against
  // the wall from the floor up, stuck on it (the rest of the box keeps clear of them).
  for (const [sd, e] of [[1, b.electrodes?.left], [2, b.electrodes?.right]] as const) {
    if (!e?.plate) continue;
    const mine = Array.from({ length: n }, (_, i) => i).filter((i) => s.kind[i] === e.plate!.kind && !s.side[i]).slice(0, e.plate.n);
    const d = 1.05 * (s.size[e.plate.kind] ?? 1);
    const rows = Math.max(1, Math.floor((s.lidY - 0.6) / d));
    mine.forEach((i, j) => {
      const col = Math.floor(j / rows);
      s.x[i] = sd === 1 ? 0.55 + col * d : w - 0.55 - col * d;
      s.y[i] = 0.55 + (j % rows) * d;
      s.held[i] = 1;
      s.stuck[i] = 1;
      s.side[i] = sd;
    });
    // Others that started where the coating now is are moved out of its way.
    const edge = Math.ceil(mine.length / rows) * d + 0.6;
    for (let i = 0; i < n; i++) {
      if (s.side[i]) continue;
      if (sd === 1 && s.x[i] < edge) s.x[i] = edge + (s.x[i] % 0.5);
      if (sd === 2 && s.x[i] > w - edge) s.x[i] = w - edge - (s.x[i] % 0.5);
    }
  }
  const t0 = tempOf(b.temp, TEMPS[b.state]);
  for (let i = 0; i < n; i++) {
    const m = s.mass[s.kind[i]];
    s.vx[i] = gauss(rnd) * Math.sqrt(t0 / m);
    s.vy[i] = gauss(rnd) * Math.sqrt(t0 / m);
    s.ke[i] = t0;
  }
  forces(s, tempOf(b.temp, TEMPS[b.state]));
  return s;
}

/** How a box is stepped, besides its temperature and lid. */
interface StepOpts {
  w: number;
  firm: boolean;
  /** Where a standing divider is across the box (in particle units). */
  divider?: number;
  bath?: ParticleBox['bath'];
  /** How far apart the particles settle, as a multiple of the usual (for `expand`). */
  sigma?: number;
  /** How hard the box is stirred. */
  stir?: number;
  /** How strongly a magnet pulls. */
  magnet?: number;
  /** A filter's height, the size of its holes, and whether it lets small particles through yet. */
  filter?: { y: number; holes: number; open: boolean };
  /** A low wall that never lifts: where it stands and how tall it is. */
  wall?: { x: number; top: number };
  /** Parts of the box held at their own temperatures (in particle units). */
  zones?: Array<{ x0: number; x1: number; y0: number; y1: number; temp: number }>;
  /** Particles reaching the top leave the box (only those of the kinds listed, if a list). */
  escape?: boolean | number[];
  /** How fast the solvent runs up paper. */
  run?: number;
  /** Let the box's reactions happen (not while it settles before it is seen). */
  react?: boolean;
  /** How strongly a current flows between the electrodes (0 none), and what happens at them. */
  power?: number;
  electrodes?: ParticleBox['electrodes'];
  /** Hold no particle at any temperature: energy only passes between them as they collide. */
  insulated?: boolean;
  /** Temperatures for kinds held at their own, by kind (as an insulated box settles). */
  kindTemps?: Array<number | undefined>;
}

/** The strip along a side where a box with a `bath` is held at its temperature. */
const BATH = 2;
const BATH_GAMMA = 4;
/** How high a paper box's dot starts (its start line is just below). */
export const PAPER_START = 1.8;
/** Half the thickness of a wall. */
const WALL = 0.15;

/** One step of the simulation (velocity Verlet, then the thermostat and the walls). */
function step(s: BoxSim, o: StepOpts, temp: number, lidTarget: number, age: number, record: boolean) {
  const { n, x, y, vx, vy, fx, fy, rnd, kind, size, gone } = s;
  const { w, firm, divider, wall, filter } = o;
  const half = DT / 2;
  const held = s.held;
  // The solvent soaks up paper, and carries each kind below its front up at the kind's own pace.
  // Once the solvent reaches the top of the paper, nothing moves on.
  const run = o.run ?? 0;
  const was = s.front;
  if (run) s.front = Math.min(s.lidY - 0.5, s.front + run * RUN_SPEED * DT);
  const soak = s.front - was;
  for (let i = 0; i < n; i++) {
    if (held[i] || gone[i]) {
      vx[i] = 0;
      vy[i] = 0;
      continue;
    }
    const rad = 0.5 * size[kind[i]];
    const im = 1 / s.mass[kind[i]];
    vx[i] += fx[i] * half * im;
    vy[i] += fy[i] * half * im;
    const was = x[i];
    const wasY = y[i];
    x[i] += vx[i] * DT;
    y[i] += vy[i] * DT;
    if (soak > 0 && s.rise[kind[i]] && y[i] < s.front) y[i] += soak * s.rise[kind[i]];
    // A standing divider keeps each particle on its own side.
    if (divider !== undefined) {
      if (was < divider && x[i] > divider - rad) {
        x[i] = 2 * (divider - rad) - x[i];
        vx[i] = -Math.abs(vx[i]);
      } else if (was >= divider && x[i] < divider + rad) {
        x[i] = 2 * (divider + rad) - x[i];
        vx[i] = Math.abs(vx[i]);
      }
    }
    // A low wall: a particle coming down onto it bounces off its top; below its top, it is a divider.
    if (wall) {
      if (wasY >= wall.top + rad && y[i] < wall.top + rad && Math.abs(x[i] - wall.x) < rad + WALL) {
        y[i] = 2 * (wall.top + rad) - y[i];
        vy[i] = Math.abs(vy[i]);
      } else if (y[i] < wall.top + rad) {
        if (was < wall.x && x[i] > wall.x - rad - WALL) {
          x[i] = 2 * (wall.x - rad - WALL) - x[i];
          vx[i] = -Math.abs(vx[i]);
        } else if (was >= wall.x && x[i] < wall.x + rad + WALL) {
          x[i] = 2 * (wall.x + rad + WALL) - x[i];
          vx[i] = Math.abs(vx[i]);
        }
      }
    }
    // A filter holds back particles too big for its holes (and every particle until it is opened).
    if (filter && (!filter.open || 2 * rad > filter.holes)) {
      if (wasY >= filter.y && y[i] < filter.y + rad) {
        y[i] = 2 * (filter.y + rad) - y[i];
        vy[i] = Math.abs(vy[i]);
      } else if (wasY < filter.y && y[i] > filter.y - rad) {
        y[i] = 2 * (filter.y - rad) - y[i];
        vy[i] = -Math.abs(vy[i]);
      }
    }
  }
  // The lid follows its target, but in a box of solid or liquid (`firm`) it cannot squash the
  // particles: it rests just above the highest particle that is touching others below it.
  let lid = lidTarget;
  if (firm && lidTarget < s.lidY) {
    let top = 0;
    for (let i = 0; i < n; i++) if (!gone[i] && y[i] > top && crowded(s, i)) top = y[i];
    lid = Math.max(lidTarget, Math.min(s.lidY, top + 0.62));
  }
  const lidV = (lid - s.lidY) / DT;
  s.lidY = lid;
  for (let i = 0; i < n; i++) {
    if (gone[i]) continue;
    const rad = 0.5 * size[kind[i]];
    if (x[i] < rad) {
      x[i] = 2 * rad - x[i];
      vx[i] = Math.abs(vx[i]);
      if (record) s.hits.push({ at: age, x: 0, y: y[i], wall: 'left' });
    } else if (x[i] > w - rad) {
      x[i] = 2 * (w - rad) - x[i];
      vx[i] = -Math.abs(vx[i]);
      if (record) s.hits.push({ at: age, x: w, y: y[i], wall: 'right' });
    }
    if (y[i] < rad) {
      y[i] = 2 * rad - y[i];
      vy[i] = Math.abs(vy[i]);
      if (record) s.hits.push({ at: age, x: x[i], y: 0, wall: 'floor' });
    } else if (o.escape && (o.escape === true || o.escape.includes(kind[i])) && y[i] > lid - rad && s.bond[kind[i]] < 2) {
      // Out of the open top and away: it is put far off, where it touches nothing. (A kind
      // bonded as strongly as a salt does not boil at these temperatures: one flung this high
      // falls back.)
      gone[i] = 1;
      x[i] = -1e4 - 10 * i;
      y[i] = -1e4;
      vx[i] = 0;
      vy[i] = 0;
    } else if (y[i] > lid - rad) {
      y[i] = lid - rad - Math.min(0.2, y[i] - (lid - rad));
      // A lid moving down pushes the particle it meets down with it.
      vy[i] = Math.min(-Math.abs(vy[i]), 2 * lidV - Math.abs(vy[i]));
      if (record) s.hits.push({ at: age, x: x[i], y: lid, wall: 'lid' });
    }
  }
  const zones = o.zones;
  // With a bath or zones, gravity follows how hot the particles really are, not the box's
  // temperature. In an open dish or a still it keeps its full strength: there the hot gas leaves
  // or goes over the wall anyway, and the dissolved solid must stay at the bottom.
  const gravityTemp = o.escape || o.wall ? 0 : o.bath || zones ? measuredTemp(s) : temp;
  forces(s, gravityTemp, o.sigma, o.stir ?? 0, w, lid, o.magnet ?? 0);
  // With the current on, positive ions are pushed towards the left electrode (the cathode) and
  // negative ones towards the right (the anode).
  if (o.power) for (let i = 0; i < n; i++) if (s.charge[kind[i]]) fx[i] -= s.charge[kind[i]] * FIELD * o.power;
  if (o.react) react(s, o.divider);
  if (o.power && o.electrodes) atElectrodes(s, o.electrodes, o.power, w);
  if (o.react && s.breaks.length) breakApart(s, temp);
  // A bath holds its strip firmly, as a flame or ice would, so heat goes in or out quickly there.
  const c1 = Math.exp(-(o.bath || zones || o.kindTemps ? BATH_GAMMA : GAMMA) * DT);
  const c2 = Math.sqrt((1 - c1 * c1) * temp);
  const inBath = (i: number) => (o.bath === 'left' ? x[i] < BATH : o.bath === 'right' ? x[i] > w - BATH : y[i] < BATH);
  const smooth = DT / 1.2;
  for (let i = 0; i < n; i++) {
    if (held[i] || gone[i]) continue;
    // A heavier particle is pushed less by the same force, and the thermostat gives it the same
    // energy (so less speed) as a light one.
    const m = s.mass[kind[i]];
    const im = 1 / m;
    const sm = Math.sqrt(im);
    vx[i] += fx[i] * half * im;
    vy[i] += fy[i] * half * im;
    if (o.insulated) {
      // Nothing outside the box adds or takes energy.
    } else if (zones) {
      const z = zones.find((zz) => x[i] >= zz.x0 && x[i] < zz.x1 && y[i] >= zz.y0 && y[i] < zz.y1);
      if (z) {
        const c = Math.sqrt((1 - c1 * c1) * z.temp) * sm;
        vx[i] = c1 * vx[i] + c * gauss(rnd);
        vy[i] = c1 * vy[i] + c * gauss(rnd);
      }
    } else if (!o.bath || inBath(i)) {
      const own = o.kindTemps?.[kind[i]];
      const c = own === undefined ? c2 : Math.sqrt((1 - c1 * c1) * own);
      vx[i] = c1 * vx[i] + c * sm * gauss(rnd);
      vy[i] = c1 * vy[i] + c * sm * gauss(rnd);
    }
    s.ke[i] += ((m * (vx[i] * vx[i] + vy[i] * vy[i])) / 2 - s.ke[i]) * smooth;
  }
}

/** Whether particle i has at least two neighbours touching it (it is part of a solid or liquid). */
function crowded(s: BoxSim, i: number) {
  let c = 0;
  for (let j = 0; j < s.n; j++) {
    if (j === i || s.gone[j]) continue;
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
  /** Each box's particles' left and right ends as the element was shown. */
  spans: Array<[number, number]>;
  /** How many solute particles were loose, sampled every LOOSE_STEP seconds per box: [age, count]. */
  loose: Array<Array<[number, number]>>;
  /** Which of each box's solute particles are counted as dissolved (see looseCount). */
  free: Uint8Array[];
  /** The liquid's surface, sampled like `loose` for a box with `level`: [age, height]. */
  levels: Array<Array<[number, number]>>;
  /** Each box's liquid surface as the element was shown. */
  level0: number[];
}

/** The dissolved count is sampled this often (video seconds) and shown as the median of the last LOOSE_SECONDS. */
const LOOSE_STEP = 0.2;
const LOOSE_SECONDS = 2;

/**
 * How many particles of the first kind have broken away (dissolved): those not in a clump of four
 * or more of their own kind touching one another. Two or three that happen to meet in the solution
 * still count as dissolved.
 */
/**
 * How many of the first kind's particles are dissolved. Particles are grouped into clumps (each
 * within 1.35 of another): one in a clump of three or fewer has come loose, and one in a clump of
 * six or more (or half the solute, if that is more) is part of a lump. With `free` (one flag per particle, kept between calls) a loose
 * particle stays counted until it joins a real lump again, so a few dissolved particles that brush
 * together for a moment are not counted as undissolved.
 */
function looseCount(s: BoxSim, free?: Uint8Array) {
  const idx: number[] = [];
  for (let i = 0; i < s.n; i++) if (s.kind[i] === 0 && !s.gone[i]) idx.push(i);
  const seen = new Uint8Array(idx.length);
  // A clump this big is a lump: six particles, or half the solute when there is more.
  const lump = Math.max(6, Math.ceil(idx.length / 2));
  let loose = 0;
  for (let a = 0; a < idx.length; a++) {
    if (seen[a]) continue;
    // Gather the clump this particle is in.
    const clump = [a];
    seen[a] = 1;
    for (let k = 0; k < clump.length; k++) {
      const p = clump[k];
      for (let b = 0; b < idx.length; b++) {
        if (seen[b]) continue;
        const dx = s.x[idx[p]] - s.x[idx[b]];
        const dy = s.y[idx[p]] - s.y[idx[b]];
        if (dx * dx + dy * dy < 1.35 * 1.35) {
          seen[b] = 1;
          clump.push(b);
        }
      }
    }
    for (const p of clump) {
      if (!free) {
        if (clump.length <= 3) loose++;
        continue;
      }
      if (clump.length <= 3) free[p] = 1;
      else if (clump.length >= lump) free[p] = 0;
      loose += free[p];
    }
  }
  return loose;
}

/**
 * The dissolved count to show: the median of the recent samples, so a few loose particles that
 * brush together for a moment do not make the count jump down and back up.
 */
function looseAt(samples: Array<[number, number]>, s: BoxSim) {
  if (!samples.length) return looseCount(s);
  const v = samples.map(([, n]) => n).sort((p, q) => p - q);
  return v[Math.floor(v.length / 2)];
}

/**
 * How high a box's liquid reaches: the top of the particles not in the lump, read at the
 * ninetieth percentile so a particle or two that jumps clear does not count.
 */
function surfaceOf(s: BoxSim, b: ParticleBox) {
  const ys: number[] = [];
  for (let i = 0; i < s.n; i++) if (!s.gone[i] && !(b.lump && s.kind[i] === 0)) ys.push(s.y[i]);
  if (!ys.length) return 0;
  ys.sort((p, q) => p - q);
  return ys[Math.floor(0.9 * (ys.length - 1))] + 0.45;
}

function spanOf(s: BoxSim): [number, number] {
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i < s.n; i++) {
    if (s.gone[i]) continue;
    lo = Math.min(lo, s.x[i]);
    hi = Math.max(hi, s.x[i]);
  }
  return [lo, hi];
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
    ke: s.ke.slice(),
    held: s.held.slice(),
    stuck: s.stuck.slice(),
    side: s.side.slice(),
    gone: s.gone.slice(),
    bonds: s.bonds.map((bd) => ({ ...bd })),
    bonded: new Set(s.bonded),
    contacts: [],
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

/**
 * How a box is stepped with the controls as they stand (or as it settles before it is seen, with
 * no controls: no bath or zones, no stirring, a closed filter, nothing leaving the box).
 */
function optsFor(b: ParticleBox, ctl?: Controls): StepOpts {
  const { w, h } = boxSize(b);
  const standing = b.divider !== undefined && ctl?.lifted[b.id] === undefined;
  const t0 = tempOf(b.temp, TEMPS[b.state]);
  const temp = ctl ? ctl.temp[b.id] : t0;
  return {
    w,
    firm: ctl ? b.state !== 'gas' : false,
    divider: standing ? b.divider! * w : undefined,
    bath: ctl ? b.bath : undefined,
    sigma: ctl && b.expand ? 1 + b.expand * Math.max(0, temp - t0) : 1,
    stir: ctl?.stir[b.id],
    magnet: ctl?.magnet[b.id],
    run: ctl?.run[b.id],
    filter: b.filter && { y: b.filter.at * h, holes: b.filter.holes, open: ctl?.released[b.id] !== undefined },
    wall: b.wall && { x: b.wall.at * w, top: b.wall.height * h },
    zones: ctl && b.zones?.map((z) => ({ x0: z.x[0] * w, x1: z.x[1] * w, y0: z.y[0] * h, y1: z.y[1] * h, temp: z.temp === undefined ? temp : tempOf(z.temp, temp) })),
    escape: ctl ? b.escape : false,
    react: !!ctl && (!b.waits || ctl.released[b.id] !== undefined),
    insulated: ctl ? b.insulated : false,
    power: ctl?.power[b.id],
    electrodes: b.electrodes,
    // As an insulated box settles, a kind with its own temperature is held at it (a hot lump in cold water).
    kindTemps: !ctl && b.insulated ? b.kinds?.map((k) => (k.temp === undefined ? undefined : tempOf(k.temp, t0))) : undefined,
  };
}

/** How hard the current pushes a particle with a charge of 1. */
const FIELD = 1.2;
/** How far from its wall an electrode's coating can grow. */
const COAT = 2.4;

/**
 * What happens at the electrodes while the current flows. A loose particle touching an electrode,
 * or a particle already stuck on it, changes kind by that electrode's rule for it, and with `stick`
 * stays there. And an electrode that `dissolve`s gives up its outermost stuck particle now and then,
 * which leaves as another kind.
 */
function atElectrodes(s: BoxSim, es: NonNullable<ParticleBox['electrodes']>, power: number, w: number) {
  const { n, x, y, kind, held, gone, side } = s;
  const sides = [es.left, es.right] as const;
  const stuckNow = [0, 0];
  for (let i = 0; i < n; i++) {
    if (held[i] || gone[i]) continue;
    const rad = 0.5 * s.size[kind[i]];
    let at = x[i] < rad + 0.2 ? 1 : x[i] > w - rad - 0.2 ? 2 : 0;
    // Or a particle stuck on it, so a coating builds up, but only a few layers thick.
    if (!at && (x[i] < COAT || x[i] > w - COAT))
      for (let j = 0; j < n && !at; j++) {
        if (!side[j] || gone[j]) continue;
        const dx = x[i] - x[j];
        const dy = y[i] - y[j];
        if (dx * dx + dy * dy < 1.2 * 1.2) at = side[j];
      }
    if (!at) continue;
    const rule = sides[at - 1]?.rules?.find((ru) => ru.kind === kind[i]);
    if (!rule || (rule.chance !== undefined && s.rnd() >= rule.chance * power)) continue;
    kind[i] = rule.to;
    if (rule.stick) {
      stuckNow[at - 1]++;
      held[i] = 1;
      s.stuck[i] = 1;
      side[i] = at;
      s.vx[i] = 0;
      s.vy[i] = 0;
    }
  }
  sides.forEach((e, si) => {
    const d = e?.dissolve;
    if (!d) return;
    // With a chance, now and then; without one, an atom for each one the other electrode gained.
    let leave = d.chance === undefined ? stuckNow[1 - si] : s.rnd() < d.chance * power ? 1 : 0;
    for (; leave > 0; leave--) {
      // The outermost particle of the coating (furthest from its wall) leaves.
      let best = -1;
      for (let i = 0; i < n; i++) {
        if (side[i] !== si + 1 || kind[i] !== d.kind || gone[i]) continue;
        if (best < 0 || (si === 0 ? x[i] > x[best] : x[i] < x[best])) best = i;
      }
      if (best < 0) return;
      kind[best] = d.to;
      held[best] = 0;
      s.stuck[best] = 0;
      side[best] = 0;
      s.vx[best] = si === 0 ? 1.5 : -1.5;
    }
  });
}

/**
 * The temperature a box's thermometer reads. An insulated box is not held at one, so its
 * thermometer reads how fast its particles move: those of the kinds without their own starting
 * temperature (the water, not the hot lump put into it).
 */
function thermoTemp(b: ParticleBox, s: BoxSim, held: number) {
  if (!b.insulated) return held;
  let e = 0;
  let m = 0;
  for (let i = 0; i < s.n; i++) {
    if (s.gone[i] || b.kinds?.[s.kind[i]]?.temp !== undefined) continue;
    e += s.ke[i];
    m++;
  }
  return m ? e / m : held;
}

function warmBoxes(el: ParticlesEl): BoxSim[] {
  const key = JSON.stringify([el.id, el.boxes, el.seed]);
  let boxes = warmed.get(key);
  if (!boxes) {
    boxes = el.boxes.map((b, bi) => {
      const s = initBox(b, (el.seed ?? 7) * 101 + bi * 7919);
      const t = tempOf(b.temp, TEMPS[b.state]);
      // Every box settles before it is seen: a solid's loose edge particles drop into place.
      // (Not a paper strip's dot, whose dyes would slowly sort themselves while it settled.)
      const steps = b.paper ? 0 : Math.round(WARM / DT);
      // The whole box is held at its temperature while it settles, even one with a bath.
      const o = optsFor(b);
      for (let k = 0; k < steps; k++) step(s, o, t, s.lidY, 0, false);
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
    const boxes = warmBoxes(el);
    c = { key, played: [], age: 0, boxes, trails: el.boxes.map(() => []), spans: boxes.map(spanOf), loose: el.boxes.map(() => []), free: boxes.map((s) => new Uint8Array(s.n)), levels: el.boxes.map(() => []), level0: boxes.map((s, bi) => surfaceOf(s, el.boxes[bi])) };
    caches.set(el.id, c);
  }
  c = c!;
  c.played = played;
  const stepsPerSecond = (RATE * (el.speed ?? 1)) / DT;
  const steps = Math.floor((age - c.age) * stepsPerSecond + 1e-9);
  for (let k = 0; k < steps; k++) {
    const a = c.age + 1 / stepsPerSecond;
    const ctl = controlsAt(el, played, a);
    el.boxes.forEach((b, bi) => {
      const { h } = boxSize(b);
      const s = c!.boxes[bi];
      if (ctl.released[b.id] !== undefined && s.held.some((v, i) => v && !s.stuck[i])) for (let i = 0; i < s.n; i++) if (!s.stuck[i]) s.held[i] = 0;
      // Pour in the next reserved units, each dropping in at the top middle.
      for (const want = Math.min(s.units.length, Math.floor(ctl.added[b.id] + 1e-9)); s.poured < want; s.poured++) {
        const unit = s.units[s.poured];
        // Into a liquid, the next waits until the last has moved clear of the tip: a particle
        // dropped on top of another would fly apart from it.
        if (b.state !== 'gas') {
          const tx = boxSize(b).w / 2;
          const ty = ctl.lid[b.id] * h - 0.7;
          let busy = false;
          for (let i = 0; i < s.n && !busy; i++) if (!s.gone[i] && Math.abs(s.x[i] - tx) < 1.6 && Math.abs(s.y[i] - ty) < 1.2) busy = true;
          if (busy) break;
        }
        const cx = boxSize(b).w / 2 + (s.rnd() - 0.5) * 0.6;
        unit.forEach((k, u) => {
          s.gone[k] = 0;
          s.x[k] = cx + (u - (unit.length - 1) / 2) * 0.8;
          s.y[k] = ctl.lid[b.id] * h - 0.7;
          s.vx[k] = 0;
          s.vy[k] = -1.5;
        });
      }
      // Heat from reactions leaks away to the surroundings.
      if (s.warm) s.warm *= Math.exp(-COOL * DT);
      step(s, optsFor(b, ctl), (s.warm ? Math.max(0.02, ctl.temp[b.id] + s.warm) : ctl.temp[b.id]), ctl.lid[b.id] * h, a, true);
      while (s.hits.length && s.hits[0].at < a - 2.5) s.hits.shift();
      const tr = c!.trails[bi];
      if (b.follow !== undefined && (!tr.length || a - tr[tr.length - 1][0] >= TRAIL_STEP - 1e-9)) {
        tr.push([a, s.x[b.follow], s.y[b.follow]]);
        while (tr.length && tr[0][0] < a - TRAIL_SECONDS) tr.shift();
      }
      const lo = c!.loose[bi];
      if (b.kinds && b.kinds.length > 1 && (!lo.length || a - lo[lo.length - 1][0] >= LOOSE_STEP - 1e-9)) {
        lo.push([a, looseCount(s, c!.free[bi])]);
        while (lo.length && lo[0][0] < a - LOOSE_SECONDS) lo.shift();
      }
      const lv = c!.levels[bi];
      if (b.level && (!lv.length || a - lv[lv.length - 1][0] >= LOOSE_STEP - 1e-9)) {
        lv.push([a, surfaceOf(s, b)]);
        while (lv.length && lv[0][0] < a - 1) lv.shift();
      }
    });
    c.age = a;
  }
  const ctl = controlsAt(el, played, age);
  return el.boxes.map((b, bi) => {
    const s = c!.boxes[bi];
    // Hits are counted over the last two seconds, so the count does not flicker.
    const recent = s.hits.filter((hh) => hh.at > age - 2);
    // Particles that have left the box are not drawn.
    const here = (_: unknown, i: number) => !s.gone[i];
    const goneCount = s.gone.reduce((m, g) => m + g, 0);
    const keep = <T,>(a: ArrayLike<T>) => (goneCount ? Array.from(a).filter(here) : Array.from(a));
    // A particle's place among those still drawn.
    const visible = (i: number) => {
      let m = 0;
      for (let k = 0; k < i; k++) if (!s.gone[k]) m++;
      return m;
    };
    return {
      x: keep(s.x),
      y: keep(s.y),
      kind: keep(s.kind),
      lidY: s.lidY,
      temp: thermoTemp(b, s, s.warm ? Math.max(0.02, ctl.temp[b.id] + s.warm) : ctl.temp[b.id]),
      hits: recent.filter((hh) => hh.at > age - FLASH),
      hitRate: Math.round(recent.length / 2),
      trail: c!.trails[bi].map(([, x, y]) => [x, y] as [number, number]),
      ke: b.heatColor ? keep(s.ke) : undefined,
      divider: b.divider === undefined ? undefined : { x: b.divider * boxSize(b).w, out: ctl.lifted[b.id] === undefined ? 0 : Math.min(1, (age - ctl.lifted[b.id]) / 0.6) },
      span: spanOf(s),
      loose: b.kinds && b.kinds.length > 1 ? looseAt(c!.loose[bi], s) : 0,
      stir: ctl.stir[b.id],
      span0: c!.spans[bi],
      magnet: ctl.magnet[b.id],
      filter: b.filter && { y: b.filter.at * boxSize(b).h, open: ctl.released[b.id] !== undefined },
      front: s.front,
      goneCount,
      bonds: s.bonds.filter((bd) => bd.show && !s.gone[bd.i] && !s.gone[bd.j]).map(({ i, j }) => (goneCount ? [visible(i), visible(j)] : [i, j]) as [number, number]),
      tally: b.tally ? s.kind.reduce((m, k, i) => m + (!s.gone[i] && b.tally!.kinds.includes(k) ? 1 : 0), 0) : 0,
      speed: b.spread ? keep(Array.from(s.vx, (vx, i) => Math.hypot(vx, s.vy[i]))) : undefined,
      // The surface, averaged over the last second so it does not flicker.
      level: b.level ? { now: c!.levels[bi].length ? c!.levels[bi].reduce((m, [, v]) => m + v, 0) / c!.levels[bi].length : c!.level0[bi], start: c!.level0[bi] } : undefined,
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

/**
 * A tally's label for a count of one: its plural noun made singular ("1 hydronium ion", "1 unit of
 * silver chloride", "1 particle inside"). The noun is the last word before " of", " inside" or
 * " left".
 */
export function singular(label: string): string {
  const m = /^(.*?)s(\s+(?:of|inside|left)\b.*)?$/.exec(label);
  return m ? m[1] + (m[2] ?? '') : label;
}
