/**
 * Figures for the More Mathematics Topics videos, built only from standard diagram parts, so each
 * goes into a diagram with `figure`.
 *
 * - `dotPlot`: a number line with a stack of dots above each value.
 * - `boxPlot`: one or more box plots over a shared number line.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A number line from `min` to `max`, `length` units long, numbered every `step`. Parts: `axis` (a group). */
function axis(n: (s: string) => string, min: number, max: number, step: number, length: number, label?: string): { points: Record<string, P>; items: DiagramItem[]; X: (v: number) => number } {
  const X = (v: number) => ((v - min) / (max - min)) * length;
  const points: Record<string, P> = { [n('L')]: [-0.3, 0], [n('R')]: [length + 0.3, 0] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: n('axis') }];
  const count = Math.round((max - min) / step);
  for (let i = 0; i <= count; i++) {
    const v = Number((min + i * step).toFixed(6));
    Object.assign(points, { [n(`t${i}a`)]: [X(v), -0.2], [n(`t${i}b`)]: [X(v), 0.2] });
    items.push(
      { kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: 2.5, group: n('axis') },
      { kind: 'label', id: n(`num${i}`), at: n(`t${i}a`), tex: String(v), tone: 'muted', place: 'below', group: n('axis') },
    );
  }
  if (label) {
    points[n('title')] = [length / 2, -1.3];
    items.push({ kind: 'label', id: n('title'), at: n('title'), tex: `\\text{${label}}`, tone: 'muted', place: 'center', group: n('axis') });
  }
  return { points, items, X };
}

/**
 * A dot plot: each value as a dot above a number line, equal values stacked.
 *
 * Parts: `axis` (a group), each stack `s<value>` (a group, so a stack can be shown or
 * emphasised; `stacks` lists them all), and each dot `d<value>-<k>` (k from 0 at the bottom).
 */
export function dotPlot(o: { name?: string; values: number[]; min: number; max: number; step?: number; length?: number; label?: string; tone?: DiagramTone; gap?: number }): Part {
  const n = namer(o.name);
  const a = axis(n, o.min, o.max, o.step ?? 1, o.length ?? 12, o.label);
  const gap = o.gap ?? 0.55;
  const r = gap * 0.4;
  const count = new Map<number, number>();
  for (const v of o.values) {
    const k = count.get(v) ?? 0;
    count.set(v, k + 1);
    const c: P = [a.X(v), 0.6 + k * gap];
    const ring = Array.from({ length: 16 }, (_, j) => {
      const key = n(`d${v}-${k}-${j}`);
      a.points[key] = [c[0] + r * Math.cos((j * Math.PI) / 8), c[1] + r * Math.sin((j * Math.PI) / 8)];
      return key;
    });
    a.items.push({ kind: 'region', id: n(`d${v}-${k}`), points: ring, tone: o.tone ?? 'adj', shade: 0.95, group: n(`s${v}`) });
  }
  return { points: a.points, items: a.items };
}

/**
 * Box plots over one number line: each plot's box from Q1 to Q3 with a line at the median, and
 * whiskers to the minimum and maximum. Plots are stacked upwards, the first lowest.
 *
 * Parts of plot i (its `id`, "p" + i by default): `<id>-box` (a group: the box and its fill),
 * `<id>-med` (the median), `<id>-lw` and `<id>-rw` (the whiskers, groups with their end marks), and
 * `<id>-name` (its name, when given); `whole(d, id)` lists them all. The axis is `axis` (a group).
 */
