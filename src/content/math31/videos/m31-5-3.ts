import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { curve, dots, edgeNumbers, guide, note, num, plane, tangent } from './lib/m31-5-graphs.ts';

const PI = Math.PI;

// The circle x² + y² = 25: its top half and bottom half, and its tangent line at (3, 4).
const h = plane({ x: [-6.5, 6.5], y: [-7.6, 7.6], xStep: 1, yStep: 1, every: 0, width: 6, height: 7 });
const c = plane({ x: [-6.5, 6.5], y: [-6.5, 6.5], xStep: 1, yStep: 1, every: 0, width: 6, height: 6 });
const circle = (g: typeof c, id: string, from: number, to: number, tone: 'brand' | 'adj' = 'brand') =>
  curve(g, { id, x: (t) => 5 * Math.cos(t), y: (t) => 5 * Math.sin(t), from, to, samples: 120, tone });

const video: Explainer = {
  id: 'm31-5-3',
  lessonId: 'm31-5-3',
  title: 'Implicit Differentiation and Higher Derivatives, Part 1: Implicit Differentiation',
  thumbnailTitle: 'Implicit Differentiation',
  thumbnail: 'c',
  summary: 'The circle x² + y² = 25 is not the graph of a function, but it has a tangent line at (3, 4). Implicit differentiation finds its slope without solving for y: differentiate both sides with respect to x, multiplying by dy/dx each time you differentiate y. Here dy/dx = −x/y, so the slope at (3, 4) is −3/4, perpendicular to the radius.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 1', title: 'Implicit Differentiation', subtitle: 'The slope of a curve that is not a function' }],
      lines: [
        { say: 'The circle x squared plus y squared equals 25 is not the graph of a function: a vertical line can cross it twice. Solving for y gives two separate formulas.', show: 'title' },
        { say: 'Yet at the point at three, four, the circle clearly has a tangent line. In this video, you will find its slope without solving for y, using a method called implicit differentiation.' },
      ],
    },
    {
      chapter: 'Defined implicitly',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('h', [
          h,
          edgeNumbers(h, { xs: [-5, 0, 5], ys: [-5, 0, 5], xTex: num, yTex: num }),
          circle(h, 'top', 0, PI),
          circle(h, 'bot', PI, 2 * PI, 'adj'),
          note(h, { id: 'top-t', x: 4.6, y: 6.65, tex: 'y = \\sqrt{25 - x^{2}}', tone: 'brand' }),
          note(h, { id: 'bot-t', x: 4.8, y: -6.65, tex: 'y = -\\sqrt{25 - x^{2}}', tone: 'adj' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'eq', size: 'lg', align: 'left', lines: ['x^{2} + y^{2} = 25'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Defined implicitly', md: 'The equation is not solved for $y$, but it still links each $x$ to one or more values of $y$. Treat $y$ as a function of $x$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\frac{d}{dx}\\left[g(x)\\right]^{2} = 2g(x)\\,g\'(x)', '\\frac{d}{dx}\\left(y^{2}\\right) = 2y\\,\\frac{dy}{dx}'] },
      ],
      lines: [
        { say: 'Here is the circle x squared plus y squared equals 25. Solving for y gives two functions: the top half is y equals the square root of 25 minus x squared, and the bottom half is the negative square root.', show: ['h.grid', 'h.axes', 'h.top', 'h.bot', 'h.top-t', 'h.bot-t', 'eq'] },
        { say: 'The equation itself is not solved for y. We say it defines y implicitly, as one or more functions of x.', show: 'def' },
        { say: 'So treat y as a function of x, and differentiate with the chain rule. You know that the derivative of g of x, squared, is two g of x times g prime of x.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, the derivative of y squared is two y, times d y by d x. The d y by d x is the derivative of the inside, y.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Implicit differentiation',
          md: 'Differentiate every term with respect to $x$. Each time you differentiate an expression in $y$, multiply by $\\dfrac{dy}{dx}$.',
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Differentiate** both sides with respect to $x$, multiplying by $\\dfrac{dy}{dx}$ for every $y$ term.', '**Collect** the terms with $\\dfrac{dy}{dx}$ on one side, and factor it out.', '**Divide.** The answer usually contains both $x$ and $y$.'],
        },
      ],
      lines: [
        { say: 'Here is the method, called implicit differentiation. Differentiate every term with respect to x. Each time you differentiate an expression in y, multiply by d y by d x.', show: 'def' },
        { say: 'Step one: differentiate both sides of the equation with respect to x.', show: 'b.0' },
        { say: 'Step two: collect all the terms with d y by d x on one side, and factor it out.', show: 'b.1' },
        { say: 'Step three: divide to get d y by d x on its own. The answer usually contains both x and y, so to find a slope, you substitute both coordinates of the point.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A circle',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x^{2} + y^{2} = 25',
            '2x + 2y\\opp{\\frac{dy}{dx}} = 0',
            '\\frac{dy}{dx} = -\\frac{2x}{2y} = -\\frac{x}{y}',
            '\\text{At } (3, 4)\\colon\\quad \\frac{dy}{dx} = -\\frac{3}{4}',
          ],
        },
      ],
      lines: [
        { say: 'Find d y by d x for x squared plus y squared equals 25, and the slope of the tangent at the point at three, four.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate each term. x squared gives two x. y squared gives two y, times d y by d x, in orange. And 25 is a constant, so its derivative is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Only one term has d y by d x, so move two x to the other side and divide by two y. d y by d x equals negative two x over two y, which is negative x over y.', show: 'm.2', focus: 'm.2' },
        { say: 'At the point at three, four, x is three and y is four. So the slope of the tangent is negative three over four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('c', [
          c,
          edgeNumbers(c, { xs: [-5, 0, 5], ys: [-5, 0, 5], xTex: num, yTex: num }),
          circle(c, 'circ', 0, 2 * PI),
          guide(c, 'r', [0, 0], [3, 4], 'adj', { dashed: false, weight: 3 }),
          tangent(c, { id: 't', a: 3, y: 4, m: -0.75, left: 3.2, right: 3.2, tone: 'opp', dot: '' }),
          note(c, { id: 'p', x: 4.5, y: 5.3, tex: '(3, 4)', tone: 'theta', group: 't-all' }),
          dots(c, [{ id: 'O', x: 0, y: 0, tone: 'adj' }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{tangent: } \\opp{-\\tfrac{3}{4}}', '\\text{radius: } \\adj{\\tfrac{4}{3}}', '\\left(-\\tfrac{3}{4}\\right)\\left(\\tfrac{4}{3}\\right) = -1'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Perpendicular', md: 'The tangent to a circle is perpendicular to the radius, exactly as geometry predicts.' },
      ],
      lines: [
        { say: 'Here is the circle, with its tangent line at the point at three, four. It slopes down, with slope negative three over four.', show: ['c.grid', 'c.axes', 'c.circ', 'c.t-all', 'm.0'], focus: ['c.t', 'm.0'] },
        { say: 'Now draw the radius from the origin to the same point. It rises four for every three across, so its slope is four over three.', show: ['c.r', 'c.O', 'm.1'], focus: ['c.r', 'm.1'] },
        { say: 'The two slopes multiply to negative one, so the tangent is perpendicular to the radius. That is exactly what geometry says about a tangent to a circle, so implicit differentiation agrees.', show: ['m.2', 'key'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the slope of the tangent to $4x^{2} + y^{2} = 8$ at the point $(1, 2)$.',
          choices: ['$-\\dfrac{1}{2}$', '$2$', '$-2$', '$-8$'],
          answer: 2,
          working: '$8x + 2y\\dfrac{dy}{dx} = 0$, so $\\dfrac{dy}{dx} = -\\dfrac{4x}{y}$. At $(1, 2)$: $-\\dfrac{4}{2} = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the slope of the tangent to four x squared plus y squared equals eight, at the point at one, two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Differentiating gives eight x, plus two y d y by d x, equals zero. So d y by d x is negative four x over y. At the point at one, two, that is negative four over two: negative two. Choice D substitutes the coordinates the wrong way round.', show: 'q.answer' },
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
            'Treat $y$ as a function of $x$: $\\dfrac{d}{dx}\\left(y^{n}\\right) = ny^{n - 1}\\dfrac{dy}{dx}$.',
            'Differentiate both sides, collect the $\\dfrac{dy}{dx}$ terms, then divide.',
            'Substitute both coordinates to find the slope at a point.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In implicit differentiation, treat y as a function of x. The derivative of y to the n is n y to the n minus one, times d y by d x.', show: 'sum.0' },
        { say: 'Differentiate both sides, collect the terms with d y by d x, and divide.', show: 'sum.1' },
        { say: 'And substitute both coordinates to find the slope at a point. In the next part, we handle terms where x and y are multiplied together. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
