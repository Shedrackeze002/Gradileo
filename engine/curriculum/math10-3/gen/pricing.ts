/** Math 10-3 Unit 1 — Unit Pricing and Currency Exchange (N1, A1). */
import { fixedChoice, numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };
type Lvl = 1 | 2;

const tx = (u: string) => `\\text{${u}}`;
const M2 = '\\text{m}^2';
/** A number inside maths (at most `dp` decimals, thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
/** A quantity with a LaTeX unit, as inline maths: $12\ \text{km}$. */
const qq = (x: number, unit: string, dp = 4) => `$${num(x, dp)}\\ ${unit}$`;
const q = (x: number, u: string) => qq(x, tx(u));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** "a" or "an" before a number that is read aloud (8 -> "an eight", 11 -> "an eleven"). */
const art = (x: number) => (/^(8|11|18)(\D|$)|^8/.test(String(x)) ? 'an' : 'a');

function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Canadian money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** A price tag: whole dollars print without cents (\$60), otherwise \$59.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** A money amount inside maths, without a dollar sign: 1250 or 12.50. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : group(fmtFixed(x, 2)).replace(/,/g, '{,}'));
/** Plain-text money for table cells (cells are not Markdown). */
const cell = (x: number) => `$${fmtFixed(x, 2)}`;
/** A unit price that may need a third decimal place: \$0.73 or about \$0.732. */
const uprice = (x: number) => (isWhole(x * 100) ? money(x) : `about \\$${fmtFixed(x, 3)}`);
/** "about " when a money value had to be rounded to the cent. */
const abt = (x: number) => (isWhole(x * 100) ? '' : 'about ');

