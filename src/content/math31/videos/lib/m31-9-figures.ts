/**
 * Figures for the videos on areas between curves and volumes of revolution, built from the plane
 * helpers in `m31-8-graphs.ts`, so each goes into a diagram with `figure`:
 *
 * - `revolveX`: the region under y = f(x) (or between two graphs) and the solid it sweeps out
 *   when it turns about the x-axis, drawn on the plane: the mirror image of each curve, the end
 *   faces as ellipses, and one slice, a disc or a washer, with its radii.
 * - `revolveY`: the same for a curve x = g(y) turning about the y-axis.
 * - `faces`: a disc and a washer seen face on, with their radii, to compare their areas.
 *
 * Radii are blue (an inner radius orange), as in the other videos.
 */
import type { Plane } from '@/video/graph.ts';
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { area, join, path, plot, sideways } from './m31-8-graphs.ts';

type P = [number, number];
type F = (x: number) => number;

/** How much narrower than tall a circle looks when seen nearly edge on. */
const TILT = 0.3;

/** Points round an ellipse on the plane: centre (cx, cy), half-widths `rx` and `ry` in plane units. */
function ellipsePts(cx: number, cy: number, rx: number, ry: number, steps = 48): P[] {
  return Array.from({ length: steps }, (_, i) => {
    const t = (2 * Math.PI * i) / steps;
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)] as P;
  });
}

/** Plane units across that look as long as one unit up (they differ when `width` and `height` stretch the plane). */
function across(g: Plane): number {
  const sx = g.map(1, 0)[0] - g.map(0, 0)[0];
  const sy = g.map(0, 1)[1] - g.map(0, 0)[1];
  return sy / sx;
}

/** A shaded ring between two ellipses with the same centre (a washer seen nearly edge on), as a region `id`. */
function ringRegion(g: Plane, id: string, outer: P[], inner: P[], tone: DiagramTone, shade: number, group?: string): Part {
  const points: Record<string, P> = {};
  const names: string[] = [];
  const put = (p: P, k: string) => {
    const name = g.n(`${id}-${k}`);
    points[name] = g.map(p[0], p[1]);
    names.push(name);
  };
  outer.forEach((p, i) => put(p, `o${i}`));
  put(outer[0], 'o-end');
  put(inner[0], 'i-start');
  [...inner].reverse().forEach((p, i) => put(p, `i${i}`));
  return { points, items: [{ kind: 'region', id: g.n(id), points: names, tone, shade, ...(group ? { group: g.n(group) } : {}) }] };
}

/**
 * The region under y = `f` (above y = `inner`, if given) from x = `from` to x = `to`, and the solid
 * it sweeps out turning about the x-axis.
 *
 * Parts (prefixed with `id`): `-curve` and `-inner` (the graphs), `-region` (the flat region),
 * `-solid` (a group: the mirror images, dashed, the solid's light shading and the end faces), and,
 * with a `slice` at x, `-disc` (a group: the slice, a disc or a washer, with its outline), `-R` (the
 * radius up to `f`, labelled) and `-r` (the inner radius down to the mirror of `inner`, labelled).
 */
