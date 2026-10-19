import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { rect } from './lib/m5-10-figures.ts';

// A patio 8 m by 5 m: its four sides for the perimeter, and its squares for the area.
const patio = (id: string) =>
  figure(id, [
    tiles({ cols: 8, rows: 5 }),
    rect({ name: 'p', w: 8, h: 5, shade: 0, labels: { bottom: '8\\text{ m}', right: '5\\text{ m}', top: '8\\text{ m}', left: '5\\text{ m}' } }),
  ]);

const video: Explainer = {
  id: 'm5-10-2-c',
  lessonId: 'm5-10-2',
  title: 'Area and Perimeter of Rectangles, Part 3: Perimeter and Area',
  thumbnailTitle: 'Perimeter and Area',
  thumbnail: 'pa',
  summary: 'Perimeter is the distance all the way around a shape: add the sides, in units of length. A patio 8 m by 5 m has a perimeter of 8 + 5 + 8 + 5 = 26 m and an area of 8 × 5 = 40 m². Perimeter is the fence around the outside; area is the grass inside.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 3', title: 'Perimeter and Area', subtitle: 'The fence and the grass' }],
      lines: [
        { say: 'A fence goes around a garden, and grass covers the inside. The fence and the grass are two different measurements, and it is easy to mix them up.', show: 'title' },
        { say: 'In this video, you will learn what perimeter is, and find both the perimeter and the area of a rectangle.' },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'split',
      leftWidth: 540,
      left: [figure('per', [rect({ w: 8, h: 5, labels: { bottom: '8\\text{ m}', right: '5\\text{ m}', top: '8\\text{ m}', left: '5\\text{ m}' } })], 420)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Perimeter', md: 'The **perimeter** is the distance all the way around a shape. Add the lengths of all the sides. Perimeter is a length, so it uses $\\text{cm}$ or $\\text{m}$.' }],
      lines: [
        { say: 'The perimeter is the distance all the way around a shape. Imagine walking along every edge of a patio, until you are back where you started.', show: ['per.shape', 'def'] },
        { say: 'Start at the bottom left corner. Walk along the bottom, eight metres. Then up the right side, five metres.', show: ['per.bottom', 'per.right'] },
        { say: 'Then along the top, eight metres, and down the left side, five metres. You are back at the start.', show: ['per.top', 'per.left'] },
        { say: 'So to find the perimeter, add the lengths of all the sides. The perimeter is a length, so it is measured in centimetres or metres, with no small two up high.', focus: ['per.bottom', 'per.right', 'per.top', 'per.left'] },
      ],
    },
    {
      chapter: 'A patio',
      layout: 'split',
      leftWidth: 560,
      left: [patio('pa')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Perimeter} = 8 + 5 + 8 + 5', '\\text{Perimeter} = 26\\text{ m}', '\\text{Area} = 8 \\times 5', '\\text{Area} = 40\\text{ m}^2'] }],
      lines: [
        { say: 'A patio is a rectangle eight metres by five metres. Let’s find its perimeter and its area.', show: ['pa.p-shape'] },
        { say: 'For the perimeter, add all four sides: eight plus five plus eight plus five.', show: ['pa.p-bottom', 'pa.p-right', 'pa.p-top', 'pa.p-left', 'm.0'], focus: ['pa.p-bottom', 'pa.p-right', 'pa.p-top', 'pa.p-left', 'm.0'] },
        { say: 'Eight plus five is thirteen, and thirteen plus thirteen is twenty-six. So the perimeter is twenty-six metres.', show: 'm.1', focus: 'm.1' },
        { say: 'For the area, count the squares that cover the patio. There are five rows of eight squares, so multiply: eight times five is forty.', show: ['pa.grid', 'pa.outline', 'm.2'], focus: ['pa.grid', 'm.2'] },
        { say: 'So the area is forty square metres. The same patio has a perimeter of twenty-six metres, and an area of forty square metres.', show: 'm.3', focus: ['m.1', 'm.3'] },
      ],
    },
    {
      chapter: 'Fence or grass?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Perimeter', 'Area'], rows: [['What it is', 'the fence around the outside', 'the grass inside'], ['How to find it', 'add the sides', 'length $\\times$ width'], ['Units', '$\\text{m}$ or $\\text{cm}$', '$\\text{m}^2$ or $\\text{cm}^2$']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up perimeter and area', md: 'Perimeter: **add** the sides, and use $\\text{m}$. Area: **multiply**, and use $\\text{m}^2$.' },
      ],
      lines: [
        { say: 'It is easy to mix these two up, so here they are side by side.', show: 't' },
        { say: 'Perimeter is like the fence around the outside of a garden. Area is like the grass inside it.', focus: 't.0' },
        { say: 'For the perimeter of a rectangle, add the sides. For the area, multiply the length by the width.', focus: 't.1' },
        { say: 'Perimeter is a length, so it uses metres or centimetres. Area uses square metres or square centimetres.', focus: 't.2' },
        { say: 'So before you start, ask yourself: am I finding the fence, or the grass?', show: 'oops', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular picture is $6\\text{ cm}$ long and $4\\text{ cm}$ wide. What is its **perimeter**?',
          choices: ['$24\\text{ cm}^2$', '$10\\text{ cm}$', '$24\\text{ cm}$', '$20\\text{ cm}$'],
          answer: 3,
          working: 'Add all four sides: $6 + 4 + 6 + 4 = 20$, so the perimeter is $20\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular picture is six centimetres long and four centimetres wide. What is its perimeter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twenty centimetres. Add all four sides: six plus four plus six plus four is twenty. Choice A is the area, six times four, and choice B adds only two of the sides.', show: 'q.answer' },
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
          items: ['Perimeter is the distance all the way around: add all the sides.', 'Perimeter is a length, in $\\text{cm}$ or $\\text{m}$.', 'Area covers the inside: multiply, and use square units.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The perimeter is the distance all the way around a shape. Add all the sides.', show: 'sum.0' },
        { say: 'Perimeter is a length, so it is in centimetres or metres.', show: 'sum.1' },
        { say: 'Area covers the inside, so multiply, and use square units. In the next part, you will see that the same area can have different perimeters. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
