import type { Explainer } from '@/video/script.ts';
import type { DiagramItem } from '@/video/script.ts';
import { figure, triangularPrism, triangularPrismNet } from '@/video/solids.ts';
import { note } from './lib/m8-8-figures.ts';

// The ramp: a right triangular prism. Each end has legs 6 cm and 8 cm and a sloped side of 10 cm;
// it is 15 cm long. Drawn at half size, with the right angle at the bottom left.
// The sloped side is coloured but not labelled: its label would sit on the hidden edges.
const slope: DiagramItem = { kind: 'line', id: 'slope', from: 'B', to: 'C', tone: 'hyp' };
const ramp = (id: string) =>
  figure(id, [triangularPrism({ b: 4, t: 3, apex: 0, l: 7.5, labels: { b: '8\\text{ cm}', t: '6\\text{ cm}', l: '15\\text{ cm}' } }), { points: {}, items: [slope] }], 440);
// Its net: three rectangles 15 cm long and 6, 8 and 10 cm wide, with a triangle on the middle one.
// The middle width, 8, is written inside the bottom triangle, under its edge (the triangle hangs there).
const net = (id: string) =>
  figure(id, [triangularPrismNet({ a: 6, b: 8, c: 10, l: 15, labels: { a: '6', c: '10', l: '15', perimeter: '6 + 8 + 10 = 24' } }), note('b', [8.4, -2.4], '8', { tone: 'adj' })], 500);

