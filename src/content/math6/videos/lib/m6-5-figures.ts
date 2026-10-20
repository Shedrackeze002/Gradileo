/**
 * Figures for the ratios, rates and percents videos (Grade 6, unit 5):
 *
 * - `beads`: a string of beads in a repeating pattern (2 red, then 3 white), each repeat its own
 *   part with a bracket under it, to build equivalent ratios.
 * - `ratioTable`: a ratio table drawn as a grid, a title for each row and a column for each
 *   equivalent ratio, with curved "× 4" arrows over the top row and under the bottom row.
 * - `doubleLine`: a double number line, two lines with matching marks (distance above, time below;
 *   percent above, the quantity below).
 *
 * Hundred grids come from the Grade 5 helpers and equal groups of dots from the unit 4 helpers.
 * Like the figures in `src/video/`, each is built only from standard diagram parts and goes into a
 * diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle, added to `points` as `<key>0`, `<key>1`…. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
}

/**
 * A string of beads starting at `at`: `repeats` copies of a pattern of `red` red beads then
 * `white` white beads, a little apart. `labels` are written under the repeats, on a bracket.
 *
 * Parts: `string` (the thread), each repeat `k<i>` (a group: its beads) and its bracket `br<i>`
 * (a group: the bracket and its label).
 */
export function beads(o: { name?: string; repeats: number; red: number; white: number; labels?: string[]; at?: P }): Part {
  const n = namer(o.name);
  const [ax, ay] = o.at ?? [0, 0];
  const step = 0.9;
  const r = 0.36;
  const gap = 0.55;
  const per = o.red + o.white;
  const width = (per - 1) * step;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const end = o.repeats * (width + step + gap) - step - gap;
  Object.assign(points, { [n('s0')]: [ax - 0.7, ay], [n('s1')]: [ax + end + 0.7, ay] });
  items.push({ kind: 'line', id: n('string'), from: n('s0'), to: n('s1'), tone: 'muted', weight: 2.5 });
  for (let i = 0; i < o.repeats; i++) {
    const x0 = ax + i * (width + step + gap);
    for (let j = 0; j < per; j++) {
      const red = j < o.red;
      const pts = ring(points, n(`b${i}-${j}-`), [x0 + j * step, ay], r);
      items.push(
        { kind: 'region', id: n(`b${i}-${j}`), points: pts, tone: red ? 'bad' : 'ink', shade: red ? 0.8 : 0.22, group: n(`k${i}`) },
        { kind: 'curve', id: n(`b${i}-${j}-e`), points: pts, closed: true, tone: red ? 'bad' : 'ink', weight: 2.5, group: n(`k${i}`) },
      );
    }
    if (o.labels?.[i]) {
      const y = ay - r - 0.3;
      Object.assign(points, {
        [n(`br${i}a`)]: [x0 - r, y],
        [n(`br${i}b`)]: [x0 + width + r, y],
        [n(`br${i}a2`)]: [x0 - r, y + 0.18],
        [n(`br${i}b2`)]: [x0 + width + r, y + 0.18],
        [n(`br${i}m`)]: [x0 + width / 2, y],
      });
      items.push(
        { kind: 'line', id: n(`br${i}-line`), from: n(`br${i}a`), to: n(`br${i}b`), tone: 'muted', weight: 2.5, group: n(`br${i}`) },
        { kind: 'line', id: n(`br${i}-ta`), from: n(`br${i}a`), to: n(`br${i}a2`), tone: 'muted', weight: 2.5, group: n(`br${i}`) },
        { kind: 'line', id: n(`br${i}-tb`), from: n(`br${i}b`), to: n(`br${i}b2`), tone: 'muted', weight: 2.5, group: n(`br${i}`) },
        { kind: 'label', id: n(`br${i}-label`), at: n(`br${i}m`), tex: o.labels[i], tone: 'ink', place: 'below', group: n(`br${i}`) },
      );
    }
  }
  return { points, items };
}

