import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { curve } from './lib/curve.ts';

const p = plane({ x: [-7, 7], y: [-4, 5], every: 2 });
const e = plane({ x: [-6, 6], y: [-4, 4], every: 0 });

const video: Explainer = {
  id: 'mx-6-3-b',
  lessonId: 'mx-6-3',
  title: 'Conic Sections, Part 2: Foci, Directrix and Axes',
  thumbnailTitle: 'Foci and Directrix of Conics',
  thumbnail: 'pg',
  summary: 'A parabola is every point the same distance from its focus and its directrix: x² = 4py has focus (0, p) and directrix y = −p, so x² = 12y has focus (0, 3) and directrix y = −3. The ellipse x²/a² + y²/b² = 1 has axes 2a and 2b and foci c from the centre, with c² = a² − b²: x²/25 + y²/9 = 1 has foci (±4, 0).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polar Form, Conics and Parametric Equations · Part 2', title: 'Foci, Directrix and Axes', subtitle: 'The special points of a conic' }],
      lines: [
        { say: 'A satellite dish is a parabola, and every signal that hits it bounces to one special point, where the receiver sits. That point is called the focus.', show: 'title' },
        { say: 'In this video, you will learn to find the focus and directrix of a parabola, and the axes and foci of an ellipse.' },
      ],
    },
    {
      chapter: 'Focus and directrix',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pg', [p,
        plot(p, { id: 'par', f: (x) => (x * x) / 12, tone: 'hyp' }),
        polyline(p, { id: 'dir', points: [[-7, -3], [7, -3]], tone: 'muted', dashed: true }),
        polyline(p, { id: 'pf', points: [[6, 3], [0, 3]], tone: 'opp', labels: ['6'], sides: ['left'] }),
        polyline(p, { id: 'pd', points: [[6, 3], [6, -3]], tone: 'adj', labels: ['6'], sides: ['left'] }),
        dots(p, [{ id: 'F', x: 0, y: 3, tex: 'F(0, 3)', place: 'above left' }, { id: 'P', x: 6, y: 3, tex: 'P(6, 3)', place: 'above right' }, { id: 'dl', x: -5, y: -3, tex: 'y = -3', place: 'below', tone: 'muted' }]),
      ], 460)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parabola', md: 'Every point the **same distance** from a fixed point, the **focus**, and a fixed line, the **directrix**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 = 4py', '\\text{Focus } (0, p), \\ \\text{directrix } y = -p'] },
      ],
      lines: [
        { say: 'A parabola is every point that is the same distance from a fixed point, called the focus, and a fixed line, called the directrix.', show: ['def', 'pg.grid', 'pg.axes'] },
        { say: 'The parabola x squared equals four p y has its vertex at the origin, its focus at zero, p, and its directrix the line y equals negative p.', show: 'm', focus: 'm' },
        { say: 'Take x squared equals twelve y. Four p is twelve, so p is three. The focus is at zero, three, and the directrix is the line y equals negative three.', show: ['pg.par', 'pg.F', 'pg.dir', 'pg.dl'], focus: 'pg.F' },
        { say: 'Check with the point at six, three, on the parabola. It is six units from the focus, and six units above the directrix. The same distance, just as the definition says.', show: ['pg.P', 'pg.pf', 'pg.pd'], focus: 'pg.P' },
      ],
    },
    {
      chapter: 'Axes and foci of an ellipse',
      layout: 'split',
      leftWidth: 560,
      left: [figure('eg', [e,
        curve(e, { id: 'ell', at: (t) => [5 * Math.cos(t), 3 * Math.sin(t)], t0: 0, t1: 2 * Math.PI, n: 96, tone: 'hyp' }),
        polyline(e, { id: 'maj', points: [[-5, 0], [5, 0]], tone: 'opp' }),
        polyline(e, { id: 'min', points: [[0, -3], [0, 3]], tone: 'adj' }),
        dots(e, [{ id: 'F1', x: -4, y: 0, tex: '(-4, 0)', place: 'below' }, { id: 'F2', x: 4, y: 0, tex: '(4, 0)', place: 'below' }]),
      ], 400)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1', 'a = 5, \\quad b = 3', '\\text{Major axis } \\opp{10}, \\ \\text{minor axis } \\adj{6}', 'c^2 = a^2 - b^2 = 25 - 9 = 16', 'c = 4'] },
      ],
      lines: [
        { say: 'An ellipse has two axes of symmetry. The longer one is the major axis, and the shorter one is the minor axis.', show: ['eg.grid', 'eg.axes', 'eg.ell'] },
        { say: 'Take x squared over 25, plus y squared over nine, equals one. "a" squared is 25 and b squared is nine, so "a" is five and b is three.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The larger denominator is under x squared, so the major axis is horizontal, with length two "a", which is ten. The minor axis has length two b, which is six.', show: ['m.2', 'eg.maj', 'eg.min'], focus: 'm.2' },
        { say: 'The two foci lie on the major axis, c units from the centre, where c squared is "a" squared minus b squared. Here that is 25 minus nine, which is sixteen, so c is four.', show: ['m.3', 'm.4'], focus: 'm.3' },
        { say: 'So the foci are at negative four, zero, and four, zero.', show: ['eg.F1', 'eg.F2'], focus: 'eg.F2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding in the ellipse', md: 'For an **ellipse**, $c^2 = a^2 - b^2$: **subtract**. For a **hyperbola**, $c^2 = a^2 + b^2$: **add**, because its foci lie outside its vertices.' },
      ],
      lines: [
        { say: 'A common mistake is to add the squares for an ellipse. For an ellipse, c squared is "a" squared minus b squared, so the foci lie inside the curve.', show: 'oops' },
        { say: 'It is a hyperbola that adds them: c squared is "a" squared plus b squared, because its foci lie outside its vertices.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the foci of the ellipse $\\dfrac{x^2}{169} + \\dfrac{y^2}{144} = 1$.',
          choices: ['$(\\pm 13, 0)$', '$(0, \\pm 5)$', '$(\\pm 12, 0)$', '$(\\pm 5, 0)$'],
          answer: 3,
          working: '$a^2 = 169$ and $b^2 = 144$, so $c^2 = 169 - 144 = 25$ and $c = 5$. The larger denominator is under $x^2$, so the foci are on the $x$-axis: $(\\pm 5, 0)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the foci of the ellipse x squared over 169, plus y squared over 144, equals one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. c squared is 169 minus 144, which is 25, so c is five. The larger denominator is under x squared, so the foci are on the x-axis, at plus or minus five, zero.', show: 'q.answer' },
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
          items: ['A parabola is the same distance from its focus and its directrix.', '$x^2 = 4py$ has focus $(0, p)$ and directrix $y = -p$.', 'An ellipse has major axis $2a$ and minor axis $2b$.', 'Its foci are $c$ from the centre, with $c^2 = a^2 - b^2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every point on a parabola is the same distance from its focus and its directrix.', show: 'sum.0' },
        { say: 'The parabola x squared equals four p y has focus zero, p and directrix y equals negative p.', show: 'sum.1' },
        { say: 'An ellipse has a major axis of length two "a" and a minor axis of length two b.', show: 'sum.2' },
        { say: 'And its foci are c from the centre, where c squared is "a" squared minus b squared. In the next lesson, we describe curves with parametric equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
