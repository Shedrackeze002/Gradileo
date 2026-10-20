/**
 * Figures for the fractions videos (Grade 6, unit 4):
 *
 * - `decimalDivision`: long division written by hand, with a decimal point in the dividend and the
 *   quotient (3 ÷ 4 = 0.75 written as 4 into 3.00), each digit appearing as the narrator reaches it.
 * - `dotGroups`: equal groups of dots, each group in a ring and in its own colour, to show a
 *   fraction of a quantity (3 of 4 groups of 5 dots is three quarters of 20).
 *
 * Pizzas and fraction bars come from the Grade 5 helpers (`pie`, `bar`). Like the figures in
 * `src/video/`, each is built only from standard diagram parts and goes into a diagram with
 * `figure`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { big, type DivStep } from '@/content/math5/videos/lib/m5-4-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The extra room, in columns, left for the decimal point between the ones and the tenths. */
const POINT = 0.4;

/**
 * Long division with decimals, as written by hand: the divisor outside the bracket (blue), the
 * dividend inside with its decimal point and the zeros written after it, and the quotient on top
 * (green) with its point straight above. Under the dividend, one product, rule and difference for
 * each step, as in the Grade 5 `longDivision`; a digit brought down is yellow, with a dashed arrow.
 *
 * The dividend and quotient are given as digits only (`'300'` for 3.00, `'075'` for 0.75, one
 * quotient digit over each dividend digit, a space where none is written), and `point` digits of
 * the dividend come before the decimal point.
 *
 * Parts: `dv` (the divisor), `bracket` (a group), the dividend's digits `dd<i>` and its point
 * `ddp` (group `dividend`), the quotient's digits `q<i>` (each on its own) and its point `qp`; and
 * for step s: `s<s>-prod` (a group), `s<s>-rule`, `s<s>-diff` (a group), the digit brought down
 * `s<s>-down` and its arrow `s<s>-arrow`.
 */
export function decimalDivision(o: { name?: string; divisor: string; dividend: string; point: number; quotient: string; steps: DivStep[]; row?: number }): Part {
  const n = namer(o.name);
  const R = o.row ?? 1.2;
  const len = o.dividend.length;
  const X = (i: number) => i + (i >= o.point ? POINT : 0);
  const xPoint = X(o.point - 1) + (1 + POINT) / 2;
  const top = 1.38;
  const bar = 0.66;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const label = (id: string, at: P, tex: string, extra: { tone?: DiagramTone; group?: string; place?: Place } = {}) => {
    points[n(id)] = at;
    items.push({ kind: 'label', id: n(id), at: n(id), tex, place: extra.place ?? 'center', ...(extra.tone ? { tone: extra.tone } : {}), ...(extra.group ? { group: n(extra.group) } : {}) });
  };
  const line = (id: string, from: P, to: P, extra: Partial<Extract<DiagramItem, { kind: 'line' }>> = {}) => {
    points[n(`${id}-a`)] = from;
    points[n(`${id}-b`)] = to;
    const { group, ...rest } = extra;
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), weight: 3, ...rest, ...(group ? { group: n(group) } : {}) });
  };
  label('dv', [-0.8, 0], big(o.divisor), { tone: 'adj', place: 'left' });
  [...o.dividend].forEach((d, i) => label(`dd${i}`, [X(i), 0], big(d), { group: 'dividend' }));
  label('ddp', [xPoint, 0], big('.'), { group: 'dividend' });
  [...o.quotient].forEach((d, i) => d.trim() && label(`q${i}`, [X(i), top], big(d), { tone: 'good' }));
  label('qp', [xPoint, top], big('.'), { tone: 'good' });
  line('bar', [-0.5, bar], [X(len - 1) + 0.55, bar], { group: 'bracket' });
  const hook: string[] = [];
  for (let k = 0; k <= 10; k++) {
    const t = k / 10;
    points[n(`hook${k}`)] = [-0.5 + 0.2 * Math.sin(Math.PI * t), bar - (bar + 0.62) * t];
    hook.push(n(`hook${k}`));
  }
  items.push({ kind: 'curve', id: n('hook'), points: hook, weight: 3, group: n('bracket') });
  o.steps.forEach((s, si) => {
    const yp = -(2 * si + 1) * R;
    const yr = yp - R;
    const start = s.at - s.prod.length + 1;
    [...s.prod].forEach((d, j) => label(`s${si}-p${j}`, [X(start + j), yp], big(d), { group: `s${si}-prod` }));
    label(`s${si}-minus`, [X(start) - 0.8, yp], big('-'), { group: `s${si}-prod` });
    line(`s${si}-rule`, [X(start) - 1.15, yp - R / 2], [X(s.at) + 0.45, yp - R / 2], { weight: 2.5 });
    const diff = s.diff ?? '';
    [...diff].forEach((d, j) => label(`s${si}-d${j}`, [X(s.at - diff.length + 1 + j), yr], big(d), { group: `s${si}-diff` }));
    if (s.down) {
      label(`s${si}-down`, [X(s.at + 1), yr], big(o.dividend[s.at + 1]), { tone: 'theta' });
      line(`s${si}-arrow`, [X(s.at + 1), -0.5], [X(s.at + 1), yr + 0.55], { tone: 'theta', dashed: true, weight: 2.5, arrow: true });
    }
  });
  return { points, items };
}

