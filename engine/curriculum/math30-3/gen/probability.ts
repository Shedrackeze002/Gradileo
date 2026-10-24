/** Math 30-3 Unit 7 — Probability (P1). Every rule and rate is stated in the question. */
import { fixedChoice, mc, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, frac, fracLatex, fracText, gcd, roundTo, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';
import { NAMES, type Out, about, group, numT, onEdge, poss } from './statistics.ts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tex = (f: Frac) => fracLatex(f, { dfrac: true });
/** "\dfrac{6}{40} = \dfrac{3}{20}", or just "\dfrac{3}{20}" when already in lowest terms. */
function reduce(n: number, d: number): string {
  const f = frac(n, d);
  return f.d === d ? `\\dfrac{${n}}{${d}}` : `\\dfrac{${n}}{${d}} = ${tex(f)}`;
}
/** A probability typed as a fraction (any equivalent fraction or exact decimal is accepted). */
function fracPart(f: Frac, label = 'Probability:'): Part {
  return { label, answer: { kind: 'numeric', value: f.n / f.d, allowExpression: true, display: 'fraction', exact: fracText(f) } };
}
const pctPart = (v: number, label = 'Percent:', dp?: number): Part => numPart(v, { decimals: dp, suffix: '%', label, display: 'decimal' });
const decPart = (v: number, label = 'Decimal:', dp?: number): Part => numPart(v, { decimals: dp, label, display: 'decimal' });
/** Odds a : b in lowest terms, typed as two whole numbers. */
const oddsParts = (a: number, b: number, what: string): Part[] => [
  numPart(a, { label: `${what}, first number:` }),
  numPart(b, { label: `${what}, second number:` }),
];
const lowest = (a: number, b: number): [number, number] => {
  const g = gcd(a, b);
  return [a / g, b / g];
};
const odds = (a: number, b: number) => `${a} : ${b}`;
const oddsTex = (a: number, b: number) => `${a} : ${b}`;
const pctText = (v: number, dp = 1) => `${about(v, dp)}${isExact(v, 2) ? fmt(v, 2) : fmtFixed(v, dp)}%`;
const isExact = (v: number, dp: number) => Math.abs(roundTo(v, dp) - v) < 1e-9;
/** "= 12.5" or "\approx 12.3" for a percent in maths. */
const pctEq = (v: number, dp = 1) => (isExact(v, 2) ? `= ${fmt(v, 2)}\\%` : `\\approx ${fmtFixed(v, dp)}\\%`);
const towns = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills'];

// ---------------------------------------------------------------------------
// 7.1 Probability and odds — m303-probability-odds
// ---------------------------------------------------------------------------

/** Totals that give exact decimals and percents. */
const NICE_N = [20, 25, 40, 50, 80, 100, 125, 200, 250, 400, 500];

interface CountCtx {
  /** Situation with n items, k of which are favourable. */
  setup: (name: string, n: number, k: number) => string;
  /** The favourable event, as a phrase: "the bolt is defective". */
  event: (name: string) => string;
  ns: number[];
  kMax: (n: number) => number;
}

const COUNTS: CountCtx[] = [
  {
    setup: (_name, n, k) => `A box of ${n} spark plugs delivered to a repair shop contains ${k} defective plugs. A mechanic takes one plug from the box at random.`,
    event: () => 'the plug is defective',
    ns: [20, 25, 40, 50, 80, 100], kMax: (n) => Math.max(2, Math.floor(n / 5)),
  },
  {
    setup: (name, n, k) => `The 4-H beef club in town sold ${numT(n)} raffle tickets for a side of beef. ${name} bought ${k} of them. One ticket is drawn at random.`,
    event: (name) => `${name} wins`,
    ns: [100, 125, 200, 250, 400, 500], kMax: () => 10,
  },
  {
    setup: (_name, n, k) => `A bin at a hardware store holds ${n} bolts that look alike. ${k} of them are 3/8-inch bolts and the rest are 1/2-inch bolts. An apprentice grabs one without looking.`,
    event: () => 'it is a 3/8-inch bolt',
    ns: [20, 25, 40, 50, 80], kMax: (n) => n - 3,
  },
  {
    setup: (_name, n, k) => `There are ${n} workers on the day shift at a gas plant in the foothills, and ${k} of them are apprentices. One worker’s name is drawn at random for a new safety jacket.`,
    event: () => 'the winner is an apprentice',
    ns: [20, 25, 40, 50, 80], kMax: (n) => Math.floor(n / 2),
  },
  {
    setup: (_name, n, k) => `A shipment of ${n} hard hats arrives at a construction site. ${k} of the hard hats are cracked. The foreman picks one hard hat at random to check.`,
    event: () => 'the hard hat is cracked',
    ns: [20, 25, 40, 50, 80, 100], kMax: (n) => Math.max(2, Math.floor(n / 5)),
  },
  {
    setup: (name, n, k) => `At a fall fair, a duck pond game has ${n} rubber ducks, and ${k} of them have a prize sticker underneath. ${name} picks one duck without looking.`,
    event: (name) => `${name} wins a prize`,
    ns: [20, 25, 40, 50], kMax: (n) => Math.floor(n / 2),
  },
];

function countSetup(rng: Rng) {
  const c = rng.pick(COUNTS);
  const name = rng.pick(NAMES);
  const n = rng.pick(c.ns);
  const k = rng.int(1, c.kMax(n));
  return { c, name, n, k };
}

function fracDecPct(rng: Rng): Out {
  const { c, name, n, k } = retry(() => countSetup(rng), (x) => x.k !== x.n / 2 && NICE_N.includes(x.n));
  const f = frac(k, n);
  const p = (100 * k) / n;
  const ev = c.event(name);
  return {
    prompt: `${c.setup(name, n, k)} What is the probability that ${ev}? Write it as a fraction in lowest terms, as a decimal, and as a percent.`,
    parts: [fracPart(f, 'Fraction:'), decPart(k / n), pctPart(p)],
    hints: [
      'Probability = (number of favourable outcomes) ÷ (total number of outcomes).',
      `Write $\\dfrac{${k}}{${n}}$ in lowest terms, divide $${k} \\div ${n}$ for the decimal, then multiply the decimal by 100 for the percent.`,
    ],
    solution: [
      `Favourable outcomes: ${k}. Total outcomes: ${numT(n)}.`,
      `Fraction: $P = ${reduce(k, n)}$`,
      `Decimal: $${k} \\div ${n} = ${fmt(k / n, 6)}$`,
      `Percent: $${fmt(k / n, 6)} \\times 100 = ${fmt(p, 4)}\\%$`,
      `The probability that ${ev} is $${tex(f)}$, or ${fmt(k / n, 6)}, or ${fmt(p, 4)}%.`,
    ],
  };
}

function oddsFromCounts(rng: Rng): Out {
  const { c, name, n, k } = retry(() => countSetup(rng), (x) => {
    const [a, b] = lowest(x.k, x.n - x.k);
    return x.k !== x.n - x.k && b !== x.n && a !== b;
  });
  const against = rng.chance(0.4);
  const [a, b] = lowest(k, n - k);
  const [fa, fb] = against ? [b, a] : [a, b];
  const ev = c.event(name);
  const kn = lowest(k, n);
  const choices = [odds(fa, fb), odds(fb, fa), against ? odds(kn[1] - kn[0], kn[1]) : odds(kn[0], kn[1]), against ? odds(n - k, n) : odds(k, n)];
  return {
    prompt: `${c.setup(name, n, k)} What are the odds ${against ? 'against' : 'in favour of'} the event “${ev}”?`,
    parts: [part(mc(rng, choices[0], choices.slice(1)), { label: `Odds ${against ? 'against' : 'in favour'}:` })],
    hints: [
      'Odds compare outcomes with each other, not with the total: odds in favour = favourable : unfavourable.',
      `Favourable: ${k}. Unfavourable: $${n} - ${k} = ${n - k}$. Odds against put the unfavourable number first.`,
    ],
    solution: [
      `Favourable outcomes: ${k}. Unfavourable outcomes: $${n} - ${k} = ${n - k}$.`,
      against
        ? `Odds against $=$ unfavourable : favourable $= ${oddsTex(n - k, k)}$${gcd(k, n - k) > 1 ? `, which simplifies to $${oddsTex(fa, fb)}$ (divide both by ${gcd(k, n - k)})` : ''}.`
        : `Odds in favour $=$ favourable : unfavourable $= ${oddsTex(k, n - k)}$${gcd(k, n - k) > 1 ? `, which simplifies to $${oddsTex(fa, fb)}$ (divide both by ${gcd(k, n - k)})` : ''}.`,
      `(The ratio $${oddsTex(k, n)}$ compares favourable outcomes with the total, so it is the probability $${reduce(k, n)}$, not the odds.)`,
      `The odds ${against ? 'against' : 'in favour of'} the event are ${odds(fa, fb)}.`,
    ],
  };
}

interface ExpCtx { text: (name: string, p: string, n: string) => string; ask: (name: string) => string; unit: string; ps: number[]; ns: number[] }
const EXPECT: ExpCtx[] = [
  {
    text: (name, p, n) => `From past records, ${p} of the welds made by apprentices at a fabrication shop need to be redone. ${name} will make ${n} welds this month.`,
    ask: () => 'How many of the welds would you expect to need redoing?', unit: 'welds', ps: [2, 4, 5, 6, 8, 10, 12], ns: [50, 150, 200, 250, 300],
  },
  {
    text: (_name, p, n) => `A seed company’s tests show that ${p} of its canola seeds germinate (for this question). A farmer plants a test strip of ${n} seeds.`,
    ask: () => 'How many seeds would you expect to germinate?', unit: 'seeds', ps: [85, 88, 90, 92, 94, 95, 96], ns: [500, 1000, 1500, 2000, 2500],
  },
  {
    text: (_name, p, n) => `A hardware store finds that ${p} of customers who buy a snow blower also buy an extended warranty. The store expects to sell ${n} snow blowers this winter.`,
    ask: () => 'How many warranties should the store expect to sell?', unit: 'warranties', ps: [15, 20, 24, 25, 30, 35, 40], ns: [40, 60, 80, 120, 140],
  },
  {
    text: (_name, p, n) => `At an oil change shop, ${p} of the vehicles that come in also need a new air filter. The shop expects ${n} vehicles next month.`,
    ask: () => 'How many air filters should the shop expect to sell?', unit: 'air filters', ps: [20, 25, 30, 35, 40, 45], ns: [120, 160, 200, 240, 260, 300],
  },
  {
    text: (name, p, n) => `${name} plays on a high-school basketball team and makes ${p} of free throws. Suppose ${name} takes ${n} free throws this season.`,
    ask: (name) => `How many free throws would you expect ${name} to make?`, unit: 'free throws', ps: [60, 65, 70, 75, 80, 85], ns: [40, 60, 80, 100, 120],
  },
];

function expectedCount(rng: Rng): Out {
  const e = rng.pick(EXPECT);
  const name = rng.pick(NAMES);
  const { p, n } = retry(() => ({ p: rng.pick(e.ps), n: rng.pick(e.ns) }), (x) => Number.isInteger((x.p * x.n) / 100));
  const E = (p * n) / 100;
  return {
    prompt: `${e.text(name, `${p}%`, numT(n))} ${e.ask(name)}`,
    parts: [numPart(E, { label: 'Expected:', suffix: e.unit })],
    hints: ['Expected number = probability × number of trials.', `Write ${p}% as the decimal $${fmt(p / 100, 4)}$ and multiply by ${numT(n)}.`],
    solution: [
      `Probability as a decimal: $${p}\\% = ${fmt(p / 100, 4)}$`,
      `Expected number: $${fmt(p / 100, 4)} \\times ${group(String(n), '{,}')} = ${group(String(E), '{,}')}$`,
      `You would expect about ${numT(E)} ${e.unit}. (The actual number will vary a little.)`,
    ],
  };
}

interface ProbCtx { text: (p: number, town: string) => string; event: string; ps: number[] }
const PROBS: ProbCtx[] = [
  { text: (p, town) => `The forecast for ${town} gives a ${p}% probability of precipitation (rain or snow) tomorrow.`, event: 'precipitation tomorrow', ps: [10, 20, 30, 40, 60, 70, 80, 90] },
  { text: (p) => `A tire maker’s road tests show that ${p}% of its all-season tires last more than 80,000 km.`, event: 'a tire lasting more than 80,000 km', ps: [75, 80, 85, 88, 92, 95, 96] },
  { text: (p) => `A courier company in the city delivers ${p}% of its parcels on time.`, event: 'a parcel arriving on time', ps: [85, 88, 90, 92, 94, 95, 96] },
  { text: (p) => `Records at a calving barn on a cattle ranch show that ${p}% of calvings need help from the rancher.`, event: 'a calving needing help', ps: [5, 8, 10, 12, 15, 20, 25] },
  { text: (p) => `A pipeline company’s inspections show that ${p}% of the welds on a project pass the X-ray test the first time.`, event: 'a weld passing the first time', ps: [65, 70, 75, 80, 85, 90, 95] },
];

function probToOdds(rng: Rng): Out {
  const c = rng.pick(PROBS);
  const p = rng.pick(c.ps);
  const town = rng.pick(towns);
  const against = rng.chance(0.5);
  const [a, b] = lowest(p, 100 - p);
  const [x, y] = against ? [b, a] : [a, b];
  const g = gcd(p, 100 - p);
  return {
    prompt: `${c.text(p, town)} What are the odds ${against ? 'against' : 'in favour of'} ${c.event}? Write the odds as a ratio $a : b$ of whole numbers in lowest terms.`,
    parts: oddsParts(x, y, `Odds ${against ? 'against' : 'in favour'}`),
    hints: [
      `Out of every 100 cases, ${p} are favourable and ${100 - p} are not.`,
      `Odds in favour = favourable : unfavourable; odds against = unfavourable : favourable. Divide both numbers by their greatest common factor.`,
    ],
    solution: [
      `A probability of ${p}% means ${p} favourable outcomes out of 100, so $100 - ${p} = ${100 - p}$ are unfavourable.`,
      against ? `Odds against $= ${oddsTex(100 - p, p)}$` : `Odds in favour $= ${oddsTex(p, 100 - p)}$`,
      `Divide both by ${g}: $${oddsTex(x, y)}$`,
      `The odds ${against ? 'against' : 'in favour of'} ${c.event} are ${odds(x, y)}.`,
    ],
  };
}

interface OddsCtx { text: (name: string, o: string) => string; event: (name: string) => string; inFavour: boolean; bigFirst?: boolean }
const ODDS: OddsCtx[] = [
  { text: (name, o) => `${name} rides in the bull riding at a summer rodeo. A commentator gives the odds in favour of ${name} making the 8-second whistle as ${o}.`, event: (name) => `${name} makes the whistle`, inFavour: true },
  { text: (name, o) => `${poss(name)} curling team from a northern town entered a bonspiel. The odds against the team winning the bonspiel are ${o}.`, event: () => 'the team wins the bonspiel', inFavour: false, bigFirst: true },
  { text: (_n, o) => `A seed supplier says that the odds in favour of one of its wheat seeds germinating are ${o}.`, event: () => 'a seed germinates', inFavour: true, bigFirst: true },
  { text: (_n, o) => `At a chuckwagon race at a summer fair, the odds against the team in the red wagon winning are ${o}.`, event: () => 'the red wagon wins', inFavour: false, bigFirst: true },
  { text: (name, o) => `${name} is waiting for a part for a tractor repair on the farm. The dealer says the odds against the part arriving by Friday are ${o}.`, event: () => 'the part arrives by Friday', inFavour: false },
  { text: (name, o) => `${name} plays goal for a junior hockey team. Based on this season, the odds in favour of ${name} stopping a penalty shot are ${o}.`, event: (name) => `${name} stops the shot`, inFavour: true },
];

function oddsToProb(rng: Rng): Out {
  const c = rng.pick(ODDS);
  const name = rng.pick(NAMES);
  const { a, b } = retry(
    () => (c.bigFirst ? { a: rng.int(2, 19), b: rng.int(1, 4) } : { a: rng.int(1, 9), b: rng.int(1, 9) }),
    (x) => gcd(x.a, x.b) === 1 && x.a !== x.b && (!c.bigFirst || x.a > x.b) && !onEdge((100 * (c.inFavour ? x.a : x.b)) / (x.a + x.b), 1),
    200,
  );
  // Odds as stated in the question: a : b.
  const fav = c.inFavour ? a : b;
  const tot = a + b;
  const f = frac(fav, tot);
  const p = (100 * fav) / tot;
  const ev = c.event(name);
  return {
    prompt: `${c.text(name, odds(a, b))} What is the probability that ${ev}? Give it as a fraction in lowest terms and as a percent${isExact(p, 2) ? '' : ' to the nearest tenth'}.`,
    parts: [fracPart(f, 'Fraction:'), pctPart(p, 'Percent:', isExact(p, 2) ? undefined : 1)],
    hints: [
      c.inFavour ? `Odds in favour of ${odds(a, b)} mean ${a} favourable ${a === 1 ? 'outcome' : 'outcomes'} for every ${b} unfavourable ${b === 1 ? 'one' : 'ones'}.` : `Odds against of ${odds(a, b)} mean ${a} unfavourable ${a === 1 ? 'outcome' : 'outcomes'} for every ${b} favourable ${b === 1 ? 'one' : 'ones'}.`,
      `The total is $${a} + ${b} = ${tot}$. Probability = favourable ÷ total.`,
    ],
    solution: [
      c.inFavour ? `Favourable: ${a}. Unfavourable: ${b}.` : `Unfavourable: ${a}. Favourable: ${b}.`,
      `Total outcomes: $${a} + ${b} = ${tot}$`,
      `$P = ${tex(f)}$`,
      `As a percent: $${fav} \\div ${tot} \\times 100 ${pctEq(p)}$`,
      `The probability that ${ev} is $${tex(f)}$, ${pctText(p)}.`,
    ],
  };
}

interface Claim { claim: (name: string) => string; correct: string; wrong: string[]; why: string }
const CLAIMS: Claim[] = [
  {
    claim: (name) => `At a county fair, a coin has landed heads 6 times in a row. ${name} says tails is now more likely than heads on the next flip.`,
    correct: 'The claim is false: each flip is independent, so the probability of tails is still $\\dfrac{1}{2}$.',
    wrong: ['The claim is true: after 6 heads in a row, tails is due.', 'The claim is false: heads is now more likely, because the coin is on a streak.', 'The claim is true: the probability of tails is now $\\dfrac{6}{7}$.'],
    why: 'The coin has no memory. Each flip is independent of the flips before it, so the probability of tails is $\\dfrac{1}{2}$ every time.',
  },
  {
    claim: (name) => `A raffle poster at the community hall says “1 chance in 500 to win.” ${name} says this means the odds in favour of winning are 1 : 500.`,
    correct: 'The claim is false: a probability of $\\dfrac{1}{500}$ means 1 winning ticket and 499 losing tickets, so the odds in favour are 1 : 499.',
    wrong: ['The claim is true: odds and probability mean the same thing.', 'The claim is false: the odds in favour are 500 : 1.', 'The claim is false: the odds in favour are 499 : 1.'],
    why: 'Odds compare favourable with unfavourable outcomes. With 1 winner in 500, there are 499 losers, so the odds in favour are 1 : 499 and the odds against are 499 : 1.',
  },
  {
    claim: (name) => `The forecast for Pinewood gave a 70% probability of rain on Saturday, and it did not rain. ${name} says the forecast was wrong.`,
    correct: 'The claim is not justified: a 70% chance means rain on about 7 of every 10 days with this forecast, so a dry day can still happen.',
    wrong: ['The claim is true: a 70% chance means it will definitely rain.', 'The claim is true: it should have rained for 70% of the day.', 'The claim is true: any probability over 50% means the event will happen.'],
    why: 'A probability describes what happens in the long run. On about 3 of every 10 days with a 70% forecast, it stays dry.',
  },
  {
    claim: (name) => `${name} tested 5 batteries from a shipment of 2,000 at a warehouse, and 1 was dead. ${name} says exactly 400 batteries in the shipment must be dead.`,
    correct: 'The claim is too strong: $\\dfrac{1}{5}$ comes from a very small sample, so 400 is only a rough estimate, and the true number could be quite different.',
    wrong: ['The claim is true: $\\dfrac{1}{5}$ of 2,000 is exactly 400.', 'The claim is false: only 1 battery in the shipment is dead.', 'The claim is false: probability cannot be used for batteries.'],
    why: 'A probability from 5 tests is an experimental estimate. A larger sample gives a better estimate, and even then the expected number is not exact.',
  },
  {
    claim: (name) => `${name} says the probability that tomorrow’s high in a cold northern town in midwinter will be above 25°C is $\\dfrac{1}{2}$, because it either will be or it will not.`,
    correct: 'The claim is false: the two outcomes are not equally likely, so the probability is not $\\dfrac{1}{2}$ (it is close to 0).',
    wrong: ['The claim is true: there are two outcomes, so each has probability $\\dfrac{1}{2}$.', 'The claim is false: the probability is $\\dfrac{1}{3}$.', 'The claim is true: weather is random, so every outcome is equally likely.'],
    why: 'Counting outcomes only gives a probability when the outcomes are equally likely. A midwinter high above 25°C in a cold northern town is very unlikely.',
  },
  {
    claim: (name) => `A die is rolled 60 times at a games night. ${name} says there will be exactly 10 sixes, because the probability of a six is $\\dfrac{1}{6}$.`,
    correct: 'The claim is too strong: about 10 sixes is expected, but the actual number will vary, so exactly 10 is not guaranteed.',
    wrong: ['The claim is true: $\\dfrac{1}{6} \\times 60 = 10$, so there will be exactly 10 sixes.', 'The claim is false: you would expect 6 sixes.', 'The claim is false: you would expect 60 sixes.'],
    why: 'Expected number = probability × trials gives $\\dfrac{1}{6} \\times 60 = 10$ sixes on average, but each set of 60 rolls gives a slightly different result.',
  },
];

function judgeClaim(rng: Rng): Out {
  const c = rng.pick(CLAIMS);
  const name = rng.pick(NAMES);
  return {
    prompt: `${c.claim(name)} Which statement about this claim is correct?`,
    parts: [part(mc(rng, c.correct, c.wrong))],
    hints: ['Ask: are the outcomes equally likely, are the events independent, and is this a probability or the odds?', 'A probability describes what happens in the long run, not exactly what will happen next time.'],
    solution: [c.why, c.correct],
  };
}

interface Option { text: string; p: number; steps: string }
/** One chance described as a count, a "1 in n", a percent, or odds. */
function describe(rng: Rng, style: 'count' | 'oneIn' | 'oddsAgainst' | 'oddsFor', label: string, name: string): Option {
  if (style === 'count') {
    const n = rng.pick([150, 200, 250, 300, 400, 500, 600, 800]);
    const k = rng.int(2, 12);
    const p = (100 * k) / n;
    return { text: `${label} sold ${numT(n)} tickets, and ${name} would buy ${k} of them.`, p, steps: `${label}: $P = \\dfrac{${k}}{${group(String(n), '{,}')}} \\times 100 ${pctEq(p, 2)}$` };
  }
  if (style === 'oneIn') {
    const n = rng.int(20, 120);
    const p = 100 / n;
    return { text: `${label} advertises “1 chance in ${n} to win” for each ticket, and ${name} would buy one ticket.`, p, steps: `${label}: $P = \\dfrac{1}{${n}} \\times 100 ${pctEq(p, 2)}$` };
  }
  if (style === 'oddsAgainst') {
    const a = rng.int(19, 119);
    const p = 100 / (a + 1);
    return { text: `With one ticket, the odds against winning ${label} are ${a} : 1, and ${name} would buy one ticket.`, p, steps: `${label}: odds against ${a} : 1 means 1 favourable out of $${a} + 1 = ${a + 1}$, so $P = \\dfrac{1}{${a + 1}} \\times 100 ${pctEq(p, 2)}$` };
  }
  const b = rng.int(19, 119);
  const p = 100 / (b + 1);
  return { text: `With one ticket, the odds in favour of winning ${label} are 1 : ${b}, and ${name} would buy one ticket.`, p, steps: `${label}: odds in favour 1 : ${b} means 1 favourable out of $1 + ${b} = ${b + 1}$, so $P = \\dfrac{1}{${b + 1}} \\times 100 ${pctEq(p, 2)}$` };
}

function compareChances(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { what: 'two raffles at a hockey fundraiser', A: 'Raffle A', B: 'Raffle B' },
    { what: 'two draws at a trade show', A: 'Draw A', B: 'Draw B' },
    { what: 'two fundraising raffles for a town rodeo', A: 'Raffle A', B: 'Raffle B' },
  ]);
  const o = retry(
    () => {
      const [sa, sb] = rng.sample(['count', 'oneIn', 'oddsAgainst', 'oddsFor'] as const, 2);
      return { A: describe(rng, sa, ctx.A, name), B: describe(rng, sb, ctx.B, name) };
    },
    (x) => Math.abs(x.A.p - x.B.p) > 0.15 && !onEdge(x.A.p, 2) && !onEdge(x.B.p, 2),
    300,
  );
  const { A, B } = o;
  const better = A.p > B.p ? ctx.A : ctx.B;
  const worse = better === ctx.A ? ctx.B : ctx.A;
  return {
    prompt: `${name} is choosing between ${ctx.what}. ${A.text} ${B.text} Find the probability of winning each, as a percent to the nearest hundredth. Which gives ${name} the better chance?`,
    parts: [
      pctPart(A.p, `${ctx.A}:`, 2),
      pctPart(B.p, `${ctx.B}:`, 2),
      part(mc(rng, `${better}, because its probability of winning is higher.`, [
        `${worse}, because its probability of winning is higher.`,
        'They give the same chance of winning.',
        `${worse}, because odds and probability cannot be compared.`,
      ]), { label: 'Better chance:' }),
    ],
    hints: ['Change each description into a probability: favourable outcomes ÷ total outcomes.', 'For odds a : b, the total number of outcomes is $a + b$. Then compare the two percents.'],
    solution: [A.steps, B.steps, `${better} has the higher probability, so it gives ${name} the better chance.`],
  };
}

