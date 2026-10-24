/** Math 10-3 Unit 2 — Earning an Income (N2, A1). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Jaxon', 'Fatima', 'Ethan',
  'Nia', 'Arjun', 'Chloé', 'Kai', 'Zainab', 'Owen', 'Sofia', 'Tariq', 'Leila', 'Dylan',
  'Harpreet', 'Kiona', 'Rajesh', 'Hana', 'Jamal', 'Émilie', 'Wyatt', 'Ayesha', 'Lucas', 'Talia',
  'Simran', 'Cole', 'Ngozi', 'Marcus', 'Rosa', 'Ji-woo', 'Kwame', 'Tanvir', 'Maya', 'Bao',
];

const poss = (n: string) => `${n}’s`;

/** Insert a thousands separator into a plain number string. */
function group(s: string, sep: string): string {
  const neg = s.startsWith('-');
  const body = neg ? s.slice(1) : s;
  const [i, f] = body.split('.');
  const g = i.length > 3 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : i;
  return `${neg ? '-' : ''}${g}${f !== undefined ? `.${f}` : ''}`;
}

const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const isCents = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
/** True when x sits on a half-cent, where rounding to the nearest cent is ambiguous. */
function halfCent(x: number): boolean {
  const c = Math.abs(x) * 100;
  return Math.abs(c - Math.floor(c) - 0.5) < 1e-6;
}
const cents = (x: number) => roundTo(x, 2);

