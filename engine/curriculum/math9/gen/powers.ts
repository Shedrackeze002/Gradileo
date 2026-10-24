/** Math 9 Unit 2 — Powers and Exponent Laws (N1, N2, N4). */
import { fixedChoice, mc, multi, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtGroupTex, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Mathieu', 'Leila',
];

const T = '\\times';
const DV = '\\div';
/** A whole number inside maths, with commas from 5 digits up: 15{,}625. */
const N = (x: number) => fmtGroupTex(x);
/** A base inside maths: a negative base goes in brackets. */
const bs = (b: number) => (b < 0 ? `(${b})` : `${b}`);
/** The power b^n with a negative base in brackets. */
const pw = (b: number, n: number | string) => `${bs(b)}^{${n}}`;
/** b × b × ... with n factors. */
const rep = (b: number, n: number) => Array.from({ length: n }, () => bs(b)).join(` ${T} `);
/** A whole-number answer that must be worked out (no typing 2^5). */
const val = (v: number, label?: string, suffix?: string): Part => numPart(v, { exact: false, label, suffix });
/** A signed number after an operator: 5, (-3). */
const sp = (x: number) => (x < 0 ? `(${N(x)})` : N(x));
/** "+ 5" or "- 5" for writing an expression. */
const pm = (x: number) => (x < 0 ? `- ${N(-x)}` : `+ ${N(x)}`);
const ipow = (b: number, n: number) => b ** n;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Partial products for b^n: "$3 × 3 = 9$, $9 × 3 = 27$". */
function chain(b: number, n: number): string {
  const out: string[] = [];
  let acc = b;
  for (let i = 2; i <= n; i++) {
    const next = acc * b;
    out.push(`$${sp(acc)} ${T} ${bs(b)} = ${N(next)}$`);
    acc = next;
  }
  return out.join(', ');
}

