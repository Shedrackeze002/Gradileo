/** More Mathematics Topics, Unit 23: number bases, modular arithmetic and truth tables. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { NAMES } from './common.ts';

type Out = GenOutput;

// ---------------------------------------------------------------------------
// 23.1 Number bases
// ---------------------------------------------------------------------------

const BASE_WORD: Record<number, string> = { 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' };
const inBase = (n: number, b: number) => n.toString(b);
/** A numeral with its base as a subscript: 1011 with a small "two". */
const numeral = (n: number, b: number) => `${inBase(n, b)}_{\\text{${BASE_WORD[b]}}}`;
/** A numeral as the number a learner types (digits only), for bases up to ten. */
const typed = (n: number, b: number) => Number(inBase(n, b));

/** "1 × 2³ + 0 × 2² + 1 × 2 + 1": a numeral expanded in powers of its base. */
function expanded(n: number, b: number): string {
  const digits = inBase(n, b).split('').map(Number);
  const top = digits.length - 1;
  return digits.map((dg, i) => (top - i === 0 ? `${dg}` : top - i === 1 ? `${dg} \\times ${b}` : `${dg} \\times ${b}^{${top - i}}`)).join(' + ');
}

/** The repeated divisions that write n in base b, as solution lines. */
function divisions(n: number, b: number): string[] {
  const lines: string[] = [];
  let q = n;
  while (q > 0) {
    lines.push(`$${q} \\div ${b} = ${Math.floor(q / b)}$ remainder $${q % b}$`);
    q = Math.floor(q / b);
  }
  return lines;
}

function baseConvert(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const b = rng.pick([2, 3, 5, 8]);
    const n = b === 2 ? rng.int(9, 31) : rng.int(b * b + 1, b * b * b - 1);
    return {
      prompt: `Write $${numeral(n, b)}$ as a number in base ten.`,
      parts: [numPart(n, { exact: false })],
      hints: [`From the right, the place values in base ${BASE_WORD[b]} are $1$, $${b}$, $${b * b}$, $${b ** 3}$, and so on.`, 'Multiply each digit by its place value, then add.'],
      solution: [`$${numeral(n, b)} = ${expanded(n, b)}$`, `$= ${n}$`],
    };
  }
  if (d === 2) {
    const b = rng.pick([2, 3, 4, 5, 6, 7, 8]);
    const n = b === 2 ? rng.int(17, 63) : rng.int(b * b + 1, Math.min(400, b ** 4 - 1));
    return {
      prompt: `Write $${n}$ (in base ten) as a number in base ${BASE_WORD[b]}. Type the digits only.`,
      parts: [numPart(typed(n, b), { exact: false })],
      hints: [`Divide by $${b}$ again and again, writing down the remainder each time, until the quotient is $0$.`, 'Read the remainders from the last one to the first.'],
      solution: [...divisions(n, b), `Reading the remainders upwards: $${n} = ${numeral(n, b)}$`],
    };
  }
  const [a, b] = rng.pick([[2, 8], [8, 2], [2, 5], [5, 2], [3, 7], [5, 8], [4, 6], [7, 3]] as Array<[number, number]>);
  const n = rng.int(30, a === 2 ? 127 : 250);
  return {
    prompt: `Write $${numeral(n, a)}$ as a number in base ${BASE_WORD[b]}. Type the digits only.`,
    parts: [numPart(typed(n, b), { exact: false })],
    hints: ['Go through base ten: first write the number in base ten.', `Then divide by $${b}$ again and again, and read the remainders from the last to the first.`],
    solution: [`$${numeral(n, a)} = ${expanded(n, a)} = ${n}$ in base ten.`, ...divisions(n, b), `So $${numeral(n, a)} = ${numeral(n, b)}$`],
  };
}

