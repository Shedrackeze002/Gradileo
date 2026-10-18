import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from './lib/m303-8-figures.ts';

/** Owen's truck: 3,000 down, 23,563.95 financed and a finance charge of 3,515.73. */
const loanBar = (id: string) =>
  figure(
    id,
    [
      stackBar({
        width: 12,
        height: 1.2,
        stretches: [
          { id: 'down', value: 3000, tone: 'theta', label: '\\text{down}' },
          { id: 'fin', value: 23563.95, tone: 'adj', label: '\\text{amount financed } \\$23{,}563.95' },
          { id: 'charge', value: 3515.73, tone: 'bad', label: '\\text{interest}', place: 'above', shift: 0.3 },
        ],
        spans: [
          { id: 'price', from: 0, to: 1, label: '\\text{total price } \\$26{,}563.95', side: 'above', tone: 'theta' },
          { id: 'pay', from: 1, to: 2, label: '\\text{48 payments } \\$27{,}079.68', side: 'below', tone: 'adj' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm303-8-1-b',
  lessonId: 'm303-8-1',
  title: 'Buying a Vehicle, Part 2: Down Payment and Finance Charge',
  thumbnailTitle: 'Down Payment and Finance Charge',
  thumbnail: 'bar',
  summary: 'Financing a vehicle: amount financed = total price − down payment, and finance charge = total of the payments − amount financed. With 3,000 dollars down on a 26,563.95 dollar truck and 48 payments of 564.16 dollars, the amount financed is 23,563.95, the payments total 27,079.68, the finance charge is 3,515.73 and the truck costs 30,079.68 dollars in all.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 2', title: 'Down Payment and Finance Charge', subtitle: 'What borrowing to buy really costs' }],
      lines: [
        { say: 'Most people do not pay for a vehicle all at once. They pay part of the price up front and borrow the rest. Borrowing costs money.', show: 'title' },
        { say: 'In this video, you will find the amount financed, the total of the loan payments, the finance charge, and the total cost of a vehicle bought with a loan.' },
      ],
    },
    {
      chapter: 'Borrowing to buy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Down payment and finance charge', md: 'The **down payment** is the money you pay at the start. The **amount financed** is the part you borrow. The **finance charge** is the interest you pay on the loan.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{amount financed} = \\text{total price} - \\text{down payment}', '\\text{finance charge} = \\text{total of the payments} - \\text{amount financed}'] },
      ],
      lines: [
        { say: 'The down payment is the money you pay at the start. The rest of the price is borrowed, and the part you borrow is called the amount financed.', show: 'def' },
        { say: 'So the amount financed is the total price, minus the down payment.', show: 'm.0', focus: 'm.0' },
        { say: 'You pay the loan back in equal monthly payments. Together, those payments add up to more than you borrowed. The extra is the interest, which is called the finance charge.' },
        { say: 'So the finance charge is the total of the payments, minus the amount financed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Owen’s loan',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Owen’s truck has a total price of \\$26,563.95. Owen pays \\$3,000 down and finances the rest at 6.99% a year. The payments are \\$564.16 a month for 48 months. Find the amount financed and the total of the payments.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{amount financed: } 26{,}563.95 - 3{,}000 = 23{,}563.95', '\\text{total of the payments: } 564.16 \\times 48 = 27{,}079.68'] },
      ],
      lines: [
        { say: 'Owen’s truck has a total price of 26,563 dollars and 95 cents, with the tax and the fee. Owen pays 3,000 dollars down, and finances the rest at 6.99 percent a year.', show: 'p' },
        { say: 'The lender uses that rate to set the payments: 564 dollars and 16 cents a month, for 48 months. Find the amount financed, and the total of the payments.' },
        { say: 'The amount financed is the total price minus the down payment: 26,563.95 minus 3,000 is 23,563.95.', show: 'm.0', focus: 'm.0' },
        { say: 'The total of the payments is the monthly payment times the number of payments: 564.16 times 48 is 27,079.68.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The finance charge',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{finance charge: } 27{,}079.68 - 23{,}563.95 = 3{,}515.73', '\\text{total paid: } 3{,}000 + 27{,}079.68 = 30{,}079.68'] },
        loanBar('bar'),
      ],
      lines: [
        { say: 'Owen borrowed 23,563.95, but pays back 27,079.68. The difference is the finance charge: 27,079.68 minus 23,563.95 is 3,515.73.', show: 'm.0', focus: 'm.0' },
        { say: 'So the loan costs Owen 3,515 dollars and 73 cents in interest.' },
        { say: 'What does the truck cost Owen in all? Add the down payment and the total of the payments: 3,000 plus 27,079.68 is 30,079.68.', show: 'm.1', focus: 'm.1' },
        { say: 'The bar shows where the money goes. The down payment and the amount financed make up the total price.', show: ['bar.down', 'bar.fin', 'bar.price'], focus: 'bar.price' },
        { say: 'The payments cover the amount financed, plus the interest. So the truck costs Owen 30,079 dollars and 68 cents, more than 5,000 dollars over its sticker price.', show: ['bar.charge', 'bar.pay'], focus: ['bar.pay', 'bar.charge'] },
      ],
    },
    {
      chapter: 'Paying less interest',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A bigger down payment saves interest', md: 'The more you pay down, the less you borrow, and the smaller the finance charge. A **shorter** loan also costs less interest, but the monthly payments are higher.' },
      ],
      lines: [
        { say: 'How can a buyer pay less interest? The more you pay down, the less you borrow, and the smaller the finance charge.', show: 'tip' },
        { say: 'A shorter loan also costs less interest, because you borrow the money for less time. But the monthly payments are higher, so they must fit your budget.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the down payment', md: 'The total cost of buying with a loan is the down payment **plus** the total of the payments. The payments alone, \\$27,079.68, leave out the \\$3,000 paid at the start.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{total cost} = \\text{down payment} + \\text{total of the payments}'] },
      ],
      lines: [
        { say: 'A common mistake is to give the total of the payments as the cost of the truck.', show: 'oops' },
        { say: 'The payments only cover the amount financed and the interest. The total cost of buying with a loan is the down payment plus the total of the payments.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car’s total price is \\$18,900.00. The buyer pays \\$2,500 down and makes 36 monthly payments of \\$498.50. What is the finance charge?',
          choices: ['\\$1,546.00', '\\$17,946.00', '\\$954.00', '\\$20,446.00'],
          answer: 0,
          working: 'Amount financed: $18{,}900 - 2{,}500 = 16{,}400$. Payments: $498.50 \\times 36 = 17{,}946.00$. Finance charge: $17{,}946.00 - 16{,}400 = 1{,}546.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. A car’s total price is 18,900 dollars. The buyer pays 2,500 dollars down and makes 36 monthly payments of 498 dollars and fifty cents. What is the finance charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 1,546 dollars. The amount financed is 18,900 minus 2,500, which is 16,400. The payments total 498.50 times 36, which is 17,946. The difference is 1,546. Choice D, 20,446 dollars, is the total cost of the car, not the finance charge.', show: 'q.answer' },
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
            'Amount financed $=$ total price $-$ down payment.',
            'Finance charge $=$ total of the payments $-$ amount financed.',
            'Total cost $=$ down payment $+$ total of the payments.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The amount financed is the total price minus the down payment.', show: 'sum.0' },
        { say: 'The finance charge is the total of the payments minus the amount financed: the interest.', show: 'sum.1' },
        { say: 'And the total cost of buying with a loan is the down payment plus the total of the payments. In part three, we see how a vehicle loses value over time. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
