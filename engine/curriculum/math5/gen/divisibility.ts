/** Math 5 Unit 3 — Divisibility and Factors (N3): tests for 2, 3 and 5, divisibility by 0 to 10, and factors. */
import { fixedChoice, mc, multi, part, retry, skill } from '../../helpers.ts';
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

const N = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : String(n));
const n$ = (n: number) => `$${N(n)}$`;
const digitsOf = (n: number) => String(n).split('').map(Number);
const digitSum = (n: number) => digitsOf(n).reduce((s, x) => s + x, 0);
const sumTex = (n: number) => `${digitsOf(n).join(' + ')} = ${digitSum(n)}`;
/** "a, b and c" */
function list(items: string[], word = 'and'): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${word} ${items[items.length - 1]}`;
}
const YES_NO = ['Yes', 'No'];

const TEST: Record<number, string> = {
  2: 'A number is divisible by $2$ when its last digit is even: $0$, $2$, $4$, $6$ or $8$.',
  3: 'A number is divisible by $3$ when the sum of its digits is divisible by $3$.',
  5: 'A number is divisible by $5$ when its last digit is $0$ or $5$.',
  10: 'A number is divisible by $10$ when its last digit is $0$.',
};
const HOW: Record<number, string> = {
  2: 'Look only at the last digit. Is it even?',
  3: 'Add the digits. Is the sum in the $3$ times table?',
  5: 'Look only at the last digit. Is it $0$ or $5$?',
  10: 'Look only at the last digit. Is it $0$?',
};

/** The working for one test (2, 3, 5 or 10), with its conclusion. */
function testStep(n: number, k: number): string {
  const last = n % 10;
  const yes = n % k === 0;
  const is = yes ? `so ${n$(n)} **is** divisible by $${k}$` : `so ${n$(n)} is **not** divisible by $${k}$`;
  if (k === 2) return `The last digit is $${last}$, which is ${last % 2 === 0 ? 'even' : 'odd'}, ${is}.`;
  if (k === 5) return `The last digit is $${last}$${yes ? '' : ', not $0$ or $5$'}, ${is}.`;
  if (k === 10) return `The last digit is $${last}$${yes ? '' : ', not $0$'}, ${is}.`;
  const s = digitSum(n);
  return `The digit sum is $${sumTex(n)}$. $${s}$ ${s % 3 === 0 ? `is divisible by $3$ ($${s} = 3 \\times ${s / 3}$)` : 'is not in the $3$ times table'}, ${is}.`;
}

/** A number in [lo, hi] that is (or is not) divisible by k; a "no" often looks tempting. */
function numberFor(rng: Rng, k: number, yes: boolean, lo: number, hi: number): number {
  return retry(
    () => {
      if (yes) return k * rng.int(Math.ceil(lo / k), Math.floor(hi / k));
      const x = rng.int(lo, hi);
      // Tempting "no"s: an even digit that is not last (for 2), a 5 that is not last (for 5), a last digit of 3, 6 or 9 (for 3).
      if (k === 2 && rng.chance(0.5)) return Number(String(x).slice(0, -1).replace(/\d$/, String(rng.pick([2, 4, 6, 8]))) + rng.pick([1, 3, 5, 7, 9]));
      if (k === 5 && rng.chance(0.5)) return Number('5' + String(x).slice(1, -1) + rng.pick([1, 2, 3, 4, 6, 7, 8, 9]));
      if (k === 3 && rng.chance(0.5)) return Number(String(x).slice(0, -1) + rng.pick([3, 6, 9]));
      return x;
    },
    (x) => x >= lo && x <= hi && (x % k === 0) === yes,
    200,
  );
}

// ---------------------------------------------------------------------------
// 3.1 Divisibility tests
// ---------------------------------------------------------------------------

function yesNo(rng: Rng, k: number, lo: number, hi: number): Out {
  const yes = rng.chance(0.5);
  const n = numberFor(rng, k, yes, lo, hi);
  return {
    prompt: `Use a divisibility test. Is ${n$(n)} divisible by $${k}$?`,
    parts: [part(fixedChoice(YES_NO, yes ? 0 : 1))],
    hints: [HOW[k], TEST[k]],
    solution: [TEST[k], testStep(n, k), `The answer is **${yes ? 'yes' : 'no'}**.${yes ? ` Check: $${N(n)} \\div ${k} = ${N(n / k)}$ with remainder $0$.` : ''}`],
  };
}

/** Which of four numbers is divisible by k? */
function whichDivisible(rng: Rng, k: number, lo: number, hi: number): Out {
  const right = numberFor(rng, k, true, lo, hi);
  const wrong: number[] = [];
  for (let i = 0; i < 40 && wrong.length < 3; i++) {
    const w = numberFor(rng, k, false, lo, hi);
    if (!wrong.includes(w)) wrong.push(w);
  }
  const all = [right, ...wrong];
  return {
    prompt: `Which number is divisible by $${k}$?`,
    parts: [part(mc(rng, n$(right), wrong.map(n$)))],
    hints: [HOW[k], TEST[k]],
    solution: [TEST[k], ...all.sort((a, b) => a - b).map((x) => testStep(x, k)), `The answer is ${n$(right)}.`],
  };
}

const ZERO_WHY = 'Dividing asks, "What number times the divisor gives the dividend?"';

/** Division by zero is not possible. */
function zero(rng: Rng): Out {
  const n = rng.int(2, 60);
  const kind = rng.pick(['n/0', '0/n', 'by0', 'why'] as const);
  const cannot = 'It is not possible. We cannot divide by $0$.';
  if (kind === 'n/0') {
    return {
      prompt: `What is $${n} \\div 0$?`,
      parts: [part(fixedChoice(['$0$', `$${n}$`, '$1$', cannot], 3))],
      hints: [`${ZERO_WHY} Think: $\\square \\times 0 = ${n}$.`, `Any number times $0$ is $0$, never $${n}$.`],
      solution: [
        `$${n} \\div 0 = \\square$ would mean $\\square \\times 0 = ${n}$.`,
        `But any number times $0$ is $0$. No number times $0$ gives $${n}$.`,
        `So $${n} \\div 0$ has no answer. Division by $0$ is not possible.`,
      ],
    };
  }
  if (kind === '0/n') {
    return {
      prompt: `What is $0 \\div ${n}$?`,
      parts: [part(fixedChoice(['$0$', `$${n}$`, '$1$', cannot], 0))],
      hints: [`${ZERO_WHY} Think: $\\square \\times ${n} = 0$.`, `If you share $0$ cookies among $${n}$ friends, how many does each friend get?`],
      solution: [`$0 \\div ${n} = \\square$ means $\\square \\times ${n} = 0$.`, `$0 \\times ${n} = 0$, so the answer is $0$.`, `$0 \\div ${n} = 0$. Dividing **into** $0$ works. Dividing **by** $0$ does not.`],
    };
  }
  if (kind === 'by0') {
    return {
      prompt: `${rng.pick(NAMES)} says, "${n$(n)} is divisible by $0$." Is that true?`,
      parts: [part(mc(rng, `No. Division by $0$ is not possible, so no number is divisible by $0$.`, [`Yes. Every number is divisible by $0$.`, `Yes, because $${n} \\div 0 = 0$.`, `No, because $${n}$ is too big.`]))],
      hints: [ZERO_WHY, `Try to find a number for the box: $\\square \\times 0 = ${n}$.`],
      solution: [`$${n} \\div 0 = \\square$ would mean $\\square \\times 0 = ${n}$.`, 'Any number times $0$ is $0$, so no number works.', 'Division by $0$ is not possible, so the statement is not true.'],
    };
  }
  const right = `No number times $0$ gives $${n}$.`;
  return {
    prompt: `Why can we not divide $${n}$ by $0$?`,
    parts: [part(mc(rng, right, ['Because the answer would be $0$.', `Because the answer would be $${n}$.`, 'Because $0$ is not a number.', `Because $${n}$ is too big.`]))],
    hints: [ZERO_WHY, `Write $${n} \\div 0 = \\square$ as a multiplication: $\\square \\times 0 = ${n}$.`],
    solution: [`$${n} \\div 0 = \\square$ would mean $\\square \\times 0 = ${n}$.`, 'Any number times $0$ is $0$, so no number works.', `The reason: no number times $0$ gives $${n}$.`],
  };
}

/** Investigate divisibility by any number up to 10 by dividing: remainder 0 means divisible. */
function remainderCheck(rng: Rng): Out {
  const k = rng.pick([4, 6, 7, 8, 9]);
  const yes = rng.chance(0.45);
  const q = rng.int(3, 11);
  const r = yes ? 0 : rng.int(1, k - 1);
  const n = k * q + r;
  return {
    prompt: `We do not have a divisibility test for $${k}$, so divide to check. Divide $${n}$ by $${k}$.`,
    parts: [
      { label: 'Remainder:', answer: { kind: 'numeric', value: r, allowExpression: false } },
      { label: `Is $${n}$ divisible by $${k}$?`, answer: fixedChoice(YES_NO, yes ? 0 : 1) },
    ],
    hints: [`Find the biggest multiple of $${k}$ that is not more than $${n}$.`, 'A number is divisible by another number when the remainder is $0$.'],
    solution: [
      `Count by $${k}$s: $${k} \\times ${q} = ${k * q}$${yes ? '' : ` and $${k} \\times ${q + 1} = ${k * (q + 1)}$, which is too big`}.`,
      yes ? `$${n} \\div ${k} = ${q}$ with remainder $0$.` : `$${n} - ${k * q} = ${r}$, so $${n} \\div ${k} = ${q}$ R $${r}$.`,
      yes ? `The remainder is $0$, so $${n}$ **is** divisible by $${k}$.` : `The remainder is $${r}$, not $0$, so $${n}$ is **not** divisible by $${k}$.`,
    ],
  };
}

/** Select every divisor among 2, 3, 5 and 10. */
function multiTests(rng: Rng, d: Difficulty): Out {
  const n = retry(
    () => rng.int(d === 2 ? 100 : 300, d === 2 ? 999 : 9999),
    (x) => {
      const c = [2, 3, 5, 10].filter((k) => x % k === 0).length;
      return c >= 1 && c <= 3;
    },
  );
  const ks = [2, 3, 5, 10];
  const yes = ks.filter((k) => n % k === 0);
  return {
    prompt: `Use the divisibility tests. ${n$(n)} is divisible by which of these numbers? Select all that apply.`,
    parts: [part(multi(rng, ks.map((k) => ({ md: `$${k}$`, correct: n % k === 0 })), true))],
    hints: ['The last digit tells you about $2$, $5$ and $10$.', 'The digit sum tells you about $3$.'],
    solution: [...ks.map((k) => testStep(n, k)), `So ${n$(n)} is divisible by ${list(yes.map((k) => `$${k}$`))}.`],
  };
}

const SHARE = [
  { ask: (n: number, ks: string) => `A coach has $${n}$ players at a soccer camp. Which team sizes would use every player with nobody left out? Select all that apply: teams of ${ks}.`, unit: 'players', group: 'teams' },
  { ask: (n: number, ks: string) => `A farm collected $${n}$ eggs. Which carton sizes would hold every egg with none left over? Select all that apply: cartons of ${ks}.`, unit: 'eggs', group: 'cartons' },
  { ask: (n: number, ks: string) => `There are $${n}$ chairs for a school concert. Which row sizes would use every chair with none left over? Select all that apply: rows of ${ks}.`, unit: 'chairs', group: 'rows' },
  { ask: (n: number, ks: string) => `A school has $${n}$ students going on a field trip. Which group sizes would put every student in a group with nobody left out? Select all that apply: groups of ${ks}.`, unit: 'students', group: 'groups' },
];

/** Context: which group sizes divide n? */
function shareContext(rng: Rng): Out {
  const c = rng.pick(SHARE);
  const n = retry(
    () => rng.int(102, 600),
    (x) => {
      const c2 = [2, 3, 5].filter((k) => x % k === 0).length;
      return c2 >= 1 && c2 <= 2;
    },
  );
  const ks = [2, 3, 5];
  return {
    prompt: c.ask(n, list(ks.map((k) => `$${k}$`), 'or')),
    parts: [part(multi(rng, ks.map((k) => ({ md: `${c.group[0].toUpperCase()}${c.group.slice(1)} of $${k}$`, correct: n % k === 0 })), true))],
    hints: [`Nobody is left out exactly when $${n}$ is divisible by the group size.`, 'Use the tests: the last digit for $2$ and $5$, the digit sum for $3$.'],
    solution: [
      `Nothing is left over when $${n}$ is divisible by the size.`,
      ...ks.map((k) => testStep(n, k)),
      `So ${list(ks.filter((k) => n % k === 0).map((k) => `${c.group} of $${k}$`))} work.`,
    ],
  };
}

/** Missing digits that make a number divisible by 3 (and sometimes 2 or 5 as well). */
function missingDigit(rng: Rng): Out {
  for (;;) {
    const also = rng.pick([0, 0, 2, 5] as const);
    const len = rng.int(3, 4);
    const ds = Array.from({ length: len }, (_, i) => (i === 0 ? rng.int(1, 9) : rng.int(0, 9)));
    const box = also ? len - 1 : rng.int(1, len - 1);
    const value = (d: number) => Number(ds.map((x, i) => (i === box ? d : x)).join(''));
    const works = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => value(d) % 3 === 0 && (!also || value(d) % also === 0));
    if (!works.length) continue;
    const shown = ds.map((x, i) => (i === box ? '\\square' : String(x))).join('');
    const known = ds.filter((_, i) => i !== box);
    const s = known.reduce((a, b) => a + b, 0);
    const need = also ? `divisible by both ${also === 2 ? '$2$ and $3$' : '$3$ and $5$'}` : 'divisible by $3$';
    const steps: string[] = [];
    if (also) steps.push(`${TEST[also]} The box is the last digit, so it must be ${also === 2 ? '$0$, $2$, $4$, $6$ or $8$' : '$0$ or $5$'}.`);
    steps.push(`${TEST[3]} Add the digits you know: $${known.join(' + ')} = ${s}$.`);
    const tries = also === 2 ? [0, 2, 4, 6, 8] : also === 5 ? [0, 5] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    steps.push(`Try each digit: ${tries.map((d) => `$${s} + ${d} = ${s + d}$`).join(', ')}.`);
    steps.push(`The sums in the $3$ times table come from ${list(works.map((d) => `$${d}$`), 'and')}.`);
    return {
      prompt: `The number $${shown}$ is ${need}. Which digits could go in the box? Enter every digit that works, separated by commas.`,
      parts: [part({ kind: 'numbers', values: works }, { label: 'Digit(s):', placeholder: 'e.g. 2, 5, 8' })],
      hints: [also ? `Start with the test for $${also}$: the box is the last digit.` : 'Add the digits you know. Then try each digit from $0$ to $9$ in the box.', `${TEST[3]} The digit sum must be in the $3$ times table.`],
      solution: [...steps, `The digit${works.length > 1 ? 's that work are' : ' that works is'} ${list(works.map((d) => `$${d}$`))}.`],
    };
  }
}

/** Which number passes two tests? */
function bothTests(rng: Rng): Out {
  const [a, b] = rng.pick([[2, 3], [3, 5], [2, 5], [3, 10]] as Array<[number, number]>);
  // Build each choice as a multiple, so every choice really passes (or fails) the tests it should.
  const both = a * b; // the pairs share no factor, so this is the smallest number divisible by both
  const multipleOf = (k: number) => k * rng.int(Math.ceil(102 / k), Math.floor(998 / k));
  const right = multipleOf(both);
  const onlyA = retry(() => multipleOf(a), (x) => x % b !== 0, 200);
  const onlyB = retry(() => multipleOf(b), (x) => x % a !== 0, 200);
  const neither = retry(() => rng.int(102, 998), (x) => x % a !== 0 && x % b !== 0 && x !== onlyA && x !== onlyB);
  const all = [right, onlyA, onlyB, neither];
  return {
    prompt: `Which number is divisible by **both** $${a}$ and $${b}$?`,
    parts: [part(mc(rng, n$(right), [onlyA, onlyB, neither].map(n$)))],
    hints: ['Check each number with both tests. It must pass both.', `${TEST[a]} ${TEST[b]}`],
    solution: [
      ...[...all].sort((x, y) => x - y).map((x) => `${n$(x)}: ${x % a === 0 ? `divisible by $${a}$` : `not divisible by $${a}$`}, ${x % b === 0 ? `divisible by $${b}$` : `not divisible by $${b}$`}.`),
      `Only ${n$(right)} passes both tests. ${testStep(right, a)} ${testStep(right, b)}`,
    ],
  };
}

const divisibility = skill({
  id: 'm5-divisibility',
  name: 'Divisibility tests',
  description: 'Use the divisibility tests for 2, 3 and 5, divide to check divisibility by other numbers up to 10, and explain why division by 0 is not possible.',
  outcomes: ['N3'],
  lessonId: 'm5-3-1',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick([2, 5]);
      return rng.pick([() => yesNo(rng, k, 20, 999), () => whichDivisible(rng, k, 20, 999), () => zero(rng)])();
    }
    if (d === 2) return rng.pick([() => yesNo(rng, 3, 100, 9999), () => whichDivisible(rng, 3, 100, 999), remainderCheck, () => multiTests(rng, 2), () => zero(rng)] as Array<(r: Rng) => Out>)(rng);
    return rng.pick([missingDigit, missingDigit, bothTests, shareContext, (r: Rng) => multiTests(r, 3)])(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.2 Factors
// ---------------------------------------------------------------------------

const factorsOf = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((k) => n % k === 0);

/** How to check whether k divides n: a test for 2, 3, 5 and 10, otherwise divide. */
function checkLine(n: number, k: number): string {
  const yes = n % k === 0;
  const pair = yes ? ` So $${n} = ${k} \\times ${n / k}$.` : '';
  if (k === 1) return `$1$: every number is divisible by $1$. So $${n} = 1 \\times ${n}$.`;
  if (k === 2) return `$2$: the last digit is $${n % 10}$, which is ${yes ? 'even' : 'odd'}.${yes ? pair : ' Not a factor.'}`;
  if (k === 3) return `$3$: the digit sum is $${sumTex(n)}$, which is ${yes ? '' : 'not '}in the $3$ times table.${yes ? pair : ' Not a factor.'}`;
  if (k === 5) return `$5$: the last digit is $${n % 10}$${yes ? '' : ', not $0$ or $5$'}.${yes ? pair : ' Not a factor.'}`;
  if (k === 10) return `$10$: the last digit is $${n % 10}$${yes ? '' : ', not $0$'}.${yes ? pair : ' Not a factor.'}`;
  const q = Math.floor(n / k);
  return yes ? `$${k}$: divide: $${n} \\div ${k} = ${q}$ with no remainder.${pair}` : `$${k}$: divide: $${n} \\div ${k} = ${q}$ R $${n % k}$. Not a factor.`;
}

/** The steps that list every factor of n by checking 1, 2, 3, … and pairing. */
function factorSteps(n: number): string[] {
  const lines: string[] = [];
  let k = 1;
  for (; k * k <= n; k++) lines.push(checkLine(n, k));
  const fs = factorsOf(n);
  const stop = k * k === n ? k : k;
  return [
    'Check each number from $1$ up. Use the tests for $2$, $3$, $5$ and $10$. Divide to check the other numbers. Each factor you find comes with a partner.',
    lines.map((l) => `- ${l}`).join('\n'),
    `The next number to check is $${stop}$, but $${stop} \\times ${stop} = ${stop * stop}$ is more than $${n}$. Any factor bigger than this is already a partner in a pair, so stop.${Number.isInteger(Math.sqrt(n)) ? ` ($${Math.sqrt(n)} \\times ${Math.sqrt(n)} = ${n}$: write $${Math.sqrt(n)}$ only once.)` : ''}`,
    `The factors of $${n}$ are ${list(fs.map((f) => `$${f}$`))}.`,
  ];
}

/** Which number is a factor of n? */
function isFactor(rng: Rng): Out {
  const n = rng.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 54, 56, 60, 63, 64, 72, 80, 84, 90]);
  const fs = factorsOf(n).filter((f) => f > 1 && f < n);
  const right = rng.pick(fs);
  const non = rng.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((x) => n % x !== 0));
  const wrong = [...non.slice(0, 2), 2 * n];
  return {
    prompt: `Which number is a **factor** of $${n}$?`,
    parts: [part(mc(rng, `$${right}$`, wrong.map((w) => `$${N(w)}$`)))],
    hints: ['A factor of a number divides it with no remainder.', `Try dividing $${n}$ by each choice. A factor is never bigger than the number itself.`],
    solution: [
      `A factor of $${n}$ divides $${n}$ with remainder $0$.`,
      `$${n} \\div ${right} = ${n / right}$, so $${right}$ is a factor: $${n} = ${right} \\times ${n / right}$.`,
      `${list(non.slice(0, 2).map((w) => `$${w}$`))} leave a remainder, and $${N(2 * n)}$ is bigger than $${n}$, so they are not factors.`,
      `The answer is $${right}$.`,
    ],
  };
}

/** The missing partner in a factor pair. */
function missingPartner(rng: Rng): Out {
  const n = rng.pick([24, 30, 36, 40, 42, 45, 48, 54, 56, 60, 63, 64, 72, 80, 81, 84, 90, 96]);
  const fs = factorsOf(n).filter((f) => f > 1 && f < n);
  const a = rng.pick(fs);
  const b = n / a;
  return {
    prompt: `$${a}$ and another number are a **factor pair** of $${n}$:\n\n$$${a} \\times \\square = ${n}$$\n\nWhat number goes in the box?`,
    parts: [{ answer: { kind: 'numeric', value: b, allowExpression: false } }],
    hints: ['A factor pair is two numbers that multiply to give the number.', `Divide: $${n} \\div ${a}$.`],
    solution: [`Division undoes multiplication: $\\square = ${n} \\div ${a}$.`, `$${n} \\div ${a} = ${b}$. Check: $${a} \\times ${b} = ${n}$.`, `The missing factor is $${b}$, so $${a}$ and $${b}$ are a factor pair of $${n}$.`],
  };
}

const LIST_PROMPT = (n: number) => `List **all** the factors of $${n}$. Separate them with commas.`;

const FACTOR_CTX = [
  (n: number) => `${'NAME'} wants to put $${n}$ chairs in rows for a school assembly. Every row must have the same number of chairs, with no chairs left over. List every possible number of chairs in a row. Separate them with commas.`,
  (n: number) => `A garden club has $${n}$ tulip bulbs. They want to plant them in a rectangle with the same number of bulbs in every row. List every possible number of bulbs in a row. Separate them with commas.`,
  (n: number) => `${'NAME'} has $${n}$ hockey cards. ${'NAME'} wants to put them in piles with the same number of cards in each pile and none left over. List every possible number of cards in a pile. Separate them with commas.`,
  (n: number) => `A teacher has $${n}$ pencils to share equally among some students, with none left over. List every possible number of pencils each student could get. Separate them with commas.`,
];

function listFactors(rng: Rng, d: Difficulty): Out {
  const pool = d === 1 ? [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22] : d === 2 ? [24, 28, 30, 32, 36, 40, 42, 44, 45, 48, 50, 52, 54, 56, 60] : [60, 63, 64, 66, 70, 72, 75, 78, 80, 84, 88, 90, 96, 98, 100];
  const n = rng.pick(pool);
  const fs = factorsOf(n);
  const name = rng.pick(NAMES);
  const prompt = d === 3 ? rng.pick(FACTOR_CTX)(n).replace(/NAME/g, name) : LIST_PROMPT(n);
  return {
    prompt,
    parts: [part({ kind: 'numbers', values: fs }, { label: 'Factors:', placeholder: 'e.g. 1, 2, 4' })],
    hints: [
      d === 3 ? `Every possible answer is a factor of $${n}$. Find all the factors.` : `Start with $1 \\times ${n}$. Then check $2$, $3$, $4$, … in order.`,
      'Use the tests for $2$, $3$ and $5$. Divide to check the others. Each factor has a partner, so write them in pairs.',
    ],
    solution: [...factorSteps(n), ...(d === 3 ? ['Each factor is a possible answer.'] : [])],
  };
}

const factors = skill({
  id: 'm5-factors',
  name: 'Finding factors',
  description: 'Find all the factors of a natural number using factor pairs and the divisibility tests.',
  outcomes: ['N3'],
  lessonId: 'm5-3-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.pick([isFactor, missingPartner, (r: Rng) => listFactors(r, 1)])(rng);
    if (d === 2) return rng.chance(0.75) ? listFactors(rng, 2) : missingPartner(rng);
    return listFactors(rng, 3);
  },
});

export const DIVISIBILITY_SKILLS: SkillDef[] = [divisibility, factors];
