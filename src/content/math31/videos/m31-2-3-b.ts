import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { guide, numbers, piece, plane, tag } from './lib/m31-2-graphs.ts';

// y = (2x³ − x)/(x² + 4) beside the line y = 2x: for large |x| the two are almost the same.
const g = plane({ x: [-6, 6], y: [-14, 14], xStep: 1, yStep: 2, every: 0, width: 8, height: 8 });
const f = (x: number) => (2 * x ** 3 - x) / (x * x + 4);
const graph = figure('cu', [
  g,
  numbers(g, 2, 4),
  guide(g, 'line', [-6, -12], [6, 12], 'theta'),
  piece(g, { id: 'c', f, samples: 300 }),
  tag(g, 'line-name', -5.8, 11, 'y = 2x', 'right', 'theta'),
  tag(g, 'name', -5.8, 6, 'y = f(x)', 'right', 'brand'),
]);

const video: Explainer = {
  id: 'm31-2-3-b',
  lessonId: 'm31-2-3',
  title: 'Limits at Infinity and Asymptotes, Part 2: Comparing Degrees',
  thumbnailTitle: 'Comparing Degrees',
  thumbnail: 'cu',
  summary: 'A shortcut for the limit of a rational function P(x)/Q(x) at infinity: a lower degree on top gives 0, equal degrees give the ratio of the leading coefficients, and a higher degree on top gives ∞ or −∞, with no horizontal asymptote. For large |x| the leading terms win, so (2x³ − x)/(x² + 4) behaves like 2x and approaches −∞ as x → −∞.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 2', title: 'Comparing Degrees', subtitle: 'A shortcut for limits at infinity' }],
      lines: [
        { say: 'In the last part, we found limits at infinity by dividing every term by the highest power of x. The results followed a pattern.', show: 'title' },
        { say: 'In this video, you will see that pattern, why it works, and what happens when the top has the higher degree.' },
      ],
    },
    {
      chapter: 'The leading terms win',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 1000\\colon \\quad 3x^2 = 3\\,000\\,000, \\qquad 5x = 5000, \\qquad 1 = 1', '\\dfrac{3x^2 - 5x + 1}{2x^2 + 7} \\approx \\dfrac{3x^2}{2x^2} = \\dfrac{3}{2}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'For large x', md: 'A rational function behaves like the ratio of its **leading terms**: the highest power on top over the highest power on the bottom.' },
      ],
      lines: [
        { say: 'Why does dividing by the highest power work? Because for huge values of x, the highest power is far bigger than everything else.', show: 'm.0' },
        { say: 'At x equals a thousand, three x squared is three million, but five x is only five thousand, and one is just one. The other terms hardly matter.', focus: 'm.0' },
        { say: 'So for large x, a rational function behaves like the ratio of its leading terms. Three x squared over two x squared is three halves, the limit we found last time.', show: ['m.1', 'key'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Three cases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Degrees', 'Limit at $\\pm\\infty$', 'Example'],
          rows: [
            ['top lower', '$0$', '$\\dfrac{4x + 1}{x^2 - 3} \\to 0$'],
            ['equal', 'ratio of leading coefficients', '$\\dfrac{3x^2 - 5x + 1}{2x^2 + 7} \\to \\dfrac{3}{2}$'],
            ['top higher', '$\\infty$ or $-\\infty$', '$\\dfrac{2x^3 - x}{x^2 + 4} \\to -\\infty$ as $x \\to -\\infty$'],
          ],
        },
      ],
      lines: [
        { say: 'This gives three cases for a rational function, P of x over Q of x, at infinity.', show: 't' },
        { say: 'If the degree of the top is lower, the bottom grows faster, so the limit is zero. The horizontal asymptote is y equals zero.', show: 't.0', focus: 't.0' },
        { say: 'If the degrees are equal, the limit is the ratio of the leading coefficients, like three over two.', show: 't.1', focus: 't.1' },
        { say: 'If the degree of the top is higher, the top grows faster, and the function grows without bound. The limit is infinity or negative infinity, and there is no horizontal asymptote.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A higher-degree numerator',
      layout: 'split',
      leftWidth: 520,
      left: [graph],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\dfrac{2x^3 - x}{x^2 + 4}', '\\approx \\dfrac{2x^3}{x^2} = 2x', '\\lim_{x \\to -\\infty} f(x) = -\\infty'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$-10$', '$-19.1$'], ['$-100$', '$-199.9$'], ['$-1000$', '$-2000.0$']] },
      ],
      lines: [
        { say: 'Evaluate the limit as x approaches negative infinity of f of x equals two x cubed minus x, over x squared plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'The top has degree three and the bottom has degree two, so the top wins. For x far from zero, the function behaves like its leading terms: two x cubed over x squared, which is two x.', show: 'm.1', focus: 'm.1' },
        { say: 'The graph shows it. Far from the origin, the curve runs right alongside the line y equals two x.', show: ['cu.grid', 'cu.axes', 'cu.line', 'cu.line-name', 'cu.c', 'cu.name'], focus: ['cu.c', 'cu.line'] },
        { say: 'As x approaches negative infinity, two x heads down without bound, and so does f of x. So the limit is negative infinity.', show: 'm.2', focus: 'm.2' },
        { say: 'A table agrees. At negative ten, the value is about negative 19.1. At negative a hundred, about negative 199.9. At negative a thousand, about negative two thousand. The values keep falling.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Infinity is not a number',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Reading a limit of infinity', md: 'Writing $\\displaystyle\\lim_{x \\to -\\infty} f(x) = -\\infty$ does not give a number. It says **how** the limit fails to exist: the values fall without bound. There is no horizontal asymptote.' }],
      lines: [
        { say: 'Be careful with what this means. Negative infinity is not a number, so the limit does not exist as a number.', show: 'tip' },
        { say: 'Writing that the limit equals negative infinity is a precise way of saying how it fails to exist: the values fall without bound. And since the graph never levels off, there is no horizontal asymptote.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which function has the horizontal asymptote $y = 3$?',
          choices: ['$y = \\dfrac{3x^2 + 1}{x^3 - 2}$', '$y = \\dfrac{3x^3 + x}{x^2 + 5}$', '$y = \\dfrac{6x^2 - x}{2x^2 + 9}$', '$y = \\dfrac{3x + 1}{x^2 + 3x}$'],
          answer: 2,
          working: 'Only C has equal degrees, and its leading coefficients give $\\dfrac{6}{2} = 3$. A and D have a lower degree on top (limit $0$); B has a higher degree on top (no horizontal asymptote).',
        },
      ],
      lines: [
        { say: 'Your turn. Which function has the horizontal asymptote y equals three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Its top and bottom both have degree two, and the leading coefficients give six over two, which is three. Choice B has a higher degree on top, so it grows without bound and has no horizontal asymptote.', show: 'q.answer' },
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
          items: ['For large $|x|$, a rational function behaves like the ratio of its leading terms.', 'Top lower: limit $0$. Equal: ratio of leading coefficients. Top higher: $\\infty$ or $-\\infty$.', 'Find the sign of an infinite limit from the leading terms.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For large values of x, a rational function behaves like the ratio of its leading terms.', show: 'sum.0' },
        { say: 'A lower degree on top gives a limit of zero. Equal degrees give the ratio of the leading coefficients. A higher degree on top gives infinity or negative infinity.', show: 'sum.1' },
        { say: 'And find the sign from the leading terms. In the next part, we deal with square roots at negative infinity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
