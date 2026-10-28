/**
 * Figures for the first half of the Matter as Solutions, Acids and Bases videos (Grade 11
 * Chemistry, unit 3, lessons 3.1 to 3.4), built only from standard diagram parts (lines, curves,
 * shaded regions and labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `tag`, `arrow`, `line` and `room`: a label, an arrow or a line at given points, and two
 *   unused points that keep space for labels; `join` puts parts together.
 * - `beaker`: a beaker of solution, with particles or ions scattered through it (balls with their
 *   signs), ions written as labels at given places, and a heap of solid on the bottom.
 * - `tester`: a conductivity tester (two electrodes, a battery and a bulb) dipped into a beaker,
 *   with the bulb lit or dark.
 * - `hydrated`: an ion surrounded by water molecules, oxygen ends towards a positive ion and
 *   hydrogen ends towards a negative one; `latticeBlock`: a corner of an ionic crystal, with water
 *   molecules at its surface.
 * - `ionRows`: the ions one formula unit releases, as labelled circles in rows.
 * - `molecule`: atoms as touching balls with their symbols (and a charge), for an acid ionising.
 * - `solubilityCurve`: the solubility of potassium nitrate against temperature, with the
 *   lesson's points (or, zoomed in, the amounts of its example at 20 °C).
 * - `flask`: a volumetric flask with its line, the solution, and a funnel or a stopper.
 *
 * Positive ions are orange and negative ions blue, as in the rest of the course.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** A straight line between two points (an arrow with `arrow`). Part: its `id`. */
export function line(
  id: string,
  from: P,
  to: P,
  o: { tone?: DiagramTone; weight?: number; dashed?: boolean; arrow?: boolean; label?: string; labelSide?: 'left' | 'right'; group?: string } = {},
): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        tone: o.tone ?? 'ink',
        weight: o.weight ?? 3,
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.label ? { label: o.label, labelSide: o.labelSide ?? 'left' } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** An arrow from one point to another, with an optional label (TeX) beside its middle. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number } = {}): Part {
  return line(id, from, to, { ...o, arrow: true });
}