export function revolveX(g: Plane, o: { id: string; f: F; inner?: F; from: number; to: number; tone?: DiagramTone; slice?: { x: number; R?: string; r?: string; Rplace?: Place; rplace?: Place }; samples?: number }): Part {
  const tone = o.tone ?? 'brand';
  const k = across(g) * TILT;
  const neg = (h: F) => (x: number) => -h(x);
  const parts: Part[] = [
    area(g, { id: `${o.id}-body`, f: o.f, lower: neg(o.f), from: o.from, to: o.to, tone, shade: 0.08, group: `${o.id}-solid` }),
    plot(g, { id: `${o.id}-mirror`, f: neg(o.f), from: o.from, to: o.to, tone, dashed: true, samples: o.samples ?? 120 }),
  ];
  // The mirror image shows with the rest of the solid.
  for (const item of parts[1].items) item.group = g.n(`${o.id}-solid`);
  if (o.inner) {
    const inner = plot(g, { id: `${o.id}-inner-mirror`, f: neg(o.inner), from: o.from, to: o.to, tone: 'opp', dashed: true, samples: o.samples ?? 120 });
    for (const item of inner.items) item.group = g.n(`${o.id}-solid`);
    parts.push(inner);
  }
  // End faces, where the region has height at its ends.
  for (const [x, key] of [
    [o.from, 'start'],
    [o.to, 'end'],
  ] as const) {
    const R = o.f(x);
    if (R < 1e-6) continue;
    const r = o.inner ? o.inner(x) : 0;
    if (r > 1e-6 && Math.abs(R - r) < 1e-6) continue;
    parts.push(path(g, { id: `${o.id}-${key}`, pts: ellipsePts(x, 0, k * R, R), closed: true, tone, weight: 2.5, group: `${o.id}-solid` }));
    if (r > 1e-6) parts.push(path(g, { id: `${o.id}-${key}-hole`, pts: ellipsePts(x, 0, k * r, r), closed: true, tone: 'opp', weight: 2.5, group: `${o.id}-solid` }));
  }
  parts.push(area(g, { id: `${o.id}-region`, f: o.f, lower: o.inner, from: o.from, to: o.to, tone, shade: 0.4 }));
  parts.push(plot(g, { id: `${o.id}-curve`, f: o.f, from: o.from, to: o.to, tone, samples: o.samples ?? 120 }));
  if (o.inner) parts.push(plot(g, { id: `${o.id}-inner`, f: o.inner, from: o.from, to: o.to, tone: 'opp', samples: o.samples ?? 120 }));
  if (o.slice) {
    const { x } = o.slice;
    const R = o.f(x);
    const outer = ellipsePts(x, 0, k * R, R);
    if (o.inner) {
      const r = o.inner(x);
      const inner = ellipsePts(x, 0, k * r, r);
      parts.push(
        ringRegion(g, `${o.id}-disc-fill`, outer, inner, 'theta', 0.5, `${o.id}-disc`),
        path(g, { id: `${o.id}-disc-edge`, pts: outer, closed: true, tone: 'theta', weight: 3, group: `${o.id}-disc` }),
        path(g, { id: `${o.id}-disc-hole`, pts: inner, closed: true, tone: 'theta', weight: 3, group: `${o.id}-disc` }),
      );
    } else {
      parts.push(
        path(g, { id: `${o.id}-disc-edge`, pts: outer, closed: true, tone: 'theta', weight: 3, group: `${o.id}-disc` }),
        area(g, { id: `${o.id}-disc-shade`, f: (t) => Math.sqrt(Math.max(0, R * R - ((t - x) / k) ** 2)), lower: (t) => -Math.sqrt(Math.max(0, R * R - ((t - x) / k) ** 2)), from: x - k * R, to: x + k * R, tone: 'theta', shade: 0.45, group: `${o.id}-disc` }),
      );
    }
    const pts: Record<string, P> = { [g.n(`${o.id}-ax`)]: g.map(x, 0), [g.n(`${o.id}-Rt`)]: g.map(x, R) };
    // Each radius is labelled beyond its end, clear of the slice: the outer one above the curve, the
    // inner one below the mirror of the inner curve.
    const items: DiagramItem[] = [{ kind: 'line', id: g.n(`${o.id}-R`), from: g.n(`${o.id}-ax`), to: g.n(`${o.id}-Rt`), tone: 'adj', weight: 4 }];
    if (o.slice.R) items.push({ kind: 'label', id: g.n(`${o.id}-R-label`), at: g.n(`${o.id}-Rt`), tex: o.slice.R, tone: 'adj', place: o.slice.Rplace ?? 'above', group: g.n(`${o.id}-R`) });
    if (o.inner) {
      pts[g.n(`${o.id}-rt`)] = g.map(x, -o.inner(x));
      items.push({ kind: 'line', id: g.n(`${o.id}-r`), from: g.n(`${o.id}-ax`), to: g.n(`${o.id}-rt`), tone: 'opp', weight: 4 });
      if (o.slice.r) items.push({ kind: 'label', id: g.n(`${o.id}-r-label`), at: g.n(`${o.id}-rt`), tex: o.slice.r, tone: 'opp', place: o.slice.rplace ?? 'below', group: g.n(`${o.id}-r`) });
    }
    parts.push({ points: pts, items });
  }
  return join(parts);
}