function baseArithmetic(rng: Rng, d: Difficulty): Out {
  const b = rng.pick(d === 1 ? [2, 3, 5] : [2, 4, 5, 6, 8]);
  const hi = b === 2 ? 31 : b * b * b - 1;
  const lo = b === 2 ? 5 : b + 1;
  if (d === 3) {
    const x = rng.int(lo, b === 2 ? 15 : b * b - 1);
    const y = rng.int(b === 2 ? 3 : b, b === 2 ? 7 : 2 * b + 1);
    return {
      prompt: `Work out $${numeral(x, b)} \\times ${numeral(y, b)}$, giving the answer in base ${BASE_WORD[b]}. Type the digits only.`,
      parts: [numPart(typed(x * y, b), { exact: false })],
      hints: ['One way is to change both numbers to base ten, multiply, and change the product back.', `In base ${BASE_WORD[b]}, every $${b}$ in a column is carried as $1$ to the next column.`],
      solution: [`$${numeral(x, b)} = ${x}$ and $${numeral(y, b)} = ${y}$ in base ten.`, `$${x} \\times ${y} = ${x * y}$`, ...divisions(x * y, b), `So the product is $${numeral(x * y, b)}$`],
    };
  }
  const [p, q] = retry(
    () => [rng.int(lo, hi), rng.int(lo, hi)] as [number, number],
    ([m, n]) => m !== n,
  );
  const [x, y] = d === 2 ? [Math.max(p, q), Math.min(p, q)] : [p, q];
  const r = d === 2 ? x - y : x + y;
  const op = d === 2 ? '-' : '+';
  return {
    prompt: `Work out $${numeral(x, b)} ${op} ${numeral(y, b)}$, giving the answer in base ${BASE_WORD[b]}. Type the digits only.`,
    parts: [numPart(typed(r, b), { exact: false })],
    hints: [
      d === 2 ? `Work in columns from the right. When you borrow from the next column, you borrow $${b}$, not ten.` : `Work in columns from the right. When a column adds up to $${b}$ or more, write the remainder after dividing by $${b}$ and carry the quotient.`,
      'You can check by changing both numbers to base ten.',
    ],
    solution: [`Check through base ten: $${numeral(x, b)} = ${x}$ and $${numeral(y, b)} = ${y}$.`, `$${x} ${op} ${y} = ${r}$`, ...divisions(r, b), `So the answer is $${numeral(r, b)}$`],
  };
}

// ---------------------------------------------------------------------------
// 23.2 Modular arithmetic
// ---------------------------------------------------------------------------

const mod = (a: number, m: number) => ((a % m) + m) % m;
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function modReduce(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const m = rng.int(3, 9);
    const a = rng.int(m + 2, 12 * m);
    const q = Math.floor(a / m);
    return {
      prompt: `Find the value of $${a} \\pmod{${m}}$: the remainder when $${a}$ is divided by $${m}$.`,
      parts: [numPart(mod(a, m), { exact: false })],
      hints: [`Find the largest multiple of $${m}$ that is not more than $${a}$.`, 'Subtract it. What is left is the remainder.'],
      solution: [`$${a} = ${q} \\times ${m} + ${mod(a, m)}$`, `So $${a} \\equiv ${mod(a, m)} \\pmod{${m}}$`],
    };
  }
  if (d === 2) {
    const m = rng.int(3, 9);
    const a = -rng.int(2, 6 * m);
    const k = Math.ceil(-a / m);
    return {
      prompt: `Find the value of $${a} \\pmod{${m}}$, as a number from $0$ to $${m - 1}$.`,
      parts: [numPart(mod(a, m), { exact: false })],
      hints: [`Adding $${m}$ to a number does not change its value modulo $${m}$.`, `Keep adding $${m}$ until the result is from $0$ to $${m - 1}$.`],
      solution: [`Add $${k} \\times ${m} = ${k * m}$: $${a} + ${k * m} = ${mod(a, m)}$`, `So $${a} \\equiv ${mod(a, m)} \\pmod{${m}}$`],
    };
  }
  if (rng.chance(0.5)) {
    const today = rng.int(0, 6);
    const n = rng.int(30, 400);
    const ans = mod(today + n, 7);
    return {
      prompt: `Today is ${DAYS[today]}. Which day of the week will it be $${n}$ days from today?`,
      parts: [{ answer: mc(rng, DAYS[ans]!, DAYS.filter((_, i) => i !== ans), { max: 5 }) }],
      hints: ['The days of the week repeat every $7$ days, so work modulo $7$.', `Find the remainder when $${n}$ is divided by $7$, and count that many days on from ${DAYS[today]}.`],
      solution: [`$${n} = ${Math.floor(n / 7)} \\times 7 + ${n % 7}$, so $${n} \\equiv ${n % 7} \\pmod 7$.`, `${n % 7 === 0 ? 'A whole number of weeks passes' : `Count $${n % 7}$ day${n % 7 === 1 ? '' : 's'} on from ${DAYS[today]}`}: it will be ${DAYS[ans]}.`],
    };
  }
  const start = rng.int(1, 12);
  const n = rng.int(20, 200);
  const ans = mod(start + n - 1, 12) + 1;
  const name = rng.pick(NAMES);
  return {
    prompt: `The hour hand of ${name}’s clock points at $${start}$. Which number will it point at $${n}$ hours later?`,
    parts: [numPart(ans, { exact: false })],
    hints: ['The hour hand comes back to the same number every $12$ hours, so work modulo $12$.', `Find the remainder when $${start} + ${n}$ is divided by $12$. A remainder of $0$ means the hand points at $12$.`],
    solution: [`$${start} + ${n} = ${start + n}$`, `$${start + n} = ${Math.floor((start + n) / 12)} \\times 12 + ${(start + n) % 12}$`, `The hand points at $${ans}$.`],
  };
}

