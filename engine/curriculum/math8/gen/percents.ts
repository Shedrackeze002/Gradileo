/** Math 8 Unit 2 — Percents (N3). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, frac, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
  'Kiona', 'Emeka', 'Hana', 'Diego', 'Maya', 'Arjun',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook'];

const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
function group(s: string, min = 5): string {
  const [i, f] = s.split('.');
  const g = i.length >= min ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** A number inside maths, without trailing zeros (thin-space groups for five or more digits). */
const num = (x: number, dp = 6) => group(fmt(x, dp)).replace(/,/g, '\\,');
/** A percent inside maths. */
const pc = (p: number) => `${num(p)}\\%`;
/** Canadian money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2), 4)}`;
/** A price tag: whole dollars print without cents (\$60), otherwise \$59.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)), 4)}` : money(x));
/** A money amount inside maths, without a dollar sign: 12.50. */
const mv = (x: number) => group(fmtFixed(x, 2), 4).replace(/,/g, '{,}');
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
const CENT = 'to the nearest cent';
/** A money answer, graded to within a cent. */
const moneyPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
/** True when a money amount (before rounding) sits too close to half a cent. */
const onEdge = (v: number) => {
  const s = Math.abs(v) * 100;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.02;
};
/** Round to the cent. */
const r2 = (x: number) => roundTo(x, 2);
/** "= 12.5" when exact at 2 places, otherwise "\approx 12.47" (for money steps). */
const eqMoney = (v: number) => (Math.abs(r2(v) - v) < 1e-9 ? `= ${mv(v)}` : `= ${num(v, 4)} \\approx ${mv(v)}`);
/** A rounded percent answer to the nearest tenth: true when it is not on a rounding edge. */
const safeTenth = (x: number) => {
  const f = Math.abs(x) * 10;
  return Math.abs(f - Math.floor(f) - 0.5) > 0.04;
};
/** Smallest number of decimals (0-6) that writes v exactly. */
function exactDp(v: number): number {
  for (let dp = 0; dp <= 6; dp++) if (Math.abs(roundTo(v, dp) - v) < 1e-9) return dp;
  return 6;
}
/** A fraction in lowest terms in LaTeX, as a mixed number when it is greater than 1. */
function fracTex(n: number, d: number, mixed = false): string {
  const f = frac(n, d);
  if (f.d === 1) return `${f.n}`;
  if (mixed && f.n > f.d) return `${Math.floor(f.n / f.d)}\\tfrac{${f.n % f.d}}{${f.d}}`;
  return fr(f.n, f.d);
}

const PCT_MEANS = 'Percent means "out of $100$".';

/** A fraction answer in lowest terms (improper fractions and mixed numbers accepted). */
function fracPart(n: number, d: number, label?: string): Part {
  const f = frac(n, d);
  return { label, answer: { kind: 'numeric', value: f.n / f.d, allowExpression: true, fraction: 'lowest', exact: f.d === 1 ? `${f.n}` : `${f.n}/${f.d}` } };
}

// ---------------------------------------------------------------------------
// 2.1 Percents greater than 100% and less than 1%
// ---------------------------------------------------------------------------

/** A percent written as a value p and how it is shown (a decimal percent or a fraction of a percent). */
interface Pct {
  p: number;
  tex: string;
  /** The fraction of a percent, for 1/4 % style percents. */
  fp?: [number, number];
}
const P = (p: number): Pct => ({ p, tex: pc(p) });
const FP = (n: number, d: number): Pct => ({ p: n / d, tex: `\\tfrac{${n}}{${d}}\\%`, fp: [n, d] });

const BIG_EASY = [150, 200, 250, 300, 120, 400, 175, 110, 350];
const BIG_HARD = [125, 130, 140, 160, 180, 225, 105, 112.5, 137.5, 275, 320];
const SMALL_EASY = [0.5, 0.2, 0.8, 0.3, 0.1, 0.4, 0.6, 0.9];
const SMALL_HARD = [0.25, 0.75, 0.05, 0.125, 0.35, 0.45, 0.04];
const FRAC_PCTS: Array<[number, number]> = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 8], [3, 5], [1, 10], [3, 8]];

function sizeNote(p: number): string {
  if (p > 100) return `Since $${pc(p)}$ is more than $100\\%$, the decimal is greater than $1$.`;
  if (p < 1) return `Since $${pc(p)}$ is less than $1\\%$, the decimal is less than $0.01$.`;
  return '';
}

/** Steps that turn a percent into a decimal. */
function toDecSteps(q: Pct): { steps: string[]; dec: number } {
  const dec = clean(q.p / 100);
  const steps: string[] = [];
  if (q.fp) steps.push(`First write the fraction of a percent as a decimal percent: $\\tfrac{${q.fp[0]}}{${q.fp[1]}} = ${q.fp[0]} \\div ${q.fp[1]} = ${num(q.p)}$, so $${q.tex} = ${pc(q.p)}$.`);
  steps.push(`Divide by $100$. The decimal point moves $2$ places to the left: $${num(q.p)} \\div 100 = ${num(dec, 8)}$`);
  const note = sizeNote(q.p);
  if (note) steps.push(note);
  return { steps, dec };
}

function pctToDec(q: Pct): GenOutput {
  const { steps, dec } = toDecSteps(q);
  return {
    prompt: `Write $${q.tex}$ as a decimal.`,
    parts: [numPart(dec, { display: 'decimal', asDecimal: true })],
    hints: [`${PCT_MEANS} To change a percent to a decimal, divide by $100$.`, 'Dividing by $100$ moves the decimal point $2$ places to the left. Put in zeros if you run out of digits.'],
    solution: [...steps, `So $${q.tex} = ${num(dec, 8)}$.`],
  };
}

function decToPct(dec: number): GenOutput {
  const p = clean(dec * 100);
  return {
    prompt: `Write $${num(dec, 8)}$ as a percent.`,
    parts: [numPart(p, { suffix: '%' })],
    hints: ['To change a decimal to a percent, multiply by $100$.', 'Multiplying by $100$ moves the decimal point $2$ places to the right.'],
    solution: [
      `Multiply by $100$. The decimal point moves $2$ places to the right: $${num(dec, 8)} \\times 100 = ${num(p)}$`,
      dec > 1 ? `A decimal greater than $1$ is more than $100\\%$.` : dec < 0.01 ? `A decimal less than $0.01$ is less than $1\\%$.` : `Check: the size makes sense.`,
      `So $${num(dec, 8)} = ${pc(p)}$.`,
    ],
  };
}

function pctToDecMc(rng: Rng, q: Pct): GenOutput {
  const { steps, dec } = toDecSteps(q);
  const ds = [q.p / 10, q.p / 1000, q.p, q.p * 100].map(clean).filter((x) => x !== dec && x < 100000);
  return {
    prompt: `Which decimal is equal to $${q.tex}$?`,
    parts: [{ answer: mc(rng, `$${num(dec, 8)}$`, ds.map((x) => `$${num(x, 8)}$`)) }],
    hints: [`${PCT_MEANS} To change a percent to a decimal, divide by $100$.`, 'Dividing by $100$ moves the decimal point $2$ places to the left.'],
    solution: [...steps, `So $${q.tex} = ${num(dec, 8)}$.`],
  };
}

