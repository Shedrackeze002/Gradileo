import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, guide, numbers, plane, plot, strip, tag } from './lib/m31-8-graphs.ts';

// The region between y = x² + 2 (upper) and y = x (lower) from x = 0 to x = 2: area 14/3.
const f = (x: number) => x * x + 2;
const lower = (x: number) => x;
const g = plane({ x: [0, 2.5], y: [0, 7], xStep: 0.5, yStep: 1, every: 0, width: 5, height: 5.6 });
const region = figure('reg', [
  g,
  numbers(g, 0.5, 1),
  area(g, { id: 'A', f, lower, from: 0, to: 2, tone: 'brand', shade: 0.3 }),
  strip(g, { id: 's', x: 1.15, w: 0.12, top: f, bottom: lower, tone: 'theta', label: 'f(x) - g(x)', labelY: 2.8 }),
  guide(g, 'x2', [2, 0], [2, 6], 'muted'),
  plot(g, { id: 'f', f, from: 0, to: 2.25, samples: 120 }),
  plot(g, { id: 'g', f: lower, tone: 'opp', samples: 20 }),
  tag(g, 'fn', 1.75, 6.2, 'y = x^2 + 2', 'left', 'brand'),
  tag(g, 'gn', 2.3, 1.75, 'y = x', 'center', 'opp'),
]);

