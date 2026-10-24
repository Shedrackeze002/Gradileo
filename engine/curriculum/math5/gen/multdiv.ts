/** Math 5 Unit 4 — Multiplying and Dividing (N4): standard algorithms, remainders in context, estimation and problems. */
import { mc, retry, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };

/** A whole number in maths; five or more digits get a thin space (12\,456). */
const N = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : String(n));
const T = '\\times';
const D = '\\div';
/** Money in prose, never inside $...$. */
const money = (dollars: number) => `\\$${dollars}`;
const digitsOf = (n: number) => String(n).split('').map(Number);

/** A whole-number answer typed as a plain number. */
function whole(v: number, suffix?: string, label?: string): Part {
  return { label, suffix, answer: { kind: 'numeric', value: v, allowExpression: false } };
}

// Column layouts ---------------------------------------------------------------

/** Digits of n spaced into W right-aligned columns (empty columns are \phantom{0}). */
function row(n: number | null, W: number, deco: (c: number, d: string) => string = (_c, d) => d): string {
  const ds = n === null ? [] : String(n).split('').reverse();
  const out: string[] = [];
  for (let c = W - 1; c >= 0; c--) out.push(deco(c, c < ds.length ? ds[c] : '\\phantom{0}'));
  return out.join('\\,');
}

/** Words for multiplying a by one digit k, with carries; returns the lines and the carries into each column. */
function oneDigitLines(a: number, k: number): { lines: string[]; carries: number[] } {
  const ds = digitsOf(a).reverse();
  const lines: string[] = [];
  const carries: number[] = [0];
  let carry = 0;
  ds.forEach((x, i) => {
    const p = k * x;
    const s = p + carry;
    const last = i === ds.length - 1;
    const sum = carry ? `$${k} ${T} ${x} = ${p}$, plus the carried $${carry}$ is $${s}$.` : `$${k} ${T} ${x} = ${p}$.`;
    if (last) lines.push(`${sum} Write $${s}$.`);
    else if (s >= 10) lines.push(`${sum} Write $${s % 10}$ and carry $${Math.floor(s / 10)}$.`);
    else lines.push(`${sum} Write $${s}$.`);
    carry = Math.floor(s / 10);
    carries.push(carry);
  });
  return { lines, carries };
}

interface Work {
  steps: string[];
  product: number;
}

/** The standard algorithm for a × b (b has one or two digits), as solution steps with a layout. */
function multiplyWork(a: number, b: number): Work {
  const product = a * b;
  const b0 = b % 10;
  const b1 = Math.floor(b / 10);
  if (b < 10) {
    const { lines, carries } = oneDigitLines(a, b);
    const W = String(product).length;
    // Carries sit above the digit they are added to; the last product is written in full, so no carry goes past the number.
    const len = String(a).length;
    const top = row(a, W, (c, d) => (c < len && carries[c] ? `\\overset{${carries[c]}}{${d}}` : d));
    return {
      steps: [
        `Multiply each digit of $${a}$ by $${b}$, starting with the ones:\n\n${lines.map((l) => `- ${l}`).join('\n')}`,
        `$$\\begin{array}{r}${top} \\\\ \\underline{${T}\\ ${row(b, W)}} \\\\ ${row(product, W)}\\end{array}$$`,
      ],
      product,
    };
  }
  const p1 = a * b0;
  const p2 = a * b1 * 10;
  const W = String(product).length;
  const first = oneDigitLines(a, b0).lines;
  const second = oneDigitLines(a, b1).lines;
  const steps = [
    `Multiply $${a}$ by the ones digit, $${b0}$:\n\n${first.map((l) => `- ${l}`).join('\n')}\n\nThe first partial product is $${N(p1)}$.`,
    `Multiply $${a}$ by the tens digit, $${b1}$. It stands for $${b1 * 10}$, so first write a $0$ in the ones place. Then:\n\n${second.map((l) => `- ${l}`).join('\n')}\n\nThe second partial product is $${N(p2)}$.`,
    `Add the partial products: $${N(p1)} + ${N(p2)} = ${N(product)}$.`,
    `$$\\begin{array}{rl}${row(a, W)} & \\\\ \\underline{${T}\\ ${row(b, W)}} & \\\\ ${row(p1, W)} & \\leftarrow ${a} ${T} ${b0} \\\\ \\underline{+\\ ${row(p2, W)}} & \\leftarrow ${a} ${T} ${b1 * 10} \\\\ ${row(product, W)} & \\end{array}$$`,
  ];
  return { steps, product };
}