/** Money in prose (never inside $...$): \$1,234.50 */
const cash = (x: number) => `\\$${group(fmtFixed(x, 2), ',')}`;
/** Money in prose, without cents when it is a whole number of dollars: \$52,000 */
const cashW = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)), ',')}` : cash(x));
/** Money in a table cell (plain text, not Markdown). */
const cashCell = (x: number) => `$${group(fmtFixed(x, 2), ',')}`;
/** A number inside maths with exactly two decimals. */
const m2 = (x: number) => group(fmtFixed(x, 2), '{,}');
/** A number inside maths with trailing zeros removed. */
const mn = (x: number, d = 4) => group(fmt(x, d), '{,}');
/** "= 12.34" or "= 12.3456 \approx 12.35" (inside maths). */
function toCents(x: number): string {
  if (isCents(x)) return `= ${m2(x)}`;
  if (Math.abs(roundTo(x, 6) - x) < 1e-9) return `= ${mn(x, 6)} \\approx ${m2(x)}`;
  // A long or repeating decimal: show a few digits, then round.
  return `= ${group((Math.floor(Math.abs(x) * 1000) / 1000).toFixed(3), '{,}')}\\ldots \\approx ${m2(x)}`;
}
/** Numbers in plain prose (outside maths), with comma separators. */
const tn = (x: number) => group(fmt(x), ',');
const t2 = (x: number) => group(fmtFixed(x, 2), ',');
/** Money inside maths: two decimals unless it is a whole number of dollars. */
const mm = (x: number) => (isWhole(x) ? mn(x) : m2(x));
/** Percent as a decimal, e.g. 5.95 -> 0.0595. */
const dec = (pct: number) => fmt(pct / 100, 6);
const H = '\\ \\text{h}';

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function listAnd(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** A money answer, rounded to the nearest cent. */
function cashPart(value: number, label = '\\$', tol = 0.01): Part {
  return numPart(value, { decimals: 2, label, tolerance: tol });
}

/** Integer cents, so sums and differences of money stay exact. */
const toC = (x: number) => Math.round(x * 100);

function stepVal(rng: Rng, lo: number, hi: number, step: number): number {
  return roundTo(lo + step * rng.int(0, Math.round((hi - lo) / step)), 4);
}

// ---------------------------------------------------------------------------
// Time and timecards
// ---------------------------------------------------------------------------

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function clock(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const suffix = h < 12 ? 'a.m.' : 'p.m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

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
}

function makeShift(rng: Rng, day: string, minH: number, maxH: number): Shift {
  const worked = rng.int(minH * 4, maxH * 4) * 15;
  const brk = worked >= 5 * 60 ? rng.pick([30, 30, 45, 60]) : rng.pick([0, 15, 30]);
  const span = worked + brk;
  const latest = Math.min(15 * 60, 23 * 60 - span);
  const start = rng.int(6 * 4, Math.floor(latest / 15)) * 15;
  return { day, start, end: start + span, brk, worked };
}

function shiftTable(shifts: Shift[]): TableFigure {
  return {
    type: 'table',
    headers: ['Day', 'Start', 'End', 'Unpaid break'],
    rows: shifts.map((s) => [s.day, clock(s.start), clock(s.end), s.brk ? `${s.brk} min` : 'none']),
  };
}

function hoursText(min: number): string {
  return min % 60 === 0 ? `$${min / 60}${H}$` : `${hm(min)} $= ${mn(min / 60)}${H}$`;
}

function shiftLine(s: Shift): string {
  const span = `**${s.day}:** ${clock(s.start)} to ${clock(s.end)} is ${hm(s.end - s.start)}`;
  return s.brk ? `${span}. Minus the ${s.brk} min break leaves ${hoursText(s.worked)}.` : `${span} with no break, so ${hoursText(s.worked)}.`;
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

interface HourlyJob {
  job: string;
  lo: number;
  hi: number;
}

const HOURLY_JOBS: HourlyJob[] = [
  { job: 'a line cook at a downtown restaurant', lo: 16, hi: 22 },
  { job: 'an apprentice carpenter on a housing site', lo: 20, hi: 28 },
  { job: 'a cashier at a grocery store', lo: 15, hi: 18 },
  { job: 'a farm hand on a grain farm', lo: 16, hi: 21 },
  { job: 'a labourer on a pipeline crew', lo: 26, hi: 36 },
  { job: 'a lube technician at an auto shop', lo: 18, hi: 24 },
  { job: 'a warehouse worker at a distribution centre', lo: 17, hi: 23 },
  { job: 'a landscaper', lo: 16, hi: 22 },
  { job: 'a plumber’s helper', lo: 19, hi: 26 },
  { job: 'a hotel housekeeper at a mountain resort', lo: 16, hi: 20 },
  { job: 'a lifeguard at a recreation centre', lo: 16, hi: 21 },
  { job: 'a drywall labourer', lo: 20, hi: 27 },
  { job: 'a floorhand on a drilling rig', lo: 30, hi: 40 },
  { job: 'a tire technician', lo: 18, hi: 25 },
  { job: 'a dishwasher at a small-town café', lo: 15, hi: 18 },
];

/** d1: whole or half dollars; d2: multiples of 10 cents; d3: even cents. Each keeps 1.5 × rate exact to the cent. */
function hourlyRate(rng: Rng, j: HourlyJob, d: Difficulty): number {
  if (d === 1) return rng.int(j.lo * 2, j.hi * 2) / 2;
  if (d === 2) return rng.int(j.lo * 10, j.hi * 10) / 10;
  return rng.int(j.lo * 50, j.hi * 50) / 50;
}

// ---------------------------------------------------------------------------
// Lesson 2.1 — Hourly wages and overtime
// ---------------------------------------------------------------------------

const grossHourly = skill({
  id: 'm103-gross-hourly',
  name: 'Gross pay from an hourly wage',
  description: 'Calculate gross pay from an hourly wage and the hours worked, including hours read from a timecard with unpaid breaks.',
  outcomes: ['N2'],
  lessonId: 'm103-2-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const j = rng.pick(HOURLY_JOBS);
    if (d === 1) {
      const r = hourlyRate(rng, j, 1);
      const [when, lo, hi] = rng.pick([
        ['Last week', 8, 40],
        ['This week', 10, 40],
        ['Over the last two weeks', 30, 80],
      ] as const);
      const h = rng.int(lo, hi);
      const g = r * h;
      return {
        prompt: `${name} works as ${j.job} and earns ${cash(r)} per hour. ${when}, ${name} worked $${h}$ hours. What was ${poss(name)} gross pay?`,
        parts: [cashPart(g)],
        hints: ['Gross pay is the total amount earned before anything is taken off.', 'Gross pay = hourly wage × hours worked.'],
        solution: ['Gross pay $=$ hourly wage $\\times$ hours worked.', `$${m2(r)} \\times ${h} = ${m2(g)}$`, `${poss(name)} gross pay was ${cash(g)}.`],
        answerDisplay: cash(g),
      };
    }

    if (d === 2 && rng.chance(0.45)) {
      // Hours and minutes written out; convert minutes to decimal hours.
      const n = rng.int(2, 3);
      const first = rng.int(0, 7 - n);
      const days = DAYS.slice(first, first + n);
      const made = retry(
        () => {
          const r = hourlyRate(rng, j, 2);
          const mins = days.map(() => rng.int(12, 34) * 15);
          const total = mins.reduce((a, b) => a + b, 0);
          return { r, mins, total, g: (total / 60) * r };
        },
        (v) => v.mins.some((m) => m % 60 !== 0) && !halfCent(v.g),
      );
      const { r, mins, total, g } = made;
      const items = days.map((dname, i) => `${hm(mins[i])} on ${dname}`);
      return {
        prompt: `${name} works part-time as ${j.job} for ${cash(r)} per hour. This week ${name} worked ${listAnd(items)}. What is ${poss(name)} gross pay for the week, to the nearest cent?`,
        parts: [cashPart(g)],
        hints: ['Change each time to hours as a decimal before you multiply: 15 min = 0.25 h, 30 min = 0.5 h, 45 min = 0.75 h.', 'Add the hours, then multiply the total by the hourly wage.'],
        solution: [
          `Change minutes to hours by dividing by 60: ${days.map((dname, i) => `${dname} ${hoursText(mins[i])}`).join('; ')}.`,
          `Total hours: $${mins.map((m) => mn(m / 60)).join(' + ')} = ${mn(total / 60)}${H}$`,
          `Gross pay: $${mn(total / 60)} \\times ${m2(r)} ${toCents(g)}$`,
          `${poss(name)} gross pay for the week is ${cash(g)}.`,
        ],
        answerDisplay: cash(g),
      };
    }

    // Timecard with start times, end times and unpaid breaks.
    const full = d === 3;
    const made = retry(
      () => {
        const r = hourlyRate(rng, j, d);
        let days: string[];
        if (full) days = DAYS.slice(0, 5);
        else {
          const n = rng.int(2, 3);
          const first = rng.int(0, 7 - n);
          days = DAYS.slice(first, first + n);
        }
        const shifts = days.map((day) => makeShift(rng, day, full ? 4 : 3, 8));
        const total = shifts.reduce((a, s) => a + s.worked, 0);
        return { r, shifts, total, g: (total / 60) * r };
      },
      (v) => !halfCent(v.g) && v.total % 60 !== 0,
    );
    const { r, shifts, total, g } = made;
    const th = total / 60;
    const solution = [
      'For each day, find the time from start to end, then subtract the unpaid break.',
      ...shifts.map(shiftLine),
      `Total hours: $${shifts.map((s) => mn(s.worked / 60)).join(' + ')} = ${mn(th)}${H}$`,
      `Gross pay: $${mn(th)} \\times ${m2(r)} ${toCents(g)}$`,
      `${name} worked $${mn(th)}${H}$ and earned ${cash(g)}.`,
    ];
    return {
      prompt: full
        ? `${name} works as ${j.job} and earns ${cash(r)} per hour. Here is ${poss(name)} timecard for the week. Breaks are not paid. Find the total hours worked and the gross pay for the week (to the nearest cent).`
        : `${name} works part-time as ${j.job} for ${cash(r)} per hour. The timecard shows ${poss(name)} shifts this week. Breaks are not paid. What is ${poss(name)} gross pay for these shifts, to the nearest cent?`,
      figure: shiftTable(shifts),
      parts: full ? [numPart(th, { label: 'Total hours:', suffix: 'h' }), cashPart(g, 'Gross pay: \\$')] : [cashPart(g)],
      hints: [
        'For each shift, count the time from the start to the end, then subtract the unpaid break.',
        'Write each day’s hours as a decimal (45 min = 0.75 h), add them, then multiply by the hourly wage.',
      ],
      solution,
      answerDisplay: full ? `$${mn(th)}${H}$; ${cash(g)}` : cash(g),
    };
  },
});

const HOLIDAYS = ['Canada Day', 'Labour Day', 'Thanksgiving Day', 'Family Day', 'Victoria Day', 'New Year’s Day', 'Christmas Day'];

const overtime = skill({
  id: 'm103-overtime',
  name: 'Overtime pay',
  description: 'Calculate overtime pay at time-and-a-half and double time, and gross pay that includes overtime.',
  outcomes: ['N2'],
  lessonId: 'm103-2-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const j = rng.pick(HOURLY_JOBS);
    if (d === 1) {
      const r = hourlyRate(rng, j, 1);
      const dbl = rng.chance(0.35);
      const k = dbl ? 2 : 1.5;
      const ot = k * r;
      const term = dbl ? '**double time**, which is $2$ times the regular hourly wage' : '**time-and-a-half**, which is $1.5$ times the regular hourly wage';
      return {
        prompt: `${name} works as ${j.job} and earns ${cash(r)} per hour. ${dbl ? 'Hours worked on a statutory holiday are' : 'Overtime is'} paid at ${term}. What is ${poss(name)} ${dbl ? 'double-time' : 'overtime'} hourly rate?`,
        parts: [cashPart(ot)],
        hints: [dbl ? 'Double time means twice the regular rate.' : 'Time-and-a-half means the regular rate plus half of it again.', `Multiply the regular wage by $${k}$.`],
        solution: [`${dbl ? 'Double-time' : 'Overtime'} rate $= ${k} \\times$ regular rate.`, `$${k} \\times ${m2(r)} = ${m2(ot)}$`, `${poss(name)} ${dbl ? 'double-time' : 'overtime'} rate is ${cash(ot)} per hour.`],
        answerDisplay: `${cash(ot)} per hour`,
      };
    }

    if (d === 2) {
      const mode = rng.pick(['weekly', 'daily', 'holiday'] as const);
      if (mode === 'holiday') {
        const r = hourlyRate(rng, j, 2);
        const reg = rng.int(24, 40);
        const hol = rng.int(4, 10);
        const day = rng.pick(HOLIDAYS);
        const g = reg * r + hol * 2 * r;
        return {
          prompt: `${name} earns ${cash(r)} per hour as ${j.job}. At this job, hours worked on a statutory holiday are paid at double time (2 times the regular wage). Last week ${name} worked $${reg}$ regular hours plus $${hol}$ hours on ${day}. What was ${poss(name)} gross pay for the week?`,
          parts: [cashPart(g)],
          hints: ['Pay the regular hours and the holiday hours separately, then add.', 'The holiday rate is $2 \\times$ the regular rate.'],
          solution: [
            `Regular pay: $${reg} \\times ${m2(r)} = ${m2(reg * r)}$`,
            `Double-time rate: $2 \\times ${m2(r)} = ${m2(2 * r)}$, so holiday pay is $${hol} \\times ${m2(2 * r)} = ${m2(hol * 2 * r)}$`,
            `Gross pay: $${m2(reg * r)} + ${m2(hol * 2 * r)} = ${m2(g)}$`,
            `${poss(name)} gross pay was ${cash(g)}.`,
          ],
          answerDisplay: cash(g),
        };
      }
      const weekly = mode === 'weekly';
      const T = weekly ? rng.pick([40, 44]) : 8;
      const made = retry(
        () => {
          const r = hourlyRate(rng, j, 2);
          const extra = weekly ? rng.int(2, 20) / 2 : rng.int(2, 9) / 2;
          return { r, extra, g: T * r + extra * 1.5 * r };
        },
        (v) => isCents(v.g),
      );
      const { r, extra, g } = made;
      const total = T + extra;
      const ot = extra * 1.5 * r;
      const rule = weekly ? `for all hours over $${T}$ in a week` : 'for all hours over $8$ in a day';
      const story = weekly
        ? `Last week ${name} worked $${mn(total)}$ hours.`
        : `On ${rng.pick(['Saturday', 'Tuesday', 'Friday', 'Wednesday'])}, ${name} worked a $${mn(total)}$-hour shift (not counting unpaid breaks).`;
      return {
        prompt: `${name} earns ${cash(r)} per hour as ${j.job}. At this job, overtime is paid at time-and-a-half (1.5 times the regular wage) ${rule}. ${story} What was ${poss(name)} gross pay ${weekly ? 'for the week' : 'for that shift'}?`,
        parts: [cashPart(g)],
        hints: [`Split the hours into regular hours (the first $${T}$) and overtime hours (the rest).`, 'Regular pay = regular hours × wage. Overtime pay = overtime hours × (1.5 × wage). Add them.'],
        solution: [
          `Regular hours: $${T}$. Overtime hours: $${mn(total)} - ${T} = ${mn(extra)}$.`,
          `Regular pay: $${T} \\times ${m2(r)} = ${m2(T * r)}$`,
          `Overtime rate: $1.5 \\times ${m2(r)} = ${m2(1.5 * r)}$, so overtime pay is $${mn(extra)} \\times ${m2(1.5 * r)} = ${m2(ot)}$`,
          `Gross pay: $${m2(T * r)} + ${m2(ot)} = ${m2(g)}$`,
          `${poss(name)} gross pay was ${cash(g)}.`,
        ],
        answerDisplay: cash(g),
      };
    }

    // d3: weekly timecard with a daily overtime rule (and sometimes Sunday double time).
    const sunday = rng.chance(0.4);
    const made = retry(
      () => {
        const r = hourlyRate(rng, j, 3);
        const hrs = retry(
          () => DAYS.slice(0, 5).map(() => rng.int(12, 23) / 2),
          (hs) => hs.filter((h) => h > 8).length >= 2 && hs.some((h) => h <= 8),
        );
        const sun = sunday ? rng.int(8, 16) / 2 : 0;
        const reg = hrs.reduce((a, h) => a + Math.min(8, h), 0);
        const ot = hrs.reduce((a, h) => a + Math.max(0, h - 8), 0);
        return { r, hrs, sun, reg, ot, g: reg * r + ot * 1.5 * r + sun * 2 * r };
      },
      (v) => isCents(v.g),
    );
    const { r, hrs, sun, reg, ot, g } = made;
    const days = DAYS.slice(0, 5);
    const rows = days.map((dn, i) => [dn, fmt(hrs[i])]);
    if (sunday) rows.push(['Sunday', fmt(sun)]);
    const split = days.map((dn, i) => (hrs[i] > 8 ? `${dn} $8 + ${mn(hrs[i] - 8)}$` : `${dn} $${mn(hrs[i])} + 0$`)).join('; ');
    const solution = [
      `Up to $8$ hours each day are regular; hours over $8$ are overtime. Regular + overtime: ${split}.`,
      `Regular hours: $${hrs.map((h) => mn(Math.min(8, h))).join(' + ')} = ${mn(reg)}$. Overtime hours: $${mn(ot)}$.`,
      `Regular pay: $${mn(reg)} \\times ${m2(r)} = ${m2(reg * r)}$`,
      `Overtime pay: $${mn(ot)} \\times (1.5 \\times ${m2(r)}) = ${mn(ot)} \\times ${m2(1.5 * r)} = ${m2(ot * 1.5 * r)}$`,
    ];
    if (sunday) solution.push(`Sunday pay (double time): $${mn(sun)} \\times (2 \\times ${m2(r)}) = ${mn(sun)} \\times ${m2(2 * r)} = ${m2(sun * 2 * r)}$`);
    solution.push(`Gross pay: $${[reg * r, ot * 1.5 * r, ...(sunday ? [sun * 2 * r] : [])].map(m2).join(' + ')} = ${m2(g)}$`);
    solution.push(`${name} worked $${mn(ot)}${H}$ at time-and-a-half and earned ${cash(g)} for the week.`);
    return {
      prompt: `${name} earns ${cash(r)} per hour as ${j.job}. At this job, hours over $8$ in a day are paid at time-and-a-half (1.5 times the regular wage)${sunday ? ', and all hours worked on Sunday are paid at double time' : ''}. The timecard shows the hours ${name} worked this week, not counting unpaid breaks. Find the number of hours paid at time-and-a-half and ${poss(name)} gross pay for the week.`,
      figure: { type: 'table', headers: ['Day', 'Hours worked'], rows },
      parts: [numPart(ot, { label: 'Hours at time-and-a-half:', suffix: 'h' }), cashPart(g, 'Gross pay: \\$')],
      hints: [
        'Check each day: only the hours over 8 on that day are overtime. Do not use the weekly total to find overtime.',
        `Pay regular hours at ${cash(r)}, overtime hours at $1.5 \\times$ that rate${sunday ? ' and Sunday hours at $2 \\times$ that rate' : ''}, then add.`,
      ],
      solution,
      answerDisplay: `$${mn(ot)}${H}$; ${cash(g)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — Salary, commission and piecework
// ---------------------------------------------------------------------------

const SALARY_JOBS = [
  'an office manager at a trucking company in Nisku',
  'the assistant manager of a hardware store',
  'a safety coordinator for a construction company',
  'a dental assistant',
  'a service advisor at a car dealership',
  'a water-treatment operator for a town',
  'a payroll clerk at a meat-packing plant',
  'a parts manager at a farm-equipment dealer',
  'a dispatcher for a trucking company',
  'a lab technician at a gas plant',
  'a shop supervisor at a fabrication shop',
  'a property manager for a group of apartment buildings',
];

const PERIODS = [
  { key: 'weekly', n: 52, desc: 'every week' },
  { key: 'biweekly', n: 26, desc: 'every two weeks' },
  { key: 'semi-monthly', n: 24, desc: 'twice a month' },
  { key: 'monthly', n: 12, desc: 'once a month' },
] as const;

const PERIOD_HINT = 'Pays per year: weekly $52$, biweekly (every two weeks) $26$, semi-monthly (twice a month) $24$, monthly $12$.';

const salaryPeriod = skill({
  id: 'm103-salary-period',
  name: 'Salary and pay periods',
  description: 'Convert between an annual salary and the gross pay for each weekly, biweekly, semi-monthly or monthly pay period, and compare pay periods.',
  outcomes: ['N2'],
  lessonId: 'm103-2-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const job = rng.pick(SALARY_JOBS);
    const p = rng.pick(PERIODS);
    if (d === 1 || d === 2) {
      const toAnnual = rng.chance(0.4);
      if (toAnnual) {
        const each = d === 1 ? rng.int(Math.ceil(32000 / p.n / 50), Math.floor(80000 / p.n / 50)) * 50 : rng.int(Math.ceil(3200000 / p.n), Math.floor(9000000 / p.n)) / 100;
        const s = each * p.n;
        return {
          prompt: `${name} works as ${job} and is paid ${cash(each)} ${p.desc}${d === 1 ? ` (${p.n} pays a year)` : ''}. What is ${poss(name)} annual salary?`,
          parts: [cashPart(s)],
          hints: d === 1 ? ['An annual salary is the pay for a whole year.', 'Multiply the pay for one period by the number of pays in a year.'] : ['How many pays are there in one year?', PERIOD_HINT],
          solution: [`Being paid ${p.desc} means $${p.n}$ pays a year.`, `$${m2(each)} \\times ${p.n} = ${m2(s)}$`, `${poss(name)} annual salary is ${cash(s)}.`],
          answerDisplay: cash(s),
        };
      }
      const made = retry(
        () => {
          if (d === 1) {
            const each = rng.int(Math.ceil(32000 / p.n / 50), Math.floor(80000 / p.n / 50)) * 50;
            return { s: each * p.n, each };
          }
          const s = rng.int(128, 380) * 250;
          return { s, each: s / p.n };
        },
        (v) => !halfCent(v.each) && (d === 1 || !isWhole(v.each)),
      );
      const { s, each } = made;
      return {
        prompt:
          d === 1
            ? `${name} works as ${job} for an annual salary of ${cashW(s)}. The salary is paid ${p.key} (${p.n} pays a year). How much is each pay?`
            : `${name} earns an annual salary of ${cashW(s)} as ${job}, paid ${p.key}. What is the gross pay on each pay cheque, to the nearest cent?`,
        parts: [cashPart(each)],
        hints: d === 1 ? ['The salary is shared equally among all the pays in the year.', `Divide the annual salary by $${p.n}$.`] : [`How many pays does a ${p.key} schedule give in one year?`, PERIOD_HINT],
        solution: [`Being paid ${p.key} (${p.desc}) means $${p.n}$ pays a year.`, `$${mn(s)} \\div ${p.n} ${toCents(each)}$`, `Each pay cheque is ${cash(each)}.`],
        answerDisplay: cash(each),
      };
    }

    const mode = rng.pick(['semiVsBi', 'hourly', 'compare'] as const);
    if (mode === 'semiVsBi') {
      const s = retry(
        () => rng.int(72, 180) * 500,
        (v) => !halfCent(v / 24) && !halfCent(v / 26),
      );
      const a = cents(s / 24);
      const b = cents(s / 26);
      const diff = roundTo(a - b, 2);
      return {
        prompt: `${name} earns ${cashW(s)} a year as ${job}. The employer is switching from **semi-monthly** pay to **biweekly** pay. The annual salary does not change. How much less will each pay cheque be? Round each pay to the nearest cent first.`,
        parts: [cashPart(diff, '\\$', 0.02)],
        hints: ['Semi-monthly and biweekly sound alike, but they give a different number of pays each year.', 'Semi-monthly: divide by 24. Biweekly: divide by 26. Then subtract.'],
        solution: [
          `Semi-monthly (twice a month) is $24$ pays: $${mn(s)} \\div 24 ${toCents(s / 24)}$`,
          `Biweekly (every two weeks) is $26$ pays: $${mn(s)} \\div 26 ${toCents(s / 26)}$`,
          `Difference: $${m2(a)} - ${m2(b)} = ${m2(diff)}$`,
          `Each biweekly cheque is ${cash(diff)} less, but there are two extra cheques a year.`,
        ],
        answerDisplay: cash(diff),
      };
    }
    if (mode === 'hourly') {
      const made = retry(
        () => {
          const s = rng.int(72, 190) * 500;
          const hpw = rng.pick([35, 37.5, 40, 40, 44]);
          return { s, hpw, rate: s / (hpw * 52) };
        },
        (v) => !halfCent(v.rate),
      );
      const { s, hpw, rate } = made;
      const yearH = hpw * 52;
      return {
        prompt: `${name} is offered a salary of ${cashW(s)} a year as ${job}. The job is $${mn(hpw)}$ hours a week, and ${name} is paid for $52$ weeks a year. What is the equivalent hourly wage, to the nearest cent?`,
        parts: [cashPart(rate)],
        hints: ['First find the number of hours paid in a year.', `Hours per year = hours per week × 52. Then divide the salary by that number.`],
        solution: [`Hours paid per year: $${mn(hpw)} \\times 52 = ${mn(yearH)}$`, `Hourly wage: $${mn(s)} \\div ${mn(yearH)} ${toCents(rate)}$`, `The salary is equivalent to about ${cash(rate)} per hour.`],
        answerDisplay: `${cash(rate)} per hour`,
      };
    }
    // Compare two offers paid on different schedules.
    const made = retry(
      () => {
        const [pa, pb] = rng.sample(PERIODS, 2);
        const target = rng.int(40, 80) * 1000;
        const ea = Math.round((target / pa.n) * rng.float(0.94, 1.06, 3) / 10) * 10;
        const eb = Math.round((target / pb.n) * rng.float(0.94, 1.06, 3) / 10) * 10;
        return { pa, pb, ea, eb, ya: ea * pa.n, yb: eb * pb.n };
      },
      (v) => Math.abs(v.ya - v.yb) >= 100,
    );
    const { pa, pb, ea, eb, ya, yb } = made;
    const aWins = ya > yb;
    const diff = Math.abs(ya - yb);
    return {
      prompt: `${name} has two job offers. **Offer A** pays ${cashW(ea)} ${pa.desc}. **Offer B** pays ${cashW(eb)} ${pb.desc}. Which offer pays more in a year, and how much more?`,
      parts: [{ label: 'Which offer pays more per year?', answer: fixedChoice(['Offer A', 'Offer B'], aWins ? 0 : 1) }, cashPart(diff, 'How much more per year? \\$')],
      hints: ['You cannot compare pay cheques from different pay periods directly. Change both to a yearly amount.', PERIOD_HINT],
      solution: [
        `Offer A: ${pa.desc} is $${pa.n}$ pays, so $${mn(ea)} \\times ${pa.n} = ${mn(ya)}$ per year.`,
        `Offer B: ${pb.desc} is $${pb.n}$ pays, so $${mn(eb)} \\times ${pb.n} = ${mn(yb)}$ per year.`,
        `Difference: $${mn(Math.max(ya, yb))} - ${mn(Math.min(ya, yb))} = ${mn(diff)}$`,
        `Offer ${aWins ? 'A' : 'B'} pays ${cashW(diff)} more per year.`,
      ],
      answerDisplay: `Offer ${aWins ? 'A' : 'B'}, by ${cashW(diff)} per year`,
    };
  },
});

