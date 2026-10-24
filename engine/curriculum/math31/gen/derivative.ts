/** Math 31 Unit 3 — The Derivative (D1). */
import { mc, numPart, part, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fracLatex, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function tn(x: number, dfrac = false): string {
  if (Number.isInteger(x)) return fmt(x);
  const f = toFrac(x, 400);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}
const par = (x: number) => (x < 0 ? `(${tn(x)})` : tn(x));
/** A polynomial from [coefficient, body] pairs, skipping zero terms. */
function poly(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : tn(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}
/** Plain-text polynomial for typed answers (decimal coefficients). */
function polyText(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : fmt(abs, 6);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}
const pm = (n: number) => (n < 0 ? `- ${tn(-n)}` : `+ ${tn(n)}`);
const cf = (n: number) => (n === 1 ? '' : n === -1 ? '-' : tn(n));
const quadTex = (a: number, b: number, c: number, v = 'x') => poly([[a, `${v}^2`], [b, v], [c, '']]);
const LIMH = '\\lim_{h \\to 0}';

/** True when v is not close to a rounding boundary at `dp` decimals. */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.1;
}
/** A numeric part, rounded only when the exact value needs more than two decimal places. */
function ratePart(v: number, suffix: string, label?: string) {
  const exact = Math.abs(v * 100 - Math.round(v * 100)) < 1e-9;
  return { part: numPart(v, exact ? { suffix, label, display: 'decimal' } : { suffix, label, decimals: 2 }), note: exact ? '' : ' Round to the nearest hundredth.' };
}

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];

type Pt = [number, number];
const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;
function sample(f: (x: number) => number, a: number, b: number, n = 80): Pt[] {
  const pts: Pt[] = [];
  for (let k = 0; k <= n; k++) {
    const x = a + ((b - a) * k) / n;
    pts.push([r3(x), r3(f(x))]);
  }
  return pts;
}
/** Keep only the samples inside the grid's y-range (the curves used here leave the window at most once at each end). */
function clipY(pts: Pt[], g: GridSpec): Pt[] {
  return pts.filter(([, y]) => y >= g.yMin && y <= g.yMax);
}

// ---------------------------------------------------------------------------
// 3.1 — Average and instantaneous rates of change
// ---------------------------------------------------------------------------

const TABLE_CONTEXTS = [
  { what: 'The temperature in Ashford', q: 'Temperature (°C)', t: 'Hours after 6:00 a.m.', unit: '°C/h', start: [-8, -2, 4, 10], step: [1, 2], inc: [-1, 4], word: 'temperature', span: (a: number, b: number) => `from ${a} to ${b} hours after 6:00 a.m.`, t0: 0 },
  { what: 'The distance a cyclist has travelled on a valley bike trail', q: 'Distance (km)', t: 'Time (h)', unit: 'km/h', start: [0], step: [1], inc: [12, 26], word: 'distance', span: (a: number, b: number) => `from $t = ${a}$ h to $t = ${b}$ h`, t0: 0 },
  { what: 'The volume of water in a rain barrel', q: 'Volume (L)', t: 'Time (min)', unit: 'L/min', start: [20, 35, 50], step: [5, 10], inc: [3, 15], word: 'volume', span: (a: number, b: number) => `from $t = ${a}$ min to $t = ${b}$ min`, t0: 0 },
  { what: 'The height of a sunflower', q: 'Height (cm)', t: 'Week', unit: 'cm/week', start: [8, 12, 15], step: [1, 2], inc: [4, 18], word: 'height', span: (a: number, b: number) => `from week ${a} to week ${b}`, t0: 1 },
  { what: 'The number of downloads of a new app', q: 'Downloads (thousands)', t: 'Day', unit: 'thousand/day', start: [0, 2, 5], step: [1, 2], inc: [1, 9], word: 'number of downloads', span: (a: number, b: number) => `from day ${a} to day ${b}`, t0: 1 },
];

const MODELS = [
  { name: 'h', what: 'A ball is thrown upward. Its height, in metres, after $t$ seconds is', unit: 'm/s', a: -4.9, b: [12, 14.7, 19.6, 24.5], c: [1, 1.5, 2, 0], word: 'average velocity', t: [0, 0.5, 1, 1.5, 2, 2.5] },
  { name: 'V', what: 'Water drains from a tank. The volume, in litres, after $t$ minutes is', unit: 'L/min', a: 0.5, b: [-20, -24, -30], c: [400, 500, 600], word: 'average rate of change of the volume', t: [0, 2, 4, 5, 6, 10] },
  { name: 'P', what: 'The population of a bacteria culture, in thousands, after $t$ hours is', unit: 'thousand per hour', a: 0.3, b: [2, 4, 5], c: [10, 20, 25], word: 'average rate of change of the population', t: [0, 1, 2, 3, 4, 5, 6] },
  { name: 's', what: 'A car accelerates from a stop sign. The distance it has travelled, in metres, after $t$ seconds is', unit: 'm/s', a: 1.5, b: [0, 2, 3], c: [0], word: 'average velocity', t: [0, 1, 2, 4, 5, 6] },
] as const;

const CALC_FNS: Array<{ tex: string; f: (x: number) => number; a: number[] }> = [
  { tex: '\\sqrt{x}', f: Math.sqrt, a: [2, 3, 5, 9] },
  { tex: '\\ln x', f: Math.log, a: [2, 3, 4, 5] },
  { tex: '2^x', f: (x) => 2 ** x, a: [1, 2, 3] },
  { tex: 'e^{0.5x}', f: (x) => Math.exp(0.5 * x), a: [1, 2, 3] },
  { tex: '\\dfrac{12}{x}', f: (x) => 12 / x, a: [2, 3, 4] },
  { tex: '\\sin x', f: Math.sin, a: [0.5, 1, 2] },
];

