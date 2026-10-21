/**
 * Figures for the square roots and surface area videos (Grade 9, unit 1), built only from standard
 * diagram parts (lines, curves, shaded regions and labels), so each goes into a diagram with
 * `figure`:
 *
 * - `rootSquare`: a square cut into n by n equal small squares, with a k by k block at its bottom
 *   left shaded: a hundred grid with 49 squares shaded shows that 0.49 is 0.7 squared, and a square
 *   cut into nine shows that four ninths is two thirds squared.
 * - `cubeBits`: unit cubes pulled a little apart, with the two faces that meet wherever two cubes
 *   touch shaded red (the face we can see) and outlined in dashed red (the face hidden behind).
 * - `cake`: a box with a smaller box centred on top (a two-layer cake), joined or with the top
 *   layer lifted off to show where the layers touch.
 * - `trophy`: a box with a cylinder standing on the middle of its top, joined or lifted off.
 * - `rootLines`: two number lines, one over the other: numbers on the top line and their square
 *   roots on the bottom line, with dashed links from each number down to its square root, for
 *   estimating a square root between two benchmarks.
 * - `tag`: a label (TeX) at a point.
 *
 * Number lines come from `src/video/numbers.ts` (moved with `shift`, from the Math 6 helpers),
 * stacks of unit cubes from `cubes` (`src/content/math6/videos/lib/m6-10-figures.ts`) and plain
 * shapes from `outline` (`src/video/shapes.ts`). Lengths are blue and heights orange, as for the
 * solids in `src/video/solids.ts`; the parts that are hidden where solids touch are red.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { cubes } from '@/content/math6/videos/lib/m6-10-figures.ts';
import { numberLine } from '@/video/numbers.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

type LinePoint = { id: string; value: number; tex: string; tone?: DiagramTone; below?: boolean };
type LineSpan = { id: string; from: number; to: number; tone?: DiagramTone; label?: string };

/**
 * Two number lines `length` long (12 by default), the `numbers` line on top and the `roots` line
 * `gap` below it (2.6 by default), each with its own marks every `step` and points placed by value
 * (labels above, or below with `below`), and spans on the numbers line. Each link is a dashed arrow
 * from a value on the numbers line down to a value on the roots line (or up from the root, with
 * `up`). `names` are written left of the lines.
 *
 * Parts: `n-axis` and `r-axis` (groups: each line with its marks), the points and spans by their
 * ids with `n-` or `r-` in front (`n-p55`), each link by its `id`, and `names` (a group).
 */
export function rootLines(o: {
  name?: string;
  length?: number;
  gap?: number;
  numbers: { min: number; max: number; step: number; points: LinePoint[]; spans?: LineSpan[] };
  roots: { min: number; max: number; step: number; points: LinePoint[] };
  links?: { id: string; from: number; to: number; up?: boolean }[];
  names?: [string, string];
}): Part {
  const nm = namer(o.name);
  const L = o.length ?? 12;
  const gap = o.gap ?? 2.6;
  const top = numberLine({ name: nm('n'), ...o.numbers, every: 0, length: L });
  const bottom = numberLine({ name: nm('r'), ...o.roots, every: 0, length: L, at: [0, -gap] });
  const points: Record<string, P> = { ...top.points, ...bottom.points };
  const items: DiagramItem[] = [...top.items, ...bottom.items];
  const X = (v: number, line: { min: number; max: number }) => ((v - line.min) / (line.max - line.min)) * L;
  for (const k of o.links ?? []) {
    Object.assign(points, { [nm(`${k.id}-a`)]: [X(k.from, o.numbers), -1.05], [nm(`${k.id}-b`)]: [X(k.to, o.roots), -gap + 0.62] });
    const [a, b] = k.up ? [nm(`${k.id}-b`), nm(`${k.id}-a`)] : [nm(`${k.id}-a`), nm(`${k.id}-b`)];
    items.push({ kind: 'line', id: nm(k.id), from: a, to: b, tone: 'muted', dashed: true, weight: 2, arrow: true });
  }
  if (o.names) {
    Object.assign(points, { [nm('name-n')]: [-0.6, 0], [nm('name-r')]: [-0.6, -gap], [nm('room')]: [-3.6, -gap / 2] });
    items.push(
      { kind: 'label', id: nm('name-n-label'), at: nm('name-n'), tex: o.names[0], tone: 'adj', place: 'left', group: nm('names') },
      { kind: 'label', id: nm('name-r-label'), at: nm('name-r'), tex: o.names[1], tone: 'theta', place: 'left', group: nm('names') },
    );
  }
  return { points, items };
}

