import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { placeChart, tickLabels } from './lib/m5-1-figures.ts';

// 3.47 is 7 hundredths past 3.4 and 3 hundredths short of 3.5, so it is closer to 3.5.
const close = figure('nl', [
  numberLine({
    min: 3.4,
    max: 3.5,
    step: 0.01,
    every: 10,
    length: 14,
    points: [{ id: 'p', value: 3.47, tex: '3.47', tone: 'theta', below: true }],
    spans: [
      { id: 'far', from: 3.4, to: 3.47, tone: 'adj', label: '\\text{7 hundredths}' },
      { id: 'near', from: 3.47, to: 3.5, tone: 'good', label: '\\text{3 hundredths}' },
    ],
  }),
]);

// 2 497 856 between 2 490 000 and 2 500 000, past the halfway mark.
const big = figure('bg', [
  numberLine({ min: 2490000, max: 2500000, step: 1000, every: 0, length: 14, points: [{ id: 'p', value: 2497856, tex: '2\\,497\\,856', tone: 'theta' }] }),
  tickLabels({
    min: 2490000,
    max: 2500000,
    length: 14,
    values: [
      { id: 'lo', value: 2490000, tex: '2\\,490\\,000' },
      { id: 'mid', value: 2495000, tex: '2\\,495\\,000' },
      { id: 'hi', value: 2500000, tex: '2\\,500\\,000', tone: 'good' },
    ],
  }),
]);

