/** Math 30-3 Unit 1 — Limits of Measurement (M1): precision, accuracy, uncertainty and tolerance. */
import { fixedChoice, mc, multi, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, RulerFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj', 'Chloé', 'Tariq',
  'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Kai', 'Zainab', 'Mason',
  'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];

/** A quantity inside maths: 12.50\ \text{mm}, 37.5^\circ, 190^\circ\text{C}, 470\ \Omega. A string keeps its trailing zeros. */
function qty(x: number | string, u: string): string {
  const s = typeof x === 'number' ? fmt(x) : x;
  if (u === '°') return `${s}^\\circ`;
  if (u === '°C') return `${s}^\\circ\\text{C}`;
  if (u === 'Ω') return `${s}\\ \\Omega`;
  if (u === '%') return `${s}\\%`;
  if (u === 'in') return `${s}\\ \\text{in}`;
  return `${s}\\ \\text{${u}}`;
}
/** Inline maths for a quantity. */
const Q = (x: number | string, u: string) => `$${qty(x, u)}$`;
/** Inline maths for a ± amount: $\pm 0.05\ \text{mm}$. */
const PM = (x: number | string, u: string) => `$\\pm ${qty(x, u)}$`;
/** A value with exactly dp decimals. */
const fx = (x: number, dp: number) => fmtFixed(x, dp);
const clean = (x: number) => roundTo(x, 6);

/** An inch value as a LaTeX mixed number: 92\tfrac{5}{8}. */
function inchTex(x: number): string {
  const f = toFrac(x, 64);
  if (!f || f.d === 1) return fmt(x);
  const w = Math.floor(x + 1e-9);
  const n = f.n - w * f.d;
  return w ? `${w}\\tfrac{${n}}{${f.d}}` : `\\tfrac{${n}}{${f.d}}`;
}
/** Inline maths for inches. */
const IN = (x: number) => `$${inchTex(x)}\\ \\text{in}$`;
/** A number in the unit's style: mixed numbers for inches. */
const val = (x: number, u: string, dp?: number) => (u === 'in' ? inchTex(x) : dp === undefined ? fmt(x) : fx(x, dp));
/** Inline maths for a value in the unit's style. */
const V = (x: number, u: string, dp?: number) => (u === 'in' ? IN(x) : Q(val(x, u, dp), u));

const placeWord = (dp: number) => ['ones', 'tenths', 'hundredths', 'thousandths'][dp];

/** An exact answer with the unit after the box. Inches show as mixed numbers. */
const exactPart = (x: number, u: string, label?: string): Part => numPart(clean(x), { suffix: u, label, ...(u === 'in' ? { display: 'fraction' as const } : {}) });

// ---------------------------------------------------------------------------
// Lesson 1.1 — Precision and accuracy
// ---------------------------------------------------------------------------

interface Reading {
  what: string;
  u: string;
  lo: number;
  hi: number;
  dps: number[];
  tool: string;
}
const READINGS: Reading[] = [
  { what: 'the length of a steel bolt', u: 'mm', lo: 20, hi: 150, dps: [0, 1, 2], tool: 'a digital caliper' },
  { what: 'the thickness of a brake rotor', u: 'mm', lo: 18, hi: 32, dps: [2], tool: 'a micrometer' },
  { what: 'the width of a door opening', u: 'cm', lo: 76, hi: 96, dps: [0, 1], tool: 'a tape measure' },
  { what: 'the length of a run of copper pipe', u: 'm', lo: 2, hi: 18, dps: [1, 2, 3], tool: 'a tape measure' },
  { what: 'the mass of a sack of canola seed', u: 'kg', lo: 18, hi: 26, dps: [1, 2], tool: 'a platform scale' },
  { what: 'the mass of yeast for a batch of bread', u: 'g', lo: 6, hi: 40, dps: [1, 2], tool: 'a digital scale' },
  { what: 'the volume of oil drained from a truck engine', u: 'L', lo: 4, hi: 14, dps: [1, 2], tool: 'a measuring jug' },
  { what: 'the diameter of a drill bit', u: 'mm', lo: 3, hi: 13, dps: [1, 2], tool: 'a caliper' },
  { what: 'the length of a deck joist', u: 'm', lo: 2, hi: 6, dps: [2, 3], tool: 'a tape measure' },
  { what: 'the temperature of a proofing oven', u: '°C', lo: 26, hi: 40, dps: [0, 1], tool: 'a probe thermometer' },
];

/** A reading with dp decimals; `zeroEnd` forces a final zero after the decimal point (12.50). */
function makeReading(rng: Rng, r: Reading, dp: number, zeroEnd: boolean): number {
  const f = 10 ** dp;
  return retry(
    () => rng.int(r.lo * f, r.hi * f),
    (n) => (zeroEnd ? n % 10 === 0 && n % 100 !== 0 : n % 10 !== 0),
    200,
  ) / f;
}

/** State the precision (place value of the last digit) of a recorded measurement. */
function precisionOfReading(rng: Rng, d: 1 | 2): GenOutput {
  const who = rng.pick(NAMES);
  if (rng.chance(0.25)) {
    // Imperial: the denominator shows the precision.
    const den = d === 1 ? rng.pick([8, 16]) : rng.pick([4, 8, 16, 16]);
    const num = retry(() => rng.int(1, den - 1), (n) => n % 2 === 1);
    const whole = rng.int(14, 95);
    const x = whole + num / den;
    const thing = rng.pick(['a 2 × 4 stud', 'a length of baseboard', 'a shelf board', 'a sheet of drywall', 'a piece of crown moulding']);
    return {
      prompt: `${who} measures ${thing} with a tape measure and records ${IN(x)}. What is the precision of this measurement?`,
      parts: [numPart(1 / den, { suffix: 'in', label: 'Precision:' })],
      hints: [
        'In imperial units, the fraction shows how finely the measurement was read.',
        `The measurement is written in ${den === 4 ? 'quarters' : den === 8 ? 'eighths' : 'sixteenths'} of an inch, and the fraction is in lowest terms.`,
      ],
      solution: [
        `The fraction part is $\\tfrac{${num}}{${den}}$, which is in lowest terms, so the measurement was read to the nearest $\\tfrac{1}{${den}}$ of an inch.`,
        `The precision is $\\tfrac{1}{${den}}\\ \\text{in}$.`,
      ],
    };
  }
  const r = rng.pick(READINGS.filter((x) => d === 1 || x.dps.some((p) => p > 0)));
  const dp = d === 2 ? rng.pick(r.dps.filter((p) => p > 0)) : rng.pick(r.dps);
  const zeroEnd = d === 2 && rng.chance(0.6);
  const x = makeReading(rng, r, dp, zeroEnd);
  const shown = fx(x, dp);
  const p = 10 ** -dp;
  return {
    prompt: `${who} uses ${r.tool} and records ${r.what} as ${Q(shown, r.u)}. What is the precision of this measurement?`,
    parts: [numPart(p, { suffix: r.u, label: 'Precision:' })],
    hints: [
      'The precision of a measurement is the place value of its last recorded digit.',
      zeroEnd
        ? 'A zero at the end of a decimal counts. The worker wrote it because the instrument showed it.'
        : `Find the place of the last digit in $${shown}$.`,
    ],
    solution: [
      dp === 0
        ? `The last digit of $${shown}$ is in the ones place.`
        : `The last digit of $${shown}$ is ${zeroEnd ? 'the final $0$, which is ' : ''}in the ${placeWord(dp)} place.${zeroEnd ? ' A recorded zero shows that the instrument measured that place.' : ''}`,
      `The precision is ${Q(fmt(p), r.u)}.`,
    ],
  };
}

/** What is the precision of this ruler (figure)? */
function rulerPrecision(rng: Rng): GenOutput {
  const kind = rng.pick(['metric', 'eighths', 'sixteenths'] as const);
  let fig: RulerFigure;
  let correct: string;
  let wrong: string[];
  let why: string;
  if (kind === 'metric') {
    const start = rng.int(0, 2);
    const len = rng.int(32, 78) / 10;
    fig = { type: 'ruler', system: 'metric', length: 10, start, end: roundTo(start + len, 1) };
    correct = '$1\\ \\text{mm}$';
    wrong = ['$1\\ \\text{cm}$', '$0.1\\ \\text{mm}$', '$0.5\\ \\text{mm}$'];
    why = 'There are $10$ small spaces between each pair of numbered centimetre marks, so each space is $1\\ \\text{mm}$.';
  } else {
    const div = kind === 'eighths' ? 8 : 16;
    const start = rng.int(0, 1);
    const len = rng.int(2 * div, 4 * div) / div;
    fig = { type: 'ruler', system: 'imperial', length: 6, start, end: start + len, division: div };
    correct = `$\\tfrac{1}{${div}}\\ \\text{in}$`;
    wrong = div === 8 ? ['$\\tfrac{1}{16}\\ \\text{in}$', '$\\tfrac{1}{4}\\ \\text{in}$', '$1\\ \\text{in}$'] : ['$\\tfrac{1}{8}\\ \\text{in}$', '$\\tfrac{1}{32}\\ \\text{in}$', '$1\\ \\text{in}$'];
    why = `Count the spaces between two numbered inch marks: there are $${div}$, so each space is $\\tfrac{1}{${div}}$ of an inch.`;
  }
  return {
    prompt: 'What is the precision of this ruler (the smallest unit it can measure)?',
    figure: fig,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['The precision of an instrument is the smallest division marked on it.', 'Count the small spaces between two numbered marks.'],
    solution: [why, `The precision of the ruler is ${correct}.`],
  };
}

const TEN_UNITS = ['mm', 'cm', 'm', 'kg', 'g', 'L'];

/** Choose the most (or least) precise of three measurements. */
function morePrecise(rng: Rng, d: 1 | 2): GenOutput {
  const most = rng.chance(0.7);
  const word = most ? 'most' : 'least';
  if (d === 1) {
    // Three different measurements in the same unit with different numbers of decimals.
    const u = rng.pick(TEN_UNITS);
    const dps = rng.shuffle([0, 1, 2]);
    const xs = dps.map((dp) => {
      const f = 10 ** dp;
      return retry(() => rng.int(2 * f, 60 * f), (n) => n % 10 !== 0) / f;
    });
    const shown = xs.map((x, i) => Q(fx(x, dps[i]), u));
    const target = dps.indexOf(most ? 2 : 0);
    const big = xs.indexOf(Math.max(...xs));
    return {
      prompt: `Which measurement is the **${word}** precise?`,
      parts: [{ answer: mc(rng, shown[target], shown.filter((_, i) => i !== target)) }],
      hints: ['Precision depends on the smallest unit recorded, not on the size of the number.', 'Look at the place value of the last digit of each measurement.'],
      solution: [
        ...dps.map((dp, i) => `${shown[i]} is recorded to the nearest ${Q(fmt(10 ** -dp), u)}.`),
        `The ${word} precise measurement is the one with the ${most ? 'smallest' : 'largest'} unit: ${shown[target]}.${big !== target && most ? ' A larger number is not more precise.' : ''}`,
      ],
    };
  }
  // The same length in mm, cm and m: compare the smallest units in millimetres.
  const OPTS = [
    { u: 'm', dp: 1, p: 100 },
    { u: 'm', dp: 2, p: 10 },
    { u: 'cm', dp: 0, p: 10 },
    { u: 'mm', dp: 0, p: 1 },
    { u: 'cm', dp: 1, p: 1 },
    { u: 'm', dp: 3, p: 1 },
    { u: 'mm', dp: 1, p: 0.1 },
    { u: 'cm', dp: 2, p: 0.1 },
  ];
  const chosen = retry(
    () => rng.sample(OPTS, 3),
    (cs) => new Set(cs.map((c) => c.p)).size === 3,
    200,
  );
  const L = rng.int(1200, 4800) + rng.int(1, 9) / 10; // mm
  const thing = rng.pick(['a sheet of plywood', 'a steel beam', 'a piece of PVC pipe', 'a countertop', 'a fence rail', 'a trailer deck']);
  const toU = (c: { u: string }) => (c.u === 'm' ? L / 1000 : c.u === 'cm' ? L / 10 : L);
  const shown = chosen.map((c) => Q(fx(toU(c), c.dp), c.u));
  const ps = chosen.map((c) => c.p);
  const target = ps.indexOf(most ? Math.min(...ps) : Math.max(...ps));
  const mmWord = (p: number) => (p === 1 ? '1\\ \\text{mm}' : `${fmt(p)}\\ \\text{mm}`);
  return {
    prompt: `Three workers measure the length of ${thing}. Which of their measurements is the **${word}** precise?`,
    parts: [{ answer: mc(rng, shown[target], shown.filter((_, i) => i !== target)) }],
    hints: [
      'Find the smallest unit of each measurement (the place value of its last digit).',
      'Change each smallest unit to millimetres so you can compare them: $1\\ \\text{cm} = 10\\ \\text{mm}$ and $1\\ \\text{m} = 1000\\ \\text{mm}$.',
    ],
    solution: [
      ...chosen.map((c, i) => `${shown[i]} is recorded to the nearest ${Q(fmt(10 ** -c.dp), c.u)}, which is $${mmWord(c.p)}$.`),
      `The ${word} precise measurement has the ${most ? 'smallest' : 'largest'} unit: ${shown[target]}.`,
    ],
  };
}

interface Tool {
  name: string;
  dp: number;
}
interface Standard {
  thing: string;
  prop: string;
  u: string;
  lo: number;
  hi: number;
  tools: Tool[];
  who: string;
}
const STANDARDS: Standard[] = [
  {
    thing: 'a gauge block',
    prop: 'length',
    u: 'mm',
    lo: 20,
    hi: 80,
    who: 'machinist',
    tools: [
      { name: 'micrometer', dp: 3 },
      { name: 'digital caliper', dp: 2 },
      { name: 'vernier caliper', dp: 1 },
      { name: 'steel ruler', dp: 0 },
    ],
  },
  {
    thing: 'a test mass',
    prop: 'mass',
    u: 'g',
    lo: 200,
    hi: 900,
    who: 'baker',
    tools: [
      { name: 'jeweller’s scale', dp: 2 },
      { name: 'digital scale', dp: 1 },
      { name: 'kitchen scale', dp: 0 },
    ],
  },
  {
    thing: 'a reference bath of water',
    prop: 'temperature',
    u: '°C',
    lo: 20,
    hi: 70,
    who: 'lab technician',
    tools: [
      { name: 'digital thermometer', dp: 2 },
      { name: 'probe thermometer', dp: 1 },
      { name: 'dial thermometer', dp: 0 },
    ],
  },
  {
    thing: 'a calibrated tank',
    prop: 'volume',
    u: 'L',
    lo: 20,
    hi: 90,
    who: 'pipe fitter',
    tools: [
      { name: 'digital flow meter', dp: 2 },
      { name: 'mechanical flow meter', dp: 1 },
      { name: 'sight gauge', dp: 0 },
    ],
  },
];

/** Two tools, one finer than the other, measure a standard with a known true value. */
function twoTools(rng: Rng, fineWorse: boolean) {
  const st = rng.pick(STANDARDS);
  const [i, j] = retry(
    () => rng.sample([...st.tools.keys()], 2).sort((a, b) => a - b),
    ([a, b]) => st.tools[a].dp - st.tools[b].dp <= 2,
  );
  const fine = st.tools[i];
  const coarse = st.tools[j];
  const pf = 10 ** -fine.dp;
  const pc = 10 ** -coarse.dp;
  const ratio = Math.round(pc / pf);
  // The true value is close to a multiple of the coarse unit, so the coarse tool can read it well.
  const base = rng.int(st.lo * 10 ** coarse.dp, st.hi * 10 ** coarse.dp) * pc;
  const maxD = Math.max(1, Math.round(0.2 * ratio));
  const delta = rng.int(-maxD, maxD);
  const T = roundTo(base + delta * pf, fine.dp);
  let rc: number;
  let kf: number;
  if (fineWorse) {
    rc = roundTo(base, coarse.dp);
    kf = rng.int(Math.abs(delta) + 1, Math.max(Math.abs(delta) + 1, Math.round(0.6 * ratio))) * rng.sign();
  } else {
    rc = roundTo(base + rng.sign() * pc, coarse.dp);
    kf = rng.int(1, Math.max(1, Math.min(5, Math.round(0.3 * ratio)))) * rng.sign();
  }
  const rf = roundTo(T + kf * pf, fine.dp);
  return { st, fine, coarse, T, rc, rf, ec: clean(Math.abs(rc - T)), ef: clean(Math.abs(rf - T)) };
}

/** Which of two tools is more accurate, given the true value? */
function moreAccurate(rng: Rng): GenOutput {
  const fineWorse = rng.chance(0.7);
  const t = twoTools(rng, fineWorse);
  const { st, fine, coarse, T, rc, rf, ec, ef } = t;
  const who = rng.pick(NAMES);
  const tdp = fine.dp;
  const better = ef < ec ? fine : coarse;
  const worse = better === fine ? coarse : fine;
  const err = (tl: Tool) => (tl === fine ? ef : ec);
  const E = (e: number) => Q(fmt(e), st.u);
  const correct = `The ${better.name}: its reading is off by ${E(err(better))}.`;
  const wrong = [
    `The ${worse.name}: its reading is off by ${E(err(worse))}.`,
    ...(fineWorse ? [`The ${fine.name}: it shows more decimal places, so it is more accurate.`] : [`The ${coarse.name}: a simpler instrument is always more accurate.`]),
    'They are equally accurate, because they measure the same object.',
  ];
  return {
    prompt: `A ${st.who} named ${who} checks two instruments using ${st.thing} whose true ${st.prop} is ${Q(fx(T, tdp), st.u)}. The ${fine.name} reads ${Q(fx(rf, fine.dp), st.u)} and the ${coarse.name} reads ${Q(fx(rc, coarse.dp), st.u)}. Which instrument is more accurate?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['Accuracy is how close a measurement is to the true value.', 'Subtract to find how far each reading is from the true value. The smaller difference is more accurate.'],
    solution: [
      `${cap(fine.name)}: $|${fx(rf, fine.dp)} - ${fx(T, tdp)}| = ${fmt(ef)}$`,
      `${cap(coarse.name)}: $|${fx(rc, coarse.dp)} - ${fx(T, tdp)}| = ${fmt(ec)}$`,
      fineWorse ? `The ${fine.name} is more **precise** (it reads to more decimal places), but its reading is farther from the true value.` : `The ${fine.name} is both more precise and closer to the true value.`,
      `The ${better.name} is more accurate, because its reading is closer to the true value.`,
    ],
  };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Precise vs accurate: which statement about two tools is true? */
function toolsCompare(rng: Rng): GenOutput {
  const fineWorse = rng.chance(0.65);
  const t = twoTools(rng, fineWorse);
  const { st, fine, coarse, T, rc, rf, ec, ef } = t;
  const tdp = fine.dp;
  const [A, B] = rng.shuffle([fine, coarse]);
  const reading = (tl: Tool) => (tl === fine ? `${fx(rf, fine.dp)}` : `${fx(rc, coarse.dp)}`);
  const stmt = (precise: Tool, accurate: Tool) =>
    precise === accurate ? `The ${precise.name} is both more precise and more accurate.` : `The ${precise.name} is more precise, but the ${accurate.name} is more accurate.`;
  const better = ef < ec ? fine : coarse;
  const other = (tl: Tool) => (tl === fine ? coarse : fine);
  const correct = stmt(fine, better);
  const wrong = [stmt(coarse, other(better)), stmt(fine, other(better)), stmt(coarse, better)];
  return {
    prompt: `The true ${st.prop} of ${st.thing} is ${Q(fx(T, tdp), st.u)}. The ${A.name} measures it as ${Q(reading(A), st.u)} and the ${B.name} measures it as ${Q(reading(B), st.u)}. Which statement is true?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: [
      '**Precision** depends on the smallest unit an instrument reads. **Accuracy** is how close a reading is to the true value.',
      'Compare the decimal places for precision. Subtract each reading from the true value for accuracy.',
    ],
    solution: [
      `Precision: the ${fine.name} reads to ${Q(fmt(10 ** -fine.dp), st.u)} and the ${coarse.name} reads to ${Q(fmt(10 ** -coarse.dp), st.u)}, so the ${fine.name} is more precise.`,
      `Accuracy: the ${fine.name} is off by ${Q(fmt(ef), st.u)} and the ${coarse.name} is off by ${Q(fmt(ec), st.u)}, so the ${better.name} is more accurate.`,
      `${correct}`,
    ],
  };
}

/** Which instrument has enough precision for the job? */
const JOBS = [
  {
    task: (x: string) => `A machinist must check that a shaft is ${x} in diameter.`,
    u: 'mm',
    dp: 2,
    lo: 12,
    hi: 60,
    good: 'a digital caliper that reads to $0.01\\ \\text{mm}$',
    bad: ['a vernier caliper that reads to $0.1\\ \\text{mm}$', 'a steel ruler marked in millimetres', 'a tape measure marked in millimetres'],
  },
  {
    task: (x: string) => `A baker must weigh ${x} of yeast for a large batch of dough.`,
    u: 'g',
    dp: 1,
    lo: 8,
    hi: 40,
    good: 'a digital scale that reads to $0.1\\ \\text{g}$',
    bad: ['a kitchen scale that reads to $1\\ \\text{g}$', 'a platform scale that reads to $0.1\\ \\text{kg}$', 'a measuring cup marked every $25\\ \\text{mL}$'],
  },
  {
    task: (x: string) => `A mechanic must check that a brake rotor is still at least ${x} thick.`,
    u: 'mm',
    dp: 2,
    lo: 18,
    hi: 30,
    good: 'a micrometer that reads to $0.01\\ \\text{mm}$',
    bad: ['a vernier caliper that reads to $0.1\\ \\text{mm}$', 'a steel ruler marked in millimetres', 'a tape measure marked in millimetres'],
  },
  {
    task: (x: string) => `A cabinet maker must cut a shelf ${x} long.`,
    u: 'cm',
    dp: 1,
    lo: 40,
    hi: 95,
    good: 'a tape measure marked in millimetres',
    bad: ['a tape measure marked only in centimetres', 'a metre stick marked every $5\\ \\text{cm}$', 'a measuring wheel that reads to $0.1\\ \\text{m}$'],
  },
  {
    task: (x: string) => `A lab technician at a gas plant must measure ${x} of a liquid sample.`,
    u: 'mL',
    dp: 1,
    lo: 12,
    hi: 45,
    good: 'a graduated pipette marked every $0.1\\ \\text{mL}$',
    bad: ['a graduated cylinder marked every $1\\ \\text{mL}$', 'a beaker marked every $10\\ \\text{mL}$', 'a measuring jug marked every $50\\ \\text{mL}$'],
  },
];

function chooseInstrument(rng: Rng): GenOutput {
  const j = rng.pick(JOBS);
  const f = 10 ** j.dp;
  const x = retry(() => rng.int(j.lo * f, j.hi * f), (n) => n % 10 !== 0) / f;
  const shown = Q(fx(x, j.dp), j.u);
  return {
    prompt: `${j.task(shown)} Which instrument is precise enough for the job?`,
    parts: [{ answer: mc(rng, cap(j.good), j.bad.map(cap)) }],
    hints: [`The measurement ${shown} is given to the nearest ${Q(fmt(10 ** -j.dp), j.u)}.`, 'The instrument must be able to read units at least that small.'],
    solution: [
      `${shown} has its last digit in the ${placeWord(j.dp)} place, so the instrument must read to ${Q(fmt(10 ** -j.dp), j.u)} or better.`,
      'The other instruments have larger smallest units, so they cannot show that digit.',
      `Use ${j.good}.`,
    ],
  };
}

/** Percent error = |measured − true| ÷ true × 100%. */
const PCT = [
  { what: 'A flow meter at a compressor station is tested with exactly', u: 'L', lo: 200, hi: 900, dp: 1, read: 'It reads' },
  { what: 'A grain-truck scale is tested with a load of exactly', u: 'kg', lo: 2000, hi: 9000, dp: 0, read: 'The scale shows' },
  { what: 'A fuel pump is tested by filling a certified can with exactly', u: 'L', lo: 18, hi: 25, dp: 2, read: 'The pump display shows' },
  { what: 'A laser distance meter is checked against a surveyed distance of exactly', u: 'm', lo: 20, hi: 95, dp: 2, read: 'The meter reads' },
  { what: 'An oven thermometer is checked in an oven held at exactly', u: '°C', lo: 160, hi: 230, dp: 0, read: 'The thermometer shows' },
];

function percentError(rng: Rng): GenOutput {
  const c = rng.pick(PCT);
  const r = retry(
    () => {
      const T = rng.int(c.lo, c.hi);
      const k = rng.int(5, 60) * rng.sign();
      const m = roundTo(T + (k * T) / (1000 * 10 ** 0), c.dp);
      const pe = (Math.abs(m - T) / T) * 100;
      return { T, m, pe };
    },
    (x) => x.m !== x.T && x.pe >= 0.3 && x.pe <= 6 && Math.abs(x.pe * 10 - Math.floor(x.pe * 10) - 0.5) > 0.08,
    300,
  );
  const { T, m, pe } = r;
  const diff = clean(Math.abs(m - T));
  return {
    prompt: `${c.what} ${Q(fmt(T), c.u)}. ${c.read} ${Q(fx(m, c.dp), c.u)}. The **percent error** of a reading is $\\dfrac{|\\text{measured} - \\text{true}|}{\\text{true}} \\times 100\\%$. What is the percent error, to the nearest tenth of a percent?`,
    parts: [numPart(pe, { decimals: 1, suffix: '%' })],
    hints: ['First find how far the reading is from the true value.', 'Divide that difference by the true value, then multiply by $100\\%$.'],
    solution: [
      `Difference: $|${fx(m, c.dp)} - ${fmt(T)}| = ${fmt(diff)}$`,
      `$\\dfrac{${fmt(diff)}}{${fmt(T)}} \\times 100\\% \\approx ${fx(pe, 3)}\\%$`,
      `The percent error is about $${fx(pe, 1)}\\%$.`,
    ],
  };
}

/** Which of two measurements is more accurate relative to its size? */
const REL_PAIRS = [
  { shop: 'a fabrication shop', small: 'bracket', big: 'steel beam' },
  { shop: 'a machine shop', small: 'bolt', big: 'drive shaft' },
  { shop: 'a cabinet shop', small: 'drawer pull', big: 'countertop' },
  { shop: 'a pipe shop', small: 'pipe coupling', big: 'pipe spool' },
  { shop: 'a truss plant', small: 'gusset plate', big: 'roof truss' },
];

function relativeAccuracy(rng: Rng): GenOutput {
  const r = retry(
    () => {
      const small = rng.int(15, 60); // mm
      const big = rng.int(8, 40) * 100; // mm
      const es = rng.int(2, 9) / 10; // smaller absolute error on the small part
      const eb = rng.int(2, 12); // larger absolute error on the big part
      return { small, big, es, eb, ps: (es / small) * 100, pb: (eb / big) * 100 };
    },
    (x) => x.eb > x.es && x.pb < x.ps / 2,
    300,
  );
  const who = rng.pick(NAMES);
  const o = rng.pick(REL_PAIRS);
  const ms = clean(r.small + (rng.chance(0.5) ? r.es : -r.es));
  const mb = r.big + (rng.chance(0.5) ? r.eb : -r.eb);
  const sSent = `A ${o.small} that is truly $${r.small}\\ \\text{mm}$ long is measured as $${fx(ms, 1)}\\ \\text{mm}$.`;
  const bSent = `A ${o.big} that is truly $${r.big}\\ \\text{mm}$ long is measured as $${mb}\\ \\text{mm}$.`;
  const correct = `The ${o.big}: its error is a smaller percent of its true length.`;
  const wrong = [
    `The ${o.small}: its error is fewer millimetres.`,
    `The ${o.small}: its error is a smaller percent of its true length.`,
    'They are equally accurate, because both are measured to the nearest millimetre or better.',
  ];
  return {
    prompt: `${who} works in ${o.shop}. ${rng.chance(0.5) ? `${sSent} ${bSent}` : `${bSent} ${sSent}`} Using percent error, $\\dfrac{|\\text{measured} - \\text{true}|}{\\text{true}} \\times 100\\%$, which measurement is more accurate compared with the size of the object?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['Find each error in millimetres first.', 'Then divide each error by its true length and multiply by $100\\%$. The smaller percent is more accurate for its size.'],
    solution: [
      `${cap(o.small)}: error $= ${fmt(r.es)}\\ \\text{mm}$, percent error $= \\dfrac{${fmt(r.es)}}{${r.small}} \\times 100\\% \\approx ${fx(r.ps, 2)}\\%$`,
      `${cap(o.big)}: error $= ${r.eb}\\ \\text{mm}$, percent error $= \\dfrac{${r.eb}}{${r.big}} \\times 100\\% \\approx ${fx(r.pb, 2)}\\%$`,
      `The ${o.big} is off by more millimetres, but that error is a much smaller part of its length.`,
      correct,
    ],
  };
}

const precisionAccuracy = skill({
  id: 'm303-precision-accuracy',
  name: 'Precision and accuracy',
  description: 'State the precision of an instrument or measurement, choose the more precise measurement, and decide which instrument is more accurate from a true value.',
  outcomes: ['M1'],
  lessonId: 'm303-1-1',
  format: 'free',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick(['reading', 'reading', 'ruler', 'compare'] as const);
      if (k === 'ruler') return rulerPrecision(rng);
      return k === 'compare' ? morePrecise(rng, 1) : precisionOfReading(rng, 1);
    }
    if (d === 2) {
      const k = rng.pick(['reading', 'compare', 'accurate', 'accurate', 'instrument'] as const);
      if (k === 'reading') return precisionOfReading(rng, 2);
      if (k === 'compare') return morePrecise(rng, 2);
      return k === 'accurate' ? moreAccurate(rng) : chooseInstrument(rng);
    }
    const k = rng.pick(['both', 'both', 'percent', 'relative'] as const);
    if (k === 'both') return toolsCompare(rng);
    return k === 'percent' ? percentError(rng) : relativeAccuracy(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.2 — Uncertainty and tolerance
// ---------------------------------------------------------------------------

/** Uncertainty: ± half the smallest unit; the least and greatest possible true value. */
function uncertaintyRange(rng: Rng, d: 1 | 2): GenOutput {
  const who = rng.pick(NAMES);
  if (rng.chance(0.3)) {
    const den = rng.pick([8, 16]);
    const num = retry(() => rng.int(1, den - 1), (n) => n % 2 === 1);
    const x = rng.int(12, 80) + num / den;
    const half = 1 / (2 * den);
    const thing = rng.pick(['a cut 2 × 6 board', 'a cabinet door', 'a length of trim', 'a stair tread']);
    return {
      prompt: `${who} measures ${thing} with a tape measure marked in ${den === 8 ? 'eighths' : 'sixteenths'} of an inch and records ${IN(x)}. The uncertainty is $\\pm$ half the smallest unit. What are the least and greatest possible actual lengths?`,
      parts: [exactPart(x - half, 'in', 'Least:'), exactPart(x + half, 'in', 'Greatest:')],
      hints: [`The smallest unit is $\\tfrac{1}{${den}}\\ \\text{in}$, so the uncertainty is half of that.`, `$\\tfrac{1}{2} \\times \\tfrac{1}{${den}} = \\tfrac{1}{${2 * den}}$. Subtract it for the least length and add it for the greatest.`],
      solution: [
        `Uncertainty: $\\pm\\tfrac{1}{2} \\times \\tfrac{1}{${den}}\\ \\text{in} = \\pm\\tfrac{1}{${2 * den}}\\ \\text{in}$`,
        `Write the measurement in ${den === 8 ? 'sixteenths' : 'thirty-seconds'}: ${IN(x)} $= ${Math.floor(x)}\\tfrac{${2 * num}}{${2 * den}}\\ \\text{in}$.`,
        `Least: $${Math.floor(x)}\\tfrac{${2 * num}}{${2 * den}} - \\tfrac{1}{${2 * den}} = ${inchTex(x - half)}\\ \\text{in}$`,
        `Greatest: $${Math.floor(x)}\\tfrac{${2 * num}}{${2 * den}} + \\tfrac{1}{${2 * den}} = ${inchTex(x + half)}\\ \\text{in}$`,
        `The actual length is between ${IN(x - half)} and ${IN(x + half)}.`,
      ],
    };
  }
  const r = rng.pick(d === 1 ? READINGS.filter((x) => x.dps.some((p) => p <= 1)) : READINGS);
  const dp = d === 1 ? rng.pick(r.dps.filter((p) => p <= 1)) : rng.pick(r.dps);
  const x = makeReading(rng, r, dp, false);
  const p = 10 ** -dp;
  const half = p / 2;
  const ask = d === 1 ? 'uncertainty' : 'range';
  if (ask === 'uncertainty') {
    return {
      prompt: `${who} uses ${r.tool} that reads to the nearest ${Q(fmt(p), r.u)} and records ${r.what} as ${Q(fx(x, dp), r.u)}. The uncertainty of a measurement is $\\pm$ half the smallest unit. (a) What is the uncertainty? (b) What is the greatest possible actual value?`,
      parts: [exactPart(half, r.u, '(a) $\\pm$'), exactPart(x + half, r.u, '(b) Greatest:')],
      hints: [`The smallest unit is ${Q(fmt(p), r.u)}.`, `Half of ${Q(fmt(p), r.u)} is the uncertainty. Add it to the measurement for the greatest possible value.`],
      solution: [
        `Uncertainty: $\\pm\\tfrac{1}{2} \\times ${fmt(p)} = \\pm${fmt(half)}$, so the uncertainty is ${PM(fmt(half), r.u)}.`,
        `Greatest: $${fx(x, dp)} + ${fmt(half)} = ${fmt(x + half)}$`,
        `(a) ${PM(fmt(half), r.u)}; (b) ${Q(fmt(x + half), r.u)}`,
      ],
    };
  }
  return {
    prompt: `${who} records ${r.what} as ${Q(fx(x, dp), r.u)}, using ${r.tool} that reads to the nearest ${Q(fmt(p), r.u)}. The uncertainty is $\\pm$ half the smallest unit. Between what least and greatest values is the actual measurement?`,
    parts: [exactPart(x - half, r.u, 'Least:'), exactPart(x + half, r.u, 'Greatest:')],
    hints: [`The uncertainty is half of ${Q(fmt(p), r.u)}.`, 'Subtract the uncertainty for the least value and add it for the greatest value.'],
    solution: [
      `Uncertainty: $\\pm\\tfrac{1}{2} \\times ${fmt(p)} = \\pm${fmt(half)}$`,
      `Least: $${fx(x, dp)} - ${fmt(half)} = ${fmt(x - half)}$`,
      `Greatest: $${fx(x, dp)} + ${fmt(half)} = ${fmt(x + half)}$`,
      `The actual value is between ${Q(fmt(x - half), r.u)} and ${Q(fmt(x + half), r.u)}.`,
    ],
  };
}

interface TolCtx {
  story: (who: string, nom: string, tol: string) => string;
  u: string;
  /** Nominal value: [lo, hi, decimals]. */
  nom: [number, number, number];
  /** Possible tolerances. */
  tols: number[];
  ask: string;
  /** What is measured, for prompts without the story. */
  what: string;
  /** Nominal values are multiples of this (overrides the decimals rule). */
  mult?: number;
  /** "One shaft measures", "${who} measures five shafts". */
  one: string;
  five: string;
}
const TOL: TolCtx[] = [
  {
    story: (w, n, t) => `${w} is machining a steel shaft. The drawing gives its diameter as ${n} $\\pm$ ${t}.`,
    u: 'mm',
    nom: [12, 60, 2],
    tols: [0.02, 0.03, 0.05, 0.08, 0.1],
    ask: 'diameters',
    what: 'the diameter of a machined shaft',
    one: 'One shaft measures',
    five: 'measures five shafts',
  },
  {
    story: (w, n, t) => `${w} is cutting stair stringers. Each one must be ${n} long, with a tolerance of $\\pm$ ${t}.`,
    u: 'in',
    nom: [36, 96, -8],
    tols: [1 / 16, 1 / 8],
    ask: 'lengths',
    what: 'the length of a stair stringer',
    one: 'One stringer measures',
    five: 'measures five stringers',
  },
  {
    story: (w, n, t) => `${w} is a pipe fitter. A spool of pipe must be ${n} long, $\\pm$ ${t}.`,
    u: 'mm',
    nom: [600, 3200, 0],
    tols: [1, 2, 3, 5],
    ask: 'lengths',
    what: 'the length of a pipe spool',
    one: 'One spool measures',
    five: 'measures five spools',
  },
  {
    story: (w, n, t) => `At ${w}'s bakery, each loaf of bread must have a mass of ${n} $\\pm$ ${t}.`,
    u: 'g',
    nom: [450, 900, 0],
    tols: [5, 10, 15, 20],
    ask: 'masses',
    what: 'the mass of a loaf of bread',
    one: 'One loaf has a mass of',
    five: 'weighs five loaves',
    mult: 5,
  },
  {
    story: (w, n, t) => `${w} sets a proofing cabinet for bread dough. The dough must be kept at ${n} $\\pm$ ${t}.`,
    u: '°C',
    nom: [26, 32, 1],
    tols: [0.5, 1, 1.5],
    ask: 'temperatures',
    what: 'the temperature of a proofing cabinet',
    one: 'A thermometer in the cabinet reads',
    five: 'takes five temperature readings',
    mult: 0.5,
  },
  {
    story: (w, n, t) => `${w} is a mechanic setting spark plug gaps. The gap must be ${n} $\\pm$ ${t}.`,
    u: 'mm',
    nom: [0.7, 1.1, 2],
    tols: [0.05, 0.03],
    ask: 'gaps',
    what: 'a spark plug gap',
    one: 'One plug’s gap measures',
    five: 'checks five plugs',
    mult: 0.05,
  },
  {
    story: (w, n, t) => `${w} is a welder on a pipeline crew. Each pipe end is bevelled at ${n} $\\pm$ ${t}.`,
    u: '°',
    nom: [30, 38, 1],
    tols: [2.5, 2, 1.5],
    ask: 'bevel angles',
    what: 'the bevel angle on a pipe end',
    one: 'One bevel measures',
    five: 'checks five bevels',
    mult: 2.5,
  },
  {
    story: (w, n, t) => `${w} is calibrating a seed drill on a grain farm. Seeds must be placed at a depth of ${n} $\\pm$ ${t}.`,
    u: 'cm',
    nom: [2, 5, 1],
    tols: [0.5, 0.6, 0.4],
    ask: 'depths',
    what: 'the seeding depth of a seed drill',
    one: 'One seed is placed at a depth of',
    five: 'checks the depth of five seeds',
  },
];

/** A nominal value from a context. Inches use eighths or sixteenths (nom[2] = −8). */
function nominal(rng: Rng, c: TolCtx): number {
  const [lo, hi, dp] = c.nom;
  if (c.mult) return roundTo(rng.int(Math.ceil(lo / c.mult - 1e-9), Math.floor(hi / c.mult + 1e-9)) * c.mult, 6);
  if (dp < 0) {
    const den = -dp;
    return rng.int(lo, hi) + retry(() => rng.int(1, den - 1), (n) => n % 2 === 1) / den;
  }
  const f = 10 ** dp;
  return retry(() => rng.int(lo * f, hi * f), (n) => dp === 0 || n % 10 !== 0) / f;
}
const tolDp = (c: TolCtx, tol: number) => Math.max(c.nom[2] < 0 ? 0 : c.nom[2], (fmt(tol).split('.')[1] ?? '').length);
/** Decimals for measured parts: fine enough that at least three steps fit inside the tolerance. */
function measDp(t: number, dp: number): number {
  let m = dp;
  while (t * 10 ** m < 3 - 1e-9) m++;
  return m;
}

/** nominal ± tolerance → greatest and least acceptable values. */
function tolMaxMin(rng: Rng): GenOutput {
  const c = rng.pick(TOL);
  const who = rng.pick(NAMES);
  const n = nominal(rng, c);
  const t = rng.pick(c.tols);
  const dp = tolDp(c, t);
  const N = V(n, c.u, c.u === 'in' ? undefined : dp);
  const T = V(t, c.u);
  const mx = clean(n + t);
  const mn = clean(n - t);
  const show = (x: number) => (c.u === 'in' ? inchTex(x) : fx(x, dp));
  // Inches: write the nominal size with the tolerance's denominator before adding.
  const den = c.u === 'in' ? Math.round(1 / t) : 1;
  const whole = Math.floor(n + 1e-9);
  const sameDen = c.u === 'in' && toFrac(n - whole, 64)!.d < den ? [`Write ${IN(n)} in ${den === 16 ? 'sixteenths' : 'eighths'}: $${whole}\\tfrac{${Math.round((n - whole) * den)}}{${den}}\\ \\text{in}$.`] : [];
  const nShow = sameDen.length ? `${whole}\\tfrac{${Math.round((n - whole) * den)}}{${den}}` : show(n);
  return {
    prompt: `${c.story(who, N, T)} What are the greatest and least acceptable ${c.ask}?`,
    parts: [exactPart(mx, c.u, 'Greatest:'), exactPart(mn, c.u, 'Least:')],
    hints: ['The tolerance is how far a value may be above or below the nominal (target) value.', 'Add the tolerance to the nominal value for the greatest value. Subtract it for the least value.'],
    solution: [
      ...sameDen,
      `Greatest: $${nShow} + ${c.u === 'in' ? inchTex(t) : fmt(t)} = ${show(mx)}$`,
      `Least: $${nShow} - ${c.u === 'in' ? inchTex(t) : fmt(t)} = ${show(mn)}$`,
      `Acceptable ${c.ask} are from ${V(mn, c.u, c.u === 'in' ? undefined : dp)} to ${V(mx, c.u, c.u === 'in' ? undefined : dp)}.`,
    ],
  };
}

/** Unequal tolerance, written 25^{+0.2}_{-0.1} mm. */
function tolUnequal(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const parts = [
    { what: 'a bushing', dim: 'outside diameter', u: 'mm', nom: () => rng.int(15, 80), up: [0.2, 0.1, 0.15, 0.05], dn: [0.1, 0, 0.05, 0.02] },
    { what: 'a hole for a dowel pin', dim: 'diameter', u: 'mm', nom: () => rng.int(6, 25), up: [0.05, 0.03, 0.02], dn: [0, 0.01, 0.02] },
    { what: 'a cabinet opening', dim: 'width', u: 'mm', nom: () => rng.int(40, 90) * 10, up: [2, 3, 1.5], dn: [0, 1, 0.5] },
    { what: 'a window rough opening', dim: 'height', u: 'mm', nom: () => rng.int(90, 160) * 10, up: [10, 12, 6], dn: [0, 3, 5] },
  ];
  const p = rng.pick(parts);
  const n = p.nom();
  const up = rng.pick(p.up);
  const dn = retry(() => rng.pick(p.dn), (x) => x !== up);
  const dp = Math.max(...[up, dn].map((x) => (fmt(x).split('.')[1] ?? '').length));
  const nomTex = `${fx(n, dp)}^{+${fx(up, dp)}}_{${dn === 0 ? '\\phantom{+}0' : `-${fx(dn, dp)}`}}\\ \\text{${p.u}}`;
  const mx = clean(n + up);
  const mn = clean(n - dn);
  const under = dn === 0 ? 'but never under the nominal size' : `and up to $${fx(dn, dp)}\\ \\text{${p.u}}$ under the nominal size`;
  return {
    prompt: `${who} reads a shop drawing. The ${p.dim} of ${p.what} is given as $${nomTex}$. This means the ${p.dim} may be up to $${fx(up, dp)}\\ \\text{${p.u}}$ over ${under}. What are the greatest and least acceptable values, and what is the tolerance range (greatest minus least)?`,
    parts: [exactPart(mx, p.u, 'Greatest:'), exactPart(mn, p.u, 'Least:'), exactPart(up + dn, p.u, 'Range:')],
    hints: ['The top number is added to the nominal size. The bottom number is subtracted.', 'The tolerance range is the greatest value minus the least value.'],
    solution: [
      `Greatest: $${fx(n, dp)} + ${fx(up, dp)} = ${fx(mx, dp)}$`,
      `Least: $${fx(n, dp)} - ${fx(dn, dp)} = ${fx(mn, dp)}$`,
      `Range: $${fx(mx, dp)} - ${fx(mn, dp)} = ${fmt(clean(up + dn))}$ (the same as $${fx(up, dp)} + ${fx(dn, dp)}$).`,
      `Greatest ${Q(fx(mx, dp), p.u)}, least ${Q(fx(mn, dp), p.u)}, range ${Q(fmt(clean(up + dn)), p.u)}.`,
    ],
  };
}

/** Which measured parts are within tolerance? (select all) */
function withinTol(rng: Rng): GenOutput {
  const c = rng.pick(TOL.filter((x) => x.u !== 'in'));
  const who = rng.pick(NAMES);
  const n = nominal(rng, c);
  const t = rng.pick(c.tols);
  const dp = tolDp(c, t);
  const mdp = measDp(t, dp);
  const step = 10 ** -mdp;
  const mx = clean(n + t);
  const mn = clean(n - t);
  const r = retry(
    () => {
      const offs = Array.from({ length: 5 }, () => rng.int(-Math.round((t * 2.2) / step), Math.round((t * 2.2) / step)) * step);
      const vals = offs.map((o) => clean(n + o));
      return vals;
    },
    (vals) => {
      if (new Set(vals).size !== 5) return false;
      if (vals.some((v) => v <= 0 || Math.abs(v - mx) < 1e-9 || Math.abs(v - mn) < 1e-9)) return false;
      const ok = vals.filter((v) => v > mn && v < mx).length;
      return ok >= 1 && ok <= 4 && vals.some((v) => v > mx) && vals.some((v) => v < mn);
    },
    400,
  );
  const vals = r;
  const inside = (v: number) => v > mn && v < mx;
  const label = (v: number) => Q(fx(v, mdp), c.u);
  const N = V(n, c.u, dp);
  return {
    prompt: `${c.story(who, N, V(t, c.u))} ${who} ${c.five}. Select **all** the measurements that are within tolerance.`,
    parts: [{ answer: multi(rng, vals.map((v) => ({ md: label(v), correct: inside(v) }))) }],
    hints: ['Find the least and greatest acceptable values first.', `Least $= ${fx(n, dp)} - ${fmt(t)}$ and greatest $= ${fx(n, dp)} + ${fmt(t)}$. A measurement is acceptable if it is between them.`],
    solution: [
      `Least: $${fx(n, dp)} - ${fmt(t)} = ${fx(mn, dp)}$. Greatest: $${fx(n, dp)} + ${fmt(t)} = ${fx(mx, dp)}$.`,
      ...vals.map((v) => `${label(v)}: ${inside(v) ? 'between the limits, so it is acceptable' : v > mx ? 'above the greatest value, so it is rejected' : 'below the least value, so it is rejected'}.`),
      `Within tolerance: ${vals.filter(inside).map(label).join(', ')}.`,
    ],
  };
}

/** From the least and greatest acceptable values, find the nominal value and the tolerance. */
function fromRange(rng: Rng): GenOutput {
  const c = rng.pick(TOL.filter((x) => x.u !== 'in'));
  const who = rng.pick(NAMES);
  const n = nominal(rng, c);
  const t = rng.pick(c.tols);
  const dp = tolDp(c, t);
  const mx = clean(n + t);
  const mn = clean(n - t);
  return {
    prompt: `A quality-control sheet says ${c.what} is acceptable from ${Q(fx(mn, dp), c.u)} to ${Q(fx(mx, dp), c.u)}. ${who} wants to write this as (nominal value) $\\pm$ (tolerance). What are the nominal value and the tolerance?`,
    parts: [exactPart(n, c.u, 'Nominal:'), exactPart(t, c.u, 'Tolerance: $\\pm$')],
    hints: ['The nominal value is halfway between the least and greatest values.', 'The tolerance is half of the difference between the greatest and least values.'],
    solution: [
      `Nominal: $\\dfrac{${fx(mn, dp)} + ${fx(mx, dp)}}{2} = ${fx(n, dp)}$`,
      `Tolerance: $\\dfrac{${fx(mx, dp)} - ${fx(mn, dp)}}{2} = ${fmt(t)}$`,
      `The specification is ${Q(fx(n, dp), c.u)} $\\pm$ ${Q(fmt(t), c.u)}.`,
    ],
  };
}

/** A percent tolerance (resistors, application rates, fill weights). */
function percentTol(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    { s: (n: string, p: string) => `${who} is an electrician. A resistor is rated at ${n} with a tolerance of $\\pm${p}\\%$.`, u: 'Ω', ns: [220, 330, 470, 560, 680, 820, 1200, 1500, 2200], ps: [5, 10] },
    { s: (n: string, p: string) => `${who} sprays a canola field. The sprayer should apply ${n} of mix per hectare, $\\pm${p}\\%$.`, u: 'L', ns: [60, 80, 90, 100, 120, 140], ps: [5, 10, 15] },
    { s: (n: string, p: string) => `${who} runs a packaging line. Each bag of flour should hold ${n}, $\\pm${p}\\%$.`, u: 'g', ns: [500, 1000, 2500, 4000, 10000], ps: [1, 2, 0.5] },
    { s: (n: string, p: string) => `${who} checks truck tires at a tire shop. The pressure should be ${n} $\\pm${p}\\%$.`, u: 'kPa', ns: [240, 450, 550, 620, 760], ps: [5, 10] },
  ]);
  const n = rng.pick(ctx.ns);
  const p = rng.pick(ctx.ps);
  const t = clean((n * p) / 100);
  return {
    prompt: `${ctx.s(Q(fmt(n), ctx.u), fmt(p))} What are the greatest and least acceptable values?`,
    parts: [exactPart(n + t, ctx.u, 'Greatest:'), exactPart(n - t, ctx.u, 'Least:')],
    hints: [`Change the percent tolerance into the unit first: find $${fmt(p)}\\%$ of $${fmt(n)}$.`, 'Add that amount for the greatest value and subtract it for the least value.'],
    solution: [
      `Tolerance: $${fmt(p / 100)} \\times ${fmt(n)} = ${fmt(t)}$, so the tolerance is ${PM(fmt(t), ctx.u)}.`,
      `Greatest: $${fmt(n)} + ${fmt(t)} = ${fmt(clean(n + t))}$`,
      `Least: $${fmt(n)} - ${fmt(t)} = ${fmt(clean(n - t))}$`,
      `Acceptable values are from ${Q(fmt(clean(n - t)), ctx.u)} to ${Q(fmt(clean(n + t)), ctx.u)}.`,
    ],
  };
}

