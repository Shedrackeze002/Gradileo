/** Math 10-4 Unit 1 — Whole Numbers (N1, N2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Ctx = (x: string, name: string, town: string) => string;
type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

/** Plain text with commas for 4 or more digits, like a cheque: 9,020 (also used in table cells). */
const plain = (x: number) => {
  const s = String(Math.round(x));
  return s.length > 3 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : s;
};
/** A number inside maths, with commas: 45{,}302. */
const N = (x: number) => plain(x).replace(/,/g, '{,}');
/** A number as inline maths. */
const n$ = (x: number) => `$${N(x)}$`;
const tx = (u: string) => `\\text{${u}}`;
/** A quantity with a unit as inline maths: $250\ \text{km}$. */
const q = (x: number, u: string) => `$${N(x)}\\ ${tx(u)}$`;
/** Whole dollars in prose (never inside $...$). */
const money = (x: number) => `\\$${plain(x)}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a, b and c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** A whole-number answer: the student types the number itself, not an expression to be worked out. */
const whole = (v: number, suffix?: string, label?: string): Part => numPart(v, { suffix, label, exact: false });
const T = '\\times';
const D = '\\div';

/** Round to the nearest multiple of `place` (5 or more rounds up). */
const roundPlace = (x: number, place: number) => Math.round(x / place) * place;
/** Estimate a number by rounding: one digit stays, two digits to the nearest ten, bigger numbers to their first digit. */
function est(x: number): number {
  if (x < 10) return x;
  if (x < 100) return roundPlace(x, 10);
  const p = 10 ** (String(Math.round(x)).length - 1);
  return roundPlace(x, p);
}
const near = (a: number, e: number, lo = 0.75, hi = 1.3) => e > 0 && a / e >= lo && a / e <= hi;

// Number words ---------------------------------------------------------------

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function under100(x: number): string {
  return x < 20 ? ONES[x] : TENS[Math.floor(x / 10)] + (x % 10 ? `-${ONES[x % 10]}` : '');
}
function under1000(x: number): string {
  const h = Math.floor(x / 100);
  const r = x % 100;
  return [h ? `${ONES[h]} hundred` : '', r ? under100(r) : ''].filter(Boolean).join(' ');
}
function words(x: number): string {
  if (x === 0) return 'zero';
  const m = Math.floor(x / 1e6);
  const t = Math.floor(x / 1000) % 1000;
  const r = x % 1000;
  return [m ? `${under1000(m)} million` : '', t ? `${under1000(t)} thousand` : '', r ? under1000(r) : ''].filter(Boolean).join(' ');
}

const PLACES = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'];

/** Digits of x from the left. */
const digitsOf = (x: number) => String(x).split('').map(Number);

/** A number with `len` digits, all different, none zero. */
function distinctNumber(rng: Rng, len: number): number {
  const ds = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], len);
  return Number(ds.join(''));
}

// ---------------------------------------------------------------------------
// 1.1 Place value
// ---------------------------------------------------------------------------

const PV_HINT = 'Count the places from the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands.';

const SMALL_CTX: Ctx[] = [
  (x) => `A bakery made ${x} buns this month.`,
  (x, name) => `${name}’s phone has ${x} photos on it.`,
  (x, _n, town) => `A hotel in ${town} washed ${x} towels last month.`,
  (x) => `A warehouse has ${x} boxes on its shelves.`,
  (x, name) => `${name}’s car needs an oil change in ${x} km.`,
  (x, _n, town) => `A coffee shop in ${town} sold ${x} cups of coffee last week.`,
];
const BIG_CTX: Ctx[] = [
  (x, _n, town) => `A used truck for sale in ${town} has ${x} km on its odometer.`,
  (x, _n, town) => `The crowd at a summer fair in ${town} was ${x} people.`,
  (x) => `A family farm harvested ${x} kg of potatoes.`,
  (x) => `A warehouse shipped ${x} boxes this year.`,
  (x, name) => `${name} walked ${x} steps last month.`,
  (x, _n, town) => `A grocery store in ${town} sold ${x} litres of milk this year.`,
];

function digitValue(rng: Rng, d: Difficulty): Out {
  const len = d === 1 ? 4 : rng.int(5, 6);
  const x = distinctNumber(rng, len);
  const pos = d === 1 ? rng.int(1, 3) : rng.int(2, len - 1);
  const digit = digitsOf(x)[len - 1 - pos];
  const value = digit * 10 ** pos;
  const ctx = rng.pick(d === 1 ? SMALL_CTX : BIG_CTX)(n$(x), rng.pick(NAMES), rng.pick(TOWNS));
  return {
    prompt: `${ctx} What is the **value** of the digit $${digit}$ in $${N(x)}$?`,
    parts: [whole(value)],
    hints: [PV_HINT, `Find the place of the $${digit}$. Its value is the digit times that place. For example, a $4$ in the hundreds place is worth $4 ${T} 100 = 400$.`],
    solution: [
      `Count the places from the right in $${N(x)}$: ${digitsOf(x).map((g, i) => `$${g}$ is in the ${PLACES[len - 1 - i]} place`).reverse().slice(0, Math.min(len, pos + 1)).join(', ')}.`,
      `So the $${digit}$ is in the **${PLACES[pos]}** place.`,
      `Its value is $${digit} ${T} ${N(10 ** pos)} = ${N(value)}$.`,
      `The digit $${digit}$ is worth $${N(value)}$.`,
    ],
  };
}

function namePlace(rng: Rng): Out {
  const x = distinctNumber(rng, 4);
  const pos = rng.int(0, 3);
  const digit = digitsOf(x)[3 - pos];
  const ctx = rng.pick(SMALL_CTX)(n$(x), rng.pick(NAMES), rng.pick(TOWNS));
  const others = [0, 1, 2, 3].filter((p) => p !== pos).map((p) => cap(PLACES[p]));
  return {
    prompt: `${ctx} In the number $${N(x)}$, which place is the digit $${digit}$ in?`,
    parts: [{ answer: mc(rng, cap(PLACES[pos]), others) }],
    hints: [PV_HINT, 'Start at the right end of the number and point to each digit as you say its place.'],
    solution: [
      `From the right: ${digitsOf(x).map((g, i) => `$${g}$ is in the ${PLACES[3 - i]} place`).reverse().join(', ')}.`,
      `The digit $${digit}$ is in the **${PLACES[pos]}** place.`,
    ],
  };
}

function expandedToStandard(rng: Rng, d: Difficulty): Out {
  let ds: number[];
  if (d === 1) ds = digitsOf(distinctNumber(rng, 4));
  else {
    const len = rng.int(5, 6);
    ds = [rng.int(1, 9), ...Array.from({ length: len - 1 }, () => rng.int(1, 9))];
    const zeros = rng.sample(Array.from({ length: len - 1 }, (_, i) => i + 1), rng.int(1, 2));
    for (const z of zeros) ds[z] = 0;
  }
  const len = ds.length;
  const x = Number(ds.join(''));
  const terms = ds.map((g, i) => g * 10 ** (len - 1 - i)).filter((v) => v > 0);
  const missing = ds.map((g, i) => (g === 0 ? PLACES[len - 1 - i] : '')).filter(Boolean);
  const name = rng.pick(NAMES);
  const intro = rng.pick(
    d === 1
      ? [
          `${name} counted the cans at a food bank and wrote the total in expanded form:`,
          `A farmer wrote the number of hay bales stacked this season in expanded form:`,
          `${name} wrote the number of kilometres on a new delivery van in expanded form:`,
          `A cashier wrote the number of coffees sold this month in expanded form:`,
        ]
      : [
          `${name} wrote the number of kilometres on a delivery van in expanded form:`,
          `A dairy wrote the number of litres of milk it sold this year in expanded form:`,
          `A provincial park wrote its number of visitors this year in expanded form:`,
          `A warehouse wrote the number of boxes it shipped this year in expanded form:`,
        ],
  );
  return {
    prompt: `${intro} $${terms.map(N).join(' + ')}$. Write the number in **standard form** (the usual way, with digits).`,
    parts: [whole(x)],
    hints: [
      'Each part of the sum gives one digit. $3000$ means a $3$ in the thousands place.',
      d === 1 ? 'Write the digits in place value order: thousands, hundreds, tens, ones.' : 'If a place is missing from the sum, put a $0$ in that place.',
    ],
    solution: [
      ...terms.map((t) => {
        const p = String(t).length - 1;
        return `$${N(t)}$ means a $${t / 10 ** p}$ in the ${PLACES[p]} place.`;
      }),
      ...(missing.length ? [`There is nothing in the ${missing.join(' or the ')} place, so write a $0$ there.`] : []),
      `In standard form, the number is $${N(x)}$.`,
    ],
  };
}

const CHEQUE_FOR = ['a used car', 'a used snowmobile', 'a month of rent and a damage deposit', 'a used tractor', 'a set of winter tires and repairs', 'a used boat', 'a welding course'];

function wordsToStandard(rng: Rng): Out {
  const len = rng.int(4, 5);
  const ds = [rng.int(1, 9), ...Array.from({ length: len - 1 }, () => rng.int(1, 9))];
  const zeros = rng.sample(Array.from({ length: len - 1 }, (_, i) => i + 1), rng.int(1, 2));
  for (const z of zeros) ds[z] = 0;
  const x = Number(ds.join(''));
  const th = Math.floor(x / 1000);
  const r = x % 1000;
  const name = rng.pick(NAMES);
  const wordsText = cap(words(x));
  const missing = ds.map((g, i) => (g === 0 ? PLACES[len - 1 - i] : '')).filter(Boolean);
  return {
    prompt: `${name} writes a cheque for ${rng.pick(CHEQUE_FOR)}. On the cheque, the amount in words is: **${wordsText} dollars**. What is the amount written with digits?`,
    parts: [whole(x, undefined, '\\$')],
    hints: [
      'Split the words at the word "thousand". The words before it tell you how many thousands.',
      'Write the thousands, then the hundreds, tens and ones. Put a $0$ in any place that is not named.',
    ],
    solution: [
      `"${cap(words(th))} thousand" is $${N(th * 1000)}$.`,
      ...(r ? [`"${cap(under1000(r))}" is $${r}$.`, `Add them: $${N(th * 1000)} + ${r} = ${N(x)}$.`] : []),
      `Check the places that are not named: the ${missing.join(' and the ')} place${missing.length > 1 ? 's get' : ' gets'} a $0$.`,
      `The amount is ${money(x)}.`,
    ],
  };
}

const ORDER_CTX = [
  { intro: 'Four used trucks are for sale. Their odometers show these distances in kilometres.', unit: 'km', item: 'Truck', what: 'has been driven the farthest', least: 'has been driven the least' },
  { intro: 'Four friends counted their steps for one week.', unit: 'steps', item: 'Friend', what: 'walked the most steps', least: 'walked the fewest steps' },
  { intro: 'Four warehouses counted the boxes they shipped this year.', unit: 'boxes', item: 'Warehouse', what: 'shipped the most boxes', least: 'shipped the fewest boxes' },
  { intro: 'Four farms weighed their potato harvest in kilograms.', unit: 'kg', item: 'Farm', what: 'harvested the most potatoes', least: 'harvested the fewest potatoes' },
];

/** Four close numbers for ordering: three share their first two digits, one is a decoy. */
function closeNumbers(rng: Rng): { values: number[]; decoy: number; kind: 'short' | 'low' | 'high'; prefix: number } {
  const prefix = rng.int(2, 8) * 10 + rng.int(1, 8);
  const [x, y, z] = rng.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
  const rest = [x * 100 + y * 10 + z, y * 100 + (rng.chance(0.5) ? x * 10 + z : z * 10 + x), z * 100 + x * 10 + y];
  const values = rest.map((r) => prefix * 1000 + r);
  const kind = rng.pick(['short', 'low', 'high'] as const);
  let decoy: number;
  if (kind === 'short') decoy = Number(`${rng.int(Math.floor(prefix / 10) + 1, 9)}${rng.int(1, 9)}${rng.int(0, 9)}${rng.int(0, 9)}`);
  else decoy = (prefix + (kind === 'low' ? -1 : 1)) * 1000 + rng.pick(rest);
  return { values: [...values, decoy], decoy, kind, prefix };
}

function orderExplain(o: ReturnType<typeof closeNumbers>, sorted: number[]): string[] {
  const steps: string[] = [];
  const three = o.values.filter((v) => v !== o.decoy).sort((a, b) => a - b);
  if (o.kind === 'short') {
    steps.push(`Count the digits first. $${N(o.decoy)}$ has only $4$ digits, so it is the smallest. A number with more digits is always larger.`);
  } else {
    const td = Math.floor(o.prefix / 10);
    steps.push(
      `All four numbers have $5$ digits, so compare from the left. The ten thousands digits are all $${td}$. In the thousands place, $${N(o.decoy)}$ has a $${Math.floor(o.decoy / 1000) % 10}$ and the others have a $${o.prefix % 10}$, so $${N(o.decoy)}$ is the ${o.kind === 'low' ? 'smallest' : 'largest'}.`,
    );
  }
  steps.push(
    `The other three numbers all start with $${o.prefix}$ thousand, so compare their hundreds digits: ${three.map((v) => `$${N(v)}$ has $${Math.floor(v / 100) % 10}$`).join(', ')}.`,
  );
  steps.push(`From least to greatest: ${sorted.map(n$).join(', ')}.`);
  return steps;
}

function orderNumbers(rng: Rng): Out {
  const ctx = rng.pick(ORDER_CTX);
  const o = closeNumbers(rng);
  const shown = retry(
    () => rng.shuffle(o.values),
    (s) => s.some((v, i) => i > 0 && v < s[i - 1]),
  );
  const sorted = [...o.values].sort((a, b) => a - b);
  const items: Choice[] = shown.map((v, i) => ({ id: 'abcd'[i], md: `$${N(v)}$` }));
  const idOf = (v: number) => items[shown.indexOf(v)].id;
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map(idOf) };
  return {
    prompt: `${ctx.intro} Put the numbers in order from **least to greatest** (${ctx.unit}).`,
    parts: [{ answer }],
    hints: ['First count the digits. A number with more digits is larger.', 'If the numbers have the same number of digits, compare them place by place from the left. The first place where the digits are different decides.'],
    solution: orderExplain(o, sorted),
  };
}

function tableGreatest(rng: Rng): Out {
  const ctx = rng.pick(ORDER_CTX);
  const o = closeNumbers(rng);
  const shown = rng.shuffle(o.values);
  const labels = ['A', 'B', 'C', 'D'].map((l) => `${ctx.item} ${l}`);
  const most = rng.chance(0.5);
  const target = most ? Math.max(...shown) : Math.min(...shown);
  const correct = shown.indexOf(target);
  const sorted = [...o.values].sort((a, b) => a - b);
  return {
    prompt: `${ctx.intro} Which ${ctx.item.toLowerCase()} ${most ? ctx.what : ctx.least}?`,
    figure: { type: 'table', headers: [ctx.item, cap(ctx.unit === 'km' ? 'distance (km)' : ctx.unit === 'kg' ? 'harvest (kg)' : ctx.unit)], rows: shown.map((v, i) => [labels[i].split(' ')[1], plain(v)]) },
    parts: [{ answer: fixedChoice(labels, correct) }],
    hints: ['First count the digits. A number with more digits is larger.', 'If the numbers have the same number of digits, compare them place by place from the left.'],
    solution: [...orderExplain(o, sorted), `The ${most ? 'greatest' : 'least'} number is $${N(target)}$, so the answer is ${labels[correct]}.`],
  };
}

const placeValue = skill({
  id: 'm104-place-value',
  name: 'Place value',
  description: 'Find the value of a digit, write whole numbers in standard form from words or expanded form, and compare and order large numbers.',
  outcomes: ['N1'],
  lessonId: 'm104-1-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.pick([digitValue, digitValue, namePlace, expandedToStandard] as const)(rng, d);
    if (d === 2) return rng.pick([wordsToStandard, wordsToStandard, expandedToStandard, digitValue] as const)(rng, d);
    return rng.chance(0.6) ? orderNumbers(rng) : tableGreatest(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.1 Rounding
// ---------------------------------------------------------------------------

const PLACE_WORD: Record<number, string> = { 10: 'ten', 100: 'hundred', 1000: 'thousand' };
const ROUND_HINT = 'Look at the digit just to the **right** of the place you are rounding to. If it is $5$ or more, round up. If it is $4$ or less, round down.';

function roundSteps(x: number, place: number): string[] {
  const lo = Math.floor(x / place) * place;
  const hi = lo + place;
  const right = Math.floor(x / (place / 10)) % 10;
  const r = roundPlace(x, place);
  return [
    `$${N(x)}$ is between $${N(lo)}$ and $${N(hi)}$.`,
    `The digit to the right of the ${PLACES[String(place).length - 1]} place is $${right}$. ${right >= 5 ? `It is $5$ or more, so round **up** to $${N(hi)}$.` : `It is $4$ or less, so round **down** to $${N(lo)}$.`}`,
    `$${N(x)}$ rounded to the nearest ${PLACE_WORD[place]} is $${N(r)}$.`,
  ];
}

const ROUND_SMALL: Ctx[] = [
  (x, _n, town) => `There are ${x} students at a high school in ${town}.`,
  (x, _n, town) => `${x} people came to a concert in ${town}.`,
  (x) => `A warehouse has ${x} boxes of paper towels.`,
  (x, name) => `${name}’s family drove ${x} km on a weekend trip.`,
  (x) => `A farmer stacked ${x} bales of hay.`,
];
const ROUND_BIG: Ctx[] = [
  (x, name) => `${name}’s truck has ${x} km on the odometer.`,
  (x, _n, town) => `A warehouse in ${town} shipped ${x} boxes this year.`,
  (x, _n, town) => `A poultry farm near ${town} has ${x} chickens.`,
  (x, _n, town) => `${x} visitors came to a summer festival in ${town}.`,
  (x, _n, town) => `A grocery store in ${town} sold ${x} litres of milk this month.`,
];

function roundBasic(rng: Rng, d: Difficulty): Out {
  let x: number;
  let place: number;
  if (d === 1) {
    place = rng.pick([10, 100]);
    x = retry(() => rng.int(101, 989), (v) => v % place !== 0);
  } else {
    place = rng.pick([10, 100, 1000]);
    const lo = place === 10 ? 1000 : place === 100 ? 1000 : 10000;
    x = retry(() => rng.int(lo + 1, lo * 10 - 1), (v) => v % place !== 0);
    if (rng.chance(0.35)) {
      // Rounding up carries into the next place (3962 -> 4000).
      const s = digitsOf(x);
      const i = s.length - String(place).length; // index of the rounding digit
      if (i > 0) {
        s[i] = 9;
        s[i + 1] = rng.int(5, 9);
        x = Number(s.join(''));
      }
    }
  }
  const useCtx = d === 2 || rng.chance(0.5);
  const ctx = useCtx ? `${rng.pick(d === 1 ? ROUND_SMALL : ROUND_BIG)(n$(x), rng.pick(NAMES), rng.pick(TOWNS))} ` : '';
  const figure: Figure | undefined =
    d === 1
      ? {
          type: 'numberLine',
          min: Math.floor(x / place) * place,
          max: Math.floor(x / place) * place + place,
          step: place / 10,
          points: [{ value: x, label: String(x) }],
        }
      : undefined;
  return {
    prompt: `${ctx}Round $${N(x)}$ to the nearest **${PLACE_WORD[place]}**.`,
    figure,
    parts: [whole(roundPlace(x, place))],
    hints: [
      `Which two ${PLACE_WORD[place]}s is $${N(x)}$ between? Which one is it closer to?`,
      ROUND_HINT,
    ],
    solution: roundSteps(x, place),
  };
}

/** Which actual number could have been rounded to R? */
function roundWhich(rng: Rng): Out {
  const place = rng.pick([100, 1000]);
  const R = place === 100 ? rng.int(12, 89) * 100 : rng.int(12, 49) * 1000;
  const half = place / 2;
  const correct = R + rng.pick([-1, 1]) * rng.int(1, half - 1);
  const above = R + half + rng.int(1, half - 1);
  const below = R - half - rng.int(1, half - 1);
  const far = R + rng.pick([-1, 1]) * place * rng.int(2, 3) + rng.int(1, half - 1);
  const context = rng.pick([
    { who: `A news report says that ${n$(R)} people came to a rodeo in ${rng.pick(TOWNS)}.`, what: 'real crowd' },
    { who: `A used car ad in ${rng.pick(TOWNS)} says the car has about ${q(R, 'km')} on it.`, what: 'real odometer reading' },
    { who: `A food bank says it handed out about ${n$(R)} meals this year.`, what: 'real number of meals' },
    { who: `A hockey arena says about ${n$(R)} fans came to the playoff games.`, what: 'real number of fans' },
  ]);
  const opts = [correct, above, below, far];
  const sorted = [...opts].sort((a, b) => a - b);
  return {
    prompt: `${context.who} The number was rounded to the nearest **${PLACE_WORD[place]}**. Which of these could be the ${context.what}?`,
    parts: [{ answer: mc(rng, n$(correct), [above, below, far].map(n$)) }],
    hints: [
      `Round each choice to the nearest ${PLACE_WORD[place]}. Only one of them rounds to $${N(R)}$.`,
      `Numbers from $${N(R - half)}$ up to $${N(R + half - 1)}$ round to $${N(R)}$.`,
    ],
    solution: [
      ...sorted.map((v) => `$${N(v)}$ rounds to $${N(roundPlace(v, place))}$.`),
      `Only $${N(correct)}$ rounds to $${N(R)}$, so it could be the ${context.what}.`,
    ],
  };
}

/** Add two counts, then round the total. */
function roundTotal(rng: Rng): Out {
  const place = rng.pick([100, 1000]);
  const [a, b] = retry(
    () => [rng.int(2100, 9800), rng.int(2100, 9800)],
    ([u, v]) => (u + v) % place !== 0 && Math.abs(((u + v) % place) - place / 2) > place / 20,
  );
  const s = a + b;
  const [d1, d2] = rng.pick([
    ['Saturday', 'Sunday'],
    ['Friday', 'Saturday'],
    ['the first day', 'the second day'],
  ]);
  const ev = rng.pick([`a farmers’ market in ${rng.pick(TOWNS)}`, `a music festival in ${rng.pick(TOWNS)}`, 'a two-day rodeo', `a craft fair in ${rng.pick(TOWNS)}`]);
  return {
    prompt: `On ${d1}, ${n$(a)} people came to ${ev}. On ${d2}, ${n$(b)} people came. The organizers report the total crowd to the nearest **${PLACE_WORD[place]}**. What number do they report?`,
    parts: [whole(roundPlace(s, place), 'people')],
    hints: ['First add the two days to find the total crowd.', `Then round the total to the nearest ${PLACE_WORD[place]}. ${ROUND_HINT}`],
    solution: [`Total crowd: $${N(a)} + ${N(b)} = ${N(s)}$.`, ...roundSteps(s, place).slice(0, 2), `They report $${N(roundPlace(s, place))}$ people.`],
  };
}

const roundWhole = skill({
  id: 'm104-round-whole',
  name: 'Rounding whole numbers',
  description: 'Round whole numbers to the nearest ten, hundred or thousand and use rounded numbers in context.',
  outcomes: ['N1'],
  lessonId: 'm104-1-1',
  calculator: false,
  gen(rng, d) {
    if (d === 3) return rng.chance(0.5) ? roundWhich(rng) : roundTotal(rng);
    return roundBasic(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Whole-number operations
// ---------------------------------------------------------------------------

function opsBasic(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const op = rng.pick(['add', 'sub', 'mul', 'div'] as const);
  if (op === 'add') {
    if (d === 1) {
      const [a, b] = [rng.int(20, 80) * 5, rng.int(20, 80) * 5];
      const ctx = rng.pick([
        { s: `A grocery store in ${town} got ${n$(a)} cases of juice on Monday and ${n$(b)} cases on Tuesday. How many cases did it get in all?`, u: 'cases' },
        { s: `${name} stocked ${n$(a)} cans of soup in the morning and ${n$(b)} cans in the afternoon. How many cans did ${name} stock?`, u: 'cans' },
        { s: `A fast-food restaurant sold ${n$(a)} burgers at lunch and ${n$(b)} burgers at supper. How many burgers did it sell?`, u: 'burgers' },
      ]);
      return {
        prompt: ctx.s,
        parts: [whole(a + b, ctx.u)],
        hints: ['"In all" means put the amounts together. Which operation is that?', `Add: $${a} + ${b}$.`],
        solution: [`Putting amounts together means **add**.`, `$${a} + ${b} = ${a + b}$`, `The answer is $${a + b}$ ${ctx.u}.`],
      };
    }
    const vals = [rng.int(1100, 1900), rng.int(1100, 1900), rng.int(1100, 1900)];
    const sum = vals[0] + vals[1] + vals[2];
    const ctx = rng.pick([
      { s: `A delivery driver in ${town} drove ${list(vals.map((v) => q(v, 'km')))} in three weeks. How many kilometres is that in all?`, u: 'km' },
      { s: `A coffee shop sold ${list(vals.map(n$))} cups of coffee in three weeks. How many cups did it sell in all?`, u: 'cups' },
      { s: `A hotel in ${town} washed ${list(vals.map(n$))} towels in three months. How many towels is that?`, u: 'towels' },
    ]);
    return {
      prompt: ctx.s,
      parts: [whole(sum, ctx.u)],
      hints: ['"In all" means add.', 'Add the first two numbers, then add the third.'],
      solution: [`Putting amounts together means **add**.`, `$${N(vals[0])} + ${N(vals[1])} = ${N(vals[0] + vals[1])}$`, `$${N(vals[0] + vals[1])} + ${N(vals[2])} = ${N(sum)}$`, `The total is $${N(sum)}$ ${ctx.u}.`],
    };
  }
  if (op === 'sub') {
    if (d === 1) {
      const a = rng.int(4, 9) * 100;
      const b = retry(() => rng.int(11, a / 10 - 6) * 5, (v) => v % 100 !== 0);
      const ctx = rng.pick([
        { s: `A warehouse had ${n$(a)} boxes. It shipped ${n$(b)} boxes today. How many boxes are left?`, u: 'boxes' },
        { s: `${name} needs to stack ${n$(a)} chairs for an event in ${town}. ${cap(name)} has stacked ${n$(b)} so far. How many are left to stack?`, u: 'chairs' },
        { s: `A school ordered ${n$(a)} T-shirts for a fun run. ${n$(b)} were handed out. How many are left?`, u: 'T-shirts' },
      ]);
      return {
        prompt: ctx.s,
        parts: [whole(a - b, ctx.u)],
        hints: ['"How many are left" means take away. Which operation is that?', `Subtract: $${a} - ${b}$.`],
        solution: [`Taking away means **subtract**.`, `$${a} - ${b} = ${a - b}$`, `There are $${a - b}$ ${ctx.u} left.`],
      };
    }
    const start = rng.int(20000, 95000);
    const dist = rng.int(410, 1980);
    const end = start + dist;
    return {
      prompt: `At the start of a trip from ${town}, ${name}’s odometer read ${q(start, 'km')}. At the end of the trip, it read ${q(end, 'km')}. How far did ${name} drive?`,
      parts: [whole(dist, 'km')],
      hints: ['The distance driven is the difference between the two readings.', `Subtract the start reading from the end reading.`],
      solution: [`The distance is the **difference**, so subtract.`, `$${N(end)} - ${N(start)} = ${N(dist)}$`, `${name} drove $${N(dist)}\\ ${tx('km')}$.`],
    };
  }
  if (op === 'mul') {
    if (d === 1) {
      const k = rng.int(3, 9);
      const ctx = rng.pick([
        { per: [6, 12, 24], s: (per: number) => `Each case holds ${n$(per)} cans of juice. How many cans are in ${n$(k)} cases?`, u: 'cans' },
        { per: [12, 18], s: (per: number) => `A carton holds ${n$(per)} eggs. A restaurant kitchen gets ${n$(k)} cartons. How many eggs is that?`, u: 'eggs' },
        { per: [6, 8, 12], s: (per: number) => `Each pack has ${n$(per)} rolls of paper towel. ${name} puts ${n$(k)} packs on the shelf. How many rolls is that?`, u: 'rolls' },
      ]);
      const per = rng.pick(ctx.per);
      return {
        prompt: ctx.s(per),
        parts: [whole(per * k, ctx.u)],
        hints: ['You have several equal groups. Which operation finds the total of equal groups?', `Multiply: $${k} ${T} ${per}$.`],
        solution: [`Equal groups means **multiply**.`, `$${k} ${T} ${per} = ${per * k}$`, `There are $${per * k}$ ${ctx.u}.`],
      };
    }
    const k = rng.int(105, 480);
    const ctx = rng.pick([
      { per: [24, 72], s: (per: number) => `A pallet holds ${n$(per)} boxes. A warehouse in ${town} has ${n$(k)} full pallets. How many boxes are there?`, u: 'boxes' },
      { per: [40, 56], s: (per: number) => `A bus seats ${n$(per)} people. A tour company runs ${n$(k)} full bus trips this summer. How many people is that?`, u: 'people' },
      { per: [18, 48], s: (per: number) => `A case holds ${n$(per)} bottles of hand soap. A cleaning company orders ${n$(k)} cases this year. How many bottles is that?`, u: 'bottles' },
    ]);
    const per = rng.int(ctx.per[0], ctx.per[1]);
    return {
      prompt: ctx.s(per),
      parts: [whole(per * k, ctx.u)],
      hints: ['Equal groups means multiply.', `Multiply: $${k} ${T} ${per}$. A calculator is fine.`],
      solution: [`Equal groups means **multiply**.`, `$${k} ${T} ${per} = ${N(per * k)}$`, `There are $${N(per * k)}$ ${ctx.u}.`],
    };
  }
  // division, exact
  if (d === 1) {
    const per = rng.pick([4, 5, 6, 8]);
    const k = rng.int(6, 15);
    const ctx = rng.pick([
      { s: `A baker packs ${n$(per * k)} muffins into boxes of ${n$(per)}. How many boxes does the baker fill?`, u: 'boxes' },
      { s: `${n$(per * k)} students sign up for a ball hockey tournament. Each team has ${n$(per)} players. How many teams are there?`, u: 'teams' },
      { s: `${name} puts ${n$(per * k)} chairs around tables, ${n$(per)} chairs at each table. How many tables is that?`, u: 'tables' },
    ]);
    return {
      prompt: ctx.s,
      parts: [whole(k, ctx.u)],
      hints: ['You are sharing into equal groups. Which operation is that?', `Divide: $${per * k} ${D} ${per}$.`],
      solution: [`Splitting into equal groups means **divide**.`, `$${per * k} ${D} ${per} = ${k}$`, `The answer is $${k}$ ${ctx.u}.`],
    };
  }
  const per = rng.pick([12, 15, 18, 24, 36, 48]);
  const k = rng.int(35, 160);
  const ctx = rng.pick([
    { s: `A bottling plant packs ${n$(per * k)} bottles into cases of ${n$(per)}. How many cases does it fill?`, u: 'cases' },
    { s: `A grocery store got ${n$(per * k)} cans of soup in boxes of ${n$(per)}. How many boxes was that?`, u: 'boxes' },
    { s: `A landscaping company bought ${n$(per * k)} plants in trays of ${n$(per)}. How many trays was that?`, u: 'trays' },
  ]);
  return {
    prompt: ctx.s,
    parts: [whole(k, ctx.u)],
    hints: ['Splitting into equal groups means divide.', `Divide: $${N(per * k)} ${D} ${per}$. A calculator is fine.`],
    solution: [`Splitting into equal groups means **divide**.`, `$${N(per * k)} ${D} ${per} = ${k}$`, `The answer is $${k}$ ${ctx.u}.`],
  };
}

/** Division with a remainder that must be interpreted. */
function opsRemainder(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['down', 'up', 'both'] as const);
  if (kind === 'up') {
    const c = rng.pick([
      { seats: 12, thing: 'van', things: 'vans', who: 'people are going to a hockey tournament', town: true },
      { seats: 48, thing: 'school bus', things: 'school buses', who: 'students are going on a field trip', town: true },
      { seats: 8, thing: 'table', things: 'tables', who: 'guests are coming to a wedding supper', town: false },
      { seats: 6, thing: 'car', things: 'cars', who: 'players are driving to a soccer game', town: true },
    ]);
    const total = retry(() => rng.int(c.seats * 3 + 1, c.seats * 14), (v) => v % c.seats >= 2);
    const full = Math.floor(total / c.seats);
    const rem = total - full * c.seats;
    const town = rng.pick(TOWNS);
    return {
      prompt: `${n$(total)} ${c.who}${c.town ? ` in ${town}` : ''}. Each ${c.thing} holds ${n$(c.seats)} people. How many ${c.things} are needed so that everyone has a seat?`,
      parts: [whole(full + 1, c.things)],
      hints: [`Divide the number of people by $${c.seats}$.`, `If there is a remainder, those people still need a seat. Round **up**.`],
      solution: [
        `Divide: $${total} ${D} ${c.seats} = ${full}$ remainder $${rem}$ (a calculator shows about $${(total / c.seats).toFixed(2)}$).`,
        `$${full}$ full ${c.things} seat $${full * c.seats}$ people. The other $${rem}$ people need one more ${c.thing}.`,
        `So round up: $${full} + 1 = ${full + 1}$.`,
        `$${full + 1}$ ${c.things} are needed.`,
      ],
    };
  }
  const c = rng.pick([
    { per: 12, item: 'eggs', box: 'carton', boxes: 'cartons', job: 'works on an egg farm' },
    { per: 24, item: 'bottles of water', box: 'case', boxes: 'cases', job: 'works at a warehouse' },
    { per: 8, item: 'cookies', box: 'box', boxes: 'boxes', job: 'works at a bakery' },
    { per: 6, item: 'cans of pop', box: 'six-pack', boxes: 'six-packs', job: 'works at a grocery store' },
    { per: 15, item: 'tomato plants', box: 'tray', boxes: 'trays', job: 'works at a greenhouse' },
  ]);
  const total = retry(() => rng.int(c.per * 8 + 1, c.per * 30), (v) => v % c.per >= 2);
  const full = Math.floor(total / c.per);
  const rem = total - full * c.per;
  const setup = `${name} ${c.job}. ${name} puts ${n$(total)} ${c.item} into ${c.boxes}, with ${n$(c.per)} in each ${c.box}.`;
  const steps = [
    `Divide: $${total} ${D} ${c.per} = ${full}$ remainder $${rem}$ (a calculator shows about $${(total / c.per).toFixed(2)}$).`,
    `$${full}$ ${c.boxes} hold $${full} ${T} ${c.per} = ${full * c.per}$ ${c.item}.`,
  ];
  if (kind === 'down') {
    return {
      prompt: `${setup} How many **full** ${c.boxes} can ${name} fill?`,
      parts: [whole(full, c.boxes)],
      hints: [`Divide $${total}$ by $${c.per}$.`, 'The remainder is not enough to fill another one. Round **down**.'],
      solution: [...steps, `The $${rem}$ left over cannot fill a ${c.box}, so round down.`, `${name} can fill $${full}$ ${c.boxes}.`],
    };
  }
  return {
    prompt: `${setup} How many **full** ${c.boxes} can ${name} fill, and how many ${c.item} are left over?`,
    parts: [whole(full, c.boxes, 'Full'), whole(rem, c.item, 'Left over')],
    hints: [`Divide $${total}$ by $${c.per}$. The whole-number part is the number of full ${c.boxes}.`, `To find what is left over, multiply the full ${c.boxes} by $${c.per}$ and subtract from $${total}$.`],
    solution: [...steps, `Left over: $${total} - ${full * c.per} = ${rem}$.`, `${name} fills $${full}$ ${c.boxes}, with $${rem}$ ${c.item} left over.`],
  };
}

const wholeOps = skill({
  id: 'm104-whole-ops',
  name: 'Whole-number operations',
  description: 'Add, subtract, multiply and divide whole numbers in everyday and workplace problems, and interpret a remainder.',
  outcomes: ['N2'],
  lessonId: 'm104-1-2',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return opsRemainder(rng);
    return opsBasic(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Order of operations
// ---------------------------------------------------------------------------

type Ex = { tex: string; steps: string[]; value: number };

const MUL_FIRST = 'Multiply and divide before you add and subtract.';
const L2R = 'When the operations are the same kind, work from left to right.';

function exD1(rng: Rng): Ex {
  const t = rng.int(0, 6);
  if (t === 0) {
    const [a, b, c] = [rng.int(2, 20), rng.int(2, 9), rng.int(2, 9)];
    return { tex: `${a} + ${b} ${T} ${c}`, steps: [`Multiply first: $${b} ${T} ${c} = ${b * c}$.`, `Then add: $${a} + ${b * c} = ${a + b * c}$.`], value: a + b * c };
  }
  if (t === 1) {
    const [a, b] = [rng.int(2, 9), rng.int(2, 9)];
    const c = rng.int(1, a * b - 1);
    return { tex: `${a} ${T} ${b} - ${c}`, steps: [`Multiply first: $${a} ${T} ${b} = ${a * b}$.`, `Then subtract: $${a * b} - ${c} = ${a * b - c}$.`], value: a * b - c };
  }
  if (t === 2) {
    const [b, c] = [rng.int(2, 6), rng.int(2, 6)];
    const a = rng.int(b * c + 1, b * c + 25);
    return { tex: `${a} - ${b} ${T} ${c}`, steps: [`Multiply first: $${b} ${T} ${c} = ${b * c}$.`, `Then subtract: $${a} - ${b * c} = ${a - b * c}$.`], value: a - b * c };
  }
  if (t === 3) {
    const [a, b, c] = [rng.int(1, 9), rng.int(1, 9), rng.int(2, 6)];
    return { tex: `(${a} + ${b}) ${T} ${c}`, steps: [`Brackets first: $${a} + ${b} = ${a + b}$.`, `Then multiply: $${a + b} ${T} ${c} = ${(a + b) * c}$.`], value: (a + b) * c };
  }
  if (t === 4) {
    const c = rng.int(2, 9);
    const k = rng.int(2, 9);
    const a = rng.int(1, 20);
    return { tex: `${a} + ${c * k} ${D} ${c}`, steps: [`Divide first: $${c * k} ${D} ${c} = ${k}$.`, `Then add: $${a} + ${k} = ${a + k}$.`], value: a + k };
  }
  if (t === 5) {
    const a = rng.int(2, 9);
    const b = rng.int(5, 15);
    const c = rng.int(1, b - 1);
    return { tex: `${a} ${T} (${b} - ${c})`, steps: [`Brackets first: $${b} - ${c} = ${b - c}$.`, `Then multiply: $${a} ${T} ${b - c} = ${a * (b - c)}$.`], value: a * (b - c) };
  }
  const a = rng.int(12, 30);
  const b = rng.int(2, a - 2);
  const c = rng.int(2, 15);
  return { tex: `${a} - ${b} + ${c}`, steps: [`There are only $-$ and $+$, so work from left to right.`, `$${a} - ${b} = ${a - b}$, then $${a - b} + ${c} = ${a - b + c}$.`], value: a - b + c };
}

function exD2(rng: Rng): Ex {
  const t = rng.int(0, 6);
  if (t === 0) {
    const [a, b, c] = [rng.int(5, 30), rng.int(2, 9), rng.int(2, 9)];
    const d = rng.int(1, a + b * c - 1);
    const v1 = a + b * c;
    return {
      tex: `${a} + ${b} ${T} ${c} - ${d}`,
      steps: [`Multiply first: $${b} ${T} ${c} = ${b * c}$. Now it is $${a} + ${b * c} - ${d}$.`, `Add and subtract from left to right: $${a} + ${b * c} = ${v1}$, then $${v1} - ${d} = ${v1 - d}$.`],
      value: v1 - d,
    };
  }
  if (t === 1) {
    const b = rng.int(2, 15);
    const a = rng.int(b + 1, b + 9);
    const [c, d] = [rng.int(2, 9), rng.int(1, 20)];
    return {
      tex: `(${a} - ${b}) ${T} ${c} + ${d}`,
      steps: [`Brackets first: $${a} - ${b} = ${a - b}$. Now it is $${a - b} ${T} ${c} + ${d}$.`, `Multiply next: $${a - b} ${T} ${c} = ${(a - b) * c}$.`, `Then add: $${(a - b) * c} + ${d} = ${(a - b) * c + d}$.`],
      value: (a - b) * c + d,
    };
  }
  if (t === 2) {
    const [a, b, c, d] = [rng.int(2, 9), rng.int(2, 9), rng.int(2, 9), rng.int(2, 9)];
    return {
      tex: `${a} ${T} ${b} + ${c} ${T} ${d}`,
      steps: [`Do both multiplications first: $${a} ${T} ${b} = ${a * b}$ and $${c} ${T} ${d} = ${c * d}$.`, `Then add: $${a * b} + ${c * d} = ${a * b + c * d}$.`],
      value: a * b + c * d,
    };
  }
  if (t === 3) {
    const b = rng.int(2, 9);
    const k = rng.int(2, 9);
    const [c, d] = [rng.int(2, 9), rng.int(2, 9)];
    return {
      tex: `${b * k} ${D} ${b} + ${c} ${T} ${d}`,
      steps: [`Divide and multiply first: $${b * k} ${D} ${b} = ${k}$ and $${c} ${T} ${d} = ${c * d}$.`, `Then add: $${k} + ${c * d} = ${k + c * d}$.`],
      value: k + c * d,
    };
  }
  if (t === 4) {
    const d = rng.int(2, 5);
    const a = d * rng.int(2, 4);
    const [b, c] = [rng.int(1, 9), rng.int(1, 9)];
    const s = b + c;
    return {
      tex: `${a} ${T} (${b} + ${c}) ${D} ${d}`,
      steps: [`Brackets first: $${b} + ${c} = ${s}$. Now it is $${a} ${T} ${s} ${D} ${d}$.`, `Multiply and divide from left to right: $${a} ${T} ${s} = ${a * s}$, then $${a * s} ${D} ${d} = ${(a * s) / d}$.`],
      value: (a * s) / d,
    };
  }
  if (t === 5) {
    const c = rng.int(2, 6);
    const k = rng.int(2, 6);
    const d = rng.int(2, 5);
    const a = rng.int(k * d + 1, k * d + 30);
    return {
      tex: `${a} - ${c * k} ${D} ${c} ${T} ${d}`,
      steps: [`Divide and multiply from left to right: $${c * k} ${D} ${c} = ${k}$, then $${k} ${T} ${d} = ${k * d}$.`, `Then subtract: $${a} - ${k * d} = ${a - k * d}$.`],
      value: a - k * d,
    };
  }
  const d = rng.int(2, 6);
  const s = d * rng.int(2, 6);
  const b = rng.int(1, s - 1);
  const c = s - b;
  const a = rng.int(s / d + 1, s / d + 30);
  return {
    tex: `${a} - (${b} + ${c}) ${D} ${d}`,
    steps: [`Brackets first: $${b} + ${c} = ${s}$. Now it is $${a} - ${s} ${D} ${d}$.`, `Divide next: $${s} ${D} ${d} = ${s / d}$.`, `Then subtract: $${a} - ${s / d} = ${a - s / d}$.`],
    value: a - s / d,
  };
}

type Shop = { place: string; a: Array<[string, number[]]>; b: Array<[string, number[]]> };
const SHOPS: Shop[] = [
  { place: 'a downtown coffee shop', a: [['coffees', [2, 3, 4]], ['lattes', [4, 5, 6]], ['hot chocolates', [2, 3, 4]]], b: [['muffins', [2, 3]], ['cookies', [1, 2]], ['bagels', [2, 3]]] },
  { place: 'a hardware store', a: [['boxes of screws', [4, 5, 6, 7]], ['paint brushes', [6, 8, 9]], ['rolls of tape', [3, 4, 5]]], b: [['pairs of work gloves', [8, 9, 12]], ['packs of sandpaper', [5, 6, 7]]] },
  { place: 'a burger place', a: [['burgers', [6, 7, 8, 9]], ['wraps', [7, 8, 9]]], b: [['drinks', [2, 3]], ['orders of fries', [3, 4]]] },
  { place: 'the snack bar at a hockey arena', a: [['hot dogs', [3, 4, 5]], ['slices of pizza', [3, 4, 5]]], b: [['bottles of water', [2, 3]], ['bags of popcorn', [3, 4]]] },
  { place: 'a farmers’ market', a: [['jars of honey', [8, 9, 10, 12]], ['loaves of bread', [5, 6, 7]]], b: [['bunches of carrots', [3, 4]], ['cartons of eggs', [5, 6, 7]]] },
];

function receipt(rng: Rng): Out {
  const shop = rng.pick(SHOPS);
  const [an, ap] = rng.pick(shop.a);
  const [bn, bp] = rng.pick(shop.b);
  const name = rng.pick(NAMES);
  const kind = rng.pick(['plain', 'coupon', 'split'] as const);
  let a: number, b: number, p: number, q2: number, k = 1, c = 0;
  do {
    a = rng.int(2, 6);
    b = rng.int(2, 6);
    p = rng.pick(ap);
    q2 = rng.pick(bp);
    k = rng.int(2, 4);
    c = rng.pick([2, 3, 5]);
  } while (a === b || p === q2 || (kind === 'split' && (a * p + b * q2) % k !== 0) || (kind === 'coupon' && a * p + b * q2 <= c + 5));
  const sub = a * p + b * q2;
  let correct: string, wrong: string[], value: number, ask: string, label: string;
  const base = `${a} ${T} ${p} + ${b} ${T} ${q2}`;
  const buy = `buys $${a}$ ${an} at ${money(p)} each and $${b}$ ${bn} at ${money(q2)} each`;
  const steps = [`Multiply first: $${a} ${T} ${p} = ${a * p}$ and $${b} ${T} ${q2} = ${b * q2}$.`, `Add: $${a * p} + ${b * q2} = ${sub}$.`];
  if (kind === 'plain') {
    correct = base;
    wrong = [`${a} + ${p} ${T} ${b} + ${q2}`, `(${a} + ${b}) ${T} (${p} + ${q2})`, `${a} ${T} ${p} ${T} ${b} ${T} ${q2}`];
    value = sub;
    ask = 'What is the total cost?';
    label = 'Total: \\$';
  } else if (kind === 'coupon') {
    correct = `${base} - ${c}`;
    wrong = [`${base} + ${c}`, `(${a} + ${b}) ${T} (${p} + ${q2}) - ${c}`, `${a} + ${p} ${T} ${b} + ${q2} - ${c}`];
    value = sub - c;
    ask = `${name} also uses a coupon for ${money(c)} off. What is the total cost?`;
    label = 'Total: \\$';
    steps.push(`Subtract the coupon: $${sub} - ${c} = ${value}$.`);
  } else {
    correct = `(${base}) ${D} ${k}`;
    wrong = [`${base} ${D} ${k}`, `(${a} + ${b}) ${T} (${p} + ${q2}) ${D} ${k}`, `${base} ${T} ${k}`];
    value = sub / k;
    ask = `${name} and ${k === 2 ? 'a friend' : `${k - 1} friends`} split the bill equally. How much does each person pay?`;
    label = 'Each: \\$';
    steps.push(`The brackets say to find the whole bill first. Then divide: $${sub} ${D} ${k} = ${value}$.`);
  }
  return {
    prompt: `${name} ${buy} at ${shop.place}. ${ask}`,
    parts: [
      { label: 'Expression', answer: mc(rng, `$${correct}$`, wrong.map((w) => `$${w}$`)) },
      whole(value, undefined, label),
    ],
    hints: ['Cost of one kind of item = number bought × price each. Do this for each item, then combine.', `${MUL_FIRST} Work out anything in brackets first.`],
    solution: [`The expression is $${correct}$.`, ...steps, kind === 'split' ? `Each person pays ${money(value)}.` : `The total cost is ${money(value)}.`],
  };
}

const orderOps = skill({
  id: 'm104-order-ops',
  name: 'Order of operations',
  description: 'Evaluate whole-number expressions using the order of operations: brackets, then multiplication and division, then addition and subtraction, each from left to right.',
  outcomes: ['N2'],
  lessonId: 'm104-1-2',
  calculator: false,
  gen(rng, d) {
    if (d === 3) return receipt(rng);
    const e = d === 1 ? exD1(rng) : exD2(rng);
    return {
      prompt: `Find the value of $${e.tex}$.`,
      parts: [whole(e.value)],
      hints: ['Order of operations: **B**rackets, then × and ÷ from left to right, then + and − from left to right.', `${MUL_FIRST} ${L2R}`],
      solution: [...e.steps, `The value of $${e.tex}$ is $${e.value}$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.3 Estimating
