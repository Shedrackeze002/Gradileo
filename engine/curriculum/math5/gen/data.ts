/** Math 5 Unit 12 — Frequency and Data (S1). */
import { fixedChoice, mc, mcFigures, numPart, retry, skill } from '../../helpers.ts';
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
const TEACHERS = ['Ms. Okafor', 'Mr. Dhillon', 'Mme Gagnon', 'Mr. Nguyen', 'Ms. Redcrow', 'Mrs. Kowalski', 'Mr. Haddad', 'Ms. Lafleur'];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const plus = (a: number[]) => a.join(' + ');
function listWords(ws: string[], joiner = 'and'): string {
  if (ws.length <= 1) return ws.join('');
  return ws.length === 2 ? `${ws[0]} ${joiner} ${ws[1]}` : `${ws.slice(0, -1).join(', ')} ${joiner} ${ws[ws.length - 1]}`;
}
/** Tally marks in groups of five, e.g. "||||| |||". */
function tally(n: number): string {
  const out: string[] = [];
  for (let k = n; k > 0; k -= 5) out.push('|'.repeat(Math.min(5, k)));
  return out.join(' ');
}
const lower = (c: string) => (/^[A-Z][a-z]/.test(c) ? c.toLowerCase() : c);

const FREQ_DEF = 'The **frequency** of a category is how many times it appears in the data.';
const MODE_DEF = 'The **mode** is the category with the greatest frequency.';

/** A survey with a closed list of answers. */
interface Survey {
  q: string;
  open: string;
  closed: (cats: string[]) => string;
  stat: string;
  cats: string[];
  head: string;
  /** Who chose it: "chose apple", "like to travel by bus". */
  chose: (c: string) => string;
  /** A yes-or-no question about one choice. */
  yesNo: (c: string) => string;
}

const asked = (cats: string[]) => listWords(cats.map(lower), 'or');

const SURVEYS: Survey[] = [
  { q: 'What is your favourite fruit?', open: 'What is your favourite fruit?', closed: (c) => `Which fruit do you like best: ${asked(c)}?`, stat: 'Which fruit should our class serve at the year-end party?', cats: ['Apple', 'Banana', 'Orange', 'Grapes', 'Strawberries'], head: 'Fruit', chose: (c) => `chose ${lower(c)}`, yesNo: (c) => `Do you like ${lower(c)}?` },
  { q: 'Which sport do you like to play best?', open: 'What sport do you like to play?', closed: (c) => `Which sport do you like to play best: ${asked(c)}?`, stat: 'Which sport should our class play on the spring fun day?', cats: ['Hockey', 'Soccer', 'Basketball', 'Volleyball', 'Badminton'], head: 'Sport', chose: (c) => `chose ${lower(c)}`, yesNo: (c) => `Do you like to play ${lower(c)}?` },
  { q: 'Which class pet would you like?', open: 'What animal would make a good class pet?', closed: (c) => `Which class pet would you like most: ${asked(c)}?`, stat: 'Which class pet would most students in our class like?', cats: ['Fish', 'Rabbit', 'Hamster', 'Turtle', 'Guinea pig'], head: 'Pet', chose: (c) => `chose a ${lower(c)}`, yesNo: (c) => `Would you like a ${lower(c)} as a class pet?` },
  { q: 'What colour should our class T-shirts be?', open: 'What colour do you like?', closed: (c) => `Which colour should our class T-shirts be: ${asked(c)}?`, stat: 'What colour should our class T-shirts be?', cats: ['Red', 'Blue', 'Green', 'Purple', 'Yellow'], head: 'Colour', chose: (c) => `chose ${lower(c)}`, yesNo: (c) => `Do you like the colour ${lower(c)}?` },
  { q: 'Which season do you like best?', open: 'What is your favourite time of year?', closed: (c) => `Which season do you like best: ${asked(c)}?`, stat: 'Which season do most students in our class like best?', cats: ['Winter', 'Spring', 'Summer', 'Fall'], head: 'Season', chose: (c) => `chose ${lower(c)}`, yesNo: (c) => `Do you like ${lower(c)}?` },
  { q: 'How do you usually get to school?', open: 'How do you get to school?', closed: (c) => `How do you usually get to school: ${asked(c)}?`, stat: 'How do most students in our class get to school?', cats: ['Walk', 'Bus', 'Car', 'Bike'], head: 'How they get to school', chose: (c) => ({ Walk: 'walk', Bus: 'take the bus', Car: 'come by car', Bike: 'ride a bike' })[c] ?? lower(c), yesNo: (c) => ({ Walk: 'Do you walk to school?', Bus: 'Do you take the bus to school?', Car: 'Do you come to school by car?', Bike: 'Do you ride a bike to school?' })[c] ?? `Do you ${lower(c)} to school?` },
  { q: 'Which snack should the fun fair sell?', open: 'What snack do you like?', closed: (c) => `Which snack should the fun fair sell: ${asked(c)}?`, stat: 'Which snack should our school sell at the fun fair?', cats: ['Popcorn', 'Apple slices', 'Cheese', 'Crackers', 'Yogurt'], head: 'Snack', chose: (c) => `chose ${lower(c)}`, yesNo: (c) => `Do you like ${lower(c)}?` },
  { q: 'Where should our class go for a field trip?', open: 'Where would you like to go?', closed: (c) => `Where should our class go for a field trip: ${asked(c)}?`, stat: 'Where should our class go for a field trip?', cats: ['Zoo', 'Science centre', 'Museum', 'Farm', 'Swimming pool'], head: 'Field trip', chose: (c) => `chose the ${lower(c)}`, yesNo: (c) => `Would you like to go to the ${lower(c)}?` },
  { q: 'Which pizza topping should we order?', open: 'What do you like on pizza?', closed: (c) => `Which pizza topping should we order: ${asked(c)}?`, stat: 'Which pizza topping should we order for the class party?', cats: ['Cheese', 'Pepperoni', 'Mushroom', 'Pineapple', 'Veggie'], head: 'Topping', chose: (c) => `chose ${lower(c)}`, yesNo: (c) => `Do you like ${lower(c)} on pizza?` },
  { q: 'Which subject do you like best?', open: 'What do you like about school?', closed: (c) => `Which subject do you like best: ${asked(c)}?`, stat: 'Which subject do most students in our class like best?', cats: ['Math', 'Science', 'Art', 'Music', 'Gym'], head: 'Subject', chose: (c) => `chose ${c === 'Math' || c === 'Science' || c === 'Art' || c === 'Music' ? c.toLowerCase() : 'gym'}`, yesNo: (c) => `Do you like ${c === 'Gym' ? 'gym' : c.toLowerCase()}?` },
];