function modOperations(rng: Rng, d: Difficulty): Out {
  const m = rng.pick(d === 3 ? [5, 7, 11] : [4, 5, 6, 7, 8, 9]);
  if (d === 3) {
    // Solve ax ≡ b (mod m) for a prime modulus by trying each value.
    const a = rng.int(2, m - 1);
    const x = rng.int(1, m - 1);
    const b = mod(a * x, m);
    const tries = Array.from({ length: m }, (_, i) => `${a} \\times ${i} = ${a * i} \\equiv ${mod(a * i, m)}`);
    return {
      prompt: `Find the value of $x$ from $0$ to $${m - 1}$ for which $${a}x \\equiv ${b} \\pmod{${m}}$.`,
      parts: [numPart(x, { label: '$x$ =', exact: false })],
      hints: [`There are only $${m}$ values to try: $0, 1, \\ldots, ${m - 1}$.`, `Work out $${a}x$ for each one and reduce it modulo $${m}$.`],
      solution: [`Modulo $${m}$: $${tries.slice(0, Math.max(x + 1, 3)).join(',\\quad ')}$`, `So $x = ${x}$`],
    };
  }
  const a = rng.int(m + 1, 6 * m);
  const b = rng.int(m + 1, 6 * m);
  const times = d === 2;
  const raw = times ? a * b : a + b;
  const ra = mod(a, m);
  const rb = mod(b, m);
  const small = times ? ra * rb : ra + rb;
  const sym = times ? '\\otimes' : '\\oplus';
  const op = times ? '\\times' : '+';
  return {
    prompt: `Work out $${a} ${sym} ${b}$ in arithmetic modulo $${m}$, as a number from $0$ to $${m - 1}$.`,
    parts: [numPart(mod(raw, m), { exact: false })],
    hints: [`$${sym}$ means ${times ? 'multiply' : 'add'}, then take the remainder after dividing by $${m}$.`, `It is easier to reduce each number modulo $${m}$ first: $${a} \\equiv ${ra}$ and $${b} \\equiv ${rb}$.`],
    solution: [`$${a} \\equiv ${ra}$ and $${b} \\equiv ${rb} \\pmod{${m}}$`, `$${ra} ${op} ${rb} = ${small}${small >= m ? ` \\equiv ${mod(small, m)}` : ''} \\pmod{${m}}$`, `Check: $${a} ${op} ${b} = ${raw} = ${Math.floor(raw / m)} \\times ${m} + ${mod(raw, m)}$`],
  };
}

// ---------------------------------------------------------------------------
// 23.3 Truth tables
// ---------------------------------------------------------------------------

