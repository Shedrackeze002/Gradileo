/**
 * Figures for the fractions videos (Grade 5, unit 5): pizzas cut into equal slices, fraction bars
 * whose pieces can be shaded one at a time as they are counted, and number lines cut into equal
 * spaces with hops for counting them. Built only from standard diagram parts, so each goes into
 * a diagram with `figure` like the figures in `src/video/`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * A pizza: a circle of radius `r` cut into `parts` equal slices, with the first `shaded` slices
 * shaded, starting at the top and going clockwise (`tones` colours them one by one). `label` is
 * written under it (or to its right, with `labelPlace: 'right'`).
 *
 * Parts: `rim` (a group: the outline and the cuts), each shaded slice `s<i>` (group `shade`), and
 * `label`.
 */
export function pie(o: { name?: string; parts: number; shaded: number; at?: P; r?: number; tone?: DiagramTone; tones?: DiagramTone[]; label?: string; labelPlace?: 'below' | 'right' }): Part {
  const n = namer(o.name);
  const [cx, cy] = o.at ?? [0, 0];
  const r = o.r ?? 1.5;
  const points: Record<string, P> = { [n('c')]: [cx, cy] };
  const items: DiagramItem[] = [];
  const ang = (k: number) => Math.PI / 2 - (2 * Math.PI * k) / o.parts;
  const per = Math.max(4, Math.ceil(48 / o.parts));
  for (let i = 0; i < o.shaded; i++) {
    const names = [n('c')];
    for (let j = 0; j <= per; j++) {
      const a = ang(i) + (ang(i + 1) - ang(i)) * (j / per);
      points[n(`s${i}-${j}`)] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      names.push(n(`s${i}-${j}`));
    }
    items.push({ kind: 'region', id: n(`s${i}`), points: names, tone: o.tones?.[i] ?? o.tone ?? 'theta', shade: 0.6, group: n('shade') });
  }
  const rim: string[] = [];
  for (let j = 0; j < 72; j++) {
    const a = (2 * Math.PI * j) / 72;
    points[n(`rim${j}`)] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    rim.push(n(`rim${j}`));
  }
  items.push({ kind: 'curve', id: n('edge'), points: rim, closed: true, weight: 3, group: n('rim') });
  if (o.parts > 1) {
    for (let k = 0; k < o.parts; k++) {
      points[n(`cut${k}`)] = [cx + r * Math.cos(ang(k)), cy + r * Math.sin(ang(k))];
      items.push({ kind: 'line', id: n(`cut${k}`), from: n('c'), to: n(`cut${k}`), weight: 2.5, group: n('rim') });
    }
  }
  if (o.label) {
    const right = o.labelPlace === 'right';
    points[n('lab')] = right ? [cx + r + 0.2, cy] : [cx, cy - r - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: right ? 'right' : 'below' });
  }
  return { points, items };
}

/**
 * A fraction bar `width` long cut into `parts` equal pieces. The pieces from `from` (0 by default)
 * on are shaded, `shaded` of them, each its own part so they can be counted one at a time; `tones`
 * colours them one by one (two eighths in purple and three in orange). `pieces` writes a value in
 * every piece, and `label` sits beside the bar (on the right unless `labelPlace` says otherwise).
 *
 * Parts: `frame` (a group: the outline and the cuts), each shaded piece `p<i>` (counting from the
 * left end of the bar, group `shade`), `label`, and the values `u<i>` (group `units`).
 */
export function bar(o: {
  name?: string;
  parts: number;
  shaded?: number;
  from?: number;
  tone?: DiagramTone;
  tones?: DiagramTone[];
  at?: P;
  width?: number;
  height?: number;
  label?: string;
  labelPlace?: Place;
  pieces?: string;
}): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.width ?? 8;
  const H = o.height ?? 1;
  const w = W / o.parts;
  const from = o.from ?? 0;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < (o.shaded ?? 0); k++) {
    const i = from + k;
    Object.assign(points, { [n(`p${i}a`)]: [x + i * w, y], [n(`p${i}b`)]: [x + (i + 1) * w, y], [n(`p${i}c`)]: [x + (i + 1) * w, y + H], [n(`p${i}d`)]: [x + i * w, y + H] });
    items.push({ kind: 'region', id: n(`p${i}`), points: ['a', 'b', 'c', 'd'].map((c) => n(`p${i}${c}`)), tone: o.tones?.[k] ?? o.tone ?? 'adj', shade: 0.6, group: n('shade') });
  }
  Object.assign(points, { [n('A')]: [x, y], [n('B')]: [x + W, y], [n('C')]: [x + W, y + H], [n('D')]: [x, y + H] });
  for (const [a, b] of [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']]) {
    items.push({ kind: 'line', id: n(`${a}${b}`.toLowerCase()), from: n(a), to: n(b), weight: 3, group: n('frame') });
  }
  for (let i = 1; i < o.parts; i++) {
    Object.assign(points, { [n(`c${i}a`)]: [x + i * w, y], [n(`c${i}b`)]: [x + i * w, y + H] });
    items.push({ kind: 'line', id: n(`cut${i}`), from: n(`c${i}a`), to: n(`c${i}b`), weight: 2.5, group: n('frame') });
  }
  if (o.pieces) {
    for (let i = 0; i < o.parts; i++) {
      points[n(`u${i}`)] = [x + (i + 0.5) * w, y + H / 2];
      items.push({ kind: 'label', id: n(`u${i}`), at: n(`u${i}`), tex: o.pieces, tone: 'ink', place: 'center', group: n('units') });
    }
  }
  if (o.label) {
    const place = o.labelPlace ?? 'right';
    const at: P = place === 'left' ? [x - 0.25, y + H / 2] : place === 'below' ? [x + W / 2, y] : place === 'above' ? [x + W / 2, y + H] : [x + W + 0.25, y + H / 2];
    points[n('lab')] = at;
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place });
  }
  return { points, items };
}

