/** Math 30-2 Unit 3 — Probability (P1, P2, P3; with P5 and P6 in Lesson 3.2). */
import { fixedChoice, mc, numPart, part, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, frac, fracLatex, gcd, isPrime, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef, TableFigure } from '../../../types.ts';
import { textAt, textWidth, vennFigure } from './setslogic.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Ava', 'Jayden', 'Harpreet', 'Lucas', 'Kiona', 'Mohammed', 'Elise', 'Darnell', 'Yuki', 'Rowan', 'Anika', 'Mateo', 'Sienna', 'Emeka', 'Talia',
  'Arjun', 'Maëlle', 'Connor', 'Layla', 'Nathaniel', 'Wren', 'Bao', 'Fiona', 'Ibrahim', 'Skye', 'Diego', 'Naomi', 'Kwame', 'Jessie', 'Parveen',
];

const PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Elmwood'];

const DECK_TEXT =
  'A standard deck of 52 playing cards has four suits: hearts and diamonds (red), clubs and spades (black). Each suit has 13 ranks: A, 2 to 10, J, Q and K. The J, Q and K are face cards.';

const COLOURS = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'purple'];

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

function fact(n: number): number {
  let p = 1;
  for (let i = 2; i <= n; i++) p *= i;
  return p;
}

function perm(n: number, r: number): number {
  let p = 1;
  for (let i = 0; i < r; i++) p *= n - i;
  return p;
}

function comb(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  const k = Math.min(r, n - r);
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
}

const nx = (x: number) => fmtGroupTex(x, 6);
const nC = (n: number | string, r: number | string) => `{}_{${n}}C_{${r}}`;
const nP = (n: number | string, r: number | string) => `{}_{${n}}P_{${r}}`;

/** A reduced fraction in LaTeX. */
const fr = (n: number, d: number) => fracLatex(frac(n, d));
/** n/d, followed by "= reduced" when it reduces. */
function frEq(n: number, d: number): string {
  const f = frac(n, d);
  return f.d === d ? fr(n, d) : `\\frac{${nx(n)}}{${nx(d)}} = ${fr(n, d)}`;
}

/** An exact probability: any equivalent fraction, or an exact decimal, is accepted. */
function probPart(n: number, d: number, label = 'Probability:'): Part {
  const f = frac(n, d);
  return { label, answer: { kind: 'numeric', value: f.n / f.d, allowExpression: true, display: 'fraction', ...(f.d > 1 ? { exact: `${f.n}/${f.d}` } : {}) } };
}

/** An exact decimal probability (when the question gives decimals or percents). */
function decPart(v: number, label = 'Probability:'): Part {
  return { label, answer: { kind: 'numeric', value: roundTo(v, 10), allowExpression: true, display: 'decimal' } };
}

/** Odds a : b in lowest terms, typed like "3 : 5" (spacing optional) or "3 to 5". */
function oddsPart(a: number, b: number, label = 'Odds:'): Part {
  const g = gcd(a, b);
  const [p, q] = [a / g, b / g];
  return { label, placeholder: 'like 3 : 5', answer: { kind: 'text', accepted: [`${p} : ${q}`, `${p}:${q}`, `${p} :${q}`, `${p}: ${q}`, `${p} to ${q}`] } };
}

const reduceOdds = (a: number, b: number): [number, number] => {
  const g = gcd(a, b);
  return [a / g, b / g];
};

/** Steps that reduce a : b, when it reduces. */
function oddsReduceSteps(a: number, b: number): string[] {
  const g = gcd(a, b);
  return g > 1 ? [`Divide both terms by ${g}: $${a} : ${b} = ${a / g} : ${b / g}$`] : [];
}

/** True when v sits too close to a rounding boundary at this many decimals. */
function nearBoundary(v: number, decimals: number): boolean {
  const s = Math.abs(v) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.02;
}

/** A decimal for prose and LaTeX (no float noise). */
const dec = (v: number) => fmt(roundTo(v, 8), 8);

/** "1 outcome", "3 outcomes" */
const pl = (n: number, word: string, plural = `${word}s`) => `${n} ${n === 1 ? word : plural}`;

/** A decimal answer: exact when it has at most 4 decimal places, otherwise rounded to the nearest thousandth. */
function decAnswer(v: number): { part: Part; ask: string; shown: string } {
  const exact = Math.abs(roundTo(v, 4) - v) < 1e-9;
  if (exact) return { part: decPart(v), ask: 'Give your answer as a decimal.', shown: dec(v) };
  return { part: numPart(v, { decimals: 3, label: 'Probability:' }), ask: 'Round to the nearest thousandth.', shown: fmtFixed(v, 3) };
}

// ---------------------------------------------------------------------------
// Sample spaces: dice, cards and numbered tickets
// ---------------------------------------------------------------------------

interface NumEvent {
  name: string;
  test: (x: number) => boolean;
}

function numEvents(rng: Rng, N: number): NumEvent[] {
  const lo = rng.int(2, Math.max(2, Math.floor(N / 2)));
  const hi = rng.int(Math.ceil(N / 2), N - 1);
  const out: NumEvent[] = [
    { name: 'an even number', test: (x) => x % 2 === 0 },
    { name: 'an odd number', test: (x) => x % 2 === 1 },
    { name: 'a prime number', test: isPrime },
    { name: `a number less than ${lo}`, test: (x) => x < lo },
    { name: `a number greater than ${hi}`, test: (x) => x > hi },
  ];
  for (const k of [3, 4, 5]) if (N >= 2 * k) out.push({ name: `a multiple of ${k}`, test: (x) => x % k === 0 });
  if (N >= 9) out.push({ name: 'a perfect square', test: (x) => Number.isInteger(Math.sqrt(x)) });
  return out;
}

interface Card {
  rank: string;
  suit: string;
  red: boolean;
  face: boolean;
  num: number;
}

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const CARDS: Card[] = SUITS.flatMap((suit) => RANKS.map((rank, i) => ({ rank, suit, red: suit === 'hearts' || suit === 'diamonds', face: i >= 10, num: i + 1 })));

interface CardEvent {
  name: string;
  plural: string;
  test: (c: Card) => boolean;
}

const CARD_EVENTS: CardEvent[] = [
  { name: 'a heart', plural: 'hearts', test: (c) => c.suit === 'hearts' },
  { name: 'a spade', plural: 'spades', test: (c) => c.suit === 'spades' },
  { name: 'a club', plural: 'clubs', test: (c) => c.suit === 'clubs' },
  { name: 'a red card', plural: 'red cards', test: (c) => c.red },
  { name: 'a black card', plural: 'black cards', test: (c) => !c.red },
  { name: 'a face card', plural: 'face cards', test: (c) => c.face },
  { name: 'a king', plural: 'kings', test: (c) => c.rank === 'K' },
  { name: 'an ace', plural: 'aces', test: (c) => c.rank === 'A' },
  { name: 'a queen', plural: 'queens', test: (c) => c.rank === 'Q' },
  { name: 'a 7', plural: "7's", test: (c) => c.rank === '7' },
  { name: 'a red face card', plural: 'red face cards', test: (c) => c.red && c.face },
  { name: 'a black king', plural: 'black kings', test: (c) => !c.red && c.rank === 'K' },
];

const countCards = (t: (c: Card) => boolean) => CARDS.filter(t).length;

// ---------------------------------------------------------------------------
// Lesson 3.1 — Odds and probability
// ---------------------------------------------------------------------------

interface Situation {
  setup: string;
  event: string;
  fav: number;
  unfav: number;
  /** Explains the favourable and unfavourable counts. */
  count: string;
}

function marbleSit(rng: Rng): Situation {
  const cs = rng.sample(COLOURS, rng.int(2, 3));
  const ns = cs.map(() => rng.int(2, 12));
  const container = rng.pick(['bag', 'jar', 'box']);
  const listed = rng.shuffle(cs.map((c, i) => `${ns[i]} ${c}`));
  const total = sum(ns);
  return {
    setup: `A ${container} holds ${andList(listed)} marbles. One marble is drawn at random.`,
    event: `drawing a ${cs[0]} marble`,
    fav: ns[0],
    unfav: total - ns[0],
    count: `Favourable: the ${ns[0]} ${cs[0]} marbles. Unfavourable: the other $${total} - ${ns[0]} = ${total - ns[0]}$ marbles.`,
  };
}

function dieSit(rng: Rng): Situation {
  for (;;) {
    const s = rng.pick([6, 6, 8, 10, 12]);
    const e = rng.pick(numEvents(rng, s));
    const fav = range(1, s).filter(e.test);
    if (fav.length < 1 || fav.length > s - 1) continue;
    return {
      setup: `A fair ${s}-sided die numbered 1 to ${s} is rolled.`,
      event: `rolling ${e.name}`,
      fav: fav.length,
      unfav: s - fav.length,
      count: `Favourable: ${fav.join(', ')} (${fav.length} outcome${fav.length > 1 ? 's' : ''}). Unfavourable: the other $${s} - ${fav.length} = ${s - fav.length}$ outcomes.`,
    };
  }
}

function cardSit(rng: Rng): Situation {
  const e = rng.pick(CARD_EVENTS);
  const n = countCards(e.test);
  return {
    setup: `${DECK_TEXT} One card is drawn at random.`,
    event: `drawing ${e.name}`,
    fav: n,
    unfav: 52 - n,
    count: `Favourable: the ${n} ${e.plural}. Unfavourable: the other $52 - ${n} = ${52 - n}$ cards.`,
  };
}

function raffleSit(rng: Rng): Situation {
  const N = rng.pick([50, 80, 100, 120, 150, 200, 250, 300, 400, 500]);
  const k = rng.int(1, 12);
  const name = rng.pick(NAMES);
  return {
    setup: `A school in ${rng.pick(PLACES)} sold ${N} raffle tickets for one prize, and ${name} bought ${k} of them. The winning ticket is drawn at random.`,
    event: `${name} winning the prize`,
    fav: k,
    unfav: N - k,
    count: `Favourable: ${name}'s ${k} ticket${k > 1 ? 's' : ''}. Unfavourable: the other $${N} - ${k} = ${N - k}$ tickets.`,
  };
}

function spinnerSit(rng: Rng): Situation {
  const cs = rng.sample(COLOURS, 3);
  const ns = cs.map(() => rng.int(1, 5));
  const total = sum(ns);
  return {
    setup: `A spinner has ${total} equal sections: ${andList(rng.shuffle(cs.map((c, i) => `${ns[i]} ${c}`)))}.`,
    event: `landing on ${cs[0]}`,
    fav: ns[0],
    unfav: total - ns[0],
    count: `Favourable: the ${ns[0]} ${cs[0]} section${ns[0] > 1 ? 's' : ''}. Unfavourable: the other $${total} - ${ns[0]} = ${total - ns[0]}$ sections.`,
  };
}

const ODDS_EVENTS = [
  'the Riverton Hawks winning their next game',
  'rain in Ashford tomorrow',
  'snow in Pinewood tomorrow',
  'the Brookfield Rams winning their next game',
  'a flight from Brookfield to Westbury leaving on time',
  'a randomly chosen Grade 12 student at a school in Hillcrest having a driver’s licence',
  'a randomly chosen customer at a store in Lakeside paying by debit card',
  'a canola seed from a new batch sprouting',
  'the Stonebridge Wolves scoring first in their next game',
  'a randomly chosen car in a Maple Falls parking lot being electric',
];

const ODDS_HINTS = [
  'Odds compare outcomes with each other: odds in favour = favourable : unfavourable, and odds against = unfavourable : favourable.',
  'Probability compares favourable outcomes with **all** outcomes: if the odds in favour are $a : b$, then $P = \\frac{a}{a + b}$.',
];

