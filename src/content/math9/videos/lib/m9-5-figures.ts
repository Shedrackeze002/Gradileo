/**
 * Figures for the polynomials videos, built only from standard diagram parts (shaded regions,
 * outlines and labels), so each goes into a diagram with `figure`:
 *
 * - `tile`: one algebra tile: a big blue square for x², a long green rectangle for x and a small
 *   orange square for 1, each red when it is negative, with its value written on it.
 * - `tileRow`: blocks of tiles side by side, such as the tiles for 2x² + 3x − 4.
 * - `pairRows`: positive tiles in a top row and negative tiles in a bottom row, each kind in its
 *   own stretch, so a positive tile sits right above the negative tile it makes a zero pair with,
 *   and a dashed ring round each zero pair.
 * - `tag`: a label (TeX) at a point.
 *
 * Rectangles of tiles for multiplying and dividing come from `areaModel` in `src/video/algebra.ts`
 * (with `tiles: true`), which colours its tiles the same way.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A unit tile's side, and the length of x: 3.4 units, as in `areaModel`, so x is clearly not a whole number. */
export const U = 0.6;
export const XL = 2.04;
/** The space between tiles in a block, and between blocks. */
const IN = 0.12;
const BETWEEN = 0.6;

export type Kind = 'x2' | 'x' | '1';

const TONE: Record<Kind, DiagramTone> = { x2: 'adj', x: 'good', '1': 'opp' };
const TEX: Record<Kind, string> = { x2: 'x^2', x: 'x', '1': '1' };

/** A tile's width and height: an x-tile stands up (U wide, XL tall). */
function dims(kind: Kind): P {
  if (kind === 'x2') return [XL, XL];
  if (kind === 'x') return [U, XL];
  return [U, U];
}

/**
 * One algebra tile with its bottom left corner at `at`: shaded and outlined in its colour (red when
 * `neg`), with its value written on it (−x for a negative x-tile) unless `label` is false, in a
 * smaller size with `small` (for tiles drawn small).
 *
 * Part: the tile `id` (a group: its fill `<id>-f`, outline `<id>-e` and value `<id>-t`).
 */
export function tile(o: { id: string; kind: Kind; neg?: boolean; at: P; label?: boolean; small?: boolean }): Part {
  const [w, h] = dims(o.kind);
  const [x, y] = o.at;
  const tone = o.neg ? 'bad' : TONE[o.kind];
  const corners: P[] = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  const points: Record<string, P> = {};
  const names = corners.map((p, i) => {
    points[`${o.id}-${i}`] = p;
    return `${o.id}-${i}`;
  });
  points[`${o.id}-c`] = [x + w / 2, y + h / 2];
  const items: DiagramItem[] = [
    { kind: 'region', id: `${o.id}-f`, points: names, tone, shade: 0.42, group: o.id },
    { kind: 'curve', id: `${o.id}-e`, points: names, closed: true, tone, weight: 2.5, group: o.id },
  ];
  if (o.label !== false) items.push({ kind: 'label', id: `${o.id}-t`, at: `${o.id}-c`, tex: (o.small ? '\\scriptstyle ' : '') + (o.neg ? '-' : '') + TEX[o.kind], tone: 'ink', place: 'center', group: o.id });
  return { points, items };
}

/**
 * A block of `n` tiles of one kind. Unit tiles are set out in columns of `perCol` (2 by default),
 * from the bottom up; x² and x tiles stand side by side. `caption` (TeX) is written under it.
 */
export type Block = { id: string; kind: Kind; n: number; neg?: boolean; perCol?: number; caption?: string; label?: boolean };

/** How wide and tall a block is. */
function blockSize(b: Block): P {
  const [w, h] = dims(b.kind);
  if (b.kind !== '1') return [b.n * w + (b.n - 1) * IN, h];
  const per = Math.min(b.perCol ?? 2, b.n);
  const cols = Math.ceil(b.n / per);
  return [cols * U + (cols - 1) * IN, per * U + (per - 1) * IN];
}

/**
 * Blocks of tiles side by side from `at` (the bottom left corner), `gap` apart, on one base line.
 *
 * Parts: each tile `<block>-<k>` (a group, see `tile`), and each caption `<block>-cap`.
 */
