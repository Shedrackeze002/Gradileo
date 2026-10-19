import type { Explainer } from '@/video/script.ts';
import type { DiagramTone } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { edgeNumbers, join, note, num, plane, plot, signChart, tangent } from './lib/m31-6-graphs.ts';

/**
 * A small panel at `x0`: the curve `f` (with derivative `df`) on [−2, 2] and its tangent lines at
 * x = −1.3, 0 and 1.3, with a caption underneath.
 */
function bend(name: string, x0: number, f: (x: number) => number, df: (x: number) => number, caption: string, tone: DiagramTone): Part {
  const g = plane({ name, x: [-2.2, 2.2], y: [-0.6, 3.4], xStep: 1, yStep: 1, every: 0, width: 4.4, height: 4, at: [x0 + 2.2, 0.6] });
  const grid: Part = { points: g.points, items: g.items.filter((it) => it.group === g.n('grid')) };
  return join([
    grid,
    plot(g, { id: 'c', f, tone, samples: 120 }),
    ...[-1.3, 0, 1.3].map((a, i) => tangent(g, { id: `t${i}`, a, y: f(a), m: df(a), left: 0.75, right: 0.75, tone: 'theta', dot: '', group: 'ts' })),
    note(g, { id: 'cap', x: 0, y: -1.1, tex: caption, tone }),
  ]);
}

// f(x) = x³ − 6x² + 5: concave down on (−∞, 2), concave up on (2, ∞).
const f = (x: number) => x ** 3 - 6 * x * x + 5;
const g = plane({ x: [-1.5, 5.5], y: [-30, 10], xStep: 1, yStep: 5, every: 0, width: 5, height: 6.2 });

