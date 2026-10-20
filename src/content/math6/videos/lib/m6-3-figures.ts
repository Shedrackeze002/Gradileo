/**
 * Figures for the prime factorization and powers videos (Grade 6, unit 3):
 *
 * - `squares`: a number of squares set out in equal rows (12 squares as 3 rows of 4), with any
 *   left over on a row of their own in red, to show which numbers are factors.
 * - `chips`: a row of numbers in rings (the prime factors of a number, one ring each), so the
 *   primes a divisor needs can be matched against the primes a number has; a dashed red ring marks
 *   a prime that is needed but missing.
 *
 * Like the figures in `src/video/`, each is built only from standard diagram parts (lines, curves,
 * regions and labels) and goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle of radius r about c, added to `points` as `<key>0`, `<key>1`…. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 32): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = Math.PI / 2 + (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
}

/**
 * `rows` equal rows of `cols` squares, each `size` units, from the top left corner `at`, and
 * `extra` more squares on a row of their own just under them, in red (the squares left over).
 * `label` is written under it all.
 *
 * Parts: `sq` (a group: the shading, the outline and the lines between the squares), `extra` (a
 * group: the squares left over) and `label`.
 */
export function squares(o: { name?: string; rows: number; cols: number; extra?: number; at?: P; size?: number; tone?: DiagramTone; label?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const s = o.size ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // A block of squares `cols` wide and `rows` tall with its top left corner at (x0, top).
  const block = (key: string, cols: number, rows: number, top: number, tone: DiagramTone, group: string) => {
    const W = cols * s;
    const H = rows * s;
    Object.assign(points, { [n(`${key}A`)]: [x0, top], [n(`${key}B`)]: [x0 + W, top], [n(`${key}C`)]: [x0 + W, top - H], [n(`${key}D`)]: [x0, top - H] });
    const corners = ['A', 'B', 'C', 'D'].map((c) => n(`${key}${c}`));
    items.push({ kind: 'region', id: n(`${key}-fill`), points: corners, tone, shade: 0.4, group: n(group) });
    for (let i = 1; i < cols; i++) {
      Object.assign(points, { [n(`${key}x${i}a`)]: [x0 + i * s, top], [n(`${key}x${i}b`)]: [x0 + i * s, top - H] });
      items.push({ kind: 'line', id: n(`${key}-x${i}`), from: n(`${key}x${i}a`), to: n(`${key}x${i}b`), tone, weight: 2, group: n(group) });
    }
    for (let j = 1; j < rows; j++) {
      Object.assign(points, { [n(`${key}y${j}a`)]: [x0, top - j * s], [n(`${key}y${j}b`)]: [x0 + W, top - j * s] });
      items.push({ kind: 'line', id: n(`${key}-y${j}`), from: n(`${key}y${j}a`), to: n(`${key}y${j}b`), tone, weight: 2, group: n(group) });
    }
    items.push({ kind: 'curve', id: n(`${key}-edge`), points: corners, closed: true, tone, weight: 3, group: n(group) });
  };
  block('s', o.cols, o.rows, y0, o.tone ?? 'adj', 'sq');
  let bottom = y0 - o.rows * s;
  if (o.extra) {
    const top = bottom - 0.25 * s;
    block('e', o.extra, 1, top, 'bad', 'extra');
    bottom = top - s;
  }
  if (o.label) {
    const wide = Math.max(o.cols, o.extra ?? 0) * s;
    points[n('lab')] = [x0 + wide / 2, bottom - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'below', tone: 'ink' });
  }
  return { points, items };
}

/**
 * Numbers in rings in a row, `gap` apart, the first centred on `at`: the prime factors of a
 * number, one ring each. `xs` places the rings at those distances from `at` instead (to line a
 * divisor's primes up under the number's). Each ring takes its colour from `tones` (or `tone` for
 * all of them); the rings listed in `missing` are dashed and red, for a prime that is needed but
 * not there. `title` is written to the left of the row, with room kept for it.
 *
 * Parts: each ring `c<i>` (a group: the ring `c<i>-ring` and its number `c<i>-tex`), and `title`.
 */
export function chips(o: { name?: string; values: (string | number)[]; at?: P; gap?: number; xs?: number[]; r?: number; tone?: DiagramTone; tones?: DiagramTone[]; missing?: number[]; title?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const gap = o.gap ?? 1.2;
  const r = o.r ?? 0.42;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.values.forEach((v, i) => {
    const c: P = [x0 + (o.xs?.[i] ?? i * gap), y0];
    const missing = o.missing?.includes(i) ?? false;
    const tone = missing ? 'bad' : (o.tones?.[i] ?? o.tone ?? 'good');
    const pts = ring(points, n(`c${i}r`), c, r);
    points[n(`c${i}`)] = c;
    items.push(
      { kind: 'region', id: n(`c${i}-fill`), points: pts, tone, shade: missing ? 0.06 : 0.18, group: n(`c${i}`) },
      { kind: 'curve', id: n(`c${i}-ring`), points: pts, closed: true, tone, weight: 3, dashed: missing, group: n(`c${i}`) },
      { kind: 'label', id: n(`c${i}-tex`), at: n(`c${i}`), tex: `\\large ${v}`, place: 'center', tone: missing ? 'bad' : 'ink', group: n(`c${i}`) },
    );
  });
  if (o.title) {
    points[n('t')] = [x0 - r - 0.3, y0];
    points[n('room')] = [x0 - r - 1.5, y0];
    items.push({ kind: 'label', id: n('title'), at: n('t'), tex: o.title, place: 'left', tone: 'ink' });
  }
  return { points, items };
}

/**
 * A power written large in the middle, base blue and exponent orange, with the words "base" and
 * "exponent" beside it and an arrow from each word to its number. `size` is the TeX size of the
 * power (`\\Huge` by default), which the arrow ends are placed for.
 *
 * Parts: `power`, `base` (a group: the word and its arrow) and `exp` (a group: the word and its
 * arrow).
 */
export function powerParts(o: { name?: string; base: string; exp: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {
    [n('p')]: [0, 0],
    [n('bw')]: [-3.1, -1.5],
    [n('ba')]: [-2.2, -1.3],
    [n('bb')]: [-0.75, -0.55],
    [n('ew')]: [3.3, 1.5],
    [n('ea')]: [2.15, 1.35],
    [n('eb')]: [0.95, 0.8],
    [n('room1')]: [-4.2, -1.7],
    [n('room2')]: [4.4, 1.7],
  };
  const items: DiagramItem[] = [
    { kind: 'label', id: n('power'), at: n('p'), tex: `\\Huge \\adj{${o.base}}^{\\opp{${o.exp}}}`, place: 'center' },
    { kind: 'label', id: n('base-word'), at: n('bw'), tex: '\\text{base}', tone: 'adj', place: 'center', group: n('base') },
    { kind: 'line', id: n('base-arrow'), from: n('ba'), to: n('bb'), tone: 'adj', weight: 3, arrow: true, group: n('base') },
    { kind: 'label', id: n('exp-word'), at: n('ew'), tex: '\\text{exponent}', tone: 'opp', place: 'center', group: n('exp') },
    { kind: 'line', id: n('exp-arrow'), from: n('ea'), to: n('eb'), tone: 'opp', weight: 3, arrow: true, group: n('exp') },
  ];
  return { points, items };
}

/** An invisible point, to keep room in a diagram for a label that reaches past the drawing. */
export function room(name: string, at: P): Part {
  return { points: { [name]: at }, items: [] };
}
