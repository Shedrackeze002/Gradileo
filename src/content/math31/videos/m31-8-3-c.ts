import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, guide, numbers, plane, plot, rect, tag } from './lib/m31-8-graphs.ts';

// f(x) = x² − 2x on [0, 3]: −4/3 below the axis, 4/3 above, net 0, total 8/3.
const f = (x: number) => x * x - 2 * x;
const n = plane({ x: [0, 3.5], y: [-1.5, 3.5], xStep: 0.5, yStep: 0.5, every: 0, width: 5.5, height: 4.5 });
const netTotal = figure('nt', [
  n,
  numbers(n, 1, 1),
  area(n, { id: 'below', f, from: 0, to: 2, tone: 'bad', shade: 0.4 }),
  area(n, { id: 'above', f, from: 2, to: 3, tone: 'good', shade: 0.4 }),
  plot(n, { id: 'f', f, from: 0, to: 3.5, samples: 160 }),
  tag(n, 'nb', 1, -0.45, '-\\tfrac{4}{3}', 'center', 'ink'),
  tag(n, 'na', 2.74, 0.75, '\\tfrac{4}{3}', 'center', 'ink'),
  tag(n, 'name', 1.3, 2.6, 'y = x^2 - 2x', 'center', 'brand'),
]);

// The average value of x² on [0, 3] is 3: the rectangle 3 high has the same area, 9.
const a = plane({ x: [0, 3.5], y: [0, 9.5], xStep: 0.5, yStep: 1, every: 0, width: 5, height: 5 });
const average = figure('avg', [
  a,
  numbers(a, 1, 3),
  area(a, { id: 'A', f: (x) => x * x, from: 0, to: 3, tone: 'brand', shade: 0.35 }),
  rect(a, { id: 'R', x0: 0, x1: 3, y0: 0, y1: 3, tone: 'theta', shade: 0.15, dashed: true }),
  plot(a, { id: 'f', f: (x) => x * x, from: 0, to: 3.08, samples: 120 }),
  guide(a, 'h', [3.25, 0], [3.25, 3], 'theta', { dashed: false, weight: 3 }),
  tag(a, 'ht', 3.3, 1.5, '3', 'right', 'theta'),
  tag(a, 'name', 2.1, 7.8, 'y = x^2', 'left', 'brand'),
]);

