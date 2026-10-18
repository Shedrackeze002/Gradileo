/**
 * Figures for the Limits of Measurement videos (precision, accuracy, uncertainty and tolerance).
 * Like the other course helpers, they are built only from standard diagram parts (lines, labels
 * and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `closeUp`: a magnified stretch of a ruler or tape, with a bar ending on it and the range its
 *   true end could be in (for uncertainty).
 * - `valueLine`: a number line for sizes, with a shaded acceptable range, tall marks for limits or
 *   a true value, measured values as dots, and brackets for gaps (for tolerance and accuracy).
 * - `errorBars`: objects of different sizes drawn the same width, each with its error as a red
 *   piece at the end, to show an error as a fraction of the size (for percent error).
 * - `readout`: the screen of a digital tool showing a value.
 * - `spacerStack`: spacers stacked on a bolt, with a size on each and the total below.
 * - `holeShaft`: a shaft inside its hole, seen end on, with both diameters and the gap between.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The four corners of a rectangle, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}a`]: [x0, y0], [`${key}b`]: [x1, y0], [`${key}c`]: [x1, y1], [`${key}d`]: [x0, y1] });
  return ['a', 'b', 'c', 'd'].map((k) => `${key}${k}`);
}

/** The outline of a rectangle as four lines in a group. */
function outline(corners: string[], id: string, group: string, tone?: DiagramTone, weight = 3): DiagramItem[] {
  return corners.map((p, i) => ({ kind: 'line', id: `${id}${i}`, from: p, to: corners[(i + 1) % 4], ...(tone ? { tone } : {}), weight, group }) as DiagramItem);
}

/**
 * A magnified stretch of a ruler or tape from `from` to `to` (in its own units, centimetres or
 * inches), `sub` spaces to a unit (10 for millimetres, 8 for eighths of an inch). Its marks hang
 * from its top edge, and `numbers` writes values under chosen marks. A bar lies along the top,
 * running in from the left and ending at `end`, with its `reading` above. `band` shades the range
 * the bar's true end could be in, with its ends labelled under the ruler.
 *
 * Parts: `scale` (a group: the body, marks, numbers and unit), `bar` (a group), `end` (the dashed
 * line at the bar's end), `reading`, `band` (the shading), and `lo` and `hi` (groups: each end of
 * the band, its dashed line and its label).
 */
export function closeUp(o: { name?: string; from: number; to: number; sub: number; numbers?: [number, string][]; end?: number; reading?: string; band?: { from: number; to: number; lo?: string; hi?: string }; unit?: string; length?: number }): Part {
  const n = namer(o.name);
  const L = o.length ?? 12;
  const X = (v: number) => ((v - o.from) / (o.to - o.from)) * L;
  const H = 2.2;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const scale = n('scale');
  const body = rect(points, n('B'), -0.3, -H, L + 0.3, 0);
  items.push({ kind: 'region', id: n('body'), points: body, tone: 'theta', shade: 0.12, group: scale });
  items.push({ kind: 'line', id: n('edge-top'), from: body[3], to: body[2], weight: 3, group: scale }, { kind: 'line', id: n('edge-bottom'), from: body[0], to: body[1], weight: 3, tone: 'muted', group: scale });
  const first = Math.ceil(o.from * o.sub - 1e-9);
  const last = Math.floor(o.to * o.sub + 1e-9);
  for (let i = first; i <= last; i++) {
    const v = i / o.sub;
    const whole = i % o.sub === 0;
    const half = !whole && (o.sub % 2 === 0 ? i % (o.sub / 2) === 0 : false);
    const quarter = !whole && !half && o.sub % 4 === 0 && i % (o.sub / 4) === 0;
    const len = whole ? 1.15 : half ? 0.85 : quarter ? 0.68 : 0.52;
    Object.assign(points, { [n(`m${i}`)]: [X(v), 0], [n(`e${i}`)]: [X(v), -len] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`m${i}`), to: n(`e${i}`), weight: whole ? 3.5 : 2.5, group: scale });
  }
  for (const [v, tex] of o.numbers ?? []) {
    const k = String(v).replace('.', '_');
    points[n(`n${k}`)] = [X(v), -1.25];
    items.push({ kind: 'label', id: n(`num${k}`), at: n(`n${k}`), tex, place: 'below', group: scale });
  }
  if (o.unit) {
    points[n('unit')] = [L + 0.3, -0.5 * H];
    items.push({ kind: 'label', id: n('unit-label'), at: n('unit'), tex: o.unit, tone: 'muted', place: 'right', group: scale });
  }
  if (o.end !== undefined) {
    const bar = rect(points, n('R'), -0.3, 0.3, X(o.end), 1.1);
    items.push({ kind: 'region', id: n('bar-fill'), points: bar, tone: 'brand', shade: 0.35, group: n('bar') });
    items.push({ kind: 'curve', id: n('bar-edge'), points: bar, closed: true, tone: 'brand', group: n('bar') });
    Object.assign(points, { [n('end0')]: [X(o.end), 0], [n('end1')]: [X(o.end), 1.5] });
    items.push({ kind: 'line', id: n('end'), from: n('end1'), to: n('end0'), tone: 'theta', dashed: true });
    if (o.reading) items.push({ kind: 'label', id: n('reading'), at: n('end1'), tex: o.reading, tone: 'theta', place: 'above' });
  }
  if (o.band) {
    const b = o.band;
    items.push({ kind: 'region', id: n('band'), points: rect(points, n('W'), X(b.from), -0.75, X(b.to), 1.3), tone: 'good', shade: 0.28 });
    for (const [key, v, tex] of [['lo', b.from, b.lo], ['hi', b.to, b.hi]] as const) {
      Object.assign(points, { [n(`${key}0`)]: [X(v), 1.3], [n(`${key}1`)]: [X(v), -H - 0.35] });
      items.push({ kind: 'line', id: n(`${key}-line`), from: n(`${key}0`), to: n(`${key}1`), tone: 'good', dashed: true, weight: 2.5, group: n(key) });
      if (tex) items.push({ kind: 'label', id: n(`${key}-label`), at: n(`${key}1`), tex, tone: 'good', place: 'below', group: n(key) });
    }
  }
  return { points, items };
}

