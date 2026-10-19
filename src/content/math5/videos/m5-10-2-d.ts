import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// The four rectangles with whole-metre sides and an area of 24 m², drawn to scale.
const four = () =>
  figure('f', [
    tiles({ name: 'a', cols: 24, rows: 1, at: [0, 9], labels: { width: '24\\text{ m}', height: '1\\text{ m}' } }),
    tiles({ name: 'b', cols: 12, rows: 2, at: [0, 5.5], labels: { width: '12\\text{ m}', height: '2\\text{ m}' } }),
    tiles({ name: 'c', cols: 8, rows: 3, at: [0, 0], labels: { width: '8\\text{ m}', height: '3\\text{ m}' } }),
    tiles({ name: 'd', cols: 6, rows: 4, at: [11, 0], labels: { width: '6\\text{ m}', height: '4\\text{ m}' } }),
  ]);

const video: Explainer = {
  id: 'm5-10-2-d',
  lessonId: 'm5-10-2',
  title: 'Area and Perimeter of Rectangles, Part 4: Same Area, Different Perimeters',
  thumbnailTitle: 'Same Area, Different Perimeters',
  thumbnail: 'f',
  summary: 'All the rectangles with whole-number sides and an area of 24 m² (24 by 1, 12 by 2, 8 by 3 and 6 by 4) have perimeters of 50, 28, 22 and 20 m: the long, thin one has the greatest perimeter and the one closest to a square the least. A rabbit pen of 36 m² needs the least fencing as a 6 m by 6 m square: 24 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 4', title: 'Same Area, Different Perimeters', subtitle: 'Why the square wins' }],
      lines: [
        { say: 'Can two rectangles cover exactly the same area, but need different amounts of fence to go around them? Let’s find out.', show: 'title' },
        { say: 'In this video, you will compare rectangles with the same area, and find which one has the least perimeter.' },
      ],
    },
    {
      chapter: 'Four rectangles',
      layout: 'center',
      main: [four()],
      lines: [
        { say: 'Here are all the rectangles with whole-number sides and an area of twenty-four square metres. Each one is covered by twenty-four squares.', show: ['f.a-outline', 'f.a-grid', 'f.b-outline', 'f.b-grid', 'f.c-outline', 'f.c-grid', 'f.d-outline', 'f.d-grid'] },
        { say: 'The first one is twenty-four metres long and one metre wide. One row of twenty-four squares.', show: ['f.a-width', 'f.a-height'], focus: 'f.a-outline' },
        { say: 'The next is twelve metres by two metres: two rows of twelve.', show: ['f.b-width', 'f.b-height'], focus: 'f.b-outline' },
        { say: 'Then eight metres by three metres: three rows of eight.', show: ['f.c-width', 'f.c-height'], focus: 'f.c-outline' },
        { say: 'And six metres by four metres: four rows of six. All four rectangles have the same area. But do they have the same perimeter?', show: ['f.d-width', 'f.d-height'], focus: 'f.d-outline' },
      ],
    },
    {
      chapter: 'Comparing perimeters',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Length (m)', 'Width (m)', 'Area (m²)', 'Perimeter (m)'], rows: [['24', '1', '24', '$24 + 1 + 24 + 1 = 50$'], ['12', '2', '24', '$12 + 2 + 12 + 2 = 28$'], ['8', '3', '24', '$8 + 3 + 8 + 3 = 22$'], ['6', '4', '24', '$6 + 4 + 6 + 4 = 20$']] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same area, different perimeters', md: 'The long, thin rectangle has the **greatest** perimeter. The rectangle closest to a square has the **least** perimeter.' },
      ],
      lines: [
        { say: 'Let’s add the sides of each one. Twenty-four plus one plus twenty-four plus one is fifty. The long, thin rectangle needs fifty metres of fence!', show: 't.0', focus: 't.0' },
        { say: 'Twelve plus two plus twelve plus two is twenty-eight metres.', show: 't.1', focus: 't.1' },
        { say: 'Eight plus three plus eight plus three is twenty-two metres.', show: 't.2', focus: 't.2' },
        { say: 'And six plus four plus six plus four is only twenty metres.', show: 't.3', focus: 't.3' },
        { say: 'So rectangles can have the same area, but different perimeters. The long, thin one has the greatest perimeter, and the one closest to a square has the least.', show: 'key', focus: ['t.0', 't.3'] },
      ],
    },
    {
      chapter: 'The square wins',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ayesha wants a rectangular rabbit pen with an area of $36\\text{ m}^2$ and whole-metre sides. Which pen uses the least fencing?' },
        { kind: 'table', id: 't', head: ['Pen (m)', '1 by 36', '2 by 18', '3 by 12', '4 by 9', '6 by 6'], rows: [['Perimeter (m)', '74', '40', '30', '26', '24']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The square wins', md: 'Among all rectangles with the same area, the **square** has the least perimeter.' },
      ],
      lines: [
        { say: 'Ayesha wants a rectangular rabbit pen with an area of thirty-six square metres, and whole-metre sides. Which pen uses the least fencing?', show: 'q' },
        { say: 'The choices are one by thirty-six, two by eighteen, three by twelve, four by nine, and six by six. Each one multiplies to thirty-six.', show: 't' },
        { say: 'A quick way to find a perimeter: add the length and the width, then double it. One plus thirty-six is thirty-seven, and double that is seventy-four metres.', focus: 't.0' },
        { say: 'In the same way, the others need forty, thirty, twenty-six, and twenty-four metres of fence.' },
        { say: 'The six by six pen is a square, and it uses the least fencing: only twenty-four metres. Among all rectangles with the same area, the square has the least perimeter.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each rectangle has an area of $16\\text{ m}^2$. Which one uses the **least** fencing?',
          choices: ['$16\\text{ m}$ by $1\\text{ m}$', '$4\\text{ m}$ by $4\\text{ m}$', '$8\\text{ m}$ by $2\\text{ m}$', 'They all use the same.'],
          answer: 1,
          working: 'The perimeters are $34\\text{ m}$, $16\\text{ m}$ and $20\\text{ m}$. The square, $4\\text{ m}$ by $4\\text{ m}$, uses the least.',
        },
      ],
      lines: [
        { say: 'Your turn. Each of these rectangles has an area of sixteen square metres. Which one uses the least fencing? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, the four by four square. Its perimeter is sixteen metres. The others need thirty-four and twenty metres. Choice D is wrong: the areas are the same, but the perimeters are different.', show: 'q.answer' },
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
          items: ['Rectangles with the same area can have different perimeters.', 'The long, thin rectangle has the greatest perimeter.', 'The square has the least perimeter.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rectangles with the same area can have different perimeters.', show: 'sum.0' },
        { say: 'The long, thin rectangle has the greatest perimeter.', show: 'sum.1' },
        { say: 'And the square has the least perimeter, so it needs the least fence. In the next part, you will find the area of shapes made of rectangles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
