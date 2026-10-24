/** Math 7 Unit 4 — Adding and Subtracting Integers (N6). Zero pairs, number lines, then the symbols. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, PlanePoint, SkillDef } from '../../../types.ts';

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

/** An integer with its sign: +5, -3, 0 (inside maths). */
const sg = (n: number) => (n > 0 ? `+${n}` : `${n}`);
/** An integer in brackets with its sign: (+5), (-3). */
const br = (n: number) => `(${sg(n)})`;
const MINUS = '−';
/** A plain-text label for a number line or table: +5, −3. */
const lab = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `${MINUS}${-n}` : '0');
/** A Celsius temperature inside maths. */
const cM = (t: number) => `${t}^\\circ\\text{C}`;
const deg = (t: number) => `$${cM(t)}$`;
/** Whole-dollar money in prose: \$45 or −\$45. */
const dol = (x: number) => (x < 0 ? `${MINUS}\\$${-x}` : `\\$${x}`);
/** Plain-text money for table cells (a leading - is drawn as a minus sign). */
const cellD = (x: number) => (x < 0 ? `-$${-x}` : `$${x}`);
const plural = (n: number, one: string, many: string) => (Math.abs(n) === 1 ? one : many);
/** An integer answer: the student types the value, not the calculation. */
const intPart = (v: number, opts: { label?: string; suffix?: string } = {}) => numPart(v, { ...opts, exact: false });

/**
 * Integer counters on a blank canvas: positive (+1) counters in the top row, negative (−1) counters
 * in the bottom row. With `pairs`, each zero pair is boxed.
 */
function counters(pos: number, neg: number, caption: string, pairs = false): Figure {
  const cols = Math.max(pos, neg, 1);
  const R = Math.max(cols + 1, 7);
  const off = (R - cols - 1) / 2;
  const points: PlanePoint[] = [];
  for (let i = 0; i < pos; i++) points.push({ x: off + i + 1, y: 2, color: 'brand', label: '+' });
  for (let i = 0; i < neg; i++) points.push({ x: off + i + 1, y: 1, color: 'accent', open: true, label: MINUS });
  const polylines: Array<{ points: Array<[number, number]>; color: 'muted' }> = [];
  if (pairs) {
    for (let i = 0; i < Math.min(pos, neg); i++) {
      const x0 = off + i + 0.62;
      const x1 = off + i + 1.38;
      polylines.push({ points: [[x0, 0.55], [x1, 0.55], [x1, 2.55], [x0, 2.55], [x0, 0.55]], color: 'muted' });
    }
  }
  return { type: 'plane', grid: { xMin: 0, xMax: R, yMin: 0, yMax: 3, step: R + 1 }, points, polylines, hideTickLabels: true, caption };
}

const COUNTER_KEY = 'Each filled counter (+) is $+1$. Each open counter ($-$) is $-1$.';

/**
 * A number line that shows 0 and every value. Short ranges label every tick; longer ones use
 * symmetric ranges whose labelled ticks fall on even numbers, multiples of 3 or multiples of 5.
 */
function numberLine(points: Array<{ value: number; label: string }>): Figure {
  const lo = Math.min(0, ...points.map((p) => p.value)) - 1;
  const hi = Math.max(0, ...points.map((p) => p.value)) + 1;
  if (hi - lo <= 11) {
    const pad = 11 - (hi - lo);
    const min = lo - Math.floor(pad / 2);
    return { type: 'numberLine', min, max: min + 11, step: 1, points };
  }
  const m = Math.max(...points.map((p) => Math.abs(p.value)));
  const R = [6, 8, 12, 20].find((r) => m <= r - 1);
  if (R !== undefined) return { type: 'numberLine', min: -R, max: R, step: 1, points };
  const step = [5, 10, 20, 50].find((s) => Math.ceil(hi / s) - Math.floor(lo / s) <= 10) ?? 100;
  return { type: 'numberLine', min: Math.floor(lo / step) * step - step, max: Math.ceil(hi / step) * step + step, step, points };
}

/** One sentence explaining a + b with zero pairs and the sign rules (a, b nonzero). */
function addRule(a: number, b: number): string[] {
  const r = a + b;
  const sum = `${br(a)} + ${br(b)}`;
  if (a > 0 === b > 0) {
    const s = Math.abs(a) + Math.abs(b);
    return a < 0
      ? [`Both integers are negative, so there are no zero pairs. Add the sizes, $${-a} + ${-b} = ${s}$, and keep the negative sign.`, `$${sum} = ${sg(r)}$`]
      : [`Both integers are positive: $${a} + ${b} = ${r}$.`, `$${sum} = ${sg(r)}$`];
  }
  if (r === 0) return [`$${sg(a)}$ and $${sg(b)}$ are opposites. They make $${Math.abs(a)}$ zero pairs, so the sum is $0$.`, `$${sum} = 0$`];
  const big = Math.abs(a) > Math.abs(b) ? a : b;
  const small = Math.min(Math.abs(a), Math.abs(b));
  const diff = Math.abs(Math.abs(a) - Math.abs(b));
  return [
    `The signs are different. $${small}$ zero ${plural(small, 'pair makes', 'pairs make')} $0$. Subtract the sizes: $${Math.max(Math.abs(a), Math.abs(b))} - ${small} = ${diff}$.`,
    `More counters are ${big > 0 ? 'positive' : 'negative'}, so the answer is ${big > 0 ? 'positive' : 'negative'}: $${sum} = ${sg(r)}$`,
  ];
}

/** Steps for a - b by adding the opposite. */
function subRule(a: number, b: number): string[] {
  return [`Subtracting is the same as adding the opposite. The opposite of $${sg(b)}$ is $${sg(-b)}$: $${br(a)} - ${br(b)} = ${br(a)} + ${br(-b)}$`, ...addRule(a, -b)];
}

