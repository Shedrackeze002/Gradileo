/**
 * Figures for the powers and exponent laws videos (Grade 9, unit 2), built only from standard
 * diagram parts (lines, curves, shaded regions and labels), so each goes into a diagram with
 * `figure`:
 *
 * - `factorRings`: the factors of a power as numbers in rings, in a row, in groups with a bracket
 *   under each group and one over the whole row: 2³ × 2⁴ is three rings of 2 and four rings of 2,
 *   seven factors in all; (−2)⁶ is three pairs of (−2), each pair making 4.
 * - `ringFraction`: the factors of a quotient as two rows of rings, the top over the bottom, with
 *   the factors that divide out struck through in pairs: 5⁶ ÷ 5² leaves four rings of 5.
 * - `shareTree`: a story shared in rounds: one person at the top, who shares with k people, each of
 *   whom shares with k more, round after round.
 *
 * Patterns of powers come from `pattern` (`src/video/numbers.ts`), squares of tiles from
 * `tileSquare` (`src/content/math8/videos/lib/m8-1-figures.ts`), stacks of unit cubes from `cubes`
 * (`src/content/math6/videos/lib/m6-10-figures.ts`) and the base and exponent of a power from
 * `powerParts` (`src/content/math6/videos/lib/m6-3-figures.ts`).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { bracket } from '@/content/math8/videos/lib/m8-3-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A number in a ring at `c`: a shaded disc, its outline and the number, all in `group`. */
