/** Math 6 Unit 11 — Functions (P1). */
import { mc, mcFigures, numPart, part, retry, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** A linear function y = a·x + b (or y = b − a·x when `dec`). */
interface Fn {
  a: number;
  b: number;
  dec?: boolean;
}
const val = (f: Fn, x: number) => (f.dec ? f.b - f.a * x : f.a * x + f.b);
/** Right side as typed: 3x + 2, 15t, 20 - 2t. */
function rhs(f: Fn, v = 'x'): string {
  if (f.dec) return `${f.b} - ${f.a === 1 ? '' : f.a}${v}`;
  const ax = `${f.a === 1 ? '' : f.a}${v}`;
  return f.b === 0 ? ax : `${ax} + ${f.b}`;
}
/** The substitution, as LaTeX: 3(4) + 2 = 12 + 2 = 14. */
function sub(f: Fn, x: number): string {
  const y = val(f, x);
  if (f.dec) return `${f.b} - ${f.a} \\times ${x} = ${f.b} - ${f.a * x} = ${y}`;
  if (f.b === 0) return f.a === 1 ? `${x}` : `${f.a} \\times ${x} = ${y}`;
  if (f.a === 1) return `${x} + ${f.b} = ${y}`;
  return `${f.a} \\times ${x} + ${f.b} = ${f.a * x} + ${f.b} = ${y}`;
}
/** Working backwards from y to x, as steps. */
function backSteps(f: Fn, y: number, xv = 'x', yv = 'y'): string[] {
  const x = f.dec ? (f.b - y) / f.a : (y - f.b) / f.a;
  if (f.dec) {
    return [
      `Start with $${yv} = ${y}$. The rule subtracts $${f.a}${xv}$ from $${f.b}$, so $${f.a}${xv}$ must be $${f.b} - ${y} = ${f.b - y}$.`,
      `Undo the multiplication: $${f.b - y} \\div ${f.a} = ${x}$`,
      `Check: $${sub(f, x)}$ ✓`,
    ];
  }
  const steps: string[] = [];
  if (f.b !== 0) steps.push(`Undo the “add $${f.b}$”: $${y} - ${f.b} = ${y - f.b}$`);
  if (f.a !== 1) steps.push(`Undo the “multiply by $${f.a}$”: $${y - f.b} \\div ${f.a} = ${x}$`);
  steps.push(`Check: $${sub(f, x)}$ ✓`);
  return steps;
}

function fnTable(xs: number[], ys: Array<number | null>, heads: [string, string] = ['$x$', '$y$']): Figure {
  return { type: 'table', headers: heads, rows: xs.map((x, i) => [String(x), ys[i] === null ? '?' : String(ys[i])]) };
}

/** A grid step for the y-axis that puts every value on a grid line with at most 12 lines. */
function yStepFor(ys: number[]): number | null {
  const top = Math.max(...ys);
  for (const s of [1, 2, 5, 10, 20, 25, 50]) if (ys.every((y) => y % s === 0) && top / s <= 11) return s;
  return null;
}

function fnGraph(pts: Array<[number, number]>, xMax: number, yStep: number, labels: [string, string], yTop?: number): Figure {
  const top = yTop ?? (Math.floor(Math.max(...pts.map((p) => p[1])) / yStep) + 1) * yStep;
  // Equal steps draw square cells: widen the x-axis so the graph is not much taller than it is wide.
  const xEnd = yStep === 1 ? Math.max(xMax, Math.ceil(top / 1.2)) : xMax;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: xEnd, yMin: 0, yMax: top, xStep: 1, yStep, xLabel: labels[0], yLabel: labels[1] },
    points: pts.map(([x, y]) => ({ x, y })),
  };
}

// ---------------------------------------------------------------------------
// Contexts: change over time and other functions
// ---------------------------------------------------------------------------

interface Ctx {
  f: Fn;
  story: string;
  /** Variable letters. */
  iv: string;
  dv: string;
  /** "the number of weeks", "the height of the plant" */
  ind: string;
  dep: string;
  /** A quantity in the story that does not change. */
  constant: string;
  heads: [string, string];
  axes: [string, string];
  xs: number[];
  /** Suffixes for answers. */
  xUnit: string;
  yUnit: string;
  money: boolean;
  /** Values in prose: "$4$ weeks", "$17$ cm", "\$45". */
  xSay: (x: number) => string;
  ySay: (y: number) => string;
  /** "How tall will the plant be after 9 weeks?" and "After how many weeks will the plant be 41 cm tall?" */
  fwd: (x: number) => string;
  inv: (y: number) => string;
  /** "after $3$ weeks", "for $3$ tickets" */
  at: (x: number) => string;
  /** The largest sensible x. */
  xMax: number;
}

const dollars = (y: number) => `\\$${y}`;
const deg = (y: number) => `$${y}^\\circ\\text{C}$`;

