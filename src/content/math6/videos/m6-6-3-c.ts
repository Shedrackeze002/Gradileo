import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { tileGroups } from './lib/m6-6-figures.ts';

// The left side, 2x + 3x + 4, as tiles: two long tiles and three long tiles make five.
const left = (id: string) =>
  figure(
    id,
    [
      tileGroups({
        groups: [
          { id: 'a', x: 2, units: 0, caption: '2x' },
          { id: 'b', x: 3, units: 0, caption: '3x' },
          { id: 'c', x: 0, units: 4, caption: '4' },
        ],
        gap: 0.8,
      }),
    ],
    280,
  );

// x, times 5, plus 4, gives 29; undo: 29, minus 4, gives 25, divided by 5, gives 5.
const steps = (id: string) =>
  figure(id, [chain({ nodes: ['x', '5x', '29'], ops: ['\\times 5', '+\\,4'], back: ['5', '25', '29'], undo: ['\\div 5', '-\\,4'], gap: 2.6 })], 230);

const video: Explainer = {
  id: 'm6-6-3-c',
  lessonId: 'm6-6-3',
  title: 'Solving Equations, Part 3: Simplify Each Side First',
  thumbnailTitle: 'Simplify First',
  thumbnail: 'lt',
  summary:
    'When a side of an equation has like terms or numbers to work out, simplify it first: 2x + 3x + 4 = 20 + 9 becomes 5x + 4 = 29, which has the same solution. Subtract 4 and divide by 5 to get x = 5, then check in the first equation: 10 + 15 + 4 = 29 and 20 + 9 = 29.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Simplify Each Side First', subtitle: 'Tidy up, then solve' }],
      lines: [
        { say: 'Some equations look long. One side might have like terms, and the other side might have numbers to work out.', show: 'title' },
        { say: 'In this video, you will simplify each side of an equation first, and then solve the simpler equation.' },
      ],
    },
    {
      chapter: 'Simplify each side',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\good{2x + 3x} + 4 = \\opp{20 + 9}', '\\good{5x} + 4 = \\opp{29}'] },
        left('lt'),
      ],
      lines: [
        { say: 'Solve two x plus three x plus four equals twenty plus nine.', show: 'm.0' },
        { say: 'Before solving, tidy up each side. If a side has like terms, or numbers to work out, simplify it first. The simpler equation has the same solution.' },
        { say: 'On the left, two x and three x are like terms. Two long tiles and three long tiles make five long tiles. So two x plus three x is five x.', show: ['lt.a-xs', 'lt.a-box', 'lt.a-cap', 'lt.b-xs', 'lt.b-box', 'lt.b-cap', 'lt.c-us', 'lt.c-box', 'lt.c-cap'], focus: ['lt.a-xs', 'lt.b-xs'] },
        { say: 'The four has no like term on the left, so it stays. The left side is now five x plus four.', focus: 'lt.c-us' },
        { say: 'On the right, twenty plus nine is twenty-nine. So the equation is now five x plus four equals twenty-nine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solve',
      layout: 'center',
      main: [steps('ch'), { kind: 'math', id: 'm', size: 'md', lines: ['5x + 4 = 29', '5x = 29 - 4 = 25', 'x = 25 \\div 5 = 5'] }],
      lines: [
        { say: 'Now solve five x plus four equals twenty-nine. The variable x is multiplied by five, and then four is added.', show: ['ch.n0', 'ch.f0', 'ch.n1', 'ch.f1', 'ch.n2', 'm.0'] },
        { say: 'Undo in reverse order. First subtract four from both sides. Twenty-nine minus four is twenty-five, so five x equals twenty-five.', show: ['ch.b2', 'ch.u1', 'ch.b1', 'm.1'], focus: ['ch.u1', 'm.1'] },
        { say: 'Then divide both sides by five. Twenty-five divided by five is five, so x equals five.', show: ['ch.u0', 'ch.b0', 'm.2'], focus: ['ch.u0', 'ch.b0', 'm.2'] },
      ],
    },
    {
      chapter: 'Check in the first equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{Left: } 2 \\times 5 + 3 \\times 5 + 4', '= 10 + 15 + 4 = 29', '\\text{Right: } 20 + 9 = 29 \\;\\checkmark'],
        },
      ],
      lines: [
        { say: 'Check the solution in the first equation, the long one. That way, you also catch any mistake you made while simplifying.' },
        { say: 'On the left, put five in place of x: two times five, plus three times five, plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Two times five is ten, and three times five is fifteen. Ten plus fifteen plus four is twenty-nine.', show: 'm.1', focus: 'm.1' },
        { say: 'On the right, twenty plus nine is twenty-nine. Both sides are equal, so x equals five is correct.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Add the coefficients', md: '$2x + 3x$ is $5x$. Add the numbers in front, $2 + 3 = 5$, and keep the same variable. It is not $6x$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2x + 3x = (2 + 3)x = \\good{5x}', '2x + 3x \\ne \\bad{6x}'] },
      ],
      lines: [
        { say: 'Watch out when you combine like terms. Two x plus three x means two of x, and three more of x.', show: 'oops' },
        { say: 'Add the coefficients: two plus three is five. Keep the same variable. So two x plus three x is five x.', show: 'm.0', focus: 'm.0' },
        { say: 'It is not six x. Do not multiply the coefficients. You are adding the terms, so you add the coefficients.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4x + 2x + 3 = 10 + 17$.',
          choices: ['$x = 5$', '$x = 3$', '$x = 24$', '$x = 4$'],
          answer: 3,
          working: 'Simplify each side: $6x + 3 = 27$. Subtract $3$: $6x = 24$. Divide by $6$: $x = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four x plus two x plus three equals ten plus seventeen. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D, x equals four. Simplify first: six x plus three equals twenty-seven. Subtract three: six x equals twenty-four. Divide by six: x equals four. Choice B multiplies the coefficients, four times two, instead of adding them.',
          show: 'q.answer',
        },
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
          items: ['Simplify each side first: combine like terms and work out the numbers.', 'The simpler equation has the same solution.', 'Check the solution in the first equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Simplify each side first: combine like terms, and work out the numbers.', show: 'sum.0' },
        { say: 'The simpler equation has the same solution, so solve that one.', show: 'sum.1' },
        { say: 'And check your solution in the first equation. In the next part, you will write equations to solve word problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
