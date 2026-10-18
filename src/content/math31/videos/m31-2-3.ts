import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hAsym, numbers, piece, plane, tag } from './lib/m31-2-graphs.ts';

// y = (3x² − 5x + 1)/(2x² + 7), levelling off toward y = 3/2 on both sides.
const g = plane({ x: [-10, 30], y: [-1, 3], xStep: 5, yStep: 0.5, every: 0, width: 8, height: 6 });
const f = (x: number) => (3 * x * x - 5 * x + 1) / (2 * x * x + 7);
const graph = figure('ha', [
  g,
  numbers(g, 5, 0.5),
  hAsym(g, 'asym', 1.5),
  tag(g, 'asym-name', 29.5, 1.5, 'y = \\tfrac{3}{2}', 'above left', 'theta'),
  piece(g, { id: 'c', f, samples: 400 }),
  tag(g, 'name', 1, 2.5, 'y = \\dfrac{3x^2 - 5x + 1}{2x^2 + 7}', 'right', 'brand'),
]);

const video: Explainer = {
  id: 'm31-2-3',
  lessonId: 'm31-2-3',
  title: 'Limits at Infinity and Asymptotes, Part 1: Limits at Infinity',
  thumbnailTitle: 'Limits at Infinity',
  thumbnail: 'ha',
  summary: 'What happens to f(x) as x grows without bound: c/xⁿ → 0, and a limit at infinity L gives a horizontal asymptote y = L. Dividing every term by the highest power of x in the denominator gives the limit of (3x² − 5x + 1)/(2x² + 7), which is 3/2, and of (4x + 1)/(x² − 3), which is 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 1', title: 'Limits at Infinity', subtitle: 'What happens as x grows without bound' }],
      lines: [
        { say: 'So far, x has approached an ordinary number. Now we ask a new question: what happens to f of x when x itself keeps growing, without any bound?', show: 'title' },
        { say: 'In this video, you will find limits at infinity, and see how they give the horizontal asymptotes of a graph.' },
      ],
    },
    {
      chapter: 'Dividing by huge numbers',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$1/x$'], rows: [['$10$', '$0.1$'], ['$100$', '$0.01$'], ['$1000$', '$0.001$'], ['$1\\,000\\,000$', '$0.000\\,001$']] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The key fact', md: 'For any constant $c$ and any power $n > 0$: $\\;\\dfrac{c}{x^n} \\to 0$ as $x \\to \\infty$ or $x \\to -\\infty$.' },
      ],
      lines: [
        { say: 'Start with one over x. When x is ten, it is 0.1. When x is a hundred, 0.01. A thousand, 0.001. A million, one millionth.', show: 't', focus: 't' },
        { say: 'As x grows without bound, one over x gets as close to zero as we like. We write: the limit as x approaches infinity of one over x is zero.' },
        { say: 'Infinity is not a number you can reach. "x approaches infinity" simply means x keeps growing, past every number.' },
        { say: 'The same happens for any constant divided by any positive power of x, such as five over x squared, and for x heading toward negative infinity too. The top stays fixed while the bottom grows huge, so the fraction shrinks to zero.', show: 'key' },
      ],
    },
    {
      chapter: 'Horizontal asymptotes',
      layout: 'split',
      leftWidth: 600,
      left: [graph],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Limit at infinity', md: '$\\displaystyle\\lim_{x \\to \\infty} f(x) = L$ means $f(x)$ gets as close to $L$ as we like for all large enough $x$. Then $y = L$ is a **horizontal asymptote**.' },
      ],
      lines: [
        { say: 'Here is the graph of y equals three x squared, minus five x, plus one, over two x squared, plus seven.', show: ['ha.grid', 'ha.axes', 'ha.c', 'ha.name'] },
        { say: 'Far to the right, the graph levels off. It gets closer and closer to the height one and a half, without ever settling exactly on it. The same happens far to the left.', show: ['ha.asym', 'ha.asym-name'], focus: 'ha.asym' },
        { say: 'We say the limit as x approaches infinity of f of x is three halves. The line y equals three halves is called a horizontal asymptote: a horizontal line the graph approaches at its far ends.', show: 'def' },
      ],
    },
    {
      chapter: 'Equal degrees',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\lim_{x \\to \\infty} \\dfrac{3x^2 - 5x + 1}{2x^2 + 7}', '= \\lim_{x \\to \\infty} \\dfrac{\\frac{3x^2}{x^2} - \\frac{5x}{x^2} + \\frac{1}{x^2}}{\\frac{2x^2}{x^2} + \\frac{7}{x^2}} = \\lim_{x \\to \\infty} \\dfrac{3 - \\frac{5}{x} + \\frac{1}{x^2}}{2 + \\frac{7}{x^2}}', '= \\dfrac{3 - 0 + 0}{2 + 0} = \\dfrac{3}{2}'],
        },
      ],
      lines: [
        { say: 'Now find that limit with algebra. Substituting infinity is not possible, because infinity is not a number.', show: 'm.0', focus: 'm.0' },
        { say: 'Instead, divide every term, top and bottom, by the highest power of x in the denominator, which is x squared. Dividing the top and the bottom by the same thing does not change the fraction.', show: 'm.1', focus: 'm.1' },
        { say: 'Three x squared over x squared is three. Five x over x squared is five over x, and one over x squared stays. On the bottom, two, and seven over x squared.', focus: 'm.1' },
        { say: 'As x approaches infinity, every term with x in its denominator approaches zero. That leaves three over two.', show: 'm.2', focus: 'm.2' },
        { say: 'A check: at x equals a thousand, the function is about 1.4975, very close to one and a half.' },
      ],
    },
    {
      chapter: 'A lower-degree numerator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to \\infty} \\dfrac{4x + 1}{x^2 - 3} = \\lim_{x \\to \\infty} \\dfrac{\\frac{4}{x} + \\frac{1}{x^2}}{1 - \\frac{3}{x^2}}', '= \\dfrac{0 + 0}{1 - 0} = 0'] },
        { kind: 'text', id: 't', size: 'md', md: 'The horizontal asymptote is $y = 0$, the $x$-axis.' },
      ],
      lines: [
        { say: 'One more. Find the limit as x approaches infinity of four x plus one, over x squared minus three.', show: 'm', focus: 'm' },
        { say: 'The highest power in the denominator is x squared, so divide every term by x squared. The top becomes four over x, plus one over x squared. The bottom becomes one, minus three over x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'As x approaches infinity, the top approaches zero, and the bottom approaches one. So the limit is zero over one, which is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'The bottom grows much faster than the top, so the fraction shrinks toward zero. The horizontal asymptote is y equals zero, the x-axis.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to \\infty} \\frac{6x^2 + 1}{3x^2 - 4}$.',
          choices: ['$2$', 'It does not exist.', '$0$', '$-\\dfrac{1}{4}$'],
          answer: 0,
          working: 'Divide every term by $x^2$: $\\dfrac{6 + \\frac{1}{x^2}}{3 - \\frac{4}{x^2}} \\to \\dfrac{6}{3} = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches infinity of six x squared plus one, over three x squared minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Divide every term by x squared: six plus one over x squared, over three minus four over x squared. That approaches six over three, which is two. Choice D uses the constant terms, one over negative four, but for huge x the constants hardly matter.', show: 'q.answer' },
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
          items: ['$\\dfrac{c}{x^n} \\to 0$ as $x \\to \\pm\\infty$, for $n > 0$.', 'If $\\displaystyle\\lim_{x \\to \\pm\\infty} f(x) = L$, then $y = L$ is a horizontal asymptote.', 'Divide every term by the highest power of $x$ in the denominator, then let $x \\to \\infty$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A constant over a positive power of x approaches zero as x approaches infinity or negative infinity.', show: 'sum.0' },
        { say: 'If f of x approaches L at infinity, then the line y equals L is a horizontal asymptote.', show: 'sum.1' },
        { say: 'To find the limit of a rational function at infinity, divide every term by the highest power of x in the denominator. In the next part, we find a shortcut by comparing degrees. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
