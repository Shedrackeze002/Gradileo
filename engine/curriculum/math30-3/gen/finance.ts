/** Math 30-3 Unit 8 — Vehicles and Small Business (N2, N3). Every rate, tax, fee and price is stated in the question. */
import { fixedChoice, mc, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';
import {
  CENT, NAMES, type Out, abt, cell, dec, isCents, isWhole, m2, money, moneyPart, mv, num, numT, onEdge, sub, tag, toCents, total,
} from './statistics.ts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const GST = 5;
const GST_NOTE = 'GST is 5% (for this question)';
const cents = (x: number) => Math.round(x * 100) / 100;
const mul = (a: number, b: number) => roundTo(a * b, 6);
/** Monthly payment for a loan of A over n months at r% a year, rounded to the cent. */
const payment = (A: number, r: number, n: number) => {
  const i = r / 1200;
  return cents((A * i) / (1 - (1 + i) ** -n));
};
/** "about " plus money, or exact money. */
const mny = (x: number) => `${abt(x)}${money(cents(x))}`;
const yearsText = (n: number) => (n % 12 === 0 ? `${n / 12} years` : `${n} months`);
const kmText = (x: number) => `${numT(x)} km`;
const profitPart = (p: number): Part[] => [
  part(fixedChoice(['Profit', 'Loss'], p >= 0 ? 0 : 1), { label: 'Profit or loss?' }),
  moneyPart(Math.abs(p), 'Amount: \\$'),
];

interface Vehicle { desc: string; lo: number; hi: number; step: number; l100: [number, number] }
const NEW_VEHICLES: Vehicle[] = [
  { desc: 'a new crew-cab pickup truck', lo: 52000, hi: 74000, step: 5, l100: [11.5, 14.5] },
  { desc: 'a new compact SUV', lo: 31000, hi: 42000, step: 5, l100: [7.8, 9.6] },
  { desc: 'a new hybrid hatchback', lo: 28000, hi: 36000, step: 5, l100: [4.6, 5.8] },
  { desc: 'a new minivan', lo: 40000, hi: 52000, step: 5, l100: [9.4, 11.2] },
  { desc: 'a new mid-size sedan', lo: 27000, hi: 35000, step: 5, l100: [6.8, 8.4] },
  { desc: 'a new cargo van', lo: 46000, hi: 58000, step: 5, l100: [12.0, 14.8] },
];
const USED_VEHICLES: Vehicle[] = [
  { desc: 'a used half-ton pickup truck', lo: 18000, hi: 34000, step: 100, l100: [12.0, 15.0] },
  { desc: 'a used compact car', lo: 8000, hi: 16000, step: 100, l100: [6.8, 8.6] },
  { desc: 'a used SUV', lo: 14000, hi: 28000, step: 100, l100: [9.0, 11.8] },
  { desc: 'a used work van', lo: 15000, hi: 26000, step: 100, l100: [12.5, 15.5] },
];
const DEALERS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills', 'Oakdale', 'Fernbrook'];
const priceOf = (rng: Rng, v: Vehicle) => {
  const p = rng.int(Math.ceil(v.lo / v.step), Math.floor(v.hi / v.step)) * v.step;
  return v.step === 5 && p % 1000 === 0 ? p - 5 : p;
};

// ---------------------------------------------------------------------------
// 8.1 Buying a vehicle — m303-vehicle-buy
// ---------------------------------------------------------------------------

function gstTotal(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const used = rng.chance(0.5);
  const v = rng.pick(used ? USED_VEHICLES : NEW_VEHICLES);
  const P = priceOf(rng, v);
  const G = cents((P * GST) / 100);
  const T = total([P, G]);
  return {
    prompt: `${name} is buying ${v.desc} in ${rng.pick(DEALERS)} for ${tag(P)}. ${GST_NOTE}. How much is the GST, and what is the total price? ${CENT}`,
    parts: [moneyPart(G, 'GST: \\$'), moneyPart(T, 'Total price: \\$')],
    hints: ['GST = 5% of the price. Write 5% as the decimal 0.05.', 'Total price = price + GST, or price × 1.05.'],
    solution: [
      `GST: $${mv(P)} \\times 0.05 = ${m2(G)}$`,
      `Total: $${mv(P)} + ${m2(G)} = ${m2(T)}$ (or $${mv(P)} \\times 1.05 = ${m2(T)}$)`,
      `The GST is ${money(G)} and the total price is ${money(T)}.`,
    ],
  };
}

function loanTotal(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const used = rng.chance(0.5);
  const v = rng.pick(used ? USED_VEHICLES : NEW_VEHICLES);
  const n = rng.pick(used ? [36, 48, 60] : [48, 60, 72]);
  const P = priceOf(rng, v);
  const D = Math.max(1000, Math.round((P * rng.pick([10, 15, 20, 25])) / 100 / 250) * 250);
  const M = payment(sub(cents(P * 1.05), D), rng.pick([4.99, 5.99, 6.49, 6.99, 7.99, 8.49]), n);
  const paid = cents(M * n);
  const T = total([D, paid]);
  return {
    prompt: `${name} bought ${v.desc} with a down payment of ${tag(D)} and a loan. The loan payments are ${money(M)} a month for ${n} months (${yearsText(n)}). What is the total amount ${name} pays for the vehicle? ${CENT}`,
    parts: [moneyPart(T, 'Total paid: \\$')],
    hints: ['Total of the loan payments = monthly payment × number of payments.', 'Then add the down payment.'],
    solution: [
      `Total of the payments: $${m2(M)} \\times ${n} = ${m2(paid)}$`,
      `Add the down payment: $${m2(paid)} + ${mv(D)} = ${m2(T)}$`,
      `${name} pays ${money(T)} in total.`,
    ],
  };
}

function fuelCost(rng: Rng, d: 1 | 2): Out {
  const name = rng.pick(NAMES);
  const v = rng.pick([...USED_VEHICLES, ...NEW_VEHICLES]);
  const o = retry(
    () => {
      const c = rng.int(Math.round(v.l100[0] * 10), Math.round(v.l100[1] * 10)) / 10;
      const km = d === 1 ? rng.int(8, 30) * 100 : rng.int(120, 450) * 10;
      const price = d === 1 ? rng.int(129, 169) / 100 : rng.int(1299, 1699) / 1000;
      const L = mul(km, c) / 100;
      const C = mul(L, price);
      return { c, km, price, L, C };
    },
    (x) => !onEdge(x.C),
    200,
  );
  const { c, km, price, L, C } = o;
  const priceText = d === 1 ? money(price) : `\\$${fmtFixed(price, 3)}`;
  const priceMath = d === 1 ? m2(price) : fmtFixed(price, 3);
  return {
    prompt: `${name} drives ${v.desc} that uses ${fmt(c)} L of fuel per 100 km. Last month ${name} drove ${kmText(km)}. Fuel cost ${priceText} per litre. How many litres of fuel did ${name} use, and what did the fuel cost? ${CENT}`,
    parts: [numPart(L, { label: 'Fuel used:', suffix: 'L', display: 'decimal' }), moneyPart(C, 'Fuel cost: \\$')],
    hints: [
      `${fmt(c)} L per 100 km means: litres = (distance ÷ 100) × ${fmt(c)}.`,
      'Fuel cost = litres × price per litre.',
    ],
    solution: [
      `Hundreds of kilometres: $${num(km)} \\div 100 = ${num(km / 100)}$`,
      `Fuel used: $${num(km / 100)} \\times ${fmt(c)} = ${num(L)}\\ \\text{L}$`,
      `Fuel cost: $${num(L)} \\times ${priceMath} ${toCents(C)}$`,
      `${name} used ${numT(L)} L of fuel, which cost ${mny(C)}.`,
    ],
  };
}

function financeCharge(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const used = rng.chance(0.5);
  const v = rng.pick(used ? USED_VEHICLES : NEW_VEHICLES);
  const P = priceOf(rng, v);
  const fee = rng.pick([0, 0, 299, 399, 499, 599]);
  const sub0 = P + fee;
  const T = cents(sub0 * 1.05);
  const D = Math.round((T * rng.pick([10, 15, 20, 25])) / 100 / 500) * 500 || 1000;
  const A = sub(T, D);
  const n = rng.pick(used ? [36, 48, 60] : [48, 60, 72, 84]);
  const r = rng.pick([4.99, 5.49, 6.29, 6.99, 7.49, 7.99, 8.49, 8.99]);
  const M = payment(A, r, n);
  const paid = cents(M * n);
  const FC = sub(paid, A);
  return {
    prompt: `${name} is buying ${v.desc} in ${rng.pick(DEALERS)}. The price is ${tag(P)}${fee ? ` plus a ${tag(fee)} documentation fee` : ''}, and GST of 5% (for this question) is charged on ${fee ? 'the price and the fee' : 'the price'}. ${name} makes a down payment of ${tag(D)} and finances the rest with a loan at ${fmt(r)}% a year. The loan payments are ${money(M)} a month for ${n} months. Find the total price with GST, the amount financed, the total of the loan payments, and the finance charge (the interest paid). ${CENT}`,
    parts: [moneyPart(T, 'Total price with GST: \\$'), moneyPart(A, 'Amount financed: \\$'), moneyPart(paid, 'Total of the payments: \\$'), moneyPart(FC, 'Finance charge: \\$')],
    hints: [
      `Total price = ${fee ? '(price + fee)' : 'price'} × 1.05. Amount financed = total price − down payment.`,
      'Total of the payments = monthly payment × number of months. Finance charge = total of the payments − amount financed.',
    ],
    solution: [
      `Total price with GST: $${fee ? `(${mv(P)} + ${mv(fee)}) \\times 1.05 = ${mv(sub0)} \\times 1.05` : `${mv(P)} \\times 1.05`} = ${m2(T)}$`,
      `Amount financed: $${m2(T)} - ${mv(D)} = ${m2(A)}$`,
      `Total of the payments: $${m2(M)} \\times ${n} = ${m2(paid)}$`,
      `Finance charge: $${m2(paid)} - ${m2(A)} = ${m2(FC)}$`,
      `The total price is ${money(T)}, ${name} finances ${money(A)}, the payments total ${money(paid)}, and the finance charge is ${money(FC)}.`,
    ],
  };
}

function depreciation(rng: Rng, d: 2 | 3): Out {
  const name = rng.pick(NAMES);
  const v = rng.pick(NEW_VEHICLES);
  const o = retry(
    () => {
      const P = priceOf(rng, v);
      const r = rng.pick([12, 14, 15, 16, 18, 20, 22, 25]);
      const t = d === 2 ? rng.int(1, 2) : rng.int(3, 5);
      const V = P * (1 - r / 100) ** t;
      return { P, r, t, V };
    },
    (x) => !onEdge(x.V),
    200,
  );
  const { P, r, t, V } = o;
  const keep = fmt(1 - r / 100, 4);
  const lost = cents(P - cents(V));
  const rows: string[] = [];
  let val = P;
  for (let y = 1; y <= Math.min(t, 3); y++) {
    const nv = val * (1 - r / 100);
    rows.push(`After year ${y}: $${y === 1 ? mv(P) : num(val, 4)} \\times ${keep} ${y === t ? toCents(nv) : `= ${num(nv, 4)}`}$`);
    val = nv;
  }
  return {
    prompt: `${name} bought ${v.desc} for ${tag(P)} (before tax). Suppose the vehicle loses ${r}% of its value each year, so at the end of each year it is worth ${100 - r}% of what it was worth at the start of that year. What will it be worth after ${t} year${t > 1 ? 's' : ''}, and how much value will it have lost? ${CENT}`,
    parts: [moneyPart(V, `Value after ${t} year${t > 1 ? 's' : ''}: \\$`), moneyPart(lost, 'Value lost: \\$')],
    hints: [
      `Losing ${r}% each year means keeping ${100 - r}%, so multiply by ${keep} once for each year.`,
      `Value after ${t} year${t > 1 ? 's' : ''} $= ${mv(P)} \\times ${keep}${t > 1 ? `^{${t}}` : ''}$. Value lost = price − value.`,
    ],
    solution: [
      `Each year the value is multiplied by $1 - ${dec(r)} = ${keep}$.`,
      ...(t > 3 ? [`Or in one step: $${mv(P)} \\times ${keep}^{${t}} ${toCents(V)}$`] : t > 1 ? [...rows] : [`$${mv(P)} \\times ${keep} ${toCents(V)}$`]),
      `Value lost: $${mv(P)} - ${m2(cents(V))} = ${m2(lost)}$`,
      `After ${t} year${t > 1 ? 's' : ''} the vehicle is worth ${mny(V)}, so it has lost ${money(lost)} in value.`,
    ],
  };
}

function operatingCost(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const v = rng.pick([...USED_VEHICLES, ...NEW_VEHICLES]);
  const o = retry(
    () => {
      const km = rng.int(12, 32) * 1000;
      const c = rng.int(Math.round(v.l100[0] * 10), Math.round(v.l100[1] * 10)) / 10;
      const price = rng.int(129, 169) / 100;
      const ins = rng.int(110, 260);
      const maint = rng.int(6, 20) * 50;
      const reg = rng.pick([88, 93, 98, 105]);
      const fuel = mul(mul(km / 100, c), price);
      return { km, c, price, ins, maint, reg, fuel };
    },
    (x) => !onEdge(x.fuel),
    200,
  );
  const { km, c, price, ins, maint, reg, fuel } = o;
  const L = mul(km / 100, c);
  const fuelR = cents(fuel);
  const insY = ins * 12;
  const T = total([fuelR, insY, maint, reg]);
  const perMonth = T / 12;
  return {
    prompt: `${name} drives ${v.desc} about ${kmText(km)} a year. Use these costs: fuel at ${money(price)} per litre, with the vehicle using ${fmt(c)} L per 100 km; insurance of ${tag(ins)} a month; maintenance and repairs of about ${tag(maint)} a year; and registration of ${tag(reg)} a year. Find the yearly fuel cost, the total yearly operating cost, and the average operating cost per month. ${CENT}`,
    parts: [moneyPart(fuel, 'Fuel per year: \\$'), moneyPart(T, 'Operating cost per year: \\$'), moneyPart(perMonth, 'Per month: \\$')],
    hints: [
      `Fuel: (${numT(km)} ÷ 100) × ${fmt(c)} gives the litres; multiply by the price per litre. Insurance per year = monthly amount × 12.`,
      'Add fuel, insurance, maintenance and registration for the year, then divide by 12 for a month.',
    ],
    solution: [
      `Fuel used: $${num(km / 100)} \\times ${fmt(c)} = ${num(L)}\\ \\text{L}$; fuel cost: $${num(L)} \\times ${m2(price)} ${toCents(fuel)}$`,
      `Insurance per year: $${mv(ins)} \\times 12 = ${mv(insY)}$`,
      `Total per year: $${m2(fuelR)} + ${mv(insY)} + ${mv(maint)} + ${mv(reg)} = ${m2(T)}$`,
      `Per month: $${m2(T)} \\div 12 ${toCents(perMonth)}$`,
      `Fuel costs ${money(fuelR)} a year, the operating cost is ${money(T)} a year, or ${mny(perMonth)} a month.`,
    ],
  };
}

function ownershipCost(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const v = rng.pick(NEW_VEHICLES);
  const o = retry(
    () => {
      const P = priceOf(rng, v);
      const T = cents(P * 1.05);
      const D = rng.int(4, 12) * 1000;
      const n = 48;
      const r = rng.pick([5.49, 5.99, 6.49, 6.99, 7.49]);
      const M = payment(sub(T, D), r, n);
      const ins = rng.int(130, 240);
      const fuelY = rng.int(18, 42) * 100;
      const maintY = rng.int(4, 12) * 100;
      const dep = rng.pick([15, 16, 18, 20]);
      const V = P * (1 - dep / 100) ** 4;
      return { P, T, D, n, r, M, ins, fuelY, maintY, dep, V };
    },
    (x) => !onEdge(x.V),
    200,
  );
  const { P, T, D, n, M, ins, fuelY, maintY, dep, V } = o;
  const pay = cents(M * n);
  const insT = ins * n;
  const fuelT = fuelY * 4;
  const maintT = maintY * 4;
  const spent = total([D, pay, insT, fuelT, maintT]);
  const Vr = cents(V);
  const net = sub(spent, Vr);
  return {
    prompt: `${name} buys ${v.desc} priced at ${tag(P)}. ${GST_NOTE}, so the total price is ${money(T)}. ${name} pays ${tag(D)} down and ${money(M)} a month for ${n} months. Insurance is ${tag(ins)} a month, fuel is about ${tag(fuelY)} a year and maintenance is about ${tag(maintY)} a year. Suppose the vehicle loses ${dep}% of its value each year (based on the ${tag(P)} price before tax). Find the total amount ${name} spends over the 4 years, the vehicle’s value after 4 years, and the net cost of owning it for 4 years if ${name} then sells it for that value. ${CENT}`,
    parts: [moneyPart(spent, 'Total spent over 4 years: \\$'), moneyPart(V, 'Value after 4 years: \\$'), moneyPart(net, 'Net cost of owning: \\$')],
    hints: [
      'Total spent = down payment + all the loan payments + insurance for 48 months + 4 years of fuel and maintenance.',
      `Value after 4 years $= ${mv(P)} \\times ${fmt(1 - dep / 100, 2)}^4$. Net cost = total spent − value.`,
    ],
    solution: [
      `Loan payments: $${m2(M)} \\times ${n} = ${m2(pay)}$`,
      `Insurance: $${mv(ins)} \\times ${n} = ${mv(insT)}$. Fuel: $${mv(fuelY)} \\times 4 = ${mv(fuelT)}$. Maintenance: $${mv(maintY)} \\times 4 = ${mv(maintT)}$.`,
      `Total spent: $${mv(D)} + ${m2(pay)} + ${mv(insT)} + ${mv(fuelT)} + ${mv(maintT)} = ${m2(spent)}$`,
      `Value after 4 years: $${mv(P)} \\times ${fmt(1 - dep / 100, 2)}^4 ${toCents(V)}$`,
      `Net cost: $${m2(spent)} - ${m2(Vr)} = ${m2(net)}$`,
      `${name} spends ${money(spent)}, the vehicle is then worth ${mny(V)}, and the net cost of owning it for 4 years is ${money(net)}.`,
    ],
  };
}

function affordCheck(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const job = rng.pick(['an apprentice welder', 'a heavy equipment operator', 'a licensed practical nurse', 'a carpenter', 'a parts technician', 'an early childhood educator']);
  const o = retry(
    () => {
      const net = rng.int(40, 72) * 100;
      const rule = rng.pick([18, 20, 22, 25]);
      const ins = rng.int(120, 240);
      const km = rng.int(10, 24) * 100;
      const c = rng.int(105, 150) / 10;
      const price = rng.int(129, 169) / 100;
      const fuel = mul(mul(km / 100, c), price);
      const maintY = rng.int(6, 15) * 100;
      const limit = (net * rule) / 100;
      const M = Math.max(250, Math.round(limit - ins - fuel - maintY / 12 + rng.int(-180, 180))) + rng.pick([0.15, 0.49, 0.8, 0.99, 0.32]);
      const cost = M + ins + fuel + maintY / 12;
      return { net, rule, M, ins, km, c, price, fuel, maintY, cost, limit };
    },
    (x) => !onEdge(x.fuel) && !onEdge(x.maintY / 12) && Math.abs(x.cost - x.limit) > 25,
    300,
  );
  const { net, rule, M, ins, km, c, price, fuel, maintY, limit } = o;
  const fuelR = cents(fuel);
  const mR = cents(maintY / 12);
  const cost = total([M, ins, fuelR, mR]);
  const ok = cost <= limit;
  return {
    prompt: `${name} works as ${job} in ${rng.pick(DEALERS)} and takes home ${tag(net)} a month. ${name} wants to keep all vehicle costs to at most ${rule}% of take-home pay. A truck ${name} likes would cost ${money(M)} a month in loan payments and ${tag(ins)} a month for insurance. ${name} would drive about ${kmText(km)} a month, the truck uses ${fmt(c)} L per 100 km, and fuel costs ${money(price)} per litre. Maintenance would be about ${tag(maintY)} a year. Find the monthly cost of owning the truck (round the fuel and the maintenance to the cent first). Can ${name} afford it under the ${rule}% rule? ${CENT}`,
    parts: [moneyPart(cost, 'Monthly cost: \\$'), moneyPart(limit, `${rule}% of take-home pay: \\$`), part(mc(rng, ok ? `Yes, because the monthly cost is less than ${money(limit)}.` : `No, because the monthly cost is more than ${money(limit)}.`, [
      ok ? `No, because the monthly cost is more than ${money(limit)}.` : `Yes, because the monthly cost is less than ${money(limit)}.`,
      ok ? 'No, because the loan payment alone is more than the limit.' : 'Yes, because the loan payment alone is less than the limit.',
      'Yes, because fuel and maintenance do not count as vehicle costs.',
    ]), { label: 'Affordable?' })],
    hints: [
      `Fuel per month: (${numT(km)} ÷ 100) × ${fmt(c)} × ${money(price)}. Maintenance per month: ${tag(maintY)} ÷ 12.`,
      `Add the loan payment, insurance, fuel and maintenance, then compare with ${rule}% of ${tag(net)}.`,
    ],
    solution: [
      `Fuel: $${num(km / 100)} \\times ${fmt(c)} \\times ${m2(price)} ${toCents(fuel)}$`,
      `Maintenance: $${mv(maintY)} \\div 12 ${toCents(maintY / 12)}$`,
      `Monthly cost: $${m2(M)} + ${mv(ins)} + ${m2(fuelR)} + ${m2(mR)} = ${m2(cost)}$`,
      `Limit: $${mv(net)} \\times ${dec(rule)} = ${m2(limit)}$`,
      `The truck costs ${money(cost)} a month, which is ${ok ? 'less' : 'more'} than the limit of ${money(limit)}, so ${ok ? `${name} can afford it` : `${name} cannot afford it`} under the ${rule}% rule.`,
    ],
  };
}

const vehicleBuy = skill({
  id: 'm303-vehicle-buy',
  name: 'Buying a vehicle',
  description: 'Find the total cost of buying a vehicle: GST, down payments, loan payments and finance charges, depreciation, and the costs of fuel, insurance and maintenance.',
  outcomes: ['N2'],
  lessonId: 'm303-8-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const r = rng.int(0, 2);
      return r === 0 ? gstTotal(rng) : r === 1 ? loanTotal(rng) : fuelCost(rng, 1);
    }
    if (d === 2) {
      const r = rng.int(0, 3);
      return r === 0 ? financeCharge(rng) : r === 1 ? depreciation(rng, 2) : r === 2 ? operatingCost(rng) : fuelCost(rng, 2);
    }
    const r = rng.int(0, 2);
    return r === 0 ? ownershipCost(rng) : r === 1 ? affordCheck(rng) : depreciation(rng, 3);
  },
});