/** A nominal size in metres with a tolerance in millimetres: answer in millimetres. */
function tolConvert(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    { what: 'A length of steel pipe for a gas line', dim: 'long' },
    { what: 'A precast concrete beam', dim: 'long' },
    { what: 'A roof truss', dim: 'wide at its base' },
    { what: 'A glass shower panel', dim: 'tall' },
  ]);
  const nm = retry(() => rng.int(1200, 9800), (x) => x % 10 !== 0) / 1000;
  const t = rng.pick([1, 2, 3, 4, 5, 6]);
  const nmm = Math.round(nm * 1000);
  return {
    prompt: `${ctx.what} must be ${Q(fx(nm, 3), 'm')} ${ctx.dim}, with a tolerance of $\\pm${t}\\ \\text{mm}$. ${who} needs the limits in millimetres. What are the greatest and least acceptable sizes, in millimetres?`,
    parts: [exactPart(nmm + t, 'mm', 'Greatest:'), exactPart(nmm - t, 'mm', 'Least:')],
    hints: ['Change the nominal size to millimetres first: $1\\ \\text{m} = 1000\\ \\text{mm}$.', `Then add and subtract $${t}\\ \\text{mm}$.`],
    solution: [
      `$${fx(nm, 3)}\\ \\text{m} \\times 1000 = ${nmm}\\ \\text{mm}$`,
      `Greatest: $${nmm} + ${t} = ${nmm + t}\\ \\text{mm}$`,
      `Least: $${nmm} - ${t} = ${nmm - t}\\ \\text{mm}$`,
      `Acceptable sizes are from $${nmm - t}\\ \\text{mm}$ to $${nmm + t}\\ \\text{mm}$.`,
    ],
  };
}

