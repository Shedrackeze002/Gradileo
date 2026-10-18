import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, num, plane, plot, tangent } from './lib/m31-6-graphs.ts';

// f(x) = 2x³ − 3x² − 12x + 1: concave down before x = 1/2 (with a hill at x = −1), concave up after (a valley at x = 2).
const f = (x: number) => 2 * x ** 3 - 3 * x * x - 12 * x + 1;
const g = plane({ x: [-2.5, 3.5], y: [-25, 15], xStep: 1, yStep: 5, every: 0, width: 5.4, height: 6.2 });

const video: Explainer = {
  id: 'm31-6-3-c',
  lessonId: 'm31-6-3',
  title: 'Concavity and Curve Sketching, Part 3: The Second Derivative Test',
  thumbnailTitle: 'The Second Derivative Test',
  thumbnail: 'sd',
  summary: 'At a critical number where f′(c) = 0, the tangent is horizontal: if the graph is concave up there (f″(c) > 0) it is the bottom of a valley, a local minimum, and if it is concave down (f″(c) < 0) it is the top of a hill, a local maximum. For f(x) = 2x³ − 3x² − 12x + 1 this gives a local maximum (−1, 8) and a local minimum (2, −19); when f″(c) = 0 the test gives no information.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 3', title: 'The Second Derivative Test', subtitle: 'Hill or valley?' }],
      lines: [
        { say: 'Where the tangent line is horizontal, a graph might be at the top of a hill or the bottom of a valley.', show: 'title' },
        { say: 'The way the graph bends tells you which. In this video, you will use the second derivative to classify critical numbers, without a sign chart.' },
      ],
    },
    {
      chapter: 'The idea',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('sd', [
          g,
          edgeNumbers(g, { xs: [-2, 0, 2], ys: [-20, -10, 0, 10], xTex: num, yTex: num }),
          plot(g, { id: 'dn', f, from: -2.5, to: 0.5, tone: 'opp', samples: 120 }),
          plot(g, { id: 'up', f, from: 0.5, to: 3.5, tone: 'adj', samples: 120 }),
          tangent(g, { id: 'tm', a: -1, y: 8, m: 0, left: 0.9, right: 0.9, tone: 'theta', dot: '' }),
          tangent(g, { id: 'tn', a: 2, y: -19, m: 0, left: 0.9, right: 0.9, tone: 'theta', dot: '' }),
          dots(g, [
            { id: 'M', x: -1, y: 8, tex: '\\text{hill}', tone: 'opp', place: 'above' },
            { id: 'N', x: 2, y: -19, tex: '\\text{valley}', tone: 'adj', place: 'below' },
          ]),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['Concave **down** at a horizontal tangent: the top of a **hill**.', 'Concave **up** at a horizontal tangent: the bottom of a **valley**.'] },
      ],
      lines: [
        { say: 'Here is a cubic, drawn in orange where it is concave down, and in blue where it is concave up.', show: ['sd.grid', 'sd.axes', 'sd.dn', 'sd.up'] },
        { say: 'It has two horizontal tangent lines. The first is on the concave-down part. A curve that bends downward with a level tangent must be at the top of a hill.', show: ['sd.tm-all', 'sd.M', 'b.0'], focus: ['sd.tm', 'b.0'] },
        { say: 'The second is on the concave-up part. A curve that bends upward with a level tangent must be at the bottom of a valley.', show: ['sd.tn-all', 'sd.N', 'b.1'], focus: ['sd.tn', 'b.1'] },
      ],
    },
    {
      chapter: 'The test',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Second derivative test', md: "Suppose $f'(c) = 0$." },
        {
          kind: 'bullets',
          id: 'b',
          items: ["If $f''(c) > 0$, $f$ has a **local minimum** at $c$.", "If $f''(c) < 0$, $f$ has a **local maximum** at $c$.", "If $f''(c) = 0$, the test gives **no information**: use the first derivative test."],
        },
      ],
      lines: [
        { say: 'That is the second derivative test. Suppose f prime of c is zero, so the tangent at c is horizontal.', show: 'def' },
        { say: 'If f double prime of c is positive, the graph is concave up there, so f has a local minimum at c.', show: 'b.0' },
        { say: 'If f double prime of c is negative, the graph is concave down, so f has a local maximum at c.', show: 'b.1' },
        { say: 'And if f double prime of c is zero, the test gives no information. Then go back to the first derivative test.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Classifying critical numbers',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = 2x^{3} - 3x^{2} - 12x + 1',
            "f'(x) = 6x^{2} - 6x - 12 = 6(x + 1)(x - 2)",
            "f''(x) = 12x - 6",
            "f''(-1) = -18 < 0\\colon\\ \\text{local max } f(-1) = 8",
            "f''(2) = 18 > 0\\colon\\ \\text{local min } f(2) = -19",
          ],
        },
      ],
      lines: [
        { say: 'Use the second derivative test to classify the critical numbers of f of x equals two x cubed, minus three x squared, minus twelve x, plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'f prime of x is six x squared, minus six x, minus twelve, which factors as six times x plus one, times x minus two. So the critical numbers are negative one and two.', show: 'm.1', focus: 'm.1' },
        { say: 'Differentiate again: f double prime of x is twelve x minus six.', show: 'm.2', focus: 'm.2' },
        { say: 'At negative one, f double prime is negative eighteen. That is negative, so f has a local maximum there: f of negative one is negative two, minus three, plus twelve, plus one, which is eight.', show: 'm.3', focus: 'm.3' },
        { say: 'At two, f double prime is eighteen. That is positive, so f has a local minimum: f of two is sixteen, minus twelve, minus 24, plus one, which is negative nineteen.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'When the test fails',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: "f″(c) = 0 tells you nothing", md: "Each function below has $f'(0) = 0$ and $f''(0) = 0$, but they behave differently at $0$." },
        {
          kind: 'table',
          id: 't',
          head: ['$f(x)$', "$f''(0)$", 'At $x = 0$'],
          rows: [
            ['$x^{4}$', '$0$', 'local minimum'],
            ['$-x^{4}$', '$0$', 'local maximum'],
            ['$x^{3}$', '$0$', 'neither'],
          ],
        },
      ],
      lines: [
        { say: 'Why does the test give no information when f double prime of c is zero? Look at three functions. Each has a horizontal tangent at zero, and each has second derivative zero there.', show: 'key' },
        { say: 'x to the fourth has a local minimum at zero. Negative x to the fourth has a local maximum. And x cubed has neither: it keeps rising.', show: 't', focus: 't' },
        { say: 'The same second derivative, three different answers. So when f double prime of c is zero, use the first derivative test instead.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$f(x) = x^{3} - 27x$ has critical numbers $-3$ and $3$. What does the second derivative test say?',
          choices: ['A local minimum at $-3$ and a local maximum at $3$', 'A local maximum at $-3$ and a local minimum at $3$', 'Local minima at both', 'The test gives no information'],
          answer: 1,
          working: "$f''(x) = 6x$. $f''(-3) = -18 < 0$, a local maximum; $f''(3) = 18 > 0$, a local minimum.",
        },
      ],
      lines: [
        { say: 'Your turn. f of x equals x cubed minus 27 x has critical numbers negative three and three. What does the second derivative test say? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. f double prime of x is six x. At negative three it is negative eighteen: concave down, so a local maximum. At three it is eighteen: concave up, so a local minimum. Choice A mixes up the signs: a positive second derivative means a valley, not a hill.', show: 'q.answer' },
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
          items: ["$f'(c) = 0$ and $f''(c) > 0$: a local minimum (concave up).", "$f'(c) = 0$ and $f''(c) < 0$: a local maximum (concave down).", "$f''(c) = 0$: no information; use the first derivative test."],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If f prime of c is zero and f double prime of c is positive, the graph is concave up: a local minimum.', show: 'sum.0' },
        { say: 'If f prime of c is zero and f double prime of c is negative, the graph is concave down: a local maximum.', show: 'sum.1' },
        { say: 'And if f double prime of c is zero, the test gives no information, so use the first derivative test. In the next part, we put everything together to sketch a curve. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
