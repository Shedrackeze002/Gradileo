/**
 * Graphs for video diagrams: a coordinate plane with its grid and axes, and the functions,
 * polylines, points and arrow diagrams drawn on or beside it. Like the solids (`solids.ts`), each
 * returns points and named parts to put into a diagram with `figure`.
 *
 * Everything drawn on a plane goes through it (`plot(g, …)`, `dots(g, …)`), because the plane maps
 * its own coordinates onto the diagram: a graph of distance against time can be 40 minutes wide
 * and 1500 metres tall and still fit the stage.
 */
import type { DiagramItem, DiagramTone, Place } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A coordinate plane: its parts, and how it maps its coordinates onto the diagram. */
export interface Plane extends Part {
  /** The diagram point for the plane's (x, y). */
  map: (x: number, y: number) => P;
  /** Prefixes the ids of anything drawn on the plane with the plane's name. */
  n: (s: string) => string;
  x: [number, number];
  y: [number, number];
}

/** Rounds away floating-point noise, so a step of 0.1 reads 0.3 and not 0.30000000000000004. */
const show = (v: number) => String(Number(v.toFixed(6)));

/**
 * A number of radians as a multiple of π in TeX, for numbering an axis in radians: `piTex(Math.PI
 * / 2)` is `\frac{\pi}{2}`, `piTex(-2 * Math.PI)` is `-2\pi`. A number that is not a multiple of π
 * over 1, 2, 3, 4 or 6 is written as a decimal.
 */