/**
 * A number line for sizes, from `min` to `max`, `length` units long, with a mark every `step` and,
 * every `every`-th mark (none with 0, the default), a number written to `decimals` places.
 *
 * `band` shades the acceptable range around the line. Each of `ticks` is a tall mark (a limit, a
 * nominal or a true value) with its label at the top. Each of `spans` is a bracket above the line
 * between two values, labelled above it (`level` lifts it, to stack brackets). Each of `dots` is a
 * measured value: a dot on the line, labelled below it.
 *
 * Parts: `axis` (a group: the line, marks, numbers and unit), `band`, each tick and span by its id
 * (a group: its lines and its label, or the `group` it names instead, to show several together),
 * and each dot by its id (it can join a `group` as well).
 */
export function valueLine(o: {
  name?: string;
  min: number;
  max: number;
  step: number;
  every?: number;
  decimals: number;
  length?: number;
  unit?: string;
  band?: { from: number; to: number; tone?: DiagramTone; group?: string };
  ticks?: { id: string; value: number; tex: string; tone?: DiagramTone; height?: number; group?: string }[];
  spans?: { id: string; from: number; to: number; tex: string; tone?: DiagramTone; level?: number; group?: string }[];
  dots?: { id: string; value: number; tex: string; tone?: DiagramTone; group?: string }[];
}): Part {
  const n = namer(o.name);
  const L = o.length ?? 12;
  const X = (v: number) => ((v - o.min) / (o.max - o.min)) * L;
  const points: Record<string, P> = { [n('L')]: [-0.4, 0], [n('R')]: [L + 0.4, 0] };
  const items: DiagramItem[] = [];
  const axis = n('axis');
  if (o.band) {
    const b = o.band;
    items.push({ kind: 'region', id: n('band'), points: rect(points, n('W'), X(b.from), -0.32, X(b.to), 0.32), tone: b.tone ?? 'good', shade: 0.35, ...(b.group ? { group: n(b.group) } : {}) });
  }
  items.push({ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: axis });
  const count = Math.round((o.max - o.min) / o.step);
  const every = o.every ?? 0;
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * o.step;
    const big = every > 0 && i % every === 0;
    Object.assign(points, { [n(`t${i}a`)]: [X(v), big ? -0.24 : -0.14], [n(`t${i}b`)]: [X(v), big ? 0.24 : 0.14] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: 2, tone: 'muted', group: axis });
    if (big) items.push({ kind: 'label', id: n(`num${i}`), at: n(`t${i}a`), tex: v.toFixed(o.decimals), tone: 'muted', place: 'below', group: axis });
  }
  if (o.unit) items.push({ kind: 'label', id: n('unit'), at: n('R'), tex: o.unit, tone: 'muted', place: 'right', group: axis });
  for (const t of o.ticks ?? []) {
    const g = t.group ? n(t.group) : n(t.id);
    Object.assign(points, { [n(`${t.id}-a`)]: [X(t.value), 0], [n(`${t.id}-b`)]: [X(t.value), t.height ?? 2] });
    items.push(
      { kind: 'line', id: n(`${t.id}-mark`), from: n(`${t.id}-a`), to: n(`${t.id}-b`), tone: t.tone ?? 'theta', weight: 3, group: g },
      { kind: 'label', id: n(`${t.id}-label`), at: n(`${t.id}-b`), tex: t.tex, tone: t.tone ?? 'theta', place: 'above', group: g },
    );
  }
  for (const s of o.spans ?? []) {
    const y = 0.75 + 0.6 * (s.level ?? 0);
    const g = s.group ? n(s.group) : n(s.id);
    const tone = s.tone ?? 'opp';
    Object.assign(points, {
      [n(`${s.id}-a`)]: [X(s.from), y],
      [n(`${s.id}-b`)]: [X(s.to), y],
      [n(`${s.id}-a0`)]: [X(s.from), y - 0.18],
      [n(`${s.id}-a1`)]: [X(s.from), y + 0.18],
      [n(`${s.id}-b0`)]: [X(s.to), y - 0.18],
      [n(`${s.id}-b1`)]: [X(s.to), y + 0.18],
    });
    items.push(
      { kind: 'line', id: n(`${s.id}-span`), from: n(`${s.id}-a`), to: n(`${s.id}-b`), tone, weight: 3, label: s.tex, labelSide: 'left', group: g },
      { kind: 'line', id: n(`${s.id}-cap0`), from: n(`${s.id}-a0`), to: n(`${s.id}-a1`), tone, weight: 3, group: g },
      { kind: 'line', id: n(`${s.id}-cap1`), from: n(`${s.id}-b0`), to: n(`${s.id}-b1`), tone, weight: 3, group: g },
    );
  }
  for (const d of o.dots ?? []) {
    points[n(`${d.id}-at`)] = [X(d.value), 0];
    items.push({ kind: 'label', id: n(d.id), at: n(`${d.id}-at`), tex: d.tex, tone: d.tone ?? 'brand', place: 'below', dot: true, ...(d.group ? { group: n(d.group) } : {}) });
  }
  return { points, items };
}

