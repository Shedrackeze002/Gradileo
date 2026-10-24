/** Math 10-4 Unit 6 — Measurement (SS1, N2): SI units, rulers and tape measures, time and temperature. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { NumberLineFigure, Part, RulerFigure, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara',
  'Jordan',
  'Priya',
  'Mateo',
  'Aiyana',
  'Liam',
  'Mei',
  'Tariq',
  'Sofia',
  'Kwame',
  'Nadia',
  'Ethan',
  'Harpreet',
  'Noah',
  'Chloé',
  'Raj',
  'Leila',
  'Dakota',
  'Hiroshi',
  'Fatima',
  'Owen',
  'Jasmine',
  'Malik',
  'Isabelle',
  'Arjun',
  'Kateri',
  'Diego',
  'Ava',
  'Tyrone',
  'Simran',
  'Lucas',
  'Zainab',
  'Émile',
  'Thanh',
  'Gurpreet',
  'Maya',
  'Wyatt',
  'Ngozi',
  'Carlos',
  'Anika',
  'Kiona',
  'Marcus',
  'Rosa',
  'Yusuf',
];

const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

const tx = (u: string) => `\\text{${u}}`;

/** Group the integer part with thin spaces (SI style) when it has 5 or more digits. */
function grp(s: string): string {
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const digits = neg ? i.slice(1) : i;
  const g = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : digits;
  return `${neg ? '-' : ''}${g}${f !== undefined ? '.' + f : ''}`;
}

/** A number for use inside maths, without trailing zeros. */
const nm = (x: number, dp = 4) => grp(fmt(x, dp));
/** A measurement for use inside maths: 12\ \text{cm}. */
const ms = (x: number, u: string, dp = 4) => `${nm(x, dp)}\\ ${tx(u)}`;
/** A measurement as inline maths: $12\ \text{cm}$. */
const Q = (x: number, u: string, dp = 4) => `$${ms(x, u, dp)}$`;
const clean = (x: number) => roundTo(x, 9);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}

/** An exact numeric answer. Decimal answers keep their decimal form for display. */
function exact(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  const d = placesOf(v);
  if (d === 0) return numPart(v, { suffix, label });
  return numPart(v, { suffix, label, decimals: d, tolerance: 0.5 * 10 ** -d });
}

/** Money in prose: \$16.50. Never put this inside $...$. */
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;
const moneyPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });

// ---------------------------------------------------------------------------
// 6.1 Choosing units and estimating
// ---------------------------------------------------------------------------

type Kind = 'length' | 'mass' | 'capacity';

const UNIT_NAME: Record<string, string> = {
  mm: 'millimetres (mm)',
  cm: 'centimetres (cm)',
  m: 'metres (m)',
  km: 'kilometres (km)',
  g: 'grams (g)',
  kg: 'kilograms (kg)',
  mL: 'millilitres (mL)',
  L: 'litres (L)',
};

const UNIT_CHOICES: Record<Kind, string[]> = {
  length: ['mm', 'cm', 'm', 'km'],
  mass: ['g', 'kg', 'mL', 'L'],
  capacity: ['mL', 'L', 'g', 'kg'],
};

const KIND_WORD: Record<Kind, string> = {
  length: 'a length (how long, tall or far something is)',
  mass: 'a mass (how heavy something is)',
  capacity: 'a capacity (how much a container holds)',
};

const BEST_UNIT: Array<{ kind: Kind; u: string; thing: string; why: string }> = [
  {
    kind: 'length',
    u: 'mm',
    thing: 'the thickness of a bank card',
    why: 'A bank card is much thinner than $1\\ \\text{cm}$, so use the smallest unit.',
  },
  {
    kind: 'length',
    u: 'mm',
    thing: 'the thickness of a loonie',
    why: 'A loonie is only a few millimetres thick. Centimetres would give a tiny decimal.',
  },
  {
    kind: 'length',
    u: 'mm',
    thing: 'the length of a grain of rice',
    why: 'A grain of rice is shorter than $1\\ \\text{cm}$, so use millimetres.',
  },
  {
    kind: 'length',
    u: 'mm',
    thing: 'the thickness of a smartphone',
    why: 'A phone is about as thick as a pencil, which is less than $1\\ \\text{cm}$.',
  },
  {
    kind: 'length',
    u: 'cm',
    thing: 'the length of a pencil',
    why: 'A pencil is longer than a few millimetres but much shorter than a metre.',
  },
  {
    kind: 'length',
    u: 'cm',
    thing: 'the length of a smartphone',
    why: 'A phone fits in your hand. It is about $15\\ \\text{cm}$ long.',
  },
  {
    kind: 'length',
    u: 'cm',
    thing: 'the width of a book',
    why: 'A book is a few hand-widths across, which is a good size for centimetres.',
  },
  {
    kind: 'length',
    u: 'cm',
    thing: 'the length of a running shoe',
    why: 'A shoe is about $25$ to $30\\ \\text{cm}$ long.',
  },
  {
    kind: 'length',
    u: 'cm',
    thing: 'the height of a coffee mug',
    why: 'A mug is about $10\\ \\text{cm}$ tall.',
  },
  {
    kind: 'length',
    u: 'm',
    thing: 'the length of a school hallway',
    why: 'A hallway is many big steps long. One big step is about $1\\ \\text{m}$.',
  },
  {
    kind: 'length',
    u: 'm',
    thing: 'the height of a house',
    why: 'A house is a few door-heights tall. A door is about $2\\ \\text{m}$ tall.',
  },
  {
    kind: 'length',
    u: 'm',
    thing: 'the length of a swimming pool',
    why: 'A pool is about $25\\ \\text{m}$ long: too long for centimetres, too short for kilometres.',
  },
  {
    kind: 'length',
    u: 'm',
    thing: 'the width of a parking lot',
    why: 'You could pace it out in big steps, and a big step is about $1\\ \\text{m}$.',
  },
  {
    kind: 'length',
    u: 'm',
    thing: 'the length of a city bus',
    why: 'A city bus is about $12\\ \\text{m}$ long.',
  },
  {
    kind: 'length',
    u: 'km',
    thing: 'the distance between two cities',
    why: 'Long trips between towns are measured in kilometres.',
  },
  {
    kind: 'length',
    u: 'km',
    thing: 'the distance of a bus trip between two towns',
    why: 'Road distances between towns are measured in kilometres.',
  },
  {
    kind: 'length',
    u: 'km',
    thing: 'the distance a delivery truck drives in one day',
    why: 'A truck drives hundreds of kilometres in a day.',
  },
  {
    kind: 'length',
    u: 'km',
    thing: 'the length of a marathon race',
    why: 'A marathon is about $42\\ \\text{km}$. In metres the number would be huge.',
  },
  {
    kind: 'mass',
    u: 'g',
    thing: 'the mass of an apple',
    why: 'An apple is light. It is about $150\\ \\text{g}$.',
  },
  {
    kind: 'mass',
    u: 'g',
    thing: 'the mass of a slice of bread',
    why: 'A slice of bread is very light, so grams give a sensible number.',
  },
  {
    kind: 'mass',
    u: 'g',
    thing: 'the mass of a chocolate bar',
    why: 'A chocolate bar is about $50\\ \\text{g}$.',
  },
  {
    kind: 'mass',
    u: 'g',
    thing: 'the mass of a letter in an envelope',
    why: 'A letter is very light: only a few grams.',
  },
  {
    kind: 'mass',
    u: 'g',
    thing: 'the mass of a pencil',
    why: 'A pencil is very light: a few paper clips. A paper clip is about $1\\ \\text{g}$.',
  },
  {
    kind: 'mass',
    u: 'kg',
    thing: 'the mass of a bag of potatoes',
    why: 'A bag of potatoes is heavy. It is about $5$ or $10\\ \\text{kg}$.',
  },
  {
    kind: 'mass',
    u: 'kg',
    thing: 'the mass of a large dog',
    why: 'A large dog is heavy, about $30\\ \\text{kg}$.',
  },
  {
    kind: 'mass',
    u: 'kg',
    thing: 'the mass of a bag of dog food',
    why: 'A big bag of dog food is heavy, so use kilograms.',
  },
  {
    kind: 'mass',
    u: 'kg',
    thing: 'the mass of a car tire',
    why: 'A tire is heavy. In grams the number would be very large.',
  },
  {
    kind: 'mass',
    u: 'kg',
    thing: 'the mass of a sack of flour at a bakery',
    why: 'A sack of flour is heavy, about $20\\ \\text{kg}$.',
  },
  {
    kind: 'capacity',
    u: 'mL',
    thing: 'the amount of cough syrup in one dose',
    why: 'One dose is about a teaspoon, which is about $5\\ \\text{mL}$.',
  },
  {
    kind: 'capacity',
    u: 'mL',
    thing: 'the amount of coffee in a cup',
    why: 'A cup holds less than $1\\ \\text{L}$, so use millilitres.',
  },
  {
    kind: 'capacity',
    u: 'mL',
    thing: 'the amount of shampoo in a small hotel bottle',
    why: 'A small hotel bottle holds only a few spoonfuls.',
  },
  {
    kind: 'capacity',
    u: 'mL',
    thing: 'the amount of vanilla in a cookie recipe',
    why: 'A recipe uses about a teaspoon of vanilla, which is about $5\\ \\text{mL}$.',
  },
  {
    kind: 'capacity',
    u: 'mL',
    thing: 'the amount of pop in a can',
    why: 'A can of pop holds less than $1\\ \\text{L}$. It holds $355\\ \\text{mL}$.',
  },
  {
    kind: 'capacity',
    u: 'L',
    thing: 'the amount of water in a bathtub',
    why: 'A bathtub holds a lot of water: many big jugs.',
  },
  {
    kind: 'capacity',
    u: 'L',
    thing: 'the amount of gas in a car’s tank',
    why: 'A gas tank holds about $50\\ \\text{L}$. Gas is sold by the litre.',
  },
  {
    kind: 'capacity',
    u: 'L',
    thing: 'the amount of water in a mop bucket',
    why: 'A mop bucket holds several litres of water.',
  },
  {
    kind: 'capacity',
    u: 'L',
    thing: 'the amount of water in a hot tub',
    why: 'A hot tub holds over a thousand litres. In millilitres the number would be huge.',
  },
  {
    kind: 'capacity',
    u: 'L',
    thing: 'the amount of milk a coffee shop uses in a day',
    why: 'A busy coffee shop uses many jugs of milk. Each jug holds a few litres.',
  },
];

