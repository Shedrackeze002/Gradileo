/** Math 5 Unit 7 — Expressions and Equations (A1). Parentheses, algebraic expressions, and equations with one or two operations. */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';

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
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];
/** Letters for unknowns (no e, i, l or o, which look like numbers). */
const LETTERS = ['n', 'x', 'a', 'm', 'k', 'p', 't', 'y', 'b', 'w', 'c', 'g', 'd', 'h', 's'];

const T = '\\times';
const D = '\\div';
/** a times v without the multiplication sign: 3n, or n when a = 1. */
const term = (a: number, v: string) => (a === 1 ? v : `${a}${v}`);
const frac = (v: string | number, a: string | number) => `\\dfrac{${v}}{${a}}`;
/** Whole-dollar amount for Markdown text (outside maths). */
const dollars = (x: number) => `\\$${x}`;
const OK = '✓';

/** A whole-number answer, typed as a plain number. */
const numAns = (v: number, label?: string, suffix?: string): Part => numPart(v, { exact: false, label, suffix });

// ---------------------------------------------------------------------------
// 7.1 Order of operations with parentheses
// ---------------------------------------------------------------------------

const OO_HINT = 'Work inside the parentheses first. Then multiply or divide. Then add or subtract, from left to right.';

/** No negative numbers or zeros written in the expression. */
const cleanTex = (tex: string) => tex !== '' && !/(^|[ (])-\d/.test(tex) && !/(^|[ (])0(?=[ )]|$)/.test(tex);

interface Eval {
  tex: string;
  value: number;
  steps: string[];
}

/** One operation inside parentheses and one outside. */
function oneOutside(rng: Rng): Eval {
  const kind = rng.pick(['a*(b+c)', '(a+b)*c', '(a-b)/c', 'a-(b+c)', 'a+(b-c)', '(a-b)*c', 'a/(b+c)'] as const);
  return retry<Eval>(
    () => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 9);
      const c = rng.int(2, 9);
      switch (kind) {
        case 'a*(b+c)':
          return { tex: `${a} ${T} (${b} + ${c})`, value: a * (b + c), steps: [`Parentheses first: $${b} + ${c} = ${b + c}$.`, `Then multiply: $${a} ${T} ${b + c} = ${a * (b + c)}$.`] };
        case '(a+b)*c':
          return { tex: `(${a} + ${b}) ${T} ${c}`, value: (a + b) * c, steps: [`Parentheses first: $${a} + ${b} = ${a + b}$.`, `Then multiply: $${a + b} ${T} ${c} = ${(a + b) * c}$.`] };
        case '(a-b)*c': {
          const A = a + b;
          return { tex: `(${A} - ${b}) ${T} ${c}`, value: a * c, steps: [`Parentheses first: $${A} - ${b} = ${a}$.`, `Then multiply: $${a} ${T} ${c} = ${a * c}$.`] };
        }
        case '(a-b)/c': {
          const A = a * c + b;
          return { tex: `(${A} - ${b}) ${D} ${c}`, value: a, steps: [`Parentheses first: $${A} - ${b} = ${a * c}$.`, `Then divide: $${a * c} ${D} ${c} = ${a}$.`] };
        }
        case 'a/(b+c)': {
          // Grade 5 divides by a 1-digit number: keep b + c below 10.
          if (b + c > 9) return { tex: '', value: -1, steps: [] };
          const A = a * (b + c);
          return { tex: `${A} ${D} (${b} + ${c})`, value: a, steps: [`Parentheses first: $${b} + ${c} = ${b + c}$.`, `Then divide: $${A} ${D} ${b + c} = ${a}$.`] };
        }
        case 'a-(b+c)': {
          const A = b + c + rng.int(1, 12);
          return { tex: `${A} - (${b} + ${c})`, value: A - b - c, steps: [`Parentheses first: $${b} + ${c} = ${b + c}$.`, `Then subtract: $${A} - ${b + c} = ${A - b - c}$.`] };
        }
        default: {
          const B = c + rng.int(1, 9);
          return { tex: `${a} + (${B} - ${c})`, value: a + B - c, steps: [`Parentheses first: $${B} - ${c} = ${B - c}$.`, `Then add: $${a} + ${B - c} = ${a + B - c}$.`] };
        }
      }
    },
    (e) => e.value > 0 && e.value <= 120 && cleanTex(e.tex),
  );
}

/** Two operations outside the parentheses. */
function twoOutside(rng: Rng): Eval {
  const kind = rng.pick(['a+b*(c-d)', '(a+b)*c-d', 'a-(b+c)/d', '(a+b)/c+d', 'a*(b-c)+d', 'a*b-(c+d)'] as const);
  return retry<Eval>(
    () => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 9);
      const c = rng.int(2, 9);
      const d = rng.int(2, 9);
      switch (kind) {
        case 'a+b*(c-d)': {
          const C = c + d;
          return {
            tex: `${a} + ${b} ${T} (${C} - ${d})`, value: a + b * c,
            steps: [`Parentheses first: $${C} - ${d} = ${c}$. Now it is $${a} + ${b} ${T} ${c}$.`, `Multiply before adding: $${b} ${T} ${c} = ${b * c}$.`, `Add: $${a} + ${b * c} = ${a + b * c}$.`],
          };
        }
        case '(a+b)*c-d':
          return {
            tex: `(${a} + ${b}) ${T} ${c} - ${d}`, value: (a + b) * c - d,
            steps: [`Parentheses first: $${a} + ${b} = ${a + b}$. Now it is $${a + b} ${T} ${c} - ${d}$.`, `Multiply before subtracting: $${a + b} ${T} ${c} = ${(a + b) * c}$.`, `Subtract: $${(a + b) * c} - ${d} = ${(a + b) * c - d}$.`],
          };
        case 'a-(b+c)/d': {
          const B = d * rng.int(2, 6) - c;
          const q = (B + c) / d;
          const A = q + rng.int(1, 20);
          return {
            tex: `${A} - (${B} + ${c}) ${D} ${d}`, value: A - q,
            steps: [`Parentheses first: $${B} + ${c} = ${B + c}$. Now it is $${A} - ${B + c} ${D} ${d}$.`, `Divide before subtracting: $${B + c} ${D} ${d} = ${q}$.`, `Subtract: $${A} - ${q} = ${A - q}$.`],
          };
        }
        case '(a+b)/c+d': {
          const B = c * rng.int(2, 6) - a;
          const q = (a + B) / c;
          return {
            tex: `(${a} + ${B}) ${D} ${c} + ${d}`, value: q + d,
            steps: [`Parentheses first: $${a} + ${B} = ${a + B}$. Now it is $${a + B} ${D} ${c} + ${d}$.`, `Divide before adding: $${a + B} ${D} ${c} = ${q}$.`, `Add: $${q} + ${d} = ${q + d}$.`],
          };
        }
        case 'a*(b-c)+d': {
          const B = b + c;
          return {
            tex: `${a} ${T} (${B} - ${c}) + ${d}`, value: a * b + d,
            steps: [`Parentheses first: $${B} - ${c} = ${b}$. Now it is $${a} ${T} ${b} + ${d}$.`, `Multiply before adding: $${a} ${T} ${b} = ${a * b}$.`, `Add: $${a * b} + ${d} = ${a * b + d}$.`],
          };
        }
        default:
          return {
            tex: `${a} ${T} ${b} - (${c} + ${d})`, value: a * b - c - d,
            steps: [`Parentheses first: $${c} + ${d} = ${c + d}$. Now it is $${a} ${T} ${b} - ${c + d}$.`, `Multiply before subtracting: $${a} ${T} ${b} = ${a * b}$.`, `Subtract: $${a * b} - ${c + d} = ${a * b - c - d}$.`],
          };
      }
    },
    (e) => e.value > 0 && e.value <= 150 && cleanTex(e.tex),
  );
}

