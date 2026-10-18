import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { each, guide, named, numbers, plane, plot, rect, rects, tag } from './lib/m31-8-graphs.ts';

// A cyclist at a steady 6 m/s for 10 s: the 60 m is the area of a rectangle under the velocity graph.
const c = named(plane({ x: [0, 12], y: [0, 8], xStep: 1, yStep: 1, every: 0, width: 7, height: 4.5 }), 't', 'v');
const cyclist = figure('cy', [
  c,
  numbers(c, 2, 2),
  rect(c, { id: 'area', x0: 0, x1: 10, y0: 0, y1: 6, tone: 'theta', shade: 0.25, outline: false }),
  guide(c, 'v', [0, 6], [10, 6], 'brand', { dashed: false, weight: 4 }),
  tag(c, 'text', 5, 3, '6 \\times 10 = 60', 'center', 'ink'),
]);

// f(x) = x² + 1 on [0, 2] with four rectangles: left sum 3.75, right sum 5.75.
const f = (x: number) => x * x + 1;
const sums = (id: string, rule: 'left' | 'right', heights: string[]) => {
  const g = plane({ x: [0, 2.5], y: [0, 6], xStep: 0.5, yStep: 1, every: 0, width: 6, height: 5 });
  return figure(id, [g, numbers(g, 0.5, 1), rects(g, { id: 'R', f, a: 0, b: 2, n: 4, rule, heights }), plot(g, { id: 'f', f, samples: 160 }), tag(g, 'name', 2.05, 5.6, 'y = x^2 + 1', 'left', 'brand')]);
};