const nz = (rng: Rng, lo: number, hi: number) => rng.nonZero(lo, hi);
const ADD_HINT = 'Same signs: add the sizes and keep the sign. Different signs: subtract the sizes and use the sign of the integer with the bigger size.';
const SUB_HINT = 'To subtract an integer, add its opposite: change $-$ to $+$ and change the sign of the second integer.';

// ---------------------------------------------------------------------------
// 4.1 Adding integers
// ---------------------------------------------------------------------------

function addModel(rng: Rng): Out {
  const same = rng.chance(0.25);
  if (same) {
    const sign = rng.sign();
    const [p, q] = [rng.int(1, 5), rng.int(1, 5)];
    const a = sign * p;
    const b = sign * q;
    return {
      prompt: `The counters model $${br(a)} + ${br(b)}$. ${COUNTER_KEY} What is the sum?`,
      figure: sign > 0 ? counters(p + q, 0, `${p} + ${q} positive counters`) : counters(0, p + q, `${p} + ${q} negative counters`),
      parts: [intPart(a + b)],
      hints: ['A zero pair is one $+1$ counter and one $-1$ counter. Are there any zero pairs?', `All the counters are ${sign > 0 ? 'positive' : 'negative'}. Count them.`],
      solution: [
        `$${br(a)}$ is $${p}$ ${sign > 0 ? 'positive' : 'negative'} ${plural(p, 'counter', 'counters')} and $${br(b)}$ is $${q}$ more.`,
        `There are no zero pairs. There are $${p + q}$ ${sign > 0 ? 'positive' : 'negative'} counters in all.`,
        `$${br(a)} + ${br(b)} = ${sg(a + b)}$`,
      ],
    };
  }
  const [p, q] = retry(() => [rng.int(1, 8), rng.int(1, 8)], ([x, y]) => x !== y);
  const posFirst = rng.chance(0.5);
  const a = posFirst ? p : -q;
  const b = posFirst ? -q : p;
  const r = p - q;
  const left = Math.abs(r);
  return {
    prompt: `The counters model $${br(a)} + ${br(b)}$. ${COUNTER_KEY} What is the sum?`,
    figure: counters(p, q, `${p} positive and ${q} negative counters`),
    parts: [intPart(r)],
    hints: ['A $+1$ counter and a $-1$ counter make a zero pair. A zero pair is worth $0$.', 'Match up as many zero pairs as you can and remove them. What is left?'],
    solution: [
      `There ${p === 1 ? 'is' : 'are'} $${p}$ positive ${plural(p, 'counter', 'counters')} and $${q}$ negative ${plural(q, 'counter', 'counters')}.`,
      `Make $${Math.min(p, q)}$ zero ${plural(Math.min(p, q), 'pair', 'pairs')} and remove ${Math.min(p, q) === 1 ? 'it' : 'them'}. Each zero pair is worth $0$.`,
      `$${left}$ ${r > 0 ? 'positive' : 'negative'} ${plural(left, 'counter is', 'counters are')} left.`,
      `$${br(a)} + ${br(b)} = ${sg(r)}$`,
    ],
  };
}

function addNumberLine(rng: Rng): Out {
  const { a, b } = retry(
    () => ({ a: nz(rng, -8, 8), b: nz(rng, -8, 8) }),
    ({ a, b }) => {
      const vals = [0, a, a + b];
      return (a < 0 || b < 0) && Math.abs(b) >= 2 && a + b !== 0 && Math.max(...vals) - Math.min(...vals) <= 9;
    },
    300,
  );
  const r = a + b;
  const dir = b > 0 ? 'right' : 'left';
  return {
    prompt: `Use the number line to find $${br(a)} + ${br(b)}$.`,
    figure: numberLine([{ value: a, label: 'start' }]),
    parts: [intPart(r)],
    hints: [`Start at $${sg(a)}$.`, `Adding a ${b > 0 ? 'positive' : 'negative'} integer moves ${dir}. Move $${Math.abs(b)}$ steps ${dir}.`],
    solution: [
      `Start at $${sg(a)}$.`,
      `Adding $${sg(b)}$ means moving $${Math.abs(b)}$ steps to the ${dir}.`,
      `You land on $${sg(r)}$.`,
      `$${br(a)} + ${br(b)} = ${sg(r)}$`,
    ],
  };
}

function addSymbols(rng: Rng): Out {
  const opposite = rng.chance(0.1);
  const { a, b } = retry(
    () => ({ a: nz(rng, -25, 25), b: nz(rng, -25, 25) }),
    ({ a, b }) => (a < 0 || b < 0) && Math.abs(a) >= 3 && Math.abs(b) >= 3 && (opposite ? a === -b : Math.abs(a) !== Math.abs(b)),
    300,
  );
  return {
    prompt: `Find $${br(a)} + ${br(b)}$.`,
    parts: [intPart(a + b)],
    hints: ['Look at the signs. Are they the same or different?', ADD_HINT],
    solution: addRule(a, b),
  };
}

