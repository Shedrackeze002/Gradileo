/**
 * Figures for the Adding and Subtracting videos: column addition and subtraction with carries
 * and regrouping marks, a bar split into parts (a part-whole model), and thirteen ones regrouped
 * as a ten and three ones. Like the figures in `src/video/`, each is built only from standard
 * diagram parts (lines, regions and labels) and goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A place as part of an id: the ones are `p0`, the tens `p1`…, the tenths `d1`, the hundredths `d2`… */
export const placeKey = (p: number) => (p >= 0 ? `p${p}` : `d${-p}`);

/** Each digit of a number with its place (0 for the ones, −1 for the tenths), and where its point is. */
function digits(s: string): { d: string; p: number }[] {
  const [whole, frac = ''] = s.split('.');
  return [...[...whole].map((d, i) => ({ d, p: whole.length - 1 - i })), ...[...frac].map((d, i) => ({ d, p: -(i + 1) }))];
}

/**
 * A sum or difference set out in columns: the top number, the bottom number with the sign in
 * front of it, a line, and the answer under it. The decimal points line up (or, with
 * `align: 'right'`, the last digits do, to show that mistake). Small `marks` go above a column
 * (carries, and the new digits after regrouping), and `cross` strikes out top digits.
 *
 * Every id names a place: `placeKey(p)` is `p0` for the ones, `p1` the tens, `d1` the tenths.
 * Parts: the top number `top` (a group: its digits `a<key>` and point `pa`), the bottom number
 * `bottom` (a group: the sign `op`, its digits `b<key>` and point `pb`), the line `bar`, each
 * answer digit `s<key>` and the answer's point `ps` (all in the group `sum`), each mark by its
 * id, each strike `x<key>`, and a shaded highlight for each column `c<key>`.
 */