/** Two points that nothing uses, so the diagram keeps room out to them. */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** Point names round a circle, added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A shaded ball with an edge (and a label in the middle, TeX), all in `group`: parts `id`, `id-edge`, `id-q`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, group: string, tex?: string, shade = 0.6) {
  const ids = ring(points, id, c, r);
  items.push(
    { kind: 'region', id, points: ids, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, group },
  );
  if (tex !== undefined) {
    points[`${id}-c`] = c;
    items.push({ kind: 'label', id: `${id}-q`, at: `${id}-c`, tex, place: 'center', group });
  }
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

/** A kind of particle scattered through a solution: balls of one colour, with a sign (TeX) in each. */
export interface Scatter {
  id: string;
  count: number;
  tone: DiagramTone;
  /** What each ball shows, such as "+" or "-"; nothing by default (a molecule). */
  sign?: string;
  /** The radius of each ball (0.32 by default). */
  r?: number;
}

/** A rectangle [x0, y0, x1, y1], measured from a beaker's bottom left corner. */
type Box = [number, number, number, number];

/**
 * A beaker `w` wide and `h` tall (3.6 by 4 by default) with its bottom left corner at `at`,
 * filled to `level` (three quarters of `h` by default) with a solution of colour `tone`. Its
 * `label` (TeX) sits under it.
 *
 * In the solution: `scatter` spreads each kind of particle at random through the liquid (the same
 * way every time, from `seed`), clear of each other, of the solid and of the boxes in `avoid`;
 * `ions` writes labels (TeX) at given places, measured from the bottom left corner; and `solid`
 * draws a low heap of solid on the bottom, `height` tall (0.5 by default).
 *
 * Parts: `glass` (a group: the sides, bottom and lip), `liquid`, `label`, `solid` (a group: the
 * heap and its edge), each scattered kind by its `id` (a group of its balls), and each ion label
 * by its `id` (in its `group`, if it has one).
 */
export function beaker(o: {
  name?: string;
  at?: P;
  w?: number;
  h?: number;
  level?: number;
  tone?: DiagramTone;
  shade?: number;
  label?: string;
  scatter?: Scatter[];
  seed?: number;
  avoid?: Box[];
  ions?: { id: string; at: P; tex: string; tone?: DiagramTone; group?: string }[];
  solid?: { tone?: DiagramTone; height?: number };
}): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.w ?? 3.6;
  const H = o.h ?? 4;
  const level = o.level ?? H * 0.75;
  const points: Record<string, P> = {
    [n('g0')]: [x - 0.2, y + H + 0.16],
    [n('g1')]: [x, y + H],
    [n('g2')]: [x, y],
    [n('g3')]: [x + W, y],
    [n('g4')]: [x + W, y + H],
    [n('g5')]: [x + W + 0.2, y + H + 0.16],
  };
  const inset = 0.07;
  Object.assign(points, {
    [n('liq-0')]: [x + inset, y + inset],
    [n('liq-1')]: [x + W - inset, y + inset],
    [n('liq-2')]: [x + W - inset, y + level],
    [n('liq-3')]: [x + inset, y + level],
  });
  const items: DiagramItem[] = [{ kind: 'region', id: n('liquid'), points: ['liq-0', 'liq-1', 'liq-2', 'liq-3'].map(n), tone: o.tone ?? 'adj', shade: o.shade ?? 0.16 }];
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: n(`glass${i}`), from: n(`g${i}`), to: n(`g${i + 1}`), tone: 'ink', weight: 3, group: n('glass') });

  // The heap: a low dome along the bottom, short of the walls.
  const heap = o.solid ? (o.solid.height ?? 0.5) : 0;
  if (o.solid) {
    const ids: string[] = [];
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x + 0.2 + t * (W - 0.4);
      const py = y + inset + heap * Math.pow(Math.sin(Math.PI * t), 0.6);
      points[n(`heap-${i}`)] = [px, py];
      ids.push(n(`heap-${i}`));
    }
    items.push(
      { kind: 'region', id: n('heap'), points: ids, tone: o.solid.tone ?? 'ink', shade: 0.7, group: n('solid') },
      { kind: 'curve', id: n('heap-edge'), points: ids, closed: true, tone: o.solid.tone ?? 'ink', weight: 2, group: n('solid') },
    );
  }

  // Scattered particles: random spots in the liquid, clear of the walls, the surface, the heap,
  // the boxes to avoid and each other.
  const rand = random(o.seed ?? 5);
  const placed: { c: P; r: number }[] = [];
  // How far a ball at c is from touching the others (negative when it overlaps one).
  const space = (c: P, r: number) => Math.min(Infinity, ...placed.map((q) => Math.hypot(c[0] - q.c[0], c[1] - q.c[1]) - r - q.r));
  const outside = (c: P, r: number) => (o.avoid ?? []).every(([a0, b0, a1, b1]) => c[0] + r < x + a0 || c[0] - r > x + a1 || c[1] + r < y + b0 || c[1] - r > y + b1);
  for (const k of o.scatter ?? []) {
    const r = k.r ?? 0.32;
    for (let i = 0; i < k.count; i++) {
      // The first spot with a clear gap round it, or failing that the roomiest spot tried.
      let best: P = [x + W / 2, y + level / 2];
      let bestRoom = -Infinity;
      for (let tries = 0; tries < 3000; tries++) {
        const c: P = [x + 0.12 + r + rand() * (W - 0.24 - 2 * r), y + heap + 0.12 + r + rand() * (level - heap - 0.24 - 2 * r)];
        if (!outside(c, r)) continue;
        const gap = space(c, r);
        if (gap > bestRoom) [best, bestRoom] = [c, gap];
        if (gap >= 0.14) break;
      }
      const c = best;
      placed.push({ c, r });
      ball(points, items, n(`${k.id}${i}`), c, r, k.tone, n(k.id), k.sign);
    }
  }

  for (const ion of o.ions ?? []) {
    const id = n(ion.id);
    points[`${id}-at`] = [x + ion.at[0], y + ion.at[1]];
    items.push({ kind: 'label', id, at: `${id}-at`, tex: ion.tex, place: 'center', tone: ion.tone ?? 'ink', ...(ion.group ? { group: n(ion.group) } : {}) });
  }
  if (o.label) {
    points[n('label-at')] = [x + W / 2, y - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below' });
  }
  return { points, items };
}

