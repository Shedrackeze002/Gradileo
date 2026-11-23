import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 8.1 (buying a vehicle). The question is a "Your Turn" from
// OpenStax Contemporary Mathematics, word for word (section 6.11, Buying or Leasing a Car,
// CC BY-NC-SA 4.0). Both taxes are percents of the negotiated price, so they add to 10.1%:
// 0.101 × 28,975 = 2,926.475 ≈ 2,926.48. The fees are flat amounts (950 + 370 + 617 = 1,937), so the
// total is 28,975 + 2,926.48 + 1,937 = 33,838.48 dollars, as in the book's answer.

const QUESTION =
  'Luther negotiates for the price of his car, reaching agreement at $28,975. He needs to pay 8% in sales tax, 2.1% in ownership tax, a $950 destination fee, processing fees totaling $370, and registration fee of $617. What is the total cost for Luther’s purchase?';

const video: Explainer = {
  id: 'xq-m303-8-1',
  lessonId: '',
  exam: {
    lesson: 'm303-8-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.11, Buying or Leasing a Car',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-11-buying-or-leasing-a-car',
    question: QUESTION,
  },
  title: 'Exam Question: The Total Cost of Luther’s Car (Buying a Vehicle)',
  thumbnailTitle: 'The Total Cost of a Car',
  thumbnail: 'costs',
  summary:
    'A real test question, solved one small step at a time: Luther agrees on a price of $28,975 for a car, and pays 8% sales tax, 2.1% ownership tax, and fees of $950, $370 and $617. What is the total cost? The two taxes are 10.1% of the price, which is $2,926.48, and the fees add to $1,937, so the total is $33,838.48. Then we check the taxes one at a time and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Total Cost of a Car', subtitle: 'Buying a vehicle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about buying a vehicle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Luther negotiates for the price of his car, reaching agreement at \\$28,975. He needs to pay $8\\%$ in sales tax, $2.1\\%$ in ownership tax, a \\$950 destination fee, processing fees totaling \\$370, and registration fee of \\$617. What is the total cost for Luther’s purchase?',
          answer: '\\$33,838.48',
          working: 'Taxes: $10.1\\%$ of \\$28,975 is \\$2,926.48. Fees: \\$1,937.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Luther negotiates for the price of his car, reaching agreement at 28,975 dollars. He needs to pay 8% in sales tax, 2.1% in ownership tax, a 950 dollar destination fee, processing fees totaling 370 dollars, and registration fee of 617 dollars. What is the total cost for Luther’s purchase?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'costs',
          head: ['Cost', 'Kind'],
          rows: [
            ['price \\$28,975', 'the agreed price'],
            ['sales tax $8\\%$, ownership tax $2.1\\%$', '**percents** of the price'],
            ['\\$950, \\$370, \\$617', '**flat** fees: add as they are'],
          ],
        },
      ],
      lines: [
        { say: 'The total cost is everything Luther pays. There are two kinds of extra costs.', show: 'costs' },
        { say: 'The two taxes are percents, so we must work them out from the price.' },
        { say: 'The three fees are flat amounts, so we just add them.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'pct', tone: 'key', title: 'A percent of an amount', md: 'Write the percent as a **decimal**, then multiply: $\\ 10.1\\% = 0.101$.' },
        { kind: 'callout', id: 'cent', tone: 'tip', title: 'Money', md: 'Round money to the nearest **cent**: two decimal places.' },
      ],
      lines: [
        { say: 'Here is what we need. To find a percent of an amount, write the percent as a decimal and multiply. 10.1% is 0.101.', show: 'pct' },
        { say: 'And money is rounded to the nearest cent, which is two decimal places.', show: 'cent' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the two tax rates', 'Find the **taxes** on the price', 'Add the price, the taxes and the **fees**'] }],
      lines: [
        { say: 'Here is the plan. First, add the two tax rates.', show: 'plan.0' },
        { say: 'Second, find the taxes on the price.', show: 'plan.1' },
        { say: 'Third, add the price, the taxes and the fees.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Add the rates',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8\\% + 2.1\\% = \\good{10.1\\%}', '10.1\\% = 0.101'] }],
      lines: [
        { say: 'Step one. Both taxes are percents of the same price, so we can add them: 8% plus 2.1% is 10.1%.', show: 'm.0' },
        { say: 'As a decimal, 10.1% is 0.101.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The taxes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.101 \\times 28{,}975 = 2{,}926.475', '\\approx \\good{\\$2{,}926.48}'] }],
      lines: [
        { say: 'Step two. Multiply: 0.101 times 28,975 is 2,926.475.', show: 'm.0' },
        { say: 'Round to the nearest cent: the next digit is 5, so round up. The taxes are 2,926 dollars and 48 cents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Add it all up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['950 + 370 + 617 = 1{,}937', '28{,}975 + 2{,}926.48 + 1{,}937', '= \\good{\\$33{,}838.48}'] }],
      lines: [
        { say: 'Step three. First, the fees: 950 plus 370 plus 617 is 1,937 dollars.', show: 'm.0' },
        { say: 'Now add the price, the taxes and the fees: 28,975 plus 2,926.48 plus 1,937.', show: 'm.1' },
        { say: 'The total cost is 33,838 dollars and 48 cents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.08 \\times 28{,}975 = 2{,}318.00', '0.021 \\times 28{,}975 = 608.475 \\approx 608.48', '2{,}318.00 + 608.48 = 2{,}926.48 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the taxes one at a time. The sales tax is 0.08 times 28,975, which is 2,318 dollars.', show: 'm.0' },
        { say: 'The ownership tax is 0.021 times 28,975, which is 608.475, or 608 dollars and 48 cents.', show: 'm.1' },
        { say: 'Together, 2,926 dollars and 48 cents. The same as before, so it checks out.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$2.1\\% = 0.21$', 'move the point **two** places: $2.1\\% = 0.021$'],
            ['forgetting a **fee**', 'the total includes **every** cost'],
            ['taxing the fees too', 'here the taxes are percents of the **price**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2.1% is not 0.21. Dividing by 100 moves the decimal point two places, so it is 0.021.' },
        { say: 'Do not leave out a fee. The total cost includes every one.' },
        { say: 'And the taxes are percents of the car\'s price, not of the fees. The fees are added on their own.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A car\'s agreed price is \\$20,000. Sales tax is $5\\%$ of the price, and the fees total \\$1,500. What is the total cost?',
          choices: ['\\$21,500', '\\$22,575', '\\$22,500', '\\$21,000'],
          answer: 2,
          working: 'Tax: $0.05 \\times 20{,}000 = 1{,}000$. Total: $20{,}000 + 1{,}000 + 1{,}500 = 22{,}500$.',
        },
      ],
      lines: [
        { say: 'Your turn. A car\'s agreed price is 20,000 dollars. Sales tax is 5% of the price, and the fees total 1,500 dollars. What is the total cost? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The tax is 0.05 times 20,000, which is 1,000 dollars. Then 20,000 plus 1,000 plus 1,500 is 22,500 dollars: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Taxes on the same price: **add** the rates', 'Percent to decimal: divide by $100$', 'Flat fees: add them **as they are**', 'Round money to the nearest **cent**'] }],
      lines: [
        { say: 'Here is what to remember. Taxes on the same price can be added into one rate.', show: 'sum.0' },
        { say: 'To use a percent, divide it by 100 to get a decimal.', show: 'sum.1' },
        { say: 'Flat fees are added as they are.', show: 'sum.2' },
        { say: 'And round money to the nearest cent. For more on buying a vehicle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
