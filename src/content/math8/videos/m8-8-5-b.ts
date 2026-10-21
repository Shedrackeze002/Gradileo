import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, triangularPrism } from '@/video/solids.ts';
import { faceParts, prismSlices } from './lib/m8-8-figures.ts';

// The ramp: ends are right triangles with legs 6 cm and 8 cm (sloped side 10 cm); 15 cm long.
// Drawn at half size, with the right angle at the bottom left; the sloped side is pink.
const slope: DiagramItem = { kind: 'line', id: 'slope', from: 'B', to: 'C', tone: 'hyp' };
const ramp = (id: string) =>
  figure(id, [faceParts(undefined, ['front-end']), triangularPrism({ b: 4, t: 3, apex: 0, l: 7.5, labels: { b: '8\\text{ cm}', t: '6\\text{ cm}', l: '15\\text{ cm}' } }), { points: {}, items: [slope] }], 420);

const video: Explainer = {
  id: 'm8-8-5-b',
  lessonId: 'm8-8-5',
  title: 'Volume of Prisms and Cylinders, Part 2: Volume of a Triangular Prism',
  thumbnailTitle: 'Volume of a Triangular Prism',
  thumbnail: 'rp',
  summary:
    'For a triangular prism, the base is the triangle at the end, and the height of the prism is its length, even when the prism lies on its side. V = (area of base) × height: a ramp whose ends have legs 6 cm and 8 cm and which is 15 cm long has a base of ½ × 6 × 8 = 24 cm² and a volume of 24 × 15 = 360 cm³. The sloped side is not needed. The base is one of the two matching ends, not the face the prism sits on.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 2', title: 'Volume of a Triangular Prism', subtitle: 'The base is the triangle' }],
      lines: [
        { say: 'In the last part, you found the volume of a box: the area of the base, times the height. The same rule works for a triangular prism.', show: 'title' },
        { say: 'In this video, you will find the base of a triangular prism, even when it is lying on its side, and work out its volume.' },
      ],
    },
    {
      chapter: 'The base is the triangle',
      layout: 'split',
      leftWidth: 560,
      left: [ramp('rp')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Base and height of a triangular prism', md: 'The **base** is one of the two matching triangle ends. The **height** of the prism is the distance between the ends: its **length**.' }],
      lines: [
        { say: 'Here is the ramp from earlier. It is a triangular prism, lying on one of its rectangles.', show: ['rp.shape', 'rp.side-face', 'rp.slope'] },
        { say: 'For volume, the base of a prism is one of its two matching ends. Here, the ends are the triangles. So the base is the triangle, shown in yellow.', show: ['rp.front-end', 'key'], focus: 'rp.front-end' },
        { say: 'The height of the prism is the distance from one end to the other. For this ramp, that is its length, fifteen centimetres.', show: 'rp.l', focus: 'rp.l' },
        { say: 'The prism is lying on its side, but that does not matter. The triangle is still the base.', focus: 'key' },
      ],
    },
    {
      chapter: 'Slices of the prism',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure(
          'sl',
          [faceParts(undefined, ['front-end']), triangularPrism({ b: 4, t: 3, apex: 0, l: 7.5, labels: { l: '15\\text{ cm}' } }), prismSlices({ b: 4, t: 3, apex: 0, l: 7.5, count: 15 }), { points: {}, items: [slope] }],
          420,
        ),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = (\\text{area of base}) \\times \\text{height}'] }],
      lines: [
        { say: 'Why does the rule work? Picture the ramp cut into thin slices, like a loaf of bread. Each slice is a triangle the same size as the end.', show: ['sl.shape', 'sl.side-face', 'sl.slope', 'sl.front-end', 'sl.slices'], focus: 'sl.slices' },
        { say: 'Here the ramp is cut into fifteen slices, each one centimetre thick. A slice one centimetre thick holds as many cubic centimetres as the triangle has square centimetres of area.', focus: 'sl.front-end' },
        { say: 'And there are fifteen slices, one behind another, along the length of the ramp.', focus: 'sl.l', show: 'sl.l' },
        { say: 'So, just like the box, the volume is the area of the base, times the height.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The volume of the ramp',
      layout: 'split',
      leftWidth: 440,
      left: [ramp('vr')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area of base} = \\tfrac{1}{2} \\times 6 \\times 8 = 24\\text{ cm}^2', 'V = 24 \\times 15 = 360\\text{ cm}^3'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Not needed', md: 'The sloped side, $10$ cm, is not used for the volume.' },
      ],
      lines: [
        { say: 'The ends of the ramp are right triangles with legs of six and eight centimetres, and a sloped side of ten. The ramp is fifteen centimetres long. What is its volume?', show: ['vr.shape', 'vr.side-face', 'vr.slope', 'vr.front-end', 'vr.b', 'vr.t', 'vr.t-mark', 'vr.l'] },
        { say: 'First, the area of the base. The triangle’s legs are its base and height, so its area is one half times six times eight: twenty-four square centimetres.', show: 'm.0', focus: ['m.0', 'vr.front-end'] },
        { say: 'Now multiply by the height of the prism, its length: twenty-four times fifteen is three hundred sixty. The volume is three hundred sixty cubic centimetres.', show: 'm.1', focus: ['m.1', 'vr.l'] },
        { say: 'Notice that we never used the sloped side. It matters for surface area, but not for volume.', show: 'tip', focus: 'vr.slope' },
      ],
    },
    {
      chapter: 'The wrong base',
      layout: 'split',
      leftWidth: 560,
      left: [ramp('wb')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\bad{8 \\times 15 \\times 6 = 720}', '\\good{\\tfrac{1}{2} \\times 6 \\times 8 \\times 15 = 360}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The wrong base', md: 'The base of a prism is one of the two matching ends, **not** the face it sits on. For a triangular prism, use the area of the triangle, and multiply by the length.' },
      ],
      lines: [
        { say: 'Here is a common mistake. The ramp sits on a rectangle, eight by fifteen, so it is tempting to call that the base.', show: ['wb.shape', 'wb.side-face', 'wb.slope', 'wb.b', 'wb.t', 'wb.t-mark', 'wb.l'], focus: ['wb.b', 'wb.l'] },
        { say: 'Eight times fifteen, times the height of six, gives seven hundred twenty. That is twice the right answer! It is the volume of a whole box, and the ramp is only half of that box.', show: 'm.0', focus: 'm.0' },
        { say: 'The base of a prism is one of its two matching ends. For a triangular prism, use the area of the triangle, then multiply by the length.', show: ['m.1', 'oops', 'wb.front-end'], focus: ['m.1', 'wb.front-end'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each end of a triangular prism is a triangle with a base of $10$ cm and a height of $6$ cm. The prism is $20$ cm long. What is its volume?',
          choices: ['$1\\,200\\text{ cm}^3$', '$36\\text{ cm}^3$', '$600\\text{ cm}^3$', '$30\\text{ cm}^3$'],
          answer: 2,
          working: 'Area of base: $\\tfrac{1}{2} \\times 10 \\times 6 = 30\\text{ cm}^2$. Volume: $30 \\times 20 = 600\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Each end of a triangular prism is a triangle with a base of ten centimetres and a height of six centimetres. The prism is twenty centimetres long. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, six hundred cubic centimetres. The triangle has an area of one half times ten times six, which is thirty. Thirty times twenty is six hundred. Choice A forgets the one half in the area of the triangle.', show: 'q.answer' },
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
          items: ['The base of a triangular prism is the triangle at the end.', 'Its height is the length of the prism, even when it lies on its side.', '$V = (\\text{area of base}) \\times \\text{height}$, with the triangle’s area $\\tfrac{1}{2} \\times b \\times h$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The base of a triangular prism is the triangle at one end, not the face it sits on.', show: 'sum.0' },
        { say: 'The height of the prism is its length, even when it lies on its side.', show: 'sum.1' },
        { say: 'The volume is the area of the triangle, times the length. In the next part, you will turn volume into litres, and work backwards to find a missing height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