export function boxPlot(o: {
  name?: string;
  plots: { id?: string; min: number; q1: number; median: number; q3: number; max: number; label?: string; tone?: DiagramTone }[];
  min: number;
  max: number;
  step?: number;
  length?: number;
  label?: string;
}): Part {
  const n = namer(o.name);
  const a = axis(n, o.min, o.max, o.step ?? 1, o.length ?? 12, o.label);
  const H = 1.1;
  o.plots.forEach((p, i) => {
    const id = n(p.id ?? `p${i}`);
    const y = 1.6 + i * 2.4;
    const tone = p.tone ?? 'adj';
    const pt = (k: string, v: number, dy: number) => (a.points[`${id}-${k}`] = [a.X(v), y + dy]);
    pt('mn', p.min, 0);
    pt('mx', p.max, 0);
    pt('q1b', p.q1, -H / 2);
    pt('q1t', p.q1, H / 2);
    pt('q3b', p.q3, -H / 2);
    pt('q3t', p.q3, H / 2);
    pt('mdb', p.median, -H / 2);
    pt('mdt', p.median, H / 2);
    pt('q1m', p.q1, 0);
    pt('q3m', p.q3, 0);
    pt('mnb', p.min, -H / 4);
    pt('mnt', p.min, H / 4);
    pt('mxb', p.max, -H / 4);
    pt('mxt', p.max, H / 4);
    const box = `${id}-box`;
    a.items.push(
      { kind: 'region', id: `${id}-fill`, points: [`${id}-q1b`, `${id}-q3b`, `${id}-q3t`, `${id}-q1t`], tone, shade: 0.18, group: box },
      { kind: 'line', id: `${id}-b1`, from: `${id}-q1b`, to: `${id}-q3b`, tone, weight: 3, group: box },
      { kind: 'line', id: `${id}-b2`, from: `${id}-q3b`, to: `${id}-q3t`, tone, weight: 3, group: box },
      { kind: 'line', id: `${id}-b3`, from: `${id}-q3t`, to: `${id}-q1t`, tone, weight: 3, group: box },
      { kind: 'line', id: `${id}-b4`, from: `${id}-q1t`, to: `${id}-q1b`, tone, weight: 3, group: box },
      { kind: 'line', id: `${id}-med`, from: `${id}-mdb`, to: `${id}-mdt`, tone: 'theta', weight: 5, },
      { kind: 'line', id: `${id}-lw`, from: `${id}-mn`, to: `${id}-q1m`, tone, weight: 3, },
      { kind: 'line', id: `${id}-lwe`, from: `${id}-mnb`, to: `${id}-mnt`, tone, weight: 3, group: `${id}-lw` },
      { kind: 'line', id: `${id}-rw`, from: `${id}-q3m`, to: `${id}-mx`, tone, weight: 3, },
      { kind: 'line', id: `${id}-rwe`, from: `${id}-mxb`, to: `${id}-mxt`, tone, weight: 3, group: `${id}-rw` },
    );
    if (p.label) {
      a.points[`${id}-nm`] = [-0.6, y];
      a.items.push({ kind: 'label', id: `${id}-name`, at: `${id}-nm`, tex: `\\text{${p.label}}`, place: 'left' });
    }
  });
  return { points: a.points, items: a.items };
}

/** The stacks of a dot plot in diagram `d`, to show every dot ("d.s3"…). */
export const stacks = (d: string, values: number[], name?: string): string[] => [...new Set(values)].map((v) => `${d}.${namer(name)(`s${v}`)}`);

/** Every part of box plot `id` in diagram `d`, to show it whole. */
export const whole = (d: string, id: string, named = false): string[] => [`${d}.${id}-lw`, `${d}.${id}-box`, `${d}.${id}-med`, `${d}.${id}-rw`, ...(named ? [`${d}.${id}-name`] : [])];

/**
 * A flat shape drawn on or beside a solid: a cross-section, or a shape that turns about an axis.
 * `oval` is an ellipse (a circle seen from above is about 0.3 as tall as it is wide); `poly` joins
 * the points given. Parts: `<name>` (a group: its outline and its fill).
 */
export function oval(name: string, c: P, rx: number, ry: number, tone: DiagramTone = 'theta'): Part {
  const points: Record<string, P> = {};
  const ring = Array.from({ length: 36 }, (_, j) => {
    const key = `${name}-${j}`;
    points[key] = [c[0] + rx * Math.cos((j * Math.PI) / 18), c[1] + ry * Math.sin((j * Math.PI) / 18)];
    return key;
  });
  return {
    points,
    items: [
      { kind: 'region', id: `${name}-fill`, points: ring, tone, shade: 0.35, group: name },
      { kind: 'curve', id: `${name}-edge`, points: ring, closed: true, tone, weight: 4, group: name },
    ],
  };
}

export function poly(name: string, pts: P[], tone: DiagramTone = 'theta', labels: Array<{ at: number; tex: string; tone?: DiagramTone }> = []): Part {
  const points: Record<string, P> = {};
  const keys = pts.map((p, j) => ((points[`${name}-${j}`] = p), `${name}-${j}`));
  const items: DiagramItem[] = [{ kind: 'region', id: `${name}-fill`, points: keys, tone, shade: 0.35, group: name }];
  keys.forEach((k, j) => {
    const next = keys[(j + 1) % keys.length];
    const label = labels.find((l) => l.at === j);
    items.push({ kind: 'line', id: `${name}-e${j}`, from: k, to: next, tone: label?.tone ?? tone, weight: 4, group: name, ...(label ? { label: label.tex } : {}) });
  });
  return { points, items };
}

/** A dashed axis of rotation from `a` to `b`, with a label at `b`. Parts: `<name>` (a group). */
export function axisLine(name: string, a: P, b: P, tex = '\\text{axis}'): Part {
  return {
    points: { [`${name}-a`]: a, [`${name}-b`]: b },
    items: [
      { kind: 'line', id: `${name}-line`, from: `${name}-a`, to: `${name}-b`, tone: 'muted', dashed: true, weight: 3, group: name },
      { kind: 'label', id: `${name}-label`, at: `${name}-b`, tex, tone: 'muted', place: 'above', group: name },
    ],
  };
}
