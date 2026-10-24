/** Math 20-2 Unit 8 — Proportional Reasoning (M1, M2, M3): rates, scale diagrams, and similar shapes and objects. */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, SkillDef, SolidFigure, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const PEOPLE = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
];

const tx = (u: string) => `\\text{${u}}`;
/** A number inside maths (thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
/** A quantity as inline maths, e.g. $12\ \text{km}$. */
const q = (x: number, u: string, dp = 4) => `$${num(x, dp)}\\ ${tx(u)}$`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose (never inside $...$): \$12.50. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** Money as a plain table cell. */
const cell = (x: number) => `$${fmtFixed(x, 2)}`;
/** A money amount inside maths, without a dollar sign. */
const mv = (x: number) => group(fmtFixed(x, 2)).replace(/,/g, '{,}');

/** True when x is a positive finite number safely away from a rounding boundary at dp places. */
function safe(x: number, dp: number): boolean {
  if (!Number.isFinite(x) || x <= 0) return false;
  const f = x * 10 ** dp;
  return Math.abs(f - Math.floor(f) - 0.5) > 0.06;
}
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** Whether x has at most dp decimal places. */
const hasDp = (x: number, dp: number) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-6;
/** "= 12.5" when exact to dp places, otherwise "\approx 12.4567". */
const eq = (v: number, dp = 4) => (hasDp(v, dp) ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`);

const moneyPart = (v: number, suffix?: string, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label, suffix });
const decPart = (v: number, dp: number, suffix?: string, label?: string): Part => numPart(v, { decimals: dp, suffix, label });
/** Places needed to write v exactly (0-4), or -1. */
function dpOf(v: number): number {
  for (let d = 0; d <= 4; d++) if (hasDp(v, d)) return d;
  return -1;
}
/** An exact answer. A terminating decimal is shown (and canonically written) as a decimal, not a fraction. */
function exactPart(v: number, suffix?: string, label?: string): Part {
  const d = dpOf(v);
  return d > 0 ? numPart(v, { decimals: d, suffix, label }) : numPart(v, { suffix, label });
}
/** A scale factor: exact, written as a fraction or a decimal. */
const kPart = (v: number, label: string): Part => numPart(v, { label, exact: true });

/** "2 h 15 min" in maths. */
const hm = (h: number, m: number) => (m ? `$${h}\\ \\text{h}\\ ${m}\\ \\text{min}$` : `$${h}\\ \\text{h}$`);

// ---------------------------------------------------------------------------
// Lesson 8.1 — Comparing and interpreting rates
// ---------------------------------------------------------------------------

interface Grocery {
  item: string;
  sizes: number[];
  /** Typical price range in dollars per 100 g. */
  lo: number;
  hi: number;
}
const GROCERY: Grocery[] = [
  { item: 'coffee beans', sizes: [300, 400, 500, 750, 1000, 1500], lo: 2.2, hi: 4.2 },
  { item: 'cheddar cheese', sizes: [200, 250, 400, 500, 750, 1000], lo: 1.6, hi: 3 },
  { item: 'almonds', sizes: [200, 300, 500, 750, 1000, 1500], lo: 1.8, hi: 3.4 },
  { item: 'granola', sizes: [250, 400, 500, 750, 1000, 1500], lo: 0.9, hi: 1.7 },
  { item: 'peanut butter', sizes: [250, 500, 750, 1000, 2000], lo: 0.6, hi: 1.2 },
  { item: 'loose-leaf tea', sizes: [100, 200, 250, 500], lo: 4, hi: 9 },
];
const sizeText = (g: number) => (g >= 1000 ? `${fmt(g / 1000)} kg` : `${g} g`);
const sizeMd = (g: number) => (g >= 1000 ? q(g / 1000, 'kg') : q(g, 'g'));

/** One unit rate from a single measurement. */
function unitRate(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['grocery', 'grocery', 'fuel', 'speed', 'heart', 'wage'] as const);
  if (kind === 'grocery') {
    const g = rng.pick(GROCERY);
    const r = retry(
      () => {
        const m = rng.pick(g.sizes);
        const price = roundTo(roundTo((m / 100) * rng.float(g.lo, g.hi, 3), 1) - 0.01, 2);
        return { m, price, u: (price / m) * 100 };
      },
      (t) => t.price > 1 && safe(t.u, 2),
    );
    const n = r.m / 100;
    return {
      prompt: `A ${sizeText(r.m)} package of ${g.item} costs ${money(r.price)}. What is the unit price per $100\\ \\text{g}$, to the nearest cent?`,
      parts: [moneyPart(r.u, 'per 100 g')],
      hints: ['A unit price compares a price with one convenient amount, here $100\\ \\text{g}$.', `How many $100\\ \\text{g}$ portions are in ${sizeMd(r.m)}? Divide the price by that number.`],
      solution: [
        `${r.m >= 1000 ? `${cap(sizeMd(r.m))} $= ${num(r.m)}\\ \\text{g}$, which is` : `${cap(sizeMd(r.m))} is`} $${num(n)}$ portions of $100\\ \\text{g}$.`,
        `Unit price: $\\dfrac{${mv(r.price)}}{${num(n)}} ${eq(r.u)}$`,
        `The unit price is about ${money(r.u)} per $100\\ \\text{g}$.`,
      ],
    };
  }
  if (kind === 'fuel') {
    const r = retry(
      () => {
        const D = rng.int(250, 750);
        const L = rng.float(20, 75, 1);
        return { D, L, f: (L / D) * 100 };
      },
      (t) => t.f >= 5 && t.f <= 14 && safe(t.f, 1),
    );
    return {
      prompt: `${who} drove ${q(r.D, 'km')} and then needed ${q(r.L, 'L')} of gas to fill the tank again. What is the car's fuel consumption in litres per $100\\ \\text{km}$, to the nearest tenth?`,
      parts: [decPart(r.f, 1, 'L/100 km')],
      hints: ['Fuel consumption compares litres of fuel with $100\\ \\text{km}$ of driving.', `How many hundreds of kilometres is ${q(r.D, 'km')}? Divide the litres by that number.`],
      solution: [
        `${q(r.D, 'km')} is $${num(r.D / 100)}$ hundreds of kilometres.`,
        `$\\dfrac{${num(r.L)}\\ \\text{L}}{${num(r.D / 100)}} ${eq(r.f)}$ L per $100\\ \\text{km}$`,
        `The car uses about $${fmtFixed(r.f, 1)}$ L/100 km.`,
      ],
    };
  }
  if (kind === 'speed') {
    const cycle = rng.chance(0.5);
    const r = retry(
      () => {
        const h = cycle ? rng.int(1, 3) : rng.int(1, 4);
        const m = rng.pick([10, 15, 20, 30, 40, 45, 50]);
        const D = cycle ? rng.int(25, 90) : rng.int(110, 420);
        const t = h + m / 60;
        return { h, m, D, t, v: D / t };
      },
      (t) => (cycle ? t.v >= 12 && t.v <= 30 : t.v >= 60 && t.v <= 105) && safe(t.v, 1) && !hasDp(t.v, 1),
    );
    return {
      prompt: `${who} ${cycle ? 'cycles' : 'drives'} ${q(r.D, 'km')} in ${hm(r.h, r.m)}. What is the average speed in kilometres per hour, to the nearest tenth?`,
      parts: [decPart(r.v, 1, 'km/h')],
      hints: ['Speed is a rate: distance divided by time.', `Write the time in hours first: $${r.m}\\ \\text{min} = \\dfrac{${r.m}}{60}\\ \\text{h}$.`],
      solution: [
        `Time: ${hm(r.h, r.m)} $= ${r.h} + \\dfrac{${r.m}}{60} ${eq(r.t)}$ h.`,
        `Speed $= \\dfrac{${r.D}\\ \\text{km}}{${fmtFixed(r.t, 4)}\\ \\text{h}} \\approx ${fmtFixed(r.v, 3)}$ km/h`,
        `The average speed is about $${fmtFixed(r.v, 1)}$ km/h.`,
      ],
    };
  }
  if (kind === 'heart') {
    const s = rng.pick([10, 15, 20, 30]);
    const bpm = retry(
      () => rng.int(54, 96),
      (b) => isWhole((b * s) / 60),
    );
    const beats = (bpm * s) / 60;
    return {
      prompt: `${who} takes a pulse after a cool-down walk and counts $${beats}$ beats in $${s}$ seconds. What is the heart rate in beats per minute?`,
      parts: [exactPart(bpm, 'beats/min')],
      hints: ['A heart rate is measured in beats per **minute**, and one minute is $60$ seconds.', `How many groups of $${s}$ seconds are in $60$ seconds?`],
      solution: [`$60 \\div ${s} = ${60 / s}$, so a minute is $${60 / s}$ times as long as the count.`, `$${beats} \\times ${60 / s} = ${bpm}$`, `The heart rate is $${bpm}$ beats per minute.`],
    };
  }
  const H = rng.pick([6, 7.5, 8, 12, 15.5, 18, 22.5, 25, 32]);
  const w = rng.int(1650, 3200) / 100;
  const E = roundTo(w * H, 2);
  const job = rng.pick(['a garden centre', 'a grocery store', 'a summer camp', 'a bike shop', 'a rec centre']);
  return {
    prompt: `${who} earned ${money(E)} for $${fmt(H)}$ hours of work at ${job}. What is ${who}'s hourly rate of pay, to the nearest cent?`,
    parts: [moneyPart(E / H, 'per hour')],
    hints: ['An hourly rate is the pay for one hour.', 'Divide the total pay by the number of hours.'],
    solution: [`$\\dfrac{${mv(E)}}{${fmt(H)}} ${eq(E / H)}$`, `${who} earns about ${money(E / H)} per hour.`],
  };
}

