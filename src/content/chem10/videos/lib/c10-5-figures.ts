/**
 * Figures for the moles, acids and bases videos (Grade 10 Chemistry, unit 5), built only from
 * standard diagram parts (lines, curves, shaded regions and labels), so each goes into a diagram
 * with `figure` (src/video/solids.ts):
 *
 * - `balls`: atoms drawn as coloured balls with their symbols, for molecules, formula units and the
 *   particles of a reaction (`water`, `pair` and `ATOM` help to place them).
 * - `flow`: quantities in boxes in a row, joined by arrows that say what to do to get from one to
 *   the next (divide by the molar mass, multiply by Avogadro's number).
 * - `phStrip`: the pH scale as fifteen cells from 0 to 14, coloured as acidic, neutral and basic or
 *   with the colours of universal indicator, with solutions marked on it and tenfold hops above it.
 * - `indicatorBars`: the colours of indicators across the pH scale, a bar for each, with a window
 *   where the pH must lie.
 * - `papers`: indicator papers before and after they are dipped in a solution.
 * - `beaker`: a beaker of solution with the ions in it.
 * - `chargeBars`: the ions of a salt as blocks as long as their charges, positive ions above and
 *   negative ions below, so a balanced formula has two rows of the same length.
 * - `gasTest`: a test tube of acid and a metal carbonate, with a delivery tube bubbling the gas
 *   into limewater.
 * - `tag` and `arrow`: a label, or an arrow, at given points.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

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

// ---------------------------------------------------------------------------- atoms as balls

/** The colour and size of each element's ball: oxygen red, hydrogen pale, chlorine green… */
export const ATOM: Record<string, { tone: DiagramTone; r: number; shade?: number }> = {
  H: { tone: 'ink', r: 0.32, shade: 0.4 },
  O: { tone: 'bad', r: 0.45 },
  C: { tone: 'muted', r: 0.45, shade: 0.9 },
  N: { tone: 'adj', r: 0.45 },
  S: { tone: 'theta', r: 0.5 },
  Cl: { tone: 'good', r: 0.5 },
  Na: { tone: 'brand', r: 0.48 },
  Ca: { tone: 'opp', r: 0.55 },
  Fe: { tone: 'opp', r: 0.42 },
  Mg: { tone: 'hyp', r: 0.48 },
};

/** One atom: its element, where it is, and the group (its molecule) it appears with. */
export interface Ball {
  id: string;
  el: string;
  at: P;
  group?: string;
  /** Leave off the symbol (for a small or crowded picture). */
  bare?: boolean;
}

/**
 * Atoms as balls with their symbols, coloured and sized by element (`ATOM`). Each ball is a
 * filled circle `id`, its edge `id-edge` and its symbol `id-sym`, all in the ball's `group` (its
 * molecule) when it has one. Balls are drawn in order, so a later ball overlaps an earlier one.
 */
export function balls(o: { name?: string; balls: Ball[]; scale?: number }): Part {
  const n = namer(o.name);
  const k = o.scale ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const b of o.balls) {
    const look = ATOM[b.el];
    if (!look) throw new Error(`balls: no colour for ${b.el}`);
    const id = n(b.id);
    const group = b.group ? { group: n(b.group) } : {};
    const ids = ring(points, `${id}-r`, b.at, look.r * k);
    points[`${id}-c`] = b.at;
    items.push(
      { kind: 'region', id, points: ids, tone: look.tone, shade: look.shade ?? 0.75, ...group },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: look.tone === 'ink' ? 'muted' : look.tone, weight: 2, ...group },
    );
    if (!b.bare) items.push({ kind: 'label', id: `${id}-sym`, at: `${id}-c`, tex: `\\text{${b.el}}`, place: 'center', ...group });
  }
  return { points, items };
}

/** A water molecule: the oxygen at `at` and its two hydrogens below it on either side. */
export function water(id: string, at: P, s = 1, group: string = id): Ball[] {
  return [
    { id: `${id}-h1`, el: 'H', at: [at[0] - 0.56 * s, at[1] - 0.42 * s], group },
    { id: `${id}-h2`, el: 'H', at: [at[0] + 0.56 * s, at[1] - 0.42 * s], group },
    { id: `${id}-o`, el: 'O', at, group },
  ];
}