/** Steps that turn a percent into a fraction in lowest terms. */
function toFracSteps(q: Pct): { steps: string[]; n: number; d: number } {
  const steps: string[] = [];
  let n: number;
  let d: number;
  if (q.fp) {
    [n, d] = [q.fp[0], q.fp[1] * 100];
    steps.push(`$${q.tex}$ means $\\tfrac{${q.fp[0]}}{${q.fp[1]}}$ out of $100$, so divide by $100$: $${fr(q.fp[0], q.fp[1])} \\div 100 = ${fr(q.fp[0], q.fp[1])} \\times ${fr(1, 100)} = ${fr(n, d)}$`);
  } else {
    const dp = exactDp(q.p);
    const k = 10 ** dp;
    [n, d] = [Math.round(q.p * k), 100 * k];
    steps.push(`${PCT_MEANS} $${pc(q.p)} = ${fr(num(q.p), 100)}$`);
    if (dp > 0) steps.push(`Multiply the top and the bottom by $${num(k)}$ to clear the decimal: $${fr(num(q.p), 100)} = ${fr(num(n), num(d))}$`);
  }
  const g = gcd(n, d);
  if (g > 1) steps.push(`Divide the top and the bottom by $${num(g)}$: $${fr(num(n), num(d))} = ${fr(num(n / g), num(d / g))}$`);
  return { steps, n: n / g, d: d / g };
}

function pctToFrac(q: Pct): GenOutput {
  const { steps, n, d } = toFracSteps(q);
  const big = n > d;
  return {
    prompt: `Write $${q.tex}$ as a fraction in lowest terms.${big ? ' You may write it as an improper fraction or a mixed number.' : ''}`,
    parts: [fracPart(n, d)],
    hints: [`${PCT_MEANS} Write the percent over $100$.`, q.fp ? 'Dividing by $100$ is the same as multiplying by $\\frac{1}{100}$. Then simplify.' : q.p % 1 ? 'Multiply the top and the bottom by $10$ (or $100$) to get whole numbers, then simplify.' : 'Simplify: divide the top and the bottom by their greatest common factor.'],
    solution: [...steps, big ? `So $${q.tex} = ${fr(n, d)} = ${fracTex(n, d, true)}$.` : `So $${q.tex} = ${fr(n, d)}$.`],
  };
}

const F2P: Array<{ n: number; d: number; w?: number }> = [
  { n: 3, d: 2 }, { n: 5, d: 4 }, { n: 7, d: 4 }, { n: 9, d: 4 }, { n: 6, d: 5 }, { n: 11, d: 10 }, { n: 1, d: 2, w: 2 }, { n: 3, d: 4, w: 1 }, { n: 1, d: 4, w: 3 },
  { n: 1, d: 200 }, { n: 1, d: 400 }, { n: 1, d: 500 }, { n: 3, d: 1000 }, { n: 1, d: 1000 }, { n: 3, d: 400 }, { n: 7, d: 1000 }, { n: 1, d: 250 },
];

function fracToPct(f: { n: number; d: number; w?: number }): GenOutput {
  const v = (f.w ?? 0) + f.n / f.d;
  const dec = clean(v);
  const p = clean(v * 100);
  const tex = f.w ? `${f.w}\\tfrac{${f.n}}{${f.d}}` : fr(f.n, f.d);
  return {
    prompt: `Write $${tex}$ as a percent.`,
    parts: [numPart(p, { suffix: '%' })],
    hints: ['Change the fraction to a decimal first: divide the top by the bottom.', 'Then multiply by $100$ to get a percent.'],
    solution: [
      f.w ? `$${tex} = ${f.w} + ${fr(f.n, f.d)} = ${f.w} + ${num(f.n / f.d)} = ${num(dec)}$` : `Divide: $${f.n} \\div ${f.d} = ${num(dec, 8)}$`,
      `Multiply by $100$: $${num(dec, 8)} \\times 100 = ${num(p)}$`,
      `So $${tex} = ${pc(p)}$.`,
    ],
  };
}

function orderPercents(rng: Rng): GenOutput {
  type V = { v: number; md: string; conv: string };
  const vals = retry(
    () => {
      const sp = rng.pick(SMALL_EASY);
      const sd = rng.pick([0.003, 0.007, 0.02, 0.04, 0.06, 0.009]);
      const [fn, fd] = rng.pick([[1, 4], [3, 4], [1, 5], [2, 5], [1, 2], [1, 20], [3, 20]] as Array<[number, number]>);
      const bp = rng.pick([110, 120, 125, 140, 150, 175, 220, 250]);
      const bd = rng.pick([1.05, 1.3, 1.6, 1.8, 2.1, 2.4, 0.9, 0.65]);
      const out: V[] = [
        { v: sp / 100, md: `$${pc(sp)}$`, conv: `$${pc(sp)} = ${num(sp / 100, 8)}$` },
        { v: sd, md: `$${num(sd)}$`, conv: '' },
        { v: fn / fd, md: `$\\frac{${fn}}{${fd}}$`, conv: `$\\frac{${fn}}{${fd}} = ${num(fn / fd)}$` },
        { v: bp / 100, md: `$${pc(bp)}$`, conv: `$${pc(bp)} = ${num(bp / 100)}$` },
        { v: bd, md: `$${num(bd)}$`, conv: '' },
      ];
      return out;
    },
    (vs) => vs.every((x, i) => vs.every((y, j) => i === j || Math.max(x.v, y.v) / Math.min(x.v, y.v) > 1.12)),
  );
  const shown = retry(
    () => rng.shuffle(vals),
    (s) => s.some((p, i) => i > 0 && p.v < s[i - 1].v),
  );
  const items: Choice[] = shown.map((p, i) => ({ id: 'abcde'[i], md: p.md }));
  const idOf = (p: V) => items[shown.indexOf(p)].id;
  const sorted = [...vals].sort((x, y) => x.v - y.v);
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map(idOf) };
  return {
    prompt: 'Put these numbers in order from **least to greatest**.',
    parts: [{ answer }],
    hints: ['Write every number as a decimal so they are easy to compare.', 'To change a percent to a decimal, divide by $100$. To change a fraction to a decimal, divide the top by the bottom.'],
    solution: [
      `Write each one as a decimal: ${vals.filter((p) => p.conv).map((p) => p.conv).join(', ')}.`,
      `Compare the decimals: $${sorted.map((p) => num(p.v, 8)).join(' < ')}$`,
      `From least to greatest: ${sorted.map((p) => p.md).join(', ')}.`,
    ],
  };
}

const BIG_MEANING = [
  { setup: (p: string) => `This year, the Grade 8 class collected ${p} as many cans for the food bank as last year.`, who: 'The class', verb: 'collected', noun: 'cans', base: 'last year' },
  { setup: (p: string) => `A hockey team sold ${p} as many tickets this season as last season.`, who: 'The team', verb: 'sold', noun: 'tickets', base: 'last season' },
  { setup: (p: string) => `A smoothie stand sold ${p} as many drinks on a hot Saturday as on a usual Saturday.`, who: 'The stand', verb: 'sold', noun: 'drinks', base: 'on a usual Saturday' },
  { setup: (p: string) => `A school library lent out ${p} as many books in March as in February.`, who: 'The library', verb: 'lent out', noun: 'books', base: 'in February' },
];

const SMALL_MEANING = [
  { setup: (p: string) => `At an egg farm, ${p} of the eggs are cracked.`, noun: 'eggs' },
  { setup: (p: string) => `At a factory, ${p} of the hockey pucks made are faulty.`, noun: 'pucks' },
  { setup: (p: string) => `In a raffle, ${p} of the tickets win a prize.`, noun: 'tickets' },
  { setup: (p: string) => `${p} of the light bulbs in a shipment are broken.`, noun: 'bulbs' },
];

