/**
 * Figures for the second half of the solutions, acids and bases videos (Grade 11 Chemistry,
 * unit 3: dilution, acids and bases, pH and pOH, and strong and weak acids), built only from
 * standard diagram parts (lines, curves, shaded regions and labels), so each goes into a diagram
 * with `figure` (src/video/solids.ts). With a `name`, each part's id starts with it.
 *
 * - `tag`, `arrow` and `frame`: a label, an arrow, or two unused points that keep room for labels.
 * - `dotBeaker`: a beaker of solution with its solute particles as dots, for a dilution (the same
 *   dots spread through more solution).
 * - `flask`: a volumetric flask with the mark on its neck, and a pipette above it.
 * - `beaker`: a beaker of solution with the ions in it, written as formulas.
 * - `balls` and `water`: atoms as coloured balls with their symbols, for a hydrogen ion passing
 *   from an acid to a water molecule.
 * - `phStrip`: the pH scale as fifteen cells from 0 to 14 (from the Grade 10 videos), with
 *   solutions marked on it, tenfold hops above it and, with `poh`, the pOH under each pH.
 * - `twoScales`: hydronium ion concentrations on an ordinary scale, squashed against zero, above
 *   the same solutions spread out on the pH scale.
 * - `acidBox`: an acid's particles in solution, from `particles` (src/video/chem.ts): hydronium
 *   ions, anions and whole acid molecules; `legend`, a key to its particles.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { particles, type ParticleKind } from '@/video/chem.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle, added to `points`. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${key}${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${j}`;
  });
}

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}-0`]: [x0, y0], [`${key}-1`]: [x1, y0], [`${key}-2`]: [x1, y1], [`${key}-3`]: [x0, y1] });
  return [0, 1, 2, 3].map((i) => `${key}-${i}`);
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

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** An arrow from one point to another, with an optional label beside its middle. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, tone: o.tone ?? 'ink', weight: o.weight ?? 3, ...(o.label ? { label: o.label, labelSide: o.labelSide ?? 'left' } : {}), ...(o.group ? { group: o.group } : {}) }],
  };
}

/** Points kept clear round a figure, so labels near its edge stay on the stage. */
export function frame(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

// ---------------------------------------------------------------------------- dilution

/**
 * A beaker `w` wide and `h` tall with its bottom left corner at `at`, filled to `level`, with
 * `dots` solute particles spread evenly through the solution (on a jittered grid, the same way
 * every time from `seed`), and `label` written under it.
 *
 * Parts: `glass` (a group: its sides and lip), `liquid`, `solute` (a group: the dots) and `label`.
 */
export function dotBeaker(o: { name?: string; at?: P; w?: number; h?: number; level: number; dots: number; seed?: number; label?: string; tone?: DiagramTone; dotTone?: DiagramTone; r?: number }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.w ?? 2.6;
  const H = o.h ?? 4.6;
  const r = o.r ?? 0.14;
  const rand = random(o.seed ?? 5);
  const points: Record<string, P> = {
    [n('g0')]: [x - 0.18, y + H + 0.14],
    [n('g1')]: [x, y + H],
    [n('g2')]: [x, y],
    [n('g3')]: [x + W, y],
    [n('g4')]: [x + W, y + H],
    [n('g5')]: [x + W + 0.18, y + H + 0.14],
  };
  const items: DiagramItem[] = [{ kind: 'region', id: n('liquid'), points: rect(points, n('liq'), x + 0.05, y + 0.05, x + W - 0.05, y + o.level), tone: o.tone ?? 'adj', shade: 0.2 }];
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: n(`glass${i}`), from: n(`g${i}`), to: n(`g${i + 1}`), tone: 'ink', weight: 3, group: n('glass') });
  // A grid with cells about as wide as they are tall, one dot in each of `dots` cells chosen at random.
  const iw = W - 0.3;
  const ih = o.level - 0.3;
  let cols = Math.max(1, Math.round(Math.sqrt((o.dots * iw) / ih)));
  let rows = Math.ceil(o.dots / cols);
  while (cols * rows < o.dots) cols++;
  rows = Math.ceil(o.dots / cols);
  const cells = Array.from({ length: cols * rows }, (_, i) => i);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const cw = iw / cols;
  const ch = ih / rows;
  cells.slice(0, o.dots).forEach((cell, i) => {
    const cx = x + 0.15 + ((cell % cols) + 0.5 + (rand() - 0.5) * 0.5) * cw;
    const cy = y + 0.15 + (Math.floor(cell / cols) + 0.5 + (rand() - 0.5) * 0.5) * ch;
    items.push({ kind: 'region', id: n(`dot${i}`), points: ring(points, n(`d${i}-`), [cx, cy], r, 12), tone: o.dotTone ?? 'theta', shade: 0.95, group: n('solute') });
  });
  if (o.label) {
    points[n('label-at')] = [x + W / 2, y - 0.08];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below' });
  }
  return { points, items };
}