// ---------------------------------------------------------------------------

/** Multiple choice of estimates where the correct estimate is strictly the closest to the exact answer. */
function estimateChoices(rng: Rng, exact: number, correct: number, distractors: number[], fmtv: (v: number) => string): AnswerSpec | null {
  const ds = [...new Set(distractors.filter((v) => v > 0 && Number.isInteger(v) && v !== correct))];
  if (ds.length < 2) return null;
  if (ds.some((v) => Math.abs(v - exact) <= Math.abs(correct - exact))) return null;
  return mc(rng, fmtv(correct), ds.map(fmtv));
}

function estimateAddSub(rng: Rng): Out {
  for (let tries = 0; tries < 200; tries++) {
    const big = rng.chance(0.5);
    const unit = big ? 100 : 10;
    const gen = () => (big ? rng.int(110, 980) : rng.int(12, 98));
    const ok = (v: number) => v % unit !== 0 && Math.floor(v / (unit / 10)) % 10 !== 5;
    let a = gen();
    let b = gen();
    if (!ok(a) || !ok(b)) continue;
    const add = rng.chance(0.5);
    if (!add && a < b) [a, b] = [b, a];
    const ra = roundPlace(a, unit);
    const rb = roundPlace(b, unit);
    if (!add && ra - rb <= 0) continue;
    const exact = add ? a + b : a - b;
    const E = add ? ra + rb : ra - rb;
    const wrongOp = add ? Math.abs(ra - rb) : ra + rb;
    const name = rng.pick(NAMES);
    const isMoney = rng.chance(0.5);
    const fmtv = (v: number) => (isMoney ? `about ${money(v)}` : `about $${N(v)}$`);
    const spec = estimateChoices(rng, exact, E, [E * 10, wrongOp, E + 2 * unit, E / 10], fmtv);
    if (!spec) continue;
    const [thingA, thingB, spend] = big ? rng.pick([['a couch', 'a table', 'a new phone'], ['a used bike', 'a winter coat', 'car repairs'], ['a fridge', 'a stove', 'a used laptop']]) : rng.pick([['a jacket', 'boots', 'groceries'], ['a hoodie', 'running shoes', 'a phone bill'], ['a pizza', 'a movie ticket', 'gas']]);
    const prompt = isMoney
      ? add
        ? `${name} buys ${thingA} for ${money(a)} and ${thingB} for ${money(b)}. Which is the best estimate of the total cost?`
        : `${name} has ${money(a)} and spends ${money(b)} on ${spend}. Which is the best estimate of the money left?`
      : add
        ? `Which is the best estimate of $${a} + ${b}$?`
        : `Which is the best estimate of $${a} - ${b}$?`;
    return {
      prompt,
      parts: [{ answer: spec }],
      hints: [`Round each number to the nearest ${PLACE_WORD[unit]}.`, `Then ${add ? 'add' : 'subtract'} the rounded numbers in your head.`],
      solution: [
        `Round: $${a} \\approx ${ra}$ and $${b} \\approx ${rb}$.`,
        `${add ? 'Add' : 'Subtract'}: $${ra} ${add ? '+' : '-'} ${rb} = ${E}$.`,
        `The best estimate is about ${isMoney ? money(E) : `$${N(E)}$`}.`,
      ],
    };
  }
  throw new Error('estimateAddSub failed');
}