/** An arc from x = a to x = b, bulging up from height y (down when `down`), with an arrowhead at b. */
function arcArrow(points: Record<string, P>, n: (s: string) => string, id: string, a: number, b: number, y: number, down: boolean, tone: DiagramTone, label: string, group: string): DiagramItem[] {
  const h = 0.55;
  const s = down ? -1 : 1;
  const names: string[] = [];
  const steps = 16;
  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    points[n(`${id}-${k}`)] = [a + (b - a) * t, y + s * h * Math.sin(Math.PI * t)];
    names.push(n(`${id}-${k}`));
  }
  points[n(`${id}-lab`)] = [(a + b) / 2, y + s * (h + 0.05)];
  return [
    { kind: 'curve', id: n(`${id}-arc`), points: names.slice(0, steps), tone, weight: 3, group },
    { kind: 'line', id: n(`${id}-head`), from: names[steps - 1], to: names[steps], tone, weight: 3, arrow: true, group },
    { kind: 'label', id: n(`${id}-label`), at: n(`${id}-lab`), tex: label, tone, place: down ? 'below' : 'above', group },
  ];
}

/**
 * A ratio table as a grid: the two row titles on the left (`rows`, TeX), then one column for each
 * ratio in `cols` (top value, bottom value, in TeX). `arrows` join column `from` to column `to`
 * with a curved arrow over the top row and another under the bottom row, both labelled (“\times 4”).
 *
 * Parts: `frame` (a group: the grid lines and row titles), each column `c<i>` (a group: its top
 * value `c<i>-t` and bottom value `c<i>-b`, which can be shown on their own), and each arrow
 * pair by its `id` (a group: both arcs, their heads and their labels).
 */