function addD3(rng: Rng): Out {
  if (rng.chance(0.4)) {
    // Missing addend
    const { a, r } = retry(
      () => ({ a: nz(rng, -15, 15), r: nz(rng, -15, 15) }),
      ({ a, r }) => Math.abs(r - a) >= 3 && (a < 0 || r < 0) && a !== -r,
      300,
    );
    const x = r - a;
    return {
      prompt: `What integer goes in the box?\n\n$$${br(a)} + \\square = ${br(r)}$$`,
      figure: numberLine([{ value: a, label: 'start' }, { value: r, label: 'end' }]),
      parts: [intPart(x, { label: '$\\square =$' })],
      hints: [`On the number line, start at $${sg(a)}$ and end at $${sg(r)}$.`, 'Count the steps from the start to the end. Moving right means you added a positive integer. Moving left means you added a negative integer.'],
      solution: [
        `Start at $${sg(a)}$ and end at $${sg(r)}$.`,
        `From $${sg(a)}$ to $${sg(r)}$ is $${Math.abs(x)}$ steps to the ${x > 0 ? 'right' : 'left'}.`,
        `Moving ${x > 0 ? 'right' : 'left'} means adding a ${x > 0 ? 'positive' : 'negative'} integer, so the missing integer is $${sg(x)}$.`,
        `Check: $${br(a)} + ${br(x)} = ${sg(r)}$. It works.`,
      ],
    };
  }
  const n = rng.int(3, 4);
  const vals = retry(
    () => Array.from({ length: n }, () => nz(rng, -20, 20)),
    (v) => v.filter((x) => x < 0).length >= 1 && v.filter((x) => x > 0).length >= 1 && v.every((x) => Math.abs(x) >= 2) && v.reduce((s, x) => s + x, 0) !== 0,
    300,
  );
  const pos = vals.filter((x) => x > 0);
  const neg = vals.filter((x) => x < 0);
  const P = pos.reduce((s, x) => s + x, 0);
  const Ng = neg.reduce((s, x) => s + x, 0);
  const r = P + Ng;
  const expr = vals.map(br).join(' + ');
  return {
    prompt: `Find $${expr}$.`,
    parts: [intPart(r)],
    hints: ['You can add integers in any order. Group the positive integers and group the negative integers.', `Add each group, then add the two results. ${ADD_HINT}`],
    solution: [
      pos.length > 1 ? `Add the positive integers: $${pos.join(' + ')} = ${P}$.` : `The only positive integer is $${sg(P)}$.`,
      neg.length > 1 ? `Add the negative integers: $${neg.map(br).join(' + ')} = ${Ng}$.` : `The only negative integer is $${Ng}$.`,
      `Now add the two results: $${br(P)} + ${br(Ng)}$.`,
      ...addRule(P, Ng).slice(0, 1),
      `$${expr} = ${sg(r)}$`,
    ],
  };
}