/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.4567". */
function eq(v: number, dp = 4): string {
  return Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`;
}
/** True when v sits too close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** Smallest number of decimals (0-3) that writes v exactly, or -1. */
function exactDp(v: number): number {
  for (let dp = 0; dp <= 3; dp++) if (Math.abs(roundTo(v, dp) - v) < 1e-9) return dp;
  return -1;
}
/** Two-decimal price ending in 9 (like 5.49) close to `raw`. */
const price9 = (raw: number) => roundTo(Math.max(0.59, Math.round(raw * 10) / 10 - 0.01), 2);

const CENT = 'to the nearest cent';
// Money is graded to within a cent, not the 0.2% allowance used for measurements.
const moneyPart = (v: number, suffix?: string): Part => numPart(v, { decimals: 2, tolerance: 0.011, label: '\\$', suffix });
/** A non-money answer that is exact: integers stay exact, decimals get a matching `decimals` so review shows a decimal. */
function exactPart(v: number, suffix?: string, label?: string): Part {
  const dp = exactDp(v);
  return dp > 0 ? numPart(v, { decimals: dp, suffix, label }) : numPart(v, { suffix, label });
}
const hm = (h: number, m: number) => (m ? `$${h}\\ ${tx('h')}\\ ${m}\\ ${tx('min')}$` : `$${h}\\ ${tx('h')}$`);

// ---------------------------------------------------------------------------
// 1.1 Unit rates
// ---------------------------------------------------------------------------

const ONE = 'A unit rate tells you how much for **one** unit. Divide by the number of units.';

type RateCtx = (rng: Rng, name: string, d: Lvl) => Out;

const RATE_CTX: RateCtx[] = [
  // Average speed in km/h
  (rng, name, d) => {
    const veh = rng.pick(['a gravel truck', 'a delivery van', 'a pickup truck', 'a school bus', 'a semi-trailer truck', 'a tour bus']);
    if (d === 1) {
      const r = rng.pick([60, 70, 75, 80, 90, 95, 100, 110]);
      const t = rng.int(2, 6);
      return {
        prompt: `${name} drives ${veh} ${q(r * t, 'km')} in $${t}$ hours. What is the average speed in kilometres per hour?`,
        parts: [numPart(r, { suffix: 'km/h' })],
        hints: [ONE, `Divide the distance by the time: $${r * t} \\div ${t}$.`],
        solution: [
          'Kilometres per hour means the distance travelled in $1$ hour, so divide the distance by the time.',
          `$${r * t}\\ ${tx('km')} \\div ${t}\\ ${tx('h')} = ${r}\\ ${tx('km/h')}$`,
          `The average speed is $${r}\\ ${tx('km/h')}$.`,
        ],
      };
    }
    const [h, m] = rng.pick([[2, 30], [3, 15], [4, 45], [1, 45], [3, 30], [5, 15], [2, 45], [4, 15]] as const);
    const t = h + m / 60;
    const D = retry(() => Math.round(t * rng.int(72, 104)) + rng.int(-3, 3), (x) => !onEdge(x / t, 1));
    const r = D / t;
    return {
      prompt: `${name} drives ${veh} ${q(D, 'km')} in ${hm(h, m)}. What is the average speed in kilometres per hour, ${roundingPhrase(1)}?`,
      parts: [numPart(r, { decimals: 1, suffix: 'km/h' })],
      hints: [ONE, 'Write the time in hours first: $15$ min $= 0.25$ h, $30$ min $= 0.5$ h and $45$ min $= 0.75$ h.'],
      solution: [
        `Change the minutes to hours: $${m}\\ ${tx('min')} = \\dfrac{${m}}{60}\\ ${tx('h')} = ${num(m / 60)}\\ ${tx('h')}$, so the time is $${num(t)}\\ ${tx('h')}$.`,
        `Divide the distance by the time: $${D} \\div ${num(t)} ${eq(r)}$`,
        `The average speed is about $${fmtFixed(r, 1)}\\ ${tx('km/h')}$.`,
      ],
    };
  },
  // Typing speed in words per minute
  (rng, name, d) => {
    const job = rng.pick(['a dispatcher job at a trucking company', 'a receptionist job at a dental office', 'a data-entry job', 'an office job at a lumber yard', 'a job at a hotel front desk']);
    if (d === 1) {
      const r = rng.pick([30, 35, 40, 45, 50, 55, 60, 65, 70]);
      const m = rng.int(2, 5);
      return {
        prompt: `${name} is applying for ${job} and takes a typing test. ${name} types $${r * m}$ words in $${m}$ minutes. What is the typing speed in words per minute?`,
        parts: [numPart(r, { suffix: 'words/min' })],
        hints: [ONE, `Divide the number of words by the number of minutes: $${r * m} \\div ${m}$.`],
        solution: ['Words per minute means the number of words typed in $1$ minute.', `$${r * m} \\div ${m} = ${r}$`, `The typing speed is $${r}$ words per minute.`],
      };
    }
    const m = rng.pick([2.5, 3.5, 4.5, 5.5, 6.5, 7.5]);
    const W = retry(() => Math.round(m * rng.int(32, 78)) + rng.int(-2, 2), (w) => !onEdge(w / m, 0));
    const r = W / m;
    return {
      prompt: `${name} is applying for ${job}. On a typing test, ${name} types $${W}$ words in $${Math.floor(m)}$ minutes $30$ seconds. What is the typing speed in words per minute, ${roundingPhrase(0)}?`,
      parts: [numPart(r, { decimals: 0, suffix: 'words/min' })],
      hints: [ONE, '$30$ seconds is half a minute, so write the time as a decimal number of minutes.'],
      solution: [
        `$30\\ ${tx('s')} = 0.5\\ ${tx('min')}$, so the time is $${num(m)}\\ ${tx('min')}$.`,
        `$${W} \\div ${num(m)} ${eq(r)}$`,
        `The typing speed is about $${fmtFixed(r, 0)}$ words per minute.`,
      ],
    };
  },
  // Fuel: litres per hour (d1) or litres per 100 km (d2)
  (rng, name, d) => {
    if (d === 1) {
      const [mach, job, rates] = rng.pick([
        ['A tractor', 'seeding a field', [12, 14, 15, 18, 20]],
        ['A combine', 'harvesting canola', [20, 24, 25, 30]],
        ['A skid steer', 'clearing snow from a parking lot', [5, 6, 7, 8]],
        ['A generator at a well site', 'running', [4, 6, 8, 9]],
      ] as const);
      const r = rng.pick(rates);
      const h = rng.int(3, 10);
      return {
        prompt: `${mach} used ${q(r * h, 'L')} of diesel in $${h}$ hours of ${job}. How many litres of diesel did it use per hour?`,
        parts: [numPart(r, { suffix: 'L/h' })],
        hints: [ONE, `Divide the litres by the hours: $${r * h} \\div ${h}$.`],
        solution: ['Litres per hour means the fuel used in $1$ hour.', `$${r * h}\\ ${tx('L')} \\div ${h}\\ ${tx('h')} = ${r}\\ ${tx('L/h')}$`, `It used $${r}\\ ${tx('L')}$ of diesel per hour.`],
      };
    }
    const v = rng.pick([
      { veh: 'car', lo: 6, hi: 9.5 },
      { veh: 'pickup truck', lo: 11, hi: 16 },
      { veh: 'cube van', lo: 14, hi: 20 },
      { veh: 'semi-trailer truck', lo: 30, hi: 40 },
    ]);
    const { D, L } = retry(
      () => {
        const D = rng.int(25, 90) * 10;
        return { D, L: roundTo((D * rng.float(v.lo, v.hi, 2)) / 100, 1) };
      },
      (o) => !onEdge((o.L / o.D) * 100, 1),
    );
    const r = (L / D) * 100;
    return {
      prompt: `${name}’s ${v.veh} used ${q(L, 'L')} of fuel on a ${q(D, 'km')} trip. What is its fuel consumption in litres per $100\\ ${tx('km')}$, ${roundingPhrase(1)}?`,
      parts: [numPart(r, { decimals: 1, suffix: 'L/100 km' })],
      hints: ['Fuel consumption is the number of litres used for every $100\\ \\text{km}$.', 'Set up $\\dfrac{\\text{litres}}{\\text{km}} = \\dfrac{x}{100}$ and solve for $x$.'],
      solution: [
        `Fuel consumption is the fuel used for every $100\\ ${tx('km')}$. Set up a proportion: $\\dfrac{${num(L)}\\ ${tx('L')}}{${D}\\ ${tx('km')}} = \\dfrac{x}{100\\ ${tx('km')}}$`,
        `Multiply both sides by $100$: $x = \\dfrac{${num(L)} \\times 100}{${D}} ${eq(r)}$`,
        `The fuel consumption is about $${fmtFixed(r, 1)}\\ ${tx('L/100 km')}$.`,
      ],
    };
  },
  // Price per kilogram
  (rng, name, d) => {
    if (d === 1) {
      const item = rng.pick(['potatoes', 'carrots', 'onions', 'apples', 'beets']);
      const p = rng.pick([1.5, 1.8, 2, 2.2, 2.4, 2.5, 3, 3.5]);
      const k = rng.pick([2, 4, 5, 10]);
      const total = roundTo(p * k, 2);
      return {
        prompt: `A farm stand by the highway sells ${art(k)} ${q(k, 'kg')} bag of ${item} for ${tag(total)}. What is the price per kilogram, ${CENT}?`,
        parts: [moneyPart(p, 'per kg')],
        hints: [ONE, `Divide the price by the number of kilograms: $${mv(total)} \\div ${k}$.`],
        solution: ['Price per kilogram = total price ÷ number of kilograms.', `$${mv(total)} \\div ${k} = ${mv(p)}$`, `The ${item} cost ${money(p)} per kilogram.`],
      };
    }
    const it = rng.pick([
      { item: 'ground beef', lo: 9, hi: 13 },
      { item: 'chicken breasts', lo: 11, hi: 17 },
      { item: 'grapes', lo: 4, hi: 7 },
      { item: 'salmon fillets', lo: 22, hi: 30 },
      { item: 'pork chops', lo: 8, hi: 12 },
    ]);
    const { mass, total } = retry(
      () => {
        const mass = rng.float(0.6, 2.8, 2);
        return { mass, total: roundTo(mass * rng.float(it.lo, it.hi, 2), 2) };
      },
      (o) => !isWhole(o.mass) && !onEdge(o.total / o.mass, 2),
    );
    const r = total / mass;
    return {
      prompt: `${name} works at a grocery store. A package of ${it.item} has a mass of ${q(mass, 'kg')} and is priced at ${money(total)}. What is the price per kilogram, ${CENT}?`,
      parts: [moneyPart(r, 'per kg')],
      hints: [ONE, `Divide the price by the mass in kilograms: $${mv(total)} \\div ${num(mass)}$.`],
      solution: ['Price per kilogram = price ÷ mass in kilograms.', `$${mv(total)} \\div ${num(mass)} ${eq(r)}$`, `The ${it.item} cost about ${money(r)} per kilogram.`],
    };
  },
  // Pumping rate in litres per minute
  (rng, name, d) => {
    if (d === 1) {
      const r = rng.pick([20, 25, 30, 40, 45, 50, 60, 75]);
      const m = rng.int(3, 12);
      const tank = rng.pick(['stock-watering trough', 'water tank on a farm truck', 'water tank in a calf barn', 'cistern']);
      return {
        prompt: `${name} uses a pump to fill a ${q(r * m, 'L')} ${tank} in $${m}$ minutes. What is the pumping rate in litres per minute?`,
        parts: [numPart(r, { suffix: 'L/min' })],
        hints: [ONE, `Divide the litres by the minutes: $${r * m} \\div ${m}$.`],
        solution: ['Litres per minute means the water pumped in $1$ minute.', `$${r * m}\\ ${tx('L')} \\div ${m}\\ ${tx('min')} = ${r}\\ ${tx('L/min')}$`, `The pump moves $${r}\\ ${tx('L')}$ per minute.`],
      };
    }
    const job = rng.pick(['fill a water truck', 'fill a farm cistern', 'drain a hot tub', 'fill a rink flood tank']);
    const { V, m } = retry(() => ({ V: rng.int(30, 150) * 10, m: rng.int(7, 25) }), (o) => !onEdge(o.V / o.m, 1) && !isWhole(o.V / o.m));
    const r = V / m;
    return {
      prompt: `It takes ${name} $${m}$ minutes to ${job} that holds ${q(V, 'L')}. What is the pumping rate in litres per minute, ${roundingPhrase(1)}?`,
      parts: [numPart(r, { decimals: 1, suffix: 'L/min' })],
      hints: [ONE, `Divide the volume by the time: $${V} \\div ${m}$.`],
      solution: ['Litres per minute = litres ÷ minutes.', `$${V} \\div ${m} ${eq(r)}$`, `The pumping rate is about $${fmtFixed(r, 1)}\\ ${tx('L/min')}$.`],
    };
  },
  // Production per hour (d1) or heart rate in beats per minute (d2)
  (rng, name, d) => {
    if (d === 1) {
      const c = rng.pick([
        { who: `${name}, a bricklayer, lays`, what: 'bricks', rates: [60, 75, 80, 90, 120] },
        { who: `${name}’s fencing crew sets`, what: 'fence posts', rates: [6, 8, 9, 12] },
        { who: `${name}, a farmhand, stacks`, what: 'hay bales', rates: [40, 45, 60, 75] },
        { who: `${name}, a roofer, installs`, what: 'bundles of shingles', rates: [3, 4, 5, 6] },
      ]);
      const r = rng.pick(c.rates);
      const h = rng.int(3, 8);
      return {
        prompt: `${c.who} $${r * h}$ ${c.what} in $${h}$ hours. How many ${c.what} is that per hour?`,
        parts: [numPart(r, { suffix: `${c.what}/h` })],
        hints: [ONE, `Divide by the number of hours: $${r * h} \\div ${h}$.`],
        solution: ['The rate per hour is the amount done in $1$ hour.', `$${r * h} \\div ${h} = ${r}$`, `That is $${r}$ ${c.what} per hour.`],
      };
    }
    const secs = rng.pick([10, 15, 20, 30]);
    const f = 60 / secs;
    const b = rng.int(Math.ceil(55 / f), Math.floor(110 / f));
    const role = rng.pick(['paramedic', 'nursing student', 'lifeguard', 'health care aide', 'athletic therapist']);
    return {
      prompt: `${name}, a ${role}, counts $${b}$ heartbeats in $${secs}$ seconds while taking a patient’s pulse. What is the heart rate in beats per minute?`,
      parts: [numPart(b * f, { suffix: 'beats/min' })],
      hints: [ONE, `How many ${secs}-second periods are in one minute?`],
      solution: [`There are $60$ seconds in $1$ minute, and $60 \\div ${secs} = ${f}$.`, `So multiply the count by $${f}$: $${b} \\times ${f} = ${b * f}$`, `The heart rate is $${b * f}$ beats per minute.`],
    };
  },
];

/** Difficulty 3: compare two rates. */
function rateCompare(rng: Rng): Out {
  const [A, B] = rng.sample(NAMES, 2);
  const kind = rng.pick(['speed', 'typing', 'fuel', 'crew'] as const);
  const pair = (lo: number, hi: number, step: number, gap: number) =>
    retry(
      () => [rng.int(lo / step, hi / step) * step, rng.int(lo / step, hi / step) * step],
      ([x, y]) => Math.abs(x - y) >= gap,
    );
  const hints = ['Find each unit rate first, then compare them.'];
  if (kind === 'speed') {
    const [rA, rB] = pair(70, 104, 2, 4);
    const [tA, tB] = rng.sample([2, 2.5, 3, 3.5, 4, 4.5, 5], 2);
    const T = (t: number) => hm(Math.floor(t), isWhole(t) ? 0 : 30);
    const diff = Math.abs(rA - rB);
    const win = rA > rB ? 0 : 1;
    return {
      prompt: `${A} drove ${q(rA * tA, 'km')} in ${T(tA)}. ${B} drove ${q(rB * tB, 'km')} in ${T(tB)}. Who had the greater average speed, and by how many kilometres per hour?`,
      parts: [{ label: 'Faster driver', answer: fixedChoice([A, B], win) }, numPart(diff, { label: 'Difference', suffix: 'km/h' })],
      hints: [...hints, 'Write each time in hours ($30$ min $= 0.5$ h), then divide distance by time.'],
      solution: [
        `${A}: $${rA * tA} \\div ${num(tA)} = ${rA}\\ ${tx('km/h')}$`,
        `${B}: $${rB * tB} \\div ${num(tB)} = ${rB}\\ ${tx('km/h')}$`,
        `${[A, B][win]} was faster by $${Math.max(rA, rB)} - ${Math.min(rA, rB)} = ${diff}\\ ${tx('km/h')}$.`,
      ],
    };
  }
  if (kind === 'typing') {
    const [rA, rB] = pair(35, 80, 1, 3);
    const [mA, mB] = rng.sample([2, 3, 4, 5, 6, 8, 10], 2);
    const diff = Math.abs(rA - rB);
    const win = rA > rB ? 0 : 1;
    return {
      prompt: `Two dispatchers took a typing test. ${A} typed $${rA * mA}$ words in $${mA}$ minutes. ${B} typed $${rB * mB}$ words in $${mB}$ minutes. Who types faster, and by how many words per minute?`,
      parts: [{ label: 'Faster typist', answer: fixedChoice([A, B], win) }, numPart(diff, { label: 'Difference', suffix: 'words/min' })],
      hints: [...hints, 'The person who typed more words is not always faster. Divide words by minutes for each person.'],
      solution: [
        `${A}: $${rA * mA} \\div ${mA} = ${rA}$ words per minute`,
        `${B}: $${rB * mB} \\div ${mB} = ${rB}$ words per minute`,
        `${[A, B][win]} types faster, by $${Math.max(rA, rB)} - ${Math.min(rA, rB)} = ${diff}$ words per minute.`,
      ],
    };
  }
  if (kind === 'fuel') {
    const [rA10, rB10] = pair(80, 150, 1, 5);
    const rA = rA10 / 10;
    const rB = rB10 / 10;
    const [DA, DB] = rng.sample([300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800], 2);
    const LA = roundTo((rA * DA) / 100, 2);
    const LB = roundTo((rB * DB) / 100, 2);
    const diff = Math.abs(rA10 - rB10) / 10;
    const win = rA < rB ? 0 : 1;
    const per = `\\ ${tx('L/100 km')}`;
    return {
      prompt: `A trucking company is comparing two delivery vans. Van A used ${q(LA, 'L')} of diesel to travel ${q(DA, 'km')}. Van B used ${q(LB, 'L')} to travel ${q(DB, 'km')}. Which van uses less fuel per $100\\ ${tx('km')}$, and by how many litres per $100\\ ${tx('km')}$?`,
      parts: [{ label: 'More fuel-efficient', answer: fixedChoice(['Van A', 'Van B'], win) }, exactPart(diff, 'L/100 km', 'Difference')],
      hints: [...hints, 'For each van, find $\\dfrac{\\text{litres} \\times 100}{\\text{km}}$. Fewer litres per 100 km is better.'],
      solution: [
        `Van A: $\\dfrac{${num(LA)} \\times 100}{${DA}} = ${num(rA)}${per}$`,
        `Van B: $\\dfrac{${num(LB)} \\times 100}{${DB}} = ${num(rB)}${per}$`,
        `Van ${win === 0 ? 'A' : 'B'} uses less fuel, by $${num(Math.max(rA, rB))} - ${num(Math.min(rA, rB))} = ${num(diff)}${per}$.`,
      ],
    };
  }
  const [rA, rB] = pair(18, 40, 1, 2);
  const [hA, hB] = rng.sample([4, 5, 6, 7, 8, 9, 10], 2);
  const diff = Math.abs(rA - rB);
  const win = rA > rB ? 0 : 1;
  return {
    prompt: `Two crews are building a cattle fence. ${A}’s crew builds ${q(rA * hA, 'm')} of fence in $${hA}$ hours. ${B}’s crew builds ${q(rB * hB, 'm')} in $${hB}$ hours. Whose crew works faster, and by how many metres per hour?`,
    parts: [{ label: 'Faster crew', answer: fixedChoice([`${A}’s crew`, `${B}’s crew`], win) }, numPart(diff, { label: 'Difference', suffix: 'm/h' })],
    hints: [...hints, 'Divide the metres of fence by the hours for each crew.'],
    solution: [
      `${A}’s crew: $${rA * hA} \\div ${hA} = ${rA}\\ ${tx('m/h')}$`,
      `${B}’s crew: $${rB * hB} \\div ${hB} = ${rB}\\ ${tx('m/h')}$`,
      `${[A, B][win]}’s crew is faster, by $${Math.max(rA, rB)} - ${Math.min(rA, rB)} = ${diff}\\ ${tx('m/h')}$.`,
    ],
  };
}

const unitRate = skill({
  id: 'm103-unit-rate',
  name: 'Unit rates',
  description: 'Write a rate as a unit rate, such as km/h, $/kg, L/100 km or words per minute, and compare two rates.',
  outcomes: ['N1'],
  lessonId: 'm103-1-1',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return rateCompare(rng);
    return rng.pick(RATE_CTX)(rng, rng.pick(NAMES), d);
  },
});

// ---------------------------------------------------------------------------
// 1.1 Proportions
// ---------------------------------------------------------------------------

interface PropCtx {
  /** a units of X go with b units of Y; find X for c units of Y. */
  nums: (rng: Rng, d: Lvl) => [number, number, number];
  xu: string;
  yu: string;
  given: (name: string, a: number, b: number) => string;
  ask: (c: number) => string;
  final: (x: string) => string;
  /** Decimals for the answer when it is not exact. */
  dp: number;
}

const notMultiple = (b: number) => (c: number) => !isWhole(c / b);

const PROP_CTX: PropCtx[] = [
  {
    nums: (rng, d) => {
      const b = rng.pick([12, 18, 24, 36]);
      const a = d === 1 ? rng.pick([240, 300, 360, 450, 480]) : rng.pick([270, 320, 375, 420, 450, 540]);
      return [a, b, d === 1 ? b * rng.int(2, 5) : retry(() => 6 * rng.int(5, 25), notMultiple(b))];
    },
    xu: tx('g'),
    yu: tx('muffins'),
    given: (name, a, b) => `${name} works in a bakery. The muffin recipe uses ${q(a, 'g')} of flour to make $${b}$ muffins.`,
    ask: (c) => `How many grams of flour are needed to make $${c}$ muffins?`,
    final: (x) => `${x} of flour are needed.`,
    dp: 0,
  },
  {
    nums: (rng, d) => {
      const b = rng.pick([4, 6, 8, 10]);
      const a = rng.pick([500, 600, 750, 900, 1200]);
      return [a, b, d === 1 ? b * rng.int(2, 6) : retry(() => rng.pick([15, 25, 30, 35, 45, 50, 60, 75, 90, 100]), notMultiple(b))];
    },
    xu: tx('mL'),
    yu: tx('servings'),
    given: (name, a, b) => `${name} is the cook at a summer camp. A soup recipe uses ${q(a, 'mL')} of stock for $${b}$ servings.`,
    ask: (c) => `How many millilitres of stock are needed for $${c}$ servings?`,
    final: (x) => `${x} of stock are needed.`,
    dp: 0,
  },
  {
    nums: (rng, d) =>
      d === 1
        ? [rng.pick([6, 7, 8, 9, 10, 12]), 100, 100 * rng.int(2, 6)]
        : [retry(() => rng.float(6.5, 13.5, 1), (a) => !isWhole(a)), 100, retry(() => rng.int(13, 75) * 10, notMultiple(100))],
    xu: tx('L'),
    yu: tx('km'),
    given: (name, a) => `${name}’s car uses ${q(a, 'L')} of gas for every $100\\ ${tx('km')}$ it drives.`,
    ask: (c) => `How many litres of gas will a ${q(c, 'km')} trip use?`,
    final: (x) => `The trip will use ${x} of gas.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      if (d === 1) {
        const [a, b] = rng.pick([[1, 10], [2, 18], [4, 36], [4, 40], [3, 30]] as const);
        return [a, b, b * rng.int(2, 5)];
      }
      const b = rng.pick([35, 37, 40, 42]);
      return [3.78, b, retry(() => rng.int(50, 160), notMultiple(b))];
    },
    xu: tx('L'),
    yu: M2,
    given: (name, a, b) => `${name} is a painter. A can holding ${q(a, 'L')} of paint covers ${qq(b, M2)} of wall.`,
    ask: (c) => `How many litres of paint are needed to cover ${qq(c, M2)}?`,
    final: (x) => `${x} of paint are needed.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      const [a, b] = rng.pick([[20, 1], [25, 1], [100, 5], [125, 5]] as const);
      return [a, b, d === 1 ? b * rng.int(2, 4) : retry(() => rng.pick([1.5, 2.5, 3.5, 4.5, 6, 7.5, 8]), notMultiple(b))];
    },
    xu: tx('mL'),
    yu: tx('L'),
    given: (name, a, b) => `The fuel for ${name}’s chainsaw is a mix of gas and oil: ${q(a, 'mL')} of oil for every ${q(b, 'L')} of gas.`,
    ask: (c) => `How many millilitres of oil should be mixed with ${q(c, 'L')} of gas?`,
    final: (x) => `Mix in ${x} of oil.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      const [a, b] = rng.pick([[2, 50], [3, 100], [4, 100], [5, 100], [1.5, 50]] as const);
      return [a, b, d === 1 ? b * rng.int(2, 6) : retry(() => rng.int(12, 95) * 10, notMultiple(b))];
    },
    xu: tx('kg'),
    yu: M2,
    given: (name, a, b) => `${name} is a landscaper who spreads ${q(a, 'kg')} of fertilizer for every ${qq(b, M2)} of lawn.`,
    ask: (c) => `How many kilograms of fertilizer are needed for a lawn with an area of ${qq(c, M2)}?`,
    final: (x) => `${x} of fertilizer are needed.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      const [a, b] = rng.pick([[1, 5], [2, 10], [3, 20], [0.5, 5]] as const);
      return [a, b, d === 1 ? b * rng.int(2, 6) : retry(() => rng.int(6, 48), notMultiple(b))];
    },
    xu: tx('mL'),
    yu: tx('kg'),
    given: (name, a, b) => `${name} works at a veterinary clinic. The dose of a dog medicine is ${q(a, 'mL')} for every ${q(b, 'kg')} of body mass.`,
    ask: (c) => `What dose should a dog with a mass of ${q(c, 'kg')} get?`,
    final: (x) => `The dog should get ${x}.`,
    dp: 1,
  },
];

function proportionBasic(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick(PROP_CTX);
  const name = rng.pick(NAMES);
  const fits = (x: number) => {
    const e = exactDp(x);
    return e >= 0 && e <= ctx.dp;
  };
  const [a, b, c] = retry(() => ctx.nums(rng, d), ([a, b, c]) => fits((a * c) / b) || !onEdge((a * c) / b, ctx.dp));
  const x = (a * c) / b;
  const exact = fits(x);
  const xs = exact ? qq(x, ctx.xu) : qq(roundTo(x, ctx.dp), ctx.xu);
  const solution = [`Set up a proportion with matching units in the same positions: $\\dfrac{${num(a)}\\ ${ctx.xu}}{${num(b)}\\ ${ctx.yu}} = \\dfrac{x}{${num(c)}\\ ${ctx.yu}}$`];
  if (d === 1) {
    const k = c / b;
    solution.push(`The new amount is $${num(c)} \\div ${num(b)} = ${k}$ times as big, so multiply the top by $${k}$ too.`, `$x = ${num(a)} \\times ${k} = ${num(x)}$`);
  } else {
    solution.push(
      `Multiply both sides by $${num(c)}$: $x = \\dfrac{${num(a)} \\times ${num(c)}}{${num(b)}} ${eq(x)}$`,
      `Check by estimating: $${num(c)}$ is about $${num(roundTo(c / b, 1))}$ times $${num(b)}$, and $${num(a)} \\times ${num(roundTo(c / b, 1))} \\approx ${num(roundTo(a * roundTo(c / b, 1), 1))}$, which is close.`,
    );
  }
  solution.push(cap(ctx.final(exact ? xs : `about ${xs}`)));
  return {
    prompt: `${ctx.given(name, a, b)} ${ctx.ask(c)}${exact ? '' : ` Round ${roundingPhrase(ctx.dp)}.`}`,
    parts: [exact ? exactPart(x, ctx.xu.replace(/\\text\{(.*)\}/, '$1').replace('^2', '²')) : numPart(x, { decimals: ctx.dp, suffix: ctx.xu.replace(/\\text\{(.*)\}/, '$1').replace('^2', '²') })],
    hints: [
      'Write two equal ratios with the same units in the same positions (top and bottom).',
      d === 1 ? `How many times bigger is $${num(c)}$ than $${num(b)}$?` : 'Multiply both sides of the proportion by the number under $x$.',
    ],
    solution,
  };
}

function proportionMulti(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const mode = rng.pick(['fuelCost', 'paint', 'recipe', 'fertilizer', 'mix'] as const);
  if (mode === 'fuelCost') {
    const { r, D, p } = retry(
      () => ({ r: rng.float(7, 15, 1), D: rng.int(18, 75) * 10, p: rng.int(125, 179) / 100 }),
      (o) => !onEdge(((o.r * o.D) / 100) * o.p, 2),
    );
    const L = (r * D) / 100;
    const cost = L * p;
    return {
      prompt: `${name} is planning a ${q(D, 'km')} road trip in a pickup truck that uses ${q(r, 'L')} of gas per $100\\ ${tx('km')}$. Suppose gas costs ${money(p)} per litre. How much will the gas for the trip cost, ${CENT}?`,
      parts: [moneyPart(cost)],
      hints: ['First find how many litres of gas the trip needs.', 'Then multiply the litres by the price per litre.'],
      solution: [
        `Litres needed: $\\dfrac{${num(r)}\\ ${tx('L')}}{100\\ ${tx('km')}} = \\dfrac{x}{${D}\\ ${tx('km')}}$, so $x = \\dfrac{${num(r)} \\times ${D}}{100} ${eq(L)}\\ ${tx('L')}$`,
        `Cost: $${num(L)} \\times ${mv(p)} ${eq(cost)}$`,
        `The gas will cost about ${money(cost)}.`,
      ],
    };
  }
  if (mode === 'paint') {
    const C = rng.pick([35, 37, 38, 40]);
    const A = retry(() => rng.int(40, 140), (A) => {
      const f = (2 * A) / C - Math.floor((2 * A) / C);
      return f > 0.1 && f < 0.9;
    });
    const cans = Math.ceil((2 * A) / C);
    const place = rng.pick(['a community hall', 'a hockey arena lobby', 'a church basement', 'a daycare', 'a farmhouse kitchen']);
    return {
      prompt: `${name} is painting the walls of ${place}. The walls have a total area of ${qq(A, M2)}, and they need two coats. One can of paint covers about ${qq(C, M2)}. How many cans of paint must ${name} buy?`,
      parts: [numPart(cans, { suffix: 'cans' })],
      hints: ['Two coats means you paint the whole area twice.', 'Divide the total area by the area one can covers, then round **up** — a store will not sell part of a can.'],
      solution: [
        `Two coats: $2 \\times ${A} = ${2 * A}\\ ${M2}$ to paint.`,
        `Cans: $${2 * A} \\div ${C} \\approx ${num((2 * A) / C, 2)}$`,
        `${name} cannot buy part of a can, so round up: ${name} must buy $${cans}$ cans.`,
      ],
    };
  }
  if (mode === 'recipe') {
    const dish = rng.pick(['bannock', 'pancakes', 'pizza dough', 'perogy dough', 'biscuits']);
    const s = rng.pick([6, 8, 12, 16, 24]);
    const g = rng.pick([400, 450, 500, 600, 750]);
    const N = retry(() => rng.int(5, 30) * 5, (N) => !isWhole(N / s) && !onEdge((g * N) / s / 1000, 1));
    const grams = (g * N) / s;
    const kg = grams / 1000;
    return {
      prompt: `A recipe for ${dish} that serves $${s}$ people uses ${q(g, 'g')} of flour. ${name} is making ${dish} for $${N}$ people at a community feast. How many **kilograms** of flour are needed, ${roundingPhrase(1)}?`,
      parts: [numPart(kg, { decimals: 1, suffix: 'kg' })],
      hints: ['Set up a proportion to find the grams of flour first.', 'Then change grams to kilograms: $1000\\ \\text{g} = 1\\ \\text{kg}$.'],
      solution: [
        `$\\dfrac{${g}\\ ${tx('g')}}{${s}\\ ${tx('people')}} = \\dfrac{x}{${N}\\ ${tx('people')}}$, so $x = \\dfrac{${g} \\times ${N}}{${s}} ${eq(grams)}\\ ${tx('g')}$`,
        `Change to kilograms: $${num(grams)} \\div 1000 ${eq(kg)}\\ ${tx('kg')}$`,
        `${name} needs about $${fmtFixed(kg, 1)}\\ ${tx('kg')}$ of flour.`,
      ],
    };
  }
  if (mode === 'fertilizer') {
    const a = rng.pick([2, 2.5, 3, 4]);
    const B = rng.pick([10, 20, 25]);
    const { L, W } = retry(() => ({ L: rng.int(30, 80), W: rng.int(15, 50) }), (o) => {
      const bags = (a * o.L * o.W) / 100 / B;
      const f = bags - Math.floor(bags);
      return f > 0.1 && f < 0.9;
    });
    const kg = (a * L * W) / 100;
    const bags = Math.ceil(kg / B);
    return {
      prompt: `${name} is fertilizing a rectangular sports field that measures ${q(L, 'm')} by ${q(W, 'm')}. The fertilizer is spread at ${q(a, 'kg')} per $100\\ ${M2}$ and is sold in ${q(B, 'kg')} bags. How many bags are needed?`,
      parts: [numPart(bags, { suffix: 'bags' })],
      hints: ['Find the area of the field first.', 'Use a proportion to find the kilograms of fertilizer, then divide by the bag size and round up.'],
      solution: [
        `Area: $${L} \\times ${W} = ${num(L * W)}\\ ${M2}$`,
        `Fertilizer: $\\dfrac{${num(a)}\\ ${tx('kg')}}{100\\ ${M2}} = \\dfrac{x}{${num(L * W)}\\ ${M2}}$, so $x = \\dfrac{${num(a)} \\times ${num(L * W)}}{100} = ${num(kg)}\\ ${tx('kg')}$`,
        `Bags: $${num(kg)} \\div ${B} \\approx ${num(kg / B, 2)}$`,
        `Part of a bag is not enough, so round up: $${bags}$ bags are needed.`,
      ],
    };
  }
  const R = rng.pick([40, 50]);
  const G = rng.pick([2.5, 3.5, 4, 4.5, 5, 6, 7.5, 10]);
  const oil = (G * 1000) / R;
  const tool = rng.pick(['chainsaw', 'string trimmer', 'leaf blower', 'outboard motor']);
  return {
    prompt: `The engine on ${name}’s ${tool} uses a ${R}:1 mix of gas to oil. That means $${R}$ parts gas for every $1$ part oil. How many **millilitres** of oil should be added to ${q(G, 'L')} of gas?`,
    parts: [exactPart(oil, 'mL')],
    hints: ['Change the litres of gas to millilitres first: $1\\ \\text{L} = 1000\\ \\text{mL}$.', `For every $${R}$ mL of gas you need $1$ mL of oil.`],
    solution: [
      `Change to millilitres: $${num(G)}\\ ${tx('L')} = ${num(G * 1000)}\\ ${tx('mL')}$`,
      `Proportion: $\\dfrac{1\\ ${tx('part oil')}}{${R}\\ ${tx('parts gas')}} = \\dfrac{x}{${num(G * 1000)}\\ ${tx('mL')}}$`,
      `$x = ${num(G * 1000)} \\div ${R} = ${num(oil)}$`,
      `Add $${num(oil)}\\ ${tx('mL')}$ of oil.`,
    ],
  };
}

const proportion = skill({
  id: 'm103-proportion',
  name: 'Solving proportions',
  description: 'Set up and solve a proportion to scale a recipe, find paint or fertilizer needed, or plan fuel for a trip.',
  outcomes: ['N1'],
  lessonId: 'm103-1-1',
  calculator: true,
  gen(rng, d) {
    return d === 3 ? proportionMulti(rng) : proportionBasic(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Unit price
// ---------------------------------------------------------------------------

const UP1: Array<{ pack: (n: number) => string; each: string; ns: number[]; per: number[]; store: string }> = [
  { pack: (n) => `a pack of $${n}$ spark plugs`, each: 'spark plug', ns: [4, 6, 8], per: [3.5, 4.25, 5, 6.5, 7.75], store: 'an auto parts store' },
  { pack: (n) => `a box of $${n}$ doughnuts`, each: 'doughnut', ns: [6, 12], per: [0.9, 1.15, 1.25, 1.4, 1.5], store: 'a bakery' },
  { pack: (n) => `${art(n)} ${q(n, 'kg')} bag of rice`, each: 'kilogram', ns: [2, 4, 5, 8, 10], per: [1.6, 1.8, 2.1, 2.4, 2.75], store: 'a grocery store' },
  { pack: (n) => `${art(n)} ${q(n, 'L')} jug of windshield washer fluid`, each: 'litre', ns: [2, 4], per: [1.25, 1.5, 1.75, 2.25], store: 'a gas station' },
  { pack: (n) => `a case of $${n}$ bottles of water`, each: 'bottle', ns: [12, 24, 36], per: [0.2, 0.25, 0.3, 0.35], store: 'a convenience store' },
  { pack: (n) => `a pack of $${n}$ pairs of work gloves`, each: 'pair', ns: [3, 5, 6, 10], per: [2.5, 3.2, 4, 4.5], store: 'a hardware store' },
  { pack: (n) => `${art(n)} ${q(n, 'kg')} bag of birdseed`, each: 'kilogram', ns: [4, 5, 8, 10], per: [1.4, 1.75, 2.2, 2.6], store: 'a farm supply store' },
];

interface UPItem {
  thing: (s: number) => string;
  sizes: number[];
  unit: string;
  /** The unit price is per `base` units (100 g, 1 L ...). */
  base: number;
  perText: string;
  lo: number;
  hi: number;
  store: string;
}

const UP2: UPItem[] = [
  { thing: (s) => `${art(s)} ${q(s, 'g')} box of cereal`, sizes: [350, 425, 525, 650, 750, 900], unit: 'g', base: 100, perText: `per $100\\ ${tx('g')}$`, lo: 0.6, hi: 1.1, store: 'a grocery store' },
  { thing: (s) => `${art(s)} ${q(s, 'g')} bag of ground coffee`, sizes: [300, 340, 454, 640, 925], unit: 'g', base: 100, perText: `per $100\\ ${tx('g')}$`, lo: 1.5, hi: 2.6, store: 'a grocery store' },
  { thing: (s) => `${art(s)} ${q(s, 'mL')} bottle of shampoo`, sizes: [355, 400, 650, 750, 975], unit: 'mL', base: 100, perText: `per $100\\ ${tx('mL')}$`, lo: 0.8, hi: 1.8, store: 'a drugstore' },
  { thing: (s) => `${art(s)} ${q(s, 'L')} jug of engine oil`, sizes: [3.78, 4.4, 4.73, 5], unit: 'L', base: 1, perText: 'per litre', lo: 6, hi: 9, store: 'an auto parts store' },
  { thing: (s) => `${art(s)} ${q(s, 'kg')} bag of dog food`, sizes: [6.8, 8, 11.3, 13.6, 15, 18], unit: 'kg', base: 1, perText: 'per kilogram', lo: 3, hi: 6, store: 'a pet store' },
  { thing: (s) => `a box of $${s}$ deck screws`, sizes: [350, 700, 1200, 1750], unit: 'screws', base: 100, perText: 'per $100$ screws', lo: 6, hi: 11, store: 'a hardware store' },
  { thing: (s) => `${art(s)} ${q(s, 'g')} jar of peanut butter`, sizes: [500, 750, 1000], unit: 'g', base: 100, perText: `per $100\\ ${tx('g')}$`, lo: 0.6, hi: 1.1, store: 'a grocery store' },
];

interface UP3Item {
  thing: (s: number) => string;
  sizes: number[];
  /** Number of "per" units in one package. */
  count: (s: number) => number;
  convert: (s: number) => string;
  perText: string;
  lo: number;
  hi: number;
  store: string;
}

const UP3: UP3Item[] = [
  {
    thing: (s) => `${art(s)} ${q(s, 'kg')} bag of basmati rice`,
    sizes: [2, 2.5, 4, 8, 10],
    count: (s) => s * 10,
    convert: (s) => `Change to grams: $${num(s)}\\ ${tx('kg')} = ${num(s * 1000)}\\ ${tx('g')}$, which is $${num(s * 1000)} \\div 100 = ${num(s * 10)}$ groups of $100\\ ${tx('g')}$.`,
    perText: `per $100\\ ${tx('g')}$`,
    lo: 0.3,
    hi: 0.6,
    store: 'a grocery store',
  },
  {
    thing: (s) => `${art(s)} ${q(s, 'g')} package of ground beef`,
    sizes: [450, 680, 900, 1150, 1360],
    count: (s) => s / 1000,
    convert: (s) => `Change to kilograms: $${num(s)}\\ ${tx('g')} = ${num(s)} \\div 1000 = ${num(s / 1000)}\\ ${tx('kg')}$.`,
    perText: 'per kilogram',
    lo: 9,
    hi: 14,
    store: 'a butcher shop',
  },
  {
    thing: (s) => `${art(s)} ${q(s, 'mL')} bottle of maple syrup`,
    sizes: [250, 375, 540, 750],
    count: (s) => s / 1000,
    convert: (s) => `Change to litres: $${num(s)}\\ ${tx('mL')} = ${num(s)} \\div 1000 = ${num(s / 1000)}\\ ${tx('L')}$.`,
    perText: 'per litre',
    lo: 24,
    hi: 40,
    store: 'a farmers’ market',
  },
  {
    thing: (s) => `${art(s)} ${q(s, 'mL')} bottle of canola oil`,
    sizes: [500, 750, 946, 1420],
    count: (s) => s / 1000,
    convert: (s) => `Change to litres: $${num(s)}\\ ${tx('mL')} = ${num(s)} \\div 1000 = ${num(s / 1000)}\\ ${tx('L')}$.`,
    perText: 'per litre',
    lo: 4,
    hi: 8,
    store: 'a grocery store',
  },
  {
    thing: (s) => `${art(s)} ${q(s, 'L')} jug of laundry detergent`,
    sizes: [1.47, 2.03, 2.95, 4.43],
    count: (s) => s * 10,
    convert: (s) => `Change to millilitres: $${num(s)}\\ ${tx('L')} = ${num(s * 1000)}\\ ${tx('mL')}$, which is $${num(s * 1000)} \\div 100 = ${num(s * 10)}$ groups of $100\\ ${tx('mL')}$.`,
    perText: `per $100\\ ${tx('mL')}$`,
    lo: 0.2,
    hi: 0.45,
    store: 'a big-box store',
  },
  {
    thing: (s) => `${art(s)} ${q(s, 'g')} bag of coffee beans`,
    sizes: [340, 454, 907],
    count: (s) => s / 1000,
    convert: (s) => `Change to kilograms: $${num(s)}\\ ${tx('g')} = ${num(s)} \\div 1000 = ${num(s / 1000)}\\ ${tx('kg')}$.`,
    perText: 'per kilogram',
    lo: 20,
    hi: 35,
    store: 'a coffee shop',
  },
  {
    thing: (s) => `${art(s)} ${q(s, 'L')} jug of apple juice`,
    sizes: [1.36, 1.89, 2.84],
    count: (s) => s * 10,
    convert: (s) => `Change to millilitres: $${num(s)}\\ ${tx('L')} = ${num(s * 1000)}\\ ${tx('mL')}$, which is $${num(s * 1000)} \\div 100 = ${num(s * 10)}$ groups of $100\\ ${tx('mL')}$.`,
    perText: `per $100\\ ${tx('mL')}$`,
    lo: 0.12,
    hi: 0.25,
    store: 'a grocery store',
  },
];

const unitPrice = skill({
  id: 'm103-unit-price',
  name: 'Unit price',
  description: 'Calculate the unit price of an item, per item, per kilogram, per litre or per 100 g, converting units when needed.',
  outcomes: ['N1'],
  lessonId: 'm103-1-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const it = rng.pick(UP1);
      const n = rng.pick(it.ns);
      const per = rng.pick(it.per);
      const total = roundTo(n * per, 2);
      return {
        prompt: `At ${it.store}, ${it.pack(n)} costs ${tag(total)}. What is the unit price per ${it.each}, ${CENT}?`,
        parts: [moneyPart(per, `per ${it.each}`)],
        hints: ['Unit price = price ÷ number of units.', `Divide $${mv(total)}$ by $${n}$.`],
        solution: ['Unit price = price ÷ number of units.', `$${mv(total)} \\div ${n} = ${mv(per)}$`, `The unit price is ${money(per)} per ${it.each}.`],
      };
    }
    if (d === 2) {
      const it = rng.pick(UP2);
      const { s, p } = retry(
        () => {
          const s = rng.pick(it.sizes);
          return { s, p: price9((s / it.base) * rng.float(it.lo, it.hi, 3)) };
        },
        (o) => !onEdge(o.p / (o.s / it.base), 2),
      );
      const groups = s / it.base;
      const up = p / groups;
      const steps =
        it.base === 1
          ? [`Unit price ${it.perText} = price ÷ number of ${it.unit === 'L' ? 'litres' : 'kilograms'}.`, `$${mv(p)} \\div ${num(s)} ${eq(up)}$`]
          : [`Count the groups of $100$: $${num(s)} \\div 100 = ${num(groups)}$.`, `Unit price = price ÷ number of groups: $${mv(p)} \\div ${num(groups)} ${eq(up)}$`];
      return {
        prompt: `${name} is shopping at ${it.store}. ${cap(it.thing(s))} costs ${money(p)}. What is the unit price ${it.perText}, ${CENT}?`,
        parts: [moneyPart(up)],
        hints: ['Unit price = price ÷ number of units.', it.base === 1 ? 'Divide the price by the size.' : `First find how many groups of $100$ are in $${num(s)}$.`],
        solution: [...steps, `The unit price is ${abt(up)}${money(up)} ${it.perText}.`],
      };
    }
    const it = rng.pick(UP3);
    const { s, p } = retry(
      () => {
        const s = rng.pick(it.sizes);
        return { s, p: price9(it.count(s) * rng.float(it.lo, it.hi, 3)) };
      },
      (o) => !onEdge(o.p / it.count(o.s), 2),
    );
    const c = it.count(s);
    const up = p / c;
    return {
      prompt: `${name} is comparing prices at ${it.store}. ${cap(it.thing(s))} costs ${money(p)}. What is the unit price ${it.perText}, ${CENT}?`,
      parts: [moneyPart(up)],
      hints: ['The size and the unit price use different units. Convert the size first.', 'Remember $1\\ \\text{kg} = 1000\\ \\text{g}$ and $1\\ \\text{L} = 1000\\ \\text{mL}$.'],
      solution: [it.convert(s), `Unit price: $${mv(p)} \\div ${num(c)} ${eq(up)}$`, `The unit price is ${abt(up)}${money(up)} ${it.perText}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.2 Best buy (multiple choice)
