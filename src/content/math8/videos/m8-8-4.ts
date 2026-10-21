import type { Explainer } from '@/video/script.ts';
import { cylinder, cylinderNet, figure } from '@/video/solids.ts';
import { unrolled } from './lib/m8-8-figures.ts';

// A cylinder with its radius and height marked, beside its net.
const parts = figure('pt', [cylinder({ r: 3, h: 7, labels: { r: 'r', h: 'h' } })], 440);
const net = figure('nt', [cylinder({ name: 'c', at: [-6, 0], r: 2.4, h: 7, labels: { r: 'r', h: 'h' } }), cylinderNet({ r: 2.4, h: 7, labels: { c: '2\\pi r', h: 'h' } })], 460);
// The curved surface alone: a rectangle 2πr long and h wide.
const rect = figure('rc', [unrolled({ r: 2.4, h: 7, labels: { c: '2\\pi r', h: 'h', area: '2\\pi r \\times h' } })], 380);
// The can of tomatoes: radius 4 cm and height 11 cm, beside its label unrolled (the height is marked
// on the label, to keep the two labels apart).
const can = figure(
  'cn',
  [cylinder({ name: 'c', at: [-8, 0], r: 4, h: 11, labels: { r: '4\\text{ cm}' } }), unrolled({ r: 4, h: 11, labels: { c: '2 \\times \\pi \\times 4', h: '11\\text{ cm}' } })],
  420,
);

const video: Explainer = {
  id: 'm8-8-4',
  lessonId: 'm8-8-4',
  title: 'Surface Area of Cylinders, Part 1: Unrolling a Cylinder',
  thumbnailTitle: 'Unrolling a Cylinder',
  thumbnail: 'nt',
  summary:
    'Cut the curved surface of a cylinder straight down and flatten it, and you get a rectangle. Its width is the height of the cylinder, h, and its length wraps once around the circle, so it is the circumference, 2πr. So the curved surface has an area of 2πr × h = 2πrh. The label on a can with a radius of 4 cm and a height of 11 cm has an area of 2 × π × 4 × 11 ≈ 276.5 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 1', title: 'Unrolling a Cylinder', subtitle: 'The curved surface is a rectangle in disguise' }],
      lines: [
        { say: 'A soup can is made from a flat sheet of metal, rolled into a tube, with a circle at each end. Its paper label covers only the curved part.', show: 'title' },
        { say: 'To find how much metal or paper a cylinder needs, unroll it. In this video, you will find the area of the curved surface of a cylinder.' },
      ],
    },
    {
      chapter: 'Parts of a cylinder',
      layout: 'split',
      leftWidth: 460,
      left: [parts],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Radius** $r$: from the centre of a circle to its edge.', '**Height** $h$: the distance between the two circles.', '**Circumference**: the distance all the way around a circle, $2\\pi r$.'],
        },
      ],
      lines: [
        { say: 'A cylinder has two circle ends that match, and a curved surface that wraps around between them.', show: ['pt.shape', 'pt.lateral', 'pt.top-face'] },
        { say: 'The radius is the distance from the centre of a circle to its edge. We call it r.', show: ['b.0', 'pt.r'], focus: 'pt.r' },
        { say: 'The height is the distance between the two circles. We call it h.', show: ['b.1', 'pt.h'], focus: 'pt.h' },
        { say: 'The circumference is the distance all the way around a circle. It is two times pi times the radius. Pi is a number a little more than three, about three point one four.', show: 'b.2', focus: 'pt.top-face' },
      ],
    },
    {
      chapter: 'Unroll it',
      layout: 'center',
      main: [net],
      lines: [
        { say: 'Now imagine peeling the label off a can. Cut the curved surface straight down, and flatten it out. You get a rectangle!', show: ['nt.c-shape', 'nt.c-lateral', 'nt.c-r', 'nt.c-h', 'nt.rect'], focus: ['nt.c-lateral', 'nt.rect'] },
        { say: 'The two circles are the ends. In the net, one sits on each long side of the rectangle.', show: 'nt.circles', focus: 'nt.circles' },
        { say: 'The width of the rectangle is the height of the cylinder, h.', show: 'nt.h', focus: 'nt.h' },
        { say: 'The length of the rectangle wrapped once all the way around the circle. So it equals the circumference: two times pi times r.', show: 'nt.c', focus: 'nt.c' },
      ],
    },
    {
      chapter: 'Area of the curved surface',
      layout: 'split',
      leftWidth: 560,
      left: [rect],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['A = \\text{length} \\times \\text{width}', 'A = 2\\pi r \\times h', 'A = 2\\pi rh'] }],
      lines: [
        { say: 'The area of a rectangle is its length times its width.', show: ['rc.rect', 'rc.c', 'rc.h', 'm.0'], focus: 'm.0' },
        { say: 'Here, the length is two pi r, and the width is h. So the curved surface has an area of two pi r, times h.', show: ['m.1', 'rc.area'], focus: ['m.1', 'rc.area'] },
        { say: 'We usually leave out the times signs, and write two pi r h. It means two, times pi, times the radius, times the height.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The label on a can',
      layout: 'split',
      leftWidth: 540,
      left: [can],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A can of tomatoes has a radius of $4$ cm and a height of $11$ cm. What is the area of its label, to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = 2 \\times \\pi \\times 4 \\times 11'] },
        { kind: 'calc', id: 'calc', keys: '2 × π × 4 × 11', result: '276.4601535' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['A \\approx 276.5\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A can of tomatoes has a radius of four centimetres and a height of eleven centimetres. Its label covers the curved surface. What is the area of the label, to the nearest tenth of a square centimetre?', show: ['q', 'cn.c-shape', 'cn.c-lateral', 'cn.c-r'] },
        { say: 'Unrolled, the label is a rectangle. Its length is two times pi times four, and its width is the height, eleven centimetres.', show: ['cn.rect', 'cn.c', 'cn.h'], focus: ['cn.c', 'cn.h'] },
        { say: 'So its area is two times pi times four times eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'On a calculator, use the pi key. Two times pi times four times eleven is two hundred seventy-six point four six, and more digits.', show: 'calc' },
        { say: 'The digit after the tenths is six, so round up. The label has an area of about two hundred seventy-six point five square centimetres.', show: 'a.0', focus: 'a.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cardboard tube has **no ends**. It has a radius of $2$ cm and a height of $10$ cm. Use $3.14$ for $\\pi$. How much cardboard does it use?',
          choices: ['$62.8\\text{ cm}^2$', '$12.56\\text{ cm}^2$', '$125.6\\text{ cm}^2$', '$150.72\\text{ cm}^2$'],
          answer: 2,
          working: 'The tube is only the curved surface: $2\\pi rh = 2 \\times 3.14 \\times 2 \\times 10 = 125.6\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cardboard tube has no ends. It has a radius of two centimetres and a height of ten centimetres. Use three point one four for pi. How much cardboard does it use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one hundred twenty-five point six square centimetres. The tube is just the curved surface: two times three point one four times two times ten. Choice A forgets the two in two pi r h, so its rectangle wraps only half way around.', show: 'q.answer' },
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
          items: ['Unrolled, the curved surface of a cylinder is a rectangle.', 'Its length is the circumference, $2\\pi r$, and its width is the height, $h$.', 'Area of the curved surface: $2\\pi rh$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Unroll the curved surface of a cylinder, and you get a rectangle.', show: 'sum.0' },
        { say: 'Its length is the circumference, two pi r, and its width is the height, h.', show: 'sum.1' },
        { say: 'So the curved surface has an area of two pi r h. In the next part, you will add the two circles to find the whole surface area. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
