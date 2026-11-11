/** More Mathematics Topics, Unit 23: nominal and effective interest rates, annuities and sinking funds, loans, and shares and stocks. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { NAMES } from './common.ts';

type Out = GenOutput;

const group = (s: string) => {
  const [i, f] = s.split('.');
  return i!.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? `.${f}` : '');
};
/** Money in prose: \$1,250.00, or \$1,250 for whole dollars. */
const money = (x: number) => `\\$${group(Math.abs(x - Math.round(x)) < 1e-9 ? fmt(x, 0) : fmtFixed(x, 2))}`;
const moneyPart = (v: number, label = '\\$'): Part => numPart(roundTo(v, 2), { decimals: 2, tolerance: 0.011, label });
const pctPart = (v: number, label?: string): Part => numPart(v, { decimals: 2, suffix: '%', label });
const f6 = (v: number) => fmt(v, 6);

const PERIOD: Record<number, { adverb: string; noun: string }> = {
  1: { adverb: 'annually', noun: 'year' },
  2: { adverb: 'half-yearly', noun: 'half-year' },
  4: { adverb: 'quarterly', noun: 'quarter' },
  12: { adverb: 'monthly', noun: 'month' },
  365: { adverb: 'daily', noun: 'day' },
};
/** Yearly rates whose monthly rate is a short decimal. */
const MONTHLY_RATES = [3, 3.6, 4.2, 4.8, 5.4, 6, 7.2, 8.4, 9, 9.6, 10.8, 12];
const effective = (r: number, m: number) => ((1 + r / 100 / m) ** m - 1) * 100;

// ---------------------------------------------------------------------------
// 23.1 Nominal and effective interest rates
// ---------------------------------------------------------------------------

const effSteps = (r: number, m: number) => [
  `$1 + i = \\left(1 + \\dfrac{${fmt(r / 100)}}{${m}}\\right)^{${m}} \\approx ${f6((1 + r / 100 / m) ** m)}$`,
  `Effective rate $\\approx ${fmtFixed(effective(r, m), 2)}\\%$`,
];

function effectiveRate(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const [rA, rB, mB] = retry(
      () => {
        const a = rng.int(40, 110) / 10;
        return [a, roundTo(a + rng.pick([0.1, 0.15, 0.2, 0.25, 0.3]), 2), rng.pick([1, 2])] as [number, number, number];
      },
      ([a, b, m]) => Math.abs(effective(a, 12) - effective(b, m)) >= 0.03,
    );
    const eA = effective(rA, 12);
    const eB = effective(rB, mB);
    return {
      prompt: `Bank A pays $${fmt(rA)}\\%$ per year compounded monthly. Bank B pays $${fmt(rB)}\\%$ per year compounded ${PERIOD[mB]!.adverb}. Find the effective annual rate of each bank, as a percent to 2 decimal places, and say which bank pays a saver more.`,
      parts: [pctPart(eA, 'Bank A'), pctPart(eB, 'Bank B'), { label: 'Pays more', answer: mc(rng, eA > eB ? 'Bank A' : 'Bank B', [eA > eB ? 'Bank B' : 'Bank A']) }],
      hints: ['The effective rate $i$ comes from $1 + i = \\left(1 + \\dfrac{r}{m}\\right)^m$, where $r$ is the nominal rate as a decimal and $m$ is the number of times interest is added each year.', 'Compare the two effective rates, not the nominal rates.'],
      solution: [`Bank A: ${effSteps(rA, 12).join(', so ').replace('Effective rate', 'the effective rate')}`, mB === 1 ? `Bank B: interest is added once a year, so the effective rate is the nominal rate, $${fmtFixed(rB, 2)}\\%$.` : `Bank B: ${effSteps(rB, mB).join(', so ').replace('Effective rate', 'the effective rate')}`, `${eA > eB ? 'Bank A' : 'Bank B'} has the higher effective rate, so it pays more.`],
      calculator: true,
    };
  }
  const m = d === 1 ? rng.pick([2, 4]) : rng.pick([12, 365]);
  const r = rng.int(8, 36) / 2;
  return {
    prompt: `A savings account pays interest at a nominal rate of $${fmt(r)}\\%$ per year, compounded ${PERIOD[m]!.adverb}${m === 365 ? ' ($365$ times a year)' : ''}. Find the effective annual interest rate, as a percent to 2 decimal places.`,
    parts: [pctPart(effective(r, m))],
    hints: [`Interest is added $${m}$ times a year, at $\\dfrac{${fmt(r)}\\%}{${m}}$ each time.`, `Use $1 + i = \\left(1 + \\dfrac{r}{m}\\right)^m$ with $r = ${fmt(r / 100)}$ and $m = ${m}$, then subtract $1$ and write $i$ as a percent.`],
    solution: effSteps(r, m),
    calculator: true,
  };
}

