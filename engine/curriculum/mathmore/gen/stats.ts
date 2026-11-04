/** More Mathematics Topics, Unit 1: statistics and data displays. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';
import { NAMES, asc, eq, fiveNumber, isWhole, listTex, median, plus, sum, wholeMeanValues } from './common.ts';

type Out = GenOutput;

/** Round to a tenth, or keep exact when it already is. */
const tenthPart = (v: number, label?: string, suffix?: string): Part => (isWhole(v * 10) ? numPart(roundTo(v, 1), { label, suffix }) : numPart(v, { decimals: 1, label, suffix }));

// ---------------------------------------------------------------------------
// 1.1 Statistical questions and dot plots
// ---------------------------------------------------------------------------

/** Pairs: a statistical question and a question with one answer on the same subject. */
const QUESTIONS: Array<{ yes: string; no: string }> = [
  { yes: 'How many hours of sleep do students in my class get on a school night?', no: 'How many hours did I sleep last night?' },
  { yes: 'How tall are the sunflowers in the school garden?', no: 'How tall is the tallest sunflower in the school garden?' },
  { yes: 'How many pets do the families on my street have?', no: 'How many pets does my family have?' },
  { yes: 'How long do students at my school take to travel to school?', no: 'How far is it from my house to the school?' },
  { yes: 'How many books did each student in Grade 6 read this summer?', no: 'How many books are in the school library?' },
  { yes: 'What are the ages of the people at the community picnic?', no: 'How old is the oldest person at the community picnic?' },
  { yes: 'How many goals did the team score in each game this season?', no: 'How many goals did the team score in its first game?' },
  { yes: 'What were the daily high temperatures in the town last month?', no: 'What was the high temperature in the town yesterday?' },
  { yes: 'How many text messages do students in my class send in a day?', no: 'How many students are in my class?' },
  { yes: 'How much do the backpacks of the students in my class weigh?', no: 'How much does my backpack weigh?' },
  { yes: 'How many minutes do the runners in the club take to run 5 km?', no: 'What is the length of the club’s running track?' },
  { yes: 'How many letters are in the first names of the students in my class?', no: 'How many letters are in my first name?' },
];

const STAT_HINT = 'A **statistical question** expects answers that vary. To answer it you collect data, several values, not one fact.';

function statisticalQuestion(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const q = rng.pick(QUESTIONS);
    const yes = rng.chance(0.5);
    const text = yes ? q.yes : q.no;
    return {
      prompt: `Is this a statistical question?\n\n> ${text}`,
      parts: [{ answer: fixedChoice(['Yes', 'No'], yes ? 0 : 1) }],
      hints: [STAT_HINT, 'Ask yourself: would different people, days or objects give different answers?'],
      solution: yes
        ? ['The answers will vary: each person, day or object gives its own value.', 'To answer it we would collect many values and look at how they are spread out.', 'Yes, it is a statistical question.']
        : ['This question has a single answer: one fact or one measurement.', 'No variety in the answers is expected, so we do not need to collect data from many people or objects.', 'No, it is not a statistical question.']
    };
  }
  const not = d === 3 && rng.chance(0.5);
  const picks = rng.shuffle([...QUESTIONS]).slice(0, 4);
  const correct = not ? picks[0]!.no : picks[0]!.yes;
  const others = picks.slice(1).map((q) => (not ? q.yes : q.no));
  return {
    prompt: not ? 'Which question is **not** a statistical question?' : 'Which question is a statistical question?',
    parts: [{ answer: mc(rng, correct, others) }],
    hints: [STAT_HINT, not ? 'Look for the question with exactly one answer.' : 'Look for the question whose answers would vary from one person or object to the next.'],
    solution: not
      ? [`“${correct}” has one answer, so it does not need data that vary.`, 'Each of the other questions expects many different answers, so each is a statistical question.', `The question that is not statistical is “${correct}”`]
      : [`“${correct}” expects many different answers, one from each person, day or object, so it is statistical.`, 'Each of the other questions has a single answer.', `The statistical question is “${correct}”`],
  };
}

interface DotCtx {
  q: (n: number) => string;
  lo: number;
  span: number;
  unit: string;
  label: string;
}

const DOTS: DotCtx[] = [
  { q: (n) => `$${n}$ students were asked how many pets they have.`, lo: 0, span: 6, unit: 'pets', label: 'Number of pets' },
  { q: (n) => `$${n}$ students recorded how many hours they slept on a school night.`, lo: 6, span: 5, unit: 'hours', label: 'Hours of sleep' },
  { q: (n) => `A team recorded the number of goals it scored in each of $${n}$ games.`, lo: 0, span: 6, unit: 'goals', label: 'Goals scored' },
  { q: (n) => `$${n}$ students counted the letters in their first names.`, lo: 3, span: 6, unit: 'letters', label: 'Letters in first name' },
  { q: (n) => `$${n}$ families said how many people live in their home.`, lo: 1, span: 6, unit: 'people', label: 'People in the home' },
  { q: (n) => `$${n}$ students said how many books they read last month.`, lo: 0, span: 8, unit: 'books', label: 'Books read' },
];

