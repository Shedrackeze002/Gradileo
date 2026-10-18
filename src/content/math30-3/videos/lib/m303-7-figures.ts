/**
 * Figures for the probability videos (probability and odds, and combined events), built only from
 * standard diagram parts (labels, lines, curves and shaded regions), so each goes into a diagram
 * with `figure`. The bars, bags, Venn diagrams and tree diagrams of the Math 30-2 probability
 * videos (`../../math30-2/videos/lib/m302-3-figures.ts`) are used as they are; these add:
 *
 * - `shareBar`: a bar split in proportion to two counts, for odds with large numbers (4 tickets
 *   out of 250), where a bar of equal pieces would have too many cuts to read.
 * - `coins`: a row of coin tosses, each a circle with H or T in it (or a question mark).
 * - `headedTree`: a two-stage tree diagram (`probTree`) with a heading over each stage, so the
 *   outcomes can be short ("Rain", "Dry") and stay clear of the branches.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { probTree, type Branch } from '../../../math30-2/videos/lib/m302-3-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The four corners of a rectangle, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}a`]: [x0, y0], [`${key}b`]: [x1, y0], [`${key}c`]: [x1, y1], [`${key}d`]: [x0, y1] });
  return ['a', 'b', 'c', 'd'].map((k) => `${key}${k}`);
}

/**
 * A bar `width` long split in proportion to `fav` and `unfav`: the favourable stretch on the left
 * (green) and the unfavourable stretch on the right (red), with no cuts. Each stretch has a label:
 * under its middle, or above it when `favAbove` is set (for a stretch too thin to hold a label
 * underneath next to its neighbour's). `total` writes a label above the middle of the whole bar.
 *
 * Parts: `frame` (a group: the outline and the line between the stretches), `fav` and `unfav`
 * (groups: each stretch's shading and its label), and `total`.
 */
export function shareBar(o: { name?: string; fav: number; unfav: number; favLabel?: string; unfavLabel?: string; total?: string; width?: number; height?: number; favAbove?: boolean; favTone?: DiagramTone; unfavTone?: DiagramTone }): Part {
  const n = namer(o.name);
  const W = o.width ?? 12;
  const H = o.height ?? 1.2;
  const split = (W * o.fav) / (o.fav + o.unfav);
  const favTone = o.favTone ?? 'good';
  const unfavTone = o.unfavTone ?? 'bad';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  items.push({ kind: 'region', id: n('fav-shade'), points: rect(points, n('F'), 0, 0, split, H), tone: favTone, shade: 0.75, group: n('fav') });
  items.push({ kind: 'region', id: n('unfav-shade'), points: rect(points, n('U'), split, 0, W, H), tone: unfavTone, shade: 0.35, group: n('unfav') });
  const frame = rect(points, n('O'), 0, 0, W, H);
  frame.forEach((p, i) => items.push({ kind: 'line', id: n(`side${i}`), from: p, to: frame[(i + 1) % 4], weight: 3, group: n('frame') }));
  Object.assign(points, { [n('cut-a')]: [split, 0], [n('cut-b')]: [split, H] });
  items.push({ kind: 'line', id: n('cut'), from: n('cut-a'), to: n('cut-b'), weight: 3, group: n('frame') });
  if (o.favLabel) {
    points[n('fl')] = o.favAbove ? [split / 2, H] : [split / 2, 0];
    items.push({ kind: 'label', id: n('fav-label'), at: n('fl'), tex: o.favLabel, tone: favTone, place: o.favAbove ? 'above right' : 'below', group: n('fav') });
  }
  if (o.unfavLabel) {
    points[n('ul')] = [split + (W - split) / 2, 0];
    items.push({ kind: 'label', id: n('unfav-label'), at: n('ul'), tex: o.unfavLabel, tone: unfavTone, place: 'below', group: n('unfav') });
  }
  if (o.total) {
    points[n('tl')] = [W / 2, H];
    items.push({ kind: 'label', id: n('total'), at: n('tl'), tex: o.total, tone: 'ink', place: 'above' });
  }
  return { points, items };
}

/**
 * A two-stage tree diagram (see `probTree`), with `heads` (TeX) written above the outcomes of the
 * first and the second stage, such as Saturday and Sunday.
 *
 * Parts: those of `probTree`, and `heads` (a group: the two headings).
 */
export function headedTree(o: { first: Branch[]; second: Branch[][]; ends?: string[]; heads: [string, string]; gap?: number; groupGap?: number; room?: number }): Part {
  const tree = probTree({ first: o.first, second: o.second, ends: o.ends, gap: o.gap, groupGap: o.groupGap, room: o.room });
  // The same layout as probTree: the first outcomes at x = 4 and the second at x = 8 + room.
  const gap = o.gap ?? 1.6;
  const room = o.room ?? 1.5;
  const leaves = o.second.reduce((k, s) => k + s.length, 0);
  const top = (leaves - 1) * gap + (o.first.length - 1) * (o.groupGap ?? 0);
  const points: Record<string, P> = { 'head-1': [4.7, top + 0.75], 'head-2': [8.7 + room, top + 0.75] };
  const items: DiagramItem[] = [
    { kind: 'label', id: 'head1', at: 'head-1', tex: o.heads[0], tone: 'muted', place: 'above', group: 'heads' },
    { kind: 'label', id: 'head2', at: 'head-2', tex: o.heads[1], tone: 'muted', place: 'above', group: 'heads' },
  ];
  return { points: { ...tree.points, ...points }, items: [...tree.items, ...items] };
}

/**
 * A row of coin tosses: a circle for each face in `faces` ('H', 'T' or '?'), heads in blue, tails
 * in orange and a question mark in yellow.
 *
 * Parts: each coin `c0`, `c1`… from the left (a group: its disc, its edge and its letter).
 */
export function coins(o: { name?: string; faces: string[]; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1.25;
  const r = 0.5;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.faces.forEach((f, k) => {
    const cx = k * gap;
    const ring: string[] = [];
    for (let j = 0; j < 32; j++) {
      const t = (2 * Math.PI * j) / 32;
      points[n(`c${k}-${j}`)] = [cx + r * Math.cos(t), r * Math.sin(t)];
      ring.push(n(`c${k}-${j}`));
    }
    points[n(`c${k}-m`)] = [cx, 0];
    const tone: DiagramTone = f === 'H' ? 'adj' : f === 'T' ? 'opp' : 'theta';
    items.push(
      { kind: 'region', id: n(`c${k}-f`), points: ring, tone, shade: 0.25, group: n(`c${k}`) },
      { kind: 'curve', id: n(`c${k}-e`), points: ring, closed: true, tone, weight: 3, group: n(`c${k}`) },
      { kind: 'label', id: n(`c${k}-t`), at: n(`c${k}-m`), tex: `\\text{${f}}`, tone, place: 'center', group: n(`c${k}`) },
    );
  });
  return { points, items };
}
