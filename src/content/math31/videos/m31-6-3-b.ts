import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, note, num, plane, plot, signChart } from './lib/m31-6-graphs.ts';

// f(x) = x⁴ − 4x³: concave up, down on (0, 2), then up; inflection points (0, 0) and (2, −16).
const f = (x: number) => x ** 4 - 4 * x ** 3;
const g = plane({ x: [-1.5, 4.5], y: [-30, 20], xStep: 1, yStep: 5, every: 0, width: 5, height: 6.4 });

// y = x⁴: f″(0) = 0, but concave up on both sides.
const q = plane({ x: [-1.6, 2.9], y: [-0.5, 3], xStep: 1, yStep: 1, every: 0, width: 5.6, height: 4.2 });

const video: Explainer = {
  id: 'm31-6-3-b',
  lessonId: 'm31-6-3',
  title: 'Concavity and Curve Sketching, Part 2: Points of Inflection',
  thumbnailTitle: 'Points of Inflection',
  thumbnail: 'ip',
  summary: 'A point of inflection is a point on a continuous curve where the concavity changes. Solve f″(x) = 0 (and look where f″ does not exist), then check that f″ really changes sign: f(x) = x⁴ − 4x³ has points of inflection (0, 0) and (2, −16), but x⁴ has none, even though its second derivative is 0 at x = 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 2', title: 'Points of Inflection', subtitle: 'Where the bending changes' }],
      lines: [
        { say: 'On a winding road, there is a moment when the road stops curving one way and starts curving the other.', show: 'title' },
        { say: 'On a graph, that is called a point of inflection. In this video, you will find points of inflection with the second derivative, and avoid a common trap.' },
      ],
    },
    {
      chapter: 'Point of inflection',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Point of inflection', md: 'A **point of inflection** is a point on a continuous curve where the **concavity changes**, from up to down or from down to up.' },
        { kind: 'bullets', id: 'b', items: ["Solve $f''(x) = 0$, and look for where $f''$ does not exist.", "Check that $f''$ really **changes sign** there.", 'Find the $y$-coordinate from $f$.'] },
      ],
      lines: [
        { say: 'A point of inflection is a point on a continuous curve where the concavity changes: from concave up to concave down, or from down to up.', show: 'def' },
        { say: 'The concavity can only change where f double prime is zero, or does not exist. So first, solve f double prime of x equals zero, and look for where it is undefined.', show: 'b.0' },
        { say: 'Then check that f double prime really changes sign at each candidate. If it does not, the concavity does not change.', show: 'b.1' },
        { say: 'Finally, find the y-coordinate of each point from the original function.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Two points of inflection',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('ip', [
          g,
          edgeNumbers(g, { xs: [0, 2, 4], ys: [-30, -20, -10, 0, 10, 20], xTex: num, yTex: num }),
          plot(g, { id: 'u0', f, from: -1.5, to: 0, tone: 'adj', samples: 80 }),
          plot(g, { id: 'd0', f, from: 0, to: 2, tone: 'opp', samples: 80 }),
          plot(g, { id: 'u1', f, from: 2, to: 4.5, tone: 'adj', samples: 100 }),
          dots(g, [
            { id: 'p0', x: 0, y: 0, tex: '(0, 0)', tone: 'theta', place: 'above right', group: 'pts' },
            { id: 'p1', x: 2, y: -16, tex: '(2, -16)', tone: 'theta', place: 'above right', group: 'pts' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f'(x) = 4x^{3} - 12x^{2}", "f''(x) = 12x^{2} - 24x = 12x(x - 2)"] },
        figure('sc', [signChart({ name: 's', title: "f''(x)", marks: ['0', '2'], signs: ['+', '-', '+'], notes: ['\\text{up}', '\\text{down}', '\\text{up}'], width: 9 })], 230),
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['f(0) = 0, \\quad f(2) = 16 - 32 = -16'] },
      ],
      lines: [
        { say: 'Find the points of inflection of f of x equals x to the fourth, minus four x cubed.', show: ['ip.grid', 'ip.axes', 'ip.u0', 'ip.d0', 'ip.u1'] },
        { say: 'f prime of x is four x cubed minus twelve x squared, and f double prime of x is twelve x squared minus 24 x. Factor it: twelve x, times x minus two. It is zero at x equals zero and x equals two.', show: 'm', focus: 'm.1' },
        { say: 'Test the signs. f double prime is positive before zero, negative between zero and two, and positive after two. So the graph is concave up, then down, then up again.', show: ['sc.s-base', 'sc.s-mk0', 'sc.s-mk1', 'sc.s-i0', 'sc.s-i1', 'sc.s-i2'] },
        { say: 'The concavity changes at both, so both are points of inflection. f of zero is zero, and f of two is sixteen minus 32, negative sixteen. So the points of inflection are the origin, and the point at two, negative sixteen.', show: ['a', 'ip.pts'], focus: ['a', 'ip.pts'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('x4', [
          q,
          edgeNumbers(q, { xs: [-1, 0, 1, 2], ys: [0, 1, 2, 3], xTex: num, yTex: num }),
          plot(q, { id: 'f', f: (x) => x ** 4, from: -1.6, to: 1.6, tone: 'adj', samples: 200 }),
          note(q, { id: 'f-t', x: 2.05, y: 1.0, tex: 'y = x^{4}', tone: 'adj' }),
          dots(q, [{ id: 'O', x: 0, y: 0, tone: 'theta' }]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: "f″(c) = 0 is not enough", md: "$f(x) = x^{4}$ has $f''(x) = 12x^{2}$, so $f''(0) = 0$. But $f''$ is positive on both sides of $0$: the graph is concave up everywhere, and $(0, 0)$ is **not** a point of inflection." },
        figure('sc', [signChart({ name: 's', title: "f''(x)", marks: ['0'], signs: ['+', '+'], notes: ['\\text{up}', '\\text{up}'], width: 8 })], 220),
      ],
      lines: [
        { say: 'Watch out: f double prime equal to zero is not enough. Take f of x equals x to the fourth.', show: ['x4.grid', 'x4.axes', 'x4.f', 'x4.f-t'] },
        { say: 'Its second derivative is twelve x squared, which is zero at x equals zero. It is tempting to call the origin a point of inflection.', show: ['oops', 'x4.O'] },
        { say: 'But twelve x squared is positive on both sides of zero. The graph is concave up everywhere, so the concavity never changes, and the origin is not a point of inflection. Always check for a change of sign.', show: 'sc', focus: 'x4.f' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the point of inflection of $f(x) = x^{3} - 6x^{2} + 5$.',
          choices: ['$(0, 5)$', '$(4, -27)$', '$(2, -11)$', '$(2, 0)$'],
          answer: 2,
          working: "$f''(x) = 6x - 12$ is $0$ at $x = 2$ and changes from $-$ to $+$ there. $f(2) = 8 - 24 + 5 = -11$.",
        },
      ],
      lines: [
        { say: 'Your turn. Find the point of inflection of f of x equals x cubed, minus six x squared, plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f double prime of x is six x minus twelve, which is zero at x equals two, and changes from negative to positive there. f of two is eight, minus 24, plus five: negative eleven. Choice A is the local maximum, where f prime is zero, not f double prime.', show: 'q.answer' },
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
          items: ['A point of inflection is where the concavity changes.', "Find where $f'' = 0$ or does not exist.", "Check that $f''$ changes sign; $f''(c) = 0$ alone is not enough."],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A point of inflection is a point where the concavity changes.', show: 'sum.0' },
        { say: 'To find one, look where f double prime is zero, or does not exist.', show: 'sum.1' },
        { say: 'And check that f double prime really changes sign there: f double prime equal to zero alone is not enough. In the next part, the second derivative tells hills from valleys. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