/** Compare two options: two unit rates and a decision. */
function compareTwo(rng: Rng): GenOutput {
  const kind = rng.pick(['grocery', 'grocery', 'fuel', 'speed', 'data'] as const);
  if (kind === 'grocery') {
    const g = rng.pick(GROCERY);
    const r = retry(
      () => {
        const [s1, s2] = rng.sample(g.sizes, 2).sort((a, b) => a - b);
        const mk = (s: number) => roundTo(roundTo((s / 100) * rng.float(g.lo, g.hi, 3), 1) - 0.01, 2);
        const p1 = mk(s1);
        const p2 = mk(s2);
        return { s1, s2, p1, p2, u1: (p1 / s1) * 100, u2: (p2 / s2) * 100 };
      },
      (t) => t.p1 > 1 && safe(t.u1, 2) && safe(t.u2, 2) && Math.abs(roundTo(t.u1, 2) - roundTo(t.u2, 2)) >= 0.05,
    );
    const best = r.u1 < r.u2 ? 0 : 1;
    const opts = [`The ${sizeText(r.s1)} package`, `The ${sizeText(r.s2)} package`, 'They are the same value'];
    const table: TableFigure = { type: 'table', headers: ['Package', 'Price'], rows: [[sizeText(r.s1), cell(r.p1)], [sizeText(r.s2), cell(r.p2)]] };
    return {
      prompt: `A store sells ${g.item} in two sizes, shown in the table. (a) Find the unit price of each size per $100\\ \\text{g}$, to the nearest cent. (b) Which size is the better buy?`,
      figure: table,
      parts: [
        moneyPart(r.u1, 'per 100 g', `(a) ${sizeText(r.s1)}: \\$`),
        moneyPart(r.u2, 'per 100 g', `${sizeText(r.s2)}: \\$`),
        { label: '(b)', answer: fixedChoice(opts, best) },
      ],
      hints: ['Compare the price of the same amount of each: $100\\ \\text{g}$.', 'Divide each price by its number of $100\\ \\text{g}$ portions. The lower unit price is the better buy.'],
      solution: [
        `${sizeText(r.s1)}: $\\dfrac{${mv(r.p1)}}{${num(r.s1 / 100)}} ${eq(r.u1)}$, about ${money(r.u1)} per $100\\ \\text{g}$.`,
        `${sizeText(r.s2)}: $\\dfrac{${mv(r.p2)}}{${num(r.s2 / 100)}} ${eq(r.u2)}$, about ${money(r.u2)} per $100\\ \\text{g}$.`,
        `The ${sizeText(best ? r.s2 : r.s1)} package costs less per $100\\ \\text{g}$, so it is the better buy${best === 0 ? ', even though it is the smaller size' : ''}.`,
      ],
    };
  }
  if (kind === 'fuel') {
    const [n1, n2] = rng.sample(PEOPLE, 2);
    const [v1, v2] = rng.sample(['pickup truck', 'minivan', 'hatchback', 'SUV', 'sedan', 'crossover'], 2);
    const r = retry(
      () => {
        const D1 = rng.int(300, 800);
        const D2 = rng.int(300, 800);
        const L1 = rng.float(20, 75, 1);
        const L2 = rng.float(20, 75, 1);
        return { D1, D2, L1, L2, f1: (L1 / D1) * 100, f2: (L2 / D2) * 100 };
      },
      (t) => [t.f1, t.f2].every((f) => f >= 5 && f <= 15 && safe(f, 1)) && Math.abs(t.f1 - t.f2) >= 0.5,
    );
    const best = r.f1 < r.f2 ? 0 : 1;
    return {
      prompt: `${n1}'s ${v1} used ${q(r.L1, 'L')} of gas to travel ${q(r.D1, 'km')}. ${n2}'s ${v2} used ${q(r.L2, 'L')} to travel ${q(r.D2, 'km')}. (a) Find each vehicle's fuel consumption in L/100 km, to the nearest tenth. (b) Which vehicle is more fuel-efficient?`,
      figure: { type: 'table', headers: ['Vehicle', 'Fuel used (L)', 'Distance (km)'], rows: [[`${n1}'s ${v1}`, fmt(r.L1), String(r.D1)], [`${n2}'s ${v2}`, fmt(r.L2), String(r.D2)]] },
      parts: [
        decPart(r.f1, 1, 'L/100 km', `(a) ${n1}:`),
        decPart(r.f2, 1, 'L/100 km', `${n2}:`),
        { label: '(b)', answer: fixedChoice([`${n1}'s ${v1}`, `${n2}'s ${v2}`], best) },
      ],
      hints: ['Fuel consumption = litres used for every $100\\ \\text{km}$.', 'Divide the litres by the distance in hundreds of kilometres. A **lower** L/100 km means less fuel for the same distance.'],
      solution: [
        `${n1}: $\\dfrac{${num(r.L1)}}{${num(r.D1 / 100)}} ${eq(r.f1)}$ L/100 km`,
        `${n2}: $\\dfrac{${num(r.L2)}}{${num(r.D2 / 100)}} ${eq(r.f2)}$ L/100 km`,
        `${best ? `${n2}'s ${v2}` : `${n1}'s ${v1}`} uses less fuel per $100\\ \\text{km}$ (about $${fmtFixed(Math.min(r.f1, r.f2), 1)}$ L/100 km), so it is more fuel-efficient.`,
      ],
    };
  }
  if (kind === 'speed') {
    const [n1, n2] = rng.sample(PEOPLE, 2);
    const r = retry(
      () => {
        const D1 = rng.float(5, 15, 1);
        const D2 = rng.float(5, 15, 1);
        const t1 = rng.int(20, 90);
        const t2 = rng.int(20, 90);
        return { D1, D2, t1, t2, v1: (D1 / t1) * 60, v2: (D2 / t2) * 60 };
      },
      (t) => [t.v1, t.v2].every((v) => v >= 7 && v <= 16 && safe(v, 1)) && Math.abs(t.v1 - t.v2) >= 0.4,
    );
    const best = r.v1 > r.v2 ? 0 : 1;
    return {
      prompt: `Training for a race, ${n1} ran ${q(r.D1, 'km')} in $${r.t1}$ minutes and ${n2} ran ${q(r.D2, 'km')} in $${r.t2}$ minutes. (a) Find each runner's average speed in km/h, to the nearest tenth. (b) Who ran faster?`,
      figure: { type: 'table', headers: ['Runner', 'Distance (km)', 'Time (min)'], rows: [[n1, fmt(r.D1), String(r.t1)], [n2, fmt(r.D2), String(r.t2)]] },
      parts: [decPart(r.v1, 1, 'km/h', `(a) ${n1}:`), decPart(r.v2, 1, 'km/h', `${n2}:`), { label: '(b)', answer: fixedChoice([n1, n2], best) }],
      hints: ['Change each time to hours (divide the minutes by 60), then divide distance by time.', 'Or find kilometres per minute and multiply by $60$.'],
      solution: [
        `${n1}: $\\dfrac{${num(r.D1)}\\ \\text{km}}{${r.t1}\\ \\text{min}} \\times 60 ${eq(r.v1)}$ km/h`,
        `${n2}: $\\dfrac{${num(r.D2)}\\ \\text{km}}{${r.t2}\\ \\text{min}} \\times 60 ${eq(r.v2)}$ km/h`,
        `${best ? n2 : n1} ran faster, at about $${fmtFixed(Math.max(r.v1, r.v2), 1)}$ km/h.`,
      ],
    };
  }
  const r = retry(
    () => {
      const G1 = rng.pick([2, 3, 5, 8, 10]);
      const G2 = rng.pick([15, 20, 25, 40, 50, 60]);
      const P1 = rng.int(25, 45) - 0.01;
      const P2 = rng.int(40, 85) - 0.01;
      return { G1, G2, P1: roundTo(P1, 2), P2: roundTo(P2, 2), u1: P1 / G1, u2: P2 / G2 };
    },
    (t) => safe(t.u1, 2) && safe(t.u2, 2) && Math.abs(t.u1 - t.u2) >= 0.1,
  );
  const best = r.u1 < r.u2 ? 0 : 1;
  return {
    prompt: `Two monthly phone plans are shown. Plan A costs ${money(r.P1)} for $${r.G1}$ GB of data. Plan B costs ${money(r.P2)} for $${r.G2}$ GB. (a) Find the cost per gigabyte of each plan, to the nearest cent. (b) Which plan gives more data for the money?`,
    figure: { type: 'table', headers: ['Plan', 'Monthly cost', 'Data'], rows: [['A', cell(r.P1), `${r.G1} GB`], ['B', cell(r.P2), `${r.G2} GB`]] },
    parts: [moneyPart(r.u1, 'per GB', '(a) Plan A: \\$'), moneyPart(r.u2, 'per GB', 'Plan B: \\$'), { label: '(b)', answer: fixedChoice(['Plan A', 'Plan B'], best) }],
    hints: ['The cost per gigabyte is the monthly cost divided by the number of gigabytes.', 'The lower cost per gigabyte gives more data for each dollar.'],
    solution: [
      `Plan A: $\\dfrac{${mv(r.P1)}}{${r.G1}} ${eq(r.u1)}$, about ${money(r.u1)} per GB.`,
      `Plan B: $\\dfrac{${mv(r.P2)}}{${r.G2}} ${eq(r.u2)}$, about ${money(r.u2)} per GB.`,
      `Plan ${best ? 'B' : 'A'} has the lower cost per gigabyte. (Whether it is the right plan also depends on how much data you actually use.)`,
    ],
  };
}

/** Multi-step comparisons: savings, trip cost, pace versus speed. */
function compareMulti(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['savings', 'trip', 'pace'] as const);
  if (kind === 'savings') {
    const g = rng.pick(GROCERY.slice(0, 5));
    const SIZES = [200, 250, 300, 400, 500, 750, 1000, 1500, 2000];
    const r = retry(
      () => {
        const [s1, s2] = rng.sample(SIZES, 2).sort((a, b) => a - b);
        // Unit prices in whole even cents per 100 g, so every price is a whole number of cents.
        const u1 = (2 * rng.int(Math.ceil(g.lo * 50), Math.floor(g.hi * 50))) / 100;
        const u2 = (2 * rng.int(Math.ceil(g.lo * 50), Math.floor(g.hi * 50))) / 100;
        const Q = rng.int(2, 6);
        return { s1, s2, u1, u2, p1: roundTo((s1 / 100) * u1, 2), p2: roundTo((s2 / 100) * u2, 2), Q };
      },
      (t) => Math.abs(t.u1 - t.u2) >= 0.1 && t.s2 / t.s1 >= 2 && t.p1 > 1,
    );
    const save = roundTo(r.Q * 10 * Math.abs(r.u1 - r.u2), 2);
    const lo = Math.min(r.u1, r.u2);
    const hi = Math.max(r.u1, r.u2);
    const cheap = r.u1 < r.u2 ? r.s1 : r.s2;
    return {
      prompt: `${who} uses about ${q(r.Q, 'kg')} of ${g.item} a year. A store sells a ${sizeText(r.s1)} package for ${money(r.p1)} and a ${sizeText(r.s2)} package for ${money(r.p2)}. If prices stay the same, how much would ${who} save in a year by buying the size with the lower unit price instead of the other size? Give your answer to the nearest cent.`,
      figure: { type: 'table', headers: ['Package', 'Price'], rows: [[sizeText(r.s1), cell(r.p1)], [sizeText(r.s2), cell(r.p2)]] },
      parts: [moneyPart(save)],
      hints: ['Find each unit price per $100\\ \\text{g}$ first.', `${q(r.Q, 'kg')} is $${r.Q * 10}$ portions of $100\\ \\text{g}$. Multiply the difference in unit prices by that number.`],
      solution: [
        `${sizeText(r.s1)}: $${mv(r.p1)} \\div ${num(r.s1 / 100)} = ${mv(r.u1)}$ per $100\\ \\text{g}$. ${sizeText(r.s2)}: $${mv(r.p2)} \\div ${num(r.s2 / 100)} = ${mv(r.u2)}$ per $100\\ \\text{g}$.`,
        `The ${sizeText(cheap)} package has the lower unit price${cheap === r.s1 ? ' (the bigger package is not always the better buy)' : ''}. The difference is $${mv(hi)} - ${mv(lo)} = ${mv(hi - lo)}$ per $100\\ \\text{g}$.`,
        `${q(r.Q, 'kg')} $= ${r.Q * 10}$ portions of $100\\ \\text{g}$, so the saving is $${r.Q * 10} \\times ${mv(hi - lo)} = ${mv(save)}$.`,
        `${who} would save ${money(save)} in a year.`,
      ],
    };
  }
  if (kind === 'trip') {
    const r = retry(
      () => {
        const a = rng.float(5.5, 12, 1);
        const b = rng.float(5.5, 12, 1);
        const D = rng.int(3, 8) * 100;
        const F = roundTo((b * D) / 100, 2);
        const T = rng.int(6, 18) * 50;
        const p = rng.int(1299, 1699) / 1000;
        const diff = (T / 100) * Math.abs(a - b) * p;
        return { a, b, D, F, T, p, diff };
      },
      (t) => Math.abs(t.a - t.b) >= 0.6 && safe(t.diff, 2),
    );
    const [car1, car2] = rng.sample(['sedan', 'minivan', 'compact SUV', 'pickup truck', 'hatchback', 'station wagon'], 2);
    const better = r.a < r.b ? car1 : car2;
    const cA = (r.T / 100) * r.a * r.p;
    const cB = (r.T / 100) * r.b * r.p;
    return {
      prompt: `${who} is choosing which family vehicle to take on a ${q(r.T, 'km')} trip. The ${car1} is rated at $${fmt(r.a)}$ L/100 km. On its last fill-up, the ${car2} used ${q(r.F, 'L')} of gas to drive ${q(r.D, 'km')}. Gas costs \\$${fmtFixed(r.p, 3)} per litre. (a) What is the ${car2}'s fuel consumption in L/100 km? (b) How much less would the fuel for the trip cost in the more efficient vehicle, to the nearest cent?`,
      parts: [decPart(r.b, 1, 'L/100 km', '(a)'), moneyPart(r.diff, undefined, '(b) \\$')],
      hints: [`(a) Divide the litres by the number of hundreds of kilometres: $${num(r.F)} \\div ${r.D / 100}$.`, `(b) The trip is $${num(r.T / 100)}$ hundred kilometres. Find the litres each vehicle needs, then the cost of each, and subtract.`],
      solution: [
        `(a) ${cap(car2)}: $${num(r.F)} \\div ${r.D / 100} = ${num(r.b)}$ L/100 km.`,
        `(b) The trip is $${num(r.T)} \\div 100 = ${num(r.T / 100)}$ hundred kilometres.`,
        `${cap(car1)}: $${num(r.T / 100)} \\times ${num(r.a)} = ${num((r.T / 100) * r.a)}$ L, costing $${num((r.T / 100) * r.a)} \\times ${fmtFixed(r.p, 3)} ${eq(cA)}$`,
        `${cap(car2)}: $${num(r.T / 100)} \\times ${num(r.b)} = ${num((r.T / 100) * r.b)}$ L, costing $${num((r.T / 100) * r.b)} \\times ${fmtFixed(r.p, 3)} ${eq(cB)}$`,
        `Difference: $${num(Math.max(cA, cB))} - ${num(Math.min(cA, cB))} \\approx ${mv(r.diff)}$. The ${better} would save about ${money(r.diff)} on fuel.`,
      ],
    };
  }
  const [n1, n2] = rng.sample(PEOPLE, 2);
  const r = retry(
    () => {
      const m = rng.int(4, 7);
      const s = rng.pick([0, 10, 15, 20, 30, 40, 45, 50]);
      const pace = m + s / 60;
      const vA = 60 / pace;
      const vB = rng.float(8, 14, 1);
      return { m, s, pace, vA, vB };
    },
    (t) => safe(t.vA, 1) && Math.abs(t.vA - t.vB) >= 0.3,
  );
  const best = r.vA > r.vB ? 0 : 1;
  const paceTex = `${r.m}\\ \\text{min}${r.s ? `\\ ${r.s}\\ \\text{s}` : ''}`;
  return {
    prompt: `Running apps show rates in different ways. ${n1}'s app shows an average **pace** of $${paceTex}$ per kilometre. ${n2}'s app shows an average **speed** of $${fmt(r.vB)}$ km/h. (a) Change ${n1}'s pace to a speed in km/h, to the nearest tenth. (b) Who ran faster?`,
    parts: [decPart(r.vA, 1, 'km/h', `(a) ${n1}:`), { label: '(b)', answer: fixedChoice([n1, n2], best) }],
    hints: ['A pace is minutes per kilometre; a speed is kilometres per hour. They are reciprocal rates.', `Write the pace in minutes as a decimal, then find how many kilometres fit into $60$ minutes: $60 \\div \\text{pace}$.`],
    solution: [
      `Pace: $${paceTex} = ${r.m} + \\dfrac{${r.s}}{60} ${eq(r.pace)}$ min per km.`,
      `In $60$ minutes, ${n1} runs $60 \\div ${fmtFixed(r.pace, 4)} \\approx ${fmtFixed(r.vA, 3)}$ km, so the speed is about $${fmtFixed(r.vA, 1)}$ km/h.`,
      `Compare: $${fmtFixed(r.vA, 1)}$ km/h and $${fmt(r.vB)}$ km/h. ${best ? n2 : n1} ran faster.`,
    ],
  };
}

const rateCompare = skill({
  id: 'm202-rate-compare',
  name: 'Comparing rates and unit rates',
  description: 'Find unit rates and use them to compare options such as prices, fuel consumption and speeds.',
  outcomes: ['M1'],
  lessonId: 'm202-8-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return unitRate(rng);
    if (d === 2) return compareTwo(rng);
    return compareMulti(rng);
  },
});

