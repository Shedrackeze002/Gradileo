/**
 * Figures for the ratio and percentage videos, built only from standard diagram parts (labels,
 * lines, curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `counters`: rows of round counters in groups of different colours (red and blue marbles,
 *   apples, pears and bananas), with a bracket and a name under each group and under the whole.
 * - `hundredGrid`: a grid of squares (10 by 10 for a percentage) with some shaded, in reading
 *   order from the top left; squares can be grouped into blocks (a column of 10 for each free
 *   throw, a block of 4 for each student) to show a whole that is not 100 made into 100.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Points round a circle, added to `points` as `<key>0`, `<key>1`…, in order. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 20): string[] {
  const names: string[] = [];
  for (let j = 0; j < steps; j++) {
    const t = (2 * Math.PI * j) / steps;
    points[`${key}${j}`] = [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
    names.push(`${key}${j}`);
  }
  return names;
}

/** A bracket under a stretch from x0 to x1 at height y (a line with a short tick at each end), with a label under it. */
function bracket(points: Record<string, P>, n: (s: string) => string, id: string, x0: number, x1: number, y: number, tex: string, tone: DiagramTone, group: string): DiagramItem[] {
  const t = 0.18;
  Object.assign(points, {
    [n(`${id}-a`)]: [x0, y],
    [n(`${id}-b`)]: [x1, y],
    [n(`${id}-a2`)]: [x0, y + t],
    [n(`${id}-b2`)]: [x1, y + t],
    [n(`${id}-m`)]: [(x0 + x1) / 2, y],
  });
  return [
    { kind: 'line', id: n(`${id}-line`), from: n(`${id}-a`), to: n(`${id}-b`), tone, weight: 2.5, group },
    { kind: 'line', id: n(`${id}-ta`), from: n(`${id}-a`), to: n(`${id}-a2`), tone, weight: 2.5, group },
    { kind: 'line', id: n(`${id}-tb`), from: n(`${id}-b`), to: n(`${id}-b2`), tone, weight: 2.5, group },
    { kind: 'label', id: n(`${id}-label`), at: n(`${id}-m`), tex, tone, place: 'below', group },
  ];
}

/**
 * Counters in groups side by side: each group is `count` counters of one colour, in rows of
 * `perRow` (the group's own, or the figure's; one row unless set), with `gap` between groups. A
 * `hollow` group is drawn as open rings, like the white counters in the lessons. `label` writes a
 * name under a group, on a bracket; `spans` write a name under several groups side by side (from
 * group `from` to group `to`, counted from 0), on a longer bracket below; and `whole` writes a
 * name under all the counters.
 *
 * Parts: each group by its `id` (a group: its counters), its name `<id>-tag` (a group: the
 * bracket and label), each span by its `id` (a group), and `whole` (a group: the long bracket
 * and its label).
 */
export function counters(o: {
  name?: string;
  groups: { id: string; count: number; tone: DiagramTone; label?: string; hollow?: boolean; perRow?: number }[];
  perRow?: number;
  gap?: number;
  r?: number;
  spans?: { id: string; from: number; to: number; label: string; tone?: DiagramTone }[];
  whole?: string;
}): Part {
  const n = namer(o.name);
  const r = o.r ?? 0.36;
  const step = 1;
  const gap = o.gap ?? 0.7;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = 0;
  let bottom = 0;
  const tags: DiagramItem[] = [];
  const spans: [number, number][] = [];
  for (const g of o.groups) {
    const per = g.perRow ?? o.perRow ?? g.count;
    const rows = Math.ceil(g.count / per);
    const cols = Math.min(per, g.count);
    for (let k = 0; k < g.count; k++) {
      const c: P = [x + (k % per) * step, (rows - 1 - Math.floor(k / per)) * step];
      const pts = ring(points, n(`${g.id}${k}-`), c, r);
      if (!g.hollow) items.push({ kind: 'region', id: n(`${g.id}${k}`), points: pts, tone: g.tone, shade: 0.6, group: n(g.id) });
      items.push({ kind: 'curve', id: n(`${g.id}${k}-e`), points: pts, closed: true, tone: g.tone, weight: 3, group: n(g.id) });
    }
    spans.push([x - r, x + (cols - 1) * step + r]);
    if (g.label) tags.push(...bracket(points, n, `${g.id}-br`, x - r, x + (cols - 1) * step + r, -r - 0.3, g.label, g.tone, n(`${g.id}-tag`)));
    bottom = Math.min(bottom, -r - 0.3);
    x += cols * step + gap;
  }
  items.push(...tags);
  const y = o.groups.some((g) => g.label) ? bottom - 1.15 : bottom;
  for (const sp of o.spans ?? []) items.push(...bracket(points, n, `${sp.id}-br`, spans[sp.from][0], spans[sp.to][1], y, sp.label, sp.tone ?? 'ink', n(sp.id)));
  if (o.whole) items.push(...bracket(points, n, 'whole-br', spans[0][0], spans[spans.length - 1][1], o.spans?.length ? y - 1.15 : y, o.whole, 'ink', n('whole')));
  return { points, items };
}

