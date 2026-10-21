import type { Explainer } from '@/video/script.ts';
import { cylinder, cylinderNet, figure, squarePyramid, squarePyramidNet } from '@/video/solids.ts';
import { cylinderNetOneSide, unrolled } from './lib/m8-8-figures.ts';

// A square pyramid (base 1.6, slant height 1.4, so its height is about 1.15) beside its net.
const pyramid = figure('py', [squarePyramidNet({ b: 1.6, s: 1.4 }), squarePyramid({ name: 'p', at: [4.6, -0.2], b: 1.6, h: 1.15 })], 440);

// A can of radius 3 and height 10, beside its net: a rectangle 2π × 3 ≈ 18.8 long and 10 wide.
const can = figure('cy', [cylinder({ name: 'c', at: [-6.5, 0], r: 3, h: 10 }), cylinderNet({ r: 3, h: 10, labels: { c: '2\\pi r', h: 'h' } })], 460);
// The same can with its radius, beside the label unrolled (the rectangle alone, with the height).
const label = figure(
  'lb',
  [
    cylinder({ name: 'c', at: [-6.5, 0], r: 3, h: 10, labels: { r: '3\\text{ cm}' } }),
    unrolled({ r: 3, h: 10, labels: { c: '2\\pi r \\approx 18.8\\text{ cm}', h: '10\\text{ cm}' } }),
  ],
  420,
);

const video: Explainer = {
  id: 'm8-8-2-d',
  lessonId: 'm8-8-2',
  title: 'Nets of Three-Dimensional Objects, Part 4: Nets of Pyramids and Cylinders',
  thumbnailTitle: 'Pyramids and Cylinders',
  thumbnail: 'cy',
  summary:
    'A square pyramid’s net is a square with a triangle on each side, which fold up to meet at the top. A cylinder’s net is two circles and a rectangle: one side of the rectangle is the height, and the other wraps once around the circle, so it is the circumference, 2πr. A can with a radius of 3 cm and a height of 10 cm has a rectangle about 18.8 cm long and 10 cm wide. Put one circle on each long side of the rectangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 4', title: 'Nets of Pyramids and Cylinders', subtitle: 'Triangles that meet, and a rectangle that rolls' }],
      lines: [
        { say: 'Not every object is a box. A tent can be a pyramid, and a can of soup is a cylinder.', show: 'title' },
        { say: 'In this video, you will see the nets of a square pyramid and a cylinder, and find the size of the rectangle in a cylinder’s net.' },
      ],
    },
    {
      chapter: 'A square pyramid',
      layout: 'center',
      main: [pyramid],
      lines: [
        { say: 'A square pyramid has one square base, and four triangles that meet at a point at the top.', show: ['py.p-shape', 'py.p-front-face', 'py.p-side-face'] },
        { say: 'In its net, the square base sits in the middle.', show: 'py.base', focus: 'py.base' },
        { say: 'A triangle is joined to each of the four sides of the square. Fold the triangles up, and their tips meet at the top to make the pyramid.', show: 'py.sides', focus: 'py.sides' },
        { say: 'Count the faces: one square and four triangles makes five faces, just like the pyramid.', focus: 'py' },
      ],
    },
    {
      chapter: 'Unrolling a cylinder',
      layout: 'center',
      main: [can],
      lines: [
        { say: 'A cylinder has two circles, one at each end, and one curved surface that wraps around between them.', show: ['cy.c-shape', 'cy.c-lateral', 'cy.c-top-face'] },
        { say: 'Imagine peeling the label off a can. Cut the curved surface straight down, and unroll it. It lies flat as a rectangle!', show: 'cy.rect', focus: ['cy.c-lateral', 'cy.rect'] },
        { say: 'The two circles go on the long sides of the rectangle: one on the top edge, and one on the bottom edge.', show: 'cy.circles', focus: 'cy.circles' },
        { say: 'One side of the rectangle is as tall as the cylinder. That is its height.', show: 'cy.h', focus: 'cy.h' },
        { say: 'The other side wrapped all the way around the circle. So its length is the distance around the circle, called the circumference. The circumference is two times pi times the radius.', show: 'cy.c', focus: 'cy.c' },
      ],
    },
    {
      chapter: 'The label on a can',
      layout: 'split',
      leftWidth: 620,
      left: [label],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A can has a radius of $3$ cm and a height of $10$ cm. What are the length and width of the rectangle in its net?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Width} = 10\\text{ cm}', '\\text{Length} = 2 \\times \\pi \\times 3', '\\approx 18.8\\text{ cm}'] },
      ],
      lines: [
        { say: 'A can has a radius of three centimetres and a height of ten centimetres. What are the length and width of the rectangle in its net?', show: ['q', 'lb.c-shape', 'lb.c-lateral', 'lb.c-r', 'lb.rect'] },
        { say: 'The width of the rectangle is the height of the can: ten centimetres.', show: ['m.0', 'lb.h'], focus: ['m.0', 'lb.h'] },
        { say: 'The length is the circumference: two times pi times the radius, three.', show: 'm.1', focus: 'm.1' },
        { say: 'Pi is a number a little more than three, about three point one four. On a calculator, use the pi key. Two times pi times three is about eighteen point eight centimetres.', show: ['m.2', 'lb.c'], focus: ['m.2', 'lb.c'] },
        { say: 'So the rectangle is about eighteen point eight centimetres long and ten centimetres wide.' },
      ],
    },
    {
      chapter: 'Both circles on one side',
      layout: 'split',
      leftWidth: 520,
      left: [figure('wr', [cylinderNetOneSide({ r: 3, h: 10 })], 460)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Both circles on one side', md: 'In a cylinder net, one circle goes on **each** long side of the rectangle. If both circles are on the same side, they fold onto the same end, and the other end is left open.' }],
      lines: [
        { say: 'Here is a net that will not work. Both circles are on the same side of the rectangle.', show: ['wr.body', 'wr.circles'] },
        { say: 'Roll up the rectangle, and both circles fold onto the same end of the tube. The other end is left open, with nothing to cover it.', show: ['wr.open', 'oops'], focus: 'wr.open' },
        { say: 'So in a cylinder net, one circle goes on each long side of the rectangle.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A can has a radius of $5$ cm and a height of $12$ cm. Use $3.14$ for $\\pi$. What are the length and width of the rectangle in its net?',
          choices: ['$31.4$ cm by $12$ cm', '$15.7$ cm by $12$ cm', '$78.5$ cm by $12$ cm', '$31.4$ cm by $5$ cm'],
          answer: 0,
          working: 'The length is the circumference: $2 \\times 3.14 \\times 5 = 31.4$ cm. The width is the height: $12$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A can has a radius of five centimetres and a height of twelve centimetres. Use three point one four for pi. What are the length and width of the rectangle in its net? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The length is the circumference: two times three point one four times five is thirty-one point four centimetres. The width is the height, twelve centimetres. Choice B uses pi times the radius, which only goes half way around the can.', show: 'q.answer' },
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
          items: ['Square pyramid net: a square with a triangle on each side.', 'Cylinder net: two circles and a rectangle.', 'The rectangle is as long as the circumference, $2\\pi r$, and as wide as the height.', 'Put one circle on each long side of the rectangle.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The net of a square pyramid is a square, with a triangle on each side.', show: 'sum.0' },
        { say: 'The net of a cylinder is two circles and a rectangle.', show: 'sum.1' },
        { say: 'The rectangle is as long as the circumference, two times pi times the radius, and as wide as the height of the cylinder.', show: 'sum.2' },
        { say: 'And one circle goes on each long side. Well done! Next, you will use nets to find surface area: the total area of all the faces.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
