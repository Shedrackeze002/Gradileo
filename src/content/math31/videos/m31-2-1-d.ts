import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hole, numbers, piece, plane, tag } from './lib/m31-2-graphs.ts';

// y = sin(x)/x, with a hole at (0, 1).
const g = plane({ x: [-10, 10], y: [-0.5, 1.5], xStep: 2, yStep: 0.5, every: 0, width: 10, height: 5 });
const sinc = (x: number) => Math.sin(x) / x;
const graph = figure('sc', [
  g,
  numbers(g, 2, 0.5),
  piece(g, { id: 'a', f: sinc, from: -10, to: -1e-6, samples: 300 }),
  piece(g, { id: 'b', f: sinc, from: 1e-6, to: 10, samples: 300 }),
  hole(g, 'H', 0, 1, { tex: '(0, 1)', place: 'above right' }),
  tag(g, 'name', 4.2, 0.85, 'y = \\dfrac{\\sin x}{x}', 'right', 'brand'),
]);

const video: Explainer = {
  id: 'm31-2-1-d',
  lessonId: 'm31-2-1',
  title: 'Limits from Graphs and Tables, Part 4: Estimating Limits from Tables',
  thumbnailTitle: 'Limits from Tables',
  thumbnail: 'sc',
  summary: 'Estimating a limit with a table of values closing in from both sides: substituting x = 0 into sin(x)/x gives 0/0, but the values 0.9983342, 0.9999833 and 0.9999998 close in on 1, so the limit is 1 (in radians). Why a table can mislead: degree mode, and sin(π/x), which is 0 at x = 0.1, 0.01 and 0.001 although its limit does not exist.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 4', title: 'Estimating Limits from Tables', subtitle: 'Closing in from both sides' }],
      lines: [
        { say: 'You will not always have a graph. But you can always work out the values of a function close to a number, and watch where they go.', show: 'title' },
        { say: 'In this video, you will estimate a limit from a table of values, and see why a table must be used with care.' },
      ],
    },
    {
      chapter: 'Substitution gives 0/0',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\lim_{x \\to 0} \\dfrac{\\sin x}{x}', '\\dfrac{\\sin 0}{0} = \\dfrac{0}{0} \\quad ?'] },
        { kind: 'text', id: 't', size: 'md', md: '$0/0$ tells us nothing about the limit. Make a table instead.' },
      ],
      lines: [
        { say: 'Estimate the limit as x approaches zero of sine x over x, with x in radians.', show: 'm.0', focus: 'm.0' },
        { say: 'Putting in x equals zero gives sine of zero over zero, which is zero over zero. That is not a number, and it tells us nothing about where the values are heading.', show: 'm.1', focus: 'm.1' },
        { say: 'Besides, a limit never uses the value at zero anyway. So instead, work out the values for x close to zero, on both sides.', show: 't' },
      ],
    },
    {
      chapter: 'A table of values',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['f(x) = \\dfrac{\\sin x}{x}'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$-0.1$', '$0.9983342$'], ['$-0.01$', '$0.9999833$'], ['$-0.001$', '$0.9999998$'], ['$0.001$', '$0.9999998$'], ['$0.01$', '$0.9999833$'], ['$0.1$', '$0.9983342$']] },
      ],
      lines: [
        { say: 'Start on the left of zero. At x equals negative 0.1, the value is 0.9983342.', show: ['f', 't.0'], focus: 't.0' },
        { say: 'At negative 0.01, it is 0.9999833. And at negative 0.001, it is 0.9999998.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Now the right side. At 0.1, 0.01 and 0.001, you get exactly the same values, because sine of negative x over negative x is the same as sine x over x.', show: ['t.5', 't.4', 't.3'], focus: ['t.3', 't.4', 't.5'] },
        { say: 'From both sides, the values close in on one. So the limit as x approaches zero of sine x over x is one.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'center',
      main: [graph, { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1'] }],
      lines: [
        { say: 'The graph agrees. Here is y equals sine x over x. It is not defined at zero, so there is a hollow circle there.', show: ['sc.grid', 'sc.axes', 'sc.a', 'sc.b', 'sc.name', 'sc.H'], focus: 'sc.H' },
        { say: 'From both sides, the curve rises toward the hollow circle at the point at zero, one.', focus: ['sc.a', 'sc.b'] },
        { say: 'So the limit is one, even though the function has no value at zero. This limit is so important that we will prove it in the next lesson. Later in calculus, it is the key to finding how fast sine changes.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Tables can mislead',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Tables can mislead', md: 'A table only samples a few points. Use values on **both** sides, use **radian mode** for trigonometry, and confirm with algebra when you can.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Degree mode: } \\dfrac{\\sin(0.001^\\circ)}{0.001} \\approx 0.01745', '\\sin\\left(\\dfrac{\\pi}{x}\\right) = 0 \\ \\text{ at } x = 0.1,\\ 0.01,\\ 0.001'] },
      ],
      lines: [
        { say: 'A table only samples a few points, so it can mislead you.', show: 'oops' },
        { say: 'First, the mode. With your calculator in degree mode, the same table closes in on about 0.01745, not one. Calculus works in radians, so use radian mode.', show: 'm.0', focus: 'm.0' },
        { say: 'Second, a bad choice of points. Sine of pi over x is zero at 0.1, at 0.01, and at 0.001. A table of just those values suggests the limit is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'But sine of pi over x oscillates near zero, just like sine of one over x, so its limit does not exist. The table happened to hit only the zeros.', focus: 'm.1' },
        { say: 'So use values on both sides, use several values, and confirm with algebra whenever you can. The next lesson shows how.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $x = -0.001$ and $x = 0.001$ to estimate $\\displaystyle\\lim_{x \\to 0} \\frac{e^x - 1}{x}$.',
          choices: ['$1$', '$0$', 'It does not exist, because it gives $0/0$.', '$e \\approx 2.718$'],
          answer: 0,
          working: 'At $x = -0.001$: $\\dfrac{e^{-0.001} - 1}{-0.001} \\approx 0.9995$. At $x = 0.001$: $\\dfrac{e^{0.001} - 1}{0.001} \\approx 1.0005$. Both sides close in on $1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use x equals negative 0.001 and x equals 0.001 to estimate the limit as x approaches zero of e to the x, minus one, all over x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. On the left, the value is about 0.9995, and on the right, about 1.0005. Both sides close in on one. Choice C mistakes zero over zero for an answer: it only means that substituting tells us nothing.', show: 'q.answer' },
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
          items: ['Substituting can give $0/0$, which tells you nothing about the limit.', 'Make a table with $x$ closing in from both sides, and look for the common value.', '$\\displaystyle\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$, with $x$ in radians.', 'Tables can mislead: use radian mode, several values, and algebra to confirm.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Substituting can give zero over zero, which tells you nothing about the limit.', show: 'sum.0' },
        { say: 'Make a table with x closing in on the number from both sides, and look for the value the outputs close in on.', show: 'sum.1' },
        { say: 'That way, we found that the limit of sine x over x, as x approaches zero, is one, with x in radians.', show: 'sum.2' },
        { say: 'And remember that tables can mislead. In the next lesson, we find limits exactly, with algebra. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