/** Adds points to `points` under `key0`, `key1`… and returns their names. */
function named(points: Record<string, P>, key: string, list: P[]): string[] {
  return list.map((p, i) => {
    points[`${key}${i}`] = p;
    return `${key}${i}`;
  });
}

/**
 * A square `side` units wide (6 by default) with its bottom left corner at `at`, cut into `n` by
 * `n` equal small squares, and the `k` by `k` block at its bottom left shaded: 49 of 100 squares
 * make a square 7 small squares wide, so 0.49 is 0.7 squared.
 *
 * Labels: `side` under the shaded block (blue), `up` up its left side (orange), `whole` over the
 * top of the whole square and `wholeUp` down its right side (white), `area` in the middle of the
 * block and `caption` under it all.
 *
 * Parts: `grid` (a group: the outline and the lines between the small squares), `shade` (a group:
 * the shaded block and its outline), `side`, `up`, `whole`, `wholeUp`, `area` and `caption`.
 */
export function rootSquare(o: {
  name?: string;
  n: number;
  k: number;
  side?: number;
  at?: P;
  tone?: DiagramTone;
  labels?: { side?: string; up?: string; whole?: string; wholeUp?: string; area?: string; caption?: string };
}): Part {
  const nm = namer(o.name);
  const S = o.side ?? 6;
  const c = S / o.n;
  const [x0, y0] = o.at ?? [0, 0];
  const b = o.k * c;
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const block = named(points, nm('b'), [[x0, y0], [x0 + b, y0], [x0 + b, y0 + b], [x0, y0 + b]]);
  items.push({ kind: 'region', id: nm('shade-fill'), points: block, tone, shade: 0.5, group: nm('shade') });
  for (let i = 1; i < o.n; i++) {
    Object.assign(points, { [nm(`x${i}a`)]: [x0 + i * c, y0], [nm(`x${i}b`)]: [x0 + i * c, y0 + S] });
    items.push({ kind: 'line', id: nm(`gx${i}`), from: nm(`x${i}a`), to: nm(`x${i}b`), tone: 'muted', weight: 1.5, group: nm('grid') });
    Object.assign(points, { [nm(`y${i}a`)]: [x0, y0 + i * c], [nm(`y${i}b`)]: [x0 + S, y0 + i * c] });
    items.push({ kind: 'line', id: nm(`gy${i}`), from: nm(`y${i}a`), to: nm(`y${i}b`), tone: 'muted', weight: 1.5, group: nm('grid') });
  }
  const frame = named(points, nm('o'), [[x0, y0], [x0 + S, y0], [x0 + S, y0 + S], [x0, y0 + S]]);
  items.push({ kind: 'curve', id: nm('frame'), points: frame, closed: true, tone: 'ink', weight: 3, group: nm('grid') });
  items.push({ kind: 'curve', id: nm('shade-edge'), points: block, closed: true, tone, weight: 4, group: nm('shade') });
  const L = o.labels ?? {};
  if (L.side) items.push({ kind: 'line', id: nm('side'), from: block[0], to: block[1], tone: 'adj', weight: 6, label: L.side, labelSide: 'right' });
  if (L.up) items.push({ kind: 'line', id: nm('up'), from: block[0], to: block[3], tone: 'opp', weight: 6, label: L.up, labelSide: 'left' });
  if (L.whole) items.push({ kind: 'line', id: nm('whole'), from: frame[3], to: frame[2], tone: 'ink', weight: 3, label: L.whole, labelSide: 'left' });
  if (L.wholeUp) items.push({ kind: 'line', id: nm('wholeUp'), from: frame[1], to: frame[2], tone: 'ink', weight: 3, label: L.wholeUp, labelSide: 'right' });
  if (L.area) {
    points[nm('mid')] = [x0 + b / 2, y0 + b / 2];
    items.push({ kind: 'label', id: nm('area'), at: nm('mid'), tex: L.area, place: 'center', tone: 'ink' });
  }
  if (L.caption) {
    points[nm('cap')] = [x0 + S / 2, y0 - (L.side ? 0.17 * S : 0.05 * S)];
    items.push({ kind: 'label', id: nm('caption'), at: nm('cap'), tex: L.caption, place: 'below', tone: 'ink' });
  }
  return { points, items };
}

