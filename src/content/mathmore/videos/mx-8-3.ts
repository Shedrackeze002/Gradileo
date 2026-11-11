import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 14], y: [0, 14], xStep: 2, yStep: 2, width: 9, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Velocity (m/s)}' } });
const b = plane({ x: [0, 5], y: [0, 25], xStep: 1, yStep: 5, width: 8, height: 6, titles: { x: 't\\text{ (s)}', y: 'd\\text{ (m)}' } });

const video: Explainer = {
  id: 'mx-8-3',
  lessonId: 'mx-8-3',
  title: 'Gradients as Rates of Change',
  thumbnail: 'gr',
  summary: 'The gradient of a graph is a rate of change: speed on a distance–time graph and acceleration on a velocity–time graph. A tram that speeds up from 0 to 12 m/s in 4 s accelerates at 3 m/s², and on a curve a tangent gives the gradient at a point: for d = t² at t = 3 it is 6 m/s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sequences, Iteration and Graphs · Part 1', title: 'Gradients as Rates of Change', subtitle: 'How steep tells you how fast' }],
      lines: [
        { say: 'A graph does more than show values. Its steepness tells us how fast one quantity changes compared with the other.', show: 'title' },
        { say: 'In this video, you will learn to read speeds and accelerations from the gradients of graphs, including curved ones. In part two, we use the area under a graph.' },
      ],
    },
    {
      chapter: 'Gradient as a rate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate of change', md: 'The **gradient** of a graph is a **rate of change**: how much the vertical quantity changes for each unit of the horizontal one.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{gradient} = \\frac{\\text{change in } y}{\\text{change in } x}'] },
        { kind: 'table', id: 't', head: ['Graph', 'Its gradient is the…'], rows: [['distance–time', 'speed'], ['velocity–time', 'acceleration (m/s²)']] },
      ],
      lines: [
        { say: 'The gradient of a graph is a rate of change. It tells us how much the quantity on the vertical axis changes for each unit on the horizontal axis.', show: 'def' },
        { say: 'As always, the gradient is the change in y divided by the change in x.', show: 'm', focus: 'm' },
        { say: 'On a distance–time graph, that is metres per second, which is the speed.', show: 't.0', focus: 't.0' },
        { say: 'On a velocity–time graph, it is metres per second, per second: the acceleration, how fast the velocity changes.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Acceleration',
      layout: 'split',
      leftWidth: 600,
      left: [figure('gr', [g, polyline(g, { id: 'v', points: [[0, 0], [4, 12], [10, 12], [14, 0]], labels: ['', '', ''] })], 520)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{12 - 0}{4} = 3\\text{ m/s}^2', '\\text{Flat: gradient } 0', '\\frac{0 - 12}{4} = {-3}\\text{ m/s}^2'] },
        { kind: 'text', id: 'd', md: 'A negative gradient is a **deceleration** of $3$ m/s².' },
      ],
      lines: [
        { say: 'This velocity–time graph shows a tram moving between two stops.', show: ['gr.grid', 'gr.axes', 'gr.v'] },
        { say: 'In the first four seconds, its velocity rises from zero to twelve metres per second. The gradient is twelve over four, which is three. The tram accelerates at three metres per second squared.', show: 'm.0', focus: ['m.0', 'gr.v-0'] },
        { say: 'From four to ten seconds the line is flat. The gradient is zero, so the velocity is not changing: the tram moves at a steady twelve metres per second.', show: 'm.1', focus: ['m.1', 'gr.v-1'] },
        { say: 'From ten to fourteen seconds the velocity falls from twelve to zero. The gradient is negative twelve over four, which is negative three.', show: 'm.2', focus: ['m.2', 'gr.v-2'] },
        { say: 'A negative acceleration is a deceleration. The tram slows down at three metres per second squared.', show: 'd' },
      ],
    },
    {
      chapter: 'Tangents to curves',
      layout: 'split',
      leftWidth: 700,
      left: [figure('cv', [b, plot(b, { id: 'd', f: (t) => t * t, from: 0, to: 5 }), polyline(b, { id: 'tan', points: [[1.5, 0], [4.5, 18]], dashed: true }), dots(b, [{ id: 'P', x: 3, y: 9, tex: '(3,\\ 9)', place: 'left' }, { id: 'A', x: 2, y: 3, tex: '(2,\\ 3)', place: 'right', tone: 'adj' }, { id: 'B', x: 4, y: 15, tex: '(4,\\ 15)', place: 'right', tone: 'adj' }])], 520)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['d = t^2', '\\text{gradient} = \\frac{15 - 3}{4 - 2} = \\frac{12}{2} = 6', '\\text{speed at } t = 3 \\approx 6\\text{ m/s}'] },
      ],
      lines: [
        { say: 'On a curved graph, the gradient keeps changing. A ball rolls t squared metres in t seconds, so it keeps speeding up.', show: ['cv.grid', 'cv.axes', 'cv.d', 'm.0'] },
        { say: 'To estimate the speed at one moment, say three seconds, draw a tangent there: a straight line that just touches the curve, with the same steepness.', show: ['cv.P', 'cv.tan'], focus: 'cv.tan' },
        { say: 'Then find the gradient of the tangent from two points on it. This one passes through two, three and four, fifteen. Its gradient is fifteen minus three, over four minus two, which is twelve over two, or six.', show: ['cv.A', 'cv.B', 'm.1'], focus: 'm.1' },
        { say: 'So the ball’s speed at three seconds is about six metres per second. A tangent drawn by hand is only an estimate, so answers close to this are fine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a velocity–time graph, a car’s velocity rises steadily from $5$ m/s to $25$ m/s in $8$ seconds. What is its acceleration?',
          choices: ['$3.125$ m/s²', '$20$ m/s²', '$2.5$ m/s²', '$0.4$ m/s²'],
          answer: 2,
          working: 'Gradient $= \\dfrac{25 - 5}{8} = \\dfrac{20}{8} = 2.5$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. On a velocity–time graph, a car’s velocity rises steadily from five metres per second to twenty five metres per second in eight seconds. What is its acceleration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The gradient is the change in velocity, twenty, divided by the change in time, eight, which is two point five metres per second squared. Choice A forgets to take away the starting velocity, and choice D divides the wrong way round.', show: 'q.answer' },
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
          items: ['A gradient is a rate of change.', 'Distance–time: the gradient is the speed. Velocity–time: it is the acceleration.', 'A negative acceleration is a deceleration.', 'On a curve, draw a tangent and find its gradient.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The gradient of a graph is a rate of change.', show: 'sum.0' },
        { say: 'On a distance–time graph it is the speed, and on a velocity–time graph it is the acceleration.', show: 'sum.1' },
        { say: 'A negative acceleration is a deceleration.', show: 'sum.2' },
        { say: 'And on a curve, draw a tangent and find its gradient. In part two, we find distances from the area under a velocity–time graph. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
