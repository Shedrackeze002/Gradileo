import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// A close look between −1.4 and −1.2: −1 1/3 = −1.333… is a little left of −1.3.
const zoom = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -1.4,
        max: -1.2,
        step: 0.01,
        numbers: [
          { value: -1.4, tex: '-1.4' },
          { value: -1.3, tex: '-1.3' },
          { value: -1.2, tex: '-1.2' },
        ],
        points: [
          { id: 'a', value: -4 / 3, tex: '-1\\tfrac{1}{3} = -1.333\\ldots', tone: 'opp' },
          { id: 'b', value: -1.3, tex: '-1.3', tone: 'adj', lift: 0.95 },
        ],
      }),
    ],
    300,
  );

// All five numbers on one line, from −1.5 to 1.
const five = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -1.5,
        max: 1,
        step: 0.1,
        numbers: [
          { value: -1.5, tex: '-1.5' },
          { value: -1, tex: '-1' },
          { value: -0.5, tex: '-0.5' },
          { value: 0, tex: '0' },
          { value: 0.5, tex: '0.5' },
          { value: 1, tex: '1' },
        ],
        points: [
          { id: 'p1', value: -4 / 3, tex: '-1\\tfrac{1}{3}', tone: 'opp', below: true },
          { id: 'p2', value: -1.3, tex: '-1.3', tone: 'opp' },
          { id: 'p3', value: -0.6, tex: '-\\tfrac{3}{5}', tone: 'opp' },
          { id: 'p4', value: 0.4, tex: '0.4', tone: 'adj' },
          { id: 'p5', value: 0.5, tex: '\\tfrac{1}{2}', tone: 'adj', below: true },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-1-c',
  lessonId: 'm9-3-1',
  title: 'Comparing and Ordering Rational Numbers, Part 3: Ordering Rational Numbers',
  thumbnailTitle: 'Ordering Rational Numbers',
  thumbnail: 'fv',
  summary:
    'To order rational numbers, write each one as a decimal, then place it on a number line. For 0.4, −1 1/3, 1/2, −1.3 and −3/5, the decimals are 0.4, −1.333…, 0.5, −1.3 and −0.6. The negatives come first, the one farthest from zero first of all, so the order from least to greatest is −1 1/3, −1.3, −3/5, 0.4, 1/2. When two decimals are close, write out a few more digits: −1.333… is a little less than −1.300.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 3', title: 'Ordering Rational Numbers', subtitle: 'From least to greatest' }],
      lines: [
        { say: 'Putting a mix of fractions, mixed numbers and decimals in order can look hard. It gets much easier when all the numbers look alike.', show: 'title' },
        { say: 'In this part, you will order five rational numbers from least to greatest.' },
      ],
    },
    {
      chapter: 'Write each as a decimal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Order from least to greatest: $0.4,\\ \\ -1\\tfrac{1}{3},\\ \\ \\tfrac{1}{2},\\ \\ -1.3,\\ \\ -\\tfrac{3}{5}$' },
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'As a decimal'],
          rows: [
            ['$0.4$', '$0.4$'],
            ['$-1\\tfrac{1}{3}$', '$-1.\\overline{3} = -1.333\\ldots$'],
            ['$\\tfrac{1}{2}$', '$0.5$'],
            ['$-1.3$', '$-1.3$'],
            ['$-\\tfrac{3}{5}$', '$-0.6$'],
          ],
        },
      ],
      lines: [
        { say: 'Order these numbers from least to greatest: zero point four, negative one and one third, one half, negative one point three, and negative three fifths.', show: 'q' },
        { say: 'First, write each number as a decimal. Zero point four is already a decimal.', show: 't.0', focus: 't.0' },
        { say: 'One third is zero point three three three, and so on: a repeating decimal. So negative one and one third is negative one point three repeating.', show: 't.1', focus: 't.1' },
        { say: 'One half is zero point five, and negative one point three is already a decimal.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Three divided by five is zero point six, so negative three fifths is negative zero point six.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Close decimals',
      layout: 'center',
      main: [
        zoom('zm'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Write more digits', md: '$-1.\\overline{3} = -1.333\\ldots$ and $-1.3 = -1.300$. When two decimals are close, write out a few more digits to compare them.' },
      ],
      lines: [
        { say: 'Two of the numbers are very close: negative one point three repeating, and negative one point three. Which is less?' },
        { say: 'Write out a few more digits. Negative one point three repeating is negative one point three three three. Negative one point three is negative one point three zero zero.', show: 'tip' },
        { say: 'Here is a close look at the number line between negative one point four and negative one point two. Each small mark is one hundredth.', show: 'zm.axis' },
        { say: 'Negative one and one third is a little to the left of negative one point three. It is farther from zero, so it is less.', show: ['zm.a', 'zm.b'], focus: 'zm.a' },
      ],
    },
    {
      chapter: 'Put them in order',
      layout: 'center',
      main: [
        five('fv'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['-1\\tfrac{1}{3},\\ \\ -1.3,\\ \\ -\\tfrac{3}{5},\\ \\ 0.4,\\ \\ \\tfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Now place all five numbers on one number line. Each small mark is one tenth.', show: 'fv.axis' },
        { say: 'The negative numbers are less than the positive ones, so they come first. The one farthest from zero is the least: negative one and one third, then negative one point three, then negative three fifths.', show: ['fv.p1', 'fv.p2', 'fv.p3'], focus: ['fv.p1', 'fv.p2', 'fv.p3'] },
        { say: 'Then the positive numbers. Zero point four is less than zero point five, so zero point four comes before one half.', show: ['fv.p4', 'fv.p5'], focus: ['fv.p4', 'fv.p5'] },
        { say: 'From least to greatest, the order is negative one and one third, negative one point three, negative three fifths, zero point four, and one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice that the answer uses the numbers as they were given, not the decimals. The decimals were just a tool for comparing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Order from least to greatest: $-0.5,\\ \\ -\\tfrac{2}{3},\\ \\ 0.25,\\ \\ -\\tfrac{1}{4}$',
          choices: ['$-\\tfrac{2}{3},\\ -0.5,\\ -\\tfrac{1}{4},\\ 0.25$', '$-0.5,\\ -\\tfrac{2}{3},\\ -\\tfrac{1}{4},\\ 0.25$', '$-\\tfrac{1}{4},\\ -0.5,\\ -\\tfrac{2}{3},\\ 0.25$', '$0.25,\\ -\\tfrac{1}{4},\\ -0.5,\\ -\\tfrac{2}{3}$'],
          answer: 0,
          working: 'As decimals: $-0.5$, $-\\tfrac{2}{3} = -0.666\\ldots$, $0.25$ and $-\\tfrac{1}{4} = -0.25$. The negative farthest from $0$ is the least: $-\\tfrac{2}{3},\\ -0.5,\\ -\\tfrac{1}{4},\\ 0.25$.',
        },
      ],
      lines: [
        { say: 'Your turn. Order these numbers from least to greatest: negative zero point five, negative two thirds, zero point two five, and negative one quarter. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Negative two thirds is about negative zero point six seven, and negative one quarter is negative zero point two five. Negative two thirds is the farthest from zero, so it comes first. Choice C puts the negatives backwards: negative one quarter is the closest to zero, so it is the greatest of the negatives.', show: 'q.answer' },
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
            'Write each number as a decimal.',
            'The negatives come first; the one farthest from $0$ is the least.',
            'When two decimals are close, write out more digits: $-1.333\\ldots < -1.300$.',
            'Give the answer with the numbers as they were written.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To order rational numbers, write each one as a decimal.', show: 'sum.0' },
        { say: 'The negative numbers come first, and the one farthest from zero is the least.', show: 'sum.1' },
        { say: 'When two decimals are close, write out a few more digits to compare them.', show: 'sum.2' },
        { say: 'And give your answer with the numbers as they were written. In the next part, you will find a rational number between two others. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
