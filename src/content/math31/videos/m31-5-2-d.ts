import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, num, plane, plot, rename, tangent } from './lib/m31-5-graphs.ts';

// A town of P(t) = 5000e^(0.03t) people, t years from now, and its tangent line at t = 10.
const P = (t: number) => 5000 * Math.exp(0.03 * t);
const town = rename(plane({ x: [0, 30], y: [0, 14000], xStep: 5, yStep: 2000, every: 0, width: 6, height: 5 }), 't', 'P');
const thousands = (v: number) => (v === 0 ? '0' : `${v / 1000}\\,000`);

// y = xe^(−x), with its only horizontal tangent at (1, 1/e).
const h = (x: number) => x * Math.exp(-x);
const g = plane({ x: [-0.5, 5], y: [-0.5, 0.8], xStep: 1, yStep: 0.4, every: 0, width: 6.2, height: 3.4 });

const video: Explainer = {
  id: 'm31-5-2-d',
  lessonId: 'm31-5-2',
  title: 'Derivatives of Exponential and Logarithmic Functions, Part 4: Products, Quotients and Growth',
  thumbnailTitle: 'Exponential Growth Rates',
  thumbnail: 'pt',
  summary: 'The product and quotient rules with eˣ and ln x: xe²ˣ and ln x / x. A town of P(t) = 5000e^(0.03t) people grows at P′(10) = 150e^0.3 ≈ 202 people per year, a rate proportional to its size; and why a factor eᵘ can be divided out when solving f′(x) = 0, as for xe⁻ˣ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 4', title: 'Products, Quotients and Growth', subtitle: 'Exponential and log derivatives at work' }],
      lines: [
        { say: 'Exponential and logarithmic functions often come multiplied or divided by other functions, and they model real growth.', show: 'title' },
        { say: 'In this video, you will use the product and quotient rules with them, find how fast a town is growing, and see why e to any power is never zero.' },
      ],
    },
    {
      chapter: 'A product',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['y = \\adj{x}\\,\\opp{e^{2x}}', '\\frac{dy}{dx} = \\adj{1}\\cdot\\opp{e^{2x}} + \\adj{x}\\cdot\\opp{2e^{2x}}', '= e^{2x}(1 + 2x)'],
        },
      ],
      lines: [
        { say: 'Differentiate y equals x times e to the two x. It is a product, so use the product rule.', show: 'm.0', focus: 'm.0' },
        { say: 'The derivative of x is one, times e to the two x. Plus x, times the derivative of e to the two x, which by the chain rule is two e to the two x.', show: 'm.1', focus: 'm.1' },
        { say: 'Both terms contain e to the two x, so factor it out: e to the two x, times one plus two x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A quotient',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['y = \\dfrac{\\ln x}{x}', '\\frac{dy}{dx} = \\dfrac{\\frac{1}{x}\\cdot x - \\ln x\\cdot 1}{x^{2}}', '= \\dfrac{1 - \\ln x}{x^{2}}'],
        },
      ],
      lines: [
        { say: 'Now differentiate y equals the natural log of x, over x. It is a quotient, so use the quotient rule.', show: 'm.0', focus: 'm.0' },
        { say: 'The bottom, x, times the derivative of the top, one over x. Minus the top, the natural log of x, times the derivative of the bottom, one. All over x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'One over x times x is one. So the derivative is one minus the natural log of x, all over x squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A growing town',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('pt', [
          town,
          edgeNumbers(town, { xs: [0, 10, 20, 30], ys: [0, 4000, 8000, 12000], xTex: num, yTex: thousands }),
          plot(town, { id: 'P', f: P, samples: 200 }),
          tangent(town, { id: 't', a: 10, y: P(10), m: 0.03 * P(10), left: 10, right: 14, tone: 'opp', dot: '' }),
          note(town, { id: 'm', x: 21, y: 6000, tex: '\\text{slope} \\approx 202', tone: 'opp' }),
        ]),
      ],
      right: [
        { kind: 'text', id: 'q', md: 'A town’s population is $P(t) = 5000e^{0.03t}$, $t$ years from now. How fast is it growing after $10$ years?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["P'(t) = 5000(0.03)e^{0.03t}", '= 150e^{0.03t}', "P'(10) = 150e^{0.3} \\approx 202.48"] },
      ],
      lines: [
        { say: 'A town’s population is P of t equals five thousand times e to the 0.03 t, t years from now. How fast is it growing after ten years?', show: ['pt.grid', 'pt.axes', 'pt.P', 'q'] },
        { say: 'By the chain rule, P prime of t is five thousand, times 0.03, times e to the 0.03 t, which is 150 e to the 0.03 t.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'At t equals ten, that is 150 times e to the 0.3, about 202.48. So after ten years, the town is growing by about 202 people per year. That is the slope of the tangent line on the graph.', show: ['m.2', 'pt.t-all', 'pt.m'], focus: ['m.2', 'pt.t'] },
        { say: 'Notice that P prime of t is 0.03 times P of t. The town always grows at three percent of its size per year, so the bigger it gets, the faster it grows.', focus: 'pt.P' },
      ],
    },
    {
      chapter: 'Never zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'e to any power is never zero', md: 'When you solve $f\'(x) = 0$ and the derivative has a factor $e^{u}$, divide it out: $e^{u} > 0$ for every $u$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{d}{dx}\\left(xe^{-x}\\right) = e^{-x} - xe^{-x} = e^{-x}(1 - x) = 0 \\ \\Rightarrow\\ x = 1'] },
        figure('nz', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4, 5], ys: [-0.4, 0, 0.4, 0.8], xTex: num, yTex: num }),
          plot(g, { id: 'f', f: h, samples: 200 }),
          note(g, { id: 'f-t', x: 3.6, y: 0.45, tex: 'y = xe^{-x}', tone: 'brand' }),
          tangent(g, { id: 't', a: 1, y: h(1), m: 0, left: 0.8, right: 0.8, tone: 'theta', dot: '\\left(1, \\tfrac{1}{e}\\right)', place: 'above' }),
        ]),
      ],
      lines: [
        { say: 'One more useful fact. e to any power is positive, so it is never zero. When you solve f prime of x equals zero, and the derivative has a factor of e to some power, you can divide it out.', show: 'tip' },
        { say: 'For example, the derivative of x e to the negative x is e to the negative x, minus x e to the negative x, which factors as e to the negative x, times one minus x.', show: 'm.0', focus: 'm.0' },
        { say: 'e to the negative x is never zero, so the derivative is zero only when one minus x is zero: at x equals one.', show: ['nz.grid', 'nz.axes', 'nz.f', 'nz.f-t'] },
        { say: 'On the graph, that is the only horizontal tangent, at the top of the curve, where the height is one over e.', show: 'nz.t-all', focus: 'nz.t' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Where does $f(x) = xe^{-2x}$ have a horizontal tangent?',
          choices: ['$x = \\dfrac{1}{2}$', '$x = 1$', '$x = 0$', '$x = -\\dfrac{1}{2}$'],
          answer: 0,
          working: "$f'(x) = e^{-2x} - 2xe^{-2x} = e^{-2x}(1 - 2x)$. Since $e^{-2x} > 0$, $f'(x) = 0$ only when $1 - 2x = 0$: $x = \\dfrac{1}{2}$.",
        },
      ],
      lines: [
        { say: 'Your turn. Where does f of x equals x e to the negative two x have a horizontal tangent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. By the product rule, f prime of x is e to the negative two x, minus two x e to the negative two x, which factors as e to the negative two x, times one minus two x.', show: 'q.answer' },
        { say: 'e to any power is never zero, so one minus two x is zero, and x is one half. Choice B forgets the factor of negative two from the chain rule.' },
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
            'Use the product and quotient rules with $e^x$ and $\\ln x$ as with any functions.',
            'Exponential models grow or decay at a rate proportional to their size.',
            'A factor $e^{u}$ is never zero: divide it out when solving $f\'(x) = 0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use the product and quotient rules with e to the x and the natural log of x, just as with any other functions.', show: 'sum.0' },
        { say: 'Exponential models grow, or decay, at a rate proportional to their size.', show: 'sum.1' },
        { say: 'And e to any power is never zero, so you can divide it out when you solve f prime of x equals zero. Next, we differentiate equations that are not solved for y, and differentiate derivatives themselves. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
