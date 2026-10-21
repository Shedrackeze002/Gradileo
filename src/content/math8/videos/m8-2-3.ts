import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from './lib/m8-2-figures.ts';

// 40 members is four groups of 10 (25% each); 50 members is one more group: a 25% increase.
const ten = { w: 2, tex: '10' };
const club = figure('b', [
  pieceBar({ name: 'last', at: [0, 2.8], pieces: [0, 1, 2, 3].map(() => ({ ...ten, below: '25\\%' })), label: '\\text{Last year: } 40' }),
  pieceBar({
    name: 'now',
    at: [0, 0],
    pieces: [ten, ten, ten, ten, { ...ten, tone: 'good' }],
    label: '\\text{This year: } 50',
    brackets: [{ id: 'up', from: 4, to: 4, tex: '+10', tone: 'good' }],
  }),
], 300);

const video: Explainer = {
  id: 'm8-2-3',
  lessonId: 'm8-2-3',
  title: 'Percent Change and Combined Percents, Part 1: Percent Increase and Decrease',
  thumbnailTitle: 'Percent Increase and Decrease',
  thumbnail: 'b',
  summary:
    'A percent increase or decrease compares the amount of change with the original amount: percent change = amount of change ÷ original amount × 100%. A chess club grows from 40 to 50 members: 10 ÷ 40 = 0.25, a 25% increase. Always divide by the original amount: 10 ÷ 50 = 20% is wrong. Going back down from 50 to 40 is a 20% decrease, because now the original amount is 50.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 1', title: 'Percent Increase and Decrease', subtitle: 'Compare the change with the original' }],
      lines: [
        { say: 'Prices go up and down. Teams score more goals one season than the last. Clubs gain and lose members. Percents help you describe changes like these.', show: 'title' },
        { say: 'In this lesson, you will find percent changes, and work out discounts and sales tax. This first part is about percent increase and percent decrease.' },
      ],
    },
    {
      chapter: 'What percent change means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent increase and percent decrease', md: 'A **percent increase** tells how much an amount grew, compared with the **original amount**. A **percent decrease** tells how much it shrank, compared with the original amount.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{percent change} = \\dfrac{\\text{amount of change}}{\\text{original amount}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'A percent increase tells how much an amount grew, compared with the original amount. The original amount is the amount you started with.', show: 'def' },
        { say: 'A percent decrease tells how much an amount shrank, compared with the original amount.' },
        { say: 'To find either one, divide the amount of change by the original amount. Then multiply by one hundred percent.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A chess club grows',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A chess club had $40$ members last year and has $50$ members this year. What is the percent increase?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{change: } 50 - 40 = 10', '\\dfrac{10}{40} = 0.25', '0.25 \\times 100\\% = 25\\%'] },
      ],
      lines: [
        { say: 'A chess club had forty members last year, and has fifty members this year. What is the percent increase?', show: 'q' },
        { say: 'First, find the amount of change: fifty minus forty is ten. The club grew by ten members.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the original amount, last year’s forty. Ten over forty is zero point two five.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply by one hundred percent: twenty-five percent. The club grew by twenty-five percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Why it is 25%',
      layout: 'center',
      main: [club],
      lines: [
        { say: 'The bars show why. Last year’s forty members make four groups of ten.', show: ['b.last-p0', 'b.last-p1', 'b.last-p2', 'b.last-p3', 'b.last-label'] },
        { say: 'Each group is one out of four, which is a quarter, or twenty-five percent, of the original amount.', show: ['b.last-below0', 'b.last-below1', 'b.last-below2', 'b.last-below3'] },
        { say: 'This year there is one more group of ten. One more group out of the original four is twenty-five percent more.', show: ['b.now-p0', 'b.now-p1', 'b.now-p2', 'b.now-p3', 'b.now-p4', 'b.now-label', 'b.now-up'], focus: ['b.now-p4', 'b.now-up'] },
      ],
    },
    {
      chapter: 'Divide by the original amount',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Divide by the original amount', md: 'Always divide by the amount you **started with**, not the new amount.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{10}{40} = 25\\% \\ \\good{\\checkmark}', '\\bad{\\dfrac{10}{50} = 20\\%}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Always divide by the amount you started with, not the new amount.', show: 'oops' },
        { say: 'From forty to fifty is a twenty-five percent increase, because ten over forty is twenty-five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'It is not ten over fifty, which is twenty percent. Fifty is the new amount, not the amount you started with.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A percent decrease',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A library had $50$ visitors on Monday and $40$ visitors on Tuesday. What is the percent decrease?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{change: } 50 - 40 = 10', '\\dfrac{10}{50} = 0.2 = 20\\%'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The original amount matters', md: '$40$ to $50$ is a $25\\%$ increase, but $50$ to $40$ is a $20\\%$ decrease.' },
      ],
      lines: [
        { say: 'Now a decrease. A library had fifty visitors on Monday, and forty visitors on Tuesday. What is the percent decrease?', show: 'q' },
        { say: 'The amount of change is ten. This time, the original amount is fifty, Monday’s number.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten over fifty is zero point two, which is twenty percent. The number of visitors went down by twenty percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice: forty to fifty is a twenty-five percent increase, but fifty to forty is only a twenty percent decrease. The change is ten both times, but the original amount is different.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A club had $25$ members last year and has $30$ members this year. What is the percent increase?',
          choices: ['$5\\%$', '$16.7\\%$', '$20\\%$', '$120\\%$'],
          answer: 2,
          working: 'The change is $30 - 25 = 5$. Divide by the original amount: $\\dfrac{5}{25} = 0.2 = 20\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A club had twenty-five members last year, and has thirty members this year. What is the percent increase? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty percent. The change is five, and five over the original twenty-five is zero point two, or twenty percent. Choice B divides by the new amount, thirty, instead of the original amount.', show: 'q.answer' },
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
            'Percent change $= \\dfrac{\\text{amount of change}}{\\text{original amount}} \\times 100\\%$.',
            '$40$ to $50$: $\\dfrac{10}{40} = 25\\%$ increase.',
            'Always divide by the **original** amount: $50$ to $40$ is a $20\\%$ decrease.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a percent change, divide the amount of change by the original amount, then multiply by one hundred percent.', show: 'sum.0' },
        { say: 'Forty to fifty is a twenty-five percent increase.', show: 'sum.1' },
        { say: 'Always divide by the original amount, the amount you started with. In the next part, you will find a percent change that needs rounding. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
