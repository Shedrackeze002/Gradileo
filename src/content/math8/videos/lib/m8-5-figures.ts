/**
 * Figures for the multiplying and dividing integers videos, built only from standard diagram parts
 * (labels, lines, curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `chips`: two-colour counters placed one by one, as in the Grade 6 counters: a positive counter
 *   (+1) is a filled yellow disc with a plus sign, a negative counter (−1) an open red circle with
 *   a minus sign. Dashed boxes go round groups of them, with a label above or below each box.
 * - `groupsOf`: the counters and boxes for equal groups of counters side by side (3 groups of 4
 *   negative counters, for 3 × (−4)), for `chips`.
 *
 * Number lines come from `intLine` (Grade 7 helpers) and vertical number lines from `vertical`
 * (Grade 6 helpers).
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Units between counter columns, and between rows (the same as the Grade 6 counters). */
const GAP = 1.15;
const ROW = 1.3;
const R = 0.42;

/** Point names round a circle. */
function circle(points: Record<string, P>, key: string, c: P, r: number, steps = 24): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
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

/** One counter at column `col` and row `row` (row 0 on top; both may be fractional). */
export type Chip = { id: string; sign: '+' | '-'; col: number; row: number };

/**
 * A box round the counters from column `cols[0]` to `cols[1]` and from row `rows[0]` to `rows[1]`,
 * dashed unless `solid`, with `label` (TeX) above it (or below, with `labelPlace`).
 */
export type Box = { id: string; cols: [number, number]; rows: [number, number]; tone?: DiagramTone; label?: string; labelPlace?: 'above' | 'below'; solid?: boolean };

/** A label (TeX) at a column and row. */
export type Note = { id: string; col: number; row: number; tex: string; tone?: DiagramTone; place?: Place };

/**
 * Two-colour counters, each placed at its own column and row, with boxes round groups of them and
 * notes. Columns are `GAP` (1.15 units) apart and rows `ROW` (1.3 units), as in the Grade 6
 * counters, so the two can sit side by side.
 *
 * Parts: each counter by its id (a group: its disc, edge and sign), each box by its id (a group:
 * the box and its label) and each note by its id.
 */
export function chips(o: { name?: string; chips: Chip[]; boxes?: Box[]; notes?: Note[]; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const X = (col: number) => x0 + col * GAP;
  const Y = (row: number) => y0 - row * ROW;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The boxes first, so the counters are drawn over them.
  for (const b of o.boxes ?? []) {
    const id = n(b.id);
    const tone = b.tone ?? 'muted';
    const pad = 0.6;
    const [left, right] = [X(b.cols[0]) - pad, X(b.cols[1]) + pad];
    const [top, bottom] = [Y(b.rows[0]) + pad, Y(b.rows[1]) - pad];
    items.push({ kind: 'curve', id: `${id}-box`, points: roundRect(points, `${id}-r`, left, bottom, right, top, 0.3), closed: true, tone, weight: 2.5, dashed: !b.solid, group: id });
    if (b.label) {
      const below = b.labelPlace === 'below';
      points[`${id}-lab`] = [(left + right) / 2, below ? bottom - 0.08 : top + 0.08];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-lab`, tex: b.label, tone, place: below ? 'below' : 'above', group: id });
    }
  }
  for (const c of o.chips) {
    const id = n(c.id);
    const at: P = [X(c.col), Y(c.row)];
    const pos = c.sign === '+';
    const tone: DiagramTone = pos ? 'theta' : 'bad';
    items.push({ kind: 'region', id: `${id}-disc`, points: circle(points, `${id}-c`, at, R), tone, shade: pos ? 0.55 : 0.1, group: id });
    items.push({ kind: 'curve', id: `${id}-edge`, points: circle(points, `${id}-e`, at, R), closed: true, tone, weight: 3, group: id });
    points[`${id}-at`] = at;
    items.push({ kind: 'label', id: `${id}-sign`, at: `${id}-at`, tex: pos ? '\\Large +' : '\\Large -', tone: pos ? 'ink' : 'bad', place: 'center', group: id });
  }
  for (const t of o.notes ?? []) {
    const id = n(t.id);
    points[`${id}-at`] = [X(t.col), Y(t.row)];
    items.push({ kind: 'label', id, at: `${id}-at`, tex: t.tex, tone: t.tone ?? 'muted', place: t.place ?? 'center' });
  }
  return { points, items };
}

/**
 * `groups` equal groups of `size` counters of one sign, side by side, each `perRow` counters wide
 * and in a box with `labels[g]` above it (or below). The first group starts at column `col` and row
 * `row`; each group after it starts `space` columns after the last one ends.
 *
 * Counter ids are `<prefix><g>-<k>` (group g, counter k) and box ids `<prefix>box<g>`.
 */
export function groupsOf(o: { prefix: string; groups: number; size: number; sign: '+' | '-'; perRow: number; col?: number; row?: number; space?: number; labels?: string[]; labelPlace?: 'above' | 'below'; tone?: DiagramTone }): { chips: Chip[]; boxes: Box[] } {
  const list: Chip[] = [];
  const boxes: Box[] = [];
  const wide = Math.min(o.perRow, o.size);
  const rows = Math.ceil(o.size / o.perRow);
  const col0 = o.col ?? 0;
  const row0 = o.row ?? 0;
  const space = o.space ?? 1.4;
  for (let g = 0; g < o.groups; g++) {
    const left = col0 + g * (wide - 1 + space);
    for (let k = 0; k < o.size; k++) list.push({ id: `${o.prefix}${g}-${k}`, sign: o.sign, col: left + (k % o.perRow), row: row0 + Math.floor(k / o.perRow) });
    boxes.push({ id: `${o.prefix}box${g}`, cols: [left, left + wide - 1], rows: [row0, row0 + rows - 1], label: o.labels?.[g], labelPlace: o.labelPlace, tone: o.tone });
  }
  return { chips: list, boxes };
}

/** The ids of group `g`'s counters (made by `groupsOf` with `prefix`) in the figure `fig`. */
export const groupIds = (fig: string, prefix: string, g: number, size: number): string[] => Array.from({ length: size }, (_, k) => `${fig}.${prefix}${g}-${k}`);

/** The ids of counters `<prefix><from>`…`<prefix><from + count − 1>` in the figure `fig`. */
export const run = (fig: string, prefix: string, count: number, from = 0): string[] => Array.from({ length: count }, (_, k) => `${fig}.${prefix}${from + k}`);

/**
 * An empty point at `at`, so a diagram keeps room there for labels that hang below (or beside) the
 * drawing, such as the names under a number line. Draws nothing.
 */
export const room = (id: string, at: P): Part => ({ points: { [`room-${id}`]: at }, items: [] });
