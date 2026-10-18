/**
 * Helpers for the applications-of-derivatives videos (tangent lines, extreme values, concavity and
 * curve sketching, motion along a line). The graph helpers are shared with the Unit 5 videos
 * (`m31-5-graphs.ts`: `tangent`, `rename`, `note`, `edgeNumbers`…); this file adds the figures
 * drawn beside or under a graph:
 *
 * - `signChart`: a sign chart, a number line cut at the critical numbers, with the sign of a
 *   derivative on each interval and what it means underneath (rising or falling, concave up or down).
 * - `path`: the path of an object moving along a line, as arrows above a number line, one for each
 *   leg of the trip between turning points.
 *
 * Both are drawn in their own units (about one unit per line of text), so they go into a diagram
 * on their own, or beside a graph at `at`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

export * from './m31-5-graphs.ts';

type P = [number, number];

/**
 * A sign chart: a number line of length `width` from `at`, cut at evenly spaced marks (the
 * critical numbers, labelled with `marks` in TeX underneath), with the sign of each interval above
 * the line (`+` green, `-` red, drawn large) and an optional note under each interval (`notes`, TeX, such as
 * `\nearrow` or `\text{concave up}`). The `title` (TeX, such as `f'(x)`) sits at the left end.
 *
 * Parts, prefixed with `name`: `line` and `title` (the group `base`), each mark `k0`, `k1`… (its
 * tick and label, the groups `mk0`, `mk1`…), and each interval's sign and note (the groups `i0`,
 * `i1`…).
 */
export function signChart(o: { name: string; at?: P; width?: number; title: string; marks: string[]; signs: ('+' | '-')[]; notes?: string[]; noteTone?: DiagramTone; markTone?: DiagramTone }): Part {
  const n = (s: string) => `${o.name}-${s}`;
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 10;
  const k = o.marks.length + 1;
  const xAt = (i: number) => x0 + (W * i) / k;
  const points: Record<string, P> = { [n('a')]: [x0, y0], [n('b')]: [x0 + W, y0], [n('t')]: [x0 - 0.3, y0] };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('line'), from: n('a'), to: n('b'), tone: 'ink', weight: 2.5, group: n('base') },
    { kind: 'label', id: n('title'), at: n('t'), tex: o.title, tone: 'ink', place: 'left', group: n('base') },
  ];
  o.marks.forEach((tex, i) => {
    const x = xAt(i + 1);
    Object.assign(points, { [n(`k${i}a`)]: [x, y0 - 0.32], [n(`k${i}b`)]: [x, y0 + 0.32] });
    items.push(
      { kind: 'line', id: n(`k${i}`), from: n(`k${i}a`), to: n(`k${i}b`), tone: o.markTone ?? 'theta', weight: 3, group: n(`mk${i}`) },
      { kind: 'label', id: n(`k${i}t`), at: n(`k${i}a`), tex, tone: o.markTone ?? 'theta', place: 'below', group: n(`mk${i}`) },
    );
  });
  o.signs.forEach((sign, i) => {
    const x = (xAt(i) + xAt(i + 1)) / 2;
    points[n(`s${i}`)] = [x, y0 + 0.62];
    items.push({ kind: 'label', id: n(`s${i}`), at: n(`s${i}`), tex: sign === '+' ? '\\Large +' : '\\Large -', tone: sign === '+' ? 'good' : 'bad', place: 'center', group: n(`i${i}`) });
    const note = o.notes?.[i];
    if (note) {
      points[n(`n${i}`)] = [x, y0 - 1.7];
      items.push({ kind: 'label', id: n(`n${i}`), at: n(`n${i}`), tex: note, tone: o.noteTone ?? 'ink', place: 'center', group: n(`i${i}`) });
    }
  });
  return { points, items };
}

/**
 * The path of an object along a number line: the line from `from` to `to` (in the object's units),
 * `width` long, numbered every `step` underneath, with an arrow above it for each leg of the trip,
 * one above the other, from the first leg (lowest) to the last, each labelled (TeX) at its middle.
 * Dots mark where each leg starts and ends.
 *
 * Parts: `axis` (a group: the line and its numbers), each leg `leg0`, `leg1`… (a group of its
 * arrow `leg0-a`, its label and its end dots).
 */
export function path(o: { from: number; to: number; step: number; width?: number; legs: { from: number; to: number; label?: string; tone?: DiagramTone }[]; unit?: string }): Part {
  const W = o.width ?? 10;
  const X = (v: number) => ((v - o.from) / (o.to - o.from)) * W;
  const points: Record<string, P> = { 'ax-a': [-0.3, 0], 'ax-b': [W + 0.5, 0] };
  const items: DiagramItem[] = [{ kind: 'line', id: 'ax', from: 'ax-a', to: 'ax-b', tone: 'muted', weight: 2.5, arrow: true, group: 'axis' }];
  for (let v = o.from, i = 0; v <= o.to + 1e-9; v += o.step, i++) {
    Object.assign(points, { [`tk${i}a`]: [X(v), -0.15], [`tk${i}b`]: [X(v), 0.15] });
    items.push(
      { kind: 'line', id: `tk${i}`, from: `tk${i}a`, to: `tk${i}b`, tone: 'muted', weight: 2, group: 'axis' },
      { kind: 'label', id: `tk${i}t`, at: `tk${i}a`, tex: String(Number(v.toFixed(6))), tone: 'muted', place: 'below', group: 'axis' },
    );
  }
  if (o.unit) {
    points['unit'] = [W + 0.5, 0];
    items.push({ kind: 'label', id: 'unit-t', at: 'unit', tex: o.unit, tone: 'muted', place: 'right', group: 'axis' });
  }
  o.legs.forEach((leg, i) => {
    const y = 1 + 1.5 * i;
    const g = `leg${i}`;
    const tone = leg.tone ?? 'brand';
    Object.assign(points, { [`${g}-p`]: [X(leg.from), y], [`${g}-q`]: [X(leg.to), y], [`${g}-m`]: [(X(leg.from) + X(leg.to)) / 2, y + 0.05] });
    items.push(
      { kind: 'line', id: `${g}-a`, from: `${g}-p`, to: `${g}-q`, tone, weight: 4, arrow: true, group: g },
      { kind: 'label', id: `${g}-d`, at: `${g}-p`, tex: '', tone, dot: true, group: g },
    );
    if (leg.label) items.push({ kind: 'label', id: `${g}-t`, at: `${g}-m`, tex: leg.label, tone, place: 'above', group: g });
  });
  return { points, items };
}
