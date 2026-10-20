import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cubes, layerGrid } from './lib/m6-10-figures.ts';

// The lesson's prism of centimetre cubes: 4 cubes long, 2 deep and 3 high, so 8 cubes in a layer.
const prism = (id: string, group?: 'layer') => figure(id, [cubes({ heights: [[3, 3, 3, 3], [3, 3, 3, 3]], group, labels: { l: '4', w: '2', h: '3' } })]);

const video: Explainer = {
  id: 'm6-10-1-c',
  lessonId: 'm6-10-1',
  title: 'Volume and Cubic Units, Part 3: Layers, Rows and Columns',
  thumbnailTitle: 'Layers, Rows and Columns',
  thumbnail: 'pr',
  summary: 'A rectangular prism built from cubes is made of equal layers, and each layer has rows and columns of cubes. A prism with 2 rows of 4 cubes in each layer and 3 layers has a volume of 8 × 3 = 24 cm³. Volume = (cubes in one layer) × (number of layers), with no need to count every cube.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 3', title: 'Layers, Rows and Columns', subtitle: 'No need to count every cube' }],
      lines: [
        { say: 'Counting cubes one at a time is slow. And in a big model, many cubes are hidden at the back or in the middle.', show: 'title' },
        { say: 'In this video, you will learn a faster way to find the volume: count one layer, then count the layers.' },
      ],
    },
    {
      chapter: 'A prism of cubes',
      layout: 'split',
      leftWidth: 520,
      left: [prism('pr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rectangular prism', md: 'A **rectangular prism** is a box shape. Each of its six faces is a rectangle.' },
        { kind: 'text', id: 'q', size: 'md', md: 'Each cube is $1\\text{ cm}^3$, and there are no hidden gaps. Find the volume.' },
      ],
      lines: [
        { say: 'This shape is a rectangular prism. A rectangular prism is a box shape, and each of its six faces is a rectangle.', show: ['pr.cubes', 'def'] },
        { say: 'It is built from centimetre cubes. Each cube is one cubic centimetre, and there are no gaps hidden inside.', show: 'q' },
        { say: 'The prism is four cubes long, two cubes deep, and three cubes high.', show: ['pr.l', 'pr.w', 'pr.h'], focus: ['pr.l', 'pr.w', 'pr.h'] },
        { say: 'We cannot see every cube, so we cannot count them one by one. Instead, we look at the layers.', focus: 'pr' },
      ],
    },
    {
      chapter: 'One layer',
      layout: 'split',
      leftWidth: 520,
      left: [figure('lg', [layerGrid({ cols: 4, rows: 2, numbers: true, labels: { across: '4', deep: '2' } })], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\text{ rows of } 4', '2 \\times 4 = 8', '8 \\text{ cubes in each layer}'] }],
      lines: [
        { say: 'Look down at the top layer from above. You see a grid of cube tops.', show: 'lg.grid' },
        { say: 'It has two rows, with four cubes in each row.', show: ['lg.across', 'lg.deep', 'm.0'], focus: ['lg.across', 'lg.deep'] },
        { say: 'Two rows of four is two times four, which is eight. Count them to check: one, two, three, four, five, six, seven, eight.', show: ['lg.nums', 'm.1'], focus: 'm.1' },
        { say: 'Every layer of the prism is the same, so every layer has eight cubes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Stack the layers',
      layout: 'split',
      leftWidth: 520,
      left: [prism('st', 'layer')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 \\text{ in each layer}', '3 \\text{ layers}', '8 \\times 3 = 24', '\\text{Volume} = 24\\text{ cm}^3'] }],
      lines: [
        { say: 'Now build the prism layer by layer. Here is the bottom layer: eight cubes.', show: ['st.layer0', 'st.top0', 'm.0'] },
        { say: 'Put a second layer on top. That is eight more cubes.', show: ['st.layer1', 'st.top1'], hide: 'st.top0' },
        { say: 'And a third layer. The prism is three cubes high, so it has three layers.', show: ['st.layer2', 'st.top2', 'st.h', 'm.1'], hide: 'st.top1', focus: 'st.h' },
        { say: 'Three layers of eight cubes is eight times three, which is twenty-four.', show: 'm.2', focus: 'm.2' },
        { say: 'So the volume of the prism is twenty-four cubic centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The quick way',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'No need to count every cube', md: 'Volume $=$ (cubes in one layer) $\\times$ (number of layers)' },
        { kind: 'bullets', id: 'b', items: ['Cubes in one layer $=$ rows $\\times$ cubes in each row.', 'Number of layers $=$ how many cubes high.'] },
      ],
      lines: [
        { say: 'Here is the quick way. Volume equals the number of cubes in one layer, times the number of layers.', show: 'tip' },
        { say: 'To find the cubes in one layer, multiply the number of rows by the number of cubes in each row.', show: 'b.0' },
        { say: 'The number of layers is how many cubes high the prism is. This is much faster than counting cubes one at a time!', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A prism of centimetre cubes has $3$ rows of $5$ cubes in each layer. It is $2$ layers high. What is its volume?',
          choices: ['$10\\text{ cm}^3$', '$15\\text{ cm}^3$', '$30\\text{ cm}^2$', '$30\\text{ cm}^3$'],
          answer: 3,
          working: 'One layer: $3 \\times 5 = 15$ cubes. Two layers: $15 \\times 2 = 30$, so $30\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A prism of centimetre cubes has three rows of five cubes in each layer. It is two layers high. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirty cubic centimetres. One layer has three times five, which is fifteen cubes, and two layers make thirty. Choice B counts only one layer.', show: 'q.answer' },
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
          items: ['A rectangular prism of cubes is made of equal layers.', 'Each layer has rows and columns: rows $\\times$ cubes in each row.', 'Volume $=$ (cubes in one layer) $\\times$ (number of layers).'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rectangular prism built from cubes is made of equal layers.', show: 'sum.0' },
        { say: 'Each layer has rows and columns. Multiply the rows by the cubes in each row to count one layer.', show: 'sum.1' },
        { say: 'Then volume equals the cubes in one layer, times the number of layers. In the next part, you will rebuild a prism into a new shape. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