/** Where do the parentheses go? */
function placeParens(rng: Rng): Out {
  const kind = rng.pick(['mul', 'sub'] as const);
  const { a, b, c } = retry(
    () => ({ a: rng.int(2, 9), b: rng.int(2, 9), c: rng.int(2, 9) }),
    ({ a, b, c }) => (kind === 'mul' ? a * (b + c) !== a * b + c : a - (b - c) !== a - b + c && b > c && a > b) && new Set([a, b, c]).size === 3,
    100,
  );
  if (kind === 'mul') {
    const target = a * (b + c);
    const with_ = `$${a} ${T} (${b} + ${c})$`;
    const without = `$(${a} ${T} ${b}) + ${c}$`;
    const none = `$${a} ${T} ${b} + ${c}$`;
    return {
      prompt: `Which expression is equal to $${target}$?`,
      parts: [{ answer: mc(rng, with_, [without, none, `$${a} + (${b} ${T} ${c})$`].filter((x) => !x.includes(`${a} + (${b} ${T} ${c})`) || a + b * c !== target)) }],
      hints: [OO_HINT, 'Work out each expression. Parentheses change which operation you do first.'],
      solution: [
        `${with_}: parentheses first, $${b} + ${c} = ${b + c}$, then $${a} ${T} ${b + c} = ${target}$. ${OK}`,
        `${without} and ${none}: multiply first, $${a} ${T} ${b} = ${a * b}$, then $${a * b} + ${c} = ${a * b + c}$.`,
        `$${a} + (${b} ${T} ${c}) = ${a} + ${b * c} = ${a + b * c}$.`,
        `The expression equal to $${target}$ is ${with_}.`,
      ],
    };
  }
  const target = a - (b - c);
  const right = `$${a} - (${b} - ${c})$`;
  return {
    prompt: `Which expression is equal to $${target}$?`,
    parts: [{ answer: mc(rng, right, [`$(${a} - ${b}) - ${c}$`, `$${a} - ${b} - ${c}$`, `$(${a} - ${b}) + ${c}$`].filter((x) => x !== `$(${a} - ${b}) + ${c}$` || a - b + c !== target)) }],
    hints: [OO_HINT, 'Work out each expression. Parentheses change which operation you do first.'],
    solution: [
      `${right}: parentheses first, $${b} - ${c} = ${b - c}$, then $${a} - ${b - c} = ${target}$. ${OK}`,
      `$(${a} - ${b}) - ${c}$ and $${a} - ${b} - ${c}$: $${a} - ${b} = ${a - b}$, then $${a - b} - ${c} = ${a - b - c}$.`,
      `The expression equal to $${target}$ is ${right}.`,
    ],
  };
}

interface OoStory {
  text: string;
  right: string;
  wrong: string[];
  value: number;
  steps: string[];
  unit: string;
  answer: string;
}

function ooStory(rng: Rng): OoStory {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['packs', 'spend', 'share', 'rows', 'laps'] as const);
  if (kind === 'packs') {
    const [n, a, b] = [rng.int(3, 8), rng.int(3, 9), rng.int(2, 6)];
    return {
      text: `${name} buys $${n}$ packs of stickers. Each pack has $${a}$ star stickers and $${b}$ heart stickers. How many stickers does ${name} buy?`,
      right: `$${n} ${T} (${a} + ${b})$`, wrong: [`$${n} ${T} ${a} + ${b}$`, `$${n} + ${a} + ${b}$`, `$(${n} + ${a}) ${T} ${b}$`],
      value: n * (a + b), unit: 'stickers',
      steps: [`Each pack has $${a} + ${b}$ stickers, so the expression is $${n} ${T} (${a} + ${b})$.`, `Parentheses first: $${a} + ${b} = ${a + b}$.`, `Multiply: $${n} ${T} ${a + b} = ${n * (a + b)}$.`],
      answer: `${name} buys $${n * (a + b)}$ stickers.`,
    };
  }
  if (kind === 'spend') {
    const [a, b] = [rng.int(5, 19), rng.int(5, 19)];
    const M = rng.pick([40, 50, 60]);
    return {
      text: `${name} has ${dollars(M)}. ${name} buys a book for ${dollars(a)} and a game for ${dollars(b)}. How many dollars does ${name} have left?`,
      right: `$${M} - (${a} + ${b})$`, wrong: [`$${M} - ${a} + ${b}$`, `$(${M} - ${a}) + ${b}$`, `$${M} + ${a} - ${b}$`],
      value: M - a - b, unit: 'dollars',
      steps: [`${name} spends $${a} + ${b}$ dollars in all, so the expression is $${M} - (${a} + ${b})$.`, `Parentheses first: $${a} + ${b} = ${a + b}$.`, `Subtract: $${M} - ${a + b} = ${M - a - b}$.`],
      answer: `${name} has ${dollars(M - a - b)} left.`,
    };
  }
  if (kind === 'share') {
    const k = rng.int(3, 6);
    const q = rng.int(4, 9);
    const a = rng.int(5, k * q - 5);
    const b = k * q - a;
    return {
      text: `${name} picked $${a}$ strawberries and a friend picked $${b}$. They share all the strawberries equally among $${k}$ people. How many strawberries does each person get?`,
      right: `$(${a} + ${b}) ${D} ${k}$`, wrong: [`$${a} + ${b} ${D} ${k}$`, `$${a} ${D} ${k} + ${b}$`, `$(${a} + ${b}) ${T} ${k}$`],
      value: q, unit: 'strawberries',
      steps: [`First find all the strawberries, then share them: $(${a} + ${b}) ${D} ${k}$.`, `Parentheses first: $${a} + ${b} = ${a + b}$.`, `Divide: $${a + b} ${D} ${k} = ${q}$.`],
      answer: `Each person gets $${q}$ strawberries.`,
    };
  }
  if (kind === 'rows') {
    const [r, a, b] = [rng.int(3, 9), rng.int(6, 12), rng.int(1, 4)];
    return {
      text: `A garden has $${r}$ rows of plants. Each row had $${a}$ plants, but rabbits ate $${b}$ plants in every row. How many plants are left?`,
      right: `$${r} ${T} (${a} - ${b})$`, wrong: [`$${r} ${T} ${a} - ${b}$`, `$(${r} ${T} ${a}) - ${b}$`, `$${r} + ${a} - ${b}$`],
      value: r * (a - b), unit: 'plants',
      steps: [`Each row has $${a} - ${b}$ plants left, so the expression is $${r} ${T} (${a} - ${b})$.`, `Parentheses first: $${a} - ${b} = ${a - b}$.`, `Multiply: $${r} ${T} ${a - b} = ${r * (a - b)}$.`],
      answer: `There are $${r * (a - b)}$ plants left.`,
    };
  }
  const [d, a, b] = [rng.int(3, 6), rng.int(2, 5), rng.int(2, 4)];
  return {
    text: `${name} trains for $${d}$ days at a pool in ${rng.pick(TOWNS)}. Each day ${name} swims $${a}$ laps of front crawl and $${b}$ laps of backstroke. How many laps does ${name} swim in all?`,
    right: `$${d} ${T} (${a} + ${b})$`, wrong: [`$${d} ${T} ${a} + ${b}$`, `$${d} + ${a} + ${b}$`, `$${d} + ${a} ${T} ${b}$`],
    value: d * (a + b), unit: 'laps',
    steps: [`Each day is $${a} + ${b}$ laps, so the expression is $${d} ${T} (${a} + ${b})$.`, `Parentheses first: $${a} + ${b} = ${a + b}$.`, `Multiply: $${d} ${T} ${a + b} = ${d * (a + b)}$.`],
    answer: `${name} swims $${d * (a + b)}$ laps.`,
  };
}