// ---------------------------------------------------------------------------
// 8.2 Leasing and leasing to buy — m303-vehicle-lease
// ---------------------------------------------------------------------------

interface Lease { name: string; v: Vehicle; town: string; n: number; M: number; D: number; fee: number }
function makeLease(rng: Rng): Lease {
  const v = rng.pick(NEW_VEHICLES);
  const n = rng.pick([24, 36, 48, 60]);
  const M = rng.int(Math.round(v.lo / 140), Math.round(v.lo / 75)) + rng.pick([0.0, 0.5, 0.99, 0.49, 0.25, 0.75, 0.36]);
  const D = rng.int(0, 10) * 500;
  const fee = rng.pick([0, 395, 495, 595, 650, 795]);
  return { name: rng.pick(NAMES), v, town: rng.pick(DEALERS), n, M, D, fee };
}

function leaseTotal(rng: Rng): Out {
  const L = makeLease(rng);
  const pay = cents(L.M * L.n);
  const T = total([pay, L.D, L.fee]);
  const extras = [L.D ? `a down payment of ${tag(L.D)}` : '', L.fee ? `an acquisition fee of ${tag(L.fee)}` : ''].filter(Boolean);
  return {
    prompt: `${L.name} leases ${L.v.desc} from a dealer in ${L.town} for ${money(L.M)} a month for ${L.n} months (${yearsText(L.n)}). The payments include GST. ${extras.length ? `${L.name} also pays ${extras.join(' and ')} at the start. ` : 'There is no down payment and no fee. '}What is the total cost of the lease? ${CENT}`,
    parts: [moneyPart(T, 'Total lease cost: \\$')],
    hints: ['Total of the lease payments = monthly payment × number of months.', extras.length ? 'Add the amounts paid at the start.' : 'With no other costs, the total is just the payments.'],
    solution: [
      `Lease payments: $${m2(L.M)} \\times ${L.n} = ${m2(pay)}$`,
      ...(extras.length ? [`Add ${extras.length > 1 ? 'the down payment and the fee' : L.D ? 'the down payment' : 'the fee'}: $${[m2(pay), ...(L.D ? [mv(L.D)] : []), ...(L.fee ? [mv(L.fee)] : [])].join(' + ')} = ${m2(T)}$`] : []),
      `The lease costs ${money(T)} in total, and at the end ${L.name} returns the vehicle.`,
    ],
  };
}

