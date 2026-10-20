/**
 * Figures for the positive and negative numbers videos (Grade 6, unit 1): two-colour counters
 * whose zero pairs can be ringed and taken away, and a vertical number line, drawn plain (with
 * the water of a lake below zero) or as a thermometer with a coloured column. Built only from
 * standard diagram parts (lines, curves, regions and labels), so each goes into a diagram with
 * `figure` like the figures in `src/video/`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle. */
function circle(points: Record<string, P>, key: string, c: P, r: number, steps = 24): string[] {
  const names: string[] = [];
  for (let i = 0; i < steps; i++) {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    names.push(`${key}${i}`);
  }
  return names;
}

/** Point names round a rectangle with rounded corners, from (x0, y0) to (x1, y1). */
function roundRect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number, r: number): string[] {
  const names: string[] = [];
  const corners: [number, number, number][] = [
    [x1 - r, y1 - r, 0],
    [x0 + r, y1 - r, Math.PI / 2],
    [x0 + r, y0 + r, Math.PI],
    [x1 - r, y0 + r, (3 * Math.PI) / 2],
  ];
  corners.forEach(([cx, cy, from], k) => {
    for (let i = 0; i <= 6; i++) {
      const a = from + (Math.PI / 2) * (i / 6);
      points[`${key}${k}-${i}`] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      names.push(`${key}${k}-${i}`);
    }
  });
  return names;
}

/** Units between counters in a row, and between rows. */
const GAP = 1.15;
const ROW = 1.3;

/**
 * Two-colour counters. A positive counter (+1) is a filled yellow disc with a plus sign; a
 * negative counter (−1) is an open red circle with a minus sign. Each set is a run of counters in
 * one row (row 0 on top, row 1 under it), starting at column `col` (columns are `GAP` apart and
 * may be fractional, to leave a space between two sets). A zero pair is ringed in green, round the
 * counters in rows 0 and 1 of its column, with a 0 under the ring.
 *
 * Parts: each counter `<set id><k>` (a group: its disc, edge and sign), each ring by its id (a
 * group: the ring and its 0), and each label by its id. `ids` lists a set's counters for a script.
 */
export function counters(o: {
  name?: string;
  sets: { id: string; sign: '+' | '-'; count: number; row?: number; col?: number }[];
  pairs?: { id: string; col: number; zero?: boolean }[];
  labels?: { id: string; col: number; row: number; tex: string; place?: Place; tone?: DiagramTone }[];
  /** The radius of a counter (0.42 units). */
  r?: number;
  at?: P;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const r = o.r ?? 0.42;
  const X = (col: number) => x0 + col * GAP;
  const Y = (row: number) => y0 - row * ROW;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const set of o.sets) {
    for (let k = 0; k < set.count; k++) {
      const id = n(`${set.id}${k}`);
      const c: P = [X((set.col ?? 0) + k), Y(set.row ?? 0)];
      const pos = set.sign === '+';
      const tone: DiagramTone = pos ? 'theta' : 'bad';
      items.push({ kind: 'region', id: `${id}-disc`, points: circle(points, `${id}-c`, c, r), tone, shade: pos ? 0.55 : 0.1, group: id });
      items.push({ kind: 'curve', id: `${id}-edge`, points: circle(points, `${id}-e`, c, r), closed: true, tone, weight: 3, group: id });
      points[`${id}-at`] = c;
      items.push({ kind: 'label', id: `${id}-sign`, at: `${id}-at`, tex: pos ? '\\Large +' : '\\Large -', tone: pos ? 'ink' : 'bad', place: 'center', group: id });
    }
  }
  for (const p of o.pairs ?? []) {
    const id = n(p.id);
    const cx = X(p.col);
    items.push({ kind: 'curve', id: `${id}-ring`, points: roundRect(points, `${id}-r`, cx - 0.56, Y(1) - 0.56, cx + 0.56, Y(0) + 0.56, 0.3), closed: true, tone: 'good', weight: 3, group: id });
    if (p.zero !== false) {
      points[`${id}-z`] = [cx, Y(1) - 0.62];
      items.push({ kind: 'label', id: `${id}-zero`, at: `${id}-z`, tex: '0', tone: 'good', place: 'below', group: id });
    }
  }
  for (const l of o.labels ?? []) {
    const id = n(l.id);
    points[`${id}-at`] = [X(l.col), Y(l.row)];
    items.push({ kind: 'label', id, at: `${id}-at`, tex: l.tex, tone: l.tone ?? 'muted', place: l.place ?? 'below' });
  }
  return { points, items };
}