/**
 * Objects of different sizes, each drawn as a bar of the same width (its true size), with its
 * error as a red piece added at the right end, `fraction` of the bar long. The name sits above the
 * bar's left end, and the error's label to the right of the red piece.
 *
 * Parts: each row by its id (a group: the bar and its name), and `<id>-err` (a group: the red piece
 * and its label).
 */
export function errorBars(o: { name?: string; rows: { id: string; label: string; fraction: number; tex: string }[]; length?: number }): Part {
  const n = namer(o.name);
  const L = o.length ?? 9;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const most = Math.max(...o.rows.map((r) => r.fraction));
  // Room on the right for the labels of the errors.
  points[n('room')] = [L * (1 + most) + 3.6, 0];
  o.rows.forEach((r, i) => {
    const y = -i * 2.4;
    const bar = rect(points, n(`${r.id}-B`), 0, y, L, y + 0.9);
    items.push({ kind: 'region', id: n(`${r.id}-fill`), points: bar, tone: 'adj', shade: 0.4, group: n(r.id) });
    items.push(...outline(bar, n(`${r.id}-side`), n(r.id), 'adj', 2.5));
    points[n(`${r.id}-name`)] = [0, y + 0.9];
    items.push({ kind: 'label', id: n(`${r.id}-label`), at: n(`${r.id}-name`), tex: r.label, place: 'above right', group: n(r.id) });
    const err = rect(points, n(`${r.id}-E`), L, y, L * (1 + r.fraction), y + 0.9);
    items.push({ kind: 'region', id: n(`${r.id}-err-fill`), points: err, tone: 'bad', shade: 0.85, group: n(`${r.id}-err`) });
    items.push({ kind: 'line', id: n(`${r.id}-err-edge`), from: err[1], to: err[2], tone: 'bad', weight: 3, group: n(`${r.id}-err`) });
    points[n(`${r.id}-err-at`)] = [L * (1 + r.fraction) + 0.2, y + 0.45];
    items.push({ kind: 'label', id: n(`${r.id}-err-label`), at: n(`${r.id}-err-at`), tex: r.tex, tone: 'bad', place: 'right', group: n(`${r.id}-err`) });
  });
  return { points, items };
}

