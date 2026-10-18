/**
 * Figures for the probability videos (odds, probability with counting, mutually exclusive events,
 * and independent and dependent events). Like the Math 30-1 helpers, they are built only from
 * standard diagram parts (labels, lines, curves and shaded regions), so each goes into a diagram
 * with `figure`:
 *
 * - `ratioBar`: a bar cut into equal pieces, the favourable ones in one colour and the
 *   unfavourable ones in another, for odds.
 * - `vennBox`: two events as circles in a rectangle of all outcomes, overlapping or apart, with a
 *   number in each region and each region ready to shade.
 * - `probTree`: a tree diagram of two stages, with the probability on each branch and the
 *   product at the end of each path.
 * - `diceGrid`: the 36 outcomes of rolling two dice, with each sum written in its cell.
 * - `deckGrid`: a standard deck of 52 cards as 4 rows of suits and 13 columns of ranks.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Points round a circle from angle `from` through `sweep` (radians), named `<key>0`, `<key>1`… */
function arc(points: Record<string, P>, key: string, c: P, r: number, from: number, sweep: number, steps = 48): string[] {
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = from + (sweep * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    names.push(`${key}${i}`);
  }
  return names;
}

/** The four corners of a rectangle as a shaded region, its points added to `points`. */
function cell(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}a`]: [x0, y0], [`${key}b`]: [x1, y0], [`${key}c`]: [x1, y1], [`${key}d`]: [x0, y1] });
  return ['a', 'b', 'c', 'd'].map((k) => `${key}${k}`);
}

/**
 * A bar cut into `fav + unfav` equal pieces: the first `fav` shaded green (the favourable
 * outcomes) and the other `unfav` shaded red (the unfavourable ones), with a label under each
 * stretch. `pieces` writes a value in every piece (such as 6 marbles a piece).
 *
 * Parts: `frame` (a group: the outline and the cuts), `fav` and `unfav` (groups: each stretch's
 * shading and its label under the bar), and `pieces` (a group: the values in the pieces).
 */
export function ratioBar(o: { name?: string; fav: number; unfav: number; favLabel?: string; unfavLabel?: string; width?: number; height?: number; pieces?: string; favTone?: DiagramTone; unfavTone?: DiagramTone }): Part {
  const n = namer(o.name);
  const parts = o.fav + o.unfav;
  const W = o.width ?? 12;
  const H = o.height ?? 1.3;
  const w = W / parts;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const favTone = o.favTone ?? 'good';
  const unfavTone = o.unfavTone ?? 'bad';
  items.push({ kind: 'region', id: n('fav-shade'), points: cell(points, n('F'), 0, 0, o.fav * w, H), tone: favTone, shade: 0.5, group: n('fav') });
  items.push({ kind: 'region', id: n('unfav-shade'), points: cell(points, n('U'), o.fav * w, 0, W, H), tone: unfavTone, shade: 0.35, group: n('unfav') });
  const frame = cell(points, n('O'), 0, 0, W, H);
  frame.forEach((p, i) => items.push({ kind: 'line', id: n(`side${i}`), from: p, to: frame[(i + 1) % 4], weight: 3, group: n('frame') }));
  for (let i = 1; i < parts; i++) {
    Object.assign(points, { [n(`c${i}a`)]: [i * w, 0], [n(`c${i}b`)]: [i * w, H] });
    items.push({ kind: 'line', id: n(`cut${i}`), from: n(`c${i}a`), to: n(`c${i}b`), weight: i === o.fav ? 3 : 1.5, tone: i === o.fav ? 'ink' : 'muted', group: n('frame') });
  }
  if (o.favLabel) {
    points[n('fl')] = [(o.fav * w) / 2, 0];
    items.push({ kind: 'label', id: n('fav-label'), at: n('fl'), tex: o.favLabel, tone: favTone, place: 'below', group: n('fav') });
  }
  if (o.unfavLabel) {
    points[n('ul')] = [o.fav * w + (o.unfav * w) / 2, 0];
    items.push({ kind: 'label', id: n('unfav-label'), at: n('ul'), tex: o.unfavLabel, tone: unfavTone, place: 'below', group: n('unfav') });
  }
  if (o.pieces) {
    for (let i = 0; i < parts; i++) {
      points[n(`p${i}`)] = [(i + 0.5) * w, H / 2];
      items.push({ kind: 'label', id: n(`piece${i}`), at: n(`p${i}`), tex: o.pieces, tone: 'ink', place: 'center', group: n('pieces') });
    }
  }
  return { points, items };
}

/**
 * Two events as circles inside a rectangle of all the outcomes: overlapping, or `apart` when they
 * are mutually exclusive. `values` writes a number in each region: only A, both, only B, and
 * outside both circles.
 *
 * Parts: `box` (a group: the rectangle and its name), `a` and `b` (groups: each circle and its
 * title), the values `va`, `vab`, `vb` and `vout` (in the group `values`), and the shadings `sa`
 * (A only), `sb` (B only), `sab` (both), `sunion` (A or B) and `sout` (neither); apart, the
 * shadings are `sa` and `sb` (each whole circle) only.
 */
export function vennBox(o: { name?: string; titles: [string, string]; values?: { a?: string; both?: string; b?: string; out?: string }; apart?: boolean; universe?: string }): Part {
  const n = namer(o.name);
  // Room above the circles for their titles, and in the corners for the name and the value outside.
  const R = 2.7;
  const d = o.apart ? R + 0.45 : 1.7;
  const W = 2 * (d + R) + (o.apart ? 2.4 : 2.6);
  const H = 2 * R + 3.6;
  const cy = R + 1.4;
  const A: P = [W / 2 - d, cy];
  const B: P = [W / 2 + d, cy];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const box = cell(points, n('R'), 0, 0, W, H);
  const shade = (id: string, pts: string[], tone: DiagramTone, s = 0.3): DiagramItem => ({ kind: 'region', id: n(id), points: pts, tone, shade: s });
  if (o.apart) {
    items.push(shade('sa', arc(points, n('fa'), A, R, 0, 2 * Math.PI, 72).slice(0, -1), 'adj'));
    items.push(shade('sb', arc(points, n('fb'), B, R, 0, 2 * Math.PI, 72).slice(0, -1), 'opp'));
  } else {
    // The circles cross at angle ±t from A's centre, and π ∓ t from B's.
    const t = Math.acos(d / R);
    const aOut = () => arc(points, n(`ao${items.length}-`), A, R, t, 2 * Math.PI - 2 * t);
    const bOut = () => arc(points, n(`bo${items.length}-`), B, R, t - Math.PI, 2 * Math.PI - 2 * t);
    const aIn = () => arc(points, n(`ai${items.length}-`), A, R, t, -2 * t, 24);
    const bIn = () => arc(points, n(`bi${items.length}-`), B, R, Math.PI + t, -2 * t, 24);
    items.push(shade('sa', [...aOut(), ...bIn()], 'adj'));
    items.push(shade('sb', [...bOut(), ...aIn()], 'opp'));
    items.push(shade('sab', [...arc(points, n('l1-'), A, R, -t, 2 * t, 24), ...arc(points, n('l2-'), B, R, Math.PI - t, 2 * t, 24)], 'good', 0.35));
    items.push(shade('sunion', [...aOut(), ...bOut()], 'brand', 0.3));
    // Neither: the rectangle (clockwise) with the union (anticlockwise) cut out of it through a slit.
    const union = [...aOut(), ...bOut()];
    items.push(shade('sout', [box[3], box[2], box[1], box[0], box[3], ...union, union[0]], 'muted', 0.3));
  }
  box.forEach((p, i) => items.push({ kind: 'line', id: n(`side${i}`), from: p, to: box[(i + 1) % 4], tone: 'muted', weight: 2.5, group: n('box') }));
  points[n('U')] = [0.15, H - 0.15];
  items.push({ kind: 'label', id: n('U-label'), at: n('U'), tex: o.universe ?? 'U', tone: 'muted', place: 'below right', group: n('box') });
  for (const [key, c, tone, title, shift] of [
    ['a', A, 'adj', o.titles[0], o.apart ? 0 : -0.35],
    ['b', B, 'opp', o.titles[1], o.apart ? 0 : 0.35],
  ] as const) {
    items.push({ kind: 'curve', id: n(`${key}-outline`), points: arc(points, n(`c${key}`), c, R, 0, 2 * Math.PI, 72).slice(0, -1), closed: true, tone, weight: 3.5, group: n(key) });
    // Each title sits above its circle, nudged outward, so two long titles stay apart.
    points[n(`${key}-t`)] = [c[0] + shift * R, c[1] + R + 0.05];
    items.push({ kind: 'label', id: n(`${key}-title`), at: n(`${key}-t`), tex: title, tone, place: 'above', group: n(key) });
  }
  const v = o.values ?? {};
  const at: Record<'va' | 'vab' | 'vb' | 'vout', P> = o.apart
    ? { va: A, vab: [W / 2, cy], vb: B, vout: [W / 2, 0.12] }
    : { va: [W / 2 - R, cy], vab: [W / 2, cy], vb: [W / 2 + R, cy], vout: [W - 0.12, 0.12] };
  for (const [id, tex] of [['va', v.a], ['vab', v.both], ['vb', v.b], ['vout', v.out]] as const) {
    if (!tex) continue;
    points[n(id)] = at[id];
    // The value outside both circles sits under the gap between them, or in the bottom right
    // corner when they overlap, growing inward.
    const place = id !== 'vout' ? 'center' : o.apart ? 'above' : 'above left';
    items.push({ kind: 'label', id: n(id), at: n(id), tex, tone: 'ink', place, group: n('values') });
  }
  return { points, items };
}

/** One outcome of a stage of a tree diagram: its name (TeX), its tone, and its probability (TeX). */
export interface Branch {
  name: string;
  p: string;
  tone?: DiagramTone;
}

/**
 * A tree diagram of two stages, drawn left to right: a branch from the start to each outcome of
 * the first stage, then from each of those a branch to each outcome of the second stage (which
 * can depend on the first: `second[i]` follows `first[i]`). Each branch carries its probability.
 * `ends` writes something at the end of each path, in order from the top (its product).
 * `gap` spaces the ends of the paths, and `groupGap` adds room between the groups of branches
 * that leave each first outcome, so that their labels stay apart.
 *
 * Parts: `start`; the first branches `b0`, `b1`… with their outcomes `n0`, `n1`… (group `s1`);
 * the branches after outcome i, `b<i>-0`, `b<i>-1`…, with their outcomes `n<i>-0`… (group
 * `s2-<i>`, and all of them `s2`); and the ends `e<i>-<j>` (group `ends`).
 */
export function probTree(o: { name?: string; first: Branch[]; second: Branch[][]; ends?: string[]; gap?: number; groupGap?: number; room?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1.6;
  const room = o.room ?? 1.5;
  const groupGap = o.groupGap ?? 0;
  const leaves = o.second.reduce((k, s) => k + s.length, 0);
  const top = (leaves - 1) * gap + (o.first.length - 1) * groupGap;
  const [x1, x3] = [4, 4 + room + 4];
  const x2 = x1 + room;
  const xEnd = x3 + room + 0.4;
  // The edge points belong to no part: they widen the figure to hold "Start" and the end labels.
  const points: Record<string, P> = { [n('S')]: [0, top / 2], [n('edge-l')]: [-1.4, top / 2], [n('edge-r')]: [xEnd + (o.ends ? 2.9 : 1.6), top / 2] };
  const items: DiagramItem[] = [{ kind: 'label', id: n('start'), at: n('S'), tex: '\\text{Start}', tone: 'muted', place: 'left' }];
  let leaf = 0;
  let end = 0;
  o.first.forEach((f, i) => {
    const ys = o.second[i].map((_, j) => top - (leaf + j) * gap - i * groupGap);
    const y = (ys[0] + ys[ys.length - 1]) / 2;
    points[n(`F${i}`)] = [x1, y];
    points[n(`G${i}`)] = [x2, y];
    const up = y >= top / 2;
    items.push(
      { kind: 'line', id: n(`b${i}`), from: n('S'), to: n(`F${i}`), tone: 'muted', weight: 3, label: f.p, labelSide: up ? 'left' : 'right', group: n('s1') },
      { kind: 'label', id: n(`n${i}`), at: n(`F${i}`), tex: f.name, tone: f.tone ?? 'ink', place: 'right', group: n('s1') },
    );
    o.second[i].forEach((s, j) => {
      const id = `${i}-${j}`;
      points[n(`T${id}`)] = [x3, ys[j]];
      points[n(`E${id}`)] = [xEnd, ys[j]];
      const rising = ys[j] >= y;
      items.push(
        { kind: 'line', id: n(`b${id}`), from: n(`G${i}`), to: n(`T${id}`), tone: 'muted', weight: 3, label: s.p, labelSide: rising ? 'left' : 'right', group: n(`s2-${i}`) },
        { kind: 'label', id: n(`n${id}`), at: n(`T${id}`), tex: s.name, tone: s.tone ?? 'ink', place: 'right', group: n(`s2-${i}`) },
      );
      const e = o.ends?.[end++];
      if (e) items.push({ kind: 'label', id: n(`e${id}`), at: n(`E${id}`), tex: e, tone: 'theta', place: 'right', group: n('ends') });
    });
    leaf += o.second[i].length;
  });
  return { points, items };
}

/**
 * The 36 equally likely outcomes of rolling two dice: the first die down the left, the second
 * along the top, and the sum in each cell. Cells listed in `marks` are shaded, each list as a
 * group by its id.
 *
 * Parts: `grid` (a group: the lines), `heads` (a group: the numbers 1 to 6 and the two titles),
 * `sums` (a group: every sum; one sum is `s<row>-<col>`, counting from 1), and each mark by its id
 * (a group of shaded cells).
 */
export function diceGrid(o: { name?: string; marks?: { id: string; cells: [number, number][]; tone: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Row r (1 to 6) runs from y = 6 - r to 7 - r; column c from x = c - 1 to c.
  for (const m of o.marks ?? []) {
    m.cells.forEach(([r, c]) => {
      items.push({ kind: 'region', id: n(`${m.id}-${r}-${c}`), points: cell(points, n(`M${m.id}${r}-${c}`), c - 1, 6 - r, c, 7 - r), tone: m.tone, shade: 0.45, group: n(m.id) });
    });
  }
  for (let i = 0; i <= 6; i++) {
    Object.assign(points, { [n(`h${i}a`)]: [0, i], [n(`h${i}b`)]: [6, i], [n(`v${i}a`)]: [i, 0], [n(`v${i}b`)]: [i, 6] });
    items.push(
      { kind: 'line', id: n(`h${i}`), from: n(`h${i}a`), to: n(`h${i}b`), tone: 'muted', weight: i % 6 === 0 ? 2.5 : 1.5, group: n('grid') },
      { kind: 'line', id: n(`v${i}`), from: n(`v${i}a`), to: n(`v${i}b`), tone: 'muted', weight: i % 6 === 0 ? 2.5 : 1.5, group: n('grid') },
    );
  }
  for (let k = 1; k <= 6; k++) {
    Object.assign(points, { [n(`top${k}`)]: [k - 0.5, 6.45], [n(`left${k}`)]: [-0.45, 6.5 - k] });
    items.push(
      { kind: 'label', id: n(`top${k}`), at: n(`top${k}`), tex: String(k), tone: 'opp', place: 'center', group: n('heads') },
      { kind: 'label', id: n(`left${k}`), at: n(`left${k}`), tex: String(k), tone: 'adj', place: 'center', group: n('heads') },
    );
    for (let c = 1; c <= 6; c++) {
      points[n(`S${k}-${c}`)] = [c - 0.5, 6.5 - k];
      items.push({ kind: 'label', id: n(`s${k}-${c}`), at: n(`S${k}-${c}`), tex: String(k + c), tone: 'ink', place: 'center', group: n('sums') });
    }
  }
  Object.assign(points, { [n('tt')]: [3, 6.9], [n('lt')]: [-0.9, 3] });
  items.push(
    { kind: 'label', id: n('top-title'), at: n('tt'), tex: '\\text{Second die}', tone: 'opp', place: 'above', group: n('heads') },
    { kind: 'label', id: n('left-title'), at: n('lt'), tex: '\\text{First die}', tone: 'adj', place: 'left', group: n('heads') },
  );
  return { points, items };
}

/** The ranks and suits of a standard deck, in the order `deckGrid` draws them. */
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS: [string, DiagramTone][] = [
  ['\\spadesuit', 'ink'],
  ['\\heartsuit', 'bad'],
  ['\\diamondsuit', 'bad'],
  ['\\clubsuit', 'ink'],
];

/**
 * A standard deck of 52 cards: a row for each suit (spades, hearts, diamonds, clubs, from the top)
 * and a column for each rank (A, 2, … 10, J, Q, K). Cells listed in `marks` ([row, column],
 * counting from 0) are shaded, each list as a group by its id; `ring` outlines its cells as well.
 *
 * Parts: `grid` (a group: the lines), `heads` (a group: the ranks and the suits), and each mark by
 * its id (a group of shaded cells).
 */
export function deckGrid(o: { name?: string; marks?: { id: string; cells: [number, number][]; tone: DiagramTone; shade?: number }[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Row r (0 to 3, from the top) runs from y = 3 - r to 4 - r; column c from x = c to c + 1.
  for (const m of o.marks ?? []) {
    m.cells.forEach(([r, c]) => {
      items.push({ kind: 'region', id: n(`${m.id}-${r}-${c}`), points: cell(points, n(`M${m.id}${r}-${c}`), c, 3 - r, c + 1, 4 - r), tone: m.tone, shade: m.shade ?? 0.5, group: n(m.id) });
    });
  }
  for (let i = 0; i <= 4; i++) {
    Object.assign(points, { [n(`h${i}a`)]: [0, i], [n(`h${i}b`)]: [13, i] });
    items.push({ kind: 'line', id: n(`h${i}`), from: n(`h${i}a`), to: n(`h${i}b`), tone: 'muted', weight: i % 4 === 0 ? 2.5 : 1.5, group: n('grid') });
  }
  for (let i = 0; i <= 13; i++) {
    Object.assign(points, { [n(`v${i}a`)]: [i, 0], [n(`v${i}b`)]: [i, 4] });
    items.push({ kind: 'line', id: n(`v${i}`), from: n(`v${i}a`), to: n(`v${i}b`), tone: 'muted', weight: i % 13 === 0 ? 2.5 : 1.5, group: n('grid') });
  }
  RANKS.forEach((r, c) => {
    points[n(`rank${c}`)] = [c + 0.5, 4.5];
    items.push({ kind: 'label', id: n(`rank${c}`), at: n(`rank${c}`), tex: `\\text{${r}}`, tone: 'ink', place: 'center', group: n('heads') });
  });
  SUITS.forEach(([s, tone], r) => {
    points[n(`suit${r}`)] = [-0.55, 3.5 - r];
    items.push({ kind: 'label', id: n(`suit${r}`), at: n(`suit${r}`), tex: s, tone, place: 'center', group: n('heads') });
  });
  return { points, items };
}

/** The cells of whole rows and columns of a `deckGrid`, for its marks. */
export function deckCells(o: { rows?: number[]; cols?: number[]; only?: { rows: number[]; cols: number[] } }): [number, number][] {
  const out: [number, number][] = [];
  for (const r of o.rows ?? []) for (let c = 0; c < 13; c++) out.push([r, c]);
  for (const c of o.cols ?? []) for (let r = 0; r < 4; r++) out.push([r, c]);
  if (o.only) for (const r of o.only.rows) for (const c of o.only.cols) out.push([r, c]);
  return out;
}
