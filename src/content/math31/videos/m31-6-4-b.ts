import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, num, path, plane, plot, rename, signChart } from './lib/m31-6-graphs.ts';

// s(t) = t³ − 9t² + 24t: forward until t = 2 (s = 20), back until t = 4 (s = 16), then forward again.
const s = (t: number) => t ** 3 - 9 * t * t + 24 * t;
const g = rename(plane({ x: [0, 5.3], y: [0, 25], xStep: 1, yStep: 5, every: 0, width: 5.3, height: 5 }), 't', 's');

const video: Explainer = {
  id: 'm31-6-4-b',
  lessonId: 'm31-6-4',
  title: 'Motion Along a Line, Part 2: Direction of Motion',
  thumbnailTitle: 'Direction of Motion',
  thumbnail: 'pg',
  summary: 'The sign of the velocity gives the direction of motion: v > 0 is the positive direction, v < 0 the negative direction, and v = 0 means the object is at rest for an instant, where it can turn around. For s(t) = t³ − 9t² + 24t, v(t) = 3(t − 2)(t − 4): the particle is at rest at t = 2 s and t = 4 s, moves forward on [0, 2) ∪ (4, ∞) and backward on (2, 4).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 2', title: 'Direction of Motion', subtitle: 'Which way is it moving?' }],
      lines: [
        { say: 'An elevator goes up, stops, goes down, stops, and goes up again. A particle on a line can do the same: move forward, stop, and turn back.', show: 'title' },
        { say: 'In this video, you will use the sign of the velocity to tell which way an object is moving, and when it turns around.' },
      ],
    },
    {
      chapter: 'The sign of the velocity',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['$v > 0$: the object moves in the **positive** direction.', '$v < 0$: it moves in the **negative** direction.', '$v = 0$: it is **at rest** for an instant.'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Turning around', md: 'An object can only change direction at a time when it is at rest, $v = 0$.' },
      ],
      lines: [
        { say: 'The sign of the velocity gives the direction of motion. When v is positive, the position is increasing, so the object moves in the positive direction.', show: 'b.0' },
        { say: 'When v is negative, the position is decreasing, so it moves in the negative direction.', show: 'b.1' },
        { say: 'And when v is zero, the object is at rest, for an instant.', show: 'b.2' },
        { say: 'To change direction, the velocity must change sign, so it must pass through zero. An object can only turn around at a moment when it is at rest.', show: 'key' },
      ],
    },
    {
      chapter: 'When does it turn around?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['v(t) = 3t^{2} - 18t + 24 = 3(t - 2)(t - 4)', 'v(1) = 9 > 0, \\quad v(3) = -3 < 0, \\quad v(5) = 9 > 0'] },
        figure('sc', [signChart({ name: 's', title: 'v(t)', marks: ['2', '4'], signs: ['+', '-', '+'], notes: ['\\text{positive direction}', '\\text{negative}', '\\text{positive}'], width: 13 })]),
      ],
      lines: [
        { say: 'Take the particle from the last part, with position s of t equals t cubed, minus nine t squared, plus 24 t. When is it at rest, and when does it move in the positive direction?', show: 'm.0' },
        { say: 'Its velocity factors as three times t minus two, times t minus four. So it is at rest at two seconds and at four seconds.', focus: 'm.0', show: ['sc.s-base', 'sc.s-mk0', 'sc.s-mk1'] },
        { say: 'Test a time in each interval: v of one is nine, v of three is negative three, and v of five is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'So the particle moves in the positive direction from zero up to two seconds, in the negative direction between two and four seconds, and in the positive direction again after four seconds.', show: ['sc.s-i0', 'sc.s-i1', 'sc.s-i2'] },
      ],
    },
    {
      chapter: 'Seeing the motion',
      layout: 'split',
      leftWidth: 470,
      left: [
        figure('pg', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4, 5], ys: [0, 5, 10, 15, 20, 25], xTex: num, yTex: num }),
          plot(g, { id: 's', f: s, from: 0, to: 5.3, samples: 240 }),
          dots(g, [
            { id: 'a', x: 2, y: 20, tex: '(2, 20)', tone: 'theta', place: 'above' },
            { id: 'b', x: 4, y: 16, tex: '(4, 16)', tone: 'theta', place: 'below' },
          ]),
        ]),
      ],
      right: [
        figure('pa', [
          path({
            from: 0,
            to: 25,
            step: 5,
            unit: 's\\text{ (m)}',
            legs: [
              { from: 0, to: 20, label: '0 \\le t \\le 2', tone: 'good' },
              { from: 20, to: 16, label: '2 \\le t \\le 4', tone: 'bad' },
              { from: 16, to: 20, label: '4 \\le t \\le 5', tone: 'good' },
            ],
          }),
        ]),
      ],
      lines: [
        { say: 'Here is the position graph. It rises to the point at two, twenty, falls to the point at four, sixteen, then rises again. The turning points of the graph are the times when the particle is at rest.', show: ['pg.grid', 'pg.axes', 'pg.s', 'pg.a', 'pg.b'] },
        { say: 'On the line itself, the particle starts at the origin and moves forward twenty metres in the first two seconds.', show: ['pa.axis', 'pa.leg0'], focus: 'pa.leg0' },
        { say: 'Then it turns around and moves back four metres, to sixteen, between two and four seconds.', show: 'pa.leg1', focus: 'pa.leg1' },
        { say: 'Then it turns again, and moves forward, reaching twenty metres at five seconds.', show: 'pa.leg2', focus: 'pa.leg2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle has position $s(t) = t^{2} - 8t + 3$ metres after $t$ seconds, for $t \\ge 0$. When is it moving in the negative direction?',
          choices: ['$t > 4$', 'Only at $t = 4$', '$0 < t < 8$', '$0 \\le t < 4$'],
          answer: 3,
          working: '$v(t) = 2t - 8$, which is negative when $t < 4$. So the particle moves in the negative direction for $0 \\le t < 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. A particle has position s of t equals t squared, minus eight t, plus three, in metres, after t seconds. When is it moving in the negative direction? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. v of t is two t minus eight, which is negative when t is less than four. So the particle moves in the negative direction from the start until four seconds. Choice B is the moment it is at rest and turns around, not a time when it is moving.', show: 'q.answer' },
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
          items: ['$v > 0$: the positive direction. $v < 0$: the negative direction.', '$v = 0$: at rest for an instant, a possible turning point.', 'A sign chart for $v(t)$ shows the whole trip.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A positive velocity means motion in the positive direction, and a negative velocity means motion in the negative direction.', show: 'sum.0' },
        { say: 'A velocity of zero means the object is at rest for an instant, where it may turn around.', show: 'sum.1' },
        { say: 'And a sign chart for the velocity shows the whole trip. In the next part, we apply these ideas to a ball thrown up into the air. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
