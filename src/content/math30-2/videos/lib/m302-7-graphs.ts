/**
 * Helpers for the sinusoidal-functions videos (periodic behaviour, and modelling data with a
 * sinusoidal regression equation), built only from the standard graph parts in
 * `src/video/graph.ts`, so they go into a diagram with `figure`.
 *
 * A wave runs through the numbers that `plane` writes on its axes, so these graphs are drawn with
 * `every: 0` and numbered along the bottom and left edges of the plane with `edgeNumbers`, clear
 * of every curve. Angles in degrees are numbered with `degTex`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

export { arrow, edgeNumbers, hline, note, steps, vline } from '@/content/math30-1/videos/lib/m301-5-graphs.ts';

type P = [number, number];

/**
 * The plane with its x-axis named `x` (TeX, such as `t\text{ (s)}`) at the right-hand end of the
 * axis instead of "x", leaving the space under the axis numbers free (for a timeline of cycles).
 */
export function retitle(g: Plane, x: string): Plane {
  return { ...g, items: g.items.map((it) => (it.id === g.n('x-name') && it.kind === 'label' ? { ...it, tex: x } : it)) };
}

/** An angle in degrees as TeX, for numbering an axis: `degTex(45)` is `45^\circ`. */
export const degTex = (x: number) => (x === 0 ? '0' : `${Number(x.toFixed(6))}^\\circ`);

/**
 * A measurement along the plane between (x1, y1) and (x2, y2): a line with an arrowhead at each
 * end, drawn out from the middle, and a `label` beside the middle (`place`, above by default), or
 * `labelAt` of the way along (0 to 1 from `from`), to keep it clear of a line through the middle.
 * Parts: the two halves and the label, all in the group `id`.
 */
export function span(g: Plane, o: { id: string; from: P; to: P; label?: string; labelAt?: number; tone?: DiagramTone; place?: 'above' | 'below' | 'left' | 'right' }): Part {
  const [a, m, b, t] = [g.n(`${o.id}-a`), g.n(`${o.id}-m`), g.n(`${o.id}-b`), g.n(`${o.id}-at`)];
  const A = g.map(...o.from);
  const B = g.map(...o.to);
  const M: P = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const k = o.labelAt ?? 0.5;
  const T: P = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
  const tone = o.tone ?? 'theta';
  const group = g.n(o.id);
  const items: DiagramItem[] = [
    { kind: 'line', id: g.n(`${o.id}-0`), from: m, to: a, tone, arrow: true, weight: 3, group },
    { kind: 'line', id: g.n(`${o.id}-1`), from: m, to: b, tone, arrow: true, weight: 3, group },
  ];
  if (o.label) items.push({ kind: 'label', id: g.n(`${o.id}-t`), at: t, tex: o.label, tone, place: o.place ?? 'above', group });
  return { points: { [a]: A, [m]: M, [b]: B, [t]: T }, items };
}

/**
 * A shaded band on the plane from x = `from` to x = `to`, the full height of the plane (the stretch
 * of time the data cover), as the part `id`, with an optional label at its top.
 */
export function band(g: Plane, o: { id: string; from: number; to: number; tone?: DiagramTone; shade?: number; label?: string }): Part {
  const names = ['a', 'b', 'c', 'd'].map((k) => g.n(`${o.id}-${k}`));
  const corners: P[] = [g.map(o.from, g.y[0]), g.map(o.to, g.y[0]), g.map(o.to, g.y[1]), g.map(o.from, g.y[1])];
  const points: Record<string, P> = Object.fromEntries(names.map((n, i) => [n, corners[i]]));
  const items: DiagramItem[] = [{ kind: 'region', id: g.n(o.id), points: names, tone: o.tone ?? 'adj', shade: o.shade ?? 0.1, group: g.n(`${o.id}-all`) }];
  if (o.label) {
    const t = g.n(`${o.id}-top`);
    points[t] = g.map((o.from + o.to) / 2, g.y[1]);
    items.push({ kind: 'label', id: g.n(`${o.id}-t`), at: t, tex: o.label, tone: o.tone ?? 'adj', place: 'above', group: g.n(`${o.id}-all`) });
  }
  return { points, items };
}

/**
 * A Ferris wheel seen from the side: the wheel (radius `r`, centre `c` above the ground), its
 * centre, the ground and the boarding platform at the bottom of the wheel, with dashed levels
 * across to the right at the bottom, the centre and the top of the wheel.
 *
 * Parts: `ground`, `wheel`, `spokes` (a group), `hub`, `platform`, `r` (the radius, labelled
 * `labels.r`), and the levels `low`, `mid` and `top` (each a dashed line with its label).
 */