/** Odds are stated as big : small, either against a rare problem or in favour of the usual outcome. */
interface OddsExp { text: (o: string, n: string) => string; ask: string; unit: string; stated: 'for' | 'against'; usual: string; rare: string; askUsual: boolean }
const ODDS_EXP: OddsExp[] = [
  { text: (o, n) => `A fastener supplier says the odds against one of its bolts being defective are ${o}. A contractor orders ${n} bolts.`, ask: 'How many defective bolts should the contractor expect?', unit: 'bolts', stated: 'against', usual: 'good bolts', rare: 'defective bolts', askUsual: false },
  { text: (o, n) => `On a cattle ranch, the odds in favour of a calving going without any trouble are ${o}. This spring, ${n} cows will calve.`, ask: 'How many calvings should the rancher expect to need help?', unit: 'calvings', stated: 'for', usual: 'calvings without trouble', rare: 'calvings that need help', askUsual: false },
  { text: (o, n) => `At a bottling plant, the odds against a bottle being underfilled are ${o}. The plant fills ${n} bottles in a shift.`, ask: 'How many underfilled bottles should the plant expect in a shift?', unit: 'bottles', stated: 'against', usual: 'full bottles', rare: 'underfilled bottles', askUsual: false },
  { text: (o, n) => `A market-garden greenhouse finds that the odds in favour of a tomato seedling surviving transplanting are ${o}. The crew transplants ${n} seedlings.`, ask: 'How many seedlings should the crew expect to survive?', unit: 'seedlings', stated: 'for', usual: 'seedlings that survive', rare: 'seedlings that die', askUsual: true },
  { text: (o, n) => `A courier company says the odds against a parcel being delivered late are ${o}. It delivers ${n} parcels this week.`, ask: 'How many parcels should the company expect to be delivered on time?', unit: 'parcels', stated: 'against', usual: 'parcels on time', rare: 'late parcels', askUsual: true },
];