const REF_MASS = 'A paper clip has a mass of about $1\\ \\text{g}$. A $1\\ \\text{L}$ carton of milk has a mass of about $1\\ \\text{kg}$.';
const REF_LEN = 'A dime is about $1\\ \\text{mm}$ thick. Your little finger is about $1\\ \\text{cm}$ wide. A big step is about $1\\ \\text{m}$ long.';
const REF_CAP = 'A teaspoon holds about $5\\ \\text{mL}$. A carton of milk holds $1\\ \\text{L}$.';

const ESTIMATES: Array<{
  thing: string;
  right: string;
  wrong: string[];
  ref: string;
  why: string;
}> = [
  {
    thing: 'the mass of an apple',
    right: Q(150, 'g'),
    wrong: [Q(150, 'kg'), Q(15, 'kg'), Q(1.5, 'g')],
    ref: REF_MASS,
    why: 'An apple is much heavier than one paper clip, but much lighter than a carton of milk.',
  },
  {
    thing: 'the mass of a loaf of bread',
    right: Q(500, 'g'),
    wrong: [Q(500, 'kg'), Q(5, 'g'), Q(50, 'kg')],
    ref: REF_MASS,
    why: 'A loaf of bread is a bit lighter than a carton of milk, so it is less than $1\\ \\text{kg}$.',
  },
  {
    thing: 'the mass of a large dog',
    right: Q(30, 'kg'),
    wrong: [Q(30, 'g'), Q(300, 'kg'), Q(3, 'g')],
    ref: REF_MASS,
    why: 'A large dog is about as heavy as $30$ cartons of milk.',
  },
  {
    thing: 'the mass of a hockey puck',
    right: Q(170, 'g'),
    wrong: [Q(170, 'kg'), Q(17, 'kg'), Q(1.7, 'g')],
    ref: REF_MASS,
    why: 'A puck fits in your hand. It is lighter than a carton of milk but much heavier than a paper clip.',
  },
  {
    thing: 'the mass of a full school backpack',
    right: Q(8, 'kg'),
    wrong: [Q(8, 'g'), Q(80, 'g'), Q(800, 'kg')],
    ref: REF_MASS,
    why: 'A full backpack feels like several cartons of milk.',
  },
  {
    thing: 'the mass of a pickup truck',
    right: Q(2500, 'kg'),
    wrong: [Q(2500, 'g'), Q(25, 'kg'), Q(250, 'g')],
    ref: REF_MASS,
    why: 'A truck is very heavy: thousands of kilograms.',
  },
  {
    thing: 'the height of a door',
    right: Q(2, 'm'),
    wrong: [Q(2, 'cm'), Q(20, 'm'), Q(2, 'km')],
    ref: REF_LEN,
    why: 'A door is about two big steps tall.',
  },
  {
    thing: 'the length of a classroom',
    right: Q(10, 'm'),
    wrong: [Q(10, 'cm'), Q(10, 'km'), Q(100, 'm')],
    ref: REF_LEN,
    why: 'You can walk across a classroom in about $10$ big steps.',
  },
  {
    thing: 'the length of a car',
    right: Q(4.5, 'm'),
    wrong: [Q(4.5, 'cm'), Q(45, 'm'), Q(4.5, 'km')],
    ref: REF_LEN,
    why: 'A car is about four or five big steps long.',
  },
  {
    thing: 'the length of a new crayon',
    right: Q(9, 'cm'),
    wrong: [Q(9, 'mm'), Q(9, 'm'), Q(90, 'cm')],
    ref: REF_LEN,
    why: 'A crayon is about $9$ finger-widths long.',
  },
  {
    thing: 'the thickness of a slice of cheese',
    right: Q(2, 'mm'),
    wrong: [Q(2, 'cm'), Q(2, 'm'), Q(20, 'cm')],
    ref: REF_LEN,
    why: 'A slice of cheese is about as thick as two dimes.',
  },
  {
    thing: 'the distance you can walk in one hour',
    right: Q(5, 'km'),
    wrong: [Q(5, 'm'), Q(5, 'cm'), Q(500, 'km')],
    ref: `${REF_LEN} $1\\ \\text{km} = 1000\\ \\text{m}$.`,
    why: 'In one hour you take thousands of big steps, so the distance is a few kilometres.',
  },
  {
    thing: 'the capacity of a kitchen sink',
    right: Q(20, 'L'),
    wrong: [Q(20, 'mL'), Q(200, 'mL'), Q(2000, 'L')],
    ref: REF_CAP,
    why: 'A sink holds about $20$ cartons of milk.',
  },
  {
    thing: 'the amount of medicine in one teaspoon dose',
    right: Q(5, 'mL'),
    wrong: [Q(5, 'L'), Q(50, 'L'), Q(500, 'mL')],
    ref: REF_CAP,
    why: 'A teaspoon holds only about $5\\ \\text{mL}$.',
  },
  {
    thing: 'the capacity of a water bottle',
    right: Q(500, 'mL'),
    wrong: [Q(500, 'L'), Q(5, 'L'), Q(5, 'mL')],
    ref: REF_CAP,
    why: 'A water bottle holds about half as much as a $1\\ \\text{L}$ carton.',
  },
  {
    thing: 'the capacity of a bathtub',
    right: Q(200, 'L'),
    wrong: [Q(200, 'mL'), Q(20, 'mL'), Q(20000, 'L')],
    ref: REF_CAP,
    why: 'A bathtub holds about $200$ cartons of milk.',
  },
  {
    thing: 'the capacity of a coffee mug',
    right: Q(300, 'mL'),
    wrong: [Q(300, 'L'), Q(30, 'L'), Q(3, 'mL')],
    ref: REF_CAP,
    why: 'A mug holds less than a $1\\ \\text{L}$ carton, but much more than a teaspoon.',
  },
];

type RefItem = {
  prompt: string;
  right: string;
  wrong: string[];
  steps: string[];
};

const REF_ITEMS: Array<(rng: Rng, name: string) => RefItem> = [
  (rng, name) => {
    const n = rng.int(25, 90);
    const place = rng.pick(['the parking lot at the grocery store', 'the hotel lobby', 'the warehouse floor', 'the soccer field', 'the school gym']);
    return {
      prompt: `A big step is about $1\\ \\text{m}$ long. ${name} walks across ${place} in about $${n}$ big steps. About how far across is it?`,
      right: Q(n, 'm'),
      wrong: [Q(n, 'cm'), Q(n, 'km'), Q(n, 'mm')],
      steps: [`Each step is about $1\\ \\text{m}$, so $${n}$ steps is about $${n} \\times 1 = ${n}\\ \\text{m}$.`, `It is about ${Q(n, 'm')} across.`],
    };
  },
  (rng) => {
    const k = rng.int(3, 7);
    const thing = rng.pick(['the wall of a warehouse', 'a big spruce tree in the park', 'the side of a barn', 'an apartment building', 'the hay shed on a farm']);
    return {
      prompt: `A door is about $2\\ \\text{m}$ tall. ${cap(thing)} is about $${k}$ doors tall. About how tall is ${thing}?`,
      right: Q(2 * k, 'm'),
      wrong: [Q(k, 'm'), Q(2 * k, 'cm'), Q(20 * k, 'm')],
      steps: [`Each door is about $2\\ \\text{m}$ tall.`, `$${k} \\times 2 = ${2 * k}$`, `${cap(thing)} is about ${Q(2 * k, 'm')} tall.`],
    };
  },
  (rng) => {
    const n = rng.pick([100, 200, 250, 500]);
    return {
      prompt: `A paper clip has a mass of about $1\\ \\text{g}$. An office box holds $${n}$ paper clips. About what is the mass of the paper clips in the box?`,
      right: Q(n, 'g'),
      wrong: [Q(n, 'kg'), Q(n * 10, 'g'), Q(n / 10, 'g')],
      steps: [`Each clip is about $1\\ \\text{g}$, so $${n}$ clips is about $${n} \\times 1 = ${n}\\ \\text{g}$.`, `The paper clips have a mass of about ${Q(n, 'g')}.`],
    };
  },
  (rng) => {
    const each = rng.pick([300, 400, 500]);
    const n = rng.pick([6, 12, 24]);
    const total = each * n;
    const item = rng.pick(['can of soup', 'can of beans', 'jar of salsa', 'can of tomatoes']);
    return {
      prompt: `A ${item} has a mass of about ${Q(each, 'g')}. A case holds $${n}$ of them. About what is the mass of the case, in kilograms?`,
      right: Q(total / 1000, 'kg'),
      wrong: [Q(total / 1000, 'g'), Q(total / 100, 'kg'), Q(total / 10, 'g')],
      steps: [
        `$${n} \\times ${each} = ${nm(total)}$, so the case is about ${Q(total, 'g')}.`,
        `Change to kilograms: $1\\ \\text{kg} = 1000\\ \\text{g}$, so divide by $1000$: $${nm(total)} \\div 1000 = ${nm(total / 1000)}$`,
        `The case has a mass of about ${Q(total / 1000, 'kg')}.`,
      ],
    };
  },
  (rng) => {
    const k = rng.int(3, 9);
    const what = rng.pick(['vanilla for a big batch of muffins', 'salt for a pot of soup at a restaurant', 'baking powder for a big batch of pancakes']);
    return {
      prompt: `A teaspoon holds about $5\\ \\text{mL}$. A cook uses $${k}$ teaspoons of ${what}. About how much is that?`,
      right: Q(5 * k, 'mL'),
      wrong: [Q(5 * k, 'L'), Q(k, 'mL'), Q(50 * k, 'mL')],
      steps: [`Each teaspoon is about $5\\ \\text{mL}$.`, `$${k} \\times 5 = ${5 * k}$`, `That is about ${Q(5 * k, 'mL')}.`],
    };
  },
  (rng, name) => {
    const k = rng.int(4, 9);
    return {
      prompt: `A large jug of milk holds $4\\ \\text{L}$. The coffee shop where ${name} works uses about $${k}$ jugs of milk each day. About how much milk is that?`,
      right: Q(4 * k, 'L'),
      wrong: [Q(4 * k, 'mL'), Q(4 + k, 'L'), Q(40 * k, 'L')],
      steps: [`Each jug holds $4\\ \\text{L}$.`, `$${k} \\times 4 = ${4 * k}$`, `The shop uses about ${Q(4 * k, 'L')} of milk each day.`],
    };
  },
  (rng, name) => {
    const n = rng.int(35, 95);
    return {
      prompt: `Your little finger is about $1\\ \\text{cm}$ wide. ${name} measures a shelf and finds it is about $${n}$ finger-widths long. About how long is the shelf?`,
      right: Q(n, 'cm'),
      wrong: [Q(n, 'mm'), Q(n, 'm'), Q(n, 'km')],
      steps: [`Each finger-width is about $1\\ \\text{cm}$, so $${n}$ finger-widths is about $${n}\\ \\text{cm}$.`, `The shelf is about ${Q(n, 'cm')} long.`],
    };
  },
  (rng) => {
    const n = rng.pick([20, 30, 40, 50, 60, 80]);
    return {
      prompt: `A dime is about $1\\ \\text{mm}$ thick. A cashier stacks $${n}$ dimes. About how tall is the stack, in centimetres?`,
      right: Q(n / 10, 'cm'),
      wrong: [Q(n, 'cm'), Q(n / 10, 'm'), Q(n * 10, 'cm')],
      steps: [
        `$${n}$ dimes at about $1\\ \\text{mm}$ each is about $${n}\\ \\text{mm}$.`,
        `Change to centimetres: $10\\ \\text{mm} = 1\\ \\text{cm}$, so $${n} \\div 10 = ${nm(n / 10)}$`,
        `The stack is about ${Q(n / 10, 'cm')} tall.`,
      ],
    };
  },
];

