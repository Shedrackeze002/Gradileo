import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// −2.4 + (−1.8): from 0, left 2.4, then left 1.8 more, to −4.2.
const same = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -5,
        max: 1,
        step: 0.1,
        moves: [
          { id: 'm1', from: 0, to: -2.4, tone: 'opp', label: '-2.4' },
          { id: 'm2', from: -2.4, to: -4.2, tone: 'adj', label: '-1.8' },
        ],
        points: [
          { id: 'mid', value: -2.4, tex: '-2.4', tone: 'opp', below: true },
          { id: 'end', value: -4.2, tex: '-4.2', tone: 'good', below: true },
        ],
      }),
    ],
    300,
  );

// −3.7 + 1.6: from −3.7, right 1.6, to −2.1.
const different = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -5,
        max: 1,
        step: 0.1,
        moves: [{ id: 'm', from: -3.7, to: -2.1, tone: 'adj', label: '+1.6' }],
        points: [
          { id: 'start', value: -3.7, tex: '-3.7', tone: 'opp', below: true },
          { id: 'end', value: -2.1, tex: '-2.1', tone: 'good', below: true },
        ],
      }),
    ],
    260,
  );

// 2.5 + (−4.1): from 2.5, left 4.1, past zero to −1.6.
const crossing = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -3,
        max: 3,
        step: 0.1,
        moves: [{ id: 'm', from: 2.5, to: -1.6, tone: 'opp', label: '-4.1' }],
        points: [
          { id: 'start', value: 2.5, tex: '2.5', tone: 'adj', below: true },
          { id: 'end', value: -1.6, tex: '-1.6', tone: 'good', below: true },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-2',
  lessonId: 'm9-3-2',
  title: 'Adding and Subtracting Rational Numbers, Part 1: Adding Decimals',
  thumbnailTitle: 'Adding Decimals',
  thumbnail: 'sm',
  summary:
    'Adding a positive number moves right on a number line, and adding a negative number moves left. The sign rules are the same as for integers. Same signs: add the sizes and keep the sign, so −2.4 + (−1.8) = −4.2. Different signs: subtract the sizes and use the sign of the number with the greater size, so −3.7 + 1.6 = −2.1 and 2.5 + (−4.1) = −1.6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 1', title: 'Adding Decimals', subtitle: 'The same rules as integers' }],
      lines: [
        { say: 'A warm wind can raise the temperature by twenty degrees in a few hours, and a cold snap can drop it just as fast. To track changes like these, you add and subtract rational numbers.', show: 'title' },
        { say: 'The good news is that the rules are the same ones you use for integers. In this part, you will add positive and negative decimals.' },
      ],
    },
    {
      chapter: 'Adding on a number line',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-2.4 + (-1.8)$.' },
        same('sm'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2.4 + (-1.8) = -4.2'] },
      ],
      lines: [
        { say: 'Picture adding as moving along a number line. Adding a positive number moves you to the right. Adding a negative number moves you to the left.', show: 'sm.axis' },
        { say: 'Find negative two point four plus negative one point eight. Start at zero, and move left two point four. That takes you to negative two point four.', show: ['q', 'sm.m1', 'sm.mid'], focus: 'sm.m1' },
        { say: 'Now add negative one point eight: move left one point eight more. You land on negative four point two.', show: ['sm.m2', 'sm.end'], focus: ['sm.m2', 'sm.end'] },
        { say: 'So negative two point four plus negative one point eight equals negative four point two.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Same signs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'size', tone: 'definition', title: 'Size', md: 'The **size** of a number is its distance from $0$, without its sign. The size of $-2.4$ is $2.4$.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same signs', md: 'Add the sizes and **keep the sign**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2.4 + 1.8 = 4.2', '-2.4 + (-1.8) = -4.2'] },
      ],
      lines: [
        { say: 'The size of a number is its distance from zero, without its sign. The size of negative two point four is two point four.', show: 'size' },
        { say: 'Both moves went left, so they added up. The sizes add: two point four plus one point eight is four point two.', show: 'm.0', focus: 'm.0' },
        { say: 'And the answer keeps the sign: negative four point two.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is the rule. When the two numbers have the same sign, add the sizes and keep the sign. Two positives give a positive sum, and two negatives give a negative sum.', show: 'key' },
      ],
    },
    {
      chapter: 'Different signs',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-3.7 + 1.6$.' },
        different('df'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.7 - 1.6 = 2.1', '-3.7 + 1.6 = -2.1'] },
      ],
      lines: [
        { say: 'Now find negative three point seven plus one point six. Start at negative three point seven.', show: ['q', 'df.axis', 'df.start'] },
        { say: 'Adding one point six moves you right, back toward zero, by one point six. You land on negative two point one.', show: ['df.m', 'df.end'], focus: ['df.m', 'df.end'] },
        { say: 'The move to the right was shorter than the distance to zero, so you did not reach zero. The answer is still negative.' },
        { say: 'With numbers: the signs are different, so subtract the sizes. Three point seven minus one point six is two point one.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative three point seven has the greater size, so the answer takes its sign: negative two point one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Crossing zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Different signs', md: 'Subtract the sizes. Use the sign of the number with the **greater size**.' },
        crossing('cr'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.1 - 2.5 = 1.6 \\qquad 2.5 + (-4.1) = -1.6'] },
      ],
      lines: [
        { say: 'Here is the rule. When the signs are different, subtract the sizes, and use the sign of the number with the greater size.', show: 'key' },
        { say: 'Try one more: two point five plus negative four point one. Start at two point five, and move left four point one.', show: ['cr.axis', 'cr.start', 'cr.m'], focus: 'cr.m' },
        { say: 'This time the move is longer than the distance to zero, so you cross zero and land on negative one point six.', show: 'cr.end', focus: 'cr.end' },
        { say: 'With the rule: four point one minus two point five is one point six. Negative four point one has the greater size, so the sum is negative one point six.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $-4.5 + 2.8$.',
          choices: ['$-1.7$', '$1.7$', '$-7.3$', '$7.3$'],
          answer: 0,
          working: 'Different signs: subtract the sizes, $4.5 - 2.8 = 1.7$. $-4.5$ has the greater size, so the sum is $-1.7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative four point five plus two point eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative one point seven. The signs are different, so subtract the sizes: four point five minus two point eight is one point seven. Negative four point five has the greater size, so the answer is negative. Choice C adds the sizes, as if the signs were the same.', show: 'q.answer' },
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
            'Adding a positive number moves right; adding a negative number moves left.',
            'Same signs: add the sizes and keep the sign. $-2.4 + (-1.8) = -4.2$',
            'Different signs: subtract the sizes and use the sign of the greater size. $-3.7 + 1.6 = -2.1$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a number line, adding a positive number moves right, and adding a negative number moves left.', show: 'sum.0' },
        { say: 'When the signs are the same, add the sizes and keep the sign.', show: 'sum.1' },
        { say: 'When the signs are different, subtract the sizes, and use the sign of the number with the greater size. In the next part, you will subtract rational numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
