/**
 * Helpers for the relative frequency and probability videos, built only from standard diagram
 * parts (lines, curves, shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `people`: a class of students as dots in columns, coloured by category, with an optional
 *   dashed box round each column (to see 9 out of 24 as 3 out of every 8).
 * - `stackBar`: one bar cut into parts for the categories, as long as their frequencies, so the
 *   parts make one whole.
 * - `hundred`: a 10 by 10 grid with some squares shaded, for a percentage.
 * - `coin`, `die` and `spinner`: the equally likely outcomes of an experiment.
 * - `likelihood`: a line from impossible to certain.
 *
 * Bar graphs come from `barGraph` in `src/video/charts.ts`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { circleGraph } from '@/video/charts.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The points of a circle round `c`, as point names in `points`. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const name = `${key}-${j}`;
    points[name] = [c[0] + r * Math.cos((2 * Math.PI * j) / steps), c[1] + r * Math.sin((2 * Math.PI * j) / steps)];
    return name;
  });
}

/**
 * Students as dots, `rows` to a column, filling each column top to bottom and the columns left to
 * right, coloured by `groups` in order (the first group fills the first columns). With `boxes`, a
 * dashed box surrounds each column (the group `boxes`; one box is `box<c>`).
 *
 * Parts: a group for each of `groups`, by its `id` (each dot `<id><k>`), and `boxes`.
 */