/** A molecule of two atoms side by side, centred on `at` (O₂, H₂, HCl…), or turned to stand upright. */
export function pair(id: string, a: string, b: string, at: P, o: { upright?: boolean; group?: string; gap?: number } = {}): Ball[] {
  const d = (o.gap ?? 0.72) / 2;
  const off: P = o.upright ? [0, d] : [d, 0];
  return [
    { id: `${id}-a`, el: a, at: [at[0] - off[0], at[1] - off[1]], group: o.group ?? id },
    { id: `${id}-b`, el: b, at: [at[0] + off[0], at[1] + off[1]], group: o.group ?? id },
  ];
}

// ---------------------------------------------------------------------------- flow of quantities

export interface FlowNode {
  id: string;
  tex: string;
  tone?: DiagramTone;
  /** Written under the box, such as the value worked out ("0.50\\ \\text{mol}"). */
  value?: string;
}

export interface FlowArrow {
  id: string;
  from: string;
  to: string;
  tex: string;
  tone?: DiagramTone;
}

/**
 * Quantities in boxes in a row, `gap` apart, joined by arrows that say how to get from one to the
 * next. An arrow to the right is labelled above it; an arrow back to the left is labelled below
 * it. When two boxes are joined both ways, the arrow to the right runs above the middle and the
 * one back runs below it. A node's `value` is written under its box.
 *
 * Parts: each node by its `id` (a group: its box, its shading and its label), its value
 * `<id>-value`, and each arrow by its `id`.
 */
