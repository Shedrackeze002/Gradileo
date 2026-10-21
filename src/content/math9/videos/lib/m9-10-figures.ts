/**
 * Figures for the data collection, sampling, project plan and probability videos, built only from
 * standard diagram parts (shaded regions, curves, lines and labels), so each goes into a diagram
 * with `figure`:
 *
 * - `crowd`: a population as rows of dots, each dot coloured by the group it belongs to.
 * - `picks`: rings round some of the dots of a crowd: the members chosen for a sample.
 * - `lasso`: a dashed oval round part of a figure, such as the corner of a crowd a biased survey
 *   reaches.
 * - `days`: a row of squares, some shaded, for "on 7 of every 10 days like this".
 * - `note`: a label with no dot, and `shift`, which moves a part.
 *
 * Bar graphs come from `barGraph` (`src/video/charts.ts`); a spinner, a bar cut into parts
 * (`stackBar`) and a hundred grid (`hundred`) from `m6-12-figures.ts`, used as they are.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The points of a circle (16 of them) round `c`, as point names in `points`. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 16): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const name = `${key}-${j}`;
    points[name] = [c[0] + r * Math.cos((2 * Math.PI * j) / steps), c[1] + r * Math.sin((2 * Math.PI * j) / steps)];
    return name;
  });
}

/** Where dot `i` of a crowd sits: `cols` to a row, rows going down from the top left. */
export const seat = (i: number, cols: number, gap = 1): P => [(i % cols) * gap, -Math.floor(i / cols) * gap];

/**
 * A population of `count` people as dots, `cols` to a row, `gap` apart, rows going down. Dot `i`
 * belongs to the group `groupOf(i)` (an id from `groups`) and takes that group's colour.
 *
 * Parts: a group for each of `groups` by its `id` (every dot in it, `d<i>`).
 */
export function crowd(o: { name?: string; count: number; cols: number; gap?: number; groups: { id: string; tone: DiagramTone }[]; groupOf?: (i: number) => string }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const tones = new Map(o.groups.map((g) => [g.id, g.tone]));
  for (let i = 0; i < o.count; i++) {
    const g = o.groupOf ? o.groupOf(i) : o.groups[0].id;
    const tone = tones.get(g) ?? 'muted';
    const ids = ring(points, n(`d${i}`), seat(i, o.cols, gap), 0.3 * gap);
    items.push({ kind: 'region', id: n(`d${i}`), points: ids, tone, shade: tone === 'muted' ? 0.55 : 0.85, group: n(g) });
  }
  return { points, items };
}

/** Rings round the dots `which` of a crowd laid out `cols` to a row, `gap` apart. Part: `<id>` (a group). */
export function picks(o: { name?: string; id: string; which: number[]; cols: number; gap?: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = o.which.map((i) => ({
    kind: 'curve',
    id: n(`${o.id}-${i}`),
    points: ring(points, n(`${o.id}-r${i}`), seat(i, o.cols, gap), 0.46 * gap, 20),
    closed: true,
    tone: o.tone ?? 'theta',
    weight: 3,
    group: n(o.id),
  }));
  return { points, items };
}

/** A dashed oval round `c`, `rx` by `ry`, with an optional label (TeX) beside it. Part: `<id>` (a group). */
export function lasso(o: { name?: string; id: string; c: P; rx: number; ry: number; tone?: DiagramTone; label?: string; labelAt?: P; place?: Place }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const names = Array.from({ length: 40 }, (_, j) => {
    const name = n(`${o.id}-o${j}`);
    const t = (2 * Math.PI * j) / 40;
    points[name] = [o.c[0] + o.rx * Math.cos(t), o.c[1] + o.ry * Math.sin(t)];
    return name;
  });
  const tone = o.tone ?? 'theta';
  const items: DiagramItem[] = [{ kind: 'curve', id: n(`${o.id}-line`), points: names, closed: true, tone, dashed: true, weight: 3, group: n(o.id) }];
  if (o.label) {
    points[n(`${o.id}-at`)] = o.labelAt ?? [o.c[0], o.c[1] + o.ry];
    items.push({ kind: 'label', id: n(`${o.id}-label`), at: n(`${o.id}-at`), tex: o.label, tone, place: o.place ?? 'above', group: n(o.id) });
  }
  return { points, items };
}

/**
 * A row of `count` squares 1 unit across, 1.25 apart, the first `shaded` of them (or the squares
 * `which`, counting from 0) shaded in `tone` and the rest in `rest`, with a caption (TeX) under
 * each from `labels` if given.
 *
 * Parts: `shaded` and `others` (groups of the squares), and `labels` (a group).
 */
export function days(o: { name?: string; count: number; shaded?: number; which?: number[]; tone?: DiagramTone; rest?: DiagramTone; labels?: string[]; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < o.count; k++) {
    const x = x0 + 1.25 * k;
    const corners: P[] = [[x, y0], [x + 1, y0], [x + 1, y0 + 1], [x, y0 + 1]];
    const ids = corners.map((q, j) => {
      points[n(`s${k}-${j}`)] = q;
      return n(`s${k}-${j}`);
    });
    const on = o.which ? o.which.includes(k) : k < (o.shaded ?? 0);
    const tone = on ? (o.tone ?? 'adj') : (o.rest ?? 'muted');
    items.push(
      { kind: 'region', id: n(`s${k}`), points: ids, tone, shade: on ? 0.7 : 0.3, group: n(on ? 'shaded' : 'others') },
      { kind: 'curve', id: n(`s${k}-edge`), points: ids, closed: true, tone, weight: 2, group: n(on ? 'shaded' : 'others') },
    );
    if (o.labels?.[k]) {
      points[n(`l${k}`)] = [x + 0.5, y0 - 0.15];
      items.push({ kind: 'label', id: n(`l${k}`), at: n(`l${k}`), tex: o.labels[k], tone: 'muted', place: 'below', group: n('labels') });
    }
  }
  return { points, items };
}

/** A label (TeX) with no dot at a point. Part: `<id>`, in `group` if set. */
export function note(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: Place; group?: string }): Part {
  const n = namer(o.name);
  return { points: { [n(`${o.id}-at`)]: o.at }, items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: n(o.group) } : {}) }] };
}

/** Joins parts into one. */
export const join = (...parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

/** A figure part moved by (`dx`, `dy`), so a helper that always starts at the origin can sit anywhere. */
export const shift = (part: Part, dx: number, dy: number): Part => ({
  points: Object.fromEntries(Object.entries(part.points).map(([k, [x, y]]) => [k, [x + dx, y + dy] as P])),
  items: part.items,
});
