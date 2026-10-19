import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { faces, revolveX } from './lib/m31-9-figures.ts';
import { numbers, plane, tag } from './lib/m31-8-graphs.ts';

// A disc and a washer face on.
const rings = figure('fc', [faces({ r: 1.6, R: 1.6, rIn: 0.8, gap: 2.4, labels: { r: 'r', R: 'R', rIn: 'r', disc: '\\pi r^2', washer: '\\pi R^2 - \\pi r^2' } })], 330);

// The region between y = x (outer) and y = x² (inner) on [0, 1], turned about the x-axis: volume 2π/15.
const g = plane({ x: [-0.2, 1.3], y: [-1.15, 1.15], xStep: 0.25, yStep: 0.25, every: 0, width: 4.5, height: 6.9 });
const washer = figure('ws', [
  g,
  numbers(g, 0.5, 0.5),
  revolveX(g, { id: 'V', f: (x) => x, inner: (x) => x * x, from: 0, to: 1, slice: { x: 0.5, R: 'R', r: 'r', Rplace: 'above left', rplace: 'right' } }),
  tag(g, 'fn', 1.05, 1.05, 'y = x', 'right', 'brand'),
  tag(g, 'gn', 1.02, 0.78, 'y = x^2', 'right', 'opp'),
]);

