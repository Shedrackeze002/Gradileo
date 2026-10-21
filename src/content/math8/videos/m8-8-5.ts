import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';
import { cubes } from '../../math6/videos/lib/m6-10-figures.ts';

// One centimetre cube, and a prism of centimetre cubes 4 long, 3 wide and 3 high, built in layers.
const one = figure('cu', [cubes({ heights: [[1]], labels: { l: '1\\text{ cm}', w: '1\\text{ cm}', h: '1\\text{ cm}' } })], 300);
const FULL = [
  [3, 3, 3, 3],
  [3, 3, 3, 3],
  [3, 3, 3, 3],
];
const layers = figure('ly', [cubes({ heights: FULL, group: 'layer', labels: { l: '4\\text{ cm}', w: '3\\text{ cm}', h: '3\\text{ cm}' } })], 440);
// The shipping box: 30 cm long, 20 cm wide and 10 cm high.
const shipping = (id: string) => figure(id, [box({ l: 6, w: 4, h: 2, labels: { l: '30\\text{ cm}', w: '20\\text{ cm}', h: '10\\text{ cm}' } })], 400);

const video: Explainer = {
  id: 'm8-8-5',
  lessonId: 'm8-8-5',
  title: 'Volume of Prisms and Cylinders, Part 1: Volume of a Rectangular Prism',
  thumbnailTitle: 'Volume of a Box',
  thumbnail: 'ly',
  summary:
    'Volume is the amount of space an object takes up, measured in cubic units such as cm³. Fill a box with centimetre cubes: the bottom layer has as many cubes as the area of the base, and the layers stack up to the height. So for every right prism, V = (area of base) × height, and for a rectangular prism, V = l × w × h. A box 30 cm by 20 cm by 10 cm has a base of 600 cm² and a volume of 6,000 cm³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 1', title: 'Volume of a Rectangular Prism', subtitle: 'Fill it with cubes, layer by layer' }],
      lines: [
        { say: 'How much water fits in a fish tank? How much juice is in a can? Both questions are about volume: the amount of space inside a 3-D object.', show: 'title' },
        { say: 'In this video, you will fill a box with cubes, layer by layer, and find a rule for its volume.' },
      ],
    },
    {
      chapter: 'What is volume?',
      layout: 'split',
      leftWidth: 420,
      left: [one],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Volume',
          md: 'The **volume** of an object is the amount of space it takes up. It is measured in **cubic units**, such as $\\text{cm}^3$ or $\\text{m}^3$.',
        },
      ],
      lines: [
        { say: 'The volume of an object is the amount of space it takes up.', show: 'def' },
        { say: 'We measure volume by counting cubes. A cubic centimetre is a small cube, one centimetre long, one centimetre wide and one centimetre high. It is about the size of a sugar cube.', show: ['cu.cubes', 'cu.l', 'cu.w', 'cu.h'] },
        { say: 'So volume is measured in cubic units, such as cubic centimetres, or cubic metres for bigger things.', focus: 'def' },
      ],
    },
    {
      chapter: 'Layer by layer',
      layout: 'split',
      leftWidth: 540,
      left: [layers],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Bottom layer: } 4 \\times 3 = 12', '\\text{Three layers: } 12 \\times 3 = 36', 'V = 36\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'Picture filling a box with centimetre cubes. The box is four centimetres long, three centimetres wide and three centimetres high.', show: ['ly.l', 'ly.w', 'ly.h'] },
        { say: 'Start with the bottom layer. It covers the base of the box: four cubes along, and three rows. That is four times three, which is twelve cubes.', show: ['ly.layer0', 'ly.top0', 'm.0'], focus: 'm.0' },
        { say: 'Twelve is also the area of the base, in square centimetres. The bottom layer has as many cubes as the area of the base.', focus: 'ly.top0' },
        { say: 'Now stack another layer of twelve on top,', show: ['ly.layer1', 'ly.top1'], hide: 'ly.top0' },
        { say: 'and another, up to the height of three centimetres.', show: ['ly.layer2', 'ly.top2'], hide: 'ly.top1', focus: 'ly.h' },
        { say: 'Three layers of twelve is twelve times three, which is thirty-six. The volume is thirty-six cubic centimetres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Base times height',
      layout: 'split',
      leftWidth: 500,
      left: [figure('bx', [box({ l: 6, w: 4, h: 3, labels: { l: 'l', w: 'w', h: 'h' } })], 400)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = (\\text{area of base}) \\times \\text{height}', 'V = l \\times w \\times h'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Every right prism', md: 'Volume = area of the base × height. The base is one of the two matching ends.' },
      ],
      lines: [
        { say: 'This gives a rule. The area of the base tells you how many cubes fit in one layer. The height tells you how many layers there are.', show: ['bx.shape', 'bx.front-face', 'bx.side-face', 'bx.top-face'], focus: 'bx.top-face' },
        { say: 'So the volume is the area of the base, times the height. This works for every right prism: a prism whose sides stand straight up from its base.', show: ['m.0', 'key'], focus: 'm.0' },
        { say: 'For a rectangular prism, the base is a rectangle, l by w. So the volume is l times w times h.', show: ['m.1', 'bx.l', 'bx.w', 'bx.h'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A shipping box',
      layout: 'split',
      leftWidth: 460,
      left: [shipping('sb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A box is $30$ cm long, $20$ cm wide and $10$ cm high. What is its volume?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area of base} = 30 \\times 20 = 600\\text{ cm}^2', 'V = 600 \\times 10 = 6\\,000\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A box is thirty centimetres long, twenty centimetres wide and ten centimetres high. What is its volume?', show: ['q', 'sb.shape', 'sb.front-face', 'sb.side-face', 'sb.top-face', 'sb.l', 'sb.w', 'sb.h'] },
        { say: 'First, the area of the base: thirty times twenty is six hundred square centimetres. So six hundred centimetre cubes would cover the bottom.', show: 'm.0', focus: ['m.0', 'sb.top-face'] },
        { say: 'The box is ten centimetres high, so there are ten layers. Six hundred times ten is six thousand. The volume is six thousand cubic centimetres.', show: 'm.1', focus: ['m.1', 'sb.h'] },
      ],
    },
    {
      chapter: 'Square or cubic units?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The same box', 'What it measures', 'Units'],
          rows: [
            ['Surface area: $2\\,200$', 'the wrapping paper **outside**', '$\\text{cm}^2$, square'],
            ['Volume: $6\\,000$', 'the space **inside**', '$\\text{cm}^3$, cubic'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square or cubic?', md: 'Volume multiplies **three** lengths: $\\text{cm} \\times \\text{cm} \\times \\text{cm} = \\text{cm}^3$. Area multiplies two: $\\text{cm}^2$.' },
      ],
      lines: [
        { say: 'Do not mix up volume and surface area. For this same box, the surface area is two thousand two hundred square centimetres. That is the wrapping paper on the outside.', show: 't', focus: 't.0' },
        { say: 'The volume is six thousand cubic centimetres. That is the space inside.', focus: 't.1' },
        { say: 'Volume multiplies three lengths, so its units are cubic, written with a small three. Area multiplies two lengths, so its units are square, written with a small two.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box is $8$ cm long, $5$ cm wide and $3$ cm high. What is its volume?',
          choices: ['$16\\text{ cm}^3$', '$40\\text{ cm}^3$', '$158\\text{ cm}^2$', '$120\\text{ cm}^3$'],
          answer: 3,
          working: 'Area of base: $8 \\times 5 = 40\\text{ cm}^2$. Volume: $40 \\times 3 = 120\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box is eight centimetres long, five centimetres wide and three centimetres high. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred twenty cubic centimetres. The area of the base is eight times five, which is forty, and three layers make forty times three: one hundred twenty. Choice C is the surface area, in square centimetres, not the space inside.', show: 'q.answer' },
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
          items: ['Volume is the space an object takes up, in cubic units.', 'Any right prism: $V = (\\text{area of base}) \\times \\text{height}$.', 'Rectangular prism: $V = l \\times w \\times h$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Volume is the amount of space an object takes up, measured in cubic units.', show: 'sum.0' },
        { say: 'For any right prism, the volume is the area of the base, times the height.', show: 'sum.1' },
        { say: 'For a rectangular prism, that is l times w times h. In the next part, you will find the volume of a triangular prism. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