/** Values bunched around a centre, so the plot has a shape. */
function bunched(rng: Rng, lo: number, span: number, n: number): number[] {
  const centre = lo + rng.int(1, span - 1);
  return Array.from({ length: n }, () => Math.min(lo + span, Math.max(lo, centre + Math.round((rng.next() + rng.next() + rng.next() - 1.5) * span * 0.6))));
}

function dotPlotRead(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(DOTS);
  const n = d === 1 ? rng.int(10, 14) : rng.int(11, 19);
  const vs = retry(() => bunched(rng, ctx.lo, ctx.span, n), (v) => new Set(v).size >= 4 && countMax(v).length === 1, 200);
  const figure: Figure = { type: 'dotPlot', values: vs, min: ctx.lo, max: ctx.lo + ctx.span, label: ctx.label };
  const s = asc(vs);
  const mode = countMax(vs)[0]!;
  const count = (v: number) => vs.filter((x) => x === v).length;
  const intro = `${ctx.q(n)} The dot plot shows the results: each dot is one ${ctx.unit === 'goals' ? 'game' : ctx.unit === 'people' ? 'family' : 'student'}.`;
  if (d === 1) {
    const t = rng.pick(s.filter((v) => v !== mode));
    const atLeast = rng.pick(s.slice(2, -2));
    const more = vs.filter((x) => x >= atLeast).length;
    return {
      prompt: `${intro}\n\n**(a)** What is the mode?\n\n**(b)** How many dots are at $${t}$?\n\n**(c)** How many values are $${atLeast}$ or more?`,
      figure,
      parts: [numPart(mode, { label: '(a)', suffix: ctx.unit }), numPart(count(t), { label: '(b)' }), numPart(more, { label: '(c)' })],
      hints: ['The **mode** is the value with the tallest stack of dots.', `For (c), add the dots at $${atLeast}$ and at every value to its right.`],
      solution: [
        `The tallest stack is at $${mode}$, with $${count(mode)}$ dots, so the mode is $${mode}$ ${ctx.unit}.`,
        `The stack at $${t}$ has $${count(t)}$ dot${count(t) === 1 ? '' : 's'}.`,
        `Values of $${atLeast}$ or more: ${[...new Set(s.filter((x) => x >= atLeast))].map((v) => `$${count(v)}$ at $${v}$`).join(', ')}. That is $${more}$ values.`,
      ],
    };
  }
  const med = median(vs);
  const range = s[n - 1]! - s[0]!;
  const parts: Part[] = [numPart(med, { label: '(a) Median:', suffix: ctx.unit }), numPart(range, { label: '(b) Range:', suffix: ctx.unit })];
  const sol = [
    `There are $${n}$ dots. Reading them from left to right puts the values in order: ${listTex(s)}`,
    n % 2 ? `The middle value is value number $${(n + 1) / 2}$, which is $${fmt(med)}$.` : `The two middle values are numbers $${n / 2}$ and $${n / 2 + 1}$: $${s[n / 2 - 1]}$ and $${s[n / 2]}$. Halfway between them is $${fmt(med)}$.`,
    `The range is the greatest value minus the least: $${s[n - 1]} - ${s[0]} = ${range}$.`,
  ];
  let prompt = `${intro}\n\n**(a)** Find the median.\n\n**(b)** Find the range.`;
  if (d === 3) {
    const mean = sum(vs) / n;
    prompt += `\n\n**(c)** Find the mean, to the nearest tenth.`;
    parts.push(tenthPart(mean, '(c) Mean:', ctx.unit));
    sol.push(`The mean is the total divided by $${n}$: $${fmt(sum(vs))} \\div ${n} ${eq(mean)}$, about $${fmt(roundTo(mean, 1))}$ ${ctx.unit}.`);
  }
  return { prompt, figure, parts, hints: ['The dots from left to right are the values in order, so count along to the middle one.', 'The range is the greatest value minus the least value.'], solution: sol };
}

/** The values that appear most often. */
function countMax(a: number[]): number[] {
  const c = new Map<number, number>();
  for (const v of a) c.set(v, (c.get(v) ?? 0) + 1);
  const top = Math.max(...c.values());
  return [...c].filter(([, k]) => k === top).map(([v]) => v);
}

// ---------------------------------------------------------------------------
// 1.2 Box plots and the interquartile range
// ---------------------------------------------------------------------------

