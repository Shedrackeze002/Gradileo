import type { Explainer } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, panels, plane, plot, tag } from './lib/m31-3-graphs.ts';

// y = |x|: a corner at the origin, with slope −1 on the left and 1 on the right.
const ga = plane({ x: [-3, 3], y: [-1, 3], every: 0 });
const corner = figure('co', [
  ga,
  numbers(ga, 1, 1),
  plot(ga, { id: 'f', f: Math.abs, tone: 'adj', samples: 200 }),
  tag(ga, 'l', -2.1, 0.55, '\\text{slope } {-1}', 'center', 'opp'),
  tag(ga, 'r', 2.1, 0.55, '\\text{slope } 1', 'center', 'theta'),
  dots(ga, [{ id: 'O', x: 0, y: 0, tone: 'bad' }]),
]);

// y = ∛x: a vertical tangent at the origin (the y-axis).
const gb = plane({ x: [-3, 3], y: [-2, 2], every: 0 });
const vertical = figure('vt', [
  gb,
  numbers(gb, 1, 1),
  plot(gb, { id: 'f', f: Math.cbrt, tone: 'adj', samples: 400 }),
  guide(gb, 'tan', [0, -2], [0, 2], 'good', { dashed: false, weight: 4 }),
  tag(gb, 'tan-t', -0.15, 1.6, '\\text{vertical tangent}', 'left', 'good'),
  dots(gb, [{ id: 'O', x: 0, y: 0, tone: 'bad' }]),
]);

// The three kinds of point with no derivative, side by side.
const jumpPieces = (g: Plane) => [
  plot(g, { id: 'f1', f: (x) => 0.5 * x - 1, from: -2, to: 0, tone: 'adj' }),
  plot(g, { id: 'f2', f: (x) => 0.5 * x + 1, from: 0, to: 2, tone: 'adj' }),
  dots(g, [
    { id: 'a', x: 0, y: -1, tone: 'adj', open: true },
    { id: 'b', x: 0, y: 1, tone: 'adj' },
  ]),
];
const three = figure(
  'th',
  [
    panels({
      x: [-2, 2],
      y: [-2, 2],
      size: 4,
      gap: 5.4,
      list: [
        { name: 'p1', f: Math.abs, caption: 'y = |x|', sub: '\\text{a corner}', subTone: 'bad' },
        { name: 'p2', f: Math.cbrt, caption: 'y = \\sqrt[3]{x}', sub: '\\text{a vertical tangent}', subTone: 'bad' },
        { name: 'p3', caption: '\\text{a jump}', sub: '\\text{a discontinuity}', subTone: 'bad', extra: jumpPieces },
      ],
    }),
  ],
  360,
);

