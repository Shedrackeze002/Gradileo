import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, plane, plot, tangent } from './lib/m31-3-graphs.ts';

// y = (x² + 3)/(x − 1), with horizontal tangents at (−1, −2) and (3, 6), and its asymptote x = 1.
const y = (x: number) => (x * x + 3) / (x - 1);
const g = plane({ x: [-4, 6], y: [-10, 14], xStep: 1, yStep: 2, every: 0, width: 6.4, height: 6.4 });
const quot = figure('qt', [
  g,
  numbers(g, 2, 4),
  guide(g, 'asym', [1, -10], [1, 14], 'muted'),
  plot(g, { id: 'fl', f: y, from: -4, to: 0.9, tone: 'adj', samples: 300 }),
  plot(g, { id: 'fr', f: y, from: 1.1, to: 6, tone: 'adj', samples: 300 }),
  tangent(g, { id: 'tA', at: [-1, -2], m: 0, ext: 1.2, group: 'A' }),
  tangent(g, { id: 'tB', at: [3, 6], m: 0, ext: 1.2, group: 'B' }),
  dots(g, [
    { id: 'pA', x: -1, y: -2, tone: 'good', group: 'A' },
    { id: 'pB', x: 3, y: 6, tone: 'good', group: 'B' },
  ]),
]);

// The medication: C(t) = 50t/(t² + 4) mg/L, rising at 6 mg/L per hour at t = 1 and falling at about 1.48 at t = 3.
const C = (t: number) => (50 * t) / (t * t + 4);
const gc = plane({ x: [0, 8], y: [0, 14], xStep: 1, yStep: 2, every: 0, width: 7, height: 6, titles: { x: '\\text{Time (h)}', y: '\\text{Concentration (mg/L)}' } });
const med = figure('md', [
  gc,
  numbers(gc, 1, 2),
  plot(gc, { id: 'C', f: C, tone: 'adj', samples: 200 }),
  tangent(gc, { id: 't1', at: [1, C(1)], m: 6, ext: 0.6, tone: 'theta', group: 'k1' }),
  tangent(gc, { id: 't3', at: [3, C(3)], m: -250 / 169, ext: 1.3, tone: 'opp', group: 'k3' }),
  dots(gc, [
    { id: 'p1', x: 1, y: C(1), tone: 'theta', group: 'k1' },
    { id: 'p3', x: 3, y: C(3), tone: 'opp', group: 'k3' },
  ]),
]);