/** The direction of depth in `cubes` (Math 6 helpers): back and to the right. */
const CUBE_DEPTH: P = [0.45, 0.32];

/**
 * Unit cubes in one row, at [column, layer] places, pulled `gap` apart (0.8 by default) and drawn
 * like the Math 6 `cubes`. Where two cubes would touch (side by side, or one on another), the face
 * we can see is shaded red, and the face hidden behind it is outlined in dashed red: both faces
 * end up inside the object once the cubes are pushed together. `edge` labels the front bottom edge
 * of the first cube.
 *
 * Parts: each cube `k<i>` (a group, in the order given), each place where two cubes meet `t<j>` (a
 * group: both faces, in the order the pairs are found, side by side before stacked), and `edge`.
 */
export function cubeBits(o: { name?: string; cubes: [number, number][]; gap?: number; tone?: DiagramTone; edge?: string }): Part {
  const nm = namer(o.name);
  const g = o.gap ?? 0.8;
  const [dx, dy] = CUBE_DEPTH;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const corner = ([c, l]: [number, number]): P => [c * (1 + g), l * (1 + g)];
  // Lower layers first, then left to right, so a nearer face is drawn later.
  const order = o.cubes.map((q, i) => ({ q, i })).sort((a, b) => a.q[1] - b.q[1] || a.q[0] - b.q[0]);
  for (const { q, i } of order) {
    const part = cubes({ name: nm(`k${i}`), heights: [[1]], at: corner(q), tone: o.tone });
    Object.assign(points, part.points);
    items.push(...part.items.map((it) => ({ ...it, group: nm(`k${i}`) })));
  }
  let t = 0;
  const pair = (seen: P[], hidden: P[]) => {
    const a = named(points, nm(`t${t}s`), seen);
    const b = named(points, nm(`t${t}h`), hidden);
    items.push(
      { kind: 'region', id: nm(`t${t}-seen`), points: a, tone: 'bad', shade: 0.6, group: nm(`t${t}`) },
      { kind: 'curve', id: nm(`t${t}-seen-edge`), points: a, closed: true, tone: 'bad', weight: 3, group: nm(`t${t}`) },
      { kind: 'region', id: nm(`t${t}-hidden`), points: b, tone: 'bad', shade: 0.25, group: nm(`t${t}`) },
      { kind: 'curve', id: nm(`t${t}-hidden-edge`), points: b, closed: true, tone: 'bad', weight: 3, dashed: true, group: nm(`t${t}`) },
    );
    t++;
  };
  const has = (c: number, l: number) => o.cubes.some(([a, b]) => a === c && b === l);
  for (const [c, l] of o.cubes) {
    if (!has(c + 1, l)) continue;
    const [X, Y] = corner([c, l]);
    const X2 = X + 1 + g;
    pair(
      [[X + 1, Y], [X + 1 + dx, Y + dy], [X + 1 + dx, Y + 1 + dy], [X + 1, Y + 1]],
      [[X2, Y], [X2 + dx, Y + dy], [X2 + dx, Y + 1 + dy], [X2, Y + 1]],
    );
  }
  for (const [c, l] of o.cubes) {
    if (!has(c, l + 1)) continue;
    const [X, Y] = corner([c, l]);
    const Y2 = Y + 1 + g;
    pair(
      [[X, Y + 1], [X + 1, Y + 1], [X + 1 + dx, Y + 1 + dy], [X + dx, Y + 1 + dy]],
      [[X, Y2], [X + 1, Y2], [X + 1 + dx, Y2 + dy], [X + dx, Y2 + dy]],
    );
  }
  if (o.edge) {
    const [X, Y] = corner(o.cubes[0]);
    Object.assign(points, { [nm('ea')]: [X, Y], [nm('eb')]: [X + 1, Y] });
    items.push({ kind: 'line', id: nm('edge'), from: nm('ea'), to: nm('eb'), tone: 'adj', weight: 5, label: o.edge, labelSide: 'right' });
  }
  return { points, items };
}

