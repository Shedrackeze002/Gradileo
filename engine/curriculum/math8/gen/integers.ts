/** Math 8 Unit 5 — Multiplying and Dividing Integers (N7). */
import { numPart, retry, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Northfield'];

const T = '\\times';
const D = '\\div';
/** An integer inside maths, in brackets when negative: (-3). */
const p = (n: number) => (n < 0 ? `(${n})` : `${n}`);
/** A Celsius temperature inside maths. */
const cM = (t: number) => `${t}^\\circ\\text{C}`;
/** Money in prose: \$45 or −\$45. */
const MINUS = '−';
const dol = (x: number) => (x < 0 ? `${MINUS}\\$${-x}` : `\\$${x}`);

const SIGN_RULES = 'Same signs give a positive answer. Different signs give a negative answer.';

/**
 * Integer tiles: each group is drawn as a block of tiles, side by side. A positive tile has a plus sign,
 * a negative tile a minus sign. Groups are outlined with dashed lines when there is more than one.
 */
function tiles(groups: Array<{ pos: number; neg: number }>, cols = 4): Figure {
  const s = 1;
  const g = 0.3;
  const groupGap = 1.2;
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; fill?: boolean }> = [];
  const segments: PlaneSegment[] = [];
  const counts = groups.map((q) => q.pos + q.neg);
  const rows = Math.max(...counts.map((n) => Math.ceil(n / cols)));
  const H = rows * (s + g) - g;
  let x0 = 0;
  for (const grp of groups) {
    const n = grp.pos + grp.neg;
    const c = Math.min(cols, n);
    for (let i = 0; i < n; i++) {
      const x = x0 + (i % c) * (s + g);
      const y = H - s - Math.floor(i / c) * (s + g);
      const neg = i >= grp.pos;
      const color = neg ? 'accent' : 'brand';
      polylines.push({ points: [[x, y], [x + s, y], [x + s, y + s], [x, y + s], [x, y]], color, fill: true });
      segments.push({ from: [x + 0.25, y + 0.5], to: [x + 0.75, y + 0.5], color });
      if (!neg) segments.push({ from: [x + 0.5, y + 0.25], to: [x + 0.5, y + 0.75], color });
    }
    const w = c * (s + g) - g;
    if (groups.length > 1) {
      const m = 0.25;
      const box: Array<[number, number]> = [[x0 - m, -m], [x0 + w + m, -m], [x0 + w + m, H + m], [x0 - m, H + m]];
      for (let k = 0; k < 4; k++) segments.push({ from: box[k], to: box[(k + 1) % 4], color: 'muted', dashed: true });
    }
    x0 += w + groupGap;
  }
  const W = x0 - groupGap;
  const pad = 0.6;
  const span = Math.max(W, H) + 2 * pad;
  return {
    type: 'plane',
    grid: { xMin: -pad, xMax: W + pad, yMin: -pad, yMax: H + pad, step: span },
    polylines,
    segments,
    hideTickLabels: true,
    caption: `Integer tiles: ${groups.map((q) => [q.pos ? `${q.pos} positive` : '', q.neg ? `${q.neg} negative` : ''].filter(Boolean).join(' and ')).join('; ')}`,
  };
}

/** A non-zero integer in [-max, max] with |n| ≥ min. */
function signed(rng: Rng, min: number, max: number): number {
  return rng.sign() * rng.int(min, max);
}

/** Sign-rule sentence for a product or quotient of two integers. */
function signReason(a: number, b: number, op: 'product' | 'quotient'): string {
  const same = a < 0 === b < 0;
  return same
    ? `The signs are the same (${a < 0 ? 'both negative' : 'both positive'}), so the ${op} is positive.`
    : `The signs are different (one positive, one negative), so the ${op} is negative.`;
}

// ---------------------------------------------------------------------------
// 5.1 Multiplying integers
// ---------------------------------------------------------------------------