// ---------------------------------------------------------------------------
// Rate graphs
// ---------------------------------------------------------------------------

interface LineCtx {
  story: (who: string) => string;
  x: string;
  y: string;
  xMax: number;
  rates: number[];
  starts: number[];
  unit: string;
  money: boolean;
  /** The units of the slope in words. */
  words: string;
  meaning: (who: string, r: string) => string;
}
const LINE_CTX: LineCtx[] = [
  {
    story: (w) => `The graph shows the distance ${w} cycles on a long ride.`,
    x: 'Time (h)', y: 'Distance (km)', xMax: 6, rates: [12, 14, 15, 16, 18, 20, 22, 24], starts: [0], unit: 'km/h', money: false, words: 'kilometres per hour',
    meaning: (w, r) => `${w} rides $${r}$ km every hour: an average speed of $${r}$ km/h.`,
  },
  {
    story: () => 'The graph shows the volume of water in a stock tank as it fills.',
    x: 'Time (min)', y: 'Volume (L)', xMax: 10, rates: [15, 20, 25, 30, 35, 40, 45], starts: [0, 50, 100], unit: 'L/min', money: false, words: 'litres per minute',
    meaning: (_w, r) => `The volume increases by $${r}$ L every minute: the tank fills at $${r}$ L/min.`,
  },
  {
    story: (w) => `The graph shows ${w}'s earnings at a part-time job.`,
    x: 'Hours worked', y: 'Earnings ($)', xMax: 10, rates: [16, 17, 18, 19, 20, 21, 22], starts: [0], unit: 'per hour', money: true, words: 'dollars per hour',
    meaning: (w, r) => `${w} earns \\$${r} for each hour worked.`,
  },
  {
    story: () => 'The graph shows the cost of bulk trail mix at a store.',
    x: 'Mass (kg)', y: 'Cost ($)', xMax: 5, rates: [9, 11, 12, 14, 16, 18], starts: [0], unit: 'per kg', money: true, words: 'dollars per kilogram',
    meaning: (_w, r) => `The trail mix costs \\$${r} for each kilogram.`,
  },
  {
    story: () => 'The graph shows the data downloaded while a game update installs.',
    x: 'Time (s)', y: 'Data downloaded (MB)', xMax: 10, rates: [6, 8, 12, 15, 25, 30], starts: [0, 20, 50], unit: 'MB/s', money: false, words: 'megabytes per second',
    meaning: (_w, r) => `$${r}$ MB of data downloads each second: a rate of $${r}$ MB/s.`,
  },
];

/** A tidy grid step for an axis that goes up to `max`. */
function niceStep(max: number): number {
  for (const s of [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]) if (max / s <= 10) return s;
  return 2000;
}

function lineGraph(rng: Rng): GenOutput {
  const c = rng.pick(LINE_CTX);
  const who = rng.pick(PEOPLE);
  const r = rng.pick(c.rates);
  const b = rng.pick(c.starts);
  const top = b + r * c.xMax;
  const yStep = niceStep(top);
  const yMax = Math.ceil(top / yStep) * yStep;
  const x1 = rng.int(1, 2);
  const x2 = rng.int(c.xMax - 2, c.xMax - 1);
  const y1 = b + r * x1;
  const y2 = b + r * x2;
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: c.xMax, yMin: 0, yMax, xStep: 1, yStep, xLabel: c.x, yLabel: c.y },
    polylines: [{ points: [[0, b], [c.xMax, top]] }],
    points: [
      { x: x1, y: y1, label: `(${x1}, ${y1})` },
      { x: x2, y: y2, label: `(${x2}, ${y2})` },
    ],
  };
  return {
    prompt: `${c.story(who)} What is the rate of change shown by the graph, and what does it mean?`,
    figure: fig,
    parts: [c.money ? moneyPart(r, c.unit, 'Rate: \\$') : exactPart(r, c.unit, 'Rate:')],
    hints: ['The rate of change is the slope of the graph: $\\dfrac{\\text{change in } y}{\\text{change in } x}$.', `Use the two labelled points: $(${x1}, ${y1})$ and $(${x2}, ${y2})$.`],
    solution: [
      `Rate of change $= \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${y2} - ${y1}}{${x2} - ${x1}} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${r}$`,
      `The units of the slope are the vertical units over the horizontal units: ${c.words}.`,
      c.meaning(who, String(r)),
    ],
  };
}

interface PieceCtx {
  story: (who: string) => string;
  x: string;
  y: string;
  xStep: number;
  yStep: number;
  unit: string;
  fastest: (who: string) => string;
  zero: (who: string) => string;
  zeroWhy: string;
  rising: string;
  falling: string;
  /** Largest realistic rate (in size). */
  maxRate: number;
}
const PIECE_CTX: PieceCtx[] = [
  {
    story: (w) => `${w} goes for a bike ride. The graph shows ${w}'s distance from home.`,
    x: 'Time (h)', y: 'Distance from home (km)', xStep: 0.5, yStep: 5, unit: 'km/h',
    fastest: (w) => `During which segment was ${w} riding fastest?`,
    zero: (w) => `During which segment was ${w} stopped?`,
    zeroWhy: 'A horizontal segment means the distance from home did not change: a rate of $0$ km/h.',
    rising: 'riding away from home at', falling: 'riding back toward home at', maxRate: 30,
  },
  {
    story: () => 'A hot tub is filled, used, and then partly drained. The graph shows the volume of water in the tub.',
    x: 'Time (min)', y: 'Volume (L)', xStep: 10, yStep: 100, unit: 'L/min',
    fastest: () => 'During which segment was the volume of water changing fastest?',
    zero: () => 'During which segment was the volume of water not changing?',
    zeroWhy: 'A horizontal segment means the volume stayed the same: a rate of $0$ L/min.',
    rising: 'filling at', falling: 'draining at', maxRate: 50,
  },
  {
    story: (w) => `${w} hikes a steep mountain trail. The graph shows ${w}'s height above the trailhead.`,
    x: 'Time (h)', y: 'Height above trailhead (m)', xStep: 0.5, yStep: 100, unit: 'm/h',
    fastest: (w) => `During which segment was ${w}'s height changing fastest?`,
    zero: (w) => `During which segment was ${w} resting (or walking on level ground)?`,
    zeroWhy: 'A horizontal segment means the height did not change: a rate of $0$ m/h.',
    rising: 'climbing at', falling: 'descending at', maxRate: 800,
  },
];
const SEG = ['A', 'B', 'C', 'D'];

/** A piecewise graph whose corners sit on grid points. */
function buildPieces(rng: Rng, c: PieceCtx, opts: { noDown?: boolean } = {}) {
  return retry(
    () => {
      const n = rng.int(3, 4);
      const durs: number[] = [];
      const rises: number[] = [];
      const zeroAt = rng.int(1, n - 1);
      for (let i = 0; i < n; i++) {
        durs.push(rng.int(1, 2));
        if (i === zeroAt) rises.push(0);
        else if (i === n - 1 && !opts.noDown && rng.chance(0.6)) rises.push(-rng.int(1, 5));
        else rises.push(rng.int(1, 5));
      }
      const xs = [0];
      const ys = [0];
      for (let i = 0; i < n; i++) {
        xs.push(xs[i] + durs[i]);
        ys.push(ys[i] + rises[i]);
      }
      const rates = rises.map((rise, i) => (rise * c.yStep) / (durs[i] * c.xStep));
      return { n, durs, rises, xs, ys, rates, zeroAt };
    },
    (t) =>
      t.ys.every((y) => y >= 0 && y <= 10) &&
      t.xs[t.n] <= 8 &&
      new Set(t.rates.map((x) => Math.abs(x))).size === t.n &&
      t.rates.every((x) => isWhole(x) && Math.abs(x) <= c.maxRate),
    300,
  );
}

function pieceFigure(c: PieceCtx, xs: number[], ys: number[]): PlaneFigure {
  const yTop = Math.max(...ys) + 1;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: xs[xs.length - 1] * c.xStep, yMin: 0, yMax: yTop * c.yStep, xStep: c.xStep, yStep: c.yStep, xLabel: c.x, yLabel: c.y },
    polylines: [{ points: xs.map((x, i) => [x * c.xStep, ys[i] * c.yStep] as [number, number]) }],
    segmentLabels: SEG.slice(0, xs.length - 1),
  };
}

function pieceGraph(rng: Rng): GenOutput {
  const c = rng.pick(PIECE_CTX);
  const who = rng.pick(PEOPLE);
  const p = buildPieces(rng, c);
  const fig = pieceFigure(c, p.xs, p.ys);
  const X = (i: number) => fmt(p.xs[i] * c.xStep);
  const Y = (i: number) => fmt(p.ys[i] * c.yStep);
  const choices = SEG.slice(0, p.n).map((s) => `Segment ${s}`);
  const ask = rng.pick(['fastest', 'zero', 'rate'] as const);
  if (ask === 'rate') {
    const ups = p.rates.map((r, i) => (r > 0 ? i : -1)).filter((i) => i >= 0);
    const i = rng.pick(ups);
    return {
      prompt: `${c.story(who)} What was the rate of change during segment ${SEG[i]}, in ${c.unit}?`,
      figure: fig,
      parts: [exactPart(p.rates[i], c.unit)],
      hints: ['Read the coordinates at the start and end of the segment from the grid.', 'Rate of change $= \\dfrac{\\text{change in } y}{\\text{change in } x}$ for that segment.'],
      solution: [
        `Segment ${SEG[i]} runs from $(${X(i)}, ${Y(i)})$ to $(${X(i + 1)}, ${Y(i + 1)})$.`,
        `Rate $= \\dfrac{${Y(i + 1)} - ${Y(i)}}{${X(i + 1)} - ${X(i)}} = ${fmt(p.rates[i])}$ ${c.unit}`,
        `During segment ${SEG[i]}, ${c === PIECE_CTX[1] ? 'the tub was' : `${who} was`} ${c.rising} $${fmt(p.rates[i])}$ ${c.unit}.`,
      ],
    };
  }
  if (ask === 'zero') {
    return {
      prompt: `${c.story(who)} ${c.zero(who)}`,
      figure: fig,
      parts: [{ answer: fixedChoice(choices, p.zeroAt) }],
      hints: ['A rate of change of zero means the quantity on the vertical axis is not changing.', 'Look for a horizontal segment.'],
      solution: [c.zeroWhy, `That is segment ${SEG[p.zeroAt]}.`],
    };
  }
  const abs = p.rates.map(Math.abs);
  const i = abs.indexOf(Math.max(...abs));
  return {
    prompt: `${c.story(who)} ${c.fastest(who)}`,
    figure: fig,
    parts: [{ answer: fixedChoice(choices, i) }],
    hints: ['The rate of change is the slope of each segment. A steeper segment means a faster rate.', 'A segment going down can still be steep. Compare how steep the segments are, not just whether they rise.'],
    solution: [
      `The rates (slopes) are: ${p.rates.map((r, k) => `${SEG[k]}: $${fmt(r)}$`).join(', ')} ${c.unit}.`,
      `The steepest segment (largest rate in size) is segment ${SEG[i]}, at $${fmt(abs[i])}$ ${c.unit}.`,
    ],
  };
}