const nine = figure('ch', [
  placeChart({
    places: ['Millions', 'Hundred thousands', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'],
    rows: [
      ['2', '4', '9', '7', '8', '5', '6'],
      ['2', '5', '0', '0', '0', '0', '0'],
    ],
    tones: { 'r0-2': 'theta', 'r0-3': 'opp', 'r1-1': 'good', 'r1-2': 'good' },
  }),
]);

const video: Explainer = {
  id: 'm5-1-2-d',
  lessonId: 'm5-1-2',
  title: 'Comparing, Ordering and Rounding, Part 4: Rounding',
  thumbnailTitle: 'Rounding',
  thumbnail: 'nl',
  summary: 'Rounding to a close number that is easier to use: look at the digit just right of the rounding place (5 or more rounds up). 3.47 rounds to 3.5, 2 497 856 rounds to 2 500 000 when a 9 rounds up, and more decimal places means a more precise number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 4', title: 'Rounding', subtitle: 'A close number that is easier to use' }],
      lines: [
        { say: 'A news story says that about twelve thousand people came to a game. Were there exactly twelve thousand people? Probably not! The number was rounded.', show: 'title' },
        { say: 'In this video, you will round whole numbers and decimals.' },
      ],
    },
    {
      chapter: 'What rounding means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rounding', md: '**Rounding** gives a number that is close and easier to use. The situation tells you which place to round to.' },
        close,
      ],
      lines: [
        { say: 'Rounding gives a number that is close to the real one, and easier to use.', show: 'def' },
        { say: 'The situation tells you which place to round to. A swimming scoreboard might show tenths of a second. A road sign shows whole kilometres.' },
        { say: 'Look at 3.47 on this number line. It is between 3.4 and 3.5.', show: ['nl.axis', 'nl.p'] },
        { say: 'It is seven hundredths away from 3.4, but only three hundredths away from 3.5. So 3.47 is closer to 3.5.', show: ['nl.far', 'nl.near'], focus: 'nl.near' },
      ],
    },
    {
      chapter: 'How to round',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Find the digit in the rounding place.', 'Look at the digit just to its **right**.', 'If that digit is $5$ or more, round **up**. If it is $4$ or less, round **down**.'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.\\underline{4}\\opp{7} \\;\\to\\; 3.5'] },
      ],
      lines: [
        { say: 'You do not need a number line every time. Here is how to round. First, find the digit in the rounding place.', show: 'b.0' },
        { say: 'Then look at the digit just to its right. If that digit is five or more, round up. If it is four or less, round down.', show: ['b.1', 'b.2'] },
        { say: 'Round 3.47 to the nearest tenth. The tenths digit is four. The digit to its right is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven is five or more, so round up. Four tenths becomes five tenths, and the digits after it are dropped. So 3.47 rounds to 3.5, just as the number line showed.' },
      ],
    },
    {
      chapter: 'The nearest ten thousand',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'lg', md: 'Round $2\\,497\\,856$ to the nearest ten thousand.' }, big],
      lines: [
        { say: 'Now round two million, four hundred ninety-seven thousand, eight hundred fifty-six to the nearest ten thousand.', show: 'q' },
        { say: 'Counting in ten thousands, it is between two million, four hundred ninety thousand, and two million, five hundred thousand.', show: ['bg.axis', 'bg.lo', 'bg.hi'] },
        { say: 'It is past the halfway mark, so it is closer to two million, five hundred thousand.', show: ['bg.p', 'bg.mid'], focus: ['bg.p', 'bg.hi'] },
      ],
    },
    {
      chapter: 'When a 9 rounds up',
      layout: 'center',
      main: [nine, { kind: 'math', id: 'm', size: 'md', lines: ['9 \\text{ ten thousands} + 1 = 10 \\text{ ten thousands} = 1 \\text{ hundred thousand}'] }],
      lines: [
        { say: 'Now use the steps. The ten thousands digit is nine. The digit to its right is seven, so round up.', show: ['ch.frame', 'ch.head', 'ch.row0', 'ch.col2'], focus: ['ch.col2', 'ch.r0-3'] },
        { say: 'But nine plus one more is ten! Ten ten thousands make one hundred thousand.', show: 'm.0', focus: 'm.0' },
        { say: 'So the ten thousands digit becomes zero, and the four hundred thousands become five hundred thousands. Every digit after the rounding place becomes zero.', show: ['ch.row1', 'ch.col1'], focus: ['ch.r1-1', 'ch.r1-2'] },
        { say: 'The answer is two million, five hundred thousand, which matches the number line.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking at the wrong digit', md: 'To round to the nearest **tenth**, look at the **hundredths** digit. Do not look at the last digit of the number.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4.\\underline{3}\\good{4}9 \\;\\to\\; \\good{4.3}', '\\bad{\\text{not } 4.4}'] },
      ],
      lines: [
        { say: 'To round to the nearest tenth, look at the hundredths digit, just to the right of the tenths. Do not look at the last digit of the number.', show: 'oops' },
        { say: 'Round 4.349 to the nearest tenth. The tenths digit is three, and the digit to its right is four. Four is four or less, so round down: 4.3.', show: 'm.0', focus: 'm.0' },
        { say: 'The nine at the end does not matter. If you look at the nine, you would round up to 4.4, which is wrong.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'More precise',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2.375 \\text{ m}', '\\to\\; 2.38 \\text{ m} \\;\\;(\\text{nearest hundredth})', '\\to\\; 2.4 \\text{ m} \\;\\;(\\text{nearest tenth})'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'More decimal places, more precise', md: 'A number with more decimal places is more **precise**. It tells the amount in smaller pieces.' },
      ],
      lines: [
        { say: 'Here is something interesting. 2.4 metres, 2.38 metres and 2.375 metres could all describe the same table.', show: 'm.0' },
        { say: '2.375 rounds to 2.38 to the nearest hundredth, and to 2.4 to the nearest tenth.', show: ['m.1', 'm.2'] },
        { say: 'A number with more decimal places is more precise. It tells the amount in smaller pieces. 2.375 metres tells you the length to the nearest thousandth of a metre.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Round $6.952$ to the nearest tenth.',
          choices: ['$6.9$', '$6.95$', '$7.0$', '$7.9$'],
          answer: 2,
          working: 'The tenths digit is $9$, and the digit to its right is $5$, so round up. Nine tenths and one more tenth make one whole, so $6.952$ rounds to $7.0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Round 6.952 to the nearest tenth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The tenths digit is nine, and the digit to its right is five, so round up. Nine tenths and one more tenth make one whole, so the answer is 7.0. Choice A rounds down, but five or more rounds up.', show: 'q.answer' },
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
          items: ['Look at the digit just right of the rounding place.', '$5$ or more rounds up. $4$ or less rounds down.', 'When a $9$ rounds up, it becomes $0$ and the place to its left goes up.', 'More decimal places means a more precise number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To round, look at the digit just to the right of the rounding place.', show: 'sum.0' },
        { say: 'Five or more rounds up, and four or less rounds down.', show: 'sum.1' },
        { say: 'A nine that rounds up becomes zero, and the place to its left goes up by one.', show: 'sum.2' },
        { say: 'And more decimal places means a more precise number. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
