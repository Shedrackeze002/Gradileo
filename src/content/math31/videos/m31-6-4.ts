import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, num, plane, plot, rename, tangent } from './lib/m31-6-graphs.ts';

// A particle at s(t) = t³ − 9t² + 24t metres after t seconds, and its tangent at t = 1 (slope 9).
const s = (t: number) => t ** 3 - 9 * t * t + 24 * t;
const g = rename(plane({ x: [0, 6], y: [0, 40], xStep: 1, yStep: 5, every: 0, width: 6, height: 5.4 }), 't\\text{ (s)}', 's\\text{ (m)}');

const video: Explainer = {
  id: 'm31-6-4',
  lessonId: 'm31-6-4',
  title: 'Motion Along a Line, Part 1: Velocity and Acceleration',
  thumbnailTitle: 'Velocity and Acceleration',
  thumbnail: 'st',
  summary: 'For an object moving along a line with position s(t), velocity is v(t) = s′(t), the slope of the position graph; acceleration is a(t) = v′(t) = s″(t); and speed is |v(t)|. For s(t) = t³ − 9t² + 24t metres, v(1) = 9 m/s and a(1) = −12 m/s².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 1', title: 'Velocity and Acceleration', subtitle: 'The derivatives of position' }],
      lines: [
        { say: 'A car’s odometer tells you how far it has gone. Its speedometer tells you how fast. And the push you feel in your seat tells you how quickly the speed is changing.', show: 'title' },
        { say: 'For an object moving along a straight line, these are position, velocity and acceleration, and each one is the derivative of the one before. In this video, you will find all three.' },
      ],
    },
    {
      chapter: 'Position',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('st', [
          g,
          edgeNumbers(g, { xs: [0, 1, 2, 3, 4, 5, 6], ys: [0, 10, 20, 30, 40], xTex: num, yTex: num }),
          plot(g, { id: 's', f: s, samples: 240 }),
          tangent(g, { id: 't', a: 1, y: 16, m: 9, left: 1, right: 0.9, tone: 'opp', dot: '' }),
          note(g, { id: 'm', x: 2.3, y: 28, tex: '\\text{slope } 9', tone: 'opp' }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Position', md: '$s(t)$ is the position of the object on the line at time $t$, measured from a fixed origin, with a chosen positive direction.' },
        { kind: 'text', id: 'k', md: 'The **velocity** is the slope of the position graph.' },
      ],
      lines: [
        { say: 'Let s of t be the position of an object on a line at time t, measured from a fixed origin, with one direction chosen as positive.', show: 'def' },
        { say: 'Here is the graph of a particle’s position, s of t equals t cubed, minus nine t squared, plus 24 t, in metres, after t seconds.', show: ['st.grid', 'st.axes', 'st.s'] },
        { say: 'The slope of this graph is the rate of change of position: how many metres per second the particle moves. At one second, the tangent line has slope nine, so the particle is moving at nine metres per second. That rate is its velocity.', show: ['st.t-all', 'st.m', 'k'], focus: ['st.t', 'k'] },
      ],
    },
    {
      chapter: 'Velocity and acceleration',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Velocity and acceleration',
          md: "**Velocity** is the rate of change of position, $v(t) = s'(t)$. **Acceleration** is the rate of change of velocity, $a(t) = v'(t) = s''(t)$. **Speed** is the size of the velocity, $|v(t)|$.",
        },
        { kind: 'table', id: 't', head: ['Quantity', 'Formula', 'Units'], rows: [['position', '$s(t)$', 'm'], ['velocity', "$v(t) = s'(t)$", 'm/s'], ['acceleration', "$a(t) = v'(t) = s''(t)$", 'm/s²']] },
      ],
      lines: [
        { say: 'Velocity is the rate of change of position: v of t is s prime of t. Acceleration is the rate of change of velocity: a of t is v prime of t, which is s double prime of t.', show: 'def' },
        { say: 'Speed is the size of the velocity, without its sign: the absolute value of v of t.' },
        { say: 'The units follow from the rates. If position is in metres and time in seconds, velocity is in metres per second, and acceleration is in metres per second, per second, usually said as metres per second squared.', show: 't' },
      ],
    },
    {
      chapter: 'At an instant',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A particle moves along a line so that its position after $t$ seconds is $s(t) = t^{3} - 9t^{2} + 24t$ metres, for $t \\ge 0$. Find its velocity and acceleration at $t = 1$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['v(t) = 3t^{2} - 18t + 24', 'v(1) = 3 - 18 + 24 = 9\\text{ m/s}', 'a(t) = 6t - 18', 'a(1) = 6 - 18 = -12\\text{ m/s}^{2}'],
        },
      ],
      lines: [
        { say: 'Find the velocity and acceleration of this particle at t equals one second.', show: 'q' },
        { say: 'Differentiate the position: v of t is three t squared, minus eighteen t, plus 24.', show: 'm.0', focus: 'm.0' },
        { say: 'At one second, that is three, minus eighteen, plus 24: nine metres per second, just as the slope of the graph showed.', show: 'm.1', focus: 'm.1' },
        { say: 'Differentiate again: a of t is six t minus eighteen. At one second, that is six minus eighteen: negative twelve metres per second squared.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So at one second the particle is moving forward at nine metres per second, but its velocity is decreasing by twelve metres per second, every second.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle has position $s(t) = 2t^{3} - 9t^{2} + 12t$ metres after $t$ seconds. Find its velocity and acceleration at $t = 3$.',
          choices: ['$v = 9$ m/s, $a = 12$ m/s²', '$v = 18$ m/s, $a = 12$ m/s²', '$v = 12$ m/s, $a = 18$ m/s²', '$v = -12$ m/s, $a = 18$ m/s²'],
          answer: 2,
          working: '$v(t) = 6t^{2} - 18t + 12$, so $v(3) = 54 - 54 + 12 = 12$ m/s. $a(t) = 12t - 18$, so $a(3) = 36 - 18 = 18$ m/s².',
        },
      ],
      lines: [
        { say: 'Your turn. A particle has position s of t equals two t cubed, minus nine t squared, plus twelve t, in metres, after t seconds. Find its velocity and acceleration at t equals three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. v of t is six t squared, minus eighteen t, plus twelve, which is twelve metres per second at t equals three. a of t is twelve t minus eighteen, which is eighteen metres per second squared. Choice B swaps the velocity and the acceleration.', show: 'q.answer' },
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
          items: ["Velocity: $v(t) = s'(t)$, the slope of the position graph.", "Acceleration: $a(t) = v'(t) = s''(t)$.", 'Speed: $|v(t)|$. Units: m, m/s and m/s².'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Velocity is the derivative of position: the slope of the position graph.', show: 'sum.0' },
        { say: 'Acceleration is the derivative of velocity, and the second derivative of position.', show: 'sum.1' },
        { say: 'And speed is the size of the velocity. In the next part, the sign of the velocity tells us which way the object is moving, and when it turns around. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
