/**
 * More Mathematics Topics, Unit 15: A level statistics in the second year. The product moment
 * correlation coefficient and its test, the inverse normal distribution, the normal approximation
 * to the binomial, and hypothesis tests for the mean of a normal distribution.
 */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { eq3, s3, SF_TEXT, sfPart } from './common.ts';

type Out = GenOutput;

// ---------------------------------------------------------------------------
// Distributions
// ---------------------------------------------------------------------------

/** Standard normal cumulative probability P(Z < z), by Marsaglia's series (error far below 1e-7). */
export function normalCdf(z: number): number {
  if (z <= -8) return 0;
  if (z >= 8) return 1;
  const q = z * z;
  let s = z;
  let t = 0;
  let b = z;
  for (let i = 1; s !== t && i < 2000; ) {
    t = s;
    i += 2;
    b *= q / i;
    s = t + b;
  }
  return 0.5 + s * Math.exp(-0.5 * q - 0.9189385332046728);
}

/** The z with P(Z < z) = p, by bisection. */
export function invNormal(p: number): number {
  let lo = -8;
  let hi = 8;
  for (let i = 0; i < 100; i++) {
    const m = (lo + hi) / 2;
    if (normalCdf(m) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

/** ln Γ(x) for x > 0, by the Lanczos approximation. */
function lnGamma(x: number): number {
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x;
  const tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
  let ser = 1.000000000190015;
  for (const k of c) ser += k / ++y;
  return -tmp + Math.log((2.5066282746310005 * ser) / x);
}

/** P(T < t) for Student's t distribution with v degrees of freedom (Simpson's rule from 0). */
function tCdf(t: number, v: number): number {
  const k = Math.exp(lnGamma((v + 1) / 2) - lnGamma(v / 2)) / Math.sqrt(v * Math.PI);
  const f = (x: number) => k * (1 + (x * x) / v) ** (-(v + 1) / 2);
  const m = 2000;
  const h = t / m;
  let s = f(0) + f(t);
  for (let i = 1; i < m; i++) s += (i % 2 ? 4 : 2) * f(i * h);
  return 0.5 + (s * h) / 3;
}

/** The t with P(T < t) = p, for p > 0.5. */
function tInv(p: number, v: number): number {
  let lo = 0;
  let hi = 60;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (tCdf(m, v) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

/**
 * The critical value of the product moment correlation coefficient for a one-tailed test at level
 * alpha with a sample of n pairs, to 4 decimal places (as the tables print it).
 */
export function pmccCritical(n: number, alpha: number): number {
  const t = tInv(1 - alpha, n - 2);
  return roundTo(t / Math.sqrt(n - 2 + t * t), 4);
}

const f4 = (v: number) => fmtFixed(v, 4);
const p4 = (v: number, label?: string) => numPart(v, { decimals: 4, label });
const pct = (a: number) => `${fmt(a * 100)}\\%`;

// ---------------------------------------------------------------------------
// 15.1 Correlation and the product moment correlation coefficient
// ---------------------------------------------------------------------------

interface Pair {
  x: string;
  y: string;
  /** The usual sign of the correlation. */
  sign: 1 | -1;
}

const PAIRS: Pair[] = [
  { x: 'the hours a student spends revising', y: 'their test mark', sign: 1 },
  { x: 'the daily maximum temperature', y: 'the number of hot drinks a café sells', sign: -1 },
  { x: 'the daily rainfall', y: 'the hours of sunshine', sign: -1 },
  { x: 'the height of a tree', y: 'the girth of its trunk', sign: 1 },
  { x: 'the altitude of a weather station', y: 'the air temperature there', sign: -1 },
  { x: 'the engine size of a car', y: 'its fuel use per 100 km', sign: 1 },
];

const STRENGTHS = ['strong positive correlation', 'weak positive correlation', 'no correlation', 'weak negative correlation', 'strong negative correlation'];

const rhoH = (s: '>' | '<' | '\\ne') => `$H_0$: $\\rho = 0$, $\\ H_1$: $\\rho ${s} 0$`;
const kindWords = (s: 1 | -1 | 0) => (s > 0 ? 'positive correlation' : s < 0 ? 'negative correlation' : 'correlation');
const kindSign = (s: 1 | -1 | 0) => (s > 0 ? '>' : s < 0 ? '<' : '\\ne') as '>' | '<' | '\\ne';

/** A sample r for a test, kept clear of the critical value so the decision is not a matter of rounding. */
function testCase(rng: Rng, pair: Pair) {
  const n = rng.int(8, 30);
  const alpha = rng.pick([0.05, 0.01, 0.1, 0.05]);
  const crit = pmccCritical(n, alpha);
  const r = retry(
    () => roundTo(pair.sign * rng.int(5, 98) / 100 + rng.int(0, 99) / 10000 * pair.sign, 4),
    (r) => Math.abs(Math.abs(r) - crit) > 0.04,
    100,
  );
  return { n, alpha, crit, r, reject: Math.abs(r) > crit };
}

function pmccInterpret(rng: Rng, d: Difficulty): Out {
  const pair = rng.pick(PAIRS);
  if (d === 1) {
    const i = rng.int(0, 4);
    const ranges: Array<[number, number]> = [[80, 97], [20, 45], [-8, 8], [-45, -20], [-97, -80]];
    const r = rng.int(ranges[i]![0], ranges[i]![1]) / 100;
    return {
      prompt: `A sample of pairs of values has product moment correlation coefficient $r = ${fmt(r)}$. Which description fits?`,
      parts: [part(mc(rng, STRENGTHS[i]!, STRENGTHS.filter((_, j) => j !== i)))],
      hints: ['The sign of $r$ gives the direction: positive when the points rise from left to right, negative when they fall.', 'The size of $r$ gives the strength: close to $1$ or $-1$ is strong, and close to $0$ means little or no linear correlation.'],
      solution: [`$r = ${fmt(r)}$ is ${r > 0.1 ? 'positive' : r < -0.1 ? 'negative' : 'close to 0'}${Math.abs(r) >= 0.8 ? ' and close to ' + (r > 0 ? '$1$' : '$-1$') : ''}, so there is ${STRENGTHS[i]}.`],
    };
  }
  if (d === 2) {
    const s = rng.pick([1, -1, 0] as const);
    const right = kindSign(s);
    const choices = (['>', '<', '\\ne'] as const).filter((x) => x !== right).map(rhoH);
    choices.push(`$H_0$: $r = 0$, $\\ H_1$: $r ${right} 0$`);
    return {
      prompt: `A researcher takes a random sample to test whether there is ${kindWords(s)} between ${pair.x} and ${pair.y}. Which hypotheses should be used, where $\\rho$ is the population correlation coefficient?`,
      parts: [part(mc(rng, rhoH(right), choices))],
      hints: ['The hypotheses are about the population, so they use $\\rho$, not the sample value $r$.', s === 0 ? 'A test for correlation in either direction is two-tailed: $H_1$ uses $\\ne$.' : 'A test for one direction is one-tailed: $H_1$ uses $>$ or $<$.'],
      solution: [`$H_0$: $\\rho = 0$ (no correlation in the population).`, `The test is for ${kindWords(s)}, so $H_1$: $\\rho ${right} 0$${s === 0 ? ', a two-tailed test' : ', a one-tailed test'}.`],
    };
  }
  const t = testCase(rng, pair);
  const sign = pair.sign;
  const good = t.reject
    ? `Reject $H_0$: there is evidence of ${kindWords(sign)} between ${pair.x} and ${pair.y}.`
    : `Do not reject $H_0$: there is not enough evidence of ${kindWords(sign)} between ${pair.x} and ${pair.y}.`;
  const bad = [
    t.reject
      ? `Do not reject $H_0$: there is not enough evidence of ${kindWords(sign)} between ${pair.x} and ${pair.y}.`
      : `Reject $H_0$: there is evidence of ${kindWords(sign)} between ${pair.x} and ${pair.y}.`,
    `Reject $H_0$: ${pair.x} causes a change in ${pair.y}.`,
    `Do not reject $H_0$: this proves there is no correlation between ${pair.x} and ${pair.y}.`,
  ];
  return {
    prompt: `A random sample of $${t.n}$ pairs of values gives a product moment correlation coefficient of $r = ${f4(t.r)}$ between ${pair.x} and ${pair.y}. A test at the $${pct(t.alpha)}$ level uses ${rhoH(kindSign(sign))}, and the critical value is $${f4(t.crit)}$. Which conclusion is right?`,
    parts: [part(mc(rng, good, bad))],
    hints: [`Compare $|r| = ${f4(Math.abs(t.r))}$ with the critical value $${f4(t.crit)}$.`, 'Correlation is not causation, and not rejecting $H_0$ never proves it true.'],
    solution: [`$|r| = ${f4(Math.abs(t.r))}$ ${t.reject ? '>' : '<'} $${f4(t.crit)}$, so the result is ${t.reject ? '' : 'not '}significant.`, good],
  };
}

function pmccTest(rng: Rng, d: Difficulty): Out {
  const pair = rng.pick(PAIRS);
  const summary = () => {
    const sxx = roundTo(rng.int(400, 9000) / 10, 1);
    const syy = roundTo(rng.int(400, 9000) / 10, 1);
    const target = pair.sign * rng.int(10, 97) / 100;
    const sxy = roundTo(target * Math.sqrt(sxx * syy), 1);
    return { sxx, syy, sxy, r: sxy / Math.sqrt(sxx * syy) };
  };
  if (d === 1) {
    const s = summary();
    return {
      prompt: `For a sample of pairs of values of ${pair.x}, $x$, and ${pair.y}, $y$: $S_{xx} = ${fmt(s.sxx)}$, $S_{yy} = ${fmt(s.syy)}$ and $S_{xy} = ${fmt(s.sxy)}$. Find the product moment correlation coefficient $r$, to 4 decimal places.`,
      parts: [p4(s.r, '$r =$')],
      hints: ['$r = \\dfrac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}$.', 'The answer must lie between $-1$ and $1$; its sign is the sign of $S_{xy}$.'],
      solution: [`$r = \\dfrac{${fmt(s.sxy)}}{\\sqrt{${fmt(s.sxx)} \\times ${fmt(s.syy)}}} \\approx ${f4(s.r)}$`],
      calculator: true,
    };
  }
  const sign = pair.sign;
  const conclusion = () => [
    `Reject $H_0$: there is evidence of ${kindWords(sign)} between ${pair.x} and ${pair.y}`,
    `Do not reject $H_0$: there is not enough evidence of ${kindWords(sign)} between ${pair.x} and ${pair.y}`,
  ] as const;
  if (d === 2) {
    const t = testCase(rng, pair);
    const [yes, no] = conclusion();
    return {
      prompt: `A random sample of $${t.n}$ pairs gives a product moment correlation coefficient of $r = ${f4(t.r)}$ between ${pair.x} and ${pair.y}. Test, at the $${pct(t.alpha)}$ significance level, whether there is ${kindWords(sign)}. The critical value for this test is $${f4(t.crit)}$.`,
      parts: [part(fixedChoice([yes, no], t.reject ? 0 : 1), { label: 'Conclusion:' })],
      hints: [`The hypotheses are ${rhoH(kindSign(sign))}.`, `Reject $H_0$ if $r$ is beyond the critical value: ${sign > 0 ? `$r > ${f4(t.crit)}$` : `$r < -${f4(t.crit)}$`}.`],
      solution: [`${rhoH(kindSign(sign))}.`, `$r = ${f4(t.r)}$ ${sign > 0 ? (t.reject ? '>' : '<') : t.reject ? '<' : '>'} $${sign > 0 ? '' : '-'}${f4(t.crit)}$, so the result is ${t.reject ? '' : 'not '}significant.`, `${t.reject ? yes : no}.`],
    };
  }
  const [s, n, alpha, crit] = retry(
    () => {
      const s = summary();
      const n = rng.int(8, 30);
      const alpha = rng.pick([0.05, 0.01, 0.1]);
      return [s, n, alpha, pmccCritical(n, alpha)] as const;
    },
    ([s, , , c]) => Math.abs(Math.abs(s.r) - c) > 0.04 && Math.sign(s.r) === sign,
    100,
  );
  const reject = Math.abs(s.r) > crit;
  const [yes, no] = conclusion();
  return {
    prompt: `For a random sample of $${n}$ pairs of values of ${pair.x}, $x$, and ${pair.y}, $y$: $S_{xx} = ${fmt(s.sxx)}$, $S_{yy} = ${fmt(s.syy)}$ and $S_{xy} = ${fmt(s.sxy)}$. Find $r$ to 4 decimal places, and test at the $${pct(alpha)}$ level whether there is ${kindWords(sign)}. The critical value for this test is $${f4(crit)}$.`,
    parts: [p4(s.r, '$r =$'), part(fixedChoice([yes, no], reject ? 0 : 1), { label: 'Conclusion:' })],
    hints: ['$r = \\dfrac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}$.', `Use ${rhoH(kindSign(sign))}, and compare $r$ with the critical value.`],
    solution: [`$r = \\dfrac{${fmt(s.sxy)}}{\\sqrt{${fmt(s.sxx)} \\times ${fmt(s.syy)}}} \\approx ${f4(s.r)}$`, `${rhoH(kindSign(sign))}. $|r| = ${f4(Math.abs(s.r))}$ ${reject ? '>' : '<'} $${f4(crit)}$, so the result is ${reject ? '' : 'not '}significant.`, `${reject ? yes : no}.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 15.2 The inverse normal distribution
// ---------------------------------------------------------------------------

interface Measure {
  what: string;
  unit: string;
  mu: [number, number];
  sd: [number, number];
}

const MEASURES: Measure[] = [
  { what: 'The heights of adult women in a town', unit: 'cm', mu: [158, 172], sd: [5, 9] },
  { what: 'The masses of apples from an orchard', unit: 'g', mu: [120, 180], sd: [10, 25] },
  { what: 'The times taken to run a fun run', unit: 'minutes', mu: [30, 60], sd: [4, 10] },
  { what: 'The lifetimes of a type of battery', unit: 'hours', mu: [300, 600], sd: [20, 60] },
  { what: 'The lengths of bolts made by a machine', unit: 'mm', mu: [40, 80], sd: [2, 5] },
];

const PROBS = [0.01, 0.025, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 0.975, 0.99];
const z4 = (z: number) => fmtFixed(z, 4);

function inverseNormal(rng: Rng, d: Difficulty): Out {
  const m = rng.pick(MEASURES);
  const mu = rng.int(m.mu[0], m.mu[1]);
  const sd = rng.int(m.sd[0], m.sd[1]);
  const def = `${m.what} are modelled by $X \\sim \\mathrm{N}(${mu}, ${sd}^2)$, in ${m.unit}.`;
  if (d === 1) {
    const p = rng.pick(PROBS);
    const z = invNormal(p);
    const a = mu + sd * z;
    return {
      prompt: `${def} Find the value $a$ with $P(X < a) = ${fmt(p)}$. ${SF_TEXT}`,
      parts: [sfPart(a, { label: '$a =$', suffix: m.unit })],
      hints: ['Use the inverse normal function of your calculator, with the area to the left of $a$.', `Or standardize: $\\dfrac{a - ${mu}}{${sd}} = z$, where $P(Z < z) = ${fmt(p)}$.`],
      solution: [`$P(Z < z) = ${fmt(p)}$ gives $z \\approx ${z4(z)}$.`, `$a = ${mu} + ${sd} \\times ${z < 0 ? `(${z4(z)})` : z4(z)} ${eq3(a)}$ ${m.unit}`],
      calculator: true,
    };
  }
  if (d === 2) {
    const p = rng.pick(PROBS.filter((x) => x < 0.5));
    const z = invNormal(1 - p);
    const a = mu + sd * z;
    return {
      prompt: `${def} The top $${fmt(p * 100)}\\%$ of values are above $a$ ${m.unit}. Find $a$. ${SF_TEXT}`,
      parts: [sfPart(a, { label: '$a =$', suffix: m.unit })],
      hints: [`$P(X > a) = ${fmt(p)}$, so $P(X < a) = ${fmt(1 - p)}$.`, 'Use the inverse normal function with the area to the left.'],
      solution: [`$P(X < a) = 1 - ${fmt(p)} = ${fmt(1 - p)}$, so $z \\approx ${z4(z)}$.`, `$a = ${mu} + ${sd} \\times ${z4(z)} ${eq3(a)}$ ${m.unit}`],
      calculator: true,
    };
  }
  const p = rng.pick([0.5, 0.6, 0.8, 0.9, 0.95, 0.99]);
  const z = invNormal((1 + p) / 2);
  const [lo, hi] = [mu - sd * z, mu + sd * z];
  return {
    prompt: `${def} The middle $${fmt(p * 100)}\\%$ of values lie between $a$ and $b$, symmetrically about the mean. Find $a$ and $b$. ${SF_TEXT}`,
    parts: [sfPart(lo, { label: '$a =$', suffix: m.unit }), sfPart(hi, { label: '$b =$', suffix: m.unit })],
    hints: [`The two tails hold $${fmt(100 - p * 100)}\\%$ between them, so $${fmt((100 - p * 100) / 2)}\\%$ each.`, `So $P(X < b) = ${fmt((1 + p) / 2)}$; then $a$ is as far below the mean as $b$ is above it.`],
    solution: [`$P(Z < z) = ${fmt((1 + p) / 2)}$ gives $z \\approx ${z4(z)}$.`, `$b = ${mu} + ${sd} \\times ${z4(z)} ${eq3(hi)}$ and $a = ${mu} - ${sd} \\times ${z4(z)} ${eq3(lo)}$ (${m.unit}).`],
    calculator: true,
  };
}

function normalParameters(rng: Rng, d: Difficulty): Out {
  const m = rng.pick(MEASURES);
  const mu = rng.int(m.mu[0], m.mu[1]);
  const sd = rng.int(m.sd[0], m.sd[1]);
  if (d === 1) {
    const p = rng.pick(PROBS);
    const z = invNormal(p);
    const a = Math.round(mu + sd * z);
    const s = (a - mu) / z;
    return {
      prompt: `${m.what} are normally distributed with mean $${mu}$ ${m.unit} and standard deviation $\\sigma$ ${m.unit}. $P(X < ${a}) = ${fmt(p)}$. Find $\\sigma$. ${SF_TEXT}`,
      parts: [sfPart(s, { label: '$\\sigma =$', suffix: m.unit })],
      hints: [`Find the $z$ with $P(Z < z) = ${fmt(p)}$.`, `Then $\\dfrac{${a} - ${mu}}{\\sigma} = z$; solve for $\\sigma$.`],
      solution: [`$P(Z < z) = ${fmt(p)}$ gives $z \\approx ${z4(z)}$.`, `$\\dfrac{${a} - ${mu}}{\\sigma} = ${z4(z)}$, so $\\sigma = \\dfrac{${a - mu}}{${z4(z)}} ${eq3(s)}$ ${m.unit}`],
      calculator: true,
    };
  }
  if (d === 2) {
    const p = rng.pick(PROBS.filter((x) => x < 0.5));
    const z = invNormal(1 - p);
    const a = Math.round(mu + sd * z);
    const M = a - sd * z;
    return {
      prompt: `${m.what} are normally distributed with mean $\\mu$ ${m.unit} and standard deviation $${sd}$ ${m.unit}. $P(X > ${a}) = ${fmt(p)}$. Find $\\mu$. ${SF_TEXT}`,
      parts: [sfPart(M, { label: '$\\mu =$', suffix: m.unit })],
      hints: [`$P(X < ${a}) = ${fmt(1 - p)}$; find the matching $z$.`, `Then $\\dfrac{${a} - \\mu}{${sd}} = z$; solve for $\\mu$.`],
      solution: [`$P(Z < z) = ${fmt(1 - p)}$ gives $z \\approx ${z4(z)}$.`, `$\\dfrac{${a} - \\mu}{${sd}} = ${z4(z)}$, so $\\mu = ${a} - ${sd} \\times ${z4(z)} ${eq3(M)}$ ${m.unit}`],
      calculator: true,
    };
  }
  const p1 = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
  const p2 = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
  const [z1, z2] = [invNormal(p1), invNormal(1 - p2)];
  const [a, b] = [Math.round(mu + sd * z1), Math.round(mu + sd * z2)];
  const S = (b - a) / (z2 - z1);
  const M = a - S * z1;
  return {
    prompt: `${m.what} are normally distributed with mean $\\mu$ and standard deviation $\\sigma$. $P(X < ${a}) = ${fmt(p1)}$ and $P(X > ${b}) = ${fmt(p2)}$. Find $\\mu$ and $\\sigma$. ${SF_TEXT}`,
    parts: [sfPart(M, { label: '$\\mu =$', suffix: m.unit }), sfPart(S, { label: '$\\sigma =$', suffix: m.unit })],
    hints: ['Turn each probability into a $z$-value, and write $\\mu + z\\sigma = $ the value for each.', 'That gives two simultaneous equations in $\\mu$ and $\\sigma$.'],
    solution: [
      `$P(Z < z_1) = ${fmt(p1)}$ gives $z_1 \\approx ${z4(z1)}$, so $\\mu ${z1 < 0 ? '-' : '+'} ${z4(Math.abs(z1))}\\sigma = ${a}$.`,
      `$P(Z < z_2) = ${fmt(1 - p2)}$ gives $z_2 \\approx ${z4(z2)}$, so $\\mu + ${z4(z2)}\\sigma = ${b}$.`,
      `Subtracting: $${z4(z2 - z1)}\\sigma = ${b - a}$, so $\\sigma ${eq3(S)}$, and $\\mu = ${a} ${z1 < 0 ? '+' : '-'} ${z4(Math.abs(z1))}\\sigma ${eq3(M)}$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 15.3 The normal approximation to the binomial
// ---------------------------------------------------------------------------

interface Count {
  setup: (n: number) => string;
  p: number;
  what: string;
}

const COUNTS: Count[] = [
  { setup: (n) => `A fair coin is tossed $${n}$ times.`, p: 0.5, what: 'heads' },
  { setup: (n) => `In a large town, $40\\%$ of adults cycle to work. A random sample of $${n}$ adults is chosen.`, p: 0.4, what: 'adults who cycle to work' },
  { setup: (n) => `Of the seeds in a large sack, $70\\%$ germinate. $${n}$ seeds are planted.`, p: 0.7, what: 'seeds that germinate' },
  { setup: (n) => `A basketball player scores $45\\%$ of her free throws, independently of each other. She takes $${n}$ free throws.`, p: 0.45, what: 'free throws scored' },
  { setup: (n) => `In a large school, $35\\%$ of students walk to school. A random sample of $${n}$ students is chosen.`, p: 0.35, what: 'students who walk to school' },
  { setup: (n) => `Of the eggs from a farm, $60\\%$ are large. A random sample of $${n}$ eggs is taken.`, p: 0.6, what: 'large eggs' },
];

type Ineq = '<' | '\\le' | '>' | '\\ge';
/** The continuity-corrected boundary for X (ineq) r, and whether Y is below it. */
function corrected(ineq: Ineq, r: number): { c: number; below: boolean } {
  if (ineq === '\\le') return { c: r + 0.5, below: true };
  if (ineq === '<') return { c: r - 0.5, below: true };
  if (ineq === '\\ge') return { c: r - 0.5, below: false };
  return { c: r + 0.5, below: false };
}

function approxCase(rng: Rng) {
  const t = rng.pick(COUNTS);
  const n = rng.pick([40, 50, 60, 80, 100, 120, 150, 200]);
  const mu = n * t.p;
  const v = n * t.p * (1 - t.p);
  return { t, n, mu, v, sd: Math.sqrt(v) };
}

function normalApproxSetup(rng: Rng, d: Difficulty): Out {
  const { t, n, mu, v } = approxCase(rng);
  const X = `$X \\sim \\mathrm{B}(${n}, ${fmt(t.p)})$`;
  if (d === 1) {
    return {
      prompt: `${X} is approximated by $Y \\sim \\mathrm{N}(\\mu, \\sigma^2)$. Find $\\mu$ and $\\sigma^2$.`,
      parts: [numPart(mu, { label: '$\\mu =$', exact: false, display: 'decimal' }), numPart(roundTo(v, 6), { label: '$\\sigma^2 =$', exact: false, display: 'decimal' })],
      hints: ['The approximating normal distribution has the same mean and variance as the binomial.', 'For $\\mathrm{B}(n, p)$, the mean is $np$ and the variance is $np(1 - p)$.'],
      solution: [`$\\mu = np = ${n} \\times ${fmt(t.p)} = ${fmt(mu)}$`, `$\\sigma^2 = np(1 - p) = ${n} \\times ${fmt(t.p)} \\times ${fmt(1 - t.p)} = ${fmt(roundTo(v, 6))}$`],
    };
  }
  const r = Math.round(mu) + rng.int(-6, 6);
  if (d === 2) {
    const ineq = rng.pick(['<', '\\le', '>', '\\ge'] as const);
    const { c, below } = corrected(ineq, r);
    return {
      prompt: `${X} is approximated by $Y \\sim \\mathrm{N}(${fmt(mu)}, ${fmt(roundTo(v, 6))})$. Using a continuity correction, $P(X ${ineq} ${r}) \\approx P(Y ${below ? '<' : '>'} c)$. Find $c$.`,
      parts: [numPart(c, { label: '$c =$', exact: false, display: 'decimal' })],
      hints: ['Each whole number $k$ of the binomial becomes the interval from $k - 0.5$ to $k + 0.5$ of the normal.', `Decide whether $${r}$ itself is included, then go half a unit past or short of it.`],
      solution: [`$X ${ineq} ${r}$ ${ineq === '\\le' || ineq === '\\ge' ? `includes $${r}$` : `leaves out $${r}$`}, so ${below ? `the values go up to $${fmt(c)}$` : `the values start from $${fmt(c)}$`}.`, `$P(X ${ineq} ${r}) \\approx P(Y ${below ? '<' : '>'} ${fmt(c)})$, so $c = ${fmt(c)}$.`],
    };
  }
  const a = r - rng.int(3, 8);
  const [lowIneq, highIneq] = [rng.pick(['<', '\\le'] as const), rng.pick(['<', '\\le'] as const)];
  const lo = lowIneq === '<' ? a + 0.5 : a - 0.5;
  const hi = highIneq === '<' ? r - 0.5 : r + 0.5;
  return {
    prompt: `${X} is approximated by $Y \\sim \\mathrm{N}(${fmt(mu)}, ${fmt(roundTo(v, 6))})$. Using a continuity correction, $P(${a} ${lowIneq} X ${highIneq} ${r}) \\approx P(c < Y < d)$. Find $c$ and $d$.`,
    parts: [numPart(lo, { label: '$c =$', exact: false, display: 'decimal' }), numPart(hi, { label: '$d =$', exact: false, display: 'decimal' })],
    hints: ['List the whole numbers included, from the smallest to the largest.', 'Then go half a unit below the smallest and half a unit above the largest.'],
    solution: [`The whole numbers included run from $${lowIneq === '<' ? a + 1 : a}$ to $${highIneq === '<' ? r - 1 : r}$.`, `So $P(${a} ${lowIneq} X ${highIneq} ${r}) \\approx P(${fmt(lo)} < Y < ${fmt(hi)})$: $c = ${fmt(lo)}$ and $d = ${fmt(hi)}$.`],
  };
}

function normalApprox(rng: Rng, d: Difficulty): Out {
  const { t, n, mu, v, sd } = approxCase(rng);
  const Y = `$Y \\sim \\mathrm{N}(${fmt(mu)}, ${fmt(roundTo(v, 6))})$`;
  const intro = `${t.setup(n)} Use a normal approximation, with a continuity correction, to find the probability`;
  const steps = [`Let $X$ be the number of ${t.what}: $X \\sim \\mathrm{B}(${n}, ${fmt(t.p)})$, approximated by ${Y}.`];
  const r = Math.round(mu) + rng.int(-6, 6);
  const cdf = (y: number) => normalCdf((y - mu) / sd);
  if (d < 3) {
    const ineq: Ineq = d === 1 ? rng.pick(['\\le', '<'] as const) : rng.pick(['\\ge', '>'] as const);
    const { c, below } = corrected(ineq, r);
    const pr = below ? cdf(c) : 1 - cdf(c);
    const words = { '\\le': `at most $${r}$`, '<': `fewer than $${r}$`, '\\ge': `at least $${r}$`, '>': `more than $${r}$` }[ineq];
    return {
      prompt: `${intro} of ${words} ${t.what}, to 4 decimal places.`,
      parts: [p4(pr)],
      hints: [`$X \\sim \\mathrm{B}(${n}, ${fmt(t.p)})$ has mean $np$ and variance $np(1 - p)$; use them for the normal $Y$.`, `With the continuity correction, $P(X ${ineq} ${r}) \\approx P(Y ${below ? '<' : '>'} ${fmt(c)})$.`],
      solution: [...steps, `$P(X ${ineq} ${r}) \\approx P(Y ${below ? '<' : '>'} ${fmt(c)})${below ? '' : ` = 1 - P(Y < ${fmt(c)})`} \\approx ${f4(pr)}$`],
      calculator: true,
    };
  }
  const a = r - rng.int(3, 8);
  const lo = a - 0.5;
  const hi = r + 0.5;
  const pr = cdf(hi) - cdf(lo);
  return {
    prompt: `${intro} of between $${a}$ and $${r}$ ${t.what}, inclusive, to 4 decimal places.`,
    parts: [p4(pr)],
    hints: ['Find the mean $np$ and variance $np(1 - p)$ for the normal distribution.', `“Between $${a}$ and $${r}$ inclusive” covers $${a}, ${a + 1}, \\ldots, ${r}$, so use $P(${fmt(lo)} < Y < ${fmt(hi)})$.`],
    solution: [...steps, `$P(${a} \\le X \\le ${r}) \\approx P(${fmt(lo)} < Y < ${fmt(hi)}) \\approx ${f4(pr)}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 15.4 Hypothesis testing for the mean of a normal distribution
// ---------------------------------------------------------------------------

interface MeanCtx {
  setup: (mu: number, sd: number) => string;
  mu: number[];
  sd: number[];
  unit: string;
  sample: (n: number, xbar: string) => string;
  up: string;
  down: string;
  change: string;
}

const MEAN_CTX: MeanCtx[] = [
  { setup: (mu, sd) => `A machine fills bags of flour with masses that are normally distributed with mean $${mu}$ g and standard deviation $${sd}$ g.`, mu: [500, 750, 1000], sd: [6, 8, 10, 12, 15], unit: 'g', sample: (n, x) => `A random sample of $${n}$ bags has a mean mass of $${x}$ g.`, up: 'the mean mass has increased', down: 'the mean mass has decreased', change: 'the mean mass has changed' },
  { setup: (mu, sd) => `The times taken to answer calls at a help desk are normally distributed with mean $${mu}$ seconds and standard deviation $${sd}$ seconds.`, mu: [60, 90, 120], sd: [10, 12, 15, 20], unit: 'seconds', sample: (n, x) => `After new training, a random sample of $${n}$ calls has a mean time of $${x}$ seconds.`, up: 'the mean time has increased', down: 'the training has reduced the mean time', change: 'the mean time has changed' },
  { setup: (mu, sd) => `The lengths of rods cut by a machine are normally distributed with mean $${mu}$ mm and standard deviation $${sd}$ mm.`, mu: [200, 250, 300], sd: [2, 3, 4, 5], unit: 'mm', sample: (n, x) => `A random sample of $${n}$ rods has a mean length of $${x}$ mm.`, up: 'the mean length has increased', down: 'the mean length has decreased', change: 'the mean length has changed' },
  { setup: (mu, sd) => `The heights of a type of sunflower are normally distributed with mean $${mu}$ cm and standard deviation $${sd}$ cm.`, mu: [150, 180, 200], sd: [12, 15, 20], unit: 'cm', sample: (n, x) => `Grown with a new plant food, a random sample of $${n}$ sunflowers has a mean height of $${x}$ cm.`, up: 'the plant food increases the mean height', down: 'the mean height has decreased', change: 'the mean height has changed' },
];

function sampleMean(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(MEAN_CTX);
  const mu = rng.pick(c.mu);
  const sd = rng.pick(c.sd);
  const n = rng.pick([4, 5, 8, 9, 10, 12, 16, 20, 25, 36]);
  const se = sd / Math.sqrt(n);
  const intro = `${c.setup(mu, sd)} A random sample of $${n}$ is taken, and $\\bar{X}$ is its mean.`;
  if (d === 1) {
    return {
      prompt: `${intro} Find the mean and the standard deviation of $\\bar{X}$. ${SF_TEXT}`,
      parts: [numPart(mu, { label: 'Mean:', suffix: c.unit }), sfPart(se, { label: 'Standard deviation:', suffix: c.unit })],
      hints: ['$\\bar{X} \\sim \\mathrm{N}\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)$: the same mean, and a smaller spread.', 'So the standard deviation of $\\bar{X}$ is $\\dfrac{\\sigma}{\\sqrt{n}}$.'],
      solution: [`$\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$, so its mean is $${mu}$ ${c.unit}.`, `Its standard deviation is $\\dfrac{${sd}}{\\sqrt{${n}}} ${eq3(se)}$ ${c.unit}.`],
      calculator: true,
    };
  }
  const cdf = (x: number) => normalCdf((x - mu) / se);
  const step = Math.max(1, Math.round(se));
  if (d === 2) {
    const a = mu + rng.sign() * step * rng.int(1, 3) * (rng.chance(0.5) ? 0.5 : 1);
    const above = rng.chance(0.5);
    const pr = above ? 1 - cdf(a) : cdf(a);
    return {
      prompt: `${intro} Find $P(\\bar{X} ${above ? '>' : '<'} ${fmt(a)})$, to 4 decimal places.`,
      parts: [p4(pr)],
      hints: ['First write the distribution of $\\bar{X}$: $\\mathrm{N}\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)$.', 'Then find the probability with the normal function of your calculator, using the standard deviation of $\\bar{X}$.'],
      solution: [`$\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$, with standard deviation $${s3(se)}$.`, `$P(\\bar{X} ${above ? '>' : '<'} ${fmt(a)}) \\approx ${f4(pr)}$`],
      calculator: true,
    };
  }
  const a = mu - step * rng.int(1, 3);
  const b = mu + step * rng.int(1, 3);
  const pr = cdf(b) - cdf(a);
  return {
    prompt: `${intro} Find the probability that $\\bar{X}$ is between $${a}$ and $${b}$ ${c.unit}, to 4 decimal places.`,
    parts: [p4(pr)],
    hints: ['$\\bar{X} \\sim \\mathrm{N}\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)$.', `$P(${a} < \\bar{X} < ${b}) = P(\\bar{X} < ${b}) - P(\\bar{X} < ${a})$.`],
    solution: [`$\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$, with standard deviation $${s3(se)}$.`, `$P(${a} < \\bar{X} < ${b}) \\approx ${f4(pr)}$`],
    calculator: true,
  };
}

function normalMeanTest(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(MEAN_CTX);
  const mu = rng.pick(c.mu);
  const sd = rng.pick(c.sd);
  const alpha = rng.pick([0.05, 0.01, 0.1, 0.05]);
  const H = (s: string) => `$H_0$: $\\mu = ${mu}$, $\\ H_1$: $\\mu ${s} ${mu}$`;
  if (d < 3) {
    const up = d === 1;
    const [n, xbar, pv] = retry(
      () => {
        const n = rng.pick([8, 10, 12, 15, 16, 20, 25, 30, 40]);
        const se = sd / Math.sqrt(n);
        const xbar = roundTo(mu + (up ? 1 : -1) * se * rng.int(5, 30) / 10, 1);
        const z = (xbar - mu) / (sd / Math.sqrt(n));
        return [n, xbar, up ? 1 - normalCdf(z) : normalCdf(z)] as const;
      },
      ([, , pv]) => Math.abs(pv - alpha) > 0.004 && pv > 0.0005,
      100,
    );
    const claim = up ? c.up : c.down;
    const reject = pv < alpha;
    const se = sd / Math.sqrt(n);
    return {
      prompt: `${c.setup(mu, sd)} ${c.sample(n, fmt(xbar))} Test, at the $${pct(alpha)}$ significance level, whether ${claim}, with ${H(up ? '>' : '<')}. Assume the standard deviation is unchanged. Find the p-value $P(\\bar{X} ${up ? '\\ge' : '\\le'} ${fmt(xbar)})$ to 4 decimal places, and give the conclusion.`,
      parts: [
        p4(pv, 'p-value:'),
        part(fixedChoice([`Reject $H_0$: there is evidence that ${claim}`, `Do not reject $H_0$: there is not enough evidence that ${claim}`], reject ? 0 : 1), { label: 'Conclusion:' }),
      ],
      hints: [`Under $H_0$, $\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$.`, `Find $P(\\bar{X} ${up ? '\\ge' : '\\le'} ${fmt(xbar)})$ and compare it with $${fmt(alpha)}$.`],
      solution: [
        `Under $H_0$, $\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$, with standard deviation $${s3(se)}$.`,
        `$P(\\bar{X} ${up ? '\\ge' : '\\le'} ${fmt(xbar)}) \\approx ${f4(pv)}$`,
        reject ? `$${f4(pv)} < ${fmt(alpha)}$, so reject $H_0$: there is evidence that ${claim}.` : `$${f4(pv)} > ${fmt(alpha)}$, so do not reject $H_0$: there is not enough evidence that ${claim}.`,
      ],
      calculator: true,
    };
  }
  const n = rng.pick([9, 10, 12, 16, 20, 25, 30]);
  const se = sd / Math.sqrt(n);
  const z = invNormal(1 - alpha / 2);
  const [lo, hi] = [mu - z * se, mu + z * se];
  const xbar = retry(
    () => roundTo(mu + rng.sign() * se * rng.int(5, 35) / 10, 1),
    (x) => Math.abs(x - lo) > Math.max(0.2, 0.05 * se) && Math.abs(x - hi) > Math.max(0.2, 0.05 * se),
    100,
  );
  const reject = xbar < lo || xbar > hi;
  return {
    prompt: `${c.setup(mu, sd)} A test at the $${pct(alpha)}$ significance level is planned to see whether ${c.change}, using the mean of a random sample of $${n}$, with ${H('\\ne')}. Assume the standard deviation is unchanged. Find the critical region for $\\bar{X}$, $\\bar{X} < a$ or $\\bar{X} > b$, with $a$ and $b$ to 1 decimal place. The sample mean turns out to be $${fmt(xbar)}$ ${c.unit}; give the conclusion.`,
    parts: [
      numPart(lo, { label: '$a =$', suffix: c.unit, decimals: 1 }),
      numPart(hi, { label: '$b =$', suffix: c.unit, decimals: 1 }),
      part(fixedChoice([`Reject $H_0$: there is evidence that ${c.change}`, `Do not reject $H_0$: there is not enough evidence that ${c.change}`], reject ? 0 : 1), { label: 'Conclusion:' }),
    ],
    hints: [`The test is two-tailed, so each tail holds $${fmt((alpha / 2) * 100)}\\%$.`, `Under $H_0$, $\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$; find $b$ with $P(\\bar{X} > b) = ${fmt(alpha / 2)}$, and $a$ the same distance below the mean.`],
    solution: [
      `Under $H_0$, $\\bar{X} \\sim \\mathrm{N}\\left(${mu}, \\dfrac{${sd}^2}{${n}}\\right)$, with standard deviation $${s3(se)}$.`,
      `$P(Z > z) = ${fmt(alpha / 2)}$ gives $z \\approx ${z4(z)}$, so $a = ${mu} - ${z4(z)} \\times ${s3(se)} \\approx ${fmtFixed(lo, 1)}$ and $b = ${mu} + ${z4(z)} \\times ${s3(se)} \\approx ${fmtFixed(hi, 1)}$.`,
      reject
        ? `$${fmt(xbar)}$ is in the critical region, so reject $H_0$: there is evidence that ${c.change}.`
        : `$${fmt(xbar)}$ is not in the critical region, so do not reject $H_0$: there is not enough evidence that ${c.change}.`,
    ],
    calculator: true,
  };
}

export const NORMAL_SKILLS: SkillDef[] = [
  skill({ id: 'mx-pmcc-interpret', name: 'Interpreting correlation', description: 'Describe correlation from r, write hypotheses for a test of ρ, and choose the right conclusion', outcomes: ['SN1'], lessonId: 'mx-15-1', format: 'mc', gen: pmccInterpret }),
  skill({ id: 'mx-pmcc-test', name: 'Testing correlation', description: 'Find r from summary statistics, and test it for significance against a critical value', outcomes: ['SN1'], lessonId: 'mx-15-1', calculator: true, gen: pmccTest }),
  skill({ id: 'mx-inverse-normal', name: 'The inverse normal distribution', description: 'Find the value with a given probability below it, above it, or in the middle of a normal distribution', outcomes: ['SN2'], lessonId: 'mx-15-2', calculator: true, gen: inverseNormal }),
  skill({ id: 'mx-normal-parameters', name: 'Finding μ and σ', description: 'Find an unknown mean or standard deviation, or both, from normal probabilities', outcomes: ['SN2'], lessonId: 'mx-15-2', calculator: true, gen: normalParameters }),
  skill({ id: 'mx-normal-approx-setup', name: 'Setting up a normal approximation', description: 'Find the mean and variance of the approximating normal, and apply a continuity correction', outcomes: ['SN3'], lessonId: 'mx-15-3', gen: normalApproxSetup }),
  skill({ id: 'mx-normal-approx', name: 'The normal approximation to the binomial', description: 'Approximate binomial probabilities with a normal distribution and a continuity correction', outcomes: ['SN3'], lessonId: 'mx-15-3', calculator: true, gen: normalApprox }),
  skill({ id: 'mx-sample-mean', name: 'The distribution of a sample mean', description: 'Use X̄ ~ N(μ, σ²/n) to find the spread of a sample mean and probabilities about it', outcomes: ['SN4'], lessonId: 'mx-15-4', calculator: true, gen: sampleMean }),
  skill({ id: 'mx-normal-mean-test', name: 'Testing a normal mean', description: 'Test the mean of a normal distribution with a p-value, or with a two-tailed critical region', outcomes: ['SN4'], lessonId: 'mx-15-4', calculator: true, gen: normalMeanTest }),
];
