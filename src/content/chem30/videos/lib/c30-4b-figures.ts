/**
 * Figures for the second half of the Grade 12 Chemistry acid–base videos (unit 4, lessons 4.5 to
 * 4.8: predicting acid–base reactions, Ka and Kb, the pH of weak acids and bases, and buffers and
 * titration curves), built only from standard diagram parts (lines, curves, shaded regions and
 * labels), so each goes into a diagram with `figure` (src/video/solids.ts). With a `name`, each
 * part's id starts with it.
 *
 * - `ladder`: a table of relative acid strengths, acids on the left and their conjugate bases on
 *   the right, with Ka, arrows for "stronger acid" and "stronger base", highlighted cells and
 *   proton-transfer arrows from an acid to a base.
 * - `titrationGraph`: pH against the volume of titrant, with the lesson's curves (`HCL_CURVE`,
 *   `ACETIC_CURVE`, `PHOSPHORIC_CURVE`) and `AMMONIA_CURVE`, points and dashed reading lines.
 * - `indicatorBands`: the colour-change range of each indicator as a bar over a pH axis, with
 *   the names and ranges in columns beside it, and dashed lines at the pH of equivalence points.
 * - `phDrops`: the pH of a buffer and of pure water before and after the same strong acid is added.
 * - `bufferPair`: a buffer's weak acid and conjugate base, with added acid and base being used up.
 * - `ionisedGrid`: a hundred molecules of a weak acid, with the ionised ones coloured.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { marbles } from '@/video/charts.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}-0`]: [x0, y0], [`${key}-1`]: [x1, y0], [`${key}-2`]: [x1, y1], [`${key}-3`]: [x0, y1] });
  return [0, 1, 2, 3].map((i) => `${key}-${i}`);
}

/** Two lines of text, one above the other, as TeX. */
const twoLines = (a: string, b: string) => `\\begin{gathered}\\text{${a}}\\\\\\text{${b}}\\end{gathered}`;

// ---------------------------------------------------------------------------- the table of acid strengths

/** A row of the table: an acid, its conjugate base and its Ka (all TeX). */
export interface LadderRow {
  id: string;
  acid: string;
  base: string;
  ka?: string;
}

/** A highlighted cell: the acid, the base or the Ka of a row. */
export interface LadderMark {
  id: string;
  row: string;
  col: 'acid' | 'base' | 'ka';
  tone?: DiagramTone;
}

/** A proton passing from the acid of row `from` to the base of row `to`. */
export interface LadderMove {
  id: string;
  from: string;
  to: string;
  tone?: DiagramTone;
}

/** The rows of the lesson 4.5 table used in the videos, strongest acid first. */
export const LADDER_ROWS: LadderRow[] = [
  { id: 'hcl', acid: '\\ce{HCl}', base: '\\ce{Cl-}', ka: '\\text{very large}' },
  { id: 'hno3', acid: '\\ce{HNO3}', base: '\\ce{NO3-}', ka: '\\text{very large}' },
  { id: 'h3o', acid: '\\ce{H3O+}', base: '\\ce{H2O}', ka: '1' },
  { id: 'hf', acid: '\\ce{HF}', base: '\\ce{F-}', ka: '6.6 \\times 10^{-4}' },
  { id: 'hac', acid: '\\ce{CH3COOH}', base: '\\ce{CH3COO-}', ka: '1.8 \\times 10^{-5}' },
  { id: 'h2co3', acid: '\\ce{H2CO3}', base: '\\ce{HCO3-}', ka: '4.5 \\times 10^{-7}' },
  { id: 'hcn', acid: '\\ce{HCN}', base: '\\ce{CN-}', ka: '6.2 \\times 10^{-10}' },
  { id: 'nh4', acid: '\\ce{NH4+}', base: '\\ce{NH3}', ka: '5.6 \\times 10^{-10}' },
  { id: 'hco3', acid: '\\ce{HCO3-}', base: '\\ce{CO3^2-}', ka: '4.7 \\times 10^{-11}' },
  { id: 'h2o', acid: '\\ce{H2O}', base: '\\ce{OH-}', ka: '1.0 \\times 10^{-14}' },
];

