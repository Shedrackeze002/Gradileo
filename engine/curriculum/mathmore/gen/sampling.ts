/**
 * More Mathematics Topics, Unit 14: A level statistics in the first year. Sampling methods,
 * variance and standard deviation from summary statistics and coding, outliers and cleaning data,
 * discrete random variables, the binomial distribution, and hypothesis tests for a binomial
 * proportion.
 */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { eq3, listTex, N, s3, SF_TEXT, sfPart, sum } from './common.ts';

type Out = GenOutput;

/** n choose r. */
export function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let c = 1;
  for (let i = 1; i <= r; i++) c = (c * (n - r + i)) / i;
  return Math.round(c);
}
export const binomPmf = (n: number, p: number, r: number) => (r < 0 || r > n ? 0 : nCr(n, r) * p ** r * (1 - p) ** (n - r));
/** P(X ≤ r) for X ~ B(n, p). */
export function binomCdf(n: number, p: number, r: number): number {
  let s = 0;
  for (let i = 0; i <= Math.min(r, n); i++) s += binomPmf(n, p, i);
  return Math.min(1, s);
}
/** A probability to 4 decimal places. */
const p4 = (v: number, label?: string) => numPart(v, { decimals: 4, label });
const f4 = (v: number) => fmtFixed(v, 4);
/** A probability as text: 0.5, or a fraction such as 1/6. */
const pTex = (p: number, tex?: string) => tex ?? fmt(p);

// ---------------------------------------------------------------------------
// 14.1 Sampling methods
// ---------------------------------------------------------------------------

interface Method {
  name: string;
  how: string;
  minus: string;
  scene: (r: Rng) => string;
}

const METHODS: Method[] = [
  {
    name: 'Simple random sampling',
    how: 'Every member of the population is numbered, and the numbers for the sample are chosen at random, so every possible sample is equally likely.',
    minus: 'It needs a full list of the population, which may be hard to get for a large population.',
    scene: (r) => { const n = r.int(300, 900); return `Each of the ${n} members of a sports club is given a number from 1 to ${n}, and a random number generator picks ${r.int(20, 60)} of the numbers.`; },
  },
  {
    name: 'Systematic sampling',
    how: 'Members are chosen at regular intervals from an ordered list, starting from a randomly chosen member near the start.',
    minus: 'If the list has a repeating pattern, the sample can be biased.',
    scene: (r) => { const k = r.int(5, 20); return `From an alphabetical list of the members of a sports club, one of the first ${k} names is picked at random, and then every ${k}th name after it.`; },
  },
  {
    name: 'Stratified sampling',
    how: 'The population is split into groups, and members are chosen at random from each group in proportion to the size of the group.',
    minus: 'It needs a list of the members of every group, and the groups must not overlap.',
    scene: (r) => { const [a, b] = [r.int(10, 40) * 10, r.int(10, 40) * 10]; return `The members of a sports club are split into ${a} juniors and ${b} seniors, and members are picked at random from each group in proportion to the size of the group.`; },
  },
  {
    name: 'Quota sampling',
    how: 'An interviewer chooses people who fit each group until a set number for each group has been reached.',
    minus: 'It is not random, so the interviewer’s choice of whom to ask can bring in bias.',
    scene: (r) => `An interviewer outside a sports club stops people until she has spoken to ${r.int(10, 30)} juniors and ${r.int(10, 30)} seniors.`,
  },
  {
    name: 'Opportunity sampling',
    how: 'The sample is made of people who are available at the time and fit what is needed, such as the first people to pass.',
    minus: 'It is unlikely to represent the population, because it depends on who happens to be there.',
    scene: (r) => `A researcher asks the first ${r.int(15, 40)} people who walk into a sports club on a Monday morning.`,
  },
];

