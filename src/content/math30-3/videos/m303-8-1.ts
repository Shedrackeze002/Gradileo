import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from './lib/m303-8-figures.ts';

const video: Explainer = {
  id: 'm303-8-1',
  lessonId: 'm303-8-1',
  title: 'Buying a Vehicle, Part 1: The Price with Tax and Fees',
  thumbnailTitle: 'The Price with Tax and Fees',
  thumbnail: 'bar',
  summary: 'The total price of a vehicle is (price + fees) × 1.05 when a sales tax of 5% is charged on the price and the fees: a used truck at 24,800 dollars with a 499 dollar documentation fee costs 25,299 × 1.05 = 26,563.95 dollars. Multiplying by 1.05 adds the tax in one step, and leaving the fee out of the tax comes out 24.95 dollars short.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 1', title: 'The Price with Tax and Fees', subtitle: 'What a vehicle really costs to drive away' }],
      lines: [
        { say: 'The sticker on the windshield is only the start. By the time you add sales tax, fees, interest on a loan, insurance, fuel and repairs, a truck can cost far more than its price.', show: 'title' },
        { say: 'Knowing the real cost before you sign helps you buy a vehicle you can actually afford. In this video, you will find the total price of a vehicle, with a dealer’s fee and sales tax.' },
      ],
    },
    {
      chapter: 'Tax on the price and the fees',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Sales tax and fees', md: 'Many places charge a **sales tax** on a vehicle’s price, and on most dealer **fees**, such as a documentation fee for the paperwork. Rates differ from place to place and change over time, so every question states the rate to use.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{total price} = (\\text{price} + \\text{fees}) \\times 1.05'] },
        { kind: 'text', id: 't', size: 'md', md: 'for a sales tax of 5%' },
      ],
      lines: [
        { say: 'When you buy a vehicle, many places charge a sales tax on its price, and on most of the dealer’s fees. A common fee is a documentation fee, for doing the paperwork.', show: 'key' },
        { say: 'Tax rates differ from place to place, and they change over time, so every question tells you the rate to use. In this lesson, the sales tax is five percent.' },
        { say: 'Add the price and the fees, then multiply by 1.05. That gives the total price, with the tax included.', show: ['f', 't'], focus: 'f' },
      ],
    },
    {
      chapter: 'Why 1.05?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{amount} + 5\\% \\text{ of the amount}', '= 1 \\times \\text{amount} + 0.05 \\times \\text{amount}', '= 1.05 \\times \\text{amount}'] },
        { kind: 'text', id: 't', size: 'md', md: 'For example, \\$100 with 5% tax: $100 \\times 1.05 = 105$, or \\$105.' },
      ],
      lines: [
        { say: 'Why 1.05? You pay the amount itself, plus five percent of the amount as tax.', show: 'm.0', focus: 'm.0' },
        { say: 'The amount is one times the amount, and five percent of it is 0.05 times the amount.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, that is 1.05 times the amount. So multiplying by 1.05 adds the five percent tax in one step.', show: 'm.2', focus: 'm.2' },
        { say: 'For example, 100 dollars with five percent tax is 100 times 1.05, which is 105 dollars.', show: 't' },
      ],
    },
    {
      chapter: 'A used truck',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Owen is buying a used pickup truck for \\$24,800, plus a \\$499 documentation fee. A sales tax of 5% is charged on the price and the fee. What is the total price?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{price and fee: } 24{,}800 + 499 = 25{,}299', '\\text{with tax: } 25{,}299 \\times 1.05 = 26{,}563.95'] },
        figure('bar', [
          stackBar({
            width: 12,
            stretches: [
              { id: 'price', value: 24800, tone: 'adj', label: '\\text{price } \\$24{,}800' },
              { id: 'fee', value: 499, tone: 'theta', label: '\\text{fee}', place: 'below', shift: -0.6 },
              { id: 'tax', value: 1264.95, tone: 'opp', label: '\\text{tax}', place: 'below', shift: 0.6 },
            ],
            spans: [{ id: 'total', from: 0, to: 2, label: '\\text{total } \\$26{,}563.95', side: 'above' }],
            pad: 1,
          }),
        ], 250),
      ],
      lines: [
        { say: 'Owen is buying a used pickup truck for 24,800 dollars, plus a 499 dollar documentation fee. A sales tax of five percent is charged on the price and the fee. What is the total price?', show: 'p' },
        { say: 'First, add the price and the fee: 24,800 plus 499 is 25,299 dollars.', show: ['m.0', 'bar.price', 'bar.fee'], focus: 'm.0' },
        { say: 'Then multiply by 1.05 to add the tax: 25,299 times 1.05 is 26,563.95.', show: ['m.1', 'bar.tax'], focus: 'm.1' },
        { say: 'So the total price is 26,563 dollars and 95 cents.', show: 'bar.total', focus: 'bar.total' },
      ],
    },
    {
      chapter: 'The tax on its own',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{tax: } 25{,}299 \\times 0.05 = 1{,}264.95', '\\text{total: } 25{,}299 + 1{,}264.95 = 26{,}563.95'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: '0.05 or 1.05?', md: 'Multiplying by $0.05$ gives **only the tax**. Multiplying by $1.05$ gives the amount **with** the tax.' },
      ],
      lines: [
        { say: 'You can also find the tax on its own. Five percent of 25,299 is 25,299 times 0.05, which is 1,264.95.', show: 'm.0', focus: 'm.0' },
        { say: 'Add it to the price and the fee: 25,299 plus 1,264.95 is 26,563.95, the same total.', show: 'm.1', focus: 'm.1' },
        { say: 'Be careful which number you multiply by. Multiplying by 0.05 gives only the tax. Multiplying by 1.05 gives the amount with the tax included.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving the fee out of the tax', md: 'When the tax is charged on the price **and** the fee, add them first. Taxing only the price comes out short by the tax on the fee.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{24{,}800 \\times 1.05 + 499 = 26{,}539.00}', '\\good{(24{,}800 + 499) \\times 1.05 = 26{,}563.95}'] },
      ],
      lines: [
        { say: 'A common mistake is to add the tax to the price, and then add the fee afterwards.', show: 'oops' },
        { say: '24,800 times 1.05, plus 499, is 26,539 dollars. That is 24 dollars and 95 cents too low, because it leaves out the tax on the fee.', show: 'm.0', focus: 'm.0' },
        { say: 'When the tax is charged on the price and the fee, add them first, then multiply by 1.05.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A used car costs \\$15,600, plus a \\$350 documentation fee. A sales tax of 5% is charged on the price and the fee. What is the total price?',
          choices: ['\\$16,730.00', '\\$797.50', '\\$16,747.50', '\\$15,950.00'],
          answer: 2,
          working: '$15{,}600 + 350 = 15{,}950$, and $15{,}950 \\times 1.05 = 16{,}747.50$, so the total price is \\$16,747.50.',
        },
      ],
      lines: [
        { say: 'Your turn. A used car costs 15,600 dollars, plus a 350 dollar documentation fee. A sales tax of five percent is charged on the price and the fee. What is the total price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 16,747 dollars and fifty cents. The price and the fee add to 15,950, and 15,950 times 1.05 is 16,747.50. Choice A taxes only the price, and then adds the fee.', show: 'q.answer' },
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
          items: ['Every question states the sales tax rate; here it is 5%.', 'Total price $=$ (price $+$ fees) $\\times\\ 1.05$.', 'Multiplying by $0.05$ gives only the tax; by $1.05$, the amount with the tax.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sales tax rates differ from place to place, so every question tells you the rate. Here it is five percent.', show: 'sum.0' },
        { say: 'The total price is the price plus the fees, times 1.05.', show: 'sum.1' },
        { say: 'Multiplying by 0.05 gives only the tax, and multiplying by 1.05 gives the amount with the tax. In part two, we borrow to buy, and find what the loan costs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