const video: Explainer = {
  id: 'm8-8-3-c',
  lessonId: 'm8-8-3',
  title: 'Surface Area of Prisms, Part 3: Triangular Prisms',
  thumbnailTitle: 'Triangular Prisms',
  thumbnail: 'nt',
  summary:
    'A right triangular prism has 2 triangle ends and 3 rectangles. Each rectangle is as wide as one side of the triangle and as long as the prism. A ramp whose ends have legs 6 cm and 8 cm and a sloped side of 10 cm, 15 cm long, has 2 × ½ × 6 × 8 = 48 cm² of triangles and 6 × 15 + 8 × 15 + 10 × 15 = 360 cm² of rectangles: 408 cm² in all. The rectangles together are the perimeter of the triangle times the length: (6 + 8 + 10) × 15 = 360.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 3', title: 'Triangular Prisms', subtitle: 'Two triangles and three rectangles' }],
      lines: [
        { say: 'Ramps, tents and some chocolate boxes are triangular prisms. How much material does it take to make one?', show: 'title' },
        { say: 'In this video, you will find the surface area of a triangular prism, by adding the areas of its two triangles and its three rectangles.' },
      ],
    },
    {
      chapter: 'A ramp',
      layout: 'split',
      leftWidth: 560,
      left: [ramp('rp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A ramp is a right triangular prism. Each end is a right triangle with legs $6$ cm and $8$ cm and a sloped side of $10$ cm. The ramp is $15$ cm long. Find its surface area.' },
      ],
      lines: [
        { say: 'Here is a ramp for a toy car track. It is a triangular prism: its two ends are triangles, and its other three faces are rectangles.', show: ['rp.shape', 'rp.front-face', 'rp.side-face'] },
        { say: 'Each end is a right triangle. The two shorter sides, which meet at the square corner, are called the legs. They are six and eight centimetres long.', show: ['q', 'rp.b', 'rp.t', 'rp.t-mark'], focus: ['rp.b', 'rp.t'] },
        { say: 'The sloped side, in pink, is ten centimetres, and the ramp is fifteen centimetres long. Let’s find its surface area.', show: ['rp.slope', 'rp.l'], focus: ['rp.slope', 'rp.l'] },
      ],
    },
    {
      chapter: 'Unfold it',
      layout: 'split',
      leftWidth: 560,
      left: [net('nt')],
      right: [{ kind: 'bullets', id: 'b', items: ['$2$ triangles: the ends', '$3$ rectangles, each $15$ cm long, as wide as one side of the triangle: $6$, $8$ and $10$ cm'] }],
      lines: [
        { say: 'Unfold the ramp into its net. It has two triangles, one for each end.', show: ['nt.bases', 'b.0'], focus: 'nt.bases' },
        { say: 'It also has three rectangles, joined in a strip. They are all fifteen centimetres long: the length of the ramp.', show: ['nt.strip', 'nt.l', 'b.1'], focus: ['nt.strip', 'nt.l'] },
        { say: 'Each rectangle is as wide as one side of the triangle. So their widths are six, eight and ten centimetres.', show: ['nt.a', 'nt.b', 'nt.c'], focus: ['nt.a', 'nt.b', 'nt.c'] },
      ],
    },
    {
      chapter: 'Adding the faces',
      layout: 'split',
      leftWidth: 520,
      left: [net('ad')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['2 \\times \\tfrac{1}{2} \\times 6 \\times 8 = 48', '6 \\times 15 = 90', '8 \\times 15 = 120', '10 \\times 15 = 150', 'SA = 48 + 90 + 120 + 150', '\\phantom{SA} = 408\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'Start with the triangles. The area of a triangle is one half, times its base, times its height. In a right triangle, the two legs are the base and the height.', show: ['ad.bases', 'ad.strip', 'ad.a', 'ad.b', 'ad.c', 'ad.l'], focus: 'ad.bases' },
        { say: 'So each triangle is one half times six times eight, which is twenty-four. Two triangles make forty-eight square centimetres.', show: 'm.0', focus: ['m.0', 'ad.bases'] },
        { say: 'Now the rectangles. Six times fifteen is ninety. Eight times fifteen is one hundred twenty. Ten times fifteen is one hundred fifty.', show: ['m.1', 'm.2', 'm.3'], focus: ['m.1', 'm.2', 'm.3', 'ad.strip'] },
        { say: 'Together, the rectangles make three hundred sixty square centimetres.', focus: ['m.1', 'm.2', 'm.3'] },
        { say: 'Add the triangles and the rectangles: forty-eight plus three hundred sixty is four hundred eight. The surface area is four hundred eight square centimetres.', show: ['m.4', 'm.5'], focus: 'm.5' },
      ],
    },
    {
      chapter: 'Rectangles in one step',
      layout: 'split',
      leftWidth: 560,
      left: [net('ps')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(6 + 8 + 10) \\times 15', '= 24 \\times 15 = 360'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Rectangles in one step', md: 'The three rectangles have the same length, so together they make one long rectangle: the **perimeter** of the triangle times the length of the prism.' },
      ],
      lines: [
        { say: 'Here is a shortcut. All three rectangles are fifteen centimetres long, so side by side they make one long rectangle.', show: ['ps.strip', 'ps.bases', 'ps.l'], focus: 'ps.strip' },
        { say: 'How wide is that long rectangle? Six plus eight plus ten, which is twenty-four centimetres. That is the perimeter of the triangle: the distance all the way around it.', show: 'ps.perimeter', focus: 'ps.perimeter' },
        { say: 'So the rectangles together are twenty-four times fifteen, which is three hundred sixty square centimetres, just as before.', show: ['m.0', 'm.1', 'tip'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangular prism is $10$ cm long. Each end is a right triangle with legs $3$ cm and $4$ cm and a sloped side of $5$ cm. What is its surface area?',
          choices: ['$120\\text{ cm}^2$', '$126\\text{ cm}^2$', '$60\\text{ cm}^2$', '$132\\text{ cm}^2$'],
          answer: 3,
          working: 'Triangles: $2 \\times \\tfrac{1}{2} \\times 3 \\times 4 = 12$. Rectangles: $(3 + 4 + 5) \\times 10 = 120$. $SA = 12 + 120 = 132\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular prism is ten centimetres long. Each end is a right triangle with legs of three and four centimetres, and a sloped side of five centimetres. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred thirty-two square centimetres. The two triangles make one half times three times four, twice: twelve. The rectangles make three plus four plus five, times ten: one hundred twenty. Twelve plus one hundred twenty is one hundred thirty-two. Choice A forgets the two triangle ends.', show: 'q.answer' },
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
          items: ['A triangular prism has $2$ triangles and $3$ rectangles.', 'Triangle: $\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}$. Each rectangle: a side of the triangle times the length.', 'Shortcut: the rectangles together are the perimeter times the length.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A triangular prism has two triangle ends and three rectangles.', show: 'sum.0' },
        { say: 'Each triangle is one half times base times height, and each rectangle is one side of the triangle times the length of the prism.', show: 'sum.1' },
        { say: 'As a shortcut, the rectangles together are the perimeter of the triangle times the length. In the next part, you will find how much fabric makes a tent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