function percentMeaning(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const p = rng.pick([150, 200, 250, 300, 120, 175, 125, 140]);
    const c = rng.pick(BIG_MEANING);
    const times = clean(p / 100);
    const more = p - 100;
    const correct = `${c.who} ${c.verb} $${num(times)}$ times as many ${c.noun} as ${c.base}.`;
    const wrong = [
      `${c.who} ${c.verb} exactly $${p}$ more ${c.noun} than ${c.base}.`,
      `${c.who} ${c.verb} $${num(p / 10)}$ times as many ${c.noun} as ${c.base}.`,
      `${c.who} ${c.verb} $${pc(p)}$ more ${c.noun} than ${c.base}.`,
    ];
    return {
      prompt: `${c.setup(`$${pc(p)}$`)} Which statement is true?`,
      parts: [{ answer: mc(rng, correct, wrong) }],
      hints: ['$100\\%$ is the whole amount from before. More than $100\\%$ means more than the whole.', `Write $${pc(p)}$ as a decimal.`],
      solution: [
        `$${pc(p)} = ${num(times)}$, so the new amount is $${num(times)}$ times the old amount.`,
        `$${pc(p)} = 100\\% + ${pc(more)}$: the whole old amount plus $${pc(more)}$ more.`,
        `The true statement: ${correct}`,
      ],
    };
  }
  const q = rng.pick([P(0.5), P(0.1), P(0.2), P(0.3), P(0.4), P(0.8), FP(1, 2), FP(1, 4), P(0.25)]);
  const c = rng.pick(SMALL_MEANING);
  const per1000 = clean(q.p * 10);
  const isWholePer1000 = isWhole(per1000);
  const correct = isWholePer1000 ? `$${num(per1000)}$ out of every $1000$ ${c.noun}` : `$${num(q.p * 100)}$ out of every $10\\,000$ ${c.noun}`;
  const wrong = isWholePer1000
    ? [`$${num(per1000)}$ out of every $100$ ${c.noun}`, `$${num(per1000)}$ out of every $10$ ${c.noun}`, `$${num(per1000)}$ out of every $10\\,000$ ${c.noun}`]
    : [`$${num(q.p * 100)}$ out of every $100$ ${c.noun}`, `$${num(q.p * 100)}$ out of every $1000$ ${c.noun}`, `$${num(q.p)}$ out of every $10$ ${c.noun}`];
  const { dec } = toDecSteps(q);
  return {
    prompt: `${c.setup(`$${q.tex}$`)} Which of these means the same thing?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['Less than $1\\%$ means less than $1$ out of every $100$.', `Write $${q.tex}$ as a decimal, then as a fraction with $1000$ or $10\\,000$ on the bottom.`],
    solution: [
      ...(q.fp ? [`$${q.tex} = ${pc(q.p)}$`] : []),
      `$${pc(q.p)} = ${num(dec, 8)}$`,
      isWholePer1000 ? `$${num(dec, 8)} = ${fr(num(per1000), 1000)}$` : `$${num(dec, 8)} = ${fr(num(q.p * 100), '10\\,000')}$`,
      `So $${q.tex}$ means ${correct}.`,
    ],
  };
}

const BIG_CTX = [
  (p: string, t: string) => `This season, the minor hockey association in ${t} has ${p} as many players as last season.`,
  (p: string) => `Ticket sales for the spring concert were ${p} of the ticket sales for the winter concert.`,
  (p: string, t: string) => `On a hot day, a smoothie stand in ${t} sold ${p} of its usual number of drinks.`,
  (p: string) => `A puppy now has a mass that is ${p} of its mass at birth.`,
  (p: string) => `The school fun run raised ${p} of its goal.`,
];
const SMALL_CTX = [
  (p: string, t: string) => `At an egg farm near ${t}, ${p} of the eggs are cracked.`,
  (p: string) => `A savings account pays interest of ${p} per year.`,
  (p: string) => `At a factory, ${p} of the hockey pucks made are faulty.`,
  (p: string) => `${p} of the tickets in a raffle win a prize.`,
];

function twoForms(rng: Rng): GenOutput {
  const big = rng.chance(0.5);
  const q = big ? P(rng.pick([...BIG_EASY, ...BIG_HARD.filter((x) => x % 1 === 0)])) : rng.pick([...SMALL_EASY.map(P), ...[0.25, 0.75, 0.05].map(P), ...FRAC_PCTS.slice(0, 5).map(([n, d]) => FP(n, d))]);
  const ctx = rng.pick(big ? BIG_CTX : SMALL_CTX)(`$${q.tex}$`, rng.pick(TOWNS));
  const ds = toDecSteps(q);
  const fs = toFracSteps(q);
  return {
    prompt: `${ctx} Write $${q.tex}$ as a decimal and as a fraction in lowest terms.`,
    parts: [numPart(ds.dec, { label: 'Decimal', display: 'decimal', asDecimal: true }), fracPart(fs.n, fs.d, 'Fraction')],
    hints: ['To get the decimal, divide the percent by $100$.', 'To get the fraction, write the percent over $100$ and simplify. Clear any decimal first.'],
    solution: [
      `Decimal: ${ds.steps[ds.steps.length - (sizeNote(q.p) ? 2 : 1)]}`,
      ...fs.steps,
      `$${q.tex} = ${num(ds.dec, 8)} = ${fr(fs.n, fs.d)}$${fs.n > fs.d ? `, or $${fracTex(fs.n, fs.d, true)}$` : ''}.`,
    ],
  };
}

const percentRepresent = skill({
  id: 'm8-percent-represent',
  name: 'Percents above 100% and below 1%',
  description: 'Write percents greater than 100% and less than 1%, including fractional percents, as decimals and fractions, and change them back to percents.',
  outcomes: ['N3'],
  lessonId: 'm8-2-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const kind = rng.pick(['p2d', 'p2d', 'd2p', 'mc'] as const);
      const q = rng.chance(0.5) ? P(rng.pick(BIG_EASY)) : P(rng.pick(SMALL_EASY));
      if (kind === 'p2d') return pctToDec(q);
      if (kind === 'mc') return pctToDecMc(rng, q);
      return decToPct(rng.pick([1.5, 2, 2.5, 3.2, 1.25, 4, 0.005, 0.002, 0.007, 0.003, 0.008, 1.1]));
    }
    if (d === 2) {
      const kind = rng.pick(['p2f', 'p2f', 'f2p', 'fp2d', 'd2p'] as const);
      if (kind === 'p2f') {
        const r = rng.int(0, 2);
        const q = r === 0 ? P(rng.pick([...BIG_EASY, ...BIG_HARD])) : r === 1 ? P(rng.pick([...SMALL_EASY, ...SMALL_HARD])) : FP(...rng.pick(FRAC_PCTS));
        return pctToFrac(q);
      }
      if (kind === 'f2p') return fracToPct(rng.pick(F2P));
      if (kind === 'fp2d') return pctToDec(FP(...rng.pick(FRAC_PCTS)));
      return decToPct(rng.pick([1.125, 0.0025, 0.0075, 1.08, 2.35, 0.0045, 1.375, 0.0005, 3.05]));
    }
    const kind = rng.pick(['order', 'meaning', 'forms'] as const);
    if (kind === 'order') return orderPercents(rng);
    if (kind === 'meaning') return percentMeaning(rng);
    return twoForms(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Percent of a number
// ---------------------------------------------------------------------------

/** Steps for p% of n with the decimal method. */
function ofSteps(q: Pct, n: number, unit = ''): { steps: string[]; v: number } {
  const dec = clean(q.p / 100);
  const v = clean(dec * n);
  const steps: string[] = [];
  if (q.fp) steps.push(`$${q.tex} = ${pc(q.p)}$`);
  steps.push(`Write the percent as a decimal: $${pc(q.p)} = ${num(dec, 8)}$`);
  steps.push(`Multiply: $${num(dec, 8)} \\times ${num(n)} = ${num(v)}${unit}$`);
  return { steps, v };
}

function ofBigEasy(rng: Rng): GenOutput {
  const p = rng.pick([150, 200, 250, 300, 125, 110, 120]);
  const n = retry(() => rng.int(2, 24) * rng.pick([2, 4, 5, 10]), (x) => isWhole((x * p) / 100) && x >= 8 && x <= 200);
  const v = (n * p) / 100;
  const extra = p - 100;
  const mental =
    p === 200 || p === 300
      ? `$${pc(p)}$ is $${p / 100}$ times the number: $${p / 100} \\times ${n} = ${v}$`
      : `$${pc(p)} = 100\\% + ${pc(extra)}$. $100\\%$ of $${n}$ is $${n}$, and $${pc(extra)}$ of $${n}$ is $${num((n * extra) / 100)}$. Add: $${n} + ${num((n * extra) / 100)} = ${v}$`;
  return {
    prompt: `Find $${pc(p)}$ of $${n}$.`,
    parts: [numPart(v)],
    hints: [`$100\\%$ of $${n}$ is $${n}$, so $${pc(p)}$ of $${n}$ is more than $${n}$.`, `Write $${pc(p)}$ as a decimal and multiply, or split it into $100\\%$ and $${pc(extra)}$.`],
    solution: [`Write the percent as a decimal: $${pc(p)} = ${num(p / 100)}$`, `Multiply: $${num(p / 100)} \\times ${n} = ${v}$`, `Check with mental math: ${mental}.`, `$${pc(p)}$ of $${n}$ is $${v}$.`],
  };
}

function ofSmallEasy(rng: Rng): GenOutput {
  const [p, step] = rng.pick([[1, 100], [0.5, 200], [0.1, 1000], [0.2, 500], [1, 100], [0.5, 200]] as Array<[number, number]>);
  const n = step * rng.int(2, 9);
  const one = n / 100;
  const v = clean((n * p) / 100);
  const work =
    p === 1
      ? `$1\\%$ of $${n}$ is $${n} \\div 100 = ${num(one)}$.`
      : p === 0.5
        ? `$1\\%$ of $${n}$ is $${n} \\div 100 = ${num(one)}$. $0.5\\%$ is half of that: $${num(one)} \\div 2 = ${num(v)}$.`
        : p === 0.1
          ? `$1\\%$ of $${n}$ is $${n} \\div 100 = ${num(one)}$. $0.1\\%$ is one tenth of that: $${num(one)} \\div 10 = ${num(v)}$.`
          : `$1\\%$ of $${n}$ is $${n} \\div 100 = ${num(one)}$. $0.1\\%$ is $${num(one / 10)}$, so $0.2\\%$ is $2 \\times ${num(one / 10)} = ${num(v)}$.`;
  return {
    prompt: `Find $${pc(p)}$ of $${num(n)}$.`,
    parts: [numPart(v)],
    hints: [`Find $1\\%$ first: divide by $100$.`, p === 1 ? 'That is the answer.' : `$${pc(p)}$ is a part of $1\\%$. Divide again.`],
    solution: [work, `Check with the decimal method: $${pc(p)} = ${num(p / 100, 8)}$ and $${num(p / 100, 8)} \\times ${num(n)} = ${num(v)}$.`, `$${pc(p)}$ of $${num(n)}$ is $${num(v)}$.`],
  };
}

function ofSmallHard(rng: Rng): GenOutput {
  const q = rng.pick([P(0.25), P(0.75), P(0.3), P(0.4), P(0.6), P(0.8), P(0.05), FP(1, 4), FP(3, 4), FP(1, 2), P(0.15)]);
  const n = retry(() => 100 * rng.int(2, 120), (x) => isWhole((x * q.p) / 100) && (x * q.p) / 100 >= 2 && (x * q.p) / 100 <= 150);
  const { steps, v } = ofSteps(q, n);
  return {
    prompt: `Find $${q.tex}$ of $${num(n)}$.`,
    parts: [numPart(v)],
    hints: ['Write the percent as a decimal. A percent less than $1\\%$ becomes a decimal less than $0.01$.', 'Multiply the decimal by the number. Or find $1\\%$ first, then take part of it.'],
    solution: [...steps, `$${q.tex}$ of $${num(n)}$ is $${num(v)}$.`],
    calculator: true,
  };
}

function ofBigHard(rng: Rng): GenOutput {
  const p = rng.pick([135, 112.5, 175, 240, 105, 115, 160, 225, 130, 180]);
  const n = retry(() => rng.int(8, 160), (x) => isWhole((x * p) / 10) && (x * p) / 100 < 1000);
  const { steps, v } = ofSteps(P(p), n);
  return {
    prompt: `Find $${pc(p)}$ of $${n}$.`,
    parts: [numPart(v, exactDp(v) > 0 ? { decimals: exactDp(v), tolerance: 0.004 } : {})],
    hints: [`$${pc(p)}$ is more than $100\\%$, so the answer is more than $${n}$.`, 'Write the percent as a decimal and multiply.'],
    solution: [...steps, `$${pc(p)}$ of $${n}$ is $${num(v)}$.`],
    calculator: true,
  };
}

const PRICE_UP = [
  { item: 'a hockey stick', lo: 60, hi: 250 },
  { item: 'a pair of running shoes', lo: 70, hi: 180 },
  { item: 'a season pass at a ski hill', lo: 300, hi: 800 },
  { item: 'a bike helmet', lo: 40, hi: 120 },
  { item: 'a video game', lo: 50, hi: 90 },
];

function ofPrice(rng: Rng): GenOutput {
  const c = rng.pick(PRICE_UP);
  const name = rng.pick(NAMES);
  const [old, p, v] = retry(
    () => {
      const old = rng.int(c.lo, c.hi) - rng.pick([0, 0.01, 0.51]);
      const p = rng.pick([102, 104, 105, 108, 110, 112, 115, 120, 125]);
      return [old, p, (old * p) / 100];
    },
    ([, , v]) => !onEdge(v),
  );
  return {
    prompt: `${name} is shopping for ${c.item}. Last year, it cost ${tag(old)}. This year, the price is $${pc(p)}$ of last year’s price. What is the price this year, ${CENT}?`,
    parts: [moneyPart(v)],
    hints: [`$${pc(p)}$ of the old price means multiply the old price by $${num(p / 100)}$.`, 'Round your answer to the nearest cent at the end.'],
    solution: [`$${pc(p)} = ${num(p / 100)}$`, `$${num(p / 100)} \\times ${mv(old)} ${eqMoney(v)}$`, `The price this year is ${money(r2(v))}.`],
    calculator: true,
  };
}

const FAULTY = [
  { what: 'hockey pucks', place: 'A factory makes' },
  { what: 'light bulbs', place: 'A factory makes' },
  { what: 'water bottles', place: 'A plant fills' },
  { what: 'pencils', place: 'A factory makes' },
];

function ofWord(rng: Rng): GenOutput {
  const kind = rng.pick(['interest', 'fund', 'puppy', 'faulty'] as const);
  const name = rng.pick(NAMES);
  if (kind === 'interest') {
    const [P0, r, I] = retry(
      () => {
        const P0 = 25 * rng.int(20, 200);
        const r = rng.pick([0.5, 0.75, 0.25, 0.8, 0.6, 0.9, 0.35]);
        return [P0, r, (P0 * r) / 100];
      },
      ([, , I]) => !onEdge(I),
    );
    return {
      prompt: `${name} puts ${tag(P0)} in a savings account that pays interest of $${pc(r)}$ of the amount in the account each year. How much interest does ${name} earn in one year? How much is in the account after one year? Give each answer ${CENT}.`,
      parts: [moneyPart(I, 'Interest: \\$'), moneyPart(P0 + r2(I), 'In the account: \\$')],
      hints: [`$${pc(r)}$ is less than $1\\%$. Write it as a decimal: divide by $100$.`, 'Multiply the decimal by the amount in the account. Add the interest to find the new amount.'],
      solution: [
        `$${pc(r)} = ${num(r / 100, 8)}$`,
        `Interest: $${num(r / 100, 8)} \\times ${mv(P0)} ${eqMoney(I)}$`,
        `In the account: $${mv(P0)} + ${mv(r2(I))} = ${mv(P0 + r2(I))}$`,
        `${name} earns ${money(r2(I))} in interest and has ${money(P0 + r2(I))} after one year.`,
      ],
      calculator: true,
    };
  }
  if (kind === 'fund') {
    const G = rng.pick([800, 1200, 1500, 2000, 2400, 2500, 3000, 3600]);
    const p = rng.pick([105, 110, 115, 120, 125, 130, 135, 140, 150, 160]);
    const raised = (G * p) / 100;
    const cause = rng.pick(['a class trip to a dinosaur museum', 'new equipment for the school gym', 'the local animal shelter', 'a community garden', 'the food bank']);
    return {
      prompt: `The Grade 8 classes set a goal of raising ${tag(G)} for ${cause}. They raised $${pc(p)}$ of their goal. How much did they raise? By how much did they go over their goal? Give each answer ${CENT}.`,
      parts: [moneyPart(raised, 'Raised: \\$'), moneyPart(raised - G, 'Over the goal: \\$')],
      hints: [`$${pc(p)}$ of the goal is more than the goal. Write $${pc(p)}$ as a decimal and multiply.`, 'Subtract the goal from the amount raised.'],
      solution: [`$${pc(p)} = ${num(p / 100)}$`, `Raised: $${num(p / 100)} \\times ${mv(G)} = ${mv(raised)}$`, `Over the goal: $${mv(raised)} - ${mv(G)} = ${mv(raised - G)}$`, `They raised ${money(raised)}, which is ${money(raised - G)} over their goal.`],
      calculator: true,
    };
  }
  if (kind === 'puppy') {
    const pet = rng.pick([
      { who: 'puppy', when: 'at 10 weeks old', later: 'Now, as an adult dog,', lo: 30, hi: 60, ps: [250, 300, 350, 400, 500] },
      { who: 'kitten', when: 'at 8 weeks old', later: 'Now, as an adult cat,', lo: 8, hi: 12, ps: [300, 350, 400, 450] },
      { who: 'calf', when: 'when it was born on the family farm', later: 'At 6 months old,', lo: 35, hi: 45, ps: [400, 450, 500, 550] },
    ]);
    const m = pet.who === 'calf' ? rng.int(pet.lo, pet.hi) : rng.int(pet.lo, pet.hi) / 10;
    const p = rng.pick(pet.ps);
    const now = clean((m * p) / 100);
    const gain = clean(now - m);
    return {
      prompt: `${name}’s ${pet.who} had a mass of $${num(m)}\\ \\text{kg}$ ${pet.when}. ${pet.later} its mass is $${pc(p)}$ of that. What is its mass now? How much mass has it gained?`,
      parts: [numPart(now, { label: 'Mass now', suffix: 'kg', display: 'decimal' }), numPart(gain, { label: 'Gained', suffix: 'kg', display: 'decimal' })],
      hints: [`$${pc(p)}$ means $${num(p / 100)}$ times as much.`, 'Subtract the earlier mass from the mass now.'],
      solution: [`$${pc(p)} = ${num(p / 100)}$`, `Mass now: $${num(p / 100)} \\times ${num(m)} = ${num(now)}$`, `Gained: $${num(now)} - ${num(m)} = ${num(gain)}$`, `Its mass now is $${num(now)}\\ \\text{kg}$, a gain of $${num(gain)}\\ \\text{kg}$.`],
      calculator: true,
    };
  }
  const c = rng.pick(FAULTY);
  const q = rng.pick([P(0.25), P(0.5), P(0.2), P(0.75), P(0.4), P(0.15), FP(1, 4), FP(1, 2)]);
  const N = retry(() => 1000 * rng.int(4, 40), (x) => isWhole((x * q.p) / 100));
  const { steps, v } = ofSteps(q, N);
  return {
    prompt: `${c.place} $${num(N)}$ ${c.what} a day. On average, $${q.tex}$ of them are faulty. About how many are faulty each day? How many are not faulty?`,
    parts: [numPart(v, { label: 'Faulty' }), numPart(N - v, { label: 'Not faulty' })],
    hints: [`$${q.tex}$ is less than $1\\%$, so only a few are faulty. Write it as a decimal.`, 'Multiply, then subtract from the total.'],
    solution: [...steps, `Not faulty: $${num(N)} - ${num(v)} = ${num(N - v)}$`, `About $${num(v)}$ are faulty and $${num(N - v)}$ are not faulty.`],
    calculator: true,
  };
}

const percentOf = skill({
  id: 'm8-percent-of',
  name: 'Percent of a number',
  description: 'Find a percent of a number, including percents greater than 100% and fractional percents less than 1%.',
  outcomes: ['N3'],
  lessonId: 'm8-2-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return { ...(rng.chance(0.5) ? ofBigEasy(rng) : ofSmallEasy(rng)), calculator: false };
    if (d === 2) {
      const kind = rng.pick(['small', 'small', 'big', 'price'] as const);
      if (kind === 'small') return ofSmallHard(rng);
      if (kind === 'big') return ofBigHard(rng);
      return ofPrice(rng);
    }
    return ofWord(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Percent change
// ---------------------------------------------------------------------------

const CHANGE_RULE = 'Percent change $= \\dfrac{\\text{amount of change}}{\\text{original amount}} \\times 100\\%$';

interface ChangeCtx {
  /** Sentence with the old and new values. */
  text: (name: string, a: string, b: string) => string;
  noun: string;
  money?: boolean;
  /** Typical size of the original amount. */
  lo: number;
  hi: number;
}

const CHANGE_CTX: ChangeCtx[] = [
  { text: (n, a, b) => `${n}’s hockey team scored ${a} goals last season and ${b} goals this season.`, noun: 'goals', lo: 30, hi: 120 },
  { text: (n, a, b) => `The chess club at ${n}’s school had ${a} members last year and has ${b} members this year.`, noun: 'members', lo: 16, hi: 60 },
  { text: (_n, a, b) => `The Grade 8 food drive collected ${a} cans last year and ${b} cans this year.`, noun: 'cans', lo: 200, hi: 900 },
  { text: (n, a, b) => `${n}’s school website had ${a} visits in September and ${b} visits in October.`, noun: 'visits', lo: 800, hi: 4000 },
  { text: (_n, a, b) => `A dairy farm sold ${a} litres of milk on Monday and ${b} litres on Tuesday.`, noun: 'litres', lo: 400, hi: 2000 },
  { text: (_n, a, b) => `The price of a monthly bus pass changed from ${a} to ${b}.`, noun: 'price', money: true, lo: 40, hi: 120 },
  { text: (_n, a, b) => `The price of a pair of skates changed from ${a} to ${b}.`, noun: 'price', money: true, lo: 80, hi: 300 },
  { text: (_n, a, b) => `A basketball team scored ${a} points in its first game and ${b} points in its second game.`, noun: 'points', lo: 40, hi: 90 },
];

const showVal = (c: ChangeCtx, x: number) => (c.money ? tag(x) : `$${num(x)}$`);
const mathVal = (c: ChangeCtx, x: number) => (c.money ? mv(x) : num(x));

function changeSteps(c: ChangeCtx, o: number, n: number, pct: number, dp?: number): string[] {
  const up = n > o;
  const diff = clean(Math.abs(n - o));
  return [
    `The amount ${up ? 'increased' : 'decreased'}. Amount of change: $${mathVal(c, up ? n : o)} - ${mathVal(c, up ? o : n)} = ${mathVal(c, diff)}$`,
    `Divide by the **original** amount, $${mathVal(c, o)}$: $${fr(mathVal(c, diff), mathVal(c, o))} ${isWhole(pct * 1e4) && dp === undefined ? '=' : '\\approx'} ${num(pct / 100, 6)}$`,
    dp === undefined ? `Multiply by $100$: the percent ${up ? 'increase' : 'decrease'} is $${pc(pct)}$.` : `Multiply by $100$: $${num(pct, 4)}$, which rounds to $${fmtFixed(pct, dp)}\\%$.`,
  ];
}

function changeEasy(rng: Rng): GenOutput {
  const c = rng.pick(CHANGE_CTX);
  const name = rng.pick(NAMES);
  const up = rng.chance(0.55);
  const [o, r] = retry(
    () => {
      const r = up ? rng.pick([10, 20, 25, 40, 50, 75, 100, 150]) : rng.pick([10, 20, 25, 40, 50, 75]);
      const o = rng.pick([20, 25, 40, 50, 60, 80, 120, 200, 240, 400, 500, 800]);
      return [o, r];
    },
    ([o, r]) => isWhole((o * r) / 100) && o >= c.lo / 2 && o <= c.hi * 2,
  );
  const n = up ? o + (o * r) / 100 : o - (o * r) / 100;
  return {
    prompt: `${c.text(name, showVal(c, o), showVal(c, n))} What is the percent ${up ? 'increase' : 'decrease'}?`,
    parts: [numPart(r, { suffix: '%' })],
    hints: ['Find the amount of change first: subtract.', CHANGE_RULE],
    solution: [...changeSteps(c, o, n, r), `The ${c.noun === 'price' ? 'price' : `number of ${c.noun}`} ${up ? 'increased' : 'decreased'} by $${pc(r)}$.`],
  };
}

function changeNewValue(rng: Rng): GenOutput {
  const up = rng.chance(0.5);
  const c = rng.pick([
    { what: 'A video game', base: [40, 60, 80] },
    { what: 'A bike', base: [200, 240, 300, 400] },
    { what: 'A snowboard', base: [250, 300, 360, 400] },
    { what: 'A movie ticket', base: [12, 14, 16, 20] },
  ]);
  const o = rng.pick(c.base);
  const r = rng.pick([5, 10, 15, 20, 25, 30, 40]);
  const ch = (o * r) / 100;
  const n = up ? o + ch : o - ch;
  return {
    prompt: `${c.what} costs ${tag(o)}. Its price ${up ? 'increases' : 'decreases'} by $${pc(r)}$. What is the new price, ${CENT}?`,
    parts: [moneyPart(n)],
    hints: [`Find $${pc(r)}$ of ${tag(o)}. That is the amount of change.`, up ? 'Add the change to the old price.' : 'Subtract the change from the old price.'],
    solution: [`Change: $${num(r / 100)} \\times ${mv(o)} = ${mv(ch)}$`, `New price: $${mv(o)} ${up ? '+' : '-'} ${mv(ch)} = ${mv(n)}$`, `The new price is ${money(n)}.`],
  };
}

function changeTenth(rng: Rng): GenOutput {
  const c = rng.pick(CHANGE_CTX);
  const name = rng.pick(NAMES);
  const [o, n, pct] = retry(
    () => {
      const o = c.money ? rng.int(c.lo, c.hi) - rng.pick([0, 0.01, 0.51, 0.26]) : rng.int(c.lo, c.hi);
      const r = (rng.chance(0.55) ? 1 : -1) * rng.int(3, 60) / 100;
      const n = c.money ? r2(o * (1 + r)) - (rng.chance(0.5) ? 0 : 0.01) : Math.round(o * (1 + r));
      return [o, clean(n), (Math.abs(n - o) / o) * 100];
    },
    ([o, n, pct]) => n !== o && n > 0 && safeTenth(pct) && !isWhole(pct * 10),
  );
  const up = n > o;
  return {
    prompt: `${c.text(name, showVal(c, o), showVal(c, n))} Is this an increase or a decrease? What is the percent ${up ? 'increase' : 'decrease'}, to the nearest tenth of a percent?`,
    parts: [{ label: 'Change', answer: fixedChoice(['Increase', 'Decrease'], up ? 0 : 1) }, numPart(pct, { decimals: 1, suffix: '%', label: 'Percent' })],
    hints: ['Compare the new amount with the original amount. Then find the amount of change.', CHANGE_RULE],
    solution: [...changeSteps(c, o, n, pct, 1), `It is a percent ${up ? 'increase' : 'decrease'} of about $${fmtFixed(pct, 1)}\\%$.`],
    calculator: true,
  };
}

function changeCompare(rng: Rng): GenOutput {
  const [a, b] = rng.sample(['Lakeview School', 'Prairie Rose School', 'Aspen Ridge School', 'Northgate School', 'Riverbend School'], 2);
  const [o1, n1, p1, o2, n2, p2] = retry(
    () => {
      const o1 = rng.int(150, 600);
      const o2 = rng.int(150, 600);
      const n1 = Math.round(o1 * (1 + rng.int(5, 40) / 100));
      const n2 = Math.round(o2 * (1 + rng.int(5, 40) / 100));
      return [o1, n1, ((n1 - o1) / o1) * 100, o2, n2, ((n2 - o2) / o2) * 100];
    },
    ([o1, n1, p1, o2, n2, p2]) => safeTenth(p1) && safeTenth(p2) && Math.abs(p1 - p2) > 1 && (n1 - o1 - (n2 - o2)) * (p1 - p2) < 0,
  );
  const first = p1 > p2;
  return {
    prompt: `Two schools ran a reading challenge. Students at ${a} read $${o1}$ books in the first month and $${n1}$ books in the second month. Students at ${b} read $${o2}$ books in the first month and $${n2}$ books in the second month. Find each school’s percent increase, to the nearest tenth of a percent. Which school had the greater percent increase?`,
    parts: [numPart(p1, { decimals: 1, suffix: '%', label: a }), numPart(p2, { decimals: 1, suffix: '%', label: b }), { label: 'Greater percent increase', answer: fixedChoice([a, b], first ? 0 : 1) }],
    hints: ['For each school, find the increase, then divide by that school’s first-month number.', 'The school with the bigger increase in books does not always have the bigger percent increase.'],
    solution: [
      `${a}: increase $${n1} - ${o1} = ${n1 - o1}$, and $${fr(n1 - o1, o1)} \\times 100 ${isWhole(p1 * 10) ? '=' : '\\approx'} ${fmtFixed(p1, 1)}\\%$`,
      `${b}: increase $${n2} - ${o2} = ${n2 - o2}$, and $${fr(n2 - o2, o2)} \\times 100 ${isWhole(p2 * 10) ? '=' : '\\approx'} ${fmtFixed(p2, 1)}\\%$`,
      `$${fmtFixed(first ? p1 : p2, 1)}\\% > ${fmtFixed(first ? p2 : p1, 1)}\\%$, even though ${first ? a : b} read fewer extra books. It started from a smaller number.`,
      `${first ? a : b} had the greater percent increase.`,
    ],
    calculator: true,
  };
}

function changeUpDown(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const item = rng.pick(['a jacket', 'a pair of headphones', 'a skateboard', 'a backpack', 'a hockey helmet']);
  const o = rng.pick([40, 60, 80, 100, 120, 150, 200, 250]);
  const r = rng.pick([10, 20, 30, 40, 50]);
  const up = clean(o * (1 + r / 100));
  const fin = clean(up * (1 - r / 100));
  const overall = (r * r) / 100;
  return {
    prompt: `${item.charAt(0).toUpperCase() + item.slice(1)} costs ${tag(o)}. A store raises the price by $${pc(r)}$. Later, it lowers the new price by $${pc(r)}$. ${name} thinks the price is back to ${tag(o)}. What is the final price, ${CENT}? What is the overall percent decrease from the original price?`,
    parts: [moneyPart(fin), numPart(overall, { suffix: '%', label: 'Overall decrease' })],
    hints: ['The decrease is taken from the new, higher price, not from the original price.', 'Overall percent decrease $= \\dfrac{\\text{original} - \\text{final}}{\\text{original}} \\times 100\\%$'],
    solution: [
      `After the increase: $${mv(o)} + ${num(r / 100)} \\times ${mv(o)} = ${mv(o)} + ${mv((o * r) / 100)} = ${mv(up)}$`,
      `After the decrease: $${mv(up)} - ${num(r / 100)} \\times ${mv(up)} = ${mv(up)} - ${mv((up * r) / 100)} = ${mv(fin)}$`,
      `Overall change: $${mv(o)} - ${mv(fin)} = ${mv(o - fin)}$, and $${fr(mv(o - fin), mv(o))} \\times 100 = ${num(overall)}$`,
      `The final price is ${money(fin)}, not ${tag(o)}. That is an overall decrease of $${pc(overall)}$.`,
    ],
    calculator: true,
  };
}

const percentChange = skill({
  id: 'm8-percent-change',
  name: 'Percent increase and decrease',
  description: 'Find the percent increase or decrease from an original amount to a new amount, and find a new amount after a percent change.',
  outcomes: ['N3'],
  lessonId: 'm8-2-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.7) ? changeEasy(rng) : changeNewValue(rng);
    if (d === 2) return changeTenth(rng);
    return rng.chance(0.5) ? changeCompare(rng) : changeUpDown(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Combined percents
// ---------------------------------------------------------------------------

const ITEMS = [
  { item: 'a hoodie', lo: 35, hi: 80 },
  { item: 'a pair of running shoes', lo: 70, hi: 180 },
  { item: 'a hockey stick', lo: 60, hi: 250 },
  { item: 'a backpack', lo: 30, hi: 90 },
  { item: 'a board game', lo: 25, hi: 70 },
  { item: 'a pair of headphones', lo: 40, hi: 200 },
  { item: 'a tent for camping', lo: 90, hi: 350 },
  { item: 'a basketball', lo: 25, hi: 60 },
];

/** Steps for a discount then a sales tax. Returns rounded amounts. */
function discountTax(price: number, disc: number, tax: number) {
  const off = (price * disc) / 100;
  const sale = r2(price - off);
  const t = (sale * tax) / 100;
  const total = r2(sale + r2(t));
  return {
    off,
    sale,
    t,
    total,
    steps: [
      `Discount: $${num(disc / 100)} \\times ${mv(price)} ${eqMoney(off)}$`,
      `Sale price: $${mv(price)} - ${mv(r2(off))} = ${mv(sale)}$`,
      `Sales tax on the sale price: $${num(tax / 100)} \\times ${mv(sale)} ${eqMoney(t)}$`,
      `Total: $${mv(sale)} + ${mv(r2(t))} = ${mv(total)}$`,
    ],
  };
}

function pickPrice(rng: Rng, lo: number, hi: number, friendly: boolean): number {
  return friendly ? rng.pick([20, 30, 40, 50, 60, 80, 100, 120, 150, 200].filter((x) => x >= lo * 0.6 && x <= hi * 1.4).concat([40])) : rng.int(lo, hi) - rng.pick([0.01, 0.01, 0.51, 0.26, 0]);
}

function combinedD1(rng: Rng): GenOutput {
  const c = rng.pick(ITEMS);
  const name = rng.pick(NAMES);
  const [price, disc, res] = retry(
    () => {
      const price = pickPrice(rng, c.lo, c.hi, true);
      const disc = rng.pick([10, 20, 25, 30, 40, 50]);
      return [price, disc, discountTax(price, disc, 5)] as const;
    },
    ([, , r]) => !onEdge(r.t),
  );
  return {
    prompt: `${name} wants to buy ${c.item} with a regular price of ${tag(price)}. It is on sale for $${pc(disc)}$ off. Then a $5\\%$ sales tax is added to the sale price. What is the sale price? What is the total cost, ${CENT}?`,
    parts: [moneyPart(res.sale, 'Sale price: \\$'), moneyPart(res.total, 'Total cost: \\$')],
    hints: [`Find $${pc(disc)}$ of the regular price and subtract it.`, 'The tax is $5\\%$ of the **sale** price. Add it to the sale price.'],
    solution: [...res.steps, `The sale price is ${money(res.sale)} and the total cost is ${money(res.total)}.`],
  };
}

function successive(rng: Rng): GenOutput {
  const c = rng.pick(ITEMS);
  const name = rng.pick(NAMES);
  const [price, a, b, s1, fin] = retry(
    () => {
      const price = pickPrice(rng, c.lo, c.hi, rng.chance(0.4));
      const a = rng.pick([10, 20, 25, 30, 40, 50]);
      const b = rng.pick([10, 15, 20, 25]);
      const s1 = r2(price * (1 - a / 100));
      return [price, a, b, s1, r2(s1 * (1 - b / 100))] as const;
    },
    ([price, a, b, s1]) => !onEdge(price * (1 - a / 100)) && !onEdge(s1 * (1 - b / 100)),
  );
  const total = a + b - (a * b) / 100;
  return {
    prompt: `${c.item.charAt(0).toUpperCase() + c.item.slice(1)} has a regular price of ${tag(price)}. A store takes $${pc(a)}$ off. At the checkout, ${name} gets another $${pc(b)}$ off the sale price. What is the final price, ${CENT}? What single percent discount would give the same final price?`,
    parts: [moneyPart(fin, 'Final price: \\$'), numPart(total, { suffix: '%', label: 'Single discount' })],
    hints: ['Take the first discount off the regular price. Then take the second discount off the **sale price**, not the regular price.', `To find the single discount, try a price of \\$100: take $${pc(a)}$ off, then $${pc(b)}$ off what is left.`],
    solution: [
      `First discount: $${mv(price)} - ${num(a / 100)} \\times ${mv(price)} ${eqMoney(price * (1 - a / 100))}$`,
      `Second discount: $${mv(s1)} - ${num(b / 100)} \\times ${mv(s1)} ${eqMoney(s1 * (1 - b / 100))}$`,
      `Single discount: start with \\$100. After $${pc(a)}$ off, ${tag(100 - a)} is left. $${pc(b)}$ of ${tag(100 - a)} is ${tag(((100 - a) * b) / 100)}, so ${tag(100 - total)} is left.`,
      `\\$100 − ${tag(100 - total)} = ${tag(total)} off, which is $${pc(total)}$, not $${pc(a + b)}$.`,
      `The final price is ${money(fin)}. The two discounts together are the same as $${pc(total)}$ off.`,
    ],
  };
}

function whyNot(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const c = rng.pick(ITEMS);
  const a = rng.pick([10, 20, 30, 40, 50]);
  const b = rng.pick([10, 20, 25, 50].filter((x) => x !== a));
  const total = a + b - (a * b) / 100;
  const correct = `${name} is wrong. The second discount is taken from the lower sale price, so the total discount is $${pc(total)}$.`;
  const wrong = [
    `${name} is right, because $${pc(a)} + ${pc(b)} = ${pc(a + b)}$.`,
    `${name} is wrong. The total discount is $${pc(a + b + (a * b) / 100)}$, which is more than $${pc(a + b)}$.`,
    `${name} is wrong. The total discount is $${pc((a * b) / 100)}$, because you multiply the two percents.`,
  ];
  return {
    prompt: `A store takes $${pc(a)}$ off the price of ${c.item}. At the checkout, it takes another $${pc(b)}$ off the sale price. ${name} says this is the same as $${pc(a + b)}$ off. Which statement is correct?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['Try it with a price of \\$100.', `After the first discount, what price is the $${pc(b)}$ taken from?`],
    solution: [
      `Start with \\$100. After $${pc(a)}$ off, the price is ${tag(100 - a)}.`,
      `$${pc(b)}$ of ${tag(100 - a)} is ${tag(((100 - a) * b) / 100)}, so the final price is ${tag(100 - total)}.`,
      `The total discount is ${tag(total)} out of \\$100, or $${pc(total)}$. It is less than $${pc(a + b)}$ because the second discount is taken from a smaller price.`,
      `${name} is wrong: the total discount is $${pc(total)}$.`,
    ],
  };
}

