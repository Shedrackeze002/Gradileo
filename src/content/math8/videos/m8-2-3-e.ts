import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cellGrid } from './lib/m8-2-figures.ts';

// All the students as a hundred grid: 60 squares (60%) take the bus.
const bus = figure('g', [cellGrid({ blocks: [{ id: 'bus', c0: 0, r0: 0, c1: 10, r1: 6 }], label: '60\\% \\text{ take the bus}', labelTone: 'adj' })], 440);

// The 60 bus squares split into four equal blocks of 15; one block (15%) rides more than 30 minutes.
const quarter = figure('g', [
  cellGrid({
    blocks: [
      { id: 'q1', c0: 0, r0: 0, c1: 5, r1: 3, tone: 'opp' },
      { id: 'q2', c0: 5, r0: 0, c1: 10, r1: 3 },
      { id: 'q3', c0: 0, r0: 3, c1: 5, r1: 6 },
      { id: 'q4', c0: 5, r0: 3, c1: 10, r1: 6 },
    ],
    dividers: [
      { id: 'v', c0: 5, r0: 0, c1: 5, r1: 6 },
      { id: 'h', c0: 0, r0: 3, c1: 10, r1: 3 },
    ],
    label: '15 \\text{ of } 100 \\text{ squares} = 15\\%',
    labelTone: 'opp',
  }),
], 440);

const video: Explainer = {
  id: 'm8-2-3-e',
  lessonId: 'm8-2-3',
  title: 'Percent Change and Combined Percents, Part 5: A Percent of a Percent',
  thumbnailTitle: 'A Percent of a Percent',
  thumbnail: 'g',
  summary:
    'At a school with 500 students, 60% take the bus, and 25% of those ride for more than 30 minutes. In a hundred grid, the 60 bus squares split into four blocks of 15, so one quarter of them is 15 squares: 15% of all the students. With decimals, 25% of 60% is 0.25 × 0.60 = 0.15 = 15%, and 15% of 500 is 0.15 × 500 = 75 students (check: 60% of 500 is 300, and a quarter of 300 is 75). To find a percent of a percent, multiply the decimals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 5', title: 'A Percent of a Percent', subtitle: 'Multiply the decimals' }],
      lines: [
        { say: 'Sixty percent of the students at a school take the bus. Of those, twenty-five percent ride for more than thirty minutes. What percent of all the students is that?', show: 'title' },
        { say: 'In this part, you will find a percent of a percent, with a picture and with decimals.' },
      ],
    },
    {
      chapter: 'Sixty percent take the bus',
      layout: 'split',
      leftWidth: 520,
      left: [bus],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At a school with $500$ students, $60\\%$ take the bus. Of those, $25\\%$ ride for more than $30$ minutes. What percent of **all** the students ride for more than $30$ minutes? How many students is that?' },
      ],
      lines: [
        { say: 'At a school with five hundred students, sixty percent take the bus. Of those, twenty-five percent ride for more than thirty minutes.', show: 'q' },
        { say: 'What percent of all the students ride for more than thirty minutes? And how many students is that?' },
        { say: 'Let the hundred grid stand for all the students. Sixty squares are shaded for the sixty percent who take the bus.', show: ['g.lines', 'g.frame', 'g.bus', 'g.label'] },
      ],
    },
    {
      chapter: '25% of those',
      layout: 'split',
      leftWidth: 520,
      left: [quarter],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['25\\% \\text{ of } 60\\%', '0.25 \\times 0.60 = 0.15', '0.15 = 15\\%'] }],
      lines: [
        { say: 'Twenty-five percent is one quarter. So split the sixty bus squares into four equal blocks. Each block is fifteen squares.', show: ['g.lines', 'g.frame', 'g.q1', 'g.q2', 'g.q3', 'g.q4', 'g.v', 'g.h'] },
        { say: 'One block, fifteen squares, stands for the students who ride for more than thirty minutes.', focus: 'g.q1' },
        { say: 'Fifteen squares out of one hundred is fifteen percent of all the students.', show: 'g.label' },
        { say: 'With decimals: twenty-five percent of sixty percent is zero point two five times zero point six zero, which is zero point one five. That is fifteen percent.', show: ['m.0', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'How many students?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['15\\% \\text{ of } 500 = 0.15 \\times 500 = 75', '\\text{Check: } 60\\% \\text{ of } 500 = 300, \\quad \\tfrac{1}{4} \\text{ of } 300 = 75'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$15\\%$ of all the students, or $75$ students, ride for more than $30$ minutes.' },
      ],
      lines: [
        { say: 'Now find how many students that is. Fifteen percent of five hundred is zero point one five times five hundred, which is seventy-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Check another way. Sixty percent of five hundred is three hundred bus riders, and a quarter of three hundred is seventy-five. The same answer!', show: 'm.1', focus: 'm.1' },
        { say: 'So fifteen percent of all the students, or seventy-five students, ride the bus for more than thirty minutes.', show: 'a' },
      ],
    },
    {
      chapter: 'Multiply the decimals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A percent of a percent', md: 'To find a percent of a percent, write both as decimals and **multiply**. Do not add or subtract them.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['25\\% \\text{ of } 60\\% = 0.25 \\times 0.60 = 15\\%', '\\bad{\\text{not } 25\\% + 60\\% = 85\\%}'] },
      ],
      lines: [
        { say: 'To find a percent of a percent, write both percents as decimals, and multiply.', show: 'key' },
        { say: 'Twenty-five percent of sixty percent is fifteen percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Do not add them. Eighty-five percent would be more than the sixty percent who take the bus at all, which makes no sense.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a class, $40\\%$ of the students play a sport. Of those, $50\\%$ play basketball. What percent of the whole class plays basketball?',
          choices: ['$90\\%$', '$20\\%$', '$10\\%$', '$2\\%$'],
          answer: 1,
          working: '$50\\%$ of $40\\%$ is $0.5 \\times 0.4 = 0.2$, which is $20\\%$ of the whole class.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class, forty percent of the students play a sport. Of those, fifty percent play basketball. What percent of the whole class plays basketball? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty percent. Fifty percent of forty percent is zero point five times zero point four, which is zero point two. Choice A adds the percents, but the fifty percent is only of the students who play a sport.', show: 'q.answer' },
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
            'Percent change: divide the change by the **original** amount.',
            'A discount, then tax: take the discount off first, then find the tax on the sale price.',
            'Two discounts in a row give less than the sum of the percents.',
            'A percent of a percent: multiply the decimals. $25\\%$ of $60\\%$ is $15\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up this lesson. To find a percent change, divide the amount of change by the original amount.', show: 'sum.0' },
        { say: 'For a discount and then tax, take the discount off first, then find the tax on the sale price.', show: 'sum.1' },
        { say: 'Two discounts in a row give less than the two percents added together.', show: 'sum.2' },
        { say: 'And to find a percent of a percent, multiply the decimals. Twenty-five percent of sixty percent is fifteen percent. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