/**
 * A conductivity tester dipped into a beaker of solution: two electrodes, wired to a battery and a
 * light bulb above the beaker. With `lit`, the bulb glows and shines. The beaker (4.8 by 4.2, filled
 * to 3.3, bottom left corner at `at`) takes `scatter`, `seed` and `label` as in `beaker`; its
 * particles keep clear of the electrodes.
 *
 * Parts: those of `beaker` (`glass`, `liquid`, `label` and each scattered kind), `circuit` (a
 * group: the electrodes, the wires, the battery and the bulb's glass and base) and `glow` (a
 * group: the lit bulb and its rays).
 */
export function tester(o: { name?: string; at?: P; lit?: boolean; scatter?: Scatter[]; seed?: number; label?: string }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const cup = beaker({ name: o.name, at: [x, y], w: 4.8, h: 4.2, level: 3.3, scatter: o.scatter, seed: o.seed, label: o.label, avoid: [[0.3, 0, 0.9, 3.5], [3.9, 0, 4.5, 3.5]] });
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const wire = (id: string, path: P[], weight = 3) => {
    const ids = path.map((p, i) => {
      points[n(`${id}-${i}`)] = [x + p[0], y + p[1]];
      return n(`${id}-${i}`);
    });
    items.push({ kind: 'curve', id: n(id), points: ids, tone: 'ink', weight, group: n('circuit') });
  };
  // Electrodes: two thick metal rods, from near the bottom of the beaker to above its rim.
  const [L, R, M] = [0.6, 4.2, 2.4];
  wire('rod-l', [[L, 0.5], [L, 4.9]], 8);
  wire('rod-r', [[R, 0.5], [R, 4.9]], 8);
  // Wires: the left rod up to the bulb's base; the bulb's base across and down through the
  // battery to the right rod.
  wire('w-l', [[L, 4.9], [L, 6.6], [M - 0.28, 6.6]]);
  wire('w-r', [[M + 0.28, 6.6], [R, 6.6], [R, 6.02]]);
  wire('w-b', [[R, 5.68], [R, 4.9]]);
  // The battery: a long thin plate and a short thick one.
  wire('bat-long', [[R - 0.4, 6.02], [R + 0.4, 6.02]], 3);
  wire('bat-short', [[R - 0.22, 5.68], [R + 0.22, 5.68]], 7);
  // The bulb: a round glass on a base, with a filament inside.
  const c: P = [x + M, y + 7.35];
  const glass = ring(points, n('bulb'), c, 0.55, 28);
  items.push({ kind: 'region', id: n('lamp'), points: glass, tone: 'theta', shade: 0.75, group: n('glow') });
  items.push({ kind: 'curve', id: n('bulb-edge'), points: glass, closed: true, tone: 'ink', weight: 2.5, group: n('circuit') });
  wire('base', [[M - 0.28, 6.45], [M + 0.28, 6.45], [M + 0.28, 6.82], [M - 0.28, 6.82], [M - 0.28, 6.45]], 2.5);
  wire('filament', [[M - 0.15, 6.82], [M - 0.08, 7.4], [M, 7.22], [M + 0.08, 7.4], [M + 0.15, 6.82]], 2);
  // Rays round the top of the bulb.
  [-15, 20, 55, 90, 125, 160, 195].forEach((deg, i) => {
    const a = (deg * Math.PI) / 180;
    points[n(`ray${i}-a`)] = [c[0] + 0.8 * Math.cos(a), c[1] + 0.8 * Math.sin(a)];
    points[n(`ray${i}-b`)] = [c[0] + 1.2 * Math.cos(a), c[1] + 1.2 * Math.sin(a)];
    items.push({ kind: 'line', id: n(`ray${i}`), from: n(`ray${i}-a`), to: n(`ray${i}-b`), tone: 'theta', weight: 3, group: n('glow') });
  });
  // Room for the rays, lit or not, so a lit and a dark tester are drawn the same size.
  Object.assign(points, { [n('top-l')]: [c[0] - 1.25, c[1] + 1.25], [n('top-r')]: [c[0] + 1.25, c[1] + 1.25] });
  const glow = o.lit ? items : items.filter((it) => it.group !== n('glow'));
  return join([cup, { points, items: glow }]);
}

/**
 * A water molecule drawn as balls, its oxygen at `at` and its two hydrogens pointing `deg`
 * degrees round from the right (anticlockwise), `s` times the usual size. Parts: `id-o`, `id-h1`,
 * `id-h2` (each a ball with its edge), all in `group`.
 */