function excessKm(rng: Rng, d: 1 | 2): Out {
  const L = makeLease(rng);
  const yrs = L.n / 12;
  const allowY = rng.pick([16000, 18000, 20000, 24000]);
  const allow = allowY * yrs;
  const rate = rng.pick([0.08, 0.1, 0.12, 0.15, 0.16, 0.18, 0.2, 0.25]);
  const over = rng.int(15, 140) * 100;
  const driven = allow + over;
  const charge = cents(mul(over, rate));
  if (d === 1) {
    return {
      prompt: `${L.name} has a ${yrs}-year lease on ${L.v.desc} that allows ${kmText(allowY)} a year. Every kilometre over the allowance costs ${money(rate)} at the end of the lease. When ${L.name} returns the vehicle, the odometer shows ${kmText(driven)}. How many kilometres over the allowance did ${L.name} drive, and what is the excess kilometre charge? ${CENT}`,
      parts: [numPart(over, { label: 'Kilometres over:', suffix: 'km' }), moneyPart(charge, 'Excess charge: \\$')],
      hints: [`The allowance for the whole lease is ${numT(allowY)} km × ${yrs}.`, `Kilometres over = odometer − allowance. Charge = kilometres over × ${money(rate)}.`],
      solution: [
        `Allowance: $${num(allowY)} \\times ${yrs} = ${num(allow)}\\ \\text{km}$`,
        `Over: $${num(driven)} - ${num(allow)} = ${num(over)}\\ \\text{km}$`,
        `Charge: $${num(over)} \\times ${m2(rate)} = ${m2(charge)}$`,
        `${L.name} drove ${kmText(over)} over the allowance, so the excess kilometre charge is ${money(charge)}.`,
      ],
    };
  }
  const disp = rng.pick([0, 350, 395, 495]);
  const pay = cents(L.M * L.n);
  const T = total([pay, L.D, L.fee, charge, disp]);
  const start = [L.D ? `${tag(L.D)} down` : '', L.fee ? `a ${tag(L.fee)} acquisition fee` : ''].filter(Boolean);
  const parts = [m2(pay), ...(L.D ? [mv(L.D)] : []), ...(L.fee ? [mv(L.fee)] : []), m2(charge), ...(disp ? [mv(disp)] : [])];
  return {
    prompt: `${L.name} leases ${L.v.desc} for ${money(L.M)} a month for ${L.n} months, payments including GST${start.length ? `, with ${start.join(' and ')}` : ', with nothing down'}. The lease allows ${kmText(allowY)} a year and charges ${money(rate)} for each kilometre over.${disp ? ` There is a ${tag(disp)} fee when the vehicle is returned.` : ''} At the end of the lease the odometer shows ${kmText(driven)}. What is the excess kilometre charge, and what is the total cost of the lease? ${CENT}`,
    parts: [moneyPart(charge, 'Excess charge: \\$'), moneyPart(T, 'Total lease cost: \\$')],
    hints: [`Allowance = ${numT(allowY)} × ${yrs} km. Charge = (odometer − allowance) × ${money(rate)}.`, 'Total = all the monthly payments + every amount paid at the start and the end.'],
    solution: [
      `Allowance: $${num(allowY)} \\times ${yrs} = ${num(allow)}$ km, so the vehicle went $${num(driven)} - ${num(allow)} = ${num(over)}$ km over.`,
      `Excess charge: $${num(over)} \\times ${m2(rate)} = ${m2(charge)}$`,
      `Lease payments: $${m2(L.M)} \\times ${L.n} = ${m2(pay)}$`,
      `Total: $${parts.join(' + ')} = ${m2(T)}$`,
      `The excess kilometre charge is ${money(charge)} and the lease costs ${money(T)} in total.`,
    ],
  };
}