function estimateMulDiv(rng: Rng): Out {
  const name = rng.pick(NAMES);
  for (let tries = 0; tries < 200; tries++) {
    if (rng.chance(0.55)) {
      const c = rng.pick([
        { a: [12, 48], b: [21, 950], s: (a: number, b: number) => `A case holds ${n$(a)} cans. About how many cans are in ${n$(b)} cases?`, u: 'cans' },
        { a: [12, 48], b: [11, 39], s: (a: number, b: number) => `A hotel has ${n$(a)} rooms on each floor and ${n$(b)} floors. About how many rooms does it have?`, u: 'rooms' },
        { a: [16, 29], b: [31, 89], s: (a: number, b: number) => `${name} earns ${money(a)} an hour and works ${n$(b)} hours this month. About how much does ${name} earn?`, u: '$' },
        { a: [21, 89], b: [11, 99], s: (a: number, b: number) => `A field has ${n$(b)} rows with ${n$(a)} hay bales in each row. About how many bales are there?`, u: 'bales' },
      ]);
      const a = rng.int(c.a[0], c.a[1]);
      const b = rng.int(c.b[0], c.b[1]);
      if (a % 10 === 0 || a % 10 === 5 || b % 10 === 0 || b % 10 === 5) continue;
      if (b > 100 && Math.floor(b / 10) % 10 === 5) continue;
      const ra = est(a);
      const rb = est(b);
      const exact = a * b;
      const E = ra * rb;
      if (!near(exact, E, 0.7, 1.4)) continue;
      const fmtv = (v: number) => (c.u === '$' ? `about ${money(v)}` : `about $${N(v)}$`);
      const spec = estimateChoices(rng, exact, E, [E * 10, E / 10, ra + rb], fmtv);
      if (!spec) continue;
      return {
        prompt: `${c.s(a, b)} Choose the best estimate.`,
        parts: [{ answer: spec }],
        hints: ['Round each number to its first digit, with zeros after it.', 'Multiply the first digits, then put back all the zeros.'],
        solution: [
          `Round: $${N(a)} \\approx ${N(ra)}$ and $${N(b)} \\approx ${N(rb)}$.`,
          `Multiply: $${N(ra)} ${T} ${N(rb)} = ${N(E)}$.`,
          `The best estimate is ${fmtv(E)}.`,
        ],
      };
    }
    const dv = rng.int(3, 9);
    const k = rng.int(2, 9);
    const scale = rng.pick([10, 100]);
    const off = rng.int(-4, 4) * (scale / 10) + rng.int(1, scale / 10 - 1);
    const total = dv * k * scale + off;
    if (Math.abs(off) < 2) continue;
    const exact = total / dv;
    const E = k * scale;
    const roundTotal = dv * k * scale;
    const c = rng.pick([
      { s: `A truck driver drives ${q(total, 'km')} in ${n$(dv)} days, the same distance each day. About how far does the driver go each day?`, u: 'km' },
      { s: `A school raised ${money(total)} to share equally among ${n$(dv)} clubs. About how much does each club get?`, u: '$' },
      { s: `A farm packs ${n$(total)} kg of carrots into ${n$(dv)} equal bins. About how many kilograms go in each bin?`, u: 'kg' },
    ]);
    const fmtv = (v: number) => (c.u === '$' ? `about ${money(v)}` : c.u === 'km' ? `about ${q(v, 'km')}` : `about ${q(v, 'kg')}`);
    const spec = estimateChoices(rng, exact, E, [E * 10, E / 10, roundTotal * dv], fmtv);
    if (!spec) continue;
    return {
      prompt: `${c.s} Choose the best estimate.`,
      parts: [{ answer: spec }],
      hints: [`Change $${N(total)}$ to a nearby number that is easy to divide by $${dv}$.`, `Think: $${N(roundTotal)} ${D} ${dv}$ is easy because $${dv * k} ${D} ${dv} = ${k}$.`],
      solution: [
        `$${N(total)}$ is close to $${N(roundTotal)}$, which divides evenly by $${dv}$.`,
        `$${N(roundTotal)} ${D} ${dv} = ${N(E)}$.`,
        `The best estimate is ${fmtv(E)}.`,
      ],
    };
  }
  throw new Error('estimateMulDiv failed');
}

