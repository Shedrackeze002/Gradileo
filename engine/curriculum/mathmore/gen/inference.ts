/**
 * More Mathematics Topics, Unit 28: regression, expected value and statistical tests. The least
 * squares regression line, the expected value of a discrete random variable, Spearman's rank
 * correlation coefficient, the chi-squared tests, and the t-test for two means.
 */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { eq3, s3, SF_TEXT, sfPart, sum } from './common.ts';

type Out = GenOutput;

const pct = (a: number) => `${fmt(a * 100)}\\%`;
const f3 = (v: number) => fmtFixed(v, 3);
const f4 = (v: number) => fmtFixed(v, 4);
const sgn = (v: number) => (v < 0 ? `- ${s3(-v)}` : `+ ${s3(v)}`);

// ---------------------------------------------------------------------------
// 28.1 The least squares regression line
// ---------------------------------------------------------------------------

const PAIRS = [
  { x: 'hours of revision', y: 'test mark', xs: [1, 12], b: [2, 6], a: [20, 40] },
  { x: 'temperature in °C', y: 'cold drinks sold', xs: [14, 32], b: [3, 8], a: [-20, 10] },
  { x: 'age of a bicycle in years', y: 'its value in dollars', xs: [1, 10], b: [-30, -12], a: [300, 420] },
  { x: 'rainfall in mm', y: 'crop yield in kg', xs: [20, 80], b: [1, 3], a: [40, 90] },
  { x: 'hours of practice', y: 'typing speed in words per minute', xs: [2, 20], b: [1, 4], a: [15, 35] },
] as const;

type Pair = (typeof PAIRS)[number];

/** n data pairs scattered about a straight line, with distinct x values. */
function dataSet(rng: Rng, p: Pair, n: number) {
  const xs = retry(
    () => Array.from({ length: n }, () => rng.int(p.xs[0], p.xs[1])),
    (v) => new Set(v).size === v.length,
    200,
  ).sort((a, b) => a - b);
  const b = rng.int(p.b[0], p.b[1]);
  const a = rng.int(p.a[0], p.a[1]);
  const spread = Math.max(2, Math.round(Math.abs(b) * 1.5));
  const ys = xs.map((x) => a + b * x + rng.int(-spread, spread));
  return { xs, ys };
}

function regression(xs: number[], ys: number[]) {
  const n = xs.length;
  const sx = sum(xs);
  const sy = sum(ys);
  const sxx = sum(xs.map((x) => x * x)) - (sx * sx) / n;
  const sxy = sum(xs.map((x, i) => x * ys[i]!)) - (sx * sy) / n;
  const syy = sum(ys.map((y) => y * y)) - (sy * sy) / n;
  const b = sxy / sxx;
  return { n, sx, sy, sxx, sxy, syy, b, a: sy / n - (b * sx) / n, xbar: sx / n, ybar: sy / n };
}

const dataTable = (p: Pair, xs: number[], ys: number[]): Figure => ({
  type: 'table',
  headers: [`${p.x[0]!.toUpperCase()}${p.x.slice(1)}, $x$`, ...xs.map(String)],
  rows: [[`${p.y[0]!.toUpperCase()}${p.y.slice(1)}, $y$`, ...ys.map(String)]],
  markdown: true,
});