const integerAdd = skill({
  id: 'm7-integer-add',
  name: 'Adding integers',
  description: 'Add integers with zero-pair models and number lines, then with the sign rules, including sums of several integers.',
  outcomes: ['N6'],
  lessonId: 'm7-4-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? addModel(rng) : addNumberLine(rng);
    if (d === 2) return addSymbols(rng);
    return addD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Subtracting integers
// ---------------------------------------------------------------------------

function subTakeAway(rng: Rng): Out {
  const sign = rng.sign();
  const p = rng.int(4, 9);
  const q = rng.int(2, p - 1);
  const a = sign * p;
  const b = sign * q;
  const word = sign > 0 ? 'positive' : 'negative';
  return {
    prompt: `The counters model $${br(a)}$. ${COUNTER_KEY} Use them to find $${br(a)} - ${br(b)}$.`,
    figure: sign > 0 ? counters(p, 0, `${p} positive counters`) : counters(0, p, `${p} negative counters`),
    parts: [intPart(a - b)],
    hints: ['Subtracting means taking away.', `Take away $${q}$ ${word} ${plural(q, 'counter', 'counters')}. How many are left?`],
    solution: [
      `$${br(a)}$ is $${p}$ ${word} counters.`,
      `Take away $${q}$ ${word} ${plural(q, 'counter', 'counters')}. That leaves $${p - q}$ ${word} ${plural(p - q, 'counter', 'counters')}.`,
      `$${br(a)} - ${br(b)} = ${sg(a - b)}$`,
    ],
  };
}

function subRewrite(rng: Rng): Out {
  const a = nz(rng, -12, 12);
  const b = retry(() => nz(rng, -12, 12), (x) => Math.abs(x) !== Math.abs(a));
  const right = `$${br(a)} + ${br(-b)}$`;
  const wrong = [`$${br(a)} + ${br(b)}$`, `$${br(-a)} + ${br(-b)}$`, `$${br(-a)} + ${br(b)}$`];
  return {
    prompt: `Which addition has the same value as $${br(a)} - ${br(b)}$?`,
    parts: [{ answer: mc(rng, right, wrong) }],
    hints: ['Subtracting an integer is the same as adding its opposite.', `Keep the first integer, $${sg(a)}$. Change the subtraction to addition, and change $${sg(b)}$ to its opposite.`],
    solution: [
      'To subtract, add the opposite. The first integer stays the same.',
      `The opposite of $${sg(b)}$ is $${sg(-b)}$.`,
      `$${br(a)} - ${br(b)} = ${br(a)} + ${br(-b)}$`,
    ],
  };
}

function subNumberLine(rng: Rng): Out {
  const { a, b } = retry(
    () => ({ a: nz(rng, -7, 7), b: nz(rng, -7, 7) }),
    ({ a, b }) => {
      const r = a - b;
      const vals = [0, a, r];
      return (b < 0 || r < 0) && Math.abs(b) >= 2 && r !== 0 && Math.max(...vals) - Math.min(...vals) <= 9;
    },
    300,
  );
  const r = a - b;
  const dir = -b > 0 ? 'right' : 'left';
  return {
    prompt: `Find $${br(a)} - ${br(b)}$. Use the number line to help.`,
    figure: numberLine([{ value: a, label: 'start' }]),
    parts: [intPart(r)],
    hints: [SUB_HINT, `$${br(a)} - ${br(b)} = ${br(a)} + ${br(-b)}$. Start at $${sg(a)}$ and move $${Math.abs(b)}$ steps ${dir}.`],
    solution: [
      `Add the opposite: $${br(a)} - ${br(b)} = ${br(a)} + ${br(-b)}$`,
      `Start at $${sg(a)}$. Adding $${sg(-b)}$ means moving $${Math.abs(b)}$ steps to the ${dir}.`,
      `You land on $${sg(r)}$.`,
      `$${br(a)} - ${br(b)} = ${sg(r)}$`,
    ],
  };
}

function subZeroPairs(rng: Rng): Out {
  // Start with |a| counters of one sign and take away counters that are not there.
  const { a, b } = retry(
    () => ({ a: nz(rng, -6, 6), b: nz(rng, -6, 6) }),
    ({ a, b }) => (a > 0 !== b > 0 || Math.abs(b) > Math.abs(a)) && Math.abs(a) + Math.abs(b) <= 9 && a !== b,
    300,
  );
  const r = a - b;
  const have = Math.abs(a);
  const aWord = a > 0 ? 'positive' : 'negative';
  const bWord = b > 0 ? 'positive' : 'negative';
  const sameSign = a > 0 === b > 0;
  // Zero pairs needed: if the signs differ, all |b|; if the same sign, |b| - |a|.
  const need = sameSign ? Math.abs(b) - have : Math.abs(b);
  const steps = [
    `Start with $${br(a)}$: $${have}$ ${aWord} ${plural(have, 'counter', 'counters')}.`,
    sameSign
      ? `You need to take away $${Math.abs(b)}$ ${bWord} counters, but there ${have === 1 ? 'is' : 'are'} only $${have}$. Add $${need}$ zero ${plural(need, 'pair', 'pairs')}. Adding zero pairs does not change the value.`
      : `You need to take away $${Math.abs(b)}$ ${bWord} ${plural(Math.abs(b), 'counter', 'counters')}, but there are none. Add $${need}$ zero ${plural(need, 'pair', 'pairs')}. Adding zero pairs does not change the value.`,
    `Now take away $${Math.abs(b)}$ ${bWord} ${plural(Math.abs(b), 'counter', 'counters')}. What is left is $${Math.abs(r)}$ ${r > 0 ? 'positive' : 'negative'} ${plural(r, 'counter', 'counters')}.`,
    `$${br(a)} - ${br(b)} = ${sg(r)}$`,
  ];
  return {
    prompt: `The counters model $${br(a)}$. ${COUNTER_KEY} Use the counters to find $${br(a)} - ${br(b)}$.`,
    figure: a > 0 ? counters(have, 0, `${have} positive counters`) : counters(0, have, `${have} negative counters`),
    parts: [intPart(r)],
    hints: [`You need to take away ${Math.abs(b)} ${bWord} ${plural(Math.abs(b), 'counter', 'counters')}. Are there enough?`, 'Add zero pairs (one $+1$ and one $-1$) until you can take them away. A zero pair is worth $0$, so the value does not change.'],
    solution: steps,
  };
}

function subSymbols(rng: Rng): Out {
  const { a, b } = retry(
    () => ({ a: nz(rng, -30, 30), b: nz(rng, -30, 30) }),
    ({ a, b }) => (a < 0 || b < 0) && Math.abs(a) >= 3 && Math.abs(b) >= 3 && a !== b && a - b !== 0,
    300,
  );
  return {
    prompt: `Find $${br(a)} - ${br(b)}$.`,
    parts: [intPart(a - b)],
    hints: [SUB_HINT, ADD_HINT],
    solution: subRule(a, b),
  };
}

function subD3(rng: Rng): Out {
  if (rng.chance(0.3)) {
    const { a, r } = retry(
      () => ({ a: nz(rng, -12, 12), r: nz(rng, -12, 12) }),
      ({ a, r }) => Math.abs(a - r) >= 3 && (a < 0 || r < 0),
      300,
    );
    const x = a - r;
    return {
      prompt: `What integer goes in the box?\n\n$$${br(a)} - \\square = ${br(r)}$$`,
      parts: [intPart(x, { label: '$\\square =$' })],
      hints: ['Subtracting an integer is the same as adding its opposite. What do you add to the first integer to get the answer?', `Find the move from $${sg(a)}$ to $${sg(r)}$ on a number line. The missing integer is the opposite of that move.`],
      solution: [
        `Subtracting the missing integer is the same as adding its opposite: $${br(a)} + (\\text{opposite}) = ${br(r)}$.`,
        `From $${sg(a)}$ to $${sg(r)}$ is $${Math.abs(r - a)}$ steps to the ${r - a > 0 ? 'right' : 'left'}, so the opposite is $${sg(r - a)}$.`,
        `The missing integer is the opposite of $${sg(r - a)}$, which is $${sg(x)}$.`,
        `Check: $${br(a)} - ${br(x)} = ${br(a)} + ${br(-x)} = ${sg(r)}$. It works.`,
      ],
    };
  }
  const n = rng.int(3, 4);
  const { vals, ops } = retry(
    () => ({ vals: Array.from({ length: n }, () => nz(rng, -15, 15)), ops: Array.from({ length: n - 1 }, () => rng.pick(['+', '-'] as const)) }),
    ({ vals, ops }) => ops.filter((o) => o === '-').length >= 1 && ops.some((o, i) => o === '-' && vals[i + 1] < 0) && vals.every((x) => Math.abs(x) >= 2),
    300,
  );
  const expr = vals.map((v, i) => (i === 0 ? br(v) : ` ${ops[i - 1]} ${br(v)}`)).join('');
  const addTerms = vals.map((v, i) => (i === 0 ? v : ops[i - 1] === '-' ? -v : v));
  const addExpr = addTerms.map(br).join(' + ');
  const pos = addTerms.filter((x) => x > 0);
  const neg = addTerms.filter((x) => x < 0);
  const P = pos.reduce((s, x) => s + x, 0);
  const Ng = neg.reduce((s, x) => s + x, 0);
  const r = P + Ng;
  const steps = [`Change each subtraction to adding the opposite: $${expr} = ${addExpr}$`];
  if (pos.length && neg.length) {
    steps.push(
      pos.length > 1 ? `Add the positive integers: $${pos.join(' + ')} = ${P}$.` : `The only positive integer is $${sg(P)}$.`,
      neg.length > 1 ? `Add the negative integers: $${neg.map(br).join(' + ')} = ${Ng}$.` : `The only negative integer is $${Ng}$.`,
      ...addRule(P, Ng),
    );
  } else {
    steps.push(`All the integers are ${pos.length ? 'positive' : 'negative'}. Add them: $${addExpr} = ${sg(r)}$`);
  }
  steps.push(`$${expr} = ${sg(r)}$`);
  return {
    prompt: `Find $${expr}$.`,
    parts: [intPart(r)],
    hints: [`${SUB_HINT} Rewrite every subtraction as an addition first.`, 'Then group the positive integers and the negative integers, and add.'],
    solution: steps,
  };
}

const integerSubtract = skill({
  id: 'm7-integer-subtract',
  name: 'Subtracting integers',
  description: 'Subtract integers with counters, zero pairs and number lines, and by adding the opposite.',
  outcomes: ['N6'],
  lessonId: 'm7-4-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick(['take', 'rewrite', 'line'] as const);
      return k === 'take' ? subTakeAway(rng) : k === 'rewrite' ? subRewrite(rng) : subNumberLine(rng);
    }
    if (d === 2) return rng.chance(0.35) ? subZeroPairs(rng) : subSymbols(rng);
    return subD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Solving integer problems
// ---------------------------------------------------------------------------

const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Northfield', 'Clearwater'];
const PLUS_MINUS = 'In hockey, a player’s plus-minus goes up $1$ for each even-strength goal their team scores while they are on the ice, and down $1$ for each even-strength goal the other team scores while they are on the ice.';
const GOLF = 'In golf, a score is written compared to par: $-2$ means 2 strokes under par and $+3$ means 3 strokes over par. The lower the score, the better.';

function problemD1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['drop', 'rise', 'hockey', 'golf', 'bank', 'diver'] as const);
  if (kind === 'drop') {
    const t = rng.int(1, 8);
    const dd = rng.int(t + 2, t + 9);
    const r = t - dd;
    return {
      prompt: `At noon in ${town}, the temperature was ${deg(t)}. By evening, it had dropped $${dd}$ degrees. What was the temperature in the evening?`,
      figure: numberLine([{ value: t, label: 'noon' }]),
      parts: [intPart(r, { suffix: '°C' })],
      hints: ['A drop of $' + dd + '$ degrees is a change of $' + -dd + '$.', `Find $${br(t)} + ${br(-dd)}$. Count down $${t}$ degrees to reach $0$, then keep going.`],
      solution: [`A drop of $${dd}$ degrees is $${sg(-dd)}$. Write the sum: $${br(t)} + ${br(-dd)}$.`, ...addRule(t, -dd), `The temperature in the evening was ${deg(r)}.`],
    };
  }
  if (kind === 'rise') {
    const t = rng.int(-15, -3);
    const c = retry(() => rng.int(2, 12), (x) => x !== -t);
    const r = t + c;
    return {
      prompt: `At 7 a.m. in ${town}, the temperature was ${deg(t)}. By noon, it had risen $${c}$ degrees. What was the temperature at noon?`,
      figure: numberLine([{ value: t, label: '7 a.m.' }]),
      parts: [intPart(r, { suffix: '°C' })],
      hints: [`A rise of $${c}$ degrees is a change of $+${c}$.`, `Find $${br(t)} + ${br(c)}$. On the number line, start at $${t}$ and move $${c}$ steps right.`],
      solution: [`A rise of $${c}$ degrees is $+${c}$. Write the sum: $${br(t)} + ${br(c)}$.`, ...addRule(t, c), `The temperature at noon was ${deg(r)}.`],
    };
  }
  if (kind === 'hockey') {
    const f = rng.int(0, 4);
    const g = retry(() => rng.int(0, 5), (x) => x !== f && f + x >= 2);
    const r = f - g;
    return {
      prompt: `${PLUS_MINUS} In one game, ${name} was on the ice for $${f}$ even-strength ${plural(f, 'goal', 'goals')} by ${name}’s team and $${g}$ even-strength ${plural(g, 'goal', 'goals')} by the other team. What was ${name}’s plus-minus for the game?`,
      parts: [intPart(r)],
      hints: [`Each goal for the team is $+1$ and each goal against is $-1$.`, `Find $${br(f)} + ${br(-g)}$.`],
      solution: [`Goals for: $${sg(f)}$. Goals against: $${sg(-g)}$.`, ...(f === 0 ? [`$0 + ${br(-g)} = ${sg(r)}$`] : addRule(f, -g)), `${name}’s plus-minus for the game was $${sg(r)}$.`],
    };
  }
  if (kind === 'golf') {
    const { a, b } = retry(() => ({ a: nz(rng, -4, 4), b: nz(rng, -4, 4) }), ({ a, b }) => a > 0 !== b > 0 && a + b !== 0);
    const r = a + b;
    return {
      prompt: `${GOLF} ${name} scored $${sg(a)}$ on the first nine holes and $${sg(b)}$ on the last nine holes. What was ${name}’s score for all 18 holes?`,
      parts: [intPart(r)],
      hints: ['Add the two scores.', `Find $${br(a)} + ${br(b)}$. ${ADD_HINT}`],
      solution: [`Add the two scores: $${br(a)} + ${br(b)}$.`, ...addRule(a, b), `${name}’s score was $${sg(r)}$, which is ${Math.abs(r)} ${plural(r, 'stroke', 'strokes')} ${r < 0 ? 'under' : 'over'} par.`],
    };
  }
  if (kind === 'bank') {
    const B = 5 * rng.int(2, 8);
    const S = B + 5 * rng.int(1, 6);
    const item = rng.pick(['a hockey stick', 'a new phone case', 'a pair of runners', 'a concert ticket', 'a video game']);
    return {
      prompt: `${name} has ${dol(B)} in a bank account. ${name} spends \\$${S} on ${item} with a debit card. The bank lets the balance go below \\$0. What is the new balance, in dollars?`,
      parts: [intPart(B - S, { label: 'Balance, in dollars:' })],
      hints: ['Spending money is a negative change.', `Find $${br(B)} + ${br(-S)}$.`],
      solution: [`Spending \\$${S} is a change of $${sg(-S)}$: $${br(B)} + ${br(-S)}$.`, ...addRule(B, -S), `The new balance is ${dol(B - S)}. ${name} owes the bank \\$${S - B}.`],
    };
  }
  const a = rng.int(6, 14);
  const up = rng.chance(0.5);
  const c = up ? rng.int(2, a - 2) : rng.int(2, 6);
  const r = up ? -a + c : -a - c;
  const lake = rng.pick(['Willow Lake', 'Heron Lake', 'Otter Lake', 'Silver Lake']);
  return {
    prompt: `A diver in ${lake} is at $${-a}\\ \\text{m}$, which means $${a}$ m below the surface. She swims ${up ? 'up' : 'down'} $${c}$ m. What integer gives her new position, in metres?`,
    figure: numberLine([{ value: -a, label: 'diver' }, { value: 0, label: 'surface' }]),
    parts: [intPart(r, { suffix: 'm' })],
    hints: ['Up is a positive change. Down is a negative change.', `Find $${br(-a)} + ${br(up ? c : -c)}$.`],
    solution: [`${up ? 'Up' : 'Down'} $${c}$ m is $${sg(up ? c : -c)}$: $${br(-a)} + ${br(up ? c : -c)}$.`, ...addRule(-a, up ? c : -c), `Her new position is $${r}\\ \\text{m}$.`],
  };
}

function problemD2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['wind', 'towns', 'cold', 'elevation', 'golf', 'bank', 'hockey'] as const);
  const diffSteps = (hi: number, lo: number) => [
    `Difference = higher $-$ lower: $${br(hi)} - ${br(lo)}$`,
    ...subRule(hi, lo),
  ];
  if (kind === 'wind') {
    const t1 = rng.int(-28, -6);
    const t2 = rng.int(1, 14);
    return {
      prompt: `In winter, a warm wind can blow down from the mountains. One morning in a town near the mountains, the temperature was ${deg(t1)}. After the warm wind arrived, it was ${deg(t2)}. By how many degrees did the temperature rise?`,
      parts: [intPart(t2 - t1, { suffix: 'degrees' })],
      hints: ['The change is the new temperature minus the old temperature.', `Find $${br(t2)} - ${br(t1)}$. Subtracting a negative is the same as adding a positive.`],
      solution: [`Change = new $-$ old: $${br(t2)} - ${br(t1)}$`, ...subRule(t2, t1), `Check by counting: $${-t1}$ degrees up to $0$, then $${t2}$ more makes $${t2 - t1}$.`, `The temperature rose $${t2 - t1}$ degrees.`],
    };
  }
  if (kind === 'towns') {
    const [ta, tb] = rng.sample(TOWNS, 2);
    const [x, y] = retry(() => [rng.int(-35, -2), rng.int(-35, 5)], ([p, q]) => Math.abs(p - q) >= 5);
    const hi = Math.max(x, y);
    const lo = Math.min(x, y);
    const warm = hi === x ? ta : tb;
    const cold = hi === x ? tb : ta;
    return {
      prompt: `On a January morning, it was ${deg(x)} in ${ta} and ${deg(y)} in ${tb}. How many degrees warmer was it in ${warm} than in ${cold}?`,
      parts: [intPart(hi - lo, { suffix: 'degrees' })],
      hints: ['Find the difference between the two temperatures: higher minus lower.', `Find $${br(hi)} - ${br(lo)}$ by adding the opposite.`],
      solution: [...diffSteps(hi, lo), `It was $${hi - lo}$ degrees warmer in ${warm}.`],
    };
  }
  if (kind === 'cold') {
    const town = rng.pick(TOWNS);
    const t = rng.int(-20, 6);
    const dd = rng.int(8, 22);
    const r = t - dd;
    return {
      prompt: `The temperature in ${town} was ${deg(t)} at sunset. A cold front made it drop $${dd}$ degrees overnight. What was the temperature in the morning?`,
      parts: [intPart(r, { suffix: '°C' })],
      hints: ['A drop means subtract.', `Find $${br(t)} - ${br(dd)}$ by adding the opposite.`],
      solution: [`A drop means subtract: $${br(t)} - ${br(dd)}$`, ...subRule(t, dd), `The temperature in the morning was ${deg(r)}.`],
    };
  }
  if (kind === 'elevation') {
    const below = rng.int(5, 40);
    const above = rng.int(10, 60);
    const c = rng.pick([
      { low: `a scuba diver is at $${-below}$ m (below the surface of the lake)`, high: `an osprey is flying at $${sg(above)}$ m (above the surface)`, what: 'the osprey', other: 'the diver' },
      { low: `a fish is swimming at $${-below}$ m (below the surface of the river)`, high: `a bird is sitting in a tree at $${sg(above)}$ m (above the surface)`, what: 'the bird', other: 'the fish' },
    ]);
    return {
      prompt: `Heights are measured from the surface of the water, which is $0$ m. At the same moment, ${c.low} and ${c.high}. How far above ${c.other} is ${c.what}?`,
      parts: [intPart(above + below, { suffix: 'm' })],
      hints: ['Find the difference: higher position minus lower position.', `Find $${br(above)} - ${br(-below)}$.`],
      solution: [...diffSteps(above, -below), `${c.what.charAt(0).toUpperCase() + c.what.slice(1)} is $${above + below}$ m above ${c.other}.`],
    };
  }
  if (kind === 'golf') {
    const other = rng.pick(NAMES.filter((n) => n !== name));
    const [a, b] = retry(() => [rng.int(-8, 6), rng.int(-8, 6)], ([p, q]) => p !== q && (p < 0 || q < 0) && Math.abs(p - q) >= 2);
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const winner = lo === a ? name : other;
    return {
      prompt: `${GOLF} At a tournament in ${rng.pick(TOWNS)}, ${name} finished at $${sg(a)}$ and ${other} finished at $${sg(b)}$. How many strokes better was ${winner}’s score?`,
      parts: [intPart(hi - lo, { suffix: 'strokes' })],
      hints: ['The lower score is better. Find the difference between the scores.', `Find $${br(hi)} - ${br(lo)}$.`],
      solution: [...diffSteps(hi, lo), `${winner}’s score was $${hi - lo}$ strokes better.`],
    };
  }
  if (kind === 'bank') {
    const owe = 5 * rng.int(3, 20);
    const now = 5 * rng.int(2, 30);
    return {
      prompt: `${name}’s bank account was overdrawn: the balance was ${dol(-owe)}. After a deposit, the balance is ${dol(now)}. How much money did ${name} deposit, in dollars?`,
      parts: [intPart(now + owe, { label: 'Deposit, in dollars:' })],
      hints: ['The deposit is the change in the balance: new balance minus old balance.', `Find $${br(now)} - ${br(-owe)}$.`],
      solution: [`Change = new $-$ old: $${br(now)} - ${br(-owe)}$`, ...subRule(now, -owe), `${name} deposited \\$${now + owe}: \\$${owe} to pay back what was owed and \\$${now} more.`],
    };
  }
  const start = rng.int(-6, 4);
  const end = retry(() => rng.int(-8, 8), (x) => Math.abs(x - start) >= 3 && (x < 0 || start < 0));
  const ch = end - start;
  return {
    prompt: `${PLUS_MINUS} At the start of December, ${name}’s season plus-minus was $${sg(start)}$. At the end of December, it was $${sg(end)}$. What was the change in ${name}’s plus-minus during December?`,
    parts: [intPart(ch)],
    hints: ['Change = new value minus old value.', `Find $${br(end)} - ${br(start)}$.`],
    solution: [`Change = new $-$ old: $${br(end)} - ${br(start)}$`, ...(start === 0 ? [`$${br(end)} - 0 = ${sg(end)}$`] : subRule(end, start)), `The change was $${sg(ch)}$: ${name}’s plus-minus went ${ch > 0 ? 'up' : 'down'} by $${Math.abs(ch)}$.`],
  };
}