export function ferrisWheel(o: { r: number; c: number; labels: { r?: string; low?: string; mid?: string; top?: string } }): Part {
  const { r, c } = o;
  const points: Record<string, P> = { O: [0, c], G0: [-r - 4, 0], G1: [r + 14, 0], B: [0, c - r], T: [0, c + r], R: [r, c] };
  const items: DiagramItem[] = [{ kind: 'thing', id: 'ground', type: 'ground', at: 'G0' }];
  const ring: string[] = [];
  for (let i = 0; i < 72; i++) {
    const t = (2 * Math.PI * i) / 72;
    points[`w${i}`] = [r * Math.cos(t), c + r * Math.sin(t)];
    ring.push(`w${i}`);
  }
  for (let k = 0; k < 8; k++) {
    const t = (2 * Math.PI * k) / 8 + Math.PI / 8;
    points[`s${k}`] = [r * Math.cos(t), c + r * Math.sin(t)];
    items.push({ kind: 'line', id: `spoke${k}`, from: 'O', to: `s${k}`, tone: 'muted', weight: 1.5, group: 'spokes' });
  }
  // Legs from the hub down to the ground.
  Object.assign(points, { L0: [-0.45 * r, 0], L1: [0.45 * r, 0] });
  items.push(
    { kind: 'line', id: 'leg0', from: 'O', to: 'L0', tone: 'muted', weight: 3, group: 'spokes' },
    { kind: 'line', id: 'leg1', from: 'O', to: 'L1', tone: 'muted', weight: 3, group: 'spokes' },
    { kind: 'curve', id: 'wheel', points: ring, closed: true, tone: 'brand', weight: 3.5 },
    { kind: 'label', id: 'hub', at: 'O', tex: '', tone: 'ink', dot: true },
  );
  // The platform: a short step under the bottom of the wheel.
  Object.assign(points, { P0: [-0.35 * r, c - r], P1: [-0.08 * r, c - r], P2: [-0.35 * r, 0] });
  items.push({ kind: 'line', id: 'platform', from: 'P0', to: 'P1', tone: 'opp', weight: 5 }, { kind: 'line', id: 'platform-leg', from: 'P0', to: 'P2', tone: 'opp', weight: 2, group: 'platform' });
  items.push({ kind: 'line', id: 'r', from: 'O', to: 'R', tone: 'adj', weight: 3.5, ...(o.labels.r ? { label: o.labels.r, labelSide: 'left' as const } : {}) });
  const x2 = r + 10;
  for (const [id, y, tone] of [
    ['low', c - r, 'opp'],
    ['mid', c, 'adj'],
    ['top', c + r, 'good'],
  ] as const) {
    points[`${id}-a`] = [id === 'mid' ? r : 0, y];
    points[`${id}-b`] = [x2, y];
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, dashed: true, weight: 2, group: `${id}-all` });
    const tex = o.labels[id];
    if (tex) items.push({ kind: 'label', id: `${id}-t`, at: `${id}-b`, tex, tone, place: 'right', group: `${id}-all` });
  }
  return { points, items };
}

/**
 * A circle for measuring turns, without the axes running past it (their labels would collide with
 * the angles'): faint axes inside the circle, and a dot on the circle at each of `points`, with its
 * label (TeX) outside the circle at `place`.
 *
 * Parts: `circle`, `axes` (a group), and each point `p<deg>` (its dot and label, as a group).
 */
export function turnCircle(o: { r?: number; points: { deg: number; tex: string; place: 'above' | 'below' | 'left' | 'right' }[] }): Part {
  const R = o.r ?? 3;
  const at = (deg: number, k = 1): P => [k * R * Math.cos((deg * Math.PI) / 180), k * R * Math.sin((deg * Math.PI) / 180)];
  const points: Record<string, P> = { L: [-R, 0], Rt: [R, 0], D: [0, -R], U: [0, R] };
  const ring: string[] = [];
  for (let i = 0; i < 96; i++) {
    points[`c${i}`] = at(i * 3.75);
    ring.push(`c${i}`);
  }
  const items: DiagramItem[] = [
    { kind: 'line', id: 'ax', from: 'L', to: 'Rt', tone: 'muted', weight: 1.5, group: 'axes' },
    { kind: 'line', id: 'ay', from: 'D', to: 'U', tone: 'muted', weight: 1.5, group: 'axes' },
    { kind: 'curve', id: 'circle', points: ring, closed: true, tone: 'brand', weight: 3 },
  ];
  for (const p of o.points) {
    points[`p${p.deg}`] = at(p.deg);
    items.push(
      { kind: 'label', id: `p${p.deg}-dot`, at: `p${p.deg}`, tex: '', tone: 'theta', dot: true, group: `p${p.deg}` },
      { kind: 'label', id: `p${p.deg}-t`, at: `p${p.deg}`, tex: p.tex, tone: 'theta', place: p.place, group: `p${p.deg}` },
    );
  }
  return { points, items };
}
