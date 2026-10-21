/**
 * Checks what MiniMax writes for the tutor to say against the slide it is about, so a slip in the
 * maths never reaches a student: a slide whose lines fail any check is read from the slide
 * instead (tutor.ts). The checks are deliberately strict; a false alarm only costs the slide its
 * teacher-style wording.
 *
 * - Every number said must be on the slide (or be a small counting number such as "two places").
 * - Every calculation said ("seven times five equals thirty-five", "618 divided by 6 is 103") must
 *   be right.
 * - A whole number is said without "and" ("three hundred six"): the lessons keep "and" for the
 *   decimal point.
 * - Each line is about its own step: a model that loses its place says one step early or late, so
 *   a line that matches a neighbouring step better than its own is a mistake.
 * - A line stays short.
 */

const UNITS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const SCALES: Record<string, number> = { thousand: 1e3, million: 1e6, billion: 1e9 };
/** Decimal places named by a fraction word: "forty-five thousandths" is 0.045. */
const PLACES: Record<string, number> = {
  tenth: 1, tenths: 1, hundredth: 2, hundredths: 2, thousandth: 3, thousandths: 3,
  tenthousandth: 4, tenthousandths: 4, hundredthousandth: 5, hundredthousandths: 5, millionth: 6, millionths: 6,
};
const DIGITS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const isNumberWord = (w: string | undefined) => w !== undefined && (w in UNITS || w in TENS || w === 'hundred' || w in SCALES);

/** Joins digit groups written with spaces, as the lessons write big numbers: "4 572 306" is 4572306. */
export function joinThousands(s: string): string {
  return s.replace(/\b\d{1,3}(?:[    ,]\d{3})+(?![\d,]\d)/g, (m) => m.replace(/[    ,]/g, ''));
}

interface Parsed {
  /** The text with every number in words turned into digits. */
  text: string;
  /** A whole number said with "and" inside it, such as "three hundred and six". */
  andInWhole: boolean;
}

/**
 * Turns numbers in words into digits: "twelve and forty-five thousandths" is 12.045. A comma can
 * end a number or carry on to its next group ("four million, five hundred seventy-two thousand"
 * or "six thousand, eight hundred, and one hundred forty"); `commas` reads it as carrying on.
 */
