/** Math 7 Unit 11 — Probability (SP4, SP5, SP6). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const TEACHERS = ['Ms. Okafor', 'Mr. Dhillon', 'Mme Gagnon', 'Mr. Nguyen', 'Ms. Redcrow', 'Mrs. Kowalski', 'Mr. Haddad'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };
type Lvl = Difficulty;

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
function lowest(n: number, d: number): [number, number] {
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}
/** Lowest terms as LaTeX. */
function frLow(n: number, d: number): string {
  const [a, b] = lowest(n, d);
  return b === 1 ? `${a}` : fr(a, b);
}
/** \frac{6}{8} = \frac{3}{4} (the simplified form only when it differs). */
function frSimp(n: number, d: number): string {
  const [a, b] = lowest(n, d);
  if (a === n) return fr(n, d);
  return b === 1 ? `${fr(n, d)} = ${a}` : `${fr(n, d)} = ${fr(a, b)}`;
}
const ratio = (a: number, b: number) => `${a} : ${b}`;
/** A fraction answer that must be in lowest terms. */
const fracPart = (n: number, d: number, label?: string): Part => numPart(n / d, { fraction: 'lowest', label });
const LOWEST = 'Write your answer as a fraction in lowest terms.';
/** "a $6$", "an $8$" */
const aNum = (n: number) => `${n === 8 || n === 11 || n === 18 || (n >= 80 && n < 90) ? 'an' : 'a'} $${n}$`;
function listWords(ws: string[]): string {
  if (ws.length <= 1) return ws.join('');
  return ws.length === 2 ? `${ws[0]} and ${ws[1]}` : `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
}

/** A probability f/t as a percent: exact when it ends within one decimal place, otherwise to the nearest whole percent. */
function pctPart(f: number, t: number, label?: string): { part: Part; ask: string; steps: string[]; shown: string } {
  const p = f / t;
  const pc = 100 * p;
  if (Math.abs(pc * 10 - Math.round(pc * 10)) < 1e-9) {
    return {
      part: numPart(pc, { suffix: '%', label }),
      ask: 'Write your answer as a percent.',
      steps: [`Divide: $${f} \\div ${t} = ${fmt(p, 4)}$`, `Multiply by $100$: $${fmt(p, 4)} \\times 100 = ${fmt(pc, 2)}\\%$`],
      shown: `${fmt(pc, 2)}\\%`,
    };
  }
  const r = Math.round(pc);
  return {
    part: numPart(pc, { suffix: '%', decimals: 0, label }),
    ask: 'Write your answer as a percent, to the nearest whole percent.',
    steps: [`Divide: $${f} \\div ${t} \\approx ${fmt(p, 4)}$`, `Multiply by $100$: $${fmt(p, 4)} \\times 100 \\approx ${fmt(pc, 2)}\\%$`, `Round to the nearest whole percent: $${r}\\%$`],
    shown: `${r}\\%`,
  };
}

/** Ratio choices for a probability f/t: favourable to total, with the classic mix-ups as distractors. */
function ratioChoice(rng: Rng, f: number, t: number): AnswerSpec {
  const [a, b] = lowest(f, t);
  return mc(rng, `$${ratio(a, b)}$`, [`$${ratio(a, b - a)}$`, `$${ratio(b, a)}$`, `$${ratio(b - a, b)}$`, `$${ratio(b - a, a)}$`, `$${ratio(a, a + b)}$`]);
}

const PROB_RULE = 'Probability $= \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of possible outcomes}}$';
const FORMS = 'A probability can be written as a ratio (favourable : total), a fraction (favourable over total) or a percent.';

// ---------------------------------------------------------------------------
// 11.1 Expressing probabilities
// ---------------------------------------------------------------------------

interface Single {
  /** The situation, ending with a sentence. */
  setup: string;
  /** The event, for "the probability that ..." */
  event: string;
  /** Short name for P(...). */
  short: string;
  f: number;
  t: number;
  /** Why there are f favourable outcomes out of t. */
  why: string;
  figure?: Figure;
}

const COLOURS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'white', 'black'];
const BAGS = [
  { thing: 'marble', where: 'A bag', verb: 'picks one marble' },
  { thing: 'counter', where: 'A cup', verb: 'pulls out one counter' },
  { thing: 'jelly bean', where: 'A jar', verb: 'takes one jelly bean' },
  { thing: 'tile', where: 'A box', verb: 'picks one tile' },
  { thing: 'sock', where: 'A drawer', verb: 'grabs one sock' },
];
const WORDS = ['BALLOONS', 'STAFF', 'PLANET', 'WATERSLIDE', 'RAINBOW', 'MAGICAL', 'DOLPHIN', 'COOKIE', 'FROG', 'BALLERINAS', 'TIGER', 'PICTURE'];
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
/** Totals that give a whole-number percent. */
const PCT_TOTALS = [2, 4, 5, 10, 20, 25, 50, 100];

function bagEvent(rng: Rng, name: string, totals: number[] | null, not: boolean): Single {
  const b = rng.pick(BAGS);
  const cols = rng.sample(COLOURS.slice(0, 6), 3);
  const counts = retry(
    () => cols.map(() => rng.int(1, 9)),
    (cs) => new Set(cs).size === 3 && (!totals || totals.includes(sum(cs))),
    500,
  );
  if (totals && !totals.includes(sum(counts))) {
    // Fallback that always works: 2 + 3 + 5 = 10.
    counts.splice(0, 3, 2, 3, 5);
  }
  const t = sum(counts);
  const i = rng.int(0, 2);
  const desc = listWords(cols.map((c, k) => `$${counts[k]}$ ${c}`));
  const setup = `${b.where} has ${desc} ${b.thing}s. ${name} ${b.verb} without looking.`;
  if (not) {
    return {
      setup,
      event: `the ${b.thing} is **not** ${cols[i]}`,
      short: `\\text{not ${cols[i]}}`,
      f: t - counts[i],
      t,
      why: `There are $${counts.join(' + ')} = ${t}$ ${b.thing}s in all. The ones that are not ${cols[i]}: $${t} - ${counts[i]} = ${t - counts[i]}$.`,
    };
  }
  return {
    setup,
    event: `the ${b.thing} is ${cols[i]}`,
    short: `\\text{${cols[i]}}`,
    f: counts[i],
    t,
    why: `There are $${counts.join(' + ')} = ${t}$ ${b.thing}s in all, and $${counts[i]}$ are ${cols[i]}.`,
  };
}

function dieEvent(rng: Rng, name: string): Single {
  const ev = rng.pick([
    { e: 'an even number', s: 'even', f: 3, why: 'The even numbers are $2$, $4$ and $6$.' },
    { e: 'a number greater than $4$', s: '\\text{greater than } 4', f: 2, why: 'The numbers greater than $4$ are $5$ and $6$.' },
    { e: 'a multiple of $3$', s: '\\text{multiple of } 3', f: 2, why: 'The multiples of $3$ are $3$ and $6$.' },
    { e: 'a number less than $5$', s: '\\text{less than } 5', f: 4, why: 'The numbers less than $5$ are $1$, $2$, $3$ and $4$.' },
    { e: 'a $6$', s: '6', f: 1, why: 'There is one $6$.' },
    { e: 'a number greater than $1$', s: '\\text{greater than } 1', f: 5, why: 'The numbers greater than $1$ are $2$, $3$, $4$, $5$ and $6$.' },
    { e: 'a prime number', s: '\\text{prime}', f: 3, why: 'The prime numbers are $2$, $3$ and $5$.' },
  ]);
  return {
    setup: `${name} rolls a fair six-sided die numbered $1$ to $6$.`,
    event: `${name} rolls ${ev.e}`,
    short: ev.s.startsWith('\\') || /^\d/.test(ev.s) ? ev.s : `\\text{${ev.s}}`,
    f: ev.f,
    t: 6,
    why: `There are $6$ equally likely outcomes. ${ev.why}`,
  };
}

function spinnerEvent(rng: Rng, totals: number[] | null): Single {
  const k = rng.pick([4, 5, 8, 10].filter((x) => !totals || totals.includes(x)));
  const m = rng.int(1, k - 2);
  const ev = rng.pick([
    { e: 'an even number', s: '\\text{even}', f: Math.floor(k / 2), why: `The even numbers are ${listWords(Array.from({ length: Math.floor(k / 2) }, (_, i) => `$${2 * i + 2}$`))}.` },
    { e: `a number greater than $${m}$`, s: `\\text{greater than } ${m}`, f: k - m, why: `The numbers greater than $${m}$ are ${listWords(Array.from({ length: k - m }, (_, i) => `$${m + 1 + i}$`))}.` },
    { e: aNum(k), s: `${k}`, f: 1, why: `Only one section shows $${k}$.` },
  ]);
  return {
    setup: `The spinner has $${k}$ equal sections numbered $1$ to $${k}$.`,
    event: `the spinner lands on ${ev.e}`,
    short: ev.s,
    f: ev.f,
    t: k,
    why: `There are $${k}$ equal sections. ${ev.why}`,
    figure: { type: 'circleGraph', slices: Array.from({ length: k }, (_, i) => ({ label: String(i + 1), value: 1 })), show: 'none' },
  };
}

function cardEvent(rng: Rng, name: string, totals: number[] | null): Single {
  const n = rng.pick([10, 12, 15, 20, 25].filter((x) => !totals || totals.includes(x)));
  const evs = [
    { e: 'an even number', s: '\\text{even}', test: (x: number) => x % 2 === 0 },
    { e: 'a multiple of $5$', s: '\\text{multiple of } 5', test: (x: number) => x % 5 === 0 },
    { e: 'a multiple of $3$', s: '\\text{multiple of } 3', test: (x: number) => x % 3 === 0 },
    { e: 'a number greater than $7$', s: '\\text{greater than } 7', test: (x: number) => x > 7 },
    { e: 'a multiple of $4$', s: '\\text{multiple of } 4', test: (x: number) => x % 4 === 0 },
  ];
  const ev = rng.pick(evs);
  const fav = Array.from({ length: n }, (_, i) => i + 1).filter(ev.test);
  return {
    setup: `${name} has $${n}$ cards numbered $1$ to $${n}$. ${name} shuffles them and picks one card without looking.`,
    event: `the card shows ${ev.e}`,
    short: ev.s,
    f: fav.length,
    t: n,
    why: `There are $${n}$ cards. The favourable cards are ${fav.length <= 8 ? listWords(fav.map((x) => `$${x}$`)) : `$${fav.slice(0, 3).join(', ')}, \\ldots, ${fav[fav.length - 1]}$`}: $${fav.length}$ cards.`,
  };
}

function letterEvent(rng: Rng, name: string): Single {
  const w = rng.pick(WORDS);
  const letters = [...w];
  const vowels = letters.filter((c) => VOWELS.has(c)).length;
  const repeated = [...new Set(letters)].filter((c) => letters.filter((x) => x === c).length >= 2);
  const evs: Array<{ e: string; s: string; f: number; why: string }> = [
    { e: 'a vowel (A, E, I, O or U)', s: '\\text{vowel}', f: vowels, why: `The vowels in ${w} are ${letters.filter((c) => VOWELS.has(c)).join(', ')}.` },
    { e: 'a consonant (not a vowel)', s: '\\text{consonant}', f: letters.length - vowels, why: `${w} has $${vowels}$ vowels, so $${letters.length} - ${vowels} = ${letters.length - vowels}$ tiles are consonants.` },
  ];
  for (const c of repeated) evs.push({ e: `the letter ${c}`, s: `\\text{${c}}`, f: letters.filter((x) => x === c).length, why: `The letter ${c} appears $${letters.filter((x) => x === c).length}$ times in ${w}.` });
  const ev = rng.pick(evs);
  return {
    setup: `Each letter of the word **${w}** is written on its own tile, and the $${letters.length}$ tiles go into a bag. ${name} picks one tile without looking.`,
    event: `the tile shows ${ev.e}`,
    short: ev.s,
    f: ev.f,
    t: letters.length,
    why: `There are $${letters.length}$ tiles. ${ev.why}`,
  };
}

function nameEvent(rng: Rng, totals: number[] | null): Single {
  const teacher = rng.pick(TEACHERS);
  const t = rng.pick([20, 24, 25, 28, 30].filter((x) => !totals || totals.includes(x)));
  const f = rng.int(3, t - 4);
  const what = rng.pick([
    ['play on a school team', 'plays on a school team', 'team'],
    ['take the bus to school', 'takes the bus to school', 'bus'],
    ['have a pet dog', 'has a pet dog', 'dog'],
    ['were born in this town', 'was born in this town', 'born here'],
    ['play a musical instrument', 'plays a musical instrument', 'instrument'],
  ]);
  return {
    setup: `${teacher}’s class has $${t}$ students, and $${f}$ of them ${what[0]}. ${teacher} draws one student’s name from a hat to pick a helper for the day.`,
    event: `the student chosen ${what[1]}`,
    short: `\\text{${what[2]}}`,
    f,
    t,
    why: `There are $${t}$ names in the hat, and $${f}$ of these students ${what[0]}.`,
  };
}

function singleEvent(rng: Rng, name: string, opts: { pct?: boolean; not?: boolean } = {}): Single {
  const totals = opts.pct ? PCT_TOTALS : null;
  if (opts.not) return bagEvent(rng, name, totals, true);
  const kinds = opts.pct ? (['bag', 'spinner', 'cards', 'names'] as const) : (['bag', 'die', 'spinner', 'cards', 'letters', 'names'] as const);
  const kind = rng.pick(kinds);
  if (kind === 'bag') return bagEvent(rng, name, totals, false);
  if (kind === 'die') return dieEvent(rng, name);
  if (kind === 'spinner') return spinnerEvent(rng, totals);
  if (kind === 'cards') return cardEvent(rng, name, totals);
  if (kind === 'letters') return letterEvent(rng, name);
  return nameEvent(rng, totals);
}

/** A single event whose probability is not 0 or 1 and, optionally, does not give an exact percent. */
function goodEvent(rng: Rng, name: string, opts: { pct?: boolean; not?: boolean; repeating?: boolean } = {}): Single {
  return retry(
    () => singleEvent(rng, name, opts),
    (e) => e.f > 0 && e.f < e.t && (!opts.repeating || Math.abs(((100 * e.f) / e.t) * 10 - Math.round(((100 * e.f) / e.t) * 10)) > 1e-6),
    300,
  );
}

function formsD1(rng: Rng, name: string): Out {
  const form = rng.pick(['fraction', 'fraction', 'percent', 'ratio'] as const);
  const e = goodEvent(rng, name, { pct: form === 'percent' });
  const P = `P(${e.short})`;
  if (form === 'ratio') {
    const [a, b] = lowest(e.f, e.t);
    return {
      prompt: `${e.setup} Which ratio shows the probability that ${e.event}?`,
      figure: e.figure,
      parts: [{ answer: ratioChoice(rng, e.f, e.t) }],
      hints: ['As a ratio, a probability is written as favourable outcomes : total outcomes.', 'Count the favourable outcomes, then all the outcomes. Simplify the ratio if you can.'],
      solution: [e.why, `As a ratio: $${P} = ${ratio(e.f, e.t)}$${a !== e.f ? `, which simplifies to $${ratio(a, b)}$` : ''}.`, `The answer is $${ratio(a, b)}$.`],
      answerDisplay: `$${ratio(a, b)}$`,
    };
  }
  if (form === 'percent') {
    const pc = pctPart(e.f, e.t);
    return {
      prompt: `${e.setup} What is the probability that ${e.event}? ${pc.ask}`,
      figure: e.figure,
      parts: [pc.part],
      hints: [PROB_RULE, 'Write the fraction first. Then divide and multiply by $100$ to get a percent.'],
      solution: [e.why, `$${P} = ${fr(e.f, e.t)}$`, ...pc.steps, `The probability is $${pc.shown}$.`],
    };
  }
  return {
    prompt: `${e.setup} What is the probability that ${e.event}? ${LOWEST}`,
    figure: e.figure,
    parts: [fracPart(e.f, e.t)],
    hints: [PROB_RULE, 'Count the favourable outcomes and all the outcomes. Then divide the top and bottom by their greatest common factor.'],
    solution: [e.why, `$${P} = ${frSimp(e.f, e.t)}$`, `The probability is $${frLow(e.f, e.t)}$.`],
  };
}

const CONVERT_CTX = [
  'that a sunflower seed from a packet sprouts',
  'that a randomly chosen student at Riverside School walks to school',
  'of winning a prize at the ring-toss game at the fun fair',
  'that a randomly chosen car in the school parking lot is white',
  'that a randomly chosen apple from a farm-stand bin is a Honeycrisp',
  'that a randomly chosen hockey card from a pack is a goalie',
  'that a randomly chosen book on the library cart is a graphic novel',
];
/** Lowest-terms probabilities with a percent that ends within one decimal place. */
const NICE: Array<[number, number]> = [
  [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [5, 8], [7, 8], [1, 10], [3, 10], [7, 10], [9, 10],
  [1, 20], [3, 20], [7, 20], [9, 20], [11, 20], [13, 20], [17, 20], [19, 20], [6, 25], [8, 25], [12, 25], [16, 25], [3, 40], [9, 40], [11, 50], [27, 50],
];
const pctOf = ([a, b]: [number, number]) => fmt((100 * a) / b, 2);

function formsConvert(rng: Rng): Out {
  const ctx = rng.pick(CONVERT_CTX);
  const [a, b] = rng.pick(NICE);
  const from = rng.pick(['ratio', 'percent', 'fraction'] as const);
  const to = rng.pick((['ratio', 'percent', 'fraction'] as const).filter((x) => x !== from));
  // A ratio may be given unsimplified, so students must simplify it.
  const k = from === 'ratio' && b <= 20 ? rng.pick([1, 2, 4]) : 1;
  const given = from === 'ratio' ? `$${ratio(a * k, b * k)}$` : from === 'percent' ? `$${pctOf([a, b])}\\%$` : `$${fr(a, b)}$`;
  const toWord = to === 'ratio' ? 'a ratio' : to === 'percent' ? 'a percent' : 'a fraction in lowest terms';
  const prompt = `The probability ${ctx} is ${given}. ${to === 'ratio' ? 'Which ratio shows the same probability?' : `Write this probability as ${toWord}.`}`;
  const pv = (100 * a) / b;
  const pcFrac = Number.isInteger(pv) ? `${fr(pv, 100)}` : `\\frac{${pctOf([a, b])}}{100} = ${fr(Math.round(pv * 10), 1000)}`;
  const step1 = from === 'ratio'
    ? `A ratio of favourable : total gives the fraction $${fr(a * k, b * k)}$${k > 1 ? `, which simplifies to $${fr(a, b)}$` : ''}.`
    : from === 'percent'
      ? `A percent is a number out of $100$: $${pctOf([a, b])}\\% = ${pcFrac} = ${fr(a, b)}$`
      : `The fraction is $${fr(a, b)}$.`;
  const hints = [FORMS, to === 'percent' ? 'Divide the top by the bottom, then multiply by $100$.' : to === 'ratio' ? 'Ratio form: top number : bottom number.' : 'Write the percent over $100$ and simplify.'];
  if (to === 'ratio') {
    return {
      prompt,
      parts: [{ answer: ratioChoice(rng, a, b) }],
      hints,
      solution: [step1, `As a ratio, favourable : total is $${ratio(a, b)}$.`, `The answer is $${ratio(a, b)}$.`],
      answerDisplay: `$${ratio(a, b)}$`,
    };
  }
  if (to === 'percent') {
    const pc = pctPart(a, b);
    return {
      prompt,
      parts: [pc.part],
      hints,
      solution: [step1, ...pc.steps, `The probability is $${pc.shown}$.`],
    };
  }
  return {
    prompt,
    parts: [fracPart(a, b)],
    hints,
    solution: [step1, `In lowest terms the probability is $${fr(a, b)}$.`],
  };
}

function formsD2(rng: Rng, name: string): Out {
  if (rng.chance(0.5)) return formsConvert(rng);
  const e = goodEvent(rng, name, { repeating: rng.chance(0.7) });
  const P = `P(${e.short})`;
  const pc = pctPart(e.f, e.t, 'As a percent');
  return {
    prompt: `${e.setup} What is the probability that ${e.event}? Write it as a fraction in lowest terms and as a percent${pc.ask.includes('nearest') ? ', to the nearest whole percent' : ''}.`,
    figure: e.figure,
    parts: [fracPart(e.f, e.t, 'As a fraction'), pc.part],
    hints: [PROB_RULE, 'Simplify the fraction. For the percent, divide the top by the bottom and multiply by $100$.'],
    solution: [e.why, `$${P} = ${frSimp(e.f, e.t)}$`, ...pc.steps, `The probability is $${frLow(e.f, e.t)}$, or ${pc.ask.includes('nearest') ? 'about ' : ''}$${pc.shown}$.`],
  };
}

const GAMES = ['Ring toss', 'Duck pond', 'Bean-bag throw', 'Plinko', 'Fish pond', 'Basketball shot', 'Coin drop', 'Spin to win'];

function formsOrder(rng: Rng): Out {
  const picks = retry(
    () => rng.sample(NICE, 4),
    (ps) => ps.every((p, i) => ps.every((q, j) => i === j || Math.abs(p[0] / p[1] - q[0] / q[1]) >= 0.03)),
    500,
  );
  const games = rng.sample(GAMES, 4);
  const forms = rng.shuffle(['ratio', 'fraction', 'percent', rng.pick(['ratio', 'fraction', 'percent'])] as const);
  const shown = picks.map(([a, b], i) => (forms[i] === 'ratio' ? `$${ratio(a, b)}$` : forms[i] === 'fraction' ? `$${fr(a, b)}$` : `$${pctOf([a, b])}\\%$`));
  const items: Choice[] = games.map((g, i) => ({ id: 'abcd'[i], md: `${g}: ${shown[i]}` }));
  const order = [0, 1, 2, 3].sort((i, j) => picks[i][0] / picks[i][1] - picks[j][0] / picks[j][1]);
  return {
    prompt: 'Four games at a school fun fair show the probability of winning in different forms. Put the games in order from **least likely** to **most likely** to win.',
    parts: [{ answer: { kind: 'order', items, correctOrder: order.map((i) => items[i].id) } }],
    hints: ['It is hard to compare a ratio, a fraction and a percent. Change them all to the same form.', 'Change each probability to a percent: a ratio $a : b$ is the fraction $\\frac{a}{b}$; divide and multiply by $100$.'],
    solution: [
      ...games.map((g, i) => (forms[i] === 'percent' ? `${g}: ${shown[i]}` : forms[i] === 'ratio' ? `${g}: ${shown[i]} means $${fr(picks[i][0], picks[i][1])} = ${pctOf(picks[i])}\\%$` : `${g}: $${fr(picks[i][0], picks[i][1])} = ${pctOf(picks[i])}\\%$`)),
      `From least to greatest: ${order.map((i) => `${games[i]} ($${pctOf(picks[i])}\\%$)`).join(', ')}.`,
    ],
    answerDisplay: order.map((i) => games[i]).join(', '),
  };
}

function formsThree(rng: Rng, name: string): Out {
  const e = goodEvent(rng, name, { not: true });
  const [a, b] = lowest(e.f, e.t);
  const pc = pctPart(e.f, e.t, 'Percent');
  return {
    prompt: `${e.setup} Write the probability that ${e.event} as a ratio, as a fraction in lowest terms and as a percent${pc.ask.includes('nearest') ? ' (to the nearest whole percent)' : ''}.`,
    parts: [{ label: 'Ratio', answer: ratioChoice(rng, e.f, e.t) }, fracPart(e.f, e.t, 'Fraction'), pc.part],
    hints: ['First count the favourable outcomes: every outcome that is not that colour.', `${FORMS} Simplify the ratio and the fraction.`],
    solution: [e.why, `Ratio: $${ratio(e.f, e.t)}${a !== e.f ? ` = ${ratio(a, b)}` : ''}$`, `Fraction: $${frSimp(e.f, e.t)}$`, ...pc.steps, `The probability is $${ratio(a, b)}$, $${frLow(e.f, e.t)}$ or ${pc.ask.includes('nearest') ? 'about ' : ''}$${pc.shown}$.`],
  };
}

const probabilityForms = skill({
  id: 'm7-probability-forms',
  name: 'Probabilities as ratios, fractions and percents',
  description: 'Find the probability of an event and write it as a ratio, a fraction in lowest terms and a percent, and change one form into another.',
  outcomes: ['SP4'],
  lessonId: 'm7-11-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return formsD1(rng, name);
    if (d === 2) return formsD2(rng, name);
    return rng.chance(0.5) ? formsOrder(rng) : formsThree(rng, name);
  },
});

// ---------------------------------------------------------------------------
// Two independent events (11.2 and 11.3)
// ---------------------------------------------------------------------------

interface Ev {
  kind: 'coin' | 'die' | 'num' | 'colour' | 'letter';
  /** "flips a coin" */
  act: string;
  /** "the coin" */
  the: string;
  /** Labels used in the sample space. */
  out: string[];
  /** Words for each outcome. */
  word: string[];
  /** Conditions on this event: text and matching outcome indexes. */
  conds: Array<{ t: string; idx: number[] }>;
  numeric: boolean;
  key?: string;
}

const COLOUR_CODE: Record<string, string> = { red: 'R', blue: 'B', green: 'G', yellow: 'Y', purple: 'P', orange: 'O' };

function coin(): Ev {
  return {
    kind: 'coin', act: 'flips a coin', the: 'the coin', out: ['H', 'T'], word: ['heads', 'tails'], numeric: false, key: 'H = heads, T = tails',
    conds: [{ t: 'heads', idx: [0] }, { t: 'tails', idx: [1] }],
  };
}
function die(colour = ''): Ev {
  const nm = colour ? `${colour} die` : 'die';
  return {
    kind: 'die', act: `rolls ${colour ? `a ${colour}` : 'a'} six-sided die`, the: `the ${nm}`, out: ['1', '2', '3', '4', '5', '6'], word: ['1', '2', '3', '4', '5', '6'], numeric: true,
    conds: [
      { t: 'an even number', idx: [1, 3, 5] },
      { t: 'an odd number', idx: [0, 2, 4] },
      { t: 'a number greater than $4$', idx: [4, 5] },
      { t: 'a number less than $3$', idx: [0, 1] },
      { t: 'a multiple of $3$', idx: [2, 5] },
      { t: 'a $6$', idx: [5] },
    ],
  };
}
function numSpinner(k: number, label = ''): Ev {
  const nums = Array.from({ length: k }, (_, i) => String(i + 1));
  return {
    kind: 'num', act: `spins ${label ? `spinner ${label}, which has` : 'a spinner with'} $${k}$ equal sections numbered $1$ to $${k}$`, the: label ? `spinner ${label}` : 'the spinner', out: nums, word: nums, numeric: true,
    conds: [
      { t: 'an even number', idx: nums.map((_, i) => i).filter((i) => (i + 1) % 2 === 0) },
      { t: 'an odd number', idx: nums.map((_, i) => i).filter((i) => (i + 1) % 2 === 1) },
      { t: aNum(k), idx: [k - 1] },
      { t: 'a $1$', idx: [0] },
    ],
  };
}
function colourEv(cols: string[], bag: boolean): Ev {
  const k = cols.length;
  return {
    kind: 'colour',
    act: bag ? `picks one marble without looking from a bag holding ${listWords(cols.map((c) => `one ${c}`))} marble` : `spins a spinner with $${k}$ equal sections coloured ${listWords(cols)}`,
    the: bag ? 'the marble' : 'the spinner',
    out: cols.map((c) => COLOUR_CODE[c]),
    word: cols,
    numeric: false,
    key: cols.map((c) => `${COLOUR_CODE[c]} = ${c}`).join(', '),
    conds: [
      ...cols.map((c, i) => ({ t: c, idx: [i] })),
      { t: `not ${cols[0]}`, idx: cols.map((_, i) => i).slice(1) },
    ],
  };
}
function letterEv(letters: string[]): Ev {
  const vow = letters.map((_, i) => i).filter((i) => VOWELS.has(letters[i]));
  return {
    kind: 'letter', act: `picks one of $${letters.length}$ cards labelled ${listWords(letters)} without looking`, the: 'the card', out: letters, word: letters, numeric: false,
    conds: [
      ...letters.map((c, i) => ({ t: `the letter ${c}`, idx: [i] })),
      ...(vow.length > 0 && vow.length < letters.length ? [{ t: 'a vowel', idx: vow }] : []),
    ],
  };
}

const LETTER_SETS = [['A', 'B', 'C'], ['A', 'B', 'C', 'D'], ['A', 'E', 'K', 'M'], ['W', 'X', 'Z'], ['A', 'E', 'I', 'K', 'M'], ['J', 'K', 'L', 'M']];

interface Pair {
  a: Ev;
  b: Ev;
  /** The two actions, without a final period: "Ava flips a coin and rolls a die". `again` starts a second sentence ("Ava also ..."). */
  text: (name: string, again?: string) => string;
  twoDice?: boolean;
}

function makePair(rng: Rng, opts: { maxSize?: number; minSize?: number; allowDice?: boolean } = {}): Pair {
  const max = opts.maxSize ?? 36;
  const min = opts.minSize ?? 4;
  return retry(
    () => {
      const kind = rng.pick(['coinDie', 'coinSpin', 'coinColour', 'coinLetter', 'dieColour', 'dieLetter', 'twoDice', 'numColour', 'colourLetter', 'twoSpin', 'twoCoins'] as const);
      let a: Ev;
      let b: Ev;
      let twoDice = false;
      const cols = rng.sample(['red', 'blue', 'green', 'yellow', 'purple', 'orange'], rng.int(3, 4));
      const bag = rng.chance(0.4);
      switch (kind) {
        case 'coinDie': a = coin(); b = die(); break;
        case 'coinSpin': a = coin(); b = numSpinner(rng.int(3, 6)); break;
        case 'coinColour': a = coin(); b = colourEv(cols, bag); break;
        case 'coinLetter': a = coin(); b = letterEv(rng.pick(LETTER_SETS.filter((s) => !s.includes('H') && !s.includes('T')))); break;
        case 'dieColour': a = die(); b = colourEv(cols, bag); break;
        case 'dieLetter': a = die(); b = letterEv(rng.pick(LETTER_SETS.filter((s) => s.length <= 4))); break;
        case 'twoDice': a = die('red'); b = die('blue'); twoDice = true; break;
        case 'numColour': a = numSpinner(rng.int(3, 5)); b = colourEv(cols, true); break;
        case 'colourLetter': {
          const letters = rng.pick(LETTER_SETS.filter((s) => s.every((c) => !cols.map((x) => COLOUR_CODE[x]).includes(c))));
          a = colourEv(cols, false); b = letterEv(letters); break;
        }
        case 'twoSpin': a = numSpinner(rng.int(3, 4), 'A'); b = numSpinner(rng.int(3, 5), 'B'); break;
        default: a = { ...coin(), act: 'flips a loonie', the: 'the loonie' }; b = { ...coin(), act: 'a quarter', the: 'the quarter' };
      }
      const A = a;
      const B = b;
      const text = (name: string, again = name) => {
        if (twoDice) return `${name} rolls two six-sided dice, one red and one blue`;
        if (kind === 'twoSpin') return `${name} spins two spinners. Spinner A has $${A.out.length}$ equal sections numbered $1$ to $${A.out.length}$, and spinner B has $${B.out.length}$ equal sections numbered $1$ to $${B.out.length}$`;
        if (A.act.length + B.act.length > 80) return `${name} ${A.act}. ${again} also ${B.act}`;
        return `${name} ${A.act} and ${B.act}`;
      };
      return { a, b, text, twoDice };
    },
    (p) => p.a.out.length * p.b.out.length <= max && p.a.out.length * p.b.out.length >= min && (opts.allowDice !== false || !p.twoDice),
    500,
  );
}

const bothNumeric = (p: Pair) => p.a.numeric && p.b.numeric;
/** One outcome of the pair: H3, R2 or (2, 5). */
const code = (p: Pair, i: number, j: number) => (bothNumeric(p) ? `(${p.a.out[i]}, ${p.b.out[j]})` : `${p.a.out[i]}${p.b.out[j]}`);
const allCodes = (p: Pair) => p.a.out.flatMap((_, i) => p.b.out.map((__, j) => code(p, i, j)));
const keyText = (p: Pair) => [...new Set([p.a.key, p.b.key].filter(Boolean))].join('; ');

/** The sample space as a table: one row for each outcome of the first event. */
function spaceTable(p: Pair, hide?: [number, number]): Figure {
  return {
    type: 'table',
    headers: ['', ...p.b.out],
    rows: p.a.out.map((x, i) => [x, ...p.b.out.map((_, j) => (hide && hide[0] === i && hide[1] === j ? '?' : code(p, i, j)))]),
  };
}

/** "heads and an even number", naming each object when both are numbers. */
function condText(p: Pair, ca: { t: string }, cb: { t: string }): string {
  if (bothNumeric(p)) return `${ca.t} on ${p.a.the} and ${cb.t} on ${p.b.the}`;
  return `${ca.t} and ${cb.t}`;
}

/** "For the die, a number greater than 4 means 5 or 6 (2 ways)." */
function fitText(e: Ev, c: { t: string; idx: number[] }): string {
  const ws = c.idx.map((i) => (e.numeric ? `$${e.word[i]}$` : e.word[i]));
  if (c.idx.length === 1) return `For ${e.the}, only ${ws[0]} fits ($1$ way).`;
  return `For ${e.the}, ${c.t} means ${ws.slice(0, -1).join(', ')} or ${ws[ws.length - 1]} ($${c.idx.length}$ ways).`;
}

const TABLE_HINT = 'Make a table (or a tree diagram): one row for each outcome of the first event and one column for each outcome of the second event.';
const MULT_RULE = 'Number of outcomes in the sample space $=$ (outcomes of the first event) $\\times$ (outcomes of the second event)';

/** Sum events for two numbered objects. */
function sumCond(rng: Rng, p: Pair): { t: string; test: (x: number, y: number) => boolean } {
  const maxSum = p.a.out.length + p.b.out.length;
  const s = rng.int(4, maxSum - 1);
  return rng.pick([
    { t: `a sum of $${s}$`, test: (x: number, y: number) => x + y === s },
    { t: `a sum greater than $${s}$`, test: (x: number, y: number) => x + y > s },
    { t: 'the same number on both (doubles)', test: (x: number, y: number) => x === y },
    { t: `a sum less than $${s}$`, test: (x: number, y: number) => x + y < s },
  ]);
}

// ---------------------------------------------------------------------------
// 11.2 Sample spaces
// ---------------------------------------------------------------------------

function spaceCount(rng: Rng, name: string): Out {
  const p = makePair(rng);
  const m = p.a.out.length;
  const n = p.b.out.length;
  return {
    prompt: `${p.text(name)}. How many outcomes are in the sample space?`,
    parts: [numPart(m * n, { suffix: 'outcomes' })],
    hints: [TABLE_HINT, MULT_RULE],
    solution: [
      `${cap(p.a.the)} has $${m}$ outcomes: ${listWords(p.a.word)}.`,
      `${cap(p.b.the)} has $${n}$ outcomes: ${listWords(p.b.word)}.`,
      `Each outcome of the first event can happen with each outcome of the second, so a table has $${m}$ rows and $${n}$ columns: $${m} \\times ${n} = ${m * n}$.`,
      `The sample space has $${m * n}$ outcomes.`,
    ],
  };
}

function spaceList(rng: Rng, name: string): Out {
  const p = makePair(rng, { maxSize: 8, allowDice: false });
  const codes = allCodes(p);
  const correct = codes.join(', ');
  const first = p.a.out[0];
  const ds = [
    [...p.a.out, ...p.b.out].join(', '),
    p.b.out.map((_, j) => code(p, Math.min(j, p.a.out.length - 1), j)).join(', '),
    codes.filter((_, k) => k < p.b.out.length || k % p.b.out.length !== p.b.out.length - 1).join(', '),
  ];
  // Two coins: HT and TH are different outcomes.
  if (p.a.kind === 'coin' && p.b.kind === 'coin') ds.splice(0, ds.length, 'HH, HT, TT', 'HH, TT', 'HT, TH');
  return {
    prompt: `${p.text(name)}. Which list shows the whole sample space?${keyText(p) ? ` (${keyText(p)})` : ''}`,
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: [TABLE_HINT, `There should be $${p.a.out.length} \\times ${p.b.out.length} = ${codes.length}$ outcomes, each one a result for ${p.a.the} with a result for ${p.b.the}.`],
    solution: [
      `Pair each outcome of ${p.a.the} with each outcome of ${p.b.the}.`,
      `Start with ${first}: ${codes.slice(0, p.b.out.length).join(', ')}. Then do the same for the other outcome${p.a.out.length > 2 ? 's' : ''}.`,
      `There are $${p.a.out.length} \\times ${p.b.out.length} = ${codes.length}$ outcomes: ${correct}.`,
    ],
    answerDisplay: correct,
  };
}

function spaceMissing(rng: Rng, name: string): Out {
  const p = makePair(rng, { maxSize: 24, minSize: 6, allowDice: false });
  const i = rng.int(0, p.a.out.length - 1);
  const j = rng.int(0, p.b.out.length - 1);
  const correct = code(p, i, j);
  const i2 = (i + 1) % p.a.out.length;
  const j2 = (j + 1) % p.b.out.length;
  const j3 = (j + p.b.out.length - 1) % p.b.out.length;
  const flip = bothNumeric(p) ? `(${p.b.out[j]}, ${p.a.out[i]})` : `${p.b.out[j]}${p.a.out[i]}`;
  return {
    prompt: `${p.text(name)}. The table shows the sample space, with one outcome hidden.${keyText(p) ? ` (${keyText(p)})` : ''} Which outcome belongs in the cell marked “?”`,
    figure: spaceTable(p, [i, j]),
    parts: [{ answer: mc(rng, correct, [code(p, i2, j), code(p, i, j2), code(p, i, j3), flip]) }],
    hints: ['Each cell pairs the outcome at the start of its row with the outcome at the top of its column.', `The row starts with ${p.a.out[i]} and the column is headed ${p.b.out[j]}.`],
    solution: [`The “?” is in the row for ${p.a.out[i]}${p.a.word[i] !== p.a.out[i] ? ` (${p.a.word[i]})` : ''} and the column for ${p.b.out[j]}${p.b.word[j] !== p.b.out[j] ? ` (${p.b.word[j]})` : ''}.`, `The outcome is written with ${p.a.the} first: ${correct}.`],
    answerDisplay: correct,
  };
}

function spaceNotIn(rng: Rng, name: string): Out {
  const p = makePair(rng, { maxSize: 30, minSize: 6, allowDice: false });
  // An impossible outcome: a value one object cannot show.
  const fakeB = p.b.kind === 'die' || p.b.kind === 'num' ? String(p.b.out.length + 1) : p.b.kind === 'colour' ? rng.pick(Object.values(COLOUR_CODE).filter((c) => !p.b.out.includes(c) && !p.a.out.includes(c))) : rng.pick(['Q', 'R', 'S'].filter((c) => !p.b.out.includes(c) && !p.a.out.includes(c)));
  const i = rng.int(0, p.a.out.length - 1);
  const wrong = bothNumeric(p) ? `(${p.a.out[i]}, ${fakeB})` : `${p.a.out[i]}${fakeB}`;
  const real = rng.sample(allCodes(p), 3);
  const fakeWord = p.b.kind === 'colour' ? Object.keys(COLOUR_CODE).find((c) => COLOUR_CODE[c] === fakeB) ?? fakeB : fakeB;
  return {
    prompt: `${p.text(name)}.${keyText(p) ? ` (${keyText(p)})` : ''} Which outcome is **not** in the sample space?`,
    parts: [{ answer: mc(rng, wrong, real) }],
    hints: ['List what each object can show.', `${cap(p.b.the)} can only show ${listWords(p.b.word)}.`],
    solution: [`${cap(p.a.the)} can show ${listWords(p.a.word)}. ${cap(p.b.the)} can show ${listWords(p.b.word)}.`, `${wrong} needs ${p.b.the} to show ${fakeWord}, which is impossible.`, `The outcome not in the sample space is ${wrong}.`],
    answerDisplay: wrong,
  };
}

/** Count outcomes that meet a condition on each event (or a sum for two numbered objects). */
function spaceCondCount(rng: Rng, name: string, d: Lvl): Out {
  const useSum = d === 3 && rng.chance(0.6);
  const p = useSum ? makePair(rng, { minSize: 9 }) : makePair(rng, { minSize: 6 });
  if (useSum && bothNumeric(p)) {
    const c = retry(() => sumCond(rng, p), (cc) => {
      const n = p.a.out.flatMap((x) => p.b.out.map((y) => (cc.test(+x, +y) ? 1 : 0))).reduce((s, v) => s + v, 0 as number);
      return n > 0 && n < p.a.out.length * p.b.out.length;
    });
    const fav = p.a.out.flatMap((x) => p.b.out.filter((y) => c.test(+x, +y)).map((y) => `(${x}, ${y})`));
    return {
      prompt: `${p.text(name)}. ${name} adds the two numbers. How many outcomes in the sample space have ${c.t}?`,
      parts: [numPart(fav.length, { suffix: 'outcomes' })],
      hints: [TABLE_HINT, 'Write the sum in each cell of the table. Then count the cells that fit.'],
      solution: [
        `The sample space has $${p.a.out.length} \\times ${p.b.out.length} = ${p.a.out.length * p.b.out.length}$ outcomes, written (${p.a.the}, ${p.b.the}).`,
        `The outcomes with ${c.t}: ${fav.join(', ')}.`,
        `There are $${fav.length}$ outcomes.`,
      ],
    };
  }
  const ca = rng.pick(p.a.conds.filter((c) => c.idx.length < p.a.out.length));
  const cb = rng.pick(p.b.conds.filter((c) => c.idx.length < p.b.out.length));
  const fav = ca.idx.flatMap((i) => cb.idx.map((j) => code(p, i, j)));
  const showTable = d === 2;
  return {
    prompt: `${p.text(name)}.${showTable ? ' The table shows the sample space.' : ''}${keyText(p) ? ` (${keyText(p)})` : ''} How many outcomes in the sample space have ${condText(p, ca, cb)}?`,
    figure: showTable ? spaceTable(p) : undefined,
    parts: [numPart(fav.length, { suffix: 'outcomes' })],
    hints: [showTable ? 'Find the rows that fit the first part, then the columns that fit the second part.' : TABLE_HINT, `There are $${ca.idx.length}$ ways for the first part and $${cb.idx.length}$ ways for the second part.`],
    solution: [
      fitText(p.a, ca),
      fitText(p.b, cb),
      `The outcome${fav.length > 1 ? 's are' : ' is'} ${fav.join(', ')}: $${ca.idx.length} \\times ${cb.idx.length} = ${fav.length}$.`,
      fav.length === 1 ? 'There is $1$ outcome.' : `There are $${fav.length}$ outcomes.`,
    ],
  };
}

function spaceReverse(rng: Rng, name: string): Out {
  const first = rng.pick(['coin', 'die'] as const);
  const k = first === 'coin' ? rng.int(3, 8) : rng.int(3, 6);
  const m = first === 'coin' ? 2 : 6;
  const thing = rng.pick([
    { act: first === 'coin' ? 'flips a coin' : 'rolls a six-sided die', other: 'a spinner with equal sections', q: 'How many sections does the spinner have?', unit: 'sections' },
    { act: first === 'coin' ? 'flips a coin' : 'rolls a six-sided die', other: 'one card from a pile of cards, each with a different letter', q: 'How many cards are in the pile?', unit: 'cards' },
  ]);
  return {
    prompt: `${name} ${thing.act} and picks ${thing.other}. The sample space has $${m * k}$ outcomes. ${thing.q}`,
    parts: [numPart(k, { suffix: thing.unit })],
    hints: [MULT_RULE, `The ${first} has $${m}$ outcomes. What number times $${m}$ gives $${m * k}$?`],
    solution: [`${first === 'coin' ? 'A coin has $2$ outcomes' : 'A die has $6$ outcomes'}, so $${m} \\times \\square = ${m * k}$.`, `$${m * k} \\div ${m} = ${k}$`, `There are $${k}$ ${thing.unit}.`],
  };
}

function spaceMistake(rng: Rng, name: string): Out {
  const p = makePair(rng, { allowDice: false, minSize: 6 });
  const m = p.a.out.length;
  const n = p.b.out.length;
  const friend = rng.pick(NAMES.filter((x) => x !== name));
  const correct = `${friend} added. Each of the $${m}$ outcomes of the first event goes with each of the $${n}$ outcomes of the second, so there are $${m} \\times ${n} = ${m * n}$ outcomes.`;
  return {
    prompt: `${p.text(name)}. ${friend} says the sample space has $${m} + ${n} = ${m + n}$ outcomes. Which statement is correct?`,
    parts: [{ answer: mc(rng, correct, [
      `${friend} is right: there are $${m + n}$ outcomes, one for each thing that can happen.`,
      `${friend} should have subtracted: there are $${Math.abs(m - n)}$ outcomes.`,
      `${friend} is right, because each object is used once.`,
      `There are only $${Math.max(m, n)}$ outcomes, because the larger number decides.`,
    ]) }],
    hints: [TABLE_HINT, 'Count the cells in the table, not the row and column labels.'],
    solution: [`A table has $${m}$ rows and $${n}$ columns.`, `The number of cells is $${m} \\times ${n} = ${m * n}$, not $${m + n}$.`, `So ${friend} made a mistake: the sample space has $${m * n}$ outcomes.`],
    answerDisplay: `There are $${m * n}$ outcomes, not $${m + n}$.`,
  };
}

const sampleSpace = skill({
  id: 'm7-sample-space',
  name: 'Sample spaces for two events',
  description: 'List and count the sample space of two independent events with a table or tree diagram.',
  outcomes: ['SP5'],
  lessonId: 'm7-11-2',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.55) ? spaceCount(rng, name) : spaceList(rng, name);
    if (d === 2) {
      const k = rng.pick(['missing', 'notIn', 'cond'] as const);
      return k === 'missing' ? spaceMissing(rng, name) : k === 'notIn' ? spaceNotIn(rng, name) : spaceCondCount(rng, name, 2);
    }
    const k = rng.pick(['cond', 'cond', 'reverse', 'mistake'] as const);
    return k === 'cond' ? spaceCondCount(rng, name, 3) : k === 'reverse' ? spaceReverse(rng, name) : spaceMistake(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 11.3 Theoretical probability of two independent events
// ---------------------------------------------------------------------------

interface Combined {
  text: string;
  f: number;
  t: number;
  steps: string[];
  figure?: Figure;
  pair: Pair;
}

/** A combined event: one condition on each object, or a sum condition for two numbered objects. */
function combined(rng: Rng, p: Pair, opts: { single?: boolean; sum?: boolean } = {}): Combined {
  const t = p.a.out.length * p.b.out.length;
  if (opts.sum && bothNumeric(p)) {
    const c = retry(() => sumCond(rng, p), (cc) => {
      const n = p.a.out.flatMap((x) => p.b.out.map((y) => (cc.test(+x, +y) ? 1 : 0))).reduce((s, v) => s + v, 0 as number);
      return n > 0 && n < t;
    });
    const fav = p.a.out.flatMap((x) => p.b.out.filter((y) => c.test(+x, +y)).map((y) => `(${x}, ${y})`));
    return {
      text: c.t,
      f: fav.length,
      t,
      pair: p,
      steps: [`The sample space has $${p.a.out.length} \\times ${p.b.out.length} = ${t}$ equally likely outcomes.`, `Outcomes with ${c.t}: ${fav.join(', ')}. That is $${fav.length}$ outcomes.`],
    };
  }
  const pool = (e: Ev) => (opts.single ? e.conds.filter((c) => c.idx.length === 1) : e.conds.filter((c) => c.idx.length < e.out.length));
  const ca = rng.pick(pool(p.a));
  const cb = rng.pick(pool(p.b));
  const fav = ca.idx.flatMap((i) => cb.idx.map((j) => code(p, i, j)));
  return {
    text: condText(p, ca, cb),
    f: fav.length,
    t,
    pair: p,
    steps: [
      `The sample space has $${p.a.out.length} \\times ${p.b.out.length} = ${t}$ equally likely outcomes.`,
      `Favourable outcomes (${condText(p, ca, cb)}): ${fav.join(', ')}. That is $${fav.length}$ outcome${fav.length > 1 ? 's' : ''}.`,
    ],
  };
}

function theoryD1(rng: Rng, name: string): Out {
  const p = makePair(rng, { maxSize: 16, allowDice: false });
  const c = combined(rng, p, { single: rng.chance(0.5) });
  return {
    prompt: `${p.text(name)}. The table shows the sample space.${keyText(p) ? ` (${keyText(p)})` : ''} What is the probability of getting ${c.text}? ${LOWEST}`,
    figure: spaceTable(p),
    parts: [fracPart(c.f, c.t)],
    hints: ['Count all the cells in the table. That is the total number of outcomes.', 'Count the cells that fit the event. Probability = favourable ÷ total.'],
    solution: [...c.steps, `$P = ${frSimp(c.f, c.t)}$`, `The probability is $${frLow(c.f, c.t)}$.`],
  };
}

function theoryD2(rng: Rng, name: string): Out {
  const p = makePair(rng, { minSize: 8 });
  const c = combined(rng, p, { sum: p.twoDice || rng.chance(0.4) });
  const pct = rng.chance(0.35);
  if (pct) {
    const pc = pctPart(c.f, c.t);
    return {
      prompt: `${p.text(name)}.${keyText(p) ? ` (${keyText(p)})` : ''} What is the probability of getting ${c.text}? ${pc.ask}`,
      parts: [pc.part],
      hints: [TABLE_HINT, 'Find the fraction favourable ÷ total. Then divide and multiply by $100$.'],
      solution: [...c.steps, `$P = ${fr(c.f, c.t)}$`, ...pc.steps, `The probability is ${pc.ask.includes('nearest') ? 'about ' : ''}$${pc.shown}$.`],
    };
  }
  return {
    prompt: `${p.text(name)}.${keyText(p) ? ` (${keyText(p)})` : ''} What is the probability of getting ${c.text}? ${LOWEST}`,
    parts: [fracPart(c.f, c.t)],
    hints: [TABLE_HINT, 'Probability = favourable outcomes ÷ total outcomes. Then simplify.'],
    solution: [...c.steps, `$P = ${frSimp(c.f, c.t)}$`, `The probability is $${frLow(c.f, c.t)}$.`],
  };
}

function theoryFair(rng: Rng, name: string): Out {
  const friend = rng.pick(NAMES.filter((x) => x !== name));
  const p = retry(() => makePair(rng, { minSize: 9 }), (q) => bothNumeric(q), 500);
  const hi = p.a.out.length + p.b.out.length;
  const s = rng.int(Math.floor(hi / 2), Math.floor(hi / 2) + 2);
  const c = rng.pick([
    { t: 'the sum is even', test: (x: number, y: number) => (x + y) % 2 === 0 },
    { t: 'the sum is odd', test: (x: number, y: number) => (x + y) % 2 === 1 },
    { t: `the sum is greater than $${s}$`, test: (x: number, y: number) => x + y > s },
    { t: `the sum is $${s}$ or less`, test: (x: number, y: number) => x + y <= s },
    { t: 'the product is even', test: (x: number, y: number) => (x * y) % 2 === 0 },
    { t: 'the product is odd', test: (x: number, y: number) => (x * y) % 2 === 1 },
  ]);
  const t = p.a.out.length * p.b.out.length;
  const fav = p.a.out.flatMap((x) => p.b.out.filter((y) => c.test(+x, +y)).map((y) => `(${x}, ${y})`));
  const f = fav.length;
  const other = t - f;
  const opts = ['Yes. Both players have the same probability of scoring.', `No. ${name} is more likely to score.`, `No. ${friend} is more likely to score.`];
  const k = f === other ? 0 : f > other ? 1 : 2;
  return {
    prompt: `${name} and ${friend} play a game. Each turn, ${p.text('a player', 'The player')}. ${name} scores a point if ${c.t}. Otherwise, ${friend} scores a point. What is the probability that ${name} scores on a turn, and is the game fair?`,
    parts: [fracPart(f, t, `$P(\\text{${name} scores})$`), { label: 'Is the game fair?', answer: fixedChoice(opts, k) }],
    hints: [TABLE_HINT + ' Write the sum or product in each cell.', 'A game is fair when each player has the same probability of scoring.'],
    solution: [
      `The sample space has $${p.a.out.length} \\times ${p.b.out.length} = ${t}$ equally likely outcomes.`,
      `Outcomes where ${c.t}: ${fav.join(', ')}. That is $${f}$ outcome${f > 1 ? 's' : ''}.`,
      `$P(\\text{${name}}) = ${frSimp(f, t)}$ and $P(\\text{${friend}}) = ${frSimp(other, t)}$`,
      `${name}’s probability is $${frLow(f, t)}$. ${opts[k]}`,
    ],
  };
}

function theoryCompare(rng: Rng, name: string): Out {
  const p = makePair(rng, { minSize: 8 });
  const [c1, c2] = retry(() => [combined(rng, p, { sum: bothNumeric(p) && rng.chance(0.5) }), combined(rng, p, { sum: bothNumeric(p) && rng.chance(0.5) })], ([x, y]) => x.text !== y.text && x.f !== y.f, 300);
  const A = `getting ${c1.text}`;
  const B = `getting ${c2.text}`;
  const better = c1.f > c2.f ? 0 : 1;
  return {
    prompt: `${p.text(name)}.${keyText(p) ? ` (${keyText(p)})` : ''} Which is more likely: **A**, ${A}, or **B**, ${B}? Give the probability of the more likely event as a fraction in lowest terms.`,
    parts: [{ label: 'More likely', answer: fixedChoice(['A', 'B'], better) }, fracPart(Math.max(c1.f, c2.f), c1.t, 'Its probability')],
    hints: [TABLE_HINT, 'Find the probability of each event. The one with more favourable outcomes is more likely.'],
    solution: [`A: ${c1.steps[1]}`, `B: ${c2.steps[1]}`, `$P(A) = ${frSimp(c1.f, c1.t)}$ and $P(B) = ${frSimp(c2.f, c2.t)}$`, `${better === 0 ? 'A' : 'B'} is more likely, with probability $${frLow(Math.max(c1.f, c2.f), c1.t)}$.`],
  };
}

const theoretical = skill({
  id: 'm7-theoretical-probability',
  name: 'Theoretical probability of two events',
  description: 'Use a table or tree diagram of the sample space to find the theoretical probability of an outcome of two independent events.',
  outcomes: ['SP4', 'SP6'],
  lessonId: 'm7-11-3',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return theoryD1(rng, name);
    if (d === 2) return theoryD2(rng, name);
    return rng.chance(0.5) ? theoryFair(rng, name) : theoryCompare(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 11.3 Experimental probability
// ---------------------------------------------------------------------------

interface Experiment {
  /** "flips a loonie and a quarter" */
  act: string;
  /** "flip a loonie and a quarter" */
  base: string;
  /** A sentence that describes the objects, or ''. */
  note: string;
  outcomes: string[];
  /** Theoretical probability of each outcome as [num, den]. */
  p: Array<[number, number]>;
  /** Why the theoretical probabilities are what they are. */
  why: string;
}

function experiment(rng: Rng): Experiment {
  const kind = rng.pick(['coins', 'coinDie', 'coinSpinner', 'sum7', 'doubles', 'twoSpinners'] as const);
  if (kind === 'coins') {
    return {
      act: 'flips a loonie and a quarter',
      base: 'flip a loonie and a quarter',
      note: 'Each result is written with the loonie first.',
      outcomes: ['HH', 'HT', 'TH', 'TT'],
      p: [[1, 4], [1, 4], [1, 4], [1, 4]],
      why: 'The sample space is HH, HT, TH, TT (loonie first). Each of the $4$ outcomes has a theoretical probability of $\\frac{1}{4}$.',
    };
  }
  if (kind === 'coinDie') {
    return {
      act: 'flips a coin and rolls a six-sided die',
      base: 'flip a coin and roll a six-sided die',
      note: '',
      outcomes: ['Heads and even', 'Heads and odd', 'Tails and even', 'Tails and odd'],
      p: [[3, 12], [3, 12], [3, 12], [3, 12]],
      why: 'The sample space has $2 \\times 6 = 12$ outcomes. Each result in the table, such as heads and an even number (H2, H4, H6), includes $3$ of them, so each has a theoretical probability of $\\frac{3}{12} = \\frac{1}{4}$.',
    };
  }
  if (kind === 'coinSpinner') {
    const cols = rng.sample(['red', 'blue', 'green', 'yellow'], 3);
    return {
      act: 'flips a coin and spins a spinner',
      base: 'flip a coin and spin a spinner',
      note: `The spinner has three equal sections coloured ${listWords(cols)}.`,
      outcomes: ['H', 'T'].flatMap((c) => cols.map((x) => `${c === 'H' ? 'Heads' : 'Tails'}, ${x}`)),
      p: Array.from({ length: 6 }, () => [1, 6] as [number, number]),
      why: 'The sample space has $2 \\times 3 = 6$ equally likely outcomes, so each has a theoretical probability of $\\frac{1}{6}$.',
    };
  }
  if (kind === 'sum7') {
    return {
      act: 'rolls two six-sided dice',
      base: 'roll two six-sided dice',
      note: 'Each time, the two numbers are added.',
      outcomes: ['Sum of 7', 'Any other sum'],
      p: [[6, 36], [30, 36]],
      why: 'The sample space has $6 \\times 6 = 36$ outcomes. Six of them have a sum of $7$: (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1). So $P(\\text{sum of } 7) = \\frac{6}{36} = \\frac{1}{6}$ and $P(\\text{other}) = \\frac{30}{36} = \\frac{5}{6}$.',
    };
  }
  if (kind === 'doubles') {
    return {
      act: 'rolls two six-sided dice',
      base: 'roll two six-sided dice',
      note: '',
      outcomes: ['Doubles (same number)', 'Not doubles'],
      p: [[6, 36], [30, 36]],
      why: 'The sample space has $6 \\times 6 = 36$ outcomes. Six of them are doubles: (1, 1), (2, 2), …, (6, 6). So $P(\\text{doubles}) = \\frac{6}{36} = \\frac{1}{6}$ and $P(\\text{not doubles}) = \\frac{30}{36} = \\frac{5}{6}$.',
    };
  }
  return {
    act: 'spins two spinners',
    base: 'spin two spinners',
    note: 'Each spinner has two equal halves, one red and one blue.',
    outcomes: ['Both red', 'Both blue', 'One of each colour'],
    p: [[1, 4], [1, 4], [2, 4]],
    why: 'The sample space is RR, RB, BR, BB. Both red: $\\frac{1}{4}$. Both blue: $\\frac{1}{4}$. One of each (RB or BR): $\\frac{2}{4} = \\frac{1}{2}$.',
  };
}

/** Simulate n trials (deterministically, with the item's own rng). */
function simulate(rng: Rng, e: Experiment, n: number): number[] {
  const counts = e.p.map(() => 0);
  for (let k = 0; k < n; k++) {
    let r = rng.next();
    let i = 0;
    for (; i < e.p.length - 1; i++) {
      r -= e.p[i][0] / e.p[i][1];
      if (r < 0) break;
    }
    counts[i]++;
  }
  return counts;
}

const resultsTable = (e: Experiment, counts: number[]): Figure => ({ type: 'table', headers: ['Outcome', 'Frequency'], rows: e.outcomes.map((o, i) => [o, String(counts[i])]) });
const EXP_RULE = 'Experimental probability $= \\dfrac{\\text{number of times the outcome happened}}{\\text{total number of trials}}$';
const note = (e: Experiment) => (e.note ? ` ${e.note}` : '');
const outName = (o: string) => o.toLowerCase().replace(/^hh$|^ht$|^th$|^tt$/, (x) => x.toUpperCase());

function expD1(rng: Rng, name: string): Out {
  const e = experiment(rng);
  const n = rng.pick([20, 25, 40, 50]);
  const counts = retry(() => simulate(rng, e, n), (c) => c.every((x) => x > 0), 100);
  const i = retry(() => rng.int(0, e.outcomes.length - 1), (k) => counts[k] > 0 && counts[k] < n);
  const usePct = rng.chance(0.4);
  const pc = pctPart(counts[i], n);
  return {
    prompt: `${name} ${e.act} $${n}$ times.${note(e)} The table shows the results. What is the experimental probability of “${outName(e.outcomes[i])}”? ${usePct ? pc.ask : LOWEST}`,
    figure: resultsTable(e, counts),
    parts: [usePct ? pc.part : fracPart(counts[i], n)],
    hints: [EXP_RULE, `The total number of trials is $${n}$.`],
    solution: [
      `“${outName(e.outcomes[i])}” happened $${counts[i]}$ times in $${n}$ trials.`,
      `Experimental probability $= ${usePct ? fr(counts[i], n) : frSimp(counts[i], n)}$`,
      ...(usePct ? pc.steps : []),
      `The experimental probability is $${usePct ? pc.shown : frLow(counts[i], n)}$.`,
    ],
  };
}

const COMPARE = ['The experimental probability is greater than the theoretical probability.', 'The experimental probability is less than the theoretical probability.', 'The experimental probability is equal to the theoretical probability.'];

function expD2(rng: Rng, name: string): Out {
  const e = experiment(rng);
  const n = rng.pick([20, 40, 50, 60, 80, 100]);
  const counts = simulate(rng, e, n);
  const i = retry(() => rng.int(0, e.outcomes.length - 1), (k) => counts[k] > 0 && counts[k] < n);
  const [tn, td] = e.p[i];
  const exp = counts[i] / n;
  const th = tn / td;
  const cmp = Math.abs(exp - th) < 1e-9 ? 2 : exp > th ? 0 : 1;
  return {
    prompt: `${name} ${e.act} $${n}$ times.${note(e)} The table shows the results. For “${outName(e.outcomes[i])}”, find the experimental probability and the theoretical probability as fractions in lowest terms. Then compare them.`,
    figure: resultsTable(e, counts),
    parts: [fracPart(counts[i], n, 'Experimental'), fracPart(tn, td, 'Theoretical'), { label: 'Compare', answer: fixedChoice(COMPARE, cmp) }],
    hints: [EXP_RULE, 'Theoretical probability comes from the sample space, not from the results. Make a table of the sample space.'],
    solution: [
      `Experimental: $${frSimp(counts[i], n)}$`,
      `Theoretical: ${e.why}`,
      `Compare as decimals: $${fmt(exp, 3)}$ and $${fmt(th, 3)}$.`,
      `The experimental probability is $${frLow(counts[i], n)}$ and the theoretical probability is $${frLow(tn, td)}$. ${COMPARE[cmp]}`,
    ],
  };
}

function expSampleSize(rng: Rng, name: string): Out {
  const e = experiment(rng);
  const i = rng.int(0, e.outcomes.length - 1);
  const [tn, td] = e.p[i];
  const th = tn / td;
  const small = 20;
  const big = rng.pick([400, 500, 800, 1000]);
  const off = rng.pick([-1, 1]) * rng.int(3, 4);
  const cs = Math.min(small - 1, Math.max(1, Math.round(th * small) + off));
  const cb = Math.round(th * big) + rng.int(-6, 6);
  const friend = rng.pick(NAMES.filter((x) => x !== name));
  const pcS = (100 * cs) / small;
  const pcB = (100 * cb) / big;
  const correct = `${friend}’s result is closer to the theoretical probability, because more trials usually give results closer to the theoretical probability.`;
  return {
    prompt: `${name} and ${friend} each did the same experiment: ${e.base}.${note(e)} For “${outName(e.outcomes[i])}”, the theoretical probability is $${frLow(tn, td)}$. ${name} did $${small}$ trials and got it $${cs}$ times. ${friend} did $${big}$ trials and got it $${cb}$ times. Which statement is true?`,
    figure: { type: 'table', headers: ['Student', 'Trials', `Times “${outName(e.outcomes[i])}”`, 'Experimental probability'], rows: [[name, String(small), String(cs), `${fmt(pcS, 2)}%`], [friend, String(big), String(cb), `${fmt(pcB, 2)}%`]] },
    parts: [{ answer: mc(rng, correct, [
      `${name}’s result is more reliable, because a small experiment is easier to do carefully.`,
      `The theoretical probability must be wrong, because neither result matches it exactly.`,
      `If ${friend} did even more trials, the experimental probability would always match the theoretical probability exactly.`,
    ]) }],
    hints: ['Compare each experimental probability with the theoretical probability as a percent.', 'Think about what happens to experimental results as the number of trials grows.'],
    solution: [
      `Theoretical: $${frLow(tn, td)} \\approx ${fmt(100 * th, 1)}\\%$.`,
      `${name}: $${fmt(pcS, 2)}\\%$ from only $${small}$ trials. ${friend}: $${fmt(pcB, 2)}\\%$ from $${big}$ trials.`,
      `Results vary from the theoretical probability, especially with few trials. As the number of trials grows, the experimental probability usually gets closer to the theoretical probability, but it does not have to match it exactly.`,
      `The true statement: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

function expPredict(rng: Rng, name: string): Out {
  const e = experiment(rng);
  const i = rng.int(0, e.outcomes.length - 1);
  const [tn, td] = e.p[i];
  const [a, b] = lowest(tn, td);
  const n = b * rng.pick([20, 25, 30, 40, 50]);
  const expct = (a * n) / b;
  const sd = Math.sqrt((n * a * (b - a)) / (b * b));
  const got = expct + rng.pick([-1, 1]) * rng.int(2, Math.max(3, Math.floor(1.5 * sd)));
  const correct = `No. Experimental results usually differ a little from the expected number. A difference of $${Math.abs(got - expct)}$ in $${n}$ trials is normal.`;
  return {
    prompt: `${name} ${e.act} $${n}$ times.${note(e)} (a) Use the theoretical probability to find how many times ${name} should expect “${outName(e.outcomes[i])}”. (b) ${name} actually got it $${got}$ times. Does this show that something is wrong with the experiment?`,
    parts: [numPart(expct, { label: '(a) Expected number', suffix: 'times' }), { label: '(b)', answer: mc(rng, correct, [
      `Yes. If nothing is wrong, the result must equal the expected number exactly.`,
      `Yes. The theoretical probability must be $${frLow(got, n)}$ instead.`,
      `No, because experimental results never come close to the expected number.`,
    ]) }],
    hints: ['Find the theoretical probability from the sample space.', 'Expected number $=$ theoretical probability $\\times$ number of trials.'],
    solution: [e.why, `Expected number: $${fr(a, b)} \\times ${n} = ${expct}$`, `${name} got $${got}$, which is close to $${expct}$. Experimental results are rarely exactly equal to the expected number.`, `(a) $${expct}$ times. (b) ${correct}`],
  };
}

function expPooled(rng: Rng): Out {
  const e = experiment(rng);
  const i = rng.int(0, e.outcomes.length - 1);
  const [tn, td] = e.p[i];
  const groups = rng.int(4, 5);
  const per = rng.pick([20, 20, 25]);
  const counts = Array.from({ length: groups }, () => simulate(rng, e, per)[i]);
  const total = sum(counts);
  const n = groups * per;
  const pc = pctPart(total, n);
  const th = (100 * tn) / td;
  return {
    prompt: `In ${rng.pick(TEACHERS)}’s class, $${groups}$ groups each did the same experiment $${per}$ times: ${e.base}.${note(e)} They counted “${outName(e.outcomes[i])}”. The table shows each group’s results. Combine all the results. What is the class’s experimental probability of “${outName(e.outcomes[i])}”? ${pc.ask}`,
    figure: { type: 'table', headers: ['Group', `Times “${outName(e.outcomes[i])}”`, 'Trials'], rows: counts.map((c, k) => [String(k + 1), String(c), String(per)]) },
    parts: [pc.part],
    hints: ['Add the counts from all the groups, and add the trials from all the groups.', `${EXP_RULE} With more trials, the result is usually closer to the theoretical probability of $${frLow(tn, td)}$.`],
    solution: [
      `Times: $${counts.join(' + ')} = ${total}$`,
      `Trials: $${groups} \\times ${per} = ${n}$`,
      `Experimental probability $= ${fr(total, n)}$`,
      ...pc.steps,
      `The class’s experimental probability is ${pc.ask.includes('nearest') ? 'about ' : ''}$${pc.shown}$ (the theoretical probability is about $${fmt(th, 1)}\\%$).`,
    ],
  };
}

const experimental = skill({
  id: 'm7-experimental-probability',
  name: 'Experimental and theoretical probability',
  description: 'Find an experimental probability from a table of results and compare it with the theoretical probability, knowing that more trials usually give closer results.',
  outcomes: ['SP4', 'SP6'],
  lessonId: 'm7-11-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return expD1(rng, name);
    if (d === 2) return expD2(rng, name);
    const k = rng.pick(['size', 'predict', 'pooled'] as const);
    return k === 'size' ? expSampleSize(rng, name) : k === 'predict' ? expPredict(rng, name) : expPooled(rng);
  },
});

export const PROBABILITY_SKILLS: SkillDef[] = [probabilityForms, sampleSpace, theoretical, experimental];