function nominalConvert(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const P = rng.int(2, 20) * 500;
    const r = rng.pick(MONTHLY_RATES);
    const n = rng.int(2, 6);
    const A = P * (1 + r / 1200) ** (12 * n);
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} invests ${money(P)} for $${n}$ years at a nominal rate of $${fmt(r)}\\%$ per year, compounded monthly. Find (a) the final amount, to the nearest cent, and (b) the effective annual rate, as a percent to 2 decimal places.`,
      parts: [moneyPart(A, '(a) \\$'), pctPart(effective(r, 12), '(b)')],
      hints: [`The rate for one month is $\\dfrac{${fmt(r)}\\%}{12} = ${fmt(r / 12)}\\%$, and there are $12 \\times ${n} = ${12 * n}$ months.`, 'For the effective rate, find what $1$ dollar grows to in one year: $\\left(1 + \\dfrac{r}{12}\\right)^{12}$.'],
      solution: [`(a) $A = ${fmt(P)} \\times \\left(1 + \\dfrac{${fmt(r / 100)}}{12}\\right)^{${12 * n}} = ${fmt(P)} \\times ${fmt(1 + r / 1200, 6)}^{${12 * n}} \\approx ${fmtFixed(A, 2)}$, so the amount is ${money(roundTo(A, 2))}.`, `(b) $1 + i = ${fmt(1 + r / 1200, 6)}^{12} \\approx ${f6((1 + r / 1200) ** 12)}$, so the effective rate is about $${fmtFixed(effective(r, 12), 2)}\\%$.`],
      calculator: true,
    };
  }
  const m = d === 1 ? rng.pick([2, 4]) : 12;
  const e = rng.int(40, 150) / 10;
  const root = (1 + e / 100) ** (1 / m);
  const nominal = m * (root - 1) * 100;
  return {
    prompt: `An investment has an effective annual interest rate of $${fmt(e)}\\%$. Interest is compounded ${PERIOD[m]!.adverb}. Find the nominal annual rate, as a percent to 2 decimal places.`,
    parts: [pctPart(nominal)],
    hints: [`Start from $1 + i = \\left(1 + \\dfrac{r}{${m}}\\right)^{${m}}$ with $i = ${fmt(e / 100)}$.`, `Take the ${m === 2 ? 'square root' : `$${m}$th root`} of both sides, subtract $1$, and multiply by $${m}$.`],
    solution: [`$${fmt(1 + e / 100)} = \\left(1 + \\dfrac{r}{${m}}\\right)^{${m}}$`, `$1 + \\dfrac{r}{${m}} = ${fmt(1 + e / 100)}^{1/${m}} \\approx ${f6(root)}$`, `$r \\approx ${m} \\times ${f6(root - 1)} \\approx ${fmt(nominal / 100, 5)}$, so the nominal rate is about $${fmtFixed(nominal, 2)}\\%$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 23.2 Annuities: future value and sinking funds
// ---------------------------------------------------------------------------

const futureValue = (x: number, i: number, n: number) => (x * ((1 + i) ** n - 1)) / i;
const presentValue = (x: number, i: number, n: number) => (x * (1 - (1 + i) ** -n)) / i;
const KEEP = 'Keep the full value on the calculator until the last step.';

/** A payment plan: yearly at a whole or half percent, or monthly at a rate with a short monthly decimal. */
function plan(rng: Rng, monthly: boolean, years: [number, number]) {
  const yrs = rng.int(years[0], years[1]);
  const r = monthly ? rng.pick(MONTHLY_RATES) : rng.int(8, 20) / 2;
  const m = monthly ? 12 : 1;
  return { yrs, r, m, i: r / 100 / m, n: yrs * m, each: monthly ? 'month' : 'year', adverb: monthly ? 'monthly' : 'annually' };
}
const rateLine = (p: ReturnType<typeof plan>) => (p.m === 12 ? `$i = \\dfrac{${fmt(p.r / 100)}}{12} = ${fmt(p.i, 6)}$ for each month, and $n = 12 \\times ${p.yrs} = ${p.n}$ payments.` : `$i = ${fmt(p.i)}$ and $n = ${p.n}$.`);

