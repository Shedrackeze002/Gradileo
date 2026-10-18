/**
 * Figures for the Set Theory and Logic videos: Venn diagrams of sets inside a universal set, with
 * any region shaded (A ∪ B, A′, A \ B, A ∩ (B ∪ C)…) and the elements or counts written in each
 * region. Like the Math 30-1 helpers, they are built only from standard diagram parts (lines,
 * curves, labels and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `venn`: any circles in a rectangle (two overlapping sets, a subset inside a set, nested sets).
 * - `venn2` and `venn3`: two or three overlapping sets in the usual layout.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** A set drawn as a circle: its key (A), centre, radius and title (TeX). */
export interface VennSet {
  key: string;
  c: P;
  r: number;
  title: string;
  tone?: DiagramTone;
  /** Where on the circle the title sits, in degrees from the right (135 is the top left). */
  titleAt?: number;
  titlePlace?: Place;
  /** Where the title is centred instead, clear of the circle and the rectangle. */
  titlePos?: P;
}

/** Which sets a point is in, by key. */
export type Membership = Record<string, boolean>;

/** A shaded region: the points whose membership passes `where`. */
export interface VennShade {
  id: string;
  where: (m: Membership) => boolean;
  tone?: DiagramTone;
  shade?: number;
  group?: string;
}

const TAU = 2 * Math.PI;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const onCircle = (s: VennSet, a: number): P => [s.c[0] + s.r * Math.cos(a), s.c[1] + s.r * Math.sin(a)];
const norm = (a: number) => ((a % TAU) + TAU) % TAU;

/** Which sets the point is in. */
function membership(sets: VennSet[], p: P): Membership {
  return Object.fromEntries(sets.map((s) => [s.key, dist(p, s.c) < s.r]));
}

/** The keys of the sets a point is in ("AB"), or "out" for a point in none of them. */
const signature = (sets: VennSet[], m: Membership) => sets.filter((s) => m[s.key]).map((s) => s.key).join('') || 'out';

/**
 * The outline of a region as one polygon. Each circle is cut where it crosses the others; a piece
 * is on the region's edge when stepping across it changes whether `where` holds, and it is followed
 * with the region on its left (anticlockwise round a circle the region is inside, clockwise round
 * one it is outside). The pieces join end to end into loops; a second loop (a hole, such as the
 * circle cut out of a complement, or a second piece of the region) is reached by a there-and-back
 * bridge, which encloses nothing, so the polygon fills exactly the region.
 */
function outline(sets: VennSet[], box: [number, number, number, number], where: (m: Membership) => boolean): P[] {
  const arcs: P[][] = [];
  for (const s of sets) {
    const cuts: number[] = [];
    for (const t of sets) {
      if (t === s) continue;
      const d = dist(s.c, t.c);
      if (d >= s.r + t.r || d <= Math.abs(s.r - t.r)) continue;
      const phi = Math.atan2(t.c[1] - s.c[1], t.c[0] - s.c[0]);
      const a = Math.acos((d * d + s.r * s.r - t.r * t.r) / (2 * d * s.r));
      cuts.push(norm(phi - a), norm(phi + a));
    }
    cuts.sort((a, b) => a - b);
    const spans: [number, number][] = cuts.length ? cuts.map((a, i) => [a, i + 1 < cuts.length ? cuts[i + 1] : cuts[0] + TAU]) : [[0, TAU]];
    for (const [a0, a1] of spans) {
      const m = membership(sets, onCircle(s, (a0 + a1) / 2));
      const inside = where({ ...m, [s.key]: true });
      if (inside === where({ ...m, [s.key]: false })) continue;
      const k = Math.max(2, Math.ceil((a1 - a0) / (Math.PI / 90)));
      const pts = Array.from({ length: k + 1 }, (_, i) => onCircle(s, a0 + ((a1 - a0) * i) / k));
      arcs.push(inside ? pts : pts.reverse());
    }
  }
  // The rectangle's edge, when the region includes the space outside every circle.
  const [x0, y0, x1, y1] = box;
  if (where(Object.fromEntries(sets.map((s) => [s.key, false])))) arcs.push([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]);
  const same = (p: P, q: P) => dist(p, q) < 1e-6;
  const loops: P[][] = [];
  const left = [...arcs];
  while (left.length) {
    let loop = left.shift()!;
    while (!same(loop[loop.length - 1], loop[0])) {
      const i = left.findIndex((a) => same(a[0], loop[loop.length - 1]));
      if (i < 0) throw new Error('venn: a shaded region has an open edge.');
      loop = [...loop, ...left.splice(i, 1)[0].slice(1)];
    }
    loops.push(loop.slice(0, -1));
  }
  if (!loops.length) throw new Error('venn: a shaded region is empty.');
  const [first, ...rest] = loops;
  const out: P[] = [...first, first[0]];
  for (const l of rest) out.push(...l, l[0], first[0]);
  return out;
}