function leaseToBuy(rng: Rng, d: 2 | 3): Out {
  const L = makeLease(rng);
  const P = priceOf(rng, L.v);
  const resPct = L.n === 24 ? rng.int(58, 66) : L.n === 36 ? rng.int(48, 58) : L.n === 48 ? rng.int(38, 48) : rng.int(30, 38);
  const res = Math.round((P * resPct) / 100 / 5) * 5;
  // A payment that matches the price: depreciation share plus a finance fee, with GST.
  const rate = rng.pick([3.99, 4.49, 4.99, 5.49, 5.99, 6.49]);
  const cap = P - L.D;
  L.M = cents(((cap - res) / L.n + ((cap + res) * rate) / 2400) * 1.05);
  const resT = cents(res * 1.05);
  const pay = cents(L.M * L.n);
  const lease = total([pay, L.D, L.fee]);
  const own = total([lease, resT]);
  const buyT = cents(P * 1.05);
  const diff = sub(own, buyT);
  const parts: Part[] = [moneyPart(lease, 'Total lease cost: \\$'), moneyPart(own, 'Total cost to own: \\$')];
  if (d === 3) {
    parts.push(moneyPart(Math.abs(diff), `Difference: \\$`));
  }
  const start = [L.D ? `${tag(L.D)} down` : '', L.fee ? `a ${tag(L.fee)} acquisition fee` : ''].filter(Boolean);
  return {
    prompt: `${L.name} leases ${L.v.desc} for ${money(L.M)} a month for ${L.n} months, payments including GST${start.length ? `, with ${start.join(' and ')} at the start` : ', with nothing down'}. At the end of the lease, ${L.name} can buy the vehicle for its residual value (buyout price) of ${tag(res)} plus 5% GST. Find the total cost of the lease, and the total cost to own the vehicle if ${L.name} buys it at the end.${d === 3 ? ` The vehicle’s price at the start was ${tag(P)} plus 5% GST. How much more does leasing to buy cost than paying cash at the start?` : ''} ${CENT}`,
    parts,
    hints: [
      'Total lease cost = monthly payment × months + the amounts paid at the start.',
      `Buyout with GST = ${tag(res)} × 1.05. Total cost to own = total lease cost + buyout with GST.${d === 3 ? ' Compare it with the cash price × 1.05.' : ''}`,
    ],
    solution: [
      `Lease payments: $${m2(L.M)} \\times ${L.n} = ${m2(pay)}$`,
      `Total lease cost: $${[m2(pay), ...(L.D ? [mv(L.D)] : []), ...(L.fee ? [mv(L.fee)] : [])].join(' + ')} = ${m2(lease)}$`,
      `Buyout with GST: $${mv(res)} \\times 1.05 = ${m2(resT)}$`,
      `Total cost to own: $${m2(lease)} + ${m2(resT)} = ${m2(own)}$`,
      ...(d === 3
        ? [`Cash price with GST: $${mv(P)} \\times 1.05 = ${m2(buyT)}$`, `Difference: $${m2(own)} - ${m2(buyT)} = ${m2(diff)}$`]
        : []),
      d === 3
        ? `The lease costs ${money(lease)}, owning the vehicle this way costs ${money(own)}, which is ${money(Math.abs(diff))} ${diff >= 0 ? 'more' : 'less'} than paying cash at the start.`
        : `The lease costs ${money(lease)}, and the total cost to own the vehicle is ${money(own)}.`,
    ],
  };
}

interface Scenario { who: (name: string) => string; best: 'buy' | 'lease'; reason: string; wrong: string[] }
const SCENARIOS: Scenario[] = [
  {
    who: (name) => `${name} is a pipeline inspector based in a northern town who drives about 45,000 km a year on gravel lease roads, and plans to keep the next truck for 8 to 10 years.`,
    best: 'buy', reason: 'Buy: a lease would charge for every kilometre over the allowance and for wear and tear, and owning is cheaper when you keep a vehicle a long time.',
    wrong: ['Lease: the monthly payments are lower, so it is always cheaper.', 'Lease: a lease has no limit on kilometres.', 'Buy: buying always has lower monthly payments than leasing.'],
  },
  {
    who: (name) => `${name} is a sales representative in a large city who drives about 15,000 km a year in the city, wants low monthly payments, and likes to have a new vehicle under warranty every three years.`,
    best: 'lease', reason: 'Lease: the payments are lower, the vehicle stays under warranty, and the kilometres fit easily inside a normal allowance.',
    wrong: ['Buy: a lease would charge for going over the kilometre allowance.', 'Buy: leasing means paying GST twice.', 'Lease: at the end of a lease you own the vehicle for free.'],
  },
  {
    who: (name) => `${name} runs a mixed farm, will haul a stock trailer, and wants to add a flat deck and a toolbox to the truck.`,
    best: 'buy', reason: 'Buy: a leased vehicle must be returned in good condition with no changes, and heavy farm use can bring wear-and-tear charges.',
    wrong: ['Lease: leasing lets you change the vehicle any way you like.', 'Lease: the lease payments would be lower, which is all that matters.', 'Buy: buying means there are no costs after the loan is paid off.'],
  },
  {
    who: (name) => `${name} has just started a real estate business in a mid-sized city, has little cash for a down payment, drives about 18,000 km a year, and wants a newer vehicle to drive clients around.`,
    best: 'lease', reason: 'Lease: it needs little or no down payment and has lower monthly payments, and the kilometres fit a normal lease allowance.',
    wrong: ['Buy: a loan never needs a down payment.', 'Buy: buying builds no equity, so leasing is worse.', 'Lease: the total cost of leasing is always less than buying.'],
  },
];

function buyOrLease(rng: Rng): Out {
  const s = rng.pick(SCENARIOS);
  const name = rng.pick(NAMES);
  return {
    prompt: `${s.who(name)} Should ${name} buy or lease the next vehicle? Choose the best answer and reason.`,
    parts: [part(mc(rng, s.reason, s.wrong))],
    hints: ['A lease has a kilometre allowance, charges for extra wear, and does not let you change the vehicle. You do not own it at the end.', 'Buying usually costs more each month, but you own the vehicle and can drive and change it as you like.'],
    solution: [
      'Leasing: lower payments and little down, a new vehicle often under warranty, but kilometre limits, wear-and-tear charges, and nothing owned at the end.',
      'Buying: higher payments, but no kilometre limits, you can modify the vehicle, and it keeps some value you own.',
      s.reason,
    ],
  };
}

