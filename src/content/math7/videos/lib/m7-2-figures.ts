/**
 * Figures for the decimals and percents videos (Grade 7, unit 2), built only from standard
 * diagram parts (lines, shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `stack`: a sum of three or more decimals set out in columns, with the decimal points lined up,
 *   carried digits above the top row, a rule and the answer, laid out like the Grade 5 `columns`
 *   (which adds or subtracts two numbers, and is used as it is for those).
 * - `bottles`: a row of bottles filled in turn from a total amount (11.4 L into 1.5 L bottles fills
 *   7 and part of an 8th), to show why a quotient is rounded down.
 * - `tag`: a label (TeX) at a point.
 *
 * Long division comes from `decimalDivision` (`src/content/math6/videos/lib/m6-4-figures.ts`),
 * column multiplication from `columnMultiply` (`src/content/math5/videos/lib/m5-4-figures.ts`),
 * hundred grids and place value charts from the Grade 5 helpers, and fraction strips and area
 * models from `src/video/`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { placeKey } from '@/content/math5/videos/lib/m5-2-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Each digit of a number with its place (0 for the ones, −1 for the tenths). */
function digits(s: string): { d: string; p: number }[] {
  const [whole, frac = ''] = s.split('.');
  return [...[...whole].map((d, i) => ({ d, p: whole.length - 1 - i })), ...[...frac].map((d, i) => ({ d, p: -(i + 1) }))];
}

/**
 * A sum set out in columns: each number in `rows` on its own line with the decimal points lined
 * up, a plus sign before the last, a rule, and the `answer` under it (green). Carried digits
 * (`carries`, by place: 0 the ones, −1 the tenths) sit small and orange above the top row.
 *
 * Ids name places with `placeKey`: `p0` the ones, `p1` the tens, `d1` the tenths. Parts: each row
 * `row<k>` (a group: its digits `r<k>-<key>` and point `r<k>-pt`), `op` (in the last row's group),
 * `bar`, the answer `sum` (a group: digits `s<key>` and point `ps`), each carry `k<key>`, and a
 * shaded highlight for each column `c<key>`.
 */
