import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { columns } from '@/content/math5/videos/lib/m5-2-figures.ts';

// 12.65 + 8.70 = 21.35: the tenths regroup 1 into the ones, and the ones regroup 1 into the tens.
const add = figure('ad', [
  columns({
    top: '12.65',
    bottom: '8.70',
    answer: '21.35',
    op: '+',
    marks: [
      { id: 'k0', place: 0, tex: '1' },
      { id: 'k1', place: 1, tex: '1' },
    ],
  }),
]);

const caption = (id: string, at: [number, number], tex: string): Part => ({ points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: 'below' }] });

// 4.5 + 2.35 lined up on the right (wrong) and on the points (right, 6.85).
const lineUp = figure('lu', [
  columns({ name: 'w', top: '4.5', bottom: '2.35', op: '+', align: 'right', tones: { ad1: 'bad', bd2: 'bad' } }),
  caption('w-cap', [-1.6, -0.6], '\\bad{\\text{last digits lined up}}'),
  columns({ name: 'r', top: '4.50', bottom: '2.35', answer: '6.85', op: '+', at: [8, 0], tones: { ad2: 'theta' } }),
  caption('r-cap', [9.2, -0.6], '\\good{\\text{decimal points lined up}}'),
]);

const video: Explainer = {
  id: 'm6-2-1',
  lessonId: 'm6-2-1',
  title: 'Solving Addition and Subtraction Problems, Part 1: Adding with the Standard Algorithm',
  thumbnailTitle: 'Adding Decimals',
  thumbnail: 'ad',
  summary: 'The standard algorithm for adding decimal numbers: line up the decimal points, write zeros so both numbers have the same number of decimal places, add each column from the right and regroup. Shin pads for $12.65 and a skipping rope for $8.70 cost $21.35, and 4.5 + 2.35 is 6.85, not 2.80.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 1', title: 'Adding with the Standard Algorithm', subtitle: 'Line up the decimal points' }],
      lines: [
        { say: 'How much do two things cost together at the store? How far do you ride on a bike trail in two days? We answer questions like these by adding decimal numbers.', show: 'title' },
        { say: 'In this video, you will add decimal numbers with the standard algorithm, and see why lining up the decimal points matters so much.' },
      ],
    },
    {
      chapter: 'The standard algorithm',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard algorithm', md: 'A **standard algorithm** is a set of steps that always works. For adding and subtracting, you write the numbers in columns and work one place value at a time, starting on the right.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Line up the decimal points: ones under ones, tenths under tenths.',
            '**2.** Write zeros so the numbers have the same number of decimal places.',
            '**3.** Add each column, starting on the right. Regroup when a column adds to $10$ or more.',
            '**4.** Put the decimal point in the answer right below the others.',
          ],
        },
      ],
      lines: [
        { say: 'An algorithm is a set of steps. A standard algorithm is a set of steps that always works. To add, you write the numbers in columns, and work one place value at a time, starting on the right.', show: 'def' },
        { say: 'Here are the steps for adding decimal numbers. One: line up the decimal points, so ones are under ones and tenths are under tenths.', show: 'b.0' },
        { say: 'Two: write zeros at the end, so both numbers have the same number of decimal places. These zeros do not change the values.', show: 'b.1' },
        { say: 'Three: add each column, starting on the right. When a column adds to ten or more, regroup ten of that place as one of the next place to the left.', show: 'b.2' },
        { say: 'Four: put the decimal point in the answer, right below the other decimal points.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Buying sports gear',
      layout: 'split',
      leftWidth: 520,
      left: [add],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Leo buys shin pads for \\$12.65 and a skipping rope for \\$8.70. What is the total cost?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 5 + 0 = 5', '\\text{Tenths: } 6 + 7 = 13', '\\text{Ones: } 2 + 8 + \\opp{1} = 11', '\\text{Tens: } 1 + \\opp{1} = 2'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The total cost is **\\$21.35**.' },
      ],
      lines: [
        { say: 'Leo buys shin pads for 12 dollars and 65 cents, and a skipping rope for 8 dollars and 70 cents. What is the total cost?', show: 'q' },
        { say: 'Total means add. Write the numbers in columns, with the decimal points lined up. Now dollars are under dollars, and cents are under cents.', show: ['ad.top', 'ad.bottom', 'ad.bar'] },
        { say: 'Start on the right, with the hundredths. Five plus zero is five.', show: ['ad.cd2', 'ad.sd2', 'm.0'], focus: 'm.0' },
        { say: 'Next, the tenths. Six plus seven is thirteen. That is one whole and three tenths. Write the three, and regroup the one: write a small one above the ones.', hide: 'ad.cd2', show: ['ad.cd1', 'ad.sd1', 'ad.k0', 'm.1'], focus: ['ad.k0', 'm.1'] },
        { say: 'Ones: two plus eight, plus the one we regrouped, is eleven. Write one, and regroup one into the tens.', hide: 'ad.cd1', show: ['ad.cp0', 'ad.sp0', 'ad.k1', 'm.2'], focus: ['ad.k1', 'm.2'] },
        { say: 'Tens: one plus the one we regrouped is two.', hide: 'ad.cp0', show: ['ad.cp1', 'ad.sp1', 'm.3'], focus: 'm.3' },
        { say: 'Put the decimal point in the answer, right below the others. The total cost is 21 dollars and 35 cents.', hide: 'ad.cp1', show: ['ad.ps', 'a'], focus: 'ad.sum' },
        { say: 'Check with an estimate. About 13 dollars plus 9 dollars is 22 dollars. That is close to our answer, so it is reasonable.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Lining up the last digits', md: 'To add $4.5 + 2.35$, do not line up the $5$s. Write $4.5$ as $4.50$ and line up the decimal points. The sum is $6.85$, not $2.80$.' },
        lineUp,
      ],
      lines: [
        { say: 'Watch out for this mistake. To add 4.5 and 2.35, some people line up the last digits, as on the left.', show: ['oops', 'lu.w-top', 'lu.w-bottom', 'lu.w-bar', 'lu.w-cap'] },
        { say: 'Then the five tenths of 4.5 sits over the five hundredths of 2.35. The places are mixed up, and the sum comes out as 2.80. That cannot be right: it is less than 4.5, and we are adding!', focus: ['lu.w-ad1', 'lu.w-bd2'] },
        { say: 'On the right, the decimal points are lined up, and 4.5 is written as 4.50. Every digit is in its own place, and the sum is 6.85.', show: ['lu.r-top', 'lu.r-bottom', 'lu.r-bar', 'lu.r-sum', 'lu.r-cap'], focus: 'lu.r-sum' },
        { say: 'So always line up the decimal points, not the last digits.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $15.8 + 7.45$.',
          choices: ['$9.03$', '$22.25$', '$23.35$', '$23.25$'],
          answer: 3,
          working: 'Write $15.8$ as $15.80$ and line up the points. Hundredths: $0 + 5 = 5$. Tenths: $8 + 4 = 12$, write $2$, regroup $1$. Ones: $5 + 7 + 1 = 13$, write $3$, regroup $1$. Tens: $1 + 1 = 2$. The sum is $23.25$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 15.8 plus 7.45. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 23.25. Write 15.8 as 15.80, and line up the points. The tenths make twelve and the ones make thirteen, so regroup twice. Choice A lines up the last digits instead of the decimal points.', show: 'q.answer' },
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
          items: ['Line up the decimal points, and write zeros so the numbers have the same number of decimal places.', 'Add one column at a time from the right, and regroup when a column adds to $10$ or more.', 'Put the point in the answer right below the others, and check with an estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add decimal numbers, line up the decimal points, and write zeros so the numbers have the same number of decimal places.', show: 'sum.0' },
        { say: 'Add one column at a time, starting on the right, and regroup when a column adds to ten or more.', show: 'sum.1' },
        { say: 'Put the decimal point in the answer right below the others, and check with an estimate. In the next part, we subtract with the standard algorithm. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
