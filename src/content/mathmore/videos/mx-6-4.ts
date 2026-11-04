import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { curve } from './lib/curve.ts';

const g = plane({ x: [-1, 10], y: [-2, 4] });
const c = plane({ x: [-2, 6], y: [-5, 3], every: 2 });

const video: Explainer = {
  id: 'mx-6-4',
  lessonId: 'mx-6-4',
  title: 'Parametric Equations',
  thumbnail: 'gr',
  summary: 'Parametric equations give x and y in terms of a parameter t. With x = 2t + 1 and y = 3 − t, the point at t = 4 is (9, −1). Solving for t and substituting eliminates the parameter: y = −x/2 + 7/2, a line. x = 3 cos t + 2, y = 3 sin t − 1 is the circle (x − 2)² + (y + 1)² = 9.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polar Form, Conics and Parametric Equations', title: 'Parametric Equations', subtitle: 'Where, and when' }],
      lines: [
        { say: 'A graph of y against x shows the path of a ball, but not when the ball was at each point.', show: 'title' },
        { say: 'Writing x and y each in terms of time shows both: where the ball is, and when. In this video, you will learn to use parametric equations, and to turn them back into an ordinary equation.' },
      ],
    },
    {
      chapter: 'Parametric equations',
      layout: 'split',
      leftWidth: 600,
      left: [figure('gr', [g,
        polyline(g, { id: 'path', points: [[-1, 4], [10, -1.5]], tone: 'hyp' }),
        dots(g, [{ id: 'p0', x: 1, y: 3, tex: 't = 0', place: 'above right' }, { id: 'p1', x: 3, y: 2, tex: 't = 1', place: 'above right' }, { id: 'p2', x: 5, y: 1, tex: 't = 2', place: 'above right' }, { id: 'p4', x: 9, y: -1, tex: '(9, -1)', place: 'below left', tone: 'opp' }]),
      ], 360)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parametric equations', md: '$x = f(t)$ and $y = g(t)$, each in terms of a **parameter** $t$. As $t$ changes, the point $(x, y)$ traces a curve.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 2t + 1, \\quad y = 3 - t', 't = 4: \\ x = 2(4) + 1 = 9', 'y = 3 - 4 = -1'] },
      ],
      lines: [
        { say: 'Parametric equations give x and y each as a function of a third variable, called the parameter. It is often t, for time.', show: 'def' },
        { say: 'As t changes, the point x, y moves and traces a curve. Take x equals two t plus one, and y equals three minus t.', show: ['m.0', 'gr.grid', 'gr.axes'], focus: 'm.0' },
        { say: 'At t equals zero, the point is at one, three. At t equals one it is at three, two, and at t equals two it is at five, one.', show: ['gr.p0', 'gr.p1', 'gr.p2'] },
        { say: 'Where is it when t is four? x is two times four plus one, which is nine, and y is three minus four, which is negative one. So the point is at nine, negative one.', show: ['m.1', 'm.2', 'gr.p4'], focus: 'm.2' },
        { say: 'Joining the points shows the path: a straight line, traced from left to right as t increases.', show: 'gr.path', focus: 'gr.path' },
      ],
    },
    {
      chapter: 'Eliminating the parameter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 2t + 1 \\quad \\Rightarrow \\quad t = \\dfrac{x - 1}{2}', 'y = 3 - t = 3 - \\dfrac{x - 1}{2}', 'y = -\\dfrac{1}{2}x + \\dfrac{7}{2}'] },
      ],
      lines: [
        { say: 'To find the ordinary equation of the path, we eliminate the parameter: solve one equation for t, and substitute into the other.', show: 'm.0', focus: 'm.0' },
        { say: 'From x equals two t plus one, t is x minus one, over two. Substitute that into y equals three minus t.', show: 'm.1', focus: 'm.1' },
        { say: 'This simplifies to y equals negative one half x, plus seven halves. So the path is a line with slope negative one half, just as the graph showed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A circle',
      layout: 'split',
      leftWidth: 480,
      left: [figure('cg', [c,
        curve(c, { id: 'circ', at: (t) => [3 * Math.cos(t) + 2, 3 * Math.sin(t) - 1], t0: 0, t1: 2 * Math.PI, n: 96, tone: 'hyp' }),
        polyline(c, { id: 'r', points: [[2, -1], [5, -1]], tone: 'opp', labels: ['3'], sides: ['right'] }),
        dots(c, [{ id: 'C', x: 2, y: -1, tex: '(2, -1)', place: 'above left' }, { id: 'S', x: 5, y: -1, tex: 't = 0', place: 'right', tone: 'opp' }]),
      ], 480)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 3\\cos t + 2, \\quad y = 3\\sin t - 1', '\\cos t = \\dfrac{x - 2}{3}, \\quad \\sin t = \\dfrac{y + 1}{3}', '\\cos^2 t + \\sin^2 t = 1', '(x - 2)^2 + (y + 1)^2 = 9'] },
      ],
      lines: [
        { say: 'Now take x equals three cos t plus two, and y equals three sin t minus one, for t from zero to two pi.', show: ['m.0', 'cg.grid', 'cg.axes'], focus: 'm.0' },
        { say: 'Here we cannot just solve for t. Instead, solve for cos t and sin t: cos t is x minus two, over three, and sin t is y plus one, over three.', show: 'm.1', focus: 'm.1' },
        { say: 'Then use the identity cos squared t plus sin squared t equals one.', show: 'm.2', focus: 'm.2' },
        { say: 'Squaring and multiplying by nine gives x minus two, squared, plus y plus one, squared, equals nine. That is a circle with centre two, negative one, and radius three.', show: ['m.3', 'cg.circ', 'cg.C', 'cg.r'], focus: 'm.3' },
        { say: 'At t equals zero the point starts at five, negative one, and as t increases it goes round anticlockwise.', show: 'cg.S', focus: 'cg.S' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing the direction and the timing', md: 'Eliminating the parameter gives the **shape** of the path, but loses **when** and in **which direction** it is traced. The parametric equations keep both.' },
      ],
      lines: [
        { say: 'Remember what eliminating the parameter loses. The equation of the circle tells you its shape, but not where the point starts, which way it goes round, or how fast.', show: 'oops' },
        { say: 'The parametric equations keep all of that, which is why they are used to describe motion.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A point moves with $x = t^2$ and $y = 2t + 1$. Where is it when $t = 3$?',
          choices: ['$(6, 7)$', '$(9, 7)$', '$(9, 6)$', '$(3, 7)$'],
          answer: 1,
          working: '$x = 3^2 = 9$ and $y = 2(3) + 1 = 7$, so the point is at $(9, 7)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A point moves with x equals t squared, and y equals two t plus one. Where is it when t is three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. x is three squared, which is nine, and y is two times three plus one, which is seven. So the point is at nine, seven. Choice A doubles the three instead of squaring it.', show: 'q.answer' },
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
          items: ['Parametric equations give $x$ and $y$ in terms of a parameter $t$.', 'Substitute a value of $t$ to find the point.', 'Eliminate the parameter: solve for $t$ and substitute.', '$x = r\\cos t + h$, $y = r\\sin t + k$ is a circle with centre $(h, k)$ and radius $r$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Parametric equations give x and y each in terms of a parameter, t.', show: 'sum.0' },
        { say: 'Substitute a value of t to find where the point is at that time.', show: 'sum.1' },
        { say: 'To find the ordinary equation, eliminate the parameter: solve one equation for t, and substitute into the other.', show: 'sum.2' },
        { say: 'And x equals r cos t plus h, y equals r sin t plus k, is a circle with centre h, k and radius r. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
