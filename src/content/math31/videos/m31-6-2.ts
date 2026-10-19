import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, num, plane, plot, signChart, tangent } from './lib/m31-6-graphs.ts';

// A trail's elevation profile: rising on (0, a), falling on (a, b), rising on (b, c), falling after c.
const trail = (x: number) => 2.2 + 1.5 * Math.sin(x) + 0.3 * x;
const [A, B, C] = [Math.PI - Math.acos(0.2), Math.PI + Math.acos(0.2), 3 * Math.PI - Math.acos(0.2)];
const t = plane({ x: [0, 9], y: [0, 6.6], xStep: 1, yStep: 1, every: 0, width: 9, height: 4.4 });

// f(x) = x² − 6x, falling to its vertex at (3, −9), then rising.
const f = (x: number) => x * x - 6 * x;
const g = plane({ x: [-1, 7], y: [-10, 8], xStep: 1, yStep: 2, every: 0, width: 5.4, height: 6.4 });

const video: Explainer = {
  id: 'm31-6-2',
  lessonId: 'm31-6-2',
  title: 'Increasing, Decreasing and Extreme Values, Part 1: Increasing and Decreasing',
  thumbnailTitle: 'Increasing and Decreasing',
  thumbnail: 'tr',
  summary: 'Where a tangent line slopes upward the graph rises, so f′(x) > 0 on an interval means f is increasing there, and f′(x) < 0 means it is decreasing. For f(x) = x² − 6x, f′(x) = 2x − 6, so f decreases on (−∞, 3) and increases on (3, ∞), intervals of x-values, never of y.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 1', title: 'Increasing and Decreasing', subtitle: 'The sign of the derivative' }],
      lines: [
        { say: 'The elevation profile of a hiking trail climbs, levels off at a summit, drops into a valley and climbs again.', show: 'title' },
        { say: 'The sign of the slope tells you whether you are going up or down. In this video, you will use the sign of the derivative to find where a function increases and where it decreases.' },
      ],
    },
    {
      chapter: 'A hiking trail',
      layout: 'center',
      main: [
        figure('tr', [
          t,
          plot(t, { id: 'r0', f: trail, from: 0, to: A, tone: 'good', samples: 80 }),
          plot(t, { id: 'f0', f: trail, from: A, to: B, tone: 'bad', samples: 80 }),
          plot(t, { id: 'r1', f: trail, from: B, to: C, tone: 'good', samples: 80 }),
          plot(t, { id: 'f1', f: trail, from: C, to: 9, tone: 'bad', samples: 40 }),
          tangent(t, { id: 'tu', a: 0.4, y: trail(0.4), m: 1.5 * Math.cos(0.4) + 0.3, left: 0.7, right: 0.7, tone: 'theta', dot: '' }),
          tangent(t, { id: 'td', a: 3.2, y: trail(3.2), m: 1.5 * Math.cos(3.2) + 0.3, left: 0.7, right: 0.7, tone: 'theta', dot: '' }),
          tangent(t, { id: 'ts', a: A, y: trail(A), m: 0, left: 0.7, right: 0.7, tone: 'ink', dot: '' }),
          note(t, { id: 'n0', x: 1.15, y: 1.3, tex: "f' > 0", tone: 'good' }),
          note(t, { id: 'n1', x: 3.9, y: 4.3, tex: "f' < 0", tone: 'bad' }),
          note(t, { id: 'n2', x: A, y: 5.3, tex: "f' = 0", tone: 'ink' }),
        ]),
      ],
      lines: [
        { say: 'Here is a trail’s elevation profile. Where it climbs, it is drawn in green, and where it drops, in red.', show: ['tr.grid', 'tr.axes', 'tr.r0', 'tr.f0', 'tr.r1', 'tr.f1'] },
        { say: 'On a climb, the tangent line slopes upward, so its slope, the derivative, is positive.', show: ['tr.tu-all', 'tr.n0'], focus: ['tr.tu', 'tr.r0'] },
        { say: 'On a descent, the tangent line slopes downward, so the derivative is negative.', show: ['tr.td-all', 'tr.n1'], focus: ['tr.td', 'tr.f0'] },
        { say: 'And at a summit, or the bottom of a valley, the tangent line is level: the derivative is zero.', show: ['tr.ts-all', 'tr.n2'], focus: 'tr.ts' },
      ],
    },
    {
      chapter: 'The test',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Increasing and decreasing', md: '$f$ is **increasing** on an interval if $f(x_1) < f(x_2)$ whenever $x_1 < x_2$ there, and **decreasing** if $f(x_1) > f(x_2)$ whenever $x_1 < x_2$.' },
        { kind: 'bullets', id: 'b', items: ["If $f'(x) > 0$ for every $x$ in an interval, $f$ is **increasing** there.", "If $f'(x) < 0$ for every $x$ in an interval, $f$ is **decreasing** there."] },
      ],
      lines: [
        { say: 'A function is increasing on an interval if, as x gets bigger, f of x gets bigger too. It is decreasing if f of x gets smaller as x gets bigger.', show: 'def' },
        { say: 'The derivative tells us which. If f prime of x is positive for every x in an interval, f is increasing on that interval.', show: 'b.0' },
        { say: 'If f prime of x is negative for every x in an interval, f is decreasing there.', show: 'b.1' },
        { say: 'A proof uses a result called the mean value theorem: between any two points, the average rate of change equals the derivative somewhere in between, so it has the same sign as the derivative.' },
      ],
    },
    {
      chapter: 'A parabola',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('pa', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4, 5, 6, 7], ys: [-8, -4, 0, 4, 8], xTex: num, yTex: num }),
          plot(g, { id: 'dn', f, from: -1, to: 3, tone: 'bad', samples: 100 }),
          plot(g, { id: 'up', f, from: 3, to: 7, tone: 'good', samples: 100 }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f(x) = x^{2} - 6x", "f'(x) = 2x - 6"] },
        figure('sc', [signChart({ name: 's', title: "f'(x)", marks: ['3'], signs: ['-', '+'], notes: ['\\Large\\searrow', '\\Large\\nearrow'], width: 8 })], 230),
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['\\text{decreasing on } (-\\infty, 3)', '\\text{increasing on } (3, \\infty)'] },
      ],
      lines: [
        { say: 'Where is f of x equals x squared minus six x increasing, and where is it decreasing?', show: ['pa.grid', 'pa.axes', 'pa.dn', 'pa.up', 'm.0'] },
        { say: 'Its derivative is two x minus six. That is zero at x equals three. To the right of three it is positive, and to the left of three it is negative.', show: ['m.1', 'sc.s-base', 'sc.s-mk0', 'sc.s-i0', 'sc.s-i1'], focus: 'm.1' },
        { say: 'So f is decreasing on the interval from negative infinity to three, shown in red, and increasing on the interval from three to infinity, in green.', show: ['a.0', 'a.1'], focus: ['a.0', 'a.1', 'pa.dn', 'pa.up'] },
        { say: 'Notice that intervals of increase and decrease are intervals of x-values. They say where along the x-axis the graph rises or falls, never how high it is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On what interval is $f(x) = 8x - x^{2}$ increasing?',
          choices: ['$(4, \\infty)$', '$(-\\infty, 16)$', '$(0, 8)$', '$(-\\infty, 4)$'],
          answer: 3,
          working: "$f'(x) = 8 - 2x$, which is positive when $x < 4$. So $f$ is increasing on $(-\\infty, 4)$.",
        },
      ],
      lines: [
        { say: 'Your turn. On what interval is f of x equals eight x minus x squared increasing? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. f prime of x is eight minus two x, which is positive when x is less than four. So f is increasing from negative infinity to four. Choice B uses sixteen, the height of the vertex, but intervals of increase are always intervals of x.', show: 'q.answer' },
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
          items: ["$f' > 0$ on an interval: $f$ is increasing there.", "$f' < 0$ on an interval: $f$ is decreasing there.", 'Write the intervals as $x$-values, in interval notation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Where the derivative is positive, the function is increasing.', show: 'sum.0' },
        { say: 'Where the derivative is negative, the function is decreasing.', show: 'sum.1' },
        { say: 'And write the intervals as x-values, in interval notation. In the next part, we find the critical numbers, where the derivative can change sign. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