/**
 * A grid `cols` squares wide and `rows` squares tall (10 by 10 unless set), each `size` units,
 * with its top left corner at `at`. The squares are grouped into blocks `block` squares wide and
 * tall (single squares unless set), and the first `shaded` blocks are shaded, in reading order:
 * along the top row of blocks from the left, then the next row. With `restTone`, the other
 * blocks are shaded too, in that colour.
 *
 * Parts: `grid` (the thin lines between squares), `blocks` (the thicker lines between blocks,
 * when a block is more than one square; a column of 10 has only thick lines between columns), `outline` (a group), `shade` (a group: the shaded
 * blocks) and `rest` (a group: the other blocks, with `restTone`).
 */
export function hundredGrid(o: { name?: string; cols?: number; rows?: number; size?: number; block?: [number, number]; shaded: number; tone?: DiagramTone; restTone?: DiagramTone; at?: P }): Part {
  const n = namer(o.name);
  const cols = o.cols ?? 10;
  const rows = o.rows ?? 10;
  const s = o.size ?? 1;
  const [bw, bh] = o.block ?? [1, 1];
  const [x0, top] = o.at ?? [0, 0];
  const W = cols * s;
  const H = rows * s;
  const per = cols / bw;
  const blockRows = rows / bh;
  const blocky = bw * bh > 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const rect = (id: string, xa: number, ya: number, xb: number, yb: number, tone: DiagramTone, group: string) => {
    Object.assign(points, { [n(`${id}a`)]: [xa, ya], [n(`${id}b`)]: [xb, ya], [n(`${id}c`)]: [xb, yb], [n(`${id}d`)]: [xa, yb] });
    items.push({ kind: 'region', id: n(id), points: ['a', 'b', 'c', 'd'].map((k) => n(`${id}${k}`)), tone, shade: 0.55, group });
  };
  const full = Math.floor(o.shaded / per);
  const rem = o.shaded % per;
  const tone = o.tone ?? 'theta';
  // The shaded blocks: the full rows of blocks, then the start of the next row.
  if (full > 0) rect('s-full', x0, top, x0 + W, top - full * bh * s, tone, n('shade'));
  if (rem > 0) rect('s-part', x0, top - full * bh * s, x0 + rem * bw * s, top - (full + 1) * bh * s, tone, n('shade'));
  if (o.restTone) {
    if (rem > 0) rect('r-part', x0 + rem * bw * s, top - full * bh * s, x0 + W, top - (full + 1) * bh * s, o.restTone, n('rest'));
    const below = full + (rem > 0 ? 1 : 0);
    if (below < blockRows) rect('r-full', x0, top - below * bh * s, x0 + W, top - H, o.restTone, n('rest'));
  }
  for (let i = 1; i < cols; i++) {
    const thick = blocky && i % bw === 0;
    Object.assign(points, { [n(`x${i}a`)]: [x0 + i * s, top], [n(`x${i}b`)]: [x0 + i * s, top - H] });
    items.push({ kind: 'line', id: n(`gx${i}`), from: n(`x${i}a`), to: n(`x${i}b`), tone: thick ? 'ink' : 'muted', weight: thick ? 2.5 : 1.2, group: n(thick ? 'blocks' : 'grid') });
  }
  for (let j = 1; j < rows; j++) {
    const thick = blocky && j % bh === 0;
    Object.assign(points, { [n(`y${j}a`)]: [x0, top - j * s], [n(`y${j}b`)]: [x0 + W, top - j * s] });
    items.push({ kind: 'line', id: n(`gy${j}`), from: n(`y${j}a`), to: n(`y${j}b`), tone: thick ? 'ink' : 'muted', weight: thick ? 2.5 : 1.2, group: n(thick ? 'blocks' : 'grid') });
  }
  Object.assign(points, { [n('oA')]: [x0, top], [n('oB')]: [x0 + W, top], [n('oC')]: [x0 + W, top - H], [n('oD')]: [x0, top - H] });
  items.push({ kind: 'curve', id: n('edge'), points: ['oA', 'oB', 'oC', 'oD'].map(n), closed: true, tone: 'ink', weight: 3, group: n('outline') });
  return { points, items };
}

/** A label (TeX) at a point, for a caption beside or under a figure. */
export function caption(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: 'above' | 'below' | 'left' | 'right' | 'center' }): Part {
  const n = namer(o.name);
  return { points: { [n(`${o.id}-at`)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center' }] };
}