function oddsD1(rng: Rng): GenOutput {
  const mode = rng.pick(['favour', 'against', 'toProb', 'toProb'] as const);
  if (mode === 'toProb') {
    const event = rng.pick(ODDS_EVENTS);
    let a: number;
    let b: number;
    do {
      a = rng.int(1, 9);
      b = rng.int(1, 9);
    } while (a === b || gcd(a, b) > 1);
    const against = rng.chance(0.4);
    // P(event): in favour a : b gives a/(a+b); against a : b gives b/(a+b).
    const fav = against ? b : a;
    return {
      prompt: `The odds ${against ? 'against' : 'in favour of'} ${event} are $${a} : ${b}$. What is the probability of this event? Give your answer as a fraction.`,
      parts: [probPart(fav, a + b)],
      hints: ODDS_HINTS,
      solution: [
        against
          ? `Odds against $= ${a} : ${b}$ means ${pl(a, 'unfavourable outcome')} for every ${b} favourable.`
          : `Odds in favour $= ${a} : ${b}$ means ${pl(a, 'favourable outcome')} for every ${b} unfavourable.`,
        `Total: $${a} + ${b} = ${a + b}$ outcomes, and ${fav} of them are favourable.`,
        `$P = ${fr(fav, a + b)}$`,
      ],
    };
  }
  const s = rng.pick([marbleSit, dieSit, cardSit, raffleSit, spinnerSit])(rng);
  const [x, y] = mode === 'favour' ? [s.fav, s.unfav] : [s.unfav, s.fav];
  const [p, q] = reduceOdds(x, y);
  return {
    prompt: `${s.setup} What are the odds ${mode === 'favour' ? 'in favour of' : 'against'} ${s.event}? Write them as $a : b$ in lowest terms.`,
    parts: [oddsPart(x, y, mode === 'favour' ? 'Odds in favour:' : 'Odds against:')],
    hints: [ODDS_HINTS[0], 'Count the favourable and unfavourable outcomes, then write the ratio and reduce it.'],
    solution: [
      s.count,
      mode === 'favour' ? `Odds in favour = favourable : unfavourable $= ${x} : ${y}$` : `Odds against = unfavourable : favourable $= ${x} : ${y}$`,
      ...oddsReduceSteps(x, y),
      `The odds ${mode === 'favour' ? 'in favour of' : 'against'} ${s.event} are $${p} : ${q}$.`,
    ],
  };
}

function oddsD2(rng: Rng): GenOutput {
  const mode = rng.pick(['probToOdds', 'oddsToPercent', 'experimental', 'statement'] as const);
  const event = rng.pick(ODDS_EVENTS);
  if (mode === 'probToOdds') {
    const form = rng.pick(['percent', 'decimal', 'fraction'] as const);
    let fav: number;
    let total: number;
    let shown: string;
    if (form === 'fraction') {
      total = rng.int(5, 12);
      fav = rng.intExcept(1, total - 1, [total / 2]);
      const f = frac(fav, total);
      [fav, total] = [f.n, f.d];
      shown = `$${fr(fav, total)}$`;
    } else {
      fav = rng.pick([10, 15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85, 90]);
      total = 100;
      shown = form === 'percent' ? `${fav}%` : `$${dec(fav / 100)}$`;
    }
    const unfav = total - fav;
    const against = rng.chance(0.5);
    const [x, y] = against ? [unfav, fav] : [fav, unfav];
    const [p, q] = reduceOdds(x, y);
    return {
      prompt: `The probability of ${event} is ${shown}. What are the odds ${against ? 'against' : 'in favour of'} it? Write them as $a : b$ in lowest terms.`,
      parts: [oddsPart(x, y, against ? 'Odds against:' : 'Odds in favour:')],
      hints: [form === 'fraction' ? `A probability of $${fr(fav, total)}$ means ${pl(fav, 'favourable outcome')} out of ${total}.` : `Think of ${shown} as ${fav} favourable outcomes out of 100.`, ODDS_HINTS[0]],
      solution: [
        `${cap(shown)} means ${pl(fav, 'favourable outcome')} out of ${total}, so $${total} - ${fav} = ${unfav}$ are unfavourable.`,
        against ? `Odds against = unfavourable : favourable $= ${x} : ${y}$` : `Odds in favour = favourable : unfavourable $= ${x} : ${y}$`,
        ...oddsReduceSteps(x, y),
        `The odds ${against ? 'against' : 'in favour of'} ${event} are $${p} : ${q}$.`,
      ],
    };
  }
  if (mode === 'oddsToPercent') {
    for (;;) {
      const a = rng.int(1, 15);
      const b = rng.int(1, 15);
      if (a === b || gcd(a, b) > 1) continue;
      const against = rng.chance(0.6);
      const fav = against ? b : a;
      const pct = (100 * fav) / (a + b);
      if (nearBoundary(pct, 1)) continue;
      return {
        prompt: `The odds ${against ? 'against' : 'in favour of'} ${event} are $${a} : ${b}$. What is the probability of this event, as a percent to the nearest tenth?`,
        parts: [numPart(pct, { decimals: 1, suffix: '%', label: 'Probability:' })],
        hints: [against ? 'Odds against $a : b$ means $a$ unfavourable outcomes for every $b$ favourable outcomes.' : 'Odds in favour $a : b$ means $a$ favourable outcomes for every $b$ unfavourable outcomes.', 'Divide the favourable part by the total of both parts, then multiply by 100.'],
        solution: [
          `Favourable: ${fav}; total: $${a} + ${b} = ${a + b}$`,
          `$P = \\frac{${fav}}{${a + b}} \\approx ${fmt(fav / (a + b), 5)}$`,
          `The probability is about ${fmtFixed(pct, 1)}%.`,
        ],
      };
    }
  }
  if (mode === 'experimental') {
    const team = rng.pick(['senior girls’ volleyball team', 'junior hockey team', 'curling team', 'basketball team', 'soccer team']);
    const G = rng.int(16, 40);
    const W = rng.intExcept(4, G - 4, [G / 2]);
    const against = rng.chance(0.5);
    const [x, y] = against ? [G - W, W] : [W, G - W];
    const [p, q] = reduceOdds(x, y);
    const place = rng.pick(PLACES);
    return {
      prompt: `Last season, a ${team} from ${place} won ${W} of its ${G} games, with no ties. Based on these results, what are the odds ${against ? 'against' : 'in favour of'} the team winning its next game? Write them as $a : b$ in lowest terms.`,
      parts: [oddsPart(x, y, against ? 'Odds against:' : 'Odds in favour:')],
      hints: ['Use the results as the favourable and unfavourable outcomes: wins and losses.', ODDS_HINTS[0]],
      solution: [
        `Wins: ${W}. Losses: $${G} - ${W} = ${G - W}$.`,
        against ? `Odds against winning = losses : wins $= ${x} : ${y}$` : `Odds in favour of winning = wins : losses $= ${x} : ${y}$`,
        ...oddsReduceSteps(x, y),
        `The odds ${against ? 'against' : 'in favour of'} winning are $${p} : ${q}$ (an experimental estimate based on last season).`,
      ],
    };
  }
  // Which statement is true?
  let a: number;
  let b: number;
  do {
    a = rng.int(1, 9);
    b = rng.int(1, 9);
  } while (a === b || gcd(a, b) > 1);
  const correct = `The probability of ${event} is $${fr(a, a + b)}$.`;
  const ds = rng.shuffle([
    `The probability of ${event} is $${fr(a, b)}$.`,
    `The probability of ${event} is $${fr(b, a + b)}$.`,
    `The odds against ${event} are $${a} : ${b}$.`,
    a > b ? `${cap(event)} is less likely to happen than not to happen.` : `${cap(event)} is more likely to happen than not to happen.`,
  ]);
  return {
    prompt: `The odds in favour of ${event} are $${a} : ${b}$. Which statement is true?`,
    parts: [part(mc(rng, correct, ds.slice(0, 3)))],
    hints: ODDS_HINTS,
    solution: [
      `Odds in favour $${a} : ${b}$ means ${pl(a, 'favourable outcome')} for every ${b} unfavourable, out of $${a + b}$ in all.`,
      `So $P = ${fr(a, a + b)}$, and the odds against are $${b} : ${a}$. The event is ${a > b ? 'more' : 'less'} likely to happen than not, because $${a} ${a > b ? '>' : '<'} ${b}$.`,
      `The true statement is: ${correct}`,
    ],
  };
}

function oddsD3(rng: Rng): GenOutput {
  const mode = rng.pick(['count', 'add', 'claim'] as const);
  if (mode === 'count') {
    let a: number;
    let b: number;
    do {
      a = rng.int(1, 9);
      b = rng.int(1, 9);
    } while (a === b || gcd(a, b) > 1);
    const k = rng.int(3, 12);
    const N = k * (a + b);
    const against = rng.chance(0.5);
    const favPart = against ? b : a;
    const ans = k * favPart;
    const ctx = rng.pick([
      { setup: `A jar holds ${N} marbles, some of them green.`, event: 'drawing a green marble', ask: 'How many green marbles are in the jar?' },
      { setup: `A charity in ${rng.pick(PLACES)} printed ${N} scratch tickets, and some of them win a prize.`, event: 'a randomly chosen ticket winning a prize', ask: 'How many of the tickets win a prize?' },
      { setup: `A box holds ${N} granola bars, some of them chocolate chip.`, event: 'picking a chocolate chip bar at random', ask: 'How many chocolate chip bars are in the box?' },
    ]);
    return {
      prompt: `${ctx.setup} The odds ${against ? 'against' : 'in favour of'} ${ctx.event} are $${a} : ${b}$. ${ctx.ask}`,
      parts: [numPart(ans, { label: 'Number:' })],
      hints: [`The odds split the ${N} items into $${a} + ${b} = ${a + b}$ equal shares.`, `Find the probability of the event first, then multiply by ${N}.`],
      solution: [
        `Odds ${against ? 'against' : 'in favour'} $${a} : ${b}$: ${favPart} favourable for every ${against ? a : b} unfavourable, so $P = \\frac{${favPart}}{${a + b}}$.`,
        `Number $= ${N} \\times \\frac{${favPart}}{${a + b}} = ${ans}$`,
        `There are ${ans}.`,
      ],
    };
  }
  if (mode === 'add') {
    for (;;) {
      const p = rng.int(1, 5);
      const q = rng.int(1, 5);
      if (gcd(p, q) > 1) continue;
      const b = q * rng.int(2, 6);
      const R = (p * b) / q;
      if (R < 2) continue;
      const r = rng.int(1, R - 1);
      const [c1, c2] = rng.sample(COLOURS, 2);
      const [r0, b0] = reduceOdds(r, b);
      if (r0 === p && b0 === q) continue;
      const x = R - r;
      return {
        prompt: `A bag holds ${r} ${c1} and ${b} ${c2} marbles, so the odds in favour of drawing a ${c1} marble are $${r0} : ${b0}$. How many ${c1} marbles must be added so that the odds in favour of drawing a ${c1} marble become $${p} : ${q}$?`,
        parts: [numPart(x, { label: 'Marbles to add:' })],
        hints: [`Only the number of ${c1} marbles changes; the ${b} ${c2} marbles are the unfavourable outcomes.`, `Set up $\\frac{${c1} \\text{ marbles}}{${b}} = \\frac{${p}}{${q}}$ and solve.`],
        solution: [
          `New odds in favour = ${c1} : ${c2} $= ${p} : ${q}$, with ${b} ${c2} marbles.`,
          `$\\frac{R}{${b}} = \\frac{${p}}{${q}}$, so $R = \\frac{${p} \\times ${b}}{${q}} = ${R}$ ${c1} marbles are needed.`,
          `Add $${R} - ${r} = ${x}$ ${c1} marbles. Check: $${R} : ${b} = ${p} : ${q}$ ✓`,
          `${x} ${c1} marble${x > 1 ? 's' : ''} must be added.`,
        ],
      };
    }
  }
  // Assess a claim.
  const kind = rng.pick(['oneIn', 'forecast', 'gambler'] as const);
  const name = rng.pick(NAMES);
  if (kind === 'oneIn') {
    const N = rng.pick([10, 20, 25, 40, 50, 100, 250]);
    const correct = `No. "1 in ${N}" is a probability, $\\frac{1}{${N}}$, so the odds in favour are $1 : ${N - 1}$.`;
    return {
      prompt: `A coffee shop in ${rng.pick(PLACES)} advertises that each cup has a "1 in ${N} chance" of winning a free muffin. ${name} says the odds in favour of winning are $1 : ${N}$. Is ${name} correct? Choose the best answer.`,
      parts: [part(mc(rng, correct, [`Yes. "1 in ${N}" and "$1 : ${N}$" mean the same thing.`, `No. The odds in favour are $${N - 1} : 1$.`, `No. The odds in favour are $1 : ${N + 1}$.`]))],
      hints: ['Is "1 in N" comparing favourable outcomes with all outcomes, or with unfavourable outcomes?', 'Odds compare favourable with unfavourable outcomes.'],
      solution: [`"1 in ${N}" means 1 winning cup out of ${N} cups: a probability of $\\frac{1}{${N}}$.`, `Favourable: 1. Unfavourable: $${N} - 1 = ${N - 1}$.`, `The odds in favour are $1 : ${N - 1}$, so ${name} is not correct.`],
    };
  }
  if (kind === 'forecast') {
    const p = rng.pick([20, 30, 40, 60, 70, 80, 25, 75]);
    const [x, y] = reduceOdds(100 - p, p);
    const correct = `No. The odds against are $${100 - p} : ${p}$, which is $${x} : ${y}$.`;
    return {
      prompt: `A forecast for ${rng.pick(PLACES)} gives a ${p}% chance of snow tomorrow. ${name} says the odds against snow are $${y} : ${x}$. Is ${name} correct? Choose the best answer.`,
      parts: [part(mc(rng, correct, [`Yes. A ${p}% chance of snow means odds against of $${y} : ${x}$.`, `No. The odds against are $${100 - p} : 100$.`, `No. Odds cannot be found from a percent.`]))],
      hints: [`A ${p}% chance means ${p} favourable outcomes out of 100.`, 'Odds against = unfavourable : favourable.'],
      solution: [`Favourable (snow): ${p}. Unfavourable (no snow): $100 - ${p} = ${100 - p}$.`, `Odds against = unfavourable : favourable $= ${100 - p} : ${p} = ${x} : ${y}$`, `${name} wrote the odds in favour, not the odds against, so ${name} is not correct.`],
    };
  }
  const k = rng.int(4, 7);
  const side = rng.pick(['heads', 'tails']);
  const other = side === 'heads' ? 'tails' : 'heads';
  const correct = `No. Each toss is independent, so the odds in favour of ${other} are still $1 : 1$.`;
  return {
    prompt: `A fair coin has landed ${side} ${k} times in a row. ${name} says the odds in favour of ${other} on the next toss are now better than $1 : 1$, because ${other} is "due". Is ${name} correct? Choose the best answer.`,
    parts: [part(mc(rng, correct, [`Yes. After ${k} ${side} in a row, ${other} is more likely.`, `No. The coin is now more likely to land ${side} again, so the odds favour ${side}.`, `Yes. The odds in favour of ${other} are now $${k} : 1$.`]))],
    hints: ['Does the coin remember what happened on earlier tosses?', 'For a fair coin, each toss has 1 favourable and 1 unfavourable outcome, no matter what came before.'],
    solution: [`The coin has no memory: earlier tosses do not change the next toss.`, `The next toss still has 1 favourable and 1 unfavourable outcome, so the odds in favour of ${other} are $1 : 1$.`, `${name} is not correct. Believing that an outcome is "due" is called the gambler's fallacy.`],
  };
}

