/**
 * Figures for the multiplying and dividing videos (Grade 5, unit 4), drawn as diagrams so that
 * each written digit appears as the narrator reaches it: column multiplication with carried
 * digits, long division laid out step by step, and equal groups of dots in rings. Built only from
 * standard diagram parts (labels, lines, curves and regions), so each goes into a diagram with
 * `figure` like the figures in `src/video/`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Written digits are set large, like numbers worked by hand. */
export const big = (s: string) => `\\Large ${s}`;

/** Diagram units between rows of written digits (a column is one unit wide). */
export const ROW = 1.3;

/**
 * The height, in stage pixels, that draws a figure at `px` pixels a unit (the size its written
 * digits are designed for), as long as its column is wide enough. A diagram keeps 100 pixels
 * round the drawing for labels.
 */
export function heightFor(part: Part, px = 44): number {
  const ys = Object.values(part.points).map((p) => p[1]);
  return Math.round(100 + (Math.max(...ys) - Math.min(...ys)) * px);
}

/** Collects points and parts, with every id and point name prefixed by the figure's name. */
function writer(name: string | undefined) {
  const n = namer(name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  return {
    n,
    points,
    items,
    label(id: string, at: P, tex: string, o: { tone?: DiagramTone; group?: string; place?: Place } = {}) {
      points[n(id)] = at;
      items.push({ kind: 'label', id: n(id), at: n(id), tex, place: o.place ?? 'center', ...(o.tone ? { tone: o.tone } : {}), ...(o.group ? { group: n(o.group) } : {}) });
    },
    line(id: string, from: P, to: P, extra: Partial<Extract<DiagramItem, { kind: 'line' }>> = {}) {
      points[n(`${id}-a`)] = from;
      points[n(`${id}-b`)] = to;
      const { group, ...rest } = extra;
      items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), weight: 3, ...rest, ...(group ? { group: n(group) } : {}) });
    },
  };
}

/**
 * Column multiplication, as written by hand: the top number, the bottom number with a times sign,
 * a rule, then one row for each digit of the bottom number (its partial product), and, with two
 * or more rows, a plus sign, a second rule and the answer. Carried digits sit small and yellow
 * above the top number. A row for the tens digit starts with a zero in the ones place, drawn in
 * green so it stands out.
 *
 * Columns count from the ones (0). Parts: the digits `top<c>` (group `top`), `bot<c>` and the
 * sign `times` (group `bottom`), `rule`; each row's digits `r<k>-<c>` (group `r<k>`, with the
 * `plus` sign in the last row's group) and its note `note<k>`; `rule2` and the answer's digits
 * `ans<c>` (group `ans`); and the carried digits `k<k>-<c>`, carried while working out row k
 * (group `k<k>`).
 */
export function columnMultiply(o: {
  name?: string;
  top: string;
  bottom: string;
  /** The rows under the first rule: the partial products, from the ones digit up. */
  rows: string[];
  /** The sum of the rows, when there are two or more. */
  answer?: string;
  /** Carried digits for each row: carries[k][c] is the digit carried into column c while working out row k. */
  carries?: Record<number, string>[];
  /** A note beside each row, such as '\\leftarrow 347 \\times 6'. */
  notes?: (string | undefined)[];
  /** The colour of the last row when it is the answer (one row only). */
  rowTone?: DiagramTone;
  /** The colour of the answer (green by default; red for a wrong answer). */
  answerTone?: DiagramTone;
  /** Colour each row's placeholder zeros green (true by default; false for work that left them out). */
  placeholders?: boolean;
}): Part {
  const w = writer(o.name);
  const wide = Math.max(o.top.length, o.bottom.length, ...o.rows.map((r) => r.length), (o.answer ?? '').length);
  const x = (c: number) => -c;
  const digits = (s: string, y: number, key: string, group: string, tone: (c: number) => DiagramTone | undefined = () => undefined) =>
    [...s].reverse().forEach((d, c) => w.label(`${key}${c}`, [x(c), y], big(d), { tone: tone(c), group }));
  (o.carries ?? []).forEach((set, k) =>
    Object.entries(set).forEach(([c, d]) => w.label(`k${k}-${c}`, [x(Number(c)) - 0.05, 0.85], d, { tone: 'theta', group: `k${k}` })),
  );
  digits(o.top, 0, 'top', 'top');
  digits(o.bottom, -ROW, 'bot', 'bottom');
  w.label('times', [x(wide) + 0.1, -ROW], big('\\times'), { group: 'bottom' });
  w.line('rule', [x(wide) - 0.45, -1.5 * ROW], [0.55, -1.5 * ROW]);
  const many = o.rows.length > 1;
  o.rows.forEach((s, k) => {
    const y = -(2 + k) * ROW;
    digits(s, y, `r${k}-`, `r${k}`, (c) => (c < k && o.placeholders !== false ? 'good' : many ? undefined : o.rowTone));
    if (o.notes?.[k]) w.label(`note${k}`, [0.75, y], o.notes[k]!, { tone: 'muted', place: 'right' });
    if (many && k === o.rows.length - 1) w.label('plus', [x(wide) + 0.1, y], big('+'), { group: `r${k}` });
  });
  if (many && o.answer) {
    const y = -(2 + o.rows.length) * ROW;
    w.line('rule2', [x(wide) - 0.45, y + 0.5 * ROW], [0.55, y + 0.5 * ROW]);
    digits(o.answer, y, 'ans', 'ans', () => o.answerTone ?? 'good');
  }
  return { points: w.points, items: w.items };
}