/** Tolerance stacking: parts assembled end to end. */
function stacking(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    { story: 'stacks three steel spacers on a bolt', items: ['spacer A', 'spacer B', 'spacer C'], u: 'mm', lo: 5, hi: 30, dp: 2, tols: [0.02, 0.03, 0.05, 0.04], total: 'total thickness of the stack' },
    { story: 'joins three lengths of pipe end to end for a pipe rack', items: ['the first length', 'the second length', 'the third length'], u: 'mm', lo: 400, hi: 1800, dp: 0, tols: [1, 2, 3], total: 'total length of the run' },
    { story: 'builds a cabinet from three stacked drawer boxes', items: ['the bottom box', 'the middle box', 'the top box'], u: 'mm', lo: 120, hi: 300, dp: 1, tols: [0.5, 0.8, 1, 0.4], total: 'total height of the stack' },
    { story: 'assembles a gear shaft from three sections', items: ['section 1', 'section 2', 'section 3'], u: 'mm', lo: 20, hi: 90, dp: 2, tols: [0.01, 0.02, 0.03, 0.05], total: 'total length of the shaft' },
  ]);
  const f = 10 ** ctx.dp;
  const noms = [0, 1, 2].map(() => rng.int(ctx.lo * f, ctx.hi * f) / f);
  const tols = [0, 1, 2].map(() => rng.pick(ctx.tols));
  const dp = Math.max(ctx.dp, ...tols.map((t) => (fmt(t).split('.')[1] ?? '').length));
  const N = clean(noms[0] + noms[1] + noms[2]);
  const T = clean(tols[0] + tols[1] + tols[2]);
  const list = noms.map((x, i) => `${ctx.items[i]} is ${Q(fx(x, dp), ctx.u)} $\\pm$ ${Q(fmt(tols[i]), ctx.u)}`);
  const askNominal = rng.chance(0.4);
  const parts = askNominal
    ? [exactPart(N, ctx.u, 'Nominal total:'), exactPart(T, ctx.u, 'Tolerance: $\\pm$')]
    : [exactPart(N + T, ctx.u, 'Greatest:'), exactPart(N - T, ctx.u, 'Least:')];
  return {
    prompt: `${who} ${ctx.story}: ${list[0]}, ${list[1]} and ${list[2]}. ${askNominal ? `Write the ${ctx.total} as (nominal) $\\pm$ (tolerance).` : `What are the greatest and least possible values of the ${ctx.total}?`}`,
    parts,
    hints: [
      'When parts are put end to end, the nominal sizes add, and the tolerances add too (this is called tolerance stacking).',
      'Greatest total: every part at its largest. Least total: every part at its smallest.',
    ],
    solution: [
      `Nominal total: $${noms.map((x) => fx(x, dp)).join(' + ')} = ${fx(N, dp)}$`,
      `Total tolerance: $${tols.map((x) => fmt(x)).join(' + ')} = ${fmt(T)}$, so the total is ${Q(fx(N, dp), ctx.u)} $\\pm$ ${Q(fmt(T), ctx.u)}.`,
      `Greatest: $${fx(N, dp)} + ${fmt(T)} = ${fx(clean(N + T), dp)}$. Least: $${fx(N, dp)} - ${fmt(T)} = ${fx(clean(N - T), dp)}$.`,
      askNominal
        ? `The ${ctx.total} is ${Q(fx(N, dp), ctx.u)} $\\pm$ ${Q(fmt(T), ctx.u)}.`
        : `The ${ctx.total} is between ${Q(fx(clean(N - T), dp), ctx.u)} and ${Q(fx(clean(N + T), dp), ctx.u)}.`,
    ],
  };
}