/**
 * A number line from the whole number `min` to `max`, each whole cut into `den` equal spaces, with
 * the whole numbers written under their (longer) ticks. With `fractions`, every tick also gets its
 * fraction over `den` (under the whole numbers, smaller). Points are dots on the line with a label
 * above, raised by `lift` units (0.55 by default) so hops fit underneath; a hop is an arc over the
 * line from one tick to another, counted in spaces from `min`.
 *
 * Parts: `axis` (a group: the line, ticks and whole numbers), `fracs` (a group: the fractions under
 * the ticks, each `f<i>`), each point by its id (a group: its dot `<id>-dot` and label
 * `<id>-tex`), and each hop by its id (in its `group`, if it has one).
 */
export function fractionLine(o: {
  name?: string;
  min: number;
  max: number;
  den: number;
  length?: number;
  at?: P;
  fractions?: boolean;
  lift?: number;
  /** How far a tick between whole numbers reaches above and below the line (0.18 units by default). */
  tick?: number;
  points?: { id: string; at: number; tex: string; tone?: DiagramTone; below?: boolean }[];
  hops?: { id: string; from: number; to: number; tone?: DiagramTone; group?: string; label?: string }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const spaces = (o.max - o.min) * o.den;
  const X = (s: number) => x0 + (s / spaces) * L;
  const points: Record<string, P> = { [n('L')]: [x0 - 0.35, y0], [n('R')]: [x0 + L + 0.35, y0] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: n('axis') }];
  for (let i = 0; i <= spaces; i++) {
    const whole = i % o.den === 0;
    const h = whole ? Math.max(0.3, o.tick ?? 0) : (o.tick ?? 0.18);
    Object.assign(points, { [n(`t${i}a`)]: [X(i), y0 - h], [n(`t${i}b`)]: [X(i), y0 + h] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: whole ? 3 : 2.5, group: n('axis') });
    if (whole) items.push({ kind: 'label', id: n(`w${i}`), at: n(`t${i}a`), tex: String(o.min + i / o.den), place: 'below', group: n('axis') });
    if (o.fractions) {
      points[n(`f${i}at`)] = [X(i), y0 - 1.55];
      items.push({ kind: 'label', id: n(`f${i}`), at: n(`f${i}at`), tex: `\\dfrac{${o.min * o.den + i}}{${o.den}}`, tone: 'muted', place: 'center', group: n('fracs') });
    }
  }
  for (const hop of o.hops ?? []) {
    const names: string[] = [];
    const a = X(hop.from);
    const b = X(hop.to);
    const peak = Math.min(0.5, 0.18 + 0.12 * Math.abs(hop.to - hop.from) * (L / spaces));
    for (let k = 0; k <= 16; k++) {
      const t = k / 16;
      points[n(`${hop.id}-${k}`)] = [a + (b - a) * t, y0 + 0.12 + peak * Math.sin(Math.PI * t)];
      names.push(n(`${hop.id}-${k}`));
    }
    items.push({ kind: 'curve', id: n(hop.id), points: names, tone: hop.tone ?? 'theta', weight: 2.5, ...(hop.label ? { label: hop.label, labelSide: 'left' as const } : {}), ...(hop.group ? { group: n(hop.group) } : {}) });
  }
  for (const p of o.points ?? []) {
    const lift = o.lift ?? 0.55;
    points[n(`${p.id}-at`)] = [X(p.at), y0];
    points[n(`${p.id}-up`)] = [X(p.at), p.below ? y0 - 1.15 : y0 + lift];
    items.push(
      { kind: 'label', id: n(`${p.id}-dot`), at: n(`${p.id}-at`), tex: '', tone: p.tone ?? 'theta', place: 'center', dot: true, group: n(p.id) },
      { kind: 'label', id: n(`${p.id}-tex`), at: n(`${p.id}-up`), tex: p.tex, tone: p.tone ?? 'theta', place: p.below ? 'below' : 'above', group: n(p.id) },
    );
  }
  return { points, items };
}

/** Hops of one space each, from space `from` to space `to`, all in the group `group`. */
export function unitHops(from: number, to: number, group: string, tone?: DiagramTone) {
  return Array.from({ length: to - from }, (_, k) => ({ id: `${group}${from + k}`, from: from + k, to: from + k + 1, group, tone }));
}