function oddsExpected(rng: Rng): Out {
  const c = rng.pick(ODDS_EXP);
  const { a, b, n } = retry(
    () => {
      const big = rng.int(4, 49);
      const small = rng.pick([1, 1, 2, 3]);
      const n = rng.int(4, 40) * (big + small) * rng.pick([1, 5, 10]);
      return { a: big, b: small, n };
    },
    (x) => gcd(x.a, x.b) === 1 && x.n >= 200 && x.n <= 20000,
    200,
  );
  const tot = a + b;
  const askedCount = c.askUsual ? a : b;
  const f = frac(askedCount, tot);
  const E = (n * askedCount) / tot;
  const eventLine = `Odds ${c.stated === 'for' ? 'in favour' : 'against'} of ${odds(a, b)} mean ${a} ${c.usual} for every ${b} ${c.rare}, so each group has $${a} + ${b} = ${tot}$ outcomes.`;
  return {
    prompt: `${c.text(odds(a, b), numT(n))} ${c.ask} First write the probability as a fraction in lowest terms.`,
    parts: [fracPart(f, 'Probability:'), numPart(E, { label: 'Expected number:', suffix: c.unit })],
    hints: [
      'Change the odds to a probability: for odds a : b, the total number of outcomes is a + b.',
      'Expected number = probability × number of trials.',
    ],
    solution: [
      eventLine,
      `The question asks about ${c.askUsual ? c.usual : c.rare}: ${askedCount} out of every ${tot}, so $P = \\dfrac{${askedCount}}{${tot}}${f.d !== tot ? ` = ${tex(f)}` : ''}$`,
      `Expected number: $${tex(f)} \\times ${group(String(n), '{,}')} = ${group(String(E), '{,}')}$`,
      `Expect about ${numT(E)} ${c.askUsual ? c.usual : c.rare}.`,
    ],
  };
}

