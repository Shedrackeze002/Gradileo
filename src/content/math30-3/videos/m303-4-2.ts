import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { rays, shape } from './lib/m303-4-figures.ts';

type P = [number, number];

const g = plane({ x: [0, 9], y: [0, 7] });
/** The logo triangle and its enlargement by a scale factor of 2 about the origin. */
const logo: P[] = [[2, 1], [4, 1], [2, 3]];
const big: P[] = logo.map(([x, y]) => [2 * x, 2 * y]);

const r = plane({ x: [0, 7], y: [0, 5] });
/** A rectangle and its reduction by a scale factor of one half about the origin. */
const rect: P[] = [[2, 2], [6, 2], [6, 4], [2, 4]];
const small: P[] = rect.map(([x, y]) => [x / 2, y / 2]);

const video: Explainer = {
  id: 'm303-4-2',
  lessonId: 'm303-4-2',
  title: 'Dilations, Part 1: What a Dilation Does',
  thumbnailTitle: 'Dilations',
  thumbnail: 'lg',
  summary: 'A dilation enlarges or reduces a shape from a centre: every distance from the centre is multiplied by the scale factor k, an enlargement when k > 1 and a reduction when 0 < k < 1, and the shape and angles do not change. About the origin, (x, y) → (kx, ky): a logo triangle A(2, 1), B(4, 1), C(2, 3) enlarged by 2 becomes A′(4, 2), B′(8, 2), C′(4, 6), and a scale factor of 1/2 takes (6, 4) to (3, 2). Part 2 finds the scale factor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dilations · Part 1', title: 'What a Dilation Does', subtitle: 'The same shape at a new size' }],
      lines: [
        { say: 'A business logo is printed small on a business card and huge on a banner. A floor plan shrinks a house to fit on a page, and a model shrinks a truck to fit on a shelf.', show: 'title' },
        { say: 'Each of these is a dilation: the same shape at a different size. In this video, you will see what a dilation does, and dilate shapes on a grid.' },
      ],
    },
    {
      chapter: 'Dilations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dilation and scale factor', md: 'A **dilation** enlarges or reduces a shape from a fixed point, the **centre of dilation**. Every distance from the centre is multiplied by the **scale factor** $k$.' },
        { kind: 'bullets', id: 'b', items: ['$k > 1$: an **enlargement** (the image is bigger).', '$0 < k < 1$: a **reduction** (the image is smaller).', 'The image has the same shape and the same angles. Only the size changes.'] },
      ],
      lines: [
        { say: 'A dilation enlarges or reduces a shape from a fixed point, called the centre of dilation. Every distance from the centre is multiplied by the same number, the scale factor, k.', show: 'def' },
        { say: 'When k is greater than one, the image is bigger than the original. That is an enlargement.', show: 'b.0', focus: 'b.0' },
        { say: 'When k is between zero and one, the image is smaller. That is a reduction.', show: 'b.1', focus: 'b.1' },
        { say: 'Either way, the image has exactly the same shape and the same angles as the original. Only its size changes.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Enlarging a logo',
      layout: 'split',
      left: [
        figure('lg', [
          g,
          rays(g, { id: 'rays', from: [0, 0], through: [big[1], big[2]] }),
          shape(g, { id: 'abc', pts: logo, names: ['A', 'B', 'C'], tone: 'adj', places: ['left', 'below right', 'left'] }),
          shape(g, { id: 'img', pts: big, names: ["A'", "B'", "C'"], tone: 'opp', places: ['above left', 'below', 'above'] }),
          dots(g, [{ id: 'O', x: 0, y: 0, tone: 'good' }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x, y) \\to (kx,\\ ky)', "A(2, 1) \\to A'(4, 2)", "B(4, 1) \\to B'(8, 2)", "C(2, 3) \\to C'(4, 6)"] },
      ],
      lines: [
        { say: 'When the centre of dilation is the origin, multiply both coordinates by k. The point x, y maps to k x, k y.', show: ['lg.grid', 'lg.axes', 'lg.O', 'm.0'], focus: 'm.0' },
        { say: 'A sign maker enlarges the triangle in a logo by a scale factor of two, about the origin. Its corners are A at two, one, B at four, one, and C at two, three.', show: ['lg.abc', 'lg.abc-names'] },
        { say: 'Multiply both coordinates of each corner by two. A, at two, one, goes to four, two.', show: 'm.1', focus: 'm.1' },
        { say: 'B, at four, one, goes to eight, two. And C, at two, three, goes to four, six.', show: ['m.2', 'm.3', 'lg.img', 'lg.img-names'], focus: ['m.2', 'm.3', 'lg.img'] },
        { say: 'The dashed lines show what happened. Each image point, like B prime or C prime, lies on a line from the centre through the original point, twice as far from the centre. The image is an enlargement: the same shape, with every side twice as long.', show: 'lg.rays', focus: 'lg.rays' },
      ],
    },
    {
      chapter: 'A reduction',
      layout: 'split',
      left: [
        figure('rd', [
          r,
          rays(r, { id: 'rays', from: [0, 0], through: [rect[0], rect[2], rect[3]] }),
          shape(r, { id: 'big', pts: rect, tone: 'adj' }),
          shape(r, { id: 'small', pts: small, tone: 'opp' }),
          dots(r, [
            { id: 'O', x: 0, y: 0, tone: 'good' },
            { id: 'P', x: 6, y: 4, tex: '(6, 4)', tone: 'adj', place: 'above right' },
            { id: 'Q', x: 3, y: 2, tex: '(3, 2)', tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = \\tfrac{1}{2}', '(6, 4) \\to \\left(\\tfrac{1}{2} \\times 6,\\ \\tfrac{1}{2} \\times 4\\right)', '= (3, 2)'] }],
      lines: [
        { say: 'A scale factor less than one makes a reduction. Here, a rectangle is dilated by a scale factor of one half, about the origin.', show: ['rd.grid', 'rd.axes', 'rd.O', 'rd.big', 'm.0'] },
        { say: 'Take the corner at six, four. Multiply both coordinates by one half: three, two.', show: ['m.1', 'm.2', 'rd.P', 'rd.Q'], focus: ['m.2', 'rd.Q'] },
        { say: 'The image point is halfway along the line from the origin to the original point. Every corner moves halfway to the origin, so the image is a rectangle with sides half as long.', show: ['rd.rays', 'rd.small'], focus: ['rd.rays', 'rd.small'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying only one coordinate', md: 'A dilation about the origin multiplies **both** coordinates by $k$. Multiplying only one of them stretches the shape in one direction, and the image is no longer the same shape.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['k = 2:\\quad (2, 3) \\to \\good{(4, 6)}', '(2, 3) \\to \\bad{(4, 3)} \\quad \\text{(a stretch, not a dilation)}'] },
      ],
      lines: [
        { say: 'Remember to multiply both coordinates by the scale factor.', show: 'oops' },
        { say: 'With a scale factor of two, the point at two, three goes to four, six.', show: 'm.0', focus: 'm.0' },
        { say: 'Four, three would double only the x-coordinate. That stretches the shape sideways, so its angles change, and it is no longer a dilation.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(6, -9)$ is dilated about the origin by a scale factor of $\\tfrac{1}{3}$. Where is its image?',
          choices: ['$(18, -27)$', '$(3, -6)$', '$(2, -9)$', '$(2, -3)$'],
          answer: 3,
          working: 'Multiply both coordinates by $\\tfrac{1}{3}$: $\\left(\\tfrac{1}{3} \\times 6,\\ \\tfrac{1}{3} \\times (-9)\\right) = (2, -3)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at six, negative nine, is dilated about the origin by a scale factor of one third. Where is its image? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two, negative three. One third of six is two, and one third of negative nine is negative three. Choice A multiplies by three instead of one third, which would make an enlargement.', show: 'q.answer' },
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
            'A dilation multiplies every distance from the centre by the scale factor $k$.',
            '$k > 1$ is an enlargement; $0 < k < 1$ is a reduction. Shape and angles do not change.',
            'About the origin: $(x, y) \\to (kx,\\ ky)$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A dilation multiplies every distance from the centre by the scale factor, k.', show: 'sum.0' },
        { say: 'A scale factor greater than one makes an enlargement, and one between zero and one makes a reduction. The shape and the angles do not change.', show: 'sum.1' },
        { say: 'And about the origin, multiply both coordinates by k. In the next part, we find the scale factor from two lengths. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
