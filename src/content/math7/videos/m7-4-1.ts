import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from '@/content/math6/videos/lib/m6-1-figures.ts';
import { intLine, note, xOn } from './lib/m7-4-figures.ts';

// The integers from −5 to +5, negatives to the left of zero and positives to the right.
const integers = (id: string) =>
  figure(
    id,
    [
      intLine({ min: -5, max: 5, signed: true }),
      note({ id: 'neg', at: [xOn(-3, -5, 5), 0.9], tex: '\\longleftarrow\\ \\text{negative}', tone: 'adj', place: 'center' }),
      note({ id: 'pos', at: [xOn(3, -5, 5), 0.9], tex: '\\text{positive}\\ \\longrightarrow', tone: 'opp', place: 'center' }),
    ],
    220,
  );

// +3 and −3: each 3 steps from zero, on opposite sides.
const opposites = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -5,
        max: 5,
        signed: true,
        moves: [
          { id: 'right', from: 0, to: 3, tone: 'opp', label: '3\\text{ steps}' },
          { id: 'left', from: 0, to: -3, tone: 'adj', label: '3\\text{ steps}' },
        ],
        points: [
          { id: 'p3', value: 3, tex: '+3', tone: 'opp' },
          { id: 'm3', value: -3, tex: '-3', tone: 'adj' },
        ],
      }),
    ],
    250,
  );

// A positive counter (+1) and a negative counter (−1); then 4 positives (+4) and 3 negatives (−3).
const meet = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 1, col: 1 },
          { id: 'n', sign: '-', count: 1, col: 5.5 },
          { id: 'pp', sign: '+', count: 4, col: 0, row: 1.9 },
          { id: 'nn', sign: '-', count: 3, col: 5, row: 1.9 },
        ],
        labels: [
          { id: 'p-lab', col: 1.55, row: 0, tex: '= +1', place: 'right', tone: 'theta' },
          { id: 'n-lab', col: 6.05, row: 0, tex: '= -1', place: 'right', tone: 'bad' },
          { id: 'pp-lab', col: 1.5, row: 2.45, tex: '+4', place: 'below', tone: 'theta' },
          { id: 'nn-lab', col: 6, row: 2.45, tex: '-3', place: 'below', tone: 'bad' },
        ],
      }),
    ],
    330,
  );

