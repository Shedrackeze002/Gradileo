import type { Explainer } from '@/video/script.ts';
import { figure, triangularPrism, triangularPrismNet } from '@/video/solids.ts';
import { endTriangle, note } from './lib/m8-8-figures.ts';

// A small tent: each end a triangle with base 1.2 m, height 0.8 m and sloped sides of 1 m; 2.5 m long.
// Beside it, one end drawn twice as large, with its base, sloped sides and height.
const M = '\\text{ m}';
const end = (at: [number, number]) => endTriangle({ name: 'e', b: 2.4, t: 1.6, at, labels: { b: `1.2${M}`, s: `1${M}`, t: `0.8${M}` } });
const tent = figure('tn', [triangularPrism({ b: 1.2, t: 0.8, l: 2.5, labels: { b: `1.2${M}`, l: `2.5${M}` } }), end([3.8, 0])], 360);
const endOnly = figure('hs', [end([0, 0])], 420);

// Its net: a sloped side (1 m wide), the floor (1.2 m) and the other sloped side, all 2.5 m long,
// with a triangle end above and below the floor. The area of each face is written on it.
const net = (id: string) =>
  figure(
    id,
    [
      triangularPrismNet({ a: 1, b: 1.2, c: 1, l: 2.5, labels: { a: '1\\text{ m}', c: '1\\text{ m}', l: '2.5\\text{ m}' } }),
      note('s1', [0.5, 1.25], '2.5', { group: 'sides' }),
      note('s2', [2.7, 1.25], '2.5', { group: 'sides' }),
      note('fl', [1.6, 1.25], '3'),
      note('e1', [1.6, -0.85], '0.48', { group: 'ends', place: 'below' }),
      note('e2', [1.6, 3.35], '0.48', { group: 'ends', place: 'above' }),
    ],
    500,
  );

