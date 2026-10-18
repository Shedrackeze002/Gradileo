import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, hole, numbers, plane, tag, vAsym } from './lib/m31-2-graphs.ts';

// f(x) = (2x² − 2x − 4)/(x² − 4) = 2(x + 1)/(x + 2) for x ≠ 2: a hole at (2, 1.5),
// a vertical asymptote x = −2 and a horizontal asymptote y = 2.
const g = plane({ x: [-7, 5], y: [-5, 7], xStep: 1, yStep: 1, every: 0 });
const f = (x: number) => (2 * (x + 1)) / (x + 2);
const rat = (id: string) =>
  figure(id, [
    g,
    numbers(g, 2, 2),
    vAsym(g, 'v', -2),
    hAsym(g, 'h', 2),
    tag(g, 'v-name', -2.1, -4.4, 'x = -2', 'left', 'theta'),
    tag(g, 'h-name', 4.9, 2.1, 'y = 2', 'above left', 'theta'),
    branches(g, { id: 'c', f, breaks: [-2] }),
    hole(g, 'H', 2, 1.5, { tex: '(2, 1.5)', place: 'below', tone: 'opp' }),
  ]);
const all = ['grid', 'axes', 'c'];

const video: Explainer = {
  id: 'm31-2-3-e',
  lessonId: 'm31-2-3',
  title: 'Limits at Infinity and Asymptotes, Part 5: Holes and Asymptotes Together',
  thumbnailTitle: 'Holes and Asymptotes',
  thumbnail: 'r4',
  summary: 'Describing every hole and asymptote of f(x) = (2x² − 2x − 4)/(x² − 4) with limits: factor to 2(x + 1)/(x + 2), find the hole at (2, 1.5) where a factor cancels, the vertical asymptote x = −2 (with f → −∞ from the right and ∞ from the left), and the horizontal asymptote y = 2 from the equal degrees.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 5', title: 'Holes and Asymptotes Together', subtitle: 'Describing a rational function with limits' }],
      lines: [
        { say: 'You now have three tools: cancelling a common factor, infinite limits, and limits at infinity. Together, they describe every hole and asymptote of a rational function.', show: 'title' },
        { say: 'In this video, you will use all three on one function, and then check the results on its graph.' },
      ],
    },
    {
      chapter: 'Factor first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = \\dfrac{2x^2 - 2x - 4}{x^2 - 4}', '= \\dfrac{2(x^2 - x - 2)}{(x - 2)(x + 2)} = \\dfrac{2\\bad{(x - 2)}(x + 1)}{\\bad{(x - 2)}(x + 2)}', '= \\dfrac{2(x + 1)}{x + 2} \\quad (x \\ne 2)'] },
      ],
      lines: [
        { say: 'Describe the asymptotes and holes of f of x equals two x squared, minus two x, minus four, over x squared minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Always factor first. The top has a common factor of two, and x squared minus x minus two factors as x minus two, times x plus one. The bottom is a difference of squares: x minus two, times x plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'The factor x minus two appears on both, so it cancels. For every x except two, f of x equals two times x plus one, over x plus two.', show: 'm.2', focus: 'm.2' },
        { say: 'The original denominator is zero at x equals two and at x equals negative two. Each of those needs a closer look.' },
      ],
    },
    {
      chapter: 'The hole',
      layout: 'split',
      leftWidth: 540,
      left: [rat('r1')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 2\\colon \\ \\text{the factor cancels}', '\\lim_{x \\to 2} f(x) = \\dfrac{2(2 + 1)}{2 + 2} = \\dfrac{6}{4} = 1.5', '\\text{hole at } (2, 1.5)'] }],
      lines: [
        { say: 'At x equals two, the factor x minus two cancelled. The original function is still undefined at two, but the limit there exists.', show: ['r1.grid', 'r1.axes', 'r1.c', 'm.0'], focus: 'm.0' },
        { say: 'Substitute two into the simplified form: two times three, over four, which is 1.5. So the limit as x approaches two is 1.5.', show: 'm.1', focus: 'm.1' },
        { say: 'The graph heads toward the height 1.5 at x equals two, but has no point there. That is a hole, at the point at two, 1.5.', show: ['m.2', 'r1.H'], focus: ['m.2', 'r1.H'] },
      ],
    },
    {
      chapter: 'The vertical asymptote',
      layout: 'split',
      leftWidth: 540,
      left: [rat('r2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -2\\colon \\ \\text{top} \\to 2(-1) = -2', 'x \\to -2^+\\colon \\ \\dfrac{-2}{\\text{small } +} \\to -\\infty', 'x \\to -2^-\\colon \\ \\dfrac{-2}{\\text{small } -} \\to \\infty'] },
      ],
      lines: [
        { say: 'At x equals negative two, nothing cancels. The top approaches two times negative one, which is negative two: a non-zero number over zero. So x equals negative two is a vertical asymptote.', show: [...all.map((p) => `r2.${p}`), 'r2.H', 'r2.v', 'r2.v-name', 'm.0'], focus: ['m.0', 'r2.v'] },
        { say: 'Which way does the graph go? Just to the right of negative two, x plus two is a small positive number. Negative two over a small positive number is large and negative, so f of x approaches negative infinity.', show: 'm.1', focus: ['m.1', 'r2.c-1'] },
        { say: 'Just to the left, x plus two is a small negative number. Negative two over a small negative number is large and positive, so f of x approaches infinity.', show: 'm.2', focus: ['m.2', 'r2.c-0'] },
      ],
    },
    {
      chapter: 'The horizontal asymptote',
      layout: 'split',
      leftWidth: 540,
      left: [rat('r3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{degrees: } 2 \\text{ and } 2', '\\lim_{x \\to \\pm\\infty} f(x) = \\dfrac{2}{1} = 2', '\\text{horizontal asymptote } y = 2'] }],
      lines: [
        { say: 'Finally, the ends of the graph. The top and the bottom of the original function both have degree two.', show: [...all.map((p) => `r3.${p}`), 'r3.H', 'r3.v', 'r3.v-name', 'm.0'], focus: 'm.0' },
        { say: 'Equal degrees mean the limit at infinity is the ratio of the leading coefficients: two over one, which is two. The same is true at negative infinity.', show: 'm.1', focus: 'm.1' },
        { say: 'So the line y equals two is a horizontal asymptote. Both ends of the graph level off toward it.', show: ['m.2', 'r3.h', 'r3.h-name'], focus: ['m.2', 'r3.h'] },
      ],
    },
    {
      chapter: 'The whole picture',
      layout: 'split',
      leftWidth: 540,
      left: [rat('r4')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A **hole** at $(2, 1.5)$', 'A **vertical asymptote** $x = -2$', 'A **horizontal asymptote** $y = 2$'],
        },
      ],
      lines: [
        { say: 'Here is the whole picture. A hole at the point at two, 1.5, where a factor cancelled.', show: ['r4.grid', 'r4.axes', 'r4.c', 'r4.H', 'b.0'], focus: ['r4.H', 'b.0'] },
        { say: 'A vertical asymptote, x equals negative two, where a non-zero number is divided by zero.', show: ['r4.v', 'r4.v-name', 'b.1'], focus: ['r4.v', 'b.1'] },
        { say: 'And a horizontal asymptote, y equals two, from the limits at infinity. Every feature came from a limit.', show: ['r4.h', 'r4.h-name', 'b.2'], focus: ['r4.h', 'b.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Describe the hole and asymptotes of $f(x) = \\dfrac{x^2 - x - 2}{x^2 - 1}$.',
          choices: ['hole $(-1, 1.5)$; $x = 1$; $y = 1$', '$x = 1$ and $x = -1$; $y = 1$', 'hole $(-1, 1.5)$; $x = 1$; $y = 0$', 'hole $(1, -0.5)$; $x = -1$; $y = 1$'],
          answer: 0,
          working: '$f(x) = \\dfrac{(x - 2)(x + 1)}{(x - 1)(x + 1)} = \\dfrac{x - 2}{x - 1}$ for $x \\ne -1$. Hole at $x = -1$: $\\dfrac{-3}{-2} = 1.5$. Vertical asymptote $x = 1$. Equal degrees: $y = \\dfrac{1}{1} = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Describe the hole and asymptotes of f of x equals x squared minus x minus two, over x squared minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It factors as x minus two, times x plus one, over x minus one, times x plus one. The x plus one cancels, giving a hole at negative one, with height negative three over negative two, which is 1.5.', show: 'q.answer' },
        { say: 'The vertical asymptote is x equals one, and equal degrees give y equals one. Choice B misses that x plus one cancels, which makes a hole, not an asymptote.' },
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
          items: ['Factor first. A factor that cancels gives a **hole**; find its height from the simplified form.', 'A zero of the denominator that does not cancel gives a **vertical asymptote**; find each side’s sign.', 'Compare degrees for the **horizontal asymptote**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Factor first. A factor that cancels gives a hole, and the simplified form gives its height.', show: 'sum.0' },
        { say: 'A zero of the denominator that does not cancel gives a vertical asymptote. Find the sign on each side.', show: 'sum.1' },
        { say: 'And compare degrees to find the horizontal asymptote. In the next lesson, we use limits to define continuity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
