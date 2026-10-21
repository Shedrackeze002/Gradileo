import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from './lib/m6-1-figures.ts';

// One positive counter (+1) and one negative counter (−1); then 3 positives (3) and 3 negatives (−3).
const meet = figure(
  'ct',
  [
    counters({
      sets: [
        { id: 'p', sign: '+', count: 1, col: 1 },
        { id: 'n', sign: '-', count: 1, col: 5 },
        { id: 'pp', sign: '+', count: 3, col: 0, row: 1.9 },
        { id: 'nn', sign: '-', count: 3, col: 4, row: 1.9 },
      ],
      labels: [
        { id: 'p-lab', col: 1.55, row: 0, tex: '= +1', place: 'right', tone: 'theta' },
        { id: 'n-lab', col: 5.55, row: 0, tex: '= -1', place: 'right', tone: 'bad' },
        { id: 'pp-lab', col: 1, row: 2.45, tex: '3', place: 'below', tone: 'theta' },
        { id: 'nn-lab', col: 5, row: 2.45, tex: '-3', place: 'below', tone: 'bad' },
      ],
    }),
  ],
  360,
);

// A zero pair: one positive and one negative counter, ringed, worth 0.
const pair = figure(
  'zp',
  [counters({ sets: [{ id: 'p', sign: '+', count: 1 }, { id: 'n', sign: '-', count: 1, row: 1 }], pairs: [{ id: 'z', col: 0 }] })],
  300,
);

// 4 + (−4): four positives over four negatives make four zero pairs.
const four = figure(
  'fr',
  [
    counters({
      sets: [
        { id: 'p', sign: '+', count: 4 },
        { id: 'n', sign: '-', count: 4, row: 1 },
      ],
      pairs: [0, 1, 2, 3].map((c) => ({ id: `z${c}`, col: c })),
    }),
  ],
  320,
);

