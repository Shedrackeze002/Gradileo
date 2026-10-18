import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tag, tangent } from './lib/m31-3-graphs.ts';

// f(x) = x² − 4x (blue) and its derivative f′(x) = 2x − 4 (orange).
const f = (x: number) => x * x - 4 * x;
const g = plane({ x: [-1, 5], y: [-6, 6], every: 0, width: 6, height: 7.2 });
const both = figure('fd', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'f', f, tone: 'adj', samples: 200 }),
  plot(g, { id: 'd', f: (x) => 2 * x - 4, tone: 'opp' }),
  tag(g, 'f-t', 4.62, 2.85, 'f', 'below right', 'adj'),
  tag(g, 'd-t', 0.05, -4.3, "f'", 'below right', 'opp'),
  tangent(g, { id: 'flat', at: [2, -4], m: 0, ext: 0.8, weight: 3 }),
  dots(g, [
    { id: 'V', x: 2, y: -4, tex: '(2, -4)', tone: 'good', place: 'below' },
    { id: 'Z', x: 2, y: 0, tex: '(2, 0)', tone: 'opp', place: 'above left' },
  ]),
]);

const video: Explainer = {
  id: 'm31-3-2-b',
  lessonId: 'm31-3-2',
  title: 'The Derivative from First Principles, Part 2: A Quadratic',
  thumbnailTitle: 'Derivative of a Quadratic',
  thumbnail: 'fd',
  summary: 'Differentiating f(x) = x² − 4x from first principles in four steps, f′(x) = 2x − 4 and f′(3) = 2; reading the graphs of f and f′ together (f′ is negative where f falls, zero at the vertex and positive where f rises); and why f(x) must be subtracted inside brackets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 2', title: 'A Quadratic from First Principles', subtitle: 'Four steps, and what the derivative shows' }],
      lines: [
        { say: 'The four steps of first principles work on any function. Let’s use them on a function with two terms, and then see what its derivative tells us about its graph.', show: 'title' },
        { say: 'In this video, you will differentiate f of x equals x squared minus four x from first principles, and compare the graphs of a function and its derivative.' },
      ],
    },
    {
      chapter: 'Steps 1 and 2',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $f\'(x)$ for $f(x) = x^2 - 4x$, then find $f\'(3)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x + h) = (x + h)^2 - 4(x + h)', '= x^2 + 2xh + h^2 - 4x - 4h', 'f(x + h) - f(x) = x^2 + 2xh + h^2 - 4x - 4h - (x^2 - 4x)', '= 2xh + h^2 - 4h'],
        },
      ],
      lines: [
        { say: 'Find f prime of x for f of x equals x squared minus four x, and then find f prime of three.', show: 'q' },
        { say: 'Step one: write f of x plus h. Replace every x with x plus h: x plus h, all squared, minus four times x plus h.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand. x plus h, all squared, is x squared, plus two x h, plus h squared. And four times x plus h is four x plus four h, so we subtract both.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two: subtract f of x. Put all of f of x in brackets, x squared minus four x, so the minus sign reaches both terms.', show: 'm.2', focus: 'm.2' },
        { say: 'The x squared terms cancel, and minus four x and plus four x cancel. What is left is two x h, plus h squared, minus four h. Every term contains h, which is a good sign.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Steps 3 and 4',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{f(x + h) - f(x)}{h} = \\dfrac{2xh + h^2 - 4h}{h} = 2x + h - 4', 'f\'(x) = \\lim_{h \\to 0}\\,(2x + h - 4) = \\good{2x - 4}', 'f\'(3) = 2(3) - 4 = \\good{2}'],
        },
      ],
      lines: [
        { say: 'Step three: divide by h. Each term on the top contains h, so each one divides cleanly: two x, plus h, minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Step four: let h approach zero. The h disappears, and f prime of x equals two x minus four.', show: 'm.1', focus: 'm.1' },
        { say: 'Now substitute three. f prime of three is two times three, minus four, which is two. So the tangent at x equals three has slope two.', show: 'm.2', focus: 'm.2' },
        { say: 'Compare this with the average rate of change from one to four, which was one. That was the slope of a secant line over an interval. Two is the slope of the tangent at the single point where x equals three.' },
      ],
    },
    {
      chapter: 'A function and its derivative',
      layout: 'split',
      leftWidth: 560,
      left: [both],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Blue: $f(x) = x^2 - 4x$. Orange: $f\'(x) = 2x - 4$.',
            'Where $f$ falls ($x < 2$), $f\'(x)$ is negative.',
            'At the vertex the tangent is flat: $f\'(2) = 0$.',
            'Where $f$ rises ($x > 2$), $f\'(x)$ is positive.',
          ],
        },
      ],
      lines: [
        { say: 'Here are both graphs. In blue is f of x equals x squared minus four x, a parabola. In orange is its derivative, f prime of x equals two x minus four, a straight line.', show: ['fd.grid', 'fd.axes', 'fd.f', 'fd.f-t', 'fd.d', 'fd.d-t', 'b.0'] },
        { say: 'To the left of x equals two, the parabola falls, so its tangents slope down. There, the orange line is below the x-axis: the derivative is negative.', show: 'b.1', focus: ['fd.f', 'b.1'] },
        { say: 'At the vertex, the point at two, negative four, the tangent is flat, with slope zero. So the derivative is zero there: the orange line crosses the x-axis at two.', show: ['fd.V', 'fd.flat', 'fd.Z', 'b.2'], focus: ['fd.flat', 'fd.Z', 'b.2'] },
        { say: 'To the right of x equals two, the parabola rises, and the derivative is positive. And the steeper the parabola, the bigger the derivative.', show: 'b.3', focus: ['fd.d', 'b.3'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Brackets when subtracting', md: 'Write $f(x + h) - (x^2 - 4x)$ **with brackets**, so the $-4x$ becomes $+4x$. Without them, a term with no $h$ is left over, and the limit will not work out.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\bad{\\dots - x^2 - 4x \\;\\Rightarrow\\; 2xh + h^2 - 4h - 8x}', '\\good{\\dots - (x^2 - 4x) \\;\\Rightarrow\\; 2xh + h^2 - 4h}'],
        },
      ],
      lines: [
        { say: 'Watch the brackets in step two. A common mistake is to write minus x squared minus four x, with no brackets.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Then the minus sign only reaches the x squared. You end up with minus four x, minus another four x: negative eight x. That term has no h in it, so it will not cancel when you divide by h, and the limit will not work out.' },
        { say: 'With brackets, minus four x becomes plus four x, and the x terms cancel. A good check: after step two, every term must contain h.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $f\'(x)$ from first principles for $f(x) = x^2 + 6x$.',
          choices: ['$2x + 6$', '$2x + 6 + h$', '$x^2 + 6$', '$2x$'],
          answer: 0,
          working: '$f(x + h) - f(x) = x^2 + 2xh + h^2 + 6x + 6h - (x^2 + 6x) = 2xh + h^2 + 6h$. Divide by $h$: $2x + h + 6$. Let $h \\to 0$: $f\'(x) = 2x + 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find f prime of x from first principles, for f of x equals x squared plus six x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. f of x plus h, minus f of x, simplifies to two x h, plus h squared, plus six h. Divide by h to get two x, plus h, plus six, then let h approach zero: two x plus six. Choice B stops before letting h approach zero.', show: 'q.answer' },
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
            'For $f(x) = x^2 - 4x$: $f\'(x) = 2x - 4$, and $f\'(3) = 2$.',
            'Where $f$ falls, $f\' < 0$; where its tangent is flat, $f\' = 0$; where it rises, $f\' > 0$.',
            'Subtract $f(x)$ in brackets: after step two, every term contains $h$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For f of x equals x squared minus four x, the derivative is two x minus four, and f prime of three is two.', show: 'sum.0' },
        { say: 'Where a function falls, its derivative is negative. Where its tangent is flat, the derivative is zero. And where it rises, the derivative is positive.', show: 'sum.1' },
        { say: 'And subtract f of x in brackets, so that after step two, every term contains h. In the next part, we differentiate x cubed, and spot a pattern. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