/** Where each column's middle is, and half the width of a highlighted cell, in rows. */
const COL = { acid: 0, base: 5.2, ka: 10.6 };
const HALF = { acid: 1.95, base: 1.95, ka: 2.1 };

/**
 * A table of relative acid strengths: a header, then a row for each acid (strongest first, one
 * unit apart) with its conjugate base and, with `ka`, its Ka. With `arrows`, an arrow up the left
 * side marks "stronger acid" and one down the right side "stronger base". A mark shades one cell;
 * a move is an arrow from the acid of one row to the base of another (the proton's path).
 *
 * Parts: `head` (a group: the column titles and the line under them), `rows` (a group: every
 * cell), each cell by its row and column (`hac-acid`, `hco3-base`, `hf-ka`), `up` and `down` (the
 * arrows, each a group with its label), each mark by its `id` (a group) and each move by its `id`.
 */
export function ladder(o: { name?: string; rows?: LadderRow[]; ka?: boolean; arrows?: boolean; marks?: LadderMark[]; moves?: LadderMove[] }): Part {
  const n = namer(o.name);
  const rows = o.rows ?? LADDER_ROWS;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const rowY = new Map(rows.map((r, i) => [r.id, -i]));
  const y = (id: string) => {
    const v = rowY.get(id);
    if (v === undefined) throw new Error(`ladder: no row "${id}"`);
    return v;
  };
  const last = -(rows.length - 1);
  const right = o.ka ? COL.ka + HALF.ka : COL.base + HALF.base;
  // Marks first, so the cells' text is drawn over them.
  for (const m of o.marks ?? []) {
    const id = n(m.id);
    const [cx, cy, hw] = [COL[m.col], y(m.row), HALF[m.col]];
    const box = rect(points, `${id}-box`, cx - hw, cy - 0.42, cx + hw, cy + 0.42);
    const tone = m.tone ?? 'theta';
    items.push(
      { kind: 'region', id: `${id}-fill`, points: box, tone, shade: 0.3, group: id },
      { kind: 'curve', id: `${id}-edge`, points: box, closed: true, tone, weight: 2.5, group: id },
    );
  }
  // The header.
  const headY = 1.15;
  const heads: [string, number, string, DiagramTone][] = [
    ['h-acid', COL.acid, '\\text{Acid}', 'bad'],
    ['h-base', COL.base, '\\text{Conjugate base}', 'adj'],
  ];
  if (o.ka) heads.push(['h-ka', COL.ka, 'K_a', 'ink']);
  for (const [id, x, tex, tone] of heads) {
    points[n(`${id}-at`)] = [x, headY];
    items.push({ kind: 'label', id: n(id), at: n(`${id}-at`), tex, tone, place: 'center', group: n('head') });
  }
  Object.assign(points, { [n('rule-a')]: [COL.acid - HALF.acid, 0.6], [n('rule-b')]: [right, 0.6] });
  items.push({ kind: 'line', id: n('rule'), from: n('rule-a'), to: n('rule-b'), tone: 'muted', weight: 2, group: n('head') });
  // The cells.
  for (const r of rows) {
    const cells: [string, number, string | undefined][] = [
      ['acid', COL.acid, r.acid],
      ['base', COL.base, r.base],
    ];
    if (o.ka) cells.push(['ka', COL.ka, r.ka]);
    for (const [col, x, tex] of cells) {
      if (!tex) continue;
      const id = n(`${r.id}-${col}`);
      points[`${id}-at`] = [x, y(r.id)];
      items.push({ kind: 'label', id, at: `${id}-at`, tex, place: 'center', tone: 'ink', group: n('rows') });
    }
  }
  // The arrows down the sides, with room kept for their labels.
  if (o.arrows) {
    const xl = COL.acid - HALF.acid - 1.3;
    const xr = right + 1.3;
    Object.assign(points, {
      [n('up-a')]: [xl, last],
      [n('up-b')]: [xl, 0],
      [n('down-a')]: [xr, 0],
      [n('down-b')]: [xr, last],
      [n('room-l')]: [xl - 3.2, 0],
      [n('room-r')]: [xr + 3.2, 0],
    });
    items.push(
      { kind: 'line', id: n('up'), from: n('up-a'), to: n('up-b'), arrow: true, tone: 'bad', weight: 4, label: twoLines('stronger', 'acid'), labelSide: 'left' },
      { kind: 'line', id: n('down'), from: n('down-a'), to: n('down-b'), arrow: true, tone: 'adj', weight: 4, label: twoLines('stronger', 'base'), labelSide: 'left' },
    );
  }
  // The proton's path: from the right of an acid to the left of a base.
  for (const m of o.moves ?? []) {
    const id = n(m.id);
    Object.assign(points, { [`${id}-a`]: [COL.acid + 2.05, y(m.from)], [`${id}-b`]: [COL.base - 2.05, y(m.to)] });
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, tone: m.tone ?? 'good', weight: 4 });
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- titration curves

