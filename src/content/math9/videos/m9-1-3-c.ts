import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { trophy } from './lib/m9-1-figures.ts';

const DIMS = { l: '12\\text{ cm}', w: '10\\text{ cm}', h: '4\\text{ cm}', r: '3\\text{ cm}', ch: '15\\text{ cm}' };
// The trophy: a cylinder of radius 3 cm and height 15 cm on a 12 cm by 10 cm by 4 cm block, joined,
// and with the cylinder lifted off to show the two circles that touch.
const joined = figure('d', [trophy({ block: [12, 10, 4], r: 3, h: 15, labels: DIMS })], 540);
const lifted = figure('d', [trophy({ block: [12, 10, 4], r: 3, h: 15, lift: 5, labels: { r: '3\\text{ cm}' } })], 540);

const video: Explainer = {
  id: 'm9-1-3-c',
  lessonId: 'm9-1-3',
  title: 'Surface Area of Composite Objects, Part 3: A Cylinder on a Prism',
  thumbnailTitle: 'A Cylinder on a Prism',
  thumbnail: 'd',
  summary:
    'A trophy is a cylinder (radius 3 cm, height 15 cm) on a 12 cm by 10 cm by 4 cm block. The block has SA = 416 cm² and the cylinder 2π(3)² + 2π(3)(15) ≈ 339.29 cm². The overlap is a circle, π(3)² ≈ 28.27 cm², subtracted twice: SA ≈ 416 + 339.29 − 56.55 ≈ 698.7 cm². A shortcut checks it: the cylinder’s top matches the circle it covers, so SA = 416 + 2π(3)(15) ≈ 698.7 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 3', title: 'A Cylinder on a Prism', subtitle: 'The overlap is a circle' }],
      lines: [
        { say: 'A trophy is made of a cylinder standing on a rectangular block. To plate it with gold paint, you need its surface area.', show: 'title' },
        { say: 'In this part, you will use the same idea as before with a cylinder and a prism. This time, the overlap is a circle.' },
      ],
    },
    {
      chapter: 'Where the parts touch',
      layout: 'split',
      leftWidth: 480,
      left: [lifted],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{overlap} = \\pi r^2', '\\phantom{\\text{overlap}} = \\pi(3)^2', '\\phantom{\\text{overlap}} \\approx 28.27\\text{ cm}^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtract it twice', md: 'Add the surface areas of the block and the cylinder, then subtract the overlap area **twice**.' },
      ],
      lines: [
        { say: 'The trophy is a cylinder with a radius of three centimetres, standing on the middle of a block. Imagine lifting the cylinder off.', show: ['d.block', 'd.cyl', 'd.r'] },
        { say: 'Two surfaces were hidden where they touched. One is the circle on top of the block, where the cylinder stood.', show: 'd.overlap', focus: 'd.overlap' },
        { say: 'The other is the bottom circle of the cylinder. It faces down, so it is drawn with a dashed outline.', show: 'd.under', focus: 'd.under' },
        { say: 'The overlap is a circle, with an area of pi times r squared. Pi times three squared is about twenty-eight point two seven square centimetres.', show: 'm', focus: 'm' },
        { say: 'As before, find the surface area of each part, add them, and subtract the overlap twice.', show: 'key' },
      ],
    },
    {
      chapter: 'The block',
      layout: 'split',
      leftWidth: 480,
      left: [joined],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Block: $12\\text{ cm}$ by $10\\text{ cm}$ by $4\\text{ cm}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2(12 \\times 10 + 12 \\times 4 + 10 \\times 4)', '= 2(120 + 48 + 40)', '= 416\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Here is the whole trophy. The block is twelve centimetres long, ten centimetres wide and four centimetres high.', show: ['d.block', 'd.cyl', 'd.b-l', 'd.b-w', 'd.b-h', 'q'], focus: 'd.block' },
        { say: 'Its surface area is two times the sum of twelve times ten, twelve times four, and ten times four.', show: 'm.0', focus: 'm.0' },
        { say: 'That is two times the sum of one hundred twenty, forty-eight and forty, which is two times two hundred eight: four hundred sixteen square centimetres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The cylinder',
      layout: 'split',
      leftWidth: 480,
      left: [joined],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Cylinder: $r = 3\\text{ cm}$, $h = 15\\text{ cm}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2\\pi r^2 + 2\\pi rh', '= 2\\pi(3)^2 + 2\\pi(3)(15)', '\\approx 56.55 + 282.74', '\\approx 339.29\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'The cylinder has a radius of three centimetres and a height of fifteen centimetres.', show: ['d.block', 'd.cyl', 'd.r', 'd.ch', 'q'], focus: 'd.cyl' },
        { say: 'A cylinder has two circles, each with an area of pi r squared, and a curved side. Unrolled, the curved side is a rectangle with an area of two pi r h.', show: 'm.0', focus: 'm.0' },
        { say: 'So it is two pi times three squared, plus two pi times three times fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The two circles make about fifty-six point five five, and the curved side about two hundred eighty-two point seven four. Together, about three hundred thirty-nine point two nine square centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Put it together',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{overlap: } \\pi(3)^2 \\approx 28.27, \\quad 2 \\times 28.27 \\approx 56.55', 'SA \\approx 416 + 339.29 - 56.55', 'SA \\approx 698.74', 'SA \\approx 698.7\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'The overlap is one circle, about twenty-eight point two seven square centimetres. Subtracted twice, that is about fifty-six point five five.', show: 'm.0', focus: 'm.0' },
        { say: 'So the surface area is about four hundred sixteen, plus three hundred thirty-nine point two nine, take away fifty-six point five five.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about six hundred ninety-eight point seven four. To the nearest tenth, the surface area is about six hundred ninety-eight point seven square centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'split',
      leftWidth: 480,
      left: [joined],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A shortcut', md: 'The top of the cylinder has the same area as the circle it covers on the block. So add the block and only the **curved side** of the cylinder.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['416 + 2\\pi(3)(15)', '\\approx 416 + 282.74', '\\approx 698.7\\text{ cm}^2 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is a shortcut you can use to check. The top of the cylinder is a circle with the same size as the circle it covers on the block.', show: ['d.block', 'd.cyl', 'd.r', 'tip'], focus: 'd.lid' },
        { say: 'So you can think of the cylinder’s top as moving down to fill the hidden circle on the block. Then the surface area is the whole block, plus only the curved side of the cylinder.', show: 'm.0', focus: ['m.0', 'd.lateral'] },
        { say: 'Four hundred sixteen plus two hundred eighty-two point seven four is about six hundred ninety-eight point seven. The same answer.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cylinder with a radius of $2$ cm and a height of $10$ cm stands on a cube with edges of $6$ cm. What is the surface area of the whole object, including the bottom, to the nearest tenth?',
          choices: ['$366.8\\text{ cm}^2$', '$354.2\\text{ cm}^2$', '$278.8\\text{ cm}^2$', '$341.7\\text{ cm}^2$'],
          answer: 3,
          working: 'Cube: $6 \\times 6^2 = 216$. Curved side of the cylinder: $2\\pi(2)(10) \\approx 125.66$. The cylinder’s top replaces the circle it covers, so $SA \\approx 216 + 125.66 \\approx 341.7\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder with a radius of two centimetres and a height of ten centimetres stands on a cube with edges of six centimetres. What is the surface area of the whole object, including the bottom, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, three hundred forty-one point seven square centimetres. The cube has two hundred sixteen, and the curved side of the cylinder about one hundred twenty-five point six six. Choice B subtracts the circle only once, so it still counts the hidden circle on top of the cube.', show: 'q.answer' },
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
            'For a cylinder on a prism, the overlap is a circle with area $\\pi r^2$.',
            'Add the surface areas of the parts and subtract the overlap twice.',
            'Shortcut: the prism plus only the curved side of the cylinder, $2\\pi rh$.',
            'The trophy: $SA \\approx 416 + 339.29 - 56.55 \\approx 698.7\\text{ cm}^2$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a cylinder standing on a prism, the overlap is a circle, with an area of pi r squared.', show: 'sum.0' },
        { say: 'Add the surface areas of the parts, and subtract the overlap twice.', show: 'sum.1' },
        { say: 'To check, add the prism and only the curved side of the cylinder.', show: 'sum.2' },
        { say: 'For the trophy, that gave about six hundred ninety-eight point seven square centimetres. In the next lesson, you will start working with powers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
