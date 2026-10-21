import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileSquare } from './lib/m8-1-figures.ts';

// A square with sides of 6 units holds 6 rows of 6 unit squares: an area of 36.
const six = figure('t', [tileSquare({ cols: 6, labels: { left: 's = 6', bottom: 's = 6', caption: 'A = 6 \\times 6 = 36' } })], 470);

// A 15 cm floor tile, covered by 225 squares of 1 cm².
const tile = figure('ft', [tileSquare({ cols: 15, size: 0.4, tone: 'theta', labels: { left: '15 \\text{ cm}', bottom: '15 \\text{ cm}' } })], 450);

// A square garden of 144 m²: 12 m on each side.
const garden = figure('g', [tileSquare({ cols: 12, size: 0.5, tone: 'good', labels: { left: '12 \\text{ m}', bottom: '12 \\text{ m}', caption: 'A = 144 \\text{ m}^2' } })], 470);

const video: Explainer = {
  id: 'm8-1-1-c',
  lessonId: 'm8-1-1',
  title: 'Perfect Squares and Square Roots, Part 3: Area and Side Length',
  thumbnailTitle: 'Area and Side Length',
  thumbnail: 'g',
  summary:
    'The area of a square is side times side, A = s², so a square floor tile with sides of 15 cm has an area of 15 × 15 = 225 cm². Going the other way, the side is the square root of the area, s = √A: a square garden of 144 m² has sides of √144 = 12 m, and 4 × 12 = 48 m of fencing goes around it. Area is in square units; a side length is in plain units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 3', title: 'Area and Side Length', subtitle: 'Squares and square roots at work' }],
      lines: [
        { say: 'Floor tiles, rugs, gardens and game boards are often square. If you know the side of a square, you can find its area. If you know its area, you can find its side.', show: 'title' },
        { say: 'In this part, you will use squaring and square roots to go back and forth between them.' },
      ],
    },
    {
      chapter: 'Area of a square',
      layout: 'split',
      leftWidth: 480,
      left: [six],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area and side of a square', md: 'The **area** is the side squared. The **side** is the square root of the area.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['A = s \\times s = s^2', 's = \\sqrt{A}'] },
      ],
      lines: [
        { say: 'The area of a shape is how many unit squares cover it. A square with sides of six units holds six rows of six unit squares.', show: ['t.tiles', 't.left', 't.bottom'] },
        { say: 'Six times six is thirty-six, so its area is thirty-six square units.', show: 't.caption', focus: 't.caption' },
        { say: 'If the side length is s, the area is s times s, which is s squared. We write the area as capital A.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'And going the other way: if you know the area, the side length is the square root of the area.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From side to area',
      layout: 'split',
      leftWidth: 480,
      left: [tile],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A square floor tile has sides of $15\\ \\text{cm}$. What is its area?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['A = s^2 = 15^2', '= 15 \\times 15', '= 150 + 75 = 225'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The area is $225\\ \\text{cm}^2$.' },
      ],
      lines: [
        { say: 'A square floor tile has sides of fifteen centimetres. What is its area?', show: ['q', 'ft.tiles', 'ft.left', 'ft.bottom'] },
        { say: 'Square the side: fifteen squared, which means fifteen times fifteen.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'One way to work it out: ten times fifteen is one hundred fifty, and five times fifteen is seventy-five. Together, that is two hundred twenty-five.', show: 'm.2', focus: 'm.2' },
        { say: 'The area is two hundred twenty-five square centimetres. Picture the tile covered by two hundred twenty-five little squares, each one centimetre on a side.', show: 'a' },
      ],
    },
    {
      chapter: 'From area to side',
      layout: 'split',
      leftWidth: 480,
      left: [garden],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Mei plants a square vegetable garden with an area of $144\\ \\text{m}^2$. How long is each side? How much fencing goes around it?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['s = \\sqrt{144} = 12', 'P = 4 \\times 12 = 48'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Each side is $12\\ \\text{m}$ long. Mei needs $48\\ \\text{m}$ of fencing.' },
      ],
      lines: [
        { say: 'Mei plants a square vegetable garden with an area of one hundred forty-four square metres. How long is each side? And how much fencing goes all the way around it?', show: ['q', 'g.tiles', 'g.caption'] },
        { say: 'To find the side, take the square root of the area. Twelve times twelve is one hundred forty-four, so the square root is twelve. Each side is twelve metres long.', show: ['m.0', 'g.left', 'g.bottom'], focus: 'm.0' },
        { say: 'The fence goes along all four sides. The distance around a shape is called its perimeter. Four times twelve is forty-eight.', show: 'm.1', focus: 'm.1' },
        { say: 'So Mei needs forty-eight metres of fencing.', show: 'a' },
      ],
    },
    {
      chapter: 'Check your units',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your units', md: 'Area is in **square units**, like $\\text{cm}^2$ or $\\text{m}^2$. A side length is in **plain units**, like $\\text{cm}$ or $\\text{m}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['15 \\text{ cm} \\xrightarrow{\\text{ square }} 225 \\text{ cm}^2', '144 \\text{ m}^2 \\xrightarrow{\\text{ square root }} 12 \\text{ m}'] },
      ],
      lines: [
        { say: 'Watch the units. Area is measured in square units, like square centimetres or square metres. The small two on the unit tells you it is a square unit.', show: 'tip' },
        { say: 'A side length is in plain units, like centimetres or metres. When you square a side, the answer is in square units.', show: 'm.0', focus: 'm.0' },
        { say: 'When you take the square root of an area, you are back to plain units.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square play area has an area of $81\\ \\text{m}^2$. How much fencing goes all the way around it?',
          choices: ['$36\\ \\text{m}$', '$9\\ \\text{m}$', '$324\\ \\text{m}$', '$40.5\\ \\text{m}$'],
          answer: 0,
          working: 'Each side is $\\sqrt{81} = 9\\ \\text{m}$, because $9 \\times 9 = 81$. The fence goes along four sides: $4 \\times 9 = 36\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A square play area has an area of eighty-one square metres. How much fencing goes all the way around it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, thirty-six metres. Each side is the square root of eighty-one, which is nine metres, and four sides make thirty-six metres. Choice B, nine metres, is only one side. The fence goes along all four sides.', show: 'q.answer' },
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
            'Area of a square: $A = s^2$. A $15\\ \\text{cm}$ tile has an area of $225\\ \\text{cm}^2$.',
            'Side of a square: $s = \\sqrt{A}$. A $144\\ \\text{m}^2$ garden has sides of $12\\ \\text{m}$.',
            'Area is in square units; a side length is in plain units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the area of a square, square its side.', show: 'sum.0' },
        { say: 'To find the side of a square, take the square root of its area.', show: 'sum.1' },
        { say: 'And check your units: area is in square units, and a side is in plain units. In the next part, you will use prime factors to spot big perfect squares. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
