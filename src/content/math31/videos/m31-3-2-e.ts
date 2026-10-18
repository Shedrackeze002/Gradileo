import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tag, tangent } from './lib/m31-3-graphs.ts';

// y = 1/x and its tangent at (1, 1): slope −1, the line y = −x + 2.
const recip = (x: number) => 1 / x;
const g = plane({ x: [-4, 4], y: [-4, 4], every: 0 });
const hyper = figure('rc', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'fl', f: recip, from: -4, to: -0.2, tone: 'adj', samples: 200 }),
  plot(g, { id: 'fr', f: recip, from: 0.2, to: 4, tone: 'adj', samples: 200 }),
  tag(g, 'f-t', -2.2, -1.15, 'y = \\tfrac{1}{x}', 'below', 'adj'),
  tangent(g, { id: 'tan', at: [1, 1], m: -1 }),
  tag(g, 'tan-t', 2.65, -2.3, 'y = -x + 2', 'below', 'good'),
  dots(g, [{ id: 'P', x: 1, y: 1, tex: '(1, 1)', tone: 'good', place: 'above right' }]),
]);

const video: Explainer = {
  id: 'm31-3-2-e',
  lessonId: 'm31-3-2',
  title: 'The Derivative from First Principles, Part 5: Reciprocals and Square Roots',
  thumbnailTitle: 'Derivatives of 1/x and √x',
  thumbnail: 'rc',
  summary: 'Differentiating from first principles when step two needs more algebra: combining fractions gives the derivative of 1/x as −1/x², with the tangent y = −x + 2 at (1, 1), and multiplying by the conjugate gives the derivative of √x as 1/(2√x) for x > 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 5', title: 'Reciprocals and Square Roots', subtitle: 'The same four steps, new algebra' }],
      lines: [
        { say: 'The four steps of first principles work for every function, not just polynomials. Only the algebra in step two changes.', show: 'title' },
        { say: 'In this video, you will differentiate one over x and the square root of x from first principles, using the same algebra you used to evaluate limits.' },
      ],
    },
    {
      chapter: 'A reciprocal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $f\'(x)$ for $f(x) = \\dfrac{1}{x}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x + h) - f(x) = \\dfrac{1}{x + h} - \\dfrac{1}{x} = \\dfrac{x - (x + h)}{x(x + h)} = \\dfrac{-h}{x(x + h)}',
            '\\dfrac{-h}{x(x + h)} \\div h = \\dfrac{-1}{x(x + h)}',
            'f\'(x) = \\lim_{h \\to 0} \\dfrac{-1}{x(x + h)} = \\dfrac{-1}{x \\cdot x} = \\good{-\\dfrac{1}{x^2}}',
          ],
        },
      ],
      lines: [
        { say: 'Find f prime of x for f of x equals one over x. Step one: f of x plus h is one over x plus h.', show: 'q' },
        { say: 'Step two: subtract one over x. To subtract fractions, use a common denominator: x times x plus h. The top becomes x, minus x plus h, in brackets.', show: 'm.0', focus: 'm.0' },
        { say: 'x minus x minus h is negative h. So the difference is negative h, over x times x plus h. Notice that it contains h, as it should.' },
        { say: 'Step three: divide by h. The h on the top cancels, leaving negative one over x times x plus h.', show: 'm.1', focus: 'm.1' },
        { say: 'Step four: let h approach zero. x plus h becomes x, so the bottom becomes x times x. The derivative of one over x is negative one over x squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A tangent to the curve',
      layout: 'split',
      leftWidth: 540,
      left: [hyper],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f\'(1) = -\\dfrac{1}{1^2} = -1', 'y - 1 = -1(x - 1)', 'y = -x + 2'] },
        { kind: 'text', id: 't', size: 'md', md: '$f\'(x) = -\\dfrac{1}{x^2}$ is negative for every $x \\ne 0$: the graph falls everywhere.' },
      ],
      lines: [
        { say: 'Here is the graph of y equals one over x. It has two pieces, because x cannot be zero.', show: ['rc.grid', 'rc.axes', 'rc.fl', 'rc.fr', 'rc.f-t'] },
        { say: 'At x equals one, the slope is negative one over one squared, which is negative one. So the tangent at the point at one, one falls one unit for each unit to the right.', show: ['rc.P', 'm.0'], focus: ['rc.P', 'm.0'] },
        { say: 'Its equation, in point-slope form, is y minus one equals negative one times x minus one. That simplifies to y equals negative x plus two.', show: ['rc.tan', 'rc.tan-t', 'm.1', 'm.2'], focus: ['rc.tan', 'm.2'] },
        { say: 'Notice that negative one over x squared is negative for every x except zero. So the graph falls everywhere, on both pieces.', show: 't' },
      ],
    },
    {
      chapter: 'A square root',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $f\'(x)$ for $f(x) = \\sqrt{x}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{\\sqrt{x + h} - \\sqrt{x}}{h} \\cdot \\dfrac{\\sqrt{x + h} + \\sqrt{x}}{\\sqrt{x + h} + \\sqrt{x}} = \\dfrac{(x + h) - x}{h\\left(\\sqrt{x + h} + \\sqrt{x}\\right)}',
            '= \\dfrac{h}{h\\left(\\sqrt{x + h} + \\sqrt{x}\\right)} = \\dfrac{1}{\\sqrt{x + h} + \\sqrt{x}}',
            'f\'(x) = \\lim_{h \\to 0} \\dfrac{1}{\\sqrt{x + h} + \\sqrt{x}} = \\dfrac{1}{\\sqrt{x} + \\sqrt{x}} = \\good{\\dfrac{1}{2\\sqrt{x}}} \\quad (x > 0)',
          ],
        },
      ],
      lines: [
        { say: 'Now find f prime of x for f of x equals the square root of x. The secant slope is the square root of x plus h, minus the square root of x, all over h.', show: 'q' },
        { say: 'Subtracting square roots does not simplify on its own. So multiply the top and the bottom by the conjugate: the square root of x plus h, plus the square root of x.', show: 'm.0', focus: 'm.0' },
        { say: 'On the top, this is a difference of squares. The square roots disappear, leaving x plus h, minus x, which is just h.' },
        { say: 'Now the h on the top cancels the h on the bottom, leaving one over the square root of x plus h, plus the square root of x.', show: 'm.1', focus: 'm.1' },
        { say: 'Let h approach zero. The bottom becomes the square root of x plus the square root of x, which is two root x. So the derivative of the square root of x is one over two root x.', show: 'm.2', focus: 'm.2' },
        { say: 'This only works for x greater than zero. At x equals zero, the bottom would be zero.' },
      ],
    },
    {
      chapter: 'The same methods',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Algebra in step two', 'Derivative'],
          rows: [
            ['$x^2$, $x^3$', 'expand the power', '$2x$, $3x^2$'],
            ['$\\dfrac{1}{x}$', 'combine the fractions', '$-\\dfrac{1}{x^2}$'],
            ['$\\sqrt{x}$', 'multiply by the conjugate', '$\\dfrac{1}{2\\sqrt{x}}$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Familiar algebra', md: 'These are the same methods you used to evaluate limits: expand, combine fractions, or multiply by a conjugate, until the $h$ on the bottom cancels.' },
      ],
      lines: [
        { say: 'Let’s compare. For powers like x squared and x cubed, step two means expanding.', show: 't.0', focus: 't.0' },
        { say: 'For a reciprocal, step two means combining fractions over a common denominator.', show: 't.1', focus: 't.1' },
        { say: 'And for a square root, step two means multiplying by the conjugate.', show: 't.2', focus: 't.2' },
        { say: 'These are the same methods you used to evaluate limits. In every case, the goal is the same: simplify until the h on the bottom cancels.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The derivative of $f(x) = \\dfrac{1}{x}$ is $f\'(x) = -\\dfrac{1}{x^2}$. What is the slope of the tangent to $y = \\dfrac{1}{x}$ at $x = 2$?',
          choices: ['$\\tfrac{1}{2}$', '$-\\tfrac{1}{2}$', '$\\tfrac{1}{4}$', '$-\\tfrac{1}{4}$'],
          answer: 3,
          working: '$f\'(2) = -\\dfrac{1}{2^2} = -\\dfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The derivative of one over x is negative one over x squared. What is the slope of the tangent to y equals one over x, at x equals two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. f prime of two is negative one over two squared, which is negative one quarter. Choice A is f of two, the height of the graph, not its slope.', show: 'q.answer' },
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
            '$\\dfrac{d}{dx}\\left(\\dfrac{1}{x}\\right) = -\\dfrac{1}{x^2}$: combine the fractions in step two.',
            '$\\dfrac{d}{dx}\\sqrt{x} = \\dfrac{1}{2\\sqrt{x}}$ for $x > 0$: multiply by the conjugate.',
            'Simplify until the $h$ on the bottom cancels, then let $h \\to 0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative of one over x is negative one over x squared. In step two, combine the fractions.', show: 'sum.0' },
        { say: 'The derivative of the square root of x is one over two root x, for x greater than zero. In step two, multiply by the conjugate.', show: 'sum.1' },
        { say: 'And always simplify until the h on the bottom cancels, before letting h approach zero. In the next part, we see where a function has no derivative at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