/**
 * A volumetric flask, its flat-bottomed bulb `r` across the middle with its bottom at `at`, and a
 * long neck with a mark across it; a pipette stands above the neck. The flask can be shown empty,
 * half-filled with water, or filled to the mark.
 *
 * Parts: `flask` (a group: its outline), `mark` (the line on the neck and its label), `half` (the
 * water in the bottom half of the bulb), `full` (the solution filled to the mark), `pipette` (a
 * group: its tube, bulb and label), `stopper`, and `label` (the flask's name, under it).
 */
export function flask(o: { name?: string; at?: P; r?: number; label?: string; pipette?: string; fullTone?: DiagramTone } = {}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const R = o.r ?? 1.7;
  const neck = 0.28;
  const cy = y0 + R;
  const top = cy + R + 2.6;
  const markY = cy + R + 1.7;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Where the neck meets the bulb, and the bulb from there round to the other side of the neck.
  const a0 = Math.acos(-neck / R);
  const bulb: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((2 * Math.PI - 2 * (a0 - Math.PI / 2)) * i) / steps;
    // A flat bottom: the lowest part of the circle is cut off.
    const p: P = [x0 + R * Math.cos(a), Math.max(cy + R * Math.sin(a), y0 + 0.18)];
    points[n(`b${i}`)] = p;
    bulb.push(n(`b${i}`));
  }
  Object.assign(points, { [n('nl')]: [x0 - neck, top], [n('nr')]: [x0 + neck, top] });
  items.push({ kind: 'curve', id: n('glass'), points: [n('nl'), ...bulb, n('nr')], tone: 'ink', weight: 3, group: n('flask') });
  // Liquid inside the glass: the bottom half of the bulb, or all of it and the neck up to the mark.
  const inside = (key: string, upto: number): string[] => {
    const ids: string[] = [];
    const k = 0.94;
    if (upto <= cy) {
      for (let i = 0; i <= 20; i++) {
        const a = Math.PI + (Math.PI * i) / 20;
        points[n(`${key}${i}`)] = [x0 + k * R * Math.cos(a), Math.max(cy + k * R * Math.sin(a), y0 + 0.24)];
        ids.push(n(`${key}${i}`));
      }
      return ids;
    }
    points[n(`${key}-tl`)] = [x0 - neck + 0.06, upto];
    ids.push(n(`${key}-tl`));
    for (let i = 0; i <= steps; i++) {
      const a = a0 + ((2 * Math.PI - 2 * (a0 - Math.PI / 2)) * i) / steps;
      points[n(`${key}${i}`)] = [x0 + k * R * Math.cos(a), Math.max(cy + k * R * Math.sin(a), y0 + 0.24)];
      ids.push(n(`${key}${i}`));
    }
    points[n(`${key}-tr`)] = [x0 + neck - 0.06, upto];
    ids.push(n(`${key}-tr`));
    return ids;
  };
  items.push(
    { kind: 'region', id: n('half'), points: inside('h', cy), tone: 'adj', shade: 0.15 },
    { kind: 'region', id: n('full'), points: inside('f', markY), tone: o.fullTone ?? 'adj', shade: 0.35 },
  );
  // The mark on the neck, with its label to the right.
  Object.assign(points, { [n('m0')]: [x0 - neck - 0.12, markY], [n('m1')]: [x0 + neck + 0.12, markY], [n('m-at')]: [x0 + neck + 0.25, markY] });
  items.push(
    { kind: 'line', id: n('mark-line'), from: n('m0'), to: n('m1'), tone: 'theta', weight: 3, group: n('mark') },
    { kind: 'label', id: n('mark-label'), at: n('m-at'), tex: '\\text{mark}', place: 'right', tone: 'theta', group: n('mark') },
  );
  // A stopper in the top of the neck.
  items.push({ kind: 'region', id: n('stopper'), points: rect(points, n('st'), x0 - neck - 0.08, top - 0.35, x0 + neck + 0.08, top + 0.25), tone: 'muted', shade: 0.85 });
  // The pipette: a narrow tip down into the neck, a bulb, and a stem with its own mark.
  const px = x0;
  const tip = top - 0.6;
  const bulbC: P = [px, top + 1.9];
  Object.assign(points, {
    [n('p0')]: [px, tip],
    [n('p1')]: [px, bulbC[1] - 0.75],
    [n('p2')]: [px, bulbC[1] + 0.75],
    [n('p3')]: [px, bulbC[1] + 2.0],
    [n('pm0')]: [px - 0.2, bulbC[1] + 1.4],
    [n('pm1')]: [px + 0.2, bulbC[1] + 1.4],
    [n('p-at')]: [px - 0.5, bulbC[1]],
  });
  const pb: string[] = [];
  for (let i = 0; i < 24; i++) {
    const a = (2 * Math.PI * i) / 24;
    points[n(`pb${i}`)] = [bulbC[0] + 0.36 * Math.cos(a), bulbC[1] + 0.75 * Math.sin(a)];
    pb.push(n(`pb${i}`));
  }
  items.push(
    { kind: 'line', id: n('pipe-tip'), from: n('p0'), to: n('p1'), tone: 'ink', weight: 4, group: n('pipette') },
    { kind: 'region', id: n('pipe-fill'), points: pb, tone: o.fullTone ?? 'adj', shade: 0.45, group: n('pipette') },
    { kind: 'curve', id: n('pipe-bulb'), points: pb, closed: true, tone: 'ink', weight: 3, group: n('pipette') },
    { kind: 'line', id: n('pipe-stem'), from: n('p2'), to: n('p3'), tone: 'ink', weight: 4, group: n('pipette') },
    { kind: 'line', id: n('pipe-mark'), from: n('pm0'), to: n('pm1'), tone: 'theta', weight: 3, group: n('pipette') },
    { kind: 'label', id: n('pipe-label'), at: n('p-at'), tex: o.pipette ?? '\\text{pipette}', place: 'left', group: n('pipette') },
  );
  if (o.label) {
    points[n('label-at')] = [x0, y0 - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below' });
  }
  // Room at the sides for the labels.
  Object.assign(points, { [n('fa')]: [x0 - R - 1.6, y0 - 0.2], [n('fb')]: [x0 + R + 1.0, bulbC[1] + 2.1] });
  return { points, items };
}