/** One step of a long division: the product written under the digits it is taken from, and what is left. */
export interface DivStep {
  /** The divisor times the new quotient digit. */
  prod: string;
  /** The place in the dividend (0 is its first digit) that the product's last digit sits under. */
  at: number;
  /** What is left after subtracting (written under the product); empty when nothing is written. */
  diff?: string;
  /** Bring down the next digit of the dividend beside what is left. */
  down?: boolean;
}

/**
 * Long division, as written by hand: the divisor outside the bracket (blue), the dividend inside,
 * the quotient on top (green) with any remainder after an R (orange), and under the dividend one
 * product, rule and difference for each step. A digit brought down is yellow, with a dashed arrow
 * from the digit it comes from (hide the arrow once it has been used).
 *
 * Parts: `dv` (the divisor), `bracket` (a group: the hook and the bar), the dividend's digits
 * `dd<i>` (group `dividend`), the quotient's digits `q<i>` (group `quotient`), `rem`; and for
 * step s: the product `s<s>-prod` (a group: its digits and minus sign), the rule `s<s>-rule`, the
 * difference `s<s>-diff` (a group), and the digit brought down `s<s>-down` with its arrow
 * `s<s>-arrow`.
 */
export function longDivision(o: {
  name?: string;
  divisor: string;
  dividend: string;
  /** One character for each digit of the dividend, with a space where no digit goes (' 52'). */
  quotient: string;
  remainder?: string;
  steps: DivStep[];
  /** Units between rows (1.2 by default). */
  row?: number;
}): Part {
  const w = writer(o.name);
  const R = o.row ?? 1.2;
  const len = o.dividend.length;
  const top = 1.38;
  const bar = 0.66;
  w.label('dv', [-0.8, 0], big(o.divisor), { tone: 'adj', place: 'left' });
  [...o.dividend].forEach((d, i) => w.label(`dd${i}`, [i, 0], big(d), { group: 'dividend' }));
  [...o.quotient].forEach((d, i) => d.trim() && w.label(`q${i}`, [i, top], big(d), { tone: 'good', group: 'quotient' }));
  if (o.remainder) w.label('rem', [len - 1 + 0.7, top], big(`\\text{R}\\,${o.remainder}`), { tone: 'opp', place: 'right' });
  // The bracket: a bar over the dividend and a hook down its left side, like ")".
  w.line('bar', [-0.5, bar], [len - 0.45, bar], { group: 'bracket' });
  const hook: string[] = [];
  for (let k = 0; k <= 10; k++) {
    const t = k / 10;
    w.points[w.n(`hook${k}`)] = [-0.5 + 0.2 * Math.sin(Math.PI * t), bar - (bar + 0.62) * t];
    hook.push(w.n(`hook${k}`));
  }
  w.items.push({ kind: 'curve', id: w.n('hook'), points: hook, weight: 3, group: w.n('bracket') });
  o.steps.forEach((s, si) => {
    const yp = -(2 * si + 1) * R;
    const yr = yp - R;
    const start = s.at - s.prod.length + 1;
    [...s.prod].forEach((d, j) => w.label(`s${si}-p${j}`, [start + j, yp], big(d), { group: `s${si}-prod` }));
    w.label(`s${si}-minus`, [start - 0.8, yp], big('-'), { group: `s${si}-prod` });
    w.line(`s${si}-rule`, [start - 1.15, yp - R / 2], [s.at + 0.45, yp - R / 2], { weight: 2.5 });
    const diff = s.diff ?? '';
    [...diff].forEach((d, j) => w.label(`s${si}-d${j}`, [s.at - diff.length + 1 + j, yr], big(d), { group: `s${si}-diff` }));
    if (s.down) {
      w.label(`s${si}-down`, [s.at + 1, yr], big(o.dividend[s.at + 1]), { tone: 'theta' });
      w.line(`s${si}-arrow`, [s.at + 1, -0.5], [s.at + 1, yr + 0.55], { tone: 'theta', dashed: true, weight: 2.5, arrow: true });
    }
  });
  return { points: w.points, items: w.items };
}