/** The ids of `count` counters of a set in the figure `fig`, from counter `from` on, for `show` and `hide`. */
export const ids = (fig: string, set: string, count: number, from = 0): string[] => Array.from({ length: count }, (_, k) => `${fig}.${set}${from + k}`);

/**
 * A vertical number line from `min` (at the bottom) to `max`, `unit` diagram units for each 1,
 * with a mark every `step` and a number left of every `every`-th mark (0 is always numbered). With
 * `tube` it is a thermometer: a glass tube and bulb, with the marks down its left side, and
 * `fills` are its coloured column up to a value. With `water`, everything below zero is shaded as
 * the water of a lake, with its surface at 0.
 *
 * Parts: `axis` (a group: the line or tube, its marks and numbers), each fill by its id (a group:
 * the bulb and the column), `water` (a group: the shading, the surface line and its label), each
 * point by its id (a group: a dot on the line and a label to its right, or left), and each move by
 * its id (a group: an arrow beside the line from one value to another, and a label on its right).
 */
export function vertical(o: {
  name?: string;
  min: number;
  max: number;
  step?: number;
  every?: number;
  unit?: number;
  tube?: boolean;
  fills?: { id: string; value: number; tone?: DiagramTone }[];
  water?: { label?: string; width?: number };
  points?: { id: string; value: number; tex: string; tone?: DiagramTone; place?: 'left' | 'right' | 'above right'; dx?: number }[];
  moves?: { id: string; from: number; to: number; label?: string; tone?: DiagramTone; x?: number }[];
  /** Room to the right of the line for labels, in units (an invisible corner of the drawing). */
  room?: number;
  at?: P;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const unit = o.unit ?? 0.3;
  const step = o.step ?? 1;
  const every = o.every ?? 1;
  const Y = (v: number) => y0 + (v - o.min) * unit;
  const tw = o.tube ? 0.32 : 0;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The water first, so the line and labels are drawn over it.
  if (o.water) {
    const W = o.water.width ?? 4.5;
    Object.assign(points, { [n('wA')]: [x0, Y(0)], [n('wB')]: [x0 + W, Y(0)], [n('wC')]: [x0 + W, Y(o.min) - 0.35], [n('wD')]: [x0, Y(o.min) - 0.35] });
    items.push({ kind: 'region', id: n('water-fill'), points: ['wA', 'wB', 'wC', 'wD'].map(n), tone: 'adj', shade: 0.16, group: n('water') });
    items.push({ kind: 'line', id: n('surface'), from: n('wA'), to: n('wB'), tone: 'adj', weight: 3, group: n('water') });
    if (o.water.label) {
      points[n('wlab')] = [x0 + W - 0.1, Y(o.min) - 0.25];
      items.push({ kind: 'label', id: n('water-label'), at: n('wlab'), tex: o.water.label, tone: 'adj', place: 'above left', group: n('water') });
    }
  }
  const bulbR = 0.62;
  const bulbC: P = [x0, Y(o.min) - 0.75];
  for (const f of o.fills ?? []) {
    const id = n(f.id);
    const tone = f.tone ?? 'bad';
    items.push({ kind: 'region', id: `${id}-bulb`, points: circle(points, `${id}-b`, bulbC, bulbR - 0.14), tone, shade: 0.85, group: id });
    Object.assign(points, { [`${id}-A`]: [x0 - tw + 0.12, bulbC[1]], [`${id}-B`]: [x0 + tw - 0.12, bulbC[1]], [`${id}-C`]: [x0 + tw - 0.12, Y(f.value)], [`${id}-D`]: [x0 - tw + 0.12, Y(f.value)] });
    items.push({ kind: 'region', id: `${id}-col`, points: ['A', 'B', 'C', 'D'].map((c) => `${id}-${c}`), tone, shade: 0.85, group: id });
  }
  const top = Y(o.max) + 0.35;
  if (o.tube) {
    // The tube: down the left side, round the bulb, up the right side and over the rounded top.
    const names: string[] = [];
    const join = Math.asin(tw / bulbR);
    const add = (key: string, p: P) => {
      points[n(key)] = p;
      names.push(n(key));
    };
    add('tube-tl', [x0 - tw, top]);
    const start = Math.PI / 2 + join;
    const sweep = 2 * Math.PI - 2 * join;
    for (let i = 0; i <= 30; i++) {
      const a = start + (sweep * i) / 30;
      add(`tube-b${i}`, [bulbC[0] + bulbR * Math.cos(a), bulbC[1] + bulbR * Math.sin(a)]);
    }
    add('tube-tr', [x0 + tw, top]);
    for (let i = 1; i < 8; i++) {
      const a = (Math.PI * i) / 8;
      add(`tube-c${i}`, [x0 + tw * Math.cos(a), top + tw * Math.sin(a)]);
    }
    items.push({ kind: 'curve', id: n('tube'), points: names, closed: true, tone: 'ink', weight: 3, group: n('axis') });
  } else {
    Object.assign(points, { [n('lo')]: [x0, Y(o.min) - 0.35], [n('hi')]: [x0, top] });
    items.push({ kind: 'line', id: n('line'), from: n('lo'), to: n('hi'), weight: 3, group: n('axis') });
  }
  const count = Math.round((o.max - o.min) / step);
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * step;
    const big = (every > 0 && i % every === 0) || v === 0;
    const len = o.tube ? (big ? 0.3 : 0.17) : big ? 0.22 : 0.13;
    const a: P = o.tube ? [x0 - tw, Y(v)] : [x0 - len, Y(v)];
    const b: P = o.tube ? [x0 - tw - len, Y(v)] : [x0 + len, Y(v)];
    Object.assign(points, { [n(`t${i}a`)]: a, [n(`t${i}b`)]: b });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: v === 0 ? 3.5 : 2.5, group: n('axis') });
    if (big) {
      points[n(`n${i}`)] = [x0 - tw - 0.38, Y(v)];
      items.push({ kind: 'label', id: n(`num${i}`), at: n(`n${i}`), tex: String(v), tone: v === 0 ? 'ink' : 'muted', place: 'left', group: n('axis') });
    }
  }
  for (const p of o.points ?? []) {
    const id = n(p.id);
    const left = p.place === 'left';
    const dot = x0 + (o.tube ? tw + 0.25 : 0);
    const x = left ? x0 - tw - 0.4 : dot + (o.tube ? 0.5 : 0.55);
    points[`${id}-dot`] = [dot, Y(p.value)];
    points[`${id}-lab`] = [x + (p.dx ?? 0), Y(p.value)];
    items.push({ kind: 'label', id: `${id}-d`, at: `${id}-dot`, tex: '', tone: p.tone ?? 'theta', place: 'center', dot: true, group: id });
    items.push({ kind: 'label', id: `${id}-t`, at: `${id}-lab`, tex: p.tex, tone: p.tone ?? 'theta', place: p.place ?? 'right', group: id });
  }
  for (const m of o.moves ?? []) {
    const id = n(m.id);
    const x = x0 + (m.x ?? 1.6);
    Object.assign(points, { [`${id}-a`]: [x, Y(m.from)], [`${id}-b`]: [x, Y(m.to)] });
    items.push({ kind: 'line', id: `${id}-arrow`, from: `${id}-a`, to: `${id}-b`, tone: m.tone ?? 'opp', weight: 4, arrow: true, group: id });
    if (m.label) {
      points[`${id}-lab`] = [x + 0.3, (Y(m.from) + Y(m.to)) / 2];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-lab`, tex: m.label, tone: m.tone ?? 'opp', place: 'right', group: id });
    }
  }
  if (o.room) points[n('room')] = [x0 + o.room, Y(0)];
  return { points, items };
}

/** A label (TeX) at a point, for notes beside a number line. Part: its `id`. */
export function note(o: { id: string; at: P; tex: string; tone?: DiagramTone; place?: Place; group?: string }): Part {
  return {
    points: { [`${o.id}-at`]: o.at },
    items: [{ kind: 'label', id: o.id, at: `${o.id}-at`, tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: o.group } : {}) }],
  };
}

/** A dot (hollow when `open`) at a point, with an optional label (TeX) above it. Part: its `id`. */
export function dot(o: { id: string; at: P; tex?: string; tone?: DiagramTone; open?: boolean; place?: Place; group?: string }): Part {
  return {
    points: { [`${o.id}-at`]: o.at },
    items: [{ kind: 'label', id: o.id, at: `${o.id}-at`, tex: o.tex ?? '', tone: o.tone ?? 'theta', place: o.place ?? 'above', dot: true, ...(o.open ? { open: true } : {}), ...(o.group ? { group: o.group } : {}) }],
  };
}

/**
 * Where `numberLine` puts a value (its x), for drawing beside it: a line from `min` to `max`,
 * `length` long (12 by default), starting at `x0`.
 */
export const xAt = (v: number, min: number, max: number, length = 12, x0 = 0) => x0 + ((v - min) / (max - min)) * length;