const orderOfOperations = skill({
  id: 'm5-order-of-operations',
  name: 'Order of operations with parentheses',
  description: 'Evaluate numerical expressions with addition or subtraction in parentheses, following the order of operations.',
  outcomes: ['A1'],
  lessonId: 'm5-7-1',
  gen(rng, d) {
    if (d === 3) {
      const s = ooStory(rng);
      return {
        prompt: `${s.text}\n\n(a) Which expression matches the problem?\n\n(b) Find the answer.`,
        parts: [{ answer: mc(rng, s.right, s.wrong), label: '(a)' }, numAns(s.value, '(b)', s.unit)],
        hints: ['Which amount needs to be worked out first? Put that part in parentheses.', OO_HINT],
        solution: [...s.steps, s.answer],
      };
    }
    if (d === 2 && rng.chance(0.3)) return placeParens(rng);
    const e = d === 1 ? oneOutside(rng) : twoOutside(rng);
    return {
      prompt: `Evaluate $${e.tex}$.`,
      parts: [numAns(e.value)],
      hints: ['Start with the operation inside the parentheses.', OO_HINT],
      solution: [...e.steps, `$${e.tex} = ${e.value}$`],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.2 Algebraic expressions — writing
// ---------------------------------------------------------------------------

const VAR_HINT = 'A number written right beside a letter means multiply: $4n$ means $4 \\times n$. A division is written as a fraction: $\\dfrac{n}{4}$ means $n \\div 4$.';

function writeD1(rng: Rng): Out {
  const v = rng.pick(LETTERS);
  const kind = rng.pick(['repeated', 'product', 'quotient', 'parts', 'terms'] as const);
  const a = rng.int(2, 9);
  if (kind === 'repeated') {
    const sum = Array(a).fill(v).join(' + ');
    return {
      prompt: `Which expression means $${sum}$?`,
      parts: [{ answer: mc(rng, `$${term(a, v)}$`, [`$${v} + ${a}$`, `$${frac(v, a)}$`, `$${v} - ${a}$`]) }],
      hints: [`Count how many times $${v}$ is added.`, `Adding $${v}$ again and again is multiplying. $${a}$ groups of $${v}$ is $${a} ${T} ${v}$.`],
      solution: [`$${v}$ is added $${a}$ times.`, `That is $${a} ${T} ${v}$, which we write as $${term(a, v)}$.`, `The answer is $${term(a, v)}$.`],
    };
  }
  if (kind === 'product') {
    return {
      prompt: `Write $${a} ${T} ${v}$ without the multiplication sign.`,
      parts: [part({ kind: 'expression', expected: `${a}${v}`, form: 'expanded' }, { label: 'Expression:' })],
      hints: [VAR_HINT, 'Write the number first, right beside the letter.'],
      solution: [`A product of a number and a variable is written with the number first and no $${T}$ sign.`, `$${a} ${T} ${v} = ${term(a, v)}$`],
    };
  }
  if (kind === 'quotient') {
    return {
      prompt: `Which expression means $${v} ${D} ${a}$?`,
      parts: [{ answer: mc(rng, `$${frac(v, a)}$`, [`$${frac(a, v)}$`, `$${term(a, v)}$`, `$${v} - ${a}$`]) }],
      hints: [VAR_HINT, `The number being divided, $${v}$, goes on top.`],
      solution: [`A division is written as a fraction. The number being divided goes on top.`, `$${v} ${D} ${a} = ${frac(v, a)}$`, `The answer is $${frac(v, a)}$.`],
    };
  }
  if (kind === 'parts') {
    const b = rng.int(2, 15);
    const ask = rng.pick(['coefficient', 'constant'] as const);
    const first = rng.chance(0.5);
    const ex = first ? `${term(a, v)} + ${b}` : `${b} + ${term(a, v)}`;
    return {
      prompt: `In the expression $${ex}$, what is the ${ask === 'coefficient' ? 'coefficient of $' + v + '$' : 'constant term'}?`,
      parts: [numAns(ask === 'coefficient' ? a : b)],
      hints: ['The coefficient is the number multiplied by the variable.', 'The constant term is the number on its own, with no variable.'],
      solution: [
        `The terms are $${term(a, v)}$ and $${b}$.`,
        `In $${term(a, v)}$, the coefficient is $${a}$. The constant term is $${b}$.`,
        `The ${ask === 'coefficient' ? 'coefficient' : 'constant term'} is $${ask === 'coefficient' ? a : b}$.`,
      ],
    };
  }
  const b = rng.int(2, 15);
  const options: Array<[string, number, string]> = [
    [term(a, v), 1, `$${term(a, v)}$ is a product of a number and a variable`],
    [frac(v, a), 1, `$${frac(v, a)}$ is a quotient of a variable and a number`],
    [`${term(a, v)} + ${b}`, 2, ''],
    [`${frac(v, a)} + ${b}`, 2, ''],
    [`${b} + ${term(a, v)}`, 2, ''],
  ];
  const [ex, n, what] = rng.pick(options);
  return {
    prompt: `How many terms does the expression $${ex}$ have?`,
    parts: [numAns(n)],
    hints: ['Terms are separated by $+$ signs.', 'A number times a variable, a variable divided by a number, or a number on its own is one term.'],
    solution: n === 1 ? [`${what}. There is no $+$ sign.`, `It has $1$ term.`] : [`The $+$ sign separates $${ex.split(' + ')[0]}$ and $${ex.split(' + ')[1]}$.`, `It has $2$ terms.`],
  };
}

interface Situation {
  text: string;
  v: string;
  tex: string;
  plain: string;
  why: string;
  wrong: string[];
}

function situation(rng: Rng, twoTerms: boolean): Situation {
  const name = rng.pick(NAMES);
  const one = [
    () => {
      const a = rng.int(4, 12);
      return { text: `Each box holds $${a}$ juice boxes. Write an expression for the number of juice boxes in $b$ boxes.`, v: 'b', tex: `${a}b`, plain: `${a}b`, why: `Each box has $${a}$, so $b$ boxes have $${a} ${T} b = ${a}b$.`, wrong: [`b + ${a}`, frac('b', a), `${a} - b`] };
    },
    () => {
      const a = rng.int(2, 6);
      return { text: `${name} shares $c$ crackers equally among $${a}$ friends. Write an expression for the number of crackers each friend gets.`, v: 'c', tex: frac('c', a), plain: `c/${a}`, why: `Sharing equally means dividing: $c ${D} ${a} = ${frac('c', a)}$.`, wrong: [`${a}c`, frac(a, 'c'), `c - ${a}`] };
    },
    () => {
      const a = rng.int(3, 12);
      return { text: `${name}'s brother is $${a}$ years older than ${name}. ${name} is $y$ years old. Write an expression for the brother's age.`, v: 'y', tex: `y + ${a}`, plain: `y + ${a}`, why: `Older by $${a}$ means add $${a}$: $y + ${a}$.`, wrong: [`${a}y`, `y - ${a}`, frac('y', a)] };
    },
    () => {
      const a = rng.pick([4, 5, 6, 8, 10]);
      return { text: `A pack of pencils costs ${dollars(a)}. Write an expression for the cost, in dollars, of $p$ packs.`, v: 'p', tex: `${a}p`, plain: `${a}p`, why: `Each pack costs ${dollars(a)}, so $p$ packs cost $${a} ${T} p = ${a}p$ dollars.`, wrong: [`p + ${a}`, frac('p', a), `${a} - p`] };
    },
    () => {
      const a = rng.int(2, 5);
      return { text: `A ribbon $r$ cm long is cut into $${a}$ equal pieces. Write an expression for the length of each piece, in centimetres.`, v: 'r', tex: frac('r', a), plain: `r/${a}`, why: `Cutting into equal pieces means dividing: $r ${D} ${a} = ${frac('r', a)}$.`, wrong: [`${a}r`, `r - ${a}`, frac(a, 'r')] };
    },
  ];
  const two = [
    () => {
      const [a, b] = [rng.int(5, 12), rng.int(3, 9)];
      return { text: `Movie tickets cost ${dollars(a)} each, and parking costs ${dollars(b)}. Write an expression for the total cost, in dollars, of $t$ tickets and parking.`, v: 't', tex: `${a}t + ${b}`, plain: `${a}t + ${b}`, why: `$t$ tickets cost $${a}t$ dollars. Parking is added once: $${a}t + ${b}$.`, wrong: [`${b}t + ${a}`, `${a} + ${b} + t`, `${a + b}t`] };
    },
    () => {
      const [a, b] = [rng.int(4, 9), rng.int(5, 20)];
      return { text: `${name} has $${b}$ hockey cards. ${name} buys $n$ packs with $${a}$ cards in each pack. Write an expression for the number of cards ${name} has now.`, v: 'n', tex: `${a}n + ${b}`, plain: `${a}n + ${b}`, why: `$n$ packs of $${a}$ cards is $${a}n$. Add the $${b}$ cards ${name} already had: $${a}n + ${b}$.`, wrong: [`${b}n + ${a}`, `${a} + ${b}n`, `${a + b}n`] };
    },
    () => {
      const [a, b] = [rng.int(2, 6), rng.int(2, 9)];
      return { text: `A pizza is cut into $s$ slices and shared equally among $${a}$ friends. Each friend also gets $${b}$ garlic knots. Write an expression for the number of pieces of food each friend gets.`, v: 's', tex: `${frac('s', a)} + ${b}`, plain: `s/${a} + ${b}`, why: `Each friend gets $s ${D} ${a} = ${frac('s', a)}$ slices, plus $${b}$ garlic knots: $${frac('s', a)} + ${b}$.`, wrong: [`${a}s + ${b}`, `${frac('s', b)} + ${a}`, `${frac(a, 's')} + ${b}`] };
    },
    () => {
      const [a, b] = [rng.int(5, 15), rng.int(10, 30)];
      return { text: `A bike rental costs ${dollars(b)} plus ${dollars(a)} for each hour. Write an expression for the cost, in dollars, of renting a bike for $h$ hours.`, v: 'h', tex: `${a}h + ${b}`, plain: `${a}h + ${b}`, why: `Each hour costs ${dollars(a)}, so $h$ hours cost $${a}h$. The ${dollars(b)} is added once: $${a}h + ${b}$.`, wrong: [`${b}h + ${a}`, `${a + b}h`, `${a} + ${b} + h`] };
    },
    () => {
      const [a, b] = [rng.int(2, 4), rng.int(3, 8)];
      return { text: `${name} walks a dog $w$ times a week. Each walk is $${a}$ km. ${name} also runs $${b}$ km each week. Write an expression for the distance, in kilometres, ${name} covers in a week.`, v: 'w', tex: `${a}w + ${b}`, plain: `${a}w + ${b}`, why: `$w$ walks of $${a}$ km is $${a}w$ km. Add the $${b}$ km run: $${a}w + ${b}$.`, wrong: [`${b}w + ${a}`, `${a + b}w`, `w + ${a} + ${b}`] };
    },
  ];
  return rng.pick(twoTerms ? two : one)();
}

function writeD3(rng: Rng): Out {
  const kind = rng.pick(['match', 'meaning', 'write'] as const);
  if (kind === 'write') {
    const s = situation(rng, true);
    return {
      prompt: s.text,
      parts: [part({ kind: 'expression', expected: s.plain, form: 'expanded' }, { label: 'Expression:' })],
      hints: ['One amount changes with the variable, so it multiplies (or divides) the variable. The other amount is added once.', VAR_HINT],
      solution: [s.why, `The expression is $${s.tex}$.`],
    };
  }
  const a = rng.int(3, 9);
  const b = rng.int(4, 15);
  const name = rng.pick(NAMES);
  const stories = [
    { right: `Each bowling game costs ${dollars(a)}, and shoe rental costs ${dollars(b)}. The expression is the total cost, in dollars, of $n$ games.`, wrongs: [`Each bowling game costs ${dollars(b)}, and shoe rental costs ${dollars(a)}. The expression is the total cost, in dollars, of $n$ games.`, `${name} shares $n$ dollars among $${a}$ friends and adds ${dollars(b)}.`, `${name} has ${dollars(b)} and spends ${dollars(a)} on $n$ things.`] },
    { right: `${name} has $${b}$ stamps and gets $${a}$ new stamps each week. The expression is the number of stamps after $n$ weeks.`, wrongs: [`${name} has $${a}$ stamps and gets $${b}$ new stamps each week. The expression is the number of stamps after $n$ weeks.`, `${name} has $${b}$ stamps and gives away $${a}$ stamps each week. The expression is the number of stamps after $n$ weeks.`, `${name} shares $${b}$ stamps equally among $n$ friends. The expression is the number of stamps each friend gets.`] },
  ];
  if (kind === 'match') {
    const st = rng.pick(stories);
    return {
      prompt: `Which situation matches the expression $${a}n + ${b}$?`,
      parts: [{ answer: mc(rng, st.right, st.wrongs) }],
      hints: [`In $${a}n + ${b}$, the $${a}$ is multiplied by $n$. It is the amount for each one.`, `The $${b}$ is added once. It does not change with $n$.`],
      solution: [`$${a}n$ means $${a}$ for each of the $n$ things. The constant term $${b}$ is added once.`, `The matching situation is: ${st.right}`],
    };
  }
  const ctx = rng.pick([
    { text: `A swimming club charges ${dollars(b)} to join plus ${dollars(a)} for each lesson. The cost in dollars for $n$ lessons is $${a}n + ${b}$.`, coef: `the cost of each lesson`, constant: `the cost to join`, other: [`the number of lessons`, `the total cost`] },
    { text: `${name} has saved ${dollars(b)} and saves ${dollars(a)} more each week. After $n$ weeks, ${name} has $${a}n + ${b}$ dollars.`, coef: `the money saved each week`, constant: `the money saved at the start`, other: [`the number of weeks`, `the total money saved`] },
  ]);
  const askCoef = rng.chance(0.5);
  const right = askCoef ? ctx.coef : ctx.constant;
  return {
    prompt: `${ctx.text} What does the ${askCoef ? `coefficient $${a}$` : `constant term $${b}$`} mean?`,
    parts: [{ answer: mc(rng, cap1(right), [askCoef ? ctx.constant : ctx.coef, ...ctx.other].map(cap1)) }],
    hints: ['The coefficient is multiplied by the variable, so it is the amount for each one.', 'The constant term is added only once. It does not change.'],
    solution: [`In $${a}n + ${b}$, the coefficient $${a}$ is multiplied by $n$: it is ${ctx.coef}.`, `The constant term $${b}$ is added once: it is ${ctx.constant}.`, `The ${askCoef ? 'coefficient' : 'constant term'} means ${right}.`],
  };
}

const cap1 = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const writeExpression = skill({
  id: 'm5-write-expression',
  name: 'Writing algebraic expressions',
  description: 'Write products and quotients with a variable, name coefficients, constant terms and terms, and write an expression with one or two terms for a situation.',
  outcomes: ['A1'],
  lessonId: 'm5-7-2',
  gen(rng, d) {
    if (d === 1) return writeD1(rng);
    if (d === 2) {
      const s = situation(rng, rng.chance(0.5));
      return {
        prompt: `${s.text} Use the letter $${s.v}$.`,
        parts: [part({ kind: 'expression', expected: s.plain, form: 'expanded' }, { label: 'Expression:' })],
        hints: ['Does the amount get added, multiplied or shared (divided)?', VAR_HINT],
        solution: [s.why, `The expression is $${s.tex}$.`],
      };
    }
    return writeD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.2 Algebraic expressions — evaluating
// ---------------------------------------------------------------------------

interface Expr {
  tex: string;
  at: (x: number) => number;
  /** The substitution written out, e.g. 4 × 6 + 3. */
  sub: (x: number) => string;
  /** Steps after substituting. */
  work: (x: number) => string[];
}

function exprOne(rng: Rng, v: string): { e: Expr; x: number } {
  const a = rng.int(2, 9);
  const kind = rng.pick(['prod', 'quot', 'plus', 'minus'] as const);
  if (kind === 'prod') {
    const x = rng.int(2, 12);
    return { e: { tex: term(a, v), at: (n) => a * n, sub: (n) => `${a} ${T} ${n}`, work: (n) => [`$${a} ${T} ${n} = ${a * n}$`] }, x };
  }
  if (kind === 'quot') {
    const x = a * rng.int(2, 10);
    return { e: { tex: frac(v, a), at: (n) => n / a, sub: (n) => frac(n, a), work: (n) => [`$${frac(n, a)}$ means $${n} ${D} ${a} = ${n / a}$`] }, x };
  }
  const b = rng.int(3, 25);
  if (kind === 'plus') {
    const x = rng.int(2, 30);
    return { e: { tex: `${v} + ${b}`, at: (n) => n + b, sub: (n) => `${n} + ${b}`, work: (n) => [`$${n} + ${b} = ${n + b}$`] }, x };
  }
  const x = rng.int(b + 1, b + 30);
  return { e: { tex: `${v} - ${b}`, at: (n) => n - b, sub: (n) => `${n} - ${b}`, work: (n) => [`$${n} - ${b} = ${n - b}$`] }, x };
}

function exprTwo(rng: Rng, v: string): { e: Expr; x: number } {
  const a = rng.int(2, 9);
  const b = rng.int(2, 20);
  const kind = rng.pick(['ax+b', 'b+ax', 'ax-b', 'x/a+b'] as const);
  if (kind === 'x/a+b') {
    const x = a * rng.int(2, 10);
    return {
      e: { tex: `${frac(v, a)} + ${b}`, at: (n) => n / a + b, sub: (n) => `${frac(n, a)} + ${b}`, work: (n) => [`Divide first: $${n} ${D} ${a} = ${n / a}$.`, `Then add: $${n / a} + ${b} = ${n / a + b}$.`] },
      x,
    };
  }
  const x = retry(() => rng.int(2, 12), (n) => kind !== 'ax-b' || a * n > b, 50);
  if (kind === 'ax-b') {
    return {
      e: { tex: `${term(a, v)} - ${b}`, at: (n) => a * n - b, sub: (n) => `${a} ${T} ${n} - ${b}`, work: (n) => [`Multiply first: $${a} ${T} ${n} = ${a * n}$.`, `Then subtract: $${a * n} - ${b} = ${a * n - b}$.`] },
      x,
    };
  }
  if (kind === 'b+ax') {
    return {
      e: { tex: `${b} + ${term(a, v)}`, at: (n) => b + a * n, sub: (n) => `${b} + ${a} ${T} ${n}`, work: (n) => [`Multiply first: $${a} ${T} ${n} = ${a * n}$.`, `Then add: $${b} + ${a * n} = ${b + a * n}$.`] },
      x,
    };
  }
  return {
    e: { tex: `${term(a, v)} + ${b}`, at: (n) => a * n + b, sub: (n) => `${a} ${T} ${n} + ${b}`, work: (n) => [`Multiply first: $${a} ${T} ${n} = ${a * n}$.`, `Then add: $${a * n} + ${b} = ${a * n + b}$.`] },
    x,
  };
}

const SUB_HINT = 'Replace the variable with the number. Remember that $4n$ means $4 \\times n$.';

function evaluateCtx(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const a = rng.int(3, 9);
  const b = rng.int(5, 20);
  const [x1, x2] = rng.sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 12], 2).sort((p, q) => p - q);
  const ctx = rng.pick([
    {
      text: `Renting skates at an arena in ${rng.pick(TOWNS)} costs $${a}h + ${b}$ dollars for $h$ hours.`, v: 'h', unit: 'dollars',
      ask: (x: number) => `How much does it cost to rent skates for $${x}$ hours?`, say: (x: number, y: number) => `Renting for $${x}$ hours costs ${dollars(y)}.`,
    },
    {
      text: `After $w$ weeks, ${name} has saved $${a}w + ${b}$ dollars.`, v: 'w', unit: 'dollars',
      ask: (x: number) => `How much has ${name} saved after $${x}$ weeks?`, say: (x: number, y: number) => `After $${x}$ weeks, ${name} has ${dollars(y)}.`,
    },
    {
      text: `A stack of $c$ chairs is $${a}c + ${b}$ centimetres tall.`, v: 'c', unit: 'cm',
      ask: (x: number) => `How tall is a stack of $${x}$ chairs?`, say: (x: number, y: number) => `A stack of $${x}$ chairs is $${y}$ cm tall.`,
    },
  ]);
  const y1 = a * x1 + b;
  const y2 = a * x2 + b;
  return {
    prompt: `${ctx.text}\n\n(a) ${ctx.ask(x1)}\n\n(b) ${ctx.ask(x2)}`,
    parts: [numAns(y1, '(a)', ctx.unit), numAns(y2, '(b)', ctx.unit)],
    hints: [`Replace $${ctx.v}$ with $${x1}$, then with $${x2}$.`, `Multiply before adding: $${a} ${T} ${ctx.v}$ first, then add $${b}$.`],
    solution: [
      `(a) $${ctx.v} = ${x1}$: $${a} ${T} ${x1} + ${b} = ${a * x1} + ${b} = ${y1}$. ${ctx.say(x1, y1)}`,
      `(b) $${ctx.v} = ${x2}$: $${a} ${T} ${x2} + ${b} = ${a * x2} + ${b} = ${y2}$. ${ctx.say(x2, y2)}`,
      `The answers are (a) $${y1}$ and (b) $${y2}$.`,
    ],
  };
}

/** A classmate reads 4n as the digits 4 and n; find the correct value. */
function evaluateMistake(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const v = rng.pick(LETTERS);
  const a = rng.int(2, 9);
  const x = rng.int(2, 9);
  const b = rng.int(2, 15);
  const wrong = (10 * a + x) + b;
  const right = a * x + b;
  return {
    prompt: `${name} evaluates $${term(a, v)} + ${b}$ when $${v} = ${x}$. ${name} writes $${a}${x} + ${b} = ${wrong}$. What is the correct value?`,
    parts: [numAns(right)],
    hints: [`$${term(a, v)}$ means $${a} ${T} ${v}$, not a two-digit number.`, `Substitute: $${a} ${T} ${x} + ${b}$. Multiply first.`],
    solution: [
      `${name} put the digits side by side, making $${a}${x}$. But $${term(a, v)}$ means $${a} ${T} ${v}$.`,
      `Substitute $${v} = ${x}$: $${a} ${T} ${x} + ${b} = ${a * x} + ${b} = ${right}$.`,
      `The correct value is $${right}$.`,
    ],
  };
}

const evaluateExpression = skill({
  id: 'm5-evaluate-expression',
  name: 'Evaluating algebraic expressions',
  description: 'Evaluate an algebraic expression by substituting a given number for the variable.',
  outcomes: ['A1'],
  lessonId: 'm5-7-2',
  gen(rng, d: Difficulty) {
    if (d === 3) return rng.chance(0.7) ? evaluateCtx(rng) : evaluateMistake(rng);
    const v = rng.pick(LETTERS);
    const { e, x } = d === 1 ? exprOne(rng, v) : exprTwo(rng, v);
    const y = e.at(x);
    return {
      prompt: `Evaluate $${e.tex}$ when $${v} = ${x}$.`,
      parts: [numAns(y)],
      hints: [SUB_HINT, d === 1 ? 'Then do the one operation.' : 'After you substitute, multiply or divide before you add or subtract.'],
      solution: [`Substitute $${v} = ${x}$: $${e.sub(x)}$.`, ...e.work(x), `The value is $${y}$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.3 Solving equations
// ---------------------------------------------------------------------------

interface Equation {
  tex: string;
  x: number;
  v: string;
  steps: string[];
  check: string;
  /** The first inverse operation, for "what do you do first?" questions. */
  first?: string;
  firstWrong?: string[];
  /** For two-operation equations: the number on its own, which side has the variable, the variable side worked out for a value, and a step between sensible values to try. */
  c?: number;
  sideName?: string;
  at?: (n: number) => string;
  value?: (n: number) => number;
  step?: number;
}

function oneStep(rng: Rng, v: string): Equation {
  const kind = rng.pick(['add', 'sub', 'mul', 'div'] as const);
  const x = rng.int(2, kind === 'mul' || kind === 'div' ? 12 : 40);
  const a = rng.int(2, kind === 'mul' || kind === 'div' ? 9 : 25);
  if (kind === 'add') {
    const c = x + a;
    return { v, x, tex: `${v} + ${a} = ${c}`, steps: [`The inverse of adding $${a}$ is subtracting $${a}$. Subtract $${a}$ from both sides.`, `$${v} = ${c} - ${a} = ${x}$`], check: `$${x} + ${a} = ${c}$ ${OK}` };
  }
  if (kind === 'sub') {
    const c = x;
    const X = x + a;
    return { v, x: X, tex: `${v} - ${a} = ${c}`, steps: [`The inverse of subtracting $${a}$ is adding $${a}$. Add $${a}$ to both sides.`, `$${v} = ${c} + ${a} = ${X}$`], check: `$${X} - ${a} = ${c}$ ${OK}` };
  }
  if (kind === 'mul') {
    const c = a * x;
    return { v, x, tex: `${term(a, v)} = ${c}`, steps: [`$${term(a, v)}$ means $${a} ${T} ${v}$. The inverse of multiplying by $${a}$ is dividing by $${a}$. Divide both sides by $${a}$.`, `$${v} = ${c} ${D} ${a} = ${x}$`], check: `$${a} ${T} ${x} = ${c}$ ${OK}` };
  }
  const X = a * x;
  return { v, x: X, tex: `${frac(v, a)} = ${x}`, steps: [`$${frac(v, a)}$ means $${v} ${D} ${a}$. The inverse of dividing by $${a}$ is multiplying by $${a}$. Multiply both sides by $${a}$.`, `$${v} = ${x} ${T} ${a} = ${X}$`], check: `$${X} ${D} ${a} = ${x}$ ${OK}` };
}

function twoStep(rng: Rng, v: string, big = false): Equation {
  const kind = rng.pick(['ax+b', 'ax-b', 'x/a+b', 'b+ax', 'x/a-b'] as const);
  const a = rng.int(2, 9);
  const b = rng.int(2, big ? 30 : 15);
  const flip = big && rng.chance(0.5);
  const side = (lhs: string, c: number) => (flip ? `${c} = ${lhs}` : `${lhs} = ${c}`);
  const sideName = flip ? 'right' : 'left';
  if (kind === 'ax+b' || kind === 'b+ax') {
    const x = rng.int(2, big ? 15 : 10);
    const c = a * x + b;
    const lhs = kind === 'ax+b' ? `${term(a, v)} + ${b}` : `${b} + ${term(a, v)}`;
    const at = (n: number) => (kind === 'ax+b' ? `${a} ${T} ${n} + ${b} = ${a * n} + ${b} = ${a * n + b}` : `${b} + ${a} ${T} ${n} = ${b} + ${a * n} = ${a * n + b}`);
    return {
      v, x, tex: side(lhs, c), c, sideName, at, value: (n) => a * n + b, step: 1,
      steps: [`Undo the adding first: subtract $${b}$ from both sides. $${term(a, v)} = ${c} - ${b} = ${a * x}$.`, `Undo the multiplying: divide both sides by $${a}$. $${v} = ${a * x} ${D} ${a} = ${x}$.`],
      check: `$${at(x)}$ ${OK}`,
      first: `Subtract $${b}$ from both sides`, firstWrong: [`Divide both sides by $${a}$`, `Add $${b}$ to both sides`, `Multiply both sides by $${a}$`],
    };
  }
  if (kind === 'ax-b') {
    const x = rng.int(Math.max(2, Math.floor(b / a) + 1), Math.max(Math.floor(b / a) + 1, big ? 15 : 10) + 1);
    const c = a * x - b;
    const at = (n: number) => `${a} ${T} ${n} - ${b} = ${a * n} - ${b} = ${a * n - b}`;
    return {
      v, x, tex: side(`${term(a, v)} - ${b}`, c), c, sideName, at, value: (n) => a * n - b, step: 1,
      steps: [`Undo the subtracting first: add $${b}$ to both sides. $${term(a, v)} = ${c} + ${b} = ${a * x}$.`, `Undo the multiplying: divide both sides by $${a}$. $${v} = ${a * x} ${D} ${a} = ${x}$.`],
      check: `$${at(x)}$ ${OK}`,
      first: `Add $${b}$ to both sides`, firstWrong: [`Divide both sides by $${a}$`, `Subtract $${b}$ from both sides`, `Multiply both sides by $${a}$`],
    };
  }
  const q = rng.int(2, big ? 15 : 10);
  const X = a * q;
  if (kind === 'x/a-b') {
    const c = q;
    const Q = q + b;
    const XX = a * Q;
    const at = (n: number) => `${n} ${D} ${a} - ${b} = ${n / a} - ${b} = ${n / a - b}`;
    return {
      v, x: XX, tex: side(`${frac(v, a)} - ${b}`, c), c, sideName, at, value: (n) => n / a - b, step: a,
      steps: [`Undo the subtracting first: add $${b}$ to both sides. $${frac(v, a)} = ${c} + ${b} = ${Q}$.`, `Undo the dividing: multiply both sides by $${a}$. $${v} = ${Q} ${T} ${a} = ${XX}$.`],
      check: `$${at(XX)}$ ${OK}`,
      first: `Add $${b}$ to both sides`, firstWrong: [`Multiply both sides by $${a}$`, `Subtract $${b}$ from both sides`, `Divide both sides by $${a}$`],
    };
  }
  const c = q + b;
  const at = (n: number) => `${n} ${D} ${a} + ${b} = ${n / a} + ${b} = ${n / a + b}`;
  return {
    v, x: X, tex: side(`${frac(v, a)} + ${b}`, c), c, sideName, at, value: (n) => n / a + b, step: a,
    steps: [`Undo the adding first: subtract $${b}$ from both sides. $${frac(v, a)} = ${c} - ${b} = ${q}$.`, `Undo the dividing: multiply both sides by $${a}$. $${v} = ${q} ${T} ${a} = ${X}$.`],
    check: `$${at(X)}$ ${OK}`,
    first: `Subtract $${b}$ from both sides`, firstWrong: [`Multiply both sides by $${a}$`, `Add $${b}$ to both sides`, `Divide both sides by $${a}$`],
  };
}

const SOLVE_HINT = 'Use inverse operations: subtracting undoes adding, adding undoes subtracting, dividing undoes multiplying, and multiplying undoes dividing. Do the same thing to both sides.';

function solveOut(eq: Equation, two: boolean): Out {
  return {
    prompt: `Solve $${eq.tex}$.`,
    parts: [numAns(eq.x, `$${eq.v} =$`)],
    hints: [SOLVE_HINT, two ? 'Undo the adding or subtracting first. Then undo the multiplying or dividing.' : 'What operation is done to the variable? Do the opposite to both sides.'],
    solution: [...eq.steps, `Check: ${eq.check}`, `The solution is $${eq.v} = ${eq.x}$.`],
  };
}

function verifyOut(rng: Rng, eq: Equation): Out {
  const correct = rng.chance(0.5);
  const shown = correct ? eq.x : retry(() => eq.x + rng.pick([-2, -1, 1, 2]) * (eq.step ?? 1), (n) => n > 0 && n !== eq.x, 50);
  const val = eq.value ? eq.value(shown) : eq.c;
  return {
    prompt: `Is $${eq.v} = ${shown}$ the solution of $${eq.tex}$?`,
    parts: [{ answer: fixedChoice(['Yes', 'No'], correct ? 0 : 1) }],
    hints: [`Substitute $${shown}$ for $${eq.v}$ in the ${eq.sideName ?? 'left'} side of the equation.`, 'If both sides are equal, it is the solution.'],
    solution: [
      `Substitute $${eq.v} = ${shown}$ in the ${eq.sideName ?? 'left'} side: $${eq.at ? eq.at(shown) : shown}$.`,
      correct ? `The other side is $${eq.c}$. Both sides are equal. ${OK}` : `The other side is $${eq.c}$, and $${val} \\neq ${eq.c}$. The sides are not equal.`,
      correct ? 'Yes, it is the solution.' : `No, it is not the solution. (The solution is $${eq.v} = ${eq.x}$.)`,
    ],
  };
}

const solveEquation = skill({
  id: 'm5-solve-equation',
  name: 'Solving equations',
  description: 'Solve equations with one or two operations using inverse operations, and verify a solution by substituting.',
  outcomes: ['A1'],
  lessonId: 'm5-7-3',
  gen(rng, d) {
    const v = rng.pick(LETTERS);
    if (d === 1) return solveOut(oneStep(rng, v), false);
    if (d === 2) {
      const eq = twoStep(rng, v);
      return rng.chance(0.25) ? verifyOut(rng, eq) : solveOut(eq, true);
    }
    const eq = twoStep(rng, v, true);
    if (rng.chance(0.3) && eq.first) {
      return {
        prompt: `To solve $${eq.tex}$, what should you do first?`,
        parts: [{ answer: mc(rng, eq.first, eq.firstWrong ?? []) }],
        hints: ['Undo the operations in the reverse order of the order of operations.', 'Undo the adding or subtracting before the multiplying or dividing.'],
        solution: [`The variable is multiplied or divided first, then a number is added or subtracted. Undo them in reverse order.`, `First: ${eq.first.charAt(0).toLowerCase() + eq.first.slice(1)}.`, ...eq.steps, `The first step is: ${eq.first.charAt(0).toLowerCase() + eq.first.slice(1)}.`],
      };
    }
    return solveOut(eq, true);
  },
});

// ---------------------------------------------------------------------------
// 7.3 Equation problems
// ---------------------------------------------------------------------------

interface Problem {
  text: string;
  v: string;
  eq: string;
  wrong: string[];
  x: number;
  unit: string;
  steps: string[];
  check: string;
  answer: string;
}

function problemOne(rng: Rng): Problem {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['more', 'gave', 'groups', 'share'] as const);
  if (kind === 'more') {
    const [x, a] = [rng.int(5, 40), rng.int(3, 20)];
    const c = x + a;
    return {
      text: `${name} had some stickers. A friend gave ${name} $${a}$ more. Now ${name} has $${c}$ stickers. How many stickers did ${name} have at first?`,
      v: 's', eq: `s + ${a} = ${c}`, wrong: [`s - ${a} = ${c}`, `${a}s = ${c}`, `s + ${c} = ${a}`], x, unit: 'stickers',
      steps: [`Let $s$ be the number of stickers at first. Adding $${a}$ gives $${c}$: $s + ${a} = ${c}$.`, `Subtract $${a}$ from both sides: $s = ${c} - ${a} = ${x}$.`], check: `$${x} + ${a} = ${c}$ ${OK}`,
      answer: `${name} had $${x}$ stickers at first.`,
    };
  }
  if (kind === 'gave') {
    const [c, a] = [rng.int(5, 40), rng.int(3, 20)];
    const x = c + a;
    return {
      text: `${name} had some marbles and gave $${a}$ of them to a friend. ${name} has $${c}$ marbles left. How many marbles did ${name} have at first?`,
      v: 'm', eq: `m - ${a} = ${c}`, wrong: [`m + ${a} = ${c}`, `${a} - m = ${c}`, `${frac('m', a)} = ${c}`], x, unit: 'marbles',
      steps: [`Let $m$ be the number of marbles at first. Taking away $${a}$ leaves $${c}$: $m - ${a} = ${c}$.`, `Add $${a}$ to both sides: $m = ${c} + ${a} = ${x}$.`], check: `$${x} - ${a} = ${c}$ ${OK}`,
      answer: `${name} had $${x}$ marbles at first.`,
    };
  }
  if (kind === 'groups') {
    const [a, x] = [rng.int(3, 9), rng.int(4, 12)];
    const c = a * x;
    return {
      text: `A teacher puts the same number of books on each of $${a}$ shelves. There are $${c}$ books in all. How many books are on each shelf?`,
      v: 'b', eq: `${a}b = ${c}`, wrong: [`b + ${a} = ${c}`, `${frac('b', a)} = ${c}`, `${c}b = ${a}`], x, unit: 'books',
      steps: [`Let $b$ be the number of books on each shelf. $${a}$ shelves hold $${a}b$ books: $${a}b = ${c}$.`, `Divide both sides by $${a}$: $b = ${c} ${D} ${a} = ${x}$.`], check: `$${a} ${T} ${x} = ${c}$ ${OK}`,
      answer: `There are $${x}$ books on each shelf.`,
    };
  }
  const [a, q] = [rng.int(2, 6), rng.int(4, 12)];
  const x = a * q;
  return {
    text: `${name} shares some grapes equally among $${a}$ friends. Each friend gets $${q}$ grapes. How many grapes did ${name} share?`,
    v: 'g', eq: `${frac('g', a)} = ${q}`, wrong: [`${a}g = ${q}`, `g - ${a} = ${q}`, `${frac(a, 'g')} = ${q}`], x, unit: 'grapes',
    steps: [`Let $g$ be the number of grapes. Sharing among $${a}$ friends gives $${frac('g', a)}$ each: $${frac('g', a)} = ${q}$.`, `Multiply both sides by $${a}$: $g = ${q} ${T} ${a} = ${x}$.`], check: `$${x} ${D} ${a} = ${q}$ ${OK}`,
    answer: `${name} shared $${x}$ grapes.`,
  };
}

function problemTwo(rng: Rng): Problem {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['packs', 'tickets', 'saving', 'share', 'cases'] as const);
  if (kind === 'packs') {
    const [a, x, b] = [rng.int(3, 6), rng.int(6, 12), rng.int(2, 9)];
    const c = a * x + b;
    return {
      text: `${name} has $${a}$ full packs of hockey cards and $${b}$ loose cards. Every pack has the same number of cards. ${name} has $${c}$ cards in all. How many cards are in each pack?`,
      v: 'p', eq: `${a}p + ${b} = ${c}`, wrong: [`${b}p + ${a} = ${c}`, `${a}p - ${b} = ${c}`, `${a} + ${b}p = ${c}`], x, unit: 'cards',
      steps: [`Let $p$ be the number of cards in each pack. $${a}$ packs have $${a}p$ cards. Add the $${b}$ loose cards: $${a}p + ${b} = ${c}$.`, `Subtract $${b}$ from both sides: $${a}p = ${c - b}$.`, `Divide both sides by $${a}$: $p = ${c - b} ${D} ${a} = ${x}$.`],
      check: `$${a} ${T} ${x} + ${b} = ${a * x} + ${b} = ${c}$ ${OK}`, answer: `There are $${x}$ cards in each pack.`,
    };
  }
  if (kind === 'tickets') {
    const [a, x, b] = [rng.int(2, 6), rng.int(5, 15), rng.int(3, 9)];
    const c = a * x + b;
    return {
      text: `${name}'s family buys $${a}$ tickets to a museum in ${rng.pick(TOWNS)} and pays ${dollars(b)} for parking. They pay ${dollars(c)} in all. Each ticket costs the same. How much does one ticket cost?`,
      v: 't', eq: `${a}t + ${b} = ${c}`, wrong: [`${b}t + ${a} = ${c}`, `${a}t - ${b} = ${c}`, `${frac('t', a)} + ${b} = ${c}`], x, unit: 'dollars',
      steps: [`Let $t$ be the cost of one ticket in dollars. $${a}$ tickets cost $${a}t$. Add the parking: $${a}t + ${b} = ${c}$.`, `Subtract $${b}$ from both sides: $${a}t = ${c - b}$.`, `Divide both sides by $${a}$: $t = ${c - b} ${D} ${a} = ${x}$.`],
      check: `$${a} ${T} ${x} + ${b} = ${a * x} + ${b} = ${c}$ ${OK}`, answer: `One ticket costs ${dollars(x)}.`,
    };
  }
  if (kind === 'saving') {
    const [a, x, b] = [rng.int(3, 8), rng.int(4, 10), rng.int(5, 20)];
    const c = a * x + b;
    return {
      text: `${name} had ${dollars(b)} and then saved ${dollars(a)} each week. Now ${name} has ${dollars(c)}. For how many weeks did ${name} save?`,
      v: 'w', eq: `${a}w + ${b} = ${c}`, wrong: [`${b}w + ${a} = ${c}`, `${a}w - ${b} = ${c}`, `w + ${a} + ${b} = ${c}`], x, unit: 'weeks',
      steps: [`Let $w$ be the number of weeks. Saving ${dollars(a)} a week for $w$ weeks is $${a}w$. Add the ${dollars(b)} from the start: $${a}w + ${b} = ${c}$.`, `Subtract $${b}$ from both sides: $${a}w = ${c - b}$.`, `Divide both sides by $${a}$: $w = ${c - b} ${D} ${a} = ${x}$.`],
      check: `$${a} ${T} ${x} + ${b} = ${a * x} + ${b} = ${c}$ ${OK}`, answer: `${name} saved for $${x}$ weeks.`,
    };
  }
  if (kind === 'share') {
    const [a, q, b] = [rng.int(2, 5), rng.int(3, 9), rng.int(2, 6)];
    const x = a * q;
    const c = q + b;
    return {
      text: `${name} shares a bag of apples equally among $${a}$ friends. Then each friend picks $${b}$ more apples from a tree. Now each friend has $${c}$ apples. How many apples were in the bag?`,
      v: 'a', eq: `${frac('a', a)} + ${b} = ${c}`, wrong: [`${a}a + ${b} = ${c}`, `${frac('a', b)} + ${a} = ${c}`, `${frac('a', a)} - ${b} = ${c}`], x, unit: 'apples',
      steps: [`Let $a$ be the number of apples in the bag. Each friend gets $${frac('a', a)}$, then $${b}$ more: $${frac('a', a)} + ${b} = ${c}$.`, `Subtract $${b}$ from both sides: $${frac('a', a)} = ${q}$.`, `Multiply both sides by $${a}$: $a = ${q} ${T} ${a} = ${x}$.`],
      check: `$${x} ${D} ${a} + ${b} = ${q} + ${b} = ${c}$ ${OK}`, answer: `There were $${x}$ apples in the bag.`,
    };
  }
  const [a, x, b] = [rng.int(2, 5), rng.int(8, 20), rng.int(3, 12)];
  const c = a * x - b;
  return {
    text: `${name}'s class buys $${a}$ cases of juice boxes. Every case has the same number of juice boxes. After the class drinks $${b}$ of them, there are $${c}$ juice boxes left. How many juice boxes are in each case?`,
    v: 'j', eq: `${a}j - ${b} = ${c}`, wrong: [`${a}j + ${b} = ${c}`, `${b}j - ${a} = ${c}`, `${frac('j', a)} - ${b} = ${c}`], x, unit: 'juice boxes',
    steps: [`Let $j$ be the number of juice boxes in each case. $${a}$ cases hold $${a}j$. Take away the $${b}$ they drank: $${a}j - ${b} = ${c}$.`, `Add $${b}$ to both sides: $${a}j = ${c + b}$.`, `Divide both sides by $${a}$: $j = ${c + b} ${D} ${a} = ${x}$.`],
    check: `$${a} ${T} ${x} - ${b} = ${a * x} - ${b} = ${c}$ ${OK}`, answer: `There are $${x}$ juice boxes in each case.`,
  };
}

const equationProblems = skill({
  id: 'm5-equation-problems',
  name: 'Equation problems',
  description: 'Write an equation with one or two operations for a problem, solve it with inverse operations, and check the solution.',
  outcomes: ['A1'],
  lessonId: 'm5-7-3',
  gen(rng, d) {
    const p = d === 1 ? problemOne(rng) : problemTwo(rng);
    const hints = [
      `Let $${p.v}$ be the unknown number. Write what happens to it, in order, as an equation.`,
      d === 1 ? SOLVE_HINT : 'Undo the adding or subtracting first, then the multiplying or dividing.',
    ];
    const solution = [...p.steps, `Check: ${p.check}`, p.answer];
    if (d === 3) {
      return {
        prompt: `${p.text}\n\nUse the letter $${p.v}$. Write an equation, solve it, and check your answer.`,
        parts: [numAns(p.x, `$${p.v} =$`, p.unit)],
        hints,
        solution,
      };
    }
    return {
      prompt: `${p.text}\n\n(a) Which equation matches the problem?\n\n(b) Solve it.`,
      parts: [{ answer: mc(rng, `$${p.eq}$`, p.wrong.map((w) => `$${w}$`)), label: '(a)' }, numAns(p.x, `(b) $${p.v} =$`, p.unit)],
      hints,
      solution,
    };
  },
});

export const ALGEBRA_SKILLS: SkillDef[] = [orderOfOperations, writeExpression, evaluateExpression, solveEquation, equationProblems];
