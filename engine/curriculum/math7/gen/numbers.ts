/** Math 7 Unit 1 — Number Relationships: divisibility (N1), fractions and decimals (N4), comparing and ordering (N7). */
import { fixedChoice, mc, multi, numPart, part, retry, skill } from '../../helpers.ts';
import { gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean };

const fr = (n: number | string, d: number | string) => `\\frac{${n}}{${d}}`;
/** A whole number in maths; five or more digits get a thin space (12\,456). */
const N = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : String(n));
/** A list in prose: "$2$, $3$ and $9$". */
function list(items: string[], word = 'and'): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${word} ${items[items.length - 1]}`;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** An exact decimal answer, shown as a decimal on review screens; expressions such as 3/8 are not needed. */
function decPart(value: number, opts: { suffix?: string; label?: string } = {}): Part {
  const v = Math.round(value * 1e9) / 1e9;
  return {
    label: opts.label,
    suffix: opts.suffix,
    answer: { kind: 'numeric', value: v, allowExpression: false, display: 'decimal', exact: String(v), asDecimal: true },
  };
}

// ---------------------------------------------------------------------------
// Exact decimals of fractions
// ---------------------------------------------------------------------------

interface Expansion {
  int: number;
  /** Digits after the decimal point before the repeat starts. */
  pre: string;
  /** The repeating block ('' when the decimal terminates). */
  rep: string;
}

/** Long division of n/d (n, d > 0). */
function expand(n: number, d: number): Expansion {
  const int = Math.floor(n / d);
  let r = n % d;
  const seen = new Map<number, number>();
  let digits = '';
  while (r !== 0 && !seen.has(r)) {
    seen.set(r, digits.length);
    r *= 10;
    digits += String(Math.floor(r / d));
    r %= d;
  }
  if (r === 0) return { int, pre: digits, rep: '' };
  const at = seen.get(r)!;
  return { int, pre: digits.slice(0, at), rep: digits.slice(at) };
}

/** Bar notation: 0.58\overline{3}, or 0.375 when it terminates. */
function barTex(e: Expansion): string {
  if (!e.rep) return e.pre ? `${e.int}.${e.pre}` : `${e.int}`;
  return `${e.int}.${e.pre}\\overline{${e.rep}}`;
}

/** The first `k` decimal digits of an expansion (padded with zeros). */
function digitsAfter(e: Expansion, k: number): string {
  let s = e.pre;
  if (e.rep) while (s.length < k) s += e.rep;
  return (s + '0'.repeat(k)).slice(0, k);
}

/** Written out with dots: 0.454545..., or the terminating decimal itself. */
function longTex(e: Expansion, k = 6): string {
  if (!e.rep) return barTex(e);
  const len = Math.max(k, e.pre.length + 2 * e.rep.length);
  return `${e.int}.${digitsAfter(e, len)}\\ldots`;
}

const terminates = (d: number) => {
  let x = d;
  while (x % 2 === 0) x /= 2;
  while (x % 5 === 0) x /= 5;
  return x === 1;
};

/** Prime factors as a product: 2 \times 2 \times 3. */
function factorTex(d: number): string {
  const out: number[] = [];
  let m = d;
  for (let p = 2; p <= m; p++) {
    while (m % p === 0) {
      out.push(p);
      m /= p;
    }
  }
  return out.join(' \\times ');
}

// ---------------------------------------------------------------------------
// 1.1 Divisibility rules
// ---------------------------------------------------------------------------

const DIVISORS = [2, 3, 4, 5, 6, 8, 9, 10];

const RULE: Record<number, string> = {
  2: 'A number is divisible by $2$ when its last digit is even: $0$, $2$, $4$, $6$ or $8$.',
  3: 'A number is divisible by $3$ when the sum of its digits is divisible by $3$.',
  4: 'A number is divisible by $4$ when the number made by its last two digits is divisible by $4$.',
  5: 'A number is divisible by $5$ when its last digit is $0$ or $5$.',
  6: 'A number is divisible by $6$ when it is divisible by both $2$ and $3$.',
  8: 'A number is divisible by $8$ when the number made by its last three digits is divisible by $8$.',
  9: 'A number is divisible by $9$ when the sum of its digits is divisible by $9$.',
  10: 'A number is divisible by $10$ when its last digit is $0$.',
};

const HOW: Record<number, string> = {
  2: 'You only need the last digit.',
  3: 'Add the digits. Is the sum a multiple of $3$?',
  4: 'You only need the last two digits. Is that two-digit number a multiple of $4$?',
  5: 'You only need the last digit.',
  6: 'Use two rules: the rule for $2$ and the rule for $3$.',
  8: 'You only need the last three digits. Divide that three-digit number by $8$.',
  9: 'Add the digits. Is the sum a multiple of $9$?',
  10: 'You only need the last digit.',
};

const digitsOf = (n: number) => String(n).split('').map(Number);
const digitSum = (n: number) => digitsOf(n).reduce((s, x) => s + x, 0);
const sumTex = (n: number) => `${digitsOf(n).join(' + ')} = ${digitSum(n)}`;

/** The last k digits as maths, e.g. "$536$", or "$036$ (that is, $36$)" when there is a leading zero. */
function tailPhrase(n: number, k: number): string {
  const t = String(n).slice(-k);
  return t.length > 1 && t[0] === '0' ? `$${t}$ (that is, $${Number(t)}$)` : `$${t}$`;
}

/** Why m is or is not a multiple of k. */
function multipleOf(m: number, k: number): string {
  if (m % k === 0) return `$${m} = ${k} \\times ${m / k}$`;
  if (m < k) return `$${m}$ is between $0$ and $${k}$, so it is not a multiple of $${k}$`;
  const q = Math.floor(m / k);
  return `$${k} \\times ${q} = ${k * q}$ and $${k} \\times ${q + 1} = ${k * (q + 1)}$, so $${m}$ is not a multiple of $${k}$`;
}

/** The working for one divisibility test (without the conclusion). */
function testSteps(n: number, k: number): string[] {
  const last = n % 10;
  switch (k) {
    case 2:
      return [`The last digit of $${N(n)}$ is $${last}$, which is ${last % 2 === 0 ? 'even' : 'odd'}.`];
    case 5:
      return [`The last digit of $${N(n)}$ is $${last}$${last === 0 || last === 5 ? '' : ', which is not $0$ or $5$'}.`];
    case 10:
      return [`The last digit of $${N(n)}$ is $${last}$${last === 0 ? '' : ', not $0$'}.`];
    case 3:
    case 9: {
      const s = digitSum(n);
      return [
        `Add the digits: $${sumTex(n)}$.`,
        s % k === 0 ? `$${s} = ${k} \\times ${s / k}$, so the digit sum is divisible by $${k}$.` : `$${s}$ is not a multiple of $${k}$, so the digit sum is not divisible by $${k}$.`,
      ];
    }
    case 4:
    case 8: {
      const places = k === 4 ? 2 : 3;
      const m = n % 10 ** places;
      return [`The last ${k === 4 ? 'two' : 'three'} digits make ${tailPhrase(n, places)}.`, `${cap(multipleOf(m, k))}${m % k === 0 ? `, so $${m}$ is a multiple of $${k}$` : ''}.`];
    }
    default: {
      const even = last % 2 === 0;
      const s = digitSum(n);
      const three = s % 3 === 0;
      return [
        `Rule for $2$: the last digit, $${last}$, is ${even ? 'even' : 'odd'}, so $${N(n)}$ ${even ? 'is' : 'is not'} divisible by $2$.`,
        `Rule for $3$: $${sumTex(n)}$, and $${s}$ ${three ? 'is' : 'is not'} a multiple of $3$, so $${N(n)}$ ${three ? 'is' : 'is not'} divisible by $3$.`,
        even && three ? 'It passes both tests.' : 'To be divisible by $6$, a number must pass both tests.',
      ];
    }
  }
}

/** Offsets that make a tempting "no": even but not a multiple of 4, a multiple of 3 but not 9, and so on. */
const NEAR_MISS: Record<number, number[]> = { 2: [1, 3, 5], 3: [1, 2], 4: [2], 5: [1, 2, 3, 4], 6: [2, 3, 4], 8: [4], 9: [3, 6], 10: [5, 2, 4, 6] };

function divisibilityD1(rng: Rng): Out {
  const k = rng.pick([2, 3, 4, 5, 6, 8, 9, 10, 3, 4, 6, 8, 9]);
  const yes = rng.chance(0.5);
  const lo = k === 8 ? 1000 : rng.pick([100, 1000]);
  const hi = lo === 100 ? 999 : 9999;
  const n = retry(
    () => k * rng.int(Math.ceil(lo / k), Math.floor((hi - 9) / k)) + (yes ? 0 : rng.pick(NEAR_MISS[k])),
    (x) => x >= lo && x <= hi && (x % k === 0) === yes,
  );
  return {
    prompt: `Is $${N(n)}$ divisible by $${k}$? Use a divisibility rule.`,
    parts: [part(fixedChoice(['Yes', 'No'], yes ? 0 : 1))],
    hints: [HOW[k], RULE[k]],
    solution: [RULE[k], ...testSteps(n, k), `So $${N(n)}$ ${yes ? 'is' : 'is not'} divisible by $${k}$. The answer is **${yes ? 'yes' : 'no'}**.`],
  };
}

/** A compact check of all eight rules, for "which numbers divide n?". */
function allRuleSteps(n: number): string[] {
  const last = n % 10;
  const s = digitSum(n);
  const steps: string[] = [];
  const end5 = last === 0 ? 'It is $0$, so the number is divisible by $5$ and by $10$.' : last === 5 ? 'It is $5$, so the number is divisible by $5$ but not by $10$.' : 'It is not $0$ or $5$, so the number is not divisible by $5$ or $10$.';
  steps.push(`Last digit: $${last}$. It is ${last % 2 === 0 ? 'even, so the number is divisible by $2$' : 'odd, so the number is not divisible by $2$'}. ${end5}`);
  steps.push(
    `Digit sum: $${sumTex(n)}$. ` +
      (s % 9 === 0 ? `$${s}$ is a multiple of $9$ (and of $3$), so the number is divisible by $3$ and by $9$.` : s % 3 === 0 ? `$${s}$ is a multiple of $3$ but not of $9$, so the number is divisible by $3$ but not by $9$.` : `$${s}$ is not a multiple of $3$, so the number is not divisible by $3$ or $9$.`),
  );
  const t2 = n % 100;
  steps.push(`Last two digits: ${tailPhrase(n, 2)}. ${cap(multipleOf(t2, 4))}${t2 % 4 === 0 ? '. The number is' : ', and the number is not'} divisible by $4$.`);
  if (t2 % 4 !== 0) steps.push('A number that is not divisible by $4$ cannot be divisible by $8$ (because $8 = 4 \\times 2$).');
  else {
    const t3 = n % 1000;
    steps.push(`Last three digits: ${tailPhrase(n, 3)}. ${cap(multipleOf(t3, 8))}${t3 % 8 === 0 ? '. The number is' : ', and the number is not'} divisible by $8$.`);
  }
  const six = n % 6 === 0;
  steps.push(six ? 'It is divisible by both $2$ and $3$, so it is divisible by $6$.' : `It is not divisible by both $2$ and $3$, so it is not divisible by $6$.`);
  return steps;
}

function divisibilityD2(rng: Rng): Out {
  const n = retry(
    () => rng.pick([6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 72, 90]) * rng.int(8, 600),
    (x) => {
      if (x < 300 || x > 60000) return false;
      const c = DIVISORS.filter((k) => x % k === 0).length;
      return c >= 2 && c <= 6;
    },
    200,
  );
  const yes = DIVISORS.filter((k) => n % k === 0);
  const phrase = rng.pick([
    `Which of these numbers divide evenly into $${N(n)}$? Select all that apply.`,
    `$${N(n)}$ is divisible by which of these numbers? Select all that apply.`,
    `Use divisibility rules. Which of these are factors of $${N(n)}$? Select all that apply.`,
  ]);
  return {
    prompt: phrase,
    parts: [part(multi(rng, DIVISORS.map((k) => ({ md: `$${k}$`, correct: n % k === 0 })), true))],
    hints: ['Check one rule at a time. The last digit tells you about $2$, $5$ and $10$. The digit sum tells you about $3$ and $9$.', 'For $4$ use the last two digits, for $8$ the last three digits, and for $6$ check both $2$ and $3$.'],
    solution: [...allRuleSteps(n), `So $${N(n)}$ is divisible by ${list(yes.map((k) => `$${k}$`))}.`],
  };
}

/** The number with a box for the missing digit. */
const boxTex = (digits: number[], box: number) =>
  digits.map((d, i) => (i === box ? '{\\square}' : String(d)) + (digits.length >= 5 && (digits.length - 1 - i) % 3 === 0 && i < digits.length - 1 ? '\\,' : '')).join('');

function missingDigit(rng: Rng, asMc: boolean): Out {
  for (;;) {
    const k = asMc ? rng.pick([9, 9, 8, 6]) : rng.pick([6, 8, 9]);
    const len = rng.pick([4, 4, 4, 5]);
    const digits = range(0, len - 1).map((i) => (i === 0 ? rng.int(1, 9) : rng.int(0, 9)));
    const box = k === 8 ? rng.int(len - 3, len - 1) : rng.int(0, len - 1);
    if (k === 6 && box !== len - 1 && digits[len - 1] % 2 === 1) digits[len - 1] -= 1;
    const value = (d: number) => Number(digits.map((x, i) => (i === box ? d : x)).join(''));
    const allowed = range(box === 0 ? 1 : 0, 9);
    const works = allowed.filter((d) => value(d) % k === 0);
    if (!works.length || works.length > 5) continue;
    if (asMc && works.length !== 1) continue;
    const shown = boxTex(digits, box);
    const known = digits.filter((_, i) => i !== box);
    const s = known.reduce((a, b) => a + b, 0);
    const steps: string[] = [];
    let near: number[] = [];
    if (k === 9) {
      steps.push(RULE[9]);
      steps.push(`Add the digits you know: $${known.join(' + ')} = ${s}$.`);
      steps.push(`The box holds one digit from $${allowed[0]}$ to $9$, so the digit sum can be from $${s + allowed[0]}$ to $${s + 9}$. The multiple${works.length > 1 ? 's' : ''} of $9$ in that range: ${list(works.map((d) => `$${s + d}$`))}.`);
      steps.push(works.map((d) => `$${s} + ${d} = ${s + d}$`).join(' and ') + `, so the missing digit is ${list(works.map((d) => `$${d}$`), 'or')}.`);
      steps.push(`Check: $${N(value(works[0]))}$ has digit sum $${s + works[0]} = 9 \\times ${(s + works[0]) / 9}$.`);
      near = allowed.filter((d) => (s + d) % 3 === 0 && (s + d) % 9 !== 0);
    } else if (k === 6) {
      steps.push(RULE[6]);
      if (box === len - 1) steps.push('The box is the last digit. For the number to be divisible by $2$, the digit must be even: $0$, $2$, $4$, $6$ or $8$.');
      else steps.push(`The last digit is $${digits[len - 1]}$, which is even, so the number is divisible by $2$ no matter which digit goes in the box.`);
      steps.push(`For $3$: add the digits you know: $${known.join(' + ')} = ${s}$. The total with the missing digit must be a multiple of $3$.`);
      const tries = box === len - 1 ? [0, 2, 4, 6, 8] : allowed;
      steps.push(`Try ${box === len - 1 ? 'each even digit' : 'each digit'}: ${tries.map((d) => `$${s} + ${d} = ${s + d}$`).join(', ')}.`);
      steps.push(`${works.length > 1 ? 'The multiples of $3$ are' : 'The only multiple of $3$ is'} ${list(works.map((d) => `$${s + d}$`))}.`);
      near = allowed.filter((d) => !works.includes(d) && (box === len - 1 ? (s + d) % 3 === 0 : d % 2 === 0));
    } else {
      const tailDigits = digits.slice(len - 3);
      const tailBox = boxTex(tailDigits, box - (len - 3));
      steps.push(RULE[8]);
      steps.push(`Only the last three digits matter: $${tailBox}$. Try each digit in the box and divide by $8$.`);
      const t = (d: number) => value(d) % 1000;
      steps.push(`These work: ${works.map((d) => `$${String(t(d)).padStart(3, '0')} = 8 \\times ${t(d) / 8}$`).join(', ')}.`);
      steps.push('Every other digit leaves a remainder when you divide by $8$.');
      near = allowed.filter((d) => !works.includes(d) && t(d) % 4 === 0);
    }
    const ans = works.map((d) => `$${d}$`);
    if (asMc) {
      const others = allowed.filter((d) => !works.includes(d) && !near.includes(d));
      const picks = [...rng.shuffle(near), ...rng.shuffle(others)].slice(0, 3);
      const opts = [works[0], ...picks].sort((a, b) => a - b);
      return {
        prompt: `Which digit can go in the box to make $${shown}$ divisible by $${k}$?`,
        parts: [part(fixedChoice(opts.map((d) => `$${d}$`), opts.indexOf(works[0])))],
        hints: [HOW[k], RULE[k]],
        solution: [...steps, `The digit is $${works[0]}$: $${N(value(works[0]))}$ is divisible by $${k}$.`],
      };
    }
    return {
      prompt: `The number $${shown}$ is divisible by $${k}$. Which digits could go in the box? Enter every digit that works, separated by commas.`,
      parts: [part({ kind: 'numbers', values: works }, { label: 'Digit(s):', placeholder: 'e.g. 2, 5, 8' })],
      hints: [HOW[k], `${RULE[k]} Try each digit from $0$ to $9$ in the box.`],
      solution: [...steps, `The digit${works.length > 1 ? 's that work are' : ' that works is'} ${list(ans)}.`],
    };
  }
}

const divisibility = skill({
  id: 'm7-divisibility',
  name: 'Divisibility rules',
  description: 'Use the divisibility rules for 2, 3, 4, 5, 6, 8, 9 and 10 to decide whether a number is divisible, and find missing digits.',
  outcomes: ['N1'],
  lessonId: 'm7-1-1',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return divisibilityD1(rng);
    if (d === 2) return divisibilityD2(rng);
    return missingDigit(rng, rng.chance(0.35));
  },
});

// ---------------------------------------------------------------------------
// 1.1 Using divisibility
// ---------------------------------------------------------------------------

interface ShareCtx {
  sizes: number[];
  ask: (n: number, k: number) => string;
  group: string;
  thing: string;
}

const SHARE: ShareCtx[] = [
  { sizes: [3, 4, 6, 8, 9], ask: (n, k) => `$${n}$ students are going to a track meet. Can they be split into teams of $${k}$ with nobody left out?`, group: 'teams', thing: 'students' },
  { sizes: [6, 9, 10, 4], ask: (n, k) => `A farm collected $${n}$ eggs this week. Can all the eggs be packed in cartons of $${k}$ with none left over?`, group: 'cartons', thing: 'eggs' },
  { sizes: [4, 6, 8, 9], ask: (n, k) => `A baker made $${n}$ cookies for a school bake sale. Can the cookies be packed in boxes of $${k}$ with none left over?`, group: 'boxes', thing: 'cookies' },
  { sizes: [5, 6, 8, 10], ask: (n, k) => `A hockey club has $${n}$ pucks. Can the pucks be shared equally among $${k}$ teams with none left over?`, group: 'equal shares', thing: 'pucks' },
  { sizes: [8, 9, 10, 6], ask: (n, k) => `There are $${n}$ chairs for a school concert. Can they be set up in rows of $${k}$ with no chairs left over?`, group: 'rows', thing: 'chairs' },
  { sizes: [3, 4, 5, 6], ask: (n, k) => `A camp has $${n}$ campers. Can they be split into canoe groups of $${k}$ with nobody left out?`, group: 'groups', thing: 'campers' },
];

function shareYesNo(rng: Rng): Out {
  const c = rng.pick(SHARE);
  const k = rng.pick(c.sizes);
  const yes = rng.chance(0.5);
  const n = retry(() => k * rng.int(Math.ceil(120 / k), Math.floor(990 / k)) + (yes ? 0 : rng.pick(NEAR_MISS[k])), (x) => x >= 100 && x <= 999 && x % 100 !== 0 && (x % k === 0) === yes);
  return {
    prompt: c.ask(n, k),
    parts: [part(fixedChoice(['Yes', 'No'], yes ? 0 : 1))],
    hints: [`Nothing is left over exactly when $${n}$ is divisible by $${k}$.`, RULE[k]],
    solution: [
      `Nothing is left over when $${n}$ is divisible by $${k}$. ${RULE[k]}`,
      ...testSteps(n, k),
      yes ? `So $${n}$ is divisible by $${k}$: $${n} \\div ${k} = ${n / k}$. The answer is **yes**, with $${n / k}$ ${c.group}.` : `So $${n}$ is not divisible by $${k}$. The answer is **no**: some ${c.thing} would be left over.`,
    ],
  };
}

const ZERO_WHY = 'Dividing asks "what number times the divisor gives the dividend?"';

function divideByZero(rng: Rng): Out {
  const n = rng.int(2, 60);
  const kind = rng.pick(['n/0', '0/n', 'why'] as const);
  if (kind === 'n/0') {
    return {
      prompt: `What is $${n} \\div 0$?`,
      parts: [part(fixedChoice([`$0$`, `$${n}$`, '$1$', 'It has no answer. We cannot divide by $0$.'], 3))],
      hints: [`${ZERO_WHY} Think: $? \\times 0 = ${n}$.`, 'Any number times $0$ is $0$, never $' + n + '$.'],
      solution: [
        `${ZERO_WHY} So $${n} \\div 0 = ?$ would mean $? \\times 0 = ${n}$.`,
        `But any number times $0$ is $0$. No number times $0$ gives $${n}$.`,
        `So $${n} \\div 0$ has no answer. We cannot divide by $0$.`,
      ],
    };
  }
  if (kind === '0/n') {
    return {
      prompt: `What is $0 \\div ${n}$?`,
      parts: [part(fixedChoice([`$0$`, `$${n}$`, '$1$', 'It has no answer. We cannot divide by $0$.'], 0))],
      hints: [`${ZERO_WHY} Think: $? \\times ${n} = 0$.`, `If you share $0$ cookies among $${n}$ friends, how many does each friend get?`],
      solution: [`${ZERO_WHY} So $0 \\div ${n} = ?$ means $? \\times ${n} = 0$.`, `$0 \\times ${n} = 0$, so the answer is $0$.`, `$0 \\div ${n} = 0$. Dividing **into** $0$ is fine; dividing **by** $0$ is not.`],
    };
  }
  const right = `No number times $0$ gives $${n}$.`;
  return {
    prompt: `Why can we not divide $${n}$ by $0$?`,
    parts: [part(mc(rng, right, [`Because the answer would be $0$.`, `Because the answer would be $${n}$.`, 'Because $0$ is not a number.', `Because $${n}$ is too big.`]))],
    hints: [`${ZERO_WHY}`, `Write $${n} \\div 0 = ?$ as a multiplication: $? \\times 0 = ${n}$.`],
    solution: [`$${n} \\div 0 = ?$ would mean $? \\times 0 = ${n}$.`, 'Any number times $0$ is $0$, so no number works.', `The reason: ${right.charAt(0).toLowerCase() + right.slice(1)}`],
  };
}

/** Pairs of divisors where neither rule implies the other. */
const PAIRS: Array<[number, number]> = [[3, 4], [2, 9], [5, 6], [4, 9], [3, 5], [9, 10], [4, 5], [6, 8], [3, 8], [5, 9]];

function carrollFigure(a: number, b: number): Figure {
  return {
    type: 'table',
    headers: ['', `Divisible by ${a}`, `Not divisible by ${a}`],
    rows: [
      [`Divisible by ${b}`, 'A', 'B'],
      [`Not divisible by ${b}`, 'C', 'D'],
    ],
  };
}
const sectionOf = (n: number, a: number, b: number) => (n % b === 0 ? 0 : 2) + (n % a === 0 ? 0 : 1);
const SECTION = ['A', 'B', 'C', 'D'];
const sectionWords = (a: number, b: number, s: number) => `${s % 2 === 0 ? '' : 'not '}divisible by $${a}$ and ${s < 2 ? '' : 'not '}divisible by $${b}$`;

/** A number in [lo, hi] that lands in the given Carroll section. */
function inSection(rng: Rng, a: number, b: number, s: number, lo: number, hi: number): number {
  return retry(
    () => {
      const base = s === 0 ? (a * b) / gcd(a, b) : s === 1 ? b : s === 2 ? a : 1;
      return base * rng.int(Math.ceil(lo / base), Math.floor(hi / base));
    },
    (x) => sectionOf(x, a, b) === s,
    200,
  );
}

function shortTest(n: number, k: number): string {
  const yes = n % k === 0;
  const last = n % 10;
  switch (k) {
    case 2:
      return `last digit $${last}$ is ${yes ? 'even' : 'odd'}`;
    case 5:
    case 10:
      return `last digit is $${last}$`;
    case 3:
    case 9:
      return `digit sum $${digitSum(n)}$ is ${yes ? '' : 'not '}a multiple of $${k}$`;
    case 4:
      return yes ? `last two digits: $${n % 100} = 4 \\times ${(n % 100) / 4}$` : `last two digits: $${n % 100}$ is not a multiple of $4$`;
    case 8: {
      const t3 = n % 1000;
      if (n % 4 !== 0) return `$${n % 100}$ is not a multiple of $4$, so $${N(n)}$ cannot be a multiple of $8$`;
      if (yes) return `last three digits: $${t3} = 8 \\times ${t3 / 8}$`;
      const q = Math.floor(t3 / 8);
      return `last three digits: $${t3}$ is between $8 \\times ${q} = ${8 * q}$ and $8 \\times ${q + 1} = ${8 * q + 8}$`;
    }
    default:
      return n % 2 !== 0 ? 'it is odd' : digitSum(n) % 3 !== 0 ? `digit sum $${digitSum(n)}$ is not a multiple of $3$` : `it is even and its digit sum $${digitSum(n)}$ is a multiple of $3$`;
  }
}
const verdict = (n: number, k: number) => `${n % k === 0 ? 'divisible' : 'not divisible'} by $${k}$ (${shortTest(n, k)})`;

function carrollOne(rng: Rng): Out {
  const [a, b] = rng.shuffle(rng.pick(PAIRS));
  const s = rng.int(0, 3);
  const n = inSection(rng, a, b, s, 150, 9999);
  return {
    prompt: `This Carroll diagram sorts numbers using two rules. In which section does $${N(n)}$ belong?`,
    figure: carrollFigure(a, b),
    parts: [part(fixedChoice(SECTION.map((x, i) => `${x}: ${sectionWords(a, b, i)}`), s))],
    hints: [`Test $${N(n)}$ for $${a}$, then test it for $${b}$.`, `${RULE[a]} ${RULE[b]}`],
    solution: [
      `Test $${a}$: $${N(n)}$ is ${verdict(n, a)}. That picks the ${s % 2 === 0 ? 'left' : 'right'} column.`,
      `Test $${b}$: $${N(n)}$ is ${verdict(n, b)}. That picks the ${s < 2 ? 'top' : 'bottom'} row.`,
      `$${N(n)}$ belongs in section ${SECTION[s]}: it is ${sectionWords(a, b, s)}.`,
    ],
  };
}

function bothMulti(rng: Rng): Out {
  const [a, b] = rng.pick(PAIRS);
  const nYes = rng.int(1, 3);
  const secs = [...Array(nYes).fill(0), ...rng.shuffle([1, 2, 3, rng.int(1, 3), rng.int(1, 3)]).slice(0, 5 - nYes)];
  const nums = retry(
    () => secs.map((s) => inSection(rng, a, b, s, 100, 3000)),
    (v) => new Set(v).size === v.length,
  );
  const sorted = [...nums].sort((x, y) => x - y);
  return {
    prompt: `Which of these numbers are divisible by both $${a}$ and $${b}$? Select all that apply.`,
    parts: [part(multi(rng, sorted.map((n) => ({ md: `$${N(n)}$`, correct: sectionOf(n, a, b) === 0 })), true))],
    hints: [`A number must pass both tests: the rule for $${a}$ and the rule for $${b}$.`, `${RULE[a]} ${RULE[b]}`],
    solution: [
      `${RULE[a]} ${RULE[b]}`,
      ...sorted.map((n) => `$${N(n)}$: ${verdict(n, a)}; ${verdict(n, b)}.${sectionOf(n, a, b) === 0 ? ' **Both.**' : ''}`),
      `Divisible by both: ${list(sorted.filter((n) => sectionOf(n, a, b) === 0).map((n) => `$${N(n)}$`))}.`,
    ],
  };
}

interface GroupCtx {
  intro: (n: number, name: string) => string;
  ask: string;
  unit: string;
}

const GROUPS: GroupCtx[] = [
  { intro: (n) => `All $${n}$ students at a school are going to a sports day. The teachers want to split them into equal teams with nobody left out.`, ask: 'Which team sizes work?', unit: 'students per team' },
  { intro: (n, name) => `${name} collected $${n}$ cans for the food bank. The cans will be packed in boxes, with the same number in each box and none left over.`, ask: 'Which box sizes work?', unit: 'cans per box' },
  { intro: (n) => `A band is selling $${n}$ chocolate bars to raise money. The bars will be split into equal bundles with none left over.`, ask: 'Which bundle sizes work?', unit: 'bars per bundle' },
  { intro: (n, name) => `${name} is setting up $${n}$ chairs for a graduation. The chairs go in equal rows with none left over.`, ask: 'Which row lengths work?', unit: 'chairs per row' },
  { intro: (n, name) => `${name} has $${n}$ hockey cards to put in a binder. Every page must hold the same number of cards, with none left over.`, ask: 'Which page sizes work?', unit: 'cards per page' },
];

function groupSizes(rng: Rng, asList: boolean): Out {
  const c = rng.pick(GROUPS);
  const name = rng.pick(NAMES);
  const sizes = asList ? rng.pick([[4, 6, 8, 9], [3, 5, 8, 10], [4, 5, 6, 9], [6, 8, 9, 10], [3, 4, 9, 10]]) : [3, 4, 5, 6, 8, 9, 10];
  const n = retry(
    () => rng.pick([12, 18, 24, 30, 36, 40, 45, 60, 72]) * rng.int(3, 40),
    (x) => {
      const c2 = sizes.filter((k) => x % k === 0).length;
      return x >= 100 && x <= 1500 && c2 >= 1 && c2 < sizes.length;
    },
    200,
  );
  const works = sizes.filter((k) => n % k === 0);
  const steps = sizes.map((k) => `$${k}$: $${n}$ is ${verdict(n, k)}.`);
  if (asList) {
    return {
      prompt: `${c.intro(n, name)} The choices are ${list(sizes.map((k) => `$${k}$`), 'or')} ${c.unit}. ${c.ask} Enter every size that works, separated by commas.`,
      parts: [part({ kind: 'numbers', values: works }, { label: 'Sizes:', placeholder: 'e.g. 4, 9' })],
      hints: [`A size works when $${n}$ is divisible by it.`, 'Test each size with its divisibility rule.'],
      solution: [`A size works when $${n}$ is divisible by it, so test each one.`, ...steps, `The sizes that work: ${list(works.map((k) => `$${k}$`))} ${c.unit}.`],
    };
  }
  return {
    prompt: `${c.intro(n, name)} ${c.ask} Select all that apply.`,
    parts: [part(multi(rng, sizes.map((k) => ({ md: `$${k}$ ${c.unit}`, correct: n % k === 0 })), true))],
    hints: [`A size works when $${n}$ is divisible by it.`, 'Use the divisibility rules for each size.'],
    solution: [`A size works when $${n}$ is divisible by it.`, ...steps, `The sizes that work: ${list(works.map((k) => `$${k}$`))} ${c.unit}.`],
  };
}

const STATEMENTS: Array<{ s: string; a: 0 | 1 | 2; why: string[] }> = [
  { s: 'A number that is divisible by $9$ is also divisible by $3$.', a: 0, why: ['Every multiple of $9$ is $9 \\times$ a whole number, and $9 = 3 \\times 3$, so it is also $3 \\times$ a whole number.', 'For example, $72 = 9 \\times 8 = 3 \\times 24$.'] },
  { s: 'A number that is divisible by $3$ is also divisible by $9$.', a: 1, why: ['$18$ is divisible by $3$ and by $9$, so it can be true.', '$12$ is divisible by $3$ but not by $9$ (its digit sum is $3$), so it is not always true.'] },
  { s: 'A number that is divisible by $8$ is also divisible by $4$.', a: 0, why: ['$8 = 4 \\times 2$, so every multiple of $8$ is also a multiple of $4$.', 'For example, $56 = 8 \\times 7 = 4 \\times 14$.'] },
  { s: 'A number that is divisible by $4$ is also divisible by $8$.', a: 1, why: ['$16$ is divisible by $4$ and by $8$, so it can be true.', '$12$ is divisible by $4$ but not by $8$, so it is not always true.'] },
  { s: 'A number that is divisible by $10$ is also divisible by $5$.', a: 0, why: ['A number divisible by $10$ ends in $0$.', 'A number that ends in $0$ passes the rule for $5$ (last digit $0$ or $5$).'] },
  { s: 'A number that is divisible by $5$ is also divisible by $10$.', a: 1, why: ['$20$ is divisible by $5$ and by $10$, so it can be true.', '$15$ is divisible by $5$ but not by $10$, so it is not always true.'] },
  { s: 'A number that is divisible by both $2$ and $3$ is also divisible by $6$.', a: 0, why: ['This is the rule for $6$: a number is divisible by $6$ when it is divisible by both $2$ and $3$.', 'For example, $84$ is even and has digit sum $12$, and $84 = 6 \\times 14$.'] },
  { s: 'An even number is divisible by $6$.', a: 1, why: ['$12$ is even and divisible by $6$, so it can be true.', '$8$ is even but not divisible by $6$, so it is not always true.'] },
  { s: 'An odd number is divisible by $2$.', a: 2, why: ['A number is divisible by $2$ only when its last digit is even.', 'An odd number ends in $1$, $3$, $5$, $7$ or $9$, so it is never divisible by $2$.'] },
  { s: 'A number whose last digit is $5$ is divisible by $10$.', a: 2, why: ['A number is divisible by $10$ only when its last digit is $0$.', 'A last digit of $5$ is never $0$, so this is never true.'] },
  { s: 'An odd number is divisible by $4$.', a: 2, why: ['Every multiple of $4$ is $2 \\times 2 \\times$ a whole number, so it is even.', 'An odd number is never divisible by $4$.'] },
  { s: 'A number whose digits add to $20$ is divisible by $9$.', a: 2, why: ['A number is divisible by $9$ only when its digit sum is a multiple of $9$.', '$20$ is not a multiple of $9$, so this is never true.'] },
  { s: 'A number that is divisible by $6$ is also divisible by $3$.', a: 0, why: ['$6 = 2 \\times 3$, so every multiple of $6$ is also a multiple of $3$.', 'For example, $42 = 6 \\times 7 = 3 \\times 14$.'] },
  { s: 'A number that is divisible by $2$ and by $4$ is also divisible by $8$.', a: 1, why: ['$16$ is divisible by $2$, $4$ and $8$, so it can be true.', '$20$ is divisible by $2$ and $4$ but not by $8$, so it is not always true.'] },
];
const ASN = ['Always true', 'Sometimes true', 'Never true'];

function alwaysSometimes(rng: Rng): Out {
  const st = rng.pick(STATEMENTS);
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} says: "${st.s}" Is this always true, sometimes true or never true?`,
    parts: [part(fixedChoice(ASN, st.a))],
    hints: ['Try a few examples. One example that fails shows it is not **always** true.', 'Think about the divisibility rules for the numbers in the statement.'],
    solution: [...st.why, `The statement is **${ASN[st.a].toLowerCase()}**.`],
  };
}

