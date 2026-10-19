import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tangent } from './lib/m31-3-graphs.ts';

// f(x) = x² and its tangent at (3, 9), with slope 6.
const sq = (x: number) => x * x;
const g = plane({ x: [0, 4.5], y: [0, 18], xStep: 0.5, yStep: 2, every: 0, width: 7, height: 6 });
const tan3 = figure('tg', [
  g,
  numbers(g, 1, 4),
  plot(g, { id: 'f', f: sq, tone: 'adj', samples: 200 }),
  tangent(g, { id: 'tan', at: [3, 9], m: 6 }),
  dots(g, [{ id: 'P', x: 3, y: 9, tex: '(3, 9)', tone: 'good', place: 'above left' }]),
]);

const video: Explainer = {
  id: 'm31-3-1-e',
  lessonId: 'm31-3-1',
  title: 'Rates of Change and Tangent Lines, Part 5: Estimating a Tangent’s Slope',
  thumbnailTitle: 'Slope of a Tangent',
  thumbnail: 'tg',
  summary: 'Estimating the slope of the tangent to f(x) = x² at x = 3 with a table of secant slopes for small positive and negative h (6.1, 6.01, 6.001 and 5.9, 5.99, 5.999), then finding it exactly by simplifying ((3 + h)² − 9)/h to 6 + h before letting h approach 0: the slope is 6. Why putting h = 0 in too early gives 0/0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 5', title: 'Estimating a Tangent’s Slope', subtitle: 'With a table, then exactly with algebra' }],
      lines: [
        { say: 'The slope of a tangent line is a limit: the number that the secant slopes approach as h shrinks to zero. There are two ways to find it.', show: 'title' },
        { say: 'In this video, you will estimate the slope of a tangent with a table of values, and then find it exactly with algebra.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Estimate the slope of the tangent to $f(x) = x^2$ at $x = 3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = \\lim_{h \\to 0} \\dfrac{f(3 + h) - f(3)}{h}', 'f(3) = 3^2 = 9'] },
      ],
      lines: [
        { say: 'Estimate the slope of the tangent to f of x equals x squared, at x equals three.', show: 'q' },
        { say: 'The slope is the limit as h approaches zero of f of three plus h, minus f of three, all over h. Each value of h gives the slope of one secant line.', show: 'm.0', focus: 'm.0' },
        { say: 'We will need f of three. It is three squared, which is nine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One small step',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'h = 0.1\\colon\\quad \\dfrac{f(3.1) - 9}{0.1} = \\dfrac{9.61 - 9}{0.1} = \\dfrac{0.61}{0.1} = 6.1',
            'h = -0.1\\colon\\quad \\dfrac{f(2.9) - 9}{-0.1} = \\dfrac{8.41 - 9}{-0.1} = \\dfrac{-0.59}{-0.1} = 5.9',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Both sides', md: 'A positive $h$ puts the second point to the right of $x = 3$; a negative $h$ puts it to the left. A limit must give the same value from both sides.' },
      ],
      lines: [
        { say: 'Start with h equals 0.1. Then three plus h is 3.1, and f of 3.1 is 3.1 squared, which is 9.61.', show: 'm.0', focus: 'm.0' },
        { say: 'So the secant slope is 9.61 minus nine, over 0.1. That is 0.61 over 0.1, which is 6.1.' },
        { say: 'Now try h equals negative 0.1. Then three plus h is 2.9, and 2.9 squared is 8.41. The slope is 8.41 minus nine, over negative 0.1: negative 0.59 over negative 0.1, which is 5.9.', show: 'm.1', focus: 'm.1' },
        { say: 'A positive h puts the second point to the right of three, and a negative h puts it to the left. We check both sides, because a limit must give the same value from both sides.', show: 'tip' },
      ],
    },
    {
      chapter: 'A table of values',
      layout: 'split',
      leftWidth: 480,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['$h$', 'Secant slope'],
          rows: [
            ['$0.1$', '$6.1$'],
            ['$0.01$', '$6.01$'],
            ['$0.001$', '$6.001$'],
            ['$-0.001$', '$5.999$'],
            ['$-0.01$', '$5.99$'],
            ['$-0.1$', '$5.9$'],
          ],
        },
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['From the right: $6.1$, $6.01$, $6.001$', 'From the left: $5.9$, $5.99$, $5.999$', 'Both approach $6$, so the slope is about $6$.'] }],
      lines: [
        { say: 'Now make h smaller and smaller. With h equals 0.01, the secant slope is 6.01. With h equals 0.001, it is 6.001.', show: ['t.0', 't.1', 't.2', 'b.0'], focus: ['t.0', 't.1', 't.2'] },
        { say: 'From the left, with h equals negative 0.01, the slope is 5.99. With h equals negative 0.001, it is 5.999.', show: ['t.3', 't.4', 't.5', 'b.1'], focus: ['t.3', 't.4', 't.5'] },
        { say: 'From both sides, the secant slopes are closing in on six. So the slope of the tangent at x equals three is about six.', show: 'b.2', focus: 'b.2' },
        { say: 'A table gives a good estimate, but it cannot prove the answer is exactly six. For that, we use algebra.' },
      ],
    },
    {
      chapter: 'Exactly, with algebra',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{f(3 + h) - f(3)}{h} = \\dfrac{(3 + h)^2 - 9}{h}',
            '= \\dfrac{9 + 6h + h^2 - 9}{h} = \\dfrac{6h + h^2}{h}',
            '= \\dfrac{h(6 + h)}{h} = 6 + h \\qquad (h \\ne 0)',
            '\\lim_{h \\to 0} (6 + h) = \\good{6}',
          ],
        },
      ],
      lines: [
        { say: 'Write the secant slope in terms of h. f of three plus h is three plus h, all squared. So the slope is three plus h, all squared, minus nine, over h.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand: three plus h, all squared, is nine, plus six h, plus h squared. The nines cancel, leaving six h plus h squared, over h.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor h out of the top: h times six plus h. Now cancel the h on the top and the bottom, which leaves six plus h.', show: 'm.2', focus: 'm.2' },
        { say: 'Cancelling is allowed because h is never actually zero. It only gets closer and closer to zero.' },
        { say: 'Finally, let h approach zero. Six plus h approaches six. So the slope of the tangent at x equals three is exactly six, just as the table suggested.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The tangent line',
      layout: 'split',
      leftWidth: 560,
      left: [tan3],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'At $(3, 9)$, the tangent line has slope $6$: for each step of $1$ to the right, it rises $6$. Near this point, the curve climbs at the same rate.' }],
      lines: [
        { say: 'Here is the tangent line at the point at three, nine. Its slope is six: for each step of one to the right, it rises six.', show: ['tg.grid', 'tg.axes', 'tg.f', 'tg.P', 'tg.tan'], focus: 'tg.tan' },
        { say: 'Near this point, the curve is climbing at the same rate. Six is the instantaneous rate of change of f at x equals three.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Setting h = 0 too early', md: 'Putting $h = 0$ straight into $\\dfrac{f(a + h) - f(a)}{h}$ gives $\\dfrac{0}{0}$, which has no value. Simplify first, or use a table of small non-zero values of $h$ on both sides.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{(3 + 0)^2 - 9}{0} = \\dfrac{0}{0}}', '\\good{6 + h \\to 6}'] },
      ],
      lines: [
        { say: 'A common mistake is to put h equals zero into the fraction straight away.', show: 'oops' },
        { say: 'Then the top is three squared minus nine, which is zero, and the bottom is zero. Zero over zero has no value: it tells you nothing.', show: 'm.0', focus: 'm.0' },
        { say: 'So never set h to zero first. Simplify until the h on the bottom cancels, then let h approach zero. Or use a table of small values of h that are not zero, on both sides.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{(5 + h)^2 - 25}{h}$, then find the slope of the tangent to $f(x) = x^2$ at $x = 5$.',
          choices: ['$25$', '$5$', '$10 + h$', '$10$'],
          answer: 3,
          working: '$\\dfrac{25 + 10h + h^2 - 25}{h} = \\dfrac{10h + h^2}{h} = 10 + h$, and $10 + h \\to 10$ as $h \\to 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify five plus h, all squared, minus 25, over h. Then find the slope of the tangent to f of x equals x squared, at x equals five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Five plus h, all squared, is 25 plus ten h plus h squared. Subtract 25 and divide by h to get ten plus h, which approaches ten as h approaches zero. Choice C is the slope of a secant line: h must still approach zero.', show: 'q.answer' },
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
            'Estimate a tangent’s slope with secant slopes for small $h$, positive and negative.',
            'Find it exactly: simplify $\\dfrac{f(a + h) - f(a)}{h}$, then let $h \\to 0$.',
            'Never put $h = 0$ in before simplifying: it gives $\\dfrac{0}{0}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. You can estimate the slope of a tangent with secant slopes for small values of h, both positive and negative.', show: 'sum.0' },
        { say: 'To find it exactly, simplify f of "a" plus h, minus f of "a", over h, until the h on the bottom cancels. Then let h approach zero.', show: 'sum.1' },
        { say: 'And never put h equals zero in before simplifying. In the next part, we use the same idea to find the velocity of a falling stone at one instant. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
