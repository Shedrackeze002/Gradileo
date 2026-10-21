import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { plants } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { candles } from '@/content/math8/videos/lib/m8-6-figures.ts';

// The climbing gym: C = 25 + 8n for 0 to 3 visits.
const gym = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: '\\text{Visits, } n', values: [0, 1, 2, 3] }, y: { title: '\\text{Cost, } C', values: [25, 33, 41, 49] }, dy: ['+8', '+8', '+8'], titleW: 3.2, cellW: 1.5 })],
    250,
  );

// A bean plant 4 cm tall, growing 0.5 cm a day: days 0, 2, 4 and 6.
const beans = (id: string) =>
  figure(id, [plants({ heights: [4, 5, 6, 7], gap: 2.2, scale: 0.4, weeks: ['\\text{day } 0', '\\text{day } 2', '\\text{day } 4', '\\text{day } 6'] })], 440);

// A 30 cm candle burning down 1.5 cm each hour: after 0, 2, 4 and 6 hours.
const wax = (id: string) =>
  figure(
    id,
    [
      candles({
        heights: [3, 2.7, 2.4, 2.1],
        gap: 1.1,
        tops: ['30\\text{ cm}', '27\\text{ cm}', '24\\text{ cm}', '21\\text{ cm}'],
        captions: ['0\\text{ h}', '2\\text{ h}', '4\\text{ h}', '6\\text{ h}'],
      }),
    ],
    440,
  );