interface DivWork {
  steps: string[];
  q: number;
  r: number;
}

/** The standard (long division) algorithm for n ÷ d with a one-digit divisor. */
function divideWork(n: number, d: number): DivWork {
  const ds = digitsOf(n);
  const L = ds.length;
  let i = 0;
  let p = ds[0];
  const lines: string[] = [];
  if (p < d && L > 1) {
    lines.push(`$${d}$ does not go into $${ds[0]}$, so start with the first two digits, $${ds[0]}${ds[1]}$.`);
    i = 1;
    p = ds[0] * 10 + ds[1];
  }
  const rows: string[] = [];
  const pad = (k: number) => '\\,\\phantom{0}'.repeat(k);
  const digits = (x: number) => String(x).split('').join('\\,');
  let qs = '';
  for (;;) {
    const q = Math.floor(p / d);
    const prod = q * d;
    const r = p - prod;
    qs += String(q);
    lines.push(
      q === 0
        ? `$${d}$ does not go into $${p}$, so write $0$ in the quotient. $${d} ${T} 0 = 0$ and $${p} - 0 = ${p}$.`
        : `Divide: how many $${d}$s are in $${p}$? $${d} ${T} ${q} = ${prod}$${q < 9 ? ` and $${d} ${T} ${q + 1} = ${(q + 1) * d}$ is too big` : ''}, so write $${q}$ in the quotient. Subtract: $${p} - ${prod} = ${r}$.`,
    );
    rows.push(`\\underline{-\\,${digits(prod)}}${pad(L - 1 - i)}`);
    if (i === L - 1) {
      rows.push(`${digits(r)}`);
      const quotient = Number(qs);
      lines.push(r ? `There are no more digits to bring down. The remainder is $${r}$.` : 'There are no more digits to bring down, and the remainder is $0$.');
      const qRow = `${row(quotient, L)}${r ? `\\mathrlap{\\ \\text{R}\\,${r}}` : ''}`;
      const top = `${d}\\,\\overline{\\smash{)}\\,${row(n, L)}}`;
      return {
        steps: [
          `Divide one place at a time, from left to right. Each time: divide, multiply, subtract, bring down the next digit.\n\n${lines.map((l) => `- ${l}`).join('\n')}`,
          `$$\\begin{array}{r}${qRow} \\\\ ${top} \\\\ ${rows.join(' \\\\ ')}\\end{array}$$`,
        ],
        q: quotient,
        r,
      };
    }
    i++;
    p = r * 10 + ds[i];
    lines.push(r ? `Bring down the $${ds[i]}$ to make $${p}$.` : `Bring down the $${ds[i]}$.`);
    rows.push(`${digits(p)}${pad(L - 1 - i)}`);
  }
}

/** Round to one non-zero digit: 347 -> 300, 26 -> 30. */
function lead(x: number): number {
  const p = 10 ** (String(x).length - 1);
  return Math.round(x / p) * p;
}

// ---------------------------------------------------------------------------
// 4.1 Multiplying with the standard algorithm
// ---------------------------------------------------------------------------

const MULT_HINTS = (b: number): string[] =>
  b < 10
    ? ['Multiply the ones first, then the tens, then the hundreds.', 'When a product is $10$ or more, write the ones digit and carry the tens digit to the next place. Add the carry after you multiply.']
    : ['Find two partial products: the number times the ones digit, and the number times the tens digit.', 'The tens digit stands for tens, so put a $0$ in the ones place of the second partial product. Then add the partial products.'];

function multiplyCalc(rng: Rng, d: Difficulty): Out {
  let a: number;
  let b: number;
  if (d === 1) {
    a = rng.chance(0.4) ? rng.int(13, 98) : rng.int(102, 989);
    b = rng.int(3, 9);
  } else if (d === 2) {
    [a, b] = rng.chance(0.4) ? [rng.int(13, 98), rng.int(12, 98)] : [rng.int(102, 989), rng.int(12, 98)];
  } else {
    // A zero inside the three-digit number.
    a = rng.int(1, 9) * 100 + rng.int(1, 9);
    b = rng.int(21, 98);
  }
  if (a % 10 === 0) a += rng.int(1, 9);
  if (b % 10 === 0) b += rng.int(1, 9);
  const w = multiplyWork(a, b);
  const est = lead(a) * lead(b);
  return {
    prompt: rng.pick([`Use the standard algorithm. Find $${a} ${T} ${b}$.`, `Multiply: $${a} ${T} ${b}$.`, `Find the product of $${a}$ and $${b}$.`]),
    parts: [whole(w.product)],
    hints: MULT_HINTS(b),
    solution: [
      ...w.steps,
      ...(d > 1 ? [`Check with an estimate: $${a} ${T} ${b}$ is about $${N(lead(a))} ${T} ${lead(b)} = ${N(est)}$. The answer is close, so it is reasonable.`] : []),
      `$${a} ${T} ${b} = ${N(w.product)}$`,
    ],
  };
}