// ---------------------------------------------------------------- Composite objects

/** The depth direction of the solids in `src/video/solids.ts`: back and to the right, at half scale. */
const DX = 0.5 * Math.cos(Math.PI / 6);
const DY = 0.5 * Math.sin(Math.PI / 6);
/** How flat a circle seen from a little above looks, as in `solids.ts`. */
const TILT = 0.3;

/** The drawing of the point x across, y back and z up. */
const pr = (x: number, y: number, z: number): P => [x + y * DX, z + y * DY];

/** The eight corners of a box from (x, y, z), `l` across, `w` back and `h` up. */
function corners3(x: number, y: number, z: number, l: number, w: number, h: number) {
  return { A: pr(x, y, z), B: pr(x + l, y, z), C: pr(x + l, y, z + h), D: pr(x, y, z + h), E: pr(x, y + w, z), F: pr(x + l, y + w, z), G: pr(x + l, y + w, z + h), H: pr(x, y + w, z + h) };
}

/**
 * The parts of a segment from `a` to `b` that lie outside the convex polygon `poly` (an edge partly
 * hidden behind a solid standing in front of it), by clipping it against each side.
 */
function outside(a: P, b: P, poly: P[]): [P, P][] {
  const area = poly.reduce((s, p, i) => s + p[0] * poly[(i + 1) % poly.length][1] - poly[(i + 1) % poly.length][0] * p[1], 0);
  const sgn = area > 0 ? 1 : -1;
  const d: P = [b[0] - a[0], b[1] - a[1]];
  let tIn = 0;
  let tOut = 1;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    // The inward normal of the side from p to q.
    const nrm: P = [-(q[1] - p[1]) * sgn, (q[0] - p[0]) * sgn];
    const num = nrm[0] * (a[0] - p[0]) + nrm[1] * (a[1] - p[1]);
    const den = nrm[0] * d[0] + nrm[1] * d[1];
    if (Math.abs(den) < 1e-12) {
      if (num < 0) return [[a, b]];
      continue;
    }
    const t = -num / den;
    if (den > 0) tIn = Math.max(tIn, t);
    else tOut = Math.min(tOut, t);
  }
  if (tIn >= tOut) return [[a, b]];
  const at = (t: number): P => [a[0] + d[0] * t, a[1] + d[1] * t];
  const out: [P, P][] = [];
  if (tIn > 1e-6) out.push([a, at(tIn)]);
  if (tOut < 1 - 1e-6) out.push([at(tOut), b]);
  return out;
}

/** Where a chain of points crosses the height `y`, going up the chain. */
function crossAt(chain: P[], y: number): { at: P; below: P[] } {
  const below: P[] = [];
  for (let i = 0; i < chain.length - 1; i++) {
    const [p, q] = [chain[i], chain[i + 1]];
    below.push(p);
    if (q[1] >= y) {
      const t = (y - p[1]) / (q[1] - p[1] || 1);
      return { at: [p[0] + (q[0] - p[0]) * t, y], below };
    }
  }
  return { at: chain[chain.length - 1], below: chain };
}

type BoxLabels = Partial<Record<'l' | 'w' | 'h', string>>;