export function people(o: { name?: string; rows: number; groups: { id: string; count: number; tone: DiagramTone }[]; boxes?: boolean; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let k = 0;
  for (const g of o.groups) {
    for (let i = 0; i < g.count; i++, k++) {
      const c = Math.floor(k / o.rows);
      const r = k % o.rows;
      const ids = ring(points, n(`d${k}`), [c * gap, -r], 0.34);
      items.push({ kind: 'region', id: n(`${g.id}${i}`), points: ids, tone: g.tone, shade: g.tone === 'muted' ? 0.5 : 0.85, group: n(g.id) });
    }
  }
  if (o.boxes) {
    const cols = Math.ceil(k / o.rows);
    for (let c = 0; c < cols; c++) {
      const corners: P[] = [[c * gap - 0.46, 0.46], [c * gap + 0.46, 0.46], [c * gap + 0.46, -(o.rows - 1) - 0.46], [c * gap - 0.46, -(o.rows - 1) - 0.46]];
      const ids = corners.map((q, j) => {
        points[n(`b${c}-${j}`)] = q;
        return n(`b${c}-${j}`);
      });
      items.push({ kind: 'curve', id: n(`box${c}`), points: ids, closed: true, tone: 'theta', dashed: true, weight: 2, group: n('boxes') });
    }
  }
  return { points, items };
}

/**
 * One bar `width` long cut into `parts`, each as long as its value, shaded in its tone, with its
 * `label` (TeX) inside and `below` (TeX) under it. `whole` (TeX) is written under the whole bar.
 *
 * Parts: a group for each part by its `id` (its shading, outline and labels), and `whole`.
 */
export function stackBar(o: { name?: string; parts: { id: string; value: number; tone: DiagramTone; label?: string; below?: string }[]; width?: number; height?: number; whole?: string }): Part {
  const n = namer(o.name);
  const W = o.width ?? 12;
  const H = o.height ?? 1.3;
  const total = o.parts.reduce((s, p) => s + p.value, 0);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = 0;
  for (const p of o.parts) {
    const w = (p.value / total) * W;
    const corners: P[] = [[x, 0], [x + w, 0], [x + w, H], [x, H]];
    const ids = corners.map((q, j) => {
      points[n(`${p.id}-${j}`)] = q;
      return n(`${p.id}-${j}`);
    });
    items.push(
      { kind: 'region', id: n(`${p.id}-fill`), points: ids, tone: p.tone, shade: 0.55, group: n(p.id) },
      { kind: 'curve', id: n(`${p.id}-edge`), points: ids, closed: true, tone: 'ink', weight: 2, group: n(p.id) },
    );
    if (p.label) {
      points[n(`${p.id}-in`)] = [x + w / 2, H / 2];
      items.push({ kind: 'label', id: n(`${p.id}-label`), at: n(`${p.id}-in`), tex: p.label, place: 'center', group: n(p.id) });
    }
    if (p.below) {
      points[n(`${p.id}-under`)] = [x + w / 2, -0.1];
      items.push({ kind: 'label', id: n(`${p.id}-below`), at: n(`${p.id}-under`), tex: p.below, tone: p.tone, place: 'below', group: n(p.id) });
    }
    x += w;
  }
  if (o.whole) {
    points[n('whole-at')] = [W / 2, H + 0.1];
    items.push({ kind: 'label', id: n('whole'), at: n('whole-at'), tex: o.whole, place: 'above' });
  }
  return { points, items };
}

/**
 * A 10 by 10 grid of squares with the first `shaded` squares shaded, row by row from the top
 * left. Parts: `grid` (a group: the lines) and `shade` (a group of the shaded squares).
 */
export function hundred(o: { name?: string; shaded: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.shaded; k++) {
    const [c, r] = [k % 10, 9 - Math.floor(k / 10)];
    const corners: P[] = [[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]];
    const ids = corners.map((q, j) => {
      points[n(`s${k}-${j}`)] = q;
      return n(`s${k}-${j}`);
    });
    items.push({ kind: 'region', id: n(`s${k}`), points: ids, tone: o.tone ?? 'adj', shade: 0.65, group: n('shade') });
  }
  for (let i = 0; i <= 10; i++) {
    Object.assign(points, { [n(`v${i}a`)]: [i, 0], [n(`v${i}b`)]: [i, 10], [n(`h${i}a`)]: [0, i], [n(`h${i}b`)]: [10, i] });
    const edge = i === 0 || i === 10;
    items.push(
      { kind: 'line', id: n(`v${i}`), from: n(`v${i}a`), to: n(`v${i}b`), tone: edge ? 'ink' : 'muted', weight: edge ? 2.5 : 1.5, group: n('grid') },
      { kind: 'line', id: n(`h${i}`), from: n(`h${i}a`), to: n(`h${i}b`), tone: edge ? 'ink' : 'muted', weight: edge ? 2.5 : 1.5, group: n('grid') },
    );
  }
  return { points, items };
}

/** A coin with `face` (TeX, such as H) on it, radius 1, centred at `at`: the group `id`. */
export function coin(id: string, at: P, face: string, tone: DiagramTone = 'theta'): Part {
  const points: Record<string, P> = { [`${id}-c`]: at };
  const ids = ring(points, id, at, 1, 32);
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: ids, tone, shade: 0.35, group: id },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 3, group: id },
      { kind: 'label', id: `${id}-face`, at: `${id}-c`, tex: face, tone: 'ink', place: 'center', group: id },
    ],
  };
}

/** Where the pips of each face of a die go, on a face from (0, 0) to (1, 1). */
const PIPS: Record<number, P[]> = {
  1: [[0.5, 0.5]],
  2: [[0.27, 0.73], [0.73, 0.27]],
  3: [[0.25, 0.75], [0.5, 0.5], [0.75, 0.25]],
  4: [[0.27, 0.27], [0.27, 0.73], [0.73, 0.27], [0.73, 0.73]],
  5: [[0.25, 0.25], [0.25, 0.75], [0.5, 0.5], [0.75, 0.25], [0.75, 0.75]],
  6: [[0.27, 0.22], [0.27, 0.5], [0.27, 0.78], [0.73, 0.22], [0.73, 0.5], [0.73, 0.78]],
};

/**
 * The face of a die showing `n` pips, `size` across, with its bottom left corner at `at`, and its
 * number written under it when `number` is set: the group `id`.
 */