function annuityFuture(rng: Rng, d: Difficulty): Out {
  const p = plan(rng, d > 1, d === 1 ? [4, 12] : [3, 20]);
  const x = d === 1 ? rng.int(5, 40) * 100 : rng.int(2, 20) * 50;
  const F = futureValue(x, p.i, p.n);
  const name = rng.pick(NAMES);
  const setup = `${name} pays ${money(x)} into a savings plan at the end of every ${p.each} for $${p.yrs}$ years. The plan pays $${fmt(p.r)}\\%$ interest per year, compounded ${p.adverb}.`;
  const steps = [rateLine(p), `$F = \\dfrac{x\\left[(1 + i)^n - 1\\right]}{i} = \\dfrac{${fmt(x)}\\left[${fmt(1 + p.i, 6)}^{${p.n}} - 1\\right]}{${fmt(p.i, 6)}} \\approx ${fmtFixed(F, 2)}$`];
  if (d === 3) {
    const interest = roundTo(F, 2) - x * p.n;
    return {
      prompt: `${setup} Find (a) the value of the plan just after the last payment, to the nearest cent, and (b) how much of that value is interest.`,
      parts: [moneyPart(F, '(a) \\$'), moneyPart(interest, '(b) \\$')],
      hints: ['Use the future value of an annuity, $F = \\dfrac{x\\left[(1 + i)^n - 1\\right]}{i}$, with the rate and number of payments for months.', `The interest is the final value minus what was paid in, $${p.n} \\times ${fmt(x)}$.`],
      solution: [...steps, `(a) The plan is worth ${money(roundTo(F, 2))}.`, `(b) Paid in: $${p.n} \\times ${fmt(x)} = ${fmt(x * p.n)}$. Interest $= ${fmtFixed(F, 2)} - ${fmt(x * p.n)} = ${fmtFixed(interest, 2)}$, so ${money(interest)} is interest.`],
      calculator: true,
    };
  }
  return {
    prompt: `${setup} Find the value of the plan just after the last payment, to the nearest cent.`,
    parts: [moneyPart(F)],
    hints: ['Equal payments at equal intervals make an annuity. Its future value is $F = \\dfrac{x\\left[(1 + i)^n - 1\\right]}{i}$.', p.m === 12 ? `Use the rate for one month, $\\dfrac{${fmt(p.r)}\\%}{12}$, and count the payments in months. ${KEEP}` : `Here $x = ${fmt(x)}$, $i = ${fmt(p.i)}$ and $n = ${p.n}$. ${KEEP}`],
    solution: [...steps, `The plan is worth ${money(roundTo(F, 2))}.`],
    calculator: true,
  };
}