/**
 * A box drawn like `box` (`solids.ts`) with only the edges we can see, from corners `c`: the front,
 * side and top faces (the top face replaced by `topFace` when part of it is covered), and the edges,
 * with the back top edge and the left top edge clipped where `cover` (a convex outline) stands in
 * front of them. Labels: the length along the front bottom edge, the width going back along the
 * right bottom edge and the height up the front left edge.
 */
function openBox(nm: (s: string) => string, key: string, c: ReturnType<typeof corners3>, o: { cover?: P[]; topFace?: P[]; labels?: BoxLabels; group: string }): Part {
  const points: Record<string, P> = {};
  const id = (s: string) => nm(`${key}${s}`);
  for (const [k, p] of Object.entries(c)) points[id(k)] = p;
  const items: DiagramItem[] = [
    { kind: 'region', id: id('front'), points: ['A', 'B', 'C', 'D'].map(id), tone: 'brand', shade: 0.16, group: o.group },
    { kind: 'region', id: id('side'), points: ['B', 'F', 'G', 'C'].map(id), tone: 'brand', shade: 0.16, group: o.group },
  ];
  if (o.topFace) items.push({ kind: 'region', id: id('top'), points: named(points, id('tf'), o.topFace), tone: 'brand', shade: 0.16, group: o.group });
  else items.push({ kind: 'region', id: id('top'), points: ['D', 'C', 'G', 'H'].map(id), tone: 'brand', shade: 0.16, group: o.group });
  const edge = (e: string, a: string, b: string) => items.push({ kind: 'line', id: id(e), from: id(a), to: id(b), group: o.group });
  edge('ab', 'A', 'B');
  edge('bc', 'B', 'C');
  edge('cd', 'C', 'D');
  edge('da', 'D', 'A');
  edge('bf', 'B', 'F');
  edge('fg', 'F', 'G');
  edge('cg', 'C', 'G');
  for (const [e, a, b] of [['dh', 'D', 'H'], ['hg', 'H', 'G']] as const) {
    const parts = o.cover ? outside(c[a], c[b], o.cover) : [[c[a], c[b]] as [P, P]];
    parts.forEach(([p, q], i) => {
      Object.assign(points, { [id(`${e}${i}a`)]: p, [id(`${e}${i}b`)]: q });
      items.push({ kind: 'line', id: id(`${e}${i}`), from: id(`${e}${i}a`), to: id(`${e}${i}b`), group: o.group });
    });
  }
  const L = o.labels ?? {};
  if (L.l) items.push({ kind: 'line', id: id('l'), from: id('A'), to: id('B'), tone: 'adj', label: L.l, labelSide: 'right' });
  if (L.w) items.push({ kind: 'line', id: id('w'), from: id('B'), to: id('F'), tone: 'adj', label: L.w, labelSide: 'right' });
  if (L.h) items.push({ kind: 'line', id: id('h'), from: id('A'), to: id('D'), tone: 'opp', label: L.h, labelSide: 'left' });
  return { points, items };
}

/** A shaded red patch with a red outline (dashed for a face hidden behind the solid). */
function patch(points: Record<string, P>, id: string, list: P[], o: { dashed?: boolean; shade?: number; group: string }): DiagramItem[] {
  const ids = named(points, `${id}-`, list);
  return [
    { kind: 'region', id: `${id}-fill`, points: ids, tone: 'bad', shade: o.shade ?? 0.55, group: o.group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: 'bad', weight: 3, dashed: o.dashed, group: o.group },
  ];
}

/**
 * A two-layer cake: a box `bottom` ([length, width, height]) with a smaller box `top` centred on
 * it, drawn like the solids in `solids.ts`. With `lift`, the top layer floats that far above the
 * bottom one, to show the two faces that touch: the patch of the bottom layer's top that the top
 * layer covers (`overlap`, red) and the top layer's own bottom face (`under`, dashed red, since it
 * faces away from us).
 *
 * Labels: `l1`, `w1`, `h1` for the bottom layer, `l2` (over the top layer's back top edge), `w2`
 * (beside its left top edge) and `h2` (beside its back right edge).
 *
 * Parts: `bottom` and `top` (groups: each layer's faces and edges), `overlap`, `under`, and the
 * labels `b-l`, `b-w`, `b-h`, `t-l`, `t-w`, `t-h`.
 */
