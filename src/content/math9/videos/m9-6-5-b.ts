import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from './lib/m9-6-figures.ts';

// 2 < 5, and their opposites −2 and −5, which come in the other order.
const flip = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: -6,
        max: 6,
        marks: [
          { id: 'p2', value: 2, tex: '2', tone: 'adj' },
          { id: 'p5', value: 5, tex: '5', tone: 'adj' },
          { id: 'n2', value: -2, tex: '-2', tone: 'opp' },
          { id: 'n5', value: -5, tex: '-5', tone: 'opp' },
        ],
      }),
    ],
    200,
  );

// x > −4: an open dot at −4 and an arrow to the right, with the test values 0 and −5.
const sol = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: -8,
        max: 2,
        boundary: { value: -4, closed: false, dir: 'right' },
        marks: [
          { id: 'in', value: 0, tex: '0', tone: 'good' },
          { id: 'out', value: -5, tex: '-5', tone: 'bad' },
        ],
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm9-6-5-b',
  lessonId: 'm9-6-5',
  title: 'Solving Linear Inequalities, Part 2: Multiplying or Dividing by a Negative',
  thumbnailTitle: 'Reversing the Inequality Sign',
  thumbnail: 'fl',
  summary:
    '2 < 5, but multiplying both sides by −1 gives −2 and −5, and −2 > −5: multiplying by a negative number flips the order of numbers on the number line, so the inequality sign must reverse. When you multiply or divide both sides by a negative number, < becomes >, ≤ becomes ≥, and so on. −2x + 7 < 15 gives −2x < 8, and dividing by −2 gives x > −4; x = 0 checks (7 < 15) and x = −5 does not (17 < 15 is false). Forgetting to reverse gives x < −4, which fails the check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 2', title: 'Multiplying or Dividing by a Negative', subtitle: 'Reverse the sign' }],
      lines: [
        { say: 'In the last part, every step kept the inequality sign the same. Now for the one exception.', show: 'title' },
        { say: 'In this part, you will see what happens when you multiply or divide by a negative number, and why the sign must reverse.' },
      ],
    },
    {
      chapter: 'Numbers first',
      layout: 'center',
      main: [flip('fl'), { kind: 'math', id: 'm', size: 'lg', lines: ['2 < 5', '(-1)(2) = -2 \\qquad (-1)(5) = -5', '-2 > -5'] }],
      lines: [
        { say: 'Start with numbers. Two is less than five. On the number line, two is to the left of five.', show: ['fl.axis', 'fl.p2', 'fl.p5', 'm.0'], focus: 'm.0' },
        { say: 'Now multiply both sides by negative one. Two becomes negative two, and five becomes negative five.', show: ['fl.n2', 'fl.n5', 'm.1'], focus: 'm.1' },
        { say: 'Look where they are. Negative two is to the right of negative five. So negative two is greater than negative five.', show: 'm.2', focus: ['m.2', 'fl.n2', 'fl.n5'] },
        { say: 'Two was less than five, but negative two is greater than negative five. Multiplying by a negative number flipped the order of the numbers, so the sign had to reverse.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reversing the inequality sign', md: 'When you multiply or divide both sides of an inequality by a **negative** number, reverse the sign: $<$ becomes $>$, $\\le$ becomes $\\ge$, and so on.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2 < 3 \\quad \\to \\quad 2 > -3'] },
      ],
      lines: [
        { say: 'Here is the rule. When you multiply or divide both sides of an inequality by a negative number, reverse the inequality sign.', show: 'def' },
        { say: 'Less than becomes greater than, less than or equal to becomes greater than or equal to, and the other way round.' },
        { say: 'One more example: negative two is less than three. Multiply both sides by negative one, and reverse the sign: two is greater than negative three. That is true.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Solving −2x + 7 < 15',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2x + 7 < 15', '-2x < 8 \\qquad \\text{subtract } 7', 'x \\bad{>} -4 \\qquad \\text{divide by } {-2} \\text{ and reverse the sign}'] },
        sol('sl'),
      ],
      lines: [
        { say: 'Solve negative two x plus seven is less than fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract seven from both sides: negative two x is less than eight. Subtracting does not reverse the sign.', show: 'm.1', focus: 'm.1' },
        { say: 'Now divide both sides by negative two. It is negative, so reverse the sign. Eight divided by negative two is negative four, so x is greater than negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'On the number line, that is an open dot at negative four, with an arrow to the right.', show: ['sl.axis', 'sl.dot', 'sl.ray'] },
      ],
    },
    {
      chapter: 'Check both sides',
      layout: 'center',
      main: [
        sol('sl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0\\text{: } {-2}(0) + 7 = 7, \\quad 7 < 15 \\;\\good{\\checkmark}', 'x = -5\\text{: } {-2}(-5) + 7 = 17, \\quad 17 < 15 \\text{ is false} \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'Check with zero, which is in the solution set. Negative two times zero, plus seven, is seven, and seven is less than fifteen. True.', show: ['sl.axis', 'sl.dot', 'sl.ray', 'sl.in', 'm.0'], focus: 'm.0' },
        { say: 'Now check negative five, which is not in the solution set. Negative two times negative five, plus seven, is seventeen. Seventeen is less than fifteen is false, as expected.', show: ['sl.out', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'When to reverse', md: 'Reverse the sign **only** when you multiply or divide by a negative number. Subtracting $7$, or adding $-3$, never reverses it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x < -4 \\;\\bad{\\times} \\qquad x = -5\\text{: } 17 < 15 \\text{ is false}'] },
      ],
      lines: [
        { say: 'Watch out for two things. Reverse the sign only when you multiply or divide by a negative number. Subtracting seven, or adding negative three, never reverses it.', show: 'oops' },
        { say: 'And do not forget to reverse when you should. Forgetting in this example gives x is less than negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'That fails the check: negative five would be a solution, but it gives seventeen is less than fifteen, which is false.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $-3x \\ge 12$.',
          choices: ['$x \\ge -4$', '$x \\le -4$', '$x \\ge 4$', '$x \\le 4$'],
          answer: 1,
          working: 'Divide both sides by $-3$ and reverse the sign: $x \\le -4$. Check $x = -5$: $-3(-5) = 15$, and $15 \\ge 12$ is true.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve negative three x is greater than or equal to twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Divide both sides by negative three, and because it is negative, reverse the sign: x is less than or equal to negative four. Choice A forgets to reverse it. Zero fits choice A, but negative three times zero is zero, which is not at least twelve.', show: 'q.answer' },
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
            '$2 < 5$, but $-2 > -5$: multiplying by a negative flips the order.',
            'Multiplying or dividing both sides by a **negative** number reverses the sign.',
            'Adding or subtracting never reverses it.',
            'Check with a value inside the solution set and one outside it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two is less than five, but negative two is greater than negative five. Multiplying by a negative number flips the order.', show: 'sum.0' },
        { say: 'So when you multiply or divide both sides by a negative number, reverse the inequality sign.', show: 'sum.1' },
        { say: 'Adding or subtracting never reverses it.', show: 'sum.2' },
        { say: 'And check with a value inside the solution set, and one outside it. In the next part, you will solve inequalities with x on both sides. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