function buyVsLease(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const v = rng.pick(NEW_VEHICLES);
  const o = retry(
    () => {
      const P = priceOf(rng, v);
      const T = cents(P * 1.05);
      const n = rng.pick([36, 48]);
      const Db = rng.int(4, 10) * 1000;
      const r = rng.pick([5.99, 6.49, 6.99, 7.49]);
      const Mb = payment(sub(T, Db), r, n);
      const Ml = cents(Mb * rng.int(55, 72) / 100) + rng.pick([0, 0.5]);
      const Dl = rng.int(0, 6) * 500;
      const fee = rng.pick([395, 495, 595]);
      const dep = rng.pick([15, 16, 18, 20]);
      const V = P * (1 - dep / 100) ** (n / 12);
      return { P, T, n, Db, Mb, Ml, Dl, fee, dep, V };
    },
    (x) => !onEdge(x.V),
    200,
  );
  const { P, T, n, Db, Mb, Ml, Dl, fee, dep, V } = o;
  const yrs = n / 12;
  const payB = cents(Mb * n);
  const buyNet = sub(total([Db, payB]), cents(V));
  const payL = cents(Ml * n);
  const leaseT = total([payL, Dl, fee]);
  const cheaper = buyNet < leaseT ? 'buying' : 'leasing';
  return {
    prompt: `${name} is comparing two ways to get ${v.desc} priced at ${tag(P)} (${money(T)} with 5% GST) for ${yrs} years.\n\n**Buy:** ${tag(Db)} down and loan payments of ${money(Mb)} a month for ${n} months. Suppose the vehicle loses ${dep}% of its value each year (based on the ${tag(P)} price), and ${name} could sell it for that value at the end.\n\n**Lease:** ${Dl ? `${tag(Dl)} down, ` : 'nothing down, '}a ${tag(fee)} fee, and ${money(Ml)} a month for ${n} months (payments include GST), then return the vehicle.\n\nFind the net cost of buying (total paid minus the value of the vehicle after ${yrs} years) and the total cost of leasing. Which option costs less over the ${yrs} years? ${CENT}`,
    parts: [
      moneyPart(buyNet, 'Net cost of buying: \\$'),
      moneyPart(leaseT, 'Cost of leasing: \\$'),
      part(mc(rng, cheaper === 'buying' ? 'Buying, because its net cost is lower once the value of the vehicle is counted.' : 'Leasing, because its total cost is lower than the net cost of buying.', [
        cheaper === 'buying' ? 'Leasing, because its monthly payment is lower.' : 'Buying, because you own the vehicle at the end.',
        cheaper === 'buying' ? 'Leasing, because there is less money down.' : 'Buying, because its monthly payment is higher.',
        'They cost exactly the same over the term.',
      ]), { label: 'Costs less:' }),
    ],
    hints: [
      `Buying: down payment + payments × ${n}, minus the value after ${yrs} years, $${mv(P)} \\times ${fmt(1 - dep / 100, 2)}^{${yrs}}$.`,
      `Leasing: down payment + fee + payments × ${n}. Compare the two totals, not the monthly payments.`,
    ],
    solution: [
      `Buy, total paid: $${mv(Db)} + ${m2(Mb)} \\times ${n} = ${mv(Db)} + ${m2(payB)} = ${m2(total([Db, payB]))}$`,
      `Value after ${yrs} years: $${mv(P)} \\times ${fmt(1 - dep / 100, 2)}^{${yrs}} ${toCents(V)}$`,
      `Net cost of buying: $${m2(total([Db, payB]))} - ${m2(cents(V))} = ${m2(buyNet)}$`,
      `Lease: $${Dl ? `${mv(Dl)} + ` : ''}${mv(fee)} + ${m2(Ml)} \\times ${n} = ${Dl ? `${mv(Dl)} + ` : ''}${mv(fee)} + ${m2(payL)} = ${m2(leaseT)}$`,
      `Buying has a net cost of ${money(buyNet)} and leasing costs ${money(leaseT)}, so ${cheaper} costs less over the ${yrs} years, by ${money(Math.abs(sub(buyNet, leaseT)))}.`,
    ],
  };
}

const vehicleLease = skill({
  id: 'm303-vehicle-lease',
  name: 'Leasing and leasing to buy',
  description: 'Find the total cost of a lease, excess kilometre charges, the cost to own with a lease-to-buy, and compare buying with leasing.',
  outcomes: ['N2'],
  lessonId: 'm303-8-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? leaseTotal(rng) : excessKm(rng, 1);
    if (d === 2) {
      const r = rng.int(0, 2);
      return r === 0 ? leaseToBuy(rng, 2) : r === 1 ? excessKm(rng, 2) : buyOrLease(rng);
    }
    return rng.chance(0.5) ? buyVsLease(rng) : leaseToBuy(rng, 3);
  },
});

// ---------------------------------------------------------------------------
// 8.3 Small business — m303-business-profit and m303-business-breakeven
// ---------------------------------------------------------------------------

interface Biz {
  owner: (name: string) => string;
  unit: string;
  units: string;
  /** Selling price range (dollars) and variable cost range per unit. */
  price: [number, number];
  pStep: number;
  vc: [number, number];
  /** Monthly (or seasonal) fixed costs, with ranges. */
  fixed: Array<{ label: string; lo: number; hi: number }>;
  variable: string;
  period: string;
  q: [number, number];
  /** A variable cost and three fixed costs, for classifying. */
  classify: { variable: string[]; fixed: string[] };
}

const BIZ: Biz[] = [
  {
    owner: (name) => `${name} runs a food truck downtown that sells loaded perogy bowls`,
    unit: 'bowl', units: 'bowls', price: [11, 16], pStep: 0.5, vc: [3.2, 5.4], period: 'month', q: [900, 2600],
    fixed: [{ label: 'Truck loan payment', lo: 900, hi: 1600 }, { label: 'Insurance', lo: 180, hi: 320 }, { label: 'Commissary kitchen rent', lo: 600, hi: 1100 }, { label: 'Permits and licences', lo: 80, hi: 200 }, { label: 'Propane', lo: 150, hi: 300 }],
    variable: 'ingredients and packaging',
    classify: { variable: ['Ingredients for each bowl', 'Take-out containers', 'Napkins and forks'], fixed: ['The monthly truck loan payment', 'Insurance for the truck', 'The city business licence', 'Rent for the commissary kitchen'] },
  },
  {
    owner: (name) => `${name} runs a lawn care business`,
    unit: 'lawn cut', units: 'lawn cuts', price: [40, 65], pStep: 5, vc: [6, 11], period: 'month', q: [90, 260],
    fixed: [{ label: 'Trailer and mower loan payment', lo: 350, hi: 650 }, { label: 'Liability insurance', lo: 90, hi: 180 }, { label: 'Truck payment', lo: 450, hi: 750 }, { label: 'Advertising', lo: 60, hi: 200 }, { label: 'Phone', lo: 55, hi: 95 }],
    variable: 'fuel and trimmer line',
    classify: { variable: ['Gas for the mowers', 'Trimmer line', 'Garbage bags for clippings'], fixed: ['The monthly loan payment on the mower', 'Liability insurance', 'The phone plan', 'Advertising in the local paper'] },
  },
  {
    owner: (name) => `${name} sells handmade beeswax candles at a weekend farmers’ market`,
    unit: 'candle', units: 'candles', price: [14, 28], pStep: 1, vc: [3.5, 7.5], period: 'season', q: [400, 1400],
    fixed: [{ label: 'Market stall fee for the season', lo: 600, hi: 1200 }, { label: 'Liability insurance', lo: 150, hi: 300 }, { label: 'Tent, tables and display', lo: 250, hi: 600 }, { label: 'Moulds and tools', lo: 150, hi: 450 }, { label: 'Card reader and fees', lo: 60, hi: 150 }],
    variable: 'beeswax, wicks and labels',
    classify: { variable: ['Beeswax for each candle', 'Wicks', 'Labels and gift boxes'], fixed: ['The stall fee for the season', 'Liability insurance', 'The tent and tables', 'Candle moulds'] },
  },
  {
    owner: (name) => `${name} runs a mobile car detailing business`,
    unit: 'detail', units: 'details', price: [120, 220], pStep: 5, vc: [18, 34], period: 'month', q: [40, 110],
    fixed: [{ label: 'Van payment', lo: 550, hi: 900 }, { label: 'Insurance', lo: 160, hi: 300 }, { label: 'Equipment loan payment', lo: 150, hi: 350 }, { label: 'Phone and website', lo: 70, hi: 140 }, { label: 'Advertising', lo: 100, hi: 300 }],
    variable: 'cleaning supplies and fuel',
    classify: { variable: ['Soap, wax and cleaning supplies', 'Fuel to drive to each customer', 'Microfibre towels that wear out'], fixed: ['The monthly van payment', 'Insurance', 'The website and phone plan', 'The loan payment on the pressure washer'] },
  },
  {
    owner: (name) => `${name} makes and sells cutting boards and charcuterie boards at craft fairs in a mountain town`,
    unit: 'board', units: 'boards', price: [35, 85], pStep: 5, vc: [9, 22], period: 'season', q: [150, 500],
    fixed: [{ label: 'Craft fair booth fees', lo: 400, hi: 1100 }, { label: 'Shop rent share', lo: 900, hi: 1800 }, { label: 'Insurance', lo: 150, hi: 300 }, { label: 'Tools', lo: 300, hi: 900 }, { label: 'Display and signs', lo: 120, hi: 350 }],
    variable: 'hardwood, oil and finish',
    classify: { variable: ['Hardwood for each board', 'Food-safe oil', 'Sandpaper that is used up'], fixed: ['Booth fees for the season', 'Insurance', 'The table saw', 'A share of the shop rent'] },
  },
];

interface Setup { b: Biz; name: string; F: number; fixed: Array<{ label: string; amount: number }>; p: number; v: number }
function bizSetup(rng: Rng, k = 3): Setup {
  const b = rng.pick(BIZ);
  const name = rng.pick(NAMES);
  const fixed = rng.sample(b.fixed, k).map((f) => ({ label: f.label, amount: rng.int(Math.ceil(f.lo / 5), Math.floor(f.hi / 5)) * 5 }));
  const F = fixed.reduce((s, f) => s + f.amount, 0);
  const p = rng.int(Math.round(b.price[0] / b.pStep), Math.round(b.price[1] / b.pStep)) * b.pStep;
  const v = rng.int(Math.round(b.vc[0] * 20), Math.round(b.vc[1] * 20)) / 20;
  return { b, name, F, fixed, p, v };
}
const fixedText = (s: Setup) => s.fixed.map((f) => `${f.label.charAt(0).toLowerCase()}${f.label.slice(1)} ${tag(f.amount)}`).join(', ');

