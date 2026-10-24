/** Math 5 Unit 2 — Adding and Subtracting (N2): standard algorithms within 1 000 000 and to thousandths, estimation, problems. */
import { mc, numPart, retry, skill } from '../../helpers.ts';
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
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A whole number of the smallest place as a digit string with dp decimal places: str(4035, 3) = "4.035". */
function str(units: number, dp: number): string {
  if (dp === 0) return String(units);
  const s = String(units).padStart(dp + 1, '0');
  return `${s.slice(0, -dp)}.${s.slice(-dp)}`;
}
/** Drop zeros at the right end of a decimal. */
const trim = (s: string) => (s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s);
/** The whole part grouped with thin spaces when it has five or more digits. */
function tex(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length >= 5 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** A number as maths, written the short way (no zeros at the right end). */
const nm = (units: number, dp: number) => tex(trim(str(units, dp)));
const m$ = (units: number, dp: number) => `$${nm(units, dp)}$`;
/** Money in prose (never inside $...$): \$12.50. Amounts stay below \$10 000, so no digit groups are needed. */
const money = (cents: number) => `\\$${str(cents, 2)}`;
/** Exact decimal places of a value written the short way. */
const dpOf = (units: number, dp: number) => (trim(str(units, dp)).split('.')[1] ?? '').length;

/** An exact answer typed as a plain number; decimals show as decimals on review screens. */
function exactPart(units: number, dp: number, suffix?: string, label?: string): Part {
  const s = trim(str(units, dp));
  return {
    label,
    suffix,
    answer: { kind: 'numeric', value: Number(s), allowExpression: false, exact: s, ...(s.includes('.') && { display: 'decimal' as const, asDecimal: true }) },
  };
}
/** A money answer in dollars, graded to the cent. */
const moneyPart = (cents: number): Part => numPart(cents / 100, { decimals: 2, tolerance: 0.011, label: '\\$' });

const PLACE: Record<number, string> = {
  6: 'millions', 5: 'hundred thousands', 4: 'ten thousands', 3: 'thousands', 2: 'hundreds', 1: 'tens', 0: 'ones',
  [-1]: 'tenths', [-2]: 'hundredths', [-3]: 'thousandths',
};
const ONE_OF: Record<number, string> = {
  6: 'million', 5: 'hundred thousand', 4: 'ten thousand', 3: 'thousand', 2: 'hundred', 1: 'ten', 0: 'one',
  [-1]: 'tenth', [-2]: 'hundredth', [-3]: 'thousandth',
};

// Column layouts for the standard algorithms ----------------------------------

/** Digits of a number in units by column (column 0 is the smallest place); always includes the ones digit. */
function cols(units: number, dp: number): number[] {
  return String(units).padStart(dp + 1, '0').split('').reverse().map(Number);
}

/**
 * One row of a column layout: W digit columns from left to right, a decimal point after the ones,
 * empty columns as \phantom{0}. `deco` can dress a digit (a carry above it, a crossed-out digit).
 */
function row(units: number | null, dp: number, W: number, deco: (c: number, d: string) => string = (_c, d) => d): string {
  const ds = units === null ? [] : cols(units, dp);
  const out: string[] = [];
  for (let c = W - 1; c >= 0; c--) {
    // The decimal point sits right after the ones digit; columns are a thin space apart.
    out.push(deco(c, c < ds.length ? String(ds[c]) : '\\phantom{0}') + (c === dp && dp > 0 ? '.' : ''));
  }
  return out.join('\\,');
}

const layout = (rows: string[]) => `$$\\begin{array}{r}${rows.join(' \\\\ ')}\\end{array}$$`;

interface ColumnWork {
  /** The display layout. */
  tex: string;
  /** One line of words per column. */
  lines: string[];
  result: number;
}

/** Add numbers (all in units with dp decimal places) with the standard algorithm. */
function addColumns(nums: number[], dp: number): ColumnWork {
  const result = nums.reduce((a, b) => a + b, 0);
  const W = Math.max(...[...nums, result].map((n) => cols(n, dp).length));
  const ds = nums.map((n) => cols(n, dp));
  const carryInto: number[] = new Array(W + 1).fill(0);
  const lines: string[] = [];
  let carry = 0;
  for (let c = 0; c < W; c++) {
    const present = ds.map((d) => (c < d.length ? d[c] : null)).filter((x): x is number => x !== null);
    const terms = [...(carry ? [carry] : []), ...present];
    const s = terms.reduce((a, b) => a + b, 0);
    const name = cap(PLACE[c - dp]);
    if (terms.length === 1) lines.push(`${name}: ${carry && !present.length ? `write the carried $${s}$` : `bring down the $${s}$`}.`);
    else lines.push(`${name}: $${terms.join(' + ')} = ${s}$.${s >= 10 ? ` Write $${s % 10}$ and carry $${Math.floor(s / 10)}$ to the ${PLACE[c + 1 - dp]}.` : ''}`);
    carry = Math.floor(s / 10);
    carryInto[c + 1] = carry;
  }
  const top = row(nums[0], dp, W, (c, d) => (carryInto[c] ? `\\overset{${carryInto[c]}}{${d}}` : d));
  const rest = nums.slice(1).map((n, i) => `${i === nums.length - 2 ? '+\\ ' : ''}${row(n, dp, W)}`);
  return { tex: layout([top, ...rest.slice(0, -1), `${rest[rest.length - 1]} \\\\ \\hline ${row(result, dp, W)}`]), lines, result };
}

/** Subtract b from a (units, a > b) with the standard algorithm and regrouping. */
function subColumns(a: number, b: number, dp: number): ColumnWork {
  const result = a - b;
  const ta = cols(a, dp);
  const tb = cols(b, dp);
  const W = ta.length;
  const w = [...ta];
  const lines: string[] = [];
  for (let c = 0; c < W; c++) {
    const bd = c < tb.length ? tb[c] : 0;
    const name = cap(PLACE[c - dp]);
    if (w[c] < bd) {
      let j = c + 1;
      while (w[j] === 0) j++;
      const chain: string[] = [];
      for (let k = j; k > c; k--) chain.push(`$1$ ${ONE_OF[k - dp]} as $10$ ${PLACE[k - 1 - dp]}`);
      const before = w[c];
      w[j] -= 1;
      for (let k = j - 1; k > c; k--) w[k] = 9;
      w[c] += 10;
      lines.push(
        j === c + 1
          ? `${name}: $${before} < ${bd}$, so regroup ${chain[0]}. Now $${w[c]} - ${bd} = ${w[c] - bd}$.`
          : `${name}: $${before} < ${bd}$. There is a $0$ next door, so regroup ${chain.join(', then ')}. Now $${w[c]} - ${bd} = ${w[c] - bd}$.`,
      );
    } else if (c >= tb.length) {
      lines.push(w[c] === 0 && c === W - 1 ? `${name}: the digit is now $0$, so there is nothing to write.` : `${name}: nothing to subtract, so bring down the $${w[c]}$.`);
    } else {
      lines.push(`${name}: $${w[c]} - ${bd} = ${w[c] - bd}$.`);
    }
  }
  const top = row(a, dp, W, (c, d) => (w[c] !== ta[c] ? `\\overset{${w[c]}}{\\cancel{${d}}}` : d));
  return { tex: layout([top, `-\\ ${row(b, dp, W)} \\\\ \\hline ${row(result, dp, W)}`]), lines, result };
}

/** Steps for a column calculation: line up, the layout, then the columns. */
function columnSteps(nums: number[], op: '+' | '-', dp: number, dps: number[]): { steps: string[]; result: number } {
  const work = op === '+' ? addColumns(nums, dp) : subColumns(nums[0], nums[1], dp);
  const steps: string[] = [];
  const padded = nums.map((n, i) => ({ n, i })).filter(({ i }) => dps[i] < dp);
  if (dp > 0) {
    steps.push(
      `Line up the decimal points.${padded.length ? ` Write ${padded.map(({ n }) => `${m$(n, dp)} as $${tex(str(n, dp))}$`).join(' and ')} so every number has ${['', 'one', 'two', 'three'][dp]} decimal place${dp > 1 ? 's' : ''}. Zeros at the right end do not change the value.${padded.some(({ i }) => dps[i] === 0) ? ' A whole number has its decimal point after the ones digit.' : ''}` : ''}`,
    );
  } else {
    steps.push('Line up the digits by place value: ones under ones, tens under tens, and so on.');
  }
  steps.push(`${op === '+' ? 'Add' : 'Subtract'} each column from right to left:\n\n${work.lines.map((l) => `- ${l}`).join('\n')}`);
  steps.push(work.tex);
  return { steps, result: work.result };
}

// ---------------------------------------------------------------------------
// 2.1 The standard algorithms
// ---------------------------------------------------------------------------

/** A number of units with exactly `dp` decimal places (no zero at the right end) and `intLen` whole digits. */
function decNum(rng: Rng, intLen: number, dp: number): number {
  const lo = intLen === 0 ? 1 : 10 ** (intLen - 1 + dp);
  const hi = 10 ** (intLen + dp) - 1;
  return retry(() => rng.int(lo, hi), (u) => dp === 0 || u % 10 !== 0);
}

/** Count the regroupings in a + b or a - b (units). */
function regroups(a: number, b: number, op: '+' | '-', dp: number): number {
  const ta = cols(a, dp);
  const tb = cols(b, dp);
  let n = 0;
  let carry = 0;
  for (let c = 0; c < Math.max(ta.length, tb.length); c++) {
    const x = (ta[c] ?? 0) + (op === '+' ? carry : -carry);
    const y = tb[c] ?? 0;
    if (op === '+') {
      carry = x + y >= 10 ? 1 : 0;
    } else {
      carry = x < y ? 1 : 0;
    }
    n += carry;
  }
  return n;
}

interface Calc {
  nums: number[];
  dps: number[];
  op: '+' | '-';
}

function pickCalc(rng: Rng, d: Difficulty): Calc {
  const kind = d === 1 ? rng.pick(['whole', 'whole', 'dec'] as const) : d === 2 ? rng.pick(['whole', 'dec', 'dec'] as const) : rng.pick(['fromWhole', 'three', 'bigZeros'] as const);
  const op: '+' | '-' = rng.chance(0.5) ? '+' : '-';
  if (kind === 'whole') {
    const len = d === 1 ? 4 : rng.int(5, 6);
    return retry(
      () => {
        let a = rng.int(10 ** (len - 1), 10 ** len - 1);
        let b = rng.int(10 ** (len - 2), 10 ** len - 1);
        if (op === '-' && b > a) [a, b] = [b, a];
        if (op === '-' && d === 2 && rng.chance(0.5)) {
          // Regrouping across zeros: 400 205 - 128 467.
          const s = String(a).split('');
          for (const k of rng.sample([1, 2, 3, 4].filter((x) => x < s.length - 1), 2)) s[k] = '0';
          a = Number(s.join(''));
        }
        return { nums: [a, b], dps: [0, 0], op };
      },
      (c) => {
        const [a, b] = c.nums;
        const r = regroups(a, b, op, 0);
        return (op === '+' ? a + b < 1000000 : a > b && b >= 10 ** (len - 2)) && r >= (d === 1 ? 1 : 2) && r <= (d === 1 ? 2 : 5);
      },
      200,
    );
  }
  if (kind === 'dec') {
    return retry(
      () => {
        const da = d === 1 ? rng.int(1, 2) : rng.int(1, 3);
        const db = d === 1 ? da : rng.intExcept(1, 3, [da]);
        let a = decNum(rng, rng.int(1, 2), da);
        let b = decNum(rng, rng.int(0, 2), db);
        const dp = Math.max(da, db);
        let dA = da;
        let dB = db;
        if (op === '-' && a * 10 ** (dp - da) < b * 10 ** (dp - db)) {
          [a, b] = [b, a];
          [dA, dB] = [dB, dA];
        }
        return { nums: [a * 10 ** (dp - dA), b * 10 ** (dp - dB)], dps: [dA, dB], op };
      },
      (c) => {
        const dp = Math.max(...c.dps);
        const [a, b] = c.nums;
        return a !== b && regroups(a, b, op, dp) >= 1 && (op === '+' || a - b > 0);
      },
      200,
    );
  }
  if (kind === 'fromWhole') {
    const db = rng.int(2, 3);
    const a = rng.pick([5, 8, 10, 12, 15, 20, 30, 40, 50]);
    const b = retry(() => decNum(rng, a >= 10 ? rng.int(1, 2) : 1, db), (u) => u < a * 10 ** db && u > 10 ** db);
    return { nums: [a * 10 ** db, b], dps: [0, db], op: '-' };
  }
  if (kind === 'three') {
    const ds = rng.shuffle([1, 2, 3]);
    const vals = ds.map((k, i) => decNum(rng, i === 0 ? 2 : rng.int(0, 1), k));
    return { nums: vals.map((v, i) => v * 10 ** (3 - ds[i])), dps: ds, op: '+' };
  }
  // Six digits across zeros, or from a round number such as 500 000.
  return retry(
    () => {
      const a = rng.chance(0.5) ? rng.int(2, 9) * 100000 : rng.int(2, 9) * 100000 + rng.int(1, 9) * 100 + rng.int(1, 9);
      const b = rng.int(100000, a - 1000);
      return { nums: [a, b], dps: [0, 0], op: '-' as const };
    },
    (c) => regroups(c.nums[0], c.nums[1], '-', 0) >= 4,
  );
}

const ALGO_HINTS = (dp: number, op: '+' | '-'): string[] => [
  dp ? 'Line up the decimal points first. Add zeros at the right end so the numbers have the same number of decimal places.' : 'Line up the digits by place value, ones under ones.',
  op === '+' ? 'Start with the column on the right. If a column adds to $10$ or more, write the ones digit and carry $1$ to the next column.' : 'Start with the column on the right. If the top digit is too small, regroup $1$ from the next place to the left.',
];

function standardAlgorithm(rng: Rng, d: Difficulty): Out {
  const c = pickCalc(rng, d);
  const dp = Math.max(...c.dps);
  const shown = c.nums.map((n, i) => nm(n / 10 ** (dp - c.dps[i]), c.dps[i]));
  const expr = shown.join(` ${c.op} `);
  const { steps, result } = columnSteps(c.nums, c.op, dp, c.dps);
  return {
    prompt: rng.pick([`Use the standard algorithm. Find $${expr}$.`, `Calculate $${expr}$ with the standard algorithm.`, `Find the ${c.op === '+' ? 'sum' : 'difference'}: $${expr}$.`]),
    parts: [exactPart(result, dp)],
    hints: ALGO_HINTS(dp, c.op),
    solution: [...steps, `$${expr} = ${nm(result, dp)}$`],
  };
}

/** A missing number: use the inverse operation. */
function missingNumber(rng: Rng): Out {
  const plus = rng.chance(0.5);
  // □ + a = t needs t − a (regrouping across zeros); □ − a = t needs t + a (carrying).
  const { t, a, dt, da } = retry(
    () => {
      const dt = plus ? rng.int(0, 1) : rng.int(1, 3);
      const da = plus ? rng.int(2, 3) : rng.intExcept(1, 3, [dt]);
      return { t: decNum(rng, plus ? 2 : 1, dt), a: decNum(rng, 1, da), dt, da };
    },
    (c) => {
      const dp = Math.max(c.dt, c.da);
      const T = c.t * 10 ** (dp - c.dt);
      const A = c.a * 10 ** (dp - c.da);
      return (plus ? T > A : true) && regroups(T, A, plus ? '-' : '+', dp) >= 2;
    },
    200,
  );
  const dp = Math.max(dt, da);
  const T = t * 10 ** (dp - dt);
  const A = a * 10 ** (dp - da);
  const x = plus ? T - A : T + A;
  const box = '\\boxed{\\phantom{0}}';
  const eq = `${box} ${plus ? '+' : '-'} ${nm(a, da)} = ${nm(t, dt)}`;
  const { steps } = columnSteps([T, A], plus ? '-' : '+', dp, [dt, da]);
  return {
    prompt: `What number goes in the box?\n\n$$${eq}$$`,
    parts: [exactPart(x, dp)],
    hints: [
      plus ? `Adding $${nm(a, da)}$ gave $${nm(t, dt)}$. Undo it: subtract.` : `Subtracting $${nm(a, da)}$ gave $${nm(t, dt)}$. Undo it: add.`,
      `Find $${nm(t, dt)} ${plus ? '-' : '+'} ${nm(a, da)}$ with the standard algorithm.`,
    ],
    solution: [
      plus ? `Subtraction undoes addition. The missing number is $${nm(t, dt)} - ${nm(a, da)}$.` : `Addition undoes subtraction. The missing number is $${nm(t, dt)} + ${nm(a, da)}$.`,
      ...steps,
      `Check: $${nm(x, dp)} ${plus ? '+' : '-'} ${nm(a, da)} = ${nm(t, dt)}$. The missing number is $${nm(x, dp)}$.`,
    ],
  };
}

const addSubtract = skill({
  id: 'm5-add-subtract',
  name: 'Adding and subtracting with standard algorithms',
  description: 'Add and subtract whole numbers within 1 000 000 and decimals to thousandths with the standard algorithms, lining up decimal points and regrouping.',
  outcomes: ['N2'],
  lessonId: 'm5-2-1',
  calculator: false,
  gen(rng, d) {
    if (d === 3 && rng.chance(0.3)) return missingNumber(rng);
    return standardAlgorithm(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Estimating and solving problems
// ---------------------------------------------------------------------------

const NEAREST: Record<number, string> = { 5: 'hundred thousand', 4: 'ten thousand', 3: 'thousand', 2: 'hundred', 0: 'whole number' };
const roundTo = (x: number, p: number) => Math.round(x / p) * p;

interface EstCase {
  a: number;
  b: number;
  dp: number;
  op: '+' | '-';
  /** Rounding place as a power of ten (in whole units). */
  e: number;
}

function estCase(rng: Rng): EstCase {
  const op: '+' | '-' = rng.chance(0.5) ? '+' : '-';
  if (rng.chance(0.35)) {
    // Decimals rounded to whole numbers.
    const dp = rng.int(1, 2);
    const [a, b] = retry(
      () => [decNum(rng, 1, dp), decNum(rng, 1, dp)].sort((x, y) => y - x),
      ([x, y]) => x !== y && Math.abs((x / 10 ** dp) % 1 - 0.5) > 0.08 && Math.abs((y / 10 ** dp) % 1 - 0.5) > 0.08 && roundTo(x / 10 ** dp, 1) !== roundTo(y / 10 ** dp, 1),
    );
    return { a, b, dp, op, e: 0 };
  }
  const len = rng.int(4, 6);
  const e = len - 1;
  const p = 10 ** e;
  const [a, b] = retry(
    () => [rng.int(p, 10 * p - 1), rng.int(p, 10 * p - 1)].sort((x, y) => y - x),
    ([x, y]) => Math.abs((x / p) % 1 - 0.5) > 0.12 && Math.abs((y / p) % 1 - 0.5) > 0.12 && roundTo(x, p) !== roundTo(y, p) && (op === '-' || x + y < 1000000),
  );
  return { a, b, dp: 0, op, e };
}

/** Which estimate do you get by rounding? */
function estimate(rng: Rng): Out {
  const c = estCase(rng);
  const p = 10 ** c.e;
  const A = c.a / 10 ** c.dp;
  const B = c.b / 10 ** c.dp;
  const ra = roundTo(A, p);
  const rb = roundTo(B, p);
  const est = c.op === '+' ? ra + rb : ra - rb;
  const other = c.op === '+' ? ra - rb : ra + rb;
  const wrong = rng.shuffle([est + p, est - p, est * 10, other]).filter((x) => x > 0 && x !== est);
  const fmtN = (x: number) => `$${tex(String(x))}$`;
  const expr = `${nm(c.a, c.dp)} ${c.op} ${nm(c.b, c.dp)}`;
  return {
    prompt: `Estimate $${expr}$ by rounding each number to the nearest **${NEAREST[c.e]}**. Which estimate do you get?`,
    parts: [{ answer: mc(rng, fmtN(est), wrong.map(fmtN)) }],
    hints: ['Round each number first. Then do the easy calculation with the rounded numbers.', `Round $${nm(c.a, c.dp)}$ and $${nm(c.b, c.dp)}$ to the nearest ${NEAREST[c.e]}.`],
    solution: [
      `$${nm(c.a, c.dp)}$ rounds to $${tex(String(ra))}$.`,
      `$${nm(c.b, c.dp)}$ rounds to $${tex(String(rb))}$.`,
      `$${tex(String(ra))} ${c.op} ${tex(String(rb))} = ${tex(String(est))}$.`,
      `The estimate is $${tex(String(est))}$. (The exact answer, $${nm(c.op === '+' ? c.a + c.b : c.a - c.b, c.dp)}$, is close to it.)`,
    ],
  };
}

/** Is a classmate's answer reasonable? Check with an estimate. */
function reasonable(rng: Rng): Out {
  for (;;) {
    const c = estCase(rng);
    const p = 10 ** c.e;
    const exact = c.op === '+' ? c.a + c.b : c.a - c.b;
    const A = c.a / 10 ** c.dp;
    const B = c.b / 10 ** c.dp;
    const ra = roundTo(A, p);
    const rb = roundTo(B, p);
    const est = c.op === '+' ? ra + rb : ra - rb;
    const other = c.op === '+' ? ra - rb : ra + rb;
    const ok = rng.chance(0.45);
    // A wrong answer is off by two or three of the rounding place, as after a regrouping slip.
    const units = 10 ** c.dp;
    let claimed = exact;
    if (!ok) claimed = exact + rng.pick([-2, 2, 3, -3]) * p * units;
    if (claimed <= 0) continue;
    const cl = claimed / units;
    const ex = exact / units;
    if (Math.abs(ex - est) >= 0.8 * p) continue;
    if (!ok && Math.abs(cl - est) < 1.5 * p) continue;
    if (other <= 0 || other === est) continue;
    const name = rng.pick(NAMES);
    const E = (x: number) => `$${tex(String(x))}$`;
    const choices = [
      `Yes. The estimate is ${E(est)}, and the answer is close to it.`,
      `No. The estimate is ${E(est)}, and the answer is far from it.`,
      `Yes. The estimate is ${E(other)}, and the answer is close to it.`,
      `No. The estimate is ${E(other)}, and the answer is far from it.`,
    ];
    const expr = `${nm(c.a, c.dp)} ${c.op} ${nm(c.b, c.dp)}`;
    return {
      prompt: `${name} says that $${expr} = ${nm(claimed, c.dp)}$. Estimate by rounding each number to the nearest ${NEAREST[c.e]}. Is ${name}’s answer reasonable?`,
      parts: [{ answer: mc(rng, choices[ok ? 0 : 1], choices.filter((_, i) => i !== (ok ? 0 : 1))) }],
      hints: [`Round each number to the nearest ${NEAREST[c.e]}, then ${c.op === '+' ? 'add' : 'subtract'}.`, 'A reasonable answer is close to the estimate. An answer that is far away has a mistake.'],
      solution: [
        `Round: $${nm(c.a, c.dp)}$ is about $${tex(String(ra))}$ and $${nm(c.b, c.dp)}$ is about $${tex(String(rb))}$.`,
        `Estimate: $${tex(String(ra))} ${c.op} ${tex(String(rb))} = ${tex(String(est))}$.`,
        ok
          ? `$${nm(claimed, c.dp)}$ is close to $${tex(String(est))}$, so the answer is reasonable.`
          : `$${nm(claimed, c.dp)}$ is far from $${tex(String(est))}$, so the answer is not reasonable. (The exact answer is $${nm(exact, c.dp)}$.)`,
        `The answer is: ${choices[ok ? 0 : 1]}`,
      ],
    };
  }
}

interface Problem {
  prompt: string;
  /** Numbers in units, the operations from left to right, and the units' decimal places. */
  steps: Array<{ nums: number[]; op: '+' | '-'; why: string }>;
  dp: number;
  money: boolean;
  unit?: string;
  answer: (r: string) => string;
}

/** One-step word problems. */
function oneStep(rng: Rng): Problem {
  const name = rng.pick(NAMES);
  const kind = rng.int(0, 8);
  switch (kind) {
    case 0: {
      const [x, y] = rng.sample(['a skipping rope', 'a soccer ball', 'a water bottle', 'a sketchbook', 'a puzzle', 'a board game', 'a pack of markers'], 2);
      const a = rng.int(399, 2499);
      const b = rng.int(199, 1999);
      return { prompt: `${name} buys ${x} for ${money(a)} and ${y} for ${money(b)}. What is the total cost?`, steps: [{ nums: [a, b], op: '+', why: 'A total means add.' }], dp: 2, money: true, answer: (r) => `The total cost is \\$${r}.` };
    }
    case 1: {
      const have = rng.pick([2000, 2500, 3000, 4000, 5000]);
      const spend = retry(() => rng.int(Math.floor(have / 3), have - 101), (v) => v % 100 !== 0 && v % 10 !== 0);
      return { prompt: `${name} has ${money(have)} to spend at the school book fair. ${name} buys books that cost ${money(spend)} in all. How much money is left?`, steps: [{ nums: [have, spend], op: '-', why: 'Money left means subtract what was spent.' }], dp: 2, money: true, answer: (r) => `${name} has \\$${r} left.` };
    }
    case 2: {
      const a = rng.int(5999, 12999);
      const b = retry(() => rng.int(Math.floor(a * 0.6), a - 500), (v) => v % 10 !== 0);
      const item = rng.pick(['hockey skates', 'a bike helmet', 'a pair of cross-country skis', 'a sleeping bag', 'a tent']);
      return { prompt: `The same ${item} cost ${money(a)} at one store and ${money(b)} at another store. How much cheaper is the second store?`, steps: [{ nums: [a, b], op: '-', why: 'How much cheaper means find the difference: subtract.' }], dp: 2, money: true, answer: (r) => `The second store is \\$${r} cheaper.` };
    }
    case 3: {
      const da = rng.int(1, 2);
      const db = rng.int(1, 3);
      const dp = Math.max(da, db);
      const a = decNum(rng, 1, da);
      const b = decNum(rng, 1, db);
      return {
        prompt: `On a hike near ${rng.pick(['Pinewood', 'Maple Falls', 'Stonebridge', 'Clearwater', 'Ashford'])}, ${name}’s family walked ${m$(a, da)} km before lunch and ${m$(b, db)} km after lunch. How far did they walk in all?`,
        steps: [{ nums: [a * 10 ** (dp - da), b * 10 ** (dp - db)], op: '+', why: 'In all means add.' }],
        dp,
        money: false,
        unit: 'km',
        answer: (r) => `They walked $${r}$ km.`,
      };
    }
    case 4: {
      const L = rng.int(3, 6) * 10 + rng.pick([0, 5]);
      const cut = retry(() => rng.int(1001, L * 100 - 500), (u) => u % 10 !== 0);
      return {
        prompt: `A roll of ribbon is ${m$(L, 1)} m long. ${name} uses ${m$(cut, 3)} m to wrap gifts. How much ribbon is left?`,
        steps: [{ nums: [L * 100, cut], op: '-', why: 'Left over means subtract.' }],
        dp: 3,
        money: false,
        unit: 'm',
        answer: (r) => `There is $${r}$ m of ribbon left.`,
      };
    }
    case 5: {
      const a = decNum(rng, 1, 2);
      const b = decNum(rng, 0, 3);
      return {
        prompt: `${name}’s backpack has a mass of ${m$(a, 2)} kg. ${name} adds a lunch bag with a mass of ${m$(b, 3)} kg. What is the total mass?`,
        steps: [{ nums: [a * 10, b], op: '+', why: 'Total mass means add.' }],
        dp: 3,
        money: false,
        unit: 'kg',
        answer: (r) => `The total mass is $${r}$ kg.`,
      };
    }
    case 6: {
      const jug = rng.pick([2, 3, 4]) * 10 + rng.pick([0, 5]);
      const pour = decNum(rng, 0, 3);
      return {
        prompt: `A jug holds ${m$(jug, 1)} L of juice. ${name} pours ${m$(pour, 3)} L into cups for a class party. How much juice is still in the jug?`,
        steps: [{ nums: [jug * 100, pour], op: '-', why: 'Still in the jug means subtract what was poured.' }],
        dp: 3,
        money: false,
        unit: 'L',
        answer: (r) => `There is $${r}$ L of juice left.`,
      };
    }
    case 7: {
      const a = rng.int(10000, 99999);
      const b = rng.int(1000, 9999);
      const town = rng.pick(TOWNS);
      return { prompt: `The library in ${town} has $${tex(String(a))}$ books. It buys $${tex(String(b))}$ new books. How many books does it have now?`, steps: [{ nums: [a, b], op: '+', why: 'Adding new books means add.' }], dp: 0, money: false, unit: 'books', answer: (r) => `The library has $${r}$ books.` };
    }
    default: {
      const goal = rng.int(3, 9) * 100000;
      const got = retry(() => rng.int(goal / 2, goal - 1000), (v) => v % 100 !== 0);
      return {
        prompt: `A food bank in ${rng.pick(TOWNS)} wants to collect $${tex(String(goal))}$ kg of food this year. So far it has collected $${tex(String(got))}$ kg. How many more kilograms does it need?`,
        steps: [{ nums: [goal, got], op: '-', why: 'How many more means subtract.' }],
        dp: 0,
        money: false,
        unit: 'kg',
        answer: (r) => `It needs $${r}$ kg more.`,
      };
    }
  }
}

/** Two-step word problems. */
function twoStep(rng: Rng): Problem {
  const name = rng.pick(NAMES);
  const kind = rng.int(0, 4);
  switch (kind) {
    case 0: {
      const [x, y] = rng.sample(['a T-shirt', 'a ball cap', 'a water bottle', 'a book', 'a pair of mittens', 'a model kit'], 2);
      const a = rng.int(899, 2499);
      const b = rng.int(499, 1999);
      const pay = a + b < 3000 ? rng.pick([3000, 4000, 5000]) : rng.pick([5000, 10000]);
      return {
        prompt: `${name} buys ${x} for ${money(a)} and ${y} for ${money(b)}. ${name} pays with ${money(pay)}. How much change should ${name} get?`,
        steps: [
          { nums: [a, b], op: '+', why: 'First find the total cost.' },
          { nums: [pay, a + b], op: '-', why: 'Then subtract the total from the money paid.' },
        ],
        dp: 2,
        money: true,
        answer: (r) => `${name} should get \\$${r} in change.`,
      };
    }
    case 1: {
      const trail = rng.int(8, 15) * 10 + rng.pick([0, 5]);
      const d1 = decNum(rng, 1, 2);
      const d2 = decNum(rng, 1, 3);
      if (d1 * 10 + d2 >= trail * 100) return twoStep(rng);
      return {
        prompt: `A trail near ${rng.pick(['Pinewood', 'Maple Falls', 'Stonebridge', 'Clearwater'])} is ${m$(trail, 1)} km long. ${name} hiked ${m$(d1, 2)} km on Saturday and ${m$(d2, 3)} km on Sunday. How much of the trail is left to hike?`,
        steps: [
          { nums: [d1 * 10, d2], op: '+', why: 'First find how far ' + name + ' hiked in all.' },
          { nums: [trail * 100, d1 * 10 + d2], op: '-', why: 'Then subtract that from the length of the trail.' },
        ],
        dp: 3,
        money: false,
        unit: 'km',
        answer: (r) => `There is $${r}$ km left to hike.`,
      };
    }
    case 2: {
      const goal = rng.int(4, 9) * 100000;
      const w1 = rng.int(100100, goal / 2);
      const w2 = rng.int(100100, goal - w1 - 20000);
      return {
        prompt: `A school wants to raise ${money(goal)} for new playground equipment. It raised ${money(w1)} in September and ${money(w2)} in October. How much more does the school need to raise?`,
        steps: [
          { nums: [w1, w2], op: '+', why: 'First find how much was raised in all.' },
          { nums: [goal, w1 + w2], op: '-', why: 'Then subtract that from the goal.' },
        ],
        dp: 2,
        money: true,
        answer: (r) => `The school needs to raise \\$${r} more.`,
      };
    }
    case 3: {
      const rope = rng.int(8, 20) * 10;
      const p1 = decNum(rng, 1, 2);
      const p2 = decNum(rng, 1, 1);
      if (p1 + p2 * 10 >= rope * 10) return twoStep(rng);
      return {
        prompt: `${name} has a rope ${m$(rope, 1)} m long for a camping trip. ${name} cuts off ${m$(p1, 2)} m for a clothesline and ${m$(p2, 1)} m to tie up a tarp. How long is the rope that is left?`,
        steps: [
          { nums: [p1, p2 * 10], op: '+', why: 'First find how much rope was cut off.' },
          { nums: [rope * 10, p1 + p2 * 10], op: '-', why: 'Then subtract that from the whole rope.' },
        ],
        dp: 2,
        money: false,
        unit: 'm',
        answer: (r) => `The rope that is left is $${r}$ m long.`,
      };
    }
    default: {
      const a = rng.int(120000, 450000);
      const b = rng.int(100000, 400000);
      const c = retry(() => rng.int(150000, 600000), (v) => v < a + b);
      return {
        prompt: `A hockey arena sold $${tex(String(a))}$ tickets last season and $${tex(String(b))}$ tickets this season. A football stadium sold $${tex(String(c))}$ tickets over the same two seasons. How many more tickets did the arena sell?`,
        steps: [
          { nums: [a, b], op: '+', why: 'First find the arena’s total for the two seasons.' },
          { nums: [a + b, c], op: '-', why: 'Then subtract the stadium’s total to find how many more.' },
        ],
        dp: 0,
        money: false,
        unit: 'tickets',
        answer: (r) => `The arena sold $${r}$ more tickets.`,
      };
    }
  }
}

function wordProblem(rng: Rng, d: Difficulty): Out {
  const p = d === 2 ? oneStep(rng) : twoStep(rng);
  const sol: string[] = [];
  let result = 0;
  for (const s of p.steps) {
    const dps = s.nums.map((n) => dpOf(n, p.dp));
    const { steps, result: r } = columnSteps(s.nums, s.op, p.dp, p.money ? [2, 2] : dps);
    const expr = s.nums.map((n) => (p.money ? tex(str(n, 2)) : nm(n, p.dp))).join(` ${s.op} `);
    sol.push(`${s.why} Find $${expr}$.`, ...steps);
    sol.push(`$${expr} = ${p.money ? tex(str(r, 2)) : nm(r, p.dp)}$`);
    result = r;
  }
  const r = p.money ? tex(str(result, 2)) : nm(result, p.dp);
  sol.push(p.answer(r));
  const op1 = p.steps[0].op;
  return {
    prompt: `${p.prompt}${p.money ? ' Give your answer in dollars, to the nearest cent.' : ''}`,
    parts: [p.money ? moneyPart(result) : exactPart(result, p.dp, p.unit)],
    hints: [
      p.steps.length > 1 ? `This takes two steps. ${p.steps[0].why}` : p.steps[0].why,
      p.dp ? 'Line up the decimal points. Add zeros at the right end so the numbers have the same number of decimal places.' : `${op1 === '+' ? 'Add' : 'Subtract'} with the standard algorithm, one column at a time.`,
    ],
    solution: sol,
  };
}

const problems = skill({
  id: 'm5-add-subtract-problems',
  name: 'Estimating and solving addition and subtraction problems',
  description: 'Estimate to check whether a sum or difference is reasonable, and solve one- and two-step problems with whole numbers, decimals, money and metric measurements.',
  outcomes: ['N2'],
  lessonId: 'm5-2-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.55) ? estimate(rng) : reasonable(rng);
    if (d === 2) return rng.chance(0.8) ? wordProblem(rng, 2) : reasonable(rng);
    return wordProblem(rng, 3);
  },
});

export const ADDSUB_SKILLS: SkillDef[] = [addSubtract, problems];