/** Find the mistake in someone's multiplication. */
function findMistake(rng: Rng): Out {
  for (;;) {
    const a = rng.int(102, 899);
    const b = rng.int(13, 89);
    const b0 = b % 10;
    const b1 = Math.floor(b / 10);
    if (a % 10 === 0 || b0 === 0) continue;
    const p1 = a * b0;
    const p2 = a * b1 * 10;
    const kind = rng.pick(['zero', 'carry'] as const);
    let w1 = p1;
    let w2 = p2;
    if (kind === 'zero') w2 = a * b1;
    else {
      // Forgot to add the first carried digit in the first partial product.
      const c0 = Math.floor((a % 10) * b0 / 10);
      if (c0 === 0) continue;
      w1 = p1 - c0 * 10;
      if (Math.floor(w1 / 10) % 10 === Math.floor(p1 / 10) % 10) continue;
    }
    const total = w1 + w2;
    const W = String(Math.max(total, a * b)).length;
    const name = rng.pick(NAMES);
    const work = `$$\\begin{array}{r}${row(a, W)} \\\\ \\underline{${T}\\ ${row(b, W)}} \\\\ ${row(w1, W)} \\\\ \\underline{+\\ ${row(w2, W)}} \\\\ ${row(total, W)}\\end{array}$$`;
    const choices = [
      'The second partial product is missing the $0$ in the ones place.',
      'A carried digit was not added in the first partial product.',
      'The partial products were added wrong.',
      'The digits of the first partial product are in the wrong order.',
    ];
    const correct = kind === 'zero' ? 0 : 1;
    const right = multiplyWork(a, b);
    return {
      prompt: `${name} used the standard algorithm to find $${a} ${T} ${b}$. ${name} got $${N(total)}$, which is wrong.\n\n${work}\n\nWhat mistake did ${name} make?`,
      parts: [{ answer: mc(rng, choices[correct], choices.filter((_, i) => i !== correct)) }],
      hints: ['Check each partial product by doing it yourself.', `The first partial product should be $${a} ${T} ${b0}$. The second should be $${a} ${T} ${b1 * 10}$.`],
      solution: [
        kind === 'zero'
          ? `The second partial product should be $${a} ${T} ${b1 * 10} = ${N(p2)}$. ${name} wrote $${N(w2)}$, which is $${a} ${T} ${b1}$. The $0$ in the ones place is missing.`
          : `The first partial product should be $${a} ${T} ${b0} = ${N(p1)}$. ${name} wrote $${N(w1)}$: the carried digit from $${b0} ${T} ${a % 10} = ${b0 * (a % 10)}$ was not added in the tens place.`,
        ...right.steps,
        `The correct product is $${N(a * b)}$. The mistake: ${choices[correct].charAt(0).toLowerCase()}${choices[correct].slice(1)}`,
      ],
    };
  }
}