function waterMol(points: Record<string, P>, items: DiagramItem[], id: string, at: P, deg: number, group: string, s = 1) {
  const a = (deg * Math.PI) / 180;
  const half = (52.25 * Math.PI) / 180;
  const d = 0.4 * s;
  // Hydrogens first, so the oxygen is drawn over their inner edges.
  ball(points, items, `${id}-h1`, [at[0] + d * Math.cos(a - half), at[1] + d * Math.sin(a - half)], 0.19 * s, 'ink', group, undefined, 0.45);
  ball(points, items, `${id}-h2`, [at[0] + d * Math.cos(a + half), at[1] + d * Math.sin(a + half)], 0.19 * s, 'ink', group, undefined, 0.45);
  ball(points, items, `${id}-o`, at, 0.3 * s, 'bad', group, undefined, 0.7);
}

/**
 * A water molecule on its own, with δ− on its oxygen and δ+ on each hydrogen (`charges`),
 * pointing its hydrogens `deg` degrees round (−90, straight down, by default), `s` times the size
 * of the molecules in `hydrated` (2.6 by default). Parts: `mol` (a group: the three balls) and
 * `charges` (a group: `d-o`, `d-h1` and `d-h2`).
 */
export function waterMolecule(o: { name?: string; at?: P; deg?: number; s?: number; charges?: boolean }): Part {
  const n = namer(o.name);
  const at = o.at ?? [0, 0];
  const deg = o.deg ?? -90;
  const s = o.s ?? 2.6;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  waterMol(points, items, n('w'), at, deg, n('mol'), s);
  if (o.charges) {
    const a = (deg * Math.PI) / 180;
    const half = (52.25 * Math.PI) / 180;
    const d = 0.4 * s;
    const out = 0.19 * s + 0.35;
    const hs = [a - half, a + half].map((b): P => [at[0] + (d + out) * Math.cos(b), at[1] + (d + out) * Math.sin(b)]);
    Object.assign(points, { [n('d-o-at')]: [at[0] - (0.3 * s + 0.4) * Math.cos(a), at[1] - (0.3 * s + 0.4) * Math.sin(a)], [n('d-h1-at')]: hs[0], [n('d-h2-at')]: hs[1] });
    items.push(
      { kind: 'label', id: n('d-o'), at: n('d-o-at'), tex: '\\delta-', tone: 'adj', place: 'center', group: n('charges') },
      { kind: 'label', id: n('d-h1'), at: n('d-h1-at'), tex: '\\delta+', tone: 'opp', place: 'center', group: n('charges') },
      { kind: 'label', id: n('d-h2'), at: n('d-h2-at'), tex: '\\delta+', tone: 'opp', place: 'center', group: n('charges') },
    );
  }
  return { points, items };
}

/** The radius of a positive and of a negative ion in `hydrated` and `latticeBlock`. */
const ION_R = { '+': 0.36, '-': 0.5 } as const;

/**
 * An ion with `count` water molecules round it (6 by default): their oxygen ends face a positive
 * ion (orange) and their hydrogen ends face a negative ion (blue). `at` is the ion's centre.
 *
 * Parts: `ion` (a group: the ball and its sign) and `water` (a group: every water molecule).
 */