function mulD1(rng: Rng): Out {
  const kind = rng.pick(['tiles', 'tiles', 'negPos', 'negNeg'] as const);
  if (kind === 'tiles') {
    const a = rng.int(2, 4);
    const b = rng.int(2, 5);
    const posGroups = rng.chance(0.25);
    const v = posGroups ? b : -b;
    return {
      prompt: `The tiles show $${a}$ groups of $${p(v)}$. Each tile with a ${v < 0 ? 'minus' : 'plus'} sign is $${v < 0 ? '-1' : '+1'}$. Find $${a} ${T} ${p(v)}$.`,
      figure: tiles(Array.from({ length: a }, () => (v < 0 ? { pos: 0, neg: b } : { pos: b, neg: 0 })), a * b > 12 ? Math.ceil(b / 2) : b),
      parts: [numPart(a * v, { label: `$${a} ${T} ${p(v)} =$`, exact: false })],
      hints: [`$${a} ${T} ${p(v)}$ means $${a}$ groups of $${p(v)}$.`, `Add: ${Array.from({ length: a }, () => `$${p(v)}$`).join(' + ')}.`],
      solution: [
        `$${a} ${T} ${p(v)}$ means $${a}$ groups of $${p(v)}$.`,
        `As repeated addition: $${Array.from({ length: a }, () => p(v)).join(' + ')} = ${a * v}$.`,
        `There are $${a * b}$ ${v < 0 ? 'negative' : 'positive'} tiles in all.`,
        `$${a} ${T} ${p(v)} = ${a * v}$`,
      ],
    };
  }
  if (kind === 'negPos') {
    const a = rng.int(2, 6);
    const b = rng.int(2, 9);
    const first = rng.chance(0.5);
    const expr = first ? `${p(-a)} ${T} ${b}` : `${b} ${T} ${p(-a)}`;
    return {
      prompt: `Find $${expr}$.`,
      parts: [numPart(-a * b, { exact: false })],
      hints: [SIGN_RULES, `Multiply $${a} ${T} ${b}$, then decide the sign.`],
      solution: [
        first ? `You can change the order: $${p(-a)} ${T} ${b} = ${b} ${T} ${p(-a)}$, which is $${b}$ groups of $${p(-a)}$.` : `$${b} ${T} ${p(-a)}$ is $${b}$ groups of $${p(-a)}$.`,
        `$${a} ${T} ${b} = ${a * b}$, and $${b}$ groups of a negative number is negative.`,
        `$${expr} = ${-a * b}$`,
      ],
    };
  }
  const a = rng.int(2, 6);
  const b = rng.int(2, 9);
  return {
    prompt: `Find $${p(-a)} ${T} ${p(-b)}$.`,
    parts: [numPart(a * b, { exact: false })],
    hints: [SIGN_RULES, 'Think of $(-' + a + ')$ as **removing** groups. Removing negatives is like adding positives.'],
    solution: [
      `$${p(-a)} ${T} ${p(-b)}$ means remove $${a}$ groups of $${p(-b)}$.`,
      `Start with zero pairs, take away $${a}$ groups of $${b}$ negative tiles, and $${a * b}$ positive tiles are left.`,
      `${signReason(-a, -b, 'product')} $${a} ${T} ${b} = ${a * b}$.`,
      `$${p(-a)} ${T} ${p(-b)} = ${a * b}$`,
    ],
  };
}

function mulD2(rng: Rng): Out {
  if (rng.chance(0.35)) {
    // Three factors.
    const f = retry(() => [signed(rng, 1, 6), signed(rng, 2, 5), signed(rng, 2, 6)], (v) => v.some((x) => x < 0) && Math.abs(v[0] * v[1] * v[2]) <= 150 && Math.abs(v[0]) > 1);
    const ab = f[0] * f[1];
    const r = ab * f[2];
    const negs = f.filter((x) => x < 0).length;
    return {
      prompt: `Find $${f.map(p).join(` ${T} `)}$.`,
      parts: [numPart(r, { exact: false })],
      hints: ['Multiply two factors at a time, from left to right.', `Count the negative factors: an even number of negatives gives a positive product, an odd number gives a negative product.`],
      solution: [
        `Multiply the first two: $${p(f[0])} ${T} ${p(f[1])} = ${ab}$.`,
        `Then: $${p(ab)} ${T} ${p(f[2])} = ${r}$.`,
        `Check the sign: there ${negs === 1 ? 'is $1$ negative factor' : `are $${negs}$ negative factors`} (${negs % 2 === 0 ? 'even' : 'odd'}), so the product is ${r > 0 ? 'positive' : 'negative'}.`,
        `$${f.map(p).join(` ${T} `)} = ${r}$`,
      ],
    };
  }
  const [a, b] = retry(() => [signed(rng, 3, 12), signed(rng, 3, 12)], (v) => v.some((x) => x < 0));
  const r = a * b;
  const form = rng.pick(['times', 'brackets'] as const);
  const expr = form === 'times' ? `${p(a)} ${T} ${p(b)}` : `${p(a)}${p(b) === `${b}` ? `(${b})` : p(b)}`;
  return {
    prompt: `Find $${expr}$.`,
    parts: [numPart(r, { exact: false })],
    hints: [SIGN_RULES, `Multiply the numbers without signs, $${Math.abs(a)} ${T} ${Math.abs(b)}$, then decide the sign.`],
    solution: [
      ...(form === 'brackets' ? [`Two brackets side by side mean multiply: $${expr} = ${p(a)} ${T} ${p(b)}$.`] : []),
      `$${Math.abs(a)} ${T} ${Math.abs(b)} = ${Math.abs(r)}$`,
      signReason(a, b, 'product'),
      `$${expr} = ${r}$`,
    ],
  };
}