// ---------------------------------------------------------------------------

interface BBProduct {
  item: string;
  container: string;
  unit: string;
  metric: boolean;
  sizes: number[];
  /** Size pairs for difficulty 1, the larger a whole multiple of the smaller. */
  pairs: Array<[number, number]>;
  base: number;
  perText: string;
  lo: number;
  hi: number;
}

const BB: BBProduct[] = [
  { item: 'flour', container: 'bag', unit: 'kg', metric: true, sizes: [1, 2.5, 5, 10], pairs: [[1, 5], [2.5, 10], [5, 10], [1, 2]], base: 1, perText: 'per kilogram', lo: 1.4, hi: 2.6 },
  { item: 'windshield washer fluid', container: 'jug', unit: 'L', metric: true, sizes: [1, 2, 3.78, 4], pairs: [[1, 4], [2, 4], [1, 2]], base: 1, perText: 'per litre', lo: 1.1, hi: 2.4 },
  { item: 'yogurt', container: 'tub', unit: 'g', metric: true, sizes: [175, 500, 650, 750, 1500], pairs: [[500, 1500], [750, 1500]], base: 100, perText: 'per 100 g', lo: 0.55, hi: 1.2 },
  { item: 'ketchup', container: 'bottle', unit: 'mL', metric: true, sizes: [375, 750, 1000, 1500], pairs: [[375, 750], [750, 1500], [375, 1500]], base: 100, perText: 'per 100 mL', lo: 0.45, hi: 0.9 },
  { item: 'drywall screws', container: 'box', unit: 'screws', metric: false, sizes: [100, 250, 500, 1000], pairs: [[100, 500], [250, 1000], [500, 1000]], base: 100, perText: 'per 100 screws', lo: 3, hi: 7 },
  { item: 'AA batteries', container: 'pack', unit: 'batteries', metric: false, sizes: [4, 8, 12, 24], pairs: [[4, 12], [8, 24], [4, 8], [12, 24]], base: 1, perText: 'per battery', lo: 0.7, hi: 1.6 },
  { item: 'potatoes', container: 'bag', unit: 'kg', metric: true, sizes: [2, 4.54, 5, 10], pairs: [[2, 10], [5, 10]], base: 1, perText: 'per kilogram', lo: 1, hi: 2.2 },
  { item: 'rice', container: 'bag', unit: 'kg', metric: true, sizes: [1, 2, 4, 8], pairs: [[1, 4], [2, 8], [4, 8]], base: 1, perText: 'per kilogram', lo: 1.8, hi: 3.5 },
];

