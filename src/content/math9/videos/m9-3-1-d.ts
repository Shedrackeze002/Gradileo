import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// Between 0 and 1 there is 1/2; between 0 and 1/2 there is 1/4; between 0 and 1/4 there is 1/8.
const halves = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: 0,
        max: 1,
        step: 1 / 8,
        numbers: [
          { value: 0, tex: '0' },
          { value: 1, tex: '1' },
        ],
        points: [
          { id: 'h', value: 1 / 2, tex: '\\tfrac{1}{2}', tone: 'adj' },
          { id: 'q', value: 1 / 4, tex: '\\tfrac{1}{4}', tone: 'good' },
          { id: 'e', value: 1 / 8, tex: '\\tfrac{1}{8}', tone: 'opp' },
        ],
      }),
    ],
    240,
  );

// From −0.7 to −0.6 in hundredths: −2/3 = −0.666…, the decimals from −0.66 to −0.61, and −0.65.
const between = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -0.7,
        max: -0.6,
        step: 0.01,
        numbers: [
          { value: -0.7, tex: '-0.7' },
          { value: -0.6, tex: '-0.6' },
        ],
        spans: [{ id: 'gap', from: -0.66, to: -0.61, tone: 'good' }],
        points: [
          { id: 'a', value: -2 / 3, tex: '-\\tfrac{2}{3} = -0.666\\ldots', tone: 'opp' },
          { id: 'b', value: -0.6, tex: '-0.6', tone: 'adj' },
          { id: 'c', value: -0.65, tex: '-0.65', tone: 'good', lift: 0.9 },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-1-d',
  lessonId: 'm9-3-1',
  title: 'Comparing and Ordering Rational Numbers, Part 4: A Number in Between',
  thumbnailTitle: 'A Number in Between',
  thumbnail: 'bt',
  summary:
    'Between any two rational numbers there is always another rational number. To find one, write both numbers as decimals with the same number of places. Between −2/3 = −0.666… and −0.6 = −0.600 lies any decimal from −0.66 to −0.61, such as −0.65; check that −0.666… < −0.65 < −0.6. There are many other answers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 4', title: 'A Number in Between', subtitle: 'There is always another one' }],
      lines: [
        { say: 'Between one and two, there is no other integer. But there are lots of other numbers, like one and a half. Is there always a number between two rational numbers?', show: 'title' },
        { say: 'In this part, you will see that there always is, and learn how to find one.' },
      ],
    },
    {
      chapter: 'Always room for one more',
      layout: 'center',
      main: [
        halves('hv'),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Always another one', md: 'Between any two rational numbers, there is always another rational number.' },
      ],
      lines: [
        { say: 'Look at the number line from zero to one. Halfway between them is one half.', show: ['hv.axis', 'hv.h'], focus: 'hv.h' },
        { say: 'Halfway between zero and one half is one quarter.', show: 'hv.q', focus: 'hv.q' },
        { say: 'Halfway between zero and one quarter is one eighth. You could keep going forever: one sixteenth, one thirty-second, and so on. There is never a last one.', show: 'hv.e', focus: 'hv.e' },
        { say: 'So between any two rational numbers, there is always another rational number. In fact, there are infinitely many of them.', show: 'key' },
      ],
    },
    {
      chapter: 'The same number of places',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find a rational number between $-\\dfrac{2}{3}$ and $-0.6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-\\dfrac{2}{3} = -0.666\\ldots \\qquad {-0.6} = -0.600'] },
        between('bt'),
      ],
      lines: [
        { say: 'Find a rational number between negative two thirds and negative zero point six.', show: 'q' },
        { say: 'Write both numbers as decimals with the same number of places. Negative two thirds is negative zero point six six six, and so on. Negative zero point six is negative zero point six zero zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is the number line from negative zero point seven to negative zero point six. Each small mark is one hundredth.', show: 'bt.axis' },
        { say: 'Negative two thirds sits just left of negative zero point six six. Negative zero point six is at the right end.', show: ['bt.a', 'bt.b'], focus: ['bt.a', 'bt.b'] },
        { say: 'Any decimal from negative zero point six six to negative zero point six one is between them.', show: 'bt.gap', focus: 'bt.gap' },
        { say: 'For example, negative zero point six five.', show: 'bt.c', focus: 'bt.c' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['-0.666\\ldots < -0.65 < -0.6'] },
        { kind: 'text', id: 'more', size: 'md', align: 'center', md: 'Other answers: $-0.62$, $\\ -0.64$, $\\ -0.635$, …' },
      ],
      lines: [
        { say: 'Check the answer. Negative zero point six six six is less than negative zero point six five, because it is farther from zero.', show: 'm.0', focus: 'm.0' },
        { say: 'And negative zero point six five is less than negative zero point six, for the same reason. So negative zero point six five is between the two numbers.' },
        { say: 'There are many other answers, like negative zero point six two, or negative zero point six four. You can even use more decimal places, like negative zero point six three five.', show: 'more' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is between $-\\dfrac{1}{4}$ and $-\\dfrac{1}{5}$?',
          choices: ['$-0.3$', '$-0.18$', '$-0.22$', '$-0.26$'],
          answer: 2,
          working: '$-\\tfrac{1}{4} = -0.25$ and $-\\tfrac{1}{5} = -0.20$, and $-0.25 < -0.22 < -0.20$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is between negative one quarter and negative one fifth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative zero point two two. Negative one quarter is negative zero point two five, and negative one fifth is negative zero point two zero. Negative zero point two two is between them. Choice B, negative zero point one eight, is closer to zero than both, so it is greater than both.', show: 'q.answer' },
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
            'Between any two rational numbers, there is always another one.',
            'To find one, write both numbers as decimals with the same number of places.',
            'Check: the number must be greater than the smaller one and less than the greater one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Between any two rational numbers, there is always another rational number.', show: 'sum.0' },
        { say: 'To find one, write both numbers as decimals with the same number of places, and pick a decimal between them.', show: 'sum.1' },
        { say: 'Then check that it is greater than the smaller number and less than the greater one. Next, you will add and subtract rational numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