/**
 * The region between the y-axis and the curve x = `h`(y) from y = `from` to y = `to`, and the solid
 * it sweeps out turning about the y-axis. Parts (prefixed with `id`): `-curve`, `-region`,
 * `-solid` (a group: the mirror image, dashed, the shading and the top face) and, with a `slice`
 * at height y, `-disc` (a group) and `-R` (its radius, labelled).
 */
export function revolveY(g: Plane, o: { id: string; h: F; from: number; to: number; tone?: DiagramTone; slice?: { y: number; R?: string } }): Part {
  const tone = o.tone ?? 'brand';
  // Seen from a little above, a level circle looks flatter than it is wide.
  const k = TILT / across(g);
  const parts: Part[] = [];
  const body = [...sideways(o.h, o.from, o.to), ...sideways((y) => -o.h(y), o.from, o.to).reverse()];
  parts.push(regionOf(g, `${o.id}-body`, body, tone, 0.08, `${o.id}-solid`));
  parts.push(path(g, { id: `${o.id}-mirror`, pts: sideways((y) => -o.h(y), o.from, o.to), tone, dashed: true, group: `${o.id}-solid` }));
  const top = o.h(o.to);
  parts.push(path(g, { id: `${o.id}-top`, pts: ellipsePts(0, o.to, top, k * top), closed: true, tone, weight: 2.5, group: `${o.id}-solid` }));
  parts.push(regionOf(g, `${o.id}-region`, [...sideways(o.h, o.from, o.to), [0, o.to], [0, o.from]], tone, 0.4));
  parts.push(path(g, { id: `${o.id}-curve`, pts: sideways(o.h, o.from, o.to), tone }));
  if (o.slice) {
    const { y } = o.slice;
    const R = o.h(y);
    const disc = ellipsePts(0, y, R, k * R);
    parts.push(regionOf(g, `${o.id}-disc-shade`, disc, 'theta', 0.45, `${o.id}-disc`));
    parts.push(path(g, { id: `${o.id}-disc-edge`, pts: disc, closed: true, tone: 'theta', weight: 3, group: `${o.id}-disc` }));
    const pts: Record<string, P> = { [g.n(`${o.id}-ax`)]: g.map(0, y), [g.n(`${o.id}-Rt`)]: g.map(R, y) };
    const items: DiagramItem[] = [{ kind: 'line', id: g.n(`${o.id}-R`), from: g.n(`${o.id}-ax`), to: g.n(`${o.id}-Rt`), tone: 'adj', weight: 4 }];
    if (o.slice.R) items.push({ kind: 'label', id: g.n(`${o.id}-R-label`), at: g.n(`${o.id}-Rt`), tex: o.slice.R, tone: 'adj', place: 'right', group: g.n(`${o.id}-R`) });
    parts.push({ points: pts, items });
  }
  return join(parts);
}

/**
 * The region between two curves given as x in terms of y, from y = `from` to y = `to`: x = `left`(y)
 * on the left and x = `right`(y) on the right, shaded: the part `id`.
 */
export function areaY(g: Plane, o: { id: string; right: F; left: F; from: number; to: number; tone?: DiagramTone; shade?: number }): Part {
  return regionOf(g, o.id, [...sideways(o.right, o.from, o.to), ...sideways(o.left, o.from, o.to).reverse()], o.tone ?? 'brand', o.shade ?? 0.3);
}

/** A shaded polygon through points of the plane: the part `id`. */
function regionOf(g: Plane, id: string, pts: P[], tone: DiagramTone, shade: number, group?: string): Part {
  const points: Record<string, P> = {};
  const names = pts.map((p, i) => {
    const name = g.n(`${id}-p${i}`);
    points[name] = g.map(p[0], p[1]);
    return name;
  });
  return { points, items: [{ kind: 'region', id: g.n(id), points: names, tone, shade, ...(group ? { group: g.n(group) } : {}) }] };
}