export function hydrated(o: { name?: string; at: P; sign: '+' | '-'; count?: number; turn?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const r = ION_R[o.sign];
  const count = o.count ?? 6;
  for (let i = 0; i < count; i++) {
    const a = (o.turn ?? 90) + (360 * i) / count;
    const rad = (a * Math.PI) / 180;
    // Oxygen towards a positive ion, its hydrogens pointing out; hydrogens towards a negative one.
    const d = o.sign === '+' ? r + 0.36 : r + 0.62;
    const at: P = [o.at[0] + d * Math.cos(rad), o.at[1] + d * Math.sin(rad)];
    waterMol(points, items, n(`w${i}`), at, o.sign === '+' ? a : a + 180, n('water'));
  }
  ball(points, items, n('core'), o.at, r, o.sign === '+' ? 'opp' : 'adj', n('ion'), o.sign);
  return { points, items };
}

/**
 * A corner of an ionic crystal: `cols` by `rows` ions, `gap` apart (1.05 by default), positive
 * (orange) and negative (blue) in turn with a positive ion at the bottom left; `at` is the bottom
 * left ion's centre. `waters` puts water molecules beside the crystal's right side, each facing
 * the ion next to it the right way round (oxygen towards a positive ion).
 *
 * Parts: `ions` (a group: every ion) and `water` (a group: the water molecules at the surface).
 */
export function latticeBlock(o: { name?: string; at?: P; cols: number; rows: number; gap?: number; waters?: number[] }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const g = o.gap ?? 1.05;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) {
      const sign = (row + col) % 2 === 0 ? '+' : '-';
      ball(points, items, n(`i${row}-${col}`), [x0 + col * g, y0 + row * g], ION_R[sign] * 0.92, sign === '+' ? 'opp' : 'adj', n('ions'), sign);
    }
  // Water molecules at the right-hand surface, beside the rows listed in `waters`.
  for (const row of o.waters ?? []) {
    const col = o.cols - 1;
    const sign = (row + col) % 2 === 0 ? '+' : '-';
    const at: P = [x0 + col * g + (sign === '+' ? ION_R['+'] + 0.4 : ION_R['-'] + 0.62), y0 + row * g];
    waterMol(points, items, n(`sw${row}`), at, sign === '+' ? 0 : 180, n('water'));
  }
  return { points, items };
}

/**
 * The ions of one formula unit as labelled circles, a row for each kind of ion, centred over each
 * other, `gap` apart (2 by default), each circle of radius `r` (0.92 by default). A row's `tex` is
 * the ion's formula; positive ions are orange and negative ions blue unless `tone` says otherwise.
 *
 * Parts: each row by its `id` (a group: its circles and their labels).
 */
export function ionRows(o: { name?: string; rows: { id: string; count: number; tex: string; tone: DiagramTone }[]; gap?: number; r?: number }): Part {
  const n = namer(o.name);
  const g = o.gap ?? 2;
  const r = o.r ?? 0.92;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.rows.forEach((row, ri) => {
    const y = -ri * g;
    for (let i = 0; i < row.count; i++) {
      const x = (i - (row.count - 1) / 2) * g;
      ball(points, items, n(`${row.id}${i}`), [x, y], r, row.tone, n(row.id), row.tex, 0.35);
    }
  });
  return { points, items };
}

/**
 * A molecule or ion as touching balls, each with its symbol: `atoms` with their centres, radii
 * and colours, and with `charge` its charge (TeX) at the top right. Part: `id` (a group: every
 * ball, symbol and the charge).
 */
export function molecule(id: string, atoms: { sym: string; at: P; r: number; tone: DiagramTone; shade?: number }[], charge?: string): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  atoms.forEach((a, i) => ball(points, items, `${id}-a${i}`, a.at, a.r, a.tone, id, `\\text{${a.sym}}`, a.shade ?? 0.55));
  if (charge) {
    const right = Math.max(...atoms.map((a) => a.at[0] + a.r));
    const top = Math.max(...atoms.map((a) => a.at[1] + a.r));
    points[`${id}-q-at`] = [right + 0.02, top - 0.12];
    items.push({ kind: 'label', id: `${id}-charge`, at: `${id}-q-at`, tex: charge, place: 'right', group: id });
  }
  return { points, items };
}

/** The solubility of potassium nitrate (g per 100 g of water) at a temperature in °C: a smooth fit, 32 g at 20 °C and about 110 g at 60 °C. */
export const kno3 = (t: number) => 13.3 + 0.6 * t + 0.0168 * t * t;

/**
 * The solubility of potassium nitrate against temperature, in grams per 100 g of water: below the
 * curve the solution is unsaturated, above it saturated with solid left over. The whole graph runs
 * from 0 to 80 °C; with `zoom`, it runs from 0 to 40 °C and 0 to 60 g, wide enough apart to mark
 * the lesson's three amounts at 20 °C.
 *
 * Parts: `grid`, `axes`, `curve` (with the formula as its label), `regions` (a group: the
 * unsaturated region shaded under the curve, and the names of both regions), `p20` (a group: the
 * solubility at 20 °C, 32 g, as a dot, its value and dashed lines to the axes); on the whole graph
 * `p60` (the same for about 110 g at 60 °C), and with `zoom` the dots `under` (25 g at 20 °C,
 * unsaturated) and `over` (40 g at 20 °C, more than can dissolve).
 */
