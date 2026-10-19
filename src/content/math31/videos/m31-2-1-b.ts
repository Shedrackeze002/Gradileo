import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { approach, guide, hole, numbers, piece, plane, spot } from './lib/m31-2-graphs.ts';

// A jump at x = 2: y = 0.5x up to (2, 1), included; then y = 4 − 0.5(x − 2)² from (2, 4), not included.
const g = plane({ x: [-1, 5], y: [-1, 5], every: 0 });
const left = (x: number) => 0.5 * x;
const right = (x: number) => 4 - 0.5 * (x - 2) ** 2;
const jump = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 1),
    guide(g, 'readL', [2, 1], [-1, 1], 'adj'),
    guide(g, 'readR', [2, 4], [-1, 4], 'opp'),
    piece(g, { id: 'cL', f: left, from: -1, to: 2 }),
    piece(g, { id: 'cR', f: right, from: 2, to: 5 }),
    approach(g, { id: 'L', f: left, from: -0.2, to: 1.55, tone: 'adj' }),
    approach(g, { id: 'R', f: right, from: 4.3, to: 2.5, tone: 'opp' }),
    spot(g, 'D', 2, 1, { tex: '(2, 1)', place: 'below right' }),
    hole(g, 'H', 2, 4, { tex: '(2, 4)', place: 'above left' }),
  ]);

