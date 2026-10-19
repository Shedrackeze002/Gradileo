import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, hole, numbers, plane, tag, vAsym } from './lib/m31-2-graphs.ts';

// f(x) = (x − 3)/(x² − x − 6) = 1/(x + 2) for x ≠ 3: a hole at (3, 0.2) and a vertical asymptote x = −2.
const g = plane({ x: [-6, 5], y: [-4, 4], every: 0 });
const graph = figure('rf', [
  g,
  numbers(g, 2, 1),
  vAsym(g, 'v', -2),
  hAsym(g, 'h', 0, 'muted'),
  tag(g, 'v-name', -2.1, 3.5, 'x = -2', 'left', 'theta'),
  branches(g, { id: 'c', f: (x) => 1 / (x + 2), breaks: [-2] }),
  hole(g, 'H', 3, 0.2, { tex: '(3, 0.2)', place: 'above', tone: 'opp' }),
]);

const video: Explainer = {
  id: 'm31-2-4-c',
  lessonId: 'm31-2-4',
  title: 'Continuity, Part 3: Continuity of Familiar Functions',
  thumbnailTitle: 'Continuity of Familiar Functions',
  thumbnail: 'rf',
  summary: 'Polynomials, rational functions, roots, exponentials, logarithms, sine and cosine are continuous on their domains, and so are their sums, products, quotients and compositions. So f(x) = (x − 3)/(x² − x − 6) is discontinuous only at x = 3 (removable, a hole at (3, 0.2)) and x = −2 (infinite), and a cancelled factor still counts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 3', title: 'Continuity of Familiar Functions', subtitle: 'Where the usual functions are continuous' }],
      lines: [
        { say: 'Checking three conditions at every single point would take forever. Fortunately, you do not need to.', show: 'title' },
        { say: 'In this video, you will learn which familiar functions are continuous, and use that to find every discontinuity of a rational function, without a graph.' },
      ],
    },
    {
      chapter: 'Continuous on their domains',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Continuous at every point of their domains', md: 'These functions have no breaks anywhere they are defined.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Polynomials: everywhere.', 'Rational functions: everywhere except the zeros of the denominator.', '$\\sqrt{x}$ for $x \\ge 0$; $e^x$, $\\sin x$ and $\\cos x$ everywhere; $\\ln x$ for $x > 0$.', 'Sums, products, quotients and compositions of continuous functions, wherever they are defined.'],
        },
      ],
      lines: [
        { say: 'These functions are continuous at every point of their domains: wherever they are defined, their graphs have no breaks.', show: 'key' },
        { say: 'Polynomials are continuous everywhere. That is why direct substitution worked for them.', show: 'b.0', focus: 'b.0' },
        { say: 'Rational functions are continuous everywhere except where the denominator is zero.', show: 'b.1', focus: 'b.1' },
        { say: 'The square root of x is continuous for x greater than or equal to zero. e to the x, sine x and cosine x are continuous everywhere, and the natural log of x is continuous for x greater than zero.', show: 'b.2', focus: 'b.2' },
        { say: 'And if you add, multiply, divide or compose continuous functions, the result is continuous wherever it is defined. So for these functions, the only places to check are where something is undefined.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'A rational function',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x) = \\dfrac{x - 3}{x^2 - x - 6} = \\dfrac{x - 3}{(x - 3)(x + 2)}', '\\text{undefined at } x = 3 \\text{ and } x = -2', 'x = 3\\colon \\ \\dfrac{\\bad{x - 3}}{(\\bad{x - 3})(x + 2)} = \\dfrac{1}{x + 2} \\ \\Rightarrow \\ \\text{a hole at } \\left(3, \\tfrac{1}{5}\\right)', 'x = -2\\colon \\ \\text{top} = -5 \\ne 0 \\ \\Rightarrow \\ \\text{a vertical asymptote}'],
        },
      ],
      lines: [
        { say: 'Find the discontinuities of f of x equals x minus three, over x squared minus x minus six.', show: 'm', focus: 'm' },
        { say: 'It is a rational function, so it is continuous except where the denominator is zero. Factor the denominator: x minus three, times x plus two. It is zero at x equals three and at x equals negative two.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'At x equals three, the factor x minus three cancels, leaving one over x plus two. The limit exists, one fifth, but f of three is undefined. That is a hole, a removable discontinuity.', show: 'm.2', focus: 'm.2' },
        { say: 'At x equals negative two, the top is negative five, which is not zero. A non-zero number over zero means a vertical asymptote, an infinite discontinuity.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 560,
      left: [graph],
      right: [{ kind: 'bullets', id: 'b', items: ['$x = 3$: removable (a hole)', '$x = -2$: infinite (a vertical asymptote)', 'Continuous everywhere else'] }],
      lines: [
        { say: 'The graph shows both. It looks like the graph of one over x plus two, with a vertical asymptote at x equals negative two.', show: ['rf.grid', 'rf.axes', 'rf.c', 'rf.v', 'rf.v-name', 'b.1'], focus: ['rf.v', 'b.1'] },
        { say: 'And at x equals three, there is a tiny hole, at the point at three, one fifth.', show: ['rf.H', 'b.0'], focus: ['rf.H', 'b.0'] },
        { say: 'Everywhere else, the function is continuous.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A cancelled factor still counts', md: 'Cancelling $(x - 3)$ does **not** make $f(3)$ defined. The original function is still undefined at $x = 3$, so it is still discontinuous there.' }],
      lines: [
        { say: 'A common mistake is to cancel the factor x minus three and then forget about x equals three.', show: 'oops' },
        { say: 'Cancelling helps you find the limit. But the original function still divides by zero at three, so f of three is still undefined, and the function is still discontinuous there.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Where is $f(x) = \\dfrac{x + 1}{x^2 - 1}$ discontinuous?',
          choices: ['only at $x = 1$', 'only at $x = -1$', 'nowhere', 'at $x = -1$ (removable) and $x = 1$ (infinite)'],
          answer: 3,
          working: '$x^2 - 1 = (x - 1)(x + 1)$ is zero at $x = \\pm 1$. At $x = -1$ the factor $x + 1$ cancels: a hole. At $x = 1$ the top is $2 \\ne 0$: a vertical asymptote.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is f of x equals x plus one, over x squared minus one, discontinuous? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The denominator is zero at one and at negative one. At negative one, the factor x plus one cancels, so there is a hole. At one, the top is two, so there is a vertical asymptote. Choice A forgets that the function is still undefined at negative one.', show: 'q.answer' },
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
          items: ['Polynomials, rational functions, roots, exponentials, logarithms, sine and cosine are continuous on their domains.', 'A rational function can only be discontinuous where its denominator is zero.', 'A factor that cancels gives a hole; one that does not gives a vertical asymptote.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The familiar functions are continuous wherever they are defined.', show: 'sum.0' },
        { say: 'So a rational function can only be discontinuous where its denominator is zero.', show: 'sum.1' },
        { say: 'A factor that cancels gives a hole, and one that does not gives a vertical asymptote. In the next part, we check where a piecewise function is continuous. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
