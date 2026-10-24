/** Math 20-3 Unit 7 — Interest and Credit (N3, N5, A1). Every rate, fee and rule is stated in the question. */
import { fixedChoice, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { BANKS, CENT, CITIES, NAMES, type Out, abt, cell, dec, m2, money, moneyPart, mv, num, onEdge, pc, pcm, poss, sub, tag, toCents, total } from './budgets.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const plural = (n: number, w: string) => `${fmt(n)} ${w}${n === 1 ? '' : 's'}`;
const yrs = (t: number) => plural(t, 'year');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface Saver { what: string; it: string }
const SAVINGS: Saver[] = [
  { what: 'a GIC (guaranteed investment certificate)', it: 'the GIC' },
  { what: 'a savings account', it: 'the account' },
  { what: 'a term deposit', it: 'the term deposit' },
  { what: 'an investment account', it: 'the investment' },
];
const FROM = [
  'money from a summer job on a farm', 'savings from a first job', 'a bonus from a job at a mine site',
  'money from a part-time job', 'tips from a restaurant job in a mountain town', 'money from selling a used quad', 'a gift from a grandparent',
];
const GROWTH: Saver[] = [
  { what: 'an investment account', it: 'the investment' },
  { what: 'a long-term investment', it: 'the investment' },
];
/** A GIC or savings account for modest rates; an investment account for high ones. */
const saverFor = (rng: Rng, r: number) => rng.pick(r <= 5 ? SAVINGS : GROWTH);
const BORROW = ['a used truck', 'a welding course', 'a set of mechanic’s tools', 'a used snowmobile', 'furniture for a first apartment', 'a used quad', 'a trailer for a landscaping business'];
const GOALS = ['a down payment on a truck', 'a trade-school program', 'a down payment on a condo', 'a trip to Europe', 'a used boat', 'tools to start a business'];

// ---------------------------------------------------------------------------
// 7.1 Simple interest — m203-simple-interest
// ---------------------------------------------------------------------------

function si1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const borrow = rng.chance(0.4);
  const P = rng.int(5, 60) * 100;
  const r = borrow ? rng.int(5, 9) : rng.int(2, 5);
  const t = rng.int(2, 5);
  const I = (P * r * t) / 100;
  const A = P + I;
  const askA = rng.chance(0.5);
  const s = rng.pick(SAVINGS);
  const prompt = borrow
    ? `${name} borrows ${tag(P)} from ${bank} for ${rng.pick(BORROW)} and will pay it all back in one payment after ${yrs(t)}. The loan charges simple interest of ${pc(r)} per year. How much interest will ${name} pay?${askA ? ` How much will ${name} pay back in total?` : ''} ${CENT}`
    : `${name} puts ${tag(P)} of ${rng.pick(FROM)} into ${s.what} at ${bank}. It pays simple interest of ${pc(r)} per year. How much interest will ${s.it} earn in ${yrs(t)}?${askA ? ` What will ${s.it} be worth then?` : ''} ${CENT}`;
  return {
    prompt,
    parts: [moneyPart(I, 'Interest: \\$'), ...(askA ? [moneyPart(A, borrow ? 'Total paid back: \\$' : 'Total value: \\$')] : [])],
    hints: [
      'Use $I = Prt$: principal × rate × time, with the rate as a decimal and the time in years.',
      `$I = ${mv(P)} \\times ${dec(r)} \\times ${t}$${askA ? '. Then add the interest to the principal.' : ''}`,
    ],
    solution: [
      `Write the rate as a decimal: $${pcm(r)} = ${dec(r)}$`,
      `$I = Prt = ${mv(P)} \\times ${dec(r)} \\times ${t} = ${mv(I)}$`,
      ...(askA ? [`Total: $${mv(P)} + ${mv(I)} = ${mv(A)}$`] : []),
      borrow
        ? `${name} pays ${money(I)} in interest${askA ? ` and ${money(A)} in total` : ''}.`
        : `${cap(s.it)} earns ${money(I)} in interest${askA ? ` and is then worth ${money(A)}` : ''}.`,
    ],
  };
}

function si2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const borrow = rng.chance(0.45);
  const o = retry(
    () => {
      const P = borrow ? rng.int(20, 160) * 50 : rng.int(10, 120) * 100;
      const r = rng.pick(borrow ? [5.5, 6.25, 6.75, 7.5, 8.25, 8.9, 9.5] : [2.25, 2.75, 3.1, 3.25, 3.6, 3.85, 4.15, 4.4]);
      const m = rng.pick([3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 18, 20, 21, 27, 30]);
      return { P, r, m, I: (P * r * m) / 1200 };
    },
    (v) => !onEdge(v.I) && v.I >= 1,
  );
  const { P, r, m } = o;
  const Ir = roundTo(o.I, 2);
  const A = total([P, Ir]);
  const long = m > 12 && rng.chance(0.5);
  const time = long ? `${yrs(Math.floor(m / 12))} and ${plural(m % 12, 'month')}` : plural(m, 'month');
  const s = rng.pick(SAVINGS);
  return {
    prompt: borrow
      ? `${name} borrows ${tag(P)} from ${bank} for ${rng.pick(BORROW)}, to be paid back in one payment after ${time}. The loan charges simple interest of ${pc(r)} per year. How much interest will ${name} pay, and how much will ${name} pay back in total? ${CENT}`
      : `${name} puts ${tag(P)} into ${s.what} at ${bank} for ${time}. It pays simple interest of ${pc(r)} per year. How much interest will it earn, and what will it be worth at the end? ${CENT}`,
    parts: [moneyPart(o.I, 'Interest: \\$'), moneyPart(A, borrow ? 'Total paid back: \\$' : 'Total value: \\$')],
    hints: [
      `The rate is per **year**, so write the time in years: ${long ? `${time} is ${m} months, and ` : ''}$t = \\dfrac{${m}}{12}$.`,
      `$I = ${mv(P)} \\times ${dec(r)} \\times \\dfrac{${m}}{12}$. Then add the interest to the principal.`,
    ],
    solution: [
      `Time in years: ${long ? `${time} is ${m} months, so ` : ''}$t = \\dfrac{${m}}{12}$`,
      `Rate as a decimal: $${pcm(r)} = ${dec(r)}$`,
      `$I = Prt = ${mv(P)} \\times ${dec(r)} \\times \\dfrac{${m}}{12} ${toCents(o.I)}$`,
      `Total: $${mv(P)} + ${m2(Ir)} = ${m2(A)}$`,
      borrow
        ? `${name} pays ${abt(o.I)}${money(Ir)} in interest and ${money(A)} in total.`
        : `The interest is ${abt(o.I)}${money(Ir)}, so ${s.it} is worth ${money(A)} at the end.`,
    ],
  };
}

