import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { measure } from './lib/m9-5-figures.ts';

// 24 split into equal parts of 6: four parts.
const bar = (id: string) =>
  figure(id, [strip({ parts: 4, shaded: 4, pieces: '6', tone: 'adj' }), measure({ id: 'tot', from: [0, 1.6], to: [12, 1.6], tex: '24', tone: 'opp' })], 240);

const video: Explainer = {
  id: 'm9-6-2-d',
  lessonId: 'm9-6-2',
  title: 'Equations with Brackets and Fractions, Part 4: The Variable in the Denominator',
  thumbnailTitle: 'x in the Denominator',
  thumbnail: 'br',
  summary:
    'In 24/x = 6, the variable is in the denominator, so x cannot be 0. Multiply both sides by x to bring it out of the denominator: 24 = 6x, so x = 4, and 24/4 = 6 checks it. In 6/x = −4, multiplying by x gives 6 = −4x, so x = 6/(−4) = −3/2 = −1.5. Divide by the coefficient of x: −4/6 is the wrong way round, and the check shows it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 4', title: 'The Variable in the Denominator', subtitle: 'Multiply both sides by x' }],
      lines: [
        { say: 'Twenty-four cookies are shared equally, and each person gets six. How many people are there? That question gives the equation twenty-four over x equals six, with x in the denominator.', show: 'title' },
        { say: 'The denominator is the bottom number of a fraction. In this part, you will solve equations with the variable in the denominator.' },
      ],
    },
    {
      chapter: 'A picture',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{24}{x} = 6'] }, bar('br')],
      lines: [
        { say: 'Twenty-four over x equals six says: split twenty-four into x equal parts, and each part is six.', show: ['m.0', 'br.frame', 'br.tot'] },
        { say: 'Parts of six fit into twenty-four four times. So x is four.', show: ['br.shade', 'br.pieces'], focus: 'br.pieces' },
        { say: 'A picture works for easy numbers. For any numbers, use the balance steps.' },
      ],
    },
    {
      chapter: 'Multiply by x',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'x cannot be 0', md: 'You cannot divide by zero, so $x \\ne 0$. Multiply both sides by $x$ to bring it out of the denominator.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{24}{x} \\times x = 6 \\times x \\quad \\to \\quad 24 = 6x', 'x = 4 \\qquad \\text{divide by } 6', '\\text{Check: } \\dfrac{24}{4} = 6 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'First, notice that x cannot be zero, because you cannot divide by zero.', show: 'key' },
        { say: 'To bring x out of the denominator, multiply both sides by x. On the left, twenty-four over x, times x, is just twenty-four. On the right, six times x is six x.', show: 'm.0', focus: 'm.0' },
        { say: 'Now twenty-four equals six x. Divide both sides by six: x equals four.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: twenty-four divided by four is six. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A negative answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{x} = -4', '6 = -4x \\qquad \\text{multiply by } x', 'x = \\dfrac{6}{-4} = -\\dfrac{3}{2} = -1.5 \\qquad \\text{divide by } {-4}', '\\text{Check: } \\dfrac{6}{-1.5} = -4 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Solve six over x equals negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by x: six equals negative four x.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by negative four. Six over negative four simplifies to negative three over two, which is negative one point five.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: six divided by negative one point five is negative four. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'From $6 = -4x$, divide both sides by the coefficient of $x$: $x = \\dfrac{6}{-4}$, not $\\dfrac{-4}{6}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = \\dfrac{-4}{6} = -\\dfrac{2}{3} \\;\\bad{\\times}', '\\text{Check: } 6 \\div \\left(-\\dfrac{2}{3}\\right) = -9, \\text{ not } {-4}'] },
      ],
      lines: [
        { say: 'Watch out for dividing the wrong way. From six equals negative four x, some students write x equals negative four over six.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Divide both sides by the coefficient of x, which is negative four. So the six goes on top: six over negative four.' },
        { say: 'A quick check catches this error. Six divided by negative two thirds is negative nine, not negative four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{15}{x} = -5$.',
          choices: ['$x = 3$', '$x = -3$', '$x = -\\dfrac{1}{3}$', '$x = -75$'],
          answer: 1,
          working: 'Multiply both sides by $x$: $15 = -5x$. Divide both sides by $-5$: $x = -3$. Check: $\\dfrac{15}{-3} = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve fifteen over x equals negative five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Multiply both sides by x: fifteen equals negative five x. Divide both sides by negative five: x equals negative three. Check: fifteen divided by negative three is negative five. Choice C divides the wrong way, negative five over fifteen.', show: 'q.answer' },
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
            'When $x$ is in the denominator, $x \\ne 0$.',
            'Multiply both sides by $x$: $\\dfrac{24}{x} = 6$ becomes $24 = 6x$.',
            'Then divide by the coefficient of $x$: $x = 4$.',
            'Check every solution in the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When x is in the denominator, x cannot be zero.', show: 'sum.0' },
        { say: 'Multiply both sides by x, to bring it out of the denominator.', show: 'sum.1' },
        { say: 'Then divide both sides by the coefficient of x. The number on its own goes on top.', show: 'sum.2' },
        { say: 'And check every solution in the original equation. In the next lesson, you will use equations to solve real problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