const video: Explainer = {
  id: 'm31-9-2-d',
  lessonId: 'm31-9-2',
  title: 'Volumes of Revolution, Part 4: Washers',
  thumbnailTitle: 'The Washer Method',
  thumbnail: 'ws',
  summary: 'When a region does not touch the axis, each slice is a washer, a disc with a hole, of area πR² − πr², so V = π∫ₐᵇ ([R(x)]² − [r(x)]²) dx. The region between y = x and y = x² turned about the x-axis has R = x and r = x², and V = π∫₀¹ (x² − x⁴) dx = 2π/15 ≈ 0.42. Square each radius separately; about another line, such as y = −1, measure each radius from that line (56π/3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 4', title: 'The Washer Method', subtitle: 'Slices with a hole in the middle' }],
      lines: [
        { say: 'A pipe, a ring and a doughnut all have a hole through the middle. When a region does not touch the axis it turns around, the solid it makes has a hole too.', show: 'title' },
        { say: 'In this video, you will slice such a solid into washers, find its volume, avoid the most common mistake, and turn a region about a different line.' },
      ],
    },
    {
      chapter: 'A disc with a hole',
      layout: 'center',
      main: [rings, { kind: 'text', id: 't', size: 'md', md: 'A **washer** is a disc with a hole. Its area is the outer disc minus the hole: $\\pi R^2 - \\pi r^2$.' }],
      lines: [
        { say: 'On the left is a disc of radius r. Its area is pi r squared.', show: ['fc.disc', 'fc.disc-r', 'fc.disc-cap'] },
        { say: 'On the right is a washer: a disc with a round hole in the middle, like the flat metal ring under a bolt. It has two radii: the outer radius, capital R, and the inner radius, small r.', show: ['fc.washer', 'fc.washer-R', 'fc.washer-r'], focus: ['fc.washer-R', 'fc.washer-r'] },
        { say: 'Its area is the area of the whole disc, minus the area of the hole: pi R squared minus pi r squared.', show: ['fc.washer-cap', 't'], focus: 'fc.washer-cap' },
      ],
    },
    {
      chapter: 'The washer method',
      layout: 'split',
      leftWidth: 540,
      left: [washer],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Washer method', md: '$V = \\pi\\displaystyle\\int_a^b \\Big(\\big[R(x)\\big]^2 - \\big[r(x)\\big]^2\\Big)\\,dx$' },
        { kind: 'text', id: 't', size: 'md', align: 'left', md: '$R(x)$: axis to the **outer** curve. $r(x)$: axis to the **inner** curve.' },
      ],
      lines: [
        { say: 'Take the region between the line y equals x and the parabola y equals x squared, and rotate it about the x-axis.', show: ['ws.grid', 'ws.axes', 'ws.V-curve', 'ws.V-inner', 'ws.V-region', 'ws.fn', 'ws.gn'], focus: 'ws.V-region' },
        { say: 'The region does not touch the axis, except at its ends. So the solid has a hollow inside it: a cone-shaped shell, with a curved hole carved out by the parabola.', show: 'ws.V-solid', focus: 'ws.V-solid' },
        { say: 'Slice it across the axis. Each slice is a washer. Its outer radius, capital R, reaches from the axis to the outer curve, y equals x. Its inner radius, small r, reaches to the inner curve, y equals x squared.', show: ['ws.V-disc', 'ws.V-R', 'ws.V-r'], focus: ['ws.V-R', 'ws.V-r'] },
        { say: 'A washer of thickness delta x has volume pi, times R squared minus r squared, times delta x. Add them up and let delta x go to zero: the volume is pi times the integral of, R squared minus r squared, d x. This is the washer method.', show: ['def', 't'] },
      ],
    },
    {
      chapter: 'Between two curves',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['x = x^2 \\;\\Rightarrow\\; x = 0 \\text{ or } x = 1, \\qquad R = x, \\quad r = x^2', 'V = \\pi\\int_0^1 \\Big[x^2 - \\left(x^2\\right)^2\\Big]\\,dx = \\pi\\int_0^1 (x^2 - x^4)\\,dx', '= \\pi\\Big[\\dfrac{x^3}{3} - \\dfrac{x^5}{5}\\Big]_0^1 = \\pi\\left(\\dfrac{1}{3} - \\dfrac{1}{5}\\right)', 'V = \\dfrac{2\\pi}{15} \\approx 0.42 \\text{ cubic units}'],
        },
      ],
      lines: [
        { say: 'Find the volume. The curves meet where x equals x squared: at x equals zero and x equals one. Between them, x is bigger than x squared, so the outer radius is x and the inner radius is x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'So the volume is pi times the integral from zero to one of, x squared, minus x squared squared, which is x to the fourth.', show: 'm.1', focus: 'm.1' },
        { say: 'An antiderivative is x cubed over three, minus x to the fifth over five. At one, that is one third minus one fifth.', show: 'm.2', focus: 'm.2' },
        { say: 'One third minus one fifth is five fifteenths minus three fifteenths: two fifteenths. So the volume is two pi over fifteen, about 0.42 cubic units.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square each radius separately', md: 'The washer’s area is $\\pi(R^2 - r^2)$, **not** $\\pi(R - r)^2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = \\tfrac{1}{2}\\colon \\quad R = \\tfrac{1}{2}, \\quad r = \\tfrac{1}{4}', '\\pi\\left(\\tfrac{1}{4} - \\tfrac{1}{16}\\right) = \\dfrac{3\\pi}{16} \\;\\good{\\checkmark} \\qquad \\bad{\\pi\\left(\\tfrac{1}{2} - \\tfrac{1}{4}\\right)^2 = \\dfrac{\\pi}{16}}'] },
      ],
      lines: [
        { say: 'A common mistake is to subtract the radii first, then square. The washer’s area is pi times, R squared minus r squared. It is not pi times, R minus r, squared.', show: 'oops' },
        { say: 'At x equals one half, R is one half and r is one quarter.', show: 'm.0', focus: 'm.0' },
        { say: 'The true area is pi times, one quarter minus one sixteenth, which is three pi over sixteen. Subtracting first gives pi times one quarter squared: only pi over sixteen, a third of the true area. So square each radius separately.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Another axis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Another axis', md: 'To rotate about another line, measure each radius **from that line**.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{about } y = -1\\colon \\quad R = \\sqrt{x} + 1, \\quad r = 1', 'V = \\pi\\int_0^4 \\Big[\\left(\\sqrt{x} + 1\\right)^2 - 1^2\\Big]\\,dx = \\pi\\int_0^4 \\left(x + 2\\sqrt{x}\\right)dx', '= \\pi\\left(8 + \\dfrac{32}{3}\\right) = \\dfrac{56\\pi}{3}'],
        },
      ],
      lines: [
        { say: 'The axis does not have to be the x-axis. To rotate about another line, measure each radius from that line.', show: 'tip' },
        { say: 'Rotate the region under y equals root x, from zero to four, about the line y equals negative one. The region sits one unit above that line, so the slices are washers. The outer radius reaches from y equals negative one up to the curve: root x plus one. The inner radius reaches up to the x-axis: one.', show: 'm.0', focus: 'm.0' },
        { say: 'So the volume is pi times the integral from zero to four of, root x plus one, squared, minus one squared. Expand: root x plus one, squared, is x plus two root x plus one, and the ones cancel, leaving x plus two root x.', show: 'm.1', focus: 'm.1' },
        { say: 'The integral of x from zero to four is eight, and the integral of two root x is four thirds x to the three halves, which is thirty-two thirds. So the volume is pi times, eight plus thirty-two thirds: fifty-six pi over three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The region between $y = 2x$ and $y = x^2$ is rotated about the $x$-axis. Find the volume.',
          choices: ['$\\dfrac{16\\pi}{15}$', '$\\dfrac{32\\pi}{3}$', '$\\dfrac{4\\pi}{3}$', '$\\dfrac{64\\pi}{15}$'],
          answer: 3,
          working: 'They meet at $x = 0$ and $x = 2$, with $R = 2x$ and $r = x^2$: $\\pi\\int_0^2 (4x^2 - x^4)\\,dx = \\pi\\left(\\dfrac{32}{3} - \\dfrac{32}{5}\\right) = \\dfrac{64\\pi}{15}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The region between y equals two x and y equals x squared is rotated about the x-axis. Find the volume. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 64 pi over fifteen. The curves meet at x equals zero and two, and two x is the outer curve. So the volume is pi times the integral from zero to two of, four x squared, minus x to the fourth: pi times, 32 thirds minus 32 fifths, which is 64 pi over fifteen.', show: 'q.answer' },
        { say: 'Choice A squares the difference of the radii: the mistake from this video.' },
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
          items: ['A region away from the axis makes washers: discs with a hole.', 'Washer method: $V = \\pi\\int_a^b \\Big(\\big[R(x)\\big]^2 - \\big[r(x)\\big]^2\\Big)\\,dx$.', 'Square each radius separately.', 'About another line, measure each radius from that line.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When a region does not touch the axis, each slice is a washer: a disc with a hole.', show: 'sum.0' },
        { say: 'The washer method gives the volume as pi times the integral of, R squared minus r squared.', show: 'sum.1' },
        { say: 'Square each radius separately, before you subtract.', show: 'sum.2' },
        { say: 'And about any other line, measure each radius from that line. Give exact answers in terms of pi, or round only at the end. Thanks for watching!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