interface BoxCtx {
  intro: (n: number) => string;
  /** What a drawn box plot shows: "the heights of some tomato plants". */
  what: string;
  lo: number;
  hi: number;
  unit: string;
  label: string;
  step: number;
}

const BOXES: BoxCtx[] = [
  { intro: (n) => `The heights of $${n}$ tomato plants, in centimetres, are:`, what: 'the heights of some tomato plants', lo: 20, hi: 70, unit: 'cm', label: 'Height (cm)', step: 5 },
  { intro: (n) => `The scores of $${n}$ students on a test marked out of $50$ are:`, what: 'the scores of a class on a test marked out of $50$', lo: 18, hi: 50, unit: 'marks', label: 'Score', step: 5 },
  { intro: (n) => `The times, in minutes, that $${n}$ students took to finish a puzzle are:`, what: 'the times some students took to finish a puzzle', lo: 4, hi: 30, unit: 'min', label: 'Time (minutes)', step: 2 },
  { intro: (n) => `The numbers of push-ups $${n}$ students did in one minute are:`, what: 'the numbers of push-ups some students did in one minute', lo: 8, hi: 45, unit: 'push-ups', label: 'Push-ups', step: 5 },
  { intro: (n) => `The ages of $${n}$ people at a chess club are:`, what: 'the ages of the members of a chess club', lo: 11, hi: 60, unit: 'years', label: 'Age (years)', step: 5 },
];

const QUARTILE_HINT = 'Put the values in order and find the median. The **lower quartile** $Q_1$ is the median of the values below it, and the **upper quartile** $Q_3$ is the median of the values above it.';

function quartileSteps(vs: number[]): string[] {
  const f = fiveNumber(vs);
  const n = vs.length;
  return [
    `Put the $${n}$ values in order: ${listTex(asc(vs))}`,
    n % 2 ? `The median is the middle value, $${fmt(f.median)}$. Leave it out of both halves.` : `The median is halfway between the two middle values: $${fmt(f.median)}$.`,
    `Lower half: ${listTex(f.lower)}. Its median is $Q_1 = ${fmt(f.q1)}$.`,
    `Upper half: ${listTex(f.upper)}. Its median is $Q_3 = ${fmt(f.q3)}$.`,
  ];
}

function fiveNumberSummary(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(BOXES);
  const n = d === 1 ? rng.pick([7, 11]) : d === 2 ? rng.int(8, 11) : rng.int(10, 13);
  const vs = retry(() => Array.from({ length: n }, () => rng.int(ctx.lo, ctx.hi)), (v) => new Set(v).size === n, 200);
  const shown = d === 1 ? asc(vs) : vs;
  const f = fiveNumber(vs);
  const iqr = f.q3 - f.q1;
  const steps = quartileSteps(vs);
  if (d === 1) {
    return {
      prompt: `${ctx.intro(n)}\n\n${listTex(shown)}\n\nFind the median and the lower and upper quartiles.`,
      parts: [numPart(f.q1, { label: '$Q_1$:' }), numPart(f.median, { label: 'Median:' }), numPart(f.q3, { label: '$Q_3$:' })],
      hints: [QUARTILE_HINT, `With $${n}$ values, the median is value number $${(n + 1) / 2}$.`],
      solution: [...steps.slice(1), `$Q_1 = ${fmt(f.q1)}$, median $= ${fmt(f.median)}$, $Q_3 = ${fmt(f.q3)}$.`],
    };
  }
  const parts: Part[] = d === 2
    ? [numPart(f.min, { label: 'Minimum:' }), numPart(f.q1, { label: '$Q_1$:' }), numPart(f.median, { label: 'Median:' }), numPart(f.q3, { label: '$Q_3$:' }), numPart(f.max, { label: 'Maximum:' })]
    : [numPart(f.median, { label: 'Median:' }), numPart(iqr, { label: 'IQR:', suffix: ctx.unit }), numPart(f.max - f.min, { label: 'Range:', suffix: ctx.unit })];
  return {
    prompt: `${ctx.intro(n)}\n\n${listTex(shown)}\n\n${d === 2 ? 'Find the five-number summary: the minimum, lower quartile, median, upper quartile and maximum.' : 'Find the median, the interquartile range (IQR) and the range.'}`,
    parts,
    hints: [QUARTILE_HINT, 'The **interquartile range** is $Q_3 - Q_1$: the spread of the middle half of the data.'],
    solution: [
      ...steps,
      `The minimum is $${fmt(f.min)}$ and the maximum is $${fmt(f.max)}$.`,
      ...(d === 3 ? [`IQR $= Q_3 - Q_1 = ${fmt(f.q3)} - ${fmt(f.q1)} = ${fmt(iqr)}$`, `Range $= ${fmt(f.max)} - ${fmt(f.min)} = ${fmt(f.max - f.min)}$`] : [`The five-number summary is $${fmt(f.min)}$, $${fmt(f.q1)}$, $${fmt(f.median)}$, $${fmt(f.q3)}$, $${fmt(f.max)}$.`]),
    ],
  };
}