export function piTex(v: number): string {
  if (Math.abs(v) < 1e-9) return '0';
  for (const d of [1, 2, 3, 4, 6]) {
    const k = Math.round((v * d) / Math.PI);
    if (Math.abs((v * d) / Math.PI - k) > 1e-6) continue;
    const g = gcd(Math.abs(k), d);
    const [num, den] = [k / g, d / g];
    const sign = num < 0 ? '-' : '';
    const top = Math.abs(num) === 1 ? '\\pi' : `${Math.abs(num)}\\pi`;
    return den === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${den}}`;
  }
  return show(v);
}

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/**
 * A coordinate plane over `x` and `y` (each [min, max]), with grid lines every `xStep` and
 * `yStep` and the axes numbered every `every` grid lines (1 by default; 0 for no numbers). One
 * unit is the same length on both axes unless `width` or `height` (in diagram units) stretches
 * them, for a graph like distance against time.
 *
 * Parts: `grid` (a group), `axes` (a group: the axes, their numbers and their titles, `x-title`
 * and `y-title`), and the origin's number `origin`.
 */
export function plane(o: {
  name?: string;
  x: [number, number];
  y: [number, number];
  xStep?: number;
  yStep?: number;
  every?: number;
  width?: number;
  height?: number;
  titles?: { x?: string; y?: string };
  /** The name at the end of the x-axis when there is no x title (TeX, `x` by default). */
  xName?: string;
  /** Where the plane's origin goes in the diagram, to put two planes side by side. */
  at?: P;
  /** How to number each axis (TeX), instead of as decimals: `piTex` numbers an axis in radians. */
  xTex?: (x: number) => string;
  yTex?: (y: number) => string;
}): Plane {
  const n = namer(o.name);
  const [x0, x1] = o.x;
  const [y0, y1] = o.y;
  const xStep = o.xStep ?? 1;
  const yStep = o.yStep ?? 1;
  const sx = o.width ? o.width / (x1 - x0) : o.height ? o.height / (y1 - y0) : 1;
  const sy = o.height ? o.height / (y1 - y0) : sx;
  const [ox, oy] = o.at ?? [0, 0];
  const map = (x: number, y: number): P => [ox + x * sx, oy + y * sy];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // The axes cross at the origin, or at the edge of the plane nearest to it.
  const ax = Math.min(Math.max(0, x0), x1);
  const ay = Math.min(Math.max(0, y0), y1);
  const every = o.every ?? 1;

  const ticks = (from: number, to: number, step: number) => {
    const list: number[] = [];
    for (let v = Math.ceil(from / step - 1e-9) * step; v <= to + 1e-9; v += step) list.push(Number(v.toFixed(6)));
    return list;
  };
  ticks(x0, x1, xStep).forEach((x, i) => {
    if (Math.abs(x - ax) < 1e-9) return;
    Object.assign(points, { [n(`gx${i}a`)]: map(x, y0), [n(`gx${i}b`)]: map(x, y1), [n(`nx${i}`)]: map(x, ay) });
    items.push({ kind: 'line', id: n(`gx${i}`), from: n(`gx${i}a`), to: n(`gx${i}b`), tone: 'muted', weight: 1, group: n('grid') });
    if (every > 0 && Math.round((x - ax) / xStep) % every === 0) items.push({ kind: 'label', id: n(`numx${i}`), at: n(`nx${i}`), tex: (o.xTex ?? show)(x), tone: 'muted', place: 'below', group: n('axes') });
  });
  ticks(y0, y1, yStep).forEach((y, j) => {
    if (Math.abs(y - ay) < 1e-9) return;
    Object.assign(points, { [n(`gy${j}a`)]: map(x0, y), [n(`gy${j}b`)]: map(x1, y), [n(`ny${j}`)]: map(ax, y) });
    items.push({ kind: 'line', id: n(`gy${j}`), from: n(`gy${j}a`), to: n(`gy${j}b`), tone: 'muted', weight: 1, group: n('grid') });
    if (every > 0 && Math.round((y - ay) / yStep) % every === 0) items.push({ kind: 'label', id: n(`numy${j}`), at: n(`ny${j}`), tex: (o.yTex ?? show)(y), tone: 'muted', place: 'left', group: n('axes') });
  });
  Object.assign(points, {
    [n('xa')]: map(x0, ay),
    [n('xb')]: map(x1, ay),
    [n('ya')]: map(ax, y0),
    [n('yb')]: map(ax, y1),
    [n('o')]: map(ax, ay),
    [n('xt')]: map((x0 + x1) / 2, ay),
  });
  items.push(
    { kind: 'line', id: n('x-axis'), from: n('xa'), to: n('xb'), weight: 2.5, arrow: true, group: n('axes') },
    { kind: 'line', id: n('y-axis'), from: n('ya'), to: n('yb'), weight: 2.5, arrow: true, group: n('axes') },
  );
  if (every > 0 && ax === 0 && ay === 0) items.push({ kind: 'label', id: n('origin'), at: n('o'), tex: '0', tone: 'muted', place: 'below left', group: n('axes') });
  // Titles: the x title below the middle of the x-axis's numbers, the y title above the y-axis.
  if (o.titles?.x) {
    points[n('xt')] = [map((x0 + x1) / 2, ay)[0], map(ax, ay)[1] - 0.09 * (y1 - y0) * sy];
    items.push({ kind: 'label', id: n('x-title'), at: n('xt'), tex: o.titles.x, place: 'below', group: n('axes') });
  }
  if (o.titles?.y) items.push({ kind: 'label', id: n('y-title'), at: n('yb'), tex: o.titles.y, place: 'above right', group: n('axes') });
  else items.push({ kind: 'label', id: n('y-name'), at: n('yb'), tex: 'y', place: 'above right', group: n('axes') });
  if (!o.titles?.x) items.push({ kind: 'label', id: n('x-name'), at: n('xb'), tex: o.xName ?? 'x', place: 'right', group: n('axes') });
  return { points, items, map, n, x: o.x, y: o.y };
}

/**
 * The graph of `f` on the plane from `from` to `to` (the width of the plane by default), drawn
 * on from left to right and cut off where it leaves the plane. With a `label`, it sits `labelAt`
 * of the way along (0.85 by default), above the curve, or below it with `side: 'right'`.
 *
 * Parts: the curve `id` (or `id-0`, `id-1`… in a group `id` if the plane cuts it into pieces).
 */
export function plot(g: Plane, o: { id: string; f: (x: number) => number; from?: number; to?: number; tone?: DiagramTone; label?: string; labelAt?: number; side?: 'left' | 'right'; dashed?: boolean; samples?: number }): Part {
  const [ymin, ymax] = g.y;
  const from = o.from ?? g.x[0];
  const to = o.to ?? g.x[1];
  const steps = o.samples ?? 96;
  const inside = (y: number) => y >= ymin - 1e-9 && y <= ymax + 1e-9;
  // Walk along the curve, starting a new piece wherever it re-enters the plane, and ending the
  // piece exactly on the edge it leaves through.
  const pieces: P[][] = [];
  let piece: P[] | null = null;
  let prev: P | null = null;
  for (let i = 0; i <= steps; i++) {
    const x = from + ((to - from) * i) / steps;
    const y = o.f(x);
    if (inside(y)) {
      if (!piece) {
        piece = [];
        if (prev && Number.isFinite(prev[1])) {
          const edge = prev[1] > ymax ? ymax : ymin;
          piece.push([prev[0] + ((edge - prev[1]) / (y - prev[1])) * (x - prev[0]), edge]);
        }
        pieces.push(piece);
      }
      piece.push([x, y]);
    } else if (piece) {
      const last = piece[piece.length - 1];
      const edge = y > ymax ? ymax : ymin;
      piece.push([last[0] + ((edge - last[1]) / (y - last[1])) * (x - last[0]), edge]);
      piece = null;
    }
    prev = [x, y];
  }
  const points: Record<string, P> = {};
  const items: DiagramItem[] = pieces.map((list, k) => {
    const id = pieces.length === 1 ? o.id : `${o.id}-${k}`;
    const names = list.map((p, i) => {
      const name = g.n(`${id}-p${i}`);
      points[name] = g.map(p[0], p[1]);
      return name;
    });
    return {
      kind: 'curve',
      id: g.n(id),
      points: names,
      tone: o.tone ?? 'brand',
      dashed: o.dashed,
      ...(o.label && k === pieces.length - 1 ? { label: o.label, labelAt: o.labelAt ?? 0.85, labelSide: o.side ?? ('left' as const) } : {}),
      ...(pieces.length > 1 ? { group: g.n(o.id) } : {}),
    } satisfies DiagramItem;
  });
  return { points, items };
}

/**
 * Straight segments joining `points` in order (a distance–time graph, a line segment), each a
 * part `id-0`, `id-1`… in the group `id`, with `labels` beside them in the same order: on the
 * left of each segment, looking along it, unless `sides` says otherwise.
 */
export function polyline(g: Plane, o: { id: string; points: [number, number][]; tone?: DiagramTone; labels?: string[]; sides?: ('left' | 'right')[]; dashed?: boolean }): Part {
  const points: Record<string, P> = {};
  o.points.forEach((p, i) => (points[g.n(`${o.id}-v${i}`)] = g.map(p[0], p[1])));
  const items: DiagramItem[] = o.points.slice(1).map((_, i) => ({
    kind: 'line',
    id: g.n(`${o.id}-${i}`),
    from: g.n(`${o.id}-v${i}`),
    to: g.n(`${o.id}-v${i + 1}`),
    tone: o.tone ?? 'brand',
    dashed: o.dashed,
    ...(o.labels?.[i] ? { label: o.labels[i], labelSide: o.sides?.[i] ?? ('left' as const) } : {}),
    group: g.n(o.id),
  }));
  return { points, items };
}

/** Points on the plane, each a part by its `id`: a dot (hollow when `open`) with its label (TeX) beside it. */
export function dots(g: Plane, list: { id: string; x: number; y: number; tex?: string; tone?: DiagramTone; place?: Place; group?: string; open?: boolean }[]): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = list.map((d) => {
    points[g.n(d.id)] = g.map(d.x, d.y);
    return { kind: 'label', id: g.n(d.id), at: g.n(d.id), tex: d.tex ?? '', tone: d.tone ?? 'theta', place: d.place ?? 'above right', dot: true, ...(d.open ? { open: true } : {}), ...(d.group ? { group: g.n(d.group) } : {}) };
  });
  return { points, items };
}

/**
 * An arrow diagram: the elements of one set in an oval on the left, the other set's on the right,
 * and an arrow for each pair, from `pairs[k][0]` on the left to `pairs[k][1]` on the right.
 *
 * Parts: the sets `left` and `right` (groups: the oval, its title and its elements, `left<i>` and
 * `right<j>`), and the arrows `a<k>` in the group `arrows`.
 */
export function arrowDiagram(o: { name?: string; left: string[]; right: string[]; pairs: [number, number][]; /** TeX, above each oval. */ titles?: [string, string] }): Part {
  const n = namer(o.name);
  // Sizes are in about the width of one character of a label, so text and ovals scale together:
  // rows 2.3 apart, each oval wide enough for its longest element, and room for the arrows.
  const gap = 2.3;
  const chars = (tex: string) => tex.replace(/\\text\{([^}]*)\}/g, '$1').replace(/\\[a-z]+/gi, 'x').replace(/[{}^_]/g, '').length;
  const rx = (list: string[]) => Math.max(2.2, 0.55 * Math.max(...list.map(chars)) + 1);
  // How far an arrow starts or ends from the middle of an element, clear of its text.
  const clear = (tex: string) => 0.55 * chars(tex) + 0.5;
  const [rl, rr] = [rx(o.left), rx(o.right)];
  const W = rl + rr + 8;
  const tall = Math.max(o.left.length, o.right.length);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const [side, list, x, r] of [
    ['left', o.left, 0, rl],
    ['right', o.right, W, rr],
  ] as const) {
    const ry = (tall * gap) / 2 + 1;
    const ring: string[] = [];
    for (let i = 0; i < 64; i++) {
      const t = (2 * Math.PI * i) / 64;
      points[n(`${side}-o${i}`)] = [x + r * Math.cos(t), ry * Math.sin(t)];
      ring.push(n(`${side}-o${i}`));
    }
    items.push({ kind: 'curve', id: n(`${side}-oval`), points: ring, closed: true, tone: side === 'left' ? 'adj' : 'opp', weight: 2.5, group: n(side) });
    list.forEach((tex, i) => {
      points[n(`${side}${i}`)] = [x, ((list.length - 1) / 2 - i) * gap];
      items.push({ kind: 'label', id: n(`${side}${i}`), at: n(`${side}${i}`), tex, place: 'center', group: n(side) });
    });
    if (o.titles) {
      points[n(`${side}-t`)] = [x, ry];
      items.push({ kind: 'label', id: n(`${side}-title`), at: n(`${side}-t`), tex: o.titles[side === 'left' ? 0 : 1], tone: side === 'left' ? 'adj' : 'opp', place: 'above', group: n(side) });
    }
  }
  o.pairs.forEach(([i, j], k) => {
    const a = points[n(`left${i}`)];
    const b = points[n(`right${j}`)];
    Object.assign(points, { [n(`a${k}s`)]: [a[0] + clear(o.left[i]), a[1]], [n(`a${k}e`)]: [b[0] - clear(o.right[j]), b[1]] });
    items.push({ kind: 'line', id: n(`a${k}`), from: n(`a${k}s`), to: n(`a${k}e`), tone: 'theta', weight: 2.5, arrow: true, group: n('arrows') });
  });
  return { points, items };
}