function regressionLine(rng: Rng, d: Difficulty): Out {
  const p = rng.pick(PAIRS);
  if (d === 1) {
    const r = regression(...Object.values(dataSet(rng, p, rng.int(6, 9))) as [number[], number[]]);
    const [xbar, ybar] = [roundTo(r.xbar, 2), roundTo(r.ybar, 2)];
    const [sxx, sxy] = [roundTo(r.sxx, 1), roundTo(r.sxy, 1)];
    const b = sxy / sxx;
    const a = ybar - b * xbar;
    return {
      prompt: `For a set of data on ${p.x}, $x$, and ${p.y}, $y$: $\\bar{x} = ${fmt(xbar)}$, $\\bar{y} = ${fmt(ybar)}$, $S_{xx} = ${fmt(sxx)}$ and $S_{xy} = ${fmt(sxy)}$. Find the equation of the regression line of $y$ on $x$ in the form $y = a + bx$. ${SF_TEXT}`,
      parts: [sfPart(b, { label: '$b =$' }), sfPart(a, { label: '$a =$' })],
      hints: ['The gradient is $b = \\dfrac{S_{xy}}{S_{xx}}$.', 'The line passes through $(\\bar{x}, \\bar{y})$, so $a = \\bar{y} - b\\bar{x}$. Use the full value of $b$.'],
      solution: [`$b = \\dfrac{${fmt(sxy)}}{${fmt(sxx)}} ${eq3(b)}$`, `$a = ${fmt(ybar)} - b \\times ${fmt(xbar)} ${eq3(a)}$`, `$y = ${s3(a)} ${sgn(b)}x$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const { xs, ys } = dataSet(rng, p, rng.int(5, 6));
    const r = regression(xs, ys);
    return {
      prompt: `The table shows ${p.x}, $x$, and ${p.y}, $y$. Find the equation of the least squares regression line of $y$ on $x$ in the form $y = a + bx$. ${SF_TEXT}`,
      figure: dataTable(p, xs, ys),
      parts: [sfPart(r.b, { label: '$b =$' }), sfPart(r.a, { label: '$a =$' })],
      hints: ['Find $\\sum x$, $\\sum y$, $\\sum x^2$ and $\\sum xy$, then $S_{xx} = \\sum x^2 - \\dfrac{(\\sum x)^2}{n}$ and $S_{xy} = \\sum xy - \\dfrac{\\sum x \\sum y}{n}$.', '$b = \\dfrac{S_{xy}}{S_{xx}}$ and $a = \\bar{y} - b\\bar{x}$. A calculator in statistics mode gives both at once.'],
      solution: [
        `$n = ${r.n}$, $\\sum x = ${r.sx}$, $\\sum y = ${r.sy}$, $\\sum x^2 = ${sum(xs.map((x) => x * x))}$, $\\sum xy = ${sum(xs.map((x, i) => x * ys[i]!))}$`,
        `$S_{xx} ${eq3(r.sxx)}$ and $S_{xy} ${eq3(r.sxy)}$`,
        `$b = \\dfrac{S_{xy}}{S_{xx}} ${eq3(r.b)}$ and $a = \\bar{y} - b\\bar{x} ${eq3(r.a)}$`,
        `$y = ${s3(r.a)} ${sgn(r.b)}x$`,
      ],
      calculator: true,
    };
  }
  const { xs, ys } = dataSet(rng, p, rng.int(8, 12));
  const r = regression(xs, ys);
  const sxx2 = sum(xs.map((x) => x * x));
  const sxy2 = sum(xs.map((x, i) => x * ys[i]!));
  return {
    prompt: `For $${r.n}$ pairs of values of ${p.x}, $x$, and ${p.y}, $y$: $\\sum x = ${r.sx}$, $\\sum y = ${r.sy}$, $\\sum x^2 = ${sxx2}$ and $\\sum xy = ${sxy2}$. Find $S_{xx}$, $S_{xy}$ and the regression line of $y$ on $x$ in the form $y = a + bx$. ${SF_TEXT}`,
    parts: [sfPart(r.sxx, { label: '$S_{xx} =$' }), sfPart(r.sxy, { label: '$S_{xy} =$' }), sfPart(r.b, { label: '$b =$' }), sfPart(r.a, { label: '$a =$' })],
    hints: ['$S_{xx} = \\sum x^2 - \\dfrac{(\\sum x)^2}{n}$ and $S_{xy} = \\sum xy - \\dfrac{\\sum x \\sum y}{n}$.', '$b = \\dfrac{S_{xy}}{S_{xx}}$ and $a = \\bar{y} - b\\bar{x}$.'],
    solution: [
      `$S_{xx} = ${sxx2} - \\dfrac{${r.sx}^2}{${r.n}} ${eq3(r.sxx)}$`,
      `$S_{xy} = ${sxy2} - \\dfrac{${r.sx} \\times ${r.sy}}{${r.n}} ${eq3(r.sxy)}$`,
      `$b ${eq3(r.b)}$, and $a = \\dfrac{${r.sy}}{${r.n}} - b \\times \\dfrac{${r.sx}}{${r.n}} ${eq3(r.a)}$`,
      `$y = ${s3(r.a)} ${sgn(r.b)}x$`,
    ],
    calculator: true,
  };
}

function regressionUse(rng: Rng, d: Difficulty): Out {
  const p = rng.pick(PAIRS);
  const { xs, ys } = dataSet(rng, p, 8);
  const r = regression(xs, ys);
  const [a, b] = [roundTo(r.a, 1), roundTo(r.b, 2)];
  const line = `$y = ${fmt(a)} ${b < 0 ? `- ${fmt(-b)}` : `+ ${fmt(b)}`}x$`;
  const [lo, hi] = [xs[0]!, xs[xs.length - 1]!];
  if (d === 1) {
    const x = retry(() => rng.int(lo, hi), (v) => !xs.includes(v), 100);
    const y = a + b * x;
    return {
      prompt: `Data on ${p.x}, $x$, and ${p.y}, $y$, for values of $x$ from $${lo}$ to $${hi}$ give the regression line ${line}. Estimate $y$ when $x = ${x}$.`,
      parts: [sfPart(y, { label: '$y \\approx$' })],
      hints: ['Put the value of $x$ into the equation of the line.'],
      solution: [`$y = ${fmt(a)} ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))} \\times ${x} ${eq3(y)}$`],
    };
  }
  if (d === 2) {
    const right = `For each extra unit of ${p.x}, the ${p.y} ${b < 0 ? 'falls' : 'rises'} by about $${fmt(Math.abs(b))}$ on average.`;
    return {
      prompt: `Data on ${p.x}, $x$, and ${p.y}, $y$, give the regression line ${line}. What does the value $${fmt(b)}$ tell us?`,
      parts: [part(mc(rng, right, [
        `For each extra unit of ${p.x}, the ${p.y} ${b < 0 ? 'rises' : 'falls'} by about $${fmt(Math.abs(b))}$ on average.`,
        `The ${p.y} is about $${fmt(Math.abs(b))}$ when ${p.x} is zero.`,
        `The ${p.x} goes up by about $${fmt(Math.abs(b))}$ for each extra unit of ${p.y}.`,
      ]))],
      hints: ['$b$ is the gradient of the line: the change in $y$ for each increase of $1$ in $x$.'],
      solution: [`$b = ${fmt(b)}$ is the gradient, so ${right.charAt(0).toLowerCase()}${right.slice(1)}`],
    };
  }
  const inside = rng.chance(0.5);
  const x = inside ? retry(() => rng.int(lo, hi), (v) => !xs.includes(v), 100) : hi + rng.int(Math.max(3, Math.round((hi - lo) / 2)), hi - lo + 5);
  const y = a + b * x;
  const yes = 'Reliable: it is an interpolation, inside the range of the data.';
  const no = 'Not reliable: it is an extrapolation, outside the range of the data.';
  return {
    prompt: `Data on ${p.x}, $x$, for values of $x$ from $${lo}$ to $${hi}$, and ${p.y}, $y$, give the regression line ${line}. Estimate $y$ when $x = ${x}$, and say whether the estimate is reliable.`,
    parts: [sfPart(y, { label: '$y \\approx$' }), part(fixedChoice([yes, no], inside ? 0 : 1), { label: 'Reliability:' })],
    hints: ['Put the value of $x$ into the equation.', `Is $x = ${x}$ inside the range $${lo} \\le x \\le ${hi}$ of the data?`],
    solution: [`$y ${eq3(y)}$`, inside ? `$${x}$ lies inside the data, so this is interpolation and the estimate is reliable.` : `$${x}$ lies beyond $${hi}$, so this is extrapolation: the pattern may not continue, and the estimate is not reliable.`],
  };
}

// ---------------------------------------------------------------------------
// 28.2 Expected value
// ---------------------------------------------------------------------------

/** Probabilities in tenths or hundredths that add up to 1. */
function probs(rng: Rng, k: number, step: number): number[] {
  const total = Math.round(1 / step);
  return retry(
    () => {
      const cuts = rng.shuffle(Array.from({ length: total - 1 }, (_, i) => i + 1)).slice(0, k - 1).sort((a, b) => a - b);
      return [...cuts, total].map((c, i) => roundTo((c - (i ? cuts[i - 1]! : 0)) * step, 2));
    },
    (ps) => ps.every((v) => v > 0),
  );
}

const drvTable = (xs: number[], cells: string[]): Figure => ({ type: 'table', headers: ['$x$', ...xs.map(String)], rows: [['$P(X = x)$', ...cells]], markdown: true });

function expectedValue(rng: Rng, d: Difficulty): Out {
  const k = rng.int(3, 5);
  const start = rng.int(0, 3);
  const step = rng.pick([1, 1, 2]);
  const xs = Array.from({ length: k }, (_, i) => start + i * step);
  const ps = probs(rng, k, d === 1 ? 0.1 : 0.05);
  const e = sum(xs.map((x, i) => x * ps[i]!));
  const terms = xs.map((x, i) => `${x} \\times ${fmt(ps[i]!)}`).join(' + ');
  if (d === 1) {
    return {
      prompt: 'The table shows the probability distribution of a discrete random variable $X$. Find $E(X)$.',
      figure: drvTable(xs, ps.map((v) => `$${fmt(v)}$`)),
      parts: [numPart(roundTo(e, 4), { label: '$E(X) =$', exact: false })],
      hints: ['$E(X) = \\sum x\\,P(X = x)$: multiply each value by its probability and add.'],
      solution: [`$E(X) = ${terms} = ${fmt(roundTo(e, 4))}$`],
    };
  }
  if (d === 2) {
    const j = rng.int(0, k - 1);
    return {
      prompt: 'The table shows the probability distribution of a discrete random variable $X$. Find $k$, and then $E(X)$.',
      figure: drvTable(xs, ps.map((v, i) => (i === j ? '$k$' : `$${fmt(v)}$`))),
      parts: [numPart(ps[j]!, { label: '$k =$', exact: false }), numPart(roundTo(e, 4), { label: '$E(X) =$', exact: false })],
      hints: ['The probabilities add up to $1$.', '$E(X) = \\sum x\\,P(X = x)$.'],
      solution: [`$k = 1 - (${ps.filter((_, i) => i !== j).map((v) => fmt(v)).join(' + ')}) = ${fmt(ps[j]!)}$`, `$E(X) = ${terms} = ${fmt(roundTo(e, 4))}$`],
    };
  }
  // Two unknowns p and q, from the total and E(X).
  const [i1, i2] = rng.shuffle(Array.from({ length: k }, (_, i) => i).filter((i) => xs[i]! > 0)).slice(0, 2).sort((a, b) => a - b) as [number, number];
  const co = (x: number) => (x === 1 ? '' : String(x));
  const both = roundTo(ps[i1]! + ps[i2]!, 4);
  const known = sum(xs.map((x, i) => (i === i1 || i === i2 ? 0 : x * ps[i]!)));
  return {
    prompt: `The table shows the probability distribution of a discrete random variable $X$, and $E(X) = ${fmt(roundTo(e, 4))}$. Find $p$ and $q$.`,
    figure: drvTable(xs, ps.map((v, i) => (i === i1 ? '$p$' : i === i2 ? '$q$' : `$${fmt(v)}$`))),
    parts: [numPart(ps[i1]!, { label: '$p =$', exact: false }), numPart(ps[i2]!, { label: '$q =$', exact: false })],
    hints: ['The probabilities add up to $1$, which gives one equation in $p$ and $q$.', '$E(X) = \\sum x\\,P(X = x)$ gives a second equation. Solve them together.'],
    solution: [
      `$p + q = 1 - ${fmt(roundTo(1 - both, 4))} = ${fmt(both)}$`,
      Math.abs(known) < 1e-9
        ? `$${co(xs[i1]!)}p + ${co(xs[i2]!)}q = ${fmt(roundTo(e, 4))}$ (the other values contribute $0$)`
        : `$${co(xs[i1]!)}p + ${co(xs[i2]!)}q + ${fmt(roundTo(known, 4))} = ${fmt(roundTo(e, 4))}$, so $${co(xs[i1]!)}p + ${co(xs[i2]!)}q = ${fmt(roundTo(e - known, 4))}$`,
      `Solving: $p = ${fmt(ps[i1]!)}$ and $q = ${fmt(ps[i2]!)}$`,
    ],
  };
}

const money = (v: number) => (Number.isInteger(v) ? `\\$${v}` : `\\$${v.toFixed(2)}`);

function expectedGain(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.pick([20, 40, 50, 60, 80, 100, 120, 200]);
    const [pn, pd] = rng.pick([[1, 4], [1, 5], [3, 10], [2, 5], [1, 10], [3, 4], [1, 8]] as Array<[number, number]>);
    const what = rng.pick(['seeds that germinate', 'free throws scored', 'faulty light bulbs', 'calls answered within a minute']);
    return {
      prompt: `The probability of a success is $\\dfrac{${pn}}{${pd}}$ each time. In $${n}$ independent trials, find the expected number of ${what}.`,
      parts: [numPart(roundTo((n * pn) / pd, 4), { exact: false })],
      hints: ['The expected number of successes in $n$ trials is $np$.'],
      solution: [`$np = ${n} \\times \\dfrac{${pn}}{${pd}} = ${fmt(roundTo((n * pn) / pd, 4))}$`],
    };
  }
  // A game: pay to play, then win prizes with given probabilities.
  const prizes = rng.shuffle([rng.pick([20, 25, 50]), rng.pick([5, 8, 10]), rng.pick([1, 2, 3])]).sort((a, b) => b - a);
  const ps = [rng.pick([0.02, 0.04, 0.05]), rng.pick([0.1, 0.15, 0.2]), rng.pick([0.25, 0.3])];
  const ev = sum(prizes.map((v, i) => v * ps[i]!));
  const desc = `A game costs $COST to play. A player wins ${money(prizes[0]!)} with probability $${fmt(ps[0]!)}$, ${money(prizes[1]!)} with probability $${fmt(ps[1]!)}$ and ${money(prizes[2]!)} with probability $${fmt(ps[2]!)}$, and otherwise wins nothing.`;
  if (d === 2) {
    const cost = rng.pick([1, 2, 3, 4, 5]);
    const gain = ev - cost;
    return {
      prompt: `${desc.replace('$COST', money(cost))} Find the expected gain per game for a player, in dollars, and say whether the game is fair.`,
      parts: [numPart(roundTo(gain, 2), { label: 'Expected gain: \\$', decimals: 2, tolerance: 0.011 }), part(fixedChoice(['The game is fair.', 'The game favours the player.', 'The game favours the organizer.'], Math.abs(gain) < 1e-9 ? 0 : gain > 0 ? 1 : 2), { label: 'The game:' })],
      hints: ['Expected winnings $= \\sum (\\text{prize} \\times \\text{probability})$.', 'Expected gain = expected winnings − cost. A game is fair when the expected gain is $0$.'],
      solution: [`Expected winnings $= ${prizes.map((v, i) => `${v} \\times ${fmt(ps[i]!)}`).join(' + ')} = ${fmtFixed(ev, 2)}$ dollars`, `Expected gain $= ${fmtFixed(ev, 2)} - ${cost} = ${fmtFixed(gain, 2)}$ dollars`, Math.abs(gain) < 1e-9 ? 'The game is fair.' : gain > 0 ? 'The expected gain is positive, so the game favours the player.' : 'The expected gain is negative, so the game favours the organizer.'],
    };
  }
  return {
    prompt: `${desc.replace('$COST', 'a fixed amount')} What should it cost to play for the game to be fair? Give the answer in dollars.`,
    parts: [numPart(roundTo(ev, 2), { label: '\\$', decimals: 2, tolerance: 0.011 })],
    hints: ['A game is fair when the expected gain is $0$, so the cost equals the expected winnings.', 'Expected winnings $= \\sum (\\text{prize} \\times \\text{probability})$.'],
    solution: [`Expected winnings $= ${prizes.map((v, i) => `${v} \\times ${fmt(ps[i]!)}`).join(' + ')} = ${fmtFixed(ev, 2)}$`, `For a fair game the cost is ${money(roundTo(ev, 2))}.`],
  };
}

// ---------------------------------------------------------------------------
// 28.3 Spearman's rank correlation coefficient
// ---------------------------------------------------------------------------

/** Ranks with 1 for the largest value (no ties). */
const ranks = (vs: number[]) => vs.map((v) => vs.filter((w) => w > v).length + 1);

const JUDGES = [
  { a: 'Judge A', b: 'Judge B', what: 'scores given to the same dancers' },
  { a: 'the maths test', b: 'the science test', what: 'marks of the same students in two tests' },
  { a: 'the long jump', b: 'the high jump', what: 'points scored by the same athletes in two events' },
  { a: 'price in dollars', b: 'rating out of 100', what: 'prices and ratings of the same phones' },
];

function spearmanData(rng: Rng, n: number) {
  return retry(
    () => {
      const base = rng.shuffle(Array.from({ length: 40 }, (_, i) => 40 + i)).slice(0, n);
      const sign = rng.chance(0.7) ? 1 : -1;
      const ys = base.map((x) => Math.round(60 + (sign * (x - 60) * rng.int(8, 12)) / 10 + rng.int(-12, 12)));
      return { xs: base, ys };
    },
    ({ ys }) => new Set(ys).size === ys.length && ys.every((y) => y > 10 && y < 100),
    200,
  );
}

function spearman(xs: number[], ys: number[]) {
  const rx = ranks(xs);
  const ry = ranks(ys);
  const d2 = sum(rx.map((r, i) => (r - ry[i]!) ** 2));
  const n = xs.length;
  return { rx, ry, d2, n, rs: 1 - (6 * d2) / (n * (n * n - 1)) };
}

function spearmanRank(rng: Rng, d: Difficulty): Out {
  const j = rng.pick(JUDGES);
  if (d === 1) {
    const n = rng.int(5, 8);
    const d2 = retry(() => rng.int(2, (n * (n * n - 1)) / 3) * 2, (v) => v <= (n * (n * n - 1)) / 3, 50);
    const rs = 1 - (6 * d2) / (n * (n * n - 1));
    return {
      prompt: `$${n}$ pairs of values are ranked, and the squared differences between the ranks add up to $\\sum d^2 = ${d2}$. Find Spearman’s rank correlation coefficient $r_s$, to 3 decimal places.`,
      parts: [numPart(rs, { label: '$r_s =$', decimals: 3 })],
      hints: ['$r_s = 1 - \\dfrac{6\\sum d^2}{n(n^2 - 1)}$.'],
      solution: [`$r_s = 1 - \\dfrac{6 \\times ${d2}}{${n}(${n}^2 - 1)} = 1 - \\dfrac{${6 * d2}}{${n * (n * n - 1)}} \\approx ${f3(rs)}$`],
    };
  }
  const n = d === 2 ? rng.int(5, 6) : rng.int(7, 8);
  const { xs, ys } = spearmanData(rng, n);
  const s = spearman(xs, ys);
  const figure: Figure = { type: 'table', headers: ['', ...xs.map((_, i) => String.fromCharCode(65 + i))], rows: [[cap1(j.a), ...xs.map(String)], [cap1(j.b), ...ys.map(String)]], markdown: true };
  const steps = [`Ranks for ${j.a}: ${s.rx.join(', ')}. Ranks for ${j.b}: ${s.ry.join(', ')}.`, `$\\sum d^2 = ${s.d2}$`, `$r_s = 1 - \\dfrac{6 \\times ${s.d2}}{${n}(${n}^2 - 1)} \\approx ${f3(s.rs)}$`];
  if (d === 2) {
    return {
      prompt: `The table shows the ${j.what}, labelled $A$ to $${String.fromCharCode(64 + n)}$. Find Spearman’s rank correlation coefficient $r_s$, to 3 decimal places.`,
      figure,
      parts: [numPart(s.rs, { label: '$r_s =$', decimals: 3 })],
      hints: ['Rank each row from $1$ (the largest) to $n$, find the difference $d$ between the two ranks of each item, and add up $d^2$.', '$r_s = 1 - \\dfrac{6\\sum d^2}{n(n^2 - 1)}$.'],
      solution: steps,
      calculator: true,
    };
  }
  const crit = SPEARMAN_CRIT[n]!;
  const reject = Math.abs(s.rs) > crit;
  const kind = s.rs > 0 ? 'positive' : 'negative';
  const yes = `There is evidence of ${kind} association.`;
  const no = `There is not enough evidence of ${kind} association.`;
  return {
    prompt: `The table shows the ${j.what}. Find $r_s$ to 3 decimal places, and test at the $5\\%$ level for ${kind} association. The critical value for this one-tailed test with $n = ${n}$ is $${f3(crit)}$.`,
    figure,
    parts: [numPart(s.rs, { label: '$r_s =$', decimals: 3 }), part(fixedChoice([yes, no], reject ? 0 : 1), { label: 'Conclusion:' })],
    hints: ['Rank each row, add up the squared rank differences, and use $r_s = 1 - \\dfrac{6\\sum d^2}{n(n^2 - 1)}$.', `Reject $H_0$ when $|r_s|$ is more than the critical value $${f3(crit)}$ and has the sign the test is looking for.`],
    solution: [...steps, `$|r_s| ${reject ? '>' : '<'} ${f3(crit)}$, so ${reject ? 'we reject $H_0$' : 'we do not reject $H_0$'}. ${reject ? yes : no}`],
    calculator: true,
  };
}

const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** One-tailed 5% critical values of Spearman's coefficient (as printed in statistical tables). */
const SPEARMAN_CRIT: Record<number, number> = { 5: 0.9, 6: 0.829, 7: 0.714, 8: 0.643 };

function spearmanInterpret(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const rs = roundTo(rng.pick([1, -1]) * rng.int(5, 98) / 100, 2);
    const strength = Math.abs(rs) >= 0.7 ? 'strong' : Math.abs(rs) >= 0.4 ? 'moderate' : 'weak';
    const kind = rs > 0 ? 'positive' : 'negative';
    const right = `A ${strength} ${kind} association: as one ranking rises, the other tends to ${rs > 0 ? 'rise' : 'fall'}.`;
    return {
      prompt: `Spearman’s rank correlation coefficient for two sets of data is $r_s = ${fmt(rs)}$. Which statement describes it best?`,
      parts: [part(mc(rng, right, [
        `A ${strength} ${kind === 'positive' ? 'negative' : 'positive'} association.`,
        'No association at all.',
        `A perfect ${kind} association.`,
      ]))],
      hints: ['The sign of $r_s$ gives the direction, and its size, from $0$ to $1$, gives the strength.'],
      solution: [`$r_s = ${fmt(rs)}$ is ${kind}, and its size $${fmt(Math.abs(rs))}$ shows a ${strength} association.`],
    };
  }
  if (d === 2) {
    return {
      prompt: 'When is Spearman’s rank correlation coefficient a better choice than the product moment correlation coefficient $r$?',
      parts: [part(mc(rng, 'When the data are ranks, or the relationship is monotonic but not linear.', [
        'When the relationship is a straight line and the data are measurements.',
        'When there are more than $100$ pairs of data.',
        'When one variable causes the other.',
      ]))],
      hints: ['$r$ measures how close the points are to a straight line. $r_s$ only asks whether one variable rises (or falls) as the other rises.'],
      solution: ['$r_s$ uses only the order of the values, so it suits data given as ranks, and a relationship that always increases (or always decreases) without being a straight line.'],
    };
  }
  const n = rng.pick([6, 7, 8]);
  const crit = SPEARMAN_CRIT[n]!;
  const rs = roundTo(retry(() => rng.int(30, 99) / 100, (v) => Math.abs(v - crit) > 0.03), 3);
  const reject = rs > crit;
  return {
    prompt: `For $${n}$ pairs of data, $r_s = ${f3(rs)}$. A test at the $5\\%$ level uses $H_0: \\rho_s = 0$ and $H_1: \\rho_s > 0$, and the critical value is $${f3(crit)}$. Which conclusion is right?`,
    parts: [part(fixedChoice(['Reject $H_0$: there is evidence of positive association.', 'Do not reject $H_0$: there is not enough evidence of positive association.'], reject ? 0 : 1))],
    hints: ['Reject $H_0$ when $r_s$ is more than the critical value.'],
    solution: [`$${f3(rs)} ${reject ? '>' : '<'} ${f3(crit)}$, so ${reject ? 'we reject $H_0$: there is evidence of positive association.' : 'we do not reject $H_0$: there is not enough evidence of positive association.'}`],
  };
}

// ---------------------------------------------------------------------------
// 28.4 The chi-squared tests
// ---------------------------------------------------------------------------

/** Upper critical values of the chi-squared distribution, by degrees of freedom and level. */
const CHI_CRIT: Record<number, Record<string, number>> = {
  1: { '0.1': 2.706, '0.05': 3.841, '0.01': 6.635 },
  2: { '0.1': 4.605, '0.05': 5.991, '0.01': 9.21 },
  3: { '0.1': 6.251, '0.05': 7.815, '0.01': 11.345 },
  4: { '0.1': 7.779, '0.05': 9.488, '0.01': 13.277 },
  5: { '0.1': 9.236, '0.05': 11.07, '0.01': 15.086 },
};

const chiStat = (obs: number[], exp: number[]) => sum(obs.map((o, i) => (o - exp[i]!) ** 2 / exp[i]!));

function contingency(rng: Rng, rows: number, cols: number) {
  const RS = [['Under 18', '18 to 40', 'Over 40'], ['Year 10', 'Year 11', 'Year 12'], ['Town A', 'Town B', 'Town C']];
  const CS = [['Walk', 'Bus', 'Car'], ['Tea', 'Coffee', 'Juice'], ['Yes', 'No', 'Unsure']];
  const rl = rng.pick(RS).slice(0, rows);
  const cl = rng.pick(CS).slice(0, cols);
  const obs = Array.from({ length: rows }, () => Array.from({ length: cols }, () => rng.int(8, 45)));
  const rt = obs.map((r) => sum(r));
  const ct = cl.map((_, j) => sum(obs.map((r) => r[j]!)));
  const n = sum(rt);
  const exp = obs.map((_, i) => cl.map((_, j) => (rt[i]! * ct[j]!) / n));
  return { rl, cl, obs, rt, ct, n, exp };
}

const contingencyTable = (c: ReturnType<typeof contingency>, totals = true): Figure => ({
  type: 'table',
  headers: ['', ...c.cl, ...(totals ? ['Total'] : [])],
  rows: [...c.rl.map((r, i) => [r, ...c.obs[i]!.map(String), ...(totals ? [String(c.rt[i])] : [])]), ...(totals ? [['Total', ...c.ct.map(String), String(c.n)]] : [])],
  markdown: true,
});

function chiExpected(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const k = rng.int(3, 6);
    const n = k * rng.int(8, 30);
    const what = rng.pick(['a spinner with $K$ equal sections is spun', 'a $K$-sided dice is rolled']).replace('$K$', `$${k}$`);
    return {
      prompt: `To test whether ${what.replace(/ is (spun|rolled)$/, ' is fair')}, it is ${what.match(/(spun|rolled)$/)![0]} $${n}$ times. Find the expected frequency of each outcome, and the number of degrees of freedom for a goodness of fit test.`,
      parts: [numPart(n / k, { label: 'Expected frequency:', exact: false }), numPart(k - 1, { label: 'Degrees of freedom:', exact: false })],
      hints: ['If it is fair, each of the outcomes is equally likely, so each expected frequency is $\\dfrac{n}{k}$.', 'For a goodness of fit test with $k$ outcomes, there are $k - 1$ degrees of freedom.'],
      solution: [`Expected frequency $= \\dfrac{${n}}{${k}} = ${n / k}$`, `Degrees of freedom $= ${k} - 1 = ${k - 1}$`],
    };
  }
  const c = contingency(rng, d === 2 ? 2 : 3, 3);
  const [i, j] = [rng.int(0, c.rl.length - 1), rng.int(0, 2)];
  const e = c.exp[i]![j]!;
  return {
    prompt: `The table shows a survey of $${c.n}$ people. A $\\chi^2$ test for independence is carried out. Find the expected frequency for “${c.rl[i]}” and “${c.cl[j]}”, to 2 decimal places, and the number of degrees of freedom.`,
    figure: contingencyTable(c),
    parts: [numPart(e, { label: 'Expected frequency:', decimals: 2 }), numPart((c.rl.length - 1) * (c.cl.length - 1), { label: 'Degrees of freedom:', exact: false })],
    hints: ['Expected frequency $= \\dfrac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}$.', 'Degrees of freedom $= (\\text{rows} - 1)(\\text{columns} - 1)$.'],
    solution: [`$E = \\dfrac{${c.rt[i]} \\times ${c.ct[j]}}{${c.n}} \\approx ${fmtFixed(e, 2)}$`, `Degrees of freedom $= (${c.rl.length} - 1)(${c.cl.length} - 1) = ${(c.rl.length - 1) * (c.cl.length - 1)}$`],
    calculator: true,
  };
}

function chiTest(rng: Rng, d: Difficulty): Out {
  const alpha = rng.pick([0.05, 0.1, 0.01]);
  if (d < 3) {
    // Goodness of fit with equal expected frequencies.
    const k = d === 1 ? rng.int(3, 4) : rng.int(4, 6);
    const each = rng.int(10, 30);
    const n = k * each;
    const obs = retry(
      () => {
        const o = Array.from({ length: k - 1 }, () => each + rng.int(-Math.ceil(each / 2), Math.ceil(each / 2)));
        o.push(n - sum(o));
        return o;
      },
      (o) => o.every((v) => v > 0) && Math.abs(chiStat(o, o.map(() => each)) - CHI_CRIT[k - 1]![String(alpha)]!) > 0.3,
      200,
    );
    const x2 = chiStat(obs, obs.map(() => each));
    const crit = CHI_CRIT[k - 1]![String(alpha)]!;
    const reject = x2 > crit;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].slice(0, k);
    const figure: Figure = { type: 'table', headers: ['Day', ...days], rows: [['Visitors', ...obs.map(String)]], markdown: true };
    const yes = 'Reject $H_0$: the visitors are not spread evenly over the days.';
    const no = 'Do not reject $H_0$: there is not enough evidence that the visitors are spread unevenly.';
    return {
      prompt: `A museum counts $${n}$ visitors over ${k} days. $H_0$: visitors are equally likely to come on each day. Find the $\\chi^2$ statistic to 3 decimal places, and test $H_0$ at the $${pct(alpha)}$ level. The critical value is $${fmt(crit)}$.`,
      figure,
      parts: [numPart(x2, { label: '$\\chi^2_{calc} =$', decimals: 3 }), part(fixedChoice([yes, no], reject ? 0 : 1), { label: 'Conclusion:' })],
      hints: [`Each expected frequency is $\\dfrac{${n}}{${k}} = ${each}$.`, '$\\chi^2_{calc} = \\sum \\dfrac{(O - E)^2}{E}$. Reject $H_0$ when it is more than the critical value.'],
      solution: [`$E = ${each}$ for each day.`, `$\\chi^2_{calc} = ${obs.map((o) => `\\dfrac{(${o} - ${each})^2}{${each}}`).join(' + ')} \\approx ${f3(x2)}$`, `$${f3(x2)} ${reject ? '>' : '<'} ${fmt(crit)}$. ${reject ? yes : no}`],
      calculator: true,
    };
  }
  const c = retry(
    () => contingency(rng, 2, 2),
    (c) => c.exp.flat().every((e) => e >= 5) && Math.abs(chiStat(c.obs.flat(), c.exp.flat()) - CHI_CRIT[1]![String(alpha)]!) > 0.3,
    300,
  );
  const x2 = chiStat(c.obs.flat(), c.exp.flat());
  const crit = CHI_CRIT[1]![String(alpha)]!;
  const reject = x2 > crit;
  const yes = 'Reject $H_0$: the two variables are not independent.';
  const no = 'Do not reject $H_0$: there is not enough evidence that the variables are related.';
  return {
    prompt: `The table shows a survey of $${c.n}$ people. Test at the $${pct(alpha)}$ level whether the two variables are independent: find the $\\chi^2$ statistic to 3 decimal places and give the conclusion. The critical value is $${fmt(crit)}$.`,
    figure: contingencyTable(c),
    parts: [numPart(x2, { label: '$\\chi^2_{calc} =$', decimals: 3 }), part(fixedChoice([yes, no], reject ? 0 : 1), { label: 'Conclusion:' })],
    hints: ['Find each expected frequency as $\\dfrac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}$.', '$\\chi^2_{calc} = \\sum \\dfrac{(O - E)^2}{E}$, with $1$ degree of freedom for a $2 \\times 2$ table.'],
    solution: [
      `Expected: ${c.exp.flat().map((e) => fmtFixed(e, 2)).join(', ')}`,
      `$\\chi^2_{calc} = \\sum \\dfrac{(O - E)^2}{E} \\approx ${f3(x2)}$`,
      `$${f3(x2)} ${reject ? '>' : '<'} ${fmt(crit)}$. ${reject ? yes : no}`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 28.5 The t-test for two means
// ---------------------------------------------------------------------------

function tSetting(rng: Rng) {
  return rng.pick([
    { a: 'the new fertilizer', b: 'the old fertilizer', what: 'the mean height of the plants', more: 'taller' },
    { a: 'the morning class', b: 'the afternoon class', what: 'the mean test mark', more: 'higher' },
    { a: 'brand A batteries', b: 'brand B batteries', what: 'the mean lifetime', more: 'longer' },
  ]);
}

function tTestHypotheses(rng: Rng, d: Difficulty): Out {
  const s = tSetting(rng);
  if (d === 1) {
    const oneTail = rng.chance(0.5);
    const right = oneTail ? '$H_0: \\mu_1 = \\mu_2$ and $H_1: \\mu_1 > \\mu_2$' : '$H_0: \\mu_1 = \\mu_2$ and $H_1: \\mu_1 \\ne \\mu_2$';
    return {
      prompt: `A researcher wants to test whether ${s.what} for ${s.a} (population 1) ${oneTail ? `is greater than` : 'is different from'} that for ${s.b} (population 2). Which hypotheses should be used?`,
      parts: [part(mc(rng, right, [
        oneTail ? '$H_0: \\mu_1 = \\mu_2$ and $H_1: \\mu_1 \\ne \\mu_2$' : '$H_0: \\mu_1 = \\mu_2$ and $H_1: \\mu_1 > \\mu_2$',
        '$H_0: \\mu_1 > \\mu_2$ and $H_1: \\mu_1 = \\mu_2$',
        '$H_0: \\bar{x}_1 = \\bar{x}_2$ and $H_1: \\bar{x}_1 \\ne \\bar{x}_2$',
      ]))],
      hints: ['$H_0$ always says the population means are equal.', `“${oneTail ? 'Greater than' : 'Different from'}” makes $H_1$ ${oneTail ? 'one-tailed' : 'two-tailed'}. Hypotheses are about the population means $\\mu$, not the sample means.`],
      solution: [`${right}, which is a ${oneTail ? 'one' : 'two'}-tailed test.`],
    };
  }
  const alpha = rng.pick([0.05, 0.01, 0.1]);
  const p = roundTo(retry(() => rng.int(1, 300) / 1000, (v) => Math.abs(v - alpha) > 0.008), 3);
  const reject = p < alpha;
  if (d === 2) {
    return {
      prompt: `A $t$-test of $H_0: \\mu_1 = \\mu_2$ against $H_1: \\mu_1 > \\mu_2$, comparing ${s.what} for ${s.a} and ${s.b}, gives a $p$-value of $${fmt(p)}$. Which conclusion is right at the $${pct(alpha)}$ significance level?`,
      parts: [part(fixedChoice([`Reject $H_0$: there is evidence that ${s.what} is greater for ${s.a}.`, `Do not reject $H_0$: there is not enough evidence that ${s.what} is greater for ${s.a}.`], reject ? 0 : 1))],
      hints: ['Reject $H_0$ when the $p$-value is less than the significance level.'],
      solution: [`$p = ${fmt(p)} ${reject ? '<' : '>'} ${fmt(alpha)}$, so we ${reject ? 'reject' : 'do not reject'} $H_0$.`],
    };
  }
  return {
    prompt: `A two-tailed $t$-test comparing ${s.what} for ${s.a} and ${s.b} gives a $p$-value of $${fmt(p)}$. Which statement about the test at the $${pct(alpha)}$ level is right?`,
    parts: [part(mc(rng, reject ? 'The means are significantly different, but this does not prove that the populations differ.' : 'The difference is not significant, but this does not prove that the population means are equal.', [
      reject ? 'The means are not significantly different, so the populations are the same.' : 'The means are significantly different.',
      `The probability that $H_0$ is true is $${fmt(p)}$.`,
      'The test shows which population has the larger mean, whatever the $p$-value.',
    ]))],
    hints: ['Compare the $p$-value with the significance level.', 'A test gives evidence, not proof, and the $p$-value is not the probability that $H_0$ is true.'],
    solution: [`$p = ${fmt(p)} ${reject ? '<' : '>'} ${fmt(alpha)}$, so the result is ${reject ? '' : 'not '}significant. A hypothesis test never proves either hypothesis.`],
  };
}

function tTestStatistic(rng: Rng, d: Difficulty): Out {
  const s = tSetting(rng);
  const n1 = rng.int(6, 15);
  const n2 = rng.int(6, 15);
  const m2 = rng.int(200, 600) / 10;
  const m1 = roundTo(m2 + rng.int(5, 60) / 10, 1);
  const s1 = rng.int(15, 60) / 10;
  const s2 = rng.int(15, 60) / 10;
  const df = n1 + n2 - 2;
  const sp2 = ((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / df;
  const t = (m1 - m2) / Math.sqrt(sp2 * (1 / n1 + 1 / n2));
  const intro = `Samples of ${s.a} ($n_1 = ${n1}$, $\\bar{x}_1 = ${fmt(m1)}$, $s_1 = ${fmt(s1)}$) and ${s.b} ($n_2 = ${n2}$, $\\bar{x}_2 = ${fmt(m2)}$, $s_2 = ${fmt(s2)}$) are compared, where $s_1$ and $s_2$ are the unbiased standard deviations and the population variances are assumed equal.`;
  if (d === 1) {
    return {
      prompt: `${intro} Find the number of degrees of freedom and the pooled variance $s_p^2$. ${SF_TEXT}`,
      parts: [numPart(df, { label: 'Degrees of freedom:', exact: false }), sfPart(sp2, { label: '$s_p^2 =$' })],
      hints: ['There are $n_1 + n_2 - 2$ degrees of freedom.', '$s_p^2 = \\dfrac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}$.'],
      solution: [`Degrees of freedom $= ${n1} + ${n2} - 2 = ${df}$`, `$s_p^2 = \\dfrac{${n1 - 1} \\times ${fmt(s1)}^2 + ${n2 - 1} \\times ${fmt(s2)}^2}{${df}} ${eq3(sp2)}$`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${intro} Find the test statistic $t = \\dfrac{\\bar{x}_1 - \\bar{x}_2}{s_p\\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}}$, to 3 decimal places.`,
      parts: [numPart(t, { label: '$t =$', decimals: 3 })],
      hints: ['First find $s_p^2 = \\dfrac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}$.', 'Then put $s_p = \\sqrt{s_p^2}$ into the formula for $t$.'],
      solution: [`$s_p^2 = \\dfrac{${n1 - 1} \\times ${fmt(s1)}^2 + ${n2 - 1} \\times ${fmt(s2)}^2}{${df}} \\approx ${f4(sp2)}$`, `$t = \\dfrac{${fmt(m1)} - ${fmt(m2)}}{\\sqrt{${f4(sp2)}}\\sqrt{\\frac{1}{${n1}} + \\frac{1}{${n2}}}} \\approx ${f3(t)}$`],
      calculator: true,
    };
  }
  const crit = T05[df]!;
  const reject = t > crit;
  const yes = `Reject $H_0$: there is evidence that ${s.what} is greater for ${s.a}.`;
  const no = `Do not reject $H_0$: there is not enough evidence that ${s.what} is greater for ${s.a}.`;
  return {
    prompt: `${intro} Test at the $5\\%$ level whether ${s.what} is greater for ${s.a}: find $t$ to 3 decimal places and give the conclusion. The critical value of $t$ with $${df}$ degrees of freedom is $${fmtFixed(crit, 3)}$.`,
    parts: [numPart(t, { label: '$t =$', decimals: 3 }), part(fixedChoice([yes, no], reject ? 0 : 1), { label: 'Conclusion:' })],
    hints: ['$H_0: \\mu_1 = \\mu_2$ and $H_1: \\mu_1 > \\mu_2$. Find $s_p^2$, then $t$.', 'Reject $H_0$ when $t$ is more than the critical value.'],
    solution: [`$s_p^2 \\approx ${f4(sp2)}$`, `$t \\approx ${f3(t)}$`, `$${f3(t)} ${reject ? '>' : '<'} ${fmtFixed(crit, 3)}$. ${reject ? yes : no}`],
    calculator: true,
  };
}