function sinkingFund(rng: Rng, d: Difficulty): Out {
  const p = plan(rng, d > 1, d === 1 ? [3, 10] : [2, 10]);
  const hints = (target: string) => [`A sinking fund is an annuity that must grow to a known amount. Put $F = ${target}$ in $F = \\dfrac{x\\left[(1 + i)^n - 1\\right]}{i}$ and solve for the payment $x$.`, `$x = \\dfrac{F \\times i}{(1 + i)^n - 1}$. ${KEEP}`];
  if (d === 3) {
    const cost = rng.int(20, 120) * 1000;
    const scrap = rng.int(2, 15) * 1000;
    const target = cost - scrap;
    const x = (target * p.i) / ((1 + p.i) ** p.n - 1);
    return {
      prompt: `A company must replace a machine in $${p.yrs}$ years. The new machine will cost ${money(cost)}, and the old one will then be sold for ${money(scrap)}. The company sets up a sinking fund for the rest, paying in at the end of every month. The fund pays $${fmt(p.r)}\\%$ interest per year, compounded monthly. Find the monthly payment, to the nearest cent.`,
      parts: [moneyPart(x)],
      hints: [`The fund must reach the cost minus the sale price of the old machine, ${money(target)}.`, hints(fmt(target))[1]!],
      solution: [`The fund must reach $${fmt(cost)} - ${fmt(scrap)} = ${fmt(target)}$.`, rateLine(p), `$x = \\dfrac{F \\times i}{(1 + i)^n - 1} = \\dfrac{${fmt(target)} \\times ${fmt(p.i, 6)}}{${fmt(1 + p.i, 6)}^{${p.n}} - 1} \\approx ${fmtFixed(x, 2)}$`, `The monthly payment is ${money(roundTo(x, 2))}.`],
      calculator: true,
    };
  }
  const F = d === 1 ? rng.int(10, 100) * 1000 : rng.int(5, 80) * 1000;
  const x = (F * p.i) / ((1 + p.i) ** p.n - 1);
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} wants to have ${money(F)} in $${p.yrs}$ years, and sets up a sinking fund with equal payments at the end of every ${p.each}. The fund pays $${fmt(p.r)}\\%$ interest per year, compounded ${p.adverb}. Find the payment needed each ${p.each}, to the nearest cent.`,
    parts: [moneyPart(x)],
    hints: hints(fmt(F)),
    solution: [rateLine(p), `$x = \\dfrac{F \\times i}{(1 + i)^n - 1} = \\dfrac{${fmt(F)} \\times ${fmt(p.i, 6)}}{${fmt(1 + p.i, 6)}^{${p.n}} - 1} \\approx ${fmtFixed(x, 2)}$`, `The payment is ${money(roundTo(x, 2))} each ${p.each}.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 23.3 Present value and loans
// ---------------------------------------------------------------------------

