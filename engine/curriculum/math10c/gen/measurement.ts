/** Unit 1 — Measurement (M1, M2, M3). */
import { byDifficulty, fixedChoice, mc, numPart, roundingPhrase, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const tx = (u: string) => `\\text{${u}}`;
const sq = (u: string) => `\\text{${u}}^2`;
const cu = (u: string) => `\\text{${u}}^3`;

// ---------------------------------------------------------------------------
// M1 — referents, estimation, instruments
// ---------------------------------------------------------------------------

const REFERENTS: Array<{ unit: string; ref: string }> = [
  { unit: 'millimetre', ref: 'the thickness of a dime' },
  { unit: 'centimetre', ref: 'the width of your little fingernail' },
  { unit: 'metre', ref: 'the height of a doorknob above the floor' },
  { unit: 'kilometre', ref: 'the distance you walk in about 12 minutes' },
  { unit: 'inch', ref: 'the width of your thumb at the knuckle' },
  { unit: 'foot', ref: 'the length of an adult’s shoe' },
  { unit: 'yard', ref: 'the distance from your nose to the fingertips of your outstretched arm' },
  { unit: 'mile', ref: 'the distance you walk in about 20 minutes' },
];

const UNIT_FOR: Array<{ thing: string; unit: string; wrong: string[] }> = [
  { thing: 'the thickness of a smartphone', unit: 'millimetres', wrong: ['metres', 'kilometres', 'yards'] },
  { thing: 'the length of a pencil', unit: 'centimetres', wrong: ['kilometres', 'miles', 'yards'] },
  { thing: 'the length of a football field', unit: 'yards', wrong: ['inches', 'millimetres', 'miles'] },
  { thing: 'the distance between two cities', unit: 'kilometres', wrong: ['centimetres', 'metres', 'feet'] },
  { thing: 'the height of a classroom door', unit: 'feet', wrong: ['miles', 'kilometres', 'millimetres'] },
  { thing: 'the width of a computer screen', unit: 'inches', wrong: ['miles', 'kilometres', 'yards'] },
  { thing: 'the length of a swimming pool', unit: 'metres', wrong: ['millimetres', 'miles', 'inches'] },
  { thing: 'the diameter of a bolt', unit: 'millimetres', wrong: ['metres', 'yards', 'kilometres'] },
  { thing: 'the length of a marathon route', unit: 'kilometres', wrong: ['centimetres', 'inches', 'feet'] },
  { thing: 'the height of a basketball player', unit: 'centimetres', wrong: ['kilometres', 'millimetres', 'miles'] },
];

const COMPARE: Array<{ a: string; b: string; longer: 0 | 1 | 2; why: string }> = [
  { a: '1 metre', b: '1 yard', longer: 0, why: '1 yd = 0.9144 m, so a metre is a little longer than a yard.' },
  { a: '1 kilometre', b: '1 mile', longer: 1, why: '1 mi ≈ 1.6 km, so a mile is longer.' },
  { a: '1 inch', b: '1 centimetre', longer: 0, why: '1 in = 2.54 cm, so an inch is longer.' },
  { a: '1 foot', b: '30 centimetres', longer: 0, why: '1 ft = 30.48 cm, so a foot is slightly longer than 30 cm.' },
  { a: '100 metres', b: '100 yards', longer: 0, why: 'A metre is longer than a yard, so 100 m is longer than 100 yd.' },
  { a: '5 kilometres', b: '3 miles', longer: 0, why: '3 mi ≈ 3 × 1.6 = 4.8 km, which is less than 5 km.' },
  { a: '10 centimetres', b: '4 inches', longer: 1, why: '4 in = 4 × 2.54 = 10.16 cm, slightly more than 10 cm.' },
  { a: '2 feet', b: '24 inches', longer: 2, why: '1 ft = 12 in, so 2 ft = 24 in exactly.' },
];

const m1Referents = skill({
  id: 'm1-referents',
  name: 'Referents and choosing units',
  description: 'Choose sensible referents and units for linear measurements and compare SI and imperial units.',
  outcomes: ['M1'],
  lessonId: 'm10c-1-1',
  format: 'mc',
  gen(rng, d) {
    const mode = d === 1 ? 'referent' : d === 2 ? rng.pick(['unit', 'referent'] as const) : rng.pick(['compare', 'unit'] as const);
    if (mode === 'referent') {
      const r = rng.pick(REFERENTS);
      const others = rng.sample(REFERENTS.filter((x) => x.unit !== r.unit), 3);
      return {
        prompt: `Which of the following is the best personal **referent** for one **${r.unit}**?`,
        parts: [{ answer: mc(rng, r.ref, others.map((o) => o.ref)) }],
        hints: ['A referent is an everyday object or distance that is about the size of one unit.', `Picture how long one ${r.unit} is. Which object is closest to that size?`],
        solution: [`One ${r.unit} is about ${r.ref}.`, 'Using referents like this lets you estimate without a measuring tool.'],
      };
    }
    if (mode === 'unit') {
      const t = rng.pick(UNIT_FOR);
      return {
        prompt: `Which unit is the most appropriate for measuring ${t.thing}?`,
        parts: [{ answer: mc(rng, t.unit, t.wrong) }],
        hints: ['Choose a unit that gives a number that is not too large and not too small.', 'Think about the size of the object compared with a referent for each unit.'],
        solution: [`${t.thing.charAt(0).toUpperCase() + t.thing.slice(1)} is best measured in ${t.unit}.`, 'The other units would give numbers that are far too large or far too small to be practical.'],
      };
    }
    const c = rng.pick(COMPARE);
    return {
      prompt: `Which is longer: **${c.a}** or **${c.b}**?`,
      parts: [{ answer: fixedChoice([c.a, c.b, 'They are the same length'], c.longer) }],
      hints: ['Recall: 1 in = 2.54 cm, 1 ft = 12 in, 1 yd = 3 ft ≈ 0.91 m, 1 mi ≈ 1.6 km.'],
      solution: [c.why],
    };
  },
});

const m1Estimate = skill({
  id: 'm1-estimate',
  name: 'Estimating with referents',
  description: 'Use a personal referent to estimate a linear measurement.',
  outcomes: ['M1'],
  lessonId: 'm10c-1-1',
  gen(rng, d) {
    const scenarios = [
      () => {
        const span = rng.pick([18, 19, 20, 21, 22]);
        const n = rng.int(4, 9);
        return {
          prompt: `Amara’s hand span is about $${span}\\ ${tx('cm')}$. The width of her desk is about $${n}$ hand spans. Estimate the width of the desk in centimetres.`,
          value: span * n,
          unit: 'cm',
          sol: [`Each hand span is about $${span}\\ ${tx('cm')}$.`, `$${n} \\times ${span} = ${span * n}$, so the desk is about $${span * n}\\ ${tx('cm')}$ wide.`],
        };
      },
      () => {
        const pace = rng.pick([0.7, 0.75, 0.8, 0.9]);
        const n = rng.int(12, 40);
        const v = roundTo(pace * n, 2);
        return {
          prompt: `Jordan’s walking pace is about $${pace}\\ ${tx('m')}$. Walking across the gym takes $${n}$ paces. Estimate the width of the gym in metres.`,
          value: v,
          unit: 'm',
          sol: [`Each pace is about $${pace}\\ ${tx('m')}$.`, `$${n} \\times ${pace} = ${fmt(v)}$, so the gym is about $${fmt(v)}\\ ${tx('m')}$ wide.`],
        };
      },
      () => {
        const n = rng.int(5, 11);
        return {
          prompt: `The width of your thumb is a referent for $1$ inch. A phone is about $${n}$ thumb-widths long. Estimate its length in inches.`,
          value: n,
          unit: 'in',
          sol: [`Each thumb-width is about $1\\ ${tx('in')}$, so the phone is about $${n}\\ ${tx('in')}$ long.`],
        };
      },
      () => {
        const n = rng.int(6, 15);
        return {
          prompt: `The distance from your nose to your outstretched fingertips is a referent for $1$ yard. A rug measures about $${n}$ of these lengths. Estimate the length of the rug in **feet**.`,
          value: n * 3,
          unit: 'ft',
          sol: [`The rug is about $${n}\\ ${tx('yd')}$ long.`, `Since $1\\ ${tx('yd')} = 3\\ ${tx('ft')}$, the rug is about $${n} \\times 3 = ${n * 3}\\ ${tx('ft')}$ long.`],
        };
      },
    ];
    if (d === 3) {
      const stride = rng.pick([0.75, 0.8]);
      const a = rng.int(30, 60);
      const b = rng.int(15, 35);
      const per = roundTo(2 * (a + b) * stride, 2);
      return {
        prompt: `Leah’s stride is about $${stride}\\ ${tx('m')}$. She walks along a rectangular field: one length takes $${a}$ strides and one width takes $${b}$ strides. Estimate the **perimeter** of the field in metres.`,
        parts: [numPart(per, { suffix: 'm', tolerance: 0.5 })],
        hints: ['Perimeter of a rectangle = 2 × (length + width).', 'First count the strides around the whole field.'],
        solution: [`Strides around the field: $2(${a} + ${b}) = ${2 * (a + b)}$.`, `Perimeter $\\approx ${2 * (a + b)} \\times ${stride} = ${fmt(per)}\\ ${tx('m')}$.`],
      };
    }
    const s = rng.pick(scenarios.slice(0, d === 1 ? 3 : 4))();
    return {
      prompt: s.prompt,
      parts: [numPart(s.value, { suffix: s.unit, tolerance: 0.01 })],
      hints: ['Multiply the size of the referent by the number of times it fits.'],
      solution: s.sol,
    };
  },
});

const m1RulerMetric = skill({
  id: 'm1-read-ruler-metric',
  name: 'Reading a metric ruler',
  description: 'Measure a length to the nearest millimetre with a metric ruler.',
  outcomes: ['M1'],
  lessonId: 'm10c-1-2',
  gen(rng, d) {
    const start = d === 1 ? 0 : rng.int(5, 30) / 10;
    const len = rng.int(15, 95) / 10;
    const end = roundTo(start + len, 1);
    const inMm = d === 3 && rng.chance(0.5);
    const value = inMm ? Math.round(len * 10) : len;
    return {
      prompt: `What is the length of the bar shown? Give your answer in **${inMm ? 'millimetres' : 'centimetres'}**.`,
      figure: { type: 'ruler', system: 'metric', length: 12, start, end },
      parts: [numPart(value, { suffix: inMm ? 'mm' : 'cm', tolerance: inMm ? 0.5 : 0.05 })],
      hints: [
        'Each small division on a metric ruler is 1 mm = 0.1 cm.',
        start === 0 ? 'The bar starts at 0, so read the mark at the right end.' : 'The bar does not start at 0. Subtract the starting reading from the ending reading.',
      ],
      solution: [
        `The bar starts at $${fmt(start)}\\ ${tx('cm')}$ and ends at $${fmt(end)}\\ ${tx('cm')}$.`,
        `Length $= ${fmt(end)} - ${fmt(start)} = ${fmt(len)}\\ ${tx('cm')}$${inMm ? ` $= ${fmt(len * 10)}\\ ${tx('mm')}$` : ''}.`,
      ],
    };
  },
});

function mixedLatex(x: number, den: number): string {
  const whole = Math.floor(x + 1e-9);
  const num = Math.round((x - whole) * den);
  if (num === 0) return `${whole}`;
  const g = gcd(num, den);
  const f = `\\tfrac{${num / g}}{${den / g}}`;
  return whole ? `${whole}${f}` : f;
}

const m1RulerImperial = skill({
  id: 'm1-read-ruler-imperial',
  name: 'Reading an imperial ruler',
  description: 'Measure a length to the nearest 1/8 or 1/16 of an inch.',
  outcomes: ['M1'],
  lessonId: 'm10c-1-2',
  gen(rng, d) {
    const division: 8 | 16 = d === 1 ? 8 : 16;
    const start = d === 3 ? rng.int(1, 2 * division) / division : 0;
    const lenTicks = rng.int(division + 1, 4 * division - 1);
    const len = lenTicks / division;
    const end = start + len;
    return {
      prompt: `What is the length of the bar, in inches? Write your answer as a mixed number such as 2 3/8.`,
      figure: { type: 'ruler', system: 'imperial', length: 6, start, end, division },
      parts: [numPart(len, { suffix: 'in', tolerance: 1e-6 })],
      hints: [
        `This ruler is divided into ${division}ths of an inch: each smallest space is $\\tfrac{1}{${division}}$ in.`,
        'The longest marks are whole inches, then halves, then quarters, then eighths' + (division === 16 ? ', then sixteenths.' : '.'),
        start ? 'Subtract the starting reading from the ending reading.' : 'Count whole inches first, then the remaining small spaces.',
      ],
      solution: [
        start ? `The bar starts at $${mixedLatex(start, division)}$ in and ends at $${mixedLatex(end, division)}$ in.` : `The bar starts at $0$.`,
        `The length is $${mixedLatex(len, division)}$ in (simplify the fraction where possible).`,
      ],
      answerDisplay: `$${mixedLatex(len, division)}$ in`,
    };
  },
});

const m1Vernier = skill({
  id: 'm1-vernier',
  name: 'Reading a vernier caliper',
  description: 'Read a vernier caliper to the nearest 0.1 mm.',
  outcomes: ['M1'],
  lessonId: 'm10c-1-2',
  gen(rng, d) {
    const reading = rng.int(52, 680) / 10; // mm
    const asCm = d === 3 && rng.chance(0.5);
    const main = Math.floor(reading);
    const vern = Math.round((reading - main) * 10);
    return {
      prompt: `Read the vernier caliper. What is the measurement in **${asCm ? 'centimetres' : 'millimetres'}**?`,
      figure: { type: 'caliper', reading },
      parts: [numPart(asCm ? reading / 10 : reading, { suffix: asCm ? 'cm' : 'mm', tolerance: asCm ? 0.005 : 0.05 })],
      hints: [
        'Read the main scale at the 0 mark of the sliding (vernier) scale: that gives the whole millimetres.',
        'Then find the vernier mark that lines up exactly with a main-scale mark. That number gives the tenths of a millimetre.',
      ],
      solution: [
        `The vernier 0 is just past $${main}\\ ${tx('mm')}$ on the main scale.`,
        `Vernier mark $${vern}$ lines up with a main-scale mark, so add $0.${vern}\\ ${tx('mm')}$.`,
        `Reading $= ${fmt(reading)}\\ ${tx('mm')}$${asCm ? ` $= ${fmt(reading / 10)}\\ ${tx('cm')}$` : ''}.`,
      ],
    };
  },
});

const m1Circumference = skill({
  id: 'm1-circumference',
  name: 'Circumference strategies',
  description: 'Relate diameter and circumference (C = πd) to measure curved lengths.',
  outcomes: ['M1'],
  lessonId: 'm10c-1-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const dia = rng.int(4, 30);
      const c = Math.PI * dia;
      return {
        prompt: `A can has a diameter of $${dia}\\ ${tx('cm')}$. Determine its circumference, ${roundingPhrase(1)}.`,
        parts: [numPart(c, { decimals: 1, suffix: 'cm' })],
        hints: ['Circumference: $C = \\pi d$.'],
        solution: [`$C = \\pi d = \\pi(${dia})$`, `$C \\approx ${fmtFixed(c, 1)}\\ ${tx('cm')}$`],
        calculator: true,
      };
    }
    if (d === 2) {
      const c = rng.int(30, 120);
      const dia = c / Math.PI;
      return {
        prompt: `A string wrapped once around a tree trunk measures $${c}\\ ${tx('in')}$. What is the diameter of the trunk, ${roundingPhrase(1)}?`,
        parts: [numPart(dia, { decimals: 1, suffix: 'in' })],
        hints: ['$C = \\pi d$, so $d = \\dfrac{C}{\\pi}$.'],
        solution: [`$d = \\dfrac{C}{\\pi} = \\dfrac{${c}}{\\pi}$`, `$d \\approx ${fmtFixed(dia, 1)}\\ ${tx('in')}$`],
        calculator: true,
      };
    }
    const wraps = rng.int(3, 6);
    const total = rng.int(40, 140);
    const dia = total / wraps / Math.PI;
    return {
      prompt: `To measure a thin bottle neck more precisely, Kai wraps a thread around it $${wraps}$ times. The thread used is $${total}\\ ${tx('mm')}$ long. Determine the diameter of the neck, ${roundingPhrase(1)} of a millimetre.`,
      parts: [numPart(dia, { decimals: 1, suffix: 'mm' })],
      hints: ['First find the length of thread for one wrap (one circumference).', 'Then use $d = \\dfrac{C}{\\pi}$.'],
      solution: [`One circumference: $C = \\dfrac{${total}}{${wraps}} = ${fmt(total / wraps)}\\ ${tx('mm')}$.`, `$d = \\dfrac{${fmt(total / wraps)}}{\\pi} \\approx ${fmtFixed(dia, 1)}\\ ${tx('mm')}$.`, 'Wrapping several times reduces the effect of small measuring errors.'],
      calculator: true,
    };
  },
});