const video: Explainer = {
  id: 'm31-9-1',
  lessonId: 'm31-9-1',
  title: 'Area Between Curves, Part 1: Upper Curve Minus Lower Curve',
  thumbnailTitle: 'Upper Curve Minus Lower Curve',
  thumbnail: 'reg',
  summary: 'A thin vertical strip between two curves has height f(x) − g(x), so adding the strips gives A = ∫ₐᵇ [f(x) − g(x)] dx, the upper curve minus the lower curve, wherever the curves lie. For y = x² + 2 and y = x on [0, 2], the parabola is on top, and A = ∫₀² (x² − x + 2) dx = 14/3 ≈ 4.67 square units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 1', title: 'Area Between Curves', subtitle: 'Upper curve minus lower curve' }],
      lines: [
        { say: 'The area between a revenue curve and a cost curve is a total profit. The area between the profiles of two riverbanks is a cross-section of the channel.', show: 'title' },
        { say: 'Each is an area between two curves, and one idea finds them all: add up the heights of thin strips with a definite integral. In this video, you will see how.' },
      ],
    },
    {
      chapter: 'A thin strip',
      layout: 'split',
      leftWidth: 560,
      left: [region],
      right: [
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'A thin vertical strip at $x$ has height $f(x) - g(x)$ and width $\\Delta x$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\big[f(x) - g(x)\\big]\\,\\Delta x', '\\sum \\big[f(x_i) - g(x_i)\\big]\\,\\Delta x', '\\longrightarrow\\; \\int_a^b \\big[f(x) - g(x)\\big]\\,dx'] },
      ],
      lines: [
        { say: 'Here are two curves: y equals x squared plus two, on top, and y equals x, below it, from x equals zero to x equals two. What is the area of the region between them?', show: ['reg.grid', 'reg.axes', 'reg.f', 'reg.g', 'reg.fn', 'reg.gn', 'reg.x2', 'reg.A'] },
        { say: 'Cut the region into thin vertical strips. A strip at x reaches from the lower curve, g of x, up to the upper curve, f of x. So its height is f of x minus g of x, and its width is delta x.', show: ['reg.s', 't'], focus: 'reg.s' },
        { say: 'Its area is about f of x minus g of x, times delta x.', show: 'm.0', focus: 'm.0' },
        { say: 'Add up all the strips, and let delta x go to zero. Just like the Riemann sums before, the sum becomes a definite integral: the integral from "a" to b of f of x minus g of x, d x.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Upper minus lower',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Area between curves', md: 'If $f(x) \\ge g(x)$ for $a \\le x \\le b$, the area of the region between the curves is' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = \\int_a^b \\big[f(x) - g(x)\\big]\\,dx', '= \\int_a^b \\big[(\\text{upper curve}) - (\\text{lower curve})\\big]\\,dx'] },
        { kind: 'text', id: 't', size: 'md', md: 'This works wherever the curves lie, above or below the $x$-axis: only their **difference** matters.' },
      ],
      lines: [
        { say: 'So if f of x is greater than or equal to g of x, from "a" to b, the area between the curves is the integral of f of x minus g of x. In words: the upper curve, minus the lower curve.', show: ['def', 'm.0', 'm.1'] },
        { say: 'When both curves are above the x-axis, this is the area under the upper curve, minus the area under the lower one, which makes sense.', focus: 'm.0' },
        { say: 'But it works wherever the curves lie, even below the axis. Slide both curves down by ten, and every strip keeps the same height, because the difference f minus g does not change. Only the difference matters.', show: 't' },
      ],
    },
    {
      chapter: 'Which curve is on top?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Find the area of the region bounded by $y = x^2 + 2$, $y = x$, $x = 0$ and $x = 2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(x^2 + 2) - x = \\left(x - \\tfrac{1}{2}\\right)^2 + \\tfrac{7}{4} > 0'] },
      ],
      lines: [
        { say: 'Now find the area exactly. The region is bounded by y equals x squared plus two, y equals x, and the vertical lines x equals zero and x equals two.', show: 'p' },
        { say: 'First, which curve is on top? Subtract: x squared plus two, minus x. Completing the square, that is, x minus one half, squared, plus seven quarters. A square is never negative, so this is always positive. The parabola is always above the line.', show: 'm.0', focus: 'm.0' },
        { say: 'A quicker check is to test one point. At x equals one, the parabola gives three and the line gives one. The parabola is on top.' },
      ],
    },
    {
      chapter: 'The integral',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['A = \\int_0^2 \\big[(x^2 + 2) - x\\big]\\,dx', '= \\Big[\\dfrac{x^3}{3} - \\dfrac{x^2}{2} + 2x\\Big]_0^2', '= \\left(\\dfrac{8}{3} - 2 + 4\\right) - 0 = \\dfrac{14}{3} \\approx 4.67'],
        },
      ],
      lines: [
        { say: 'So the area is the integral from zero to two of, x squared plus two, minus x, d x.', show: 'm.0', focus: 'm.0' },
        { say: 'An antiderivative is x cubed over three, minus x squared over two, plus two x.', show: 'm.1', focus: 'm.1' },
        { say: 'At two, that is eight thirds, minus two, plus four. At zero, it is zero. So the area is fourteen thirds: about 4.67 square units.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it another way. The area under the parabola alone is twenty thirds, and the area under the line alone is a triangle of area two. Twenty thirds minus two is fourteen thirds.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the area of the region between $y = x^2 + 4$ and $y = 2x$ from $x = 0$ to $x = 3$.',
          choices: ['$21$', '$30$', '$-12$', '$12$'],
          answer: 3,
          working: '$x^2 + 4 - 2x = (x - 1)^2 + 3 > 0$, so the parabola is on top: $\\int_0^3 (x^2 - 2x + 4)\\,dx = \\Big[\\dfrac{x^3}{3} - x^2 + 4x\\Big]_0^3 = 9 - 9 + 12 = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the area of the region between y equals x squared plus four, and y equals two x, from x equals zero to x equals three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twelve. The parabola is on top, since x squared minus two x plus four is, x minus one, squared, plus three. The integral from zero to three of x squared minus two x plus four is nine, minus nine, plus twelve: twelve.', show: 'q.answer' },
        { say: 'Choice A, 21, is the area under the upper curve alone. The area under the line, nine, still has to be taken away.' },
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
          items: ['A thin vertical strip has height (upper) $-$ (lower) and width $\\Delta x$.', 'Area between curves: $A = \\int_a^b \\big[f(x) - g(x)\\big]\\,dx$, where $f \\ge g$.', 'It works wherever the curves lie: only the difference matters.', 'Test a point to see which curve is on top.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A thin vertical strip between two curves has height upper minus lower, and width delta x.', show: 'sum.0' },
        { say: 'Adding the strips gives the area: the integral of the upper curve minus the lower curve.', show: 'sum.1' },
        { say: 'It works wherever the curves lie, because only their difference matters.', show: 'sum.2' },
        { say: 'And test a point to see which curve is on top. In the next part, the curves themselves mark where the region starts and ends. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
