import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tangent } from './lib/m31-3-graphs.ts';

// y = x³ and its tangents at x = −1, 0 and 1: slopes 3x² = 3, 0 and 3.
const cube = (x: number) => x ** 3;
const g = plane({ x: [-2, 2], y: [-4, 4], xStep: 0.5, yStep: 1, every: 0, width: 6, height: 6 });
const cubic = figure('cu', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'f', f: cube, tone: 'adj', samples: 200 }),
  tangent(g, { id: 't1', at: [1, 1], m: 3, ext: 0.6, weight: 3.5, group: 'k1' }),
  tangent(g, { id: 'tm1', at: [-1, -1], m: 3, ext: 0.6, weight: 3.5, group: 'km1' }),
  tangent(g, { id: 't0', at: [0, 0], m: 0, ext: 0.6, weight: 3.5, group: 'k0' }),
  dots(g, [
    { id: 'p1', x: 1, y: 1, tone: 'good', group: 'k1' },
    { id: 'pm1', x: -1, y: -1, tone: 'good', group: 'km1' },
    { id: 'p0', x: 0, y: 0, tone: 'good', group: 'k0' },
  ]),
]);

const video: Explainer = {
  id: 'm31-3-2-c',
  lessonId: 'm31-3-2',
  title: 'The Derivative from First Principles, Part 3: A Cubic',
  thumbnailTitle: 'The Derivative of x³',
  thumbnail: 'cu',
  summary: 'Differentiating x³ from first principles: expanding (x + h)³ = x³ + 3x²h + 3xh² + h³, dividing by h and letting h → 0 gives 3x². The tangents of y = x³ at x = −1, 0 and 1, the pattern x → 1, x² → 2x, x³ → 3x² behind the power rule, and why (x + h)³ is not x³ + h³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 3', title: 'A Cubic from First Principles', subtitle: 'The derivative of x cubed, and a pattern' }],
      lines: [
        { say: 'x squared has derivative two x. What about x cubed? The same four steps work, with a little more algebra, and a pattern starts to appear.', show: 'title' },
        { say: 'In this video, you will differentiate x cubed from first principles, and spot the pattern behind a rule you will soon use all the time.' },
      ],
    },
    {
      chapter: 'Expanding',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $\\dfrac{d}{dx}\\left(x^3\\right)$ from first principles.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(x + h)^3 = (x + h)(x + h)^2', '= (x + h)(x^2 + 2xh + h^2)', '= x^3 + 2x^2h + xh^2 + x^2h + 2xh^2 + h^3', '= x^3 + 3x^2h + 3xh^2 + h^3'] },
      ],
      lines: [
        { say: 'Find the derivative of x cubed from first principles. Step one is to write f of x plus h, which is x plus h, all cubed. First, expand it.', show: 'q' },
        { say: 'x plus h, all cubed, is x plus h, times x plus h, all squared.', show: 'm.0', focus: 'm.0' },
        { say: 'We know that x plus h, all squared, is x squared, plus two x h, plus h squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply each of those three terms by x, and then by h. That gives six terms.', show: 'm.2', focus: 'm.2' },
        { say: 'Collect like terms: x cubed, plus three x squared h, plus three x h squared, plus h cubed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The four steps',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(x + h)^3 - x^3 = 3x^2h + 3xh^2 + h^3', '\\dfrac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2', '\\lim_{h \\to 0}\\,(3x^2 + 3xh + h^2) = \\good{3x^2}'],
        },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Result', md: '$\\dfrac{d}{dx}\\left(x^3\\right) = 3x^2$' },
      ],
      lines: [
        { say: 'Step two: subtract x cubed. The x cubed terms cancel, leaving three x squared h, plus three x h squared, plus h cubed. Every term contains h.', show: 'm.0', focus: 'm.0' },
        { say: 'Step three: divide each term by h. That gives three x squared, plus three x h, plus h squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Step four: let h approach zero. Three x h and h squared both approach zero, and only three x squared is left.', show: 'm.2', focus: 'm.2' },
        { say: 'So the derivative of x cubed is three x squared.', show: 'ans' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 540,
      left: [cubic],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['At $x = 1$: slope $3(1)^2 = 3$.', 'At $x = -1$: slope $3(-1)^2 = 3$.', 'At $x = 0$: slope $0$. The tangent is flat, and it crosses the curve.'],
        },
      ],
      lines: [
        { say: 'Here is the graph of y equals x cubed. At x equals one, the slope is three times one squared, which is three.', show: ['cu.grid', 'cu.axes', 'cu.f', 'cu.k1', 'b.0'], focus: ['cu.t1', 'b.0'] },
        { say: 'At x equals negative one, the slope is three times negative one, squared. Squaring makes it positive, so the slope is three again. The two tangent lines are parallel.', show: ['cu.km1', 'b.1'], focus: ['cu.tm1', 'b.1'] },
        { say: 'At x equals zero, the slope is zero, so the tangent is flat: it lies along the x-axis.', show: ['cu.k0', 'b.2'], focus: ['cu.t0', 'b.2'] },
        { say: 'Notice that this tangent passes through the curve. A tangent line is defined by its slope, not by touching the curve only once.' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Derivative'],
          rows: [
            ['$x$', '$1$'],
            ['$x^2$', '$2x$'],
            ['$x^3$', '$3x^2$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A pattern to prove later', md: 'The power comes down in front, and the new power is one less. This is the **power rule**, proved in the next unit. For now, the definition is the tool.' },
      ],
      lines: [
        { say: 'Let’s collect the derivatives so far. The line y equals x has slope one everywhere, so its derivative is one. x squared has derivative two x, and x cubed has derivative three x squared.', show: 't' },
        { say: 'Do you see the pattern? The power comes down in front, and the new power is one less. Two x to the first, and three x squared.', focus: ['t.1', 't.2'] },
        { say: 'So you might guess that x to the fourth has derivative four x cubed. It does. This pattern is called the power rule, and you will prove it in the next unit. For now, the limit definition is the tool.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Expanding a power wrongly', md: '$(x + h)^3$ is **not** $x^3 + h^3$. Multiply it out, or the middle terms, which hold the derivative, are lost.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{(x^3 + h^3) - x^3}{h} = h^2 \\to 0}', '\\good{\\dfrac{3x^2h + 3xh^2 + h^3}{h} \\to 3x^2}'] },
      ],
      lines: [
        { say: 'A common mistake is to write x plus h, all cubed, as x cubed plus h cubed.', show: 'oops' },
        { say: 'Then step two leaves only h cubed, step three gives h squared, and the limit is zero. That would mean x cubed is flat everywhere, which the graph shows is false.', show: 'm.0', focus: 'm.0' },
        { say: 'The middle terms, three x squared h and three x h squared, are where the derivative comes from. Always multiply a power out in full.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use first principles to find $f\'(x)$ for $f(x) = 2x^3$.',
          choices: ['$2x^2$', '$3x^2$', '$6x^2$', '$6x^3$'],
          answer: 2,
          working: '$2(x + h)^3 - 2x^3 = 6x^2h + 6xh^2 + 2h^3$. Divide by $h$: $6x^2 + 6xh + 2h^2$. Let $h \\to 0$: $f\'(x) = 6x^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use first principles to find f prime of x, for f of x equals two x cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Two times x plus h, all cubed, minus two x cubed, is six x squared h, plus six x h squared, plus two h cubed. Divide by h and let h approach zero: six x squared. Choice B forgets the factor of two: every term doubles, so the derivative doubles too.', show: 'q.answer' },
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
            '$(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$.',
            '$\\dfrac{d}{dx}\\left(x^3\\right) = 3x^2$.',
            'Pattern: $x \\to 1$, $x^2 \\to 2x$, $x^3 \\to 3x^2$.',
            '$(x + h)^3$ is not $x^3 + h^3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. x plus h, all cubed, is x cubed, plus three x squared h, plus three x h squared, plus h cubed.', show: 'sum.0' },
        { say: 'From first principles, the derivative of x cubed is three x squared.', show: 'sum.1' },
        { say: 'The derivatives so far follow a pattern: the power comes down in front, and the new power is one less.', show: 'sum.2' },
        { say: 'And x plus h, all cubed, is not x cubed plus h cubed. In the next part, we see what a derivative’s value means in a real situation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