function zeroClaim(rng: Rng): Out {
  const n = rng.int(3, 40);
  const name = rng.pick(NAMES);
  const right = `Only $0 \\div ${n} = 0$ is true. $${n} \\div 0$ has no answer.`;
  return {
    prompt: `${name} says, "$0 \\div ${n} = 0$ and $${n} \\div 0 = 0$." Which statement is correct?`,
    parts: [
      part(
        mc(rng, right, [
          `Both are true: anything divided with $0$ gives $0$.`,
          `Only $${n} \\div 0 = 0$ is true. $0 \\div ${n}$ has no answer.`,
          `Neither is true: both answers should be $${n}$.`,
          `Both are true, because $0$ is the smallest whole number.`,
        ]),
      ),
    ],
    hints: ['Check each division with multiplication.', `$0 \\div ${n} = 0$ means $0 \\times ${n} = 0$. What would $${n} \\div 0 = 0$ mean?`],
    solution: [
      `Check $0 \\div ${n} = 0$ with multiplication: $0 \\times ${n} = 0$. That is true.`,
      `Check $${n} \\div 0 = 0$: it would mean $0 \\times 0 = ${n}$, which is false. In fact, no number times $0$ gives $${n}$.`,
      `So ${right.charAt(0).toLowerCase() + right.slice(1)}`,
    ],
  };
}

