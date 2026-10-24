/** Math 20-4 Unit 3 — Earning an Income (N3): wages and overtime, salary, commission, piecework and tips, and net pay. */
import { numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Jaxon', 'Fatima', 'Ethan',
  'Nia', 'Arjun', 'Chloé', 'Kai', 'Zainab', 'Owen', 'Sofia', 'Tariq', 'Leila', 'Dylan',
  'Harpreet', 'Kiona', 'Rajesh', 'Hana', 'Jamal', 'Émilie', 'Wyatt', 'Ayesha', 'Lucas', 'Talia',
  'Simran', 'Cole', 'Ngozi', 'Marcus', 'Rosa', 'Ji-woo', 'Kwame', 'Tanvir', 'Maya', 'Bao',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const isCents = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const poss = (n: string) => `${n}’s`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Thousands separators: money from 1,000 up; plain numbers (minDigits 5) from 10 000 up. */
function group(s: string, sep = ',', minDigits = 4): string {
  const neg = s.startsWith('-');
  const body = neg ? s.slice(1) : s;
  const [i, f] = body.split('.');
  const g = i.length >= minDigits ? i.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : i;
  return `${neg ? '-' : ''}${g}${f !== undefined ? `.${f}` : ''}`;
}
/** Money in prose (never inside $...$), always with cents: \$1,234.50 */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** Money in prose without cents when it is whole dollars: \$42,000 */
const moneyW = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** Money inside maths with two decimals: 1{,}234.50 */
const m2 = (x: number) => group(fmtFixed(x, 2), '{,}');
/** Money inside maths: whole dollars without cents. */
const mw = (x: number) => (isWhole(x) ? group(String(Math.round(x)), '{,}') : m2(x));
/** A plain number inside maths. */
const mn = (x: number, dp = 4) => group(fmt(x, dp), '{,}', 5);
/** Money in a table cell (plain text, not Markdown). */
const cell = (x: number) => `$${group(fmtFixed(x, 2))}`;
/** "= 12.34" when exact to the cent, otherwise "= 12.3456 \approx 12.35" (inside maths). */
function toCents(x: number): string {
  if (isCents(x)) return `= ${m2(x)}`;
  if (Math.abs(roundTo(x, 4) - x) < 1e-9) return `= ${mn(x, 4)} \\approx ${m2(x)}`;
  return `= ${group((Math.floor(Math.abs(x) * 10000) / 10000).toFixed(4), '{,}')}\\ldots \\approx ${m2(x)}`;
}
/** True when a money value sits close to a half cent (x.xx5), where rounding is unclear. */
function halfCent(x: number): boolean {
  const c = Math.abs(x) * 100;
  return Math.abs(c - Math.floor(c) - 0.5) < 0.03;
}
const toC = (x: number) => Math.round(x * 100);
const fromC = (c: number) => c / 100;
/** Percent as a decimal for maths: 5 -> 0.05, 1.5 -> 0.015. */
const dec = (pct: number) => fmt(pct / 100, 6);

const CENT = 'to the nearest cent';
/** A money answer graded to the cent (or a little looser when several rounded amounts are added). */
const moneyPart = (v: number, label = '\\$', tolerance = 0.011): Part => numPart(v, { decimals: 2, tolerance, label });
/** An exact number of hours: shown as a decimal (6.5), graded exactly. */
function hoursPart(h: number, label: string): Part {
  const dp = isWhole(h) ? 0 : isWhole(h * 10) ? 1 : 2;
  return dp > 0 ? numPart(h, { decimals: dp, label, suffix: 'h' }) : numPart(h, { label, suffix: 'h' });
}
const H = '\\ \\text{h}';

// ---------------------------------------------------------------------------
// Jobs, times and timecards
// ---------------------------------------------------------------------------

interface Job {
  job: string;
  lo: number;
  hi: number;
}

const JOBS: Job[] = [
  { job: 'a cashier at a grocery store', lo: 15, hi: 18 },
  { job: 'a cook at a fast-food restaurant', lo: 15, hi: 18 },
  { job: 'a barista at a coffee shop', lo: 15, hi: 18 },
  { job: 'a stock clerk at a hardware store', lo: 16, hi: 20 },
  { job: 'a warehouse worker', lo: 17, hi: 23 },
  { job: 'a landscaper', lo: 16, hi: 22 },
  { job: 'a farm hand', lo: 16, hi: 21 },
  { job: 'a child-care assistant', lo: 16, hi: 20 },
  { job: 'a cleaner at an office building', lo: 16, hi: 20 },
  { job: 'a housekeeper at a mountain hotel', lo: 16, hi: 20 },
  { job: 'a car detailer at a car wash', lo: 16, hi: 21 },
  { job: 'a construction labourer at a remote work site', lo: 22, hi: 30 },
  { job: 'a kitchen prep cook', lo: 16, hi: 19 },
  { job: 'an assistant at a hair salon', lo: 15, hi: 18 },
  { job: 'a dishwasher at a restaurant', lo: 15, hi: 17 },
  { job: 'a lifeguard at a city pool', lo: 16, hi: 21 },
];

/** d1: whole or half dollars; d2 and d3: multiples of 10 cents (so half-hours give whole cents). */
function rate(rng: Rng, j: Job, d: Difficulty): number {
  return d === 1 ? rng.int(j.lo * 2, j.hi * 2 - 1) / 2 : rng.int(j.lo * 10, j.hi * 10) / 10;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** Minutes after midnight to a clock time like 9:30 a.m. */
function clock(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const suffix = h < 12 ? 'a.m.' : 'p.m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** Minutes to "6 h 30 min". */
function hm(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (m === 0) return `${h} h`;
  if (h === 0) return `${m} min`;
  return `${h} h ${m} min`;
}

interface Shift {
  day: string;
  start: number;
  end: number;
  brk: number;
  /** Paid minutes. */
  worked: number;
  tag?: string;
}

/** A shift on the hour or half hour. Paid time is minH to maxH hours in half-hour steps. */
function makeShift(rng: Rng, day: string, minH: number, maxH: number, withBreak: boolean, earliest = 6 * 60, latestEnd = 22 * 60): Shift {
  const worked = rng.int(minH * 2, maxH * 2) * 30;
  const brk = withBreak && worked >= 5 * 60 ? 30 : 0;
  const span = worked + brk;
  const lastStart = Math.max(earliest, latestEnd - span);
  const start = rng.int(earliest / 30, Math.floor(lastStart / 30)) * 30;
  return { day, start, end: start + span, brk, worked };
}

function hoursText(min: number): string {
  return `$${mn(min / 60)}${H}$`;
}

/** "6 h" or "6 h 30 min = 6.5 h" (the decimal only when there are minutes). */
function hmDec(min: number): string {
  return min % 60 === 0 ? hm(min) : `${hm(min)} $= ${mn(min / 60)}${H}$`;
}

function shiftLine(s: Shift): string {
  const span = `**${s.day}:** ${clock(s.start)} to ${clock(s.end)} is ${hm(s.end - s.start)}`;
  if (s.brk) return `${span}. Take away the ${s.brk} min break: ${hmDec(s.worked)}.`;
  return s.worked % 60 === 0 ? `${span}.` : `${span} $= ${mn(s.worked / 60)}${H}$.`;
}

const COUNT_UP = 'Count up from the start time to the end time: first to the next full hour, then whole hours, then any extra minutes. 30 min is $0.5$ h.';

// ---------------------------------------------------------------------------
// 3.1 Gross pay from an hourly wage
// ---------------------------------------------------------------------------

const grossPay = skill({
  id: 'm204-gross-pay',
  name: 'Gross pay from an hourly wage',
  description: 'Find gross pay from an hourly wage and the hours worked, reading the hours from a timecard, including shifts paid at different rates.',
  outcomes: ['N3'],
  lessonId: 'm204-3-1',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    const j = rng.pick(JOBS);
    if (d === 1) {
      const r = rate(rng, j, 1);
      if (rng.chance(0.5)) {
        const h = rng.int(8, 40);
        const g = r * h;
        return {
          prompt: `${name} works as ${j.job} and earns ${money(r)} per hour. Last week, ${name} worked $${h}$ hours. What was ${poss(name)} gross pay, ${CENT}?`,
          parts: [moneyPart(g)],
          hints: ['Gross pay is the total amount you earn before anything is taken off.', 'Gross pay $=$ hourly wage $\\times$ hours worked.'],
          solution: ['Gross pay $=$ hourly wage $\\times$ hours worked.', `$${m2(r)} \\times ${h} = ${m2(g)}$`, `${poss(name)} gross pay was ${money(g)}.`],
          answerDisplay: money(g),
        };
      }
      const n = rng.int(3, 5);
      const len = rng.int(4, 8);
      const h = n * len;
      const g = r * h;
      return {
        prompt: `${name} works as ${j.job} and earns ${money(r)} per hour. This week, ${name} worked $${n}$ shifts of $${len}$ hours each. What is ${poss(name)} gross pay for the week, ${CENT}?`,
        parts: [moneyPart(g)],
        hints: [`First find the total hours: $${n}$ shifts of $${len}$ hours.`, 'Gross pay $=$ hourly wage $\\times$ hours worked.'],
        solution: [`Total hours: $${n} \\times ${len} = ${h}$`, `Gross pay: $${m2(r)} \\times ${h} = ${m2(g)}$`, `${poss(name)} gross pay for the week is ${money(g)}.`],
        answerDisplay: money(g),
      };
    }
    if (d === 2) {
      const withBreak = rng.chance(0.5);
      const r = rate(rng, j, 2);
      const n = rng.int(3, 4);
      const first = rng.int(0, 7 - n);
      const shifts = DAYS.slice(first, first + n).map((day) => makeShift(rng, day, 4, 8, withBreak));
      const totalMin = shifts.reduce((a, s) => a + s.worked, 0);
      const th = totalMin / 60;
      const g = roundTo(th * r, 2);
      const figure: TableFigure = withBreak
        ? { type: 'table', headers: ['Day', 'Start', 'End', 'Unpaid break'], rows: shifts.map((s) => [s.day, clock(s.start), clock(s.end), s.brk ? `${s.brk} min` : 'none']) }
        : { type: 'table', headers: ['Day', 'Start', 'End'], rows: shifts.map((s) => [s.day, clock(s.start), clock(s.end)]) };
      return {
        prompt: `${name} works part-time as ${j.job} and earns ${money(r)} per hour. Here is ${poss(name)} timecard for this week.${withBreak ? ' Breaks are not paid.' : ''} Find the total hours worked and the gross pay. Give the gross pay ${CENT}.`,
        figure,
        parts: [hoursPart(th, 'Total hours:'), moneyPart(g, 'Gross pay: \\$')],
        hints: [withBreak ? `${COUNT_UP} Then take away any unpaid break.` : COUNT_UP, 'Add the hours for all the days. Then multiply by the hourly wage.'],
        solution: [
          ...shifts.map(shiftLine),
          `Total hours: $${shifts.map((s) => mn(s.worked / 60)).join(' + ')} = ${mn(th)}${H}$`,
          `Gross pay: $${mn(th)} \\times ${m2(r)} = ${m2(g)}$`,
          `${name} worked ${hoursText(totalMin)} and earned ${money(g)}.`,
        ],
        answerDisplay: `$${mn(th)}${H}$; ${money(g)}`,
      };
    }
    // d3: two pay rates.
    const r = rate(rng, j, 3);
    const extra = rng.pick([1, 1.5, 2, 2.5]);
    const r2 = roundTo(r + extra, 2);
    if (rng.chance(0.5)) {
      const weekend = rng.sample(['Saturday', 'Sunday'], rng.int(1, 2));
      const weekdays = rng.sample(DAYS.slice(0, 5), rng.int(2, 3));
      const days = DAYS.filter((x) => weekend.includes(x) || weekdays.includes(x));
      const shifts = days.map((day) => makeShift(rng, day, 4, 8, false));
      const isWe = (s: Shift) => s.day === 'Saturday' || s.day === 'Sunday';
      const h1 = shifts.filter((s) => !isWe(s)).reduce((a, s) => a + s.worked, 0) / 60;
      const h2 = shifts.filter(isWe).reduce((a, s) => a + s.worked, 0) / 60;
      const p1 = roundTo(h1 * r, 2);
      const p2 = roundTo(h2 * r2, 2);
      const g = roundTo(p1 + p2, 2);
      return {
        prompt: `${name} works as ${j.job}. The pay is ${money(r)} per hour on weekdays (Monday to Friday) and ${money(r2)} per hour on weekends (Saturday and Sunday). Use the timecard to find the weekday hours, the weekend hours and ${poss(name)} gross pay for the week. Give the gross pay ${CENT}.`,
        figure: { type: 'table', headers: ['Day', 'Start', 'End'], rows: shifts.map((s) => [s.day, clock(s.start), clock(s.end)]) },
        parts: [hoursPart(h1, 'Weekday hours:'), hoursPart(h2, 'Weekend hours:'), moneyPart(g, 'Gross pay: \\$')],
        hints: [`${COUNT_UP} Keep the weekday hours and the weekend hours separate.`, 'Multiply each group of hours by its own rate. Then add the two amounts.'],
        solution: [
          ...shifts.map(shiftLine),
          `Weekday hours: $${shifts.filter((s) => !isWe(s)).map((s) => mn(s.worked / 60)).join(' + ')} = ${mn(h1)}${H}$. Weekend hours: $${shifts.filter(isWe).map((s) => mn(s.worked / 60)).join(' + ')} = ${mn(h2)}${H}$.`,
          `Weekday pay: $${mn(h1)} \\times ${m2(r)} = ${m2(p1)}$. Weekend pay: $${mn(h2)} \\times ${m2(r2)} = ${m2(p2)}$.`,
          `Gross pay: $${m2(p1)} + ${m2(p2)} = ${m2(g)}$`,
          `${name} worked $${mn(h1)}${H}$ on weekdays and $${mn(h2)}${H}$ on weekends, and earned ${money(g)}.`,
        ],
        answerDisplay: `$${mn(h1)}${H}$; $${mn(h2)}${H}$; ${money(g)}`,
      };
    }
    const n = rng.int(4, 5);
    const first = rng.int(0, 7 - n);
    const days = DAYS.slice(first, first + n);
    const shifts = retry(
      () =>
        days.map((day) => {
          const eve = rng.chance(0.45);
          const s = eve ? makeShift(rng, day, 4, 7, false, 15 * 60, 23 * 60 + 30) : makeShift(rng, day, 4, 8, false, 6 * 60, 15 * 60 + 30);
          return { ...s, tag: eve ? 'Evening' : 'Day' };
        }),
      (ss) => ss.some((s) => s.tag === 'Evening') && ss.some((s) => s.tag === 'Day'),
    );
    const h1 = shifts.filter((s) => s.tag === 'Day').reduce((a, s) => a + s.worked, 0) / 60;
    const h2 = shifts.filter((s) => s.tag === 'Evening').reduce((a, s) => a + s.worked, 0) / 60;
    const p1 = roundTo(h1 * r, 2);
    const p2 = roundTo(h2 * r2, 2);
    const g = roundTo(p1 + p2, 2);
    return {
      prompt: `${name} works as ${j.job}. Day shifts pay ${money(r)} per hour. Evening shifts pay ${money(r2)} per hour. Use the timecard to find the day-shift hours, the evening-shift hours and ${poss(name)} gross pay for the week. Give the gross pay ${CENT}.`,
      figure: { type: 'table', headers: ['Day', 'Shift', 'Start', 'End'], rows: shifts.map((s) => [s.day, s.tag ?? '', clock(s.start), clock(s.end)]) },
      parts: [hoursPart(h1, 'Day-shift hours:'), hoursPart(h2, 'Evening-shift hours:'), moneyPart(g, 'Gross pay: \\$')],
      hints: [`${COUNT_UP} Keep the day-shift hours and the evening-shift hours separate.`, 'Multiply each group of hours by its own rate. Then add the two amounts.'],
      solution: [
        ...shifts.map((s) => shiftLine(s).replace(`**${s.day}:**`, `**${s.day} (${s.tag?.toLowerCase()}):**`)),
        `Day-shift hours: $${shifts.filter((s) => s.tag === 'Day').map((s) => mn(s.worked / 60)).join(' + ')} = ${mn(h1)}${H}$. Evening-shift hours: $${shifts.filter((s) => s.tag === 'Evening').map((s) => mn(s.worked / 60)).join(' + ')} = ${mn(h2)}${H}$.`,
        `Day pay: $${mn(h1)} \\times ${m2(r)} = ${m2(p1)}$. Evening pay: $${mn(h2)} \\times ${m2(r2)} = ${m2(p2)}$.`,
        `Gross pay: $${m2(p1)} + ${m2(p2)} = ${m2(g)}$`,
        `${name} earned ${money(g)} for the week.`,
      ],
      answerDisplay: `$${mn(h1)}${H}$; $${mn(h2)}${H}$; ${money(g)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 3.1 Overtime
// ---------------------------------------------------------------------------

const HOLIDAYS = ['Canada Day', 'Labour Day', 'Family Day', 'Victoria Day', 'New Year’s Day', 'Thanksgiving'];
const OT_RULE = 'time-and-a-half (1.5 times the regular wage)';

const overtime = skill({
  id: 'm204-overtime',
  name: 'Overtime pay',
  description: 'Find overtime pay at time-and-a-half (and double time where stated) when a day or week goes over a stated number of hours.',
  outcomes: ['N3'],
  lessonId: 'm204-3-1',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    const j = rng.pick(JOBS);
    if (d === 1) {
      const r = rate(rng, j, 1);
      const h = rng.int(2, 6);
      if (rng.chance(0.3)) {
        const r2 = 2 * r;
        const day = rng.pick(HOLIDAYS);
        return {
          prompt: `${name} works as ${j.job} and earns ${money(r)} per hour. At this job, hours worked on a holiday are paid at **double time**, which is $2$ times the regular wage. ${name} worked $${h}$ hours on ${day}. Find the double-time rate and the pay for those hours, ${CENT}.`,
          parts: [moneyPart(r2, 'Double-time rate: \\$'), moneyPart(r2 * h, 'Holiday pay: \\$')],
          hints: ['Double time means $2$ times the regular hourly wage.', `Then multiply the double-time rate by the $${h}$ hours.`],
          solution: [`Double-time rate: $2 \\times ${m2(r)} = ${m2(r2)}$`, `Holiday pay: $${h} \\times ${m2(r2)} = ${m2(r2 * h)}$`, `The double-time rate is ${money(r2)} per hour, and the holiday pay is ${money(r2 * h)}.`],
          answerDisplay: `${money(r2)} per hour; ${money(r2 * h)}`,
        };
      }
      const ot = 1.5 * r;
      return {
        prompt: `${name} works as ${j.job} and earns ${money(r)} per hour. Overtime is paid at **time-and-a-half**, which is $1.5$ times the regular wage. Last week, ${name} worked $${h}$ hours of overtime. Find the overtime rate and the overtime pay, ${CENT}.`,
        parts: [moneyPart(ot, 'Overtime rate: \\$'), moneyPart(ot * h, 'Overtime pay: \\$')],
        hints: ['Time-and-a-half means the regular wage plus half of it again, which is $1.5$ times the wage.', `Then multiply the overtime rate by the $${h}$ overtime hours.`],
        solution: [`Overtime rate: $1.5 \\times ${m2(r)} = ${m2(ot)}$`, `Overtime pay: $${h} \\times ${m2(ot)} = ${m2(ot * h)}$`, `The overtime rate is ${money(ot)} per hour, and the overtime pay is ${money(ot * h)}.`],
        answerDisplay: `${money(ot)} per hour; ${money(ot * h)}`,
      };
    }
    if (d === 2) {
      const weekly = rng.chance(0.5);
      const T = weekly ? 44 : 8;
      const made = retry(
        () => {
          const r = rate(rng, j, 2);
          const extra = weekly ? rng.int(2, 16) / 2 : rng.int(2, 8) / 2;
          return { r, extra, g: T * r + extra * 1.5 * r };
        },
        (v) => isCents(v.g),
      );
      const { r, extra } = made;
      const total = T + extra;
      const regPay = roundTo(T * r, 2);
      const otRate = roundTo(1.5 * r, 2);
      const otPay = roundTo(extra * otRate, 2);
      const g = roundTo(regPay + otPay, 2);
      const day = rng.pick(['Saturday', 'Tuesday', 'Friday', 'Wednesday', 'Monday']);
      return {
        prompt: weekly
          ? `${name} earns ${money(r)} per hour as ${j.job}. At this job, hours over $44$ in one week are overtime, paid at ${OT_RULE}. Last week, ${name} worked $${mn(total)}$ hours. Find the overtime hours and ${poss(name)} gross pay for the week, ${CENT}.`
          : `${name} earns ${money(r)} per hour as ${j.job}. At this job, hours over $8$ in one day are overtime, paid at ${OT_RULE}. On ${day}, ${name} worked $${mn(total)}$ hours. Find the overtime hours and ${poss(name)} gross pay for that day, ${CENT}.`,
        parts: [hoursPart(extra, 'Overtime hours:'), moneyPart(g, 'Gross pay: \\$')],
        hints: [`The first $${T}$ hours are regular hours. Only the hours over $${T}$ are overtime.`, 'Regular pay $=$ regular hours $\\times$ wage. Overtime pay $=$ overtime hours $\\times (1.5 \\times$ wage$)$. Add them.'],
        solution: [
          `Regular hours: $${T}$. Overtime hours: $${mn(total)} - ${T} = ${mn(extra)}$.`,
          `Regular pay: $${T} \\times ${m2(r)} = ${m2(regPay)}$`,
          `Overtime rate: $1.5 \\times ${m2(r)} = ${m2(otRate)}$. Overtime pay: $${mn(extra)} \\times ${m2(otRate)} = ${m2(otPay)}$`,
          `Gross pay: $${m2(regPay)} + ${m2(otPay)} = ${m2(g)}$`,
          `${name} worked $${mn(extra)}${H}$ of overtime and earned ${money(g)}.`,
        ],
        answerDisplay: `$${mn(extra)}${H}$; ${money(g)}`,
      };
    }
    if (rng.chance(0.35)) {
      // Weekly rule over six days, no day over 8 hours.
      const made = retry(
        () => {
          const r = rate(rng, j, 3);
          const hrs = DAYS.slice(0, 6).map(() => rng.int(13, 16) / 2);
          const total = hrs.reduce((a, b) => a + b, 0);
          return { r, hrs, total, g: 44 * r + (total - 44) * 1.5 * r };
        },
        (v) => v.total > 44 && v.total <= 48 && isCents(v.g),
      );
      const { r, hrs, total } = made;
      const extra = total - 44;
      const regPay = roundTo(44 * r, 2);
      const otRate = roundTo(1.5 * r, 2);
      const otPay = roundTo(extra * otRate, 2);
      const g = roundTo(regPay + otPay, 2);
      return {
        prompt: `${name} earns ${money(r)} per hour as ${j.job}. At this job, hours over $44$ in one week are overtime, paid at ${OT_RULE}. The table shows the hours ${name} worked this week. Find the total hours, the overtime hours and the gross pay for the week, ${CENT}.`,
        figure: { type: 'table', headers: ['Day', 'Hours worked'], rows: DAYS.slice(0, 6).map((dn, i) => [dn, fmt(hrs[i])]) },
        parts: [hoursPart(total, 'Total hours:'), hoursPart(extra, 'Overtime hours:'), moneyPart(g, 'Gross pay: \\$')],
        hints: ['Add the hours for the week. Only the hours over $44$ are overtime.', 'Pay $44$ hours at the regular wage and the rest at $1.5$ times the wage. Then add.'],
        solution: [
          `Total hours: $${hrs.map((h) => mn(h)).join(' + ')} = ${mn(total)}$`,
          `Overtime hours: $${mn(total)} - 44 = ${mn(extra)}$`,
          `Regular pay: $44 \\times ${m2(r)} = ${m2(regPay)}$`,
          `Overtime rate: $1.5 \\times ${m2(r)} = ${m2(otRate)}$. Overtime pay: $${mn(extra)} \\times ${m2(otRate)} = ${m2(otPay)}$`,
          `Gross pay: $${m2(regPay)} + ${m2(otPay)} = ${m2(g)}$`,
          `${name} worked $${mn(total)}${H}$, with $${mn(extra)}${H}$ of overtime, and earned ${money(g)}.`,
        ],
        answerDisplay: `$${mn(total)}${H}$; $${mn(extra)}${H}$; ${money(g)}`,
      };
    }
    // Daily rule on a weekly timecard, sometimes with Sunday double time.
    const sunday = rng.chance(0.4);
    const made = retry(
      () => {
        const r = rate(rng, j, 3);
        const hrs = retry(
          () => DAYS.slice(0, 5).map(() => rng.int(12, 22) / 2),
          (hs) => hs.filter((h) => h > 8).length >= 2 && hs.some((h) => h <= 8),
        );
        const sun = sunday ? rng.int(8, 14) / 2 : 0;
        const reg = hrs.reduce((a, h) => a + Math.min(8, h), 0);
        const ot = hrs.reduce((a, h) => a + Math.max(0, h - 8), 0);
        return { r, hrs, sun, reg, ot, g: reg * r + ot * 1.5 * r + sun * 2 * r };
      },
      (v) => isCents(v.g),
    );
    const { r, hrs, sun, reg, ot } = made;
    const regPay = roundTo(reg * r, 2);
    const otRate = roundTo(1.5 * r, 2);
    const otPay = roundTo(ot * otRate, 2);
    const dtRate = roundTo(2 * r, 2);
    const dtPay = roundTo(sun * dtRate, 2);
    const g = roundTo(regPay + otPay + dtPay, 2);
    const days = DAYS.slice(0, 5);
    const rows = days.map((dn, i) => [dn, fmt(hrs[i])]);
    if (sunday) rows.push(['Sunday', fmt(sun)]);
    const split = days.map((dn, i) => (hrs[i] > 8 ? `${dn}: $8$ regular $+ ${mn(hrs[i] - 8)}$ overtime` : `${dn}: $${mn(hrs[i])}$ regular`)).join('; ');
    const solution = [
      `Up to $8$ hours each day are regular. Hours over $8$ are overtime. ${split}.`,
      `Regular hours: $${hrs.map((h) => mn(Math.min(8, h))).join(' + ')} = ${mn(reg)}$. Overtime hours: $${hrs.filter((h) => h > 8).map((h) => mn(h - 8)).join(' + ')} = ${mn(ot)}$.`,
      `Regular pay: $${mn(reg)} \\times ${m2(r)} = ${m2(regPay)}$`,
      `Overtime rate: $1.5 \\times ${m2(r)} = ${m2(otRate)}$. Overtime pay: $${mn(ot)} \\times ${m2(otRate)} = ${m2(otPay)}$`,
    ];
    if (sunday) solution.push(`Sunday (double time): $2 \\times ${m2(r)} = ${m2(dtRate)}$, so $${mn(sun)} \\times ${m2(dtRate)} = ${m2(dtPay)}$`);
    solution.push(`Gross pay: $${[regPay, otPay, ...(sunday ? [dtPay] : [])].map(m2).join(' + ')} = ${m2(g)}$`);
    solution.push(`${name} worked $${mn(ot)}${H}$ at time-and-a-half and earned ${money(g)} for the week.`);
    return {
      prompt: `${name} earns ${money(r)} per hour as ${j.job}. At this job, hours over $8$ in one day are paid at ${OT_RULE}${sunday ? '. All hours worked on Sunday are paid at double time (2 times the regular wage)' : ''}. The table shows the hours ${name} worked this week. Find the overtime hours (at time-and-a-half) and ${poss(name)} gross pay for the week, ${CENT}.`,
      figure: { type: 'table', headers: ['Day', 'Hours worked'], rows },
      parts: [hoursPart(ot, 'Overtime hours:'), moneyPart(g, 'Gross pay: \\$')],
      hints: [
        'Check each day on its own. Only the hours over $8$ on that day are overtime.',
        `Pay the regular hours at ${money(r)}, the overtime hours at $1.5$ times that${sunday ? ' and the Sunday hours at $2$ times that' : ''}. Then add.`,
      ],
      solution,
      answerDisplay: `$${mn(ot)}${H}$; ${money(g)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 3.2 Salary, commission, piecework and tips
// ---------------------------------------------------------------------------

const PERIODS = [
  { how: 'weekly', desc: 'every week', n: 52 },
  { how: 'every two weeks', desc: 'every two weeks', n: 26 },
  { how: 'twice a month', desc: 'twice a month', n: 24 },
  { how: 'monthly', desc: 'once a month', n: 12 },
] as const;

const PERIOD_TABLE: TableFigure = {
  type: 'table',
  headers: ['How often you are paid', 'Pays in a year'],
  rows: [['Weekly', '52'], ['Every two weeks', '26'], ['Twice a month', '24'], ['Monthly', '12']],
};

const SALARY_JOBS = [
  'an assistant manager at a fast-food restaurant',
  'a receptionist at a dental office',
  'a shift supervisor at a warehouse',
  'an office assistant at a trucking company',
  'a caretaker at a high school',
  'a youth worker at a community centre',
  'a parts clerk at a car dealership',
  'a front-desk clerk at a mountain hotel',
];

const SALES_JOBS = [
  { who: 'sells furniture at a downtown store', lo: 4000, hi: 20000 },
  { who: 'sells cellphone plans at a mall kiosk', lo: 2000, hi: 9000 },
  { who: 'sells shoes at a shoe store', lo: 3000, hi: 12000 },
  { who: 'sells hot tubs', lo: 8000, hi: 30000 },
  { who: 'sells used cars', lo: 15000, hi: 60000 },
  { who: 'sells tools at a hardware store', lo: 3000, hi: 15000 },
];

const PIECE_JOBS = [
  { job: 'a tree planter in the northern forests', verb: 'planted', one: 'tree', many: 'trees', rates: [0.1, 0.12, 0.15, 0.18, 0.2], lo: 600, hi: 2000, step: 50 },
  { job: 'a flyer carrier', verb: 'delivered', one: 'flyer', many: 'flyers', rates: [0.06, 0.08, 0.1, 0.12], lo: 200, hi: 800, step: 10 },
  { job: 'a car detailer', verb: 'cleaned', one: 'car', many: 'cars', rates: [15, 18, 20, 25, 30], lo: 2, hi: 9, step: 1 },
  { job: 'a packer at a warehouse', verb: 'packed', one: 'box', many: 'boxes', rates: [0.4, 0.5, 0.6, 0.75], lo: 80, hi: 300, step: 5 },
  { job: 'a berry picker at a farm', verb: 'picked', one: 'flat of berries', many: 'flats of berries', rates: [3, 3.5, 4, 4.5, 5], lo: 8, hi: 30, step: 1 },
];

const TIP_JOBS = [
  { who: 'servers at a downtown restaurant', short: 'servers' },
  { who: 'baristas at a coffee shop', short: 'baristas' },
  { who: 'stylists at a hair salon', short: 'stylists' },
  { who: 'bussers at a busy café', short: 'bussers' },
  { who: 'delivery drivers at a pizza place', short: 'drivers' },
];

const TIP_NAMES = ['Ava', 'Ben', 'Carlos', 'Dina', 'Eli', 'Femi', 'Gita', 'Hugo', 'Isla', 'Jin'];

function salaryItem(rng: Rng, name: string, d: 1 | 2): Out {
  const job = rng.pick(SALARY_JOBS);
  const p = rng.pick(PERIODS);
  if (d === 1) {
    const each = 50 * rng.int(Math.ceil(30000 / p.n / 50), Math.floor(60000 / p.n / 50));
    const annual = each * p.n;
    if (rng.chance(0.5)) {
      return {
        prompt: `${name} works as ${job} for a salary of ${moneyW(annual)} a year. The salary is paid ${p.how} (${p.n} pays a year). How much is each pay, ${CENT}?`,
        parts: [moneyPart(each)],
        hints: ['A salary is a set amount for a whole year. It is split equally into the pays.', `Divide the yearly salary by $${p.n}$.`],
        solution: [`Pay each time $=$ yearly salary $\\div$ number of pays.`, `$${mw(annual)} \\div ${p.n} = ${m2(each)}$`, `Each pay is ${money(each)}.`],
        answerDisplay: money(each),
      };
    }
    return {
      prompt: `${name} works as ${job} and is paid ${moneyW(each)} ${p.desc} (${p.n} pays a year). What is ${poss(name)} yearly salary, ${CENT}?`,
      parts: [moneyPart(annual)],
      hints: ['The yearly salary is the total of all the pays in one year.', `Multiply one pay by $${p.n}$.`],
      solution: [`Yearly salary $=$ one pay $\\times$ number of pays.`, `$${mw(each)} \\times ${p.n} = ${m2(annual)}$`, `${poss(name)} yearly salary is ${money(annual)}.`],
      answerDisplay: money(annual),
    };
  }
  const annual = retry(
    () => 250 * rng.int(128, 240),
    (s) => !isCents(s / p.n) && !halfCent(s / p.n),
  );
  const each = roundTo(annual / p.n, 2);
  return {
    prompt: `${name} works as ${job} for a salary of ${moneyW(annual)} a year. The salary is paid **${p.how}**. Use the table to find the number of pays in a year. How much is each pay, ${CENT}?`,
    figure: PERIOD_TABLE,
    parts: [moneyPart(each)],
    hints: [`Find "${cap(p.how)}" in the table to get the number of pays.`, 'Divide the yearly salary by the number of pays.'],
    solution: [`Paid ${p.how} means $${p.n}$ pays a year.`, `$${mw(annual)} \\div ${p.n} ${toCents(annual / p.n)}$`, `Each pay is about ${money(each)}.`],
    answerDisplay: money(each),
  };
}

function commissionItem(rng: Rng, name: string, d: 1 | 2): Out {
  const s = rng.pick(SALES_JOBS);
  if (d === 1) {
    const pct = rng.pick([2, 3, 4, 5, 10]);
    const sales = 100 * rng.int(s.lo / 100, s.hi / 100);
    const c = (sales * pct) / 100;
    return {
      prompt: `${name} ${s.who} and earns a **commission** of ${pct}% of sales. Last week, ${name} sold ${moneyW(sales)} worth of goods. How much commission did ${name} earn, ${CENT}?`,
      parts: [moneyPart(c)],
      hints: [`Change ${pct}% to a decimal: $${dec(pct)}$.`, 'Commission $=$ commission rate $\\times$ sales.'],
      solution: [`$${pct}\\% = ${dec(pct)}$`, `Commission: $${dec(pct)} \\times ${mw(sales)} = ${m2(c)}$`, `${name} earned ${money(c)} in commission.`],
      answerDisplay: money(c),
    };
  }
  const pct = rng.pick([3, 4, 5, 6, 7.5, 8]);
  const sales = retry(
    () => roundTo(rng.int(s.lo, s.hi) + rng.int(0, 99) / 100, 2),
    (x) => !halfCent((x * pct) / 100),
  );
  const raw = (sales * pct) / 100;
  const c = roundTo(raw, 2);
  return {
    prompt: `${name} ${s.who} and earns a commission of ${pct}% of sales. This month, ${name} sold ${money(sales)} worth of goods. How much commission did ${name} earn, ${CENT}?`,
    parts: [moneyPart(c)],
    hints: [`Change ${pct}% to a decimal: $${dec(pct)}$.`, 'Commission $=$ commission rate $\\times$ sales.'],
    solution: [`$${fmt(pct)}\\% = ${dec(pct)}$`, `Commission: $${dec(pct)} \\times ${m2(sales)} ${toCents(raw)}$`, `${name} earned about ${money(c)} in commission.`],
    answerDisplay: money(c),
  };
}

function pieceItem(rng: Rng, name: string, d: 1 | 2): Out {
  const p = rng.pick(PIECE_JOBS);
  const pr = rng.pick(p.rates);
  if (d === 1) {
    const n = p.step * rng.int(Math.ceil(p.lo / p.step), Math.floor(p.hi / p.step));
    const e = roundTo(pr * n, 2);
    return {
      prompt: `${name} works as ${p.job} and is paid by the piece: ${money(pr)} for each ${p.one}. One day, ${name} ${p.verb} $${mn(n)}$ ${p.many}. How much did ${name} earn that day, ${CENT}?`,
      parts: [moneyPart(e)],
      hints: ['With **piecework**, you are paid for each piece of work you finish.', 'Earnings $=$ pay per piece $\\times$ number of pieces.'],
      solution: ['Earnings $=$ pay per piece $\\times$ number of pieces.', `$${m2(pr)} \\times ${mn(n)} = ${m2(e)}$`, `${name} earned ${money(e)}.`],
      answerDisplay: money(e),
    };
  }
  const k = rng.int(3, 5);
  const days = DAYS.slice(0, k);
  const dayLo = Math.max(1, Math.ceil(p.lo / p.step / 2));
  const counts = days.map(() => p.step * rng.int(dayLo, Math.floor(p.hi / p.step)));
  const n = counts.reduce((a, b) => a + b, 0);
  const e = roundTo(pr * n, 2);
  return {
    prompt: `${name} works as ${p.job} and is paid ${money(pr)} for each ${p.one}. The table shows how many ${p.many} ${name} ${p.verb} this week. Find the total number of ${p.many} and ${poss(name)} pay for the week, ${CENT}.`,
    figure: { type: 'table', headers: ['Day', cap(p.many)], rows: days.map((dn, i) => [dn, String(counts[i])]) },
    parts: [numPart(n, { label: `Total ${p.many}:` }), moneyPart(e, 'Pay: \\$')],
    hints: ['Add the numbers in the table first.', 'Pay $=$ pay per piece $\\times$ total number of pieces.'],
    solution: [`Total: $${counts.map((c) => mn(c)).join(' + ')} = ${mn(n)}$ ${p.many}`, `Pay: $${m2(pr)} \\times ${mn(n)} = ${m2(e)}$`, `${name} ${p.verb} $${mn(n)}$ ${p.many} and earned ${money(e)}.`],
    answerDisplay: `${mn(n)}; ${money(e)}`,
  };
}

function tipsItem(rng: Rng, name: string, d: 1 | 2): Out {
  const t = rng.pick(TIP_JOBS);
  const k = rng.int(3, 6);
  if (d === 1) {
    const each = rng.int(50, 240) / 2;
    const total = roundTo(each * k, 2);
    return {
      prompt: `${name} and the other ${t.short} share their **tips** equally at the end of a shift. There are $${k}$ ${t.short} in all, and the tips add up to ${money(total)}. How much does each person get, ${CENT}?`,
      parts: [moneyPart(each)],
      hints: ['Sharing equally means dividing.', `Divide the total tips by the number of people, $${k}$.`],
      solution: ['Each share $=$ total tips $\\div$ number of people.', `$${m2(total)} \\div ${k} = ${m2(each)}$`, `Each person gets ${money(each)}.`],
      answerDisplay: money(each),
    };
  }
  const total = retry(
    () => rng.int(18000, 60000) / 100,
    (x) => !isCents(x / k) && !halfCent(x / k),
  );
  const raw = total / k;
  const each = roundTo(raw, 2);
  return {
    prompt: `On Saturday, ${k} ${t.who} shared their tips equally. The tips added up to ${money(total)}. How much did ${name}, one of the ${t.short}, get, ${CENT}?`,
    parts: [moneyPart(each)],
    hints: ['Sharing equally means dividing.', `Divide the total tips by $${k}$. Round to the nearest cent.`],
    solution: ['Each share $=$ total tips $\\div$ number of people.', `$${m2(total)} \\div ${k} ${toCents(raw)}$`, `${name} got about ${money(each)}.`],
    answerDisplay: money(each),
  };
}

const otherIncome = skill({
  id: 'm204-other-income',
  name: 'Salary, commission, piecework and tips',
  description: 'Find pay from a yearly salary for each pay period, a commission on sales, piecework, and shared tips, including two-step problems.',
  outcomes: ['N3'],
  lessonId: 'm204-3-2',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    if (d === 1 || d === 2) {
      const kind = rng.pick(['salary', 'commission', 'piece', 'tips'] as const);
      if (kind === 'salary') return salaryItem(rng, name, d);
      if (kind === 'commission') return commissionItem(rng, name, d);
      if (kind === 'piece') return pieceItem(rng, name, d);
      return tipsItem(rng, name, d);
    }
    const mode = rng.pick(['base', 'pool', 'compare', 'pieceHour'] as const);
    if (mode === 'base') {
      const s = rng.pick(SALES_JOBS);
      const base = rng.pick([300, 350, 400, 450, 500]);
      const pct = rng.pick([2, 3, 4, 5, 6]);
      const sales = rng.int(Math.ceil(s.lo / 2), Math.floor(s.hi / 2));
      const c = (sales * pct) / 100;
      const total = base + c;
      return {
        prompt: `${name} ${s.who}. The pay is a base salary of ${moneyW(base)} a week **plus** ${pct}% commission on sales. This week, ${name} sold ${moneyW(sales)} worth of goods. Find the commission and ${poss(name)} total pay for the week, ${CENT}.`,
        parts: [moneyPart(c, 'Commission: \\$'), moneyPart(total, 'Total pay: \\$')],
        hints: [`Commission $= ${dec(pct)} \\times$ sales.`, 'Total pay $=$ base salary $+$ commission.'],
        solution: [`Commission: $${dec(pct)} \\times ${mw(sales)} = ${m2(c)}$`, `Total pay: $${mw(base)} + ${m2(c)} = ${m2(total)}$`, `${name} earned ${money(c)} in commission and ${money(total)} in all.`],
        answerDisplay: `${money(c)}; ${money(total)}`,
      };
    }
    if (mode === 'pool') {
      const t = rng.pick(TIP_JOBS);
      const crew = [name, ...rng.sample(TIP_NAMES.filter((x) => x !== name), 3)];
      const order = rng.shuffle(crew);
      const hours = order.map(() => rng.int(3, 9));
      const totalH = hours.reduce((a, b) => a + b, 0);
      const perHour = rng.int(250, 650) / 100;
      const total = roundTo(perHour * totalH, 2);
      const mine = hours[order.indexOf(name)];
      const share = roundTo(perHour * mine, 2);
      return {
        prompt: `The ${t.who} put their tips in a **tip pool**. The tips are shared by hours worked: the more hours you work, the bigger your share. The tips for the day add up to ${money(total)}. Use the table to find the tips for each hour worked and ${poss(name)} share, ${CENT}.`,
        figure: { type: 'table', headers: ['Name', 'Hours worked'], rows: order.map((x, i) => [x, String(hours[i])]) },
        parts: [moneyPart(perHour, 'Tips per hour: \\$'), moneyPart(share, `${poss(name)} share: \\$`)],
        hints: ['Add up all the hours worked. Divide the total tips by the total hours to get the tips for one hour.', `Then multiply by the hours ${name} worked.`],
        solution: [
          `Total hours: $${hours.join(' + ')} = ${totalH}$`,
          `Tips per hour: $${m2(total)} \\div ${totalH} = ${m2(perHour)}$`,
          `${poss(name)} share: $${mine} \\times ${m2(perHour)} = ${m2(share)}$`,
          `The tips are ${money(perHour)} per hour, and ${name} gets ${money(share)}.`,
        ],
        answerDisplay: `${money(perHour)} per hour; ${money(share)}`,
      };
    }
    if (mode === 'compare') {
      const pB = rng.pick([PERIODS[2], PERIODS[3]]);
      const made = retry(
        () => {
          const a = 10 * rng.int(130, 220);
          const b = pB.n === 24 ? 10 * rng.int(Math.round((a * 26) / 24 / 10) - 8, Math.round((a * 26) / 24 / 10) + 8) : 10 * rng.int(Math.round((a * 26) / 12 / 10) - 15, Math.round((a * 26) / 12 / 10) + 15);
          return { a, b };
        },
        (o) => Math.abs(o.a * 26 - o.b * pB.n) >= 200,
      );
      const { a, b } = made;
      const yA = a * 26;
      const yB = b * pB.n;
      const diff = Math.abs(yA - yB);
      const better = yA > yB ? 'Job A' : 'Job B';
      return {
        prompt: `${name} has two job offers. **Job A** pays ${moneyW(a)} every two weeks. **Job B** pays ${moneyW(b)} ${pB.how}. Use the table to find the pay for one year at each job. Then find how much more the better-paying job pays in a year, ${CENT}.`,
        figure: PERIOD_TABLE,
        parts: [moneyPart(yA, 'Job A per year: \\$'), moneyPart(yB, 'Job B per year: \\$'), moneyPart(diff, 'Difference: \\$')],
        hints: ['Every two weeks is $26$ pays a year. Look up the number of pays for Job B in the table.', 'Multiply each pay by the number of pays. Then subtract the smaller yearly amount from the larger one.'],
        solution: [
          `Job A: $${mw(a)} \\times 26 = ${m2(yA)}$`,
          `Job B: paid ${pB.how} means $${pB.n}$ pays, so $${mw(b)} \\times ${pB.n} = ${m2(yB)}$`,
          `Difference: $${m2(Math.max(yA, yB))} - ${m2(Math.min(yA, yB))} = ${m2(diff)}$`,
          `${better} pays ${money(diff)} more each year. Compare yearly pay, not the size of one pay cheque.`,
        ],
        answerDisplay: `A ${money(yA)}; B ${money(yB)}; ${money(diff)}`,
      };
    }
    // Piecework turned into pay per hour.
    const p = rng.pick(PIECE_JOBS.filter((x) => x.one === 'tree' || x.one === 'box'));
    const pr = rng.pick(p.rates);
    const hrs = rng.pick([6, 7, 8, 9, 10]);
    // Between about $16 and $30 an hour, so the numbers stay realistic.
    const lo = Math.ceil((16 * hrs) / pr / p.step);
    const hi = Math.floor((30 * hrs) / pr / p.step);
    const made = retry(
      () => {
        const n = p.step * rng.int(lo, hi);
        const e = roundTo(pr * n, 2);
        return { n, e, ph: e / hrs };
      },
      (o) => !halfCent(o.ph),
    );
    const { n, e, ph } = made;
    const phR = roundTo(ph, 2);
    return {
      prompt: `${name} works as ${p.job} and is paid ${money(pr)} for each ${p.one}. In ${hrs === 8 ? 'an' : 'a'} $${hrs}$-hour day, ${name} ${p.verb} $${mn(n)}$ ${p.many}. Find ${poss(name)} pay for the day and the pay per hour, ${CENT}.`,
      parts: [moneyPart(e, 'Pay for the day: \\$'), moneyPart(phR, 'Pay per hour: \\$')],
      hints: ['Pay for the day $=$ pay per piece $\\times$ number of pieces.', `To find the pay per hour, divide the pay for the day by $${hrs}$ hours.`],
      solution: [`Pay for the day: $${m2(pr)} \\times ${mn(n)} = ${m2(e)}$`, `Pay per hour: $${m2(e)} \\div ${hrs} ${toCents(ph)}$`, `${name} earned ${money(e)}, which is about ${money(phR)} per hour. A faster worker earns more per hour with piecework.`],
      answerDisplay: `${money(e)}; ${money(phR)} per hour`,
    };
  },
});

// ---------------------------------------------------------------------------
// 3.3 Deductions and net pay
// ---------------------------------------------------------------------------

interface Ded {
  label: string;
  pct?: number;
  amount: number;
  raw: number;
}

const netPay = skill({
  id: 'm204-net-pay',
  name: 'Deductions and net pay',
  description: 'Read a pay stub, find deductions from simple stated percents, and find net pay = gross pay − deductions.',
  outcomes: ['N3'],
  lessonId: 'm204-3-3',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    const j = rng.pick(JOBS);
    if (d === 1) {
      const g = 10 * rng.int(40, 120);
      const ded: Ded[] = [
        { label: 'CPP', amount: Math.round(g * 0.05 * 2) / 2, raw: 0 },
        { label: 'EI', amount: Math.max(5, Math.round(g * 0.016 * 2) / 2), raw: 0 },
        { label: 'Income tax', amount: Math.round(g * rng.float(0.07, 0.12, 3)), raw: 0 },
      ];
      if (rng.chance(0.4)) ded.push({ label: rng.pick(['Union dues', 'Health plan']), amount: rng.pick([10, 12.5, 15, 20, 25]), raw: 0 });
      const totC = ded.reduce((a, x) => a + toC(x.amount), 0);
      const tot = fromC(totC);
      const net = fromC(toC(g) - totC);
      return {
        prompt: `Here is part of ${poss(name)} pay stub from a job as ${j.job}. Find the total deductions and ${poss(name)} net pay, ${CENT}.`,
        figure: { type: 'table', headers: ['Pay stub', 'Amount'], rows: [['Gross pay', cell(g)], ...ded.map((x) => [x.label, cell(x.amount)]), ['Total deductions', '?'], ['Net pay', '?']] },
        parts: [moneyPart(tot, 'Total deductions: \\$'), moneyPart(net, 'Net pay: \\$')],
        hints: ['A **deduction** is money taken off your pay. Add all the deductions.', '**Net pay** $=$ gross pay $-$ total deductions. It is the amount you take home.'],
        solution: [
          `Total deductions: $${ded.map((x) => m2(x.amount)).join(' + ')} = ${m2(tot)}$`,
          `Net pay: $${m2(g)} - ${m2(tot)} = ${m2(net)}$`,
          `The deductions total ${money(tot)}, and ${poss(name)} net pay is ${money(net)}.`,
        ],
        answerDisplay: `${money(tot)}; net ${money(net)}`,
      };
    }
    // Deductions from simple stated percents.
    const pc = rng.pick([5, 6]);
    const pe = rng.pick([1.5, 2]);
    const pt = rng.pick([8, 10, 12, 15]);
    const fixed = rng.chance(0.4) ? { label: rng.pick(['Union dues', 'Health plan']), amount: rng.pick([12.5, 15, 18, 20, 25]) } : null;
    let hrs = 0;
    let r = 0;
    const g = retry(
      () => {
        if (d === 2) return rng.int(40000, 140000) / 100;
        hrs = rng.int(40, 88) / 2;
        r = rate(rng, j, 3);
        return roundTo(hrs * r, 2);
      },
      (x) => [pc, pe, pt].every((p) => !halfCent((x * p) / 100)),
    );
    const ded: Ded[] = [
      { label: 'CPP', pct: pc, raw: (g * pc) / 100, amount: roundTo((g * pc) / 100, 2) },
      { label: 'EI', pct: pe, raw: (g * pe) / 100, amount: roundTo((g * pe) / 100, 2) },
      { label: 'Income tax', pct: pt, raw: (g * pt) / 100, amount: roundTo((g * pt) / 100, 2) },
    ];
    if (fixed) ded.push({ label: fixed.label, amount: fixed.amount, raw: fixed.amount });
    const totC = ded.reduce((a, x) => a + toC(x.amount), 0);
    const tot = fromC(totC);
    const net = fromC(toC(g) - totC);
    const rule = `Suppose ${pc}% of gross pay is taken for CPP, ${fmt(pe)}% for EI and ${pt}% for income tax${fixed ? `, and ${money(fixed.amount)} is taken for ${fixed.label === 'Union dues' ? 'union dues' : 'the health plan'}` : ''}.`;
    const dedRows = ded.map((x) => [x.pct !== undefined ? `${x.label} (${fmt(x.pct)}% of gross pay)` : x.label, x.pct !== undefined ? '?' : cell(x.amount)]);
    const dedSteps = ded.filter((x) => x.pct !== undefined).map((x) => `${x.label}: $${dec(x.pct!)} \\times ${m2(g)} ${toCents(x.raw)}$`);
    if (d === 2) {
      return {
        prompt: `${name} works as ${j.job} and has a gross pay of ${money(g)} for two weeks. ${rule} Round each deduction ${CENT}. Find the total deductions and ${poss(name)} net pay.`,
        figure: { type: 'table', headers: ['Pay stub', 'Amount'], rows: [['Gross pay', cell(g)], ...dedRows, ['Total deductions', '?'], ['Net pay', '?']] },
        parts: [moneyPart(tot, 'Total deductions: \\$', 0.03), moneyPart(net, 'Net pay: \\$', 0.03)],
        hints: ['Find each percent deduction: change the percent to a decimal and multiply by the gross pay. Round to the nearest cent.', 'Add all the deductions. Net pay $=$ gross pay $-$ total deductions.'],
        solution: [
          ...dedSteps,
          `Total deductions: $${ded.map((x) => m2(x.amount)).join(' + ')} = ${m2(tot)}$`,
          `Net pay: $${m2(g)} - ${m2(tot)} = ${m2(net)}$`,
          `The deductions total ${money(tot)}, and ${poss(name)} net pay is ${money(net)}.`,
        ],
        answerDisplay: `${money(tot)}; net ${money(net)}`,
      };
    }
    return {
      prompt: `${name} works as ${j.job} for ${money(r)} per hour and worked $${mn(hrs)}$ hours in this pay period. ${rule} Round each deduction ${CENT}. Use the pay stub to find ${poss(name)} gross pay and net pay.`,
      figure: { type: 'table', headers: ['Pay stub', 'Amount'], rows: [['Hours worked', fmt(hrs)], ['Hourly wage', cell(r)], ['Gross pay', '?'], ...dedRows, ['Net pay', '?']] },
      parts: [moneyPart(g, 'Gross pay: \\$'), moneyPart(net, 'Net pay: \\$', 0.03)],
      hints: ['Gross pay $=$ hourly wage $\\times$ hours worked.', 'Find each deduction from the gross pay, add them, and subtract the total from the gross pay.'],
      solution: [
        `Gross pay: $${mn(hrs)} \\times ${m2(r)} = ${m2(g)}$`,
        ...dedSteps,
        `Total deductions: $${ded.map((x) => m2(x.amount)).join(' + ')} = ${m2(tot)}$`,
        `Net pay: $${m2(g)} - ${m2(tot)} = ${m2(net)}$`,
        `${poss(name)} gross pay is ${money(g)}, and the net pay is ${money(net)}.`,
      ],
      answerDisplay: `Gross ${money(g)}; net ${money(net)}`,
    };
  },
});

export const INCOME_SKILLS: SkillDef[] = [grossPay, overtime, otherIncome, netPay];
