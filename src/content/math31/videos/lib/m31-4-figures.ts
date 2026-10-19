/**
 * Figures for the differentiation-rules videos, built only from standard diagram parts (lines,
 * curves, shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `growingRectangle`: a rectangle of sides u and v that grows by Δu and Δv, for the product rule.
 *   Its new area is the old one plus a strip v·Δu, a strip u·Δv and a small corner Δu·Δv.
 * - `gear`: a toothed gear with a name at its hub, and `gearTrain`, gears in a row that turn one
 *   another, for the chain rule: a gear a third the size of the one driving it turns three times as
 *   fast.
 *
 * Graphs (tangent lines, secant lines, plane numbers) come from `m31-3-graphs.ts`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * A rectangle u wide and v tall (drawn `w` by `h`), growing by Δu to the right and Δv upward
 * (drawn `dw` and `dh`).
 *
 * Parts: `base` (a group: the shaded rectangle `uv`, its outline, its area label and the side
 * labels `u` and `v`), `right` (the strip v·Δu with its labels), `top` (the strip u·Δv with its
 * labels) and `corner` (the small corner Δu·Δv and its label, above the corner).
 */
export function growingRectangle(o: { name?: string; w: number; h: number; dw: number; dh: number }): Part {
  const n = namer(o.name);
  const { w, h, dw, dh } = o;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const pt = (id: string, p: P) => ((points[n(id)] = p), n(id));
  const box = (id: string, x0: number, y0: number, x1: number, y1: number, tone: DiagramTone, shade: number, group: string) => {
    const c = [pt(`${id}-0`, [x0, y0]), pt(`${id}-1`, [x1, y0]), pt(`${id}-2`, [x1, y1]), pt(`${id}-3`, [x0, y1])];
    items.push({ kind: 'region', id: n(id), points: c, tone, shade, group: n(group) });
    const edge = (k: number, a: string, b: string) => items.push({ kind: 'line', id: n(`${id}-e${k}`), from: a, to: b, tone, weight: 2.5, group: n(group) });
    edge(0, c[0], c[1]);
    edge(1, c[1], c[2]);
    edge(2, c[2], c[3]);
    edge(3, c[3], c[0]);
  };
  const label = (id: string, at: P, tex: string, tone: DiagramTone, place: 'center' | 'below' | 'left' | 'above', group: string) => {
    items.push({ kind: 'label', id: n(id), at: pt(`${id}-at`, at), tex, tone, place, group: n(group) });
  };
  box('uv', 0, 0, w, h, 'brand', 0.22, 'base');
  label('uv-t', [w / 2, h / 2], 'uv', 'ink', 'center', 'base');
  label('u', [w / 2, 0], 'u', 'brand', 'below', 'base');
  label('v', [0, h / 2], 'v', 'brand', 'left', 'base');
  box('r', w, 0, w + dw, h, 'opp', 0.3, 'right');
  label('r-t', [w + dw / 2, h / 2], 'v\\,\\Delta u', 'opp', 'center', 'right');
  label('du', [w + dw / 2, 0], '\\Delta u', 'opp', 'below', 'right');
  box('t', 0, h, w, h + dh, 'adj', 0.3, 'top');
  label('t-t', [w / 2, h + dh / 2], 'u\\,\\Delta v', 'adj', 'center', 'top');
  label('dv', [0, h + dh / 2], '\\Delta v', 'adj', 'left', 'top');
  box('c', w, h, w + dw, h + dh, 'bad', 0.3, 'corner');
  label('c-t', [w + dw / 2, h + dh], '\\Delta u\\,\\Delta v', 'bad', 'above', 'corner');
  return { points, items };
}

/**
 * A gear centred at `at` with `teeth` teeth reaching out to radius `r` (each `depth` deep), a hub,
 * and its name (TeX) at the centre, or just above the gear with `nameAbove` (for a gear too small
 * to hold it): the part `id` (a group of `id-rim`, `id-hub` and `id-name`).
 */
export function gear(o: { id: string; at: P; r: number; teeth: number; depth?: number; tone?: DiagramTone; name: string; nameAbove?: boolean; turn?: number }): Part {
  const d = o.depth ?? 0.16;
  const step = (2 * Math.PI) / o.teeth;
  const turn = o.turn ?? 0;
  const points: Record<string, P> = {};
  const rim: string[] = [];
  const add = (a: number, rad: number) => {
    const id = `${o.id}-r${rim.length}`;
    points[id] = [o.at[0] + rad * Math.cos(a), o.at[1] + rad * Math.sin(a)];
    rim.push(id);
  };
  for (let k = 0; k < o.teeth; k++) {
    const a = turn + k * step;
    add(a, o.r - d);
    add(a + 0.18 * step, o.r);
    add(a + 0.5 * step, o.r);
    add(a + 0.68 * step, o.r - d);
  }
  const hub: string[] = [];
  const hr = Math.min(0.35 * o.r, 0.45);
  for (let i = 0; i < 24; i++) {
    const id = `${o.id}-h${i}`;
    const a = (2 * Math.PI * i) / 24;
    points[id] = [o.at[0] + hr * Math.cos(a), o.at[1] + hr * Math.sin(a)];
    hub.push(id);
  }
  points[`${o.id}-c`] = o.nameAbove ? [o.at[0], o.at[1] + o.r + 0.1] : o.at;
  const tone = o.tone ?? 'brand';
  return {
    points,
    items: [
      { kind: 'curve', id: `${o.id}-rim`, points: rim, closed: true, tone, weight: 3, group: o.id },
      { kind: 'curve', id: `${o.id}-hub`, points: hub, closed: true, tone: 'muted', weight: 2, group: o.id },
      { kind: 'label', id: `${o.id}-name`, at: `${o.id}-c`, tex: o.name, tone, place: o.nameAbove ? 'above' : 'center', group: o.id },
    ],
  };
}

/**
 * Gears in a row, left to right, each meshing with the next: `list` gives each gear's id, name
 * (written above the gear), radius, number of teeth and colour, and an optional caption (TeX)
 * below it (`<id>-cap`, in the gear's group), at height `captionY` (just under the gear unless
 * given, so that captions of small neighbouring gears can be staggered).
 */
export function gearTrain(list: { id: string; name: string; r: number; teeth: number; tone?: DiagramTone; caption?: string; captionY?: number }[]): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = 0;
  list.forEach((g, i) => {
    if (i > 0) x += list[i - 1].r + g.r - 0.1;
    // Turn every other gear by half a tooth, so the teeth sit between each other.
    const part = gear({ id: g.id, at: [x, 0], r: g.r, teeth: g.teeth, tone: g.tone, name: g.name, nameAbove: true, turn: i % 2 ? Math.PI / g.teeth : 0 });
    Object.assign(points, part.points);
    items.push(...part.items);
    if (g.caption) {
      points[`${g.id}-k`] = [x, g.captionY ?? -g.r - 0.25];
      items.push({ kind: 'label', id: `${g.id}-cap`, at: `${g.id}-k`, tex: g.caption, tone: g.tone ?? 'brand', place: 'below', group: g.id });
    }
  });
  return { points, items };
}