/** Data whose categories are numbers (counts per student, goals per game). */
interface NumCtx {
  /** "Each student in Ms. Okafor's class said how many pets they have." */
  setup: (who: string) => string;
  label: string;
  unit: string;
  one: string;
  noun: string;
  lo: number;
  hi: number;
  /** "How many students have $2$ pets?" */
  ask: (v: number) => string;
  /** "How many more students have $2$ pets than have $4$ pets?" */
  more: (a: number, b: number) => string;
  /** "$5$ students have $2$ pets." */
  fact: (v: number, n: number) => string;
}

const u = (c: { unit: string; one: string }, v: number) => (v === 1 ? c.one : c.unit);
const NUMS: NumCtx[] = [
  {
    setup: (t) => `Each student in ${t}’s class said how many pets they have.`, label: 'Number of pets', unit: 'pets', one: 'pet', noun: 'students', lo: 0, hi: 4,
    ask: (v) => `How many students have $${v}$ ${v === 1 ? 'pet' : 'pets'}?`,
    more: (a, b) => `How many more students have $${a}$ ${a === 1 ? 'pet' : 'pets'} than have $${b}$ ${b === 1 ? 'pet' : 'pets'}?`,
    fact: (v, n) => `$${n}$ ${n === 1 ? 'student has' : 'students have'} $${v}$ ${v === 1 ? 'pet' : 'pets'}.`,
  },
  {
    setup: (t) => `Each student in ${t}’s class said how many brothers and sisters they have.`, label: 'Number of brothers and sisters', unit: 'brothers and sisters', one: 'brother or sister', noun: 'students', lo: 0, hi: 4,
    ask: (v) => `How many students have $${v}$ ${v === 1 ? 'brother or sister' : 'brothers and sisters'}?`,
    more: (a, b) => `How many more students have $${a}$ ${a === 1 ? 'brother or sister' : 'brothers and sisters'} than have $${b}$?`,
    fact: (v, n) => `$${n}$ ${n === 1 ? 'student has' : 'students have'} $${v}$ ${v === 1 ? 'brother or sister' : 'brothers and sisters'}.`,
  },
  {
    setup: (t) => `Each student in ${t}’s class said how many books they read in March.`, label: 'Books read', unit: 'books', one: 'book', noun: 'students', lo: 1, hi: 6,
    ask: (v) => `How many students read $${v}$ ${v === 1 ? 'book' : 'books'}?`,
    more: (a, b) => `How many more students read $${a}$ ${a === 1 ? 'book' : 'books'} than read $${b}$ ${b === 1 ? 'book' : 'books'}?`,
    fact: (v, n) => `$${n}$ ${n === 1 ? 'student' : 'students'} read $${v}$ ${v === 1 ? 'book' : 'books'}.`,
  },
  {
    setup: () => 'A U11 soccer team recorded how many goals it scored in each game this season.', label: 'Goals scored', unit: 'goals', one: 'goal', noun: 'games', lo: 0, hi: 5,
    ask: (v) => `In how many games did the team score $${v}$ ${v === 1 ? 'goal' : 'goals'}?`,
    more: (a, b) => `In how many more games did the team score $${a}$ ${a === 1 ? 'goal' : 'goals'} than $${b}$ ${b === 1 ? 'goal' : 'goals'}?`,
    fact: (v, n) => `The team scored $${v}$ ${v === 1 ? 'goal' : 'goals'} in $${n}$ ${n === 1 ? 'game' : 'games'}.`,
  },
  {
    setup: (t) => `Each student in ${t}’s class said how many people live in their home.`, label: 'People in the home', unit: 'people', one: 'person', noun: 'students', lo: 2, hi: 7,
    ask: (v) => `How many students have $${v}$ people living in their home?`,
    more: (a, b) => `How many more students have $${a}$ people in their home than have $${b}$ people?`,
    fact: (v, n) => `$${n}$ ${n === 1 ? 'student has' : 'students have'} $${v}$ people in their home.`,
  },
  {
    setup: (t) => `Each student in ${t}’s class said how many teeth they lost this year.`, label: 'Teeth lost', unit: 'teeth', one: 'tooth', noun: 'students', lo: 0, hi: 4,
    ask: (v) => `How many students lost $${v}$ ${v === 1 ? 'tooth' : 'teeth'}?`,
    more: (a, b) => `How many more students lost $${a}$ ${a === 1 ? 'tooth' : 'teeth'} than lost $${b}$ ${b === 1 ? 'tooth' : 'teeth'}?`,
    fact: (v, n) => `$${n}$ ${n === 1 ? 'student' : 'students'} lost $${v}$ ${v === 1 ? 'tooth' : 'teeth'}.`,
  },
];
const unitOf = (c: NumCtx, v: number) => u(c, v);

