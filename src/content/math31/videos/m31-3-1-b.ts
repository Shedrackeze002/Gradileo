import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, riseRun, secant } from './lib/m31-3-graphs.ts';

// The temperature readings of the previous part, in hours after 6:00 a.m.
const readings: [number, number][] = [[0, 3], [2, 7], [4, 12], [6, 16], [8, 15]];
const gt = plane({ x: [0, 8], y: [0, 18], xStep: 1, yStep: 2, every: 0, width: 7, height: 6, titles: { x: '\\text{Hours after 6:00 a.m.}', y: '\\text{Temperature (}^\\circ\\text{C)}' } });
const temp = figure('gr', [
  gt,
  numbers(gt, 2, 4),
  riseRun(gt, { id: 'rr', from: [2, 7], to: [6, 16], run: '\\text{run} = 4', rise: '\\text{rise} = 9' }),
  secant(gt, { id: 'sec', f: (x) => 7 + 2.25 * (x - 2), a: 2, b: 6, ext: 1.5 }),
  dots(gt, readings.map(([x, y]) => ({ id: `p${x}`, x, y, tone: 'theta' as const, group: 'pts' }))),
  dots(gt, [
    { id: 'A', x: 2, y: 7, tex: '(2, 7)', tone: 'theta', place: 'above left' },
    { id: 'B', x: 6, y: 16, tex: '(6, 16)', tone: 'theta', place: 'above left' },
  ]),
]);

// f(x) = x² − 4x, with the secant line PQ on [1, 4] (slope 1) or on [0, 2] (slope −2).
const f = (x: number) => x * x - 4 * x;
const g = plane({ x: [-1, 5], y: [-5, 3], every: 0 });
const curve = (id: string, which: 'PQ' | 'other') =>
  figure(id, [
    g,
    numbers(g, 1, 1),
    plot(g, { id: 'f', f, tone: 'adj', samples: 200 }),
    ...(which === 'PQ'
      ? [
          secant(g, { id: 'sec', f, a: 1, b: 4 }),
          riseRun(g, { id: 'rr', from: [1, -3], to: [4, 0], run: '3', rise: '3', runSide: 'above' as const }),
          dots(g, [
            { id: 'P', x: 1, y: -3, tex: 'P', tone: 'theta', place: 'left' },
            { id: 'Q', x: 4, y: 0, tex: 'Q', tone: 'theta', place: 'above left' },
          ]),
        ]
      : [
          secant(g, { id: 'sec', f, a: 0, b: 2, tone: 'opp' }),
          dots(g, [
            { id: 'R', x: 0, y: 0, tone: 'opp' },
            { id: 'S', x: 2, y: -4, tone: 'opp' },
          ]),
        ]),
  ]);