const video: Explainer = {
  id: 'm31-8-2',
  lessonId: 'm31-8-2',
  title: 'Riemann Sums and Area, Part 1: Left and Right Sums',
  thumbnailTitle: 'Left and Right Riemann Sums',
  thumbnail: 'L',
  summary: 'The area under a rate graph is the total amount, and a Riemann sum estimates it with rectangles of width Δx = (b − a)/n. For f(x) = x² + 1 on [0, 2] with n = 4, the left sum is 0.5(1 + 1.25 + 2 + 3.25) = 3.75 and the right sum is 0.5(1.25 + 2 + 3.25 + 5) = 5.75; and why a left sum uses the first n endpoints and a right sum the last n.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 1', title: 'Left and Right Riemann Sums', subtitle: 'Estimating an area with rectangles' }],
      lines: [
        { say: 'At a steady speed, distance is speed times time. But what if the speed keeps changing? Then the answer is an area under a curve, and rectangles can estimate it.', show: 'title' },
        { say: 'In this video, you will see why the area under a rate graph is a total, and estimate it with left and right Riemann sums.' },
      ],
    },
    {
      chapter: 'Area under a rate graph',
      layout: 'split',
      leftWidth: 560,
      left: [cyclist],
      right: [
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'A cyclist rides at a steady $6$ m/s for $10$ s: $6 \\times 10 = 60$ m.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area is the total', md: 'The area under a graph of a **rate** against time is the **total amount**.' },
      ],
      lines: [
        { say: 'A cyclist rides at a steady six metres per second for ten seconds, and travels six times ten: 60 metres.', show: ['t', 'cy.grid', 'cy.axes', 'cy.v'] },
        { say: 'On a graph of velocity against time, that is the area of a rectangle six high and ten wide.', show: ['cy.area', 'cy.text'], focus: 'cy.area' },
        { say: 'The same is true for any rate. The area under a graph of a rate against time is the total amount: metres from a velocity, litres from a flow rate, barrels of oil from a production rate.', show: 'key' },
        { say: 'When the rate changes, the top of the region is curved. To estimate its area, cut the interval into thin strips, replace each strip with a rectangle, and add up the areas of the rectangles.' },
      ],
    },
    {
      chapter: 'Riemann sums',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Riemann sum', md: 'Divide $[a, b]$ into $n$ subintervals of equal width $\\Delta x = \\dfrac{b - a}{n}$, and choose a sample point $x_i^*$ in each one. Each rectangle has height $f(x_i^*)$ and width $\\Delta x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x = \\Delta x\\left[f(x_1^*) + f(x_2^*) + \\dots + f(x_n^*)\\right]'] },
      ],
      lines: [
        { say: 'Here is the method in general. Divide the interval from "a" to b into n subintervals of equal width. The width is delta x, which is b minus "a", over n.', show: 'def' },
        { say: 'In each subinterval, choose a sample point, x i star. The rectangle there has height f of x i star, and width delta x.' },
        { say: 'Add up the areas of all n rectangles. The capital Greek letter sigma means add them all up: the sum, from i equals one to n, of f of x i star, times delta x.', show: 'm.0', focus: 'm.0' },
        { say: 'Every rectangle has the same width, so you can factor it out: delta x, times the sum of the heights. This is called a Riemann sum, after the mathematician Bernhard Riemann.' },
      ],
    },
    {
      chapter: 'A left sum',
      layout: 'split',
      leftWidth: 560,
      left: [sums('L', 'left', ['1', '1.25', '2', '3.25'])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\Delta x = \\dfrac{2 - 0}{4} = 0.5', '\\text{left ends: } 0,\\ 0.5,\\ 1,\\ 1.5', 'L_4 = 0.5(1 + 1.25 + 2 + 3.25)', '= 0.5(7.5) = 3.75'] },
      ],
      lines: [
        { say: 'Estimate the area under f of x equals x squared plus one, from zero to two, with four rectangles.', show: ['L.grid', 'L.axes', 'L.f', 'L.name'] },
        { say: 'The width of each is two minus zero, over four: 0.5. So the subintervals are zero to 0.5, 0.5 to one, one to 1.5, and 1.5 to two.', show: 'm.0', focus: 'm.0' },
        { say: 'A left sum takes each height at the left end of its subinterval: at zero, 0.5, one and 1.5.', show: ['m.1', ...each('L', 'R', 4)], focus: 'm.1' },
        { say: 'The heights are f of zero, which is one; f of 0.5, which is 1.25; f of one, which is two; and f of 1.5, which is 3.25.', focus: each('L', 'R', 4) },
        { say: 'So the left sum, L four, is 0.5 times, one plus 1.25 plus two plus 3.25. That is 0.5 times 7.5: 3.75 square units. The curve is rising, so each left rectangle fits under it.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A right sum',
      layout: 'split',
      leftWidth: 560,
      left: [sums('Rt', 'right', ['1.25', '2', '3.25', '5'])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{right ends: } 0.5,\\ 1,\\ 1.5,\\ 2', 'R_4 = 0.5(1.25 + 2 + 3.25 + 5)', '= 0.5(11.5) = 5.75'] },
      ],
      lines: [
        { say: 'A right sum takes each height at the right end of its subinterval instead: at 0.5, one, 1.5 and two.', show: ['Rt.grid', 'Rt.axes', 'Rt.f', 'Rt.name', 'm.0', ...each('Rt', 'R', 4)], focus: 'm.0' },
        { say: 'The heights are 1.25, two, 3.25, and f of two, which is five.', focus: each('Rt', 'R', 4) },
        { say: 'So R four is 0.5 times, 1.25 plus two plus 3.25 plus five. That is 0.5 times 11.5: 5.75 square units.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'This time, each rectangle reaches above the rising curve. So the true area is somewhere between the left sum, 3.75, and the right sum, 5.75.', focus: 'Rt' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting endpoints', md: 'With $n$ subintervals there are $n + 1$ endpoints. A left sum uses the **first** $n$ (not $b$), and a right sum uses the **last** $n$ (not $a$). Using all $n + 1$ adds an extra rectangle.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\underbrace{0,\\ 0.5,\\ 1,\\ 1.5}_{\\text{left}},\\ 2 \\qquad 0,\\ \\underbrace{0.5,\\ 1,\\ 1.5,\\ 2}_{\\text{right}}'] },
      ],
      lines: [
        { say: 'A common mistake is to use every endpoint. Four subintervals have five endpoints: zero, 0.5, one, 1.5 and two.', show: 'oops' },
        { say: 'A left sum uses the first four, and leaves out the last one, b. A right sum uses the last four, and leaves out the first one, "a". Using all five would add a fifth rectangle that is not there.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Estimate the area under $f(x) = x^2$ on $[0, 4]$ with a **right** sum and $n = 4$.',
          choices: ['$30$', '$14$', '$21.3$', '$60$'],
          answer: 0,
          working: '$\\Delta x = 1$, and the right ends $1, 2, 3, 4$ give heights $1, 4, 9, 16$: $R_4 = 1(1 + 4 + 9 + 16) = 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. Estimate the area under f of x equals x squared, from zero to four, with a right sum and four rectangles. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 30. The width is four over four, which is one. The right ends are one, two, three and four, with heights one, four, nine and sixteen. So R four is one times 30: 30.', show: 'q.answer' },
        { say: 'Choice B, fourteen, is the left sum: it uses zero, one, two and three, and leaves out four.' },
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
          items: ['The area under a rate graph is the total amount.', 'A Riemann sum adds rectangles of width $\\Delta x = \\dfrac{b - a}{n}$.', 'Left sums use the left ends; right sums use the right ends.', '$n$ rectangles use $n$ of the $n + 1$ endpoints.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The area under a graph of a rate is the total amount.', show: 'sum.0' },
        { say: 'A Riemann sum estimates that area with rectangles of width delta x, which is b minus "a", over n.', show: 'sum.1' },
        { say: 'A left sum takes each height at the left end of its subinterval, and a right sum at the right end.', show: 'sum.2' },
        { say: 'And n rectangles use n of the n plus one endpoints. In the next part, we try the midpoints, and see what happens as the rectangles get thinner. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