/** Frequencies with one clear greatest value (when `uniqueMax`) and no zero counts. */
function freqs(rng: Rng, n: number, lo: number, hi: number, ok: (f: number[]) => boolean = () => true): number[] {
  return retry(() => Array.from({ length: n }, () => rng.int(lo, hi)), ok, 500);
}
const uniqueMax = (f: number[]) => f.filter((x) => x === Math.max(...f)).length === 1;
const maxIdx = (f: number[]) => f.indexOf(Math.max(...f));

/** The data as a shuffled list of words. */
function dataList(rng: Rng, cats: string[], f: number[]): string[] {
  return rng.shuffle(cats.flatMap((c, i) => Array.from({ length: f[i] }, () => c)));
}

function freqTable(head: string, cats: string[], f: Array<number | null>): Figure {
  return { type: 'table', headers: [head, 'Frequency'], rows: cats.map((c, i) => [c, f[i] === null ? '?' : String(f[i])]) };
}

/** A bar graph that is easy to read: values on grid lines. */
function bar(cats: string[], f: number[], valueLabel: string, categoryLabel: string): Figure {
  const top = Math.max(...f);
  const step = top > 12 ? 2 : 1;
  return { type: 'barChart', categories: cats, values: f, valueLabel, categoryLabel, max: (Math.floor(top / step) + 1) * step, step };
}

/** A dot plot: one dot for each data value, stacked above a number line. */
function dotPlot(lo: number, hi: number, f: number[], label: string): Figure {
  const tallest = Math.max(6, ...f);
  return {
    type: 'plane',
    grid: { xMin: lo - 0.6, xMax: hi + 0.6, yMin: 0.4, yMax: tallest + 0.6, xStep: 1, yStep: 100, xLabel: label },
    hideAxes: true,
    segments: [{ from: [lo - 0.6, 0.4], to: [hi + 0.6, 0.4], color: 'muted' }],
    points: f.flatMap((c, i) => Array.from({ length: c }, (_, k) => ({ x: lo + i, y: k + 1 }))),
    caption: `Dot plot of ${label.toLowerCase()}`,
  };
}

// ---------------------------------------------------------------------------
// 12.1 Frequency and the mode
// ---------------------------------------------------------------------------

function countFromList(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, rng.int(3, 4));
  const f = freqs(rng, cats.length, 1, 6, (x) => sum(x) >= 10 && sum(x) <= 16);
  const list = dataList(rng, cats, f);
  const i = rng.int(0, cats.length - 1);
  const t = rng.pick(TEACHERS);
  return {
    prompt: `Students in ${t}’s class answered the question “${s.q}” Here are their answers:\n\n${list.join(', ')}\n\nWhat is the frequency of ${cats[i]}?`,
    parts: [numPart(f[i], { suffix: 'students' })],
    hints: [FREQ_DEF, `Count every “${cats[i]}” in the list. Cross each one off as you count it.`],
    solution: [`Count the answers that say ${cats[i]}: there are $${f[i]}$.`, `So $${f[i]}$ students ${s.chose(cats[i])}.`, `The frequency of ${cats[i]} is $${f[i]}$.`],
  };
}

function tallyFreq(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, 4);
  const f = freqs(rng, 4, 3, 14, (x) => new Set(x).size === 4);
  const i = rng.int(0, 3);
  const how = f[i] >= 5 ? `$${Math.floor(f[i] / 5)}$ group${f[i] >= 10 ? 's' : ''} of $5$ and $${f[i] % 5}$ more: $${range(1, Math.floor(f[i] / 5)).map(() => 5).join(' + ')}${f[i] % 5 ? ` + ${f[i] % 5}` : ''} = ${f[i]}$` : `$${f[i]}$ single marks`;
  return {
    prompt: `Students at a school in ${rng.pick(TOWNS)} answered the question “${s.q}” The tally chart shows their answers. What is the frequency of ${cats[i]}?`,
    figure: { type: 'table', headers: [s.head, 'Tally'], rows: cats.map((c, k) => [c, tally(f[k])]) },
    parts: [numPart(f[i], { suffix: 'students' })],
    hints: ['Each group `|||||` stands for $5$. Count by fives, then count the extra marks.', FREQ_DEF],
    solution: [`Find the row for ${cats[i]}.`, `It has ${how}.`, `The frequency of ${cats[i]} is $${f[i]}$.`],
  };
}

function modeFromBar(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, 4);
  const f = freqs(rng, 4, 2, 11, (x) => uniqueMax(x) && new Set(x).size >= 3);
  const m = maxIdx(f);
  return {
    prompt: `Students in ${rng.pick(TEACHERS)}’s class answered the question “${s.q}” The bar graph shows the results. What is the mode?`,
    figure: bar(cats, f, 'Number of students', s.head),
    parts: [{ answer: mc(rng, cats[m], cats.filter((_, k) => k !== m)) }],
    hints: [MODE_DEF, 'Look for the tallest bar.'],
    solution: [`The tallest bar is ${cats[m]}, with a frequency of $${f[m]}$.`, `No other category has a frequency that high.`, `The mode is ${cats[m]}.`],
    answerDisplay: cats[m],
  };
}

type ModeCase = 'one' | 'two' | 'none';