function problemD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['day', 'hockey', 'golf', 'bank', 'hike'] as const);
  const runSteps = (start: number, ch: number[], labels: string[]) => {
    const steps: string[] = [];
    let v = start;
    ch.forEach((c, j) => {
      const nv = v + c;
      steps.push(`${labels[j]}: $${v === 0 ? '0' : br(v)} + ${br(c)} = ${sg(nv)}$`);
      v = nv;
    });
    return { steps, end: v };
  };
  if (kind === 'day') {
    const town = rng.pick(TOWNS);
    const t0 = rng.int(-24, -6);
    const times = ['9 a.m.', '1 p.m.', '5 p.m.', '10 p.m.'];
    const ch = retry(
      () => [rng.int(3, 12), rng.int(2, 9), -rng.int(3, 12), -rng.int(2, 10)],
      (v) => t0 + v[0] + v[1] > 0 && t0 + v[0] + v[1] + v[2] + v[3] < 0 && t0 + v[0] + v[1] + v[2] + v[3] !== t0,
      300,
    );
    const { steps, end } = runSteps(t0, ch, times);
    return {
      prompt: `At 6 a.m. in ${town}, the temperature was ${deg(t0)}. The table shows how the temperature changed during the day. What was the temperature at 10 p.m.?`,
      figure: { type: 'table', headers: ['Time', 'Change (°C)'], rows: times.map((tm, j) => [tm, lab(ch[j])]) },
      parts: [intPart(end, { suffix: '°C' })],
      hints: ['Start at the 6 a.m. temperature and go down the table one row at a time.', 'Add each change. A negative change is a drop.'],
      solution: [`Start: ${deg(t0)}`, ...steps, `The temperature at 10 p.m. was ${deg(end)}.`],
    };
  }
  if (kind === 'hockey') {
    const games = ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'];
    const vals = retry(
      () => games.map(() => rng.int(-3, 3)),
      (v) => v.filter((x) => x < 0).length >= 2 && v.filter((x) => x > 0).length >= 1 && v.reduce((s, x) => s + x, 0) !== 0,
      300,
    );
    const pos = vals.filter((x) => x > 0);
    const neg = vals.filter((x) => x < 0);
    const P = pos.reduce((s, x) => s + x, 0);
    const Ng = neg.reduce((s, x) => s + x, 0);
    const total = P + Ng;
    const best = Math.max(...vals);
    const worst = Math.min(...vals);
    return {
      prompt: `${PLUS_MINUS} The table shows ${name}’s plus-minus in five games. (a) What is ${name}’s total plus-minus for the five games? (b) How much better was ${name}’s best game than ${name}’s worst game?`,
      figure: { type: 'table', headers: ['Game', 'Plus-minus'], rows: games.map((g, j) => [g, lab(vals[j])]) },
      parts: [intPart(total, { label: '(a) Total:' }), intPart(best - worst, { label: '(b) Difference:' })],
      hints: ['(a) Add all five integers. Group the positive ones and the negative ones.', '(b) Find the best (highest) and worst (lowest) games. Subtract: best $-$ worst.'],
      solution: [
        `(a) Positive games: $${pos.join(' + ')} = ${P}$. Negative games: $${neg.map(br).join(' + ')} = ${Ng}$.${vals.includes(0) ? ' A game at $0$ adds nothing.' : ''}`,
        `Total: $${br(P)} + ${br(Ng)} = ${sg(total)}$`,
        `(b) Best game: $${sg(best)}$. Worst game: $${sg(worst)}$.`,
        `$${br(best)} - ${br(worst)} = ${br(best)} + ${br(-worst)} = ${sg(best - worst)}$`,
        `${name}’s total plus-minus is $${sg(total)}$, and the best game was $${best - worst}$ better than the worst game.`,
      ],
    };
  }
  if (kind === 'golf') {
    const rounds = ['Round 1', 'Round 2', 'Round 3', 'Round 4'];
    const other = rng.pick(NAMES.filter((n) => n !== name));
    const vals = retry(
      () => rounds.map(() => rng.int(-5, 4)),
      (v) => v.filter((x) => x < 0).length >= 1 && v.filter((x) => x > 0).length >= 1 && v.every((x) => x !== 0),
      300,
    );
    const total = vals.reduce((s, x) => s + x, 0);
    const otherTotal = retry(() => rng.int(-8, 6), (x) => x !== total && Math.abs(x - total) >= 2);
    const winner = total < otherTotal ? name : other;
    const pos = vals.filter((x) => x > 0);
    const neg = vals.filter((x) => x < 0);
    const P = pos.reduce((s, x) => s + x, 0);
    const Ng = neg.reduce((s, x) => s + x, 0);
    const hi = Math.max(total, otherTotal);
    const lo = Math.min(total, otherTotal);
    return {
      prompt: `${GOLF} The table shows ${name}’s scores for four rounds at a junior golf tournament. ${other}’s total score for the four rounds was $${sg(otherTotal)}$. (a) What was ${name}’s total score? (b) Who won? (c) By how many strokes?`,
      figure: { type: 'table', headers: ['Round', 'Score'], rows: rounds.map((r, j) => [r, lab(vals[j])]) },
      parts: [intPart(total, { label: '(a) Total:' }), { label: '(b) Winner:', answer: fixedChoice([name, other], winner === name ? 0 : 1) }, intPart(hi - lo, { label: '(c) Strokes:' })],
      hints: ['(a) Add the four scores. Group the positive and the negative scores.', '(b) The lower total wins. (c) Subtract: higher total $-$ lower total.'],
      solution: [
        `(a) $${vals.map(br).join(' + ')}$. Positive: $${pos.join(' + ')} = ${P}$. Negative: $${neg.map(br).join(' + ')} = ${Ng}$.`,
        `Total: $${br(P)} + ${br(Ng)} = ${sg(total)}$`,
        `(b) ${name}: $${sg(total)}$. ${other}: $${sg(otherTotal)}$. The lower score is $${sg(lo)}$, so ${winner} won.`,
        `(c) $${br(hi)} - ${br(lo)} = ${br(hi)} + ${br(-lo)} = ${sg(hi - lo)}$`,
        `${winner} won by $${hi - lo}$ ${plural(hi - lo, 'stroke', 'strokes')}.`,
      ],
    };
  }
  if (kind === 'bank') {
    const start = 5 * rng.int(2, 16);
    const labels = ['Bought a hockey stick', 'Birthday money', 'Paid a phone bill', 'Pay from babysitting'];
    const ch = retry(
      () => [-5 * rng.int(8, 30), 5 * rng.int(4, 15), -5 * rng.int(6, 14), 5 * rng.int(4, 20)],
      (v) => {
        const b1 = start + v[0];
        const b3 = b1 + v[1] + v[2];
        const end = b3 + v[3];
        return b1 < 0 && end !== 0 && end > -100 && (b3 < 0 || b1 + v[1] < 0);
      },
      300,
    );
    const { steps, end } = runSteps(start, ch, labels);
    return {
      prompt: `The table shows the changes to ${name}’s bank account in one month. The account started at ${dol(start)}. The bank lets the balance go below \\$0. What was the balance at the end of the month, in dollars?`,
      figure: { type: 'table', headers: ['Transaction', 'Change'], rows: labels.map((l, j) => [l, ch[j] < 0 ? cellD(ch[j]) : `+$${ch[j]}`]) },
      parts: [intPart(end, { label: 'End balance, in dollars:' })],
      hints: ['Start with the starting balance and go down the table one row at a time.', 'Add each change. Money spent is a negative change; money received is positive.'],
      solution: [`Start: $${sg(start)}$`, ...steps, `The balance at the end of the month was ${dol(end)}.`],
    };
  }
  const labels = ['Climb to the lookout', 'Down to the creek', 'Down into the canyon', 'Climb out of the canyon'];
  const ch = retry(
    () => [10 * rng.int(5, 15), -10 * rng.int(3, 9), -10 * rng.int(6, 15), 10 * rng.int(2, 8)],
    (v) => v[0] + v[1] > 0 && v[0] + v[1] + v[2] < 0 && v.reduce((s, x) => s + x, 0) < 0,
    300,
  );
  const { steps, end } = runSteps(0, ch, labels);
  return {
    prompt: `${name} goes on a hike in the hills. Heights are measured from the parking lot, which is at $0$ m. The table shows each change in height on the hike. Where does ${name} finish, compared with the parking lot? Write your answer as an integer.`,
    figure: { type: 'table', headers: ['Part of the hike', 'Change (m)'], rows: labels.map((l, j) => [l, lab(ch[j])]) },
    parts: [intPart(end, { suffix: 'm' })],
    hints: ['Start at $0$ m and go down the table one row at a time.', 'Add each change. Going down is a negative change.'],
    solution: [`Start: $0$ m`, ...steps, `${name} finishes at $${end}\\ \\text{m}$, which is $${-end}$ m below the parking lot.`],
  };
}

const integerProblems = skill({
  id: 'm7-integer-problems',
  name: 'Solving integer problems',
  description: 'Solve problems about temperatures, heights, hockey plus-minus, golf scores and bank balances by adding and subtracting integers.',
  outcomes: ['N6'],
  lessonId: 'm7-4-3',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? problemD1(rng) : d === 2 ? problemD2(rng) : problemD3(rng);
  },
});

export const INTEGERS_SKILLS: SkillDef[] = [integerAdd, integerSubtract, integerProblems];