function annuityPresent(rng: Rng, d: Difficulty): Out {
  const p = plan(rng, d > 1, d === 1 ? [3, 10] : d === 2 ? [3, 25] : [2, 6]);
  const x = d === 1 ? rng.int(5, 40) * 200 : rng.int(4, 40) * 50;
  const P = presentValue(x, p.i, p.n);
  const pvStep = `$P = \\dfrac{x\\left[1 - (1 + i)^{-n}\\right]}{i} = \\dfrac{${fmt(x)}\\left[1 - ${fmt(1 + p.i, 6)}^{-${p.n}}\\right]}{${fmt(p.i, 6)}} \\approx ${fmtFixed(P, 2)}$`;
  const hints = ['The present value of an annuity is $P = \\dfrac{x\\left[1 - (1 + i)^{-n}\\right]}{i}$, where the first payment is made one period from now.', p.m === 12 ? `Use the rate for one month, $\\dfrac{${fmt(p.r)}\\%}{12}$, and count the payments in months. ${KEEP}` : `Here $x = ${fmt(x)}$, $i = ${fmt(p.i)}$ and $n = ${p.n}$. ${KEEP}`];
  const name = rng.pick(NAMES);
  if (d === 1) {
    return {
      prompt: `A fund must pay ${name} ${money(x)} at the end of every year for $${p.yrs}$ years. The fund earns $${fmt(p.r)}\\%$ interest per year, compounded annually. Find how much must be in the fund now, to the nearest cent.`,
      parts: [moneyPart(P)],
      hints,
      solution: [rateLine(p), pvStep, `The fund needs ${money(roundTo(P, 2))} now.`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${name} can afford to repay ${money(x)} at the end of every month for $${p.yrs}$ years. A bank charges $${fmt(p.r)}\\%$ interest per year, compounded monthly. Find the largest loan ${name} can take, to the nearest cent.`,
      parts: [moneyPart(P)],
      hints: ['A loan is the present value of its repayments.', hints[1]!],
      solution: [rateLine(p), pvStep, `The largest loan is ${money(roundTo(P, 2))}.`],
      calculator: true,
    };
  }
  const deposit = rng.int(4, 40) * 500;
  return {
    prompt: `${name} has ${money(deposit)} for a deposit on a car, and can repay ${money(x)} at the end of every month for $${p.yrs}$ years. The lender charges $${fmt(p.r)}\\%$ interest per year, compounded monthly. Find the highest price ${name} can pay for the car, to the nearest cent.`,
    parts: [moneyPart(P + deposit)],
    hints: ['The loan is the present value of the repayments.', 'The highest price is the deposit plus the loan.'],
    solution: [rateLine(p), pvStep, `Price $= ${fmt(deposit)} + ${fmtFixed(P, 2)} = ${fmtFixed(P + deposit, 2)}$, so the highest price is ${money(roundTo(P + deposit, 2))}.`],
    calculator: true,
  };
}

function loanRepayment(rng: Rng, d: Difficulty): Out {
  const p = plan(rng, d > 1, d === 1 ? [3, 8] : [2, 25]);
  const P = d === 1 ? rng.int(5, 50) * 1000 : p.yrs > 10 ? rng.int(8, 60) * 5000 : rng.int(4, 40) * 1000;
  const x = (P * p.i) / (1 - (1 + p.i) ** -p.n);
  const step = `$x = \\dfrac{P \\times i}{1 - (1 + i)^{-n}} = \\dfrac{${fmt(P)} \\times ${fmt(p.i, 6)}}{1 - ${fmt(1 + p.i, 6)}^{-${p.n}}} \\approx ${fmtFixed(x, 2)}$`;
  const hints = ['The loan is the present value of the repayments: $P = \\dfrac{x\\left[1 - (1 + i)^{-n}\\right]}{i}$. Solve for $x$.', `$x = \\dfrac{P \\times i}{1 - (1 + i)^{-n}}$. ${KEEP}`];
  const name = rng.pick(NAMES);
  const setup = `${name} borrows ${money(P)} and repays it with equal payments at the end of every ${p.each} for $${p.yrs}$ years. Interest is $${fmt(p.r)}\\%$ per year, compounded ${p.adverb}.`;
  if (d === 3) {
    const total = roundTo(x, 2) * p.n;
    const interest = total - P;
    return {
      prompt: `${setup} Find (a) the monthly repayment, to the nearest cent, and (b) the total interest paid over the loan, to the nearest dollar.`,
      parts: [moneyPart(x, '(a) \\$'), numPart(Math.round(interest), { decimals: 0, tolerance: Math.max(1, p.n * 0.006 + 0.5), label: '(b) \\$' })],
      hints: [hints[1]!, `The total repaid is $${p.n}$ times the repayment. The interest is the total repaid minus the amount borrowed.`],
      solution: [rateLine(p), step, `(a) The repayment is ${money(roundTo(x, 2))} each month.`, `(b) Total repaid $= ${p.n} \\times ${fmtFixed(x, 2)} = ${fmtFixed(total, 2)}$. Interest $= ${fmtFixed(total, 2)} - ${fmt(P)} \\approx ${fmt(Math.round(interest))}$, so about ${money(Math.round(interest))} is interest.`],
      calculator: true,
    };
  }
  return {
    prompt: `${setup} Find the repayment each ${p.each}, to the nearest cent.`,
    parts: [moneyPart(x)],
    hints,
    solution: [rateLine(p), step, `The repayment is ${money(roundTo(x, 2))} each ${p.each}.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 23.4 Shares and stocks
// ---------------------------------------------------------------------------

function shareDividend(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  if (d === 1) {
    const n = rng.int(2, 40) * 50;
    const v = rng.pick([0.5, 1, 2, 5, 10]);
    const div = rng.int(4, 15);
    const income = (n * v * div) / 100;
    return {
      prompt: `${name} owns $${fmt(n)}$ shares with a nominal value of ${money(v)} each. The company declares a dividend of $${div}\\%$ of the nominal value. Find ${name}’s dividend, to the nearest cent.`,
      parts: [moneyPart(income)],
      hints: ['A dividend is a share of the profit, paid on the nominal value of the shares, not on their market price.', `The nominal value of the holding is $${fmt(n)} \\times ${fmt(v)}$. Find $${div}\\%$ of it.`],
      solution: [`Nominal value $= ${fmt(n)} \\times ${fmt(v)} = ${fmt(n * v)}$`, `Dividend $= ${div}\\% \\times ${fmt(n * v)} = ${fmtFixed(income, 2)}$, so the dividend is ${money(income)}.`],
    };
  }
  if (d === 2) {
    const v = rng.pick([1, 2, 5]);
    const price = v * rng.pick([1.2, 1.25, 1.5, 1.6, 2, 2.5]);
    const n = rng.int(2, 30) * 100;
    const div = rng.int(4, 15);
    const income = (n * v * div) / 100;
    return {
      prompt: `${name} invests ${money(n * price)} in shares with a nominal value of ${money(v)} each. The market price is ${money(price)} a share. The company pays a dividend of $${div}\\%$ of the nominal value. Find (a) the number of shares ${name} buys and (b) the dividend, to the nearest cent.`,
      parts: [numPart(n, { label: '(a)', suffix: 'shares', exact: false }), moneyPart(income, '(b) \\$')],
      hints: ['Shares are bought at the market price, so divide the money invested by the market price.', 'The dividend is a percent of the nominal value of the shares, not of the money invested.'],
      solution: [`(a) Number of shares $= \\dfrac{${fmt(n * price)}}{${fmt(price)}} = ${fmt(n)}$`, `(b) Nominal value $= ${fmt(n)} \\times ${fmt(v)} = ${fmt(n * v)}$, and the dividend is $${div}\\% \\times ${fmt(n * v)} = ${fmtFixed(income, 2)}$, so ${money(income)}.`],
      calculator: true,
    };
  }
  // The price rises by more than the two fees take, so there is always a profit.
  const n = rng.int(2, 20) * 100;
  const buy = rng.int(20, 120) / 10;
  const sell = roundTo(buy + rng.int(8, 40) / 10, 2);
  const fee = rng.pick([0.5, 1, 1.5, 2]);
  const cost = n * buy * (1 + fee / 100);
  const proceeds = n * sell * (1 - fee / 100);
  return {
    prompt: `${name} buys $${fmt(n)}$ shares at ${money(buy)} each and later sells them all at ${money(sell)} each. The broker charges a fee of $${fmt(fee)}\\%$ of the value of the shares on each of the two deals. Find ${name}’s profit, to the nearest cent.`,
    parts: [moneyPart(proceeds - cost)],
    hints: [`When buying, the fee is added to the cost: multiply by $${fmt(1 + fee / 100)}$. When selling, it is taken off: multiply by $${fmt(1 - fee / 100)}$.`, 'Profit is what the sale brings in minus what the purchase cost.'],
    solution: [`Cost $= ${fmt(n)} \\times ${fmt(buy)} \\times ${fmt(1 + fee / 100)} = ${fmtFixed(cost, 2)}$`, `Money from the sale $= ${fmt(n)} \\times ${fmt(sell)} \\times ${fmt(1 - fee / 100)} = ${fmtFixed(proceeds, 2)}$`, `Profit $= ${fmtFixed(proceeds, 2)} - ${fmtFixed(cost, 2)} = ${fmtFixed(proceeds - cost, 2)}$, so the profit is ${money(roundTo(proceeds - cost, 2))}.`],
    calculator: true,
  };
}

function shareYield(rng: Rng, d: Difficulty): Out {
  const STOCK = 'A stock described as “$r\\%$ at $P$” pays \\$$r$ interest each year on every \\$100 of stock, and \\$100 of stock costs \\$$P$.';
  if (d === 1) {
    const v = rng.pick([1, 2, 5, 10]);
    const div = rng.int(4, 16);
    const price = retry(() => roundTo(v * rng.int(11, 30) / 10, 2), (x) => x !== v);
    const y = ((v * div) / 100 / price) * 100;
    return {
      prompt: `A share has a nominal value of ${money(v)} and a market price of ${money(price)}. The company pays a dividend of $${div}\\%$ of the nominal value. Find the yield, which is the dividend on one share as a percent of its market price, to 2 decimal places.`,
      parts: [pctPart(y)],
      hints: [`The dividend on one share is $${div}\\%$ of ${money(v)}.`, 'Divide the dividend by the market price and multiply by $100$.'],
      solution: [`Dividend on one share $= ${div}\\% \\times ${fmt(v)} = ${fmt((v * div) / 100)}$`, `Yield $= \\dfrac{${fmt((v * div) / 100)}}{${fmt(price)}} \\times 100\\% \\approx ${fmtFixed(y, 2)}\\%$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const r = rng.pick([3, 3.5, 4, 4.5, 5, 6, 7, 8]);
    const P = retry(() => rng.int(80, 125), (x) => x !== 100);
    const units = rng.int(5, 60);
    const name = rng.pick(NAMES);
    return {
      prompt: `${STOCK} ${name} invests ${money(units * P)} in a $${fmt(r)}\\%$ stock at $${P}$. Find ${name}’s income from the stock each year, to the nearest cent.`,
      parts: [moneyPart(units * r)],
      hints: [`Find how many \\$100 units of stock the money buys: divide by $${P}$.`, `Each \\$100 of stock pays \\$${fmt(r)} a year.`],
      solution: [`Units of \\$100 stock $= \\dfrac{${fmt(units * P)}}{${P}} = ${units}$`, `Income $= ${units} \\times ${fmt(r)} = ${fmtFixed(units * r, 2)}$, so ${money(units * r)} each year.`],
    };
  }
  const [rA, pA, rB, pB] = retry(
    () => [rng.pick([3, 4, 5, 6]), rng.int(80, 110), rng.pick([4.5, 5.5, 6.5, 7, 8]), rng.int(105, 135)] as [number, number, number, number],
    ([a, p, b, q]) => Math.abs((a / p - b / q) * 100) >= 0.05,
  );
  const yA = (rA / pA) * 100;
  const yB = (rB / pB) * 100;
  return {
    prompt: `${STOCK} Stock A is $${fmt(rA)}\\%$ at $${pA}$, and stock B is $${fmt(rB)}\\%$ at $${pB}$. Find the yield of each stock, which is its yearly income as a percent of its cost, to 2 decimal places, and say which stock gives the better return.`,
    parts: [pctPart(yA, 'Stock A'), pctPart(yB, 'Stock B'), { label: 'Better return', answer: mc(rng, yA > yB ? 'Stock A' : 'Stock B', [yA > yB ? 'Stock B' : 'Stock A']) }],
    hints: ['The yield is the income on \\$100 of stock divided by what \\$100 of stock costs, as a percent.', 'The stock with the higher yield gives more income for each dollar invested.'],
    solution: [`Stock A: $\\dfrac{${fmt(rA)}}{${pA}} \\times 100\\% \\approx ${fmtFixed(yA, 2)}\\%$`, `Stock B: $\\dfrac{${fmt(rB)}}{${pB}} \\times 100\\% \\approx ${fmtFixed(yB, 2)}\\%$`, `${yA > yB ? 'Stock A' : 'Stock B'} has the higher yield, so it gives the better return.`],
    calculator: true,
  };
}

export const FINANCE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-effective-rate', name: 'Effective interest rates', description: 'Find the effective annual rate from a nominal rate, and compare offers', outcomes: ['FN1'], lessonId: 'mx-23-1', calculator: true, gen: effectiveRate }),
  skill({ id: 'mx-nominal-convert', name: 'Nominal rates and compound growth', description: 'Find the nominal rate from an effective rate, and use nominal rates in compound interest', outcomes: ['FN1'], lessonId: 'mx-23-1', calculator: true, gen: nominalConvert }),
  skill({ id: 'mx-annuity-future', name: 'Future value of an annuity', description: 'Find what regular savings grow to', outcomes: ['FN2'], lessonId: 'mx-23-2', calculator: true, gen: annuityFuture }),
  skill({ id: 'mx-sinking-fund', name: 'Sinking funds', description: 'Find the regular payment that reaches a target amount', outcomes: ['FN2'], lessonId: 'mx-23-2', calculator: true, gen: sinkingFund }),
  skill({ id: 'mx-annuity-present', name: 'Present value of an annuity', description: 'Find the present value of regular payments, and the loan that repayments can support', outcomes: ['FN3'], lessonId: 'mx-23-3', calculator: true, gen: annuityPresent }),
  skill({ id: 'mx-loan-repayment', name: 'Loan repayments', description: 'Find the repayments on a loan and the interest paid', outcomes: ['FN3'], lessonId: 'mx-23-3', calculator: true, gen: loanRepayment }),
  skill({ id: 'mx-share-dividend', name: 'Shares and dividends', description: 'Find dividends, numbers of shares and the profit on a sale of shares', outcomes: ['FN4'], lessonId: 'mx-23-4', calculator: true, gen: shareDividend }),
  skill({ id: 'mx-share-yield', name: 'Yield on shares and stocks', description: 'Find the yield of shares and stocks, and the income from stock', outcomes: ['FN4'], lessonId: 'mx-23-4', calculator: true, gen: shareYield }),
];