export function cake(o: {
  name?: string;
  bottom: [number, number, number];
  top: [number, number, number];
  lift?: number;
  labels?: Partial<Record<'l1' | 'w1' | 'h1' | 'l2' | 'w2' | 'h2', string>>;
}): Part {
  const nm = namer(o.name);
  const [l1, w1, h1] = o.bottom;
  const [l2, w2, h2] = o.top;
  const lift = o.lift ?? 0;
  const x0 = (l1 - l2) / 2;
  const y0 = (w1 - w2) / 2;
  const lo = corners3(0, 0, 0, l1, w1, h1);
  const hi = corners3(x0, y0, h1 + lift, l2, w2, h2);
  // The outline of the top layer as we see it, going round anticlockwise.
  const cover = [hi.A, hi.B, hi.F, hi.G, hi.H, hi.D];
  let topFace: P[] | undefined;
  if (!lift) {
    const y = lo.H[1];
    const right = crossAt([hi.B, hi.F, hi.G], y);
    const left = crossAt([hi.A, hi.D, hi.H], y);
    topFace = [lo.D, lo.C, lo.G, right.at, ...[...right.below].reverse(), ...left.below, left.at, lo.H];
  }
  const L = o.labels ?? {};
  const bottom = openBox(nm, 'b-', lo, { cover: lift ? undefined : cover, topFace, labels: { l: L.l1, w: L.w1, h: L.h1 }, group: nm('bottom') });
  const top = openBox(nm, 't-', hi, { group: nm('top') });
  const points: Record<string, P> = { ...bottom.points, ...top.points };
  const items: DiagramItem[] = [...bottom.items];
  if (lift) {
    const foot = corners3(x0, y0, h1, l2, w2, 0);
    items.push(...patch(points, nm('overlap'), [foot.A, foot.B, foot.F, foot.E], { group: nm('overlap') }));
  }
  items.push(...top.items);
  if (lift) items.push(...patch(points, nm('under'), [hi.A, hi.B, hi.F, hi.E], { dashed: true, shade: 0.3, group: nm('under') }));
  // The top layer's labels sit outside it: the length over its back top edge, the width beside its
  // left top edge, the height beside its back right edge.
  if (L.l2) items.push({ kind: 'line', id: nm('t-l'), from: nm('t-H'), to: nm('t-G'), tone: 'adj', label: L.l2, labelSide: 'left' });
  if (L.w2) items.push({ kind: 'line', id: nm('t-w'), from: nm('t-D'), to: nm('t-H'), tone: 'adj', label: L.w2, labelSide: 'left' });
  if (L.h2) items.push({ kind: 'line', id: nm('t-h'), from: nm('t-F'), to: nm('t-G'), tone: 'opp', label: L.h2, labelSide: 'right' });
  return { points, items };
}

/** Points round an ellipse (a circle of radius r seen from a little above): its front and back halves. */
function ellipse(c: P, r: number, steps = 24): { front: P[]; back: P[] } {
  const front: P[] = [];
  const back: P[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI + (i * Math.PI) / steps;
    front.push([c[0] + r * Math.cos(a), c[1] + r * TILT * Math.sin(a)]);
    const b = (i * Math.PI) / steps;
    back.push([c[0] + r * Math.cos(b), c[1] + r * TILT * Math.sin(b)]);
  }
  return { front, back };
}

