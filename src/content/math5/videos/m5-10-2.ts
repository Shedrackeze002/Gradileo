import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { rect } from './lib/m5-10-figures.ts';

const video: Explainer = {
  id: 'm5-10-2',
  lessonId: 'm5-10-2',
  title: 'Area and Perimeter of Rectangles, Part 1: The Area of a Rectangle',
  thumbnailTitle: 'The Area of a Rectangle',
  thumbnail: 'r',
  summary: 'A rectangle 5 cm long and 3 cm wide is covered by 3 rows of 5 square centimetres, so its area is 3 × 5 = 15 cm². The rule area = length × width, and a community garden 24 m by 15 m: 24 × 10 + 24 × 5 = 360 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 1', title: 'The Area of a Rectangle', subtitle: 'Length times width' }],
      lines: [
        { say: 'Counting squares one by one works, but it can take a long time. Imagine counting every square on a big floor!', show: 'title' },
        { say: 'In this video, you will find a fast way to work out the area of any rectangle, without counting every square.' },
      ],
    },
    {
      chapter: 'Rows of squares',
      layout: 'split',
      leftWidth: 560,
      left: [figure('r', [tiles({ cols: 5, rows: 3, labels: { width: '5\\text{ cm}', height: '3\\text{ cm}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\text{ rows of } 5', '3 \\times 5 = 15', '\\text{Area} = 15\\text{ cm}^2'] }],
      lines: [
        { say: 'Here is a rectangle on centimetre grid paper. It is five centimetres long and three centimetres wide.', show: ['r.outline', 'r.width', 'r.height'] },
        { say: 'The squares inside it make rows. Each row has five square centimetres, one for each centimetre of the length.', show: 'r.grid', focus: 'r.width' },
        { say: 'And there are three rows, one for each centimetre of the width. So the rectangle is covered by three rows of five.', show: 'm.0', focus: ['r.height', 'm.0'] },
        { say: 'Instead of counting all the squares, multiply. Three rows of five is three times five, which is fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'So the area is fifteen square centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\text{Area of a rectangle} = \\adj{\\text{length}} \\times \\opp{\\text{width}}'] },
        {
          kind: 'bullets',
          id: 'b',
          items: ['The **length** tells how many squares are in each row.', 'The **width** tells how many rows there are.', 'You can multiply in either order: $5 \\times 3 = 3 \\times 5 = 15$.'],
        },
      ],
      lines: [
        { say: 'This works for every rectangle. The area of a rectangle is its length times its width.', show: 'm', focus: 'm' },
        { say: 'The length tells you how many squares are in each row.', show: 'b.0' },
        { say: 'The width tells you how many rows there are. Rows times squares in each row gives all the squares.', show: 'b.1' },
        { say: 'And you can multiply in either order. Five times three is fifteen, and three times five is fifteen as well.', show: 'b.2' },
        { say: 'Just remember to write the answer in square units.' },
      ],
    },
    {
      chapter: 'A community garden',
      layout: 'split',
      leftWidth: 520,
      left: [figure('g', [rect({ w: 24, h: 15, tone: 'good', labels: { bottom: '24\\text{ m}', left: '15\\text{ m}' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area} = 24 \\times 15', '24 \\times 10 = 240', '24 \\times 5 = 120', '240 + 120 = 360', '\\text{Area} = 360\\text{ m}^2'] }],
      lines: [
        { say: 'A community garden is a rectangle twenty-four metres long and fifteen metres wide. What is its area?', show: ['g.shape', 'g.bottom', 'g.left'] },
        { say: 'Area is length times width, so the area is twenty-four times fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'To multiply, split fifteen into ten and five. Twenty-four times ten is two hundred and forty.', show: 'm.1', focus: 'm.1' },
        { say: 'Twenty-four times five is one hundred and twenty.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the two parts: two hundred and forty plus one hundred and twenty is three hundred and sixty.', show: 'm.3', focus: 'm.3' },
        { say: 'So the garden has an area of three hundred and sixty square metres. That is three hundred and sixty squares, each one metre by one metre!', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A classroom rug is a rectangle $4\\text{ m}$ long and $3\\text{ m}$ wide. What is its area?',
          choices: ['$7\\text{ m}^2$', '$14\\text{ m}$', '$12\\text{ m}$', '$12\\text{ m}^2$'],
          answer: 3,
          working: 'Area $=$ length $\\times$ width $= 4 \\times 3 = 12$, so the area is $12\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A classroom rug is a rectangle four metres long and three metres wide. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twelve square metres. Length times width is four times three, which is twelve. Choice C has the right number, but an area needs square units.', show: 'q.answer' },
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
          items: ['A rectangle is covered by rows of squares.', 'Area of a rectangle $=$ length $\\times$ width.', 'Write the area in square units: $\\text{cm}^2$ or $\\text{m}^2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rectangle is covered by rows of squares.', show: 'sum.0' },
        { say: 'So the area of a rectangle is its length times its width.', show: 'sum.1' },
        { say: 'And write the area in square units. In the next part, you will find a missing side when you know the area. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