// ---------------------------------------------------------------------------
// M2 — conversions
// ---------------------------------------------------------------------------

const SI: Array<{ u: string; name: string; inMm: number }> = [
  { u: 'mm', name: 'millimetres', inMm: 1 },
  { u: 'cm', name: 'centimetres', inMm: 10 },
  { u: 'm', name: 'metres', inMm: 1000 },
  { u: 'km', name: 'kilometres', inMm: 1_000_000 },
];

function niceDecimal(rng: Rng, max: number, dp: number): number {
  return rng.int(1, max * 10 ** dp) / 10 ** dp;
}

const m2SI = skill({
  id: 'm2-si-convert',
  name: 'Converting SI units',
  description: 'Convert between millimetres, centimetres, metres and kilometres.',
  outcomes: ['M2'],
  lessonId: 'm10c-1-3',
  gen(rng, d) {
    if (d === 3) {
      const km = rng.int(1, 9);
      const m = rng.int(10, 990);
      const total = km + m / 1000;
      return {
        prompt: `A cross-country course is $${km}\\ ${tx('km')}\\ ${m}\\ ${tx('m')}$ long. Express this length in kilometres.`,
        parts: [numPart(total, { suffix: 'km', exact: false })],
        hints: ['There are 1000 m in 1 km.', `Convert ${m} m to kilometres, then add.`],
        solution: [`$${m}\\ ${tx('m')} = \\dfrac{${m}}{1000}\\ ${tx('km')} = ${fmt(m / 1000)}\\ ${tx('km')}$`, `Total: $${km} + ${fmt(m / 1000)} = ${fmt(total)}\\ ${tx('km')}$`],
      };
    }
    const pairs: Array<[number, number]> = d === 1 ? [[0, 1], [1, 0], [1, 2], [2, 1], [2, 3], [3, 2]] : [[0, 2], [2, 0], [1, 3], [3, 1], [0, 3]];
    const [i, j] = rng.pick(pairs);
    const from = SI[i];
    const to = SI[j];
    const v = from.inMm > to.inMm ? niceDecimal(rng, 50, rng.int(0, 2)) : rng.int(1, 9) * 10 ** rng.int(1, 3) + rng.int(0, 99);
    const result = (v * from.inMm) / to.inMm;
    const factor = from.inMm > to.inMm ? from.inMm / to.inMm : to.inMm / from.inMm;
    return {
      prompt: `Convert $${fmt(v)}\\ ${tx(from.u)}$ to ${to.name}.`,
      parts: [numPart(result, { suffix: to.u, exact: false })],
      hints: [
        `$1\\ ${tx(from.inMm > to.inMm ? from.u : to.u)} = ${fmt(factor)}\\ ${tx(from.inMm > to.inMm ? to.u : from.u)}$`,
        from.inMm > to.inMm ? 'You are converting to a smaller unit, so the number gets larger: multiply.' : 'You are converting to a larger unit, so the number gets smaller: divide.',
      ],
      solution: [
        from.inMm > to.inMm
          ? `$${fmt(v)}\\ ${tx(from.u)} \\times \\dfrac{${fmt(factor)}\\ ${tx(to.u)}}{1\\ ${tx(from.u)}} = ${fmt(result, 6)}\\ ${tx(to.u)}$`
          : `$${fmt(v)}\\ ${tx(from.u)} \\times \\dfrac{1\\ ${tx(to.u)}}{${fmt(factor)}\\ ${tx(from.u)}} = ${fmt(result, 6)}\\ ${tx(to.u)}$`,
      ],
    };
  },
});

