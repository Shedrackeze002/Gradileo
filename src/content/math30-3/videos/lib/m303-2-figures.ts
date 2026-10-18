/**
 * Figures for the Oblique Triangles videos (the sine law, the cosine law and problems that use
 * them). Like the other course helpers, they are built only from standard diagram parts (lines,
 * angles, labels and scenery), so each goes into a diagram with `figure`:
 *
 * - `oblique`: a triangle drawn to scale from two of its angles, with its sides named by the
 *   lower-case letter of the corner across from them, so a side and its opposite angle (a
 *   matching pair) can share a colour.
 * - `turnFigure`: a path with a turn in it (a boat's two legs), with the straight-ahead direction
 *   dashed, the turn, and the angle inside the triangle.
 * - `elevationFigure`: a tower seen from two points in line with its base, with both angles of
 *   elevation and the oblique triangle between the points and the top.
 */
import { facing } from '@/video/angles.ts';
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (d: number) => (d * Math.PI) / 180;
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const deg = (v: P) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** The side of the line from `p` to `q`, looking along it, away from `r`. */
function outside(p: P, q: P, r: P): 'left' | 'right' {
  const d = sub(q, p);
  const w = sub(r, p);
  return d[0] * w[1] - d[1] * w[0] > 0 ? 'right' : 'left';
}

/**
 * An oblique triangle with `corners` at the bottom left, bottom right and top, drawn to scale from
 * the `angles` at the two bottom corners (in degrees; the top gets the rest). The bottom side is
 * `base` units long, starting at `at`.
 *
 * Each side is named by the lower-case letter of the corner across from it ("a" is across from
 * A), and labelled from `sides` by that letter. Each angle is labelled from `angleLabels` by its
 * corner letter (an empty label draws the arc alone). `pairs` gives a matching pair its colour: the angle at a corner and the side
 * across from it. `altitude` drops a dashed height from a corner to the line through the other
 * two, labelled `altitudeLabel`.
 *
 * Parts: `shape` (a group: the three sides, each by its lower-case letter), each angle by its
 * corner letter (only those labelled), `names` (a group: the corner letters `n<corner>`), and
 * `alt` (a group: the height `height` and its right-angle mark).
 */