type Curve = [number, number][];

/** 25.00 mL of 0.100 mol/L hydrochloric acid titrated with 0.100 mol/L sodium hydroxide (lesson 4.8's grey curve). */
export const HCL_CURVE: Curve = [
  [0, 1], [0.25, 1.01], [0.5, 1.02], [1, 1.03], [2, 1.07], [3, 1.1], [4, 1.14], [5, 1.18], [6, 1.21], [7, 1.25], [8, 1.29], [9, 1.33], [10, 1.37], [11, 1.41], [12, 1.45], [13, 1.5], [14, 1.55], [15, 1.6], [16, 1.66], [17, 1.72], [18, 1.79], [19, 1.87], [20, 1.95], [21, 2.06], [22, 2.19], [23, 2.38], [23.5, 2.51], [24, 2.69], [24.5, 3], [24.8, 3.4], [24.9, 3.7], [24.95, 4], [25, 7], [25.05, 10], [25.1, 10.3], [25.2, 10.6], [25.5, 11], [26, 11.29], [26.5, 11.46], [27, 11.59], [28, 11.75], [29, 11.87], [30, 11.96], [31, 12.03], [32, 12.09], [33, 12.14], [34, 12.18], [35, 12.22], [36, 12.26], [37, 12.29], [38, 12.31], [39, 12.34], [40, 12.36], [41, 12.38], [42, 12.4], [43, 12.42], [44, 12.44], [45, 12.46], [46, 12.47], [47, 12.49], [48, 12.5], [49, 12.51], [50, 12.52],
];

/** 25.00 mL of 0.100 mol/L acetic acid titrated with 0.100 mol/L sodium hydroxide (lesson 4.8's coloured curve). */
export const ACETIC_CURVE: Curve = [
  [0, 2.88], [0.25, 3.04], [0.5, 3.18], [1, 3.41], [2, 3.7], [3, 3.89], [4, 4.03], [5, 4.14], [6, 4.25], [7, 4.34], [8, 4.42], [9, 4.5], [10, 4.57], [11, 4.64], [12, 4.71], [12.3, 4.73], [12.4, 4.74], [12.45, 4.74], [12.5, 4.75], [12.55, 4.75], [12.6, 4.75], [12.7, 4.76], [13, 4.78], [14, 4.85], [15, 4.92], [16, 4.99], [17, 5.07], [18, 5.16], [19, 5.25], [20, 5.35], [21, 5.47], [22, 5.61], [23, 5.81], [23.5, 5.94], [24, 6.13], [24.5, 6.44], [24.8, 6.84], [24.9, 7.14], [24.95, 7.44], [25, 8.72], [25.05, 10], [25.1, 10.3], [25.2, 10.6], [25.5, 11], [26, 11.29], [26.5, 11.46], [27, 11.59], [28, 11.75], [29, 11.87], [30, 11.96], [31, 12.03], [32, 12.09], [33, 12.14], [34, 12.18], [35, 12.22], [36, 12.26], [37, 12.29], [38, 12.31], [39, 12.34], [40, 12.36], [41, 12.38], [42, 12.4], [43, 12.42], [44, 12.44], [45, 12.46], [46, 12.47], [47, 12.49], [48, 12.5], [49, 12.51], [50, 12.52],
];

/**
 * 25.00 mL of 0.100 mol/L ammonia (Kb = 1.8 × 10⁻⁵) titrated with 0.100 mol/L hydrochloric acid,
 * from the same charge-balance calculator as the lesson's curves (`titrationPoints` in
 * engine/curriculum/chem30/gen/equilibrium-tools.ts): it starts at pH 11.12 and has its
 * equivalence point at 25.0 mL and pH 5.28.
 */