const m2Imperial = skill({
  id: 'm2-imperial-convert',
  name: 'Converting imperial units',
  description: 'Convert between inches, feet, yards and miles, including mixed units.',
  outcomes: ['M2'],
  lessonId: 'm10c-1-3',
  gen(rng, d) {
    const facts = '$12\\ \\text{in} = 1\\ \\text{ft}$, $3\\ \\text{ft} = 1\\ \\text{yd}$, $1760\\ \\text{yd} = 1\\ \\text{mi}$, $5280\\ \\text{ft} = 1\\ \\text{mi}$';
    const kind = byDifficulty(d, rng.pick(['ft-in', 'yd-ft', 'in-ft']), rng.pick(['mixed-in', 'in-mixed', 'yd-in']), rng.pick(['mi-ft', 'yd-ft-in', 'in-yd']));
    switch (kind) {
      case 'ft-in': {
        const ft = rng.int(2, 15);
        return { prompt: `Convert $${ft}\\ ${tx('ft')}$ to inches.`, parts: [numPart(ft * 12, { suffix: 'in' })], hints: [facts], solution: [`$${ft} \\times 12 = ${ft * 12}\\ ${tx('in')}$`] };
      }
      case 'yd-ft': {
        const yd = rng.int(2, 40);
        return { prompt: `Convert $${yd}\\ ${tx('yd')}$ to feet.`, parts: [numPart(yd * 3, { suffix: 'ft' })], hints: [facts], solution: [`$${yd} \\times 3 = ${yd * 3}\\ ${tx('ft')}$`] };
      }
      case 'in-ft': {
        const ft = rng.int(2, 12);
        const inches = ft * 12;
        return { prompt: `Convert $${inches}\\ ${tx('in')}$ to feet.`, parts: [numPart(ft, { suffix: 'ft' })], hints: [facts, 'Converting to a larger unit: divide.'], solution: [`$${inches} \\div 12 = ${ft}\\ ${tx('ft')}$`] };
      }
      case 'mixed-in': {
        const ft = rng.int(4, 6);
        const inch = rng.int(1, 11);
        return {
          prompt: `Marcus is $${ft}\\ ${tx('ft')}\\ ${inch}\\ ${tx('in')}$ tall. What is his height in inches?`,
          parts: [numPart(ft * 12 + inch, { suffix: 'in' })],
          hints: [facts, 'Convert the feet to inches, then add the extra inches.'],
          solution: [`$${ft}\\ ${tx('ft')} = ${ft} \\times 12 = ${ft * 12}\\ ${tx('in')}$`, `$${ft * 12} + ${inch} = ${ft * 12 + inch}\\ ${tx('in')}$`],
        };
      }
      case 'in-mixed': {
        const total = rng.int(40, 140);
        const ft = Math.floor(total / 12);
        const inch = total % 12;
        return {
          prompt: `A board is $${total}\\ ${tx('in')}$ long. Write this length in feet and inches.`,
          parts: [numPart(ft, { suffix: 'ft' }), numPart(inch, { suffix: 'in' })],
          hints: [facts, 'Divide by 12. The quotient is the number of feet; the remainder is the number of inches.'],
          solution: [`$${total} \\div 12 = ${ft}$ remainder $${inch}$`, `So $${total}\\ ${tx('in')} = ${ft}\\ ${tx('ft')}\\ ${inch}\\ ${tx('in')}$`],
        };
      }
      case 'yd-in': {
        const yd = rng.int(2, 9);
        return { prompt: `How many inches are in $${yd}\\ ${tx('yd')}$?`, parts: [numPart(yd * 36, { suffix: 'in' })], hints: [facts, '1 yd = 3 ft = 36 in.'], solution: [`$1\\ ${tx('yd')} = 3 \\times 12 = 36\\ ${tx('in')}$`, `$${yd} \\times 36 = ${yd * 36}\\ ${tx('in')}$`] };
      }
      case 'mi-ft': {
        const mi = rng.pick([0.25, 0.5, 0.75, 1.5, 2, 2.5, 3]);
        return { prompt: `A trail is $${fmt(mi)}\\ ${tx('mi')}$ long. How long is it in feet?`, parts: [numPart(mi * 5280, { suffix: 'ft' })], hints: [facts], solution: [`$${fmt(mi)} \\times 5280 = ${fmt(mi * 5280)}\\ ${tx('ft')}$`] };
      }
      case 'yd-ft-in': {
        const yd = rng.int(1, 6);
        const ft = rng.int(1, 2);
        const inch = rng.int(1, 11);
        const total = yd * 36 + ft * 12 + inch;
        return {
          prompt: `Convert $${yd}\\ ${tx('yd')}\\ ${ft}\\ ${tx('ft')}\\ ${inch}\\ ${tx('in')}$ to inches.`,
          parts: [numPart(total, { suffix: 'in' })],
          hints: [facts, 'Convert each part to inches and add.'],
          solution: [`$${yd}\\ ${tx('yd')} = ${yd * 36}\\ ${tx('in')}$, $${ft}\\ ${tx('ft')} = ${ft * 12}\\ ${tx('in')}$`, `Total $= ${yd * 36} + ${ft * 12} + ${inch} = ${total}\\ ${tx('in')}$`],
        };
      }
      default: {
        const inches = rng.int(3, 20) * 36 + rng.pick([0, 9, 18, 27]);
        const yd = inches / 36;
        return {
          prompt: `Convert $${inches}\\ ${tx('in')}$ to yards. Give your answer as a decimal.`,
          parts: [numPart(yd, { suffix: 'yd', exact: false })],
          hints: [facts, '1 yd = 36 in.'],
          solution: [`$${inches} \\div 36 = ${fmt(yd)}\\ ${tx('yd')}$`],
        };
      }
    }
  },
});

const m2AreaVolume = skill({
  id: 'm2-area-volume-units',
  name: 'Converting square and cubic units',
  description: 'Convert units of area and volume by squaring or cubing the linear conversion factor.',
  outcomes: ['M2', 'M3'],
  lessonId: 'm10c-1-3',
  gen(rng, d) {
    const opts = [
      { a: 'm', b: 'cm', f: 100, dim: 2 },
      { a: 'cm', b: 'mm', f: 10, dim: 2 },
      { a: 'ft', b: 'in', f: 12, dim: 2 },
      { a: 'yd', b: 'ft', f: 3, dim: 2 },
      { a: 'm', b: 'cm', f: 100, dim: 3 },
      { a: 'ft', b: 'in', f: 12, dim: 3 },
      { a: 'yd', b: 'ft', f: 3, dim: 3 },
    ];
    const o = d === 1 ? rng.pick(opts.slice(0, 4)) : rng.pick(opts);
    const k = o.f ** o.dim;
    const big = rng.chance(d === 3 ? 0.5 : 1);
    const v = big ? rng.int(2, 15) : rng.int(2, 9) * k;
    const result = big ? v * k : v / k;
    const unit = (u: string) => (o.dim === 2 ? sq(u) : cu(u));
    const from = big ? o.a : o.b;
    const to = big ? o.b : o.a;
    return {
      prompt: `Convert $${fmt(v)}\\ ${unit(from)}$ to ${o.dim === 2 ? 'square' : 'cubic'} ${to === 'm' ? 'metres' : to === 'cm' ? 'centimetres' : to === 'mm' ? 'millimetres' : to === 'ft' ? 'feet' : to === 'in' ? 'inches' : 'yards'}.`,
      parts: [numPart(result, { suffix: `${to}${o.dim === 2 ? '²' : '³'}`, exact: false })],
      hints: [
        `$1\\ ${tx(o.a)} = ${o.f}\\ ${tx(o.b)}$`,
        `A ${o.dim === 2 ? 'square' : 'cube'} that is $1\\ ${tx(o.a)}$ on each side is $${o.f}\\ ${tx(o.b)}$ on each side, so $1\\ ${unit(o.a)} = ${o.f}^{${o.dim}}\\ ${unit(o.b)} = ${k}\\ ${unit(o.b)}$.`,
      ],
      solution: [
        `$1\\ ${unit(o.a)} = ${o.f}^{${o.dim}}\\ ${unit(o.b)} = ${fmt(k)}\\ ${unit(o.b)}$`,
        big ? `$${fmt(v)} \\times ${fmt(k)} = ${fmt(result)}\\ ${unit(to)}$` : `$${fmt(v)} \\div ${fmt(k)} = ${fmt(result)}\\ ${unit(to)}$`,
      ],
    };
  },
});

const BETWEEN = [
  { a: 'in', b: 'cm', f: 2.54, nameA: 'inches', nameB: 'centimetres' },
  { a: 'ft', b: 'cm', f: 30.48, nameA: 'feet', nameB: 'centimetres' },
  { a: 'yd', b: 'm', f: 0.9144, nameA: 'yards', nameB: 'metres' },
  { a: 'mi', b: 'km', f: 1.609, nameA: 'miles', nameB: 'kilometres' },
  { a: 'ft', b: 'm', f: 0.3048, nameA: 'feet', nameB: 'metres' },
];

const FACTOR_TABLE =
  '$1\\ \\text{in} = 2.54\\ \\text{cm}$, $1\\ \\text{ft} = 30.48\\ \\text{cm}$, $1\\ \\text{yd} = 0.9144\\ \\text{m}$, $1\\ \\text{mi} \\approx 1.609\\ \\text{km}$';

