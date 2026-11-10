import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { poly } from './lib/mx-figures.ts';

const g = plane({ x: [0, 14], y: [0, 14], xStep: 2, yStep: 2, width: 9, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Velocity (m/s)}' } });
const sx = 9 / 14;
const sy = 6 / 14;
const c = plane({ x: [0, 8], y: [0, 18], xStep: 2, yStep: 2, width: 9, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Velocity (m/s)}' } });
const cx = 9 / 8;
const cy = 6 / 18;
const vel = [0, 7, 12, 15, 16];
// The cyclist’s velocity: a curve through the table’s values that bends downwards.
const curveV = (t: number) => 4 * t - 0.25 * t * t;

const video: Explainer = {
  id: 'mx-8-3-b',
  lessonId: 'mx-8-3',
  title: 'Areas Under Graphs',
  thumbnail: 'gr',
  summary: 'The area under a velocity–time graph is the distance travelled: the tram’s trapezium has area ½(14 + 6) × 12 = 120 m. Under a curve, strips of equal width treated as trapezia give an estimate, 84 m for the cyclist, which is too low when the curve bends downwards.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sequences, Iteration and Graphs · Part 2', title: 'Areas Under Graphs', subtitle: 'Distance from a velocity–time graph' }],
      lines: [
        { say: 'In part one, the gradient of a graph gave us a rate of change. The area underneath a graph can be a quantity of its own.', show: 'title' },
        { say: 'In this video, you will learn to find the distance travelled from the area under a velocity–time graph, and to estimate the area under a curve.' },
      ],
    },
    {
      chapter: 'What the area means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Area under a graph', md: 'The area between a graph and the horizontal axis multiplies the two quantities. On a velocity–time graph it is velocity $\\times$ time: the **distance travelled**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{m/s} \\times \\text{s} = \\text{m}'] },
      ],
      lines: [
        { say: 'The area between a graph and the horizontal axis multiplies the two quantities on the axes.', show: 'def' },
        { say: 'On a velocity–time graph, that is metres per second times seconds, which is metres. So the area under the graph is the distance travelled.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The tram',
      layout: 'split',
      leftWidth: 600,
      left: [figure('gr', [g, poly('area', [[0, 0], [4 * sx, 12 * sy], [10 * sx, 12 * sy], [14 * sx, 0]], 'adj'), polyline(g, { id: 'v', points: [[0, 0], [4, 12], [10, 12], [14, 0]] })], 520)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Sides: } 14 \\text{ and } 6', '\\text{Height: } 12', '\\tfrac{1}{2}(14 + 6) \\times 12 = 120', '\\text{Distance} = 120\\text{ m}'] },
      ],
      lines: [
        { say: 'Here is the tram from part one, which speeds up, travels steadily, and slows down to a stop.', show: ['gr.grid', 'gr.axes', 'gr.v'] },
        { say: 'The area under its graph is a trapezium.', show: 'gr.area', focus: 'gr.area' },
        { say: 'Its parallel sides are the bottom, fourteen seconds long, and the top, from four to ten seconds, which is six seconds long.', show: 'm.0', focus: 'm.0' },
        { say: 'Its height is the top speed, twelve metres per second.', show: 'm.1', focus: 'm.1' },
        { say: 'The area of a trapezium is half the sum of the parallel sides, times the height: one half of fourteen plus six, times twelve, which is one hundred twenty.', show: 'm.2', focus: 'm.2' },
        { say: 'So the tram travels one hundred twenty metres between the stops.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Estimating under a curve',
      layout: 'split',
      leftWidth: 600,
      left: [figure('cv', [c, plot(c, { id: 'curve', f: curveV, from: 0, to: 8 }), ...[0, 1, 2, 3].map((i) => poly(`s${i}`, [[2 * i * cx, 0], [2 * i * cx, vel[i] * cy], [2 * (i + 1) * cx, vel[i + 1] * cy], [2 * (i + 1) * cx, 0]], 'opp'))], 520)],
      right: [
        { kind: 'table', id: 't', head: ['Time (s)', '0', '2', '4', '6', '8'], rows: [['Velocity (m/s)', '0', '7', '12', '15', '16']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{2}(0 + 7) \\times 2 = 7', '\\tfrac{1}{2}(7 + 12) \\times 2 = 19', '\\tfrac{1}{2}(12 + 15) \\times 2 = 27', '\\tfrac{1}{2}(15 + 16) \\times 2 = 31', '7 + 19 + 27 + 31 = 84\\text{ m}'] },
      ],
      lines: [
        { say: 'When the graph is curved, we cannot find the area exactly with shapes. Instead, we split it into strips of equal width, and treat each strip as a trapezium.', show: ['cv.grid', 'cv.axes', 'cv.curve'] },
        { say: 'A cyclist’s velocity is zero, seven, twelve, fifteen and sixteen metres per second, at zero, two, four, six and eight seconds.', show: 't', focus: 't' },
        { say: 'The first strip has parallel sides zero and seven, and a width of two seconds. Its area is one half of zero plus seven, times two, which is seven.', show: ['cv.s0', 'm.0'], focus: ['cv.s0', 'm.0'] },
        { say: 'The others give nineteen, twenty seven and thirty one.', show: ['cv.s1', 'cv.s2', 'cv.s3', 'm.1', 'm.2', 'm.3'], focus: ['m.1', 'm.2', 'm.3'] },
        { say: 'Add them up: seven plus nineteen plus twenty seven plus thirty one is eighty four. So the cyclist travels about eighty four metres.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Too high or too low?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which way the curve bends', md: 'If the curve bends **downwards**, it runs above the straight tops of the trapezia: they leave gaps, so the estimate is **too low**. If it bends **upwards** (like $y = x^2$), the trapezia stick out above it, so the estimate is **too high**.' },
      ],
      lines: [
        { say: 'Is eighty four metres too high or too low? Look at how the curve bends.', show: 'tip' },
        { say: 'The cyclist’s curve bends downwards, so it runs above the straight tops of the trapezia. They leave small gaps under the curve, so the estimate is a little too low.' },
        { say: 'If a curve bends upwards, like y equals x squared, the trapezia stick out above it, so the estimate is too high. Using more, narrower strips makes the estimate closer either way.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car speeds up steadily from rest to $20$ m/s in $10$ seconds. Using the area under its velocity–time graph, how far does it travel in those $10$ seconds?',
          choices: ['$200$ m', '$2$ m', '$20$ m', '$100$ m'],
          answer: 3,
          working: 'The area is a triangle: $\\tfrac{1}{2} \\times 10 \\times 20 = 100$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A car speeds up steadily from rest to twenty metres per second in ten seconds. Using the area under its velocity–time graph, how far does it travel in those ten seconds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The area is a triangle with a base of ten and a height of twenty, so it is one half times ten times twenty, which is one hundred metres. Choice A forgets the half, and choice B is the acceleration.', show: 'q.answer' },
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
          items: ['The area under a velocity–time graph is the distance travelled.', 'Split the area into triangles, rectangles and trapezia.', 'Under a curve, estimate with strips of equal width.', 'Bends downwards: too low. Bends upwards: too high.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The area under a velocity–time graph is the distance travelled.', show: 'sum.0' },
        { say: 'Split the area into triangles, rectangles and trapezia, and add up their areas.', show: 'sum.1' },
        { say: 'Under a curve, estimate the area with strips of equal width, each treated as a trapezium.', show: 'sum.2' },
        { say: 'And look at how the curve bends to decide if the estimate is too high or too low. In the next lesson, we draw the graphs of sine, cosine and tangent. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
