/**
 * Helpers for the function videos, built only from standard diagram parts (lines, shaded regions
 * and labels), so each goes into a diagram with `figure`:
 *
 * - `machine`: a function machine, a row of boxes each doing one step of the rule (such as
 *   "× 3", then "+ 4"), with arrows from the input to the output. Sets of values (an input, the
 *   number after each step, and the output) can be shown in turn.
 * - `plants`: a bean plant in a pot for each week, as tall as its height, numbered underneath.
 *
 * Tables of values come from `valueTable` (`src/content/math5/videos/lib/m5-11-figures.ts`) or the
 * `table` element; graphs from `plane` and `dots` in `src/video/graph.ts`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * A function machine: the boxes `steps` (TeX, such as `\\times 3`) in a row, with an arrow into the
 * first, between each pair and out of the last. `titles` (TeX) sit under the input and the output,
 * and each of `sets` writes values on the machine: `in` before the first arrow, `mids[i]` after
 * box i, and `out` after the last arrow.
 *
 * Parts: `frame` (a group: the arrows), `box<i>` (a group: box i and its step), `titles` (a
 * group), and `set<k>` (a group: the values of set k, each a part `set<k>-in`, `set<k>-mid<i>`,
 * `set<k>-out`). Show one set, then hide it and show the next, to run the machine again.
 */
export function machine(o: { name?: string; steps: string[]; titles?: [string, string]; sets?: { in: string; mids?: string[]; out: string; tone?: DiagramTone }[]; boxW?: number }): Part {
  const n = namer(o.name);
  const BW = o.boxW ?? 2.2;
  const BH = 1.5;
  const A = 1.3; // arrow length
  const V = 1.3; // room for a value
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const arrow = (id: string, x0: number, x1: number) => {
    Object.assign(points, { [n(`${id}-a`)]: [x0, 0], [n(`${id}-b`)]: [x1, 0] });
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), tone: 'muted', weight: 3, arrow: true, group: n('frame') });
  };
  const label = (id: string, at: P, tex: string, tone: DiagramTone, group: string) => {
    points[n(`${id}-at`)] = at;
    items.push({ kind: 'label', id: n(id), at: n(`${id}-at`), tex, tone, place: 'center', group: n(group) });
  };
  // Left to right: a value, an arrow, a box, then (an arrow, a value) between boxes, and an arrow and the output.
  let x = 0;
  const valueX: number[] = [x];
  x += V / 2 + 0.15;
  arrow('a0', x, x + A);
  x += A + 0.15;
  o.steps.forEach((step, i) => {
    const corners: P[] = [[x, -BH / 2], [x + BW, -BH / 2], [x + BW, BH / 2], [x, BH / 2]];
    const ids = corners.map((c, j) => {
      points[n(`b${i}-${j}`)] = c;
      return n(`b${i}-${j}`);
    });
    items.push(
      { kind: 'region', id: n(`b${i}-fill`), points: ids, tone: 'brand', shade: 0.3, group: n(`box${i}`) },
      { kind: 'curve', id: n(`b${i}-edge`), points: ids, closed: true, tone: 'brand', weight: 3, group: n(`box${i}`) },
    );
    label(`step${i}`, [x + BW / 2, 0], step, 'ink', `box${i}`);
    x += BW + 0.15;
    arrow(`a${i + 1}`, x, x + A);
    x += A + 0.15 + V / 2;
    valueX.push(x);
    if (i < o.steps.length - 1) {
      x += V / 2 + 0.15;
      arrow(`c${i + 1}`, x, x + A);
      x += A + 0.15;
    }
  });
  if (o.titles) {
    label('t-in', [valueX[0], -1.2], o.titles[0], 'muted', 'titles');
    label('t-out', [valueX[valueX.length - 1], -1.2], o.titles[1], 'muted', 'titles');
  }
  (o.sets ?? []).forEach((s, k) => {
    const g = `set${k}`;
    label(`${g}-in`, [valueX[0], 0], s.in, s.tone ?? 'adj', g);
    (s.mids ?? []).forEach((m, i) => label(`${g}-mid${i}`, [valueX[i + 1], 0], m, 'muted', g));
    label(`${g}-out`, [valueX[valueX.length - 1], 0], s.out, 'opp', g);
  });
  // Keep room above and below the boxes for the titles.
  Object.assign(points, { [n('pad-top')]: [0, BH / 2 + 0.2], [n('pad-bot')]: [0, -1.5] });
  return { points, items };
}