const avgRate = skill({
  id: 'm31-average-rate',
  name: 'Average and instantaneous rates of change',
  description: 'Find average rates of change and secant slopes, and estimate instantaneous rates of change and tangent slopes from shrinking intervals.',
  outcomes: ['D1'],
  lessonId: 'm31-3-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['formula', 'formula', 'table'] as const)
        : d === 2
          ? rng.pick(['model', 'secantGraph', 'hTable', 'hTable'] as const)
          : rng.pick(['secantH', 'calcEstimate', 'avgSolve'] as const);
    const avgHint = 'Average rate of change on $[a, b]$ $= \\dfrac{f(b) - f(a)}{b - a}$, the slope of the secant line through the two points.';

    if (kind === 'formula') {
      const cubic = rng.chance(0.3);
      const [a, b, c] = cubic ? [rng.pick([1, -1, 2]), rng.int(-6, 6), rng.int(-5, 5)] : [rng.nonZero(-3, 4), rng.int(-6, 6), rng.int(-8, 8)];
      const f = (x: number) => (cubic ? a * x ** 3 + b * x + c : a * x * x + b * x + c);
      const fx = cubic ? poly([[a, 'x^3'], [b, 'x'], [c, '']]) : quadTex(a, b, c);
      const p = rng.int(-3, 2);
      const q = p + rng.pick([1, 2, 3, 4]);
      const v = (f(q) - f(p)) / (q - p);
      return {
        prompt: `Find the average rate of change of $f(x) = ${fx}$ on the interval $[${p}, ${q}]$.`,
        parts: [numPart(v)],
        hints: [avgHint, `Find $f(${q})$ and $f(${p})$ first.`],
        solution: [
          `$f(${q}) = ${f(q)}$ and $f(${p}) = ${f(p)}$`,
          `Average rate of change $= \\dfrac{f(${q}) - f(${p})}{${q} - ${par(p)}} = \\dfrac{${f(q)} - ${par(f(p))}}{${q - p}} = \\dfrac{${f(q) - f(p)}}{${q - p}}$`,
          `The average rate of change is $${tn(v)}$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'table') {
      const c = rng.pick(TABLE_CONTEXTS);
      const step = rng.pick(c.step);
      const times = [0, 1, 2, 3, 4].map((i) => c.t0 + i * step);
      const vals: number[] = [rng.pick(c.start)];
      for (let i = 1; i < 5; i++) vals.push(vals[i - 1] + rng.int(c.inc[0], c.inc[1]) * (step > 2 ? 1 : step));
      const [i, j] = retry(() => rng.sample([0, 1, 2, 3, 4], 2).sort((p, q) => p - q), ([p, q]) => q - p >= 2 && vals[q] !== vals[p]);
      const v = (vals[j] - vals[i]) / (times[j] - times[i]);
      const rp = ratePart(v, c.unit);
      return {
        prompt: `${c.what} is shown in the table. Find the average rate of change of the ${c.word} ${c.span(times[i], times[j])}.${rp.note}`,
        figure: { type: 'table', headers: [c.t, c.q], rows: times.map((t, k) => [fmt(t), fmt(vals[k])]) },
        parts: [rp.part],
        hints: [avgHint, `Divide the change in the ${c.word} by the change in time.`],
        solution: [
          `Change in ${c.word}: $${vals[j]} - ${par(vals[i])} = ${vals[j] - vals[i]}$`,
          `Change in time: $${times[j]} - ${times[i]} = ${times[j] - times[i]}$`,
          `Average rate of change $= \\dfrac{${vals[j] - vals[i]}}{${times[j] - times[i]}} ${rp.note ? '\\approx' : '='} ${rp.note ? fmtFixed(v, 2) : fmt(v)}$ ${c.unit}`,
        ],
      };
    }

    if (kind === 'model') {
      const m = rng.pick(MODELS);
      const b = rng.pick(m.b as readonly number[]);
      const c = rng.pick(m.c as readonly number[]);
      const f = (t: number) => m.a * t * t + b * t + c;
      const [t1, t2] = retry(() => rng.sample(m.t as readonly number[], 2).sort((p, q) => p - q), ([p, q]) => f(q) >= 0 && f(p) >= 0 && q - p <= 4 && Math.abs(f(q) - f(p)) > 1e-9);
      const v = (f(t2) - f(t1)) / (t2 - t1);
      const rp = ratePart(v, m.unit);
      const ft = polyText([[m.a, 't^2'], [b, 't'], [c, '']]);
      return {
        prompt: `${m.what} $${m.name}(t) = ${ft}$. Find the ${m.word} between $t = ${fmt(t1)}$ and $t = ${fmt(t2)}$.${rp.note}`,
        parts: [rp.part],
        hints: [avgHint, `Evaluate $${m.name}(${fmt(t2)})$ and $${m.name}(${fmt(t1)})$, then divide the change by $${fmt(t2)} - ${fmt(t1)}$.`],
        solution: [
          `$${m.name}(${fmt(t2)}) = ${fmt(f(t2), 4)}$ and $${m.name}(${fmt(t1)}) = ${fmt(f(t1), 4)}$`,
          `$\\dfrac{${m.name}(${fmt(t2)}) - ${m.name}(${fmt(t1)})}{${fmt(t2)} - ${fmt(t1)}} = \\dfrac{${fmt(f(t2) - f(t1), 4)}}{${fmt(t2 - t1)}} ${rp.note ? '\\approx' : '='} ${rp.note ? fmtFixed(v, 2) : fmt(v, 4)}$`,
          `The ${m.word} is ${rp.note ? 'about ' : ''}${rp.note ? fmtFixed(v, 2) : fmt(v, 4)} ${m.unit}.`,
        ],
      };
    }

    if (kind === 'secantGraph') {
      const { k, h, m, x1, x2 } = retry(
        () => {
          const k = rng.pick([0.5, -0.5, 1, -1]);
          const h = rng.int(-2, 2);
          const m = k > 0 ? rng.int(-4, -1) : rng.int(1, 4);
          const [x1, x2] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 2).sort((p, q) => p - q);
          return { k, h, m, x1, x2 };
        },
        (o) => {
          const y = (x: number) => o.k * (x - o.h) ** 2 + o.m;
          return [o.x1, o.x2].every((x) => Number.isInteger(y(x)) && Math.abs(y(x)) <= 5) && o.x2 - o.x1 >= 2 && y(o.x1) !== y(o.x2);
        },
      );
      const f = (x: number) => k * (x - h) ** 2 + m;
      const g: GridSpec = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
      const [y1, y2] = [f(x1), f(x2)];
      const slope = (y2 - y1) / (x2 - x1);
      const fig: PlaneFigure = {
        type: 'plane',
        grid: g,
        polylines: [{ points: clipY(sample(f, g.xMin, g.xMax, 120), g) }],
        lines: [{ through: [[x1, y1], [x2, y2]], dashed: true, color: 'accent' }],
        points: [
          { x: x1, y: y1, label: 'P' },
          { x: x2, y: y2, label: 'Q' },
        ],
      };
      return {
        prompt: `The graph of $y = f(x)$ is shown with the secant line through $P$ and $Q$ (dashed). Find the slope of the secant line, which is the average rate of change of $f$ from $x = ${x1}$ to $x = ${x2}$.`,
        figure: fig,
        parts: [numPart(slope, { label: 'Slope $=$' })],
        hints: ['Read the coordinates of $P$ and $Q$ from the grid.', 'Slope $= \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{y_Q - y_P}{x_Q - x_P}$.'],
        solution: [`$P(${x1}, ${y1})$ and $Q(${x2}, ${y2})$`, `Slope $= \\dfrac{${y2} - ${par(y1)}}{${x2} - ${par(x1)}} = \\dfrac{${y2 - y1}}{${x2 - x1}}$`, `The slope of the secant line is $${tn(slope)}$.`],
        calculator: false,
      };
    }

    if (kind === 'hTable') {
      const ctx = rng.chance(0.4);
      const a = rng.int(1, 4);
      let fx: string;
      let f: (x: number) => number;
      let deriv: number;
      if (rng.chance(0.5)) {
        const [p, q, r] = [rng.nonZero(-3, 4), rng.int(-6, 6), rng.int(-5, 5)];
        fx = quadTex(p, q, r, ctx ? 't' : 'x');
        f = (x) => p * x * x + q * x + r;
        deriv = 2 * p * a + q;
      } else {
        const [p, q] = [rng.pick([1, 2, -1]), rng.int(-5, 5)];
        fx = poly([[p, ctx ? 't^3' : 'x^3'], [q, ctx ? 't' : 'x']]);
        f = (x) => p * x ** 3 + q * x;
        deriv = 3 * p * a * a + q;
      }
      const hs = [0.1, 0.01, 0.001, -0.001, -0.01, -0.1];
      const rows = hs.map((h) => [fmt(h, 3), fmt((f(a + h) - f(a)) / h, 6)]);
      const name = rng.pick(NAMES);
      const prompt = ctx
        ? `${name} models the position of a remote-control car with $s(t) = ${fx}$, in metres, after $t$ seconds. The table shows the average velocity $\\dfrac{s(${a} + h) - s(${a})}{h}$ over short intervals starting at $t = ${a}$. Estimate the instantaneous velocity at $t = ${a}$.`
        : `For $f(x) = ${fx}$, the table shows the slope of the secant line from $x = ${a}$ to $x = ${a} + h$ for several values of $h$. Estimate the slope of the tangent line at $x = ${a}$.`;
      return {
        prompt,
        figure: { type: 'table', headers: ['$h$', ctx ? `$\\dfrac{s(${a} + h) - s(${a})}{h}$` : `$\\dfrac{f(${a} + h) - f(${a})}{h}$`], rows },
        parts: [numPart(deriv, ctx ? { label: 'Velocity $\\approx$', suffix: 'm/s' } : { label: 'Slope $\\approx$' })],
        hints: ['The instantaneous rate is the limit of the average rates as $h \\to 0$.', 'Look at what the values approach as $h$ gets closer to $0$ from both sides.'],
        solution: [
          `As $h \\to 0^{+}$ the values are ${rows.slice(0, 3).map((r) => `$${r[1]}$`).join(', ')}.`,
          `As $h \\to 0^{-}$ the values are ${rows.slice(3).reverse().map((r) => `$${r[1]}$`).join(', ')}.`,
          `Both approach $${deriv}$.`,
          ctx ? `The instantaneous velocity at $t = ${a}$ is about $${deriv}$ m/s.` : `The slope of the tangent at $x = ${a}$ is about $${deriv}$.`,
        ],
      };
    }

    if (kind === 'secantH') {
      const a = rng.nonZero(-3, 3);
      const b = rng.int(-6, 6);
      const c = rng.int(-6, 6);
      const p = rng.int(-2, 3);
      const fp = a * p * p + b * p + c;
      const m0 = 2 * a * p + b;
      const fx = quadTex(a, b, c);
      return {
        prompt: `Let $f(x) = ${fx}$.\n\n(a) Write the slope of the secant line from $x = ${p}$ to $x = ${p} + h$ as a simplified expression in $h$.\n\n(b) What does the slope approach as $h \\to 0$? This is the slope of the tangent line at $x = ${p}$.`,
        parts: [
          part({ kind: 'expression', expected: polyText([[a, 'h'], [m0, '']]), form: 'expanded' }, { label: '(a) Slope $=$' }),
          numPart(m0, { label: '(b) Tangent slope $=$' }),
        ],
        hints: [`The slope is $\\dfrac{f(${p} + h) - f(${p})}{h}$. Expand $f(${p} + h)$ first.`, 'After subtracting, factor $h$ out of the numerator and cancel it. For (b), let $h$ approach $0$.'],
        solution: [
          `$f(${p}) = ${fp}$`,
          `$f(${p} + h) = ${poly([[a, `(${p} + h)^2`], [b, `(${p} + h)`], [c, '']])} = ${poly([[a, 'h^2'], [m0, 'h'], [fp, '']])}$`,
          `$\\dfrac{f(${p} + h) - f(${p})}{h} = \\dfrac{${poly([[a, 'h^2'], [m0, 'h']])}}{h} = ${poly([[a, 'h'], [m0, '']])}$`,
          `(a) The secant slope is $${poly([[a, 'h'], [m0, '']])}$.`,
          `(b) As $h \\to 0$, $${poly([[a, 'h'], [m0, '']])} \\to ${m0}$. The tangent slope at $x = ${p}$ is $${m0}$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'calcEstimate') {
      const ctx = rng.chance(0.4);
      if (ctx) {
        const T0 = rng.pick([20, 21, 22]);
        const A = rng.pick([60, 65, 70, 75]);
        const k = rng.pick([0.04, 0.05, 0.06]);
        const { a } = retry(() => ({ a: rng.pick([5, 10, 15, 20]) }), (o) => {
          const v = (A * Math.exp(-k * (o.a + 0.01)) - A * Math.exp(-k * o.a)) / 0.01;
          return safeRound(v, 2);
        });
        const T = (t: number) => T0 + A * Math.exp(-k * t);
        const v = (T(a + 0.01) - T(a)) / 0.01;
        return {
          prompt: `A cup of tea cools in a kitchen. Its temperature, in degrees Celsius, after $t$ minutes is $T(t) = ${T0} + ${A}e^{-${fmt(k)}t}$. Estimate the instantaneous rate of change of the temperature at $t = ${a}$ min by finding the average rate of change from $t = ${a}$ to $t = ${fmt(a + 0.01)}$. Round to the nearest hundredth.`,
          parts: [numPart(v, { decimals: 2, suffix: '°C/min' })],
          hints: ['Average rate of change $= \\dfrac{T(b) - T(a)}{b - a}$. Keep all the decimals until the end.', 'A negative answer means the tea is cooling.'],
          solution: [
            `$T(${fmt(a + 0.01)}) \\approx ${fmt(T(a + 0.01), 6)}$ and $T(${a}) \\approx ${fmt(T(a), 6)}$`,
            `$\\dfrac{T(${fmt(a + 0.01)}) - T(${a})}{0.01} \\approx \\dfrac{${fmt(T(a + 0.01) - T(a), 6)}}{0.01} \\approx ${fmtFixed(v, 2)}$`,
            `At $t = ${a}$ min the tea is cooling at about $${fmtFixed(-v, 2)}$ °C per minute: the rate of change is about $${fmtFixed(v, 2)}$ °C/min.`,
          ],
        };
      }
      const F = rng.pick(CALC_FNS);
      const h = rng.pick([0.001, 0.01]);
      const dp = h === 0.001 ? 3 : 2;
      const a = retry(() => rng.pick(F.a), (x) => safeRound((F.f(x + h) - F.f(x)) / h, dp));
      const v = (F.f(a + h) - F.f(a)) / h;
      return {
        prompt: `Estimate the slope of the tangent to $f(x) = ${F.tex}$ at $x = ${fmt(a)}$ by finding the slope of the secant line from $x = ${fmt(a)}$ to $x = ${fmt(a + h, 3)}$. Round ${roundingPhrase(dp)}.${F.tex.includes('sin') ? ' (Use radians.)' : ''}`,
        parts: [numPart(v, { decimals: dp, label: 'Slope $\\approx$' })],
        hints: ['Secant slope $= \\dfrac{f(a + h) - f(a)}{h}$ with a small $h$.', 'Keep all the calculator digits until the final division, or the rounding error is much bigger than the answer’s precision.'],
        solution: [
          `$f(${fmt(a + h, 3)}) \\approx ${fmt(F.f(a + h), 7)}$ and $f(${fmt(a)}) \\approx ${fmt(F.f(a), 7)}$`,
          `Slope $\\approx \\dfrac{${fmt(F.f(a + h) - F.f(a), 7)}}{${fmt(h, 3)}} \\approx ${fmtFixed(v, dp)}$`,
          `The tangent slope at $x = ${fmt(a)}$ is approximately $${fmtFixed(v, dp)}$.`,
        ],
      };
    }

    // avgSolve: f(x) = a x^2 + c on [p, b]; the average rate is a(p + b). Find b.
    if (rng.chance(0.5)) {
      const T = rng.pick([1.5, 2, 2.5, 3, 3.5, 4, 5]);
      const t1 = rng.pick([0, 0, 1]);
      const v = 4.9 * (t1 + T);
      const name = rng.pick(NAMES);
      return {
        prompt: `${name} drops a stone from a bridge over a river. The distance it has fallen, in metres, after $t$ seconds is $d(t) = 4.9t^2$. For what time $T$ is the average velocity from $t = ${t1}$ to $t = T$ equal to $${fmt(v, 2)}$ m/s?`,
        parts: [numPart(T, { label: '$T =$', suffix: 's', display: 'decimal' })],
        hints: [`Write the average velocity as $\\dfrac{d(T) - d(${t1})}{T - ${t1}}$ and simplify.`, t1 === 0 ? '$\\dfrac{4.9T^2 - 0}{T} = 4.9T$. Set it equal to the given value.' : 'Factor the difference of squares: $4.9(T^2 - 1) = 4.9(T - 1)(T + 1)$.'],
        solution: [
          t1 === 0 ? `Average velocity $= \\dfrac{4.9T^2 - 0}{T - 0} = 4.9T$` : `Average velocity $= \\dfrac{4.9T^2 - 4.9}{T - 1} = \\dfrac{4.9(T - 1)(T + 1)}{T - 1} = 4.9(T + 1)$`,
          t1 === 0 ? `$4.9T = ${fmt(v, 2)}$, so $T = ${fmt(T)}$` : `$4.9(T + 1) = ${fmt(v, 2)}$, so $T + 1 = ${fmt(T + 1)}$ and $T = ${fmt(T)}$`,
          `$T = ${fmt(T)}$ s`,
        ],
        calculator: true,
      };
    }
    const a = rng.pick([1, 2, 3, -1, -2]);
    const c = rng.int(-5, 5);
    const p = rng.int(-2, 2);
    const b = retry(() => p + rng.int(2, 6), (v) => v + p !== 0);
    const bm = (r: number) => (r === 0 ? 'b' : `b ${pm(-r)}`);
    const avgTex = a === 1 ? bm(-p) : `${cf(a)}(${bm(-p)})`;
    const R = a * (p + b);
    return {
      prompt: `The average rate of change of $f(x) = ${quadTex(a, 0, c)}$ on the interval $[${p}, b]$ is $${R}$. Find $b$.`,
      parts: [numPart(b, { label: '$b =$' })],
      hints: [`Write $\\dfrac{f(b) - f(${p})}{${bm(p)}}$ and simplify: the constant cancels${p === 0 ? '' : `, and $b^2 - ${p * p}$ is a difference of squares`}.`, `The average rate simplifies to $${p === 0 ? `${cf(a)}b` : avgTex}$. Set it equal to $${R}$.`],
      solution: [
        p === 0
          ? `$\\dfrac{f(b) - f(0)}{b - 0} = \\dfrac{${cf(a)}b^2}{b} = ${cf(a)}b$`
          : `$\\dfrac{f(b) - f(${p})}{${bm(p)}} = \\dfrac{${cf(a)}b^2 ${pm(-a * p * p)}}{${bm(p)}} = \\dfrac{${cf(a)}(${bm(p)})(${bm(-p)})}{${bm(p)}} = ${avgTex}$`,
        p === 0 ? `$${cf(a)}b = ${R}$` : a === 1 ? `$${bm(-p)} = ${R}$` : `$${avgTex} = ${R}$, so $${bm(-p)} = ${R / a}$`,
        `$b = ${b}$`,
      ],
      calculator: false,
    };
  },
});

// ---------------------------------------------------------------------------
// 3.2 — The derivative from first principles
// ---------------------------------------------------------------------------

/** A "which line comes next" question about the limit definition. */
interface Step {
  fx: string;
  work: string;
  correct: string;
  wrong: string[];
  why: string[];
}

function nextStep(rng: Rng, stage: 'expand' | 'cancel' | 'root' | 'recip' | 'finish'): Step {
  if (stage === 'expand' || stage === 'cancel') {
    const a = rng.pick([1, 2, 3, -1, -2]);
    const b = rng.nonZero(-6, 6);
    const c = rng.int(-6, 6);
    const fx = quadTex(a, b, c);
    const num = poly([[2 * a, 'xh'], [a, 'h^2'], [b, 'h']]);
    if (stage === 'expand') {
      const fxh = poly([[a, '(x + h)^2'], [b, '(x + h)'], [c, '']]);
      return {
        fx,
        work: `f'(x) = ${LIMH} \\dfrac{\\left[${fxh}\\right] - \\left[${fx}\\right]}{h}`,
        correct: `$${LIMH} \\dfrac{${num}}{h}$`,
        wrong: [
          `$${LIMH} \\dfrac{${poly([[a, 'h^2'], [b, 'h']])}}{h}$`,
          c !== 0 ? `$${LIMH} \\dfrac{${poly([[2 * a, 'xh'], [a, 'h^2'], [b, 'h'], [2 * c, '']])}}{h}$` : `$${LIMH} \\dfrac{${poly([[2 * a, 'xh'], [a, 'h^2']])}}{h}$`,
          `$\\dfrac{0}{0}$, so $f'(x)$ does not exist`,
        ],
        why: [
          `Expand: $${fxh} = ${poly([[a, 'x^2'], [2 * a, 'xh'], [a, 'h^2'], [b, 'x'], [b, 'h'], [c, '']])}$.`,
          `Subtracting $${fx}$ cancels every term without $h$, leaving $${num}$.`,
          'Remember $(x + h)^2 = x^2 + 2xh + h^2$, not $x^2 + h^2$. Substituting $h = 0$ now gives $\\frac{0}{0}$, which only means more algebra is needed.',
        ],
      };
    }
    return {
      fx,
      work: `f'(x) = ${LIMH} \\dfrac{${num}}{h}`,
      correct: `$${LIMH} (${poly([[2 * a, 'x'], [a, 'h'], [b, '']])})$`,
      wrong: [
        `$${LIMH} (${poly([[2 * a, 'x'], [a, 'h^2'], [b, '']])})$`,
        `$${LIMH} (${poly([[2 * a, 'xh'], [a, 'h'], [b, '']])})$`,
        `$${LIMH} (${poly([[2 * a, 'x'], [a, ''], [b, '']])})$`,
      ],
      why: [`Every term in the numerator has a factor of $h$: $${num} = h(${poly([[2 * a, 'x'], [a, 'h'], [b, '']])})$.`, `Cancel $h$ (allowed, because $h \\ne 0$ inside the limit): $${LIMH} (${poly([[2 * a, 'x'], [a, 'h'], [b, '']])})$.`, `Taking the limit next gives $f'(x) = ${poly([[2 * a, 'x'], [b, '']])}$.`],
    };
  }
  if (stage === 'root') {
    const p = rng.int(0, 6);
    const inner = p === 0 ? 'x' : `x + ${p}`;
    const innerH = p === 0 ? 'x + h' : `x + h + ${p}`;
    const R1 = `\\sqrt{${innerH}}`;
    const R0 = `\\sqrt{${inner}}`;
    return {
      fx: R0,
      work: `f'(x) = ${LIMH} \\dfrac{${R1} - ${R0}}{h}`,
      correct: `$${LIMH} \\dfrac{(${innerH}) - (${inner})}{h\\left(${R1} + ${R0}\\right)}$`,
      wrong: [`$${LIMH} \\dfrac{\\sqrt{h}}{h}$`, `$${LIMH} \\dfrac{(${innerH}) - (${inner})}{h\\left(${R1} - ${R0}\\right)}$`, `$${LIMH} \\dfrac{(${innerH}) - (${inner})}{h}$`],
      why: [
        `Multiply the numerator and denominator by the conjugate $${R1} + ${R0}$.`,
        `The numerator becomes $(${R1})^2 - (${R0})^2 = (${innerH}) - (${inner})$; the denominator becomes $h(${R1} + ${R0})$.`,
        `Note that $\\sqrt{${innerH}} \\ne ${R0} + \\sqrt{h}$, and both the numerator and the denominator must be multiplied.`,
      ],
    };
  }
  if (stage === 'recip') {
    const k = rng.pick([1, 2, 3, 4, 5]);
    const p = rng.int(0, 5);
    const inner = p === 0 ? 'x' : `x + ${p}`;
    const innerH = p === 0 ? 'x + h' : `x + h + ${p}`;
    const kk = k === 1 ? '' : `${k}`;
    return {
      fx: `\\dfrac{${k}}{${inner}}`,
      work: `f'(x) = ${LIMH} \\dfrac{\\dfrac{${k}}{${innerH}} - \\dfrac{${k}}{${inner}}}{h}`,
      correct: `$${LIMH} \\dfrac{${kk}(${inner}) - ${kk}(${innerH})}{h(${innerH})(${inner})}$`,
      wrong: [
        `$${LIMH} \\dfrac{${kk}(${innerH}) - ${kk}(${inner})}{h(${innerH})(${inner})}$`,
        `$${LIMH} \\dfrac{${kk}(${inner}) - ${kk}(${innerH})}{(${innerH})(${inner})}$`,
        `$${LIMH} \\dfrac{${k} - ${k}}{h}$`,
      ],
      why: [
        `Combine the two fractions over the common denominator $(${innerH})(${inner})$: the numerator is $${kk}(${inner}) - ${kk}(${innerH})$ (in that order).`,
        'Dividing by $h$ puts an extra factor of $h$ in the denominator.',
        `Next, the numerator simplifies to $${-k}h$ and the $h$ cancels.`,
      ],
    };
  }
  // finish: the last step of the limit
  if (rng.chance(0.5)) {
    const k = rng.pick([1, 2, 3, 4, 6]);
    const p = rng.int(0, 5);
    const inner = p === 0 ? 'x' : `x + ${p}`;
    const innerH = p === 0 ? 'x + h' : `x + h + ${p}`;
    const sq = p === 0 ? 'x^2' : `(${inner})^2`;
    return {
      fx: `\\dfrac{${k}}{${inner}}`,
      work: `f'(x) = ${LIMH} \\dfrac{${-k}}{(${innerH})(${inner})}`,
      correct: `$f'(x) = -\\dfrac{${k}}{${sq}}$`,
      wrong: [`$f'(x) = \\dfrac{${k}}{${sq}}$`, `$f'(x) = -\\dfrac{${k}}{${inner}}$`, '$f\'(x) = 0$'],
      why: [`As $h \\to 0$, $${innerH} \\to ${inner}$.`, `So the denominator approaches $(${inner})(${inner}) = ${sq}$.`, `$f'(x) = -\\dfrac{${k}}{${sq}}$`],
    };
  }
  const p = rng.int(0, 6);
  const inner = p === 0 ? 'x' : `x + ${p}`;
  const innerH = p === 0 ? 'x + h' : `x + h + ${p}`;
  return {
    fx: `\\sqrt{${inner}}`,
    work: `f'(x) = ${LIMH} \\dfrac{1}{\\sqrt{${innerH}} + \\sqrt{${inner}}}`,
    correct: `$f'(x) = \\dfrac{1}{2\\sqrt{${inner}}}$`,
    wrong: [`$f'(x) = \\dfrac{1}{\\sqrt{${inner}}}$`, `$f'(x) = \\dfrac{1}{2(${inner})}$`, `$f'(x) = 2\\sqrt{${inner}}$`],
    why: [`As $h \\to 0$, $\\sqrt{${innerH}} \\to \\sqrt{${inner}}$.`, `The denominator approaches $\\sqrt{${inner}} + \\sqrt{${inner}} = 2\\sqrt{${inner}}$.`, `$f'(x) = \\dfrac{1}{2\\sqrt{${inner}}}$`],
  };
}

const INTERP = [
  { f: 'V', desc: 'the volume of water, in litres, in a hot tub $t$ minutes after the drain is opened', qShort: 'the volume', tU: 'min', vU: 'L', rate: 'L/min', rateWords: 'litres per minute', sign: -1, vals: [8, 12, 15, 20, 25], at: [5, 10, 12, 20] },
  { f: 'P', desc: 'the population of Lakeside $t$ years after 2020', qShort: 'the population', tU: 'years', vU: 'people', rate: 'people/year', rateWords: 'people per year', sign: 1, vals: [850, 1200, 1500, 1800], at: [2, 3, 4, 5] },
  { f: 'T', desc: 'the temperature, in degrees Celsius, of a cup of coffee $t$ minutes after it is poured', qShort: 'the temperature', tU: 'min', vU: '°C', rate: '°C/min', rateWords: 'degrees Celsius per minute', sign: -1, vals: [1.5, 2, 2.5, 3.2], at: [4, 6, 10, 15] },
  { f: 'h', desc: 'the height, in metres, of a weather balloon $t$ seconds after it is released', qShort: 'the height', tU: 's', vU: 'm', rate: 'm/s', rateWords: 'metres per second', sign: 1, vals: [3.5, 4, 5.2, 6], at: [10, 20, 30, 45] },
  { f: 'D', desc: 'the depth of snow, in centimetres, at a mountain ski hill $t$ hours after a storm begins', qShort: 'the depth', tU: 'h', vU: 'cm', rate: 'cm/h', rateWords: 'centimetres per hour', sign: 1, vals: [1.5, 2, 2.5, 3], at: [2, 3, 5, 6] },
  { f: 'A', desc: 'the amount of a medication, in milligrams, in a patient\u2019s bloodstream $t$ hours after a dose', qShort: 'the amount', tU: 'h', vU: 'mg', rate: 'mg/h', rateWords: 'milligrams per hour', sign: -1, vals: [4, 6, 8, 12], at: [2, 3, 4, 6] },
] as const;

const firstPrinciples = skill({
  id: 'm31-first-principles',
  name: 'The derivative from first principles',
  description: 'Use the limit definition of the derivative to find f′(x) and f′(a) for polynomial, reciprocal and square-root functions, and interpret f′(a) with units.',
  outcomes: ['D1'],
  lessonId: 'm31-3-2',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['fprimeA', 'fprimeA', 'stepPoly'] as const)
        : d === 2
          ? rng.pick(['polyDeriv', 'polyDeriv', 'interpret', 'units'] as const)
          : rng.pick(['rational', 'root', 'cubic', 'slopeAt', 'stepOther'] as const);
    const defHint = "Use $f'(x) = \\displaystyle\\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$: expand, cancel the terms without $h$, divide by $h$, then let $h \\to 0$.";

    if (kind === 'fprimeA') {
      const a = rng.pick([1, 2, 3, -1, -2, 4]);
      const b = rng.int(-6, 6);
      const c = rng.int(-6, 6);
      const p = rng.int(-3, 4);
      const fp = a * p * p + b * p + c;
      const m = 2 * a * p + b;
      const fx = quadTex(a, b, c);
      return {
        prompt: `Use the definition $f'(a) = \\displaystyle\\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$ to find $f'(${p})$ for $f(x) = ${fx}$.`,
        parts: [numPart(m, { label: `$f'(${p}) =$` })],
        hints: [`Find $f(${p})$ and expand $f(${p} + h)$.`, 'Subtract, divide every term by $h$, then let $h \\to 0$.'],
        solution: [
          `$f(${p}) = ${fp}$`,
          `$f(${p} + h) = ${poly([[a, `(${p} + h)^2`], [b, `(${p} + h)`], [c, '']])} = ${poly([[a, 'h^2'], [m, 'h'], [fp, '']])}$`,
          `$\\dfrac{f(${p} + h) - f(${p})}{h} = \\dfrac{${poly([[a, 'h^2'], [m, 'h']])}}{h} = ${poly([[a, 'h'], [m, '']])}$`,
          `$f'(${p}) = ${LIMH} (${poly([[a, 'h'], [m, '']])}) = ${m}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'stepPoly' || kind === 'stepOther') {
      const stage = kind === 'stepPoly' ? rng.pick(['expand', 'cancel'] as const) : rng.pick(['root', 'recip', 'finish'] as const);
      const s = nextStep(rng, stage);
      return {
        prompt: `A student is finding the derivative of $f(x) = ${s.fx}$ from first principles. So far they have written $$${s.work}$$ Which line correctly comes next?`,
        parts: [part(mc(rng, s.correct, s.wrong))],
        hints: [defHint, stage === 'root' ? 'With square roots, multiply by the conjugate.' : stage === 'recip' ? 'Combine the fractions in the numerator over a common denominator.' : stage === 'finish' ? 'The $h$ in the denominator has already been cancelled, so you can now let $h \\to 0$.' : 'Do the algebra carefully before letting $h \\to 0$.'],
        solution: [...s.why, `The correct next line is ${s.correct}.`],
        calculator: false,
      };
    }

    if (kind === 'polyDeriv') {
      const a = rng.pick([1, 2, 3, 4, -1, -2, -3, 5]);
      const b = rng.int(-8, 8);
      const c = rng.int(-9, 9);
      const fx = quadTex(a, b, c);
      const ans = poly([[2 * a, 'x'], [b, '']]);
      return {
        prompt: `Use the definition of the derivative to find $f'(x)$ for $f(x) = ${fx}$.`,
        parts: [part({ kind: 'expression', expected: ans, form: 'expanded' }, { label: "$f'(x) =$" })],
        hints: [defHint, `$f(x + h) = ${poly([[a, '(x + h)^2'], [b, '(x + h)'], [c, '']])}$. Expand it carefully.`],
        solution: [
          `$f(x + h) = ${poly([[a, 'x^2'], [2 * a, 'xh'], [a, 'h^2'], [b, 'x'], [b, 'h'], [c, '']])}$`,
          `$f(x + h) - f(x) = ${poly([[2 * a, 'xh'], [a, 'h^2'], [b, 'h']])}$`,
          `$\\dfrac{f(x + h) - f(x)}{h} = ${poly([[2 * a, 'x'], [a, 'h'], [b, '']])}$`,
          `$f'(x) = ${LIMH} (${poly([[2 * a, 'x'], [a, 'h'], [b, '']])}) = ${ans}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'interpret' || kind === 'units') {
      const c = rng.pick(INTERP);
      const a = rng.pick(c.at as readonly number[]);
      const mag = rng.pick(c.vals as readonly number[]);
      const v = c.sign * mag;
      if (kind === 'units') {
        return {
          prompt: `Let $${c.f}(t)$ be ${c.desc}. What are the units of $${c.f}'(t)$?`,
          parts: [part(mc(rng, c.rate, [c.vU, `${c.tU}/${c.vU}`, `${c.vU}·${c.tU}`]))],
          hints: ['A derivative is a limit of $\\dfrac{\\Delta(\\text{output})}{\\Delta(\\text{input})}$.', 'So its units are (units of the output) per (unit of the input).'],
          solution: [`$${c.f}'(t) = \\displaystyle\\lim_{h \\to 0} \\frac{${c.f}(t + h) - ${c.f}(t)}{h}$ divides a change in ${c.qShort} (${c.vU}) by a change in time (${c.tU}).`, `The units of $${c.f}'(t)$ are ${c.rate} (${c.rateWords}).`],
          calculator: false,
        };
      }
      const dir = v > 0 ? 'increasing' : 'decreasing';
      const other = v > 0 ? 'decreasing' : 'increasing';
      const tWhen = `$t = ${a}$ ${c.tU}`;
      const correct = `At ${tWhen}, ${c.qShort} is ${dir} at a rate of ${fmt(mag)} ${c.rate}.`;
      const wrong = [
        `At ${tWhen}, ${c.qShort} is ${fmt(mag)} ${c.vU}.`,
        `Over the first ${a} ${c.tU}, ${c.qShort} changed at an average rate of ${fmt(v)} ${c.rate}.`,
        `At ${tWhen}, ${c.qShort} is ${other} at a rate of ${fmt(mag)} ${c.rate}.`,
        `At $t = ${fmt(mag)}$ ${c.tU}, ${c.qShort} is changing at a rate of ${a} ${c.rate}.`,
      ];
      return {
        prompt: `Let $${c.f}(t)$ be ${c.desc}. You are told that $${c.f}'(${a}) = ${fmt(v)}$. Which statement is correct?`,
        parts: [part(mc(rng, correct, rng.sample(wrong, 3)))],
        hints: [`$${c.f}'(${a})$ is an instantaneous rate of change at one moment, $t = ${a}$, not a value of $${c.f}$ and not an average.`, `Its units are units of $${c.f}$ per unit of $t$; its sign says whether $${c.f}$ is increasing or decreasing.`],
        solution: [
          `$${c.f}'(${a})$ is the instantaneous rate of change of ${c.qShort} at $t = ${a}$, in ${c.rate}.`,
          `It is ${v > 0 ? 'positive' : 'negative'}, so ${c.qShort} is ${dir}.`,
          correct,
        ],
        calculator: false,
      };
    }

    if (kind === 'rational') {
      const k = rng.pick([1, 2, 3, 4, 5, 6, -2, -3]);
      const p = rng.int(0, 5);
      const inner = p === 0 ? 'x' : `x + ${p}`;
      const innerH = p === 0 ? 'x + h' : `x + h + ${p}`;
      const sq = p === 0 ? 'x^2' : `(${inner})^2`;
      const kk = k === 1 ? '' : k === -1 ? '-' : `${k}`;
      return {
        prompt: `Use the definition of the derivative to find $f'(x)$ for $f(x) = \\dfrac{${k}}{${inner}}$.`,
        parts: [part({ kind: 'expression', expected: `${-k}/(${inner})^2` }, { label: "$f'(x) =$" })],
        hints: [defHint, `Combine $\\dfrac{${k}}{${innerH}} - \\dfrac{${k}}{${inner}}$ over the common denominator $(${innerH})(${inner})$.`],
        solution: [
          `$\\dfrac{f(x + h) - f(x)}{h} = \\dfrac{1}{h}\\left(\\dfrac{${k}}{${innerH}} - \\dfrac{${k}}{${inner}}\\right) = \\dfrac{${kk}(${inner}) - ${kk}(${innerH})}{h(${innerH})(${inner})}$`,
          `The numerator simplifies to $${cf(-k)}h$, so the quotient is $\\dfrac{${-k}}{(${innerH})(${inner})}$.`,
          `$f'(x) = ${LIMH} \\dfrac{${-k}}{(${innerH})(${inner})} = \\dfrac{${-k}}{${sq}}$`,
        ],
        answerDisplay: `$f'(x) = ${k > 0 ? '-' : ''}\\dfrac{${Math.abs(k)}}{${sq}}$`,
        calculator: false,
      };
    }

    if (kind === 'root') {
      const scaled = rng.chance(0.4);
      if (scaled) {
        const k = rng.pick([2, 3, 4, 6, 8, 10]);
        return {
          prompt: `Use the definition of the derivative to find $f'(x)$ for $f(x) = ${k}\\sqrt{x}$.`,
          parts: [part({ kind: 'expression', expected: k % 2 === 0 ? `${k / 2}/sqrt(x)` : `${k}/(2sqrt(x))` }, { label: "$f'(x) =$" })],
          hints: [defHint, 'Multiply the numerator and denominator by the conjugate $\\sqrt{x + h} + \\sqrt{x}$.'],
          solution: [
            `$\\dfrac{f(x + h) - f(x)}{h} = \\dfrac{${k}(\\sqrt{x + h} - \\sqrt{x})}{h} \\cdot \\dfrac{\\sqrt{x + h} + \\sqrt{x}}{\\sqrt{x + h} + \\sqrt{x}}$`,
            `$= \\dfrac{${k}h}{h(\\sqrt{x + h} + \\sqrt{x})} = \\dfrac{${k}}{\\sqrt{x + h} + \\sqrt{x}}$`,
            `$f'(x) = ${LIMH} \\dfrac{${k}}{\\sqrt{x + h} + \\sqrt{x}} = \\dfrac{${k}}{2\\sqrt{x}}${k % 2 === 0 ? ` = \\dfrac{${k / 2}}{\\sqrt{x}}` : ''}$`,
          ],
          calculator: false,
        };
      }
      const p = rng.int(1, 9);
      const inner = `x + ${p}`;
      const innerH = `x + h + ${p}`;
      return {
        prompt: `Use the definition of the derivative to find $f'(x)$ for $f(x) = \\sqrt{${inner}}$.`,
        parts: [part({ kind: 'expression', expected: `1/(2sqrt(${inner}))` }, { label: "$f'(x) =$" })],
        hints: [defHint, `Multiply the numerator and denominator by the conjugate $\\sqrt{${innerH}} + \\sqrt{${inner}}$.`],
        solution: [
          `$\\dfrac{f(x + h) - f(x)}{h} = \\dfrac{\\sqrt{${innerH}} - \\sqrt{${inner}}}{h} \\cdot \\dfrac{\\sqrt{${innerH}} + \\sqrt{${inner}}}{\\sqrt{${innerH}} + \\sqrt{${inner}}}$`,
          `$= \\dfrac{(${innerH}) - (${inner})}{h(\\sqrt{${innerH}} + \\sqrt{${inner}})} = \\dfrac{1}{\\sqrt{${innerH}} + \\sqrt{${inner}}}$`,
          `$f'(x) = ${LIMH} \\dfrac{1}{\\sqrt{${innerH}} + \\sqrt{${inner}}} = \\dfrac{1}{2\\sqrt{${inner}}}$`,
        ],
        calculator: false,
      };
    }

    if (kind === 'cubic') {
      const a = rng.pick([1, 2, -1, 3]);
      const b = rng.int(-5, 5);
      const c = rng.int(-6, 6);
      const fx = poly([[a, 'x^3'], [b, 'x^2'], [c, '']]);
      const ans = poly([[3 * a, 'x^2'], [2 * b, 'x']]);
      return {
        prompt: `Use the definition of the derivative to find $f'(x)$ for $f(x) = ${fx}$.`,
        parts: [part({ kind: 'expression', expected: ans, form: 'expanded' }, { label: "$f'(x) =$" })],
        hints: [defHint, 'Use $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$ and $(x + h)^2 = x^2 + 2xh + h^2$.'],
        solution: [
          `$f(x + h) = ${poly([[a, '(x + h)^3'], [b, '(x + h)^2'], [c, '']])}$`,
          `$= ${poly([[a, 'x^3'], [3 * a, 'x^2h'], [3 * a, 'xh^2'], [a, 'h^3'], [b, 'x^2'], [2 * b, 'xh'], [b, 'h^2'], [c, '']])}$`,
          `$f(x + h) - f(x) = ${poly([[3 * a, 'x^2h'], [3 * a, 'xh^2'], [a, 'h^3'], [2 * b, 'xh'], [b, 'h^2']])}$`,
          `Divide by $h$: $${poly([[3 * a, 'x^2'], [3 * a, 'xh'], [a, 'h^2'], [2 * b, 'x'], [b, 'h']])}$`,
          `$f'(x) = ${LIMH} \\left(${poly([[3 * a, 'x^2'], [3 * a, 'xh'], [a, 'h^2'], [2 * b, 'x'], [b, 'h']])}\\right) = ${ans}$`,
        ],
        calculator: false,
      };
    }

    // slopeAt: f'(a) for k/x or sqrt(x) from the definition, as a number.
    if (rng.chance(0.5)) {
      const k = rng.pick([1, 2, 3, 4, 6, 8, 12]);
      const a = rng.pick([1, 2, 3, 4, 5]);
      const m = -k / (a * a);
      return {
        prompt: `Use the definition $f'(a) = \\displaystyle\\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$ to find the slope of the tangent to $f(x) = \\dfrac{${k}}{x}$ at $x = ${a}$.`,
        parts: [numPart(m, { label: 'Slope $=$' })],
        hints: [`Write $\\dfrac{1}{h}\\left(\\dfrac{${k}}{${a} + h} - \\dfrac{${k}}{${a}}\\right)$ and combine the fractions.`, 'The numerator becomes a multiple of $h$; cancel it, then let $h \\to 0$.'],
        solution: [
          `$\\dfrac{${k}}{${a} + h} - \\dfrac{${k}}{${a}} = \\dfrac{${k}(${a}) - ${k}(${a} + h)}{${a}(${a} + h)} = \\dfrac{${-k}h}{${a}(${a} + h)}$`,
          `Divide by $h$: $\\dfrac{${-k}}{${a}(${a} + h)}$`,
          `$f'(${a}) = ${LIMH} \\dfrac{${-k}}{${a}(${a} + h)} = \\dfrac{${-k}}{${a * a}} = ${tn(m)}$`,
        ],
        calculator: false,
      };
    }
    const a = rng.pick([1, 4, 9, 16, 25]);
    const k = rng.pick([1, 2, 3, 4]);
    const r = Math.sqrt(a);
    const m = k / (2 * r);
    const fxx = k === 1 ? '\\sqrt{x}' : `${k}\\sqrt{x}`;
    return {
      prompt: `Use the definition of the derivative to find the slope of the tangent to $f(x) = ${fxx}$ at $x = ${a}$.`,
      parts: [numPart(m, { label: 'Slope $=$' })],
      hints: [`Write $\\dfrac{f(${a} + h) - f(${a})}{h} = \\dfrac{${k === 1 ? '' : k}(\\sqrt{${a} + h} - ${r})}{h}$.`, `Multiply by the conjugate $\\sqrt{${a} + h} + ${r}$, cancel $h$, then let $h \\to 0$.`],
      solution: [
        `$\\dfrac{${k === 1 ? '' : k}(\\sqrt{${a} + h} - ${r})}{h} \\cdot \\dfrac{\\sqrt{${a} + h} + ${r}}{\\sqrt{${a} + h} + ${r}} = \\dfrac{${k === 1 ? '' : k}((${a} + h) - ${a})}{h(\\sqrt{${a} + h} + ${r})} = \\dfrac{${k}}{\\sqrt{${a} + h} + ${r}}$`,
        `$f'(${a}) = ${LIMH} \\dfrac{${k}}{\\sqrt{${a} + h} + ${r}} = \\dfrac{${k}}{${2 * r}}${Number.isInteger(m) || toFrac(m, 100)!.d !== 2 * r ? ` = ${tn(m)}` : ''}$`,
        `The slope of the tangent at $x = ${a}$ is $${tn(m)}$.`,
      ],
      calculator: false,
    };
  },
});

export const DERIVATIVE_SKILLS: SkillDef[] = [avgRate, firstPrinciples];