function graphMulti(rng: Rng): GenOutput {
  const kind = rng.pick(['two', 'average', 'meaning'] as const);
  if (kind === 'two') {
    const [n1, n2] = rng.sample(PEOPLE, 2);
    const r = retry(
      () => {
        const r1 = rng.int(2, 8) * 5;
        const r2 = rng.int(2, 8) * 5;
        const meet = rng.int(4, 6);
        const b2 = rng.int(1, 8) * 25;
        const b1 = b2 + (r2 - r1) * meet;
        return { r1, r2, meet, b1, b2 };
      },
      (t) => t.r2 - t.r1 >= 10 && t.b1 > t.b2 && t.b1 <= 300,
    );
    const xMax = 10;
    const top = Math.max(r.b1 + r.r1 * xMax, r.b2 + r.r2 * xMax);
    const yStep = niceStep(top);
    const fig: PlaneFigure = {
      type: 'plane',
      grid: { xMin: 0, xMax, yMin: 0, yMax: Math.ceil(top / yStep) * yStep, xStep: 1, yStep, xLabel: 'Week', yLabel: 'Savings ($)' },
      // The line that ends higher comes first, so its label sits above its end and the other's below.
      lines: [
        { through: [[0, r.b2], [xMax, r.b2 + r.r2 * xMax]], label: n2, color: 'accent' },
        { through: [[0, r.b1], [xMax, r.b1 + r.r1 * xMax]], label: n1, color: 'brand' },
      ],
      points: [
        { x: 0, y: r.b1, label: `(0, ${r.b1})`, color: 'brand' },
        { x: 2, y: r.b1 + 2 * r.r1, label: `(2, ${r.b1 + 2 * r.r1})`, color: 'brand' },
        { x: 0, y: r.b2, label: `(0, ${r.b2})`, color: 'accent' },
        { x: 8, y: r.b2 + 8 * r.r2, label: `(8, ${r.b2 + 8 * r.r2})`, color: 'accent' },
      ],
    };
    return {
      prompt: `${n1} and ${n2} are saving for a trip. The graph shows their savings over $10$ weeks; each saves the same amount every week. (a) How much more does ${n2} save per week than ${n1}? (b) After how many weeks do they have the same amount saved?`,
      figure: fig,
      parts: [moneyPart(r.r2 - r.r1, 'per week', '(a) \\$'), exactPart(r.meet, 'weeks', '(b)')],
      hints: ['Each person’s weekly saving is the slope (rate of change) of their line. Use the labelled points.', 'They have the same savings where the lines cross. Each week the gap shrinks by the difference in their rates.'],
      solution: [
        `${n1}: from $(0, ${r.b1})$ to $(2, ${r.b1 + 2 * r.r1})$, a rate of $\\dfrac{${2 * r.r1}}{2} = ${r.r1}$ dollars per week.`,
        `${n2}: from $(0, ${r.b2})$ to $(8, ${r.b2 + 8 * r.r2})$, a rate of $\\dfrac{${8 * r.r2}}{8} = ${r.r2}$ dollars per week.`,
        `(a) ${n2} saves ${money(r.r2 - r.r1)} more per week.`,
        `(b) ${n1} starts ${money(r.b1 - r.b2)} ahead, and the gap shrinks by ${money(r.r2 - r.r1)} each week: $${r.b1 - r.b2} \\div ${r.r2 - r.r1} = ${r.meet}$. The lines cross after $${r.meet}$ weeks.`,
      ],
    };
  }
  if (kind === 'average') {
    const c = PIECE_CTX[0];
    const who = rng.pick(PEOPLE);
    const p = retry(
      () => buildPieces(rng, c, { noDown: true }),
      (t) => safe((t.ys[t.n] * c.yStep) / (t.xs[t.n] * c.xStep), 1) && !isWhole((t.ys[t.n] * c.yStep) / (t.xs[t.n] * c.xStep)),
    );
    const D = p.ys[p.n] * c.yStep;
    const T = p.xs[p.n] * c.xStep;
    const avg = D / T;
    const fast = Math.max(...p.rates);
    return {
      prompt: `${who} goes for a bike ride and stops once for a break. The graph shows ${who}'s distance from home. What was ${who}'s average speed for the whole ride, including the break, to the nearest tenth of a km/h?`,
      figure: pieceFigure({ ...c }, p.xs, p.ys),
      parts: [decPart(avg, 1, 'km/h')],
      hints: ['Average speed for the whole ride = total distance ÷ total time.', 'Read the end point of the graph. The break counts as part of the total time.'],
      solution: [
        `The ride ends at $(${fmt(T)}, ${D})$: $${D}$ km in $${fmt(T)}$ h.`,
        `Average speed $= \\dfrac{${D}}{${fmt(T)}} ${eq(avg, 3)}$ km/h`,
        `The average speed is about $${fmtFixed(avg, 1)}$ km/h. It is less than the fastest segment ($${fmt(fast)}$ km/h) because the average includes the slow parts and the break.`,
      ],
    };
  }
  const c = rng.pick(PIECE_CTX);
  const who = rng.pick(PEOPLE);
  const p = buildPieces(rng, c);
  const nonZero = p.rates.map((r, i) => (r !== 0 ? i : -1)).filter((i) => i >= 0);
  const i = rng.pick(nonZero);
  const rate = p.rates[i];
  const a = Math.abs(rate);
  const [yWord, xWord] = c === PIECE_CTX[0] ? ['km', 'hour'] : c === PIECE_CTX[1] ? ['L', 'minute'] : ['m', 'hour'];
  const subject = c === PIECE_CTX[1] ? 'The tub is' : `${who} is`;
  const correct = `${subject} ${rate > 0 ? c.rising : c.falling} $${fmt(a)}$ ${yWord} per ${xWord}.`;
  const wrongDir = `${subject} ${rate > 0 ? c.falling : c.rising} $${fmt(a)}$ ${yWord} per ${xWord}.`;
  const total = c === PIECE_CTX[1] ? `The tub holds $${fmt(a)}$ L of water at that time.` : `${who} is $${fmt(a)}$ ${yWord} from the start at that time.`;
  const flip = `It takes $${fmt(a)}$ ${xWord}s to change by $1$ ${yWord}.`;
  return {
    prompt: `${c.story(who)} The slope of segment ${SEG[i]} is $${fmt(rate)}$ ${c.unit}. What does this slope tell you?`,
    figure: pieceFigure(c, p.xs, p.ys),
    parts: [{ answer: mc(rng, correct, [wrongDir, total, flip]) }],
    hints: ['A slope is a rate: the change in the vertical quantity for each one unit of the horizontal quantity.', 'A positive slope means the quantity is increasing; a negative slope means it is decreasing.'],
    solution: [
      `The slope has units of ${c.unit}: $${fmt(a)}$ ${yWord} for every ${xWord}.`,
      `The slope is ${rate > 0 ? 'positive, so the quantity is increasing' : 'negative, so the quantity is decreasing'}.`,
      correct,
    ],
  };
}