const odds = skill({
  id: 'm302-odds',
  name: 'Odds and probability',
  description: 'Convert between odds in favour, odds against and probability; use odds to find counts; and assess odds and probability statements.',
  outcomes: ['P1'],
  lessonId: 'm302-3-1',
  calculator: true,
  gen: (rng, d) => (d === 1 ? oddsD1(rng) : d === 2 ? oddsD2(rng) : oddsD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 3.2 — Probability using counting methods
// ---------------------------------------------------------------------------

const COUNT_HINTS = [
  'Probability = (number of favourable outcomes) ÷ (total number of outcomes).',
  'Decide whether order matters: use permutations (${}_{n}P_{r}$) when it does and combinations (${}_{n}C_{r}$) when it does not.',
];

const DISTINCT_WORDS = ['MATH', 'OLDS', 'PRISM', 'LEDUC', 'GRAPH', 'ANGLE', 'SLOPE', 'JASPER', 'FACTOR', 'NUMBER', 'VECTOR', 'CAMROSE'];

function pcD1(rng: Rng): GenOutput {
  const mode = rng.pick(['pair', 'line', 'code', 'word'] as const);
  if (mode === 'pair') {
    const n = rng.int(5, 12);
    const [a, b] = rng.sample(NAMES, 2);
    const total = comb(n, 2);
    return {
      prompt: `Two of the ${n} students in a club, including ${a} and ${b}, are chosen at random to attend a leadership camp in ${rng.pick(PLACES)}. What is the probability that ${a} and ${b} are the two chosen? Give your answer as a fraction.`,
      parts: [probPart(1, total)],
      hints: ['The order of choosing does not matter, so count the possible pairs with a combination.', `Only one of those pairs is ${a} and ${b}.`],
      solution: [`Possible pairs: $${nC(n, 2)} = \\frac{${n} \\times ${n - 1}}{2} = ${total}$`, `Favourable: 1 pair (${a} and ${b}).`, `$P = ${fr(1, total)}$`],
    };
  }
  if (mode === 'line') {
    const n = rng.int(4, 7);
    const [a, b] = rng.sample(NAMES, 2);
    const total = fact(n);
    const favN = fact(n - 2);
    return {
      prompt: `${n} friends, including ${a} and ${b}, line up in a random order for a photo. What is the probability that ${a} is first and ${b} is second? Give your answer as a fraction.`,
      parts: [probPart(favN, total)],
      hints: ['Count all the possible orders, then count the orders with the first two places filled by those two friends.', `With ${a} and ${b} placed, the other ${n - 2} friends can be in any order.`],
      solution: [`All orders: $${n}! = ${nx(total)}$`, `Favourable: ${a} first, ${b} second, and the other ${n - 2} in any order: $${n - 2}! = ${favN}$`, `$P = ${frEq(favN, total)}$`],
    };
  }
  if (mode === 'code') {
    const k = rng.int(2, 4);
    const total = perm(10, k);
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} forgot the ${k}-digit code for a bike lock. The code uses ${k} different digits from 0 to 9. If ${name} makes one random guess with ${k} different digits, what is the probability that it is correct? Give your answer as a fraction.`,
      parts: [probPart(1, total)],
      hints: ['The order of the digits matters, and no digit repeats: use a permutation.', `Count the possible codes with $${nP(10, k)}$.`],
      solution: [`Possible codes: $${nP(10, k)} = ${Array.from({ length: k }, (_, i) => 10 - i).join(' \\times ')} = ${nx(total)}$`, 'Only one of them is correct.', `$P = ${fr(1, total)}$`],
    };
  }
  const w = rng.pick(DISTINCT_WORDS);
  const n = w.length;
  const [x, y] = rng.sample(w.split(''), 2);
  const favN = fact(n - 2);
  return {
    prompt: `The letters of the word ${w} are written on cards and arranged in a row at random. What is the probability that the arrangement begins with ${x} and ends with ${y}? Give your answer as a fraction.`,
    parts: [probPart(favN, fact(n))],
    hints: [`All ${n} letters are different, so there are $${n}!$ arrangements.`, `Fix ${x} first and ${y} last; the other ${n - 2} letters can be in any order.`],
    solution: [`All arrangements: $${n}! = ${nx(fact(n))}$`, `Favourable: $${n - 2}! = ${nx(favN)}$`, `$P = ${frEq(favN, fact(n))}$`],
  };
}

interface Group {
  /** The setup sentence, given the two group sizes. */
  setup: (A: number, B: number) => string;
  /** The sentence saying how r of them are chosen. */
  chosen: (r: number) => string;
  a: string;
  a1: string;
  b: string;
}

const GROUPS: Group[] = [
  { setup: (A, B) => `${A} Grade 12 students and ${B} Grade 11 students have volunteered to help plan a school event.`, chosen: (r) => `A committee of ${r} is chosen from them at random.`, a: 'Grade 12 students', a1: 'Grade 12 student', b: 'Grade 11 students' },
  { setup: (A, B) => `${A} teachers and ${B} students have volunteered for a school planning group.`, chosen: (r) => `A committee of ${r} is chosen from them at random.`, a: 'teachers', a1: 'teacher', b: 'students' },
  { setup: (A, B) => `${A} women and ${B} men have volunteered for a community panel in PLACE.`, chosen: (r) => `A panel of ${r} is chosen from them at random.`, a: 'women', a1: 'woman', b: 'men' },
  { setup: (A, B) => `A hockey team in PLACE has ${A} forwards and ${B} defence players.`, chosen: (r) => `${r} of these players are chosen at random to visit a children’s hospital.`, a: 'forwards', a1: 'forward', b: 'defence players' },
  { setup: (A, B) => `${A} nurses and ${B} doctors at a hospital in PLACE have volunteered for a health fair.`, chosen: (r) => `A team of ${r} is chosen from them at random.`, a: 'nurses', a1: 'nurse', b: 'doctors' },
];

const groupSetup = (rng: Rng, g: Group, A: number, B: number, r: number) => `${g.setup(A, B).replace('PLACE', rng.pick(PLACES))} ${g.chosen(r)}`;

function pcD2(rng: Rng): GenOutput {
  const mode = rng.pick(['all', 'exact', 'cards', 'lottery'] as const);
  if (mode === 'all' || mode === 'exact') {
    const g = rng.pick(GROUPS);
    const A = rng.int(4, 9);
    const B = rng.int(4, 9);
    const r = rng.int(3, 4);
    const total = comb(A + B, r);
    if (mode === 'all') {
      const favN = comb(A, r);
      return {
        prompt: `${groupSetup(rng, g, A, B, r)} What is the probability that all ${r} are ${g.a}? Give your answer as a fraction.`,
        parts: [probPart(favN, total)],
        hints: COUNT_HINTS,
        solution: [`All possible groups: $${nC(A + B, r)} = ${nx(total)}$`, `Groups of ${g.a} only: $${nC(A, r)} = ${favN}$`, `$P = ${frEq(favN, total)}$`],
      };
    }
    const k = rng.int(1, r - 1);
    const favN = comb(A, k) * comb(B, r - k);
    return {
      prompt: `${groupSetup(rng, g, A, B, r)} What is the probability that exactly ${k} of the ${r} ${k === 1 ? `is a ${g.a1}` : `are ${g.a}`}? Give your answer as a fraction.`,
      parts: [probPart(favN, total)],
      hints: [COUNT_HINTS[0], `Choose ${k} of the ${A} ${g.a} **and** ${r - k} of the ${B} ${g.b}, and multiply.`],
      solution: [
        `All possible groups: $${nC(A + B, r)} = ${nx(total)}$`,
        `Favourable: $${nC(A, k)} \\times ${nC(B, r - k)} = ${comb(A, k)} \\times ${comb(B, r - k)} = ${favN}$`,
        `$P = ${frEq(favN, total)}$`,
      ],
    };
  }
  if (mode === 'cards') {
    const kind = rng.pick(['same', 'same', 'mixed'] as const);
    const total = comb(52, 2);
    if (kind === 'same') {
      const e = rng.pick([CARD_EVENTS[0], CARD_EVENTS[1], CARD_EVENTS[3], CARD_EVENTS[5], CARD_EVENTS[6], CARD_EVENTS[7]]);
      const m = countCards(e.test);
      const favN = comb(m, 2);
      const plural = e.plural;
      return {
        prompt: `${DECK_TEXT} Two cards are dealt at random. What is the probability that both are ${plural}? Give your answer as a fraction.`,
        parts: [probPart(favN, total)],
        hints: COUNT_HINTS,
        solution: [`All 2-card hands: $${nC(52, 2)} = ${nx(total)}$`, `There are ${m} ${plural}, so hands with two of them: $${nC(m, 2)} = ${favN}$`, `$P = ${frEq(favN, total)}$`],
      };
    }
    const [e1, e2] = rng.pick([
      [CARD_EVENTS[3], CARD_EVENTS[4]],
      [CARD_EVENTS[0], CARD_EVENTS[1]],
      [CARD_EVENTS[6], CARD_EVENTS[7]],
      [CARD_EVENTS[0], CARD_EVENTS[2]],
    ]);
    const m1 = countCards(e1.test);
    const m2 = countCards(e2.test);
    const favN = m1 * m2;
    return {
      prompt: `${DECK_TEXT} Two cards are dealt at random. What is the probability of getting one ${e1.name.replace(/^an? /, '')} and one ${e2.name.replace(/^an? /, '')}? Give your answer as a fraction.`,
      parts: [probPart(favN, total)],
      hints: [COUNT_HINTS[0], `Choose 1 of the ${m1} and 1 of the ${m2}, and multiply.`],
      solution: [`All 2-card hands: $${nC(52, 2)} = ${nx(total)}$`, `Favourable: $${nC(m1, 1)} \\times ${nC(m2, 1)} = ${m1} \\times ${m2} = ${favN}$`, `$P = ${frEq(favN, total)}$`],
    };
  }
  const N = rng.int(12, 25);
  const k = 3;
  const total = comb(N, k);
  const all = rng.chance(0.5);
  const favN = all ? 1 : comb(3, 2) * comb(N - 3, 1);
  return {
    prompt: `In a school fundraiser draw, 3 different numbers are drawn at random from 1 to ${N}, and the order does not matter. ${rng.pick(NAMES)} picks 3 different numbers. What is the probability that ${all ? 'all 3 of them match' : 'exactly 2 of them match'} the numbers drawn? Give your answer as a fraction.`,
    parts: [probPart(favN, total)],
    hints: [COUNT_HINTS[0], all ? 'Only one set of 3 numbers matches.' : 'Choose 2 of the 3 winning numbers and 1 of the losing numbers.'],
    solution: [
      `All possible draws: $${nC(N, 3)} = ${nx(total)}$`,
      all ? 'Favourable: 1 draw matches all 3 numbers.' : `Favourable: 2 of the 3 winning numbers and 1 of the other ${N - 3}: $${nC(3, 2)} \\times ${nC(N - 3, 1)} = 3 \\times ${N - 3} = ${favN}$`,
      `$P = ${frEq(favN, total)}$`,
    ],
  };
}

/** Distinct arrangements of a multiset of letters (brute force). */
function arrangements(letters: string[]): string[] {
  if (letters.length <= 1) return [letters.join('')];
  const out = new Set<string>();
  const seen = new Set<string>();
  letters.forEach((l, i) => {
    if (seen.has(l)) return;
    seen.add(l);
    const rest = [...letters.slice(0, i), ...letters.slice(i + 1)];
    for (const r of arrangements(rest)) out.add(l + r);
  });
  return [...out];
}

const REPEAT_WORDS = ['CANADA', 'ALBERTA', 'CALGARY', 'OTTAWA', 'BANFF', 'HINTON', 'TORONTO', 'OKOTOKS', 'COCHRANE', 'MEDICINE'];

/** n!/(a!b!...) written for a solution. */
function multisetTex(letters: string[]): { tex: string; value: number } {
  const counts = [...new Set(letters)].map((l) => letters.filter((x) => x === l).length).filter((c) => c > 1);
  const value = counts.reduce((v, c) => v / fact(c), fact(letters.length));
  if (!counts.length) return { tex: `${letters.length}! = ${nx(value)}`, value };
  return { tex: `\\frac{${letters.length}!}{${counts.map((c) => `${c}!`).join('\\,')}} = ${nx(value)}`, value };
}

function pcD3(rng: Rng): GenOutput {
  const mode = rng.pick(['together', 'atLeast', 'letters', 'includes', 'hand'] as const);
  if (mode === 'together') {
    const n = rng.int(5, 8);
    const k = rng.chance(0.65) ? 2 : 3;
    const who = rng.sample(NAMES, k);
    const notTog = k === 2 && rng.chance(0.4);
    const total = fact(n);
    const tog = fact(k) * fact(n - k + 1);
    const favN = notTog ? total - tog : tog;
    return {
      prompt: `${n} students, including ${andList(who)}, sit in a row of ${n} seats at an assembly in ${rng.pick(PLACES)}, in a random order. What is the probability that ${notTog ? `${who[0]} and ${who[1]} do **not** sit next to each other` : `${andList(who)} sit together`}? Give your answer as a fraction.`,
      parts: [probPart(favN, total)],
      hints: [`Treat the ${k} students who sit together as one block. Arrange the block with the others, then arrange the ${k} students inside the block.`, notTog ? 'Not together = all arrangements minus the arrangements where they sit together.' : `There are $${n}!$ arrangements in all.`],
      solution: [
        `All arrangements: $${n}! = ${nx(total)}$`,
        `Together: the block and the other ${n - k} students make ${n - k + 1} items, so $${n - k + 1}! \\times ${k}! = ${nx(fact(n - k + 1))} \\times ${fact(k)} = ${nx(tog)}$`,
        ...(notTog ? [`Not together: $${nx(total)} - ${nx(tog)} = ${nx(favN)}$`] : []),
        `$P = ${frEq(favN, total)}$`,
      ],
    };
  }
  if (mode === 'atLeast') {
    const g = rng.pick(GROUPS);
    const A = rng.int(3, 7);
    const B = rng.int(4, 9);
    const r = rng.int(3, 4);
    const total = comb(A + B, r);
    const none = comb(B, r);
    const favN = total - none;
    return {
      prompt: `${groupSetup(rng, g, A, B, r)} What is the probability that at least one of the ${r} is a ${g.a1}? Give your answer as a fraction.`,
      parts: [probPart(favN, total)],
      hints: ['"At least one" is the complement of "none".', `$P(\\text{at least one}) = 1 - P(\\text{none})$. Count the groups with no ${g.a}.`],
      solution: [
        `All groups: $${nC(A + B, r)} = ${nx(total)}$`,
        `Groups with none of the ${g.a} (all ${g.b}): $${nC(B, r)} = ${none}$, so $P(\\text{none}) = ${frEq(none, total)}$`,
        `$P(\\text{at least one}) = 1 - ${fr(none, total)} = ${fr(favN, total)}$`,
      ],
    };
  }
  if (mode === 'letters') {
    const w = rng.pick(REPEAT_WORDS);
    const letters = w.split('');
    const reps = [...new Set(letters)].filter((l) => letters.filter((x) => x === l).length > 1);
    const L = rng.pick(reps);
    const cL = letters.filter((x) => x === L).length;
    const kind = rng.pick(['ends', 'together'] as const);
    const all = arrangements(letters);
    const totalM = multisetTex(letters);
    let favN: number;
    let favTex: string;
    let desc: string;
    if (kind === 'ends') {
      const rest = [...letters];
      for (let i = 0; i < 2; i++) rest.splice(rest.indexOf(L), 1);
      const m = multisetTex(rest);
      favN = all.filter((s) => s[0] === L && s[s.length - 1] === L).length;
      if (favN !== m.value) throw new Error('arrangement count mismatch');
      desc = `begins and ends with ${L}`;
      favTex = `Put ${L} first and last. Arrange the other ${rest.length} letters (${rest.join(', ')}): $${m.tex}$`;
    } else {
      const block = L.repeat(cL);
      const rest = letters.filter((x) => x !== L);
      const items = [block, ...rest];
      const m = multisetTex(items);
      favN = all.filter((s) => s.includes(block)).length;
      if (favN !== m.value) throw new Error('arrangement count mismatch');
      desc = cL === 2 ? `has the two ${L}'s next to each other` : `has all ${cL} ${L}'s next to each other`;
      favTex = `Treat ${block} as one block. Arrange the block and ${rest.join(', ')} (${items.length} items): $${m.tex}$`;
    }
    if (all.length !== totalM.value) throw new Error('arrangement count mismatch');
    return {
      prompt: `The letters of the word ${w} are arranged in a row at random. What is the probability that the arrangement ${desc}? Give your answer as a fraction.`,
      parts: [probPart(favN, totalM.value)],
      hints: ['Some letters repeat, so divide by the factorial of each repeat count.', kind === 'ends' ? `Place ${L} at both ends, then arrange the letters that are left.` : `Treat the ${L}'s as one block, and arrange the block with the other letters.`],
      solution: [`All arrangements: $${totalM.tex}$`, favTex, `$P = ${frEq(favN, totalM.value)}$`],
    };
  }
  if (mode === 'includes') {
    const n = rng.int(7, 14);
    const r = rng.int(3, 5);
    const name = rng.pick(NAMES);
    const total = comb(n, r);
    const favN = comb(n - 1, r - 1);
    return {
      prompt: `A teacher in ${rng.pick(PLACES)} chooses ${r} of the ${n} students in a class at random to present first. What is the probability that ${name} is one of the ${r} chosen? Give your answer as a fraction.`,
      parts: [probPart(favN, total)],
      hints: [COUNT_HINTS[0], `If ${name} is chosen, the other ${r - 1} come from the remaining ${n - 1} students.`],
      solution: [`All groups: $${nC(n, r)} = ${nx(total)}$`, `Groups with ${name}: $${nC(n - 1, r - 1)} = ${nx(favN)}$`, `$P = ${frEq(favN, total)}$`],
    };
  }
  // A card hand, rounded.
  for (;;) {
    const h = rng.pick([4, 5]);
    const cat = rng.pick([
      { name: 'hearts', m: 13 },
      { name: 'red cards', m: 26 },
      { name: 'face cards', m: 12 },
      { name: 'spades', m: 13 },
      { name: 'aces', m: 4 },
    ]);
    const k = rng.int(cat.m === 4 ? 1 : 0, Math.min(h, cat.m === 4 ? 2 : h));
    const total = comb(52, h);
    const favN = comb(cat.m, k) * comb(52 - cat.m, h - k);
    const p = favN / total;
    if (p < 0.002 || nearBoundary(p, 3)) continue;
    const what = k === 0 ? `has no ${cat.name}` : k === h ? `is all ${cat.name}` : `has exactly ${k} ${k === 1 ? cat.name.replace(/s$/, '') : cat.name}`;
    return {
      prompt: `${DECK_TEXT} A ${h}-card hand is dealt at random. What is the probability that the hand ${what}? Round to the nearest thousandth.`,
      parts: [numPart(p, { decimals: 3, label: 'Probability:' })],
      hints: [COUNT_HINTS[0], `Choose ${k} of the ${cat.m} ${cat.name} **and** ${h - k} of the other ${52 - cat.m} cards.`],
      solution: [
        `All ${h}-card hands: $${nC(52, h)} = ${nx(total)}$`,
        `Favourable: $${nC(cat.m, k)} \\times ${nC(52 - cat.m, h - k)} = ${nx(comb(cat.m, k))} \\times ${nx(comb(52 - cat.m, h - k))} = ${nx(favN)}$`,
        `$P = \\frac{${nx(favN)}}{${nx(total)}} \\approx ${fmt(p, 5)}$`,
        `The probability is about $${fmtFixed(p, 3)}$.`,
      ],
    };
  }
}

const probCounting = skill({
  id: 'm302-prob-counting',
  name: 'Probability using counting methods',
  description: 'Find probabilities by counting favourable and total outcomes with permutations and combinations.',
  outcomes: ['P1', 'P5', 'P6'],
  lessonId: 'm302-3-2',
  calculator: true,
  gen: (rng, d) => (d === 1 ? pcD1(rng) : d === 2 ? pcD2(rng) : pcD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 3.3 — Mutually exclusive events
// ---------------------------------------------------------------------------

interface Ev {
  name: string;
  ids: number[];
}

interface Space {
  setup: string;
  n: number;
  /** What one outcome is called ("number", "card"). */
  unit: string;
  events: Ev[];
  show: (ids: number[]) => string;
}

function dieSpace(rng: Rng): Space {
  const s = rng.pick([6, 8, 10, 12]);
  return {
    setup: `A fair ${s}-sided die numbered 1 to ${s} is rolled.`,
    n: s,
    unit: 'outcome',
    events: numEvents(rng, s).map((e) => ({ name: `rolling ${e.name}`, ids: range(1, s).filter(e.test) })),
    show: (ids) => ids.join(', '),
  };
}

function ticketSpace(rng: Rng): Space {
  const N = rng.pick([20, 24, 25, 30, 36, 40]);
  return {
    setup: `Tickets numbered 1 to ${N} are placed in a box at a fair in ${rng.pick(PLACES)}, and one ticket is drawn at random.`,
    n: N,
    unit: 'ticket',
    events: numEvents(rng, N).map((e) => ({ name: `drawing ${e.name}`, ids: range(1, N).filter(e.test) })),
    show: (ids) => ids.join(', '),
  };
}

function cardSpace(): Space {
  return {
    setup: `${DECK_TEXT} One card is drawn at random.`,
    n: 52,
    unit: 'card',
    events: CARD_EVENTS.map((e) => ({ name: `drawing ${e.name}`, ids: range(0, 51).filter((i) => e.test(CARDS[i])) })),
    show: (ids) => (ids.length <= 6 ? andList(ids.map((i) => `${CARDS[i].rank} of ${CARDS[i].suit}`)) : `${ids.length} cards`),
  };
}

const overlap = (a: Ev, b: Ev) => a.ids.filter((x) => b.ids.includes(x));
const sameEv = (a: Ev, b: Ev) => a.ids.length === b.ids.length && a.ids.every((x) => b.ids.includes(x));

/** Two different events from a space, disjoint or overlapping as asked (with neither inside the other). */
function eventPair(rng: Rng, sp: Space, disjoint: boolean): [Ev, Ev] | null {
  for (let i = 0; i < 80; i++) {
    const [a, b] = rng.sample(sp.events, 2);
    if (!a.ids.length || !b.ids.length || a.ids.length === sp.n || b.ids.length === sp.n || sameEv(a, b)) continue;
    const o = overlap(a, b).length;
    if (disjoint ? o === 0 : o > 0 && o < a.ids.length && o < b.ids.length) return [a, b];
  }
  return null;
}

function anySpace(rng: Rng): Space {
  return rng.pick([dieSpace, ticketSpace, cardSpace])(rng);
}

const ME_HINTS = [
  'Mutually exclusive events cannot happen at the same time: they share no outcomes.',
  '$P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$. For mutually exclusive events, $P(A \\text{ and } B) = 0$.',
];

function meD1(rng: Rng): GenOutput {
  const mode = rng.pick(['isME', 'add'] as const);
  for (;;) {
    const sp = anySpace(rng);
    const disjoint = mode === 'add' || rng.chance(0.5);
    const pair = eventPair(rng, sp, disjoint);
    if (!pair) continue;
    const [A, B] = pair;
    const o = overlap(A, B);
    if (mode === 'isME') {
      const opts = ['Yes: they are mutually exclusive, because they cannot happen at the same time.', 'No: they are not mutually exclusive, because they can happen at the same time.'];
      return {
        prompt: `${sp.setup} Are the events "${A.name}" and "${B.name}" mutually exclusive?`,
        parts: [part(fixedChoice(opts, disjoint ? 0 : 1))],
        hints: [ME_HINTS[0], 'Look for one outcome that belongs to both events.'],
        solution: [
          `${cap(A.name)}: ${sp.show(A.ids)}.`,
          `${cap(B.name)}: ${sp.show(B.ids)}.`,
          disjoint ? 'No outcome is in both events.' : `Both events happen with ${sp.show(o)}.`,
          disjoint ? 'The events are mutually exclusive.' : 'The events are not mutually exclusive.',
        ],
      };
    }
    const a = A.ids.length;
    const b = B.ids.length;
    return {
      prompt: `${sp.setup} What is the probability of ${A.name} or ${B.name}? Give your answer as a fraction.`,
      parts: [probPart(a + b, sp.n)],
      hints: ME_HINTS,
      solution: [
        `${cap(A.name)}: ${pl(a, sp.unit)} (${sp.show(A.ids)}), so $P(A) = ${fr(a, sp.n)}$.`,
        `${cap(B.name)}: ${pl(b, sp.unit)} (${sp.show(B.ids)}), so $P(B) = ${fr(b, sp.n)}$.`,
        `No outcome is in both, so the events are mutually exclusive: $P(A \\text{ or } B) = P(A) + P(B) = \\frac{${a}}{${sp.n}} + \\frac{${b}}{${sp.n}} = ${frEq(a + b, sp.n)}$`,
        `The probability is $${fr(a + b, sp.n)}$.`,
      ],
    };
  }
}

interface Survey {
  group: string;
  /** One member of the group. */
  one: string;
  /** Plural and singular verb phrases. */
  A: string;
  B: string;
  As: string;
  Bs: string;
  notBs: string;
  neither: string;
  la: string;
  lb: string;
}

const SURVEYS: Survey[] = [
  { group: 'students at a high school in PLACE', one: 'student', A: 'play on a school team', B: 'have a part-time job', As: 'plays on a school team', Bs: 'has a part-time job', notBs: 'does not have a part-time job', neither: 'neither plays on a school team nor has a part-time job', la: 'Team', lb: 'Job' },
  { group: 'households in PLACE', one: 'household', A: 'own a dog', B: 'own a cat', As: 'owns a dog', Bs: 'owns a cat', notBs: 'does not own a cat', neither: 'owns neither a dog nor a cat', la: 'Dog', lb: 'Cat' },
  { group: 'customers at a café in PLACE', one: 'customer', A: 'buy a hot drink', B: 'buy a baked good', As: 'buys a hot drink', Bs: 'buys a baked good', notBs: 'does not buy a baked good', neither: 'buys neither a hot drink nor a baked good', la: 'Drink', lb: 'Baked' },
  { group: 'Grade 12 students in PLACE', one: 'student', A: 'take Biology', B: 'take Chemistry', As: 'takes Biology', Bs: 'takes Chemistry', notBs: 'does not take Chemistry', neither: 'takes neither Biology nor Chemistry', la: 'Bio', lb: 'Chem' },
  { group: 'visitors to a library in PLACE', one: 'visitor', A: 'borrow a book', B: 'use a computer', As: 'borrows a book', Bs: 'uses a computer', notBs: 'does not use a computer', neither: 'neither borrows a book nor uses a computer', la: 'Book', lb: 'Computer' },
  { group: 'members of a fitness centre in PLACE', one: 'member', A: 'use the pool', B: 'take a yoga class', As: 'uses the pool', Bs: 'takes a yoga class', notBs: 'does not take a yoga class', neither: 'neither uses the pool nor takes a yoga class', la: 'Pool', lb: 'Yoga' },
];

function meD2(rng: Rng): GenOutput {
  const mode = rng.pick(['events', 'events', 'percent', 'venn'] as const);
  if (mode === 'events') {
    for (;;) {
      const sp = anySpace(rng);
      const pair = eventPair(rng, sp, rng.chance(0.2));
      if (!pair) continue;
      const [A, B] = pair;
      const o = overlap(A, B);
      const [a, b, c] = [A.ids.length, B.ids.length, o.length];
      return {
        prompt: `${sp.setup} What is the probability of ${A.name} or ${B.name}? Give your answer as a fraction.`,
        parts: [probPart(a + b - c, sp.n)],
        hints: ['First decide whether the events can happen together. If they can, the outcomes in both are counted twice when you add.', ME_HINTS[1]],
        solution: [
          `$P(A) = ${fr(a, sp.n)}$ (${sp.show(A.ids)}) and $P(B) = ${fr(b, sp.n)}$ (${sp.show(B.ids)}).`,
          c ? `Both events happen with ${sp.show(o)}, so $P(A \\text{ and } B) = ${fr(c, sp.n)}$: the events are not mutually exclusive.` : 'No outcome is in both, so the events are mutually exclusive.',
          c
            ? `$P(A \\text{ or } B) = \\frac{${a}}{${sp.n}} + \\frac{${b}}{${sp.n}} - \\frac{${c}}{${sp.n}} = ${frEq(a + b - c, sp.n)}$`
            : `$P(A \\text{ or } B) = \\frac{${a}}{${sp.n}} + \\frac{${b}}{${sp.n}} = ${frEq(a + b, sp.n)}$`,
          `The probability is $${fr(a + b - c, sp.n)}$.`,
        ],
      };
    }
  }
  const sv = rng.pick(SURVEYS);
  const group = sv.group.replace('PLACE', rng.pick(PLACES));
  if (mode === 'percent') {
    const pa = rng.int(20, 60);
    const pb = rng.int(15, 55);
    const pab = rng.int(5, Math.min(pa, pb) - 3);
    const u = pa + pb - pab;
    return {
      prompt: `In a survey of ${group}, ${pa}% ${sv.A}, ${pb}% ${sv.B}, and ${pab}% do both. What is the probability that a randomly chosen ${sv.one} from the survey ${sv.As} or ${sv.Bs}? Give your answer as a decimal.`,
      parts: [decPart(u / 100)],
      hints: ['The people who do both are included in both percents.', ME_HINTS[1]],
      solution: [
        `$P(A) = ${dec(pa / 100)}$, $P(B) = ${dec(pb / 100)}$, $P(A \\text{ and } B) = ${dec(pab / 100)}$`,
        `$P(A \\text{ or } B) = ${dec(pa / 100)} + ${dec(pb / 100)} - ${dec(pab / 100)} = ${dec(u / 100)}$`,
        `The probability is $${dec(u / 100)}$.`,
      ],
    };
  }
  const a = rng.int(5, 30);
  const ab = rng.int(2, 15);
  const b = rng.int(5, 30);
  const n = rng.int(3, 20);
  const total = a + ab + b + n;
  const ask = rng.pick(['or', 'neither', 'onlyA'] as const);
  const q = {
    or: { text: `${sv.As} or ${sv.Bs} (or both)`, favN: a + ab + b, step: `$${a} + ${ab} + ${b} = ${a + ab + b}$ are inside at least one circle.` },
    neither: { text: sv.neither, favN: n, step: `$${n}$ are outside both circles.` },
    onlyA: { text: `${sv.As} but ${sv.notBs}`, favN: a, step: `$${a}$ are in the ${sv.la} circle but outside the ${sv.lb} circle.` },
  }[ask];
  return {
    prompt: `The Venn diagram shows the results of a survey of ${total} ${group}. One ${sv.one} from the survey is chosen at random. What is the probability that the ${sv.one} ${q.text}? Give your answer as a fraction.`,
    figure: vennFigure({ sets: [sv.la, sv.lb], regions: { a: String(a), ab: String(ab), b: String(b), n: String(n) }, caption: `${sv.la}: ${sv.A}. ${sv.lb}: ${sv.B}.` }),
    parts: [probPart(q.favN, total)],
    hints: ['Add the numbers in the regions that match the description.', `Divide by the total number surveyed, ${total}.`],
    solution: [`Total: $${a} + ${ab} + ${b} + ${n} = ${total}$`, q.step, `$P = ${frEq(q.favN, total)}$`],
  };
}

interface DiceEvent {
  name: string;
  test: (x: number, y: number) => boolean;
}

function diceEvents(rng: Rng): DiceEvent[] {
  const s = rng.int(5, 9);
  const g = rng.int(7, 10);
  const k = rng.int(1, 6);
  return [
    { name: `the sum is ${s}`, test: (x, y) => x + y === s },
    { name: `the sum is greater than ${g}`, test: (x, y) => x + y > g },
    { name: 'doubles are rolled', test: (x, y) => x === y },
    { name: `at least one die shows a ${k}`, test: (x, y) => x === k || y === k },
    { name: 'the sum is even', test: (x, y) => (x + y) % 2 === 0 },
    { name: 'both dice show odd numbers', test: (x, y) => x % 2 === 1 && y % 2 === 1 },
  ];
}

const sumTable = (): TableFigure => ({ type: 'table', headers: ['Sum', '1', '2', '3', '4', '5', '6'], rows: range(1, 6).map((x) => [String(x), ...range(1, 6).map((y) => String(x + y))]) });

function meD3(rng: Rng): GenOutput {
  const mode = rng.pick(['find', 'dice', 'neither'] as const);
  const sv = rng.pick(SURVEYS);
  const group = sv.group.replace('PLACE', rng.pick(PLACES));
  if (mode === 'find') {
    const pa = rng.int(25, 65);
    const pb = rng.int(15, 55);
    const pab = rng.int(4, Math.min(pa, pb) - 3);
    const u = pa + pb - pab;
    return {
      prompt: `For ${group}, the probability that a ${sv.one} ${sv.As} is $${dec(pa / 100)}$, the probability that a ${sv.one} ${sv.Bs} is $${dec(pb / 100)}$, and the probability that a ${sv.one} ${sv.As} or ${sv.Bs} is $${dec(u / 100)}$. Give your answers as decimals.\n\n(a) What is the probability that a ${sv.one} does both?\n\n(b) What is the probability that a ${sv.one} ${sv.As} but ${sv.notBs}?`,
      parts: [decPart(pab / 100, '(a)'), decPart((pa - pab) / 100, '(b)')],
      hints: ['Rearrange $P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$ to find $P(A \\text{ and } B)$.', 'A Venn diagram helps: "A but not B" is the part of circle A outside circle B, so subtract the overlap from $P(A)$.'],
      solution: [
        `$P(A \\text{ and } B) = P(A) + P(B) - P(A \\text{ or } B) = ${dec(pa / 100)} + ${dec(pb / 100)} - ${dec(u / 100)} = ${dec(pab / 100)}$`,
        `$P(A \\text{ but not } B) = P(A) - P(A \\text{ and } B) = ${dec(pa / 100)} - ${dec(pab / 100)} = ${dec((pa - pab) / 100)}$`,
        `(a) $${dec(pab / 100)}$; (b) $${dec((pa - pab) / 100)}$`,
      ],
    };
  }
  if (mode === 'neither') {
    const pa = rng.int(20, 60);
    const pb = rng.int(15, 50);
    const pab = rng.int(3, Math.min(pa, pb) - 2);
    const u = pa + pb - pab;
    if (u >= 100) return meD3(rng.fork('again'));
    return {
      prompt: `In a survey of ${group}, ${pa}% ${sv.A}, ${pb}% ${sv.B}, and ${pab}% do both. What is the probability that a randomly chosen ${sv.one} from the survey ${sv.neither}? Give your answer as a decimal.`,
      parts: [decPart((100 - u) / 100)],
      hints: ['Find the probability of at least one first: $P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$.', '"Neither" is the complement of "A or B".'],
      solution: [
        `$P(A \\text{ or } B) = ${dec(pa / 100)} + ${dec(pb / 100)} - ${dec(pab / 100)} = ${dec(u / 100)}$`,
        `$P(\\text{neither}) = 1 - ${dec(u / 100)} = ${dec((100 - u) / 100)}$`,
        `The probability is $${dec((100 - u) / 100)}$.`,
      ],
    };
  }
  for (;;) {
    const [A, B] = rng.sample(diceEvents(rng), 2);
    const all = range(1, 6).flatMap((x) => range(1, 6).map((y) => [x, y] as [number, number]));
    const a = all.filter(([x, y]) => A.test(x, y)).length;
    const b = all.filter(([x, y]) => B.test(x, y)).length;
    const c = all.filter(([x, y]) => A.test(x, y) && B.test(x, y)).length;
    if (!a || !b || a === 36 || b === 36) continue;
    const favN = a + b - c;
    return {
      prompt: `Two fair six-sided dice are rolled. What is the probability that ${A.name} or ${B.name}? Give your answer as a fraction. The table shows the sum for each of the 36 equally likely outcomes (first die down the side, second die across the top).`,
      figure: sumTable(),
      parts: [probPart(favN, 36)],
      hints: ['Count the outcomes for each event in the table, and the outcomes where both happen.', ME_HINTS[1]],
      solution: [
        `${cap(A.name)}: ${a} outcomes. ${cap(B.name)}: ${b} outcomes.`,
        c ? `Both happen in ${c} outcome${c > 1 ? 's' : ''}, so the events are not mutually exclusive.` : 'They never happen together, so the events are mutually exclusive.',
        `$P(A \\text{ or } B) = \\frac{${a}}{36} + \\frac{${b}}{36}${c ? ` - \\frac{${c}}{36}` : ''} = ${frEq(favN, 36)}$`,
        `The probability is $${fr(favN, 36)}$.`,
      ],
    };
  }
}

const mutuallyExclusive = skill({
  id: 'm302-mutually-exclusive',
  name: 'Mutually exclusive events',
  description: 'Decide whether events are mutually exclusive and find P(A or B) = P(A) + P(B) − P(A and B), from lists, Venn diagrams and percents.',
  outcomes: ['P2'],
  lessonId: 'm302-3-3',
  calculator: true,
  gen: (rng, d) => (d === 1 ? meD1(rng) : d === 2 ? meD2(rng) : meD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 3.4 — Independent and dependent events
// ---------------------------------------------------------------------------

const IND_HINTS = [
  'Two events are independent when one happening does not change the probability of the other.',
  'For independent events, $P(A \\text{ and } B) = P(A) \\times P(B)$.',
];

function indD1(rng: Rng): GenOutput {
  const mode = rng.pick(['coinDie', 'dieSpinner', 'replace'] as const);
  if (mode === 'replace') {
    const cs = rng.sample(COLOURS, 2);
    const ns = cs.map(() => rng.int(2, 9));
    const n = sum(ns);
    const i = rng.int(0, 1);
    const j = rng.int(0, 1);
    const container = rng.pick(['bag', 'jar', 'box']);
    const favN = ns[i] * ns[j];
    return {
      prompt: `A ${container} holds ${ns[0]} ${cs[0]} and ${ns[1]} ${cs[1]} marbles. A marble is drawn at random, its colour is recorded, and it is **put back**. Then a second marble is drawn. What is the probability that the first marble is ${cs[i]} and the second is ${cs[j]}? Give your answer as a fraction.`,
      parts: [probPart(favN, n * n)],
      hints: ['The first marble is put back, so the second draw starts with the same marbles: the draws are independent.', IND_HINTS[1]],
      solution: [`$P(\\text{first ${cs[i]}}) = ${fr(ns[i], n)}$ and, after replacing it, $P(\\text{second ${cs[j]}}) = ${fr(ns[j], n)}$.`, `$P = \\frac{${ns[i]}}{${n}} \\times \\frac{${ns[j]}}{${n}} = ${frEq(favN, n * n)}$`, `The probability is $${fr(favN, n * n)}$.`],
    };
  }
  const evs = numEvents(rng, 6).map((e) => ({ name: e.name, ids: range(1, 6).filter(e.test) })).filter((e) => e.ids.length >= 1 && e.ids.length <= 5);
  const e = rng.pick(evs);
  const k = e.ids.length;
  if (mode === 'coinDie') {
    const side = rng.pick(['heads', 'tails']);
    return {
      prompt: `A fair coin is tossed and a fair six-sided die is rolled. What is the probability of getting ${side} and ${e.name}? Give your answer as a fraction.`,
      parts: [probPart(k, 12)],
      hints: IND_HINTS,
      solution: [`$P(\\text{${side}}) = \\frac{1}{2}$`, `$P(\\text{${e.name}}) = ${frEq(k, 6)}$ (${e.ids.join(', ')})`, `The coin does not affect the die, so multiply: $\\frac{1}{2} \\times \\frac{${k}}{6} = ${frEq(k, 12)}$`, `The probability is $${fr(k, 12)}$.`],
    };
  }
  const cs = rng.sample(COLOURS, 3);
  const ns = cs.map(() => rng.int(1, 4));
  const m = sum(ns);
  return {
    prompt: `A fair six-sided die is rolled, and a spinner with ${m} equal sections (${andList(cs.map((c, i) => `${ns[i]} ${c}`))}) is spun. What is the probability of rolling ${e.name} and landing on ${cs[0]}? Give your answer as a fraction.`,
    parts: [probPart(k * ns[0], 6 * m)],
    hints: IND_HINTS,
    solution: [`$P(\\text{${e.name}}) = ${frEq(k, 6)}$ (${e.ids.join(', ')})`, `$P(\\text{${cs[0]}}) = ${frEq(ns[0], m)}$`, `The die and the spinner are independent: $\\frac{${k}}{6} \\times \\frac{${ns[0]}}{${m}} = ${frEq(k * ns[0], 6 * m)}$`, `The probability is $${fr(k * ns[0], 6 * m)}$.`],
  };
}

interface Pair {
  a: string;
  b: string;
  /** "both ...", "A but not B", "neither ..." phrases. */
  both: string;
  aNotB: string;
  neither: string;
}

function indPair(rng: Rng): Pair & { pa: number; pb: number } {
  const [n1, n2] = rng.sample(NAMES, 2);
  const k = rng.int(0, 3);
  const pa = rng.pick([0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]);
  const pb = rng.pick([0.5, 0.55, 0.6, 0.7, 0.75, 0.8, 0.9]);
  const ctx: Pair[] = [
    { a: `${n1} makes a free throw`, b: `${n2} makes a free throw`, both: 'both make their free throws', aNotB: `${n1} makes the free throw and ${n2} misses`, neither: 'both miss' },
    { a: `${n1} hits the target in archery`, b: `${n2} hits the target`, both: 'both hit the target', aNotB: `${n1} hits and ${n2} misses`, neither: 'both miss' },
    { a: `a smoke alarm in a home in ${rng.pick(PLACES)} works when tested`, b: 'a second, separate smoke alarm works', both: 'both alarms work', aNotB: 'the first alarm works and the second does not', neither: 'neither alarm works' },
    { a: `${n1}'s tomato seed sprouts`, b: `${n2}'s pepper seed, planted in a different garden, sprouts`, both: 'both seeds sprout', aNotB: `${n1}'s seed sprouts and ${n2}'s does not`, neither: 'neither seed sprouts' },
  ];
  return { ...ctx[k], pa, pb };
}

function indD2(rng: Rng): GenOutput {
  const mode = rng.pick(['pair', 'pair', 'repeat'] as const);
  if (mode === 'pair') {
    const c = indPair(rng);
    const ask = rng.pick(['both', 'aNotB', 'neither'] as const);
    const [p, desc, step] =
      ask === 'both'
        ? [c.pa * c.pb, c.both, `$P = ${dec(c.pa)} \\times ${dec(c.pb)} = ${dec(c.pa * c.pb)}$`]
        : ask === 'aNotB'
          ? [c.pa * (1 - c.pb), c.aNotB, `$P = ${dec(c.pa)} \\times (1 - ${dec(c.pb)}) = ${dec(c.pa)} \\times ${dec(1 - c.pb)} = ${dec(c.pa * (1 - c.pb))}$`]
          : [(1 - c.pa) * (1 - c.pb), c.neither, `$P = (1 - ${dec(c.pa)})(1 - ${dec(c.pb)}) = ${dec(1 - c.pa)} \\times ${dec(1 - c.pb)} = ${dec((1 - c.pa) * (1 - c.pb))}$`];
    return {
      prompt: `The probability that ${c.a} is $${dec(c.pa)}$, and the probability that ${c.b} is $${dec(c.pb)}$. The two events are independent. What is the probability that ${desc}? Give your answer as a decimal.`,
      parts: [decPart(p)],
      hints: [IND_HINTS[1], 'The probability that an event does **not** happen is $1 - P(\\text{event})$.'],
      solution: [ask === 'both' ? 'Both events must happen.' : ask === 'aNotB' ? 'The first event happens and the second does not: $P(\\text{not } B) = 1 - P(B)$.' : 'Neither event happens: use $1 - P$ for each.', step, `The probability is $${dec(p)}$.`],
    };
  }
  const name = rng.pick(NAMES);
  const p = rng.pick([0.6, 0.7, 0.75, 0.8, 0.9]);
  const k = rng.int(2, 3);
  const missLast = rng.chance(0.4);
  const v = missLast ? p ** (k - 1) * (1 - p) : p ** k;
  const sport = rng.pick([
    { act: 'makes a free throw', made: 'makes', miss: 'misses', shots: 'free throws' },
    { act: 'scores on a penalty shot', made: 'scores', miss: 'misses', shots: 'penalty shots' },
    { act: 'hits the bullseye', made: 'hits', miss: 'misses', shots: 'darts' },
  ]);
  const desc = missLast ? `${sport.made} the first ${k - 1 === 1 ? 'one' : `${k - 1}`} and ${sport.miss} the last one` : `${sport.made} all ${k}`;
  const ans = decAnswer(v);
  if (ans.ask.startsWith('Round') && nearBoundary(v, 3)) return indD2(rng.fork('again'));
  return {
    prompt: `The probability that ${name} ${sport.act} is $${dec(p)}$ on each attempt, and attempts are independent. ${name} takes ${k} ${sport.shots}. What is the probability that ${name} ${desc}? ${ans.ask}`,
    parts: [ans.part],
    hints: [IND_HINTS[1], `A miss has probability $1 - ${dec(p)} = ${dec(1 - p)}$.`],
    solution: [missLast ? `$P = ${Array(k - 1).fill(dec(p)).join(' \\times ')} \\times ${dec(1 - p)}$` : `$P = ${Array(k).fill(dec(p)).join(' \\times ')} = ${dec(p)}^${k}$`, `$P = ${dec(v)}$`, `The probability is ${ans.shown === dec(v) ? '' : 'about '}$${ans.shown}$.`],
  };
}

function indD3(rng: Rng): GenOutput {
  const mode = rng.pick(['atLeast', 'missing', 'test'] as const);
  if (mode === 'atLeast') {
    for (;;) {
      const ctx = rng.pick([
        { what: 'seeds are planted', each: 'each seed sprouts', ev: 'at least one seed sprouts', fail: 'a seed does not sprout' },
        { what: 'smoke alarms are installed in a home', each: 'each alarm works', ev: 'at least one alarm works', fail: 'an alarm fails' },
        { what: 'free throws are taken by a player', each: 'the player makes each shot', ev: 'the player makes at least one', fail: 'a shot is missed' },
      ]);
      const n = rng.int(3, 5);
      const p = rng.pick([0.4, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]);
      const v = 1 - (1 - p) ** n;
      if (nearBoundary(v, 3) || v > 0.9995) continue;
      return {
        prompt: `${n} ${ctx.what}. The probability that ${ctx.each} is $${dec(p)}$, independently of the others. What is the probability that ${ctx.ev}? Round to the nearest thousandth.`,
        parts: [numPart(v, { decimals: 3, label: 'Probability:' })],
        hints: ['"At least one" is the complement of "none".', `$P(\\text{none}) = (1 - ${dec(p)})^{${n}}$ because the events are independent.`],
        solution: [`The probability that ${ctx.fail} is $1 - ${dec(p)} = ${dec(1 - p)}$.`, `$P(\\text{none}) = ${dec(1 - p)}^{${n}} ${Math.abs(roundTo((1 - p) ** n, 6) - (1 - p) ** n) < 1e-12 ? '=' : '\\approx'} ${fmt((1 - p) ** n, 6)}$`, `$P(\\text{at least one}) = 1 - ${fmt((1 - p) ** n, 6)} ${Math.abs(roundTo(v, 6) - v) < 1e-12 ? '=' : '\\approx'} ${fmt(v, 6)}$`, `The probability is about $${fmtFixed(v, 3)}$.`],
      };
    }
  }
  if (mode === 'missing') {
    const c = indPair(rng);
    const both = roundTo(c.pa * c.pb, 6);
    return {
      prompt: `The events "${c.a}" and "${c.b}" are independent. The probability of the first event is $${dec(c.pa)}$, and the probability that ${c.both} is $${dec(both)}$. What is the probability of the second event? Give your answer as a decimal.`,
      parts: [decPart(c.pb)],
      hints: [IND_HINTS[1], 'Substitute the known values and divide.'],
      solution: [`$P(A \\text{ and } B) = P(A) \\times P(B)$`, `$${dec(both)} = ${dec(c.pa)} \\times P(B)$`, `$P(B) = \\frac{${dec(both)}}{${dec(c.pa)}} = ${dec(c.pb)}$`],
    };
  }
  const sv = rng.pick(SURVEYS);
  const pa = rng.pick([0.2, 0.3, 0.4, 0.5, 0.6]);
  const pb = rng.pick([0.25, 0.3, 0.4, 0.5, 0.7]);
  const indep = rng.chance(0.5);
  const prod = roundTo(pa * pb, 6);
  let pab = prod;
  if (!indep) pab = roundTo(prod + rng.pick([-0.05, 0.05, 0.08, -0.04, 0.1]), 6);
  if (pab <= 0 || pab >= Math.min(pa, pb)) return indD3(rng.fork('again'));
  const opts = ['Yes: the events are independent.', 'No: the events are dependent.'];
  return {
    prompt: `For ${sv.group.replace('PLACE', rng.pick(PLACES))}, the probability that a ${sv.one} ${sv.As} is $${dec(pa)}$, the probability that a ${sv.one} ${sv.Bs} is $${dec(pb)}$, and the probability that a ${sv.one} does both is $${dec(pab)}$. Are the events "a ${sv.one} ${sv.As}" and "a ${sv.one} ${sv.Bs}" independent?`,
    parts: [part(fixedChoice(opts, indep ? 0 : 1))],
    hints: ['If the events are independent, then $P(A \\text{ and } B) = P(A) \\times P(B)$.', 'Multiply $P(A)$ by $P(B)$ and compare with the given $P(A \\text{ and } B)$.'],
    solution: [`$P(A) \\times P(B) = ${dec(pa)} \\times ${dec(pb)} = ${dec(prod)}$`, indep ? `This equals $P(A \\text{ and } B) = ${dec(pab)}$.` : `This is not equal to $P(A \\text{ and } B) = ${dec(pab)}$.`, indep ? 'The events are independent.' : 'The events are dependent.'],
  };
}

const independent = skill({
  id: 'm302-independent',
  name: 'Independent events',
  description: 'Find P(A and B) = P(A) × P(B) for independent events, including repeated trials and "at least one", and test events for independence.',
  outcomes: ['P3'],
  lessonId: 'm302-3-4',
  calculator: true,
  gen: (rng, d) => (d === 1 ? indD1(rng) : d === 2 ? indD2(rng) : indD3(rng)),
});

const DEP_HINTS = [
  'Without replacement, the second draw has one fewer item, and one fewer of the colour already drawn.',
  'For dependent events, $P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$.',
];

type XY = [number, number];

/** Distance from p to the segment ab. */
function segDist(p: XY, a: XY, b: XY): number {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

/**
 * A two-stage tree for two draws without replacement, with branch probabilities.
 * Labels are drawn beside invisible anchor dots, so branches are clipped to stay clear of each
 * node label, and every label is nudged until its anchor is clear of every branch.
 */
export function drawTree(c1: string, c2: string, r: number, b: number, leafText?: string[]): PlaneFigure {
  const n = r + b;
  const ppu = 34;
  const px = (v: number) => v / ppu;
  const L1 = [cap(c1), cap(c2)];
  const nodes: Array<{ at: XY; text: string }> = [
    { at: [0.7, 3], text: 'Start' },
    { at: [3.9, 4.6], text: L1[0] },
    { at: [3.9, 1.4], text: L1[1] },
    { at: [7.1, 5.5], text: L1[0] },
    { at: [7.1, 3.7], text: L1[1] },
    { at: [7.1, 2.3], text: L1[0] },
    { at: [7.1, 0.5], text: L1[1] },
  ];
  const edges: Array<[number, number, string]> = [
    [0, 1, `${r}/${n}`],
    [0, 2, `${b}/${n}`],
    [1, 3, `${r - 1}/${n - 1}`],
    [1, 4, `${b}/${n - 1}`],
    [2, 5, `${r}/${n - 1}`],
    [2, 6, `${b - 1}/${n - 1}`],
  ];
  const halfText = (t: string) => px(textWidth(t) / 2);
  // A branch leaves a label 5 px after its right edge and stops 16 px before the next label's left
  // edge, which keeps it clear of that label's anchor (8 px left of the text, 12 px below its centre).
  const segs: Array<[XY, XY]> = edges.map(([i, j]) => {
    const [A, B] = [nodes[i], nodes[j]];
    const x0 = A.at[0] + halfText(A.text) + px(5);
    const x1 = B.at[0] - halfText(B.text) - px(16);
    const yAt = (x: number) => A.at[1] + ((B.at[1] - A.at[1]) * (x - A.at[0])) / (B.at[0] - A.at[0]);
    return [
      [roundTo(x0, 3), roundTo(yAt(x0), 3)],
      [roundTo(x1, 3), roundTo(yAt(x1), 3)],
    ];
  });
  const anchorOf = (c: XY, t: string): XY => [c[0] - px(8 + textWidth(t) / 2), c[1] - px(12.3)];
  const clear = (c: XY, t: string) => segs.every(([a, z]) => segDist(anchorOf(c, t), a, z) > px(7));
  const points: PlanePoint[] = nodes.map((nd) => textAt(nd.at[0], nd.at[1], nd.text, ppu));
  // Branch labels sit beside the middle of each branch, moved further out until their anchors are clear.
  edges.forEach(([i, j, t]) => {
    const [a, z] = [nodes[i].at, nodes[j].at];
    const up = z[1] > a[1];
    const base: XY = [(a[0] + z[0]) / 2 - 0.1, (a[1] + z[1]) / 2 + (up ? 0.42 : -0.42)];
    let c = base;
    for (let k = 0; k <= 10 && !clear(c, t); k++) c = [base[0], base[1] + (up ? 1 : -1) * k * 0.04];
    points.push(textAt(c[0], c[1], t, ppu));
  });
  if (leafText) leafText.forEach((t, i) => points.push(textAt(9.1, nodes[3 + i].at[1], t, ppu)));
  const segments: PlaneSegment[] = segs.map(([a, z]) => ({ from: a, to: z, color: 'muted' }));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 6, step: 10 },
    hideTickLabels: true,
    hideAxes: true,
    segments,
    points,
    caption: 'Tree diagram for drawing two marbles without replacement: first draw, then second draw.',
  };
}

function depD1(rng: Rng): GenOutput {
  const mode = rng.pick(['marbles', 'marbles', 'cards'] as const);
  if (mode === 'cards') {
    const k = rng.pick([
      { a: CARD_EVENTS[7], b: CARD_EVENTS[7] },
      { a: CARD_EVENTS[0], b: CARD_EVENTS[0] },
      { a: CARD_EVENTS[6], b: CARD_EVENTS[8] },
      { a: CARD_EVENTS[5], b: CARD_EVENTS[5] },
      { a: CARD_EVENTS[0], b: CARD_EVENTS[1] },
    ]);
    const m1 = countCards(k.a.test);
    const same = k.a === k.b;
    const m2 = same ? m1 - 1 : countCards(k.b.test);
    const favN = m1 * m2;
    return {
      prompt: `${DECK_TEXT} Two cards are drawn one after the other, **without** replacement. What is the probability that ${same ? `both cards are ${k.a.plural}` : `the first card is ${k.a.name} and the second card is ${k.b.name}`}? Give your answer as a fraction.`,
      parts: [probPart(favN, 52 * 51)],
      hints: DEP_HINTS,
      solution: [
        `$P(\\text{first is ${k.a.name}}) = ${frEq(m1, 52)}$`,
        same ? `One ${k.a.name.replace(/^an? /, '')} is gone, so ${m2} of the 51 cards left are ${k.a.plural}: $P = \\frac{${m2}}{51}$` : `All ${m2} ${k.b.plural} are still among the 51 cards left: $P = \\frac{${m2}}{51}$`,
        `$P = \\frac{${m1}}{52} \\times \\frac{${m2}}{51} = ${frEq(favN, 52 * 51)}$`,
        `The probability is $${fr(favN, 52 * 51)}$.`,
      ],
    };
  }
  const [c1, c2] = rng.sample(COLOURS, 2);
  const r = rng.int(3, 9);
  const b = rng.int(3, 9);
  const n = r + b;
  const favN = r * (r - 1);
  const container = rng.pick(['bag', 'jar', 'box']);
  return {
    prompt: `A ${container} holds ${r} ${c1} and ${b} ${c2} marbles. Two marbles are drawn one after the other, **without** replacement. What is the probability that both are ${c1}? Give your answer as a fraction.`,
    parts: [probPart(favN, n * (n - 1))],
    hints: DEP_HINTS,
    solution: [`$P(\\text{first ${c1}}) = ${frEq(r, n)}$`, `After one ${c1} marble is removed, ${r - 1} of the ${n - 1} marbles left are ${c1}: $P(\\text{second ${c1}} \\mid \\text{first ${c1}}) = ${frEq(r - 1, n - 1)}$`, `$P = \\frac{${r}}{${n}} \\times \\frac{${r - 1}}{${n - 1}} = ${frEq(favN, n * (n - 1))}$`, `The probability is $${fr(favN, n * (n - 1))}$.`],
  };
}

interface TwoWay {
  intro: string;
  rows: [string, string];
  cols: [string, string];
  /** "is in Grade 12" style phrases for the rows and columns. */
  rowIs: [string, string];
  colIs: [string, string];
}

const TWO_WAYS: TwoWay[] = [
  { intro: 'students at a high school in PLACE were asked whether they have a part-time job', rows: ['Grade 11', 'Grade 12'], cols: ['Job', 'No job'], rowIs: ['is in Grade 11', 'is in Grade 12'], colIs: ['has a part-time job', 'does not have a part-time job'] },
  { intro: 'adults in PLACE were asked whether they got a flu shot and whether they caught the flu last winter', rows: ['Flu shot', 'No flu shot'], cols: ['Caught flu', 'No flu'], rowIs: ['got a flu shot', 'did not get a flu shot'], colIs: ['caught the flu', 'did not catch the flu'] },
  { intro: 'commuters in PLACE were asked how they travel to work and whether they were late at least once last month', rows: ['Transit', 'Car'], cols: ['Late', 'Not late'], rowIs: ['takes transit', 'drives a car'], colIs: ['was late at least once', 'was never late'] },
  { intro: 'Grade 12 students in PLACE were asked whether they plan to go to university and whether they take calculus', rows: ['Calculus', 'No calculus'], cols: ['University', 'No university'], rowIs: ['takes calculus', 'does not take calculus'], colIs: ['plans to go to university', 'does not plan to go to university'] },
];

function twoWayTable(t: TwoWay, cells: number[][]): TableFigure {
  const rt = cells.map((r) => sum(r));
  const ct = [0, 1].map((j) => cells[0][j] + cells[1][j]);
  return {
    type: 'table',
    headers: ['', t.cols[0], t.cols[1], 'Total'],
    rows: [
      [t.rows[0], String(cells[0][0]), String(cells[0][1]), String(rt[0])],
      [t.rows[1], String(cells[1][0]), String(cells[1][1]), String(rt[1])],
      ['Total', String(ct[0]), String(ct[1]), String(rt[0] + rt[1])],
    ],
  };
}

function depD2(rng: Rng): GenOutput {
  const mode = rng.pick(['table', 'table', 'rule', 'mixed'] as const);
  if (mode === 'table') {
    const t = rng.pick(TWO_WAYS);
    const cells = [
      [rng.int(8, 60), rng.int(8, 60)],
      [rng.int(8, 60), rng.int(8, 60)],
    ];
    const byRow = rng.chance(0.5);
    const i = rng.int(0, 1);
    const j = rng.int(0, 1);
    const cell = cells[i][j];
    const given = byRow ? cells[i][0] + cells[i][1] : cells[0][j] + cells[1][j];
    const [givenTxt, askTxt] = byRow ? [t.rowIs[i], t.colIs[j]] : [t.colIs[j], t.rowIs[i]];
    const total = sum(cells.flat());
    return {
      prompt: `In a survey, ${total} ${t.intro.replace('PLACE', rng.pick(PLACES))}. The results are in the table. A person from the survey is chosen at random. Given that the person ${givenTxt}, what is the probability that the person ${askTxt}? Give your answer as a fraction.`,
      figure: twoWayTable(t, cells),
      parts: [probPart(cell, given)],
      hints: ['"Given that" shrinks the sample space to one row or column of the table.', `Use only the people who ${givenTxt}: $P(B \\mid A) = \\frac{n(A \\text{ and } B)}{n(A)}$.`],
      solution: [
        `"Given that the person ${givenTxt}" means using only the "${byRow ? t.rows[i] : t.cols[j]}" ${byRow ? 'row' : 'column'}: its total is ${given}.`,
        `In that ${byRow ? 'row' : 'column'}, ${cell} are in the "${byRow ? t.cols[j] : t.rows[i]}" ${byRow ? 'column' : 'row'}.`,
        `$P = ${frEq(cell, given)}$`,
      ],
    };
  }
  if (mode === 'rule') {
    const ctx = rng.pick([
      { a: 'take the bus to school', b: 'live more than 5 km from school', both: 'takes the bus and lives more than 5 km from school', whoA: 'bus riders', group: 'students at a high school in PLACE', one: 'student' },
      { a: 'use a loyalty card', b: 'buy a coffee', both: 'uses a loyalty card and buys a coffee', whoA: 'loyalty-card users', group: 'customers at a grocery store in PLACE', one: 'customer' },
      { a: 'own a pet', b: 'own a dog', both: 'owns a pet and owns a dog', whoA: 'pet-owning households', group: 'households in PLACE', one: 'household' },
      { a: 'play a team sport', b: 'play hockey', both: 'plays a team sport and plays hockey', whoA: 'team-sport players', group: 'students at a junior high in PLACE', one: 'student' },
    ]);
    const pa = rng.int(30, 80);
    const pba = rng.int(15, 70);
    const v = (pa * pba) / 10000;
    return {
      prompt: `Of the ${ctx.group.replace('PLACE', rng.pick(PLACES))}, ${pa}% ${ctx.a}. Of the ${ctx.whoA}, ${pba}% ${ctx.b}. What is the probability that a randomly chosen ${ctx.one} ${ctx.both.replace(' and ', ' **and** ')}? Give your answer as a decimal.`,
      parts: [decPart(v)],
      hints: ['The second percent is a conditional probability: it applies only to the people in the first group.', DEP_HINTS[1]],
      solution: [`$P(A) = ${dec(pa / 100)}$ and $P(B \\mid A) = ${dec(pba / 100)}$`, `$P(A \\text{ and } B) = ${dec(pa / 100)} \\times ${dec(pba / 100)} = ${dec(v)}$`, `The probability is $${dec(v)}$.`],
    };
  }
  const [c1, c2] = rng.sample(COLOURS, 2);
  const r = rng.int(3, 9);
  const b = rng.int(3, 9);
  const n = r + b;
  const favN = r * b;
  return {
    prompt: `A bag holds ${r} ${c1} and ${b} ${c2} marbles. Two marbles are drawn one after the other, **without** replacement. What is the probability that the first is ${c1} and the second is ${c2}? Give your answer as a fraction.`,
    parts: [probPart(favN, n * (n - 1))],
    hints: DEP_HINTS,
    solution: [`$P(\\text{first ${c1}}) = ${frEq(r, n)}$`, `All ${b} ${c2} marbles are still in the bag, out of ${n - 1}: $P(\\text{second ${c2}} \\mid \\text{first ${c1}}) = \\frac{${b}}{${n - 1}}$`, `$P = \\frac{${r}}{${n}} \\times \\frac{${b}}{${n - 1}} = ${frEq(favN, n * (n - 1))}$`, `The probability is $${fr(favN, n * (n - 1))}$.`],
  };
}

function depD3(rng: Rng): GenOutput {
  const mode = rng.pick(['cond', 'oneEach', 'three', 'tableIndep'] as const);
  if (mode === 'cond') {
    const ctx = rng.pick([
      { a: 'takes Chemistry', b: 'also takes Physics', both: 'takes both Chemistry and Physics', group: 'Grade 12 students in PLACE', one: 'student' },
      { a: 'orders a pizza', b: 'also orders a drink', both: 'orders a pizza and a drink', group: 'customers at a restaurant in PLACE', one: 'customer' },
      { a: 'plays volleyball', b: 'also plays basketball', both: 'plays both volleyball and basketball', group: 'students at a school in PLACE', one: 'student' },
      { a: 'owns a truck', b: 'also owns a snowmobile', both: 'owns a truck and a snowmobile', group: 'households in PLACE', one: 'household' },
    ]);
    for (;;) {
      const pa = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8]);
      const pba = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8]);
      const pab = roundTo(pa * pba, 6);
      if (String(pab).length > 6) continue;
      return {
        prompt: `For ${ctx.group.replace('PLACE', rng.pick(PLACES))}, the probability that a ${ctx.one} ${ctx.a} is $${dec(pa)}$, and the probability that a ${ctx.one} ${ctx.both} is $${dec(pab)}$. Given that a ${ctx.one} ${ctx.a}, what is the probability that the ${ctx.one} ${ctx.b}? Give your answer as a decimal.`,
        parts: [decPart(pba)],
        hints: ['Use $P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$.', 'Rearrange: $P(B \\mid A) = \\frac{P(A \\text{ and } B)}{P(A)}$.'],
        solution: [`$P(B \\mid A) = \\frac{P(A \\text{ and } B)}{P(A)}$`, `$P(B \\mid A) = \\frac{${dec(pab)}}{${dec(pa)}} = ${dec(pba)}$`, `The probability is $${dec(pba)}$.`],
      };
    }
  }
  if (mode === 'oneEach' || mode === 'three') {
    const [c1, c2] = rng.sample(COLOURS, 2);
    const r = rng.int(3, 8);
    const b = rng.int(3, 8);
    const n = r + b;
    if (mode === 'oneEach') {
      const favN = 2 * r * b;
      return {
        prompt: `A bag holds ${r} ${c1} and ${b} ${c2} marbles. Two marbles are drawn without replacement. What is the probability of getting one marble of each colour? Give your answer as a fraction.`,
        figure: drawTree(c1, c2, r, b),
        parts: [probPart(favN, n * (n - 1))],
        hints: ['There are two ways to get one of each colour: ' + `${c1} then ${c2}, or ${c2} then ${c1}.`, 'Multiply along each branch of the tree, then add the two branches.'],
        solution: [
          `${cap(c1)} then ${c2}: $\\frac{${r}}{${n}} \\times \\frac{${b}}{${n - 1}} = \\frac{${r * b}}{${n * (n - 1)}}$`,
          `${cap(c2)} then ${c1}: $\\frac{${b}}{${n}} \\times \\frac{${r}}{${n - 1}} = \\frac{${r * b}}{${n * (n - 1)}}$`,
          `These two outcomes are mutually exclusive, so add: $P = \\frac{${2 * r * b}}{${n * (n - 1)}} = ${fr(favN, n * (n - 1))}$`,
          `The probability is $${fr(favN, n * (n - 1))}$.`,
        ],
      };
    }
    const favN = r * (r - 1) * (r - 2);
    const tot = n * (n - 1) * (n - 2);
    return {
      prompt: `A bag holds ${r} ${c1} and ${b} ${c2} marbles. Three marbles are drawn one after the other, without replacement. What is the probability that all three are ${c1}? Give your answer as a fraction.`,
      parts: [probPart(favN, tot)],
      hints: DEP_HINTS,
      solution: [`$P = \\frac{${r}}{${n}} \\times \\frac{${r - 1}}{${n - 1}} \\times \\frac{${r - 2}}{${n - 2}}$`, `$P = \\frac{${favN}}{${tot}} = ${fr(favN, tot)}$`, `The probability is $${fr(favN, tot)}$. (Check with combinations: $\\frac{${nC(r, 3)}}{${nC(n, 3)}} = \\frac{${comb(r, 3)}}{${comb(n, 3)}}$, the same value.)`],
    };
  }
  // Independent or dependent, from a two-way table.
  const t = rng.pick(TWO_WAYS);
  const indep = rng.chance(0.5);
  let cells: number[][];
  for (;;) {
    const r0 = rng.int(4, 12) * 5;
    const r1 = rng.int(4, 12) * 5;
    const p = rng.pick([0.2, 0.4, 0.6, 0.8]);
    cells = [
      [r0 * p, r0 * (1 - p)],
      [r1 * p, r1 * (1 - p)],
    ].map((row) => row.map((x) => Math.round(x)));
    if (!indep) {
      const d = rng.pick([-4, -3, 3, 4, 5]);
      cells[0][0] += d;
      cells[0][1] -= d;
    }
    if (cells.flat().every((x) => x >= 3) && r0 !== r1) break;
  }
  const r0t = cells[0][0] + cells[0][1];
  const c0t = cells[0][0] + cells[1][0];
  const total = sum(cells.flat());
  const pGiven = cells[0][0] / r0t;
  const pAll = c0t / total;
  const opts = ['Independent: the probability is the same whether or not the given event happens.', 'Dependent: knowing one event changes the probability of the other.'];
  return {
    prompt: `In a survey, ${total} ${t.intro.replace('PLACE', rng.pick(PLACES))}. The results are in the table. Are the events "a person ${t.rowIs[0]}" and "a person ${t.colIs[0]}" independent?`,
    figure: twoWayTable(t, cells),
    parts: [part(fixedChoice(opts, indep ? 0 : 1))],
    hints: ['Compare $P(B \\mid A)$ with $P(B)$. If they are equal, the events are independent.', `Find the probability that a person ${t.colIs[0]} among everyone, and among only those who ${t.rowIs[0]}.`],
    solution: [
      `Among those who ${t.rowIs[0]}: $P = \\frac{${cells[0][0]}}{${r0t}} ${Math.abs(pGiven - roundTo(pGiven, 3)) < 1e-9 ? '=' : '\\approx'} ${fmt(pGiven, 3)}$`,
      `Among everyone: $P = \\frac{${c0t}}{${total}} ${Math.abs(pAll - roundTo(pAll, 3)) < 1e-9 ? '=' : '\\approx'} ${fmt(pAll, 3)}$`,
      indep ? 'The probabilities are equal, so the events are independent.' : 'The probabilities are different, so the events are dependent.',
    ],
  };
}

const dependent = skill({
  id: 'm302-dependent',
  name: 'Dependent events and conditional probability',
  description: 'Find probabilities of dependent events without replacement and conditional probabilities from two-way tables, using P(A and B) = P(A) × P(B | A).',
  outcomes: ['P3'],
  lessonId: 'm302-3-4',
  calculator: true,
  gen: (rng, d) => (d === 1 ? depD1(rng) : d === 2 ? depD2(rng) : depD3(rng)),
});

export const PROBABILITY_SKILLS: SkillDef[] = [odds, probCounting, mutuallyExclusive, independent, dependent];