const video: Explainer = {
  id: 'm31-4-2-e',
  lessonId: 'm31-4-2',
  title: 'The Product and Quotient Rules, Part 5: Horizontal Tangents and Rates',
  thumbnailTitle: 'Quotients: Tangents and Rates',
  thumbnail: 'qt',
  summary: 'Applications of the quotient rule: y = (x² + 3)/(x − 1) has dy/dx = (x² − 2x − 3)/(x − 1)², which is zero where its numerator is zero, giving horizontal tangents at (−1, −2) and (3, 6); and a medication concentration C(t) = 50t/(t² + 4) mg/L has C′(1) = 6 and C′(3) ≈ −1.48 mg/L per hour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 5', title: 'Horizontal Tangents and Rates', subtitle: 'Putting the quotient rule to work' }],
      lines: [
        { say: 'With the quotient rule, you can answer new kinds of questions. Where does the graph of a fraction level off? And how fast is a quantity changing, when its formula is a fraction?', show: 'title' },
        { say: 'In this video, you will find the horizontal tangents of a quotient, and the rate of change of the concentration of a medication.' },
      ],
    },
    {
      chapter: 'The derivative',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find the points where $y = \\dfrac{x^{2} + 3}{x - 1}$ has a horizontal tangent.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'u = x^{2} + 3, \\quad u\' = 2x \\qquad v = x - 1, \\quad v\' = 1',
            '\\dfrac{dy}{dx} = \\dfrac{2x(x - 1) - (x^{2} + 3)(1)}{(x - 1)^{2}}',
            '= \\dfrac{2x^{2} - 2x - x^{2} - 3}{(x - 1)^{2}} = \\dfrac{x^{2} - 2x - 3}{(x - 1)^{2}}',
          ],
        },
      ],
      lines: [
        { say: 'Find the points where y equals x squared plus three, over x minus one, has a horizontal tangent.', show: 'q' },
        { say: 'First, find the derivative with the quotient rule. The top is u equals x squared plus three, with u prime equals two x. The bottom is v equals x minus one, with v prime equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'Low, d high, minus high, d low: two x times x minus one, minus x squared plus three, times one, all over x minus one, squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Simplify the top: two x squared minus two x, minus x squared minus three, which is x squared minus two x minus three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Where it is zero',
      layout: 'split',
      leftWidth: 540,
      left: [quot],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['x^{2} - 2x - 3 = 0', '(x - 3)(x + 1) = 0', 'x = 3 \\ \\text{ or } \\ x = -1', 'y(3) = \\dfrac{12}{2} = 6', 'y(-1) = \\dfrac{4}{-2} = -2'],
        },
      ],
      lines: [
        { say: 'A horizontal tangent has slope zero. A fraction is zero when its top is zero, and its bottom is not. So set the numerator equal to zero.', show: ['qt.grid', 'qt.axes', 'qt.fl', 'qt.fr', 'qt.asym', 'm.0'], focus: 'm.0' },
        { say: 'Factor: x minus three, times x plus one. So x is three, or negative one.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Find the y-values from the original function. At x equals three, y is twelve over two, which is six.', show: ['m.3', 'qt.B'], focus: ['m.3', 'qt.B'] },
        { say: 'At x equals negative one, y is four over negative two, which is negative two. So the horizontal tangents are at the point at negative one, negative two, and at the point at three, six.', show: ['m.4', 'qt.A'], focus: ['m.4', 'qt.A'] },
        { say: 'On the graph, these are the top of the left branch and the bottom of the right branch. The dashed line at x equals one is where the function is not defined.', focus: 'qt.asym' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Setting the bottom to zero', md: 'A fraction is zero only when its **numerator** is zero. Setting the denominator $(x - 1)^2$ to zero gives $x = 1$, where the function is not even defined.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{x^{2} - 2x - 3 = 0 \\;\\Rightarrow\\; x = -1,\\ 3}', '\\bad{(x - 1)^{2} = 0 \\;\\Rightarrow\\; x = 1 \\text{ (undefined)}}'] },
      ],
      lines: [
        { say: 'To find where a fraction is zero, set only its numerator equal to zero.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Setting the denominator to zero gives x equals one. But there, the function and its derivative are not defined at all: dividing by zero is impossible. That is the vertical asymptote, not a horizontal tangent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A medication',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The concentration of a medication in the blood is $C(t) = \\dfrac{50t}{t^{2} + 4}$ mg/L, $t$ hours after an injection. Find $C\'(1)$ and $C\'(3)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['C\'(t) = \\dfrac{50(t^{2} + 4) - 50t(2t)}{(t^{2} + 4)^{2}}', '= \\dfrac{50t^{2} + 200 - 100t^{2}}{(t^{2} + 4)^{2}} = \\dfrac{50(4 - t^{2})}{(t^{2} + 4)^{2}}'],
        },
      ],
      lines: [
        { say: 'Now a rate of change. The concentration of a medication in the blood is C of t equals 50 t over t squared plus four, in milligrams per litre, t hours after an injection. Find C prime of one and C prime of three.', show: 'q' },
        { say: 'By the quotient rule, C prime of t is 50 times t squared plus four, minus 50 t times two t, all over t squared plus four, squared.', show: 'm.0', focus: 'm.0' },
        { say: 'On the top, 50 t squared plus 200, minus 100 t squared, is 200 minus 50 t squared. Factor out 50: 50 times four minus t squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Rising, then falling',
      layout: 'split',
      leftWidth: 560,
      left: [med],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C\'(1) = \\dfrac{50(3)}{5^{2}} = 6', 'C\'(3) = \\dfrac{50(-5)}{13^{2}} \\approx -1.48'] },
        { kind: 'bullets', id: 'b', items: ['After $1$ h: rising at $6$ mg/L per hour.', 'After $3$ h: falling at about $1.48$ mg/L per hour.'] },
      ],
      lines: [
        { say: 'Here is the graph of the concentration. It rises quickly after the injection, then slowly falls.', show: ['md.grid', 'md.axes', 'md.C'] },
        { say: 'At one hour, C prime of one is 50 times three, over five squared: 150 over 25, which is six.', show: ['m.0', 'md.k1'], focus: ['m.0', 'md.t1'] },
        { say: 'It is positive, so the concentration is rising, at six milligrams per litre per hour.', show: 'b.0' },
        { say: 'At three hours, C prime of three is 50 times negative five, over thirteen squared: negative 250 over 169, which is about negative 1.48.', show: ['m.1', 'md.k3'], focus: ['m.1', 'md.t3'] },
        { say: 'It is negative, so the concentration is falling, at about 1.48 milligrams per litre per hour.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $C(t) = \\dfrac{50t}{t^{2} + 4}$, the derivative is $C\'(t) = \\dfrac{50(4 - t^{2})}{(t^{2} + 4)^{2}}$. At what time $t > 0$ does the concentration stop rising?',
          choices: ['$t = 2$ h', '$t = 4$ h', '$t = 0$ h', '$t = 1$ h'],
          answer: 0,
          working: 'It stops rising when $C\'(t) = 0$, so when the numerator is zero: $4 - t^{2} = 0$, $t^{2} = 4$, and $t = 2$ h (since $t > 0$).',
        },
      ],
      lines: [
        { say: 'Your turn. For this concentration, the derivative is 50 times four minus t squared, over t squared plus four, squared. At what time does the concentration stop rising? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The concentration stops rising when its derivative is zero, so when the numerator is zero: four minus t squared equals zero. So t squared is four, and t is two hours. Choice B forgets to take the square root.', show: 'q.answer' },
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
          items: ['A horizontal tangent of a quotient: set the numerator of $\\dfrac{dy}{dx}$ to zero.', 'Find the points by substituting into the original function.', 'The sign of the derivative tells you whether a quantity is rising or falling.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the horizontal tangents of a quotient, set the numerator of its derivative equal to zero.', show: 'sum.0' },
        { say: 'Then find the points by substituting into the original function.', show: 'sum.1' },
        { say: 'And the sign of a derivative tells you whether a quantity is rising or falling. In the next lesson, we meet the chain rule, for functions inside other functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