const GROUPS = [
  { who: 'students at a junior high school', all: 'students', a: 'play on a school sports team', b: 'play on the volleyball team', both: 'play on the volleyball team' },
  { who: 'fans at a hockey game', all: 'fans', a: 'are cheering for the home team', b: 'are wearing a home team jersey', both: 'are home team fans wearing a jersey' },
  { who: 'campers at a summer camp', all: 'campers', a: 'signed up for canoeing', b: 'had never paddled before', both: 'signed up for canoeing and had never paddled before' },
  { who: 'students in Grade 8', all: 'students', a: 'have a pet', b: 'have a dog', both: 'have a pet dog' },
  { who: 'customers at a bakery on Saturday', all: 'customers', a: 'bought bread', b: 'bought sourdough bread', both: 'bought sourdough bread' },
];

function pctOfPct(rng: Rng): GenOutput {
  const g = rng.pick(GROUPS);
  const [N, p1, p2] = retry(
    () => [rng.pick([200, 400, 500, 600, 800, 1000, 1200]), rng.pick([20, 25, 40, 50, 60, 75, 80]), rng.pick([10, 20, 25, 30, 40, 50])] as const,
    ([N, p1, p2]) => isWhole((N * p1 * p2) / 10000) && isWhole((N * p1) / 100),
  );
  const part1 = (N * p1) / 100;
  const pAll = (p1 * p2) / 100;
  const count = (N * p1 * p2) / 10000;
  return {
    prompt: `There are $${num(N)}$ ${g.who}. $${pc(p1)}$ of them ${g.a}. Of those, $${pc(p2)}$ ${g.b}. What percent of all the ${g.all} ${g.both}? How many is that?`,
    parts: [numPart(pAll, { suffix: '%', label: 'Percent of all' }), numPart(count, { label: 'How many' })],
    hints: [`Find $${pc(p2)}$ of $${pc(p1)}$: multiply the two percents as decimals.`, `Then find that percent of $${num(N)}$. Or find $${pc(p1)}$ of $${num(N)}$ first, then $${pc(p2)}$ of that.`],
    solution: [
      `$${pc(p2)}$ of $${pc(p1)}$: $${num(p2 / 100)} \\times ${num(p1 / 100)} = ${num(pAll / 100)}$, which is $${pc(pAll)}$.`,
      `How many: $${pc(p1)}$ of $${num(N)}$ is $${num(part1)}$, and $${pc(p2)}$ of $${num(part1)}$ is $${num(count)}$.`,
      `Check: $${num(pAll / 100)} \\times ${num(N)} = ${num(count)}$`,
      `$${pc(pAll)}$ of all the ${g.all}, or $${num(count)}$ ${g.all}, ${g.both}.`,
    ],
  };
}

