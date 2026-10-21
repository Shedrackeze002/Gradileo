/**
 * Figures for the ratios, rates and proportional reasoning videos (Grade 8, unit 3), built only
 * from standard diagram parts (lines, shaded regions and labels), so each goes into a diagram with
 * `figure`:
 *
 * - `tape`: a tape diagram of equal blocks for a ratio. Side by side, the parts make one bar (a
 *   three-term ratio 3 : 2 : 1 is three blocks, two blocks and one block); stacked, each part is a
 *   row of its own, lined up at the left (sharing \$84 in the ratio 3 : 4).
 * - `rateLine`: a double number line whose marks are placed by value, so an uneven pair (405 km at
 *   4.5 h) sits where it belongs.
 * - `tag`: a label (TeX) at a point.
 *
 * Ratio tables and evenly spaced double number lines come from the Grade 6 helpers
 * (`src/content/math6/videos/lib/m6-5-figures.ts`), marbles from `src/video/charts.ts` and number
 * lines from `src/video/numbers.ts`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A label (TeX) at a point, with no dot: the part `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * A bracket from `a` to `b` with short ends bent towards `toward` (a unit direction), and its
 * label at the middle, placed by `place`. Its parts are `<id>-line`, `<id>-ea`, `<id>-eb` and
 * `<id>-label`, all in `group`.
 */
export function bracket(points: Record<string, P>, id: string, a: P, b: P, toward: P, label: string, place: Place, tone: DiagramTone, group: string): DiagramItem[] {
  const end = 0.22;
  Object.assign(points, {
    [`${id}-a`]: a,
    [`${id}-b`]: b,
    [`${id}-a2`]: [a[0] + toward[0] * end, a[1] + toward[1] * end],
    [`${id}-b2`]: [b[0] + toward[0] * end, b[1] + toward[1] * end],
    [`${id}-m`]: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
  });
  return [
    { kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone, weight: 3, group },
    { kind: 'line', id: `${id}-ea`, from: `${id}-a`, to: `${id}-a2`, tone, weight: 3, group },
    { kind: 'line', id: `${id}-eb`, from: `${id}-b`, to: `${id}-b2`, tone, weight: 3, group },
    { kind: 'label', id: `${id}-label`, at: `${id}-m`, tex: label, tone, place, group },
  ];
}

/** A bracket from `a` to `b` (see `bracket`) as a figure part: the group `id`. */
export function brace(id: string, a: P, b: P, toward: P, label: string, o: { place?: Place; tone?: DiagramTone } = {}): Part {
  const points: Record<string, P> = {};
  return { points, items: bracket(points, id, a, b, toward, label, o.place ?? 'right', o.tone ?? 'theta', id) };
}

export interface TapePart {
  id: string;
  /** How many equal blocks the part has. */
  count: number;
  tone: DiagramTone;
  /** The part's name (TeX): under it in one bar, left of its row when stacked. */
  name?: string;
  /** A value (TeX) written in every block, shown later as `<id>-v`. */
  value?: string;
}

/**
 * A tape diagram of equal blocks `unit` wide. Side by side (the default) the parts make one bar,
 * each part's name under it, and `total` (TeX) is written over a bracket above the whole bar.
 * `stacked` puts each part on its own row, lined up at the left, with its name at the left and
 * the `total` bracket down the right of all the rows. `nameRoom` keeps that much room left of the
 * bar, so a long name stays inside the figure.
 *
 * Parts: each part by its `id` (a group: its blocks and its name), its values `<id>-v` (a group:
 * the value in each block), each block's highlight `<id>-b<k>` (yellow, shown on its own to point
 * at one block), and `total` (a group: the bracket and its label).
 */
export function tape(o: { name?: string; parts: TapePart[]; unit?: number; height?: number; stacked?: boolean; total?: string; at?: P; nameRoom?: number }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const u = o.unit ?? 1.4;
  const H = o.height ?? 1.1;
  const rowStep = H + 0.5;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Room kept left of the bar for long row names.
  if (o.nameRoom) points[n('room')] = [x0 - o.nameRoom, y0];
  let x = x0;
  let widest = 0;
  o.parts.forEach((p, r) => {
    const g = n(p.id);
    const left = o.stacked ? x0 : x;
    const y = o.stacked ? y0 - r * rowStep : y0;
    for (let k = 0; k < p.count; k++) {
      const id = n(`${p.id}-b${k}`);
      const corners: P[] = [
        [left + k * u, y],
        [left + (k + 1) * u, y],
        [left + (k + 1) * u, y + H],
        [left + k * u, y + H],
      ];
      const names = corners.map((q, j) => {
        points[`${id}-${j}`] = q;
        return `${id}-${j}`;
      });
      items.push(
        { kind: 'region', id: `${id}-fill`, points: names, tone: p.tone, shade: 0.4, group: g },
        { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone: p.tone, weight: 2.5, group: g },
      );
      if (p.value) {
        points[`${id}-c`] = [left + (k + 0.5) * u, y + H / 2];
        items.push({ kind: 'label', id: `${id}-val`, at: `${id}-c`, tex: p.value, tone: 'ink', place: 'center', group: n(`${p.id}-v`) });
      }
      // A yellow highlight over the block, shown on its own to point at one block.
      items.push({ kind: 'region', id, points: names, tone: 'theta', shade: 0.45 });
    }
    if (p.name) {
      points[n(`${p.id}-nm`)] = o.stacked ? [left - 0.25, y + H / 2] : [left + (p.count * u) / 2, y - 0.1];
      items.push({ kind: 'label', id: n(`${p.id}-name`), at: n(`${p.id}-nm`), tex: p.name, tone: p.tone, place: o.stacked ? 'left' : 'below', group: g });
    }
    widest = Math.max(widest, left + p.count * u);
    if (!o.stacked) x += p.count * u;
  });
  if (o.total) {
    if (o.stacked) {
      const top = y0 + H;
      const bottom = y0 - (o.parts.length - 1) * rowStep;
      items.push(...bracket(points, n('tot'), [widest + 0.4, top], [widest + 0.4, bottom], [-1, 0], o.total, 'right', 'theta', n('total')));
    } else {
      items.push(...bracket(points, n('tot'), [x0, y0 + H + 0.4], [widest, y0 + H + 0.4], [0, -1], o.total, 'above', 'theta', n('total')));
    }
  }
  return { points, items };
}