// +2 shown three ways: 2 positives; then with one zero pair added; then with two.
const two = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'p', sign: '+', count: 4 },
          { id: 'n', sign: '-', count: 2, row: 1, col: 2 },
        ],
        pairs: [
          { id: 'z0', col: 2 },
          { id: 'z1', col: 3 },
        ],
        labels: [{ id: 'v', col: 4.3, row: 0.5, tex: '= +2', place: 'right', tone: 'ink' }],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm7-4-1',
  lessonId: 'm7-4-1',
  title: 'Adding Integers, Part 1: Integers and Zero Pairs',
  thumbnailTitle: 'Integers and Zero Pairs',
  thumbnail: 'tw',
  summary:
    'The integers are the whole numbers and their opposites: …, −3, −2, −1, 0, +1, +2, +3, …; opposite integers such as +3 and −3 are the same distance from 0 on opposite sides. Writing each integer with its sign in brackets, like (+5) + (−3), keeps signs apart from operations. With counters, a filled counter is +1 and an open counter is −1, and one of each makes a zero pair, worth 0, so adding or removing zero pairs never changes the value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 1', title: 'Integers and Zero Pairs', subtitle: 'Numbers on both sides of zero' }],
      lines: [
        { say: 'On a cold winter morning, the temperature is eight degrees below zero. By noon, it rises eleven degrees. In a game, a team can be two points ahead, then three points behind.', show: 'title' },
        { say: 'Integers help you keep track of changes like these. In this part, you will meet integers and their opposites, and learn to show them with counters.' },
      ],
    },
    {
      chapter: 'Integers',
      layout: 'center',
      main: [
        integers('nl'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Integers', md: 'The **integers** are the whole numbers and their opposites: $\\ldots, -3, -2, -1, 0, +1, +2, +3, \\ldots$ Positive integers are greater than $0$. Negative integers are less than $0$. Zero is neither.' },
      ],
      lines: [
        { say: 'Here is a number line with zero in the middle. The numbers to the right of zero are positive. We can write them with a plus sign: positive one, positive two, positive three.', show: ['nl.axis', 'nl.pos'], focus: 'nl.pos' },
        { say: 'The numbers to the left of zero are negative: negative one, negative two, negative three. A negative number is less than zero, like a temperature below zero.', show: 'nl.neg', focus: 'nl.neg' },
        { say: 'All of these numbers are integers. The integers are the whole numbers and their opposites. Zero is an integer as well, but it is neither positive nor negative.', show: 'def' },
      ],
    },
    {
      chapter: 'Opposites',
      layout: 'center',
      main: [
        opposites('op'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opposite integers', md: '**Opposite integers** are the same distance from $0$, but on opposite sides of it, like $+3$ and $-3$.' },
      ],
      lines: [
        { say: 'Start at zero and take three steps to the right. You reach positive three.', show: ['op.axis', 'op.right', 'op.p3'], focus: 'op.p3' },
        { say: 'Now start at zero and take three steps to the left. You reach negative three.', show: ['op.left', 'op.m3'], focus: 'op.m3' },
        { say: 'Positive three and negative three are the same distance from zero, but on opposite sides. They are called opposite integers. The opposite of positive three is negative three, and the opposite of negative three is positive three.', show: 'def' },
      ],
    },
    {
      chapter: 'Signs and brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['(\\opp{+5}) \\;+\\; (\\adj{-3})'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Signs in brackets', md: 'Write each integer with its sign, in brackets. The sign **inside** a bracket belongs to the number. The sign **between** the brackets is the operation: add or subtract.' },
      ],
      lines: [
        { say: 'In this unit, we write each integer with its sign, and put it in brackets when we add or subtract. This is positive five plus negative three.', show: 'm' },
        { say: 'The plus sign inside the first bracket belongs to the five: it says the five is positive. The minus sign inside the second bracket says the three is negative.', show: 'tip' },
        { say: 'The plus sign between the brackets is the operation. It tells you to add. The brackets keep the sign of a number from getting mixed up with the operation.' },
      ],
    },
    {
      chapter: 'Counters',
      layout: 'center',
      main: [meet('ct')],
      lines: [
        { say: 'You can show integers with counters. A filled yellow counter with a plus sign is positive one.', show: ['ct.p0', 'ct.p-lab'], focus: 'ct.p0' },
        { say: 'An open red counter with a minus sign is negative one.', show: ['ct.n0', 'ct.n-lab'], focus: 'ct.n0' },
        { say: 'Four positive counters show positive four.', show: [...ids('ct', 'pp', 4), 'ct.pp-lab'] },
        { say: 'Three negative counters show negative three. The number of counters gives the size of the integer, and the colour gives its sign.', show: [...ids('ct', 'nn', 3), 'ct.nn-lab'] },
      ],
    },
    {
      chapter: 'Zero pairs',
      layout: 'split',
      leftWidth: 560,
      left: [two('tw')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Zero pair', md: 'A **zero pair** is one $+1$ counter and one $-1$ counter. Together they are worth $0$, so you can add or remove a zero pair without changing the value.' }],
      lines: [
        { say: 'Two positive counters show positive two.', show: [...ids('tw', 'p', 2), 'tw.v'] },
        { say: 'Now put one positive counter with one negative counter. Positive one and negative one cancel each other out. Together they are worth zero. This is called a zero pair.', show: ['tw.p2', 'tw.n0', 'tw.z0', 'def'], focus: 'tw.z0' },
        { say: 'Adding a zero pair is like adding zero, so the value is still positive two.', focus: 'tw.v' },
        { say: 'Add another zero pair. Now there are four positive counters and two negative counters, and the value is still positive two.', show: ['tw.p3', 'tw.n1', 'tw.z1'], focus: 'tw.z1' },
        { say: 'You can add or remove zero pairs whenever you like, and the value never changes. This idea is the key to adding and subtracting integers.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'There are $3$ positive counters and $5$ negative counters. How many zero pairs can you make?',
          choices: ['$5$', '$3$', '$8$', '$2$'],
          answer: 1,
          working: 'Each zero pair needs one positive and one negative counter. There are only $3$ positive counters, so you can make $3$ zero pairs, and $2$ negative counters are left over.',
        },
      ],
      lines: [
        { say: 'Your turn. There are three positive counters and five negative counters. How many zero pairs can you make? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three. Each zero pair needs one positive counter and one negative counter. There are only three positive counters, so you can make three zero pairs. Choice D is two, the number of negative counters left over.', show: 'q.answer' },
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
            'The **integers** are the whole numbers and their opposites.',
            '**Opposite integers**, like $+3$ and $-3$, are the same distance from $0$.',
            'Write each integer with its sign, in brackets: $(+5) + (-3)$.',
            'A **zero pair** ($+1$ and $-1$) is worth $0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The integers are the whole numbers and their opposites.', show: 'sum.0' },
        { say: 'Opposite integers, like positive three and negative three, are the same distance from zero, on opposite sides.', show: 'sum.1' },
        { say: 'We write each integer with its sign, in brackets, so signs and operations do not get mixed up.', show: 'sum.2' },
        { say: 'And a zero pair, one positive counter and one negative counter, is worth zero. In the next part, you will use zero pairs to add integers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
