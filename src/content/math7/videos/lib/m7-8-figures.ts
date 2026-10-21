/**
 * Figures for the geometric constructions videos, built only from standard diagram parts (lines,
 * curves, shaded regions, right-angle marks and labels), so each goes into a diagram with
 * `figure`. Lines, right-angle marks and labels come from the Math 6 helpers (`m6-9-figures.ts`).
 * This adds:
 *
 * - `arc`: a compass arc, drawn on in order, as a compass draws it.
 * - `compass`: a drawing of a compass, its point on one point and its pencil on another.
 * - `pt`: a labelled point (a dot and its letter).
 * - `setSquare`: a plastic right triangle, and `rulerBar`: a ruler, for drawing parallel lines.
 * - `rink`: an ice rink seen from above, with its boards, centre line and two blue lines.
 * - `tree` and `bench`: a tree and a park bench seen from above, for the perpendicular bisector.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const rad = (deg: number) => (deg * Math.PI) / 180;
const toward = (c: P, deg: number, len: number): P => [c[0] + len * Math.cos(rad(deg)), c[1] + len * Math.sin(rad(deg))];

/**
 * A compass arc of radius `r` about `c`, from `from` to `to` degrees (anticlockwise from the
 * right), drawn on from `from`. The part `id` (in `group` if given).
 */
export function arc(id: string, c: P, r: number, from: number, to: number, o: { tone?: DiagramTone; group?: string; weight?: number } = {}): Part {
  const points: Record<string, P> = {};
  const names: string[] = [];
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    points[`${id}-${i}`] = toward(c, from + ((to - from) * i) / steps, r);
    names.push(`${id}-${i}`);
  }
  return { points, items: [{ kind: 'curve', id, points: names, tone: o.tone ?? 'theta', weight: o.weight ?? 3, ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * A compass: its metal point on `point` and its pencil on `pencil`, its two legs meeting at a
 * hinge above them (on the `side` of the line from point to pencil: 'left' by default, looking
 * from the point to the pencil), with a handle on top and the pencil's tip in yellow.
 *
 * Parts: the group `id` (the legs `<id>-leg1` and `<id>-leg2`, the handle `<id>-top` and the tip
 * `<id>-tip`).
 */
export function compass(id: string, point: P, pencil: P, o: { side?: 'left' | 'right' } = {}): Part {
  const dx = pencil[0] - point[0];
  const dy = pencil[1] - point[1];
  const len = Math.hypot(dx, dy) || 1;
  const sgn = o.side === 'right' ? -1 : 1;
  const nx = (-dy / len) * sgn;
  const ny = (dx / len) * sgn;
  const h = Math.max(1.2, 0.75 * len);
  const mid: P = [(point[0] + pencil[0]) / 2, (point[1] + pencil[1]) / 2];
  const hinge: P = [mid[0] + nx * h, mid[1] + ny * h];
  const top: P = [hinge[0] + nx * 0.55, hinge[1] + ny * 0.55];
  const points: Record<string, P> = { [`${id}-p`]: point, [`${id}-q`]: pencil, [`${id}-h`]: hinge, [`${id}-t`]: top };
  const items: DiagramItem[] = [
    { kind: 'line', id: `${id}-leg1`, from: `${id}-h`, to: `${id}-p`, tone: 'muted', weight: 5, group: id },
    { kind: 'line', id: `${id}-leg2`, from: `${id}-h`, to: `${id}-q`, tone: 'muted', weight: 5, group: id },
    { kind: 'line', id: `${id}-top`, from: `${id}-h`, to: `${id}-t`, tone: 'muted', weight: 7, group: id },
    { kind: 'label', id: `${id}-tip`, at: `${id}-q`, tex: '', tone: 'theta', place: 'center', dot: true, group: id },
  ];
  return { points, items };
}

/** A point with a dot and its letter (TeX) beside it: the part `id`. */
export function pt(id: string, at: P, tex: string, place: Place = 'above', tone: DiagramTone = 'ink', group?: string): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, tone, place, dot: true, ...(group ? { group } : {}) }] };
}

/**
 * A set square: a plastic right triangle with its right angle at `corner`, one edge `size` along
 * to the right and the other `size` up. Parts: the group `id` (its fill `<id>-fill` and edge
 * `<id>-edge`).
 */
export function setSquare(id: string, corner: P, size: number, o: { dashed?: boolean; tone?: DiagramTone } = {}): Part {
  const pts: P[] = [corner, [corner[0] + size, corner[1]], [corner[0], corner[1] + size]];
  const points: Record<string, P> = {};
  const names = pts.map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  const tone = o.tone ?? 'good';
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: names, tone, shade: o.dashed ? 0.06 : 0.25, group: id },
      { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 3, dashed: o.dashed, group: id },
    ],
  };
}