const video: Explainer = {
  id: 'm31-2-1-b',
  lessonId: 'm31-2-1',
  title: 'Limits from Graphs and Tables, Part 2: One-Sided Limits',
  thumbnailTitle: 'One-Sided Limits',
  thumbnail: 'j1',
  summary: 'Left-hand and right-hand limits, read from the piece of the graph on each side, open circles included. At a jump where the graph approaches 1 from the left and 4 from the right, the one-sided limits are 1 and 4, f(2) = 1, and the two-sided limit does not exist: it exists only when both one-sided limits are equal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 2', title: 'One-Sided Limits', subtitle: 'From the left and from the right' }],
      lines: [
        { say: 'In the last part, a graph headed toward the same height from both sides. But sometimes the two sides disagree: the graph jumps.', show: 'title' },
        { say: 'In this video, you will look at each side on its own, with one-sided limits, and use them to decide whether a limit exists.' },
      ],
    },
    {
      chapter: 'Two different heights',
      layout: 'split',
      leftWidth: 560,
      left: [jump('j1')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graph of $y = f(x)$ has a solid dot at $(2, 1)$ and a hollow circle at $(2, 4)$.' }],
      lines: [
        { say: 'Here is the graph of a function f. To the left of two, it is a straight line that rises to a solid dot at the point at two, one.', show: ['j1.grid', 'j1.axes', 'j1.cL', 'j1.D', 't'], focus: ['j1.cL', 'j1.D'] },
        { say: 'To the right of two, it is a curve that starts at a hollow circle, at the point at two, four.', show: ['j1.cR', 'j1.H'], focus: ['j1.cR', 'j1.H'] },
        { say: 'Come in from the left, with x less than two. The line heads toward a height of one.', show: ['j1.L', 'j1.readL'], focus: 'j1.L' },
        { say: 'Come in from the right, with x greater than two. The curve heads toward a height of four.', show: ['j1.R', 'j1.readR'], focus: 'j1.R' },
        { say: 'The two sides head for different heights. To describe this, we need a limit for each side.', focus: ['j1.readL', 'j1.readR'] },
      ],
    },
    {
      chapter: 'One-sided limits',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\lim_{x \\to a^-} f(x) \\qquad \\lim_{x \\to a^+} f(x)'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'One-sided limits', md: 'The **left-hand limit** $\\displaystyle\\lim_{x \\to a^-} f(x)$ uses only $x < a$. The **right-hand limit** $\\displaystyle\\lim_{x \\to a^+} f(x)$ uses only $x > a$.' },
      ],
      lines: [
        { say: 'The left-hand limit uses only x-values less than "a", coming in from the left. We write a small minus sign after the "a": the limit as x approaches "a" from the left.', show: ['m', 'def'], focus: 'm' },
        { say: 'The right-hand limit uses only x-values greater than "a", coming in from the right. We write a small plus sign: the limit as x approaches "a" from the right.', focus: 'def' },
        { say: 'The signs tell you the side: minus for the smaller numbers on the left, plus for the bigger numbers on the right.' },
      ],
    },
    {
      chapter: 'Reading the jump',
      layout: 'split',
      leftWidth: 560,
      left: [jump('j2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\lim_{x \\to 2^-} f(x) = 1', '\\lim_{x \\to 2^+} f(x) = 4', 'f(2) = 1'] }],
      lines: [
        { say: 'Now read the one-sided limits at x equals two. From the left, the line rises toward the solid dot at height one. So the limit as x approaches two from the left is one.', show: ['j2.grid', 'j2.axes', 'j2.cL', 'j2.cR', 'j2.D', 'j2.H', 'j2.L', 'j2.readL', 'm.0'], focus: ['j2.L', 'm.0'] },
        { say: 'From the right, the curve heads toward the hollow circle at height four. So the limit as x approaches two from the right is four.', show: ['j2.R', 'j2.readR', 'm.1'], focus: ['j2.R', 'm.1'] },
        { say: 'And the value of the function at two comes from the solid dot. f of two is one.', show: 'm.2', focus: ['m.2', 'j2.D'] },
      ],
    },
    {
      chapter: 'Does the limit exist?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to a} f(x) = L \\quad \\text{exactly when} \\quad \\lim_{x \\to a^-} f(x) = L \\ \\text{and} \\ \\lim_{x \\to a^+} f(x) = L'] },
        { kind: 'bullets', id: 'b', items: ['At the jump: $1 \\ne 4$, so $\\displaystyle\\lim_{x \\to 2} f(x)$ **does not exist**.', 'At the hole in the last part: both sides head to $3$, so the limit **is** $3$.'] },
      ],
      lines: [
        { say: 'One rule links the ordinary limit, which is called the two-sided limit, to the one-sided limits.', show: 'm' },
        { say: 'The limit as x approaches "a" of f of x equals L exactly when both one-sided limits equal L. The two sides must agree.', focus: 'm' },
        { say: 'At our jump, the one-sided limits are one and four. They are different, so the limit as x approaches two of f of x does not exist. There is no single height the graph heads toward.', show: 'b.0', focus: 'b.0' },
        { say: 'Compare the graph with a hole from the last part. There, both sides headed to three, so the limit existed, and it was three.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'An open circle still counts',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'An open circle still counts', md: 'A one-sided limit can equal the height of a hollow circle. The graph never reaches that point, but it gets as close as you like to it, and that is all a limit needs.' }],
      lines: [
        { say: 'Notice that the right-hand limit was four, even though the point at two, four is a hollow circle, not part of the graph.', show: 'tip' },
        { say: 'That is fine. The graph never reaches that point, but it gets as close as you like to it. A limit only asks where the graph is heading, so an open circle still counts.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For a function $h$, $\\displaystyle\\lim_{x \\to 3^-} h(x) = 2$, $\\displaystyle\\lim_{x \\to 3^+} h(x) = 2$ and $h(3) = 5$. Find $\\displaystyle\\lim_{x \\to 3} h(x)$.',
          choices: ['$5$', 'It does not exist.', '$3$', '$2$'],
          answer: 3,
          working: 'Both one-sided limits equal $2$, so the two-sided limit is $2$. The value $h(3) = 5$ does not affect the limit.',
        },
      ],
      lines: [
        { say: 'Your turn. For a function h, the limit as x approaches three from the left is two, the limit as x approaches three from the right is two, and h of three is five. Find the limit as x approaches three of h of x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Both one-sided limits are two, so the limit is two. Choice B is wrong: the value h of three is not part of the limit at all, so it cannot stop the limit from existing.', show: 'q.answer' },
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
          items: ['$x \\to a^-$: from the left ($x < a$). $x \\to a^+$: from the right ($x > a$).', 'Read each one-sided limit from the piece of the graph on that side, open circles included.', 'The limit exists only when both one-sided limits exist and are equal.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A small minus sign means x approaches from the left, and a small plus sign means from the right.', show: 'sum.0' },
        { say: 'Read each one-sided limit from the piece of the graph on that side, and hollow circles still count.', show: 'sum.1' },
        { say: 'And the two-sided limit exists only when both one-sided limits exist and are equal. In the next part, we see all the ways a limit can fail to exist. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