export function columns(o: {
  name?: string;
  top: string;
  bottom: string;
  answer?: string;
  op: '+' | '-';
  marks?: { id: string; place: number; tex: string; tone?: DiagramTone; level?: number }[];
  cross?: number[];
  /** A colour for a digit, by its id ("a-d2", the top number's hundredths). */
  tones?: Record<string, DiagramTone>;
  align?: 'point' | 'right';
  at?: P;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const gap = 1;
  const pw = 0.5;
  const right = o.align === 'right';
  // With the points lined up, a place has one x for every row; lined up on the right, each row
  // keeps its own places, counted from its last digit.
  const xOf = (p: number) => x0 + (p >= 0 ? -p * gap : -p * gap + pw);
  const rowX = (s: string) => {
    if (!right) return (p: number) => xOf(p);
    // The last digit at x0; each digit further left one gap, and the point a narrower space.
    const ds = digits(s);
    const last = ds[ds.length - 1].p;
    return (p: number) => x0 - (p - last) * gap - (p >= 0 && last < 0 ? pw : 0);
  };
  const yAns = y0;
  const yBar = y0 + 0.62;
  const yBot = y0 + 1.25;
  const yTop = y0 + 2.5;
  const yMark = (level = 1) => yTop + 0.62 + (level - 1) * 0.6;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const all = [o.top, o.bottom, ...(o.answer ? [o.answer] : [])].flatMap(digits).map((x) => x.p);
  const hi = Math.max(...all);
  const lo = Math.min(...all);
  // Column highlights first, so the digits are drawn over them.
  if (!right) {
    for (let p = hi; p >= lo; p--) {
      const x = xOf(p);
      const k = placeKey(p);
      Object.assign(points, { [n(`h${k}a`)]: [x - 0.46, yAns - 0.5], [n(`h${k}b`)]: [x + 0.46, yAns - 0.5], [n(`h${k}c`)]: [x + 0.46, yMark(1) + 0.35], [n(`h${k}d`)]: [x - 0.46, yMark(1) + 0.35] });
      items.push({ kind: 'region', id: n(`c${k}`), points: ['a', 'b', 'c', 'd'].map((c) => n(`h${k}${c}`)), tone: 'theta', shade: 0.14 });
    }
  }
  const row = (s: string, y: number, key: string, group: string, point: string) => {
    const X = rowX(s);
    const ds = digits(s);
    for (const { d, p } of ds) {
      const id = `${key}${placeKey(p)}`;
      points[n(id)] = [X(p), y];
      items.push({ kind: 'label', id: n(id), at: n(id), tex: `\\LARGE ${d}`, tone: o.tones?.[id] ?? 'ink', place: 'center', ...(group ? { group: n(group) } : {}) });
    }
    if (s.includes('.')) {
      // The point sits level with the foot of the digits.
      points[n(point)] = [(X(0) + X(-1)) / 2, y - 0.22];
      items.push({ kind: 'label', id: n(point), at: n(point), tex: '\\LARGE .', tone: 'ink', place: 'center', ...(group ? { group: n(group) } : {}) });
    }
    return Math.min(...ds.map(({ p }) => X(p)));
  };
  const leftTop = row(o.top, yTop, 'a', 'top', 'pa');
  const leftBot = row(o.bottom, yBot, 'b', 'bottom', 'pb');
  const leftmost = Math.min(leftTop, leftBot) - gap;
  points[n('op')] = [leftmost, yBot];
  items.push({ kind: 'label', id: n('op'), at: n('op'), tex: o.op === '+' ? '\\LARGE +' : '\\LARGE -', tone: 'ink', place: 'center', group: n('bottom') });
  const rightmost = Math.max(...[o.top, o.bottom].flatMap((s) => digits(s).map(({ p }) => rowX(s)(p))));
  Object.assign(points, { [n('bar-a')]: [leftmost - 0.45, yBar], [n('bar-b')]: [rightmost + 0.45, yBar] });
  items.push({ kind: 'line', id: n('bar'), from: n('bar-a'), to: n('bar-b'), tone: 'ink', weight: 3.5 });
  if (o.answer) {
    const ds = digits(o.answer);
    for (const { d, p } of ds) {
      const id = `s${placeKey(p)}`;
      points[n(id)] = [xOf(p), yAns];
      items.push({ kind: 'label', id: n(id), at: n(id), tex: `\\LARGE ${d}`, tone: o.tones?.[id] ?? 'good', place: 'center', group: n('sum') });
    }
    if (o.answer.includes('.')) {
      points[n('ps')] = [(xOf(0) + xOf(-1)) / 2, yAns - 0.22];
      items.push({ kind: 'label', id: n('ps'), at: n('ps'), tex: '\\LARGE .', tone: 'good', place: 'center', group: n('sum') });
    }
  }
  for (const p of o.cross ?? []) {
    const k = placeKey(p);
    const x = xOf(p);
    Object.assign(points, { [n(`x${k}a`)]: [x - 0.3, yTop - 0.34], [n(`x${k}b`)]: [x + 0.3, yTop + 0.34] });
    items.push({ kind: 'line', id: n(`x${k}`), from: n(`x${k}a`), to: n(`x${k}b`), tone: 'bad', weight: 3.5 });
  }
  for (const m of o.marks ?? []) {
    points[n(m.id)] = [xOf(m.place), yMark(m.level)];
    items.push({ kind: 'label', id: n(m.id), at: n(m.id), tex: m.tex, tone: m.tone ?? 'opp', place: 'center' });
  }
  return { points, items };
}

/**
 * A bar split into parts, for a missing number: the whole bar on top with its total, and under it
 * the parts, each as wide as its share, with its value (or a box for the missing one).
 *
 * Parts: `whole` (a group: the bar and its label) and each part `part<i>` (a group: its piece and
 * label).
 */
export function partWhole(o: { name?: string; total: string; parts: { tex: string; share: number; tone?: DiagramTone }[]; width?: number; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 10;
  const H = 1.1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const box = (id: string, xa: number, ya: number, xb: number, yb: number, tone: DiagramTone, tex: string, group: string) => {
    const c = ['A', 'B', 'C', 'D'].map((k) => n(`${id}${k}`));
    Object.assign(points, { [c[0]]: [xa, ya], [c[1]]: [xb, ya], [c[2]]: [xb, yb], [c[3]]: [xa, yb], [n(`${id}M`)]: [(xa + xb) / 2, (ya + yb) / 2] });
    items.push(
      { kind: 'region', id: n(`${id}-fill`), points: c, tone, shade: 0.3, group: n(group) },
      { kind: 'curve', id: n(`${id}-edge`), points: c, closed: true, tone, weight: 2.5, group: n(group) },
      { kind: 'label', id: n(`${id}-label`), at: n(`${id}M`), tex, place: 'center', tone: 'ink', group: n(group) },
    );
  };
  box('w', x0, y0 + H + 0.35, x0 + W, y0 + 2 * H + 0.35, 'brand', o.total, 'whole');
  const sum = o.parts.reduce((s, p) => s + p.share, 0);
  let x = x0;
  o.parts.forEach((p, i) => {
    const w = (p.share / sum) * W;
    box(`p${i}`, x, y0, x + w, y0 + H, p.tone ?? (i % 2 ? 'opp' : 'adj'), p.tex, `part${i}`);
    x += w;
  });
  return { points, items };
}

/**
 * A row of `count` unit squares, with the first ten ringed as one ten (for regrouping 13 ones as
 * 1 ten and 3 ones). Parts: `ones` (a group: every square), `ten` (a group: the ring and its label
 * "1 ten") and `left` (the label under the squares after the ten).
 */
export function onesToTen(o: { name?: string; count: number; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const s = 1;
  const g = 0.18;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) {
    const xa = x0 + i * (s + g);
    const c = ['A', 'B', 'C', 'D'].map((k) => n(`u${i}${k}`));
    Object.assign(points, { [c[0]]: [xa, y0], [c[1]]: [xa + s, y0], [c[2]]: [xa + s, y0 + s], [c[3]]: [xa, y0 + s] });
    items.push({ kind: 'region', id: n(`u${i}`), points: c, tone: 'adj', shade: 0.55, group: n('ones') }, { kind: 'curve', id: n(`u${i}-edge`), points: c, closed: true, tone: 'adj', weight: 2, group: n('ones') });
  }
  const tenEnd = x0 + 10 * (s + g) - g;
  const ring = ['A', 'B', 'C', 'D'].map((k) => n(`r${k}`));
  Object.assign(points, { [ring[0]]: [x0 - 0.2, y0 - 0.2], [ring[1]]: [tenEnd + 0.2, y0 - 0.2], [ring[2]]: [tenEnd + 0.2, y0 + s + 0.2], [ring[3]]: [x0 - 0.2, y0 + s + 0.2] });
  points[n('tenlab')] = [(x0 + tenEnd) / 2, y0 - 0.35];
  items.push(
    { kind: 'curve', id: n('ring'), points: ring, closed: true, tone: 'good', weight: 3.5, group: n('ten') },
    { kind: 'label', id: n('ten-label'), at: n('tenlab'), tex: '\\text{1 ten}', tone: 'good', place: 'below', group: n('ten') },
  );
  const restStart = x0 + 10 * (s + g);
  const restEnd = x0 + o.count * (s + g) - g;
  points[n('leftlab')] = [(restStart + restEnd) / 2, y0 - 0.35];
  items.push({ kind: 'label', id: n('left'), at: n('leftlab'), tex: `\\text{${o.count - 10} ones}`, tone: 'opp', place: 'below' });
  return { points, items };
}
