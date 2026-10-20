/**
 * Figures for the symmetry and congruence videos, built only from standard diagram parts, so each
 * goes into a diagram with `figure`. The shapes, fold lines, dots and captions come from the Math 5
 * symmetry helpers (`m5-8-figures.ts`); these add what the lessons here draw on squared paper:
 *
 * - `paper`: grid lines one unit apart, like squared paper.
 * - `span`: a measuring line with a label, such as the distance from a corner to a mirror line.
 * - `turnArrow`: an arrow round a centre, clockwise or counterclockwise.
 * - `tessellation`: rectangles each cut into two right triangles, covering a floor.
 * - `diamond`: one diamond of an eight-pointed star.
 * - `sideTicks`: one, two or three marks across a side, to show matching sides.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

export type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Squared paper from (x0, y0) to (x1, y1): muted lines one unit apart.
 * Part: `paper` (a group).
 */
export function paper(o: { name?: string; x: [number, number]; y: [number, number] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let x = o.x[0]; x <= o.x[1]; x++) {
    Object.assign(points, { [n(`px${x}a`)]: [x, o.y[0]], [n(`px${x}b`)]: [x, o.y[1]] });
    items.push({ kind: 'line', id: n(`px${x}`), from: n(`px${x}a`), to: n(`px${x}b`), tone: 'muted', weight: 1, group: n('paper') });
  }
  for (let y = o.y[0]; y <= o.y[1]; y++) {
    Object.assign(points, { [n(`py${y}a`)]: [o.x[0], y], [n(`py${y}b`)]: [o.x[1], y] });
    items.push({ kind: 'line', id: n(`py${y}`), from: n(`py${y}a`), to: n(`py${y}b`), tone: 'muted', weight: 1, group: n('paper') });
  }
  return { points, items };
}

/** A measuring line from `a` to `b` with an arrowhead at `b` and a label (TeX) beside its middle. Part: `<id>`. */
export function span(o: { name?: string; id: string; a: P; b: P; label?: string; side?: 'left' | 'right'; tone?: DiagramTone; group?: string; arrow?: boolean }): Part {
  const n = namer(o.name);
  return {
    points: { [n(`${o.id}-a`)]: o.a, [n(`${o.id}-b`)]: o.b },
    items: [
      {
        kind: 'line',
        id: n(o.id),
        from: n(`${o.id}-a`),
        to: n(`${o.id}-b`),
        tone: o.tone ?? 'theta',
        weight: 3,
        arrow: o.arrow ?? true,
        ...(o.label ? { label: o.label, labelSide: o.side ?? 'left' } : {}),
        ...(o.group ? { group: n(o.group) } : {}),
      },
    ],
  };
}

/**
 * An arrow round `c` at radius `r`, from `from` degrees to `to` degrees (0° points right, angles
 * grow counterclockwise), so `to` below `from` turns clockwise. Part: `<id>` (a group: the arc and
 * its arrowhead).
 */
