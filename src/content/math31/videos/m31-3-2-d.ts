import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, riseRun, tag, tangent } from './lib/m31-3-graphs.ts';

// A draining tank: a volume graph with V(10) = 200 L and V′(10) = −15 L/min.
const V = (t: number) => 400 - 25 * t + 0.5 * t * t;
const g = plane({ x: [0, 25], y: [0, 400], xStep: 2.5, yStep: 50, every: 0, width: 7, height: 6, titles: { x: '\\text{Time (min)}', y: '\\text{Volume (L)}' } });
const tank = figure('tk', [
  g,
  numbers(g, 5, 100),
  plot(g, { id: 'V', f: V, tone: 'adj', samples: 200 }),
  tangent(g, { id: 'tan', at: [10, 200], m: -15, ext: 6.5 }),
  riseRun(g, { id: 'rr', from: [10, 200], to: [16, 110], run: '6\\text{ min}', rise: '-90\\text{ L}', runSide: 'above' }),
  dots(g, [{ id: 'P', x: 10, y: 200, tone: 'good', group: 'pt' }]),
  tag(g, 'P-t', 9.3, 165, '(10, 200)', 'left', 'good', 'pt'),
]);

const video: Explainer = {
  id: 'm31-3-2-d',
  lessonId: 'm31-3-2',
  title: 'The Derivative from First Principles, Part 4: Interpreting the Derivative',
  thumbnailTitle: 'What a Derivative Means',
  thumbnail: 'tk',
  summary: 'What the value of a derivative means: f′(a) is the instantaneous rate of change at x = a, in units of f per unit of x, and its sign shows whether f is increasing or decreasing. A tank with V′(10) = −15 is draining at 15 L/min after ten minutes; a cost with C′(200) = 18 rises about $18 per jersey; and a derivative is a rate, not an amount.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 4', title: 'Interpreting the Derivative', subtitle: 'Units, sign and meaning' }],
      lines: [
        { say: 'A derivative is more than the slope of a graph. In a real situation, it tells you how fast something is changing at one instant, and in which direction.', show: 'title' },
        { say: 'In this video, you will interpret the value of a derivative: its units, its sign, and what it says about the situation.' },
      ],
    },
    {
      chapter: 'Units and sign',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reading f′(a)', md: '$f\'(a)$ is the instantaneous rate of change of $f$ at $x = a$.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Units:** (units of $f$) per (unit of $x$).', '**Positive:** $f$ is increasing at $x = a$.', '**Negative:** $f$ is decreasing at $x = a$.', '**Size:** how fast $f$ is changing there.'],
        },
      ],
      lines: [
        { say: 'f prime of "a" is the instantaneous rate of change of f at x equals "a". To read it, look at three things.', show: 'key' },
        { say: 'First, its units. Like any rate, they are the units of f, per one unit of x.', show: 'b.0' },
        { say: 'Second, its sign. A positive derivative means f is increasing there, and a negative derivative means f is decreasing.', show: ['b.1', 'b.2'] },
        { say: 'And third, its size, ignoring the sign, which tells you how fast f is changing at that instant.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A draining tank',
      layout: 'split',
      leftWidth: 560,
      left: [tank],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$V(t)$ is the volume of water in a tank, in litres, $t$ minutes after a valve is opened, and $V\'(10) = -15$. What does this mean?' },
        { kind: 'bullets', id: 'b', items: ['Units: litres per minute.', 'Negative: the volume is decreasing.', 'At $10$ minutes, the water drains at $15$ L/min.'] },
      ],
      lines: [
        { say: 'V of t is the volume of water in a tank, in litres, t minutes after a valve is opened. And V prime of ten equals negative fifteen. What does this mean?', show: ['q', 'tk.grid', 'tk.axes', 'tk.V'] },
        { say: 'First, the units. V is measured in litres, and t in minutes, so V prime is measured in litres per minute.', show: 'b.0' },
        { say: 'Next, the sign. The value is negative, so the volume is decreasing.', show: 'b.1' },
        { say: 'So ten minutes after the valve opens, the water is draining at fifteen litres per minute.', show: 'b.2', focus: 'b.2' },
        { say: 'On the graph, negative fifteen is the slope of the tangent at ten minutes. Over six minutes, the tangent drops 90 litres: fifteen litres for each minute.', show: ['tk.pt', 'tk.tan', 'tk.rr'], focus: ['tk.tan', 'tk.rr'] },
      ],
    },
    {
      chapter: 'Marginal cost',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$C(x)$ is the cost, in dollars, of making $x$ team jerseys, and $C\'(200) = 18$. Interpret this.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Units: dollars per jersey.', 'Positive: the cost is increasing.', 'When $200$ jerseys have been made, the cost is rising at \\$18 per jersey: making the next jersey costs about \\$18.'],
        },
      ],
      lines: [
        { say: 'Here is another example. C of x is the cost, in dollars, of making x team jerseys, and C prime of 200 equals eighteen. Interpret this.', show: 'q' },
        { say: 'The units of C prime are dollars per jersey. And the value is positive, so the cost is increasing.', show: ['b.0', 'b.1'] },
        { say: 'So when 200 jerseys have been made, the cost is rising at eighteen dollars per jersey. In other words, making one more jersey, the two hundred and first, costs about eighteen dollars.', show: 'b.2' },
        { say: 'In business, this derivative is called the marginal cost: the approximate cost of making one more item.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The derivative is not the function value', md: '$V\'(10) = -15$ does **not** say the tank holds $-15$ L, or that $15$ L drained during the first ten minutes. It is a rate, at one instant.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['V(10) = 200\\text{ L} \\qquad \\text{(an amount)}', 'V\'(10) = -15\\text{ L/min} \\qquad \\text{(a rate)}'] },
      ],
      lines: [
        { say: 'Do not confuse a derivative with the function itself. V prime of ten equals negative fifteen does not say the tank holds negative fifteen litres. That would make no sense.', show: 'oops' },
        { say: 'It also does not say that fifteen litres drained during the first ten minutes. That would be a total change, not a rate.' },
        { say: 'In this graph, the tank holds 200 litres at ten minutes: that is V of ten, an amount. V prime of ten, negative fifteen litres per minute, is how fast that amount is changing at that instant.', show: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$T(t)$ is the temperature of a cup of coffee, in °C, $t$ minutes after it is poured, and $T\'(5) = -3$. What does this mean?',
          choices: [
            'Five minutes after it is poured, the coffee is cooling at $3$ °C per minute.',
            'The coffee is at $-3$ °C after five minutes.',
            'The coffee cooled by $3$ °C during the first five minutes.',
            'Five minutes after it is poured, the coffee is warming at $3$ °C per minute.',
          ],
          answer: 0,
          working: 'The units of $T\'$ are °C per minute, and the value is negative, so the temperature is decreasing at $3$ °C per minute at $t = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. T of t is the temperature of a cup of coffee, in degrees Celsius, t minutes after it is poured, and T prime of five equals negative three. What does this mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The units are degrees per minute, and the value is negative, so five minutes after it is poured, the coffee is cooling at three degrees per minute. Choice B treats the rate as the temperature itself.', show: 'q.answer' },
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
            '$f\'(a)$ is the instantaneous rate of change of $f$ at $x = a$.',
            'Its units are (units of $f$) per (unit of $x$).',
            'Positive: $f$ is increasing. Negative: $f$ is decreasing.',
            'A derivative is a rate, not an amount or a total change.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. f prime of "a" is the instantaneous rate of change of f at x equals "a".', show: 'sum.0' },
        { say: 'Its units are the units of f, per unit of x.', show: 'sum.1' },
        { say: 'If it is positive, f is increasing, and if it is negative, f is decreasing.', show: 'sum.2' },
        { say: 'And a derivative is a rate, not an amount or a total change. In the next part, we differentiate reciprocal and square root functions from first principles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