type Op = 'and' | 'or' | 'implies' | 'iff';
const OP_TEX: Record<Op, string> = { and: '\\wedge', or: '\\vee', implies: '\\Rightarrow', iff: '\\Leftrightarrow' };
const OP_RULE: Record<Op, string> = {
  and: '$p \\wedge q$ ("$p$ and $q$") is true only when both parts are true.',
  or: '$p \\vee q$ ("$p$ or $q$") is false only when both parts are false.',
  implies: '$p \\Rightarrow q$ ("if $p$ then $q$") is false only when $p$ is true and $q$ is false.',
  iff: '$p \\Leftrightarrow q$ ("$p$ if and only if $q$") is true when both parts have the same truth value.',
};
const apply = (op: Op, a: boolean, b: boolean) => (op === 'and' ? a && b : op === 'or' ? a || b : op === 'implies' ? !a || b : a === b);
const T = (v: boolean) => (v ? 'T' : 'F');
const word = (v: boolean) => (v ? 'true' : 'false');

interface Compound {
  tex: string;
  value: (p: boolean, q: boolean) => boolean;
  /** How the value is built up, for the solution. */
  steps: (p: boolean, q: boolean) => string[];
  ops: Op[];
}

function compound(rng: Rng, d: Difficulty): Compound {
  const op = rng.pick<Op>(['and', 'or', 'implies', 'iff']);
  const np = d > 1 && rng.chance(0.6);
  const nq = d > 1 && rng.chance(np ? 0.3 : 0.6);
  const left = np ? '\\neg p' : 'p';
  const right = nq ? '\\neg q' : 'q';
  const inner: Compound = {
    tex: `${left} ${OP_TEX[op]} ${right}`,
    value: (p, q) => apply(op, np ? !p : p, nq ? !q : q),
    steps: (p, q) => [
      ...(np ? [`$\\neg p$ is ${word(!p)}.`] : []),
      ...(nq ? [`$\\neg q$ is ${word(!q)}.`] : []),
      `$${left} ${OP_TEX[op]} ${right}$ joins ${word(np ? !p : p)} and ${word(nq ? !q : q)}, so it is ${word(apply(op, np ? !p : p, nq ? !q : q))}.`,
    ],
    ops: [op],
  };
  if (d < 3) return inner;
  // A hard statement wraps the first in a negation, or joins it to p or q again.
  if (rng.chance(0.4)) {
    return { tex: `\\neg(${inner.tex})`, value: (p, q) => !inner.value(p, q), steps: (p, q) => [...inner.steps(p, q), `Its negation is ${word(!inner.value(p, q))}.`], ops: inner.ops };
  }
  const op2 = rng.pick<Op>(['implies', 'or', 'and']);
  const last = rng.pick(['p', 'q'] as const);
  const pickLast = (p: boolean, q: boolean) => (last === 'p' ? p : q);
  const joined: Compound = {
    tex: `(${inner.tex}) ${OP_TEX[op2]} ${last}`,
    value: (p, q) => apply(op2, inner.value(p, q), pickLast(p, q)),
    steps: (p, q) => [...inner.steps(p, q), `Then $(${inner.tex}) ${OP_TEX[op2]} ${last}$ joins ${word(inner.value(p, q))} and ${word(pickLast(p, q))}, so it is ${word(apply(op2, inner.value(p, q), pickLast(p, q)))}.`],
    ops: [op, op2],
  };
  if (rng.chance(0.7)) return joined;
  return { tex: `\\neg[${joined.tex}]`, value: (p, q) => !joined.value(p, q), steps: (p, q) => [...joined.steps(p, q), `Its negation is ${word(!joined.value(p, q))}.`], ops: joined.ops };
}

const ROWS: Array<[boolean, boolean]> = [[true, true], [true, false], [false, true], [false, false]];
const rules = (c: Compound) => [...new Set(c.ops)].map((o) => OP_RULE[o]);

function truthValue(rng: Rng, d: Difficulty): Out {
  const c = compound(rng, d);
  const [p, q] = rng.pick(ROWS);
  const v = c.value(p, q);
  return {
    prompt: `$p$ is ${word(p)} and $q$ is ${word(q)}. Is the statement $${c.tex}$ true or false?`,
    parts: [{ answer: mc(rng, v ? 'True' : 'False', [v ? 'False' : 'True'], { keepOrder: true }) }],
    hints: [rules(c)[0]!, c.tex.includes('\\neg') ? '$\\neg p$ ("not $p$") has the opposite truth value to $p$. Work out the negations first.' : 'Put the two truth values into the rule.'],
    solution: [...c.steps(p, q), `The statement is ${word(v)}.`],
  };
}

