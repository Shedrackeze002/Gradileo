/** Math 10-4 Unit 4 — Integers (N1, N2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { paren } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi',
];
const TOWNS = ['Ashford', 'Clearwater', 'Riverton', 'Brookfield', 'Lakeside', 'Hillcrest', 'Pinewood', 'Stonebridge', 'Westbury'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };

const MINUS = '−';
/** A Celsius temperature inside maths. */
const cM = (t: number) => `${t}^\\circ\\text{C}`;
/** A Celsius temperature as inline maths. */
const deg = (t: number) => `$${cM(t)}$`;
/** Whole-dollar money in prose: \$45 or −\$45. */
const dol = (x: number) => (x < 0 ? `${MINUS}\\$${-x}` : `\\$${x}`);
/** Plain-text money for table cells (cells are not Markdown; a leading - is drawn as a minus sign). */
const cellD = (x: number) => (x < 0 ? `-$${-x}` : `$${x}`);
/** A label for a number line point. */
const lab = (v: number) => (v < 0 ? `${MINUS}${-v}` : `${v}`);

/**
 * A number line that shows 0 and every value. Step-1 lines use ranges whose labelled ticks
 * fall on even numbers, multiples of 3 or multiples of 5.
 */
function numberLine(points: Array<{ value: number; label: string }>): Figure {
  const m = Math.max(...points.map((p) => Math.abs(p.value)));
  const R = [6, 8, 12, 20].find((r) => m <= r - 1);
  if (R !== undefined) return { type: 'numberLine', min: -R, max: R, step: 1, points };
  const lo = Math.min(0, ...points.map((p) => p.value));
  const hi = Math.max(0, ...points.map((p) => p.value));
  const step = [5, 10, 20, 50, 100].find((s) => (Math.ceil(hi / s) - Math.floor(lo / s)) <= 10) ?? 100;
  return { type: 'numberLine', min: Math.floor(lo / step) * step - step, max: Math.ceil(hi / step) * step + step, step, points };
}

/** Distinct integers in [lo, hi] at least `gap` apart. */
function distinct(rng: Rng, n: number, lo: number, hi: number, gap = 1, ok: (v: number[]) => boolean = () => true): number[] {
  return retry(
    () => Array.from({ length: n }, () => rng.int(lo, hi)),
    (v) => v.every((x, i) => v.every((y, j) => i === j || Math.abs(x - y) >= gap)) && ok(v),
    200,
  );
}

const IDS = 'abcdefgh';

/** An order question; the items are shown in a scrambled order that is never already sorted. */
function orderPart(rng: Rng, values: number[], show: (v: number) => string, ascending: boolean): { part: Part; sorted: number[] } {
  const sorted = [...values].sort((a, b) => (ascending ? a - b : b - a));
  const shown = retry(() => rng.shuffle(values), (v) => v.some((x, i) => x !== sorted[i]) && v.some((x, i) => x !== sorted[sorted.length - 1 - i]));
  const items: Choice[] = shown.map((v, i) => ({ id: IDS[i], md: show(v) }));
  const idOf = (v: number) => items[shown.indexOf(v)].id;
  return { part: { answer: { kind: 'order', items, correctOrder: sorted.map(idOf) } }, sorted };
}

// ---------------------------------------------------------------------------
// 4.1 Comparing and ordering integers
// ---------------------------------------------------------------------------

const LEFT_LESS = 'On a number line, numbers get bigger as you move right. The number farther to the left is less.';
const NEG_TIP = 'For negative numbers, the bigger the number after the minus sign, the smaller the value: $-20$ is less than $-5$.';

/** A situation that an integer describes. */
const SITUATIONS: Array<(rng: Rng) => { text: string; v: number; why: string }> = [
  (rng) => {
    const v = rng.int(4, 30);
    return { text: `a temperature of $${v}$ degrees below zero`, v: -v, why: 'Below zero means negative.' };
  },
  (rng) => {
    const v = 5 * rng.int(2, 30);
    return { text: `taking \\$${v} out of a bank account`, v: -v, why: 'Taking money out (a withdrawal) makes the balance go down, so it is negative.' };
  },
  (rng) => {
    const v = 5 * rng.int(2, 60);
    return { text: `putting \\$${v} into a bank account`, v, why: 'Putting money in (a deposit) makes the balance go up, so it is positive.' };
  },
  (rng) => {
    const v = rng.int(2, 25);
    return { text: `a diver $${v}$ metres below the surface of a lake`, v: -v, why: 'The surface of the lake is $0$. Below it is negative.' };
  },
  (rng) => {
    const v = rng.int(3, 25);
    return { text: `a football team gaining $${v}$ yards`, v, why: 'A gain is positive.' };
  },
  (rng) => {
    const v = rng.int(2, 15);
    return { text: `a football team losing $${v}$ yards`, v: -v, why: 'A loss is negative.' };
  },
  (rng) => {
    const v = rng.int(2, 15);
    return { text: `the temperature rising $${v}$ degrees`, v, why: 'A rise is positive.' };
  },
  (rng) => {
    const v = rng.int(2, 15);
    return { text: `the temperature dropping $${v}$ degrees`, v: -v, why: 'A drop is negative.' };
  },
  (rng) => {
    const v = rng.int(2, 3);
    return { text: `an underground parking level $${v}$ floors below the street`, v: -v, why: 'The street is level $0$. Below it is negative.' };
  },
];