function compareDeals(rng: Rng): GenOutput {
  const c = rng.pick(ITEMS);
  const name = rng.pick(NAMES);
  const tax = rng.pick([5, 5, 6, 8]);
  const [price, x, y, z] = retry(
    () => {
      const price = pickPrice(rng, c.lo, c.hi, false);
      const x = rng.pick([25, 30, 35, 40]);
      const y = rng.pick([15, 20, 25, 30]);
      const z = rng.pick([10, 15, 20]);
      return [price, x, y, z] as const;
    },
    ([price, x, y, z]) => {
      const single = x;
      const combo = y + z - (y * z) / 100;
      const a = price * (1 - x / 100);
      const s1 = r2(price * (1 - y / 100));
      return y < x && x < y + z && Math.abs(single - combo) > 0.5 && !onEdge(a) && !onEdge(price * (1 - y / 100)) && !onEdge(s1 * (1 - z / 100)) && !onEdge((r2(a) * tax) / 100) && !onEdge((r2(s1 * (1 - z / 100)) * tax) / 100);
    },
  );
  const [s1, s2] = ['Sport Stop', 'Trail Shop'];
  const A = r2(price * (1 - x / 100));
  const B1 = r2(price * (1 - y / 100));
  const B = r2(B1 * (1 - z / 100));
  const best = A < B ? A : B;
  const t = (best * tax) / 100;
  const total = r2(best + r2(t));
  return {
    prompt: `${name} wants ${c.item} with a regular price of ${tag(price)} at two stores. ${s1} takes $${pc(x)}$ off. ${s2} takes $${pc(y)}$ off, and then another $${pc(z)}$ off the sale price. Both stores add ${tax === 8 ? 'an' : 'a'} $${pc(tax)}$ sales tax to the price after discounts. Which store has the lower price? What is the total cost there, including tax, ${CENT}?`,
    parts: [{ label: 'Lower price', answer: fixedChoice([s1, s2], A < B ? 0 : 1) }, moneyPart(total, 'Total with tax: \\$')],
    hints: [`At ${s2}, the second discount is taken from the sale price, so the two discounts add up to less than $${pc(y + z)}$.`, 'Find the price after discounts at each store. Then add the tax to the lower one.'],
    solution: [
      `${s1}: $${mv(price)} - ${num(x / 100)} \\times ${mv(price)} ${eqMoney(price * (1 - x / 100))}$`,
      `${s2}: $${mv(price)} - ${num(y / 100)} \\times ${mv(price)} ${eqMoney(price * (1 - y / 100))}$, then $${mv(B1)} - ${num(z / 100)} \\times ${mv(B1)} ${eqMoney(B1 * (1 - z / 100))}$`,
      `${A < B ? s1 : s2} has the lower price, ${money(best)}.`,
      `Tax: $${num(tax / 100)} \\times ${mv(best)} ${eqMoney(t)}$, and $${mv(best)} + ${mv(r2(t))} = ${mv(total)}$`,
      `${A < B ? s1 : s2} has the lower price. The total cost there is ${money(total)}.`,
    ],
  };
}

