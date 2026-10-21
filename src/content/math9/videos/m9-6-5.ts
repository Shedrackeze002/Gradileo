import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from './lib/m9-6-figures.ts';

// x ≥ 5: a closed dot at 5 and an arrow to the right, with the test values 4 and 6.
const sol = (id: string) =>
  figure(
    id,
    [
      ineqLine({
        min: 0,
        max: 10,
        boundary: { value: 5, closed: true, dir: 'right' },
        marks: [
          { id: 'in', value: 6, tex: '6', tone: 'good' },
          { id: 'out', value: 4, tex: '4', tone: 'bad' },
        ],
      }),
    ],
    220,
  );

const video: Explainer = {
  id: 'm9-6-5',
  lessonId: 'm9-6-5',
  title: 'Solving Linear Inequalities, Part 1: Solving Like an Equation',
  thumbnailTitle: 'Solving Inequalities',
  thumbnail: 'sl',
  summary:
    'Adding or subtracting the same number on both sides keeps an inequality true, and so does multiplying or dividing both sides by the same positive number: 2 < 5 gives 5 < 8 and 4 < 10. So many inequalities are solved just like equations: 3x − 4 ≥ 11 gives 3x ≥ 15 and x ≥ 5, a closed dot at 5 with an arrow to the right. Check with a value in the solution set (x = 6 gives 14 ≥ 11) and one outside it (x = 4 gives 8, which is not at least 11).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 1', title: 'Solving Like an Equation', subtitle: 'The same steps, with one exception' }],
      lines: [
        { say: 'You can already solve equations. Solving an inequality uses almost exactly the same steps, with one important exception.', show: 'title' },
        { say: 'In this lesson, you will solve inequalities, and find that exception. In this part, you will solve inequalities that need no special care.' },
      ],
    },
    {
      chapter: 'What keeps it true',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 < 5', '2 + 3 < 5 + 3 \\quad \\to \\quad 5 < 8 \\;\\good{\\checkmark}', '2 - 4 < 5 - 4 \\quad \\to \\quad {-2} < 1 \\;\\good{\\checkmark}', '2 \\times 2 < 5 \\times 2 \\quad \\to \\quad 4 < 10 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Still true', md: 'Adding or subtracting the same number on both sides, or multiplying or dividing both sides by the same **positive** number, keeps an inequality true.' },
      ],
      lines: [
        { say: 'Start with a true statement about numbers: two is less than five.', show: 'm.0', focus: 'm.0' },
        { say: 'Add three to both sides: five is less than eight. Still true.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract four from both sides: negative two is less than one. Still true.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply both sides by two: four is less than ten. Still true.', show: 'm.3', focus: 'm.3' },
        { say: 'So adding or subtracting the same number, or multiplying or dividing by the same positive number, keeps an inequality true. That means you can solve many inequalities just like equations.', show: 'key' },
      ],
    },
    {
      chapter: 'Solving 3x − 4 ≥ 11',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x - 4 \\ge 11', '3x \\ge 15 \\qquad \\text{add } 4', 'x \\ge 5 \\qquad \\text{divide by } 3 \\text{, a positive number}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Same order as equations', md: 'Undo adding and subtracting first, then multiplying and dividing.' },
      ],
      lines: [
        { say: 'Solve three x minus four is greater than or equal to eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'As with an equation, undo the subtraction first. Add four to both sides: three x is greater than or equal to fifteen.', show: ['m.1', 'tip'], focus: 'm.1' },
        { say: 'Then divide both sides by three. Three is a positive number, so the sign stays the same: x is greater than or equal to five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check and graph',
      layout: 'center',
      main: [
        sol('sl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 6\\text{: } 3(6) - 4 = 14, \\quad 14 \\ge 11 \\;\\good{\\checkmark}', 'x = 4\\text{: } 3(4) - 4 = 8, \\quad 8 \\ge 11 \\text{ is false} \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'On a number line, x is greater than or equal to five is a closed dot at five, because five is included, with an arrow to the right.', show: ['sl.axis', 'sl.dot', 'sl.ray'] },
        { say: 'Check with a value in the solution set, such as six. Three times six minus four is fourteen, and fourteen is greater than or equal to eleven. True.', show: ['sl.in', 'm.0'], focus: 'm.0' },
        { say: 'You can also check a value outside it, such as four. Three times four minus four is eight, and eight is not greater than or equal to eleven. False, as expected.', show: ['sl.out', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2x + 5 < 17$.',
          choices: ['$x > 6$', '$x < 12$', '$x < 6$', '$x < 11$'],
          answer: 2,
          working: 'Subtract $5$ from both sides: $2x < 12$. Divide by $2$, a positive number, so the sign stays the same: $x < 6$. Check $x = 0$: $5 < 17$ is true.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two x plus five is less than seventeen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Subtract five from both sides: two x is less than twelve. Divide by two, a positive number, so the sign stays the same: x is less than six. Choice A reverses the sign, but dividing by a positive number never reverses it.', show: 'q.answer' },
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
            'Adding or subtracting the same number on both sides keeps an inequality true.',
            'So does multiplying or dividing both sides by the same **positive** number.',
            'Undo adding and subtracting first, then multiplying and dividing.',
            'Check with a value in the solution set.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Adding or subtracting the same number on both sides keeps an inequality true.', show: 'sum.0' },
        { say: 'So does multiplying or dividing both sides by the same positive number.', show: 'sum.1' },
        { say: 'So solve as you would an equation: undo adding and subtracting first, then multiplying and dividing.', show: 'sum.2' },
        { say: 'And check with a value in the solution set. In the next part, you will find the one exception: multiplying or dividing by a negative number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