function truthTable(rng: Rng, d: Difficulty): Out {
  const kindOf = (x: Compound) => (ROWS.every(([p, q]) => x.value(p, q)) ? 'tautology' : ROWS.every(([p, q]) => !x.value(p, q)) ? 'contradiction' : 'neither');
  // A hard question is as likely to be a tautology as neither, with a contradiction now and then.
  const target = d === 3 ? rng.pick(['tautology', 'tautology', 'contradiction', 'neither', 'neither']) : 'neither';
  const c = retry(() => compound(rng, d), (x) => kindOf(x) === target, 400);
  const column = ROWS.map(([p, q]) => c.value(p, q));
  const show = (col: boolean[]) => col.map(T).join(', ');
  const table = `Row by row, for $(p, q)$ = (T, T), (T, F), (F, T), (F, F), the statement is ${column.map(word).join(', ')}.`;
  if (d === 3) {
    const all = column.every(Boolean);
    const none = column.every((v) => !v);
    const kind = all ? 'A tautology: it is true in every row.' : none ? 'A contradiction: it is false in every row.' : 'Neither: it is true in some rows and false in others.';
    return {
      prompt: `Complete a truth table for $${c.tex}$. Is the statement a tautology, a contradiction, or neither?`,
      parts: [{ answer: mc(rng, kind, ['A tautology: it is true in every row.', 'A contradiction: it is false in every row.', 'Neither: it is true in some rows and false in others.'].filter((k) => k !== kind), { keepOrder: true }) }],
      hints: ['A table for two statements has four rows: TT, TF, FT and FF.', 'A tautology is true in every row, and a contradiction is false in every row.'],
      solution: [...rules(c), table, `The last column is ${show(column)}. ${kind}`],
    };
  }
  const wrong = [column.map((v) => !v), [column[0]!, column[2]!, column[1]!, column[3]!], [true, false, false, false], [true, true, true, false], [true, false, true, true], [true, false, false, true]]
    .map(show)
    .filter((s) => s !== show(column));
  return {
    prompt: `The rows of a truth table are in the order $(p, q)$ = (T, T), (T, F), (F, T), (F, F). Which is the column for $${c.tex}$?`,
    parts: [{ answer: mc(rng, show(column), wrong, { max: 4 }) }],
    hints: [rules(c)[0]!, 'Work out the statement one row at a time.'],
    solution: [...rules(c), table, `The column is ${show(column)}.`],
  };
}

export const DISCRETE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-base-convert', name: 'Converting between number bases', description: 'Change numbers between base ten and other bases, and from one base to another', outcomes: ['DM1'], lessonId: 'mx-23-1', gen: baseConvert }),
  skill({ id: 'mx-base-arithmetic', name: 'Calculating in other bases', description: 'Add, subtract and multiply numbers written in bases other than ten', outcomes: ['DM1'], lessonId: 'mx-23-1', gen: baseArithmetic }),
  skill({ id: 'mx-mod-reduce', name: 'Reducing modulo m', description: 'Find the value of a number modulo m, and use it for days and clocks', outcomes: ['DM2'], lessonId: 'mx-23-2', gen: modReduce }),
  skill({ id: 'mx-mod-operations', name: 'Adding and multiplying modulo m', description: 'Add and multiply in modular arithmetic, and solve simple congruences', outcomes: ['DM2'], lessonId: 'mx-23-2', gen: modOperations }),
  skill({ id: 'mx-truth-value', name: 'Truth values of compound statements', description: 'Find the truth value of statements joined by not, and, or, if–then and if and only if', outcomes: ['DM3'], lessonId: 'mx-23-3', gen: truthValue }),
  skill({ id: 'mx-truth-table', name: 'Truth tables', description: 'Complete truth tables, and recognize tautologies and contradictions', outcomes: ['DM3'], lessonId: 'mx-23-3', gen: truthTable }),
];