export function wordsToDigits(input: string, commas = false): Parsed {
  const tokens = input
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\b(ten|hundred)-(thousandths?)\b/g, '$1$2')
    .replace(/\b([a-z]+)-([a-z]+)\b/g, (m, a: string, b: string) => (a in TENS && b in UNITS ? `${a} ${b}` : m))
    .match(/\d+(?:\.\d+)*|[a-z']+|\s+|[^a-z0-9\s]/g) ?? [];
  let andInWhole = false;
  const out: string[] = [];
  // Index of the next word, skipping spaces.
  const nextWord = (j: number) => {
    while (j < tokens.length && /^\s+$/.test(tokens[j])) j++;
    return j;
  };

  /** A whole number in words starting at i: its value and the index after it, or null. */
  const whole = (i: number): { value: number; end: number; and: boolean } | null => {
    if (!isNumberWord(tokens[i]) || tokens[i] === 'hundred' || tokens[i] in SCALES) return null;
    let total = 0;
    let current = 0;
    let last: 'unit' | 'teen' | 'tens' | 'hundred' | 'scale' | null = null;
    let and = false;
    let j = i;
    let end = i;
    for (;;) {
      const w = tokens[j];
      if (w === undefined) break;
      if (w in UNITS) {
        const v = UNITS[w];
        const teen = v >= 10;
        if (last === 'unit' || last === 'teen' || (last === 'tens' && (teen || v === 0))) break;
        current += v;
        last = teen ? 'teen' : 'unit';
      } else if (w in TENS) {
        if (last === 'unit' || last === 'teen' || last === 'tens') break;
        current += TENS[w];
        last = 'tens';
      } else if (w === 'hundred') {
        if (last !== 'unit' && last !== 'teen' && last !== 'tens') break;
        current *= 100;
        last = 'hundred';
      } else if (w in SCALES) {
        if (last === null || last === 'scale') break;
        total += current * SCALES[w];
        current = 0;
        last = 'scale';
      } else if (w === 'and' && (last === 'hundred' || last === 'scale')) {
        const k = nextWord(j + 1);
        if (!(tokens[k] in UNITS || tokens[k] in TENS)) break;
        // "and" followed by a fraction word is the decimal point, not part of this number.
        let m = k;
        while (isNumberWord(tokens[m]) || /^\s+$/.test(tokens[m] ?? '')) m++;
        if (tokens[m] !== undefined && tokens[m] in PLACES) break;
        and = true;
        j = k;
        continue;
      } else if (/^\s+$/.test(w) || (commas && w === ',' && last === 'scale')) {
        // Spaces keep the number going, and so may a comma after "thousand" or "million".
        j++;
        continue;
      } else break;
      j++;
      end = j;
    }
    return { value: total + current, end, and };
  };

  for (let i = 0; i < tokens.length; ) {
    // "3 tenths" is 0.3.
    const place = /^\d+$/.test(tokens[i]) ? tokens[nextWord(i + 1)] : undefined;
    if (place !== undefined && place in PLACES) {
      out.push((Number(tokens[i]) / 10 ** PLACES[place]).toFixed(PLACES[place]));
      i = nextWord(i + 1) + 1;
      continue;
    }
    const w = whole(i);
    if (!w) {
      out.push(tokens[i]);
      i++;
      continue;
    }
    let text = String(w.value);
    let j = w.end;
    andInWhole ||= w.and;
    const k = nextWord(j);
    if (tokens[k] === 'point') {
      // "zero point zero four five"
      let digits = '';
      let after = j;
      for (let m = nextWord(k + 1); tokens[m] !== undefined && DIGITS.includes(tokens[m]); m = nextWord(m + 1)) {
        digits += DIGITS.indexOf(tokens[m]);
        after = m + 1;
      }
      if (digits) {
        text = `${w.value}.${digits}`;
        j = after;
      }
    } else if (tokens[k] in PLACES) {
      // "forty-five thousandths"
      text = (w.value / 10 ** PLACES[tokens[k]]).toFixed(PLACES[tokens[k]]);
      j = k + 1;
    } else if (tokens[k] === 'and') {
      // "twelve and forty-five thousandths"
      const f = whole(nextWord(k + 1));
      const p = f && nextWord(f.end);
      if (f && p !== null && tokens[p] in PLACES) {
        text = (w.value + f.value / 10 ** PLACES[tokens[p]]).toFixed(PLACES[tokens[p]]);
        j = p + 1;
      }
    }
    out.push(text);
    // Keep the space after a number that ended on one.
    i = j > w.end ? j : w.end;
  }
  let text = out.join('');
  // "two dollars and forty cents" is $2.40.
  text = text.replace(/\b(\d+) dollars? and (\d{1,2}) cents?\b/g, (_, d: string, c: string) => `${d}.${c.padStart(2, '0')} dollars`);
  return { text: joinThousands(text), andInWhole };
}

/** The numbers in a text, written in digits or in words (see wordsToDigits for `commas`). */
export function numbersIn(text: string, commas = false): number[] {
  return [...wordsToDigits(text, commas).text.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
}

const near = (a: number, b: number, places = 6) => Math.abs(a - b) <= 0.5 * 10 ** -places + 1e-9;
const placesOf = (s: string) => (s.includes('.') ? s.split('.')[1].length : 0);

/** Calculations stated in a line ("7 times 5 equals 35") that are wrong. */
export function wrongCalculations(text: string): string[] {
  const t = wordsToDigits(text).text.replace(/\s+/g, ' ');
  const n = String.raw`(\d+(?:\.\d+)?)`;
  const eq = String.raw`\s*,?\s*(?:which\s+)?(?:is equal to|equals|is|makes|gives you|gives|=|to get|and get)\s*`;
  const wrong: string[] = [];
  // A number right after "negative", "over" or another operation belongs to something larger (a
  // sign, a fraction, a longer calculation), so the claim is not checked.
  const lead = (at: number) => /(?:negative|over|minus|times|plus|by|quantity|of|−|-|\/|×)\s*$/.test(t.slice(Math.max(0, at - 12), at));
  // Nor is one whose result goes on into more working ("400 times 30 is 4 times 3").
  const more = String.raw`(?![\d.]*\s*(?:times|multiplied|plus|minus|divided|over|squared|cubed|\/|×))`;
  const claim = (re: RegExp, ok: (a: number, b: number, c: number, m: RegExpMatchArray) => boolean) => {
    for (const m of t.matchAll(re)) {
      if (lead(m.index ?? 0)) continue;
      const [a, b, c] = [Number(m[1]), Number(m[2]), Number(m[3])];
      if (!ok(a, b, c, m)) wrong.push(m[0].trim());
    }
  };
  const tol = (x: number, m: RegExpMatchArray) => near(x, Number(m[3]), placesOf(m[3]));
  claim(new RegExp(`${n}\\s*(?:times|multiplied by|×)\\s*${n}${eq}${n}${more}`, 'gi'), (a, b, _c, m) => tol(a * b, m));
  claim(new RegExp(`multiply ${n} by ${n}${eq}${n}${more}`, 'gi'), (a, b, _c, m) => tol(a * b, m));
  claim(new RegExp(`${n}\\s*plus\\s*${n}${eq}${n}${more}`, 'gi'), (a, b, _c, m) => tol(a + b, m));
  claim(new RegExp(`add ${n} (?:to|and) ${n}${eq}${n}${more}`, 'gi'), (a, b, _c, m) => tol(a + b, m));
  const left = String.raw`(?:\s*,?\s*leaves\s*)`;
  claim(new RegExp(`${n}\\s*(?:minus|take away)\\s*${n}(?:${eq}|${left})${n}${more}`, 'gi'), (a, b, _c, m) => tol(a - b, m));
  claim(new RegExp(`subtract ${n} from ${n}(?:${eq}|${left})${n}${more}`, 'gi'), (a, b, _c, m) => tol(b - a, m));
  // "367 divided by 7 equals 52 remainder 3"; "5 divided by 4 equals 1, with some left over".
  for (const m of t.matchAll(new RegExp(`${n}\\s*divided by\\s*${n}${eq}${n}(?:\\s*,?\\s*(?:remainder|r)\\s*${n})?${more}`, 'gi'))) {
    if (lead(m.index ?? 0) || /over|\//.test(t.slice((m.index ?? 0) + m[0].length, (m.index ?? 0) + m[0].length + 6))) continue;
    const [a, b, c] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const after = t.slice((m.index ?? 0) + m[0].length, (m.index ?? 0) + m[0].length + 40);
    const ok = m[4] !== undefined
      ? b * c + Number(m[4]) === a && Number(m[4]) < b
      : tol(a / b, m) || (Number.isInteger(c) && c === Math.floor(a / b) && /remainder|left/.test(after));
    if (!ok) wrong.push(m[0].trim());
  }
  for (const m of t.matchAll(new RegExp(`${n}\\s*divided by\\s*${n}\\s*(?:leaves|has|gives)\\s*no remainder`, 'gi'))) {
    if (!lead(m.index ?? 0) && Number(m[1]) % Number(m[2]) !== 0) wrong.push(m[0].trim());
  }
  for (const m of t.matchAll(new RegExp(`${n}\\s*divided by\\s*${n}\\s*,?\\s*leaves\\s*(?:a remainder of\\s*)?${n}`, 'gi'))) {
    if (!lead(m.index ?? 0) && Number(m[1]) % Number(m[2]) !== Number(m[3])) wrong.push(m[0].trim());
  }
  return wrong;
}

/** Small counting numbers ("two places", "one at a time") are allowed even when the slide does not show them. */
const COUNTING = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 100, 1000]);

/** At most this many words a line (the prompt asks for 55). */
export const MAX_BEAT_WORDS = 70;

const STOP = new Set(
  'the a an and or of to in on for is are was be it its this that with as by at from we you your our they then so if than into each one what how which when where there their them can will just also not but all any more less same'.split(' '),
);

/** A text's content words and numbers, for telling which step a line is about. */
function content(text: string): Set<string> {
  const words = wordsToDigits(text).text.match(/[a-z]+|\d+(?:\.\d+)?/g) ?? [];
  return new Set(words.filter((w) => /\d/.test(w) || (w.length > 2 && !STOP.has(w))).map((w) => (/\d/.test(w) ? String(Number(w)) : w.replace(/(es|s)$/, ''))));
}

/** How much of a step's content a line says: 1 when every word and number of the step is in it. */
function coverage(line: Set<string>, step: Set<string>): number {
  return step.size ? [...step].filter((w) => line.has(w)).length / step.size : 1;
}

/** Steps a line is not expected to repeat: a question, a video, a diagram, working set out in columns. */
const pointer = (step: string) => /^\[(YOUR TURN|VIDEO|FIGURE)\]/.test(step) || /working is set out/.test(step);

/**
 * What is wrong with the lines written for a slide, checked against the slide's own text (as the
 * voice reads it): `context` is the lesson and slide titles, and `steps` line up with `beats`.
 * An empty list when nothing is.
 */
export function checkBeats(context: string[], steps: string[], beats: string[]): string[] {
  const slideText = [...context, ...steps];
  const key = (x: number) => Number(x.toFixed(9));
  // The slide's numbers read every way: as written, from words, and fractions as values ("7 over 10" is 0.7).
  const allowed = new Set<number>(COUNTING);
  for (const s of slideText) {
    for (const m of s.matchAll(/\d+(?:\.\d+)?/g)) allowed.add(key(Number(m[0])));
    for (const commas of [false, true]) {
      const t = wordsToDigits(s, commas).text;
      for (const m of t.matchAll(/\d+(?:\.\d+)?/g)) allowed.add(key(Number(m[0])));
      for (const m of t.matchAll(/(\d+(?:\.\d+)?) over (\d+(?:\.\d+)?)/g)) if (Number(m[2])) allowed.add(key(Number(m[1]) / Number(m[2])));
    }
  }
  // A wrong calculation the slide itself shows (a classmate's mistake) may be repeated.
  const shown = new Set(slideText.flatMap(wrongCalculations));
  const problems: string[] = [];
  const stepWords = steps.map(content);
  const lineWords = beats.map(content);
  beats.forEach((beat, k) => {
    if (/\[(YOUR TURN|VIDEO|FIGURE)\]/i.test(beat)) problems.push(`a step's tag read out: ${beat.slice(0, 60)}`);
    const step = steps[k] ?? '';
    if (pointer(step) || stepWords[k].size < 3) return;
    const own = coverage(lineWords[k], stepWords[k]);
    const near = [k - 1, k + 1].filter((j) => j >= 0 && j < steps.length && !pointer(steps[j])).map((j) => coverage(lineWords[k], stepWords[j]));
    if (own < 0.25 || Math.max(0, ...near) > own + 0.15) problems.push(`line ${k + 1} is not about its step: ${beat.slice(0, 60)}`);
  });
  for (const beat of beats) {
    const words = beat.split(/\s+/).filter(Boolean).length;
    if (words > MAX_BEAT_WORDS) problems.push(`too long (${words} words)`);
    if (wordsToDigits(beat).andInWhole) problems.push(`"and" inside a whole number: ${beat.slice(0, 80)}`);
    const off = (commas: boolean) => numbersIn(beat, commas).filter((x) => !allowed.has(key(x)));
    const split = off(false);
    if (split.length && off(true).length) problems.push(...split.map((x) => `${x} is not on the slide`));
    for (const c of wrongCalculations(beat)) if (!shown.has(c)) problems.push(`wrong: ${c}`);
  }
  return problems;
}
