import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueBars } from './lib/m303-8-figures.ts';

/** The SUV's value now and after 1, 2 and 3 years, losing 15% a year. */
const bars = (id: string, losses: boolean) =>
  figure(
    id,
    [
      valueBars({
        max: 38500,
        width: 8,
        gap: 1.5,
        bars: [
          { name: '\\text{new}', value: 38500, tex: '\\$38{,}500' },
          { name: '\\text{1 year}', value: 32725, tex: '\\$32{,}725' },
          { name: '\\text{2 years}', value: 27816.25, tex: '\\$27{,}816.25' },
          { name: '\\text{3 years}', value: 23643.81, tex: '\\$23{,}643.81' },
        ],
        ...(losses ? { losses: ['-5{,}775', '-4{,}908.75', '-4{,}172.44'] } : {}),
      }),
    ],
    400,
  );

const video: Explainer = {
  id: 'm303-8-1-c',
  lessonId: 'm303-8-1',
  title: 'Buying a Vehicle, Part 3: Depreciation',
  thumbnailTitle: 'Depreciation',
  thumbnail: 'v',
  summary: 'Depreciation is the loss in a vehicle’s value over time. When a vehicle loses a stated percent each year, its value after t years is price × (1 − r)^t: a 38,500 dollar SUV losing 15% a year keeps 85% each year and is worth 38,500 × 0.85³ ≈ 23,643.81 dollars after 3 years. Each year’s loss is smaller, so subtracting 15% of the original price three times is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 3', title: 'Depreciation', subtitle: 'How a vehicle loses value' }],
      lines: [
        { say: 'A new vehicle starts losing value the day you drive it away. After a few years, it may be worth a little over half of what you paid.', show: 'title' },
        { say: 'In this video, you will find what a vehicle is worth after a few years, when it loses the same percent of its value each year.' },
      ],
    },
    {
      chapter: 'Depreciation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Depreciation', md: '**Depreciation** is the loss in a vehicle’s value over time. Here, a vehicle loses a stated percent of its value **each year**, so each year’s value is a percent of the year before.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{value after } t \\text{ years} = \\text{price} \\times (1 - r)^t'] },
        { kind: 'text', id: 't', size: 'md', md: '$r$ is the yearly rate of depreciation, written as a decimal.' },
      ],
      lines: [
        { say: 'Depreciation is the loss in a vehicle’s value over time.', show: 'def' },
        { say: 'In this lesson, a vehicle loses a stated percent of its value each year. So each year, its value is a percent of what it was worth the year before, not of the original price.' },
        { say: 'The value after t years is the price, times one minus r, to the power t. Here r stands for the yearly rate of depreciation, written as a decimal.', show: ['f', 't'], focus: 'f' },
      ],
    },
    {
      chapter: 'A new SUV',
      layout: 'split',
      leftWidth: 520,
      left: [bars('v', false)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Jordan buys a new compact SUV for \\$38,500 before tax. Suppose it loses 15% of its value each year. What is it worth after 3 years?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{keep } 85\\% = 0.85', '38{,}500 \\times 0.85 = 32{,}725', '32{,}725 \\times 0.85 = 27{,}816.25', '27{,}816.25 \\times 0.85 \\approx 23{,}643.81'],
        },
      ],
      lines: [
        { say: 'Jordan buys a new compact SUV for 38,500 dollars, before tax. Suppose it loses fifteen percent of its value each year. What is it worth after three years?', show: ['p', 'v.base', 'v.b0', 'v.v0'] },
        { say: 'Losing fifteen percent means keeping eighty-five percent. So each year, multiply the value by 0.85.', show: 'm.0', focus: 'm.0' },
        { say: 'After one year: 38,500 times 0.85 is 32,725 dollars.', show: ['m.1', 'v.b1', 'v.v1'], focus: ['m.1', 'v.b1'] },
        { say: 'After two years: 32,725 times 0.85 is 27,816.25.', show: ['m.2', 'v.b2', 'v.v2'], focus: ['m.2', 'v.b2'] },
        { say: 'After three years: 27,816.25 times 0.85 is 23,643.8125, which rounds to 23,643.81.', show: ['m.3', 'v.b3', 'v.v3'], focus: ['m.3', 'v.b3'] },
      ],
    },
    {
      chapter: 'In one step',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['38{,}500 \\times 0.85 \\times 0.85 \\times 0.85 = 38{,}500 \\times 0.85^3', '38{,}500 \\times 0.614125 = 23{,}643.8125 \\approx 23{,}643.81', '\\text{value lost: } 38{,}500 - 23{,}643.81 = 14{,}856.19'] },
      ],
      lines: [
        { say: 'You multiplied by 0.85 three times. That is the same as multiplying by 0.85 cubed, so you can do it in one step.', show: 'm.0', focus: 'm.0' },
        { say: '0.85 cubed is 0.614125, and 38,500 times 0.614125 is 23,643.8125. That is the same answer: about 23,643 dollars and 81 cents.', show: 'm.1', focus: 'm.1' },
        { say: 'So after three years, the SUV has lost 38,500 minus 23,643.81, which is 14,856 dollars and 19 cents in value.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Each loss is smaller',
      layout: 'split',
      leftWidth: 620,
      left: [bars('v2', true)],
      right: [
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'Each year the SUV loses 15% of a **smaller** value, so it loses fewer dollars.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5{,}775 + 4{,}908.75 + 4{,}172.44', '= 14{,}856.19'] },
      ],
      lines: [
        { say: 'Look at how much value the SUV loses each year. In the first year, it loses 38,500 minus 32,725, which is 5,775 dollars.', show: ['v2.base', 'v2.b0', 'v2.v0', 'v2.b1', 'v2.v1', 'v2.l1', 't'], focus: 'v2.l1' },
        { say: 'In the second year, it loses only 4,908.75, and in the third year, 4,172.44.', show: ['v2.b2', 'v2.v2', 'v2.l2', 'v2.b3', 'v2.v3', 'v2.l3'], focus: ['v2.l2', 'v2.l3'] },
        { say: 'Each year, the SUV loses fifteen percent of a smaller value, so it loses fewer dollars. The three losses add up to 14,856.19, the total value lost.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking 15% of the original price every year', md: '15% of \\$38,500 is \\$5,775, but the SUV does **not** lose \\$5,775 every year. In the second year it loses 15% of \\$32,725, which is less.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{38{,}500 - 3 \\times 5{,}775 = 21{,}175}', '\\good{38{,}500 \\times 0.85^3 \\approx 23{,}643.81}'] },
      ],
      lines: [
        { say: 'A common mistake is to take fifteen percent of the original price, and subtract it every year.', show: 'oops' },
        { say: 'Fifteen percent of 38,500 is 5,775. Subtracting that three times gives 21,175 dollars, which is too low.', show: 'm.0', focus: 'm.0' },
        { say: 'After the first year, each fifteen percent is taken from a smaller value. So multiply by 0.85 each year instead.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A truck costs \\$42,000. Suppose it loses 20% of its value each year. What is it worth after 2 years?',
          choices: ['\\$25,200.00', '\\$8,400.00', '\\$33,600.00', '\\$26,880.00'],
          answer: 3,
          working: 'Losing 20% means keeping 80%: $42{,}000 \\times 0.80^2 = 42{,}000 \\times 0.64 = 26{,}880.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. A truck costs 42,000 dollars. Suppose it loses twenty percent of its value each year. What is it worth after two years? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 26,880 dollars. Losing twenty percent means keeping eighty percent, so multiply by 0.8 twice: 42,000 times 0.64 is 26,880. Choice A subtracts twenty percent of the original price twice.', show: 'q.answer' },
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
            'Depreciation is the loss in value over time.',
            'Value after $t$ years $=$ price $\\times\\ (1 - r)^t$: losing 15% means multiplying by $0.85$ each year.',
            'Do not take the same dollar amount off each year.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Depreciation is the loss in a vehicle’s value over time.', show: 'sum.0' },
        { say: 'When a vehicle loses a percent of its value each year, multiply by one minus the rate, once for each year. Losing fifteen percent means multiplying by 0.85.', show: 'sum.1' },
        { say: 'And do not take the same dollar amount off each year: each year’s loss is smaller than the last. In part four, we add up the costs of running a vehicle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