function reasonable(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const mode = rng.pick(['ok', 'big', 'small'] as const);
  if (rng.chance(0.5)) {
    const [a, b] = retry(
      () => [rng.int(31, 89), rng.int(31, 89)],
      ([x, y]) => x % 10 !== 0 && x % 10 !== 5 && y % 10 !== 0 && y % 10 !== 5 && near(x * y, est(x) * est(y), 0.78, 1.28),
    );
    const ra = est(a);
    const rb = est(b);
    const E = ra * rb;
    const exact = a * b;
    const shown = mode === 'ok' ? exact : mode === 'big' ? exact * 10 : Math.round(exact / 10);
    const c = rng.pick([
      `A warehouse has $${a}$ pallets with $${b}$ boxes on each pallet. ${name} uses a calculator to find the number of boxes and gets $${N(shown)}$.`,
      `A parking lot has $${a}$ rows with $${b}$ spaces in each row. ${name}’s calculator says there are $${N(shown)}$ spaces.`,
      `A greenhouse has $${a}$ trays with $${b}$ seedlings in each tray. ${name}’s calculator says there are $${N(shown)}$ seedlings.`,
    ]);
    const ex = `$${ra} ${T} ${rb} = ${N(E)}$`;
    const correct = mode === 'ok' ? `Yes. The estimate is ${ex}, and $${N(shown)}$ is close to it.` : `No. The estimate is ${ex}, so the answer should be close to $${N(E)}$, not $${N(shown)}$.`;
    const wrong =
      mode === 'ok'
        ? [`No. The estimate is $${ra} ${T} ${rb} = ${N(E * 10)}$, so $${N(shown)}$ is too small.`, `No. The estimate is $${ra} + ${rb} = ${ra + rb}$, so $${N(shown)}$ is too big.`, `No. The answer should be a round number like $${N(E)}$.`]
        : [`Yes. The estimate is $${ra} ${T} ${rb} = ${N(mode === 'big' ? E * 10 : E / 10)}$, and $${N(shown)}$ is close to it.`, 'Yes. A calculator answer is always right.', `No. The answer should be close to $${ra + rb}$, because $${ra} + ${rb} = ${ra + rb}$.`];
    return {
      prompt: `${c} Is this answer reasonable?`,
      parts: [{ answer: mc(rng, correct, wrong) }],
      hints: ['Round each number to the nearest ten and multiply in your head.', 'Compare your estimate with the calculator answer. Are they about the same size?'],
      solution: [
        `Round: $${a} \\approx ${ra}$ and $${b} \\approx ${rb}$.`,
        `Estimate: ${ex}.`,
        mode === 'ok' ? `$${N(shown)}$ is close to $${N(E)}$, so it is reasonable.` : `$${N(shown)}$ is about ${mode === 'big' ? '$10$ times too big' : '$10$ times too small'}. ${name} probably pressed a wrong key.`,
        mode === 'ok' ? 'Yes, the answer is reasonable.' : 'No, the answer is not reasonable.',
      ],
    };
  }
  // A sum of three amounts
  const vals = retry(
    () => [rng.int(210, 890), rng.int(210, 890), rng.int(210, 890)],
    (vs) => vs.every((v) => v % 100 !== 0 && Math.floor(v / 10) % 10 !== 5) && near(vs[0] + vs[1] + vs[2], vs.reduce((s, v) => s + roundPlace(v, 100), 0), 0.88, 1.13),
  );
  const rs = vals.map((v) => roundPlace(v, 100));
  const E = rs[0] + rs[1] + rs[2];
  const exact = vals[0] + vals[1] + vals[2];
  const shown = mode === 'ok' ? exact : mode === 'big' ? exact + 9 * vals[0] : exact - vals[2];
  const c = rng.pick([
    { s: `${name} drove ${list(vals.map((v) => q(v, 'km')))} on three days of a road trip from ${rng.pick(TOWNS)}. ${name} adds them on a calculator and gets ${q(shown, 'km')}.` },
    { s: `A food bank in ${rng.pick(TOWNS)} got ${list(vals.map(n$))} cans in three weeks. A volunteer adds them on a calculator and gets ${n$(shown)} cans.` },
    { s: `A kitchen used ${list(vals.map((v) => q(v, 'kg')))} of potatoes in three months. ${name} adds them on a calculator and gets ${q(shown, 'kg')}.` },
  ]);
  const ex = `$${rs.join(' + ')} = ${N(E)}$`;
  const correct = mode === 'ok' ? `Yes. The estimate is ${ex}, and $${N(shown)}$ is close to it.` : `No. The estimate is ${ex}, so the total should be close to $${N(E)}$, not $${N(shown)}$.`;
  const lowAll = vals.map((v) => Math.floor(v / 100) * 100);
  const wrong =
    mode === 'ok'
      ? [`No. The estimate is $${rs[0]} + ${rs[1]} = ${N(rs[0] + rs[1])}$, so $${N(shown)}$ is too big.`, `No. The answer should be a round number like $${N(E)}$.`, `No. The estimate is $${lowAll.join(' + ')} = ${N(lowAll[0] + lowAll[1] + lowAll[2])}$, so $${N(shown)}$ is too big.`]
      : [`Yes. $${N(shown)}$ is bigger than each of the three amounts, so it makes sense.`, 'Yes. A calculator answer is always right.', `No. The answer should be a round number like $${N(E)}$.`];
  return {
    prompt: `${c.s} Is this total reasonable?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['Round each amount to the nearest hundred and add in your head.', 'Compare your estimate with the calculator answer.'],
    solution: [
      `Round: ${vals.map((v, i) => `$${v} \\approx ${rs[i]}$`).join(', ')}.`,
      `Estimate: ${ex}.`,
      mode === 'ok' ? `$${N(shown)}$ is close to $${N(E)}$, so it is reasonable.` : `$${N(shown)}$ is far from $${N(E)}$. ${mode === 'big' ? 'A number was probably typed with an extra digit.' : 'One of the amounts was probably left out.'}`,
      mode === 'ok' ? 'Yes, the total is reasonable.' : 'No, the total is not reasonable.',
    ],
  };
}

const estimate = skill({
  id: 'm104-estimate',
  name: 'Estimating answers',
  description: 'Choose the best estimate for a sum, difference, product or quotient, and decide whether an answer is reasonable.',
  outcomes: ['N1'],
  lessonId: 'm104-1-3',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return estimateAddSub(rng);
    if (d === 2) return estimateMulDiv(rng);
    return reasonable(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Two-step word problems
// ---------------------------------------------------------------------------

type Prob = {
  prompt: string;
  answer: number;
  suffix?: string;
  label?: string;
  steps: [string, string];
  estimate: string;
  estValue: number;
  final: string;
  hint: string;
  extra?: string;
};

function probD1(rng: Rng, name: string, town: string): Prob {
  const t = rng.int(0, 3);
  if (t === 0) {
    const s = rng.pick([12, 24]);
    const p = rng.int(3, 6);
    const u = retry(() => rng.int(Math.ceil((s * p) / 3), Math.floor(s * p * 0.75)), (v) => v % 10 !== 0 && v % 10 !== 5);
    const left = s * p - u;
    const eu = est(u);
    return {
      prompt: `${name} buys ${n$(p)} cases of water for a soccer tournament in ${town}. Each case has ${n$(s)} bottles. The players drink ${n$(u)} bottles. How many bottles are left?`,
      answer: left,
      suffix: 'bottles',
      steps: [`There are $${p}$ equal cases, so **multiply**: $${p} ${T} ${s} = ${s * p}$ bottles.`, `Some bottles are used up, so **subtract**: $${s * p} - ${u} = ${left}$.`],
      estimate: `$${p} ${T} ${s} = ${s * p}$ is easy to do in your head, and $${s * p} - ${eu} = ${s * p - eu}$`,
      estValue: s * p - eu,
      final: `There are $${left}$ bottles left.`,
      hint: 'First find how many bottles there were in all. Then take away the ones that were used.',
    };
  }
  if (t === 1) {
    const per = rng.pick([12, 18, 24]);
    const n = rng.int(3, 6);
    const k = retry(() => rng.int(21, 69), (v) => v % 10 !== 0 && v % 10 !== 5);
    const tot = n * per + k;
    return {
      prompt: `A bakery in ${town} bakes ${n$(n)} trays of buns in the morning, with ${n$(per)} buns on each tray. In the afternoon, it bakes ${n$(k)} more buns. How many buns does it bake that day?`,
      answer: tot,
      suffix: 'buns',
      steps: [`Equal trays, so **multiply**: $${n} ${T} ${per} = ${n * per}$ buns.`, `More buns are added, so **add**: $${n * per} + ${k} = ${tot}$.`],
      estimate: `$${n} ${T} ${est(per)} = ${n * est(per)}$ and $${n * est(per)} + ${est(k)} = ${n * est(per) + est(k)}$`,
      estValue: n * est(per) + est(k),
      final: `The bakery bakes $${tot}$ buns.`,
      hint: 'First find the buns on all the trays. Then add the afternoon buns.',
    };
  }
  if (t === 2) {
    const k = rng.pick([2, 3, 4, 5]);
    const share = rng.int(12, 40) * 5;
    const spent = retry(() => rng.int(21, 89), (v) => v % 10 !== 0 && v % 10 !== 5);
    const raised = share * k + spent;
    return {
      prompt: `A school club raised ${money(raised)}. The club spent ${money(spent)} on supplies. It shares the rest equally among ${n$(k)} charities. How much does each charity get?`,
      answer: share,
      label: '\\$',
      steps: [`Money is spent, so **subtract**: $${raised} - ${spent} = ${share * k}$ dollars are left.`, `The rest is shared equally, so **divide**: $${share * k} ${D} ${k} = ${share}$.`],
      estimate: `$${est(raised)} - ${est(spent)} = ${est(raised) - est(spent)}$ and $${est(raised) - est(spent)} ${D} ${k} \\approx ${Math.round((est(raised) - est(spent)) / k)}$`,
      estValue: Math.round((est(raised) - est(spent)) / k),
      final: `Each charity gets ${money(share)}.`,
      hint: 'First find the money left after the supplies. Then share it equally.',
    };
  }
  const tray = rng.pick([6, 8, 12]);
  const trays = rng.int(6, 12);
  const a = retry(() => rng.int(Math.ceil(tray * trays * 0.35), Math.floor(tray * trays * 0.65)), (v) => v % 10 !== 0 && v % 10 !== 5 && v * 2 !== tray * trays);
  const b = tray * trays - a;
  return {
    prompt: `A café sold ${n$(a)} muffins in the morning and ${n$(b)} in the afternoon. The muffins were baked on trays of ${n$(tray)}. How many trays of muffins were sold?`,
    answer: trays,
    suffix: 'trays',
    steps: [`Put the two amounts together, so **add**: $${a} + ${b} = ${a + b}$ muffins.`, `Split into equal trays, so **divide**: $${a + b} ${D} ${tray} = ${trays}$.`],
    estimate: `$${est(a)} + ${est(b)} = ${est(a) + est(b)}$ and $${est(a) + est(b)} ${D} ${tray} \\approx ${Math.round((est(a) + est(b)) / tray)}$`,
    estValue: Math.round((est(a) + est(b)) / tray),
    final: `The café sold $${trays}$ trays of muffins.`,
    hint: 'First find the total number of muffins. Then find how many groups of that tray size there are.',
  };
}

function probD2(rng: Rng, name: string, town: string): Prob {
  const t = rng.int(0, 4);
  if (t === 0) {
    const per = rng.int(24, 64);
    const pal = rng.int(12, 38);
    const out = rng.int(Math.ceil(per * pal * 0.2), Math.floor(per * pal * 0.6));
    const left = per * pal - out;
    return {
      prompt: `A warehouse in ${town} receives ${n$(pal)} pallets with ${n$(per)} boxes on each pallet. That afternoon, ${n$(out)} boxes are shipped out. How many boxes are left?`,
      answer: left,
      suffix: 'boxes',
      steps: [`Equal pallets, so **multiply**: $${pal} ${T} ${per} = ${N(per * pal)}$ boxes.`, `Boxes are shipped out, so **subtract**: $${N(per * pal)} - ${N(out)} = ${N(left)}$.`],
      estimate: `$${est(pal)} ${T} ${est(per)} = ${N(est(pal) * est(per))}$ and $${N(est(pal) * est(per))} - ${N(est(out))} = ${N(est(pal) * est(per) - est(out))}$`,
      estValue: est(pal) * est(per) - est(out),
      final: `There are $${N(left)}$ boxes left.`,
      hint: 'First find the number of boxes on all the pallets. Then take away the boxes shipped out.',
    };
  }
  if (t === 1) {
    const day = rng.int(210, 480);
    const days = rng.int(3, 6);
    const sat = rng.int(110, 290);
    const tot = day * days + sat;
    return {
      prompt: `A truck driver from ${town} drives ${q(day, 'km')} each day for ${n$(days)} days. On Saturday, the driver drives another ${q(sat, 'km')}. How far does the driver go in all?`,
      answer: tot,
      suffix: 'km',
      steps: [`The same distance each day, so **multiply**: $${days} ${T} ${day} = ${N(day * days)}$ km.`, `Saturday is extra, so **add**: $${N(day * days)} + ${sat} = ${N(tot)}$.`],
      estimate: `$${days} ${T} ${est(day)} = ${N(days * est(day))}$ and $${N(days * est(day))} + ${est(sat)} = ${N(days * est(day) + est(sat))}$`,
      estValue: days * est(day) + est(sat),
      final: `The driver goes $${N(tot)}\\ ${tx('km')}$ in all.`,
      hint: 'First find the distance for the days that are the same. Then add Saturday.',
    };
  }
  if (t === 2) {
    const wage = rng.int(16, 24);
    const h1 = rng.int(4, 8);
    const h2 = rng.int(5, 9);
    const pay = wage * (h1 + h2);
    const job = rng.pick(['a grocery store', 'a hotel', 'a car wash', 'a garden centre', 'a hardware store']);
    return {
      prompt: `${name} works at ${job} and earns ${money(wage)} per hour. ${name} works ${n$(h1)} hours on Friday and ${n$(h2)} hours on Saturday. How much does ${name} earn for the two days?`,
      answer: pay,
      label: '\\$',
      steps: [`Put the hours together, so **add**: $${h1} + ${h2} = ${h1 + h2}$ hours.`, `Each hour pays the same, so **multiply**: $${h1 + h2} ${T} ${wage} = ${pay}$.`],
      estimate: `$${h1 + h2} ${T} ${est(wage)} = ${(h1 + h2) * est(wage)}$`,
      estValue: (h1 + h2) * est(wage),
      final: `${name} earns ${money(pay)}.`,
      hint: 'First find the total hours. Then multiply by the pay for one hour.',
    };
  }
  if (t === 3) {
    const box = rng.pick([24, 36, 48, 72, 144]);
    const rooms = rng.pick([8, 12, 16, 18, 24]);
    const boxes = rng.int(4, 12);
    if ((box * boxes) % rooms !== 0) return probD2(rng, name, town);
    const each = (box * boxes) / rooms;
    return {
      prompt: `A school in ${town} buys ${n$(boxes)} boxes of pencils with ${n$(box)} pencils in each box. The pencils are shared equally among ${n$(rooms)} classrooms. How many pencils does each classroom get?`,
      answer: each,
      suffix: 'pencils',
      steps: [`Equal boxes, so **multiply**: $${boxes} ${T} ${box} = ${N(box * boxes)}$ pencils.`, `Shared equally, so **divide**: $${N(box * boxes)} ${D} ${rooms} = ${each}$.`],
      estimate: `$${boxes} ${T} ${est(box)} = ${N(boxes * est(box))}$ and $${N(boxes * est(box))} ${D} ${est(rooms)} \\approx ${Math.round((boxes * est(box)) / est(rooms))}$`,
      estValue: Math.round((boxes * est(box)) / est(rooms)),
      final: `Each classroom gets $${each}$ pencils.`,
      hint: 'First find the total number of pencils. Then share them equally.',
    };
  }
  const k = rng.int(3, 6);
  const share = rng.int(18, 60) * 10;
  const sup = rng.int(11, 39) * 10;
  const earned = share * k + sup;
  return {
    prompt: `A landscaping crew of ${n$(k)} people earns ${money(earned)} for a job in ${town}. They pay ${money(sup)} for supplies. Then they split the rest equally. How much does each person get?`,
    answer: share,
    label: '\\$',
    steps: [`The supplies are paid first, so **subtract**: $${N(earned)} - ${sup} = ${N(share * k)}$ dollars.`, `The rest is split equally, so **divide**: $${N(share * k)} ${D} ${k} = ${share}$.`],
    estimate: `$${N(est(earned))} - ${est(sup)} = ${N(est(earned) - est(sup))}$ and $${N(est(earned) - est(sup))} ${D} ${k} \\approx ${Math.round((est(earned) - est(sup)) / k)}$`,
    estValue: Math.round((est(earned) - est(sup)) / k),
    final: `Each person gets ${money(share)}.`,
    hint: 'First take away the cost of supplies. Then split what is left.',
  };
}

function probD3(rng: Rng, name: string, town: string): Prob {
  const t = rng.int(0, 3);
  if (t === 0) {
    const cls = rng.int(3, 6);
    const per = rng.int(22, 31);
    const seats = rng.pick([40, 48, 52]);
    const tot = cls * per;
    if (tot % seats === 0) return probD3(rng, name, town);
    const buses = Math.ceil(tot / seats);
    return {
      prompt: `${n$(cls)} classes from a school in ${town} go on a field trip. Each class has ${n$(per)} students. A school bus holds ${n$(seats)} students. How many buses are needed?`,
      answer: buses,
      suffix: 'buses',
      steps: [`Equal classes, so **multiply**: $${cls} ${T} ${per} = ${tot}$ students.`, `Split into busloads, so **divide**: $${tot} ${D} ${seats} = ${Math.floor(tot / seats)}$ remainder $${tot % seats}$.`],
      extra: `The $${tot % seats}$ extra students still need a seat, so round **up** to $${buses}$ buses.`,
      estimate: `$${cls} ${T} ${est(per)} = ${cls * est(per)}$ and $${cls * est(per)} ${D} ${est(seats)} \\approx ${+((cls * est(per)) / est(seats)).toFixed(1)}$, so about $${Math.ceil((cls * est(per)) / est(seats))}$ buses`,
      estValue: Math.ceil((cls * est(per)) / est(seats)),
      final: `$${buses}$ buses are needed.`,
      hint: 'Find the number of students first. If they do not fit exactly, you need one more bus.',
    };
  }
  if (t === 1) {
    const batch = rng.pick([36, 40, 45, 48, 54]);
    const nb = rng.int(3, 8);
    const box = rng.pick([8, 10, 12]);
    const tot = batch * nb;
    if (tot % box === 0) return probD3(rng, name, town);
    const full = Math.floor(tot / box);
    return {
      prompt: `${name} works at a bakery. ${name} bakes ${n$(nb)} batches of cookies with ${n$(batch)} cookies in each batch. The cookies are sold in boxes of ${n$(box)}. How many **full** boxes can ${name} pack?`,
      answer: full,
      suffix: 'boxes',
      steps: [`Equal batches, so **multiply**: $${nb} ${T} ${batch} = ${tot}$ cookies.`, `Pack into boxes, so **divide**: $${tot} ${D} ${box} = ${full}$ remainder $${tot % box}$.`],
      extra: `The $${tot % box}$ leftover cookies cannot fill a box, so round **down** to $${full}$.`,
      estimate: `$${nb} ${T} ${est(batch)} = ${nb * est(batch)}$ and $${nb * est(batch)} ${D} ${box} \\approx ${Math.round((nb * est(batch)) / box)}$`,
      estValue: Math.round((nb * est(batch)) / box),
      final: `${name} can pack $${full}$ full boxes.`,
      hint: 'Find the total number of cookies first. A box only counts if it is full.',
    };
  }
  if (t === 2) {
    const fee = rng.int(3, 9) * 10;
    const pass = rng.pick([12, 14, 15, 18]);
    const money0 = rng.int(15, 40) * 10;
    const rest = money0 - fee;
    if (rest % pass === 0 || rest < pass * 4) return probD3(rng, name, town);
    const nPass = Math.floor(rest / pass);
    const pr = Math.round(pass / 5) * 5;
    return {
      prompt: `${name} has ${money(money0)} to spend at a recreation centre in ${town}. A yearly membership costs ${money(fee)}. After paying for the membership, ${name} buys swim passes for ${money(pass)} each. How many passes can ${name} buy?`,
      answer: nPass,
      suffix: 'passes',
      steps: [`The membership is paid first, so **subtract**: $${money0} - ${fee} = ${rest}$ dollars left.`, `Find how many passes fit, so **divide**: $${rest} ${D} ${pass} = ${nPass}$ remainder $${rest % pass}$.`],
      extra: `There is not enough money left for another pass, so round **down** to $${nPass}$.`,
      estimate: `$${money0} - ${fee} = ${rest}$ is easy to do in your head, and $${rest} ${D} ${pr} \\approx ${Math.round(rest / pr)}$`,
      estValue: Math.round(rest / pr),
      final: `${name} can buy $${nPass}$ passes.`,
      hint: 'Take away the membership first. Then see how many passes the rest of the money buys.',
    };
  }
  const bag = rng.pick([20, 25, 30, 40]);
  const a = rng.int(310, 690);
  const b = rng.int(210, 590);
  const tot = a + b;
  if (tot % bag === 0) return probD3(rng, name, town);
  const bags = Math.ceil(tot / bag);
  return {
    prompt: `${name} is a landscaper in ${town}. A path needs ${q(a, 'kg')} of gravel and a patio needs ${q(b, 'kg')}. Gravel comes in ${q(bag, 'kg')} bags. How many bags must ${name} buy?`,
    answer: bags,
    suffix: 'bags',
    steps: [`Put the two jobs together, so **add**: $${a} + ${b} = ${tot}$ kg.`, `Split into bags, so **divide**: $${tot} ${D} ${bag} = ${Math.floor(tot / bag)}$ remainder $${tot % bag}$.`],
    extra: `${name} still needs the extra $${tot % bag}\\ ${tx('kg')}$, so round **up** to $${bags}$ bags.`,
    estimate: `$${est(a)} + ${est(b)} = ${est(a) + est(b)}$ and $${est(a) + est(b)} ${D} ${bag} \\approx ${Math.round((est(a) + est(b)) / bag)}$`,
    estValue: Math.round((est(a) + est(b)) / bag),
    final: `${name} must buy $${bags}$ bags.`,
    hint: 'Find the total gravel first. A part bag is not sold, so think about whether to round up or down.',
  };
}

const wholeProblem = skill({
  id: 'm104-whole-problem',
  name: 'Two-step word problems',
  description: 'Choose the operations that solve a two-step word problem, solve it, and check the answer with an estimate.',
  outcomes: ['N1', 'N2'],
  lessonId: 'm104-1-3',
  calculator: true,
  gen(rng, d) {
    let p: Prob;
    let guard = 0;
    do {
      const name = rng.pick(NAMES);
      const town = rng.pick(TOWNS);
      p = d === 1 ? probD1(rng, name, town) : d === 2 ? probD2(rng, name, town) : probD3(rng, name, town);
    } while (!near(p.answer, p.estValue, 0.8, 1.25) && ++guard < 100);
    return {
      prompt: p.prompt,
      parts: [whole(p.answer, p.suffix, p.label)],
      hints: [p.hint, 'Write down the operation for each step (add, subtract, multiply or divide) before you calculate.'],
      solution: [
        `Step 1: ${p.steps[0]}`,
        `Step 2: ${p.steps[1]}`,
        ...(p.extra ? [p.extra] : []),
        `Check with an estimate: ${p.estimate}. The answer is close to the estimate, so it is reasonable.`,
        p.final,
      ],
    };
  },
});

export const WHOLE_SKILLS: SkillDef[] = [placeValue, roundWhole, wholeOps, orderOps, estimate, wholeProblem];