function mulD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['cooling', 'past', 'diver', 'money'] as const);
  if (kind === 'cooling') {
    const rate = rng.int(2, 5);
    const h = rng.int(3, 7);
    const start = rng.int(-5, 8);
    const change = -rate * h;
    const end = start + change;
    return {
      prompt: `On a winter evening in ${town}, the temperature is $${cM(start)}$ at 6 p.m. It drops $${rate}^\\circ\\text{C}$ every hour for $${h}$ hours.\n\n(a) What is the total change in temperature? Write it as an integer.\n\n(b) What is the temperature after $${h}$ hours?`,
      parts: [numPart(change, { exact: false, label: '(a)', suffix: '°C' }), numPart(end, { exact: false, label: '(b)', suffix: '°C' })],
      hints: [`A drop of $${rate}^\\circ\\text{C}$ each hour is a change of $-${rate}$ each hour. Multiply by the number of hours.`, 'Add the change to the starting temperature.'],
      solution: [
        `(a) Change: $${h} ${T} ${p(-rate)} = ${change}$, so the temperature changes by $${cM(change)}$.`,
        `(b) $${start} + ${p(change)} = ${end}$`,
        `(a) $${cM(change)}$; (b) $${cM(end)}$.`,
      ],
    };
  }
  if (kind === 'past') {
    const rate = rng.int(2, 4);
    const h = rng.int(2, 5);
    const now = rng.int(-15, -1);
    const change = -rate * -h;
    const then = now + change;
    return {
      prompt: `The temperature in ${town} has been dropping steadily by $${rate}^\\circ\\text{C}$ per hour all day. It is $${cM(now)}$ now. Use $-${rate}$ for the change per hour and $-${h}$ for "$${h}$ hours ago".\n\n(a) Find $${p(-rate)} ${T} ${p(-h)}$. This is how many degrees warmer it was $${h}$ hours ago.\n\n(b) What was the temperature $${h}$ hours ago?`,
      parts: [numPart(change, { exact: false, label: '(a)' }), numPart(then, { exact: false, label: '(b)', suffix: '°C' })],
      hints: [SIGN_RULES, `Going back in time undoes the drops, so it was warmer before. Add your answer from (a) to $${now}$.`],
      solution: [
        `(a) $${p(-rate)} ${T} ${p(-h)} = ${change}$, because the signs are the same.`,
        `Going back $${h}$ hours undoes $${h}$ drops of $${rate}^\\circ\\text{C}$, so it was $${change}^\\circ\\text{C}$ warmer.`,
        `(b) $${now} + ${change} = ${then}$`,
        `(a) $${change}$; (b) $${cM(then)}$.`,
      ],
    };
  }
  if (kind === 'diver') {
    const rate = rng.int(2, 6);
    const m = rng.int(3, 8);
    const change = -rate * m;
    const what = rng.pick(['A scuba diver in a lake', 'An underwater camera on a rope', 'A diver exploring a reef']);
    return {
      prompt: `${what} starts at the surface ($0$ m) and goes down $${rate}$ m every minute for $${m}$ minutes. What is its final position relative to the surface? Write it as an integer.`,
      parts: [numPart(change, { exact: false, label: 'Final position:', suffix: 'm' })],
      hints: ['Going down is negative.', `Multiply the change each minute, $-${rate}$, by the number of minutes.`],
      solution: [`Each minute the change is $-${rate}$ m.`, `$${m} ${T} ${p(-rate)} = ${change}$`, `The final position is $${change}$ m, which is $${-change}$ m below the surface.`],
    };
  }
  const cost = rng.int(3, 9);
  const days = rng.int(4, 10);
  const change = -cost * days;
  const habit = rng.pick([['buys a $', 'snack after school'], ['pays $', 'for the bus'], ['spends $', 'on lunch at the cafeteria']]);
  return {
    prompt: `${name} ${habit[0].replace('$', `\\$${cost}`)} ${habit[1]} every school day for $${days}$ days. Write the total change in ${name}’s money as an integer.`,
    parts: [numPart(change, { exact: false, label: 'Change: \\$' })],
    hints: ['Money spent is a negative change.', `Multiply: $${days} ${T} ${p(-cost)}$.`],
    solution: [`Each day the change is $-${cost}$ dollars.`, `$${days} ${T} ${p(-cost)} = ${change}$`, `${name}’s money changes by ${dol(change)}.`],
  };
}