/** Clearance between a shaft and a hole. */
function clearance(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const r = retry(
    () => {
      const hole = rng.int(1500, 6000) / 100;
      const th = rng.pick([0.02, 0.03, 0.04, 0.05]);
      const ts = rng.pick([0.01, 0.02, 0.03]);
      const gap = rng.pick([0.04, 0.05, 0.06, 0.08, 0.1, 0.12]);
      const shaft = clean(hole - gap);
      return { hole, th, ts, shaft, minC: clean(hole - th - (shaft + ts)), maxC: clean(hole + th - (shaft - ts)) };
    },
    (x) => x.minC > 0,
  );
  const what = rng.pick([
    ['a bearing housing', 'a shaft', 'shaft'],
    ['a hydraulic cylinder', 'a piston rod', 'rod'],
    ['a pulley', 'an axle', 'axle'],
  ]);
  return {
    prompt: `${who} is fitting ${what[1]} into ${what[0]}. The hole is ${Q(fx(r.hole, 2), 'mm')} $\\pm$ ${Q(fmt(r.th), 'mm')} in diameter, and the ${what[2]} is ${Q(fx(r.shaft, 2), 'mm')} $\\pm$ ${Q(fmt(r.ts), 'mm')} in diameter. The **clearance** is the hole diameter minus the ${what[2]} diameter. What are the least and greatest possible clearances?`,
    parts: [exactPart(r.minC, 'mm', 'Least:'), exactPart(r.maxC, 'mm', 'Greatest:')],
    hints: [
      `The clearance is smallest when the hole is as small as possible and the ${what[2]} is as large as possible.`,
      'Find the least and greatest diameter of each part first, then subtract.',
    ],
    solution: [
      `Hole: least $${fx(r.hole, 2)} - ${fmt(r.th)} = ${fx(r.hole - r.th, 2)}$, greatest $${fx(r.hole, 2)} + ${fmt(r.th)} = ${fx(r.hole + r.th, 2)}$`,
      `${cap(what[2])}: least $${fx(r.shaft, 2)} - ${fmt(r.ts)} = ${fx(r.shaft - r.ts, 2)}$, greatest $${fx(r.shaft, 2)} + ${fmt(r.ts)} = ${fx(r.shaft + r.ts, 2)}$`,
      `Least clearance (smallest hole, largest ${what[2]}): $${fx(r.hole - r.th, 2)} - ${fx(r.shaft + r.ts, 2)} = ${fx(r.minC, 2)}$`,
      `Greatest clearance (largest hole, smallest ${what[2]}): $${fx(r.hole + r.th, 2)} - ${fx(r.shaft - r.ts, 2)} = ${fx(r.maxC, 2)}$`,
      `The clearance is between ${Q(fx(r.minC, 2), 'mm')} and ${Q(fx(r.maxC, 2), 'mm')}.`,
    ],
  };
}

