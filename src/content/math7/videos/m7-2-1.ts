import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { columns } from '@/content/math5/videos/lib/m5-2-figures.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';

// 12.6 is nearer 13 than 12, and 4.75 is nearer 5 than 4.
const rounding = figure('r', [
  numberLine({ name: 'a', min: 12, max: 13, step: 0.1, every: 5, length: 10, points: [{ id: 'p', value: 12.6, tex: '12.6', tone: 'opp' }] }),
  shift(numberLine({ name: 'b', min: 4, max: 5, step: 0.05, every: 10, length: 10, points: [{ id: 'p', value: 4.75, tex: '4.75', tone: 'adj' }] }), 0, -2.6),
], 340);

// 12.60 + 4.75 = 17.35: the tenths make 13, so 1 is regrouped into the ones.
const add = figure('ad', [
  columns({
    top: '12.60',
    bottom: '4.75',
    answer: '17.35',
    op: '+',
    marks: [{ id: 'k0', place: 0, tex: '1' }],
    tones: { ad2: 'theta' },
  }),
], 400);

const video: Explainer = {
  id: 'm7-2-1',
  lessonId: 'm7-2-1',
  title: 'Adding and Subtracting Decimals, Part 1: Estimate, Then Add',
  thumbnailTitle: 'Estimate, Then Add',
  thumbnail: 'ad',
  summary:
    'An estimate is a close answer found with friendly numbers: round each decimal to the nearest whole number (or, for a number less than 1, the nearest tenth), so 12.6 + 4.75 ≈ 13 + 5 = 18. To add, line up the decimal points, write zeros so the numbers have the same number of decimal places, and add as with whole numbers: 12.60 + 4.75 = 17.35, which is close to the estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 1', title: 'Estimate, Then Add', subtitle: 'Adding decimals' }],
      lines: [
        { say: 'Race times, rainfall, masses and prices are often decimals. When you add or subtract them, one small slip with the decimal point can make an answer ten times too big!', show: 'title' },
        { say: 'In this lesson, you will estimate first, then add and subtract decimals carefully, and use your estimate to check. This first part is about adding.' },
      ],
    },
    {
      chapter: 'What an estimate is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Estimate', md: 'An **estimate** is a close answer you find with friendly numbers. You can usually do it in your head. It tells you about how big the real answer should be.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Rounding to estimate', md: 'Round each decimal to the nearest **whole number**. For a number less than $1$, round to the nearest **tenth**.' },
      ],
      lines: [
        { say: 'An estimate is a close answer that you find with friendly numbers. You can usually work it out in your head.', show: 'def' },
        { say: 'An estimate does not give the exact answer. But it tells you about how big the real answer should be, and that is very useful for checking.' },
        { say: 'To estimate a sum or a difference, round each decimal to the nearest whole number. For a number less than one, like zero point four seven five, round to the nearest tenth: zero point five.', show: 'key' },
      ],
    },
    {
      chapter: 'Estimating a sum',
      layout: 'split',
      leftWidth: 600,
      left: [rounding],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['12.6 \\approx 13', '4.75 \\approx 5', '12.6 + 4.75', '\\approx 13 + 5 = 18'] }],
      lines: [
        { say: 'Let’s estimate twelve point six plus four point seven five.' },
        { say: 'Twelve point six is between twelve and thirteen. It is past the halfway mark, so it is closer to thirteen. It rounds to thirteen.', show: ['r.a-axis', 'r.a-p', 'm.0'], focus: ['r.a-p', 'm.0'] },
        { say: 'Four point seven five is between four and five, and it is closer to five. It rounds to five.', show: ['r.b-axis', 'r.b-p', 'm.1'], focus: ['r.b-p', 'm.1'] },
        { say: 'Thirteen plus five is eighteen. So the answer should be about eighteen. The wavy equals sign means is about equal to.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Line up the decimal points',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Line up the **decimal points**: tenths under tenths, hundredths under hundredths.',
            '**2.** Write zeros at the end, so every number has the same number of decimal places.',
            '**3.** Add as you would with whole numbers, starting on the right.',
            '**4.** Put the decimal point in the answer right under the others.',
          ],
        },
      ],
      lines: [
        { say: 'Now let’s find the exact answer. Here are the steps for adding decimals.' },
        { say: 'One: line up the decimal points. Then tenths are under tenths, and hundredths are under hundredths. You can only add digits that have the same place value.', show: 'b.0' },
        { say: 'Two: write zeros at the end, so every number has the same number of decimal places. A zero at the end does not change the value.', show: 'b.1' },
        { say: 'Three: add as you would with whole numbers, starting on the right. Four: put the decimal point in the answer right under the other decimal points.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Adding 12.6 and 4.75',
      layout: 'split',
      leftWidth: 520,
      left: [add],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 0 + 5 = 5', '\\text{Tenths: } 6 + 7 = 13', '\\text{Ones: } 2 + 4 + \\opp{1} = 7', '\\text{Tens: } 1', '17.35 \\text{ is close to } 18 \\ \\good{\\checkmark}'] }],
      lines: [
        { say: 'Write twelve point six with a zero at the end: twelve point six zero. Line up the decimal points, with four point seven five underneath.', show: ['ad.top', 'ad.bottom', 'ad.bar'], focus: 'ad.ad2' },
        { say: 'Start on the right, with the hundredths. Zero plus five is five.', show: ['ad.cd2', 'ad.sd2', 'm.0'], focus: 'm.0' },
        { say: 'The tenths: six plus seven is thirteen tenths. That is one whole and three tenths. Write three, and carry the one into the ones column.', hide: 'ad.cd2', show: ['ad.cd1', 'ad.sd1', 'ad.k0', 'm.1'], focus: ['m.1', 'ad.k0'] },
        { say: 'The ones: two plus four plus the one we carried is seven. The tens: just one.', hide: 'ad.cd1', show: ['ad.sp0', 'ad.sp1', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Put the decimal point right under the others. The sum is seventeen point three five.', show: 'ad.ps', focus: 'ad.sum' },
        { say: 'Now check with the estimate. Seventeen point three five is close to eighteen, so the answer is reasonable.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calculate $9.4 + 3.68$.',
          choices: ['$4.62$', '$13.08$', '$12.08$', '$12.72$'],
          answer: 1,
          working: 'Estimate: $9 + 4 = 13$. Write $9.4$ as $9.40$ and line up the decimal points: $9.40 + 3.68 = 13.08$, which is close to $13$.',
        },
      ],
      lines: [
        { say: 'Your turn. Calculate nine point four plus three point six eight. Estimate first! Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirteen point zero eight. Write nine point four as nine point four zero, line up the points and add. The estimate, nine plus four, is thirteen, so it is reasonable. Choice A lines up the last digits, and it is far too small.', show: 'q.answer' },
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
          items: [
            'Estimate first: round to the nearest whole number, or the nearest tenth for numbers less than $1$.',
            'Line up the decimal points, and write zeros so the numbers have the same number of places.',
            'Add as with whole numbers, then check the answer against the estimate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Estimate first, by rounding each decimal to a friendly number.', show: 'sum.0' },
        { say: 'To add, line up the decimal points, and write zeros so every number has the same number of decimal places.', show: 'sum.1' },
        { say: 'Add as you would with whole numbers, then check your answer against the estimate. In the next part, you will see why lining up the decimal points matters so much. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