const video: Explainer = {
  id: 'm31-8-3-c',
  lessonId: 'm31-8-3',
  title: 'The Fundamental Theorem of Calculus, Part 3: Net Area, Total Area and Average Value',
  thumbnailTitle: 'Net Area and Average Value',
  thumbnail: 'nt',
  summary: 'For f(x) = x² − 2x on [0, 3] the integral is 0, but the total area is 8/3: split where f(x) = 0 and add the absolute values, −4/3 and 4/3. For a velocity, the integral is the displacement and the total area the distance. The average value of f on [a, b] is the integral divided by b − a: x² on [0, 3] averages 3, and a drone with v(t) = 3t² + 2t averages 6 m/s over the first 2 s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 3', title: 'Net Area and Average Value', subtitle: 'When an integral is not the area' }],
      lines: [
        { say: 'A definite integral counts area below the x-axis as negative. So an integral can be zero, even when there is plenty of area between the graph and the axis.', show: 'title' },
        { say: 'In this video, you will find the total area when a graph crosses the axis, see what that means for motion, and find the average value of a function.' },
      ],
    },
    {
      chapter: 'Net area or total area',
      layout: 'split',
      leftWidth: 560,
      left: [netTotal],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['F(x) = \\tfrac{1}{3}x^3 - x^2', '\\int_0^3 f(x)\\,dx = (9 - 9) - 0 = 0', '\\int_0^2 f(x)\\,dx = \\tfrac{8}{3} - 4 = -\\tfrac{4}{3}', '\\int_2^3 f(x)\\,dx = 0 - \\left(-\\tfrac{4}{3}\\right) = \\tfrac{4}{3}', '\\text{total area} = \\tfrac{4}{3} + \\tfrac{4}{3} = \\tfrac{8}{3}'] },
      ],
      lines: [
        { say: 'Take f of x equals x squared minus two x, from zero to three. Find the definite integral, and the total area between the graph and the x-axis.', show: ['nt.grid', 'nt.axes', 'nt.f', 'nt.name'] },
        { say: 'An antiderivative is one third x cubed, minus x squared. At three, that is nine minus nine, which is zero, and at zero it is zero. So the integral is zero!', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'But the graph clearly encloses some area. The trouble is that it crosses the axis. x squared minus two x is x times, x minus two, which is zero at x equals two. So split the interval there.', show: ['nt.below', 'nt.above'] },
        { say: 'From zero to two, the integral is eight thirds minus four, which is negative four thirds. That piece is below the axis.', show: ['m.2', 'nt.nb'], focus: ['m.2', 'nt.below'] },
        { say: 'From two to three, it is zero, minus negative four thirds: positive four thirds. The two pieces cancel, which is why the integral was zero.', show: ['m.3', 'nt.na'], focus: ['m.3', 'nt.above'] },
        { say: 'Area is never negative, so add their sizes: four thirds plus four thirds. The total area is eight thirds square units.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Displacement and distance',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'For a velocity', md: 'The integral of a velocity is the **displacement**: the net change in position. The total area is the total **distance** travelled.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Total area', md: 'Split the interval where $f(x) = 0$, integrate each piece, and add the absolute values.' },
      ],
      lines: [
        { say: 'This difference matters for motion. If f is a velocity, the integral is the displacement: how far you end up from where you started. Moving backwards counts as negative.', show: 'key' },
        { say: 'The total area is the total distance travelled, forwards and backwards. Someone who walks four thirds of a kilometre out and four thirds back has a displacement of zero, but has walked eight thirds of a kilometre.' },
        { say: 'So to find a total area, split the interval wherever f of x is zero, integrate each piece, and add up their absolute values.', show: 'tip' },
      ],
    },
    {
      chapter: 'Average value',
      layout: 'split',
      leftWidth: 520,
      left: [average],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Average value', md: '$f_{\\text{avg}} = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\int_0^3 x^2\\,dx = \\Big[\\tfrac{x^3}{3}\\Big]_0^3 = 9', 'f_{\\text{avg}} = \\dfrac{9}{3 - 0} = 3'] },
      ],
      lines: [
        { say: 'An integral also gives the average value of a function. The average value of f, from "a" to b, is one over b minus "a", times the integral from "a" to b of f.', show: 'def' },
        { say: 'Here is why. Take y equals x squared, from zero to three. The area under it is the integral, which is x cubed over three, from zero to three: nine.', show: ['avg.grid', 'avg.axes', 'avg.f', 'avg.name', 'avg.A', 'm.0'], focus: ['avg.A', 'm.0'] },
        { say: 'Divide by the width, three, and the average value is three.', show: 'm.1', focus: 'm.1' },
        { say: 'That is the height of a rectangle, three wide, with the same area as the region under the curve. Where the curve is above the rectangle, it makes up for where it is below.', show: ['avg.R', 'avg.h', 'avg.ht'], focus: 'avg.R' },
      ],
    },
    {
      chapter: 'Average velocity',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A drone’s velocity is $v(t) = 3t^2 + 2t$ m/s, $t$ seconds after take-off. Find its average velocity over the first $2$ s.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int_0^2 (3t^2 + 2t)\\,dt = \\Big[t^3 + t^2\\Big]_0^2 = 8 + 4 = 12', 'v_{\\text{avg}} = \\dfrac{12}{2 - 0} = 6\\text{ m/s}'] },
      ],
      lines: [
        { say: 'A drone’s velocity is v of t equals three t squared plus two t, metres per second, t seconds after take-off. Find its average velocity over the first two seconds.', show: 'p' },
        { say: 'The integral from zero to two of the velocity is t cubed plus t squared, from zero to two: eight plus four, which is twelve. The velocity is never negative here, so the drone travels twelve metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the time, two seconds. The average velocity is six metres per second: the steady speed that would cover the same twelve metres in the same two seconds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the average value of $f(x) = 3x^2$ on $[0, 2]$.',
          choices: ['$8$', '$4$', '$6$', '$12$'],
          answer: 1,
          working: '$\\int_0^2 3x^2\\,dx = \\Big[x^3\\Big]_0^2 = 8$, and $f_{\\text{avg}} = \\dfrac{8}{2 - 0} = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the average value of f of x equals three x squared, from zero to two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four. The integral from zero to two of three x squared is x cubed, from zero to two, which is eight. Divide by the width, two, and the average value is four.', show: 'q.answer' },
        { say: 'Choice A, eight, is the integral itself: you still need to divide by the width. And choice C, six, averages only the two end values, zero and twelve.' },
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
          items: ['An integral is a net area: pieces below the axis cancel pieces above.', 'For the total area, split where $f(x) = 0$ and add the absolute values.', 'Velocity: the integral is the displacement; the total area is the distance.', 'Average value: $f_{\\text{avg}} = \\dfrac{1}{b - a}\\int_a^b f(x)\\,dx$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An integral is a net area, so pieces below the axis cancel pieces above it.', show: 'sum.0' },
        { say: 'For the total area, split where f of x is zero, and add the absolute values of the pieces.', show: 'sum.1' },
        { say: 'For a velocity, the integral is the displacement, and the total area is the distance travelled.', show: 'sum.2' },
        { say: 'And the average value is the integral divided by the width of the interval. In the next lesson, we learn substitution: the chain rule, run backwards. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