const m2Between = skill({
  id: 'm2-between',
  name: 'Converting between SI and imperial',
  description: 'Convert lengths between SI and imperial units using conversion factors.',
  outcomes: ['M2'],
  lessonId: 'm10c-1-4',
  calculator: true,
  gen(rng, d) {
    if (d === 3 && rng.chance(0.5)) {
      const ft = rng.int(4, 6);
      const inch = rng.int(0, 11);
      const cm = (ft * 12 + inch) * 2.54;
      return {
        prompt: `A basketball player is $${ft}\\ ${tx('ft')}\\ ${inch}\\ ${tx('in')}$ tall. What is the player’s height in centimetres, ${roundingPhrase(1)}?\n\nUse ${FACTOR_TABLE}.`,
        parts: [numPart(cm, { decimals: 1, suffix: 'cm' })],
        hints: ['Convert the whole height to inches first.', 'Then multiply by 2.54 cm/in.'],
        solution: [`$${ft}\\ ${tx('ft')}\\ ${inch}\\ ${tx('in')} = ${ft} \\times 12 + ${inch} = ${ft * 12 + inch}\\ ${tx('in')}$`, `$${ft * 12 + inch}\\ ${tx('in')} \\times \\dfrac{2.54\\ ${tx('cm')}}{1\\ ${tx('in')}} \\approx ${fmtFixed(cm, 1)}\\ ${tx('cm')}$`],
        calculator: true,
      };
    }
    if (d === 3) {
      const kmh = rng.pick([50, 60, 80, 90, 100, 110]);
      const mph = kmh / 1.609;
      return {
        prompt: `A speed limit is $${kmh}\\ ${tx('km/h')}$. What is this speed in miles per hour, ${roundingPhrase(1)}?\n\nUse $1\\ \\text{mi} \\approx 1.609\\ \\text{km}$.`,
        parts: [numPart(mph, { decimals: 1, suffix: 'mi/h' })],
        hints: ['Only the distance unit changes; the time unit (hours) stays the same.', 'Divide kilometres by 1.609 to get miles.'],
        solution: [`$${kmh}\\ \\dfrac{${tx('km')}}{${tx('h')}} \\times \\dfrac{1\\ ${tx('mi')}}{1.609\\ ${tx('km')}} \\approx ${fmtFixed(mph, 1)}\\ ${tx('mi/h')}$`],
        calculator: true,
      };
    }
    const c = d === 1 ? BETWEEN[0] : rng.pick(BETWEEN);
    const toMetric = rng.chance(0.5);
    const v = toMetric ? rng.int(3, 60) : rng.int(5, 200);
    const result = toMetric ? v * c.f : v / c.f;
    const from = toMetric ? c.a : c.b;
    const to = toMetric ? c.b : c.a;
    return {
      prompt: `Convert $${v}\\ ${tx(from)}$ to ${toMetric ? c.nameB : c.nameA}, ${roundingPhrase(1)}.\n\nUse ${FACTOR_TABLE}.`,
      parts: [numPart(result, { decimals: 1, suffix: to })],
      hints: [
        `Write the conversion factor as a fraction with $${tx(from)}$ in the denominator so the units cancel.`,
        toMetric ? `Multiply by $\\dfrac{${c.f}\\ ${tx(c.b)}}{1\\ ${tx(c.a)}}$.` : `Multiply by $\\dfrac{1\\ ${tx(c.a)}}{${c.f}\\ ${tx(c.b)}}$.`,
      ],
      solution: [
        toMetric
          ? `$${v}\\ ${tx(c.a)} \\times \\dfrac{${c.f}\\ ${tx(c.b)}}{1\\ ${tx(c.a)}} = ${fmt(result, 4)}\\ ${tx(c.b)}$`
          : `$${v}\\ ${tx(c.b)} \\times \\dfrac{1\\ ${tx(c.a)}}{${c.f}\\ ${tx(c.b)}} = ${fmt(result, 4)}\\ ${tx(c.a)}$`,
        `Rounded: $${fmtFixed(result, 1)}\\ ${tx(to)}$`,
      ],
      calculator: true,
    };
  },
});

const m2UnitAnalysis = skill({
  id: 'm2-unit-analysis',
  name: 'Unit analysis',
  description: 'Set up and verify conversions with unit fractions so the units cancel.',
  outcomes: ['M2'],
  lessonId: 'm10c-1-4',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    if (d === 3) {
      const m = rng.pick([200, 400, 800, 1500]);
      const s = rng.int(Math.round(m / 9), Math.round(m / 5));
      const kmh = (m / s) * 3.6;
      return {
        prompt: `A runner covers $${m}\\ ${tx('m')}$ in $${s}\\ ${tx('s')}$. What is the runner’s average speed in kilometres per hour, ${roundingPhrase(1)}?`,
        parts: [numPart(kmh, { decimals: 1, suffix: 'km/h' })],
        hints: ['Speed = distance ÷ time, in m/s first.', 'Multiply by $\\dfrac{1\\ \\text{km}}{1000\\ \\text{m}}$ and by $\\dfrac{3600\\ \\text{s}}{1\\ \\text{h}}$.'],
        solution: [
          `$\\dfrac{${m}\\ ${tx('m')}}{${s}\\ ${tx('s')}} \\times \\dfrac{1\\ ${tx('km')}}{1000\\ ${tx('m')}} \\times \\dfrac{3600\\ ${tx('s')}}{1\\ ${tx('h')}}$`,
          `$= ${fmtFixed(kmh, 1)}\\ ${tx('km/h')}$`,
        ],
        calculator: true,
      };
    }
    const c = rng.pick(BETWEEN.slice(0, 4));
    const v = rng.int(4, 40);
    const right = `$${v}\\ ${tx(c.a)} \\times \\dfrac{${c.f}\\ ${tx(c.b)}}{1\\ ${tx(c.a)}}$`;
    const wrong1 = `$${v}\\ ${tx(c.a)} \\times \\dfrac{1\\ ${tx(c.a)}}{${c.f}\\ ${tx(c.b)}}$`;
    const wrong2 = `$${v}\\ ${tx(c.a)} \\div ${c.f}\\ ${tx(c.b)}$`;
    const wrong3 = `$${v}\\ ${tx(c.b)} \\times \\dfrac{1\\ ${tx(c.a)}}{${c.f}\\ ${tx(c.b)}}$`;
    return {
      prompt: `Which expression correctly converts $${v}\\ ${tx(c.a)}$ to ${c.nameB}?`,
      parts: [{ answer: mc(rng, right, [wrong1, wrong2, wrong3]) }],
      hints: ['In a correct set-up, the unit you start with appears in the denominator of the conversion fraction, so it cancels.'],
      solution: [`${right}: the $${tx(c.a)}$ units cancel and leave $${tx(c.b)}$.`, `Result: $${fmt(v * c.f, 4)}\\ ${tx(c.b)}$.`],
    };
  },
});

const m2Reasonable = skill({
  id: 'm2-reasonable',
  name: 'Reasonableness of conversions',
  description: 'Use mental math and approximate factors to judge whether a conversion is reasonable.',
  outcomes: ['M2'],
  lessonId: 'm10c-1-4',
  format: 'mc',
  gen(rng, d) {
    const kind = rng.pick(['mi-km', 'in-cm', 'm-ft', 'km-mi'] as const);
    let prompt = '';
    let correct = 0;
    let note = '';
    const v = rng.int(5, 30) * (d === 3 ? 3 : 1);
    switch (kind) {
      case 'mi-km':
        correct = v * 1.6;
        prompt = `Without a calculator, which is the most reasonable length in kilometres for $${v}\\ ${tx('mi')}$?`;
        note = `$1\\ ${tx('mi')} \\approx 1.6\\ ${tx('km')}$, so $${v}\\ ${tx('mi')} \\approx ${v} \\times 1.6 \\approx ${fmt(correct)}\\ ${tx('km')}$.`;
        break;
      case 'km-mi':
        correct = v / 1.6;
        prompt = `Without a calculator, which is the most reasonable length in miles for $${v}\\ ${tx('km')}$?`;
        note = `$1\\ ${tx('km')} \\approx 0.6\\ ${tx('mi')}$, so $${v}\\ ${tx('km')} \\approx ${fmt(v * 0.6)}\\ ${tx('mi')}$.`;
        break;
      case 'in-cm':
        correct = v * 2.54;
        prompt = `Without a calculator, which is the most reasonable length in centimetres for $${v}\\ ${tx('in')}$?`;
        note = `$1\\ ${tx('in')} \\approx 2.5\\ ${tx('cm')}$, so $${v}\\ ${tx('in')} \\approx ${fmt(v * 2.5)}\\ ${tx('cm')}$.`;
        break;
      case 'm-ft':
        correct = v * 3.28;
        prompt = `Without a calculator, which is the most reasonable length in feet for $${v}\\ ${tx('m')}$?`;
        note = `$1\\ ${tx('m')} \\approx 3.3\\ ${tx('ft')}$, so $${v}\\ ${tx('m')} \\approx ${fmt(v * 3.3)}\\ ${tx('ft')}$.`;
        break;
    }
    const r = (x: number) => `$${fmt(Math.round(x))}$`;
    const distract = [correct / 2.6, correct * 2.6, correct * 10, correct / 10, v].map(r);
    return {
      prompt,
      parts: [{ answer: mc(rng, r(correct), distract) }],
      hints: ['Use friendly approximations: 1 in ≈ 2.5 cm, 1 m ≈ 3.3 ft, 1 mi ≈ 1.6 km.', 'Is the new unit bigger or smaller? A smaller unit means a bigger number.'],
      solution: [note],
    };
  },
});

// ---------------------------------------------------------------------------
// M3 — surface area and volume
// ---------------------------------------------------------------------------

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [9, 12, 15],
  [7, 24, 25],
];

function pickUnit(rng: Rng, imperialChance = 0.35): { u: string; name: string; imperial: boolean } {
  return rng.chance(imperialChance) ? { u: rng.pick(['in', 'ft']), name: '', imperial: true } : { u: rng.pick(['cm', 'm', 'mm']), name: '', imperial: false };
}