const sizeMd = (p: BBProduct, s: number) => (p.metric ? `the ${q(s, p.unit)} ${p.container}` : `the ${p.container} of $${s}$ ${p.unit}`);
const sizeCell = (p: BBProduct, s: number) => `${String(s)} ${p.unit}`;
const NOTE = 'The lowest unit price is only the best buy if you will use it all. Also think about how much you need, waste (food that spoils) and quality.';

function bestBuyTwo(rng: Rng, name: string): Out {
  const p = rng.pick(BB);
  const [s1, s2] = rng.pick(p.pairs);
  const m = s2 / s1;
  const { P1, P2 } = retry(
    () => {
      const u = rng.float(p.lo, p.hi, 3);
      const P1 = Math.max(1, Math.round((s1 / p.base) * u * 10) / 10);
      const f = rng.chance(0.65) ? rng.float(0.75, 0.9, 3) : rng.float(1.1, 1.25, 3);
      return { P1, P2: Math.round(P1 * m * f * 10) / 10 };
    },
    (o) => Math.abs(o.P2 / (o.P1 * m) - 1) >= 0.05,
  );
  const big = P2 < P1 * m;
  const u1 = P1 / (s1 / p.base);
  const u2 = P2 / (s2 / p.base);
  return {
    prompt: `${name} is buying ${p.item}. The store sells two sizes, shown in the table. Which is the better buy?`,
    figure: { type: 'table', headers: ['Size', 'Price'], rows: [[sizeCell(p, s1), cell(P1)], [sizeCell(p, s2), cell(P2)]] },
    parts: [{ answer: fixedChoice([`${cap(sizeMd(p, s1))} for ${money(P1)}`, `${cap(sizeMd(p, s2))} for ${money(P2)}`, 'Both have the same unit price'], big ? 1 : 0) }],
    hints: [`The larger size is $${m}$ times as big. What would $${m}$ of the smaller size cost?`, `Or compare unit prices ${p.perText}: divide each price by its size.`],
    solution: [
      `The larger size holds $${num(s2)} \\div ${num(s1)} = ${m}$ times as much.`,
      `$${m}$ of the smaller size would cost $${m} \\times ${mv(P1)} = ${mv(m * P1)}$ dollars, compared with ${money(P2)} for one larger size.`,
      `Unit prices ${p.perText}: smaller ${uprice(u1)}, larger ${uprice(u2)}.`,
      NOTE,
      `The better buy is ${sizeMd(p, big ? s2 : s1)} (lower unit price).`,
    ],
  };
}