const CONTEXTS: Array<(rng: Rng, name: string) => Ctx> = [
  (rng) => {
    const f = { a: rng.pick([2, 3, 4, 5]), b: rng.int(2, 12) };
    return {
      f, story: `A bean plant is $${f.b}$ cm tall. It grows $${f.a}$ cm each week.`, iv: 'w', dv: 'h',
      ind: 'the number of weeks', dep: 'the height of the plant', constant: `the amount the plant grows each week ($${f.a}$ cm)`,
      heads: ['Weeks, $w$', 'Height, $h$ (cm)'], axes: ['Weeks', 'Height (cm)'], xs: range(0, 4), xUnit: 'weeks', yUnit: 'cm', money: false,
      xSay: (x) => `$${x}$ weeks`, ySay: (y) => `$${y}$ cm`,
      fwd: (x) => `How tall will the plant be after $${x}$ weeks?`, inv: (y) => `After how many weeks will the plant be $${y}$ cm tall?`, at: (x) => `after $${x}$ weeks`, xMax: 12,
    };
  },
  (rng, name) => {
    const f = { a: rng.pick([12, 14, 15, 16, 18, 20]), b: 0 };
    return {
      f, story: `${name} rides a bike on a forest trail at a steady speed of $${f.a}$ km each hour.`, iv: 't', dv: 'd',
      ind: 'the number of hours of riding', dep: 'the distance travelled', constant: `the speed ($${f.a}$ km each hour)`,
      heads: ['Time, $t$ (h)', 'Distance, $d$ (km)'], axes: ['Time (h)', 'Distance (km)'], xs: range(0, 4), xUnit: 'h', yUnit: 'km', money: false,
      xSay: (x) => `$${x}$ h`, ySay: (y) => `$${y}$ km`,
      fwd: (x) => `How far will ${name} travel in $${x}$ hours?`, inv: (y) => `How many hours will it take ${name} to travel $${y}$ km?`, at: (x) => `after $${x}$ h`, xMax: 6,
    };
  },
  (rng) => {
    const f = { a: rng.pick([80, 90, 100]), b: rng.pick([20, 30, 40, 50, 60]) };
    return {
      f, story: `A family is driving from Riverton to Pinewood. They have already driven $${f.b}$ km. From now on, they drive $${f.a}$ km each hour.`, iv: 't', dv: 'd',
      ind: 'the number of hours driven from now on', dep: 'the total distance driven', constant: `the distance driven each hour ($${f.a}$ km)`,
      heads: ['Time, $t$ (h)', 'Distance, $d$ (km)'], axes: ['Time (h)', 'Distance (km)'], xs: range(0, 3), xUnit: 'h', yUnit: 'km', money: false,
      xSay: (x) => `$${x}$ h`, ySay: (y) => `$${y}$ km`,
      fwd: (x) => `What total distance will the family have driven after $${x}$ more hours?`, inv: (y) => `After how many more hours will the family have driven $${y}$ km in total?`, at: (x) => `after $${x}$ more hours`, xMax: 4,
    };
  },
  (rng, name) => {
    const f = { a: rng.int(3, 12), b: rng.pick([5, 10, 15, 20, 25, 30, 40]) };
    return {
      f, story: `${name} has \\$${f.b} in a piggy bank and adds \\$${f.a} from their allowance each week.`, iv: 'w', dv: 's',
      ind: 'the number of weeks', dep: 'the total savings', constant: `the amount added each week (\\$${f.a})`,
      heads: ['Weeks, $w$', 'Savings, $s$ (\\$)'], axes: ['Weeks', 'Savings ($)'], xs: range(0, 4), xUnit: 'weeks', yUnit: '', money: true,
      xSay: (x) => `$${x}$ weeks`, ySay: dollars,
      fwd: (x) => `How much money will ${name} have after $${x}$ weeks?`, inv: (y) => `After how many weeks will ${name} have \\$${y}?`, at: (x) => `after $${x}$ weeks`, xMax: 20,
    };
  },
  (rng) => {
    const f = { a: rng.pick([1, 2, 3]), b: rng.int(1, 8) };
    const town = rng.pick(['Riverton', 'Hillcrest', 'Brookfield', 'Westbury', 'Ashford']);
    return {
      f, story: `On a spring morning in ${town}, the temperature at 6 a.m. is ${deg(f.b)}. It rises ${deg(f.a)} each hour until noon.`, iv: 'h', dv: 't',
      ind: 'the number of hours after 6 a.m.', dep: 'the temperature', constant: `the amount the temperature rises each hour (${deg(f.a)})`,
      heads: ['Hours after 6 a.m., $h$', 'Temperature, $t$ (°C)'], axes: ['Hours after 6 a.m.', 'Temperature (°C)'], xs: range(0, 4), xUnit: 'h', yUnit: '°C', money: false,
      xSay: (x) => `$${x}$ h after 6 a.m.`, ySay: deg,
      fwd: (x) => `What will the temperature be $${x}$ hours after 6 a.m.?`, inv: (y) => `How many hours after 6 a.m. will the temperature be ${deg(y)}?`, at: (x) => `$${x}$ hours after 6 a.m.`, xMax: 6,
    };
  },
  (rng) => {
    const f = { a: rng.pick([4, 5, 6, 8, 10]), b: rng.pick([2, 3, 5]) };
    return {
      f, story: `Tickets for a school play cost \\$${f.a} each. Each online order also has one \\$${f.b} fee.`, iv: 'n', dv: 'c',
      ind: 'the number of tickets in the order', dep: 'the total cost of the order', constant: `the fee for the order (\\$${f.b})`,
      heads: ['Tickets, $n$', 'Cost, $c$ (\\$)'], axes: ['Tickets', 'Cost ($)'], xs: range(1, 5), xUnit: 'tickets', yUnit: '', money: true,
      xSay: (x) => `$${x}$ tickets`, ySay: dollars,
      fwd: (x) => `What is the total cost of an order of $${x}$ tickets?`, inv: (y) => `How many tickets are in an order that costs \\$${y} in total?`, at: (x) => `for an order of $${x}$ tickets`, xMax: 12,
    };
  },
  (rng) => {
    const f = { a: rng.pick([10, 12, 15, 20, 25]), b: rng.pick([20, 30, 40, 50]) };
    return {
      f, story: `A wading pool already has $${f.b}$ L of water in it. A hose adds $${f.a}$ L of water each minute.`, iv: 'm', dv: 'v',
      ind: 'the number of minutes the hose runs', dep: 'the amount of water in the pool', constant: `the amount the hose adds each minute ($${f.a}$ L)`,
      heads: ['Minutes, $m$', 'Water, $v$ (L)'], axes: ['Minutes', 'Water (L)'], xs: range(0, 4), xUnit: 'min', yUnit: 'L', money: false,
      xSay: (x) => `$${x}$ min`, ySay: (y) => `$${y}$ L`,
      fwd: (x) => `How much water will be in the pool after $${x}$ minutes?`, inv: (y) => `After how many minutes will the pool hold $${y}$ L of water?`, at: (x) => `after $${x}$ minutes`, xMax: 20,
    };
  },
  (rng, name) => {
    const f = { a: rng.pick([5, 6, 7, 8, 9, 10]), b: 0 };
    return {
      f, story: `${name} earns \\$${f.a} for each dog walk.`, iv: 'n', dv: 'p',
      ind: 'the number of dog walks', dep: 'the total pay', constant: `the pay for one walk (\\$${f.a})`,
      heads: ['Walks, $n$', 'Pay, $p$ (\\$)'], axes: ['Walks', 'Pay ($)'], xs: range(0, 4), xUnit: 'walks', yUnit: '', money: true,
      xSay: (x) => `$${x}$ walks`, ySay: dollars,
      fwd: (x) => `How much will ${name} earn for $${x}$ walks?`, inv: (y) => `How many walks must ${name} do to earn \\$${y}?`, at: (x) => `for $${x}$ walks`, xMax: 30,
    };
  },
  (rng) => {
    const f = { a: rng.pick([1, 2, 3]), b: rng.int(5, 20) };
    const town = rng.pick(['Northfield', 'Pinewood', 'Clearwater', 'Maple Falls', 'Stonebridge']);
    return {
      f, story: `During a snowstorm in ${town}, the snow on the ground is $${f.b}$ cm deep. Then $${f.a}$ cm more snow falls each hour.`, iv: 'h', dv: 's',
      ind: 'the number of hours', dep: 'the depth of the snow', constant: `the amount of snow that falls each hour ($${f.a}$ cm)`,
      heads: ['Hours, $h$', 'Snow depth, $s$ (cm)'], axes: ['Hours', 'Snow depth (cm)'], xs: range(0, 4), xUnit: 'h', yUnit: 'cm', money: false,
      xSay: (x) => `$${x}$ h`, ySay: (y) => `$${y}$ cm`,
      fwd: (x) => `How deep will the snow be after $${x}$ hours?`, inv: (y) => `After how many hours will the snow be $${y}$ cm deep?`, at: (x) => `after $${x}$ hours`, xMax: 12,
    };
  },
  (rng) => {
    const a = rng.pick([2, 3]);
    const b = a * rng.pick([8, 9, 10]);
    const f = { a, b, dec: true };
    return {
      f, story: `A candle is $${b}$ cm tall when it is lit. It burns down $${a}$ cm each hour.`, iv: 't', dv: 'h',
      ind: 'the number of hours the candle burns', dep: 'the height of the candle', constant: `the amount the candle burns each hour ($${a}$ cm)`,
      heads: ['Hours, $t$', 'Height, $h$ (cm)'], axes: ['Hours', 'Height (cm)'], xs: range(0, 4), xUnit: 'h', yUnit: 'cm', money: false,
      xSay: (x) => `$${x}$ h`, ySay: (y) => `$${y}$ cm`,
      fwd: (x) => `How tall will the candle be after $${x}$ hours?`, inv: (y) => `After how many hours will the candle be $${y}$ cm tall?`, at: (x) => `after $${x}$ hours`, xMax: b / a - 1,
    };
  },
];