const rateGraph = skill({
  id: 'm202-rate-graph',
  name: 'Rates as slopes of graphs',
  description: 'Interpret a rate as the slope of a graph, find it from two points, and compare rates on different parts of a graph.',
  outcomes: ['M1'],
  lessonId: 'm202-8-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return lineGraph(rng);
    if (d === 2) return pieceGraph(rng);
    return graphMulti(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — Solving rate problems
// ---------------------------------------------------------------------------

function rateOneStep(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['time', 'gas', 'distance', 'dose', 'hose'] as const);
  if (kind === 'time') {
    const r = retry(
      () => ({ D: rng.int(120, 480), v: rng.pick([80, 85, 90, 95, 100, 105, 110]) }),
      (t) => safe(t.D / t.v, 1) && !hasDp(t.D / t.v, 1),
    );
    const t = r.D / r.v;
    return {
      prompt: `${who} plans a ${q(r.D, 'km')} drive at an average speed of $${r.v}$ km/h. How long will the drive take, in hours, to the nearest tenth?`,
      parts: [decPart(t, 1, 'h')],
      hints: ['Time = distance ÷ speed.', `Divide ${q(r.D, 'km')} by $${r.v}$ km/h. The kilometres cancel and leave hours.`],
      solution: [`$t = \\dfrac{d}{v} = \\dfrac{${r.D}\\ \\text{km}}{${r.v}\\ \\text{km/h}} \\approx ${fmtFixed(t, 3)}$ h`, `The drive will take about $${fmtFixed(t, 1)}$ h.`],
    };
  }
  if (kind === 'gas') {
    const r = retry(
      () => ({ L: rng.float(25, 70, 1), p: rng.int(1299, 1699) / 1000 }),
      (t) => safe(t.L * t.p, 2),
    );
    const c = r.L * r.p;
    return {
      prompt: `Gas costs \\$${fmtFixed(r.p, 3)} per litre. ${who} buys ${q(r.L, 'L')}. What is the total cost, to the nearest cent?`,
      parts: [moneyPart(c)],
      hints: ['The price is a rate: dollars per litre.', 'Multiply the number of litres by the price per litre.'],
      solution: [`$${num(r.L)}\\ \\text{L} \\times ${fmtFixed(r.p, 3)}$ dollars per litre $${eq(c)}$`, `The gas costs ${money(c)}.`],
    };
  }
  if (kind === 'distance') {
    const v = rng.int(14, 26);
    const h = rng.int(1, 3);
    const m = rng.pick([15, 30, 45]);
    const t = h + m / 60;
    const D = v * t;
    return {
      prompt: `${who} cycles at an average speed of $${v}$ km/h for ${hm(h, m)}. How far does ${who} travel?`,
      parts: [exactPart(D, 'km')],
      hints: ['Distance = speed × time, with the time in hours.', `$${m}$ minutes is $\\dfrac{${m}}{60} = ${fmt(m / 60)}$ of an hour.`],
      solution: [`Time: ${hm(h, m)} $= ${fmt(t)}$ h`, `$d = v t = ${v} \\times ${fmt(t)} = ${fmt(D)}$`, `${who} travels ${q(D, 'km')}.`],
    };
  }
  if (kind === 'dose') {
    const per = rng.pick([2, 4, 5, 8, 10, 12, 15]);
    const mass = rng.float(4, 40, 1);
    const dose = per * mass;
    const pet = rng.pick(['dog', 'cat', 'goat', 'sheep']);
    return {
      prompt: `A veterinarian's instructions say to give $${per}$ mg of a medicine for each kilogram of an animal's mass. ${who}'s ${pet} has a mass of ${q(mass, 'kg')}. How many milligrams of medicine should the ${pet} get?`,
      parts: [exactPart(dose, 'mg')],
      hints: ['The dose is a rate: milligrams per kilogram.', 'Multiply the rate by the mass.'],
      solution: [`$${per}\\ \\text{mg/kg} \\times ${num(mass)}\\ \\text{kg} = ${num(dose)}\\ \\text{mg}$`, `The ${pet} should get $${num(dose)}$ mg.`],
    };
  }
  const r = rng.pick([12, 15, 18, 20, 24, 25, 30]);
  const V = r * rng.int(8, 40);
  return {
    prompt: `A garden hose delivers water at $${r}$ L/min. How many minutes will it take to fill a ${q(V, 'L')} stock tank for ${who}'s horses?`,
    parts: [exactPart(V / r, 'min')],
    hints: ['Time = amount ÷ rate.', `Divide the volume by $${r}$ L/min.`],
    solution: [`$t = \\dfrac{${num(V)}\\ \\text{L}}{${r}\\ \\text{L/min}} = ${V / r}$ min`, `It will take $${V / r}$ minutes.`],
  };
}

function rateTwoStep(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['tripcost', 'pool', 'paint', 'minutes', 'shifts'] as const);
  if (kind === 'tripcost') {
    const r = retry(
      () => ({ D: rng.int(150, 900), f: rng.float(5.5, 13, 1), p: rng.int(1299, 1699) / 1000 }),
      (t) => safe((t.D / 100) * t.f * t.p, 2),
    );
    const L = (r.D / 100) * r.f;
    const c = L * r.p;
    return {
      prompt: `${who} is driving ${q(r.D, 'km')} to visit family. The car uses $${fmt(r.f)}$ L/100 km, and gas costs \\$${fmtFixed(r.p, 3)} per litre. How much will the gas for the drive cost, to the nearest cent?`,
      parts: [moneyPart(c)],
      hints: [`First find the litres needed: the drive is $${num(r.D / 100)}$ hundred kilometres.`, 'Then multiply the litres by the price per litre.'],
      solution: [
        `Litres: $\\dfrac{${r.D}}{100} \\times ${fmt(r.f)} ${eq(L)}$ L`,
        `Cost: $${num(L)} \\times ${fmtFixed(r.p, 3)} ${eq(c)}$`,
        `The gas will cost about ${money(c)}.`,
      ],
    };
  }
  if (kind === 'pool') {
    const r = retry(
      () => {
        const l = rng.int(5, 12);
        const w = rng.int(3, 6);
        const dep = rng.pick([1.2, 1.4, 1.5, 1.6, 1.8]);
        const rate = rng.pick([40, 50, 60, 75, 80, 90, 100]);
        const V = l * w * dep;
        return { l, w, dep, rate, V, h: (V * 1000) / rate / 60 };
      },
      (t) => safe(t.h, 1) && !hasDp(t.h, 1),
    );
    return {
      prompt: `A backyard pool is a rectangular prism $${r.l}$ m long, $${r.w}$ m wide and $${fmt(r.dep)}$ m deep. It is filled with a hose that delivers $${r.rate}$ L/min. How many hours will it take to fill the pool, to the nearest tenth? (Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.)`,
      figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${r.l} m`, w: `${r.w} m`, h: `${fmt(r.dep)} m` } } as SolidFigure,
      parts: [decPart(r.h, 1, 'h')],
      hints: ['Find the volume in cubic metres, then change it to litres.', 'Divide by the rate to get minutes, then divide by $60$ to get hours.'],
      solution: [
        `Volume: $${r.l} \\times ${r.w} \\times ${fmt(r.dep)} = ${fmt(r.V)}\\ \\text{m}^3 = ${num(r.V * 1000)}\\ \\text{L}$`,
        `Minutes: $${num(r.V * 1000)} \\div ${r.rate} ${eq((r.V * 1000) / r.rate)}$ min`,
        `Hours: $${num((r.V * 1000) / r.rate)} \\div 60 \\approx ${fmtFixed(r.h, 3)}$ h`,
        `It will take about $${fmtFixed(r.h, 1)}$ hours.`,
      ],
    };
  }
  if (kind === 'paint') {
    const r = retry(
      () => {
        const area = rng.int(40, 140);
        const cover = rng.pick([8.5, 9, 9.5, 10, 11]);
        const can = 3.78;
        const L = area / cover;
        return { area, cover, can, L, cans: Math.ceil(L / can - 1e-9) };
      },
      (t) => t.L / t.can - Math.floor(t.L / t.can) > 0.1 && t.L / t.can - Math.floor(t.L / t.can) < 0.9,
    );
    return {
      prompt: `${who} is painting a basement. The walls have a total area of ${qa(r.area, 'm', 2)}. The label says one litre of paint covers ${qa(r.cover, 'm', 2)}, and the paint comes in ${q(r.can, 'L')} cans. How many cans must ${who} buy for one coat?`,
      parts: [exactPart(r.cans, 'cans')],
      hints: ['Find how many litres are needed: area ÷ coverage rate.', 'Then divide by the size of a can and round **up**: you cannot buy part of a can.'],
      solution: [
        `Litres needed: $${r.area} \\div ${fmt(r.cover)} \\approx ${fmtFixed(r.L, 2)}$ L`,
        `Cans: $${fmtFixed(r.L, 2)} \\div ${fmt(r.can)} \\approx ${fmtFixed(r.L / r.can, 2)}$`,
        `Round up: ${who} must buy $${r.cans}$ cans.`,
      ],
    };
  }
  if (kind === 'minutes') {
    const r = retry(
      () => ({ D: rng.int(40, 420), v: rng.pick([60, 70, 80, 90, 100, 110]) }),
      (t) => safe((t.D / t.v) * 60, 0) && !isWhole((t.D / t.v) * 60),
    );
    const t = r.D / r.v;
    const mins = t * 60;
    return {
      prompt: `A bus travels ${q(r.D, 'km')} at an average speed of $${r.v}$ km/h. How many minutes does the trip take, to the nearest minute?`,
      parts: [decPart(mins, 0, 'min')],
      hints: ['Find the time in hours first: distance ÷ speed.', 'Then change hours to minutes: multiply by $60$.'],
      solution: [`$t = \\dfrac{${r.D}}{${r.v}} \\approx ${fmtFixed(t, 4)}$ h`, `$${fmtFixed(t, 4)} \\times 60 \\approx ${fmtFixed(mins, 2)}$ min`, `The trip takes about $${fmtFixed(mins, 0)}$ minutes${mins >= 60 ? ` (${Math.floor(Math.round(mins) / 60)} h ${Math.round(mins) % 60} min)` : ''}.`],
    };
  }
  const w = rng.int(1650, 2800) / 100;
  const n = rng.int(3, 5);
  const h = rng.pick([4, 4.5, 5, 6, 6.5, 7.5, 8]);
  const pay = roundTo(w * n * h, 2);
  return {
    prompt: `${who} earns ${money(w)} per hour at a part-time job. This week ${who} works $${n}$ shifts of $${fmt(h)}$ hours each. What is ${who}'s pay for the week before deductions, to the nearest cent?`,
    parts: [moneyPart(pay)],
    hints: ['Find the total hours worked first.', 'Then multiply by the hourly rate.'],
    solution: [`Hours: $${n} \\times ${fmt(h)} = ${fmt(n * h)}$ h`, `Pay: $${fmt(n * h)} \\times ${mv(w)} ${eq(w * n * h)}$`, `${who} earns ${money(pay)} before deductions.`],
  };
}

function rateMulti(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['hoses', 'leak', 'average', 'pace', 'carpool'] as const);
  if (kind === 'hoses' || kind === 'leak') {
    const r = retry(
      () => {
        const r1 = rng.int(15, 45);
        const r2 = kind === 'hoses' ? rng.int(10, 40) : rng.int(3, 9);
        const V = rng.int(30, 90) * 100;
        const net = kind === 'hoses' ? r1 + r2 : r1 - r2;
        return { r1, r2, V, net, h: V / net / 60 };
      },
      (t) => safe(t.h, 1) && !hasDp(t.h, 1) && t.h > 1,
    );
    return {
      prompt:
        kind === 'hoses'
          ? `Two hoses fill a ${q(r.V, 'L')} backyard pool at the same time: one delivers $${r.r1}$ L/min and the other $${r.r2}$ L/min. How many hours will it take, to the nearest tenth?`
          : `${who} is filling an above-ground pool that holds ${q(r.V, 'L')}. The hose delivers $${r.r1}$ L/min, but a leaky fitting loses $${r.r2}$ L/min the whole time. How many hours will it take to fill the pool, to the nearest tenth?`,
      parts: [decPart(r.h, 1, 'h')],
      hints: [
        kind === 'hoses' ? 'When two hoses work together, their rates add.' : 'The leak works against the hose, so subtract its rate.',
        'Divide the volume by the combined rate to get minutes, then change to hours.',
      ],
      solution: [
        kind === 'hoses' ? `Combined rate: $${r.r1} + ${r.r2} = ${r.net}$ L/min` : `Net rate: $${r.r1} - ${r.r2} = ${r.net}$ L/min`,
        `Minutes: $${num(r.V)} \\div ${r.net} \\approx ${fmtFixed(r.V / r.net, 2)}$ min`,
        `Hours: $${fmtFixed(r.V / r.net, 2)} \\div 60 \\approx ${fmtFixed(r.h, 3)}$ h`,
        `It will take about $${fmtFixed(r.h, 1)}$ hours.`,
      ],
    };
  }
  if (kind === 'average') {
    const r = retry(
      () => {
        const D1 = rng.int(4, 30) * 10;
        const D2 = rng.int(4, 30) * 10;
        const v1 = rng.pick([50, 60, 70, 80, 90, 100, 110]);
        const v2 = rng.pick([50, 60, 70, 80, 90, 100, 110]);
        const T = D1 / v1 + D2 / v2;
        return { D1, D2, v1, v2, T, avg: (D1 + D2) / T };
      },
      (t) => t.v1 !== t.v2 && safe(t.avg, 1) && Math.abs(t.avg - (t.v1 + t.v2) / 2) > 0.5,
    );
    return {
      prompt: `${who} drives ${q(r.D1, 'km')} on a highway at an average of $${r.v1}$ km/h, then ${q(r.D2, 'km')} on a secondary road at an average of $${r.v2}$ km/h. What is the average speed for the whole trip, to the nearest tenth of a km/h?`,
      parts: [decPart(r.avg, 1, 'km/h')],
      hints: ['The average speed is total distance ÷ total time. It is usually **not** the mean of the two speeds.', 'Find the time for each part (distance ÷ speed), then add.'],
      solution: [
        `Time for part 1: $${r.D1} \\div ${r.v1} \\approx ${fmtFixed(r.D1 / r.v1, 4)}$ h. Time for part 2: $${r.D2} \\div ${r.v2} \\approx ${fmtFixed(r.D2 / r.v2, 4)}$ h.`,
        `Total: $${r.D1 + r.D2}$ km in about $${fmtFixed(r.T, 4)}$ h.`,
        `Average speed: $${r.D1 + r.D2} \\div ${fmtFixed(r.T, 4)} \\approx ${fmtFixed(r.avg, 3)}$ km/h`,
        `The average speed is about $${fmtFixed(r.avg, 1)}$ km/h. (The mean of the two speeds, $${fmt((r.v1 + r.v2) / 2)}$ km/h, is not correct: ${who} spent different amounts of time at each speed.)`,
      ],
    };
  }
  if (kind === 'pace') {
    const r = retry(
      () => {
        const m = rng.int(4, 7);
        const s = rng.pick([10, 15, 20, 30, 40, 45, 50]);
        const D = rng.pick([5, 10, 15, 21.1]);
        const pace = m + s / 60;
        return { m, s, D, pace, T: pace * D };
      },
      (t) => safe(t.T, 0),
    );
    return {
      prompt: `${who} is training for a city road race and can hold a steady pace of $${r.m}\\ \\text{min}\\ ${r.s}\\ \\text{s}$ per kilometre. At that pace, how many minutes will a ${q(r.D, 'km')} race take, to the nearest minute?`,
      parts: [decPart(r.T, 0, 'min')],
      hints: ['Write the pace in minutes as a decimal first.', 'Time = pace × distance, because the pace is minutes per kilometre.'],
      solution: [
        `Pace: $${r.m} + \\dfrac{${r.s}}{60} ${eq(r.pace)}$ min/km`,
        `Time: $${fmtFixed(r.pace, 4)} \\times ${fmt(r.D)} \\approx ${fmtFixed(r.T, 2)}$ min`,
        `The race will take about $${fmtFixed(r.T, 0)}$ minutes (${Math.floor(Math.round(r.T) / 60) ? `${Math.floor(Math.round(r.T) / 60)} h ` : ''}${Math.round(r.T) % 60} min).`,
      ],
    };
  }
  const r = retry(
    () => {
      const D = rng.int(15, 60);
      const days = 5;
      const f = rng.float(6, 11, 1);
      const p = rng.int(1299, 1699) / 1000;
      const n = rng.int(2, 4);
      const total = 2 * D * days;
      const cost = (total / 100) * f * p;
      return { D, days, f, p, n, total, cost, each: cost / n };
    },
    (t) => safe(t.each, 2),
  );
  return {
    prompt: `${who} drives a carpool to work: the trip is ${q(r.D, 'km')} each way, $${r.days}$ days a week. The car uses $${fmt(r.f)}$ L/100 km and gas costs \\$${fmtFixed(r.p, 3)} per litre. If the gas cost is shared equally by the $${r.n}$ people in the car, how much does each person pay per week, to the nearest cent?`,
    parts: [moneyPart(r.each)],
    hints: ['Find the total distance for the week first: there and back, five days.', 'Then litres, then cost, then share the cost.'],
    solution: [
      `Distance: $2 \\times ${r.D} \\times ${r.days} = ${r.total}$ km`,
      `Litres: $\\dfrac{${r.total}}{100} \\times ${fmt(r.f)} ${eq((r.total / 100) * r.f)}$ L`,
      `Cost: $${num((r.total / 100) * r.f)} \\times ${fmtFixed(r.p, 3)} ${eq(r.cost)}$`,
      `Each person: $${fmtFixed(r.cost, 4)} \\div ${r.n} ${eq(r.each)}$, so each pays about ${money(r.each)} per week.`,
    ],
  };
}

const rateApply = skill({
  id: 'm202-rate-apply',
  name: 'Solving rate problems',
  description: 'Solve one-step and multi-step problems with rates such as speed, flow, fuel consumption and pay.',
  outcomes: ['M1'],
  lessonId: 'm202-8-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rateOneStep(rng);
    if (d === 2) return rateTwoStep(rng);
    return rateMulti(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.3 — Scale factors and scale diagrams
// ---------------------------------------------------------------------------

const TYPE = ['Enlargement', 'Reduction'];

const SF_SAME = [
  { what: 'photo', part: 'width', u: 'cm', base: [10, 12, 13, 15, 18, 20], ks: [1.5, 2, 2.5, 3, 0.5, 0.75] },
  { what: 'logo', part: 'height', u: 'cm', base: [4, 6, 8, 12, 16, 20], ks: [0.25, 0.5, 0.75, 1.5, 2, 3] },
  { what: 'floor tile design', part: 'side', u: 'cm', base: [8, 10, 15, 20, 30], ks: [0.4, 0.6, 1.2, 2.5, 4] },
  { what: 'poster', part: 'length', u: 'cm', base: [40, 50, 60, 80, 90], ks: [0.2, 0.25, 0.5, 1.5, 2] },
];

function scaleSame(rng: Rng): GenOutput {
  const c = rng.pick(SF_SAME);
  const who = rng.pick(PEOPLE);
  const r = retry(
    () => {
      const L = rng.pick(c.base);
      const k = rng.pick(c.ks);
      return { L, k, N: roundTo(L * k, 4) };
    },
    (t) => hasDp(t.N, 1),
  );
  const big = r.k > 1;
  return {
    prompt: `${who} ${big ? 'enlarges' : 'reduces'} a ${c.what}. A ${c.part} that was ${q(r.L, c.u)} on the original is ${q(r.N, c.u)} on the new ${c.what}. (a) What is the scale factor? (b) Is the new ${c.what} an enlargement or a reduction?`,
    parts: [kPart(r.k, '(a) $k =$'), { label: '(b)', answer: fixedChoice(TYPE, big ? 0 : 1) }],
    hints: ['Scale factor $k = \\dfrac{\\text{length on the new image}}{\\text{corresponding length on the original}}$', 'If $k > 1$ the image is an enlargement; if $0 < k < 1$ it is a reduction.'],
    solution: [
      `$k = \\dfrac{\\text{new}}{\\text{original}} = \\dfrac{${num(r.N)}}{${num(r.L)}} = ${fmt(r.k)}$`,
      `Since $k ${big ? '>' : '<'} 1$, the new ${c.what} is ${big ? 'an enlargement' : 'a reduction'}.`,
    ],
  };
}

const SF_MIXED = [
  { real: 'canoe', ru: 'm', du: 'cm', lens: [4.2, 4.5, 4.8, 5.1, 5.4], ns: [20, 30, 50, 60] },
  { real: 'pickup truck', ru: 'm', du: 'cm', lens: [5.2, 5.6, 5.8, 6], ns: [20, 40, 50, 80] },
  { real: 'room', ru: 'm', du: 'cm', lens: [3.6, 4.2, 4.8, 5.4, 6], ns: [40, 50, 60, 100] },
  { real: 'grain bin', ru: 'm', du: 'cm', lens: [7.2, 8.4, 9.6, 10.8], ns: [80, 100, 120, 200] },
];
const TINY = [
  { real: 'ladybug', lens: [5, 6, 7, 8], ks: [6, 8, 10, 12, 15] },
  { real: 'honeybee', lens: [12, 13, 14, 15], ks: [3, 4, 5, 6] },
  { real: 'grain of canola seed', lens: [1.5, 2, 2.5], ks: [20, 30, 40, 50] },
  { real: 'mosquito', lens: [4, 5, 6], ks: [8, 10, 12, 15] },
];

function scaleMixed(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  if (rng.chance(0.5)) {
    const c = rng.pick(SF_MIXED);
    const r = retry(
      () => {
        const L = rng.pick(c.lens);
        const n = rng.pick(c.ns);
        return { L, n, D: roundTo((L * 100) / n, 4) };
      },
      (t) => hasDp(t.D, 1),
    );
    return {
      prompt: `${who} draws a scale diagram of a ${q(r.L, c.ru)} ${c.real}. On the diagram, the ${c.real} is ${q(r.D, c.du)} long. (a) What scale factor did ${who} use? Write it as a fraction or a decimal. (b) Is the diagram an enlargement or a reduction?`,
      parts: [kPart(1 / r.n, '(a) $k =$'), { label: '(b)', answer: fixedChoice(TYPE, 1) }],
      hints: ['Both lengths must be in the **same unit** before you divide.', `Change ${q(r.L, c.ru)} to centimetres, then use $k = \\dfrac{\\text{diagram}}{\\text{actual}}$.`],
      solution: [
        `Same units: ${q(r.L, 'm')} $= ${num(r.L * 100)}\\ \\text{cm}$.`,
        `$k = \\dfrac{${num(r.D)}}{${num(r.L * 100)}} = \\dfrac{1}{${r.n}} = ${fmt(1 / r.n, 6)}$`,
        `$k < 1$, so the diagram is a reduction. (Each length on the diagram is $\\dfrac{1}{${r.n}}$ of the real length.)`,
      ],
    };
  }
  const c = rng.pick(TINY);
  const L = rng.pick(c.lens);
  const k = rng.pick(c.ks);
  const D = (L * k) / 10;
  return {
    prompt: `For a science poster, ${who} draws a ${c.real} that is ${q(L, 'mm')} long. The drawing is ${q(D, 'cm')} long. (a) What is the scale factor? (b) Is the drawing an enlargement or a reduction?`,
    parts: [kPart(k, '(a) $k =$'), { label: '(b)', answer: fixedChoice(TYPE, 0) }],
    hints: ['Put both lengths in the same unit first.', `${q(D, 'cm')} $= ${num(D * 10)}\\ \\text{mm}$. Then divide the drawing length by the actual length.`],
    solution: [`Same units: ${q(D, 'cm')} $= ${num(D * 10)}\\ \\text{mm}$.`, `$k = \\dfrac{${num(D * 10)}}{${num(L)}} = ${k}$`, `$k > 1$, so the drawing is an enlargement: ${k} times the actual size.`],
  };
}

function scaleFactorMulti(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['map', 'twice', 'imperial'] as const);
  if (kind === 'map') {
    const n = rng.pick([25000, 50000, 100000, 125000, 200000, 250000, 500000]);
    const r = retry(
      () => {
        const x = rng.float(2, 18, 1);
        return { x, D: (x * n) / 100000 };
      },
      (t) => hasDp(t.D, 2) && t.D >= 1,
    );
    const [t1, t2] = rng.pick([
      ['two campgrounds', 'between them'],
      ['a trailhead and a backcountry lake', 'between them'],
      ['two farms', 'between them'],
      ['two fire lookout towers', 'between them'],
    ]);
    return {
      prompt: `On a map, ${t1} are ${q(r.x, 'cm')} apart. The real straight-line distance ${t2} is ${q(r.D, 'km')}. Write the scale of the map in the form $1 : n$. (Type $n$ without spaces, such as 25000.)`,
      parts: [exactPart(n, undefined, '$1 :$')],
      hints: ['A ratio scale uses the **same unit** on both sides. Change the kilometres to centimetres.', '$1\\ \\text{km} = 1000\\ \\text{m} = 100\\,000\\ \\text{cm}$. Then divide the real length by the map length.'],
      solution: [
        `Real distance in centimetres: $${num(r.D)} \\times 100\\,000 = ${num(r.D * 100000)}\\ \\text{cm}$`,
        `$n = \\dfrac{${num(r.D * 100000)}}{${num(r.x)}} = ${num(n)}$`,
        `The scale is $1 : ${num(n)}$: each centimetre on the map stands for $${num(n)}$ cm, or $${num(n / 100000)}$ km, in real life.`,
      ],
    };
  }
  if (kind === 'twice') {
    const r = retry(
      () => {
        const k1 = rng.pick([1.5, 2, 2.5, 3, 4]);
        const k2 = rng.pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]);
        const L = rng.int(4, 20);
        return { k1, k2, k: roundTo(k1 * k2, 6), L, N: roundTo(L * k1 * k2, 6) };
      },
      (t) => t.k !== 1 && hasDp(t.N, 2) && hasDp(t.k, 3),
    );
    return {
      prompt: `${who} enlarges a ${q(r.L, 'cm')} wide drawing by a scale factor of $${fmt(r.k1)}$. Then ${who} reduces the enlargement by a scale factor of $${fmt(r.k2)}$. (a) What single scale factor takes the original drawing to the final one? (b) How wide is the final drawing?`,
      parts: [kPart(r.k, '(a) $k =$'), exactPart(r.N, 'cm', '(b)')],
      hints: ['Each scale factor multiplies every length.', 'Two scale factors in a row multiply: $k = k_1 \\times k_2$.'],
      solution: [
        `After the enlargement: $${r.L} \\times ${fmt(r.k1)} = ${fmt(r.L * r.k1)}$ cm. After the reduction: $${fmt(r.L * r.k1)} \\times ${fmt(r.k2)} = ${fmt(r.N)}$ cm.`,
        `Single scale factor: $k = ${fmt(r.k1)} \\times ${fmt(r.k2)} = ${fmt(r.k)}$. Check: $${r.L} \\times ${fmt(r.k)} = ${fmt(r.N)}$.`,
        `(a) $k = ${fmt(r.k)}$ ${r.k > 1 ? '(an enlargement overall)' : '(a reduction overall)'}; (b) the final drawing is ${q(r.N, 'cm')} wide.`,
      ],
    };
  }
  const per = rng.pick([
    { tex: '\\tfrac{1}{4}', v: 0.25, n: 48 },
    { tex: '\\tfrac{1}{8}', v: 0.125, n: 96 },
    { tex: '\\tfrac{1}{2}', v: 0.5, n: 24 },
  ]);
  const drawn = rng.pick([2.5, 3, 3.5, 4, 4.5, 5.25, 6]);
  const real = drawn / per.v;
  return {
    prompt: `A house plan uses the scale $${per.tex}\\ \\text{in} = 1\\ \\text{ft}$. (a) What is the scale factor of the plan, as a fraction? (Use $1\\ \\text{ft} = 12\\ \\text{in}$.) (b) A wall is $${fmt(drawn)}$ in long on the plan. How long is the real wall, in feet?`,
    parts: [kPart(1 / per.n, '(a) $k =$'), exactPart(real, 'ft', '(b)')],
    hints: ['Write both lengths in inches: $1\\ \\text{ft} = 12\\ \\text{in}$.', `Each inch on the plan stands for $1 \\div ${fmt(per.v)} = ${fmt(1 / per.v)}$ ft.`],
    solution: [
      `$k = \\dfrac{\\text{plan}}{\\text{real}} = \\dfrac{${fmt(per.v)}\\ \\text{in}}{12\\ \\text{in}} = \\dfrac{1}{${per.n}}$`,
      `(b) Each inch on the plan is $${fmt(1 / per.v)}$ ft, so $${fmt(drawn)} \\times ${fmt(1 / per.v)} = ${fmt(real)}$ ft.`,
      `(a) $k = \\dfrac{1}{${per.n}}$; (b) the wall is $${fmt(real)}$ ft long.`,
    ],
  };
}

const scaleFactor = skill({
  id: 'm202-scale-factor',
  name: 'Finding a scale factor',
  description: 'Find the scale factor between an original and a scale diagram, and decide whether it is an enlargement or a reduction.',
  outcomes: ['M2'],
  lessonId: 'm202-8-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return scaleSame(rng);
    if (d === 2) return scaleMixed(rng);
    return scaleFactorMulti(rng);
  },
});