function revenueProfit(rng: Rng): Out {
  const s = bizSetup(rng);
  const q = rng.int(s.b.q[0], s.b.q[1]);
  const R = cents(s.p * q);
  const o = retry(() => rng.int(Math.round(R * 0.45), Math.round(R * 0.85)), (E) => E % 10 !== 0 || rng.chance(0.3), 20);
  const E = o;
  const P = sub(R, E);
  return {
    prompt: `${s.b.owner(s.name)}. Last ${s.b.period}, ${s.name} sold ${numT(q)} ${s.b.units} at ${tag(s.p)} each. The business’s total expenses for the ${s.b.period} were ${tag(E)}. What was the revenue, and what was the profit? ${CENT}`,
    parts: [moneyPart(R, 'Revenue: \\$'), moneyPart(P, 'Profit: \\$')],
    hints: ['Revenue (sales) = price × number sold.', 'Profit = revenue − expenses.'],
    solution: [
      `Revenue: $${mv(s.p)} \\times ${num(q)} = ${m2(R)}$`,
      `Profit: $${m2(R)} - ${mv(E)} = ${m2(P)}$`,
      `The revenue was ${money(R)} and the profit was ${money(P)}.`,
    ],
  };
}

function classifyCost(rng: Rng): Out {
  const b = rng.pick(BIZ);
  const name = rng.pick(NAMES);
  const askVar = rng.chance(0.5);
  const correct = askVar ? rng.pick(b.classify.variable) : rng.pick(b.classify.fixed);
  const wrong = askVar ? rng.sample(b.classify.fixed, 3) : rng.sample(b.classify.variable, 3);
  return {
    prompt: `${b.owner(name)}. Which of these is a **${askVar ? 'variable' : 'fixed'} cost** for the business?`,
    parts: [part(mc(rng, correct, wrong))],
    hints: ['A fixed cost stays the same no matter how many items are sold. A variable cost goes up with each item made or sold.', `Ask: if ${name} sold twice as many ${b.units}, would this cost go up?`],
    solution: [
      askVar
        ? `The cost of “${correct.charAt(0).toLowerCase()}${correct.slice(1)}” goes up as more ${b.units} are sold, so it is a variable cost.`
        : `“${correct}” costs the same however many ${b.units} are sold, so it is a fixed cost.`,
      `The other choices are ${askVar ? 'fixed costs: they stay the same each period' : 'variable costs: they grow with the number sold'}.`,
      `The ${askVar ? 'variable' : 'fixed'} cost is: ${correct.charAt(0).toLowerCase()}${correct.slice(1)}.`,
    ],
  };
}

function costModel(rng: Rng): Out {
  const s = retry(() => bizSetup(rng), (x) => x.p - x.v > 2);
  const BE = s.F / (s.p - s.v);
  const loss = rng.chance(0.35);
  const q = loss ? rng.int(Math.max(1, Math.floor(BE * 0.5)), Math.max(1, Math.floor(BE * 0.9))) : rng.int(Math.ceil(BE * 1.1), Math.ceil(BE * 2));
  const V = cents(s.v * q);
  const C = total([s.F, V]);
  const R = cents(s.p * q);
  const P = sub(R, C);
  return {
    prompt: `${s.b.owner(s.name)}. Each ${s.b.period}, the fixed costs are: ${fixedText(s)}. The variable cost (${s.b.variable}) is ${money(s.v)} per ${s.b.unit}, and the selling price is ${tag(s.p)} per ${s.b.unit}. This ${s.b.period}, ${s.name} sold ${numT(q)} ${s.b.units}. Find the total costs and the revenue. Did the business make a profit or a loss, and how much? ${CENT}`,
    parts: [moneyPart(C, 'Total costs: \\$'), moneyPart(R, 'Revenue: \\$'), ...profitPart(P)],
    hints: ['Total costs = fixed costs + variable cost per item × number sold.', 'Revenue = price × number sold. Profit = revenue − total costs; a negative result is a loss.'],
    solution: [
      `Fixed costs: $${s.fixed.map((f) => mv(f.amount)).join(' + ')} = ${mv(s.F)}$`,
      `Variable costs: $${m2(s.v)} \\times ${num(q)} = ${m2(V)}$`,
      `Total costs: $${mv(s.F)} + ${m2(V)} = ${m2(C)}$`,
      `Revenue: $${mv(s.p)} \\times ${num(q)} = ${m2(R)}$`,
      `Revenue − costs: $${m2(R)} - ${m2(C)} = ${m2(P)}$`,
      P >= 0 ? `The business made a profit of ${money(P)}.` : `The result is negative, so the business had a loss of ${money(-P)}.`,
    ],
  };
}

function statementFigure(rows: Array<[string, number | null]>): Figure {
  return { type: 'table', headers: ['Income statement', 'Amount'], rows: rows.map(([l, a]) => [l, a === null ? '' : cell(a)]) };
}

function incomeStatement(rng: Rng, d: 2 | 3): Out {
  const s = retry(() => bizSetup(rng, 4), (x) => x.p - x.v > 2);
  const BE = s.F / (s.p - s.v);
  const q = d === 2 ? rng.int(s.b.q[0], s.b.q[1]) : rng.int(Math.max(5, Math.ceil(BE * 0.75)), Math.max(10, Math.ceil(BE * 2.6)));
  const R = cents(s.p * q);
  const V = cents(s.v * q);
  const fixed = s.fixed;
  const E = total([V, ...fixed.map((f) => f.amount)]);
  const P = sub(R, E);
  const period = s.b.period === 'season' ? 'the season' : 'June';
  const rows: Array<[string, number | null]> = [
    [`Sales (${numT(q)} ${s.b.units})`, R],
    [`${s.b.variable.charAt(0).toUpperCase()}${s.b.variable.slice(1)}`, V],
    ...fixed.map((f) => [f.label, f.amount] as [string, number]),
  ];
  const figure = statementFigure(rows);
  if (d === 2) {
    return {
      prompt: `${s.b.owner(s.name)}. The table shows the business’s sales and expenses for ${period}. Find the total expenses and the net income (profit or loss). ${CENT}`,
      figure,
      parts: [moneyPart(E, 'Total expenses: \\$'), ...profitPart(P)],
      hints: ['Every line except the sales line is an expense. Add them.', 'Net income = sales − total expenses. If the result is negative, it is a loss.'],
      solution: [
        `Total expenses: $${[V, ...fixed.map((f) => f.amount)].map((x) => (isWhole(x) ? mv(x) : m2(x))).join(' + ')} = ${m2(E)}$`,
        `Net income: $${m2(R)} - ${m2(E)} = ${m2(P)}$`,
        P >= 0 ? `Total expenses were ${money(E)}, and the business made a profit of ${money(P)}.` : `Total expenses were ${money(E)}, and the business had a loss of ${money(-P)}.`,
      ],
    };
  }
  // Decide the verdict first (a profit under \$600 never meets a goal), then set the goal around the profit.
  const meets = P >= 600 && rng.chance(0.7);
  const goal = meets
    ? Math.max(500, Math.floor((P * rng.int(55, 90)) / 100 / 250) * 250)
    : Math.max(500, Math.ceil((Math.max(P, 400) * rng.int(115, 160)) / 100 / 250) * 250);
  const ok = P >= goal;
  const margin = (P / R) * 100;
  const mdp = onEdge(margin, 1) ? 2 : 1;
  return {
    prompt: `${s.b.owner(s.name)}. The table shows the business’s sales and expenses for ${period}. ${s.name} has decided the business is worth continuing only if it earns a profit of at least ${tag(goal)} for ${period === 'June' ? 'the month' : 'the season'}, to pay for ${s.name}’s own time. Find the profit (enter a loss as a negative number) and the profit margin (profit as a percent of sales, to the nearest ${mdp === 1 ? 'tenth' : 'hundredth'}). Is the business worth continuing? ${CENT}`,
    figure,
    parts: [
      moneyPart(P, 'Profit: \\$'),
      numPart(margin, { decimals: mdp, suffix: '%', label: 'Profit margin:' }),
      part(mc(rng, ok ? `Yes: the profit of ${money(P)} meets the goal of ${tag(goal)}.` : `No: the ${P >= 0 ? `profit of ${money(P)}` : `loss of ${money(-P)}`} does not reach the goal of ${tag(goal)}.`, ok
        ? [
            `No: the profit of ${money(P)} is less than the goal of ${tag(goal)}.`,
            `No: the expenses of ${money(E)} are too high for any business.`,
            'No: a business needs a profit margin of 100% to be worth continuing.',
          ]
        : [
            R > E ? `Yes: the sales of ${money(R)} are more than the expenses, so the goal is met.` : `Yes: the sales of ${money(R)} cover the cost of ${s.b.variable}.`,
            `Yes: the profit margin of ${fmtFixed(margin, 1)}% shows the business is doing well.`,
            `Yes: ${P >= 0 ? 'any profit at all' : 'a small loss'} is good enough to keep going.`,
          ]), { label: 'Worth continuing?' }),
    ],
    hints: ['Profit = sales − total expenses, where every line except sales is an expense.', 'Profit margin = profit ÷ sales × 100. Then compare the profit with the goal.'],
    solution: [
      `Total expenses: $${[V, ...fixed.map((f) => f.amount)].map((x) => (isWhole(x) ? mv(x) : m2(x))).join(' + ')} = ${m2(E)}$`,
      `Profit: $${m2(R)} - ${m2(E)} = ${m2(P)}$`,
      `Profit margin: $${m2(P)} \\div ${m2(R)} \\times 100 ${Math.abs(roundTo(margin, mdp) - margin) < 1e-9 ? `= ${fmt(margin, mdp)}` : `\\approx ${fmtFixed(margin, mdp)}`}\\%$`,
      ok ? `The profit, ${money(P)}, meets the goal of ${tag(goal)}, so the business is worth continuing.` : `The ${P >= 0 ? `profit, ${money(P)},` : `loss of ${money(-P)}`} falls short of the goal of ${tag(goal)}, so the business is not worth continuing as it is (unless ${s.name} can raise prices, sell more, or cut costs).`,
    ],
  };
}

