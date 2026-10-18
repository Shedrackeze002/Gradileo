import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, num, plane, plot, tangent } from './lib/m31-6-graphs.ts';

// y = x³ − 6x² + 9x + 1, with horizontal tangents at (1, 5) and (3, 1).
const f = (x: number) => x ** 3 - 6 * x * x + 9 * x + 1;
const g = plane({ x: [-0.5, 4.5], y: [-1, 7], xStep: 1, yStep: 1, every: 0, width: 5, height: 6 });

// y = x², the line y = 4x − 1, and the tangent y = 4x − 4 parallel to it at (2, 4).
const p = plane({ x: [-1.5, 3.5], y: [-2, 9], xStep: 1, yStep: 1, every: 0, width: 5, height: 6.6 });

const video: Explainer = {
  id: 'm31-6-1-c',
  lessonId: 'm31-6-1',
  title: 'Tangent Lines and Linear Approximation, Part 3: Horizontal and Parallel Tangents',
  thumbnailTitle: 'Horizontal and Parallel Tangents',
  thumbnail: 'ht',
  summary: 'To find where a tangent line has a given slope, set the derivative equal to that slope and solve. y = x³ − 6x² + 9x + 1 has horizontal tangents at (1, 5) and (3, 1); the tangent to y = x² is parallel to y = 4x − 1 at (2, 4); and a line in general form is rewritten to read its slope.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 3', title: 'Horizontal and Parallel Tangents', subtitle: 'Finding where the slope is what you want' }],
      lines: [
        { say: 'Sometimes we know the slope we want, and need to find where on the curve the tangent line has it: where the curve is level, or where it runs parallel to a road or a ramp.', show: 'title' },
        { say: 'In this video, you will find horizontal tangents and parallel tangents, by setting the derivative equal to the slope you want.' },
      ],
    },
    {
      chapter: 'Horizontal tangents',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('ht', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4], ys: [0, 2, 4, 6], xTex: num, yTex: num }),
          plot(g, { id: 'f', f, samples: 200 }),
          tangent(g, { id: 't1', a: 1, y: 5, m: 0, left: 0.8, right: 0.8, tone: 'theta', dot: '(1, 5)', place: 'above' }),
          tangent(g, { id: 't3', a: 3, y: 1, m: 0, left: 0.8, right: 0.8, tone: 'theta', dot: '(3, 1)', place: 'below' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['y = x^{3} - 6x^{2} + 9x + 1', '\\frac{dy}{dx} = 3x^{2} - 12x + 9', '= 3(x - 1)(x - 3) = 0', 'x = 1 \\text{ or } x = 3', 'y(1) = 5, \\quad y(3) = 1'],
        },
      ],
      lines: [
        { say: 'A horizontal tangent line has slope zero. So to find the points where the tangent to y equals x cubed, minus six x squared, plus nine x, plus one, is horizontal, set the derivative equal to zero.', show: ['ht.grid', 'ht.axes', 'ht.f', 'm.0'] },
        { say: 'd y by d x is three x squared, minus twelve x, plus nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor out three, then factor the quadratic: three times x minus one, times x minus three. That is zero when x is one or x is three.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Find the y-values on the curve. y of one is one, minus six, plus nine, plus one: five. y of three is 27, minus 54, plus 27, plus one: one.', show: 'm.4', focus: 'm.4' },
        { say: 'So the tangent is horizontal at the point at one, five, the top of a hill, and at the point at three, one, the bottom of a valley.', show: ['ht.t1-all', 'ht.t3-all'], focus: ['ht.t1', 'ht.t3'] },
      ],
    },
    {
      chapter: 'A parallel tangent',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('pt', [
          p,
          edgeNumbers(p, { xs: [-1, 0, 1, 2, 3], ys: [-2, 0, 2, 4, 6, 8], xTex: num, yTex: num }),
          plot(p, { id: 'f', f: (x) => x * x, samples: 200 }),
          tangent(p, { id: 'l', a: 0, y: -1, m: 4, tone: 'muted', dashed: true }),
          tangent(p, { id: 't', a: 2, y: 4, m: 4, tone: 'opp', dot: '(2, 4)', place: 'below right' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{line } y = 4x - 1\\colon\\ \\text{slope } 4', '\\frac{dy}{dx} = 2x = 4', 'x = 2, \\quad y = 4', 'y - 4 = 4(x - 2)', 'y = 4x - 4'] },
      ],
      lines: [
        { say: 'Parallel lines have the same slope. Where is the tangent to y equals x squared parallel to the line y equals four x minus one?', show: ['pt.grid', 'pt.axes', 'pt.f', 'pt.l'] },
        { say: 'The line has slope four. So set the derivative equal to four: two x equals four, and x is two.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'On the curve, y is two squared, which is four. So the point is two, four.', show: 'm.2', focus: 'm.2' },
        { say: 'The tangent there is y minus four equals four times x minus two, which is y equals four x minus four. It has the same slope as the given line, so they never meet.', show: ['m.3', 'm.4', 'pt.t-all'], focus: ['m.4', 'pt.t'] },
      ],
    },
    {
      chapter: 'Rewrite the line first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the slope from y = mx + b', md: 'If the line is given in general form, solve it for $y$ to read its slope.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['8x - 2y + 3 = 0', '2y = 8x + 3', 'y = 4x + \\tfrac{3}{2} \\qquad \\text{slope } 4'] },
      ],
      lines: [
        { say: 'Sometimes the line is given in general form, such as eight x, minus two y, plus three, equals zero. Its slope is not visible yet.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'Solve for y. Add two y to both sides: two y equals eight x plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by two: y equals four x plus three halves. Now the slope is clear: four. This is the same slope as before, so the tangent to y equals x squared parallel to it is again at the point at two, four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At what point is the tangent to $y = x^{2} - 6x$ parallel to the line $y = 2x + 5$?',
          choices: ['$(3, -9)$', '$(4, 13)$', '$(2, -8)$', '$(4, -8)$'],
          answer: 3,
          working: '$\\dfrac{dy}{dx} = 2x - 6 = 2$, so $x = 4$, and $y = 16 - 24 = -8$.',
        },
      ],
      lines: [
        { say: 'Your turn. At what point is the tangent to y equals x squared minus six x parallel to the line y equals two x plus five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The line has slope two, so solve two x minus six equals two: x is four. On the curve, y is sixteen minus 24, which is negative eight. Choice B puts x equals four into the line instead of the curve.', show: 'q.answer' },
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
          items: ["Horizontal tangents: solve $f'(x) = 0$.", "Tangents parallel to a line of slope $m$: solve $f'(x) = m$.", 'Find each $y$ on the curve, and rewrite a line in the form $y = mx + b$ to read its slope.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find horizontal tangents, solve f prime of x equals zero.', show: 'sum.0' },
        { say: 'To find tangents parallel to a line with slope m, solve f prime of x equals m.', show: 'sum.1' },
        { say: 'Then find each y-value on the curve, and rewrite a line as y equals m x plus b to read its slope. In the next part, we use tangent lines to estimate values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
