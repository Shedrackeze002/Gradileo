import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';
import { cubes } from './lib/m6-10-figures.ts';

// The lesson's prism: 5 cm long, 3 cm wide and 4 cm high, built from 60 centimetre cubes.
const L = { l: '5\\text{ cm}', w: '3\\text{ cm}', h: '4\\text{ cm}' };

const video: Explainer = {
  id: 'm6-10-2',
  lessonId: 'm6-10-2',
  title: 'Volume of Rectangular Prisms, Part 1: From Cubes to a Formula',
  thumbnailTitle: 'From Cubes to a Formula',
  thumbnail: 'f',
  summary: 'A right rectangular prism is a box shape with six rectangular faces meeting at right angles. A prism of centimetre cubes 5 long and 3 wide has 15 cubes in each layer, and 4 layers make 60 cm³: the same as length × width × height. So V = l × w × h; a brick 20 cm by 10 cm by 6 cm has a volume of 1,200 cm³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 1', title: 'From Cubes to a Formula', subtitle: 'Length times width times height' }],
      lines: [
        { say: 'Counting cubes works well for small models. But how would you find the volume of a moving truck, or a fish tank? You cannot fill them with little cubes!', show: 'title' },
        { say: 'In this video, you will turn counting layers of cubes into a quick rule: a formula for the volume of a box.' },
      ],
    },
    {
      chapter: 'A box shape',
      layout: 'split',
      leftWidth: 480,
      left: [figure('bx', [box({ l: 5, w: 3, h: 4 })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Right rectangular prism', md: 'A **right rectangular prism** is a box shape. It has $6$ rectangular faces, and its edges meet at **right angles**.' }],
      lines: [
        { say: 'A right rectangular prism is a box shape. It has six faces, and every face is a rectangle.', show: ['bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face', 'def'] },
        { say: 'Its edges meet at right angles, like the corners of a shoebox. The dashed edges are at the back, hidden from view.', focus: 'bx.shape' },
        { say: 'Cereal boxes, bricks and fish tanks are all right rectangular prisms.', focus: 'bx' },
      ],
    },
    {
      chapter: 'Layers of cubes',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ly', [cubes({ heights: [[4, 4, 4, 4, 4], [4, 4, 4, 4, 4], [4, 4, 4, 4, 4]], group: 'layer', labels: L })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{one layer: } 5 \\times 3 = 15', '\\text{four layers: } 15 \\times 4 = 60', '\\text{Volume} = 60\\text{ cm}^3'] }],
      lines: [
        { say: 'This prism is built from centimetre cubes. The bottom layer is five cubes long and three cubes wide.', show: ['ly.layer0', 'ly.top0', 'ly.l', 'ly.w'], focus: ['ly.l', 'ly.w'] },
        { say: 'So the bottom layer has five times three, which is fifteen cubes.', show: 'm.0', focus: 'm.0' },
        { say: 'Put another layer on top: fifteen more cubes.', show: ['ly.layer1', 'ly.top1'], hide: 'ly.top0' },
        { say: 'And two more layers. The prism is four cubes high, so it has four layers.', show: ['ly.layer2', 'ly.layer3', 'ly.top3', 'ly.h'], hide: 'ly.top1', focus: 'ly.h' },
        { say: 'Four layers of fifteen is fifteen times four, which is sixty. So the volume is sixty cubic centimetres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'split',
      leftWidth: 480,
      left: [figure('f', [box({ l: 5, w: 3, h: 4, labels: { l: 'l', w: 'w', h: 'h' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(\\adj{5} \\times \\adj{3}) \\times \\opp{4} = 60', '\\text{Volume} = \\adj{\\text{length}} \\times \\adj{\\text{width}} \\times \\opp{\\text{height}}', 'V = \\adj{l} \\times \\adj{w} \\times \\opp{h}'] },
      ],
      lines: [
        { say: 'Look at the numbers we multiplied. Five times three is the length times the width: the number of cubes in one layer.', show: ['f.shape', 'f.front-face', 'f.top-face', 'f.side-face', 'f.l', 'f.w', 'm.0'], focus: ['f.l', 'f.w'] },
        { say: 'Then we multiplied by four, the height: the number of layers.', show: 'f.h', focus: 'f.h' },
        { say: 'So the volume of a rectangular prism is its length, times its width, times its height.', show: 'm.1', focus: 'm.1' },
        { say: 'With letters: V equals l times w times h. V stands for volume, l for length, w for width, and h for height.', show: 'm.2', focus: 'm.2' },
        { say: 'Volume is in cubic units, like cubic centimetres, because we multiply three lengths.' },
      ],
    },
    {
      chapter: 'The volume of a brick',
      layout: 'split',
      leftWidth: 480,
      left: [figure('br', [box({ l: 6, w: 3, h: 1.8, labels: { l: '20\\text{ cm}', w: '10\\text{ cm}', h: '6\\text{ cm}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = l \\times w \\times h', '\\phantom{V} = 20 \\times 10 \\times 6', '20 \\times 10 = 200', '200 \\times 6 = 1200', 'V = 1200\\text{ cm}^3'] }],
      lines: [
        { say: 'Let’s use the formula. A brick is twenty centimetres long, ten centimetres wide and six centimetres high. What is its volume?', show: ['br.shape', 'br.front-face', 'br.top-face', 'br.side-face', 'br.l', 'br.w', 'br.h'] },
        { say: 'Volume equals length times width times height: twenty times ten times six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Twenty times ten is two hundred. That is the number of centimetre cubes in one layer.', show: 'm.2', focus: 'm.2' },
        { say: 'Two hundred times six is one thousand two hundred. So the brick has a volume of one thousand two hundred cubic centimetres.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box is $7\\text{ cm}$ long, $2\\text{ cm}$ wide and $3\\text{ cm}$ high. What is its volume?',
          choices: ['$12\\text{ cm}^3$', '$42\\text{ cm}^2$', '$42\\text{ cm}^3$', '$14\\text{ cm}^3$'],
          answer: 2,
          working: '$V = 7 \\times 2 \\times 3 = 14 \\times 3 = 42$, so the volume is $42\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box is seven centimetres long, two centimetres wide and three centimetres high. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, forty-two cubic centimetres. Seven times two is fourteen, and fourteen times three is forty-two. Choice A adds the three lengths instead of multiplying them.', show: 'q.answer' },
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
          items: ['A right rectangular prism is a box shape, made of equal layers of cubes.', 'Volume $=$ length $\\times$ width $\\times$ height, or $V = l \\times w \\times h$.', 'Volume is in cubic units, such as $\\text{cm}^3$ or $\\text{m}^3$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A right rectangular prism is a box shape. It is made of equal layers of cubes.', show: 'sum.0' },
        { say: 'Its volume is length times width times height: V equals l times w times h.', show: 'sum.1' },
        { say: 'And volume is in cubic units, such as cubic centimetres or cubic metres. In the next part, you will see another way to write the formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
