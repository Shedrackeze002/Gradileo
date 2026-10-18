import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, num, plane, plot, tangent } from './lib/m31-5-graphs.ts';

// y = ln x with its tangent lines at x = 1/2 (slope 2), x = 1 (slope 1) and x = 2 (slope 1/2).
const g = plane({ x: [0, 5], y: [-2.5, 2.5], xStep: 1, yStep: 1, every: 0, width: 5, height: 5 });

const video: Explainer = {
  id: 'm31-5-2-c',
  lessonId: 'm31-5-2',
  title: 'Derivatives of Exponential and Logarithmic Functions, Part 3: Logarithmic Functions',
  thumbnailTitle: 'The Derivative of $\\ln x$',
  thumbnail: 'ln',
  summary: 'Differentiating both sides of e^(ln x) = x gives the derivative of ln x: 1/x, so the graph of y = ln x gets flatter as x grows. Then logₐ x, the chain rule for ln g(x) → g′(x)/g(x), expanding a logarithm with the log laws before differentiating, and why ln(5x) has derivative 1/x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 3', title: 'Logarithmic Functions', subtitle: 'The derivative of the natural log' }],
      lines: [
        { say: 'Logarithms measure earthquakes, sound levels and acidity, and they undo exponential functions.', show: 'title' },
        { say: 'In this video, you will find the derivative of the natural log of x, see what it means on the graph, and learn to expand a logarithm before you differentiate it.' },
      ],
    },
    {
      chapter: 'The derivative of ln x',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'e^{\\ln x} = x \\qquad (x > 0)',
            'e^{\\ln x}\\cdot\\frac{d}{dx}\\ln x = 1',
            'x\\cdot\\frac{d}{dx}\\ln x = 1',
            '\\frac{d}{dx}\\ln x = \\frac{1}{x}',
          ],
        },
      ],
      lines: [
        { say: 'The natural log undoes e to the x. So for every positive x, e to the power of the natural log of x is x itself.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate both sides with respect to x. On the left, use the chain rule: e to the natural log of x, times the derivative of the natural log of x. On the right, the derivative of x is one.', show: 'm.1', focus: 'm.1' },
        { say: 'But e to the natural log of x is just x. So x times the derivative of the natural log of x equals one.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by x. The derivative of the natural log of x is one over x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('ln', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4, 5], ys: [-2, -1, 0, 1, 2], xTex: num, yTex: num }),
          plot(g, { id: 'ln', f: Math.log, from: 0.05, to: 5, samples: 240 }),
          note(g, { id: 'ln-t', x: 3.9, y: 2.25, tex: 'y = \\ln x', tone: 'brand' }),
          tangent(g, { id: 't0', a: 0.5, y: Math.log(0.5), m: 2, left: 0.35, right: 0.3, tone: 'opp', dot: '' }),
          tangent(g, { id: 't1', a: 1, y: 0, m: 1, left: 0.45, right: 0.6, tone: 'theta', dot: '' }),
          tangent(g, { id: 't2', a: 2, y: Math.log(2), m: 0.5, left: 0.8, right: 1.2, tone: 'adj', dot: '' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['x = \\tfrac{1}{2}\\colon\\ \\text{slope } \\opp{2}', 'x = 1\\colon\\ \\text{slope } \\thc{1}', 'x = 2\\colon\\ \\text{slope } \\adj{\\tfrac{1}{2}}'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Slope one over x', md: 'The farther right you go, the flatter $y = \\ln x$ gets, but its slope is always positive.' },
      ],
      lines: [
        { say: 'Here is the graph of y equals the natural log of x. Its slope at each point should be one over x.', show: ['ln.grid', 'ln.axes', 'ln.ln', 'ln.ln-t'] },
        { say: 'At x equals one half, the slope is one over one half, which is two. The curve is steep there.', show: ['ln.t0-all', 'm.0'], focus: ['ln.t0', 'm.0'] },
        { say: 'At x equals one, the slope is one.', show: ['ln.t1-all', 'm.1'], focus: ['ln.t1', 'm.1'] },
        { say: 'At x equals two, the slope is one half. The curve is flatter.', show: ['ln.t2-all', 'm.2'], focus: ['ln.t2', 'm.2'] },
        { say: 'So the farther right you go, the flatter the natural log graph gets. But one over x is always positive for positive x, so the graph keeps rising forever.', show: 'key', focus: 'ln.ln' },
      ],
    },
    {
      chapter: 'Three rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Derivatives of logarithms', md: 'For $x > 0$, and for $g(x) > 0$:' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\frac{d}{dx}\\ln x = \\frac{1}{x}', '\\log_a x = \\frac{\\ln x}{\\ln a}, \\quad\\text{so}\\quad \\frac{d}{dx}\\log_a x = \\frac{1}{x\\ln a}', '\\frac{d}{dx}\\ln g(x) = \\frac{g\'(x)}{g(x)}'],
        },
      ],
      lines: [
        { say: 'Here are the rules for logarithms. First, the derivative of the natural log of x is one over x.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'For any other base "a", change the base: log base "a" of x equals the natural log of x, over the natural log of "a". The natural log of "a" is a constant, so the derivative is one over x times the natural log of "a".', show: 'm.1', focus: 'm.1' },
        { say: 'And with the chain rule, the derivative of the natural log of g of x is g prime of x over g of x: the derivative of the inside, over the inside.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Expand first',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{(a)}\\ \\ \\frac{d}{dx}\\ln(\\adj{x^{2} + 1}) = \\frac{\\opp{2x}}{\\adj{x^{2} + 1}}',
            '\\text{(b)}\\ \\ y = \\ln\\left(x^{3}(2x + 1)\\right) = 3\\ln x + \\ln(2x + 1)',
            '\\frac{dy}{dx} = \\frac{3}{x} + \\frac{2}{2x + 1}',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Log laws first', md: 'Before differentiating the log of a product, quotient, power or root, **expand it** with the laws of logarithms.' },
      ],
      lines: [
        { say: 'First, differentiate the natural log of x squared plus one. The inside, in blue, is x squared plus one, and its derivative, in orange, is two x. So the derivative is two x over x squared plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, the natural log of x cubed times two x plus one. Before differentiating, expand it with the laws of logarithms. The log of a product is the sum of the logs, and the log of x cubed is three times the log of x.', show: 'm.1', focus: 'm.1' },
        { say: 'Now each piece is simple. Three times the natural log of x gives three over x, and the natural log of two x plus one gives two over two x plus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Expanding first turns one hard derivative into a sum of simple fractions. Do it whenever you see the log of a product, a quotient, a power or a root.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The derivative of ln(kx)', md: '$\\dfrac{d}{dx}\\ln(5x) = \\dfrac{5}{5x} = \\dfrac{1}{x}$, not $\\dfrac{5}{x}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ln(5x) = \\ln 5 + \\ln x', '\\frac{d}{dx}\\ln(5x) = 0 + \\frac{1}{x} = \\frac{1}{x}'] },
      ],
      lines: [
        { say: 'Watch out with a constant inside. The derivative of the natural log of five x is five over five x, which is one over x, not five over x.', show: 'oops' },
        { say: 'Expanding shows why. The natural log of five x is the natural log of five, plus the natural log of x.', show: 'm.0', focus: 'm.0' },
        { say: 'The natural log of five is a constant, so its derivative is zero. The derivative is just one over x. Multiplying x by a constant only shifts the log graph up or down, so its slopes do not change.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = \\ln\\left(x^{4}(3x - 2)\\right)$.',
          choices: ['$\\dfrac{4}{x} + \\dfrac{1}{3x - 2}$', '$\\dfrac{1}{x^{4}(3x - 2)}$', '$\\dfrac{4}{x} + \\dfrac{3}{3x - 2}$', '$\\dfrac{1}{x^{4}} + \\dfrac{3}{3x - 2}$'],
          answer: 2,
          working: 'Expand: $y = 4\\ln x + \\ln(3x - 2)$, so $\\dfrac{dy}{dx} = \\dfrac{4}{x} + \\dfrac{3}{3x - 2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals the natural log of x to the fourth, times three x minus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Expand first: four times the natural log of x, plus the natural log of three x minus two. Their derivatives are four over x, and three over three x minus two. Choice A forgets the derivative of the inside, three.', show: 'q.answer' },
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
            '$\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x}$ and $\\dfrac{d}{dx}\\log_a x = \\dfrac{1}{x\\ln a}$.',
            '$\\dfrac{d}{dx}\\ln g(x) = \\dfrac{g\'(x)}{g(x)}$.',
            'Expand logarithms of products, quotients, powers and roots first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative of the natural log of x is one over x, and the derivative of log base "a" of x is one over x times the natural log of "a".', show: 'sum.0' },
        { say: 'With the chain rule, the derivative of the natural log of g of x is g prime of x over g of x.', show: 'sum.1' },
        { say: 'And expand logarithms of products, quotients, powers and roots before you differentiate. In the next part, we use the product and quotient rules with these functions, and model growth. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
