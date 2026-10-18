import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { areaY } from './lib/m31-9-figures.ts';
import { dots, guide, numbers, path, plane, rect, sideways, tag } from './lib/m31-8-graphs.ts';

// The region between x = y² (left) and x = y + 2 (right), from y = −1 to y = 2: area 9/2.
const left = (y: number) => y * y;
const right = (y: number) => y + 2;
const g = plane({ x: [-1, 5], y: [-2, 3], xStep: 1, yStep: 1, every: 0, width: 6, height: 5 });
const ys = 0.45;
const sideways2 = figure('sw', [
  g,
  numbers(g, 1, 1),
  areaY(g, { id: 'A', right, left, from: -1, to: 2, tone: 'brand', shade: 0.3 }),
  rect(g, { id: 's', x0: left(ys), x1: right(ys), y0: ys - 0.06, y1: ys + 0.06, tone: 'theta', shade: 0.45 }),
  guide(g, 'split', [1, -1], [1, 3], 'muted'),
  path(g, { id: 'p', pts: sideways(left, -2, Math.sqrt(5)), tone: 'opp' }),
  path(g, { id: 'l', pts: [[0, -2], [5, 3]], tone: 'brand' }),
  tag(g, 'pn', 3.4, -1.25, 'x = y^2', 'center', 'opp'),
  tag(g, 'ln', 3.5, -0.32, 'x = y + 2', 'center', 'brand'),
  dots(g, [
    { id: 'P', x: 1, y: -1, tex: '', tone: 'theta', group: 'meet' },
    { id: 'Q', x: 4, y: 2, tex: '', tone: 'theta', group: 'meet' },
  ]),
]);