// 2 + 5 + (−7): seven positives (2 and 5) over seven negatives make seven zero pairs.
const seven = figure(
  'sv',
  [
    counters({
      sets: [
        { id: 'a', sign: '+', count: 2 },
        { id: 'b', sign: '+', count: 5, col: 2 },
        { id: 'n', sign: '-', count: 7, row: 1 },
      ],
      pairs: [0, 1, 2, 3, 4, 5, 6].map((c) => ({ id: `z${c}`, col: c })),
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'm6-1-3',
  lessonId: 'm6-1-3',
  title: 'Sums of Positive and Negative Numbers, Part 1: Zero Pairs',
  thumbnailTitle: 'Zero Pairs',
  thumbnail: 'fr',
  summary: 'Modelling integers with counters: a positive counter is +1 and a negative counter is −1, and together they make a zero pair worth 0. So 4 + (−4) = 0, a number plus its opposite is always 0, and 0 can be written as a sum in many ways, such as 9 + (−9), −15 + 15 and 2 + 5 + (−7).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 1', title: 'Zero Pairs', subtitle: 'A number plus its opposite' }],
      lines: [
        { say: 'On a cold morning, the temperature is negative six degrees, and then it rises nine degrees. Someone owes twelve dollars, and then earns eight dollars. What happens?', show: 'title' },
        { say: 'To find out, we add positive and negative numbers, and zero is the key. In this video, you will model numbers with counters, and see what happens when you add a number and its opposite.' },
      ],
    },
    {
      chapter: 'Counters',
      layout: 'center',
      main: [meet],
      lines: [
        { say: 'We can show integers with counters. A filled yellow counter with a plus sign stands for positive one.', show: ['ct.p0', 'ct.p-lab'], focus: 'ct.p0' },
        { say: 'An open red counter with a negative sign stands for negative one.', show: ['ct.n0', 'ct.n-lab'], focus: 'ct.n0' },
        { say: 'Three positive counters show three.', show: [...ids('ct', 'pp', 3), 'ct.pp-lab'] },
        { say: 'And three negative counters show negative three. The number of counters tells the magnitude, and the colour tells the sign.', show: [...ids('ct', 'nn', 3), 'ct.nn-lab'] },
      ],
    },
    {
      chapter: 'A zero pair',
      layout: 'split',
      leftWidth: 420,
      left: [pair],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Zero pair', md: 'A **zero pair** is one $+1$ counter and one $-1$ counter. Together they are worth $0$.' }],
      lines: [
        { say: 'Now put one positive counter with one negative counter.', show: ['zp.p0', 'zp.n0'] },
        { say: 'Positive one and negative one cancel each other out. Together, they are worth zero. We call them a zero pair.', show: ['zp.z', 'def'], focus: 'zp.z' },
        { say: 'Think of earning one dollar and then spending one dollar. You end up right where you started.' },
      ],
    },
    {
      chapter: 'Four plus negative four',
      layout: 'center',
      main: [four, { kind: 'math', id: 'm', size: 'lg', lines: ['4 + (-4) = 0'] }],
      lines: [
        { say: 'These counters show four plus negative four. There are four positive counters, and four negative counters.', show: [...ids('fr', 'p', 4), ...ids('fr', 'n', 4)] },
        { say: 'Match each positive counter with a negative counter. One zero pair, two, three, four zero pairs.', show: ['fr.z0', 'fr.z1', 'fr.z2', 'fr.z3'] },
        { say: 'Every counter is in a zero pair, and nothing is left over. Each zero pair is worth zero, so the total is zero.' },
        { say: 'Four plus negative four equals zero.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A number plus its opposite',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A number plus its opposite', md: 'The sum of any number and its opposite (its additive inverse) is $0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 + (-7) = 0', '-20 + 20 = 0'] },
      ],
      lines: [
        { say: 'This works for any number. Add a number and its opposite, and the sum is always zero.', show: 'key' },
        { say: 'Seven plus negative seven makes seven zero pairs, so the sum is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative twenty plus twenty makes twenty zero pairs, so that sum is zero as well.', show: 'm.1', focus: 'm.1' },
        { say: 'Now you can see why a number and its opposite are called additive inverses. Adding them takes you all the way back to zero.' },
      ],
    },
    {
      chapter: 'Zero in many ways',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write three different sums that equal $0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['9 + (-9) = 0 \\qquad {-15} + 15 = 0', '2 + 5 + (-7) = 0'] },
        seven,
      ],
      lines: [
        { say: 'Write three different sums that equal zero.', show: 'q' },
        { say: 'Pick any number and add its opposite. Nine plus negative nine is zero. Negative fifteen plus fifteen is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'You can use more than two numbers as well. Try two plus five plus negative seven.', show: ['m.1', ...ids('sv', 'a', 2), ...ids('sv', 'b', 5), ...ids('sv', 'n', 7)], focus: 'm.1' },
        { say: 'Two plus five is seven positive counters, and there are seven negative counters. They make seven zero pairs, so the sum is zero.', show: ['sv.z0', 'sv.z1', 'sv.z2', 'sv.z3', 'sv.z4', 'sv.z5', 'sv.z6'] },
        { say: 'There are many, many more. Zero can be written as a sum in endless ways!' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which sum is equal to $0$?',
          choices: ['$6 + 6$', '$-6 + (-6)$', '$6 + (-5)$', '$-6 + 6$'],
          answer: 3,
          working: '$-6$ and $6$ are opposites: six negative counters and six positive counters make six zero pairs, so $-6 + 6 = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sum is equal to zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Negative six and six are opposites, so they make six zero pairs, and the sum is zero. Choice B adds two negative numbers. There are no zero pairs at all.', show: 'q.answer' },
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
          items: ['A positive counter is $+1$ and a negative counter is $-1$.', 'A **zero pair** ($+1$ and $-1$) is worth $0$.', 'A number plus its opposite is $0$: $4 + (-4) = 0$.', 'Zero can be written as a sum in many ways.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A positive counter stands for positive one, and a negative counter stands for negative one.', show: 'sum.0' },
        { say: 'One of each makes a zero pair, which is worth zero.', show: 'sum.1' },
        { say: 'So a number plus its opposite is always zero.', show: 'sum.2' },
        { say: 'And zero can be written as a sum in many ways. In the next part, we add two positive numbers, and two negative numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