// ---------------------------------------------------------------------------- ions in a beaker

/**
 * A beaker `w` wide and `h` tall with its bottom left corner at `at`, filled to `level` with a
 * solution, and its `label` written under it. Each ion (or molecule) is a label placed inside,
 * `at` measured from the beaker's bottom left corner.
 *
 * Parts: `glass` (a group: its sides and lip), `liquid`, `label`, and each ion by its `id` (in
 * its `group`, if it has one).
 */
export function beaker(o: { name?: string; at?: P; w?: number; h?: number; level?: number; tone?: DiagramTone; shade?: number; label?: string; ions?: { id: string; at: P; tex: string; tone?: DiagramTone; group?: string }[] }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.w ?? 3;
  const H = o.h ?? 3.4;
  const level = o.level ?? H * 0.75;
  const points: Record<string, P> = {
    [n('g0')]: [x - 0.18, y + H + 0.14],
    [n('g1')]: [x, y + H],
    [n('g2')]: [x, y],
    [n('g3')]: [x + W, y],
    [n('g4')]: [x + W, y + H],
    [n('g5')]: [x + W + 0.18, y + H + 0.14],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: n('liquid'), points: rect(points, n('liq'), x + 0.05, y + 0.05, x + W - 0.05, y + level), tone: o.tone ?? 'adj', shade: o.shade ?? 0.2 },
  ];
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: n(`glass${i}`), from: n(`g${i}`), to: n(`g${i + 1}`), tone: 'ink', weight: 3, group: n('glass') });
  if (o.label) {
    points[n('label-at')] = [x + W / 2, y - 0.08];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below' });
  }
  for (const ion of o.ions ?? []) {
    const id = n(ion.id);
    points[`${id}-at`] = [x + ion.at[0], y + ion.at[1]];
    items.push({ kind: 'label', id, at: `${id}-at`, tex: ion.tex, place: 'center', tone: ion.tone ?? 'ink', ...(ion.group ? { group: n(ion.group) } : {}) });
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- atoms as balls

/** The colour and size of each element's ball: oxygen red, hydrogen pale, chlorine green… */
export const ATOM: Record<string, { tone: DiagramTone; r: number; shade?: number }> = {
  H: { tone: 'ink', r: 0.32, shade: 0.4 },
  O: { tone: 'bad', r: 0.45 },
  N: { tone: 'adj', r: 0.45 },
  Cl: { tone: 'good', r: 0.5 },
};

/** One atom: its element, where it is, and the group (its molecule) it appears with. */
export interface Ball {
  id: string;
  el: string;
  at: P;
  group?: string;
  /** A colour of its own, to pick out one atom (the hydrogen that moves). */
  tone?: DiagramTone;
}

/**
 * Atoms as balls with their symbols, coloured and sized by element (`ATOM`). Each ball is a
 * filled circle `id`, its edge `id-edge` and its symbol `id-sym`, all in the ball's `group` (its
 * molecule) when it has one. Balls are drawn in order, so a later ball overlaps an earlier one.
 */
export function balls(o: { name?: string; balls: Ball[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const b of o.balls) {
    const look = ATOM[b.el];
    if (!look) throw new Error(`balls: no colour for ${b.el}`);
    const id = n(b.id);
    const group = b.group ? { group: n(b.group) } : {};
    const tone = b.tone ?? look.tone;
    const ids = ring(points, `${id}-r`, b.at, look.r);
    points[`${id}-c`] = b.at;
    items.push(
      { kind: 'region', id, points: ids, tone, shade: b.tone ? 0.75 : (look.shade ?? 0.75), ...group },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: tone === 'ink' ? 'muted' : tone, weight: 2, ...group },
      { kind: 'label', id: `${id}-sym`, at: `${id}-c`, tex: `\\text{${b.el}}`, place: 'center', ...group },
    );
  }
  return { points, items };
}

/** A water molecule: the oxygen at `at` and its two hydrogens below it on either side. */
export function water(id: string, at: P, group: string = id): Ball[] {
  return [
    { id: `${id}-h1`, el: 'H', at: [at[0] - 0.56, at[1] - 0.42], group },
    { id: `${id}-h2`, el: 'H', at: [at[0] + 0.56, at[1] - 0.42], group },
    { id: `${id}-o`, el: 'O', at, group },
  ];
}

// ---------------------------------------------------------------------------- the pH scale

/** Acidic below 7, neutral at 7 and basic above 7. */
const NATURE: { id: string; lo: number; hi: number; tone: DiagramTone }[] = [
  { id: 'acidic', lo: 0, hi: 6, tone: 'bad' },
  { id: 'neutral', lo: 7, hi: 7, tone: 'good' },
  { id: 'basic', lo: 8, hi: 14, tone: 'adj' },
];

/** Where a pH value sits along the strip: the middle of its cell. */
export const phX = (v: number) => v + 0.5;

export interface PhMark {
  id: string;
  value: number;
  tex: string;
  /** How far up its label sits, in steps (0 just above the strip), so close marks do not collide. */
  level?: number;
  tone?: DiagramTone;
  /** An arrow pointing down at the strip, instead of a plain line. */
  arrow?: boolean;
}

export interface PhHop {
  id: string;
  from: number;
  to: number;
  tex: string;
  tone?: DiagramTone;
  /** A taller arch, so its label clears the labels of the hops beside it. */
  high?: boolean;
}

/**
 * The pH scale as fifteen cells, one for each pH from 0 to 14, with the numbers under them,
 * coloured in bands: acidic (red), neutral (green) and basic (blue). With `names`, each band's
 * name is written under its numbers; with `poh`, the pOH (14 minus the pH) is written under each
 * pH instead, in a second row, with "pH" and "pOH" at the left of the rows.
 *
 * A mark is a solution or a value on the scale: a line (or an arrow) up from the middle of its pH
 * with its label at the top, `level` steps up. A hop is an arc above the strip from one pH to
 * another, labelled (such as "×10").
 *
 * Parts: `scale` (a group: the cells' outlines and the numbers), each band by its id (`acidic`,
 * `neutral` and `basic`: a group of its cells and its name), `poh` (a group: the second row of
 * numbers and its title), each mark by its `id` (a group: its line and its label) and each hop by
 * its `id` (a group: the arc and its arrowhead).
 */
export function phStrip(o: { name?: string; names?: boolean; poh?: boolean; height?: number; marks?: PhMark[]; hops?: PhHop[]; shade?: number }): Part {
  const n = namer(o.name);
  const H = o.height ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const b of NATURE) {
    for (let k = b.lo; k <= b.hi; k++) {
      items.push({ kind: 'region', id: n(`cell${k}`), points: rect(points, n(`c${k}`), k + 0.03, 0.03, k + 0.97, H - 0.03), tone: b.tone, shade: o.shade ?? 0.55, group: n(b.id) });
    }
    if (o.names) {
      points[n(`${b.id}-at`)] = [(b.lo + b.hi + 1) / 2, -0.62];
      items.push({ kind: 'label', id: n(`${b.id}-name`), at: n(`${b.id}-at`), tex: `\\text{${b.id}}`, place: 'below', tone: b.tone, group: n(b.id) });
    }
  }
  // The outline: along the top and bottom, and a line between each cell and the next.
  Object.assign(points, { [n('tl')]: [0, H], [n('tr')]: [15, H], [n('bl')]: [0, 0], [n('br')]: [15, 0] });
  items.push(
    { kind: 'line', id: n('top'), from: n('tl'), to: n('tr'), tone: 'muted', weight: 2, group: n('scale') },
    { kind: 'line', id: n('bottom'), from: n('bl'), to: n('br'), tone: 'muted', weight: 2, group: n('scale') },
  );
  for (let k = 0; k <= 15; k++) {
    Object.assign(points, { [n(`d${k}a`)]: [k, 0], [n(`d${k}b`)]: [k, H] });
    items.push({ kind: 'line', id: n(`div${k}`), from: n(`d${k}a`), to: n(`d${k}b`), tone: 'muted', weight: 2, group: n('scale') });
  }
  for (let k = 0; k <= 14; k++) {
    points[n(`num${k}-at`)] = [phX(k), 0];
    items.push({ kind: 'label', id: n(`num${k}`), at: n(`num${k}-at`), tex: String(k), place: 'below', tone: 'ink', group: n('scale') });
  }
  if (o.poh) {
    points[n('ph-title-at')] = [-0.15, -0.42];
    items.push({ kind: 'label', id: n('ph-title'), at: n('ph-title-at'), tex: '\\text{pH}', place: 'left', tone: 'ink', group: n('scale') });
    for (let k = 0; k <= 14; k++) {
      points[n(`poh${k}-at`)] = [phX(k), -0.72];
      items.push({ kind: 'label', id: n(`poh${k}`), at: n(`poh${k}-at`), tex: String(14 - k), place: 'below', tone: 'hyp', group: n('poh') });
    }
    points[n('poh-title-at')] = [-0.15, -1.14];
    items.push({ kind: 'label', id: n('poh-title'), at: n('poh-title-at'), tex: '\\text{pOH}', place: 'left', tone: 'hyp', group: n('poh') });
    Object.assign(points, { [n('room-a')]: [-1.6, -1.6], [n('room-b')]: [15.2, H] });
  }
  for (const m of o.marks ?? []) {
    const id = n(m.id);
    const top = H + 0.55 + 0.85 * (m.level ?? 0);
    Object.assign(points, { [`${id}-a`]: [phX(m.value), H + 0.08], [`${id}-b`]: [phX(m.value), top] });
    const tone = m.tone ?? 'ink';
    items.push(
      m.arrow
        ? { kind: 'line', id: `${id}-line`, from: `${id}-b`, to: `${id}-a`, tone, weight: 3, arrow: true, group: id }
        : { kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone, weight: 2.5, group: id },
      { kind: 'label', id: `${id}-label`, at: `${id}-b`, tex: m.tex, place: 'above', tone, group: id },
    );
  }
  for (const h of o.hops ?? []) {
    const id = n(h.id);
    const [a, b] = [phX(h.from), phX(h.to)];
    const arc: string[] = [];
    // A low arch from one cell to the other; the last bit is a straight arrow down into the cell.
    for (let i = 0; i <= 12; i++) {
      const t = 0.08 + (0.8 * i) / 12;
      points[`${id}-${i}`] = [a + (b - a) * t, H + 0.15 + (h.high ? 1.35 : 0.75) * Math.sin(Math.PI * t)];
      arc.push(`${id}-${i}`);
    }
    points[`${id}-end`] = [a + (b - a) * 0.95, H + 0.12];
    const tone = h.tone ?? 'theta';
    // The label sits above the arch: on the left of travel going right, on the right going left.
    items.push(
      { kind: 'curve', id: `${id}-arc`, points: arc, tone, weight: 3, label: h.tex, labelSide: b > a ? 'left' : 'right', labelAt: 0.55, group: id },
      { kind: 'line', id: `${id}-head`, from: arc[arc.length - 1], to: `${id}-end`, tone, weight: 3, arrow: true, group: id },
    );
  }
  return { points, items };
}