function unitWord(u: string, kind: 'sq' | 'cu') {
  const w: Record<string, string> = { cm: 'centimetre', m: 'metre', mm: 'millimetre', in: 'inch', ft: 'foot', yd: 'yard', km: 'kilometre' };
  return `${kind === 'sq' ? 'square' : 'cubic'} ${w[u] ?? u}`;
}

const m3SAPrism = skill({
  id: 'm3-sa-prism',
  name: 'Surface area of right prisms',
  description: 'Find the surface area of rectangular and triangular right prisms.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-5',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng);
    if (d === 2) {
      const [a, b, c] = rng.pick(TRIPLES);
      const L = rng.int(5, 20);
      const sa = a * b + (a + b + c) * L;
      return {
        prompt: `Determine the surface area of the right triangular prism.`,
        figure: { type: 'solid', shape: 'triPrism', labels: { a: `${a} ${u}`, b: `${b} ${u}`, c: `${c} ${u}`, l: `${L} ${u}` } },
        parts: [numPart(sa, { suffix: `${u}²` })],
        hints: ['A triangular prism has 2 triangular faces and 3 rectangular faces.', 'Each triangle has area $\\tfrac12 \\times$ leg $\\times$ leg.', 'The three rectangles together have area (perimeter of triangle) × length.'],
        solution: [
          `Two triangles: $2 \\times \\tfrac12(${a})(${b}) = ${a * b}\\ ${sq(u)}$`,
          `Three rectangles: $(${a} + ${b} + ${c})(${L}) = ${(a + b + c) * L}\\ ${sq(u)}$`,
          `$SA = ${a * b} + ${(a + b + c) * L} = ${sa}\\ ${sq(u)}$`,
        ],
      };
    }
    const l = rng.int(3, 20);
    const w = rng.int(2, 15);
    const h = rng.int(2, 15);
    if (d === 3) {
      const sa = l * w + 2 * l * h + 2 * w * h;
      return {
        prompt: `An open-top storage box (no lid) is $${l}\\ ${tx(u)}$ long, $${w}\\ ${tx(u)}$ wide and $${h}\\ ${tx(u)}$ high. How much material is needed to make the box? (Ignore overlap.)`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} ${u}`, w: `${w} ${u}`, h: `${h} ${u}` } },
        parts: [numPart(sa, { suffix: `${u}²` })],
        hints: ['A box with no lid has only 5 faces: the bottom and four sides.', 'Do not include the top face.'],
        solution: [`Bottom: $${l} \\times ${w} = ${l * w}$`, `Front and back: $2(${l} \\times ${h}) = ${2 * l * h}$`, `Two ends: $2(${w} \\times ${h}) = ${2 * w * h}$`, `$SA = ${l * w} + ${2 * l * h} + ${2 * w * h} = ${sa}\\ ${sq(u)}$`],
      };
    }
    const sa = 2 * (l * w + l * h + w * h);
    return {
      prompt: `Determine the surface area of the right rectangular prism.`,
      figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} ${u}`, w: `${w} ${u}`, h: `${h} ${u}` } },
      parts: [numPart(sa, { suffix: `${u}²` })],
      hints: ['A rectangular prism has 3 pairs of identical faces.', '$SA = 2(lw + lh + wh)$'],
      solution: [`$SA = 2(lw + lh + wh)$`, `$= 2(${l}\\cdot${w} + ${l}\\cdot${h} + ${w}\\cdot${h})$`, `$= 2(${l * w} + ${l * h} + ${w * h}) = ${sa}\\ ${sq(u)}$`],
    };
  },
});

const m3SACylinder = skill({
  id: 'm3-sa-cylinder',
  name: 'Surface area of right cylinders',
  description: 'Find the surface area of closed and open right cylinders.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-5',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng);
    const r = rng.int(2, 12);
    const h = rng.int(3, 25);
    const useD = d >= 2 && rng.chance(0.6);
    const labels: Record<string, string> = useD ? { d: `${2 * r} ${u}`, h: `${h} ${u}` } : { r: `${r} ${u}`, h: `${h} ${u}` };
    if (d === 3) {
      const variant = rng.pick(['open', 'label'] as const);
      const sa = variant === 'open' ? Math.PI * r * r + 2 * Math.PI * r * h : 2 * Math.PI * r * h;
      return {
        prompt:
          variant === 'open'
            ? `A cylindrical planter with no top has a diameter of $${2 * r}\\ ${tx(u)}$ and a height of $${h}\\ ${tx(u)}$. What is the outside surface area, ${roundingPhrase(1)} ${unitWord(u, 'sq')}?`
            : `A paper label wraps exactly around the curved side of a can with diameter $${2 * r}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$. What is the area of the label, ${roundingPhrase(1)} ${unitWord(u, 'sq')}?`,
        figure: { type: 'solid', shape: 'cylinder', labels: { d: `${2 * r} ${u}`, h: `${h} ${u}` } },
        parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
        hints: variant === 'open' ? ['There is only one circular face (the bottom).', 'Lateral area = $2\\pi rh$.'] : ['The label covers only the curved (lateral) surface.', 'Lateral area $= 2\\pi r h$ — unroll it into a rectangle that is $2\\pi r$ by $h$.'],
        solution:
          variant === 'open'
            ? [`$r = ${2 * r} \\div 2 = ${r}$`, `$SA = \\pi r^2 + 2\\pi r h = \\pi(${r})^2 + 2\\pi(${r})(${h})$`, `$SA \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`]
            : [`$r = ${r}$`, `$A = 2\\pi r h = 2\\pi(${r})(${h}) \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
        calculator: true,
      };
    }
    const sa = 2 * Math.PI * r * r + 2 * Math.PI * r * h;
    return {
      prompt: `Determine the surface area of the closed right cylinder, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`,
      figure: { type: 'solid', shape: 'cylinder', labels },
      parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
      hints: ['$SA = 2\\pi r^2 + 2\\pi r h$ (two circles plus the curved rectangle).', useD ? 'The radius is half the diameter.' : 'Substitute the radius and height.'],
      solution: [
        ...(useD ? [`$r = ${2 * r} \\div 2 = ${r}\\ ${tx(u)}$`] : []),
        `$SA = 2\\pi r^2 + 2\\pi r h = 2\\pi(${r})^2 + 2\\pi(${r})(${h})$`,
        `$= ${fmt(2 * r * r)}\\pi + ${fmt(2 * r * h)}\\pi = ${fmt(2 * r * r + 2 * r * h)}\\pi \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`,
      ],
      calculator: true,
    };
  },
});

const m3Slant = skill({
  id: 'm3-slant-height',
  name: 'Height and slant height',
  description: 'Use the Pythagorean theorem to find the slant height or height of a cone or pyramid.',
  outcomes: ['M3', 'M4'],
  lessonId: 'm10c-1-6',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.2);
    const cone = d === 1 ? true : rng.chance(0.5);
    if (cone) {
      const r = rng.int(3, 12);
      const h = rng.int(4, 20);
      const s = Math.hypot(r, h);
      const findH = d === 3;
      if (findH) {
        const sGiven = rng.int(Math.ceil(r + 2), r + 15);
        const hh = Math.sqrt(sGiven * sGiven - r * r);
        return {
          prompt: `A right cone has radius $${r}\\ ${tx(u)}$ and slant height $${sGiven}\\ ${tx(u)}$. Determine its height, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'cone', labels: { r: `${r} ${u}`, s: `${sGiven} ${u}`, h: 'h' }, show: ['h', 's', 'r'] },
          parts: [numPart(hh, { decimals: 1, suffix: u })],
          hints: ['The height, radius and slant height form a right triangle. The slant height is the hypotenuse.', '$h^2 = s^2 - r^2$'],
          solution: [`$h^2 + r^2 = s^2$`, `$h^2 = ${sGiven}^2 - ${r}^2 = ${sGiven * sGiven - r * r}$`, `$h = \\sqrt{${sGiven * sGiven - r * r}} \\approx ${fmtFixed(hh, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
      return {
        prompt: `A right cone has radius $${r}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$. Determine its slant height, ${roundingPhrase(1)}.`,
        figure: { type: 'solid', shape: 'cone', labels: { r: `${r} ${u}`, h: `${h} ${u}`, s: 's' }, show: ['h', 's', 'r'] },
        parts: [numPart(s, { decimals: 1, suffix: u })],
        hints: ['The radius, height and slant height form a right triangle.', '$s^2 = r^2 + h^2$'],
        solution: [`$s^2 = r^2 + h^2 = ${r}^2 + ${h}^2 = ${r * r + h * h}$`, `$s = \\sqrt{${r * r + h * h}} \\approx ${fmtFixed(s, 1)}\\ ${tx(u)}$`],
        calculator: true,
      };
    }
    const b = rng.int(3, 10) * 2;
    const h = rng.int(4, 20);
    const s = Math.hypot(b / 2, h);
    return {
      prompt: `A right square pyramid has base side length $${b}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$. Determine the slant height of a triangular face, ${roundingPhrase(1)}.`,
      figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ${u}`, h: `${h} ${u}`, s: 's' }, show: ['h', 's'] },
      parts: [numPart(s, { decimals: 1, suffix: u })],
      hints: ['The height, half of the base side, and the slant height form a right triangle.', `Half of the base is $${b / 2}\\ ${tx(u)}$.`],
      solution: [`$s^2 = h^2 + \\left(\\tfrac{b}{2}\\right)^2 = ${h}^2 + ${b / 2}^2 = ${h * h + (b / 2) ** 2}$`, `$s = \\sqrt{${h * h + (b / 2) ** 2}} \\approx ${fmtFixed(s, 1)}\\ ${tx(u)}$`],
      calculator: true,
    };
  },
});