function bestBuyThree(rng: Rng, name: string): Out {
  const p = rng.pick(BB);
  const sizes = rng.sample(p.sizes, 3).sort((a, b) => a - b);
  const target = rng.weighted([[2, 5], [1, 3], [0, 2]] as const);
  const prices = retry(
    () => {
      const u = rng.float(p.lo, p.hi, 3);
      return sizes.map((s, i) => price9((s / p.base) * u * (i === target ? rng.float(0.8, 0.9, 3) : rng.float(0.97, 1.12, 3))));
    },
    (ps) => {
      const us = ps.map((x, i) => x / (sizes[i] / p.base));
      const others = us.filter((_, i) => i !== target);
      return Math.min(...others) / us[target] >= 1.03;
    },
  );
  const us = prices.map((x, i) => x / (sizes[i] / p.base));
  const best = us.indexOf(Math.min(...us));
  const rows = sizes.map((s, i) => [sizeCell(p, s), cell(prices[i])]);
  const div = (i: number) => {
    const n = sizes[i] / p.base;
    return n === 1 ? `${money(prices[i])} for one unit, so` : `$${mv(prices[i])} \\div ${num(n)}$, so`;
  };
  return {
    prompt: `${name} is stocking up on ${p.item}. The store sells three sizes, shown in the table. Which size is the best buy?`,
    figure: { type: 'table', headers: ['Size', 'Price'], rows },
    parts: [{ answer: fixedChoice([...sizes.map((s, i) => `${cap(sizeMd(p, s))} for ${money(prices[i])}`), 'All three have the same unit price'], best) }],
    hints: [`Find the unit price of each size ${p.perText}.`, 'The best buy has the lowest unit price. The biggest size is not always the cheapest per unit.'],
    solution: [
      p.base === 1 ? `Unit price ${p.perText} = price ÷ size.` : `Unit price ${p.perText} = price ÷ (size ÷ 100).`,
      ...sizes.map((s, i) => `${cap(sizeMd(p, s))}: ${div(i)} ${uprice(us[i])} ${p.perText}`),
      NOTE,
      `The best buy is ${sizeMd(p, sizes[best])}.`,
    ],
  };
}

function bestBuyDeal(rng: Rng, name: string): Out {
  const p = rng.pick(BB.filter((x) => x.pairs.length > 0));
  const [s1, s2] = rng.pick(p.pairs);
  const per = (price: number, size: number) => price / (size / p.base);
  if (rng.chance(0.5)) {
    // Coupon on the smaller size
    const flip = rng.chance(0.5);
    const { P1, P2, X } = retry(
      () => {
        const u = rng.float(p.lo, p.hi, 3);
        const P2 = price9((s2 / p.base) * u);
        const P1 = price9((s1 / p.base) * u * rng.float(1.08, 1.2, 3));
        const target = per(P2, s2) * (flip ? rng.float(0.82, 0.93, 3) : rng.float(1.06, 1.15, 3)) * (s1 / p.base);
        const X = Math.round((P1 - target) * 4) / 4;
        return { P1, P2, X };
      },
      (o) => {
        if (o.X <= 0 || o.X > o.P1 * 0.6) return false;
        const a = per(o.P1 - o.X, s1);
        const b = per(o.P2, s2);
        return Math.max(a, b) / Math.min(a, b) >= 1.03 && per(o.P1, s1) > b * 1.03;
      },
    );
    const eff = P1 - X;
    const ua = per(eff, s1);
    const ub = per(P2, s2);
    return {
      prompt: `${name} is buying ${p.item}. The prices are shown in the table. ${name} also has a coupon for ${money(X)} off one ${sizeMd(p, s1).replace('the ', '')}. Which is the better buy?`,
      figure: { type: 'table', headers: ['Size', 'Price'], rows: [[sizeCell(p, s1), cell(P1)], [sizeCell(p, s2), cell(P2)]] },
      parts: [{ answer: fixedChoice([`${cap(sizeMd(p, s1))}, using the coupon`, cap(sizeMd(p, s2)), 'Both have the same unit price'], ua < ub ? 0 : 1) }],
      hints: ['Subtract the coupon from the price it applies to before you find the unit price.', `Compare the unit prices ${p.perText}.`],
      solution: [
        `With the coupon, ${sizeMd(p, s1)} costs $${mv(P1)} - ${mv(X)} = ${mv(eff)}$ dollars.`,
        `Unit price with the coupon: ${uprice(ua)} ${p.perText}.`,
        `Unit price of ${sizeMd(p, s2)}: ${uprice(ub)} ${p.perText}.`,
        NOTE,
        `The better buy is ${ua < ub ? `${sizeMd(p, s1)} with the coupon` : sizeMd(p, s2)}.`,
      ],
    };
  }
  // Multi-buy deal on the smaller size
  const bogo = rng.chance(0.5);
  const dealWins = rng.chance(0.5);
  const { P1, T, P2 } = retry(
    () => {
      const u = rng.float(p.lo, p.hi, 3);
      const P1 = price9((s1 / p.base) * u * rng.float(1.0, 1.15, 3));
      const T = bogo ? 2 * P1 : Math.max(1, Math.round(3 * P1 * rng.float(0.72, 0.88, 3)));
      const eA = T / ((3 * s1) / p.base);
      const P2 = price9((s2 / p.base) * eA * (dealWins ? rng.float(1.06, 1.18, 3) : rng.float(0.82, 0.94, 3)));
      return { P1, T, P2 };
    },
    (o) => {
      const a = o.T / ((3 * s1) / p.base);
      const b = per(o.P2, s2);
      return o.T < 3 * o.P1 && Math.max(a, b) / Math.min(a, b) >= 1.03;
    },
  );
  const ua = T / ((3 * s1) / p.base);
  const ub = per(P2, s2);
  const dealText = bogo ? 'buy 2, get 1 free' : `3 for ${tag(T)}`;
  return {
    prompt: `${name} needs ${p.item}. ${cap(sizeMd(p, s1))} is on sale: **${dealText}** (regular price ${money(P1)} each). ${cap(sizeMd(p, s2))} costs ${money(P2)}. Which is the better buy, if ${name} can use all of it?`,
    figure: { type: 'table', headers: ['Size', 'Price'], rows: [[sizeCell(p, s1), `${cell(P1)} each, or ${bogo ? 'buy 2 get 1 free' : `3 for ${cell(T)}`}`], [sizeCell(p, s2), cell(P2)]] },
    parts: [{ answer: fixedChoice([`The deal on ${sizeMd(p, s1)}`, cap(sizeMd(p, s2)), 'Both have the same unit price'], ua < ub ? 0 : 1) }],
    hints: ['Work out what the deal really costs and how much you get for that price.', `Then compare unit prices ${p.perText}.`],
    solution: [
      bogo
        ? `With the deal, ${name} pays for $2$ and gets $3$: $2 \\times ${mv(P1)} = ${mv(T)}$ dollars for $3 \\times ${num(s1)} = ${num(3 * s1)}$ ${p.unit}.`
        : `With the deal, ${name} pays ${money(T)} for $3 \\times ${num(s1)} = ${num(3 * s1)}$ ${p.unit}.`,
      `Deal unit price: ${uprice(ua)} ${p.perText}.`,
      `Unit price of ${sizeMd(p, s2)}: ${uprice(ub)} ${p.perText}.`,
      NOTE,
      `The better buy is ${ua < ub ? `the deal on ${sizeMd(p, s1)}` : sizeMd(p, s2)}.`,
    ],
  };
}

