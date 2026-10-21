/**
 * Figures for the linear relations videos, built only from standard diagram parts (labels, lines,
 * curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `tileSteps`: a growing pattern of square tiles, one figure for each step: a block of starting
 *   tiles, then the same number of new tiles added at every step (a taxi fare of \$4 to start and
 *   \$2 a kilometre, one tile for each dollar).
 * - `squares`: square arrangements of tiles, 1 by 1, 2 by 2, 3 by 3…, a pattern that is not linear.
 * - `candles`: candles burning down, one for each hour, each with a flame and labels.
 *
 * Tables of values come from `valueTable` and graphs from `plane`, `dots`, `plot` and `polyline` in
 * `src/video/graph.ts`, with the guides and tags of the Grade 5 helpers.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A filled square tile with its outline, its corners added to `points`, in `group`. */
function tile(points: Record<string, P>, id: string, x: number, y: number, s: number, tone: DiagramTone, group: string): DiagramItem[] {
  const names = ([[x, y], [x + s, y], [x + s, y + s], [x, y + s]] as P[]).map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  return [
    { kind: 'region', id: `${id}-fill`, points: names, tone, shade: 0.45, group },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 2.5, group },
  ];
}

const S = 0.8;
const PITCH = 0.92;

/**
 * One figure for each of `steps` steps (0, 1, 2…), side by side, `gap` apart. Each figure has
 * `start` tiles in columns of `rows` (orange), then `per` new tiles for each step so far, in columns
 * of `rows` to their right (green). `captions[k]` (TeX) is written under figure k.
 *
 * Parts: each figure `s<k>` (a group: its tiles), and each caption `c<k>`.
 */
export function tileSteps(o: { name?: string; steps: number; start: number; per: number; rows?: number; gap?: number; captions?: string[] }): Part {
  const n = namer(o.name);
  const rows = o.rows ?? 2;
  const gap = o.gap ?? 1.3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let left = 0;
  for (let k = 0; k < o.steps; k++) {
    const total = o.start + k * o.per;
    for (let t = 0; t < total; t++) {
      const col = Math.floor(t / rows);
      const row = t % rows;
      items.push(...tile(points, n(`s${k}-t${t}`), left + col * PITCH, row * PITCH, S, t < o.start ? 'opp' : 'good', n(`s${k}`)));
    }
    const width = Math.ceil(total / rows) * PITCH - (PITCH - S);
    if (o.captions?.[k]) {
      points[n(`c${k}-at`)] = [left + width / 2, -0.25];
      items.push({ kind: 'label', id: n(`c${k}`), at: n(`c${k}-at`), tex: o.captions[k], tone: 'ink', place: 'below' });
    }
    left += width + gap;
  }
  return { points, items };
}

/**
 * Squares of tiles side by side, `sizes[k]` tiles along each side of square k, sitting on one line,
 * `gap` apart, with `captions[k]` (TeX) under each.
 *
 * Parts: each square `q<k>` (a group: its tiles), and each caption `c<k>`.
 */
export function squares(o: { name?: string; sizes: number[]; gap?: number; captions?: string[]; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1;
  const s = 0.6;
  const pitch = 0.68;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let left = 0;
  o.sizes.forEach((m, k) => {
    for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) items.push(...tile(points, n(`q${k}-${i}-${j}`), left + i * pitch, j * pitch, s, o.tone ?? 'adj', n(`q${k}`)));
    const width = m * pitch - (pitch - s);
    if (o.captions?.[k]) {
      points[n(`c${k}-at`)] = [left + width / 2, -0.2];
      items.push({ kind: 'label', id: n(`c${k}`), at: n(`c${k}-at`), tex: o.captions[k], tone: 'ink', place: 'below' });
    }
    left += width + gap;
  });
  return { points, items };
}

/**
 * Candles side by side, `heights[k]` tall (in diagram units), `gap` apart, each with a flame on top,
 * `tops[k]` (TeX, its height) above the flame and `captions[k]` (TeX, the time) under it.
 *
 * Parts: each candle `k<i>` (a group: its wax and flame), its height label `h<i>` and its caption
 * `c<i>`.
 */
export function candles(o: { name?: string; heights: number[]; gap?: number; width?: number; tops?: string[]; captions?: string[] }): Part {
  const n = namer(o.name);
  const w = o.width ?? 0.9;
  const gap = o.gap ?? 1.4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.heights.forEach((h, i) => {
    const x = i * (w + gap);
    const g = n(`k${i}`);
    const wax = ([[x, 0], [x + w, 0], [x + w, h], [x, h]] as P[]).map((p, j) => {
      points[n(`w${i}-${j}`)] = p;
      return n(`w${i}-${j}`);
    });
    items.push(
      { kind: 'region', id: n(`w${i}-fill`), points: wax, tone: 'hyp', shade: 0.35, group: g },
      { kind: 'curve', id: n(`w${i}-edge`), points: wax, closed: true, tone: 'hyp', weight: 2.5, group: g },
    );
    // The wick and a teardrop flame above it.
    const cx = x + w / 2;
    Object.assign(points, { [n(`wick${i}a`)]: [cx, h], [n(`wick${i}b`)]: [cx, h + 0.15] });
    items.push({ kind: 'line', id: n(`wick${i}`), from: n(`wick${i}a`), to: n(`wick${i}b`), tone: 'ink', weight: 2.5, group: g });
    // A teardrop: pointed at the top, round at the bottom.
    const flame = Array.from({ length: 24 }, (_, j) => {
      const t = (2 * Math.PI * j) / 24;
      const name = n(`f${i}-${j}`);
      points[name] = [cx + 0.24 * Math.sin(t) * Math.sin(t / 2), h + 0.22 + 0.27 * (1 + Math.cos(t))];
      return name;
    });
    items.push({ kind: 'region', id: n(`f${i}-fill`), points: flame, tone: 'theta', shade: 0.85, group: g }, { kind: 'curve', id: n(`f${i}-edge`), points: flame, closed: true, tone: 'opp', weight: 2, group: g });
    if (o.tops?.[i]) {
      points[n(`h${i}-at`)] = [cx, h + 0.85];
      items.push({ kind: 'label', id: n(`h${i}`), at: n(`h${i}-at`), tex: o.tops[i], tone: 'hyp', place: 'above' });
    }
    if (o.captions?.[i]) {
      points[n(`c${i}-at`)] = [cx, -0.15];
      items.push({ kind: 'label', id: n(`c${i}`), at: n(`c${i}-at`), tex: o.captions[i], tone: 'ink', place: 'below' });
    }
  });
  return { points, items };
}