const probabilityOdds = skill({
  id: 'm303-probability-odds',
  name: 'Probability and odds',
  description: 'Write probabilities as fractions, decimals and percents, convert between probability and odds, find expected outcomes, and judge claims about chance.',
  outcomes: ['P1'],
  lessonId: 'm303-7-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const r = rng.int(0, 2);
      return r === 0 ? fracDecPct(rng) : r === 1 ? oddsFromCounts(rng) : expectedCount(rng);
    }
    if (d === 2) {
      const r = rng.int(0, 2);
      return r === 0 ? probToOdds(rng) : r === 1 ? oddsToProb(rng) : judgeClaim(rng);
    }
    return rng.chance(0.5) ? compareChances(rng) : oddsExpected(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.2 Probability of combined events — m303-probability-combined
// ---------------------------------------------------------------------------


const spinner = (n: number): Figure => ({
  type: 'circleGraph',
  slices: Array.from({ length: n }, (_, i) => ({ label: String(i + 1), value: 1 })),
  show: 'none',
  caption: `A spinner with ${n} equal sections`,
});

interface Simple { kind: 'die' | 'coin' | 'spinner'; act: string; win: string; ev: string; f: Frac; figure?: Figure }
/** A simple event with equally likely outcomes. */
function simpleGame(rng: Rng, exclude: string[] = []): Simple {
  const kind = rng.pick((['die', 'coin', 'spinner'] as const).filter((k) => !exclude.includes(k)));
  if (kind === 'coin') return { kind, act: 'flip a coin', win: 'flipping heads', ev: 'heads', f: frac(1, 2) };
  if (kind === 'die') {
    const e = rng.pick([
      { ev: 'a 6', k: 1 }, { ev: 'an even number', k: 3 }, { ev: 'a number greater than 4', k: 2 }, { ev: 'a number less than 3', k: 2 }, { ev: 'a 5 or a 6', k: 2 }, { ev: 'a number less than 5', k: 4 },
    ]);
    return { kind, act: 'roll a standard six-sided die', win: `rolling ${e.ev}`, ev: e.ev, f: frac(e.k, 6) };
  }
  const n = rng.pick([3, 4, 5, 6]);
  const k = rng.int(1, n - 1);
  const ev = k === 1 ? `a ${n}` : `a number from 1 to ${k}`;
  return { kind, act: `spin a spinner with ${n} equal sections numbered 1 to ${n}`, win: `spinning ${ev}`, ev, f: frac(k, n), figure: spinner(n) };
}

interface TwoPct { text: (p: number, q: number, town: string) => string; ev: string; ps: number[]; qs: number[] }
const TWO_PCT: TwoPct[] = [
  { text: (p, q, town) => `The forecast for ${town} gives a ${p}% probability of rain on Saturday and a ${q}% probability of rain on Sunday. Assume the two days are independent.`, ev: 'it rains on both days', ps: [10, 20, 30, 40, 50, 60, 70, 80], qs: [10, 20, 30, 40, 50, 60, 70] },
  { text: (p, q) => `At a manufacturing plant, ${p}% of the parts from machine A and ${q}% of the parts from machine B are defective. The machines work independently. One part from each machine is checked.`, ev: 'both parts are defective', ps: [2, 4, 5, 6, 10], qs: [2, 3, 5, 8, 10] },
  { text: (p, q) => `A trucker hauling grain to an elevator crosses two railway lines. The gates at the first crossing are down ${p}% of the time and the gates at the second are down ${q}% of the time, independently.`, ev: 'the gates are down at both crossings', ps: [10, 15, 20, 25, 30], qs: [10, 20, 30, 40] },
  { text: (p, q) => `On a canola farm, the probability that a field is hit by hail this summer is ${p}%, and the probability that canola prices rise this fall is ${q}%. Assume these events are independent.`, ev: 'the field is hit by hail and prices rise', ps: [5, 10, 15, 20], qs: [30, 40, 50, 60] },
];

function independentAnd(rng: Rng): Out {
  const name = rng.pick(NAMES);
  if (rng.chance(0.5)) {
    const A = simpleGame(rng);
    const B = simpleGame(rng, [A.kind]);
    const f = frac(A.f.n * B.f.n, A.f.d * B.f.d);
    return {
      prompt: `In a game at a summer fair, ${name} will ${A.act} and ${B.act}. ${name} wins a prize for ${A.win} and ${B.win}. What is the probability that ${name} wins? Write it as a fraction in lowest terms.`,
      figure: A.figure ?? B.figure,
      parts: [fracPart(f)],
      hints: ['One result does not change the chances of the other, so the events are independent.', 'For independent events, $P(A \\text{ and } B) = P(A) \\times P(B)$.'],
      solution: [
        `$P(\\text{${A.ev}}) = ${tex(A.f)}$ and $P(\\text{${B.ev}}) = ${tex(B.f)}$`,
        `The events are independent, so multiply: $${tex(A.f)} \\times ${tex(B.f)} = ${reduce(A.f.n * B.f.n, A.f.d * B.f.d)}$`,
        `The probability that ${name} wins is $${tex(f)}$.`,
      ],
    };
  }
  const c = rng.pick(TWO_PCT);
  const p = rng.pick(c.ps);
  const q = rng.pick(c.qs);
  const P = roundTo((p * q) / 100, 6);
  return {
    prompt: `${c.text(p, q, rng.pick(towns))} What is the probability that ${c.ev}? Give your answer as a percent.`,
    parts: [pctPart(P)],
    hints: ['The events are independent, so multiply their probabilities.', `Write the percents as decimals: $${fmt(p / 100, 4)} \\times ${fmt(q / 100, 4)}$. Then change the answer back to a percent.`],
    solution: [
      `As decimals: $${p}\\% = ${fmt(p / 100, 4)}$ and $${q}\\% = ${fmt(q / 100, 4)}$`,
      `Independent events: $P = ${fmt(p / 100, 4)} \\times ${fmt(q / 100, 4)} = ${fmt(P / 100, 6)}$`,
      `As a percent: $${fmt(P / 100, 6)} \\times 100 = ${fmt(P, 4)}\\%$`,
      `The probability that ${c.ev} is ${fmt(P, 4)}%.`,
    ],
  };
}

interface Cat { label: string; short: string; lo: number; hi: number }
interface Bin { text: (counts: string) => string; cats: Cat[]; ask: (a: string, b: string) => string }
const BINS: Bin[] = [
  {
    text: (c) => `A parts bin in a repair shop holds ${c}. An apprentice reaches in and takes one washer without looking.`,
    cats: [{ label: 'zinc washers', short: 'zinc', lo: 10, hi: 30 }, { label: 'stainless steel washers', short: 'stainless steel', lo: 5, hi: 20 }, { label: 'brass washers', short: 'brass', lo: 4, hi: 15 }, { label: 'nylon washers', short: 'nylon', lo: 3, hi: 12 }],
    ask: (a, b) => `the washer is ${a} or ${b}`,
  },
  {
    text: (c) => `A drawer in a farm workshop holds ${c}. The farmer grabs one fuse in the dark.`,
    cats: [{ label: 'fuses rated 10 A', short: '10 A', lo: 4, hi: 15 }, { label: 'fuses rated 15 A', short: '15 A', lo: 5, hi: 18 }, { label: 'fuses rated 20 A', short: '20 A', lo: 3, hi: 12 }, { label: 'fuses rated 30 A', short: '30 A', lo: 2, hi: 10 }],
    ask: (a, b) => `the fuse is rated ${a} or ${b}`,
  },
  {
    text: (c) => `A bag of seed packets at a garden centre holds ${c}. A customer picks one packet at random as a free sample.`,
    cats: [{ label: 'carrot packets', short: 'carrot', lo: 8, hi: 20 }, { label: 'bean packets', short: 'bean', lo: 5, hi: 15 }, { label: 'pea packets', short: 'pea', lo: 5, hi: 15 }, { label: 'lettuce packets', short: 'lettuce', lo: 3, hi: 12 }],
    ask: (a, b) => `the packet is ${a} or ${b} seeds`,
  },
  {
    text: (c) => `The staff parking lot at a gas plant has ${c}. One vehicle is chosen at random for a free oil change.`,
    cats: [{ label: 'pickup trucks', short: 'a pickup truck', lo: 20, hi: 45 }, { label: 'SUVs', short: 'an SUV', lo: 8, hi: 25 }, { label: 'cars', short: 'a car', lo: 5, hi: 20 }, { label: 'vans', short: 'a van', lo: 2, hi: 8 }],
    ask: (a, b) => `the vehicle is ${a} or ${b}`,
  },
];

function exclusiveOr(rng: Rng): Out {
  const b = rng.pick(BINS);
  const counts = b.cats.map((c) => rng.int(c.lo, c.hi));
  const n = counts.reduce((s, x) => s + x, 0);
  const [i, j] = rng.sample([0, 1, 2, 3], 2).sort((x, y) => x - y);
  const k = counts[i] + counts[j];
  const f = frac(k, n);
  const desc = b.cats.map((c, idx) => `${counts[idx]} ${c.label}`);
  const all = `${desc.slice(0, -1).join(', ')} and ${desc[desc.length - 1]}`;
  const A = b.cats[i];
  const B = b.cats[j];
  const tA = A.short.replace(/^an? /, '');
  const tB = B.short.replace(/^an? /, '');
  return {
    prompt: `${b.text(all)} What is the probability that ${b.ask(A.short, B.short)}? Write it as a fraction in lowest terms.`,
    parts: [fracPart(f)],
    hints: [`One item cannot be both ${A.short} and ${B.short}, so the events are mutually exclusive.`, 'For mutually exclusive events, $P(A \\text{ or } B) = P(A) + P(B)$.'],
    solution: [
      `Total: $${counts.join(' + ')} = ${n}$`,
      `$P(\\text{${tA}}) = \\dfrac{${counts[i]}}{${n}}$ and $P(\\text{${tB}}) = \\dfrac{${counts[j]}}{${n}}$`,
      `The events are mutually exclusive, so add: $\\dfrac{${counts[i]}}{${n}} + \\dfrac{${counts[j]}}{${n}} = ${reduce(k, n)}$`,
      `The probability that ${b.ask(A.short, B.short)} is $${tex(f)}$.`,
    ],
  };
}

interface Draw { text: (n: number, k: number, name: string) => string; both: (name: string) => string; pick: string; ns: number[]; k: (n: number) => [number, number]; raffle?: boolean }
const DRAWS: Draw[] = [
  { text: (n, k) => `A box of ${n} fuses in an electrician’s van contains ${k} blown fuses that were put back by mistake.`, both: () => 'both fuses are blown', pick: 'The electrician takes two fuses from the box', ns: [10, 12, 15, 20, 24], k: (n) => [2, Math.floor(n / 3)] },
  { text: (n, k) => `A framing crew has ${n} workers, and ${k} of them are apprentices.`, both: () => 'both workers are apprentices', pick: 'The supervisor picks two workers at random for a job across town', ns: [8, 9, 10, 12, 14], k: (n) => [2, Math.floor(n / 2)] },
  { text: (n, k, name) => `A minor hockey team sold ${n} tickets for a draw with two prizes, and ${name} bought ${k} of them.`, both: (name) => `${name} wins both prizes`, pick: 'Two tickets are drawn', ns: [40, 50, 60, 80, 100], k: () => [2, 6], raffle: true },
  { text: (n, k) => `A tray in a farm shop holds ${n} sockets that look alike, and ${k} of them are metric.`, both: () => 'both sockets are metric', pick: 'A mechanic picks two sockets at random', ns: [10, 12, 15, 16, 20], k: (n) => [2, n - 2] },
  { text: (n, k) => `A flat of ${n} eggs from a family farm has ${k} cracked eggs.`, both: () => 'both eggs are cracked', pick: 'A cook takes two eggs at random', ns: [12, 18, 30], k: (n) => [2, Math.floor(n / 4)] },
];

function dependentAnd(rng: Rng): Out {
  const dr = rng.pick(DRAWS);
  const name = rng.pick(NAMES);
  const n = rng.pick(dr.ns);
  const [klo, khi] = dr.k(n);
  const k = rng.int(klo, Math.max(klo, khi));
  const replace = !dr.raffle && rng.chance(0.3);
  const fn = replace ? k : k - 1;
  const fd = replace ? n : n - 1;
  const f = frac(k * fn, n * fd);
  const both = dr.both(name);
  const how = dr.raffle ? 'without putting the first ticket back' : replace ? 'one at a time, putting the first one back before taking the second' : 'one after the other, without putting the first one back';
  return {
    prompt: `${dr.text(n, k, name)} ${dr.pick} ${how}. Are the two picks independent or dependent? What is the probability that ${both}? Write the probability as a fraction in lowest terms.`,
    parts: [part(fixedChoice(['Independent', 'Dependent'], replace ? 0 : 1), { label: 'The picks are:' }), fracPart(f)],
    hints: [
      replace ? 'The first item goes back, so the second pick has the same chances as the first.' : 'The first item is not put back, so for the second pick there is one fewer item in total, and one fewer of the kind you want.',
      'Multiply: $P(\\text{first}) \\times P(\\text{second, after the first})$.',
    ],
    solution: [
      replace
        ? 'The first item is put back, so the first pick does not change the second: the picks are independent.'
        : 'The first item is not put back, so the first pick changes the chances for the second: the picks are dependent.',
      `First pick: $\\dfrac{${k}}{${n}}$`,
      replace ? `Second pick (the same as the first): $\\dfrac{${k}}{${n}}$` : `Second pick: ${k - 1} of the ${n - 1} that are left, so $\\dfrac{${k - 1}}{${n - 1}}$`,
      `$P = \\dfrac{${k}}{${n}} \\times \\dfrac{${fn}}{${fd}} = ${reduce(k * fn, n * fd)}$`,
      `The picks are ${replace ? 'independent' : 'dependent'}, and the probability that ${both} is $${tex(f)}$.`,
    ],
  };
}

interface Three { text: (ps: number[]) => string; ev: string; one: string; ps: number[] }
const THREES: Three[] = [
  { text: (ps) => `A crew has a three-day pipeline job over a long weekend. The forecast gives the probability of rain as ${ps[0]}% on Saturday, ${ps[1]}% on Sunday and ${ps[2]}% on Monday. Assume the days are independent.`, ev: 'it stays dry on all three days', one: 'dry', ps: [10, 20, 30, 40, 50, 60] },
  { text: (ps) => `A delivery driver passes three traffic lights that work independently. The probability of a red light is ${ps[0]}% at the first, ${ps[1]}% at the second and ${ps[2]}% at the third.`, ev: 'the driver gets through all three lights without a red', one: 'not red', ps: [20, 30, 40, 50, 60] },
  { text: (ps) => `An assembly line has three machines that each can jam, independently. On a given shift, machine A jams with probability ${ps[0]}%, machine B with probability ${ps[1]}% and machine C with probability ${ps[2]}%.`, ev: 'none of the three machines jams during the shift', one: 'no jam', ps: [5, 10, 15, 20, 25] },
];

function threeIndependent(rng: Rng): Out {
  const c = rng.pick(THREES);
  const ps = [rng.pick(c.ps), rng.pick(c.ps), rng.pick(c.ps)];
  const qs = ps.map((p) => (100 - p) / 100);
  const P = qs[0] * qs[1] * qs[2] * 100;
  const dp = isExact(P, 2) ? undefined : 1;
  return {
    prompt: `${c.text(ps)} What is the probability that ${c.ev}? Give the answer as a percent${dp === undefined ? '' : ' to the nearest tenth'}.`,
    parts: [pctPart(roundTo(P, 6), 'Probability:', dp)],
    hints: ['First find the probability of the opposite event on each one: $1 - P$.', 'The events are independent, so multiply the three probabilities.'],
    solution: [
      `Probabilities of “${c.one}”: $${qs.map((q, i) => `1 - ${fmt(ps[i] / 100, 2)} = ${fmt(q, 2)}`).join('$, $')}$`,
      `Independent, so multiply: $${qs.map((q) => fmt(q, 2)).join(' \\times ')} = ${fmt(P / 100, 6)}$`,
      `The probability that ${c.ev} is ${dp === undefined ? fmt(P, 4) : `about ${fmtFixed(P, 1)}`}%.`,
    ],
  };
}

function qualityControl(rng: Rng): Out {
  const ctx = rng.pick([
    { text: (p: number, m: number) => `A plant makes pipe fittings, and ${p}% of the fittings are defective. An inspector picks ${m} fittings at random from a large batch.`, item: 'fittings', bad: 'defective' },
    { text: (p: number, m: number) => `Records at a tire shop show that ${p}% of the used tires taken in trade have a hidden puncture. The shop checks ${m} tires taken in trade from different customers.`, item: 'tires', bad: 'punctured' },
    { text: (p: number, m: number) => `A bakery finds that ${p}% of its loaves come out underweight. An inspector weighs ${m} loaves chosen at random from a large batch.`, item: 'loaves', bad: 'underweight' },
    { text: (p: number, m: number) => `A seed cleaning plant finds that ${p}% of the seed bags it tests are below the germination standard. A buyer tests ${m} bags chosen at random from a large lot.`, item: 'bags', bad: 'below the standard' },
  ]);
  const p = rng.pick([2, 3, 4, 5, 6, 8, 10, 12, 15]);
  const m = rng.pick([2, 3, 3, 4]);
  const atLeast = rng.chance(0.6);
  const q = 1 - p / 100;
  const none = q ** m;
  const P = (atLeast ? 1 - none : none) * 100;
  const dp = onEdge(P, 1) ? 2 : 1;
  const r = (v: number) => fmt(v, 8);
  return {
    prompt: `${ctx.text(p, m)} Assume the ${ctx.item} are independent. What is the probability that ${atLeast ? `at least one of the ${m} ${ctx.item} is ${ctx.bad}` : `none of the ${m} ${ctx.item} is ${ctx.bad}`}? Give the answer as a percent to the nearest ${dp === 1 ? 'tenth' : 'hundredth'}.`,
    parts: [pctPart(P, 'Probability:', dp)],
    hints: [
      `The probability that one of the ${ctx.item} is not ${ctx.bad} is $1 - ${fmt(p / 100, 4)} = ${fmt(q, 4)}$.`,
      atLeast ? `“At least one” is the opposite of “none”: $P(\\text{at least one}) = 1 - P(\\text{none})$, and $P(\\text{none}) = ${fmt(q, 4)}^{${m}}$.` : `The ${ctx.item} are independent, so multiply ${m} of these together.`,
    ],
    solution: [
      `$P(\\text{one is not ${ctx.bad}}) = 1 - ${fmt(p / 100, 4)} = ${fmt(q, 4)}$`,
      `$P(\\text{none ${ctx.bad}}) = ${Array(m).fill(fmt(q, 4)).join(' \\times ')} = ${r(none)}$`,
      ...(atLeast ? [`$P(\\text{at least one ${ctx.bad}}) = 1 - ${r(none)} = ${r(1 - none)}$`] : []),
      `As a percent: $${r(P / 100)} \\times 100 ${isExact(P, dp) ? `= ${fmt(P, dp)}` : `\\approx ${fmtFixed(P, dp)}`}\\%$`,
      `The probability is ${about(P, dp)}${fmtFixed(P, dp)}%.`,
    ],
  };
}

function matchingPair(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { text: (a: number, b: number) => `${name} has ${a} black and ${b} grey work socks loose in a drawer. In the dark before a 5 a.m. shift, ${name} pulls out two socks.`, A: 'black', B: 'grey', ev: 'the two socks match (both black or both grey)' },
    { text: (a: number, b: number) => `A bucket at a job site holds ${a} long screws and ${b} short screws that look alike from above. A carpenter grabs two screws.`, A: 'long', B: 'short', ev: 'both screws are the same length' },
    { text: (a: number, b: number) => `A cooler at a ball tournament holds ${a} cans of iced tea and ${b} cans of lemonade. ${name} grabs two cans without looking.`, A: 'iced tea', B: 'lemonade', ev: 'both cans are the same drink' },
  ]);
  const a = rng.int(3, 9);
  const b = rng.int(2, 8);
  const n = a + b;
  const num = a * (a - 1) + b * (b - 1);
  const den = n * (n - 1);
  const f = frac(num, den);
  return {
    prompt: `${ctx.text(a, b)} (Taking two at once works the same as taking one and then another without putting the first back.) What is the probability that ${ctx.ev}? Write it as a fraction in lowest terms.`,
    parts: [fracPart(f)],
    hints: [
      `Find $P(\\text{both ${ctx.A}})$ and $P(\\text{both ${ctx.B}})$. Each is a product of dependent probabilities.`,
      '“Both the first kind” and “both the second kind” cannot happen together, so they are mutually exclusive: add the two probabilities.',
    ],
    solution: [
      `$P(\\text{both ${ctx.A}}) = \\dfrac{${a}}{${n}} \\times \\dfrac{${a - 1}}{${n - 1}} = \\dfrac{${a * (a - 1)}}{${den}}$`,
      `$P(\\text{both ${ctx.B}}) = \\dfrac{${b}}{${n}} \\times \\dfrac{${b - 1}}{${n - 1}} = \\dfrac{${b * (b - 1)}}{${den}}$`,
      `These are mutually exclusive, so add: $\\dfrac{${a * (a - 1)}}{${den}} + \\dfrac{${b * (b - 1)}}{${den}} = ${reduce(num, den)}$`,
      `The probability that ${ctx.ev} is $${tex(f)}$.`,
    ],
  };
}