const video: Explainer = {
  id: 'm31-3-2-f',
  lessonId: 'm31-3-2',
  title: 'The Derivative from First Principles, Part 6: Where There Is No Derivative',
  thumbnailTitle: 'Where There Is No Derivative',
  thumbnail: 'co',
  summary: 'A function is not differentiable where its graph has a corner (y = |x| at 0, where the slopes from the left and right are −1 and 1), a vertical tangent (y = ∛x at 0, where the secant slopes grow without bound) or a discontinuity. A differentiable function is continuous, but a continuous function need not be differentiable; and a horizontal tangent is fine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 6', title: 'Where There Is No Derivative', subtitle: 'Corners, vertical tangents and jumps' }],
      lines: [
        { say: 'Most functions you have met so far have a derivative at every point. But some graphs have points where no tangent slope exists at all.', show: 'title' },
        { say: 'In this video, you will see three ways a function can fail to be differentiable, and how being differentiable is linked to being continuous.' },
      ],
    },
    {
      chapter: 'A corner',
      layout: 'split',
      leftWidth: 560,
      left: [corner],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{f(0 + h) - f(0)}{h} = \\dfrac{|h|}{h}', 'h > 0\\colon\\quad \\dfrac{h}{h} = 1', 'h < 0\\colon\\quad \\dfrac{-h}{h} = -1'] },
        { kind: 'text', id: 't', size: 'md', md: 'The two sides disagree, so the limit does not exist.' },
      ],
      lines: [
        { say: 'Here is the graph of y equals the absolute value of x. It is a V shape, with a sharp corner at the origin.', show: ['co.grid', 'co.axes', 'co.f', 'co.O'] },
        { say: 'To the right of the corner, the graph is the line y equals x, with slope one. To the left, it is y equals negative x, with slope negative one.', show: ['co.l', 'co.r'], focus: ['co.l', 'co.r'] },
        { say: 'Try first principles at x equals zero. The secant slope is f of h minus f of zero, over h, which is the absolute value of h, over h.', show: 'm.0', focus: 'm.0' },
        { say: 'For positive h, that is h over h, which is one. For negative h, the absolute value of h is negative h, so the slope is negative one.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The secant slopes from the two sides approach different numbers, so the limit does not exist. There is no single tangent at a corner, and the function is not differentiable at zero.', show: 't' },
      ],
    },
    {
      chapter: 'A vertical tangent',
      layout: 'split',
      leftWidth: 560,
      left: [vertical],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{\\sqrt[3]{h} - 0}{h} = \\dfrac{1}{\\sqrt[3]{h^2}}', 'h = 0.001\\colon\\quad 100', 'h = 0.000\\,001\\colon\\quad 10\\,000'] },
        { kind: 'text', id: 't', size: 'md', md: 'The slopes grow without bound: a vertical line has no slope.' },
      ],
      lines: [
        { say: 'Here is the graph of y equals the cube root of x. At the origin, it becomes steeper and steeper, until it stands straight up.', show: ['vt.grid', 'vt.axes', 'vt.f', 'vt.O'] },
        { say: 'At x equals zero, the secant slope is the cube root of h, over h, which simplifies to one over the cube root of h squared.', show: 'm.0', focus: 'm.0' },
        { say: 'With h equals 0.001, that is 100. With h equals one millionth, it is 10,000. As h approaches zero, the slopes grow without bound.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The tangent at the origin is vertical: it lies along the y-axis. But a vertical line has no slope, so the function is not differentiable at zero.', show: ['vt.tan', 'vt.tan-t', 't'], focus: 'vt.tan' },
      ],
    },
    {
      chapter: 'Three kinds of failure',
      layout: 'center',
      main: [
        three,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Differentiable means continuous', md: 'If $f$ is differentiable at $a$, then $f$ is continuous at $a$. The reverse is not true: $y = |x|$ is continuous at $0$, but not differentiable there.' },
      ],
      lines: [
        { say: 'So a function is not differentiable at a corner, like the absolute value of x at zero.', show: ['th.p1-grid', 'th.p1-axes', 'th.p1-curve', 'th.p1-text'], focus: 'th.p1-curve' },
        { say: 'It is not differentiable where the tangent is vertical, like the cube root of x at zero.', show: ['th.p2-grid', 'th.p2-axes', 'th.p2-curve', 'th.p2-text'], focus: 'th.p2-curve' },
        { say: 'And it is not differentiable where the graph breaks, at a discontinuity such as a jump. With no single point to draw a tangent through, there is no tangent at all.', show: ['th.p3-grid', 'th.p3-axes', 'th.p3-f1', 'th.p3-f2', 'th.p3-a', 'th.p3-b', 'th.p3-text'], focus: ['th.p3-f1', 'th.p3-f2'] },
        { say: 'In fact, if a function is differentiable at a point, it must be continuous there. But the reverse is not true. The absolute value of x is continuous at zero, with no break at all, and still has no derivative there.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A flat tangent is fine', md: 'A **horizontal** tangent has slope $0$, and the function is differentiable there. It is a **vertical** tangent that has no slope.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = x^2 \\text{ at } x = 0\\colon\\quad \\text{slope } 0 \\quad \\good{\\text{differentiable}}', 'y = \\sqrt[3]{x} \\text{ at } x = 0\\colon\\quad \\text{no slope} \\quad \\bad{\\text{not differentiable}}'] },
      ],
      lines: [
        { say: 'Do not mix up flat and vertical tangents. A horizontal tangent, like the one at the bottom of y equals x squared, has slope zero. Zero is a perfectly good number, so the function is differentiable there.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'It is a vertical tangent that causes trouble, because a vertical line has no slope at all.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which function is **not** differentiable at $x = 0$?',
          choices: ['$y = x^2 + 1$', '$y = |x|$', '$y = x^3$', '$y = 3x - 2$'],
          answer: 1,
          working: 'The graph of $y = |x|$ has a corner at $x = 0$: the slopes from the left and the right are $-1$ and $1$, so no single tangent exists. The other graphs are smooth there.',
        },
      ],
      lines: [
        { say: 'Your turn. Which function is not differentiable at x equals zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The absolute value of x has a corner at zero, where the slopes from the left and the right are negative one and one. Choice C has a flat tangent at zero, with slope zero, so it is differentiable there.', show: 'q.answer' },
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
            'No derivative at a corner, a vertical tangent or a discontinuity.',
            'Differentiable at $a$ means continuous at $a$, but not the other way round.',
            'A horizontal tangent is fine: its slope is $0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A function has no derivative at a corner, at a vertical tangent, or at a discontinuity.', show: 'sum.0' },
        { say: 'A function that is differentiable at a point is continuous there, but a continuous function need not be differentiable.', show: 'sum.1' },
        { say: 'And a horizontal tangent is fine: its slope is zero. In the next lesson, we learn rules that find derivatives in a line or two, with no limits at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
