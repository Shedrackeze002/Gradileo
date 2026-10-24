/** Math 6 Unit 1 — Positive and Negative Numbers (N1). Magnitude, opposites, comparing and ordering, and sums with zero. */
import { fixedChoice, mc, multi, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Figure, Part, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook', 'Northfield', 'Elmwood'];
const LAKES = ['Willow Lake', 'Heron Lake', 'Otter Lake', 'Silver Lake', 'Cedar Lake', 'Maple Lake', 'Swan Lake', 'Fox Lake'];

const MINUS = '−';
/** A plain-text label for a figure: −5, 3. */
const lab = (v: number) => (v < 0 ? `${MINUS}${-v}` : `${v}`);
/** A number in a sum, in brackets when negative: 5, (−3). */
const br = (n: number) => (n < 0 ? `(${n})` : `${n}`);
/** A Celsius temperature inside maths. */
const cM = (t: number) => `${t}^\\circ\\text{C}`;
const deg = (t: number) => `$${cM(t)}$`;
/** A height in metres as inline maths. */
const mt = (h: number) => `$${h}\\ \\text{m}$`;
const plural = (n: number, one: string, many: string) => (Math.abs(n) === 1 ? one : many);
/** An integer answer: the student types the value, not a calculation. */
const intPart = (v: number, opts: { label?: string; suffix?: string } = {}): Part => numPart(v, { ...opts, exact: false });
const inl = (v: number) => `$${v}$`;
const IDS = 'abcdefgh';

/**
 * A number line that shows 0 and every value. Short ranges label every tick; longer ones use
 * symmetric ranges whose labelled ticks fall on even numbers, multiples of 3 or multiples of 5.
 */
function numberLine(points: Array<{ value: number; label: string }>, extra: number[] = []): Figure {
  const vals = [0, ...points.map((p) => p.value), ...extra];
  const lo = Math.min(...vals) - 1;
  const hi = Math.max(...vals) + 1;
  if (hi - lo <= 11) {
    const pad = 11 - (hi - lo);
    const min = lo - Math.floor(pad / 2);
    return { type: 'numberLine', min, max: min + 11, step: 1, points };
  }
  const m = Math.max(...vals.map(Math.abs));
  const R = [6, 8, 12, 20].find((r) => m <= r - 1) ?? 25;
  return { type: 'numberLine', min: -R, max: R, step: R === 25 ? 5 : 1, points };
}

/** Scales for a vertical number line: every tick drawn, labels on friendly numbers. */
const V_SCALES = [
  { min: -10, max: 10, step: 1 },
  { min: -15, max: 15, step: 1 },
  { min: -20, max: 20, step: 2 },
];

/**
 * A vertical number line drawn as a coordinate axis: up is positive, down is negative. Points sit
 * on the line with labels to the right. With `thermo`, a thermometer tube is filled up to that value.
 */
function vertical(
  scale: { min: number; max: number; step: number },
  points: Array<{ v: number; label: string }>,
  opts: { yLabel: string; caption: string; thermo?: number },
): Figure {
  const pts: PlanePoint[] = points.map((p) => ({ x: opts.thermo === undefined ? 0 : 1.3, y: p.v, label: p.label }));
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; fill?: boolean }> = [];
  if (opts.thermo !== undefined) {
    const [x0, x1] = [1.1, 1.5];
    polylines.push({ points: [[x0, scale.min], [x1, scale.min], [x1, scale.max], [x0, scale.max], [x0, scale.min]], color: 'muted' });
    polylines.push({ points: [[x0, scale.min], [x1, scale.min], [x1, opts.thermo], [x0, opts.thermo], [x0, scale.min]], color: 'accent', fill: true });
  }
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 4, yMin: scale.min, yMax: scale.max, xStep: 10, yStep: scale.step, yLabel: opts.yLabel },
    points: pts,
    polylines,
    caption: opts.caption,
  };
}

/** Integer counters on a blank canvas: positive counters in the top row, negative counters below. */
function counters(pos: number, neg: number, caption: string): Figure {
  const cols = Math.max(pos, neg, 1);
  const R = Math.max(cols + 1, 7);
  const off = (R - cols - 1) / 2;
  const points: PlanePoint[] = [];
  for (let i = 0; i < pos; i++) points.push({ x: off + i + 1, y: 2, color: 'brand', label: '+' });
  for (let i = 0; i < neg; i++) points.push({ x: off + i + 1, y: 1, color: 'accent', open: true, label: MINUS });
  return { type: 'plane', grid: { xMin: 0, xMax: R, yMin: 0, yMax: 3, step: R + 1 }, points, hideTickLabels: true, caption };
}

const COUNTER_KEY = 'Each filled counter (+) stands for $1$. Each open counter ($-$) stands for $-1$.';

/** Distinct integers in [lo, hi], at least `gap` apart, passing `ok`. */
function distinct(rng: Rng, n: number, lo: number, hi: number, gap = 1, ok: (v: number[]) => boolean = () => true): number[] {
  return retry(
    () => Array.from({ length: n }, () => rng.int(lo, hi)),
    (v) => v.every((x, i) => v.every((y, j) => i === j || Math.abs(x - y) >= gap)) && ok(v),
    300,
  );
}

/** An order question; the items are shown in a scrambled order that is never already sorted either way. */
function orderPart(rng: Rng, values: number[], show: (v: number) => string, ascending: boolean): { part: Part; sorted: number[] } {
  const sorted = [...values].sort((a, b) => (ascending ? a - b : b - a));
  const shown = retry(() => rng.shuffle(values), (v) => v.some((x, i) => x !== sorted[i]) && v.some((x, i) => x !== sorted[sorted.length - 1 - i]));
  const items: Choice[] = shown.map((v, i) => ({ id: IDS[i], md: show(v) }));
  const idOf = (v: number) => items[shown.indexOf(v)].id;
  return { part: { answer: { kind: 'order', items, correctOrder: sorted.map(idOf) } }, sorted };
}

const LEFT_LESS = 'On a number line, numbers get greater as you move right. The number farther to the left is less.';
const NEG_TIP = 'For negative numbers, the farther a number is from $0$, the less it is: $-12$ is less than $-5$.';

// ---------------------------------------------------------------------------
// 1.1 Negative numbers and magnitude
// ---------------------------------------------------------------------------

