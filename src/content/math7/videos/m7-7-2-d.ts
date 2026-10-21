import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { parallelogram, piece, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';

// A parallelogram with an area of 72 cm² and a base of 9 cm: its height is unknown (8 cm).
const missing = (id: string) => figure(id, [parallelogram({ b: 9, h: 8, s: 3, labels: { b: '9\\text{ cm}', h: 'h = \\, ?' } })], 380);

// The lawn: a parallelogram with a base of 20 m and a height of 12 m, and a 4 m by 3 m flower bed
// in the middle.
const lawn = (id: string) =>
  figure(
    id,
    [
      parallelogram({ b: 20, h: 12, s: 5, tone: 'good', labels: { b: '20\\text{ m}', h: '12\\text{ m}' } }),
      piece('bed', [
        [10.5, 4.5],
        [14.5, 4.5],
        [14.5, 7.5],
        [10.5, 7.5],
      ], { tone: 'hyp', shade: 0.5 }),
      seg('bw', [10.5, 4.5], [14.5, 4.5], { tone: 'hyp', label: '4\\text{ m}', side: 'right', weight: 2 }),
      seg('bh', [14.5, 4.5], [14.5, 7.5], { tone: 'hyp', label: '3\\text{ m}', side: 'right', weight: 2 }),
    ],
    420,
  );

const video: Explainer = {
  id: 'm7-7-2-d',
  lessonId: 'm7-7-2',
  title: 'Area of a Parallelogram, Part 4: Working Backwards and Taking Away',
  thumbnailTitle: 'Missing Lengths and Holes',
  thumbnail: 'lw',
  summary:
    'If you know the area, substitute into A = bh and divide to find a missing base or height: an area of 72 cm² and a base of 9 cm give 72 = 9 × h, so h = 8 cm; an area of 60 m² and a height of 5 m give a base of 12 m. For a shape with a hole, subtract: a parallelogram lawn 20 m by 12 m with a 4 m by 3 m flower bed has 240 − 12 = 228 m² of grass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 4', title: 'Working Backwards and Taking Away', subtitle: 'Missing lengths, and shapes with holes' }],
      lines: [
        { say: 'Sometimes you already know the area of a parallelogram, and you need to find its base or its height. And sometimes a shape has a hole in it.', show: 'title' },
        { say: 'In this video, you will work backwards from the area, and find the area of a lawn with a flower bed in the middle.' },
      ],
    },
    {
      chapter: 'Find the height',
      layout: 'split',
      leftWidth: 560,
      left: [missing('ms')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = bh', '72 = 9 \\times h', 'h = 72 \\div 9', 'h = 8\\text{ cm}', '\\text{Check: } 9 \\times 8 = 72 \\;\\checkmark'] }],
      lines: [
        { say: 'A parallelogram has an area of seventy-two square centimetres and a base of nine centimetres. Find its height.', show: ['ms.shape', 'ms.base', 'ms.h0'] },
        { say: 'Start with the formula, "A" equals b h, and substitute what you know. Seventy-two equals nine times h.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'This is an equation! The height is multiplied by nine, so divide both sides by nine. Seventy-two divided by nine is eight.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'The height is eight centimetres. Check: nine times eight is seventy-two. It works!', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Find the base',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A parallelogram has an area of $60\\text{ m}^2$ and a height of $5$ m. Find its base.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['60 = b \\times 5', 'b = 60 \\div 5 = 12\\text{ m}'] },
      ],
      lines: [
        { say: 'It works for a missing base as well. A parallelogram has an area of sixty square metres and a height of five metres. Find its base.', show: 'q' },
        { say: 'Substitute into the formula: sixty equals b times five.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by five. Sixty divided by five is twelve. The base is twelve metres. Check: twelve times five is sixty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Take away a hole',
      layout: 'split',
      leftWidth: 620,
      left: [lawn('lw')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Lawn: } 20 \\times 12 = 240', '\\text{Bed: } 4 \\times 3 = 12', '\\text{Grass: } 240 - 12 = 228', '\\text{Grass} = 228\\text{ m}^2'] }],
      lines: [
        { say: 'A lawn is shaped like a parallelogram, with a base of twenty metres and a height of twelve metres.', show: ['lw.shape', 'lw.base', 'lw.h0'] },
        { say: 'A rectangular flower bed, four metres by three metres, sits in the middle. How much of the lawn is covered with grass?', show: ['lw.bed', 'lw.bw', 'lw.bh'], focus: 'lw.bed' },
        { say: 'First find the area of the whole lawn: twenty times twelve is two hundred forty square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then find the area of the flower bed: four times three is twelve square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'The grass is the whole lawn, take away the flower bed. Two hundred forty minus twelve is two hundred twenty-eight. The grass covers two hundred twenty-eight square metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has an area of $56\\text{ cm}^2$ and a height of $7$ cm. What is its base?',
          choices: ['$392$ cm', '$49$ cm', '$63$ cm', '$8$ cm'],
          answer: 3,
          working: '$56 = b \\times 7$, so $b = 56 \\div 7 = 8$ cm. Check: $8 \\times 7 = 56$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has an area of fifty-six square centimetres and a height of seven centimetres. What is its base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eight centimetres. Fifty-six equals b times seven, so divide by seven: fifty-six divided by seven is eight. Choice A multiplies by seven instead of dividing.', show: 'q.answer' },
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
          items: ['To find a missing base or height, substitute into $A = bh$, then divide.', 'For a shape with a hole, find the whole area, then subtract the hole.', 'Check by multiplying back.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a missing base or height, substitute what you know into "A" equals b h, then divide.', show: 'sum.0' },
        { say: 'For a shape with a hole, find the area of the whole shape, then subtract the area of the hole.', show: 'sum.1' },
        { say: 'And check by multiplying back. In the next lesson, you will find the area of a triangle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
