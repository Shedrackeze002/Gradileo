import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { curve } from './lib/curve.ts';

const g = plane({ x: [-4, 8], y: [-7, 5], every: 2 });
const ch = (u: number) => Math.cosh(u);
const sh = (u: number) => Math.sinh(u);

const video: Explainer = {
  id: 'mx-6-3',
  lessonId: 'mx-6-3',
  title: 'Conic Sections, Part 1: Recognizing the Conics',
  thumbnailTitle: 'Recognizing Conic Sections',
  thumbnail: 'gr',
  summary: 'Slicing a double cone gives a circle, an ellipse, a parabola or a hyperbola. Same squares added is a circle, different squares added an ellipse, one square subtracted a hyperbola, and only one variable squared a parabola. x − h and y − k move the centre to (h, k): (x − 2)²/9 − (y + 1)²/16 = 1 is a hyperbola with centre (2, −1).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polar Form, Conics and Parametric Equations · Part 1', title: 'Recognizing the Conics', subtitle: 'Four curves from one cone' }],
      lines: [
        { say: 'Planets move in ellipses, satellite dishes are shaped like parabolas, and some comets pass the sun on a hyperbola.', show: 'title' },
        { say: 'All of these curves come from slicing a cone. In this video, you will learn to recognize the four conic sections from their equations, and find their centres.' },
      ],
    },
    {
      chapter: 'Slicing a cone',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conic sections', md: 'Slice a **double cone**, two cones joined tip to tip, with a flat plane. Depending on the angle of the cut, the edge of the slice is a **circle**, an **ellipse**, a **parabola** or a **hyperbola**.' },
        { kind: 'table', id: 't', head: ['The cut', 'The curve'], rows: [['Straight across', 'Circle'], ['Tilted a little', 'Ellipse'], ['Parallel to the side of the cone', 'Parabola'], ['Steep, through both cones', 'Hyperbola']] },
      ],
      lines: [
        { say: 'Picture two cones joined tip to tip, and slice them with a flat plane. The edge of the slice is called a conic section.', show: 'def' },
        { say: 'A cut straight across gives a circle. Tilt the cut a little and it stretches into an ellipse.', show: ['t.0', 't.1'] },
        { say: 'A cut parallel to the side of the cone never closes up, and gives a parabola. And a steep cut through both cones gives a hyperbola, with two separate branches.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'The four equations',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Conic', 'Equation', 'The clue'], rows: [['Circle', '$x^2 + y^2 = r^2$', 'Same squares, added'], ['Ellipse', '$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$', 'Different squares, added'], ['Hyperbola', '$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$', 'One square subtracted'], ['Parabola', '$y = ax^2$', 'Only one variable squared']] },
      ],
      lines: [
        { say: 'Each conic has its own kind of equation, and you can tell them apart by looking at the squares.', show: 't.0', focus: 't.0' },
        { say: 'A circle has x squared plus y squared, with the same coefficient on each. An ellipse also adds the two squares, but over different denominators, so it is stretched one way.', show: 't.1', focus: 't.1' },
        { say: 'A hyperbola has both squares, but one is subtracted from the other.', show: 't.2', focus: 't.2' },
        { say: 'And a parabola has only one variable squared, like y equals "a" x squared.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Moving the centre',
      layout: 'split',
      leftWidth: 560,
      left: [figure('gr', [g,
        curve(g, { id: 'br1', at: (u) => [2 + 3 * ch(u), -1 + 4 * sh(u)], t0: -1.15, t1: 1.15, tone: 'hyp' }),
        curve(g, { id: 'br2', at: (u) => [2 - 3 * ch(u), -1 + 4 * sh(u)], t0: -1.15, t1: 1.15, tone: 'hyp' }),
        polyline(g, { id: 'as1', points: [[-2.5, -7], [6.5, 5]], tone: 'muted', dashed: true }),
        polyline(g, { id: 'as2', points: [[-2.5, 5], [6.5, -7]], tone: 'muted', dashed: true }),
        dots(g, [{ id: 'c', x: 2, y: -1, tex: '(2, -1)', place: 'below' }]),
      ], 500)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{(x - \\opp{2})^2}{9} - \\dfrac{(y + \\opp{1})^2}{16} = 1', '\\text{A hyperbola}', 'h = \\opp{2}, \\quad k = \\opp{-1}'] },
        { kind: 'text', id: 't', md: 'Centre $(2, -1)$', align: 'center' },
      ],
      lines: [
        { say: 'Replacing x by x minus h, and y by y minus k, moves the centre of the conic to h, k, without changing its shape.', show: ['gr.grid', 'gr.axes'] },
        { say: 'Name this conic and give its centre: x minus two, squared, over nine, minus y plus one, squared, over sixteen, equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'Both x and y are squared, and one square is subtracted, so it is a hyperbola.', show: ['m.1', 'gr.br1', 'gr.br2'], focus: 'm.1' },
        { say: 'x minus two gives h equals two. And y plus one is y minus negative one, so k is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'So it is a hyperbola with centre two, negative one. Its two branches open left and right, and they get closer and closer to the dashed lines.', show: ['t', 'gr.c', 'gr.as1', 'gr.as2'], focus: 'gr.c' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Getting the sign of the centre wrong', md: '$(x - 2)^2$ means $h = 2$, and $(y + 1)^2$ means $k = -1$. The centre has the **opposite** signs to the numbers in the brackets.' },
      ],
      lines: [
        { say: 'Be careful with the signs. x minus two means the centre is at x equals positive two, and y plus one means it is at y equals negative one.', show: 'oops' },
        { say: 'The centre always has the opposite signs to the numbers inside the brackets.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Name the conic $\\dfrac{y^2}{4} - \\dfrac{x^2}{9} = 1$.',
          choices: ['A circle', 'An ellipse', 'A hyperbola', 'A parabola'],
          answer: 2,
          working: 'Both $x$ and $y$ are squared, and one square is subtracted, so it is a hyperbola. This one opens up and down, because the $y^2$ term is the positive one.',
        },
      ],
      lines: [
        { say: 'Your turn. Name the conic y squared over four, minus x squared over nine, equals one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Both x and y are squared, and one square is subtracted, so it is a hyperbola. Because the y squared term is the positive one, this hyperbola opens up and down.', show: 'q.answer' },
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
          items: ['Slicing a double cone gives a circle, an ellipse, a parabola or a hyperbola.', 'Same squares added: circle. Different squares added: ellipse.', 'One square subtracted: hyperbola. One variable squared: parabola.', '$x - h$ and $y - k$ move the centre to $(h, k)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Slicing a double cone gives a circle, an ellipse, a parabola or a hyperbola.', show: 'sum.0' },
        { say: 'If the squares are added with the same coefficient, it is a circle; with different denominators, an ellipse.', show: 'sum.1' },
        { say: 'If one square is subtracted, it is a hyperbola, and if only one variable is squared, a parabola.', show: 'sum.2' },
        { say: 'And x minus h and y minus k move the centre to h, k. In the next part, we find the focus and directrix of a parabola, and the foci of an ellipse. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
