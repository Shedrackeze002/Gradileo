import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { riseRun } from '@/content/math30-3/videos/lib/m303-5-graphs.ts';
import { lineThrough, numbers, piece, plane, spot, tag } from './lib/m31-2-graphs.ts';

// y = 1/x, with the secant line through (1, 1) and (2, 1/2): slope −1/2.
const g = plane({ x: [0, 3], y: [0, 2], xStep: 0.5, yStep: 0.5, every: 0 });
const recip = figure('r1', [
  g,
  numbers(g, 0.5, 0.5),
  piece(g, { id: 'c', f: (x) => 1 / x, from: 0.5, to: 3 }),
  tag(g, 'name', 2.1, 1.5, 'y = \\dfrac{1}{x}', 'right', 'brand'),
  lineThrough(g, { id: 'sec', a: [1, 1], b: [2, 0.5], from: 0, to: 3 }),
  riseRun(g, { id: 'rr', from: [1, 1], to: [2, 0.5], run: 'h = 1', rise: '-\\tfrac{1}{2}', runSide: 'above' }),
  spot(g, 'P', 1, 1, { tex: '(1, 1)', place: 'below left', tone: 'theta' }),
  spot(g, 'Q', 2, 0.5, { tex: '\\left(2, \\tfrac{1}{2}\\right)', place: 'below left', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'm31-1-1-e',
  lessonId: 'm31-1-1',
  title: 'Functions for Calculus, Part 5: The Difference Quotient of a Fraction',
  thumbnailTitle: 'Difference Quotient of a Fraction',
  thumbnail: 'r1',
  summary: 'Simplifying the difference quotient of f(x) = 1/x with a common denominator, to get −1/(x(x + h)), checked with the secant line through (1, 1) and (2, ½); and the mistakes to avoid: f(x + h) is not f(x) + h, and (x + h)² is not x² + h².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 5', title: 'The Difference Quotient of a Fraction', subtitle: 'A common denominator, then cancel h' }],
      lines: [
        { say: 'In the last part, we simplified the difference quotient of a polynomial: expand, subtract, factor out h, and cancel.', show: 'title' },
        { say: 'In this video, you will do the same for a fraction, which needs one extra step, a common denominator. Then we look at the two most common mistakes with f of x plus h.' },
      ],
    },
    {
      chapter: 'A common denominator',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x) = \\dfrac{1}{x} \\qquad f(x + h) = \\dfrac{1}{x + h}', 'f(x + h) - f(x) = \\dfrac{1}{x + h} - \\dfrac{1}{x}', '= \\dfrac{\\adj{x}}{x(x + h)} - \\dfrac{\\opp{x + h}}{x(x + h)} = \\dfrac{x - (x + h)}{x(x + h)}', '= \\dfrac{-h}{x(x + h)}'],
        },
      ],
      lines: [
        { say: 'Simplify the difference quotient for f of x equals one over x. First, f of x plus h: replace x with x plus h, to get one over x plus h.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, subtract f of x: one over x plus h, minus one over x.', show: 'm.1', focus: 'm.1' },
        { say: 'To subtract fractions, use a common denominator: x times x plus h. The first fraction becomes x over that, and the second becomes x plus h over that.', show: 'm.2', focus: 'm.2' },
        { say: 'The numerator is x minus x plus h, in brackets. The two x terms cancel, leaving negative h. So the difference is negative h, over x times x plus h.', show: 'm.3', focus: 'm.3' },
        { say: 'Just as with a polynomial, every term left in the numerator contains h. That is a good sign.', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Divide by h',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{f(x + h) - f(x)}{h} = \\dfrac{-h}{x(x + h)} \\cdot \\dfrac{1}{h}', '= \\dfrac{-1}{x(x + h)}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Dividing by h', md: 'Dividing by $h$ is the same as multiplying by $\\tfrac{1}{h}$. The $h$ on top then cancels.' },
      ],
      lines: [
        { say: 'Now divide by h. Dividing by h is the same as multiplying by one over h.', show: ['m.0', 'tip'], focus: 'm.0' },
        { say: 'The h in the numerator cancels with the h in the denominator, which is allowed because h is not zero. That leaves negative one, over x times x plus h.', show: 'm.1', focus: 'm.1' },
        { say: 'So the difference quotient of one over x is negative one, over x times x plus h.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check with a graph',
      layout: 'split',
      leftWidth: 620,
      left: [recip],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 1,\\ h = 1', '\\dfrac{f(2) - f(1)}{1} = \\dfrac{\\frac{1}{2} - 1}{1} = -\\dfrac{1}{2}', '\\dfrac{-1}{x(x + h)} = \\dfrac{-1}{1(2)} = -\\dfrac{1}{2} \\;\\checkmark'] }],
      lines: [
        { say: 'Let’s check the answer with numbers, and a picture. Here is the graph of y equals one over x.', show: ['r1.grid', 'r1.axes', 'r1.c', 'r1.name'] },
        { say: 'Take x equals one and h equals one. The two points are the point at one, one, and the point at two, one half.', show: ['r1.P', 'r1.Q', 'm.0'], focus: ['r1.P', 'r1.Q', 'm.0'] },
        { say: 'The run is one, and the curve falls from one to one half, so the rise is negative one half. The slope of the secant line is negative one half.', show: ['r1.rr', 'r1.sec', 'm.1'], focus: ['r1.sec', 'm.1'] },
        { say: 'The formula gives the same answer: negative one, over one times two, is negative one half. The slope is negative because the graph is falling.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Expanding f(x + h)', md: '$f(x + h)$ means "replace every $x$ with $(x + h)$". It is **not** $f(x) + h$. And $(x + h)^2 = x^2 + 2xh + h^2$, **not** $x^2 + h^2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = x^2\\colon \\quad \\good{f(x + h) = (x + h)^2} \\qquad \\bad{f(x) + h = x^2 + h}', 'x = 3,\\ h = 1\\colon \\quad \\good{(3 + 1)^2 = 16} \\qquad \\bad{3^2 + 1^2 = 10}'] },
      ],
      lines: [
        { say: 'Two mistakes come up again and again. First, f of x plus h means: replace every x with x plus h. It does not mean f of x, plus h.', show: 'oops' },
        { say: 'For f of x equals x squared, f of x plus h is x plus h, all squared. But f of x, plus h, is x squared plus h, which is something else.', show: 'm.0', focus: 'm.0' },
        { say: 'Second, x plus h, all squared, is x squared, plus two x h, plus h squared. It is not x squared plus h squared.', focus: 'oops' },
        { say: 'Numbers show the difference. With x equals three and h equals one, three plus one, squared, is sixteen. But three squared plus one squared is only ten. The missing six is the two x h.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify the difference quotient for $f(x) = \\dfrac{2}{x}$.',
          choices: ['$\\dfrac{2}{x(x + h)}$', '$\\dfrac{-2}{x(x + h)}$', '$\\dfrac{-2}{x^2}$', '$\\dfrac{-2h}{x(x + h)}$'],
          answer: 1,
          working: '$\\dfrac{2}{x + h} - \\dfrac{2}{x} = \\dfrac{2x - 2(x + h)}{x(x + h)} = \\dfrac{-2h}{x(x + h)}$. Divide by $h$: $\\dfrac{-2}{x(x + h)}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify the difference quotient for f of x equals two over x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. With a common denominator, two over x plus h, minus two over x, is negative two h, over x times x plus h. Dividing by h leaves negative two, over x times x plus h. Choice D forgets the last step, dividing by h.', show: 'q.answer' },
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
          items: ['For a fraction, subtract with a common denominator, then divide by $h$.', 'The difference quotient of $\\dfrac{1}{x}$ is $\\dfrac{-1}{x(x + h)}$.', '$f(x + h)$ is not $f(x) + h$, and $(x + h)^2$ is not $x^2 + h^2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a fraction, subtract using a common denominator, then divide by h, and cancel.', show: 'sum.0' },
        { say: 'The difference quotient of one over x is negative one, over x times x plus h.', show: 'sum.1' },
        { say: 'And remember: f of x plus h is not f of x, plus h, and x plus h, all squared, is not x squared plus h squared. In the next lesson, we review the trigonometry and logarithms that calculus uses. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
