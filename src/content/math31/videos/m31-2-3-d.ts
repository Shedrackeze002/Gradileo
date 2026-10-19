import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { approach, branches, hAsym, numbers, plane, tag, vAsym } from './lib/m31-2-graphs.ts';

// y = 1/(x − 2) + 1: up to ∞ just right of x = 2, down to −∞ just left of it.
const g = plane({ x: [-2, 6], y: [-5, 7], every: 0 });
const f = (x: number) => 1 / (x - 2) + 1;
const graph = figure('va', [
  g,
  numbers(g, 1, 1),
  vAsym(g, 'v', 2),
  hAsym(g, 'h', 1, 'muted'),
  tag(g, 'v-name', 2, 5.2, 'x = 2', 'left', 'theta'),
  branches(g, { id: 'c', f, breaks: [2] }),
  approach(g, { id: 'R', f, from: 3.1, to: 2.22, side: 'right', tone: 'opp' }),
  approach(g, { id: 'L', f, from: 0.9, to: 1.78, side: 'left', tone: 'adj' }),
]);

const video: Explainer = {
  id: 'm31-2-3-d',
  lessonId: 'm31-2-3',
  title: 'Limits at Infinity and Asymptotes, Part 4: Infinite Limits',
  thumbnailTitle: 'Infinite Limits',
  thumbnail: 'va',
  summary: 'Infinite limits and vertical asymptotes: for y = 1/(x − 2) + 1, the limit as x → 2⁺ is ∞ and as x → 2⁻ is −∞, so x = 2 is a vertical asymptote. Finding an infinite limit from signs: (x + 1)/(x − 3) → −∞ as x → 3⁻, and 3/(x + 1)² → ∞ as x → −1. And why 0/0 may give a hole instead.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 4', title: 'Infinite Limits', subtitle: 'Values without bound, and vertical asymptotes' }],
      lines: [
        { say: 'Near some numbers, a function’s values do not settle down at all. They shoot up, or plunge down, without any bound.', show: 'title' },
        { say: 'In this video, you will describe that behaviour with infinite limits, and use it to find vertical asymptotes.' },
      ],
    },
    {
      chapter: 'Values without bound',
      layout: 'split',
      leftWidth: 520,
      left: [graph],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\dfrac{1}{x - 2} + 1'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$', '$x$', '$f(x)$'], rows: [['$1.9$', '$-9$', '$2.1$', '$11$'], ['$1.99$', '$-99$', '$2.01$', '$101$'], ['$1.999$', '$-999$', '$2.001$', '$1001$']] },
      ],
      lines: [
        { say: 'Here is the graph of f of x equals one over x minus two, plus one. At x equals two, the denominator is zero, so the function is undefined.', show: ['va.grid', 'va.axes', 'va.c', 'm'] },
        { say: 'Come in from the right. At 2.1, the value is eleven. At 2.01, it is 101. At 2.001, it is one thousand and one. The values grow without bound, and the graph shoots up.', show: ['va.R', 't'], focus: ['va.R', 't'] },
        { say: 'From the left, at 1.9, the value is negative nine. Then negative 99, then negative 999. The values fall without bound, and the graph plunges down.', show: 'va.L', focus: 'va.L' },
        { say: 'Close to two, the graph hugs the dashed vertical line x equals two, without ever touching it.', show: ['va.v', 'va.v-name'], focus: 'va.v' },
      ],
    },
    {
      chapter: 'Infinite limits',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 2^+} f(x) = \\infty \\qquad \\lim_{x \\to 2^-} f(x) = -\\infty'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Infinite limit', md: '$\\displaystyle\\lim_{x \\to a^+} f(x) = \\infty$ means $f(x)$ becomes larger than any number we choose when $x$ is close enough to $a$, on the right. If $f(x) \\to \\pm\\infty$ from either side, the line $x = a$ is a **vertical asymptote**.' },
      ],
      lines: [
        { say: 'We write: the limit as x approaches two from the right of f of x is infinity, and the limit as x approaches two from the left is negative infinity.', show: 'm', focus: 'm' },
        { say: 'Infinity is not a number. Writing that a limit equals infinity means the values become larger than any number we choose, once x is close enough to two. It is a precise way of saying the limit does not exist, because the values grow without bound.', show: 'def' },
        { say: 'Whenever f of x approaches infinity or negative infinity as x approaches "a" from either side, the line x equals "a" is a vertical asymptote. Here, the vertical asymptote is x equals two.' },
      ],
    },
    {
      chapter: 'Using signs',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 3^-} \\dfrac{x + 1}{x - 3}', '\\text{top} \\to 4 \\ (\\text{positive}) \\qquad \\text{bottom: small, negative}', '\\dfrac{\\text{positive}}{\\text{small negative}} \\to -\\infty'] },
        { kind: 'table', id: 't', head: ['$x$', 'Value'], rows: [['$2.9$', '$-39$'], ['$2.99$', '$-399$'], ['$2.999$', '$-3999$']] },
      ],
      lines: [
        { say: 'Without a graph, you can find an infinite limit from signs. Evaluate the limit as x approaches three from the left of x plus one, over x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'First, check that it really is a non-zero number over zero. As x approaches three, the top approaches four, which is positive. The bottom approaches zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the sign of the bottom. From the left, x is a little less than three, so x minus three is a small negative number.', focus: 'm.1' },
        { say: 'A positive number divided by a small negative number is large and negative. So the limit is negative infinity.', show: 'm.2', focus: 'm.2' },
        { say: 'A table agrees: at 2.9, the value is negative 39. At 2.99, negative 399. At 2.999, negative 3,999.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'A squared denominator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to -1} \\dfrac{3}{(x + 1)^2}', '(x + 1)^2 \\text{ is small and positive on both sides}', '\\dfrac{3}{\\text{small positive}} \\to \\infty, \\quad \\text{so} \\quad \\lim_{x \\to -1} \\dfrac{3}{(x + 1)^2} = \\infty'] },
      ],
      lines: [
        { say: 'Next, the limit as x approaches negative one of three over x plus one, squared.', show: 'm.0', focus: 'm.0' },
        { say: 'The top is three, which is positive. The bottom approaches zero. But it is a square, so it is positive from both sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Three over a small positive number is large and positive, from the left and from the right. So both one-sided limits are infinity, and we can write the two-sided limit as infinity. The vertical asymptote is x equals negative one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '0/0 is not a vertical asymptote', md: 'A vertical asymptote needs a **non-zero** number over $0$. If the top and the bottom both approach $0$, simplify first: you may find a hole instead.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x^2 - 9}{x - 3} \\text{ at } x = 3\\colon \\ \\dfrac{0}{0} \\ \\Rightarrow \\ x + 3, \\text{ a hole at } (3, 6)'] },
      ],
      lines: [
        { say: 'Be careful: a zero denominator does not always mean a vertical asymptote. A vertical asymptote needs a non-zero number over zero.', show: 'oops' },
        { say: 'If the top and the bottom both approach zero, simplify first. For example, x squared minus nine, over x minus three, gives zero over zero at three. It simplifies to x plus three, so the graph has a hole at the point at three, six, not an asymptote.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to 5^+} \\frac{2x}{5 - x}$.',
          choices: ['$\\infty$', '$0$', '$10$', '$-\\infty$'],
          answer: 3,
          working: 'The top approaches $10$ (positive). For $x$ just above $5$, $5 - x$ is a small negative number. Positive ÷ small negative is large and negative: $-\\infty$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches five from the right of two x, over five minus x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The top approaches ten, which is positive. For x just above five, five minus x is a small negative number. So the fraction is large and negative: negative infinity. Choice A misses the sign of five minus x.', show: 'q.answer' },
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
          items: ['$\\displaystyle\\lim_{x \\to a} f(x) = \\pm\\infty$ means the values grow without bound: the limit does not exist.', 'Non-zero ÷ (something approaching $0$) gives an infinite limit. Decide the sign from each part.', 'Then $x = a$ is a vertical asymptote. If you get $0/0$, simplify first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A limit of infinity, or negative infinity, means the values grow without bound, so the limit does not exist as a number.', show: 'sum.0' },
        { say: 'A non-zero number divided by something approaching zero gives an infinite limit. Decide the sign from the signs of the top and the bottom.', show: 'sum.1' },
        { say: 'Then x equals "a" is a vertical asymptote. But if you get zero over zero, simplify first. In the next part, we put everything together for one rational function. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