export const AMMONIA_CURVE: Curve = [
  [0, 11.12], [0.25, 10.96], [0.5, 10.82], [1, 10.59], [2, 10.3], [3, 10.11], [4, 9.97], [5, 9.86], [6, 9.75], [7, 9.66], [8, 9.58], [9, 9.5], [10, 9.43], [11, 9.36], [12, 9.29], [13, 9.22], [14, 9.15], [15, 9.08], [16, 9.01], [17, 8.93], [18, 8.84], [19, 8.75], [20, 8.65], [21, 8.53], [22, 8.39], [23, 8.19], [23.5, 8.06], [24, 7.87], [24.5, 7.56], [24.8, 7.16], [24.9, 6.86], [24.95, 6.56], [25, 5.28], [25.05, 4], [25.1, 3.7], [25.2, 3.4], [25.5, 3], [26, 2.71], [26.5, 2.54], [27, 2.41], [28, 2.25], [29, 2.13], [30, 2.04], [31, 1.97], [32, 1.91], [33, 1.86], [34, 1.82], [35, 1.78], [36, 1.74], [37, 1.71], [38, 1.69], [39, 1.66], [40, 1.64], [41, 1.62], [42, 1.6], [43, 1.58], [44, 1.56], [45, 1.54], [46, 1.53], [47, 1.51], [48, 1.5], [49, 1.49], [50, 1.48],
];

/** 25.00 mL of 0.0800 mol/L phosphoric acid titrated with 0.100 mol/L sodium hydroxide (lesson 4.8). */
export const PHOSPHORIC_CURVE: Curve = [
  [0, 1.69], [0.25, 1.71], [0.5, 1.72], [1, 1.75], [2, 1.81], [3, 1.87], [4, 1.93], [5, 1.99], [6, 2.05], [7, 2.11], [8, 2.18], [9, 2.24], [10, 2.31], [11, 2.38], [12, 2.46], [13, 2.54], [14, 2.63], [15, 2.73], [16, 2.85], [17, 2.99], [18, 3.19], [18.5, 3.32], [19, 3.51], [19.5, 3.81], [19.8, 4.18], [19.9, 4.4], [19.95, 4.55], [20, 4.72], [20.05, 4.88], [20.1, 5.03], [20.2, 5.25], [20.5, 5.62], [21, 5.93], [21.5, 6.12], [22, 6.25], [23, 6.45], [24, 6.61], [25, 6.73], [26, 6.84], [27, 6.94], [28, 7.03], [29, 7.12], [30, 7.21], [31, 7.29], [32, 7.38], [33, 7.48], [34, 7.58], [35, 7.68], [36, 7.81], [37, 7.96], [38, 8.16], [38.5, 8.3], [39, 8.48], [39.5, 8.79], [39.8, 9.16], [39.9, 9.37], [39.95, 9.5], [40, 9.65], [40.05, 9.8], [40.1, 9.93], [40.2, 10.14], [40.5, 10.5], [41, 10.8], [41.5, 10.98], [42, 11.1], [43, 11.28], [44, 11.41], [45, 11.51], [46, 11.6], [47, 11.67], [48, 11.73], [49, 11.78], [50, 11.83],
];

/**
 * A titration curve: pH (0 to 14) against the volume of titrant added (0 to 50 mL), with a grid
 * line every 5 mL and every pH unit. Each curve is drawn on from left to right; a point is a dot
 * with its label; a guide is a dashed reading line from the volume axis up to (x, y) and across to
 * the pH axis.
 *
 * Parts: `grid` and `axes` (groups, with the plane's name in front, as for `plane`), each curve,
 * guide and point by its `id` (with the same prefix).
 */
