import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, dots, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// y = x³ and y = x cross at −1, 0 and 1: two regions of area 1/4 each.
const cube = (x: number) => x ** 3;
const line = (x: number) => x;
const g = plane({ x: [-1.5, 1.5], y: [-1.5, 1.5], xStep: 0.5, yStep: 0.5, every: 0, width: 5, height: 5 });
const twoRegions = figure('two', [
  g,
  numbers(g, 0.5, 0.5),
  area(g, { id: 'L', f: cube, lower: line, from: -1, to: 0, tone: 'adj', shade: 0.4 }),
  area(g, { id: 'R', f: line, lower: cube, from: 0, to: 1, tone: 'good', shade: 0.4 }),
  plot(g, { id: 'c', f: cube, tone: 'opp', samples: 160 }),
  plot(g, { id: 'l', f: line, samples: 20 }),
  tag(g, 'Lt', -0.62, -0.38, '\\tfrac{1}{4}', 'center', 'ink'),
  tag(g, 'Rt', 0.62, 0.38, '\\tfrac{1}{4}', 'center', 'ink'),
  tag(g, 'cn', -1.0, -1.4, 'y = x^3', 'right', 'opp'),
  tag(g, 'ln', 1.25, 0.6, 'y = x', 'center', 'brand'),
  dots(g, [
    { id: 'm1', x: -1, y: -1, tex: '', tone: 'theta', group: 'meet' },
    { id: 'm0', x: 0, y: 0, tex: '', tone: 'theta', group: 'meet' },
    { id: 'm2', x: 1, y: 1, tex: '', tone: 'theta', group: 'meet' },
  ]),
]);

const video: Explainer = {
  id: 'm31-9-1-c',
  lessonId: 'm31-9-1',
  title: 'Area Between Curves, Part 3: When the Curves Cross',
  thumbnailTitle: 'When the Curves Cross',
  thumbnail: 'two',
  summary: 'If two curves cross inside the interval, the upper curve changes, so split at each crossing and integrate (upper − lower) on each piece: A = ∫ |f(x) − g(x)| dx. y = x³ and y = x meet at x = −1, 0 and 1; x³ is on top on [−1, 0] and x on [0, 1], each region has area 1/4, and the total is 1/2, while ∫₋₁¹ (x³ − x) dx = 0 because the regions cancel.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 3', title: 'When the Curves Cross', subtitle: 'Split at each crossing' }],
      lines: [
        { say: 'Sometimes two curves cross each other in the middle of a region. Then the curve that was on top is suddenly underneath.', show: 'title' },
        { say: 'In this video, you will find where the upper curve changes, split the area into pieces, and see why a single integral can give an area of zero.' },
      ],
    },
    {
      chapter: 'Two regions',
      layout: 'split',
      leftWidth: 540,
      left: [twoRegions],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^3 = x', 'x^3 - x = x(x - 1)(x + 1) = 0', 'x = -1,\\ 0,\\ 1'] },
      ],
      lines: [
        { say: 'Find the total area enclosed by y equals x cubed and y equals x.', show: ['two.grid', 'two.axes', 'two.c', 'two.l', 'two.cn', 'two.ln'] },
        { say: 'Set them equal: x cubed equals x. Then x cubed minus x is zero, which factors as x, times x minus one, times x plus one.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So the curves meet three times: at x equals negative one, zero and one. They enclose two separate regions.', show: ['m.2', 'two.meet', 'two.L', 'two.R'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Split at the crossing',
      layout: 'split',
      leftWidth: 540,
      left: [twoRegions],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -\\tfrac{1}{2}\\colon \\quad {-\\tfrac{1}{8}} > -\\tfrac{1}{2}', '\\int_{-1}^{0} (x^3 - x)\\,dx = \\tfrac{1}{4}', '\\int_0^1 (x - x^3)\\,dx = \\tfrac{1}{2} - \\tfrac{1}{4} = \\tfrac{1}{4}', 'A = \\tfrac{1}{4} + \\tfrac{1}{4} = \\tfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Which curve is on top changes at the crossing. On the left piece, test x equals negative one half. x cubed is negative one eighth, and x is negative one half. Negative one eighth is bigger, so x cubed is on top there.', show: ['two', 'm.0'], focus: ['m.0', 'two.L'] },
        { say: 'So on the left piece, integrate x cubed minus x, from negative one to zero. The antiderivative is x to the fourth over four, minus x squared over two. At zero it is zero, and at negative one it is one quarter minus one half: negative one quarter. Zero minus negative one quarter is one quarter.', show: 'm.1', focus: ['m.1', 'two.L'] },
        { say: 'On the right piece, x is on top. The integral from zero to one of x minus x cubed is one half minus one quarter: one quarter.', show: 'm.2', focus: ['m.2', 'two.R'] },
        { say: 'So the total area is one quarter plus one quarter: one half square unit. In one formula: the integral of the absolute value of f minus g.', show: ['m.3', 'two.Lt', 'two.Rt'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Areas cancelling', md: '$\\int_{-1}^{1} (x^3 - x)\\,dx = 0$, because the two regions cancel, yet the region clearly has area. Area is never negative: split at the crossings and add the pieces.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int_{-1}^{1} (x^3 - x)\\,dx = \\tfrac{1}{4} + \\left(-\\tfrac{1}{4}\\right) = \\bad{0}'] },
      ],
      lines: [
        { say: 'Here is the trap. What if you integrate x cubed minus x straight across, from negative one to one?', show: 'oops' },
        { say: 'On the left piece, x cubed minus x is positive, and gives one quarter. On the right piece, it is negative, and gives negative one quarter. They cancel, and the integral is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'But the region clearly has area. Area is never negative, so always split at the crossings, make each piece upper minus lower, and add.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the total area enclosed by $y = x^3$ and $y = 4x$.',
          choices: ['$0$', '$4$', '$16$', '$8$'],
          answer: 3,
          working: '$x^3 = 4x$ gives $x = -2, 0, 2$. $\\int_0^2 (4x - x^3)\\,dx = 8 - 4 = 4$, and the left region also has area $4$, so the total is $8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the total area enclosed by y equals x cubed and y equals four x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eight. x cubed equals four x when x is negative two, zero or two. On the right piece, four x is on top, and the integral from zero to two of four x minus x cubed is eight minus four: four. The left piece is its mirror image, also four. So the total is eight.', show: 'q.answer' },
        { say: 'Choice A, zero, integrates straight across from negative two to two, and the two regions cancel.' },
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
          items: ['If the curves cross inside the interval, the upper curve changes.', 'Split at each crossing, and integrate (upper) $-$ (lower) on each piece.', 'Add the pieces: $A = \\int_a^b |f(x) - g(x)|\\,dx$.', 'One integral straight across can cancel to zero.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If the curves cross inside the interval, the upper curve changes.', show: 'sum.0' },
        { say: 'Split at each crossing, and integrate upper minus lower on each piece.', show: 'sum.1' },
        { say: 'Then add the pieces. In one formula, the area is the integral of the absolute value of f minus g.', show: 'sum.2' },
        { say: 'And remember that one integral straight across can cancel to zero. In the next part, we slice a region sideways, and integrate with respect to y. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