export function die(id: string, at: P, value: number, o: { size?: number; tone?: DiagramTone; number?: boolean } = {}): Part {
  const s = o.size ?? 1.6;
  const [x, y] = at;
  const tone = o.tone ?? 'ink';
  const points: Record<string, P> = {};
  const corners: P[] = [[x, y], [x + s, y], [x + s, y + s], [x, y + s]];
  const ids = corners.map((q, j) => {
    points[`${id}-${j}`] = q;
    return `${id}-${j}`;
  });
  const items: DiagramItem[] = [
    { kind: 'region', id: `${id}-fill`, points: ids, tone: tone === 'ink' ? 'muted' : tone, shade: tone === 'ink' ? 0.2 : 0.35, group: id },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 3, group: id },
  ];
  PIPS[value].forEach(([px, py], k) => {
    const pip = ring(points, `${id}-p${k}`, [x + px * s, y + py * s], 0.085 * s, 12);
    items.push({ kind: 'region', id: `${id}-pip${k}`, points: pip, tone: 'ink', shade: 0.95, group: id });
  });
  if (o.number) {
    points[`${id}-n`] = [x + s / 2, y - 0.1];
    items.push({ kind: 'label', id: `${id}-num`, at: `${id}-n`, tex: String(value), tone, place: 'below', group: id });
  }
  return { points, items };
}

/**
 * A spinner: a circle cut into equal sections named `labels` (clockwise from the top, coloured in
 * the circle graph's order unless `tones` sets them) with a pointer from the centre to the middle
 * of section `pointTo`. Parts: the sections `s<i>` (groups) and `pointer`.
 */
export function spinner(o: { name?: string; labels: string[]; tones?: DiagramTone[]; pointTo?: number; r?: number }): Part {
  const n = namer(o.name);
  const r = o.r ?? 3;
  const g = circleGraph({ name: o.name, r, namesOnly: true, slices: o.labels.map((label, i) => ({ label, value: 1, ...(o.tones?.[i] ? { tone: o.tones[i] } : {}) })) });
  const k = o.pointTo ?? 0;
  const a = ((90 - (360 / o.labels.length) * (k + 0.5)) * Math.PI) / 180;
  const points = { ...g.points, [n('tip')]: [0.72 * r * Math.cos(a), 0.72 * r * Math.sin(a)] as P, [n('hub')]: [0, 0] as P };
  const items: DiagramItem[] = [...g.items, { kind: 'line', id: n('pointer'), from: n('hub'), to: n('tip'), tone: 'ink', weight: 5, arrow: true }];
  return { points, items };
}

/**
 * A likelihood line from impossible (left) to certain (right), `length` long, with a mark and a
 * word under each of `marks` (0 to 1 along the line), and optional `notes` (TeX) above the marks.
 *
 * Parts: `line` (a group: the line, its marks and words), and each note by its `id`.
 */
export function likelihood(o: { name?: string; length?: number; marks: { at: number; word: string }[]; notes?: { id: string; at: number; tex: string; tone?: DiagramTone; place?: Place }[] }): Part {
  const n = namer(o.name);
  const L = o.length ?? 14;
  const points: Record<string, P> = { [n('L')]: [0, 0], [n('R')]: [L, 0] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('axis'), from: n('L'), to: n('R'), tone: 'ink', weight: 3, group: n('line') }];
  o.marks.forEach((m, i) => {
    Object.assign(points, { [n(`m${i}a`)]: [m.at * L, -0.25], [n(`m${i}b`)]: [m.at * L, 0.25], [n(`w${i}`)]: [m.at * L, -0.35] });
    items.push(
      { kind: 'line', id: n(`mark${i}`), from: n(`m${i}a`), to: n(`m${i}b`), tone: 'ink', weight: 3, group: n('line') },
      { kind: 'label', id: n(`word${i}`), at: n(`w${i}`), tex: `\\text{${m.word}}`, tone: 'muted', place: 'below', group: n('line') },
    );
  });
  for (const t of o.notes ?? []) {
    points[n(`${t.id}-at`)] = [t.at * L, 0.35];
    items.push({ kind: 'label', id: n(t.id), at: n(`${t.id}-at`), tex: t.tex, tone: t.tone ?? 'theta', place: t.place ?? 'above' });
  }
  return { points, items };
}