interface SalesJob {
  who: string;
  per: 'week' | 'month';
  lo: number;
  hi: number;
  step: number;
}

const SALES_JOBS: SalesJob[] = [
  { who: 'sells new and used trucks at a dealership', per: 'month', lo: 80000, hi: 240000, step: 1000 },
  { who: 'sells furniture at a downtown store', per: 'month', lo: 18000, hi: 60000, step: 500 },
  { who: 'sells farm equipment in a farming town', per: 'month', lo: 90000, hi: 300000, step: 1000 },
  { who: 'sells cell phones and plans at a mall kiosk', per: 'week', lo: 3000, hi: 9000, step: 100 },
  { who: 'sells hot tubs at a pool-and-spa store', per: 'month', lo: 20000, hi: 80000, step: 500 },
  { who: 'sells appliances at a home store', per: 'week', lo: 4000, hi: 15000, step: 100 },
  { who: 'sells RVs and trailers at a lot by the highway', per: 'month', lo: 60000, hi: 200000, step: 1000 },
  { who: 'sells advertising for a local radio station', per: 'month', lo: 12000, hi: 45000, step: 500 },
  { who: 'sells work boots and safety gear', per: 'week', lo: 3000, hi: 10000, step: 100 },
];

function salesAmount(rng: Rng, s: SalesJob, exact: boolean): number {
  if (exact) return stepVal(rng, s.lo, s.hi, s.step);
  return rng.int(s.lo, s.hi) + (rng.chance(0.5) ? rng.int(1, 99) / 100 : 0);
}

const commission = skill({
  id: 'm103-commission',
  name: 'Commission',
  description: 'Calculate straight commission, salary plus commission and graduated commission.',
  outcomes: ['N2'],
  lessonId: 'm103-2-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const s = rng.pick(SALES_JOBS);
    const last = `last ${s.per}`;
    if (d === 1) {
      const r = rng.pick([2, 3, 4, 5, 6, 8, 10]);
      const sales = salesAmount(rng, s, true);
      const c = (r * sales) / 100;
      return {
        prompt: `${name} ${s.who} and earns a straight commission of ${r}% of sales. ${cap(last)}, ${name} had sales of ${cashW(sales)}. How much commission did ${name} earn?`,
        parts: [cashPart(c)],
        hints: ['Commission is a percent of the sales.', `Change ${r}% to a decimal (${dec(r)}) and multiply by the sales.`],
        solution: [`$${r}\\% = ${dec(r)}$`, `$${dec(r)} \\times ${mn(sales)} = ${m2(c)}$`, `${name} earned ${cash(c)} in commission.`],
        answerDisplay: cash(c),
      };
    }
    if (d === 2) {
      const withBase = rng.chance(0.65);
      const made = retry(
        () => {
          const r = rng.pick([2.5, 3, 3.5, 4, 4.5, 5, 6, 7.5]);
          const sales = salesAmount(rng, s, false);
          const base = withBase ? (s.per === 'week' ? rng.int(12, 28) * 25 : rng.int(24, 56) * 50) : 0;
          const c = (r * sales) / 100;
          return { r, sales, base, c, total: base + c };
        },
        (v) => !halfCent(v.total),
      );
      const { r, sales, base, c, total } = made;
      return {
        prompt: withBase
          ? `${name} ${s.who}. The pay is ${cashW(base)} per ${s.per} plus ${r}% commission on sales. ${cap(last)}, ${name} had sales of ${cashW(sales)}. What were ${poss(name)} total earnings for the ${s.per}, to the nearest cent?`
          : `${name} ${s.who} and earns a straight commission of ${r}% of sales. ${cap(last)}, ${name} had sales of ${cashW(sales)}. How much commission did ${name} earn, to the nearest cent?`,
        parts: [cashPart(total)],
        hints: withBase
          ? ['Find the commission first, then add the base salary.', `Commission = ${dec(r)} × sales. Total earnings = base salary + commission.`]
          : ['Commission is a percent of the sales.', `Change ${r}% to the decimal ${dec(r)} and multiply by the sales.`],
        solution: [
          `$${fmt(r)}\\% = ${dec(r)}$`,
          `Commission: $${dec(r)} \\times ${mm(sales)} ${toCents(c)}$`,
          ...(withBase ? [`Total earnings: $${mn(base)} + ${mn(c, 6)} ${toCents(total)}$`] : []),
          `${name} earned ${cash(total)}${withBase ? ` for the ${s.per}` : ' in commission'}.`,
        ],
        answerDisplay: cash(total),
      };
    }
    // d3: graduated commission or commission on sales over a quota.
    if (rng.chance(0.55)) {
      const made = retry(
        () => {
          const t = s.per === 'week' ? rng.pick([2000, 2500, 3000]) : s.hi > 100000 ? rng.pick([50000, 75000, 100000]) : rng.pick([10000, 15000, 20000]);
          const r1 = rng.pick([2, 2.5, 3, 4, 5]);
          const r2 = r1 + rng.pick([1, 1.5, 2, 3]);
          const sales = roundTo(t * rng.float(1.3, 3.2, 3) + rng.int(0, 99) / 100, 2);
          const c1 = (r1 * t) / 100;
          const c2 = (r2 * (sales - t)) / 100;
          return { t, r1, r2, sales, c1, c2, total: c1 + c2 };
        },
        (v) => !halfCent(v.total) && v.sales > v.t,
      );
      const { t, r1, r2, sales, c1, c2, total } = made;
      const above = roundTo(sales - t, 2);
      return {
        prompt: `${name} ${s.who}. The commission is ${r1}% on the first ${cashW(t)} of sales each ${s.per} and ${r2}% on all sales above ${cashW(t)}. ${cap(last)}, ${name} had sales of ${cashW(sales)}. What was ${poss(name)} total commission, to the nearest cent?`,
        parts: [cashPart(total)],
        hints: [`Split the sales into two parts: the first ${cashW(t)}, and the amount above ${cashW(t)}.`, `Use ${r1}% on the first part and ${r2}% on the second part, then add the two commissions.`],
        solution: [
          `Sales above ${cashW(t)}: $${mm(sales)} - ${mn(t)} = ${mm(above)}$`,
          `Commission on the first ${cashW(t)}: $${dec(r1)} \\times ${mn(t)} = ${m2(c1)}$`,
          `Commission on the rest: $${dec(r2)} \\times ${mm(above)} ${toCents(c2)}$`,
          `Total: $${m2(c1)} + ${mn(c2, 6)} ${toCents(total)}$`,
          `${poss(name)} total commission was ${cash(total)}.`,
        ],
        answerDisplay: cash(total),
      };
    }
    const made = retry(
      () => {
        const q = s.per === 'week' ? rng.pick([2000, 2500, 3000]) : s.hi > 100000 ? rng.pick([40000, 50000, 60000]) : rng.pick([10000, 12000, 15000]);
        const base = s.per === 'week' ? rng.int(12, 24) * 25 : rng.int(24, 48) * 50;
        const r = rng.pick([3, 4, 5, 6, 7.5, 8]);
        const sales = roundTo(q * rng.float(1.2, 3, 3) + rng.int(0, 99) / 100, 2);
        const c = (r * (sales - q)) / 100;
        return { q, base, r, sales, c, total: base + c };
      },
      (v) => !halfCent(v.total) && v.sales > v.q,
    );
    const { q, base, r, sales, c, total } = made;
    const over = roundTo(sales - q, 2);
    return {
      prompt: `${name} ${s.who}. The pay is ${cashW(base)} per ${s.per} plus ${r}% commission on all sales **over** ${cashW(q)}. ${cap(last)}, ${name} had sales of ${cashW(sales)}. What were ${poss(name)} total earnings for the ${s.per}, to the nearest cent?`,
      parts: [cashPart(total)],
      hints: [`Commission is paid only on the sales above ${cashW(q)}. Subtract first.`, `Commission = ${dec(r)} × (sales − ${tn(q)}). Then add the base pay.`],
      solution: [
        `Sales over the quota: $${mm(sales)} - ${mn(q)} = ${mm(over)}$`,
        `Commission: $${dec(r)} \\times ${mm(over)} ${toCents(c)}$`,
        `Total earnings: $${mn(base)} + ${mn(c, 6)} ${toCents(total)}$`,
        `${poss(name)} total earnings were ${cash(total)}.`,
      ],
      answerDisplay: cash(total),
    };
  },
});