export function turnArrow(o: { name?: string; id: string; c: P; r: number; from: number; to: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const names: string[] = [];
  const dir = Math.sign(o.to - o.from);
  const end = o.to - 6 * dir;
  for (let k = 0; k <= 30; k++) {
    const a = rad(o.from + ((end - o.from) * k) / 30);
    points[n(`${o.id}${k}`)] = [o.c[0] + o.r * Math.cos(a), o.c[1] + o.r * Math.sin(a)];
    names.push(n(`${o.id}${k}`));
  }
  points[n(`${o.id}-end`)] = [o.c[0] + o.r * Math.cos(rad(o.to)), o.c[1] + o.r * Math.sin(rad(o.to))];
  const tone = o.tone ?? 'theta';
  return {
    points,
    items: [
      { kind: 'curve', id: n(`${o.id}-arc`), points: names, tone, weight: 3, group: n(o.id) },
      { kind: 'line', id: n(`${o.id}-head`), from: names[names.length - 1], to: n(`${o.id}-end`), tone, weight: 3, arrow: true, group: n(o.id) },
    ],
  };
}

/**
 * The two right triangles of the rectangle in column `c` and row `r` of a tessellation of
 * `w` by `h` rectangles: each rectangle is cut along a diagonal, which leans one way and then the
 * other, as in the lesson. Returns [lower triangle, upper triangle].
 */
export function cell(c: number, r: number, w = 3, h = 2): [P[], P[]] {
  const [x0, y0, x1, y1] = [c * w, r * h, (c + 1) * w, (r + 1) * h];
  return (c + r) % 2 === 0
    ? [
        [
          [x0, y0],
          [x1, y0],
          [x1, y1],
        ],
        [
          [x0, y0],
          [x1, y1],
          [x0, y1],
        ],
      ]
    : [
        [
          [x0, y0],
          [x1, y0],
          [x0, y1],
        ],
        [
          [x1, y0],
          [x1, y1],
          [x0, y1],
        ],
      ];
}

/**
 * A floor of `cols` by `rows` rectangles, each cut into two right triangles (see `cell`), drawn
 * as muted outlines with a light shading.
 *
 * Parts: `tiles` (a group: every triangle), and each triangle `t<c>-<r>-<k>` (k is 0 for the lower
 * triangle and 1 for the upper).
 */
export function tessellation(o: { name?: string; cols: number; rows: number; w?: number; h?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let r = 0; r < o.rows; r++) {
    for (let c = 0; c < o.cols; c++) {
      cell(c, r, o.w, o.h).forEach((tri, k) => {
        const id = n(`t${c}-${r}-${k}`);
        const names = tri.map((p, i) => {
          points[`${id}-${i}`] = p;
          return `${id}-${i}`;
        });
        items.push(
          { kind: 'region', id: `${id}-fill`, points: names, tone: (c + r + k) % 2 ? 'brand' : 'muted', shade: 0.12, group: n('tiles') },
          { kind: 'curve', id, points: names, closed: true, tone: 'muted', weight: 2, group: n('tiles') },
        );
      });
    }
  }
  return { points, items };
}

/**
 * Diamond `k` of an eight-pointed star about `c`: a rhombus with one corner at the centre, its
 * far tip pointing at `45k + start` degrees, and sides `s` long.
 */
export function diamond(k: number, s = 2, c: P = [0, 0], start = 45): P[] {
  const a = start + 45 * k;
  const tip = 2 * s * Math.cos(rad(22.5));
  return [c, [c[0] + s * Math.cos(rad(a - 22.5)), c[1] + s * Math.sin(rad(a - 22.5))], [c[0] + tip * Math.cos(rad(a)), c[1] + tip * Math.sin(rad(a))], [c[0] + s * Math.cos(rad(a + 22.5)), c[1] + s * Math.sin(rad(a + 22.5))]];
}

/** `count` short marks across the middle of the side from `a` to `b`. Part: `<id>` (a group). */
export function sideTicks(o: { name?: string; id: string; a: P; b: P; count: number; tone?: DiagramTone; size?: number }): Part {
  const n = namer(o.name);
  const [dx, dy] = [o.b[0] - o.a[0], o.b[1] - o.a[1]];
  const l = Math.hypot(dx, dy);
  const [ux, uy] = [dx / l, dy / l];
  const s = o.size ?? 0.22;
  const m: P = [(o.a[0] + o.b[0]) / 2, (o.a[1] + o.b[1]) / 2];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.count; k++) {
    const off = (k - (o.count - 1) / 2) * 0.22;
    const c: P = [m[0] + off * ux, m[1] + off * uy];
    points[n(`${o.id}${k}a`)] = [c[0] - s * uy, c[1] + s * ux];
    points[n(`${o.id}${k}b`)] = [c[0] + s * uy, c[1] - s * ux];
    items.push({ kind: 'line', id: n(`${o.id}${k}`), from: n(`${o.id}${k}a`), to: n(`${o.id}${k}b`), tone: o.tone ?? 'ink', weight: 3, group: n(o.id) });
  }
  return { points, items };
}

/** A label (TeX) at a point, with no dot, in `group` if set. Part: `<id>`. */
export function tag(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: Place; group?: string }): Part {
  const n = namer(o.name);
  return { points: { [n(`${o.id}-at`)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: n(o.group) } : {}) }] };
}