function modeStatement(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, 4);
  const kind = rng.pick<ModeCase>(['one', 'two', 'none']);
  const f = kind === 'none'
    ? Array(4).fill(rng.int(3, 8))
    : freqs(rng, 4, 2, 10, (x) => {
      const top = Math.max(...x);
      const n = x.filter((v) => v === top).length;
      return kind === 'one' ? n === 1 && new Set(x).size >= 3 : n === 2 && new Set(x).size === 3;
    });
  const top = Math.max(...f);
  const tops = cats.filter((_, k) => f[k] === top);
  const order = [...cats.keys()].sort((a, b) => f[b] - f[a]);
  const second = cats[order.find((k) => f[k] < top) ?? order[1]];
  const sOne = (c: string) => `The mode is ${c}.`;
  const sTwo = (a: string, b: string) => `The modes are ${a} and ${b}.`;
  const NONE = 'There is no mode.';
  const sFreq = `The mode is $${top}$.`;
  const correct = kind === 'one' ? sOne(tops[0]) : kind === 'two' ? sTwo(tops[0], tops[1]) : NONE;
  const wrong = kind === 'one'
    ? [sTwo(tops[0], second), NONE, sFreq, sOne(second)]
    : kind === 'two'
      ? [sOne(tops[0]), NONE, sFreq, sOne(tops[1])]
      : [sOne(cats[0]), sFreq, sTwo(cats[0], cats[1])];
  const why = kind === 'one'
    ? `${tops[0]} has the greatest frequency, $${top}$. No other category has $${top}$.`
    : kind === 'two'
      ? `${tops[0]} and ${tops[1]} are tied with the greatest frequency, $${top}$.`
      : `Every category has the same frequency, $${top}$. No category is chosen more often than the others.`;
  return {
    prompt: `Students in ${rng.pick(TEACHERS)}’s class answered the question “${s.q}” The frequency table shows the results. Which statement is true?`,
    figure: freqTable(s.head, cats, f),
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: [MODE_DEF, 'If two categories tie for the greatest frequency, there are two modes. If every category has the same frequency, there is no mode.'],
    solution: [`The frequencies are ${cats.map((c, k) => `${c} $${f[k]}$`).join(', ')}.`, why, `The mode is a category, not a frequency, so “the mode is $${top}$” is not right.`, `The true statement: ${correct}`],
    answerDisplay: correct,
  };
}

function numberMode(rng: Rng): Out {
  const c = rng.pick(NUMS);
  const vals = range(c.lo, c.hi);
  const f = freqs(rng, vals.length, 0, 8, (x) => uniqueMax(x) && x.filter((v) => v > 0).length >= 3 && Math.max(...x) !== vals[maxIdx(x)] && sum(x) >= 12);
  const m = maxIdx(f);
  const t = rng.pick(TEACHERS);
  return {
    prompt: `${c.setup(t)} The frequency table shows the results. What is the mode?`,
    figure: freqTable(c.label, vals.map(String), f),
    parts: [numPart(vals[m], { suffix: unitOf(c, vals[m]) })],
    hints: [MODE_DEF, `The mode is a number of ${c.unit}, from the first column. It is not the frequency.`],
    solution: [
      `The greatest frequency is $${f[m]}$.`,
      `It belongs to the category $${vals[m]}$: ${c.fact(vals[m], f[m])}`,
      `The mode is $${vals[m]}$ ${unitOf(c, vals[m])} (not $${f[m]}$, which is how many ${c.noun}).`,
    ],
  };
}

