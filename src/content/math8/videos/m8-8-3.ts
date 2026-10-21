import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure } from '@/video/solids.ts';

// The shipping box: 30 cm long, 20 cm wide and 10 cm high (drawn at a fifth and a tenth of its size).
const L = { l: '30\\text{ cm}', w: '20\\text{ cm}', h: '10\\text{ cm}' };
const shipping = (id: string) => figure(id, [box({ l: 6, w: 4, h: 2, labels: L })], 420);
// Its net, with each face named, or with its area in square centimetres.
const t = (s: string) => `\\text{${s}}`;
const NAMES = { top: t('top'), bottom: t('bottom'), front: t('front'), back: t('back'), left: t('end'), right: t('end') };
const AREAS = { top: '600', bottom: '600', front: '300', back: '300', left: '200', right: '200' };
const net = (id: string, areas: typeof NAMES) => figure(id, [boxNet({ l: 3, w: 2, h: 1, labels: { l: '30', w: '20', h: '10' }, areas })], 440);
// Every face of the net, without the labels on them.
const FACES = ['left', 'front', 'right', 'back', 'top', 'bottom'];
const faces = (id: string) => FACES.flatMap((f) => [`${id}.${f}`, `${id}.${f}-edge`]);

const video: Explainer = {
  id: 'm8-8-3',
  lessonId: 'm8-8-3',
  title: 'Surface Area of Prisms, Part 1: What Is Surface Area?',
  thumbnailTitle: 'What Is Surface Area?',
  thumbnail: 'nt',
  summary:
    'The surface area of a 3-D object is the total area of all its faces, the amount of wrapping paper that would cover it exactly, in square units such as cm². A net shows every face laid flat, so the surface area is the area of the net. A closed box 30 cm long, 20 cm wide and 10 cm high has 2 × 30 × 20 + 2 × 30 × 10 + 2 × 20 × 10 = 1,200 + 600 + 400 = 2,200 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 1', title: 'What Is Surface Area?', subtitle: 'The area of every face, added up' }],
      lines: [
        { say: 'Before you wrap a gift, paint a toy box or sew a tent, you need to know how much paper, paint or fabric to buy.', show: 'title' },
        { say: 'That amount depends on the area of every outside face of the object. In this video, you will learn what surface area is, and find the surface area of a box.' },
      ],
    },
    {
      chapter: 'What is surface area?',
      layout: 'split',
      leftWidth: 540,
      left: [shipping('bx')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Surface area',
          md: 'The **surface area** of a 3-D object is the total area of all its faces: the wrapping paper that would cover it exactly. It is measured in **square units**, such as $\\text{cm}^2$ or $\\text{m}^2$.',
        },
      ],
      lines: [
        { say: 'Here is a closed box. The surface area of a 3-D object is the total area of all its faces.', show: ['bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face', 'def'] },
        { say: 'Think of it as the amount of wrapping paper that would cover the object exactly, with no gaps and no overlaps.', focus: ['bx.front-face', 'bx.top-face', 'bx.side-face'] },
        { say: 'Area counts squares. A square centimetre is a little square, one centimetre long on each side. So surface area is measured in square units, such as square centimetres or square metres.', focus: 'def' },
      ],
    },
    {
      chapter: 'Unfold the box',
      layout: 'split',
      leftWidth: 640,
      left: [net('nt', NAMES)],
      right: [{ kind: 'bullets', id: 'b', items: ['Top and bottom', 'Front and back', 'The two ends'] }],
      lines: [
        { say: 'A net shows every face of an object laid flat. So the surface area of the box is just the area of its net.', show: ['nt.fb', 'nt.tb', 'nt.ends'] },
        { say: 'A rectangular prism has six rectangle faces, in three matching pairs. There is the top and the bottom,', show: 'b.0', focus: 'nt.tb' },
        { say: 'the front and the back,', show: 'b.1', focus: 'nt.fb' },
        { say: 'and the two ends.', show: 'b.2', focus: 'nt.ends' },
        { say: 'Matching faces are the same size, so they have the same area. That means you only need to find three areas, and double each one.', focus: 'b' },
      ],
    },
    {
      chapter: 'A shipping box',
      layout: 'split',
      leftWidth: 600,
      left: [net('sb', AREAS)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['2 \\times 30 \\times 20 = 1\\,200', '2 \\times 30 \\times 10 = 600', '2 \\times 20 \\times 10 = 400', 'SA = 1\\,200 + 600 + 400', '\\phantom{SA} = 2\\,200\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'A closed shipping box is thirty centimetres long, twenty centimetres wide and ten centimetres high. What is its surface area?', show: [...faces('sb'), 'sb.l', 'sb.w', 'sb.h'] },
        { say: 'The top and the bottom are each thirty by twenty, which is six hundred square centimetres. Two of them make one thousand two hundred.', show: ['m.0', 'sb.top-area', 'sb.bottom-area'], focus: ['m.0', 'sb.tb'] },
        { say: 'The front and the back are each thirty by ten, which is three hundred. Two of them make six hundred.', show: ['m.1', 'sb.front-area', 'sb.back-area'], focus: ['m.1', 'sb.fb'] },
        { say: 'The two ends are each twenty by ten, which is two hundred. Two of them make four hundred.', show: ['m.2', 'sb.left-area', 'sb.right-area'], focus: ['m.2', 'sb.ends'] },
        { say: 'Now add them up. One thousand two hundred, plus six hundred, plus four hundred, is two thousand two hundred. The surface area is two thousand two hundred square centimetres.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Square units',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the square units', md: 'Surface area is an **area**, so its units are **square** units. Write $2\\,200\\text{ cm}^2$, not $2\\,200\\text{ cm}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{cm} \\times \\text{cm} = \\text{cm}^2'] },
      ],
      lines: [
        { say: 'Watch out for the units. Surface area is an area, so it is measured in square units.', show: 'oops' },
        { say: 'When you multiply centimetres by centimetres, you get square centimetres. We write them with a small two after the units, as you see here.', show: 'm.0', focus: 'm.0' },
        { say: 'So the answer is two thousand two hundred square centimetres: enough little squares, one centimetre on each side, to cover the whole box.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed box is $10$ cm long, $5$ cm wide and $4$ cm high. What is its surface area?',
          choices: ['$110\\text{ cm}^2$', '$200\\text{ cm}^3$', '$220\\text{ cm}^2$', '$180\\text{ cm}^2$'],
          answer: 2,
          working: 'Top and bottom: $2 \\times 10 \\times 5 = 100$. Front and back: $2 \\times 10 \\times 4 = 80$. Ends: $2 \\times 5 \\times 4 = 40$. Total: $100 + 80 + 40 = 220\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed box is ten centimetres long, five centimetres wide and four centimetres high. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two hundred twenty square centimetres. The top and bottom give one hundred, the front and back give eighty, and the two ends give forty. One hundred plus eighty plus forty is two hundred twenty. Choice A adds only three faces, one from each pair.', show: 'q.answer' },
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
          items: ['Surface area is the total area of all the faces: the area of the net.', 'A rectangular prism has $3$ matching pairs of faces.', 'Find each pair’s area, then add. The units are square units.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The surface area of an object is the total area of all its faces. It is the area of its net.', show: 'sum.0' },
        { say: 'A rectangular prism has three matching pairs of faces: top and bottom, front and back, and the two ends.', show: 'sum.1' },
        { say: 'Find the area of each pair, then add, and write square units. In the next part, you will turn this into a formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
