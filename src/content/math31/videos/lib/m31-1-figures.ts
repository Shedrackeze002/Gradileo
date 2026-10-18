/**
 * Figures for the precalculus review videos (composite functions, the difference quotient,
 * logarithms and radians), built only from standard diagram parts, so each goes into a diagram
 * with `figure`. Graphs use the helpers in `m31-2-graphs.ts`.
 *
 * - `machine`: a composite function as two machines in a row. The input goes into the inner
 *   function, its output travels along an arrow into the outer function, and the final output
 *   comes out on the right.
 * - `radian`: a circle with an arc as long as its radius, and the angle of one radian it makes.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * Two function machines in a row: `input` (TeX) on the left, an arrow into the first box (named
 * `first`, with `firstNote` under it), an arrow carrying `mid` (TeX, written above it) into the
 * second box (`second`, with `secondNote`), and an arrow out to `output` on the right.
 *
 * Parts: `in`, `a1`, `box1` (a group: the box, its fill, its name and its note), `a2` (the middle
 * arrow and its label), `box2` (a group), `a3` and `out`.
 */
export function machine(o: { name?: string; input: string; first: string; firstNote?: string; mid: string; second: string; secondNote?: string; output: string; tones?: [DiagramTone, DiagramTone] }): Part {
  const n = namer(o.name);
  const [t1, t2] = o.tones ?? ['adj', 'opp'];
  const H = 1.25;
  const points: Record<string, P> = {
    [n('in')]: [0.9, 0],
    [n('a1s')]: [1.3, 0],
    [n('a1e')]: [3.1, 0],
    [n('a2s')]: [6.7, 0],
    [n('a2e')]: [10.3, 0],
    [n('a3s')]: [13.9, 0],
    [n('a3e')]: [15.7, 0],
    [n('out')]: [16.1, 0],
  };
  // The input and output sit beside the ends of the arrows, so a long one never runs into them.
  const items: DiagramItem[] = [{ kind: 'label', id: n('in'), at: n('in'), tex: o.input, place: 'left' }];
  const box = (k: 1 | 2, x0: number, x1: number, title: string, note: string | undefined, tone: DiagramTone) => {
    const c = [n(`b${k}-0`), n(`b${k}-1`), n(`b${k}-2`), n(`b${k}-3`)];
    [[x0, -H], [x1, -H], [x1, H], [x0, H]].forEach((q, i) => (points[c[i]] = q as P));
    points[n(`b${k}-mid`)] = [(x0 + x1) / 2, 0];
    points[n(`b${k}-note`)] = [(x0 + x1) / 2, -H - 0.2];
    const group = n(`box${k}`);
    items.push(
      { kind: 'region', id: n(`box${k}-fill`), points: c, tone, shade: 0.14, group },
      { kind: 'curve', id: n(`box${k}-edge`), points: c, closed: true, tone, weight: 3.5, group },
      { kind: 'label', id: n(`box${k}-name`), at: n(`b${k}-mid`), tex: title, tone, place: 'center', group },
    );
    if (note) items.push({ kind: 'label', id: n(`box${k}-note`), at: n(`b${k}-note`), tex: note, tone: 'muted', place: 'below', group });
  };
  box(1, 3.1, 6.7, o.first, o.firstNote, t1);
  box(2, 10.3, 13.9, o.second, o.secondNote, t2);
  items.push(
    { kind: 'line', id: n('a1'), from: n('a1s'), to: n('a1e'), tone: 'ink', weight: 3, arrow: true },
    { kind: 'line', id: n('a2'), from: n('a2s'), to: n('a2e'), tone: t1, weight: 3, arrow: true, label: o.mid, labelSide: 'left' },
    { kind: 'line', id: n('a3'), from: n('a3s'), to: n('a3e'), tone: 'ink', weight: 3, arrow: true },
    { kind: 'label', id: n('out'), at: n('out'), tex: o.output, tone: t2, place: 'right' },
  );
  return { points, items };
}

/**
 * A number line from `min` to `max` (`length` units long, numbered every `every`) with the stretches
 * of a domain marked on it: each span runs from `from` to `to`, with a solid dot at an end that is
 * included and a hollow dot at one that is not; an end at `Infinity` or `-Infinity` runs off the
 * line in an arrow.
 *
 * Parts: `axis` (a group: the line, its marks and its numbers), and each span `id` (a group: the
 * thick stretch `id-bar` and its end dots `id-a` and `id-b`).
 */