export function tileRow(o: { name?: string; blocks: Block[]; at?: P; gap?: number; small?: boolean }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = x0;
  for (const b of o.blocks) {
    const [bw] = blockSize(b);
    const [w] = dims(b.kind);
    const per = Math.min(b.perCol ?? 2, b.n);
    for (let k = 0; k < b.n; k++) {
      const at: P = b.kind === '1' ? [x + Math.floor(k / per) * (U + IN), y0 + (k % per) * (U + IN)] : [x + k * (w + IN), y0];
      const t = tile({ id: n(`${b.id}-${k}`), kind: b.kind, neg: b.neg, at, label: b.label, small: o.small });
      Object.assign(points, t.points);
      items.push(...t.items);
    }
    if (b.caption) {
      points[n(`${b.id}-capat`)] = [x + bw / 2, y0 - 0.12];
      items.push({ kind: 'label', id: n(`${b.id}-cap`), at: n(`${b.id}-capat`), tex: b.caption, tone: b.neg ? 'bad' : TONE[b.kind], place: 'below' });
    }
    x += bw + (o.gap ?? BETWEEN);
  }
  return { points, items };
}

/** The part ids of tiles `from` to `to - 1` of a block in figure `fig` (made with no name, or `name`). */
export const tileIds = (fig: string, block: string, to: number, from = 0, name?: string): string[] =>
  Array.from({ length: Math.max(0, to - from) }, (_, i) => `${fig}.${name ? `${name}-` : ''}${block}-${from + i}`);

/** One kind of tile in `pairRows`: `pos` positive tiles above `neg` negative ones, in `cols` columns. */
export type PairKind = { kind: Kind; pos: number; neg: number; cols?: number };

/** The id piece for a kind: x2, x or 1. */
const key = (k: Kind) => k;

/**
 * Positive tiles in a top row and negative tiles in a bottom row, `rowGap` apart. Each kind has its
 * own stretch, as wide as its longer row, so positive tile k sits right above negative tile k; unit
 * tiles fill `cols` columns (one row by default). The top row stands on a line and grows upwards;
 * the bottom row hangs from a line and grows downwards, so the tiles of a zero pair face each other.
 * Each zero pair (tile k in both rows, for k below the smaller count) has a dashed yellow ring.
 *
 * Parts: the positive tiles `p-<kind>-<k>`, the negative tiles `n-<kind>-<k>` (each a group, see
 * `tile`), with kind `x2`, `x` or `1`, and the rings `zp-<kind>-<k>`.
 */
export function pairRows(o: { name?: string; kinds: PairKind[]; rowGap?: number; gap?: number; label?: boolean; small?: boolean }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const rings: DiagramItem[] = [];
  const gap = o.rowGap ?? 0.7;
  // The height of a stretch of tiles in rows of `cols`.
  const height = (pk: PairKind, count: number) => {
    const [, h] = dims(pk.kind);
    const cols = pk.cols ?? Math.max(pk.pos, pk.neg, 1);
    const rows = Math.ceil(count / cols);
    return rows ? rows * h + (rows - 1) * IN : 0;
  };
  const bottomH = Math.max(...o.kinds.map((pk) => height(pk, pk.neg)));
  const topY = bottomH + gap;
  let x = 0;
  for (const pk of o.kinds) {
    const [w, h] = dims(pk.kind);
    const slots = Math.max(pk.pos, pk.neg, 1);
    const cols = pk.cols ?? slots;
    // The bottom left corner of tile k: in the top row from topY upwards, in the bottom row from
    // bottomH downwards.
    const place = (k: number, top: boolean): P => [x + (k % cols) * (w + IN), top ? topY + Math.floor(k / cols) * (h + IN) : bottomH - h - Math.floor(k / cols) * (h + IN)];
    for (const [sign, count, top] of [['p', pk.pos, true], ['n', pk.neg, false]] as const) {
      for (let k = 0; k < count; k++) {
        const t = tile({ id: n(`${sign}-${key(pk.kind)}-${k}`), kind: pk.kind, neg: sign === 'n', at: place(k, top), label: o.label, small: o.small });
        Object.assign(points, t.points);
        items.push(...t.items);
      }
    }
    for (let k = 0; k < Math.min(pk.pos, pk.neg); k++) {
      const [px, py] = place(k, true);
      const [, ny] = place(k, false);
      const m = 0.1;
      const id = n(`zp-${key(pk.kind)}-${k}`);
      const corners: P[] = [
        [px - m, ny - m],
        [px + w + m, ny - m],
        [px + w + m, py + h + m],
        [px - m, py + h + m],
      ];
      const names = corners.map((p, i) => {
        points[`${id}-${i}`] = p;
        return `${id}-${i}`;
      });
      rings.push({ kind: 'curve', id, points: names, closed: true, tone: 'theta', dashed: true, weight: 3 });
    }
    x += cols * w + (cols - 1) * IN + (o.gap ?? 0.9);
  }
  return { points, items: [...items, ...rings] };
}