/** Is a product reasonable? Check with an estimate. */
function productReasonable(rng: Rng): Out {
  for (;;) {
    const a = rng.int(102, 989);
    const b = rng.int(12, 98);
    if (a % 10 === 0 || b % 10 === 0) continue;
    const exact = a * b;
    const est = lead(a) * lead(b);
    if (Math.abs(exact - est) > 0.3 * est) continue;
    const ok = rng.chance(0.45);
    // Forgetting the zero in the second partial product gives a much smaller answer.
    const claimed = ok ? exact : rng.chance(0.5) ? a * (b % 10) + a * Math.floor(b / 10) : exact * 10;
    const other = lead(a) * Math.floor(lead(b) / 10);
    if (other === est || other <= 0) continue;
    const name = rng.pick(NAMES);
    const E = (x: number) => `$${N(x)}$`;
    const choices = [
      `Yes. The estimate is ${E(est)}, and the answer is close to it.`,
      `No. The estimate is ${E(est)}, and the answer is far from it.`,
      `Yes. The estimate is ${E(other)}, and the answer is close to it.`,
      `No. The estimate is ${E(other)}, and the answer is far from it.`,
    ];
    const correct = ok ? 0 : 1;
    return {
      prompt: `${name} says that $${a} ${T} ${b} = ${N(claimed)}$. Estimate by rounding each number to its greatest place. Is ${name}’s answer reasonable?`,
      parts: [{ answer: mc(rng, choices[correct], choices.filter((_, i) => i !== correct)) }],
      hints: [`Round $${a}$ to the nearest hundred and $${b}$ to the nearest ten.`, 'Multiply the rounded numbers. A reasonable answer is close to the estimate.'],
      solution: [
        `Round: $${a}$ is about $${lead(a)}$ and $${b}$ is about $${lead(b)}$.`,
        `Estimate: $${lead(a)} ${T} ${lead(b)} = ${N(est)}$. (Multiply $${lead(a) / 100} ${T} ${lead(b) / 10} = ${(lead(a) / 100) * (lead(b) / 10)}$, then write three zeros.)`,
        ok ? `$${N(claimed)}$ is close to $${N(est)}$, so the answer is reasonable.` : `$${N(claimed)}$ is far from $${N(est)}$, so the answer is not reasonable. (The exact product is $${N(exact)}$.)`,
        `The answer is: ${choices[correct]}`,
      ],
    };
  }
}