function modeFromList(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, 4);
  const f = freqs(rng, 4, 1, 6, (x) => uniqueMax(x) && Math.max(...x) - [...x].sort((a, b) => b - a)[1] === 1 && sum(x) >= 12);
  const list = dataList(rng, cats, f);
  const m = maxIdx(f);
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} asked classmates, “${s.q}” Here are the answers:\n\n${list.join(', ')}\n\nWhat is the mode?`,
    parts: [{ answer: mc(rng, cats[m], [...cats.filter((_, k) => k !== m), 'There is no mode.']) }],
    hints: ['Count the frequency of each answer. A tally chart helps.', MODE_DEF],
    solution: [`Count each answer: ${cats.map((c, k) => `${c} $${f[k]}$`).join(', ')}.`, `${cats[m]} has the greatest frequency, $${f[m]}$.`, `The mode is ${cats[m]}.`],
    answerDisplay: cats[m],
  };
}

function justifyMode(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, 4);
  const f = freqs(rng, 4, 2, 12, (x) => new Set(x).size === 4);
  const order = [...cats.keys()].sort((a, b) => f[b] - f[a]);
  const [A, B] = [order[0], order[1]];
  const C = order[3];
  const useTally = rng.chance(0.5);
  const t = rng.pick(TEACHERS);
  const correct = `${cats[A]}, because it is the mode: it has the greatest frequency, $${f[A]}$.`;
  return {
    prompt: `${t}’s class wants to answer the statistical question “${s.stat}” Each student answered the closed-list question “${s.closed(cats)}” The ${useTally ? 'tally chart' : 'bar graph'} shows the results. Which answer and reason make the most sense?`,
    figure: useTally ? { type: 'table', headers: [s.head, 'Tally'], rows: cats.map((c, k) => [c, tally(f[k])]) } : bar(cats, f, 'Number of students', s.head),
    parts: [{ answer: mc(rng, correct, [
      `${cats[B]}, because it is the mode: it has the greatest frequency, $${f[B]}$.`,
      `${cats[C]}, because it has the least frequency, $${f[C]}$.`,
      'There is no way to tell, because the students did not all give the same answer.',
    ]) }],
    hints: [`Find the frequency of each answer${useTally ? ' (count the tally marks by fives)' : ''}.`, 'The answer that the most students chose is the mode. Use it to answer the question.'],
    solution: [`The frequencies are ${cats.map((c, k) => `${c} $${f[k]}$`).join(', ')}.`, `${cats[A]} has the greatest frequency, so ${cats[A]} is the mode.`, `More students ${s.chose(cats[A])} than any other answer, so ${cats[A]} is the best answer to the question.`, `Answer: ${correct}`],
    answerDisplay: correct,
  };
}

function numberListMode(rng: Rng): Out {
  const c = rng.pick(NUMS);
  const vals = range(c.lo, c.hi);
  const f = freqs(rng, vals.length, 0, 5, (x) => uniqueMax(x) && x.filter((v) => v > 0).length >= 4 && sum(x) >= 12 && sum(x) <= 18 && Math.max(...x) !== vals[maxIdx(x)]);
  const data = rng.shuffle(vals.flatMap((v, i) => Array(f[i]).fill(v) as number[]));
  const m = maxIdx(f);
  const t = rng.pick(TEACHERS);
  return {
    prompt: `${c.setup(t)} Here are the data:\n\n$${data.join(',\\ ')}$\n\n(a) What is the mode? (b) What is the frequency of the mode?`,
    parts: [numPart(vals[m], { label: '(a) Mode:', suffix: unitOf(c, vals[m]) }), numPart(f[m], { label: '(b) Frequency:', suffix: c.noun })],
    hints: [`Make a frequency table: list each number of ${c.unit} from $${c.lo}$ to $${c.hi}$, then count how many times it appears.`, 'The mode is the data value that appears most often. Its frequency is how many times it appears.'],
    solution: [
      `Count each value: ${vals.map((v, i) => `$${v}$ appears $${f[i]}$ time${f[i] === 1 ? '' : 's'}`).join(', ')}.`,
      `The value that appears most often is $${vals[m]}$. It appears $${f[m]}$ times.`,
      `(a) The mode is $${vals[m]}$ ${unitOf(c, vals[m])}. (b) Its frequency is $${f[m]}$. ${c.fact(vals[m], f[m])}`,
    ],
  };
}

const frequencyMode = skill({
  id: 'm5-frequency-mode',
  name: 'Frequency and the mode',
  description: 'Count the frequency of each category in a list, tally chart, table or graph, find the mode, recognize data with no mode or more than one mode, and use the mode to answer a question.',
  outcomes: ['S1'],
  lessonId: 'm5-12-1',
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick(['list', 'tally', 'bar'] as const);
      return k === 'list' ? countFromList(rng) : k === 'tally' ? tallyFreq(rng) : modeFromBar(rng);
    }
    if (d === 2) {
      const k = rng.weighted([['statement', 2], ['number', 1], ['list', 1]] as const);
      return k === 'statement' ? modeStatement(rng) : k === 'number' ? numberMode(rng) : modeFromList(rng);
    }
    return rng.chance(0.5) ? justifyMode(rng) : numberListMode(rng);
  },
});

// ---------------------------------------------------------------------------
// 12.2 Collecting and displaying data
// ---------------------------------------------------------------------------

const CLOSED_OPEN = ['Closed-list question', 'Open-ended question'];

function closedOrOpen(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const isClosed = rng.chance(0.5);
  const q = isClosed ? s.closed(rng.sample(s.cats, rng.int(3, 4))) : rng.pick([s.open, s.q]);
  return {
    prompt: `${rng.pick(NAMES)} wants to ask classmates this question: “${q}” What kind of question is it?`,
    parts: [{ answer: fixedChoice(CLOSED_OPEN, isClosed ? 0 : 1) }],
    hints: ['A **closed-list question** gives a list of answers to choose from. An **open-ended question** lets people give any answer.', 'Does the question list the answers people can choose?'],
    solution: isClosed
      ? ['The question gives a list of answers to choose from.', 'People must pick one answer from the list.', 'It is a closed-list question.']
      : ['The question does not give a list of answers.', 'People can give any answer they like.', 'It is an open-ended question.'],
    answerDisplay: isClosed ? CLOSED_OPEN[0] : CLOSED_OPEN[1],
  };
}

function readBar(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, rng.int(4, 5));
  const big = rng.chance(0.4);
  const f = freqs(rng, cats.length, big ? 4 : 1, big ? 20 : 11, (x) => new Set(x).size >= cats.length - 1 && (!big || x.every((v) => v % 2 === 0)));
  const i = rng.int(0, cats.length - 1);
  const fig = bar(cats, f, 'Number of students', s.head);
  const step = fig.type === 'barChart' ? fig.step ?? 1 : 1;
  return {
    prompt: `The bar graph shows how students in ${rng.pick(TEACHERS)}’s class answered the question “${s.q}” What is the frequency of ${cats[i]}?`,
    figure: fig,
    parts: [numPart(f[i], { suffix: 'students' })],
    hints: ['Find the top of the bar. Look straight across to the numbers on the side.', `The grid lines go up by $${step}$.`],
    solution: [`Find the ${cats[i]} bar.`, `The top of the bar is at $${f[i]}$.`, `The frequency of ${cats[i]} is $${f[i]}$: $${f[i]}$ students ${s.chose(cats[i])}.`],
  };
}

function numData(rng: Rng, minTotal: number, maxTotal: number): { c: NumCtx; vals: number[]; f: number[] } {
  const c = rng.pick(NUMS);
  const vals = range(c.lo, c.hi);
  const f = freqs(rng, vals.length, 0, 6, (x) => sum(x) >= minTotal && sum(x) <= maxTotal && uniqueMax(x) && x.filter((v) => v > 0).length >= 3);
  return { c, vals, f };
}

function readDot(rng: Rng): Out {
  const { c, vals, f } = numData(rng, 10, 22);
  const i = retry(() => rng.int(0, vals.length - 1), (k) => f[k] > 0);
  const t = rng.pick(TEACHERS);
  return {
    prompt: `${c.setup(t)} The dot plot shows the results. Each dot stands for one of the ${c.noun}. ${c.ask(vals[i])}`,
    figure: dotPlot(c.lo, c.hi, f, c.label),
    parts: [numPart(f[i], { suffix: c.noun })],
    hints: [`Find $${vals[i]}$ on the number line.`, `Count the dots stacked above $${vals[i]}$.`],
    solution: [`Find $${vals[i]}$ on the number line.`, `There are $${f[i]}$ dots above it.`, c.fact(vals[i], f[i])],
  };
}

function dotQuestion(rng: Rng): Out {
  const { c, vals, f } = numData(rng, 12, 24);
  const t = rng.pick(TEACHERS);
  const kind = rng.pick(['mode', 'total', 'more'] as const);
  const figure = dotPlot(c.lo, c.hi, f, c.label);
  const intro = `${c.setup(t)} The dot plot shows the results. Each dot stands for one of the ${c.noun}.`;
  if (kind === 'mode') {
    const m = maxIdx(f);
    return {
      prompt: `${intro} What is the mode?`,
      figure,
      parts: [numPart(vals[m], { suffix: unitOf(c, vals[m]) })],
      hints: ['On a dot plot, the mode has the tallest stack of dots.', 'The mode is the number under the tallest stack, not the number of dots.'],
      solution: [`The tallest stack has $${f[m]}$ dots.`, `It is above $${vals[m]}$.`, `The mode is $${vals[m]}$ ${unitOf(c, vals[m])}.`],
    };
  }
  if (kind === 'total') {
    const nz = vals.map((_, k) => k).filter((k) => f[k] > 0);
    return {
      prompt: `${intro} How many ${c.noun} are shown in all?`,
      figure,
      parts: [numPart(sum(f), { suffix: c.noun })],
      hints: ['Each dot is one of the ' + c.noun + '. Count the dots in each stack.', 'Add the counts for all the stacks.'],
      solution: [`Count each stack: ${nz.map((k) => `$${vals[k]}$: $${f[k]}$`).join(', ')}.`, `Add: $${plus(nz.map((k) => f[k]))} = ${sum(f)}$`, `There are $${sum(f)}$ ${c.noun} in all.`],
    };
  }
  const [i, j] = retry(() => rng.sample([...vals.keys()], 2), ([a, b]) => f[a] > f[b] && f[b] > 0);
  return {
    prompt: `${intro} ${c.more(vals[i], vals[j])}`,
    figure,
    parts: [numPart(f[i] - f[j], { suffix: c.noun })],
    hints: ['Count the dots above each of the two numbers.', 'Subtract the smaller count from the bigger count.'],
    solution: [`Above $${vals[i]}$: $${f[i]}$ dots. Above $${vals[j]}$: $${f[j]}$ dots.`, `Subtract: $${f[i]} - ${f[j]} = ${f[i] - f[j]}$`, `$${f[i] - f[j]}$ more ${c.noun}.`],
  };
}

function makeFreqTable(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, rng.int(3, 4));
  const f = freqs(rng, cats.length, 1, 7, (x) => sum(x) >= 12 && sum(x) <= 20);
  const list = dataList(rng, cats, f);
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} asked classmates the closed-list question “${s.closed(cats)}” Here are the answers:\n\n${list.join(', ')}\n\nComplete the frequency table.`,
    figure: freqTable(s.head, cats, cats.map(() => null)),
    parts: cats.map((c, k) => numPart(f[k], { label: `${c}:` })),
    hints: ['Go through the list one answer at a time. Make a tally mark beside the right category, then cross the answer off.', `Count the tally marks for each category. Check: the frequencies should add up to $${list.length}$, the number of answers.`],
    solution: [...cats.map((c, k) => `${c}: ${tally(f[k])} → $${f[k]}$`), `Check: $${plus(f)} = ${sum(f)}$ answers in all ✓`, `The frequencies are ${cats.map((c, k) => `${c} $${f[k]}$`).join(', ')}.`],
  };
}