const video: Explainer = {
  id: 'm31-3-1-b',
  lessonId: 'm31-3-1',
  title: 'Rates of Change and Tangent Lines, Part 2: Secant Lines',
  thumbnailTitle: 'Secant Lines',
  thumbnail: 'c1',
  summary: 'An average rate of change is the slope of a secant line, a line through two points of a curve. Finding the average rate of change of f(x) = x² − 4x on [1, 4] from its formula (1, the slope of the secant line PQ), comparing the interval [0, 2] (−2), and keeping the brackets when an output is negative.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 2', title: 'Secant Lines', subtitle: 'An average rate of change on a graph' }],
      lines: [
        { say: 'A table of values gives you numbers. A graph lets you see a rate of change: it is how steeply a line climbs or falls.', show: 'title' },
        { say: 'In this video, you will meet secant lines, and find the average rate of change of a function from its formula.' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'split',
      leftWidth: 600,
      left: [temp],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{9}{4} = 2.25'] },
        { kind: 'text', id: 't', size: 'md', md: 'The slope of the line through the two points **is** the average rate of change.' },
      ],
      lines: [
        { say: 'Here are the temperature readings from the last part on a graph. Time goes along the bottom, and temperature goes up the side.', show: ['gr.grid', 'gr.axes', 'gr.pts'] },
        { say: 'From the point at two, seven to the point at six, sixteen, the graph goes across four hours. That is the change in time, the run. And it goes up nine degrees: the change in temperature, the rise.', show: ['gr.A', 'gr.B', 'gr.rr'], focus: 'gr.rr' },
        { say: 'Now join the two points with a straight line. Its slope is the rise over the run: nine over four, which is 2.25.', show: ['gr.sec', 'm'], focus: ['gr.sec', 'm'] },
        { say: 'That is exactly the average rate of change we found from the table. So the slope of the line through two points of a graph is the average rate of change between them.', show: 't' },
      ],
    },
    {
      chapter: 'Secant lines',
      layout: 'split',
      leftWidth: 520,
      left: [curve('c1', 'PQ')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Secant line', md: 'A line through two points on a curve. The average rate of change on $[a, b]$ is the slope of the secant line through $(a, f(a))$ and $(b, f(b))$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{slope} = \\dfrac{f(b) - f(a)}{b - a}'] },
      ],
      lines: [
        { say: 'A line through two points on a curve is called a secant line. The name comes from the Latin word for cutting: the line cuts through the curve.', show: ['c1.grid', 'c1.axes', 'c1.f', 'c1.P', 'c1.Q', 'c1.sec', 'def'], focus: 'c1.sec' },
        { say: 'Take the points of the curve at x equals "a" and x equals b. The rise between them is f of b minus f of "a", and the run is b minus "a".', focus: ['c1.P', 'c1.Q'] },
        { say: 'So the slope of the secant line is f of b minus f of "a", over b minus "a". That is exactly the average rate of change on the interval from "a" to b.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From a formula',
      layout: 'split',
      leftWidth: 520,
      left: [curve('c2', 'PQ')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the average rate of change of $f(x) = x^2 - 4x$ on $[1, 4]$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(4) = 16 - 16 = 0', 'f(1) = 1 - 4 = -3', 'P(1, -3),\\ Q(4, 0)', '\\dfrac{f(4) - f(1)}{4 - 1} = \\dfrac{0 - (-3)}{3}', '= \\dfrac{3}{3} = 1'] },
      ],
      lines: [
        { say: 'Find the average rate of change of f of x equals x squared minus four x, on the interval from one to four.', show: ['q', 'c2.grid', 'c2.axes', 'c2.f'] },
        { say: 'First, find the outputs at the ends of the interval. f of four is four squared minus four times four: sixteen minus sixteen, which is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'f of one is one squared minus four times one: one minus four, which is negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'On the graph, these are the points P at one, negative three, and Q at four, zero.', show: ['m.2', 'c2.P', 'c2.Q'], focus: ['m.2', 'c2.P', 'c2.Q'] },
        { say: 'Now divide the change in f by the change in x: f of four minus f of one, over four minus one. That is zero minus negative three, over three.', show: 'm.3', focus: 'm.3' },
        { say: 'Zero minus negative three is positive three. So the average rate of change is three over three, which is one.', show: 'm.4', focus: 'm.4' },
        { say: 'On the graph, the run from P to Q is three and the rise is three. So the secant line P Q has slope one.', show: ['c2.rr', 'c2.sec'], focus: ['c2.rr', 'c2.sec'] },
      ],
    },
    {
      chapter: 'Another interval',
      layout: 'split',
      leftWidth: 520,
      left: [curve('c3', 'other')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(2) = 4 - 8 = -4', 'f(0) = 0', '\\dfrac{f(2) - f(0)}{2 - 0} = \\dfrac{-4}{2} = -2'] },
        { kind: 'text', id: 't', size: 'md', md: 'A different interval gives a different secant line and a different average rate of change.' },
      ],
      lines: [
        { say: 'Now take the same function on the interval from zero to two.', show: ['c3.grid', 'c3.axes', 'c3.f'] },
        { say: 'f of two is four minus eight, which is negative four. And f of zero is zero.', show: ['m.0', 'm.1', 'c3.R', 'c3.S'], focus: ['m.0', 'm.1'] },
        { say: 'So the average rate of change is negative four minus zero, over two minus zero: negative four over two, which is negative two.', show: 'm.2', focus: 'm.2' },
        { say: 'This secant line falls from left to right. On average, f decreased by two for each unit of x.', show: 'c3.sec', focus: 'c3.sec' },
        { say: 'So the average rate of change depends on the interval. A different pair of points gives a different secant line, with a different slope.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing the brackets', md: 'When an output is negative, keep it in brackets as you subtract: $0 - (-3) = 3$, not $0 - 3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{0 - 3}{4 - 1} = -1}', '\\good{\\dfrac{0 - (-3)}{4 - 1} = 1}'] },
      ],
      lines: [
        { say: 'Watch out when an output is negative. f of one is negative three, and it is easy to write zero minus three on the top, instead of zero minus negative three.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That gives negative one. But the graph shows that the secant line P Q rises from left to right, so its slope must be positive.' },
        { say: 'Keep the negative output in brackets: zero minus, open bracket, negative three. Subtracting negative three is the same as adding three, and the slope is one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the average rate of change of $g(x) = x^2 + 2x$ on the interval $[1, 3]$.',
          choices: ['$12$', '$7.5$', '$\\tfrac{1}{6}$', '$6$'],
          answer: 3,
          working: '$g(3) = 9 + 6 = 15$ and $g(1) = 1 + 2 = 3$, so the average rate of change is $\\dfrac{15 - 3}{3 - 1} = \\dfrac{12}{2} = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the average rate of change of g of x equals x squared plus two x, on the interval from one to three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. g of three is nine plus six, which is fifteen, and g of one is one plus two, which is three. The change in g is twelve, over a change in x of two, so the average rate of change is six. Choice A forgets to divide by the run.', show: 'q.answer' },
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
            'A secant line passes through two points on a curve.',
            'Its slope, $\\dfrac{f(b) - f(a)}{b - a}$, is the average rate of change on $[a, b]$.',
            'A different interval gives a different secant line.',
            'Keep negative outputs in brackets when you subtract.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A secant line is a line through two points on a curve.', show: 'sum.0' },
        { say: 'Its slope, f of b minus f of "a", over b minus "a", is the average rate of change on the interval from "a" to b.', show: 'sum.1' },
        { say: 'A different interval gives a different secant line, and a different average rate.', show: 'sum.2' },
        { say: 'And keep negative outputs in brackets when you subtract. In the next part, we use average rates of change to describe motion: average velocity. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