/**
 * A bean plant for each height in `heights` (in centimetres), `gap` apart: a pot, a stem `scale`
 * units per centimetre tall with leaves along it, the height written above (`h<i>`) and the week
 * number written under the pot (`w<i>`).
 *
 * Parts: a group `p<i>` for each plant (its pot, stem and leaves), the labels `h<i>` and `w<i>`,
 * and the word "week" before the numbers (`title`); `weeks` is a group of the week labels.
 */
export function plants(o: { name?: string; heights: number[]; gap?: number; scale?: number; weeks?: string[] }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 2.9;
  const k = o.scale ?? 0.3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const poly = (id: string, corners: P[], tone: DiagramTone, shade: number, group: string, outline = true) => {
    const ids = corners.map((c, j) => {
      points[n(`${id}-${j}`)] = c;
      return n(`${id}-${j}`);
    });
    items.push({ kind: 'region', id: n(`${id}-fill`), points: ids, tone, shade, group: n(group) });
    if (outline) items.push({ kind: 'curve', id: n(`${id}-edge`), points: ids, closed: true, tone, weight: 2, group: n(group) });
  };
  o.heights.forEach((h, i) => {
    const x = i * gap;
    const g = `p${i}`;
    poly(`pot${i}`, [[x - 0.45, -0.7], [x + 0.45, -0.7], [x + 0.6, 0], [x - 0.6, 0]], 'opp', 0.45, g);
    const top = h * k;
    Object.assign(points, { [n(`s${i}a`)]: [x, 0], [n(`s${i}b`)]: [x, top] });
    items.push({ kind: 'line', id: n(`stem${i}`), from: n(`s${i}a`), to: n(`s${i}b`), tone: 'good', weight: 4, group: n(g) });
    // A leaf every 3 cm up the stem, turning left and right, and a pair at the top.
    let side = 1;
    for (let c = 2; c < h - 0.5; c += 3, side = -side) {
      const y = c * k;
      poly(`leaf${i}-${c}`, [[x, y], [x + side * 0.45, y + 0.12], [x + side * 0.65, y + 0.42], [x + side * 0.25, y + 0.3]], 'good', 0.7, g, false);
    }
    poly(`tipL${i}`, [[x, top], [x - 0.35, top + 0.1], [x - 0.5, top + 0.35], [x - 0.15, top + 0.25]], 'good', 0.7, g, false);
    poly(`tipR${i}`, [[x, top], [x + 0.35, top + 0.1], [x + 0.5, top + 0.35], [x + 0.15, top + 0.25]], 'good', 0.7, g, false);
    Object.assign(points, { [n(`h${i}-at`)]: [x, top + 0.45], [n(`w${i}-at`)]: [x, -0.85] });
    items.push(
      { kind: 'label', id: n(`h${i}`), at: n(`h${i}-at`), tex: `${h}\\text{ cm}`, tone: 'opp', place: 'above' },
      { kind: 'label', id: n(`w${i}`), at: n(`w${i}-at`), tex: o.weeks?.[i] ?? String(i), tone: 'adj', place: 'below', group: n('weeks') },
    );
  });
  points[n('title-at')] = [-0.9, -1.15];
  items.push({ kind: 'label', id: n('title'), at: n('title-at'), tex: '\\text{week}', tone: 'adj', place: 'left', group: n('weeks') });
  return { points, items };
}

/** The same part moved `dx` across and `dy` up, to put two machines in one figure. */
export function shift(p: Part, dx: number, dy: number): Part {
  return { points: Object.fromEntries(Object.entries(p.points).map(([k, [x, y]]) => [k, [x + dx, y + dy] as P])), items: p.items };
}