/**
 * The screen of a digital measuring tool, `w` by `h`, centred on `at`, showing `value`, with
 * `title` (the tool's name) under it.
 *
 * Parts: `screen` (a group: the screen and its frame), `value` and `title`.
 */
export function readout(o: { name?: string; at?: P; value: string; title?: string; w?: number; h?: number; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const w = o.w ?? 5;
  const h = o.h ?? 1.8;
  const points: Record<string, P> = { [n('mid')]: [x, y], [n('foot')]: [x, y - h / 2 - 0.15] };
  const screen = rect(points, n('S'), x - w / 2, y - h / 2, x + w / 2, y + h / 2);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('glass'), points: screen, tone: 'muted', shade: 0.22, group: n('screen') },
    ...outline(screen, n('frame'), n('screen'), 'muted', 4),
    { kind: 'label', id: n('value'), at: n('mid'), tex: o.value, tone: o.tone ?? 'good', place: 'center' },
  ];
  if (o.title) items.push({ kind: 'label', id: n('title'), at: n('foot'), tex: o.title, tone: 'muted', place: 'below' });
  return { points, items };
}

/**
 * Spacers stacked end to end on a bolt, drawn from the side to scale (`sizes` in millimetres),
 * each labelled above, with the total length dimensioned below. `lift` raises a spacer's label
 * (in millimetres), to keep the labels of thin spacers apart.
 *
 * Parts: `bolt` (a group), each spacer `s0`, `s1`… (a group: its shading, outline and label), and
 * `total` (a group: the dimension line, its ends and its label).
 */
export function spacerStack(o: { name?: string; sizes: number[]; labels: string[]; total?: string; tones?: DiagramTone[]; lift?: number[] }): Part {
  const n = namer(o.name);
  const T = o.sizes.reduce((s, v) => s + v, 0);
  const half = 4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const bolt = rect(points, n('bolt'), -4, -1.4, T + 5, 1.4);
  items.push({ kind: 'region', id: n('bolt-fill'), points: bolt, tone: 'muted', shade: 0.35, group: n('bolt') });
  items.push(...outline(bolt, n('bolt-side'), n('bolt'), 'muted', 2));
  const head = rect(points, n('head'), -7, -3.2, -4, 3.2);
  items.push({ kind: 'region', id: n('head-fill'), points: head, tone: 'muted', shade: 0.5, group: n('bolt') });
  items.push(...outline(head, n('head-side'), n('bolt'), 'muted', 2));
  const tones = o.tones ?? ['adj', 'opp', 'hyp', 'brand'];
  let x = 0;
  o.sizes.forEach((s, i) => {
    const g = n(`s${i}`);
    const c = rect(points, n(`S${i}-`), x, -half, x + s, half);
    const tone = tones[i % tones.length];
    items.push({ kind: 'region', id: n(`s${i}-fill`), points: c, tone, shade: 0.55, group: g });
    items.push(...outline(c, n(`s${i}-side`), g, tone, 3));
    points[n(`s${i}-top`)] = [x + s / 2, half + (o.lift?.[i] ?? 0)];
    items.push({ kind: 'label', id: n(`s${i}-label`), at: n(`s${i}-top`), tex: o.labels[i], tone, place: 'above', group: g });
    x += s;
  });
  const y = -half - 2.2;
  Object.assign(points, {
    [n('d0')]: [0, y],
    [n('d1')]: [T, y],
    [n('x0a')]: [0, -half - 0.5],
    [n('x0b')]: [0, y - 0.6],
    [n('x1a')]: [T, -half - 0.5],
    [n('x1b')]: [T, y - 0.6],
  });
  items.push(
    { kind: 'line', id: n('total-line'), from: n('d0'), to: n('d1'), tone: 'theta', weight: 3, ...(o.total ? { label: o.total, labelSide: 'right' as const } : {}), group: n('total') },
    { kind: 'line', id: n('total-x0'), from: n('x0a'), to: n('x0b'), tone: 'theta', weight: 2, dashed: true, group: n('total') },
    { kind: 'line', id: n('total-x1'), from: n('x1a'), to: n('x1b'), tone: 'theta', weight: 2, dashed: true, group: n('total') },
  );
  return { points, items };
}