function pickCtx(rng: Rng, ok: (c: Ctx) => boolean = () => true): Ctx {
  const name = rng.pick(NAMES);
  return retry(() => rng.pick(CONTEXTS)(rng, name), ok, 200);
}

const IND_DEF = 'The **independent variable** is the quantity you change or choose (often time). The **dependent variable** changes because of it: its value depends on the independent variable.';
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// 11.1 Independent and dependent variables
// ---------------------------------------------------------------------------

/** Situations described in words, without numbers. */
const SITUATIONS = [
  { s: 'A class measures the height of a sunflower every week during the summer.', ind: 'the number of weeks', dep: 'the height of the sunflower', other: 'the colour of the sunflower' },
  { s: 'On a warm day, a student measures the mass of a block of ice every $10$ minutes as it melts.', ind: 'the time since the start', dep: 'the mass of the ice', other: 'the size of the room' },
  { s: 'A vet weighs a puppy once a month as it grows.', ind: 'the age of the puppy in months', dep: 'the mass of the puppy', other: 'the name of the puppy' },
  { s: 'A weather station in a city records the temperature every hour during one day.', ind: 'the time of day', dep: 'the temperature', other: 'the number of weather stations' },
  { s: 'At a farmers’ market, the cost of a bag of apples depends on the mass of the apples in the bag.', ind: 'the mass of the apples', dep: 'the cost of the bag', other: 'the colour of the bag' },
  { s: 'A rain gauge collects water during a storm. A student reads the amount of water every $15$ minutes.', ind: 'the time since the storm began', dep: 'the amount of water in the gauge', other: 'the shape of the gauge' },
  { s: 'A swimmer counts how many laps she has finished after each minute of swimming.', ind: 'the number of minutes of swimming', dep: 'the number of laps finished', other: 'the length of her swimsuit' },
  { s: 'The total number of wheels in a bike rack depends on how many bikes are parked in it.', ind: 'the number of bikes', dep: 'the total number of wheels', other: 'the colour of the bikes' },
  { s: 'A baker records how many loaves of bread are left on the shelf every hour after the store opens.', ind: 'the number of hours since the store opened', dep: 'the number of loaves left', other: 'the price of a loaf' },
];