const video: Explainer = {
  id: 'm31-9-1-d',
  lessonId: 'm31-9-1',
  title: 'Area Between Curves, Part 4: Integrating with Respect to y',
  thumbnailTitle: 'Integrating with Respect to y',
  thumbnail: 'sw',
  summary: 'Some regions are easier to slice into horizontal strips: when the boundaries are given as x = g(y), or when a vertical strip would meet different curves in different parts. Then A = ∫꜀ᵈ [(right curve) − (left curve)] dy. For x = y² and x = y + 2, which meet at y = −1 and y = 2, the line is on the right and A = ∫₋₁² (y + 2 − y²) dy = 9/2; vertical strips would need two integrals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 4', title: 'Integrating with Respect to y', subtitle: 'Horizontal strips: right minus left' }],
      lines: [
        { say: 'Not every region is easiest to slice from top to bottom. Some regions are much simpler to cut into horizontal strips, from left to right.', show: 'title' },
        { say: 'In this video, you will find an area by integrating with respect to y, and see when that is the better choice.' },
      ],
    },
    {
      chapter: 'Horizontal strips',
      layout: 'split',
      leftWidth: 560,
      left: [sideways2],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Area with respect to y', md: 'If $x = f(y)$ is to the right of $x = g(y)$ for $c \\le y \\le d$, then' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = \\int_c^d \\big[f(y) - g(y)\\big]\\,dy', '= \\int_c^d \\big[(\\text{right}) - (\\text{left})\\big]\\,dy'] },
      ],
      lines: [
        { say: 'Here are two curves given as x in terms of y: the parabola x equals y squared, which opens to the right, and the line x equals y plus two.', show: ['sw.grid', 'sw.axes', 'sw.p', 'sw.l', 'sw.pn', 'sw.ln'] },
        { say: 'Cut the region between them into horizontal strips. A strip at height y reaches from the left curve to the right curve. Its length is right minus left, and its thickness is delta y.', show: ['sw.A', 'sw.s'], focus: 'sw.s' },
        { say: 'Adding the strips gives the area, now with respect to y. If x equals f of y is to the right of x equals g of y, from y equals c to y equals d, the area is the integral from c to d of f of y minus g of y, d y: right minus left.', show: ['def', 'm.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Limits and the right curve',
      layout: 'split',
      leftWidth: 560,
      left: [sideways2],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y^2 = y + 2', 'y^2 - y - 2 = 0', '(y - 2)(y + 1) = 0', 'y = -1 \\quad \\text{or} \\quad y = 2', 'y = 0\\colon \\quad \\text{line } 2, \\;\\; \\text{parabola } 0'] },
      ],
      lines: [
        { say: 'Find the area of the region enclosed by x equals y squared and x equals y plus two. Now the limits are y-values. Set the curves equal: y squared equals y plus two.', show: ['sw.grid', 'sw.axes', 'sw.p', 'sw.l', 'sw.pn', 'sw.ln', 'sw.A', 'sw.s', 'm.0'], focus: 'm.0' },
        { say: 'So y squared minus y minus two is zero, which factors as y minus two, times y plus one. The curves meet at y equals negative one and y equals two.', show: ['m.1', 'm.2', 'm.3', 'sw.meet'], focus: ['m.3', 'sw.meet'] },
        { say: 'Which curve is on the right? Test y equals zero. The line gives x equals two, and the parabola gives x equals zero. So the line is on the right.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The area',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['A = \\int_{-1}^{2} (y + 2 - y^2)\\,dy = \\Big[\\dfrac{y^2}{2} + 2y - \\dfrac{y^3}{3}\\Big]_{-1}^{2}', 'y = 2\\colon \\quad 2 + 4 - \\dfrac{8}{3} = \\dfrac{10}{3}, \\qquad y = -1\\colon \\quad \\dfrac{1}{2} - 2 + \\dfrac{1}{3} = -\\dfrac{7}{6}', 'A = \\dfrac{10}{3} - \\left(-\\dfrac{7}{6}\\right) = \\dfrac{27}{6} = \\dfrac{9}{2}'],
        },
      ],
      lines: [
        { say: 'So the area is the integral from negative one to two of, y plus two, minus y squared, d y. An antiderivative is y squared over two, plus two y, minus y cubed over three.', show: 'm.0', focus: 'm.0' },
        { say: 'At two, that is two, plus four, minus eight thirds: ten thirds. At negative one, it is one half, minus two, plus one third: negative seven sixths.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract: ten thirds minus, negative seven sixths, is twenty sixths plus seven sixths: twenty-seven sixths, which is nine halves square units.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Why not vertical strips?',
      layout: 'split',
      leftWidth: 560,
      left: [sideways2],
      right: [{ kind: 'text', id: 't', size: 'md', align: 'left', md: 'A vertical strip left of $x = 1$ runs between the two halves of the parabola; right of $x = 1$ it runs from the line up to the parabola. That would need **two** integrals.' }],
      lines: [
        { say: 'Why not use vertical strips here? Look at the region. To the left of x equals one, a vertical strip runs from the bottom half of the parabola to the top half.', show: ['sw', 'sw.split', 't'], focus: 'sw.split' },
        { say: 'To the right of x equals one, it runs from the line up to the parabola. The lower boundary changes, so vertical strips would need two separate integrals. Horizontal strips need only one.' },
        { say: 'So choose the strips that keep the same two boundaries all the way across. And when the curves are given as x in terms of y, horizontal strips are usually the natural choice.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the area of the region enclosed by $x = y^2$ and $x = 4$.',
          choices: ['$\\dfrac{32}{3}$', '$\\dfrac{16}{3}$', '$16$', '$\\dfrac{64}{3}$'],
          answer: 0,
          working: 'The curves meet at $y = -2$ and $y = 2$, and $x = 4$ is on the right: $\\int_{-2}^{2} (4 - y^2)\\,dy = \\Big[4y - \\dfrac{y^3}{3}\\Big]_{-2}^{2} = \\dfrac{16}{3} + \\dfrac{16}{3} = \\dfrac{32}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the area of the region enclosed by x equals y squared and x equals four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, thirty-two thirds. y squared equals four when y is negative two or two, and the line x equals four is on the right. The integral from negative two to two of four minus y squared is four y minus y cubed over three: sixteen thirds, minus negative sixteen thirds, which is thirty-two thirds.', show: 'q.answer' },
        { say: 'Choice B, sixteen thirds, covers only the half of the region above the x-axis, from y equals zero to two.' },
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
          items: ['A horizontal strip has length (right) $-$ (left) and thickness $\\Delta y$.', '$A = \\int_c^d \\big[(\\text{right}) - (\\text{left})\\big]\\,dy$, with $y$-values as limits.', 'Use horizontal strips when the curves are $x = g(y)$, or when vertical strips would need two integrals.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A horizontal strip has length right minus left, and thickness delta y.', show: 'sum.0' },
        { say: 'So the area is the integral of right minus left, d y, with y-values as the limits.', show: 'sum.1' },
        { say: 'Use horizontal strips when the curves are given as x in terms of y, or when vertical strips would need two integrals. In the next lesson, we spin regions around an axis, and find the volumes of the solids they make. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