/** Stem-and-leaf contexts: two-digit data. */
interface StemCtx {
  setup: string;
  noun: string;
  lo: number;
  hi: number;
  /** A value with its unit in prose. */
  val: (v: number) => string;
  /** The question for a condition such as "more than $27$" or "from $20$ to $29$". */
  ask: (cond: string) => string;
  /** "fewer" for counts, "less" for measures. */
  fewer: string;
  suffix: string;
}
const STEMS: StemCtx[] = [
  { setup: 'Students counted how many times they could skip rope in one minute.', noun: 'students', lo: 21, hi: 58, val: (v) => `$${v}$ skips`, ask: (c) => `How many students skipped rope ${c} times?`, fewer: 'fewer', suffix: 'skips' },
  { setup: 'A Grade 5 class recorded the high temperature in their town each day for two weeks in July, in degrees Celsius.', noun: 'days', lo: 21, hi: 36, val: (v) => `$${v}^\\circ\\text{C}$`, ask: (c) => `On how many days was the high temperature ${c} degrees Celsius?`, fewer: 'less', suffix: '°C' },
  { setup: 'Students in a Grade 5 class wrote a spelling quiz marked out of $50$.', noun: 'students', lo: 24, hi: 50, val: (v) => `$${v}$ points`, ask: (c) => `How many students scored ${c} points?`, fewer: 'fewer', suffix: 'points' },
  { setup: 'Students grew bean plants in class and measured their heights in centimetres after one month.', noun: 'plants', lo: 12, hi: 45, val: (v) => `$${v}$ cm`, ask: (c) => `How many plants were ${c} cm tall?`, fewer: 'less', suffix: 'cm' },
  { setup: 'A local basketball team recorded its points in each game of the season.', noun: 'games', lo: 32, hi: 68, val: (v) => `$${v}$ points`, ask: (c) => `In how many games did the team score ${c} points?`, fewer: 'fewer', suffix: 'points' },
  { setup: 'Students recorded how many minutes they read at home on Monday.', noun: 'students', lo: 15, hi: 55, val: (v) => `$${v}$ minutes`, ask: (c) => `How many students read for ${c} minutes?`, fewer: 'fewer', suffix: 'minutes' },
];

function stemData(rng: Rng, n: number): { c: StemCtx; data: number[]; stems: number[] } {
  const c = rng.pick(STEMS);
  const data = rng.shuffle(Array.from({ length: n }, () => rng.int(c.lo, c.hi))).sort((a, b) => a - b);
  const stems = range(Math.floor(c.lo / 10), Math.floor(c.hi / 10));
  return { c, data, stems };
}

