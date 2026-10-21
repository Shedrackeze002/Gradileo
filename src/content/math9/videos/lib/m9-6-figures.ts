/**
 * Figures for the linear equations and inequalities videos, built only from standard diagram parts
 * (lines, curves, shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `ineqLine`: a number line with arrows at both ends, and an inequality's solution set on it: a
 *   big dot at the boundary, closed (filled in) when the boundary is included and open (hollow)
 *   when it is not, and a thick arrow from it over all the solutions, to the left or the right.
 *   Test values can be marked as small dots with labels.
 *
 * The pan balance with algebra tiles comes from the Grade 8 helpers (`tileBalance`), and a shape
 * with an expression on each side from the Grade 6 helpers (`sides`).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A number as TeX, with a negative in braces so it is set as a sign. */
const numTex = (v: number) => {
  const s = String(Number(v.toFixed(6)));
  return v < 0 ? `{${s}}` : s;
};

/**
 * A number line from `min` to `max`, `length` units long (12 by default), with arrows at both ends,
 * a mark every `step` (1 by default) and a number under every `every`-th mark (every mark by
 * default).
 *
 * `boundary` draws an inequality's solution set: a dot at `value` (filled in when `closed`, hollow
 * otherwise, with the line broken under it so it stays hollow) and a thick arrow from the dot to the
 * end of the line, to the `dir` side, in `tone` (blue by default). `marks` are small dots on the
 * line, each with `tex` above it (or below with `below`).
 *
 * Parts: `axis` (a group: the line, its arrowheads, marks and numbers), `dot` (a group: the dot's
 * fill and edge), `ray` (the thick arrow), and each mark by its `id` (a dot and its label).
 */
export function ineqLine(o: {
  name?: string;
  min: number;
  max: number;
  step?: number;
  every?: number;
  length?: number;
  at?: P;
  boundary?: { value: number; closed: boolean; dir: 'left' | 'right'; tone?: DiagramTone };
  marks?: { id: string; value: number; tex: string; tone?: DiagramTone; below?: boolean }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const step = o.step ?? 1;
  const every = o.every ?? 1;
  const X = (v: number) => x0 + ((v - o.min) / (o.max - o.min)) * L;
  const r = 0.2;
  const ext = 0.7;
  const left = x0 - ext;
  const right = x0 + L + ext;
  const b = o.boundary;
  // The line is drawn as two pieces from a split point out to the arrowheads at both ends; under an
  // open dot the split leaves a gap, so the dot stays hollow.
  const split = b ? X(b.value) : x0 + L / 2;
  const gap = b && !b.closed ? r : 0;
  const points: Record<string, P> = {
    [n('L')]: [left, y0],
    [n('R')]: [right, y0],
    [n('sl')]: [split - gap, y0],
    [n('sr')]: [split + gap, y0],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('line-l'), from: n('sl'), to: n('L'), tone: 'muted', weight: 3, arrow: true, group: n('axis') },
    { kind: 'line', id: n('line-r'), from: n('sr'), to: n('R'), tone: 'muted', weight: 3, arrow: true, group: n('axis') },
  ];
  const count = Math.round((o.max - o.min) / step);
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * step;
    const big = every > 0 && i % every === 0;
    const atDot = b && Math.abs(v - b.value) < 1e-9;
    Object.assign(points, { [n(`t${i}a`)]: [X(v), y0 - (big ? 0.18 : 0.12)], [n(`t${i}b`)]: [X(v), y0 + (big ? 0.18 : 0.12)], [n(`nb${i}`)]: [X(v), y0 - 0.3] });
    if (!(atDot && !b.closed)) items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), tone: 'muted', weight: 2.5, group: n('axis') });
    if (big) items.push({ kind: 'label', id: n(`num${i}`), at: n(`nb${i}`), tex: numTex(v), tone: atDot ? (b.tone ?? 'adj') : 'muted', place: 'below', group: n('axis') });
  }
  if (b) {
    const tone = b.tone ?? 'adj';
    const c: P = [X(b.value), y0];
    const ring: string[] = [];
    for (let k = 0; k < 24; k++) {
      const a = (2 * Math.PI * k) / 24;
      points[n(`d${k}`)] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
      ring.push(n(`d${k}`));
    }
    if (b.closed) items.push({ kind: 'region', id: n('dot-f'), points: ring, tone, shade: 1, group: n('dot') });
    items.push({ kind: 'curve', id: n('dot-e'), points: ring, closed: true, tone, weight: 4, group: n('dot') });
    const sgn = b.dir === 'right' ? 1 : -1;
    Object.assign(points, { [n('ray-a')]: [c[0] + sgn * r, y0], [n('ray-b')]: [b.dir === 'right' ? right : left, y0] });
    items.push({ kind: 'line', id: n('ray'), from: n('ray-a'), to: n('ray-b'), tone, weight: 8, arrow: true });
  }
  for (const m of o.marks ?? []) {
    points[n(m.id)] = [X(m.value), y0];
    items.push({ kind: 'label', id: n(m.id), at: n(m.id), tex: m.tex, tone: m.tone ?? 'theta', place: m.below ? 'below' : 'above', dot: true });
  }
  return { points, items };
}

/** The parts that show an `ineqLine` figure `fig` (made with no name) with its solution set. */
export const lineParts = (fig: string): string[] => [`${fig}.axis`, `${fig}.dot`, `${fig}.ray`];