function whichVariable(rng: Rng): Out {
  const useCtx = rng.chance(0.5);
  const wantInd = rng.chance(0.5);
  let story: string;
  let ind: string;
  let dep: string;
  let other: string;
  if (useCtx) {
    const c = pickCtx(rng);
    story = `${c.story} ${cap(c.dep)} depends on ${c.ind}.`;
    ({ ind, dep } = c);
    other = c.constant;
  } else {
    const s = rng.pick(SITUATIONS);
    story = s.s.includes('depends') ? s.s : `${s.s} ${cap(s.dep)} depends on ${s.ind}.`;
    ({ ind, dep, other } = s);
  }
  const right = wantInd ? ind : dep;
  const wrong = wantInd ? dep : ind;
  return {
    prompt: `${story} Which is the **${wantInd ? 'independent' : 'dependent'}** variable?`,
    parts: [{ answer: mc(rng, cap(right), [cap(wrong), cap(other)]) }],
    hints: [IND_DEF, `Look for the words “depends on”. The quantity after them is the independent variable.`],
    solution: [
      `${cap(dep)} depends on ${ind}.`,
      `So ${ind} is the independent variable, and ${dep} is the dependent variable.`,
      `${cap(other)} is not one of the changing quantities we are comparing.`,
      `The ${wantInd ? 'independent' : 'dependent'} variable is ${right}.`,
    ],
    answerDisplay: cap(right),
  };
}

function variableStatement(rng: Rng): Out {
  const useCtx = rng.chance(0.5);
  let story: string;
  let ind: string;
  let dep: string;
  if (useCtx) {
    const c = pickCtx(rng);
    story = c.story;
    ({ ind, dep } = c);
  } else {
    const s = rng.pick(SITUATIONS.filter((x) => !x.s.includes('depends')));
    story = s.s;
    ({ ind, dep } = s);
  }
  const correct = `${cap(ind)} is the independent variable, and ${dep} is the dependent variable.`;
  return {
    prompt: `${story} Which statement is true?`,
    parts: [{ answer: mc(rng, correct, [
      `${cap(dep)} is the independent variable, and ${ind} is the dependent variable.`,
      `${cap(ind)} and ${dep} are both independent variables.`,
      `${cap(ind)} and ${dep} are both dependent variables.`,
    ]) }],
    hints: [IND_DEF, `Ask yourself: does ${dep} change because of ${ind}, or the other way around?`],
    solution: [
      `As ${ind} changes, ${dep} changes because of it.`,
      `So ${dep} depends on ${ind}.`,
      `${correct}`,
    ],
    answerDisplay: correct,
  };
}

function describeRule(rng: Rng): Out {
  const c = pickCtx(rng, (x) => !x.f.dec && x.f.a > 1);
  const { a, b } = c.f;
  const xs = c.xs;
  const ys = xs.map((x) => val(c.f, x));
  const indShort = c.ind;
  const depShort = c.dep;
  const correct = b === 0 ? `Multiply ${indShort} by $${a}$.` : `Multiply ${indShort} by $${a}$, then add $${b}$.`;
  const wrong = b === 0
    ? [`Add $${a}$ to ${indShort}.`, `Multiply ${depShort} by $${a}$.`, `Divide ${indShort} by $${a}$.`]
    : [`Add $${a}$ to ${indShort}.`, a !== b ? `Multiply ${indShort} by $${b}$, then add $${a}$.` : `Multiply ${indShort} by $${a + 1}$.`, `Multiply ${depShort} by $${a}$, then add $${b}$.`];
  const tidy = (t: string) => t.replace(/\.\.$/, '.');
  return {
    prompt: `${c.story} The table of values shows the function. Which rule gives ${c.dep} from ${c.ind}?`,
    figure: fnTable(xs, ys, c.heads),
    parts: [{ answer: mc(rng, tidy(correct), wrong.map(tidy)) }],
    hints: ['The rule starts with the independent variable (first column) and gives the dependent variable (second column).', 'Test each rule on every row of the table, not just one row.'],
    solution: [
      `The independent variable is ${c.ind}, so the rule must start with it.`,
      `Test the rule on the rows: ${xs.slice(1, 4).map((x) => `$${sub(c.f, x)}$`).join(', ')}.`,
      `Every row works. The rule is: ${tidy(correct)}`,
    ],
    answerDisplay: tidy(correct),
  };
}