function priceChange(rng: Rng): Out {
  const o = retry(
    () => {
      const s = bizSetup(rng);
      const BE = s.F / (s.p - s.v);
      const q1 = rng.int(Math.max(Math.ceil(BE * 1.1), s.b.q[0]), Math.max(Math.ceil(BE * 1.6), s.b.q[1]));
      const up = rng.chance(0.5);
      const dp = s.b.pStep * rng.int(1, 3);
      const p2 = up ? s.p + dp : s.p - dp;
      const pct = rng.pick([8, 10, 12, 15, 20, 25]);
      const q2 = Math.round(up ? q1 * (1 - pct / 100) : q1 * (1 + pct / 100));
      return { s, q1, up, p2, pct, q2 };
    },
    (x) => x.p2 - x.s.v > 1 && Math.abs((x.q2 * (x.p2 - x.s.v)) - (x.q1 * (x.s.p - x.s.v))) > 50,
    300,
  );
  const { s, q1, up, p2, pct, q2 } = o;
  const P1 = sub(cents((s.p - s.v) * q1), s.F);
  const P2 = sub(cents((p2 - s.v) * q2), s.F);
  const better = P2 > P1;
  return {
    prompt: `${s.b.owner(s.name)}. The fixed costs are ${tag(s.F)} a ${s.b.period}, and the variable cost is ${money(s.v)} per ${s.b.unit}. At ${tag(s.p)} each, ${s.name} sells about ${numT(q1)} ${s.b.units} a ${s.b.period}. ${s.name} thinks that ${up ? `raising` : `lowering`} the price to ${tag(p2)} would ${up ? 'cut' : 'raise'} sales by about ${pct}%, to ${numT(q2)} ${s.b.units}. Find the profit at each price. Should ${s.name} change the price? ${CENT}`,
    parts: [
      moneyPart(P1, `Profit at ${tag(s.p)}: \\$`),
      moneyPart(P2, `Profit at ${tag(p2)}: \\$`),
      part(mc(rng, better ? `Yes: the profit would go up by ${money(sub(P2, P1))}.` : `No: the profit would go down by ${money(sub(P1, P2))}.`, [
        better ? `No: the profit would go down by ${money(sub(P2, P1))}.` : `Yes: the profit would go up by ${money(sub(P1, P2))}.`,
        up ? `Yes: a higher price always means more profit.` : `Yes: selling more ${s.b.units} always means more profit.`,
        up ? `No: selling fewer ${s.b.units} always means less profit.` : 'No: a lower price always means less profit.',
      ]), { label: 'Change the price?' }),
    ],
    hints: ['Profit = (price − variable cost) × number sold − fixed costs.', 'Work out the profit for both prices, then compare.'],
    solution: [
      `Profit at ${tag(s.p)}: $(${mv(s.p)} - ${m2(s.v)}) \\times ${num(q1)} - ${mv(s.F)} = ${m2(s.p - s.v)} \\times ${num(q1)} - ${mv(s.F)} = ${m2(P1)}$`,
      `Profit at ${tag(p2)}: $(${mv(p2)} - ${m2(s.v)}) \\times ${num(q2)} - ${mv(s.F)} = ${m2(p2 - s.v)} \\times ${num(q2)} - ${mv(s.F)} = ${m2(P2)}$`,
      better ? `The new price gives ${money(sub(P2, P1))} more profit, so ${s.name} should change the price.` : `The new price gives ${money(sub(P1, P2))} less profit, so ${s.name} should keep the price at ${tag(s.p)}.`,
    ],
  };
}

const businessProfit = skill({
  id: 'm303-business-profit',
  name: 'Expenses, sales and profit',
  description: 'Sort fixed and variable costs, find revenue, total costs and profit or loss, read an income statement, and judge the effect of a price change and whether a small business is viable.',
  outcomes: ['N3'],
  lessonId: 'm303-8-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.6) ? revenueProfit(rng) : classifyCost(rng);
    if (d === 2) return rng.chance(0.5) ? costModel(rng) : incomeStatement(rng, 2);
    return rng.chance(0.5) ? priceChange(rng) : incomeStatement(rng, 3);
  },
});

function breakEvenSteps(F: number, p: number, v: number, unit: string, units: string): { q: number; steps: string[] } {
  const c = sub(p, v);
  const raw = F / c;
  const q = Math.ceil(raw - 1e-9);
  const exact = isWhole(raw);
  return {
    q,
    steps: [
      `Each ${unit} brings in $${mv(p)} - ${m2(v)} = ${m2(c)}$ toward the fixed costs (the contribution per ${unit}).`,
      `Break-even: $${mv(F)} \\div ${m2(c)} ${exact ? `= ${num(raw)}` : `= ${num(roundTo(raw, 2))}\\ldots`}$`,
      exact ? `This is a whole number, so ${numT(q)} ${units} exactly cover the costs.` : `You cannot sell part of a ${unit}, and ${Math.floor(raw)} would still leave a small loss, so round up to ${numT(q)}.`,
    ],
  };
}

function breakEvenQty(rng: Rng, d: 1 | 2): Out {
  const fOf = (x: Setup) => (d === 1 ? Math.round(x.F / 50) * 50 : x.F);
  const s = retry(() => bizSetup(rng, 3), (x) => x.p - x.v > 2 && !isWhole(fOf(x) / (x.p - x.v)));
  const F = fOf(s);
  const { q, steps } = breakEvenSteps(F, s.p, s.v, s.b.unit, s.b.units);
  return {
    prompt: d === 1
      ? `${s.b.owner(s.name)}. The fixed costs are ${tag(F)} a ${s.b.period}. Each ${s.b.unit} sells for ${tag(s.p)} and costs ${money(s.v)} to make (${s.b.variable}). How many ${s.b.units} must ${s.name} sell each ${s.b.period} to break even? Round up to a whole number if necessary.`
      : `${s.b.owner(s.name)}. The fixed costs each ${s.b.period} are: ${fixedText(s)}. The ${s.b.variable} cost ${money(s.v)} per ${s.b.unit}, and the selling price is ${tag(s.p)}. How many ${s.b.units} must ${s.name} sell each ${s.b.period} to break even? Round up to a whole number if necessary.`,
    parts: [numPart(q, { label: 'Break-even quantity:', suffix: s.b.units })],
    hints: [
      'At the break-even point, revenue = total costs, so profit is \\$0.',
      'Break-even quantity = fixed costs ÷ (price − variable cost per item). Round up.',
    ],
    solution: [
      ...(d === 2 ? [`Fixed costs: $${s.fixed.map((f) => mv(f.amount)).join(' + ')} = ${mv(F)}$`] : []),
      ...steps,
      `${s.name} must sell ${numT(q)} ${s.b.units} each ${s.b.period} to break even.`,
    ],
  };
}

function breakEvenPrice(rng: Rng): Out {
  const o = retry(
    () => {
      const s = bizSetup(rng);
      const q = rng.int(Math.round(s.b.q[0] * 0.4), s.b.q[0]);
      return { s, q, F: s.F, share: s.F / q, p: s.v + s.F / q };
    },
    (x) => isCents(x.share) || (!isCents(x.p) && Math.ceil(x.p * 100) / 100 - x.p > 0.0015),
    200,
  );
  const { s, q, F, share, p } = o;
  const exact = isCents(share);
  const up = Math.ceil(p * 100 - 1e-6) / 100;
  const down = Math.floor(p * 100 + 1e-6) / 100;
  return {
    prompt: `${s.b.owner(s.name)}. The fixed costs are ${tag(F)} a ${s.b.period}, and the ${s.b.variable} cost ${money(s.v)} per ${s.b.unit}. ${s.name} expects to sell ${numT(q)} ${s.b.units} a ${s.b.period}. What is the break-even price: the lowest price per ${s.b.unit} that covers all the costs? Give the price in dollars and cents, rounding up to the next cent if necessary.`,
    parts: [moneyPart(up, 'Break-even price: \\$')],
    hints: ['At the break-even price, revenue = total costs for the expected number of items.', `Price = variable cost + (fixed costs ÷ ${numT(q)}). Round only at the end.`],
    solution: [
      `Each ${s.b.unit} must pay its own variable cost, ${money(s.v)}, plus an equal share of the fixed costs.`,
      `Share of fixed costs per ${s.b.unit}: $${mv(F)} \\div ${num(q)} ${exact ? `= ${m2(share)}` : `= ${num(roundTo(share, 4))}\\ldots`}$`,
      exact
        ? `Break-even price: $${m2(s.v)} + ${m2(share)} = ${m2(up)}$`
        : `Break-even price: $${m2(s.v)} + ${num(roundTo(share, 4))}\\ldots = ${num(Math.floor(p * 10000) / 10000)}\\ldots$, so round up to ${money(up)}.`,
      `Check: total costs are $${mv(F)} + ${m2(s.v)} \\times ${num(q)} = ${m2(total([F, cents(s.v * q)]))}$, and $${m2(up)} \\times ${num(q)} = ${m2(cents(up * q))}$ covers them.${exact ? '' : ` (At ${money(down)}, sales would be only $${m2(cents(down * q))}$, a small loss.)`}`,
      `The break-even price is ${money(up)} per ${s.b.unit}.`,
    ],
  };
}