function ring(points: Record<string, P>, id: string, c: P, r: number, tex: string, tone: DiagramTone, group: string): DiagramItem[] {
  const names: string[] = [];
  for (let i = 0; i < 32; i++) {
    const a = Math.PI / 2 + (2 * Math.PI * i) / 32;
    points[`${id}-${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    names.push(`${id}-${i}`);
  }
  points[`${id}-c`] = c;
  return [
    { kind: 'region', id: `${id}-fill`, points: names, tone, shade: 0.2, group },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 3, group },
    { kind: 'label', id: `${id}-tex`, at: `${id}-c`, tex: `\\large ${tex}`, place: 'center', tone: 'ink', group },
  ];
}

/** A red stroke across the ring at `c`, from its bottom left to its top right. */
function strike(points: Record<string, P>, id: string, c: P, r: number, group: string): DiagramItem {
  points[`${id}-a`] = [c[0] - 0.85 * r, c[1] - 0.85 * r];
  points[`${id}-b`] = [c[0] + 0.85 * r, c[1] + 0.85 * r];
  return { kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: 'bad', weight: 4, group };
}

/**
 * Factors in rings, in a row: each group's `values` in rings of its `tone`, `gap` apart (1.25 by
 * default), with `groupGap` more between groups (0.35), and the group's `below` (TeX) on a bracket
 * under it. `over` (TeX) goes on a bracket over the whole row.
 *
 * Parts: each group by its `id` (a group: its rings), its bracket `<id>-b` (a group), and `over`
 * (a group).
 */
export function factorRings(o: { name?: string; groups: { id: string; values: string[]; tone?: DiagramTone; below?: string }[]; gap?: number; groupGap?: number; r?: number; over?: string }): Part {
  const nm = namer(o.name);
  const gap = o.gap ?? 1.25;
  const groupGap = o.groupGap ?? 0.35;
  const r = o.r ?? 0.5;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = 0;
  let first = 0;
  let last = 0;
  o.groups.forEach((g, gi) => {
    const x0 = x;
    g.values.forEach((v, i) => {
      items.push(...ring(points, nm(`${g.id}-r${i}`), [x, 0], r, v, g.tone ?? 'adj', nm(g.id)));
      last = x;
      x += gap;
    });
    if (gi === 0) first = x0;
    if (g.below) items.push(...bracket(points, nm(`${g.id}-b`), [x0 - r, -r - 0.3], [x - gap + r, -r - 0.3], [0, 1], g.below, 'below', g.tone ?? 'adj', nm(`${g.id}-b`)));
    x += groupGap;
  });
  if (o.over) items.push(...bracket(points, nm('over'), [first - r, r + 0.3], [last + r, r + 0.3], [0, -1], o.over, 'above', 'theta', nm('over')));
  // Room for the labels under and over the brackets, where there are any.
  if (o.groups.some((g) => g.below)) points[nm('room-a')] = [first, -r - 1.1];
  if (o.over) points[nm('room-b')] = [first, r + 1.1];
  return { points, items };
}

/**
 * A quotient as rings: `top` rings of `tex` over a fraction bar and `bottom` rings under it, lined
 * up from the left. The first `cancel` rings of each row are struck through in red (the factors
 * that divide out, top and bottom together), and the rings left on top get a bracket over them,
 * labelled `left`.
 *
 * Parts: `top` and `bottom` (groups: the rings), `bar`, `cancel` (a group: the strokes) and
 * `left` (a group: the bracket and its label).
 */
export function ringFraction(o: { name?: string; tex: string; top: number; bottom: number; cancel: number; left?: string; gap?: number; r?: number; tone?: DiagramTone }): Part {
  const nm = namer(o.name);
  const gap = o.gap ?? 1.25;
  const r = o.r ?? 0.5;
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const y = 0.85;
  for (let i = 0; i < o.top; i++) items.push(...ring(points, nm(`t${i}`), [i * gap, y], r, o.tex, tone, nm('top')));
  for (let i = 0; i < o.bottom; i++) items.push(...ring(points, nm(`b${i}`), [i * gap, -y], r, o.tex, tone, nm('bottom')));
  Object.assign(points, { [nm('bar-a')]: [-r - 0.2, 0], [nm('bar-b')]: [(o.top - 1) * gap + r + 0.2, 0] });
  items.push({ kind: 'line', id: nm('bar'), from: nm('bar-a'), to: nm('bar-b'), tone: 'ink', weight: 3 });
  for (let i = 0; i < o.cancel; i++) {
    items.push(strike(points, nm(`ct${i}`), [i * gap, y], r, nm('cancel')));
    items.push(strike(points, nm(`cb${i}`), [i * gap, -y], r, nm('cancel')));
  }
  if (o.left && o.cancel < o.top) {
    items.push(...bracket(points, nm('left'), [o.cancel * gap - r, y + r + 0.3], [(o.top - 1) * gap + r, y + r + 0.3], [0, -1], o.left, 'above', 'good', nm('left')));
    points[nm('room')] = [0, y + r + 1.1];
  }
  return { points, items };
}

/**
 * A story shared in rounds, as a tree: one person at the top shares with `k` people (round 1),
 * each of whom shares with `k` new people (round 2), and so on for `rounds` rounds. Each round's
 * people are dots spread across `width` (14 by default), `dy` below the round before (1.6), joined
 * to the person they got it from. `labels` are written at the right of the rounds, and `top` beside
 * the person at the top.
 *
 * Parts: `root` (the person at the top and `top`), each round `round<n>` (a group: its dots and the
 * lines to them) and each label `label<n>`.
 */
export function shareTree(o: { name?: string; k: number; rounds: number; width?: number; dy?: number; top?: string; labels?: string[]; tones?: DiagramTone[] }): Part {
  const nm = namer(o.name);
  const W = o.width ?? 14;
  const dy = o.dy ?? 1.6;
  const points: Record<string, P> = { [nm('p0-0')]: [0, 0] };
  const items: DiagramItem[] = [{ kind: 'label', id: nm('root'), at: nm('p0-0'), tex: o.top ?? '', place: 'right', dot: true, tone: 'ink' }];
  let prev = 1;
  for (let n = 1; n <= o.rounds; n++) {
    const count = prev * o.k;
    const step = W / count;
    const tone = o.tones?.[n - 1] ?? 'theta';
    for (let i = 0; i < count; i++) {
      const id = nm(`p${n}-${i}`);
      points[id] = [-W / 2 + step * (i + 0.5), -n * dy];
      const parent = nm(`p${n - 1}-${Math.floor(i / o.k)}`);
      items.push({ kind: 'line', id: nm(`e${n}-${i}`), from: parent, to: id, tone: 'muted', weight: 2, group: nm(`round${n}`) });
    }
    for (let i = 0; i < count; i++) items.push({ kind: 'label', id: nm(`d${n}-${i}`), at: nm(`p${n}-${i}`), tex: '', dot: true, tone, group: nm(`round${n}`) });
    if (o.labels?.[n - 1]) {
      points[nm(`l${n}`)] = [W / 2 + 0.6, -n * dy];
      items.push({ kind: 'label', id: nm(`label${n}`), at: nm(`l${n}`), tex: o.labels[n - 1], place: 'right', tone });
    }
    prev = count;
  }
  // Room for the labels at the right.
  points[nm('room')] = [W / 2 + 5.2, 0];
  return { points, items };
}