const functionVariables = skill({
  id: 'm6-function-variables',
  name: 'Independent and dependent variables',
  description: 'Identify the independent and dependent variables in a situation, including change over time, and describe the rule that gives the dependent variable from the independent variable.',
  outcomes: ['P1'],
  lessonId: 'm6-11-1',
  format: 'mc',
  gen(rng, d) {
    if (d === 1) return whichVariable(rng);
    if (d === 2) return variableStatement(rng);
    return describeRule(rng);
  },
});

// ---------------------------------------------------------------------------
// 11.1 Tables of values and points in the Cartesian plane
// ---------------------------------------------------------------------------

function missingValue(rng: Rng): Out {
  const c = pickCtx(rng);
  const xs = c.xs;
  const ys = xs.map((x) => val(c.f, x));
  const k = rng.int(1, xs.length - 1);
  return {
    prompt: `${c.story} Complete the table of values. What number goes in the box with the question mark?`,
    figure: fnTable(xs, ys.map((y, i) => (i === k ? null : y)), c.heads),
    parts: [numPart(ys[k], c.money ? { label: '\\$' } : { suffix: c.yUnit || undefined })],
    hints: ['Use the story to find the rule from the first column to the second column.', `Use the rule with $${c.iv} = ${xs[k]}$.`],
    solution: [
      `From the story: ${c.f.dec ? `start at $${c.f.b}$ and subtract $${c.f.a}$ for each unit of time` : c.f.b === 0 ? `multiply by $${c.f.a}$` : `start at $${c.f.b}$ and add $${c.f.a}$ for each one`}.`,
      `For $${c.iv} = ${xs[k]}$: $${sub(c.f, xs[k])}$`,
      `The missing value is ${c.ySay(ys[k])}.`,
    ],
  };
}

function rowAsPoint(rng: Rng): Out {
  const f: Fn = { a: rng.int(2, 6), b: rng.int(0, 9) };
  const xs = range(0, 4);
  const ys = xs.map((x) => val(f, x));
  const k = rng.int(1, 4);
  return {
    prompt: `The table of values shows a function. Write the row for $x = ${xs[k]}$ as a point $(x, y)$ in the Cartesian plane.`,
    figure: fnTable(xs, ys),
    parts: [part({ kind: 'point', x: xs[k], y: ys[k] }, { label: 'Point:' })],
    hints: ['The independent variable $x$ gives the $x$-coordinate. The dependent variable $y$ gives the $y$-coordinate.', `Find the row where $x = ${xs[k]}$ and read its $y$-value.`],
    solution: [`In the row where $x = ${xs[k]}$, the value of $y$ is $${ys[k]}$.`, 'Write $x$ first, then $y$.', `The point is $(${xs[k]}, ${ys[k]})$.`],
  };
}

function completeTable(rng: Rng): Out {
  const c = pickCtx(rng);
  const xs = c.xs;
  const ys = xs.map((x) => val(c.f, x));
  const hide = rng.sample(range(1, xs.length - 1), 3).sort((p, q) => p - q);
  return {
    prompt: `${c.story} Complete the table of values.`,
    figure: fnTable(xs, ys.map((y, i) => (hide.includes(i) ? null : y)), c.heads),
    parts: hide.map((i) => numPart(ys[i], { label: `$${c.iv} = ${xs[i]}$:`, ...(c.money ? {} : { suffix: c.yUnit || undefined }) })),
    hints: ['Write the rule in words first: what do you do to the independent variable to get the dependent variable?', 'Use the rule on each empty row. Check that the values change by the same amount each row.'],
    solution: [...hide.map((i) => `$${c.iv} = ${xs[i]}$: $${sub(c.f, xs[i])}$`), `The missing values are ${hide.map((i) => c.ySay(ys[i])).join(', ')}.`],
  };
}

/** A context whose values fit nicely on a graph. */
function graphCtx(rng: Rng): { c: Ctx; ys: number[]; s: number } {
  const g = retry(
    () => {
      const c = pickCtx(rng);
      const ys = c.xs.map((x) => val(c.f, x));
      return { c, ys, s: yStepFor(ys) };
    },
    (x) => x.s !== null,
    200,
  );
  if (g.s === null) {
    // Always-valid fallback: a pure function on a 1-unit grid.
    const f: Fn = { a: 2, b: 1 };
    const c: Ctx = { ...CONTEXTS[0](rng, 'Kai'), f, story: 'A bean plant is $1$ cm tall. It grows $2$ cm each week.' };
    return { c, ys: c.xs.map((x) => val(f, x)), s: 1 };
  }
  return g as { c: Ctx; ys: number[]; s: number };
}

