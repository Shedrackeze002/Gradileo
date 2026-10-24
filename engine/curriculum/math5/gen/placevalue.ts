/** Math 5 Unit 1 — Place Value (N1): numbers to 10 000 000 and decimals to thousandths. */
import { fixedChoice, mc, retry, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

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

/**
 * Numbers are kept as digit strings ("5273.468") so no floating-point noise reaches the page.
 * `str(units, dp)` turns a whole number of the smallest place into such a string.
 */
function str(units: number, dp: number): string {
  if (dp === 0) return String(units);
  const s = String(units).padStart(dp + 1, '0');
  return `${s.slice(0, -dp)}.${s.slice(-dp)}`;
}
/** Drop zeros at the right end of a decimal (4.50 -> 4.5, 3.000 -> 3). */
const trim = (s: string) => (s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s);
const dpOf = (s: string) => (s.includes('.') ? s.split('.')[1].length : 0);
const val = (s: string) => Number(s);
/** The whole part grouped with thin spaces when it has five or more digits: 4\,572\,306.25. */
function tex(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length >= 5 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f === undefined ? g : `${g}.${f}`;
}
const m = (s: string) => `$${tex(s)}$`;

/** Place names by power of ten. */
const PLACE: Record<number, string> = {
  6: 'millions', 5: 'hundred thousands', 4: 'ten thousands', 3: 'thousands', 2: 'hundreds', 1: 'tens', 0: 'ones',
  [-1]: 'tenths', [-2]: 'hundredths', [-3]: 'thousandths',
};
/** One of a place: "1 hundredth". */
const ONE_OF: Record<number, string> = {
  6: 'million', 5: 'hundred thousand', 4: 'ten thousand', 3: 'thousand', 2: 'hundred', 1: 'ten', 0: 'one',
  [-1]: 'tenth', [-2]: 'hundredth', [-3]: 'thousandth',
};
/** Place values as text for maths: 10^e. */
const PV: Record<number, string> = { 6: '1\\,000\\,000', 5: '100\\,000', 4: '10\\,000', 3: '1000', 2: '100', 1: '10', 0: '1', [-1]: '0.1', [-2]: '0.01', [-3]: '0.001' };

/** The digit of s in the place 10^e (0 when the place is empty). */
function digitAt(s: string, e: number): number {
  const [i, f = ''] = s.split('.');
  if (e >= 0) return e < i.length ? Number(i[i.length - 1 - e]) : 0;
  return -e <= f.length ? Number(f[-e - 1]) : 0;
}
/** Every (digit, power) of s from left to right. */
function placesOf(s: string): Array<{ d: number; e: number }> {
  const [i, f = ''] = s.split('.');
  return [...i.split('').map((d, k) => ({ d: Number(d), e: i.length - 1 - k })), ...f.split('').map((d, k) => ({ d: Number(d), e: -k - 1 }))];
}
/** The value of digit d in place e, as a digit string. */
const valueStr = (d: number, e: number) => (e >= 0 ? String(d * 10 ** e) : str(d, -e));

/** A number with `intLen` whole digits and `dp` decimal digits, all different (no zeros when `noZero`). */
function distinctNum(rng: Rng, intLen: number, dp: number, noZero = true): string {
  const pool = noZero ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ds = retry(
    () => rng.sample(pool, intLen + dp),
    (x) => x[0] !== 0 && x[x.length - 1] !== 0,
  );
  const i = ds.slice(0, intLen).join('');
  const f = ds.slice(intLen).join('');
  return f ? `${i}.${f}` : i;
}

/** A plain-number answer that the student writes in numerals; decimals stay decimals on review screens. */
function numeral(s: string, label?: string): Part {
  const v = val(s);
  return {
    label,
    answer: { kind: 'numeric', value: v, allowExpression: false, ...(s.includes('.') && { display: 'decimal' as const, asDecimal: true }), exact: trim(s) },
  };
}

// Number words -----------------------------------------------------------------

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function under100(x: number): string {
  return x < 20 ? ONES[x] : TENS[Math.floor(x / 10)] + (x % 10 ? `-${ONES[x % 10]}` : '');
}
function under1000(x: number): string {
  const h = Math.floor(x / 100);
  const r = x % 100;
  return [h ? `${ONES[h]} hundred` : '', r ? under100(r) : ''].filter(Boolean).join(' ');
}
/** A whole number below 10 000 000 in words (no "and": "and" is kept for the decimal point). */
function wholeWords(x: number): string {
  if (x === 0) return 'zero';
  const mil = Math.floor(x / 1e6);
  const th = Math.floor(x / 1000) % 1000;
  const r = x % 1000;
  return [mil ? `${under1000(mil)} million` : '', th ? `${under1000(th)} thousand` : '', r ? under1000(r) : ''].filter(Boolean).join(' ');
}
const DEC_NAME = ['', 'tenth', 'hundredth', 'thousandth'];
/** A number (digit string) in words: "twelve and forty-five thousandths". */
function words(s: string): string {
  const t = trim(s);
  const [i, f] = t.split('.');
  const w = Number(i);
  if (!f) return wholeWords(w);
  const n = Number(f);
  const dec = `${wholeWords(n)} ${DEC_NAME[f.length]}${n === 1 ? '' : 's'}`;
  return w === 0 ? dec : `${wholeWords(w)} and ${dec}`;
}

/** A place value chart for s (one row of digits). */
function chart(s: string): Figure {
  const ps = placesOf(s);
  return { type: 'table', headers: ps.map((p) => cap(PLACE[p.e])), rows: [ps.map((p) => String(p.d))] };
}

// ---------------------------------------------------------------------------
// 1.1 Place value to millions and thousandths
// ---------------------------------------------------------------------------

const PV_HINT = 'Find the ones place first. Places to the left are ones, tens, hundreds, thousands, …; places to the right of the decimal point are tenths, hundredths, thousandths.';

const BIG_CTX = [
  (x: string) => `A hockey arena sold ${x} tickets in one season.`,
  (x: string) => `A library in ${'TOWN'} has ${x} books, magazines and videos.`,
  (x: string) => `A grain elevator holds ${x} kg of wheat.`,
  (x: string) => `A website for a school board had ${x} visits this year.`,
  (x: string) => `A seed company packed ${x} seeds in one month.`,
  (x: string) => `A bee farm near ${'TOWN'} counted ${x} bees in its hives.`,
];
const DEC_CTX = [
  (x: string) => `A garden snail crawled ${x} m.`,
  (x: string) => `A bag of apples has a mass of ${x} kg.`,
  (x: string) => `A ski racer finished a run in ${x} seconds.`,
  (x: string) => `A water bottle holds ${x} L.`,
  (x: string) => `A rain gauge in ${'TOWN'} collected ${x} cm of rain.`,
  (x: string) => `A pencil is ${x} cm long.`,
];
const ctxOf = (rng: Rng, list: Array<(x: string) => string>, x: string) => rng.pick(list)(x).replace('TOWN', rng.pick(TOWNS));

/** The value of one digit, in a whole number or a decimal. */
function digitValue(rng: Rng, d: Difficulty): Out {
  const decimal = rng.chance(0.5);
  const s = decimal
    ? distinctNum(rng, d === 1 ? rng.int(1, 2) : rng.int(2, 4), d === 1 ? 2 : 3)
    : distinctNum(rng, d === 1 ? rng.int(5, 6) : 7, 0);
  const ps = placesOf(s).filter((p) => (decimal ? p.e < 0 || (d > 1 && p.e > 0) : d === 1 || p.e >= 3));
  const { d: dig, e } = rng.pick(ps);
  const v = valueStr(dig, e);
  const ctx = ctxOf(rng, decimal ? DEC_CTX : BIG_CTX, m(s));
  return {
    prompt: `${ctx} What is the **value** of the digit $${dig}$ in ${m(s)}?`,
    figure: d === 1 ? chart(s) : undefined,
    parts: [numeral(v)],
    hints: [PV_HINT, `Find the place of the $${dig}$. Its value is the digit times that place. For example, a $4$ in the hundredths place is worth $4 \\times 0.01 = 0.04$.`],
    solution: [
      `In ${m(s)}, the digit $${dig}$ is in the **${PLACE[e]}** place.`,
      `A ${ONE_OF[e]} is $${PV[e]}$, so the value is $${dig} \\times ${PV[e]} = ${tex(v)}$.`,
      `The digit $${dig}$ is worth $${tex(v)}$.`,
    ],
  };
}

/** Which place is a digit in? (The mirror place is a distractor.) */
function placeName(rng: Rng, d: Difficulty): Out {
  const s = distinctNum(rng, d === 1 ? 2 : rng.int(3, 4), 3);
  const ps = placesOf(s).filter((p) => p.e !== 0);
  const { d: dig, e } = rng.pick(ps);
  const mirror = -e;
  const others = [mirror, e + 1, e - 1, e + 2, e - 2].filter((x) => x !== e && x >= -3 && x <= 6 && x !== 0);
  return {
    prompt: `In the number ${m(s)}, which place is the digit $${dig}$ in?`,
    parts: [{ answer: mc(rng, cap(PLACE[e]), others.map((x) => cap(PLACE[x]))) }],
    hints: [PV_HINT, 'Places to the right of the decimal point end in **-ths**: tenths, hundredths, thousandths.'],
    solution: [
      `Start at the ones digit, $${digitAt(s, 0)}$. It is just left of the decimal point.`,
      e > 0
        ? `Count left: ${placesOf(s).filter((p) => p.e > 0 && p.e <= e).reverse().map((p) => `$${p.d}$ is in the ${PLACE[p.e]} place`).join(', ')}.`
        : `Count right of the decimal point: ${placesOf(s).filter((p) => p.e < 0 && p.e >= e).map((p) => `$${p.d}$ is in the ${PLACE[p.e]} place`).join(', ')}.`,
      `The digit $${dig}$ is in the **${PLACE[e]}** place.`,
    ],
  };
}

/** Place names mirror around the ones place: tens and tenths, hundreds and hundredths. */
function mirrorPlace(rng: Rng): Out {
  const k = rng.int(1, 3);
  const leftGiven = rng.chance(0.5);
  const given = leftGiven ? k : -k;
  const want = -given;
  const n = ['', 'one place', 'two places', 'three places'][k];
  const side = (e: number) => (e > 0 ? 'left' : 'right');
  const distract = [given, want + (want > 0 ? 1 : -1), want - (want > 0 ? 1 : -1), want + (want > 0 ? 2 : -2)].filter((x) => x !== 0 && x >= -3 && x <= 6 && x !== want);
  return {
    prompt: `The ${PLACE[given]} place is ${n} to the **${side(given)}** of the ones place. Which place is ${n} to the **${side(want)}** of the ones place?`,
    parts: [{ answer: mc(rng, cap(PLACE[want]), distract.map((x) => cap(PLACE[x]))) }],
    hints: ['The place names match on each side of the **ones** place, like a mirror.', 'Tens and tenths are both one place from the ones place. Hundreds and hundredths are both two places away.'],
    solution: [
      'The ones place is the centre. The names on the right match the names on the left, with **-ths** at the end.',
      `${cap(PLACE[given])} is ${n} to the ${side(given)}. The place ${n} to the ${side(want)} is the ${PLACE[want]} place.`,
      `The answer is **${PLACE[want]}**.`,
    ],
  };
}

/** A digit string with some zeros, for word and numeral questions. */
function withZeros(rng: Rng, intLen: number, dp: number, zeros: number): string {
  for (;;) {
    const len = intLen + dp;
    const ds = Array.from({ length: len }, () => rng.int(1, 9));
    const spots = rng.sample(Array.from({ length: len - 2 }, (_, i) => i + 1), Math.min(zeros, len - 2));
    for (const z of spots) ds[z] = 0;
    const s = dp ? `${ds.slice(0, intLen).join('')}.${ds.slice(intLen).join('')}` : ds.join('');
    if (dp === 0 || ds[len - 1] !== 0) return s;
  }
}

const WORD_CTX = [
  (w: string) => `On a poster about a science fair, a number is written in words: **${w}**.`,
  (w: string) => `Your teacher reads this number aloud: **${w}**.`,
  (w: string) => `A clue in a math scavenger hunt says: **${w}**.`,
  (w: string) => `A newspaper story writes a number in words: **${w}**.`,
];

/** Words to numerals. */
function wordsToNumeral(rng: Rng, d: Difficulty): Out {
  const kind = d === 3 ? 'both' : rng.pick(['whole', 'decimal'] as const);
  const s =
    kind === 'whole'
      ? withZeros(rng, rng.int(6, 7), 0, rng.int(2, 3))
      : kind === 'decimal'
        ? withZeros(rng, rng.int(1, 2), rng.int(2, 3), 1)
        : withZeros(rng, rng.int(4, 5), rng.int(2, 3), 2);
  const w = words(s);
  const [i, f] = s.split('.');
  const steps: string[] = [];
  if (Number(i) >= 1000) {
    const mil = Math.floor(Number(i) / 1e6);
    const th = Math.floor(Number(i) / 1000) % 1000;
    const r = Number(i) % 1000;
    steps.push(
      `Split the whole number at ${mil ? 'the words "million" and "thousand"' : 'the word "thousand"'}: ${[mil ? `"${under1000(mil)} million"` : '', th ? `"${under1000(th)} thousand"` : '', r ? `"${under1000(r)}"` : ''].filter(Boolean).join(', ')}.`,
    );
    steps.push(`Each group has $3$ digits${mil ? ' (except the millions)' : ''}. Fill empty places with $0$: ${mil ? `$${mil}$ million, ` : ''}$${String(th).padStart(mil ? 3 : 1, '0')}$ thousand, $${String(r).padStart(3, '0')}$.`);
  } else {
    steps.push(`The whole number part is "${wholeWords(Number(i))}", which is $${i}$.`);
  }
  if (f) {
    steps.push(`The word **and** marks the decimal point.`);
    steps.push(`"${words('0.' + f)}" ends in **${DEC_NAME[f.length]}s**, so the last digit goes in the ${PLACE[-f.length]} place: $${Number(f)}$ ${DEC_NAME[f.length]}s $= 0.${f}$.`);
  }
  steps.push(`In numerals, the number is ${m(s)}.`);
  return {
    prompt: `${rng.pick(WORD_CTX)(cap(w))} Write the number in **numerals**.`,
    parts: [numeral(s)],
    hints: [
      f ? 'The word "and" is the decimal point. The last word (tenths, hundredths or thousandths) tells you the place of the last digit.' : 'Split the words at "million" and "thousand". Each group after the millions has three digits.',
      'Put a $0$ in any place that is not named.',
    ],
    solution: steps,
  };
}

/** Plausible misreadings of s: a zero moved, dropped or added. */
function misreadings(s: string): string[] {
  const out: string[] = [];
  const [i, f = ''] = s.split('.');
  const join = (a: string, b: string) => (b ? `${a}.${b}` : a);
  const zi = [...i].map((c, k) => (c === '0' ? k : -1)).filter((k) => k >= 0);
  const zf = [...f].map((c, k) => (c === '0' ? k : -1)).filter((k) => k >= 0);
  // Move a zero one place right or left inside the whole part.
  for (const k of zi) {
    if (k + 1 < i.length) out.push(join(i.slice(0, k) + i[k + 1] + '0' + i.slice(k + 2), f));
    if (k - 1 > 0) out.push(join(i.slice(0, k - 1) + '0' + i[k - 1] + i.slice(k + 1), f));
    out.push(join(i.slice(0, k) + i.slice(k + 1), f));
  }
  for (const k of zf) {
    out.push(join(i, f.slice(0, k) + f.slice(k + 1)));
    if (k + 1 < f.length) out.push(join(i, f.slice(0, k) + f[k + 1] + '0' + f.slice(k + 2)));
  }
  if (f && f.length < 3) out.push(join(i, '0' + f));
  if (f.length === 2 && !zf.length) out.push(join(i, f.slice(0, 1) + '0' + f.slice(1)));
  // Reading past the decimal point: 12.045 as "twelve thousand forty-five", or the point moved one place.
  if (f) out.push(i + f, join(i + f[0], f.slice(1)));
  if (i.length >= 4 && i.length < 7) out.push(join(i + '0', f));
  return out.filter((x) => trim(x) !== trim(s) && !/^0\d/.test(x) && val(x) > 0 && val(x) < 1e7 && dpOf(x) <= 3);
}

/** Numerals to words (multiple choice). */
function numeralToWords(rng: Rng, d: Difficulty): Out {
  const s = retry(
    () => (d === 2 ? (rng.chance(0.5) ? withZeros(rng, 7, 0, 2) : withZeros(rng, rng.int(1, 2), 3, 1)) : withZeros(rng, 4, rng.int(2, 3), 2)),
    (x) => new Set(misreadings(x).map(trim)).size >= 3,
  );
  const wrong = rng.shuffle([...new Set(misreadings(s).map(trim))]).map(words);
  return {
    prompt: `Which shows ${m(s)} in words?`,
    parts: [{ answer: mc(rng, cap(words(s)), wrong.map(cap)) }],
    hints: [
      'Read the whole number part in groups of three digits: millions, thousands, then ones.',
      s.includes('.') ? 'Say **and** for the decimal point. Read the digits after it as one number, then say the place of the last digit.' : 'A zero is never said out loud, but it still holds its place.',
    ],
    solution: [
      ...(s.includes('.')
        ? [
            `The whole number part is $${tex(s.split('.')[0])}$: "${wholeWords(Number(s.split('.')[0]))}".`,
            `The decimal point is read as "and".`,
            `After the point, $${s.split('.')[1]}$ ends in the ${PLACE[-dpOf(s)]} place, so it is "${words('0.' + s.split('.')[1])}".`,
          ]
        : [`Split ${m(s)} into groups: ${tex(s).split('\\,').map((g) => `$${g}$`).join(', ')}. Read each group, then say "million" or "thousand".`]),
      `${m(s)} is **${words(s)}**.`,
    ],
  };
}

const unitName = (dp: number, n: number) => `${DEC_NAME[dp]}${n === 1 ? '' : 's'}`;

/** A zero at the right end of a decimal does not change its value. */
function sameValue(rng: Rng): Out {
  const w = rng.int(1, 19);
  const a = rng.int(1, 9);
  const b = rng.chance(0.5) ? rng.int(1, 9) : 0;
  const base = b ? `${w}.${a}${b}` : `${w}.${a}`;
  const fromZeros = rng.chance(0.5);
  const shown = fromZeros ? `${base}0` : base;
  const right = fromZeros ? base : `${base}0`;
  const dec = base.split('.')[1];
  const wrong = [`${w}.0${dec}`, `${w}${dec[0]}.${dec.slice(1) || '0'}`, `${w}.${dec[0]}0${dec.slice(1)}`, `${w}.00${dec}`].filter((x) => dpOf(x) <= 3 && val(x) !== val(base));
  return {
    prompt: `Which number has the **same value** as ${m(shown)}?`,
    parts: [{ answer: mc(rng, m(right), wrong.map(m)) }],
    hints: ['A zero at the **right end** of a decimal does not change its value.', 'A zero in the middle does change the value: it moves the other digits to a new place.'],
    solution: [
      `${m(shown)} and ${m(right)} have the same digits in every place. The only difference is a $0$ at the right end.`,
      `${m(base)} is $${w}$ and $${Number(dec)}$ ${unitName(dec.length, Number(dec))}. ${m(base + '0')} is $${w}$ and $${Number(dec + '0')}$ ${unitName(dec.length + 1, 2)}, which is the same amount.`,
      `The answer is ${m(right)}.`,
    ],
  };
}

/** A riddle: put the digits in their places. */
function riddle(rng: Rng): Out {
  const decimal = rng.chance(0.6);
  const s = decimal ? withZeros(rng, 3, 3, 1) : withZeros(rng, 7, 0, 2);
  const ps = placesOf(s);
  const clue = (p: { d: number; e: number }) =>
    p.d === 0 ? `I have **no** ${PLACE[p.e]}.` : `I have $${p.d}$ ${p.d === 1 ? ONE_OF[p.e] : PLACE[p.e]}.`;
  const clues = rng.shuffle(ps).map(clue);
  return {
    prompt: `Read the clues. ${decimal ? 'I am a decimal number with three decimal places.' : 'I am a whole number less than $10\\,000\\,000$.'}\n\n${clues.map((c) => `- ${c}`).join('\n')}\n\nWhat number am I? Write it in numerals.`,
    parts: [numeral(s)],
    hints: [
      'Draw a place value chart. Put each digit in its place as you read each clue.',
      decimal ? 'Be careful: tens and tenths are different places. Tenths are to the right of the decimal point.' : 'Every place from the millions down to the ones needs a digit. "No hundreds" means a $0$ there.',
    ],
    solution: [
      `Put each digit in a place value chart: ${ps.map((p) => `${PLACE[p.e]} $${p.d}$`).join(', ')}.`,
      `Read the chart from left to right${decimal ? ', with the decimal point after the ones' : ''}.`,
      `The number is ${m(s)}.`,
    ],
  };
}

const placeValue = skill({
  id: 'm5-place-value',
  name: 'Place value to millions and thousandths',
  description: 'Read and write numbers within 10 000 000 and decimals to thousandths in words and numerals, find the value of a digit, and relate place names on each side of the ones place.',
  outcomes: ['N1'],
  lessonId: 'm5-1-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.pick([digitValue, digitValue, placeName, mirrorPlace] as const)(rng, d);
    if (d === 2) return rng.pick([wordsToNumeral, wordsToNumeral, numeralToWords, digitValue, placeName, sameValue, mirrorPlace] as const)(rng, d);
    return rng.pick([riddle, riddle, wordsToNumeral, numeralToWords] as const)(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Comparing and ordering
// ---------------------------------------------------------------------------

const SYMBOLS = ['$<$', '$>$', '$=$'];
const COMPARE_HINT = 'Line up the decimal points (or the ones digits). Compare place by place from the left. The first place where the digits are different decides.';

/** Pad both numbers to the same number of decimal places. */
function padTo(s: string, dp: number): string {
  const f = s.includes('.') ? s.split('.')[1] : '';
  return dp === 0 ? s : `${s.split('.')[0]}.${f.padEnd(dp, '0')}`;
}

/** The steps that compare a and b place by place. */
function compareSteps(a: string, b: string): string[] {
  const dp = Math.max(dpOf(a), dpOf(b));
  const A = padTo(a, dp);
  const B = padTo(b, dp);
  const steps: string[] = [];
  const ia = a.split('.')[0].length;
  const ib = b.split('.')[0].length;
  if (ia !== ib) {
    steps.push(`The whole number parts have different numbers of digits: $${tex(a.split('.')[0])}$ and $${tex(b.split('.')[0])}$. The one with more digits is greater.`);
    return steps;
  }
  if (dp && (dpOf(a) !== dpOf(b))) steps.push(`Give both numbers the same number of decimal places by adding zeros at the right end: ${m(A)} and ${m(B)}. This does not change their values.`);
  const pa = placesOf(A);
  const diff = pa.find((p) => p.d !== digitAt(B, p.e));
  if (!diff) {
    steps.push(`Every digit is the same, so the numbers are equal.`);
    return steps;
  }
  const same = pa.filter((p) => p.e > diff.e).map((p) => PLACE[p.e]);
  if (same.length) steps.push(`The ${same.length > 2 ? `${same.slice(0, -1).join(', ')} and ${same[same.length - 1]}` : same.join(' and ')} digits are the same.`);
  steps.push(`In the ${PLACE[diff.e]} place: $${diff.d}$ and $${digitAt(B, diff.e)}$. Since $${diff.d} ${diff.d > digitAt(B, diff.e) ? '>' : '<'} ${digitAt(B, diff.e)}$, ${m(a)} ${diff.d > digitAt(B, diff.e) ? 'is greater' : 'is less'}.`);
  return steps;
}

/** Compare two numbers with <, > or =. */
function compareTwo(rng: Rng): Out {
  const kind = rng.pick(['whole', 'length', 'length', 'zero', 'tenthHund', 'close'] as const);
  let a: string;
  let b: string;
  const w = rng.int(0, 12);
  if (kind === 'whole') {
    a = String(rng.int(1000000, 9999999));
    const e = rng.int(1, 5);
    const da = digitAt(a, e);
    const nd = rng.intExcept(0, 9, [da]);
    b = String(val(a) + (nd - da) * 10 ** e);
  } else if (kind === 'length') {
    // 0.7 and 0.65: the longer decimal is not always greater.
    const t = rng.int(2, 8);
    a = `${w}.${t}`;
    b = `${w}.${rng.int(1, t - 1)}${rng.int(1, 9)}${rng.chance(0.5) ? rng.int(1, 9) : ''}`;
  } else if (kind === 'zero') {
    const t = `${rng.int(1, 9)}${rng.chance(0.5) ? rng.int(1, 9) : ''}`;
    a = `${w}.${t}`;
    b = `${w}.${t}0`;
  } else if (kind === 'tenthHund') {
    const t = rng.int(1, 9);
    a = `${w}.0${t}`;
    b = `${w}.${t}`;
  } else {
    const base = rng.int(100, 999);
    a = str(base * 10 + rng.int(1, 9), 3);
    b = str(base, 2);
  }
  if (rng.chance(0.5)) [a, b] = [b, a];
  const va = val(a);
  const vb = val(b);
  const correct = va < vb ? 0 : va > vb ? 1 : 2;
  const word = ['is less than', 'is greater than', 'is equal to'][correct];
  return {
    prompt: `Which symbol makes this true?\n\n$$${tex(a)} \\;\\square\\; ${tex(b)}$$`,
    parts: [{ answer: fixedChoice(SYMBOLS, correct) }],
    hints: [COMPARE_HINT, 'The symbol opens toward the greater number: $9 > 2$ and $2 < 9$.'],
    solution: [...compareSteps(a, b), `So ${m(a)} ${word} ${m(b)}: $${tex(a)} ${['<', '>', '='][correct]} ${tex(b)}$.`],
  };
}

const ORDER_CTX = [
  { intro: 'Four friends ran $60$ m at a track meet. Their times were', unit: 'seconds', ask: 'from fastest to slowest', asc: true, why: 'The fastest runner has the **least** time, so order the times from least to greatest.', w: [9, 13] },
  { intro: 'Four pumpkins from a garden in TOWN had these masses in kilograms:', unit: 'kg', ask: 'from greatest to least', asc: false, why: '', w: [3, 25] },
  { intro: 'Four students measured how far their paper airplanes flew, in metres:', unit: 'm', ask: 'from least to greatest', asc: true, why: '', w: [2, 9] },
  { intro: 'Four puppies at an animal shelter in TOWN were weighed, in kilograms:', unit: 'kg', ask: 'from least to greatest', asc: true, why: '', w: [2, 9] },
  { intro: 'Four hikers walked these distances on a trail near TOWN, in kilometres:', unit: 'km', ask: 'from greatest to least', asc: false, why: '', w: [2, 12] },
  { intro: 'Four jugs of lemonade for a class party hold these amounts, in litres:', unit: 'L', ask: 'from least to greatest', asc: true, why: '', w: [1, 4] },
];

/** Four decimals with the same whole part and different lengths. */
function fourDecimals(rng: Rng, wRange: number[]): string[] {
  for (;;) {
    const w = rng.int(wRange[0], wRange[1]);
    const t = rng.int(2, 7);
    const u = rng.int(1, 9);
    const cand = [
      `${w}.${t}`,
      `${w}.${t}${u}`,
      `${w}.${t - 1}${rng.int(5, 9)}`,
      `${w}.0${t}`,
      `${w}.${t}0${u}`,
      `${w}.${t + 1}`,
      `${w}.${t}${u}${rng.int(1, 9)}`,
    ];
    const pick = rng.sample(cand, 4);
    if (new Set(pick.map((x) => val(x))).size === 4 && new Set(pick.map((x) => dpOf(x))).size >= 2) return pick;
  }
}

function orderNumbers(rng: Rng): Out {
  const c = rng.pick(ORDER_CTX);
  const xs = fourDecimals(rng, c.w);
  const shown = retry(() => rng.shuffle(xs), (s) => s.some((v, i) => i > 0 && val(v) < val(s[i - 1])) && s.some((v, i) => i > 0 && val(v) > val(s[i - 1])));
  const sorted = [...xs].sort((p, q) => (c.asc ? val(p) - val(q) : val(q) - val(p)));
  const items: Choice[] = shown.map((v, i) => ({ id: 'abcd'[i], md: m(v) }));
  const idOf = (v: string) => items[shown.indexOf(v)].id;
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map(idOf) };
  const dp = Math.max(...xs.map(dpOf));
  return {
    prompt: `${c.intro.replace('TOWN', rng.pick(TOWNS))} ${shown.map(m).join(', ')} (${c.unit}). Put them in order **${c.ask}**.`,
    parts: [{ answer }],
    hints: [COMPARE_HINT, `Add zeros so every number has ${dp === 3 ? 'three' : 'two'} decimal places. Then compare them like whole numbers.`],
    solution: [
      ...(c.why ? [c.why] : []),
      `Add zeros at the right end so every number has the same number of decimal places: ${xs.map((x) => m(padTo(x, dp))).join(', ')}.`,
      `The ones digits are all the same, so compare the tenths, then the hundredths${dp === 3 ? ', then the thousandths' : ''}.`,
      `${cap(c.ask.replace(/^from /, ''))}: ${sorted.map(m).join(', ')}.`,
    ],
  };
}

/** Read a decimal from a number line. */
function numberLineRead(rng: Rng, d: Difficulty): Out {
  const hundredths = d > 1 && rng.chance(0.7);
  const scale = hundredths ? 100 : 10;
  const loUnits = hundredths ? rng.int(1, 89) * 10 : rng.int(0, 5) * 10;
  const k = rng.int(1, 9);
  const xUnits = loUnits + k;
  const lo = str(loUnits, hundredths ? 2 : 1);
  const hi = str(loUnits + 10, hundredths ? 2 : 1);
  const x = str(xUnits, hundredths ? 2 : 1);
  const step = 1 / scale;
  const labelled = d === 1;
  const fig: Figure = {
    type: 'numberLine',
    min: val(lo),
    max: val(hi),
    step,
    ticksLabelled: labelled,
    points: labelled ? [{ value: val(x), label: 'A' }] : [{ value: val(lo), label: trim(lo) }, { value: val(x), label: 'A' }, { value: val(hi), label: trim(hi) }],
  };
  return {
    prompt: labelled
      ? 'What decimal number does point $A$ show on the number line?'
      : `The number line goes from ${m(trim(lo))} to ${m(trim(hi))}. It is split into $10$ equal jumps. What decimal number does point $A$ show?`,
    figure: fig,
    parts: [numeral(trim(x))],
    hints: [
      `From ${m(trim(lo))} to ${m(trim(hi))} there are $10$ equal jumps. Each jump is one ${hundredths ? 'hundredth' : 'tenth'}, $${hundredths ? '0.01' : '0.1'}$.`,
      `Count the jumps from ${m(trim(lo))} to $A$.`,
    ],
    solution: [
      `The distance from ${m(trim(lo))} to ${m(trim(hi))} is $${hundredths ? '0.1' : '1'}$. It is split into $10$ equal jumps, so each jump is $${hundredths ? '0.01' : '0.1'}$.`,
      `Point $A$ is $${k}$ jumps after ${m(trim(lo))}.`,
      `$${trim(lo)} + ${k} \\times ${hundredths ? '0.01' : '0.1'} = ${trim(x)}$.`,
      `Point $A$ shows ${m(trim(x))}.`,
    ],
  };
}

/** Which decimal is between two decimals? */
function between(rng: Rng, d: Difficulty): Out {
  const w = rng.int(0, 9);
  if (d === 2) {
    const b = rng.int(1, 7);
    const c = rng.int(1, 9);
    const lo = `${w}.${b}`;
    const hi = `${w}.${b + 1}`;
    const right = `${w}.${b}${c}`;
    const wrong = [`${w}.0${c}`, `${w}.${b + 1}${c}`, `${w}.${b - 1}${c}`, `${w + 1}.${b}${c}`];
    return {
      prompt: `Which decimal number is **between** ${m(lo)} and ${m(hi)}?`,
      parts: [{ answer: mc(rng, m(right), wrong.map(m)) }],
      hints: [`Write the two numbers with hundredths: ${m(lo + '0')} and ${m(hi + '0')}.`, `Which choice is greater than ${m(lo + '0')} and less than ${m(hi + '0')}?`],
      solution: [
        `Add a zero to each number: ${m(lo + '0')} and ${m(hi + '0')}. The decimals between them are ${m(`${w}.${b}1`)}, ${m(`${w}.${b}2`)}, …, ${m(`${w}.${b}9`)}.`,
        `${m(right)} is greater than ${m(lo)} and less than ${m(hi)}.`,
        `The answer is ${m(right)}.`,
      ],
    };
  }
  const b = rng.int(0, 9);
  const c = rng.int(1, 7);
  const e = rng.int(1, 9);
  const lo = `${w}.${b}${c}`;
  const hi = `${w}.${b}${c + 1}`;
  const right = `${w}.${b}${c}${e}`;
  const out = rng.intExcept(1, 9, [c, c + 1]);
  const wrong = [`${w}.${b}${c + 1}${e}`, `${w}.${b}${out}`, `${w}.${b}${c - 1}${e}`, `${w}.${b === 9 ? 8 : b + 1}${c}`];
  return {
    prompt: `There is always another decimal number between two decimal numbers. Which number is **between** ${m(lo)} and ${m(hi)}?`,
    parts: [{ answer: mc(rng, m(right), wrong.map(m)) }],
    hints: [`Write the two numbers with thousandths: ${m(lo + '0')} and ${m(hi + '0')}.`, 'Which choice is greater than the first number and less than the second?'],
    solution: [
      `Add a zero to each number: ${m(lo + '0')} and ${m(hi + '0')}.`,
      `Now you can see numbers between them: ${m(`${w}.${b}${c}1`)}, ${m(`${w}.${b}${c}2`)}, …, ${m(`${w}.${b}${c}9`)}.`,
      `${m(right)} is greater than ${m(lo)} and less than ${m(hi)}. The answer is ${m(right)}.`,
    ],
  };
}

/** The decimal halfway between two decimals, on a number line. */
function halfway(rng: Rng): Out {
  const fine = rng.chance(0.5);
  const dp = fine ? 2 : 1;
  const loUnits = retry(() => (fine ? rng.int(101, 989) : rng.int(11, 98)), (u) => u % 10 !== 0);
  const lo = str(loUnits, dp);
  const hi = str(loUnits + 1, dp);
  const mid = str(loUnits * 10 + 5, dp + 1);
  const step = 10 ** -(dp + 1);
  return {
    prompt: `What decimal number is exactly **halfway** between ${m(lo)} and ${m(hi)}?`,
    figure: { type: 'numberLine', min: val(lo), max: val(hi), step, ticksLabelled: false, points: [{ value: val(lo), label: lo }, { value: val(mid), label: '?' }, { value: val(hi), label: hi }] },
    parts: [numeral(mid)],
    hints: [`Add a zero to each number: ${m(lo + '0')} and ${m(hi + '0')}.`, 'Now count the jumps of one more place. Halfway is $5$ jumps along.'],
    solution: [
      `Add a zero: ${m(lo + '0')} and ${m(hi + '0')}. The gap is split into $10$ jumps of $${str(1, dp + 1)}$.`,
      `Halfway is $5$ jumps: $${tex(lo + '0')} + ${str(5, dp + 1)} = ${tex(mid)}$.`,
      `The number halfway between is ${m(mid)}.`,
    ],
  };
}

/** Who jumped farthest? Compare three decimals in context. */
function compareContext(rng: Rng): Out {
  const names = rng.sample(NAMES, 3);
  const c = rng.pick([
    { what: 'long jump', unit: 'm', most: 'jumped the farthest', least: 'had the shortest jump', w: [2, 3] },
    { what: 'snowball throw', unit: 'm', most: 'threw the farthest', least: 'had the shortest throw', w: [12, 25] },
    { what: 'sunflower', unit: 'm', most: 'grew the tallest sunflower', least: 'grew the shortest sunflower', w: [1, 2] },
    { what: 'zucchini', unit: 'kg', most: 'grew the heaviest zucchini', least: 'grew the lightest zucchini', w: [1, 3] },
  ]);
  const w = rng.int(c.w[0], c.w[1]);
  const t = rng.int(1, 8);
  const u = rng.int(1, 9);
  const vals = rng.shuffle([`${w}.${t}${u}`, `${w}.${t}0${u}`, `${w}.${t + 1}`, `${w}.0${t}${u}`]).slice(0, 3);
  const most = rng.chance(0.5);
  const target = vals.reduce((p, q) => ((most ? val(q) > val(p) : val(q) < val(p)) ? q : p));
  const idx = vals.indexOf(target);
  const dp = Math.max(...vals.map(dpOf));
  const sorted = [...vals].sort((p, q) => val(p) - val(q));
  return {
    prompt: `In the ${c.what} contest, ${names.map((n, i) => `${n}’s result was $${tex(vals[i])}\\ \\text{${c.unit}}$`).join(', ').replace(/, ([^,]*)$/, ' and $1')}. Who ${most ? c.most : c.least}?`,
    parts: [{ answer: fixedChoice(names, idx) }],
    hints: [COMPARE_HINT, `Write every number with ${dp === 3 ? 'three' : 'two'} decimal places before you compare.`],
    solution: [
      `Write each number with the same number of decimal places: ${vals.map((v) => m(padTo(v, dp))).join(', ')}.`,
      `From least to greatest: ${sorted.map(m).join(', ')}.`,
      `The ${most ? 'greatest' : 'least'} is ${m(target)}, so **${names[idx]}** ${most ? c.most : c.least}.`,
    ],
  };
}

const compareOrder = skill({
  id: 'm5-compare-order',
  name: 'Comparing and ordering numbers',
  description: 'Compare numbers, including decimals, with <, > and =, order them, read decimals on a number line and find a decimal between two decimals.',
  outcomes: ['N1'],
  lessonId: 'm5-1-2',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.pick([compareTwo, compareTwo, numberLineRead] as const)(rng, d);
    if (d === 2) return rng.pick([orderNumbers, between, numberLineRead, compareTwo] as const)(rng, d);
    return rng.pick([between, halfway, compareContext, orderNumbers] as const)(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Rounding
// ---------------------------------------------------------------------------

const ROUND_HINT = 'Look at the digit just to the **right** of the rounding place. If it is $5$ or more, round up. If it is $4$ or less, round down.';

/** Round the digit string s to the place 10^e; returns a digit string with exactly the kept places. */
function roundStr(s: string, e: number): string {
  const dp = dpOf(s);
  const units = Math.round(val(s) * 10 ** dp);
  if (e >= 0) {
    const p = 10 ** (e + dp);
    return String((Math.floor(units / p) + (Math.floor(units / (p / 10)) % 10 >= 5 ? 1 : 0)) * 10 ** e);
  }
  const keep = -e;
  const p = 10 ** (dp - keep);
  const r = Math.floor(units / p) + (Math.floor(units / (p / 10)) % 10 >= 5 ? 1 : 0);
  return str(r, keep);
}
/** Truncate s to the place 10^e (the "round down" neighbour). */
function downStr(s: string, e: number): string {
  const dp = dpOf(s);
  const units = Math.round(val(s) * 10 ** dp);
  if (e >= 0) return String(Math.floor(units / 10 ** (e + dp)) * 10 ** e);
  return str(Math.floor(units / 10 ** (dp + e)), -e);
}
/** One more unit in place 10^e after truncating. */
function upStr(s: string, e: number): string {
  const lo = downStr(s, e);
  if (e >= 0) return String(val(lo) + 10 ** e);
  const k = -e;
  return str(Math.round(val(lo) * 10 ** k) + 1, k);
}

const NEAREST: Record<number, string> = { 6: 'million', 5: 'hundred thousand', 4: 'ten thousand', 3: 'thousand', 2: 'hundred', 1: 'ten', 0: 'whole number', [-1]: 'tenth', [-2]: 'hundredth' };

function roundSteps(s: string, e: number): string[] {
  const kept = digitAt(s, e);
  const next = digitAt(s, e - 1);
  const lo = downStr(s, e);
  const hi = upStr(s, e);
  const r = roundStr(s, e);
  return [
    `The rounding place is the ${PLACE[e]}. The ${PLACE[e]} digit is $${kept}$. The digit to its right is $${next}$.`,
    `${m(s)} is between ${m(lo)} and ${m(hi)}. ${next >= 5 ? `$${next}$ is $5$ or more, so round **up** to ${m(hi)}.` : `$${next}$ is $4$ or less, so round **down** to ${m(lo)}.`}`,
    `${m(s)} rounded to the nearest ${NEAREST[e]} is ${m(r)}.`,
  ];
}

/** A rounded answer: the exact rounded value, so the unrounded number is not accepted. */
function roundedPart(s: string, label?: string, suffix?: string): Part {
  const p = numeral(trim(s), label);
  return { ...p, suffix, answer: { ...p.answer, ...(s.includes('.') && { exact: s }) } as AnswerSpec };
}

/** A number to round to place e, never sitting exactly halfway. */
function roundable(rng: Rng, e: number, intLen: number, dp: number): string {
  return retry(
    () => {
      const units = rng.int(10 ** (intLen + dp - 1), 10 ** (intLen + dp) - 1);
      return str(units, dp);
    },
    (s) => digitAt(s, e - 1) !== 5 || placesOf(s).some((p) => p.e < e - 1 && p.d !== 0),
  );
}

function roundBasic(rng: Rng): Out {
  const decimal = rng.chance(0.6);
  let s: string;
  let e: number;
  let figure: Figure | undefined;
  if (decimal) {
    e = rng.pick([0, -1, -1, -2]);
    s = retry(() => roundable(rng, e, 1, -e + 1), (x) => digitAt(x, e - 1) !== 0);
    const lo = downStr(s, e);
    const hi = upStr(s, e);
    figure = { type: 'numberLine', min: val(lo), max: val(hi), step: 10 ** (e - 1), points: [{ value: val(s), label: s }] };
  } else {
    e = rng.pick([3, 4, 5]);
    s = retry(() => roundable(rng, e, e + 2, 0), (x) => digitAt(x, e - 1) !== 0);
  }
  return {
    prompt: `Round ${m(s)} to the nearest **${NEAREST[e]}**.`,
    figure,
    parts: [roundedPart(roundStr(s, e))],
    hints: [`Which two ${NEAREST[e]}s is ${m(s)} between? Which one is it closer to?`, ROUND_HINT],
    solution: roundSteps(s, e),
  };
}

interface RoundCtx {
  make: (rng: Rng) => { s: string; e: number; text: string; ask: string; say: string; unit?: string };
}

const ROUND_CTX: RoundCtx[] = [
  {
    make: (rng) => {
      const s = roundable(rng, -1, 2, 2);
      return { s, e: -1, unit: 's', text: `${rng.pick(NAMES)} swam $50$ m in $${s}$ seconds. The scoreboard at the pool shows times to the nearest tenth of a second.`, ask: 'What time does the scoreboard show?', say: 'The scoreboard shows' };
    },
  },
  {
    make: (rng) => {
      const s = roundable(rng, 0, 3, 2);
      return { s, e: 0, unit: 'km', text: `A family drove $${s}$ km from ${rng.pick(TOWNS)} to a campground. A road sign shows distances in whole kilometres.`, ask: 'What distance would the sign show?', say: 'The sign shows' };
    },
  },
  {
    make: (rng) => {
      const s = roundable(rng, -2, 1, 3);
      return { s, e: -2, unit: 'kg', text: `A sack of potatoes has a mass of $${s}$ kg. The store’s scale shows mass to the nearest hundredth of a kilogram.`, ask: 'What does the scale show?', say: 'The scale shows' };
    },
  },
  {
    make: (rng) => {
      const s = roundable(rng, 3, 5, 0);
      return { s, e: 3, text: `$${tex(s)}$ people came to a summer fair in ${rng.pick(TOWNS)}. A news story rounds the crowd to the nearest thousand.`, ask: 'What number does the story give?', say: 'The story says' };
    },
  },
  {
    make: (rng) => {
      const s = roundable(rng, 5, 7, 0);
      return { s, e: 5, text: `A video about dinosaurs has $${tex(s)}$ views. The website rounds views to the nearest hundred thousand.`, ask: 'How many views does the website show?', say: 'The website shows' };
    },
  },
  {
    make: (rng) => {
      const s = roundable(rng, 4, 6, 0);
      return { s, e: 4, unit: 'km', text: `A school bus has been driven $${tex(s)}$ km. The bus company rounds to the nearest ten thousand kilometres in its report.`, ask: 'What number goes in the report?', say: 'The report says' };
    },
  },
  {
    make: (rng) => {
      const s = roundable(rng, -1, 1, 2);
      return { s, e: -1, unit: 'cm', text: `A bean seedling grew $${s}$ cm in one week. ${rng.pick(NAMES)} records growth to the nearest tenth of a centimetre in a science journal.`, ask: 'What number goes in the journal?', say: 'The journal says' };
    },
  },
];

function roundContext(rng: Rng): Out {
  const c = rng.pick(ROUND_CTX).make(rng);
  const r = roundStr(c.s, c.e);
  return {
    prompt: `${c.text} ${c.ask}`,
    parts: [roundedPart(r, undefined, c.unit)],
    hints: [`Which place does the story ask for? Round to the nearest ${NEAREST[c.e]}.`, ROUND_HINT],
    solution: [...roundSteps(c.s, c.e), `${c.say} ${m(r)}${c.unit ? ` ${c.unit}` : ''}.`],
  };
}

/** More decimal places means more precise. */
function precise(rng: Rng): Out {
  const w = rng.int(1, 9);
  const s = `${w}.${rng.int(1, 8)}${rng.int(1, 8)}${rng.int(1, 9)}`;
  const opts = [roundStr(s, 0), roundStr(s, -1), roundStr(s, -2), s];
  const { what, unit } = rng.pick([
    { what: 'the length of a classroom table', unit: 'm' },
    { what: 'the mass of a backpack', unit: 'kg' },
    { what: 'the water in a large jug', unit: 'L' },
    { what: 'the height of a bookshelf', unit: 'm' },
    { what: 'the mass of a bag of flour', unit: 'kg' },
  ]);
  const most = rng.chance(0.6);
  const correct = most ? 3 : 0;
  const md = (o: string) => `$${o}\\ \\text{${unit}}$`;
  return {
    prompt: `Four students measured ${what}. Their results were rounded to different places. Which result is the **${most ? 'most' : 'least'} precise**?`,
    parts: [{ answer: mc(rng, md(opts[correct]), opts.filter((_, i) => i !== correct).map(md)) }],
    hints: ['A number with **more** decimal places is **more** precise. It tells you the amount in smaller pieces.', 'Count the decimal places in each result.'],
    solution: [
      `The results have $0$, $1$, $2$ and $3$ decimal places.`,
      `More decimal places means the measurement was made in smaller pieces, so it is more precise.`,
      `The ${most ? 'most' : 'least'} precise result is $${opts[correct]}\\ \\text{${unit}}$.`,
    ],
  };
}

/** Rounding that changes several digits (a 9 rounds up). */
function roundCarry(rng: Rng): Out {
  const decimal = rng.chance(0.5);
  let s: string;
  let e: number;
  if (decimal) {
    e = rng.pick([-1, -2]);
    const w = rng.int(1, 9);
    s = e === -1 ? `${w}.9${rng.int(5, 9)}` : `${w}.${rng.int(1, 8)}9${rng.int(5, 9)}`;
    if (rng.chance(0.5) && e === -2) s = `${w}.99${rng.int(5, 9)}`;
  } else {
    e = rng.pick([3, 4]);
    const len = 7;
    const ds = Array.from({ length: len }, (_, i) => (i === 0 ? rng.int(1, 8) : rng.int(0, 9)));
    ds[len - 1 - e] = 9;
    ds[len - e] = rng.int(5, 9);
    s = ds.join('');
  }
  const r = roundStr(s, e);
  return {
    prompt: `Round ${m(s)} to the nearest **${NEAREST[e]}**.`,
    parts: [roundedPart(r)],
    hints: [ROUND_HINT, `When a $9$ rounds up, it becomes $10$. Write $0$ and add $1$ to the place on its left.`],
    solution: [
      ...roundSteps(s, e).slice(0, 2),
      `Rounding the $9$ up makes $10$ ${PLACE[e]}, which is $1$ ${ONE_OF[e + 1]} more. So the digits to the left change too.`,
      `${m(s)} rounded to the nearest ${NEAREST[e]} is ${m(r)}.`,
    ],
  };
}

/** Which number could have been rounded to R? */
function roundReverse(rng: Rng): Out {
  const w = rng.int(1, 9);
  const t = rng.int(1, 8);
  const R = `${w}.${t}`;
  const inside = rng.chance(0.5) ? `${w}.${t - 1}${rng.int(5, 9)}` : `${w}.${t}${rng.int(1, 4)}`;
  const wrong = [`${w}.${t}${rng.int(5, 9)}`, `${w}.${t - 1}${rng.int(1, 4)}`, `${w}.0${t}`, `${t}.${w}`].filter((x) => roundStr(x, -1) !== R);
  return {
    prompt: `${rng.pick(NAMES)} rounded a number to the nearest tenth and got ${m(R)}. Which number could it have been?`,
    parts: [{ answer: mc(rng, m(inside), wrong.map(m)) }],
    hints: ['Round each choice to the nearest tenth. Which one gives the same answer?', ROUND_HINT],
    solution: [
      `Round each choice to the nearest tenth: ${[inside, ...wrong.slice(0, 3)].sort((p, q) => val(p) - val(q)).map((x) => `${m(x)} → ${m(roundStr(x, -1))}`).join(', ')}.`,
      `Only ${m(inside)} rounds to ${m(R)}.`,
      `The answer is ${m(inside)}.`,
    ],
  };
}

/** Round one number to two places. */
function roundTwo(rng: Rng): Out {
  const decimal = rng.chance(0.6);
  const [e1, e2] = decimal ? [-1, -2] : rng.pick([[3, 5], [2, 4], [4, 6]] as Array<[number, number]>);
  const s = decimal
    ? retry(() => roundable(rng, -2, rng.int(1, 2), 3), (x) => digitAt(x, -3) !== 5 && digitAt(x, -2) !== 5 && roundStr(x, -1) !== trim(roundStr(x, -2)))
    : retry(() => roundable(rng, e1, 7, 0), (x) => digitAt(x, e2 - 1) !== 5 && digitAt(x, e1 - 1) !== 5 && val(roundStr(x, e1)) !== val(roundStr(x, e2)));
  const r1 = roundStr(s, e1);
  const r2 = roundStr(s, e2);
  return {
    prompt: `Round ${m(s)} to the nearest **${NEAREST[e1]}** and to the nearest **${NEAREST[e2]}**.`,
    parts: [roundedPart(r1, `Nearest ${NEAREST[e1]}:`), roundedPart(r2, `Nearest ${NEAREST[e2]}:`)],
    hints: ['Round the original number each time. Do not round a rounded number again.', ROUND_HINT],
    solution: [...roundSteps(s, e1), ...roundSteps(s, e2)],
  };
}

const round = skill({
  id: 'm5-round',
  name: 'Rounding numbers and decimals',
  description: 'Round whole numbers and decimals to a place that suits the context, including when a 9 rounds up, and tell which measurement is more precise.',
  outcomes: ['N1'],
  lessonId: 'm5-1-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return roundBasic(rng);
    if (d === 2) return rng.pick([roundContext, roundContext, precise, roundBasic] as const)(rng);
    return rng.pick([roundCarry, roundReverse, roundTwo] as const)(rng);
  },
});

export const PLACEVALUE_SKILLS: SkillDef[] = [placeValue, compareOrder, round];
