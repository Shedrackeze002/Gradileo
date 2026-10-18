import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tag, tangent } from './lib/m31-3-graphs.ts';

// y = x² with short tangent lines at x = −1, 0, 1 and 2: slopes 2x = −2, 0, 2 and 4.
const sq = (x: number) => x * x;
const g = plane({ x: [-2.5, 2.5], y: [-1, 6], xStep: 0.5, yStep: 1, every: 0, width: 7, height: 6 });
const at = [-1, 0, 1, 2];
const place = { '-1': 'below left', '0': 'below right', '1': 'below right', '2': 'below right' } as const;
const slopes = figure('sl', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'f', f: sq, tone: 'adj', samples: 200 }),
  ...at.map((x) => tangent(g, { id: `t${x}`, at: [x, sq(x)], m: 2 * x, ext: 0.4, weight: 3.5, group: `k${x}` })),
  ...at.map((x) => dots(g, [{ id: `p${x}`, x, y: sq(x), tone: 'good', group: `k${x}` }])),
  ...at.map((x) => tag(g, `m${x}`, x === 0 ? 0.05 : x, sq(x) - (x === 0 ? 0.05 : 0), `m = ${2 * x}`, place[String(x) as keyof typeof place], 'good', `k${x}`)),
]);

const video: Explainer = {
  id: 'm31-3-2',
  lessonId: 'm31-3-2',
  title: 'The Derivative from First Principles, Part 1: The Derivative Function',
  thumbnailTitle: 'The Derivative',
  thumbnail: 'sl',
  summary: 'Doing the tangent-slope calculation at a general point x gives a new function, the derivative: for f(x) = x², the slope of the tangent is 2x at every x. The definition f′(x) = lim (f(x + h) − f(x))/h as h → 0, what differentiable means, the notations f′(x), dy/dx, y′ and d/dx f(x), and the four steps of differentiating from first principles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 1', title: 'The Derivative', subtitle: 'The slope of the tangent, everywhere at once' }],
      lines: [
        { say: 'So far, we have found the slope of a tangent one point at a time, and each point took a whole calculation. What if you want the slope at every point at once?', show: 'title' },
        { say: 'In this video, you will meet the derivative: a new function that gives the slope of the tangent at every point of a curve.' },
      ],
    },
    {
      chapter: 'Every point at once',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'The slope of the tangent to $y = x^2$ at **any** point $x$' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{(x + h)^2 - x^2}{h} = \\dfrac{x^2 + 2xh + h^2 - x^2}{h}', '= \\dfrac{2xh + h^2}{h} = 2x + h', '\\lim_{h \\to 0}\\,(2x + h) = \\good{2x}'],
        },
      ],
      lines: [
        { say: 'Let’s find the slope of the tangent to y equals x squared, at a general point x, instead of at a number like one or three.', show: 'q' },
        { say: 'The secant slope is x plus h, all squared, minus x squared, over h. Expand: x plus h, all squared, is x squared, plus two x h, plus h squared.', show: 'm.0', focus: 'm.0' },
        { say: 'The x squared terms cancel, leaving two x h plus h squared, over h. Divide each term by h, to get two x plus h.', show: 'm.1', focus: 'm.1' },
        { say: 'As h approaches zero, two x plus h approaches two x. So at any point x, the slope of the tangent to y equals x squared is two x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Slopes everywhere',
      layout: 'split',
      leftWidth: 620,
      left: [slopes],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', 'Slope $2x$'],
          rows: [
            ['$-1$', '$-2$'],
            ['$0$', '$0$'],
            ['$1$', '$2$'],
            ['$2$', '$4$'],
            ['$3$', '$6$'],
          ],
        },
      ],
      lines: [
        { say: 'Now one formula gives every slope. At x equals one, the slope is two times one, which is two. That is the tangent we found by shrinking secant lines.', show: ['sl.grid', 'sl.axes', 'sl.f', 'sl.k1', 't.2'], focus: ['sl.k1', 't.2'] },
        { say: 'At x equals two, the slope is four. And at x equals three, it is six, the slope we found with a table of values.', show: ['sl.k2', 't.3', 't.4'], focus: ['sl.k2', 't.3', 't.4'] },
        { say: 'At x equals zero, the slope is zero: the tangent at the bottom of the curve is flat.', show: ['sl.k0', 't.1'], focus: ['sl.k0', 't.1'] },
        { say: 'And at x equals negative one, the slope is negative two. The curve is falling there, so its tangent slopes down.', show: ['sl.k-1', 't.0'], focus: ['sl.k-1', 't.0'] },
      ],
    },
    {
      chapter: 'The derivative',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Derivative', md: 'The **derivative** of $f$ is the function below, wherever the limit exists. If $f\'(a)$ exists, $f$ is **differentiable** at $x = a$, and $f\'(a)$ is the slope of the tangent at $(a, f(a))$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['f\'(x) = \\lim_{h \\to 0} \\dfrac{f(x + h) - f(x)}{h}'] },
      ],
      lines: [
        { say: 'The function that gives the slope of the tangent at every point is called the derivative of f. It is written f prime of x.', show: 'def' },
        { say: 'f prime of x is the limit as h approaches zero of f of x plus h, minus f of x, all over h, wherever this limit exists.', show: 'm', focus: 'm' },
        { say: 'It is the same limit as before, with the general point x in place of a number.' },
        { say: 'If f prime of "a" exists, we say that f is differentiable at x equals "a". Then f prime of "a" is the slope of the tangent where x equals "a".', focus: 'def' },
        { say: 'So the derivative is a function, and each of its values is a number: a slope. For y equals x squared, f prime of x is two x, and f prime of three is six.' },
      ],
    },
    {
      chapter: 'Notation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Notation', 'Said as'],
          rows: [
            ['$f\'(x)$', 'f prime of x'],
            ['$\\dfrac{dy}{dx}$', 'd y by d x: the derivative of $y$ with respect to $x$'],
            ['$y\'$', 'y prime'],
            ['$\\dfrac{d}{dx}f(x)$', 'd by d x of f of x'],
          ],
        },
      ],
      lines: [
        { say: 'You will see the derivative written in several ways. They all mean the same thing.', show: 't' },
        { say: 'f prime of x is the one we have used so far.', focus: 't.0' },
        { say: 'When the function is written y equals something, its derivative is often written d y by d x. It is read as the derivative of y with respect to x.', focus: 't.1' },
        { say: 'The letter d comes from delta. d y by d x is what delta y over delta x, the slope of a secant line, becomes in the limit.' },
        { say: 'You may also see y prime, or d by d x of f of x, which means: take the derivative of f of x.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'First principles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'For $f(x) = x^2$'],
          rows: [
            ['1. Write $f(x + h)$.', '$(x + h)^2 = x^2 + 2xh + h^2$'],
            ['2. Subtract $f(x)$ and simplify.', '$2xh + h^2$'],
            ['3. Divide by $h$ and cancel it.', '$2x + h$'],
            ['4. Let $h \\to 0$.', '$f\'(x) = 2x$'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'key', title: 'First principles', md: 'Finding a derivative from the limit definition is called differentiating **from first principles**.' },
      ],
      lines: [
        { say: 'Finding a derivative straight from the limit definition is called differentiating from first principles. It always takes four steps.', show: 'def' },
        { say: 'Step one: write f of x plus h. For x squared, that is x plus h, all squared, which expands to x squared, plus two x h, plus h squared.', show: 't.0', focus: 't.0' },
        { say: 'Step two: subtract f of x and simplify. Every term left should contain h. Here, two x h plus h squared.', show: 't.1', focus: 't.1' },
        { say: 'Step three: divide by h, and cancel it. Here, two x plus h.', show: 't.2', focus: 't.2' },
        { say: 'Step four: let h approach zero. Here, f prime of x is two x.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = x^2$, the derivative is $f\'(x) = 2x$. What is the slope of the tangent to $y = x^2$ at $x = -3$?',
          choices: ['$9$', '$6$', '$-6$', '$-9$'],
          answer: 2,
          working: 'The slope of the tangent at $x = -3$ is $f\'(-3) = 2(-3) = -6$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x squared, the derivative is f prime of x equals two x. What is the slope of the tangent to y equals x squared at x equals negative three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The slope is f prime of negative three, which is two times negative three: negative six. The curve is falling there. Choice A is f of negative three, the height of the graph, not its slope.', show: 'q.answer' },
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
          items: [
            'The derivative $f\'(x) = \\displaystyle\\lim_{h \\to 0} \\dfrac{f(x + h) - f(x)}{h}$ gives the slope of the tangent at every $x$.',
            'It is also written $\\dfrac{dy}{dx}$, $y\'$ and $\\dfrac{d}{dx}f(x)$.',
            'First principles: write $f(x + h)$, subtract $f(x)$, divide by $h$, let $h \\to 0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative, f prime of x, is the limit as h approaches zero of f of x plus h, minus f of x, over h. It gives the slope of the tangent at every x.', show: 'sum.0' },
        { say: 'It is also written d y by d x, y prime, and d by d x of f of x.', show: 'sum.1' },
        { say: 'And to differentiate from first principles: write f of x plus h, subtract f of x, divide by h, and let h approach zero. In the next part, we use these steps on a quadratic function. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
