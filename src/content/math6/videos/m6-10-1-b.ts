import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cubes } from './lib/m6-10-figures.ts';

const video: Explainer = {
  id: 'm6-10-1-b',
  lessonId: 'm6-10-1',
  title: 'Volume and Cubic Units, Part 2: Cubic Centimetres and Cubic Metres',
  thumbnailTitle: 'Cubic Centimetres and Metres',
  thumbnail: 'cm',
  summary: 'Standard units of volume: a cubic centimetre (1 cm³) is a cube 1 cm on each side, like the small cube in a set of base-ten blocks; a cubic metre (1 m³) is a cube 1 m on each side, big enough for a few students to sit in. Use cm³ for small objects and m³ for large spaces, and do not mix up cm² (area) with cm³ (volume).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 2', title: 'Cubic Centimetres and Cubic Metres', subtitle: 'Units that everyone can share' }],
      lines: [
        { say: 'If one person measures a box with sugar cubes, and another person uses wooden blocks, they get different numbers for the same box. How can everyone agree?', show: 'title' },
        { say: 'In this video, you will meet two standard units of volume: the cubic centimetre and the cubic metre.' },
      ],
    },
    {
      chapter: 'The cubic centimetre',
      layout: 'split',
      leftWidth: 460,
      left: [figure('cm', [cubes({ heights: [[1]], labels: { l: '1\\text{ cm}', w: '1\\text{ cm}', h: '1\\text{ cm}' } })], 420)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cubic centimetre', md: 'A **cubic centimetre** ($1\\text{ cm}^3$) is the volume of a cube that is $1\\text{ cm}$ long, $1\\text{ cm}$ wide and $1\\text{ cm}$ high.' },
        { kind: 'text', id: 't', size: 'md', md: 'The small cube in a set of **base-ten blocks** is $1\\text{ cm}^3$.' },
      ],
      lines: [
        { say: 'Standard units are units that everyone agrees on, so everyone who measures the same box gets the same answer.', show: 'cm' },
        { say: 'A cubic centimetre is the volume of a cube that is one centimetre long, one centimetre wide and one centimetre high.', show: 'def' },
        { say: 'It is the size of the small cube in a set of base-ten blocks. A sugar cube is a little bigger.', show: 't' },
        { say: 'We write it as c m with a small three up high. The three tells you that a cube has three dimensions: length, width and height.', focus: ['cm.l', 'cm.w', 'cm.h'] },
      ],
    },
    {
      chapter: 'The cubic metre',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure(
          'm',
          [
            cubes({ heights: [[1]], tone: 'good', labels: { l: '1\\text{ m}', w: '1\\text{ m}', h: '1\\text{ m}' } }),
            { points: { 'kid-at': [2.4, 0], 'kid-top': [2.4, 1.3] }, items: [{ kind: 'thing', id: 'kid', type: 'person', at: 'kid-at', top: 'kid-top' }] },
          ],
          420,
        ),
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Cubic metre', md: 'A **cubic metre** ($1\\text{ m}^3$) is the volume of a cube that is $1\\text{ m}$ long, $1\\text{ m}$ wide and $1\\text{ m}$ high.' }],
      lines: [
        { say: 'A cubic metre is the volume of a cube that is one metre long, one metre wide and one metre high.', show: ['m.cubes', 'm.l', 'm.w', 'm.h', 'def'] },
        { say: 'That is big! Here it is next to a student. A few students could sit inside it together.', show: 'm.kid' },
        { say: 'You could build its edges with twelve metre sticks. We write a cubic metre as the letter m, with a small three up high.', focus: ['m.l', 'm.w', 'm.h'] },
      ],
    },
    {
      chapter: 'Choosing a unit',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Unit', 'Good for', 'Examples'],
          rows: [
            ['$\\text{cm}^3$', 'small objects', 'a juice box, a pencil case'],
            ['$\\text{m}^3$', 'large spaces', 'a classroom, a shipping container'],
          ],
        },
        { kind: 'text', id: 'q', size: 'md', md: 'A **classroom** is a very large space. It would take **millions** of centimetre cubes to fill it, so use $\\text{m}^3$.' },
      ],
      lines: [
        { say: 'Use cubic centimetres for small objects, like a juice box or a pencil case.', show: 't.0', focus: 't.0' },
        { say: 'Use cubic metres for large spaces, like a classroom or a shipping container.', show: 't.1', focus: 't.1' },
        { say: 'Which unit is best for the volume of a classroom? A classroom is a very large space. It would take millions of centimetre cubes to fill it!', show: 'q' },
        { say: 'So cubic metres are the best unit for a classroom.', focus: 'q' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square units are for area', md: '$\\text{cm}^2$ (square centimetres) measures **area**, a flat surface. $\\text{cm}^3$ (cubic centimetres) measures **volume**, a space.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{cm} \\;\\to\\; \\text{a length}', '\\text{cm}^2 \\;\\to\\; \\text{an area}', '\\text{cm}^3 \\;\\to\\; \\text{a volume}'] },
      ],
      lines: [
        { say: 'Be careful with the little number up high. Centimetres measure a length, like the edge of a cube.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Square centimetres, with a small two, measure an area: a flat surface, like one face of a cube.', show: 'm.1', focus: 'm.1' },
        { say: 'Cubic centimetres, with a small three, measure a volume: the space a whole cube takes up. The three is for the three dimensions: length, width and height.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which unit is best for the volume of a juice box?',
          choices: ['$\\text{cm}^3$', '$\\text{m}^3$', '$\\text{cm}^2$', '$\\text{cm}$'],
          answer: 0,
          working: 'A juice box is a small object, so cubic centimetres fit best.',
        },
      ],
      lines: [
        { say: 'Your turn. Which unit is best for the volume of a juice box? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, cubic centimetres. A juice box is a small object. Choice B, cubic metres, is far too big for it, and choice C measures an area, not a volume.', show: 'q.answer' },
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
          items: ['$1\\text{ cm}^3$ is a cube $1\\text{ cm}$ on each side; $1\\text{ m}^3$ is a cube $1\\text{ m}$ on each side.', 'Use $\\text{cm}^3$ for small objects and $\\text{m}^3$ for large spaces.', 'Volume uses cubic units, with a small $3$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A cubic centimetre is a cube one centimetre on each side, and a cubic metre is a cube one metre on each side.', show: 'sum.0' },
        { say: 'Use cubic centimetres for small objects, and cubic metres for large spaces.', show: 'sum.1' },
        { say: 'And volume always uses cubic units, with a small three up high. In the next part, you will find volume quickly, using layers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