/** Five increasing values between lo and hi for a drawn box plot. */
function summary(rng: Rng, ctx: BoxCtx): { min: number; q1: number; median: number; q3: number; max: number } {
  return retry(
    () => {
      const v = asc(Array.from({ length: 5 }, () => rng.int(ctx.lo, ctx.hi)));
      return { min: v[0]!, q1: v[1]!, median: v[2]!, q3: v[3]!, max: v[4]! };
    },
    (s) => s.q1 - s.min >= 2 && s.median - s.q1 >= 2 && s.q3 - s.median >= 2 && s.max - s.q3 >= 2,
    300,
  );
}

function axis(ctx: BoxCtx): { min: number; max: number; step: number } {
  return { min: Math.floor(ctx.lo / ctx.step) * ctx.step - ctx.step, max: Math.ceil(ctx.hi / ctx.step) * ctx.step, step: ctx.step };
}

function boxPlotRead(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(BOXES.filter((b) => b.step === 5 || d < 3));
  const { min, max, step } = axis(ctx);
  // Values on whole multiples of the tick step are easy to read; hard questions use any whole number labelled in the question.
  const snap = (s: ReturnType<typeof summary>) => ({ min: Math.round(s.min / step) * step, q1: Math.round(s.q1 / step) * step, median: Math.round(s.median / step) * step, q3: Math.round(s.q3 / step) * step, max: Math.round(s.max / step) * step });
  if (d < 3) {
    const s = retry(() => snap(summary(rng, ctx)), (x) => x.min < x.q1 && x.q1 < x.median && x.median < x.q3 && x.q3 < x.max, 300);
    const figure: Figure = { type: 'boxPlot', plots: [s], min, max, step, label: ctx.label };
    const intro = `The box plot shows ${ctx.what}. Each tick is $${step}$ ${ctx.unit}.`;
    if (d === 1) {
      return {
        prompt: `${intro}\n\n**(a)** What is the median?\n\n**(b)** What is the interquartile range?\n\n**(c)** About what percent of the values are greater than $${s.q3}$?`,
        figure,
        parts: [numPart(s.median, { label: '(a)', suffix: ctx.unit }), numPart(s.q3 - s.q1, { label: '(b)', suffix: ctx.unit }), numPart(25, { label: '(c)', suffix: '%' })],
        hints: ['The line inside the box is the median. The ends of the box are the quartiles, and the whiskers reach the minimum and maximum.', 'Each of the four parts of a box plot (whisker, half box, half box, whisker) holds about a quarter of the values.'],
        solution: [
          `The line inside the box is at $${s.median}$, so the median is $${s.median}$ ${ctx.unit}.`,
          `The box runs from $Q_1 = ${s.q1}$ to $Q_3 = ${s.q3}$, so the IQR is $${s.q3} - ${s.q1} = ${s.q3 - s.q1}$ ${ctx.unit}.`,
          `About a quarter of the values lie above $Q_3$, on the right whisker: about $25\\%$.`,
        ],
      };
    }
    return {
      prompt: `${intro}\n\nRead the five-number summary from the plot, then find the range and the interquartile range.`,
      figure,
      parts: [numPart(s.min, { label: 'Minimum:' }), numPart(s.q1, { label: '$Q_1$:' }), numPart(s.median, { label: 'Median:' }), numPart(s.q3, { label: '$Q_3$:' }), numPart(s.max, { label: 'Maximum:' }), numPart(s.max - s.min, { label: 'Range:' }), numPart(s.q3 - s.q1, { label: 'IQR:' })],
      hints: ['From left to right: the end of the left whisker, the left of the box, the line in the box, the right of the box, the end of the right whisker.', 'Range = maximum − minimum; IQR = $Q_3 - Q_1$.'],
      solution: [
        `Reading from left to right: minimum $${s.min}$, $Q_1 = ${s.q1}$, median $${s.median}$, $Q_3 = ${s.q3}$, maximum $${s.max}$.`,
        `Range $= ${s.max} - ${s.min} = ${s.max - s.min}$`,
        `IQR $= ${s.q3} - ${s.q1} = ${s.q3 - s.q1}$`,
      ],
    };
  }
  // Two box plots: compare the medians and the spreads.
  const pair = retry(
    () => [snap(summary(rng, ctx)), snap(summary(rng, ctx))] as const,
    ([a, b]) => [a, b].every((x) => x.min < x.q1 && x.q1 < x.median && x.median < x.q3 && x.q3 < x.max) && a.median !== b.median && a.q3 - a.q1 !== b.q3 - b.q1,
    400,
  );
  const [a, b] = pair;
  const groups = ['Group A', 'Group B'];
  const figure: Figure = { type: 'boxPlot', plots: [{ label: groups[0], ...a }, { label: groups[1], ...b }], min, max, step, label: ctx.label };
  const higher = a.median > b.median ? groups[0]! : groups[1]!;
  const wider = a.q3 - a.q1 > b.q3 - b.q1 ? groups[0]! : groups[1]!;
  return {
    prompt: `The box plots compare ${ctx.what} in two groups, ${groups[0]} and ${groups[1]}. Each tick is $${step}$ ${ctx.unit}.\n\n**(a)** How much greater is the higher median than the lower one?\n\n**(b)** Which group's middle half is more spread out?`,
    figure,
    parts: [numPart(Math.abs(a.median - b.median), { label: '(a)', suffix: ctx.unit }), { label: '(b)', answer: fixedChoice(groups, groups.indexOf(wider)) }],
    hints: ['Compare the lines inside the boxes for the medians.', 'The spread of the middle half is the interquartile range: the length of the box.'],
    solution: [
      `${groups[0]}: median $${a.median}$, IQR $${a.q3} - ${a.q1} = ${a.q3 - a.q1}$. ${groups[1]}: median $${b.median}$, IQR $${b.q3} - ${b.q1} = ${b.q3 - b.q1}$.`,
      `${higher} has the higher median, by $${Math.abs(a.median - b.median)}$ ${ctx.unit}.`,
      `${wider} has the longer box (the greater IQR), so its middle half is more spread out.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 1.3 Mean absolute deviation
// ---------------------------------------------------------------------------

const MADS: Array<{ intro: (name: string, n: number) => string; lo: number; hi: number; unit: string }> = [
  { intro: (name, n) => `${name} recorded the number of minutes the bus was late on $${n}$ days:`, lo: 0, hi: 14, unit: 'min' },
  { intro: (name, n) => `${name} counted the birds at a feeder on $${n}$ mornings:`, lo: 3, hi: 24, unit: 'birds' },
  { intro: (_name, n) => `The numbers of pages $${n}$ students read in an evening were:`, lo: 5, hi: 40, unit: 'pages' },
  { intro: (name, n) => `${name} measured the lengths of $${n}$ leaves, in centimetres:`, lo: 4, hi: 16, unit: 'cm' },
  { intro: (_name, n) => `The numbers of points a basketball player scored in $${n}$ games were:`, lo: 6, hi: 30, unit: 'points' },
];

function mad(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(MADS);
  const name = rng.pick(NAMES);
  const n = d === 1 ? rng.int(4, 5) : d === 2 ? rng.int(5, 6) : rng.int(7, 8);
  // Keep the MAD away from a rounding boundary (3.75 to the nearest tenth).
  const vs = retry(() => wholeMeanValues(rng, ctx.lo, ctx.hi, n), (v) => { const m0 = sum(v) / n; const x = (sum(v.map((y) => Math.abs(y - m0))) / n) * 10; return Math.abs(x - Math.floor(x) - 0.5) > 0.06; }, 200);
  const m = sum(vs) / n;
  const devs = vs.map((v) => Math.abs(v - m));
  const madV = sum(devs) / n;
  return {
    prompt: `${ctx.intro(name, n)}\n\n${listTex(vs)}\n\nFind the mean and the mean absolute deviation (MAD)${isWhole(madV * 10) ? '' : '. Round the MAD to the nearest tenth'}.`,
    parts: [numPart(m, { label: 'Mean:', suffix: ctx.unit }), tenthPart(madV, 'MAD:', ctx.unit)],
    hints: ['First find the mean. Then find how far each value is from the mean (always a positive distance).', 'The **MAD** is the mean of those distances: add them and divide by the number of values.'],
    solution: [
      `Mean $= (${plus(vs)}) \\div ${n} = ${fmt(sum(vs))} \\div ${n} = ${fmt(m)}$`,
      `Distances from $${fmt(m)}$: ${vs.map((v, i) => `$|${v} - ${fmt(m)}| = ${fmt(devs[i]!)}$`).join(', ')}`,
      `MAD $= (${devs.map((v) => fmt(v)).join(' + ')}) \\div ${n} = ${fmt(sum(devs))} \\div ${n} ${eq(madV)}$`,
      `On average, a value is about $${fmt(roundTo(madV, 1))}$ ${ctx.unit} from the mean.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 1.4 Comparing two populations
// ---------------------------------------------------------------------------

const PAIRS: Array<{ what: string; a: string; b: string; unit: string; lo: number; hi: number }> = [
  { what: 'the heights, in centimetres, of players on two teams', a: 'the volleyball team', b: 'the soccer team', unit: 'cm', lo: 150, hi: 190 },
  { what: 'the numbers of words per minute two classes typed', a: 'Class A', b: 'Class B', unit: 'words', lo: 20, hi: 60 },
  { what: 'the lengths, in millimetres, of beetles from two islands', a: 'the north island', b: 'the south island', unit: 'mm', lo: 10, hi: 40 },
  { what: 'the minutes of exercise per day of students in two grades', a: 'Grade 7', b: 'Grade 8', unit: 'min', lo: 20, hi: 80 },
  { what: 'the masses, in grams, of apples from two orchards', a: 'the hill orchard', b: 'the valley orchard', unit: 'g', lo: 120, hi: 220 },
];

function comparePopulations(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(PAIRS);
  if (d === 1) {
    const n = 6;
    const span = ctx.hi - ctx.lo;
    const a = wholeMeanValues(rng, ctx.lo, ctx.lo + Math.round(span * 0.6), n);
    const b = retry(() => wholeMeanValues(rng, ctx.lo + Math.round(span * 0.3), ctx.hi, n), (x) => sum(x) !== sum(a), 100);
    const ma = sum(a) / n;
    const mb = sum(b) / n;
    return {
      prompt: `Samples were taken of ${ctx.what}.\n\n${cap1(ctx.a)}: ${listTex(a)}\n\n${cap1(ctx.b)}: ${listTex(b)}\n\nFind the mean of each sample and the difference between the means.`,
      parts: [numPart(ma, { label: `Mean for ${ctx.a}:`, suffix: ctx.unit }), numPart(mb, { label: `Mean for ${ctx.b}:`, suffix: ctx.unit }), numPart(Math.abs(ma - mb), { label: 'Difference:', suffix: ctx.unit })],
      hints: ['Find each mean: the sum of the values divided by how many there are.', 'The difference is the greater mean minus the smaller one.'],
      solution: [
        `${cap1(ctx.a)}: $${fmt(sum(a))} \\div ${n} = ${fmt(ma)}$`,
        `${cap1(ctx.b)}: $${fmt(sum(b))} \\div ${n} = ${fmt(mb)}$`,
        `Difference: $${fmt(Math.max(ma, mb))} - ${fmt(Math.min(ma, mb))} = ${fmt(Math.abs(ma - mb))}$ ${ctx.unit}`,
      ],
    };
  }
  const madV = rng.int(2, 8);
  const gap = rng.pick(d === 2 ? [1, 2, 3, 4] : [0.5, 1, 1.5, 2.5, 3, 4]);
  const diff = madV * gap;
  const ma = rng.int(ctx.lo + 10, ctx.hi - 10 - Math.ceil(diff));
  const mb = ma + diff;
  const ratio = diff / madV;
  const parts: Part[] = [numPart(diff, { label: '(a) Difference of means:', suffix: ctx.unit }), numPart(ratio, { label: '(b) Number of MADs:' })];
  let prompt = `Samples were taken of ${ctx.what}. For ${ctx.a} the mean is $${fmt(ma)}$ ${ctx.unit} and for ${ctx.b} it is $${fmt(mb)}$ ${ctx.unit}. Both samples have a mean absolute deviation of $${madV}$ ${ctx.unit}.\n\n**(a)** Find the difference between the means.\n\n**(b)** How many times the MAD is that difference?`;
  const sol = [`Difference: $${fmt(mb)} - ${fmt(ma)} = ${fmt(diff)}$ ${ctx.unit}`, `Divide by the MAD: $${fmt(diff)} \\div ${madV} = ${fmt(ratio)}$`];
  if (d === 3) {
    const options = ['The two populations overlap a lot; the difference may be due to chance.', 'The populations are clearly different: the means are far apart compared with the spread.'];
    const clear = ratio >= 2;
    prompt += `\n\n**(c)** Which conclusion is better supported?`;
    parts.push({ label: '(c)', answer: fixedChoice(options, clear ? 1 : 0) });
    sol.push(clear ? `The means are $${fmt(ratio)}$ MADs apart, which is $2$ or more, so the data overlap little and the difference is noticeable.` : `The means are only $${fmt(ratio)}$ MAD${ratio === 1 ? '' : 's'} apart, less than $2$, so the data overlap a lot and the difference could be chance.`);
  }
  return { prompt, parts, hints: ['Subtract the smaller mean from the greater one.', 'Divide the difference by the MAD. A difference of about $2$ MADs or more suggests a real difference between the populations.'], solution: sol };
}

const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// 1.5 Two-way tables
// ---------------------------------------------------------------------------

const TABLES: Array<{ intro: string; rows: [string, string]; cols: [string, string]; who: string }> = [
  { intro: 'Students were asked whether they have a pet and whether they play a sport.', rows: ['Pet', 'No pet'], cols: ['Sport', 'No sport'], who: 'students' },
  { intro: 'Students in Grades 7 and 8 were asked whether they walk or ride to school.', rows: ['Grade 7', 'Grade 8'], cols: ['Walk', 'Ride'], who: 'students' },
  { intro: 'Visitors to a library were asked whether they borrowed a book and whether they used a computer.', rows: ['Borrowed a book', 'Did not borrow'], cols: ['Used a computer', 'No computer'], who: 'visitors' },
  { intro: 'Club members were asked whether they prefer summer or winter and whether they like to swim.', rows: ['Prefer summer', 'Prefer winter'], cols: ['Likes to swim', 'Does not swim'], who: 'members' },
  { intro: 'Students were asked whether they have a curfew and whether they do chores at home.', rows: ['Curfew', 'No curfew'], cols: ['Chores', 'No chores'], who: 'students' },
];

function twoWayCells(rng: Rng): number[][] {
  const a = rng.int(8, 40), b = rng.int(5, 35), c = rng.int(5, 35), e = rng.int(8, 40);
  return [
    [a, b, a + b],
    [c, e, c + e],
    [a + c, b + e, a + b + c + e],
  ];
}

function twoWayTable(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(TABLES);
  const cells = twoWayCells(rng);
  const k = d === 1 ? 1 : d === 2 ? 2 : 3;
  // Hidden cells that can each be found from the others: one per row (and not two in a column of the inner table).
  const options: Array<[number, number]> = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) options.push([r, c]);
  const hidden = retry(
    () => rng.shuffle(options).slice(0, k),
    (h) => solvable(h),
    400,
  );
  const labels = ['A', 'B', 'C'];
  const rowNames = [...ctx.rows, 'Total'];
  const head = ['', ...ctx.cols, 'Total'];
  const rows = cells.map((row, r) => [rowNames[r]!, ...row.map((v, c) => { const i = hidden.findIndex(([hr, hc]) => hr === r && hc === c); return i >= 0 ? `**${labels[i]}**` : String(v); })]);
  const figure: Figure = { type: 'table', markdown: true, headers: head, rows };
  const names = (r: number, c: number) => `${rowNames[r]} and ${head[c + 1]}`;
  return {
    prompt: `${ctx.intro} The two-way table shows the results, with ${k === 1 ? 'one number' : `${k} numbers`} missing. Find ${hidden.map((_, i) => `**${labels[i]}**`).join(k === 2 ? ' and ' : ', ')}.`,
    figure,
    parts: hidden.map(([r, c], i) => numPart(cells[r]![c]!, { label: `${labels[i]}:` })),
    hints: ['Each row adds up to the total at its right, and each column adds up to the total at its foot.', 'Start with a row or column that has only one number missing.'],
    solution: [
      ...hidden.map(([r, c], i) => `${labels[i]} (${names(r, c)}) $= ${fmt(cells[r]![c]!)}$, ${explain(cells, r, c)}.`),
      'Check: every row and column adds up to its total.',
    ],
  };
}

/** Whether the hidden cells can be found one at a time from rows and columns. */
function solvable(hidden: Array<[number, number]>): boolean {
  const known = new Set<string>();
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (!hidden.some(([a, b]) => a === r && b === c)) known.add(`${r},${c}`);
  let changed = true;
  while (changed) {
    changed = false;
    for (let r = 0; r < 3; r++) {
      const miss = [0, 1, 2].filter((c) => !known.has(`${r},${c}`));
      if (miss.length === 1) { known.add(`${r},${miss[0]}`); changed = true; }
    }
    for (let c = 0; c < 3; c++) {
      const miss = [0, 1, 2].filter((r) => !known.has(`${r},${c}`));
      if (miss.length === 1) { known.add(`${miss[0]},${c}`); changed = true; }
    }
  }
  return known.size === 9;
}

function explain(cells: number[][], r: number, c: number): string {
  if (c === 2) return `the row total: $${cells[r]![0]} + ${cells[r]![1]}$`;
  if (r === 2) return `the column total: $${cells[0]![c]} + ${cells[1]![c]}$`;
  return `the row total minus the other cell: $${cells[r]![2]} - ${cells[r]![1 - c]}$, or the column total minus the other cell: $${cells[2]![c]} - ${cells[1 - r]![c]}$`;
}

function twoWayRelative(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(TABLES);
  const cells = twoWayCells(rng);
  const figure: Figure = { type: 'table', headers: ['', ...ctx.cols, 'Total'], rows: cells.map((row, r) => [[...ctx.rows, 'Total'][r]!, ...row.map(String)]) };
  const pct = (a: number, b: number) => (a / b) * 100;
  const pPart = (v: number, label?: string): Part => (isWhole(v) ? numPart(v, { label, suffix: '%' }) : numPart(v, { decimals: 1, label, suffix: '%' }));
  const r = rng.int(0, 1);
  const c = rng.int(0, 1);
  if (d === 1) {
    const v = pct(cells[r]![c]!, cells[2]![2]!);
    return {
      prompt: `${ctx.intro} The two-way table shows the results.\n\nWhat percent of all the ${ctx.who} are in the group “${ctx.rows[r]}” and “${ctx.cols[c]}”? ${isWhole(v) ? '' : 'Round to the nearest tenth of a percent.'}`,
      figure,
      parts: [pPart(v)],
      hints: ['A percent of **all** the people divides by the grand total, in the bottom right corner.'],
      solution: [`$${cells[r]![c]} \\div ${cells[2]![2]} ${eq(v / 100)}$`, `As a percent: about $${fmt(roundTo(v, 1))}\\%$.`],
    };
  }
  const v0 = pct(cells[0]![c]!, cells[0]![2]!);
  const v1 = pct(cells[1]![c]!, cells[1]![2]!);
  const parts: Part[] = [pPart(v0, `${ctx.rows[0]}:`), pPart(v1, `${ctx.rows[1]}:`)];
  let prompt = `${ctx.intro} The two-way table shows the results.\n\nFor each row, what percent of those ${ctx.who} are in the column “${ctx.cols[c]}”? Round to the nearest tenth of a percent where needed.`;
  const sol = [
    `${ctx.rows[0]}: $${cells[0]![c]} \\div ${cells[0]![2]} ${eq(v0 / 100)}$, about $${fmt(roundTo(v0, 1))}\\%$.`,
    `${ctx.rows[1]}: $${cells[1]![c]} \\div ${cells[1]![2]} ${eq(v1 / 100)}$, about $${fmt(roundTo(v1, 1))}\\%$.`,
  ];
  if (d === 3) {
    const assoc = Math.abs(v0 - v1) >= 10;
    prompt += `\n\nThen decide: do the data suggest an association between the rows and “${ctx.cols[c]}”? (Treat a difference of $10$ percentage points or more as a sign of association.)`;
    parts.push({ label: 'Association?', answer: fixedChoice(['Yes', 'No'], assoc ? 0 : 1) });
    sol.push(assoc ? `The percents differ by about $${fmt(roundTo(Math.abs(v0 - v1), 1))}$ points, $10$ or more, so the data suggest an association.` : `The percents differ by only about $${fmt(roundTo(Math.abs(v0 - v1), 1))}$ points, less than $10$, so the data do not suggest an association.`);
  }
  return { prompt, figure, parts, hints: ['A row percent divides by that row’s total, not by the grand total.', 'If the row percents are close, the row does not seem to make a difference to the column; if they are far apart, there may be an association.'], solution: sol };
}

export const STATS_SKILLS: SkillDef[] = [
  skill({ id: 'mx-statistical-question', name: 'Recognize statistical questions', description: 'Decide whether a question expects answers that vary', outcomes: ['ST1'], lessonId: 'mx-1-1', format: 'mc', gen: statisticalQuestion }),
  skill({ id: 'mx-dot-plot-read', name: 'Read a dot plot', description: 'Find the mode, median, range and mean from a dot plot', outcomes: ['ST1'], lessonId: 'mx-1-1', gen: dotPlotRead }),
  skill({ id: 'mx-five-number-summary', name: 'Find quartiles and the interquartile range', description: 'Find the five-number summary and the IQR of a data set', outcomes: ['ST2'], lessonId: 'mx-1-2', gen: fiveNumberSummary }),
  skill({ id: 'mx-box-plot-read', name: 'Read and compare box plots', description: 'Read the five-number summary from a box plot and compare two box plots', outcomes: ['ST2'], lessonId: 'mx-1-2', gen: boxPlotRead }),
  skill({ id: 'mx-mad', name: 'Find the mean absolute deviation', description: 'Find the mean and the mean absolute deviation of a data set', outcomes: ['ST3'], lessonId: 'mx-1-3', calculator: true, gen: mad }),
  skill({ id: 'mx-compare-populations', name: 'Compare two populations', description: 'Compare two samples by their means and their spread', outcomes: ['ST4'], lessonId: 'mx-1-4', gen: comparePopulations }),
  skill({ id: 'mx-two-way-table', name: 'Complete a two-way table', description: 'Find missing counts in a two-way table from its totals', outcomes: ['ST5'], lessonId: 'mx-1-5', gen: twoWayTable }),
  skill({ id: 'mx-two-way-relative', name: 'Relative frequencies in a two-way table', description: 'Find percents of a total and of a row, and look for an association', outcomes: ['ST5'], lessonId: 'mx-1-5', calculator: true, gen: twoWayRelative }),
];