/** Powers small enough to evaluate by hand: |b|^n <= about 1000. */
const MAX_EXP: Record<number, number> = { 2: 9, 3: 6, 4: 5, 5: 4, 6: 3, 7: 3, 8: 3, 9: 3, 10: 5 };
function smallPower(rng: Rng, opts: { bases?: number[]; minExp?: number; maxExp?: number } = {}): [number, number] {
  const bases = opts.bases ?? [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pairs: Array<[number, number]> = [];
  for (const b of bases) for (let n = opts.minExp ?? 2; n <= Math.min(MAX_EXP[b] ?? 2, opts.maxExp ?? 9); n++) pairs.push([b, n]);
  return rng.pick(pairs);
}

const BASE_HINT = 'The **base** is the number that is multiplied. The **exponent** tells how many times the base is a factor.';
const BRACKET_HINT = 'Find the base first. In $(-3)^{4}$ the brackets make $-3$ the base. In $-3^{4}$ the base is $3$, and the minus sign is applied after the power.';
const SIGN_RULE = 'A product of negative factors is positive when there is an even number of them and negative when there is an odd number.';

// ---------------------------------------------------------------------------
// 2.1 Using exponents to describe numbers
// ---------------------------------------------------------------------------

function repeatedToPower(rng: Rng, allowNeg: boolean): Out {
  const neg = allowNeg && rng.chance(0.35);
  const b = (neg ? -1 : 1) * rng.int(2, 9);
  const n = rng.int(3, 7);
  return {
    prompt: `Write the product as a power. Give the base and the exponent.\n\n$$${rep(b, n)}$$`,
    parts: [val(b, 'Base:'), val(n, 'Exponent:')],
    hints: [BASE_HINT, `Count how many times $${b}$ appears as a factor.${neg ? ' The negative sign is part of each factor, so it is part of the base.' : ''}`],
    solution: [
      `The same factor, $${b}$, is multiplied over and over, so the base is $${b}$.${neg ? ' Brackets show that the base is negative.' : ''}`,
      `There are $${n}$ factors, so the exponent is $${n}$.`,
      `$${rep(b, n)} = ${pw(b, n)}$`,
      `The base is $${b}$ and the exponent is $${n}$.`,
    ],
  };
}

function evaluatePositive(rng: Rng): Out {
  const [b, n] = smallPower(rng, { maxExp: 6 });
  const v = ipow(b, n);
  return {
    prompt: `Evaluate $${pw(b, n)}$.`,
    parts: [val(v)],
    hints: [BASE_HINT, `Write $${pw(b, n)}$ as ${n} factors of $${b}$ and multiply from left to right.`],
    solution: [
      `$${pw(b, n)} = ${rep(b, n)}$`,
      b === 10 ? `Each factor of $10$ adds one zero: $${pw(10, n)}$ is $1$ followed by $${n}$ zeros.` : `Multiply step by step: ${chain(b, n)}.`,
      `$${pw(b, n)} = ${N(v)}$`,
    ],
  };
}

function expandChoice(rng: Rng): Out {
  const neg = rng.chance(0.4);
  const a = rng.int(2, 7);
  const b = neg ? -a : a;
  const n = retry(() => rng.int(3, 6), (x) => x !== a);
  const sum = Array.from({ length: n }, () => bs(b)).join(' + ');
  const ds = [
    `$${bs(b)} ${T} ${n}$`,
    ...(neg && n % 2 === 0 ? [`$-(${rep(a, n)})$`] : []),
    `$${rep(n, a)}$`,
    `$${sum}$`,
  ];
  return {
    prompt: `Which product is the same as $${pw(b, n)}$?`,
    parts: [{ answer: mc(rng, `$${rep(b, n)}$`, ds) }],
    hints: [BASE_HINT, `The base is $${b}$ and the exponent is $${n}$.`],
    solution: [
      `In $${pw(b, n)}$ the base is $${b}$ and the exponent is $${n}$.`,
      `So $${b}$ is a factor $${n}$ times.`,
      `$${pw(b, n)} = ${rep(b, n)}$`,
    ],
  };
}

type SignForm = 'paren' | 'neg' | 'negparen';

/** LaTeX and value of a signed power form with b > 0. */
function signForm(form: SignForm, b: number, n: number): { tex: string; v: number } {
  if (form === 'paren') return { tex: pw(-b, n), v: ipow(-b, n) };
  if (form === 'neg') return { tex: `-${pw(b, n)}`, v: -ipow(b, n) };
  return { tex: `-${pw(-b, n)}`, v: -ipow(-b, n) };
}

/** Solution steps for evaluating a signed power form. */
function signSteps(form: SignForm, b: number, n: number): string[] {
  const { tex, v } = signForm(form, b, n);
  const inner = ipow(-b, n);
  if (form === 'paren') {
    return [
      `The brackets make $-${b}$ the base: $${tex} = ${rep(-b, n)}$.`,
      `There are $${n}$ negative factors. ${n % 2 === 0 ? `$${n}$ is even, so the product is positive.` : `$${n}$ is odd, so the product is negative.`}`,
      `$${pw(b, n)} = ${N(ipow(b, n))}$, so $${tex} = ${N(v)}$.`,
    ];
  }
  if (form === 'neg') {
    return [
      `There are no brackets, so the base is $${b}$, not $-${b}$. The power is worked out first, then the minus sign is applied.`,
      `$${tex} = -(${rep(b, n)})$`,
      `$= -(${N(ipow(b, n))})$, so $${tex} = ${N(v)}$.`,
    ];
  }
  return [
    `Work out the power first. The base is $-${b}$: $${pw(-b, n)} = ${rep(-b, n)} = ${N(inner)}$ (${n % 2 === 0 ? 'an even' : 'an odd'} number of negative factors).`,
    `The minus sign in front means "the opposite of": $-(${N(inner)}) = ${N(v)}$.`,
    `$${tex} = ${N(v)}$`,
  ];
}

function evaluateSigned(rng: Rng): Out {
  const form = rng.weighted([['paren', 4], ['neg', 4], ['negparen', 2]] as const);
  const [b, n] = smallPower(rng, { bases: [2, 3, 4, 5, 6, 7, 8, 9], maxExp: 6 });
  const { tex, v } = signForm(form, b, n);
  return {
    prompt: `Evaluate $${tex}$.`,
    parts: [val(v)],
    hints: [BRACKET_HINT, SIGN_RULE],
    solution: signSteps(form, b, n),
  };
}

function identifyBase(rng: Rng): Out {
  const form = rng.pick(['paren', 'neg', 'pos'] as const);
  const a = rng.int(2, 12);
  const n = rng.int(2, 9);
  const tex = form === 'paren' ? pw(-a, n) : form === 'neg' ? `-${pw(a, n)}` : pw(a, n);
  const base = form === 'paren' ? -a : a;
  const why =
    form === 'paren'
      ? `The brackets hold $-${a}$, and the exponent is outside the brackets, so the base is $-${a}$.`
      : form === 'neg'
        ? `There are no brackets. The exponent is attached to $${a}$ only, so the base is $${a}$. The minus sign means the opposite of $${pw(a, n)}$.`
        : `The exponent is attached to $${a}$, so the base is $${a}$.`;
  return {
    prompt: `What are the base and the exponent of $${tex}$?`,
    parts: [val(base, 'Base:'), val(n, 'Exponent:')],
    hints: [BASE_HINT, 'Look for brackets. A minus sign is part of the base only when it is inside brackets with the number.'],
    solution: [
      why,
      `The exponent is the small raised number, $${n}$.`,
      form === 'neg' ? `$${tex} = -(${rep(a, Math.min(n, 3))}${n > 3 ? ` ${T} \\dots` : ''})$` : `$${tex} = ${rep(base, Math.min(n, 3))}${n > 3 ? ` ${T} \\dots` : ''}$ with $${n}$ factors.`,
      `The base is $${base}$ and the exponent is $${n}$.`,
    ],
  };
}

function valueChoice(rng: Rng): Out {
  const form = rng.pick(['paren', 'neg', 'paren'] as const);
  const [b, n] = smallPower(rng, { bases: [2, 3, 4, 5], maxExp: 5 });
  const { tex, v } = signForm(form, b, n);
  const ds = [`$${N(-v)}$`, `$${N(-b * n)}$`, `$${N(b * n)}$`, `$${N(-ipow(b, n + 1))}$`];
  return {
    prompt: `What is the value of $${tex}$?`,
    parts: [{ answer: mc(rng, `$${N(v)}$`, ds) }],
    hints: [BRACKET_HINT, 'An exponent is not a multiplier: $2^{5}$ means $2 \\times 2 \\times 2 \\times 2 \\times 2$, not $2 \\times 5$.'],
    solution: signSteps(form, b, n),
  };
}

function threeForms(rng: Rng): Out {
  const pairs: Array<[number, number]> = [];
  for (const [b, max] of [[2, 8], [3, 5], [4, 3], [5, 3], [6, 2], [7, 2], [8, 2], [9, 2], [10, 4]] as Array<[number, number]>) for (let n = 2; n <= max; n++) pairs.push([b, n]);
  const [b, n] = rng.pick(pairs);
  const order = rng.chance(0.5) ? [pw(-b, n), `-${pw(b, n)}`, pw(-b, n + 1)] : [`-${pw(b, n)}`, pw(-b, n), pw(-b, n + 1)];
  const value = (t: string) => (t === pw(-b, n) ? ipow(-b, n) : t === pw(-b, n + 1) ? ipow(-b, n + 1) : -ipow(b, n));
  return {
    prompt: 'Evaluate each power. Pay attention to the brackets.',
    parts: order.map((t) => val(value(t), `$${t} =$`)),
    hints: [BRACKET_HINT, SIGN_RULE],
    solution: [
      `$${pw(-b, n)} = ${rep(-b, n)} = ${N(ipow(-b, n))}$ (${n} negative factors, ${n % 2 === 0 ? 'even' : 'odd'})`,
      `$-${pw(b, n)} = -(${rep(b, n)}) = ${N(-ipow(b, n))}$ (the base is $${b}$)`,
      `$${pw(-b, n + 1)} = ${N(ipow(-b, n + 1))}$ (${n + 1} negative factors, ${(n + 1) % 2 === 0 ? 'even' : 'odd'})`,
      `The answers are ${order.map((t) => `$${t} = ${N(value(t))}$`).join(', ')}.`,
    ],
  };
}

function selectNegative(rng: Rng): Out {
  const b = rng.int(2, 9);
  const even = () => 2 * rng.int(3, 8);
  const odd = () => 2 * rng.int(3, 7) + 1;
  const e1 = even();
  const o1 = odd();
  const e2 = retry(even, (x) => x !== e1);
  const o2 = retry(odd, (x) => x !== o1);
  const e3 = retry(even, (x) => x !== e1 && x !== e2);
  const opts = [
    { md: `$${pw(-b, e1)}$`, correct: false, why: `$${pw(-b, e1)}$: base $-${b}$, even exponent, so positive.` },
    { md: `$${pw(-b, o1)}$`, correct: true, why: `$${pw(-b, o1)}$: base $-${b}$, odd exponent, so negative.` },
    { md: `$-${pw(b, e2)}$`, correct: true, why: `$-${pw(b, e2)}$: the base is $${b}$, so the power is positive and the minus sign in front makes it negative.` },
    { md: `$-${pw(-b, o2)}$`, correct: false, why: `$-${pw(-b, o2)}$: $${pw(-b, o2)}$ is negative (odd exponent), and its opposite is positive.` },
  ];
  if (rng.chance(0.5)) opts.push({ md: `$-${pw(-b, e3)}$`, correct: true, why: `$-${pw(-b, e3)}$: $${pw(-b, e3)}$ is positive (even exponent), and its opposite is negative.` });
  const shuffled = rng.shuffle(opts);
  return {
    prompt: 'Which of these powers have a **negative** value? Select all that apply. You do not need to evaluate them.',
    parts: [{ answer: multi(rng, shuffled, true) }],
    hints: [BRACKET_HINT, `${SIGN_RULE} A minus sign outside the power changes the sign at the end.`],
    solution: [...shuffled.map((o) => o.why), `The negative ones are ${shuffled.filter((o) => o.correct).map((o) => o.md).join(', ')}.`],
  };
}

function whoIsRight(rng: Rng): Out {
  const [p, q] = rng.sample(NAMES, 2);
  const kind = rng.pick(['noBrackets', 'oddBrackets'] as const);
  if (kind === 'noBrackets') {
    const b = rng.int(2, 9);
    const n = b <= 5 ? rng.pick([2, 4]) : 2;
    const v = -ipow(b, n);
    const wrongFirst = rng.chance(0.5);
    const [wrongName, rightName] = wrongFirst ? [p, q] : [q, p];
    const claims = wrongFirst ? `${p} says $-${pw(b, n)} = ${N(-v)}$. ${q} says $-${pw(b, n)} = ${N(v)}$.` : `${p} says $-${pw(b, n)} = ${N(v)}$. ${q} says $-${pw(b, n)} = ${N(-v)}$.`;
    return {
      prompt: `${claims} Who is correct?`,
      parts: [{
        answer: mc(rng, `${rightName}, because the base is $${b}$: $-${pw(b, n)} = -(${rep(b, n)}) = ${N(v)}$`, [
          `${wrongName}, because a negative number to an even exponent is positive`,
          `Both of them, because $-${pw(b, n)}$ and $${pw(-b, n)}$ mean the same thing`,
          `Neither of them, because $-${pw(b, n)} = ${N(-b * n)}$`,
        ]),
      }],
      hints: [BRACKET_HINT, `Is there a bracket around $-${b}$?`],
      solution: [
        `There are no brackets, so the base is $${b}$. The minus sign is applied after the power.`,
        `$-${pw(b, n)} = -(${rep(b, n)}) = -(${N(-v)}) = ${N(v)}$`,
        `${wrongName} worked out $${pw(-b, n)}$, which is a different power: $${pw(-b, n)} = ${N(-v)}$.`,
        `${rightName} is correct: $-${pw(b, n)} = ${N(v)}$.`,
      ],
    };
  }
  const b = rng.pick([2, 3]);
  const n = b === 2 ? rng.pick([3, 5, 7]) : rng.pick([3, 5]);
  const v = ipow(-b, n);
  const wrongFirst = rng.chance(0.5);
  const [wrongName, rightName] = wrongFirst ? [p, q] : [q, p];
  const claims = wrongFirst ? `${p} says $${pw(-b, n)} = ${N(-v)}$. ${q} says $${pw(-b, n)} = ${N(v)}$.` : `${p} says $${pw(-b, n)} = ${N(v)}$. ${q} says $${pw(-b, n)} = ${N(-v)}$.`;
  return {
    prompt: `${claims} Who is correct?`,
    parts: [{
      answer: mc(rng, `${rightName}, because there are $${n}$ negative factors, an odd number, so the product is negative`, [
        `${wrongName}, because the negative signs cancel out`,
        `Both of them, because the sign does not matter for a power`,
        `Neither of them, because $${pw(-b, n)} = ${N(-b * n)}$`,
      ]),
    }],
    hints: [SIGN_RULE, `Write $${pw(-b, n)}$ as repeated multiplication and count the negative factors.`],
    solution: [
      `$${pw(-b, n)} = ${rep(-b, n)}$`,
      `The negative signs cancel in pairs. With $${n}$ factors there ${n === 3 ? 'is $1$ pair' : `are $${(n - 1) / 2}$ pairs`} and one negative factor left over.`,
      `So $${pw(-b, n)} = ${N(v)}$.`,
      `${rightName} is correct.`,
    ],
  };
}

const powersEvaluate = skill({
  id: 'm9-powers-evaluate',
  name: 'Powers and their values',
  description: 'Write repeated multiplication as a power and evaluate powers with positive and negative bases, telling apart forms such as (−2)⁴ and −2⁴.',
  outcomes: ['N1'],
  lessonId: 'm9-2-1',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) {
      const kind = rng.weighted([['repeated', 4], ['evaluate', 4], ['expand', 2]] as const);
      if (kind === 'repeated') return repeatedToPower(rng, true);
      if (kind === 'evaluate') return evaluatePositive(rng);
      return expandChoice(rng);
    }
    if (d === 2) {
      const kind = rng.weighted([['signed', 5], ['identify', 2], ['choice', 3]] as const);
      if (kind === 'signed') return evaluateSigned(rng);
      if (kind === 'identify') return identifyBase(rng);
      return valueChoice(rng);
    }
    const kind = rng.weighted([['three', 4], ['select', 3], ['who', 3]] as const);
    if (kind === 'three') return threeForms(rng);
    if (kind === 'select') return selectNegative(rng);
    return whoIsRight(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Exponent laws
// ---------------------------------------------------------------------------

const LAWS_HINT = 'Same base: to multiply, **add** the exponents; to divide, **subtract** them. For a power of a power, **multiply** the exponents.';
const SQ = '\\square';
/** "Write as a single power" prompt with the equation on its own line. */
const singlePower = (eq: string) => `Write as a single power. Enter the missing exponent.\n\n$$${eq}$$`;
const expPart = (v: number, label = 'Exponent:') => val(v, label);
/** A base for exponent-law questions: 2 to 9, sometimes negative. */
const lawBase = (rng: Rng, negChance = 0.25) => (rng.chance(negChance) ? -1 : 1) * rng.int(2, 9);

function productLaw(rng: Rng, neg: number): Out {
  const a = lawBase(rng, neg);
  const m = rng.int(2, 9);
  const n = rng.int(2, 9);
  return {
    prompt: singlePower(`${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, SQ)}`),
    parts: [expPart(m + n)],
    hints: ['The bases are the same, so keep the base.', `$${pw(a, m)}$ has ${m} factors of $${a}$ and $${pw(a, n)}$ has ${n} more. Add the exponents.`],
    solution: [
      `The bases are the same ($${a}$), so use the product law: keep the base and **add** the exponents.`,
      `$${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, `${m} + ${n}`)} = ${pw(a, m + n)}$`,
      `Check: ${m} factors of $${a}$ times ${n} more factors of $${a}$ is ${m + n} factors.`,
      `The exponent is $${m + n}$.`,
    ],
  };
}

function quotientLaw(rng: Rng, neg: number): Out {
  const a = lawBase(rng, neg);
  const m = rng.int(6, 12);
  const n = rng.int(2, m - 2);
  const frac = rng.chance(0.5);
  const lhs = frac ? `\\dfrac{${pw(a, m)}}{${pw(a, n)}}` : `${pw(a, m)} ${DV} ${pw(a, n)}`;
  return {
    prompt: singlePower(`${lhs} = ${pw(a, SQ)}`),
    parts: [expPart(m - n)],
    hints: ['The bases are the same, so keep the base.', `Dividing divides out $${n}$ of the $${m}$ factors. Subtract the exponents.`],
    solution: [
      `The bases are the same ($${a}$), so use the quotient law: keep the base and **subtract** the exponents.`,
      `$${lhs} = ${pw(a, `${m} - ${n}`)} = ${pw(a, m - n)}$`,
      `Check: ${n} of the ${m} factors divide out, leaving ${m - n}.`,
      `The exponent is $${m - n}$.`,
    ],
  };
}

function zeroPattern(rng: Rng): Out {
  const b = rng.pick([2, 3, 4, 5, 10, -2, -3]);
  const top = Math.abs(b) === 10 ? 4 : Math.abs(b) >= 4 ? 4 : 5;
  const rows: string[][] = [];
  for (let e = top; e >= 0; e--) rows.push([`$${pw(b, e)}$`, e === 0 ? '?' : `${fmt(ipow(b, e))}`]);
  const divs: string[] = [];
  for (let e = top; e >= 1; e--) divs.push(`$${N(ipow(b, e))} ${DV} ${bs(b)} = ${N(ipow(b, e - 1))}$`);
  const figure: Figure = { type: 'table', headers: ['Power', 'Value'], rows };
  return {
    prompt: `Look at the pattern in the table. Notice how the value changes each time the exponent goes down by $1$. Continue the pattern to find the value of $${pw(b, 0)}$.`,
    figure,
    parts: [val(1, `$${pw(b, 0)} =$`)],
    hints: [`Going down the table, each value is the one above it divided by $${b}$.`, `Divide the value of $${pw(b, 1)}$ by $${b}$.`],
    solution: [
      `Going down, each value is divided by $${b}$: ${divs.slice(0, -1).join(', ')}.`,
      `Continue the pattern one more step: ${divs[divs.length - 1]}.`,
      `So $${pw(b, 0)} = 1$. Any power with a non-zero base and exponent $0$ equals $1$.`,
    ],
  };
}

function zeroEvaluate(rng: Rng, hard: boolean): Out {
  if (!hard) {
    const a = rng.chance(0.3) ? -rng.int(2, 30) : rng.pick([rng.int(2, 15), rng.int(16, 99), rng.int(100, 999)]);
    return {
      prompt: `Evaluate $${pw(a, 0)}$.`,
      parts: [val(1)],
      hints: ['Think about the pattern $2^{3} = 8$, $2^{2} = 4$, $2^{1} = 2$, $2^{0} = ?$', 'Any non-zero base with exponent $0$ has the value $1$.'],
      solution: [`The exponent is $0$ and the base, $${a}$, is not $0$.`, `A power with exponent zero equals $1$.`, `$${pw(a, 0)} = 1$`],
    };
  }
  const a = rng.int(2, 12);
  const c = rng.int(2, 9);
  const forms: Array<{ tex: string; v: number; steps: string[] }> = [
    { tex: pw(-a, 0), v: 1, steps: [`The brackets make $-${a}$ the base.`, `Any non-zero base to the exponent $0$ is $1$: $${pw(-a, 0)} = 1$.`] },
    { tex: `-${pw(a, 0)}`, v: -1, steps: [`There are no brackets, so the base is $${a}$: $${pw(a, 0)} = 1$.`, `The minus sign is applied after: $-${pw(a, 0)} = -(1) = -1$.`] },
    { tex: `-${pw(-a, 0)}`, v: -1, steps: [`$${pw(-a, 0)} = 1$ (zero exponent).`, `The minus sign in front gives the opposite: $-(1) = -1$.`] },
    { tex: `${pw(a, 0)} + ${pw(c, 0)}`, v: 2, steps: [`$${pw(a, 0)} = 1$ and $${pw(c, 0)} = 1$.`, `$1 + 1 = 2$`] },
    { tex: `${c} ${T} ${pw(a, 0)}`, v: c, steps: [`The exponent belongs to $${a}$ only: $${pw(a, 0)} = 1$.`, `$${c} ${T} 1 = ${c}$`] },
    { tex: `(${c} ${T} ${a})^{0}`, v: 1, steps: [`The whole product $${c} ${T} ${a}$ is the base.`, `Any non-zero base to the exponent $0$ is $1$, so $(${c} ${T} ${a})^{0} = 1$.`] },
  ];
  const f = rng.pick(forms);
  return {
    prompt: `Evaluate $${f.tex}$.`,
    parts: [val(f.v)],
    hints: ['A power with a non-zero base and exponent $0$ equals $1$.', 'Find the base of each power first. A minus sign outside brackets is applied after the power, and a number in front multiplies the power.'],
    solution: [...f.steps, `$${f.tex} = ${f.v}$`],
  };
}

function powerOfPower(rng: Rng): Out {
  const a = lawBase(rng, 0.3);
  const m = rng.int(2, 6);
  const n = rng.int(2, 5);
  const lhs = `\\left(${pw(a, m)}\\right)^{${n}}`;
  return {
    prompt: singlePower(`${lhs} = ${pw(a, SQ)}`),
    parts: [expPart(m * n)],
    hints: [`$${lhs}$ means $${n}$ factors of $${pw(a, m)}$.`, 'Power of a power: keep the base and **multiply** the exponents.'],
    solution: [
      `$${lhs} = ${Array.from({ length: n }, () => pw(a, m)).join(` ${T} `)}$`,
      `That is $${n}$ groups of $${m}$ factors, or $${m} ${T} ${n} = ${m * n}$ factors of $${a}$.`,
      `$${lhs} = ${pw(a, `${m} ${T} ${n}`)} = ${pw(a, m * n)}$`,
      `The exponent is $${m * n}$.`,
    ],
  };
}

function threeFactorLaw(rng: Rng): Out {
  const a = lawBase(rng, 0.4);
  const m = rng.int(2, 8);
  const n = rng.int(2, 8);
  const p = rng.int(2, m + n - 1);
  const eq = `${pw(a, m)} ${T} ${pw(a, n)} ${DV} ${pw(a, p)}`;
  return {
    prompt: singlePower(`${eq} = ${pw(a, SQ)}`),
    parts: [expPart(m + n - p)],
    hints: [LAWS_HINT, 'Work from left to right: multiply first (add the exponents), then divide (subtract).'],
    solution: [
      `All the bases are $${a}$, so keep the base.`,
      `Multiply: $${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, m + n)}$`,
      `Divide: $${pw(a, m + n)} ${DV} ${pw(a, p)} = ${pw(a, `${m + n} - ${p}`)} = ${pw(a, m + n - p)}$`,
      `The exponent is $${m + n - p}$.`,
    ],
  };
}

const PRIMES = [2, 3, 5, 7];

function productPowerExp(rng: Rng): Out {
  const [p, q] = rng.sample(PRIMES, 2).sort((x, y) => x - y);
  const m = rng.int(1, 5);
  const n = rng.int(2, 5);
  const k = rng.int(2, 4);
  const quotient = rng.chance(0.4);
  const mt = m === 1 ? `${p}` : pw(p, m);
  const lhs = quotient ? `\\left(\\dfrac{${mt}}{${pw(q, n)}}\\right)^{${k}}` : `\\left(${mt} ${T} ${pw(q, n)}\\right)^{${k}}`;
  const rhs = quotient ? `\\dfrac{${p}^{${SQ}}}{${q}^{${SQ}}}` : `${p}^{${SQ}} ${T} ${q}^{${SQ}}`;
  const lawName = quotient ? 'power of a quotient' : 'power of a product';
  return {
    prompt: `Write with one power of each base. Enter both missing exponents.\n\n$$${lhs} = ${rhs}$$`,
    parts: [expPart(m * k, `Exponent of $${p}$:`), expPart(n * k, `Exponent of $${q}$:`)],
    hints: [`Use the ${lawName} law: the outside exponent applies to every factor ${quotient ? 'on the top and the bottom' : 'inside the brackets'}.`, 'Then use the power of a power law: multiply the exponents.'],
    solution: [
      `${quotient ? 'Power of a quotient' : 'Power of a product'}: raise each part to the exponent $${k}$.`,
      quotient ? `$${lhs} = \\dfrac{\\left(${mt}\\right)^{${k}}}{\\left(${pw(q, n)}\\right)^{${k}}}$` : `$${lhs} = \\left(${mt}\\right)^{${k}} ${T} \\left(${pw(q, n)}\\right)^{${k}}$`,
      `Power of a power: $${m} ${T} ${k} = ${m * k}$ and $${n} ${T} ${k} = ${n * k}$.`,
      quotient ? `$${lhs} = \\dfrac{${pw(p, m * k)}}{${pw(q, n * k)}}$` : `$${lhs} = ${pw(p, m * k)} ${T} ${pw(q, n * k)}$`,
      `The exponent of $${p}$ is $${m * k}$ and the exponent of $${q}$ is $${n * k}$.`,
    ],
  };
}

function productPowerValue(rng: Rng): Out {
  const { a, b, n } = retry(
    () => ({ a: rng.int(2, 5) * (rng.chance(0.3) ? -1 : 1), b: rng.int(2, 5), n: rng.int(2, 3) }),
    ({ a, b, n }) => Math.abs(a * b) ** n <= 1000 && Math.abs(a) !== b,
  );
  const v = ipow(a * b, n);
  return {
    prompt: `Use the power of a product law to evaluate $(${a} ${T} ${b})^{${n}}$.`,
    parts: [val(v)],
    hints: ['Power of a product: $(a \\times b)^{n} = a^{n} \\times b^{n}$.', `Find $${pw(a, n)}$ and $${pw(b, n)}$, then multiply. Check by working out the brackets first.`],
    solution: [
      `$(${a} ${T} ${b})^{${n}} = ${pw(a, n)} ${T} ${pw(b, n)}$`,
      `$= ${N(ipow(a, n))} ${T} ${N(ipow(b, n))} = ${N(v)}$`,
      `Check with the brackets first: $(${a} ${T} ${b})^{${n}} = ${pw(a * b, n)} = ${N(v)}$.`,
      `$(${a} ${T} ${b})^{${n}} = ${N(v)}$`,
    ],
  };
}

function quotientPowerValue(rng: Rng): Out {
  const { a, b, n } = retry(
    () => ({ a: rng.int(1, 6), b: rng.int(2, 7), n: rng.int(2, 3) }),
    ({ a, b, n }) => gcd(a, b) === 1 && a !== b && b ** n <= 400 && a ** n <= 400 && !(a === 1 && n === 2 && b === 2),
  );
  const neg = rng.chance(0.4);
  const top = ipow(neg ? -a : a, n);
  const bottom = ipow(b, n);
  const base = neg ? `\\left(-\\dfrac{${a}}{${b}}\\right)` : `\\left(\\dfrac{${a}}{${b}}\\right)`;
  const sign = neg && n % 2 === 1;
  return {
    prompt: `Use the power of a quotient law to evaluate $${base}^{${n}}$. Write your answer as a fraction in lowest terms.`,
    parts: [numPart(top / bottom, { fraction: 'lowest', exact: false })],
    hints: ['Power of a quotient: $\\left(\\dfrac{a}{b}\\right)^{n} = \\dfrac{a^{n}}{b^{n}}$.', neg ? `Raise $-${a}$ and $${b}$ to the exponent $${n}$. Count the negative factors to find the sign.` : `Raise the top and the bottom to the exponent $${n}$.`],
    solution: [
      `$${base}^{${n}} = \\dfrac{${pw(neg ? -a : a, n)}}{${pw(b, n)}}$`,
      neg ? `$${pw(-a, n)} = ${top}$ (${n % 2 === 0 ? 'even' : 'odd'} number of negative factors) and $${pw(b, n)} = ${bottom}$.` : `$${pw(a, n)} = ${top}$ and $${pw(b, n)} = ${bottom}$.`,
      `$${base}^{${n}} = ${sign ? '-' : ''}\\dfrac{${Math.abs(top)}}{${bottom}}$, which is already in lowest terms.`,
    ],
  };
}

function simplifyEvaluate(rng: Rng): Out {
  const pattern = rng.pick(['prodDiv', 'powDiv', 'quotPow', 'prodOverPow', 'twoBases'] as const);
  if (pattern === 'twoBases') {
    const [p, q] = rng.sample([2, 3, 5], 2).sort((x, y) => x - y);
    const { e1, e2 } = retry(
      () => ({ e1: rng.int(0, 3), e2: rng.int(0, 3) }),
      ({ e1, e2 }) => e1 + e2 >= 2 && p ** e1 * q ** e2 <= 1000,
    );
    const m1 = e1 + rng.int(2, 4);
    const n1 = e2 + rng.int(2, 4);
    const m2 = m1 - e1;
    const n2 = n1 - e2;
    const v = p ** e1 * q ** e2;
    const tex = `\\dfrac{${pw(p, m1)} ${T} ${pw(q, n1)}}{${pw(p, m2)} ${T} ${pw(q, n2)}}`;
    return {
      prompt: `Simplify using the exponent laws, then evaluate.\n\n$$${tex}$$`,
      parts: [val(v)],
      hints: ['Group the powers with the same base and use the quotient law on each.', 'Subtract the exponents of $' + p + '$, then of $' + q + '$. A power with exponent $0$ equals $1$.'],
      solution: [
        `$${tex} = \\dfrac{${pw(p, m1)}}{${pw(p, m2)}} ${T} \\dfrac{${pw(q, n1)}}{${pw(q, n2)}}$`,
        `$= ${pw(p, `${m1} - ${m2}`)} ${T} ${pw(q, `${n1} - ${n2}`)} = ${pw(p, e1)} ${T} ${pw(q, e2)}$`,
        `${e1 === 0 ? `Zero exponent: $${pw(p, 0)} = 1$. ` : e2 === 0 ? `Zero exponent: $${pw(q, 0)} = 1$. ` : ''}Evaluate: $${N(p ** e1)} ${T} ${N(q ** e2)} = ${N(v)}$`,
        `The value is $${N(v)}$.`,
      ],
    };
  }
  // One base; the final exponent e is small enough to evaluate.
  const a = lawBase(rng, 0.35);
  const A = Math.abs(a);
  const maxE = A === 2 ? 6 : A === 3 ? 4 : A <= 5 ? 3 : 2;
  const e = rng.chance(0.12) ? 0 : rng.int(1, maxE);
  const v = ipow(a, e);
  let tex: string;
  const steps: string[] = [];
  if (pattern === 'prodDiv') {
    const p = rng.int(Math.max(2, 4 - e), 6);
    const m = rng.int(2, e + p - 2);
    const n = e + p - m;
    tex = `\\left(${pw(a, m)} ${T} ${pw(a, n)}\\right) ${DV} ${pw(a, p)}`;
    steps.push(`Brackets first, product law: $${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, m + n)}$`, `Quotient law: $${pw(a, m + n)} ${DV} ${pw(a, p)} = ${pw(a, `${m + n} - ${p}`)} = ${pw(a, e)}$`);
  } else if (pattern === 'powDiv') {
    const { m, k } = retry(() => ({ m: rng.int(2, 4), k: rng.int(2, 3) }), (x) => x.m * x.k - e >= 2, 100);
    const p = m * k - e;
    tex = `\\dfrac{\\left(${pw(a, m)}\\right)^{${k}}}{${pw(a, p)}}`;
    steps.push(`Power of a power: $\\left(${pw(a, m)}\\right)^{${k}} = ${pw(a, m * k)}$`, `Quotient law: $\\dfrac{${pw(a, m * k)}}{${pw(a, p)}} = ${pw(a, `${m * k} - ${p}`)} = ${pw(a, e)}$`);
  } else if (pattern === 'quotPow') {
    // (a^m / a^n)^k with (m - n) k = e; e must split as d × k.
    const options: Array<[number, number]> = [];
    for (let k = 2; k <= 3; k++) if (e % k === 0 && e > 0) options.push([e / k, k]);
    if (e === 0) options.push([0, rng.int(2, 4)]);
    if (options.length === 0) options.push([e, 1]);
    const [dd, k] = rng.pick(options);
    const n = rng.int(2, 6);
    const m = n + dd;
    if (k === 1) {
      tex = `\\dfrac{${pw(a, m)}}{${pw(a, n)}}`;
      steps.push(`Quotient law: $${tex} = ${pw(a, `${m} - ${n}`)} = ${pw(a, e)}$`);
    } else {
      tex = `\\left(\\dfrac{${pw(a, m)}}{${pw(a, n)}}\\right)^{${k}}`;
      steps.push(`Inside the brackets, quotient law: $\\dfrac{${pw(a, m)}}{${pw(a, n)}} = ${pw(a, dd)}$`, `Power of a power: $\\left(${pw(a, dd)}\\right)^{${k}} = ${pw(a, `${dd} ${T} ${k}`)} = ${pw(a, e)}$`);
    }
  } else {
    const p = rng.int(2, 3);
    const k = rng.int(2, 3);
    const total = e + p * k;
    const m = rng.int(2, total - 2);
    const n = total - m;
    tex = `\\dfrac{${pw(a, m)} ${T} ${pw(a, n)}}{\\left(${pw(a, p)}\\right)^{${k}}}`;
    steps.push(`Top, product law: $${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, total)}$`, `Bottom, power of a power: $\\left(${pw(a, p)}\\right)^{${k}} = ${pw(a, p * k)}$`, `Quotient law: $\\dfrac{${pw(a, total)}}{${pw(a, p * k)}} = ${pw(a, `${total} - ${p * k}`)} = ${pw(a, e)}$`);
  }
  steps.push(
    e === 0 ? `Zero exponent: $${pw(a, 0)} = 1$.` : e === 1 ? `$${pw(a, 1)} = ${a}$` : `Evaluate: $${pw(a, e)} = ${rep(a, e)} = ${N(v)}$`,
    `The value is $${N(v)}$.`,
  );
  return {
    prompt: `Simplify using the exponent laws, then evaluate.\n\n$$${tex}$$`,
    parts: [val(v)],
    hints: [LAWS_HINT, 'Simplify to a single power of the base first. Then evaluate that power. Watch the sign of a negative base.'],
    solution: steps,
  };
}

const LAW_EXPLAIN = {
  multBases: 'The bases were multiplied. The base should stay the same.',
  multExps: 'The exponents were multiplied. They should be added.',
  addExps: 'The exponents were added. They should be multiplied.',
  divExps: 'The exponents were divided. They should be subtracted.',
  sum: 'An exponent law was used on a sum or difference. Evaluate each power first.',
  zero: 'The power with exponent $0$ was treated as $0$. It equals $1$.',
  none: 'There is no mistake.',
} as const;

function lawError(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['multBases', 'multExps', 'addExps', 'divExps', 'sum', 'zero'] as const);
  let claim: string;
  let fix: string;
  let answer: Part;
  let question: string;
  let correct: string;
  let pool: Array<keyof typeof LAW_EXPLAIN>;
  if (kind === 'multBases' || kind === 'multExps') {
    const a = rng.int(2, 6);
    const m = rng.int(2, 6);
    const n = retry(() => rng.int(2, 6), (x) => x * m !== x + m);
    claim = kind === 'multBases' ? `${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a * a, m + n)}` : `${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, m * n)}`;
    fix = `Product law: $${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, `${m} + ${n}`)} = ${pw(a, m + n)}$.`;
    question = `Enter the exponent in the correct answer, $${pw(a, SQ)}$.`;
    answer = expPart(m + n);
    correct = `${pw(a, m)} ${T} ${pw(a, n)} = ${pw(a, m + n)}`;
    pool = kind === 'multBases' ? ['addExps', 'divExps', 'none'] : ['multBases', 'addExps', 'none'];
  } else if (kind === 'addExps') {
    const a = rng.int(2, 7);
    const m = rng.int(2, 6);
    const n = retry(() => rng.int(2, 5), (x) => x * m !== x + m);
    claim = `\\left(${pw(a, m)}\\right)^{${n}} = ${pw(a, m + n)}`;
    fix = `Power of a power: $\\left(${pw(a, m)}\\right)^{${n}} = ${pw(a, `${m} ${T} ${n}`)} = ${pw(a, m * n)}$. There are $${n}$ groups of $${m}$ factors.`;
    question = `Enter the exponent in the correct answer, $${pw(a, SQ)}$.`;
    answer = expPart(m * n);
    correct = `\\left(${pw(a, m)}\\right)^{${n}} = ${pw(a, m * n)}`;
    pool = ['multExps', 'multBases', 'none'];
  } else if (kind === 'divExps') {
    const a = rng.int(2, 9);
    const { n, q } = retry(() => ({ n: rng.int(2, 4), q: rng.int(2, 4) }), (x) => x.n * (x.q - 1) !== x.q);
    const m = n * q;
    claim = `${pw(a, m)} ${DV} ${pw(a, n)} = ${pw(a, q)}`;
    fix = `Quotient law: $${pw(a, m)} ${DV} ${pw(a, n)} = ${pw(a, `${m} - ${n}`)} = ${pw(a, m - n)}$.`;
    question = `Enter the exponent in the correct answer, $${pw(a, SQ)}$.`;
    answer = expPart(m - n);
    correct = `${pw(a, m)} ${DV} ${pw(a, n)} = ${pw(a, m - n)}`;
    pool = ['multExps', 'addExps', 'none'];
  } else if (kind === 'sum') {
    const a = rng.pick([2, 3]);
    const m = rng.int(2, a === 2 ? 5 : 3);
    const n = retry(() => rng.int(2, a === 2 ? 5 : 3), (x) => x !== m);
    const plus = rng.chance(0.7);
    const v = plus ? a ** m + a ** n : a ** Math.max(m, n) - a ** Math.min(m, n);
    const [hi, lo] = plus ? [m, n] : [Math.max(m, n), Math.min(m, n)];
    claim = plus ? `${pw(a, m)} + ${pw(a, n)} = ${pw(a, m + n)}` : `${pw(a, hi)} - ${pw(a, lo)} = ${pw(a, hi - lo)}`;
    fix = plus ? `Evaluate each power first: $${pw(a, m)} + ${pw(a, n)} = ${a ** m} + ${a ** n} = ${v}$.` : `Evaluate each power first: $${pw(a, hi)} - ${pw(a, lo)} = ${a ** hi} - ${a ** lo} = ${v}$.`;
    question = 'What is the correct value?';
    answer = val(v);
    correct = plus ? `${pw(a, m)} + ${pw(a, n)} = ${v}` : `${pw(a, hi)} - ${pw(a, lo)} = ${v}`;
    pool = ['multExps', 'divExps', 'none'];
  } else {
    const a = rng.int(2, 9);
    const n = rng.int(2, 3);
    const c = rng.int(2, 9);
    const v = ipow(a, n) + c;
    claim = `${pw(c, 0)} + ${pw(a, n)} = ${N(ipow(a, n))}`;
    fix = `$${pw(c, 0)} = 1$, so $${pw(c, 0)} + ${pw(a, n)} = 1 + ${N(ipow(a, n))} = ${N(v)}$.`;
    question = 'What is the correct value?';
    answer = val(v);
    correct = `${pw(c, 0)} + ${pw(a, n)} = ${N(v)}`;
    pool = ['multBases', 'addExps', 'none'];
  }
  return {
    prompt: `${name} wrote $${claim}$. What mistake, if any, did ${name} make? Then find the correct answer.`,
    parts: [
      { label: 'Mistake:', answer: mc(rng, LAW_EXPLAIN[kind], pool.map((k) => LAW_EXPLAIN[k])) },
      { ...answer, label: question },
    ],
    hints: [LAWS_HINT, 'Write the powers as repeated multiplication to check what the answer should be.'],
    solution: [`The mistake: ${LAW_EXPLAIN[kind].charAt(0).toLowerCase()}${LAW_EXPLAIN[kind].slice(1)}`, fix, `The correct answer is $${correct}$.`],
  };
}

const exponentLaws = skill({
  id: 'm9-exponent-laws',
  name: 'Exponent laws',
  description: 'Use the product, quotient, power of a power, power of a product and power of a quotient laws, and the zero exponent, to simplify and evaluate powers with integral bases.',
  outcomes: ['N1', 'N2'],
  lessonId: 'm9-2-2',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) {
      const kind = rng.weighted([['product', 3], ['quotient', 3], ['pattern', 2], ['zero', 1]] as const);
      if (kind === 'product') return productLaw(rng, 0.2);
      if (kind === 'quotient') return quotientLaw(rng, 0.2);
      if (kind === 'pattern') return zeroPattern(rng);
      return zeroEvaluate(rng, false);
    }
    if (d === 2) {
      const kind = rng.weighted([['powpow', 3], ['three', 2], ['prodExp', 2], ['prodVal', 1], ['quotVal', 2], ['zero', 2]] as const);
      if (kind === 'powpow') return powerOfPower(rng);
      if (kind === 'three') return threeFactorLaw(rng);
      if (kind === 'prodExp') return productPowerExp(rng);
      if (kind === 'prodVal') return productPowerValue(rng);
      if (kind === 'quotVal') return quotientPowerValue(rng);
      return zeroEvaluate(rng, true);
    }
    return rng.chance(0.65) ? simplifyEvaluate(rng) : lawError(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Order of operations with powers
// ---------------------------------------------------------------------------

const ORDER_HINT = 'Order of operations: **B**rackets, **E**xponents, **D**ivide and **M**ultiply from left to right, then **A**dd and **S**ubtract from left to right.';

interface Worked {
  tex: string;
  /** [what was done, the expression after it] */
  steps: Array<[string, string]>;
  v: number;
}

function workedSolution(w: Worked): string[] {
  return [`$${w.tex}$`, ...w.steps.map(([note, e]) => `${note}: $= ${e}$`), `The value is $${N(w.v)}$.`];
}

function opsD1(rng: Rng): Worked {
  const kind = rng.pick(['addMult', 'bracketSq', 'multSq', 'divBracket', 'cubeMinus'] as const);
  if (kind === 'addMult') {
    const [b, n] = smallPower(rng, { bases: [2, 3, 4, 5], maxExp: 3 });
    const a = rng.int(1, 20);
    const c = rng.int(2, 6);
    const P = ipow(b, n);
    return {
      tex: `${a} + ${pw(b, n)} ${T} ${c}`,
      steps: [['Exponent first', `${a} + ${P} ${T} ${c}`], ['Multiply', `${a} + ${P * c}`], ['Add', `${a + P * c}`]],
      v: a + P * c,
    };
  }
  if (kind === 'bracketSq') {
    const a = rng.int(1, 7);
    const b = rng.int(1, 7);
    const c = rng.int(1, 30);
    const s = a + b;
    return {
      tex: `(${a} + ${b})^{2} - ${c}`,
      steps: [['Brackets first', `${s}^{2} - ${c}`], ['Exponent', `${s * s} - ${c}`], ['Subtract', `${s * s - c}`]],
      v: s * s - c,
    };
  }
  if (kind === 'multSq') {
    const a = rng.int(2, 6);
    const b = rng.int(2, 6);
    const c = rng.int(2, 6);
    return {
      tex: `${a} ${T} ${b}^{2} - ${c}^{2}`,
      steps: [['Exponents first', `${a} ${T} ${b * b} - ${c * c}`], ['Multiply', `${a * b * b} - ${c * c}`], ['Subtract', `${a * b * b - c * c}`]],
      v: a * b * b - c * c,
    };
  }
  if (kind === 'divBracket') {
    const a = rng.int(3, 9);
    const c = rng.int(2, 5);
    const k = rng.int(1, Math.floor((a * a - 1) / c));
    const b = a * a - c * k;
    return {
      tex: `(${a}^{2} - ${b}) ${DV} ${c}`,
      steps: [['Inside the brackets, the exponent first', `(${a * a} - ${b}) ${DV} ${c}`], ['Finish the brackets', `${a * a - b} ${DV} ${c}`], ['Divide', `${k}`]],
      v: k,
    };
  }
  const a = rng.int(2, 5);
  const b = rng.int(2, 9);
  const c = rng.int(2, 9);
  const A = a ** 3;
  return {
    tex: `${a}^{3} - ${b} ${T} ${c}`,
    steps: [['Exponent first', `${A} - ${b} ${T} ${c}`], ['Multiply', `${A} - ${b * c}`], ['Subtract', `${A - b * c}`]],
    v: A - b * c,
  };
}

function opsD2(rng: Rng): Worked {
  const kind = rng.pick(['negCube', 'negSquares', 'squareBracket', 'fractionBar', 'cubeBracket'] as const);
  if (kind === 'negCube') {
    const a = rng.int(2, 4);
    const b = rng.int(2, 9);
    const c = rng.int(2, 9);
    const A = -(a ** 3);
    return {
      tex: `${pw(-a, 3)} + ${b} ${T} (${-c})`,
      steps: [['Exponent first (three negative factors give a negative)', `${A} + ${b} ${T} (${-c})`], ['Multiply', `${A} + (${-b * c})`], ['Add', `${A - b * c}`]],
      v: A - b * c,
    };
  }
  if (kind === 'negSquares') {
    const a = rng.int(2, 9);
    const b = rng.int(2, 6);
    const c = rng.int(2, 5);
    return {
      tex: `-${pw(a, 2)} + ${c} ${T} ${pw(-b, 2)}`,
      steps: [[`Exponents first ($-${a}^{2}$ has base $${a}$, and $(${-b})^{2}$ is positive)`, `-${a * a} + ${c} ${T} ${b * b}`], ['Multiply', `-${a * a} + ${c * b * b}`], ['Add', `${-a * a + c * b * b}`]],
      v: -a * a + c * b * b,
    };
  }
  if (kind === 'squareBracket') {
    const s = -rng.int(2, 6);
    const a = rng.int(1, 9);
    const b = a - s;
    const S = s * s;
    const divs = [2, 3, 4, 5, 6, 8, 9].filter((x) => S % x === 0 && x !== S);
    const c = rng.pick(divs.length ? divs : [1]);
    return {
      tex: `\\left[${a} + (${-b})\\right]^{2} ${DV} ${c}`,
      steps: [['Brackets first', `(${s})^{2} ${DV} ${c}`], ['Exponent (two negative factors give a positive)', `${S} ${DV} ${c}`], ['Divide', `${S / c}`]],
      v: S / c,
    };
  }
  if (kind === 'fractionBar') {
    const { a, c, d, q } = retry(
      () => ({ a: rng.int(2, 6), c: rng.int(2, 4), d: rng.int(1, 20), q: rng.nonZero(-5, 5) }),
      ({ a, c, d, q }) => {
        const den = c * c - d;
        const b = q * den - a * a;
        return den !== 0 && Math.abs(den) <= 9 && b !== 0 && Math.abs(b) <= 40 && Math.abs(den) !== 1;
      },
    );
    const den = c * c - d;
    const num = q * den;
    const b = num - a * a;
    return {
      tex: `\\dfrac{${pw(-a, 2)} ${pm(b)}}{${c}^{2} - ${d}}`,
      steps: [['The fraction bar groups the top and the bottom. Exponents first', `\\dfrac{${a * a} ${pm(b)}}{${c * c} - ${d}}`], ['Work out the top and the bottom', `\\dfrac{${num}}{${den}}`], ['Divide', `${q}`]],
      v: q,
    };
  }
  const k = rng.pick([-3, -2, 2, 3]);
  const c = rng.intExcept(-5, 8, [k]);
  const d = c - k;
  const a = rng.int(-10, 20);
  const b = rng.int(2, 5);
  const K = k ** 3;
  return {
    tex: `${a} - ${b} ${T} (${c} ${pm(-d)})^{3}`,
    steps: [['Brackets first', `${a} - ${b} ${T} ${pw(k, 3)}`], ['Exponent', `${a} - ${b} ${T} ${sp(K)}`], ['Multiply', `${a} - ${sp(b * K)}`], ['Subtract', `${a - b * K}`]],
    v: a - b * K,
  };
}

function opsLong(rng: Rng): Worked {
  const kind = rng.pick(['bracketMix', 'divideCube'] as const);
  if (kind === 'bracketMix') {
    const a = rng.pick([-3, -2, 2, 3]);
    const b = rng.int(2, 6);
    const k = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const c = rng.intExcept(1, 9, [k]);
    const d = c - k;
    const e = rng.int(2, 4);
    const B = b * b;
    const K = k * k;
    const E = e ** 3;
    const m = B - K;
    const v = a * m - E;
    return {
      tex: `${a} ${T} \\left[${b}^{2} - (${c} ${pm(-d)})^{2}\\right] - ${e}^{3}`,
      steps: [
        ['Inner brackets first', `${a} ${T} \\left[${b}^{2} - ${pw(k, 2)}\\right] - ${e}^{3}`],
        ['Exponents', `${a} ${T} \\left[${B} - ${K}\\right] - ${E}`],
        ['Finish the square brackets', `${a} ${T} ${sp(m)} - ${E}`],
        ['Multiply', `${a * m} - ${E}`],
        ['Subtract', `${v}`],
      ],
      v,
    };
  }
  const a = rng.int(2, 5);
  const b = rng.int(2, 6);
  const t = rng.pick([2, 3]);
  const kk = t * rng.nonZero(-2, 2);
  const c = rng.intExcept(-4, 6, [kk]);
  const d = c - kk;
  const A = a * a;
  const K = kk ** 3;
  const v = A * b - K / t;
  return {
    tex: `${pw(-a, 2)} ${T} ${b} - (${c} ${pm(-d)})^{3} ${DV} ${t}`,
    steps: [
      ['Brackets first', `${pw(-a, 2)} ${T} ${b} - ${pw(kk, 3)} ${DV} ${t}`],
      ['Exponents', `${A} ${T} ${b} - ${sp(K)} ${DV} ${t}`],
      ['Multiply and divide from left to right', `${A * b} - ${sp(K / t)}`],
      ['Subtract', `${v}`],
    ],
    v,
  };
}

function opsQuestion(w: Worked, d: Difficulty): Out {
  return {
    prompt: `Evaluate.\n\n$$${w.tex}$$`,
    parts: [val(w.v)],
    hints: [ORDER_HINT, d === 1 ? 'Find the exponent first. Then multiply or divide before you add or subtract.' : 'Work inside brackets first. Then evaluate powers, paying attention to negative bases. A fraction bar works like brackets around the top and the bottom.'],
    solution: workedSolution(w),
  };
}

interface ErrorCase {
  tex: string;
  shown: string[];
  errStep: number;
  correct: Array<[string, string]>;
  v: number;
  explain: string;
}

function errorCase(rng: Rng): ErrorCase {
  const kind = rng.pick(['addFirst', 'negSquare', 'expTimes', 'leftRight', 'divMult', 'negBracket', 'squareSplit', 'subNeg'] as const);
  if (kind === 'addFirst') {
    const a = rng.int(2, 9);
    const b = rng.int(2, 6);
    const c = rng.int(2, 5);
    const C = c * c;
    return {
      tex: `${a} + ${b} ${T} ${c}^{2}`,
      shown: [`${a} + ${b} ${T} ${C}`, `${a + b} ${T} ${C}`, `${(a + b) * C}`],
      errStep: 2,
      correct: [['Exponent', `${a} + ${b} ${T} ${C}`], ['Multiply', `${a} + ${b * C}`], ['Add', `${a + b * C}`]],
      v: a + b * C,
      explain: `In Step 2, the addition $${a} + ${b}$ was done before the multiplication. Multiply before you add.`,
    };
  }
  if (kind === 'negSquare') {
    const a = rng.int(2, 9);
    const b = rng.int(2, 9);
    const c = rng.int(2, 9);
    const A = a * a;
    return {
      tex: `-${a}^{2} + ${b} ${T} ${c}`,
      shown: [`${A} + ${b} ${T} ${c}`, `${A} + ${b * c}`, `${A + b * c}`],
      errStep: 1,
      correct: [['Exponent (the base is $' + a + '$)', `-${A} + ${b} ${T} ${c}`], ['Multiply', `-${A} + ${b * c}`], ['Add', `${-A + b * c}`]],
      v: -A + b * c,
      explain: `In Step 1, $-${a}^{2}$ was treated as $(${-a})^{2}$. The base is $${a}$, so $-${a}^{2} = -${A}$.`,
    };
  }
  if (kind === 'expTimes') {
    const b = rng.int(1, 6);
    const c = rng.int(1, 6);
    const d = rng.int(2, 5);
    const a = rng.int(2, 5);
    const s = b + c;
    const A = a ** 3;
    return {
      tex: `(${b} + ${c}) ${T} ${d} - ${a}^{3}`,
      shown: [`${s} ${T} ${d} - ${a}^{3}`, `${s} ${T} ${d} - ${3 * a}`, `${s * d} - ${3 * a}`, `${s * d - 3 * a}`],
      errStep: 2,
      correct: [['Brackets', `${s} ${T} ${d} - ${a}^{3}`], ['Exponent', `${s} ${T} ${d} - ${A}`], ['Multiply', `${s * d} - ${A}`], ['Subtract', `${s * d - A}`]],
      v: s * d - A,
      explain: `In Step 2, $${a}^{3}$ was worked out as $3 ${T} ${a}$. It means $${a} ${T} ${a} ${T} ${a} = ${A}$.`,
    };
  }
  if (kind === 'leftRight') {
    const a = rng.int(10, 30);
    const b = rng.int(2, 9);
    const c = rng.int(2, 5);
    const C = c * c;
    return {
      tex: `${a} - ${b} + ${c}^{2}`,
      shown: [`${a} - ${b} + ${C}`, `${a} - ${b + C}`, `${a - b - C}`],
      errStep: 2,
      correct: [['Exponent', `${a} - ${b} + ${C}`], ['Subtract (left to right)', `${a - b} + ${C}`], ['Add', `${a - b + C}`]],
      v: a - b + C,
      explain: `In Step 2, the addition was done before the subtraction. Add and subtract in order from left to right.`,
    };
  }
  if (kind === 'divMult') {
    const [p, n] = rng.pick([[2, 4], [2, 5], [2, 6], [3, 3], [3, 4]] as Array<[number, number]>);
    const P = p ** n;
    const { a, b } = retry(
      () => ({ a: p ** rng.int(1, 2), b: p ** rng.int(1, 2) }),
      ({ a, b }) => P % (a * b) === 0 && P / (a * b) >= 1 && a * b < P,
    );
    return {
      tex: `${p}^{${n}} ${DV} ${a} ${T} ${b}`,
      shown: [`${P} ${DV} ${a} ${T} ${b}`, `${P} ${DV} ${a * b}`, `${P / (a * b)}`],
      errStep: 2,
      correct: [['Exponent', `${P} ${DV} ${a} ${T} ${b}`], ['Divide (left to right)', `${P / a} ${T} ${b}`], ['Multiply', `${(P / a) * b}`]],
      v: (P / a) * b,
      explain: `In Step 2, the multiplication was done before the division. Multiply and divide in order from left to right.`,
    };
  }
  if (kind === 'negBracket') {
    const a = rng.int(2, 5);
    const b = rng.int(1, 6);
    const c = b + rng.int(2, 6);
    const e = rng.int(1, 9);
    const k = b - c;
    const K = k * k;
    return {
      tex: `${a} ${T} (${b} - ${c})^{2} - ${e}`,
      shown: [`${a} ${T} (${k})^{2} - ${e}`, `${a} ${T} (${-K}) - ${e}`, `${-a * K} - ${e}`, `${-a * K - e}`],
      errStep: 2,
      correct: [['Brackets', `${a} ${T} (${k})^{2} - ${e}`], ['Exponent', `${a} ${T} ${K} - ${e}`], ['Multiply', `${a * K} - ${e}`], ['Subtract', `${a * K - e}`]],
      v: a * K - e,
      explain: `In Step 2, $(${k})^{2}$ was given a negative value. Two negative factors give a positive product: $(${k})^{2} = ${K}$.`,
    };
  }
  if (kind === 'squareSplit') {
    const a = rng.int(2, 7);
    const b = rng.int(2, 7);
    const c = rng.int(1, 20);
    const s = a + b;
    return {
      tex: `(${a} + ${b})^{2} - ${c}`,
      shown: [`${a * a} + ${b * b} - ${c}`, `${a * a + b * b} - ${c}`, `${a * a + b * b - c}`],
      errStep: 1,
      correct: [['Brackets', `${s}^{2} - ${c}`], ['Exponent', `${s * s} - ${c}`], ['Subtract', `${s * s - c}`]],
      v: s * s - c,
      explain: `In Step 1, each number in the brackets was squared separately. Work out the brackets first: $${a} + ${b} = ${s}$, then $${s}^{2} = ${s * s}$.`,
    };
  }
  const a = rng.int(2, 6);
  const b = rng.int(2, 5);
  const c = rng.int(1, 5);
  const dd = c + rng.int(1, 4);
  const k = c - dd;
  const A = a * a;
  const x = -b * k;
  return {
    tex: `${a}^{2} - ${b} ${T} (${c} - ${dd})`,
    shown: [`${A} - ${b} ${T} (${k})`, `${A} - (${b * k})`, `${A - x}`],
    errStep: 3,
    correct: [['Brackets and exponent', `${A} - ${b} ${T} (${k})`], ['Multiply', `${A} - (${b * k})`], ['Subtracting a negative is adding', `${A} + ${x} = ${A + x}`]],
    v: A + x,
    explain: `In Step 3, subtracting $${b * k}$ was treated as subtracting $${x}$. Subtracting a negative is the same as adding: $${A} - (${b * k}) = ${A} + ${x}$.`,
  };
}

function findError(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const e = errorCase(rng);
  const work = e.shown.map((s, i) => `**Step ${i + 1}:** $= ${s}$`).join('\n\n');
  const labels = e.shown.map((_, i) => `Step ${i + 1}`);
  return {
    prompt: `${name} evaluated $${e.tex}$ like this:\n\n${work}\n\nIn which step did ${name} make the first error? Then find the correct value.`,
    parts: [
      { label: 'First error:', answer: fixedChoice(labels, e.errStep - 1) },
      val(e.v, 'Correct value:'),
    ],
    hints: [ORDER_HINT, 'Check each step on its own. Did it follow the order of operations, and is the arithmetic right?'],
    solution: [e.explain, `Correct work: $${e.tex}$`, ...e.correct.map(([note, s]) => `${note}: $= ${s}$`), `The first error is in Step ${e.errStep}. The correct value is $${e.v}$.`],
  };
}

const orderOpsPowers = skill({
  id: 'm9-order-ops-powers',
  name: 'Order of operations with powers',
  description: 'Evaluate integer expressions with powers and brackets using the order of operations, and find and correct errors in a worked solution.',
  outcomes: ['N2', 'N4'],
  lessonId: 'm9-2-3',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) return opsQuestion(opsD1(rng), 1);
    if (d === 2) return opsQuestion(opsD2(rng), 2);
    return rng.chance(0.55) ? findError(rng) : opsQuestion(opsLong(rng), 3);
  },
});

// ---------------------------------------------------------------------------
// 2.4 Using exponents to solve problems
// ---------------------------------------------------------------------------


function squareArea(rng: Rng): Out {
  const c = rng.pick([
    { what: 'square floor tile', u: 'cm', s: [20, 30, 40, 25, 15, 12] },
    { what: 'square garden plot', u: 'm', s: [4, 5, 6, 7, 8, 9, 12] },
    { what: 'square photo', u: 'cm', s: [10, 12, 15, 20] },
    { what: 'square quilt', u: 'cm', s: [90, 120, 150] },
    { what: 'square playground sandbox', u: 'm', s: [3, 4, 5, 6] },
    { what: 'square sticky note', u: 'mm', s: [75, 76] },
  ]);
  const s = rng.pick(c.s);
  const A = s * s;
  return {
    prompt: `A ${c.what} has a side length of $${s}\\ \\text{${c.u}}$. Write its area as a power, then evaluate it.`,
    parts: [val(A, 'Area:', `${c.u}²`)],
    hints: ['The area of a square is $A = s^{2}$.', `Substitute $s = ${s}$ and evaluate $${s}^{2} = ${s} ${T} ${s}$.`],
    solution: [`$A = s^{2}$`, `$A = ${s}^{2} = ${s} ${T} ${s} = ${N(A)}$`, `The area is $${N(A)}\\ \\text{${c.u}}^{2}$.`],
  };
}

function cubeVolume(rng: Rng): Out {
  const c = rng.pick([
    { what: 'sugar cube', u: 'cm', s: [1, 2] },
    { what: 'ice cube', u: 'cm', s: [2, 3, 4] },
    { what: 'number cube from a board game', u: 'mm', s: [12, 15, 16, 20] },
    { what: 'cube-shaped storage bin', u: 'cm', s: [25, 30, 35, 40] },
    { what: 'cube-shaped planter', u: 'cm', s: [20, 30, 40, 50] },
    { what: 'cube-shaped gift box', u: 'cm', s: [8, 9, 10, 12, 15] },
  ]);
  const s = retry(() => rng.pick(c.s), (x) => x > 1);
  const V = s ** 3;
  return {
    prompt: `A ${c.what} has an edge length of $${s}\\ \\text{${c.u}}$. Write its volume as a power, then evaluate it.`,
    figure: { type: 'solid', shape: 'cube', labels: { l: `${s} ${c.u}` } },
    parts: [val(V, 'Volume:', `${c.u}³`)],
    hints: ['The volume of a cube is $V = s^{3}$.', `Evaluate $${s}^{3} = ${s} ${T} ${s} ${T} ${s}$.`],
    solution: [`$V = s^{3}$`, `$V = ${s}^{3} = ${s} ${T} ${s} ${T} ${s} = ${N(V)}$`, `The volume is $${N(V)}\\ \\text{${c.u}}^{3}$.`],
  };
}

function foldLayers(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const n = rng.int(4, 8);
  const figure: Figure = { type: 'table', headers: ['Folds', 'Layers'], rows: [['0', '1'], ['1', '2'], ['2', '4'], ['3', '8']] };
  return {
    prompt: `${name} folds a sheet of paper in half again and again. Each fold doubles the number of layers. How many layers are there after $${n}$ folds?`,
    figure,
    parts: [val(2 ** n, undefined, 'layers')],
    hints: ['Each fold multiplies the number of layers by $2$.', `After $${n}$ folds there are $2^{${n}}$ layers.`],
    solution: [`After $1$ fold there are $2$ layers, after $2$ folds $2 ${T} 2 = 2^{2}$ layers, and so on.`, `After $${n}$ folds: $2^{${n}} = ${rep(2, n)}$`, `$2^{${n}} = ${2 ** n}$`, `There are $${2 ** n}$ layers.`],
  };
}

function bacteria(rng: Rng): Out {
  const { n0, t, n } = retry(
    () => ({ n0: rng.pick([1, 10, 20, 25, 50, 100, 200]), t: rng.pick([15, 20, 30, 60]), n: rng.int(3, 10) }),
    ({ n0, t, n }) => n0 * 2 ** n <= 120000 && (t * n) % 60 === 0,
  );
  const hours = (t * n) / 60;
  const v = n0 * 2 ** n;
  const where = rng.pick(['A science class grows', 'A hospital lab grows', 'A food-safety inspector tests', 'A biology student grows']);
  return {
    prompt: `${where} a sample of bacteria that starts with $${n0}$ ${n0 === 1 ? 'cell' : 'cells'}. The number of cells doubles every $${t}$ minutes. How many cells are there after $${hours}$ ${hours === 1 ? 'hour' : 'hours'}?`,
    parts: [val(v, undefined, 'cells')],
    hints: [`First find how many times the number doubles in $${hours}$ ${hours === 1 ? 'hour' : 'hours'}.`, `Each doubling multiplies by $2$, so $n$ doublings multiply by $2^{n}$.`],
    solution: [
      `$${hours}$ ${hours === 1 ? 'hour' : 'hours'} is $${hours * 60}$ minutes. Number of doublings: $${hours * 60} ${DV} ${t} = ${n}$.`,
      `Number of cells $= ${n0} ${T} 2^{${n}}$`,
      `$2^{${n}} = ${N(2 ** n)}$, so $${n0} ${T} ${N(2 ** n)} = ${N(v)}$.`,
      `There are $${N(v)}$ cells after $${hours}$ ${hours === 1 ? 'hour' : 'hours'}.`,
    ],
  };
}

function sharing(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const k = rng.pick([2, 3, 4, 5]);
  const n = retry(() => rng.int(3, 8), (x) => k ** x <= 100000);
  const what = rng.pick(['a funny video of a dog', 'a story about a school fundraiser', 'a photo of a northern lights display', 'a post about a lost cat in the neighbourhood', 'a highlight of a hockey goal']);
  return {
    prompt: `${name} shares ${what} online with $${k}$ friends. In the next round, each of those friends shares it with $${k}$ new people, and so on. In round $1$, $${k}$ people see it, and in round $2$, $${k}^{2} = ${k * k}$ new people see it. How many new people see it in round $${n}$?`,
    parts: [val(k ** n, undefined, 'people')],
    hints: [`Each round multiplies the number of new people by $${k}$.`, `In round $n$, $${k}^{n}$ new people see it.`],
    solution: [
      `Round $1$: $${k}$; round $2$: $${k} ${T} ${k} = ${k}^{2}$; round $3$: $${k}^{3}$; and so on.`,
      `Round $${n}$: $${k}^{${n}} = ${rep(k, n)}$`,
      `$${k}^{${n}} = ${N(k ** n)}$`,
      `In round $${n}$, $${N(k ** n)}$ new people see it.`,
    ],
  };
}

function paperThickness(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const n = rng.int(5, 10);
  const v = (2 ** n) / 10;
  return {
    prompt: `A sheet of paper is $0.1\\ \\text{mm}$ thick. ${name} folds it in half $${n}$ times. Each fold doubles the thickness. How thick is the folded paper?`,
    parts: [numPart(v, { exact: false, suffix: 'mm', display: 'decimal' })],
    hints: [`After $${n}$ folds there are $2^{${n}}$ layers.`, `Multiply the number of layers by the thickness of one layer, $0.1\\ \\text{mm}$.`],
    solution: [`Number of layers: $2^{${n}} = ${N(2 ** n)}$`, `Thickness $= ${N(2 ** n)} ${T} 0.1 = ${fmt(v)}$`, `The folded paper is $${fmt(v)}\\ \\text{mm}$ thick.`],
    calculator: true,
  };
}

function cubeSurface(rng: Rng): Out {
  const c = rng.pick([
    { what: 'cube-shaped gift box', u: 'cm', s: [10, 12, 15, 20, 25] },
    { what: 'cube-shaped storage ottoman', u: 'cm', s: [35, 40, 45] },
    { what: 'cube-shaped wooden block', u: 'cm', s: [4, 5, 6, 8] },
  ]);
  const s = rng.pick(c.s);
  const face = s * s;
  return {
    prompt: `A ${c.what} has an edge length of $${s}\\ \\text{${c.u}}$. How much paint or paper is needed to cover all six faces exactly? Find the surface area.`,
    figure: { type: 'solid', shape: 'cube', labels: { l: `${s} ${c.u}` } },
    parts: [val(6 * face, 'Surface area:', `${c.u}²`)],
    hints: ['A cube has $6$ square faces that are all the same.', `The area of one face is $${s}^{2}$. Multiply by $6$.`],
    solution: [`Area of one face: $${s}^{2} = ${N(face)}\\ \\text{${c.u}}^{2}$`, `Surface area $= 6 ${T} ${s}^{2} = 6 ${T} ${N(face)} = ${N(6 * face)}$`, `The surface area is $${N(6 * face)}\\ \\text{${c.u}}^{2}$.`],
  };
}

function doublingTime(rng: Rng): Out {
  const { n0, t, target, n } = retry(
    () => {
      const n0 = rng.pick([10, 20, 25, 50, 100]);
      const t = rng.pick([15, 20, 30]);
      const target = rng.pick([1000, 2000, 5000, 10000, 20000, 50000]);
      let n = 0;
      while (n0 * 2 ** n <= target) n++;
      return { n0, t, target, n };
    },
    ({ n0, target, n }) => n >= 4 && n <= 11 && n0 * 2 ** n !== target && n0 * 2 ** (n - 1) !== target,
  );
  return {
    prompt: `A sample of bacteria starts with $${n0}$ cells and doubles every $${t}$ minutes. After how many minutes will there first be more than $${N(target)}$ cells?`,
    parts: [val(n * t, undefined, 'min')],
    hints: [`After $n$ doublings there are $${n0} ${T} 2^{n}$ cells. Find the smallest $n$ that gives more than $${N(target)}$.`, `Then multiply the number of doublings by $${t}$ minutes.`],
    solution: [
      `After $n$ doublings: $${n0} ${T} 2^{n}$ cells.`,
      `$${n0} ${T} 2^{${n - 1}} = ${N(n0 * 2 ** (n - 1))}$, which is not more than $${N(target)}$.`,
      `$${n0} ${T} 2^{${n}} = ${N(n0 * 2 ** n)}$, which is more than $${N(target)}$. So $${n}$ doublings are needed.`,
      `Time: $${n} ${T} ${t} = ${n * t}$ minutes.`,
      `There will first be more than $${N(target)}$ cells after $${n * t}$ minutes.`,
    ],
    figure: { type: 'table', headers: ['Doublings', 'Minutes', 'Cells'], rows: [['0', '0', `${n0}`], ['1', `${t}`, `${n0 * 2}`]] },
  };
}

function totalReached(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const k = rng.pick([2, 3, 4, 5]);
  const r = retry(() => rng.int(3, 6), (x) => k ** x <= 5000);
  const terms = Array.from({ length: r }, (_, i) => k ** (i + 1));
  const total = terms.reduce((s, x) => s + x, 0);
  const what = rng.pick(['a poster for the school bake sale', 'a sign-up link for a soccer camp', 'a video of a skateboard trick', 'news about a snow day']);
  return {
    prompt: `${name} sends ${what} to $${k}$ people. In each round after that, every person who just received it sends it to $${k}$ new people. Not counting ${name}, how many people have received it after $${r}$ rounds in total?`,
    parts: [val(total, undefined, 'people')],
    hints: [`In round $n$, $${k}^{n}$ new people receive it.`, `Add the new people from rounds $1$ to $${r}$: $${Array.from({ length: r }, (_, i) => `${k}^{${i + 1}}`).join(' + ')}$.`],
    solution: [
      `New people in each round: ${terms.map((x, i) => `round $${i + 1}$: $${k}^{${i + 1}} = ${N(x)}$`).join(', ')}.`,
      `Total: $${terms.map((x) => N(x)).join(' + ')} = ${N(total)}$`,
      `After $${r}$ rounds, $${N(total)}$ people have received it.`,
    ],
  };
}

function foldsNeeded(rng: Rng): Out {
  const goal = rng.pick([
    { mm: 10, tex: '1\\ \\text{cm}' },
    { mm: 50, tex: '5\\ \\text{cm}' },
    { mm: 100, tex: '10\\ \\text{cm}' },
    { mm: 300, tex: '30\\ \\text{cm}' },
    { mm: 1000, tex: '1\\ \\text{m}' },
  ]);
  const goalText = `$${goal.tex}$`;
  const tenths = goal.mm * 10;
  let n = 0;
  while (2 ** n <= tenths) n++;
  return {
    prompt: `A sheet of paper is $0.1\\ \\text{mm}$ thick. Suppose you could fold it in half as many times as you like, and each fold doubles the thickness. What is the least number of folds that makes the stack thicker than ${goalText}?`,
    parts: [val(n, undefined, 'folds')],
    hints: [`After $n$ folds the thickness is $0.1 ${T} 2^{n}$ mm. Change ${goalText} to millimetres first.`, `You need $2^{n} > ${N(tenths)}$. Try powers of $2$.`],
    solution: [
      `$${goal.tex} = ${N(goal.mm)}\\ \\text{mm}$. Thickness after $n$ folds: $0.1 ${T} 2^{n}$ mm.`,
      `We need $0.1 ${T} 2^{n} > ${N(goal.mm)}$, so $2^{n} > ${N(tenths)}$.`,
      `$2^{${n - 1}} = ${N(2 ** (n - 1))}$ is too small, but $2^{${n}} = ${N(2 ** n)}$ is big enough: $0.1 ${T} ${N(2 ** n)} = ${fmt((2 ** n) / 10)}$ mm.`,
      `The least number of folds is $${n}$.`,
    ],
    calculator: true,
  };
}

function cubeCount(rng: Rng): Out {
  const s = rng.pick([1, 2, 3, 5]);
  const k = rng.int(2, s === 1 ? 10 : 8);
  const L = s * k;
  const what = rng.pick(['a cube-shaped box', 'a cube-shaped storage crate', 'a cube-shaped display case']);
  const small = rng.pick(['cube-shaped blocks', 'small cubes', 'cube-shaped boxes of tea']);
  return {
    prompt: `${cap(what)} has an inside edge length of $${L}\\ \\text{cm}$. How many ${small} with an edge length of $${s}\\ \\text{cm}$ fit exactly inside it?`,
    parts: [val(k ** 3, undefined, 'cubes')],
    hints: [`How many small cubes fit along one edge? $${L} ${DV} ${s}$`, 'The box holds that number cubed: one layer is a square, and there are as many layers as cubes along an edge.'],
    solution: [
      `Along one edge: $${L} ${DV} ${s} = ${k}$ cubes.`,
      `One layer holds $${k}^{2} = ${k * k}$ cubes, and there are $${k}$ layers.`,
      `Total: $${k}^{3} = ${N(k ** 3)}$`,
      `$${N(k ** 3)}$ small cubes fit inside.`,
    ],
  };
}

function areaRatio(rng: Rng): Out {
  const b = rng.pick([2, 3]);
  const m = rng.int(3, 6);
  const n = rng.int(Math.max(1, m - (b === 2 ? 3 : 2)), m - 1);
  const ratio = b ** (2 * (m - n));
  const shape = { a: 'A', b: 'B' };
  return {
    prompt: `Square ${shape.a} has a side length of $${pw(b, m)}\\ \\text{cm}$. Square ${shape.b} has a side length of $${pw(b, n)}\\ \\text{cm}$. How many times as large as the area of square ${shape.b} is the area of square ${shape.a}?`,
    parts: [val(ratio, undefined, 'times')],
    hints: ['Write each area as a power of a power: $\\left(b^{m}\\right)^{2}$.', 'Divide the areas with the quotient law, then evaluate.'],
    solution: [
      `Area of ${shape.a}: $\\left(${pw(b, m)}\\right)^{2} = ${pw(b, 2 * m)}$. Area of ${shape.b}: $\\left(${pw(b, n)}\\right)^{2} = ${pw(b, 2 * n)}$.`,
      `$\\dfrac{${pw(b, 2 * m)}}{${pw(b, 2 * n)}} = ${pw(b, `${2 * m} - ${2 * n}`)} = ${pw(b, 2 * (m - n))}$`,
      `$${pw(b, 2 * (m - n))} = ${N(ratio)}$`,
      `The area of square ${shape.a} is $${N(ratio)}$ times as large.`,
    ],
  };
}

const powersProblems = skill({
  id: 'm9-powers-problems',
  name: 'Solving problems with powers',
  description: 'Use powers to solve problems about areas of squares, volumes of cubes, doubling and repeated sharing, and folding paper.',
  outcomes: ['N1'],
  lessonId: 'm9-2-4',
  calculator: true,
  gen(rng, d: Difficulty) {
    if (d === 1) {
      const kind = rng.weighted([['area', 3], ['volume', 3], ['fold', 2]] as const);
      if (kind === 'area') return squareArea(rng);
      if (kind === 'volume') return cubeVolume(rng);
      return foldLayers(rng);
    }
    if (d === 2) {
      const kind = rng.weighted([['bacteria', 3], ['sharing', 3], ['thick', 2], ['surface', 2]] as const);
      if (kind === 'bacteria') return bacteria(rng);
      if (kind === 'sharing') return sharing(rng);
      if (kind === 'thick') return paperThickness(rng);
      return cubeSurface(rng);
    }
    const kind = rng.weighted([['time', 3], ['total', 3], ['folds', 2], ['cubes', 2], ['ratio', 2]] as const);
    if (kind === 'time') return doublingTime(rng);
    if (kind === 'total') return totalReached(rng);
    if (kind === 'folds') return foldsNeeded(rng);
    if (kind === 'cubes') return cubeCount(rng);
    return areaRatio(rng);
  },
});

export const POWERS_SKILLS: SkillDef[] = [powersEvaluate, exponentLaws, orderOpsPowers, powersProblems];
