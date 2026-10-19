import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { branches, dots, guide, numbers, piece, plane, spot, tag } from './lib/m31-2-graphs.ts';

// A continuous f on [1, 5] with f(1) = 2 and f(5) = 4 crosses y = 3 (three times).
const g1 = plane({ x: [0, 6], y: [0, 5], every: 0 });
const wave = (x: number) => 0.5 * (x - 3) ** 3 - 1.5 * (x - 3) + 3;
const roots = [3 - Math.sqrt(3), 3, 3 + Math.sqrt(3)];
const ivt = figure('iv', [
  g1,
  numbers(g1, 1, 1),
  guide(g1, 'N', [0, 3], [6, 3], 'theta', { dashed: true }),
  tag(g1, 'N-name', 0.1, 3, 'y = N', 'above right', 'theta'),
  piece(g1, { id: 'c', f: wave, from: 1, to: 5 }),
  spot(g1, 'A', 1, 2, { tex: '(a, f(a))', place: 'below right', tone: 'adj' }),
  spot(g1, 'B', 5, 4, { tex: '(b, f(b))', place: 'above left', tone: 'adj' }),
  dots(g1, roots.map((x, i) => ({ id: `c${i}`, x, y: 3, tex: '', tone: 'good' as const, group: 'cs' }))),
]);

// f(x) = x³ + x − 1 crosses the x-axis between 0 and 1.
const g2 = plane({ x: [-1, 2], y: [-3, 3], xStep: 0.5, yStep: 1, every: 0, width: 4.5, height: 6 });
const root = figure('rt', [
  g2,
  numbers(g2, 0.5, 1),
  piece(g2, { id: 'c', f: (x) => x ** 3 + x - 1, samples: 300 }),
  spot(g2, 'P', 0, -1, { tex: '(0, -1)', place: 'below right', tone: 'adj' }),
  spot(g2, 'Q', 1, 1, { tex: '(1, 1)', place: 'right', tone: 'adj' }),
  spot(g2, 'R', 0.6823, 0, { tex: 'c', place: 'above left', tone: 'good' }),
]);

// y = 1/x: negative at −1, positive at 1, but never 0.
const g3 = plane({ x: [-3, 3], y: [-3, 3], every: 0 });
const recip = figure('rc', [
  g3,
  numbers(g3, 1, 1),
  branches(g3, { id: 'c', f: (x) => 1 / x, breaks: [0] }),
  spot(g3, 'P', -1, -1, { tone: 'adj' }),
  spot(g3, 'Q', 1, 1, { tone: 'adj' }),
]);