function si3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const s = rng.pick(SAVINGS);
  const k = rng.pick(['rate', 'rate', 'time', 'time', 'principal'] as const);
  if (k === 'rate') {
    const P = rng.int(8, 60) * 100;
    const t = rng.int(2, 6);
    const r = rng.pick([1.5, 2.25, 2.5, 2.75, 3.25, 3.5, 3.75, 4.25, 4.5, 4.75, 5.5]);
    const I = (P * r * t) / 100;
    const A = total([P, I]);
    const givenA = rng.chance(0.5);
    return {
      prompt: givenA
        ? `${name} put ${tag(P)} into ${s.what} at ${bank} that pays simple interest. After ${yrs(t)}, ${s.it} was worth ${money(A)}. What was the annual interest rate, as a percent?`
        : `${name} put ${tag(P)} into ${s.what} at ${bank} that pays simple interest. After ${yrs(t)}, ${s.it} had earned ${money(I)} in interest. What was the annual interest rate, as a percent?`,
      parts: [numPart(r, { label: 'Rate:', suffix: '%', display: 'decimal' })],
      hints: [
        givenA ? 'First find the interest: final value − principal. Then put what you know into $I = Prt$.' : 'Put the values you know into $I = Prt$. This time the rate $r$ is the unknown.',
        'Divide both sides by $P \\times t$: $r = \\dfrac{I}{Pt}$. Then multiply by 100 to write the rate as a percent.',
      ],
      solution: [
        ...(givenA ? [`Interest: $${m2(A)} - ${mv(P)} = ${m2(I)}$`] : []),
        'Rearrange $I = Prt$ to get $r = \\dfrac{I}{Pt}$.',
        `$r = \\dfrac{${m2(I)}}{${mv(P)} \\times ${t}} = \\dfrac{${m2(I)}}{${mv(P * t)}} = ${dec(r)}$`,
        `As a percent: $${dec(r)} \\times 100 = ${pcm(r)}$`,
        `The interest rate was ${pc(r)} per year.`,
      ],
    };
  }
  if (k === 'time') {
    const o = retry(
      () => {
        const P = rng.int(10, 80) * 100;
        const r = rng.pick([3, 3.5, 4, 4.5, 5, 6, 6.5, 7, 7.5, 8]);
        const m = rng.pick([6, 9, 15, 18, 21, 27, 30, 33, 42]);
        return { P, r, m, I: (P * r * m) / 1200 };
      },
      (v) => Math.abs(v.I * 100 - Math.round(v.I * 100)) < 1e-6,
    );
    const { P, r, m, I } = o;
    const t = m / 12;
    const who = rng.pick(['an aunt', 'an uncle', 'a grandparent', 'an older cousin', 'a family friend']);
    return {
      prompt: `${name} borrowed ${tag(P)} from ${who} for ${rng.pick(BORROW)}. They agreed on simple interest of ${pc(r)} per year. ${name} paid it all back in one payment, which included ${money(I)} in interest. For how many months did ${name} have the loan?`,
      parts: [numPart(m, { suffix: 'months' })],
      hints: ['Rearrange $I = Prt$ to get $t = \\dfrac{I}{Pr}$. Use the rate as a decimal.', 'The formula gives the time in **years**. Multiply by 12 to change years to months.'],
      solution: [
        'Rearrange $I = Prt$ to get $t = \\dfrac{I}{Pr}$.',
        `$t = \\dfrac{${m2(I)}}{${mv(P)} \\times ${dec(r)}} = \\dfrac{${m2(I)}}{${mv(P * r / 100)}} = ${fmt(t)}$ years`,
        `In months: $${fmt(t)} \\times 12 = ${m}$`,
        `${name} had the loan for ${m} months.`,
      ],
    };
  }
  const P = rng.int(8, 100) * 50;
  const t = rng.int(2, 5);
  const r = rng.pick([2, 2.5, 3, 3.5, 4, 4.5, 5]);
  const I = (P * r * t) / 100;
  const goal = rng.pick(['a new phone', 'a weekend trip to the mountains', 'a set of winter tires', 'a new hockey bag and skates', 'a course fee', 'concert tickets']);
  return {
    prompt: `${name} wants to earn ${money(I)} in interest over ${yrs(t)}, to put toward ${goal}. ${cap(s.what)} at ${bank} pays simple interest of ${pc(r)} per year. How much does ${name} need to invest? ${CENT}`,
    parts: [moneyPart(P, 'Principal: \\$')],
    hints: ['Put the values you know into $I = Prt$. This time the principal $P$ is the unknown.', 'Divide both sides by $r \\times t$: $P = \\dfrac{I}{rt}$, with $r$ as a decimal.'],
    solution: [
      'Rearrange $I = Prt$ to get $P = \\dfrac{I}{rt}$.',
      `$P = \\dfrac{${m2(I)}}{${dec(r)} \\times ${t}} = \\dfrac{${m2(I)}}{${fmt((r * t) / 100, 6)}} = ${m2(P)}$`,
      `Check: $${mv(P)} \\times ${dec(r)} \\times ${t} = ${m2(I)}$`,
      `${name} needs to invest ${money(P)}.`,
    ],
  };
}