const integerMultiply = skill({
  id: 'm8-integer-multiply',
  name: 'Multiplying integers',
  description: 'Model integer multiplication with groups, repeated addition and zero pairs, and use the sign rules to multiply integers.',
  outcomes: ['N7'],
  lessonId: 'm8-5-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return mulD1(rng);
    if (d === 2) return mulD2(rng);
    return mulD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Dividing integers
// ---------------------------------------------------------------------------

function divD1(rng: Rng): Out {
  const kind = rng.pick(['share', 'groups', 'related'] as const);
  if (kind === 'share') {
    const g = rng.int(2, 4);
    const q = rng.int(2, 5);
    const n = g * q;
    return {
      prompt: `The tiles show $${p(-n)}$: $${n}$ negative tiles, each worth $-1$. Share them equally into $${g}$ groups. Find $${p(-n)} ${D} ${g}$.`,
      figure: tiles([{ pos: 0, neg: n }], n > 8 ? 6 : 4),
      parts: [numPart(-q, { label: `$${p(-n)} ${D} ${g} =$`, exact: false })],
      hints: [`Deal the $${n}$ negative tiles into $${g}$ equal groups.`, 'Each group gets the same number of negative tiles. That is the answer.'],
      solution: [
        `Share $${n}$ negative tiles into $${g}$ equal groups: $${n} ${D} ${g} = ${q}$ tiles in each group.`,
        `Each group is worth $${-q}$.`,
        `Check with multiplication: $${g} ${T} ${p(-q)} = ${-n}$.`,
        `$${p(-n)} ${D} ${g} = ${-q}$`,
      ],
    };
  }
  if (kind === 'groups') {
    const g = rng.int(2, 5);
    const q = rng.int(2, 6);
    const n = g * q;
    return {
      prompt: `How many groups of $${p(-g)}$ are in $${p(-n)}$? Find $${p(-n)} ${D} ${p(-g)}$.`,
      parts: [numPart(q, { exact: false })],
      hints: [`Make groups of $${g}$ negative tiles from $${n}$ negative tiles. How many groups?`, SIGN_RULES],
      solution: [
        `Start with $${n}$ negative tiles and make groups of $${g}$ negative tiles.`,
        `$${n} ${D} ${g} = ${q}$, so there are $${q}$ groups.`,
        `${signReason(-n, -g, 'quotient')}`,
        `$${p(-n)} ${D} ${p(-g)} = ${q}$`,
      ],
    };
  }
  const a = rng.int(2, 9);
  const b = rng.int(2, 9);
  const [n, dv] = rng.pick([[a * b, -a], [-a * b, a]]);
  const q = n / dv;
  return {
    prompt: `Find $${p(n)} ${D} ${p(dv)}$.`,
    parts: [numPart(q, { exact: false })],
    hints: ['Use the related multiplication: what times the divisor gives the dividend?', SIGN_RULES],
    solution: [`Think: $${p(dv)} ${T} ? = ${n}$.`, `$${p(dv)} ${T} ${p(q)} = ${n}$, so the quotient is $${q}$.`, signReason(n, dv, 'quotient'), `$${p(n)} ${D} ${p(dv)} = ${q}$`],
  };
}

function divD2(rng: Rng): Out {
  const kind = rng.pick(['plain', 'bar', 'missing'] as const);
  const { dv, q } = retry(() => ({ dv: signed(rng, 2, 12), q: signed(rng, 3, 12) }), (o) => o.dv < 0 || o.q < 0);
  const n = dv * q;
  if (kind === 'missing') {
    const known = rng.chance(0.5) ? dv : q;
    const ans = known === dv ? q : dv;
    const left = rng.chance(0.5);
    const eqn = left ? `${p(known)} ${T} \\square = ${n}` : `\\square ${T} ${p(known)} = ${n}`;
    return {
      prompt: `Find the missing integer: $${eqn}$`,
      parts: [numPart(ans, { label: '$\\square =$', exact: false })],
      hints: ['A missing factor can be found by dividing.', `Find $${p(n)} ${D} ${p(known)}$.`],
      solution: [`The missing factor is $${p(n)} ${D} ${p(known)}$.`, `$${Math.abs(n)} ${D} ${Math.abs(known)} = ${Math.abs(ans)}$. ${signReason(n, known, 'quotient')}`, `Check: $${left ? `${p(known)} ${T} ${p(ans)}` : `${p(ans)} ${T} ${p(known)}`} = ${n}$. ✓`, `$\\square = ${ans}$`],
    };
  }
  const expr = kind === 'bar' ? `\\dfrac{${n}}{${dv}}` : `${p(n)} ${D} ${p(dv)}`;
  return {
    prompt: `Find $${expr}$.`,
    parts: [numPart(q, { exact: false })],
    hints: [kind === 'bar' ? 'A fraction bar means divide.' : 'Divide the numbers without signs, then decide the sign.', SIGN_RULES],
    solution: [
      ...(kind === 'bar' ? [`The fraction bar means divide: $${expr} = ${p(n)} ${D} ${p(dv)}$.`] : []),
      `$${Math.abs(n)} ${D} ${Math.abs(dv)} = ${Math.abs(q)}$`,
      signReason(n, dv, 'quotient'),
      `$${expr} = ${q}$`,
    ],
  };
}

function divD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['rate', 'mean', 'owe', 'water'] as const);
  if (kind === 'rate') {
    const h = rng.int(3, 8);
    const per = -rng.int(2, 6);
    const total = per * h;
    const start = rng.int(-6, 10);
    return {
      prompt: `In ${town}, the temperature fell from $${cM(start)}$ to $${cM(start + total)}$ over $${h}$ hours. It changed by the same amount each hour. What was the change in temperature per hour?`,
      parts: [numPart(per, { exact: false, suffix: '°C per hour' })],
      hints: ['First find the total change: final temperature − starting temperature.', 'Then divide the total change by the number of hours.'],
      solution: [
        `Total change: $${start + total} - ${p(start)} = ${total}$.`,
        `Change per hour: $${p(total)} ${D} ${h} = ${per}$.`,
        `The temperature changed by $${cM(per)}$ per hour (it fell $${-per}^\\circ\\text{C}$ each hour).`,
      ],
    };
  }
  if (kind === 'mean') {
    const n = rng.pick([4, 5, 6]);
    const { vals, mean } = retry(
      () => {
        const vals = Array.from({ length: n }, () => rng.int(-18, 4));
        return { vals, mean: vals.reduce((a, b) => a + b, 0) / n };
      },
      (o) => Number.isInteger(o.mean) && o.mean < 0 && new Set(o.vals).size >= n - 1,
      400,
    );
    const sum = vals.reduce((a, b) => a + b, 0);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].slice(0, n);
    return {
      prompt: `The table shows the daily low temperatures in ${town} for $${n}$ days in January. What is the mean (average) low temperature?`,
      figure: { type: 'table', headers: ['Day', 'Low (°C)'], rows: days.map((dname, i) => [dname, `${vals[i]}`]) },
      parts: [numPart(mean, { exact: false, suffix: '°C' })],
      hints: ['Mean = sum of the values ÷ number of values.', 'Add the integers carefully, then divide. Use the sign rules for the division.'],
      solution: [`Sum: $${vals.map(p).join(' + ')} = ${sum}$.`, `Mean: $${p(sum)} ${D} ${n} = ${mean}$.`, `The mean low temperature is $${cM(mean)}$.`],
    };
  }
  if (kind === 'owe') {
    const k = rng.int(3, 6);
    const each = rng.int(4, 25);
    const total = -k * each;
    const why = rng.pick(['a broken window at the community hall', 'a pizza order for their team', 'a cabin rental at a campground', 'a bus rental for a hockey tournament']);
    return {
      prompt: `${name} and ${k - 1} friends owe ${dol(-total)} together for ${why}. They share the debt equally. A debt is negative, so the total is $${total}$ dollars. What is each person’s share, written as an integer?`,
      parts: [numPart(-each, { exact: false, label: 'Each share: \\$' })],
      hints: [`There are $${k}$ people sharing the debt.`, `Divide: $${p(total)} ${D} ${k}$.`],
      solution: [`There are $1 + ${k - 1} = ${k}$ people.`, `$${p(total)} ${D} ${k} = ${-each}$`, `Each person’s share is $${-each}$, so each owes \\$${each}.`],
    };
  }
  const days = rng.int(4, 9);
  const per = -rng.int(2, 9);
  const total = per * days;
  const what = rng.pick(['the water level of a reservoir near a city', 'the water level in a farm dugout', 'the depth of snow at a ski hill']);
  return {
    prompt: `During a dry, warm spell, ${what} changed by $${total}$ cm over $${days}$ days. What was the average change per day?`,
    parts: [numPart(per, { exact: false, suffix: 'cm per day' })],
    hints: ['Average change per day = total change ÷ number of days.', SIGN_RULES],
    solution: [`$${p(total)} ${D} ${days} = ${per}$`, `The average change was $${per}$ cm per day (a drop of $${-per}$ cm each day).`],
  };
}

