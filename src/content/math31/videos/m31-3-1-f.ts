import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, secant, tangent } from './lib/m31-3-graphs.ts';

// A falling stone: s(t) = 4.9t² metres fallen in t seconds. Its velocity at t = 2 is 19.6 m/s.
const s = (t: number) => 4.9 * t * t;
const g = plane({ x: [0, 3], y: [0, 45], xStep: 0.5, yStep: 5, every: 0, width: 7, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Distance fallen (m)}' } });
const stone = (id: string, extra: boolean) =>
  figure(id, [
    g,
    numbers(g, 1, 10),
    plot(g, { id: 's', f: s, tone: 'adj', samples: 200 }),
    ...(extra
      ? [secant(g, { id: 'sec', f: s, a: 2, b: 3, ext: 0.25, tone: 'theta', dashed: true }), tangent(g, { id: 'tan', at: [2, s(2)], m: 19.6 }), dots(g, [{ id: 'Q', x: 3, y: s(3), tone: 'theta' }])]
      : []),
    dots(g, [{ id: 'P', x: 2, y: s(2), tex: '(2, 19.6)', tone: 'good', place: 'above left' }]),
  ]);

const video: Explainer = {
  id: 'm31-3-1-f',
  lessonId: 'm31-3-1',
  title: 'Rates of Change and Tangent Lines, Part 6: Instantaneous Velocity',
  thumbnailTitle: 'Instantaneous Velocity',
  thumbnail: false,
  summary: 'The velocity at one instant is the limit of average velocities over shorter and shorter intervals. A stone falls s(t) = 4.9t² metres: its average velocity on [2, 2 + h] simplifies to 19.6 + 4.9h, so its velocity at t = 2 s is 19.6 m/s, the slope of the tangent to the position graph, and not the average of 9.8 m/s from the start.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 6', title: 'Instantaneous Velocity', subtitle: 'The velocity at one moment' }],
      lines: [
        { say: 'A dropped stone falls faster and faster, so its velocity is different at every instant. How fast is it falling at exactly two seconds?', show: 'title' },
        { say: 'In this video, you will find a velocity at one instant, as the limit of average velocities over shorter and shorter intervals.' },
      ],
    },
    {
      chapter: 'A falling stone',
      layout: 'split',
      leftWidth: 560,
      left: [stone('st', false)],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A stone falls $s(t) = 4.9t^2$ metres in $t$ seconds. Find its velocity at $t = 2$ s.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['s(2) = 4.9(2)^2 = 19.6\\text{ m}'] },
      ],
      lines: [
        { say: 'A stone is dropped. In t seconds, it falls s of t equals 4.9 t squared metres. Find its velocity at exactly two seconds.', show: ['q', 'st.grid', 'st.axes', 'st.s'] },
        { say: 'Here s is the distance fallen, so downward is the positive direction, and the velocity will be positive.' },
        { say: 'After two seconds, the stone has fallen 4.9 times two squared, which is 4.9 times four: 19.6 metres.', show: ['m.0', 'st.P'], focus: ['m.0', 'st.P'] },
        { say: 'The graph gets steeper and steeper, because the stone falls farther in each second than in the second before.', focus: 'st.s' },
      ],
    },
    {
      chapter: 'Average velocities',
      layout: 'split',
      leftWidth: 480,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Interval', 'Average velocity (m/s)'],
          rows: [
            ['$2$ to $3$', '$24.5$'],
            ['$2$ to $2.1$', '$20.09$'],
            ['$2$ to $2.01$', '$19.649$'],
            ['$2$ to $2.001$', '$19.6049$'],
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{s(3) - s(2)}{3 - 2} = \\dfrac{44.1 - 19.6}{1} = 24.5'] },
        { kind: 'text', id: 't2', size: 'md', md: 'As the interval shrinks, the average velocities approach $19.6$ m/s.' },
      ],
      lines: [
        { say: 'Start with average velocities. From two seconds to three seconds, the stone falls from 19.6 metres to 44.1 metres. Its average velocity is 24.5 over one, or 24.5 metres per second.', show: ['t.0', 'm'], focus: ['t.0', 'm'] },
        { say: 'Over a shorter interval, from two to 2.1 seconds, the average velocity is 20.09 metres per second.', show: 't.1', focus: 't.1' },
        { say: 'From two to 2.01 seconds, it is 19.649. And from two to 2.001 seconds, it is 19.6049.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'As the interval shrinks toward the instant t equals two, the average velocities close in on 19.6 metres per second.', show: 't2' },
      ],
    },
    {
      chapter: 'Exactly, with algebra',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{s(2 + h) - s(2)}{h} = \\dfrac{4.9(2 + h)^2 - 4.9(4)}{h}',
            '= \\dfrac{19.6 + 19.6h + 4.9h^2 - 19.6}{h}',
            '= \\dfrac{19.6h + 4.9h^2}{h} = 19.6 + 4.9h',
            '\\lim_{h \\to 0} (19.6 + 4.9h) = \\good{19.6\\text{ m/s}}',
          ],
        },
      ],
      lines: [
        { say: 'Now find it exactly. The average velocity from two seconds to two plus h seconds is s of two plus h, minus s of two, over h. That is 4.9 times two plus h, all squared, minus 4.9 times four, over h.', show: 'm.0', focus: 'm.0' },
        { say: 'Two plus h, all squared, is four, plus four h, plus h squared. Multiply each term by 4.9: 19.6, plus 19.6 h, plus 4.9 h squared.', show: 'm.1', focus: 'm.1' },
        { say: 'The two terms of 19.6 cancel, leaving 19.6 h plus 4.9 h squared, over h. Divide each term by h, to get 19.6 plus 4.9 h.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it against the table: with h equals 0.1, 19.6 plus 0.49 is 20.09. It matches.' },
        { say: 'Now let h approach zero. The term 4.9 h approaches zero, so the average velocity approaches 19.6. The stone’s velocity at two seconds is 19.6 metres per second.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 560,
      left: [stone('st2', true)],
      right: [{ kind: 'bullets', id: 'b', items: ['Secant from $t = 2$ to $t = 3$: slope $24.5$, an average velocity.', 'Tangent at $t = 2$: slope $19.6$, the velocity at that instant.'] }],
      lines: [
        { say: 'On the graph of position against time, each average velocity is the slope of a secant line. The one from two to three seconds has slope 24.5.', show: ['st2.grid', 'st2.axes', 'st2.s', 'st2.P', 'st2.Q', 'st2.sec', 'b.0'], focus: ['st2.sec', 'b.0'] },
        { say: 'The velocity at the instant t equals two is the slope of the tangent line there: 19.6.', show: ['st2.tan', 'b.1'], focus: ['st2.tan', 'b.1'] },
        { say: 'So an instantaneous velocity is an instantaneous rate of change: the slope of the tangent to the position graph.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The average from the start', md: 'The velocity at $t = 2$ is **not** the average velocity from $t = 0$ to $t = 2$. That average, $\\dfrac{19.6 - 0}{2} = 9.8$ m/s, describes the whole two seconds, while the stone was speeding up.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{s(2) - s(0)}{2 - 0} = 9.8}', '\\good{\\lim_{h \\to 0} \\dfrac{s(2 + h) - s(2)}{h} = 19.6}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide the distance fallen by the time: 19.6 metres in two seconds, which is 9.8 metres per second.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That is the average velocity over the whole two seconds. The stone started at rest and kept speeding up, so at the end of those two seconds it was moving much faster than its average.' },
        { say: 'The velocity at an instant needs a limit, over intervals that shrink around that instant.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A stone falls $s(t) = 4.9t^2$ metres in $t$ seconds. Its average velocity on $[1, 1 + h]$ simplifies to $9.8 + 4.9h$. What is its velocity at $t = 1$ s?',
          choices: ['$4.9$ m/s', '$9.8$ m/s', '$14.7$ m/s', '$19.6$ m/s'],
          answer: 1,
          working: 'As $h \\to 0$, $9.8 + 4.9h \\to 9.8$, so the velocity at $t = 1$ s is $9.8$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A stone falls s of t equals 4.9 t squared metres in t seconds. Its average velocity from one second to one plus h seconds simplifies to 9.8 plus 4.9 h. What is its velocity at one second? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. As h approaches zero, 4.9 h approaches zero, so the velocity is 9.8 metres per second. Choice A is the average velocity from zero to one second, not the velocity at one second.', show: 'q.answer' },
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
            'Velocity at an instant: the limit of average velocities as the interval shrinks.',
            '$v = \\displaystyle\\lim_{h \\to 0} \\dfrac{s(a + h) - s(a)}{h}$, the slope of the tangent to the position graph.',
            'It is not the average velocity from the start.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The velocity at an instant is the limit of average velocities, as the interval shrinks around that instant.', show: 'sum.0' },
        { say: 'It is the limit as h approaches zero of s of "a" plus h, minus s of "a", over h: the slope of the tangent to the position graph.', show: 'sum.1' },
        { say: 'And it is not the average velocity from the start. In the next lesson, we do this calculation at every point at once, and meet the derivative. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
