/**
 * Helpers for the area videos (parallelograms, triangles and composite shapes), built only from
 * standard diagram parts (lines, shaded regions, right-angle marks and labels), so each goes into
 * a diagram with `figure`:
 *
 * - `piece`: a shaded polygon with its outline (a piece of a shape that can be shown, hidden or
 *   moved on its own).
 * - `seg`, `mark`, `note`: one line (with an optional label), one right-angle mark, one label.
 * - `height`: a dashed orange height with its label and a right-angle mark at its foot.
 * - `parallelogram`: a parallelogram on its base, with its base, slanted side and height.
 * - `cutAndSlide`: a parallelogram whose end triangle is cut off along the height and slid to the
 *   other end, making a rectangle with the same base and height.
 * - `triangle`: a triangle on its base, with its height (outside it, on the extended base, when the
 *   top corner is past the end of the base).
 *
 * Bases are blue, heights orange and slanted sides pink in every video, as for the solids.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Joins parts into one. */
export function join(...parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/**
 * A shaded polygon through `corners` with its outline: the parts `<id>-fill` and `<id>-edge`, in
 * the group `id`. With `outline: false`, only the shading.
 */
export function piece(id: string, corners: P[], o: { tone?: DiagramTone; shade?: number; weight?: number; edge?: DiagramTone; outline?: boolean; dashed?: boolean } = {}): Part {
  const points: Record<string, P> = {};
  const names = corners.map((c, i) => {
    points[`${id}-v${i}`] = c;
    return `${id}-v${i}`;
  });
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [{ kind: 'region', id: `${id}-fill`, points: names, tone, shade: o.shade ?? 0.2, group: id }];
  if (o.outline !== false) items.push({ kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone: o.edge ?? tone, weight: o.weight ?? 3, dashed: o.dashed, group: id });
  return { points, items };
}

/** A line from `from` to `to`, with an optional label beside it: the part `id`. */
export function seg(
  id: string,
  from: P,
  to: P,
  o: { tone?: DiagramTone; dashed?: boolean; weight?: number; label?: string; side?: 'left' | 'right'; at?: number; arrow?: boolean; group?: string } = {},
): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        ...(o.tone ? { tone: o.tone } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.weight ? { weight: o.weight } : {}),
        ...(o.label ? { label: o.label, labelSide: o.side, labelAt: o.at } : {}),
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** A right-angle mark at `at`, between the directions to `from` and `to`: the part `id`. */
export function mark(id: string, at: P, from: P, to: P, group?: string): Part {
  return {
    points: { [`${id}-o`]: at, [`${id}-p`]: from, [`${id}-q`]: to },
    items: [{ kind: 'right', id, at: `${id}-o`, from: `${id}-p`, to: `${id}-q`, ...(group ? { group } : {}) }],
  };
}

/** A label (TeX) at a point, with no dot: the part `id`. */
export function note(id: string, at: P, tex: string, place: Place = 'center', tone: DiagramTone = 'ink', group?: string): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, tone, place, ...(group ? { group } : {}) }] };
}

/**
 * A height: a dashed orange line from `top` down to `foot`, with `label` beside it, and a
 * right-angle mark at the foot, turned toward `toward` (a point along the base). Parts: the group
 * `id` (the line `<id>-line` and the mark `<id>-mark`).
 */
export function height(id: string, top: P, foot: P, toward: P, o: { label?: string; side?: 'left' | 'right'; at?: number } = {}): Part {
  return join(
    seg(`${id}-line`, top, foot, { tone: 'opp', dashed: true, weight: 3, label: o.label, side: o.side, at: o.at, group: id }),
    mark(`${id}-mark`, foot, top, toward, id),
  );
}

/**
 * A parallelogram on its base: corners A (0, 0), B (b, 0), C (b + s, h) and D (s, h), so the top
 * side is `s` further right than the base. `heights` are the x values where a height is drawn
 * (at `s`, under D, by default), each a part `h<i>`; the first carries the height's label.
 *
 * Parts: `shape` (a group: the shading and outline), `base` (the bottom side, blue, with its label
 * below), `side` and `rside` (the left and right sides, pink, with their labels), `top` (the top
 * side, blue, for "the opposite side"), the heights `h0`, `h1`… (groups: the dashed line and its
 * mark), and `ext` (the base extended to meet a height past its end, when there is one).
 */