const integerDivide = skill({
  id: 'm8-integer-divide',
  name: 'Dividing integers',
  description: 'Model integer division by sharing and grouping, use the sign rules to divide integers, and solve problems with average change.',
  outcomes: ['N7'],
  lessonId: 'm8-5-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return divD1(rng);
    if (d === 2) return divD2(rng);
    return divD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.3 Order of operations with integers
// ---------------------------------------------------------------------------

const BEDMAS = 'Order of operations: brackets first, then × and ÷ from left to right, then + and − from left to right.';

/** Add or subtract with an integer second term, as LaTeX: "5 + (-3)" or "5 - (-3)". */
const addTex = (op: '+' | '-', n: number) => `${op} ${p(n)}`;

function opsD1Raw(rng: Rng): Out {
  const form = rng.pick(['a+bc', 'ab+c', 'a-b/c', 'a/b+c'] as const);
  let expr: string;
  let steps: string[];
  let value: number;
  let wrong: number;
  if (form === 'a+bc' || form === 'ab+c') {
    const b = signed(rng, 2, 6);
    const c = signed(rng, 2, 6);
    const a = signed(rng, 1, 12);
    const op = rng.pick(['+', '-'] as const);
    const prod = b * c;
    if (form === 'a+bc') {
      expr = `${p(a)} ${addTex(op, b)} ${T} ${p(c)}`;
      value = op === '+' ? a + prod : a - prod;
      wrong = (op === '+' ? a + b : a - b) * c;
      steps = [`Multiply first: $${p(b)} ${T} ${p(c)} = ${prod}$.`, `Then ${op === '+' ? 'add' : 'subtract'}: $${p(a)} ${addTex(op, prod)} = ${value}$.`];
    } else {
      expr = `${p(b)} ${T} ${p(c)} ${addTex(op, a)}`;
      value = op === '+' ? prod + a : prod - a;
      wrong = value;
      steps = [`Multiply first: $${p(b)} ${T} ${p(c)} = ${prod}$.`, `Then ${op === '+' ? 'add' : 'subtract'}: $${p(prod)} ${addTex(op, a)} = ${value}$.`];
    }
  } else {
    const c = signed(rng, 2, 6);
    const q = signed(rng, 2, 8);
    const b = c * q;
    const a = signed(rng, 1, 12);
    const op = rng.pick(['+', '-'] as const);
    if (form === 'a-b/c') {
      expr = `${p(a)} ${addTex(op, b)} ${D} ${p(c)}`;
      value = op === '+' ? a + q : a - q;
      wrong = value;
      steps = [`Divide first: $${p(b)} ${D} ${p(c)} = ${q}$.`, `Then ${op === '+' ? 'add' : 'subtract'}: $${p(a)} ${addTex(op, q)} = ${value}$.`];
    } else {
      expr = `${p(b)} ${D} ${p(c)} ${addTex(op, a)}`;
      value = op === '+' ? q + a : q - a;
      wrong = value;
      steps = [`Divide first: $${p(b)} ${D} ${p(c)} = ${q}$.`, `Then ${op === '+' ? 'add' : 'subtract'}: $${p(q)} ${addTex(op, a)} = ${value}$.`];
    }
  }
  return {
    prompt: `Evaluate $${expr}$.`,
    parts: [numPart(value, { exact: false })],
    hints: [BEDMAS, 'Do the multiplication or division before the addition or subtraction.'],
    solution: [...steps, ...(wrong !== value ? [`(Working left to right instead would give $${wrong}$, which is wrong.)`] : []), `$${expr} = ${value}$`],
  };
}

function opsD2Raw(rng: Rng): Out {
  const form = rng.pick(['div-bracket', 'bracket-times', 'two-products', 'bracket-div-minus'] as const);
  let expr: string;
  let steps: string[];
  let value: number;
  if (form === 'div-bracket') {
    // a ÷ (b − c) + d × e
    const s = signed(rng, 2, 6);
    const b = rng.int(-6, 9);
    const c = b - s;
    const q = signed(rng, 2, 6);
    const a = s * q;
    const d = signed(rng, 2, 5);
    const e = signed(rng, 2, 5);
    expr = `${p(a)} ${D} (${b} - ${p(c)}) + ${p(d)} ${T} ${p(e)}`;
    value = q + d * e;
    steps = [
      `Brackets: $${b} - ${p(c)} = ${s}$.`,
      `Divide and multiply from left to right: $${p(a)} ${D} ${p(s)} = ${q}$ and $${p(d)} ${T} ${p(e)} = ${d * e}$.`,
      `Add: $${p(q)} + ${p(d * e)} = ${value}$.`,
    ];
  } else if (form === 'bracket-times') {
    // (a + b) × c − d
    const a = signed(rng, 2, 9);
    const b = signed(rng, 2, 9);
    const c = signed(rng, 2, 6);
    const d = signed(rng, 1, 12);
    const s = a + b;
    expr = `(${a} + ${p(b)}) ${T} ${p(c)} - ${p(d)}`;
    value = s * c - d;
    steps = [`Brackets: $${a} + ${p(b)} = ${s}$.`, `Multiply: $${p(s)} ${T} ${p(c)} = ${s * c}$.`, `Subtract: $${p(s * c)} - ${p(d)} = ${value}$.`];
  } else if (form === 'two-products') {
    // a × b − c × d
    const [a, b, c, d] = [signed(rng, 2, 7), signed(rng, 2, 7), signed(rng, 2, 7), signed(rng, 2, 7)];
    expr = `${p(a)} ${T} ${p(b)} - ${p(c)} ${T} ${p(d)}`;
    value = a * b - c * d;
    steps = [`Multiply first: $${p(a)} ${T} ${p(b)} = ${a * b}$ and $${p(c)} ${T} ${p(d)} = ${c * d}$.`, `Then subtract: $${p(a * b)} - ${p(c * d)} = ${value}$.`];
  } else {
    // (a − b) ÷ c × d
    const c = signed(rng, 2, 5);
    const q = signed(rng, 2, 6);
    const s = c * q;
    const b = rng.int(-8, 8);
    const a = s + b;
    const d = signed(rng, 2, 4);
    expr = `(${a} - ${p(b)}) ${D} ${p(c)} ${T} ${p(d)}`;
    value = q * d;
    steps = [`Brackets: $${a} - ${p(b)} = ${s}$.`, `Divide and multiply from left to right: $${p(s)} ${D} ${p(c)} = ${q}$, then $${p(q)} ${T} ${p(d)} = ${value}$.`];
  }
  return {
    prompt: `Evaluate $${expr}$.`,
    parts: [numPart(value, { exact: false })],
    hints: [BEDMAS, 'Work one step at a time and write each new line. Watch the signs.'],
    solution: [...steps, `$${expr} = ${value}$`],
  };
}

/** Every expression has at least one negative integer in it. */
const hasNegative = (o: Out) => /-\d/.test(o.prompt);
const opsD1 = (rng: Rng) => retry(() => opsD1Raw(rng), hasNegative, 100);
const opsD2 = (rng: Rng) => retry(() => opsD2Raw(rng), hasNegative, 100);

function opsD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['quiz', 'temps', 'money', 'game'] as const);
  if (kind === 'quiz') {
    const right = rng.int(3, 5);
    const wrongPts = -rng.int(1, 3);
    const total = rng.pick([15, 20, 25]);
    const c = rng.int(6, total - 6);
    const w = rng.int(2, total - c - 1);
    const blank = total - c - w;
    const score = c * right + w * wrongPts;
    return {
      prompt: `In a math contest, each correct answer scores $+${right}$, each wrong answer scores $${wrongPts}$ and each blank scores $0$. ${name} answered $${c}$ correctly, $${w}$ wrongly and left $${blank}$ blank. Write an expression and find ${name}’s score.`,
      parts: [numPart(score, { exact: false, label: 'Score:' })],
      hints: ['Multiply each kind of answer by its points, then add.', `Score $= ${c} ${T} ${right} + ${w} ${T} ${p(wrongPts)} + ${blank} ${T} 0$.`],
      solution: [
        `Score $= ${c} ${T} ${right} + ${w} ${T} ${p(wrongPts)} + ${blank} ${T} 0$.`,
        `Multiply first: $${c * right} + ${p(w * wrongPts)} + 0$.`,
        `Add: $${score}$.`,
        `${name}’s score is $${score}$.`,
      ],
    };
  }
  if (kind === 'temps') {
    const start = rng.int(-18, -6);
    const up = rng.int(2, 4);
    const hu = rng.int(3, 5);
    const down = rng.int(2, 4);
    const hd = rng.int(2, 4);
    const end = start + up * hu - down * hd;
    return {
      prompt: `At 7 a.m. in ${town}, the temperature was $${cM(start)}$. It rose $${up}^\\circ\\text{C}$ per hour for $${hu}$ hours, then fell $${down}^\\circ\\text{C}$ per hour for $${hd}$ hours. Write an expression and find the final temperature.`,
      parts: [numPart(end, { exact: false, suffix: '°C' })],
      hints: [`A rise is positive and a fall is negative: the changes are $${hu} ${T} ${up}$ and $${hd} ${T} ${p(-down)}$.`, 'Multiply before you add.'],
      solution: [
        `Expression: $${p(start)} + ${hu} ${T} ${up} + ${hd} ${T} ${p(-down)}$.`,
        `Multiply first: $${p(start)} + ${hu * up} + ${p(-down * hd)}$.`,
        `Add from left to right: $${p(start + hu * up)} + ${p(-down * hd)} = ${end}$.`,
        `The final temperature is $${cM(end)}$.`,
      ],
    };
  }
  if (kind === 'money') {
    const startM = 5 * rng.int(4, 12);
    const spend = rng.int(3, 8);
    const days = rng.int(3, 6);
    const earn = 5 * rng.int(2, 6);
    const times = rng.int(1, 3);
    const end = startM - spend * days + earn * times;
    return {
      prompt: `${name} has \\$${startM}. ${name} spends \\$${spend} a day on lunch for $${days}$ days and earns \\$${earn} for each of $${times}$ ${times === 1 ? 'babysitting job' : 'babysitting jobs'}. Write an expression using integers and find how much money ${name} has at the end.`,
      parts: [numPart(end, { exact: false, label: '\\$' })],
      hints: ['Spending is negative and earning is positive.', `Expression: $${startM} + ${days} ${T} ${p(-spend)} + ${times} ${T} ${earn}$.`],
      solution: [
        `Expression: $${startM} + ${days} ${T} ${p(-spend)} + ${times} ${T} ${earn}$.`,
        `Multiply first: $${startM} + ${p(-spend * days)} + ${earn * times}$.`,
        `Add from left to right: $${startM - spend * days} + ${earn * times} = ${end}$.`,
        `${name} has \\$${end} at the end.`,
      ],
    };
  }
  // game: average of round scores
  const n = rng.pick([3, 4, 5]);
  const { sc, mean } = retry(
    () => {
      const sc = Array.from({ length: n }, () => rng.int(-12, 6));
      return { sc, mean: sc.reduce((a, b) => a + b, 0) / n };
    },
    (o) => Number.isInteger(o.mean) && o.mean !== 0 && o.sc.filter((x) => x < 0).length >= 2,
    400,
  );
  const sum = sc.reduce((a, b) => a + b, 0);
  const body = sc.map(p).join(' + ');
  return {
    prompt: `In a card game, ${name}’s scores for $${n}$ rounds were ${sc.map((v) => `$${v}$`).join(', ')}. Evaluate $\\dfrac{${body}}{${n}}$ to find ${name}’s mean score per round.`,
    parts: [numPart(mean, { exact: false })],
    hints: ['The fraction bar works like brackets: add everything on top first.', 'Then divide the sum by the number of rounds.'],
    solution: [`Top first: $${body} = ${sum}$.`, `Divide: $${p(sum)} ${D} ${n} = ${mean}$.`, `The mean score is $${mean}$ per round.`],
  };
}

const integerOrderOps = skill({
  id: 'm8-integer-order-ops',
  name: 'Order of operations with integers',
  description: 'Evaluate integer expressions with brackets and all four operations in the correct order, and solve problems with integers.',
  outcomes: ['N7'],
  lessonId: 'm8-5-3',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return opsD1(rng);
    if (d === 2) return opsD2(rng);
    return opsD3(rng);
  },
});

export const INTEGERS_SKILLS: SkillDef[] = [integerMultiply, integerDivide, integerOrderOps];