const video: Explainer = {
  id: 'm8-8-3-d',
  lessonId: 'm8-8-3',
  title: 'Surface Area of Prisms, Part 4: Height or Sloped Side?',
  thumbnailTitle: 'Fabric for a Tent',
  thumbnail: 'tn',
  summary:
    'A tent is a triangular prism whose ends are triangles with two equal sloped sides. Use the height of the triangle for the area of the triangles, and the sloped side for the width of the sloped rectangles. A tent 2.5 m long with ends of base 1.2 m, height 0.8 m and sloped sides of 1 m, and a floor, uses 0.96 + 3 + 5 = 8.96 m² of fabric.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 4', title: 'Height or Sloped Side?', subtitle: 'How much fabric makes a tent' }],
      lines: [
        { say: 'A small camping tent is shaped like a triangular prism. How much fabric does it take to make one?', show: 'title' },
        { say: 'In this video, you will find out, and learn which measurement of the triangle to use for each face.' },
      ],
    },
    {
      chapter: 'A small tent',
      layout: 'center',
      main: [tent, { kind: 'text', id: 'q', size: 'md', md: 'The tent is $2.5$ m long and has a floor. Each end is a triangle with a base of $1.2$ m, a height of $0.8$ m and sloped sides of $1$ m. How much fabric is used?' }],
      lines: [
        { say: 'Here is the tent. It is a triangular prism, two point five metres long, and it has a floor.', show: ['tn.shape', 'tn.front-face', 'tn.side-face', 'tn.b', 'tn.l'] },
        { say: 'Each end of the tent is a triangle. Here is one end, drawn larger. Its base is one point two metres.', show: ['tn.e-tri', 'tn.e-b'], focus: 'tn.e-b' },
        { say: 'The height of the triangle is zero point eight metres. It goes straight up from the middle of the base to the top, square to the base. It is the dashed line inside the triangle.', show: 'tn.e-height', focus: 'tn.e-t' },
        { say: 'The two sloped sides are each one metre long. A triangle with two equal sides like this is called isosceles.', show: 'tn.e-sides', focus: 'tn.e-sides' },
        { say: 'How much fabric is used to make the tent?', show: 'q' },
      ],
    },
    {
      chapter: 'Unfold the tent',
      layout: 'split',
      leftWidth: 560,
      left: [net('nt')],
      right: [{ kind: 'bullets', id: 'b', items: ['The floor: $1.2$ m wide', 'Two sloped sides: $1$ m wide', 'Two triangle ends'] }],
      lines: [
        { say: 'Unfold the tent into its net. In the middle is the floor. It is as wide as the base of the triangle, one point two metres.', show: ['nt.strip', 'nt.l', 'b.0'], focus: 'nt.rb' },
        { say: 'On each side of the floor is a sloped side of the tent. Each one is as wide as a sloped side of the triangle: one metre.', show: ['nt.a', 'nt.c', 'b.1'], focus: ['nt.ra', 'nt.rc'] },
        { say: 'And the two triangles are the ends of the tent.', show: ['nt.bases', 'b.2'], focus: 'nt.bases' },
      ],
    },
    {
      chapter: 'Fabric for the tent',
      layout: 'split',
      leftWidth: 560,
      left: [net('fb')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Ends: } 2 \\times \\tfrac{1}{2} \\times 1.2 \\times 0.8 = 0.96', '\\text{Floor: } 1.2 \\times 2.5 = 3', '\\text{Sloped sides: } 2 \\times 1 \\times 2.5 = 5', '\\text{Total: } 0.96 + 3 + 5 = 8.96\\text{ m}^2'],
        },
      ],
      lines: [
        { say: 'Start with the two triangle ends. For the area of a triangle, use its base and its height: one half times one point two times zero point eight is zero point four eight. Two ends make zero point nine six square metres.', show: ['fb.strip', 'fb.bases', 'fb.a', 'fb.c', 'fb.l', 'fb.ends', 'm.0'], focus: ['fb.bases', 'm.0'] },
        { say: 'The floor is one point two by two point five, which is three square metres.', show: ['fb.fl', 'm.1'], focus: ['fb.rb', 'm.1'] },
        { say: 'Each sloped side is one metre wide and two point five metres long: two point five square metres. Two of them make five square metres.', show: ['fb.sides', 'm.2'], focus: ['fb.ra', 'fb.rc', 'm.2'] },
        { say: 'Add them up: zero point nine six plus three plus five is eight point nine six. The tent uses eight point nine six square metres of fabric.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Height or sloped side?',
      layout: 'split',
      leftWidth: 520,
      left: [endOnly],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Height or sloped side?', md: 'Use the **height** of the triangle only for the area of the triangles. The sloped rectangles are as wide as the **sloped side**, not the height.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\bad{2 \\times 0.8 \\times 2.5 = 4}', '\\good{2 \\times 1 \\times 2.5 = 5}'] },
      ],
      lines: [
        { say: 'Here is the mistake to watch for. The triangle has two different measurements that are easy to mix up: its height, and its sloped side.', show: ['hs.e-tri', 'hs.e-b', 'hs.e-height', 'hs.e-sides', 'oops'], focus: ['hs.e-t', 'hs.e-sides'] },
        { say: 'The height is inside the triangle. Use it only for the area of the triangles.', focus: 'hs.e-t' },
        { say: 'The sloped rectangles of fabric run down the outside of the tent, along the sloped sides. So they are as wide as the sloped side, one metre, not the height.', show: 'm.1', focus: ['hs.e-sides', 'm.1'] },
        { say: 'Using the height there would give only four square metres for the sloped sides, instead of five. The tent would be short of fabric!', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tent is $3$ m long and has a floor. Each end is a triangle with a base of $1.6$ m, a height of $0.6$ m and sloped sides of $1$ m. How much fabric is used?',
          choices: ['$9.36\\text{ m}^2$', '$11.76\\text{ m}^2$', '$6.96\\text{ m}^2$', '$12.72\\text{ m}^2$'],
          answer: 1,
          working: 'Ends: $2 \\times \\tfrac{1}{2} \\times 1.6 \\times 0.6 = 0.96$. Floor: $1.6 \\times 3 = 4.8$. Sloped sides: $2 \\times 1 \\times 3 = 6$. Total: $0.96 + 4.8 + 6 = 11.76\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A tent is three metres long and has a floor. Each end is a triangle with a base of one point six metres, a height of zero point six metres, and sloped sides of one metre. How much fabric is used? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eleven point seven six square metres. The ends make zero point nine six, the floor makes four point eight, and the sloped sides make six. Choice A uses the height, zero point six, for the sloped sides, but they are one metre wide.', show: 'q.answer' },
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
          items: ['Triangles: use the base and the **height**.', 'Sloped rectangles: use the **sloped side** times the length.', 'Add the ends, the floor and the sloped sides.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For the area of the triangles, use the base and the height of the triangle.', show: 'sum.0' },
        { say: 'For the sloped rectangles, use the sloped side, times the length of the prism.', show: 'sum.1' },
        { say: 'Then add the ends, the floor and the sloped sides. In the next part, you will decide which faces count, and how many cans of paint to buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