/**
 * Two number lines, one above the other and the same length (14 units). The top one is an
 * ordinary scale of hydronium ion concentration, from 0 to 0.10 mol/L: a solution at
 * 1.0 × 10⁻¹ mol/L sits at its right end, one at 1.0 × 10⁻² near the left, and all the rest
 * (10⁻³ to 10⁻¹⁴) are squashed against zero. The bottom one is the pH scale from 0 to 14, where
 * solutions at 10⁻¹, 10⁻², 10⁻³ and 10⁻⁷ mol/L (pH 1, 2, 3 and 7) are spread out.
 *
 * Parts: `lin` (a group: the top line, its ticks, numbers and title), `lin-1`, `lin-2` and
 * `lin-rest` (dots with their labels), `log` (a group: the pH line, its ticks, numbers and title),
 * and `log-1`, `log-2`, `log-3` and `log-7` (dots with their labels).
 */
export function twoScales(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const L = 14;
  const yTop = 2.9;
  // The ordinary scale: 0 to 0.10 mol/L along 14 units.
  Object.assign(points, { [n('la')]: [0, yTop], [n('lb')]: [L + 0.5, yTop] });
  items.push({ kind: 'line', id: n('lin-axis'), from: n('la'), to: n('lb'), weight: 3, arrow: true, group: n('lin') });
  for (const [k, v] of [0, 0.05, 0.1].entries()) {
    const x = (v / 0.1) * L;
    Object.assign(points, { [n(`lt${k}a`)]: [x, yTop - 0.15], [n(`lt${k}b`)]: [x, yTop + 0.15] });
    items.push(
      { kind: 'line', id: n(`lin-tick${k}`), from: n(`lt${k}a`), to: n(`lt${k}b`), weight: 2.5, group: n('lin') },
      { kind: 'label', id: n(`lin-num${k}`), at: n(`lt${k}a`), tex: ['0', '0.05', '0.10'][k], place: 'below', tone: 'muted', group: n('lin') },
    );
  }
  // The title sits above the line, between the labels near its ends.
  points[n('lin-title-at')] = [L / 2, yTop + 0.3];
  items.push({ kind: 'label', id: n('lin-title'), at: n('lin-title-at'), tex: '[\\ce{H3O+}]\\ (\\text{mol/L}) \\text{ on an ordinary scale}', place: 'above', tone: 'muted', group: n('lin') });
  const dot = (id: string, x: number, y: number, tex: string, lift: number, tone: DiagramTone, group: string, place: Place = 'above') => {
    Object.assign(points, { [n(`${id}-p`)]: [x, y], [n(`${id}-t`)]: [x, y + lift] });
    items.push({ kind: 'label', id: n(`${id}-dot`), at: n(`${id}-p`), tex: '', dot: true, tone, place: 'center', group: n(group) });
    if (lift > 0.5) items.push({ kind: 'line', id: n(`${id}-lead`), from: n(`${id}-p`), to: n(`${id}-t`), tone, weight: 2, group: n(group) });
    items.push({ kind: 'label', id: n(`${id}-label`), at: n(`${id}-t`), tex, place, tone, group: n(group) });
  };
  dot('l1', L, yTop, '10^{-1}', 0.3, 'bad', 'lin-1');
  dot('l2', 0.1 * L, yTop, '10^{-2}', 0.3, 'opp', 'lin-2');
  // 10⁻³ and smaller are 0.14 units or less from zero: drawn as one dot.
  dot('lr', 0.012 * L, yTop, '10^{-3} \\text{ to } 10^{-14} \\text{ all here}', 1.2, 'theta', 'lin-rest', 'above right');
  // The pH scale: 0 to 14.
  Object.assign(points, { [n('pa')]: [0, 0], [n('pb')]: [L + 0.5, 0] });
  items.push({ kind: 'line', id: n('log-axis'), from: n('pa'), to: n('pb'), weight: 3, arrow: true, group: n('log') });
  for (let k = 0; k <= L; k++) {
    Object.assign(points, { [n(`pt${k}a`)]: [k, -0.15], [n(`pt${k}b`)]: [k, 0.15] });
    items.push(
      { kind: 'line', id: n(`log-tick${k}`), from: n(`pt${k}a`), to: n(`pt${k}b`), weight: 2.5, group: n('log') },
      { kind: 'label', id: n(`log-num${k}`), at: n(`pt${k}a`), tex: String(k), place: 'below', tone: 'muted', group: n('log') },
    );
  }
  points[n('log-title-at')] = [L / 2, -0.75];
  items.push({ kind: 'label', id: n('log-title'), at: n('log-title-at'), tex: '\\text{pH}', place: 'below', tone: 'muted', group: n('log') });
  dot('p1', 1, 0, '10^{-1}', 0.3, 'bad', 'log-1');
  // Raised on a leader line, so its label clears its neighbours'.
  dot('p2', 2, 0, '10^{-2}', 0.9, 'opp', 'log-2');
  dot('p3', 3, 0, '10^{-3}', 0.3, 'theta', 'log-3');
  dot('p7', 7, 0, '10^{-7}', 0.3, 'theta', 'log-7');
  Object.assign(points, { [n('fa')]: [-0.6, -1.3], [n('fb')]: [L + 0.8, yTop + 1.8] });
  return { points, items };
}