/** Point names round a circle, for a dot drawn as a small filled region. */
function disc(points: Record<string, P>, key: string, c: P, r: number, steps = 14): string[] {
  const names: string[] = [];
  for (let i = 0; i < steps; i++) {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    names.push(`${key}${i}`);
  }
  return names;
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
 * Equal groups of dots, each group a block of dots `cols` wide inside a ring: apples in bags,
 * students in vans, markers in boxes. `extra` dots are left over, outside any full group; with
 * `extraRing` they get a dashed ring of their own (one more van for the students left over).
 * `labels` are written under the groups (one more label goes under the dots left over).
 *
 * Parts: each group `g<i>` (a group: its dots `g<i>-d<j>` and its ring `g<i>-ring`), `extra` (a
 * group: the dots left over and their ring), and each label `lab<i>` (group `labels`).
 */
export function dotGroups(o: {
  name?: string;
  groups: number;
  size: number;
  extra?: number;
  cols?: number;
  /** Groups in each row of groups (all of them by default). */
  perRow?: number;
  tone?: DiagramTone;
  extraRing?: boolean;
  labels?: string[];
  at?: P;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const cols = o.cols ?? Math.min(o.size, 3);
  const rows = Math.ceil(o.size / cols);
  const gap = 0.62;
  const gw = cols * gap + 0.5;
  const gh = rows * gap + 0.5;
  const perRow = o.perRow ?? o.groups + (o.extra ? 1 : 0);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const block = (key: string, count: number, gx: number, gy: number, tone: DiagramTone, ring: 'solid' | 'dashed' | 'none', group: string) => {
    for (let j = 0; j < count; j++) {
      const c: P = [gx + 0.25 + gap * (j % cols) + gap / 2, gy - 0.25 - gap * Math.floor(j / cols) - gap / 2];
      items.push({ kind: 'region', id: n(`${key}-d${j}`), points: disc(points, n(`${key}-d${j}-`), c, 0.21), tone, shade: 0.9, group: n(group) });
    }
    if (ring !== 'none') {
      items.push({ kind: 'curve', id: n(`${key}-ring`), points: roundRect(points, n(`${key}-r`), gx, gy - gh, gx + gw, gy, 0.28), closed: true, tone: ring === 'dashed' ? 'theta' : 'muted', dashed: ring === 'dashed', weight: 2.5, group: n(group) });
    }
  };
  const slot = (i: number): P => [x0 + (i % perRow) * (gw + 0.45), y0 - Math.floor(i / perRow) * (gh + (o.labels ? 1.1 : 0.45))];
  for (let i = 0; i < o.groups; i++) {
    const [gx, gy] = slot(i);
    block(`g${i}`, o.size, gx, gy, o.tone ?? 'adj', 'solid', `g${i}`);
    if (o.labels?.[i]) {
      points[n(`lab${i}`)] = [gx + gw / 2, gy - gh - 0.12];
      items.push({ kind: 'label', id: n(`lab${i}`), at: n(`lab${i}`), tex: o.labels[i], tone: 'muted', place: 'below', group: n('labels') });
    }
  }
  if (o.extra) {
    const [gx, gy] = slot(o.groups);
    block('extra', o.extra, gx, gy, 'opp', o.extraRing ? 'dashed' : 'none', 'extra');
    if (o.labels?.[o.groups]) {
      points[n('lab-extra')] = [gx + gw / 2, gy - gh - 0.12];
      items.push({ kind: 'label', id: n('lab-extra'), at: n('lab-extra'), tex: o.labels[o.groups], tone: 'theta', place: 'below', group: n('extra') });
    }
    // Keep the slot's full size in the drawing even when its dots fill only part of it.
    points[n('extra-corner')] = [gx + gw, gy - gh];
  }
  return { points, items };
}