interface PieceJob {
  job: string;
  verb: string;
  one: string;
  many: string;
  short: string;
  friendly: number[];
  lo: number;
  hi: number;
  step: number;
  nLo: number;
  nHi: number;
  nStep: number;
  /** Typical length of a work day, for comparisons with hourly pay. */
  dayH: number;
}

const PIECE_JOBS: PieceJob[] = [
  { job: 'a tree planter in a northern forest', verb: 'plants', one: 'tree', many: 'trees', short: 'trees', friendly: [0.1, 0.15, 0.2, 0.25], lo: 0.12, hi: 0.24, step: 0.01, nLo: 800, nHi: 2400, nStep: 50, dayH: 10 },
  { job: 'a sewing-machine operator at a sports-apparel shop', verb: 'sews', one: 'hockey jersey', many: 'hockey jerseys', short: 'jerseys', friendly: [2, 2.5, 3, 4], lo: 2.25, hi: 4.75, step: 0.05, nLo: 25, nHi: 70, nStep: 1, dayH: 8 },
  { job: 'a flyer carrier in a suburb', verb: 'delivers', one: 'flyer', many: 'flyers', short: 'flyers', friendly: [0.05, 0.08, 0.1], lo: 0.05, hi: 0.12, step: 0.01, nLo: 300, nHi: 1500, nStep: 25, dayH: 6 },
  { job: 'a berry picker at a saskatoon farm', verb: 'picks', one: 'kilogram of saskatoon berries', many: 'kilograms of saskatoon berries', short: 'kg', friendly: [1, 1.5, 2], lo: 1.1, hi: 2.4, step: 0.05, nLo: 20, nHi: 80, nStep: 1, dayH: 8 },
  { job: 'a roofer', verb: 'shingles', one: 'square of roof (100 square feet)', many: 'squares of roof', short: 'squares', friendly: [30, 35, 40], lo: 28, hi: 46, step: 0.5, nLo: 6, nHi: 20, nStep: 1, dayH: 10 },
  { job: 'a courier in a growing town', verb: 'delivers', one: 'parcel', many: 'parcels', short: 'parcels', friendly: [1.5, 2, 2.5], lo: 1.4, hi: 2.9, step: 0.05, nLo: 60, nHi: 180, nStep: 1, dayH: 10 },
  { job: 'a drywall hanger', verb: 'hangs', one: 'sheet of drywall', many: 'sheets of drywall', short: 'sheets', friendly: [8, 10, 12], lo: 7.5, hi: 13.5, step: 0.25, nLo: 15, nHi: 50, nStep: 1, dayH: 8 },
  { job: 'a wheel builder at a bike shop', verb: 'builds', one: 'bicycle wheel', many: 'bicycle wheels', short: 'wheels', friendly: [3, 4, 5], lo: 2.75, hi: 5.5, step: 0.05, nLo: 20, nHi: 60, nStep: 1, dayH: 8 },
];

const pieceRate = (rng: Rng, p: PieceJob) => stepVal(rng, p.lo, p.hi, p.step);
const pieceCount = (rng: Rng, p: PieceJob, lo = p.nLo, hi = p.nHi) => {
  const steps = Math.floor((hi - lo) / p.nStep);
  return lo + p.nStep * rng.int(0, steps);
};