/** Points round a circle, from angle `from` through `sweep` (radians), named `<key>0`, `<key>1`… */
function ring(points: Record<string, P>, key: string, r: number, from = 0, sweep = 2 * Math.PI, steps = 72): string[] {
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = from + (sweep * i) / steps;
    points[`${key}${i}`] = [r * Math.cos(a), r * Math.sin(a)];
    names.push(`${key}${i}`);
  }
  return names;
}

/**
 * A shaft inside its hole, seen end on (the gap between them drawn wider than life). The hole's
 * diameter is dimensioned above, the shaft's below, and the gap is shaded and named on the right.
 *
 * Parts: `hole` (a group: its edge), `shaft` (a group: its shading and edge), `gap` (a group: the
 * shaded ring and its name), `hole-dim` and `shaft-dim` (groups: each dimension line, its
 * extension lines and its label).
 */
export function holeShaft(o: { name?: string; hole: string; shaft: string; gap?: string }): Part {
  const n = namer(o.name);
  const R = 3;
  const r = 2.35;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const outer = ring(points, n('o'), R);
  const inner = ring(points, n('i'), r);
  // The ring between the circles: round the outside, across, and back round the inside the other way.
  items.push({ kind: 'region', id: n('gap-fill'), points: [...outer, ...inner.slice().reverse()], tone: 'good', shade: 0.4, group: n('gap') });
  items.push({ kind: 'region', id: n('shaft-fill'), points: inner.slice(0, -1), tone: 'adj', shade: 0.45, group: n('shaft') });
  items.push({ kind: 'curve', id: n('shaft-edge'), points: inner.slice(0, -1), closed: true, tone: 'adj', weight: 3, group: n('shaft') });
  items.push({ kind: 'curve', id: n('hole-edge'), points: outer.slice(0, -1), closed: true, weight: 4, group: n('hole') });
  const yTop = R + 1.1;
  const yBot = -R - 1.1;
  Object.assign(points, {
    [n('hd0')]: [-R, yTop],
    [n('hd1')]: [R, yTop],
    [n('hx0')]: [-R, 0],
    [n('hx0b')]: [-R, yTop + 0.4],
    [n('hx1')]: [R, 0],
    [n('hx1b')]: [R, yTop + 0.4],
    [n('sd0')]: [-r, yBot],
    [n('sd1')]: [r, yBot],
    [n('sx0')]: [-r, 0],
    [n('sx0b')]: [-r, yBot - 0.4],
    [n('sx1')]: [r, 0],
    [n('sx1b')]: [r, yBot - 0.4],
    [n('gl')]: [R + 0.25, 0],
    // Room on the right for the gap's name.
    [n('room')]: [R + 4.6, 0],
    [n('room2')]: [-R - 1.5, 0],
  });
  items.push(
    { kind: 'line', id: n('hole-line'), from: n('hd0'), to: n('hd1'), tone: 'theta', weight: 3, label: o.hole, labelSide: 'left', group: n('hole-dim') },
    { kind: 'line', id: n('hole-x0'), from: n('hx0'), to: n('hx0b'), tone: 'theta', weight: 2, dashed: true, group: n('hole-dim') },
    { kind: 'line', id: n('hole-x1'), from: n('hx1'), to: n('hx1b'), tone: 'theta', weight: 2, dashed: true, group: n('hole-dim') },
    { kind: 'line', id: n('shaft-line'), from: n('sd0'), to: n('sd1'), tone: 'adj', weight: 3, label: o.shaft, labelSide: 'right', group: n('shaft-dim') },
    { kind: 'line', id: n('shaft-x0'), from: n('sx0'), to: n('sx0b'), tone: 'adj', weight: 2, dashed: true, group: n('shaft-dim') },
    { kind: 'line', id: n('shaft-x1'), from: n('sx1'), to: n('sx1b'), tone: 'adj', weight: 2, dashed: true, group: n('shaft-dim') },
  );
  if (o.gap) items.push({ kind: 'label', id: n('gap-label'), at: n('gl'), tex: o.gap, tone: 'good', place: 'right', group: n('gap') });
  return { points, items };
}