function carrollMany(rng: Rng): Out {
  const [a, b] = rng.shuffle(rng.pick(PAIRS));
  const target = rng.int(0, 3);
  const k = rng.int(1, 3);
  const secs = [...Array(k).fill(target), ...rng.shuffle([0, 1, 2, 3].filter((x) => x !== target)).concat([rng.int(0, 3)]).filter((x) => x !== target).slice(0, 5 - k)];
  while (secs.length < 5) secs.push((target + 1 + rng.int(0, 2)) % 4);
  const nums = retry(
    () => secs.map((s) => inSection(rng, a, b, s, 100, 5000)),
    (v) => new Set(v).size === v.length,
  );
  const sorted = [...nums].sort((x, y) => x - y);
  const inT = sorted.filter((n) => sectionOf(n, a, b) === target);
  return {
    prompt: `Use the Carroll diagram. Which of these numbers belong in section ${SECTION[target]}? Select all that apply.`,
    figure: carrollFigure(a, b),
    parts: [part(multi(rng, sorted.map((n) => ({ md: `$${N(n)}$`, correct: sectionOf(n, a, b) === target })), true))],
    hints: [`Section ${SECTION[target]} holds numbers that are ${sectionWords(a, b, target)}.`, `Test every number for $${a}$ and for $${b}$.`],
    solution: [
      `Section ${SECTION[target]} holds numbers that are ${sectionWords(a, b, target)}.`,
      ...sorted.map((n) => `$${N(n)}$: ${verdict(n, a)}; ${verdict(n, b)}. Section ${SECTION[sectionOf(n, a, b)]}.`),
      `In section ${SECTION[target]}: ${list(inT.map((n) => `$${N(n)}$`))}.`,
    ],
  };
}