function diagramOneStep(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  if (rng.chance(0.55)) {
    const item = rng.pick([
      { what: 'fence', lo: 12, hi: 60 },
      { what: 'driveway', lo: 8, hi: 30 },
      { what: 'garden bed', lo: 2, hi: 8 },
      { what: 'deck', lo: 3, hi: 10 },
      { what: 'hedge', lo: 5, hi: 30 },
    ]);
    const r = retry(
      () => {
        const per = rng.pick([0.5, 2, 2.5, 4, 5]);
        const drawn = rng.float(2, 15, 1);
        return { per, drawn, real: roundTo(drawn * per, 4) };
      },
      (t) => t.real >= item.lo && t.real <= item.hi,
    );
    const { per, drawn, real } = r;
    const what = item.what;
    return {
      prompt: `On a site plan, $1\\ \\text{cm}$ represents ${q(per, 'm')}. A ${what} measures ${q(drawn, 'cm')} on the plan. How long is the real ${what}?`,
      parts: [exactPart(real, 'm')],
      hints: [`Every centimetre on the plan stands for ${q(per, 'm')}.`, `Multiply the plan length by ${fmt(per)}.`],
      solution: [`$${num(drawn)} \\times ${fmt(per)} = ${num(real)}$`, `The real ${what} is ${q(real, 'm')} long.`],
    };
  }
  const k = rng.pick([0.5, 0.25, 1.5, 2, 2.5, 3, 4]);
  const L = rng.pick([3.5, 4, 4.8, 6, 7.2, 8, 9.6, 12]);
  const N = roundTo(L * k, 4);
  const thing = rng.pick(['logo', 'photo', 'map of a hiking trail', 'drawing of a leaf']);
  return {
    prompt: `${who} makes a copy of a ${thing} using a scale factor of $${fmt(k)}$. A line that is ${q(L, 'cm')} on the original will be how long on the copy?`,
    parts: [exactPart(N, 'cm')],
    hints: ['A scale factor multiplies every length.', `New length = $${fmt(k)} \\times$ original length.`],
    solution: [`$${fmt(k)} \\times ${num(L)} = ${num(N)}$`, `The line will be ${q(N, 'cm')} long on the copy.`],
  };
}

function diagramRatio(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['plan', 'map', 'model', 'micro', 'ruler'] as const);
  if (kind === 'plan' || kind === 'ruler') {
    const n = rng.pick([20, 25, 40, 50, 75, 100]);
    const drawnMm = kind === 'ruler' ? rng.int(35, 140) : rng.int(30, 180);
    const drawn = drawnMm / 10;
    const realM = (drawn * n) / 100;
    const what = kind === 'ruler' ? rng.pick(['kitchen counter', 'canoe', 'workbench', 'garage door']) : rng.pick(['living room', 'bedroom', 'garage', 'hallway']);
    const ruler = kind === 'ruler';
    return {
      prompt: ruler
        ? `A scale diagram of a ${what} is drawn with a scale of $1 : ${n}$. ${who} measures the drawing with a ruler, as shown. How long is the real ${what}, in metres?`
        : `A floor plan has a scale of $1 : ${n}$. On the plan, the ${what} is ${q(drawn, 'cm')} long. How long is the real ${what}, in metres?`,
      ...(ruler ? { figure: { type: 'ruler' as const, system: 'metric' as const, length: Math.ceil(drawn) + 1, start: 0, end: drawn } } : {}),
      parts: [exactPart(realM, 'm')],
      hints: [`A scale of $1 : ${n}$ means every real length is $${n}$ times the length on the diagram, in the same unit.`, 'Multiply, then change centimetres to metres (divide by $100$).'],
      solution: [
        ...(ruler ? [`The ruler reading is ${q(drawn, 'cm')}.`] : []),
        `Real length: $${num(drawn)} \\times ${n} = ${num(drawn * n)}\\ \\text{cm}$`,
        `In metres: $${num(drawn * n)} \\div 100 = ${num(realM)}$`,
        `The ${what} is ${q(realM, 'm')} long.`,
      ],
    };
  }
  if (kind === 'map') {
    const n = rng.pick([20000, 50000, 100000, 250000]);
    const x = rng.float(1.5, 14, 1);
    const km = (x * n) / 100000;
    const what = rng.pick(['a mountain hiking trail', 'a canoe route', 'a cross-country ski trail', 'a stretch of a winding river']);
    return {
      prompt: `On a map with a scale of $1 : ${num(n)}$, ${what} measures ${q(x, 'cm')}. How long is it in real life, in kilometres?`,
      parts: [exactPart(km, 'km')],
      hints: [`Every centimetre on the map stands for $${num(n)}$ cm in real life.`, '$1\\ \\text{km} = 100\\,000\\ \\text{cm}$.'],
      solution: [`$${num(x)} \\times ${num(n)} = ${num(x * n)}\\ \\text{cm}$`, `$${num(x * n)} \\div 100\\,000 = ${num(km)}$`, `It is ${q(km, 'km')} long.`],
    };
  }
  if (kind === 'model') {
    const n = rng.pick([24, 43, 64, 87]);
    const r = retry(
      () => ({ L: rng.float(4, 22, 1) }),
      (t) => safe((t.L * 100) / n, 1),
    );
    const cm = (r.L * 100) / n;
    const what = n === 87 ? rng.pick(['grain hopper car', 'locomotive', 'boxcar']) : rng.pick(['fire truck', 'tractor', 'school bus', 'combine harvester']);
    return {
      prompt: `${who} builds a $1 : ${n}$ scale model of a ${what}. The real ${what} is ${q(r.L, 'm')} long. How long is the model, in centimetres, to the nearest tenth?`,
      parts: [decPart(cm, 1, 'cm')],
      hints: [`The model is $\\dfrac{1}{${n}}$ the size of the real ${what}.`, 'Change the real length to centimetres, then divide by the scale number.'],
      solution: [`${q(r.L, 'm')} $= ${num(r.L * 100)}\\ \\text{cm}$`, `$${num(r.L * 100)} \\div ${n} \\approx ${fmtFixed(cm, 3)}$`, `The model is about ${q(roundTo(cm, 1), 'cm')} long.`],
    };
  }
  const k = rng.pick([100, 200, 250, 400, 500]);
  const drawn = rng.float(2, 9, 1);
  const actualMm = (drawn * 10) / k;
  const what = rng.pick(['plant cell', 'pollen grain', 'cheek cell', 'water flea']);
  return {
    prompt: `A textbook diagram shows a ${what} enlarged by a scale factor of $${k}$. In the diagram, the ${what} is ${q(drawn, 'cm')} across. What is its actual size, in millimetres?`,
    parts: [exactPart(actualMm, 'mm')],
    hints: ['The diagram is $' + k + '$ times the actual size, so divide to go back to the actual size.', 'Change centimetres to millimetres: $1\\ \\text{cm} = 10\\ \\text{mm}$.'],
    solution: [`${q(drawn, 'cm')} $= ${num(drawn * 10)}\\ \\text{mm}$`, `Actual size: $${num(drawn * 10)} \\div ${k} = ${fmt(actualMm, 6)}$`, `The ${what} is $${fmt(actualMm, 6)}$ mm across.`],
  };
}

