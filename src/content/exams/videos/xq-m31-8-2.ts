import type { DiagramItem, Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 8.2 (Riemann sums and area). The question is an exercise from
// OpenStax Calculus Volume 1 (section 5.1, Approximating Areas, CC BY-NC-SA 4.0): the book's set-up
// "Let Ln denote the left-endpoint sum using n subintervals and let Rn denote the corresponding
// right-endpoint sum. In the following exercises, compute the indicated left and right sums for
// the given functions on the indicated interval." is put with the one sum it asks about.
// Δx = 0.25 and f(x) = (x − 1)² at 0, 0.25, …, 1.75 adds to 2.75, so L8 = 0.6875, as in the book's
// answer. Check: the exact area is 2/3 ≈ 0.667, and R8 is also 0.6875 by symmetry.

const QUESTION =
  'Let Lₙ denote the left-endpoint sum using n subintervals and let Rₙ denote the corresponding right-endpoint sum. Compute the indicated left sum for the given function on the indicated interval: L₈ for x² − 2x + 1 on [0, 2].';

const F = (x: number) => (x - 1) ** 2;
const g = plane({ x: [0, 2], y: [0, 1.25], xStep: 0.25, yStep: 0.25, every: 2, width: 9, height: 6 });

/** The eight left-endpoint rectangles. */
const rects = () => {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < 8; i++) {
    const x0 = i * 0.25;
    const h = F(x0);
    points[`r${i}a`] = g.map(x0, 0);
    points[`r${i}b`] = g.map(x0 + 0.25, 0);
    points[`r${i}c`] = g.map(x0 + 0.25, h);
    points[`r${i}d`] = g.map(x0, h);
    items.push({ kind: 'region', id: `r${i}`, points: [`r${i}a`, `r${i}b`, `r${i}c`, `r${i}d`], tone: 'theta', shade: 0.3, group: 'rects' } as DiagramItem);
  }
  return { points, items };
};

const graph = (height = 440) => figure('g', [g, rects(), plot(g, { id: 'f', f: F, from: 0, to: 2, tone: 'adj' })], height);