function weekendRain(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(towns);
  const p = rng.pick([20, 30, 40, 50, 60]);
  const q = rng.pick([20, 30, 40, 50, 60]);
  const job = rng.pick([
    { who: `${name} runs a roofing crew in ${town}`, need: 'The crew cannot work on a day with rain' },
    { who: `${name} is planning to cut hay near ${town}`, need: 'Hay cannot be cut on a day with rain' },
    { who: `${name} is planning to pour a concrete driveway in ${town}`, need: 'Concrete cannot be poured on a day with rain' },
  ]);
  const P1 = p / 100;
  const Q1 = q / 100;
  const kind = rng.pick(['exactly', 'atLeast'] as const);
  const sat = roundTo(P1 * (1 - Q1), 6);
  const sun = roundTo((1 - P1) * Q1, 6);
  const dry = roundTo((1 - P1) * (1 - Q1), 6);
  const val = kind === 'exactly' ? roundTo(sat + sun, 6) : roundTo(1 - dry, 6);
  const P = roundTo(val * 100, 6);
  const claim = kind === 'atLeast';
  const parts: Part[] = [pctPart(P, 'Probability:')];
  const sol: string[] = [`$P(\\text{rain Sat}) = ${fmt(P1, 2)}$, $P(\\text{no rain Sat}) = ${fmt(1 - P1, 2)}$, $P(\\text{rain Sun}) = ${fmt(Q1, 2)}$, $P(\\text{no rain Sun}) = ${fmt(1 - Q1, 2)}$`];
  if (kind === 'exactly') {
    sol.push(
      `Rain Saturday only: $${fmt(P1, 2)} \\times ${fmt(1 - Q1, 2)} = ${fmt(sat, 4)}$`,
      `Rain Sunday only: $${fmt(1 - P1, 2)} \\times ${fmt(Q1, 2)} = ${fmt(sun, 4)}$`,
      `These two cases are mutually exclusive, so add: $${fmt(sat, 4)} + ${fmt(sun, 4)} = ${fmt(val, 4)}$, which is ${fmt(P, 2)}%.`,
    );
  } else {
    sol.push(
      `No rain on either day (independent): $${fmt(1 - P1, 2)} \\times ${fmt(1 - Q1, 2)} = ${fmt(dry, 4)}$`,
      `Rain on at least one day: $1 - ${fmt(dry, 4)} = ${fmt(val, 4)}$, which is ${fmt(P, 2)}%.`,
      `Adding gives $${p}\\% + ${q}\\% = ${p + q}\\%$, which is too high: rain on both days can happen, so adding counts the chance of rain on both days twice.`,
    );
    parts.push(part(mc(rng, 'No: rain on Saturday and rain on Sunday are not mutually exclusive, so the probabilities cannot simply be added.', [
      'Yes: for “or”, always add the probabilities.',
      `No: the probabilities should be multiplied, giving ${fmt((p * q) / 100, 2)}%.`,
      'Yes: the two days are independent, so add the probabilities.',
    ]), { label: 'Is the coworker right?' }));
  }
  sol.push(`The probability is ${fmt(P, 2)}%.`);
  const ask = kind === 'exactly' ? 'it rains on exactly one of the two days' : 'it rains on at least one of the two days';
  return {
    prompt: `${job.who} this weekend. ${job.need}. The forecast gives a ${p}% probability of rain on Saturday and a ${q}% probability on Sunday. Assume the two days are independent. What is the probability that ${ask}? Give the answer as a percent.${claim ? ` A coworker says the answer is ${p}% + ${q}% = ${p + q}%. Is the coworker right?` : ''}`,
    parts,
    hints: [
      kind === 'exactly' ? '“Exactly one day” means rain Saturday and not Sunday, or no rain Saturday and rain Sunday.' : '“At least one day” is the opposite of “no rain on either day”.',
      kind === 'exactly' ? 'Multiply for each case (independent events), then add the two cases (mutually exclusive).' : 'Find $P(\\text{no rain either day})$ by multiplying, then subtract it from 1.',
    ],
    solution: sol,
  };
}