const piecework = skill({
  id: 'm103-piecework',
  name: 'Piecework',
  description: 'Calculate piecework earnings, including bonuses after a quota and comparisons with hourly pay.',
  outcomes: ['N2'],
  lessonId: 'm103-2-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const p = rng.pick(PIECE_JOBS);
    if (d === 1) {
      const rate = rng.pick(p.friendly);
      const n = pieceCount(rng, p);
      const e = n * rate;
      return {
        prompt: `${name} works as ${p.job} and is paid ${cash(rate)} per ${p.one}. One day ${name} ${p.verb} $${n}$ ${p.many}. How much did ${name} earn that day?`,
        parts: [cashPart(e)],
        hints: ['With piecework, you are paid for each item you finish.', 'Earnings = number of pieces × pay per piece.'],
        solution: ['Earnings $=$ number of pieces $\\times$ pay per piece.', `$${mn(n)} \\times ${m2(rate)} = ${m2(e)}$`, `${name} earned ${cash(e)} that day.`],
        answerDisplay: cash(e),
      };
    }
    if (d === 2) {
      if (rng.chance(0.4)) {
        // How many pieces to reach a target?
        const rate = pieceRate(rng, p);
        const n = pieceCount(rng, p);
        const target = roundTo(n * rate, 2);
        return {
          prompt: `${name} works as ${p.job} and is paid ${cash(rate)} per ${p.one}. How many ${p.many} must ${name} ${p.verb.replace(/s$/, '')} to earn ${cash(target)}?`,
          parts: [numPart(n, { suffix: p.short })],
          hints: ['Think: how many times does the piece rate fit into the target?', 'Number of pieces = target earnings ÷ pay per piece.'],
          solution: ['Earnings $=$ pieces $\\times$ rate, so pieces $=$ earnings $\\div$ rate.', `$${m2(target)} \\div ${m2(rate)} = ${mn(n)}$`, `${name} must ${p.verb.replace(/s$/, '')} $${mn(n)}$ ${p.many}.`],
          answerDisplay: `$${mn(n)}$ ${p.many}`,
        };
      }
      const rate = pieceRate(rng, p);
      const days = DAYS.slice(0, 5);
      const counts = days.map(() => pieceCount(rng, p));
      const total = counts.reduce((a, b) => a + b, 0);
      const e = roundTo(total * rate, 2);
      return {
        prompt: `${name} works as ${p.job} and is paid ${cash(rate)} per ${p.one}. The table shows how many ${p.many} ${name} finished each day this week. What were ${poss(name)} earnings for the week?`,
        figure: { type: 'table', headers: ['Day', cap(p.short === 'kg' ? 'kilograms' : p.short)], rows: days.map((dn, i) => [dn, String(counts[i])]) },
        parts: [cashPart(e)],
        hints: ['Find the total number of pieces for the week first.', 'Weekly earnings = total pieces × pay per piece.'],
        solution: [`Total for the week: $${counts.join(' + ')} = ${mn(total)}$`, `Earnings: $${mn(total)} \\times ${m2(rate)} = ${m2(e)}$`, `${poss(name)} earnings for the week were ${cash(e)}.`],
        answerDisplay: cash(e),
      };
    }
    if (rng.chance(0.5)) {
      // Bonus rate after a daily quota.
      const rate = pieceRate(rng, p);
      const bonus = roundTo(Math.max(p.step, roundTo(rate * rng.pick([0.2, 0.25, 0.3, 0.5]) / p.step, 0) * p.step), 2);
      const q = pieceCount(rng, p, p.nLo, Math.round((p.nLo + p.nHi) / 2));
      const n = pieceCount(rng, p, q + p.nStep, p.nHi + p.nStep * 2);
      const extra = n - q;
      const e = roundTo(n * rate + extra * bonus, 2);
      return {
        prompt: `${name} works as ${p.job} and is paid ${cash(rate)} per ${p.one}. There is also a bonus of ${cash(bonus)} for each ${p.one.replace(/ \(.*\)$/, '')} over $${mn(q)}$ in a day. One day ${name} ${p.verb} $${mn(n)}$ ${p.many}. How much did ${name} earn that day?`,
        parts: [cashPart(e)],
        hints: [`Every piece earns ${cash(rate)}. Only the pieces over $${tn(q)}$ also earn the bonus.`, `Base pay = ${tn(n)} × ${t2(rate)}. Bonus = (${tn(n)} − ${tn(q)}) × ${t2(bonus)}. Add them.`],
        solution: [
          `Base pay for all the pieces: $${mn(n)} \\times ${m2(rate)} = ${m2(n * rate)}$`,
          `Pieces over the quota: $${mn(n)} - ${mn(q)} = ${mn(extra)}$`,
          `Bonus: $${mn(extra)} \\times ${m2(bonus)} = ${m2(extra * bonus)}$`,
          `Total: $${m2(n * rate)} + ${m2(extra * bonus)} = ${m2(e)}$`,
          `${name} earned ${cash(e)} that day.`,
        ],
        answerDisplay: cash(e),
      };
    }
    // Piecework compared with hourly pay for the same day.
    const made = retry(
      () => {
        const rate = pieceRate(rng, p);
        const n = pieceCount(rng, p);
        const pw = roundTo(n * rate, 2);
        const hr = Math.max(15, Math.round(((pw / p.dayH) * rng.float(0.8, 1.2, 3)) * 4) / 4);
        const hourly = hr * p.dayH;
        return { rate, n, pw, hr, hourly, diff: roundTo(Math.abs(pw - hourly), 2) };
      },
      (v) => v.diff >= 5,
    );
    const { rate, n, pw, hr, hourly, diff } = made;
    const pieceWins = pw > hourly;
    return {
      prompt: `${name} works as ${p.job} and can choose how to be paid. **Option A:** ${cash(rate)} per ${p.one}. **Option B:** ${cash(hr)} per hour for ${p.dayH === 8 ? 'an' : 'a'} $${p.dayH}$-hour day. On a day when ${name} ${p.verb} $${mn(n)}$ ${p.many}, which option pays more, and by how much?`,
      parts: [{ label: 'Which option pays more?', answer: fixedChoice(['Option A (piecework)', 'Option B (hourly)'], pieceWins ? 0 : 1) }, cashPart(diff, 'By how much? \\$')],
      hints: ['Work out the pay for the day under each option.', `Option A: ${tn(n)} × ${t2(rate)}. Option B: ${p.dayH} × ${t2(hr)}. Then subtract the smaller from the larger.`],
      solution: [
        `Option A: $${mn(n)} \\times ${m2(rate)} = ${m2(pw)}$`,
        `Option B: $${p.dayH} \\times ${m2(hr)} = ${m2(hourly)}$`,
        `Difference: $${m2(Math.max(pw, hourly))} - ${m2(Math.min(pw, hourly))} = ${m2(diff)}$`,
        `Option ${pieceWins ? 'A (piecework)' : 'B (hourly)'} pays ${cash(diff)} more that day.`,
      ],
      answerDisplay: `Option ${pieceWins ? 'A' : 'B'}, by ${cash(diff)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.3 — Contracts and self-employment
// ---------------------------------------------------------------------------

const SALES_PLACES = ['an electronics store', 'a furniture store', 'a sporting-goods store', 'a car dealership', 'a phone store', 'a home-improvement store', 'a western-wear store', 'a mattress store'];

const WORKPLACES = ['a garden centre', 'a lumber yard', 'a grocery store', 'a car wash', 'a hardware store', 'a restaurant', 'a feed store', 'a tire shop', 'a moving company', 'a golf course', 'a ski hill', 'a campground'];

interface Contract {
  trade: string;
  task: string;
  lo: number;
  hi: number;
  hLo: number;
  hHi: number;
  exp: string[];
}

const CONTRACTS: Contract[] = [
  { trade: 'painter', task: 'paint the inside of a house', lo: 2400, hi: 6000, hLo: 30, hHi: 70, exp: ['paint and supplies', 'a rented paint sprayer', 'fuel'] },
  { trade: 'landscaper', task: 'build a stone patio', lo: 3000, hi: 9000, hLo: 35, hHi: 80, exp: ['paving stones and gravel', 'a rented plate compactor', 'fuel'] },
  { trade: 'welder', task: 'build a steel gate for a cattle ranch', lo: 1500, hi: 4000, hLo: 15, hHi: 40, exp: ['steel', 'welding gas and rods', 'fuel'] },
  { trade: 'electrician', task: 'wire a new detached garage', lo: 2500, hi: 6000, hLo: 20, hHi: 50, exp: ['wire and boxes', 'a breaker panel', 'a permit'] },
  { trade: 'tile setter', task: 'tile a bathroom floor and shower', lo: 2000, hi: 5000, hLo: 20, hHi: 45, exp: ['tile, grout and thinset', 'a rented wet saw', 'fuel'] },
  { trade: 'fence builder', task: 'build a cedar fence around a backyard', lo: 3000, hi: 8000, hLo: 30, hHi: 70, exp: ['lumber and posts', 'concrete', 'a rented post-hole auger'] },
  { trade: 'drywaller', task: 'drywall a basement', lo: 3000, hi: 7000, hLo: 35, hHi: 75, exp: ['drywall sheets', 'mud, tape and screws', 'a dump fee'] },
  { trade: 'mobile mechanic', task: 'service a fleet of farm trucks', lo: 1500, hi: 4500, hLo: 15, hHi: 40, exp: ['oil and filters', 'parts', 'fuel'] },
  { trade: 'roofer', task: 'reshingle a garage roof', lo: 2000, hi: 5500, hLo: 20, hHi: 45, exp: ['shingles and underlay', 'nails and flashing', 'a disposal bin'] },
];

const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');

const contractCompare = skill({
  id: 'm103-contract-compare',
  name: 'Comparing ways to be paid',
  description: 'Compare job offers that pay by the hour, by salary, by commission, by the piece or by contract, and find the break-even point.',
  outcomes: ['N2'],
  lessonId: 'm103-2-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const [w1, w2] = rng.sample(WORKPLACES, 2);
    const [s1, s2] = rng.sample(SALES_PLACES, 2);
    if (d === 1) {
      const r = rng.int(30, 44) / 2;
      const h = rng.pick([20, 25, 30, 35, 40]);
      const a = r * h;
      const same = rng.chance(0.15);
      const w = same ? a : a + rng.sign() * rng.int(1, 8) * 10;
      const idx = same ? 2 : a > w ? 0 : 1;
      return {
        prompt: `${name} has two offers for summer work. **Job A** at ${w1} pays ${cash(r)} per hour for $${h}$ hours a week. **Job B** at ${w2} pays a salary of ${cash(w)} per week for the same hours. Which job pays more per week?`,
        parts: [{ answer: fixedChoice(['Job A', 'Job B', 'They pay the same'], idx) }],
        hints: ['Find the weekly pay for Job A, then compare it with Job B.', 'Weekly pay for Job A = hourly wage × hours per week.'],
        solution: [`Job A: $${m2(r)} \\times ${h} = ${m2(a)}$ per week.`, `Job B: ${cash(w)} per week.`, same ? 'The two jobs pay the same amount per week.' : `Job ${idx === 0 ? 'A' : 'B'} pays more, by ${cash(Math.abs(a - w))} per week.`],
        answerDisplay: same ? 'They pay the same' : `Job ${idx === 0 ? 'A' : 'B'}`,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['hourlyVsComm', 'salaryVsStraight', 'contract'] as const);
      let prompt: string;
      let a: number;
      let b: number;
      let solA: string;
      let solB: string;
      let hints: string[];
      if (mode === 'hourlyVsComm') {
        const made = retry(
          () => {
            const r = rng.int(160, 240) / 10;
            const h = rng.int(30, 40);
            const base = rng.int(10, 20) * 25;
            const rc = rng.pick([2, 2.5, 3, 4, 5, 6]);
            const sales = rng.int(4000, 14000);
            return { r, h, base, rc, sales, a: r * h, b: base + (rc * sales) / 100 };
          },
          (v) => isCents(v.b) && Math.abs(v.a - v.b) >= 10,
        );
        ({ a, b } = made);
        const { r, h, base, rc, sales } = made;
        prompt = `${name} is choosing between two sales jobs. **Job A** at ${s1} pays ${cash(r)} per hour for $${h}$ hours a week. **Job B** at ${s2} pays ${cashW(base)} per week plus ${rc}% commission on sales. ${name} expects to sell about ${cashW(sales)} a week at Job B. Which job pays more per week, and by how much?`;
        solA = `Job A: $${m2(r)} \\times ${h} = ${m2(a)}$`;
        solB = `Job B: $${mn(base)} + ${dec(rc)} \\times ${mn(sales)} = ${mn(base)} + ${m2((rc * sales) / 100)} = ${m2(b)}$`;
        hints = ['Find the weekly pay for each job.', `Job B pay = base + commission = ${tn(base)} + ${dec(rc)} × ${tn(sales)}.`];
      } else if (mode === 'salaryVsStraight') {
        const made = retry(
          () => {
            const m = rng.int(56, 90) * 50;
            const rc = rng.pick([3, 4, 5, 6, 8, 10]);
            const sales = Math.round(((m * 100) / rc) * rng.float(0.8, 1.2, 3) / 100) * 100;
            return { m, rc, sales, a: m, b: (rc * sales) / 100 };
          },
          (v) => Math.abs(v.a - v.b) >= 20,
        );
        ({ a, b } = made);
        const { m, rc, sales } = made;
        prompt = `${name} has two offers to sell trucks and trailers. **Job A** pays a salary of ${cashW(m)} per month. **Job B** pays a straight commission of ${rc}% of sales. ${name} expects monthly sales of about ${cashW(sales)}. Which job pays more per month, and by how much?`;
        solA = `Job A: ${cashW(m)} per month.`;
        solB = `Job B: $${dec(rc)} \\times ${mn(sales)} = ${m2(b)}$`;
        hints = ['Find the monthly commission for Job B, then compare it with the salary.', `Commission = ${dec(rc)} × expected sales.`];
      } else {
        const c = rng.pick(CONTRACTS);
        const made = retry(
          () => {
            const r = rng.int(250, 450) / 10;
            const h = rng.int(c.hLo, c.hHi);
            const amt = Math.round((r * h * rng.float(0.8, 1.2, 3)) / 50) * 50;
            return { r, h, amt, a: amt, b: r * h };
          },
          (v) => Math.abs(v.a - v.b) >= 10,
        );
        ({ a, b } = made);
        const { r, h, amt } = made;
        prompt = `A customer wants ${name}, ${article(c.trade)} ${c.trade}, to ${c.task}. **Option A** is a contract: ${cashW(amt)} for the whole job. **Option B** is ${cash(r)} per hour. The job will take about $${h}$ hours, and the customer pays for materials either way. Which option pays ${name} more, and by how much?`;
        solA = `Option A: ${cashW(amt)} for the job.`;
        solB = `Option B: $${m2(r)} \\times ${h} = ${m2(b)}$`;
        hints = ['Find what the hourly option pays for the whole job.', `Hourly option = ${t2(r)} × ${h}. Compare with the contract amount.`];
      }
      const word = mode === 'contract' ? 'Option' : 'Job';
      const aWins = a > b;
      const diff = roundTo(Math.abs(a - b), 2);
      return {
        prompt,
        parts: [{ label: `Which ${word.toLowerCase()} pays more?`, answer: fixedChoice([`${word} A`, `${word} B`], aWins ? 0 : 1) }, cashPart(diff, 'By how much? \\$')],
        hints,
        solution: [solA, solB, `Difference: $${m2(Math.max(a, b))} - ${m2(Math.min(a, b))} = ${m2(diff)}$`, `${word} ${aWins ? 'A' : 'B'} pays ${cash(diff)} more.`],
        answerDisplay: `${word} ${aWins ? 'A' : 'B'}, by ${cash(diff)}`,
      };
    }

    // d3: break-even point.
    const mode = rng.pick(['sales', 'hours', 'pieces'] as const);
    if (mode === 'sales') {
      const sStar = rng.int(10, 60) * 1000;
      const rc = rng.pick([2, 4, 5, 8, 10]);
      const straight = rng.chance(0.3);
      const base = straight ? 0 : rng.int(10, 20) * 100;
      const diffPay = (sStar * rc) / 100;
      const m = base + diffPay;
      return {
        prompt: straight
          ? `**Job A** pays a salary of ${cashW(m)} per month. **Job B** pays a straight commission of ${rc}% of sales. What monthly sales would make the two jobs pay the same?`
          : `**Job A** pays a salary of ${cashW(m)} per month. **Job B** pays ${cashW(base)} per month plus ${rc}% commission on sales. What monthly sales would make the two jobs pay the same?`,
        parts: [numPart(sStar, { label: '\\$' })],
        hints: [`Let $S$ be the monthly sales. Write an expression for Job B’s pay and set it equal to Job A’s pay.`, straight ? `Solve $${dec(rc)}S = ${mn(m)}$ by dividing both sides by $${dec(rc)}$.` : `Solve $${mn(base)} + ${dec(rc)}S = ${mn(m)}$: subtract $${mn(base)}$, then divide by $${dec(rc)}$.`],
        solution: straight
          ? [`Set the pays equal: $${dec(rc)}S = ${mn(m)}$`, `$S = ${mn(m)} \\div ${dec(rc)} = ${mn(sStar)}$`, `With monthly sales of ${cashW(sStar)}, both jobs pay ${cashW(m)}. Above that, Job B pays more.`]
          : [
              `Set the pays equal: $${mn(base)} + ${dec(rc)}S = ${mn(m)}$`,
              `Subtract $${mn(base)}$: $${dec(rc)}S = ${mn(diffPay)}$`,
              `Divide by $${dec(rc)}$: $S = ${mn(diffPay)} \\div ${dec(rc)} = ${mn(sStar)}$`,
              `With monthly sales of ${cashW(sStar)}, both jobs pay ${cashW(m)}. Above that, Job B pays more.`,
            ],
        answerDisplay: cashW(sStar),
      };
    }
    if (mode === 'hours') {
      const r1 = rng.int(180, 300) / 10;
      const gap = rng.pick([1.5, 2, 2.5, 3, 4]);
      const r2 = roundTo(r1 - gap, 2);
      const hStar = rng.int(16, 45);
      const k = hStar * gap;
      const allowance = rng.pick(['a weekly truck allowance', 'a weekly tool allowance', 'a weekly travel allowance']);
      return {
        prompt: `**Job A** pays ${cash(r1)} per hour. **Job B** pays ${cash(r2)} per hour plus ${allowance} of ${cash(k)}. For how many hours of work in a week would the two jobs pay the same amount?`,
        parts: [numPart(hStar, { suffix: 'h' })],
        hints: ['Let $h$ be the hours worked. Write the weekly pay for each job and set them equal.', `Solve $${m2(r1)}h = ${m2(r2)}h + ${m2(k)}$ by getting the $h$ terms on one side.`],
        solution: [
          `Set the pays equal: $${m2(r1)}h = ${m2(r2)}h + ${m2(k)}$`,
          `Subtract $${m2(r2)}h$ from both sides: $${mn(gap)}h = ${m2(k)}$`,
          `Divide by $${mn(gap)}$: $h = ${m2(k)} \\div ${mn(gap)} = ${hStar}$`,
          `At $${hStar}${H}$ a week both jobs pay ${cash(r1 * hStar)}. Below that Job B pays more; above that Job A pays more.`,
        ],
        answerDisplay: `$${hStar}${H}$`,
      };
    }
    const p = rng.pick(PIECE_JOBS);
    const rate = pieceRate(rng, p);
    const nStar = pieceCount(rng, p);
    const day = roundTo(rate * nStar, 2);
    return {
      prompt: `${name} works as ${p.job}. **Option A** pays ${cash(rate)} per ${p.one}. **Option B** pays a flat rate of ${cash(day)} per day. How many ${p.many} would ${name} need to finish in a day for the two options to pay the same?`,
      parts: [numPart(nStar, { suffix: p.short })],
      hints: ['Let $n$ be the number of pieces. Option A pays the piece rate times $n$.', `Solve $${m2(rate)}n = ${m2(day)}$.`],
      solution: [`Set the pays equal: $${m2(rate)}n = ${m2(day)}$`, `$n = ${m2(day)} \\div ${m2(rate)} = ${mn(nStar)}$`, `At $${mn(nStar)}$ ${p.many} a day the options pay the same. More than that, and piecework pays more.`],
      answerDisplay: `$${mn(nStar)}$ ${p.many}`,
    };
  },
});

const selfEmployed = skill({
  id: 'm103-self-employed',
  name: 'Contract and self-employed income',
  description: 'Find the income from a contract after expenses, its hourly equivalent, and the bid needed to earn a target hourly rate.',
  outcomes: ['N2'],
  lessonId: 'm103-2-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const c = rng.pick(CONTRACTS);
    const who = `${name} is a self-employed ${c.trade}.`;
    if (d === 1) {
      const amt = rng.int(c.lo / 100, c.hi / 100) * 100;
      const exp = Math.round((amt * rng.float(0.2, 0.45, 3)) / 10) * 10;
      const inc = amt - exp;
      return {
        prompt: `${who} A customer pays ${cashW(amt)} for ${name} to ${c.task}. ${cap(c.exp[0])} cost ${name} ${cashW(exp)}. How much does ${name} earn from the job after expenses?`,
        parts: [cashPart(inc)],
        hints: ['A self-employed worker pays for materials out of the contract amount.', 'Income = contract amount − expenses.'],
        solution: ['Income $=$ contract amount $-$ expenses.', `$${mn(amt)} - ${mn(exp)} = ${mn(inc)}$`, `${name} earns ${cash(inc)} from the job.`],
        answerDisplay: cash(inc),
      };
    }
    if (d === 2) {
      const hourly = rng.chance(0.55);
      const made = retry(
        () => {
          const amt = rng.int(c.lo / 50, c.hi / 50) * 50;
          const items = hourly ? c.exp.slice(0, 2) : c.exp;
          const share = rng.float(0.2, 0.4, 3);
          const costs = items.map((_, i) => (i === 0 ? Math.round(amt * share * 70) : rng.int(2000, Math.round(amt * 6))) / 100);
          const totalC = costs.reduce((s, x) => s + toC(x), 0) / 100;
          const inc = roundTo(amt - totalC, 2);
          // Hours chosen so the hourly equivalent is realistic for a trade (about $25 to $65 an hour).
          const h = Math.max(8, Math.round(inc / rng.int(25, 65)));
          return { amt, items, costs, totalC, h, inc, rate: inc / h };
        },
        (v) => v.inc > 0 && v.rate >= 18 && v.rate <= 75 && !halfCent(v.rate),
      );
      const { amt, items, costs, totalC, h, inc, rate } = made;
      const list = listAnd(items.map((it, i) => `${cash(costs[i])} for ${it}`));
      const sol = [
        `Total expenses: $${costs.map(m2).join(' + ')} = ${m2(totalC)}$`,
        `Income after expenses: $${mn(amt)} - ${m2(totalC)} = ${m2(inc)}$`,
      ];
      if (!hourly) {
        return {
          prompt: `${who} ${name} agrees to ${c.task} for ${cashW(amt)}. ${name} pays ${list}. How much does ${name} earn from the job after expenses?`,
          parts: [cashPart(inc)],
          hints: ['Add up all the expenses first.', 'Income = contract amount − total expenses.'],
          solution: [...sol, `${name} earns ${cash(inc)} from the job.`],
          answerDisplay: cash(inc),
        };
      }
      return {
        prompt: `${who} ${name} agrees to ${c.task} for ${cashW(amt)}. ${name} pays ${list}. The job takes $${h}$ hours. How much did ${name} earn per hour after expenses, to the nearest cent?`,
        parts: [cashPart(rate)],
        hints: ['Find the income after expenses first.', 'Hourly equivalent = income after expenses ÷ hours worked.'],
        solution: [...sol, `Per hour: $${m2(inc)} \\div ${h} ${toCents(rate)}$`, `${name} earned about ${cash(rate)} per hour.`],
        answerDisplay: `${cash(rate)} per hour`,
      };
    }
    const target = rng.int(7, 15) * 5;
    if (rng.chance(0.55)) {
      const h = rng.int(c.hLo, c.hHi);
      const exp = rng.int(c.lo * 10, c.lo * 40) / 100;
      const bid = roundTo(target * h + exp, 2);
      return {
        prompt: `${who} ${name} is bidding on a contract to ${c.task}. The job should take $${h}$ hours, and ${c.exp[0]} will cost ${cash(exp)}. ${name} wants to earn ${cashW(target)} per hour after paying for materials. What should ${name} bid for the job?`,
        parts: [cashPart(bid)],
        hints: ['The bid has to cover the materials and pay for every hour of work.', `Bid = target hourly rate × hours + expenses.`],
        solution: [`Pay for the work: $${target} \\times ${h} = ${mn(target * h)}$`, `Add the expenses: $${mn(target * h)} + ${m2(exp)} = ${m2(bid)}$`, `${name} should bid ${cash(bid)}.`],
        answerDisplay: cash(bid),
      };
    }
    const h = rng.int(c.hLo * 2, c.hHi * 2) / 2;
    const exp = rng.int(c.lo / 50, (c.lo * 3) / 50) * 10;
    const bid = target * h + exp;
    return {
      prompt: `${who} ${name} wins a contract to ${c.task} for ${cashW(bid)}. Materials will cost ${cashW(exp)}. ${name} wants to earn at least ${cashW(target)} per hour after paying for materials. What is the greatest number of hours ${name} can spend on the job?`,
      parts: [numPart(h, { suffix: 'h' })],
      hints: ['First find the money left after the materials are paid for.', 'Hours = money left ÷ target hourly rate. (This is the formula bid = rate × hours + expenses, rearranged.)'],
      solution: [
        `Start with: bid $=$ rate $\\times$ hours $+$ expenses, so hours $= \\dfrac{\\text{bid} - \\text{expenses}}{\\text{rate}}$.`,
        `Money left after materials: $${mm(bid)} - ${mn(exp)} = ${mm(bid - exp)}$`,
        `Hours: $${mm(bid - exp)} \\div ${target} = ${mn(h)}$`,
        `${name} can spend at most $${mn(h)}${H}$ on the job.`,
      ],
      answerDisplay: `$${mn(h)}${H}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.4 — Deductions and net pay
// ---------------------------------------------------------------------------

interface Ded {
  label: string;
  short: string;
  cents: number;
}

const SIMPLE_KINDS = [
  { name: 'Canada Pension Plan (CPP) contributions are', short: 'CPP', rates: [5, 6] },
  { name: 'Employment Insurance (EI) premiums are', short: 'EI', rates: [1.5, 2] },
  { name: 'income tax is', short: 'income tax', rates: [10, 15, 20] },
  { name: 'union dues are', short: 'union dues', rates: [1, 1.5, 2] },
];

/** A percent deduction rounded to the nearest cent, as integer cents. */
const pctC = (pct: number, base: number) => Math.round(roundTo((pct * base) / 100, 2) * 100);

const deductions = skill({
  id: 'm103-deductions',
  name: 'Payroll deductions',
  description: 'Calculate CPP, EI, income tax and union dues deductions from given (simplified) rates.',
  outcomes: ['N2', 'A1'],
  lessonId: 'm103-2-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const j = rng.pick(HOURLY_JOBS);
    if (d === 1) {
      const k = rng.pick(SIMPLE_KINDS);
      const r = rng.pick(k.rates);
      const g = rng.int(12, 48) * 50;
      const v = (r * g) / 100;
      return {
        prompt: `${name} works as ${j.job} and has gross pay of ${cashW(g)} for a two-week pay period. Use this simplified rate: ${k.name} ${r}% of gross pay. How much is deducted for ${k.short}?`,
        parts: [cashPart(v)],
        hints: ['A deduction is money the employer holds back from your gross pay.', `Change ${r}% to a decimal (${dec(r)}) and multiply by the gross pay.`],
        solution: [`$${fmt(r)}\\% = ${dec(r)}$`, `$${dec(r)} \\times ${mn(g)} = ${m2(v)}$`, `The ${k.short} deduction is ${cash(v)}.`],
        answerDisplay: cash(v),
      };
    }
    if (d === 2) {
      const three = rng.chance(0.55);
      const made = retry(
        () => {
          const g = rng.int(80000, 260000) / 100;
          const rc = rng.pick([5.7, 5.9, 5.95]);
          const re = rng.pick([1.58, 1.63, 1.66]);
          const rt = rng.pick([12, 14, 15, 16, 18]);
          const raw = [(rc * g) / 100, (re * g) / 100, (rt * g) / 100];
          return { g, rc, re, rt, raw };
        },
        (v) => v.raw.every((x) => !halfCent(x)),
      );
      const { g, rc, re, rt, raw } = made;
      const rows = [
        { label: `CPP: ${rc}% of gross pay`, short: 'CPP', r: rc, raw: raw[0] },
        { label: `EI: ${re}% of gross pay`, short: 'EI', r: re, raw: raw[1] },
        ...(three ? [{ label: `Income tax: ${rt}% of gross pay`, short: 'Income tax', r: rt, raw: raw[2] }] : []),
      ];
      const each = rows.map((x) => cents(x.raw));
      const totalC = each.reduce((s, x) => s + toC(x), 0);
      const total = totalC / 100;
      return {
        prompt: `${name} works as ${j.job} and earns ${cash(g)} in gross pay for a two-week pay period. Use these simplified rates:\n\n${rows.map((x) => `- ${x.label}`).join('\n')}\n\nRound each deduction to the nearest cent. What are ${poss(name)} total deductions?`,
        parts: [cashPart(total, '\\$', 0.02)],
        hints: ['Find each deduction separately: change the percent to a decimal and multiply by the gross pay.', 'Round each deduction to the nearest cent, then add them.'],
        solution: [
          ...rows.map((x) => `${x.short}: $${dec(x.r)} \\times ${m2(g)} ${toCents(x.raw)}$`),
          `Total deductions: $${each.map(m2).join(' + ')} = ${m2(total)}$`,
          `${poss(name)} total deductions are ${cash(total)}.`,
        ],
        answerDisplay: cash(total),
      };
    }
    // d3: CPP above an exemption, EI on all gross pay, income tax above a threshold.
    const made = retry(
      () => {
        const g = rng.int(120000, 320000) / 100;
        const ex = rng.pick([130, 135, 140]);
        const rc = rng.pick([5.7, 5.9, 5.95]);
        const re = rng.pick([1.58, 1.63, 1.66]);
        const rt = rng.pick([15, 18, 20]);
        const th = rng.pick([500, 550, 600, 650]);
        const raw = [(rc * (g - ex)) / 100, (re * g) / 100, (rt * (g - th)) / 100];
        return { g, ex, rc, re, rt, th, raw };
      },
      (v) => v.raw.every((x) => !halfCent(x)),
    );
    const { g, ex, rc, re, rt, th, raw } = made;
    const [cpp, ei, tax] = raw.map(cents);
    return {
      prompt: `${name} works as ${j.job} and has gross pay of ${cash(g)} for a two-week pay period. Use these simplified rules:\n\n- CPP: ${rc}% of the gross pay above ${cashW(ex)}\n- EI: ${re}% of all gross pay\n- Income tax: ${rt}% of the gross pay above ${cashW(th)}\n\nFind each deduction, to the nearest cent.`,
      parts: [cashPart(cpp, 'CPP: \\$'), cashPart(ei, 'EI: \\$'), cashPart(tax, 'Income tax: \\$')],
      hints: ['For CPP and income tax, subtract the amount that is not taxed first, then multiply by the rate.', `CPP = ${dec(rc)} × (${t2(g)} − ${ex}). Income tax = ${dec(rt)} × (${t2(g)} − ${th}). EI = ${dec(re)} × ${t2(g)}.`],
      solution: [
        `CPP: $${dec(rc)} \\times (${m2(g)} - ${ex}) = ${dec(rc)} \\times ${m2(g - ex)} ${toCents(raw[0])}$`,
        `EI: $${dec(re)} \\times ${m2(g)} ${toCents(raw[1])}$`,
        `Income tax: $${dec(rt)} \\times (${m2(g)} - ${th}) = ${dec(rt)} \\times ${m2(g - th)} ${toCents(raw[2])}$`,
        `The deductions are CPP ${cash(cpp)}, EI ${cash(ei)} and income tax ${cash(tax)}.`,
      ],
      answerDisplay: `CPP ${cash(cpp)}; EI ${cash(ei)}; income tax ${cash(tax)}`,
    };
  },
});

const netPay = skill({
  id: 'm103-net-pay',
  name: 'Net pay',
  description: 'Calculate net pay from gross pay and deductions, including from hours and rates all the way to net pay.',
  outcomes: ['N2', 'A1'],
  lessonId: 'm103-2-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const j = rng.pick(HOURLY_JOBS);
    if (d === 1) {
      const gC = rng.int(60000, 240000);
      const dC = Math.round(gC * rng.float(0.15, 0.3, 3));
      const net = (gC - dC) / 100;
      return {
        prompt: `${name} works as ${j.job}. ${poss(name)} pay stub shows gross pay of ${cash(gC / 100)} and total deductions of ${cash(dC / 100)}. What is ${poss(name)} net pay?`,
        parts: [cashPart(net)],
        hints: ['Net pay is the amount you actually take home.', 'Net pay = gross pay − total deductions.'],
        solution: ['Net pay $=$ gross pay $-$ total deductions.', `$${m2(gC / 100)} - ${m2(dC / 100)} = ${m2(net)}$`, `${poss(name)} net pay is ${cash(net)}.`],
        answerDisplay: cash(net),
      };
    }
    if (d === 2) {
      const gC = rng.int(80000, 300000);
      const ded: Ded[] = [
        { label: 'CPP', short: 'CPP', cents: pctC(rng.float(5.3, 5.95, 2), gC / 100) },
        { label: 'EI', short: 'EI', cents: pctC(rng.float(1.55, 1.66, 2), gC / 100) },
        { label: 'Income tax', short: 'income tax', cents: pctC(rng.float(9, 17, 1), gC / 100) },
      ];
      const extra = rng.pick([
        { label: 'Union dues', short: 'union dues', cents: rng.int(2500, 6500) },
        { label: 'Health benefits', short: 'health benefits', cents: rng.int(1500, 4500) },
        null,
      ]);
      if (extra) ded.push(extra);
      const totalC = ded.reduce((s, x) => s + x.cents, 0);
      const net = (gC - totalC) / 100;
      return {
        prompt: `Here is part of ${poss(name)} pay stub for a two-week pay period as ${j.job}. What is ${poss(name)} net pay?`,
        figure: { type: 'table', headers: ['Item', 'Amount'], rows: [['Gross pay', cashCell(gC / 100)], ...ded.map((x) => [x.label, cashCell(x.cents / 100)])] },
        parts: [cashPart(net)],
        hints: ['Add up all the deductions first.', 'Net pay = gross pay − total deductions.'],
        solution: [
          `Total deductions: $${ded.map((x) => m2(x.cents / 100)).join(' + ')} = ${m2(totalC / 100)}$`,
          `Net pay: $${m2(gC / 100)} - ${m2(totalC / 100)} = ${m2(net)}$`,
          `${poss(name)} net pay is ${cash(net)}.`,
        ],
        answerDisplay: cash(net),
      };
    }
    // d3: hours and rate (sometimes with overtime) to gross pay, then simplified deductions, then net pay.
    const withOt = rng.chance(0.5);
    const made = retry(
      () => {
        const r = hourlyRate(rng, j, 3);
        const hrs = withOt ? rng.int(82, 96) / 2 : rng.int(60, 80) / 2;
        const reg = Math.min(40, hrs);
        const ot = Math.max(0, hrs - 40);
        const g = reg * r + ot * 1.5 * r;
        const rc = rng.pick([5.7, 5.9, 5.95]);
        const re = rng.pick([1.58, 1.63, 1.66]);
        const rt = rng.pick([10, 12, 15]);
        const raw = [(rc * g) / 100, (re * g) / 100, (rt * g) / 100];
        return { r, hrs, reg, ot, g, rc, re, rt, raw };
      },
      (v) => isCents(v.g) && v.raw.every((x) => !halfCent(x)),
    );
    const { r, hrs, reg, ot, g, rc, re, rt, raw } = made;
    const each = raw.map(cents);
    const totalC = each.reduce((s, x) => s + toC(x), 0);
    const net = (toC(g) - totalC) / 100;
    const gSteps = withOt
      ? [`Regular pay: $40 \\times ${m2(r)} = ${m2(40 * r)}$. Overtime: $${mn(ot)} \\times (1.5 \\times ${m2(r)}) = ${mn(ot)} \\times ${m2(1.5 * r)} = ${m2(ot * 1.5 * r)}$`, `Gross pay: $${m2(40 * r)} + ${m2(ot * 1.5 * r)} = ${m2(g)}$`]
      : [`Gross pay: $${mn(reg)} \\times ${m2(r)} = ${m2(g)}$`];
    return {
      prompt: `${name} works as ${j.job} and earns ${cash(r)} per hour. Last week ${name} worked $${mn(hrs)}$ hours.${withOt ? ' Hours over $40$ in a week are paid at time-and-a-half (1.5 times the regular wage).' : ''} Use these simplified rates:\n\n- CPP: ${rc}% of gross pay\n- EI: ${re}% of gross pay\n- Income tax: ${rt}% of gross pay\n\nRound each deduction to the nearest cent. Find ${poss(name)} gross pay and net pay for the week.`,
      parts: [cashPart(g, 'Gross pay: \\$'), cashPart(net, 'Net pay: \\$', 0.03)],
      hints: [withOt ? 'Find gross pay first: 40 regular hours plus the overtime hours at 1.5 times the wage.' : 'Find gross pay first: hours × hourly wage.', 'Find each deduction (rate × gross pay), add them, and subtract the total from the gross pay.'],
      solution: [
        ...gSteps,
        `CPP: $${dec(rc)} \\times ${m2(g)} ${toCents(raw[0])}$; EI: $${dec(re)} \\times ${m2(g)} ${toCents(raw[1])}$; income tax: $${dec(rt)} \\times ${m2(g)} ${toCents(raw[2])}$`,
        `Total deductions: $${each.map(m2).join(' + ')} = ${m2(totalC / 100)}$`,
        `Net pay: $${m2(g)} - ${m2(totalC / 100)} = ${m2(net)}$`,
        `${poss(name)} gross pay is ${cash(g)} and net pay is ${cash(net)}.`,
      ],
      answerDisplay: `Gross ${cash(g)}; net ${cash(net)}`,
    };
  },
});

const FORMULAS = [
  { f: 'G = rh', solveFor: 'h', ok: '\\dfrac{G}{r}', bad: ['Gr', '\\dfrac{r}{G}', 'G - r'], meaning: 'gross pay $G$, hourly rate $r$ and hours $h$' },
  { f: 'G = rh', solveFor: 'r', ok: '\\dfrac{G}{h}', bad: ['Gh', '\\dfrac{h}{G}', 'G - h'], meaning: 'gross pay $G$, hourly rate $r$ and hours $h$' },
  { f: 'C = rS', solveFor: 'S', ok: '\\dfrac{C}{r}', bad: ['Cr', '\\dfrac{r}{C}', 'C - r'], meaning: 'commission $C$, commission rate $r$ and sales $S$' },
  { f: 'E = pn', solveFor: 'n', ok: '\\dfrac{E}{p}', bad: ['Ep', '\\dfrac{p}{E}', 'E - p'], meaning: 'piecework earnings $E$, pay per piece $p$ and number of pieces $n$' },
  { f: 'E = B + rS', solveFor: 'S', ok: '\\dfrac{E - B}{r}', bad: ['\\dfrac{E}{r} - B', '\\dfrac{E + B}{r}', 'r(E - B)'], meaning: 'total earnings $E$, base salary $B$, commission rate $r$ and sales $S$' },
];

const incomeFormula = skill({
  id: 'm103-income-formula',
  name: 'Rearranging income formulas',
  description: 'Rearrange income formulas such as G = rh and C = rS to find hours, hourly rate or sales, including with overtime.',
  outcomes: ['N2', 'A1'],
  lessonId: 'm103-2-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const j = rng.pick(HOURLY_JOBS);
    if (d === 1) {
      const mode = rng.pick(['hours', 'rate', 'rearrange'] as const);
      if (mode === 'rearrange') {
        const f = rng.pick(FORMULAS.slice(0, 4));
        return {
          prompt: `The formula $${f.f}$ relates ${f.meaning}. Which equation is the formula rearranged to solve for $${f.solveFor}$?`,
          parts: [{ answer: mc(rng, `$${f.solveFor} = ${f.ok}$`, f.bad.map((b) => `$${f.solveFor} = ${b}$`)) }],
          hints: [`You want $${f.solveFor}$ by itself on one side.`, `$${f.solveFor}$ is multiplied by the other letter, so divide both sides by that letter.`],
          solution: [`Start with $${f.f}$.`, `Divide both sides by the letter multiplying $${f.solveFor}$.`, `$${f.solveFor} = ${f.ok}$`],
          answerDisplay: `$${f.solveFor} = ${f.ok}$`,
        };
      }
      const r = hourlyRate(rng, j, 1);
      const h = rng.int(10, 45);
      const g = r * h;
      if (mode === 'hours') {
        return {
          prompt: `${name} works as ${j.job} for ${cash(r)} per hour and earned ${cash(g)} last week. Use $G = rh$ to find how many hours ${name} worked.`,
          parts: [numPart(h, { suffix: 'h' })],
          hints: ['Substitute the values you know into $G = rh$.', 'Divide both sides by $r$: $h = \\dfrac{G}{r}$.'],
          solution: [`$h = \\dfrac{G}{r}$`, `$h = \\dfrac{${m2(g)}}{${m2(r)}} = ${h}$`, `${name} worked $${h}${H}$.`],
          answerDisplay: `$${h}${H}$`,
        };
      }
      return {
        prompt: `${name} works as ${j.job} and earned ${cash(g)} for $${h}$ hours of work. Use $G = rh$ to find ${poss(name)} hourly wage.`,
        parts: [cashPart(r)],
        hints: ['Substitute the values you know into $G = rh$.', 'Divide both sides by $h$: $r = \\dfrac{G}{h}$.'],
        solution: [`$r = \\dfrac{G}{h}$`, `$r = \\dfrac{${m2(g)}}{${h}} = ${m2(r)}$`, `${poss(name)} hourly wage is ${cash(r)} per hour.`],
        answerDisplay: `${cash(r)} per hour`,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['sales', 'pieces', 'hours', 'rearrange'] as const);
      if (mode === 'rearrange') {
        const f = FORMULAS[4];
        return {
          prompt: `The formula $${f.f}$ relates ${f.meaning}. Which equation is the formula rearranged to solve for $S$?`,
          parts: [{ answer: mc(rng, `$S = ${f.ok}$`, f.bad.map((b) => `$S = ${b}$`)) }],
          hints: ['Undo the operations in reverse order: first undo the addition, then the multiplication.', 'Subtract $B$ from both sides, then divide both sides by $r$.'],
          solution: ['Start with $E = B + rS$.', 'Subtract $B$ from both sides: $E - B = rS$.', 'Divide both sides by $r$: $S = \\dfrac{E - B}{r}$'],
          answerDisplay: `$S = ${f.ok}$`,
        };
      }
      if (mode === 'sales') {
        const s = rng.pick(SALES_JOBS);
        const rc = rng.pick([2, 2.5, 3, 4, 5, 6, 8]);
        const sales = stepVal(rng, s.lo, s.hi, s.step);
        const c = (rc * sales) / 100;
        return {
          prompt: `${name} ${s.who} and earns ${rc}% commission on sales. ${name} wants to earn ${cash(c)} in commission next ${s.per}. Use $C = rS$ to find the sales ${name} needs.`,
          parts: [numPart(sales, { label: '\\$' })],
          hints: ['Write the commission rate as a decimal.', `Rearrange to $S = \\dfrac{C}{r}$ and substitute $r = ${dec(rc)}$.`],
          solution: [`$S = \\dfrac{C}{r}$`, `$S = \\dfrac{${m2(c)}}{${dec(rc)}} = ${mn(sales)}$`, `${name} needs sales of ${cashW(sales)}.`],
          answerDisplay: cashW(sales),
        };
      }
      if (mode === 'pieces') {
        const p = rng.pick(PIECE_JOBS);
        const rate = pieceRate(rng, p);
        const n = pieceCount(rng, p);
        const e = roundTo(rate * n, 2);
        return {
          prompt: `${name} works as ${p.job} and is paid ${cash(rate)} per ${p.one}. Use $E = pn$, where $E$ is earnings, $p$ is the pay per piece and $n$ is the number of pieces, to find how many ${p.many} ${name} must ${p.verb.replace(/s$/, '')} to earn ${cash(e)}.`,
          parts: [numPart(n, { suffix: p.short })],
          hints: ['You know $E$ and $p$. You want $n$.', 'Divide both sides by $p$: $n = \\dfrac{E}{p}$.'],
          solution: [`$n = \\dfrac{E}{p}$`, `$n = \\dfrac{${m2(e)}}{${m2(rate)}} = ${mn(n)}$`, `${name} must ${p.verb.replace(/s$/, '')} $${mn(n)}$ ${p.many}.`],
          answerDisplay: `$${mn(n)}$ ${p.many}`,
        };
      }
      const r = hourlyRate(rng, j, 2);
      const h = rng.int(30, 90) / 2;
      const g = roundTo(r * h, 2);
      const target = rng.pick(['a used truck', 'new work boots and tools', 'a trip to the mountains', 'college tuition', 'a welding course']);
      return {
        prompt: `${name} works as ${j.job} for ${cash(r)} per hour and is saving ${cash(g)} for ${target}. Use $G = rh$ to find how many hours ${name} must work to earn that amount.`,
        parts: [numPart(h, { suffix: 'h' })],
        hints: ['Rearrange $G = rh$ to get $h$ by itself.', '$h = \\dfrac{G}{r}$'],
        solution: [`$h = \\dfrac{G}{r}$`, `$h = \\dfrac{${m2(g)}}{${m2(r)}} = ${mn(h)}$`, `${name} must work $${mn(h)}${H}$.`],
        answerDisplay: `$${mn(h)}${H}$`,
      };
    }
    const mode = rng.pick(['otHours', 'otRate', 'baseComm'] as const);
    if (mode === 'baseComm') {
      const s = rng.pick(SALES_JOBS);
      const base = s.per === 'week' ? rng.int(12, 24) * 25 : rng.int(24, 48) * 50;
      const rc = rng.pick([2, 2.5, 3, 4, 5, 6, 8]);
      const sales = stepVal(rng, s.lo, s.hi, s.step);
      const c = (rc * sales) / 100;
      const e = base + c;
      return {
        prompt: `${name} ${s.who} and is paid ${cashW(base)} per ${s.per} plus ${rc}% commission on sales. Use $E = B + rS$ to find the sales ${name} needs to earn ${cash(e)} in one ${s.per}.`,
        parts: [numPart(sales, { label: '\\$' })],
        hints: ['First subtract the base pay $B$ from both sides.', `Then divide by the rate: $S = \\dfrac{E - B}{r}$, with $r = ${dec(rc)}$.`],
        solution: [
          `Rearrange: $E - B = rS$, so $S = \\dfrac{E - B}{r}$.`,
          `$E - B = ${m2(e)} - ${mn(base)} = ${m2(c)}$`,
          `$S = \\dfrac{${m2(c)}}{${dec(rc)}} = ${mn(sales)}$`,
          `${name} needs sales of ${cashW(sales)}.`,
        ],
        answerDisplay: cashW(sales),
      };
    }
    const T = rng.pick([40, 44]);
    const made = retry(
      () => {
        const r = hourlyRate(rng, j, 2);
        const k = rng.int(2, 24) / 2;
        return { r, k, g: T * r + 1.5 * r * k };
      },
      (v) => isCents(v.g),
    );
    const { r, k, g } = made;
    const hrs = T + k;
    const rule = `Hours over $${T}$ in a week are paid at time-and-a-half (1.5 times the regular wage).`;
    if (mode === 'otHours') {
      return {
        prompt: `${name} works as ${j.job} for ${cash(r)} per hour. ${rule} Last week ${name} earned ${cash(g)}. How many hours did ${name} work?`,
        parts: [numPart(hrs, { suffix: 'h' })],
        hints: [`Gross pay = ${T}r + 1.5r × (overtime hours). Find how much was earned in overtime first.`, `Overtime pay = ${t2(g)} − ${T} × ${t2(r)}. Divide it by the overtime rate, then add ${T}.`],
        solution: [
          `Regular pay: $${T} \\times ${m2(r)} = ${m2(T * r)}$`,
          `Overtime pay: $${m2(g)} - ${m2(T * r)} = ${m2(g - T * r)}$`,
          `Overtime rate: $1.5 \\times ${m2(r)} = ${m2(1.5 * r)}$, so overtime hours $= ${m2(g - T * r)} \\div ${m2(1.5 * r)} = ${mn(k)}$`,
          `Total hours: $${T} + ${mn(k)} = ${mn(hrs)}$`,
          `${name} worked $${mn(hrs)}${H}$ last week.`,
        ],
        answerDisplay: `$${mn(hrs)}${H}$`,
      };
    }
    const paidHours = T + 1.5 * k;
    return {
      prompt: `${name} works as ${j.job}. ${rule} Last week ${name} worked $${mn(hrs)}$ hours and earned ${cash(g)}. What is ${poss(name)} regular hourly wage?`,
      parts: [cashPart(r)],
      hints: [`Write gross pay as $G = ${T}r + 1.5r(${mn(hrs)} - ${T})$, where $r$ is the regular wage.`, 'Collect the $r$ terms into one number times $r$, then divide.'],
      solution: [
        `$G = ${T}r + 1.5r \\times ${mn(k)} = ${T}r + ${mn(1.5 * k)}r = ${mn(paidHours)}r$`,
        `$${m2(g)} = ${mn(paidHours)}r$`,
        `$r = ${m2(g)} \\div ${mn(paidHours)} = ${m2(r)}$`,
        `${poss(name)} regular wage is ${cash(r)} per hour.`,
      ],
      answerDisplay: `${cash(r)} per hour`,
    };
  },
});

export const INCOME_SKILLS: SkillDef[] = [grossHourly, overtime, salaryPeriod, commission, piecework, contractCompare, selfEmployed, deductions, netPay, incomeFormula];
