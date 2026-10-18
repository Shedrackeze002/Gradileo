import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { each, numbers, plane, plot, rects, tag } from './lib/m31-8-graphs.ts';

// f(x) = x² + 1 on [0, 2]: midpoint sum 4.625, exact area 14/3.
const f = (x: number) => x * x + 1;
const g = plane({ x: [0, 2.5], y: [0, 6], xStep: 0.5, yStep: 1, every: 0, width: 6, height: 5 });
const mid = figure('M', [
  g,
  numbers(g, 0.5, 1),
  rects(g, { id: 'R', f, a: 0, b: 2, n: 4, rule: 'mid', heights: ['1.06', '1.56', '2.56', '4.06'] }),
  plot(g, { id: 'f', f, samples: 160 }),
  tag(g, 'name', 2.05, 5.6, 'y = x^2 + 1', 'left', 'brand'),
]);

// Left sums on a rising curve (too low) and on a falling one (too high).
const up = plane({ name: 'p1', x: [0, 2], y: [0, 5], xStep: 0.5, yStep: 1, every: 0, width: 4, height: 4 });
const down = plane({ name: 'p2', x: [0, 3], y: [0, 5], xStep: 0.5, yStep: 1, every: 0, width: 4, height: 4, at: [8, 0] });
const fall = (x: number) => 4 / (x + 1);
const compare = figure(
  'cmp',
  [
    up,
    rects(up, { id: 'L', f, a: 0, b: 2, n: 4, rule: 'left', tone: 'good', noDots: true }),
    plot(up, { id: 'f', f, samples: 120 }),
    tag(up, 'cap', 1, -0.9, '\\text{rising: too low}', 'center', 'good'),
    down,
    rects(down, { id: 'L', f: fall, a: 0, b: 3, n: 3, rule: 'left', tone: 'bad', noDots: true }),
    plot(down, { id: 'f', f: fall, samples: 120 }),
    tag(down, 'cap', 1.5, -0.9, '\\text{falling: too high}', 'center', 'bad'),
  ],
  330,
);

