import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tangent } from './lib/m31-3-graphs.ts';

// f(x) = x³ − 3x + 1, with horizontal tangents at (−1, 3) and (1, −1).
const f = (x: number) => x ** 3 - 3 * x + 1;
const g = plane({ x: [-2.5, 2.5], y: [-3, 5], xStep: 0.5, yStep: 1, every: 0, width: 6, height: 6.4 });
const flat = figure('ht', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'f', f, tone: 'adj', samples: 300 }),
  tangent(g, { id: 'tA', at: [-1, 3], m: 0, ext: 0.8, group: 'A' }),
  tangent(g, { id: 'tB', at: [1, -1], m: 0, ext: 0.8, group: 'B' }),
  dots(g, [
    { id: 'pA', x: -1, y: 3, tex: '(-1, 3)', tone: 'good', place: 'above', group: 'A' },
    { id: 'pB', x: 1, y: -1, tex: '(1, -1)', tone: 'good', place: 'below', group: 'B' },
  ]),
]);

// A ball thrown upward: h(t) = 1.5 + 19.6t − 4.9t², with velocity h′(t) = 19.6 − 9.8t.
const h = (t: number) => 1.5 + 19.6 * t - 4.9 * t * t;
const gb = plane({ x: [0, 4.5], y: [0, 24], xStep: 0.5, yStep: 2, every: 0, width: 7, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Height (m)}' } });
const ball = figure('bl', [
  gb,
  numbers(gb, 1, 4),
  plot(gb, { id: 'h', f: h, from: 0, to: 4.1, tone: 'adj', samples: 200 }),
  tangent(gb, { id: 't1', at: [1, h(1)], m: 9.8, ext: 0.55, tone: 'theta', group: 'k1' }),
  tangent(gb, { id: 't3', at: [3, h(3)], m: -9.8, ext: 0.55, tone: 'opp', group: 'k3' }),
  tangent(gb, { id: 't2', at: [2, h(2)], m: 0, ext: 0.6, group: 'k2' }),
  dots(gb, [
    { id: 'p1', x: 1, y: h(1), tone: 'theta', group: 'k1' },
    { id: 'p3', x: 3, y: h(3), tone: 'opp', group: 'k3' },
    { id: 'p2', x: 2, y: h(2), tone: 'good', group: 'k2' },
  ]),
]);

const video: Explainer = {
  id: 'm31-4-1-e',
  lessonId: 'm31-4-1',
  title: 'The Power, Constant and Sum Rules, Part 5: Tangent Slopes and Velocity',
  thumbnailTitle: 'Horizontal Tangents and Velocity',
  thumbnail: 'ht',
  summary: 'Using the power rule to answer questions about slopes and rates: the graph of f(x) = x³ − 3x + 1 has horizontal tangents where f′(x) = 3x² − 3 = 0, at (−1, 3) and (1, −1); and a ball with height h(t) = 1.5 + 19.6t − 4.9t² has velocity h′(t) = 19.6 − 9.8t, so 9.8 m/s at 1 s, −9.8 m/s at 3 s, and it stops rising at 2 s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 5', title: 'Tangent Slopes and Velocity', subtitle: 'Putting the power rule to work' }],
      lines: [
        { say: 'With the power rule, a derivative takes a line or two instead of a page of limits. So you can now answer questions about slopes and rates of change quickly.', show: 'title' },
        { say: 'In this video, you will find where a tangent line is horizontal, and find the velocity of a ball thrown upward.' },
      ],
    },
    {
      chapter: 'Horizontal tangents',
      layout: 'split',
      leftWidth: 540,
      left: [flat],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the points on the graph of $f(x) = x^{3} - 3x + 1$ where the tangent line is horizontal.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f\'(x) = 3x^{2} - 3 = 0', '3(x - 1)(x + 1) = 0', 'x = -1 \\ \\text{ or } \\ x = 1', 'f(-1) = -1 + 3 + 1 = 3', 'f(1) = 1 - 3 + 1 = -1'] },
      ],
      lines: [
        { say: 'Find the points on the graph of f of x equals x cubed, minus three x, plus one, where the tangent line is horizontal.', show: ['q', 'ht.grid', 'ht.axes', 'ht.f'] },
        { say: 'A horizontal line has slope zero. So we need the x-values where the derivative is zero. By the power rule, f prime of x is three x squared minus three. Set it equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor: three times x minus one, times x plus one, equals zero. So x is negative one or one.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'These are only the x-values. To find the points, substitute them into the original function. f of negative one is negative one, plus three, plus one, which is three.', show: ['m.3', 'ht.A'], focus: ['m.3', 'ht.A'] },
        { say: 'And f of one is one, minus three, plus one, which is negative one. So the tangent is horizontal at the point at negative one, three, and at the point at one, negative one: the top of the hump, and the bottom of the dip.', show: ['m.4', 'ht.B'], focus: ['m.4', 'ht.B'] },
      ],
    },
    {
      chapter: 'Velocity',
      layout: 'split',
      leftWidth: 560,
      left: [ball],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A ball’s height is $h(t) = 1.5 + 19.6t - 4.9t^{2}$ metres after $t$ seconds.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h\'(t) = 19.6 - 9.8t', 'h\'(1) = 9.8\\text{ m/s}', 'h\'(3) = -9.8\\text{ m/s}'] },
      ],
      lines: [
        { say: 'The derivative is also an instantaneous rate of change. If s of t is a position, then s prime of t is the velocity.', show: ['bl.grid', 'bl.axes', 'bl.h'] },
        { say: 'A ball’s height is h of t equals 1.5, plus 19.6 t, minus 4.9 t squared metres, after t seconds. Find its velocity at one second and at three seconds.', show: 'q' },
        { say: 'Differentiate term by term. The constant 1.5 has derivative zero, 19.6 t has derivative 19.6, and 4.9 t squared has derivative 9.8 t. So h prime of t equals 19.6 minus 9.8 t.', show: 'm.0', focus: 'm.0' },
        { say: 'At one second, h prime of one is 19.6 minus 9.8, which is 9.8 metres per second. It is positive, so the ball is rising.', show: ['m.1', 'bl.k1'], focus: ['m.1', 'bl.t1'] },
        { say: 'At three seconds, h prime of three is 19.6 minus 29.4, which is negative 9.8 metres per second. It is negative, so the ball is falling.', show: ['m.2', 'bl.k3'], focus: ['m.2', 'bl.t3'] },
      ],
    },
    {
      chapter: 'When it stops rising',
      layout: 'split',
      leftWidth: 560,
      left: [ball],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h\'(t) = 0', '19.6 - 9.8t = 0', '9.8t = 19.6', 't = 2\\text{ s}'] },
        { kind: 'text', id: 't', size: 'md', md: 'At the top, the ball is still for an instant: its velocity is $0$.' },
      ],
      lines: [
        { say: 'When does the ball stop rising? At the very top, it is still for an instant, so its velocity is zero. On the graph, the tangent there is flat.', show: ['bl.grid', 'bl.axes', 'bl.h', 'bl.k2', 't'], focus: 'bl.t2' },
        { say: 'So set h prime of t equal to zero: 19.6 minus 9.8 t equals zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then 9.8 t equals 19.6, and t equals two. The ball stops rising, and reaches its highest point, after two seconds.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Slope or height?', md: 'Substitute into $f\'$ for a **slope** or a **rate**. Substitute into $f$ for a **point** on the graph.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{slope at } x = 1\\colon\\quad f\'(1) = 3(1)^2 - 3 = 0', '\\text{point at } x = 1\\colon\\quad f(1) = 1 - 3 + 1 = -1'] },
      ],
      lines: [
        { say: 'Keep the function and its derivative apart. To find a slope or a rate of change, substitute into the derivative, f prime.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'To find a point on the graph, its height, substitute into the original function, f. A common mistake is to find the x-values from f prime, and then use f prime again for the y-values. That would give zero every time!', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the $x$-values where the graph of $f(x) = x^{3} - 12x$ has a horizontal tangent.',
          choices: ['$x = 4$', '$x = -2$ and $x = 2$', '$x = 0$', '$x = -2\\sqrt{3}$, $0$ and $2\\sqrt{3}$'],
          answer: 1,
          working: '$f\'(x) = 3x^{2} - 12 = 0$, so $x^{2} = 4$ and $x = \\pm 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the x-values where the graph of f of x equals x cubed, minus twelve x, has a horizontal tangent. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. f prime of x is three x squared minus twelve. Setting it to zero gives x squared equals four, so x is negative two or two. Choice D gives the x-intercepts, where f of x is zero, instead of where the slope is zero.', show: 'q.answer' },
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
            'Horizontal tangents: solve $f\'(x) = 0$, then find the points with $f$.',
            'If $s(t)$ is a position, $s\'(t)$ is the velocity.',
            'An object stops rising when its velocity is $0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find horizontal tangents, solve f prime of x equals zero, then substitute into f to find the points.', show: 'sum.0' },
        { say: 'If s of t is a position, its derivative, s prime of t, is the velocity.', show: 'sum.1' },
        { say: 'And a thrown object stops rising when its velocity is zero. In the next lesson, we learn rules for products and quotients of functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