function diagramMulti(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['findThenUse', 'route', 'fit'] as const);
  if (kind === 'findThenUse') {
    const n = rng.pick([40, 50, 75, 80, 100, 125, 200]);
    const r = retry(
      () => {
        const a = rng.float(3, 12, 1);
        const b = rng.float(3, 14, 1);
        return { a, b, A: (a * n) / 100, B: (b * n) / 100 };
      },
      (t) => hasDp(t.A, 2) && hasDp(t.B, 3) && Math.abs(t.a - t.b) > 1,
    );
    return {
      prompt: `On a blueprint, a ${q(r.A, 'm')} wall is drawn ${q(r.a, 'cm')} long. Another wall on the same blueprint is drawn ${q(r.b, 'cm')} long. How long is the second wall in real life, in metres?`,
      parts: [exactPart(r.B, 'm')],
      hints: ['Use the first wall to find the scale (same units!).', 'Then use that scale on the second wall.'],
      solution: [
        `First wall: ${q(r.A, 'm')} $= ${num(r.A * 100)}\\ \\text{cm}$, so the scale is $${num(r.a)} : ${num(r.A * 100)}$, or $1 : ${n}$.`,
        `Second wall: $${num(r.b)} \\times ${n} = ${num(r.b * n)}\\ \\text{cm} = ${num(r.B)}\\ \\text{m}$`,
        `The second wall is ${q(r.B, 'm')} long.`,
      ],
    };
  }
  if (kind === 'route') {
    const n = rng.pick([25000, 50000]);
    const r = retry(
      () => {
        const legs = [rng.float(1.5, 6, 1), rng.float(1.5, 6, 1), rng.float(1.5, 6, 1)];
        const total = roundTo(legs.reduce((s, x) => s + x, 0), 1);
        const km = (total * n) / 100000;
        const v = rng.pick([3.5, 4, 4.5, 5]);
        return { legs, total, km, v, h: km / v };
      },
      (t) => safe(t.h, 1) && !hasDp(t.h, 1),
    );
    return {
      prompt: `${who} plans a three-part hike on a $1 : ${num(n)}$ topographic map. The three parts measure ${r.legs.map((x) => q(x, 'cm')).join(', ')} on the map. (a) What is the total real distance, in kilometres? (b) At an average walking speed of $${fmt(r.v)}$ km/h, how many hours will the hike take, to the nearest tenth?`,
      parts: [exactPart(r.km, 'km', '(a)'), decPart(r.h, 1, 'h', '(b)')],
      hints: [`Add the map lengths, then use the scale: $1\\ \\text{cm}$ on the map is $${num(n)}$ cm $= ${num(n / 100000)}$ km.`, 'Time = distance ÷ speed.'],
      solution: [
        `Total map length: $${r.legs.map((x) => num(x)).join(' + ')} = ${num(r.total)}\\ \\text{cm}$`,
        `Real distance: $${num(r.total)} \\times ${num(n / 100000)} = ${num(r.km)}$ km`,
        `Time: $${num(r.km)} \\div ${fmt(r.v)} \\approx ${fmtFixed(r.h, 3)}$ h`,
        `(a) ${q(r.km, 'km')}; (b) about $${fmtFixed(r.h, 1)}$ hours.`,
      ],
    };
  }
  const n = rng.pick([50, 75, 100]);
  const r = retry(
    () => {
      const L = rng.int(16, 30) / 2;
      const W = rng.int(10, 20) / 2;
      const pw = rng.pick([21.5, 25, 28]);
      const ph = rng.pick([14, 16, 18, 21.5]);
      return { L, W, pw, ph, dl: (L * 100) / n, dw: (W * 100) / n };
    },
    (t) => t.L > t.W && t.pw > t.ph && hasDp(t.dl, 2) && hasDp(t.dw, 2) && Math.abs(t.dl - t.pw) > 0.5 && Math.abs(t.dw - t.ph) > 0.5,
  );
  const fits = r.dl <= r.pw && r.dw <= r.ph;
  return {
    prompt: `${who} wants to draw a plan of a ${q(r.L, 'm')} by ${q(r.W, 'm')} rectangular backyard at a scale of $1 : ${n}$, inside a ${q(r.pw, 'cm')} by ${q(r.ph, 'cm')} space on a page. (a) What will the length and width of the drawing be? (b) Will it fit (with the long side along the long side of the space)?`,
    parts: [exactPart(r.dl, 'cm', '(a) Length:'), exactPart(r.dw, 'cm', 'Width:'), { label: '(b)', answer: fixedChoice(['Yes', 'No'], fits ? 0 : 1) }],
    hints: [`Each real length is divided by $${n}$, after changing metres to centimetres.`, 'Compare each drawing length with the space available.'],
    solution: [
      `Length: ${q(r.L, 'm')} $= ${num(r.L * 100)}$ cm, and $${num(r.L * 100)} \\div ${n} = ${num(r.dl)}$ cm.`,
      `Width: ${q(r.W, 'm')} $= ${num(r.W * 100)}$ cm, and $${num(r.W * 100)} \\div ${n} = ${num(r.dw)}$ cm.`,
      fits
        ? `$${num(r.dl)} \\le ${num(r.pw)}$ and $${num(r.dw)} \\le ${num(r.ph)}$, so the drawing fits.`
        : `${r.dl > r.pw ? `The length, $${num(r.dl)}$ cm, is more than $${num(r.pw)}$ cm` : `The width, $${num(r.dw)}$ cm, is more than $${num(r.ph)}$ cm`}, so the drawing does not fit. ${who} needs a smaller scale (a larger $n$).`,
    ],
  };
}