const simpleInterest = skill({
  id: 'm203-simple-interest',
  name: 'Simple interest',
  description: 'Use I = Prt to find simple interest and the total amount, with time in years or months, and rearrange the formula to find the principal, rate or time.',
  outcomes: ['A1'],
  lessonId: 'm203-7-1',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? si1(rng) : d === 2 ? si2(rng) : si3(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.1 Compound interest — m203-compound-interest
// ---------------------------------------------------------------------------

const FREQ: Record<number, string> = { 1: 'annually', 2: 'semi-annually', 4: 'quarterly', 12: 'monthly' };
const TIMES: Record<number, string> = { 1: 'once a year', 2: 'twice a year', 4: 'four times a year', 12: 'twelve times a year' };

/** A = P(1 + r/n)^(nt), with r in percent. */
const grow = (P: number, r: number, n: number, t: number) => P * (1 + r / 100 / n) ** (n * t);

function factorTex(r: number, n: number, N: number): string {
  return n === 1 ? `(1 + ${dec(r)})^{${N}}` : `\\left(1 + \\dfrac{${dec(r)}}{${n}}\\right)^{${N}}`;
}

/** Solution lines for A = P(1 + r/n)^(nt). */
function compoundLines(P: number, r: number, n: number, t: number): string[] {
  const A = grow(P, r, n, t);
  return [
    `$P = ${mv(P)}$, $r = ${pcm(r)} = ${dec(r)}$, $n = ${n}$ (compounded ${FREQ[n]}) and $t = ${t}$, so $nt = ${n} \\times ${t} = ${n * t}$.`,
    `$A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt} = ${mv(P)}${factorTex(r, n, n * t)} ${toCents(A)}$`,
  ];
}

const compoundHint = (n: number) =>
  `Use $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$ with the rate as a decimal. Compounded ${FREQ[n]} means ${TIMES[n]}, so $n = ${n}$.`;

function ciTable(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const s = rng.pick(SAVINGS);
  const o = retry(
    () => {
      const P = rng.int(10, 50) * 100;
      const r = rng.pick([3, 4, 5, 6, 8]);
      const i1 = (P * r) / 100;
      const b1 = P + i1;
      const i2 = roundTo((b1 * r) / 100, 2);
      const b2 = total([b1, i2]);
      const i3 = (b2 * r) / 100;
      return { P, r, i1, b1, i2, b2, i3 };
    },
    (v) => !onEdge(v.i3),
  );
  const i3 = roundTo(o.i3, 2);
  const b3 = total([o.b2, i3]);
  return {
    prompt: `${name} has ${tag(o.P)} in ${s.what} that earns ${pc(o.r)} interest per year, compounded annually. The table shows how the balance grows. Find the interest for year 3 and the balance at the end of year 3. ${CENT}`,
    figure: {
      type: 'table',
      headers: ['Year', 'Balance at start', 'Interest for the year', 'Balance at end'],
      rows: [
        ['1', cell(o.P), cell(o.i1), cell(o.b1)],
        ['2', cell(o.b1), cell(o.i2), cell(o.b2)],
        ['3', cell(o.b2), '?', '?'],
      ],
    },
    parts: [moneyPart(o.i3, 'Interest for year 3: \\$'), moneyPart(b3, 'Balance at end of year 3: \\$')],
    hints: [
      'Each year, the interest is the rate times the balance at the **start** of that year, not the original amount.',
      `Interest for year 3 $= ${m2(o.b2)} \\times ${dec(o.r)}$. Add it to the balance.`,
    ],
    solution: [
      `Year 3 starts with the balance at the end of year 2: ${money(o.b2)}.`,
      `Interest for year 3: $${m2(o.b2)} \\times ${dec(o.r)} ${toCents(o.i3)}$`,
      `Balance at the end of year 3: $${m2(o.b2)} + ${m2(i3)} = ${m2(b3)}$`,
      `The interest for year 3 is ${abt(o.i3)}${money(i3)}, and the balance is ${money(b3)}. Each year earns more than the year before, because interest is earned on interest.`,
    ],
  };
}

function ci1(rng: Rng): Out {
  if (rng.chance(0.35)) return ciTable(rng);
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const s = rng.pick(SAVINGS);
  const o = retry(
    () => {
      const P = rng.int(10, 80) * 100;
      const r = rng.pick([2, 3, 4, 5, 6]);
      const t = rng.int(2, 6);
      return { P, r, t, A: grow(P, r, 1, t) };
    },
    (v) => !onEdge(v.A),
  );
  const { P, r, t, A } = o;
  const Ar = roundTo(A, 2);
  const I = A - P;
  return {
    prompt: `${name} puts ${tag(P)} of ${rng.pick(FROM)} into ${s.what} at ${bank}. It earns ${pc(r)} per year, compounded annually. How much will ${s.it} be worth after ${yrs(t)}? How much of that is interest? ${CENT}`,
    parts: [moneyPart(A, 'Amount: \\$'), moneyPart(I, 'Interest: \\$')],
    hints: [
      'Compounded annually means the interest is added once a year, and the next year earns interest on it too. Use $A = P(1 + r)^t$ with the rate as a decimal.',
      `$A = ${mv(P)}(1 + ${dec(r)})^{${t}}$. The interest is $A - P$.`,
    ],
    solution: [
      `$P = ${mv(P)}$, $r = ${pcm(r)} = ${dec(r)}$, compounded annually ($n = 1$), $t = ${t}$`,
      `$A = P(1 + r)^{t} = ${mv(P)}(${fmt(1 + r / 100, 6)})^{${t}} ${toCents(A)}$`,
      `Interest: $${m2(Ar)} - ${mv(P)} = ${m2(Ar - P)}$`,
      `After ${yrs(t)}, ${s.it} is worth ${abt(A)}${money(Ar)}, and ${money(Ar - P)} of that is interest.`,
    ],
  };
}

function ci2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const s = rng.pick(SAVINGS);
  const n = rng.pick([2, 4, 12]);
  const o = retry(
    () => {
      const P = rng.int(20, 200) * 50;
      const r = rng.pick([2.4, 3, 3.2, 3.6, 4, 4.2, 4.5, 4.8, 5, 5.4, 6]);
      const t = rng.int(2, 10);
      return { P, r, t, A: grow(P, r, n, t) };
    },
    (v) => !onEdge(v.A),
  );
  const { P, r, t, A } = o;
  const Ar = roundTo(A, 2);
  return {
    prompt: `${name} puts ${tag(P)} into ${s.what} at ${bank}. It earns ${pc(r)} per year, compounded ${FREQ[n]}. Find the value of ${s.it} after ${yrs(t)} and the interest earned. ${CENT}`,
    parts: [moneyPart(A, 'Amount: \\$'), moneyPart(A - P, 'Interest: \\$')],
    hints: [compoundHint(n), `There are $${n} \\times ${t} = ${n * t}$ compounding periods. Keep every digit of $\\dfrac{r}{n}$ in your calculator, and round only the final answer.`],
    solution: [
      ...compoundLines(P, r, n, t),
      `Interest: $${m2(Ar)} - ${mv(P)} = ${m2(Ar - P)}$`,
      `After ${yrs(t)}, ${s.it} is worth ${abt(A)}${money(Ar)}, including ${money(Ar - P)} in interest.`,
    ],
  };
}

function ci3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const [b1, b2] = rng.sample(BANKS, 2);
  const k = rng.pick(['vsSimple', 'vsSimple', 'freq', 'present'] as const);
  if (k === 'vsSimple') {
    const n = rng.pick([1, 2, 4, 12]);
    const o = retry(
      () => {
        const P = rng.int(20, 150) * 100;
        const r = rng.pick([3, 3.5, 4, 4.5, 5, 5.5, 6]);
        const t = rng.int(4, 15);
        return { P, r, t, S: P + (P * r * t) / 100, C: grow(P, r, n, t) };
      },
      (v) => !onEdge(v.C) && v.C - v.S >= 5,
    );
    const { P, r, t, S, C } = o;
    const Cr = roundTo(C, 2);
    const diff = sub(Cr, S);
    return {
      prompt: `${name} has ${tag(P)} to invest for ${yrs(t)}. ${b1} offers ${pc(r)} per year **simple** interest. ${b2} offers ${pc(r)} per year **compounded ${FREQ[n]}**. Find the value of each investment after ${yrs(t)}. How much more does the compound interest investment earn? ${CENT}`,
      parts: [moneyPart(S, `Simple interest (${b1}): \\$`), moneyPart(C, `Compound interest (${b2}): \\$`), moneyPart(diff, 'Difference: \\$')],
      hints: ['Simple interest: $A = P + Prt$. Compound interest: $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$.', `Use $r = ${dec(r)}$ in both. Subtract to compare.`],
      solution: [
        `Simple: $I = ${mv(P)} \\times ${dec(r)} \\times ${t} = ${m2(S - P)}$, so $A = ${mv(P)} + ${m2(S - P)} = ${m2(S)}$`,
        ...compoundLines(P, r, n, t).map((l, i) => (i === 0 ? `Compound: ${l}` : l)),
        `Difference: $${m2(Cr)} - ${m2(S)} = ${m2(diff)}$`,
        `Simple interest gives ${money(S)} and compound interest gives ${money(Cr)}. Compounding earns ${money(diff)} more, because the interest itself earns interest.`,
      ],
    };
  }
  if (k === 'freq') {
    const [n1, n2] = rng.pick([[1, 12], [1, 4], [2, 12], [1, 2]] as const);
    const o = retry(
      () => {
        const P = rng.int(40, 300) * 50;
        const r = rng.pick([3.5, 4, 4.5, 5, 5.5, 6, 6.5]);
        const t = rng.int(5, 15);
        return { P, r, t, A1: grow(P, r, n1, t), A2: grow(P, r, n2, t) };
      },
      (v) => !onEdge(v.A1) && !onEdge(v.A2) && v.A2 - v.A1 >= 2,
    );
    const { P, r, t, A1, A2 } = o;
    const r1 = roundTo(A1, 2);
    const r2 = roundTo(A2, 2);
    const diff = sub(r2, r1);
    return {
      prompt: `${name} invests ${tag(P)} for ${yrs(t)} at ${pc(r)} per year. ${b1} compounds the interest ${FREQ[n1]}, and ${b2} compounds it ${FREQ[n2]}. Find the value of the investment after ${yrs(t)} at each institution. How much more does the investment that compounds more often earn? ${CENT}`,
      parts: [moneyPart(A1, `${b1} (${FREQ[n1]}): \\$`), moneyPart(A2, `${b2} (${FREQ[n2]}): \\$`), moneyPart(diff, 'Difference: \\$')],
      hints: [`Same formula, $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$, twice: once with $n = ${n1}$ and once with $n = ${n2}$.`, 'Subtract the smaller amount from the larger one.'],
      solution: [
        `${b1}: $n = ${n1}$, $nt = ${n1 * t}$: $A = ${mv(P)}${factorTex(r, n1, n1 * t)} ${toCents(A1)}$`,
        `${b2}: $n = ${n2}$, $nt = ${n2 * t}$: $A = ${mv(P)}${factorTex(r, n2, n2 * t)} ${toCents(A2)}$`,
        `Difference: $${m2(r2)} - ${m2(r1)} = ${m2(diff)}$`,
        `The investment grows to ${money(r1)} at ${b1} and ${money(r2)} at ${b2}. Compounding ${FREQ[n2]} earns ${money(diff)} more.`,
      ],
    };
  }
  // Present value: rearrange to find the principal.
  const n = rng.pick([1, 2, 4, 12]);
  const goal = rng.pick(GOALS);
  const o = retry(
    () => {
      const G = rng.int(20, 120) * 100;
      const r = rng.pick([3, 3.5, 4, 4.25, 4.5, 5, 5.5]);
      const t = rng.int(2, 8);
      const f = (1 + r / 100 / n) ** (n * t);
      return { G, r, t, f, P: G / f };
    },
    (v) => !onEdge(v.P),
  );
  const { G, r, t, f, P } = o;
  const Pr = roundTo(P, 2);
  return {
    prompt: `${name} wants to have ${tag(G)} in ${yrs(t)} for ${goal}. A GIC at ${b1} pays ${pc(r)} per year, compounded ${FREQ[n]}. How much does ${name} need to put into the GIC now? ${CENT}`,
    parts: [moneyPart(P, 'Invest now: \\$')],
    hints: [
      `In $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$, you know the final amount $A = ${mv(G)}$. This time the principal $P$ is the unknown.`,
      'Work out the growth factor $\\left(1 + \\dfrac{r}{n}\\right)^{nt}$, then divide the final amount by it.',
    ],
    solution: [
      `$A = ${mv(G)}$, $r = ${dec(r)}$, $n = ${n}$ (compounded ${FREQ[n]}), $nt = ${n} \\times ${t} = ${n * t}$`,
      `$${mv(G)} = P${factorTex(r, n, n * t)}$`,
      `Growth factor: $${factorTex(r, n, n * t)} \\approx ${fmt(f, 6)}$`,
      `$P = \\dfrac{${mv(G)}}{${factorTex(r, n, n * t)}} ${toCents(P)}$`,
      `${name} needs to invest ${abt(P)}${money(Pr)} now.`,
    ],
  };
}

const compoundInterest = skill({
  id: 'm203-compound-interest',
  name: 'Compound interest',
  description: 'Use A = P(1 + r/n)^(nt) with annual, semi-annual, quarterly and monthly compounding, compare compound with simple interest, and find the principal needed for a goal.',
  outcomes: ['N3'],
  lessonId: 'm203-7-1',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? ci1(rng) : d === 2 ? ci2(rng) : ci3(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.2 The Rule of 72 and comparing investments — m203-rule-of-72
// ---------------------------------------------------------------------------

const R72_HINT = 'Rule of 72: doubling time in years ≈ 72 ÷ the interest rate. Use the rate as a percent (the number in front of the % sign), not as a decimal.';

function r72a(rng: Rng): Out {
  const name = rng.pick(NAMES);
  if (rng.chance(0.6)) {
    const r = rng.pick([2, 3, 4, 6, 8, 9, 12]);
    const s = saverFor(rng, r);
    const T = 72 / r;
    const P = rng.int(5, 50) * 100;
    return {
      prompt: `${name} puts ${tag(P)} into ${s.what} that earns ${pc(r)} per year, compounded annually. Use the Rule of 72 to estimate how many years it will take for the money to double.`,
      parts: [numPart(T, { suffix: 'years' })],
      hints: [R72_HINT, `Work out $72 \\div ${r}$.`],
      solution: [`Doubling time $\\approx 72 \\div ${r} = ${T}$`, `${cap(s.it)} will grow to about ${tag(2 * P)} in about ${T} years.`],
    };
  }
  const T = rng.pick([6, 8, 9, 12, 18, 24]);
  const r = 72 / T;
  const s = saverFor(rng, r);
  return {
    prompt: `${name} wants money in ${s.what} to double in ${T} years. Use the Rule of 72 to estimate the interest rate per year (compounded annually) that ${name} needs.`,
    parts: [numPart(r, { suffix: '%', display: 'decimal' })],
    hints: ['The Rule of 72 also works backwards: interest rate ≈ 72 ÷ doubling time in years.', `Work out $72 \\div ${T}$.`],
    solution: [`Rate $\\approx 72 \\div \\text{doubling time} = 72 \\div ${T} = ${r}$`, `${name} needs about ${pc(r)} per year.`],
  };
}

function r72b(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const k = rng.pick(['time', 'rate', 'value'] as const);
  if (k === 'time') {
    const r = rng.pick([2.5, 3.5, 5, 5.5, 6.5, 7, 7.5, 9.5, 10, 11]);
    const s = saverFor(rng, r);
    const T = 72 / r;
    return {
      prompt: `${name} has money in ${s.what} that earns ${pc(r)} per year, compounded annually. Use the Rule of 72 to estimate how long it will take for the money to double. Round to the nearest tenth of a year.`,
      parts: [numPart(T, { decimals: 1, suffix: 'years' })],
      hints: [R72_HINT, `Work out $72 \\div ${fmt(r)}$ and round to one decimal place.`],
      solution: [`Doubling time $\\approx 72 \\div ${fmt(r)} ${Number.isInteger(T * 10) ? `= ${fmt(T)}` : `\\approx ${num(T, 4)}`}$`, `The money will double in about ${fmt(roundTo(T, 1))} years.`],
    };
  }
  if (k === 'rate') {
    const T = rng.pick([5, 7, 10, 11, 14, 15, 16, 20, 25]);
    const r = 72 / T;
    return {
      prompt: `${name} wants an investment to double in ${T} years. Use the Rule of 72 to estimate the interest rate per year (compounded annually) needed. Round to the nearest tenth of a percent.`,
      parts: [numPart(r, { decimals: 1, suffix: '%' })],
      hints: ['Turn the Rule of 72 around: interest rate ≈ 72 ÷ doubling time in years.', `Work out $72 \\div ${T}$ and round to one decimal place.`],
      solution: [`Rate $\\approx 72 \\div ${T} ${Number.isInteger(r * 10) ? `= ${fmt(r)}` : `\\approx ${num(r, 4)}`}$`, `The investment needs to earn about ${fmt(roundTo(r, 1))}% per year.`],
    };
  }
  const r = rng.pick([3, 4, 6, 8, 9, 12]);
  const s = saverFor(rng, r);
  const T = 72 / r;
  const d = retry(() => rng.int(2, 4), (x) => x * T <= 48);
  const P = rng.int(5, 60) * 100;
  const est = P * 2 ** d;
  const steps: string[] = [];
  for (let i = 1; i <= d; i++) steps.push(tag(P * 2 ** i));
  return {
    prompt: `${name} puts ${tag(P)} into ${s.what} that earns ${pc(r)} per year, compounded annually, and leaves it there. Use the Rule of 72 to estimate what it will be worth in ${d * T} years.`,
    parts: [numPart(est, { label: '\\$' })],
    hints: [R72_HINT, `Find how many times the money doubles in ${d * T} years, then double ${tag(P)} that many times.`],
    solution: [
      `Doubling time $\\approx 72 \\div ${r} = ${T}$ years`,
      `Number of doublings: $${d * T} \\div ${T} = ${d}$`,
      `${tag(P)} → ${steps.join(' → ')}`,
      `In ${d * T} years, ${s.it} will be worth about ${tag(est)}.`,
    ],
  };
}

interface Offer { r: number; n: number; simple?: boolean }
const offerText = (o: Offer) => (o.simple ? `${pc(o.r)} per year simple interest` : `${pc(o.r)} per year, compounded ${FREQ[o.n]}`);
const offerValue = (P: number, o: Offer, t: number) => (o.simple ? P + (P * o.r * t) / 100 : grow(P, o.r, o.n, t));
function offerLine(label: string, P: number, o: Offer, t: number): string {
  const v = offerValue(P, o, t);
  if (o.simple) return `${label}: $A = ${mv(P)} + ${mv(P)} \\times ${dec(o.r)} \\times ${t} ${toCents(v)}$`;
  return `${label}: $A = ${mv(P)}${factorTex(o.r, o.n, o.n * t)} ${toCents(v)}$`;
}

function r72c(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const k = rng.pick(['exact', 'exact', 'offers', 'offers', 'times'] as const);
  if (k === 'exact') {
    const o = retry(
      () => {
        const r = rng.pick([2, 3, 4, 6, 8, 9, 12]);
        const P = rng.int(10, 80) * 100;
        const T = 72 / r;
        return { r, P, T, A: grow(P, r, 1, T) };
      },
      (v) => !onEdge(v.A) && Math.abs(v.A - 2 * v.P) >= 1,
    );
    const { r, P, T, A } = o;
    const Ar = roundTo(A, 2);
    const more = Ar > 2 * P;
    return {
      prompt: `${name} invests ${tag(P)} at ${pc(r)} per year, compounded annually. Use the Rule of 72 to estimate the doubling time. Then use the compound interest formula to find the actual value after that many years, to the nearest cent. Is the actual value more or less than double?`,
      parts: [numPart(T, { label: 'Doubling time:', suffix: 'years' }), moneyPart(A, 'Actual value: \\$'), part(fixedChoice(['More than double', 'Less than double'], more ? 0 : 1), { label: 'Compared with double:' })],
      hints: [R72_HINT, `Then use $A = P(1 + r)^t$ with $t$ equal to your doubling time, and compare the result with $2 \\times ${mv(P)} = ${mv(2 * P)}$.`],
      solution: [
        `Doubling time $\\approx 72 \\div ${r} = ${T}$ years`,
        `$A = ${mv(P)}(1 + ${dec(r)})^{${T}} ${toCents(A)}$`,
        `Double the principal is ${tag(2 * P)}. The actual value is ${money(Ar)}, which is ${more ? 'a little more' : 'a little less'} than double.`,
        `The Rule of 72 estimates ${T} years. The actual value then is ${money(Ar)}, ${more ? 'more' : 'less'} than double, so the rule gives a close estimate.`,
      ],
    };
  }
  if (k === 'offers') {
    const o = retry(
      () => {
        const P = rng.int(20, 200) * 100;
        const t = rng.int(5, 20);
        const base = rng.pick([3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 5, 5.5]);
        const kind = rng.pick(['freq', 'freq', 'simple'] as const);
        let A: Offer;
        let B: Offer;
        if (kind === 'freq') {
          A = { r: base, n: 1 };
          B = { r: roundTo(base - rng.pick([0.05, 0.1, 0.15, 0.2, 0.25]), 2), n: rng.pick([4, 12]) };
        } else {
          A = { r: roundTo(base + rng.pick([0.25, 0.5, 0.75, 1]), 2), n: 1, simple: true };
          B = { r: base, n: rng.pick([1, 2, 12]) };
        }
        const [X, Y] = rng.chance(0.5) ? [A, B] : [B, A];
        return { P, t, X, Y, vX: offerValue(P, X, t), vY: offerValue(P, Y, t) };
      },
      (v) => !onEdge(v.vX) && !onEdge(v.vY) && Math.abs(v.vX - v.vY) >= 2,
      200,
    );
    const { P, t, X, Y, vX, vY } = o;
    const rX = roundTo(vX, 2);
    const rY = roundTo(vY, 2);
    const aBetter = rX > rY;
    const diff = Math.abs(sub(rX, rY));
    const [bA, bB] = rng.sample(BANKS, 2);
    return {
      prompt: `${name} has ${tag(P)} to invest for ${yrs(t)} and is comparing two offers. **Offer A** (${bA}): ${offerText(X)}. **Offer B** (${bB}): ${offerText(Y)}. Find the value of each offer after ${yrs(t)}. Which offer is better, and by how much? ${CENT}`,
      parts: [moneyPart(vX, 'Offer A: \\$'), moneyPart(vY, 'Offer B: \\$'), part(fixedChoice(['Offer A', 'Offer B'], aBetter ? 0 : 1), { label: 'Better offer:' }), moneyPart(diff, 'Better by: \\$')],
      hints: [
        'A higher rate is not always better: the compounding matters too. Work out the value of each offer.',
        'Simple interest: $A = P + Prt$. Compound interest: $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$. Then subtract.',
      ],
      solution: [
        offerLine('Offer A', P, X, t),
        offerLine('Offer B', P, Y, t),
        `Difference: $${m2(Math.max(rX, rY))} - ${m2(Math.min(rX, rY))} = ${m2(diff)}$`,
        `Offer A is worth ${money(rX)} and Offer B is worth ${money(rY)}. Offer ${aBetter ? 'A' : 'B'} is better by ${money(diff)}.`,
      ],
    };
  }
  // Several doublings: how long, or what rate.
  const P = rng.int(10, 50) * 100;
  const mult = rng.pick([4, 8]);
  const d = mult === 4 ? 2 : 3;
  if (rng.chance(0.5)) {
    const r = rng.pick(mult === 4 ? [3, 4, 6, 8, 9, 12] : [6, 8, 9, 12]);
    const s = saverFor(rng, r);
    const T = 72 / r;
    return {
      prompt: `${name} puts ${tag(P)} into ${s.what} that earns ${pc(r)} per year, compounded annually. Use the Rule of 72 to estimate how many years it will take to grow to ${tag(P * mult)}.`,
      parts: [numPart(d * T, { suffix: 'years' })],
      hints: [`How many times does ${tag(P)} have to double to reach ${tag(P * mult)}?`, `${R72_HINT} Multiply the doubling time by the number of doublings.`],
      solution: [
        `${tag(P)} → ${Array.from({ length: d }, (_, i) => tag(P * 2 ** (i + 1))).join(' → ')}: that is ${d} doublings.`,
        `Doubling time $\\approx 72 \\div ${r} = ${T}$ years`,
        `Total: $${d} \\times ${T} = ${d * T}$ years`,
        `It will take about ${d * T} years to grow to ${tag(P * mult)}.`,
      ],
    };
  }
  const Y = rng.pick(mult === 4 ? [12, 16, 18, 24, 36] : [18, 24, 27, 36]);
  const T = Y / d;
  const r = 72 / T;
  return {
    prompt: `${name} wants ${tag(P)} to grow to ${tag(P * mult)} in ${Y} years. Use the Rule of 72 to estimate the interest rate per year (compounded annually) needed.`,
    parts: [numPart(r, { suffix: '%', display: 'decimal' })],
    hints: [`How many times does the money double? Share the ${Y} years equally among the doublings to get the doubling time.`, 'Then rate ≈ 72 ÷ doubling time.'],
    solution: [
      `${tag(P)} → ${Array.from({ length: d }, (_, i) => tag(P * 2 ** (i + 1))).join(' → ')}: that is ${d} doublings.`,
      `Doubling time: $${Y} \\div ${d} = ${T}$ years`,
      `Rate $\\approx 72 \\div ${T} = ${r}$`,
      `${name} needs about ${pc(r)} per year.`,
    ],
  };
}

const ruleOf72 = skill({
  id: 'm203-rule-of-72',
  name: 'The Rule of 72 and comparing investments',
  description: 'Estimate doubling time or the rate needed with the Rule of 72, check the estimate with the compound interest formula, and compare two investment offers.',
  outcomes: ['N3'],
  lessonId: 'm203-7-2',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? r72a(rng) : d === 2 ? r72b(rng) : r72c(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.3 Credit cards — m203-credit-card
// ---------------------------------------------------------------------------

const CARD_RATES = [18.99, 19.5, 19.99, 20.99, 21.99, 22.99];
const dailyRule = (r: number) => `${pc(r)} per year, charged daily (balance × ${dec(r)} ÷ 365 × number of days)`;
const dailyLine = (B: number, r: number, D: number) => `$${m2(B)} \\times ${dec(r)} \\div 365 \\times ${D} ${toCents((B * r * D) / 36500)}$`;
const DAILY_HINT = 'Change the yearly rate to a decimal, divide by 365 for one day, then multiply by the number of days. Do not round until the end.';

function minPay(B: number, p: number, floor: number) {
  const raw = (B * p) / 100;
  return { raw, M: raw > floor ? roundTo(raw, 2) : floor };
}

function cc1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  if (rng.chance(0.55)) {
    const o = retry(
      () => {
        const B = rng.int(4, 30) * 50;
        const r = rng.pick(CARD_RATES);
        const D = rng.pick([28, 30, 31]);
        return { B, r, D, I: (B * r * D) / 36500 };
      },
      (v) => !onEdge(v.I),
    );
    const { B, r, D, I } = o;
    return {
      prompt: `${name} has an unpaid balance of ${tag(B)} on a credit card from ${bank}. The card charges interest of ${dailyRule(r)}. How much interest is charged on this balance for ${D} days? ${CENT}`,
      parts: [moneyPart(I, 'Interest: \\$')],
      hints: [DAILY_HINT, `Interest $= ${mv(B)} \\times ${dec(r)} \\div 365 \\times ${D}$`],
      solution: [`Rate as a decimal: $${pcm(r)} = ${dec(r)}$`, `Interest $= ${mv(B)} \\times ${dec(r)} \\div 365 \\times ${D} ${toCents(I)}$`, `The interest for ${D} days is ${abt(I)}${money(roundTo(I, 2))}.`],
    };
  }
  const p = rng.pick([2, 3, 5]);
  const floor = rng.pick([10, 15, 20]);
  const cut = (floor * 100) / p;
  const small = rng.chance(0.25);
  const B = retry(
    () => (small ? rng.int(Math.ceil(cut * 0.25 * 100), Math.floor(cut * 0.9 * 100)) / 100 : rng.int(Math.ceil(cut * 1.2 * 100), Math.max(Math.ceil(cut * 1.2 * 100) + 100, 400000)) / 100),
    (x) => !onEdge((x * p) / 100),
  );
  const { raw, M } = minPay(B, p, floor);
  return {
    prompt: `${poss(name)} credit card statement from ${bank} shows a balance of ${money(B)}. The minimum payment is ${pc(p)} of the balance or ${tag(floor)}, whichever is greater. What is the minimum payment? ${CENT}`,
    parts: [moneyPart(M, 'Minimum payment: \\$')],
    hints: [`Find ${pc(p)} of the balance: multiply by $${dec(p)}$.`, `Compare that with ${tag(floor)}. The minimum payment is the greater of the two.`],
    solution: [
      `${pc(p)} of the balance: $${m2(B)} \\times ${dec(p)} ${toCents(raw)}$`,
      raw > floor ? `This is more than ${tag(floor)}, so the minimum payment is ${money(M)}.` : `This is less than ${tag(floor)}, so the minimum payment is ${tag(floor)}.`,
      `The minimum payment is ${money(M)}.`,
    ],
  };
}

function cc2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  if (rng.chance(0.55)) {
    const o = retry(
      () => {
        const B = rng.int(30000, 250000) / 100;
        const pay = rng.int(2, Math.floor((B * 0.6) / 25)) * 25;
        const U = sub(B, pay);
        const r = rng.pick(CARD_RATES);
        const D = rng.pick([30, 31]);
        const X = rng.int(2000, 60000) / 100;
        return { B, pay, U, r, D, X, I: (U * r * D) / 36500 };
      },
      (v) => !onEdge(v.I) && v.pay >= 50,
    );
    const { B, pay, U, r, D, X, I } = o;
    const Ir = roundTo(I, 2);
    const NB = total([U, Ir, X]);
    return {
      prompt: `${poss(name)} credit card statement from ${bank} showed a balance of ${money(B)}. ${name} paid ${tag(pay)} by the due date, which is less than the full balance. For this question, interest is charged on the unpaid amount only, at ${dailyRule(r)}, for ${D} days. ${name} also made new purchases of ${money(X)}. Find the unpaid amount, the interest, and the new balance on the next statement. ${CENT}`,
      parts: [moneyPart(U, 'Unpaid amount: \\$'), moneyPart(I, 'Interest: \\$'), moneyPart(NB, 'New balance: \\$')],
      hints: ['Unpaid amount = statement balance − payment. Find the interest on that amount for the days given.', 'New balance = unpaid amount + interest + new purchases.'],
      solution: [
        `Unpaid amount: $${m2(B)} - ${mv(pay)} = ${m2(U)}$`,
        `Interest: ${dailyLine(U, r, D)}`,
        `New balance: $${m2(U)} + ${m2(Ir)} + ${m2(X)} = ${m2(NB)}$`,
        `The unpaid amount is ${money(U)}, the interest is ${abt(I)}${money(Ir)}, and the new balance is ${money(NB)}.`,
      ],
    };
  }
  const o = retry(
    () => {
      const C = rng.int(5, 30) * 20;
      const p = rng.pick([1, 2, 3]);
      const r = rng.pick([22.99, 23.99, 24.99]);
      const D = rng.int(8, 45);
      return { C, p, r, D, fee: (C * p) / 100, I: (C * r * D) / 36500 };
    },
    (v) => !onEdge(v.I),
  );
  const { C, p, r, D, fee, I } = o;
  const Ir = roundTo(I, 2);
  const T = total([fee, Ir]);
  return {
    prompt: `${name} takes a cash advance of ${tag(C)} from an ATM using a credit card from ${bank}. The card charges a cash-advance fee of ${pc(p)} of the amount. Interest on a cash advance starts on the day it is taken (there is no interest-free period) at ${dailyRule(r)}. ${name} pays it all back ${D} days later. Find the fee, the interest, and the total cost of the cash advance. ${CENT}`,
    parts: [moneyPart(fee, 'Fee: \\$'), moneyPart(I, 'Interest: \\$'), moneyPart(T, 'Total cost: \\$')],
    hints: [`Fee = ${pc(p)} of ${tag(C)}. Interest = ${tag(C)} × ${dec(r)} ÷ 365 × ${D}.`, 'Total cost = fee + interest.'],
    solution: [
      `Fee: $${mv(C)} \\times ${dec(p)} = ${m2(fee)}$`,
      `Interest: ${dailyLine(C, r, D)}`,
      `Total cost: $${m2(fee)} + ${m2(Ir)} = ${m2(T)}$`,
      `The fee is ${money(fee)} and the interest is ${abt(I)}${money(Ir)}, so the cash advance costs ${money(T)}.`,
    ],
  };
}

const SHOPS = ['Grocery store', 'Gas station', 'Hardware store', 'Restaurant', 'Online order', 'Pharmacy', 'Sporting goods store', 'Auto parts store'];

function cc3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const k = rng.pick(['statement', 'statement', 'compare', 'carry'] as const);
  if (k === 'statement') {
    const p = rng.pick([2, 3]);
    const o = retry(
      () => {
        const B = rng.int(40000, 300000) / 100;
        const pay = rng.int(2, Math.floor((B * 0.5) / 25)) * 25;
        const U = sub(B, pay);
        const r = rng.pick(CARD_RATES);
        const D = rng.pick([30, 31]);
        const buys = Array.from({ length: rng.int(2, 3) }, () => rng.int(1500, 25000) / 100);
        const I = (U * r * D) / 36500;
        const NB = total([U, roundTo(I, 2), ...buys]);
        return { B, pay, U, r, D, buys, I, NB };
      },
      (v) => !onEdge(v.I) && !onEdge((v.NB * p) / 100) && v.pay >= 50,
    );
    const { B, pay, U, r, D, buys, I, NB } = o;
    const Ir = roundTo(I, 2);
    const X = total(buys);
    const mp = minPay(NB, p, 10);
    const shops = rng.sample(SHOPS, buys.length);
    return {
      prompt: `The table shows ${poss(name)} credit card activity for one month at ${bank}. For this question, interest is charged on the unpaid part of the previous balance only, at ${dailyRule(r)}, for ${D} days. The minimum payment is ${pc(p)} of the new balance or \\$10, whichever is greater. Find the interest, the new balance, and the minimum payment. ${CENT}`,
      figure: {
        type: 'table',
        headers: ['Item', 'Amount'],
        rows: [['Previous balance', cell(B)], ['Payment received', `-${cell(pay)}`], ...buys.map((b, i) => [`Purchase: ${shops[i]}`, cell(b)])],
      },
      parts: [moneyPart(I, 'Interest: \\$'), moneyPart(NB, 'New balance: \\$'), moneyPart(mp.M, 'Minimum payment: \\$')],
      hints: [
        'Unpaid part = previous balance − payment. Find the interest on that amount for the days given.',
        `New balance = unpaid part + interest + purchases. Then take ${pc(p)} of the new balance and compare it with \\$10.`,
      ],
      solution: [
        `Unpaid part: $${m2(B)} - ${mv(pay)} = ${m2(U)}$`,
        `Interest: ${dailyLine(U, r, D)}`,
        `Purchases: ${buys.length > 1 ? `$${buys.map(m2).join(' + ')} = ${m2(X)}$` : `$${m2(X)}$`}`,
        `New balance: $${m2(U)} + ${m2(Ir)} + ${m2(X)} = ${m2(NB)}$`,
        `Minimum payment: $${m2(NB)} \\times ${dec(p)} ${toCents(mp.raw)}$, which is more than \\$10.`,
        `The interest is ${abt(I)}${money(Ir)}, the new balance is ${money(NB)}, and the minimum payment is ${money(mp.M)}.`,
      ].map((l) => (mp.raw > 10 ? l : l.replace(', which is more than \\$10.', ', which is less than \\$10, so the minimum payment is \\$10.'))),
    };
  }
  if (k === 'compare') {
    const o = retry(
      () => {
        const avg = rng.int(10, 80) * 50;
        const rA = rng.pick([19.99, 20.99, 21.99]);
        const rB = rng.pick([11.99, 12.99, 13.99]);
        const fee = rng.pick([29, 35, 39, 49, 59, 79]);
        const cA = (avg * rA) / 100;
        const cB = (avg * rB) / 100 + fee;
        return { avg, rA, rB, fee, cA, cB };
      },
      (v) => !onEdge(v.cA) && !onEdge(v.cB) && Math.abs(v.cA - v.cB) >= 3,
    );
    const { avg, rA, rB, fee, cA, cB } = o;
    const a = roundTo(cA, 2);
    const b = roundTo(cB, 2);
    const aCheaper = a < b;
    const [nA, nB] = ['Card A', 'Card B'];
    return {
      prompt: `${name} usually carries a balance of about ${tag(avg)} on a credit card. **${nA}** charges ${pc(rA)} interest per year and has no annual fee. **${nB}** charges ${pc(rB)} interest per year but has an annual fee of ${tag(fee)}. For this question, the interest for one year is about balance × annual rate. Find the cost of each card for one year. Which card is cheaper for ${name}? ${CENT}`,
      parts: [moneyPart(cA, `${nA} for a year: \\$`), moneyPart(cB, `${nB} for a year: \\$`), part(fixedChoice([nA, nB], aCheaper ? 0 : 1), { label: 'Cheaper card:' })],
      hints: ['Interest for a year = balance × annual rate (as a decimal).', `Add the annual fee to the interest for ${nB}. Then compare the totals.`],
      solution: [
        `${nA}: $${mv(avg)} \\times ${dec(rA)} ${toCents(cA)}$`,
        `${nB}: $${mv(avg)} \\times ${dec(rB)} + ${fee} ${toCents(cB)}$`,
        `${nA} costs ${abt(cA)}${money(a)} and ${nB} costs ${abt(cB)}${money(b)}. ${aCheaper ? nA : nB} is cheaper by ${money(Math.abs(sub(a, b)))}.`,
      ],
    };
  }
  // Carrying a purchase for two months; interest is added to the balance each month.
  const item = rng.pick(['a laptop', 'a new set of tires', 'a gaming console and games', 'a mountain bike', 'a couch for a first apartment', 'a used snowblower', 'a pair of work boots and a jacket']);
  const [D1, D2] = rng.pick([[31, 30], [30, 31], [31, 31]] as const);
  const o = retry(
    () => {
      const B0 = rng.int(30000, 200000) / 100;
      const r = rng.pick(CARD_RATES);
      const I1 = (B0 * r * D1) / 36500;
      const B1 = total([B0, roundTo(I1, 2)]);
      const I2 = (B1 * r * D2) / 36500;
      return { B0, r, I1, B1, I2 };
    },
    (v) => !onEdge(v.I1) && !onEdge(v.I2),
  );
  const { B0, r, I1, B1, I2 } = o;
  const i1 = roundTo(I1, 2);
  const i2 = roundTo(I2, 2);
  const B2 = total([B1, i2]);
  const TI = total([i1, i2]);
  return {
    prompt: `${name} buys ${item} for ${money(B0)} with a credit card from ${bank} and makes no payments for two months. The card charges ${dailyRule(r)}. The interest is added to the balance at the end of each month, so the second month charges interest on the interest too. The first month has ${D1} days and the second month has ${D2} days. Find the interest for each month and the total ${name} must pay to clear the balance after two months. ${CENT}`,
    parts: [moneyPart(I1, 'Interest, month 1: \\$'), moneyPart(I2, 'Interest, month 2: \\$'), moneyPart(B2, 'Total to pay: \\$')],
    hints: ['Month 1: interest on the purchase price. Add it to get the new balance.', 'Month 2: interest on the new balance. Add it again.'],
    solution: [
      `Month 1 interest: ${dailyLine(B0, r, D1)}`,
      `Balance after month 1: $${m2(B0)} + ${m2(i1)} = ${m2(B1)}$`,
      `Month 2 interest: ${dailyLine(B1, r, D2)}`,
      `Balance after month 2: $${m2(B1)} + ${m2(i2)} = ${m2(B2)}$`,
      `The interest is ${money(i1)} and then ${money(i2)}, so ${name} must pay ${money(B2)}. Carrying the balance cost ${money(TI)}.`,
    ],
  };
}

const creditCard = skill({
  id: 'm203-credit-card',
  name: 'Credit card interest and payments',
  description: 'Find daily interest on a credit card balance, minimum payments, new balances, cash-advance costs and the cost of carrying a balance, with every rate and rule stated.',
  outcomes: ['N5', 'A1'],
  lessonId: 'm203-7-3',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? cc1(rng) : d === 2 ? cc2(rng) : cc3(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.3 Loans and finance charges — m203-loan-cost
// ---------------------------------------------------------------------------

/** A realistic monthly payment (the question gives it; students never derive it). */
function payment(L: number, r: number, n: number): number {
  const i = r / 1200;
  const M = i === 0 ? L / n : (L * i) / (1 - (1 + i) ** -n);
  return Math.ceil(M * 100 - 1e-9) / 100;
}
const times = (M: number, n: number) => (Math.round(M * 100) * n) / 100;

const VEHICLES = [
  'a used truck from a dealer', 'a car from a dealer', 'a quad from a powersports dealer', 'a snowmobile from a dealer up north',
  'a used pickup from a private seller', 'a fishing boat for the lake', 'a used SUV', 'a work van for a plumbing business',
];
const RTO = [
  { item: 'a washer and dryer', lo: 1100, hi: 1900 },
  { item: 'a 65-inch TV', lo: 700, hi: 1300 },
  { item: 'a laptop', lo: 600, hi: 1400 },
  { item: 'a gaming console', lo: 450, hi: 700 },
  { item: 'a sectional sofa', lo: 900, hi: 2000 },
  { item: 'a fridge', lo: 1000, hi: 1800 },
];

function rentToOwn(rng: Rng, d: 1 | 2 | 3): Out {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const g = rng.pick(RTO);
  const weekly = d === 1 || rng.chance(0.6);
  const askPct = d === 3;
  const { C, N, w } = retry(
    () => {
      const C = rng.int(g.lo / 10, g.hi / 10) * 10 - 0.01;
      const N = weekly ? rng.pick([52, 78, 104]) : rng.pick([26, 39, 52]);
      return { C, N, w: Math.ceil((C * rng.float(1.6, 2.4, 2)) / N) - 0.01 };
    },
    (v) => !askPct || !onEdge(((times(v.w, v.N) - v.C) / v.C) * 100, 1),
  );
  const T = times(w, N);
  const F = sub(T, C);
  const plan = weekly ? `${N} weekly payments of ${money(w)}` : `${N} payments of ${money(w)} every two weeks`;
  const pct = (F / C) * 100;
  return {
    prompt: `A rent-to-own store in ${city} offers ${g.item} for ${plan}, and then ${name} owns it. The cash price is ${money(C)}. What is the total of the payments? How much more is that than the cash price (the finance charge)?${askPct ? ' What is the finance charge as a percent of the cash price, to the nearest tenth of a percent?' : ''} ${askPct ? 'Give money answers to the nearest cent.' : CENT}`,
    parts: [moneyPart(T, 'Total of payments: \\$'), moneyPart(F, 'Finance charge: \\$'), ...(askPct ? [numPart(pct, { decimals: 1, suffix: '%', label: 'Percent of cash price:' })] : [])],
    hints: ['Total of payments = payment × number of payments.', `Finance charge = total of payments − cash price.${askPct ? ' Percent = finance charge ÷ cash price × 100.' : ''}`],
    solution: [
      `Total of payments: $${m2(w)} \\times ${N} = ${m2(T)}$`,
      `Finance charge: $${m2(T)} - ${m2(C)} = ${m2(F)}$`,
      ...(askPct ? [`Percent: $${m2(F)} \\div ${m2(C)} \\times 100 \\approx ${num(pct, 3)}$`] : []),
      `${name} would pay ${money(T)}, which is ${money(F)} more than the cash price${askPct ? `, or about ${fmt(roundTo(pct, 1))}% extra` : ''}.`,
    ],
  };
}

function lc1(rng: Rng): Out {
  if (rng.chance(0.35)) return rentToOwn(rng, 1);
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const L = rng.int(6, 50) * 500;
  const r = rng.pick([4.9, 5.9, 6.4, 6.9, 7.4, 7.9, 8.9]);
  const n = rng.pick([24, 36, 48, 60]);
  const M = payment(L, r, n);
  const T = times(M, n);
  const F = sub(T, L);
  return {
    prompt: `${name} borrows ${tag(L)} from ${bank} to buy ${rng.pick(VEHICLES)}. The loan is paid off with ${n} monthly payments of ${money(M)}. How much will ${name} pay in total? What is the cost of borrowing (the interest)? ${CENT}`,
    parts: [moneyPart(T, 'Total paid: \\$'), moneyPart(F, 'Cost of borrowing: \\$')],
    hints: ['Total paid = payment × number of payments.', 'Cost of borrowing = total paid − amount borrowed.'],
    solution: [`Total paid: $${m2(M)} \\times ${n} = ${m2(T)}$`, `Cost of borrowing: $${m2(T)} - ${mv(L)} = ${m2(F)}$`, `${name} pays ${money(T)} in total, so the loan costs ${money(F)} in interest.`],
  };
}

function lc2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const k = rng.pick(['years', 'compare', 'compare', 'rto'] as const);
  if (k === 'rto') return rentToOwn(rng, 2);
  if (k === 'years') {
    const L = rng.int(1000, 6000) * 10;
    const r = rng.pick([5.49, 5.99, 6.49, 6.99, 7.49, 7.99, 8.49]);
    const y = rng.int(3, 7);
    const n = 12 * y;
    const M = payment(L, r, n);
    const T = times(M, n);
    const F = sub(T, L);
    return {
      prompt: `${name} takes out a loan of ${tag(L)} from ${bank} for ${rng.pick(VEHICLES)}. The payments are ${money(M)} a month for ${yrs(y)}. How many payments will ${name} make? What is the total paid, and how much interest does the loan cost? ${CENT}`,
      parts: [numPart(n, { label: 'Number of payments:' }), moneyPart(T, 'Total paid: \\$'), moneyPart(F, 'Interest: \\$')],
      hints: ['The payments are monthly, so change the years to months: 12 payments a year.', 'Total paid = monthly payment × number of payments. Interest = total paid − amount borrowed.'],
      solution: [
        `Number of payments: $${y} \\times 12 = ${n}$`,
        `Total paid: $${m2(M)} \\times ${n} = ${m2(T)}$`,
        `Interest: $${m2(T)} - ${mv(L)} = ${m2(F)}$`,
        `${name} makes ${n} payments totalling ${money(T)}, so the loan costs ${money(F)} in interest.`,
      ],
    };
  }
  const dealer = rng.pick(['Valley Motors', 'Lakeshore Auto Sales', 'Summit Truck Centre', 'Big Sky Auto', 'Aspen Powersports']);
  const o = retry(
    () => {
      const L = rng.int(160, 900) * 50;
      const nD = rng.pick([72, 84, 96]);
      const nB = rng.pick([48, 60]);
      const rD = rng.pick([6.99, 7.49, 7.99, 8.49, 8.99]);
      const rB = rng.pick([5.99, 6.49, 6.99, 7.49]);
      const MD = payment(L, rD, nD);
      const MB = payment(L, rB, nB);
      return { L, nD, nB, MD, MB, TD: times(MD, nD), TB: times(MB, nB) };
    },
    (v) => Math.abs(v.TD - v.TB) >= 50,
  );
  const { L, nD, nB, MD, MB, TD, TB } = o;
  const bankCheaper = TB < TD;
  return {
    prompt: `${name} needs to borrow ${tag(L)} for a truck. ${dealer} offers a loan with ${nD} monthly payments of ${money(MD)}. ${bank} offers a loan with ${nB} monthly payments of ${money(MB)}. Find the total paid for each loan. Which loan costs less in total? ${CENT}`,
    parts: [moneyPart(TD, `${dealer} total: \\$`), moneyPart(TB, `${bank} total: \\$`), part(fixedChoice([`The loan from ${dealer}`, `The loan from ${bank}`], bankCheaper ? 1 : 0), { label: 'Costs less:' })],
    hints: ['Total paid = monthly payment × number of payments, for each loan.', 'A lower monthly payment can still cost more in total if there are more payments.'],
    solution: [
      `${dealer}: $${m2(MD)} \\times ${nD} = ${m2(TD)}$`,
      `${bank}: $${m2(MB)} \\times ${nB} = ${m2(TB)}$`,
      `Interest: ${dealer} $${m2(TD)} - ${mv(L)} = ${m2(sub(TD, L))}$; ${bank} $${m2(TB)} - ${mv(L)} = ${m2(sub(TB, L))}$`,
      `The loan from ${bankCheaper ? bank : dealer} costs ${money(Math.abs(sub(TD, TB)))} less in total${bankCheaper ? ', even though its monthly payment is higher' : ''}.`,
    ],
  };
}

function lc3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const k = rng.pick(['down', 'down', 'rebate', 'rebate', 'rto'] as const);
  if (k === 'rto') return rentToOwn(rng, 3);
  if (k === 'down') {
    const price = rng.int(150, 450) * 100;
    const dp = rng.pick([10, 15, 20, 25]);
    const D = (price * dp) / 100;
    const L = price - D;
    const r = rng.pick([5.99, 6.49, 6.99, 7.49, 7.99]);
    const y = rng.int(4, 7);
    const n = 12 * y;
    const M = payment(L, r, n);
    const T = times(M, n);
    const all = total([D, T]);
    const F = sub(all, price);
    const v = rng.pick(['a used truck', 'a three-quarter-ton pickup', 'a used half-ton truck', 'a work truck']);
    return {
      prompt: `${name} is buying ${v} from a dealer for ${tag(price)}. ${name} makes a down payment of ${pc(dp)} and borrows the rest from ${bank}, paying ${money(M)} a month for ${yrs(y)}. Find the amount borrowed, the total cost of the truck (down payment plus all the payments), and the finance charge. ${CENT}`,
      parts: [moneyPart(L, 'Amount borrowed: \\$'), moneyPart(all, 'Total cost: \\$'), moneyPart(F, 'Finance charge: \\$')],
      hints: [`Down payment = ${pc(dp)} of the price. The amount borrowed is the rest.`, `${yrs(y)} of monthly payments is ${n} payments. Total cost = down payment + payment × ${n}. Finance charge = total cost − price.`],
      solution: [
        `Down payment: $${mv(price)} \\times ${dec(dp)} = ${mv(D)}$`,
        `Amount borrowed: $${mv(price)} - ${mv(D)} = ${mv(L)}$`,
        `Payments: $${y} \\times 12 = ${n}$, and $${m2(M)} \\times ${n} = ${m2(T)}$`,
        `Total cost: $${mv(D)} + ${m2(T)} = ${m2(all)}$`,
        `Finance charge: $${m2(all)} - ${mv(price)} = ${m2(F)}$`,
        `${name} borrows ${money(L)}. The truck costs ${money(all)} in all, so the finance charge is ${money(F)}.`,
      ],
    };
  }
  const dealer = rng.pick(['Valley Motors', 'Lakeshore Auto Sales', 'Summit Truck Centre', 'Big Sky Auto']);
  const o = retry(
    () => {
      const price = rng.int(280, 600) * 100;
      const R = rng.int(8, 24) * 250;
      const r1 = rng.pick([0, 0.9, 1.49, 1.99, 2.49, 2.99]);
      const r2 = rng.pick([4.49, 4.99, 5.49, 5.99, 6.49]);
      const n = rng.pick([36, 48, 60, 72]);
      const M1 = payment(price, r1, n);
      const M2 = payment(price - R, r2, n);
      return { price, R, n, M1, M2, T1: times(M1, n), T2: times(M2, n) };
    },
    (v) => Math.abs(v.T1 - v.T2) >= 50,
  );
  const { price, R, n, M1, M2, T1, T2 } = o;
  const rebateCheaper = T2 < T1;
  return {
    prompt: `${name} is buying a truck for ${tag(price)} from ${dealer}. **Option 1:** the dealer’s financing on the full price, with ${n} monthly payments of ${money(M1)}. **Option 2:** take a cash rebate of ${tag(R)} off the price and borrow the rest from ${bank}, with ${n} monthly payments of ${money(M2)}. Find the total paid for each option. Which option is cheaper, and by how much? ${CENT}`,
    parts: [moneyPart(T1, 'Option 1 total: \\$'), moneyPart(T2, 'Option 2 total: \\$'), part(fixedChoice(['Option 1', 'Option 2'], rebateCheaper ? 1 : 0), { label: 'Cheaper:' }), moneyPart(Math.abs(sub(T1, T2)), 'Cheaper by: \\$')],
    hints: ['For each option, total paid = monthly payment × number of payments.', 'The rebate is already built into the Option 2 payments, so do not subtract it again. Compare the two totals.'],
    solution: [
      `Option 1: $${m2(M1)} \\times ${n} = ${m2(T1)}$`,
      `Option 2: the loan is $${mv(price)} - ${mv(R)} = ${mv(price - R)}$, and $${m2(M2)} \\times ${n} = ${m2(T2)}$`,
      `Difference: $${m2(Math.max(T1, T2))} - ${m2(Math.min(T1, T2))} = ${m2(Math.abs(sub(T1, T2)))}$`,
      `Option ${rebateCheaper ? 2 : 1} is cheaper by ${money(Math.abs(sub(T1, T2)))}.`,
    ],
  };
}

const loanCost = skill({
  id: 'm203-loan-cost',
  name: 'The cost of loans and rent-to-own',
  description: 'Find the total paid and the finance charge for a loan or rent-to-own plan from the stated payments, and compare dealer, bank and rebate options.',
  outcomes: ['N5', 'A1'],
  lessonId: 'm203-7-3',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? lc1(rng) : d === 2 ? lc2(rng) : lc3(rng);
  },
});

export const INTEREST_SKILLS: SkillDef[] = [simpleInterest, compoundInterest, ruleOf72, creditCard, loanCost];
