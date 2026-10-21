import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';

// The map: 1 cm to 25 km, so 6.8 cm to 170 km.
const map = (id: string) =>
  figure(
    id,
    [ratioTable({ rows: ['\\text{Map (cm)}', '\\text{Real (km)}'], cols: [['1', '25'], ['6.8', '170']], titleWidth: 4.2, colWidth: 2.2, arrows: [{ id: 'x', from: 0, to: 1, label: '\\times 6.8' }] })],
    300,
  );

// The money: $0.73 of theirs for each $1 of yours, so $109.50 for $150.
const money = (id: string) =>
  figure(
    id,
    [
      ratioTable({
        rows: ['\\text{Their dollars}', '\\text{Your dollars}'],
        cols: [
          ['0.73', '1'],
          ['109.50', '150'],
        ],
        titleWidth: 5.4,
        colWidth: 3.9,
        tones: ['good', 'adj'],
        arrows: [{ id: 'x', from: 0, to: 1, label: '\\times 150' }],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-3-3-e',
  lessonId: 'm8-3-3',
  title: 'Proportional Reasoning, Part 5: Maps and Money',
  thumbnailTitle: 'Maps and Money',
  thumbnail: 'mp',
  summary:
    'A map scale and an exchange rate are both ratios, so the equivalent-ratio method solves problems with them. If 1 cm on a map represents 25 km, then 1/25 = 6.8/x, and the map distance is 6.8 times as big, so two towns 6.8 cm apart are 25 × 6.8 = 170 km apart. If $1 of your money buys $0.73 of another country’s dollars (an example rate, which changes every day), then 0.73/1 = x/150, so $150 buys 150 × 0.73 = $109.50.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 5', title: 'Maps and Money', subtitle: 'Proportions on the road' }],
      lines: [
        { say: 'On a road map, a few centimetres can stand for many kilometres. And when you travel, your money buys a different amount of another country’s money. Both are proportions.', show: 'title' },
        { say: 'In this part, you will use the equivalent-ratio method with a map scale, and with changing money.' },
      ],
    },
    {
      chapter: 'A map scale',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale', md: 'A map’s **scale** compares a distance on the map with the real distance. For example, $1$ cm on the map can represent $25$ km.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'On a road map, $1$ cm represents $25$ km. Two towns are $6.8$ cm apart on the map. How far apart are they?' },
      ],
      lines: [
        { say: 'A map is much smaller than the land it shows. Its scale compares a distance on the map with the real distance.', show: 'def' },
        { say: 'On this road map, one centimetre represents twenty-five kilometres. Two towns are six point eight centimetres apart on the map. How far apart are they really?', show: 'q' },
      ],
    },
    {
      chapter: 'Solving the map problem',
      layout: 'split',
      leftWidth: 560,
      left: [map('mp')],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{1 \\text{ cm}}{25 \\text{ km}} = \\dfrac{6.8 \\text{ cm}}{x}', 'x = 25 \\times 6.8', 'x = 170 \\text{ km}'] },
      ],
      lines: [
        { say: 'Write the proportion with map distance over real distance on both sides. One centimetre over twenty-five kilometres equals six point eight centimetres over x.', show: ['m.0', 'mp.frame', 'mp.c0', 'mp.c1-t'], focus: 'm.0' },
        { say: 'The map distance went from one to six point eight. So the map distance is six point eight times as big.', show: 'mp.x', focus: 'mp.x' },
        { say: 'The real distance must be six point eight times as big as well. x equals twenty-five times six point eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Twenty-five times six is one hundred fifty, and twenty-five times zero point eight is twenty. Together, that is one hundred seventy. The towns are one hundred seventy kilometres apart.', show: ['m.2', 'mp.c1-b'], focus: ['m.2', 'mp.c1-b'] },
      ],
    },
    {
      chapter: 'Changing money',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Suppose \\$1 of your money buys \\$0.73 of another country’s dollars. How many of their dollars do you get for \\$150?' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Exchange rates change', md: 'The rate for changing money changes every day. This one is only an example.' },
      ],
      lines: [
        { say: 'When you travel to another country, you change your money into theirs. Suppose one of your dollars buys seventy-three cents of another country’s dollars.', show: 'q' },
        { say: 'The rate for changing money goes up and down every day, so this rate is only an example. How many of their dollars do you get for one hundred fifty of yours?', show: 'tip' },
      ],
    },
    {
      chapter: 'Solving the money problem',
      layout: 'split',
      leftWidth: 640,
      left: [money('mn')],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{\\text{theirs}}{\\text{yours}}\\colon\\ \\dfrac{0.73}{1} = \\dfrac{x}{150}', 'x = 150 \\times 0.73', 'x = 109.50'] },
        { kind: 'text', id: 'a', size: 'md', md: 'You get **\\$109.50** of their dollars.' },
      ],
      lines: [
        { say: 'Write each ratio as their dollars over your dollars. Zero point seven three over one equals x over one hundred fifty.', show: ['m.0', 'mn.frame', 'mn.c0', 'mn.c1-b'], focus: 'm.0' },
        { say: 'Your money went from one dollar to one hundred fifty dollars. That is one hundred fifty times as much.', show: 'mn.x', focus: 'mn.x' },
        { say: 'So x equals one hundred fifty times zero point seven three. One hundred times zero point seven three is seventy-three, and fifty times zero point seven three is thirty-six point five. Together, one hundred nine point five.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'In money, write two decimal places. You get one hundred nine dollars and fifty cents of their money.', show: ['a', 'mn.c1-t'], focus: 'mn.c1-t' },
      ],
    },
    {
      chapter: 'Same units, same order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same units, same order', md: 'Map over real on both sides. Their dollars over your dollars on both sides. Then solve.' },
      ],
      lines: [
        { say: 'In both problems, the key was the same. Put the same units in the same order on both sides of the proportion, then solve it.', show: 'key' },
        { say: 'Map distance over real distance, on both sides. Their dollars over your dollars, on both sides.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a map, $1$ cm represents $40$ km. Two lakes are $3.5$ cm apart on the map. How far apart are they?',
          choices: ['$140$ km', '$43.5$ km', '$11.4$ km', '$1{,}400$ km'],
          answer: 0,
          working: '$\\tfrac{1 \\text{ cm}}{40 \\text{ km}} = \\tfrac{3.5 \\text{ cm}}{x}$. The map distance is $3.5$ times as big, so $x = 40 \\times 3.5 = 140$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. On a map, one centimetre represents forty kilometres. Two lakes are three point five centimetres apart on the map. How far apart are they? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one hundred forty kilometres. The map distance is three point five times as big, so the real distance is forty times three point five, which is one hundred forty. Choice B adds three point five to forty, but a proportion needs multiplying.', show: 'q.answer' },
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
            'A map scale is a ratio: $\\dfrac{1 \\text{ cm}}{25 \\text{ km}} = \\dfrac{6.8 \\text{ cm}}{x}$, so $x = 170$ km.',
            'Changing money is a ratio: $\\dfrac{0.73}{1} = \\dfrac{x}{150}$, so $x = 109.50$.',
            'Same units, same order, on both sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A map scale is a ratio, so a proportion turns a map distance into a real distance.', show: 'sum.0' },
        { say: 'Changing money uses a ratio as well, and a proportion finds how much you get.', show: 'sum.1' },
        { say: 'Keep the same units in the same order on both sides. In the next part, you will share an amount in a ratio. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
