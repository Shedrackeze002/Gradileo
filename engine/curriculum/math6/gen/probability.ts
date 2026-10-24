/** Math 6 Unit 12 — Relative Frequency and Probability (S1). */
import { fixedChoice, mc, multi, numPart, retry, skill } from '../../helpers.ts';
import { fmt, gcd } from '../../../math/numbers.ts';
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

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const plus = (a: number[]) => a.join(' + ');
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
function lowest(n: number, d: number): [number, number] {
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}
function frLow(n: number, d: number): string {
  const [a, b] = lowest(n, d);
  return b === 1 ? `${a}` : fr(a, b);
}
/** \frac{6}{20} = \frac{3}{10} (the simplified form only when it differs). */
function frSimp(n: number, d: number): string {
  const [a, b] = lowest(n, d);
  if (a === n) return fr(n, d);
  return b === 1 ? `${fr(n, d)} = ${a}` : `${fr(n, d)} = ${fr(a, b)}`;
}
function listWords(ws: string[], joiner = 'and'): string {
  if (ws.length <= 1) return ws.join('');
  return ws.length === 2 ? `${ws[0]} ${joiner} ${ws[1]}` : `${ws.slice(0, -1).join(', ')} ${joiner} ${ws[ws.length - 1]}`;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const RF_RULE = '**Relative frequency** $= \\dfrac{\\text{frequency of the category}}{\\text{total number of data values}}$';

/** f/t as a decimal (t divides 100), with working by an equivalent fraction over 100. */
function asHundredths(f: number, t: number): { dec: number; pct: number; steps: string[] } {
  const k = 100 / t;
  const h = f * k;
  return {
    dec: h / 100,
    pct: h,
    steps: k === 1 ? [`$${fr(f, t)}$ is already in hundredths.`] : [`Multiply the top and bottom by $${k}$ to get an equivalent fraction with denominator $100$: $${fr(f, t)} = ${fr(h, 100)}$`],
  };
}

interface Survey {
  setup: (n: number, who: string) => string;
  /** For students: what they were asked about. */
  topic?: string;
  head: string;
  cats: string[];
  noun: string;
}

const SURVEYS: Survey[] = [
  { setup: (n, t) => `${t} asked the $${n}$ students in a Grade 6 class how they get to school.`, head: 'How they get to school', topic: 'how they get to school', cats: ['Walk', 'Bus', 'Car', 'Bike'], noun: 'students' },
  { setup: (n) => `A Grade 6 class counted the colours of the next $${n}$ cars that drove past their school.`, head: 'Car colour', cats: ['White', 'Black', 'Grey', 'Red', 'Blue'], noun: 'cars' },
  { setup: (n) => `A student watched a bird feeder and recorded the first $${n}$ birds that visited.`, head: 'Bird', cats: ['Chickadee', 'Sparrow', 'Blue jay', 'Woodpecker'], noun: 'birds' },
  { setup: (n) => `A school cafeteria counted the $${n}$ lunches it sold on Friday.`, head: 'Lunch', cats: ['Pizza', 'Soup', 'Wrap', 'Salad'], noun: 'lunches' },
  { setup: (n, t) => `${t} asked $${n}$ students which sport they would most like to play at the winter carnival.`, head: 'Sport', topic: 'which winter sport they would most like to play', cats: ['Hockey', 'Skating', 'Curling', 'Snowshoeing'], noun: 'students' },
  { setup: (n, t) => `${t} asked $${n}$ students which season they like best.`, head: 'Season', topic: 'which season they like best', cats: ['Winter', 'Spring', 'Summer', 'Fall'], noun: 'students' },
  { setup: (n, t) => `${t} asked $${n}$ students which pet they would most like to have.`, head: 'Pet', topic: 'which pet they would most like to have', cats: ['Dog', 'Cat', 'Fish', 'Bird'], noun: 'students' },
  { setup: (n) => `A school library recorded the kind of book borrowed by each of $${n}$ students.`, head: 'Kind of book', cats: ['Mystery', 'Graphic novel', 'Science', 'Adventure'], noun: 'books' },
];

/** Frequencies that add to `total`, each at least `min`. */
function split(rng: Rng, total: number, n: number, min = 1): number[] {
  return retry(
    () => {
      const cuts = rng.sample(range(1, total - 1), n - 1).sort((a, b) => a - b);
      return [...cuts, total].map((c, k) => c - (k ? cuts[k - 1] : 0));
    },
    (f) => f.every((x) => x >= min),
    500,
  );
}

function freqTable(head: string, cats: string[], f: number[], withTotal = false): Figure {
  const rows = cats.map((c, i) => [c, String(f[i])]);
  if (withTotal) rows.push(['Total', String(sum(f))]);
  return { type: 'table', headers: [head, 'Frequency'], rows };
}

// ---------------------------------------------------------------------------
// 12.1 Relative frequency
// ---------------------------------------------------------------------------

function rfSimple(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const n = rng.int(3, 4);
  const cats = rng.sample(s.cats, n);
  const total = rng.pick([10, 12, 16, 20, 24, 30]);
  const f = split(rng, total, n, 1);
  const i = retry(() => rng.int(0, n - 1), (k) => f[k] > 1 || rng.chance(0.2));
  const form = total === 10 ? rng.pick(['fraction', 'decimal'] as const) : 'fraction';
  return {
    prompt: `${s.setup(total, rng.pick(TEACHERS))} The frequency table shows the results. What is the relative frequency of ${cats[i]}? ${form === 'fraction' ? 'Write it as a fraction in lowest terms.' : 'Write it as a decimal.'}`,
    figure: freqTable(s.head, cats, f, true),
    parts: [form === 'fraction' ? numPart(f[i] / total, { fraction: 'lowest' }) : numPart(f[i] / total, { asDecimal: true })],
    hints: [RF_RULE, `The frequency of ${cats[i]} is $${f[i]}$ and the total is $${total}$.`],
    solution: [
      `Frequency of ${cats[i]}: $${f[i]}$. Total: $${total}$.`,
      `Relative frequency $= ${form === 'fraction' ? frSimp(f[i], total) : fr(f[i], total)}$`,
      ...(form === 'decimal' ? [`$${fr(f[i], total)}$ is $${f[i]}$ tenths $= ${fmt(f[i] / total)}$`] : []),
      `The relative frequency of ${cats[i]} is $${form === 'fraction' ? frLow(f[i], total) : fmt(f[i] / total)}$.`,
    ],
  };
}

function rfThreeForms(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const n = rng.int(3, 4);
  const cats = rng.sample(s.cats, n);
  const total = rng.pick([20, 25, 50]);
  const f = split(rng, total, n, 2);
  const i = rng.int(0, n - 1);
  const h = asHundredths(f[i], total);
  return {
    prompt: `${s.setup(total, rng.pick(TEACHERS))} The frequency table shows the results. Write the relative frequency of ${cats[i]} as a fraction in lowest terms, as a decimal and as a percentage.`,
    figure: freqTable(s.head, cats, f),
    parts: [
      numPart(f[i] / total, { label: 'Fraction:', fraction: 'lowest' }),
      numPart(h.dec, { label: 'Decimal:', asDecimal: true }),
      numPart(h.pct, { label: 'Percentage:', suffix: '%' }),
    ],
    hints: [`${RF_RULE} First add the frequencies to find the total.`, 'To get a decimal and a percentage, write an equivalent fraction with denominator $100$.'],
    solution: [
      `Total: $${plus(f)} = ${total}$`,
      `Fraction: $${frSimp(f[i], total)}$`,
      ...h.steps,
      `Decimal: $${fmt(h.pct)}$ hundredths $= ${fmt(h.dec)}$. Percentage: $${fmt(h.pct)}$ out of $100 = ${fmt(h.pct)}\\%$.`,
      `The relative frequency is $${frLow(f[i], total)} = ${fmt(h.dec)} = ${fmt(h.pct)}\\%$.`,
    ],
  };
}

function rfCompare(rng: Rng): Out {
  const s = rng.pick(SURVEYS.filter((x) => x.topic));
  const cats = rng.sample(s.cats, 3);
  const [tA, tB] = rng.pick([[20, 50], [25, 50], [50, 20], [50, 25], [20, 25], [25, 20]]);
  // The bigger group has more in the category but a smaller relative frequency (or the reverse), so raw counts mislead.
  const pair = retry(
    () => {
      const a = rng.int(3, tA - 6);
      const b = rng.int(3, tB - 6);
      return { a, b };
    },
    ({ a, b }) => {
      const pa = (100 * a) / tA;
      const pb = (100 * b) / tB;
      return pa !== pb && Math.abs(pa - pb) >= 4 && (a - b) * (pa - pb) < 0;
    },
    500,
  );
  const fA = [pair.a, ...split(rng, tA - pair.a, 2, 1)];
  const fB = [pair.b, ...split(rng, tB - pair.b, 2, 1)];
  const pa = (100 * pair.a) / tA;
  const pb = (100 * pair.b) / tB;
  const [gA, gB] = rng.pick([['Ms. Okafor’s class', 'Mr. Dhillon’s class'], ['Grade 5', 'Grade 6'], ['the morning group', 'the afternoon group'], ['School A', 'School B']]);
  const correct = `${cap(pa > pb ? gA : gB)}, because its relative frequency is greater.`;
  return {
    prompt: `Students in two groups were asked ${s.topic}. The table shows the results for ${gA} ($${tA}$ students) and ${gB} ($${tB}$ students). Find the relative frequency of ${cats[0]} in each group as a percentage. Then decide: in which group is ${cats[0]} a bigger part of the group?`,
    figure: { type: 'table', headers: [s.head, cap(gA), cap(gB)], rows: [...cats.map((c, k) => [c, String(fA[k]), String(fB[k])]), ['Total', String(tA), String(tB)]] },
    parts: [
      numPart(pa, { label: `${cap(gA)}:`, suffix: '%' }),
      numPart(pb, { label: `${cap(gB)}:`, suffix: '%' }),
      { label: 'Bigger part:', answer: mc(rng, correct, [
        `${cap(pair.a > pair.b ? gA : gB)}, because its frequency is greater.`,
        'Neither, because the groups are different sizes and cannot be compared.',
      ]) },
    ],
    hints: ['The groups have different totals, so comparing the frequencies alone is not fair.', `Relative frequency $=$ frequency $\\div$ total. Write each one as a fraction with denominator $100$ to get a percentage.`],
    solution: [
      `${cap(gA)}: $${fr(pair.a, tA)} = ${fr(pa, 100)} = ${fmt(pa)}\\%$`,
      `${cap(gB)}: $${fr(pair.b, tB)} = ${fr(pb, 100)} = ${fmt(pb)}\\%$`,
      `${cap(pair.a > pair.b ? gA : gB)} has the greater frequency, but ${pa > pb ? gA : gB} has the greater relative frequency.`,
      `${correct}`,
    ],
  };
}

function rfReverse(rng: Rng): Out {
  const s = rng.pick(SURVEYS);
  const cat = rng.pick(s.cats);
  const total = rng.pick([20, 25, 50]);
  const f = rng.int(2, total - 3);
  const h = asHundredths(f, total);
  const asPct = rng.chance(0.5);
  return {
    prompt: `${s.setup(total, rng.pick(TEACHERS))} The relative frequency of ${cat} was ${asPct ? `$${fmt(h.pct)}\\%$` : `$${fmt(h.dec)}$`}. What was the frequency of ${cat}?`,
    parts: [numPart(f, { suffix: s.noun })],
    hints: [`${RF_RULE} Here you know the relative frequency and the total. You need the frequency.`, `${asPct ? `$${fmt(h.pct)}\\%$` : `$${fmt(h.dec)}$`} means $${fmt(h.pct)}$ out of every $100$. Find the same fraction of $${total}$.`],
    solution: [
      `${asPct ? `$${fmt(h.pct)}\\%$` : `$${fmt(h.dec)}$`} $= ${fr(h.pct, 100)}$`,
      `The total is $${total}$, and $100 \\div ${total} = ${100 / total}$.`,
      `Divide the top and bottom by $${100 / total}$: $${fr(h.pct, 100)} = ${fr(f, total)}$`,
      `The frequency of ${cat} was $${f}$ ${s.noun}.`,
    ],
  };
}

const relativeFrequency = skill({
  id: 'm6-relative-frequency',
  name: 'Relative frequency',
  description: 'Find relative frequency as frequency divided by the total, write it as a fraction, decimal and percentage, and use it to compare a category across data sets of different sizes.',
  outcomes: ['S1'],
  lessonId: 'm6-12-1',
  gen(rng, d) {
    if (d === 1) return rfSimple(rng);
    if (d === 2) return rfThreeForms(rng);
    return rng.chance(0.6) ? rfCompare(rng) : rfReverse(rng);
  },
});

// ---------------------------------------------------------------------------
// 12.2 Experiments and likelihood
// ---------------------------------------------------------------------------

const COLOURS = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
/** The colours a circle graph gives its first five slices, in order. */
const SPINNER_COLOURS = ['Blue', 'Orange', 'Green', 'Yellow', 'Pink'];

interface Exp {
  /** "Kai spins this spinner." */
  setup: (name: string) => string;
  /** Present tense action for n trials: "spins the spinner". */
  act: string;
  outcomes: string[];
  figure?: Figure;
  /** Short name of one trial: "spin", "roll", "toss", "pick". */
  trial: string;
  /** The experiment as an instruction: "toss a coin". */
  base: string;
}

function spinner(k: number, labels: string[]): Figure {
  return { type: 'circleGraph', slices: labels.slice(0, k).map((l) => ({ label: l, value: 1 })), show: 'none' };
}

function experiment(rng: Rng, kinds: Array<'coin' | 'die' | 'colourSpinner' | 'numberSpinner' | 'cards' | 'bag'> = ['coin', 'die', 'colourSpinner', 'numberSpinner', 'cards', 'bag']): Exp {
  const kind = rng.pick(kinds);
  if (kind === 'coin') return { setup: (n) => `${n} tosses a coin.`, act: 'tosses a coin', outcomes: ['Heads', 'Tails'], trial: 'toss', base: 'toss a coin' };
  if (kind === 'die') return { setup: (n) => `${n} rolls a fair six-sided die numbered $1$ to $6$.`, act: 'rolls a six-sided die', outcomes: range(1, 6).map(String), trial: 'roll', base: 'roll a six-sided die numbered $1$ to $6$' };
  if (kind === 'colourSpinner') {
    // The circle graph colours its slices in a fixed order, so the names follow that order.
    const k = rng.int(3, 5);
    const cols = SPINNER_COLOURS.slice(0, k);
    return { setup: (n) => `${n} spins this spinner. It has $${k}$ equal sections.`, act: 'spins the spinner', outcomes: cols, figure: spinner(k, cols), trial: 'spin', base: `spin a spinner with $${k}$ equal sections coloured ${listWords(cols.map((c) => c.toLowerCase()))}` };
  }
  if (kind === 'numberSpinner') {
    const k = rng.int(4, 6);
    const nums = range(1, k).map(String);
    return { setup: (n) => `${n} spins this spinner. It has $${k}$ equal sections numbered $1$ to $${k}$.`, act: 'spins the spinner', outcomes: nums, figure: spinner(k, nums), trial: 'spin', base: `spin a spinner with $${k}$ equal sections numbered $1$ to $${k}$` };
  }
  if (kind === 'cards') {
    const k = rng.pick([5, 8, 10]);
    return { setup: (n) => `${n} has $${k}$ cards numbered $1$ to $${k}$. ${n} shuffles them and picks one card without looking.`, act: 'picks a card (and puts it back)', outcomes: range(1, k).map(String), trial: 'pick', base: `pick one of $${k}$ cards numbered $1$ to $${k}$ without looking, then put it back` };
  }
  const k = rng.int(3, 5);
  const cols = rng.sample(COLOURS, k).map((c) => c.toLowerCase());
  return { setup: (n) => `A bag holds $${k}$ cubes of the same size: ${listWords(cols.map((c) => `one ${c}`))}. ${n} picks one cube without looking.`, act: 'picks a cube (and puts it back)', outcomes: cols.map(cap), trial: 'pick', base: `pick one cube without looking from a bag with ${listWords(cols.map((c) => `one ${c}`))} cube, then put it back` };
}

const plural = (t: string) => (t.endsWith('s') ? `${t}es` : `${t}s`);
const isNum = (e: Exp) => /^\d+$/.test(e.outcomes[0]);

/** An event made of some outcomes of a numbered experiment. */
function numEvent(rng: Rng, e: Exp): { words: string; hits: string[] } {
  const k = e.outcomes.length;
  const m = rng.int(2, k - 2);
  const ev = rng.pick([
    { words: 'an even number', test: (x: number) => x % 2 === 0 },
    { words: 'an odd number', test: (x: number) => x % 2 === 1 },
    { words: `a number greater than $${m}$`, test: (x: number) => x > m },
    { words: `a number less than $${m}$`, test: (x: number) => x < m },
    { words: 'a multiple of $3$', test: (x: number) => x % 3 === 0 },
  ]);
  return { words: ev.words, hits: e.outcomes.filter((o) => ev.test(Number(o))) };
}

function countOutcomes(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = experiment(rng);
  const k = e.outcomes.length;
  return {
    prompt: `${e.setup(name)} How many possible outcomes are there? (Each outcome is equally likely.)`,
    figure: e.figure,
    parts: [numPart(k, { suffix: 'outcomes' })],
    hints: ['An **outcome** is one result that can happen.', 'List every result that could happen, then count them.'],
    solution: [`The possible outcomes are ${listWords(e.outcomes.map((o) => (/^\d+$/.test(o) ? `$${o}$` : o.toLowerCase())))}.`, `Count them: there are $${k}$.`, `There are $${k}$ equally likely outcomes.`],
  };
}

function eventOutcomes(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = experiment(rng, ['die', 'numberSpinner', 'cards']);
  const ev = retry(() => numEvent(rng, e), (x) => x.hits.length >= 1 && x.hits.length < e.outcomes.length);
  return {
    prompt: `${e.setup(name)} Which outcomes make up the event “${ev.words}”? Select all that apply.`,
    figure: e.figure,
    parts: [{ answer: multi(rng, e.outcomes.map((o) => ({ md: `$${o}$`, correct: ev.hits.includes(o) })), true) }],
    hints: ['An **event** is a group of one or more outcomes.', `Check each possible outcome: is it ${ev.words}?`],
    solution: [`The possible outcomes are ${listWords(e.outcomes.map((o) => `$${o}$`))}.`, `The ones that are ${ev.words}: ${listWords(ev.hits.map((o) => `$${o}$`))}.`, `The event is made of $${ev.hits.length}$ outcome${ev.hits.length === 1 ? '' : 's'}: ${listWords(ev.hits.map((o) => `$${o}$`))}.`],
    answerDisplay: listWords(ev.hits.map((o) => `$${o}$`)),
  };
}

const LIKELY = ['Impossible', 'Unlikely', 'Equally likely to happen or not happen', 'Likely', 'Certain'];
function likelyIndex(f: number, t: number): number {
  if (f === 0) return 0;
  if (f === t) return 4;
  if (2 * f === t) return 2;
  return 2 * f < t ? 1 : 3;
}

function describeLikelihood(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = experiment(rng, ['die', 'numberSpinner', 'cards']);
  const k = e.outcomes.length;
  const target = rng.int(0, 4);
  let words: string;
  let hits: string[];
  if (target === 0) {
    words = `a number greater than $${k}$`;
    hits = [];
  } else if (target === 4) {
    words = `a number less than $${k + 1}$`;
    hits = e.outcomes;
  } else {
    const ev = retry(() => numEvent(rng, e), (x) => likelyIndex(x.hits.length, k) === target, 100);
    ({ words, hits } = ev);
  }
  const idx = likelyIndex(hits.length, k);
  return {
    prompt: `${e.setup(name)} How likely is the event “${words}”?`,
    figure: e.figure,
    parts: [{ answer: fixedChoice(LIKELY, idx) }],
    hints: ['List the outcomes that are in the event and count them.', `Compare with all $${k}$ outcomes: none, fewer than half, exactly half, more than half, or all of them?`],
    solution: [
      hits.length ? `The outcomes in the event are ${listWords(hits.map((o) => `$${o}$`))}: $${hits.length}$ of the $${k}$ equally likely outcomes.` : `No outcome is ${words}: $0$ of the $${k}$ outcomes.`,
      ['None of the outcomes are in the event.', 'Fewer than half of the outcomes are in the event.', 'Exactly half of the outcomes are in the event.', 'More than half of the outcomes are in the event.', 'Every outcome is in the event.'][idx],
      `The event is ${LIKELY[idx].toLowerCase()}.`,
    ],
    answerDisplay: LIKELY[idx],
  };
}

function moreLikely(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = experiment(rng, ['die', 'numberSpinner', 'cards']);
  const k = e.outcomes.length;
  const [A, B] = retry(() => [numEvent(rng, e), numEvent(rng, e)], ([p, q]) => p.words !== q.words && p.hits.length !== q.hits.length && p.hits.length > 0 && q.hits.length > 0, 200);
  const big = A.hits.length > B.hits.length ? A : B;
  const small = big === A ? B : A;
  const correct = `${cap(big.words)}, because it has more of the equally likely outcomes.`;
  return {
    prompt: `${e.setup(name)} Which event is more likely: “${A.words}” or “${B.words}”?`,
    figure: e.figure,
    parts: [{ answer: mc(rng, correct, [
      `${cap(small.words)}, because it has more of the equally likely outcomes.`,
      'They are equally likely, because every outcome is equally likely.',
    ]) }],
    hints: ['List the outcomes in each event.', 'The event with more of the equally likely outcomes is more likely to happen.'],
    solution: [
      `${cap(A.words)}: ${listWords(A.hits.map((o) => `$${o}$`))}, which is $${A.hits.length}$ of $${k}$ outcomes.`,
      `${cap(B.words)}: ${listWords(B.hits.map((o) => `$${o}$`))}, which is $${B.hits.length}$ of $${k}$ outcomes.`,
      `${correct}`,
    ],
    answerDisplay: correct,
  };
}

/** Deterministic results of n trials of an experiment with equally likely outcomes. */
function simulate(rng: Rng, k: number, n: number): number[] {
  const counts = Array(k).fill(0) as number[];
  for (let t = 0; t < n; t++) counts[Math.min(k - 1, Math.floor(rng.next() * k))]++;
  return counts;
}

function rfFromExperiment(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = experiment(rng, ['coin', 'die', 'colourSpinner', 'numberSpinner', 'bag']);
  const k = e.outcomes.length;
  const n = rng.pick([20, 25, 50]);
  const counts = retry(() => simulate(rng, k, n), (c) => c.every((x) => x > 0), 100);
  const i = rng.int(0, k - 1);
  const form = rng.pick(['fraction', 'decimal', 'percentage'] as const);
  const h = asHundredths(counts[i], n);
  const label = isNum(e) ? `“${e.outcomes[i]}”` : e.outcomes[i].toLowerCase();
  return {
    prompt: `${name} did this experiment $${n}$ times: ${e.base}. The table shows the results. What is the relative frequency of ${label}? ${form === 'fraction' ? 'Write it as a fraction in lowest terms.' : form === 'decimal' ? 'Write it as a decimal.' : 'Write it as a percentage.'}`,
    figure: { type: 'table', headers: ['Outcome', 'Frequency'], rows: e.outcomes.map((o, j) => [o, String(counts[j])]) },
    parts: [form === 'fraction' ? numPart(counts[i] / n, { fraction: 'lowest' }) : form === 'decimal' ? numPart(h.dec, { asDecimal: true }) : numPart(h.pct, { suffix: '%' })],
    hints: [RF_RULE.replace('data values', 'trials'), `${cap(label)} happened $${counts[i]}$ times in $${n}$ trials.`],
    solution: [
      `Relative frequency $= ${form === 'fraction' ? frSimp(counts[i], n) : fr(counts[i], n)}$`,
      ...(form === 'fraction' ? [] : h.steps),
      `The relative frequency of ${label} is $${form === 'fraction' ? frLow(counts[i], n) : form === 'decimal' ? fmt(h.dec) : `${fmt(h.pct)}\\%`}$.`,
    ],
  };
}

function expectCount(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = experiment(rng, ['coin', 'die', 'colourSpinner', 'numberSpinner']);
  const k = e.outcomes.length;
  let words: string;
  let hits: string[];
  if (isNum(e) && rng.chance(0.6)) {
    ({ words, hits } = retry(() => numEvent(rng, e), (x) => x.hits.length > 0));
  } else {
    const o = rng.pick(e.outcomes);
    words = isNum(e) ? `a $${o}$` : o.toLowerCase();
    hits = [o];
  }
  const f = hits.length;
  const n = k * rng.pick([5, 10, 12, 20, 30]);
  const exp = (n * f) / k;
  return {
    prompt: `${e.setup(name)} ${name} plans to do this $${n}$ times. About how many times should ${name} expect to get ${words}?`,
    figure: e.figure,
    parts: [numPart(exp, { suffix: 'times' })],
    hints: [`There are $${k}$ equally likely outcomes, and $${f}$ of them ${f === 1 ? 'is' : 'are'} in the event.`, `So expect the event about $${f}$ out of every $${k}$ times. Find that part of $${n}$.`],
    solution: [
      `The event happens for $${f}$ of the $${k}$ equally likely outcomes.`,
      `In $${n}$ trials: $${n} \\div ${k} = ${n / k}$${f > 1 ? `, and $${n / k} \\times ${f} = ${exp}$` : ''}.`,
      `${name} should expect ${words} about $${exp}$ times. (The real result will probably be close to this, not exactly equal.)`,
    ],
  };
}

function largeNumbers(rng: Rng): Out {
  const e = experiment(rng, ['coin', 'die', 'colourSpinner', 'numberSpinner']);
  const k = e.outcomes.length;
  const i = rng.int(0, k - 1);
  const label = isNum(e) ? `“${e.outcomes[i]}”` : e.outcomes[i].toLowerCase();
  const [a, b] = rng.sample(NAMES, 2);
  const small = rng.pick([10, 20]);
  const big = rng.pick([200, 500, 1000]);
  const exact = small / k;
  const cs = Math.max(0, Math.min(small, Math.round(exact) + rng.pick([-1, 1]) * rng.int(2, 3)));
  const cb = Math.round(big / k) + rng.int(-5, 5);
  const ps = (100 * cs) / small;
  const pb = (100 * cb) / big;
  const correct = `${b}’s, because more trials usually give a better estimate of the likelihood.`;
  return {
    prompt: `${a} and ${b} each did the same experiment: ${e.base}. ${a} did $${small}$ ${plural(e.trial)} and ${b} did $${big}$ ${plural(e.trial)}. The table shows how often each got ${label}. Whose relative frequency is probably the better estimate of how likely ${label} is?`,
    figure: { type: 'table', headers: ['Student', 'Trials', `Times ${label}`, 'Relative frequency'], rows: [[a, String(small), String(cs), `${fmt(ps, 1)}%`], [b, String(big), String(cb), `${fmt(pb, 1)}%`]] },
    parts: [{ answer: mc(rng, correct, [
      `${a}’s, because a small experiment has fewer chances to go wrong.`,
      'They are equally good estimates, because it is the same experiment.',
      `Neither, because relative frequency cannot tell anything about likelihood.`,
    ]) }],
    hints: [`There are $${k}$ equally likely outcomes, so ${label} should happen about $1$ out of every $${k}$ times.`, 'The **law of large numbers**: the more trials you do, the closer the relative frequency usually gets to the expected likelihood.'],
    solution: [
      `Expected: about $1$ out of $${k}$ trials, or about $${fmt(100 / k, 1)}\\%$.`,
      `${a}: $${fmt(ps, 1)}\\%$ from only $${small}$ trials. ${b}: $${fmt(pb, 1)}\\%$ from $${big}$ trials.`,
      'With only a few trials, results can be far from expected just by chance. With many trials, the relative frequency usually settles close to the expected likelihood.',
      `Answer: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

function resultsVary(rng: Rng): Out {
  const e = experiment(rng, ['coin', 'die', 'colourSpinner', 'numberSpinner']);
  const k = e.outcomes.length;
  const i = rng.int(0, k - 1);
  const label = isNum(e) ? `“${e.outcomes[i]}”` : e.outcomes[i].toLowerCase();
  const n = rng.pick([20, 25]);
  const groups = rng.sample(NAMES, 3);
  const counts = retry(() => groups.map(() => simulate(rng, k, n)[i]), (c) => new Set(c).size === 3, 100);
  const correct = 'No. Relative frequency changes from one set of trials to another just by chance.';
  return {
    prompt: `Three students each did the same experiment $${n}$ times: ${e.base}. They counted how often they got ${label}. Their results are all different. Does this mean someone made a mistake?`,
    figure: { type: 'table', headers: ['Student', 'Trials', `Times ${label}`, 'Relative frequency'], rows: groups.map((g, j) => [g, String(n), String(counts[j]), `${fmt((100 * counts[j]) / n, 1)}%`]) },
    parts: [{ answer: mc(rng, correct, [
      'Yes. If they did the experiment the same way, they must get the same results.',
      `Yes. The student whose result is farthest from $1$ out of $${k}$ must have done it wrong.`,
      'No. The results are different because relative frequency is the same as the total.',
    ]) }],
    hints: ['Think about tossing a coin $10$ times. Do you always get exactly $5$ heads?', 'Results of experiments vary by chance, especially with a small number of trials.'],
    solution: [
      `The relative frequencies are ${listWords(counts.map((c) => `$${fmt((100 * c) / n, 1)}\\%$`))}.`,
      'Each set of trials is different. Chance makes the results vary, even when everyone does the experiment correctly.',
      'With more trials, the results would usually get closer to each other and to the expected likelihood.',
      `Answer: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

function pooled(rng: Rng): Out {
  const e = experiment(rng, ['coin', 'colourSpinner', 'numberSpinner', 'die']);
  const k = e.outcomes.length;
  const i = rng.int(0, k - 1);
  const label = isNum(e) ? `“${e.outcomes[i]}”` : e.outcomes[i].toLowerCase();
  const groups = 4;
  const per = 25;
  const counts = Array.from({ length: groups }, () => simulate(rng, k, per)[i]);
  const total = sum(counts);
  const n = groups * per;
  const t = rng.pick(TEACHERS);
  return {
    prompt: `In ${t}’s class, $${groups}$ groups each did the same experiment $${per}$ times: ${e.base}. The table shows how often each group got ${label}. Combine all the results. What is the class’s relative frequency of ${label}, as a percentage?`,
    figure: { type: 'table', headers: ['Group', 'Trials', `Times ${label}`], rows: counts.map((c, j) => [String(j + 1), String(per), String(c)]) },
    parts: [numPart(total, { suffix: '%' })],
    hints: ['Add the counts from all the groups. Add the trials from all the groups too.', `Relative frequency $=$ total count $\\div$ total trials. With $${n}$ trials, the fraction is already out of $100$.`],
    solution: [
      `Times ${label}: $${plus(counts)} = ${total}$`,
      `Trials: $${groups} \\times ${per} = ${n}$`,
      `Relative frequency $= ${fr(total, n)} = ${total}\\%$`,
      `The class’s relative frequency is $${total}\\%$. With $${n}$ trials, it is usually a better estimate than any one group’s result (the expected likelihood is about $${fmt(100 / k, 1)}\\%$).`,
    ],
  };
}

const experiments = skill({
  id: 'm6-experiments',
  name: 'Experiments and likelihood',
  description: 'List the equally likely outcomes of an experiment, predict the likelihood of an event, find relative frequency from experiment results, and explain why more trials give a better estimate.',
  outcomes: ['S1'],
  lessonId: 'm6-12-2',
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.5) ? countOutcomes(rng) : eventOutcomes(rng);
    if (d === 2) {
      const k = rng.pick(['describe', 'more', 'rf', 'expect'] as const);
      return k === 'describe' ? describeLikelihood(rng) : k === 'more' ? moreLikely(rng) : k === 'rf' ? rfFromExperiment(rng) : expectCount(rng);
    }
    const k = rng.pick(['large', 'vary', 'pooled'] as const);
    return k === 'large' ? largeNumbers(rng) : k === 'vary' ? resultsVary(rng) : pooled(rng);
  },
});

export const PROBABILITY_SKILLS: SkillDef[] = [relativeFrequency, experiments];