function shareCount(rng: Rng): Out {
  const c = rng.pick(SHARE.slice(0, 3));
  const k = rng.pick(c.sizes);
  const n = retry(() => k * rng.int(Math.ceil(150 / k), Math.floor(990 / k)), (x) => x % 100 !== 0);
  return {
    prompt: `${c.ask(n, k)} If yes, how many ${c.group} are there? Use a divisibility rule first, then divide.`,
    parts: [numPart(n / k, { label: `Number of ${c.group}:` })],
    hints: [RULE[k], `Divide: $${n} \\div ${k}$.`],
    solution: [RULE[k], ...testSteps(n, k), `So $${n}$ is divisible by $${k}$, and no ${c.thing} are left over.`, `$${n} \\div ${k} = ${n / k}$, so there are $${n / k}$ ${c.group}.`],
  };
}

const divisibilityApply = skill({
  id: 'm7-divisibility-apply',
  name: 'Using divisibility',
  description: 'Use divisibility to sort numbers in Carroll and Venn diagrams, find factors and equal groups, and explain why we cannot divide by 0.',
  outcomes: ['N1'],
  lessonId: 'm7-1-1',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.55) ? shareYesNo(rng) : divideByZero(rng);
    if (d === 2) return rng.pick([carrollOne, bothMulti, (r: Rng) => groupSizes(r, false), shareCount])(rng);
    return rng.pick([alwaysSometimes, zeroClaim, carrollMany, (r: Rng) => groupSizes(r, true)])(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Fractions to decimals
// ---------------------------------------------------------------------------

const coprime = (n: number, d: number) => gcd(n, d) === 1;

/** n/d with d a factor of 10, 100, 1000 or 10000: the equivalent fraction with that power of 10. */
function powerOf10Steps(n: number, d: number): string[] {
  const p = [10, 100, 1000, 10000].find((x) => x % d === 0)!;
  const m = p / d;
  const e = expand(n, d);
  if (m === 1) return [`$${fr(n, d)}$ already has $${p}$ as its denominator: $${fr(n, d)} = ${barTex(e)}$.`];
  return [`$${d} \\times ${m} = ${p}$, so multiply the numerator and the denominator by $${m}$: $${fr(n, d)} = ${fr(`${n} \\times ${m}`, `${d} \\times ${m}`)} = ${fr(n * m, p)}$.`, `$${fr(n * m, p)}$ is $${n * m}$ ${p === 10 ? 'tenths' : p === 100 ? 'hundredths' : p === 1000 ? 'thousandths' : 'ten-thousandths'}, so $${fr(n, d)} = ${barTex(e)}$.`];
}

const DIVIDE_HINT = 'A fraction is a division: divide the numerator by the denominator.';

function fracToDecD1(rng: Rng): Out {
  const d = rng.pick([2, 4, 5, 8, 10, 20, 25, 50, 4, 5, 8, 20, 25]);
  const n = retry(() => rng.int(1, d - 1), (x) => coprime(x, d));
  const w = rng.chance(0.25) ? rng.int(1, 4) : 0;
  const e = expand(w * d + n, d);
  const shown = w ? `${w}${fr(n, d)}` : fr(n, d);
  const steps = powerOf10Steps(n, d);
  if (w) steps.push(`Add the whole number: $${shown} = ${w} + ${barTex(expand(n, d))} = ${barTex(e)}$.`);
  return {
    prompt: `Write $${shown}$ as a decimal.`,
    parts: [decPart((w * d + n) / d)],
    hints: [`Find an equivalent fraction with a denominator of $10$, $100$ or $1000$.`, DIVIDE_HINT],
    solution: [...steps, `So $${shown} = ${barTex(e)}$.`],
  };
}

const REPEAT_POOL: Array<[number, number]> = [
  [1, 3], [2, 3], [1, 6], [5, 6], [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 11], [2, 11], [3, 11], [5, 11], [7, 11], [9, 11],
  [1, 12], [5, 12], [7, 12], [11, 12], [2, 15], [4, 15], [7, 15], [8, 15], [1, 18], [5, 18], [7, 18],
];

/** Wrong bar placements and other common slips for a repeating decimal. */
function barDistractors(n: number, d: number): string[] {
  const e = expand(n, d);
  const out: string[] = [];
  const all = e.pre + e.rep;
  if (e.pre) out.push(`${e.int}.\\overline{${all}}`);
  if (e.rep.length > 1) out.push(`${e.int}.${e.pre}${e.rep.slice(0, -1)}\\overline{${e.rep.slice(-1)}}`);
  if (e.rep.length > 1) out.push(`${e.int}.${e.pre}\\overline{${e.rep[0]}}`);
  if (!e.pre && e.rep.length === 1) out.push(`${e.int}.${e.rep}`);
  out.push(`${e.int}.${e.pre}${e.rep}`);
  if (e.rep.length > 1) out.push(`${e.int}.${e.pre}\\overline{${e.rep}${e.rep[0]}}`);
  out.push(`0.${n}${d}`);
  return out;
}

function repeatingMc(rng: Rng, pool: Array<[number, number]>): Out {
  const [n, d] = rng.pick(pool);
  const e = expand(n, d);
  const right = barTex(e);
  const wrong = barDistractors(n, d);
  const steps = [`Divide: $${n} \\div ${d} = ${longTex(e)}$`];
  if (e.pre) steps.push(`The digit${e.pre.length > 1 ? 's' : ''} $${e.pre}$ come${e.pre.length > 1 ? '' : 's'} once. Then $${e.rep}$ repeats forever.`);
  else steps.push(`The block $${e.rep}$ repeats forever, starting right after the decimal point.`);
  steps.push(`Put the bar over the repeating block only: $${fr(n, d)} = ${right}$.`);
  return {
    prompt: `Which decimal is equal to $${fr(n, d)}$?`,
    parts: [part(mc(rng, `$${right}$`, wrong.map((w) => `$${w}$`)))],
    hints: [DIVIDE_HINT, 'Keep dividing until the remainders start to repeat. The bar goes over the digits that repeat, and only those.'],
    solution: steps,
  };
}

function nearestThousandth(rng: Rng): Out {
  const [n, d] = rng.pick([...REPEAT_POOL, [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]] as Array<[number, number]>);
  const e = expand(n, d);
  const v = n / d;
  const four = digitsAfter(e, 4);
  const up = Number(four[3]) >= 5;
  const r = Math.round(v * 1000) / 1000;
  return {
    prompt: `Write $${fr(n, d)}$ as a decimal. Round to the nearest thousandth.`,
    parts: [numPart(v, { decimals: 3 })],
    hints: [DIVIDE_HINT, 'Divide to at least four decimal places, then look at the fourth digit to round.'],
    solution: [
      `Divide: $${n} \\div ${d} = ${longTex(e)}$. In bar notation, $${fr(n, d)} = ${barTex(e)}$.`,
      `To round to the thousandths place, look at the ten-thousandths digit: $0.${four.slice(0, 3)}\\underline{${four[3]}}\\ldots$`,
      `It is $${four[3]}$, so ${up ? 'round up' : 'keep the thousandths digit'}.`,
      `$${fr(n, d)} \\approx ${r.toFixed(3)}$`,
    ],
  };
}

function terminatingThousandths(rng: Rng): Out {
  const [n, d] = rng.pick([[1, 8], [3, 8], [5, 8], [7, 8], [3, 40], [7, 40], [9, 40], [11, 40], [3, 16], [5, 16], [9, 16], [3, 125], [7, 125], [9, 200], [11, 200], [13, 20], [17, 25], [21, 50]] as Array<[number, number]>);
  const e = expand(n, d);
  const sol = d === 16 ? [`Divide: $${n} \\div 16 = ${barTex(e)}$. The division ends, so the decimal terminates.`] : powerOf10Steps(n, d);
  return {
    prompt: `Write $${fr(n, d)}$ as a decimal.`,
    parts: [decPart(n / d)],
    hints: ['Find an equivalent fraction with a denominator of $100$, $1000$ or $10\\,000$, or divide.', DIVIDE_HINT],
    solution: [...sol, `So $${fr(n, d)} = ${barTex(e)}$.`],
  };
}

const TERM_POOL: Array<[number, number]> = [[3, 8], [7, 20], [9, 40], [3, 12], [6, 15], [7, 14], [9, 12], [11, 25], [13, 50], [3, 16], [21, 30], [9, 15], [6, 24], [12, 75]];
const REP_POOL: Array<[number, number]> = [[5, 6], [7, 12], [2, 15], [4, 9], [5, 11], [7, 30], [3, 7], [5, 18], [8, 21], [9, 22], [10, 12], [4, 15], [14, 24]];

function whichTerminate(rng: Rng): Out {
  const k = rng.int(2, 3);
  const traps = TERM_POOL.filter(([n, d]) => gcd(n, d) > 1 && !terminates(d));
  const picks = retry(
    () => [rng.pick(traps), ...rng.sample(TERM_POOL, k - 1), ...rng.sample(REP_POOL, 5 - k)],
    (v) => new Set(v.map(([n, d]) => n / d)).size === v.length,
  );
  const fracs = rng.shuffle(picks);
  const line = ([n, d]: [number, number]) => {
    const g = gcd(n, d);
    const sn = n / g;
    const sd = d / g;
    const low = g > 1 ? `$${fr(n, d)} = ${fr(sn, sd)}$ in lowest terms. ` : '';
    const fac = sd === 2 || sd === 5 || sd === 3 || sd === 7 || sd === 11 ? `$${sd}$ is prime` : `$${sd} = ${factorTex(sd)}$`;
    return `${low}${g > 1 ? 'Then ' : `$${fr(n, d)}$: `}${fac}${terminates(sd) ? ': no prime factors other than $2$ and $5$, so it **terminates**' : ': it has a prime factor other than $2$ and $5$, so it **repeats**'}: $${barTex(expand(n, d))}$.`;
  };
  return {
    prompt: 'Which of these fractions are equal to terminating decimals? Select all that apply.',
    parts: [part(multi(rng, fracs.map(([n, d]) => ({ md: `$${fr(n, d)}$`, correct: terminates(d / gcd(n, d)) })), true))],
    hints: ['First write each fraction in lowest terms.', 'A fraction in lowest terms is a terminating decimal when its denominator has no prime factors other than $2$ and $5$.'],
    solution: [
      'Write each fraction in lowest terms and look at the prime factors of the denominator. Only $2$s and $5$s means the decimal terminates.',
      ...fracs.map(line),
      `Terminating: ${list(fracs.filter(([n, d]) => terminates(d / gcd(n, d))).map(([n, d]) => `$${fr(n, d)}$`))}.`,
    ],
  };
}

function elevenths(rng: Rng): Out {
  const useSevenths = rng.chance(0.3);
  if (useSevenths) {
    const k = rng.int(2, 6);
    const e = expand(k, 7);
    const one = expand(1, 7);
    const wrong = [`0.\\overline{${String(142857 * k).slice(0, 2)}}`, `0.\\overline{${k}}`, `0.${'142857'.repeat(1)}`, `0.\\overline{${String(142857 * k).split('').reverse().join('')}}`];
    return {
      prompt: `You know that $${fr(1, 7)} = ${barTex(one)}$. Which decimal is equal to $${fr(k, 7)}$?`,
      parts: [part(mc(rng, `$${barTex(e)}$`, wrong.map((w) => `$${w}$`)))],
      hints: [`$${fr(k, 7)} = ${k} \\times ${fr(1, 7)}$, but it is easier to divide.`, `Divide $${k} \\div 7$. The same six digits $142857$ appear, starting at a different place.`],
      solution: [`Divide: $${k} \\div 7 = ${longTex(e, 12)}$`, `The six digits $${e.rep}$ repeat. They are the digits of $${fr(1, 7)}$, starting at a different place.`, `So $${fr(k, 7)} = ${barTex(e)}$.`],
    };
  }
  const k = rng.int(2, 10);
  const block = String(9 * k).padStart(2, '0');
  const right = `0.\\overline{${block}}`;
  const wrong = [`0.\\overline{${String(k).padStart(2, '0')}}`, `0.\\overline{${k}}`, `0.${block}`, `0.\\overline{${String(11 * k).padStart(2, '0')}}`];
  return {
    prompt: `You know that $${fr(1, 11)} = 0.\\overline{09}$. Use the pattern to choose the decimal that is equal to $${fr(k, 11)}$.`,
    parts: [part(mc(rng, `$${right}$`, wrong.map((w) => `$${w}$`)))],
    hints: [`$${fr(k, 11)}$ is $${k}$ times $${fr(1, 11)}$.`, `Multiply the repeating block by $${k}$: $09 \\times ${k}$.`],
    solution: [`$${fr(k, 11)} = ${k} \\times ${fr(1, 11)}$, so multiply the repeating block $09$ by $${k}$: $9 \\times ${k} = ${9 * k}$.`, `Check by dividing: $${k} \\div 11 = ${longTex(expand(k, 11))}$`, `So $${fr(k, 11)} = ${right}$.`],
  };
}

const fractionToDecimal = skill({
  id: 'm7-fraction-to-decimal',
  name: 'Fractions as decimals',
  description: 'Write fractions as terminating or repeating decimals, using bar notation, and tell which fractions terminate.',
  outcomes: ['N4'],
  lessonId: 'm7-1-2',
  format: 'free',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return fracToDecD1(rng);
    if (d === 2) return rng.pick([(r: Rng) => repeatingMc(r, REPEAT_POOL.filter(([, x]) => x === 3 || x === 9 || x === 11 || x === 6)), nearestThousandth, terminatingThousandths])(rng);
    return rng.pick([whichTerminate, (r: Rng) => repeatingMc(r, REPEAT_POOL.filter(([n, x]) => expand(n, x).pre !== '').concat([[3, 7], [5, 7], [13, 22], [7, 30]])), elevenths])(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Decimals to fractions
// ---------------------------------------------------------------------------

const LOWEST = 'Write your answer in lowest terms.';
const PLACE_HINT = 'The place value of the last digit gives the denominator: tenths, hundredths or thousandths.';

function simplifySteps(n: number, d: number): string[] {
  const g = gcd(n, d);
  if (g === 1) return [`$${n}$ and $${d}$ have no common factor other than $1$, so $${fr(n, d)}$ is already in lowest terms.`];
  return [`Divide the numerator and the denominator by $${g}$: $${fr(n, d)} = ${fr(`${n} \\div ${g}`, `${d} \\div ${g}`)} = ${fr(n / g, d / g)}$.`];
}
const lowTex = (n: number, d: number) => (d / gcd(n, d) === 1 ? String(n / d) : fr(n / gcd(n, d), d / gcd(n, d)));

const DEC_CTX: Array<(dec: string) => string> = [
  (dec) => `Write $${dec}$ as a fraction.`,
  (dec) => `A recipe calls for $${dec}$ kg of butter. Write $${dec}$ as a fraction.`,
  (dec) => `${'%NAME%'} ran $${dec}$ km around the track at school. Write $${dec}$ as a fraction.`,
  (dec) => `A bottle holds $${dec}$ L of water. Write $${dec}$ as a fraction.`,
  (dec) => `Write the decimal $${dec}$ as a fraction.`,
];

function decimalToFraction(rng: Rng, places: number, whole = 0): Out {
  const den = 10 ** places;
  const num = retry(() => rng.int(1, den - 1), (x) => x % 10 !== 0 && (places === 1 || gcd(x, den) > 1 || rng.chance(0.3)));
  const dec = `${whole}.${String(num).padStart(places, '0')}`;
  const total = whole * den + num;
  const ctx = whole ? (d: string) => `Write $${d}$ as a fraction.` : rng.pick(DEC_CTX);
  const word = places === 1 ? 'tenths' : places === 2 ? 'hundredths' : 'thousandths';
  const steps = whole
    ? [`$${dec} = ${whole} + 0.${String(num).padStart(places, '0')}$. The last digit is in the ${word} place, so $${dec} = ${whole}${fr(num, den)}$.`, ...simplifySteps(num, den)]
    : [`The last digit is in the ${word} place, so the denominator is $${den}$: $${dec} = ${fr(num, den)}$.`, ...simplifySteps(num, den)];
  const g = gcd(num, den);
  const final = whole ? `So $${dec} = ${whole}${fr(num / g, den / g)} = ${lowTex(total, den)}$. Either form is correct.` : `So $${dec} = ${lowTex(total, den)}$.`;
  return {
    prompt: `${ctx(dec).replace('%NAME%', rng.pick(NAMES))} ${whole ? 'Write your answer in lowest terms (an improper fraction or a mixed number).' : LOWEST}`,
    parts: [numPart(total / den, { fraction: 'lowest' })],
    hints: [PLACE_HINT, 'Then divide the numerator and the denominator by their greatest common factor.'],
    solution: [...steps, final],
  };
}

function singleRepeat(rng: Rng, whole = 0): Out {
  const a = rng.int(1, 8);
  const dec = `${whole}.\\overline{${a}}`;
  const n = whole * 9 + a;
  const steps = [`Use the pattern $0.\\overline{a} = ${fr('a', 9)}$: $0.\\overline{${a}} = ${fr(a, 9)}$.`];
  if (gcd(a, 9) > 1) steps.push(...simplifySteps(a, 9));
  if (whole) steps.push(`Add the whole number: $${dec} = ${whole}${lowTex(a, 9)} = ${lowTex(n, 9)}$. Either form is correct.`);
  steps.push(`Check: $${a} \\div 9 = 0.${String(a).repeat(5)}\\ldots$`);
  return {
    prompt: `Write $${dec}$ as a fraction. ${whole ? 'Write your answer in lowest terms (an improper fraction or a mixed number).' : LOWEST}`,
    parts: [numPart(n / 9, { fraction: 'lowest' })],
    hints: ['One repeating digit: $0.\\overline{1} = \\frac{1}{9}$, $0.\\overline{2} = \\frac{2}{9}$, and so on.', 'Put the repeating digit over $9$, then simplify.'],
    solution: [...steps, `So $${dec} = ${lowTex(n, 9)}$.`],
  };
}

const TWO_DIGIT = [9, 12, 15, 18, 21, 24, 27, 36, 45, 54, 63, 72, 81, 7, 13, 23, 6, 42, 51, 57, 75, 84, 93];

function doubleRepeat(rng: Rng, whole = 0): Out {
  const ab = rng.pick(TWO_DIGIT);
  const block = String(ab).padStart(2, '0');
  const dec = `${whole}.\\overline{${block}}`;
  const n = whole * 99 + ab;
  const steps = [`Use the pattern $0.\\overline{ab} = ${fr('ab', 99)}$: $0.\\overline{${block}} = ${fr(ab, 99)}$.`, ...simplifySteps(ab, 99)];
  if (whole) steps.push(`Add the whole number: $${dec} = ${whole}${lowTex(ab, 99)} = ${lowTex(n, 99)}$. Either form is correct.`);
  const g = gcd(ab, 99);
  steps.push(`Check: $${ab / g} \\div ${99 / g} = ${longTex(expand(ab / g, 99 / g))}$`);
  return {
    prompt: `Write $${dec}$ as a fraction. ${whole ? 'Write your answer in lowest terms (an improper fraction or a mixed number).' : LOWEST}`,
    parts: [numPart(n / 99, { fraction: 'lowest' })],
    hints: ['Two repeating digits: $0.\\overline{ab} = \\frac{ab}{99}$. For example, $0.\\overline{12} = \\frac{12}{99}$.', 'Put the two-digit block over $99$, then divide the numerator and the denominator by their greatest common factor.'],
    solution: [...steps, `So $${dec} = ${lowTex(n, 99)}$.`],
  };
}

function doubleRepeatMc(rng: Rng): Out {
  const ab = rng.pick(TWO_DIGIT.filter((x) => x >= 10 && x % 11 !== 0));
  const block = String(ab);
  const right = lowTex(ab, 99);
  const wrong = [lowTex(ab, 100), lowTex(Number(block[0]), 9), lowTex(ab, 90), lowTex(Number(block[1]), 9), lowTex(ab, 999)].filter((w) => w !== right && w !== '0');
  return {
    prompt: `Which fraction is equal to $0.\\overline{${block}}$?`,
    parts: [part(mc(rng, `$${right}$`, wrong.map((w) => `$${w}$`)))],
    hints: ['Two repeating digits: $0.\\overline{ab} = \\frac{ab}{99}$.', 'Simplify, then compare with the choices.'],
    solution: [`$0.\\overline{${block}} = ${fr(ab, 99)}$.`, ...simplifySteps(ab, 99), `$${fr(ab, 100)}$ would be $0.${block}$, which stops. The bar means the digits go on forever.`, `So $0.\\overline{${block}} = ${right}$.`],
  };
}

const decimalToFractionSkill = skill({
  id: 'm7-decimal-to-fraction',
  name: 'Decimals as fractions',
  description: 'Write terminating decimals and repeating decimals (with one or two repeating digits) as fractions in lowest terms.',
  outcomes: ['N4'],
  lessonId: 'm7-1-2',
  format: 'free',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return decimalToFraction(rng, rng.pick([1, 2, 2]));
    if (d === 2) {
      const k = rng.int(0, 3);
      if (k === 0) return decimalToFraction(rng, 3);
      if (k === 1) return decimalToFraction(rng, rng.pick([1, 2]), rng.int(1, 4));
      return singleRepeat(rng);
    }
    const k = rng.int(0, 4);
    if (k <= 1) return doubleRepeat(rng);
    if (k === 2) return rng.chance(0.5) ? doubleRepeat(rng, rng.int(1, 3)) : singleRepeat(rng, rng.int(1, 3));
    return doubleRepeatMc(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Comparing numbers
// ---------------------------------------------------------------------------

interface Num {
  /** How it is written. */
  tex: string;
  /** Exact value as a fraction. */
  n: number;
  d: number;
  /** True when shown as a fraction or mixed number (so it needs converting). */
  isFrac: boolean;
}

const decNum = (s: string): Num => {
  const [i, f = ''] = s.split('.');
  const d = 10 ** f.length;
  return { tex: s, n: Number(i) * d + Number(f || 0), d, isFrac: false };
};
const fracNum = (n: number, d: number, whole = 0): Num => ({ tex: whole ? `${whole}${fr(n, d)}` : fr(n, d), n: whole * d + n, d, isFrac: true });
const val = (x: Num) => x.n / x.d;
const cmp = (a: Num, b: Num) => Math.sign(a.n * b.d - b.n * a.d);
const PLACES = ['tenths', 'hundredths', 'thousandths', 'ten-thousandths', 'hundred-thousandths', 'millionths'];

/** Compare two values place by place. */
function placeSentence(a: Num, b: Num): string {
  const A = expand(a.n, a.d);
  const B = expand(b.n, b.d);
  if (A.int !== B.int) return `Compare the whole-number parts: $${A.int} ${A.int > B.int ? '>' : '<'} ${B.int}$.`;
  const da = digitsAfter(A, 6);
  const db = digitsAfter(B, 6);
  for (let i = 0; i < 6; i++) {
    if (da[i] !== db[i]) {
      const same = i === 0 ? `The whole-number parts are both $${A.int}$.` : `The digits match up to the ${PLACES[i - 1]} place.`;
      return `${same} In the ${PLACES[i]} place, $${da[i]} ${da[i] > db[i] ? '>' : '<'} ${db[i]}$.`;
    }
  }
  return 'Every digit matches.';
}

const SIGNS = ['$<$', '$>$', '$=$'];
const signIdx = (c: number) => (c < 0 ? 0 : c > 0 ? 1 : 2);
const signTex = (c: number) => (c < 0 ? '<' : c > 0 ? '>' : '=');

function comparePrompt(a: Num, b: Num): string {
  return `Choose the symbol that makes this true: $$${a.tex} \\;\\; \\square \\;\\; ${b.tex}$$`;
}

/** Two close decimals to thousandths (place value). */
function closeDecimals(rng: Rng): [Num, Num] {
  const w = rng.pick([0, 0, 0, 1, 2, 3, 5, 8]);
  const [p, q, r] = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
  const pairs: Array<[string, string]> = [
    [`${p}${q}`, `${p}0${q}`],
    [`${p}`, `${p}${q}`],
    [`${p}${q}`, `${p}${q}${r}`],
    [`0${p}`, `${p}`],
    [`${p}${r}`, `${p}${q}${r}`],
    [`${q}`, `${p}${q}`],
    [`${p}`, `${p}0`],
  ];
  const [x, y] = rng.pick(pairs);
  const [s, t] = rng.shuffle([`${w}.${x}`, `${w}.${y}`]);
  return [decNum(s), decNum(t)];
}

function compareDecimals(rng: Rng): Out {
  const [a, b] = closeDecimals(rng);
  const c = cmp(a, b);
  const A = expand(a.n, a.d);
  const B = expand(b.n, b.d);
  const len = Math.max(A.pre.length, B.pre.length);
  const pad = (e: Expansion) => `${e.int}.${digitsAfter(e, len)}`;
  return {
    prompt: comparePrompt(a, b),
    parts: [part(fixedChoice(SIGNS, signIdx(c)))],
    hints: ['Write both decimals with the same number of decimal places by adding zeros at the end.', 'Compare digits from left to right. The first place where they differ decides.'],
    solution: [
      `Give both numbers the same number of decimal places: $${pad(A)}$ and $${pad(B)}$.`,
      c === 0 ? 'Every digit matches, so the numbers are equal. Zeros at the end of a decimal do not change its value.' : placeSentence(a, b),
      `So $${a.tex} ${signTex(c)} ${b.tex}$.`,
    ],
  };
}

const HALF_POOL: Array<[number, number]> = [[2, 5], [3, 8], [1, 3], [3, 7], [4, 9], [2, 7], [5, 12], [1, 4], [3, 10], [4, 11], [5, 11], [3, 5], [5, 8], [2, 3], [4, 7], [5, 9], [7, 12], [7, 10], [6, 11], [5, 6], [9, 16], [7, 13]];

function halfReason(n: number, d: number): string {
  const half = d / 2;
  const halfTex = Number.isInteger(half) ? `${half}` : `${Math.floor(half)}.5`;
  return `Half of $${d}$ is $${halfTex}$, and $${n} ${n < half ? '<' : '>'} ${halfTex}$, so $${fr(n, d)} ${n < half ? '<' : '>'} ${fr(1, 2)}$.`;
}

function compareHalf(rng: Rng): Out {
  const below = HALF_POOL.filter(([n, d]) => n / d < 0.5);
  const above = HALF_POOL.filter(([n, d]) => n / d > 0.5);
  const [x, y] = rng.shuffle([rng.pick(below), rng.pick(above)]);
  const a = fracNum(x[0], x[1]);
  const b = fracNum(y[0], y[1]);
  const c = cmp(a, b);
  return {
    prompt: comparePrompt(a, b),
    parts: [part(fixedChoice(SIGNS, signIdx(c)))],
    hints: ['Compare each fraction with the benchmark $\\frac{1}{2}$.', 'A fraction is less than $\\frac{1}{2}$ when its numerator is less than half of its denominator.'],
    solution: [halfReason(x[0], x[1]), halfReason(y[0], y[1]), `One fraction is below $${fr(1, 2)}$ and the other is above it, so $${a.tex} ${signTex(c)} ${b.tex}$.`],
  };
}

function compareNearOne(rng: Rng): Out {
  const pool: Array<[number, number]> = [[3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [11, 12], [2, 3], [14, 15]];
  const [x, y] = rng.sample(pool, 2);
  const a = fracNum(x[0], x[1]);
  const b = fracNum(y[0], y[1]);
  const c = cmp(a, b);
  const gap = (p: [number, number]) => fr(p[1] - p[0], p[1]);
  const closer = x[1] > y[1] ? a : b;
  return {
    prompt: comparePrompt(a, b),
    parts: [part(fixedChoice(SIGNS, signIdx(c)))],
    hints: ['Use the benchmark $1$. How far is each fraction from $1$?', 'The fraction that is closer to $1$ is the larger one.'],
    solution: [
      `$${a.tex}$ is $${gap(x)}$ less than $1$. $${b.tex}$ is $${gap(y)}$ less than $1$.`,
      `$${gap(x[1] > y[1] ? x : y)}$ is a smaller piece than $${gap(x[1] > y[1] ? y : x)}$, so $${closer.tex}$ is closer to $1$.`,
      `So $${a.tex} ${signTex(c)} ${b.tex}$.`,
    ],
  };
}

const FD_POOL: Array<[number, number]> = [[3, 4], [1, 4], [2, 5], [3, 5], [4, 5], [5, 8], [3, 8], [7, 8], [7, 20], [9, 20], [13, 20], [2, 3], [1, 3], [1, 6], [5, 6], [4, 9], [3, 25], [1, 8], [11, 25], [7, 10]];

function nearDecimal(rng: Rng, v: number): string {
  const opts: string[] = [];
  const add = (x: number, dp: number) => {
    if (x > 0 && x < 10) opts.push(x.toFixed(dp).replace(/(\.\d*?[1-9])0+$/, '$1'));
  };
  const r2 = Math.round(v * 100) / 100;
  const r1 = Math.round(v * 10) / 10;
  add(r2, 2);
  add(r1, 1);
  add(r2 + 0.01, 2);
  add(r2 - 0.01, 2);
  add(Math.round(v * 1000) / 1000 + 0.001, 3);
  add(Math.round(v * 1000) / 1000 - 0.001, 3);
  add(Math.round(v * 1000) / 1000, 3);
  const ok = opts.filter((s) => /\.\d/.test(s));
  const equal = ok.filter((s) => Math.abs(Number(s) - v) < 1e-9);
  const other = ok.filter((s) => Math.abs(Number(s) - v) >= 1e-9);
  return equal.length && rng.chance(0.15) ? equal[0] : rng.pick(other);
}

function compareFracDec(rng: Rng, whole = 0): Out {
  const [n, d] = rng.pick(FD_POOL);
  const f = fracNum(n, d, whole);
  const dstr = nearDecimal(rng, val(f));
  const dn = decNum(dstr);
  const [a, b] = rng.shuffle([f, dn]);
  const c = cmp(a, b);
  const e = expand(f.n, f.d);
  return {
    prompt: comparePrompt(a, b),
    parts: [part(fixedChoice(SIGNS, signIdx(c)))],
    hints: ['Write the fraction as a decimal so both numbers are in the same form.', 'Then compare place by place, from left to right.'],
    solution: [
      `Write the ${whole ? 'mixed number' : 'fraction'} as a decimal: $${f.tex} = ${whole ? `${whole} + ${fr(n, d)} = ` : ''}${e.rep ? `${barTex(e)} = ${longTex(e)}` : barTex(e)}$.`,
      c === 0 ? `$${barTex(e)}$ and $${dstr}$ are the same number.` : `Compare $${e.rep ? longTex(e) : barTex(e)}$ with $${dstr}$. ${placeSentence(f, dn)}`,
      `So $${a.tex} ${signTex(c)} ${b.tex}$.`,
    ],
  };
}

function compareRepeating(rng: Rng): Out {
  const [n, d] = rng.pick([[1, 3], [2, 3], [1, 6], [5, 6], [4, 9], [5, 9], [7, 9], [4, 11], [1, 9], [8, 9]] as Array<[number, number]>);
  const e = expand(n, d);
  const kind = rng.pick(['frac', 'bar', 'bar'] as const);
  const left: Num = kind === 'frac' ? fracNum(n, d) : { tex: barTex(e), n, d, isFrac: false };
  const short = rng.pick([digitsAfter(e, 2), digitsAfter(e, 1), digitsAfter(e, 3), String(Number(digitsAfter(e, 2)) + 1).padStart(2, '0')]);
  const right = rng.chance(0.2) && kind === 'bar' ? fracNum(n, d) : decNum(`0.${short}`);
  const [a, b] = rng.shuffle([left, right]);
  const c = cmp(a, b);
  const steps: string[] = [];
  for (const x of [a, b]) {
    const ex = expand(x.n, x.d);
    if (x.isFrac) steps.push(`$${x.tex} = ${barTex(ex)} = ${longTex(ex)}$`);
    else if (ex.rep) steps.push(`The bar means the digits repeat forever: $${x.tex} = ${longTex(ex)}$`);
  }
  steps.push(c === 0 ? 'Both are the same repeating decimal.' : placeSentence(a, b));
  return {
    prompt: comparePrompt(a, b),
    parts: [part(fixedChoice(SIGNS, signIdx(c)))],
    hints: ['Write a repeating decimal with several of its digits, like $0.\\overline{3} = 0.3333\\ldots$', 'Then compare place by place. A repeating decimal keeps going after a terminating decimal stops.'],
    solution: [...steps, `So $${a.tex} ${signTex(c)} ${b.tex}$.`],
  };
}

function compareContext(rng: Rng): Out {
  const [p1, p2] = rng.sample(NAMES, 2);
  const ctx = rng.pick([
    { what: 'ran', unit: 'km', q: 'Who ran farther?', same: 'They ran the same distance.', more: 'farther' },
    { what: 'picked', unit: 'kg of saskatoon berries', q: 'Who picked more berries?', same: 'They picked the same amount.', more: 'more' },
    { what: 'biked', unit: 'km on the trail', q: 'Who biked farther?', same: 'They biked the same distance.', more: 'farther' },
    { what: 'poured', unit: 'L of juice for the class party', q: 'Who poured more juice?', same: 'They poured the same amount.', more: 'more' },
  ]);
  const w = rng.int(1, 4);
  const [n, d] = rng.pick(FD_POOL);
  const f = fracNum(n, d, w);
  const dstr = nearDecimal(rng, val(f));
  const dn = decNum(dstr);
  const c = cmp(f, dn);
  const e = expand(f.n, f.d);
  const opts = [p1, p2, ctx.same];
  const idx = c > 0 ? 0 : c < 0 ? 1 : 2;
  return {
    prompt: `${p1} ${ctx.what} $${f.tex}$ ${ctx.unit}. ${p2} ${ctx.what} $${dstr}$ ${ctx.unit}. ${ctx.q}`,
    parts: [part(fixedChoice(opts, idx))],
    hints: ['Write the mixed number as a decimal.', 'Compare the whole-number parts first, then the decimal places from left to right.'],
    solution: [
      `Write $${f.tex}$ as a decimal: $${f.tex} = ${w} + ${fr(n, d)} = ${e.rep ? longTex(e) : barTex(e)}$.`,
      c === 0 ? `$${barTex(e)} = ${dstr}$, so the amounts are equal.` : `Compare $${e.rep ? longTex(e) : barTex(e)}$ with $${dstr}$. ${placeSentence(f, dn)}`,
      c === 0 ? ctx.same : `$${f.tex} ${signTex(c)} ${dstr}$, so ${c > 0 ? p1 : p2} ${ctx.what} ${ctx.more}.`,
    ],
  };
}

const compareNumbers = skill({
  id: 'm7-compare-numbers',
  name: 'Comparing fractions and decimals',
  description: 'Compare fractions, decimals and whole numbers using the benchmarks 0, 1/2 and 1, place value and equivalent forms.',
  outcomes: ['N7'],
  lessonId: 'm7-1-3',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.55) ? compareDecimals(rng) : compareHalf(rng);
    if (d === 2) return rng.pick([(r: Rng) => compareFracDec(r), (r: Rng) => compareFracDec(r), compareNearOne])(rng);
    return rng.pick([compareRepeating, compareContext, (r: Rng) => compareFracDec(r, r.int(1, 3))])(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Ordering numbers
// ---------------------------------------------------------------------------

const IDS = 'abcdefgh';

interface OrderCtx {
  intro: string;
  unit: string;
  up: string;
  down: string;
}

const ORDER_CTX: OrderCtx[] = [
  { intro: 'Five friends did the long jump at a track meet. Here are their distances in metres.', unit: 'm', up: 'shortest to longest', down: 'longest to shortest' },
  { intro: 'A vet weighed five puppies. Here are their masses in kilograms.', unit: 'kg', up: 'lightest to heaviest', down: 'heaviest to lightest' },
  { intro: 'Here are the lengths of five hiking trails in a mountain park, in kilometres.', unit: 'km', up: 'shortest to longest', down: 'longest to shortest' },
  { intro: 'Five classes measured how much rain fell in their gardens last week, in centimetres.', unit: 'cm', up: 'least to greatest', down: 'greatest to least' },
];

function orderPart(rng: Rng, nums: Num[], ascending: boolean, unit?: string): { part: Part; sorted: Num[] } {
  const sorted = [...nums].sort((x, y) => (ascending ? cmp(x, y) : cmp(y, x)));
  const shown = retry(() => rng.shuffle(nums), (v) => v.some((x, i) => x !== sorted[i]) && v.some((x, i) => x !== sorted[sorted.length - 1 - i]));
  const items: Choice[] = shown.map((x, i) => ({ id: IDS[i], md: unit ? `$${x.tex}$ ${unit}` : `$${x.tex}$` }));
  const idOf = (x: Num) => items[shown.indexOf(x)].id;
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map(idOf) };
  return { part: { answer }, sorted };
}

const minGap = (nums: Num[]) => {
  const v = nums.map(val).sort((a, b) => a - b);
  return Math.min(...v.slice(1).map((x, i) => x - v[i]));
};

function orderDecimals(rng: Rng): Out {
  const w = rng.pick([0, 0, 1, 2, 3, 4, 6, 12]);
  const [p, q, r] = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
  const pool = [`${p}`, `${p}${q}`, `${p}0${q}`, `0${p}${q}`, `${q}${p}`, `${p}${q}${r}`, `${p}${r}`, `0${p}`, `${q}`, `${p}${r}${q}`];
  const picks = retry(
    () => rng.sample(pool, 4),
    (v) => new Set(v).size === 4 && v.some((s) => s.length === 3) && v.some((s) => s.length === 1),
  );
  const nums = picks.map((s) => decNum(`${w}.${s}`));
  const up = rng.chance(0.65);
  const { part: pt, sorted } = orderPart(rng, nums, up);
  const pad = (x: Num) => `${expand(x.n, x.d).int}.${digitsAfter(expand(x.n, x.d), 3)}`;
  return {
    prompt: `Put these numbers in order from **${up ? 'least to greatest' : 'greatest to least'}**.`,
    parts: [pt],
    hints: ['Give every number three decimal places by adding zeros at the end.', 'Compare the tenths first, then the hundredths, then the thousandths.'],
    solution: [
      `Write each number with three decimal places: ${nums.map((x) => `$${pad(x)}$`).join(', ')}.`,
      w === 0 ? `Now they are all thousandths, so compare them like whole numbers: $${[...nums].sort((x, y) => cmp(x, y)).map((x) => Number(digitsAfter(expand(x.n, x.d), 3))).join(' < ')}$ thousandths.` : `The whole-number parts are all $${w}$, so compare the decimal parts place by place.`,
      `From ${up ? 'least to greatest' : 'greatest to least'}: ${sorted.map((x) => `$${x.tex}$`).join(', ')}.`,
    ],
  };
}

const ORDER_FRACS: Array<[number, number]> = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [1, 8], [3, 8], [5, 8], [7, 8], [3, 10], [7, 10], [9, 10], [7, 20], [11, 20], [5, 12], [7, 12]];

function decLine(x: Num): string {
  const e = expand(x.n, x.d);
  return x.isFrac ? `$${x.tex} = ${e.rep ? `${longTex(e, 4)}` : barTex(e)}$` : `$${x.tex}$`;
}

function orderMixed(rng: Rng): Out {
  const nums = retry(
    () => {
      const fs = rng.sample(ORDER_FRACS, 2).map(([n, d]) => fracNum(n, d));
      const ds = fs.map((f) => decNum(nearDecimal(rng, val(f))));
      if (rng.chance(0.4)) ds[1] = decNum(`0.${rng.int(1, 9)}${rng.int(0, 9)}${rng.int(1, 9)}`);
      return [...fs, ...ds];
    },
    (v) => new Set(v.map(val)).size === 4 && minGap(v) >= 0.002,
    200,
  );
  const up = rng.chance(0.6);
  const { part: pt, sorted } = orderPart(rng, nums, up);
  return {
    prompt: `Put these numbers in order from **${up ? 'least to greatest' : 'greatest to least'}**.`,
    parts: [pt],
    hints: ['Change each fraction to a decimal, so all the numbers are in the same form.', 'Then compare place by place. For a repeating decimal, write out a few digits.'],
    solution: [
      `Write the fractions as decimals: ${nums.filter((x) => x.isFrac).map(decLine).join(' and ')}.`,
      `Compare all four as decimals: $${[...nums].sort((x, y) => cmp(x, y)).map((x) => { const e = expand(x.n, x.d); return e.rep ? longTex(e, 4) : barTex(e); }).join(' < ')}$.`,
      `From ${up ? 'least to greatest' : 'greatest to least'}: ${sorted.map((x) => `$${x.tex}$`).join(', ')}.`,
    ],
  };
}

function orderFive(rng: Rng): Out {
  const ctx = rng.chance(0.6) ? rng.pick(ORDER_CTX) : null;
  const B = rng.int(1, 3);
  const nums = retry(
    () => {
      const [f1, f2] = rng.sample(ORDER_FRACS, 2);
      const mixed = fracNum(f1[0], f1[1], B);
      const impN = (B + (rng.chance(0.5) ? 0 : -1)) * f2[1] + f2[0];
      const improper: Num = { tex: fr(impN, f2[1]), n: impN, d: f2[1], isFrac: true };
      const d1 = decNum(nearDecimal(rng, val(mixed)));
      const d2 = rng.chance(0.5)
        ? decNum(`${B}.${rng.pick(['0', '1', '2'])}${rng.int(1, 9)}${rng.chance(0.5) ? rng.int(1, 9) : ''}`)
        : decNum(`${B - 1}.9${rng.int(0, 8)}${rng.chance(0.5) ? rng.int(1, 9) : ''}`);
      const whole: Num = { tex: String(B), n: B, d: 1, isFrac: false };
      return [whole, mixed, improper, d1, d2];
    },
    (v) => new Set(v.map(val)).size === 5 && minGap(v) >= 0.004 && v.every((x) => val(x) > 0) && gcd(v[2].n, v[2].d) === 1 && v[2].n > v[2].d,
    300,
  );
  const up = rng.chance(0.6);
  const { part: pt, sorted } = orderPart(rng, nums, up, ctx?.unit);
  const word = ctx ? (up ? ctx.up : ctx.down) : up ? 'least to greatest' : 'greatest to least';
  const imp = nums[2];
  const impE = expand(imp.n, imp.d);
  return {
    prompt: `${ctx ? `${ctx.intro} ` : ''}Put ${ctx ? 'them' : 'these numbers'} in order from **${word}**.`,
    parts: [pt],
    hints: ['Write every number as a decimal.', 'Compare the whole-number parts first. Then compare the decimal parts place by place.'],
    solution: [
      `Mixed number: ${decLine(nums[1])}.`,
      `Improper fraction: $${imp.tex} = ${Math.floor(imp.n / imp.d)}${fr(imp.n % imp.d, imp.d)} = ${impE.rep ? longTex(impE, 4) : barTex(impE)}$.`,
      `The whole number is $${B} = ${B}.000$, and the decimals are $${nums[3].tex}$ and $${nums[4].tex}$.`,
      `Compare: $${[...nums].sort((x, y) => cmp(x, y)).map((x) => { const e = expand(x.n, x.d); return e.rep ? longTex(e, 4) : x.isFrac ? barTex(e) : x.tex; }).join(' < ')}$.`,
      `From ${word}: ${sorted.map((x) => `$${x.tex}$${ctx ? ` ${ctx.unit}` : ''}`).join(', ')}.`,
    ],
  };
}

const orderNumbers = skill({
  id: 'm7-order-numbers',
  name: 'Ordering fractions and decimals',
  description: 'Order sets of fractions, decimals to thousandths and whole numbers from least to greatest or greatest to least.',
  outcomes: ['N7'],
  lessonId: 'm7-1-3',
  format: 'free',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return orderDecimals(rng);
    if (d === 2) return orderMixed(rng);
    return orderFive(rng);
  },
});

export const NUMBERS_SKILLS: SkillDef[] = [divisibility, divisibilityApply, fractionToDecimal, decimalToFractionSkill, compareNumbers, orderNumbers];
