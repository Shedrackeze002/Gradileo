import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from './lib/m8-2-figures.ts';

// 135% of the $2,400 goal: the goal (100%) and 35% more.
const goal = figure('b', [
  pieceBar({
    pieces: [
      { w: 10, tex: '\\text{goal: \\$2,400}', below: '100\\%' },
      { w: 3.5, tex: '\\text{more}', tone: 'good', below: '35\\%' },
    ],
    brackets: [{ id: 'all', from: 0, to: 1, tex: '135\\% \\text{ of the goal}', tone: 'good' }],
  }),
], 260);

const video: Explainer = {
  id: 'm8-2-2-d',
  lessonId: 'm8-2-2',
  title: 'Percent of a Number, Part 4: Solving Problems',
  thumbnailTitle: 'Percent Problems',
  thumbnail: 'b',
  summary:
    'Hana puts $1,200 in a savings account that pays 0.75% interest per year: 0.75% = 0.0075 and 0.0075 × 1,200 = 9, so Hana earns $9.00 in a year (a bit less than 1%, which is $12). A class sets a goal of $2,400 and raises 135% of it: 1.35 × 2,400 = 3,240, so they raise $3,240.00, which is $840.00 over the goal (35% of $2,400).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 4', title: 'Solving Problems', subtitle: 'Savings and fundraising' }],
      lines: [
        { say: 'Savings accounts and fundraising both use percents, and the percents are often more than one hundred, or less than one.', show: 'title' },
        { say: 'In this part, you will solve two problems with money, estimating first and then finding the exact answer.' },
      ],
    },
    {
      chapter: 'Interest on savings',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Hana puts \\$1,200 in a savings account that pays $0.75\\%$ interest per year. How much interest does Hana earn in one year?' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interest', md: '**Interest** is money a bank pays you for keeping your savings there. It is a percent of the amount you save.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 1\\% \\text{ of } 1{,}200 = 12'] },
      ],
      lines: [
        { say: 'Hana puts one thousand two hundred dollars in a savings account. The account pays zero point seven five percent interest per year. How much interest does Hana earn in one year?', show: 'q' },
        { say: 'Interest is money that a bank pays you for keeping your savings there. It is a percent of the amount you save.', show: 'def' },
        { say: 'Estimate first. One percent of one thousand two hundred dollars is twelve dollars. Zero point seven five percent is a bit less than one percent, so the interest is a bit less than twelve dollars.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Finding the interest',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.75\\% = 0.75 \\div 100 = 0.0075', '0.0075 \\times 1{,}200 = 9'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Hana earns **\\$9.00** in interest.' },
      ],
      lines: [
        { say: 'Change the percent to a decimal. Zero point seven five percent is zero point seven five divided by one hundred, which is zero point zero zero seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply: zero point zero zero seven five times one thousand two hundred is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Hana earns nine dollars in interest. That is a bit less than twelve dollars, just as the estimate said.', show: 'a' },
      ],
    },
    {
      chapter: 'Beating a goal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A class sets a goal of \\$2,400 for a class trip. They raise $135\\%$ of their goal. How much do they raise? How much over the goal is that?' },
        goal,
      ],
      lines: [
        { say: 'A class sets a goal of two thousand four hundred dollars for a class trip. They raise one hundred thirty-five percent of their goal. How much do they raise? And how much over the goal is that?', show: 'q' },
        { say: 'One hundred thirty-five percent is more than one hundred percent, so they raised more than their goal. It is the whole goal, one hundred percent, plus thirty-five percent more.', show: ['b.p0', 'b.below0', 'b.below1', 'b.p1'] },
        { say: 'Together, the two pieces make one hundred thirty-five percent of the goal. Let’s find the exact amounts.', show: 'b.all', focus: 'b.all' },
      ],
    },
    {
      chapter: 'How much over?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['135\\% = 1.35', '1.35 \\times 2{,}400 = 3{,}240', '3{,}240 - 2{,}400 = 840'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'They raise **\\$3,240.00**, which is **\\$840.00** over their goal.' },
      ],
      lines: [
        { say: 'One hundred thirty-five percent is one point three five.', show: 'm.0', focus: 'm.0' },
        { say: 'One point three five times two thousand four hundred is three thousand two hundred forty. They raise three thousand two hundred forty dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'To find how much over the goal, subtract: three thousand two hundred forty minus two thousand four hundred is eight hundred forty. That is eight hundred forty dollars over their goal.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'Another way to see it: they went thirty-five percent over. Thirty-five percent of two thousand four hundred dollars is also eight hundred forty dollars.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A savings account pays $0.5\\%$ interest per year. How much interest does \\$3,000 earn in one year?',
          choices: ['\\$1.50', '\\$15.00', '\\$150.00', '\\$1,500.00'],
          answer: 1,
          working: '$0.5\\% = 0.005$, and $0.005 \\times 3{,}000 = 15$, so the interest is \\$15.00. Check: $1\\%$ of \\$3,000 is \\$30, and half of that is \\$15.',
        },
      ],
      lines: [
        { say: 'Your turn. A savings account pays zero point five percent interest per year. How much interest does three thousand dollars earn in one year? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, fifteen dollars. One percent of three thousand dollars is thirty dollars, and zero point five percent is half of that. Choice D, one thousand five hundred dollars, is fifty percent of three thousand dollars, not zero point five percent.', show: 'q.answer' },
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
            'Estimate first, using $1\\%$, $50\\%$ or $100\\%$.',
            'Change the percent to a decimal, then multiply: $0.0075 \\times 1{,}200 = 9$.',
            'More than $100\\%$ of a goal is more than the goal: $135\\%$ of \\$2,400 is \\$3,240.',
            'Subtract to find how much more or less.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Estimate first, using easy percents like one percent, fifty percent or one hundred percent.', show: 'sum.0' },
        { say: 'Then change the percent to a decimal and multiply.', show: 'sum.1' },
        { say: 'More than one hundred percent of a goal is more than the goal.', show: 'sum.2' },
        { say: 'And subtract to find how much over or under. In the next lesson, you will work with percents that change, like discounts and sales tax. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