/** Point names round a circle, for a dot drawn as a small filled region. */
function disc(points: Record<string, P>, key: string, c: P, r: number, steps = 16): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
}

/** Point names round a rectangle with rounded corners, from (x0, y0) to (x1, y1). */
function roundRect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number, r: number): string[] {
  const names: string[] = [];
  const corners: [number, number, number][] = [
    [x1 - r, y1 - r, 0],
    [x0 + r, y1 - r, Math.PI / 2],
    [x0 + r, y0 + r, Math.PI],
    [x1 - r, y0 + r, (3 * Math.PI) / 2],
  ];
  corners.forEach(([cx, cy, from], k) => {
    for (let i = 0; i <= 6; i++) {
      const a = from + (Math.PI / 2) * (i / 6);
      points[`${key}${k}-${i}`] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      names.push(`${key}${k}-${i}`);
    }
  });
  return names;
}

/**
 * `groups` equal groups of `size` dots, side by side (in rows of `perRow` groups), each group a
 * block of dots `cols` wide inside a rounded ring. `tones` colours each group's dots (a muted
 * group is one not taken), and `labels` are written under the groups.
 *
 * Parts: each group `g<i>` (a group: its dots and its ring) and each label `lab<i>` (group
 * `labels`).
 */
export function dotGroups(o: { name?: string; groups: number; size: number; cols?: number; perRow?: number; tones?: DiagramTone[]; tone?: DiagramTone; labels?: string[] }): Part {
  const n = namer(o.name);
  const cols = o.cols ?? Math.min(o.size, 3);
  const rows = Math.ceil(o.size / cols);
  const gap = 0.62;
  const gw = cols * gap + 0.5;
  const gh = rows * gap + 0.5;
  const perRow = o.perRow ?? o.groups;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.groups; i++) {
    const gx = (i % perRow) * (gw + 0.45);
    const gy = -Math.floor(i / perRow) * (gh + (o.labels ? 1.1 : 0.45));
    const tone = o.tones?.[i] ?? o.tone ?? 'adj';
    for (let j = 0; j < o.size; j++) {
      const c: P = [gx + 0.25 + gap * (j % cols) + gap / 2, gy - 0.25 - gap * Math.floor(j / cols) - gap / 2];
      items.push({ kind: 'region', id: n(`g${i}-d${j}`), points: disc(points, n(`g${i}-d${j}-`), c, 0.21), tone, shade: tone === 'muted' ? 0.5 : 0.9, group: n(`g${i}`) });
    }
    items.push({ kind: 'curve', id: n(`g${i}-ring`), points: roundRect(points, n(`g${i}-r`), gx, gy - gh, gx + gw, gy, 0.28), closed: true, tone: tone === 'muted' ? 'muted' : tone, weight: 2.5, group: n(`g${i}`) });
    if (o.labels?.[i]) {
      points[n(`lab${i}`)] = [gx + gw / 2, gy - gh - 0.12];
      items.push({ kind: 'label', id: n(`lab${i}`), at: n(`lab${i}`), tex: o.labels[i], tone: 'ink', place: 'below', group: n('labels') });
    }
  }
  return { points, items };
}