const video: Explainer = {
  id: 'm9-4-1-c',
  lessonId: 'm9-4-1',
  title: 'Writing Equations to Describe Patterns, Part 3: Equations from Situations',
  thumbnailTitle: 'Equations from Situations',
  thumbnail: 'wx',
  summary:
    'In a situation, look for two amounts: the starting amount or fixed fee, which is the constant term, and the rate, the amount that changes for each unit, which multiplies the variable. A climbing gym that charges a $25 fee plus $8 a visit costs C = 25 + 8n, and 3 visits cost 25 + 8(3) = 49 dollars. A bean plant 4 cm tall that grows 0.5 cm a day has height h = 4 + 0.5d. A 30 cm candle that burns down 1.5 cm each hour has height h = 30 − 1.5t: subtract the rate when the amount goes down.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Equations from Situations', subtitle: 'A starting amount and a rate' }],
      lines: [
        { say: 'Patterns are not only made of toothpicks. A gym membership, a growing plant and a burning candle all follow rules as well.', show: 'title' },
        { say: 'In this part, you will write equations for real situations, including rates that are not whole numbers, and amounts that go down.' },
      ],
    },
    {
      chapter: 'Two amounts to look for',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The **starting amount**, or fixed fee, is the **constant term**.',
            'The **rate**, the amount that changes for each unit, **multiplies the variable**.',
          ],
        },
      ],
      lines: [
        { say: 'In a situation, look for two amounts.', show: 'b' },
        { say: 'The first is the starting amount, or a fixed fee that is paid once. It is the constant term: the number on its own.', show: 'b.0', focus: 'b.0' },
        { say: 'The second is the rate: the amount that changes for each unit, like each visit, each day, or each hour. The rate multiplies the variable.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'A climbing gym',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A climbing gym charges a \\$25 membership fee plus \\$8 for each visit. Write an equation for the total cost $C$, in dollars, for $n$ visits.' },
        gym('gy'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['C = 25 + 8n'] },
      ],
      lines: [
        { say: 'A climbing gym charges a twenty-five dollar membership fee, plus eight dollars for each visit. Write an equation for the total cost, C, in dollars, for n visits.', show: 'q' },
        { say: 'The fee is paid once, so it is the constant: twenty-five. The rate is eight dollars for each visit, so it multiplies n.', show: ['gy.frame', 'gy.xs', 'gy.ys'] },
        { say: 'Each visit adds eight dollars to the cost.', show: 'gy.dys', focus: 'gy.dys' },
        { say: 'The equation is C equals twenty-five plus eight n.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Verify for 3 visits',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{From the words: } 25 + 8 + 8 + 8 = 49', '\\text{From the equation: } C = 25 + 8(3) = 25 + 24 = 49 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Verify the equation for three visits. From the words: the twenty-five dollar fee, plus eight dollars for each of three visits, is forty-nine dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'From the equation: twenty-five plus eight times three is twenty-five plus twenty-four, which is forty-nine. It matches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A rate that is not whole',
      layout: 'split',
      leftWidth: 500,
      left: [beans('bn')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A bean plant is $4$ cm tall and grows $0.5$ cm each day. Write an equation for its height $h$ after $d$ days.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 4 + 0.5d', 'd = 6\\text{:}', 'h = 4 + 0.5(6) = 7'] },
      ],
      lines: [
        { say: 'The rate does not have to be a whole number. A bean plant is four centimetres tall, and it grows zero point five centimetres each day.', show: ['q', 'bn.p0', 'bn.h0', 'bn.w0'] },
        { say: 'Every two days it grows one centimetre: five centimetres on day two, six on day four, and seven on day six.', show: ['bn.p1', 'bn.h1', 'bn.w1', 'bn.p2', 'bn.h2', 'bn.w2', 'bn.p3', 'bn.h3', 'bn.w3'] },
        { say: 'The starting height, four, is the constant. The rate, zero point five centimetres a day, multiplies d, the number of days. So h equals four plus zero point five d.', show: 'm.0', focus: 'm.0' },
        { say: 'Check day six: four plus zero point five times six is four plus three, which is seven centimetres. It matches.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Going down',
      layout: 'split',
      leftWidth: 500,
      left: [wax('wx')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A candle is $30$ cm tall and burns down $1.5$ cm each hour. Write an equation for its height $h$ after $t$ hours.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 30 - 1.5t', 't = 4\\text{:}', 'h = 30 - 1.5(4) = 24'] },
      ],
      lines: [
        { say: 'Some amounts go down. A candle is thirty centimetres tall, and it burns down one point five centimetres each hour.', show: ['q', 'wx.k0', 'wx.h0', 'wx.c0'] },
        { say: 'Every two hours it loses three centimetres: twenty-seven centimetres after two hours, twenty-four after four, and twenty-one after six.', show: ['wx.k1', 'wx.h1', 'wx.c1', 'wx.k2', 'wx.h2', 'wx.c2', 'wx.k3', 'wx.h3', 'wx.c3'] },
        { say: 'The height goes down, so subtract the rate. The equation is h equals thirty minus one point five t.', show: 'm.0', focus: 'm.0' },
        { say: 'Check four hours: thirty minus one point five times four is thirty minus six, which is twenty-four centimetres. It matches.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bike rental charges a \\$6 fee plus \\$2.50 for each hour. Which equation gives the cost $C$, in dollars, for $h$ hours?',
          choices: ['$C = 6 + 2.5h$', '$C = 2.5 + 6h$', '$C = 8.5h$', '$C = 6 - 2.5h$'],
          answer: 0,
          working: 'The fee, $6$, is the constant, and the rate, $2.5$ dollars an hour, multiplies $h$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bike rental charges a six dollar fee, plus two dollars and fifty cents for each hour. Which equation gives the cost, C, in dollars, for h hours? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The fee, six dollars, is the constant. The rate, two dollars and fifty cents for each hour, multiplies h. Choice B swaps them, so it would charge six dollars for every hour.', show: 'q.answer' },
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
            'The starting amount or fixed fee is the constant: $C = 25 + 8n$.',
            'The rate multiplies the variable, and it can be a decimal: $h = 4 + 0.5d$.',
            'When the amount goes down, subtract the rate: $h = 30 - 1.5t$.',
            'Verify the equation with a value you can work out from the words.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The starting amount, or fixed fee, is the constant term.', show: 'sum.0' },
        { say: 'The rate multiplies the variable, and it does not have to be a whole number.', show: 'sum.1' },
        { say: 'When the amount goes down, subtract the rate.', show: 'sum.2' },
        { say: 'And verify the equation with a value you can work out from the words. In the next part, you will use an equation to find a figure far beyond the table. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