export function oblique(o: {
  name?: string;
  corners: [string, string, string];
  angles: [number, number];
  base?: number;
  at?: P;
  sides?: Record<string, string>;
  angleLabels?: Record<string, string>;
  pairs?: Record<string, DiagramTone>;
  altitude?: string;
  altitudeLabel?: string;
  /** Where each angle's label sits, in pixels from its corner, for a crowded corner. */
  labelDist?: Record<string, number>;
  /** Arc radius in pixels, by corner. */
  arc?: Record<string, number>;
  /** Where each angle's label sits across the angle, 0 to 1 (0.5, the bisector, by default), by corner. */
  labelAt?: Record<string, number>;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const base = o.base ?? 6;
  const [a, b] = o.angles;
  // The side from the bottom left corner to the top is across from the bottom right corner.
  const up = (base * Math.sin(rad(b))) / Math.sin(rad(a + b));
  const pos: P[] = [
    [x0, y0],
    [x0 + base, y0],
    [x0 + up * Math.cos(rad(a)), y0 + up * Math.sin(rad(a))],
  ];
  const [K0, K1, K2] = o.corners;
  const at: Record<string, P> = { [K0]: pos[0], [K1]: pos[1], [K2]: pos[2] };
  const points: Record<string, P> = { [n(K0)]: pos[0], [n(K1)]: pos[1], [n(K2)]: pos[2] };
  const items: DiagramItem[] = [];
  const others = (k: string) => o.corners.filter((c) => c !== k) as [string, string];
  for (const k of o.corners) {
    const [p, q] = others(k);
    const id = k.toLowerCase();
    const label = o.sides?.[id];
    const tone = o.pairs?.[k];
    items.push({ kind: 'line', id: n(id), from: n(p), to: n(q), ...(tone ? { tone } : {}), ...(label ? { label, labelSide: outside(at[p], at[q], at[k]) } : {}), group: n('shape') });
  }
  if (o.altitude) {
    const k = o.altitude;
    const [p, q] = others(k);
    const d = sub(at[q], at[p]);
    const t = ((at[k][0] - at[p][0]) * d[0] + (at[k][1] - at[p][1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
    points[n('foot')] = [at[p][0] + t * d[0], at[p][1] + t * d[1]];
    items.push(
      { kind: 'line', id: n('height'), from: n(k), to: n('foot'), tone: 'good', dashed: true, ...(o.altitudeLabel ? { label: o.altitudeLabel, labelSide: 'right' as const } : {}), group: n('alt') },
      { kind: 'right', id: n('height-mark'), at: n('foot'), from: n(k), to: n(t < 0.5 ? q : p), group: n('alt') },
    );
  }
  for (const k of o.corners) {
    const label = o.angleLabels?.[k];
    if (label === undefined) continue;
    const [p, q] = others(k);
    items.push({ kind: 'angle', id: n(k), at: n(k), from: n(p), to: n(q), ...(label ? { label } : {}), tone: o.pairs?.[k] ?? 'theta', ...(o.labelDist?.[k] ? { labelDist: o.labelDist[k] } : {}), ...(o.arc?.[k] ? { r: o.arc[k] } : {}), ...(o.labelAt?.[k] !== undefined ? { labelAt: o.labelAt[k] } : {}) });
  }
  const mid: P = [(pos[0][0] + pos[1][0] + pos[2][0]) / 3, (pos[0][1] + pos[1][1] + pos[2][1]) / 3];
  for (const k of o.corners) items.push({ kind: 'label', id: n(`n${k}`), at: n(k), tex: k, place: facing(deg(sub(at[k], mid))), group: n('names') });
  return { points, items };
}

/**
 * A path with a turn: from `start` it goes `legs[0]` to the turning point, turns `turn` degrees
 * to the right, and goes `legs[1]` to the end. The whole figure is tilted so that the line from
 * the start to the end rises at `tilt` degrees. Drawn to scale.
 *
 * Parts: `leg1` and `leg2` (labelled `labels.leg1` and `labels.leg2`), `ahead` (a group: the dashed
 * straight-ahead line and the turn angle `turn`), `inside` (the angle inside the triangle at the
 * turning point), `gap` (the dashed line from the start to the end, labelled `labels.gap`), and
 * `names` (a group: the letters of the three points).
 */
export function turnFigure(o: { name?: string; legs: [number, number]; turn: number; names: [string, string, string]; labels?: { leg1?: string; leg2?: string; gap?: string; turn?: string; inside?: string }; tilt?: number; ahead?: number }): Part {
  const n = namer(o.name);
  const [l1, l2] = o.legs;
  const inside = 180 - o.turn;
  const gap = Math.sqrt(l1 * l1 + l2 * l2 - 2 * l1 * l2 * Math.cos(rad(inside)));
  // The angle at the start, between the line to the end and the first leg.
  const atStart = (Math.asin((l2 * Math.sin(rad(inside))) / gap) * 180) / Math.PI;
  const tilt = o.tilt ?? 20;
  const head = tilt + atStart;
  const S: P = [0, 0];
  const T: P = [l1 * Math.cos(rad(head)), l1 * Math.sin(rad(head))];
  const E: P = [gap * Math.cos(rad(tilt)), gap * Math.sin(rad(tilt))];
  const ahead = o.ahead ?? 0.35 * l2;
  const X: P = [T[0] + ahead * Math.cos(rad(head)), T[1] + ahead * Math.sin(rad(head))];
  const [s, t, e] = o.names;
  const L = o.labels ?? {};
  const points: Record<string, P> = { [n('S')]: S, [n('T')]: T, [n('E')]: E, [n('X')]: X };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('leg1'), from: n('S'), to: n('T'), tone: 'adj', ...(L.leg1 ? { label: L.leg1, labelSide: 'left' as const } : {}) },
    { kind: 'line', id: n('leg2'), from: n('T'), to: n('E'), tone: 'adj', ...(L.leg2 ? { label: L.leg2, labelSide: 'left' as const, labelAt: 0.8 } : {}) },
    { kind: 'line', id: n('ahead-line'), from: n('T'), to: n('X'), tone: 'muted', dashed: true, group: n('ahead') },
    { kind: 'angle', id: n('turn'), at: n('T'), from: n('X'), to: n('E'), tone: 'theta', r: 52, ...(L.turn ? { label: L.turn, labelDist: 110 } : {}), group: n('ahead') },
    { kind: 'angle', id: n('inside'), at: n('T'), from: n('S'), to: n('E'), tone: 'hyp', r: 34, ...(L.inside ? { label: L.inside, labelDist: 70 } : {}) },
    { kind: 'line', id: n('gap'), from: n('S'), to: n('E'), tone: 'opp', dashed: true, ...(L.gap ? { label: L.gap, labelSide: 'right' as const } : {}) },
    { kind: 'label', id: n('nS'), at: n('S'), tex: s, place: 'below left', group: n('names') },
    { kind: 'label', id: n('nT'), at: n('T'), tex: t, place: 'above left', group: n('names') },
    { kind: 'label', id: n('nE'), at: n('E'), tex: e, place: 'below right', group: n('names') },
  ];
  return { points, items };
}

/**
 * A tower seen from two points in line with its base: from the far point at angle of elevation
 * `far`, and from the near point, `d` closer, at `near` (both in degrees). Drawn to scale, with
 * the near point's angle inside the oblique triangle (180° minus `near`) and the angle at the top.
 *
 * Parts: `ground` (a group: the ground and the base distance `d`, labelled `labels.d`), `tower`,
 * `sight1` and `sight2` (from the far and near points to the top), `far` and `near` (the angles
 * of elevation), `inside` (the angle inside the triangle at the near point), `top` (the angle at
 * the top of the oblique triangle), `h` (the height, labelled `labels.h`, with its right-angle
 * mark), and `names` (a group: the letters, far point, near point, top).
 */
export function elevationFigure(o: { name?: string; d: number; far: number; near: number; names: [string, string, string]; labels?: { d?: string; far?: string; near?: string; inside?: string; top?: string; h?: string; sight2?: string } }): Part {
  const n = namer(o.name);
  const tf = Math.tan(rad(o.far));
  const tn = Math.tan(rad(o.near));
  // The base of the tower is x from the near point, where h = x tan(near) = (x + d) tan(far).
  const x = (o.d * tf) / (tn - tf);
  const h = x * tn;
  const A: P = [0, 0];
  const B: P = [o.d, 0];
  const F: P = [o.d + x, 0];
  const T: P = [o.d + x, h];
  const L = o.labels ?? {};
  const [a, b, t] = o.names;
  const points: Record<string, P> = { [n('A')]: A, [n('B')]: B, [n('F')]: F, [n('T')]: T, [n('G')]: [o.d + x + 0.12 * o.d, 0] };
  const items: DiagramItem[] = [
    { kind: 'thing', id: n('tower'), type: 'tower', at: n('F'), top: n('T') },
    { kind: 'line', id: n('ground-line'), from: n('A'), to: n('G'), tone: 'muted', group: n('ground') },
    { kind: 'line', id: n('d'), from: n('A'), to: n('B'), tone: 'adj', weight: 5, ...(L.d ? { label: L.d, labelSide: 'right' as const } : {}), group: n('ground') },
    { kind: 'line', id: n('sight1'), from: n('A'), to: n('T'), tone: 'muted' },
    { kind: 'line', id: n('sight2'), from: n('B'), to: n('T'), tone: 'opp', ...(L.sight2 ? { label: L.sight2, labelSide: 'left' as const } : {}) },
    { kind: 'line', id: n('h'), from: n('F'), to: n('T'), tone: 'good', dashed: true, ...(L.h ? { label: L.h, labelSide: 'left' as const } : {}) },
    { kind: 'right', id: n('h-mark'), at: n('F'), from: n('B'), to: n('T') },
    { kind: 'angle', id: n('far'), at: n('A'), from: n('F'), to: n('T'), tone: 'theta', r: 60, ...(L.far ? { label: L.far, labelDist: 112 } : {}) },
    { kind: 'angle', id: n('near'), at: n('B'), from: n('F'), to: n('T'), tone: 'theta', r: 46, ...(L.near ? { label: L.near } : {}) },
    { kind: 'angle', id: n('inside'), at: n('B'), from: n('A'), to: n('T'), tone: 'hyp', r: 30, ...(L.inside ? { label: L.inside, labelDist: 66 } : {}) },
    { kind: 'angle', id: n('top'), at: n('T'), from: n('A'), to: n('B'), tone: 'hyp', r: 70, ...(L.top ? { label: L.top, labelDist: 105 } : {}) },
    { kind: 'label', id: n('nA'), at: n('A'), tex: a, place: 'below', group: n('names') },
    { kind: 'label', id: n('nB'), at: n('B'), tex: b, place: 'below', group: n('names') },
    { kind: 'label', id: n('nT'), at: n('T'), tex: t, place: 'above', group: n('names') },
  ];
  return { points, items };
}
