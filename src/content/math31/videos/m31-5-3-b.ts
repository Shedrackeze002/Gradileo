import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { curve, edgeNumbers, note, num, plane, tangent } from './lib/m31-5-graphs.ts';

// The tilted ellipse x² + xy + y² = 7, drawn in polar form r² (1 + sin θ cos θ) = 7, and its tangent at (1, 2).
const r = (t: number) => Math.sqrt(7 / (1 + Math.sin(t) * Math.cos(t)));
const g = plane({ x: [-4.5, 4.5], y: [-4.5, 4.5], xStep: 2, yStep: 2, every: 0, width: 6, height: 6 });

const video: Explainer = {
  id: 'm31-5-3-b',
  lessonId: 'm31-5-3',
  title: 'Implicit Differentiation and Higher Derivatives, Part 2: Products and Mixed Terms',
  thumbnailTitle: 'Implicit Differentiation with xy',
  thumbnail: 'el',
  summary: 'A term such as xy needs the product rule: its derivative is y + x dy/dx. The slope of the tilted ellipse x² + xy + y² = 7 at (1, 2) is −4/5; forgetting dy/dx is the common mistake; and the same method works with any functions, as for eʸ + xy = e at (0, 1), where the slope is −1/e.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 2', title: 'Products and Mixed Terms', subtitle: 'When x and y are multiplied together' }],
      lines: [
        { say: 'Many curves mix x and y together in one term, such as x times y. Then y cannot easily be solved for at all.', show: 'title' },
        { say: 'In this video, you will use the product rule inside implicit differentiation, find the slope of a tilted ellipse, and see the most common mistake.' },
      ],
    },
    {
      chapter: 'The product rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A product of two functions', md: 'In $xy$, both $x$ and $y$ are functions of $x$, so $xy$ needs the **product rule**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\frac{d}{dx}(\\adj{x}\\opp{y}) = \\adj{1}\\cdot\\opp{y} + \\adj{x}\\cdot\\opp{\\frac{dy}{dx}}'] },
      ],
      lines: [
        { say: 'A term such as x y is a product of two functions of x: x itself, and y. So it needs the product rule.', show: 'key' },
        { say: 'The derivative of x is one, times y. Plus x, times the derivative of y, which is d y by d x. So the derivative of x y is y plus x d y by d x.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A tilted ellipse',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x^{2} + xy + y^{2} = 7 \\qquad 1 + 2 + 4 = 7\\ \\checkmark',
            '2x + \\left(y + x\\frac{dy}{dx}\\right) + 2y\\frac{dy}{dx} = 0',
            '(x + 2y)\\frac{dy}{dx} = -(2x + y)',
            '\\frac{dy}{dx} = -\\frac{2x + y}{x + 2y}',
            '\\text{At } (1, 2)\\colon\\quad \\frac{dy}{dx} = -\\frac{2 + 2}{1 + 4} = -\\frac{4}{5}',
          ],
        },
      ],
      lines: [
        { say: 'Find the slope of the tangent to x squared plus x y plus y squared equals seven, at the point at one, two. First, check that the point is on the curve: one plus two plus four is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate each term. x squared gives two x. x y gives y plus x d y by d x, by the product rule. y squared gives two y d y by d x. And seven gives zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect the terms with d y by d x on the left, and move the others to the right. Factoring out d y by d x leaves x plus two y, times d y by d x, equals the negative of two x plus y.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide: d y by d x equals the negative of two x plus y, all over x plus two y.', show: 'm.3', focus: 'm.3' },
        { say: 'At the point at one, two, that is the negative of two plus two, all over one plus four. That is negative four fifths.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('el', [
          g,
          edgeNumbers(g, { xs: [-4, -2, 0, 2, 4], ys: [-4, -2, 0, 2, 4], xTex: num, yTex: num }),
          curve(g, { id: 'e', x: (t) => r(t) * Math.cos(t), y: (t) => r(t) * Math.sin(t), from: 0, to: 2 * Math.PI, samples: 160, closed: true }),
          tangent(g, { id: 't', a: 1, y: 2, m: -0.8, left: 2.6, right: 2.6, tone: 'opp', dot: '(1, 2)', place: 'below left' }),
          note(g, { id: 'e-t', x: 0.9, y: 3.0, tex: 'x^{2} + xy + y^{2} = 7', tone: 'brand', place: 'right' }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A tilted ellipse', md: 'The $xy$ term tilts the ellipse. At $(1, 2)$ the tangent line falls $4$ for every $5$ across: slope $-\\dfrac{4}{5}$.' },
      ],
      lines: [
        { say: 'Here is the curve. The x y term tilts it into an ellipse that runs from the upper left to the lower right.', show: ['el.grid', 'el.axes', 'el.e', 'el.e-t'] },
        { say: 'At the point at one, two, the tangent line falls four for every five across: slope negative four fifths.', show: ['el.t-all', 'key'], focus: 'el.t' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting dy/dx', md: 'Every time you differentiate $y$, the chain rule adds a factor of $\\dfrac{dy}{dx}$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Term', 'Wrong', 'Right'],
          rows: [
            ['$y^{2}$', '$\\bad{2y}$', '$\\good{2y\\dfrac{dy}{dx}}$'],
            ['$xy$', '$\\bad{\\dfrac{dy}{dx}}$', '$\\good{y + x\\dfrac{dy}{dx}}$'],
          ],
        },
      ],
      lines: [
        { say: 'Watch out for the most common mistake: forgetting d y by d x. Every time you differentiate y, the chain rule adds a factor of d y by d x.', show: 'oops' },
        { say: 'The derivative of y squared is two y d y by d x, not just two y.', show: 't.0', focus: 't.0' },
        { say: 'And the derivative of x y is y plus x d y by d x, not just d y by d x. Both x and y change, so both parts of the product rule are needed.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Any functions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'e^{y} + xy = e \\qquad \\text{at } (0, 1)',
            'e^{y}\\frac{dy}{dx} + y + x\\frac{dy}{dx} = 0',
            '\\frac{dy}{dx} = -\\frac{y}{e^{y} + x}',
            '\\text{At } (0, 1)\\colon\\quad \\frac{dy}{dx} = -\\frac{1}{e^{1} + 0} = -\\frac{1}{e}',
          ],
        },
      ],
      lines: [
        { say: 'The method works with any functions. Find the slope of e to the y, plus x y, equals e, at the point at zero, one. It is on the curve: e to the one, plus zero, is e.', show: 'm.0', focus: 'm.0' },
        { say: 'By the chain rule, e to the y gives e to the y, times d y by d x. x y gives y plus x d y by d x. And e is a constant, so it gives zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect and factor: e to the y plus x, times d y by d x, equals negative y. So d y by d x equals negative y, over e to the y plus x.', show: 'm.2', focus: 'm.2' },
        { say: 'At the point at zero, one, that is negative one over e.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the slope of the tangent to $xy + y^{2} = 6$ at the point $(1, 2)$.',
          choices: ['$-\\dfrac{2}{5}$', '$-\\dfrac{1}{2}$', '$-\\dfrac{5}{2}$', '$-6$'],
          answer: 0,
          working: '$y + x\\dfrac{dy}{dx} + 2y\\dfrac{dy}{dx} = 0$, so $\\dfrac{dy}{dx} = -\\dfrac{y}{x + 2y}$. At $(1, 2)$: $-\\dfrac{2}{1 + 4} = -\\dfrac{2}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the slope of the tangent to x y plus y squared equals six, at the point at one, two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Differentiating gives y, plus x d y by d x, plus two y d y by d x, equals zero.', show: 'q.answer' },
        { say: 'So d y by d x is negative y over x plus two y, which is negative two fifths at the point at one, two. Choice B leaves out the x d y by d x from the product rule.' },
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
          items: ['$\\dfrac{d}{dx}(xy) = y + x\\dfrac{dy}{dx}$, by the product rule.', 'Every time you differentiate $y$, multiply by $\\dfrac{dy}{dx}$.', 'Implicit differentiation works with any functions, such as $e^{y}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative of x y is y plus x d y by d x, by the product rule.', show: 'sum.0' },
        { say: 'Every time you differentiate y, multiply by d y by d x.', show: 'sum.1' },
        { say: 'And implicit differentiation works with any functions, such as e to the y. In the next part, we differentiate derivatives themselves, to get second and higher derivatives. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