function compareD1(rng: Rng): Out {
  const kind = rng.pick(['symbol', 'symbol', 'towns', 'write', 'opposite'] as const);
  if (kind === 'symbol') {
    const bothNeg = rng.chance(0.5);
    const [a, b] = distinct(rng, 2, -19, bothNeg ? -1 : 15, 2, (v) => v.some((x) => x < 0));
    const lt = a < b;
    return {
      prompt: `Which symbol makes this statement true? $${a} \\ \\square\\ ${b}$`,
      figure: numberLine([{ value: a, label: lab(a) }, { value: b, label: lab(b) }]),
      parts: [{ answer: fixedChoice(['$<$ (is less than)', '$>$ (is greater than)', '$=$ (is equal to)'], lt ? 0 : 1) }],
      hints: [LEFT_LESS, `Find $${a}$ and $${b}$ on the number line. Which one is farther to the left?`],
      solution: [`On the number line, $${a}$ is to the ${lt ? 'left' : 'right'} of $${b}$.`, `So $${a}$ is ${lt ? 'less' : 'greater'} than $${b}$.`, `$${a} ${lt ? '<' : '>'} ${b}$`],
    };
  }
  if (kind === 'towns') {
    const towns = rng.sample(TOWNS, 3);
    const temps = distinct(rng, 3, -30, 1, 2, (v) => v.filter((x) => x < 0).length >= 2);
    const coldest = rng.chance(0.6);
    const target = coldest ? Math.min(...temps) : Math.max(...temps);
    const i = temps.indexOf(target);
    const order = [...temps].sort((x, y) => x - y);
    return {
      prompt: `The table shows the temperature in three towns at 7 a.m. on a January morning. Which town was the ${coldest ? 'coldest' : 'warmest'}?`,
      figure: { type: 'table', headers: ['Town', 'Temperature (°C)'], rows: towns.map((t, j) => [t, `${temps[j]}`]) },
      parts: [{ answer: mc(rng, towns[i], towns.filter((_, j) => j !== i)) }],
      hints: [`${coldest ? 'Colder means lower.' : 'Warmer means higher.'} ${LEFT_LESS}`, NEG_TIP],
      solution: [
        `Order the temperatures from coldest to warmest: ${order.map(deg).join(', ')}.`,
        `The ${coldest ? 'lowest' : 'highest'} temperature is ${deg(target)}.`,
        `${towns[i]} was the ${coldest ? 'coldest' : 'warmest'}.`,
      ],
    };
  }
  if (kind === 'write') {
    const s = rng.pick(SITUATIONS)(rng);
    return {
      prompt: `Write an integer for this situation: ${s.text}.`,
      parts: [numPart(s.v)],
      hints: ['Is it above or below zero? Is it a gain or a loss? Is money going in or out?', 'Use a negative sign ($-$) for below zero, a loss, a drop, or money taken out.'],
      solution: [s.why, `The integer is $${s.v}$.`],
    };
  }
  const v = retry(() => rng.nonZero(-25, 25), (x) => Math.abs(x) >= 2);
  return {
    prompt: `What is the opposite of $${v}$?`,
    figure: numberLine([{ value: v, label: lab(v) }]),
    parts: [numPart(-v)],
    hints: ['Opposite numbers are the same distance from $0$, on opposite sides of $0$.', `$${v}$ is $${Math.abs(v)}$ units ${v < 0 ? 'left' : 'right'} of $0$.`],
    solution: [`$${v}$ is $${Math.abs(v)}$ units to the ${v < 0 ? 'left' : 'right'} of $0$.`, `Its opposite is $${Math.abs(v)}$ units to the ${v < 0 ? 'right' : 'left'} of $0$.`, `The opposite of $${v}$ is $${-v}$.`],
  };
}