const m3SAPyramid = skill({
  id: 'm3-sa-pyramid',
  name: 'Surface area of right pyramids',
  description: 'Find the surface area of right square and rectangular pyramids.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-6',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    if (d === 3) {
      const l = rng.int(6, 14);
      const w = rng.int(4, l - 1);
      const s1 = rng.int(6, 15);
      const s2 = rng.int(6, 15);
      const sa = l * w + l * s1 + w * s2;
      return {
        prompt: `A right rectangular pyramid has a base $${l}\\ ${tx(u)}$ by $${w}\\ ${tx(u)}$. The slant height of the triangular faces on the $${l}$-${u} sides is $${s1}\\ ${tx(u)}$, and on the $${w}$-${u} sides it is $${s2}\\ ${tx(u)}$. Determine the surface area.`,
        figure: { type: 'solid', shape: 'rectPyramid', labels: { l: `${l} ${u}`, w: `${w} ${u}`, s: `${s1} ${u}`, s2: `${s2} ${u}` }, show: ['s'] },
        parts: [numPart(sa, { suffix: `${u}²` })],
        hints: ['There are two pairs of congruent triangles plus a rectangular base.', 'Each pair of triangles has area $2 \\times \\tfrac12 \\times$ base $\\times$ slant height.'],
        solution: [`Base: $${l} \\times ${w} = ${l * w}$`, `Triangles on the long sides: $2 \\times \\tfrac12(${l})(${s1}) = ${l * s1}$`, `Triangles on the short sides: $2 \\times \\tfrac12(${w})(${s2}) = ${w * s2}$`, `$SA = ${l * w} + ${l * s1} + ${w * s2} = ${sa}\\ ${sq(u)}$`],
      };
    }
    const b = rng.int(2, 10) * 2;
    if (d === 2) {
      const h = rng.int(4, 18);
      const s = Math.hypot(h, b / 2);
      const sa = b * b + 2 * b * s;
      return {
        prompt: `A right square pyramid has base side $${b}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$. Determine its surface area, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`,
        figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ${u}`, h: `${h} ${u}` }, show: ['h'] },
        parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
        hints: ['You need the slant height, not the height, for the triangular faces.', `Find the slant height: $s^2 = ${h}^2 + ${b / 2}^2$.`, '$SA = b^2 + 4\\left(\\tfrac12 b s\\right) = b^2 + 2bs$'],
        solution: [`$s = \\sqrt{${h}^2 + ${b / 2}^2} = \\sqrt{${h * h + (b * b) / 4}} \\approx ${fmt(s, 3)}$`, `$SA = b^2 + 2bs = ${b}^2 + 2(${b})(${fmt(s, 3)})$`, `$SA \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
        calculator: true,
      };
    }
    const s = rng.int(4, 20);
    const sa = b * b + 2 * b * s;
    return {
      prompt: `Determine the surface area of the right square pyramid.`,
      figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ${u}`, s: `${s} ${u}` }, show: ['s'] },
      parts: [numPart(sa, { suffix: `${u}²` })],
      hints: ['The surface area is the square base plus four congruent triangles.', 'Each triangle has area $\\tfrac12 \\times b \\times s$.'],
      solution: [`Base: $${b}^2 = ${b * b}$`, `Four triangles: $4 \\times \\tfrac12(${b})(${s}) = ${2 * b * s}$`, `$SA = ${b * b} + ${2 * b * s} = ${sa}\\ ${sq(u)}$`],
    };
  },
});

const m3SACone = skill({
  id: 'm3-sa-cone',
  name: 'Surface area of right cones',
  description: 'Find the surface area of a right cone, finding the slant height if needed.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-6',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    const r = rng.int(2, 12);
    if (d === 1) {
      const s = rng.int(r + 2, r + 18);
      const sa = Math.PI * r * r + Math.PI * r * s;
      return {
        prompt: `Determine the surface area of the right cone, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`,
        figure: { type: 'solid', shape: 'cone', labels: { r: `${r} ${u}`, s: `${s} ${u}` }, show: ['r', 's'] },
        parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
        hints: ['$SA = \\pi r^2 + \\pi r s$ (base + lateral area).'],
        solution: [`$SA = \\pi r^2 + \\pi r s = \\pi(${r})^2 + \\pi(${r})(${s})$`, `$= ${r * r + r * s}\\pi \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
        calculator: true,
      };
    }
    const h = rng.int(4, 20);
    const s = Math.hypot(r, h);
    const open = d === 3;
    const sa = open ? Math.PI * r * s : Math.PI * r * r + Math.PI * r * s;
    return {
      prompt: open
        ? `A paper drinking cup is shaped like a cone with no lid. It has a diameter of $${2 * r}\\ ${tx(u)}$ and a height of $${h}\\ ${tx(u)}$. How much paper is needed, ${roundingPhrase(1)} ${unitWord(u, 'sq')}?`
        : `A right cone has diameter $${2 * r}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$. Determine its surface area, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`,
      figure: { type: 'solid', shape: 'cone', labels: { d: `${2 * r} ${u}`, h: `${h} ${u}` }, show: ['h', 'd'] },
      parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
      hints: ['The formula uses the slant height $s$, so find it first: $s^2 = r^2 + h^2$.', open ? 'A cup has no base on top and no circle needed: only the lateral area $\\pi r s$.' : '$SA = \\pi r^2 + \\pi r s$'],
      solution: [
        `$r = ${r}$, $s = \\sqrt{${r}^2 + ${h}^2} = \\sqrt{${r * r + h * h}} \\approx ${fmt(s, 3)}$`,
        open ? `$A = \\pi r s = \\pi(${r})(${fmt(s, 3)}) \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$` : `$SA = \\pi(${r})^2 + \\pi(${r})(${fmt(s, 3)}) \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`,
      ],
      calculator: true,
    };
  },
});

const m3SASphere = skill({
  id: 'm3-sa-sphere',
  name: 'Surface area of spheres and hemispheres',
  description: 'Find the surface area of spheres and hemispheres.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-6',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.35);
    const r = rng.int(2, 15);
    if (d === 1) {
      const sa = 4 * Math.PI * r * r;
      return {
        prompt: `Determine the surface area of a sphere with radius $${r}\\ ${tx(u)}$, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`,
        figure: { type: 'solid', shape: 'sphere', labels: { r: `${r} ${u}` } },
        parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
        hints: ['$SA = 4\\pi r^2$'],
        solution: [`$SA = 4\\pi r^2 = 4\\pi(${r})^2 = ${4 * r * r}\\pi \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
        calculator: true,
      };
    }
    if (d === 2) {
      const sa = 4 * Math.PI * r * r;
      return {
        prompt: `A ball has a diameter of $${2 * r}\\ ${tx(u)}$. Determine its surface area, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`,
        figure: { type: 'solid', shape: 'sphere', labels: { d: `${2 * r} ${u}` } },
        parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
        hints: ['The radius is half the diameter.', '$SA = 4\\pi r^2$'],
        solution: [`$r = ${r}\\ ${tx(u)}$`, `$SA = 4\\pi(${r})^2 \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
        calculator: true,
      };
    }
    const closed = rng.chance(0.5);
    const sa = closed ? 3 * Math.PI * r * r : 2 * Math.PI * r * r;
    return {
      prompt: closed
        ? `A solid hemisphere (half of a sphere, with its flat circular face) has radius $${r}\\ ${tx(u)}$. Determine its total surface area, ${roundingPhrase(1)} ${unitWord(u, 'sq')}.`
        : `The dome of a planetarium is a hemisphere with diameter $${2 * r}\\ ${tx(u)}$. What is the area of the curved roof, ${roundingPhrase(1)} ${unitWord(u, 'sq')}?`,
      figure: { type: 'solid', shape: 'hemisphere', labels: closed ? { r: `${r} ${u}` } : { d: `${2 * r} ${u}` } },
      parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
      hints: ['The curved part of a hemisphere is half of $4\\pi r^2$, which is $2\\pi r^2$.', closed ? 'Add the flat circular face: $\\pi r^2$.' : 'A roof does not include the floor (the flat circle).'],
      solution: closed
        ? [`Curved surface: $2\\pi r^2 = 2\\pi(${r})^2$`, `Flat face: $\\pi r^2 = \\pi(${r})^2$`, `$SA = 3\\pi r^2 = ${3 * r * r}\\pi \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`]
        : [`$r = ${r}$`, `Curved area $= 2\\pi r^2 = 2\\pi(${r})^2 = ${2 * r * r}\\pi \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
      calculator: true,
    };
  },
});

const m3VolPrismCyl = skill({
  id: 'm3-vol-prism-cyl',
  name: 'Volume of prisms and cylinders',
  description: 'Find the volume of right prisms and cylinders using V = (area of base) × height.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-7',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    const kind = byDifficulty(d, rng.pick(['rect', 'cyl'] as const), rng.pick(['tri', 'cyl'] as const), rng.pick(['tri', 'cyl-d'] as const));
    if (kind === 'rect') {
      const l = rng.int(2, 20);
      const w = rng.int(2, 15);
      const h = rng.int(2, 15);
      return {
        prompt: `Determine the volume of the right rectangular prism.`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} ${u}`, w: `${w} ${u}`, h: `${h} ${u}` } },
        parts: [numPart(l * w * h, { suffix: `${u}³` })],
        hints: ['$V = (\\text{area of base}) \\times \\text{height} = lwh$'],
        solution: [`$V = lwh = ${l} \\times ${w} \\times ${h} = ${l * w * h}\\ ${cu(u)}$`],
      };
    }
    if (kind === 'tri') {
      const [a, b] = rng.pick(TRIPLES);
      const L = rng.int(4, 25);
      const v = 0.5 * a * b * L;
      return {
        prompt: `Determine the volume of the right triangular prism.`,
        figure: { type: 'solid', shape: 'triPrism', labels: { a: `${a} ${u}`, b: `${b} ${u}`, l: `${L} ${u}` } },
        parts: [numPart(v, { suffix: `${u}³` })],
        hints: ['The base is the right triangle. Its area is $\\tfrac12 \\times$ leg $\\times$ leg.', 'Multiply the base area by the length of the prism.'],
        solution: [`Base area $= \\tfrac12(${a})(${b}) = ${0.5 * a * b}\\ ${sq(u)}$`, `$V = ${0.5 * a * b} \\times ${L} = ${fmt(v)}\\ ${cu(u)}$`],
      };
    }
    const r = rng.int(2, 12);
    const h = rng.int(3, 25);
    const v = Math.PI * r * r * h;
    const useD = kind === 'cyl-d';
    return {
      prompt: `Determine the volume of the right cylinder, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
      figure: { type: 'solid', shape: 'cylinder', labels: useD ? { d: `${2 * r} ${u}`, h: `${h} ${u}` } : { r: `${r} ${u}`, h: `${h} ${u}` } },
      parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
      hints: ['$V = \\pi r^2 h$', ...(useD ? ['Use the radius, which is half the diameter.'] : [])],
      solution: [...(useD ? [`$r = ${r}$`] : []), `$V = \\pi r^2 h = \\pi(${r})^2(${h}) = ${r * r * h}\\pi \\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
      calculator: true,
    };
  },
});