/** Is a measured part within tolerance? (yes/no with the reason) */
function acceptPart(rng: Rng): GenOutput {
  const c = rng.pick(TOL);
  const who = rng.pick(NAMES);
  const n = nominal(rng, c);
  let t = rng.pick(c.tols);
  const dp = tolDp(c, t);
  const isIn = c.u === 'in';
  // A tape measure reads sixteenths, so an inch tolerance of 1/8 in leaves room for a reading inside it.
  if (isIn) t = 1 / 8;
  const mdp = isIn ? 0 : measDp(t, dp);
  const step = isIn ? 1 / 16 : 10 ** -mdp;
  const k = Math.round(t / step);
  const inside = rng.chance(0.4);
  const off = (inside ? rng.int(1, k - 1) : rng.int(k + 1, 2 * k + 1)) * rng.sign() * step;
  const m = clean(n + off);
  const ok = Math.abs(off) < t;
  const mx = clean(n + t);
  const mn = clean(n - t);
  const show = (x: number, places = dp) => V(x, c.u, isIn ? undefined : places);
  const choices = ['Yes, it is within tolerance.', 'No, it is too large.', 'No, it is too small.'];
  const ans = ok ? 0 : off > 0 ? 1 : 2;
  return {
    prompt: `${c.story(who, show(n), V(t, c.u))} ${c.one} ${show(m, mdp)}. Is it acceptable?`,
    parts: [{ answer: fixedChoice(choices, ans) }],
    hints: ['Find the least and greatest acceptable values.', 'Compare the measurement with both limits.'],
    solution: [
      `Least: ${show(mn)}. Greatest: ${show(mx)}.`,
      ok ? `${show(m, mdp)} is between the limits.` : `${show(m, mdp)} is ${off > 0 ? 'greater than the greatest' : 'less than the least'} acceptable value.`,
      choices[ans],
    ],
  };
}

const tolerance = skill({
  id: 'm303-tolerance',
  name: 'Uncertainty and tolerance',
  description: 'Find the uncertainty of a measurement, the greatest and least acceptable values from a tolerance, decide whether parts are within tolerance, and add tolerances for assembled parts.',
  outcomes: ['M1'],
  lessonId: 'm303-1-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick(['unc', 'tol', 'tol', 'accept'] as const);
      if (k === 'unc') return uncertaintyRange(rng, 1);
      return k === 'tol' ? tolMaxMin(rng) : acceptPart(rng);
    }
    if (d === 2) {
      const k = rng.pick(['unequal', 'within', 'range', 'percent', 'unc', 'convert'] as const);
      if (k === 'unequal') return tolUnequal(rng);
      if (k === 'within') return withinTol(rng);
      if (k === 'range') return fromRange(rng);
      if (k === 'percent') return percentTol(rng);
      return k === 'unc' ? uncertaintyRange(rng, 2) : tolConvert(rng);
    }
    return rng.chance(0.6) ? stacking(rng) : clearance(rng);
  },
});

export const MEASUREMENT_SKILLS: SkillDef[] = [precisionAccuracy, tolerance];
