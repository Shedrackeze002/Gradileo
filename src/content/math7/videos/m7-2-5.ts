import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The price of the hoodie split into the discount (25%) and the sale price (75%).
const hoodie = figure('br', [
  bars({
    rows: [
      {
        id: 'r',
        pieces: [
          { w: 3, tex: '\\text{discount } 25\\%', tone: 'bad' },
          { w: 9, tex: '\\text{sale price } 75\\%', tone: 'good' },
        ],
      },
    ],
    total: '\\text{price } \\$59.99 = 100\\%',
  }),
], 240);

const video: Explainer = {
  id: 'm7-2-5',
  lessonId: 'm7-2-5',
  title: 'Solving Percent Problems, Part 1: Discounts',
  thumbnailTitle: 'Discounts',
  thumbnail: 'br',
  summary:
    'A discount is the amount taken off a price, and the sale price is the price minus the discount. A $59.99 hoodie at 25% off has a discount of 0.25 × 59.99 = 14.9975, which rounds to $15.00, so the sale price is $44.99 (estimate: a quarter of $60 is $15, so about $45). Another way: pay 75% of the price, 0.75 × 59.99 ≈ $44.99. The discount is what you save, not what you pay.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 1', title: 'Discounts', subtitle: 'The amount taken off' }],
      lines: [
        { say: 'Twenty-five percent off! Plus tax. Add a fifteen percent tip. Percents are everywhere when you shop or eat out.', show: 'title' },
        { say: 'In this lesson, you will solve problems with discounts, sales tax, tips and test scores. Money answers are rounded to the nearest cent. This first part is about discounts.' },
      ],
    },
    {
      chapter: 'Discount and sale price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Discount', md: 'A **discount** is the amount taken off a price. The **sale price** is the price after the discount: sale price $=$ price $-$ discount.' },
        hoodie,
      ],
      lines: [
        { say: 'When a store has a sale, it takes some money off the price. The amount taken off is called the discount.', show: 'def' },
        { say: 'The sale price is what you pay after the discount. Sale price equals price minus discount.' },
        { say: 'Here is a picture. The whole bar is the full price, which is one hundred percent. Twenty-five percent off means the discount is twenty-five percent of the price.', show: ['br.r-p0', 'br.r-p1', 'br.total'], focus: 'br.r-p0' },
        { say: 'What is left is the sale price: one hundred percent minus twenty-five percent, which is seventy-five percent of the price.', focus: 'br.r-p1' },
      ],
    },
    {
      chapter: 'A hoodie on sale',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A hoodie costs \\$59.99. It is on sale for $25\\%$ off. What is the sale price, to the nearest cent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } \\tfrac14 \\text{ of } 60 = 15, \\quad 60 - 15 = 45', '\\text{Discount: } 0.25 \\times 59.99 = 14.99\\opp{7}5 \\approx 15.00', '\\text{Sale price: } 59.99 - 15.00 = 44.99'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The sale price is **\\$44.99**.' },
      ],
      lines: [
        { say: 'A hoodie costs fifty-nine dollars and ninety-nine cents. It is on sale for twenty-five percent off. What is the sale price, to the nearest cent?', show: 'q' },
        { say: 'Estimate first. Twenty-five percent is one quarter. The price is about sixty dollars, and a quarter of sixty is fifteen. So the sale price is about forty-five dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the discount. Twenty-five percent is zero point two five, so multiply: zero point two five times fifty-nine point nine nine is fourteen point nine nine seven five.', show: 'm.1', focus: 'm.1' },
        { say: 'Round to the nearest cent, two decimal places. The next digit is seven, so round up. Fourteen point nine nine becomes fifteen point zero zero. The discount is fifteen dollars.' },
        { say: 'Sale price: fifty-nine dollars and ninety-nine cents, minus fifteen dollars, leaves forty-four dollars and ninety-nine cents. That matches the estimate of about forty-five.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Another way',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Another way', md: 'With $25\\%$ off, you pay $100\\% - 25\\% = 75\\%$ of the price.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.75 \\times 59.99 = 44.9925 \\approx 44.99'] },
      ],
      lines: [
        { say: 'Here is another way. With twenty-five percent off, you still pay the rest of the price: one hundred percent minus twenty-five percent, which is seventy-five percent.', show: 'tip' },
        { say: 'So multiply the price by zero point seven five. Zero point seven five times fifty-nine point nine nine is forty-four point nine nine two five, which rounds to forty-four dollars and ninety-nine cents. The same answer, in one step!', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The discount is not the price you pay', md: 'The discount (\\$15.00) is the amount you **save**. Subtract it from the price to get what you pay (\\$44.99).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{You save: } 15.00', '\\text{You pay: } 59.99 - 15.00 = 44.99'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. After working out twenty-five percent of the price, it is easy to stop and say the answer is fifteen dollars.', show: 'oops' },
        { say: 'But fifteen dollars is the discount, the amount you save. The question asks for the sale price, what you pay. Subtract the discount from the price.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'A quick check: with a discount, the sale price must be less than the original price, but not by too much. Fifteen dollars for a sixty-dollar hoodie would be far too cheap for only twenty-five percent off.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A game costs \\$40. It is on sale for $20\\%$ off. What is the sale price?',
          choices: ['\\$32', '\\$8', '\\$48', '\\$20'],
          answer: 0,
          working: 'Discount: $20\\%$ of $40$ is $0.2 \\times 40 = 8$. Sale price: $40 - 8 = 32$, so \\$32. Or pay $80\\%$: $0.8 \\times 40 = 32$.',
        },
      ],
      lines: [
        { say: 'Your turn. A game costs forty dollars. It is on sale for twenty percent off. What is the sale price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, thirty-two dollars. Twenty percent of forty dollars is eight dollars, and forty minus eight is thirty-two. Choice B is the discount, the amount you save, not the price you pay.', show: 'q.answer' },
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
          items: ['A **discount** is the amount taken off. Sale price $=$ price $-$ discount.', 'Find the discount as a percent of the price, then subtract. Or pay the rest: $100\\% - 25\\% = 75\\%$ of the price.', 'Round money to the nearest cent, and check with an estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A discount is the amount taken off a price. The sale price is the price minus the discount.', show: 'sum.0' },
        { say: 'Find the discount as a percent of the price, then subtract it. Or multiply by the percent you still pay.', show: 'sum.1' },
        { say: 'Round money to the nearest cent, and check with an estimate. In the next part, you will add sales tax and tips. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