function readGraph(rng: Rng): Out {
  const { c, ys, s } = graphCtx(rng);
  const pts = c.xs.map((x, i) => [x, ys[i]] as [number, number]);
  const k = rng.int(1, pts.length - 1);
  return {
    prompt: `${c.story} The graph shows this function as points in the Cartesian plane. Use the graph to find ${c.dep} ${c.at(c.xs[k])}.`,
    figure: fnGraph(pts, c.xs[c.xs.length - 1] + 1, s, c.axes),
    parts: [numPart(ys[k], c.money ? { label: '\\$' } : { suffix: c.yUnit || undefined })],
    hints: [`Find $${c.xs[k]}$ on the horizontal axis and go straight up to the point.`, `Read across to the vertical axis. Its grid lines go up by $${s}$.`],
    solution: [`The point above $${c.xs[k]}$ is $(${c.xs[k]}, ${ys[k]})$.`, `So when $${c.iv} = ${c.xs[k]}$, $${c.dv} = ${ys[k]}$.`, `The answer is ${c.ySay(ys[k])}.`],
  };
}

function whichGraph(rng: Rng): Out {
  const g = retry(
    () => {
      const f: Fn = { a: rng.int(1, 4), b: rng.int(1, 5) };
      return f;
    },
    (f) => (f.a + 1) * 4 + f.b <= 12,
    200,
  );
  const xs = range(0, 4);
  const sets: Array<Array<[number, number]>> = [
    xs.map((x) => [x, val(g, x)]),
    xs.map((x) => [x, g.a * x]),
    xs.map((x) => [x, (g.a + 1) * x + g.b]),
    xs.map((x) => [val(g, x), x]).filter(([x]) => x <= 12) as Array<[number, number]>,
  ];
  const answer = mcFigures(rng, sets.map((pts, i) => ({ md: '', figure: fnGraph(pts, 12, 1, ['x', 'y'], 12), correct: i === 0 })));
  const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
  return {
    prompt: `Which graph shows the function $y = ${rhs(g)}$ for $x = 0, 1, 2, 3, 4$?`,
    parts: [{ answer }],
    hints: ['Make a table of values first: put each value of $x$ into the equation.', 'Each row of the table is a point $(x, y)$: $x$ across, $y$ up.'],
    solution: [
      `Table: ${xs.map((x) => `$x = ${x}$, $y = ${val(g, x)}$`).join('; ')}.`,
      `Points: ${xs.map((x) => `$(${x}, ${val(g, x)})$`).join(', ')}.`,
      `Graph ${letter} shows these points.`,
    ],
  };
}

function oddPoint(rng: Rng): Out {
  const f: Fn = retry(() => ({ a: rng.int(1, 3), b: rng.int(0, 4) }), (q) => 4 * q.a + q.b <= 11);
  const xs = range(0, 4);
  const k = rng.int(1, 4);
  const good = val(f, xs[k]);
  const shift = retry(() => rng.pick([-2, -1, 1, 2]), (s) => good + s >= 0);
  const pts = xs.map((x, i) => [x, val(f, x) + (i === k ? shift : 0)] as [number, number]);
  const wrongPt = pts[k];
  const top = Math.max(...pts.map((p) => p[1])) + 1;
  return {
    prompt: `${rng.pick(NAMES)} graphed the function $y = ${rhs(f)}$ for $x = 0$ to $4$, but made a mistake with one point. Which point does **not** fit the function? Write it as an ordered pair.`,
    figure: fnGraph(pts, 5, 1, ['x', 'y'], top),
    parts: [part({ kind: 'point', x: wrongPt[0], y: wrongPt[1] }, { label: 'Wrong point:' })],
    hints: ['Read each point. Put its $x$-coordinate into the equation and compare the result with its $y$-coordinate.', 'Only one point gives a different value.'],
    solution: [
      ...xs.map((x, i) => `$x = ${x}$: $y = ${sub(f, x)}$; the graph shows $${pts[i][1]}$${i === k ? ' ✗' : ' ✓'}`),
      `The point that does not fit is $(${wrongPt[0]}, ${wrongPt[1]})$. It should be $(${wrongPt[0]}, ${good})$.`,
    ],
  };
}

const functionTable = skill({
  id: 'm6-function-table',
  name: 'Tables of values and graphs of functions',
  description: 'Represent a function in a table of values and as points in the Cartesian plane, and move between the two.',
  outcomes: ['P1'],
  lessonId: 'm6-11-1',
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? missingValue(rng) : rowAsPoint(rng);
    if (d === 2) return rng.chance(0.5) ? completeTable(rng) : readGraph(rng);
    return rng.chance(0.5) ? whichGraph(rng) : oddPoint(rng);
  },
});

// ---------------------------------------------------------------------------
// 11.2 Equations for functions
// ---------------------------------------------------------------------------

