import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// 8.7 − (−5.5): the gap from −5.5 up to 8.7 is 5.5 to zero, then 8.7 more.
const gap = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -6,
        max: 10,
        step: 0.5,
        numbers: [-6, -4, -2, 0, 2, 4, 6, 8, 10].map((v) => ({ value: v, tex: String(v) })),
        moves: [
          { id: 'g1', from: -5.5, to: 0, tone: 'opp', label: '5.5' },
          { id: 'g2', from: 0, to: 8.7, tone: 'adj', label: '8.7' },
        ],
        points: [
          { id: 'a', value: -5.5, tex: '-5.5', tone: 'opp', below: true },
          { id: 'b', value: 8.7, tex: '8.7', tone: 'adj', below: true },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-2-b',
  lessonId: 'm9-3-2',
  title: 'Adding and Subtracting Rational Numbers, Part 2: Add the Opposite',
  thumbnailTitle: 'Subtracting: Add the Opposite',
  thumbnail: 'gp',
  summary:
    'To subtract a rational number, add its opposite. 8.7 − (−5.5) asks how far it is from −5.5 up to 8.7: 5.5 to zero and 8.7 more, so 8.7 − (−5.5) = 8.7 + 5.5 = 14.2. A pattern shows why: as the number taken away goes down by 1, the answer goes up by 1. Subtracting a positive works the same way: −1.2 − 3.4 = −1.2 + (−3.4) = −4.6. Change both the operation and the sign of the second number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 2', title: 'Add the Opposite', subtitle: 'Subtracting rational numbers' }],
      lines: [
        { say: 'What is eight point seven minus negative five point five? A minus sign followed by a negative number can look confusing.', show: 'title' },
        { say: 'In this part, you will see why subtracting a number is the same as adding its opposite, and use that to subtract decimals.' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['8.7 - 2 = 6.7', '8.7 - 1 = 7.7', '8.7 - 0 = 8.7', '8.7 - (-1) = 9.7', '8.7 - (-2) = 10.7'] },
      ],
      lines: [
        { say: 'Start with a pattern. Eight point seven minus two is six point seven. Eight point seven minus one is seven point seven. And eight point seven minus zero is eight point seven.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'Each time, the number you take away goes down by one, and the answer goes up by one.' },
        { say: 'Keep the pattern going. Eight point seven minus negative one is nine point seven, and eight point seven minus negative two is ten point seven.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'Taking away negative one gives the same answer as adding one. Taking away negative two gives the same answer as adding two.' },
      ],
    },
    {
      chapter: 'Subtracting finds a gap',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $8.7 - (-5.5)$.' },
        gap('gp'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['8.7 - (-5.5) = 8.7 + 5.5 = 14.2'] },
      ],
      lines: [
        { say: 'Here is another way to see it. Eight point seven minus negative five point five asks: how far is it from negative five point five up to eight point seven?', show: ['q', 'gp.axis', 'gp.a', 'gp.b'] },
        { say: 'From negative five point five up to zero is five point five.', show: 'gp.g1', focus: 'gp.g1' },
        { say: 'From zero up to eight point seven is eight point seven more.', show: 'gp.g2', focus: 'gp.g2' },
        { say: 'Altogether, that is five point five plus eight point seven, which is fourteen point two. So eight point seven minus negative five point five equals eight point seven plus five point five, or fourteen point two.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Add the opposite',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtracting', md: 'To subtract a number, **add its opposite**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8.7 - (-5.5) = 8.7 + 5.5 = 14.2', '-1.2 - 3.4 = -1.2 + (-3.4) = -4.6'] },
      ],
      lines: [
        { say: 'This works every time. To subtract a number, add its opposite. The opposite of negative five point five is five point five.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'It works when you subtract a positive number as well. Negative one point two minus three point four is negative one point two, plus the opposite of three point four, which is negative three point four.', show: 'm.1', focus: 'm.1' },
        { say: 'Now it is an addition with the same signs. Add the sizes and keep the sign: one point two plus three point four is four point six, so the answer is negative four point six.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Minus a negative', md: 'To add the opposite, change **two** things: the subtraction becomes an addition, **and** the second number changes its sign.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{8.7 - (-5.5) \\ne 8.7 - 5.5 = 3.2}', '\\good{8.7 - (-5.5) = 8.7 + 5.5 = 14.2}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people just drop the negative sign and subtract: eight point seven minus five point five is three point two. That is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Adding the opposite changes two things. The subtraction becomes an addition, and the second number changes its sign.', show: 'oops' },
        { say: 'Change both, and you get eight point seven plus five point five, which is fourteen point two. That matches the gap on the number line.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $-3.6 - (-5.1)$.',
          choices: ['$-8.7$', '$-1.5$', '$1.5$', '$8.7$'],
          answer: 2,
          working: 'Add the opposite: $-3.6 + 5.1$. Different signs: $5.1 - 3.6 = 1.5$, and $5.1$ has the greater size, so the answer is $1.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative three point six minus negative five point one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one point five. Add the opposite: negative three point six plus five point one. The signs are different, so subtract the sizes. Five point one has the greater size, so the answer is positive one point five. Choice A subtracts five point one instead of adding it.', show: 'q.answer' },
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
            'To subtract, add the opposite: $8.7 - (-5.5) = 8.7 + 5.5$.',
            'It works for positive numbers as well: $-1.2 - 3.4 = -1.2 + (-3.4)$.',
            'Change two things: the operation, and the sign of the second number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To subtract a number, add its opposite.', show: 'sum.0' },
        { say: 'It works when you subtract a positive number as well.', show: 'sum.1' },
        { say: 'And change two things: subtract becomes add, and the second number changes its sign. In the next part, you will add and subtract fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
