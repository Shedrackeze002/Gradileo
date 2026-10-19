import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// 3127 and 4896 between 3000 and 5000: each is closest to a different thousand.
const line = figure('nl', [
  numberLine({
    min: 3000,
    max: 5000,
    step: 100,
    every: 10,
    length: 14,
    points: [
      { id: 'a', value: 4896, tex: '4896', tone: 'adj' },
      { id: 'b', value: 3127, tex: '3127', tone: 'opp' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-2',
  lessonId: 'm5-2-2',
  title: 'Estimating and Solving Problems, Part 1: Estimating Sums and Differences',
  thumbnailTitle: 'Estimating',
  thumbnail: 'nl',
  summary: 'What an estimate is, and how to estimate a sum or difference by rounding each number first: 4896 + 3127 is about 5000 + 3000 = 8000 (exactly 8023), and 7820 − 2190 is about 8000 − 2000 = 6000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 1', title: 'Estimating Sums and Differences', subtitle: 'Round first, then add or subtract' }],
      lines: [
        { say: 'Before you hand in an answer, ask yourself: does this make sense? A quick estimate can catch a big mistake.', show: 'title' },
        { say: 'In this video, you will estimate sums and differences, by rounding.' },
      ],
    },
    {
      chapter: 'What is an estimate?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Estimate', md: 'An **estimate** is a number that is close to the exact answer and easy to work out. To estimate a sum or difference, **round** each number first. Then add or subtract the rounded numbers.' },
        { kind: 'bullets', id: 'b', items: ['To check an answer: is it about the right size?', 'When you do not need the exact answer.'] },
      ],
      lines: [
        { say: 'An estimate is a number that is close to the exact answer, and easy to work out.', show: 'def' },
        { say: 'To estimate a sum or a difference, round each number first. Then add or subtract the rounded numbers. Rounded numbers are easy to work with, often in your head.' },
        { say: 'Estimates are useful in two ways. They help you check an answer, to see if it is about the right size.', show: 'b.0' },
        { say: 'And sometimes you do not need the exact answer at all. About how many people fit in the hall? About how much will the shopping cost?', show: 'b.1' },
      ],
    },
    {
      chapter: 'Round each number',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'lg', md: 'Estimate $4896 + 3127$ by rounding each number to the nearest thousand.' }, line],
      lines: [
        { say: 'Estimate 4,896 plus 3,127, by rounding each number to the nearest thousand.', show: 'q' },
        { say: 'Here is a number line from 3,000 to 5,000. 4,896 is very close to 5,000. Its hundreds digit is eight, so it rounds up to 5,000.', show: ['nl.axis', 'nl.a'], focus: 'nl.a' },
        { say: '3,127 is much closer to 3,000. Its hundreds digit is one, so it rounds down to 3,000.', show: 'nl.b', focus: 'nl.b' },
      ],
    },
    {
      chapter: 'Add the rounded numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['4896 \\approx 5000 \\qquad 3127 \\approx 3000', '5000 + 3000 = 8000', '\\text{Exact: } 4896 + 3127 = 8023'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'About how big?', md: 'An estimate will not give the exact answer, but it tells you **about how big** the answer should be.' },
      ],
      lines: [
        { say: 'This wavy equals sign means is about equal to. So 4,896 is about 5,000, and 3,127 is about 3,000.', show: 'm.0', focus: 'm.0' },
        { say: 'Now add the rounded numbers. 5,000 plus 3,000 is 8,000. That is easy to do in your head! The estimate is 8,000.', show: 'm.1', focus: 'm.1' },
        { say: 'The exact sum is 8,023. The estimate is very close to it.', show: 'm.2', focus: 'm.2' },
        { say: 'An estimate will not give you the exact answer. But it tells you about how big the answer should be.', show: 'key' },
      ],
    },
    {
      chapter: 'Estimating a difference',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7820 - 2190', '7820 \\approx 8000 \\qquad 2190 \\approx 2000', '8000 - 2000 = 6000', '\\text{Exact: } 5630'] }],
      lines: [
        { say: 'Estimating works for subtracting as well. Estimate 7,820 minus 2,190.', show: 'm.0' },
        { say: 'Round each number to the nearest thousand. 7,820 is about 8,000, and 2,190 is about 2,000.', show: 'm.1', focus: 'm.1' },
        { say: 'This is a difference, so subtract the rounded numbers. 8,000 minus 2,000 is 6,000.', show: 'm.2', focus: 'm.2' },
        { say: 'The exact answer is 5,630. The estimate tells us that the answer is somewhere near six thousand, and it is.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Estimate $6812 + 2345$ by rounding each number to the nearest thousand.',
          choices: ['$9000$', '$8000$', '$5000$', '$9157$'],
          answer: 0,
          working: '$6812$ rounds to $7000$ and $2345$ rounds to $2000$. The estimate is $7000 + 2000 = 9000$. (The exact sum is $9157$.)',
        },
      ],
      lines: [
        { say: 'Your turn. Estimate 6,812 plus 2,345, by rounding each number to the nearest thousand. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 6,812 rounds up to 7,000, and 2,345 rounds down to 2,000. 7,000 plus 2,000 is 9,000. Choice D is the exact answer, not an estimate.', show: 'q.answer' },
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
          items: ['An estimate is close to the exact answer and easy to work out.', 'Round each number first, then add or subtract the rounded numbers.', 'An estimate tells you about how big the answer should be.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An estimate is a number close to the exact answer, and easy to work out.', show: 'sum.0' },
        { say: 'Round each number first, then add or subtract the rounded numbers.', show: 'sum.1' },
        { say: 'And an estimate tells you about how big the answer should be. In the next part, we use estimates to check answers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
