import type { Explainer } from '@/video/script.ts';
import { unitSquare } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';
import { rect } from './lib/m5-10-figures.ts';

// One square metre, 100 cm on each side, split into 100 squares that are each 10 cm by 10 cm.
const metre = () =>
  figure('m2', [
    unitSquare({ split: 10, size: 10, labels: { side: '1\\text{ m} = 100\\text{ cm}' } }),
    rect({ name: 'c', w: 1, h: 1, at: [0, 9], tone: 'theta', shade: 0.6, labels: { top: '10\\text{ cm}', left: '10\\text{ cm}' } }),
  ]);

const video: Explainer = {
  id: 'm5-10-1-c',
  lessonId: 'm5-10-1',
  title: 'Units of Area, Part 3: How the Units Are Related',
  thumbnailTitle: 'How the Units Are Related',
  thumbnail: 'm2',
  summary: 'Why 1 m² is 100 × 100 = 10,000 cm² and not 100 cm², and why 1 km² is 1,000 × 1,000 = 1,000,000 m². Then changing units: a rug of 3 m² is 30,000 cm², and a forest of 4,000,000 m² is 4 km².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 3', title: 'How the Units Are Related', subtitle: 'Why 1 m² is not 100 cm²' }],
      lines: [
        { say: 'One metre is a hundred centimetres. So is one square metre a hundred square centimetres? It sounds right, but it is not! Let’s find out why.', show: 'title' },
        { say: 'In this video, you will see how many square centimetres fit in a square metre, and how many square metres fit in a square kilometre. Then you will change from one unit to another.' },
      ],
    },
    {
      chapter: 'Inside a square metre',
      layout: 'split',
      leftWidth: 520,
      left: [metre()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10 \\times 10 = 100 \\text{ small squares}', '\\text{each: } 10 \\times 10 = 100\\text{ cm}^2', '100 \\times 100 = 10\\,000', '1\\text{ m}^2 = 10\\,000\\text{ cm}^2'] }],
      lines: [
        { say: 'Here is one square metre. Each side is one metre, which is one hundred centimetres.', show: ['m2.square', 'm2.side'] },
        { say: 'Picture it split into smaller squares, ten across and ten up. That is ten rows of ten, so there are one hundred small squares.', show: ['m2.grid', 'm.0'], focus: 'm.0' },
        { say: 'Each small square is ten centimetres by ten centimetres. So each one holds ten rows of ten square centimetres. That is one hundred square centimetres in each small square.', show: ['m2.c-shape', 'm2.c-top', 'm2.c-left', 'm.1'], focus: ['m2.c-shape', 'm.1'] },
        { say: 'So the square metre holds one hundred small squares, with one hundred square centimetres in each. One hundred times one hundred is ten thousand.', show: 'm.2', focus: 'm.2' },
        { say: 'One square metre is ten thousand square centimetres! Another way to see it: a square metre has one hundred rows of one hundred square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '1 m² is not 100 cm²', md: '$1\\text{ m} = 100\\text{ cm}$, but $1\\text{ m}^2$ is **not** $100\\text{ cm}^2$. A square metre has $100$ rows of $100$ square centimetres, which is $10\\,000\\text{ cm}^2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1\\text{ m} = 100\\text{ cm}', '1\\text{ m}^2 = 100 \\times 100 = 10\\,000\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'This is a very common mistake. One metre is one hundred centimetres. That part is true.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But a square metre is not one hundred square centimetres. One hundred square centimetres would only fill one row along the bottom!', focus: 'oops' },
        { say: 'A square metre has one hundred rows of one hundred square centimetres. That is ten thousand square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Square kilometres',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['1\\text{ km} = 1\\,000\\text{ m}', '1\\text{ km}^2 = 1\\,000 \\times 1\\,000', '1\\text{ km}^2 = 1\\,000\\,000\\text{ m}^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Square units grow fast', md: 'Each side is multiplied, and so is each row, so a square unit is the length number **times itself**.' },
      ],
      lines: [
        { say: 'Square kilometres work the same way. One kilometre is one thousand metres.', show: 'm.0', focus: 'm.0' },
        { say: 'So a square kilometre is one thousand metres long on each side. It holds one thousand rows of one thousand square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'One thousand times one thousand is one million. So one square kilometre is one million square metres!', show: 'm.2', focus: 'm.2' },
        { say: 'Square units grow fast, because the length is multiplied by itself: a hundred times a hundred, or a thousand times a thousand.', show: 'key' },
      ],
    },
    {
      chapter: 'Changing units',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', size: 'md', md: 'A rug has an area of $3\\text{ m}^2$. What is its area in square centimetres?' },
        { kind: 'math', id: 'a1', size: 'md', lines: ['3 \\times 10\\,000 = 30\\,000\\text{ cm}^2'] },
        { kind: 'text', id: 'q2', size: 'md', md: 'A forest has an area of $4\\,000\\,000\\text{ m}^2$. What is its area in square kilometres?' },
        { kind: 'math', id: 'a2', size: 'md', lines: ['4\\,000\\,000\\text{ m}^2 = 4 \\text{ groups of } 1\\,000\\,000\\text{ m}^2 = 4\\text{ km}^2'] },
      ],
      lines: [
        { say: 'Now let’s change units. A rug has an area of three square metres. What is its area in square centimetres?', show: 'q1' },
        { say: 'Each square metre is ten thousand square centimetres. Three square metres is three times ten thousand, which is thirty thousand square centimetres.', show: 'a1', focus: 'a1' },
        { say: 'Next, a forest has an area of four million square metres. What is its area in square kilometres?', show: 'q2' },
        { say: 'Each square kilometre is one million square metres. Four million is four groups of one million. So the forest is four square kilometres.', show: 'a2', focus: 'a2' },
        { say: 'Going to a smaller unit, the number gets bigger. Going to a bigger unit, the number gets smaller.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A garden has an area of $5\\text{ m}^2$. What is its area in square centimetres?',
          choices: ['$500\\text{ cm}^2$', '$5\\,000\\text{ cm}^2$', '$50\\,000\\text{ cm}^2$', '$500\\,000\\text{ cm}^2$'],
          answer: 2,
          working: 'Each square metre is $10\\,000\\text{ cm}^2$, so $5 \\times 10\\,000 = 50\\,000\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A garden has an area of five square metres. What is its area in square centimetres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, fifty thousand square centimetres. Each square metre is ten thousand square centimetres, and five times ten thousand is fifty thousand. Choice A uses one hundred square centimetres in each square metre, which is the common mistake.', show: 'q.answer' },
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
          items: ['$1\\text{ m}^2 = 100 \\times 100 = 10\\,000\\text{ cm}^2$, not $100\\text{ cm}^2$.', '$1\\text{ km}^2 = 1\\,000 \\times 1\\,000 = 1\\,000\\,000\\text{ m}^2$.', 'To a smaller unit, multiply. To a bigger unit, find how many groups.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. One square metre is one hundred times one hundred, which is ten thousand square centimetres, and not one hundred.', show: 'sum.0' },
        { say: 'One square kilometre is one thousand times one thousand, which is one million square metres.', show: 'sum.1' },
        { say: 'To change to a smaller unit, multiply. To change to a bigger unit, find how many groups there are. In the next part, you will estimate areas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