export function solubilityCurve(o: { name?: string; zoom?: boolean } = {}): Part {
  const zoom = o.zoom ?? false;
  const [X, Y] = zoom ? [40, 60] : [80, 180];
  const g = plane({
    name: o.name,
    x: [0, X],
    y: [0, Y],
    xStep: 10,
    yStep: zoom ? 10 : 20,
    every: zoom ? 1 : 2,
    width: zoom ? 7 : 8,
    height: 6,
    titles: { x: '\\text{Temperature (}^\\circ\\text{C)}', y: '\\text{Solubility (g per 100 g of water)}' },
  });
  // The region under the curve, shaded, up to where the curve leaves the graph.
  const top = Math.min(X, (-0.6 + Math.sqrt(0.36 + 4 * 0.0168 * (Y - 13.3))) / (2 * 0.0168));
  const under: Part = { points: {}, items: [] };
  const ids: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = (top * i) / 40;
    under.points[g.n(`u${i}`)] = g.map(t, kno3(t));
    ids.push(g.n(`u${i}`));
  }
  Object.assign(under.points, { [g.n('u-corner')]: g.map(X, Y), [g.n('u-end')]: g.map(X, 0), [g.n('u-start')]: g.map(0, 0) });
  const corner = top < X ? [g.n('u-corner')] : [];
  under.items.push({ kind: 'region', id: g.n('under-fill'), points: [...ids, ...corner, g.n('u-end'), g.n('u-start')], tone: 'adj', shade: 0.1, group: g.n('regions') });
  const reading = (id: string, t: number, s: number, tex: string, place: Place): Part => {
    const part = join([
      polyline(g, { id: `${id}-lines`, points: [[t, 0], [t, s], [0, s]], tone: 'muted', dashed: true }),
      dots(g, [{ id: `${id}-dot`, x: t, y: s, tex, tone: 'theta', place, group: id }]),
    ]);
    // The dashed lines belong to the reading's group.
    for (const it of part.items) if (it.kind === 'line') it.group = g.n(id);
    return part;
  };
  const names = zoom
    ? [tag(g.n('name-under'), g.map(31, 12), '\\text{unsaturated}', { tone: 'adj', group: g.n('regions') }), tag(g.n('name-over'), g.map(17, 50), '\\text{saturated, with solid}', { tone: 'opp', group: g.n('regions') })]
    : [tag(g.n('name-under'), g.map(40, 15), '\\text{unsaturated}', { tone: 'adj', group: g.n('regions') }), tag(g.n('name-over'), g.map(28, 140), '\\text{saturated, with solid}', { tone: 'opp', group: g.n('regions') })];
  return join([
    g,
    under,
    plot(g, { id: 'curve', f: kno3, from: 0, to: top, tone: 'brand', label: '\\ce{KNO3}', labelAt: zoom ? 0.85 : 0.9, side: zoom ? 'right' : 'left' }),
    ...names,
    reading('p20', 20, 32, '32\\ \\text{g}', zoom ? 'right' : 'above left'),
    ...(zoom
      ? [
          dots(g, [
            { id: 'under', x: 20, y: 25, tex: '25\\ \\text{g}', tone: 'good', place: 'right' },
            { id: 'over', x: 20, y: 40, tex: '40\\ \\text{g}', tone: 'bad', place: 'left' },
          ]),
        ]
      : [reading('p60', 60, 110, '110\\ \\text{g}', 'below right')]),
    // Room for the titles above and below the plane.
    room(g.n('title-room'), g.map(0, -0.18 * Y), g.map(X, 1.08 * Y)),
  ]);
}

/**
 * A volumetric flask: a round bulb on a flat bottom and a long, narrow neck with a single line
 * round it, holding `volume` (TeX, written on the bulb). `fill` fills it with solution up to the
 * line, its meniscus sitting on it; `funnel` puts a funnel in the neck, and `stopper` a stopper.
 * `at` is the middle of the bottom.
 *
 * Parts: `glass` (a group: the outline), `volume`, `mark` (a group: the line and its name),
 * `liquid` (the solution up to the line), `low` (the solution filled to just below the line),
 * `funnel` (a group) and `stopper` (a group).
 */
