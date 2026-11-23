import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 8.2 (leasing and leasing to buy). The question is a "Your
// Turn" from OpenStax Contemporary Mathematics, word for word (section 6.11, Buying or Leasing a
// Car, CC BY-NC-SA 4.0). The car loses 27,500 − 17,875 = 9,625 dollars of value over the lease,
// spread over 24 months: 9,625/24 = 401.0416…, and the book rounds payments up to the next cent,
// so the monthly depreciation is $401.05, as in the book's answer.

const QUESTION =
  'The purchase price of a car is $27,500. Its residual price is $17,875.00. What is its monthly depreciation for a 24-month lease?';

const video: Explainer = {
  id: 'xq-m303-8-2',
  lessonId: '',
  exam: {
    lesson: 'm303-8-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.11, Buying or Leasing a Car',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-11-buying-or-leasing-a-car',
    question: QUESTION,
  },
  title: 'Exam Question: The Monthly Depreciation on a 24-Month Lease (Leasing and Leasing to Buy)',
  thumbnailTitle: 'Monthly Depreciation on a Lease',
  thumbnail: 'f',
  summary:
    'A real test question, solved one small step at a time: a car costs $27,500 and its residual price after a 24-month lease is $17,875. What is its monthly depreciation? The car loses $9,625 of value over the lease, and spreading that over 24 months gives $401.04166…, which as a payment is rounded up to $401.05. Then we check by multiplying back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Monthly Depreciation on a Lease', subtitle: 'Leasing and leasing to buy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about leasing a car. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The purchase price of a car is \\$27,500. Its residual price is \\$17,875.00. What is its monthly depreciation for a $24$-month lease?',
          answer: '\\$401.05 per month',
          working: '$\\dfrac{27{,}500 - 17{,}875}{24} = \\dfrac{9{,}625}{24} = 401.0416\\ldots$, rounded up.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'The purchase price of a car is 27,500 dollars. Its residual price is 17,875 dollars. What is its monthly depreciation for a 24-month lease?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'With a lease, you pay for the value the car **loses** while you drive it. How much value does it lose **each month**?' }],
      lines: [
        { say: 'When you lease a car, you do not pay for the whole car. You pay for the value it loses while you are driving it.', show: 't' },
        { say: 'We need how much value it loses each month.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'res', tone: 'definition', title: 'Residual price', md: 'What the car is still worth at the **end** of the lease.' },
        { kind: 'callout', id: 'f', tone: 'key', title: 'Monthly depreciation', md: '$\\text{MD} = \\dfrac{P - R}{n}$: $\\ P$ the price, $R$ the residual price, $n$ the number of **months**.' },
      ],
      lines: [
        { say: 'Here is what we need. The residual price is what the car is still worth when the lease ends.', show: 'res' },
        { say: 'The monthly depreciation is the price minus the residual price, divided by the number of months of the lease.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the value **lost** over the lease', '**Divide** by the number of months', '**Round** the payment to a cent'] }],
      lines: [
        { say: 'Here is the plan. First, find the value the car loses over the whole lease.', show: 'plan.0' },
        { say: 'Second, divide by the number of months.', show: 'plan.1' },
        { say: 'Third, round the payment to a cent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Value lost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P - R = 27{,}500 - 17{,}875', '= \\good{9{,}625} \\text{ dollars}'] }],
      lines: [
        { say: 'Step one. The car starts at 27,500 dollars and ends the lease worth 17,875 dollars.', show: 'm.0' },
        { say: 'So it loses 9,625 dollars of value over the lease.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide by the months',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{MD} = \\dfrac{9{,}625}{24} = 401.041\\overline{6}'] }],
      lines: [
        { say: 'Step two. The lease is 24 months, so divide: 9,625 over 24 is 401.0416, with the 6 repeating.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Round to a cent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['401.041\\overline{6} \\ \\to \\ \\text{round up}', '\\text{MD} = \\good{\\$401.05} \\text{ per month}'] }],
      lines: [
        { say: 'Step three. Money needs two decimal places. A payment is rounded up to the next cent, so the lender is never paid too little.', show: 'm.0' },
        { say: 'So the monthly depreciation is 401 dollars and 5 cents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['401.05 \\times 24 = 9{,}625.20', '17{,}875 + 9{,}625.20 \\approx 27{,}500 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. 24 payments of 401.05 dollars is 9,625 dollars and 20 cents. The extra 20 cents comes from rounding up.', show: 'm.0' },
        { say: 'Add that to the residual price, and we are back at the car\'s price, 27,500 dollars, give or take 20 cents. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{27{,}500}{24}$', 'you pay only for the value **lost**: subtract $R$ first'],
            ['$\\dfrac{17{,}875}{24}$', 'that is the value the car **keeps**'],
            ['dividing by $2$ years', 'the payments are **monthly**: divide by $24$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not divide the whole price by 24. With a lease you pay only for the value the car loses, so subtract the residual price first.' },
        { say: 'And the residual price over 24 is the value the car keeps, which you do not pay for.' },
        { say: 'Finally, the payments are monthly. Divide by 24 months, not by 2 years.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A car costs \\$30,000, and its residual price after a $36$-month lease is \\$18,000. What is its monthly depreciation?',
          choices: ['\\$500.00', '\\$833.34', '\\$1,333.34', '\\$333.34'],
          answer: 3,
          working: '$\\dfrac{30{,}000 - 18{,}000}{36} = \\dfrac{12{,}000}{36} = 333.\\overline{3}$, rounded up to \\$333.34.',
        },
      ],
      lines: [
        { say: 'Your turn. A car costs 30,000 dollars, and its residual price after a 36-month lease is 18,000 dollars. What is its monthly depreciation? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The car loses 30,000 minus 18,000, which is 12,000 dollars. Over 36 months that is 333.33, with the 3 repeating, rounded up to 333 dollars and 34 cents: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A lease pays for the value the car **loses**', 'Value lost: price $-$ residual price', 'Monthly depreciation: value lost $\\div$ **months**', 'Payments are rounded **up** to the next cent'] }],
      lines: [
        { say: 'Here is what to remember. A lease pays for the value the car loses while you drive it.', show: 'sum.0' },
        { say: 'The value lost is the price minus the residual price.', show: 'sum.1' },
        { say: 'The monthly depreciation is the value lost divided by the number of months.', show: 'sum.2' },
        { say: 'And payments are rounded up to the next cent. For more on leasing and leasing to buy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
