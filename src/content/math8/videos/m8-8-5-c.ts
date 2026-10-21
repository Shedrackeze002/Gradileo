import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

// A litre: a cube 10 cm on each edge, its faces split into centimetre squares.
const litre = figure('lt', [box({ l: 4, w: 4, h: 4, cells: 10, labels: { l: '10\\text{ cm}', w: '10\\text{ cm}', h: '10\\text{ cm}' } })], 400);
// The fish tank: inside 60 cm long, 30 cm wide and 40 cm deep.
const tank = figure('tk', [box({ l: 6, w: 3, h: 4, labels: { l: '60\\text{ cm}', w: '30\\text{ cm}', h: '40\\text{ cm}' } })], 420);
// The gift box: a base 15 cm by 12 cm, and an unknown height.
const gift = figure('gb', [box({ l: 4.5, w: 3.6, h: 6, labels: { l: '15\\text{ cm}', w: '12\\text{ cm}', h: 'h = {?}' } })], 420);

const video: Explainer = {
  id: 'm8-8-5-c',
  lessonId: 'm8-8-5',
  title: 'Volume of Prisms and Cylinders, Part 3: Capacity and Missing Dimensions',
  thumbnailTitle: 'Capacity and Litres',
  thumbnail: 'lt',
  summary:
    'The capacity of a container is how much it can hold, often in millilitres or litres: 1 mL = 1 cm³ and 1 L = 1,000 cm³, a cube 10 cm on each edge. A fish tank 60 cm by 30 cm by 40 cm holds 72,000 cm³, which is 72 L. If you know the volume, work backwards: height = volume ÷ area of base, so a box of 3,600 cm³ with a base 15 cm by 12 cm is 3,600 ÷ 180 = 20 cm high.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 3', title: 'Capacity and Missing Dimensions', subtitle: 'Litres, and working backwards' }],
      lines: [
        { say: 'Juice is sold in litres, and medicine in millilitres. How do these units connect to cubic centimetres?', show: 'title' },
        { say: 'In this video, you will change a volume into litres, and work backwards from a volume to find a missing height.' },
      ],
    },
    {
      chapter: 'Capacity',
      layout: 'split',
      leftWidth: 460,
      left: [litre],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Capacity',
          md: 'The **capacity** of a container is how much it can hold, often measured in millilitres or litres.',
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1\\text{ mL} = 1\\text{ cm}^3', '1\\text{ L} = 1\\,000\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'The capacity of a container is how much it can hold. It is often measured in millilitres or litres.', show: 'def' },
        { say: 'One millilitre fills exactly one cubic centimetre. So one millilitre equals one cubic centimetre.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is a cube, ten centimetres on each edge. Ten times ten times ten is one thousand, so it holds one thousand centimetre cubes.', show: ['lt.shape', 'lt.front-face', 'lt.top-face', 'lt.side-face', 'lt.cells', 'lt.l', 'lt.w', 'lt.h'] },
        { say: 'Filled with water, this cube holds exactly one litre. So one litre equals one thousand cubic centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A fish tank',
      layout: 'split',
      leftWidth: 520,
      left: [tank],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The inside of a fish tank is $60$ cm long, $30$ cm wide and $40$ cm deep. How many litres does it hold?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 60 \\times 30 \\times 40', '\\phantom{V} = 72\\,000\\text{ cm}^3', '72\\,000 \\div 1\\,000 = 72\\text{ L}'] },
      ],
      lines: [
        { say: 'The inside of a fish tank is sixty centimetres long, thirty centimetres wide and forty centimetres deep. How many litres does it hold?', show: ['q', 'tk.shape', 'tk.front-face', 'tk.side-face', 'tk.top-face', 'tk.l', 'tk.w', 'tk.h'] },
        { say: 'First find the volume. The base is sixty by thirty, which is one thousand eight hundred square centimetres. Times the height of forty, that is seventy-two thousand cubic centimetres.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Every one thousand cubic centimetres make one litre. So divide by one thousand: seventy-two thousand divided by one thousand is seventy-two.', show: 'm.2', focus: 'm.2' },
        { say: 'The tank holds seventy-two litres of water.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'split',
      leftWidth: 420,
      left: [gift],
      right: [
        { kind: 'math', id: 'r', size: 'md', align: 'left', lines: ['V = (\\text{area of base}) \\times h', 'h = V \\div (\\text{area of base})'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 3\\,600\\text{ cm}^3', '\\text{Area of base} = 15 \\times 12 = 180\\text{ cm}^2', 'h = 3\\,600 \\div 180 = 20\\text{ cm}'] },
      ],
      lines: [
        { say: 'If you know the volume, you can work backwards to find a missing length.', show: 'r.0' },
        { say: 'The volume is the area of the base times the height. So the height is the volume divided by the area of the base. Dividing undoes multiplying.', show: 'r.1', focus: 'r.1' },
        { say: 'A gift box has a volume of three thousand six hundred cubic centimetres. Its base is fifteen centimetres by twelve centimetres. How high is it?', show: ['gb.shape', 'gb.front-face', 'gb.side-face', 'gb.top-face', 'gb.l', 'gb.w', 'gb.h', 'm.0'] },
        { say: 'The area of the base is fifteen times twelve, which is one hundred eighty square centimetres.', show: 'm.1', focus: ['m.1', 'gb.top-face'] },
        { say: 'Divide the volume by it: three thousand six hundred divided by one hundred eighty is twenty. The box is twenty centimetres high.', show: 'm.2', focus: ['m.2', 'gb.h'] },
        { say: 'Check it: one hundred eighty times twenty is three thousand six hundred. It works!', focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box has a volume of $960\\text{ cm}^3$. Its base is $12$ cm by $8$ cm. How high is it?',
          choices: ['$80$ cm', '$10$ cm', '$96$ cm', '$48$ cm'],
          answer: 1,
          working: 'Area of base: $12 \\times 8 = 96\\text{ cm}^2$. Height: $960 \\div 96 = 10$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A box has a volume of nine hundred sixty cubic centimetres. Its base is twelve centimetres by eight centimetres. How high is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, ten centimetres. The area of the base is twelve times eight, which is ninety-six. Nine hundred sixty divided by ninety-six is ten. Choice A divides by only the length, twelve, instead of by the whole area of the base.', show: 'q.answer' },
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
          items: ['Capacity is how much a container holds.', '$1\\text{ mL} = 1\\text{ cm}^3$ and $1\\text{ L} = 1\\,000\\text{ cm}^3$.', 'Missing height: $h = V \\div (\\text{area of base})$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Capacity is how much a container can hold.', show: 'sum.0' },
        { say: 'One millilitre is one cubic centimetre, and one litre is one thousand cubic centimetres.', show: 'sum.1' },
        { say: 'To find a missing height, divide the volume by the area of the base. In the next part, you will find the volume of a cylinder. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