const chooseUnit = skill({
  id: 'm104-choose-unit',
  name: 'Choosing units and estimating',
  description: 'Choose a sensible SI unit for a length, mass or capacity, and use referents to pick a reasonable estimate.',
  outcomes: ['SS1'],
  lessonId: 'm104-6-1',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const it = rng.pick(BEST_UNIT);
      const opts = UNIT_CHOICES[it.kind];
      return {
        prompt: `Which unit is best for measuring ${it.thing}?`,
        parts: [
          {
            answer: fixedChoice(
              opts.map((u) => UNIT_NAME[u]),
              opts.indexOf(it.u),
            ),
          },
        ],
        hints: [
          'Length (how long, tall or far) uses mm, cm, m or km. Mass (how heavy) uses g or kg. Capacity (how much a container holds) uses mL or L.',
          'Choose the unit that gives a sensible number: not a huge number and not a tiny decimal.',
        ],
        solution: [`${cap(it.thing)} is ${KIND_WORD[it.kind]}.`, it.why, `The best unit is ${UNIT_NAME[it.u]}.`],
      };
    }
    if (d === 2) {
      const it = rng.pick(ESTIMATES);
      return {
        prompt: `${it.ref} Which is the best estimate for ${it.thing}?`,
        parts: [{ answer: mc(rng, it.right, it.wrong) }],
        hints: ['Compare the object with the referents in the question.', 'Check both the number and the unit. A wrong unit can make an answer $1000$ times too big or too small.'],
        solution: [it.why, 'The other choices are far too big or far too small.', `The best estimate is ${it.right}.`],
      };
    }
    const it = rng.pick(REF_ITEMS)(rng, name);
    return {
      prompt: it.prompt,
      parts: [{ answer: mc(rng, it.right, it.wrong) }],
      hints: ['Use the referent: multiply the amount for one by how many there are.', 'Then check the unit. Does your answer make sense for the real object?'],
      solution: it.steps,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.1 Converting SI units
// ---------------------------------------------------------------------------

interface Conv {
  big: string;
  small: string;
  f: number;
  bigWord: string;
  smallWord: string;
  /** Sentences with {v} for the measurement. */
  bigThings: string[];
  smallThings: string[];
}

const CONVS: Conv[] = [
  {
    big: 'm',
    small: 'cm',
    f: 100,
    bigWord: 'metres',
    smallWord: 'centimetres',
    bigThings: ['A roll of ribbon is {v} long.', 'A shelf board is {v} long.', 'A hallway rug is {v} long.', 'A kitchen counter is {v} long.'],
    smallThings: ['A board is {v} long.', 'A curtain is {v} long.', 'A garden hose is {v} long.', 'A strip of carpet is {v} long.'],
  },
  {
    big: 'm',
    small: 'mm',
    f: 1000,
    bigWord: 'metres',
    smallWord: 'millimetres',
    bigThings: ['A piece of copper pipe is {v} long.', 'A steel rod is {v} long.'],
    smallThings: ['A piece of copper pipe is {v} long.', 'A piece of window trim is {v} long.'],
  },
  {
    big: 'cm',
    small: 'mm',
    f: 10,
    bigWord: 'centimetres',
    smallWord: 'millimetres',
    bigThings: ['A bolt is {v} long.', 'A wood screw is {v} long.', 'A nail is {v} long.', 'A strip of trim is {v} wide.'],
    smallThings: ['A bolt is {v} long.', 'A wood screw is {v} long.', 'A nail is {v} long.', 'A hair clip is {v} long.'],
  },
  {
    big: 'km',
    small: 'm',
    f: 1000,
    bigWord: 'kilometres',
    smallWord: 'metres',
    bigThings: ['A walking trail is {v} long.', 'A fun run is {v} long.', 'A bus route is {v} long.', 'A bike path is {v} long.'],
    smallThings: ['A walking trail is {v} long.', 'A fun run is {v} long.', 'The walk from home to work is {v}.', 'A bike path is {v} long.'],
  },
  {
    big: 'kg',
    small: 'g',
    f: 1000,
    bigWord: 'kilograms',
    smallWord: 'grams',
    bigThings: ['A bag of flour has a mass of {v}.', 'A bag of potatoes has a mass of {v}.', 'A box of nails has a mass of {v}.', 'A turkey has a mass of {v}.'],
    smallThings: ['A bag of rice has a mass of {v}.', 'A block of cheese has a mass of {v}.', 'A box of cereal has a mass of {v}.', 'A bag of trail mix has a mass of {v}.'],
  },
  {
    big: 'L',
    small: 'mL',
    f: 1000,
    bigWord: 'litres',
    smallWord: 'millilitres',
    bigThings: ['A jug holds {v} of juice.', 'A pot holds {v} of soup.', 'A bottle holds {v} of floor cleaner.', 'A watering can holds {v} of water.'],
    smallThings: ['A bottle holds {v} of shampoo.', 'A carton holds {v} of cream.', 'A bottle holds {v} of hand soap.', 'A jar holds {v} of pasta sauce.'],
  },
];

function convOut(rng: Rng, d: 1 | 2): GenOutput {
  const c = rng.pick(CONVS);
  const toSmall = rng.chance(0.55);
  let from: number;
  let to: number;
  if (toSmall) {
    if (d === 1) from = c.f === 10 ? rng.int(2, 15) : rng.int(2, 9);
    else if (c.f === 10)
      from = retry(
        () => rng.int(21, 149) / 10,
        (v) => !Number.isInteger(v),
      );
    else if (c.f === 100)
      from = retry(
        () => rng.int(105, 640) / 100,
        (v) => !Number.isInteger(v),
      );
    else
      from = retry(
        () => rng.pick([rng.int(11, 95) / 10, rng.int(105, 480) / 100, rng.int(1, 9) / 4]),
        (v) => !Number.isInteger(v),
      );
    to = clean(from * c.f);
  } else {
    if (d === 1) to = c.f === 10 ? rng.int(2, 15) : rng.int(2, 9);
    else if (c.f === 10)
      to = retry(
        () => rng.int(21, 149) / 10,
        (v) => !Number.isInteger(v),
      );
    else if (c.f === 100)
      to = retry(
        () => rng.int(35, 480) / 100,
        (v) => !Number.isInteger(v),
      );
    else
      to = retry(
        () => (rng.int(6, 190) * 25) / 1000,
        (v) => !Number.isInteger(v),
      );
    to = clean(to);
    from = clean(to * c.f);
  }
  const [fu, tu] = toSmall ? [c.big, c.small] : [c.small, c.big];
  const toWord = toSmall ? c.smallWord : c.bigWord;
  const thing = rng.pick(toSmall ? c.bigThings : c.smallThings).replace('{v}', Q(from, fu));
  const fact = `$1\\ ${tx(c.big)} = ${c.f}\\ ${tx(c.small)}$`;
  const op = toSmall ? '\\times' : '\\div';
  return {
    prompt: `${thing} How many ${toWord} is that?`,
    parts: [exact(to, tu)],
    hints: [
      `Remember: ${fact}.`,
      toSmall ? `You are changing to a smaller unit, so the number gets bigger. Multiply by $${c.f}$.` : `You are changing to a bigger unit, so the number gets smaller. Divide by $${c.f}$.`,
    ],
    solution: [
      toSmall
        ? `A ${c.smallWord.slice(0, -1)} is smaller than a ${c.bigWord.slice(0, -1)}, so there will be more of them. Multiply.`
        : `A ${c.bigWord.slice(0, -1)} is bigger than a ${c.smallWord.slice(0, -1)}, so there will be fewer of them. Divide.`,
      `${fact}, so ${toSmall ? 'multiply' : 'divide'} by $${c.f}$: $${nm(from)} ${op} ${c.f} = ${nm(to)}$`,
      `${Q(from, fu)} $= ${ms(to, tu)}$.`,
    ],
    calculator: d === 2,
  };
}

function convTask(rng: Rng, name: string): GenOutput {
  const kind = rng.pick(['board', 'liquid', 'boxes', 'laps', 'ribbon'] as const);
  if (kind === 'board') {
    const L = rng.pick([2.4, 3, 3.6, 4, 4.8, 5, 6]);
    const p = rng.int(5, 12) * 5;
    const total = Math.round(L * 100);
    const n = rng.int(Math.max(2, Math.floor(total / p) - 4), Math.floor((total - 5) / p));
    const used = n * p;
    const left = total - used;
    const what = rng.pick(['shelves', 'fence pickets', 'garden stakes', 'pieces of trim']);
    return {
      prompt: `${name} works for a construction crew. ${name} cuts $${n}$ ${what}, each ${Q(p, 'cm')} long, from a board that is ${Q(L, 'm')} long. How many centimetres of the board are left?`,
      parts: [numPart(left, { suffix: 'cm' })],
      hints: ['Change the board length to centimetres first: $1\\ \\text{m} = 100\\ \\text{cm}$.', 'Find the total length cut off, then subtract it from the board length.'],
      solution: [
        `Board: ${Q(L, 'm')} $= ${nm(L)} \\times 100 = ${ms(total, 'cm')}$`,
        `Cut off: $${n} \\times ${p} = ${ms(used, 'cm')}$`,
        `Left over: $${total} - ${used} = ${left}$`,
        `${Q(left, 'cm')} of the board is left.`,
      ],
    };
  }
  if (kind === 'liquid') {
    const c = rng.pick([
      {
        place: 'a coffee shop',
        cont: 'jug of milk',
        V: [2, 4],
        each: [150, 200, 250, 300],
        what: 'latte uses',
        did: 'makes {n} lattes',
      },
      {
        place: 'a hair salon',
        cont: 'bottle of shampoo',
        V: [1, 2],
        each: [15, 20, 25, 30],
        what: 'hair wash uses',
        did: 'does {n} hair washes',
      },
      {
        place: 'a hotel',
        cont: 'jug of floor cleaner',
        V: [4, 5],
        each: [50, 75, 100, 125],
        what: 'bucket of mop water uses',
        did: 'fills {n} buckets',
      },
      {
        place: 'a restaurant kitchen',
        cont: 'pot of soup',
        V: [8, 10, 12],
        each: [250, 300, 350],
        what: 'bowl of soup uses',
        did: 'serves {n} bowls',
      },
    ]);
    const V = rng.pick(c.V);
    const each = rng.pick(c.each);
    const total = V * 1000;
    const max = Math.floor((total - 1) / each);
    const n = rng.int(Math.max(3, Math.floor(max / 2)), max);
    const used = n * each;
    const left = total - used;
    return {
      prompt: `${name} works at ${c.place}. A full ${c.cont} holds ${Q(V, 'L')}. Each ${c.what} ${Q(each, 'mL')}. ${name} ${c.did.replace('{n}', `$${n}$`)}. How many millilitres are left?`,
      parts: [numPart(left, { suffix: 'mL' })],
      hints: ['Change litres to millilitres first: $1\\ \\text{L} = 1000\\ \\text{mL}$.', 'Find the total amount used, then subtract.'],
      solution: [
        `Full: ${Q(V, 'L')} $= ${V} \\times 1000 = ${ms(total, 'mL')}$`,
        `Used: $${n} \\times ${each} = ${ms(used, 'mL')}$`,
        `Left: $${nm(total)} - ${nm(used)} = ${nm(left)}$`,
        `There are ${Q(left, 'mL')} left.`,
      ],
    };
  }
  if (kind === 'boxes') {
    const n = rng.int(12, 30);
    const g = rng.int(5, 19) * 50;
    const totalG = n * g;
    const kg = clean(totalG / 1000);
    const what = rng.pick(['boxes of screws', 'bags of coffee beans', 'cases of hand soap', 'bags of dog treats', 'boxes of crackers']);
    return {
      prompt: `${name} works in a warehouse and loads $${n}$ ${what} onto a cart. Each one has a mass of ${Q(g, 'g')}. What is the total mass in kilograms?`,
      parts: [exact(kg, 'kg')],
      hints: ['Find the total mass in grams first.', 'Then change grams to kilograms: divide by $1000$.'],
      solution: [`Total in grams: $${n} \\times ${g} = ${ms(totalG, 'g')}$`, `Change to kilograms: $${nm(totalG)} \\div 1000 = ${nm(kg)}$`, `The total mass is ${Q(kg, 'kg')}.`],
      calculator: true,
    };
  }
  if (kind === 'laps') {
    const [D, t] = rng.pick([
      [1, 200],
      [1, 250],
      [2, 400],
      [3, 400],
      [5, 400],
      [1, 400],
      [2, 250],
      [3, 200],
      [10, 400],
      [5, 250],
      [2, 500],
      [3, 500],
    ] as const);
    const laps = clean((D * 1000) / t);
    return {
      prompt: `${name} is training for a ${Q(D, 'km')} run. The track at the school is ${Q(t, 'm')} around. How many laps of the track make ${Q(D, 'km')}?`,
      parts: [exact(laps, 'laps')],
      hints: ['Change kilometres to metres first: $1\\ \\text{km} = 1000\\ \\text{m}$.', 'Then divide the distance by the length of one lap.'],
      solution: [`${Q(D, 'km')} $= ${D} \\times 1000 = ${ms(D * 1000, 'm')}$`, `$${nm(D * 1000)} \\div ${t} = ${nm(laps)}$`, `${name} must run $${nm(laps)}$ laps.`],
      calculator: true,
    };
  }
  const R = rng.pick([10, 15, 20, 25, 30]);
  const each = rng.int(7, 18) * 5;
  const total = R * 100;
  const max = Math.floor((total - 10) / each);
  const n = rng.int(Math.max(5, Math.floor(max / 2)), max);
  const leftCm = total - n * each;
  const leftM = clean(leftCm / 100);
  const job = rng.pick(['gift baskets for a community fundraiser', 'bouquets at a flower shop', 'hampers for a food bank', 'wreaths for a craft sale']);
  return {
    prompt: `A roll of ribbon is ${Q(R, 'm')} long. ${name} is making ${job}. Each one uses ${Q(each, 'cm')} of ribbon. After making $${n}$, how many metres of ribbon are left?`,
    parts: [exact(leftM, 'm')],
    hints: ['Change the roll to centimetres first: $1\\ \\text{m} = 100\\ \\text{cm}$.', 'Subtract the ribbon used, then change the answer back to metres (divide by $100$).'],
    solution: [
      `Roll: ${Q(R, 'm')} $= ${ms(total, 'cm')}$`,
      `Used: $${n} \\times ${each} = ${ms(n * each, 'cm')}$`,
      `Left: $${nm(total)} - ${nm(n * each)} = ${ms(leftCm, 'cm')}$`,
      `Change to metres: $${nm(leftCm)} \\div 100 = ${nm(leftM)}$`,
      `There are ${Q(leftM, 'm')} of ribbon left.`,
    ],
    calculator: true,
  };
}

const siConvert = skill({
  id: 'm104-si-convert',
  name: 'Converting SI units',
  description: 'Convert between mm, cm, m and km, between g and kg, and between mL and L, including two-step workplace problems.',
  outcomes: ['SS1'],
  lessonId: 'm104-6-1',
  calculator: false,
  gen(rng, d) {
    if (d === 3) return { ...convTask(rng, rng.pick(NAMES)), calculator: true };
    return convOut(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 6.2 Reading rulers and tape measures
// ---------------------------------------------------------------------------

/** LaTeX mixed number for t parts of D (e.g. t = 37, D = 16 -> 2\tfrac{5}{16}). */
function inch(t: number, D: number): string {
  const w = Math.floor(t / D);
  const r = t % D;
  if (r === 0) return `${w}`;
  const g = gcd(r, D);
  const fr = `\\tfrac{${r / g}}{${D / g}}`;
  return w ? `${w}${fr}` : fr;
}
const lowest = (t: number, D: number) => D / gcd(t % D || D, D);

const METRIC_OBJ = ['bolt', 'screw', 'pencil', 'crayon', 'key', 'eraser', 'nail', 'zip tie', 'piece of trim', 'paint stir stick'];
const METRIC_CUT = ['piece of trim', 'wooden dowel', 'zip tie', 'piece of copper pipe', 'strip of wood', 'piece of plastic tubing', 'bolt', 'paint stir stick'];
const IMP_OBJ = ['bolt', 'wood screw', 'piece of trim', 'dowel', 'piece of PVC pipe', 'nail', 'drawer handle', 'hinge'];

function metricRuler(rng: Rng, d: 1 | 2 | 3, name: string): GenOutput {
  const obj = rng.pick(d === 3 ? METRIC_CUT : METRIC_OBJ);
  const rulerCm = d === 1 ? 10 : rng.pick([12, 15]);
  const startMm = d === 1 ? 0 : rng.chance(0.5) ? rng.int(1, 3) * 10 : 0;
  const maxLen = rulerCm * 10 - startMm - 5;
  const lenMm = retry(
    () => rng.int(d === 1 ? 15 : 25, Math.min(maxLen, 110)),
    (v) => v % 10 !== 0,
  );
  const endMm = startMm + lenMm;
  const figure: RulerFigure = {
    type: 'ruler',
    system: 'metric',
    length: rulerCm,
    start: startMm / 10,
    end: endMm / 10,
  };
  const L = lenMm / 10;
  const read =
    startMm === 0
      ? [
          `The ${obj} starts at $0$.`,
          `Its right end is $${endMm % 10}$ small mark${endMm % 10 === 1 ? '' : 's'} past the $${Math.floor(endMm / 10)}$ cm mark. That is ${Q(endMm / 10, 'cm')}, or ${Q(endMm, 'mm')}.`,
        ]
      : [
          `The ${obj} does not start at $0$. Its left end is at the $${startMm / 10}$ cm mark.`,
          `Its right end is $${endMm % 10}$ small mark${endMm % 10 === 1 ? '' : 's'} past the $${Math.floor(endMm / 10)}$ cm mark, so it is at ${Q(endMm / 10, 'cm')}.`,
          `Subtract: $${nm(endMm / 10)} - ${startMm / 10} = ${ms(L, 'cm')}$, which is ${Q(lenMm, 'mm')}.`,
        ];
  const hints = [
    'Each small mark on a metric ruler is $1\\ \\text{mm}$. There are $10\\ \\text{mm}$ in $1\\ \\text{cm}$.',
    startMm === 0
      ? 'Count the whole centimetres first, then count the small marks after the last whole centimetre.'
      : 'The object does not start at 0. Read both ends, then subtract: length = end − start.',
  ];
  if (d === 3) {
    const cut = rng.int(3, Math.min(25, lenMm - 15));
    const req = lenMm - cut;
    const reqCm = rng.chance(0.5);
    return {
      prompt: `${name} needs a ${obj} that is exactly ${reqCm ? Q(req / 10, 'cm') : Q(req, 'mm')} long. The ${obj} on the ruler is too long. How many **millimetres** must ${name} cut off?`,
      figure,
      parts: [numPart(cut, { suffix: 'mm' })],
      hints: [`First read the length of the ${obj}. ${hints[1]}`, 'Write both lengths in millimetres, then subtract the length needed from the length you read.'],
      solution: [...read, ...(reqCm ? [`The length needed is ${Q(req / 10, 'cm')} $= ${ms(req, 'mm')}$.`] : []), `Cut off: $${lenMm} - ${req} = ${cut}$`, `${name} must cut off ${Q(cut, 'mm')}.`],
      answerDisplay: Q(cut, 'mm'),
    };
  }
  const asMm = rng.chance(0.45);
  return {
    prompt: asMm ? `How long is the ${obj}? Give your answer in **millimetres**.` : `How long is the ${obj}? Give your answer in **centimetres**, to one decimal place (like $4.7$).`,
    figure,
    parts: [asMm ? numPart(lenMm, { suffix: 'mm' }) : numPart(L, { decimals: 1, suffix: 'cm' })],
    hints,
    solution: [...read, asMm ? `The ${obj} is ${Q(lenMm, 'mm')} long.` : `The ${obj} is ${Q(L, 'cm')} long.`],
    answerDisplay: asMm ? Q(lenMm, 'mm') : Q(L, 'cm'),
  };
}

function imperialRuler(rng: Rng, d: 1 | 2 | 3, mode: 'read' | 'offset' | 'cut', name: string): GenOutput {
  const obj = rng.pick(IMP_OBJ);
  const D: 8 | 16 = d === 1 || mode === 'cut' ? 8 : rng.chance(0.6) ? 16 : 8;
  const startT = mode === 'offset' ? rng.int(1, 2) * D : 0;
  const maxT = Math.round((mode === 'offset' ? 5.6 - startT / D : 4.6) * D);
  let lenT: number;
  if (d === 1)
    lenT = retry(
      () => rng.int(5, 19) * 2,
      (v) => v % 8 !== 0,
    );
  else
    lenT = retry(
      () => rng.int(D + 1, maxT),
      (v) => v % D !== 0 && (D === 8 || v % 2 === 1 || rng.chance(0.3)),
    );
  const endT = startT + lenT;
  const rulerIn = Math.min(6, Math.max(4, Math.ceil(endT / D + 0.4)));
  const figure: RulerFigure = {
    type: 'ruler',
    system: 'imperial',
    length: rulerIn,
    start: startT / D,
    end: endT / D,
    division: D,
  };
  const part = D === 8 ? 'eighth' : 'sixteenth';
  const w = Math.floor(lenT / D);
  const r = lenT % D;
  const steps: string[] = [];
  if (startT === 0) {
    steps.push(`The ${obj} starts at $0$.`);
    steps.push(`Its right end is $${r}$ ${part}${r === 1 ? '' : 's'} past the $${w}$-inch mark, so it is $${w}\\tfrac{${r}}{${D}}$ in long.`);
    if (lowest(lenT, D) !== D) steps.push(`Simplify the fraction: $${w}\\tfrac{${r}}{${D}} = ${inch(lenT, D)}$ in.`);
  } else {
    steps.push(`The ${obj} does not start at $0$. Its left end is at the $${startT / D}$-inch mark.`);
    steps.push(`Its right end is at $${inch(endT, D)}$ in.`);
    steps.push(`Subtract the whole inches: $${inch(endT, D)} - ${startT / D} = ${inch(lenT, D)}$ in.`);
  }
  const hint1 = `Each inch is split into $${D}$ equal spaces, so the smallest space is $\\tfrac{1}{${D}}$ in. The longest marks are whole inches, then halves, then quarters${D === 16 ? ', then eighths' : ''}.`;
  if (mode === 'cut') {
    const k = rng.int(1, Math.min(7, lenT - 9));
    const req = lenT - k;
    steps.push(`Length needed: $${inch(req, D)}$ in $= \\tfrac{${req}}{${D}}$ in. Length now: $\\tfrac{${lenT}}{${D}}$ in.`);
    steps.push(`Cut off: $\\tfrac{${lenT}}{${D}} - \\tfrac{${req}}{${D}} = \\tfrac{${k}}{${D}}${lowest(k, D) !== D ? ` = ${inch(k, D)}` : ''}$ in.`);
    steps.push(`${name} must cut off $${inch(k, D)}$ in.`);
    return {
      prompt: `${name} needs the ${obj} to be $${inch(req, D)}$ in long. How much must ${name} cut off, in inches? You can type a fraction such as 3/8.`,
      figure,
      parts: [numPart(k / D, { suffix: 'in' })],
      hints: [`First read the length of the ${obj}. ${hint1}`, 'Write both lengths in eighths of an inch, then subtract.'],
      solution: steps,
      answerDisplay: `$${inch(k, D)}$ in`,
    };
  }
  steps.push(`The ${obj} is $${inch(lenT, D)}$ in long.`);
  return {
    prompt: `How long is the ${obj}, to the nearest ${part} of an inch? You can type a mixed number such as 2 3/${D}.`,
    figure,
    parts: [numPart(lenT / D, { suffix: 'in' })],
    hints: [
      hint1,
      startT === 0
        ? `Count the whole inches, then count the ${part}s past the last whole inch. Simplify the fraction if you can.`
        : 'The object does not start at 0. Read both ends, then subtract: length = end − start.',
    ],
    solution: steps,
    answerDisplay: `$${inch(lenT, D)}$ in`,
  };
}

const readRuler = skill({
  id: 'm104-read-ruler',
  name: 'Reading rulers and tape measures',
  description: 'Read a metric ruler to the nearest millimetre and an imperial ruler to the nearest eighth or sixteenth of an inch.',
  outcomes: ['SS1'],
  lessonId: 'm104-6-2',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.6) ? metricRuler(rng, 1, name) : imperialRuler(rng, 1, 'read', name);
    if (d === 2) return rng.chance(0.5) ? metricRuler(rng, 2, name) : imperialRuler(rng, 2, 'read', name);
    const mode = rng.pick(['metric', 'offset', 'cut'] as const);
    return mode === 'metric' ? metricRuler(rng, 3, name) : imperialRuler(rng, 3, mode, name);
  },
});

// ---------------------------------------------------------------------------
// 6.3 Elapsed time
// ---------------------------------------------------------------------------

const pad2 = (n: number) => String(n).padStart(2, '0');
const day = (m: number) => ((m % 1440) + 1440) % 1440;

/** 12-hour time, e.g. 7:45 a.m. Noon and midnight are written in words. */
function t12(m: number): string {
  const x = day(m);
  if (x === 720) return '12:00 noon';
  if (x === 0) return '12:00 midnight';
  const h = Math.floor(x / 60);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad2(x % 60)} ${h < 12 ? 'a.m.' : 'p.m.'}`;
}
/** 24-hour time, e.g. 07:45. */
function t24(m: number): string {
  const x = day(m);
  return `${pad2(Math.floor(x / 60))}:${pad2(x % 60)}`;
}
/** "8 h 30 min" as inline maths. */
function HM(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `$${m}\\ \\text{min}$`;
  return m ? `$${h}\\ \\text{h}\\ ${m}\\ \\text{min}$` : `$${h}\\ \\text{h}$`;
}
const hmParts = (total: number): Part[] => [numPart(Math.floor(total / 60), { label: 'Hours', suffix: 'h' }), numPart(total % 60, { label: 'Minutes', suffix: 'min' })];

/** Count-up steps from a to b (minutes, b > a, b may pass midnight). */
function countUp(a: number, b: number, f: (m: number) => string): string[] {
  const steps: string[] = [];
  const nh = Math.ceil(a / 60) * 60;
  if (nh >= b) {
    steps.push(`From ${f(a)} to ${f(b)} is $${b - a}$ minutes.`);
    return steps;
  }
  const c1 = nh - a;
  const hrs = Math.floor((b - nh) / 60);
  const lh = nh + hrs * 60;
  const c3 = b - lh;
  if (c1 > 0) steps.push(`From ${f(a)} up to ${f(nh)} is $${c1}$ min.`);
  if (hrs > 0) {
    const mark = (f === t12 ? [720, 1440] : [1440]).find((x) => nh < x && x < lh);
    if (mark !== undefined) {
      const word = f === t24 ? '00:00 (midnight)' : mark === 720 ? '12:00 noon' : '12:00 midnight';
      steps.push(`From ${f(nh)} to ${word} is $${(mark - nh) / 60}$ h, and from ${word} to ${f(lh)} is $${(lh - mark) / 60}$ h. That is $${hrs}$ h.`);
    } else steps.push(`From ${f(nh)} to ${f(lh)} is $${hrs}$ h.`);
  }
  if (c3 > 0) steps.push(`From ${f(lh)} to ${f(b)} is $${c3}$ min.`);
  const mins = c1 + c3;
  if (c1 > 0 && c3 > 0) steps.push(`Add the minutes: $${c1} + ${c3} = ${mins}$ min${mins >= 60 ? `, which is ${HM(mins)}` : ''}.`);
  steps.push(hrs > 0 && mins > 0 ? `Total: $${hrs}$ h $+$ ${HM(mins)} $=$ ${HM(b - a)}.` : `Total: ${HM(b - a)}.`);
  return steps;
}

/** Steps for a duration asked in minutes only. */
function minuteSteps(a: number, b: number): string[] {
  const nh = Math.ceil(a / 60) * 60;
  if (nh >= b) return [`From ${t12(a)} to ${t12(b)} is $${b - a}$ minutes.`, `The total is $${b - a}$ minutes.`];
  const steps: string[] = [];
  const pieces: number[] = [];
  if (nh > a) {
    steps.push(`From ${t12(a)} up to ${t12(nh)} is $${nh - a}$ min.`);
    pieces.push(nh - a);
  }
  const hrs = Math.floor((b - nh) / 60);
  const lh = nh + hrs * 60;
  if (hrs) {
    steps.push(`From ${t12(nh)} to ${t12(lh)} is $${hrs}$ h, which is $${hrs * 60}$ min.`);
    pieces.push(hrs * 60);
  }
  if (b > lh) {
    steps.push(`From ${t12(lh)} to ${t12(b)} is $${b - lh}$ min.`);
    pieces.push(b - lh);
  }
  if (pieces.length > 1) steps.push(`Add: $${pieces.join(' + ')} = ${b - a}$`);
  steps.push(`The total is $${b - a}$ minutes.`);
  return steps;
}

/** A sentence that ends with "a.m." or "p.m." needs no second period. */
function noDoubleDots(o: GenOutput): GenOutput {
  const f = (t: string) => t.replace(/([ap])\.m\.\./g, '$1.m.');
  return {
    ...o,
    prompt: f(o.prompt),
    hints: o.hints.map(f),
    solution: o.solution.map(f),
    ...(o.answerDisplay ? { answerDisplay: f(o.answerDisplay) } : {}),
  };
}

const PLACES = ['grocery store', 'coffee shop', 'fast-food restaurant', 'warehouse', 'hotel', 'car wash', 'hair salon', 'child care centre', 'garden centre', 'hardware store'];

const ROUTES = [
  { from: 'Riverton', to: 'Lakeside', lo: 180, hi: 225 },
  { from: 'Brookfield', to: 'Lakeside', lo: 90, hi: 120 },
  { from: 'Hillcrest', to: 'Pinewood', lo: 105, hi: 135 },
  { from: 'Clearwater', to: 'Riverton', lo: 300, hi: 345 },
  { from: 'Ashford', to: 'Riverton', lo: 280, hi: 330 },
  { from: 'Lakeside', to: 'Hillcrest', lo: 135, hi: 170 },
];

const HINT_COUNT = 'Count up: from the start time to the next full hour, then whole hours, then the extra minutes.';
const HINT_ADD = 'Add the pieces. Remember that $60$ minutes make $1$ hour.';

const elapsedTime = skill({
  id: 'm104-elapsed-time',
  name: 'Elapsed time and work schedules',
  description: 'Find how long a shift, trip or event lasts using 12-hour and 24-hour time, including unpaid breaks and shifts that cross noon or midnight.',
  outcomes: ['SS1', 'N2'],
  lessonId: 'm104-6-3',
  calculator: false,
  gen: (rng, d) => noDoubleDots(elapsedGen(rng, d)),
});

function elapsedGen(rng: Rng, d: 1 | 2 | 3): GenOutput {
  const name = rng.pick(NAMES);
  const place = rng.pick(PLACES);
  if (d === 1) {
    if (rng.chance(0.45)) {
      // Short durations in minutes, within one half of the day.
      const { a, b } = retry(
        () => {
          const a = rng.int(7 * 12, 19 * 12) * 5;
          return { a, b: a + rng.int(4, 22) * 5 };
        },
        (o) => o.a < 720 === o.b < 720 && o.a % 60 !== 0 && o.b !== 720,
      );
      const ctx = rng.pick([
        `The city bus leaves the mall at ${t12(a)} and gets to the college at ${t12(b)}. How many minutes long is the ride?`,
        `${name} starts a load of towels in the dryer at the hotel at ${t12(a)}. The load finishes at ${t12(b)}. How many minutes did the dryer run?`,
        `${name} starts detailing a car at ${t12(a)} and finishes at ${t12(b)}. How many minutes did the job take?`,
        `A hockey practice at the arena starts at ${t12(a)} and ends at ${t12(b)}. How many minutes long is the practice?`,
        `${name}’s haircut appointment starts at ${t12(a)} and ends at ${t12(b)}. How many minutes long is the appointment?`,
      ]);
      const steps = minuteSteps(a, b);
      return {
        prompt: ctx,
        parts: [numPart(b - a, { suffix: 'min' })],
        hints: [HINT_COUNT, 'There are $60$ minutes in $1$ hour.'],
        solution: steps,
        answerDisplay: `$${b - a}\\ \\text{min}$`,
      };
    }
    const pm = rng.chance(0.5);
    const { a, b } = retry(
      () => {
        const a = (pm ? rng.int(26, 36) : rng.int(12, 20)) * 30;
        return { a, b: a + rng.int(2, 13) * 30 };
      },
      (o) => (pm ? o.b <= 22 * 60 : o.b <= 11 * 60 + 30) && o.b - o.a >= 60,
    );
    const prompt = rng.pick([
      `${name}’s shift at the ${place} starts at ${t12(a)} and ends at ${t12(b)}. How long is the shift?`,
      `${name} babysits from ${t12(a)} to ${t12(b)}. How long does ${name} babysit?`,
      `A community garage sale runs from ${t12(a)} to ${t12(b)}. How long does it run?`,
    ]);
    return {
      prompt: `${prompt} Give the hours and minutes.`,
      parts: hmParts(b - a),
      hints: [HINT_COUNT, HINT_ADD],
      solution: countUp(a, b, t12),
      answerDisplay: HM(b - a),
    };
  }
  if (d === 2) {
    const mode = rng.pick(['noon', 'h24', 'table', 'end'] as const);
    if (mode === 'end') {
      const { a, dur } = retry(
        () => ({ a: rng.int(5 * 4, 15 * 4) * 15, dur: rng.int(5, 36) * 15 }),
        (o) => o.a % 60 !== 0 && o.a + o.dur < 23 * 60,
      );
      const b = a + dur;
      const ev = rng.pick([
        `${name}’s shift at the ${place} starts at ${t24(a)} and lasts ${HM(dur)}. At what time does the shift end?`,
        `A bus leaves ${rng.pick(TOWNS)} at ${t24(a)}. The trip takes ${HM(dur)}. At what time does the bus arrive?`,
        `A turkey goes into the oven at a community hall at ${t24(a)}. It needs to cook for ${HM(dur)}. At what time is it done?`,
      ]);
      const steps = [`Add the hours: ${t24(a)} plus $${Math.floor(dur / 60)}$ h is ${t24(a + Math.floor(dur / 60) * 60)}.`];
      if (dur % 60) {
        const mid = a + Math.floor(dur / 60) * 60;
        const sum = (mid % 60) + (dur % 60);
        steps.push(`Add the minutes: $${mid % 60} + ${dur % 60} = ${sum}$.${sum >= 60 ? ` That is $1$ h $${sum - 60}$ min, so add $1$ to the hour.` : ''}`);
      }
      steps.push(`It ends at ${t24(b)}.`);
      return {
        prompt: `${ev} Use the 24-hour clock. (For example, 17:05 is hour 17 and minute 5.)`,
        parts: [
          {
            ...numPart(Math.floor(b / 60), { label: 'Hour' }),
            placeholder: '17',
          },
          { ...numPart(b % 60, { label: 'Minute' }), placeholder: '05' },
        ],
        hints: ['Add the hours first, then add the minutes.', 'If the minutes add up to $60$ or more, change $60$ minutes into $1$ hour.'],
        solution: steps,
        answerDisplay: t24(b),
      };
    }
    if (mode === 'table') {
      const who = rng.sample(NAMES, 3);
      const shifts = who.map(() => {
        const a = rng.int(6 * 4, 11 * 4) * 15;
        return { a, b: a + rng.int(16, 36) * 15 };
      });
      const k = rng.int(0, 2);
      const fig: TableFigure = {
        type: 'table',
        headers: ['Name', 'Start', 'End'],
        rows: who.map((n, i) => [n, t12(shifts[i].a), t12(shifts[i].b)]),
      };
      const { a, b } = shifts[k];
      return {
        prompt: `The table shows Saturday’s schedule at a ${place}. How long is ${who[k]}’s shift? Give the hours and minutes.`,
        figure: fig,
        parts: hmParts(b - a),
        hints: [`Find ${who[k]}’s row. ${HINT_COUNT}`, HINT_ADD],
        solution: [`${who[k]} starts at ${t12(a)} and ends at ${t12(b)}.`, ...countUp(a, b, t12)],
        answerDisplay: HM(b - a),
      };
    }
    const use24 = mode === 'h24';
    const f = use24 ? t24 : t12;
    const ctx = rng.int(0, 2);
    const unit = ctx === 1 ? 5 : 15;
    const { a, b } = retry(
      () => {
        const a = rng.int((5 * 60) / unit, (11 * 60) / unit) * unit;
        return { a, b: a + rng.int(150 / unit, 550 / unit) * unit };
      },
      (o) => o.a < 720 && o.b > 720 && o.a % 60 !== 0 && o.b % 60 !== 0 && o.b <= 21 * 60,
    );
    const prompt = [
      `${name}’s shift at the ${place} starts at ${f(a)} and ends at ${f(b)}. How long is the shift?`,
      `A delivery driver leaves the warehouse at ${f(a)} and gets back at ${f(b)}. How long was the driver away?`,
      `A farmers’ market in ${rng.pick(TOWNS)} is open from ${f(a)} to ${f(b)}. How long is it open?`,
    ][ctx];
    return {
      prompt: `${prompt}${use24 ? ' The times use the 24-hour clock.' : ''} Give the hours and minutes.`,
      parts: hmParts(b - a),
      hints: [use24 ? `On the 24-hour clock, times after 12:00 keep counting: 13:00 is 1 p.m. ${HINT_COUNT}` : `The times cross noon. ${HINT_COUNT}`, HINT_ADD],
      solution: countUp(a, b, f),
      answerDisplay: HM(b - a),
    };
  }
  const mode = rng.pick(['break', 'night', 'pay', 'trip'] as const);
  if (mode === 'trip') {
    const r = rng.pick(ROUTES);
    const stop = rng.pick([15, 20, 30]);
    const { a, b } = retry(
      () => {
        const a = rng.int(9 * 12, 11 * 12 + 11) * 5;
        return { a, b: a + rng.int(r.lo / 5, r.hi / 5) * 5 };
      },
      (o) => o.a % 60 !== 0 && o.b % 60 !== 0 && o.a < 720 !== o.b < 720 && (o.b - o.a - stop) % 60 !== 0,
    );
    const drive = b - a - stop;
    return {
      prompt: `A bus leaves ${r.from} at ${t12(a)} and arrives in ${r.to} at ${t12(b)}. On the way, it stops for $${stop}$ minutes at a rest stop. How much of the trip is spent driving? Give the hours and minutes.`,
      parts: hmParts(drive),
      hints: ['First find the total time from leaving to arriving.', 'Then subtract the time stopped. Borrow $1$ hour ($60$ min) if you need more minutes.'],
      solution: [...countUp(a, b, t12), `Subtract the stop: ${HM(b - a)} $-$ $${stop}$ min $=$ ${HM(drive)}.`, `The bus spends ${HM(drive)} driving.`],
      answerDisplay: HM(drive),
    };
  }
  if (mode === 'break') {
    const { a, b } = retry(
      () => {
        const a = rng.int(6 * 4, 10 * 4) * 15;
        return { a, b: a + rng.int(28, 40) * 15 };
      },
      (o) => o.b > 720 && o.a % 60 !== 0 && o.b <= 20 * 60,
    );
    const brk = rng.pick([30, 45, 60]);
    const paid = b - a - brk;
    return {
      prompt: `${name} works at a ${place} from ${t12(a)} to ${t12(b)}. ${name} takes a $${brk}$-minute unpaid lunch break. How many hours and minutes is ${name} paid for?`,
      parts: hmParts(paid),
      hints: ['First find the time from the start of the shift to the end.', 'Then subtract the unpaid break. Borrow $1$ hour ($60$ min) if you need more minutes.'],
      solution: [...countUp(a, b, t12), `Subtract the unpaid break: ${HM(b - a)} $-$ $${brk}$ min $=$ ${HM(paid)}.`, `${name} is paid for ${HM(paid)}.`],
      answerDisplay: HM(paid),
    };
  }
  if (mode === 'night') {
    const use24 = rng.chance(0.5);
    const f = use24 ? t24 : t12;
    const { a, b } = retry(
      () => {
        const a = rng.int(19 * 4, 23 * 4 + 2) * 15;
        return { a, b: a + rng.int(24, 40) * 15 };
      },
      (o) => o.b > 1440 && o.a % 60 !== 0 && o.b % 60 !== 0 && o.b - 1440 <= 9 * 60,
    );
    const job = rng.pick([`a night cleaner at a hospital`, `a stocker on the night shift at a grocery store`, `a security guard at a warehouse`, `a front-desk clerk on the night shift at a hotel`]);
    return {
      prompt: `${name} works as ${job}. The shift starts at ${f(a)} and ends at ${f(b)} the next morning.${use24 ? ' The times use the 24-hour clock.' : ''} How long is the shift? Give the hours and minutes.`,
      parts: hmParts(b - a),
      hints: [`The shift crosses midnight. Count up to midnight (${use24 ? '00:00' : '12:00 midnight'}) first, then count the time after midnight.`, HINT_ADD],
      solution: countUp(a, b, f),
      answerDisplay: HM(b - a),
    };
  }
  // Pay for a shift with no break.
  const wage = rng.pick([15, 15.5, 15.8, 16, 16.2, 16.5, 17, 17.4, 18, 18.5, 19.2, 20]);
  const { a, b } = retry(
    () => {
      const a = rng.int(7 * 4, 16 * 4) * 15;
      return { a, b: a + rng.int(7, 17) * 30 };
    },
    (o) => o.a % 60 !== 0 && o.b <= 23 * 60 && (o.b - o.a) % 60 !== 0,
  );
  const hrs = (b - a) / 60;
  const pay = roundTo(hrs * wage, 2);
  return {
    prompt: `${name} works at a ${place} from ${t12(a)} to ${t12(b)} with no unpaid break. ${name} earns ${money(wage)} per hour. How much does ${name} earn for this shift?`,
    parts: [moneyPart(pay)],
    hints: ['First find how long the shift is.', 'Write the time in hours as a decimal ($30$ min $= 0.5$ h), then multiply by the hourly wage.'],
    solution: [...countUp(a, b, t12), `$30$ min $= 0.5$ h, so the shift is $${nm(hrs)}$ h.`, `Pay $= ${nm(hrs)} \\times ${fmtFixed(wage, 2)} = ${fmtFixed(pay, 2)}$`, `${name} earns ${money(pay)}.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 6.3 Temperature
// ---------------------------------------------------------------------------

const cDeg = (x: number) => `${nm(x)}^\\circ\\text{C}`;
const C = (x: number) => `$${cDeg(x)}$`;

const REASONABLE_T: Array<{ thing: string; right: number; wrong: number[] }> = [
  {
    thing: 'a hot summer afternoon',
    right: 31,
    wrong: [3, -31, 80],
  },
  {
    thing: 'a winter night in a northern town',
    right: -25,
    wrong: [25, 8, -75],
  },
  { thing: 'a comfortable classroom', right: 21, wrong: [2, 50, 70] },
  { thing: 'the inside of a fridge', right: 4, wrong: [24, -40, 40] },
  { thing: 'the inside of a freezer', right: -18, wrong: [18, 5, 40] },
  { thing: 'the water in a hot bath', right: 40, wrong: [4, 95, 15] },
  {
    thing: 'a healthy person’s body temperature',
    right: 37,
    wrong: [98, 17, 60],
  },
  { thing: 'a fresh cup of hot coffee', right: 70, wrong: [7, 20, 200] },
  { thing: 'an oven baking cookies', right: 180, wrong: [18, 40, 1000] },
  { thing: 'water boiling in a pot', right: 100, wrong: [0, 10, 50] },
  { thing: 'a cool fall morning', right: 5, wrong: [35, -40, 60] },
  {
    thing: 'the ice surface of an outdoor rink in winter',
    right: -10,
    wrong: [10, 25, 50],
  },
  {
    thing: 'a warm spring day',
    right: 18,
    wrong: [-18, 1, 60],
  },
];

function lineFor(values: number[]): Pick<NumberLineFigure, 'min' | 'max' | 'step'> {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  let min = Math.floor((lo - 2) / 5) * 5;
  let max = Math.ceil((hi + 2) / 5) * 5;
  if (max - min < 20) {
    const extra = 20 - (max - min);
    min -= Math.ceil(extra / 10) * 5;
    max = min + Math.max(20, max - min);
  }
  return { min, max, step: max - min <= 55 ? 5 : 10 };
}

const RISE_TIMES = [
  ['6 a.m.', '3 p.m.'],
  ['7 a.m.', 'noon'],
  ['8 a.m.', '4 p.m.'],
  ['5 a.m.', '2 p.m.'],
] as const;
const DROP_TIMES = [
  ['2 p.m.', '11 p.m.'],
  ['noon', '9 p.m.'],
  ['3 p.m.', 'midnight'],
  ['4 p.m.', '10 p.m.'],
] as const;
/** "$1$ degree" or "$5$ degrees". */
const degs = (n: number) => `$${n}$ degree${n === 1 ? '' : 's'}`;

const temperature = skill({
  id: 'm104-temperature',
  name: 'Reading and comparing temperatures',
  description: 'Read a temperature in degrees Celsius, choose a reasonable temperature, and find a change in temperature, including below zero.',
  outcomes: ['SS1', 'N2'],
  lessonId: 'm104-6-3',
  calculator: false,
  gen: (rng, d) => noDoubleDots(temperatureGen(rng, d)),
});

function temperatureGen(rng: Rng, d: 1 | 2 | 3): GenOutput {
  const town = rng.pick(TOWNS);
  const name = rng.pick(NAMES);
  if (d === 1) {
    if (rng.chance(0.5)) {
      const it = rng.pick(REASONABLE_T);
      return {
        prompt: `Which is the most reasonable temperature for ${it.thing}?`,
        parts: [{ answer: mc(rng, C(it.right), it.wrong.map(C)) }],
        hints: [
          'Use what you know: water freezes at $0^\\circ\\text{C}$ and boils at $100^\\circ\\text{C}$. A warm room is about $20^\\circ\\text{C}$. Your body is about $37^\\circ\\text{C}$.',
          'Temperatures below zero are written with a negative sign, like $-15^\\circ\\text{C}$.',
        ],
        solution: [
          `Compare each choice with temperatures you know: water freezes at $0^\\circ\\text{C}$, a room is about $20^\\circ\\text{C}$, and water boils at $100^\\circ\\text{C}$.`,
          `The most reasonable temperature for ${it.thing} is ${C(it.right)}.`,
        ],
      };
    }
    const min = rng.int(-15, 0) * 2;
    const max = min + 20;
    const v = retry(
      () => rng.int(min + 1, max - 1),
      (x) => x !== 0 && (x % 2 !== 0 || rng.chance(0.3)),
    );
    const time = rng.pick(['7 a.m.', 'noon', '6 p.m.', '9 p.m.', '6 a.m.']);
    const below = v < 0;
    const lo = v % 2 === 0 ? v : v - 1;
    return {
      prompt: `The number line is part of a thermometer scale in degrees Celsius. The dot shows the temperature in ${town} at ${time}. What temperature does it show?`,
      figure: {
        type: 'numberLine',
        min,
        max,
        step: 2,
        points: [{ value: v, label: time }],
      },
      parts: [numPart(v, { suffix: '°C' })],
      hints: [
        'Each tick mark on this scale is $2$ degrees. A dot halfway between two ticks is $1$ degree past the lower one.',
        'Numbers to the left of $0$ are below zero. Write them with a negative sign.',
      ],
      solution: [
        v % 2 === 0 ? `The dot is right on the tick for $${v}$.` : `The dot is halfway between $${lo}$ and $${lo + 2}$, so it shows $${v}$.`,
        below ? `The dot is to the left of $0$, so the temperature is below zero.` : `The dot is to the right of $0$, so the temperature is above zero.`,
        `The temperature is ${C(v)}.`,
      ],
      answerDisplay: C(v),
    };
  }
  if (d === 2) {
    if (rng.chance(0.55)) {
      const { a, b } = retry(
        () => ({ a: rng.int(-22, 12), b: rng.int(-22, 15) }),
        (o) => Math.abs(o.a - o.b) >= 5 && o.a < 0 !== o.b < 0 && o.a !== 0 && o.b !== 0,
      );
      const rise = b > a;
      const pairs: ReadonlyArray<readonly [string, string]> = rise ? RISE_TIMES : DROP_TIMES;
      const [t1, t2] = rng.pick(pairs);
      const diff = Math.abs(b - a);
      const neg = Math.min(a, b);
      const pos = Math.max(a, b);
      return {
        prompt: `In ${town}, the temperature was ${C(a)} at ${t1}. At ${t2} it was ${C(b)}. By how many degrees did the temperature ${rise ? 'rise' : 'drop'}?`,
        figure: {
          type: 'numberLine',
          ...lineFor([a, b]),
          points: [
            { value: a, label: t1 },
            { value: b, label: t2 },
          ],
        },
        parts: [numPart(diff, { suffix: '°C' })],
        hints: [
          'Count the degrees between the two temperatures on the number line.',
          'When one temperature is below zero and the other is above, count from the negative temperature up to $0$, then from $0$ to the positive temperature, and add.',
        ],
        solution: [
          `From ${C(neg)} up to $0^\\circ\\text{C}$ is ${degs(-neg)}.`,
          `From $0^\\circ\\text{C}$ up to ${C(pos)} is ${degs(pos)}.`,
          `$${-neg} + ${pos} = ${diff}$`,
          `The temperature ${rise ? 'rose' : 'dropped'} by $${diff}$ degrees.`,
        ],
        answerDisplay: `$${diff}$ degrees`,
      };
    }
    const { a, k, up } = retry(
      () => ({ a: rng.int(-20, 10), k: rng.int(4, 18), up: rng.chance(0.5) }),
      (o) => o.a !== 0 && o.a + (o.up ? o.k : -o.k) < 0 !== o.a < 0 && o.a + (o.up ? o.k : -o.k) !== 0,
    );
    const b = a + (up ? k : -k);
    const ctx = rng.pick([`at ${rng.pick(['7 a.m.', '6 a.m.', '8 a.m.'])} in ${town}`, `when ${name} started a shift shovelling snow`, `when ${name} started walking to work`]);
    return {
      prompt: `The temperature was ${C(a)} ${ctx}. Then it ${up ? 'rose' : 'dropped'} by $${k}$ degrees. What was the new temperature?`,
      figure: {
        type: 'numberLine',
        ...lineFor([a, b]),
        points: [{ value: a, label: 'start' }],
      },
      parts: [numPart(b, { suffix: '°C' })],
      hints: [
        up ? 'A rise means move right (up) on the number line.' : 'A drop means move left (down) on the number line.',
        up ? `Count ${degs(-a)} up to $0$, then count the rest.` : `Count ${degs(a)} down to $0$, then keep going below zero.`,
      ],
      solution: up
        ? [
            `Start at ${C(a)} and move up $${k}$ degrees.`,
            `${cap(degs(-a))} gets you to $0^\\circ\\text{C}$. That leaves $${k} - ${-a} = ${b}$ more.`,
            `$${a} + ${k} = ${b}$`,
            `The new temperature is ${C(b)}.`,
          ]
        : [
            `Start at ${C(a)} and move down $${k}$ degrees.`,
            `${cap(degs(a))} gets you to $0^\\circ\\text{C}$. That leaves $${k} - ${a} = ${-b}$ more, below zero.`,
            `$${a} - ${k} = ${b}$`,
            `The new temperature is ${C(b)}.`,
          ],
      answerDisplay: C(b),
    };
  }
  const mode = rng.pick(['two', 'table', 'rate'] as const);
  if (mode === 'two') {
    const { a, r, f } = retry(
      () => ({ a: rng.int(-24, -3), r: rng.int(6, 20), f: rng.int(5, 18) }),
      (o) => o.a + o.r > 0 && o.a + o.r - o.f < 0 && o.a + o.r - o.f !== o.a,
    );
    const mid = a + r;
    const end = mid - f;
    return {
      prompt: `On a winter day in ${town}, it was ${C(a)} at 7 a.m. By 2 p.m. the temperature rose $${r}$ degrees. Then by midnight it dropped $${f}$ degrees from the 2 p.m. temperature. What was the temperature at midnight?`,
      parts: [numPart(end, { suffix: '°C' })],
      hints: ['Do one change at a time. First find the temperature at 2 p.m.', 'A rise means add. A drop means subtract. Use a number line if it helps.'],
      solution: [`At 2 p.m.: $${a} + ${r} = ${mid}$, so it was ${C(mid)}.`, `At midnight: $${mid} - ${f} = ${end}$`, `The temperature at midnight was ${C(end)}.`],
      answerDisplay: C(end),
    };
  }
  if (mode === 'table') {
    const towns = rng.sample(TOWNS, 4);
    const temps = retry(
      () => towns.map(() => rng.int(-32, 6)),
      (t) => new Set(t).size === 4 && Math.max(...t) - Math.min(...t) >= 8 && t.some((x) => x < 0),
    );
    const hi = Math.max(...temps);
    const lo = Math.min(...temps);
    const fig: TableFigure = {
      type: 'table',
      headers: ['Place', 'Low temperature (°C)'],
      rows: towns.map((t, i) => [t, String(temps[i]).replace('-', '−')]),
    };
    const steps =
      hi > 0
        ? [`From ${C(lo)} up to $0^\\circ\\text{C}$ is ${degs(-lo)}, and from $0$ up to ${C(hi)} is ${degs(hi)}.`, `$${-lo} + ${hi} = ${hi - lo}$`]
        : [`Both are below zero. Count up from ${C(lo)} to ${C(hi)}: $${hi} - (${lo}) = ${hi} + ${-lo} = ${hi - lo}$`];
    return {
      prompt: `The table shows the lowest temperature in four towns on one January night. How many degrees warmer was the warmest place than the coldest place?`,
      figure: fig,
      parts: [numPart(hi - lo, { suffix: '°C' })],
      hints: ['The warmest temperature is the one closest to (or above) zero. The coldest is the most negative.', 'Find the difference by counting up from the coldest temperature to the warmest.'],
      solution: [`Warmest: ${towns[temps.indexOf(hi)]} at ${C(hi)}. Coldest: ${towns[temps.indexOf(lo)]} at ${C(lo)}.`, ...steps, `The warmest place was $${hi - lo}$ degrees warmer.`],
      answerDisplay: `$${hi - lo}$ degrees`,
    };
  }
  const h = rng.int(2, 6);
  const per = rng.int(2, 6);
  const a = retry(
    () => rng.int(-22, -4),
    (x) => x + h * per > 0,
  );
  const b = a + h * per;
  return {
    prompt: `A warm winter wind blew into ${rng.pick(['Lakeside', 'Hillcrest', 'Pinewood'])}. The temperature rose from ${C(a)} to ${C(b)} in $${h}$ hours. On average, by how many degrees did it rise each hour?`,
    parts: [numPart(per, { suffix: '°C' })],
    hints: ['First find the total rise in temperature.', 'Then share the total rise equally among the hours: divide.'],
    solution: [
      `Total rise: from ${C(a)} up to $0$ is ${degs(-a)}, and from $0$ up to ${C(b)} is ${degs(b)}, so $${-a} + ${b} = ${b - a}$ degrees.`,
      `Each hour: $${b - a} \\div ${h} = ${per}$`,
      `It rose about $${per}$ degrees each hour.`,
    ],
    answerDisplay: `$${per}$ degrees per hour`,
  };
}

export const MEASUREMENT_SKILLS: SkillDef[] = [chooseUnit, siConvert, readRuler, elapsedTime, temperature];