/** The part ids of a `pairRows` figure `fig`: `sign` p or n, tiles `from` to `to - 1` of a kind. */
export const pairIds = (fig: string, sign: 'p' | 'n' | 'zp', kind: Kind, to: number, from = 0, name?: string): string[] =>
  Array.from({ length: Math.max(0, to - from) }, (_, i) => `${fig}.${name ? `${name}-` : ''}${sign}-${key(kind)}-${from + i}`);

/** A label (TeX) at a point. Part: its `id`. */
export function tag(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: Place; group?: string }): Part {
  const n = namer(o.name);
  return {
    points: { [n(`${o.id}-at`)]: o.at },
    items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: n(o.group) } : {}) }],
  };
}

/**
 * A bracket line along one side of a rectangle of tiles, with its length written beside it: a
 * line from `from` to `to` with short end marks, and `tex` above it (or left of it, when it runs
 * up and down).
 *
 * Parts: `id` (a group: the line `<id>-l`, its end marks and the label `<id>-t`).
 */
export function measure(o: { name?: string; id: string; from: P; to: P; tex: string; tone?: DiagramTone; place?: Place }): Part {
  const n = namer(o.name);
  const id = n(o.id);
  const tone = o.tone ?? 'ink';
  const flat = Math.abs(o.to[1] - o.from[1]) < 1e-9;
  const e = 0.18;
  const tick = (p: P): [P, P] => (flat ? [[p[0], p[1] - e], [p[0], p[1] + e]] : [[p[0] - e, p[1]], [p[0] + e, p[1]]]);
  const [a0, a1] = tick(o.from);
  const [b0, b1] = tick(o.to);
  const points: Record<string, P> = {
    [`${id}-a`]: o.from,
    [`${id}-b`]: o.to,
    [`${id}-a0`]: a0,
    [`${id}-a1`]: a1,
    [`${id}-b0`]: b0,
    [`${id}-b1`]: b1,
    [`${id}-m`]: [(o.from[0] + o.to[0]) / 2, (o.from[1] + o.to[1]) / 2],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: `${id}-l`, from: `${id}-a`, to: `${id}-b`, tone, weight: 2.5, group: id },
    { kind: 'line', id: `${id}-ea`, from: `${id}-a0`, to: `${id}-a1`, tone, weight: 2.5, group: id },
    { kind: 'line', id: `${id}-eb`, from: `${id}-b0`, to: `${id}-b1`, tone, weight: 2.5, group: id },
    { kind: 'label', id: `${id}-t`, at: `${id}-m`, tex: o.tex, tone, place: o.place ?? (flat ? 'above' : 'left'), group: id },
  ];
  return { points, items };
}

/** The part ids of the cells of an `areaModel` in figure `fig`: rows `rows`, columns `cols` (made with no name, or `name`). */
export const cellIds = (fig: string, rows: number[], cols: number[], name?: string): string[] => rows.flatMap((j) => cols.map((i) => `${fig}.${name ? `${name}-` : ''}c${j}-${i}`));

/** 0, 1, … n − 1. */
export const upTo = (n: number): number[] => Array.from({ length: n }, (_, i) => i);