function stemFigure(data: number[], stems: number[]): Figure {
  return { type: 'table', headers: ['Stem', 'Leaf'], rows: stems.map((s) => [String(s), data.filter((v) => Math.floor(v / 10) === s).map((v) => v % 10).join(' ') || ' ']) };
}
const KEY = (data: number[]) => `In the plot, $${Math.floor(data[0] / 10)} \\mid ${data[0] % 10}$ means $${data[0]}$.`;
const STEM_HINT = 'The stem is the tens digit and each leaf is a ones digit. Each leaf is one data value.';

function readStem(rng: Rng): Out {
  const { c, data, stems } = retry(() => stemData(rng, rng.int(10, 15)), (x) => x.stems.every((s) => x.data.some((v) => Math.floor(v / 10) === s)));
  const figure = stemFigure(data, stems);
  const intro = `${c.setup.startsWith('The stem') ? c.setup : `${c.setup} The stem-and-leaf plot shows the data.`} ${KEY(data)}`;
  const kind = rng.pick(['row', 'max', 'count'] as const);
  if (kind === 'row') {
    const s = rng.pick(stems);
    const row = data.filter((v) => Math.floor(v / 10) === s);
    return {
      prompt: `${intro} ${c.ask(`from $${s * 10}$ to $${s * 10 + 9}$`)}`,
      figure,
      parts: [numPart(row.length, { suffix: c.noun })],
      hints: [STEM_HINT, `The values from $${s * 10}$ to $${s * 10 + 9}$ are all in the row with stem $${s}$. Count its leaves.`],
      solution: [`The row with stem $${s}$ has the leaves ${row.map((v) => `$${v % 10}$`).join(', ')}.`, `Those are the values ${row.map((v) => `$${v}$`).join(', ')}.`, `There are $${row.length}$ ${c.noun}.`],
    };
  }
  if (kind === 'max') {
    const top = rng.chance(0.5);
    const v = top ? data[data.length - 1] : data[0];
    return {
      prompt: `${intro} What is the ${top ? 'greatest' : 'least'} value in the data?`,
      figure,
      parts: [numPart(v, { suffix: c.suffix })],
      hints: [STEM_HINT, top ? 'Look at the last row (the greatest stem). Find its greatest leaf.' : 'Look at the first row (the least stem). Find its least leaf.'],
      solution: [`The ${top ? 'greatest' : 'least'} stem is $${Math.floor(v / 10)}$.`, `Its ${top ? 'greatest' : 'least'} leaf is $${v % 10}$.`, `The ${top ? 'greatest' : 'least'} value is ${c.val(v)}.`],
    };
  }
  return {
    prompt: `${intro} How many ${c.noun} are in the data set?`,
    figure,
    parts: [numPart(data.length, { suffix: c.noun })],
    hints: [STEM_HINT, 'Count the leaves in every row, then add.'],
    solution: [`Count the leaves in each row: ${stems.map((s) => `stem $${s}$: $${data.filter((v) => Math.floor(v / 10) === s).length}$`).join(', ')}.`, `Add: $${plus(stems.map((s) => data.filter((v) => Math.floor(v / 10) === s).length))} = ${data.length}$`, `There are $${data.length}$ ${c.noun}.`],
  };
}

function categorizeOpen(rng: Rng): Out {
  const opts = rng.pick([
    {
      q: 'What did you eat for breakfast today?',
      ans: 'toast, cereal, eggs, pancakes, oatmeal, yogurt, a banana, bannock, leftover pizza, a smoothie',
      good: 'Group the answers into categories, such as grains, fruit, dairy and other, then count each category.',
    },
    {
      q: 'What is your favourite animal?',
      ans: 'dog, wolf, horse, cat, eagle, bison, hamster, owl, moose, parrot',
      good: 'Group the answers into categories, such as pets, birds and wild mammals, then count each category.',
    },
    {
      q: 'What do you like to do at recess?',
      ans: 'play tag, swing, read, play soccer, talk with friends, skip rope, climb, play four square, draw',
      good: 'Group the answers into categories, such as active games, quiet activities and playground equipment, then count each category.',
    },
    {
      q: 'What is your favourite thing to do in the summer?',
      ans: 'camping, swimming, biking, reading, fishing, going to the lake, soccer, visiting family, baseball',
      good: 'Group the answers into categories, such as sports, water activities and family activities, then count each category.',
    },
  ]);
  return {
    prompt: `${rng.pick(NAMES)} asked the open-ended question “${opts.q}” and got many different answers, such as ${opts.ans}. Almost every answer is different. What is the best way to organize the data?`,
    parts: [{ answer: mc(rng, opts.good, [
      'Throw out the answers that only one person gave.',
      'Make a bar graph with one bar for every different answer.',
      'Find the mode right away, because there is always one answer that most people gave.',
    ]) }],
    hints: ['When almost every answer is different, each answer has a frequency of $1$. That is hard to read.', 'Answers that are alike can go together in one category.'],
    solution: ['With an open-ended question, people can give any answer, so there are many different answers.', 'Putting answers that are alike into a few categories makes the frequencies useful.', `Best: ${opts.good}`],
    answerDisplay: opts.good,
  };
}

function formulateClosed(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, rng.int(3, 4));
  const other = rng.pick(SURVEYS.filter((x) => x !== s));
  const correct = s.closed(cats);
  return {
    prompt: `${rng.pick(TEACHERS)}’s class wants to answer the statistical question “${s.stat}” Which question should they ask each student to collect the data?`,
    parts: [{ answer: mc(rng, `“${correct}”`, [
      `“${s.open}”`,
      `“${s.yesNo(cats[0])} (yes or no)”`,
      `“${other.closed(rng.sample(other.cats, 3))}”`,
    ]) }],
    hints: ['A good survey question is about the same topic as the statistical question.', 'A closed-list question with the possible choices makes the answers easy to count and compare.'],
    solution: [
      `“${s.open}” is open-ended, so the answers would be hard to count.`,
      `“${s.yesNo(cats[0])}” only asks about one choice, so it cannot show which choice is most popular.`,
      `The question about a different topic does not help.`,
      `Best: “${correct}” It is a closed-list question about the right topic, and the mode of the answers will answer the statistical question.`,
    ],
    answerDisplay: `“${correct}”`,
  };
}