export function flask(o: { name?: string; at?: P; volume?: string; funnel?: boolean; stopper?: boolean }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const R = 1.75;
  const neck = 0.3;
  const top = 8.2;
  const markY = 6.6;
  const cy = R - 0.2;
  const join0 = Math.acos(neck / R);
  const low = (-65 * Math.PI) / 180;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const at = (p: P): P => [x + p[0], y + p[1]];
  // The right-hand side of the outline, from the bottom up to the top of the neck.
  const right: P[] = [];
  for (let i = 0; i <= 24; i++) {
    const a = low + ((join0 - low) * i) / 24;
    right.push([R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  right.push([neck, top]);
  const left = right.map(([px, py]): P => [-px, py]).reverse();
  const outline = [...left, ...right];
  const ids = outline.map((p, i) => {
    points[n(`o${i}`)] = at(p);
    return n(`o${i}`);
  });
  items.push({ kind: 'curve', id: n('outline'), points: ids, tone: 'ink', weight: 3, group: n('glass') });
  // The solution: everything inside the outline up to a height, with a meniscus dipping to it.
  const fill = (id: string, h: number, meniscus: boolean) => {
    const inner = (p: P): P => [p[0] * 0.96, p[1] + (p[1] < 0.2 ? 0.05 : 0)];
    const side = right.filter((p) => p[1] < h).map(inner);
    const path: P[] = [...side.map(([px, py]): P => [-px, py]).reverse(), ...side];
    const w = neck * 0.9;
    if (meniscus) for (let i = 0; i <= 8; i++) path.push([w - (2 * w * i) / 8, h + 0.12 * ((2 * i) / 8 - 1) ** 2]);
    else path.push([w, h], [-w, h]);
    const pids = path.map((p, i) => {
      points[n(`${id}${i}`)] = at(p);
      return n(`${id}${i}`);
    });
    items.push({ kind: 'region', id: n(id), points: pids, tone: 'adj', shade: 0.28 });
  };
  fill('liquid', markY, true);
  fill('low', markY - 0.45, false);
  Object.assign(points, { [n('mark-a')]: at([-neck - 0.2, markY]), [n('mark-b')]: at([neck + 0.2, markY]), [n('vol-at')]: at([0, cy - 0.2]) });
  items.push(
    { kind: 'line', id: n('mark-line'), from: n('mark-a'), to: n('mark-b'), tone: 'theta', weight: 3.5, group: n('mark') },
    { kind: 'label', id: n('mark-name'), at: n('mark-b'), tex: '\\text{line}', tone: 'theta', place: 'right', group: n('mark') },
  );
  if (o.volume) items.push({ kind: 'label', id: n('volume'), at: n('vol-at'), tex: o.volume, place: 'center' });
  // A funnel resting in the neck, and a stopper in its top.
  const path = (id: string, list: P[], group: string, weight = 3) => {
    const pids = list.map((p, i) => {
      points[n(`${id}${i}`)] = at(p);
      return n(`${id}${i}`);
    });
    items.push({ kind: 'curve', id: n(id), points: pids, tone: 'muted', weight, group: n(group) });
  };
  if (o.funnel) {
    path('fun-l', [[-1.2, top + 1.6], [-0.18, top + 0.3], [-0.18, top - 0.9]], 'funnel');
    path('fun-r', [[1.2, top + 1.6], [0.18, top + 0.3], [0.18, top - 0.9]], 'funnel');
  }
  if (o.stopper) {
    const s = ['st0', 'st1', 'st2', 'st3'];
    Object.assign(points, { [n(s[0])]: at([-0.26, top - 0.45]), [n(s[1])]: at([0.26, top - 0.45]), [n(s[2])]: at([0.42, top + 0.35]), [n(s[3])]: at([-0.42, top + 0.35]) });
    items.push(
      { kind: 'region', id: n('stop-fill'), points: s.map(n), tone: 'muted', shade: 0.8, group: n('stopper') },
      { kind: 'curve', id: n('stop-edge'), points: s.map(n), closed: true, tone: 'ink', weight: 2, group: n('stopper') },
    );
  }
  // Room for the funnel or stopper, so the flask is drawn the same size either way.
  Object.assign(points, { [n('room-a')]: at([-1.3, top + 1.7]), [n('room-b')]: at([1.3, -0.1]) });
  return { points, items };
}
