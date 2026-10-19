/**
 * Figures for the Divisibility and Factors videos: counters set out in equal rows (with any left
 * over in another colour), and a factor rainbow (the factors of a number in order, each joined to
 * its partner by an arc). Like the figures in `src/video/`, each is built only from standard
 * diagram parts (curves, regions and labels) and goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The points of a circle of radius r about c. */
function ring(c: P, r: number, steps = 18): P[] {
  return Array.from({ length: steps }, (_, i) => [c[0] + r * Math.cos((2 * Math.PI * i) / steps), c[1] + r * Math.sin((2 * Math.PI * i) / steps)] as P);
}

/**
 * Counters in `rows` equal rows of `cols`, from the top left corner `at`, and `extra` more on a row
 * of their own under them in another colour (the ones left over). `label` is written under it all.
 *
 * Parts: each row `row<i>` (a group: its counters `c<i>-<j>`), `extra` (a group: the counters left
 * over) and `label`.
 */
export function counters(o: { name?: string; rows: number; cols: number; extra?: number; at?: P; gap?: number; tone?: DiagramTone; extraTone?: DiagramTone; label?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const g = o.gap ?? 1;
  const r = 0.36 * g;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const counter = (id: string, c: P, tone: DiagramTone, group: string) => {
    const ids = ring(c, r).map((q, k) => {
      points[n(`${id}-${k}`)] = q;
      return n(`${id}-${k}`);
    });
    items.push({ kind: 'region', id: n(id), points: ids, tone, shade: 0.7, group: n(group) }, { kind: 'curve', id: n(`${id}-edge`), points: ids, closed: true, tone, weight: 2, group: n(group) });
  };
  for (let i = 0; i < o.rows; i++) for (let j = 0; j < o.cols; j++) counter(`c${i}-${j}`, [x0 + j * g, y0 - i * g], o.tone ?? 'adj', `row${i}`);
  for (let j = 0; j < (o.extra ?? 0); j++) counter(`e${j}`, [x0 + j * g, y0 - o.rows * g], o.extraTone ?? 'opp', 'extra');
  if (o.label) {
    const rowsDown = o.rows + (o.extra ? 1 : 0);
    points[n('lab')] = [x0 + ((o.cols - 1) * g) / 2, y0 - (rowsDown - 1) * g - r - 0.15];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'below', tone: 'ink' });
  }
  return { points, items };
}

const ARC_TONES: DiagramTone[] = ['adj', 'opp', 'good', 'theta', 'hyp', 'brand'];

/**
 * A factor rainbow: the factors of a number in a row, smallest first, and an arc over them joining
 * each factor to its partner (the first to the last, the second to the second last…). When a
 * factor is its own partner (6 for 36), it is ringed instead.
 *
 * Parts: each factor `f<i>` (left to right), each arc `p<i>` (joining factor i to its partner) and
 * `self` (the ring round a factor that is its own partner).
 */
export function rainbow(o: { name?: string; factors: number[]; gap?: number; size?: string; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const g = o.gap ?? 1;
  const size = o.size ?? '\\Large';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const k = o.factors.length;
  for (let i = 0; i < Math.floor(k / 2); i++) {
    const xa = x0 + i * g;
    const xb = x0 + (k - 1 - i) * g;
    const h = 0.45 * g + 0.17 * (xb - xa);
    const ids: string[] = [];
    for (let s = 0; s <= 24; s++) {
      const t = s / 24;
      points[n(`a${i}-${s}`)] = [xa + (xb - xa) * t, y0 + 0.42 * g + h * Math.sin(Math.PI * t)];
      ids.push(n(`a${i}-${s}`));
    }
    items.push({ kind: 'curve', id: n(`p${i}`), points: ids, tone: ARC_TONES[i % ARC_TONES.length], weight: 3 });
  }
  if (k % 2 === 1) {
    const m = (k - 1) / 2;
    const ids = ring([x0 + m * g, y0], 0.42 * g, 32).map((q, s) => {
      points[n(`self-${s}`)] = q;
      return n(`self-${s}`);
    });
    items.push({ kind: 'curve', id: n('self'), points: ids, closed: true, tone: ARC_TONES[m % ARC_TONES.length], weight: 3 });
  }
  o.factors.forEach((f, i) => {
    points[n(`f${i}`)] = [x0 + i * g, y0];
    items.push({ kind: 'label', id: n(`f${i}`), at: n(`f${i}`), tex: `${size} ${f}`, place: 'center', tone: 'ink' });
  });
  return { points, items };
}