const scaleDiagram = skill({
  id: 'm202-scale-diagram',
  name: 'Using scale diagrams',
  description: 'Use a scale factor or a ratio scale such as 1 : 50 to find lengths on a scale diagram or in real life.',
  outcomes: ['M2'],
  lessonId: 'm202-8-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return diagramOneStep(rng);
    if (d === 2) return diagramRatio(rng);
    return diagramMulti(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.4 — Areas, surface areas and volumes of similar objects
// ---------------------------------------------------------------------------

const sq = (u: string) => `\\text{${u}}^2`;
const cu = (u: string) => `\\text{${u}}^3`;
/** An area or volume as inline maths. */
const qa = (x: number, u: string, p: 2 | 3) => `$${num(x)}\\ ${p === 2 ? sq(u) : cu(u)}$`;

const FLAT = [
  { what: 'rectangular garden', u: 'm', areas: [12, 15, 18, 20, 24, 30] },
  { what: 'area rug', u: 'm', areas: [2, 3, 4.5, 6, 8] },
  { what: 'photo', u: 'cm', areas: [96, 120, 150, 180, 240] },
  { what: 'school logo on a banner', u: 'cm', areas: [60, 80, 120, 150, 200] },
  { what: 'triangular sail', u: 'm', areas: [4, 5, 6, 7.5, 9] },
];

function areaOneStep(rng: Rng): GenOutput {
  const c = rng.pick(FLAT);
  const A = rng.pick(c.areas);
  const k = rng.pick([2, 3, 4, 0.5, 1.5, 2.5]);
  const N = roundTo(A * k * k, 6);
  return {
    prompt: `${/^[aeiou]/.test(c.what) ? 'An' : 'A'} ${c.what} has an area of ${qa(A, c.u, 2)}. A similar ${c.what} is made with every length multiplied by a scale factor of $${fmt(k)}$. What is the area of the new ${c.what}?`,
    parts: [exactPart(N, `${c.u}²`)],
    hints: ['When every length is multiplied by $k$, the area is multiplied by $k^2$ (length × length).', `Multiply the area by $${fmt(k)}^2 = ${fmt(k * k)}$.`],
    solution: [`Area scale factor: $k^2 = ${fmt(k)}^2 = ${fmt(k * k)}$`, `New area: $${num(A)} \\times ${fmt(k * k)} = ${num(N)}$`, `The new ${c.what} has an area of ${qa(N, c.u, 2)}.`],
  };
}

const SOLIDS2 = [
  { what: 'cylindrical water tanks', shape: 'cylinder' as const, dim: 'height', key: 'h', u: 'm', lens: [1.2, 1.5, 1.6, 2, 2.4], SA: [8.5, 12, 14.4, 18, 22.5] },
  { what: 'cereal boxes', shape: 'rectPrism' as const, dim: 'height', key: 'h', u: 'cm', lens: [20, 24, 25, 28, 30], SA: [1100, 1250, 1400, 1520, 1680] },
  { what: 'cone-shaped paper cups', shape: 'cone' as const, dim: 'height', key: 'h', u: 'cm', lens: [8, 9, 10, 12], SA: [110, 132, 150, 176] },
  { what: 'spherical lamp shades', shape: 'sphere' as const, dim: 'diameter', key: 'd', u: 'cm', lens: [20, 24, 30, 36, 40], SA: [1257, 1810, 2827, 4072, 5027] },
];

function areaTwoStep(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  if (rng.chance(0.6)) {
    const c = rng.pick(SOLIDS2);
    const r = retry(
      () => {
        const L1 = rng.pick(c.lens);
        const k = rng.pick([1.25, 1.5, 2, 2.5, 0.75, 0.6, 0.5, 3]);
        const L2 = roundTo(L1 * k, 6);
        const S1 = rng.pick(c.SA);
        return { L1, L2, k, S1, S2: S1 * k * k };
      },
      (t) => hasDp(t.L2, 1) && safe(t.S2, 1),
    );
    const labels: Record<string, string> = { [c.key]: `${fmt(r.L1)} ${c.u}` };
    return {
      prompt: `Two ${c.what} are similar. The one in the diagram has a ${c.dim} of ${q(r.L1, c.u)} and a surface area of ${qa(r.S1, c.u, 2)}. The other has a ${c.dim} of ${q(r.L2, c.u)}. What is the surface area of the second one, to the nearest tenth of a square ${c.u === 'm' ? 'metre' : 'centimetre'}?`,
      figure: { type: 'solid', shape: c.shape, labels, show: c.key === 'd' ? ['d'] : ['h'] } as SolidFigure,
      parts: [decPart(r.S2, 1, `${c.u}²`)],
      hints: ['Find the scale factor from the corresponding lengths: $k = \\dfrac{\\text{new}}{\\text{original}}$.', 'Surface areas of similar objects are in the ratio $k^2$.'],
      solution: [
        `$k = \\dfrac{${num(r.L2)}}{${num(r.L1)}} = ${fmt(r.k)}$`,
        `$k^2 = ${fmt(r.k * r.k)}$`,
        `Surface area: $${num(r.S1)} \\times ${fmt(r.k * r.k)} ${eq(r.S2)}$`,
        `The second one has a surface area of about $${num(roundTo(r.S2, 1))}\\ ${sq(c.u)}$.`,
      ],
    };
  }
  const c = rng.pick(FLAT);
  const k = rng.pick([2, 3, 4, 5, 2.5]);
  const A = rng.pick(c.areas);
  const big = roundTo(A * k * k, 6);
  return {
    prompt: `${who} shrinks a large ${c.what} design to make a similar small one. Every length on the large design is $${fmt(k)}$ times the matching length on the small one. The large design has an area of ${qa(big, c.u, 2)}. What is the area of the small design?`,
    parts: [exactPart(A, `${c.u}²`)],
    hints: [`The large area is $${fmt(k)}^2$ times the small area.`, `So divide the large area by $${fmt(k * k)}$.`],
    solution: [`Areas are in the ratio $k^2 = ${fmt(k)}^2 = ${fmt(k * k)}$.`, `Small area: $${num(big)} \\div ${fmt(k * k)} = ${num(A)}$`, `The small design has an area of ${qa(A, c.u, 2)}.`],
  };
}

function areaMulti(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['findK', 'paint', 'pizza'] as const);
  if (kind === 'findK') {
    const r = retry(
      () => {
        const k = rng.pick([1.5, 2, 2.5, 3, 4, 0.5]);
        const A1 = rng.pick([24, 32, 48, 54, 60, 80, 96, 120]);
        const w1 = rng.pick([4, 5, 6, 8, 10, 12]);
        return { k, A1, A2: A1 * k * k, w1, w2: w1 * k };
      },
      (t) => hasDp(t.A2, 2) && hasDp(t.w2, 1),
    );
    const thing = rng.pick(['two similar triangular pennants', 'two similar picture frames', 'two similar stop-sign shaped decals', 'two similar kite designs']);
    return {
      prompt: `${cap(thing)} have areas of ${qa(r.A1, 'cm', 2)} and ${qa(r.A2, 'cm', 2)}. The first one is ${q(r.w1, 'cm')} wide. How wide is the second one?`,
      parts: [exactPart(r.w2, 'cm')],
      hints: ['The ratio of the areas is $k^2$. Find it first.', 'Take the square root to get the scale factor $k$ for lengths.'],
      solution: [
        `$k^2 = \\dfrac{${num(r.A2)}}{${num(r.A1)}} = ${fmt(r.k * r.k)}$`,
        `$k = \\sqrt{${fmt(r.k * r.k)}} = ${fmt(r.k)}$`,
        `Width: $${fmt(r.w1)} \\times ${fmt(r.k)} = ${fmt(r.w2)}$`,
        `The second one is ${q(r.w2, 'cm')} wide.`,
      ],
    };
  }
  if (kind === 'paint') {
    const r = retry(
      () => {
        const h1 = rng.pick([1.2, 1.5, 1.8, 2, 2.4]);
        const k = rng.pick([1.5, 2, 2.5, 1.25]);
        const L1 = rng.float(1.5, 6, 1);
        return { h1, k, h2: roundTo(h1 * k, 6), L1, L2: L1 * k * k };
      },
      (t) => hasDp(t.h2, 2) && safe(t.L2, 1),
    );
    return {
      prompt: `${who} used ${q(r.L1, 'L')} of paint to cover the outside of a ${q(r.h1, 'm')} tall cylindrical grain bin. A similar bin on the same farm is ${q(r.h2, 'm')} tall. How much paint will the larger bin need, to the nearest tenth of a litre?`,
      figure: { type: 'solid', shape: 'cylinder', labels: { h: `${fmt(r.h1)} m` }, show: ['h'] } as SolidFigure,
      parts: [decPart(r.L2, 1, 'L')],
      hints: ['The paint needed is proportional to the surface area, not the height.', 'Find $k$ from the heights. Surface areas (and so paint) scale by $k^2$.'],
      solution: [
        `$k = \\dfrac{${num(r.h2)}}{${num(r.h1)}} = ${fmt(r.k)}$, so $k^2 = ${fmt(r.k * r.k)}$.`,
        `Paint: $${num(r.L1)} \\times ${fmt(r.k * r.k)} ${eq(r.L2)}$ L`,
        `The larger bin needs about ${q(roundTo(r.L2, 1), 'L')} of paint. (Not $${fmt(r.k)}$ times as much: the surface grows in two directions.)`,
      ],
    };
  }
  const r = retry(
    () => {
      const d1 = rng.pick([25, 28, 30, 32]);
      const d2 = d1 + rng.pick([6, 8, 10, 12]);
      const p1 = rng.int(11, 16) - 0.01;
      const p2 = roundTo(p1 * rng.float(1.2, 2.1, 2), 0) - 0.01;
      const ratio = (d2 / d1) ** 2;
      return { d1, d2, p1: roundTo(p1, 2), p2: roundTo(p2, 2), ratio };
    },
    (t) => safe(t.ratio, 2) && Math.abs(t.p2 / t.p1 - t.ratio) > 0.08,
  );
  const largeBetter = r.p2 / r.p1 < r.ratio;
  return {
    prompt: `A pizzeria sells a ${q(r.d1, 'cm')} pizza for ${money(r.p1)} and a ${q(r.d2, 'cm')} pizza for ${money(r.p2)}. The pizzas are similar circles. (a) How many times as much pizza is the large one, to the nearest hundredth? (b) Which is the better value?`,
    parts: [decPart(r.ratio, 2, undefined, '(a)'), { label: '(b)', answer: fixedChoice(['The large pizza', 'The small pizza'], largeBetter ? 0 : 1) }],
    hints: ['The amount of pizza depends on the area. For similar shapes, areas are in the ratio $k^2$.', 'Compare the area ratio with the price ratio $\\dfrac{\\text{large price}}{\\text{small price}}$.'],
    solution: [
      `$k = \\dfrac{${r.d2}}{${r.d1}}$, so the area ratio is $k^2 = \\left(\\dfrac{${r.d2}}{${r.d1}}\\right)^2 \\approx ${fmtFixed(r.ratio, 4)}$.`,
      `(a) The large pizza is about $${fmtFixed(r.ratio, 2)}$ times as much pizza.`,
      `Price ratio: $\\dfrac{${mv(r.p2)}}{${mv(r.p1)}} \\approx ${fmtFixed(r.p2 / r.p1, 2)}$.`,
      largeBetter
        ? `(b) You get about $${fmtFixed(r.ratio, 2)}$ times the pizza for only about $${fmtFixed(r.p2 / r.p1, 2)}$ times the price, so the large pizza is the better value.`
        : `(b) The large pizza costs about $${fmtFixed(r.p2 / r.p1, 2)}$ times as much but gives only about $${fmtFixed(r.ratio, 2)}$ times the pizza, so the small pizza is the better value.`,
    ],
  };
}

const similarArea = skill({
  id: 'm202-similar-area',
  name: 'Areas of similar shapes and objects',
  description: 'Use the scale factor squared to relate the areas and surface areas of similar 2-D shapes and 3-D objects.',
  outcomes: ['M3'],
  lessonId: 'm202-8-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return areaOneStep(rng);
    if (d === 2) return areaTwoStep(rng);
    return areaMulti(rng);
  },
});

const SOLIDS3 = [
  { what: 'storage box', shape: 'rectPrism' as const, key: 'h', dim: 'height', u: 'cm', vols: [2400, 3000, 4500, 6000, 8000] },
  { what: 'soup can', shape: 'cylinder' as const, key: 'h', dim: 'height', u: 'cm', vols: [350, 400, 540, 750] },
  { what: 'aquarium', shape: 'rectPrism' as const, key: 'h', dim: 'height', u: 'cm', vols: [20000, 36000, 45000, 54000] },
  { what: 'traffic cone', shape: 'cone' as const, key: 'h', dim: 'height', u: 'cm', vols: [1800, 2400, 3200, 4500] },
];

function volumeOneStep(rng: Rng): GenOutput {
  const c = rng.pick(SOLIDS3);
  const V = rng.pick(c.vols);
  const k = rng.pick([2, 3, 0.5, 1.5, 4]);
  const N = roundTo(V * k ** 3, 6);
  return {
    prompt: `${/^[aeiou]/.test(c.what) ? 'An' : 'A'} ${c.what} has a volume of ${qa(V, c.u, 3)}. A similar ${c.what} has every length multiplied by a scale factor of $${fmt(k)}$. What is its volume?`,
    parts: [exactPart(N, `${c.u}³`)],
    hints: ['When every length is multiplied by $k$, the volume is multiplied by $k^3$ (length × width × height).', `Multiply the volume by $${fmt(k)}^3 = ${fmt(k ** 3)}$.`],
    solution: [`Volume scale factor: $k^3 = ${fmt(k)}^3 = ${fmt(k ** 3)}$`, `New volume: $${num(V)} \\times ${fmt(k ** 3)} = ${num(N)}$`, `The similar ${c.what} has a volume of ${qa(N, c.u, 3)}.`],
  };
}

function volumeTwoStep(rng: Rng): GenOutput {
  const who = rng.pick(PEOPLE);
  const kind = rng.pick(['lengths', 'model', 'mass'] as const);
  if (kind === 'lengths') {
    const c = rng.pick(SOLIDS3);
    const r = retry(
      () => {
        const L1 = rng.pick([8, 10, 12, 15, 16, 20, 24, 30]);
        const k = rng.pick([1.25, 1.5, 2, 2.5, 0.75, 0.6, 0.5, 0.8]);
        const V1 = rng.pick(c.vols);
        return { L1, k, L2: roundTo(L1 * k, 6), V1, V2: V1 * k ** 3 };
      },
      (t) => hasDp(t.L2, 1) && safe(t.V2, 1),
    );
    return {
      prompt: `Two ${c.what}s are similar. The one in the diagram has a ${c.dim} of ${q(r.L1, c.u)} and a volume of ${qa(r.V1, c.u, 3)}. The other has a ${c.dim} of ${q(r.L2, c.u)}. What is its volume, to the nearest tenth of a cubic centimetre?`,
      figure: { type: 'solid', shape: c.shape, labels: { [c.key]: `${fmt(r.L1)} ${c.u}` }, show: ['h'] } as SolidFigure,
      parts: [decPart(r.V2, 1, `${c.u}³`)],
      hints: ['Find $k$ from the corresponding lengths.', 'Volumes of similar objects are in the ratio $k^3$.'],
      solution: [`$k = \\dfrac{${num(r.L2)}}{${num(r.L1)}} = ${fmt(r.k)}$`, `$k^3 = ${fmt(r.k ** 3, 6)}$`, `Volume: $${num(r.V1)} \\times ${fmt(r.k ** 3, 6)} ${eq(r.V2)}$`, `The other ${c.what} has a volume of about $${num(roundTo(r.V2, 1))}\\ ${cu(c.u)}$.`],
    };
  }
  if (kind === 'model') {
    const n = rng.pick([10, 20, 25, 40, 50]);
    const r = retry(
      () => ({ v: rng.float(0.5, 6, 1) }),
      (t) => hasDp(t.v * n ** 3, 1),
    );
    const Vreal = r.v * n ** 3;
    const what = rng.pick(['water tower', 'grain bin', 'fuel storage tank', 'concrete silo']);
    return {
      prompt: `${who}, an engineering student, builds a $1 : ${n}$ scale model of a ${what}. The model holds ${q(r.v, 'L')} of water. How many litres would the real ${what} hold?`,
      parts: [exactPart(Vreal, 'L')],
      hints: [`Every length on the real ${what} is $${n}$ times the model length, so $k = ${n}$.`, `Capacity is a volume, so multiply by $k^3 = ${n}^3$.`],
      solution: [`$k = ${n}$, so $k^3 = ${num(n ** 3)}$.`, `Real capacity: $${num(r.v)} \\times ${num(n ** 3)} = ${num(Vreal)}$ L`, `The real ${what} would hold $${num(Vreal)}$ L.`],
    };
  }
  const r = retry(
    () => {
      const h1 = rng.pick([10, 12, 15, 16, 20]);
      const k = rng.pick([1.5, 2, 2.5, 1.25, 0.5, 0.75]);
      const m1 = rng.pick([120, 150, 180, 200, 240, 300]);
      return { h1, k, h2: roundTo(h1 * k, 6), m1, m2: m1 * k ** 3 };
    },
    (t) => hasDp(t.h2, 1) && safe(t.m2, 1),
  );
  const thing = rng.pick(['chocolate bunny', 'chocolate moose', 'wax candle', 'soap carving']);
  return {
    prompt: `A solid ${thing} that is ${q(r.h1, 'cm')} tall has a mass of ${q(r.m1, 'g')}. A similar ${thing} made of the same material is ${q(r.h2, 'cm')} tall. What is its mass, to the nearest tenth of a gram?`,
    parts: [decPart(r.m2, 1, 'g')],
    hints: ['For objects made of the same material, mass is proportional to volume.', 'Find $k$ from the heights; the mass is multiplied by $k^3$.'],
    solution: [`$k = \\dfrac{${num(r.h2)}}{${num(r.h1)}} = ${fmt(r.k)}$, so $k^3 = ${fmt(r.k ** 3, 6)}$.`, `Mass: $${num(r.m1)} \\times ${fmt(r.k ** 3, 6)} ${eq(r.m2)}$`, `The ${thing} has a mass of about ${q(roundTo(r.m2, 1), 'g')}.`],
  };
}

function volumeMulti(rng: Rng): GenOutput {
  const kind = rng.pick(['length', 'area', 'capacity'] as const);
  const r = retry(
    () => {
      const k = rng.pick([1.5, 2, 2.5, 3, 4, 0.5, 1.2, 0.8]);
      const V1 = rng.pick([64, 125, 216, 250, 500, 1000, 1500]);
      const L1 = rng.pick([6, 8, 10, 12, 15, 20]);
      const S1 = rng.pick([150, 220, 300, 384, 450, 600]);
      return { k, V1, V2: roundTo(V1 * k ** 3, 6), L1, L2: L1 * k, S1, S2: S1 * k * k };
    },
    (t) => hasDp(t.V2, 3) && hasDp(t.L2, 2) && hasDp(t.S2, 2),
  );
  const ratio = r.V2 / r.V1;
  const steps = [`Volume ratio: $k^3 = \\dfrac{${num(r.V2)}}{${num(r.V1)}} = ${fmt(ratio, 6)}$`, `Scale factor: $k = \\sqrt[3]{${fmt(ratio, 6)}} = ${fmt(r.k)}$`];
  const hints = ['The ratio of the volumes is $k^3$. Find it first.', 'Take the cube root to get $k$, then use $k$ for lengths or $k^2$ for areas.'];
  if (kind === 'length') {
    const thing = rng.pick(['two similar water bottles', 'two similar planters', 'two similar glass vases', 'two similar storage bins']);
    return {
      prompt: `${cap(thing)} have capacities of ${qa(r.V1, 'cm', 3)} and ${qa(r.V2, 'cm', 3)}. The first one is ${q(r.L1, 'cm')} tall. How tall is the second one?`,
      parts: [exactPart(r.L2, 'cm')],
      hints,
      solution: [...steps, `Height: $${num(r.L1)} \\times ${fmt(r.k)} = ${num(r.L2)}$`, `The second one is ${q(r.L2, 'cm')} tall.`],
    };
  }
  if (kind === 'area') {
    const thing = rng.pick(['two similar cylindrical cans', 'two similar cardboard shipping boxes', 'two similar spherical ornaments']);
    return {
      prompt: `${cap(thing)} have volumes of ${qa(r.V1, 'cm', 3)} and ${qa(r.V2, 'cm', 3)}. The first one has a surface area of ${qa(r.S1, 'cm', 2)}. What is the surface area of the second one?`,
      parts: [exactPart(r.S2, 'cm²')],
      hints,
      solution: [...steps, `Surface areas scale by $k^2 = ${fmt(r.k * r.k)}$: $${num(r.S1)} \\times ${fmt(r.k * r.k)} = ${num(r.S2)}$`, `The second one has a surface area of ${qa(r.S2, 'cm', 2)}.`],
    };
  }
  const who = rng.pick(PEOPLE);
  return {
    prompt: `${who} makes two similar ceramic jugs. The first holds ${qa(r.V1, 'cm', 3)} and the second holds ${qa(r.V2, 'cm', 3)}. The handle on the first jug is ${q(r.L1, 'cm')} long. How long is the handle on the second jug?`,
    parts: [exactPart(r.L2, 'cm')],
    hints,
    solution: [...steps, `Handle: $${num(r.L1)} \\times ${fmt(r.k)} = ${num(r.L2)}$`, `The handle is ${q(r.L2, 'cm')} long.`],
  };
}

const similarVolume = skill({
  id: 'm202-similar-volume',
  name: 'Volumes of similar objects',
  description: 'Use the scale factor cubed to relate the volumes (and capacities and masses) of similar 3-D objects, and find a scale factor from a volume ratio.',
  outcomes: ['M3'],
  lessonId: 'm202-8-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return volumeOneStep(rng);
    if (d === 2) return volumeTwoStep(rng);
    return volumeMulti(rng);
  },
});

export const PROPORTIONAL_SKILLS: SkillDef[] = [rateCompare, rateGraph, rateApply, scaleFactor, scaleDiagram, similarArea, similarVolume];
