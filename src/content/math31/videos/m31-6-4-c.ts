import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, num, plane, plot, rename, tangent } from './lib/m31-6-graphs.ts';

// A ball thrown upward: h(t) = 1.5 + 19.6t − 4.9t² metres, highest at t = 2 s (21.1 m).
const h = (t: number) => 1.5 + 19.6 * t - 4.9 * t * t;
const v = (t: number) => 19.6 - 9.8 * t;
const land = (19.6 + Math.sqrt(19.6 ** 2 + 4 * 4.9 * 1.5)) / 9.8;
const g = rename(plane({ x: [0, 4.4], y: [0, 25], xStep: 0.5, yStep: 5, every: 0, width: 6, height: 5.2 }), 't', 'h');

const video: Explainer = {
  id: 'm31-6-4-c',
  lessonId: 'm31-6-4',
  title: 'Motion Along a Line, Part 3: Rising and Falling',
  thumbnailTitle: 'Rising and Falling',
  thumbnail: 'bl',
  summary: 'Vertical motion with a model that ignores air resistance: a ball thrown upward from 1.5 m at 19.6 m/s has height h(t) = 1.5 + 19.6t − 4.9t², velocity v(t) = 19.6 − 9.8t and constant acceleration −9.8 m/s², so it is highest when v = 0, at t = 2 s and 21.1 m. A stone dropped from 44.1 m, h(t) = 44.1 − 4.9t², hits the water after 3 s at −29.4 m/s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 3', title: 'Rising and Falling', subtitle: 'Motion straight up and down' }],
      lines: [
        { say: 'Throw a ball straight up. It slows down as it rises, stops for an instant at the top, then falls faster and faster.', show: 'title' },
        { say: 'Up and down is motion along a line too, with up as the positive direction. In this video, you will find when a ball is highest, and how fast a falling stone hits the water.' },
      ],
    },
    {
      chapter: 'A ball thrown upward',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Ignoring air resistance, a ball thrown upward from $1.5$ m at $19.6$ m/s has height $h(t) = 1.5 + 19.6t - 4.9t^{2}$ metres after $t$ seconds. When is it highest, and how high does it go?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['v(t) = 19.6 - 9.8t = 0 \\quad\\Rightarrow\\quad t = 2\\text{ s}', 'h(2) = 1.5 + 39.2 - 19.6 = 21.1\\text{ m}', 'a(t) = -9.8\\text{ m/s}^{2}'],
        },
      ],
      lines: [
        { say: 'Here is a model that ignores air resistance. A ball thrown upward from 1.5 metres, at 19.6 metres per second, has height h of t equals 1.5, plus 19.6 t, minus 4.9 t squared, after t seconds. When is it highest, and how high does it go?', show: 'q' },
        { say: 'At the top, the ball stops for an instant: its velocity is zero. The velocity is 19.6 minus 9.8 t, which is zero when t is two seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'Its height then is 1.5, plus 39.2, minus 19.6: 21.1 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Differentiate once more: the acceleration is negative 9.8 metres per second squared, the same at every moment. That is gravity, always pulling downward.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Up, stop, down',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('bl', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4], ys: [0, 5, 10, 15, 20, 25], xTex: num, yTex: num }),
          plot(g, { id: 'h', f: h, from: 0, to: land, samples: 200 }),
          tangent(g, { id: 't1', a: 1, y: h(1), m: v(1), left: 0.45, right: 0.45, tone: 'good', dot: '' }),
          tangent(g, { id: 't2', a: 2, y: h(2), m: 0, left: 0.6, right: 0.6, tone: 'theta', dot: '' }),
          tangent(g, { id: 't3', a: 3, y: h(3), m: v(3), left: 0.45, right: 0.45, tone: 'bad', dot: '' }),
          dots(g, [{ id: 'top', x: 2, y: h(2), tex: '(2, 21.1)', tone: 'theta', place: 'above' }]),
        ]),
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['$t = 1$: $v = 9.8$ m/s, rising.', '$t = 2$: $v = 0$, at the top.', '$t = 3$: $v = -9.8$ m/s, falling.'],
        },
      ],
      lines: [
        { say: 'Here is the height of the ball against time. Its slope is the velocity.', show: ['bl.grid', 'bl.axes', 'bl.h'] },
        { say: 'At one second, the velocity is 9.8 metres per second: positive, so the ball is rising.', show: ['bl.t1-all', 'b.0'], focus: ['bl.t1', 'b.0'] },
        { say: 'At two seconds, the velocity is zero. The tangent line is level: the ball is at the top, 21.1 metres up.', show: ['bl.t2-all', 'bl.top', 'b.1'], focus: ['bl.t2', 'b.1'] },
        { say: 'At three seconds, the velocity is negative 9.8 metres per second: the ball is falling, just as fast as it was rising one second before the top.', show: ['bl.t3-all', 'b.2'], focus: ['bl.t3', 'b.2'] },
      ],
    },
    {
      chapter: 'Hitting the water',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A stone is dropped from a bridge $44.1$ m above a river, so $h(t) = 44.1 - 4.9t^{2}$. When does it hit the water, and how fast is it going?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['h(t) = 0\\colon\\quad 4.9t^{2} = 44.1, \\quad t^{2} = 9, \\quad t = 3\\text{ s}', "v(t) = h'(t) = -9.8t", 'v(3) = -29.4\\text{ m/s}'],
        },
        { kind: 'text', id: 'a', md: 'It hits the water after $3$ s with velocity $-29.4$ m/s: a **speed** of $29.4$ m/s, **downward**.' },
      ],
      lines: [
        { say: 'Next, a stone is dropped from a bridge, 44.1 metres above a river, so its height is h of t equals 44.1 minus 4.9 t squared. When does it hit the water, and how fast is it going?', show: 'q' },
        { say: 'It hits the water when its height is zero. So 4.9 t squared equals 44.1, which gives t squared equals nine. Time is positive, so t is three seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'The velocity is the derivative of the height: negative 9.8 t. At three seconds, that is negative 29.4 metres per second.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The minus sign gives the direction: down. The speed is the size of the velocity, 29.4 metres per second.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball thrown upward has height $h(t) = 2 + 24.5t - 4.9t^{2}$ metres after $t$ seconds. When is it highest, and how high is it then?',
          choices: ['At $t = 5$ s, $2$ m', 'At $t = 2.5$ s, $32.625$ m', 'At $t = 2.5$ s, $63.25$ m', 'At $t = 2$ s, $31.4$ m'],
          answer: 1,
          working: '$v(t) = 24.5 - 9.8t = 0$ at $t = 2.5$ s, and $h(2.5) = 2 + 61.25 - 30.625 = 32.625$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball thrown upward has height h of t equals two, plus 24.5 t, minus 4.9 t squared, in metres. When is it highest, and how high is it then? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. v of t is 24.5 minus 9.8 t, which is zero at 2.5 seconds. Then h of 2.5 is two, plus 61.25, minus 30.625: 32.625 metres. Choice A is when the ball comes back down to its starting height.', show: 'q.answer' },
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
          items: ['An object thrown upward is highest when $v = 0$.', 'In these models the acceleration is a constant $-9.8$ m/s², downward.', 'Velocity has a direction; speed is its size.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An object thrown upward is highest when its velocity is zero.', show: 'sum.0' },
        { say: 'In these models, the acceleration is a constant negative 9.8 metres per second squared: gravity pulling downward.', show: 'sum.1' },
        { say: 'And velocity has a direction, while speed is just its size. In the next part, we find when an object is speeding up and when it is slowing down. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