/**
 * A disc of radius `r` and a washer with radii `R` and `rIn`, face on, side by side, `gap` apart
 * (or the disc alone, with `only: 'disc'`).
 * Parts: `disc` (a group: the shading and edge), `disc-r` (its radius, labelled), `washer` (a
 * group: the ring and both edges), `washer-R` and `washer-r` (its radii, labelled), and the
 * captions `disc-cap` and `washer-cap`.
 */
export function faces(o: { r: number; R: number; rIn: number; gap?: number; only?: 'disc'; labels: { r: string; R: string; rIn: string; disc?: string; washer?: string } }): Part {
  const gap = o.gap ?? 2.5;
  const cx = o.r + gap + o.R;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const circle = (key: string, c: P, r: number) =>
    Array.from({ length: 72 }, (_, i) => {
      const t = (2 * Math.PI * i) / 72;
      const name = `${key}${i}`;
      points[name] = [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
      return name;
    });
  const disc = circle('dc', [0, 0], o.r);
  items.push({ kind: 'region', id: 'disc-fill', points: disc, tone: 'theta', shade: 0.35, group: 'disc' }, { kind: 'curve', id: 'disc-edge', points: disc, closed: true, tone: 'theta', weight: 3, group: 'disc' });
  if (o.only === 'disc') {
    Object.assign(points, { dO: [0, 0], dR: [o.r * Math.cos(Math.PI / 4), o.r * Math.sin(Math.PI / 4)], dcap: [0, -o.r - 0.35] });
    items.push({ kind: 'line', id: 'disc-r', from: 'dO', to: 'dR', tone: 'adj', weight: 4, label: o.labels.r, labelSide: 'left' });
    if (o.labels.disc) items.push({ kind: 'label', id: 'disc-cap', at: 'dcap', tex: o.labels.disc, tone: 'ink', place: 'below' });
    return { points, items };
  }
  const outer = circle('wo', [cx, 0], o.R);
  const inner = circle('wi', [cx, 0], o.rIn);
  items.push(
    { kind: 'region', id: 'washer-fill', points: [...outer, outer[0], inner[0], ...[...inner].reverse()], tone: 'theta', shade: 0.35, group: 'washer' },
    { kind: 'curve', id: 'washer-out', points: outer, closed: true, tone: 'theta', weight: 3, group: 'washer' },
    { kind: 'curve', id: 'washer-in', points: inner, closed: true, tone: 'theta', weight: 3, group: 'washer' },
  );
  const a = Math.PI / 4;
  Object.assign(points, {
    dO: [0, 0],
    dR: [o.r * Math.cos(a), o.r * Math.sin(a)],
    wO: [cx, 0],
    wR: [cx + o.R * Math.cos(a), o.R * Math.sin(a)],
    wr: [cx + o.rIn * Math.cos(-a), o.rIn * Math.sin(-a)],
    dcap: [0, -o.r - 0.35],
    wcap: [cx, -o.R - 0.35],
  });
  items.push(
    { kind: 'line', id: 'disc-r', from: 'dO', to: 'dR', tone: 'adj', weight: 4, label: o.labels.r, labelSide: 'left' },
    { kind: 'line', id: 'washer-R', from: 'wO', to: 'wR', tone: 'adj', weight: 4, label: o.labels.R, labelSide: 'left' },
    { kind: 'line', id: 'washer-r', from: 'wO', to: 'wr', tone: 'opp', weight: 4, label: o.labels.rIn, labelSide: 'right' },
  );
  if (o.labels.disc) items.push({ kind: 'label', id: 'disc-cap', at: 'dcap', tex: o.labels.disc, tone: 'ink', place: 'below' });
  if (o.labels.washer) items.push({ kind: 'label', id: 'washer-cap', at: 'wcap', tex: o.labels.washer, tone: 'ink', place: 'below' });
  return { points, items };
}