const video: Explainer = {
  id: 'xq-m31-8-2',
  lessonId: '',
  exam: {
    lesson: 'm31-8-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 5.1, Approximating Areas',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/5-1-approximating-areas',
    question: QUESTION,
  },
  title: 'Exam Question: The Left Sum L₈ for x² − 2x + 1 on [0, 2] (Riemann Sums)',
  thumbnailTitle: 'Eight Rectangles Under a Curve',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: compute the left-endpoint sum L₈ for f(x) = x² − 2x + 1 on [0, 2]. Each of the 8 rectangles is 0.25 wide, and its height is f at the left end: 0, 0.25, 0.5 and so on up to 1.75. Writing f(x) = (x − 1)² makes the heights easy, and they add to 2.75, so L₈ = 0.25 × 2.75 = 0.6875. Then we check against the exact area, 2/3, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Eight Rectangles Under a Curve', subtitle: 'Riemann sums, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about Riemann sums. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Let $L_n$ denote the left-endpoint sum using $n$ subintervals and let $R_n$ denote the corresponding right-endpoint sum. Compute the indicated left sum for the given function on the indicated interval: $L_8$ for $x^2 - 2x + 1$ on $[0, 2]$.',
          answer: '$L_8 = 0.6875$',
          working: '$\\Delta x = 0.25$; heights add to $2.75$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'L n is the left endpoint sum with n subintervals, and R n is the right endpoint sum. Compute L 8, for x squared minus 2x plus 1, on the interval from 0 to 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Cut $[0, 2]$ into **8** equal strips. Each rectangle\'s height is $f$ at the strip\'s **left** end. Add up the areas.' }],
      lines: [
        { say: 'Here is the curve, from 0 to 2.', show: ['g.grid', 'g.axes', 'g.f'] },
        { say: 'Cut the interval into 8 equal strips. On each strip, draw a rectangle whose height is the value of f at the strip\'s left end.', show: 'g.rects' },
        { say: 'The left sum is the total area of these rectangles. It estimates the area under the curve.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\Delta x = \\dfrac{b - a}{n}', 'L_n = \\Delta x\\left[f(x_0) + f(x_1) + \\cdots + f(x_{n - 1})\\right]'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Left endpoints', md: 'The left sum uses $x_0 = a$ up to $x_{n - 1}$: it **includes** the start and **leaves out** the end, $b$.' },
      ],
      lines: [
        { say: 'Here is what we need. Each strip has width delta x: the length of the interval over the number of strips.', show: 'f.0' },
        { say: 'The left sum is delta x times the sum of f at the left ends.', show: 'f.1' },
        { say: 'The left ends include the start, "a", and leave out the end, b.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $\\Delta x$ and the **left ends**', 'Find each **height** (write $f$ as $(x - 1)^2$)', 'Add the heights, then **times** $\\Delta x$'] }],
      lines: [
        { say: 'Here is the plan. Find delta x and the left ends.', show: 'plan.0' },
        { say: 'Find each height. Writing f as x minus 1, squared, will make that easier.', show: 'plan.1' },
        { say: 'Add the heights, then multiply by delta x.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The strips',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta x = \\dfrac{2 - 0}{8} = \\good{0.25}', '\\text{left ends: } 0, \\ 0.25, \\ 0.5, \\ 0.75, \\ 1, \\ 1.25, \\ 1.5, \\ 1.75'] }],
      lines: [
        { say: 'Step one. Delta x is 2 minus 0, over 8, which is 0.25.', show: 'm.0' },
        { say: 'The left ends start at 0 and go up by 0.25, stopping at 1.75. 2 is not a left end.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The heights',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 - 2x + 1 = (x - 1)^2'] },
        {
          kind: 'table',
          id: 'tab',
          head: ['$x$', '$0$', '$0.25$', '$0.5$', '$0.75$', '$1$', '$1.25$', '$1.5$', '$1.75$'],
          rows: [['$f(x)$', '$1$', '$0.5625$', '$0.25$', '$0.0625$', '$0$', '$0.0625$', '$0.25$', '$0.5625$']],
        },
        { kind: 'math', id: 'sum', size: 'md', lines: ['\\text{total} = \\good{2.75}'] },
      ],
      lines: [
        { say: 'Step two. x squared minus 2x plus 1 is a perfect square: x minus 1, squared.', show: 'm' },
        { say: 'So each height is the distance from 1, squared. At 0, that is 1. At 0.25, 0.75 squared, which is 0.5625. And so on, down to 0 at x equals 1, then back up.', show: 'tab' },
        { say: 'Add them: 1 plus 2 times 0.5625, plus 2 times 0.25, plus 2 times 0.0625, plus 0. That is 2.75.', show: 'sum', focus: 'sum' },
      ],
    },
    {
      chapter: 'Step 3: The sum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['L_8 = 0.25 \\times 2.75 = \\good{0.6875}'] }],
      lines: [
        { say: 'Step three. Every rectangle has width 0.25, so multiply the total height by 0.25.', show: 'm.0' },
        { say: 'L 8 is 0.6875.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{exact area} = \\dfrac{2}{3} \\approx 0.667', 'L_8 = 0.6875 \\text{ is within } 0.021 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The exact area under this curve, which we will learn to find with the fundamental theorem, is 2 thirds, about 0.667.', show: 'm.0' },
        { say: 'Our estimate, 0.6875, is only about 0.02 more. On the left half the rectangles stick out above the curve, and on the right half they fall short, so the errors nearly cancel. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['Using $x = 2$', 'that is a **right** end, not a left end'],
            ['Forgetting $\\times \\Delta x$', '$2.75$ is the heights, not the **area**'],
            ['$\\Delta x = \\dfrac{2}{9}$', '$8$ strips have $9$ dividing points, but $\\Delta x = \\dfrac{2}{8}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x equals 2 is the right end of the last strip. The left sum does not use it.' },
        { say: 'The heights add to 2.75, but area is height times width. Multiply by 0.25.' },
        { say: 'And 8 strips means 8 equal widths: 2 over 8, even though there are 9 dividing points.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Compute $R_4$ for $f(x) = x^2$ on $[0, 2]$.',
          choices: ['$1.75$', '$2.67$', '$3.75$', '$7.5$'],
          answer: 2,
          working: '$\\Delta x = 0.5$: $0.5(0.25 + 1 + 2.25 + 4) = 0.5(7.5) = 3.75$',
        },
      ],
      lines: [
        { say: 'Your turn. Compute R 4, the right sum with 4 strips, for x squared on 0 to 2. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Delta x is 0.5, and the right ends are 0.5, 1, 1.5 and 2. Their squares add to 7.5, and times 0.5 that is 3.75. Choice C. 1.75 is the left sum.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\Delta x = \\dfrac{b - a}{n}$', 'Left sum: heights at the **left** ends', 'Area $= \\Delta x \\times$ (sum of heights)', 'More strips give a **better** estimate'] }],
      lines: [
        { say: 'Here is what to remember. Delta x is b minus "a", over n.', show: 'sum.0' },
        { say: 'A left sum uses the heights at the left ends.', show: 'sum.1' },
        { say: 'The area is delta x times the sum of the heights.', show: 'sum.2' },
        { say: 'And more strips give a better estimate. For more on Riemann sums and area, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