/**
 * A trophy: a cylinder of radius `r` and height `h` standing on the middle of the top of a box
 * `block` ([length, width, height]). With `lift`, the cylinder floats that far above the box, to
 * show the two circles that touch: the circle on the box that the cylinder covers (`overlap`, red)
 * and the cylinder's own bottom (`under`, dashed red).
 *
 * Labels: `l`, `w`, `h` for the box, `r` (over the cylinder's top) and `ch` (up its right side).
 *
 * Parts: `block` and `cyl` (groups: the faces and edges of each), `lateral` (the curved surface of
 * the cylinder), `lid` (its top circle), `overlap`, `under`, and the labels `b-l`, `b-w`, `b-h`,
 * `r` and `ch`.
 */
export function trophy(o: { name?: string; block: [number, number, number]; r: number; h: number; lift?: number; labels?: Partial<Record<'l' | 'w' | 'h' | 'r' | 'ch', string>> }): Part {
  const nm = namer(o.name);
  const [l, w, hb] = o.block;
  const lift = o.lift ?? 0;
  const lo = corners3(0, 0, 0, l, w, hb);
  const foot = pr(l / 2, w / 2, hb);
  const c: P = [foot[0], foot[1] + lift];
  const base = ellipse(c, o.r);
  const lid = ellipse([c[0], c[1] + o.h], o.r);
  // The outline of the cylinder as we see it, going round anticlockwise.
  const cover: P[] = [...base.front, ...lid.back];
  let topFace: P[] | undefined;
  if (!lift) {
    const y = lo.H[1];
    topFace = [lo.D, lo.C, lo.G, [c[0] + o.r, y], ...[...base.front].reverse(), [c[0] - o.r, y], lo.H];
  }
  const L = o.labels ?? {};
  const block = openBox(nm, 'b-', lo, { cover: lift ? undefined : cover, topFace, labels: { l: L.l, w: L.w, h: L.h }, group: nm('block') });
  const points: Record<string, P> = { ...block.points };
  const items: DiagramItem[] = [...block.items];
  if (lift) items.push(...patch(points, nm('overlap'), [...ellipse(foot, o.r).front, ...ellipse(foot, o.r).back.slice(1, -1)], { group: nm('overlap') }));
  const cyl = nm('cyl');
  const bf = named(points, nm('bf'), base.front);
  const bb = named(points, nm('bb'), base.back);
  const tf = named(points, nm('tf'), lid.front);
  const tb = named(points, nm('tb'), lid.back);
  items.push(
    { kind: 'region', id: nm('lateral'), points: [...tf, ...[...bf].reverse()], tone: 'brand', shade: 0.16, group: cyl },
    { kind: 'region', id: nm('lid'), points: [...tf, ...tb.slice(1, -1)], tone: 'brand', shade: 0.16, group: cyl },
    { kind: 'curve', id: nm('base-front'), points: bf, group: cyl },
    { kind: 'line', id: nm('left'), from: bf[0], to: tf[0], group: cyl },
    { kind: 'line', id: nm('right'), from: bf[bf.length - 1], to: tf[tf.length - 1], group: cyl },
    { kind: 'curve', id: nm('rim'), points: [...tf, ...tb.slice(1, -1)], closed: true, group: cyl },
  );
  if (lift) {
    items.push({ kind: 'curve', id: nm('base-back'), points: bb, dashed: true, group: cyl });
    items.push(...patch(points, nm('under'), [...base.front, ...[...base.back].slice(1, -1)], { dashed: true, shade: 0.3, group: nm('under') }));
  }
  if (L.r) {
    Object.assign(points, { [nm('rO')]: [c[0], c[1] + o.h], [nm('rR')]: [c[0] + o.r, c[1] + o.h], [nm('rl')]: [c[0] + o.r / 2, c[1] + o.h + o.r * TILT] });
    items.push(
      { kind: 'line', id: nm('r-line'), from: nm('rO'), to: nm('rR'), tone: 'adj', group: nm('r') },
      { kind: 'label', id: nm('r-label'), at: nm('rl'), tex: L.r, tone: 'adj', place: 'above', group: nm('r') },
    );
  }
  if (L.ch) items.push({ kind: 'line', id: nm('ch'), from: bf[bf.length - 1], to: tf[tf.length - 1], tone: 'opp', label: L.ch, labelSide: 'right' });
  return { points, items };
}