function whichBar(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cats = rng.sample(s.cats, 4);
  const f = freqs(rng, 4, 2, 10, (x) => new Set(x).size === 4);
  const [i, j] = retry(() => rng.sample([0, 1, 2, 3], 2), ([a, b]) => Math.abs(f[a] - f[b]) >= 2);
  const swapped = f.map((v, k) => (k === i ? f[j] : k === j ? f[i] : v));
  const k = rng.int(0, 3);
  const off = f.map((v, n) => (n === k ? v + rng.pick([-1, 1]) : v));
  // A third wrong graph: the same bars in another order (never the table's order or the swap).
  const perms = [[...f].sort((x, y) => y - x), [...f].sort((x, y) => x - y), [...f].reverse(), [f[1], f[2], f[3], f[0]]];
  const cmp = perms.find((p) => p.join() !== f.join() && p.join() !== swapped.join())!;
  const top = (Math.max(...f) + 2);
  const fig = (vals: number[]): Figure => ({ type: 'barChart', categories: cats, values: vals, valueLabel: 'Students', categoryLabel: s.head, max: top, step: 1 });
  const answer = mcFigures(rng, [
    { md: '', figure: fig(f), correct: true },
    { md: '', figure: fig(swapped) },
    { md: '', figure: fig(off) },
    { md: '', figure: fig(cmp) },
  ]);
  const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
  return {
    prompt: `${rng.pick(NAMES)} made a frequency table for the question “${s.q}” Which bar graph shows the same data?`,
    figure: freqTable(s.head, cats, f),
    parts: [{ answer }],
    hints: ['Each bar must be as tall as the frequency of its category.', 'Check every bar, one category at a time.'],
    solution: [`The bars must show ${cats.map((c, n) => `${c} $${f[n]}$`).join(', ')}.`, 'Check each graph bar by bar. In the wrong graphs, some bars are too tall, too short or swapped.', `Graph ${letter} matches the table.`],
  };
}

function stemCount(rng: Rng): Out {
  const { c, data, stems } = retry(
    () => stemData(rng, rng.int(12, 16)),
    (x) => x.stems.every((s) => x.data.some((v) => Math.floor(v / 10) === s)) && x.data[0] !== x.data[x.data.length - 1],
  );
  const figure = stemFigure(data, stems);
  const intro = `${c.setup.startsWith('The stem') ? c.setup : `${c.setup} The stem-and-leaf plot shows the data.`} ${KEY(data)}`;
  // A cut-off inside a middle stem, so students must read leaves on one row and count whole rows.
  const cut = retry(() => rng.int(data[2], data[data.length - 3]), (x) => !data.includes(x) && x % 10 !== 0 && x % 10 !== 9, 100);
  const above = rng.chance(0.5);
  const hit = data.filter((v) => (above ? v > cut : v < cut));
  const s0 = Math.floor(cut / 10);
  const rowsFull = stems.filter((s) => (above ? s > s0 : s < s0));
  const part0 = data.filter((v) => Math.floor(v / 10) === s0 && (above ? v > cut : v < cut));
  return {
    prompt: `${intro} ${c.ask(`${above ? 'more' : c.fewer} than $${cut}$`)}`,
    figure,
    parts: [numPart(hit.length, { suffix: c.noun })],
    hints: [STEM_HINT, `Find the row with stem $${s0}$ and count only the leaves ${above ? 'greater' : 'less'} than $${cut % 10}$. Then add every leaf in the rows ${above ? 'below' : 'above'} it.`],
    solution: [
      `In the row with stem $${s0}$, the values ${above ? 'greater' : 'less'} than $${cut}$ are ${part0.length ? part0.map((v) => `$${v}$`).join(', ') : 'none'}: $${part0.length}$.`,
      rowsFull.length ? `All the leaves in the ${rowsFull.length > 1 ? 'rows with stems' : 'row with stem'} ${listWords(rowsFull.map((s) => `$${s}$`))} count too: $${hit.length - part0.length}$.` : 'No other rows count.',
      `Add: $${part0.length} + ${hit.length - part0.length} = ${hit.length}$`,
      `The answer is $${hit.length}$ ${c.noun}.`,
    ],
  };
}

const frequencyDisplays = skill({
  id: 'm5-frequency-displays',
  name: 'Collecting and displaying data',
  description: 'Tell closed-list from open-ended questions, organize answers in a frequency table, and read and choose bar graphs, dot plots and stem-and-leaf plots.',
  outcomes: ['S1'],
  lessonId: 'm5-12-2',
  gen(rng, d: Difficulty) {
    if (d === 1) {
      const k = rng.pick(['type', 'bar', 'dot'] as const);
      return k === 'type' ? closedOrOpen(rng) : k === 'bar' ? readBar(rng) : readDot(rng);
    }
    if (d === 2) {
      const k = rng.weighted([['table', 2], ['stem', 2], ['dot', 2], ['categorize', 1]] as const);
      return k === 'table' ? makeFreqTable(rng) : k === 'stem' ? readStem(rng) : k === 'dot' ? dotQuestion(rng) : categorizeOpen(rng);
    }
    const k = rng.pick(['formulate', 'whichBar', 'stem'] as const);
    return k === 'formulate' ? formulateClosed(rng) : k === 'whichBar' ? whichBar(rng) : stemCount(rng);
  },
});

export const DATA_SKILLS: SkillDef[] = [frequencyMode, frequencyDisplays];