function samplingMethod(rng: Rng, d: Difficulty): Out {
  const [m, ...rest] = rng.shuffle(METHODS);
  if (d === 1) {
    return {
      prompt: `Which sampling method is this?\n\n> ${m!.how}`,
      parts: [part(mc(rng, m!.name, rest.map((r) => r.name)))],
      hints: ['Ask whether the choice is random, whether there are groups, and whether a full list of the population is needed.', 'Quota and opportunity sampling are the two methods that are not random.'],
      solution: [`This describes ${m!.name.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `Which of these is a disadvantage of **${m!.name.toLowerCase()}**?`,
      parts: [part(mc(rng, m!.minus, rest.map((r) => r.minus)))],
      hints: [`First recall how ${m!.name.toLowerCase()} works: ${m!.how.charAt(0).toLowerCase()}${m!.how.slice(1)}`, 'Then ask what could go wrong with that way of choosing.'],
      solution: [`${m!.name}: ${m!.how.charAt(0).toLowerCase()}${m!.how.slice(1)}`, `A disadvantage: ${m!.minus.charAt(0).toLowerCase()}${m!.minus.slice(1)}`],
    };
  }
  return {
    prompt: `Name the sampling method used.\n\n> ${m!.scene(rng)}`,
    parts: [part(mc(rng, m!.name, rest.map((r) => r.name)))],
    hints: ['Is the sample chosen at random? If not, it is quota or opportunity sampling.', 'Is the population split into groups first? Are members chosen at regular intervals?'],
    solution: [`${m!.how}`, `So this is ${m!.name.toLowerCase()}.`],
  };
}

const GROUPS = [['Year 9', 'Year 10', 'Year 11'], ['under 30', '30 to 60', 'over 60'], ['full-time', 'part-time', 'temporary'], ['football', 'hockey', 'swimming']];

function sampleSizes(rng: Rng, d: Difficulty): Out {
  const names = rng.pick(GROUPS);
  if (d === 1) {
    const f = rng.pick([5, 8, 10, 12, 15, 20, 25]);
    const counts = [rng.int(4, 20), rng.int(4, 20), rng.int(4, 20)];
    const sizes = counts.map((c) => c * f);
    const total = sum(sizes);
    const n = sum(counts);
    const i = rng.int(0, 2);
    return {
      prompt: `A population is made of ${names.map((g, j) => `$${sizes[j]}$ people ${g === 'under 30' || g === 'over 60' || g === '30 to 60' ? `aged ${g}` : `in the ${g} group`}`).join(', ').replace(/, ([^,]*)$/, ' and $1')}. A stratified sample of $${n}$ people is taken. How many should be ${names[i] === 'under 30' || names[i] === 'over 60' || names[i] === '30 to 60' ? `aged ${names[i]}` : `in the ${names[i]} group`}?`,
      parts: [numPart(counts[i]!)],
      hints: ['In a stratified sample each group is represented in proportion to its size.', `Number from a group $= \\dfrac{\\text{size of group}}{\\text{population}} \\times ${n}$.`],
      solution: [`The population is $${sizes.join(' + ')} = ${total}$.`, `$\\dfrac{${sizes[i]}}{${total}} \\times ${n} = ${counts[i]}$`],
    };
  }
  if (d === 2) {
    const pct = retry(() => [rng.int(2, 9) * 5, rng.int(2, 9) * 5], ([a, b]) => a + b <= 85, 50);
    const p = [...pct, 100 - pct[0]! - pct[1]!];
    const n = rng.pick([40, 60, 80, 100, 120, 200]);
    const q = p.map((x) => (x * n) / 100);
    return {
      prompt: `A market researcher wants a quota sample of $${n}$ shoppers that matches the town’s population: $${p[0]}\\%$ ${names[0]}, $${p[1]}\\%$ ${names[1]} and $${p[2]}\\%$ ${names[2]}. Find the quota for each group.`,
      parts: names.map((g, j) => numPart(q[j]!, { label: `${g}:` })),
      hints: ['Each quota is that group’s percentage of the whole sample.', `For example, $${p[0]}\\%$ of $${n}$.`],
      solution: names.map((g, j) => `${g}: $${p[j]}\\%$ of $${n} = ${fmt(q[j]!)}$`),
    };
  }
  const k = rng.int(5, 25);
  const n = rng.int(20, 60);
  const Npop = k * n;
  const start = rng.int(1, k);
  const m = rng.int(3, 6);
  return {
    prompt: `A systematic sample of $${n}$ is to be taken from a numbered list of $${N(Npop)}$ items. Find the sampling interval. If the first item chosen is number $${start}$, what is the number of the ${['', '', '', 'third', 'fourth', 'fifth', 'sixth'][m]} item chosen?`,
    parts: [numPart(k, { label: 'Interval:' }), numPart(start + (m - 1) * k, { label: 'Item number:' })],
    hints: ['The interval is the population size divided by the sample size.', 'After the first item, each item is one interval further along the list.'],
    solution: [`Interval $= ${N(Npop)} \\div ${n} = ${k}$.`, `The items chosen are $${start}, ${start + k}, ${start + 2 * k}, \\ldots$, so item ${m} is $${start} + ${m - 1} \\times ${k} = ${start + (m - 1) * k}$.`],
  };
}

// ---------------------------------------------------------------------------
// 14.2 Variance, standard deviation and coding
// ---------------------------------------------------------------------------

function sdSummary(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.int(8, 20);
    const xs = Array.from({ length: n }, () => rng.int(10, 60));
    const [sx, sxx] = [sum(xs), sum(xs.map((x) => x * x))];
    const mean = sx / n;
    const sd = Math.sqrt(sxx / n - mean * mean);
    return {
      prompt: `For a set of $${n}$ values, $\\sum x = ${N(sx)}$ and $\\sum x^2 = ${N(sxx)}$. Find the mean and the standard deviation. ${SF_TEXT}`,
      parts: [sfPart(mean, { label: 'Mean:' }), sfPart(sd, { label: 'Standard deviation:' })],
      hints: ['Mean $\\bar{x} = \\dfrac{\\sum x}{n}$.', 'Variance $\\sigma^2 = \\dfrac{\\sum x^2}{n} - \\bar{x}^2$ (“the mean of the squares minus the square of the mean”), and the standard deviation is its square root.'],
      solution: [`$\\bar{x} = \\dfrac{${N(sx)}}{${n}} ${eq3(mean)}$`, `$\\sigma^2 = \\dfrac{${N(sxx)}}{${n}} - \\left(\\dfrac{${N(sx)}}{${n}}\\right)^2 ${eq3(sd * sd)}$`, `$\\sigma ${eq3(sd)}$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const start = rng.int(0, 3);
    const xs = Array.from({ length: 5 }, (_, i) => start + i);
    const fs = xs.map(() => rng.int(1, 15));
    const n = sum(fs);
    const sfx = sum(xs.map((x, i) => x * fs[i]!));
    const sfxx = sum(xs.map((x, i) => x * x * fs[i]!));
    const mean = sfx / n;
    const sd = Math.sqrt(sfxx / n - mean * mean);
    const figure: Figure = { type: 'table', headers: ['Number of pets, $x$', 'Frequency, $f$'], rows: xs.map((x, i) => [String(x), String(fs[i])]), markdown: true };
    return {
      prompt: `The table shows the number of pets owned by each of $${n}$ families. Find the mean and the standard deviation of the number of pets. ${SF_TEXT}`,
      figure,
      parts: [sfPart(mean, { label: 'Mean:' }), sfPart(sd, { label: 'Standard deviation:' })],
      hints: ['Work out $\\sum fx$ and $\\sum fx^2$, and use $n = \\sum f$.', 'Mean $= \\dfrac{\\sum fx}{\\sum f}$ and variance $= \\dfrac{\\sum fx^2}{\\sum f} - \\bar{x}^2$.'],
      solution: [`$\\sum f = ${n}$, $\\sum fx = ${sfx}$ and $\\sum fx^2 = ${sfxx}$.`, `$\\bar{x} = \\dfrac{${sfx}}{${n}} ${eq3(mean)}$`, `$\\sigma = \\sqrt{\\dfrac{${sfxx}}{${n}} - \\bar{x}^2} ${eq3(sd)}$`],
      calculator: true,
    };
  }
  const [n1, n2] = [rng.int(10, 40), rng.int(10, 40)];
  const [m1, m2] = [roundTo(rng.int(400, 800) / 10, 1), roundTo(rng.int(400, 800) / 10, 1)];
  const [s1, s2] = [roundTo(rng.int(20, 120) / 10, 1), roundTo(rng.int(20, 120) / 10, 1)];
  const [q1, q2] = [n1 * (s1 * s1 + m1 * m1), n2 * (s2 * s2 + m2 * m2)];
  const M = (n1 * m1 + n2 * m2) / (n1 + n2);
  const S = Math.sqrt((q1 + q2) / (n1 + n2) - M * M);
  return {
    prompt: `Two classes sat the same test. Class A: $${n1}$ students, mean $${fmt(m1)}$, standard deviation $${fmt(s1)}$. Class B: $${n2}$ students, mean $${fmt(m2)}$, standard deviation $${fmt(s2)}$. Find the mean and the standard deviation of all $${n1 + n2}$ marks together. ${SF_TEXT}`,
    parts: [sfPart(M, { label: 'Mean:' }), sfPart(S, { label: 'Standard deviation:' })],
    hints: ['For each class find $\\sum x = n\\bar{x}$, and $\\sum x^2$ from $\\sigma^2 = \\dfrac{\\sum x^2}{n} - \\bar{x}^2$, so $\\sum x^2 = n(\\sigma^2 + \\bar{x}^2)$.', 'Add the totals for the two classes, then find the mean and standard deviation of the combined set.'],
    solution: [
      `Class A: $\\sum x = ${fmt(n1 * m1)}$ and $\\sum x^2 = ${n1}(${fmt(s1)}^2 + ${fmt(m1)}^2) = ${fmt(roundTo(q1, 4))}$.`,
      `Class B: $\\sum x = ${fmt(n2 * m2)}$ and $\\sum x^2 = ${n2}(${fmt(s2)}^2 + ${fmt(m2)}^2) = ${fmt(roundTo(q2, 4))}$.`,
      `Combined mean $= \\dfrac{${fmt(n1 * m1)} + ${fmt(n2 * m2)}}{${n1 + n2}} ${eq3(M)}$`,
      `Combined standard deviation $= \\sqrt{\\dfrac{${fmt(roundTo(q1 + q2, 4))}}{${n1 + n2}} - ${s3(M)}^2} ${eq3(S)}$`,
    ],
    calculator: true,
  };
}

function coding(rng: Rng, d: Difficulty): Out {
  const a = rng.pick([20, 50, 100, 150, 200, 500, 1000]);
  const b = rng.pick([2, 5, 10, 20]);
  if (d === 1) {
    const my = roundTo(rng.int(-40, 40) / 10, 1);
    const sy = roundTo(rng.int(5, 40) / 10, 1);
    return {
      prompt: `A set of data $x$ is coded using $y = \\dfrac{x - ${a}}{${b}}$. The coded data have mean $${fmt(my)}$ and standard deviation $${fmt(sy)}$. Find the mean and the standard deviation of $x$.`,
      parts: [numPart(roundTo(a + b * my, 6), { label: 'Mean of $x$:', exact: false, display: 'decimal' }), numPart(roundTo(b * sy, 6), { label: 'Standard deviation of $x$:', exact: false, display: 'decimal' })],
      hints: ['Rearrange the coding: $x = ' + a + ' + ' + b + 'y$.', 'Adding a constant moves the mean but not the spread; multiplying by $' + b + '$ multiplies both the mean and the standard deviation.'],
      solution: [`$x = ${a} + ${b}y$, so $\\bar{x} = ${a} + ${b} \\times ${my < 0 ? `(${fmt(my)})` : fmt(my)} = ${fmt(roundTo(a + b * my, 6))}$.`, `$\\sigma_x = ${b} \\times ${fmt(sy)} = ${fmt(b * sy)}$ (the ${a} does not change the spread).`],
    };
  }
  const n = rng.int(8, 15);
  const ys = Array.from({ length: n }, () => rng.int(-9, 12));
  const [sy, syy] = [sum(ys), sum(ys.map((y) => y * y))];
  const ym = sy / n;
  const ysd = Math.sqrt(syy / n - ym * ym);
  const scale = d === 2 ? 1 : b;
  const code = d === 2 ? `y = x - ${a}` : `y = \\dfrac{x - ${a}}{${b}}`;
  const mean = a + scale * ym;
  const sd = scale * ysd;
  return {
    prompt: `The masses $x$ grams of $${n}$ parcels are coded using $${code}$. For the coded values, $\\sum y = ${sy}$ and $\\sum y^2 = ${syy}$. Find the mean and the standard deviation of the masses. ${SF_TEXT}`,
    parts: [sfPart(mean, { label: 'Mean:', suffix: 'g' }), sfPart(sd, { label: 'Standard deviation:', suffix: 'g' })],
    hints: ['First find the mean and standard deviation of $y$ from the sums.', `Then undo the coding: $x = ${a}${d === 2 ? ' + y' : ` + ${b}y`}$, so $\\bar{x} = ${a}${d === 2 ? ' + \\bar{y}' : ` + ${b}\\bar{y}`}$ and $\\sigma_x = ${d === 2 ? '\\sigma_y' : `${b}\\sigma_y`}$.`],
    solution: [
      `$\\bar{y} = \\dfrac{${sy}}{${n}} ${eq3(ym)}$ and $\\sigma_y = \\sqrt{\\dfrac{${syy}}{${n}} - \\bar{y}^2} ${eq3(ysd)}$.`,
      d === 2
        ? `$\\bar{x} = ${a} ${ym < 0 ? '-' : '+'} ${s3(Math.abs(ym))} ${eq3(mean)}$ g`
        : `$\\bar{x} = ${a} + ${b} \\times ${ym < 0 ? `(${s3(ym)})` : s3(ym)} ${eq3(mean)}$ g`,
      d === 2 ? `$\\sigma_x = \\sigma_y ${eq3(sd)}$ g` : `$\\sigma_x = ${b} \\times ${s3(ysd)} ${eq3(sd)}$ g`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 14.3 Outliers and cleaning data
// ---------------------------------------------------------------------------

function outliers(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const q1 = rng.int(10, 60);
    const iqr = rng.int(2, 12) * 2;
    const q3 = q1 + iqr;
    const [lo, hi] = [q1 - 1.5 * iqr, q3 + 1.5 * iqr];
    if (d === 1) {
      return {
        prompt: `For a data set, the lower quartile is $${q1}$ and the upper quartile is $${q3}$. An outlier is a value more than $1.5 \\times$ the interquartile range below the lower quartile or above the upper quartile. Find the limits beyond which a value is an outlier.`,
        parts: [numPart(lo, { label: 'Lower limit:', exact: false, display: 'decimal' }), numPart(hi, { label: 'Upper limit:', exact: false, display: 'decimal' })],
        hints: ['The interquartile range is $Q_3 - Q_1$.', 'Lower limit $= Q_1 - 1.5 \\times \\text{IQR}$; upper limit $= Q_3 + 1.5 \\times \\text{IQR}$.'],
        solution: [`IQR $= ${q3} - ${q1} = ${iqr}$, and $1.5 \\times ${iqr} = ${fmt(1.5 * iqr)}$.`, `Lower limit $= ${q1} - ${fmt(1.5 * iqr)} = ${fmt(lo)}$; upper limit $= ${q3} + ${fmt(1.5 * iqr)} = ${fmt(hi)}$.`],
      };
    }
    const vals = rng.shuffle([
      ...Array.from({ length: rng.int(0, 2) }, () => Math.floor(lo) - rng.int(1, 8)),
      ...Array.from({ length: rng.int(1, 3) }, () => Math.ceil(hi) + rng.int(1, 8)),
      ...Array.from({ length: rng.int(2, 3) }, () => rng.int(Math.ceil(lo) + 1, Math.floor(hi) - 1)),
    ]).filter((v) => v >= 0 && v !== lo && v !== hi);
    const count = vals.filter((v) => v < lo || v > hi).length;
    return {
      prompt: `For a data set, $Q_1 = ${q1}$ and $Q_3 = ${q3}$. An outlier is a value more than $1.5 \\times$ the interquartile range beyond the quartiles. How many of these values from the data set are outliers?\n\n${listTex(vals)}`,
      parts: [numPart(count)],
      hints: ['Find the limits $Q_1 - 1.5 \\times \\text{IQR}$ and $Q_3 + 1.5 \\times \\text{IQR}$.', 'Count the values below the lower limit or above the upper limit.'],
      solution: [`IQR $= ${iqr}$, so the limits are $${fmt(lo)}$ and $${fmt(hi)}$.`, `Outliers: ${count ? listTex(vals.filter((v) => v < lo || v > hi)) : 'none'}, so there ${count === 1 ? 'is' : 'are'} $${count}$.`],
    };
  }
  const mean = roundTo(rng.int(200, 800) / 10, 1);
  const sd = roundTo(rng.int(20, 80) / 10, 1);
  const [lo, hi] = [roundTo(mean - 2 * sd, 6), roundTo(mean + 2 * sd, 6)];
  const vals = rng.shuffle([
    roundTo(lo - rng.int(1, 30) / 10, 1),
    roundTo(hi + rng.int(1, 30) / 10, 1),
    ...Array.from({ length: rng.int(2, 4) }, () => roundTo(mean + (rng.int(-18, 18) / 10) * sd, 1)),
    rng.chance(0.5) ? roundTo(hi - rng.int(1, 5) / 10, 1) : roundTo(lo + rng.int(1, 5) / 10, 1),
  ]).filter((v) => v !== lo && v !== hi);
  const count = vals.filter((v) => v < lo || v > hi).length;
  return {
    prompt: `The times, in seconds, in a set of data have mean $${fmt(mean)}$ and standard deviation $${fmt(sd)}$. An outlier is a value more than $2$ standard deviations from the mean. Find the limits beyond which a value is an outlier, and how many of these values are outliers.\n\n${listTex(vals)}`,
    parts: [numPart(lo, { label: 'Lower limit:', exact: false, display: 'decimal' }), numPart(hi, { label: 'Upper limit:', exact: false, display: 'decimal' }), numPart(count, { label: 'Number of outliers:' })],
    hints: ['The limits are $\\bar{x} - 2\\sigma$ and $\\bar{x} + 2\\sigma$.', 'Count the values outside those limits.'],
    solution: [`$${fmt(mean)} - 2 \\times ${fmt(sd)} = ${fmt(lo)}$ and $${fmt(mean)} + 2 \\times ${fmt(sd)} = ${fmt(hi)}$.`, `Outside the limits: ${listTex(vals.filter((v) => v < lo || v > hi))}, so $${count}$ outliers.`],
  };
}

function cleaningData(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.int(6, 10);
    const xs = Array.from({ length: n }, () => roundTo(rng.int(150, 190) / 100, 2));
    const err = roundTo(xs[0]! * 10, 1);
    const shown = rng.shuffle([...xs.slice(1), err]);
    const clean = xs.slice(1);
    const mean = sum(clean) / clean.length;
    return {
      prompt: `The heights, in metres, of a group of adults were recorded as\n\n${listTex(shown)}\n\nOne value is clearly an error in recording. Remove it and find the mean of the remaining heights. ${SF_TEXT}`,
      parts: [sfPart(mean, { suffix: 'm' })],
      hints: ['Cleaning data means removing values that cannot be right, such as a height that no person could have.', 'Then find the mean of the values that are left.'],
      solution: [`$${fmt(err)}$ m cannot be an adult’s height (it was probably $${fmt(xs[0]!)}$ m with the decimal point in the wrong place), so remove it.`, `Mean of the other $${clean.length}$ heights $= \\dfrac{${fmt(roundTo(sum(clean), 4))}}{${clean.length}} ${eq3(mean)}$ m`],
      calculator: true,
    };
  }
  const n = rng.int(12, 40);
  const mean = roundTo(rng.int(300, 700) / 10, 1);
  const v = roundTo(mean + rng.sign() * rng.int(30, 80), 1);
  const newMean = (n * mean - v) / (n - 1);
  if (d === 2) {
    return {
      prompt: `A data set of $${n}$ values has a mean of $${fmt(mean)}$. The value $${fmt(v)}$ is found to be an outlier caused by a faulty sensor, and is removed. Find the mean of the remaining values. ${SF_TEXT}`,
      parts: [sfPart(newMean)],
      hints: ['Find the total of all the values from the mean: total $= n\\bar{x}$.', 'Subtract the removed value, and divide by the new number of values.'],
      solution: [`Total $= ${n} \\times ${fmt(mean)} = ${fmt(roundTo(n * mean, 4))}$.`, `New mean $= \\dfrac{${fmt(roundTo(n * mean, 4))} - ${fmt(v)}}{${n - 1}} ${eq3(newMean)}$`],
      calculator: true,
    };
  }
  const xs = Array.from({ length: n - 1 }, () => rng.int(20, 60));
  const out = rng.int(95, 140);
  const all = [...xs, out];
  const [sx, sxx] = [sum(all), sum(all.map((x) => x * x))];
  const [cx, cxx] = [sx - out, sxx - out * out];
  const m2 = cx / (n - 1);
  const s2 = Math.sqrt(cxx / (n - 1) - m2 * m2);
  return {
    prompt: `For $${n}$ values, $\\sum x = ${N(sx)}$ and $\\sum x^2 = ${N(sxx)}$. The value $${out}$ is an outlier and is removed. Find the mean and standard deviation of the remaining values. ${SF_TEXT}`,
    parts: [sfPart(m2, { label: 'Mean:' }), sfPart(s2, { label: 'Standard deviation:' })],
    hints: [`Take the outlier out of both sums: subtract $${out}$ from $\\sum x$ and $${out}^2$ from $\\sum x^2$, and use $n = ${n - 1}$.`, 'Then $\\bar{x} = \\dfrac{\\sum x}{n}$ and $\\sigma = \\sqrt{\\dfrac{\\sum x^2}{n} - \\bar{x}^2}$.'],
    solution: [`New sums: $\\sum x = ${N(sx)} - ${out} = ${N(cx)}$ and $\\sum x^2 = ${N(sxx)} - ${N(out * out)} = ${N(cxx)}$, with $n = ${n - 1}$.`, `Mean $= \\dfrac{${N(cx)}}{${n - 1}} ${eq3(m2)}$`, `Standard deviation $= \\sqrt{\\dfrac{${N(cxx)}}{${n - 1}} - \\bar{x}^2} ${eq3(s2)}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 14.4 Discrete random variables
// ---------------------------------------------------------------------------

/** Probabilities in steps of 0.05 that add to `total`, each at least 0.05. */
function split(rng: Rng, total: number, parts: number): number[] {
  const units = Math.round(total / 0.05);
  const cuts = rng.sample(Array.from({ length: units - 1 }, (_, i) => i + 1), parts - 1).sort((a, b) => a - b);
  const bounds = [0, ...cuts, units];
  return bounds.slice(1).map((b, i) => roundTo((b - bounds[i]!) * 0.05, 2));
}

function drvTable(rng: Rng, d: Difficulty): Out {
  const [xs, cells, k] = retry(
    () => {
      const start = rng.int(0, 2);
      const xs = Array.from({ length: 5 }, (_, i) => start + i);
      const k = rng.pick([0.05, 0.1, 0.15]);
      const coef = xs.map(() => (rng.chance(0.5) ? rng.int(1, 3) : 0));
      const kTotal = sum(coef) * k;
      const fixedCount = coef.filter((c) => c === 0).length;
      if (fixedCount === 0 || sum(coef) === 0 || 1 - kTotal < 0.05 * fixedCount + 1e-9) return null;
      const fixed = split(rng, roundTo(1 - kTotal, 2), fixedCount);
      let j = 0;
      const cells = coef.map((c) => (c ? { c, p: roundTo(c * k, 4) } : { c: 0, p: fixed[j++]! }));
      return [xs, cells, k] as const;
    },
    (v) => v !== null,
    300,
  )!;
  const label = (c: { c: number; p: number }) => (c.c ? `$${c.c === 1 ? '' : c.c}k$` : `$${fmt(c.p)}$`);
  const figure: Figure = { type: 'table', headers: ['$x$', ...xs.map(String)], rows: [['$P(X = x)$', ...cells.map(label)]], markdown: true };
  const ksum = sum(cells.map((c) => c.c));
  const fixedSum = roundTo(sum(cells.filter((c) => !c.c).map((c) => c.p)), 4);
  const kSteps = [`The probabilities add to $1$: $${ksum}k + ${fmt(fixedSum)} = 1$, so $k = \\dfrac{${fmt(roundTo(1 - fixedSum, 4))}}{${ksum}} = ${fmt(k)}$.`];
  if (d === 1) {
    return {
      prompt: 'The table shows the probability distribution of a discrete random variable $X$. Find the value of $k$.',
      figure,
      parts: [numPart(k, { label: '$k =$', exact: false, display: 'decimal' })],
      hints: ['The probabilities of all the values of a random variable add up to $1$.', 'Add the terms in $k$ and the numbers separately, then solve for $k$.'],
      solution: kSteps,
    };
  }
  const x0 = xs[rng.int(1, 3)]!;
  const pGe = sum(cells.filter((_, i) => xs[i]! >= x0).map((c) => c.p));
  if (d === 2) {
    return {
      prompt: `The table shows the probability distribution of a discrete random variable $X$. Find $k$, and $P(X \\ge ${x0})$.`,
      figure,
      parts: [numPart(k, { label: '$k =$', exact: false, display: 'decimal' }), numPart(roundTo(pGe, 4), { label: `$P(X \\ge ${x0}) =$`, exact: false, display: 'decimal' })],
      hints: ['The probabilities add up to $1$; use that to find $k$.', `Then add the probabilities for $x = ${x0}$ and above.`],
      solution: [...kSteps, `$P(X \\ge ${x0}) = ${cells.filter((_, i) => xs[i]! >= x0).map((c) => fmt(c.p)).join(' + ')} = ${fmt(roundTo(pGe, 4))}$`],
    };
  }
  const target = rng.pick(xs.filter((x) => x >= x0));
  const pc = cells[xs.indexOf(target)]!.p / pGe;
  return {
    prompt: `The table shows the probability distribution of a discrete random variable $X$. Find $k$, and $P(X = ${target} \\mid X \\ge ${x0})$. ${SF_TEXT}`,
    figure,
    parts: [numPart(k, { label: '$k =$', exact: false, display: 'decimal' }), sfPart(pc, { label: 'Conditional probability:' })],
    hints: ['Use the fact that the probabilities add to $1$ to find $k$.', `$P(A \\mid B) = \\dfrac{P(A \\text{ and } B)}{P(B)}$; here $A$ (that $X = ${target}$) lies inside $B$ (that $X \\ge ${x0}$).`],
    solution: [...kSteps, `$P(X \\ge ${x0}) = ${fmt(roundTo(pGe, 4))}$`, `$P(X = ${target} \\mid X \\ge ${x0}) = \\dfrac{${fmt(cells[xs.indexOf(target)]!.p)}}{${fmt(roundTo(pGe, 4))}} ${eq3(pc)}$`],
  };
}

const fracTex = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? `${n / g}` : `\\dfrac{${n / g}}{${d / g}}`;
};

function drvFunction(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const kind = rng.int(0, 2);
    const n = rng.int(3, 6);
    const xs = Array.from({ length: n }, (_, i) => i + 1);
    const w = (x: number) => (kind === 0 ? x : kind === 1 ? x + 1 : x * x);
    const form = kind === 0 ? 'kx' : kind === 1 ? 'k(x + 1)' : 'kx^2';
    const W = sum(xs.map(w));
    const def = `A discrete random variable $X$ has probability distribution $P(X = x) = ${form}$ for $x = ${xs.join(', ')}$, and $0$ otherwise.`;
    const kSteps = [`The probabilities add to $1$: $k(${xs.map(w).join(' + ')}) = ${W}k = 1$, so $k = \\dfrac{1}{${W}}$.`];
    if (d === 1) {
      return {
        prompt: `${def} Find the value of $k$, as a fraction.`,
        parts: [numPart(1 / W, { label: '$k =$', fraction: 'lowest' })],
        hints: ['The probabilities for $x = 1, 2, \\ldots$ must add up to $1$.', `Write out $P(X = 1)$, $P(X = 2)$, … in terms of $k$, and add them.`],
        solution: kSteps,
      };
    }
    const m = rng.int(1, n - 1);
    const gt = rng.chance(0.5);
    const num = sum(xs.filter((x) => (gt ? x > m : x <= m)).map(w));
    return {
      prompt: `${def} Find $P(X ${gt ? '>' : '\\le'} ${m})$, as a fraction.`,
      parts: [numPart(num / W, { label: `$P(X ${gt ? '>' : '\\le'} ${m}) =$`, fraction: 'lowest' })],
      hints: ['First find $k$: the probabilities add up to $1$.', `Then add the probabilities for the values of $x$ that are ${gt ? `greater than $${m}$` : `$${m}$ or less`}.`],
      solution: [...kSteps, `$P(X ${gt ? '>' : '\\le'} ${m}) = \\dfrac{${xs.filter((x) => (gt ? x > m : x <= m)).map(w).join(' + ')}}{${W}}${gcd(num, W) === 1 ? '' : ` = ${fracTex(num, W)}`}$`],
    };
  }
  const [a, b] = [rng.int(3, 6), rng.int(3, 8)];
  const s = rng.int(4, a + b - 1);
  const ways = Array.from({ length: a }, (_, i) => i + 1).filter((x) => s - x >= 1 && s - x <= b).length;
  return {
    prompt: `Two fair spinners are spun. One is numbered $1$ to $${a}$ and the other $1$ to $${b}$. The random variable $S$ is the sum of the two scores. Find $P(S = ${s})$, as a fraction.`,
    parts: [numPart(ways / (a * b), { label: `$P(S = ${s}) =$`, fraction: 'lowest' })],
    hints: [`There are $${a} \\times ${b} = ${a * b}$ equally likely outcomes. A sample space diagram (a grid of sums) shows them all.`, `Count the pairs of scores that add up to $${s}$.`],
    solution: [`Pairs that add to $${s}$: ${Array.from({ length: a }, (_, i) => i + 1).filter((x) => s - x >= 1 && s - x <= b).map((x) => `$(${x}, ${s - x})$`).join(', ')}, so $${ways}$ outcomes.`, `$P(S = ${s}) = \\dfrac{${ways}}{${a * b}} = ${fracTex(ways, a * b)}$`],
  };
}

// ---------------------------------------------------------------------------
// 14.5 The binomial distribution
// ---------------------------------------------------------------------------

interface Trial {
  setup: (n: number) => string;
  success: string;
  p: number;
  pTex?: string;
}

const TRIALS: Trial[] = [
  { setup: (n) => `A fair six-sided dice is rolled $${n}$ times.`, success: 'sixes', p: 1 / 6, pTex: '\\tfrac{1}{6}' },
  { setup: (n) => `A fair coin is tossed $${n}$ times.`, success: 'heads', p: 0.5 },
  { setup: (n) => `In a large batch of light bulbs, $8\\%$ are faulty. A random sample of $${n}$ bulbs is taken.`, success: 'faulty bulbs', p: 0.08 },
  { setup: (n) => `Of the seeds in a large packet, $70\\%$ germinate. $${n}$ seeds are planted.`, success: 'seeds that germinate', p: 0.7 },
  { setup: (n) => `A basketball player scores $35\\%$ of her free throws, independently of each other. She takes $${n}$ free throws.`, success: 'free throws scored', p: 0.35 },
  { setup: (n) => `On a multiple-choice test each question has $4$ options, and a student guesses all $${n}$ answers.`, success: 'correct answers', p: 0.25 },
  { setup: (n) => `In a large town, $40\\%$ of adults cycle to work. A random sample of $${n}$ adults is chosen.`, success: 'adults who cycle to work', p: 0.4 },
];

const bDef = (n: number, t: Trial) => `$X \\sim \\mathrm{B}(${n}, ${pTex(t.p, t.pTex)})$`;

function binomialExact(rng: Rng, d: Difficulty): Out {
  const t = rng.pick(TRIALS);
  const n = d === 1 ? rng.int(5, 10) : rng.int(8, 20);
  const r = retry(() => rng.int(1, n - 1), (r) => binomPmf(n, t.p, r) > 0.002, 100);
  const pr = binomPmf(n, t.p, r);
  if (d === 1) {
    return {
      prompt: `${bDef(n, t)}. Find $P(X = ${r})$, to 4 decimal places.`,
      parts: [p4(pr)],
      hints: ['For $X \\sim \\mathrm{B}(n, p)$, $P(X = r) = \\dbinom{n}{r}p^r(1 - p)^{n - r}$.', `Here $n = ${n}$, $p = ${pTex(t.p, t.pTex)}$ and $r = ${r}$.`],
      solution: [`$P(X = ${r}) = \\dbinom{${n}}{${r}}(${pTex(t.p, t.pTex)})^{${r}}(${t.pTex ? '\\tfrac{5}{6}' : fmt(1 - t.p)})^{${n - r}}$`, `$= ${nCr(n, r)} \\times (${pTex(t.p, t.pTex)})^{${r}} \\times (${t.pTex ? '\\tfrac{5}{6}' : fmt(1 - t.p)})^{${n - r}} \\approx ${f4(pr)}$`],
      calculator: true,
    };
  }
  const steps = [`Let $X$ be the number of ${t.success}. Then ${bDef(n, t)}.`, `$P(X = ${r}) = \\dbinom{${n}}{${r}}(${pTex(t.p, t.pTex)})^{${r}}(${t.pTex ? '\\tfrac{5}{6}' : fmt(1 - t.p)})^{${n - r}} \\approx ${f4(pr)}$`];
  if (d === 2) {
    return {
      prompt: `${t.setup(n)} Find the probability of exactly $${r}$ ${t.success}, to 4 decimal places.`,
      parts: [p4(pr)],
      hints: ['Say what $X$ counts, and write its distribution as $\\mathrm{B}(n, p)$.', 'Then use $P(X = r) = \\dbinom{n}{r}p^r(1 - p)^{n - r}$.'],
      solution: steps,
      calculator: true,
    };
  }
  const none = (1 - t.p) ** n;
  return {
    prompt: `${t.setup(n)} Find the probability of exactly $${r}$ ${t.success}, and the probability of at least one, each to 4 decimal places.`,
    parts: [p4(pr, `Exactly $${r}$:`), p4(1 - none, 'At least one:')],
    hints: ['Model the number of successes with a binomial distribution $\\mathrm{B}(n, p)$.', '“At least one” is everything except none: $P(X \\ge 1) = 1 - P(X = 0)$.'],
    solution: [...steps, `$P(X \\ge 1) = 1 - (${t.pTex ? '\\tfrac{5}{6}' : fmt(1 - t.p)})^{${n}} \\approx ${f4(1 - none)}$`],
    calculator: true,
  };
}

function binomialCumulative(rng: Rng, d: Difficulty): Out {
  const t = rng.pick(TRIALS);
  const n = rng.int(8, 25);
  const mean = n * t.p;
  const r = Math.max(1, Math.min(n - 2, Math.round(mean) + rng.int(-2, 2)));
  if (d === 1) {
    const v = binomCdf(n, t.p, r);
    return {
      prompt: `${bDef(n, t)}. Find $P(X \\le ${r})$, to 4 decimal places.`,
      parts: [p4(v)],
      hints: [`$P(X \\le ${r}) = P(X = 0) + P(X = 1) + \\cdots + P(X = ${r})$.`, 'A calculator’s cumulative binomial function (often “Binomial CD”) adds these for you.'],
      solution: [`$P(X \\le ${r}) = \\sum_{i = 0}^{${r}} \\dbinom{${n}}{i}(${pTex(t.p, t.pTex)})^i(${t.pTex ? '\\tfrac{5}{6}' : fmt(1 - t.p)})^{${n} - i} \\approx ${f4(v)}$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const strict = rng.chance(0.5);
    const v = 1 - binomCdf(n, t.p, strict ? r : r - 1);
    return {
      prompt: `${t.setup(n)} Find the probability of ${strict ? `more than $${r}$` : `at least $${r}$`} ${t.success}, to 4 decimal places.`,
      parts: [p4(v)],
      hints: [`Let $X$ be the number of ${t.success}, so ${bDef(n, t)}.`, `Use the complement: $P(X ${strict ? '>' : '\\ge'} ${r}) = 1 - P(X \\le ${strict ? r : r - 1})$.`],
      solution: [`${bDef(n, t)}.`, `$P(X ${strict ? '>' : '\\ge'} ${r}) = 1 - P(X \\le ${strict ? r : r - 1}) = 1 - ${f4(binomCdf(n, t.p, strict ? r : r - 1))} = ${f4(v)}$`],
      calculator: true,
    };
  }
  const a = Math.max(0, r - rng.int(1, 3));
  const b = Math.min(n, r + rng.int(1, 3));
  const [lowStrict, highStrict] = [rng.chance(0.5), rng.chance(0.5)];
  const lo = lowStrict ? a + 1 : a;
  const hi = highStrict ? b - 1 : b;
  const v = binomCdf(n, t.p, hi) - binomCdf(n, t.p, lo - 1);
  return {
    prompt: `${bDef(n, t)}. Find $P(${a} ${lowStrict ? '<' : '\\le'} X ${highStrict ? '<' : '\\le'} ${b})$, to 4 decimal places.`,
    parts: [p4(v)],
    hints: [`First write the whole numbers included: from $${lo}$ to $${hi}$.`, `Then $P(${lo} \\le X \\le ${hi}) = P(X \\le ${hi}) - P(X \\le ${lo - 1})$.`],
    solution: [...(lowStrict || highStrict ? [`$P(${a} ${lowStrict ? '<' : '\\le'} X ${highStrict ? '<' : '\\le'} ${b}) = P(${lo} \\le X \\le ${hi})$`] : []), `$${lowStrict || highStrict ? '' : `P(${lo} \\le X \\le ${hi}) `}= P(X \\le ${hi}) - P(X \\le ${lo - 1}) = ${f4(binomCdf(n, t.p, hi))} - ${f4(binomCdf(n, t.p, lo - 1))} = ${f4(v)}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 14.6 Hypothesis testing with the binomial distribution
// ---------------------------------------------------------------------------

interface Claim {
  setup: string;
  p0: number;
  pTex?: string;
  /** What p stands for. */
  what: string;
  /** What a higher proportion means, a lower one, and a change either way. */
  up: string;
  down: string;
  change: string;
  /** The counted outcome. */
  count: (x: number, n: number) => string;
}

const CLAIMS: Claim[] = [
  { setup: 'A coin is thought to be biased.', p0: 0.5, what: 'the probability that the coin lands on heads', up: 'the coin is biased towards heads', down: 'the coin is biased towards tails', change: 'the coin is biased', count: (x, n) => `In $${n}$ tosses it lands on heads $${x}$ times.` },
  { setup: 'A dice is thought to be biased.', p0: 1 / 6, pTex: '\\tfrac{1}{6}', what: 'the probability that the dice shows a six', up: 'the dice shows a six more often than it should', down: 'the dice shows a six less often than it should', change: 'the probability of a six is not $\\tfrac{1}{6}$', count: (x, n) => `In $${n}$ rolls it shows a six $${x}$ times.` },
  { setup: 'A seed company says that $80\\%$ of its seeds germinate.', p0: 0.8, what: 'the proportion of seeds that germinate', up: 'more than $80\\%$ of the seeds germinate', down: 'fewer than $80\\%$ of the seeds germinate', change: 'the proportion of seeds that germinate is not $80\\%$', count: (x, n) => `A gardener plants $${n}$ seeds and $${x}$ germinate.` },
  { setup: 'In the past, $30\\%$ of patients with an illness recovered within a week.', p0: 0.3, what: 'the proportion of patients who recover within a week', up: 'a new treatment increases the proportion who recover within a week', down: 'the proportion who recover within a week has fallen', change: 'the proportion who recover within a week has changed', count: (x, n) => `Of $${n}$ patients, $${x}$ recover within a week.` },
  { setup: 'A shop knows that $15\\%$ of its customers buy a newspaper.', p0: 0.15, what: 'the proportion of customers who buy a newspaper', up: 'the proportion of customers buying a newspaper has risen', down: 'the proportion of customers buying a newspaper has fallen', change: 'the proportion of customers buying a newspaper has changed', count: (x, n) => `Of $${n}$ customers, $${x}$ buy a newspaper.` },
  { setup: 'A bus company claims that $90\\%$ of its buses run on time.', p0: 0.9, what: 'the proportion of buses that run on time', up: 'more than $90\\%$ of the buses run on time', down: 'fewer than $90\\%$ of the buses run on time', change: 'the proportion of buses that run on time is not $90\\%$', count: (x, n) => `Of $${n}$ buses, $${x}$ run on time.` },
];

const H = (c: Claim, sign: '=' | '>' | '<' | '\\ne') => `$p ${sign} ${pTex(c.p0, c.pTex)}$`;

const TERMS = [
  { term: 'the significance level', meaning: 'The probability of rejecting the null hypothesis when it is in fact true.' },
  { term: 'the critical region', meaning: 'The set of values of the test statistic that would lead us to reject the null hypothesis.' },
  { term: 'the critical value', meaning: 'The first value inside the critical region, at its boundary.' },
  { term: 'the test statistic', meaning: 'The value calculated from the sample and used to decide whether to reject the null hypothesis.' },
  { term: 'the p-value', meaning: 'The probability, if the null hypothesis is true, of a result at least as extreme as the one observed.' },
  { term: 'the null hypothesis', meaning: 'The statement about the parameter that we assume is true unless there is evidence against it.' },
];

function hypotheses(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const [t, ...rest] = rng.shuffle(TERMS);
    return {
      prompt: `In a hypothesis test, what is ${t!.term}?`,
      parts: [part(mc(rng, t!.meaning, rest.map((r) => r.meaning)))],
      hints: ['A test starts from a null hypothesis and asks how unlikely the sample would be if it were true.', 'Match each word to its role: what we assume, what we calculate, which values reject, and how big the risk is.'],
      solution: [`${t!.term.charAt(0).toUpperCase()}${t!.term.slice(1)}: ${t!.meaning.charAt(0).toLowerCase()}${t!.meaning.slice(1)}`],
    };
  }
  const c = rng.pick(CLAIMS);
  const kind = d === 1 ? rng.pick(['up', 'down'] as const) : rng.pick(['up', 'down', 'two'] as const);
  const n = rng.int(10, 40);
  const claim = kind === 'up' ? c.up : kind === 'down' ? c.down : c.change;
  const right = kind === 'up' ? '>' : kind === 'down' ? '<' : '\\ne';
  const ans = (s: string) => `$H_0$: ${H(c, '=')}, $\\ H_1$: ${H(c, s as '>')}`;
  const choices = ['>', '<', '\\ne'].filter((s) => s !== right).map(ans);
  choices.push(`$H_0$: ${H(c, right as '>')}, $\\ H_1$: ${H(c, '=')}`);
  return {
    prompt: `${c.setup} A test is carried out to see whether ${claim}, using a random sample of $${n}$. Which hypotheses should be used, where $p$ is ${c.what}?`,
    parts: [part(mc(rng, ans(right), choices))],
    hints: ['The null hypothesis $H_0$ always states the value we assume: $p$ equals the old or claimed value.', kind === 'two' ? 'A test for a change in either direction is two-tailed: $H_1$ uses $\\ne$.' : 'A test for a change in one direction is one-tailed: $H_1$ uses $>$ or $<$.'],
    solution: [`$H_0$: ${H(c, '=')} (no change).`, `We are testing whether ${claim}, so $H_1$: ${H(c, right as '>')}${kind === 'two' ? ', a two-tailed test' : ', a one-tailed test'}.`],
  };
}

/** The critical value of a one-tailed test of B(n, p) at level alpha, and the actual level. */
function critical(n: number, p: number, alpha: number, up: boolean): [number, number] {
  if (up) {
    let c = n + 1;
    while (c > 0 && 1 - binomCdf(n, p, c - 2) <= alpha) c--;
    return [c, c > n ? 0 : 1 - binomCdf(n, p, c - 1)];
  }
  let c = -1;
  while (c < n && binomCdf(n, p, c + 1) <= alpha) c++;
  return [c, c < 0 ? 0 : binomCdf(n, p, c)];
}

function binomialTest(rng: Rng, d: Difficulty): Out {
  const up = d === 1 ? true : d === 2 ? false : rng.chance(0.5);
  // A sample of 30 or fewer cannot show that more than 90% of buses run on time.
  const c = rng.pick(CLAIMS.filter((x) => !(up && x.p0 > 0.85)));
  const alpha = rng.pick([0.05, 0.1, 0.01, 0.05]);
  const aTex = `${fmt(alpha * 100)}\\%`;
  const sign = up ? '>' : '<';
  const n = rng.int(10, 30);
  const hyp = `$H_0$: ${H(c, '=')}, $H_1$: ${H(c, sign)}`;
  const X = `$X \\sim \\mathrm{B}(${n}, ${pTex(c.p0, c.pTex)})$`;
  const Xc = (m: number) => `$X \\sim \\mathrm{B}(${m}, ${pTex(c.p0, c.pTex)})$`;
  if (d < 3) {
    const [x, pv] = retry(
      () => {
        const mean = n * c.p0;
        const x = Math.max(0, Math.min(n, Math.round(mean + (up ? 1 : -1) * rng.int(1, Math.max(2, Math.round(Math.sqrt(n * c.p0 * (1 - c.p0)) * 3))))));
        const pv = up ? 1 - binomCdf(n, c.p0, x - 1) : binomCdf(n, c.p0, x);
        return [x, pv] as const;
      },
      ([x, pv]) => Math.abs(pv - alpha) > 0.004 && pv > 0.0005 && (up ? x > n * c.p0 : x < n * c.p0),
      200,
    );
    const reject = pv < alpha;
    return {
      prompt: `${c.setup} ${c.count(x, n)} Test, at the $${aTex}$ significance level, whether ${up ? c.up : c.down}. Use the hypotheses ${hyp}. Find the p-value, $P(X ${up ? '\\ge' : '\\le'} ${x})$ where ${X}, to 4 decimal places, and give the conclusion.`,
      parts: [p4(pv, 'p-value:'), part(fixedChoice([`Reject $H_0$: there is evidence that ${up ? c.up : c.down}`, `Do not reject $H_0$: there is not enough evidence that ${up ? c.up : c.down}`], reject ? 0 : 1), { label: 'Conclusion:' })],
      hints: [`Assume $H_0$ is true, so ${X}. The p-value is the probability of a result at least as extreme as $${x}$: $P(X ${up ? '\\ge' : '\\le'} ${x})$.`, `Compare the p-value with $${fmt(alpha)}$: reject $H_0$ if it is smaller.`],
      solution: [
        `Under $H_0$, ${X}.`,
        up ? `$P(X \\ge ${x}) = 1 - P(X \\le ${x - 1}) = 1 - ${f4(binomCdf(n, c.p0, x - 1))} = ${f4(pv)}$` : `$P(X \\le ${x}) = ${f4(pv)}$`,
        reject ? `$${f4(pv)} < ${fmt(alpha)}$, so the result is significant: reject $H_0$. There is evidence that ${up ? c.up : c.down}.` : `$${f4(pv)} > ${fmt(alpha)}$, so the result is not significant: do not reject $H_0$. There is not enough evidence that ${up ? c.up : c.down}.`,
      ],
      calculator: true,
    };
  }
  // The critical region of a one-tailed test, and its actual significance level: pick a sample
  // size for which the region exists.
  const [nOk, crit, actual] = retry(
    () => {
      const nn = rng.int(10, 30);
      const [cc, a] = critical(nn, c.p0, alpha, up);
      return [nn, cc, a] as const;
    },
    ([, , a]) => a <= alpha && a > 0.0005,
    200,
  );
  return {
    prompt: `${c.setup} A test at the $${aTex}$ significance level is planned to see whether ${up ? c.up : c.down}, using a sample of $${nOk}$, with ${hyp}. Find the critical value $c$ of the critical region $X ${up ? '\\ge' : '\\le'} c$, where ${Xc(nOk)}, and the actual significance level of the test to 4 decimal places.`,
    parts: [numPart(crit, { label: '$c =$' }), p4(actual, 'Actual significance level:')],
    hints: [`Look for the ${up ? 'smallest' : 'largest'} $c$ with $P(X ${up ? '\\ge' : '\\le'} c) \\le ${fmt(alpha)}$. Try values near the ${up ? 'top' : 'bottom'} of the distribution with the cumulative function.`, 'The actual significance level is $P(X$ in the critical region$)$, which is at most the stated level.'],
    solution: up
      ? [`$P(X \\ge ${crit}) = 1 - P(X \\le ${crit - 1}) = ${f4(actual)} \\le ${fmt(alpha)}$, but $P(X \\ge ${crit - 1}) = ${f4(1 - binomCdf(nOk, c.p0, crit - 2))} > ${fmt(alpha)}$.`, `So the critical region is $X \\ge ${crit}$, and the actual significance level is $${f4(actual)}$.`]
      : [`$P(X \\le ${crit}) = ${f4(actual)} \\le ${fmt(alpha)}$, but $P(X \\le ${crit + 1}) = ${f4(binomCdf(nOk, c.p0, crit + 1))} > ${fmt(alpha)}$.`, `So the critical region is $X \\le ${crit}$, and the actual significance level is $${f4(actual)}$.`],
    calculator: true,
  };
}

export const SAMPLING_SKILLS: SkillDef[] = [
  skill({ id: 'mx-sampling-method', name: 'Sampling methods', description: 'Recognize simple random, systematic, stratified, quota and opportunity sampling, and their weaknesses', outcomes: ['SD1'], lessonId: 'mx-14-1', format: 'mc', gen: samplingMethod }),
  skill({ id: 'mx-sample-sizes', name: 'Stratified, quota and systematic samples', description: 'Work out the numbers in a stratified or quota sample, and the interval of a systematic sample', outcomes: ['SD1'], lessonId: 'mx-14-1', gen: sampleSizes }),
  skill({ id: 'mx-sd-summary', name: 'Standard deviation from summary statistics', description: 'Find the mean and standard deviation from Σx and Σx², from a frequency table, and for two groups combined', outcomes: ['SD2'], lessonId: 'mx-14-2', calculator: true, gen: sdSummary }),
  skill({ id: 'mx-coding', name: 'Coding', description: 'Find the mean and standard deviation of data from coded values', outcomes: ['SD2'], lessonId: 'mx-14-2', calculator: true, gen: coding }),
  skill({ id: 'mx-outliers', name: 'Outliers', description: 'Find outliers with the 1.5 × IQR rule and with the mean ± 2 standard deviations', outcomes: ['SD3'], lessonId: 'mx-14-3', gen: outliers }),
  skill({ id: 'mx-cleaning-data', name: 'Cleaning data', description: 'Remove errors and outliers, and find the new mean and standard deviation', outcomes: ['SD3'], lessonId: 'mx-14-3', calculator: true, gen: cleaningData }),
  skill({ id: 'mx-drv-table', name: 'Probability distributions in tables', description: 'Find an unknown probability in a distribution table, and probabilities from it', outcomes: ['SD4'], lessonId: 'mx-14-4', gen: drvTable }),
  skill({ id: 'mx-drv-function', name: 'Probability functions', description: 'Use a probability function such as P(X = x) = kx, and find a distribution from equally likely outcomes', outcomes: ['SD4'], lessonId: 'mx-14-4', gen: drvFunction }),
  skill({ id: 'mx-binomial-exact', name: 'Binomial probabilities', description: 'Model a count with B(n, p) and find the probability of an exact number of successes', outcomes: ['SD5'], lessonId: 'mx-14-5', calculator: true, gen: binomialExact }),
  skill({ id: 'mx-binomial-cumulative', name: 'Cumulative binomial probabilities', description: 'Find P(X ≤ r), P(X ≥ r) and probabilities of ranges for a binomial distribution', outcomes: ['SD5'], lessonId: 'mx-14-5', calculator: true, gen: binomialCumulative }),
  skill({ id: 'mx-hypotheses', name: 'Writing hypotheses', description: 'Write the null and alternative hypotheses for a test of a proportion, and know the language of testing', outcomes: ['SD6'], lessonId: 'mx-14-6', format: 'mc', gen: hypotheses }),
  skill({ id: 'mx-binomial-test', name: 'Binomial hypothesis tests', description: 'Carry out a one-tailed binomial test with a p-value, and find a critical region and its actual significance level', outcomes: ['SD6'], lessonId: 'mx-14-6', calculator: true, gen: binomialTest }),
];
