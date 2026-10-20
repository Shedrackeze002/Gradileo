/**
 * Figures for the operations and problem-solving videos (Grade 6, unit 2): long division with a
 * decimal point in the dividend and the quotient. Whole-number long division, column multiplication
 * and column addition and subtraction are the Grade 5 figures (`m5-4-figures.ts`,
 * `m5-2-figures.ts`), used as they are. Built only from standard diagram parts (labels, lines and
 * curves), so it goes into a diagram with `figure` like the figures in `src/video/`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { big, type DivStep } from '@/content/math5/videos/lib/m5-4-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * Long division with decimals, as written by hand: the divisor outside the bracket (blue), the
 * dividend inside with its decimal point, the quotient on top (green) with its point right above
 * the dividend's, and under the dividend one product, rule and difference for each step. The
 * digits sit one unit apart and each point sits in the gap between two digits, so places line up
 * as in the Grade 5 `longDivision`. A digit brought down is yellow, with a dashed arrow from the
 * digit it comes from.
 *
 * Steps count places by the dividend's digits, ignoring the point (in '7.82', the 8 is digit 1).
 * Zeros written after the dividend to keep dividing (from digit `zerosFrom` on) are their own
 * group, `zeros`, with the point when the dividend had none before, so they can appear later.
 *
 * Parts: `dv` (the divisor), `bracket` (a group), the dividend's digits `dd<i>` and point `dp`
 * (group `dividend`), the added zeros `dd<i>` and point (group `zeros`), the quotient's digits
 * `q<i>` and point `qp` (group `quotient`), `rem`; and for step s: the product `s<s>-prod` (a
 * group: its digits and minus sign), the rule `s<s>-rule`, the difference `s<s>-diff` (a group),
 * and the digit brought down `s<s>-down` with its arrow `s<s>-arrow`.
 */
export function decimalDivision(o: {
  name?: string;
  divisor: string;
  /** The dividend with its point, such as '7.82' or '351.00'. */
  dividend: string;
  /** One character for each digit of the dividend (no point), a space where no digit goes: '046'. */
  quotient: string;
  /** The first digit that is a zero written on to keep dividing; it and the later digits are the group `zeros`. */
  zerosFrom?: number;
  /** Write the point in the group `zeros` (a whole-number dividend that gets a point to keep dividing). */
  pointLater?: boolean;
  remainder?: string;
  steps: DivStep[];
  row?: number;
}): Part {
  const n = namer(o.name);
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
  const R = o.row ?? 1.2;
  const at = o.dividend.indexOf('.');
  const digits = o.dividend.replace('.', '');
  // The point sits after digit at − 1, so in the gap before digit `at`.
  const pointX = at - 0.5;
  const len = digits.length;
  const top = 1.38;
  const bar = 0.66;
  label('dv', [-0.8, 0], big(o.divisor), { tone: 'adj', place: 'left' });
  [...digits].forEach((d, i) => label(`dd${i}`, [i, 0], big(d), { group: o.zerosFrom !== undefined && i >= o.zerosFrom ? 'zeros' : 'dividend' }));
  if (at >= 0) {
    label('dp', [pointX, -0.22], big('.'), { group: o.pointLater ? 'zeros' : 'dividend' });
    label('qp', [pointX, top - 0.22], big('.'), { tone: 'good', group: 'quotient' });
  }
  [...o.quotient].forEach((d, i) => d.trim() && label(`q${i}`, [i, top], big(d), { tone: 'good', group: 'quotient' }));
  if (o.remainder) label('rem', [len - 1 + 0.7, top], big(`\\text{R}\\,${o.remainder}`), { tone: 'opp', place: 'right' });
  line('bar', [-0.5, bar], [len - 0.45, bar], { group: 'bracket' });
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
    [...s.prod].forEach((d, j) => label(`s${si}-p${j}`, [start + j, yp], big(d), { group: `s${si}-prod` }));
    label(`s${si}-minus`, [start - 0.8, yp], big('-'), { group: `s${si}-prod` });
    line(`s${si}-rule`, [start - 1.15, yp - R / 2], [s.at + 0.45, yp - R / 2], { weight: 2.5 });
    const diff = s.diff ?? '';
    [...diff].forEach((d, j) => label(`s${si}-d${j}`, [s.at - diff.length + 1 + j, yr], big(d), { group: `s${si}-diff` }));
    if (s.down) {
      label(`s${si}-down`, [s.at + 1, yr], big(digits[s.at + 1]), { tone: 'theta' });
      line(`s${si}-arrow`, [s.at + 1, -0.5], [s.at + 1, yr + 0.55], { tone: 'theta', dashed: true, weight: 2.5, arrow: true });
    }
  });
  return { points, items };
}
