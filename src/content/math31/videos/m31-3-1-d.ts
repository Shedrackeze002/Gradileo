import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, plane, plot, riseRun, slopeLine, tag, tangent } from './lib/m31-3-graphs.ts';

// f(x) = x² with P(1, 1) fixed and Q moving toward it: secant slopes 4, 3 and 2.5, tangent slope 2.
const sq = (x: number) => x * x;
const g = plane({ x: [0, 3.5], y: [0, 10], xStep: 0.5, yStep: 1, every: 0, width: 7, height: 6 });
const qs = [3, 2, 1.5];
const closing = figure('cl', [
  g,
  numbers(g, 1, 2),
  plot(g, { id: 'f', f: sq, tone: 'adj', samples: 200 }),
  ...qs.map((q, i) => slopeLine(g, { id: `s${i + 1}`, at: [1, 1], m: (sq(q) - 1) / (q - 1), from: 0.55, to: q + 0.25, tone: 'theta', dashed: true })),
  tangent(g, { id: 'tan', at: [1, 1], m: 2 }),
  dots(g, [{ id: 'P', x: 1, y: 1, tex: 'P', tone: 'good', place: 'above left' }]),
  dots(g, qs.map((q, i) => ({ id: `Q${i + 1}`, x: q, y: sq(q), tex: `Q_${i + 1}`, tone: 'theta' as const, place: 'above left' as const }))),
]);

// Any curve: P at x = a and Q a step h further on, at x = a + h.
const k = (x: number) => 0.5 * x * x + 1;
const gh = plane({ x: [0, 4], y: [0, 8], xStep: 0.5, yStep: 1, every: 0, width: 7, height: 6 });
const general = figure('gh', [
  gh,
  plot(gh, { id: 'f', f: k, tone: 'adj', samples: 200 }),
  guide(gh, 'dP', [1, 0], [1, k(1)]),
  guide(gh, 'dQ', [3, 0], [3, k(3)]),
  tag(gh, 'a', 1, 0, 'a', 'below', 'ink'),
  tag(gh, 'ah', 3, 0, 'a + h', 'below', 'ink'),
  slopeLine(gh, { id: 'sec', at: [1, k(1)], m: (k(3) - k(1)) / 2, from: 0.3, to: 3.6, tone: 'theta', dashed: true }),
  riseRun(gh, { id: 'rr', from: [1, k(1)], to: [3, k(3)], run: 'h', rise: '\\text{rise}' }),
  dots(gh, [
    { id: 'P', x: 1, y: k(1), tex: 'P', tone: 'good', place: 'above left' },
    { id: 'Q', x: 3, y: k(3), tex: 'Q', tone: 'theta', place: 'above left' },
  ]),
]);