export function titrationGraph(o: {
  name?: string;
  titrant: string;
  curves: { id: string; points: Curve; tone?: DiagramTone }[];
  points?: { id: string; x: number; y: number; tex?: string; place?: Place; tone?: DiagramTone }[];
  guides?: { id: string; x: number; y: number; tone?: DiagramTone }[];
}): Part {
  const g = plane({ name: o.name, x: [0, 50], y: [0, 14], xStep: 5, yStep: 1, every: 2, width: 9, height: 7, titles: { x: `\\text{Volume of ${o.titrant} added (mL)}`, y: '\\text{pH}' } });
  const parts: Part[] = [g];
  for (const gd of o.guides ?? []) {
    parts.push(polyline(g, { id: gd.id, points: [[gd.x, 0], [gd.x, gd.y], [0, gd.y]], tone: gd.tone ?? 'theta', dashed: true }));
  }
  for (const c of o.curves) parts.push(polyline(g, { id: c.id, points: c.points, tone: c.tone ?? 'brand' }));
  if (o.points?.length) parts.push(dots(g, o.points.map((p) => ({ ...p, tone: p.tone ?? 'theta' }))));
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

// ---------------------------------------------------------------------------- indicators

/** An indicator's colour-change range. */
export interface IndicatorBand {
  id: string;
  name: string;
  lo: number;
  hi: number;
  tone: DiagramTone;
}

/** The indicators in the lesson 4.8 table, lowest range first. */
export const LESSON_INDICATORS: IndicatorBand[] = [
  { id: 'mo', name: 'methyl orange', lo: 3.2, hi: 4.4, tone: 'opp' },
  { id: 'bcg', name: 'bromocresol green', lo: 3.8, hi: 5.4, tone: 'good' },
  { id: 'mr', name: 'methyl red', lo: 4.8, hi: 6.0, tone: 'bad' },
  { id: 'btb', name: 'bromothymol blue', lo: 6.0, hi: 7.6, tone: 'adj' },
  { id: 'pp', name: 'phenolphthalein', lo: 8.2, hi: 10.0, tone: 'hyp' },
  { id: 'ay', name: 'alizarin yellow R', lo: 10.1, hi: 12.0, tone: 'theta' },
];

/**
 * A pH axis from 0 to 14, and above it a bar for each indicator over its colour-change range,
 * the lowest range at the top, with the indicators' names in a column on the left and their
 * ranges in a column on the right (clear of the lines). A line is a dashed upright line at a pH
 * (an equivalence point) with its label at the top.
 *
 * Parts: `axis` (a group: the line, ticks and numbers), each band by its `id` (a group: its bar,
 * name and range) and each line by its `id` (a group: the line and its label).
 */
export function indicatorBands(o: { name?: string; bands?: IndicatorBand[]; lines?: { id: string; ph: number; tex: string; tone?: DiagramTone }[] } = {}): Part {
  const n = namer(o.name);
  const bands = o.bands ?? LESSON_INDICATORS;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const top = bands.length + 0.2;
  // Room for the names on the left and the ranges on the right.
  Object.assign(points, { [n('room-l')]: [-6, 0], [n('room-r')]: [17.6, top + 0.6], [n('ax-a')]: [0, 0], [n('ax-b')]: [14, 0] });
  items.push({ kind: 'line', id: n('ax'), from: n('ax-a'), to: n('ax-b'), tone: 'muted', weight: 2.5, group: n('axis') });
  for (let k = 0; k <= 14; k++) {
    Object.assign(points, { [n(`t${k}a`)]: [k, 0], [n(`t${k}b`)]: [k, -0.18] });
    items.push({ kind: 'line', id: n(`t${k}`), from: n(`t${k}a`), to: n(`t${k}b`), tone: 'muted', weight: 2, group: n('axis') });
    if (k % 2 === 0) items.push({ kind: 'label', id: n(`num${k}`), at: n(`t${k}b`), tex: String(k), tone: 'ink', place: 'below', group: n('axis') });
  }
  points[n('ph-at')] = [14.4, -0.45];
  items.push({ kind: 'label', id: n('ph'), at: n('ph-at'), tex: '\\text{pH}', place: 'right', tone: 'ink', group: n('axis') });
  bands.forEach((b, i) => {
    const id = n(b.id);
    const yc = bands.length - i - 0.25;
    const box = rect(points, `${id}-box`, b.lo, yc - 0.32, b.hi, yc + 0.32);
    Object.assign(points, { [`${id}-l`]: [-0.4, yc], [`${id}-r`]: [14.5, yc] });
    items.push(
      { kind: 'region', id: `${id}-fill`, points: box, tone: b.tone, shade: 0.6, group: id },
      { kind: 'curve', id: `${id}-edge`, points: box, closed: true, tone: b.tone, weight: 2, group: id },
      { kind: 'label', id: `${id}-name`, at: `${id}-l`, tex: `\\text{${b.name}}`, place: 'left', tone: 'ink', group: id },
      { kind: 'label', id: `${id}-range`, at: `${id}-r`, tex: `${b.lo.toFixed(1)}\\text{–}${b.hi.toFixed(1)}`, place: 'right', tone: 'muted', group: id },
    );
  });
  for (const l of o.lines ?? []) {
    const id = n(l.id);
    Object.assign(points, { [`${id}-a`]: [l.ph, 0], [`${id}-b`]: [l.ph, top] });
    const tone = l.tone ?? 'theta';
    items.push(
      { kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone, dashed: true, weight: 3, group: id },
      { kind: 'label', id: `${id}-label`, at: `${id}-b`, tex: l.tex, place: 'above', tone, group: id },
    );
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- buffers

/**
 * The pH of a buffer and of pure water, before and after the same amount of strong acid is added:
 * an upright pH axis from 0 to 8 and, for each, a dot at the starting pH and an arrow down to the
 * new pH, each labelled.
 *
 * Parts: `axis` (a group: the line, ticks, numbers and title), and for each of `buffer` and
 * `water` a group by that id (its name and starting dot) and a group `<id>-drop` (the arrow and
 * the new pH).
 */
export function phDrops(o: { name?: string; buffer: [number, number]; water: [number, number] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = { [n('ax-a')]: [0, 0], [n('ax-b')]: [0, 8.4], [n('room-r')]: [7.6, 0], [n('room-b')]: [0, -0.9] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('ax'), from: n('ax-a'), to: n('ax-b'), tone: 'muted', weight: 2.5, arrow: true, group: n('axis') }];
  for (let k = 0; k <= 8; k++) {
    Object.assign(points, { [n(`t${k}a`)]: [0, k], [n(`t${k}b`)]: [-0.2, k] });
    items.push(
      { kind: 'line', id: n(`t${k}`), from: n(`t${k}a`), to: n(`t${k}b`), tone: 'muted', weight: 2, group: n('axis') },
      { kind: 'label', id: n(`num${k}`), at: n(`t${k}b`), tex: String(k), tone: 'ink', place: 'left', group: n('axis') },
    );
  }
  items.push({ kind: 'label', id: n('title'), at: n('ax-b'), tex: '\\text{pH}', place: 'above', tone: 'ink', group: n('axis') });
  const columns: [string, number, [number, number], string][] = [
    ['buffer', 2.2, o.buffer, '\\text{buffer}'],
    ['water', 5.4, o.water, '\\text{water}'],
  ];
  for (const [key, x, [from, to], name] of columns) {
    const id = n(key);
    Object.assign(points, { [`${id}-s`]: [x, from], [`${id}-e`]: [x, to], [`${id}-name-at`]: [x, -0.35] });
    items.push(
      { kind: 'label', id: `${id}-name`, at: `${id}-name-at`, tex: name, place: 'below', tone: 'ink', group: id },
      { kind: 'label', id: `${id}-start`, at: `${id}-s`, tex: from.toFixed(2), dot: true, place: 'above right', tone: 'adj', group: id },
      { kind: 'line', id: `${id}-arrow`, from: `${id}-s`, to: `${id}-e`, arrow: Math.abs(from - to) > 0.5, tone: 'bad', weight: 4, group: `${id}-drop` },
      { kind: 'label', id: `${id}-end`, at: `${id}-e`, tex: to.toFixed(2), dot: true, place: 'below right', tone: 'bad', group: `${id}-drop` },
    );
  }
  return { points, items };
}

/**
 * A buffer's weak acid and conjugate base in two boxes side by side. Added hydronium ions arrive
 * from above at the base, which an arch carries over to the acid (the base becomes the acid);
 * added hydroxide ions arrive from below at the acid, which an arch carries over to the base.
 *
 * Parts: `pair` (a group: the boxes, and the formulas with their names), `add-acid` (a group: the
 * arrow for added acid, its label and the arch from base to acid) and `add-base` (the same for
 * added base).
 */
export function bufferPair(o: { name?: string; acid: string; base: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const boxes: [string, number, string, string, DiagramTone][] = [
    ['acid', 0, o.acid, 'weak acid', 'bad'],
    ['base', 7, o.base, 'conjugate base', 'adj'],
  ];
  for (const [key, x, tex, name, tone] of boxes) {
    const id = n(key);
    const box = rect(points, `${id}-box`, x - 2.5, -1.35, x + 2.5, 1.35);
    points[`${id}-at`] = [x, 0];
    // The formula over the particle's name, in smaller type, so both fit the box.
    items.push(
      { kind: 'region', id: `${id}-fill`, points: box, tone, shade: 0.18, group: n('pair') },
      { kind: 'curve', id: `${id}-edge`, points: box, closed: true, tone, weight: 2.5, group: n('pair') },
      { kind: 'label', id: `${id}-tex`, at: `${id}-at`, tex: `\\begin{gathered}${tex}\\\\{\\footnotesize\\text{${name}}}\\end{gathered}`, place: 'center', tone: 'ink', group: n('pair') },
    );
  }
  // An arch from one box to the other, above (up = 1) or below (up = -1), with an arrowhead.
  const arch = (id: string, x0: number, x1: number, up: 1 | -1, group: string) => {
    const names: string[] = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      points[`${id}-${i}`] = [x0 + (x1 - x0) * t, up * (1.5 + 1.15 * Math.sin(Math.PI * t))];
      names.push(`${id}-${i}`);
    }
    points[`${id}-end`] = [x1, up * 1.43];
    items.push(
      { kind: 'curve', id: `${id}-arc`, points: names.slice(0, 15), tone: 'good', weight: 3.5, group },
      { kind: 'line', id: `${id}-head`, from: names[14], to: `${id}-end`, tone: 'good', weight: 3.5, arrow: true, group },
    );
  };
  // Added acid: down into the base, which turns into the acid.
  Object.assign(points, { [n('in-a-a')]: [8.6, 3.2], [n('in-a-b')]: [8.6, 1.43] });
  items.push(
    { kind: 'line', id: n('in-a'), from: n('in-a-a'), to: n('in-a-b'), arrow: true, tone: 'bad', weight: 4, group: n('add-acid') },
    { kind: 'label', id: n('in-a-label'), at: n('in-a-a'), tex: '\\text{added }\\ce{H3O+}', place: 'above', tone: 'bad', group: n('add-acid') },
  );
  arch(n('arch-a'), 5.6, 1.4, 1, n('add-acid'));
  // Added base: up into the acid, which turns into the base.
  Object.assign(points, { [n('in-b-a')]: [-1.6, -3.2], [n('in-b-b')]: [-1.6, -1.43] });
  items.push(
    { kind: 'line', id: n('in-b'), from: n('in-b-a'), to: n('in-b-b'), arrow: true, tone: 'adj', weight: 4, group: n('add-base') },
    { kind: 'label', id: n('in-b-label'), at: n('in-b-a'), tex: '\\text{added }\\ce{OH-}', place: 'below', tone: 'adj', group: n('add-base') },
  );
  arch(n('arch-b'), 1.4, 5.6, -1, n('add-base'));
  return { points, items };
}

// ---------------------------------------------------------------------------- percent ionisation

/**
 * A hundred molecules of a weak acid in rows of ten, with `ionised` of them coloured, and a
 * `label` (TeX) under the grid. `at` is the centre of the first molecule.
 *
 * Parts: `ionised` and `whole` (groups of molecules) and `label`.
 */
export function ionisedGrid(o: { name?: string; at?: P; ionised: number; label?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const grid = marbles({ name: o.name, at: [x0, y0], perRow: 10, groups: [{ id: 'ionised', count: o.ionised, tone: 'good' }, { id: 'whole', count: 100 - o.ionised, tone: 'muted' }] });
  if (o.label) {
    grid.points[n('label-at')] = [x0 + 4.5, y0 - 9.6];
    grid.items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below', tone: 'ink' });
  }
  return grid;
}