function targetProfit(rng: Rng): Out {
  const s = retry(() => bizSetup(rng), (x) => x.p - x.v > 2);
  const T = rng.int(4, 30) * 250;
  const c = sub(s.p, s.v);
  const raw = (s.F + T) / c;
  const q = Math.ceil(raw - 1e-9);
  return {
    prompt: `${s.b.owner(s.name)}. The fixed costs are ${tag(s.F)} a ${s.b.period}. Each ${s.b.unit} sells for ${tag(s.p)} and the ${s.b.variable} cost ${money(s.v)} per ${s.b.unit}. ${s.name} wants a profit of ${tag(T)} a ${s.b.period}. How many ${s.b.units} must ${s.name} sell each ${s.b.period}? Round up to a whole number if necessary.`,
    parts: [numPart(q, { label: 'Number needed:', suffix: s.b.units })],
    hints: [`Each ${s.b.unit} contributes (price − variable cost) toward the fixed costs and then the profit.`, 'Number needed = (fixed costs + target profit) ÷ (price − variable cost). Round up.'],
    solution: [
      `Contribution per ${s.b.unit}: $${mv(s.p)} - ${m2(s.v)} = ${m2(c)}$`,
      `Amount to cover: fixed costs + profit $= ${mv(s.F)} + ${mv(T)} = ${mv(s.F + T)}$`,
      `$${mv(s.F + T)} \\div ${m2(c)} ${isWhole(raw) ? `= ${num(raw)}` : `= ${num(roundTo(raw, 2))}\\ldots`}$${isWhole(raw) ? '' : `, so round up to ${numT(q)}`}`,
      `${s.name} must sell ${numT(q)} ${s.b.units} each ${s.b.period}.`,
    ],
  };
}

function breakEvenViable(rng: Rng): Out {
  const o = retry(
    () => {
      const s = bizSetup(rng);
      const perDay = s.b.unit === 'detail' ? rng.int(2, 4) : s.b.unit === 'lawn cut' ? rng.int(6, 12) : s.b.unit === 'bowl' ? rng.int(40, 110) : rng.int(15, 45);
      const days = s.b.period === 'month' ? rng.pick([20, 22, 24, 26]) : rng.pick([16, 18, 20, 22]);
      const max = perDay * days;
      const be = Math.ceil(s.F / (s.p - s.v) - 1e-9);
      return { s, perDay, days, max, be };
    },
    (x) => x.s.p - x.s.v > 2 && !isWhole(x.s.F / (x.s.p - x.s.v)) && Math.abs(x.max - x.be) / x.be > 0.12 && x.be > 5,
    300,
  );
  const { s, perDay, days, max, be } = o;
  const ok = max >= be;
  const dayWord = s.b.period === 'month' ? 'working days in a month' : 'market days in the season';
  const { steps } = breakEvenSteps(s.F, s.p, s.v, s.b.unit, s.b.units);
  return {
    prompt: `${s.b.owner(s.name)}. The fixed costs are ${tag(s.F)} a ${s.b.period}. Each ${s.b.unit} sells for ${tag(s.p)}, and the ${s.b.variable} cost ${money(s.v)} per ${s.b.unit}. Working alone, ${s.name} can sell at most ${perDay} ${s.b.units} a day, and there are ${days} ${dayWord}. Find the break-even quantity (round up) and the most ${s.b.units} ${s.name} can sell in a ${s.b.period}. Is the business viable as planned?`,
    parts: [
      numPart(be, { label: 'Break-even quantity:', suffix: s.b.units }),
      numPart(max, { label: 'Most possible:', suffix: s.b.units }),
      part(mc(rng, ok ? `Yes: ${s.name} can sell more than the break-even quantity, so the business can make a profit.` : `No: even working at full capacity, ${s.name} cannot reach the break-even quantity, so the business would lose money.`, [
        ok ? `No: ${s.name} cannot reach the break-even quantity.` : `Yes: ${s.name} can sell more than the break-even quantity.`,
        'Yes: any business with a selling price above its variable cost makes a profit.',
        ok ? 'No: a business is viable only if it breaks even on the first day.' : 'Yes: the fixed costs do not matter if the price is high enough.',
      ]), { label: 'Viable?' }),
    ],
    hints: ['Break-even quantity = fixed costs ÷ (price − variable cost), rounded up.', `Most possible = ${perDay} per day × ${days} days. Compare the two numbers.`],
    solution: [
      ...steps,
      `Most possible: $${perDay} \\times ${days} = ${num(max)}$ ${s.b.units}`,
      ok
        ? `${numT(max)} is more than ${numT(be)}, so the business can make a profit: it is viable as planned.`
        : `${numT(max)} is less than ${numT(be)}, so the business cannot break even as planned. ${s.name} would need to raise prices, cut costs, or hire help.`,
    ],
  };
}

function priceChangeBE(rng: Rng): Out {
  const o = retry(
    () => {
      const s = bizSetup(rng);
      const dp = s.b.pStep * rng.int(1, 3);
      const up = rng.chance(0.6);
      const p2 = up ? s.p + dp : s.p - dp;
      return { s, p2, up };
    },
    (x) => x.p2 - x.s.v > 2 && x.s.p - x.s.v > 2 && !isWhole(x.s.F / (x.s.p - x.s.v)) && !isWhole(x.s.F / (x.p2 - x.s.v)),
    300,
  );
  const { s, p2, up } = o;
  const b1 = breakEvenSteps(s.F, s.p, s.v, s.b.unit, s.b.units);
  const b2 = breakEvenSteps(s.F, p2, s.v, s.b.unit, s.b.units);
  return {
    prompt: `${s.b.owner(s.name)}. The fixed costs are ${tag(s.F)} a ${s.b.period}, and the ${s.b.variable} cost ${money(s.v)} per ${s.b.unit}. Find the break-even quantity at the current price of ${tag(s.p)} and at a new price of ${tag(p2)}. Round each up to a whole number. How does the ${up ? 'price increase' : 'price cut'} change the break-even point?`,
    parts: [
      numPart(b1.q, { label: `At ${tag(s.p)}:`, suffix: s.b.units }),
      numPart(b2.q, { label: `At ${tag(p2)}:`, suffix: s.b.units }),
      part(mc(rng, up ? `The break-even point drops, because each ${s.b.unit} contributes more toward the fixed costs. But customers may buy fewer at the higher price.` : `The break-even point rises, because each ${s.b.unit} contributes less toward the fixed costs. The lower price must bring in enough extra sales to pay off.`, [
        up ? `The break-even point rises, because a higher price means more costs.` : `The break-even point drops, because a lower price attracts more customers.`,
        'The break-even point does not change, because the fixed costs stay the same.',
        up ? 'The break-even point drops, so the business is now certain to make a profit.' : 'The break-even point rises, so the business is now certain to lose money.',
      ]), { label: 'Effect:' }),
    ],
    hints: ['Break-even quantity = fixed costs ÷ (price − variable cost). Do it once for each price.', `Changing the price changes the contribution of each ${s.b.unit}, not the fixed costs.`],
    solution: [
      `At ${tag(s.p)}:`, ...b1.steps,
      `At ${tag(p2)}:`, ...b2.steps,
      `The break-even point ${up ? 'drops' : 'rises'} from ${numT(b1.q)} to ${numT(b2.q)} ${s.b.units}, because each ${s.b.unit} contributes ${money(sub(p2, s.v))} instead of ${money(sub(s.p, s.v))}.`,
    ],
  };
}

const businessBreakeven = skill({
  id: 'm303-business-breakeven',
  name: 'Break-even point',
  description: 'Find the break-even quantity and break-even price of a small business, the sales needed for a target profit, and judge viability and the effect of a price change.',
  outcomes: ['N3'],
  lessonId: 'm303-8-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return breakEvenQty(rng, 1);
    if (d === 2) return rng.chance(0.55) ? breakEvenQty(rng, 2) : breakEvenPrice(rng);
    const r = rng.int(0, 2);
    return r === 0 ? targetProfit(rng) : r === 1 ? breakEvenViable(rng) : priceChangeBE(rng);
  },
});

export const FINANCE_SKILLS: SkillDef[] = [vehicleBuy, vehicleLease, businessProfit, businessBreakeven];