export function ratioTable(o: {
  name?: string;
  rows: [string, string];
  cols: [string, string][];
  titleWidth?: number;
  colWidth?: number;
  tones?: [DiagramTone, DiagramTone];
  arrows?: { id: string; from: number; to: number; label: string; tone?: DiagramTone }[];
}): Part {
  const n = namer(o.name);
  const T = o.titleWidth ?? 4.6;
  const C = o.colWidth ?? 1.6;
  const H = 1.2;
  const W = T + C * o.cols.length;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const line = (id: string, a: P, b: P, weight = 2.5) => {
    Object.assign(points, { [n(`${id}a`)]: a, [n(`${id}b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}a`), to: n(`${id}b`), tone: 'muted', weight, group: n('frame') });
  };
  line('h0', [0, H], [W, H]);
  line('h1', [0, 0], [W, 0]);
  line('h2', [0, -H], [W, -H]);
  line('v0', [0, H], [0, -H]);
  for (let i = 0; i <= o.cols.length; i++) line(`v${i + 1}`, [T + C * i, H], [T + C * i, -H], i === 0 ? 3 : 2.5);
  const [t1, t2] = o.tones ?? ['opp', 'adj'];
  points[n('r0')] = [T / 2, H / 2];
  points[n('r1')] = [T / 2, -H / 2];
  items.push(
    { kind: 'label', id: n('row0'), at: n('r0'), tex: o.rows[0], tone: t1, place: 'center', group: n('frame') },
    { kind: 'label', id: n('row1'), at: n('r1'), tex: o.rows[1], tone: t2, place: 'center', group: n('frame') },
  );
  o.cols.forEach(([top, bottom], i) => {
    const x = T + C * (i + 0.5);
    Object.assign(points, { [n(`c${i}t`)]: [x, H / 2], [n(`c${i}b`)]: [x, -H / 2] });
    items.push(
      { kind: 'label', id: n(`c${i}-t`), at: n(`c${i}t`), tex: `\\large ${top}`, place: 'center', group: n(`c${i}`) },
      { kind: 'label', id: n(`c${i}-b`), at: n(`c${i}b`), tex: `\\large ${bottom}`, place: 'center', group: n(`c${i}`) },
    );
  });
  for (const a of o.arrows ?? []) {
    const xa = T + C * (a.from + 0.5) + 0.15;
    const xb = T + C * (a.to + 0.5) - 0.15;
    const tone = a.tone ?? 'theta';
    items.push(
      ...arcArrow(points, n, `${a.id}-top`, xa, xb, H + 0.1, false, tone, a.label, n(a.id)),
      ...arcArrow(points, n, `${a.id}-bottom`, xa, xb, -H - 0.1, true, tone, a.label, n(a.id)),
    );
  }
  // Keep room above and below for the arrows and their labels.
  if (o.arrows?.length) Object.assign(points, { [n('roomT')]: [0, H + 1.1], [n('roomB')]: [0, -H - 1.1] });
  return { points, items };
}

/**
 * A double number line: two lines `length` long, one above the other, with a mark for each value
 * at matching places. The top values are written above the top line and the bottom values under
 * the bottom line; each line's title is at its left end, with room kept for it (`titleRoom`).
 *
 * Parts: `lines` (a group: both lines, their marks and their titles), each pair of values `v<i>`
 * (a group: `v<i>-t` above and `v<i>-b` below, also shown on their own), and `link<i>` (a dashed
 * line joining the two marks of pair i, for pointing out a pair).
 */
export function doubleLine(o: { name?: string; top: string[]; bottom: string[]; titles: [string, string]; length?: number; gap?: number; tones?: [DiagramTone, DiagramTone]; titleRoom?: number }): Part {
  const n = namer(o.name);
  const L = o.length ?? 12;
  const g = (o.gap ?? 2.2) / 2;
  const count = o.top.length;
  const X = (i: number) => (i * L) / (count - 1);
  const [t1, t2] = o.tones ?? ['opp', 'adj'];
  const points: Record<string, P> = {
    [n('tl')]: [-0.3, g],
    [n('tr')]: [L + 0.3, g],
    [n('bl')]: [-0.3, -g],
    [n('br')]: [L + 0.3, -g],
    [n('tt')]: [-0.5, g],
    [n('bt')]: [-0.5, -g],
    [n('room')]: [-(o.titleRoom ?? 3.2), 0],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('top'), from: n('tl'), to: n('tr'), tone: t1, weight: 3, group: n('lines') },
    { kind: 'line', id: n('bottom'), from: n('bl'), to: n('br'), tone: t2, weight: 3, group: n('lines') },
    { kind: 'label', id: n('title-t'), at: n('tt'), tex: o.titles[0], tone: t1, place: 'left', group: n('lines') },
    { kind: 'label', id: n('title-b'), at: n('bt'), tex: o.titles[1], tone: t2, place: 'left', group: n('lines') },
  ];
  for (let i = 0; i < count; i++) {
    const x = X(i);
    Object.assign(points, {
      [n(`m${i}a`)]: [x, g - 0.2],
      [n(`m${i}b`)]: [x, g + 0.2],
      [n(`m${i}c`)]: [x, -g - 0.2],
      [n(`m${i}d`)]: [x, -g + 0.2],
      [n(`v${i}t`)]: [x, g + 0.25],
      [n(`v${i}b`)]: [x, -g - 0.25],
      [n(`l${i}a`)]: [x, g - 0.3],
      [n(`l${i}b`)]: [x, -g + 0.3],
    });
    items.push(
      { kind: 'line', id: n(`mt${i}`), from: n(`m${i}a`), to: n(`m${i}b`), tone: t1, weight: 2.5, group: n('lines') },
      { kind: 'line', id: n(`mb${i}`), from: n(`m${i}c`), to: n(`m${i}d`), tone: t2, weight: 2.5, group: n('lines') },
      { kind: 'line', id: n(`link${i}`), from: n(`l${i}a`), to: n(`l${i}b`), tone: 'theta', dashed: true, weight: 2.5 },
      { kind: 'label', id: n(`v${i}-t`), at: n(`v${i}t`), tex: o.top[i], tone: t1, place: 'above', group: n(`v${i}`) },
      { kind: 'label', id: n(`v${i}-b`), at: n(`v${i}b`), tex: o.bottom[i], tone: t2, place: 'below', group: n(`v${i}`) },
    );
  }
  return { points, items };
}