export function flow(o: { name?: string; at?: P; nodes: FlowNode[]; arrows: FlowArrow[]; width?: number; height?: number; gap?: number }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 3;
  const H = o.height ?? 1.4;
  const G = o.gap ?? 3.4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const index = new Map(o.nodes.map((nd, i) => [nd.id, i]));
  const left = (i: number) => x0 + i * (W + G);
  o.nodes.forEach((nd, i) => {
    const id = n(nd.id);
    const x = left(i);
    const tone = nd.tone ?? 'brand';
    const c = rect(points, `${id}-box`, x, y0 - H / 2, x + W, y0 + H / 2);
    points[`${id}-c`] = [x + W / 2, y0];
    items.push({ kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.16, group: id });
    c.forEach((p, j) => items.push({ kind: 'line', id: `${id}-side${j}`, from: p, to: c[(j + 1) % 4], tone, weight: 2.5, group: id }));
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: nd.tex, place: 'center', group: id });
    if (nd.value) {
      points[`${id}-v`] = [x + W / 2, y0 - H / 2 - 0.05];
      items.push({ kind: 'label', id: `${id}-value`, at: `${id}-v`, tex: nd.value, place: 'below', tone: 'good' });
    }
  });
  for (const a of o.arrows) {
    const i = index.get(a.from);
    const j = index.get(a.to);
    if (i === undefined || j === undefined) throw new Error(`flow: no node for arrow ${a.id}`);
    const both = o.arrows.some((b) => b.from === a.to && b.to === a.from);
    const forward = j > i;
    const dy = both ? (forward ? 0.28 : -0.28) : 0;
    const id = n(a.id);
    points[`${id}-s`] = [forward ? left(i) + W + 0.15 : left(i) - 0.15, y0 + dy];
    points[`${id}-e`] = [forward ? left(j) - 0.15 : left(j) + W + 0.15, y0 + dy];
    items.push({ kind: 'line', id, from: `${id}-s`, to: `${id}-e`, arrow: true, tone: a.tone ?? 'theta', weight: 3, label: a.tex, labelSide: 'left' });
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- the pH scale

/** The colours of universal indicator on the course's chart, with the video colour for each. */
export const UNIVERSAL: { id: string; lo: number; hi: number; tone: DiagramTone }[] = [
  { id: 'red', lo: 0, hi: 2, tone: 'bad' },
  { id: 'orange', lo: 3, hi: 4, tone: 'opp' },
  { id: 'yellow', lo: 5, hi: 6, tone: 'theta' },
  { id: 'green', lo: 7, hi: 7, tone: 'good' },
  { id: 'blue', lo: 8, hi: 10, tone: 'adj' },
  { id: 'purple', lo: 11, hi: 14, tone: 'brand' },
];

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
 * The pH scale as fifteen cells, one for each pH from 0 to 14, with the numbers under them. The
 * cells are coloured in bands: acidic (red), neutral (green) and basic (blue) with `colours:
 * 'nature'`, or red, orange, yellow, green, blue and purple, as universal indicator turns, with
 * `colours: 'universal'`. With `names`, each band's name is written under its numbers.
 *
 * A mark is a solution or a value on the scale: a line (or an arrow) up from the middle of its pH
 * with its label at the top, `level` steps up. A hop is an arc above the strip from one pH to
 * another, labelled (such as "×10").
 *
 * Parts: `scale` (a group: the cells' outlines and the numbers), each band by its id (`acidic`,
 * `neutral` and `basic`, or `red`, `orange`… : a group of its cells and its name), each mark by
 * its `id` (a group: its line and its label) and each hop by its `id` (a group: the arc and its
 * arrowhead).
 */
export function phStrip(o: { name?: string; colours?: 'nature' | 'universal'; names?: boolean; height?: number; marks?: PhMark[]; hops?: PhHop[]; shade?: number }): Part {
  const n = namer(o.name);
  const H = o.height ?? 1;
  const bands = o.colours === 'universal' ? UNIVERSAL : NATURE;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const b of bands) {
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

// ---------------------------------------------------------------------------- indicators

export interface IndicatorBar {
  id: string;
  /** The indicator's name, written above its bar. */
  tex: string;
  lo: number;
  hi: number;
  /** Colours below, inside and above the colour-change range, and how strongly each is shaded. */
  tones: [DiagramTone, DiagramTone, DiagramTone];
  shades?: [number, number, number];
  /** Words written in the three parts of the bar ('' for none). */
  words?: [string, string, string];
  /** Where each word sits along the pH axis, when the middle of its part is in the way. */
  wordsAt?: [number, number, number];
}

/**
 * Indicators' colours across the pH scale, from 0 to 14: a pH axis along the bottom and a bar for
 * each indicator above it, its name to its left, coloured below, inside and above its
 * colour-change range, with the range's ends written under the bar (the lower end to the left of
 * its boundary and the upper end to the right, clear of a window's edge). A window is a shaded stretch across every bar, where the pH
 * must lie, labelled at its top. `nameRoom` keeps room left of the axis for the names (3.6 by
 * default).
 *
 * Parts: `axis` (a group: the line, its marks and numbers), each bar by its `id` (a group: its
 * name, colours, outline, words and range ends), each part of a bar's outline `<id>-s0`, `<id>-s1`
 * and `<id>-s2` (to emphasise one colour), and each window by its `id` (a group).
 */
export function indicatorBars(o: { name?: string; bars: IndicatorBar[]; nameRoom?: number; windows?: { id: string; from: number; to: number; tex?: string; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const L = 14;
  Object.assign(points, { [n('ax-a')]: [0, 0], [n('ax-b')]: [L, 0] });
  items.push({ kind: 'line', id: n('axis-line'), from: n('ax-a'), to: n('ax-b'), weight: 3, group: n('axis') });
  for (let k = 0; k <= L; k++) {
    Object.assign(points, { [n(`t${k}a`)]: [k, -0.16], [n(`t${k}b`)]: [k, 0.16] });
    items.push({ kind: 'line', id: n(`tick${k}`), from: n(`t${k}a`), to: n(`t${k}b`), weight: 2.5, group: n('axis') });
    if (k % 2 === 0) items.push({ kind: 'label', id: n(`num${k}`), at: n(`t${k}a`), tex: String(k), place: 'below', tone: 'muted', group: n('axis') });
  }
  points[n('ph-at')] = [L + 0.35, 0];
  items.push({ kind: 'label', id: n('ph'), at: n('ph-at'), tex: '\\text{pH}', place: 'right', tone: 'muted', group: n('axis') });
  const BAR = 0.9;
  o.bars.forEach((bar, i) => {
    const id = n(bar.id);
    const y0 = 1.1 + i * 2.1;
    const y1 = y0 + BAR;
    const xs = [0, bar.lo, bar.hi, L];
    for (let s = 0; s < 3; s++) {
      const c = rect(points, `${id}-q${s}`, xs[s], y0, xs[s + 1], y1);
      items.push(
        { kind: 'region', id: `${id}-fill${s}`, points: c, tone: bar.tones[s], shade: bar.shades?.[s] ?? 0.6, group: id },
        { kind: 'curve', id: `${id}-s${s}`, points: c, closed: true, tone: 'muted', weight: 2, group: id },
      );
      const word = bar.words?.[s];
      if (word) {
        points[`${id}-w${s}`] = [bar.wordsAt?.[s] ?? (xs[s] + xs[s + 1]) / 2, (y0 + y1) / 2];
        items.push({ kind: 'label', id: `${id}-word${s}`, at: `${id}-w${s}`, tex: `\\text{${word}}`, place: 'center', group: id });
      }
    }
    points[`${id}-name-at`] = [-0.15, (y0 + y1) / 2];
    items.push({ kind: 'label', id: `${id}-name`, at: `${id}-name-at`, tex: bar.tex, place: 'left', group: id });
    for (const [k, v] of [bar.lo, bar.hi].entries()) {
      points[`${id}-e${k}`] = [v + (k ? 0.18 : -0.18), y0 - 0.02];
      items.push({ kind: 'label', id: `${id}-end${k}`, at: `${id}-e${k}`, tex: v.toFixed(1), place: k ? 'below right' : 'below left', tone: 'muted', group: id });
    }
  });
  // Room on the left for the names.
  Object.assign(points, { [n('room')]: [-(o.nameRoom ?? 3.6), 0] });
  const top = 1.1 + (o.bars.length - 1) * 2.1 + BAR + 0.35;
  for (const w of o.windows ?? []) {
    const id = n(w.id);
    const tone = w.tone ?? 'good';
    const c = rect(points, `${id}-r`, w.from, 0.35, w.to, top);
    items.push(
      { kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.18, group: id },
      { kind: 'line', id: `${id}-l`, from: c[0], to: c[3], tone, dashed: true, weight: 2.5, group: id },
      { kind: 'line', id: `${id}-r`, from: c[1], to: c[2], tone, dashed: true, weight: 2.5, group: id },
    );
    if (w.tex) {
      points[`${id}-t`] = [(w.from + w.to) / 2, top];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-t`, tex: w.tex, place: 'above', tone, group: id });
    }
  }
  return { points, items };
}

/** One test with an indicator paper: its colour before, the solution it is dipped in, and its colour after. */
export interface PaperTest {
  id: string;
  before: DiagramTone;
  after: DiagramTone;
  /** Written on the paper before and after ("\\text{blue litmus}", "\\text{red}"). */
  label: string;
  afterLabel: string;
  /** The solution, written over the arrow ("\\text{acid}"). */
  dip: string;
}

/**
 * Indicator papers before and after a test, a row for each test: a strip of paper, an arrow
 * labelled with the solution it is dipped in, and the strip afterwards.
 *
 * Parts: each test by its `id` (a group: the first strip and its label) and `<id>-after` (a group:
 * the arrow, its label and the second strip).
 */
export function papers(o: { name?: string; tests: PaperTest[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const W = 3.6;
  const H = 0.9;
  o.tests.forEach((t, i) => {
    const id = n(t.id);
    const y = -i * 1.9;
    const strip = (key: string, x: number, tone: DiagramTone, tex: string, group: string) => {
      const c = rect(points, `${id}-${key}`, x, y, x + W, y + H);
      points[`${id}-${key}-c`] = [x + W / 2, y + H / 2];
      items.push(
        { kind: 'region', id: `${id}-${key}-fill`, points: c, tone, shade: 0.7, group },
        { kind: 'curve', id: `${id}-${key}-edge`, points: c, closed: true, tone, weight: 2, group },
        { kind: 'label', id: `${id}-${key}-label`, at: `${id}-${key}-c`, tex, place: 'center', group },
      );
    };
    strip('p0', 0, t.before, t.label, id);
    Object.assign(points, { [`${id}-a0`]: [W + 0.3, y + H / 2], [`${id}-a1`]: [W + 2.3, y + H / 2] });
    items.push({ kind: 'line', id: `${id}-arrow`, from: `${id}-a0`, to: `${id}-a1`, arrow: true, tone: 'ink', weight: 3, label: t.dip, labelSide: 'left', group: `${id}-after` });
    strip('p1', W + 2.6, t.after, t.afterLabel, `${id}-after`);
  });
  return { points, items };
}

// ---------------------------------------------------------------------------- beakers and ions

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

// ---------------------------------------------------------------------------- balancing charges

/** Ions of one kind in a salt: how they are written, their charge's size and how many there are. */
export interface IonRow {
  tex: string;
  charge: number;
  count: number;
  tone?: DiagramTone;
  /** The total charge, written at the end of the row ("2+"). */
  sum?: string;
}

/**
 * The ions of a salt as blocks as long as their charges, `unit` per charge: the positive ions in a
 * row on top and the negative ions in a row underneath, starting at the same place. When the
 * charges balance, the two rows are the same length.
 *
 * Parts: each block `pos0`, `pos1`… and `neg0`, `neg1`… (a group: its shading, outline and
 * label), and the totals `pos-sum` and `neg-sum` at the ends of the rows.
 */
export function chargeBars(o: { name?: string; pos: IonRow; neg: IonRow; unit?: number; height?: number }): Part {
  const n = namer(o.name);
  const U = o.unit ?? 2.2;
  const H = o.height ?? 1.1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const row = (key: 'pos' | 'neg', r: IonRow, y0: number) => {
    const w = r.charge * U;
    const tone = r.tone ?? (key === 'pos' ? 'adj' : 'opp');
    for (let i = 0; i < r.count; i++) {
      const id = n(`${key}${i}`);
      const c = rect(points, `${id}-r`, i * w + 0.05, y0, (i + 1) * w - 0.05, y0 + H);
      points[`${id}-c`] = [(i + 0.5) * w, y0 + H / 2];
      items.push(
        { kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.35, group: id },
        { kind: 'curve', id: `${id}-edge`, points: c, closed: true, tone, weight: 2.5, group: id },
        { kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: r.tex, place: 'center', group: id },
      );
    }
    if (r.sum) {
      points[n(`${key}-sum-at`)] = [r.count * w + 0.2, y0 + H / 2];
      items.push({ kind: 'label', id: n(`${key}-sum`), at: n(`${key}-sum-at`), tex: r.sum, place: 'right', tone });
    }
  };
  row('pos', o.pos, 0.15);
  row('neg', o.neg, -0.15 - H);
  // Room for the totals at the ends of the rows.
  const len = Math.max(o.pos.charge * o.pos.count, o.neg.charge * o.neg.count) * U;
  Object.assign(points, { [n('fa')]: [-0.4, 0], [n('fb')]: [len + 1.6, 0] });
  return { points, items };
}

// ---------------------------------------------------------------------------- testing for carbon dioxide

/** Points along a test tube: down the left side, round the bottom and up the right side. */
function tube(points: Record<string, P>, key: string, x: number, w: number, top: number): string[] {
  const r = w / 2;
  const names = [`${key}-tl`];
  points[`${key}-tl`] = [x, top];
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI + (Math.PI * i) / 12;
    points[`${key}-b${i}`] = [x + r + r * Math.cos(a), r + r * Math.sin(a)];
    names.push(`${key}-b${i}`);
  }
  points[`${key}-tr`] = [x + w, top];
  names.push(`${key}-tr`);
  return names;
}

/** The part of a test tube's inside below `level`, as a closed outline. */
function tubeLiquid(points: Record<string, P>, key: string, x: number, w: number, level: number): string[] {
  const r = w / 2;
  const inset = 0.06;
  const names: string[] = [];
  points[`${key}-ql`] = [x + inset, level];
  names.push(`${key}-ql`);
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI + (Math.PI * i) / 12;
    points[`${key}-q${i}`] = [x + r + (r - inset) * Math.cos(a), r + (r - inset) * Math.sin(a)];
    names.push(`${key}-q${i}`);
  }
  points[`${key}-qr`] = [x + w - inset, level];
  names.push(`${key}-qr`);
  return names;
}

/**
 * Testing the gas from an acid and a metal carbonate: on the left, a stoppered test tube of acid
 * with lumps of carbonate fizzing in it; a delivery tube carries the gas over into a second test
 * tube of limewater, which turns cloudy.
 *
 * Parts: `tube-a` (a group: the first tube, its stopper, the acid and the lumps), `fizz` (the
 * bubbles in the acid), `pipe` (the delivery tube), `gas` (its label), `tube-b` (a group: the
 * second tube and the clear limewater), `bubbles` (in the limewater), `cloudy` (the limewater
 * turned cloudy) and the labels `label-a` and `label-b`.
 */
export function gasTest(o: { name?: string; labels?: [string, string]; gas?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const W = 1.3;
  const [ax, bx] = [0, 4.6];
  const top = 4.5;
  const glass = (key: string, x: number, group: string) => {
    const t = tube(points, n(key), x, W, top);
    items.push({ kind: 'curve', id: n(`${key}-glass`), points: t, tone: 'ink', weight: 3, group: n(group) });
  };
  // The first tube: acid with lumps of carbonate at the bottom, and a stopper.
  items.push({ kind: 'region', id: n('acid'), points: tubeLiquid(points, n('la'), ax, W, 2.1), tone: 'adj', shade: 0.22, group: n('tube-a') });
  for (const [i, [cx, cy]] of [[0.38, 0.3], [0.72, 0.24], [0.98, 0.42], [0.56, 0.52]].entries()) {
    items.push({ kind: 'region', id: n(`lump${i}`), points: ring(points, n(`lump${i}-`), [ax + cx, cy], 0.15, 8), tone: 'ink', shade: 0.7, group: n('tube-a') });
  }
  glass('a', ax, 'tube-a');
  items.push({ kind: 'region', id: n('stopper'), points: rect(points, n('st'), ax - 0.08, top - 0.45, ax + W + 0.08, top + 0.1), tone: 'muted', shade: 0.85, group: n('tube-a') });
  for (const [i, [cx, cy]] of [[0.45, 0.95], [0.85, 1.25], [0.6, 1.6], [0.95, 1.85], [0.35, 1.4]].entries()) {
    items.push({ kind: 'curve', id: n(`fizz${i}`), points: ring(points, n(`fz${i}-`), [ax + cx, cy], 0.09, 10), closed: true, tone: 'ink', weight: 2, group: n('fizz') });
  }
  // The second tube: limewater, clear at first.
  items.push(
    { kind: 'region', id: n('lime'), points: tubeLiquid(points, n('lb'), bx, W, 3.0), tone: 'ink', shade: 0.08, group: n('tube-b') },
    { kind: 'region', id: n('cloudy'), points: tubeLiquid(points, n('lc'), bx, W, 3.0), tone: 'ink', shade: 0.5 },
  );
  glass('b', bx, 'tube-b');
  // The delivery tube, from the stopper up, across and down into the limewater.
  Object.assign(points, { [n('p0')]: [ax + W / 2, top - 0.3], [n('p1')]: [ax + W / 2, 5.6], [n('p2')]: [bx + W / 2, 5.6], [n('p3')]: [bx + W / 2, 0.9] });
  items.push({ kind: 'curve', id: n('pipe'), points: [n('p0'), n('p1'), n('p2'), n('p3')], tone: 'muted', weight: 5 });
  for (const [i, [cx, cy]] of [[0.5, 1.25], [0.82, 1.7], [0.55, 2.2], [0.8, 2.65]].entries()) {
    items.push({ kind: 'curve', id: n(`bub${i}`), points: ring(points, n(`bb${i}-`), [bx + cx, cy], 0.09, 10), closed: true, tone: 'ink', weight: 2, group: n('bubbles') });
  }
  points[n('gas-at')] = [(ax + bx + W) / 2, 5.6];
  items.push({ kind: 'label', id: n('gas'), at: n('gas-at'), tex: o.gas ?? '\\ce{CO2}', place: 'above', tone: 'theta' });
  const [la, lb] = o.labels ?? ['\\begin{gathered}\\text{acid and}\\\\ \\text{carbonate}\\end{gathered}', '\\text{limewater}'];
  Object.assign(points, { [n('la-at')]: [ax + W / 2, -0.1], [n('lb-at')]: [bx + W / 2, -0.1] });
  items.push(
    { kind: 'label', id: n('label-a'), at: n('la-at'), tex: la, place: 'below' },
    { kind: 'label', id: n('label-b'), at: n('lb-at'), tex: lb, place: 'below' },
  );
  // Room at the sides for the labels under the tubes.
  Object.assign(points, { [n('fa')]: [ax - 1.1, 0], [n('fb')]: [bx + W + 1.1, 0] });
  return { points, items };
}