const video: Explainer = {
  id: 'm31-2-4-e',
  lessonId: 'm31-2-4',
  title: 'Continuity, Part 5: The Intermediate Value Theorem',
  thumbnailTitle: 'The Intermediate Value Theorem',
  thumbnail: 'iv',
  summary: 'Continuity on an interval, and the Intermediate Value Theorem: a function continuous on [a, b] takes every value between f(a) and f(b). It shows that x³ + x − 1 = 0 has a solution between 0 and 1, because f(0) = −1 and f(1) = 1; and 1/x shows why continuity is needed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 5', title: 'The Intermediate Value Theorem', subtitle: 'Continuous functions cannot skip values' }],
      lines: [
        { say: 'If you were 1.2 metres tall at age eight and 1.6 metres tall at age fourteen, then at some moment in between you were exactly 1.4 metres tall. Growth is continuous: it cannot skip a height.', show: 'title' },
        { say: 'In this video, you will meet the theorem that makes this idea exact, and use it to show that an equation has a solution.' },
      ],
    },
    {
      chapter: 'Continuous on an interval',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Continuous on an interval', md: 'A function is **continuous on an interval** if it is continuous at every point of the interval. At a closed endpoint, use the one-sided limit from inside the interval.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['[a, b]\\colon \\quad \\lim_{x \\to a^+} f(x) = f(a), \\qquad \\lim_{x \\to b^-} f(x) = f(b)'] },
      ],
      lines: [
        { say: 'First, a definition. A function is continuous on an interval if it is continuous at every point of the interval.', show: 'def' },
        { say: 'At an endpoint of a closed interval, from "a" to b, we can only approach from inside. So at "a" we use the limit from the right, and at b the limit from the left.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The theorem',
      layout: 'split',
      leftWidth: 540,
      left: [ivt],
      right: [
        { kind: 'callout', id: 'thm', tone: 'definition', title: 'Intermediate Value Theorem', md: 'If $f$ is continuous on $[a, b]$ and $N$ is any number between $f(a)$ and $f(b)$, then $f(c) = N$ for **at least one** $c$ in $(a, b)$.' },
      ],
      lines: [
        { say: 'Here is the theorem. Suppose f is continuous on the interval from "a" to b.', show: ['iv.grid', 'iv.axes', 'iv.A', 'iv.B', 'thm'], focus: ['iv.A', 'iv.B'] },
        { say: 'Pick any number N between f of "a" and f of b. Then the graph must cross the line y equals N at least once between "a" and b.', show: ['iv.N', 'iv.N-name'], focus: 'iv.N' },
        { say: 'Why? To get from one height to the other without lifting your pencil, the graph has to pass through every height in between.', show: 'iv.c', focus: 'iv.c' },
        { say: 'So there is at least one number c, between "a" and b, where f of c equals N. There may be more than one: this graph crosses three times.', show: 'iv.cs', focus: 'iv.cs' },
      ],
    },
    {
      chapter: 'Locating a root',
      layout: 'split',
      leftWidth: 480,
      left: [root],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = x^3 + x - 1', 'f(0) = -1 < 0', 'f(1) = 1 > 0', 'f(c) = 0 \\text{ for some } c \\text{ in } (0, 1)'] },
      ],
      lines: [
        { say: 'Show that x cubed plus x minus one equals zero has a solution between x equals zero and x equals one.', show: ['m.0', 'rt.grid', 'rt.axes', 'rt.c'], focus: 'm.0' },
        { say: 'Let f of x be x cubed plus x minus one. It is a polynomial, so it is continuous on the interval from zero to one.', focus: 'rt.c' },
        { say: 'Now the endpoints. f of zero is negative one, which is below zero. f of one is one plus one minus one, which is one, above zero.', show: ['m.1', 'm.2', 'rt.P', 'rt.Q'], focus: ['m.1', 'm.2', 'rt.P', 'rt.Q'] },
        { say: 'Zero is between negative one and one. So by the Intermediate Value Theorem, f of c equals zero for some c between zero and one. The equation has a solution there.', show: ['m.3', 'rt.R'], focus: ['m.3', 'rt.R'] },
        { say: 'The theorem tells you that a solution exists, not exactly where it is. Here it is about 0.682.' },
      ],
    },
    {
      chapter: 'Why continuity matters',
      layout: 'split',
      leftWidth: 480,
      left: [recip],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Continuity is essential', md: '$\\dfrac{1}{x}$ is negative at $x = -1$ and positive at $x = 1$, but it is **never** $0$. It is not continuous on $[-1, 1]$.' },
      ],
      lines: [
        { say: 'The theorem needs continuity. Look at y equals one over x.', show: ['rc.grid', 'rc.axes', 'rc.c'] },
        { say: 'At x equals negative one, it is negative one. At x equals one, it is one. Zero is in between.', show: ['rc.P', 'rc.Q', 'tip'], focus: ['rc.P', 'rc.Q'] },
        { say: 'But one over x is never zero. The graph jumps from below the x-axis to above it at its vertical asymptote, without crossing. One over x is not continuous on the interval from negative one to one, so the theorem does not apply.', focus: 'rc.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = x^3 - 4x + 1$, on which interval does the Intermediate Value Theorem guarantee a solution of $f(x) = 0$?',
          choices: ['between $2$ and $3$', 'between $-1$ and $0$', 'between $1$ and $2$', 'between $3$ and $4$'],
          answer: 2,
          working: '$f(1) = 1 - 4 + 1 = -2$ and $f(2) = 8 - 8 + 1 = 1$ have opposite signs. In the other choices, both ends are positive: $f(2) = 1, f(3) = 16$; $f(-1) = 4, f(0) = 1$; $f(3) = 16, f(4) = 49$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x cubed, minus four x, plus one, on which interval does the Intermediate Value Theorem guarantee a solution of f of x equals zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f of one is negative two, and f of two is positive one, so zero is between them. Choice A has f of two equal to one and f of three equal to sixteen, both positive, so the theorem promises nothing there.', show: 'q.answer' },
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
          items: ['Continuous on an interval: continuous at every point, with one-sided limits at closed endpoints.', 'Intermediate Value Theorem: if $f$ is continuous on $[a, b]$, it takes every value between $f(a)$ and $f(b)$.', 'A sign change of a continuous function on $[a, b]$ means a root in between.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A function is continuous on an interval when it is continuous at every point, using one-sided limits at closed endpoints.', show: 'sum.0' },
        { say: 'The Intermediate Value Theorem says that a function continuous on the interval from "a" to b takes every value between f of "a" and f of b.', show: 'sum.1' },
        { say: 'So if a continuous function changes sign on an interval, it has a root in between. That completes limits and continuity. Next, we use limits to measure how fast a function changes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
