import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { approach, guide, numbers, piece, plane, spot } from './lib/m31-2-graphs.ts';

// y = 3x² − x + 1: no breaks, so as x → 2 the graph heads for the point (2, 11) on it.
const g = plane({ x: [-1, 3], y: [0, 16], yStep: 2, every: 0, width: 6, height: 7 });
const f = (x: number) => 3 * x * x - x + 1;
const graph = figure('poly', [
  g,
  numbers(g, 1, 2),
  guide(g, 'read', [2, 11], [-1, 11], 'theta'),
  piece(g, { id: 'c', f }),
  approach(g, { id: 'L', f, from: 1.1, to: 1.82, tone: 'adj' }),
  approach(g, { id: 'R', f, from: 2.42, to: 2.13, tone: 'opp', side: 'right' }),
  spot(g, 'P', 2, 11, { tex: '(2, 11)', place: 'right', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'm31-2-2',
  lessonId: 'm31-2-2',
  title: 'Evaluating Limits Algebraically, Part 1: Direct Substitution',
  thumbnailTitle: 'Direct Substitution',
  thumbnail: 'poly',
  summary: 'The limit laws for sums, products and quotients, and direct substitution: the limit of a polynomial, or of a rational function at a point of its domain, is its value there. The limit of 3x² − x + 1 as x → 2 is 11, and of (2x + 5)/(x − 3) as x → −1 is −3/4; check the denominator first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 1', title: 'Direct Substitution', subtitle: 'When you can simply substitute' }],
      lines: [
        { say: 'Graphs and tables suggest the value of a limit. Algebra finds it exactly. The steps in this lesson are the same steps you will use to find derivatives later.', show: 'title' },
        { say: 'In this video, you will meet the limit laws, and the simplest method of all: direct substitution.' },
      ],
    },
    {
      chapter: 'The limit laws',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to a} \\big[f(x) + g(x)\\big] = \\lim_{x \\to a} f(x) + \\lim_{x \\to a} g(x)', '\\lim_{x \\to a} \\big[f(x)\\,g(x)\\big] = \\lim_{x \\to a} f(x) \\cdot \\lim_{x \\to a} g(x)', '\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = \\dfrac{\\lim_{x \\to a} f(x)}{\\lim_{x \\to a} g(x)} \\quad \\text{if } \\lim_{x \\to a} g(x) \\ne 0'] },
      ],
      lines: [
        { say: 'Limits follow the arithmetic you would expect. The limit of a sum is the sum of the limits.', show: 'm.0', focus: 'm.0' },
        { say: 'The limit of a product is the product of the limits.', show: 'm.1', focus: 'm.1' },
        { say: 'And the limit of a quotient is the quotient of the limits, as long as you never divide by a limit of zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Two more simple facts. The limit of a constant is that constant, and the limit of x, as x approaches "a", is just "a".' },
      ],
    },
    {
      chapter: 'Direct substitution',
      layout: 'split',
      leftWidth: 540,
      left: [graph],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graph of $y = 3x^2 - x + 1$.' }, { kind: 'callout', id: 'def', tone: 'definition', title: 'Direct substitution', md: 'If $f$ is a polynomial, or a rational function with $a$ in its domain, then $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$.' }],
      lines: [
        { say: 'A polynomial is built from constants and x, using only adding and multiplying. So the limit laws let you find its limit piece by piece, and the result is just its value at "a".', show: 'def' },
        { say: 'You can see why on the graph of y equals three x squared, minus x, plus one. It has no breaks, holes or jumps.', show: ['poly.grid', 'poly.axes', 'poly.c', 't'] },
        { say: 'So as x approaches two from either side, the graph heads straight for the point on it at two, eleven.', show: ['poly.L', 'poly.R', 'poly.P', 'poly.read'], focus: ['poly.L', 'poly.R', 'poly.P'] },
        { say: 'The height it heads toward is the height it actually has. The same is true for a rational function, a fraction of polynomials, as long as its denominator is not zero at "a".', focus: 'def' },
      ],
    },
    {
      chapter: 'Substitute when you can',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 2} (3x^2 - x + 1) = 3(2)^2 - 2 + 1 = 11', '\\lim_{x \\to -1} \\dfrac{2x + 5}{x - 3}\\colon \\quad x - 3 = -1 - 3 = -4 \\ne 0', '= \\dfrac{2(-1) + 5}{-1 - 3} = \\dfrac{3}{-4} = -\\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'Evaluate the limit as x approaches two of three x squared, minus x, plus one.', show: 'm', focus: 'm' },
        { say: 'It is a polynomial, so substitute two: three times four, minus two, plus one, which is eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, the limit as x approaches negative one of two x plus five, over x minus three. It is a rational function, so check the denominator first. At negative one, x minus three is negative four. That is not zero, so you can substitute.', show: 'm.1', focus: 'm.1' },
        { say: 'The numerator is negative two plus five, which is three. So the limit is three over negative four, or negative three quarters.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the denominator first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the denominator first', md: 'If the denominator is $0$ at $x = a$, direct substitution does not work. More work is needed.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}\\colon \\quad \\dfrac{3^2 - 9}{3 - 3} = \\dfrac{0}{0}'] },
      ],
      lines: [
        { say: 'Always check the denominator before you substitute. If it is zero at "a", direct substitution does not work, because you cannot divide by zero.', show: 'tip' },
        { say: 'For example, try the limit as x approaches three of x squared minus nine, over x minus three. Substituting three gives zero over zero.', show: 'm', focus: 'm' },
        { say: 'That does not mean the limit fails to exist. It means more work is needed, and that is what the next part is about.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to 3} \\frac{x^2 + 1}{2x - 1}$.',
          choices: ['$\\dfrac{1}{2}$', '$10$', 'It does not exist.', '$2$'],
          answer: 3,
          working: 'The denominator at $x = 3$ is $2(3) - 1 = 5 \\ne 0$, so substitute: $\\dfrac{3^2 + 1}{5} = \\dfrac{10}{5} = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches three of x squared plus one, over two x minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. At three, the denominator is five, which is not zero, so substitute. The numerator is ten, and ten over five is two. Choice A turns the fraction upside down.', show: 'q.answer' },
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
          items: ['The limit of a sum, product or quotient is the sum, product or quotient of the limits (never dividing by a limit of $0$).', 'For a polynomial, $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$: substitute.', 'For a rational function, check the denominator first. If it is not $0$, substitute.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Limits follow the arithmetic of sums, products and quotients, as long as you never divide by a limit of zero.', show: 'sum.0' },
        { say: 'For a polynomial, the limit at "a" is the value at "a": just substitute.', show: 'sum.1' },
        { say: 'For a rational function, check the denominator first. If it is not zero, substitute. In the next part, we deal with zero over zero. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
