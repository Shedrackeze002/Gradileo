import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, num, plane, plot, tangent } from './lib/m31-5-graphs.ts';

const E = Math.E;

// y = eˣ with its tangent lines at (0, 1), slope 1, and at (1, e), slope e.
const g = plane({ x: [-3, 2], y: [-1, 7], xStep: 1, yStep: 1, every: 0, width: 5, height: 8 });

const video: Explainer = {
  id: 'm31-5-2',
  lessonId: 'm31-5-2',
  title: 'Derivatives of Exponential and Logarithmic Functions, Part 1: The Number e',
  thumbnailTitle: 'The Derivative of $e^x$',
  thumbnail: 'ex',
  summary: 'The derivative of aˣ is aˣ times a constant, the slope of y = aˣ at x = 0: about 0.693 for base 2 and 1.099 for base 3. The number e ≈ 2.71828 makes that constant exactly 1, so the derivative of eˣ is eˣ: its slope equals its height. Then eˣ with the chain rule: 4eˣ − x³, e⁻³ˣ and e^(x² + 1).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 1', title: 'The Number e', subtitle: 'The function that is its own derivative' }],
      lines: [
        { say: 'Populations, investments, radioactive samples and cooling cups of coffee all change at a rate that depends on their size: the bigger they are, the faster they change.', show: 'title' },
        { say: 'The function that models them, e to the x, has a remarkable property: it is its own derivative. In this video, you will see where the number e comes from, and why that is true.' },
      ],
    },
    {
      chapter: 'The slope of a to the x',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\frac{d}{dx}a^{x} = \\lim_{h \\to 0}\\frac{a^{x + h} - a^{x}}{h}',
            '= \\lim_{h \\to 0}\\frac{a^{x}a^{h} - a^{x}}{h}',
            '= a^{x}\\cdot\\adj{\\lim_{h \\to 0}\\frac{a^{h} - 1}{h}}',
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A constant', md: 'The derivative of $a^x$ is $a^x$ times a constant: the slope of $y = a^x$ at $x = 0$.' },
      ],
      lines: [
        { say: 'Take any positive base "a", and use the definition of the derivative on "a" to the x: "a" to the x plus h, minus "a" to the x, all over h.', show: 'm.0', focus: 'm.0' },
        { say: 'By the laws of exponents, "a" to the x plus h is "a" to the x times "a" to the h.', show: 'm.1', focus: 'm.1' },
        { say: 'Now "a" to the x does not depend on h, so it factors out of the limit. What is left, in blue, is the limit of "a" to the h minus one, over h. That is just a number.', show: 'm.2', focus: 'm.2' },
        { say: 'So the derivative of "a" to the x is "a" to the x, times a constant. And at x equals zero, "a" to the zero is one, so that constant is the slope of the graph at x equals zero.', show: 'key' },
      ],
    },
    {
      chapter: 'Estimating the constant',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['$h$', '$\\dfrac{2^h - 1}{h}$', '$\\dfrac{3^h - 1}{h}$', '$\\dfrac{e^h - 1}{h}$'],
          rows: [
            ['$0.1$', '$0.717735$', '$1.161232$', '$1.051709$'],
            ['$0.01$', '$0.695555$', '$1.104669$', '$1.005017$'],
            ['$0.001$', '$0.693387$', '$1.099216$', '$1.000500$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{base } 2\\colon\\ \\approx 0.693 \\qquad \\text{base } 3\\colon\\ \\approx 1.099 \\qquad \\text{base } e\\colon\\ 1'] },
      ],
      lines: [
        { say: 'A table estimates that constant for three bases, as h gets smaller and smaller.', show: 't' },
        { say: 'For base two, the values close in on about 0.693. So the slope of y equals two to the x at x equals zero is a little less than one.', focus: 't', show: 'm' },
        { say: 'For base three, they close in on about 1.099, a little more than one.' },
        { say: 'So somewhere between two and three, there is a base that makes the constant exactly one. That base is the number e, about 2.71828. In the last column, the values close in on exactly one.' },
      ],
    },
    {
      chapter: 'The number e',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The number e', md: '$e \\approx 2.71828$ is the number for which $\\displaystyle\\lim_{h \\to 0}\\frac{e^h - 1}{h} = 1$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\frac{d}{dx}e^{x} = e^{x}'] },
      ],
      lines: [
        { say: 'The number e, about 2.71828, is the base for which the limit of e to the h minus one, over h, is exactly one.', show: 'def' },
        { say: 'So the derivative of e to the x is e to the x, times one. The derivative of e to the x is e to the x itself.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Slope equals height',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('ex', [
          g,
          edgeNumbers(g, { xs: [-3, -2, -1, 0, 1, 2], ys: [-1, 0, 1, 2, 3, 4, 5, 6, 7], xTex: num, yTex: num }),
          plot(g, { id: 'e', f: Math.exp, samples: 200 }),
          note(g, { id: 'e-t', x: -1.3, y: 5.6, tex: 'y = e^{x}', tone: 'brand' }),
          tangent(g, { id: 't0', a: 0, y: 1, m: 1, left: 2, right: 0.9, tone: 'theta', dot: '(0, 1)', place: 'above left' }),
          tangent(g, { id: 't1', a: 1, y: E, m: E, left: 1.3, right: 0.95, tone: 'opp', dot: '(1, e)', place: 'below right' }),
        ]),
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['At $(0, 1)$: height $1$, slope $\\thc{1}$.', 'At $(1, e)$: height $e$, slope $\\opp{e} \\approx 2.72$.', 'At every point, the slope of $y = e^x$ equals its height.'],
        },
      ],
      lines: [
        { say: 'Here is what that means on the graph of y equals e to the x.', show: ['ex.grid', 'ex.axes', 'ex.e', 'ex.e-t'] },
        { say: 'At x equals zero, the height is one, and the tangent line has slope one.', show: ['ex.t0-all', 'b.0'], focus: ['ex.t0', 'b.0'] },
        { say: 'At x equals one, the height is e, about 2.72, and the tangent line is steeper, with slope e.', show: ['ex.t1-all', 'b.1'], focus: ['ex.t1', 'b.1'] },
        { say: 'At every point, the slope of the curve equals its height. The higher the curve gets, the faster it climbs. That is exactly the kind of growth where a quantity changes at a rate that depends on its size.', show: 'b.2', focus: ['b.2', 'ex.e'] },
      ],
    },
    {
      chapter: 'With the chain rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Chain rule with e', md: '$\\dfrac{d}{dx}e^{g(x)} = e^{g(x)}\\cdot g\'(x)$: keep the power, then multiply by its derivative.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{(a)}\\ \\ \\frac{d}{dx}\\left(4e^{x} - x^{3}\\right) = 4e^{x} - 3x^{2}',
            '\\text{(b)}\\ \\ \\frac{d}{dx}e^{\\adj{-3x}} = e^{-3x}\\cdot\\opp{(-3)} = -3e^{-3x}',
            '\\text{(c)}\\ \\ \\frac{d}{dx}e^{\\adj{x^{2} + 1}} = e^{x^{2} + 1}\\cdot\\opp{2x} = 2xe^{x^{2} + 1}',
          ],
        },
      ],
      lines: [
        { say: 'When the power is not plain x, use the chain rule. The derivative of e to the g of x is e to the g of x, times g prime of x. Keep the power as it is, then multiply by its derivative.', show: 'rule' },
        { say: 'First, differentiate four e to the x, minus x cubed. Term by term: four e to the x stays four e to the x, and x cubed gives three x squared. So the derivative is four e to the x, minus three x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, e to the negative three x. The power, in blue, is negative three x, with derivative negative three. So the derivative is negative three e to the negative three x.', show: 'm.1', focus: 'm.1' },
        { say: 'Last, e to the power of x squared plus one. The derivative of the power is two x. So the derivative is two x, times e to the power of x squared plus one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = e^{5x^{2}}$.',
          choices: ['$e^{10x}$', '$5x^{2}e^{5x^{2} - 1}$', '$10xe^{10x}$', '$10xe^{5x^{2}}$'],
          answer: 3,
          working: 'The power is $5x^{2}$, with derivative $10x$: $\\dfrac{dy}{dx} = e^{5x^{2}}\\cdot 10x = 10xe^{5x^{2}}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals e to the power of five x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Keep e to the power of five x squared as it is, and multiply by the derivative of the power, ten x. Choice B uses the power rule, which does not apply when x is in the exponent.', show: 'q.answer' },
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
            'The derivative of $a^x$ is $a^x$ times its slope at $x = 0$.',
            '$e \\approx 2.71828$ makes that slope exactly $1$, so $\\dfrac{d}{dx}e^{x} = e^{x}$.',
            'Chain rule: $\\dfrac{d}{dx}e^{g(x)} = e^{g(x)}\\,g\'(x)$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative of "a" to the x is "a" to the x, times the slope of its graph at x equals zero.', show: 'sum.0' },
        { say: 'The number e, about 2.71828, makes that slope exactly one, so the derivative of e to the x is e to the x.', show: 'sum.1' },
        { say: 'And with the chain rule, the derivative of e to the g of x is e to the g of x, times g prime of x. In the next part, we find the derivative of "a" to the x for any base. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