const video: Explainer = {
  id: 'm31-6-3',
  lessonId: 'm31-6-3',
  title: 'Concavity and Curve Sketching, Part 1: Concavity',
  thumbnailTitle: 'Concave Up or Down?',
  thumbnail: 'bd',
  summary: 'A graph is concave up where f′ is increasing (it bends upward and lies above its tangent lines) and concave down where f′ is decreasing. Since f″ is the derivative of f′, f″ > 0 means concave up and f″ < 0 means concave down: f(x) = x³ − 6x² + 5 is concave down on (−∞, 2) and concave up on (2, ∞).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 1', title: 'Concavity', subtitle: 'Which way a graph bends' }],
      lines: [
        { say: 'Some curves bend upward, like a skateboard ramp. Others bend downward, like the top of a hill.', show: 'title' },
        { say: 'The first derivative tells you which way a graph is heading. In this video, you will see how the second derivative tells you which way it bends.' },
      ],
    },
    {
      chapter: 'Two ways to bend',
      layout: 'center',
      main: [
        figure('bd', [
          bend('up', 0, (x) => 0.5 * x * x, (x) => x, '\\text{concave up}', 'adj'),
          bend('dn', 6, (x) => 2.8 - 0.5 * x * x, (x) => -x, '\\text{concave down}', 'opp'),
        ]),
      ],
      lines: [
        { say: 'On the left, the graph bends upward, like a cup. Look at its tangent lines from left to right: their slopes go from negative, to zero, to positive. The slope is increasing.', show: ['bd.up-grid', 'bd.up-c', 'bd.up-ts'], focus: 'bd.up-ts' },
        { say: 'Notice too that the graph lies above its tangent lines. A graph like this is called concave up.', show: 'bd.up-cap', focus: 'bd.up-c' },
        { say: 'On the right, the graph bends downward, like a cap. Its tangent slopes go from positive, to zero, to negative: the slope is decreasing, and the graph lies below its tangent lines. It is called concave down.', show: ['bd.dn-grid', 'bd.dn-c', 'bd.dn-ts', 'bd.dn-cap'], focus: ['bd.dn-ts', 'bd.dn-c'] },
      ],
    },
    {
      chapter: 'The second derivative',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Concave up and concave down', md: "The graph of $f$ is **concave up** on an interval if $f'$ is increasing there: it bends upward and lies above its tangent lines. It is **concave down** if $f'$ is decreasing: it bends downward and lies below its tangent lines." },
        { kind: 'bullets', id: 'b', items: ["If $f''(x) > 0$ on an interval, $f$ is **concave up** there.", "If $f''(x) < 0$ on an interval, $f$ is **concave down** there."] },
      ],
      lines: [
        { say: 'So a graph is concave up on an interval if f prime is increasing there, and concave down if f prime is decreasing.', show: 'def' },
        { say: 'And the second derivative is the derivative of f prime. So its sign tells us whether f prime is increasing. If f double prime of x is positive on an interval, f is concave up there.', show: 'b.0' },
        { say: 'If f double prime of x is negative on an interval, f is concave down there.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Intervals of concavity',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('cv', [
          g,
          edgeNumbers(g, { xs: [0, 2, 4], ys: [-30, -20, -10, 0, 10], xTex: num, yTex: num }),
          plot(g, { id: 'dn', f, from: -1.5, to: 2, tone: 'opp', samples: 120 }),
          plot(g, { id: 'up', f, from: 2, to: 5.5, tone: 'adj', samples: 120 }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f'(x) = 3x^{2} - 12x", "f''(x) = 6x - 12 = 6(x - 2)"] },
        figure('sc', [signChart({ name: 's', title: "f''(x)", marks: ['2'], signs: ['-', '+'], notes: ['\\text{concave down}', '\\text{concave up}'], width: 9 })], 230),
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['\\opp{\\text{concave down on } (-\\infty, 2)}', '\\adj{\\text{concave up on } (2, \\infty)}'] },
      ],
      lines: [
        { say: 'Find where f of x equals x cubed, minus six x squared, plus five, is concave up and concave down.', show: ['cv.grid', 'cv.axes', 'cv.dn', 'cv.up'] },
        { say: 'Differentiate twice. f prime of x is three x squared minus twelve x, and f double prime of x is six x minus twelve, which is six times x minus two.', show: 'm', focus: 'm.1' },
        { say: 'f double prime is zero at x equals two. To the left of two it is negative, and to the right it is positive.', show: ['sc.s-base', 'sc.s-mk0', 'sc.s-i0', 'sc.s-i1'] },
        { say: 'So the graph is concave down on the interval from negative infinity to two, in orange, and concave up from two to infinity, in blue.', show: 'a', focus: ['a', 'cv.dn', 'cv.up'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On what interval is $f(x) = x^{3} + 3x^{2} - 1$ concave up?',
          choices: ['$(-1, \\infty)$', '$(-\\infty, -1)$', '$(-2, 0)$', '$(0, \\infty)$'],
          answer: 0,
          working: "$f'(x) = 3x^{2} + 6x$ and $f''(x) = 6x + 6$, which is positive when $x > -1$.",
        },
      ],
      lines: [
        { say: 'Your turn. On what interval is f of x equals x cubed, plus three x squared, minus one, concave up? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. f prime of x is three x squared plus six x, and f double prime of x is six x plus six, which is positive when x is greater than negative one. Choice C is where f prime is negative: where f is decreasing, not where it is concave up.', show: 'q.answer' },
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
          items: ["Concave up: $f'$ increasing, the graph above its tangent lines.", "Concave down: $f'$ decreasing, the graph below its tangent lines.", "$f'' > 0$: concave up. $f'' < 0$: concave down."],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A graph is concave up where f prime is increasing: it bends upward and lies above its tangent lines.', show: 'sum.0' },
        { say: 'It is concave down where f prime is decreasing: it bends downward and lies below its tangent lines.', show: 'sum.1' },
        { say: 'And the sign of the second derivative tells you which: positive means concave up, and negative means concave down. In the next part, we find the points where the concavity changes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