const bestBuy = skill({
  id: 'm103-best-buy',
  name: 'Finding the best buy',
  description: 'Compare unit prices of two or three sizes, including coupons and multi-buy deals, to choose the better buy.',
  outcomes: ['N1'],
  lessonId: 'm103-1-2',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return bestBuyTwo(rng, name);
    if (d === 2) return bestBuyThree(rng, name);
    return bestBuyDeal(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Percent change
// ---------------------------------------------------------------------------

const PC_ITEMS: Array<{ what: string; lo: number; hi: number; step: number; dir?: 'up' | 'down'; maxP?: number }> = [
  { what: 'the price of a bag of cattle feed', lo: 20, hi: 45, step: 5 },
  { what: 'the price of a pair of steel-toed boots', lo: 120, hi: 240, step: 20 },
  { what: 'the cost of a monthly phone plan', lo: 40, hi: 100, step: 10 },
  { what: 'the price of a sheet of plywood', lo: 30, hi: 80, step: 10 },
  { what: 'the price of an oil change at a garage', lo: 60, hi: 140, step: 20, dir: 'up' },
  { what: 'the price of a composite hockey stick', lo: 100, hi: 300, step: 20 },
  { what: 'the monthly rent for a basement suite', lo: 900, hi: 1600, step: 100, dir: 'up', maxP: 20 },
  { what: 'the asking price for a used snowmobile', lo: 3000, hi: 9000, step: 500, dir: 'down' },
  { what: 'the value of a used pickup truck', lo: 12000, hi: 30000, step: 1000, dir: 'down' },
  { what: 'the price of a set of winter tires', lo: 600, hi: 1200, step: 100 },
];

const percentChange = skill({
  id: 'm103-percent-change',
  name: 'Percent increase and decrease',
  description: 'Calculate the percent increase or decrease between an original and a new price, and find an original price from a new price.',
  outcomes: ['N1', 'A1'],
  lessonId: 'm103-1-3',
  calculator: true,
  gen(rng, d) {
    const it = rng.pick(PC_ITEMS);
    const up = it.dir ? it.dir === 'up' : rng.chance(0.5);
    const word = up ? 'increase' : 'decrease';
    const capP = (ps: number[]) => ps.filter((x) => x <= (it.maxP ?? 100));
    const pick = () => it.step * rng.int(Math.ceil(it.lo / it.step), Math.floor(it.hi / it.step));
    if (d === 1) {
      const orig = pick();
      const p = rng.pick(capP([10, 20, 25, 50]));
      const nw = roundTo(orig * (1 + (up ? p : -p) / 100), 2);
      const ch = Math.abs(nw - orig);
      return {
        prompt: `${cap(it.what)} went ${up ? 'up' : 'down'} from ${tag(orig)} to ${tag(nw)}. By what percent did it ${word}?`,
        parts: [numPart(p, { suffix: '%' })],
        hints: ['Percent change = change ÷ original × 100%.', `The change is $${mv(Math.max(nw, orig))} - ${mv(Math.min(nw, orig))}$. Divide it by the **original** amount.`],
        solution: [
          `Change: $${mv(Math.max(nw, orig))} - ${mv(Math.min(nw, orig))} = ${mv(ch)}$ dollars.`,
          `Percent ${word} $= \\dfrac{\\text{change}}{\\text{original}} \\times 100\\% = \\dfrac{${mv(ch)}}{${mv(orig)}} \\times 100\\% = ${p}\\%$`,
          `It went ${up ? 'up' : 'down'} by $${p}\\%$.`,
        ],
      };
    }
    if (d === 2) {
      const cents = it.hi < 500 ? rng.pick([0, 0.49, 0.99]) : 0;
      const { orig, nw } = retry(
        () => {
          const orig = roundTo(rng.int(it.lo, it.hi - 1) + cents, 2);
          const f = rng.float(0.04, Math.min(0.38, (it.maxP ?? 100) / 100), 3);
          const raw = orig * (1 + (up ? f : -f));
          const nw = it.hi < 500 ? roundTo(Math.floor(raw) + rng.pick([0.29, 0.49, 0.79, 0.99]), 2) : Math.round(raw / 10) * 10;
          return { orig, nw };
        },
        (o) => (up ? o.nw > o.orig : o.nw < o.orig) && o.nw > 0 && !onEdge((Math.abs(o.nw - o.orig) / o.orig) * 100, 1),
      );
      const ch = Math.abs(nw - orig);
      const p = (ch / orig) * 100;
      return {
        prompt: `${cap(it.what)} went ${up ? 'up' : 'down'} from ${tag(orig)} to ${tag(nw)}. By what percent did it ${word}? Round ${roundingPhrase(1)} of a percent.`,
        parts: [numPart(p, { decimals: 1, suffix: '%' })],
        hints: ['Percent change = change ÷ original × 100%.', 'Always divide by the **original** (old) amount, not the new one.'],
        solution: [
          `Change: $${mv(Math.max(nw, orig))} - ${mv(Math.min(nw, orig))} = ${mv(ch)}$ dollars.`,
          `Percent ${word} $= \\dfrac{${mv(ch)}}{${mv(orig)}} \\times 100\\% ${eq(p)}\\%$`,
          `It went ${up ? 'up' : 'down'} by about $${fmtFixed(p, 1)}\\%$.`,
        ],
      };
    }
    const orig = rng.int(it.lo, it.hi);
    const p = rng.pick(capP([5, 10, 15, 20, 25, 30, 35, 40]));
    const mult = roundTo(1 + (up ? p : -p) / 100, 2);
    const nw = roundTo(orig * mult, 2);
    const wrong = roundTo(nw * (1 - (up ? p : -p) / 100), 2);
    return {
      prompt: `After a ${p}% ${word}, ${it.what} is now ${money(nw)}. What was it before the ${word}, ${CENT}?`,
      parts: [moneyPart(orig)],
      hints: [
        `The new amount is the original ${up ? 'plus' : 'minus'} ${p}% of the original, so new $=$ original $\\times ${num(mult)}$.`,
        `Rearrange the formula: original $=$ new $\\div ${num(mult)}$.`,
      ],
      solution: [
        `A ${p}% ${word} means new $=$ original $\\times (1 ${up ? '+' : '-'} ${num(p / 100)}) =$ original $\\times ${num(mult)}$.`,
        `Rearrange to solve for the original: original $=$ new $\\div ${num(mult)}$.`,
        `$${mv(nw)} \\div ${num(mult)} = ${mv(orig)}$`,
        `Check: $${mv(orig)} \\times ${num(mult)} = ${mv(nw)}$. (${up ? 'Taking' : 'Adding'} ${p}% ${up ? 'off' : 'to'} the new price would give ${money(wrong)}, which is wrong because the percent is of the original.)`,
        `It was ${money(orig)} before the ${word}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.3 Markups and discounts
// ---------------------------------------------------------------------------

const DISC_ITEMS = [
  { what: 'winter jacket', lo: 80, hi: 300, store: 'a clothing store' },
  { what: 'cordless drill', lo: 90, hi: 250, store: 'a hardware store' },
  { what: 'pair of work boots', lo: 100, hi: 220, store: 'a work-wear store' },
  { what: 'set of winter tires', lo: 600, hi: 1200, store: 'a tire shop' },
  { what: 'hockey helmet', lo: 60, hi: 180, store: 'a sporting goods store' },
  { what: 'barbecue', lo: 300, hi: 800, store: 'a hardware store' },
  { what: 'rolling tool chest', lo: 150, hi: 500, store: 'an auto parts store' },
  { what: 'snowblower', lo: 400, hi: 1100, store: 'a farm and garden store' },
];
const MARKUP_ITEMS = [
  { what: 'pair of jeans', lo: 20, hi: 45, store: 'a clothing store' },
  { what: 'hammer', lo: 10, hi: 25, store: 'a hardware store' },
  { what: 'bag of potting soil', lo: 5, hi: 12, store: 'a garden centre' },
  { what: 'coffee maker', lo: 25, hi: 60, store: 'a department store' },
  { what: 'skateboard', lo: 30, hi: 70, store: 'a sporting goods store' },
  { what: 'ball cap', lo: 6, hi: 15, store: 'a clothing store' },
  { what: 'tape measure', lo: 8, hi: 20, store: 'a hardware store' },
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford'];
const at = (rng: Rng, store: string) => `${store} in ${rng.pick(TOWNS)}`;
/** "the hardware store" from "a hardware store" or "an auto parts store". */
const theStore = (store: string) => store.replace(/^an? /, 'the ');

const salePrice = skill({
  id: 'm103-sale-price',
  name: 'Markups and discounts',
  description: 'Find a selling price after a markup and a sale price after a discount, including successive discounts.',
  outcomes: ['N1', 'A1'],
  lessonId: 'm103-1-3',
  calculator: true,
  gen(rng, d) {
    if (d < 3) {
      const markup = rng.chance(0.45);
      if (markup) {
        const it = rng.pick(MARKUP_ITEMS);
        const store = at(rng, it.store);
        const p = d === 1 ? rng.pick([25, 40, 50, 75, 100]) : rng.pick([30, 35, 45, 60, 65, 80, 120]);
        const askAmount = d === 2 && rng.chance(0.35);
        const cost = retry(
          () => (d === 1 ? 4 * rng.int(Math.ceil(it.lo / 4), Math.floor(it.hi / 4)) : roundTo(rng.int(it.lo, it.hi) + rng.pick([0.25, 0.4, 0.6, 0.75, 0.8, 0.15]), 2)),
          (c) => !onEdge((c * p) / 100, 2),
        );
        const amt = (cost * p) / 100;
        const sell = cost + amt;
        return {
          prompt: `${cap(store)} pays ${money(cost)} for each ${it.what} and marks the price up by ${p}%. ${askAmount ? 'How much is the markup in dollars' : 'What is the selling price'}, ${CENT}?`,
          parts: [moneyPart(askAmount ? amt : sell)],
          hints: ['Markup = markup percent × the store’s cost.', askAmount ? 'Write the percent as a decimal and multiply.' : 'Selling price = cost + markup.'],
          solution: [
            `Markup: $${num(p / 100)} \\times ${mv(cost)} ${eq(amt)}$`,
            ...(askAmount ? [`The markup is ${money(amt)}.`] : [`Selling price: $${mv(cost)} + ${num(amt)} ${eq(sell)}$`, `The selling price is ${money(sell)}.`]),
          ],
        };
      }
      const it = rng.pick(DISC_ITEMS);
      const store = at(rng, it.store);
      const p = d === 1 ? rng.pick([10, 20, 25, 30, 40, 50]) : rng.pick([15, 20, 25, 30, 35, 40, 45]);
      const askAmount = d === 2 && rng.chance(0.35);
      const P = retry(
        () => (d === 1 ? 20 * rng.int(Math.ceil(it.lo / 20), Math.floor(it.hi / 20)) : roundTo(rng.int(it.lo, it.hi) + rng.pick([0.99, 0.49, 0.95, 0.79, 0.29]), 2)),
        (x) => !onEdge((x * p) / 100, 2),
      );
      const disc = (P * p) / 100;
      const sale = P - disc;
      return {
        prompt: `A ${it.what} at ${store} is regularly ${tag(P)}. It is on sale for ${p}% off. ${askAmount ? 'How much money is the discount' : 'What is the sale price'}, ${CENT}?`,
        parts: [moneyPart(askAmount ? disc : sale)],
        hints: ['Discount = discount percent × regular price.', askAmount ? 'Write the percent as a decimal and multiply.' : 'Sale price = regular price − discount.'],
        solution: [
          `Discount: $${num(p / 100)} \\times ${mv(P)} ${eq(disc)}$`,
          ...(askAmount ? [`The discount is ${money(disc)}.`] : [`Sale price: $${mv(P)} - ${num(disc)} ${eq(sale)}$`, `The sale price is ${money(sale)}.`]),
        ],
      };
    }
    const mode = rng.pick(['successive', 'single', 'markupSale'] as const);
    if (mode === 'markupSale') {
      const it = rng.pick(MARKUP_ITEMS);
      const store = at(rng, it.store);
      const m = rng.pick([40, 50, 60, 80, 100]);
      const dd = rng.pick([10, 15, 20, 25, 30]);
      const C = retry(() => roundTo(rng.int(it.lo, it.hi) + rng.pick([0, 0.5, 0.25, 0.75]), 2), (c) => !onEdge(c * (1 + m / 100) * (1 - dd / 100), 2));
      const sell = C * (1 + m / 100);
      const fin = sell * (1 - dd / 100);
      return {
        prompt: `${cap(store)} buys a ${it.what} for ${money(C)} and marks it up ${m}%. Later, the ${it.what} goes on sale for ${dd}% off the selling price. What is the sale price, ${CENT}?`,
        parts: [moneyPart(fin)],
        hints: ['First find the selling price after the markup.', `Then take ${dd}% off that selling price, not off the cost.`],
        solution: [
          `Selling price: $${mv(C)} \\times ${num(1 + m / 100)} ${eq(sell)}$`,
          `A ${dd}% discount leaves $${100 - dd}\\%$ of the price: $${num(sell)} \\times ${num(1 - dd / 100)} ${eq(fin)}$`,
          `The sale price is ${money(fin)}.`,
        ],
      };
    }
    const it = rng.pick(DISC_ITEMS);
    const store = at(rng, it.store);
    const p1 = rng.pick([20, 25, 30, 40, 50]);
    const p2 = rng.pick([10, 15, 20]);
    const keep = (100 - p1) * (100 - p2);
    const single = 100 - keep / 100;
    if (mode === 'single') {
      return {
        prompt: `A ${it.what} at ${store} is marked ${p1}% off. At the checkout, ${theStore(it.store)} takes another ${p2}% off the sale price. What **single** percent discount would give the same final price?`,
        parts: [exactPart(single, '%')],
        hints: ['Try a regular price of \\$100 and apply each discount in turn.', `After ${p1}% off you pay $${100 - p1}\\%$. Then you pay $${100 - p2}\\%$ of that.`],
        solution: [
          `Start with a regular price of \\$100.`,
          `After ${p1}% off: $100 \\times ${num(1 - p1 / 100)} = ${100 - p1}$`,
          `After another ${p2}% off: $${100 - p1} \\times ${num(1 - p2 / 100)} = ${num(keep / 100)}$`,
          `The total discount is $100 - ${num(keep / 100)} = ${num(single)}$ dollars out of \\$100, which is $${num(single)}\\%$ — not $${p1 + p2}\\%$, because the second discount is taken from a smaller price.`,
          `The single discount is $${num(single)}\\%$.`,
        ],
      };
    }
    const P = retry(() => roundTo(rng.int(it.lo, it.hi) + rng.pick([0, 0.99, 0.49]), 2), (x) => !onEdge((x * keep) / 10000, 2));
    const s1 = P * (1 - p1 / 100);
    const fin = (P * keep) / 10000;
    const wrong = P * (1 - (p1 + p2) / 100);
    return {
      prompt: `A ${it.what} at ${store} is regularly ${tag(P)}. It is marked ${p1}% off, and at the checkout ${theStore(it.store)} takes another ${p2}% off the sale price. What is the final price, ${CENT}?`,
      parts: [moneyPart(fin)],
      hints: ['Apply the discounts one at a time.', `The ${p2}% is taken off the **sale** price, so ${p1}% then ${p2}% is not the same as ${p1 + p2}% off.`],
      solution: [
        `After ${p1}% off: $${mv(P)} \\times ${num(1 - p1 / 100)} ${eq(s1)}$`,
        `After another ${p2}% off: $${num(s1)} \\times ${num(1 - p2 / 100)} ${eq(fin)}$`,
        `Note: ${p1 + p2}% off would give ${money(wrong)}, which is too low.`,
        `The final price is ${money(fin)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.3 Sales tax
// ---------------------------------------------------------------------------

const TAX_ITEMS = [
  { what: 'toolbox', lo: 40, hi: 180 },
  { what: 'microwave', lo: 90, hi: 300 },
  { what: 'pair of skates', lo: 80, hi: 350 },
  { what: 'car battery', lo: 120, hi: 260 },
  { what: 'set of wrenches', lo: 30, hi: 140 },
  { what: 'bike helmet', lo: 40, hi: 150 },
  { what: 'space heater', lo: 40, hi: 160 },
  { what: 'pair of snow pants', lo: 60, hi: 200 },
  { what: 'bag of dog food', lo: 30, hi: 90 },
];

function taxRate(rng: Rng, allowHst: boolean): { r: number; text: string; name: string } {
  if (!allowHst || rng.chance(0.55)) return { r: 5, text: 'The store adds a sales tax of 5%.', name: 'sales tax' };
  const r = rng.pick([13, 15]);
  return { r, text: `Suppose the store adds a combined sales tax of ${r}% (a national and a local sales tax charged as one tax).`, name: 'combined sales tax' };
}

const salesTax = skill({
  id: 'm103-sales-tax',
  name: 'Sales tax',
  description: 'Add a sales tax (such as GST, VAT or HST) to find a total price, and work backward from a total to the price before tax.',
  outcomes: ['N1', 'A1'],
  lessonId: 'm103-1-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const it = rng.pick(TAX_ITEMS);
    if (d === 1) {
      const P = 20 * rng.int(Math.ceil(it.lo / 20), Math.floor(it.hi / 20));
      const tax = P * 0.05;
      const askTax = rng.chance(0.4);
      return {
        prompt: `${name} buys a ${it.what} for ${tag(P)}. The store adds a sales tax of 5%. ${askTax ? 'How much sales tax does ' + name + ' pay' : 'What is the total price including the tax'}?`,
        parts: [moneyPart(askTax ? tax : P + tax)],
        hints: ['Sales tax = 5% of the price $= 0.05 \\times$ price.', askTax ? 'Multiply the price by $0.05$.' : 'Total = price + sales tax.'],
        solution: [`Sales tax: $0.05 \\times ${P} = ${mv(tax)}$`, ...(askTax ? [`${name} pays ${money(tax)} in sales tax.`] : [`Total: $${P} + ${mv(tax)} = ${mv(P + tax)}$`, `The total is ${money(P + tax)}.`])],
      };
    }
    if (d === 2) {
      const t = taxRate(rng, true);
      const two = rng.chance(0.4);
      const it2 = rng.pick(TAX_ITEMS.filter((x) => x !== it));
      const { a, b } = retry(
        () => ({ a: roundTo(rng.int(it.lo, it.hi) + rng.pick([0.99, 0.49, 0.95]), 2), b: two ? roundTo(rng.int(it2.lo, it2.hi) + rng.pick([0.99, 0.49, 0.29]), 2) : 0 }),
        (o) => !onEdge((o.a + o.b) * (1 + t.r / 100), 2) && !onEdge(((o.a + o.b) * t.r) / 100, 2),
      );
      const sub = a + b;
      const tax = (sub * t.r) / 100;
      const total = sub + tax;
      return {
        prompt: `${name} buys ${two ? `a ${it.what} for ${money(a)} and a ${it2.what} for ${money(b)}` : `a ${it.what} for ${money(a)}`}. ${t.text} What is the total cost including tax, ${CENT}?`,
        parts: [moneyPart(total)],
        hints: [two ? 'Add the prices first, then find the tax on the subtotal.' : `Find ${t.r}% of the price.`, `Total = price + tax, or price $\\times ${num(1 + t.r / 100)}$.`],
        solution: [
          ...(two ? [`Subtotal: $${mv(a)} + ${mv(b)} = ${mv(sub)}$`] : []),
          `Tax: $${num(t.r / 100)} \\times ${mv(sub)} ${eq(tax)}$`,
          `Total: $${mv(sub)} + ${num(tax)} ${eq(total)}$`,
          `The total cost is ${money(total)}.`,
        ],
      };
    }
    if (rng.chance(0.5)) {
      const t = taxRate(rng, true);
      const k = 1 + t.r / 100;
      const { P, T } = retry(
        () => {
          const P = roundTo(rng.int(it.lo, it.hi) + rng.pick([0, 0.99, 0.49, 0.5]), 2);
          return { P, T: roundTo(P * k, 2) };
        },
        (o) => roundTo(o.T / k, 2) === o.P && !onEdge(o.T / k, 2),
      );
      return {
        prompt: `${name}’s receipt for a ${it.what} shows a total of ${money(T)}, including tax. ${t.text} What was the price before tax, ${CENT}?`,
        parts: [moneyPart(P)],
        hints: [`The total is the price plus ${t.r}%, so total $=$ price $\\times ${num(k)}$.`, `Rearrange: price $=$ total $\\div ${num(k)}$. Do not just subtract ${t.r}% of the total.`],
        solution: [
          `Total $=$ price $\\times (1 + ${num(t.r / 100)}) =$ price $\\times ${num(k)}$.`,
          `Rearrange: price $=$ total $\\div ${num(k)}$.`,
          `$${mv(T)} \\div ${num(k)} ${eq(T / k)}$`,
          `The price before tax was ${money(P)}.`,
        ],
      };
    }
    const t = taxRate(rng, true);
    const p = rng.pick([10, 15, 20, 25, 30, 40]);
    const P = retry(() => roundTo(rng.int(it.lo, it.hi) + rng.pick([0, 0.99, 0.49]), 2), (x) => !onEdge(x * (1 - p / 100) * (1 + t.r / 100), 2));
    const sale = P * (1 - p / 100);
    const total = sale * (1 + t.r / 100);
    return {
      prompt: `A ${it.what} regularly costs ${tag(P)}. ${name} buys it on sale for ${p}% off. ${t.text} What is the total cost including tax, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: ['Take the discount off first. Tax is charged on the sale price.', `Sale price $= ${mv(P)} \\times ${num(1 - p / 100)}$; then multiply by $${num(1 + t.r / 100)}$.`],
      solution: [
        `Sale price: $${mv(P)} \\times ${num(1 - p / 100)} ${eq(sale)}$`,
        `Add ${t.r}% ${t.name}: $${num(sale)} \\times ${num(1 + t.r / 100)} ${eq(total)}$`,
        `The total cost is ${money(total)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.4 Currency exchange
// ---------------------------------------------------------------------------

interface Cur {
  name: string;
  one: string;
  places: string[];
  /** true: the rate is quoted as 1 CAD = r units; false: 1 unit = r CAD. */
  perCad: boolean;
  lo: number;
  hi: number;
  dp: 0 | 2;
  show: (x: number) => string;
  label?: string;
  suffix?: string;
  round: string;
}

const symAmt = (sym: string) => (x: number) => `${sym}${isWhole(x) ? group(String(Math.round(x))) : group(fmtFixed(x, 2))}`;
const wordAmt = (word: string) => (x: number) => `${group(String(Math.round(x)))} ${word}`;

const CURS: Cur[] = [
  { name: 'US dollars', one: 'US dollar', places: ['California', 'Seattle', 'Arizona', 'Hawaii', 'Florida'], perCad: false, lo: 1.3, hi: 1.42, dp: 2, show: symAmt('US\\$'), label: 'US\\$', round: CENT },
  { name: 'euros', one: 'euro', places: ['France', 'Italy', 'Germany', 'Spain', 'Portugal'], perCad: false, lo: 1.45, hi: 1.62, dp: 2, show: symAmt('€'), label: '€', round: 'to the nearest cent' },
  { name: 'British pounds', one: 'British pound', places: ['England', 'Scotland', 'Wales'], perCad: false, lo: 1.72, hi: 1.88, dp: 2, show: symAmt('£'), label: '£', round: 'to the nearest penny' },
  { name: 'Mexican pesos', one: 'Mexican peso', places: ['Mexico', 'Puerto Vallarta', 'Cancún'], perCad: true, lo: 12.5, hi: 15.5, dp: 0, show: wordAmt('Mexican pesos'), suffix: 'pesos', round: 'to the nearest peso' },
  { name: 'Japanese yen', one: 'yen', places: ['Japan', 'Tokyo', 'Osaka'], perCad: true, lo: 102, hi: 115, dp: 0, show: symAmt('¥'), label: '¥', round: 'to the nearest yen' },
  { name: 'Philippine pesos', one: 'Philippine peso', places: ['the Philippines', 'Manila', 'Cebu'], perCad: true, lo: 40, hi: 44, dp: 0, show: wordAmt('Philippine pesos'), suffix: 'pesos', round: 'to the nearest peso' },
  { name: 'Indian rupees', one: 'Indian rupee', places: ['India', 'Delhi', 'Punjab'], perCad: true, lo: 60, hi: 66, dp: 0, show: wordAmt('rupees'), suffix: 'rupees', round: 'to the nearest rupee' },
];

const rateText = (c: Cur, r: number, dp: number) =>
  c.perCad ? `Suppose the exchange rate is $1$ Canadian dollar $= ${fmtFixed(r, dp)}$ ${c.name}.` : `Suppose the exchange rate is $1$ ${c.one} $= ${fmtFixed(r, dp)}$ Canadian dollars.`;
const foreignPart = (c: Cur, v: number): Part => numPart(v, { decimals: c.dp, tolerance: 1.1 * 10 ** -c.dp, label: c.label, suffix: c.suffix });

const currencyConvert = skill({
  id: 'm103-currency-convert',
  name: 'Converting currency',
  description: 'Convert between Canadian dollars and another currency using a stated exchange rate, and plan a trip budget.',
  outcomes: ['N1'],
  lessonId: 'm103-1-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const c = rng.pick(CURS);
    const place = rng.pick(c.places);
    if (d === 1) {
      // The multiplying direction, friendly numbers
      if (!c.perCad) {
        const r = rng.int(Math.round(c.lo * 100), Math.round(c.hi * 100)) / 100;
        const F = rng.pick([20, 40, 50, 60, 80, 100, 150, 200, 250, 300, 400, 500]);
        const C = F * r;
        const ctx = rng.pick([
          `${name} has ${c.show(F)} left over after a trip to ${place}.`,
          `${name} orders a part online from a store in ${place}. The part costs ${c.show(F)}.`,
          `${name} gets ${c.show(F)} as a birthday gift from a relative who lives in ${place}.`,
        ]);
        return {
          prompt: `${ctx} ${rateText(c, r, 2)} How much is that in Canadian dollars, ${CENT}?`,
          parts: [moneyPart(C)],
          hints: [`Each ${c.one} is worth $${fmtFixed(r, 2)}$ Canadian dollars.`, `Multiply: $${F} \\times ${fmtFixed(r, 2)}$.`],
          solution: [`Each ${c.one} is worth $${fmtFixed(r, 2)}$ CAD, so multiply.`, `$${F} \\times ${fmtFixed(r, 2)} ${eq(C)}$`, `${c.show(F)} is worth ${money(C)} CAD.`],
        };
      }
      const r = c.lo > 50 ? rng.int(c.lo, c.hi) : rng.int(c.lo * 10, c.hi * 10) / 10;
      const C = rng.pick([100, 150, 200, 250, 300, 400, 500, 750, 1000]);
      const F = roundTo(C * r, 2);
      return {
        prompt: `${name} is taking ${tag(C)} CAD on a trip to ${place}. ${rateText(c, r, isWhole(r) ? 0 : 1)} How many ${c.name} will ${name} get?`,
        parts: [foreignPart(c, F)],
        hints: [`Each Canadian dollar buys $${num(r)}$ ${c.name}.`, `Multiply: $${C} \\times ${num(r)}$.`],
        solution: [`Each Canadian dollar is worth $${num(r)}$ ${c.name}, so multiply.`, `$${C} \\times ${num(r)} = ${num(F)}$`, `${name} will get ${c.show(F)}.`],
      };
    }
    if (d === 2) {
      // The reverse (dividing) direction
      if (!c.perCad) {
        const r = rng.int(Math.round(c.lo * 10000), Math.round(c.hi * 10000)) / 10000;
        const C = retry(() => rng.pick([150, 200, 250, 300, 400, 500, 600, 750, 800, 1000, 1200]) + rng.pick([0, 0, 25, 50]), (x) => !onEdge(x / r, 2));
        const F = C / r;
        return {
          prompt: `${name} has budgeted ${tag(C)} CAD for spending money on a trip to ${place}. ${rateText(c, r, 4)} How many ${c.name} is that, ${c.round}?`,
          parts: [foreignPart(c, F)],
          hints: [`This time you start with Canadian dollars. Each ${c.one} costs $${fmtFixed(r, 4)}$ CAD.`, `Divide: $${C} \\div ${fmtFixed(r, 4)}$.`],
          solution: [
            `Each ${c.one} costs $${fmtFixed(r, 4)}$ Canadian dollars, so divide the Canadian amount by the rate.`,
            `$${C} \\div ${fmtFixed(r, 4)} ${eq(F)}$`,
            `Check: one ${c.one} is worth more than one Canadian dollar, so the answer should be smaller than $${C}$.`,
            `${tag(C)} CAD is about ${c.show(roundTo(F, 2))}.`,
          ],
        };
      }
      const r = rng.int(Math.round(c.lo * 100), Math.round(c.hi * 100)) / 100;
      const thing = rng.pick(['A hotel room', 'A guided tour', 'A rental car for a day', 'A train ticket', 'A family dinner']);
      const F = retry(() => (c.lo > 50 ? 100 : 10) * rng.int(c.lo > 50 ? 30 : 60, c.lo > 50 ? 250 : 400), (x) => !onEdge(x / r, 2));
      const C = F / r;
      return {
        prompt: `${thing} in ${place} costs ${c.show(F)}. ${rateText(c, r, 2)} What is the cost in Canadian dollars, ${CENT}?`,
        parts: [moneyPart(C)],
        hints: [`This time you start with ${c.name}. Each Canadian dollar is worth $${fmtFixed(r, 2)}$ ${c.name}.`, `Divide: $${num(F)} \\div ${fmtFixed(r, 2)}$.`],
        solution: [
          `Each Canadian dollar is worth $${fmtFixed(r, 2)}$ ${c.name}, so divide the ${c.name} by the rate.`,
          `$${num(F)} \\div ${fmtFixed(r, 2)} ${eq(C)}$`,
          `The cost is about ${money(C)} CAD.`,
        ],
      };
    }
    // Difficulty 3: multi-step trip budget
    const usd = CURS[0];
    const mode = rng.pick(['budget', 'shopping', 'compare'] as const);
    if (mode === 'budget') {
      const cc = rng.pick(CURS.filter((x) => x.perCad));
      const pl = rng.pick(cc.places);
      const r = rng.int(Math.round(cc.lo * 100), Math.round(cc.hi * 100)) / 100;
      const scale = cc.lo > 50 ? 100 : cc.lo > 20 ? 20 : 10;
      const nights = rng.int(3, 7);
      const { H, food } = retry(
        () => ({ H: scale * rng.int(cc.lo > 50 ? 60 : 50, cc.lo > 50 ? 150 : 120), food: scale * rng.int(cc.lo > 50 ? 25 : 30, cc.lo > 50 ? 60 : 70) }),
        (o) => !onEdge((o.H * nights + o.food * (nights + 1)) / r, 2),
      );
      const total = H * nights + food * (nights + 1);
      const C = total / r;
      return {
        prompt: `${name} is planning a trip to ${pl}. The hotel costs ${cc.show(H)} per night for $${nights}$ nights, and ${name} budgets ${cc.show(food)} per day for food for $${nights + 1}$ days. ${rateText(cc, r, 2)} How much is the hotel and food budget in Canadian dollars, ${CENT}?`,
        parts: [moneyPart(C)],
        hints: [`Find the total cost in ${cc.name} first.`, `Then divide by $${fmtFixed(r, 2)}$, because each Canadian dollar is worth $${fmtFixed(r, 2)}$ ${cc.name}.`],
        solution: [
          `Hotel: $${nights} \\times ${num(H)} = ${num(H * nights)}$ ${cc.name}`,
          `Food: $${nights + 1} \\times ${num(food)} = ${num(food * (nights + 1))}$ ${cc.name}`,
          `Total: $${num(H * nights)} + ${num(food * (nights + 1))} = ${num(total)}$ ${cc.name}`,
          `In Canadian dollars: $${num(total)} \\div ${fmtFixed(r, 2)} ${eq(C)}$`,
          `The budget is about ${money(C)} CAD.`,
        ],
      };
    }
    const r = rng.int(Math.round(usd.lo * 10000), Math.round(usd.hi * 10000)) / 10000;
    if (mode === 'shopping') {
      const [i1, i2] = rng.sample(['a work jacket', 'a pair of hiking boots', 'a tool belt', 'a set of socket wrenches', 'a hockey jersey', 'a fishing rod'], 2);
      const { a, b, s } = retry(
        () => ({ a: roundTo(rng.int(35, 160) + 0.99, 2), b: roundTo(rng.int(20, 140) + rng.pick([0.5, 0.99, 0.95]), 2), s: rng.pick([9.95, 12.5, 14.99, 19.99]) }),
        (o) => !onEdge((o.a + o.b + o.s) * r, 2),
      );
      const total = a + b + s;
      const C = total * r;
      return {
        prompt: `${name} orders ${i1} for ${usd.show(a)} and ${i2} for ${usd.show(b)} from a store in the United States. Shipping costs ${usd.show(s)}. ${rateText(usd, r, 4)} What is the total cost in Canadian dollars, ${CENT}? (Ignore taxes and duties.)`,
        parts: [moneyPart(C)],
        hints: ['Add up the total in US dollars first.', `Then multiply by $${fmtFixed(r, 4)}$ to change it to Canadian dollars.`],
        solution: [
          `Total in US dollars: $${mv(a)} + ${mv(b)} + ${mv(s)} = ${mv(total)}$`,
          `In Canadian dollars: $${mv(total)} \\times ${fmtFixed(r, 4)} ${eq(C)}$`,
          `The order costs about ${money(C)} CAD.`,
        ],
      };
    }
    const item = rng.pick(['a pair of work boots', 'a cordless impact driver', 'a snowboard', 'a winter parka', 'a set of tire chains']);
    const town = rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest']);
    const { U, P } = retry(
      () => {
        const U = roundTo(rng.int(80, 300) + 0.99, 2);
        return { U, P: roundTo(Math.round(U * r * rng.float(0.88, 1.12, 3)) + 0.99, 2) };
      },
      (o) => Math.abs(o.U * r - o.P) > 3 && !onEdge(Math.abs(o.U * r - o.P), 2),
    );
    const C = U * r;
    const save = Math.abs(C - P);
    const usCheaper = C < P;
    return {
      prompt: `${cap(item)} costs ${usd.show(U)} at a store in the United States and ${money(P)} at a store in ${town}. ${rateText(usd, r, 4)} How much would ${name} save, in Canadian dollars, by buying from the cheaper store? Give your answer ${CENT}. (Ignore taxes and travel costs.)`,
      parts: [moneyPart(save)],
      hints: ['Change the US price to Canadian dollars so both prices use the same currency.', 'Subtract the smaller price from the larger one.'],
      solution: [
        `US price in CAD: $${mv(U)} \\times ${fmtFixed(r, 4)} ${eq(C)}$`,
        `Compare: about ${money(C)} in the United States and ${money(P)} in ${town}, so ${usCheaper ? 'the US store' : `the store in ${town}`} is cheaper.`,
        `Savings: $${usCheaper ? `${mv(P)} - ${num(C)}` : `${num(C)} - ${mv(P)}`} ${eq(save)}$`,
        `${name} would save about ${money(save)} by buying ${usCheaper ? 'in the United States' : `in ${town}`}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.4 Bank buy and sell rates
// ---------------------------------------------------------------------------

interface BSCur {
  one: string;
  name: string;
  code: string;
  label: string;
  places: string[];
  lo: number;
  hi: number;
  show: (x: number) => string;
}

const BS: BSCur[] = [
  { one: 'US dollar', name: 'US dollars', code: 'USD', label: 'US\\$', places: ['California', 'Seattle', 'Arizona', 'Florida'], lo: 1.3, hi: 1.42, show: symAmt('US\\$') },
  { one: 'euro', name: 'euros', code: 'EUR', label: '€', places: ['France', 'Italy', 'Germany', 'Spain'], lo: 1.45, hi: 1.62, show: symAmt('€') },
  { one: 'British pound', name: 'British pounds', code: 'GBP', label: '£', places: ['England', 'Scotland', 'Wales', 'London'], lo: 1.72, hi: 1.88, show: symAmt('£') },
];

const BUY_HINT = 'When you **buy** foreign money, the bank is **selling** it to you, so use the bank’s sell rate (the higher rate).';
const SELL_HINT = 'When you **sell** foreign money back, the bank is **buying** it from you, so use the bank’s buy rate (the lower rate).';

function bankRates(rng: Rng, c: BSCur, dp: 2 | 4) {
  const mid = rng.float(c.lo, c.hi, 4);
  const s = rng.float(0.022, 0.035, 4);
  if (dp === 2) {
    const gap = rng.pick([0.04, 0.05, 0.06]);
    const m = roundTo(mid, 2);
    return { buy: roundTo(m - gap, 2), sell: roundTo(m + gap, 2) };
  }
  return { buy: roundTo(mid * (1 - s), 4), sell: roundTo(mid * (1 + s), 4) };
}

function rateTable(rng: Rng, c: BSCur, rates: { buy: number; sell: number }): Figure {
  const others = rng.sample(BS.filter((x) => x !== c), rng.int(1, 2));
  const all = [c, ...others].sort((a, b) => BS.indexOf(a) - BS.indexOf(b));
  const rows = all.map((x) => {
    const r = x === c ? rates : bankRates(rng, x, 4);
    return [`${x.one} (${x.code})`, fmtFixed(r.buy, 4), fmtFixed(r.sell, 4)];
  });
  return { type: 'table', headers: ['Currency', 'Bank buys (CAD)', 'Bank sells (CAD)'], rows };
}

const TABLE_INTRO = 'The table shows a bank’s exchange rates, in Canadian dollars for one unit of each currency.';

const exchangeBuySell = skill({
  id: 'm103-exchange-buy-sell',
  name: 'Buy and sell rates',
  description: 'Use a bank’s buy and sell rates to find the cost of buying foreign currency, the amount received when selling it back, and the cost of fees and round trips.',
  outcomes: ['N1'],
  lessonId: 'm103-1-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const c = rng.pick(BS);
    const place = rng.pick(c.places);
    if (d === 1) {
      const { buy, sell } = bankRates(rng, c, 2);
      const F = rng.pick([50, 100, 150, 200, 250, 300, 400, 500]);
      const buying = rng.chance(0.5);
      const rate = buying ? sell : buy;
      const C = F * rate;
      return {
        prompt: `A bank sells ${c.name} for $${fmtFixed(sell, 2)}$ Canadian dollars each and buys them back for $${fmtFixed(buy, 2)}$ Canadian dollars each. ${
          buying
            ? `${name} wants to buy ${c.show(F)} in cash for a trip to ${place}. How much will this cost in Canadian dollars?`
            : `After a trip to ${place}, ${name} sells ${c.show(F)} back to the bank. How many Canadian dollars does ${name} get?`
        }`,
        parts: [moneyPart(C)],
        hints: [buying ? BUY_HINT : SELL_HINT, `Multiply the amount of ${c.name} by that rate.`],
        solution: [
          buying
            ? `${name} is buying ${c.name}, so the bank is selling. Use the bank’s sell rate, $${fmtFixed(sell, 2)}$ CAD per ${c.one}.`
            : `${name} is selling ${c.name} back, so the bank is buying. Use the bank’s buy rate, $${fmtFixed(buy, 2)}$ CAD per ${c.one}.`,
          `$${F} \\times ${fmtFixed(rate, 2)} ${eq(C)}$`,
          buying ? `It will cost ${money(C)}.` : `${name} gets ${money(C)}.`,
        ],
      };
    }
    const rates = bankRates(rng, c, 4);
    const { buy, sell } = rates;
    const figure = rateTable(rng, c, rates);
    const S = fmtFixed(sell, 4);
    const B = fmtFixed(buy, 4);
    if (d === 2) {
      const mode = rng.pick(['cost', 'sellBack', 'howMany'] as const);
      if (mode === 'howMany') {
        const C = retry(() => rng.pick([300, 400, 500, 600, 750, 800, 1000, 1200, 1500]) + rng.pick([0, 0, 50]), (x) => !onEdge(x / sell, 2));
        const F = C / sell;
        return {
          prompt: `${TABLE_INTRO} ${name} has ${tag(C)} CAD to exchange for ${c.name} before a trip to ${place}. How many ${c.name} will ${name} get, ${CENT}?`,
          figure,
          parts: [numPart(F, { decimals: 2, tolerance: 0.011, label: c.label })],
          hints: [BUY_HINT, `Each ${c.one} costs $${S}$ CAD, so divide the Canadian dollars by $${S}$.`],
          solution: [
            `${name} is buying ${c.name}, so use the bank sells rate: $${S}$ CAD per ${c.one}.`,
            `$${num(C)} \\div ${S} ${eq(F)}$`,
            `${name} will get about ${c.show(roundTo(F, 2))}.`,
          ],
        };
      }
      const buying = mode === 'cost';
      const F = retry(() => rng.pick([60, 80, 120, 150, 175, 200, 240, 250, 300, 350, 400, 450, 600, 750]), (x) => !onEdge(x * (buying ? sell : buy), 2));
      const rate = buying ? sell : buy;
      const C = F * rate;
      return {
        prompt: `${TABLE_INTRO} ${
          buying
            ? `${name} buys ${c.show(F)} at the bank before a trip to ${place}. How much does this cost in Canadian dollars, ${CENT}?`
            : `${name} comes home from ${place} with ${c.show(F)} and sells it back to the bank. How many Canadian dollars does ${name} receive, ${CENT}?`
        }`,
        figure,
        parts: [moneyPart(C)],
        hints: [buying ? BUY_HINT : SELL_HINT, 'Find the right row of the table, then multiply.'],
        solution: [
          buying ? `${name} is buying ${c.name}, so use the bank sells rate: $${S}$ CAD per ${c.one}.` : `${name} is selling ${c.name} to the bank, so use the bank buys rate: $${B}$ CAD per ${c.one}.`,
          `$${F} \\times ${buying ? S : B} ${eq(C)}$`,
          buying ? `It costs ${abt(C)}${money(C)}.` : `${name} receives ${abt(C)}${money(C)}.`,
        ],
      };
    }
    const mode = rng.pick(['cancel', 'leftover', 'fee', 'commission'] as const);
    if (mode === 'cancel') {
      const F = retry(() => rng.pick([300, 400, 500, 600, 750, 800, 1000, 1200]), (x) => !onEdge(x * (sell - buy), 2));
      const cost = F * sell;
      const back = F * buy;
      return {
        prompt: `${TABLE_INTRO} ${name} buys ${c.show(F)} for a trip to ${place}, but the trip is cancelled. The next day, ${name} sells all of it back to the bank at the same rates. How much money did ${name} lose, in Canadian dollars, ${CENT}?`,
        figure,
        parts: [moneyPart(cost - back)],
        hints: ['Find what the money cost to buy (bank sells rate) and what the bank paid to buy it back (bank buys rate).', 'The loss is the difference.'],
        solution: [
          `Cost to buy (bank sells rate): $${F} \\times ${S} ${eq(cost)}$`,
          `Money back (bank buys rate): $${F} \\times ${B} ${eq(back)}$`,
          `Loss: $${num(cost)} - ${num(back)} ${eq(cost - back)}$. The bank earns this difference — that is why it has two rates.`,
          `${name} lost ${abt(cost - back)}${money(cost - back)}.`,
        ],
      };
    }
    if (mode === 'leftover') {
      const F = rng.pick([500, 600, 800, 1000, 1200, 1500]);
      const E = retry(() => roundTo(F * rng.float(0.55, 0.9, 2) + rng.pick([0.25, 0.5, 0.75, 0.4]), 2), (e) => !onEdge((F - e) * buy, 2));
      const R = roundTo(F - E, 2);
      const back = R * buy;
      return {
        prompt: `${TABLE_INTRO} ${name} buys ${c.show(F)} for a trip to ${place} and spends ${c.show(E)} there. After the trip, ${name} sells the rest back to the bank. How many Canadian dollars does ${name} get back, ${CENT}?`,
        figure,
        parts: [moneyPart(back)],
        hints: [`First find how many ${c.name} are left.`, SELL_HINT],
        solution: [
          `Left over: $${mv(F)} - ${mv(E)} = ${mv(R)}$ ${c.name}`,
          `${name} is selling to the bank, so use the bank buys rate: $${B}$.`,
          `$${mv(R)} \\times ${B} ${eq(back)}$`,
          `${name} gets ${abt(back)}${money(back)} back.`,
        ],
      };
    }
    const F = rng.pick([200, 250, 300, 400, 500, 600, 750]);
    const pc = rng.pick([1.5, 2, 2.5, 3]);
    const r = retry(
      () => roundTo(sell + rng.float(0.02, 0.06, 2) + rng.int(0, 9) / 10000, 4),
      (x) => !onEdge(F * x, 2) && !onEdge(F * x * (1 + pc / 100), 2),
    );
    const R4 = fmtFixed(r, 4);
    if (mode === 'fee') {
      const fee = rng.pick([3.95, 4.95, 5.99, 7.5, 9.99]);
      const base = F * r;
      const total = base + fee;
      return {
        prompt: `An airport exchange booth sells ${c.name} for $${R4}$ Canadian dollars each and charges a flat service fee of ${money(fee)} per purchase. ${name} buys ${c.show(F)} at the booth. What is the total cost in Canadian dollars, ${CENT}?`,
        parts: [moneyPart(total)],
        hints: ['Multiply the amount by the booth’s rate first.', 'Then add the flat fee once.'],
        solution: [`Cost of the ${c.name}: $${F} \\times ${R4} ${eq(base)}$`, `Add the fee: $${num(base)} + ${mv(fee)} ${eq(total)}$`, `The total cost is ${money(total)}.`],
      };
    }
    const base = F * r;
    const com = (base * pc) / 100;
    const total = base + com;
    return {
      prompt: `An exchange office sells ${c.name} for $${R4}$ Canadian dollars each. It also charges a commission of ${pc}% of the Canadian dollar amount. ${name} buys ${c.show(F)}. What is the total cost in Canadian dollars, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: ['Find the cost of the foreign money first.', `The commission is ${pc}% of that cost. Add it on.`],
      solution: [
        `Cost before commission: $${F} \\times ${R4} ${eq(base)}$`,
        `Commission: $${num(pc / 100)} \\times ${num(base)} ${eq(com)}$`,
        `Total: $${num(base)} + ${num(com)} ${eq(total)}$`,
        `The total cost is ${money(total)}.`,
      ],
    };
  },
});

export const PRICING_SKILLS: SkillDef[] = [unitRate, proportion, unitPrice, bestBuy, percentChange, salePrice, salesTax, currencyConvert, exchangeBuySell];