const video: Explainer = {
  id: 'm31-8-2-b',
  lessonId: 'm31-8-2',
  title: 'Riemann Sums and Area, Part 2: Midpoints and the Definite Integral',
  thumbnailTitle: 'Midpoint Sums and the Definite Integral',
  thumbnail: 'M',
  summary: 'A midpoint sum takes each height at the middle of its subinterval, so the errors partly cancel: for f(x) = x² + 1 on [0, 2], M₄ = 4.625, close to the exact 14/3 ≈ 4.667. On an increasing function left sums are too low and right sums too high, and the reverse on a decreasing one. As n grows, every sum closes in on the same number, the definite integral, the limit of the Riemann sums.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 2', title: 'Midpoint Sums and the Definite Integral', subtitle: 'Better estimates, and the exact area' }],
      lines: [
        { say: 'Left and right sums give an area that is too low or too high. There is a better choice of height, and with thinner and thinner rectangles, the estimates close in on the exact area.', show: 'title' },
        { say: 'In this video, you will find a midpoint sum, tell when a sum is too high or too low, and meet the definite integral.' },
      ],
    },
    {
      chapter: 'Midpoint sums',
      layout: 'split',
      leftWidth: 560,
      left: [mid],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 0.25,\\ 0.75,\\ 1.25,\\ 1.75', 'f(x) = 1.0625,\\ 1.5625,', '2.5625,\\ 4.0625', 'M_4 = 0.5(9.25) = 4.625'] },
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'The exact area is $\\dfrac{14}{3} \\approx 4.667$.' },
      ],
      lines: [
        { say: 'A midpoint sum takes each height at the middle of its subinterval. For x squared plus one, from zero to two, with four rectangles, the midpoints are 0.25, 0.75, 1.25 and 1.75.', show: ['M.grid', 'M.axes', 'M.f', 'M.name', 'm.0'], focus: 'm.0' },
        { say: 'The heights are 1.0625, 1.5625, 2.5625 and 4.0625.', show: ['m.1', 'm.2', ...each('M', 'R', 4)], focus: ['m.1', 'm.2', ...each('M', 'R', 4)] },
        { say: 'So M four is 0.5 times their sum, 9.25, which is 4.625 square units.', show: 'm.3', focus: 'm.3' },
        { say: 'Look at the top of each rectangle. Part of it sticks out above the curve, and part of it falls short. The errors partly cancel.', focus: 'M' },
        { say: 'The exact area turns out to be fourteen thirds, about 4.667, and the next lesson shows how to find it. The midpoint sum is much closer than either the left sum, 3.75, or the right sum, 5.75.', show: 't' },
      ],
    },
    {
      chapter: 'Too high or too low?',
      layout: 'center',
      main: [
        compare,
        {
          kind: 'bullets',
          id: 'b',
          items: ['$f$ increasing: $L_n$ is an **underestimate** and $R_n$ an **overestimate**.', '$f$ decreasing: $L_n$ is an **overestimate** and $R_n$ an **underestimate**.'],
        },
      ],
      lines: [
        { say: 'When f is increasing, the left end of each subinterval is its lowest point. So every left rectangle fits under the curve, and the left sum is an underestimate. Every right rectangle reaches above the curve, so the right sum is an overestimate.', show: ['cmp.p1-grid', 'cmp.p1-axes', 'cmp.p1-f', ...each('cmp', 'p1-L', 4), 'cmp.p1-cap', 'b.0'], focus: 'b.0' },
        { say: 'When f is decreasing, it is the other way round. The left end is now the highest point, so the left rectangles stick out above the curve: the left sum is an overestimate, and the right sum is an underestimate.', show: ['cmp.p2-grid', 'cmp.p2-axes', 'cmp.p2-f', ...each('cmp', 'p2-L', 3), 'cmp.p2-cap', 'b.1'], focus: 'b.1' },
        { say: 'And if f rises and then falls on the interval, a left or right sum could go either way.' },
      ],
    },
    {
      chapter: 'Thinner rectangles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['$n$', '$L_n$', '$R_n$', '$M_n$'],
          rows: [
            ['$4$', '$3.7500$', '$5.7500$', '$4.62500$'],
            ['$10$', '$4.2800$', '$5.0800$', '$4.66000$'],
            ['$100$', '$4.6268$', '$4.7068$', '$4.66660$'],
            ['$1{,}000$', '$4.6627$', '$4.6707$', '$4.66667$'],
          ],
        },
      ],
      lines: [
        { say: 'Now make the rectangles thinner. Here are the three sums for x squared plus one, from zero to two, as n grows.', show: 't.0', focus: 't.0' },
        { say: 'With ten rectangles, the left sum is 4.28, the right sum is 5.08, and the midpoint sum is 4.66.', show: 't.1', focus: 't.1' },
        { say: 'With 100 rectangles, the left and right sums are within 0.05 of 4.667, and the midpoint sum is closer still.', show: 't.2', focus: 't.2' },
        { say: 'With 1,000 rectangles, all three agree to about two decimal places. As the rectangles get thinner, every sum closes in on the same number: the exact area, fourteen thirds.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'The definite integral',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Definite integral', md: 'The limit of the Riemann sums as $n \\to \\infty$ is the **definite integral** of $f$ from $a$ to $b$. For a continuous $f$, it is the same for every choice of sample points.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x', '\\int_0^2 (x^2 + 1)\\,dx = \\dfrac{14}{3}'] },
      ],
      lines: [
        { say: 'That number has a name. The limit of the Riemann sums, as n goes to infinity, is called the definite integral of f, from "a" to b.', show: 'def' },
        { say: 'It is written with the same integral sign as before, but now with "a" at the bottom and b at the top. The tall S stands for sum, and the d x is what is left of delta x as the rectangles get infinitely thin.', show: 'm.0', focus: 'm.0' },
        { say: 'For a continuous function, the limit exists, and it is the same whether you use left ends, right ends or midpoints.' },
        { say: 'So the integral from zero to two of x squared plus one, d x, is fourteen thirds: the exact area under the curve. In the next lesson, you will find it without adding up a single rectangle.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = 9 - x^2$ on $[0, 3]$, which statement is true?',
          choices: ['$L_n$ is an underestimate and $R_n$ an overestimate.', 'Both $L_n$ and $R_n$ are overestimates.', '$L_n$ is an overestimate and $R_n$ an underestimate.', 'Both $L_n$ and $R_n$ are underestimates.'],
          answer: 2,
          working: 'On $[0, 3]$, $f$ decreases from $9$ to $0$, so each left end is the highest point of its subinterval and each right end the lowest.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals nine minus x squared, from zero to three, which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. On this interval, f decreases from nine down to zero. So each left end is the highest point of its subinterval, and the left rectangles reach above the curve: an overestimate. The right rectangles fit under it: an underestimate.', show: 'q.answer' },
        { say: 'Choice A would be true for an increasing function.' },
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
          items: ['A midpoint sum takes each height at the middle; it is usually the most accurate.', 'Increasing $f$: left sums too low, right sums too high. Decreasing $f$: the reverse.', 'As $n$ grows, every sum closes in on the same number.', 'That limit is the definite integral $\\int_a^b f(x)\\,dx$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A midpoint sum takes each height at the middle of its subinterval, and is usually the most accurate of the three.', show: 'sum.0' },
        { say: 'For an increasing function, left sums are too low and right sums too high. For a decreasing function, it is the reverse.', show: 'sum.1' },
        { say: 'As the number of rectangles grows, every sum closes in on the same number.', show: 'sum.2' },
        { say: 'And that limit is the definite integral of f from "a" to b. In the next part, we estimate a distance from real measurements. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
