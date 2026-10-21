import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from './lib/m8-2-figures.ts';

// $80 in four pieces of $20 (25% each): one piece comes off, leaving $60; then 5% tax, $3, goes on.
const twenty = { w: 3, tex: '\\text{\\$20}' };
const jacket = figure('b', [
  pieceBar({
    name: 'reg',
    at: [0, 3.4],
    pieces: [twenty, twenty, twenty, { ...twenty, removed: true }],
    label: '\\text{Regular: \\$80}',
    brackets: [{ id: 'off', from: 3, to: 3, tex: '25\\% \\text{ off}', tone: 'bad' }],
  }),
  pieceBar({
    name: 'sale',
    at: [0, 0],
    pieces: [twenty, twenty, twenty, { w: 0.45, tone: 'opp' }],
    label: '\\text{Sale: \\$60}',
    brackets: [{ id: 'tax', from: 3, to: 3, tex: '5\\% \\text{ tax} = \\text{\\$3}', tone: 'opp' }],
  }),
], 370);

const video: Explainer = {
  id: 'm8-2-3-c',
  lessonId: 'm8-2-3',
  title: 'Percent Change and Combined Percents, Part 3: A Discount, Then Sales Tax',
  thumbnailTitle: 'A Discount, Then Sales Tax',
  thumbnail: 'b',
  summary:
    'A discount is taken off the regular price to give the sale price; a sales tax is a percent of the price you pay, added on. Take the discount off first, then find the tax on the sale price. A jacket with a regular price of $80, on sale for 25% off with a 5% sales tax: the discount is 0.25 × 80 = $20, the sale price is $60, the tax is 0.05 × 60 = $3, and the total is $63.00. Round money to the nearest cent at each step.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 3', title: 'A Discount, Then Sales Tax', subtitle: 'What you really pay' }],
      lines: [
        { say: 'Stores often take money off the price in a sale, and then add sales tax when you pay. So what do you really pay?', show: 'title' },
        { say: 'In this part, you will take off a discount first, and then add sales tax on the sale price.' },
      ],
    },
    {
      chapter: 'Discount and sales tax',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'disc', tone: 'definition', title: 'Discount', md: 'A **discount** is an amount taken off the **regular price**. The price after the discount is the **sale price**.' },
        { kind: 'callout', id: 'tax', tone: 'definition', title: 'Sales tax', md: 'A **sales tax** is an extra amount added on when you buy something. It is a percent of the price you pay. Each question tells you the rate to use.' },
      ],
      lines: [
        { say: 'A discount is an amount taken off the regular price. The price after the discount is called the sale price.', show: 'disc' },
        { say: 'A sales tax is an extra amount added on when you buy something. It is a percent of the price you pay.', show: 'tax' },
        { say: 'The tax rate is different in different places, so each question tells you the rate to use.' },
      ],
    },
    {
      chapter: 'A jacket on sale',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A jacket has a regular price of \\$80. It is on sale for $25\\%$ off, and a $5\\%$ sales tax is added to the sale price. What is the total cost?' },
        jacket,
      ],
      lines: [
        { say: 'A jacket has a regular price of eighty dollars. It is on sale for twenty-five percent off, and a five percent sales tax is added to the sale price. What is the total cost?', show: 'q' },
        { say: 'Take the discount off first. Twenty-five percent is one quarter, so cut the eighty dollar price into four equal pieces of twenty dollars.', show: ['b.reg-p0', 'b.reg-p1', 'b.reg-p2', 'b.reg-p3', 'b.reg-label'] },
        { say: 'The discount is one piece, twenty dollars. Take it away, and the sale price is sixty dollars.', show: 'b.reg-off', focus: ['b.reg-p3', 'b.reg-off'] },
        { say: 'Then the tax goes on top of the sale price. Five percent of sixty dollars is a small piece: three dollars.', show: ['b.sale-p0', 'b.sale-p1', 'b.sale-p2', 'b.sale-p3', 'b.sale-label', 'b.sale-tax'], focus: ['b.sale-p3', 'b.sale-tax'] },
      ],
    },
    {
      chapter: 'The total cost',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Discount: } 0.25 \\times 80 = 20', '\\text{Sale price: } 80 - 20 = 60', '\\text{Tax: } 0.05 \\times 60 = 3', '\\text{Total: } 60 + 3 = 63'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The total cost is **\\$63.00**.' },
      ],
      lines: [
        { say: 'Here is the working. The discount is zero point two five times eighty, which is twenty dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The sale price is eighty minus twenty, which is sixty dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The tax is five percent of the sale price, not the regular price. Zero point zero five times sixty is three dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'Add it on: sixty plus three is sixty-three. The total cost is sixty-three dollars.', show: ['m.3', 'a'], focus: 'm.3' },
        { say: 'If you found the tax on the regular price instead, you would pay four dollars of tax, not three. So take the discount off first.' },
      ],
    },
    {
      chapter: 'Round to the nearest cent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round money to the nearest cent', md: 'When a money amount has more than two decimal places, round it to the nearest cent at each step, the way a cash register does.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.05 \\times 19.99 = 0.9995 \\approx 1.00', '19.99 + 1.00 = 20.99'] },
      ],
      lines: [
        { say: 'Money only goes to the cent, which is two decimal places. When an amount has more decimal places, round it to the nearest cent at each step, the way a cash register does.', show: 'tip' },
        { say: 'For example, a five percent tax on nineteen dollars and ninety-nine cents is zero point nine nine nine five dollars. To the nearest cent, that is one dollar.', show: 'm.0', focus: 'm.0' },
        { say: 'So the total is twenty dollars and ninety-nine cents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Shoes have a regular price of \\$60. They are on sale for $20\\%$ off, and a $10\\%$ sales tax is added to the sale price. What is the total cost?',
          choices: ['\\$54.00', '\\$48.00', '\\$43.20', '\\$52.80'],
          answer: 3,
          working: 'Discount: $0.20 \\times 60 = 12$, so the sale price is \\$48. Tax: $0.10 \\times 48 = 4.80$. Total: $48 + 4.80 = 52.80$, so \\$52.80.',
        },
      ],
      lines: [
        { say: 'Your turn. Shoes have a regular price of sixty dollars. They are on sale for twenty percent off, and a ten percent sales tax is added to the sale price. What is the total cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fifty-two dollars and eighty cents. Twenty percent of sixty dollars is twelve dollars, so the sale price is forty-eight dollars. Ten percent of forty-eight dollars is four dollars and eighty cents. Choice A finds the tax on the regular price instead of the sale price.', show: 'q.answer' },
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
            'Take the **discount** off the regular price first: that gives the sale price.',
            'Find the **sales tax** on the sale price, then add it on.',
            'Jacket: \\$80, $25\\%$ off is \\$60, plus $5\\%$ tax of \\$3, is \\$63.00.',
            'Round money to the nearest cent at each step.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Take the discount off the regular price first. That gives the sale price.', show: 'sum.0' },
        { say: 'Then find the sales tax on the sale price, and add it on.', show: 'sum.1' },
        { say: 'The jacket costs sixty-three dollars in total.', show: 'sum.2' },
        { say: 'And round money to the nearest cent at each step. In the next part, you will see what happens with two discounts in a row. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
