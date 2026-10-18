import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { guide, hole, numbers, piece, plane, tag } from './lib/m31-2-graphs.ts';

// y = (x² − 9)/(x − 3) is the line y = x + 3 with a hole at (3, 6).
const g = plane({ x: [-1, 6], y: [0, 10], every: 0 });
const line = figure('ln', [
  g,
  numbers(g, 1, 1),
  guide(g, 'read', [3, 6], [-1, 6], 'theta'),
  piece(g, { id: 'c', f: (x) => x + 3, from: -1, to: 6 }),
  hole(g, 'H', 3, 6, { tex: '(3, 6)', place: 'below right' }),
  tag(g, 'name', 3.4, 2.2, 'y = \\dfrac{x^2 - 9}{x - 3}', 'right', 'brand'),
]);

const video: Explainer = {
  id: 'm31-2-2-b',
  lessonId: 'm31-2-2',
  title: 'Evaluating Limits Algebraically, Part 2: Factor and Cancel',
  thumbnailTitle: 'Zero over Zero: Factor and Cancel',
  thumbnail: 'ln',
  summary: 'The indeterminate form 0/0 and what to do with it: factor and cancel the common factor (x − a), because the limit ignores x = a. The limit of (x² − 9)/(x − 3) as x → 3 is 6 (a line with a hole at (3, 6)), of (x² + x − 6)/(x² − 4) as x → 2 is 5/4, and of (1/x − 1/2)/(x − 2) as x → 2 is −1/4. And why 0/0 is never an answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 2', title: 'Zero over Zero', subtitle: 'Factor and cancel' }],
      lines: [
        { say: 'In the last part, substituting worked whenever the denominator was not zero. But the most important limits in calculus give zero over zero when you substitute.', show: 'title' },
        { say: 'In this video, you will learn what zero over zero means, and how to find the limit anyway, by factoring and cancelling.' },
      ],
    },
    {
      chapter: 'An indeterminate form',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Indeterminate form', md: 'An expression such as $0/0$ that gives no information about a limit. The limit might be any number, or might not exist: more work is needed.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['f(x) = \\dfrac{x^2 - 9}{x - 3}'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$2.9$', '$5.9$'], ['$2.99$', '$5.99$'], ['$3.01$', '$6.01$'], ['$3.1$', '$6.1$']] },
      ],
      lines: [
        { say: 'Take the limit as x approaches three of x squared minus nine, over x minus three. Substituting three gives zero over zero.', show: ['f', 'def'], focus: 'f' },
        { say: 'Zero over zero is called an indeterminate form. It gives no information: the limit might be any number, or might not exist. It is a signal that more work is needed.' },
        { say: 'A table shows that this limit does exist. At 2.9, the value is 5.9. At 2.99, it is 5.99. From the right, 3.01 gives 6.01, and 3.1 gives 6.1. The values close in on six.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Factor and cancel',
      layout: 'split',
      leftWidth: 500,
      left: [line],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{x^2 - 9}{x - 3} = \\dfrac{\\bad{(x - 3)}(x + 3)}{\\bad{x - 3}}', '= x + 3 \\quad (x \\ne 3)', '\\lim_{x \\to 3} (x + 3) = 6'] },
      ],
      lines: [
        { say: 'Here is how to find it exactly. If substituting three gives zero over zero, then x minus three is a factor of both the top and the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'x squared minus nine factors as x minus three, times x plus three. Cancel the common factor of x minus three, and you are left with x plus three, for every x except three.', show: 'm.1', focus: 'm.1' },
        { say: 'The cancelled expression agrees with the original everywhere except at three. And a limit never looks at x equals three itself. So the two have the same limit.' },
        { say: 'Now substitute: three plus three is six. The limit is six.', show: 'm.2', focus: 'm.2' },
        { say: 'The graph shows what is going on. The original function is the line y equals x plus three, with one point missing: a hole at the point at three, six. The limit is the height of the hole.', show: ['ln.grid', 'ln.axes', 'ln.c', 'ln.name', 'ln.H', 'ln.read'], focus: 'ln.H' },
      ],
    },
    {
      chapter: 'Two trinomials',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 2} \\dfrac{x^2 + x - 6}{x^2 - 4} \\qquad \\dfrac{0}{0}', '\\dfrac{(x + 3)\\bad{(x - 2)}}{(x + 2)\\bad{(x - 2)}} = \\dfrac{x + 3}{x + 2} \\quad (x \\ne 2)', '\\lim_{x \\to 2} \\dfrac{x + 3}{x + 2} = \\dfrac{2 + 3}{2 + 2} = \\dfrac{5}{4}'] },
      ],
      lines: [
        { say: 'Evaluate the limit as x approaches two of x squared plus x minus six, over x squared minus four. Substituting two gives four plus two minus six, over four minus four: zero over zero.', show: 'm.0', focus: 'm.0' },
        { say: 'So x minus two must be a factor of both. The top factors as x plus three, times x minus two. The bottom is a difference of squares: x plus two, times x minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Cancel x minus two, to get x plus three, over x plus two.', focus: 'm.1' },
        { say: 'Now the denominator at two is four, not zero, so substitute: five over four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Combining fractions first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 2} \\dfrac{\\frac{1}{x} - \\frac{1}{2}}{x - 2} \\qquad \\dfrac{0}{0}', '\\dfrac{1}{x} - \\dfrac{1}{2} = \\dfrac{2 - x}{2x} = \\dfrac{-(x - 2)}{2x}', '\\dfrac{-(x - 2)}{2x} \\div (x - 2) = \\dfrac{-1}{2x} \\quad (x \\ne 2)', '\\lim_{x \\to 2} \\dfrac{-1}{2x} = \\dfrac{-1}{2(2)} = -\\dfrac{1}{4}'] },
      ],
      lines: [
        { say: 'Sometimes the common factor is hidden inside fractions. Evaluate the limit as x approaches two of one over x, minus one half, all over x minus two. Substituting gives zero over zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Combine the fractions on top with a common denominator, two x. One over x minus one half is two minus x, over two x.', show: 'm.1', focus: 'm.1' },
        { say: 'Two minus x is the negative of x minus two. So the top is negative x minus two, over two x.', focus: 'm.1' },
        { say: 'Now divide by x minus two. The x minus two cancels, which leaves negative one over two x.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute two: negative one over four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: '0/0 is not an answer', md: '$0/0$ is not $0$, not $1$, and not "does not exist". It is a signal to simplify: factor and cancel, or combine fractions, then substitute again.' }],
      lines: [
        { say: 'A common mistake is to write zero over zero as the answer, or to decide that it equals zero, or one, or that the limit does not exist.', show: 'oops' },
        { say: 'Zero over zero is none of those. In this video, the same form led to six, five quarters and negative one quarter. It is only a signal to simplify, and then substitute again.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to -1} \\frac{x^2 - 1}{x + 1}$.',
          choices: ['$0$', 'It does not exist.', '$-2$', '$2$'],
          answer: 2,
          working: 'Substituting gives $0/0$. Factor: $\\dfrac{(x - 1)(x + 1)}{x + 1} = x - 1$ for $x \\ne -1$, so the limit is $-1 - 1 = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches negative one of x squared minus one, over x plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Substituting gives zero over zero, so factor: x minus one, times x plus one, over x plus one, which is x minus one. At negative one, that is negative two. Choice A treats zero over zero as zero.', show: 'q.answer' },
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
          items: ['$0/0$ is an indeterminate form: a signal to simplify.', 'If substituting $a$ gives $0/0$, then $(x - a)$ is a factor of the top and the bottom. Cancel it.', 'Combine fractions first when the common factor is hidden.', 'Then substitute again.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Zero over zero is an indeterminate form, a signal to simplify.', show: 'sum.0' },
        { say: 'If substituting "a" gives zero over zero, then x minus "a" is a factor of the top and the bottom. Factor and cancel it.', show: 'sum.1' },
        { say: 'Combine fractions first when the common factor is hidden inside them.', show: 'sum.2' },
        { say: 'Then substitute again. In the next part, we handle zero over zero caused by a square root. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