/**
 * A point well inside each region, for writing its elements or count: the sample point farthest
 * from every circle and from the rectangle, by region signature ("A", "AB", "out").
 */
function middles(sets: VennSet[], box: [number, number, number, number]): Record<string, P> {
  const [x0, y0, x1, y1] = box;
  const step = Math.min(x1 - x0, y1 - y0) / 140;
  const best: Record<string, { p: P; room: number }> = {};
  for (let x = x0 + step; x < x1; x += step) {
    for (let y = y0 + step; y < y1; y += step) {
      const p: P = [x, y];
      // Labels are wider than they are tall, so horizontal room counts for less.
      const room = Math.min(...sets.map((s) => Math.abs(dist(p, s.c) - s.r)), (x - x0) * 0.8, (x1 - x) * 0.8, y - y0, y1 - y);
      const sig = signature(sets, membership(sets, p));
      if (!best[sig] || room > best[sig].room) best[sig] = { p, room };
    }
  }
  return Object.fromEntries(Object.entries(best).map(([k, v]) => [k, v.p]));
}

/**
 * Sets drawn as circles in a rectangle (the universal set, named by `universe`, U by default; ''
 * for no name), with shaded regions and a value written in each region.
 *
 * Parts: `box` (a group: the rectangle and the universal set's name `U`); each set by its key (a
 * group: its outline `<key>-outline` and title `<key>-title`); each shaded region by its `id`; and
 * each region's value `v-<signature>` (group `values`), where the signature names the sets the
 * region is in ("v-A" is in A only, "v-AB" in A and B only, "v-out" outside every circle). A value
 * sits in the middle of its region unless `valueAt` places it.
 */
export function venn(o: {
  name?: string;
  sets: VennSet[];
  box: [number, number, number, number];
  universe?: string;
  shade?: VennShade[];
  values?: Record<string, string>;
  valueAt?: Record<string, P>;
  valueTone?: DiagramTone | Record<string, DiagramTone>;
}): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const [x0, y0, x1, y1] = o.box;
  const points: Record<string, P> = { [n('bA')]: [x0, y0], [n('bB')]: [x1, y0], [n('bC')]: [x1, y1], [n('bD')]: [x0, y1] };
  const items: DiagramItem[] = [];
  for (const sh of o.shade ?? []) {
    const ids = outline(o.sets, o.box, sh.where).map((p, i) => {
      points[n(`${sh.id}-${i}`)] = p;
      return n(`${sh.id}-${i}`);
    });
    items.push({ kind: 'region', id: n(sh.id), points: ids, tone: sh.tone ?? 'theta', shade: sh.shade ?? 0.3, ...(sh.group ? { group: n(sh.group) } : {}) });
  }
  for (const [id, a, b] of [['box-b', 'bA', 'bB'], ['box-r', 'bB', 'bC'], ['box-t', 'bC', 'bD'], ['box-l', 'bD', 'bA']]) {
    items.push({ kind: 'line', id: n(id), from: n(a), to: n(b), tone: 'muted', weight: 2.5, group: n('box') });
  }
  const universe = o.universe ?? 'U';
  if (universe) {
    const k = Math.min(x1 - x0, y1 - y0) * 0.035;
    points[n('U-at')] = [x0 + k, y1 - k];
    items.push({ kind: 'label', id: n('U'), at: n('U-at'), tex: universe, tone: 'muted', place: 'below right', group: n('box') });
  }
  for (const s of o.sets) {
    const ids = Array.from({ length: 96 }, (_, i) => {
      points[n(`${s.key}-c${i}`)] = onCircle(s, (i * TAU) / 96);
      return n(`${s.key}-c${i}`);
    });
    const tone = s.tone ?? 'brand';
    items.push({ kind: 'curve', id: n(`${s.key}-outline`), points: ids, closed: true, tone, weight: 3, group: n(s.key) });
    const at = ((s.titleAt ?? (s.c[0] <= (x0 + x1) / 2 ? 135 : 45)) * Math.PI) / 180;
    points[n(`${s.key}-t`)] = s.titlePos ?? onCircle(s, at);
    const place = s.titlePos ? 'center' : (s.titlePlace ?? (Math.cos(at) < 0 ? 'above left' : 'above right'));
    items.push({ kind: 'label', id: n(`${s.key}-title`), at: n(`${s.key}-t`), tex: s.title, tone, place, group: n(s.key) });
  }
  if (o.values) {
    const mid = middles(o.sets, o.box);
    for (const [sig, tex] of Object.entries(o.values)) {
      const p = o.valueAt?.[sig] ?? mid[sig];
      if (!p) throw new Error(`venn: no region "${sig}".`);
      points[n(`v-${sig}-at`)] = p;
      const tone = typeof o.valueTone === 'string' ? o.valueTone : (o.valueTone?.[sig] ?? 'ink');
      items.push({ kind: 'label', id: n(`v-${sig}`), at: n(`v-${sig}-at`), tex, tone, place: 'center', group: n('values') });
    }
  }
  return { points, items };
}