function equationFromWords(rng: Rng): Out {
  const kind = rng.pick(['times', 'more', 'less', 'two'] as const);
  const a = rng.int(2, 9);
  const b = rng.int(2, 12);
  const [words, expected, tex] = kind === 'times'
    ? [`$y$ is $${a}$ times $x$.`, `${a}x`, `${a}x`]
    : kind === 'more'
      ? [`$y$ is $${b}$ more than $x$.`, `x + ${b}`, `x + ${b}`]
      : kind === 'less'
        ? [`$y$ is $${b}$ less than $x$.`, `x - ${b}`, `x - ${b}`]
        : [`To find $y$, multiply $x$ by $${a}$, then add $${b}$.`, `${a}x + ${b}`, `${a}x + ${b}`];
  return {
    prompt: `Write an equation for this function: ${words}`,
    parts: [part({ kind: 'expression', expected }, { label: '$y =$' })],
    hints: ['Write $y =$ and then turn the words into maths, one step at a time.', kind === 'times' ? `“$${a}$ times $x$” is written $${a}x$.` : kind === 'two' ? `Multiplying $x$ by $${a}$ gives $${a}x$. Then add $${b}$.` : kind === 'more' ? `“$${b}$ more than $x$” means $x + ${b}$.` : `“$${b}$ less than $x$” means $x - ${b}$.`],
    solution: [`Start with $x$.`, kind === 'two' ? `Multiply by $${a}$: $${a}x$. Then add $${b}$: $${a}x + ${b}$.` : `Turn the words into maths: $${tex}$.`, `The equation is $y = ${tex}$.`],
  };
}

function equationFromTable(rng: Rng): Out {
  const f: Fn = { a: rng.int(2, 9), b: rng.chance(0.2) ? 0 : rng.int(1, 12) };
  const xs = rng.chance(0.6) ? range(0, 4) : range(1, 5);
  const ys = xs.map((x) => val(f, x));
  const x0 = xs[0];
  return {
    prompt: 'The table of values shows a function. Write an equation for the function.',
    figure: fnTable(xs, ys),
    parts: [part({ kind: 'expression', expected: rhs(f) }, { label: '$y =$' })],
    hints: ['How much does $y$ go up each time $x$ goes up by $1$? That number multiplies $x$.', `Then compare: what must you add to that product to get the $y$-value in the first row?`],
    solution: [
      `Each time $x$ goes up by $1$, $y$ goes up by $${f.a}$. So the rule starts with $${f.a}x$.`,
      x0 === 0 ? `When $x = 0$, $y = ${ys[0]}$, so add $${f.b}$.` : `When $x = 1$, $${f.a}x = ${f.a}$, but $y = ${ys[0]}$. So add $${ys[0]} - ${f.a} = ${f.b}$.`,
      `Check another row: $x = 3$ gives $${sub(f, 3)}$ ✓`,
      `The equation is $y = ${rhs(f)}$.`,
    ],
  };
}

function equationFromStory(rng: Rng): Out {
  const c = pickCtx(rng);
  const xs = c.xs;
  const ys = xs.map((x) => val(c.f, x));
  if (rng.chance(0.35)) {
    const { a, b } = c.f;
    const correct = `$${c.dv} = ${rhs(c.f, c.iv)}$`;
    const wrong = c.f.dec
      ? [`$${c.dv} = ${a}${c.iv} - ${b}$`, `$${c.dv} = ${b} + ${a}${c.iv}$`, `$${c.iv} = ${b} - ${a}${c.dv}$`]
      : b === 0
        ? [`$${c.dv} = ${c.iv} + ${a}$`, `$${c.iv} = ${a}${c.dv}$`, `$${c.dv} = ${a + 1}${c.iv}$`]
        : [`$${c.dv} = ${b}${c.iv} + ${a}$`, `$${c.dv} = ${c.iv} + ${a + b}$`, `$${c.iv} = ${a === 1 ? '' : a}${c.dv} + ${b}$`, `$${c.dv} = ${a + 1}${c.iv} + ${b}$`];
    return {
      prompt: `${c.story} Let $${c.iv}$ be ${c.ind} and $${c.dv}$ be ${c.dep}. The table of values shows the function. Which equation represents the function?`,
      figure: fnTable(xs, ys, c.heads),
      parts: [{ answer: mc(rng, correct, wrong) }],
      hints: [`The dependent variable $${c.dv}$ goes on the left side of the equation.`, 'Test each equation with two rows of the table.'],
      solution: [`$${c.dv}$ depends on $${c.iv}$, so the equation starts $${c.dv} =$.`, `From the story: ${c.f.dec ? `start at $${b}$ and subtract $${a}$ for each hour` : b === 0 ? `multiply $${c.iv}$ by $${a}$` : a === 1 ? `add $${b}$ to $${c.iv}$` : `multiply $${c.iv}$ by $${a}$, then add $${b}$`}.`, `Check: $${c.iv} = ${xs[2]}$ gives $${sub(c.f, xs[2])}$ ✓`, `The equation is ${correct}.`],
      answerDisplay: correct,
    };
  }
  return {
    prompt: `${c.story} Let $${c.iv}$ be ${c.ind} and $${c.dv}$ be ${c.dep}. Write an equation for $${c.dv}$ in terms of $${c.iv}$.`,
    parts: [part({ kind: 'expression', expected: rhs(c.f, c.iv) }, { label: `$${c.dv} =$` })],
    hints: [`How much does ${c.dep} change each time $${c.iv}$ goes up by $1$? That amount multiplies $${c.iv}$.`, c.f.dec ? `The candle starts at $${c.f.b}$ cm and loses $${c.f.a}$ cm each hour, so subtract $${c.f.a}${c.iv}$ from $${c.f.b}$.` : c.f.b === 0 ? `Nothing is there at the start, so there is nothing to add.` : `What amount is there at the start, before any change? Add it.`],
    solution: [
      `Make a quick table: ${xs.slice(0, 3).map((x) => `$${c.iv} = ${x}$ gives $${c.dv} = ${val(c.f, x)}$`).join(', ')}.`,
      c.f.dec ? `Start at $${c.f.b}$ and subtract $${c.f.a}$ for each hour: $${c.f.b} - ${c.f.a}${c.iv}$.` : c.f.b === 0 ? `Multiply $${c.iv}$ by $${c.f.a}$: $${rhs(c.f, c.iv)}$.` : c.f.a === 1 ? `Add the starting amount $${c.f.b}$ to $${c.iv}$: $${rhs(c.f, c.iv)}$.` : `Multiply $${c.iv}$ by $${c.f.a}$, then add the starting amount $${c.f.b}$: $${rhs(c.f, c.iv)}$.`,
      `The equation is $${c.dv} = ${rhs(c.f, c.iv)}$.`,
    ],
  };
}

