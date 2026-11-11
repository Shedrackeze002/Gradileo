/**
 * Force diagrams for the More Mathematics Topics mechanics videos, built from standard diagram
 * parts, so each goes into a diagram with `figure`.
 *
 * - `block`: a rectangle (a crate, a car, a particle drawn as a box), turned through `angle`
 *   degrees for one resting on a slope.
 * - `force`: an arrow from a point in a direction (degrees anticlockwise from the positive
 *   x-axis), with its label beyond the arrowhead.
 * - `segment`: a plain line, for the ground, a slope, a rod or a string.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const rad = (deg: number) => (deg * Math.PI) / 180;

/** The point `len` from `p` in the direction `deg`. */
export function along(p: P, deg: number, len: number): P {
  return [p[0] + len * Math.cos(rad(deg)), p[1] + len * Math.sin(rad(deg))];
}

/**
 * A rectangle `w` by `h` whose bottom edge is centred on `at`, turned through `angle` degrees
 * about `at`, with an optional label (TeX) in its middle. Parts: `<name>` (a group). The point
 * `<name>-c` is its centre, for forces that act there.
 */
export function block(name: string, at: P, w: number, h: number, o: { angle?: number; tone?: DiagramTone; tex?: string } = {}): Part {
  const a = o.angle ?? 0;
  const base = (dx: number, dy: number): P => {
    const c = Math.cos(rad(a));
    const s = Math.sin(rad(a));
    return [at[0] + dx * c - dy * s, at[1] + dx * s + dy * c];
  };
  const points: Record<string, P> = {
    [`${name}-0`]: base(-w / 2, 0),
    [`${name}-1`]: base(w / 2, 0),
    [`${name}-2`]: base(w / 2, h),
    [`${name}-3`]: base(-w / 2, h),
    [`${name}-c`]: base(0, h / 2),
  };
  const ring = [0, 1, 2, 3].map((i) => `${name}-${i}`);
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [
    { kind: 'region', id: `${name}-fill`, points: ring, tone, shade: 0.3, group: name },
    { kind: 'curve', id: `${name}-edge`, points: ring, closed: true, tone, weight: 3, group: name },
  ];
  if (o.tex) items.push({ kind: 'label', id: `${name}-tex`, at: `${name}-c`, tex: o.tex, place: 'center', group: name });
  return { points, items };
}

/** The place for a label beyond an arrow pointing in direction `deg`. */
function placeFor(deg: number): Place {
  const d = ((deg % 360) + 360) % 360;
  if (d < 22.5 || d >= 337.5) return 'right';
  if (d < 67.5) return 'above right';
  if (d < 112.5) return 'above';
  if (d < 157.5) return 'above left';
  if (d < 202.5) return 'left';
  if (d < 247.5) return 'below left';
  if (d < 292.5) return 'below';
  return 'below right';
}

/**
 * An arrow `len` long from `from` in the direction `deg`, labelled `tex` beyond its head. Parts:
 * `<name>` (a group: the arrow `<name>-arrow` and the label `<name>-tex`).
 */
export function force(name: string, from: P, deg: number, len: number, tex: string, o: { tone?: DiagramTone; place?: Place; dashed?: boolean; /** Put the label at the tail instead of beyond the head. */ tail?: boolean } = {}): Part {
  const tip = along(from, deg, len);
  const items: DiagramItem[] = [{ kind: 'line', id: `${name}-arrow`, from: `${name}-a`, to: `${name}-b`, tone: o.tone ?? 'bad', arrow: true, weight: 4, group: name, ...(o.dashed ? { dashed: true } : {}) }];
  if (tex) items.push({ kind: 'label', id: `${name}-tex`, at: o.tail ? `${name}-a` : `${name}-b`, tex, tone: o.tone ?? 'bad', place: o.place ?? placeFor(o.tail ? deg + 180 : deg), group: name });
  return { points: { [`${name}-a`]: from, [`${name}-b`]: tip }, items };
}

/** A plain line from `a` to `b`. Parts: `<name>` (a group). */
export function segment(name: string, a: P, b: P, o: { tone?: DiagramTone; weight?: number; dashed?: boolean; label?: string; labelSide?: 'left' | 'right' } = {}): Part {
  return {
    points: { [`${name}-a`]: a, [`${name}-b`]: b },
    items: [
      {
        kind: 'line',
        id: `${name}-line`,
        from: `${name}-a`,
        to: `${name}-b`,
        tone: o.tone ?? 'ink',
        weight: o.weight ?? 3,
        group: name,
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.label ? { label: o.label, labelSide: o.labelSide } : {}),
      },
    ],
  };
}
