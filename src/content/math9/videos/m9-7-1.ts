import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { paper } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { room, scaled, shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

// An L shape on squared paper: 2 squares along the bottom, 3 squares up the left side, arms 1
// square thick. Its image with a scale factor of 2 is 4 along the bottom, 6 up, arms 2 thick.
const L: P[] = [
  [1, 1],
  [3, 1],
  [3, 2],
  [2, 2],
  [2, 4],
  [1, 4],
];
const L2 = scaled(L, 2, [5, 1]);

const grid = (id: string) =>
  figure(id, [
    paper({ x: [0, 10], y: [0, 8] }),
    shape({ name: 'o', pts: L, sides: [{ tone: 'adj', label: '2' }, undefined, undefined, undefined, { tone: 'hyp', label: '1' }, { tone: 'opp', label: '3' }] }),
    shape({ name: 'i', pts: L2, tone: 'good', sides: [{ tone: 'adj', label: '4' }, undefined, undefined, undefined, { tone: 'hyp', label: '2' }, { tone: 'opp', label: '6' }] }),
    tag('to', [2, -0.55], '\\text{Original}', { tone: 'muted' }),
    tag('ti', [7, -0.55], '\\text{Image}', { tone: 'muted' }),
  ]);

// Logo A: 4 cm along the bottom, 6 cm up the left, arms 2 cm thick. Logo B is A with a scale
// factor of 2.5: 10 cm, 15 cm, arms 5 cm thick.
const A: P[] = [
  [0, 0],
  [4, 0],
  [4, 2],
  [2, 2],
  [2, 6],
  [0, 6],
];
const B = scaled(A, 2.5, [7, 0]);
const logos = (id: string) =>
  figure(id, [
    shape({ name: 'a', pts: A, sides: [{ tone: 'adj', label: '4\\text{ cm}' }, undefined, undefined, undefined, undefined, { tone: 'opp', label: '6\\text{ cm}' }] }),
    shape({ name: 'b', pts: B, tone: 'good', sides: [{ tone: 'adj', label: '10\\text{ cm}' }, undefined, undefined, undefined, undefined, { tone: 'opp', label: '15\\text{ cm}' }] }),
    tag('na', [1, 4], '\\text{A}'),
    tag('nb', [9.5, 10], '\\text{B}'),
    room('l', [-1.6, 0]),
  ]);

const video: Explainer = {
  id: 'm9-7-1',
  lessonId: 'm9-7-1',
  title: 'Scale Diagrams and Enlargements, Part 1: The Scale Factor',
  thumbnailTitle: 'The Scale Factor',
  thumbnail: 'lg',
  summary:
    'A scale diagram is a drawing in which every length is multiplied by the same number, the scale factor k, so the shape stays the same and only the size changes. The scale factor is the image length divided by the matching original length. Logo B, 10 cm by 15 cm, is a scale diagram of logo A, 4 cm by 6 cm, with k = 10/4 = 2.5, checked with 15/6 = 2.5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 1', title: 'The Scale Factor', subtitle: 'Same shape, new size' }],
      lines: [
        { say: 'A phone zooms in on a photo. A print shop shrinks a poster down to a flyer. In both cases, the picture keeps its shape, but changes its size.', show: 'title' },
        { say: 'In this part, you will learn what a scale diagram is, and how to find the number that tells you how much bigger or smaller it is.' },
      ],
    },
    {
      chapter: 'Same shape, new size',
      layout: 'split',
      leftWidth: 600,
      left: [grid('g')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Scale diagram',
          md: 'A **scale diagram** is a drawing in which **every** length is multiplied by the **same** number. The shape stays the same; only the size changes.',
        },
      ],
      lines: [
        { say: 'Here is a small L shape on squared paper. Its bottom is two squares long, and its left side is three squares tall.', show: ['g.paper', ...shapeIds('g', 'o', { lens: true }), 'g.to'] },
        { say: 'And here is a bigger copy. Count its squares. The bottom is four squares long, and the left side is six squares tall.', show: [...shapeIds('g', 'i', { lens: true }), 'g.ti'] },
        { say: 'Matching sides have the same colour. The blue bottom went from two squares to four. The orange side went from three squares to six. Each one is twice as long.', focus: ['g.o-len0', 'g.i-len0', 'g.o-len5', 'g.i-len5'] },
        { say: 'Even the thin parts doubled. The top of the upright arm was one square wide, and now it is two squares wide.', focus: ['g.o-len4', 'g.i-len4'] },
        { say: 'So the copy has exactly the same shape, but a different size. Nothing was stretched in only one direction.', focus: 'g' },
        { say: 'A drawing like this is called a scale diagram. In a scale diagram, every length is multiplied by the same number. The shape stays the same. Only the size changes.', show: 'def' },
      ],
    },
    {
      chapter: 'The scale factor',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Scale factor',
          md: 'The **scale factor**, $k$, is the number every length is multiplied by. The **original** is the figure you start with, and the **image** is the new drawing.',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['k = \\dfrac{\\text{image length}}{\\text{original length}}', 'k = \\dfrac{4}{2} = 2 \\qquad k = \\dfrac{6}{3} = 2'] },
      ],
      lines: [
        { say: 'The number that every length is multiplied by is called the scale factor. We often call it k. A scale factor tells you how many times as big the new figure is.', show: 'def' },
        { say: 'The figure you start with is called the original. The new drawing is called the image.' },
        { say: 'To find the scale factor, divide a length on the image by the matching length on the original. The image goes on top, and the original goes on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'For the L shapes, four over two is two, and six over three is two. Every pair of matching sides gives the same answer. The scale factor is two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding a scale factor',
      layout: 'split',
      leftWidth: 600,
      left: [logos('lg')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Logo B is a scale diagram of logo A. Find the scale factor.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = \\dfrac{\\text{image}}{\\text{original}} = \\dfrac{10}{4} = 2.5', '\\text{Check: } \\dfrac{15}{6} = 2.5 \\;\\checkmark', 'k = 2.5'] },
      ],
      lines: [
        { say: 'Now a real problem. Logo B is a scale diagram of logo A. Find the scale factor that takes logo A to logo B.', show: [...shapeIds('lg', 'a', { lens: true }), ...shapeIds('lg', 'b', { lens: true }), 'lg.na', 'lg.nb', 'q'] },
        { say: 'Step one: pick a pair of matching sides. The bottom of logo A is four centimetres, and the bottom of logo B is ten centimetres.', focus: ['lg.a-len0', 'lg.b-len0'] },
        { say: 'Step two: divide the image length by the original length. Logo B is the image, so ten goes on top. Ten over four is two point five.', show: 'm.0', focus: 'm.0' },
        { say: 'Step three: check with another pair. The left side of logo A is six centimetres, and the left side of logo B is fifteen centimetres. Fifteen over six is also two point five.', show: 'm.1', focus: ['m.1', 'lg.a-len5', 'lg.b-len5'] },
        { say: 'Both pairs give the same answer, so logo B really is a scale diagram of logo A. The scale factor is two point five. Every length on B is two and a half times the matching length on A.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'One side of a triangle is $8$ cm long. In a scale diagram of the triangle, the matching side is $20$ cm long. What is the scale factor?',
          choices: ['$12$', '$2.5$', '$0.4$', '$160$'],
          answer: 1,
          working: '$k = \\dfrac{\\text{image}}{\\text{original}} = \\dfrac{20}{8} = 2.5$. The image is the scale diagram, so $20$ goes on top.',
        },
      ],
      lines: [
        { say: 'Your turn. One side of a triangle is eight centimetres long. In a scale diagram of the triangle, the matching side is twenty centimetres long. What is the scale factor? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two point five. Divide the image length by the original length: twenty over eight is two point five. Choice C, zero point four, divides the wrong way, with the original on top.', show: 'q.answer' },
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
          items: [
            'In a **scale diagram**, every length is multiplied by the same number. The shape stays the same.',
            'That number is the **scale factor**: $k = \\dfrac{\\text{image length}}{\\text{original length}}$.',
            'Check with a second pair of matching sides: every pair gives the same $k$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a scale diagram, every length is multiplied by the same number, so the shape stays the same, and only the size changes.', show: 'sum.0' },
        { say: 'That number is the scale factor. To find it, divide a length on the image by the matching length on the original.', show: 'sum.1' },
        { say: 'And check with a second pair of matching sides. In a scale diagram, every pair gives the same scale factor. In the next part, you will see what happens when the scale factor is less than one. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
