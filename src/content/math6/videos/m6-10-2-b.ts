import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';
import { cubes } from './lib/m6-10-figures.ts';
import { note } from './lib/m6-9-figures.ts';

const video: Explainer = {
  id: 'm6-10-2-b',
  lessonId: 'm6-10-2',
  title: 'Volume of Rectangular Prisms, Part 2: Base Area Times Height',
  thumbnailTitle: 'Base Area Times Height',
  thumbnail: 'jb',
  summary: 'A prism is its base stacked up, layer after layer, so V = area of the base × height. A storage shed with a floor of 20 m² and a height of 3 m holds three layers of 20 m³, so 60 m³; a juice box with a base of 24 cm² and a height of 10 cm has a volume of 240 cm³. The length × width in V = l × w × h is the area of the base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 2', title: 'Base Area Times Height', subtitle: 'The base, stacked up layer after layer' }],
      lines: [
        { say: 'Stack sheets of paper into a pile, and the pile has the shape of one sheet, just taller. A prism is like that: its base, stacked up layer after layer.', show: 'title' },
        { say: 'In this video, you will use that idea to find a volume from the area of the base and the height.' },
      ],
    },
    {
      chapter: 'A storage shed',
      layout: 'split',
      leftWidth: 540,
      left: [figure('sh', [cubes({ heights: [[3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3]], group: 'layer', tone: 'good', labels: { h: '3\\text{ m}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{floor: } 20\\text{ m}^2', '\\text{each layer: } 20\\text{ m}^3', '3 \\text{ layers: } 20 \\times 3 = 60', 'V = 60\\text{ m}^3'] }],
      lines: [
        { say: 'A storage shed has a floor, or base, with an area of twenty square metres. The shed is three metres high. Find its volume.', show: 'm.0' },
        { say: 'Imagine filling the shed with metre cubes, in layers one metre thick. The first layer covers the whole floor. It holds twenty cubes, so it is twenty cubic metres.', show: ['sh.layer0', 'sh.top0', 'm.1'], focus: 'm.1' },
        { say: 'The shed is three metres high, so it holds three layers.', show: ['sh.layer1', 'sh.layer2', 'sh.top2', 'sh.h'], hide: 'sh.top0', focus: 'sh.h' },
        { say: 'Twenty times three is sixty. So the volume of the shed is sixty cubic metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Volume of a prism', md: 'A prism is its base stacked up, layer after layer. So: $\\text{Volume} = \\text{area of the base} \\times \\text{height}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V = (\\adj{l} \\times \\adj{w}) \\times \\opp{h}', 'V = \\adj{\\text{area of the base}} \\times \\opp{\\text{height}}'] },
      ],
      lines: [
        { say: 'The area of the base tells you how many cubes fit in one layer. The height tells you how many layers there are.', show: 'key' },
        { say: 'In the formula V equals l times w times h, the length times the width is the area of the base.', show: 'm.0', focus: 'm.0' },
        { say: 'So we can also write: volume equals the area of the base, times the height. This is handy when you already know the area of the base.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A juice box',
      layout: 'split',
      leftWidth: 460,
      left: [figure('jb', [box({ l: 2.4, w: 1.6, h: 4, labels: { h: '10\\text{ cm}' } }), note('base', [1.6, -0.55], '\\text{base} = 24\\text{ cm}^2', 'below', 'adj')])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\text{area of the base} \\times h', '\\phantom{V} = 24 \\times 10', '\\phantom{V} = 240', 'V = 240\\text{ cm}^3'] }],
      lines: [
        { say: 'A juice box has a base with an area of twenty-four square centimetres. It is ten centimetres tall. What is its volume?', show: ['jb.shape', 'jb.front-face', 'jb.top-face', 'jb.side-face', 'jb.base', 'jb.h'] },
        { say: 'You do not know the length or the width, but you do not need them. You know the area of the base.', focus: 'jb.base' },
        { say: 'Volume equals the area of the base times the height: twenty-four times ten, which is two hundred and forty.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
        { say: 'So the juice box has a volume of two hundred and forty cubic centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box has a base with an area of $35\\text{ cm}^2$. It is $4\\text{ cm}$ high. What is its volume?',
          choices: ['$39\\text{ cm}^3$', '$140\\text{ cm}^2$', '$70\\text{ cm}^3$', '$140\\text{ cm}^3$'],
          answer: 3,
          working: '$V = \\text{area of the base} \\times h = 35 \\times 4 = 140$, so $140\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box has a base with an area of thirty-five square centimetres. It is four centimetres high. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred and forty cubic centimetres. The area of the base times the height is thirty-five times four, which is one hundred and forty. Choice B has the right number, but square units measure area, not volume.', show: 'q.answer' },
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
          items: ['A prism is its base stacked up, layer after layer.', 'Volume $=$ area of the base $\\times$ height.', 'Length $\\times$ width is the area of the base, so both formulas agree.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A prism is its base, stacked up layer after layer.', show: 'sum.0' },
        { say: 'So its volume is the area of the base, times the height.', show: 'sum.1' },
        { say: 'For a rectangular prism, the length times the width is the area of the base, so both formulas give the same answer. In the next part, you will work backwards to find a missing length. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