const m3VolPyrCone = skill({
  id: 'm3-vol-pyr-cone',
  name: 'Volume of pyramids and cones',
  description: 'Find the volume of right pyramids and cones and relate them to prisms and cylinders.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-7',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    if (d === 1 && rng.chance(0.5)) {
      const v = rng.int(4, 40) * 3;
      const cone = rng.chance(0.5);
      return {
        prompt: `A right ${cone ? 'cylinder' : 'prism'} has a volume of $${v}\\ ${cu(u)}$. A right ${cone ? 'cone' : 'pyramid'} has the same base and the same height. What is the volume of the ${cone ? 'cone' : 'pyramid'}?`,
        parts: [numPart(v / 3, { suffix: `${u}³` })],
        hints: [`A ${cone ? 'cone' : 'pyramid'} holds one third as much as the ${cone ? 'cylinder' : 'prism'} with the same base and height.`],
        solution: [`$V = \\tfrac13(${v}) = ${v / 3}\\ ${cu(u)}$`],
      };
    }
    const cone = rng.chance(0.5);
    if (cone) {
      const r = rng.int(2, 12);
      let h = rng.int(3, 20);
      let note: string[] = [];
      const labels: Record<string, string> = { r: `${r} ${u}`, h: `${h} ${u}` };
      if (d === 3) {
        const s = rng.int(r + 2, r + 15);
        h = Math.sqrt(s * s - r * r);
        note = [`First find the height: $h = \\sqrt{${s}^2 - ${r}^2} = \\sqrt{${s * s - r * r}} \\approx ${fmt(h, 3)}$`];
        delete labels.h;
        labels.s = `${s} ${u}`;
      }
      const v = (Math.PI * r * r * h) / 3;
      return {
        prompt: `Determine the volume of the right cone, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
        figure: { type: 'solid', shape: 'cone', labels, show: d === 3 ? ['s', 'r'] : ['h', 'r'] },
        parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
        hints: ['$V = \\tfrac13 \\pi r^2 h$', ...(d === 3 ? ['The volume formula needs the height, not the slant height.'] : [])],
        solution: [...note, `$V = \\tfrac13 \\pi(${r})^2(${fmt(h, 3)}) \\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
        calculator: true,
      };
    }
    const b = rng.int(2, 12);
    const h = rng.int(3, 18) * (d === 1 ? 3 : 1);
    const v = (b * b * h) / 3;
    return {
      prompt: `Determine the volume of a right square pyramid with base side $${b}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$${Number.isInteger(v) ? '' : `, ${roundingPhrase(1)} ${unitWord(u, 'cu')}`}.`,
      figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ${u}`, h: `${h} ${u}` }, show: ['h'] },
      parts: [numPart(v, Number.isInteger(v) ? { suffix: `${u}³` } : { decimals: 1, suffix: `${u}³` })],
      hints: ['$V = \\tfrac13 (\\text{area of base}) \\times h$', `Area of the base: $${b}^2$.`],
      solution: [`$V = \\tfrac13(${b}^2)(${h}) = \\tfrac13(${b * b * h}) = ${fmt(v, 2)}\\ ${cu(u)}$`],
    };
  },
});

const m3VolSphere = skill({
  id: 'm3-vol-sphere',
  name: 'Volume of spheres and hemispheres',
  description: 'Find the volume of spheres and hemispheres.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-8',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    const r = rng.int(2, 15);
    const hemi = d === 3;
    const useD = d >= 2;
    const v = ((hemi ? 2 : 4) / 3) * Math.PI * r ** 3;
    return {
      prompt: hemi
        ? `A hemispherical bowl has an inside diameter of $${2 * r}\\ ${tx(u)}$. How much can it hold, ${roundingPhrase(1)} ${unitWord(u, 'cu')}?`
        : `Determine the volume of a sphere with ${useD ? `diameter $${2 * r}` : `radius $${r}`}\\ ${tx(u)}$, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
      figure: { type: 'solid', shape: hemi ? 'hemisphere' : 'sphere', labels: useD ? { d: `${2 * r} ${u}` } : { r: `${r} ${u}` } },
      parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
      hints: ['$V = \\tfrac43 \\pi r^3$', ...(hemi ? ['A hemisphere is half of a sphere.'] : []), ...(useD ? ['Use the radius, not the diameter.'] : [])],
      solution: [...(useD ? [`$r = ${r}$`] : []), hemi ? `$V = \\tfrac12 \\cdot \\tfrac43\\pi r^3 = \\tfrac23\\pi(${r})^3 \\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$` : `$V = \\tfrac43\\pi(${r})^3 \\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
      calculator: true,
    };
  },
});

const m3Unknown = skill({
  id: 'm3-unknown-dim',
  name: 'Unknown dimensions from SA or volume',
  description: 'Determine an unknown dimension of a 3-D object given its surface area or volume.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-8',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    const kind = byDifficulty(d, rng.pick(['cube-v', 'cyl-h', 'prism-h'] as const), rng.pick(['sphere-sa', 'cone-h', 'cyl-h'] as const), rng.pick(['sphere-v', 'cone-r', 'cyl-r'] as const));
    switch (kind) {
      case 'cube-v': {
        const s = rng.int(2, 12);
        return {
          prompt: `A cube has a volume of $${s ** 3}\\ ${cu(u)}$. What is the length of one edge?`,
          figure: { type: 'solid', shape: 'cube', labels: { l: 's' } },
          parts: [numPart(s, { suffix: u })],
          hints: ['$V = s^3$, so $s = \\sqrt[3]{V}$.'],
          solution: [`$s = \\sqrt[3]{${s ** 3}} = ${s}\\ ${tx(u)}$`],
        };
      }
      case 'prism-h': {
        const l = rng.int(2, 12);
        const w = rng.int(2, 10);
        const h = rng.int(2, 15);
        return {
          prompt: `A rectangular prism has a volume of $${l * w * h}\\ ${cu(u)}$. Its base is $${l}\\ ${tx(u)}$ by $${w}\\ ${tx(u)}$. What is its height?`,
          parts: [numPart(h, { suffix: u })],
          hints: ['$V = lwh$, so $h = \\dfrac{V}{lw}$.'],
          solution: [`$h = \\dfrac{${l * w * h}}{${l} \\times ${w}} = \\dfrac{${l * w * h}}{${l * w}} = ${h}\\ ${tx(u)}$`],
        };
      }
      case 'cyl-h': {
        const r = rng.int(2, 10);
        const V = rng.int(100, 3000);
        const h = V / (Math.PI * r * r);
        return {
          prompt: `A cylindrical tank has radius $${r}\\ ${tx(u)}$ and volume $${V}\\ ${cu(u)}$. Determine its height, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'cylinder', labels: { r: `${r} ${u}`, h: 'h' } },
          parts: [numPart(h, { decimals: 1, suffix: u })],
          hints: ['$V = \\pi r^2 h$', 'Divide both sides by $\\pi r^2$.'],
          solution: [`$${V} = \\pi(${r})^2 h$`, `$h = \\dfrac{${V}}{${r * r}\\pi} \\approx ${fmtFixed(h, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
      case 'cyl-r': {
        const h = rng.int(4, 20);
        const V = rng.int(200, 5000);
        const r = Math.sqrt(V / (Math.PI * h));
        return {
          prompt: `A cylinder has height $${h}\\ ${tx(u)}$ and volume $${V}\\ ${cu(u)}$. Determine its radius, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'cylinder', labels: { r: 'r', h: `${h} ${u}` } },
          parts: [numPart(r, { decimals: 1, suffix: u })],
          hints: ['$V = \\pi r^2 h$, so $r^2 = \\dfrac{V}{\\pi h}$.', 'Take the square root at the end.'],
          solution: [`$r^2 = \\dfrac{${V}}{\\pi(${h})} \\approx ${fmt(V / (Math.PI * h), 3)}$`, `$r \\approx ${fmtFixed(r, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
      case 'sphere-sa': {
        const SA = rng.int(50, 2000);
        const r = Math.sqrt(SA / (4 * Math.PI));
        return {
          prompt: `A sphere has a surface area of $${SA}\\ ${sq(u)}$. Determine its radius, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'sphere', labels: { r: 'r' } },
          parts: [numPart(r, { decimals: 1, suffix: u })],
          hints: ['$SA = 4\\pi r^2$, so $r^2 = \\dfrac{SA}{4\\pi}$.'],
          solution: [`$r^2 = \\dfrac{${SA}}{4\\pi} \\approx ${fmt(SA / (4 * Math.PI), 3)}$`, `$r \\approx ${fmtFixed(r, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
      case 'sphere-v': {
        const V = rng.int(100, 9000);
        const r = Math.cbrt((3 * V) / (4 * Math.PI));
        return {
          prompt: `A spherical water tank holds $${V}\\ ${cu(u)}$. Determine its radius, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'sphere', labels: { r: 'r' } },
          parts: [numPart(r, { decimals: 1, suffix: u })],
          hints: ['$V = \\tfrac43\\pi r^3$', 'Isolate $r^3 = \\dfrac{3V}{4\\pi}$, then take the cube root.'],
          solution: [`$r^3 = \\dfrac{3(${V})}{4\\pi} \\approx ${fmt((3 * V) / (4 * Math.PI), 3)}$`, `$r = \\sqrt[3]{${fmt((3 * V) / (4 * Math.PI), 3)}} \\approx ${fmtFixed(r, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
      case 'cone-h': {
        const r = rng.int(2, 10);
        const V = rng.int(60, 1500);
        const h = (3 * V) / (Math.PI * r * r);
        return {
          prompt: `A cone has radius $${r}\\ ${tx(u)}$ and volume $${V}\\ ${cu(u)}$. Determine its height, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'cone', labels: { r: `${r} ${u}`, h: 'h' }, show: ['h', 'r'] },
          parts: [numPart(h, { decimals: 1, suffix: u })],
          hints: ['$V = \\tfrac13\\pi r^2 h$, so $h = \\dfrac{3V}{\\pi r^2}$.'],
          solution: [`$h = \\dfrac{3(${V})}{\\pi(${r})^2} \\approx ${fmtFixed(h, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
      default: {
        const h = rng.int(4, 20);
        const V = rng.int(60, 2500);
        const r = Math.sqrt((3 * V) / (Math.PI * h));
        return {
          prompt: `A conical pile of sand has height $${h}\\ ${tx(u)}$ and volume $${V}\\ ${cu(u)}$. Determine the radius of its base, ${roundingPhrase(1)}.`,
          figure: { type: 'solid', shape: 'cone', labels: { r: 'r', h: `${h} ${u}` }, show: ['h', 'r'] },
          parts: [numPart(r, { decimals: 1, suffix: u })],
          hints: ['$V = \\tfrac13\\pi r^2 h$', '$r^2 = \\dfrac{3V}{\\pi h}$, then take the square root.'],
          solution: [`$r^2 = \\dfrac{3(${V})}{\\pi(${h})} \\approx ${fmt((3 * V) / (Math.PI * h), 3)}$`, `$r \\approx ${fmtFixed(r, 1)}\\ ${tx(u)}$`],
          calculator: true,
        };
      }
    }
  },
});

const m3Composite = skill({
  id: 'm3-composite',
  name: 'Composite 3-D objects',
  description: 'Solve surface-area and volume problems for composite 3-D objects.',
  outcomes: ['M3'],
  lessonId: 'm10c-1-8',
  calculator: true,
  gen(rng, d) {
    const { u } = pickUnit(rng, 0.3);
    const kind = byDifficulty(d, 'silo-v', rng.pick(['capsule-v', 'icecream-v'] as const), rng.pick(['silo-sa', 'house-sa', 'hole-v'] as const));
    switch (kind) {
      case 'silo-v': {
        const r = rng.int(2, 8);
        const h1 = rng.int(6, 20);
        const h2 = rng.int(2, 8);
        const v = Math.PI * r * r * h1 + (Math.PI * r * r * h2) / 3;
        return {
          prompt: `A grain silo is a cylinder topped by a cone. The radius is $${r}\\ ${tx(u)}$, the cylinder is $${h1}\\ ${tx(u)}$ tall, and the cone is $${h2}\\ ${tx(u)}$ tall. Determine the volume of the silo, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
          figure: { type: 'solid', shape: 'cylinderCone', labels: { r: `${r} ${u}`, h: `${h1} ${u}`, h2: `${h2} ${u}` } },
          parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
          hints: ['Find the volume of each part and add them.', 'Cylinder: $\\pi r^2 h$. Cone: $\\tfrac13\\pi r^2 h$.'],
          solution: [`Cylinder: $\\pi(${r})^2(${h1}) = ${r * r * h1}\\pi$`, `Cone: $\\tfrac13\\pi(${r})^2(${h2}) = ${fmt((r * r * h2) / 3, 3)}\\pi$`, `Total $\\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
          calculator: true,
        };
      }
      case 'capsule-v': {
        const r = rng.int(1, 6);
        const h = rng.int(4, 15);
        const v = Math.PI * r * r * h + (4 / 3) * Math.PI * r ** 3;
        return {
          prompt: `A capsule is a cylinder with a hemisphere on each end. The radius is $${r}\\ ${tx(u)}$ and the cylinder part is $${h}\\ ${tx(u)}$ long. Determine the volume, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
          figure: { type: 'solid', shape: 'capsule', labels: { r: `${r} ${u}`, h: `${h} ${u}` } },
          parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
          hints: ['Two hemispheres make one whole sphere.', 'Volume = cylinder + sphere.'],
          solution: [`Cylinder: $\\pi(${r})^2(${h}) = ${r * r * h}\\pi$`, `Two hemispheres = one sphere: $\\tfrac43\\pi(${r})^3 = ${fmt((4 * r ** 3) / 3, 3)}\\pi$`, `Total $\\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
          calculator: true,
        };
      }
      case 'icecream-v': {
        const r = rng.int(2, 5);
        const h = rng.int(6, 14);
        const v = (Math.PI * r * r * h) / 3 + (2 / 3) * Math.PI * r ** 3;
        return {
          prompt: `An ice cream cone is filled and topped with a hemisphere of ice cream. The cone has radius $${r}\\ ${tx(u)}$ and height $${h}\\ ${tx(u)}$. Determine the total volume of ice cream, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
          figure: { type: 'solid', shape: 'coneHemisphere', labels: { r: `${r} ${u}`, h: `${h} ${u}` } },
          parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
          hints: ['Volume = cone + hemisphere.', 'Hemisphere: $\\tfrac23\\pi r^3$.'],
          solution: [`Cone: $\\tfrac13\\pi(${r})^2(${h}) = ${fmt((r * r * h) / 3, 3)}\\pi$`, `Hemisphere: $\\tfrac23\\pi(${r})^3 = ${fmt((2 * r ** 3) / 3, 3)}\\pi$`, `Total $\\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
          calculator: true,
        };
      }
      case 'silo-sa': {
        const r = rng.int(2, 6);
        const h = rng.int(6, 18);
        const sa = Math.PI * r * r + 2 * Math.PI * r * h + 2 * Math.PI * r * r;
        return {
          prompt: `A silo is a cylinder with a hemisphere on top, sitting on the ground. The radius is $${r}\\ ${tx(u)}$ and the cylinder is $${h}\\ ${tx(u)}$ tall. What is the surface area to be painted, including the floor of the silo, ${roundingPhrase(1)} ${unitWord(u, 'sq')}?`,
          figure: { type: 'solid', shape: 'cylinderHemisphere', labels: { r: `${r} ${u}`, h: `${h} ${u}` } },
          parts: [numPart(sa, { decimals: 1, suffix: `${u}²` })],
          hints: ['Do not include faces that are joined together (the top of the cylinder is covered by the hemisphere).', 'Surface = bottom circle + curved side of cylinder + curved hemisphere.'],
          solution: [`Bottom: $\\pi r^2 = ${r * r}\\pi$`, `Cylinder side: $2\\pi r h = ${2 * r * h}\\pi$`, `Hemisphere: $2\\pi r^2 = ${2 * r * r}\\pi$`, `Total $= ${3 * r * r + 2 * r * h}\\pi \\approx ${fmtFixed(sa, 1)}\\ ${sq(u)}$`],
          calculator: true,
        };
      }
      case 'house-sa': {
        const b = rng.int(3, 8) * 2;
        const s = rng.int(4, 12);
        const sa = 5 * b * b + 2 * b * s;
        return {
          prompt: `A decorative block is a cube with side $${b}\\ ${tx(u)}$, with a square pyramid (slant height $${s}\\ ${tx(u)}$) on top that exactly covers the top face. Determine the total exposed surface area.`,
          figure: { type: 'solid', shape: 'cubePyramid', labels: { b: `${b} ${u}`, s: `${s} ${u}` } },
          parts: [numPart(sa, { suffix: `${u}²` })],
          hints: ['The top face of the cube is covered, so the cube contributes only 5 faces.', 'Add the 4 triangular faces of the pyramid.'],
          solution: [`Cube (5 faces): $5(${b})^2 = ${5 * b * b}$`, `Pyramid triangles: $4 \\cdot \\tfrac12(${b})(${s}) = ${2 * b * s}$`, `Total $= ${sa}\\ ${sq(u)}$`],
        };
      }
      default: {
        const l = rng.int(8, 20);
        const w = rng.int(6, 14);
        const h = rng.int(4, 12);
        const r = rng.int(1, Math.floor(Math.min(w, h) / 2) - 1 || 1);
        const v = l * w * h - Math.PI * r * r * l;
        return {
          prompt: `A concrete block is a rectangular prism $${l}\\ ${tx(u)}$ long, $${w}\\ ${tx(u)}$ wide and $${h}\\ ${tx(u)}$ high. A cylindrical hole of radius $${r}\\ ${tx(u)}$ runs through its full length. Determine the volume of concrete, ${roundingPhrase(1)} ${unitWord(u, 'cu')}.`,
          figure: { type: 'solid', shape: 'prismCylinderHole', labels: { l: `${l} ${u}`, w: `${w} ${u}`, h: `${h} ${u}`, r: `${r} ${u}` } },
          parts: [numPart(v, { decimals: 1, suffix: `${u}³` })],
          hints: ['Volume of concrete = volume of prism − volume of hole.', 'The hole is a cylinder whose height is the length of the block.'],
          solution: [`Prism: $${l} \\times ${w} \\times ${h} = ${l * w * h}$`, `Hole: $\\pi(${r})^2(${l}) = ${r * r * l}\\pi \\approx ${fmt(Math.PI * r * r * l, 2)}$`, `Concrete $\\approx ${fmtFixed(v, 1)}\\ ${cu(u)}$`],
          calculator: true,
        };
      }
    }
  },
});


export const MEASUREMENT_SKILLS: SkillDef[] = [
  m1Referents,
  m1Estimate,
  m1RulerMetric,
  m1RulerImperial,
  m1Vernier,
  m1Circumference,
  m2SI,
  m2Imperial,
  m2AreaVolume,
  m2Between,
  m2UnitAnalysis,
  m2Reasonable,
  m3SAPrism,
  m3SACylinder,
  m3Slant,
  m3SAPyramid,
  m3SACone,
  m3SASphere,
  m3VolPrismCyl,
  m3VolPyrCone,
  m3VolSphere,
  m3Unknown,
  m3Composite,
];