const functionEquation = skill({
  id: 'm6-function-equation',
  name: 'Writing an equation for a function',
  description: 'Write an algebraic equation for a function from words, a table of values or a situation, and recognize the same function in different representations.',
  outcomes: ['P1'],
  lessonId: 'm6-11-2',
  gen(rng, d) {
    if (d === 1) return equationFromWords(rng);
    if (d === 2) return equationFromTable(rng);
    return equationFromStory(rng);
  },
});

// ---------------------------------------------------------------------------
// 11.2 Values of functions
// ---------------------------------------------------------------------------

function dependentValue(rng: Rng): Out {
  const f: Fn = { a: rng.int(2, 9), b: rng.int(1, 15) };
  const x = rng.int(3, 12);
  const y = val(f, x);
  return {
    prompt: `A function has the equation $y = ${rhs(f)}$. What is the value of $y$ when $x = ${x}$?`,
    parts: [numPart(y, { label: '$y =$' })],
    hints: [`Replace $x$ with $${x}$.`, `Multiply first, then add: $${f.a} \\times ${x} + ${f.b}$.`],
    solution: [`Replace $x$ with $${x}$.`, `$y = ${sub(f, x)}$`, `When $x = ${x}$, $y = ${y}$.`],
  };
}

function independentValue(rng: Rng): Out {
  const f: Fn = { a: rng.int(2, 9), b: rng.int(1, 15) };
  const x = rng.int(3, 15);
  const y = val(f, x);
  return {
    prompt: `A function has the equation $y = ${rhs(f)}$. What value of $x$ gives $y = ${y}$?`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: ['Work backwards: undo the last step first. Or guess a value of $x$, check it, and adjust your guess.', `Subtract $${f.b}$ from $${y}$, then divide by $${f.a}$.`],
    solution: [`The rule multiplies $x$ by $${f.a}$, then adds $${f.b}$. To work backwards, undo each step in reverse order.`, ...backSteps(f, y), `When $y = ${y}$, $x = ${x}$.`],
  };
}

function valueProblem(rng: Rng): Out {
  const c = pickCtx(rng);
  const inverse = rng.chance(0.55);
  const lo = c.xs[c.xs.length - 1] + 1;
  const x = rng.int(Math.min(lo, c.xMax), c.xMax);
  const y = val(c.f, x);
  const eq = `$${c.dv} = ${rhs(c.f, c.iv)}$`;
  const intro = `${c.story} The equation ${eq} represents this function, where $${c.iv}$ is ${c.ind} and $${c.dv}$ is ${c.dep}.`;
  if (inverse) {
    return {
      prompt: `${intro} ${c.inv(y)}`,
      parts: [numPart(x, { suffix: c.xUnit })],
      hints: [`You know the dependent variable: $${c.dv} = ${y}$. You need the independent variable $${c.iv}$.`, c.f.dec ? `Work backwards: how much has the candle burned? Divide that by $${c.f.a}$.` : `Work backwards: ${c.f.b ? `subtract $${c.f.b}$, then ` : ''}divide by $${c.f.a}$. Or guess and check.`],
      solution: [`Put $${c.dv} = ${y}$ into the equation: $${y} = ${rhs(c.f, c.iv)}$.`, ...backSteps(c.f, y, c.iv, c.dv), `The answer is ${c.xSay(x)}.`],
    };
  }
  return {
    prompt: `${intro} ${c.fwd(x)}`,
    parts: [numPart(y, c.money ? { label: '\\$' } : { suffix: c.yUnit || undefined })],
    hints: [`Replace $${c.iv}$ with $${x}$ in the equation.`, c.f.dec ? 'Multiply first, then subtract.' : 'Multiply first, then add.'],
    solution: [`Replace $${c.iv}$ with $${x}$.`, `$${c.dv} = ${sub(c.f, x)}$`, `The answer is ${c.ySay(y)}.`],
  };
}

const functionValues = skill({
  id: 'm6-function-values',
  name: 'Finding values of a function',
  description: 'Find the dependent value for a given independent value, find the independent value for a given dependent value, and solve problems involving functions.',
  outcomes: ['P1'],
  lessonId: 'm6-11-2',
  gen(rng, d: Difficulty) {
    if (d === 1) return dependentValue(rng);
    if (d === 2) return independentValue(rng);
    return valueProblem(rng);
  },
});

export const FUNCTIONS_SKILLS: SkillDef[] = [functionVariables, functionTable, functionEquation, functionValues];