function restaurant(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const tax = 5;
  const [bill, tip] = retry(
    () => [rng.int(2400, 9800) / 100, rng.pick([15, 18, 20])] as const,
    ([bill, tip]) => !onEdge((bill * tax) / 100) && !onEdge((r2(bill * 1.05) * tip) / 100),
  );
  const t = (bill * tax) / 100;
  const withTax = r2(bill + r2(t));
  const tp = (withTax * tip) / 100;
  const total = r2(withTax + r2(tp));
  const place = rng.pick(['a pizza place', 'a family restaurant', 'a pho restaurant', 'a diner']);
  return {
    prompt: `${name}’s family eats at ${place} in ${rng.pick(TOWNS)}. The food costs ${money(bill)}. A $5\\%$ sales tax is added. Then the family leaves ${tip === 18 ? 'an' : 'a'} $${pc(tip)}$ tip on the amount after tax. What is the total they pay, ${CENT}?`,
    parts: [moneyPart(total)],
    hints: ['First find the tax and add it to the cost of the food.', `Then find $${pc(tip)}$ of the amount after tax and add it.`],
    solution: [
      `Tax: $0.05 \\times ${mv(bill)} ${eqMoney(t)}$`,
      `After tax: $${mv(bill)} + ${mv(r2(t))} = ${mv(withTax)}$`,
      `Tip: $${num(tip / 100)} \\times ${mv(withTax)} ${eqMoney(tp)}$`,
      `Total: $${mv(withTax)} + ${mv(r2(tp))} = ${mv(total)}$`,
      `The family pays ${money(total)}.`,
    ],
  };
}

const combinedPercents = skill({
  id: 'm8-combined-percents',
  name: 'Combined percents',
  description: 'Solve problems with combined percents: a discount and then sales tax, successive discounts, and a percent of a percent.',
  outcomes: ['N3'],
  lessonId: 'm8-2-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return combinedD1(rng);
    if (d === 2) {
      const kind = rng.pick(['successive', 'successive', 'why', 'pp'] as const);
      if (kind === 'successive') return successive(rng);
      if (kind === 'why') return whyNot(rng);
      return pctOfPct(rng);
    }
    return rng.chance(0.6) ? compareDeals(rng) : restaurant(rng);
  },
});

export const PERCENTS_SKILLS: SkillDef[] = [percentRepresent, percentOf, percentChange, combinedPercents];