export function parallelogram(o: {
  name?: string;
  b: number;
  h: number;
  s: number;
  /** Where corner A goes (the bottom left), to put two parallelograms side by side. */
  at?: P;
  heights?: number[];
  /** Label every height, not only the first. */
  labelAll?: boolean;
  /** Where each height's label sits, 0 (top) to 1 (foot): half way by default. */
  hAt?: number;
  /** Which side of the heights their labels go, looking down them: 'left' (on the right of the picture, the default) or 'right'. */
  hSide?: 'left' | 'right';
  labels?: { b?: string; h?: string; s?: string; rs?: string; top?: string };
  tone?: DiagramTone;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const A: P = [x0, y0];
  const B: P = [x0 + o.b, y0];
  const C: P = [x0 + o.b + o.s, y0 + o.h];
  const D: P = [x0 + o.s, y0 + o.h];
  const parts: Part[] = [
    piece(n('shape'), [A, B, C, D], { tone: o.tone ?? 'brand', shade: 0.18 }),
    seg(n('base'), A, B, { tone: 'adj', weight: 5, label: o.labels?.b, side: 'right' }),
    seg(n('side'), A, D, { tone: 'hyp', weight: 5, label: o.labels?.s, side: 'left' }),
    seg(n('top'), D, C, { tone: 'adj', weight: 5, label: o.labels?.top, side: 'left' }),
    seg(n('rside'), B, C, { tone: 'hyp', weight: 5, label: o.labels?.rs, side: 'right' }),
  ];
  // Each height's mark sits on its left, clear of its label on the right.
  (o.heights ?? [o.s]).forEach((x, i) => {
    parts.push(height(n(`h${i}`), [x0 + x, y0 + o.h], [x0 + x, y0], [x0 + x - 1, y0], { label: i === 0 || o.labelAll ? o.labels?.h : undefined, side: o.hSide ?? 'left', at: o.hAt }));
  });
  // A height that lands past the right end of the base meets the base extended (dashed, grey).
  const far = Math.max(...(o.heights ?? [o.s]));
  if (far > o.b) parts.push(seg(n('ext'), B, [x0 + far, y0], { tone: 'muted', dashed: true, weight: 2.5 }));
  return join(...parts);
}

/**
 * A parallelogram (base `b`, height `h`, top side `s` further right) cut along the height under
 * its top left corner: the triangle on the left (`piece`) is cut off along `cut`, and `moved` is
 * the same triangle slid `b` to the right, so `rest` and `moved` make a rectangle.
 *
 * Parts: `rest` and `piece` (groups: the trapezoid and the triangle, which together are the
 * parallelogram), `cut` (the dashed height, with `label`), `moved` (a group: the triangle at the
 * other end), `base` (the parallelogram's base, labelled), and the rectangle's `rb` (its base,
 * labelled), `rh` (its height, labelled) and `corners` (a group: its two right-angle marks).
 */
export function cutAndSlide(o: { name?: string; b: number; h: number; s: number; labels: { b: string; h: string } }): Part {
  const n = namer(o.name);
  const A: P = [0, 0];
  const B: P = [o.b, 0];
  const C: P = [o.b + o.s, o.h];
  const D: P = [o.s, o.h];
  const H: P = [o.s, 0];
  const H2: P = [o.b + o.s, 0];
  return join(
    piece(n('rest'), [H, B, C, D], { tone: 'brand', shade: 0.2 }),
    piece(n('piece'), [A, H, D], { tone: 'theta', shade: 0.35 }),
    piece(n('moved'), [B, H2, C], { tone: 'theta', shade: 0.35 }),
    seg(n('cut'), D, H, { tone: 'opp', dashed: true, weight: 3.5, label: o.labels.h, side: 'left' }),
    seg(n('base'), A, B, { tone: 'adj', weight: 5, label: o.labels.b, side: 'right' }),
    seg(n('rb'), H, H2, { tone: 'adj', weight: 5, label: o.labels.b, side: 'right' }),
    seg(n('rh'), H2, C, { tone: 'opp', weight: 5, label: o.labels.h, side: 'right' }),
    mark(n('m1'), H, D, H2, n('corners')),
    mark(n('m2'), H2, C, H, n('corners')),
  );
}

/**
 * A triangle with its base along the bottom from (0, 0) to (b, 0) and its top corner at `apex`.
 * The height drops from the top corner straight down to the base line; when the top corner is past
 * an end of the base, the base is extended to meet it with a dashed grey line (`ext`).
 *
 * Parts: `shape` (a group), `base` (blue, labelled below), `h` (a group: the dashed height and its
 * mark), `ext`, and `left` and `right` (the two slanted sides, pink, with their labels if given).
 */
export function triangle(o: {
  name?: string;
  b: number;
  apex: P;
  /** Where the left end of the base goes, to put several triangles in one figure. */
  at?: P;
  tone?: DiagramTone;
  shade?: number;
  labels?: { b?: string; h?: string; left?: string; right?: string };
  hSide?: 'left' | 'right';
  noHeight?: boolean;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const A: P = [x0, y0];
  const B: P = [x0 + o.b, y0];
  const C: P = [x0 + o.apex[0], y0 + o.apex[1]];
  const F: P = [C[0], y0];
  const parts: Part[] = [piece(n('shape'), [A, B, C], { tone: o.tone ?? 'brand', shade: o.shade ?? 0.18 })];
  parts.push(seg(n('base'), A, B, { tone: 'adj', weight: 5, label: o.labels?.b, side: 'right' }));
  if (o.labels?.left) parts.push(seg(n('left'), A, C, { tone: 'hyp', weight: 5, label: o.labels.left, side: 'left' }));
  if (o.labels?.right) parts.push(seg(n('right'), C, B, { tone: 'hyp', weight: 5, label: o.labels.right, side: 'left' }));
  if (!o.noHeight) {
    if (o.apex[0] > o.b) parts.push(seg(n('ext'), B, F, { tone: 'muted', dashed: true, weight: 2.5 }));
    if (o.apex[0] < 0) parts.push(seg(n('ext'), F, A, { tone: 'muted', dashed: true, weight: 2.5 }));
    // The mark turns toward the base (or its extension), so it sits in the corner the height makes.
    const toward: P = o.apex[0] >= o.b ? A : o.apex[0] < 0 ? B : [C[0] + 1, y0];
    parts.push(height(n('h'), C, F, toward, { label: o.labels?.h, side: o.hSide ?? 'left' }));
  }
  return join(...parts);
}