/** A situation that a positive or negative number describes. */
const SITUATIONS: Array<(rng: Rng) => { text: string; v: number; why: string }> = [
  (rng) => {
    const v = rng.int(2, 25);
    return { text: `a temperature of $${v}$ degrees below zero in ${rng.pick(TOWNS)}`, v: -v, why: 'Below zero means negative.' };
  },
  (rng) => {
    const v = rng.int(2, 25);
    return { text: `a temperature of $${v}$ degrees above zero on a spring day`, v, why: 'Above zero means positive.' };
  },
  (rng) => {
    const v = rng.int(2, 20);
    return { text: `${rng.pick(NAMES)} owes a friend \\$${v} (a debt)`, v: -v, why: 'Money that is owed is a debt. A debt is written as a negative number.' };
  },
  (rng) => {
    const v = rng.int(5, 40);
    return { text: `${rng.pick(NAMES)} has \\$${v} saved in a piggy bank`, v, why: 'Money that is saved is positive.' };
  },
  (rng) => {
    const v = rng.int(2, 15);
    return { text: `a loon dives $${v}$ metres below the surface of ${rng.pick(LAKES)}`, v: -v, why: 'The surface of the lake is $0$. Below the surface is negative.' };
  },
  (rng) => {
    const v = rng.int(2, 20);
    return { text: `an osprey flies $${v}$ metres above the surface of ${rng.pick(LAKES)}`, v, why: 'The surface of the lake is $0$. Above the surface is positive.' };
  },
  (rng) => {
    const v = rng.int(1, 4);
    return { text: `an elevator stops $${v}$ ${plural(v, 'floor', 'floors')} below the ground floor of a parkade`, v: -v, why: 'The ground floor is $0$. Floors below it are negative.' };
  },
  (rng) => {
    const v = rng.int(2, 9);
    return { text: `an ice-fishing line hangs $${v}$ metres below the top of the ice on ${rng.pick(LAKES)}`, v: -v, why: 'The top of the ice is $0$. Below it is negative.' };
  },
];

function negD1(rng: Rng): Out {
  const kind = rng.pick(['write', 'write', 'read', 'opposite', 'sign'] as const);
  if (kind === 'write') {
    const s = rng.pick(SITUATIONS)(rng);
    return {
      prompt: `Write a positive or negative number for this situation: ${s.text}.`,
      parts: [intPart(s.v)],
      hints: ['Is it above or below zero? Is the money saved or owed?', 'Use a negative sign ($-$) for below zero, below the surface, or money that is owed.'],
      solution: [s.why, `The number is $${s.v}$.`],
    };
  }
  if (kind === 'read') {
    const v = retry(() => rng.nonZero(-9, 9), (x) => Math.abs(x) >= 2);
    const fig = numberLine([{ value: v, label: 'A' }]);
    return {
      prompt: 'What number is at point $A$ on the number line?',
      figure: fig,
      parts: [intPart(v, { label: '$A =$' })],
      hints: ['Find $0$ first. Is point $A$ to the left or to the right of $0$?', 'Count the steps from $0$ to point $A$. Numbers to the left of $0$ are negative.'],
      solution: [
        `Point $A$ is $${Math.abs(v)}$ ${plural(v, 'step', 'steps')} to the ${v < 0 ? 'left' : 'right'} of $0$.`,
        v < 0 ? 'Numbers to the left of $0$ are negative.' : 'Numbers to the right of $0$ are positive.',
        `Point $A$ is at $${v}$.`,
      ],
    };
  }
  if (kind === 'opposite') {
    const v = retry(() => rng.nonZero(-15, 15), (x) => Math.abs(x) >= 2);
    return {
      prompt: `What is the opposite of $${v}$?`,
      figure: numberLine([{ value: v, label: lab(v) }], [-v]),
      parts: [intPart(-v)],
      hints: ['Opposite numbers are the same distance from $0$, on opposite sides of $0$.', `$${v}$ is $${Math.abs(v)}$ units to the ${v < 0 ? 'left' : 'right'} of $0$. Go the same distance the other way.`],
      solution: [
        `$${v}$ is $${Math.abs(v)}$ units to the ${v < 0 ? 'left' : 'right'} of $0$.`,
        `Its opposite is $${Math.abs(v)}$ units to the ${v < 0 ? 'right' : 'left'} of $0$.`,
        `The opposite of $${v}$ is $${-v}$.`,
      ],
    };
  }
  const v = rng.chance(0.2) ? 0 : rng.nonZero(-20, 20);
  const plus = v > 0 && rng.chance(0.4);
  const shown = plus ? `+${v}` : `${v}`;
  const idx = v > 0 ? 0 : v < 0 ? 1 : 2;
  return {
    prompt: `Is the number $${shown}$ positive, negative, or neither?`,
    parts: [{ answer: fixedChoice(['Positive', 'Negative', 'Neither positive nor negative'], idx) }],
    hints: ['Positive numbers are to the right of $0$. Negative numbers are to the left of $0$ and have a negative sign.', 'Where is $0$ itself?'],
    solution:
      v === 0
        ? ['$0$ is not to the left or to the right of itself.', 'Zero is neither positive nor negative.']
        : v > 0
          ? [plus ? `The $+$ sign means positive. $+${v}$ is the same number as $${v}$.` : `$${v}$ has no negative sign, so it is positive.`, `$${shown}$ is to the right of $0$. It is positive.`]
          : [`$${v}$ has a negative sign.`, `$${v}$ is to the left of $0$. It is negative.`],
  };
}