/**
 * A ruler lying along the line from `a` to `b`, `width` wide, on the left of that line (looking
 * from `a` to `b`), with a mark every unit. Parts: the group `id`.
 */
export function rulerBar(id: string, a: P, b: P, width = 0.5): Part {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const [ux, uy] = [dx / len, dy / len];
  const [nx, ny] = [-uy * width, ux * width];
  const pts: P[] = [a, b, [b[0] + nx, b[1] + ny], [a[0] + nx, a[1] + ny]];
  const points: Record<string, P> = {};
  const names = pts.map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  const items: DiagramItem[] = [
    { kind: 'region', id: `${id}-fill`, points: names, tone: 'theta', shade: 0.35, group: id },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone: 'theta', weight: 2.5, group: id },
  ];
  for (let k = 1; k < len; k++) {
    const m: P = [a[0] + ux * k, a[1] + uy * k];
    points[`${id}-m${k}a`] = m;
    points[`${id}-m${k}b`] = [m[0] + nx * 0.45, m[1] + ny * 0.45];
    items.push({ kind: 'line', id: `${id}-m${k}`, from: `${id}-m${k}a`, to: `${id}-m${k}b`, tone: 'ink', weight: 1.5, group: id });
  }
  return { points, items };
}

/**
 * An ice rink seen from above, `w` long and `h` wide, with rounded corners. Parts: `ice` (a group:
 * the shading and the boards all round), `side` (the straight part of the top boards, the side
 * boards), `centre` (the red centre line), `blue1` and `blue2` (the blue lines), and `corner` (a
 * right-angle mark where the first blue line meets the side boards).
 */
export function rink(o: { w: number; h: number; blue: [number, number] }): Part {
  const r = 0.28 * o.h;
  const points: Record<string, P> = {};
  const names: string[] = [];
  const corners: [P, number][] = [
    [[o.w - r, r], 270],
    [[o.w - r, o.h - r], 0],
    [[r, o.h - r], 90],
    [[r, r], 180],
  ];
  corners.forEach(([c, start], k) => {
    for (let i = 0; i <= 8; i++) {
      const name = `rk${k}-${i}`;
      points[name] = toward(c, start + (90 * i) / 8, r);
      names.push(name);
    }
  });
  Object.assign(points, {
    s0: [r, o.h],
    s1: [o.w - r, o.h],
    c0: [o.w / 2, 0],
    c1: [o.w / 2, o.h],
    b10: [o.blue[0], 0],
    b11: [o.blue[0], o.h],
    b20: [o.blue[1], 0],
    b21: [o.blue[1], o.h],
    k0: [o.blue[0], o.h],
    k1: [o.blue[0], 0],
    k2: [o.w, o.h],
  });
  const items: DiagramItem[] = [
    { kind: 'region', id: 'ice-fill', points: names, tone: 'adj', shade: 0.08, group: 'ice' },
    { kind: 'curve', id: 'ice-edge', points: names, closed: true, tone: 'ink', weight: 4, group: 'ice' },
    { kind: 'line', id: 'centre', from: 'c0', to: 'c1', tone: 'bad', weight: 5 },
    { kind: 'line', id: 'blue1', from: 'b10', to: 'b11', tone: 'adj', weight: 7 },
    { kind: 'line', id: 'blue2', from: 'b20', to: 'b21', tone: 'adj', weight: 7 },
    { kind: 'line', id: 'side', from: 's0', to: 's1', tone: 'opp', weight: 6 },
    { kind: 'right', id: 'corner', at: 'k0', from: 'k1', to: 'k2' },
  ];
  return { points, items };
}

/** A tree seen from above: a round green crown with its trunk as a dot in the middle. The group `id`. */
export function tree(id: string, at: P, r = 0.9): Part {
  const points: Record<string, P> = { [`${id}-c`]: at };
  const names: string[] = [];
  for (let i = 0; i < 24; i++) {
    points[`${id}-${i}`] = toward(at, i * 15, r);
    names.push(`${id}-${i}`);
  }
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: names, tone: 'good', shade: 0.35, group: id },
      { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone: 'good', weight: 3, group: id },
      { kind: 'label', id: `${id}-trunk`, at: `${id}-c`, tex: '', tone: 'ink', place: 'center', dot: true, group: id },
    ],
  };
}

/** A park bench seen from above: a small yellow rectangle, `w` long, centred on `at`. The group `id`. */
export function bench(id: string, at: P, w = 1.4, h = 0.45): Part {
  const pts: P[] = [
    [at[0] - w / 2, at[1] - h / 2],
    [at[0] + w / 2, at[1] - h / 2],
    [at[0] + w / 2, at[1] + h / 2],
    [at[0] - w / 2, at[1] + h / 2],
  ];
  const points: Record<string, P> = {};
  const names = pts.map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: names, tone: 'theta', shade: 0.6, group: id },
      { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone: 'theta', weight: 2.5, group: id },
    ],
  };
}