function compareD2(rng: Rng): Out {
  const kind = rng.pick(['temps', 'bank', 'golf', 'depth'] as const);
  const n = rng.int(4, 5);
  if (kind === 'temps') {
    const vals = distinct(rng, n, -32, 8, 2, (v) => v.filter((x) => x < 0).length >= 2 && v.some((x) => x < -9));
    const up = rng.chance(0.6);
    const { part, sorted } = orderPart(rng, vals, deg, up);
    const town = rng.pick(TOWNS);
    return {
      prompt: `These are the low temperatures in ${town} on ${n === 4 ? 'four' : 'five'} winter days. Put them in order from ${up ? 'coldest to warmest' : 'warmest to coldest'}.`,
      parts: [part],
      hints: [LEFT_LESS, NEG_TIP],
      solution: [`Picture the temperatures on a number line. The coldest is farthest left: ${deg(Math.min(...vals))}.`, `From ${up ? 'coldest to warmest' : 'warmest to coldest'}: ${sorted.map(deg).join(', ')}`],
    };
  }
  if (kind === 'bank') {
    const vals = distinct(rng, n, -40, 60, 3, (v) => v.filter((x) => x < 0).length >= 2 && v.some((x) => x > 0)).map((x) => 5 * x);
    const up = rng.chance(0.7);
    const { part, sorted } = orderPart(rng, vals, dol, up);
    return {
      prompt: `A negative bank balance means the account is overdrawn: the person owes the bank money. Put these bank balances in order from ${up ? 'least to greatest' : 'greatest to least'}.`,
      parts: [part],
      hints: ['Owing money is less than having \\$0. The more you owe, the less you have.', NEG_TIP.replace('$-20$ is less than $-5$', 'owing \\$200 is less than owing \\$50')],
      solution: [`Negative balances are less than \\$0. The biggest debt is the least: ${dol(Math.min(...vals))}.`, `From ${up ? 'least to greatest' : 'greatest to least'}: ${sorted.map(dol).join(', ')}`],
    };
  }
  if (kind === 'golf') {
    const players = rng.sample(NAMES, n);
    const vals = distinct(rng, n, -7, 6, 1, (v) => v.filter((x) => x < 0).length >= 2 && v.some((x) => x > 0));
    const show = (v: number) => `${players[vals.indexOf(v)]}: $${v}$`;
    const { part, sorted } = orderPart(rng, vals, show, true);
    return {
      prompt: `In golf, a score is often written compared to par. A score of $-3$ means 3 strokes under par, and $+2$ means 2 strokes over par. The lowest score wins. Put the players in order from first place (lowest score) to last place.`,
      parts: [part],
      hints: [LEFT_LESS, 'Under par (negative) is better than par ($0$). Over par (positive) is worse.'],
      solution: [`The lowest score is $${Math.min(...vals)}$, so ${players[vals.indexOf(Math.min(...vals))]} wins.`, `From lowest to highest: ${sorted.map(show).join(', ')}`],
    };
  }
  const vals = distinct(rng, n, -20, 15, 2, (v) => v.filter((x) => x < 0).length >= 2 && v.some((x) => x > 0));
  const m = (v: number) => `$${v}\\ \\text{m}$`;
  const up = rng.chance(0.6);
  const { part, sorted } = orderPart(rng, vals, m, up);
  return {
    prompt: `At a lake, heights are measured from the surface of the water ($0\\ \\text{m}$). Things below the surface have negative heights. Put these heights in order from ${up ? 'lowest to highest' : 'highest to lowest'}.`,
    parts: [part],
    hints: [LEFT_LESS, 'Deeper under the water means a more negative number.'],
    solution: [`The lowest is the deepest: ${m(Math.min(...vals))}. The highest is ${m(Math.max(...vals))}.`, `From ${up ? 'lowest to highest' : 'highest to lowest'}: ${sorted.map(m).join(', ')}`],
  };
}

function compareD3(rng: Rng): Out {
  const kind = rng.pick(['week', 'months', 'golf'] as const);
  if (kind === 'week') {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const { vals, t } = retry(
      () => {
        const vals = distinct(rng, 5, -38, 2, 2, (v) => v.filter((x) => x < 0).length >= 3);
        const ok = [-5, -10, -15, -20, -25, -30].filter((c) => !vals.includes(c) && vals.filter((x) => x < c).length >= 1 && vals.filter((x) => x < c).length <= 4);
        return { vals, t: ok.length ? rng.pick(ok) : 0 };
      },
      (o) => o.t !== 0,
    );
    const i = vals.indexOf(Math.min(...vals));
    // The classic mistake: the day whose negative number is closest to 0 "looks" smallest.
    const negs = vals.filter((x) => x < 0);
    const trap = vals.indexOf(Math.max(...negs));
    const others = [trap, ...days.map((_, j) => j)].filter((j) => j !== i);
    const colder = vals.filter((x) => x < t).sort((a, b) => a - b);
    const count = colder.length;
    return {
      prompt: `The table shows the low temperature each weekday for one week in a northern town. Which day was the coldest? On how many days was the low colder than ${deg(t)}?`,
      figure: { type: 'table', headers: ['Day', 'Low (°C)'], rows: days.map((d, j) => [d, `${vals[j]}`]) },
      parts: [{ label: 'Coldest day', answer: mc(rng, days[i], [...new Set(others)].map((j) => days[j])) }, numPart(count, { label: 'Number of days', suffix: 'days' })],
      hints: ['The coldest day has the lowest temperature: the number farthest left on a number line.', `Colder than ${deg(t)} means farther left than $${t}$ on a number line.`],
      solution: [
        `From coldest to warmest: ${[...vals].sort((a, b) => a - b).map(deg).join(', ')}.`,
        `The lowest is ${deg(vals[i])}, so ${days[i]} was the coldest.`,
        `Temperatures colder than ${deg(t)}: ${colder.map(deg).join(', ')}. That is $${count}$ ${count === 1 ? 'day' : 'days'}.`,
      ],
    };
  }
  if (kind === 'months') {
    const months = ['January', 'February', 'March', 'April', 'May'];
    const name = rng.pick(NAMES);
    const vals = distinct(rng, 5, -30, 50, 2, (v) => {
      const neg = v.filter((x) => x < 0).length;
      return neg >= 1 && neg <= 3 && !v.includes(0);
    }).map((x) => 5 * x);
    const i = vals.indexOf(Math.min(...vals));
    const negs = vals.filter((x) => x < 0);
    const trap = vals.indexOf(Math.max(...negs));
    const others = [trap, ...months.map((_, j) => j)].filter((j) => j !== i);
    const count = negs.length;
    return {
      prompt: `The table shows ${name}’s bank balance at the end of each month. A negative balance means the account is overdrawn. In which month was the balance the lowest? In how many months was the account overdrawn?`,
      figure: { type: 'table', headers: ['Month', 'Balance'], rows: months.map((m, j) => [m, cellD(vals[j])]) },
      parts: [{ label: 'Lowest month', answer: mc(rng, months[i], [...new Set(others)].map((j) => months[j])) }, numPart(count, { label: 'Months overdrawn', suffix: 'months' })],
      hints: ['The lowest balance is the most negative one. Owing more money is lower.', 'Overdrawn means the balance is less than \\$0. Count the negative balances.'],
      solution: [
        `From lowest to highest: ${[...vals].sort((a, b) => a - b).map(dol).join(', ')}.`,
        `The lowest balance is ${dol(vals[i])}, in ${months[i]}.`,
        count === 1 ? `The only negative balance is ${dol(negs[0])}. The account was overdrawn in $1$ month.` : `The negative balances are ${negs.map(dol).join(', ')}. The account was overdrawn in $${count}$ months.`,
      ],
    };
  }
  const players = rng.sample(NAMES, 5);
  const vals = distinct(rng, 5, -8, 6, 1, (v) => {
    const under = v.filter((x) => x < 0).length;
    return under >= 1 && under <= 4 && v.some((x) => x > 0);
  });
  const i = vals.indexOf(Math.min(...vals));
  const negs = vals.filter((x) => x < 0);
  const trap = negs.length > 1 ? vals.indexOf(Math.max(...negs)) : vals.indexOf(Math.max(...vals));
  const others = [trap, ...players.map((_, j) => j)].filter((j) => j !== i);
  const count = negs.length;
  const sc = (v: number) => (v > 0 ? `+${v}` : `${v}`);
  return {
    prompt: `The table shows golf scores compared to par at a tournament in ${rng.pick(TOWNS)}. A negative score is under par. The lowest score wins. Who won? How many players finished under par?`,
    figure: { type: 'table', headers: ['Player', 'Score'], rows: players.map((p, j) => [p, sc(vals[j])]) },
    parts: [{ label: 'Winner', answer: mc(rng, players[i], [...new Set(others)].map((j) => players[j])) }, numPart(count, { label: 'Under par', suffix: 'players' })],
    hints: ['The lowest score is the number farthest left on a number line.', 'Under par means a negative score. Count the negative scores.'],
    solution: [
      `From lowest to highest: ${[...vals].sort((a, b) => a - b).map((v) => `$${v}$`).join(', ')}.`,
      `The lowest score is $${vals[i]}$, so ${players[i]} won.`,
      count === 1 ? `The only negative score is $${negs[0]}$. That is $1$ player under par.` : `The negative scores are ${negs.map((v) => `$${v}$`).join(', ')}. That is $${count}$ players under par.`,
    ],
  };
}