function negD2(rng: Rng): Out {
  const kind = rng.pick(['magnitude', 'thermo', 'bigger', 'both'] as const);
  if (kind === 'magnitude') {
    if (rng.chance(0.5)) {
      const v = retry(() => rng.nonZero(-19, 19), (x) => Math.abs(x) >= 3);
      return {
        prompt: `What is the magnitude of $${v}$? (How many units is it from $0$ on the number line?)`,
        figure: numberLine([{ value: v, label: lab(v) }]),
        parts: [intPart(Math.abs(v))],
        hints: ['Magnitude is the distance from $0$. It does not depend on which side of $0$ the number is on.', `Count the units from $0$ to $${v}$.`],
        solution: [`$${v}$ is $${Math.abs(v)}$ units ${v < 0 ? 'to the left of' : 'to the right of'} $0$.`, `Distance is never negative. The magnitude of $${v}$ is $${Math.abs(v)}$.`],
      };
    }
    const d = rng.int(3, 18);
    const lake = rng.pick(LAKES);
    const who = rng.pick(['A scuba diver', 'A fish', 'An anchor', 'A diving loon']);
    return {
      prompt: `${who} in ${lake} is at a height of ${mt(-d)}. Heights are measured from the surface of the water, which is $0\\ \\text{m}$. How far below the surface is it?`,
      parts: [intPart(d, { suffix: 'm' })],
      hints: ['The negative sign tells the direction: below the surface.', 'The magnitude tells the distance from $0$.'],
      solution: [`The negative sign in ${mt(-d)} means below the surface.`, `The magnitude of $${-d}$ is $${d}$.`, `It is $${d}$ m below the surface.`],
    };
  }
  if (kind === 'thermo') {
    const scale = rng.pick(V_SCALES);
    const lim = scale.max - 1;
    const neg = rng.chance(0.8);
    const v = retry(() => (neg ? -rng.int(1, lim) : rng.int(1, Math.min(lim, 8))), (x) => scale.step === 1 || x % 2 === 0);
    const town = rng.pick(TOWNS);
    const time = rng.pick(['7 a.m.', '6 a.m.', 'noon', '5 p.m.', '9 p.m.']);
    return {
      prompt: `At ${time}, the thermometer shows the temperature in ${town}. The scale is in degrees Celsius. What is the temperature?`,
      figure: vertical(scale, [{ v, label: time }], { yLabel: 'Temperature (°C)', caption: `A thermometer scale from ${lab(scale.min)} to ${scale.max} degrees`, thermo: v }),
      parts: [intPart(v, { suffix: '°C' })],
      hints: [`Each line on this scale is $${scale.step}$ ${plural(scale.step, 'degree', 'degrees')}. Find $0$ first.`, 'Temperatures below $0$ are negative.'],
      solution: [
        `The top of the coloured bar is ${v < 0 ? 'below' : 'above'} $0$, so the temperature is ${v < 0 ? 'negative' : 'positive'}.`,
        `It is $${Math.abs(v)}$ degrees ${v < 0 ? 'below' : 'above'} $0$.`,
        `The temperature is ${deg(v)}.`,
      ],
      answerDisplay: deg(v),
    };
  }
  if (kind === 'bigger') {
    const same = rng.chance(0.2);
    const a = -rng.int(2, 19);
    const b = same ? -a : retry(() => rng.int(2, 19), (x) => x !== -a);
    const [x, y] = rng.chance(0.5) ? [a, b] : [b, a];
    const idx = same ? 2 : Math.abs(x) > Math.abs(y) ? 0 : 1;
    const big = Math.abs(x) > Math.abs(y) ? x : y;
    return {
      prompt: `Which number has the greater magnitude: $${x}$ or $${y}$?`,
      figure: numberLine([{ value: x, label: lab(x) }, { value: y, label: lab(y) }]),
      parts: [{ answer: fixedChoice([inl(x), inl(y), 'They have the same magnitude'], idx) }],
      hints: ['Magnitude is the distance from $0$. Ignore the sign.', `How far is $${x}$ from $0$? How far is $${y}$ from $0$?`],
      solution: [
        `$${x}$ is $${Math.abs(x)}$ units from $0$. $${y}$ is $${Math.abs(y)}$ units from $0$.`,
        same ? `They are the same distance from $0$. They are opposites, so they have the same magnitude.` : `$${Math.max(Math.abs(x), Math.abs(y))}$ is more than $${Math.min(Math.abs(x), Math.abs(y))}$, so $${big}$ has the greater magnitude.`,
      ],
    };
  }
  const v = rng.int(3, 19);
  return {
    prompt: `Which two numbers are exactly $${v}$ units from $0$ on a number line? Enter both numbers, separated by a comma.`,
    parts: [{ answer: { kind: 'numbers', values: [v, -v] } }],
    hints: ['Go the same distance from $0$ in both directions.', `One number is to the right of $0$. The other is to the left of $0$.`],
    solution: [`Moving $${v}$ units right from $0$ lands on $${v}$.`, `Moving $${v}$ units left from $0$ lands on $${-v}$.`, `The numbers are $${v}$ and $${-v}$. They are opposites with a magnitude of $${v}$.`],
  };
}

function negD3(rng: Rng): Out {
  const kind = rng.pick(['apart', 'gap', 'debt', 'height'] as const);
  if (kind === 'apart') {
    const v = rng.nonZero(-12, 12);
    const a = Math.abs(v) < 3 ? 3 * Math.sign(v) : v;
    return {
      prompt: `Point $A$ is at $${a}$ on a number line. Point $B$ is at the opposite of $${a}$. How many units apart are points $A$ and $B$?`,
      figure: numberLine([{ value: a, label: 'A' }], [-a]),
      parts: [intPart(2 * Math.abs(a), { suffix: 'units' })],
      hints: ['Opposites are the same distance from $0$, on opposite sides.', `Find how far each point is from $0$, then add the two distances.`],
      solution: [
        `Point $B$ is at $${-a}$.`,
        `$${a}$ is $${Math.abs(a)}$ units from $0$, and $${-a}$ is also $${Math.abs(a)}$ units from $0$.`,
        `They are on opposite sides of $0$, so add: $${Math.abs(a)} + ${Math.abs(a)} = ${2 * Math.abs(a)}$.`,
        `Points $A$ and $B$ are $${2 * Math.abs(a)}$ units apart.`,
      ],
    };
  }
  if (kind === 'gap') {
    const h = rng.int(2, 15);
    return {
      prompt: `Two numbers are opposites. On a number line, they are $${2 * h}$ units apart. What are the two numbers? Enter both, separated by a comma.`,
      parts: [{ answer: { kind: 'numbers', values: [h, -h] } }],
      hints: ['Opposites are the same distance from $0$. So $0$ is exactly halfway between them.', `Each number is half of $${2 * h}$ units from $0$.`],
      solution: [`$0$ is halfway between two opposites.`, `Half of $${2 * h}$ is $${h}$, so each number is $${h}$ units from $0$.`, `The numbers are $${h}$ and $${-h}$.`],
    };
  }
  if (kind === 'debt') {
    const name = rng.pick(NAMES);
    const d = rng.int(4, 20);
    const who = rng.pick(['a sister', 'a brother', 'a friend', 'a cousin', 'a parent']);
    return {
      prompt: `${name} borrowed \\$${d} from ${who} and owes it back. (a) Write ${name}’s money as a positive or negative number. (b) How many dollars must ${name} earn to pay back the debt and have exactly \\$0?`,
      parts: [intPart(-d, { label: '(a)' }), intPart(d, { label: '(b) \\$' })],
      hints: ['Money that is owed is a debt. A debt is negative.', 'A number plus its opposite is $0$. What is the opposite of the debt?'],
      solution: [
        `${name} owes \\$${d}, so the number is $${-d}$.`,
        `To get to $0$, add the opposite of $${-d}$, which is $${d}$: $${-d} + ${d} = 0$.`,
        `(a) $${-d}$ (b) ${name} must earn \\$${d}.`,
      ],
    };
  }
  const below = rng.int(2, 9);
  const above = rng.int(2, 9);
  const lake = rng.pick(LAKES);
  const [low, high] = rng.pick([
    ['a diver', 'an eagle'],
    ['a fish', 'a heron in a tree'],
    ['a snorkeller', 'a kite'],
    ['a sunken log', 'a gull'],
  ] as const);
  return {
    prompt: `The vertical number line shows heights compared to the surface of ${lake} ($0\\ \\text{m}$). ${low.charAt(0).toUpperCase() + low.slice(1)} is at ${mt(-below)}. ${high.charAt(0).toUpperCase() + high.slice(1)} is at ${mt(above)}. How many metres apart are they?`,
    figure: vertical(V_SCALES[0], [{ v: above, label: high.replace(/^an? /, '') }, { v: -below, label: low.replace(/^an? /, '') }], { yLabel: 'Height (m)', caption: `Heights compared to the surface of ${lake}` }),
    parts: [intPart(below + above, { suffix: 'm' })],
    hints: ['Use magnitude: how far is each one from the surface ($0$)?', 'One is below $0$ and one is above $0$. Add the two distances.'],
    solution: [
      `${low.charAt(0).toUpperCase() + low.slice(1)} is $${below}$ m below the surface (the magnitude of $${-below}$ is $${below}$).`,
      `${high.charAt(0).toUpperCase() + high.slice(1)} is $${above}$ m above the surface.`,
      `They are on opposite sides of $0$, so add: $${below} + ${above} = ${below + above}$.`,
      `They are $${below + above}$ m apart.`,
    ],
  };
}