const multiply = skill({
  id: 'm5-multiply',
  name: 'Multiplying with the standard algorithm',
  description: 'Multiply up to 3-digit by 2-digit natural numbers with the standard algorithm, explain the steps, and check a product with an estimate.',
  outcomes: ['N4'],
  lessonId: 'm5-4-1',
  calculator: false,
  gen(rng, d) {
    if (d < 3) return multiplyCalc(rng, d);
    return rng.pick([multiplyCalc, findMistake, productReasonable] as Array<(r: Rng, d: Difficulty) => Out>)(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Dividing with the standard algorithm
// ---------------------------------------------------------------------------

const DIV_HINTS = [
  'Work from left to right: divide, multiply, subtract, then bring down the next digit.',
  'If the divisor does not go into a digit, write $0$ in the quotient (or start with two digits at the very beginning).',
];

function divideCalc(rng: Rng, d: Difficulty): Out {
  const k = rng.int(d === 1 ? 2 : 3, 9);
  let n: number;
  if (d === 1) {
    // A two-digit or three-digit dividend with no remainder and a quotient of at least 11.
    n = k * (rng.chance(0.4) ? rng.int(11, Math.floor(99 / k)) : rng.int(Math.max(11, Math.ceil(100 / k)), Math.floor(999 / k)));
  } else if (d === 2) {
    n = retry(() => rng.int(100, 999), (x) => x % k !== 0 && Math.floor(x / k) >= 12);
  } else {
    // A zero in the quotient: 832 ÷ 4 = 208, 625 ÷ 6 = 104 R 1.
    n = retry(
      () => k * (rng.int(1, Math.floor(9 / k) || 1) * 100 + rng.int(1, 9)) + rng.int(0, k - 1),
      (x) => x >= 100 && x <= 999 && String(Math.floor(x / k)).includes('0'),
      200,
    );
  }
  const w = divideWork(n, k);
  const twoParts = d > 1;
  return {
    prompt: twoParts ? `Use the standard algorithm. Find $${n} ${D} ${k}$. Give the quotient and the remainder.` : `Use the standard algorithm. Find $${n} ${D} ${k}$.`,
    parts: twoParts ? [whole(w.q, undefined, 'Quotient:'), whole(w.r, undefined, 'Remainder:')] : [whole(w.q)],
    hints: DIV_HINTS,
    solution: [
      ...w.steps,
      w.r ? `Check: $${k} ${T} ${w.q} + ${w.r} = ${k * w.q} + ${w.r} = ${n}$.` : `Check: $${k} ${T} ${w.q} = ${n}$.`,
      w.r ? `$${n} ${D} ${k} = ${w.q}$ R $${w.r}$. The quotient is $${w.q}$ and the remainder is $${w.r}$.` : `$${n} ${D} ${k} = ${w.q}$${twoParts ? '. The remainder is $0$.' : ''}`,
    ],
  };
}

/** Work backwards: the dividend from the quotient and remainder. */
function missingDividend(rng: Rng): Out {
  const k = rng.int(3, 9);
  const q = rng.int(21, Math.floor(999 / k) - 1);
  const r = rng.int(1, k - 1);
  const n = k * q + r;
  return {
    prompt: `What number goes in the box?\n\n$$\\boxed{\\phantom{0}} ${D} ${k} = ${q}\\ \\text{R}\\ ${r}$$`,
    parts: [whole(n)],
    hints: ['Use the check for division: divisor times quotient, plus the remainder, gives the dividend.', `Find $${k} ${T} ${q}$, then add $${r}$.`],
    solution: [
      'In a division, divisor $\\times$ quotient $+$ remainder $=$ dividend.',
      ...multiplyWork(q, k).steps,
      `$${k} ${T} ${q} = ${k * q}$. Add the remainder: $${k * q} + ${r} = ${n}$.`,
      `The missing number is $${n}$. Check: $${n} ${D} ${k} = ${q}$ R $${r}$.`,
    ],
  };
}

const divide = skill({
  id: 'm5-divide',
  name: 'Dividing with the standard algorithm',
  description: 'Divide 3-digit by 1-digit natural numbers with the standard algorithm, write the quotient and remainder, and check by multiplying.',
  outcomes: ['N4'],
  lessonId: 'm5-4-2',
  calculator: false,
  gen(rng, d) {
    if (d === 3 && rng.chance(0.35)) return missingDividend(rng);
    return divideCalc(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Solving problems
// ---------------------------------------------------------------------------

interface Ctx {
  prompt: string;
  hint: string;
  steps: string[];
  answer: number;
  unit: string;
}

/** One-step problems: multiply, or divide with no remainder. */
function oneStep(rng: Rng): Ctx {
  const name = rng.pick(NAMES);
  const kind = rng.int(0, 5);
  if (kind <= 2) {
    const c = [
      { a: [12, 48], b: [12, 36], text: (a: number, b: number) => `A school orders $${b}$ boxes of markers. Each box holds $${a}$ markers. How many markers does the school order?`, unit: 'markers' },
      { a: [125, 450], b: [12, 30], text: (a: number, b: number) => `A large greenhouse has $${b}$ rows of tomato plants. Each row has $${a}$ plants. How many tomato plants are there?`, unit: 'plants' },
      { a: [14, 29], b: [21, 35], text: (a: number, b: number) => `Tickets to a science centre cost ${money(a)} each. A class of $${b}$ students goes. What is the total cost of the tickets?`, unit: 'dollars' },
      { a: [235, 480], b: [12, 24], text: (a: number, b: number) => `${name} rides a bike $${a}$ km each month. How far does ${name} ride in $${b}$ months?`, unit: 'km' },
    ][kind === 2 ? rng.int(2, 3) : kind];
    const a = rng.int(c.a[0], c.a[1]);
    const b = rng.int(c.b[0], c.b[1]);
    const w = multiplyWork(a, b);
    return { prompt: c.text(a, b), hint: 'Equal groups put together: multiply.', steps: [`There are $${b}$ equal groups of $${a}$, so multiply: $${a} ${T} ${b}$.`, ...w.steps], answer: w.product, unit: c.unit };
  }
  const k = rng.int(3, 9);
  const q = rng.int(14, Math.floor(999 / k));
  const n = k * q;
  const c = [
    { text: `${name} shares $${n}$ stickers equally among $${k}$ friends. How many stickers does each friend get?`, unit: 'stickers' },
    { text: `A farmer packs $${n}$ apples into $${k}$ crates with the same number in each crate. How many apples go in each crate?`, unit: 'apples' },
    { text: `A school has $${n}$ chairs to set up in $${k}$ equal rows for a concert. How many chairs are in each row?`, unit: 'chairs' },
  ][kind - 3];
  const w = divideWork(n, k);
  return { prompt: c.text, hint: 'Sharing equally means divide.', steps: [`Sharing equally means divide: $${n} ${D} ${k}$.`, ...w.steps], answer: w.q, unit: c.unit };
}

/** Division with a remainder that the context decides what to do with. */
function remainderCtx(rng: Rng): Ctx {
  const kind = rng.pick(['up', 'up', 'down', 'down', 'left'] as const);
  const k = rng.int(4, 9);
  // A "left over" answer is at least 2, so the answer reads naturally with a plural unit.
  const n = retry(() => rng.int(110, 499), (x) => x % k >= (kind === 'left' ? 2 : 1));
  const q = Math.floor(n / k);
  const r = n % k;
  const name = rng.pick(NAMES);
  const w = divideWork(n, k);
  const div = `$${n} ${D} ${k} = ${q}$ R $${r}$`;
  if (kind === 'up') {
    const c = rng.pick([
      { text: `$${n}$ students are going on a field trip to a dinosaur museum. Each van holds $${k}$ students. How many vans are needed?`, unit: 'vans', extra: `The last $${r}$ student${r > 1 ? 's' : ''} still need${r > 1 ? '' : 's'} a van` },
      { text: `A class needs $${n}$ cupcakes for a bake sale. Cupcakes come in boxes of $${k}$. How many boxes must the class buy?`, unit: 'boxes', extra: `With only $${q}$ boxes the class would be $${r}$ cupcake${r > 1 ? 's' : ''} short` },
      { text: `$${n}$ guests are coming to a community supper in a small town. Each table seats $${k}$ people. How many tables are needed so everyone has a seat?`, unit: 'tables', extra: `The last $${r}$ guest${r > 1 ? 's' : ''} still need${r > 1 ? '' : 's'} a table` },
    ]);
    return {
      prompt: c.text,
      hint: 'Divide. Then think: can anyone be left out? If not, you need one more group for the remainder.',
      steps: [`Divide: $${n} ${D} ${k}$.`, ...w.steps, `${div}. ${c.extra}, so round **up** to $${q + 1}$.`],
      answer: q + 1,
      unit: c.unit,
    };
  }
  if (kind === 'down') {
    const c = rng.pick([
      { text: `${name} shares $${n}$ cookies equally among $${k}$ friends. How many cookies does each friend get? (Cookies are not broken.)`, unit: 'cookies', extra: `Each friend gets $${q}$. The $${r}$ cookie${r > 1 ? 's' : ''} left over cannot be shared equally` },
      { text: `A farm packs $${n}$ eggs into cartons of $${k}$. How many cartons can be filled?`, unit: 'cartons', extra: `Only full cartons count. The $${r}$ egg${r > 1 ? 's' : ''} left over do${r > 1 ? '' : 'es'} not fill a carton` },
      { text: `${name} has a ribbon $${n}$ cm long. ${name} cuts pieces that are $${k}$ cm long for a craft. How many pieces can ${name} cut?`, unit: 'pieces', extra: `The $${r}$ cm left over is too short for another piece` },
    ]);
    return {
      prompt: c.text,
      hint: 'Divide. Then think: does the remainder make another full group?',
      steps: [`Divide: $${n} ${D} ${k}$.`, ...w.steps, `${div}. ${c.extra}, so the answer is $${q}$.`],
      answer: q,
      unit: c.unit,
    };
  }
  const c = rng.pick([
    { text: `${name} shares $${n}$ cookies equally among $${k}$ friends. How many cookies are left over?`, unit: 'cookies' },
    { text: `A coach puts $${n}$ hockey pucks into bags of $${k}$. How many pucks are left over after the bags are full?`, unit: 'pucks' },
    { text: `$${n}$ marbles are shared equally by $${k}$ children. How many marbles are left over?`, unit: 'marbles' },
  ]);
  return {
    prompt: c.text,
    hint: 'Divide. The question asks about what is left over: the remainder.',
    steps: [`Divide: $${n} ${D} ${k}$.`, ...w.steps, `${div}. The question asks how many are left over, which is the remainder: $${r}$.`],
    answer: r,
    unit: c.unit,
  };
}

/** Two-step problems. */
function twoStep(rng: Rng): Ctx {
  const name = rng.pick(NAMES);
  const kind = rng.int(0, 3);
  if (kind === 0) {
    // Multiply, then divide and round up.
    const classes = rng.int(4, 8);
    const per = rng.int(21, 29);
    const total = classes * per;
    const k = retry(() => rng.int(6, 9), (x) => total % x !== 0);
    const q = Math.floor(total / k);
    return {
      prompt: `$${classes}$ classes from a school are going skating. Each class has $${per}$ students. Each bus holds $${k}$ students. How many buses are needed?`,
      hint: 'First find the number of students. Then divide by the number in each bus.',
      steps: [
        `First, the number of students: $${per} ${T} ${classes}$.`,
        ...multiplyWork(per, classes).steps,
        `There are $${total}$ students. Now divide by $${k}$.`,
        ...divideWork(total, k).steps,
        `$${total} ${D} ${k} = ${q}$ R $${total % k}$. The last $${total % k}$ student${total % k > 1 ? 's' : ''} still need${total % k > 1 ? '' : 's'} a bus, so round up to $${q + 1}$.`,
      ],
      answer: q + 1,
      unit: 'buses',
    };
  }
  if (kind === 1) {
    // Multiply, then subtract.
    const price = rng.int(12, 19);
    const students = rng.int(22, 31);
    const budget = rng.pick([500, 600, 700, 800]);
    if (price * students >= budget) return twoStep(rng);
    return {
      prompt: `A class of $${students}$ students has ${money(budget)} for a field trip. Tickets cost ${money(price)} per student. How much money is left after buying the tickets?`,
      hint: 'First find the cost of all the tickets. Then subtract from the money the class has.',
      steps: [`First, the cost of the tickets: $${price} ${T} ${students}$.`, ...multiplyWork(price, students).steps, `The tickets cost ${money(price * students)}. Then subtract: $${budget} - ${price * students} = ${budget - price * students}$.`],
      answer: budget - price * students,
      unit: 'dollars',
    };
  }
  if (kind === 2) {
    // Multiply, then share equally.
    const k = rng.int(3, 9);
    const packs = rng.int(12, 30);
    const per = rng.pick([12, 15, 18, 24, 25, 30, 36]);
    const total = packs * per;
    if (total > 999 || total % k !== 0) return twoStep(rng);
    return {
      prompt: `A school buys $${packs}$ packs of pencils. Each pack has $${per}$ pencils. The pencils are shared equally among $${k}$ classrooms. How many pencils does each classroom get?`,
      hint: 'First find the total number of pencils. Then share them equally.',
      steps: [`First, the total: $${per} ${T} ${packs}$.`, ...multiplyWork(per, packs).steps, `There are $${total}$ pencils. Share them equally: $${total} ${D} ${k}$.`, ...divideWork(total, k).steps],
      answer: total / k,
      unit: 'pencils',
    };
  }
  // Divide, then multiply.
  const k = rng.int(3, 8);
  const per = rng.int(3, 9);
  const cost = rng.int(4, 9);
  const n = k * per * rng.int(4, 12);
  if (n > 999) return twoStep(rng);
  const bags = n / per;
  return {
    prompt: `${name} has $${n}$ seed packets for a garden club sale. ${name} puts them in bags of $${per}$ and sells each bag for ${money(cost)}. How much money does ${name} make if every bag is sold?`,
    hint: 'First find the number of bags. Then multiply by the price of one bag.',
    steps: [`First, the number of bags: $${n} ${D} ${per}$.`, ...divideWork(n, per).steps, `There are $${bags}$ bags. Then multiply by the price: $${bags} ${T} ${cost}$.`, ...multiplyWork(bags, cost).steps],
    answer: bags * cost,
    unit: 'dollars',
  };
}

function problem(rng: Rng, d: Difficulty): Out {
  const c = d === 1 ? oneStep(rng) : d === 2 ? remainderCtx(rng) : twoStep(rng);
  const dollars = c.unit === 'dollars';
  return {
    prompt: c.prompt,
    parts: [dollars ? whole(c.answer, undefined, '\\$') : whole(c.answer, c.unit)],
    hints: [c.hint, d === 1 ? 'Use the standard algorithm, one digit at a time. Check with an estimate.' : 'Use the standard algorithms. Then read the question again: does your answer make sense?'],
    solution: [...c.steps, dollars ? `The answer is ${money(c.answer)}.` : `The answer is $${N(c.answer)}$ ${c.unit}.`],
  };
}

const problems = skill({
  id: 'm5-multiply-divide-problems',
  name: 'Solving multiplication and division problems',
  description: 'Solve problems with multiplication and division of natural numbers, and decide what to do with a remainder in context.',
  outcomes: ['N4'],
  lessonId: 'm5-4-3',
  calculator: false,
  gen(rng, d) {
    return problem(rng, d);
  },
});

export const MULTDIV_SKILLS: SkillDef[] = [multiply, divide, problems];