function rafflePrizes(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const org = rng.pick(['A volunteer fire department in a lakeside town', 'A 4-H club in a farming community', 'A minor hockey association in a small town', 'A seniors’ centre in a prairie village']);
  const n = rng.pick([50, 60, 80, 100, 120, 150, 200]);
  const k = rng.int(2, 6);
  const kind = rng.pick(['atLeast', 'firstOnly'] as const);
  const all = n * (n - 1);
  const noneN = (n - k) * (n - k - 1);
  const top = kind === 'atLeast' ? all - noneN : k * (n - k);
  const P = (100 * top) / all;
  const dp = onEdge(P, 1) ? 2 : 1;
  const eq = isExact(P, dp) ? `= ${fmt(P, dp)}` : `\\approx ${fmtFixed(P, dp)}`;
  return {
    prompt: `${org} sold ${n} tickets for a raffle with two prizes. ${name} bought ${k} tickets. The first-prize ticket is drawn and not put back, then the second-prize ticket is drawn. What is the probability that ${name} ${kind === 'atLeast' ? 'wins at least one prize' : 'wins first prize but not second prize'}? Give the answer as a percent to the nearest ${dp === 1 ? 'tenth' : 'hundredth'}.`,
    parts: [pctPart(P, 'Probability:', dp)],
    hints: kind === 'atLeast'
      ? ['“At least one prize” is the opposite of “no prizes”.', `$P(\\text{no prizes}) = \\dfrac{${n - k}}{${n}} \\times \\dfrac{${n - k - 1}}{${n - 1}}$, because the draws are dependent.`]
      : ['Find $P(\\text{win first}) \\times P(\\text{not win second, after winning first})$.', `After one of ${poss(name)} tickets wins, ${n - 1} tickets are left and ${n - k} of them are not ${poss(name)}.`],
    solution: kind === 'atLeast'
      ? [
          `No prize on the first draw: $\\dfrac{${n - k}}{${n}}$. No prize on the second draw (one losing ticket is gone): $\\dfrac{${n - k - 1}}{${n - 1}}$.`,
          `$P(\\text{no prizes}) = \\dfrac{${n - k}}{${n}} \\times \\dfrac{${n - k - 1}}{${n - 1}} = \\dfrac{${group(String(noneN), '{,}')}}{${group(String(all), '{,}')}}$`,
          `$P(\\text{at least one}) = 1 - \\dfrac{${group(String(noneN), '{,}')}}{${group(String(all), '{,}')}} = \\dfrac{${group(String(top), '{,}')}}{${group(String(all), '{,}')}} ${eq}\\%$`,
          `The probability is ${about(P, dp)}${fmtFixed(P, dp)}%.`,
        ]
      : [
          `Win first prize: $\\dfrac{${k}}{${n}}$`,
          `Then not win second prize: $\\dfrac{${n - k}}{${n - 1}}$ (${n - 1} tickets are left, and ${n - k} of them are not ${poss(name)})`,
          `$P = \\dfrac{${k}}{${n}} \\times \\dfrac{${n - k}}{${n - 1}} = \\dfrac{${group(String(top), '{,}')}}{${group(String(all), '{,}')}} ${eq}\\%$`,
          `The probability is ${about(P, dp)}${fmtFixed(P, dp)}%.`,
        ],
  };
}

const probabilityCombined = skill({
  id: 'm303-probability-combined',
  name: 'Probability of combined events',
  description: 'Find probabilities of independent events, dependent events (without replacement) and mutually exclusive events, including quality control, weather and raffles.',
  outcomes: ['P1'],
  lessonId: 'm303-7-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.55) ? independentAnd(rng) : exclusiveOr(rng);
    if (d === 2) return rng.chance(0.65) ? dependentAnd(rng) : threeIndependent(rng);
    const r = rng.int(0, 3);
    return r === 0 ? qualityControl(rng) : r === 1 ? matchingPair(rng) : r === 2 ? weekendRain(rng) : rafflePrizes(rng);
  },
});

export const PROBABILITY_SKILLS: SkillDef[] = [probabilityOdds, probabilityCombined];