type Common = { name?: string; universe?: string; shade?: VennShade[]; values?: Record<string, string>; valueAt?: Record<string, P>; valueTone?: DiagramTone | Record<string, DiagramTone>; /** Where to centre each title, for long titles. */ titlePos?: P[] };

/**
 * Two overlapping sets, A on the left and B on the right, with their titles above them. Region
 * signatures: `A` (A only), `AB` (both), `B` (B only) and `out`.
 */
export function venn2(o: Common & { titles: [string, string]; tones?: [DiagramTone, DiagramTone] }): Part {
  return venn({
    ...o,
    box: [-6.8, -4.3, 6.8, 4.3],
    sets: [
      { key: 'A', c: [-1.5, 0], r: 3, title: o.titles[0], tone: o.tones?.[0] ?? 'adj', titlePos: o.titlePos?.[0] ?? [-3.5, 3.5] },
      { key: 'B', c: [1.5, 0], r: 3, title: o.titles[1], tone: o.tones?.[1] ?? 'opp', titlePos: o.titlePos?.[1] ?? [3.5, 3.5] },
    ],
  });
}

/**
 * Three overlapping sets: A at the top left, B at the top right and C at the bottom. Region
 * signatures: `A`, `B`, `C` (one set only), `AB`, `AC`, `BC` (two only), `ABC` and `out`.
 */
export function venn3(o: Common & { titles: [string, string, string]; tones?: [DiagramTone, DiagramTone, DiagramTone] }): Part {
  return venn({
    ...o,
    box: [-6, -5.6, 6, 5],
    sets: [
      { key: 'A', c: [-1.55, 0.9], r: 2.7, title: o.titles[0], tone: o.tones?.[0] ?? 'adj', titlePos: o.titlePos?.[0] ?? [-2.75, 4.2] },
      { key: 'B', c: [1.55, 0.9], r: 2.7, title: o.titles[1], tone: o.tones?.[1] ?? 'opp', titlePos: o.titlePos?.[1] ?? [2.75, 4.2] },
      { key: 'C', c: [0, -1.78], r: 2.7, title: o.titles[2], tone: o.tones?.[2] ?? 'good', titlePos: o.titlePos?.[2] ?? [-3, -4.55] },
    ],
  });
}

/** A part moved by (dx, dy), to set two figures side by side. */
export function moved(p: Part, [dx, dy]: P): Part {
  return { points: Object.fromEntries(Object.entries(p.points).map(([k, [x, y]]) => [k, [x + dx, y + dy] as P])), items: p.items };
}

/** A dot at `at` with a label beside it (a person or a number placed in a Venn diagram). Part: `id`. */
export function mark(o: { id: string; at: P; tex: string; place?: Place; tone?: DiagramTone }): Part {
  return { points: { [`${o.id}-at`]: o.at }, items: [{ kind: 'label', id: o.id, at: `${o.id}-at`, tex: o.tex, place: o.place ?? 'below', tone: o.tone ?? 'theta', dot: true }] };
}