const video: Explainer = {
  id: 'm31-3-1-d',
  lessonId: 'm31-3-1',
  title: 'Rates of Change and Tangent Lines, Part 4: The Tangent Line',
  thumbnailTitle: 'The Tangent Line',
  thumbnail: 'cl',
  summary: 'Finding a rate of change at a single point: on y = x², secant lines from P(1, 1) to points Q closer and closer to P have slopes 4, 3 and 2.5, closing in on the tangent line, with slope 2. With Q at x = a + h, the secant slope is (f(a + h) − f(a))/h, and its limit as h → 0 is the slope of the tangent: the instantaneous rate of change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 4', title: 'The Tangent Line', subtitle: 'A rate of change at a single point' }],
      lines: [
        { say: 'An average rate of change describes a whole interval. But a car’s speedometer shows how fast the car is going right now, at one instant. How can a rate of change be found at a single moment?', show: 'title' },
        { say: 'In this video, you will watch secant lines close in on a tangent line, and meet the instantaneous rate of change.' },
      ],
    },
    {
      chapter: 'Shrinking the interval',
      layout: 'split',
      leftWidth: 560,
      left: [closing],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['Q_1(3, 9)\\colon\\ \\dfrac{9 - 1}{3 - 1} = 4', 'Q_2(2, 4)\\colon\\ \\dfrac{4 - 1}{2 - 1} = 3', 'Q_3(1.5, 2.25)\\colon\\ \\dfrac{1.25}{0.5} = 2.5', '\\good{\\text{tangent: slope } 2}'],
        },
      ],
      lines: [
        { say: 'Here is the graph of f of x equals x squared. Fix the point P on it, at one, one.', show: ['cl.grid', 'cl.axes', 'cl.f', 'cl.P'] },
        { say: 'Take a second point on the curve, Q one, at three, nine. The secant line P Q one has slope nine minus one, over three minus one: eight over two, which is four.', show: ['cl.Q1', 'cl.s1', 'm.0'], focus: ['cl.s1', 'm.0'] },
        { say: 'Now move Q closer to P. Q two is at two, four. The secant slope is four minus one, over two minus one, which is three.', hide: ['cl.Q1', 'cl.s1'], show: ['cl.Q2', 'cl.s2', 'm.1'], focus: ['cl.s2', 'm.1'] },
        { say: 'Closer still. Q three is at 1.5, 2.25. The rise is 1.25, and the run is 0.5, so the slope is 2.5.', hide: ['cl.Q2', 'cl.s2'], show: ['cl.Q3', 'cl.s3', 'm.2'], focus: ['cl.s3', 'm.2'] },
        { say: 'As Q slides along the curve toward P, the secant line swings round, and its slope goes four, three, 2.5, getting closer and closer to two.', focus: 'm' },
        { say: 'The line they close in on is the tangent line at P, shown in green. Its slope is two. It touches the curve at P, and it is exactly as steep as the curve is there.', show: ['cl.tan', 'm.3'], focus: ['cl.tan', 'm.3'] },
      ],
    },
    {
      chapter: 'Using h',
      layout: 'split',
      leftWidth: 560,
      left: [general],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\big(a,\\ f(a)\\big)', 'Q\\big(a + h,\\ f(a + h)\\big)', '\\text{run} = h', '\\text{rise} = f(a + h) - f(a)', '\\text{slope of } PQ = \\dfrac{f(a + h) - f(a)}{h}'] }],
      lines: [
        { say: 'Now let’s describe this for any curve and any point. Call the fixed point P, at x equals "a". Its height is f of "a".', show: ['gh.grid', 'gh.axes', 'gh.f', 'gh.P', 'gh.dP', 'gh.a', 'm.0'], focus: ['gh.P', 'm.0'] },
        { say: 'Let Q be a step h further along, at x equals "a" plus h. Its height is f of "a" plus h.', show: ['gh.Q', 'gh.dQ', 'gh.ah', 'm.1'], focus: ['gh.Q', 'm.1'] },
        { say: 'From P to Q, the run is h. The rise is f of "a" plus h, minus f of "a".', show: ['gh.rr', 'm.2', 'm.3'], focus: ['gh.rr', 'm.2', 'm.3'] },
        { say: 'So the slope of the secant line P Q is f of "a" plus h, minus f of "a", all over h.', show: ['gh.sec', 'm.4'], focus: ['gh.sec', 'm.4'] },
        { say: 'Moving Q toward P means making h smaller and smaller. As h approaches zero, the secant line turns into the tangent line at P.', focus: 'gh.rr' },
      ],
    },
    {
      chapter: 'The tangent line',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tangent line and instantaneous rate of change', md: 'The **tangent line** at $P(a, f(a))$ is the line through $P$ with the slope below, provided the limit exists. This slope is the **instantaneous rate of change** of $f$ at $x = a$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = \\lim_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}'] },
      ],
      lines: [
        { say: 'Here is the definition. The tangent line at the point P is the line through P whose slope is the limit as h approaches zero of f of "a" plus h, minus f of "a", all over h.', show: ['def', 'm'], focus: 'm' },
        { say: 'This only works if the limit exists. When it does, the slope is called the instantaneous rate of change of f at x equals "a".', focus: 'def' },
        { say: 'Instantaneous means at one instant. It is the rate of change at a single point, not over an interval.' },
      ],
    },
    {
      chapter: 'Average and instantaneous',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Average rate of change', 'Instantaneous rate of change'],
          rows: [
            ['Measured over', 'an interval $[a, b]$', 'a single point, $x = a$'],
            ['On a graph', 'slope of a secant line', 'slope of the tangent line'],
            ['For motion', 'average velocity', 'velocity at one instant'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s compare the two kinds of rate. An average rate of change is measured over an interval. An instantaneous rate of change is measured at a single point.', show: 't.0', focus: 't.0' },
        { say: 'On a graph, an average rate is the slope of a secant line, and an instantaneous rate is the slope of the tangent line.', show: 't.1', focus: 't.1' },
        { say: 'And for motion, an average rate is an average velocity over a trip, while an instantaneous rate is the velocity at one instant: the number on the speedometer.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = x^2$, the secant lines from $P(2, 4)$ to the points at $x = 2.1$, $2.01$ and $2.001$ have slopes $4.1$, $4.01$ and $4.001$. What is the slope of the tangent line at $P$?',
          choices: ['$4.001$', '$4.1$', '$4$', '$2$'],
          answer: 2,
          working: 'As $Q$ moves toward $P$, the secant slopes $4.1$, $4.01$, $4.001$ approach $4$, so the tangent line at $P$ has slope $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x squared, the secant lines from P at two, four to the points at x equals 2.1, 2.01 and 2.001 have slopes 4.1, 4.01 and 4.001. What is the slope of the tangent line at P? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. As the second point moves toward P, the secant slopes get closer and closer to four, so the tangent line has slope four. Choice A is only the slope of the closest secant line, not the number the slopes are approaching.', show: 'q.answer' },
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
            'As $Q$ moves toward $P$, secant lines close in on the tangent line at $P$.',
            'The slope of the secant from $x = a$ to $x = a + h$ is $\\dfrac{f(a + h) - f(a)}{h}$.',
            'The tangent’s slope is its limit as $h \\to 0$: the instantaneous rate of change.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. As the point Q moves along the curve toward P, the secant lines close in on the tangent line at P.', show: 'sum.0' },
        { say: 'The slope of the secant line from x equals "a" to x equals "a" plus h is f of "a" plus h, minus f of "a", all over h.', show: 'sum.1' },
        { say: 'And the slope of the tangent line is the limit of that as h approaches zero: the instantaneous rate of change. In the next part, we estimate a tangent’s slope with a table, and then find it exactly. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
