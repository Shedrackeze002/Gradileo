import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, plane, plot, secant } from './lib/m31-3-graphs.ts';

// A ball thrown upward: h(t) = 2 + 19.6t − 4.9t² metres after t seconds.
const h = (t: number) => 2 + 19.6 * t - 4.9 * t * t;
const g = plane({ x: [0, 4.5], y: [0, 24], xStep: 0.5, yStep: 2, every: 0, width: 7, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Height (m)}' } });
const ball = (id: string, lines: ('up' | 'down' | 'flat')[]) =>
  figure(id, [
    g,
    numbers(g, 1, 4),
    plot(g, { id: 'h', f: h, from: 0, to: 4.1, tone: 'adj', samples: 200 }),
    ...[1, 2, 3].map((t) => guide(g, `d${t}`, [t, 0], [t, h(t)], 'muted', { group: 'drops' })),
    ...(lines.includes('up') ? [secant(g, { id: 'up', f: h, a: 1, b: 2, ext: 0.45, tone: 'theta' })] : []),
    ...(lines.includes('down') ? [secant(g, { id: 'down', f: h, a: 2, b: 3, ext: 0.45, tone: 'opp' })] : []),
    ...(lines.includes('flat') ? [secant(g, { id: 'flat', f: h, a: 1, b: 3, ext: 0.4, tone: 'hyp' })] : []),
    dots(g, [1, 2, 3].map((t) => ({ id: `p${t}`, x: t, y: h(t), tone: 'theta' as const, group: 'pts' }))),
  ]);

const video: Explainer = {
  id: 'm31-3-1-c',
  lessonId: 'm31-3-1',
  title: 'Rates of Change and Tangent Lines, Part 3: Average Velocity',
  thumbnailTitle: 'Average Velocity',
  thumbnail: 'b2',
  summary: 'For a position function, the average rate of change is the average velocity, and its sign gives the direction. A ball with height h(t) = 2 + 19.6t − 4.9t² has average velocity 4.9 m/s from 1 to 2 seconds (rising) and −4.9 m/s from 2 to 3 seconds (falling), and an average velocity of 0 from 1 to 3 seconds even though it was moving.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 3', title: 'Average Velocity', subtitle: 'The rate of change of position' }],
      lines: [
        { say: 'Throw a ball straight up. It rises, slows down, stops for an instant at the top, and falls back. Its height changes all the time, and so does how fast it moves.', show: 'title' },
        { say: 'In this video, you will find the average velocity of a moving object from its position, and see what the sign of a velocity tells you.' },
      ],
    },
    {
      chapter: 'Position and velocity',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Average velocity', md: 'When $s(t)$ is the position of an object at time $t$, the average rate of change of $s$ is the object’s **average velocity**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{average velocity} = \\dfrac{s(t_2) - s(t_1)}{t_2 - t_1}'] },
        { kind: 'bullets', id: 'b', items: ['Positive: moving in the positive direction (up, for a height).', 'Negative: moving the other way (down, for a height).'] },
      ],
      lines: [
        { say: 'Suppose s of t is the position of an object at time t: for example, its height above the ground. The average rate of change of its position over a time interval is called its average velocity.', show: 'def' },
        { say: 'It is the change in position divided by the change in time: s of t two minus s of t one, over t two minus t one. Here t one is the earlier time, and t two the later time.', show: 'm', focus: 'm' },
        { say: 'A velocity is more than a speed: it has a sign. It is positive when the object moves in the positive direction, which is up for a height.', show: 'b.0' },
        { say: 'It is negative when the object moves the other way, which is down. The speed is the size of the velocity, without its sign.', show: 'b.1' },
      ],
    },
    {
      chapter: 'A ball thrown upward',
      layout: 'split',
      leftWidth: 560,
      left: [ball('b1', [])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A ball’s height after $t$ seconds is $h(t) = 2 + 19.6t - 4.9t^2$ metres.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h(1) = 2 + 19.6 - 4.9 = 16.7', 'h(2) = 2 + 39.2 - 19.6 = 21.6', 'h(3) = 2 + 58.8 - 44.1 = 16.7'] },
      ],
      lines: [
        { say: 'A ball is thrown upward. Its height, in metres, after t seconds is h of t equals two, plus 19.6 t, minus 4.9 t squared.', show: ['q', 'b1.grid', 'b1.axes', 'b1.h'] },
        { say: 'Find its average velocity from one second to two seconds, and from two seconds to three seconds. First, find the heights at those times.' },
        { say: 'h of one is two, plus 19.6, minus 4.9, which is 16.7 metres.', show: ['m.0', 'b1.p1', 'b1.d1'], focus: ['m.0', 'b1.p1'] },
        { say: 'h of two is two, plus 39.2, minus 19.6, which is 21.6 metres.', show: ['m.1', 'b1.p2', 'b1.d2'], focus: ['m.1', 'b1.p2'] },
        { say: 'And h of three is two, plus 58.8, minus 44.1, which is 16.7 metres again.', show: ['m.2', 'b1.p3', 'b1.d3'], focus: ['m.2', 'b1.p3'] },
      ],
    },
    {
      chapter: 'Rising, then falling',
      layout: 'split',
      leftWidth: 560,
      left: [ball('b2', ['up', 'down'])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{21.6 - 16.7}{2 - 1} = 4.9\\text{ m/s}', '\\dfrac{16.7 - 21.6}{3 - 2} = -4.9\\text{ m/s}'] },
        { kind: 'bullets', id: 'b', items: ['$4.9$ m/s: rising.', '$-4.9$ m/s: falling.'] },
      ],
      lines: [
        { say: 'From one second to two seconds, the average velocity is 21.6 minus 16.7, over two minus one. That is 4.9 over one: 4.9 metres per second.', show: ['b2.grid', 'b2.axes', 'b2.h', 'b2.pts', 'b2.drops', 'm.0', 'b2.up'], focus: ['m.0', 'b2.up'] },
        { say: 'It is positive, because the ball is rising. On the graph, the secant line from one to two seconds goes up.', show: 'b.0' },
        { say: 'From two seconds to three seconds, the average velocity is 16.7 minus 21.6, over three minus two: negative 4.9 metres per second.', show: ['m.1', 'b2.down'], focus: ['m.1', 'b2.down'] },
        { say: 'It is negative, because the ball is falling, and the secant line goes down. The ball has the same average speed, 4.9 metres per second, but it is moving in the opposite direction.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [ball('b3', ['flat'])],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Average is not total', md: 'An average rate of change compares only the start and the end of an interval. From $t = 1$ to $t = 3$, the ball’s average velocity is zero, but it was moving the whole time.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{16.7 - 16.7}{3 - 1} = 0'] },
      ],
      lines: [
        { say: 'Now find the average velocity from one second to three seconds. The height is 16.7 metres at both times, so the average velocity is zero over two, which is zero.', show: ['b3.grid', 'b3.axes', 'b3.h', 'b3.p1', 'b3.p3', 'b3.d1', 'b3.d3', 'm', 'b3.flat'], focus: ['m', 'b3.flat'] },
        { say: 'Does that mean the ball was not moving? Of course not. It rose 4.9 metres, then fell back down to the same height.', show: ['b3.p2', 'b3.d2'], focus: 'b3.h' },
        { say: 'An average rate of change only compares the start and the end of an interval. It says nothing about what happened in between. On the graph, the secant line is flat, even though the curve is not.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A stone is dropped from a ledge. Its height after $t$ seconds is $h(t) = 30 - 4.9t^2$ metres. Find its average velocity from $t = 1$ to $t = 2$.',
          choices: ['$-14.7$ m/s', '$14.7$ m/s', '$-4.9$ m/s', '$17.75$ m/s'],
          answer: 0,
          working: '$h(1) = 30 - 4.9 = 25.1$ and $h(2) = 30 - 19.6 = 10.4$, so the average velocity is $\\dfrac{10.4 - 25.1}{2 - 1} = -14.7$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A stone is dropped from a ledge. Its height, in metres, after t seconds is h of t equals 30, minus 4.9 t squared. Find its average velocity from one second to two seconds. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. h of one is 30 minus 4.9, which is 25.1 metres, and h of two is 30 minus 19.6, which is 10.4 metres. The height changes by negative 14.7 metres in one second, so the average velocity is negative 14.7 metres per second. Choice B has the wrong sign: the stone is falling.', show: 'q.answer' },
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
            'Average velocity is the average rate of change of position: $\\dfrac{s(t_2) - s(t_1)}{t_2 - t_1}$.',
            'Positive: moving in the positive direction. Negative: moving the other way.',
            'An average compares only the start and the end of the interval.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Average velocity is the average rate of change of position: the change in position over the change in time.', show: 'sum.0' },
        { say: 'Its sign gives the direction. Positive means moving in the positive direction, such as up, and negative means moving the other way.', show: 'sum.1' },
        { say: 'And an average compares only the start and the end of the interval. In the next part, we shrink the interval to find a rate of change at a single instant. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
