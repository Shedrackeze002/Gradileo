import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cubes } from './lib/m6-10-figures.ts';

const video: Explainer = {
  id: 'm6-10-1',
  lessonId: 'm6-10-1',
  title: 'Volume and Cubic Units, Part 1: What Is Volume?',
  thumbnailTitle: 'What Is Volume?',
  thumbnail: 'lm',
  summary: 'Volume is the amount of space a three-dimensional object takes up. We measure it with units that are all the same size, such as sugar cubes or linking cubes (non-standard units), fitted together with no gaps or overlaps. A model of linking cubes in stacks of 2, 3, 1 and 2 has a volume of 8 cubes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 1', title: 'What Is Volume?', subtitle: 'How much space does it take up?' }],
      lines: [
        { say: 'How much space does a box of crayons take up? How much sand would fill a sandbox? These questions are about volume.', show: 'title' },
        { say: 'In this video, you will learn what volume is, and how to measure it by counting cubes.' },
      ],
    },
    {
      chapter: 'What is volume?',
      layout: 'split',
      leftWidth: 480,
      left: [figure('bx', [cubes({ heights: [[2, 2, 2], [2, 2, 2]], tone: 'good' })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Volume', md: '**Volume** is the amount of space that a three-dimensional object takes up.' },
        { kind: 'text', id: 't', size: 'md', md: '**Three-dimensional** means it has a length, a width and a height.' },
      ],
      lines: [
        { say: 'Volume is the amount of space that an object takes up.', show: 'def' },
        { say: 'Volume is about three-dimensional objects. Three-dimensional means the object has a length, a width and a height. A box, a ball and a building are all three-dimensional. They are not flat.', show: ['bx', 't'] },
        { say: 'Remember area? Area measures a flat surface, by counting squares. Volume measures space, by counting cubes.', focus: 'bx' },
      ],
    },
    {
      chapter: 'Measuring with cubes',
      layout: 'split',
      leftWidth: 480,
      left: [figure('lb', [cubes({ heights: [[2, 2, 2], [2, 2, 2]], group: 'layer', tone: 'good' })])],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Use units that are all the **same size**, like cubes.', 'Fit them together with **no gaps** and **no overlaps**.', 'Sugar cubes, linking cubes and blocks are **non-standard units**.'],
        },
      ],
      lines: [
        { say: 'To measure volume, we fill the object, or build it, with units that are all the same size, like cubes.', show: ['b.0', 'lb.layer0', 'lb.top0'] },
        { say: 'The cubes fit together with no gaps between them, and no overlaps, where one cube sits inside another. Just like the squares we used for area.', show: ['b.1', 'lb.layer1', 'lb.top1'], hide: 'lb.top0' },
        { say: 'The units can be sugar cubes, linking cubes, or wooden blocks. These are called non-standard units, because their size can be different from one set to another.', show: 'b.2' },
        { say: 'This model is made of twelve cubes, so its volume is twelve cubes.', focus: 'lb' },
      ],
    },
    {
      chapter: 'Counting cubes',
      layout: 'split',
      leftWidth: 520,
      left: [figure('lm', [cubes({ heights: [[2, 3, 1, 2]], group: 'stack', counts: true, tone: 'opp' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 + 3 + 1 + 2 = 8', '\\text{Volume} = 8\\text{ cubes}'] }],
      lines: [
        { say: 'Liam built this model with linking cubes. Every cube can be seen. What is its volume, in cubes?', show: ['lm.s0', 'lm.s1', 'lm.s2', 'lm.s3'] },
        { say: 'Count each stack. The first stack has two cubes, and the second stack has three.', show: ['lm.n0', 'lm.n1'], focus: ['lm.s0', 'lm.s1'] },
        { say: 'The third stack has one cube, and the last stack has two.', show: ['lm.n2', 'lm.n3'], focus: ['lm.s2', 'lm.s3'] },
        { say: 'Add them up: two plus three plus one plus two is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'So the volume of Liam’s model is eight cubes.', show: 'm.1', focus: ['m.1', 'lm'] },
      ],
    },
    {
      chapter: 'Same cubes, same volume',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Counting cubes', md: 'The **volume** of a model is the number of cubes in it. Every cube counts once, even a cube you cannot see.' },
      ],
      lines: [
        { say: 'The volume of a model is the number of cubes in it. Each cube counts once.', show: 'key' },
        { say: 'In Liam’s model, every cube could be seen. In bigger models, some cubes are hidden behind or under others. They still count!' },
        { say: 'Later in this lesson, you will learn a quick way to count all the cubes, even the hidden ones.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model is four stacks of linking cubes in a row. The stacks have $3$, $2$, $4$ and $1$ cubes, and every cube can be seen. What is the volume of the model?',
          choices: ['$4$ cubes', '$24$ cubes', '$10$ cubes', '$9$ cubes'],
          answer: 2,
          working: 'Add the stacks: $3 + 2 + 4 + 1 = 10$ cubes.',
        },
      ],
      lines: [
        { say: 'Your turn. A model is four stacks of linking cubes in a row. The stacks have three, two, four and one cubes, and every cube can be seen. What is the volume of the model? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ten cubes. Three plus two plus four plus one is ten. Choice A counts the stacks, not the cubes.', show: 'q.answer' },
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
          items: ['Volume is the amount of space an object takes up.', 'Measure it with units of the same size, like cubes, with no gaps or overlaps.', 'Count the cubes to find the volume.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Volume is the amount of space that an object takes up.', show: 'sum.0' },
        { say: 'We measure it with units that are all the same size, like cubes, fitted together with no gaps and no overlaps.', show: 'sum.1' },
        { say: 'And to find the volume of a model, count its cubes. In the next part, you will meet units of volume that everyone can share. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