/**
 * A double number line `length` long: the top line for one quantity and the bottom line for the
 * other, each titled at its left end (with `titleRoom` kept for the titles). Each mark sits at its
 * `at` value on a scale from 0 to `max`, with its top value above the top line and its bottom
 * value under the bottom line.
 *
 * Parts: `lines` (a group: both lines and their titles), each mark pair by its `id` (a group: both
 * ticks and both values), and `<id>-link` (a dashed line joining the pair, to point it out).
 */
export function rateLine(o: {
  name?: string;
  max: number;
  marks: { id: string; at: number; top: string; bottom: string; tone?: DiagramTone }[];
  titles: [string, string];
  length?: number;
  gap?: number;
  tones?: [DiagramTone, DiagramTone];
  titleRoom?: number;
}): Part {
  const n = namer(o.name);
  const L = o.length ?? 12;
  const g = (o.gap ?? 2.2) / 2;
  const [t1, t2] = o.tones ?? ['opp', 'adj'];
  const X = (v: number) => (v / o.max) * L;
  const points: Record<string, P> = {
    [n('tl')]: [-0.3, g],
    [n('tr')]: [L + 0.3, g],
    [n('bl')]: [-0.3, -g],
    [n('br')]: [L + 0.3, -g],
    [n('tt')]: [-0.5, g],
    [n('bt')]: [-0.5, -g],
    [n('room')]: [-(o.titleRoom ?? 3.2), 0],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('top'), from: n('tl'), to: n('tr'), tone: t1, weight: 3, group: n('lines') },
    { kind: 'line', id: n('bottom'), from: n('bl'), to: n('br'), tone: t2, weight: 3, group: n('lines') },
    { kind: 'label', id: n('title-t'), at: n('tt'), tex: o.titles[0], tone: t1, place: 'left', group: n('lines') },
    { kind: 'label', id: n('title-b'), at: n('bt'), tex: o.titles[1], tone: t2, place: 'left', group: n('lines') },
  ];
  for (const m of o.marks) {
    const x = X(m.at);
    const id = n(m.id);
    Object.assign(points, {
      [`${id}-ta`]: [x, g - 0.2],
      [`${id}-tb`]: [x, g + 0.2],
      [`${id}-ba`]: [x, -g - 0.2],
      [`${id}-bb`]: [x, -g + 0.2],
      [`${id}-tv`]: [x, g + 0.25],
      [`${id}-bv`]: [x, -g - 0.25],
      [`${id}-la`]: [x, g - 0.3],
      [`${id}-lb`]: [x, -g + 0.3],
    });
    items.push(
      { kind: 'line', id: `${id}-tt`, from: `${id}-ta`, to: `${id}-tb`, tone: m.tone ?? t1, weight: 2.5, group: id },
      { kind: 'line', id: `${id}-bt`, from: `${id}-ba`, to: `${id}-bb`, tone: m.tone ?? t2, weight: 2.5, group: id },
      { kind: 'label', id: `${id}-top`, at: `${id}-tv`, tex: m.top, tone: m.tone ?? t1, place: 'above', group: id },
      { kind: 'label', id: `${id}-bottom`, at: `${id}-bv`, tex: m.bottom, tone: m.tone ?? t2, place: 'below', group: id },
      { kind: 'line', id: `${id}-link`, from: `${id}-la`, to: `${id}-lb`, tone: 'theta', dashed: true, weight: 2.5 },
    );
  }
  return { points, items };
}

/** The ids of a tape part's blocks in the figure `fig`, for `show` and `focus`. */
export const blocks = (fig: string, part: string, count: number, from = 0): string[] => Array.from({ length: count }, (_, k) => `${fig}.${part}-b${from + k}`);
