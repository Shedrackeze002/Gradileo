import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { dot, xAt } from './lib/m6-1-figures.ts';

// 5, −9, 0, −2 and 11 on one number line.
const order = figure(
  'od',
  [
    numberLine({
      min: -10,
      max: 12,
      step: 1,
      every: 2,
      points: [
        { id: 'a', value: -9, tex: '-9', tone: 'adj' },
        { id: 'b', value: -2, tex: '-2', tone: 'adj' },
        { id: 'c', value: 0, tex: '0', tone: 'ink' },
        { id: 'd', value: 5, tex: '5', tone: 'opp' },
        { id: 'e', value: 11, tex: '11', tone: 'opp' },
      ],
    }),
  ],
  260,
);

// The integers less than −6 lie to its left; the nearest of them is −7.
const next = figure(
  'nx',
  [
    numberLine({ min: -11, max: -1, step: 1 }),
    dot({ id: 'six', at: [xAt(-6, -11, -1), 0], tone: 'ink', open: true }),
    ...[-7, -8, -9, -10].map((v, k) => dot({ id: `l${k}`, at: [xAt(v, -11, -1), 0], tone: k === 0 ? 'good' : 'theta' })),
    dot({ id: 'wrong', at: [xAt(-5, -11, -1), 0], tone: 'bad' }),
  ],
  240,
);

const video: Explainer = {
  id: 'm6-1-2-d',
  lessonId: 'm6-1-2',
  title: 'Comparing and Ordering Positive and Negative Numbers, Part 4: Ordering Numbers',
  thumbnailTitle: 'Ordering Numbers',
  thumbnail: 'od',
  summary: 'To order numbers, picture them on a number line: the least is farthest left (or lowest). Ordering 5, −9, 0, −2 and 11 from least to greatest (−9, −2, 0, 5, 11), and finding the greatest integer less than −6 (it is −7, not −5).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 4', title: 'Ordering Numbers', subtitle: 'From least to greatest' }],
      lines: [
        { say: 'Here are five numbers, all mixed up: five, negative nine, zero, negative two and eleven. Can you put them in order?', show: 'title' },
        { say: 'In this video, you will order positive and negative numbers from least to greatest, and find the next integer before a number.' },
      ],
    },
    {
      chapter: 'Picture the number line',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Ordering numbers', md: 'Picture the numbers on a number line. The **least** is farthest left (or lowest). The **greatest** is farthest right (or highest).' },
        { kind: 'bullets', id: 'b', items: ['Negative numbers come first. The one farthest from $0$ is the least.', 'Then $0$.', 'Then the positive numbers, from the closest to $0$ to the farthest.'] },
      ],
      lines: [
        { say: 'To put numbers in order, picture them on a number line. The least number is farthest to the left, or the lowest on a vertical line. The greatest is farthest to the right, or the highest.', show: 'key' },
        { say: 'So the negative numbers come first. Among them, the one farthest from zero is the least.', show: 'b.0' },
        { say: 'Next comes zero, which is neither positive nor negative.', show: 'b.1' },
        { say: 'Then come the positive numbers, from the one closest to zero to the one farthest away.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Least to greatest',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Order from least to greatest: $5,\\ -9,\\ 0,\\ -2,\\ 11$' },
        order,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{-9},\\ \\adj{-2},\\ 0,\\ \\opp{5},\\ \\opp{11}'] },
      ],
      lines: [
        { say: 'Put these numbers in order from least to greatest: five, negative nine, zero, negative two, eleven.', show: ['q', 'od.axis'] },
        { say: 'The negative numbers come first. Negative nine is farther from zero than negative two, so negative nine is less. It comes first, then negative two.', show: ['od.a', 'od.b'], focus: ['od.a', 'od.b'] },
        { say: 'Next comes zero.', show: 'od.c', focus: 'od.c' },
        { say: 'Then the positive numbers: five, and then eleven.', show: ['od.d', 'od.e'], focus: ['od.d', 'od.e'] },
        { say: 'Reading the dots from left to right: negative nine, negative two, zero, five, eleven. To order them from greatest to least instead, just read from right to left.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The next integer',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'What is the **greatest** integer that is **less** than $-6$?' },
        next,
        { kind: 'math', id: 'm', size: 'lg', lines: ['-7,\\ -8,\\ -9,\\ \\ldots', '\\good{-7}'] },
      ],
      lines: [
        { say: 'Here is a trickier one. What is the greatest integer that is less than negative six?', show: ['q', 'nx.axis', 'nx.six'], focus: 'nx.six' },
        { say: 'Integers that are less than negative six are to its left: negative seven, negative eight, negative nine, and so on.', show: ['nx.l0', 'nx.l1', 'nx.l2', 'nx.l3', 'm.0'], focus: 'm.0' },
        { say: 'The greatest of them is the one closest to negative six. That is one step to the left.', focus: 'nx.l0' },
        { say: 'So the answer is negative seven.', show: 'm.1', focus: ['m.1', 'nx.l0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Going the wrong way', md: '$-5$ is **not** less than $-6$. It is one step to the **right**, so it is greater: $-5 > -6$. The greatest integer less than $-6$ is $-7$.' },
        next,
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people answer negative five, because five is one less than six.', show: ['oops', 'nx.axis', 'nx.six', 'nx.wrong'], focus: 'nx.wrong' },
        { say: 'But negative five is to the right of negative six. So negative five is greater than negative six, not less.' },
        { say: 'Less means to the left. One step to the left of negative six is negative seven.', show: 'nx.l0', focus: 'nx.l0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Order from least to greatest: $3,\\ -4,\\ -10,\\ 0,\\ 7$',
          choices: ['$0,\\ 3,\\ -4,\\ 7,\\ -10$', '$-4,\\ -10,\\ 0,\\ 3,\\ 7$', '$-10,\\ -4,\\ 0,\\ 3,\\ 7$', '$7,\\ 3,\\ 0,\\ -4,\\ -10$'],
          answer: 2,
          working: 'The negative numbers come first, and $-10$ is farther from $0$ than $-4$. Then $0$, then $3$ and $7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Put these numbers in order from least to greatest: three, negative four, negative ten, zero, seven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: negative ten, negative four, zero, three, seven. Choice B puts negative four first, but negative ten is farther to the left, so it is less. Choice D lists them from greatest to least, the wrong way round.', show: 'q.answer' },
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
          items: ['To order numbers, picture them on a number line from left to right.', 'Negative numbers come first; the one farthest from $0$ is the least.', 'Less means to the left: the greatest integer less than $-6$ is $-7$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To order numbers, picture them on a number line, from left to right.', show: 'sum.0' },
        { say: 'The negative numbers come first, and the one farthest from zero is the least. Then zero, then the positive numbers.', show: 'sum.1' },
        { say: 'Less means to the left. In the next lesson, we add positive and negative numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