const negativeNumbers = skill({
  id: 'm6-negative-numbers',
  name: 'Negative numbers and magnitude',
  description: 'Use negative numbers for temperature, debt and elevation, read horizontal and vertical number lines, and find magnitudes and opposites.',
  outcomes: ['N1'],
  lessonId: 'm6-1-1',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? negD1(rng) : d === 2 ? negD2(rng) : negD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Comparing and ordering
// ---------------------------------------------------------------------------

const SYMBOLS = ['$<$ (is less than)', '$>$ (is greater than)', '$=$ (is equal to)'];

function compareD1(rng: Rng): Out {
  const kind = rng.pick(['symbol', 'symbol', 'extreme', 'colder'] as const);
  if (kind === 'symbol') {
    if (rng.chance(0.15)) {
      const v = rng.int(2, 15);
      const [x, y] = rng.chance(0.5) ? [`+${v}`, `${v}`] : [`${v}`, `+${v}`];
      return {
        prompt: `Which symbol makes this statement true? $${x} \\ \\square\\ ${y}$`,
        parts: [{ answer: fixedChoice(SYMBOLS, 2) }],
        hints: ['A positive number can be written with or without a $+$ sign.', `Where are $+${v}$ and $${v}$ on the number line?`],
        solution: [`$+${v}$ and $${v}$ are the same number. The $+$ sign just says it is positive.`, `$${x} = ${y}$`],
      };
    }
    const bothNeg = rng.chance(0.5);
    const [a, b] = distinct(rng, 2, -15, bothNeg ? -1 : 12, 2, (v) => v.some((x) => x < 0) && v.every((x) => x !== 0));
    const lt = a < b;
    return {
      prompt: `Which symbol makes this statement true? $${a} \\ \\square\\ ${b}$`,
      figure: numberLine([{ value: a, label: lab(a) }, { value: b, label: lab(b) }]),
      parts: [{ answer: fixedChoice(SYMBOLS, lt ? 0 : 1) }],
      hints: [LEFT_LESS, `Find $${a}$ and $${b}$ on the number line. Which one is farther to the left?`],
      solution: [`On the number line, $${a}$ is to the ${lt ? 'left' : 'right'} of $${b}$.`, `So $${a}$ is ${lt ? 'less' : 'greater'} than $${b}$.`, `$${a} ${lt ? '<' : '>'} ${b}$`],
    };
  }
  if (kind === 'extreme') {
    const vals = distinct(rng, 3, -15, 12, 2, (v) => v.filter((x) => x < 0).length >= 2 && !v.includes(0));
    const greatest = rng.chance(0.5);
    const target = greatest ? Math.max(...vals) : Math.min(...vals);
    // The classic mistake: reading −12 as more than −3 because 12 is more than 3.
    const negs = vals.filter((x) => x < 0);
    const trap = greatest ? Math.min(...negs) : Math.max(...negs);
    return {
      prompt: `Which number is the ${greatest ? 'greatest' : 'least'}? $${vals.join(',\\ ')}$`,
      figure: numberLine(vals.map((v) => ({ value: v, label: lab(v) }))),
      parts: [{ answer: mc(rng, inl(target), [inl(trap), ...vals.map(inl)]) }],
      hints: [LEFT_LESS, NEG_TIP],
      solution: [
        `From least to greatest: $${[...vals].sort((x, y) => x - y).join(',\\ ')}$.`,
        `The ${greatest ? 'greatest number is farthest right' : 'least number is farthest left'}: $${target}$.`,
      ],
    };
  }
  const towns = rng.sample(TOWNS, 3);
  const temps = distinct(rng, 3, -25, 4, 2, (v) => v.filter((x) => x < 0).length >= 2);
  const coldest = rng.chance(0.6);
  const target = coldest ? Math.min(...temps) : Math.max(...temps);
  const i = temps.indexOf(target);
  return {
    prompt: `The table shows the temperature in three towns at 7 a.m. on a January morning. Which town was the ${coldest ? 'coldest' : 'warmest'}?`,
    figure: { type: 'table', headers: ['Town', 'Temperature (°C)'], rows: towns.map((t, j) => [t, `${temps[j]}`]) },
    parts: [{ answer: mc(rng, towns[i], towns.filter((_, j) => j !== i)) }],
    hints: [`${coldest ? 'Colder means lower on a thermometer.' : 'Warmer means higher on a thermometer.'} ${LEFT_LESS}`, NEG_TIP],
    solution: [
      `From coldest to warmest: ${[...temps].sort((x, y) => x - y).map(deg).join(', ')}.`,
      `The ${coldest ? 'lowest' : 'highest'} temperature is ${deg(target)}.`,
      `${towns[i]} was the ${coldest ? 'coldest' : 'warmest'}.`,
    ],
  };
}

function compareD2(rng: Rng): Out {
  const kind = rng.pick(['plain', 'temps', 'heights', 'statement'] as const);
  const n = rng.int(4, 5);
  const count = n === 4 ? 'four' : 'five';
  if (kind === 'plain') {
    const vals = distinct(rng, n, -20, 15, 1, (v) => v.filter((x) => x < 0).length >= 2 && v.some((x) => x > 0));
    const up = rng.chance(0.6);
    const { part, sorted } = orderPart(rng, vals, inl, up);
    return {
      prompt: `Put these numbers in order from ${up ? 'least to greatest' : 'greatest to least'}.`,
      parts: [part],
      hints: [LEFT_LESS, NEG_TIP],
      solution: [
        `Negative numbers are less than positive numbers. The negative number farthest from $0$ is the least: $${Math.min(...vals)}$.`,
        `From ${up ? 'least to greatest' : 'greatest to least'}: $${sorted.join(',\\ ')}$`,
      ],
    };
  }
  if (kind === 'temps') {
    const vals = distinct(rng, n, -28, 6, 2, (v) => v.filter((x) => x < 0).length >= 3);
    const up = rng.chance(0.6);
    const { part, sorted } = orderPart(rng, vals, deg, up);
    const town = rng.pick(TOWNS);
    return {
      prompt: `These are the low temperatures in ${town} on ${count} winter days. Put them in order from ${up ? 'coldest to warmest' : 'warmest to coldest'}.`,
      parts: [part],
      hints: ['Picture a thermometer. Colder temperatures are lower down.', NEG_TIP],
      solution: [`On a thermometer, the coldest temperature is the lowest: ${deg(Math.min(...vals))}.`, `From ${up ? 'coldest to warmest' : 'warmest to coldest'}: ${sorted.map(deg).join(', ')}`],
    };
  }
  if (kind === 'heights') {
    const things = rng.sample(['Fish', 'Diver', 'Loon', 'Canoe', 'Dock', 'Eagle', 'Rock', 'Heron', 'Anchor', 'Kite'], n);
    const vals = distinct(rng, n, -9, 9, 2, (v) => v.filter((x) => x < 0).length >= 2 && v.some((x) => x > 0) && !v.includes(0));
    const up = rng.chance(0.5);
    const show = (v: number) => `${things[vals.indexOf(v)]}: ${mt(v)}`;
    const { part, sorted } = orderPart(rng, vals, show, up);
    const lake = rng.pick(LAKES);
    return {
      prompt: `At ${lake}, heights are measured from the surface of the water ($0\\ \\text{m}$). Below the surface is negative. Use the vertical number line to help you put these in order from ${up ? 'lowest to highest' : 'highest to lowest'}.`,
      figure: vertical(V_SCALES[0], [], { yLabel: 'Height (m)', caption: 'A vertical number line. The surface of the water is at 0.' }),
      parts: [part],
      hints: ['On a vertical number line, greater numbers are higher up and less numbers are lower down.', 'The most negative height is the deepest.'],
      solution: [
        `On a vertical number line, the lowest height is the most negative: ${show(Math.min(...vals))}. The highest is ${show(Math.max(...vals))}.`,
        `From ${up ? 'lowest to highest' : 'highest to lowest'}: ${sorted.map(show).join('; ')}`,
      ],
    };
  }
  // Which statement is true?
  const [a, b] = distinct(rng, 2, -15, 12, 2, (v) => v.some((x) => x < 0) && !v.includes(0));
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const [c, d] = distinct(rng, 2, -18, -2, 3, (v) => !v.includes(lo) || !v.includes(hi));
  const k = rng.int(3, 15);
  const trueStmt = rng.chance(0.5) ? `$${lo} < ${hi}$` : `$${hi} > ${lo}$`;
  const far = Math.min(c, d);
  const near = Math.max(c, d);
  return {
    prompt: 'Which statement is true?',
    parts: [{ answer: mc(rng, trueStmt, [`$${lo} > ${hi}$`, `$${far} > ${near}$`, `$${-k} = ${k}$`]) }],
    hints: [LEFT_LESS, `${NEG_TIP} Opposites are not equal.`],
    solution: [
      `$${lo}$ is to the left of $${hi}$, so $${lo} < ${hi}$ (or $${hi} > ${lo}$).`,
      `$${far}$ is farther left than $${near}$, so $${far} > ${near}$ is false.`,
      `$${-k}$ and $${k}$ are opposites. They are on different sides of $0$, so they are not equal.`,
      `The true statement is ${trueStmt}.`,
    ],
  };
}

function compareD3(rng: Rng): Out {
  const kind = rng.pick(['between', 'week', 'next', 'list'] as const);
  if (kind === 'between') {
    const a = rng.int(-12, -2);
    const b = rng.int(Math.max(a + 4, -4), Math.min(a + 16, 9));
    const list = Array.from({ length: b - a - 1 }, (_, i) => a + 1 + i);
    return {
      prompt: `How many integers are between $${a}$ and $${b}$? Do not count $${a}$ and $${b}$.`,
      figure: numberLine([{ value: a, label: lab(a) }, { value: b, label: lab(b) }]),
      parts: [intPart(list.length, { suffix: 'integers' })],
      hints: ['Integers are the whole numbers and their opposites: $\\ldots, -2, -1, 0, 1, 2, \\ldots$', `List the integers from just after $${a}$ to just before $${b}$. Remember to count $0$ if it is between them.`],
      solution: [`The integers between $${a}$ and $${b}$ are $${list.join(',\\ ')}$.`, `There are $${list.length}$ integers between $${a}$ and $${b}$.`],
    };
  }
  if (kind === 'week') {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const { vals, t } = retry(
      () => {
        const vals = distinct(rng, 5, -30, 3, 2, (v) => v.filter((x) => x < 0).length >= 3);
        const ok = [-5, -10, -15, -20].filter((c) => !vals.includes(c) && vals.some((x) => x < c) && vals.filter((x) => x < c).length <= 4);
        return { vals, t: ok.length ? rng.pick(ok) : 0 };
      },
      (o) => o.t !== 0,
    );
    const town = rng.pick(TOWNS);
    const i = vals.indexOf(Math.min(...vals));
    const negs = vals.filter((x) => x < 0);
    const trap = vals.indexOf(Math.max(...negs));
    const others = [trap, ...days.map((_, j) => j)].filter((j) => j !== i);
    const colder = vals.filter((x) => x < t).sort((x, y) => x - y);
    return {
      prompt: `The table shows the low temperature each school day for one week in ${town}. Which day was the coldest? On how many days was the low colder than ${deg(t)}?`,
      figure: { type: 'table', headers: ['Day', 'Low (°C)'], rows: days.map((dd, j) => [dd, `${vals[j]}`]) },
      parts: [{ label: 'Coldest day', answer: mc(rng, days[i], [...new Set(others)].map((j) => days[j])) }, intPart(colder.length, { label: 'Number of days', suffix: 'days' })],
      hints: ['The coldest day has the lowest temperature: the number farthest left on a number line.', `Colder than ${deg(t)} means less than $${t}$: farther left on a number line.`],
      solution: [
        `From coldest to warmest: ${[...vals].sort((x, y) => x - y).map(deg).join(', ')}.`,
        `The lowest is ${deg(vals[i])}, so ${days[i]} was the coldest.`,
        `Temperatures colder than ${deg(t)}: ${colder.map(deg).join(', ')}. That is $${colder.length}$ ${plural(colder.length, 'day', 'days')}.`,
      ],
    };
  }
  if (kind === 'next') {
    const v = rng.int(-15, -2);
    const greatestLess = rng.chance(0.5);
    const ans = greatestLess ? v - 1 : v + 1;
    return {
      prompt: greatestLess ? `What is the greatest integer that is less than $${v}$?` : `What is the least integer that is greater than $${v}$?`,
      figure: numberLine([{ value: v, label: lab(v) }], [ans]),
      parts: [intPart(ans)],
      hints: [
        greatestLess ? `Integers less than $${v}$ are to the left of $${v}$ on the number line.` : `Integers greater than $${v}$ are to the right of $${v}$ on the number line.`,
        `Which of those integers is closest to $${v}$?`,
      ],
      solution: [
        greatestLess
          ? `The integers less than $${v}$ are $${v - 1},\\ ${v - 2},\\ ${v - 3},\\ \\ldots$ They are to the left of $${v}$.`
          : `The integers greater than $${v}$ are $${v + 1},\\ ${v + 2},\\ ${v + 3},\\ \\ldots$ They are to the right of $${v}$.`,
        `The closest one to $${v}$ is $${ans}$, one step to the ${greatestLess ? 'left' : 'right'}.`,
        `The answer is $${ans}$.`,
      ],
    };
  }
  // Which list is in order? Distractors come from real mistakes.
  const vals = distinct(rng, 5, -12, 12, 1, (v) => {
    const negs = v.filter((x) => x < 0);
    const mags = v.map(Math.abs);
    return negs.length >= 2 && negs.length <= 3 && v.some((x) => x > 0) && !v.includes(0) && new Set(mags).size === 5;
  });
  const sorted = [...vals].sort((x, y) => x - y);
  const byMag = [...vals].sort((x, y) => Math.abs(x) - Math.abs(y));
  const negs = sorted.filter((x) => x < 0);
  const pos = sorted.filter((x) => x > 0);
  const negFlip = [...[...negs].reverse(), ...pos];
  const down = [...sorted].reverse();
  const show = (l: number[]) => `$${l.join(',\\ ')}$`;
  return {
    prompt: 'Which list is in order from least to greatest?',
    parts: [{ answer: mc(rng, show(sorted), [show(byMag), show(negFlip), show(down)]) }],
    hints: [LEFT_LESS, NEG_TIP],
    solution: [
      `The negative numbers come first. The one farthest from $0$ is the least: $${negs.join(',\\ ')}$.`,
      `Then the positive numbers: $${pos.join(',\\ ')}$.`,
      `In order from least to greatest: ${show(sorted)}.`,
    ],
  };
}

const compareIntegers = skill({
  id: 'm6-compare-integers',
  name: 'Comparing and ordering positive and negative numbers',
  description: 'Compare positive and negative numbers with <, > and =, and order them using horizontal and vertical number lines.',
  outcomes: ['N1'],
  lessonId: 'm6-1-2',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? compareD1(rng) : d === 2 ? compareD2(rng) : compareD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Sums of positive and negative numbers
// ---------------------------------------------------------------------------

/** Steps for a + b (both non-zero), showing the sum as zero plus another number. */
function sumSteps(a: number, b: number): string[] {
  const r = a + b;
  const sum = `${a} + ${br(b)}`;
  if (a > 0 && b > 0) return [`Both numbers are positive. Add: $${sum} = ${r}$.`];
  if (a < 0 && b < 0) {
    return [
      `Both numbers are negative. A negative plus a negative is more negative.`,
      `Add the magnitudes: $${-a} + ${-b} = ${-r}$. The sum is negative: $${sum} = ${r}$.`,
    ];
  }
  if (r === 0) return [`$${a}$ and $${b}$ are opposites (additive inverses). A number plus its opposite is $0$.`, `$${sum} = 0$`];
  // Split the number with the greater magnitude so that one piece cancels the other number.
  const bigFirst = Math.abs(a) > Math.abs(b);
  const big = bigFirst ? a : b;
  const small = bigFirst ? b : a;
  const rest = big + small; // = r
  const split = `${br(rest)} + ${br(-small)}`;
  const written = bigFirst ? `${split} + ${br(small)}` : `${br(small)} + ${br(-small)} + ${br(rest)}`;
  const zeroLine = bigFirst ? `${br(rest)} + 0` : `0 + ${br(rest)}`;
  return [
    `Split $${big}$ so that one part is the opposite of $${small}$: $${big} = ${split}$.`,
    `$${sum} = ${written}$`,
    `$${-small}$ and $${small}$ are opposites, so they add to $0$: $${sum} = ${zeroLine} = ${r}$.`,
  ];
}

function sumD1(rng: Rng): Out {
  const kind = rng.pick(['opposites', 'box', 'twoNeg', 'counters'] as const);
  if (kind === 'opposites') {
    const v = rng.int(2, 9);
    const [a, b] = rng.chance(0.5) ? [-v, v] : [v, -v];
    return {
      prompt: `The counters model $${a} + ${br(b)}$. ${COUNTER_KEY} What is the sum?`,
      figure: counters(v, v, `${v} positive and ${v} negative counters`),
      parts: [intPart(0)],
      hints: ['A $+1$ counter and a $-1$ counter together make $0$. This is called a zero pair.', 'How many zero pairs can you make? Is anything left over?'],
      solution: [`Each positive counter pairs with a negative counter to make a zero pair.`, `There are $${v}$ zero pairs and nothing is left over.`, `$${a}$ and $${b}$ are opposites, so $${a} + ${br(b)} = 0$.`],
    };
  }
  if (kind === 'box') {
    const v = rng.nonZero(-20, 20);
    const boxFirst = rng.chance(0.4);
    return {
      prompt: `What number goes in the box? $$${boxFirst ? `\\square + ${br(v)}` : `${v} + \\square`} = 0$$`,
      parts: [intPart(-v, { label: '$\\square =$' })],
      hints: ['Which number added to it makes $0$?', 'A number plus its opposite (its additive inverse) is $0$.'],
      solution: [`The opposite of $${v}$ is $${-v}$.`, `$${boxFirst ? `${-v} + ${br(v)}` : `${v} + ${br(-v)}`} = 0$`, `The missing number is $${-v}$.`],
    };
  }
  if (kind === 'twoNeg') {
    const [p, q] = [rng.int(1, 6), rng.int(1, 6)];
    return {
      prompt: `The counters model $${-p} + (${-q})$. ${COUNTER_KEY} What is the sum?`,
      figure: counters(0, p + q, `${p} + ${q} negative counters`),
      parts: [intPart(-p - q)],
      hints: ['Are there any zero pairs?', 'All the counters are negative. Count them.'],
      solution: [`$${-p}$ is $${p}$ negative ${plural(p, 'counter', 'counters')} and $${-q}$ is $${q}$ more.`, `There are no zero pairs. There are $${p + q}$ negative counters.`, `$${-p} + (${-q}) = ${-p - q}$`],
    };
  }
  const [p, q] = retry(() => [rng.int(1, 8), rng.int(1, 8)], ([x, y]) => x !== y);
  const posFirst = rng.chance(0.5);
  const a = posFirst ? p : -q;
  const b = posFirst ? -q : p;
  const r = p - q;
  const pairs = Math.min(p, q);
  return {
    prompt: `The counters model $${a} + ${br(b)}$. ${COUNTER_KEY} What is the sum?`,
    figure: counters(p, q, `${p} positive and ${q} negative counters`),
    parts: [intPart(r)],
    hints: ['A $+1$ counter and a $-1$ counter make a zero pair. A zero pair is worth $0$.', 'Make as many zero pairs as you can. What is left?'],
    solution: [
      `There ${p === 1 ? 'is' : 'are'} $${p}$ positive and $${q}$ negative counters.`,
      `Make $${pairs}$ zero ${plural(pairs, 'pair', 'pairs')}. Together they are worth $0$.`,
      `$${Math.abs(r)}$ ${r > 0 ? 'positive' : 'negative'} ${plural(r, 'counter is', 'counters are')} left, so the sum is $0 + ${br(r)} = ${r}$.`,
      `$${a} + ${br(b)} = ${r}$`,
    ],
  };
}

/** A sum written for a select-all question. */
function sumMd(terms: number[]): string {
  return `$${terms.map((t, i) => (i === 0 ? `${t}` : br(t))).join(' + ')}$`;
}

function sumD2(rng: Rng): Out {
  const kind = rng.pick(['mixed', 'mixed', 'twoNeg', 'zeroSums', 'difference'] as const);
  if (kind === 'mixed') {
    const { a, b } = retry(
      () => ({ a: rng.nonZero(-20, 20), b: rng.nonZero(-20, 20) }),
      (o) => o.a > 0 !== o.b > 0 && Math.abs(o.a) !== Math.abs(o.b) && Math.abs(o.a) >= 2 && Math.abs(o.b) >= 2 && Math.abs(o.a + o.b) <= 15,
    );
    return {
      prompt: `Find the sum: $${a} + ${br(b)}$`,
      parts: [intPart(a + b)],
      hints: ['One number is positive and one is negative. Look for a zero pair: a number and its opposite.', `Split the number with the greater magnitude into two parts. Make one part the opposite of the other number.`],
      solution: sumSteps(a, b),
    };
  }
  if (kind === 'twoNeg') {
    const [p, q] = retry(() => [rng.int(2, 12), rng.int(2, 12)], ([x, y]) => x + y <= 20);
    return {
      prompt: `Find the sum: $${-p} + (${-q})$`,
      parts: [intPart(-p - q)],
      hints: ['Both numbers are negative, so there are no zero pairs.', 'Add the magnitudes. The sum of two negative numbers is negative.'],
      solution: sumSteps(-p, -q),
    };
  }
  if (kind === 'zeroSums') {
    const [u, v, w] = rng.sample([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15], 3);
    const three = rng.chance(0.5);
    const s = rng.int(2, 6);
    const t = rng.int(1, 5);
    const options = [
      { md: sumMd([-u, u]), correct: true },
      { md: sumMd([v, -v]), correct: true },
      { md: sumMd([-w, -w]), correct: false },
      { md: sumMd([-u, u + 1]), correct: false },
      three ? { md: sumMd([-(s + t), s, t]), correct: true } : { md: sumMd([w, w]), correct: false },
    ];
    const right = options.filter((o) => o.correct).map((o) => o.md);
    return {
      prompt: 'Which sums are equal to $0$? Select all that apply.',
      parts: [{ answer: multi(rng, options) }],
      hints: ['A number plus its opposite is $0$.', 'Two negative numbers add to a negative number. Two positive numbers add to a positive number.'],
      solution: [
        `$${-u}$ and $${u}$ are opposites, and so are $${v}$ and $${-v}$. Each pair adds to $0$.`,
        ...(three ? [`In ${sumMd([-(s + t), s, t])}, the positive numbers add to $${s} + ${t} = ${s + t}$. That is the opposite of $${-(s + t)}$, so the sum is $0$.`] : [`$${w} + ${w} = ${2 * w}$, not $0$.`]),
        `$${-w} + (${-w}) = ${-2 * w}$, not $0$. $${-u} + ${u + 1} = 1$, not $0$.`,
        `The sums equal to $0$ are ${right.join(', ')}.`,
      ],
    };
  }
  const a = rng.int(2, 15);
  const b = retry(() => rng.int(2, 18), (x) => x !== a);
  if (rng.chance(0.5)) {
    return {
      prompt: `Write the difference as a sum. What number goes in the box? $$${a} - ${b} = ${a} + \\square$$`,
      parts: [intPart(-b, { label: '$\\square =$' })],
      hints: ['Subtracting a number is the same as adding its opposite.', `What is the opposite of $${b}$?`],
      solution: [`Subtracting $${b}$ is the same as adding its opposite, $${-b}$.`, `$${a} - ${b} = ${a} + (${-b})$`, `The missing number is $${-b}$.`],
    };
  }
  return {
    prompt: `Which sum is equal to $${a} - ${b}$?`,
    parts: [{ answer: mc(rng, `$${a} + (${-b})$`, [`$${a} + ${b}$`, `$${-a} + ${b}$`, `$${-a} + (${-b})$`]) }],
    hints: ['Subtracting a number is the same as adding its opposite.', `Keep $${a}$ the same. Change "subtract $${b}$" to "add the opposite of $${b}$".`],
    solution: [`Subtracting $${b}$ is the same as adding $${-b}$.`, `$${a} - ${b} = ${a} + (${-b})$`],
  };
}

function sumD3(rng: Rng): Out {
  const kind = rng.pick(['context', 'difference', 'three', 'makeZero'] as const);
  if (kind === 'context') {
    const c = rng.pick(['warm', 'cool', 'debt', 'dive'] as const);
    const name = rng.pick(NAMES);
    if (c === 'warm' || c === 'cool') {
      const { a, b } = retry(
        () => ({ a: rng.nonZero(-15, 10), b: rng.int(3, 15) }),
        (o) => (c === 'warm' ? o.a < 0 : o.a > 0) && o.a + (c === 'warm' ? o.b : -o.b) !== 0 && Math.abs(o.a) !== o.b && Math.abs(o.a) >= 2,
      );
      const bb = c === 'warm' ? b : -b;
      const r = a + bb;
      const town = rng.pick(TOWNS);
      return {
        prompt: `At ${c === 'warm' ? '7 a.m.' : 'noon'} the temperature in ${town} was ${deg(a)}. By ${c === 'warm' ? 'noon' : '9 p.m.'} it had ${c === 'warm' ? 'risen' : 'dropped'} by $${b}$ degrees. Write a sum for the new temperature, then find it.`,
        parts: [intPart(r, { suffix: '°C', label: 'New temperature' })],
        hints: [c === 'warm' ? 'A rise is a positive change.' : 'A drop is a negative change.', `Find $${a} + ${br(bb)}$. Look for a number and its opposite.`],
        solution: [`New temperature = start + change = $${a} + ${br(bb)}$.`, ...sumSteps(a, bb), `The new temperature is ${deg(r)}.`],
        answerDisplay: deg(r),
      };
    }
    if (c === 'debt') {
      const { d, e } = retry(() => ({ d: rng.int(3, 18), e: rng.int(2, 18) }), (o) => o.d !== o.e);
      const r = -d + e;
      return {
        prompt: `${name} owes a sister \\$${d}, so ${name}’s money is $${-d}$ dollars. Then ${name} earns \\$${e} shovelling snow. Write a sum for ${name}’s money now and find it. (Use a negative number if ${name} still owes money.)`,
        parts: [intPart(r, { label: 'Money now (dollars)' })],
        hints: ['Money earned is positive. Add it to the debt.', `Find $${-d} + ${e}$. Look for a number and its opposite.`],
        solution: [`Money now = $${-d} + ${e}$.`, ...sumSteps(-d, e), r < 0 ? `${name} still owes \\$${-r}, so the number is $${r}$.` : `${name} has paid the debt and has \\$${r} left, so the number is $${r}$.`],
      };
    }
    const { a, b } = retry(() => ({ a: rng.int(3, 15), b: rng.int(2, 12) }), (o) => o.b < o.a);
    const r = -a + b;
    return {
      prompt: `A diver is at ${mt(-a)} (below the surface of ${rng.pick(LAKES)}). She swims up $${b}$ m. Write a sum for her new height and find it.`,
      parts: [intPart(r, { suffix: 'm', label: 'New height' })],
      hints: ['Swimming up is a positive change.', `Find $${-a} + ${b}$.`],
      solution: [`New height = $${-a} + ${b}$.`, ...sumSteps(-a, b), `Her new height is ${mt(r)}, still below the surface.`],
    };
  }
  if (kind === 'difference') {
    const a = rng.int(2, 12);
    const b = retry(() => rng.int(3, 20), (x) => x > a && x - a <= 15);
    return {
      prompt: `Write $${a} - ${b}$ as a sum: $$${a} - ${b} = ${a} + \\square$$ What number goes in the box? Then find the value of $${a} - ${b}$.`,
      parts: [intPart(-b, { label: '$\\square =$' }), intPart(a - b, { label: `$${a} - ${b} =$` })],
      hints: ['Subtracting a number is the same as adding its opposite.', `Find $${a} + (${-b})$ by splitting $${-b}$ into two parts.`],
      solution: [`Subtracting $${b}$ is the same as adding $${-b}$: $${a} - ${b} = ${a} + (${-b})$.`, ...sumSteps(a, -b), `So $${a} - ${b} = ${a - b}$.`],
    };
  }
  if (kind === 'three') {
    const { v, w } = retry(() => ({ v: rng.nonZero(-15, 15), w: rng.nonZero(-15, 15) }), (o) => Math.abs(o.v) >= 3 && Math.abs(o.w) >= 2 && Math.abs(o.v) !== Math.abs(o.w));
    const order = rng.pick([[v, w, -v], [w, v, -v], [v, -v, w]] as const);
    const expr = order.map((t, i) => (i === 0 ? `${t}` : br(t))).join(' + ');
    return {
      prompt: `Find the sum: $${expr}$`,
      parts: [intPart(w)],
      hints: ['Look for two numbers that are opposites.', 'You can add numbers in any order. A number plus its opposite is $0$.'],
      solution: [
        `$${v}$ and $${-v}$ are opposites, so they add to $0$.`,
        `You can add in any order. Add the opposites first: $${v} + ${br(-v)} = 0$.`,
        `That leaves $0 + ${br(w)} = ${w}$. The sum is $${w}$.`,
      ],
    };
  }
  const { a, b } = retry(() => ({ a: rng.nonZero(-12, 12), b: rng.nonZero(-12, 12) }), (o) => o.a + o.b !== 0 && Math.abs(o.a + o.b) <= 15 && (o.a < 0 || o.b < 0) && Math.abs(o.a) !== Math.abs(o.b));
  const s = a + b;
  return {
    prompt: `What number goes in the box to make the sum zero? $$${a} + ${br(b)} + \\square = 0$$`,
    parts: [intPart(-s, { label: '$\\square =$' })],
    hints: [`First find $${a} + ${br(b)}$.`, 'Then the box must be the opposite of that sum.'],
    solution: [...sumSteps(a, b), `The opposite of $${s}$ is $${-s}$, and $${s} + ${br(-s)} = 0$.`, `The missing number is $${-s}$.`],
  };
}

const integerSums = skill({
  id: 'm6-integer-sums',
  name: 'Sums of positive and negative numbers',
  description: 'Model sums of integers, including a number and its opposite, as zero plus another number, and write a difference as a sum.',
  outcomes: ['N1'],
  lessonId: 'm6-1-3',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? sumD1(rng) : d === 2 ? sumD2(rng) : sumD3(rng);
  },
});

export const INTEGERS_SKILLS: SkillDef[] = [negativeNumbers, compareIntegers, integerSums];