// ---------------------------------------------------------------------------- an acid in water

/**
 * An acid's particles in water, in a container `size` across with `at` its bottom left corner:
 * hydronium ions, the acid's anions, and acid molecules still whole (two balls joined), placed at
 * random from `seed`. A strong acid has no whole molecules; a weak acid has many, and only one or
 * two ions of each kind. `label` is written under the container.
 *
 * Parts: `box` (the container's sides), `h3o` (the hydronium ions), `anion` (the anions), `acid`
 * (the whole molecules) and `label`.
 */
export function acidBox(o: { name: string; at?: P; size?: number; ions: number; molecules: number; seed?: number; label?: string }): Part {
  const kinds: ParticleKind[] = [
    ...(o.molecules ? [{ id: 'acid', tone: 'muted' as DiagramTone, count: o.molecules, atoms: 2 as const, second: 'good' as DiagramTone }] : []),
    { id: 'h3o', tone: 'bad', count: o.ions },
    { id: 'anion', tone: 'good', count: o.ions },
  ];
  const size = o.size ?? 5;
  const [x, y] = o.at ?? [0, 0];
  const part = particles({ name: o.name, at: [x, y], state: 'gas', kinds, size, seed: o.seed ?? 3 });
  if (o.label) {
    part.points[`${o.name}-label-at`] = [x + size / 2, y - 0.1];
    part.items.push({ kind: 'label', id: `${o.name}-label`, at: `${o.name}-label-at`, tex: o.label, place: 'below' });
  }
  return part;
}

/**
 * A key to the particles of a drawing: a column of entries from `at` downwards, each a ball (or,
 * with two tones, two joined balls, for a molecule) and its label to the right.
 *
 * Parts: each entry by its `id` (a group: its balls and its label).
 */
export function legend(o: { name?: string; at?: P; r?: number; gap?: number; entries: { id: string; tones: DiagramTone[]; tex: string }[] }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const r = o.r ?? 0.26;
  const gap = o.gap ?? 1.0;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.entries.forEach((e, i) => {
    const id = n(e.id);
    const cy = y - i * gap;
    e.tones.forEach((tone, k) => {
      const c: P = [x + r + k * r * 1.9, cy];
      const ids = ring(points, `${id}-b${k}-`, c, r, 16);
      items.push(
        { kind: 'region', id: `${id}-ball${k}`, points: ids, tone, shade: 0.75, group: id },
        { kind: 'curve', id: `${id}-edge${k}`, points: ids, closed: true, tone, weight: 2, group: id },
      );
    });
    points[`${id}-t`] = [x + 2 * r + (e.tones.length - 1) * r * 1.9 + 0.2, cy];
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-t`, tex: e.tex, place: 'right', group: id });
  });
  return { points, items };
}
