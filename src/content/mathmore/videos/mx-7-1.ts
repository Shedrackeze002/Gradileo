import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

const video: Explainer = {
  id: 'mx-7-1',
  lessonId: 'mx-7-1',
  title: 'Error Intervals',
  thumbnail: 'nl',
  summary: 'A rounded number could have been anything up to half a unit either side of it: 14 cm to the nearest centimetre is 13.5 ≤ l < 14.5. A truncated number starts at the number and goes up one whole unit: 4.25 truncated to 2 decimal places is 4.25 ≤ x < 4.26.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Accuracy and Recurring Decimals', title: 'Error Intervals', subtitle: 'Every value a rounded number could have been' }],
      lines: [
        { say: 'A ruler says a pencil is fourteen centimetres long, to the nearest centimetre.', show: 'title' },
        { say: 'Its true length is probably not exactly fourteen. It could be anything that rounds to fourteen. In this video, you will learn to write all of those values as an error interval, for rounding and for truncation.' },
      ],
    },
    {
      chapter: 'What an error interval is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Error interval', md: 'The range of values a rounded number could have had, written as $a \\le x < b$. Here $a$ is the **lower bound** and $b$ is the **upper bound**.' },
        figure('nl', [numberLine({ min: 13, max: 15, step: 0.1, every: 5, length: 14, points: [{ id: 'lo', value: 13.5, tex: '13.5', tone: 'adj' }, { id: 'mid', value: 14, tex: '14', tone: 'theta', below: true }, { id: 'hi', value: 14.5, tex: '14.5', tone: 'opp' }], spans: [{ id: 'span', from: 13.5, to: 14.5, tone: 'good' }] })], 260),
        { kind: 'math', id: 'm', size: 'lg', lines: ['13.5 \\le l < 14.5'] },
      ],
      lines: [
        { say: 'The error interval of a rounded number is the range of values it could have been before it was rounded. We write it as an inequality, with a lower bound and an upper bound.', show: 'def' },
        { say: 'The pencil was rounded to the nearest centimetre, so the unit is one centimetre. The true length can be up to half a unit, which is zero point five, either side of fourteen.', show: ['nl.axis', 'nl.mid'] },
        { say: 'So the lower bound is fourteen minus zero point five, which is thirteen point five. The upper bound is fourteen plus zero point five, which is fourteen point five.', show: ['nl.lo', 'nl.hi', 'nl.span'], focus: 'nl.span' },
        { say: 'Thirteen point five rounds up to fourteen, so it is included, with less than or equal to. But fourteen point five rounds up to fifteen, so it is not included. We use a strict less than sign for the upper bound.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Decimal places and significant figures',
      layout: 'center',
      main: [
        { kind: 'math', id: 'a', size: 'md', lines: ['3.7 \\text{ kg to 1 decimal place: half a unit is } 0.05', '3.65 \\le m < 3.75'] },
        { kind: 'math', id: 'b', size: 'md', lines: ['340 \\text{ to 2 significant figures: nearest } 10', '335 \\le x < 345'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Find the unit first', md: 'The unit is the place value of the last digit you rounded to: $0.1$ for one decimal place, $10$ for $340$ to two significant figures.' },
      ],
      lines: [
        { say: 'A parcel has a mass of three point seven kilograms, to one decimal place. The unit is zero point one, so half a unit is zero point zero five.', show: 'a.0', focus: 'a.0' },
        { say: 'Three point seven minus zero point zero five is three point six five, and three point seven plus zero point zero five is three point seven five. So the mass is at least three point six five, and less than three point seven five.', show: 'a.1', focus: 'a.1' },
        { say: 'For significant figures, find the place value of the last significant figure. Three hundred forty, to two significant figures, is rounded to the nearest ten.', show: 'b.0', focus: 'b.0' },
        { say: 'Half of ten is five, so the error interval runs from three hundred thirty five up to, but not including, three hundred forty five.', show: 'b.1', focus: 'b.1' },
        { say: 'So the first step is always the same: find the unit, then go half of it below and half of it above.', show: 'tip' },
      ],
    },
    {
      chapter: 'Truncation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Truncation', md: 'To **truncate** a number is to cut off its digits after a certain place, without rounding: $7.89$ truncated to $1$ decimal place is $7.8$.' },
        figure('tl', [numberLine({ min: 4.24, max: 4.27, step: 0.005, every: 2, length: 14, points: [{ id: 'lo', value: 4.25, tex: '4.25', tone: 'adj' }, { id: 'hi', value: 4.26, tex: '4.26', tone: 'opp' }], spans: [{ id: 'span', from: 4.25, to: 4.26, tone: 'good' }] })], 240),
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.25 \\le x < 4.26'] },
      ],
      lines: [
        { say: 'Some calculators and computers do not round. They truncate: they simply cut off the digits after a certain place. Seven point eight nine, truncated to one decimal place, is seven point eight.', show: 'def' },
        { say: 'A calculator truncates a number x to two decimal places and shows four point two five. Every number from four point two five up to four point two six truncates to four point two five. Four point two five nine nine does, for example.', show: ['tl.axis', 'tl.lo', 'tl.hi', 'tl.span'], focus: 'tl.span' },
        { say: 'But four point two six itself truncates to four point two six, so it is not included. The error interval is four point two five, less than or equal to x, less than four point two six.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Rounding or truncation?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$ is $4.25$, to 2 decimal places, by…', 'Error interval'], rows: [['rounding', '$4.245 \\le x < 4.255$'], ['truncation', '$4.25 \\le x < 4.26$']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Read the question', md: 'Rounding goes **half a unit** each side of the number. Truncation starts **at** the number and goes **one whole unit** up.' },
      ],
      lines: [
        { say: 'Compare the two. If x is four point two five by rounding, it lies half a unit either side: from four point two four five up to four point two five five.', show: 't.0', focus: 't.0' },
        { say: 'If x is four point two five by truncation, it starts at four point two five and goes up one whole unit, to four point two six.', show: 't.1', focus: 't.1' },
        { say: 'The two intervals are different, so read the question carefully to see which one it is.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A length $l$ is $8.4$ m, to $1$ decimal place. Which is its error interval?',
          choices: ['$8.4 \\le l < 8.5$', '$8.35 \\le l < 8.45$', '$8.35 < l \\le 8.45$', '$8.3 \\le l < 8.5$'],
          answer: 1,
          working: 'The unit is $0.1$ m, so half a unit is $0.05$ m: $8.4 - 0.05 = 8.35$ and $8.4 + 0.05 = 8.45$. The lower bound is included and the upper bound is not.',
        },
      ],
      lines: [
        { say: 'Your turn. A length l is eight point four metres, to one decimal place. Which is its error interval? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Half a unit is zero point zero five, so the interval runs from eight point three five, included, up to eight point four five, not included. Choice A is the interval for truncation, and choice C has the signs the wrong way round.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['An error interval $a \\le x < b$ gives every value a number could have had.', 'Rounding: half a unit below and half a unit above.', 'Truncation: from the number up one whole unit.', 'The lower bound is included; the upper bound is not.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An error interval gives every value a rounded or truncated number could have had.', show: 'sum.0' },
        { say: 'For rounding, go half a unit below and half a unit above the number.', show: 'sum.1' },
        { say: 'For truncation, start at the number and go one whole unit above it.', show: 'sum.2' },
        { say: 'The lower bound is included, and the upper bound is not. In the next lesson, we use these bounds in calculations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
