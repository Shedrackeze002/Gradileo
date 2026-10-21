import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from './lib/m9-6-figures.ts';

// x ≥ −3: a closed dot at −3 and an arrow to the right, with the test values 0 and −4.
const sol = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: -7,
        max: 3,
        boundary: { value: -3, closed: true, dir: 'right' },
        marks: [
          { id: 'in', value: 0, tex: '0', tone: 'good' },
          { id: 'out', value: -4, tex: '-4', tone: 'bad' },
        ],
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm9-6-5-c',
  lessonId: 'm9-6-5',
  title: 'Solving Linear Inequalities, Part 3: Variables on Both Sides',
  thumbnailTitle: 'Inequalities with x on Both Sides',
  thumbnail: 'sl',
  summary:
    'For 5 − 2x ≤ 3x + 20, subtract 3x (5 − 5x ≤ 20) and 5 (−5x ≤ 15), then divide by −5 and reverse the sign: x ≥ −3. Check x = 0 (5 ≤ 20, true) and x = −4 (13 ≤ 8, false). To avoid dividing by a negative, collect the x-terms on the side where the coefficient stays positive: adding 2x and subtracting 20 gives −15 ≤ 5x, so −3 ≤ x, which is the same as x ≥ −3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 3', title: 'Variables on Both Sides', subtitle: 'Two ways to the same answer' }],
      lines: [
        { say: 'Inequalities can have x on both sides, just like equations, such as five minus two x is less than or equal to three x plus twenty.', show: 'title' },
        { say: 'In this part, you will solve one in two ways: once with the sign reversed, and once by avoiding the negative altogether.' },
      ],
    },
    {
      chapter: 'Solving 5 − 2x ≤ 3x + 20',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 - 2x \\le 3x + 20', '5 - 5x \\le 20 \\qquad \\text{subtract } 3x', '-5x \\le 15 \\qquad \\text{subtract } 5', 'x \\bad{\\ge} -3 \\qquad \\text{divide by } {-5} \\text{ and reverse the sign}'] },
      ],
      lines: [
        { say: 'Solve five minus two x is less than or equal to three x plus twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Collect the x terms on the left. Subtract three x from both sides: five minus five x is less than or equal to twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract five from both sides: negative five x is less than or equal to fifteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide both sides by negative five. It is negative, so reverse the sign. Fifteen divided by negative five is negative three, so x is greater than or equal to negative three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check and graph',
      layout: 'center',
      main: [
        sol('sl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0\\text{: } 5 - 0 = 5, \\quad 0 + 20 = 20, \\quad 5 \\le 20 \\;\\good{\\checkmark}', 'x = -4\\text{: } 5 + 8 = 13, \\quad {-12} + 20 = 8, \\quad 13 \\le 8 \\text{ is false} \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'On a number line, that is a closed dot at negative three, because negative three is included, and an arrow to the right.', show: ['sl.axis', 'sl.dot', 'sl.ray'] },
        { say: 'Check with zero, which is in the solution set. The left side is five, and the right side is twenty. Five is less than or equal to twenty. True.', show: ['sl.in', 'm.0'], focus: 'm.0' },
        { say: 'Check with negative four, which is not. The left side is five plus eight, which is thirteen. The right side is negative twelve plus twenty, which is eight. Thirteen is less than or equal to eight is false, as expected.', show: ['sl.out', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Avoid the negative',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 - 2x \\le 3x + 20', '5 \\le 5x + 20 \\qquad \\text{add } 2x', '-15 \\le 5x \\qquad \\text{subtract } 20', '-3 \\le x \\qquad \\text{divide by } 5'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Avoid the negative', md: 'Collect the $x$-terms on the side where the coefficient stays positive. $-3 \\le x$ is the same as $x \\ge -3$.' },
      ],
      lines: [
        { say: 'Here is another way. Collect the x terms on the side where the coefficient stays positive. The coefficient three is bigger than negative two, so use the right side.', show: 'm.0', focus: 'm.0' },
        { say: 'Add two x to both sides: five is less than or equal to five x plus twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract twenty: negative fifteen is less than or equal to five x.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by five, a positive number, so the sign stays the same: negative three is less than or equal to x.', show: 'm.3', focus: 'm.3' },
        { say: 'Read it from the x side: x is greater than or equal to negative three. The same answer, and no sign to reverse.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4 - x > 2x - 8$.',
          choices: ['$x > 4$', '$x < -4$', '$x > -4$', '$x < 4$'],
          answer: 3,
          working: 'Subtract $2x$ and $4$ from both sides: $-3x > -12$. Divide by $-3$ and reverse the sign: $x < 4$. Check $x = 0$: $4 > -8$ is true.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four minus x is greater than two x minus eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Subtract two x and four from both sides: negative three x is greater than negative twelve. Divide by negative three and reverse the sign: x is less than four. Choice A forgets to reverse the sign.', show: 'q.answer' },
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
            'Collect the $x$-terms on one side and the numbers on the other, as with equations.',
            'If you divide by a negative coefficient, reverse the sign.',
            'Or collect the $x$-terms where the coefficient stays positive.',
            '$-3 \\le x$ is the same as $x \\ge -3$. Check a value inside and outside.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Collect the x terms on one side, and the numbers on the other, as with equations.', show: 'sum.0' },
        { say: 'If you divide by a negative coefficient, reverse the sign.', show: 'sum.1' },
        { say: 'Or collect the x terms on the side where the coefficient stays positive, and avoid the negative.', show: 'sum.2' },
        { say: 'Negative three is less than or equal to x is the same as x is greater than or equal to negative three. And check a value inside and outside. In the next part, you will use inequalities to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