export function domainLine(o: { name?: string; min: number; max: number; every?: number; length?: number; spans: { id: string; from: number; to: number; closedFrom?: boolean; closedTo?: boolean; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const L = o.length ?? 14;
  const X = (v: number) => ((v - o.min) / (o.max - o.min)) * L;
  const points: Record<string, P> = { [n('L')]: [-0.6, 0], [n('R')]: [L + 0.6, 0] };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('line-l'), from: n('R'), to: n('L'), tone: 'muted', weight: 2.5, arrow: true, group: n('axis') },
    { kind: 'line', id: n('line-r'), from: n('L'), to: n('R'), tone: 'muted', weight: 2.5, arrow: true, group: n('axis') },
  ];
  const every = o.every ?? 1;
  for (let v = o.min, i = 0; v <= o.max + 1e-9; v += every, i++) {
    Object.assign(points, { [n(`t${i}a`)]: [X(v), -0.18], [n(`t${i}b`)]: [X(v), 0.18] });
    items.push(
      { kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), tone: 'muted', weight: 2, group: n('axis') },
      { kind: 'label', id: n(`num${i}`), at: n(`t${i}a`), tex: String(Number(v.toFixed(6))), tone: 'muted', place: 'below', group: n('axis') },
    );
  }
  for (const s of o.spans) {
    const tone = s.tone ?? 'good';
    const a = Number.isFinite(s.from) ? X(s.from) : -0.6;
    const b = Number.isFinite(s.to) ? X(s.to) : L + 0.6;
    Object.assign(points, { [n(`${s.id}-a`)]: [a, 0], [n(`${s.id}-b`)]: [b, 0] });
    const group = n(s.id);
    items.push({ kind: 'line', id: n(`${s.id}-bar`), from: n(`${s.id}-a`), to: n(`${s.id}-b`), tone, weight: 8, group, ...(Number.isFinite(s.to) ? {} : { arrow: true }) });
    if (Number.isFinite(s.from)) items.push({ kind: 'label', id: n(`${s.id}-from`), at: n(`${s.id}-a`), tex: '', tone, dot: true, open: !s.closedFrom, place: 'center', group });
    if (Number.isFinite(s.to)) items.push({ kind: 'label', id: n(`${s.id}-to`), at: n(`${s.id}-b`), tex: '', tone, dot: true, open: !s.closedTo, place: 'center', group });
  }
  return { points, items };
}

/**
 * A circle of radius `r` with two radii and the arc between them as long as the radius: the angle
 * between the radii is one radian (about 57.3°).
 *
 * Parts: `circle`, `r1` and `r2` (the radii, labelled r), `arc` (the arc, labelled r), and `angle`
 * (labelled 1 radian).
 */
export function radian(o: { name?: string; r?: number } = {}): Part {
  const n = namer(o.name);
  const R = o.r ?? 4;
  const points: Record<string, P> = { [n('O')]: [0, 0], [n('A')]: [R, 0], [n('B')]: [R * Math.cos(1), R * Math.sin(1)] };
  const ring: string[] = [];
  for (let i = 0; i < 96; i++) {
    points[n(`c${i}`)] = [R * Math.cos((i * Math.PI) / 48), R * Math.sin((i * Math.PI) / 48)];
    ring.push(n(`c${i}`));
  }
  const arc: string[] = [];
  for (let i = 0; i <= 24; i++) {
    points[n(`a${i}`)] = [R * Math.cos(i / 24), R * Math.sin(i / 24)];
    arc.push(n(`a${i}`));
  }
  const items: DiagramItem[] = [
    { kind: 'curve', id: n('circle'), points: ring, closed: true, tone: 'muted', weight: 2.5 },
    { kind: 'line', id: n('r1'), from: n('O'), to: n('A'), tone: 'adj', weight: 3.5, label: 'r', labelSide: 'right' },
    { kind: 'line', id: n('r2'), from: n('O'), to: n('B'), tone: 'adj', weight: 3.5, label: 'r', labelSide: 'left' },
    { kind: 'curve', id: n('arc'), points: arc, tone: 'opp', weight: 6, label: 'r', labelSide: 'right', labelAt: 0.5 },
    { kind: 'angle', id: n('angle'), at: n('O'), from: n('A'), to: n('B'), tone: 'theta', label: '1\\text{ rad}', r: 40, labelDist: 125 },
    { kind: 'label', id: n('centre'), at: n('O'), tex: '', tone: 'ink', dot: true, place: 'center' },
  ];
  return { points, items };
}