/** One-tailed 5% critical values of Student's t, by degrees of freedom (10 to 28). */
const T05: Record<number, number> = {
  10: 1.812, 11: 1.796, 12: 1.782, 13: 1.771, 14: 1.761, 15: 1.753, 16: 1.746, 17: 1.74, 18: 1.734, 19: 1.729,
  20: 1.725, 21: 1.721, 22: 1.717, 23: 1.714, 24: 1.711, 25: 1.708, 26: 1.706, 27: 1.703, 28: 1.701,
};

export const INFERENCE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-regression-line', name: 'The regression line', description: 'Find the least squares regression line of y on x from data or summary statistics', outcomes: ['RT1'], lessonId: 'mx-28-1', calculator: true, gen: regressionLine }),
  skill({ id: 'mx-regression-use', name: 'Using a regression line', description: 'Estimate with a regression line, interpret its gradient, and judge interpolation and extrapolation', outcomes: ['RT1'], lessonId: 'mx-28-1', gen: regressionUse }),
  skill({ id: 'mx-expected-value', name: 'Expected value', description: 'Find E(X) from a probability distribution, including one with unknown probabilities', outcomes: ['RT2'], lessonId: 'mx-28-2', gen: expectedValue }),
  skill({ id: 'mx-expected-gain', name: 'Expected numbers and fair games', description: 'Find the expected number of successes and the expected gain in a game, and decide whether a game is fair', outcomes: ['RT2'], lessonId: 'mx-28-2', gen: expectedGain }),
  skill({ id: 'mx-spearman-rank', name: 'Spearman’s rank correlation coefficient', description: 'Rank two sets of data and find Spearman’s rank correlation coefficient, and test it', outcomes: ['RT3'], lessonId: 'mx-28-3', calculator: true, gen: spearmanRank }),
  skill({ id: 'mx-spearman-interpret', name: 'Interpreting Spearman’s coefficient', description: 'Describe association from r_s, choose between r_s and r, and draw a conclusion from a test', outcomes: ['RT3'], lessonId: 'mx-28-3', format: 'mc', gen: spearmanInterpret }),
  skill({ id: 'mx-chi-expected', name: 'Expected frequencies and degrees of freedom', description: 'Find expected frequencies and degrees of freedom for chi-squared tests', outcomes: ['RT4'], lessonId: 'mx-28-4', gen: chiExpected }),
  skill({ id: 'mx-chi-test', name: 'Chi-squared tests', description: 'Find the chi-squared statistic for a goodness of fit test or a test for independence, and draw a conclusion', outcomes: ['RT4'], lessonId: 'mx-28-4', calculator: true, gen: chiTest }),
  skill({ id: 'mx-t-test-hypotheses', name: 'Hypotheses and p-values for the t-test', description: 'Write hypotheses for comparing two means, and draw conclusions from a p-value', outcomes: ['RT5'], lessonId: 'mx-28-5', format: 'mc', gen: tTestHypotheses }),
  skill({ id: 'mx-t-test-statistic', name: 'The two-sample t statistic', description: 'Find the pooled variance and the t statistic for two samples, and compare it with a critical value', outcomes: ['RT5'], lessonId: 'mx-28-5', calculator: true, gen: tTestStatistic }),
];