export function stack(o: { name?: string; rows: string[]; answer?: string; carries?: Record<number, string>; tones?: Record<string, DiagramTone>; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const pw = 0.5;
  const R = 1.25;
  const xOf = (p: number) => x0 + (p >= 0 ? -p : -p + pw);
  const yRow = (k: number) => y0 + (o.rows.length - k) * R;
  const yBar = y0 + 0.62;
  const yTop = yRow(0);
  const yMark = yTop + 0.65;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const all = [...o.rows, ...(o.answer ? [o.answer] : [])].flatMap(digits).map((x) => x.p);
  const hi = Math.max(...all);
  const lo = Math.min(...all);
  for (let p = hi; p >= lo; p--) {
    const x = xOf(p);
    const k = placeKey(p);
    Object.assign(points, { [n(`h${k}a`)]: [x - 0.46, y0 - 0.5], [n(`h${k}b`)]: [x + 0.46, y0 - 0.5], [n(`h${k}c`)]: [x + 0.46, yMark + 0.35], [n(`h${k}d`)]: [x - 0.46, yMark + 0.35] });
    items.push({ kind: 'region', id: n(`c${k}`), points: ['a', 'b', 'c', 'd'].map((c) => n(`h${k}${c}`)), tone: 'theta', shade: 0.14 });
  }
  const label = (id: string, at: P, tex: string, extra: { tone?: DiagramTone; group?: string; place?: Place } = {}) => {
    points[n(id)] = at;
    items.push({ kind: 'label', id: n(id), at: n(id), tex, place: extra.place ?? 'center', tone: extra.tone ?? 'ink', ...(extra.group ? { group: n(extra.group) } : {}) });
  };
  o.rows.forEach((s, k) => {
    const y = yRow(k);
    for (const { d, p } of digits(s)) {
      const id = `r${k}-${placeKey(p)}`;
      label(id, [xOf(p), y], `\\LARGE ${d}`, { tone: o.tones?.[id], group: `row${k}` });
    }
    if (s.includes('.')) label(`r${k}-pt`, [(xOf(0) + xOf(-1)) / 2, y - 0.22], '\\LARGE .', { group: `row${k}` });
  });
  const left = xOf(hi) - 1;
  label('op', [left, yRow(o.rows.length - 1)], '\\LARGE +', { group: `row${o.rows.length - 1}` });
  Object.assign(points, { [n('bar-a')]: [left - 0.45, yBar], [n('bar-b')]: [xOf(lo) + 0.45, yBar] });
  items.push({ kind: 'line', id: n('bar'), from: n('bar-a'), to: n('bar-b'), tone: 'ink', weight: 3.5 });
  if (o.answer) {
    for (const { d, p } of digits(o.answer)) label(`s${placeKey(p)}`, [xOf(p), y0], `\\LARGE ${d}`, { tone: 'good', group: 'sum' });
    if (o.answer.includes('.')) label('ps', [(xOf(0) + xOf(-1)) / 2, y0 - 0.22], '\\LARGE .', { tone: 'good', group: 'sum' });
  }
  for (const [p, d] of Object.entries(o.carries ?? {})) label(`k${placeKey(Number(p))}`, [xOf(Number(p)), yMark], d, { tone: 'opp' });
  return { points, items };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * `count` bottles in a row, each `w` wide and `h` tall with a narrow neck, `gap` apart, filled in
 * turn with `fill` bottles' worth (7.6 fills seven and 0.6 of the eighth). A full bottle is blue;
 * a part-filled one is orange, with `note` (TeX) under it.
 *
 * Parts: each bottle `b<i>` (a group: its outline and filling) and `note`.
 */
export function bottles(o: { name?: string; count: number; fill: number; w?: number; h?: number; gap?: number; note?: string }): Part {
  const n = namer(o.name);
  const w = o.w ?? 1;
  const h = o.h ?? 2.2;
  const gap = o.gap ?? 0.45;
  const neck = 0.32 * w;
  const shoulder = 0.78 * h;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) {
    const x = i * (w + gap);
    const amount = Math.max(0, Math.min(1, o.fill - i));
    const outline: [string, P][] = [
      ['a', [x, 0]],
      ['b', [x + w, 0]],
      ['c', [x + w, shoulder]],
      ['d', [x + w / 2 + neck / 2, h - 0.2]],
      ['e', [x + w / 2 + neck / 2, h]],
      ['f', [x + w / 2 - neck / 2, h]],
      ['g', [x + w / 2 - neck / 2, h - 0.2]],
      ['h', [x, shoulder]],
    ];
    for (const [k, pt] of outline) points[n(`b${i}${k}`)] = pt;
    if (amount > 0) {
      const top = amount * shoulder;
      Object.assign(points, { [n(`f${i}a`)]: [x, 0], [n(`f${i}b`)]: [x + w, 0], [n(`f${i}c`)]: [x + w, top], [n(`f${i}d`)]: [x, top] });
      items.push({ kind: 'region', id: n(`fill${i}`), points: ['a', 'b', 'c', 'd'].map((k) => n(`f${i}${k}`)), tone: amount < 1 ? 'opp' : 'adj', shade: 0.6, group: n(`b${i}`) });
    }
    items.push({ kind: 'curve', id: n(`edge${i}`), points: outline.map(([k]) => n(`b${i}${k}`)), closed: true, tone: 'ink', weight: 2.5, group: n(`b${i}`) });
  }
  if (o.note) {
    const last = Math.ceil(o.fill) - 1;
    points[n('note-at')] = [last * (w + gap) + w / 2, -0.25];
    items.push({ kind: 'label', id: n('note'), at: n('note-at'), tex: o.note, tone: 'opp', place: 'below' });
  }
  return { points, items };
}