const integerCompare = skill({
  id: 'm104-integer-compare',
  name: 'Comparing and ordering integers',
  description: 'Use integers for temperatures, money and heights, and compare and order them using a number line.',
  outcomes: ['N1'],
  lessonId: 'm104-4-1',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? compareD1(rng) : d === 2 ? compareD2(rng) : compareD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Adding and subtracting integers
// ---------------------------------------------------------------------------

/** One sentence explaining a + b with the sign rules. */
function addRule(a: number, b: number): string {
  const r = a + b;
  if (a === 0 || b === 0) return `Adding $0$ changes nothing: $${a} + ${paren(b)} = ${r}$`;
  if (a < 0 === b < 0) {
    const s = Math.abs(a) + Math.abs(b);
    return a < 0
      ? `Both numbers are negative. Add $${Math.abs(a)} + ${Math.abs(b)} = ${s}$ and keep the negative sign: $${a} + ${paren(b)} = ${r}$`
      : `Both numbers are positive: $${a} + ${b} = ${r}$`;
  }
  if (r === 0) return `$${a}$ and $${b}$ are opposites, so they add to $0$.`;
  const big = Math.abs(a) > Math.abs(b) ? a : b;
  const diff = Math.abs(Math.abs(a) - Math.abs(b));
  return `The signs are different. Subtract the sizes: $${Math.max(Math.abs(a), Math.abs(b))} - ${Math.min(Math.abs(a), Math.abs(b))} = ${diff}$. The answer takes the sign of $${big}$, so $${a} + ${paren(b)} = ${r}$`;
}

/** Steps for a op b, where op is + or -. Returns the steps and the result. */
function opSteps(a: number, op: '+' | '-', b: number): { steps: string[]; r: number } {
  if (op === '+') return { steps: [addRule(a, b)], r: a + b };
  if (b > 0 && a >= b) return { steps: [`$${a} - ${b} = ${a - b}$`], r: a - b };
  const steps = [`Subtracting a number is the same as adding its opposite: $${a} - ${paren(b)} = ${a} + ${paren(-b)}$`];
  steps.push(addRule(a, -b));
  return { steps, r: a - b };
}

const expr = (a: number, op: string, b: number) => `${a} ${op} ${paren(b)}`;

function moveText(op: '+' | '-', b: number): { text: string; dir: 'right' | 'left' } {
  if (op === '+' && b > 0) return { text: 'Adding a positive number moves right', dir: 'right' };
  if (op === '+') return { text: 'Adding a negative number moves left', dir: 'left' };
  if (b > 0) return { text: 'Subtracting a positive number moves left', dir: 'left' };
  return { text: 'Subtracting a negative number is the same as adding a positive, so move right', dir: 'right' };
}

function addSub(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const { a, b, op } = retry(
      () => ({ a: rng.nonZero(-7, 7), b: rng.nonZero(-7, 7), op: rng.pick(['+', '+', '-'] as const) }),
      (o) => {
        const r = o.op === '+' ? o.a + o.b : o.a - o.b;
        return Math.abs(r) <= 7 && (o.a < 0 || o.b < 0 || r < 0) && !(o.op === '-' && o.b < 0);
      },
    );
    const r = op === '+' ? a + b : a - b;
    const mv = moveText(op, b);
    return {
      prompt: `Find the value of $${expr(a, op, b)}$. Use the number line to help.`,
      figure: { type: 'numberLine', min: -8, max: 8, step: 1, points: [{ value: a, label: 'start' }] },
      parts: [numPart(r)],
      hints: [`Start at $${a}$ on the number line.`, `${mv.text}. Count $${Math.abs(b)}$ steps.`],
      solution: [`Start at $${a}$.`, `${mv.text}: move $${Math.abs(b)}$ ${Math.abs(b) === 1 ? 'step' : 'steps'} ${mv.dir}.`, `You land on $${r}$.`, `$${expr(a, op, b)} = ${r}$`],
    };
  }
  if (d === 2) {
    const { a, b, op } = retry(
      () => ({ a: rng.nonZero(-30, 30), b: rng.nonZero(-30, 30), op: rng.pick(['+', '-'] as const) }),
      (o) => (o.a < 0 || o.b < 0) && Math.abs(o.a) !== Math.abs(o.b) && Math.abs(o.a) >= 4 && Math.abs(o.b) >= 4,
    );
    const { steps, r } = opSteps(a, op, b);
    return {
      prompt: `Find the value of $${expr(a, op, b)}$.`,
      parts: [numPart(r)],
      hints: [
        op === '-' ? 'To subtract, add the opposite: change $-$ to $+$ and change the sign of the second number.' : 'Look at the signs of the two numbers.',
        'Same signs: add the sizes and keep the sign. Different signs: subtract the sizes and use the sign of the number with the bigger size.',
      ],
      solution: [...steps, `$${expr(a, op, b)} = ${r}$`],
    };
  }
  const { a, b, c, op1, op2 } = retry(
    () => ({ a: rng.nonZero(-25, 25), b: rng.nonZero(-25, 25), c: rng.nonZero(-25, 25), op1: rng.pick(['+', '-'] as const), op2: rng.pick(['+', '-'] as const) }),
    (o) => [o.a, o.b, o.c].filter((x) => x < 0).length >= 1 && (o.op1 === '-' || o.op2 === '-') && [o.a, o.b, o.c].every((x) => Math.abs(x) >= 3),
  );
  const s1 = opSteps(a, op1, b);
  const s2 = opSteps(s1.r, op2, c);
  const full = `${a} ${op1} ${paren(b)} ${op2} ${paren(c)}`;
  return {
    prompt: `Find the value of $${full}$.`,
    parts: [numPart(s2.r)],
    hints: ['Work from left to right. Do the first two numbers, then the third.', 'To subtract, add the opposite. Same signs: add and keep the sign. Different signs: subtract the sizes and use the sign of the bigger size.'],
    solution: [`Work from left to right. First: $${expr(a, op1, b)}$`, ...s1.steps, `Next: $${expr(s1.r, op2, c)}$`, ...s2.steps, `$${full} = ${s2.r}$`],
  };
}

const integerAddSub = skill({
  id: 'm104-integer-add-sub',
  name: 'Adding and subtracting integers',
  description: 'Add and subtract positive and negative integers, using a number line or the sign rules.',
  outcomes: ['N2'],
  lessonId: 'm104-4-2',
  calculator: true,
  gen: addSub,
});

// ---------------------------------------------------------------------------
// 4.2 Change in temperature, balance and height
// ---------------------------------------------------------------------------

const RISE_HINT = 'Count from the first number to $0$, then from $0$ to the second number. Or subtract: second − first.';

function changeD1(rng: Rng, name: string): Out {
  const kind = rng.pick(['rise', 'drop', 'deposit', 'spend', 'diver'] as const);
  const town = rng.pick(TOWNS);
  if (kind === 'rise') {
    const t1 = rng.int(-10, -2);
    const t2 = rng.int(2, 10);
    return {
      prompt: `At 7 a.m. the temperature in ${town} was ${deg(t1)}. By 3 p.m. it was ${deg(t2)}. How many degrees did the temperature rise?`,
      figure: numberLine([{ value: t1, label: '7 a.m.' }, { value: t2, label: '3 p.m.' }]),
      parts: [numPart(t2 - t1, { suffix: 'degrees' })],
      hints: [RISE_HINT, `Or subtract: $${t2} - ${paren(t1)}$.`],
      solution: [`From ${deg(t1)} up to ${deg(0)} is $${-t1}$ degrees.`, `From ${deg(0)} up to ${deg(t2)} is $${t2}$ degrees.`, `Add: $${-t1} + ${t2} = ${t2 - t1}$`, `The temperature rose $${t2 - t1}$ degrees.`],
    };
  }
  if (kind === 'drop') {
    const t = rng.int(1, 8);
    const dd = rng.int(t + 2, t + 10);
    const r = t - dd;
    return {
      prompt: `It is ${deg(t)} in ${town} at 5 p.m. By midnight, the temperature drops $${dd}$ degrees. What is the temperature at midnight?`,
      figure: numberLine([{ value: t, label: '5 p.m.' }]),
      parts: [numPart(r, { suffix: '°C' })],
      hints: ['A drop means subtract. Count down on the number line.', `Count down $${t}$ degrees to reach $0$. Then keep counting below $0$.`],
      solution: [`A drop means subtract: $${t} - ${dd}$`, `Count down $${t}$ degrees to reach ${deg(0)}. That leaves $${dd - t}$ more degrees below $0$.`, `$${t} - ${dd} = ${r}$`, `The temperature at midnight is ${deg(r)}.`],
    };
  }
  if (kind === 'deposit') {
    const B = 5 * rng.int(2, 10);
    const D = 5 * rng.int(B / 5 + 2, B / 5 + 16);
    return {
      prompt: `${name}’s bank account is overdrawn. The balance is ${dol(-B)}, which means ${name} owes the bank \\$${B}. ${name} deposits \\$${D}. What is the new balance?`,
      parts: [numPart(D - B, { label: '\\$' })],
      hints: ['A deposit adds money: start at the balance and add.', `Find $${-B} + ${D}$. The first \\$${B} pays back what ${name} owes.`],
      solution: [`New balance = old balance + deposit: $${-B} + ${D}$`, `The first \\$${B} brings the balance up to \\$0. That leaves $${D} - ${B} = ${D - B}$.`, `$${-B} + ${D} = ${D - B}$`, `The new balance is ${dol(D - B)}.`],
    };
  }
  if (kind === 'spend') {
    const B = 5 * rng.int(2, 8);
    const S = B + 5 * rng.int(1, 6);
    const item = rng.pick(['groceries', 'a new phone case', 'gas', 'a pair of shoes', 'a concert ticket']);
    return {
      prompt: `${name} has ${dol(B)} in a bank account. ${name} uses a debit card to pay \\$${S} for ${item}. The bank allows the account to go below \\$0. What is the new balance?`,
      parts: [numPart(B - S, { label: '\\$' })],
      hints: ['Spending money takes it out of the account, so subtract.', `Find $${B} - ${S}$. The answer will be below $0$.`],
      solution: [`New balance = old balance − amount spent: $${B} - ${S}$`, `The first \\$${B} brings the balance down to \\$0. That leaves $${S} - ${B} = ${S - B}$ more, below $0$.`, `$${B} - ${S} = ${B - S}$`, `The new balance is ${dol(B - S)}. ${name} owes the bank \\$${S - B}.`],
    };
  }
  const a = rng.int(6, 15);
  const up = rng.chance(0.5);
  const b = up ? rng.int(2, a - 2) : rng.int(2, 6);
  const r = up ? -a + b : -a - b;
  return {
    prompt: `A diver is $${a}$ m below the surface of a lake, at $${-a}\\ \\text{m}$. She swims ${up ? 'up' : 'down'} $${b}$ m. What integer gives her new position?`,
    figure: numberLine([{ value: -a, label: 'diver' }, { value: 0, label: 'surface' }]),
    parts: [numPart(r, { suffix: 'm' })],
    hints: [`Up means add. Down means subtract.`, `Find $${-a} ${up ? '+' : '-'} ${b}$.`],
    solution: [`${up ? 'Up means add' : 'Down means subtract'}: $${-a} ${up ? '+' : '-'} ${b}$`, up ? `Moving up $${b}$ from $${-a}$ gets closer to $0$: $${-a} + ${b} = ${r}$` : `Moving down $${b}$ from $${-a}$ goes farther below $0$: $${-a} - ${b} = ${r}$`, `Her new position is $${r}\\ \\text{m}$.`],
  };
}

function changeD2(rng: Rng, name: string): Out {
  const kind = rng.pick(['rise', 'drop', 'newTemp', 'overdraw', 'mine', 'dive'] as const);
  const town = rng.pick(TOWNS);
  if (kind === 'rise') {
    const t1 = rng.int(-30, -5);
    const t2 = rng.int(1, 15);
    const warmWind = rng.chance(0.5);
    return {
      prompt: warmWind
        ? `A warm winter wind blew into ${town}. The temperature went from ${deg(t1)} to ${deg(t2)}. How many degrees did the temperature rise?`
        : `In ${town}, the temperature was ${deg(t1)} at sunrise and ${deg(t2)} in the afternoon. How many degrees did the temperature rise?`,
      parts: [numPart(t2 - t1, { suffix: 'degrees' })],
      hints: [RISE_HINT, `Rise = higher temperature − lower temperature: $${t2} - ${paren(t1)}$.`],
      solution: [`Rise = higher − lower: $${t2} - ${paren(t1)}$`, `Subtracting a negative is the same as adding: $${t2} + ${-t1} = ${t2 - t1}$`, `Check: $${-t1}$ degrees up to $0$, then $${t2}$ more. $${-t1} + ${t2} = ${t2 - t1}$`, `The temperature rose $${t2 - t1}$ degrees.`],
    };
  }
  if (kind === 'drop') {
    const t1 = rng.int(1, 12);
    const t2 = rng.int(-30, -5);
    return {
      prompt: `A cold front moved into ${town}. The temperature fell from ${deg(t1)} at noon to ${deg(t2)} at midnight. How many degrees did the temperature drop?`,
      parts: [numPart(t1 - t2, { suffix: 'degrees' })],
      hints: ['Count from the higher temperature down to $0$, then from $0$ down to the lower temperature.', `Drop = higher temperature − lower temperature: $${t1} - ${paren(t2)}$.`],
      solution: [`Drop = higher − lower: $${t1} - ${paren(t2)}$`, `Subtracting a negative is the same as adding: $${t1} + ${-t2} = ${t1 - t2}$`, `Check: $${t1}$ degrees down to $0$, then $${-t2}$ more. $${t1} + ${-t2} = ${t1 - t2}$`, `The temperature dropped $${t1 - t2}$ degrees.`],
    };
  }
  if (kind === 'newTemp') {
    const up = rng.chance(0.5);
    const { t, c } = retry(
      () => ({ t: rng.int(-22, 8), c: rng.int(5, 20) }),
      (o) => (up ? o.t < 0 && Math.abs(o.t + o.c) >= 1 : o.t - o.c < 0 && o.t !== 0),
    );
    const r = up ? t + c : t - c;
    return {
      prompt: `The temperature in ${town} is ${deg(t)}. Over the next few hours it ${up ? 'rises' : 'drops'} $${c}$ degrees. What is the new temperature?`,
      parts: [numPart(r, { suffix: '°C' })],
      hints: [up ? 'A rise means add.' : 'A drop means subtract.', `Find $${t} ${up ? '+' : '-'} ${c}$.`],
      solution: [`${up ? 'A rise means add' : 'A drop means subtract'}: $${t} ${up ? '+' : '-'} ${c}$`, ...opSteps(t, up ? '+' : '-', c).steps, `The new temperature is ${deg(r)}.`],
    };
  }
  if (kind === 'overdraw') {
    const B = rng.int(20, 150);
    const P = B + rng.int(5, 90);
    const item = rng.pick(['car repairs', 'groceries for the month', 'a new winter coat', 'a phone bill', 'textbooks']);
    return {
      prompt: `${name} has ${dol(B)} in a bank account. ${name} pays \\$${P} for ${item} with a debit card. The bank lets the balance go below \\$0. What is the new balance?`,
      parts: [numPart(B - P, { label: '\\$' })],
      hints: ['Paying takes money out, so subtract.', `Find $${B} - ${P}$. The answer will be negative.`],
      solution: [`New balance = $${B} - ${P}$`, `${name} spends \\$${P - B} more than the balance, so the balance goes $${P - B}$ below $0$.`, `$${B} - ${P} = ${B - P}$`, `The new balance is ${dol(B - P)}.`],
    };
  }
  if (kind === 'mine') {
    const a = 10 * rng.int(10, 40);
    const up = rng.chance(0.5);
    const b = up ? 10 * rng.int(3, a / 10 - 2) : 10 * rng.int(3, 20);
    const r = up ? -a + b : -a - b;
    return {
      prompt: `An elevator in a mine starts $${a}$ m below the surface, at $${-a}\\ \\text{m}$. It goes ${up ? 'up' : 'down'} $${b}$ m. Where is the elevator now? Write the answer as an integer.`,
      parts: [numPart(r, { suffix: 'm' })],
      hints: ['The surface is $0$. Up means add, down means subtract.', `Find $${-a} ${up ? '+' : '-'} ${b}$.`],
      solution: [`${up ? 'Up means add' : 'Down means subtract'}: $${-a} ${up ? '+' : '-'} ${b}$`, ...opSteps(-a, up ? '+' : '-', b).steps, `The elevator is at $${r}\\ \\text{m}$, which is $${-r}$ m below the surface.`],
    };
  }
  const [a, b] = distinct(rng, 2, 3, 30, 4);
  const lo = Math.max(a, b);
  const hi = Math.min(a, b);
  const down = rng.chance(0.5);
  const [from, to] = down ? [-hi, -lo] : [-lo, -hi];
  return {
    prompt: `${name} is scuba diving. ${name} goes from $${from}\\ \\text{m}$ to $${to}\\ \\text{m}$. How many metres did ${name} go ${down ? 'down' : 'up'}?`,
    parts: [numPart(lo - hi, { suffix: 'm' })],
    hints: ['Both numbers are below $0$. Find the distance between them on a number line.', `Subtract: higher − lower: $${-hi} - ${paren(-lo)}$.`],
    solution: [`The higher position is $${-hi}$ and the lower one is $${-lo}$.`, `Distance = higher − lower: $${-hi} - ${paren(-lo)} = ${-hi} + ${lo} = ${lo - hi}$`, `${name} went ${down ? 'down' : 'up'} $${lo - hi}$ m.`],
  };
}

function changeD3(rng: Rng, name: string): Out {
  const kind = rng.pick(['bank', 'day', 'range'] as const);
  if (kind === 'bank') {
    const start = rng.int(20, 180);
    const kinds = rng.shuffle(['out', 'out', 'in', rng.pick(['in', 'out'])]) as Array<'in' | 'out'>;
    const OUT: Array<[string, number, number]> = [['Debit: groceries', 35, 160], ['Debit: gas', 40, 110], ['Debit: phone bill', 45, 95], ['Bill: car insurance', 90, 180], ['Debit: hardware store', 20, 80], ['Debit: work boots', 90, 170]];
    const IN: Array<[string, number, number]> = [['Deposit: paycheque', 150, 450], ['Deposit: cash', 20, 100], ['Transfer from savings', 50, 200], ['Deposit: tips', 30, 150]];
    const outs = rng.sample(OUT, 4);
    const ins = rng.sample(IN, 4);
    let oi = 0;
    let ii = 0;
    const rowsUsed = kinds.map((k) => (k === 'in' ? { sign: 1, row: ins[ii++] } : { sign: -1, row: outs[oi++] }));
    const labels = rowsUsed.map((r) => r.row[0]);
    const tx = retry(
      () => rowsUsed.map((r) => r.sign * rng.int(r.row[1], r.row[2])),
      (v) => {
        let bal = start;
        let wentNeg = false;
        for (const x of v) {
          bal += x;
          if (bal < 0) wentNeg = true;
        }
        return wentNeg && bal >= -150 && bal <= 400 && bal !== 0;
      },
      300,
    );
    const steps: string[] = [];
    let bal = start;
    for (let j = 0; j < tx.length; j++) {
      const nb = bal + tx[j];
      steps.push(`${labels[j]}: $${bal} ${tx[j] < 0 ? '-' : '+'} ${Math.abs(tx[j])} = ${nb}$`);
      bal = nb;
    }
    return {
      prompt: `The table shows ${name}’s bank account for one week. Money taken out is shown with a minus sign. The bank lets the balance go below \\$0. What is the balance at the end of the week?`,
      figure: { type: 'table', headers: ['Transaction', 'Amount'], rows: [['Starting balance', cellD(start)], ...labels.map((l, j) => [l, tx[j] < 0 ? cellD(tx[j]) : `+$${tx[j]}`])] },
      parts: [numPart(bal, { label: 'End balance \\$' })],
      hints: ['Start with the starting balance. Go down the table one row at a time.', 'Add each deposit. Subtract each amount taken out. The balance can go below $0$.'],
      solution: [`Start: ${dol(start)}`, ...steps, `The balance at the end of the week is ${dol(bal)}.`],
    };
  }
  if (kind === 'day') {
    const town = rng.pick(TOWNS);
    const t0 = rng.int(-25, -6);
    const times = ['9 a.m.', '1 p.m.', '5 p.m.', '10 p.m.'];
    const ch = retry(
      () => [rng.int(3, 12), rng.int(2, 10), -rng.int(3, 12), -rng.int(2, 10)],
      (v) => {
        const peak = t0 + v[0] + v[1];
        return peak > 0 && t0 + v[0] + v[1] + v[2] + v[3] < 0;
      },
    );
    const rows = times.map((tm, j) => [tm, ch[j] > 0 ? `up ${ch[j]} degrees` : `down ${-ch[j]} degrees`]);
    const steps: string[] = [];
    let t = t0;
    for (let j = 0; j < ch.length; j++) {
      const nt = t + ch[j];
      steps.push(`${times[j]}: $${t} ${ch[j] < 0 ? '-' : '+'} ${Math.abs(ch[j])} = ${nt}$`);
      t = nt;
    }
    return {
      prompt: `At 6 a.m. the temperature in ${town} was ${deg(t0)}. The table shows how the temperature changed during the day. What was the temperature at 10 p.m.?`,
      figure: { type: 'table', headers: ['Time', 'Change in temperature'], rows },
      parts: [numPart(t, { suffix: '°C' })],
      hints: ['Start at the 6 a.m. temperature. Go down the table one row at a time.', 'Up means add. Down means subtract.'],
      solution: [`Start: ${deg(t0)}`, ...steps, `The temperature at 10 p.m. was ${deg(t)}.`],
    };
  }
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const vals = distinct(rng, 5, -28, 12, 2, (v) => v.some((x) => x > 2) && v.filter((x) => x < 0).length >= 2);
  const hi = Math.max(...vals);
  const lo = Math.min(...vals);
  const town = rng.pick(TOWNS);
  return {
    prompt: `The table shows the temperature at noon each weekday for one week in ${town}. What is the difference between the warmest and the coldest temperature?`,
    figure: { type: 'table', headers: ['Day', 'Temperature (°C)'], rows: days.map((d, j) => [d, `${vals[j]}`]) },
    parts: [numPart(hi - lo, { suffix: 'degrees' })],
    hints: ['First find the warmest (highest) and the coldest (lowest) temperatures.', 'Difference = highest − lowest. Subtracting a negative is the same as adding.'],
    solution: [
      `Warmest: ${deg(hi)}. Coldest: ${deg(lo)}.`,
      `Difference = highest − lowest: $${hi} - ${paren(lo)}$`,
      lo < 0 ? `Subtracting a negative is the same as adding: $${hi} + ${-lo} = ${hi - lo}$` : `$${hi} - ${lo} = ${hi - lo}$`,
      `The difference is $${hi - lo}$ degrees.`,
    ],
  };
}

const integerChange = skill({
  id: 'm104-integer-change',
  name: 'Change in temperature, money and height',
  description: 'Find a change in temperature, a bank balance after deposits and withdrawals, or a change in height, using integers.',
  outcomes: ['N2'],
  lessonId: 'm104-4-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    return d === 1 ? changeD1(rng, name) : d === 2 ? changeD2(rng, name) : changeD3(rng, name);
  },
});

export const INTEGER_SKILLS: SkillDef[] = [integerCompare, integerAddSub, integerChange];
