/**
 * Figures for the patterns and linear relations videos:
 *
 * - `toothpicks`: squares in a row made of toothpicks, one toothpick for each side of a small
 *   square: 4 for the first square and 3 more (top, bottom and right) for each square after it.
 * - `chairs`: square tables pushed together in a row, with a chair at each open side.
 *
 * Tables of values come from `valueTable` (re-exported by the Grade 5 helpers), and graphs from
 * `plane` and `dots` in `src/video/graph.ts`. Like the figures in `src/video/`, each is built only
 * from standard diagram parts and goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle. */
function circle(points: Record<string, P>, key: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
}

/**
 * `squares` squares in a row, each side one toothpick `size` long, with the bottom left corner at
 * `at`. The first square has 4 toothpicks (left, top, bottom, right), and each square after it 3
 * more (top, bottom, right). The toothpicks of the squares listed in `fresh` are drawn in
 * `freshTone` (green), to show what each new square adds, and `leftTone` colours the toothpick that
 * starts the row. `label` and `count` (TeX) are written under the row.
 *
 * Parts: each square's toothpicks `sq<k>` (a group; each toothpick also a part `sq<k>-<side>`, with
 * side `left`, `top`, `bottom` or `right`), `label` and `count`.
 */
export function toothpicks(o: {
  name?: string;
  squares: number;
  at?: P;
  size?: number;
  tone?: DiagramTone;
  fresh?: number[];
  freshTone?: DiagramTone;
  /** A colour for the first square's left toothpick, the one that starts the row. */
  leftTone?: DiagramTone;
  label?: string;
  count?: string;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const s = o.size ?? 1;
  const gap = 0.08 * s;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const stick = (k: number, side: string, a: P, b: P) => {
    const id = n(`sq${k}-${side}`);
    const d: P = [b[0] - a[0], b[1] - a[1]];
    const len = Math.hypot(d[0], d[1]);
    const u: P = [d[0] / len, d[1] / len];
    Object.assign(points, { [`${id}-a`]: [a[0] + u[0] * gap, a[1] + u[1] * gap], [`${id}-b`]: [b[0] - u[0] * gap, b[1] - u[1] * gap] });
    const tone = side === 'left' && o.leftTone ? o.leftTone : o.fresh?.includes(k) ? (o.freshTone ?? 'good') : (o.tone ?? 'theta');
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, weight: 7, group: n(`sq${k}`) });
  };
  for (let k = 0; k < o.squares; k++) {
    const x = x0 + k * s;
    if (k === 0) stick(k, 'left', [x, y0], [x, y0 + s]);
    stick(k, 'top', [x, y0 + s], [x + s, y0 + s]);
    stick(k, 'bottom', [x, y0], [x + s, y0]);
    stick(k, 'right', [x + s, y0], [x + s, y0 + s]);
  }
  const mid = x0 + (o.squares * s) / 2;
  if (o.label) {
    points[n('lab')] = [mid, y0 - 0.2 * s];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, tone: 'muted', place: 'below' });
  }
  if (o.count) {
    points[n('cnt')] = [mid, y0 - 0.95 * s];
    items.push({ kind: 'label', id: n('count'), at: n('cnt'), tex: o.count, tone: o.tone ?? 'theta', place: 'below' });
  }
  return { points, items };
}

/**
 * `tables` square tables pushed together in a row, each `size` units, with the bottom left corner
 * at `at`, and a chair at each open side: one above and one below each table, and one at each end
 * of the row. `label` (TeX) is written under the row.
 *
 * Parts: `tbl` (a group: the tables), the chairs in three groups, `tops` (above the tables),
 * `bots` (below them) and `ends` (one at each end), each chair's seat and edge also parts
 * (`top<k>-seat`, `top<k>-edge`, `endL-seat`…), and `label`.
 */
export function chairs(o: { name?: string; tables: number; at?: P; size?: number; label?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const s = o.size ?? 1;
  const r = 0.17 * s;
  const off = 0.4 * s;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.tables; k++) {
    const x = x0 + k * s;
    const corners: P[] = [[x, y0], [x + s, y0], [x + s, y0 + s], [x, y0 + s]];
    const ids = corners.map((c, j) => {
      points[n(`t${k}-${j}`)] = c;
      return n(`t${k}-${j}`);
    });
    items.push(
      { kind: 'region', id: n(`t${k}-fill`), points: ids, tone: 'brand', shade: 0.35, group: n('tbl') },
      { kind: 'curve', id: n(`t${k}-edge`), points: ids, closed: true, tone: 'brand', weight: 3, group: n('tbl') },
    );
  }
  const chair = (id: string, c: P, group: string) => {
    const g = n(id);
    items.push(
      { kind: 'region', id: `${g}-seat`, points: circle(points, `${g}-s`, c, r), tone: 'opp', shade: 0.6, group: n(group) },
      { kind: 'curve', id: `${g}-edge`, points: circle(points, `${g}-e`, c, r), closed: true, tone: 'opp', weight: 2.5, group: n(group) },
    );
  };
  for (let k = 0; k < o.tables; k++) {
    const cx = x0 + (k + 0.5) * s;
    chair(`top${k}`, [cx, y0 + s + off], 'tops');
    chair(`bot${k}`, [cx, y0 - off], 'bots');
  }
  chair('endL', [x0 - off, y0 + s / 2], 'ends');
  chair('endR', [x0 + o.tables * s + off, y0 + s / 2], 'ends');
  if (o.label) {
    points[n('lab')] = [x0 + (o.tables * s) / 2, y0 - off - r - 0.1 * s];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, tone: 'muted', place: 'below' });
  }
  return { points, items };
}
